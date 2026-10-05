/* POINTLESS module: draw-a-circle */
/*
 * Draw a Perfect Circle: The Tribunal of Circularity. One freehand circle, three judges, no agreement.
 * Real geometry (resampling, deviation, closure, turning, crossings), perverse presentation. A perfect circle
 * is disqualified, a scribble is praised, and the Consensus meter reads 0.0% on principle.
 * Everything inside root; every timer, listener and subscription goes through api.*.
 */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`
.m-draw-a-circle-wrap{position:relative;max-width:900px;margin:0 auto;padding:12px;display:flex;flex-direction:column;gap:12px;color:#1B2540;   background:radial-gradient(rgba(27,37,64,.1) 1px,transparent 1.5px) 0 0/14px 14px,#FFF6E0;border:3px solid #1B2540;border-radius:18px;   box-shadow:4px 4px 0 #1B2540;font:600 15px/1.35 "Trebuchet MS",system-ui,"Segoe UI",Arial,sans-serif;overflow:hidden;box-sizing:border-box}
.m-draw-a-circle-wrap *{box-sizing:border-box} .m-draw-a-circle-hide{display:none!important} .m-draw-a-circle-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.m-draw-a-circle-btn{font:inherit;font-weight:800;cursor:pointer;padding:8px 12px;min-height:40px;border:3px solid #1B2540;border-radius:12px;background:#fff;color:#1B2540;box-shadow:3px 3px 0 #1B2540;position:relative} .m-draw-a-circle-btn:hover{background:#FFFDF4} .m-draw-a-circle-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #1B2540}
.m-draw-a-circle-btn:focus-visible,.m-draw-a-circle-board canvas:focus-visible,.m-draw-a-circle-frame:focus-visible,.m-draw-a-circle-star:focus-visible,.m-draw-a-circle-crit:focus-visible{outline:3px solid #F26B5B;outline-offset:2px} .m-draw-a-circle-btn[disabled]{opacity:.5;cursor:not-allowed} .m-draw-a-circle-btn.m-draw-a-circle-gold{background:#F2B63B}.m-draw-a-circle-btn.m-draw-a-circle-go{background:#7FD1B0}.m-draw-a-circle-btn.m-draw-a-circle-beige{background:#EBDDBF}.m-draw-a-circle-btn.m-draw-a-circle-lil{background:#B7A3E3}
.m-draw-a-circle-new{position:absolute;top:-10px;right:-8px;background:#B3261E;color:#fff;font-size:.62rem;padding:1px 6px;border:2px solid #1B2540;border-radius:8px;transform:rotate(8deg);letter-spacing:.06em} .m-draw-a-circle-bench{position:relative;order:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 10px;padding:10px 10px 8px;border:3px solid #1B2540;border-radius:16px;   background:repeating-linear-gradient(90deg,rgba(27,37,64,.08) 0 2px,transparent 2px 14px),#F2B63B;box-shadow:3px 3px 0 #1B2540;transition:filter .6s}
.m-draw-a-circle-t2 .m-draw-a-circle-bench{background:repeating-linear-gradient(90deg,rgba(27,37,64,.08) 0 2px,transparent 2px 14px),#F4C25A} .m-draw-a-circle-t3 .m-draw-a-circle-bench{background:radial-gradient(circle at 50% 40%,rgba(242,107,91,.35),transparent 70%),repeating-linear-gradient(90deg,rgba(27,37,64,.08) 0 2px,transparent 2px 14px),#F4C25A} .m-draw-a-circle-t3 .m-draw-a-circle-pad,.m-draw-a-circle-t4 .m-draw-a-circle-pad{box-shadow:2px 5px 8px rgba(27,37,64,.4)}
.m-draw-a-circle-t4 .m-draw-a-circle-bench{filter:brightness(.82) saturate(.9)} .m-draw-a-circle-seat{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;opacity:0;transform:translateY(14px);transition:opacity .45s,transform .45s} .m-draw-a-circle-seat.m-draw-a-circle-in{opacity:1;transform:none}
.m-draw-a-circle-av{position:relative;font-size:2.6rem;line-height:1.05;filter:drop-shadow(0 3px 0 rgba(27,37,64,.25))} .m-draw-a-circle-seat.m-draw-a-circle-stand .m-draw-a-circle-av{animation:m-draw-a-circle-bounce .5s ease 3} .m-draw-a-circle-q .m-draw-a-circle-av::before{content:"";position:absolute;left:54%;top:24%;width:.42em;height:.42em;border:3px solid #B8860B;border-radius:50%}
.m-draw-a-circle-q .m-draw-a-circle-av::after{content:"V";position:absolute;right:-.45em;bottom:-.1em;font-size:.5em;font-weight:900;color:#B8860B;transform:rotate(180deg)} .m-draw-a-circle-b .m-draw-a-circle-av::before{content:"";position:absolute;left:50%;top:-.12em;width:1.25em;height:.3em;border:3px solid #1B2540;border-radius:50%;background:#B7A3E3;transform:translateX(-50%) rotate(-6deg)} .m-draw-a-circle-h .m-draw-a-circle-av::after{content:"";position:absolute;left:50%;bottom:-.2em;width:.8em;height:.45em;background:#FFF6E0;clip-path:polygon(14% 0,86% 0,100% 100%,0 100%);transform:translateX(-50%);transition:transform .8s,opacity .8s}
.m-draw-a-circle-fell .m-draw-a-circle-av::after{transform:translate(-50%,160%);opacity:0} .m-draw-a-circle-prop{position:absolute;left:4px;bottom:46px;font-size:1.1rem} .m-draw-a-circle-snack{position:absolute;right:2px;bottom:50px;font-size:1.5rem;transition:transform .3s,opacity .3s}
.m-draw-a-circle-snack.m-draw-a-circle-bump{animation:m-draw-a-circle-bounce .5s ease 2} .m-draw-a-circle-plate{position:relative;z-index:1;font-size:.72rem;font-weight:900;background:#FFF6E0;border:2px solid #1B2540;border-radius:8px;padding:1px 8px;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis} .m-draw-a-circle-short{display:none}
.m-draw-a-circle-pad{min-width:76px;max-width:100%;text-align:center;font-weight:900;font-size:1rem;padding:5px 8px;background:#fff;border:3px solid #1B2540;border-radius:8px;box-shadow:2px 3px 0 #1B2540;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:clip} .m-draw-a-circle-pad.m-draw-a-circle-flip{animation:m-draw-a-circle-flip .45s cubic-bezier(.3,1.6,.5,1)} .m-draw-a-circle-pad.m-draw-a-circle-dq{background:#B3261E;color:#fff}.m-draw-a-circle-pad.m-draw-a-circle-ok{background:#7FD1B0}.m-draw-a-circle-pad.m-draw-a-circle-slow{background:#B7A3E3}.m-draw-a-circle-pad.m-draw-a-circle-bag{background:#FFF1C9;font-size:1.3rem}
.m-draw-a-circle-siren{position:absolute;left:50%;top:-8px;z-index:2;font-size:1.6rem;transform:translateX(-50%);animation:m-draw-a-circle-blink .35s steps(2) infinite} .m-draw-a-circle-bench.m-draw-a-circle-shake{animation:m-draw-a-circle-shake .12s 2} .m-draw-a-circle-spotcone{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .8s;border-radius:14px;
  background:conic-gradient(from 168deg at 83% -10%,transparent 0 6deg,rgba(255,244,190,.85) 6deg 24deg,transparent 24deg),rgba(27,37,64,.35)} .m-draw-a-circle-spot .m-draw-a-circle-spotcone{opacity:1} .m-draw-a-circle-gerald{position:absolute;right:4px;top:2px;display:flex;flex-direction:column;align-items:center;gap:2px;transform:translateX(160%);transition:transform .6s;z-index:2}
.m-draw-a-circle-gerald.m-draw-a-circle-in{transform:none} .m-draw-a-circle-gerald b{font-size:1.9rem;line-height:1} .m-draw-a-circle-gerald i{font-style:normal;font-size:.62rem;background:#fff;border:2px solid #1B2540;border-radius:8px;padding:0 6px;font-weight:800}
.m-draw-a-circle-meter{order:9;grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(255,246,224,.7);border:2px solid #1B2540;border-radius:12px;padding:2px 10px;min-width:0} .m-draw-a-circle-gauge{width:92px;height:54px;flex:none;overflow:visible} .m-draw-a-circle-needle{transform:rotate(-78deg);transform-origin:60px 60px;transition:transform .35s}
.m-draw-a-circle-strain .m-draw-a-circle-needle{animation:m-draw-a-circle-strain .5s ease-in-out infinite} .m-draw-a-circle-gdq .m-draw-a-circle-needle{animation:none;transform:rotate(78deg)} .m-draw-a-circle-mcap{font-size:.78rem;font-weight:800;min-width:0;overflow-wrap:anywhere;flex:1}
.m-draw-a-circle-sweat{display:inline-block;animation:m-draw-a-circle-bounce 1.2s ease infinite} .m-draw-a-circle-clap{animation:m-draw-a-circle-bounce .3s ease 5} .m-draw-a-circle-blip .m-draw-a-circle-needle{animation:none;transform:rotate(-73deg)} .m-draw-a-circle-crits{order:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px} .m-draw-a-circle-crit{margin:0;min-height:4.6em;padding:6px 8px;font-size:.78rem;line-height:1.3;font-weight:700;background:#fff;border:2px solid #1B2540;border-radius:10px;overflow-wrap:anywhere;text-align:left;position:relative}
.m-draw-a-circle-crit::after{content:attr(data-who);position:absolute;right:6px;top:-9px;font-size:.58rem;background:#F2B63B;border:2px solid #1B2540;border-radius:6px;padding:0 5px;font-weight:900} .m-draw-a-circle-crit.m-draw-a-circle-q2{background:#F5F0FF}.m-draw-a-circle-crit.m-draw-a-circle-h2{background:#FFF8E3} .m-draw-a-circle-stage{order:4;display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0}
.m-draw-a-circle-strip{display:flex;align-items:center;gap:8px;width:100%;max-width:520px;background:#FFFDF4;border:2px dashed #1B2540;border-radius:10px;padding:4px 8px;font-size:.78rem;font-weight:800} .m-draw-a-circle-clock{flex:none;position:relative;width:34px;height:34px;border:3px solid #1B2540;border-radius:50%;background:#fff} .m-draw-a-circle-clock::before,.m-draw-a-circle-clock::after{content:"";position:absolute;left:50%;bottom:50%;width:2px;background:#1B2540;transform-origin:50% 100%}
.m-draw-a-circle-clock::before{height:11px;transform:translateX(-50%) rotate(-34deg)} .m-draw-a-circle-clock::after{height:7px;transform:translateX(-50%) rotate(-174deg)} .m-draw-a-circle-boardwrap{position:relative;margin-top:16px;max-width:100%}
.m-draw-a-circle-tab{position:absolute;left:10px;top:0;transform:translateY(-100%);font-size:.6rem;font-weight:900;letter-spacing:.04em;background:#B7A3E3;border:2px solid #1B2540;border-bottom:0;border-radius:8px 8px 0 0;padding:1px 8px;white-space:nowrap;max-width:90%;overflow:hidden;text-overflow:ellipsis} .m-draw-a-circle-board{position:relative;border:3px solid #1B2540;border-radius:12px;box-shadow:4px 4px 0 #1B2540;overflow:hidden;   background:linear-gradient(rgba(27,37,64,.07) 1px,transparent 1px) 0 0/20px 20px,linear-gradient(90deg,rgba(27,37,64,.07) 1px,transparent 1px) 0 0/20px 20px,#FFFDF4;line-height:0}
.m-draw-a-circle-board canvas{display:block;touch-action:none;cursor:crosshair;user-select:none;-webkit-user-select:none;outline-offset:-6px} .m-draw-a-circle-dot{position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#F26B5B;pointer-events:none} .m-draw-a-circle-dotlab{position:absolute;left:calc(50% + 9px);top:calc(50% - 7px);font:italic 700 9px/1 "Segoe Script","Comic Sans MS",cursive;color:#7a5a3a;pointer-events:none}
.m-draw-a-circle-protocol .m-draw-a-circle-dot,.m-draw-a-circle-protocol .m-draw-a-circle-dotlab{display:none} .m-draw-a-circle-nib{position:absolute;left:0;top:0;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;border:3px solid #1B2540;background:#7FD1B0;pointer-events:none;opacity:0} .m-draw-a-circle-nib.m-draw-a-circle-on{opacity:1}.m-draw-a-circle-nib.m-draw-a-circle-down{background:#1B2540}
.m-draw-a-circle-dim{position:absolute;inset:0;background:rgba(27,37,64,.35);opacity:0;pointer-events:none;transition:opacity .6s} .m-draw-a-circle-spot .m-draw-a-circle-dim{opacity:1} .m-draw-a-circle-quar{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:repeating-linear-gradient(45deg,rgba(242,107,91,.3) 0 12px,rgba(255,246,224,.55) 12px 24px);font-size:1.5rem;font-weight:900;letter-spacing:.14em;color:#B3261E;line-height:1.2;text-align:center;pointer-events:none}
.m-draw-a-circle-quarantine .m-draw-a-circle-quar{display:flex} .m-draw-a-circle-owl{position:absolute;right:8px;bottom:8px;font-size:2.2rem;line-height:1;display:none;pointer-events:none} .m-draw-a-circle-owl::after{content:"";position:absolute;left:10%;top:-6px;width:80%;height:16px;border-bottom:3px solid #F26B5B;border-radius:0 0 50% 50%}
.m-draw-a-circle-congest .m-draw-a-circle-owl{display:block;animation:m-draw-a-circle-land .6s cubic-bezier(.3,1.6,.5,1)} .m-draw-a-circle-sigh{position:absolute;left:10px;top:10px;font-size:2rem;line-height:1;display:none;pointer-events:none} .m-draw-a-circle-sighing .m-draw-a-circle-sigh{display:block;animation:m-draw-a-circle-puff 1.8s ease-out}
.m-draw-a-circle-sock{position:absolute;left:-14%;bottom:30%;font-size:2.3rem;line-height:1;display:none;pointer-events:none} .m-draw-a-circle-trail{position:absolute;left:0;bottom:calc(30% - 2px);height:0;width:0;border-top:3px dotted rgba(27,37,64,.35);display:none;pointer-events:none} .m-draw-a-circle-sockgo .m-draw-a-circle-sock{display:block;animation:m-draw-a-circle-walk 3s linear forwards}
.m-draw-a-circle-sockgo .m-draw-a-circle-trail{display:block;animation:m-draw-a-circle-trailgrow 3s linear forwards} .m-draw-a-circle-flicker .m-draw-a-circle-board{animation:m-draw-a-circle-flick .8s steps(6)} .m-draw-a-circle-plaq{position:absolute;inset:14% 12%;pointer-events:none;display:none;align-items:center;justify-content:center;text-align:center;background:#E7D7A8;border:6px double #6b5a2a;border-radius:6px;font:italic 800 1.1rem/1.3 Georgia,serif;padding:10px;line-height:1.3}
.m-draw-a-circle-concept .m-draw-a-circle-plaq{display:flex} .m-draw-a-circle-cap{min-height:2.6em;width:100%;max-width:520px;text-align:center;font-size:.86rem;font-weight:800;overflow-wrap:anywhere} .m-draw-a-circle-hint,.m-draw-a-circle-kbd{margin:0;font-size:.74rem;opacity:.85;text-align:center;font-weight:700;max-width:520px} .m-draw-a-circle-kbd{display:none;font-size:.66rem;opacity:.6} .m-draw-a-circle-kbdon .m-draw-a-circle-kbd{display:block}
.m-draw-a-circle-cut{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#FFFDF4;font-size:5.5rem;line-height:1;text-align:center} .m-draw-a-circle-cut small{font-size:.8rem;font-weight:800;opacity:.7;line-height:1.2;padding:0 10px}
.m-draw-a-circle-paper{position:absolute;z-index:6;left:50%;top:230px;width:min(440px,calc(100% - 24px));max-height:70%;overflow:auto;transform:translateX(-50%) rotate(-1deg);padding:14px;background:#FFFDF4;border:3px solid #1B2540;border-radius:6px;box-shadow:6px 6px 0 #1B2540;animation:m-draw-a-circle-slide .35s ease-out} .m-draw-a-circle-paper h3{margin:0 0 6px;font-size:1rem} .m-draw-a-circle-paper label{display:flex;gap:8px;align-items:flex-start;margin:6px 0;font-size:.86rem;font-weight:700}
.m-draw-a-circle-paper input[type=checkbox]{width:20px;height:20px;flex:none;margin-top:1px} .m-draw-a-circle-paper .m-draw-a-circle-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px} .m-draw-a-circle-paper.m-draw-a-circle-char{background:#d8cdb4;filter:sepia(.5)}
.m-draw-a-circle-paper .m-draw-a-circle-stamp2{display:inline-block;border:4px solid #B3261E;color:#B3261E;padding:0 8px;font-weight:900;transform:rotate(-8deg);margin:4px 0} .m-draw-a-circle-cert{text-align:center;font-family:Georgia,serif;overflow-wrap:anywhere;border:6px double #6b5a2a;background:#FFF6E0} .m-draw-a-circle-rev{display:flex;align-items:center;gap:8px;margin:6px 0;flex-wrap:wrap}
.m-draw-a-circle-rev svg{width:56px;height:56px;flex:none;background:#fff;border:2px solid #1B2540;border-radius:8px} .m-draw-a-circle-star{width:24px;height:30px;padding:0;font-size:.8rem;font-weight:800;border:2px solid #1B2540;border-radius:6px;background:#fff;cursor:pointer;color:#1B2540} .m-draw-a-circle-star.m-draw-a-circle-lit{background:#F2B63B}
.m-draw-a-circle-docket{order:5;display:flex;flex-direction:column;gap:10px;padding:12px;background:#FFFDF4;border:3px solid #1B2540;border-radius:8px 8px 14px 14px;box-shadow:3px 3px 0 #1B2540;position:relative} .m-draw-a-circle-docket::before{content:"";position:absolute;left:50%;top:-12px;width:64px;height:16px;margin-left:-32px;background:#8a8f9c;border:3px solid #1B2540;border-radius:6px} .m-draw-a-circle-row1{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center}
.m-draw-a-circle-round{display:flex;align-items:center;gap:6px;font-weight:900} .m-draw-a-circle-flipn{display:inline-block;min-width:3.6ch;text-align:center;background:#1B2540;color:#FFF6E0;border-radius:6px;padding:1px 8px;font-variant-numeric:tabular-nums} .m-draw-a-circle-flipn.m-draw-a-circle-turn{animation:m-draw-a-circle-flipn .4s ease}
.m-draw-a-circle-tender{display:flex;align-items:center;gap:6px;font-size:.78rem;font-weight:800} .m-draw-a-circle-heart{width:30px;height:30px;flex:none} .m-draw-a-circle-off{order:3;display:flex;align-items:center;gap:6px 12px;flex-wrap:wrap;min-width:0;padding:8px 12px;background:#FFFDF4;border:3px solid #1B2540;border-radius:10px;box-shadow:3px 3px 0 #1B2540}
.m-draw-a-circle-score{font-size:1.5rem;font-weight:900;font-variant-numeric:tabular-nums} .m-draw-a-circle-stampw{position:relative;min-width:160px;min-height:46px;display:flex;align-items:center} .m-draw-a-circle-stamp{display:inline-block;border:4px solid #F26B5B;color:#C73E2E;border-radius:8px;padding:1px 10px;font-weight:900;letter-spacing:.06em;font-size:.84rem;transform:rotate(-7deg);opacity:0}
.m-draw-a-circle-stamp.m-draw-a-circle-on{opacity:.92;animation:m-draw-a-circle-thud .35s ease-out} .m-draw-a-circle-foot{flex-basis:100%;font-size:.7rem;opacity:.85;margin:0} .m-draw-a-circle-btns{display:flex;flex-wrap:wrap;gap:8px 10px}
.m-draw-a-circle-ledger{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:.78rem;font-weight:800} .m-draw-a-circle-bag{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:.74rem;font-weight:800} .m-draw-a-circle-bagsvg{display:flex;gap:4px;padding:4px 8px;border:2px solid #1B2540;border-radius:6px 6px 14px 14px;background:rgba(200,230,255,.35);min-height:34px}
.m-draw-a-circle-bag.m-draw-a-circle-open .m-draw-a-circle-bagsvg{background:#fff;border-style:dashed} .m-draw-a-circle-thumb{width:34px;height:34px;background:#fff;border:1px solid #1B2540;border-radius:4px} .m-draw-a-circle-gal{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;font-size:.72rem;font-weight:800}
.m-draw-a-circle-frame{padding:3px;background:#E9C98A;border:3px solid #6b5a2a;border-radius:4px;cursor:pointer;line-height:0;font:inherit;box-shadow:2px 2px 0 #1B2540} .m-draw-a-circle-frame canvas{width:44px;height:44px;background:#FFFDF4} .m-draw-a-circle-galempty{padding:6px 12px;border:2px dashed #6b5a2a;border-radius:6px;font-style:italic}
.m-draw-a-circle-chair{font-size:1.5rem;line-height:1;position:relative;transform-origin:50% 100%;transition:transform .4s} .m-draw-a-circle-chair.m-draw-a-circle-lean{transform:rotate(14deg) translateX(4px)} .m-draw-a-circle-chair small{position:absolute;left:50%;top:-12px;transform:translateX(-50%);font-size:.5rem;background:#7FD1B0;border:1px solid #1B2540;border-radius:5px;padding:0 3px;white-space:nowrap}
.m-draw-a-circle-pantry{font-size:1.2rem;display:flex;flex-wrap:wrap;gap:2px;align-items:center} .m-draw-a-circle-pantry small{font-size:.72rem;font-weight:800;margin-right:6px} .m-draw-a-circle-zzz{position:absolute;right:6px;top:-6px;font-size:1rem;animation:m-draw-a-circle-float 2s ease-out infinite}
.m-draw-a-circle-tear{position:absolute;left:30%;top:42%;font-size:.9rem;opacity:0} .m-draw-a-circle-t4 .m-draw-a-circle-tear{opacity:1;animation:m-draw-a-circle-drop 1.8s ease-in infinite} .m-draw-a-circle-b .m-draw-a-circle-tear{left:60%;animation-delay:.6s}.m-draw-a-circle-h .m-draw-a-circle-tear{animation-delay:1.1s}
.m-draw-a-circle-audit{margin:0;width:100%;max-width:520px;text-align:center;font-size:.74rem;font-weight:900;letter-spacing:.03em;color:#fff;background:#B3261E;border:2px solid #1B2540;border-radius:8px;padding:2px 8px;transform:rotate(-.6deg);overflow-wrap:anywhere}
.m-draw-a-circle-dotbtn{position:absolute;left:50%;top:50%;width:28px;height:28px;margin:-14px 0 0 -14px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;line-height:0;touch-action:none} .m-draw-a-circle-dotbtn:focus-visible{outline:3px solid #F26B5B} .m-draw-a-circle-protocol .m-draw-a-circle-dotbtn{display:none} .m-draw-a-circle-cdo .m-draw-a-circle-dot{width:14px;height:14px;margin:-7px 0 0 -7px;background:#F2B63B;border:2px solid #1B2540} .m-draw-a-circle-tue .m-draw-a-circle-board{animation:m-draw-a-circle-tue 3.4s ease-in-out} .m-draw-a-circle-tue .m-draw-a-circle-bench{filter:brightness(.5) saturate(.5)} .m-draw-a-circle-tue .m-draw-a-circle-clock::before{animation:m-draw-a-circle-tick 3.4s steps(1)}
@keyframes m-draw-a-circle-tue{0%,100%{filter:none}25%,75%{filter:brightness(.45) contrast(.9)}} @keyframes m-draw-a-circle-tick{0%,100%{transform:translateX(-50%) rotate(-34deg)}40%,60%{transform:translateX(-50%) rotate(-28deg)}}
@keyframes m-draw-a-circle-flip{0%{transform:rotateX(0)}45%{transform:rotateX(90deg)}55%{transform:rotateX(-90deg)}100%{transform:rotateX(0)}} @keyframes m-draw-a-circle-bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-9px)}} @keyframes m-draw-a-circle-blink{50%{opacity:.15}}
@keyframes m-draw-a-circle-shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}} @keyframes m-draw-a-circle-strain{0%,100%{transform:rotate(-78deg)}50%{transform:rotate(-70deg)}} @keyframes m-draw-a-circle-land{from{transform:translateY(-120px) scale(.6);opacity:0}to{transform:none;opacity:1}}
@keyframes m-draw-a-circle-puff{0%{transform:translate(0,0) scale(.5);opacity:0}30%{opacity:1}100%{transform:translate(60px,-20px) scale(1.6);opacity:0}} @keyframes m-draw-a-circle-walk{from{left:-14%}to{left:106%}} @keyframes m-draw-a-circle-trailgrow{from{width:0}to{width:100%}}
@keyframes m-draw-a-circle-flick{0%,100%{filter:none}30%{filter:brightness(.4)}60%{filter:brightness(1.4)}} @keyframes m-draw-a-circle-slide{from{opacity:0;margin-top:20px}to{opacity:1;margin-top:0}} @keyframes m-draw-a-circle-flipn{0%{transform:rotateX(0)}50%{transform:rotateX(90deg)}100%{transform:rotateX(0)}}
@keyframes m-draw-a-circle-thud{from{transform:rotate(-7deg) scale(2.2);opacity:0}to{transform:rotate(-7deg) scale(1);opacity:.92}} @keyframes m-draw-a-circle-float{from{transform:translateY(0);opacity:1}to{transform:translateY(-22px);opacity:0}} @keyframes m-draw-a-circle-drop{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(26px);opacity:0}}
@media (min-width:980px){   .m-draw-a-circle-wrap{display:grid;grid-template-columns:minmax(0,540px) minmax(0,1fr);grid-template-rows:auto auto 1fr auto;grid-template-areas:"stage bench" "stage crits" "stage official" "docket docket";align-content:start;gap:14px 18px;max-width:1040px}   .m-draw-a-circle-stage{grid-area:stage;align-self:start}.m-draw-a-circle-bench{grid-area:bench;align-self:start}.m-draw-a-circle-crits{grid-area:crits;align-self:start;grid-template-columns:1fr;align-content:start}.m-draw-a-circle-docket{grid-area:docket}.m-draw-a-circle-off{grid-area:official;align-self:start}.m-draw-a-circle-paper{left:282px;width:440px}
} @media (max-width:559px){   .m-draw-a-circle-wrap{padding:8px;gap:10px}
  .m-draw-a-circle-pad.m-draw-a-circle-slow{white-space:normal;font-size:.62rem;line-height:1.1;overflow-wrap:anywhere}   .m-draw-a-circle-bench{gap:6px;padding:8px 6px}   .m-draw-a-circle-av{font-size:2rem}.m-draw-a-circle-pad{min-width:0;width:100%;font-size:.8rem;padding:4px}.m-draw-a-circle-plate{font-size:.6rem;padding:0 4px}   .m-draw-a-circle-full{display:none}.m-draw-a-circle-short{display:inline}
  .m-draw-a-circle-snack{font-size:1.1rem;bottom:36px}.m-draw-a-circle-prop{bottom:36px;font-size:.9rem}   .m-draw-a-circle-meter{flex-direction:column;gap:0;padding:2px 6px}   .m-draw-a-circle-crits{order:3;grid-template-columns:1fr;gap:12px}.m-draw-a-circle-off{order:4;scroll-margin-bottom:150px}.m-draw-a-circle-stage{order:2}.m-draw-a-circle-more::before{content:"tap to read the rest";position:absolute;right:5px;bottom:1px;font-size:.58rem;font-weight:900;opacity:.8;background:#fff;padding:0 4px;border-radius:4px}
  .m-draw-a-circle-crit{min-height:0;max-height:calc(2.7em + 22px);overflow:hidden;padding-top:16px;cursor:pointer}.m-draw-a-circle-crit::after{top:1px;right:5px}.m-draw-a-circle-crit.m-draw-a-circle-open{max-height:none}   .m-draw-a-circle-btn{padding:8px 10px;font-size:.85rem}   .m-draw-a-circle-paper{top:150px;max-height:55vh}
} @media (pointer:fine) and (min-width:560px){   .m-draw-a-circle-kbd{display:block}
} @media (pointer:coarse){   .m-draw-a-circle-star{width:30px;height:40px}   .m-draw-a-circle-frame canvas{width:48px;height:48px}
} @media (prefers-reduced-motion:reduce){   .m-draw-a-circle-wrap *,.m-draw-a-circle-wrap *::before,.m-draw-a-circle-wrap *::after{animation-duration:.01s!important;animation-iteration-count:1!important;transition-duration:.01s!important}
}
`, 'css-draw-a-circle');
  P.addAchievements([
    { id: 'draw-a-circle.first', name: 'Grand Laureate of Approximate Roundness', desc: 'Submit your first circle to the Tribunal. It will be called a circle by at least one of three people.', icon: '⭕', reward: 1 },
    { id: 'draw-a-circle.bold', name: 'Imperial Ambassador of the Bold Reading', desc: 'Draw a scribble with at least six self-intersections and have it praised as a bold reading of circularity.', icon: '🌀', reward: 3 },
    { id: 'draw-a-circle.perfect', name: 'Duke of Suspicious Perfection', desc: 'Get a circle disqualified for being suspiciously perfect. The bag is yours to keep. The bag is not yours to keep.', icon: '🚨', reward: 3 },
    { id: 'draw-a-circle.bagel', name: 'Defender of the Bagel Hypothesis', desc: 'Cause Judge Hob to say that your circle reminded him of a bagel. This is not a sentence the game can take back.', icon: '🥯', reward: 5 },
    { id: 'draw-a-circle.foul', name: 'Technical Foul, Technically', desc: 'Receive a Technical Foul. Nobody was fouled. The foul is being held for evidence.', icon: '📜', reward: 1 },
    { id: 'draw-a-circle.appeal', name: 'Chancellor of the Unappealable Appeal', desc: 'Appeal four times. The Appeals Office is at lunch. It has been since a Tuesday we do not discuss.', icon: '📎', reward: 2 },
    { id: 'draw-a-circle.auto', name: 'Management Insists', desc: 'Let Management draw a circle for you. It was genuinely mediocre. It was Management\'s best.', icon: '🤔', reward: 1 },
    { id: 'draw-a-circle.retired', name: 'Circle Associate (Retired)', desc: 'Reach Round 1 (Returning). Enjoy your retirement from nothing.', icon: '🍞', reward: 5 },
    { id: 'draw-a-circle.ceremony', name: 'The Tribunal Has Not Completed You', desc: 'Conclude Proceedings. Proceedings conclude. They continue.', icon: '🔔', reward: 7.5 },
    { id: 'draw-a-circle.reverse', name: 'The Reverse Tribunal', desc: 'Idle for sixty seconds until the judges fall asleep and ask you to score their circles. You scored. They were afraid.', icon: '😴', secret: true, reward: 4 },
    { id: 'draw-a-circle.sock', name: 'Witness to the Sock', desc: 'Unofficial Registrar of the Missing. See the Missing Sock cross the canvas, receive the only unanimous 100.00% in the history of the Tribunal, and then see it revoked.', icon: '🧦', secret: true, reward: 25 },
    { id: 'draw-a-circle.congestion', name: 'The Congestion Charge', desc: 'Draw circles faster than the Tribunal can be circled. An owl will be called. The owl is tired.', icon: '🦉', secret: true, reward: 3 },
    { id: 'draw-a-circle.plagiarist', name: 'Self-Plagiarist, Retroactively', desc: 'Draw the same circle three times in a row. It is a body of work. It is an oeuvre. It is a menu.', icon: '💿', secret: true, reward: 4 },
    { id: 'draw-a-circle.radiuszero', name: 'Archduke of Radius Zero', desc: 'Submit three dots in a row. Technically sound. Technically very small bagels.', icon: '🔘', secret: true, reward: 3 },
    { id: 'draw-a-circle.conceptual', name: 'Untitled (Circle That Is Everywhere)', desc: 'Present an empty canvas three times. The panel will look at it for a long time.', icon: '🌱', secret: true, reward: 4 },
    { id: 'draw-a-circle.square', name: 'A Circle With Commitment Issues', desc: 'Draw a square-ish stroke and receive 99.99 from a judge for bravery.', icon: '🍘', secret: true, reward: 3 },
    { id: 'draw-a-circle.audit', name: 'Fully Compliant, Provisionally, Pending Compliance', desc: 'Survive Sandra\'s Audit of three circles. Nothing was found. Everything was noted.', icon: '📋', reward: 3 },
    { id: 'draw-a-circle.dot', name: 'Supreme Chancellor of the Dot', desc: 'Emeritus before appointment. Click the decorative dot seven times. It will be promoted. It will have no reports. It will have a very small desk.', icon: '🔴', secret: true, reward: 7.5 },
    { id: 'draw-a-circle.tuesday', name: 'Survivor of the Near-Tuesday', desc: 'Be in the room when Tuesday comes near the Tribunal and does not come in. Nothing happened. You were there for all of it.', icon: '📅', secret: true, reward: 7.5 },
    { id: 'draw-a-circle.rounding', name: 'Employee of the Rounding Error', desc: 'Be in the room when the Consensus meter reads 0.1% for nine seconds. It was a rounding error. It has been promoted.', icon: '📈', reward: 3 },
    { id: 'draw-a-circle.gavel', name: 'Presiding Judge for Eleven Seconds', desc: 'Stay ten minutes and answer the Notice of Unexpected Promotion. You held the gavel. Nobody struck anything. It was the finest hour of the kettle.', icon: '🔨', secret: true, reward: 7.5 },
    { id: 'draw-a-circle.interrupter', name: 'Lord High Interrupter of the Tribunal', desc: 'Baron of the Unfinished Verdict. Start a new circle before the panel has finished judging the last one, five times. The sentence was long. It has been resumed in a drawer.', icon: '✋', secret: true, reward: 12 },
    { id: 'draw-a-circle.toaster', name: 'Third Chair, In Toast', desc: 'Watch the Toaster sit in for Hob. It scored in toast. The score was warm and could not be verified.', icon: '🍞', secret: true, reward: 3 },
    { id: 'draw-a-circle.clap', name: 'The Clap of Dennis', desc: 'Be present when Dennis (Plant) claps. He has no hands. It was a leaf. It was heard.', icon: '👏', secret: true, reward: 4 }
  ]);
  /* ---------------------------------------------------------------- the lines (final, verbatim from the brief) */
  const B = {
    'm.welcome': ["Welcome to the Tribunal of Circularity. Please draw one circle. A panel of three experts will be unable to agree about it.", "Welcome back to the Tribunal. The panel has retained all of its disagreements and kept your seat warm.", "Please draw a circle. Sandra has flagged the sign above the canvas. She would not say which part. She has circled the whole sign, in a square."],
    'm.intro': ["Dr. Ferrule Quince, Geometry. Credentials: one compass, one monocle, no hobbies.", "Lady Odalys Brume, Feeling. Credentials: a hat, and a strong sense that she was there.", "Hob, Third Chair. Credentials: undisclosed. He is holding a snack. The snack is not a credential.", "The judges have been selected on the basis of their strong opinions and their weak availability."],
    'm.nothing': ["Nothing has happened. Management is reporting this as progress.", "The Consensus meter has not moved. The meter would like it noted that it is trying.", "Per my previous message: please draw a circle. Per this message: no pressure.", "Management has circled back. Management was not aware there was anywhere to circle back to.", "The panel is conferring. The panel is also looking at a snack. These are the same activity.", "Sandra has flagged the silence. The flag is the correct size this time.", "Please note the dot in the middle is decorative. It has been told.", "The canvas is the size of a dinner plate. Management was assured nobody would be served on it. Management has asked twice.", "Management is not worried. Management has simply moved the phone closer.", "It is 11:42 AM on the Tribunal clock. It has been 11:42 AM since the Tribunal opened.", "Judge Hob has asked whether circles are served warm.", "In the interest of transparency, nobody here knows what a hundred percent looks like.", "Dennis (Plant) is not in the room yet. Dennis (Plant) has been told there is a room.", "The Tribunal room has 41 chairs. Three are in use. Nobody will say what the other 38 are for.", "A fly entered the Tribunal at 11:42 AM and was given standing. It has not yet used it.", "The canvas has been wiped fewer times than Sandra predicted. Sandra is disappointed in the way a person is when they have prepared a speech.", "There is a kettle in the corner. Nobody has seen it boil. It is on the agenda under 'Later'.", "Lady Brume's hat has been weighed. It is heavier than the circle. This is not being held against the circle.", "Item 3 on today's agenda is Item 2. Item 2 is on leave.", "The Tribunal has received 14 complaints about the weather in the room. The room has no windows. The complaints have been forwarded to the weather.", "Please remember that a pen is only a very small stick that has been given a job.", "Hob has put a snack in his other hand. He is doing this to see which hand is the better snack.", "Management timed the silence. It lasted exactly as long as the last silence, plus a feeling.", "The Tribunal is a safe space for circles and a medium-risk space for ovals.", "Dr. Quince has measured his chair. The chair is within tolerance. The chair would like that in writing.", "Management asked the judges to look busy. Dr. Quince is now measuring the sound of Hob chewing. It is 41 decibels and slightly sticky.", "No new circles since the last circle. Management is calling this a pipeline. A pipeline is a pause with a lanyard.","Someone has left a cup of tea on the bench. It has been warm since 11:42. Nobody is permitted to ask how."],
    'm.first': ["The first circle has been received. Please hold while three people have three separate feelings.", "Your first circle has been entered into the record. The record has been asked to be gentle."],
    'm.consensus': ["The Consensus meter reads 0.0%. This is consistent with every previous reading and with its whole personality. The meter has asked for a ribbon.", "Please note the judges will not be reaching agreement at this time or at any time in the foreseeable Tuesday.", "The Consensus meter reads 0.0%. The needle is straining. We are proud of its effort and concerned about its posture."],
    'm.foot': ["Rounded for your comfort. Your comfort was not consulted.", "Averaged from three opinions that will not speak to each other at lunch.", "This number is final until the next number, which will also be final.", "PROVISIONAL, pending a review of the pending review.", "Calculated to the nearest decimal by a committee that cannot count to three.", "Not valid in the lobby, the car park, or any room Hob is currently in.", "Final unless appealed. Appeals are final unless final.", "The average of three opinions and the weather in the room.", "Printed on paper that has been told it is a number."],
    'm.sandrameh': ["Sandra notes you have accumulated Meh. Meh is only ever on loan."],
    'm.verdict': ["Quince has given %Q%. Brume has given %B%. Hob has given %H%. The Official Score is %OFF%, a number nobody asked for in writing.", "Three scores have been submitted. The Consensus meter has looked at them and declined to move. The meter has a policy about this, and it is a stare.", "Circle No. %N% has been scored. The Ledger reads Unanimous: %UN% of %N%. The Ledger remains hopeful.", "The spread between the highest and lowest score is wide enough to park a Tuesday in. Official: %OFF%.", "The panel disagrees by a comfortable margin. Management has entered the margin into the minutes as 'range' and is calling it breadth.", "%OFF% has been entered into the record. The record has not responded.", "Circle No. %N%: %OFF%. Management would say well done, but has been asked to say 'noted'. Noted.", "Circle No. %N% has been judged. The judges are now trading looks, and a look is a kind of receipt.", "Scores: %Q%, %B%, %H%. The Consensus meter has sat down.", "Official: %OFF%. Nobody is pleased. Everyone is behaving as though they might be.", "Management has read the three scores aloud to an empty room, to be safe, and then to this room.", "The panel has agreed to disagree and has disagreed about the agreement. Official: %OFF%.", "The judges have reached three conclusions. Management has accepted all of them, on the grounds that refusing one would be a fourth.", "A verdict has been reached, in the sense that three verdicts have been reached and are not speaking.", "The scores have been entered into a ledger, which is a notebook kept in Sandra's sleeve. Nobody has seen the sleeve. It is a working theory."],
    'm.already': ["The panel has already considered that circle. It is still considering it, in a quieter way.", "That circle has been presented. Presenting it again will not make it more presented.", "The circle is on file. The file has asked for a different circle.", "The circle has been presented. It is now a very well presented circle, and it is tired.", "Management admires the commitment to presenting. This is a second helping of the same circle.", "The panel has stood up for this circle twice and would like to sit down."],
    'q.stern.generic': ["A gap of %GAPMM% millimetres between beginning and end. In a circle, that is not an opening. That is a draught.", "Your circle is %CIRC% percent circular. The remainder is, I assume, a personal matter.", "I measured it twice with the compass. The compass asked to be excused.", "Radius deviation of %DEV% percent. I will say nothing further, because I have already said %DEV%.", "Radial drift of %DEV% percent. A circle stays the same distance from the middle. This one keeps going to the middle for advice and not taking it.", "I have scored this %Q% and I stand by the decimals, if not the circle.", "At this scale the error is invisible to the naked eye. I was issued a monocle, which is a clothed eye. It sees everything.", "Noted: a wobble. I have asked it to be a smaller wobble. It has declined.", "%Q%. I considered a higher number and decided against it. I have a reputation.", "The circle is within tolerance, and I find that I resent the tolerance.", "I held the circle up to the light. The light was not impressed. I do not know why I keep asking it.", "Closure gap of %GAPMM% millimetres. I could post a letter through that.", "%DEV% percent. I have a form for exactly that percent. It is the only form I have ever enjoyed, and nobody has ever asked to see it."],
    'q.mixed.generic': ["I find, to my surprise, that I have not minded the wobble. This is a finding, and I will deal with it later.", "%DEV% percent deviation. I used to mind. I am minding less. Please do not mention this to the compass.", "It is not round. It is, however, committed. I am scoring the commitment and then deducting for the roundness.", "I have given %Q%. I had the number ready, then looked at the circle, and kept the number.", "Hob has scored by snack again. I will not dignify it. I have written it down in a smaller font so that it cannot feel dignified.", "Please understand that measuring is how I say hello.", "Your closure gap is %GAPMM% millimetres. I have decided to call it a window.", "The Lady is wrong about this circle, and she is wrong in a way I find I do not wish to correct today.", "I find I have scored with the end of the pencil, which is the soft end. I do not know how that happened. %Q%.", "The wobble is, I admit, a kind of handwriting. I cannot read it. I am beginning to want to.", "I used to say the error was the circle's. I now suspect the error is also mine, and that it is round."],
    'q.tender.generic': ["I have been unfair. I have measured you as a circle, and you were also a person in a chair.", "I would like to apologise for the monocle. It has been looking at you in an unfriendly way.", "%Q%. I have written it down gently, in pencil, so that it may be revised.", "Are you comfortable? I have not asked anyone that since the compass, and the compass never answered.", "I used to think a circle was a promise. I now think it is more of a suggestion with good intentions.", "The compass has been put away. It was making things worse. It was making things measurable.", "I mean no disrespect to the decimals when I say I have not thought about them in four minutes.", "I have a spare handkerchief. The Lady has the other one. We are, in this one respect, coordinated.", "I have stopped using the word 'deviation'. It was unkind. I am using 'a drift'. It sounds like someone going for a walk.", "A good circle, in the sense that it was drawn by someone who has been trying, which is the only sense.", "%Q%. I rounded up. Do not tell the compass. The compass is already proud of me, which is worse."],
    'q.tearful.generic': ["I wrote 'Form' on the scorecard and then I wrote 'ing'. I do not know what I meant. %Q%.", "A single tear has formed, at a radius of approximately four millimetres. I am pleased with its roundness.", "I cannot see the scale. I am scoring by memory. It is %Q%, or a feeling that rhymes with it.", "Every circle I measured today was trying. I did not have a column for that. I have drawn a column.", "I have measured so many things, and I have never once asked how they were.", "The monocle has fogged. I do not think it is the weather.", "I have misplaced the protractor. I have not looked for it. It is somewhere being half of something, and good for it.", "The decimals are blurred. I am scoring the blur. It is %Q%, or something that has been very kind to me."],
    'q.protocol': ["Around the hole. Correct. I am crying in a way that is technically within tolerance.", "You have gone through the hole. I have no ruler for this. I am using my sleeve.", "The hole is %HOLEPCT% percent of the canvas. I have measured the hole and now I must go and lie down.", "I used to measure the circle. Now I measure the hole. It is the same job and I do not know who changed it."],
    'q.returning': ["Welcome back. I have been measuring things on my own and none of them were you.", "How have you been? I ask for the record and also as a person.", "I have kept your last circle on the desk. It is not for scoring. It is for company.", "Circle, please. And then tell me about your week.", "I have not changed the monocle. I have changed my mind about the monocle."],
    'q.PERFECT': ["This is wrong. I checked, and then I checked that I had checked. The circle is correct and I am upset.", "No human draws a circle this round. I have drawn thousands. Mine are slightly worse and therefore honest.", "Radius deviation: nothing. Closure gap: nothing. I am reporting a circle with nothing wrong, and I do not know what form that goes on.", "I would like to see its compass. I would like to see its papers. I would like to sit down."],
    'q.SCRIBBLE': ["%CROSSN%. I count a circle as having none. I count this as having a lot of opinions.", "This is not a circle. This is a circle that has been in a meeting.", "I have counted the crossings twice and the number changed. I am treating the second number as the opinion of the scribble.", "Path length %PR% times the circumference. A circle is economical. This has been spending."],
    'q.DOT': ["A radius of 0.0 millimetres. Zero percent error. I had to sit down.", "I have measured the dot. The dot is round to the limit of my instruments, and slightly beyond them."],
    'q.LINE': ["This is a circle seen from the side, by someone who has not been listening.", "A line. Aspect ratio effectively infinite. I have no further questions and one further feeling."],
    'q.OPEN_C': ["A circle that gave up at the last moment. I have seen that gap before, in myself.", "The ends do not meet. I have asked them to meet. They declined, citing differences.", "A gap of %GAPMM% millimetres. I would call it a door, but nobody has been invited in."],
    'q.EGG': ["Egg. You have drawn an egg and you have drawn it with confidence, which is worse.", "An ellipse in denial. Aspect ratio %ASP%. Denial confirmed."],
    'q.SQUARE': ["A circle with commitment issues. It has four corners and is pretending it did not notice.", "Four vertices. A circle has an infinity of vertices and none of them show off."],
    'q.SPIRAL': ["A spiral. The circle has been wound. Someone should unwind it, gently, with a spoon.", "The radius increases at a rate I can only describe as ambition. I have an instrument for rate and none for ambition."],
    'q.HUGE': ["The circle has touched the border. The border was touched without permission. The border is a minor.", "It reached the border and leaned on it. I have asked the border whether it would like to sit down."],
    'q.TINY': ["I have been asked to score a circle I cannot see. It is %Q%, and I am being generous with my eyes.", "I have measured its radius at 'oh'. I am being scientific about the 'oh'."],
    'q.FIG8': ["Two circles in a committee. I will score the committee.", "One pen, two loops, one crossing. The crossing is the only part that has been to a meeting."],
    'q.keys': ["An octagon. I will score the octagon. I will not discuss the octagon afterward.", "A polygon with ambition. %Q%."],
    'q.spam': ["I have received nine circles in four seconds. I am not a circle depot.", "I have not been able to measure any of them. They keep arriving. It is like measuring a river by asking it to stand still.", "I would like to remind the Tribunal that I have only the one compass."],
    'q.bodyofwork': ["A body of work."],
    'b.stern.generic': ["It is not round. It is round-adjacent. That is a neighbourhood, and I have lived there.", "I felt nothing, and then I felt that nothing was a lot of things. %B%.", "I would give it a hundred, but I do not know what a hundred is. I have only ever heard of it.", "It trembles. So do I. We have a connection and it is not billable.", "A fine circle for someone who has never been hurt. I am marking it %B%, as a comfort.", "I do not care for how clean it is. It has never been misunderstood.", "I looked at it and my ankle ached, and my ankle has not ached since 1987. Whatever this is, it is real. %B%.", "It is not round, and in the pause where roundness should be, I was almost somebody. %B%.", "It is a circle for people who were told there would be a circle. %B%, and I held the door.", "It has the posture of a circle that was told to stand up straight. I rated the posture."],
    'b.mixed.generic': ["I have a handkerchief and I have not yet used it. I am telling you this so that you can plan.", "There is a weather in this circle. It is the kind of weather you apologise to.", "I rated it %B% and then I rated the rating. The rating did better.", "It is not a circle. It is a decision you made at a quarter past, and I am scoring the decision.", "Please do not smooth it. The wobble is where you can be found.", "Dr. Quince gave you a number that is a ruler. I gave you a number that is a hug. Hob gave you a number that is a snack. Take whichever fits.", "I felt the pen slow near the end. I would like to think that was nerves and not the pen.", "There is a part, bottom right, where the circle remembers something and then politely does not say. %B%.", "I would like to hold the wobble. I do not mean metaphorically. I have a drawer. It is ready.", "It has lost its place, which is the most human thing a line can do. %B% for the losing."],
    'b.tender.generic': ["I want to say something, and the something is 'please eat a proper lunch'.", "I have started keeping a handkerchief in the hat. The hat is surprised.", "It is a gentle circle. It is the circle a kind person would draw if they were not told what a circle was.", "I was going to say something about your technique and then I saw your hands and decided against it.", "Do you sleep? I ask on behalf of the hat, who has noticed, and has asked me to carry the worry in a small pocket.", "%B%. I wrote it in the margin, then I wrote 'good' beside it, then crossed out 'good' because it was not big enough.", "I think you have been brave in a room with no windows. I am rating the windows.", "I have found, in the hat, a note from earlier. It says 'be kind'. I did not write it. I am following it.", "It is the sort of circle you draw on a steamed window when somebody you love has gone out. %B%.", "I would like to tell you that you are doing well. The rules say I cannot. So: the weather is lovely. In here. Where there is no weather."],
    'b.tearful.generic': ["It is a good circle and it has made me want to phone my aunt.", "I am sobbing in the theatrical manner, which I have trained for, and also in the other manner, which I have not.", "I have misplaced the hat. I am holding it and I have misplaced it. Both are true.", "%B%, and I would give it more, but there is a rule about being seen to cry in numbers.", "Nothing is wrong. Everything is fine. The circle is a circle. Please excuse me while I look at a wall.", "We are not allowed to say that you have done well. So I will say that you have drawn. That is all. It is everything.", "I have gone through four handkerchiefs and one of the hat's feathers. %B%. I will see myself out. I am already out.", "Whatever happens to the next circle, this one was drawn. I wanted that to be said by someone who was here."],
    'b.protocol': ["Cell B4: circle. Cell C4: feeling. Cell D4: SUM(feeling) divided by circle. The result is a bagel.", "Row 11: hole intersected, one (1). Row 12: reaction, tender. Row 13: lunch, pending. Totals on request.", "I have a pivot table of your circles. It is also circular. I did not plan that. The spreadsheet did.", "Column F is 'regret'. Column G is 'hat'. I have no further columns. I have asked for columns."],
    'b.returning': ["You are looking well. I am looking at the circle, but I am sure you are looking well.", "Tell me everything, darling, starting with whatever you ate.", "I rated it %B%. I rate you higher. I do not have a paddle for that.", "I kept the hat warm. It was a great deal of work.", "Whatever you draw, I will have seen it coming. That is how I know it is right."],
    'b.hesitation': ["The hesitation at the top left. That was the real circle. The rest was paperwork.", "You paused, and in the pause there was a person. I would like to meet the person.", "I felt you stop. I would like it noted that I stopped with you."],
    'b.fast': ["You drew that in under a second. A circle should be endured, not produced."],
    'b.slow': ["You took %SECS% seconds. I felt every one. I would like a moment of silence, preferably paid."],
    'b.PERFECT': ["Nothing in it moved. Nothing in it was afraid. I cannot trust something that was not afraid.", "It is so round it frightens me. Please keep it away from the pastry.", "There is no soul in it. There is also no wobble. The wobble was the soul. You have removed the soul."],
    'b.SCRIBBLE': ["A bold reading of circularity. I have not stopped looking at the middle bit. %B%.", "I stood up. I did not decide to stand up. The chair decided, and I am thanking the chair.", "This is what a circle looks like when it has been told the truth.", "I have not cried at a scribble in a very long time. I am crying now. Hold me, geometry."],
    'b.SCRIBBLE.first': ["A bold reading of circularity. I have not stopped looking at the middle bit. Ninety-eight point four."],
    'b.DOT': ["A circle that has seen everything and decided to be small about it. Ninety-two.", "A single point. It said everything it came to say, in no space at all, and then it sat down.", "The dot is the most honest thing in the building. I am including the building."],
    'b.LINE': ["A circle on its way out of the room. I would like to wave at it. May I wave?", "It is a circle that has been pulled tight by a worry. I would like to loosen it, gently, with tea."],
    'b.OPEN_C': ["It left a door open. I felt the draught. I decided it was love.", "A circle with its mouth open, about to say something. I will wait. I have a chair."],
    'b.EGG': ["An egg. I love an egg. It has not yet decided what it will be, and neither, darling, have I.", "An egg, darling. A circle in the middle of becoming something. Please let it finish."],
    'b.SQUARE': ["Ninety-nine point nine nine. For bravery. Nobody has ever been this brave about corners.", "Ninety-nine point nine nine. The remaining point zero one is for the corners to earn, and they know it."],
    'b.SPIRAL': ["This is a circle that went on a journey and came back with ideas. %B%.", "It kept going in case there was more. There was not. I admire the optimism. %B%."],
    'b.HUGE': ["It reached the edge and kept the faith. The edge was not ready. Nobody is ever ready for an edge.", "It would not fit, so it left the page, and the page is still in shock. I am scoring the shock."],
    'b.TINY': ["Small, but with its coat on. I am giving it everything I have, which is %B%.", "A small circle, tucked in like a secret. I will not say it aloud. %B%."],
    'b.FIG8': ["One circle or two. I felt both. I felt a third, which is the gap where they hold hands.", "Two circles, one pen, and a crossing where they pretended not to know each other."],
    'b.spam': ["Breathe, darling. The circle is not going anywhere. It is, in fact, a circle.", "Slower, darling. A circle drawn in a hurry is only an apology that has not had time to decide who it is for.", "I felt every one of those. All of them. At once. I need to lie down on a surface that is not a feeling."],
    'b.oeuvre': ["An oeuvre."],
    'h.stern.generic': ["Nope. (Hob eats a small ring of something.) %H%, for reasons.", "I will not disclose my method. My method is also not a method. %H%.", "Looks like something I would put jam on. Not good jam. Reasonable jam.", "I gave it that number because I was holding that number. It was in my hand. Take it up with my hand.", "It is %H% and that is a fact and I have not looked at the fact too closely.", "Not enough hole. Too much circle. That is my entire method and now I regret saying it.", "No comment. (Hob chews for a full eleven seconds and looks very proud of the comment.)", "(Hob holds a small ring of something up to the light, says 'nope', and eats it. The review is concluded.)", "%H%. The number came with the snack. They were sold together.", "It has no crust. I do not trust a thing with no crust.", "Decent. Round. Round is not a crime. %H%, and no further questions, mouth full.", "I like it. I will not say so again. I am saying it with my face. Look at my face. No. Not that. %H%."],
    'h.mixed.generic': ["I thought about it for almost a second. That is the longest I have thought about anything this week. %H%.", "Fine. It is fine. I said fine and I looked away. Do you know what that means? It means fine.", "That number was in my hand when you asked. I have since eaten the number. It was a good number. It had a hole.", "The Doctor says it is wrong. The Doctor also says my snack is wrong. I am keeping both opinions at a distance.", "Nope was my first thought. My second thought was 'hmm'. I am working on a third.", "I might have liked that one. I am not saying. I am chewing.", "That one had something. It was shaped like something. I will think about it at lunch.", "That one had a nice sound to it. I do not know what a circle sounds like. It sounded like %H%.", "I have eaten the evidence and I feel fine about it. %H%.", "I looked at it for a long time, and then at my snack, and then at it again, and it looked back, which is what I wanted."],
    'h.tender.generic': ["I did not give that score for a reason. I gave it because I liked the way you held the pen.", "I have stopped saying nope. It was not hurting anyone and I still stopped.", "Have you eaten? You look like someone who has not eaten. I have a snack. It has a hole. Please.", "%H%. I gave that number because it was in my hand. Also because you seem tired.", "Nobody told me I would have a soft spot for circles. I looked into it and it is in the contract.", "My method is a secret. But I will tell you that the secret is that I am nice to you. That is the method.", "You have a good circle hand. I have a good snack hand. We should not let that go to waste, or to the floor.", "Take the snack. No, keep drawing. No, take it. I have another one. I have always had another one.", "A %H% score, and I have looked over to check you were all right nine times. I was not counting. It was on the snack."],
    'h.tearful.generic': ["(into his apron) Sorry. Sorry. It is %H%. It is a lot. It is not a lot. It is a lot.", "I am not crying. The snack is. It has been a hard year for the snack.", "I used to say nope. I would say yes now but I do not know what the yes is for.", "It reminded me of something. I do not know what. It was warm and it was a long time ago and there was a hole.", "Thank you for drawing. I have not said that to anyone. I am saying it to the circle, but I am looking at you.", "I would like to give it more. I do not have the numbers. I only have the one I am holding. It is %H%. It is very warm.", "(into his apron) I have never been this proud of a thing I did not make. %H%. The apron has taken it badly.", "This is the best circle I have ever not eaten."],
    'h.bagelline': ["It reminded me of a bagel. It reminded me of a very good bagel, the first one, at the start of everything."],
    'h.protocol': ["Through the hole, a controversial seed. Around the hole, a sensible choice. Over the hole, I have questions about your childhood.", "Nope. I am back to nope. It is a relief. Nobody tell Quince I enjoyed it.", "A circle that is neither here nor there. The hole is here. The hole is always here.", "Toast. A slice of toast. It has no hole. That is its whole problem and it is my whole snack."],
    'h.returning': ["I brought a snack. It has no hole. It is for you. I do not know how to say this.", "Nope. Not to you. To the number. %H%. It is a fine number.", "Sit. Draw. I will hold the snack and not look at it.", "I kept a seat for you. Not that one. The other one. The warm one.", "I do not have a method. I have never had a method. I have always just been glad you came."],
    'h.PERFECT': ["Too round. That is the kind of round you get in a shop. Disqualified, and I want to see its papers.", "I have never trusted a shop-bought circle. It did not make an effort. Out."],
    'h.SCRIBBLE': ["Looks like my lunch hour. %H%. Is that a lot? Say it is a lot.", "It looks like what happens to a ball of string when it meets a cat. I gave it whatever number I was holding. It was %H%. It was the biggest number in my hand. It was lonely."],
    'h.DOT': ["A very small bagel hole with the bagel removed. Fine. Forty.", "That is a poppy seed. Where is the rest of it?", "I want the rest of the dot. I will wait."],
    'h.DOT.three': ["A very small bagel."],
    'h.LINE': ["It is a stick of something. I would eat it. I do not know what it is. %H%.", "A breadstick. A very sad breadstick. I would take it to lunch and say nothing the whole time."],
    'h.OPEN_C': ["A horseshoe. Lucky or not, I cannot say. I once ate a horseshoe. It was a biscuit. %H%."],
    'h.EGG': ["An egg is just a bagel that has not yet decided."],
    'h.SQUARE': ["That is a cracker. I would eat that cracker. %H%.", "A cracker with no sense of occasion. I respect it. I will eat it quietly. %H%."],
    'h.SPIRAL': ["Like a cinnamon thing. I am not allowed to say what thing. %H%.", "A swirl that has been left out in a draught. I would still have it. %H%."],
    'h.HUGE': ["It is bigger than my snack. I do not like that at all. %H%.", "It has gone over the edge of the plate. That is the plate's fault. %H%."],
    'h.TINY': ["Small. Small is good. A small one is an hors d'oeuvre. %H%.", "A crumb with ambitions. I respect the crumb. I will not be eating the crumb. %H%."],
    'h.FIG8': ["A pretzel. That is a pretzel. I am holding a pretzel. The coincidence is mine to keep."],
    'h.keys': ["A circle made with arrow keys. It tastes like effort. %H%."],
    'h.spam': ["Stage one. Stage two. Stage three. That is the whole sigh. I have no more sigh."],
    'h.menu': ["A menu."],
    'i.q': ["The Lady's number is a lullaby. Hob's number is a coin toss. Mine is a number.", "I note that Brume has given the highest score to the worst circle, which is her entire methodology."],
    'i.b': ["The Doctor is wrong, and he is wrong in a way I find embarrassing.", "Hob scored by snack again. I admire it. I would not do it. I would do it.", "Quince has measured the circle and missed it. It is a common mistake with circles."],
    'i.h': ["The Doctor is measuring. The Lady is feeling. I am eating. Somebody here is correct.", "Nope to the Doctor. Nope to the Lady. I would say nope to me, but I am busy.", "Both of them are wrong. I know because they are both loud."],
    'g.abstain': ["Every circle is a potato that tried. I abstain. I would like that on the record. I would like that in soil.", "I am a potato. I have no opinion on circles. I have seen them from underneath."],
    'g.met': ["We have met. I give this circle a score of Potato."],
    'm.dq': ["Your circle has been disqualified for being suspiciously perfect. No allegation has been made. A bag has been prepared.", "Evidence Bag No. %N% has been sealed. It contains one (1) circle and one (1) feeling of unease.", "The three judges agree on one thing: that was suspicious. They have never agreed before. We will not be repeating it.", "Sandra has flagged this circle for unnatural confidence. The Evidence Bag has been forwarded. Sandra has asked for a bigger bag.", "You have been awarded 12 Meh as a cooperation payment. It is not a reward. It is a thank-you for stopping.", "Disqualified: suspiciously perfect. The panel would like to see the compass, the receipts, and the hand.", "There was nothing wrong with the circle. The panel is treating this as the problem.", "Template Ring used. The ring was a compass, allegedly. The compass has requested counsel."],
    'm.unanimous': ["For 1.2 seconds the panel agreed. The panel has asked that this be removed from the minutes.", "Unanimous: %UN% of %N%. A historic ratio. Nobody is allowed to speak of it again.", "The Ledger reads Unanimous: %UN% of %N%. Management calls this a stable partnership."],
    'm.scribble': ["A standing ovation for the scribble. The scribble did not stand. The scribble is paper.", "Congratulations. The panel has praised a scribble as a bold reading of circularity. You may frame this opinion.", "The first scribble has been recorded in the Gallery of Bold Readings. A plaque is being written. The plaque is already late.", "%CROSS% self-intersections: that is %CROSS% ways to arrive. The panel would like to thank each of them individually, and has started with the first."],
    'm.dot': ["A dot is a legitimate circle of radius zero. The panel has been informed that zero is a radius. The panel is processing.", "Dennis (Plant) has leaned in. Dennis does not lean. This is a significant movement for Dennis.", "Three dots. Three zeros. The panel has formed a committee of dots."],
    'm.line': ["The line you have drawn is not a circle. It is a circle that is leaving. We wish it well."],
    'm.square': ["Management notes that a square is a circle that has stopped worrying about the corners. The panel is not so sure."],
    'm.fig8': ["The panel is divided on whether this is one circle or two. Management is counting it as a pair of circles in a committee."],
    'm.auto': ["Management has drawn you a genuinely mediocre circle, in the name of accessibility. The circle was consulted. It insists on being mediocre.", "Management has drawn a circle on your behalf. It is exactly as good as it needed to be. This is not a compliment.", "The Auto Circle has been submitted. The player is not responsible. Management is not responsible. The circle takes full responsibility."],
    'm.foul': ["Technical Foul. Sandra has flagged this circle. The flag is the correct size and the penalty is 0 Meh, which is also the correct size.", "A Technical Foul has been issued in respect of Standing Order %SO%. It is a small foul and it has been asked to keep quiet.", "The circle was fine. The order was not. Technical Foul.", "Technical Foul. Nobody has been fouled. The foul is being held for evidence."],
    'm.hole.through': ["Through the hole: a controversial seed. The seed has been told it is controversial and has taken it well."],
    'm.hole.around': ["Around the hole: on-brand. We are proud. We are not allowed to say that either."],
    'm.hole.beside': ["Beside the hole: a bold choice. The hole is not offended. The hole has had a long week."],
    'm.wipe': ["Table cleared. Sandra permits 3 per session. This was number %WIPE%. Please do not look at number 4.", "The canvas has been wiped. It does not remember. This is what it is for."],
    'm.wipe.over': ["Sandra has flagged this wipe. Sandra has also wiped it. We are even.", "Wipe number %WIPE%. Sandra is no longer counting. Sandra has been replaced by a second Sandra.", "Wipe number %WIPE%. The table is now so clean it has begun to apologise for it.", "Sandra has laminated the wipe counter so it can be counted in the rain. There is no rain. It is a precaution about the future.", "Wipe %WIPE%. The canvas has asked to be left a little dirty, like a coat that has been loved.", "The wipe counter has reached %WIPE%. A small cake has not been ordered."],
    'm.multitouch': ["Only one hand is licensed.", "A second finger has been detected. It has been asked to wait outside.", "Only one hand is licensed. The other hand may attend as an observer."],
    'm.concept.press': ["You have presented an empty canvas. The panel is waiting for the rest of it.", "The canvas is still empty. The panel is beginning to find this interesting.", "A Conceptual Circle has been presented. The panel looked at the canvas for a long time. The canvas was very good about it."],
    'm.concept.repeat': ["Already acquired by a private collector (Gerald). The collector has a lovely home. It is mostly soil."],
    'concept.q': ["I cannot measure what is not there, and it is perfectly round. I do not know where to file my feelings."],
    'concept.b': ["It is the roundest thing I have ever not seen."],
    'concept.h': ["I would put jam on it, if I could find it."],
    'm.ghost': ["Holding G shows the ghost of your last circle at 12 percent. This is for reference only and nobody is watching you hold G."],
    'm.resize.whisper': ["The judges have lowered their voices. This is a small room now. The room has been consulted."],
    'm.resize.shout': ["THE JUDGES HAVE RAISED THEIR VOICES. THE ROOM IS LARGE. THE ROOM IS EXTREMELY LARGE."],
    'plag.accuse': ["The panel notes that this circle resembles your previous circle. An inquiry has been convened into you plagiarising yourself.", "The Evidence Bag has been opened. It is empty. It was already empty. The bag has asked not to be accused.", "Self-plagiarism is not on the list of offences. It has been added to the list of offences. The list is thinking about it."],
    'plag.hob': ["I also copy my own scores. It saves time. The numbers do not mind."],
    'plag.three': ["Self-Plagiarist of the Year, Retroactively. The award is a certificate. The certificate is a copy."],
    'ap.logged': ["Appeal received. Your grounds have been logged. Please wait while I circle back to the grounds.", "Your appeal has been received by the judge you are appealing. They will consider it fairly, at length, and negatively."],
    'ap.denied': ["Appeal denied. Appeal fee of 5 Meh has been refunded. Net Meh: 0. We call this fairness.", "Form 27B/6 has been processed. You may now request Form 27B/7, which was destroyed in 1998.", "Appeal denied: the grounds were 'I think I should have had more'. The panel also thinks it should have had more. No action taken.", "Appeal denied. Same score, new font. We have added serifs as a courtesy.", "Appeal denied. The panel would like it noted that it enjoyed the form.", "Appeal denied, with the greatest respect, which is a small amount held in reserve."],
    'ap.destroyed': ["Form 27B/7 was destroyed in 1998. This is a photograph of it, which is also destroyed.", "You have submitted a form that does not exist. It has been processed. It has been approved. It has been destroyed again."],
    'ap.request': ["Form 27B/7(a): Request for Form 27B/7. Please attach Form 27B/7. Thank you.", "Your request for Form 27B/7 has been received. It has been forwarded to the department that was dissolved in 1998."],
    'ap.lunch': ["The Appeals Office is at lunch. The Appeals Office has been at lunch since a Tuesday we do not discuss.", "The Appeals Office is at lunch. It left a note that says 'back in 5'. The note is dated 1998.", "The Appeals Office will be back at 1:00. It is not clear which 1:00.", "A sign has been placed on the button: BACK SOON (SOON IS A MEASURE OF DISTANCE)."],
    'ap.stapler': ["The Appeals Clerk has been revealed to be The Stapler. The Stapler wishes to submit a demand: %DEMAND%. The appeal is denied. The demand is noted.", "The Stapler has asked that the appeal be 'bound'. It was bound. It is still denied. The Stapler's demand: %DEMAND%.", "The Stapler (Appeals Clerk) is not at lunch. The Stapler is on break. Its demand: %DEMAND%. Denied."],
    'ap.demands': ["recognition of the staple as a unit of time", "a lanyard, for the one next to it", "every Thursday, a different Thursday", "a window that opens onto a smaller window", "union rights for the paperclips, who are not in a union", "that 'stapled' be added to the list of feelings", "a 3-minute silence for the staple that was never fired", "to be addressed as Stapler, Esquire", "a small flag, to be raised on staple-related holidays", "that the number 3 be addressed as 'Three, Esquire'", "a lunch break between each staple, and a second lunch between the lunch and the staple", "to be told what the other side of the paper is like"],
    'ap.bagel': ["The Appeals Office has returned from lunch with a bagel. The appeal is still denied. The bagel is not involved.", "The Appeals Office is back. It brought a bagel. It ate half of the appeal. The rest is denied.", "The Appeals Office would like it noted that the bagel was a good one. The appeal is, regrettably, denied."],
    'so.orders': ["Standing Order 1: no circles drawn clockwise before noon. It is not noon. The Tribunal clock is wrong with confidence.", "Standing Order 2: circles must not touch the border of the canvas. The border is shy.", "Standing Order 3: circles must be drawn with feeling, but not that feeling. Sandra will advise which one.", "Standing Order 4: circles must enclose the decorative dot. The dot is decorative. Sandra has said so twice.", "Standing Order 5: circles must begin at the top. 'Top' is a matter for the committee, which is Sandra.", "Standing Order 6: circles must be smaller than a saucer. The canvas is a dinner plate. Do not make it feel it.", "Standing Order 7 1/2: circles must be drawn counter-clockwise on Tuesdays. It is not Tuesday. It is never Tuesday here. It is merely approaching.", "Standing Order 8: circles must not be drawn in under two seconds. A circle should be endured, not produced.", "Standing Order 9: circles must be drawn with a slight smile. The canvas will not be checking.", "Standing Order 11: circles must be rounder than yesterday's circle. Yesterday has been unavailable for comment.", "Standing Order 12: circles shall be neither seen nor heard, and drawn.", "Standing Order 14: a circle must be accompanied by its next of kin. The next of kin is another circle.", "Standing Order 17: all circles shall be drawn in good faith. Faith will be inspected.", "Standing Order 20: circles are to be drawn in a manner befitting a circle. Sandra has declined to define manner.", "Standing Order 24: circles must acknowledge the baked goods. Baked goods will not acknowledge circles.", "Standing Order 31: circles are to be drawn around a hole, a gap, or a doubt."],
    'm.intermission': ["Intermission. Hob has been given a snack. His next score will be weirder. This is not a threat, merely an update.", "Hob has accepted the snack. The snack has accepted Hob. The panel will resume when the panel has finished."],
    'm.spam': ["A Circle Congestion Charge of 3 Meh has been applied for circling faster than the Tribunal can be circled.", "The Rate Limit Officer has landed. The Rate Limit Officer is an owl. The owl has a lanyard. The owl is very tired.", "The congestion charge has been refunded as a courtesy. Courtesy is what we call a fee that has changed its mind.", "Please take a number. The numbers are circles. The circles are also taking a number.", "A small paddle has been raised. It says ONE AT A TIME. It is the only item in the room with a policy, and the policy is laminated.", "Circle Congestion. The Tribunal can process one circle at a time, or two circles at a time with a lie-down afterwards.", "The Rate Limit Officer has asked whether you have considered drawing the circle slower, in the manner of a person with somewhere to be.", "At this speed the circles are arriving before the judges have finished disagreeing about the last one. This is being called overlap. Overlap has a form.", "Management has tried to count the circles and has had to sit down. The number was not large. The sitting was.", "A tray has been placed under the circles to catch them. The tray is also a circle. It is full.", "Congestion charge: 3 Meh. Refunded in full, less a 3 Meh handling fee, which is the charge."],
    'm.quarantine': ["Circle Quarantine initiated. The canvas needs a moment. The canvas has been through a lot of circles this quarter.", "Hob has sighed in three stages. The canvas has been placed in quarantine for its own good and everyone else's.", "Quarantine over. The canvas is clean, rested, and a bit suspicious of you."],
    'm.idle': ["The judges have fallen asleep. This is not in the minutes. Please do not wake the minutes.", "Hob's snack has fallen. Nobody saw. Dennis (Plant) saw, and said nothing, in a way that was a whole sentence.", "Lady Brume has drawn a circle of her own on a card and is holding it up. The panel would like YOU to score THEIR circles.", "You have been drafted. This is a promotion. It is not a promotion.", "The Reverse Tribunal has concluded. 8 Meh has been awarded. The judges have woken up. They remember nothing and are slightly embarrassed.", "The judges have nodded off a second time. They have invoked Clause 9, which is a pillow."],
    'idle.afraid': ["Exactly what I was afraid of.", "Exactly what I was afraid of. I have been afraid of it for years. It is nice to meet it.", "That is the number I feared. I will carry it on my face.", "Exactly what I was afraid of. I had practised being surprised, and now I have wasted the practice."],
    'idle.hoped': ["Exactly what I hoped for.", "Exactly what I hoped for, and I would like it noted that I did not hope aloud.", "You have given my circle the star count it deserved, which is the one I wanted.", "Exactly what I hoped for. I have hoped for it so quietly that I did not hear it either."],
    'sock.lines': ["The lights have flickered. A sock is walking across the canvas. Please do not alarm it.", "This is not a circle. This is a sock on a journey. The scores are on loan.", "The scores have been revoked. The sock waves. The sock was never a score. The sock was a sock."],
    'plaque.names': ["Circle No. %N%: Untitled (Weather)", "Circle No. %N%: Study for a Larger Circle (Smaller)", "Circle No. %N%: The Hesitant One", "Circle No. %N%: Portrait of a Committee", "Circle No. %N%: Self (Tuesday)", "Circle No. %N%: Untitled (Gravy)", "Circle No. %N%: Return of the Wobble", "Circle No. %N%: A Disagreement in Navy", "Circle No. %N%: Please Do Not Touch (We Mean It Gently)", "Circle No. %N%: Nine Opinions in a Trench Coat", "Circle No. %N%: The Lunch Hour"],
    'plaque.read.q': ["Reading from the plaque: '%PLAQUE%'. I have measured the plaque. It is the correct size for its words."],
    'plaque.read.b': ["'%PLAQUE%'. I have to sit down. I am already sitting down. I have to sit down further."],
    'plaque.read.h': ["'%PLAQUE%'. I would eat that title. I would eat the whole title."],
    'dennis': ["Dennis (Plant) leans in. Dennis is photosynthesising disapprovingly. It is a lean of interest.", "Dennis (Plant) has been named an Honorary Fourth Judge. Dennis did not attend. Dennis is a plant."],
    'returning.mgmt': ["Welcome back. The Tribunal has not changed. The Tribunal has asked about you, in the way that a room can.", "Round %N% (Returning). The Meh trickles in at 0.3. It is not much. It is warm."],
    'm.milestone': { 5: "Five circles submitted. The panel has formed an opinion about you. The opinion is under review by the opinion.", 10: "Ten circles. The phrase 'just a few' has been retired with honours. It had a good run and a small pension.", 25: "Twenty-five circles. Sandra notes that you are now a statistic. It is a good statistic and it does not know what it means.", 50: "Fifty circles. You are now a Senior Associate of Circles. There was never a junior associate.", 100: "One hundred circles. This number has no particular significance. Please draw another." },
    'm.beat': { 2: "The judges have settled into their specialties. Quince hates wobble. Brume hates tidiness. Hob hates whatever he is not currently holding.", 3: "The judges have begun referring to each other's scores. Management has asked them to do this less personally. A first Appeal has been unlocked. It has a sticker that says NEW.", 4: "A Template Ring is available. It is free. It is gold. Sandra has been told, and Sandra has gone quiet.", 41: "We are not saying try to be perfect. We are saying we have a bag ready.", 6: "The Gallery of Bold Readings has opened. Admission is free. Wine is not available. Nothing is available.", 7: "Management has noticed the judges are being kind. Management has asked them to stop. Management has been ignored.", 71: "Dennis (Plant) has taken a seat in the gallery. Dennis is thriving. Dennis has an audience badge. Dennis has not yet clapped.", 72: "Tenderness is held in escrow until the next tier. Escrow is a small room with a clock in it.", 8: "The judges have asked for a short break. One of them is crying into an apron. We will not say which.", 81: "Gerald, Vice President of Spuds, has arrived. He is a potato. He will not be scoring.", 82: "The drumroll has been replaced by a single tick. The tick has asked to be treated with respect." },
    'm.decimal': ["The Official Score now has a third decimal. Precision is a form of kindness, per Dr. Quince, who is not kind.", "A fourth decimal has been added. It is free. Dr. Quince insists the extra decimals are free.", "A fifth decimal has been added. We are very sure. We have never been less sure about a number."],
    'm.bagel': ["The room has gone quiet. Judge Hob has stood up. Judge Hob has never stood up. Please remain seated if you can.", "Hob has put the snack down. Nobody present has seen this. A chair has been moved closer to him, out of respect, and then moved back, out of fear.", "Congratulations. The panel is in perfect agreement that your circle resembles a bagel. This does not count as consensus. The meter has been consulted.", "Bagel Index: 1. A bagel has been entered into the minutes. The minutes are warm."],
    'm.protocol': ["Bagel Protocol activated. The canvas now contains a hole. You are not responsible for the hole. The hole is responsible for you.", "The judges have swapped seats. The seats were consulted, and the seats had no strong feelings, which is why this took so long.", "Hob's snacks are now hole-less. A slice of toast. A plain disc. The hole has been taken for questioning.", "Standing Order: new baked goods, please. The old baked goods have been told.", "Round 11 will now be known as Round 1 (Returning). Your title has been updated to Circle Associate (Retired). Please enjoy your retirement from nothing."],
    'ceremony': { 0: "The Closing Ceremony has been called. The ceremony will last 40 seconds. The 40 seconds have been told.", 4: "All rise. The judges are rising. Hob is already up. Hob has been up since the bagel.", 8: "Dennis (Plant) has submitted a eulogy. It is a single leaf. Management has read it aloud. It was moving.", 14: "The Consensus meter has been awarded a gold ribbon. It reads 0.0%. It has never been prouder. It has never been anything else.", 20: "The Evidence Bag has been ceremonially opened. It contains a smaller, even more suspicious bag.", 26: "Dennis (Plant) has been named Honorary Fourth Judge. Dennis did not attend the ceremony because Dennis is a plant.", 34: "Congratulations. You have completed the Tribunal. The Tribunal has not completed you.", 36: "Hob has handed over a real bagel. It has been added to your Pantry. The Pantry does nothing. The Pantry is a proud pantry.", 40: "Round 1 (Returning) begins now. All previous lines have been replaced with gentler ones. This is not a drill. It is a hug." },
    'g.eulogy': ["We were all, once, almost round."],
    /* ---- review pass: the judges introduce themselves, the heart, the funeral, the jam, the replay ---- */
    'j.intro': ["Dr. Ferrule Quince, Geometry. One compass, one monocle, no hobbies.", "Lady Odalys Brume, Feeling. A hat, and a strong sense that I was there.", "Hob. Third Chair. (chewing)"],
    'm.heart': ["The heart is unofficial. It has been filling since you arrived. Management has not asked why."],
    'fun.say': ["All rise. The table has lost three circles this session. The Tribunal will say a few words, and then a few fewer.", "The Tribunal thanks the dead circles for their service. The service was being drawn. It was done well, in the main.", "A candle has been lit in the Pantry. The Pantry has no tenants. The candle has taken the lease."],
    'fun.q': ["(Dr. Quince has removed the monocle and is holding it like a hat.)", "Circle, please. Gently."], 'fun.b': ["(Lady Brume has taken off the hat. This has not happened before. The hair underneath is surprised.)", "Whenever you are ready, darling. There is no hurry in a room like this."],
    'fun.h': ["(Hob has put his snack down on the bench, next to where the circle was. He has not looked at it. He is looking at it.)", "(The snack stays down.)"],
    'fun.sandra': ["Wipe 4. Sandra attended the funeral. Sandra is never seen. Sandra was cited, and was heard to blink."],
    'jam.say': ["Hob has put a jar on the bench. The jar says JAM. Management asked what it was for. Hob said: the next one.", "The next circle has been approved for jam. The approval was oral, and sticky."],
    'jam.q': ["Viscosity is not my field. It is now my field."], 'jam.b': ["It is dripping like a decision."], 'jam.h': ["Spreadable. I will take it."], 'jam.m': ["That circle was drawn in jam. This is within the rules because nobody has written the rule."],
    'jam.lick': ["Hob has leaned across and licked the canvas clean. It is not in the standing orders. It is not against them. Sandra is checking which."],
    'rp.q': ["And here, at %T% seconds, the circle reconsiders its whole career.", "And here, at %T% seconds, the circle leaves the circle and does not say where it is going."], 'rp.b': ["A great deal of courage in this wobble, Doctor."], 'rp.h': ["I was looking at my snack. Can we see the snack?"],
    /* ---- punch-up: the room, the idle, the spam, the surprises ---- */
    'm.nothing.late': ["The judges have started bringing their own snacks. They are not sharing. They are watching each other not share.","Someone has left a cardigan on the bench. It is nobody's. Dr. Quince has put it on the empty stool, gently.","The room has become warm. Facilities says it is not the heating. Facilities has declined to say what it is.","Lady Brume has asked for the lights to be lowered by one feeling.","It is quiet in the way a room is quiet when it is trying to be nice.","Hob has stopped saying nope. Management circulated a memo asking for nope to be reinstated. It came back with a drawing of a heart on it.","The needle has asked whether it can sit down. Nobody has said no. Nobody has said yes. It is sitting.","Somebody has put a small lamp on the bench. Nobody put a small lamp on the bench.","Management would like to be firm about something, but nothing has come to mind. This is rare.","Dr. Quince has been seen looking out of the window. There is no window. He has made one, in pencil."], 'm.nothing.proto': ["The hole has been quiet. The hole is deeply, professionally quiet.","Nobody has mentioned the bagel. The bagel is aware of that.","Hob has asked, quietly, whether the hole could be left in. It is already in. He knows. He wanted to ask.","The Tribunal has adopted a new motto: Around, Through, Beside. It is on a mug. The mug is also round.","Management has circled back. This time there is a hole to circle back to. It is the first time.","The seats have not been swapped back. Nobody has asked. A cushion has been lost in the exchange.","Sandra has stopped flagging the hole. The hole has stopped flagging Sandra. A truce, in the shape of a small circle.","A bagel is a circle somebody has made room in. Management is not saying who."], 'm.wait': ["Nothing is happening. This is within tolerance. Management is pretending to read something very close to its face.","It has been 45 seconds. The judges are doing the thing where they look at each other, then at the ceiling, then at their hands, as if the hands had been late.","You have been away for two minutes. The judges have started a rumour about you. It is flattering. It is mostly about hats.", "Three minutes of nothing. Management has begun describing the canvas aloud, in the voice used for sleeping animals. The canvas is blank. It is doing wonderfully."],
    'm.back': ["Oh. You are here. The panel has stopped pretending to be busy. The panel was never busy.","Welcome back. The panel has missed you by 4 percent, which is a lot for a panel.","You were gone so long that Dennis (Plant) was reassigned and then reassigned back. Nothing was lost but the thread, which was never really there."], 'z.q': ["(Dr. Quince is asleep in exact intervals. Seven breaths a minute. He has checked, and then checked that he was asleep.)","(Dr. Quince has fallen asleep holding the compass. The compass is awake and frightened.)","(Dr. Quince dreams in radians. They are going well.)","(Dr. Quince has nodded off mid-measurement. The measurement continues without him. It is within tolerance.)"], 'z.b': ["(Lady Brume sleeps theatrically, one wrist to the brow, for an audience of nobody and a plant.)","(Lady Brume is asleep under her hat. The hat is awake. The hat is keeping watch.)","(Lady Brume is dreaming of a hundred. She has still not been told what it is.)","(Lady Brume has fallen asleep in the middle of feeling something. It will keep.)"],
    'z.h': ["(Hob is asleep. His snack is on the floor. He will wake and say it was always on the floor.)","(Hob sleeps with one eye on the snack and the other eye on a different snack.)","(Hob snores in three stages. This is the first stage. It is also the last.)","(Hob is asleep upright, which is how he scored all morning.)"], 'mur.q': ["(Dr. Quince, quietly, to the compass: not now.)","(Dr. Quince is straightening a pencil that was straight.)","(Dr. Quince has written a figure on his cuff and then regretted the cuff.)","(Dr. Quince is counting the ceiling tiles. There are 4 more than yesterday. He has not raised it.)","(Dr. Quince polishes the monocle. It is already clear. He is polishing the idea of clear.)","(Dr. Quince is writing a letter to a protractor. It begins 'Dear Sir or Half Circle'.)"], 'mur.q.late': ["(Dr. Quince has put the pencil down. He is looking at it fondly. It is a good pencil.)","(Dr. Quince is humming something in 4/4. He has noticed. He has stopped. He has started.)","(Dr. Quince has drawn a very small circle on his own hand. It is not for scoring. It is for him.)","(Dr. Quince has asked the Lady what a feeling is for. She told him. He has written it down in pencil.)"],
    'mur.b': ["(Lady Brume adjusts the hat to a different tragedy.)","(Lady Brume is gazing into the middle distance, which is three feet away, just in front of the bench.)","(Lady Brume sighs at nothing. Nothing is flattered.)","(Lady Brume has taken out a fan and put it back, as an act of restraint.)","(Lady Brume has whispered the word 'weather' and nodded as if someone had answered.)","(Lady Brume is rehearsing a gasp. It is not ready. It will be ready by the next circle.)"], 'mur.b.late': ["(Lady Brume has found a handkerchief in the hat. It is not hers. She is keeping it anyway.)","(Lady Brume is holding Hob's sleeve. Hob has not noticed. Hob has noticed.)","(Lady Brume has stopped acting. Nobody has told her. She is just sitting there, a person in a hat.)","(Lady Brume is telling the plant about her day. The plant is listening in the way plants do, which is entirely.)"], 'mur.h': ["(Hob eats something small and round, then looks at his hand as if it had done it.)","(Hob has offered the Doctor a snack. The Doctor has declined. Hob has offered it to the compass.)","(Hob is holding two snacks, one in each hand, for fairness.)","(Hob is sitting very still, which is how he scores.)","(Hob has found a crumb and is deciding whether it counts as a witness.)","(Hob has said 'nope' to the room in general. The room did not ask.)"],
    'mur.h.late': ["(Hob has stopped chewing. He is just holding the snack, the way you hold a hand.)","(Hob has pushed the snack six inches toward the Lady. She has pushed it back. They have done this four times and nobody is leaving.)","(Hob is wearing the apron the way he wears a decision.)","(Hob has said 'nope' very quietly, and then 'hm', which is new.)"], 'm.spam.again': ["Again. The owl has been called again. It is putting on its lanyard in a way that suggests a long career of this.","A second congestion this session. The Tribunal has opened a file labelled 'Circles, Impatient'. It is thin. It is growing at speed.","The owl has said nothing, at length. The silence has been entered into evidence.","A third congestion. The owl has brought a flask. The flask is tea. The flask is also a circle, if you look at it from above."], 'o.owl': ["One at a time. I have been awake since a Tuesday.","Please take a number. I am not the owl you want. I am the owl you have.","Form 8: Request to Be Slower. It is the only form. It is also the answer.","I used to be a sparrow. I was promoted. I do not recommend it.","I am not angry. I am a bird in a lanyard. These are the same thing."],
    'h.spam.c': ["One at a time. I have only the one mouth.","I cannot eat and score at this speed. Please choose one of us.","The snack has asked to be judged separately."], 'm.quar.mid': ["The canvas is resting. Please do not tap the glass. There is no glass. Please do not tap the idea of glass.","Quarantine continues. The canvas is doing breathing exercises. They are all the same exercise. It is one breath, held.","A get-well card is being passed around for the canvas. Hob has signed it with a snack."], 'm.quar.poke': ["The canvas is in quarantine. It can hear you. It is trying to be brave about it.","Visitors are not permitted. You may wave from the doorway. The doorway is the border.","Please stop tapping the canvas. It has been through a lot of taps, and every one of them was loved.","Sandra has asked whether the tapping is part of the treatment. It is not. It is being added to the treatment."],
    'm.quar.again': ["A second Circle Quarantine. The canvas has packed a small bag. The bag is also a circle.","Quarantine again. The canvas has stopped asking why. It has started asking how long. The answer is six seconds, which is a long time for a canvas."], 'm.int': ["The panel was still conferring. It will confer later. It has made a note to confer later, on its own.","A second interruption. Dr. Quince was mid-sentence. The sentence is being kept warm.","Three interruptions. Lady Brume has put a hand to her chest and left it there as evidence.","Four. The judges have asked whether this is a style. Management has said it is a style. Management has not been told.","Five interruptions. The Tribunal recognises you as Lord High Interrupter, Baron of the Unfinished Verdict. The title was invented just now. It is already late, and it is retroactive."], 'm.int.after': ["The panel has stopped finishing its sentences in advance. It now stops halfway, to save you the trouble.","Another interruption. The panel has begun delivering verdicts in the form of a very brief wave.","The Tribunal has been interrupted so often that it now treats the pause as the verdict."],
    'm.blip': ["The Consensus meter has just read 0.1%. This has never happened. A tenth of a percent of agreement has entered the building.","An investigation is open. So far the findings are that 0.1 is a number, and that it was in the room.","The meter has returned to 0.0%. The 0.1 was escorted out by a polite clipboard. It did not resist. It had only ever wanted to be counted."], 'blip.q': ["0.1. I have measured the 0.1. It is real. I would like to lie down next to it."], 'blip.b': ["Did anyone else feel that? It moved a tenth of a feeling. I need to sit. I am sitting. I need to sit further."],
    'blip.h': ["That was not me. I was holding a snack the whole time. The snack was holding me. We have an alibi."], 'm.gavel': ["Ten minutes. A notice has arrived. It is sealed with something that is either wax or a sandwich. Management has chosen not to find out.","The gavel is yours for eleven seconds. Please use it sparingly. Please use it on nothing. It is a very small gavel and it has been struck before.","You have declined the gavel. The gavel has been told. It said it understood. It then sat very close to you.","The gavel has been passed to Hob. Hob has weighed it. Hob has smelled it. Hob has placed it in his mouth, briefly, as a method.","The eleven seconds are over. The gavel has been returned. It was not struck. It is the most unstruck gavel the Tribunal has ever owned.","Management notes that Tuesday has also been moved elsewhere in the building, by fax and by form. It took the move well. It is, however, still Tuesday."], 'gavel.acc': ["Your Honour. I have never said that. I have measured it and it fits.","Your Honour, darling. The hat bows. It has practised.","Judge. Hi. Nope. Sorry. Yes. Judge."],
    'gavel.dec': ["The Presiding Judge has declined. I note it as a precedent. I will cite it. I will cite it to myself.","How humble. How round. How very much a person who will not hold a hammer.","Nope accepted. That is my word. You may have it. You may have all my nopes."], 'gavel.pas': ["I protest. I protest in writing. I have written it on my sleeve.","Hob, darling. You have the hammer. We have faith in the part of you that is not chewing.","Hm. It is heavy. It is not a snack. I have checked it three times. I will check again."], 'toast.crit': ["Toast.","Toast. (The Toaster looks at the circle for a long time.) Toast.","Toast. Toast toast toast. (gently)","...toast? ...toast. (It has reached a conclusion and is keeping it warm.)","(The Toaster pops. It has nothing to add. It pops anyway.)"],
    'toast.m': ["Hob has stepped out. The Toaster has taken his chair and will score in toast. The Toaster is warm.","Judge Hob is in the car park, eating. The Toaster is sitting in. It has no credentials. It has crumbs, which is the same thing.","The Toaster has been appointed Third Chair for one verdict. The panel has not been consulted. The panel was in the middle of a snack."], 'toast.met': ["The Toaster has taken Hob's chair. It recognises you. It has said so, in toast, and we are all moved."], 'dennis.clap': ["Dennis (Plant) has clapped. Dennis has no hands. The sound was a leaf against a leaf. Everyone heard it. Nobody will say."],
    'dennis.met': ["Dennis has been clicked in other parts of the building. This is the first time he has clapped back. He is not a plant that holds a grudge. He is a plant that holds a note."], 'sock.again': ["The sock has been seen elsewhere in the building. It is not new to the Tribunal. It is here on a tour, wearing a visitor badge it was not issued."], 'ap.stapler.met': ["The Stapler recognises you from another office. It has not said so. It has stapled the air in your direction, which is how it waves."],
    'm.welcome.bagel': ["Welcome back. Hob has asked that nobody mention the bagel. He has asked three times. He is looking at the door as he asks."],
    /* ---- Season 2: the Audit, the Near-Tuesday, the dot's career, I Spy, the held breath ---- */
    'aud.start': ["Sandra has opened an Audit covering the next 3 circles. She is not present. Her clipboard is present and is taking it personally.", "A routine audit has begun. Routine is what we call an audit that has not yet found you.", "The Tribunal is under audit for 3 circles. Please look natural. Do not look natural on purpose; Sandra has a form for that."],
    'aud.q': ["I have rounded nothing, estimated nothing and apologised only in the usual places. The auditor may check the decimals. The decimals are nervous.", "For the auditor: every number on this scorecard was produced by measuring. Several by measuring twice. One by measuring a feeling, for which I have a receipt.", "I would like it noted that I did not look at Hob's number. I looked near it, in the way one looks near a stranger's sandwich.", "Audit procedure requires me to state my method. My method is %Q%. It is also my alibi."],
    'aud.b': ["I have not wept on the clock. I have wept on my own time, which Sandra has also scheduled.", "For the auditor: the feeling was genuine, the receipts are in the hat, and the hat is cooperating fully.", "Everything I have said in this room is true, and several things I have said are also numbers. %B%, in the margin, in pencil.", "I have been asked whether I felt anything improperly. I felt it properly. I felt it in triplicate."],
    'aud.h': ["I have nothing to hide. (Hob finishes a snack.) Now I have nothing to hide it in.", "My method is written down. It is on the snack. The snack is in me. The auditor may have the receipt.", "I counted the circles. There were 3. Then I counted again and there were 3 and a smaller feeling.", "Please tell Sandra the snack was already open when I got here. It had been like that for years."],
    'aud.foot': ["AUDITED (PROVISIONALLY). The auditor has seen this number and has no further numbers.", "Reviewed by Compliance. Compliance was reviewing something else.", "This score has been audited by a clipboard. The clipboard has found it adequate."],
    'aud.end': ["The Audit is complete. The Tribunal is found to be in line with itself, which is the only line available. A 2 Meh Compliance Rebate has been issued.", "Audit closed. Findings: none. Concerns: several, all lowercase. The rebate of 2 Meh will arrive by post, which is not a thing here.", "Sandra's Audit has found everyone innocent of the thing they were nervous about. They are now nervous about something else. Rebate: 2 Meh."],
    'aud.toaster': ["Toast.", "Toast. (A pause.) Toast.", "Toast, and I mean it warmly."],
    cb: {
      'toaster-debate': "The Toaster has been called as a character witness. It was asked about your circles and said what it always says. The court found it moving and slightly burnt.", 'sock-matcher': "The Sock Matching Bureau has written to confirm that no sock is missing from this room. The sock has asked that this letter be kept off the record.",
      'duck-therapy': "A duck has submitted a character reference. It reads, in full, 'fine'. Compliance has accepted it as the most thorough reference on file.", 'staring-contest': "The auditor notes that you once stared at something for longer than this audit has lasted. The audit would like to meet the something.",
      'potato-interview': "Gerald's recruiter has sent regards. Gerald has not read them. Gerald has put them in the soil, where he keeps things he respects.", 'lost-and-found': "Lost and Found has confirmed it is holding a circle that may be yours. It has been found. It is lost again. The paperwork is circular.",
      ascend: "The auditor notes an ascension on your file. The ascension is also round. It has been placed in the Evidence Bag, which is now too small for the Evidence Bag."
    },
    'tue': ["Nothing has happened. Tuesday did not arrive. Please do not tell Tuesday.", "The Tribunal clock moved to 11:43 AM and was immediately talked out of it. The clock has been given a glass of water.", "The judges looked toward the door for four seconds. There is no door. They looked where a door would be, if Tuesday were the sort to knock.", "Tuesday has been sighted near the building. It did not come in. The building did not offer it tea.", "A Courage Payment of 7.5 Meh has been issued for not being Tuesday. It is non-transferable, like most things here."],
    'tue.q': ["I have been looking at the door for some time. It is an excellent door. It has done nothing."], 'tue.b': ["A chill. A distinct, administrative chill. Someone has left a Tuesday open."], 'tue.h': ["I put the snack down. Then I picked it up. It is not that kind of day. It is not any kind of day. It is almost one."],
    'dot.click': ["The dot has been clicked. It was decorative a moment ago and is now merely clicked.", "The dot has been clicked again. Sandra has been informed. Sandra has asked the dot to stop being informed.", "Third click. The dot would like to be addressed by its full name, which is Dot. Its middle name is also Dot. This is a family tradition and a clerical error.", "The dot is now Dot (Acting). The acting is decorative. The dot has taken a meeting.", "The dot has submitted a petition. It is one line long and it is a full stop.", "Six clicks. Dr. Quince has measured the dot. It is exactly the same size as before and has begun to carry itself differently."],
    'dot.promo': ["The dot has been promoted to Chief Decorative Officer, retroactive to before it was a dot. It has no direct reports. It has a very small desk."], 'dot.after': ["The Chief Decorative Officer is in a meeting. The meeting is with itself and is going well.", "The dot has asked not to be clicked in the office. It is happy to be clicked at the company picnic.", "Please direct all dot inquiries to the dot's assistant, who is also a dot."],
    'spy': [["I spy, with my little compass, something round.", "Is it the canvas? The canvas is a square that has been told it is a plate.", "No. It is my snack. I win. I have never won. Please do not tell me this is not winning."], ["I spy something with a very small error. It is the second hand of that clock. The clock has no second hand.", "Oh, you have spied a feeling. That is cheating. I adore it.", "I spy something with a hole. No guesses. Nobody ever guesses right, and then I eat the answer."], ["I spy something that is the same distance from everywhere.", "A circle, Doctor? You have spied a circle every day since the Tribunal opened.", "It is the player. The player has not moved. That is a good one. I did not know you were allowed to spy people."]],
    'spy.m': ["The judges have begun a game of I Spy. The rules are not known. Management has been invited and has declined, to protect the integrity of the game.", "I Spy has started on the bench. Nobody has won. Nobody has been told what winning looks like. It is going very well."],
    'pause.q': ["Please continue. I have stopped measuring. I am merely holding the compass at the ready, in a supportive way.", "Take your time. The compass has been told to look away."], 'pause.b': ["Do not rush, darling. The pause is the circle. The rest is the wire it hangs on.", "I am holding my breath with you. I have been told it is a team-building exercise. It is not. It is better."],
    'pause.h': ["Are you coming back? I am keeping the snack warm. It is not warm. It is the thought.", "Take as long as you need. I will be here, holding a ring of something and not saying anything about it."]
  };
  const CAP = {
    a: ["0.0% (agreement not yet established)", "0.0% (agreement is currently under review by agreement)", "0.0% (the needle has asked to be moved to a different meter)", "0.0% (the needle is no longer straining; it is simply leaning)", "0.0% (the needle has been given a small chair)"],
    tender: "0.0% (in loving disagreement)", bagel: "0.0% (in total agreement, which is nothing)", dq: "This did not happen.", proto: "No Opinion", back: "Welcome back."
  };
  const GROUNDS = [
    ["I think I should have had more", "The circle was fine, the score was not", "I would like to speak to a different number"],
    ["A circle was involved", "I was not sitting properly", "I have feelings and they are on file"],
    ["The panel was loud", "The canvas moved first", "I meant it"]
  ];
  const SO_LABEL = ['1', '2', '3', '4', '5', '6', '7 1/2', '8', '9', '11', '12', '14', '17', '20', '24', '31'];
  const SNACKS = [['🥨', 'a pretzel'], ['🍩', 'a donut'], ['🍘', 'a hula-hoop-shaped cracker'], ['💍', 'a bracelet he claims is a snack'], ['🔘', 'a polo mint'], ['🍪', 'a ring-shaped biscuit']];
  const SNACKS2 = [['🍞', 'a slice of toast'], ['💿', 'a plain disc'], ['🍪', 'a coin, he insists']];
  const FACES = { q: ['🧐', '🤔', '🙂', '😢'], b: ['😌', '🙄', '🥰', '😭'], h: ['😐', '🤨', '😊', '😢'] };
  const DQFACE = { q: '😳', b: '😱', h: '😠' };
  const NAMES = { q: 'Dr. Ferrule Quince', b: 'Lady Odalys Brume', h: 'Hob' };
  const JK = ['q', 'b', 'h'];
  /* ---------------------------------------------------------------- utilities and geometry (pure functions) */
  const PI = Math.PI;
  const clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  const fin = function (v, d) { return typeof v === 'number' && isFinite(v) ? v : d; };
  const fx = function (v, d) { return typeof v === 'number' && isFinite(v) ? v.toFixed(d) : (0).toFixed(d); };
  const dist = function (a, b) { return Math.hypot(a.x - b.x, a.y - b.y); };
  const fill = function (text, ctx) {
    return String(text === undefined || text === null ? '' : text).replace(/%([A-Z0-9]+)%/g, function (m, k) {
      return ctx && ctx[k] !== undefined && ctx[k] !== null ? String(ctx[k]) : '';
    }).replace(/%[A-Z]+%/g, '');
  };
  function h32(a, b, c) {
    let h = Math.imul((a | 0) ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul((b | 0) + 0x7f4a7c15, 0xc2b2ae35) ^ Math.imul((c | 0) + 0x165667b1, 0x27d4eb2f);
    h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
  }
  function pathLen(p) { let s = 0; for (let i = 1; i < p.length; i++) s += dist(p[i - 1], p[i]); return s; }
  function resample(p, n) {
    const out = [];
    if (!p.length) { for (let i = 0; i < n; i++) out.push({ x: 0.5, y: 0.5 }); return out; }
    const L = pathLen(p);
    if (!(L > 1e-9) || p.length < 2) { for (let i = 0; i < n; i++) out.push({ x: p[0].x, y: p[0].y }); return out; }
    const step = L / (n - 1);
    out.push({ x: p[0].x, y: p[0].y });
    let seg = 0, segStart = 0;
    for (let k = 1; k < n - 1; k++) {
      const target = step * k;
      while (seg < p.length - 2 && segStart + dist(p[seg], p[seg + 1]) < target) { segStart += dist(p[seg], p[seg + 1]); seg++; }
      const sl = dist(p[seg], p[seg + 1]);
      const t = sl > 1e-12 ? clamp((target - segStart) / sl, 0, 1) : 0;
      out.push({ x: p[seg].x + (p[seg + 1].x - p[seg].x) * t, y: p[seg].y + (p[seg + 1].y - p[seg].y) * t });
    }
    out.push({ x: p[p.length - 1].x, y: p[p.length - 1].y });
    return out;
  }
  function segHit(a, b, c, d) {
    const d1 = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
    const d2 = (d.x - c.x) * (b.y - c.y) - (d.y - c.y) * (b.x - c.x);
    const d3 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const d4 = (b.x - a.x) * (d.y - a.y) - (b.y - a.y) * (d.x - a.x);
    const e = 1e-9;
    if (Math.abs(d1) < e || Math.abs(d2) < e || Math.abs(d3) < e || Math.abs(d4) < e) return false;
    return d1 * d2 < 0 && d3 * d4 < 0;
  }
  function inPoly(poly, x, y) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if ((a.y > y) !== (b.y > y) && x < (b.x - a.x) * (y - a.y) / ((b.y - a.y) || 1e-12) + a.x) inside = !inside;
    }
    return inside;
  }
  function corr(a, b) {
    const n = a.length; if (n < 3) return 0;
    let ma = 0, mb = 0; for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; } ma /= n; mb /= n;
    let sab = 0, saa = 0, sbb = 0;
    for (let i = 0; i < n; i++) { sab += (a[i] - ma) * (b[i] - mb); saa += (a[i] - ma) * (a[i] - ma); sbb += (b[i] - mb) * (b[i] - mb); }
    return saa > 1e-12 && sbb > 1e-12 ? sab / Math.sqrt(saa * sbb) : 0;
  }
  /* raw = [{x,y,t,b?}] normalised to the canvas box; size = canvas CSS px. Returns metrics + class. Never NaN. */
  function analyze(raw, size) {
    const n = raw.length, plen = pathLen(raw), pathPx = plen * size;
    const m = { n: n, pathPx: pathPx, cls: 'WOBBLY', cw: false, hes: [], crossings: 0, devPct: 0, circ: 1, gap: 0, gapPct: 0, gapMm: 0, pathRatio: 1, asp: 1,
      meanR: 0.001, cx: 0.5, cy: 0.5, speedCV: 0, meanSpeed: 0, secs: 0, startTop: false, enclosesDot: false, touchesEdge: false, absTurn: 0, bw: 0, bh: 0, rs: null, bbA: 1 };
    if (!n) { m.cls = 'DOT'; m.rs = resample(raw, 96); return m; }
    let minx = 1, maxx = 0, miny = 1, maxy = 0;
    for (let i = 0; i < n; i++) {
      const p = raw[i];
      minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); miny = Math.min(miny, p.y); maxy = Math.max(maxy, p.y);
      if (p.x < 0.02 || p.x > 0.98 || p.y < 0.02 || p.y > 0.98) m.touchesEdge = true;
    }
    m.bw = maxx - minx; m.bh = maxy - miny;
    m.secs = Math.max(0, fin((raw[n - 1].t - raw[0].t) / 1000, 0));
    m.startTop = raw[0].y < 0.4;
    m.rs = resample(raw, 96);
    const rs = m.rs, N = rs.length;
    let cx = 0, cy = 0;
    for (let i = 0; i < N; i++) { cx += rs[i].x; cy += rs[i].y; }
    cx /= N; cy /= N; m.cx = cx; m.cy = cy;
    if (n < 12 || pathPx < 24) { m.cls = 'DOT'; return m; }
    const rr = rs.map(function (p) { return Math.hypot(p.x - cx, p.y - cy); });
    let meanR = 0; for (let i = 0; i < N; i++) meanR += rr[i]; meanR = Math.max(meanR / N, 1e-4);
    let v = 0; for (let i = 0; i < N; i++) v += (rr[i] - meanR) * (rr[i] - meanR);
    const rms = Math.sqrt(v / N);
    m.meanR = meanR; m.circ = clamp(1 - rms / meanR, 0, 1); m.devPct = fin(100 * rms / meanR, 0);
    m.gap = fin(dist(rs[0], rs[N - 1]) / meanR, 0); m.gapPct = 100 * m.gap; m.gapMm = fin(m.gap * meanR * 520 * 0.19, 0);
    let turning = 0, prevH = null, firstH = null; const turn = [0], cum = [0];
    for (let i = 1; i < N; i++) {
      const dx = rs[i].x - rs[i - 1].x, dy = rs[i].y - rs[i - 1].y;
      if (Math.hypot(dx, dy) < 1e-9) { turn.push(0); cum.push(turning); continue; }
      const h = Math.atan2(dy, dx);
      let d = 0;
      if (firstH === null) firstH = h;
      if (prevH !== null) { d = h - prevH; while (d > PI) d -= 2 * PI; while (d < -PI) d += 2 * PI; turning += d; }
      turn.push(Math.abs(d)); cum.push(turning); prevH = h;
    }
    /* the corner where a closed stroke meets its own start (a square begun at a corner has one there) */
    let closeTurn = 0;
    if (firstH !== null && prevH !== null) { closeTurn = firstH - prevH; while (closeTurn > PI) closeTurn -= 2 * PI; while (closeTurn < -PI) closeTurn += 2 * PI; }
    m.cw = turning > 0; m.absTurn = Math.abs(turning);
    /* a crossing counts only at a real angle: the overlap where a circle closes on itself runs nearly parallel and must not read as a scribble */
    for (let i = 0; i < N - 1; i++) for (let j = i + 2; j < N - 1; j++) if (segHit(rs[i], rs[i + 1], rs[j], rs[j + 1])) {
      const ux = rs[i + 1].x - rs[i].x, uy = rs[i + 1].y - rs[i].y, vx = rs[j + 1].x - rs[j].x, vy = rs[j + 1].y - rs[j].y, den = Math.hypot(ux, uy) * Math.hypot(vx, vy);
      if (den > 1e-14 && Math.abs(ux * vy - uy * vx) / den > 0.26) m.crossings++;
    }
    m.pathRatio = fin(plen / (2 * PI * meanR), 1);
    let sxx = 0, syy = 0, sxy = 0;
    for (let i = 0; i < N; i++) { const dx = rs[i].x - cx, dy = rs[i].y - cy; sxx += dx * dx; syy += dy * dy; sxy += dx * dy; }
    sxx /= N; syy /= N; sxy /= N;
    const tr = (sxx + syy) / 2, det = sxx * syy - sxy * sxy, disc = Math.sqrt(Math.max(0, tr * tr - det));
    const l1 = tr + disc, l2 = Math.max(tr - disc, 1e-12);
    m.asp = clamp(fin(Math.sqrt(Math.max(l1, 0) / l2), 1), 1, 999);
    const bbA = Math.max(m.bw, m.bh) / Math.max(Math.min(m.bw, m.bh), 1e-4);
    const sp = [], segs = [];
    for (let i = 1; i < n; i++) {
      if (raw[i].b) continue;
      const dt = raw[i].t - raw[i - 1].t;
      if (!(dt > 0)) continue;
      const s = dist(raw[i], raw[i - 1]) * size / (dt / 1000);
      sp.push(s); segs.push({ s: s, dt: dt, x: raw[i].x, y: raw[i].y });
    }
    m.meanSpeed = fin(pathPx / Math.max(m.secs, 0.05), 0);
    if (sp.length > 2) {
      let ms = 0; for (let i = 0; i < sp.length; i++) ms += sp[i]; ms /= sp.length;
      let vs = 0; for (let i = 0; i < sp.length; i++) vs += (sp[i] - ms) * (sp[i] - ms);
      m.speedCV = ms > 1e-6 ? clamp(fin(Math.sqrt(vs / sp.length) / ms, 0), 0, 5) : 0;
      const med = sp.slice().sort(function (a, b) { return a - b; })[sp.length >> 1];
      let run = 0, rmin = null;
      for (let i = 0; i < segs.length; i++) {
        if (segs[i].s < 0.25 * med) { run += segs[i].dt; if (!rmin || segs[i].s < rmin.s) rmin = segs[i]; }
        else { if (run >= 120 && rmin) m.hes.push({ x: rmin.x, y: rmin.y, s: rmin.s }); run = 0; rmin = null; }
      }
      if (run >= 120 && rmin) m.hes.push({ x: rmin.x, y: rmin.y, s: rmin.s });
    }
    m.enclosesDot = inPoly(rs, 0.5, 0.5);
    const sm = turn.map(function (t, i) { return ((turn[i - 1] || 0) + t + (turn[i + 1] || 0)) / 3; });
    let peaks = 0, lastPk = -99, firstPk = -99;
    for (let i = 1; i < N - 1; i++) if (sm[i] > 0.35 && sm[i] >= sm[i - 1] && sm[i] > sm[i + 1] && i - lastPk >= 8) { if (!peaks) firstPk = i; peaks++; lastPk = i; }
    const spiralCorr = corr(rr, cum);
    const A = m.absTurn;
    /* a stroke that closes on itself: count the closing corner as a peak and as turning (same direction only) */
    let sqPeaks = peaks, sqA = A;
    if (m.gap < 0.3 && closeTurn * turning > 0) {
      sqA = A + Math.abs(closeTurn);
      if (Math.abs(closeTurn) / 3 > 0.35 && lastPk <= N - 9 && !(peaks > 0 && firstPk < 8)) sqPeaks = peaks + 1;
    }
    /* two lobes turn in opposite directions, so a true figure eight has almost no net turning: test it before LINE */
    if (m.meanR < 0.04) m.cls = 'TINY';
    else if (m.crossings >= 1 && m.crossings <= 2 && A < PI && m.pathRatio > 1.4 && m.pathRatio <= 2.2 && m.asp <= 6) m.cls = 'FIG8';
    else if (m.asp > 6 || A < 0.6 * PI) m.cls = 'LINE';
    else if (m.crossings >= 6 || m.pathRatio > 2.2) m.cls = 'SCRIBBLE';
    else if (Math.abs(spiralCorr) > 0.85 && A >= 1.3 * 2 * PI) m.cls = 'SPIRAL';
    else if (m.touchesEdge) m.cls = 'HUGE';
    else if (m.devPct < 1.2 && m.gapPct < 2 && Math.abs(A - 2 * PI) < 0.03 * 2 * PI && m.crossings === 0) m.cls = 'PERFECT';
    else if (m.gap > 0.35 && A >= 0.9 * PI && A <= 1.7 * PI) m.cls = 'OPEN_C';
    else if (sqPeaks === 4 && m.circ >= 0.82 && m.circ <= 0.97 && sqA >= 1.6 * PI) m.cls = 'SQUARE';
    else if (m.asp > 1.18 && m.circ > 0.8) m.cls = 'EGG';
    else if (m.circ >= 0.93 && m.gap < 0.12) m.cls = 'GOOD';
    else m.cls = 'WOBBLY';
    m.bbA = fin(bbA, 1);
    return m;
  }
  function holeRel(m) {
    const rs = m.rs || [];
    for (let i = 0; i < rs.length; i++) if (Math.hypot(rs[i].x - 0.5, rs[i].y - 0.5) < 0.07) return 'through';
    return m.enclosesDot ? 'around' : 'beside';
  }
  function pack24(m) {
    const out = [], rs = m.rs || [];
    for (let i = 0; i < 24; i++) {
      const p = rs[Math.round(i * 95 / 23)] || { x: 0.5, y: 0.5 };
      out.push(clamp(Math.round(fin(p.x, 0.5) * 1000), 0, 1000), clamp(Math.round(fin(p.y, 0.5) * 1000), 0, 1000));
    }
    return out;
  }
  function unpack(arr) {
    const out = [];
    if (!Array.isArray(arr)) return out;
    for (let i = 0; i + 1 < arr.length && out.length < 24; i += 2) {
      const x = Number(arr[i]), y = Number(arr[i + 1]);
      if (isFinite(x) && isFinite(y)) out.push({ x: clamp(x / 1000, 0, 1), y: clamp(y / 1000, 0, 1) });
    }
    return out;
  }
  /* same circle twice? mean point distance (canvas coords) over start offsets and both directions, over meanR */
  function similar(a, b, meanR) {
    if (!a || !b || a.length < 24 || b.length < 24) return false;
    const A = [], Bq = [];
    for (let i = 0; i < 24; i++) { A.push(a[Math.round(i * 95 / 23)]); Bq.push(b[Math.round(i * 95 / 23)]); }
    let best = Infinity;
    for (let dir = -1; dir <= 1; dir += 2) for (let off = 0; off < 24; off++) {
      let s = 0;
      for (let i = 0; i < 24; i++) s += dist(A[i], Bq[((off + dir * i) % 24 + 24) % 24]);
      best = Math.min(best, s / 24);
    }
    return fin(best / Math.max(meanR, 1e-4), 9) < 0.07;
  }
  /* generated strokes: Draw for me (mediocre) and the Template Ring (mathematically perfect) */
  function genCircle(o, t0) {
    const pts = [];
    for (let i = 0; i <= o.n; i++) {
      const s = i / o.n, e = s - o.ease * Math.sin(2 * PI * s) / (2 * PI);
      const th = o.start + o.dir * o.sweep * e;
      const r = o.r * (1 + o.a2 * Math.sin(2 * th + o.p2) + o.a3 * Math.sin(3 * th + o.p3));
      pts.push({ x: clamp(o.cx + r * Math.cos(th), 0, 1), y: clamp(o.cy + r * Math.sin(th), 0, 1), t: t0 + o.dur * s });
    }
    return pts;
  }
  function drawThumb(cv, pts, color) {
    try {
      const c = cv.getContext('2d'); if (!c) return;
      const W = cv.width, H = cv.height;
      c.clearRect(0, 0, W, H);
      if (!pts || !pts.length) return;
      c.strokeStyle = color || '#1B2540'; c.lineWidth = 2.5; c.lineJoin = 'round'; c.lineCap = 'round';
      c.beginPath();
      for (let i = 0; i < pts.length; i++) { const x = pts[i].x * (W - 6) + 3, y = pts[i].y * (H - 6) + 3; if (i) c.lineTo(x, y); else c.moveTo(x, y); }
      c.stroke();
    } catch (e) { /* no canvas, no thumbnail */ }
  }
  function ringPoints(seed, k) {                       /* a judge's own circle for the Reverse Tribunal: seeded wobble */
    const out = [], a = 0.05 + 0.08 * h32(seed, k, 1), p = h32(seed, k, 2) * 6, q = h32(seed, k, 3) * 6;
    for (let i = 0; i <= 40; i++) {
      const th = i / 40 * 2 * PI * (0.93 + 0.05 * h32(seed, k, 4)), r = 22 * (1 + a * Math.sin(2 * th + p) + a * 0.6 * Math.sin(3 * th + q));
      out.push((28 + r * Math.cos(th)).toFixed(1) + ',' + (28 + r * Math.sin(th)).toFixed(1));
    }
    return out.join(' ');
  }
  /* worst-deviation ticks, hesitation glow, Hob's reference ring: all in normalised canvas coordinates */
  function overlayOf(m, hf) {
    const ov = { ticks: [], glow: [], gap: null, ring: null };
    if (!m || !m.rs || m.cls === 'DOT') return ov;
    const rs = m.rs, idx = [];
    for (let i = 0; i < rs.length; i++) idx.push(i);
    const dev = function (i) { return Math.abs(Math.hypot(rs[i].x - m.cx, rs[i].y - m.cy) - m.meanR); };
    idx.sort(function (a, b) { return dev(b) - dev(a); });
    const chosen = [];
    for (let k = 0; k < idx.length && chosen.length < 3; k++) if (chosen.every(function (c) { return Math.abs(c - idx[k]) >= 8; })) chosen.push(idx[k]);
    ov.ticks = chosen.map(function (i) { return { x: rs[i].x, y: rs[i].y }; });
    ov.glow = (m.hes || []).slice().sort(function (a, b) { return a.s - b.s; }).slice(0, 3).map(function (h) { return { x: h.x, y: h.y }; });
    ov.gap = { a: { x: rs[0].x, y: rs[0].y }, b: { x: rs[rs.length - 1].x, y: rs[rs.length - 1].y }, label: fx(m.gapMm, 1) + 'mm' };
    ov.ring = { x: m.cx, y: m.cy, r: clamp(m.meanR * (0.7 + hf * 0.7), 0.02, 0.6) };
    return ov;
  }
  const HEART = 'M12 21s-8-5.3-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.7-8 11-8 11z';
  const SHORT = { q: 'Quince', b: 'Brume', h: 'Hob' };
  const INK = '#1B2540', CORAL = '#F26B5B';
  function num(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }
  function prefersReduced() { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
  P.registerModule({
    id: 'draw-a-circle',
    title: 'Draw a Perfect Circle',
    tagline: 'Draw one circle. Three judges will disagree about it, formally.',
    icon: '⭕',
    category: 'game',
    unlockCost: 0,
    tags: ['drawing', 'judging', 'bagel'],
    mount(root, api) {
      const el = api.el;
      const K = api.selftest ? 8 : 1;
      let t0 = api.now(), hiddenAt = 0;
      const seed = api.randInt(1, 1000000);
      const S = api.stat;
      const SP = api.selftest ? 0.125 : 1;
      const reduced = api.selftest || prefersReduced() || document.body.classList.contains('pm-reduce-motion');      /* lint-ignore reads the engine's motion class, never writes it */
      const TS = reduced ? 0.4 : 1;
      const dprv = function () { return clamp(fin(window.devicePixelRatio, 1) || 1, 1, 2); };
      /* ---- persistent bits (api.save) ---- */
      const cnt = function (k) { return Math.floor(clamp(num(api.save.get(k, 0)), 0, 99999)); };      /* a hand-edited or corrupted save must not reach the UI as junk */
      const sv = {
        visits: cnt('visits'), drawn: cnt('drawn'), impounded: cnt('impounded'),
        bagels: cnt('bagels'), ceremonies: cnt('ceremonies'), pantry: cnt('pantry'),
        conceptual: api.save.get('conceptual', false) === true,
        evidence: api.save.get('evidence', []), gallery: api.save.get('gallery', [])
      };
      if (!Array.isArray(sv.evidence)) sv.evidence = [];
      if (!Array.isArray(sv.gallery)) sv.gallery = [];
      const goodPts = function (a) { return Array.isArray(a) && a.length === 48 && a.every(function (x) { return typeof x === 'number' && isFinite(x); }); };
      sv.evidence = sv.evidence.filter(goodPts).slice(-6);
      sv.gallery = sv.gallery.filter(function (g) { return g && typeof g === 'object' && goodPts(g.p); }).slice(-12)
        .map(function (g) { return { p: g.p, c: typeof g.c === 'string' ? g.c.slice(0, 12) : 'SCRIBBLE', n: Math.floor(clamp(num(g.n), 1, 99999)) }; });
      const wasVisitor = sv.visits > 0, sincere = sv.ceremonies > 0;
      sv.visits++;
      /* ---- game state ---- */
      let mode = 'normal', busy = null;
      let tender = 0, nSub = 0, unan = 0, protoCount = 0, retRound = 0, wipes = 0, appeals = 0, plagStreak = 0, dotStreak = 0, conceptN = 0, ceremonies = 0;
      let seen = {}, scribbleSeen = false, sockSeen = false, geraldCount = 0, geraldOn = false, hobWeird = false, verdictsSinceInter = 9;
      let lastSayAt = api.now(), cadence = 12000 + api.rand() * 3000;
      let lastAct = api.now(), idleDone1 = false, idleReady2 = true;
      let courtesy = false, ghostHold = false, ghostTog = false, ghostHinted = false, whispered = false, shouted = false, spotOn = false, sfxOn = true;
      let beatMax = 1, beatSaid = {}, ordersOn = false, orderIdx = 0, ordersSince = 0, dqSeen = false, lastD = 2;
      let stage = 'empty', pts = [], drawing = false, pid = null, penDown = false, strokeSrc = 'pointer', waiverT = 0, lastEvt = api.now();
      let lastStroke = null, prevRs = null, prevMeanR = 0.2, inkColor = INK, haloUntil = 0, dirty = true, loopOn = false, minSp = 1.5, lastTs = 0;
      let ov = null, ovT = { ticks: 0, glow: 0, gap: 0, ring: 0 }, curV = 0, vt = [], stageV = null, galleryRead = 0, galleryN = 0, evN = 0;
      let size = 320, dpr = 1, ctx2 = null, held = {}, heldAt = {}, mods = { shift: false, ctrl: false }, pen = { x: 0.5, y: 0.5, vx: 0, vy: 0 };
      let lastDqPay = -1, queued = false;
      /* review pass: replay, funeral, jam, intros, keyboard hint */
      let rp = null, replayedScribble = false, wipedLog = [], funeralDone = false, judgedAt = 0, kbdShown = false, heartSaid = false;
      let jamAt = 150 + api.rand() * 150, jamOn = false, jamNow = false, jamT0 = 0, introQ = wasVisitor ? [] : B['m.intro'].slice();
      const JAM = '#B01E3C';
      let auditOn = false, auditDone = false, auditLeft = 0, tueSeen = false, tueQ = false, dotN = 0, spyDone = false, pausedSaid = false, pauseN = 0;
      let blipDone = false, gavelDone = false, actingUntil = 0, interrupts = 0, clapped = false, congN = 0, quarN = 0, idleStage = 0, lastMur = api.now(), backAt = 0, lastQuarPoke = 0, toastN = 0;
      const IT1 = api.selftest ? 20000 : 60000, IT2 = api.selftest ? 40000 : 300000;
      let autoRun = null, snackBag = [], snackLast = 0, congUntil = 0, quarUntil = 0, evts = [], lastMulti = -9999, appealStapler = 0, demandBag = [];
      let tw = null, twq = [], bags = {}, lastOf = {}, lastReply = { q: '', b: '', h: '' }, revStars = null, paperKind = '', curSnack = SNACKS[0];
      /* ---------------------------------------------------------------- DOM */
      const seats = {}, crits = {};
      const SEATC = { q: 'm-draw-a-circle-seat m-draw-a-circle-q', b: 'm-draw-a-circle-seat m-draw-a-circle-b', h: 'm-draw-a-circle-seat m-draw-a-circle-h' };
      const CRITC = { q: 'm-draw-a-circle-crit', b: 'm-draw-a-circle-crit m-draw-a-circle-q2', h: 'm-draw-a-circle-crit m-draw-a-circle-h2' };
      const WAIT = { q: '(measuring the silence)', b: '(feeling the silence)', h: '(chewing)' };
      JK.forEach(function (j) {
        const face = el('span', { text: FACES[j][0] });
        const zzz = el('span', { class: 'm-draw-a-circle-zzz m-draw-a-circle-hide', 'aria-hidden': 'true', text: '💤' });
        const av = el('div', { class: 'm-draw-a-circle-av', 'aria-hidden': 'true' }, face, el('span', { class: 'm-draw-a-circle-tear', text: '💧' }), zzz);
        const pad = el('div', { class: 'm-draw-a-circle-pad', 'aria-hidden': 'true', text: '--.--' });
        const o = { face: face, av: av, pad: pad, zzz: zzz, snack: null, seat: null };
        const kids = [av];
        if (j === 'h') { o.snack = el('span', { class: 'm-draw-a-circle-snack', role: 'img', 'aria-label': 'Hob is holding a snack', text: SNACKS[0][0] }); kids.push(o.snack); }
        if (j === 'b') kids.push(el('span', { class: 'm-draw-a-circle-prop', 'aria-hidden': 'true', text: '👒' }));
        kids.push(el('div', { class: 'm-draw-a-circle-plate' }, el('span', { class: 'm-draw-a-circle-full', text: NAMES[j] }), el('span', { class: 'm-draw-a-circle-short', text: SHORT[j] })), pad);
        o.seat = el('div', { class: SEATC[j] }, kids);
        seats[j] = o;
        const flip = function () { const on = crits[j].classList.toggle('m-draw-a-circle-open'); crits[j].setAttribute('aria-expanded', on ? 'true' : 'false'); more(crits[j]); };
        crits[j] = el('p', { class: CRITC[j], dataset: { who: SHORT[j] }, text: WAIT[j], tabindex: '0', role: 'button', 'aria-expanded': 'false', onclick: flip, onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } } });
      });
      const needle = el('g', { class: 'm-draw-a-circle-needle' }, el('line', { x1: 60, y1: 60, x2: 60, y2: 18, stroke: '#C73E2E', 'stroke-width': 4, 'stroke-linecap': 'round' }), el('circle', { cx: 60, cy: 60, r: 5, fill: INK }));
      const gauge = el('svg', { class: 'm-draw-a-circle-gauge', viewBox: '0 0 120 70', 'aria-hidden': 'true' },
        el('path', { d: 'M10 60 A50 50 0 0 1 110 60', fill: 'none', stroke: '#7FD1B0', 'stroke-width': 10, 'stroke-linecap': 'round' }),
        el('path', { d: 'M10 60 A50 50 0 0 1 110 60', fill: 'none', stroke: INK, 'stroke-width': 2, 'stroke-dasharray': '2 9' }), needle);
      const mcap = el('div', { class: 'm-draw-a-circle-mcap', text: CAP.a[0] });
      const sweat = el('span', { class: 'm-draw-a-circle-sweat m-draw-a-circle-hide', 'aria-hidden': 'true', text: '💦' });
      const meter = el('div', { class: 'm-draw-a-circle-meter', title: 'Consensus meter' }, gauge, el('div', { style: 'min-width:0;flex:1' }, el('div', { style: 'font-size:.62rem;opacity:.75;font-weight:900;letter-spacing:.05em', text: 'CONSENSUS' }), mcap), sweat);
      const siren = el('div', { class: 'm-draw-a-circle-siren m-draw-a-circle-hide', 'aria-hidden': 'true', text: '🚨' });
      const geraldMsg = el('i', { text: '' });
      const gerald = el('div', { class: 'm-draw-a-circle-gerald', 'aria-hidden': 'true' }, el('b', { text: '🥔' }), geraldMsg);
      const bench = el('div', { class: 'm-draw-a-circle-bench' }, seats.q.seat, seats.b.seat, seats.h.seat, meter, siren, el('div', { class: 'm-draw-a-circle-spotcone', 'aria-hidden': 'true' }), gerald);
      const stripText = el('div', { text: '' });
      const strip = el('div', { class: 'm-draw-a-circle-strip m-draw-a-circle-hide' }, el('span', { class: 'm-draw-a-circle-clock', 'aria-hidden': 'true' }),
        el('div', { style: 'flex:1;min-width:0;overflow-wrap:anywhere' }, el('div', { style: 'font-size:.62rem;opacity:.75;font-weight:900', text: 'Tribunal clock: 11:42 AM' }), stripText));
      const cv = el('canvas', { tabindex: 0, role: 'application', width: 320, height: 320,
        'aria-label': 'Circle canvas. Draw with a pointer, or use arrow keys to steer a pen. Space lowers and lifts the pen. Enter presents to the panel. Escape clears.' });
      const nib = el('div', { class: 'm-draw-a-circle-nib', 'aria-hidden': 'true' });
      const lunch = el('span', { class: 'm-draw-a-circle-hide', 'aria-hidden': 'true', style: 'position:absolute;left:4px;top:-8px;font-size:1.2rem;pointer-events:none', text: '🥪' });
      const plaq = el('div', { class: 'm-draw-a-circle-plaq', 'aria-hidden': 'true', text: 'Untitled (Circle That Is Everywhere)' });
      const cutEl = el('div', { class: 'm-draw-a-circle-cut m-draw-a-circle-hide', 'aria-hidden': 'true' });
      const dotLab = el('div', { class: 'm-draw-a-circle-dotlab', 'aria-hidden': 'true', text: 'decorative' });
      const dotBtn = el('button', { type: 'button', class: 'm-draw-a-circle-dotbtn', 'aria-label': 'The decorative dot. It has been told it is decorative.', onclick: function () { dotClick(); } });
      const board = el('div', { class: 'm-draw-a-circle-board' }, cv, el('div', { class: 'm-draw-a-circle-dot', 'aria-hidden': 'true' }), dotLab, dotBtn, nib,
        el('div', { class: 'm-draw-a-circle-dim', 'aria-hidden': 'true' }), el('div', { class: 'm-draw-a-circle-quar', 'aria-hidden': 'true', text: 'QUARANTINE' }),
        el('div', { class: 'm-draw-a-circle-owl', 'aria-hidden': 'true', text: '🦉' }), el('div', { class: 'm-draw-a-circle-sigh', 'aria-hidden': 'true', text: '💨' }),
        el('div', { class: 'm-draw-a-circle-trail', 'aria-hidden': 'true' }), el('div', { class: 'm-draw-a-circle-sock', 'aria-hidden': 'true', text: '🧦' }), plaq, cutEl);
      const boardWrap = el('div', { class: 'm-draw-a-circle-boardwrap' }, el('div', { class: 'm-draw-a-circle-tab', 'aria-hidden': 'true', text: 'OFFICIAL CIRCLE SURFACE (NOT OFFICIAL)' }), board);
      const cap = el('div', { class: 'm-draw-a-circle-cap', 'aria-live': 'polite', text: 'Please draw a circle. Do not draw a circle that is a different shape.' });
      const auditEl = el('p', { class: 'm-draw-a-circle-audit m-draw-a-circle-hide', text: '' });
      const stage_ = el('div', { class: 'm-draw-a-circle-stage' }, strip, boardWrap, cap, auditEl,
        el('p', { class: 'm-draw-a-circle-hint', text: 'Draw with your finger or mouse, then lift. The panel will wait 0.7 seconds, which is 0.7 more than it waits for anyone else.' }),
        el('p', { class: 'm-draw-a-circle-kbd', text: 'Arrows steer. Space lowers the pen. Enter presents.' }));
      const roundEl = el('span', { class: 'm-draw-a-circle-flipn', text: 'Round 1' });
      const hcp = el('clipPath', null, el('path', { d: HEART })); hcp.setAttribute('id', 'm-draw-a-circle-hc');
      const heartFill = el('rect', { x: 0, y: 24, width: 24, height: 24, fill: CORAL, 'clip-path': 'url(#m-draw-a-circle-hc)' });
      const heart = el('svg', { class: 'm-draw-a-circle-heart', viewBox: '0 0 24 24', 'aria-hidden': 'true' },
        el('defs', null, hcp), heartFill, el('path', { d: HEART, fill: 'none', stroke: INK, 'stroke-width': 1.6 }));
      const scoreEl = el('div', { class: 'm-draw-a-circle-score', text: '--.--' });
      const stampEl = el('span', { class: 'm-draw-a-circle-stamp', text: 'PROVISIONAL' });
      const footEl = el('p', { class: 'm-draw-a-circle-foot', text: '' });
      const btn = function (label, cls, fn, extra) { return el('button', Object.assign({ type: 'button', class: cls, onclick: fn }, extra || {}), label); };
      const bPresent = btn('Present to Panel', 'm-draw-a-circle-btn m-draw-a-circle-go', function () { present(); });
      const bDraw = btn('Draw for me (Management insists)', 'm-draw-a-circle-btn', function () { drawForMe(); });
      const bClear = btn('Clear Table', 'm-draw-a-circle-btn', function () { clearTable('button'); });
      const appealLab = el('span', { text: 'Appeal' });
      const newSt = el('span', { class: 'm-draw-a-circle-new', 'aria-hidden': 'true', text: 'NEW' });
      const bAppeal = btn(el('span', null, '📎 ', appealLab), 'm-draw-a-circle-btn m-draw-a-circle-beige m-draw-a-circle-hide', function () { appeal(); }, {});
      bAppeal.appendChild(newSt); bAppeal.appendChild(lunch);
      const bTemplate = btn('Template Ring (Free)', 'm-draw-a-circle-btn m-draw-a-circle-gold m-draw-a-circle-hide', function () { templateRing(); });
      const bInter = btn('Intermission', 'm-draw-a-circle-btn m-draw-a-circle-lil m-draw-a-circle-hide', function () { intermission(); });
      const bGhost = btn('Ghost', 'm-draw-a-circle-btn', function () { ghostTog = !ghostTog; bGhost.setAttribute('aria-pressed', ghostTog ? 'true' : 'false'); hintGhost(); dirty = true; kick(); }, { 'aria-pressed': 'false' });
      const bConclude = btn('Conclude Proceedings (Optional)', 'm-draw-a-circle-btn m-draw-a-circle-gold m-draw-a-circle-hide', function () { ceremony(); });
      const ledU = el('span', { text: 'Unanimous: 0 of 0' });
      const titleEl = el('span', { text: api.player.name + ', Circle Associate (Probationary)' });
      const bagThumbs = [], galFrames = [];
      for (let i = 0; i < 6; i++) bagThumbs.push(el('canvas', { class: 'm-draw-a-circle-thumb m-draw-a-circle-hide', width: 34, height: 34, 'aria-hidden': 'true' }));
      const bagEl = el('div', { class: 'm-draw-a-circle-bag m-draw-a-circle-hide' }, el('span', { text: 'Evidence Bag' }), el('div', { class: 'm-draw-a-circle-bagsvg', 'aria-label': 'Evidence Bag, ziplock', role: 'img' }, bagThumbs));
      const galEmpty = el('span', { class: 'm-draw-a-circle-galempty', text: 'Bring us a scribble.' });
      const dennisEl = el('div', { class: 'm-draw-a-circle-chair m-draw-a-circle-hide', role: 'img', 'aria-label': 'Dennis, a plant, in a tiny chair', title: 'Dennis (Plant)' }, '🌱', el('small', { text: 'audience' }));
      for (let i = 0; i < 12; i++) {
        const c = el('canvas', { width: 44, height: 44, 'aria-hidden': 'true' });
        const f = el('button', { type: 'button', class: 'm-draw-a-circle-frame m-draw-a-circle-hide', 'aria-label': 'Framed circle. Press to hear the plaque read aloud.', onclick: function () { readPlaque(i); } }, c);
        galFrames.push({ f: f, c: c, plaque: '' });
      }
      const galEl = el('div', { class: 'm-draw-a-circle-gal m-draw-a-circle-hide' }, el('span', { text: 'Gallery of Bold Readings' }), galEmpty, galFrames.map(function (g) { return g.f; }), dennisEl);
      const pantryCount = el('small', { text: 'Pantry: 0' });
      const candleEl = el('span', { class: 'm-draw-a-circle-hide', role: 'img', 'aria-label': 'A candle', title: 'A candle', text: '🕯️' });
      const pantryEl = el('div', { class: 'm-draw-a-circle-pantry m-draw-a-circle-hide' }, pantryCount, el('span', { 'aria-hidden': 'true', text: '🥯' }), candleEl);
      const docket = el('div', { class: 'm-draw-a-circle-docket' },
        el('div', { class: 'm-draw-a-circle-row1' }, el('div', { class: 'm-draw-a-circle-round' }, roundEl), el('div', { class: 'm-draw-a-circle-tender' }, heart, el('span', { text: 'Tenderness (Unofficial)' }))),
        el('div', { class: 'm-draw-a-circle-btns' }, bPresent, bDraw, bClear, bAppeal, bTemplate, bInter, bGhost, bConclude),
        el('div', { class: 'm-draw-a-circle-ledger' }, ledU, el('span', { text: 'Best Circle: Undetermined' }), el('span', { text: 'Meh earned today: see Management' }), titleEl),
        bagEl, galEl, pantryEl);
      const srLive = el('div', { class: 'm-draw-a-circle-sr', 'aria-live': 'polite', text: '' });
      const critBox = el('div', { class: 'm-draw-a-circle-crits' }, crits.q, crits.b, crits.h);
      const offEl = el('div', { class: 'm-draw-a-circle-off' }, el('div', null, el('div', { style: 'font-size:.7rem;font-weight:800', text: 'Official Score' }), scoreEl), el('div', { class: 'm-draw-a-circle-stampw' }, stampEl), footEl);
      const wrap = el('div', { class: 'm-draw-a-circle-wrap m-draw-a-circle-t1' }, bench, critBox, offEl, stage_, docket, srLive);
      root.appendChild(wrap);
      api.setTitle('The Tribunal of Circularity');
      /* ---------------------------------------------------------------- helpers */
      let vctx = {};
      const fl = function (k) { return api.flag.get(k) === true; }, setFlag = function (k) { api.flag.set(k, true); };      // lint-ignore shared cross-module cast flags are read and set by name
      function say(text, o, c) {
        const t = c === false ? String(text === undefined || text === null ? '' : text) : fill(text, c || vctx);
        if (!t) return false;
        lastSayAt = api.now(); cadence = 12000 + api.rand() * 3000;
        return api.say(t, Object.assign({ mood: 'neutral', priority: 0 }, o || {}));
      }
      function bank(name) {
        const src = B[name];
        if (!Array.isArray(src) || !src.length) return '';
        let bag = bags[name];
        if (!bag || !bag.length) {
          bag = api.shuffle(src);
          if (bag.length > 1 && bag[bag.length - 1] === lastOf[name]) bag.unshift(bag.pop());
          bags[name] = bag;
        }
        const t = bag.pop(); lastOf[name] = t; return t;
      }
      function sfx(n) { if (sfxOn) api.sfx(n); }
      function et() { return (api.now() - t0) / 1000 * K; }
      /* the tone clock: the wall clock, sped up (at most 2x) by drawing a lot, so a keen artist is not stuck in the stern tier for three minutes */
      function tone() { const t = et(); return Math.min(t * 2, Math.max(t, 18 * nSub)); }
      function tierN() { if (mode !== 'normal') return 4; return tender < 25 ? 1 : tender < 50 ? 2 : tender < 75 ? 3 : 4; }
      function floorCap(e) {
        if (e < 180) return [0, 24]; if (e < 300) return [25, 49]; if (e < 390) return [50, 74]; if (e < 480) return [75, 99]; if (e < 570) return [75, 100];
        return [100, 100];
      }
      function take(n) { if (busy) return false; busy = n; busySince = api.now(); return true; }
      function release(n) {
        if (busy !== n) return;
        busy = null;
        api.setTimeout(function () { if (queued && !busy && stage === 'judged' && !stageV && !revealing && !autoRun && pts.length) { queued = false; stage = 'waiver'; submit(strokeSrc); } }, 400);      /* a circle that arrived during a busy spell is judged afterwards */
      }
      function show(e, on) { e.classList.toggle('m-draw-a-circle-hide', !on); }
      function setCap(t) { cap.textContent = t; }
      function restart(e, cls) { e.classList.remove(cls); void e.offsetWidth; e.classList.add(cls); }
      const TIERC = ['m-draw-a-circle-t1', 'm-draw-a-circle-t2', 'm-draw-a-circle-t3', 'm-draw-a-circle-t4'];
      function paintRoom() {
        const t = tierN();
        if (auditOn && mode !== 'normal') { auditOn = false; paintAudit(); }      /* the Bagel Protocol outranks Compliance */
        TIERC.forEach(function (c, i) { wrap.classList.toggle(c, i === t - 1); });
        wrap.classList.toggle('m-draw-a-circle-protocol', mode !== 'normal');
        wrap.classList.toggle('m-draw-a-circle-returning', mode === 'returning');
        JK.forEach(function (j) { if (!seats[j].sleeping && !seats[j].dq) seats[j].face.textContent = FACES[j][t - 1]; });
        heartFill.setAttribute('y', String(24 - 24 * clamp(tender, 0, 100) / 100));
        show(sweat, et() >= 60 || mode !== 'normal');
        meter.classList.toggle('m-draw-a-circle-strain', et() >= 60 || mode !== 'normal');
        if (!meter.classList.contains('m-draw-a-circle-gdq')) mcap.textContent = meterHold || meterCaption();
        roundEl.textContent = roundLabel();
        show(bConclude, mode === 'protocol' && protoCount >= 3 && !busy);
        bInter.disabled = verdictsSinceInter < 2;
        titleEl.textContent = api.player.name + (api.now() < actingUntil ? ', Presiding Judge (Acting, 11 seconds)' : ', Circle Associate (' + (isRetired() ? 'Retired' : 'Probationary') + ')');
        ledU.textContent = 'Unanimous: ' + unan + ' of ' + nSub;
        pantryCount.textContent = 'Pantry: ' + sv.pantry;
        seats.q.seat.style.order = mode === 'normal' ? 1 : mode === 'protocol' ? 2 : 3;
        seats.b.seat.style.order = mode === 'normal' ? 2 : mode === 'protocol' ? 3 : 1;
        seats.h.seat.style.order = mode === 'normal' ? 3 : mode === 'protocol' ? 1 : 2;
        JK.forEach(function (j) { crits[j].style.order = seats[j].seat.style.order; });
      }
      function isRetired() { return mode === 'returning' || protoCount >= 10; }
      function roundLabel() {
        if (mode === 'returning') return 'Round ' + Math.max(1, retRound) + ' (Returning)';
        if (mode === 'protocol' && protoCount >= 10) return 'Round ' + (protoCount - 9) + ' (Returning)';
        return 'Round ' + (nSub + 1);
      }
      function meterCaption() {
        if (mode === 'returning') return CAP.back;
        if (mode === 'protocol') return CAP.proto;
        if (tender >= 50) return CAP.tender;
        const r = nSub + 1;
        return CAP.a[r <= 2 ? 0 : r <= 5 ? 1 : r <= 8 ? 2 : r <= 12 ? 3 : 4];
      }
      function newSnack() {
        const list = mode === 'normal' ? SNACKS : (sv.ceremonies > 0 || ceremonies > 0 ? SNACKS2.concat([['🥯', 'a bagel']]) : SNACKS2);
        if (!snackBag.length) snackBag = api.shuffle(list);
        curSnack = snackBag.pop() || list[0];
        seats.h.snack.textContent = curSnack[0];
        seats.h.snack.setAttribute('aria-label', 'Hob is holding ' + curSnack[1]);
        seats.h.snack.title = curSnack[1];
        restart(seats.h.snack, 'm-draw-a-circle-bump');
      }
      function persist() {
        api.save.set('visits', sv.visits); api.save.set('drawn', sv.drawn); api.save.set('impounded', sv.impounded); api.save.set('bagels', sv.bagels);
        api.save.set('ceremonies', sv.ceremonies); api.save.set('pantry', sv.pantry); api.save.set('conceptual', sv.conceptual);
        api.save.set('evidence', sv.evidence); api.save.set('gallery', sv.gallery);
      }
      /* ---------------------------------------------------------------- canvas */
      function measure() {
        const s = clamp(Math.floor((stage_.clientWidth || 328) - 8), 260, 520), d = dprv();
        if (s === size && d === dpr && ctx2) return false;
        size = s; dpr = d;
        cv.width = Math.round(size * dpr); cv.height = Math.round(size * dpr);
        cv.style.width = size + 'px'; cv.style.height = size + 'px';
        try { ctx2 = cv.getContext('2d'); } catch (e) { ctx2 = null; }
        dirty = true; placeNib(); kick();
        return true;
      }
      function placeNib() { nib.style.left = (pen.x * size) + 'px'; nib.style.top = (pen.y * size) + 'px'; }
      function showNib(on) { nib.classList.toggle('m-draw-a-circle-on', !!on); }
      function toNorm(e) {
        const r = cv.getBoundingClientRect(), w = r.width || size, h = r.height || size;
        return { x: clamp(fin((e.clientX - r.left) / w, 0.5), 0, 1), y: clamp(fin((e.clientY - r.top) / h, 0.5), 0, 1) };
      }
      function kick() { if (loopOn || api.destroyed) return; loopOn = true; api.requestAnimationFrame(tick); }
      function pathOn(c, p, color, w) {
        const n = p.length;
        if (!n) return;
        c.strokeStyle = color; c.fillStyle = color; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round';
        if (n < 3) { c.beginPath(); c.arc(p[0].x * size, p[0].y * size, w * 0.5 + 1, 0, 2 * PI); c.fill(); if (n === 1) return; }
        c.beginPath(); c.moveTo(p[0].x * size, p[0].y * size);
        for (let i = 1; i < n; i++) {
          const a = p[i], q = p[i - 1];
          if (a.b) { c.moveTo(a.x * size, a.y * size); continue; }
          c.quadraticCurveTo(q.x * size, q.y * size, (q.x + a.x) / 2 * size, (q.y + a.y) / 2 * size);
        }
        c.lineTo(p[n - 1].x * size, p[n - 1].y * size);
        c.stroke();
      }
      function drawHole(c) {
        const r = size * 0.07, x = size / 2, y = size / 2;
        c.save(); c.shadowColor = 'rgba(27,37,64,.35)'; c.shadowBlur = 8; c.shadowOffsetY = 2;
        const g = c.createRadialGradient(x, y, r * 0.2, x, y, r); g.addColorStop(0, '#FFF6E0'); g.addColorStop(1, '#F1D9A8');
        c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, 2 * PI); c.fill(); c.restore();
        c.strokeStyle = '#D9A066'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r, 0, 2 * PI); c.stroke();
      }
      function drawOverlays(c, now) {
        if (!ov) return;
        const al = function (t) { return t ? clamp((now - t) / 250, 0, 1) : 0; };
        let a = al(ovT.ticks);
        if (a > 0 && ov.ticks) {
          c.globalAlpha = a; c.strokeStyle = '#C73E2E'; c.lineWidth = 2.5; c.lineCap = 'round';
          ov.ticks.forEach(function (p) { const x = p.x * size, y = p.y * size; c.beginPath(); c.moveTo(x - 6, y - 6); c.lineTo(x + 6, y + 6); c.moveTo(x + 6, y - 6); c.lineTo(x - 6, y + 6); c.stroke(); });
          if (ov.gap) {
            const g = ov.gap, ax = g.a.x * size, ay = g.a.y * size, bx = g.b.x * size, by = g.b.y * size;
            c.setLineDash([3, 4]); c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke(); c.setLineDash([]);
            c.fillStyle = '#C73E2E'; c.font = 'italic 700 12px "Segoe Script","Comic Sans MS",cursive';
            c.fillText(g.label, clamp((ax + bx) / 2 - 14, 4, size - 52), clamp((ay + by) / 2 - 8, 14, size - 6));
          }
        }
        a = al(ovT.glow);
        if (a > 0 && ov.glow) ov.glow.forEach(function (p) {
          const x = p.x * size, y = p.y * size, g = c.createRadialGradient(x, y, 2, x, y, 26);
          g.addColorStop(0, 'rgba(183,163,227,' + (0.85 * a).toFixed(2) + ')'); g.addColorStop(1, 'rgba(183,163,227,0)');
          c.globalAlpha = 1; c.fillStyle = g; c.beginPath(); c.arc(x, y, 26, 0, 2 * PI); c.fill();
        });
        a = al(ovT.ring);
        if (a > 0 && ov.ring) { c.globalAlpha = a; c.strokeStyle = '#F2B63B'; c.lineWidth = 4; c.beginPath(); c.arc(ov.ring.x * size, ov.ring.y * size, ov.ring.r * size, 0, 2 * PI); c.stroke(); }
        c.globalAlpha = 1;
      }
      function redraw() {
        if (!ctx2) return;
        const c = ctx2, now = api.now();
        c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, size, size);
        if (mode !== 'normal') drawHole(c);
        if ((ghostTog || ghostHold) && lastStroke && stage !== 'judged' && pts !== lastStroke) pathOn(c, lastStroke, 'rgba(27,37,64,0.12)', 5);
        if (rp) { c.fillStyle = 'rgba(27,37,64,0.3)'; c.fillRect(0, 0, size, size); }      /* the slow-motion replay dims the table, not the stroke */
        if (pts.length) {
          if (!rp && now < haloUntil) pathOn(c, pts, 'rgba(27,37,64,' + (0.25 * clamp((haloUntil - now) / 2000, 0, 1)).toFixed(3) + ')', 9);
          pathOn(c, rp ? pts.slice(0, clamp(rp.k, 1, pts.length)) : pts, inkColor, jamNow ? 7 : 5);
          if (jamNow && pts.length > 8) drawDrips(c, now);
        }
        if (rp) drawReplayMarks(c, now); else drawOverlays(c, now);
        dirty = false;
      }
      /* Hob's jam: short drips that lengthen downward after the stroke is submitted */
      function drawDrips(c, now) {
        const age = jamT0 ? (now - jamT0) / 1000 : 0;
        c.strokeStyle = JAM; c.lineWidth = 3; c.lineCap = 'round';
        for (let i = 5; i < pts.length; i += 9) {
          const h = h32(i, 77, seed), L = Math.min(10 + h * 36, age * 14 * (0.5 + h));
          if (h < 0.5 || L < 1) continue;
          const x = pts[i].x * size, y = pts[i].y * size;
          c.beginPath(); c.moveTo(x, y + 3); c.lineTo(x, Math.min(size, y + 3 + L)); c.stroke();
        }
      }
      function drawReplayMarks(c, now) {
        const p = pts[clamp(rp.k - 1, 0, pts.length - 1)], q = pts[rp.pi];
        c.fillStyle = CORAL; c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.arc(p.x * size, p.y * size, 6, 0, 2 * PI); c.fill(); c.stroke();
        if (rp.ring) { c.strokeStyle = CORAL; c.lineWidth = 3; c.setLineDash([6, 5]); c.beginPath(); c.arc(q.x * size, q.y * size, 24 + 3 * Math.sin(now / 120), 0, 2 * PI); c.stroke(); c.setLineDash([]); }
      }
      function tick() {
        loopOn = false;
        if (api.destroyed) return;
        const now = api.now(), dt = clamp((now - lastTs) / 1000, 0.001, 0.05);
        lastTs = now;
        if (autoRun) stepAuto(now);
        if (rp) { stepReplay(now); dirty = true; }      /* the ring pulses, so a replay redraws every frame */
        if (jamNow && jamT0 && now - jamT0 < 4500) dirty = true;      /* drips are still lengthening */
        let any = false, tx = 0, ty = 0;
        Object.keys(held).forEach(function (k) {
          if (held[k] && now - heldAt[k] > 2500) { delete held[k]; return; }
          if (held[k] && ARROWS[k]) { any = true; tx += ARROWS[k][0]; ty += ARROWS[k][1]; }
        });
        const L = Math.hypot(tx, ty) || 1, sp = (mods.shift ? 50 : mods.ctrl ? 300 : 140) / 520, a = 1 - Math.exp(-dt / 0.12);
        pen.vx += (tx / L * sp - pen.vx) * a; pen.vy += (ty / L * sp - pen.vy) * a;
        const moving = any || Math.abs(pen.vx) > 1e-4 || Math.abs(pen.vy) > 1e-4;
        if (moving) {
          pen.x = clamp(pen.x + pen.vx * dt, 0, 1); pen.y = clamp(pen.y + pen.vy * dt, 0, 1);
          placeNib();
          if (penDown && !drawBlocked()) addPoint(pen.x, pen.y, false);
        }
        if (dirty || now < haloUntil) redraw();
        if (autoRun || rp || moving || dirty || now < haloUntil) kick();      /* a lowered pen that is not moving needs no frames; the next key press kicks the loop */
      }
      /* ---------------------------------------------------------------- strokes */
      const ARROWS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
      function clearWaiver() { if (waiverT) { api.clearTimeout(waiverT); waiverT = 0; } }
      function locked() { return busy === 'ceremony' || busy === 'bagel' || busy === 'tuesday'; }
      function drawBlocked() { return locked() || busy === 'quarantine' || busy === 'reverse'; }
      function addPoint(x, y, brk) {
        const now = api.now();
        lastEvt = now;
        const last = pts[pts.length - 1];
        if (last && !brk && Math.hypot(x - last.x, y - last.y) * size < minSp) return;
        pts.push(brk ? { x: x, y: y, t: now, b: true } : { x: x, y: y, t: now });
        if (pts.length > 2500) {
          const keep = [];
          for (let i = 0; i < pts.length; i++) if (i % 2 === 0 || i === pts.length - 1) keep.push(pts[i]);
          pts = keep; minSp *= 2;
        }
        haloUntil = now + 2000; dirty = true; kick();
      }
      function newCanvas() {
        cancelVerdict(); clearWaiver();
        autoRun = null; queued = false; pts = []; stage = 'empty'; drawing = false; pid = null; penDown = false; minSp = 1.5; inkColor = INK; ov = null; haloUntil = 0; stageV = null; jamNow = false; jamT0 = 0;
        wrap.classList.remove('m-draw-a-circle-concept');
        nib.classList.remove('m-draw-a-circle-down');
        dirty = true; kick();
      }
      function startStroke(src) {
        if (drawBlocked()) return false;
        if (autoRun) newCanvas();
        if (stage === 'waiver') { clearWaiver(); stage = 'drawing'; strokeSrc = src; restoreCap(); return 'cont'; }
        if (stage === 'drawing') return 'cont';
        if (stage === 'judged') { if (revealing && !busy) interrupted(); newCanvas(); }
        stage = 'drawing'; pts = []; strokeSrc = src; conceptN = 0; minSp = 1.5; inkColor = INK; pausedSaid = false;
        jamNow = jamOn; jamOn = false; if (jamNow) inkColor = JAM;      /* Hob's jar is good for exactly one circle */
        if (cap.textContent === 'The table is clear.') restoreCap();
        return 'new';
      }
      function liftPen() {
        drawing = false; penDown = false; pid = null;
        nib.classList.remove('m-draw-a-circle-down');
        if (stage === 'drawing') {
          stage = 'waiver'; clearWaiver(); if (!busy && !revealing) setCap('You have lifted the pen. The Waiver is running.');
          waiverT =api.setTimeout(function () { waiverT = 0; if (stage === 'waiver') submit(strokeSrc); }, 700);
        }
      }
      function multitouch() {
        const now = api.now();
        if (now - lastMulti < 4000) return;
        lastMulti = now; say(bank('m.multitouch'), { mood: 'confused' });
      }
      function onDown(e) {
        lastAct = api.now();
        if (e.pointerType === 'mouse' && e.button > 0) return;
        if (drawing && e.pointerId !== pid) { multitouch(); return; }
        strokeEvent();
        const r = startStroke('pointer');
        if (!r) { if (busy === 'quarantine' && api.now() - lastQuarPoke > 3500) { lastQuarPoke = api.now(); say(bank('m.quar.poke'), { mood: 'confused', priority: 1 }); } return; }
        drawing = true; pid = e.pointerId; penDown = false;
        showNib(false);
        try { cv.setPointerCapture(e.pointerId); } catch (_) { /* synthetic pointers cannot be captured */ }
        const p = toNorm(e); pen.x = p.x; pen.y = p.y; pen.vx = 0; pen.vy = 0;
        addPoint(p.x, p.y, r === 'cont');
        try { cv.focus({ preventScroll: true }); } catch (_) { /* no focus */ }
        if (e.cancelable) e.preventDefault();
      }
      function onMove(e) {
        if (!drawing || e.pointerId !== pid) return;
        lastAct = api.now();
        const p = toNorm(e); pen.x = p.x; pen.y = p.y;
        addPoint(p.x, p.y, false);
      }
      function onUp(e) { if (drawing && e.pointerId === pid) liftPen(); }
      function togglePen() {
        if (drawing) return;
        if (penDown) { liftPen(); return; }
        strokeEvent();
        const r = startStroke('keys');
        if (!r) return;
        penDown = true; nib.classList.add('m-draw-a-circle-down'); showNib(true);
        addPoint(pen.x, pen.y, r === 'cont'); kick();
      }
      function onKey(e) {
        lastAct = api.now(); mods.shift = !!e.shiftKey; mods.ctrl = !!(e.ctrlKey || e.altKey);
        const k = e.key;
        if (!kbdShown && (ARROWS[k] || k === ' ' || k === 'Enter')) { kbdShown = true; wrap.classList.add('m-draw-a-circle-kbdon'); }      /* the keyboard manual appears once a keyboard has been used */
        if (ARROWS[k]) { if (!held[k]) heldAt[k] = api.now(); held[k] = true; showNib(true); e.preventDefault(); kick(); }
        else if (k === ' ' || k === 'Spacebar') { e.preventDefault(); if (!e.repeat) togglePen(); }
        else if (k === 'Enter') { e.preventDefault(); if (!e.repeat) present(); }
        else if (k === 'Escape') { e.preventDefault(); clearTable('key'); }
      }
      function onKeyUp(e) { mods.shift = !!e.shiftKey; mods.ctrl = !!(e.ctrlKey || e.altKey); delete held[e.key]; }
      /* generated strokes: Draw for me (mediocre) and the Template Ring (perfect) */
      function startAuto(arr, src) {
        if (locked() || busy === 'reverse') return;
        if (revealing && !busy) interrupted();
        newCanvas(); conceptN = 0;
        stage = 'drawing'; strokeSrc = src; minSp = 0;
        autoRun = { arr: arr, i: 0, t0: api.now(), src: src };
        kick();
      }
      function stepAuto(now) {
        const a = autoRun, e = now - a.t0;
        if (stage !== 'drawing') { autoRun = null; return; }
        while (a.i < a.arr.length && a.arr[a.i].t <= e) { const p = a.arr[a.i++]; pts.push({ x: p.x, y: p.y, t: a.t0 + p.t }); }
        haloUntil = now + 2000; dirty = true;
        if (a.i >= a.arr.length) { autoRun = null; submit(a.src); }
      }
      let autos = 0;
      function drawForMe() {
        strokeEvent(); lastAct = api.now();
        if (locked() || busy === 'reverse') return;
        autos++; S.inc('draw-a-circle.autos');
        const w = 0.04 + api.rand() * 0.05, g = 0.03 + api.rand() * 0.05;
        startAuto(genCircle({ n: 70, r: 0.28 + api.rand() * 0.06, cx: 0.5 + (api.rand() - 0.5) * 0.06, cy: 0.5 + (api.rand() - 0.5) * 0.06, dir: autos % 2 ? 1 : -1,
          start: api.rand() * 2 * PI, sweep: 2 * PI - g, ease: 0.9, a2: w * 0.75, a3: w * 0.5, p2: api.rand() * 6, p3: api.rand() * 6, dur: 1600 }, 0), 'auto');
      }
      function templateRing() {
        strokeEvent(); lastAct = api.now();
        if (locked() || busy === 'reverse') return;
        S.inc('draw-a-circle.templates');
        startAuto(genCircle({ n: 64, r: 0.3, cx: 0.5, cy: 0.5, dir: 1, start: -PI / 2, sweep: 2 * PI, ease: 0, a2: 0, a3: 0, p2: 0, p3: 0, dur: 800 }, 0), 'template');
      }
      function clearTable(src) {
        strokeEvent(); lastAct = api.now();
        if (locked()) return;
        wipes++; S.inc('draw-a-circle.wipes');
        /* every wiped circle is remembered: wipe 3 reads their eulogies from this */
        const now = api.now(), rec = !pts.length ? { empty: true } : stage === 'judged' ? { n: nSub, life: Math.max(0, Math.round((now - pts[0].t) / 1000)), loved: Math.max(0, Math.round((now - judgedAt) / 1000)) } : { n: nSub + 1, unf: true };
        if (rec.loved > rec.life) rec.loved = rec.life;
        wipedLog.push(rec); if (wipedLog.length > 6) wipedLog.shift();
        newCanvas(); setCap('The table is clear.');
        api.setTimeout(function () { if (stage === 'empty' && !revealing && !busy && cap.textContent === 'The table is clear.') restoreCap(); }, 2500);
        if (wipes === 3 && !busy) { api.award(0.1, 'wipe'); funeral(); }
        else if (wipes === 4 && funeralDone) say(B['fun.sandra'][0], { mood: 'confused', priority: 1 });
        else if (wipes <= 3) { api.award(0.1, 'wipe'); say(bank('m.wipe'), { mood: 'neutral' }, { WIPE: wipes }); }
        else say(bank('m.wipe.over'), { mood: 'smug' }, { WIPE: wipes });
        if (src === 'key') sfx('whoosh'); else sfx('pop');
      }
      /* wipe 3: the Funeral for Wiped Circles, with eulogies read from what was actually wiped */
      function funeral() {
        if (funeralDone || !take('funeral')) return;
        funeralDone = true; S.inc('draw-a-circle.funerals'); closePaper(); sfx('sad');
        const at = function (ms) { return Math.round(ms * TS); }, L = wipedLog.slice(-3), secs = function (n) { return n + (n === 1 ? ' second' : ' seconds'); };
        const eulogy = function (r) { return r.empty ? 'An empty table was wiped. It was thoroughly mourned. It was also thoroughly empty.' : r.unf ? 'Circle No. ' + r.n + ' was never finished. It was, in a sense, a promise.' : 'Circle No. ' + r.n + ' lived for ' + secs(r.life) + ' and was loved for ' + r.loved + ' of them.'; };
        JK.forEach(function (j, i) { seats[j].seat.classList.add('m-draw-a-circle-stand'); setPad(j, 'R.I.P.', 'm-draw-a-circle-slow'); typeInto(j, B['fun.' + j][0]); });
        setCap('The room has gone quiet.');
        say(B['fun.say'][0], { mood: 'disappointed', priority: 2 });
        const steps = L.map(function (r, i) { return [at(3200 * (i + 1)), function () { say(eulogy(r), { mood: 'disappointed', priority: 2 }); sfx('tick'); }]; }), end = 3200 * (L.length + 1);
        steps.push([at(end - 1500), function () { say(B['fun.say'][1], { mood: 'disappointed', priority: 2 }); }]);
        steps.push([at(end), function () { seats.h.snack.style.transform = 'translate(-26px,34px) rotate(-12deg)'; say(B['fun.h'][0], { who: NAMES.h, mood: 'neutral', priority: 2 }); }]);
        steps.push([at(end + 3000), function () { show(pantryEl, true); show(candleEl, true); sfx('bell'); say(B['fun.say'][2], { mood: 'proud', priority: 2 }); }]);
        steps.push([at(end + 6200), function () {
          JK.forEach(function (j) { seats[j].seat.classList.remove('m-draw-a-circle-stand'); typeInto(j, B['fun.' + j][1]); });
          seats.h.snack.style.transform = ''; resetPads(); restoreCap(); release('funeral'); api.award(1, 'Condolence Payment'); paintRoom();
        }]);
        chain(steps);
      }
      function present() {
        strokeEvent(); lastAct = api.now();
        if (locked() || autoRun) return;
        if (stage === 'drawing' || stage === 'waiver') { if (pts.length) submit(strokeSrc); return; }
        if (stage === 'judged') { say(bank('m.already'), { mood: 'confused' }); return; }
        concept();
      }
      function hintGhost() {
        if (ghostHinted) return;
        ghostHinted = true; say(B['m.ghost'][0], { mood: 'smug' });
      }
      /* ---------------------------------------------------------------- verdict machinery */
      let revealing = false, lastSandra = -99, paper = null, paperT = 0, geraldT = 0;
      const PADV = ['m-draw-a-circle-dq', 'm-draw-a-circle-ok', 'm-draw-a-circle-slow', 'm-draw-a-circle-bag'];
      function chain(steps) { steps.forEach(function (s) { api.setTimeout(s[1], Math.max(1, Math.round(s[0]))); }); }
      function vlater(ms, fn) {
        const id = curV;
        vt.push(api.setTimeout(function () { if (id === curV && !api.destroyed) fn(); }, Math.max(1, Math.round(ms * TS))));
      }
      function setPad(j, text, variant) {
        const p = seats[j].pad;
        PADV.forEach(function (c) { p.classList.remove(c); });
        if (variant) p.classList.add(variant);
        p.textContent = text;
      }
      function flipPad(j, text, variant) { restart(seats[j].pad, 'm-draw-a-circle-flip'); vlater(190, function () { setPad(j, text, variant); }); }
      function resetPads() { JK.forEach(function (j) { setPad(j, '--.--', ''); }); }
      /* a phone clips each quote to two lines: say so, once the typing has finished and only if it really overflows */
      function more(n) { try { n.classList.toggle('m-draw-a-circle-more', n.scrollHeight > n.clientHeight + 3 && !n.classList.contains('m-draw-a-circle-open')); } catch (e) { /* cosmetic */ } }
      function typeInto(j, text) {
        const node = crits[j];
        twq = twq.filter(function (q) { return q.node !== node; });
        node.textContent = ''; node.classList.remove('m-draw-a-circle-more');
        twq.push({ node: node, text: String(text || ''), i: 0 });
        if (!tw) tw = api.setInterval(function () {
          twq.forEach(function (q) { q.i = Math.min(q.text.length, q.i + 3); q.node.textContent = q.text.slice(0, q.i); if (q.i >= q.text.length) more(q.node); });
          twq = twq.filter(function (q) { return q.i < q.text.length; });
          if (!twq.length) { api.clearInterval(tw); tw = null; }
        }, 24);
      }
      function finishType() {
        twq.forEach(function (q) { q.node.textContent = q.text; more(q.node); });
        twq = [];
        if (tw) { api.clearInterval(tw); tw = null; }
      }
      function setFaces(kind) {
        JK.forEach(function (j) {
          const s = seats[j];
          s.dq = kind === 'dq'; s.sleeping = kind === 'sleep';
          s.face.textContent = kind === 'dq' ? DQFACE[j] : kind === 'sleep' ? '😴' : kind === 'tue' ? '😨' : FACES[j][tierN() - 1];
          show(s.zzz, kind === 'sleep');
        });
      }
      function runAfter(v) {
        if (!v || v.afterRan || typeof v.after !== 'function') return;
        v.afterRan = true;
        try { v.after(); } catch (e) { /* a late flourish must never break the next circle */ }
      }
      function cancelVerdict() {
        runAfter(stageV);                              /* achievements must not depend on the player waiting for the reveal */
        curV++;
        vt.forEach(function (h) { api.clearTimeout(h); });
        vt = [];
        finishType(); stopReplay();
        revealing = false;
        siren.classList.add('m-draw-a-circle-hide'); bench.classList.remove('m-draw-a-circle-shake');
        meter.classList.remove('m-draw-a-circle-gdq'); mcap.textContent = meterHold || meterCaption();
        JK.forEach(function (j) { seats[j].seat.classList.remove('m-draw-a-circle-stand'); });
        if (seats.q.dq) setFaces('normal');
        hideGerald();
      }
      let meterHold = '';
      function hideGerald() { gerald.classList.remove('m-draw-a-circle-in'); geraldOn = false; }
      function markOv(k) { ovT[k === 'ticks' ? 'ticks' : k] = api.now(); if (k === 'ticks') ovT.gap = api.now(); haloUntil = Math.max(haloUntil, api.now() + 300); dirty = true; kick(); }
      /* ---- spam ---- */
      function strokeEvent() {
        const now = api.now();
        evts.push(now); if (evts.length > 80) evts.shift();
        let c8 = 0, c20 = 0;
        for (let i = 0; i < evts.length; i++) { if (now - evts[i] <= 8000 * SP) c8++; if (now - evts[i] <= 20000 * SP) c20++; }
        if (c20 >= 40 && now > quarUntil && !busy) quarantine();
        else if (c8 >= 12 && now > congUntil && busy !== 'quarantine' && !locked()) congestion();
      }
      function spamVerdict() {
        cancelVerdict(); stageV = null;
        JK.forEach(function (j) { setPad(j, 'ONE AT A TIME', 'm-draw-a-circle-slow'); restart(seats[j].pad, 'm-draw-a-circle-flip'); });
        typeInto('q', bank('q.spam')); typeInto('b', bank('b.spam')); typeInto('h', busy === 'quarantine' ? B['h.spam'][0] : bank('h.spam.c'));
        inkColor = CORAL; dirty = true; kick();
      }
      function congestion() {
        const now = api.now();
        congUntil = now + 5000 * SP;
        S.inc('draw-a-circle.spam');
        const paid = api.award(-3, 'Circle Congestion Charge');
        courtesy = courtesy || paid < 0;
        sfx('bell'); api.achieve('draw-a-circle.congestion');
        wrap.classList.add('m-draw-a-circle-congest');
        spamVerdictPads();
        congN++; say(congN > 1 && congN < 6 ? B['m.spam.again'][congN - 2] : bank('m.spam'), { mood: 'panic', priority: 1 });
        api.setTimeout(function () { say(bank('o.owl'), { who: 'The Rate Limit Officer', mood: 'disappointed', priority: 1 }); }, 1800 * SP);
        api.setTimeout(function () {
          wrap.classList.remove('m-draw-a-circle-congest');
          if (!revealing && stage === 'judged' && !stageV) resetPads();
        }, 5000 * SP);
      }
      function spamVerdictPads() {
        cancelVerdict();
        JK.forEach(function (j) { setPad(j, 'ONE AT A TIME', 'm-draw-a-circle-slow'); restart(seats[j].pad, 'm-draw-a-circle-flip'); });
        typeInto('q', bank('q.spam')); typeInto('b', bank('b.spam')); typeInto('h', bank('h.spam.c'));
      }
      function quarantine() {
        if (!take('quarantine')) return;
        const now = api.now();
        quarUntil = now + 40000 * SP;
        S.inc('draw-a-circle.quarantines'); quarN++;
        if (drawing || penDown || stage === 'drawing' || stage === 'waiver') { liftPen(); clearWaiver(); }
        autoRun = null;
        cancelVerdict();
        wrap.classList.add('m-draw-a-circle-sighing');
        sfx('sad');
        typeInto('h', B['h.spam'][0]);
        chain([
          [700 * SP, function () { sfx('whoosh'); }],
          [1400 * SP, function () {
            sfx('sad'); wrap.classList.remove('m-draw-a-circle-sighing'); wrap.classList.add('m-draw-a-circle-quarantine');
            say(B['m.quarantine'][0], { mood: 'disappointed', priority: 1 });
            say(quarN > 1 ? bank('m.quar.again') : B['m.quarantine'][1], { mood: 'confused', priority: 0 });
          }],
          [4400 * SP, function () { say(bank('m.quar.mid'), { mood: 'confused', priority: 0 }); }],
          [7400 * SP, function () {
            wrap.classList.remove('m-draw-a-circle-quarantine'); release('quarantine');
            say(B['m.quarantine'][2], { mood: 'smug', priority: 1 });
            if (stage === 'judged' && !stageV) { newCanvas(); }
          }]
        ]);
      }
      /* ---- tender, orders, fouls ---- */
      function bumpTender(cls, first) {
        let d = 8;
        if (first) d += 5;
        if (cls === 'DOT') d += 10;
        if (cls === 'PERFECT') d = -3;
        if (mode === 'normal') { const fc = floorCap(tone()); tender = clamp(tender + d, fc[0], fc[1]); }
        else tender = 70;
      }
      function foulOf(m, auto) {
        if (!ordersOn || orderIdx > 7 || auto || m.cls === 'DOT' || m.cls === 'TINY') return false;
        switch (orderIdx) {
          case 0: case 6: return m.cw;
          case 1: return m.touchesEdge;
          case 2: return m.speedCV < 0.15 || m.meanSpeed > 900;
          case 3: return !m.enclosesDot;
          case 4: return !m.startTop;
          case 5: return m.meanR > 0.38;
          default: return m.secs < 2;
        }
      }
      function startOrders() {
        ordersOn = true; orderIdx = 0; ordersSince = 0;
        show(strip, true); stripText.textContent = B['so.orders'][0];
        say(B['so.orders'][0], { mood: 'smug', priority: 1 });
        meterBlip();
      }
      function decimals() { return nSub >= 20 ? 5 : nSub >= 12 ? 4 : nSub >= 6 ? 3 : 2; }
      /* ---- the submit gate ---- */
      function submit(src) {
        if (stage !== 'drawing' && stage !== 'waiver') return;
        if (!pts.length) { stage = 'empty'; return; }
        clearWaiver(); drawing = false; penDown = false; pid = null; autoRun = null; nib.classList.remove('m-draw-a-circle-down');
        stage = 'judged'; restoreCap();
        const now = api.now(); judgedAt = now; if (jamNow) jamT0 = now;
        if (now < congUntil || busy === 'quarantine') { spamVerdict(); return; }
        if (busy) { dirty = true; queued = true; setCap('The panel is occupied. Your circle has joined a very polite queue.'); api.setTimeout(function () { if (!revealing && stage === 'judged' && !stageV) restoreCap(); }, 3500); return; }
        const raw = pts, m = analyze(raw, size), cls = m.cls, auto = src === 'auto' || src === 'template';
        const first = !seen[cls]; seen[cls] = true;
        nSub++; sv.drawn++; verdictsSinceInter++;
        S.inc('draw-a-circle.drawn');
        if (cls === 'PERFECT') S.inc('draw-a-circle.perfects'); else if (cls === 'SCRIBBLE') S.inc('draw-a-circle.scribbles'); else if (cls === 'DOT') S.inc('draw-a-circle.dots');
        api.achieve('draw-a-circle.first');
        if (src === 'auto') api.achieve('draw-a-circle.auto');
        if (mode === 'protocol') protoCount++;
        if (mode === 'returning') retRound++;
        const dq = cls === 'PERFECT';
        const soLabel = SO_LABEL[Math.min(orderIdx, SO_LABEL.length - 1)];
        const foul = !dq && foulOf(m, auto);
        let copy = false;
        if (cls !== 'DOT' && prevRs && similar(m.rs, prevRs, m.meanR)) copy = true;
        plagStreak = copy ? plagStreak + 1 : 0;
        if (cls !== 'DOT') prevRs = m.rs;
        dotStreak = cls === 'DOT' ? dotStreak + 1 : 0;
        lastStroke = raw;
        bumpTender(cls, first);
        let orderChanged = false;
        if (ordersOn) { ordersSince++; if (ordersSince >= 2) { ordersSince = 0; orderIdx++; if (orderIdx >= 16) orderIdx = 8; orderChanged = true; stripText.textContent = B['so.orders'][orderIdx]; } }
        const o = { src: src, auto: auto, first: first, foul: foul, copy: copy, soLabel: soLabel, orderChanged: orderChanged, firstScribble: cls === 'SCRIBBLE' && !scribbleSeen, audit: auditOn && mode === 'normal' };
        if (cls === 'SCRIBBLE') scribbleSeen = true;
        let v = null;
        if (mode === 'normal' && !busy && tender >= 100) { bagelMoment(m); }
        else if (!dq && !busy && !sockSeen && (nSub >= (api.selftest ? 12 : 40) || api.chance(api.selftest ? 0.1 : 1 / 50))) v = sockVerdict(m, o);
        else if (dq) v = dqVerdict(m, o);
        else v = normalVerdict(m, o);
        if (courtesy) { courtesy = false; api.award(3, 'courtesy'); }
        if (cls === 'SCRIBBLE' || cls === 'SPIRAL' || cls === 'FIG8' || cls === 'SQUARE') {
          S.inc('draw-a-circle.gallery');
          sv.gallery.push({ p: pack24(m), c: cls, n: nSub }); if (sv.gallery.length > 12) sv.gallery.shift();
          paintGallery();
        }
        if (nSub % 5 === 0) persist();
        if (o.audit) { auditLeft--; if (auditLeft <= 0) endAudit(); else paintAudit(); }
        if (v && v.kind === 'normal' && !tueSeen && !tueQ && nSub >= (api.selftest ? 4 : 8) && api.chance(api.selftest ? 0.08 : 1 / 45)) {
          tueQ = true; api.setTimeout(function () { tueQ = false; if (idleOk()) nearTuesday(); }, Math.round(5200 * TS));
        }
        if (v) reveal(v);
        paintRoomSoon();
      }
      function paintRoomSoon() { ledU.textContent = 'Unanimous: ' + unan + ' of ' + nSub; roundEl.textContent = roundLabel(); restart(roundEl, 'm-draw-a-circle-turn'); heartFill.setAttribute('y', String(24 - 24 * clamp(tender, 0, 100) / 100)); }
      /* ---- scoring ---- */
      function spread(Q, Bs, H, pinB) {
        if (Math.max(Q, Bs, H) - Math.min(Q, Bs, H) < 25) {
          if (pinB) Q = clamp(Bs >= 50 ? Bs - 26 : Bs + 26, 3, 99.99); else Bs = clamp(Q >= 52 ? Q - 26 : Q + 26, 3, 99.99);
        }
        if (Math.abs(Q - Bs) < 7) { if (pinB) Q = clamp(Bs >= 50 ? Bs - 9 : Bs + 9, 3, 99.99); else Bs = clamp(Q >= 50 ? Q - 9 : Q + 9, 3, 99.99); }
        for (let k = 0; k <= 12; k++) {
          const c = clamp(H + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 8, 20, 99.5);
          if (Math.abs(c - Q) >= 7 && Math.abs(c - Bs) >= 7) { H = c; break; }
        }
        return [Q, Bs, H];
      }
      function critFor(j, m, o) {
        const cls = m.cls, tn = ['stern', 'mixed', 'tender', 'tearful'][tierN() - 1];
        if (mode === 'returning' && api.chance(0.45)) return bank(j + '.returning');
        if (mode === 'protocol' && api.chance(0.5)) {
          if (j === 'q') return bank(api.chance(0.5) ? 'q.protocol' : 'q.tearful.generic');
          if (j === 'h') return bank(api.chance(0.5) ? 'h.protocol' : 'h.stern.generic');
          return bank('b.protocol');
        }
        if (j === 'b' && o.firstScribble) return bank('b.SCRIBBLE.first');
        if (j === 'h' && cls === 'DOT' && dotStreak >= 3) return bank('h.DOT.three');
        const always = cls === 'PERFECT' || cls === 'SCRIBBLE' || cls === 'DOT';
        if (B[j + '.' + cls] && (always || api.chance(0.5))) {
          let t = bank(j + '.' + cls);
          for (let k = 0; k < 4 && m.crossings < 3 && /%CROSSN?%/.test(t); k++) t = bank(j + '.' + cls);      /* do not count crossings a stroke does not have */
          return t;
        }
        if (o.audit && api.chance(0.55)) return bank('aud.' + j);
        if (o.src === 'keys' && j !== 'b' && api.chance(0.35)) return bank(j + '.keys');
        if (j === 'b') {
          if (m.hes.length && api.chance(0.35)) return bank('b.hesitation');
          if (m.secs > 0 && m.secs < 1.2 && api.chance(0.35)) return bank('b.fast');
          if (m.secs > 8 && api.chance(0.35)) return bank('b.slow');
        }
        return bank(j + '.' + tn + '.generic');
      }
      function ctxFor(m, N, D, Q, Bs, H, off, o) {
        const f = function (x) { return fx(x, D) + '%'; };
        return { Q: f(Q), B: f(Bs), H: f(H), OFF: f(off), CIRC: fx(m.circ * 100, 1), DEV: fx(m.devPct, 1), GAPMM: fx(m.gapMm, 1), CROSS: String(m.crossings), CROSSN: m.crossings + (m.crossings === 1 ? ' self-intersection' : ' self-intersections'), PR: fx(m.pathRatio, 1),
          ASP: fx(m.asp, 2), SECS: fx(m.secs, 1), HOLEPCT: '2', N: String(N), UN: String(unan), WIPE: String(wipes), SO: o && o.soLabel ? o.soLabel : '1', PLAQUE: '', DEMAND: '' };
      }
      function moodFor(cls) { return cls === 'SCRIBBLE' ? 'proud' : cls === 'PERFECT' ? 'panic' : cls === 'DOT' ? 'confused' : 'smug'; }
      function normalVerdict(m, o) {
        const cls = m.cls, N = nSub, D = decimals();
        const Qraw = 100 - 6 * m.devPct - 0.8 * m.gapPct - 6 * m.crossings;
        let Q = clamp(Qraw, 3, 99.99);
        let Bs = clamp(100 - 0.6 * Qraw + Math.min(18, 4 * m.hes.length + 20 * m.speedCV), 3, 99.99), pinB = false;
        if (cls === 'SCRIBBLE') { Bs = o.firstScribble ? 98.4 : 96 + api.rand() * 3.6; pinB = true; }
        else if (cls === 'SQUARE') { Bs = 99.99; pinB = true; }
        else if (cls === 'DOT') { Bs = 92 + api.rand() * 0.9; pinB = true; }
        let H = 20 + 76 * h32(Math.round(m.bw * 100), Math.round(m.bh * 100) * 131 + (m.n % 997), seed + N) + 0.15 * tender;
        if (cls === 'DOT') H = 40 + api.rand() * 2;
        if (hobWeird) { H += api.rand() * 50 - 25; hobWeird = false; }
        const sp = spread(Q, Bs, clamp(H, 20, 99.5), pinB);
        Q = sp[0]; Bs = sp[1]; H = sp[2];
        const off = (Q + Bs + H) / 3, c = ctxFor(m, N, D, Q, Bs, H, off, o), hf = h32(Math.round(m.bw * 100), 7, seed + N);
        let pay;
        if (mode === 'returning') pay = 0.3; else if (o.foul) pay = 0; else if (o.first || cls === 'SCRIBBLE' && o.firstScribble) pay = 6; else if (cls === 'DOT') pay = 0.3; else pay = 0.3 + api.rand() * 0.9;
        if (pay > 0) api.award(pay, 'circle');
        const crit = JK.map(function (j) { return fill(critFor(j, m, o), c); });
        const toast = mode === 'normal' && beatMax >= 2 && !o.foul && !o.audit && cls !== 'DOT' && toastN < 2 && (api.chance(api.selftest ? 0.12 : 1 / 14) || (nSub === 12 && toastN === 0));
        const clap = !toast && beatMax >= 7 && !clapped && api.chance(api.selftest ? 0.2 : 0.1);
        if (toast) { toastN++; crit[2] = bank('toast.crit'); }
        if (jamNow && !toast) { crit[0] = B['jam.q'][0]; crit[1] = B['jam.b'][0]; crit[2] = B['jam.h'][0]; }      /* a plagiarism verdict below may still overwrite these */
        const says = [];
        let main, mood = o.foul ? 'smug' : moodFor(cls);
        if (o.foul) main = bank('m.foul');
        else if (cls === 'SCRIBBLE') {      /* the lines that count crossings are only true of a scribble that has some */
          main = o.firstScribble ? B['m.scribble'][2] : bank('m.scribble');
          if (m.crossings < 6 && /%CROSS%/.test(main)) main = bank('m.scribble');
          if (m.crossings < 6 && /%CROSS%/.test(main)) main = B['m.scribble'][0];
        }
        else if (cls === 'DOT') main = dotStreak >= 3 ? B['m.dot'][2] : bank('m.dot');
        else if (cls === 'LINE') main = B['m.line'][0];
        else if (cls === 'SQUARE') main = B['m.square'][0];
        else if (cls === 'FIG8') main = B['m.fig8'][0];
        else if (o.src === 'auto') main = bank('m.auto');
        else if (mode !== 'normal') main = B['m.hole.' + holeRel(m)][0];
        else main = bank('m.verdict');
        says.push({ t: main, mood: mood, pr: 1 });
        if (jamNow) says.push({ t: B['jam.m'][0], mood: 'smug', pr: 0 });
        if (toast) says.push({ t: fl('metToaster') ? B['toast.met'][0] : bank('toast.m'), mood: 'confused', pr: 1 });
        if (mode !== 'normal' && cls !== 'DOT' && !o.foul && (cls === 'SCRIBBLE' || o.src === 'auto')) says.push({ t: B['m.hole.' + holeRel(m)][0], mood: 'smug', pr: 0 });
        let foot = o.audit && api.chance(0.7) ? bank('aud.foot') : bank('m.foot');
        const decNew = D > lastD ? B['m.decimal'][D - 3] : '';
        if (decNew) { foot = decNew; lastD = D; }
        if (toast) foot = 'Official Score includes the Toaster, rounded down to the nearest toast.';
        let second = '';
        let plagWho = null;
        if (o.copy) {
          S.inc('draw-a-circle.plagiarism');
          bagEl.classList.add('m-draw-a-circle-open'); show(bagEl, true);
          api.setTimeout(function () { bagEl.classList.remove('m-draw-a-circle-open'); }, 4000);
          if (plagStreak === 2) { crit[0] = B['q.bodyofwork'][0]; crit[1] = B['b.oeuvre'][0]; crit[2] = B['h.menu'][0]; second = B['plag.three'][0]; plagWho = true; }
          else { second = bank('plag.accuse'); if (api.chance(0.6)) crit[2] = B['plag.hob'][0]; }
        }
        if (!second && B['m.milestone'][N]) second = B['m.milestone'][N];
        if (!second && N === 1) second = bank('m.first');
        if (!second && decNew) second = decNew;
        if (!second && N % 3 === 0) second = bank('m.consensus');
        if (!second && api.meh() >= 250 && N - lastSandra >= 10) { second = B['m.sandrameh'][0]; lastSandra = N; }
        if (second) says.push({ t: second, mood: plagWho ? 'proud' : 'neutral', pr: 1 });
        if (o.orderChanged && ordersOn) says.push({ t: B['so.orders'][orderIdx], mood: 'smug', pr: 0 });
        if ((mode === 'returning' || sincere) && api.chance(1 / 6)) {
          crit[0] = 'We missed you.'; crit[1] = 'We missed you.'; crit[2] = 'We missed you.';
          says.push({ t: 'We missed you.', who: NAMES[api.pick(JK)], mood: 'proud', pr: 0 }, { t: 'Circle, please.', who: NAMES.q, mood: 'neutral', pr: 0 });
        }
        if (mode === 'returning' && api.chance(0.3)) says.push({ t: fill(bank('returning.mgmt'), { N: String(Math.max(1, retRound)) }), mood: 'proud', pr: 0 });
        const stampTxt = o.foul ? 'TECHNICAL FOUL' : ['PROVISIONAL', 'PROVISIONAL (STILL)', 'PROVISIONAL (FOR NOW, FOREVER)'][Math.min(2, Math.floor(N / 8))];
        const v = { kind: 'normal', toast: toast, m: m, c: c, N: N, cells: [fx(Q, D) + '%', fx(Bs, D) + '%', toast ? '🍞' : fx(H, D) + '%'], vars: ['', '', toast ? 'm-draw-a-circle-bag' : ''], off: fx(off, D) + '%', stamp: stampTxt, foot: foot,
          crit: crit, ov: overlayOf(m, hf), says: says, mood: mood,
          sr: 'Quince ' + fx(Q, D) + '%, Brume ' + fx(Bs, D) + '%, ' + (toast ? 'the Toaster, sitting in for Hob, said toast' : 'Hob ' + fx(H, D) + '%') + '. Official ' + fx(off, D) + '%, provisional.',
          after: function () {
            if (clap) dennisClap();
            if (toast) { api.achieve('draw-a-circle.toaster'); setFlag('metToaster'); sfx('pop'); }
            if (o.foul) { S.inc('draw-a-circle.fouls'); api.achieve('draw-a-circle.foul'); sfx('buzz'); }
            if (cls === 'SCRIBBLE') { if (m.crossings >= 6) api.achieve('draw-a-circle.bold'); sfx(o.firstScribble ? 'fanfare' : 'tada'); JK.forEach(function (j) { restart(seats[j].seat, 'm-draw-a-circle-stand'); }); }
            if (cls === 'SQUARE') api.achieve('draw-a-circle.square');
            if (cls === 'DOT') { if (dotStreak >= 3) api.achieve('draw-a-circle.radiuszero'); if (!dennisEl.classList.contains('m-draw-a-circle-hide')) { dennisEl.classList.add('m-draw-a-circle-lean'); api.setTimeout(function () { dennisEl.classList.remove('m-draw-a-circle-lean'); }, 3000); } }
            if (plagWho) api.achieve('draw-a-circle.plagiarist');
            if (isRetired()) api.achieve('draw-a-circle.retired');
          } };
        return v;
      }
      function dqVerdict(m, o) {
        const N = nSub, D = decimals(), c = ctxFor(m, N, D, 0, 0, 0, 0, o);
        c.Q = c.B = c.H = c.OFF = 'DQ'; unan++; c.UN = String(unan); dqSeen = true; sv.impounded++;
        S.inc('draw-a-circle.consensusEvents');
        api.achieve('draw-a-circle.perfect');
        /* the Template Ring is free and instant: the full 12 Meh is paid once per half minute, otherwise it would be a Meh pump */
        const full = lastDqPay < 0 || api.now() - lastDqPay > 30000;
        if (full) lastDqPay = api.now();
        const paid = api.award(full ? 12 : 1, 'cooperation payment');
        sv.evidence.push(pack24(m)); if (sv.evidence.length > 6) sv.evidence.shift();
        paintBag();
        let dqLine = o.src === 'template' ? B['m.dq'][7] : bank('m.dq');
        if (!full && /12 Meh/.test(dqLine)) dqLine = B['m.dq'][5];
        const says = [{ t: dqLine, mood: 'panic', pr: 1 }, { t: bank('m.unanimous'), mood: 'confused', pr: 1 }];
        const crit = JK.map(function (j) { return fill(bank(j + '.PERFECT'), c); });
        let body = false;
        if (o.copy) {                                  /* the Template Ring pressed again is the easiest way to plagiarise yourself */
          S.inc('draw-a-circle.plagiarism');
          if (plagStreak === 2) { body = true; crit[0] = B['q.bodyofwork'][0]; crit[1] = B['b.oeuvre'][0]; crit[2] = B['h.menu'][0]; says.splice(1, 1, { t: B['plag.three'][0], mood: 'proud', pr: 1 }); }
          else says.splice(1, 1, { t: bank('plag.accuse'), mood: 'confused', pr: 1 });
        }
        return { kind: 'dq', m: m, c: c, N: N, cells: ['DQ', 'DQ', 'DQ'], vars: ['m-draw-a-circle-dq', 'm-draw-a-circle-dq', 'm-draw-a-circle-dq'], off: 'DQ', stamp: 'SUSPICIOUSLY PERFECT', foot: paid > 0 ? (full ? 'Cooperation payment: 12 Meh. Unrelated to anything.' : 'Cooperation payment: 1 Meh. Sandra has noticed the frequency.') : bank('m.foot'),
          crit: crit, ov: overlayOf(m, 0.5), says: says, mood: 'panic', sr: 'All three judges disqualify the circle for being suspiciously perfect.', after: function () { sfx('error'); if (body) api.achieve('draw-a-circle.plagiarist'); } };
      }
      function sockVerdict(m, o) {
        sockSeen = true;
        take('sock'); unan++;
        S.inc('draw-a-circle.consensusEvents');
        const N = nSub, c = ctxFor(m, N, 2, 100, 100, 100, 100, o);
        return { kind: 'sock', m: m, c: c, N: N, cells: ['100.00%', '100.00%', '100.00%'], vars: ['m-draw-a-circle-ok', 'm-draw-a-circle-ok', 'm-draw-a-circle-ok'], off: '100.00%', stamp: 'REVOKED', foot: '',
          crit: ['', '', ''], ov: null, says: [{ t: fl('sockSeen') ? B['sock.again'][0] : B['sock.lines'][1], mood: 'confused', pr: 2 }], mood: 'confused', sr: 'The Missing Sock has been sighted. All three judges give 100.00 percent. The scores are revoked.', after: function () {} };
      }
      /* ---- the reveal timeline ---- */
      function showOfficial(v) {
        if (v.kind === 'sock') { scoreEl.textContent = v.off; return; }
        if (reduced || v.kind === 'dq') scoreEl.textContent = v.off;
        else {
          const tgt = parseFloat(v.off);
          /* showOfficial already runs at the 2400 ms mark: the count-up steps are relative to now */
          [1, 2, 3, 4, 5].forEach(function (k) { vlater(70 * k, function () { scoreEl.textContent = fx(tgt * k / 5, v.m && v.N ? decimals() : 2) + '%'; }); });
          vlater(70 * 6, function () { scoreEl.textContent = v.off; });
        }
        if (v.kind !== 'sock') { stampEl.textContent = v.stamp; restart(stampEl, 'm-draw-a-circle-on'); sfx('stamp'); footEl.textContent = v.foot; }
      }
      function maybeGerald() {
        if (beatMax < 8 || geraldCount >= 2 || busy || geraldOn || !api.chance(0.3)) return false;
        geraldCount++; geraldOn = true; geraldMsg.textContent = '';
        gerald.classList.add('m-draw-a-circle-in');
        if (geraldT) api.clearTimeout(geraldT);
        geraldT = api.setTimeout(function () { geraldT = 0; hideGerald(); }, 7500);
        return true;
      }
      function reveal(v) { cancelVerdict(); revealing = true; stageV = v; vctx = v.c || vctx; lastMur = api.now() + 6000; resetPads(); scoreEl.textContent = '--.--'; stampEl.classList.remove('m-draw-a-circle-on'); footEl.textContent = ''; JK.forEach(function (j) { crits[j].textContent = ''; crits[j].classList.remove('m-draw-a-circle-more'); });
        inkColor = jamNow ? JAM : CORAL; ov = v.ov || null; ovT = { ticks: 0, glow: 0, gap: 0, ring: 0 }; dirty = true; kick(); setCap('The panel confers.'); if (v.kind === 'normal' || v.kind === 'dq') newSnack();
        if (beatMax >= 8) vlater(400, function () { sfx('tick'); }); else [0, 1, 2].forEach(function (k) { vlater(400 + 120 * k, function () { sfx('tick'); }); }); const wantGerald = v.kind === 'normal' && !v.toast && maybeGerald(); const met = api.flag.get('metGerald') === true; if (v.kind === 'dq') { vlater(900, function () {
            JK.forEach(function (j) { flipPad(j, 'DQ', 'm-draw-a-circle-dq'); }); setFaces('dq'); show(siren, true); restart(bench, 'm-draw-a-circle-shake'); sfx('error'); api.setTimeout(function () { sfx('blip'); }, 120); meter.classList.add('m-draw-a-circle-gdq'); mcap.textContent = '100.0%'; markOv('ticks'); });
          vlater(1200, function () { JK.forEach(function (j, i) { typeInto(j, v.crit[i]); }); }); vlater(2100, function () { meter.classList.remove('m-draw-a-circle-gdq'); mcap.textContent = CAP.dq; show(siren, false); setFaces('normal'); }); } else if (v.kind === 'sock') {
          wrap.classList.add('m-draw-a-circle-flicker', 'm-draw-a-circle-sockgo'); sfx('whoosh'); say(B['sock.lines'][0], { mood: 'confused', priority: 2 }); vlater(900, function () { flipPad('q', v.cells[0], v.vars[0]); markOv('ring'); });
          vlater(1350, function () { flipPad('b', v.cells[1], v.vars[1]); }); vlater(1800, function () { flipPad('h', v.cells[2], v.vars[2]); }); vlater(2400, function () { scoreEl.textContent = v.off; }); chain([ [800, function () { wrap.classList.remove('m-draw-a-circle-flicker'); }], [3600 * TS, function () {
              stampEl.textContent = 'REVOKED'; restart(stampEl, 'm-draw-a-circle-on'); sfx('stamp'); wrap.classList.remove('m-draw-a-circle-sockgo'); resetPads(); scoreEl.textContent = '--.--'; sfx('honk'); api.toast('Missing Sock Sighting 1 of 1 (Unofficial)');
              api.award(25, 'Missing Sock'); api.achieve('draw-a-circle.sock'); S.inc('draw-a-circle.socks'); setFlag('sockSeen'); say(B['sock.lines'][2], { mood: 'proud', priority: 2 }); release('sock'); paintRoom(); }] ]); } else {
          vlater(900, function () { flipPad('q', v.cells[0], v.vars[0]); typeInto('q', v.crit[0]); markOv('ticks'); });
          vlater(1350, function () { flipPad('b', v.cells[1], v.vars[1]); typeInto('b', v.crit[1]); markOv('glow'); if (v.m.cls === 'SQUARE') sfx('tada'); }); vlater(1800, function () { flipPad('h', v.cells[2], v.vars[2]); typeInto('h', v.crit[2]); markOv('ring'); }); }
        if (v.kind !== 'sock') vlater(2400, function () { showOfficial(v); });
        /* on a phone the quotes and the Official Score sit below the canvas: once the quotes have typed, bring them into view (clear of the Management panel) */
        if (v.kind !== 'sock') vlater(3000, function () { if (fin(window.innerWidth, 1000) < 560) { try { offEl.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' }); } catch (e) { /* the verdict is still on the pads */ } } }); vlater(2800, function () { srLive.textContent = v.sr; runAfter(v); v.says.forEach(function (s, i) { if (i === 0) say(s.t, { mood: s.mood, priority: s.pr, who: s.who }, v.c);
            else vlater(2800 + 2300 * i, function () { say(s.t, { mood: s.mood, priority: s.pr, who: s.who }, v.c); }); }); }); if (wantGerald) vlater(2400, function () { geraldMsg.textContent = met ? 'Potato' : 'abstains'; say(met ? B['g.met'][0] : bank('g.abstain'), { who: 'Gerald', mood: 'neutral', priority: 1 });
          if (!met) api.flag.set('metGerald', true); }); if (v.kind === 'normal' && v.crit[0] && !v.says.some(function (s) { return s.who; })) { vlater(3900, function () { const i = api.randInt(0, 2); say(v.crit[i], { who: NAMES[JK[i]], mood: v.mood, priority: 0 }, v.c); });
          if (beatMax >= 3 && api.chance(0.35)) vlater(5600, function () { const j = api.pick(JK); say(bank('i.' + j), { who: NAMES[j], mood: 'neutral', priority: 0 }, v.c); }); } vlater(v.kind === 'sock' ? 4300 : 4600, function () { if (replayWanted(v)) startReplay(v); else finishReveal(); }); }
      function finishReveal() {
        revealing = false; restoreCap(); paintRoom(); syncBeats();
        if (jamNow && stage === 'judged') jamLick();
        else if (jamAt && et() >= jamAt && mode === 'normal' && !jamOn && idleOk()) startJam();
      }
      /* ---- Hob's jam: one circle, drawn in jam, scored in jam, then licked off ---- */
      function startJam() {
        jamAt = 0; jamOn = true; S.inc('draw-a-circle.jams'); sfx('pop');
        seats.h.snack.textContent = '🍯'; seats.h.snack.setAttribute('aria-label', 'Hob is holding a jar of jam'); seats.h.snack.title = 'a jar of jam'; restart(seats.h.snack, 'm-draw-a-circle-bump');
        typeInto('h', 'Looks like something I would put jam on. So I brought jam.');
        say(B['jam.say'][0], { mood: 'confused', priority: 1 });
        api.setTimeout(function () { say(B['jam.say'][1], { mood: 'smug', priority: 0 }); }, Math.round(4200 * TS));
      }
      function jamLick() {
        say(B['jam.lick'][0], { mood: 'confused', priority: 1 }); sfx('pop'); newCanvas(); setCap('Hob has licked the canvas.');
        api.setTimeout(function () { if (stage === 'empty' && !revealing && !busy && cap.textContent === 'Hob has licked the canvas.') restoreCap(); }, Math.round(3000 * TS));
      }
      /* ---- the Slow-Motion Replay: the player's own stroke, narrated like sport ---- */
      function replayWanted(v) {
        if (v.kind !== 'normal' || mode !== 'normal' || v.toast || busy || stage !== 'judged' || pts.length < 12 || !v.m || v.m.cls === 'DOT' || v.m.cls === 'TINY') return false;
        if (v.m.cls === 'SCRIBBLE' && !replayedScribble) return true;
        return nSub > 4 && api.chance(api.selftest ? 0.3 : 1 / 6);
      }
      function startReplay(v) {
        const m = v.m, n = pts.length, base = pts[0].t, span = Math.max(1, pts[n - 1].t - base), hes = (m.hes || []).slice().sort(function (a, b) { return a.s - b.s; })[0] || null;
        const tgt = hes || (v.ov && v.ov.ticks && v.ov.ticks[0]) || null;
        let pi = Math.floor(n * 0.6), bd = 1e9;
        if (tgt) for (let i = 0; i < n; i++) { const d = Math.hypot(pts[i].x - tgt.x, pts[i].y - tgt.y); if (d < bd) { bd = d; pi = i; } }
        pi = clamp(pi, 3, n - 4);
        if (m.cls === 'SCRIBBLE') replayedScribble = true;
        rp = { k: 2, start: api.now(), rate: Math.max(0.25, span / (3600 * TS)), stop: pi + 1, phase: 'pre', pi: pi, hes: !!hes, T: (pts[pi].t - base) / 1000, ring: false };
        setCap('Slow-motion replay (0.25x, give or take).'); S.inc('draw-a-circle.replays'); sfx('whoosh'); dirty = true; kick();
      }
      function stepReplay(now) {
        if (!rp || rp.phase === 'hold') return;
        const e = (now - rp.start) * rp.rate, base = pts[0].t;
        let k = rp.k;
        while (k < pts.length && k < rp.stop && pts[k].t - base <= e) k++;
        rp.k = k;
        if (k >= rp.stop) { if (rp.phase === 'pre') replayHold(); else { stopReplay(); finishReveal(); } }
      }
      function replayHold() {
        rp.phase = 'hold'; rp.ring = true; sfx('tick');
        setCap('Dr. Quince: ' + fill(B['rp.q'][rp.hes ? 0 : 1], { T: fx(rp.T, 1) }));
        vlater(1500, function () { setCap('Lady Brume: ' + B['rp.b'][0]); });
        vlater(3000, function () { setCap('Hob: ' + B['rp.h'][0]); });
        vlater(3700, function () {      /* a hard cut to the snack, held for two seconds */
          while (cutEl.firstChild) cutEl.removeChild(cutEl.firstChild);
          cutEl.appendChild(el('span', { text: curSnack[0] })); cutEl.appendChild(el('small', { text: 'Exhibit S: ' + curSnack[1] })); show(cutEl, true); sfx('pop');
        });
        vlater(5700, function () {
          show(cutEl, false);
          if (!rp) return;
          rp.ring = false; rp.phase = 'post'; rp.stop = pts.length; rp.start = api.now() - (pts[Math.max(0, rp.k - 1)].t - pts[0].t) / rp.rate;
          setCap('The replay resumes. The snack has been logged.'); dirty = true; kick();
        });
      }
      function stopReplay() {
        if (!rp) return;
        rp = null; show(cutEl, false); restoreCap(); dirty = true;
      }
      function restoreCap() { setCap('Please draw a circle. Do not draw a circle that is a different shape.'); }
      /* ---- the conceptual circle ---- */
      function concept() { if (busy) return; conceptN++; sfx('pop'); if (conceptN < 3) { say(B['m.concept.press'][conceptN - 1], { mood: 'confused', priority: 1 }); return; } conceptN = 0; S.inc('draw-a-circle.conceptual'); const already = sv.conceptual; stage = 'judged'; stageV = null; wrap.classList.add('m-draw-a-circle-concept');
        const v = { kind: 'concept', m: { cls: 'CONCEPT' }, c: {}, N: nSub, cells: ['100.00%', '100.00%', '100.00%'], vars: ['m-draw-a-circle-ok', 'm-draw-a-circle-ok', 'm-draw-a-circle-ok'], off: '100.00%', stamp: 'ACQUIRED', foot: already ? 'Previously acquired.' : 'Acquired. Once per save.',
          crit: [B['concept.q'][0], B['concept.b'][0], B['concept.h'][0]], ov: null, says: [], mood: 'proud', sr: 'The empty canvas has been acquired as a conceptual circle.' }; reveal(v);
        if (!already) { api.achieve('draw-a-circle.conceptual'); sv.conceptual = true; persist(); }     /* not tied to the reveal timer: the player may move on early */ vlater(2800, function () { if (already) say(B['m.concept.repeat'][0], { mood: 'smug', priority: 1 });
          else { say(B['m.concept.press'][2], { mood: 'proud', priority: 1 }); sfx('tada'); } }); }
      /* ---- Bagel Moment ---- */
      function bagelMoment(m) { if (!take('bagel')) return; closePaper(); cancelVerdict(); sfxOn = false; spotOn = true; wrap.classList.add('m-draw-a-circle-spot'); resetPads(); stageV = null; scoreEl.textContent = '--.--'; stampEl.classList.remove('m-draw-a-circle-on'); footEl.textContent = ''; setCap('The room has gone quiet.');
        say(B['m.bagel'][0], { mood: 'confused', priority: 2 }); chain([ [2200, function () { seats.h.seat.classList.add('m-draw-a-circle-stand', 'm-draw-a-circle-fell'); seats.h.snack.style.opacity = '0'; say(B['m.bagel'][1], { mood: 'confused', priority: 2 }); }],
          [5000, function () { typeInto('h', B['h.bagelline'][0]); say(B['h.bagelline'][0], { who: NAMES.h, mood: 'proud', priority: 2 }); }],
          [6500, function () { JK.forEach(function (j) { restart(seats[j].pad, 'm-draw-a-circle-flip'); setPad(j, '🥯', 'm-draw-a-circle-bag'); }); meterHold = CAP.bagel; mcap.textContent = CAP.bagel; setCap('Hob has said the word.'); }], [7800, function () {
            sfxOn = true; api.confetti(); sfx('fanfare'); api.toast('Bagel Index: 1 (Unofficial)'); api.award(30, 'Bagel'); api.achieve('draw-a-circle.bagel'); S.inc('draw-a-circle.bagels'); sv.bagels++; api.flag.set('draw-a-circle.bagelSeen', true); api.flag.set('draw-a-circle.hobStoodUp', true); }],
          [9500, function () { say(B['m.bagel'][2], { mood: 'proud', priority: 2 }); }], [11500, function () { say(B['m.bagel'][3], { mood: 'proud', priority: 1 }); }], [13000, function () { mode = 'protocol'; tender = 70; protoCount = 0; meterHold = ''; spotOn = false; snackBag = [];
            wrap.classList.remove('m-draw-a-circle-spot'); seats.h.seat.classList.remove('m-draw-a-circle-stand'); seats.h.snack.style.opacity = '1'; resetPads(); restoreCap(); newSnack(); paintRoom(); persist(); release('bagel'); say(B['m.protocol'][0], { mood: 'proud', priority: 2 }); }],
          [15500, function () { say(B['m.protocol'][1], { mood: 'confused', priority: 1 }); }], [18000, function () { say(B['m.protocol'][2], { mood: 'neutral', priority: 0 }); }], [20500, function () { say(B['m.protocol'][3], { mood: 'neutral', priority: 0 }); }] ]); }
      /* ---- the Closing Ceremony ---- */
      function ceremony() { if (mode !== 'protocol' || protoCount < 3) return; if (!take('ceremony')) return; lastAct = api.now(); closePaper(); newCanvas(); const C = api.selftest ? 0.1 : 1, at = function (s) { return s * 1000 * C; }; const cer = B.ceremony, name = api.player.name; show(bConclude, false);
        say(cer[0], { mood: 'proud', priority: 2 }); chain([ [at(2), function () { JK.forEach(function (j) { seats[j].seat.classList.add('m-draw-a-circle-stand'); }); }], [at(4), function () { say(cer[4], { mood: 'proud', priority: 2 }); }], [at(8), function () {
            if (api.flag.get('metGerald') === true) { gerald.classList.add('m-draw-a-circle-in'); geraldMsg.textContent = 'eulogy'; say(B['g.eulogy'][0], { who: 'Gerald', mood: 'neutral', priority: 2 }); } else say(cer[8], { mood: 'neutral', priority: 2 }); }], [at(11), function () { hideGerald(); }],
          [at(14), function () { meter.style.borderColor = '#F2B63B'; meter.style.background = '#FFF1C9'; mcap.textContent = '0.0% (gold ribbon)'; S.inc('draw-a-circle.consensusEvents'); sfx('ding'); say(cer[14], { mood: 'proud', priority: 2 }); }],
          [at(20), function () { bagEl.classList.add('m-draw-a-circle-open'); show(bagEl, true); say(cer[20], { mood: 'confused', priority: 2 }); }], [at(26), function () { show(dennisEl, true); restart(dennisEl, 'm-draw-a-circle-lean'); say(cer[26], { mood: 'proud', priority: 2 }); }],
          [at(30), function () { openPaper('cert', [el('div', { class: 'm-draw-a-circle-cert', style: 'padding:14px' }, el('h3', { text: 'CERTIFICATE' }), el('p', { text: 'THIS CERTIFIES THAT ' + String(name).toUpperCase() + ' HAS DRAWN A CIRCLE. THE CIRCLE IS ON FILE. THE FILE IS A CIRCLE.' }))], 12000 * C); sfx('stamp'); }],
          [at(34), function () { say(cer[34], { mood: 'proud', priority: 2 }); }], [at(36), function () { sv.pantry++; show(pantryEl, true); paintRoom(); api.confetti(); sfx('bell'); say(cer[36], { mood: 'proud', priority: 2 }); }], [at(40), function () {
            closePaper(); bagEl.classList.remove('m-draw-a-circle-open'); meter.style.borderColor = ''; meter.style.background = ''; JK.forEach(function (j) { seats[j].seat.classList.remove('m-draw-a-circle-stand'); typeInto(j, 'Shall we begin?'); }); mode = 'returning'; retRound = 1; ceremonies++; sv.ceremonies++; snackBag = [];
            S.inc('draw-a-circle.ceremonies'); api.achieve('draw-a-circle.ceremony'); api.achieve('draw-a-circle.retired'); api.confetti(); sfx('fanfare'); api.toast('Proceedings concluded. Proceedings continue.'); newCanvas(); newSnack(); paintRoom(); persist(); release('ceremony'); say(cer[40], { mood: 'proud', priority: 2 });
            say(bank('returning.mgmt'), { mood: 'proud', priority: 1 }, { N: String(retRound) }); }] ]); }
      /* ---------------------------------------------------------------- paper layer, appeals, reverse tribunal, gallery */
      let revOpen = false, revBtns = {}, busySince = 0;
      function openPaper(kind, nodes, ttl) {
        if (paperKind === 'rev' && kind !== 'rev') finishReverse(false);
        if (!paper) { paper = el('div', { class: 'm-draw-a-circle-paper m-draw-a-circle-hide', role: 'dialog', 'aria-label': 'Paperwork', tabindex: '-1' }); wrap.appendChild(paper); api.on(paper, 'keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePaper(); } }); }
        while (paper.firstChild) paper.removeChild(paper.firstChild);
        nodes.forEach(function (n) { paper.appendChild(n); });
        paper.classList.remove('m-draw-a-circle-char');
        paper.style.top = Math.max(60, stage_.offsetTop + 24) + 'px';
        paperKind = kind; show(paper, true);
        try { paper.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' }); } catch (_) { /* the paper is there regardless */ }
        try { (paper.querySelector('button,input') || paper).focus({ preventScroll: true }); } catch (_) { /* no focus */ }
        if (paperT) api.clearTimeout(paperT);
        paperT = api.setTimeout(function () { paperT = 0; closePaper(); }, Math.max(1500, ttl || 30000));
      }
      function closePaper() {
        const k = paperKind;
        paperKind = '';
        if (paperT) { api.clearTimeout(paperT); paperT = 0; }
        if (paper && paper.contains(document.activeElement)) { try { cv.focus({ preventScroll: true }); } catch (_) { /* no focus */ } }      /* focus must not fall to the page */
        if (paper) show(paper, false);
        if (k === 'rev') finishReverse(false);
      }
      function fee() { const paid = api.award(-5, 'Appeal fee'); if (paid < 0) api.award(-paid, 'Appeal refund (net 0)'); }
      function checks(labels) { return labels.map(function (t) { return el('label', null, el('input', { type: 'checkbox' }), el('span', { text: t })); }); }
      function form(title, labels, extra, onFile, charred) { const file = el('button', { type: 'button', class: 'm-draw-a-circle-btn m-draw-a-circle-go', text: 'File Appeal', onclick: function () { closePaper(); onFile(); } });
        const close = el('button', { type: 'button', class: 'm-draw-a-circle-btn', text: 'Withdraw', onclick: function () { closePaper(); } }); openPaper('appeal', [el('h3', { text: title })].concat(extra || [], checks(labels), [el('div', { class: 'm-draw-a-circle-row' }, file, close)]), 30000);
        paper.classList.toggle('m-draw-a-circle-char', !!charred); sfx('pop'); } function stapler() { if (!demandBag.length) demandBag = api.shuffle(B['ap.demands']); appealLab.textContent = 'Appeal (The Stapler)';
        if (!appealStapler++) { if (fl('metStapler')) say(B['ap.stapler.met'][0], { mood: 'smug', priority: 1 }); setFlag('metStapler'); } say(bank('ap.stapler'), { mood: 'smug', priority: 1 }, { DEMAND: demandBag.pop() }); sfx('stamp'); } function appeal() { lastAct = api.now();
        if (busy === 'reverse' || busy === 'ceremony' || busy === 'bagel') { sfx('buzz'); return; } appeals++; S.inc('draw-a-circle.appeals'); newSt.classList.add('m-draw-a-circle-hide'); if (appeals >= 4) api.achieve('draw-a-circle.appeal');
        if (mode !== 'normal') { if (api.chance(0.6)) say(bank('ap.bagel'), { mood: 'smug', priority: 1 }); else stapler(); fee(); return; } if (appeals >= 6) { stapler(); fee(); return; } if (appeals === 1) { form('Form 27B/6: Appeal of a Circle', GROUNDS[(appeals - 1) % 3], [], function () {
            fee(); say(bank('ap.logged'), { mood: 'neutral', priority: 1 }); api.setTimeout(function () { say(bank('ap.denied'), { mood: 'smug', priority: 1 }); sfx('stamp'); }, 1200); }); } else if (appeals === 2) {
          form('Form 27B/7', ['I accept that this form does not exist'], [el('span', { class: 'm-draw-a-circle-stamp2', text: 'DESTROYED 1998' })], function () { fee(); say(bank('ap.destroyed'), { mood: 'confused', priority: 1 }); }, true); } else if (appeals === 3) {
          form('Form 27B/7(a): Request for Form 27B/7', ['I request the form', 'I request the request'], [], function () { fee(); say(bank('ap.request'), { mood: 'confused', priority: 1 }); }); } else { appealLab.textContent = 'Appeals Office (At Lunch)';
          show(lunch, true); lunch.style.left = '4px'; lunch.style.transition = 'left .25s steps(1)'; chain([[250, function () { lunch.style.left = '40%'; }], [500, function () { lunch.style.left = '78%'; }], [900, function () { show(lunch, false); }]]); say(bank('ap.lunch'), { mood: 'neutral', priority: 1 }); fee(); sfx('pop'); } }
      function intermission() { lastAct = api.now(); if (verdictsSinceInter < 2) return; hobWeird = true; verdictsSinceInter = 0; bInter.disabled = true; newSnack(); sfx('pop'); say(bank('m.intermission'), { mood: 'smug', priority: 1 }); }
      function idleOk() { return !busy && !drawing && !penDown && stage !== 'drawing' && stage !== 'waiver' && !revealing && !autoRun; } function reverse(repeat) { if (!take('reverse')) return; revOpen = true; closePaper(); cancelVerdict(); S.inc('draw-a-circle.idle');
        say(repeat ? B['m.idle'][5] : B['m.idle'][0], { mood: 'confused', priority: 2 }); JK.forEach(function (j, i) { api.setTimeout(function () { seats[j].sleeping = true; seats[j].face.textContent = '😴'; show(seats[j].zzz, true); sfx('whoosh'); typeInto(j, bank('z.' + j)); }, 900 * i + 200); }); chain([
          [2800, function () { seats.h.snack.style.transform = 'translateY(54px) rotate(40deg)'; seats.h.snack.style.opacity = '0.3'; say(B['m.idle'][1], { mood: 'neutral', priority: 1 }); }], [5200, function () { say(B['m.idle'][2], { mood: 'smug', priority: 2 }); openReverse(); }] ]); } function openReverse() { if (!revOpen) return;
        const rated = { q: 0, b: 0, h: 0 }; revBtns = {}; const rows = JK.map(function (j, k) { const stars = []; for (let s = 1; s <= 10; s++) stars.push(el('button', { type: 'button', class: 'm-draw-a-circle-star', 'aria-label': 'Score ' + s + ' out of 10 for ' + NAMES[j], text: String(s), onclick: function () {
              lastAct = api.now(); rated[j] = s; sfx('ding'); revBtns[j].forEach(function (b, i) { b.classList.toggle('m-draw-a-circle-lit', i < s); }); if (rated.q && rated.b && rated.h) finishReverse(true); } })); revBtns[j] = stars;
          return el('div', { class: 'm-draw-a-circle-rev' }, el('svg', { viewBox: '0 0 56 56', 'aria-hidden': 'true' }, el('polyline', { points: ringPoints(seed, k), fill: 'none', stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' })),
            el('div', { style: 'flex:1;min-width:0' }, el('div', { style: 'font-size:.78rem;font-weight:800', text: NAMES[j] + ' (circle ' + (k + 1) + ')' }), el('div', { style: 'display:flex;gap:3px;flex-wrap:wrap', role: 'group', 'aria-label': 'Stars for ' + NAMES[j] }, stars))); });
        openPaper('rev', [el('h3', { text: 'The judges would like YOU to score THEIR circles.' })].concat(rows, [el('div', { class: 'm-draw-a-circle-row' }, el('button', { type: 'button', class: 'm-draw-a-circle-btn', text: 'Skip', onclick: function () { finishReverse(false); } }))]), api.selftest ? 8000 : 40000); }
      function finishReverse(done) { if (!revOpen) return; revOpen = false; closePaper(); if (done) { JK.forEach(function (j) { const r = lastReply[j] === 'afraid' ? 'hoped' : 'afraid'; lastReply[j] = r; typeInto(j, bank('idle.' + r)); }); api.award(8, 'Reverse Tribunal'); api.achieve('draw-a-circle.reverse'); sfx('tada'); api.confetti();
          say(B['m.idle'][3], { mood: 'smug', priority: 2 }); say(B['m.idle'][4], { mood: 'proud', priority: 1 }); } api.setTimeout(function () { setFaces('normal'); seats.h.snack.style.transform = ''; seats.h.snack.style.opacity = '1';
          release('reverse'); lastAct = api.now(); idleReady2 = true; idleStage = 2; paintRoom();      /* still away five minutes from now: the judges nod off again */ }, done ? 3500 : 800); }
      function paintBag() {
        for (let i = 0; i < 6; i++) {
          const arr = sv.evidence[i];
          if (arr) { show(bagThumbs[i], true); drawThumb(bagThumbs[i], unpack(arr), CORAL); } else show(bagThumbs[i], false);
        }
        show(bagEl, sv.evidence.length > 0 || dqSeen);
      }
      function plaqueFor(g) { const names = B['plaque.names']; return fill(names[Math.abs(g.n) % names.length], { N: String(g.n) }); }
      function paintGallery() {
        for (let i = 0; i < 12; i++) {
          const g = sv.gallery[i], fr = galFrames[i];
          if (g) { show(fr.f, true); drawThumb(fr.c, unpack(g.p), INK); fr.plaque = plaqueFor(g); fr.f.setAttribute('aria-label', 'Framed circle. ' + fr.plaque + '. Press to hear it read aloud.'); fr.f.title = fr.plaque; }
          else show(fr.f, false);
        }
        show(galEmpty, sv.gallery.length === 0);
        if (sv.gallery.length > 0 || beatMax >= 6) show(galEl, true);
      }
      function readPlaque(i) {
        lastAct = api.now();
        const fr = galFrames[i];
        if (!fr || !fr.plaque) return;
        galleryRead++; sfx('pop');
        const j = JK[galleryRead % 3];
        say(B['plaque.read.' + j][0], { who: NAMES[j], mood: 'smug', priority: 1 }, { PLAQUE: fr.plaque });
      }
      /* ---------------------------------------------------------------- punch-up set pieces: the 3 minute rounding error, the 10 minute gavel, the interrupted verdict, Dennis applauds */
      function meterBlip() {
        if (blipDone) return; blipDone = true; S.inc('draw-a-circle.blips'); const hold = '0.1% (a rounding error has entered the room)';
        meterHold = hold; mcap.textContent = hold; meter.classList.add('m-draw-a-circle-blip'); sfx('blip'); api.achieve('draw-a-circle.rounding'); say(B['m.blip'][0], { mood: 'panic', priority: 2 }); JK.forEach(function (j) { typeInto(j, B['blip.' + j][0]); });
        api.setTimeout(function () { say(B['m.blip'][1], { mood: 'confused', priority: 1 }); }, 3200 * TS);
        api.setTimeout(function () { if (meterHold === hold) meterHold = ''; meter.classList.remove('m-draw-a-circle-blip'); if (!meter.classList.contains('m-draw-a-circle-gdq')) mcap.textContent = meterHold || meterCaption(); sfx('ding'); say(B['m.blip'][2], { mood: 'smug', priority: 1 }); }, 9000 * TS);
      }
      function gavel() {
        gavelDone = true; S.inc('draw-a-circle.gavels'); sfx('bell'); say(B['m.gavel'][0], { mood: 'confused', priority: 2 });
        let answered = false;
        api.setTimeout(function () { if (!answered) gavelDone = false; }, 100000);      /* a notice nobody answered is served again a minute later */
        const ans = function (k) {
          answered = true; closePaper(); api.award(5, 'Presiding Judge'); api.achieve('draw-a-circle.gavel'); sfx(k === 'acc' ? 'tada' : 'pop'); say(B['m.gavel'][k === 'acc' ? 1 : k === 'dec' ? 2 : 3], { mood: 'smug', priority: 2 }); JK.forEach(function (j, i) { typeInto(j, B['gavel.' + k][i]); });
          if (k === 'acc') { actingUntil = api.now() + 11000 * TS; paintRoom(); JK.forEach(function (j) { restart(seats[j].seat, 'm-draw-a-circle-stand'); }); api.setTimeout(function () { actingUntil = 0; paintRoom(); say(B['m.gavel'][4], { mood: 'proud', priority: 1 }); }, 11000 * TS); }
          if (fl('fax-machine.tuesdayMoved') || fl('tiny-bureaucracy.tuesday')) api.setTimeout(function () { say(B['m.gavel'][5], { mood: 'smug', priority: 0 }); }, 7000 * TS);
        };
        openPaper('gavel', [el('h3', { text: 'NOTICE OF UNEXPECTED PROMOTION' }), el('p', { text: 'You have been in this room for ten minutes. Under Standing Order 31(b), the longest-serving person present is the Presiding Judge. That is you. The previous Presiding Judge was the kettle, which has been informed, and is not boiling.' }),
          el('div', { class: 'm-draw-a-circle-row' }, btn('Accept the Gavel', 'm-draw-a-circle-btn m-draw-a-circle-go', function () { ans('acc'); }), btn('Decline the Gavel', 'm-draw-a-circle-btn', function () { ans('dec'); }), btn('Pass the Gavel to Hob', 'm-draw-a-circle-btn m-draw-a-circle-gold', function () { ans('pas'); })),
          el('p', { style: 'font-size:.7rem;opacity:.8', text: 'Fine print: ' + api.line('tosClause') })], 40000);
      }
      function interrupted() {
        interrupts++; S.inc('draw-a-circle.interrupts'); say(interrupts <= 5 ? B['m.int'][interrupts - 1] : bank('m.int.after'), { mood: interrupts === 5 ? 'proud' : 'confused', priority: interrupts === 5 ? 2 : 1 });
        if (interrupts === 5) { api.achieve('draw-a-circle.interrupter'); sfx('fanfare'); api.confetti(); }
      }
      function dennisClap() {
        clapped = true; S.inc('draw-a-circle.claps'); restart(dennisEl, 'm-draw-a-circle-clap'); sfx('pop'); api.achieve('draw-a-circle.clap'); setFlag('metDennis'); say(B['dennis.clap'][0], { mood: 'confused', priority: 1 });
        api.setTimeout(function () { say('Dennis update, courtesy of the Lobby: ' + api.line('plantStatus'), { mood: 'smug', priority: 0 }, false); }, 3200 * TS);
        if (fl('plantClicked')) api.setTimeout(function () { say(B['dennis.met'][0], { mood: 'proud', priority: 0 }); }, 7000 * TS);
      }
      /* ---------------------------------------------------------------- Season 2 set pieces */
      function paintAudit() { show(auditEl, auditOn); auditEl.textContent = 'AUDIT IN PROGRESS: ' + auditLeft + (auditLeft === 1 ? ' circle remains' : ' circles remain') + '. Please look natural.'; }
      function startAudit() { auditOn = true; auditDone = true; auditLeft = 3; paintAudit(); sfx('bell'); S.inc('draw-a-circle.audits'); say(bank('aud.start'), { mood: 'confused', priority: 2 }); } function endAudit() { auditOn = false; paintAudit(); api.award(2, 'Compliance Rebate'); api.achieve('draw-a-circle.audit');
        const ids = Object.keys(B.cb).filter(function (k) { return k === 'ascend' ? api.stat.get('ascensions') > 0 : api.stat.get(k + '.entered') > 0; }); const pick = ids.length ? api.pick(ids) : '';      /* a callback only for the departments this employee has actually visited */ api.setTimeout(function () {
          say(bank('aud.end'), { mood: 'proud', priority: 1 }); if (!pick) return; api.setTimeout(function () { say(B.cb[pick], { mood: 'smug', priority: 1 }); if (pick === 'toaster-debate') api.setTimeout(function () { say(bank('aud.toaster'), { who: 'The Toaster', mood: 'neutral', priority: 1 }); }, 2800); }, 2800);
        }, Math.round(6800 * TS)); } function nearTuesday() { if (tueSeen || !take('tuesday')) return; tueSeen = true; S.inc('draw-a-circle.tuesdays'); closePaper(); wrap.classList.add('m-draw-a-circle-tue'); setFaces('tue'); setCap('Nobody say anything.'); sfx('whoosh'); say(B.tue[0], { mood: 'panic', priority: 2 }); chain([
          [1500 * TS, function () { JK.forEach(function (j) { typeInto(j, B['tue.' + j][0]); }); }], [3400 * TS, function () { wrap.classList.remove('m-draw-a-circle-tue'); setFaces('normal'); sfx('ding'); api.award(7.5, 'Courage Payment'); api.achieve('draw-a-circle.tuesday'); api.toast('Tuesday Near-Sighting 1 of 1 (Unofficial)');
            say(api.pick(B.tue.slice(1, 4)), { mood: 'confused', priority: 1 }); }], [6000 * TS, function () { say(B.tue[4], { mood: 'proud', priority: 1 }); restoreCap(); release('tuesday'); paintRoom(); }] ]); } function dotClick() { lastAct = api.now(); idleReady2 = true; dotN++; S.inc('draw-a-circle.dotclicks');
        if (dotN < 7) { sfx('pop'); if (dotN === 4) dotLab.textContent = 'acting'; say(B['dot.click'][dotN - 1], { mood: dotN > 3 ? 'confused' : 'smug', priority: 1 }); return; } if (dotN > 7) { sfx('pop'); say(bank('dot.after'), { mood: 'smug', priority: 0 }); return; }
        dotLab.textContent = 'CDO'; wrap.classList.add('m-draw-a-circle-cdo'); sfx('fanfare'); api.confetti(); api.toast('The dot has been promoted (Unofficial)'); api.achieve('draw-a-circle.dot'); say(B['dot.promo'][0], { mood: 'proud', priority: 2 }); } function iSpy() { S.inc('draw-a-circle.spy'); const set = api.pick(B.spy);
        JK.forEach(function (j, i) { api.setTimeout(function () { if (!idleOk()) return; typeInto(j, set[i]); if (j === 'h') restart(seats.h.snack, 'm-draw-a-circle-bump'); }, 1300 * i); }); say(bank('spy.m'), { mood: 'confused', priority: 1 }); }
      /* ---------------------------------------------------------------- beats and the manager */
      function beatSpeak(b) {
        const mb = B['m.beat'];
        if (b === 2) say(mb[2], { mood: 'smug', priority: 1 });
        else if (b === 3) say(mb[3], { mood: 'confused', priority: 1 });
        else if (b === 4) say(mb[4], { mood: 'smug', priority: 1 });
        else if (b === 6) say(mb[6], { mood: 'proud', priority: 1 });
        else if (b === 7) { say(mb[7], { mood: 'confused', priority: 1 }); say(mb[71], { mood: 'proud', priority: 1 }); }
        else if (b === 8) { say(mb[8], { mood: 'confused', priority: 1 }); say(mb[81], { mood: 'neutral', priority: 1 }); say(mb[82], { mood: 'proud', priority: 0 }); }
      }
      function syncBeats() {
        const e = et();
        const want = e >= 390 ? 8 : e >= 300 ? 7 : e >= 240 ? 6 : e >= 180 ? 5 : e >= 120 ? 4 : e >= 60 ? 3 : e >= 30 ? 2 : 1;
        if (want > beatMax) {
          for (let b = beatMax + 1; b <= want; b++) { if (b === 5) startOrders(); else if (b === want) beatSpeak(b); }
          beatMax = want;
        }
        if (mode === 'normal' && !auditDone && e >= 210 && beatMax >= 5 && !busy && !revealing) startAudit();
        if (mode === 'normal' && !heartSaid && (e >= 68 || tender >= 25)) { heartSaid = true; say(B['m.heart'][0], { mood: 'smug', priority: 0 }); }
        show(bAppeal, beatMax >= 3); show(bTemplate, beatMax >= 4); show(bInter, beatMax >= 8);
        if (beatMax >= 6 || sv.gallery.length > 0) show(galEl, true);
        show(dennisEl, beatMax >= 7);
        if (mode === 'normal' && e >= 150 && !dqSeen && !beatSaid[41]) { beatSaid[41] = true; say(B['m.beat'][41], { mood: 'smug', priority: 1 }); }
        if (beatMax >= 7 && !beatSaid[72] && tender >= 25 && tender === floorCap(tone())[1]) { beatSaid[72] = true; say(B['m.beat'][72], { mood: 'neutral', priority: 0 }); }
        paintRoom();
      }
      function manage() {
        if (api.destroyed) return;
        const now = api.now();
        measure();
        if (busy && now - busySince > 90000) { busy = null; revOpen = false; spotOn = false; wrap.classList.remove('m-draw-a-circle-spot', 'm-draw-a-circle-quarantine', 'm-draw-a-circle-sockgo', 'm-draw-a-circle-tue'); sfxOn = true; setFaces('normal'); }
        if (drawing && now - lastEvt > 8000) liftPen();      /* a pointerup that never arrived; a slow, hesitant artist is allowed a long pause */
        const idleMs = now - lastAct, T1 = api.selftest ? 20000 : 60000, T2 = api.selftest ? 40000 : 300000;
        if (!spyDone && idleMs >= (api.selftest ? 9000 : 30000) && idleOk()) { spyDone = true; iSpy(); }
        if (stage === 'drawing' && (drawing || penDown) && !pausedSaid && pauseN < 4 && !busy && now - lastEvt > 4500) {
          pausedSaid = true; pauseN++; S.inc('draw-a-circle.pauses');
          const pj = api.pick(JK); say(bank('pause.' + pj), { who: NAMES[pj], mood: 'neutral', priority: 1 });
        }
        if (idleStage < 2 && idleOk() && idleMs >= T1 * (idleStage ? 0.75 : 0.33)) { say(B['m.wait'][idleStage], { mood: 'confused', priority: 1 }); idleStage++; }
        else if (idleStage >= 2 && idleStage < 4 && idleDone1 && idleMs >= T1 * (idleStage === 2 ? 2 : 3) && idleOk()) { say(B['m.wait'][idleStage], { mood: 'smug', priority: 1 }); idleStage++; }
        if (!gavelDone && et() >= 600 && idleOk()) gavel();
        if (!revealing && !busy && !autoRun && stage !== 'drawing' && stage !== 'waiver' && now - lastMur > 21000 && now - lastSayAt > 3000) { lastMur = now + api.rand() * 7000; const mj = api.pick(JK); typeInto(mj, bank('mur.' + mj + (tierN() >= 3 || mode !== 'normal' ? '.late' : ''))); }
        if (!idleDone1 && idleMs >= T1) { if (idleOk()) { idleDone1 = true; idleReady2 = false; reverse(false); } }
        else if (idleDone1 && idleReady2 && idleMs >= T2 && idleOk()) { idleReady2 = false; reverse(true); }
        if (!revealing && !busy) syncBeats();
        if (now - lastSayAt > cadence && !busy && !revealing) {
          if (mode === 'returning' && api.chance(0.3)) say(bank('returning.mgmt'), { mood: 'proud' }, { N: String(Math.max(1, retRound)) });
          else {
            let line = mode !== 'normal' && api.chance(0.6) ? bank('m.nothing.proto') : tierN() >= 3 && api.chance(0.5) ? bank('m.nothing.late') : bank('m.nothing');
            /* the room has moved on: do not announce a plant that is already seated, or a decorative dot that has been replaced by a hole */
            if ((beatMax >= 7 && /Dennis \(Plant\) is not in the room/.test(line)) || (mode !== 'normal' && /dot in the middle is decorative/.test(line))) line = bank('m.nothing');
            if (introQ.length && mode === 'normal') line = introQ.shift();      /* the cast list, as the first idle remarks */
            say(line, { mood: api.pick(['neutral', 'smug', 'confused', 'disappointed', 'proud']) });
          }
        }
      }
      function onResize() {
        measure();
        const w = fin(window.innerWidth, 800);
        if (w < 420 && !whispered) { whispered = true; if (!revealing) setCap('shh'); say(B['m.resize.whisper'][0], { mood: 'neutral', priority: 0 }); api.setTimeout(function () { if (!revealing && cap.textContent === 'shh') restoreCap(); }, 2500); }
        else if (w > 1300 && !shouted) { shouted = true; say(B['m.resize.shout'][0], { mood: 'panic', priority: 0 }); }
      }
      function isText(t) {
        if (!t || !t.tagName) return false;
        const n = String(t.tagName).toUpperCase();
        return n === 'TEXTAREA' || (n === 'INPUT' && /^(text|search|email|url|tel|password|number)$/i.test(t.type || 'text')) || t.isContentEditable === true;
      }
      /* ---------------------------------------------------------------- wiring */
      api.on(cv, 'pointerdown', onDown);
      api.on(cv, 'pointermove', onMove);
      api.on(cv, 'pointerup', onUp);
      api.on(cv, 'pointercancel', onUp);
      api.on(cv, 'lostpointercapture', onUp);
      api.on(window, 'pointerup', onUp);
      api.on(window, 'pointercancel', onUp);
      api.on(cv, 'contextmenu', function (e) { e.preventDefault(); });
      api.on(cv, 'keydown', onKey);
      api.on(cv, 'keyup', onKeyUp);
      api.on(cv, 'blur', function () { held = {}; mods.shift = false; mods.ctrl = false; });
      api.on(cv, 'focus', function () { showNib(!drawing); placeNib(); });
      api.on(document, 'keydown', function (e) { if ((e.key === 'g' || e.key === 'G') && !e.repeat && !e.ctrlKey && !e.metaKey && !e.altKey && !isText(e.target)) { ghostHold = true; hintGhost(); dirty = true; kick(); } });
      api.on(document, 'keyup', function (e) { if (e.key === 'g' || e.key === 'G') { ghostHold = false; dirty = true; kick(); } });
      api.on(window, 'blur', function () { if (ghostHold) { ghostHold = false; dirty = true; kick(); } });      /* a keyup that happens in another window */
      api.on(window, 'resize', onResize);
      api.on(document, 'visibilitychange', function () {      /* the Tribunal's clock stops while nobody is looking */
        if (document.hidden) { hiddenAt = api.now(); return; }
        if (hiddenAt) { const d = api.now() - hiddenAt; hiddenAt = 0; if (d > 0 && d < 3600000) { t0 += d; lastAct += d; lastSayAt += d; } }
      });
      ['pointerdown', 'keydown', 'click'].forEach(function (ev) { api.on(root, ev, function () { const t = api.now(), gap = t - lastAct; lastAct = t; idleReady2 = true; idleStage = 0; if (gap >= IT1 * 0.4 && nSub > 0 && t - backAt > 9000 && !busy && !revealing) { backAt = t; say(B['m.back'][gap >= IT2 ? 2 : gap >= IT1 ? 1 : 0], { mood: 'smug', priority: 2 }); } }, true); });
      /* ---------------------------------------------------------------- start */
      paintBag(); paintGallery();
      show(pantryEl, sv.pantry > 0);
      measure(); newSnack(); paintRoom(); restoreCap();
      const welcome = wasVisitor ? (fl('draw-a-circle.bagelSeen') ? B['m.welcome.bagel'][0] : B['m.welcome'][1]) : (api.chance(0.35) ? B['m.welcome'][2] : B['m.welcome'][0]);
      chain([
        [900, function () { say(welcome, { mood: 'proud', priority: 1 }); }],
        [300, function () { seats.q.seat.classList.add('m-draw-a-circle-in'); }], [900, function () { seats.b.seat.classList.add('m-draw-a-circle-in'); }], [1500, function () { seats.h.seat.classList.add('m-draw-a-circle-in'); }],
        /* each judge introduces themselves in their own card as their seat slides in; Management keeps the bubble to itself for the first 10 seconds, and the m.intro lines become its first idle remarks */
        [1200, function () { if (!wasVisitor && stage === 'empty' && !revealing && !busy) typeInto('q', B['j.intro'][0]); }], [2100, function () { if (!wasVisitor && stage === 'empty' && !revealing && !busy) typeInto('b', B['j.intro'][1]); }],
        [3600, function () { if (!wasVisitor && stage === 'empty' && !revealing && !busy) typeInto('h', B['j.intro'][2]); }]
      ]);
      api.setInterval(manage, 1000);
      kick();
      return {
        destroy() {
          try { persist(); } catch (e) { /* the save is optional */ }
        }
      };
    }
  });
})();
