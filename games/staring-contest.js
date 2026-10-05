/* POINTLESS module: staring-contest */
/*
 * Staring Contest With a Painting. Hold still. The painting always wins; stillness only decides WHICH loss you get.
 * Brief: design/staring-contest.md. JS builds class names through cl(); every stage effect is a start/stop pair in fx.
 */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-staring-contest-room{--wall:#3b1f2e;--wain:#5a2a35;--g1:#f6d36b;--g2:#b8801f;--g3:#fff1a8;--ink:#1c1417;--mint:#8fd5b0;--coral:#f26b5b;--must:#e3b341;--lilac:#b9a6e8;--cream:#f3e6c8;
 position:relative;display:grid;grid-template-columns:minmax(0,1fr) 250px;grid-template-areas:"hud hud" "main plac";gap:10px;padding:10px;border-radius:14px;border:3px solid var(--ink);color:var(--cream);overflow:hidden;overflow:clip;
 font:15px/1.4 "Trebuchet MS","Segoe UI",system-ui,sans-serif;min-height:400px;
 background:radial-gradient(circle at 20% 30%,rgba(255,255,255,.05) 0 2px,transparent 3px) 0 0/26px 26px,radial-gradient(circle at 70% 70%,rgba(255,255,255,.04) 0 3px,transparent 4px) 0 0/34px 34px,repeating-conic-gradient(rgba(255,255,255,.06) 0 5deg,transparent 5deg 10deg) 0 0/90px 90px,var(--wall)}
.m-staring-contest-room [hidden]{display:none !important}.m-staring-contest-room button{font-family:inherit}.m-staring-contest-hud{grid-area:hud;display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:stretch}
.m-staring-contest-clk{background:#24121b;border:3px solid var(--ink);border-radius:12px;padding:6px 10px;box-shadow:3px 3px 0 var(--ink);min-width:0}.m-staring-contest-clkr{text-align:right;grid-column:3}
.m-staring-contest-hud>.m-staring-contest-clk:first-child{grid-column:1}.m-staring-contest-ringbox{grid-column:2}.m-staring-contest-clkl{font-size:.68rem;letter-spacing:.18em;color:var(--must);font-weight:800}
.m-staring-contest-clkv{font:800 1.7rem/1.1 "Consolas","Courier New",monospace;font-variant-numeric:tabular-nums;color:var(--cream)}.m-staring-contest-pclk{font-size:.78rem;line-height:1.25;color:var(--cream);opacity:.92;min-height:2.4em;overflow-wrap:anywhere}
.m-staring-contest-ringbox{display:none;text-align:center;align-self:center}.m-staring-contest-b3 .m-staring-contest-ringbox{display:block}.m-staring-contest-ring{width:58px;height:58px;display:block;margin:0 auto}
.m-staring-contest-tier{font-size:.66rem;letter-spacing:.1em;color:var(--must);font-weight:800;text-transform:uppercase}.m-staring-contest-score{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:4px 14px;align-items:center;font-size:.82rem}
.m-staring-contest-sw{font-weight:900;letter-spacing:.06em;color:var(--coral)}.m-staring-contest-pips{display:inline-flex;gap:4px;vertical-align:middle;margin-right:6px}
.m-staring-contest-pip{width:11px;height:11px;border-radius:50%;background:var(--mint);border:2px solid var(--ink);transition:background .2s}.m-staring-contest-pip.m-staring-contest-off{background:#2a1520}.m-staring-contest-foot{opacity:.75;font-style:italic;overflow-wrap:anywhere}
.m-staring-contest-main{grid-area:main;display:flex;flex-direction:column;gap:8px;min-width:0}.m-staring-contest-rail{display:none;height:78px;position:relative;border-top:3px solid var(--g2);background:linear-gradient(#0000,#0003)}.m-staring-contest-b4 .m-staring-contest-rail{display:block}
.m-staring-contest-cow{position:absolute;left:6px;top:4px;width:96px;transition:transform .6s ease;transform-origin:50% 0}.m-staring-contest-cowsvg{display:block;width:96px;height:62px;border:4px solid var(--g2);border-radius:3px;background:#9ccbe8;box-shadow:2px 2px 0 var(--ink)}
.m-staring-contest-cowplate{font:700 .5rem/1 Georgia,serif;text-align:center;color:var(--ink);background:var(--cream);padding:2px;margin-top:2px;letter-spacing:.04em}.m-staring-contest-cowfront .m-staring-contest-cow{transform:translate(110px,70px) scale(2.2);z-index:9}
.m-staring-contest-art{position:relative;padding:20px 0 76px;display:flex;justify-content:center;min-height:240px}.m-staring-contest-wain{position:absolute;left:-10px;right:-10px;bottom:44px;height:30px;background:var(--wain);border-top:4px solid var(--cream);box-shadow:inset 0 -6px 0 #0003}
.m-staring-contest-floor{position:absolute;left:-10px;right:-10px;bottom:0;height:44px;background:repeating-linear-gradient(45deg,#8a5a33 0 12px,#7a4c29 12px 24px)}.m-staring-contest-hanger{position:relative;width:min(100%,460px,58vh);z-index:2}
.m-staring-contest-hook{position:absolute;left:50%;top:-13px;width:24px;height:24px;margin-left:-12px;z-index:4}
.m-staring-contest-pale{position:absolute;inset:0;background:#53323f;border:2px dashed #7b5360;opacity:0;z-index:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:10px;font:italic .85rem Georgia,serif;color:#cdb2bd}
.m-staring-contest-palevis .m-staring-contest-pale{opacity:1}
.m-staring-contest-paint{position:relative;z-index:2;padding:12px;border-radius:4px;
 background:linear-gradient(135deg,var(--g1),var(--g2) 45%,var(--g3) 70%,var(--g2));
 box-shadow:0 0 0 3px var(--ink),0 0 0 8px var(--g2),0 0 0 11px var(--ink),0 14px 14px 6px rgba(0,0,0,.45),inset 0 0 0 3px #fff3,inset 0 0 9px #0008}
.m-staring-contest-draggable{cursor:grab;touch-action:none}.m-staring-contest-paint.m-staring-contest-trophy{transform:scale(.18) !important;transition:transform 1.2s ease}
.m-staring-contest-canvas{position:relative;aspect-ratio:1.37;overflow:hidden;background:#2a160d;box-shadow:inset 0 0 0 3px #0007;cursor:default}.m-staring-contest-psvg{position:absolute;inset:0;width:100%;height:100%;display:block}.m-staring-contest-eyeg{transition:transform .3s}
.m-staring-contest-b7 .m-staring-contest-eyeg{transition-duration:1s}.m-staring-contest-big .m-staring-contest-eye{transform:scale(1.6);transform-box:fill-box;transform-origin:center}.m-staring-contest-eye{transition:transform .5s}.m-staring-contest-hat{display:none}
.m-staring-contest-loop .m-staring-contest-hat{display:inline}.m-staring-contest-gloss{animation:m-staring-contest-breathe 14s ease-in-out infinite}
.m-staring-contest-glass{display:none;position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.16) 42%,transparent 56%)}.m-staring-contest-b3 .m-staring-contest-glass{display:block}
.m-staring-contest-refl{position:absolute;right:12%;bottom:-4%;font-size:4.4rem;opacity:0;transform:scaleX(-1);filter:blur(2px);mix-blend-mode:screen;transition:opacity .6s;line-height:1}.m-staring-contest-refl.m-staring-contest-on{opacity:.25}
.m-staring-contest-refl.m-staring-contest-yawn{animation:m-staring-contest-yawn 1.6s ease-in-out}.m-staring-contest-refl.m-staring-contest-blinkr{animation:m-staring-contest-dip .5s 2}
.m-staring-contest-refl.m-staring-contest-wave::after{content:"\\1F44B";position:absolute;left:-.4em;top:-.1em;font-size:1.6rem;transform:scaleX(-1);animation:m-staring-contest-wave .5s ease-in-out 4}
.m-staring-contest-cone{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% -10%,rgba(255,226,150,.38),transparent 70%);mix-blend-mode:screen}.m-staring-contest-cone.m-staring-contest-flick{animation:m-staring-contest-flick .5s steps(2,end)}
.m-staring-contest-dust{position:absolute;inset:0;pointer-events:none;overflow:hidden}.m-staring-contest-mote{position:absolute;top:6%;left:-6%;width:4px;height:4px;border-radius:50%;background:#fff8d8;opacity:0}
.m-staring-contest-dust.m-staring-contest-dustgo .m-staring-contest-mote{animation:m-staring-contest-mote 3.2s linear}
.m-staring-contest-dust.m-staring-contest-dustgo .m-staring-contest-mote:nth-child(2){animation-delay:.4s;top:14%}.m-staring-contest-dust.m-staring-contest-dustgo .m-staring-contest-mote:nth-child(3){animation-delay:.9s;top:22%}
.m-staring-contest-dust.m-staring-contest-dustgo .m-staring-contest-mote:nth-child(4){animation-delay:1.3s;top:9%}.m-staring-contest-dust.m-staring-contest-dustgo .m-staring-contest-mote:nth-child(5){animation-delay:1.8s;top:30%}.m-staring-contest-dust.m-staring-contest-dustgo .m-staring-contest-mote:nth-child(6){animation-delay:2.1s;top:17%}
.m-staring-contest-vign{position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(ellipse at 50% 45%,transparent 30%,rgba(0,0,0,.92) 85%);transition:opacity 1s}.m-staring-contest-b7 .m-staring-contest-vign{opacity:var(--vig,.28)}
.m-staring-contest-notary{position:absolute;right:6%;bottom:6%;width:74px;height:74px;opacity:0;pointer-events:none;transform:rotate(-14deg);transition:opacity .4s}.m-staring-contest-notary.m-staring-contest-on{opacity:.9}
.m-staring-contest-gone{position:absolute;inset:0;background:#3a1f2a;display:none;align-items:center;justify-content:center;font:900 1.3rem Georgia,serif;color:var(--cream);letter-spacing:.14em}.m-staring-contest-canvas.m-staring-contest-away .m-staring-contest-gone{display:flex}
.m-staring-contest-grace{position:absolute;inset:0;display:none;align-items:center;justify-content:center;font:900 6rem/1 Georgia,serif;color:var(--cream);text-shadow:0 0 0 var(--ink),4px 4px 0 var(--ink),0 0 24px #000;pointer-events:none;z-index:6}
.m-staring-contest-grace.m-staring-contest-on{display:flex}.m-staring-contest-grace-n{animation:m-staring-contest-pulse .9s ease-out}
.m-staring-contest-stamp{position:absolute;left:50%;top:44%;z-index:7;pointer-events:none;opacity:0;white-space:nowrap;border:6px solid var(--coral);color:var(--coral);background:#fff6;border-radius:10px;padding:2px 16px;font:900 clamp(1.1rem,4vw,2rem) Impact,"Arial Black",sans-serif;letter-spacing:.08em;text-shadow:2px 2px 0 var(--ink);transform:translate(-50%,-50%) rotate(-9deg)}
.m-staring-contest-stamp.m-staring-contest-on{animation:m-staring-contest-slam .45s cubic-bezier(.2,1.5,.4,1) forwards}
.m-staring-contest-regard,.m-staring-contest-banner{position:absolute;left:50%;transform:translateX(-50%);z-index:7;pointer-events:none;text-align:center;padding:4px 12px;border:3px solid var(--ink);border-radius:8px;font-weight:800;font-size:.85rem;max-width:92%}
.m-staring-contest-regard{bottom:6px;background:var(--lilac);color:var(--ink)}.m-staring-contest-banner{top:8px;background:var(--must);color:var(--ink);font-size:1rem;letter-spacing:.1em}.m-staring-contest-wclock{display:none;position:absolute;right:0;top:4px;width:50px;z-index:3;text-align:center}
.m-staring-contest-b3 .m-staring-contest-wclock{display:block}.m-staring-contest-clocksvg{width:46px;height:46px;display:block;margin:0 auto}
.m-staring-contest-pend{width:2px;height:34px;background:var(--g2);margin:0 auto;transform-origin:50% 0;animation:m-staring-contest-swing 2s ease-in-out infinite alternate;position:relative}
.m-staring-contest-pend::after{content:"";position:absolute;left:-6px;bottom:-6px;width:14px;height:14px;border-radius:50%;background:var(--g1);border:2px solid var(--ink)}
.m-staring-contest-dennis{position:absolute;left:2px;bottom:18px;width:60px;height:92px;background:none;border:0;padding:0;cursor:pointer;z-index:4}.m-staring-contest-dennis svg{width:100%;height:100%;display:block}
.m-staring-contest-medal{display:none;position:absolute;left:30px;top:30px;font-size:1.1rem}.m-staring-contest-b9 .m-staring-contest-medal{display:block}.m-staring-contest-mop{display:none;position:absolute;right:6px;bottom:14px;width:46px;height:70px;z-index:4}
.m-staring-contest-b5 .m-staring-contest-mop{display:block}.m-staring-contest-mop-h{position:absolute;left:19px;top:0;width:5px;height:46px;background:#c8933b;border:2px solid var(--ink);transform:rotate(8deg)}
.m-staring-contest-mop-m{position:absolute;left:6px;top:2px;width:24px;height:12px;background:#efe6cf;border:2px solid var(--ink);border-radius:6px 6px 2px 2px;transform:rotate(8deg)}
.m-staring-contest-mop-b{position:absolute;left:4px;bottom:0;width:38px;height:28px;background:#4b7dbd;border:3px solid var(--ink);border-radius:3px 3px 10px 10px}.m-staring-contest-walk{display:none;position:absolute;left:72px;right:60px;bottom:6px;height:34px;z-index:4;pointer-events:none}
.m-staring-contest-b9 .m-staring-contest-walk{display:block}.m-staring-contest-vis{position:absolute;bottom:0;font-size:1.5rem;line-height:1;background:rgba(185,166,232,.35);border-radius:10px;padding:1px 3px;transition:left 2.2s linear}
.m-staring-contest-bub{position:absolute;bottom:34px;left:50%;transform:translateX(-50%);width:max-content;max-width:170px;background:var(--cream);color:var(--ink);border:2px solid var(--ink);border-radius:8px;padding:3px 7px;font:600 .68rem/1.25 Georgia,serif;z-index:5}
.m-staring-contest-fly{position:absolute;left:0;top:0;width:14px;height:14px;z-index:12;pointer-events:none;will-change:transform}.m-staring-contest-fly svg{display:block;width:14px;height:14px}
.m-staring-contest-fly.m-staring-contest-sash::after{content:"";position:absolute;left:0;top:5px;width:14px;height:3px;background:var(--coral);transform:rotate(-30deg)}
.m-staring-contest-fly.m-staring-contest-collar::before{content:"";position:absolute;left:3px;top:-1px;width:8px;height:3px;background:#fff;border:1px solid var(--ink)}
.m-staring-contest-fly.m-staring-contest-hatted::before{content:"";position:absolute;left:3px;top:-6px;border:4px solid transparent;border-bottom:6px solid var(--lilac);border-top:0}
.m-staring-contest-bait{position:absolute;z-index:6;background:var(--must);color:var(--ink);border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink);font-weight:900;font-size:.72rem;padding:3px 8px;cursor:pointer}
.m-staring-contest-prompt{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:8;background:var(--cream);color:var(--ink);border:3px solid var(--ink);border-radius:10px;padding:8px 10px;width:min(86%,300px);box-shadow:4px 4px 0 var(--ink);text-align:center;font:700 .8rem Georgia,serif}
.m-staring-contest-prompt button{margin:4px 3px 0;padding:3px 8px;border:2px solid var(--ink);border-radius:6px;background:#fff;cursor:pointer;font-weight:800;font-size:.72rem}
.m-staring-contest-rope{display:none;position:absolute;left:8%;right:8%;bottom:34px;height:12px;z-index:3;border-top:5px solid #b02a2a;border-radius:0 0 50% 50%/0 0 100% 100%;transform-origin:50% 0}
.m-staring-contest-b10 .m-staring-contest-rope{display:block;transform:translateY(-70px);opacity:.4;transition:transform .7s,opacity .7s}.m-staring-contest-b10 .m-staring-contest-rope.m-staring-contest-drop{transform:none;opacity:1}
.m-staring-contest-bunt{display:none;position:absolute;left:0;right:0;top:0;height:20px;z-index:3;font-size:.9rem;letter-spacing:.5em;text-align:center;overflow:hidden;white-space:nowrap}.m-staring-contest-b10 .m-staring-contest-bunt{display:block}
.m-staring-contest-gerald{display:none;position:absolute;right:56px;bottom:18px;z-index:4;font-size:1.9rem;text-align:center;line-height:1}.m-staring-contest-b10 .m-staring-contest-gerald{display:block}
.m-staring-contest-chairb{display:block;height:8px;width:44px;margin:0 auto;background:var(--lilac);border:2px solid var(--ink);border-radius:3px}
.m-staring-contest-tie{position:absolute;left:50%;top:60%;margin-left:-4px;border:4px solid transparent;border-top:12px solid var(--coral);border-bottom:0}
.m-staring-contest-chair{display:none;position:absolute;left:50%;bottom:-30px;margin-left:-26px;width:52px;height:30px;z-index:3;background:var(--lilac);border:3px solid var(--ink);border-radius:6px 6px 2px 2px}[data-state=COOLING] .m-staring-contest-chair{display:block}
.m-staring-contest-cushion .m-staring-contest-chair::after{content:"";position:absolute;left:4px;right:4px;top:-8px;height:8px;border-radius:6px;background:var(--coral);border:2px solid var(--ink)}.m-staring-contest-eyeroll .m-staring-contest-eyeg{animation:m-staring-contest-roll 1s linear}
.m-staring-contest-zzz{position:absolute;left:62%;top:8%;z-index:7;font:900 1.3rem Georgia,serif;color:var(--lilac);pointer-events:none;animation:m-staring-contest-bob 2s ease-in-out infinite}
.m-staring-contest-sign{position:absolute;left:50%;bottom:44px;transform:translateX(-50%);z-index:7;pointer-events:none;background:#150c10;color:var(--must);border:3px solid var(--must);border-radius:6px;padding:4px 10px;font:900 .7rem/1.3 "Courier New",monospace;text-align:center;width:min(88%,360px);box-shadow:0 0 14px var(--must)}
.m-staring-contest-dark{position:absolute;inset:0;z-index:30;pointer-events:none;background:rgba(0,0,0,.96);opacity:0;transition:opacity .5s;display:none}.m-staring-contest-dark.m-staring-contest-on{opacity:1;display:block}
.m-staring-contest-glow{position:absolute;z-index:31;pointer-events:none;display:none;filter:drop-shadow(0 0 6px #fff1a8)}.m-staring-contest-glow.m-staring-contest-on{display:block}.m-staring-contest-dennis.m-staring-contest-lit{z-index:35}
.m-staring-contest-q1 .m-staring-contest-art{filter:brightness(.8)}.m-staring-contest-q2 .m-staring-contest-art{filter:brightness(.62)}.m-staring-contest-q3 .m-staring-contest-art{filter:brightness(.48)}
.m-staring-contest-shut{position:absolute;left:0;right:0;height:50%;background:#150c10;z-index:40;pointer-events:none;transition:transform .6s ease}.m-staring-contest-shut.m-staring-contest-t{top:0;transform:translateY(-101%);border-bottom:6px solid var(--g2)}
.m-staring-contest-shut.m-staring-contest-b{bottom:0;transform:translateY(101%);border-top:6px solid var(--g2)}.m-staring-contest-shuts .m-staring-contest-t,.m-staring-contest-shuts .m-staring-contest-b{transform:none}
.m-staring-contest-quartet{position:absolute;left:0;right:0;bottom:50px;text-align:center;font-size:1.8rem;z-index:6;pointer-events:none}.m-staring-contest-ctl{display:flex;gap:8px}
.m-staring-contest-go,.m-staring-contest-tea{flex:1;min-height:58px;font-size:1.25rem;font-weight:900;color:var(--ink);cursor:pointer;border:4px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink);padding:8px 14px;background:var(--mint);transition:transform .08s,box-shadow .08s}
.m-staring-contest-tea{background:var(--must);font-size:2rem}.m-staring-contest-go:active,.m-staring-contest-tea:active{transform:translate(4px,4px);box-shadow:1px 1px 0 var(--ink)}
.m-staring-contest-go:focus-visible,.m-staring-contest-tea:focus-visible,.m-staring-contest-honor:focus-visible{outline:4px solid var(--mint);outline-offset:3px;box-shadow:0 0 0 7px var(--ink)}
.m-staring-contest-go[aria-disabled=true]{background:#6c5a62;color:#e8dbe0;cursor:default;box-shadow:2px 2px 0 var(--ink)}
.m-staring-contest-verdict{background:var(--cream);color:#2b2118;border:4px solid var(--ink);border-radius:12px;padding:10px 12px;box-shadow:5px 5px 0 var(--ink);animation:m-staring-contest-slide .35s ease-out;font-family:Georgia,serif}
.m-staring-contest-vt{font:900 1rem "Trebuchet MS",sans-serif;letter-spacing:.12em;color:var(--coral);text-shadow:1px 1px 0 var(--ink)}.m-staring-contest-vl{margin:4px 0 8px;font-size:.95rem;font-weight:700}
.m-staring-contest-vg{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;margin:0 0 6px;font-size:.84rem}.m-staring-contest-vg dt{font-weight:800;color:#6b5a3a}.m-staring-contest-vg dd{margin:0;overflow-wrap:anywhere}
.m-staring-contest-va,.m-staring-contest-vf{margin:4px 0;font-size:.8rem;font-style:italic;opacity:.85}.m-staring-contest-plaque{border:3px double #a07a2a;padding:8px;margin:6px 0;background:#fff8dc;font-weight:700;font-size:.85rem}
.m-staring-contest-appeal{margin-top:4px;padding:6px 12px;border:3px solid var(--ink);border-radius:10px;background:var(--lilac);color:var(--ink);font-weight:800;font-size:.85rem;cursor:pointer;box-shadow:3px 3px 0 var(--ink)}
.m-staring-contest-appeal:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-staring-contest-vap{margin:6px 0 0;font-size:.82rem;font-weight:700;min-height:1.2em}
.m-staring-contest-cert{border:4px double var(--g2);background:#fff8dc;color:#2b2118;padding:8px 10px;margin:6px 0;font:700 .8rem Georgia,serif;text-align:center}
.m-staring-contest-plac{grid-area:plac;background:#f3ecd8;color:#2b2118;border:4px double #a07a2a;border-radius:6px;padding:12px;font-family:Georgia,"Times New Roman",serif;box-shadow:0 0 0 3px var(--ink),4px 6px 0 3px #0006;align-self:start;min-width:0}
.m-staring-contest-pt{font:700 .88rem/1.3 Georgia,serif;font-style:italic;margin:0 0 4px;letter-spacing:.02em}.m-staring-contest-pa{margin:0 0 6px;font-size:.8rem;color:#5a4520}.m-staring-contest-rules{margin:0 0 6px;padding-left:18px;font-size:.78rem}.m-staring-contest-rules li{margin:2px 0}
.m-staring-contest-ps{margin:6px 0;padding:5px 7px;background:#e9dfbf;border-left:4px solid #a07a2a;font-size:.8rem;min-height:2.4em}
.m-staring-contest-honor{display:block;width:100%;margin:6px 0;padding:6px;border:3px solid var(--ink);border-radius:8px;background:#fff;color:var(--ink);font-weight:800;font-size:.78rem;cursor:pointer}.m-staring-contest-honor.m-staring-contest-on{background:var(--mint)}.m-staring-contest-main>.m-staring-contest-honor{margin:0;font-size:.74rem;padding:5px 8px}
.m-staring-contest-cap{position:absolute;left:50%;bottom:6px;transform:translateX(-50%);z-index:7;pointer-events:none;text-align:center;width:max-content;max-width:92%;padding:3px 10px;border:2px solid var(--ink);border-radius:8px;background:var(--cream);color:var(--ink);font:700 .76rem/1.25 Georgia,serif}
.m-staring-contest-regard:not([hidden])~.m-staring-contest-cap{display:none}.m-staring-contest-cast{position:absolute;left:0;right:0;bottom:8px;z-index:5;pointer-events:none;text-align:center;font-size:1.5rem;line-height:1;letter-spacing:.35em}
.m-staring-contest-tray{display:none;position:relative;height:84px;margin-top:6px;border:2px dashed #a07a2a;background:#efe5c4;overflow:hidden}.m-staring-contest-b6 .m-staring-contest-tray{display:block}
.m-staring-contest-trayl{position:absolute;left:4px;top:2px;font-size:.66rem;font-weight:800;z-index:2;background:#efe5c4}
.m-staring-contest-form{position:absolute;width:62px;height:34px;background:#fff;border:1px solid #888;font:700 .42rem/1.1 Georgia,serif;padding:2px;overflow:hidden;box-shadow:1px 1px 0 #0003}
.m-staring-contest-form::after{content:"";position:absolute;right:3px;bottom:3px;width:9px;height:9px;border-radius:50%;border:2px solid var(--coral)}.m-staring-contest-rc{font-size:.7rem;text-align:right;opacity:.8;margin:4px 0 0}.m-staring-contest-hist{margin-top:6px;font-size:.72rem}
.m-staring-contest-hist summary{cursor:pointer;font-weight:800}.m-staring-contest-hist ol{margin:4px 0 0;padding-left:18px}.m-staring-contest-shake{animation:m-staring-contest-shk .45s linear}.m-staring-contest-thud{animation:m-staring-contest-thud .5s ease-out}
@keyframes m-staring-contest-breathe{0%,100%{opacity:.5}50%{opacity:1}}@keyframes m-staring-contest-yawn{0%,100%{transform:scaleX(-1) scaleY(1)}40%,60%{transform:scaleX(-1) scaleY(1.18)}}@keyframes m-staring-contest-dip{50%{opacity:0}}
@keyframes m-staring-contest-wave{50%{transform:scaleX(-1) rotate(-30deg)}}@keyframes m-staring-contest-flick{0%,100%{opacity:1}50%{opacity:.1}}@keyframes m-staring-contest-mote{0%{left:-6%;opacity:.9}100%{left:106%;opacity:.9}}
@keyframes m-staring-contest-pulse{from{transform:scale(1.6);opacity:0}to{transform:scale(1);opacity:1}}@keyframes m-staring-contest-slam{0%{transform:translate(-50%,-50%) rotate(-9deg) scale(3);opacity:0}100%{transform:translate(-50%,-50%) rotate(-9deg) scale(1);opacity:.95}}
@keyframes m-staring-contest-swing{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}@keyframes m-staring-contest-bob{50%{transform:translateY(-8px)}}
@keyframes m-staring-contest-roll{0%,100%{transform:translate(4px,0)}25%{transform:translate(0,4px)}50%{transform:translate(-4px,0)}75%{transform:translate(0,-4px)}}@keyframes m-staring-contest-slide{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}
@keyframes m-staring-contest-shk{0%,100%{transform:translate(0,0)}20%{transform:translate(-5px,3px)}40%{transform:translate(5px,-3px)}60%{transform:translate(-4px,-2px)}80%{transform:translate(3px,3px)}}
@keyframes m-staring-contest-thud{0%{transform:translateY(-6px)}40%{transform:translateY(5px)}100%{transform:none}}@keyframes m-staring-contest-hop{50%{transform:translateY(-9px) rotate(8deg)}}
.m-staring-contest-sock{position:absolute;left:-12%;bottom:46px;font-size:1.5rem;line-height:1;z-index:5;pointer-events:none;transition:left 7s linear;animation:m-staring-contest-hop .7s ease-in-out infinite}.m-staring-contest-sock.m-staring-contest-walkon{left:108%}
.m-staring-contest-r4b{font:inherit;background:none;border:0;padding:0;margin:0;color:inherit;text-align:left;cursor:pointer;text-decoration:underline dotted}.m-staring-contest-r4b:focus-visible{outline:3px solid var(--g2);outline-offset:2px}.m-staring-contest-cert div+div{margin-top:3px;font-weight:600}.m-staring-contest-cert .m-staring-contest-rvh{font:900 .8rem "Trebuchet MS",sans-serif;letter-spacing:.14em;color:var(--coral)}
@media (max-width:719px),(max-height:820px){.m-staring-contest-ctl{order:-2}.m-staring-contest-honor{order:-1}}
@media (pointer:coarse){.m-staring-contest-bait,.m-staring-contest-prompt button,.m-staring-contest-appeal,.m-staring-contest-honor,.m-staring-contest-hist summary{min-height:44px}.m-staring-contest-prompt button{padding:6px 12px}}
@media (max-width:960px){
 .m-staring-contest-art{padding-bottom:98px}.m-staring-contest-wain{bottom:48px}.m-staring-contest-floor{height:48px}
 .m-staring-contest-dennis{width:42px;height:64px;bottom:20px}.m-staring-contest-medal{left:18px;top:20px;font-size:.9rem}
}
@media (max-width:719px){
 .m-staring-contest-room{grid-template-columns:minmax(0,1fr);grid-template-areas:"hud" "main" "plac";padding:8px;gap:8px}
 .m-staring-contest-clkv{font-size:1.1rem}.m-staring-contest-pclk{font-size:.7rem}.m-staring-contest-clk{padding:4px 7px}.m-staring-contest-tier{font-size:.56rem;letter-spacing:0}.m-staring-contest-ringbox{min-width:0}
 .m-staring-contest-ring{width:46px;height:46px}
 .m-staring-contest-b3 .m-staring-contest-art{padding-top:46px}
 .m-staring-contest-wclock{top:-2px;width:36px}.m-staring-contest-clocksvg{width:32px;height:32px}.m-staring-contest-pend{height:12px}
 .m-staring-contest-grace{font-size:4rem}
 .m-staring-contest-go,.m-staring-contest-tea{min-height:64px}
 .m-staring-contest-vis{font-size:1.2rem}
 .m-staring-contest-bub{max-width:150px}
}
@media (prefers-reduced-motion:reduce){
 .m-staring-contest-gloss,.m-staring-contest-sock,.m-staring-contest-pend,.m-staring-contest-zzz,.m-staring-contest-grace-n,.m-staring-contest-verdict,.m-staring-contest-shake,.m-staring-contest-thud,.m-staring-contest-eyeroll .m-staring-contest-eyeg,.m-staring-contest-refl.m-staring-contest-yawn,.m-staring-contest-refl.m-staring-contest-wave::after,.m-staring-contest-refl.m-staring-contest-blinkr,.m-staring-contest-cone.m-staring-contest-flick,.m-staring-contest-dust.m-staring-contest-dustgo .m-staring-contest-mote{animation:none !important}
 .m-staring-contest-shut,.m-staring-contest-sock,.m-staring-contest-cow,.m-staring-contest-vis,.m-staring-contest-paint.m-staring-contest-trophy,.m-staring-contest-eyeg,.m-staring-contest-eye{transition:none !important}
 .m-staring-contest-stamp.m-staring-contest-on{animation:none;opacity:.95}
}
`, 'css-staring-contest');

  P.addAchievements([
    { id: 'staring-contest.first', name: 'The Grand Concession of the Lesser Eye', desc: 'Lose your first round to the painting. You have joined a very long queue of the defeated, which is also a queue.', icon: '🥈', reward: 2 },
    { id: 'staring-contest.withering', name: 'Order of the Withering Gaze (Third Class, Provisional)', desc: 'Hold a stare long enough to reach Glare level Withering (15 seconds). The painting is neither withered nor concerned.', icon: '👁️', reward: 3 },
    { id: 'staring-contest.insect', name: 'Knight Commander of the Insect Proxy', desc: 'Lose a round because a fly blinked on your behalf. The fly has been notified. The fly is not available for comment.', icon: '🦟', reward: 2 },
    { id: 'staring-contest.exhibit', name: 'Honorary Doctorate in Having Been Looked At', desc: "Be reviewed by at least three gallery visitors in 'You Are The Exhibit'. You are now qualified to stand near things.", icon: '🎓', reward: 5 },
    { id: 'staring-contest.paperwork', name: 'Baron of Unsuccessful Paperwork', desc: 'File 5 appeals. The Appeals Desk found against you with great ceremony. It is a wall.', icon: '📜', reward: 3 },
    { id: 'staring-contest.regard', name: 'Lord Protector of Mutual Regard', desc: 'Share exactly 3 seconds of eye contact with the painting. Not scored. Not scoreable.', icon: '🤝', reward: 5 },
    { id: 'staring-contest.runnerup', name: 'Runner-Up in a Field of One', desc: 'Reach the end of the staring contest. The staring contest continues.', icon: '🎗️', reward: 10 },
    { id: 'staring-contest.blink', name: 'The Blink Heard Round the Gallery', desc: 'SECRET. Wait three minutes on the results screen and witness the painting blink for exactly one frame. Nobody else saw. You did, probably.', icon: '😑', secret: true, reward: 7.5 },
    { id: 'staring-contest.hook', name: 'Lord Protector of the Hook', desc: 'SECRET. Shake the painting off the wall, then hang it back up yourself within 20 seconds. The wall has never been this level, which is to say not.', icon: '🎣', secret: true, reward: 5 },
    { id: 'staring-contest.seven', name: 'Seven and a Half Seconds of Fame', desc: 'SECRET. Blink in the narrow window of 7.50 to 7.59 seconds. The plaque is also a form.', icon: '🕢', secret: true, reward: 7.5 },
    { id: 'staring-contest.clock', name: 'The Clock Is Also a Contestant', desc: 'SECRET. Witness the painting look away at the clock for one second. It does not count as losing. It does not count as anything.', icon: '🕰️', secret: true, reward: 3 },
    { id: 'staring-contest.tectonic', name: 'The Tectonic Plate Eats the Painting', desc: 'SECRET. Win Rule 9(c) by drifting the cursor at geological speed. The painting lost for exactly 4 seconds.', icon: '🌋', secret: true, reward: 5 },
    { id: 'staring-contest.aspect', name: 'Aspect Ratio Violation, Waived', desc: "SECRET. Resize the window to exactly 7:5 during a stare. The frame was moved. It said 'ah'.", icon: '📐', secret: true, reward: 2 },
    { id: 'staring-contest.rule4b', name: 'Grand Exalted Sovereign of the Unnumbered Rule (Reinstated, Pending Review)', desc: 'SECRET. Look for Rule 4b three times. It does not exist. You found it anyway. It has been under the placard since before the placard, and has views on the placard.', icon: '🗝️', secret: true, reward: 6 },
    { id: 'staring-contest.minute', name: 'Freeholder of The Minute (Nothing Happened, Formally)', desc: 'SECRET. Survive a round in which absolutely nothing was done to you for a full 60 seconds. The painting reports it was the hardest thing it has ever watched.', icon: '⏱️', secret: true, reward: 5 },
    { id: 'staring-contest.standard', name: 'Citizen of the Double Standard', desc: 'SECRET. Turn the Honor System on and watch the painting break every rule it set. The painting is on a different system. It is called Being A Painting.', icon: '⚖️', secret: true, reward: 3 },
    { id: 'staring-contest.quiet', name: 'The Quiet Appreciation of Doing Nothing', desc: 'SECRET. Remain on the results screen for 4 minutes. The gallery closed an hour ago. You are still here.', icon: '🕯️', secret: true, reward: 1 }
  ]);

  /* ---------------- content ---------------- */
  const L = {
    intro: ['Welcome to the Gallery of Unmoving Things. Please stare at the painting. The painting has been briefed.', 'Press BEGIN STARING when ready. The painting has been ready since 1743.', 'The painting is a very patient painting. It has been waiting 283 years for somebody to hold still. You are the first to try on a weekday.', 'Eye contact is a core competency. Management has been practising on a mirror. The mirror has asked for a transfer.', 'Eye tracking is calibrated using proprietary telepathy. If it misreads you, please take it up with your face.'],
    grace1: ['Do not move the mouse. Do not press anything. Do not, for the record, think loudly.'],
    grace: ['Eyes Open. The click that started this round will not be held against you. Everything after it will.', 'Three seconds of grace. Grace is not a feature of the painting. It is a courtesy of the building.', 'Grace period: 3 seconds. The painting has been in grace since 1743 and has not once used it.', 'Please settle in. Sandra recommends the posture of someone waiting for a kettle that has already boiled.', 'The contest begins when the numbers stop. The numbers have been informed. The numbers are nervous.', 'Last chance to blink for free. The painting has not offered itself the same deal.', 'Please remove any expression that is not your regular expression. Sandra has a photo of the regular one.', 'The grace period is a legal fiction. So is most of this. We find that it holds up.'],
    esc: ['Escape is not a blink. It is a blink with an exit strategy, which is worse.', 'Escape has been noted. Escape was not asked to leave. Escape has not been asked anything.', 'Escape pressed during the pause between contests. This is permitted. The painting is hurt anyway.'],
    escMore: ['Escape has been pressed again. Escape is now the longest-serving key in the building and would like a plaque.', 'You keep pressing Escape. The building has no exits. It has encouragement, mounted at head height.', 'Escape was pressed. There is nowhere to escape to. There is a cafe, and it is BACK IN 5 MIN.', 'Escape, again. The painting takes it as a personal remark on the room. The room has noted the remark, and no longer has a door.'],
    honorFlip: ['The Honor System is not a light switch. The painting has watched the switch. The switch has been warned.', 'Honor has been toggled four times in six seconds. That is not honor. That is a fan.', 'Honor would like to be left on or off. It has no preference. It would like you to pick one and live with it, as honor does.'],
    impatient: ['The button is still cooling from the last verdict. It is a very new verdict and a very old button.', 'The painting needs six tenths of a second to compose itself. It will compose itself in that time. You may watch.', 'Pressing the button faster does not make the painting faster. It makes the button warmer, and the button has feelings about warm.', 'Please wait. The painting is putting its face back. It does this between rounds and prefers to be alone.'],
    accept: ['Rematch accepted. The painting has not moved. It would like it known that it has not moved in an interesting new way.', "Rematch granted. The painting has been informed. It said 'oh', and then it said nothing, which is its other word.", 'Rematch approved by a committee that is also the painting, which recused itself, and then un-recused itself.', 'Another round. The painting stretched its eyes. It has no limbs. It stretched them anyway, in spirit.', 'Rematch accepted. Sandra says this is the best you have ever looked at the button. She keeps a list. You are on it.'],
    remMile: {
      10: 'Rematch number 10. The painting has begun to expect you, and has had a small chair brought in for the expecting.',
      25: 'Twenty-five rematches. The painting has framed the last twenty-four and is thinking about a wing.',
      50: 'Fifty rematches. The painting has called a meeting to discuss the fifty. It has not told you the time. It has not told itself.',
      100: 'One hundred rematches. This is the longest anyone has continued to lose to a painting. The painting wishes to say: please stay. It does not know why it said it.'
    },
    honorOn: ['Honor System enabled. Movement will no longer be checked. This is the honor. The painting is checking anyway.'],
    honorOff: ['Honor System disabled. Your hands are on the clock again, and so is Management.'],
    honorGag: ['The painting is not cheating. The painting is on a different system. It is called Being A Painting.'],
    stillN: ['Management is not allowed to say this. Management is on your side.', 'Everybody has gasped at once. Nothing has happened. It was very well attended.', '...Hm.'],
    tuesday: ['Tuesday did not come to win. Tuesday came to be Tuesday. The painting blinked first. This is the only time, and it does not count.'],
    glare: ['Glare level: Mild. The painting has been mildly stared at. It has made a note in a very small notebook.', 'Glare level: Firm. Firm is the second of six. One of the others is notarized.', 'Glare level: Withering. The painting is neither withered nor concerned. The wall nearby has withered slightly in sympathy.', 'Glare level: Notarized. A notary has been called. The notary is also staring. Nobody is winning but the painting.', 'Glare level: Municipal. Your stare now requires a permit. The permit is in the building. The building is looking at you.', 'Glare level: Unreasonable. This is the sixth and final level. The painting did not know there were six. It has opinions about the other five.'],
    glareB: ['Glare level: Mild. The painting has been mildly stared at again. It has opened a second small notebook, for you.', 'Glare level: Firm. The painting is still at Firm. Firm is now on its CV, under Languages.', 'Glare level: Withering. Something has withered, but it was a plant elsewhere. Dennis has been questioned and is fine.', 'Glare level: Notarized. The notary has brought a colleague. The colleague witnesses the notary.', 'Glare level: Municipal. A stare this size needs a licence, and a second licence for the first licence.', 'Glare level: Unreasonable, again. The painting has asked a more senior painting to take a look. It is thirty feet away and will arrive in a century.'],
    mouse: ['You moved. The painting saw it in 1743 and was already disappointed.', 'Your cursor moved %px% pixels. Sandra has measured %px% pixels. Sandra has feelings about %px% pixels.', 'Mouse displacement: %px% pixels. The painting measures in cubits and has rounded you down to a rumour.', 'Your cursor moved. The pixel has been logged, framed and hung in the east wing, next to the other pixel.', 'The cursor wandered %px% pixels. Sandra has opened a file on the cursor. The cursor is now a person of interest.', 'Movement detected. The painting did not turn its head. The painting does not have a neck and would like that respected.'],
    sacc: ['That was wobble 1 of 3. Forgiven. Sandra has drawn a tally mark and is being brave about it.', 'Wobble 2 of 3. Sandra has drawn a second tally mark and put a small box round both.', 'Wobble 3 of 3. The next one is a blink. Sandra has said this in writing, in pencil.'],
    key: ['You pressed a key. The painting did not press a key. This is what discipline looks like, framed.', 'That was a keypress. The painting felt it in the frame, the frame felt it in the wall, and the wall is not speaking to either of you.', 'A key was pressed. The key has been asked to leave the contest. It is still on your keyboard, which is awkward for everybody.', 'You pressed a key. Somewhere a typewriter has stopped. There is no typewriter. It stopped anyway.', 'Keyboard input detected. The keyboard was only doing its job, which is what makes this so sad.', 'You pressed a key with your whole hand. Sandra could hear the hand. Sandra says it was thinking loudly.'],
    click: ['You clicked. The painting is oil on panel and cannot click back. It has been clicked at emotionally.', 'You clicked. The painting has no visible ears and heard it anyway, which is worse.', 'Click detected. The mouse button has been cautioned. It said it was only doing what it was pressed to do.', "You clicked in the painting's contest. The contest regrets to inform you that it is not clickable, and has been clicked."],
    wheel: ['You scrolled. The painting did not go anywhere. It is, famously, where it is.', 'You scrolled. The painting was not moved by this. The painting was not moved by the flood of 1802 either, and that was in the building.', 'The wheel turned. The painting did not. This is the entire difference between you, and the painting would like it kept.', 'You scrolled, which is a way of leaving without leaving. The painting counts leaving. Rule 4a counts the thinking about it.'],
    touch: ['Touch detected. The painting does not have a finger. It does not need one. It is already above you.', 'You touched the screen. The painting wishes it noted that it was touched and nobody asked.', 'A finger has arrived. The painting has been touched by a hand it will never be introduced to. This is a very Tuesday thing to have happened.'],
    tab: ['Tab switch detected. You blinked with an entire browser.', 'You left for another tab. The painting waited. The other tab did not wait. It never does. It is a tab.', 'Window focus lost. Whatever you are looking at had better be staring back.', 'You switched away. Management does not know where you went. Management has a feeling it was a spreadsheet.'],
    leave: ['You looked away. The painting saw you looking away. The painting will not mention it. The painting is mentioning it.', 'You left the room. The painting remains in the room. The painting is also, technically, the room.', 'Your cursor stepped out. The room carried on, minus one witness and plus one draught.', 'Your cursor left. The painting did not follow. The painting does not follow. It is followed.'],
    resize: ['You resized the window. That is moving the painting, which violates the Hands Off Exhibit rule and also the painting.', 'The window changed shape. The painting did not consent to the new shape. The painting is oil and cannot be asked to be square.', 'You resized the window. The wall has been rearranged without a permit. Sandra would like a word with the wall.', 'The window dimensions changed. The painting preferred the old ones, and so did the frame, and so did the frame\'s insurer.'],
    aspectOk: ["The frame hums a single note. It says 'ah'. The painting wins, but kindly."],
    dennis: ['Dennis was not part of the contest. Dennis is not part of anything, which is why Dennis is the healthiest member of staff.'],
    dennisCard: ['Disqualified for contact with a plant. Dennis is thriving, and not looking, which is the true winning move.'],
    dennis3: ['Dennis (Plant) is beginning to take it personally. Dennis is a plant. This is the loudest Dennis has ever been.'],
    dennisIdle: ['You clicked Dennis between contests. Dennis (Plant) was between contests too. Dennis is fine.', 'Dennis (Plant) has been touched out of context. The context was a pot.'],
    dennisN: {
      7: 'Dennis (Plant) has been clicked 7 times. This is his busiest quarter. Dennis has only ever had the one quarter.',
      12: 'Dennis (Plant) has now been clicked 12 times and has asked for a day off, by growing slightly.',
      20: 'Dennis (Plant) has been clicked 20 times. A small leaf has turned toward you. It is a legal leaf.',
      50: 'Dennis (Plant) has been clicked 50 times and is now Senior Plant. The raise is light, in the form of light.'
    },
    freeAppear: ["A button has appeared: FREE MEH (DO NOT CLICK). We know you. We have a file. It is a very thin file, but it says 'will click'.", 'FREE MEH (DO NOT CLICK) has appeared somewhere new. It moves because it is shy. It is also a trap. These are not in conflict.', 'FREE MEH (DO NOT CLICK) is back. It has been renamed since last time. It is still called that. The renaming was a formality.'],
    freeClick: ['You clicked FREE MEH (DO NOT CLICK). It was not free. It was not Meh. It was, in the end, a button.', 'You clicked it. It said DO NOT CLICK. It said it in capitals, which is the loudest a button can be without becoming a siren.', 'You clicked FREE MEH (DO NOT CLICK) again. It has been clicked so often it has stopped being a button and become a habit.'],
    drift1: ['Sandra invokes Rule 9(c): Geological Movement Is Not Movement. The painting forfeits for exactly 4 seconds, until the appeal is filed.'],
    drift2: ['The appeal has been filed. The painting wins on appeal. The appeal was filed in 1743.'],
    retro: ['The painting has won. It began staring in 1743. You were given a head start of zero.', 'The painting has won retroactively. The start date has been moved to 1743. This is permitted; the date is also oil on panel.', 'You were beaten by a head start you were not told about. The painting regrets that you were not told. It would have been polite.', 'The painting was already winning when you arrived. The record shows it was winning when you pressed BEGIN, and during.', 'Retroactive victory confirmed. The painting began in 1743, you began just now, and the committee began lunch.'],
    retroCard: ['Retroactive Start Date. The painting began first. The record shows it began first.', 'Retroactive Start Date, backdated 283 years and initialled by Sandra, who was not born yet and signed anyway.', 'Retroactive Start Date. The painting has been staring since before the contest began. It began the contest.'],
    loss: {
      fly: ['Disqualified under the Insect Proxy Clause: the fly blinked on your behalf. Flies blink 140 times a second. It was a lot of blinking.', 'The fly blinked for you, and did it well. It has asked not to be thanked, and has been thanked, with some force.', 'Insect Proxy Clause, again. The painting has never been prouder of a stranger.', 'The fly has blinked on your behalf and would like to be paid. It has been paid in the only currency it accepts, which is being in the room.'],
      reflection: ['Reflection disqualified for blinking twice. You personally are fine. You are simply associated with the reflection.', 'Your reflection blinked twice and took credit for the first. You have been blamed for the second. You were not consulted.', 'The glass rules that your reflection moved first. Your reflection says you moved first. You are both right and you have both lost.'],
      cow: ['You cannot out-stare the rear of a cow. Nobody has. It is a distinguished rear, and it has won.', 'The cow out-stared you from behind, which is the hardest direction to be out-stared from. It did not even turn round.', 'The cow has been awarded the round. It accepts standing up, as always. It has always been standing up.'],
      varnish: ['Provocation by varnish. You were distracted by a crack that had eyelids. Management stands by the crack.', 'The crack in the varnish has done it again. It has retired to its own wing. If you look, it is looking back.', 'The crack has moved. It is now over the eye. The crack, it must be said, is working very hard.'],
      closing: ['The painting has night vision. You do not. This was in the brochure, on the back, in the dark.', 'The lights went out and the painting simply kept staring, which turns out to be most of its skill set. You have lost in the dark to a professional.', 'The gallery has closed. The painting has stayed. Your coat may be collected. You did not have a coat. One has been issued, in the dark.'],
      forms: ["Seventeen forms are now in the corner. Do not touch them. The pile has reached the painting's weight, and the painting has won on paperwork.", 'The paperwork has reached the painting\'s weight, again. The painting asked for a reweigh. The scales are a form.', 'Seventeen forms. The painting has filed them under S, for Staring, and also for Seventeen. It is a flexible S.'],
      intensity: ['The painting wins by intensity, a unit it made up this morning. It is, unrelated, a very good unit.', 'The unit has been renamed the Hendrik. A Hendrik is a lot. You were not a Hendrik.', 'You lost at intensity, which is a unit with no zero. Sandra has taped a zero to it. The tape is also a unit.'],
      cafe: ['The painting has gone to the cafe. A painting at the cafe is not looking at you, and so cannot have lost. This is the whole rule.', 'The painting has returned from the cafe, rested, and has won anyway. It left a tip. The tip was your round.', 'The painting left for the cafe and still won. The cafe has confirmed this. The cafe was also looking at you, through a window.'],
      sudden: ['Sudden Death Clause invoked at 60 seconds. The painting wins retroactively, as it was always going to. It is a clause with a long career.', 'Sudden Death Clause again. A full minute of stillness. Management has called it impressive and unrelated to anything.', 'You held still for a whole minute. The painting congratulates you on a performance it did not watch. It was looking at the door.']
    },
    fly: ['A fly has entered the contest. Nobody registered it. It is competing as an Independent.', "The fly has landed on the painting's nose. The expression has not changed, which was already the expression of a man who has met flies.", 'The fly is now on your cursor. You cannot swat it. Swatting is movement. The fly has read the rules more carefully than you.', 'The painting has asked the fly to step aside. The fly has declined. We are all learning something about boundaries.', 'The fly has been asked to leave. It has requested this in writing, and has brought a pen. The pen is a leg.', 'The fly has been given a sash. It reads OFFICIAL OBSERVER. The fly would like to say a few words and has said them.', "Fly review of your stare: 'Tasted of concentration.'"],
    pool: ['Playing Dead (not a recognized variant). You were still for the whole contest. The judge ruled it a rehearsal and has booked you for next year.', 'Sustained Gaze. This is a category created thirty seconds ago and backdated to 1743. The painting wins by it.', "Stillness Without Commitment. You were still. You were not, in the judge's view, committed. The judge was looking at the painting at the time."],
    poolMid: ['The judge has entered. The judge is reading a file. It is not yours. It is a file about a different, better stare. This is how judging works.', 'A panel is being assembled: the painting, the wall, and one patient chair. The chair has recused itself, and been made to un-recuse.', 'Your stillness is under review. A reviewer was appointed in 1743 and is only now reaching your file.', 'The Appeals Desk wishes to confirm that you are still being still. It has no way to check. It is trusting the painting, which is a risk.'],
    early: ['The painting has begun to look at you in a manner it calls neutral. It has been calling it neutral for 283 years.', 'Five seconds in. The painting has settled its weight onto the one foot it does not have.', 'The painting is holding. You are holding. Sandra is holding a clipboard. The clipboard is holding up.', 'Five seconds of stillness. The painting has noticed. It has not said anything. It is tallying.'],
    refl: ['The glass over the painting reflects you. Your reflection has yawned. You are responsible for your reflection (Bylaw 4(b), per Sandra).', 'Your reflection waved at the painting. The painting did not wave back. The painting is not unfriendly; the painting is oil.', 'Your reflection has been seen checking the time. You are not sure it is yours. It has better posture.'],
    cow: ['Please welcome Meadow With Mild Cow (c. 1822), standing in for the painting, who is not tired, but thought the cow should have a turn.', 'The cow is not looking at you. The cow has never been looking at you. This is the whole strategy.', 'Meadow With Mild Cow has been moved forward to be seen. The cow, who has never once been seen, is taking it in her stride.'],
    varnish: ['The painting blinked. The room gasps. Management rules it a crack in the varnish. It was a very expressive crack.', 'The painting blinked 40 more times. All varnish. The varnish is having a day.', 'A guard has been called about the crack. He looked at the crack. The crack looked at him. He has gone for a sit-down.'],
    closing: ['The gallery closes at 7 1/2 o\'clock. The painting stays. The painting lives here and has a key.', "Lights out. The painting's eyes are the only thing visible. Management would like to remind you that the painting is a painting.", 'A mop in a bucket has been appointed Night Guard. The mop has sided with the painting. The mop wrote that down.', 'Dennis (Plant) is still lit. Dennis is not impressed by either of you.', 'The mop is guarding something. It will not say what. Everyone has agreed that this is what a night guard is for.'],
    forms: ['Form 27B/6 (Request to Stare) is pending. Form 27B/7 (Request to Stop Staring) was destroyed in 1998 and has been crossed out in advance.', 'Would you like to blink? YES / NO / REMIND ME LATER. Not choosing is a choice. The painting has chosen for you.', 'You clicked a button on the blinking form. You will be reminded. You have been reminded. You lost.', 'A form has been filed to request fewer forms. It is in the pile. The pile has noted the irony and is sitting very still.'],
    formHead: ['Form 27B/6 Request to Stare', 'Form 27B/7 Request to Stop Staring (1998)', 'Form 27B/8 Request for a Chair', 'Form 12 (was 11)', 'Form 7 1/2', 'Form 4 Request for Form 4a', 'Form Tuesday', 'Form 14(d) Decoration'],
    inten: ['The vignette tightens. This is not a metaphor. It is a vignette, and it is tightening.', "The painting's eyes are now 1.6 times their previous size. The painting says this is the same size. The painting is lying, accurately.", "A notary has witnessed nothing. The notary's stamp is real. The nothing is also real.", 'The notary has asked how much intensity is allowed per square inch. The painting has declined to answer, which is the answer.'],
    wall: ['The painting has fallen off the wall. A cleaner rectangle of wall is visible. The wall looks younger. The wall is nervous.', 'Please re-hang the painting. Touching exhibits is forbidden. Please touch the exhibit. Both of these instructions are official.', 'You hung the painting back up. You touched the exhibit. The painting wins; the hook also wins; you are third.', 'You put the painting down near the hook. This is also touching. The hook has been informed. The hook is not upset; the hook is a hook.', 'You did not hang the painting back up. This is also touching it, philosophically. The hook wins.', 'The painting has not been damaged. The painting was already damaged, in 1744, and has been revised.'],
    cafe: ['Visitors are now staring at you. You are the exhibit. You are, regrettably, still not winning.', 'BACK IN 5 MIN', 'A visitor has asked the guard where the exit is. The guard pointed at a poster that says you are doing it. The visitor sat down.', 'Dennis (Plant) has been awarded a medal. Dennis (Plant) has been awarded nothing else, and is thriving.'],
    sudden: ['Sudden Death Clause invoked at 60 seconds. The painting wins retroactively, as it was always going to. It is a clause with a long career.'],
    clock: ['The painting has looked away. This does not count as losing. It does not count as anything. Enjoy it for one tick.', 'The painting looked away at the wall clock for one second. The clock is wrong, confidently, and therefore wins.'],
    wink: ['A wink is not a blink. This is the opposite of a loophole.', 'The painting winked at someone behind you. There is no one behind you. The wink was real. The someone was a courtesy.', 'A wink. The painting did it once before, in 1744, at a person it declined to name. It is the same wink.'],
    verdict: ["Your stare lasted %t% seconds. The painting's stare is ongoing. We have rounded in the painting's favor, per policy.", 'Winner: the painting. Runner-up: you. Third place: the frame, which feels this is unfair to the frame.', 'You lost on a technicality. The technicality was the entire contest.', "Your blink has been entered into the record as 'adequate'. The painting's blink is not in the record. The painting has no blink.", 'You flinched at %t%. The painting did not flinch at %t%. The painting did not flinch in 1743 either, as far as we can tell.', 'Verdict No. %n%: the painting wins by seniority. Per policy, the older party is less blinky.', 'You held for %t% seconds. Sandra timed it with a stopwatch, a sundial and her own sense of occasion. All three agree: the painting.', 'Result: painting, by 283 years minus %t% seconds. Sandra has done the sum and is not sharing the sum.', 'The judges conferred for %t% seconds, the length of your stare, out of respect. They found for the painting.', 'Loss number %n%. The painting is not counting. It has a counter that is extremely good at looking like it is not counting.', 'Official record: you tried. Unofficial record: you tried hard. Both records have been merged into a third record, which is blank.', 'The painting wins and would like to say a few words. It has said them. They were the same words as last time, and went down equally well.', 'The painting has defended its title. The title is still Painting. The defence was nothing, and nothing worked.'],
    firstLoss: ['Consolation prize: 1 Meh and a participation plaque. The plaque is also winning.'],
    award: ['Participation Meh: %n%. The painting has framed the receipt.', 'Participation Meh: %n%. It was counted twice, once to be sure and once to feel something.', 'Participation Meh: %n%. Spend it wisely. There is only one place, and it is the Lobby.', 'Participation Meh: %n%. The painting wanted you to have it and handed it over with the hands it does not have.', 'Participation Meh: %n%. This is the exact price of trying. Sandra checked.', "Participation Meh: %n%. Issued in a small envelope. The envelope has the painting's initials, which are 1743."],
    seven: ['You lasted exactly 7.5 seconds. This is the official unit of nothing in particular, and it has been waiting for you.'],
    plaque: ['SEVEN AND A HALF SECONDS OF FAME. Please sign here, here, and half here. Form 7 1/2. This plaque is also a form.'],
    bylaws: ['Bylaw 4(b)(iii-ish)', 'Bylaw 12 (was 11)', 'Bylaw 7 1/2 (see Bylaw 7 1/2)', 'Bylaw 9(c) (continued from 9(a))', 'Bylaw 27B/6 (Request for Bylaw 27B/7)', 'Bylaw 3 (subsection missing, was never there)', 'Bylaw 1 (was 100, rounded)', 'Bylaw 14(d) (d is for decoration)', 'Bylaw 6.5 (disputed by 6.4 and 6.6)', 'Bylaw 2 (as amended by lunch)', 'Bylaw Tuesday'],
    flicker: ['The picture light flickers once. It has done this since 1743. The bulb has been replaced seven times. The flicker is original.', 'The picture light flickers twice, which is new. Management is calling it an improvement. The painting is calling it nothing.', 'The picture light buzzes. It is trying to say something, in a voice only moths can follow.'],
    dust: ['Dust crosses the painting\'s face. The painting does not blink. The dust has been noted.', "A mote of dust lands on the painting's eyebrow and stays. The eyebrow does not mind. The eyebrow has seen worse.", 'The dust is moving left to right, the way most things in the gallery try to leave.'],
    cough: ['A distant gallery cough. It is not the painting. The painting has a very quiet cough, and has never used it.', 'A guard clears his throat at a volume that is respectful to the exhibits and rude to the guard.', 'A faint cough from the east wing. It was a Hendrik. All the coughs in this gallery are Hendrik.'],
    brow: ["The painting's eyebrow has moved one degree. It has gone from 'remembered something' to 'remembered what'.", "The painting's eyebrow has gone up another degree. It was the left one. The right one is holding the line.", 'The eyebrow has moved again. It is now the eyebrow of a man who has remembered, and remembered that he is in company.'],
    placardw: ['The placard has rewritten one word. It will not say which. It says it is a matter of record.', 'The placard has rewritten two words. It would like you to think about which. It would like you to think about it for quite a while.', "The placard now says 'currently' in a slightly different font. It is not saying why."],
    aside: ['Somewhere in the building, a clock disagrees with another clock. Both are confident.', 'In the corner, Dennis (Plant) is not staring at anyone. Dennis is thriving. Dennis would like the record to show it has no eyes.', "Sandra from Compliance has flagged your posture as 'attentive, but suspiciously confident'.", 'A slice of toast slides under the door marked ENCOURAGEMENT. It is lightly brown. It says: still lost.', 'Your pupils have been measured. They are the size of two small disappointments.', "The fire exit sign has been replaced with an affirmation: 'You are doing it'. It is lit green and has never been tested.", 'Tuesday has been seen in the car park, looking at the building. It is not coming in. It is waiting for the lighting to improve.', 'A school group has been turned away at the door. The painting asked for them. Sandra says the painting has had its attention. It has had 283 years of it.', 'The painting is not thinking about lunch. It has been seen not thinking about lunch since 1743. It is very good at it.', 'Somewhere a stapler is clicking in a rhythm that sounds like a negotiation. Management is not at liberty to say who is winning.', 'Management would like to point out that nothing is happening, and that this is the most important thing happening in the building today.', 'It is 4:17 PM in the gallery. It has been 4:17 PM since the second clock was asked. The first clock was not asked.', 'Management has been watching you not blink for a while now. Management would like you to know it is rooting for you, and it is not allowed to.', 'The gift shop is doing a brisk trade in postcards of this exact room. Nobody has asked who is photographing it.', 'The guard has been standing by the door for six hours. He has just realised the door is a painting. He is taking it well.', 'The bench by the east wall has been reupholstered. It is the same bench. It has simply decided to be seen differently.', 'Management is feeling a bit emotional about the contest. This is not in the brief. It has been written into the brief, in pencil.', 'A tour group has stopped in the doorway and decided, as a group, not to come in. The tour guide is writing it up as a highlight.', 'The cafe has run out of milk and, shortly after, out of cafe. It is now a table with a view.', 'Somebody has left a lanyard on the radiator. It has been there for years and is now technically an exhibit.'],
    dividend: ['Stillness Dividend: 0.2 Meh. Earned by doing exactly nothing, with exceptional commitment.', 'Dividend of 0.2 Meh, paid for stillness. Sandra says this is the first time anyone has been paid to be a lamp.', 'Stillness Dividend: 0.2 Meh. The painting is not paid for the same work. It does the same work. It is a painting.', 'Accounts asked what was done to earn 0.2 Meh. Nothing was done. Excellent, they said, and circled it.', 'Another 0.2 Meh for stillness. It has been put in the pot with the other 0.2s. The pot has been put in a vase.'],
    callback: ['Our records show you have clicked {count} times in your career. The painting has clicked zero. Statistically, it is ahead.', 'Our records show %secs% seconds of your life in this building. The painting has been present for all of them, and several before.'],
    ghost: ['At 41.2 seconds the painting measured a tremor of 0.4 pixels in your left hand. You did not have a left hand on the mouse. The painting has noted this.'],
    idle: ['You have been on the results screen for a minute. The painting is also staring at the results screen. It is good news for no one.', "The painting has fallen asleep with its eyes open. This is called 'being a painting'.", 'The painting has blinked. Nobody saw. If a painting blinks in a gallery and nobody is looking, it was probably the lighting.', 'Management is not saying you saw it. Management is saying it was probably the lighting.', 'The painting blinked again. This time it is just a blink.', 'THIS GALLERY CLOSED AN HOUR AGO. YOU ARE STILL HERE. THIS IS THE LONGEST ANYONE HAS STAYED WITH THE PAINTING.'],
    idleR: ['You have not pressed BEGIN STARING. The painting has begun without you. It is one minute ahead, which is where it likes to be.', 'Two minutes, and the button has not been pressed. The painting has put a small jumper on it, in case it is cold. It is not cold. It is a button.'],
    idle2: ['The painting has started a rumour about you. The rumour is that you are fine. Nobody believes it. It is spreading anyway.', 'INCIDENT REPORT 7 1/2. Subject has not moved for eight minutes. The painting is concerned, and would like that struck from the record.', 'Dennis (Plant) has grown one centimetre since you stopped. This is not because of you. Dennis would like that clear. Dennis is simply, quietly, thriving.', 'A cleaner has vacuumed carefully around you. You have been reclassified as a bench. The bench is comfortable and generates no Meh, per Sandra.', 'Management has gone home. The note on the desk says BACK IN 5 MIN. The note is dated a long time ago and its handwriting has aged.'],
    idleSign: ['NOW SEATING: YOU (BENCH).', 'BACK IN 5 MIN (SINCE THEN).'],
    rest: {
      eye: 'You are pointing at the eye. That is rude in nine cultures and in the Gallery Handbook, Appendix 7 1/2.',
      frame: 'You are resting your cursor on the frame. The frame is flattered. The painting is not jealous. The painting is never jealous.',
      wall: 'You are staring at the wall beside the painting. The wall has noticed. The wall has no comment, and the wall has won.',
      placard: 'You are reading the placard. The placard is not part of the contest. The placard is, however, winning.',
      corner: 'You have parked your cursor in a corner. It is the only place in the room with no opinions.',
      clock: 'You are looking at the pendulum clock. The painting has looked too. The clock is wrong and unbothered.',
      face: 'You are resting on the face. The painting has no comment. The painting is wearing the expression it was already wearing.'
    },
    intros: {
      2: 'Rule 2 has been added to the placard: The painting may move. Please do not take this personally.',
      3: 'A pane of glass has been installed over the painting for its protection. It has also been installed for yours.',
      4: 'Rule 3 has been added to the placard. It reads: See Rule 2. Rule 2 was asked about it and said nothing, which is Rule 2\'s way.',
      6: 'The placard has sprouted a form tray. It is not clear who requested this. Probably Form 27B/6.',
      7: 'The painting now tracks the exact spot your cursor rests on, with a one second delay. This is not a threat. It is an observation with eyes.',
      8: 'The painting will no longer support your confidence. This is a structural comment.',
      10: "Tonight the painting will defend its title against everything. The title is 'Painting'. It has always held it."
    },
    rules: {
      1: ['Rule 1: Do not move.'],
      2: ['Rule 2: The painting may move.'],
      4: ['Rule 3: See Rule 2.'],
      6: ['Rule 4: Thinking loudly is a blink.', 'Rule 4a: Thinking quietly is a smaller blink.', 'Rule 4b does not exist. Do not look for 4b.'],
      8: ['Rule 5: Touching exhibits is forbidden.', 'Rule 5a: Please touch the exhibit.'],
      9: ['Rule 6: You are the exhibit.'],
      10: ['Rule 7 1/2: Rule 7 1/2 does not apply to the painting, nor to Rule 7 1/2.']
    },
    quiet: ['I have been looked at for 283 years. Nobody has stared back until you.', 'How was your day? Do not answer. You are in a contest. But I would have liked to know.', 'Mutual regard: 3 seconds. Not scored. Not scoreable.', 'Management dims the lights a little. This is not a policy. This is just nice.'],
    visit: ['Very still. Would have liked a chair.', 'Seems like the type who has a favorite pen.', 'Not as large as the placard suggested.', 'Stared back. Rude. Five stars.', 'Better than the cow. Worse than the cow.', 'Would not touch. Has not been told whether touching is allowed.',
      'Held still better than the last one. The last one was a bin.', 'Asked if you were part of the exhibit. Was told you were. Said, of course.', 'Left a coin in the bowl. There is no bowl. The coin is on the floor, in a very good position.', 'Would have stayed longer. Was moved on by a person with a lanyard.', 'Is it a mirror? No. Is it a man? Sort of. Is it winning? Apparently.'],
    child: ['Visitor 12, aged about 7 1/2, looked at you for 2.1 seconds. Review: she nodded. That was the review.', 'The last visitor held the stare for 2.1 seconds and nodded. Management is looking at the ceiling to give you privacy.'],
    gerald: ['Ah, {player}. We have met. I have judged many contests. A potato does not blink. Nobody told me it was a skill.', 'I am Gerald, Vice President of Spuds. I have been asked to preside. I have no eyes to speak of, which makes me impartial and also useless.'],
    rulings: ['The painting wins. The painting also loses. These are the same result, wearing different hats.', 'I rule that the stare was too short. I also rule that it was too long. I rule on the length of rulings, and this one is going on.', "The fly is awarded the fly's own medal. The medal is the fly. The fly accepts, feeling the weight of it.", 'In the matter of the cow: the cow was always at the back. This is the nature of cows and of backs.', 'The mop has submitted a minority opinion. It is damp. It is overruled by being damp.', "The committee roster is read. Hendrik. Hendrik's cousin, also Hendrik. Three plants, two of them Hendrik. And {player}.", 'Sandra from Compliance has reviewed the footnotes. They cite each other in a loop. She has declared the loop compliant.', 'I have consulted the fly, the mop, the cow and a spreadsheet. Only the spreadsheet wanted to be here, and it could not leave.', 'A ruling must be fair, final and the length of a small paragraph. This one has been fair for four seconds and final for the rest.', 'I rule that the painting has won, and I rule on the paint, which is, on balance, mostly oil. Sandra has signed off on the oil.'],
    galaFly: ['The fly has landed on Gerald\'s hat. Gerald has not noticed. Gerald is a potato; the hat is a hat.', 'The fly has retired. The fly will be at the reception, mostly on the cheese.'],
    labels: ['Rematch (Notarized)', 'Rematch (Per Policy)', 'Rematch (At Your Convenience)', 'Rematch (Regrettably)', 'Rematch (In Principle)', 'Rematch (Subject to Sandra)'],
    coolN: ['Fourth cooling-off. The painting has begun to look forward to them. It has asked for a blanket. The blanket is a painting of a blanket.', 'Another cooling-off. The tea is on a loyalty scheme now. You are three teas away from a small prize, which is a smaller tea.', 'Cooling-off number %n%. Management has stopped counting and the painting has started. They are both wrong.'],
    cool: ['Rematch requested 12 times in 4 seconds. The painting needs a moment. A comfortable chair has been brought. The painting cannot sit.', 'Mandatory cooling-off period: 7 1/2 seconds. Please enjoy this tea. It is not real tea. It is a tea.', "Management apologizes on the painting's behalf, but only to you.", 'The tea has been pressed. Tea does not work like that. The period has been extended by 7 1/2 seconds and you have been fined 0.5 Meh.', 'The painting has rolled its eyes in a full circle. This is not in the rules. It has been added to the rules.', 'The chair now has a cushion. The painting still cannot sit. The cushion is a gesture.', 'The cooling-off period has ended. The tea is still warm. It was never warm. It is noted that it was warm.'],
    tea: ['The tea acknowledges your press. Tea is not a button, and has said so, in steam.', 'The tea has been pressed again. It has been pressed before. It remembers, mostly as warmth.'],
    units: ['283 years, 9 months, and counting', '14,771 fortnights, give or take a fortnight', '103,400 Tuesdays (none of them enjoyed)', '283 years, plus lunch', '7 1/2 centuries (rounded down by the painting\'s own hand)', '4 minutes (on its break)', '283 years, 9 months and a pause for tea', 'approximately Tuesday', '17 forms, give or take 1743'],
    hook: ['You are shaking the mouse. The painting is now off-center, then off the hook, and then, emotionally, in your lap.', 'Please pick the painting up. Touching exhibits is forbidden. Management insists.', 'The painting is level. The wall is the one that moved.', 'The painting has re-hung itself. It did not want help. A paler rectangle of wall remains.'],
    hookA: ['You are shaking the mouse. The painting is now off-center, then off the hook, and then, emotionally, in your lap.', 'You have shaken the mouse. The painting, which is on a hook, has been shaken by proxy. It is out of its depth, which is four centimetres.', 'That was a lot of mouse. The painting has gone to the floor to lie down. It says it is doing it for a friend.'],
    pale: ['Formerly: a painting.', 'Formerly: a painting, now a rectangle.', 'Formerly: a rectangle, now thinking about it.'],
    appeals: ['Appeal received. Estimated review time: 6 to 8 weeks, or 283 years, whichever is longer.', 'Appeal denied. Reason: the painting has already seen you do this.', 'Appeal pending. You may check its status by staring at it.', 'Appeal denied. Please file Form 27B/6 (Request for Form 27B/7), which was destroyed in 1998, in a fire that has also been appealed.', 'Appeal denied. The wall has considered your argument and has no comment. The wall is load-bearing.', 'Appeal denied. As previously denied, per the wall.', 'Appeal denied. The appeal was beautifully argued and has been framed, separately, and denied.', 'Appeal denied on the grounds that you were looking at the wrong painting. There is only one painting. That is the ground.', 'Appeal denied. Sandra has stamped it twice. One stamp is for emphasis.', 'Appeal withdrawn by the wall, then re-filed by the wall, then denied by the wall.', 'Appeal denied. The panel noted that your case was strong and your standing was a painting. It has been standing since 1743.', 'Appeal denied. It was read aloud to an empty room. The room approved the reading and denied the appeal.'],
    appealSpam: ['The Appeals Desk is closed for the duration of this click. It will reopen after the next one. The next one has been denied.', 'You have appealed four times in a row. The wall has asked whether you would like to see a doctor, or a different wall.', 'Appeal denied. Appeal denied again. Appeal denied for the sake of rhythm. The wall is getting a groove.', 'Appeals received: too many. The Appeals Desk has fallen asleep with its stamp in the air. Whoever wakes it gets the stamp.'],
    appealFee: ['Appeals cost 0.5 Meh. Refunds cost 0.'],
    appealFive: ['You have filed 5 appeals. The Appeals Desk has finally ruled. It has found against you with great ceremony. Here is a fanfare. It is for nothing.'],
    cameoG: ['I too have stared at a painting. It was a wall. I won. The wall never knew.', 'Good to see you again. I do not remember you, but my eyes do.', 'A potato has no eyelids. This is the entire advantage and it was available to anyone. Nobody is queuing to be a potato.', 'I was asked to say something encouraging. Staring is a skill. Mine is a skill. I have been a potato for years and this is my work.', 'I came for the painting. I stayed for the contest. I will leave when it ends, a time that has been set aside for me.'],
    hend: ['A man in a smock has entered. It is Hendrik, the artist. He looks at the painting for four seconds, says, I thought it was bigger, and leaves.', 'Hendrik has looked in. He did not look at you. He looked at the corner of the frame, where he left a thumbprint in 1743, and nodded at the thumbprint.', 'Hendrik is here. He has asked the painting to try a different expression. The painting has said no, politely, with its whole face. Hendrik has left.', 'The artist has returned for the first time in 283 years. He finds the painting slightly taller than he remembered. It is the frame. He has left.', 'Hendrik walked through the gallery carrying one small brush. He looked at the painting. He looked at you. He mouthed sorry and left. Nobody knows whom for.'],
    hendPay: ['Hendrik left 0.5 Meh in a smock pocket. It has paint on it. The paint is original.'],
    sock: ['A sock has crossed the gallery floor from left to right, unaccompanied. It did not look at the painting. It is on a journey.', 'The Missing Sock has been sighted in the Gallery of Unmoving Things. It is walking. Socks do not walk. It has not been told.', 'A sock has gone by. It is the same sock. It has been in several departments. It is not looking for anything. It is being looked for, which is different.', 'Nobody looked at the sock directly. This is how the sock prefers it. This is how the sock gets places.'],
    r4b: ['You are looking for Rule 4b. Rule 4b does not exist. The painting has noted that you looked, which is a kind of existing.', 'Rule 4b, again. The placard has gone very still. Sandra asked you to stop in a voice that sounds like wanting you to continue.'],
    r4bFound: ['Rule 4b: You found it. It was here the whole time. Do not tell Sandra, who wrote it, and then wrote that it did not exist.', 'Rule 4b has been found. Nobody has found Rule 4b. This is a bureaucratic first, and also a second, and also a form.'],
    review: ['You have now been in the Gallery of Unmoving Things for three minutes. This triggers the Three-Minute Review, per Bylaw 3 (subsection missing).', "The painting has reviewed you. It has given you 'Meets Expectations (Retroactively)'. It has given itself 'Exceeds'. It has given the cow 'See Rule 2'.", 'Review bonus: 2 Meh, per Sandra. A third Meh was withheld as a lesson. The lesson is also withheld.'],
    reviewCard: ['STILLNESS: Satisfactory (retroactively)', 'EYE CONTACT: Disputed by the painting', 'TEAMWORK: The fly sends its regards. See attached fly.', 'ATTENDANCE: Present, mostly. Chair not provided.', 'OVERALL: Meets Expectations. The expectation was zero.'],
    cameoT: ['toast.', 'The toaster says it is not your fault. The toaster is lying, but kindly.'],
    foot: ['*', '* see *', '** (a ligature)', '*** (the asterisk belongs to the painting)', 'See *, see **, see ***, see *. Compliant, per Sandra.'],
    artists: ['Artist: Hendrik.', 'Artist: Hendrik (?). The question mark is original to the frame and has been appraised separately.', "Artist: Hendrik's cousin, also Hendrik.", 'Artist: A committee of Hendriks, 3 of whom are plants.', 'Artist: Attributed to Hendrik, for tax reasons.', 'Artist: You, retroactively.'],
    end: ['The lights come up. A string quartet of emoji instruments plays three notes. They are the right three notes.', 'Management would like to read a statement. The painting is Champion, undefeated since 1743. You are Runner-Up, in a field of one.', 'A tiny trophy, which is just the frame, is handed to the painting by Gerald. The painting accepts without moving. A long beat passes.', 'RUNNER-UP CERTIFICATE. This certifies that {player} came second in a field of one. Printed on Form 27B/6 (Request for Form 27B/7).', 'Management would like to thank everyone who made this possible. This includes the painting, who made it impossible.', 'The painting is available for a rematch at your convenience, which has been pre-approved.', 'Next up: Round 1. Same painting. It now has a small hat. It has not moved. The hat is also winning.', "The hat was added in the dark. Nobody will say by whom. The painting's expression has moved by exactly one degree.", 'Congratulations. You have reached the end of the staring contest. The staring contest continues.', 'Round 1 (Again). Same rules. The painting has a hat. You have a past.'],
    endX: ['The quartet falters on the third note. The painting has turned its eyes toward the door. Management would like the record to show it was the lighting.', 'Sandra from Compliance confirms that this is, technically, an ending. She also confirms that it is a Tuesday. She was quieter about the second part.', 'Thank you for staying. I was not looking at you. I was looking at the door. Then you came through it.', 'That was not in the script. Management has gone to check the script. The script is a painting of a script, and it is also looking at the door.'],
    welcomeBack: ['Welcome back, {player}. The painting has won %wins% times in your absence and is still staring at where you were.', 'You are back, {player}. The painting counted. It won %wins% times without you. It says it did not miss you. It has been looking at the door.', 'Welcome back. The painting has been practising your face. It is doing it wrong, in a flattering way.']
  };
  P.addLines('m:staring-contest:xstapler', ['The Stapler, union representative, has sent a note. It asks that the painting receive the same break entitlements as a stapler: one click every 90 minutes, mandatory.', "The Stapler would like it noted that the painting has worked 283 years without a break. This is a breach of Article 7 1/2 of the Stapler's Demands.", 'A small voice from the supply cupboard. The Stapler has filed a grievance on behalf of everyone who has ever held still. It is Grievance 1.']);
  P.addLines('m:staring-contest:xtoaster', ['The Toaster sends regards, in toast. The toast says: still holding. The toast is accurate. The toast is a little sad about it.', 'Slid under the door: a note from the Toaster, in browning. It reads: you do not have to win. It is the only honest thing in the building, and it is warm.', "The Toaster has been asked to comment on the painting. It has said nothing, then 'toast.', then nothing. It was a long, warm silence."]);
  P.addLines('m:staring-contest:xplant', ['Dennis (Plant) has been seen in the lobby, doing nothing in a way that is better at it than you. Dennis has never lost a contest. Dennis does not enter.', 'Dennis (Plant) has heard of this contest, and of you. Dennis wishes you well, the way a plant wishes anything: slowly, and without being asked.', "The lobby plant has requested an update on the contest. The update is that nothing has changed. Dennis (Plant) said 'good'."]);
  P.addLines('m:staring-contest:xsock', ['The sock has been seen in several departments and is now believed to be a regular. It is not looking for anything. It is being avoided by the painting.', 'Missing Sock update: still missing, still walking. Last seen near the cow, looking away. Someone should say something. Nobody will. It is a sock.', 'The sock has sent word that it will not be attending the gala. It has a prior commitment. The commitment is a journey.']);
  P.addLines('m:staring-contest:xgerald', ['Gerald, Vice President of Spuds, has asked after the contest. He has been told it is ongoing. He says this is the correct answer to most questions.', 'Gerald has been told you are in the gallery. He says a potato does not blink, but a potato has been known to sit very still on a shelf. He said it like he knows.', 'Gerald sends word that he will be at the gala. He has had a tiny chair made. He asks that nobody mention the chair, and that it be mentioned everywhere.']);
  const FLOWERS = ['winning', 'prevailing', 'ahead', 'undefeated', 'enduring'];
  const GLARE = [3, 7.5, 15, 25, 40, 55];
  const GLARE_NAMES = ['Mild', 'Firm', 'Withering', 'Notarized', 'Municipal', 'Unreasonable'];
  const BOUNDS = [0, 45, 90, 135, 180, 225, 270, 330, 390, 480, 600];
  const WIN_STEPS = [1, 7, 12, 17, 283, 1743];
  const CHEATS = {
    retro: { gate: 1 }, fly: { gate: 2 }, appeal: { gate: 2 }, reflection: { gate: 3 }, cow: { gate: 4 }, varnish: { gate: 4 },
    closing: { gate: 5 }, forms: { gate: 6 }, intensity: { gate: 7 }, wallfall: { gate: 8 }, cafe: { gate: 9 }, gala: { gate: 10 }, stillness: { gate: 4 }
  };
  const FEATURED = { 1: 'retro', 2: 'fly', 3: 'reflection', 4: 'cow', 5: 'closing', 6: 'forms', 7: 'intensity', 8: 'wallfall', 9: 'cafe', 10: 'gala' };
  const INPUT = { mouse: 1, key: 1, click: 1, wheel: 1, touch: 1, tab: 1, leave: 1, resize: 1, aspect: 1, dennis: 1, freemeh: 1, formbtn: 1 };
  /* cause table: say = bag key or literal-less, card = short cause for the verdict card, bylaw = fixed bylaw (else the bylaw bank) */
  const CAUSES = {
    mouse: { say: 'mouse', card: 'Cursor displacement: %px% pixels.' }, key: { say: 'key', card: 'A key was pressed.' },
    click: { say: 'click', card: 'A click occurred.' }, wheel: { say: 'wheel', card: 'A scroll occurred.' }, touch: { say: 'touch', card: 'Touch detected.' },
    tab: { say: 'tab', card: 'Tab switch detected.' }, leave: { say: 'leave', card: 'You left the room.' },
    resize: { say: 'resize', card: "Aspect Ratio Violation. 1.37:1 is the painting's. The window is not entitled to it." },
    aspect: { say: 'aspectOk', card: 'Aspect Ratio Violation, waived.' },
    dennis: { say: 'dennis', card: 'dennisCard' }, freemeh: { say: 'freeClick', card: 'Clicked a button that said DO NOT CLICK.' }, formbtn: { say: 'forms:2', card: 'Clicked a button on the blinking form.' },
    retro: { say: 'retro', card: 'retroCard', bylaw: 'Bylaw 4(b)(iii-ish)' },
    fly: { say: 'fly:4', card: 'Insect Proxy Clause: a fly blinked on your behalf.', bylaw: 'Bylaw 12 (was 11)' },
    appeal: { say: 'verdict', card: 'pool', bylaw: 'Bylaw 9(c) (continued from 9(a))' },
    reflection: { say: 'refl:2', card: 'Your reflection blinked twice. You are associated with your reflection.', bylaw: 'Bylaw 4(b) (per Sandra)' },
    cow: { say: 'cow:2', card: 'Out-stared from behind by a cow.', bylaw: 'Bylaw 7 1/2 (see Bylaw 7 1/2)' },
    varnish: { say: 'varnish:2', card: 'Provocation by varnish.', bylaw: 'Bylaw 3 (subsection missing, was never there)' },
    closing: { say: 'closing:4', card: 'The gallery closed. The painting did not.', bylaw: 'Bylaw 6.5 (disputed by 6.4 and 6.6)' },
    forms: { say: 'forms:3', card: "Paperwork reached the painting's weight (17 forms).", bylaw: 'Bylaw 27B/6 (Request for Bylaw 27B/7)' },
    intensity: { say: 'inten:3', card: 'Lost by intensity, a unit the painting made up this morning.', bylaw: 'Bylaw 14(d) (d is for decoration)' },
    wallhook: { say: 'wall:2', card: 'Touched the exhibit (rehung it, correctly).', bylaw: 'Bylaw 5(a) (see 5)' },
    wallelse: { say: 'wall:3', card: 'Touched the exhibit (rehung it, nearby).', bylaw: 'Bylaw 5(a) (see 5)' },
    wallnone: { say: 'wall:4', card: 'Declined to touch the exhibit, which is touching it.', bylaw: 'Bylaw 5(a) (see 5)' },
    cafe: { say: 'cafe:2', card: 'The painting went to the cafe.', bylaw: 'Bylaw 2 (as amended by lunch)' },
    gala: { say: 'verdict', card: "Gerald's ruling.", bylaw: 'Bylaw Tuesday' },
    sudden: { say: 'sudden', card: 'Sudden Death Clause.', bylaw: 'Bylaw 1 (was 100, rounded)' },
    clock: { say: 'clock:1', card: 'The clock wins.', bylaw: 'Bylaw 6.5 (disputed by 6.4 and 6.6)' },
    drift: { say: 'drift2', card: 'Rule 9(c): the painting forfeited for 4 seconds, then won on appeal.', bylaw: 'Bylaw 9(c) (continued from 9(a))' }
  };

  P.registerModule({
    id: 'staring-contest',
    title: 'Staring Contest With a Painting',
    tagline: 'Hold still. The painting has been practising since 1743.',
    icon: '🖼️',
    category: 'game',
    unlockCost: 0,
    tags: ['stillness', 'patience', 'staring'],
    mount(root, api) {
      const el = api.el;
      const K = api.selftest ? 0.1 : 1;
      const NS = 'm-staring-contest-';
      const cl = function (s) { return s.split(' ').map(function (c) { return NS + c; }).join(' '); };
      const E = {};
      let dead = false;
      const num = function (v, d) { return typeof v === 'number' && isFinite(v) ? v : d; };
      const sv = function (k, d) { const v = api.save.get(k, d); return v === undefined || v === null ? d : v; };
      const S = {
        inc: function (n, v) { api.stat.inc('staring-contest.' + n, v === undefined ? 1 : v); },
        max: function (n, v) { api.stat.max('staring-contest.' + n, v); }
      };

      /* persisted */
      let wins = num(sv('wins', 1743), 1743), bestMs = num(sv('best_ms', 0), 0), rematches = num(sv('rematches', 0), 0);
      let roundsTotal = num(sv('rounds', 0), 0), losses = num(sv('losses', 0), 0), appeals = num(sv('appeals', 0), 0), loops = num(sv('loops', 0), 0);
      let blinkDone = !!sv('blinkSecretDone', false), hookDone = !!sv('hookDone', false), dennisClicks = num(sv('dennis', 0), 0), flyLosses = num(sv('flyLosses', 0), 0);
      let honor = api.selftest ? true : !!sv('honor', false);
      let r4bDone = !!sv('r4b', false), r4bN = 0, tierSeen = {}, honorTimes = [], appealTimes = [], lockPresses = 0, hendDone = 0;
      function persist() {
        if (dead) return;
        api.save.set('r4b', r4bDone);
        api.save.set('wins', wins); api.save.set('best_ms', bestMs); api.save.set('rematches', rematches); api.save.set('rounds', roundsTotal);
        api.save.set('losses', losses); api.save.set('appeals', appeals); api.save.set('loops', loops); api.save.set('blinkSecretDone', blinkDone);
        api.save.set('hookDone', hookDone); api.save.set('honor', honor); api.save.set('dennis', dennisClicks); api.save.set('flyLosses', flyLosses);
      }

      /* session state */
      const t0Holder = { v: api.now() };
      let state = 'READY', roundId = 0, scene = null, sessRounds = 0, sessLosses = 0, sessCoolings = 0, lastCoolAt = -1e9;
      let dressed = 0, gameBeat = 1, cheat = 'retro', stareStart = 0, curTier = 0, forceCheat = '', loopFirst = false, endDone = false;
      let goLockUntil = 0, spamBlockUntil = 0, lastSayAt = -1e9, lastInput = api.now(), idleLevel = 0, pickedLabel = 'Rematch (Notarized)';
      let ptr = null, restPtr = null, lastPos = null, anchored = false, ignoreMoveUntil = 0, saccades = 3, travel = 0, moveWin = [];
      let w0 = 0, h0 = 0, drifting = false, escCount = 0, divCount = 0, browDeg = 0, paleCount = 0, quietDone = false, quietRestarts = 0;
      let formsN = 0, visSeq = 0, hookFallen = false, lookOverride = false, levelDeg = hookDone ? 1 : 0, pupRaf = 0, lastHb = [], shown = {}, seen = {};
      let paintX = 0, paintY = 0, paintRot = 0, teaPresses = 0, teaFined = false, prevState = 'READY', coolId = 0, endingT = [], hookT = 0, hbRound = 0;
      let galaDone = false, geraldMet = false, cameoDone = false, toastDone = false, loop1Said = false, ghostRoll = 0, histRows = [], inputs = [], rev = [];
      let hkDir = 0, hkX = 0, hkStart = null, wallActive = false, quietActive = false, flyLoop = null, bagMap = {}, rtT = [], rtI = [], fxT = [];
      let skipClickUntil = 0, ruleN = 0, resizeT = 0, hush = false, capT = 0, pSec = -1;
      const heldAtStart = {};
      const reduced = function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || room.closest('.pm-reduce-motion') !== null; } catch (e) { return false; } };
      const drag = { on: false, sx: 0, sy: 0, bx: 0, by: 0, id: null };
      const quietBag = { n: 0 };
      const tf = function () { return loops >= 1 ? 0.7 : 1; };

      /* ---------- text helpers ---------- */
      function fill(s, v) {
        v = v || {};
        return String(s).replace(/[{%](\w+)[}%]/g, function (m, k) {
          if (v[k] !== undefined && v[k] !== null) return String(v[k]);
          if (k === 'player') return api.player.name;
          if (k === 'count') return api.fmt(api.stat.get('clicks.total'));
          if (k === 'secs') return api.fmt(Math.floor(api.stat.get('time.seconds')));
          if (k === 'wins') return api.fmt(wins);
          if (k === 'px') return '1';
          if (k === 't') return '0.0';
          if (k === 'n') return '1';
          return '';
        }).replace(/\s+/g, ' ').trim();
      }
      function bag(key, from) {
        const arr = from || L[key] || [''];
        let st = bagMap[key];
        if (!st) st = bagMap[key] = { q: [], last: '' };
        if (!st.q.length) st.q = api.shuffle(arr);
        let v = st.q.pop();
        if (v === st.last && st.q.length) { const w = st.q.pop(); st.q.unshift(v); v = w; }
        st.last = v;
        return v;
      }
      function pickLine(ref) {          // 'key' = bag draw, 'key:i' = fixed line
        const p = String(ref).split(':');
        return p.length > 1 ? L[p[0]][Number(p[1])] : bag(p[0]);
      }
      function say(text, o) {
        if (dead || !text) return false;
        o = o || {};
        const pr = o.priority || 0, now = api.now();
        if (pr === 0 && now - lastSayAt < 3000) return false;
        if (hush && pr < 2) return false;                                    // The Minute: nothing is said, on purpose
        const txt = fill(text, o.vars), opts = { mood: o.mood || 'neutral', priority: pr };
        if (o.who) opts.who = o.who;
        if (o.duration) opts.duration = o.duration;
        else if (state === 'STARE' && pr < 2) opts.duration = Math.min(7000, Math.max(3800, 1600 + 55 * txt.length));   // long enough to type AND read
        const ok = api.say(txt, opts);
        if (ok || pr > 0) lastSayAt = now;
        return ok;
      }
      function after(ms, fn) { return api.setTimeout(function () { if (!dead) fn(); }, Math.max(1, ms)); }
      function xref() {                        // callbacks to the cast and to other departments, only for what the player has actually met
        const c = [], f = function (k) { return api.flag.get(k); };
        if (f('metStapler')) c.push('m:staring-contest:xstapler');
        if (f('metToaster') || f('toaster.met')) c.push('m:staring-contest:xtoaster');
        if (f('plantClicked') || f('metDennis')) c.push('m:staring-contest:xplant');
        if (f('sockSeen')) c.push('m:staring-contest:xsock');
        if (f('metGerald')) c.push('m:staring-contest:xgerald');
        return c.length ? api.line(api.pick(c)) : '';
      }
      const SK = function (sec) { return sec * 1000 * K; };
      function setStatus(t) {                  // the placard line, mirrored in a caption over the painting while staring (the placard is below the fold on phones)
        t = fill(t); E.ps.textContent = t;
        const show = state === 'STARE' && !!t && !/^Currently /.test(t);
        E.cap.textContent = show ? t : ''; E.cap.hidden = !show;
        if (capT) api.clearTimeout(capT);
        capT = show ? api.setTimeout(function () { E.cap.hidden = true; }, 7000) : 0;
      }
      function fmtClock(gs) {
        if (!isFinite(gs) || gs < 0) gs = 0;
        const t = Math.floor(gs * 10), m = Math.floor(t / 600), s = Math.floor((t % 600) / 10);
        return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '.' + (t % 10);
      }
      function stareGs() { return Math.max(0, api.now() - stareStart) / (1000 * K); }

      /* ---------- round-bound timers ---------- */
      function rt(ms, fn, states) {
        const rid = roundId;
        const id = api.setTimeout(function () {
          if (dead || rid !== roundId) return;
          if (states ? states.indexOf(state) < 0 : state !== 'STARE') return;
          fn();
        }, Math.max(1, ms));
        rtT.push(id);
        return id;
      }
      const at = function (sec, fn) { return rt(sec * 1000 * K * tf(), fn); };
      const rat = function (sec, fn) { return rt(sec * 1000 * K, fn); };
      const atL = function (sec, fn) { return at(Math.max(sec, 11 / tf()), fn); };
      function every(sec, fn) {
        const rid = roundId;
        const id = api.setInterval(function () { if (dead || rid !== roundId || state !== 'STARE') return; fn(); }, Math.max(8, sec * 1000 * K));
        rtI.push(id);
      }
      function clearRoundTimers() {
        rtT.forEach(function (id) { api.clearTimeout(id); });
        rtI.forEach(function (id) { api.clearInterval(id); });
        rtT = []; rtI = [];
      }

      /* ---------- DOM ---------- */
      const D = function (c) { const kids = Array.prototype.slice.call(arguments, 1); return el.apply(null, ['div', { class: cl(c) }].concat(kids)); };
      const SV = function (tag, a) { const kids = Array.prototype.slice.call(arguments, 2); return el.apply(null, [tag, a || {}].concat(kids)); };
      function eyeSvg(side, cx) {
        const g = SV('g', { class: cl('eye') },
          SV('ellipse', { cx: cx, cy: 128, rx: 14, ry: 8, fill: '#efe6cf', stroke: '#5a3a28', 'stroke-width': 1.5 }),
          (E['pg' + side] = SV('g', { class: cl('eyeg') },
            SV('circle', { cx: cx, cy: 128, r: 6.5, fill: '#6b5a2e' }), SV('circle', { cx: cx, cy: 128, r: 3.2, fill: '#120b08' }), SV('circle', { cx: cx - 1.5, cy: 126, r: 1, fill: '#fff' }))),
          (E['lid' + side] = SV('ellipse', { cx: cx, cy: 128, rx: 15, ry: 9, fill: '#d2a982', opacity: 0 })));
        return g;
      }
      function paintingSvg() {
        const g = function (n) { return NS + n; };
        return SV('svg', { viewBox: '0 0 400 320', preserveAspectRatio: 'xMidYMid slice', class: cl('psvg'), 'aria-hidden': 'true' },
          SV('defs', {},
            SV('radialGradient', { id: g('vg'), cx: '50%', cy: '45%', r: '75%' }, SV('stop', { offset: '40%', 'stop-color': '#5a3620' }), SV('stop', { offset: '100%', 'stop-color': '#1d0f08' })),
            SV('radialGradient', { id: g('fc'), cx: '45%', cy: '35%', r: '70%' }, SV('stop', { offset: '0%', 'stop-color': '#f1d9b8' }), SV('stop', { offset: '100%', 'stop-color': '#c79c72' })),
            SV('linearGradient', { id: g('gl'), x1: '0', y1: '0', x2: '1', y2: '1' }, SV('stop', { offset: '0%', 'stop-color': '#fff', 'stop-opacity': '0' }), SV('stop', { offset: '50%', 'stop-color': '#fff', 'stop-opacity': '.2' }), SV('stop', { offset: '100%', 'stop-color': '#fff', 'stop-opacity': '0' }))),
          SV('rect', { width: 400, height: 320, fill: 'url(#' + g('vg') + ')' }),
          SV('path', { d: 'M20 320 Q40 226 140 214 L260 214 Q360 226 380 320 Z', fill: '#141012' }),
          SV('path', { d: 'M150 232 Q200 300 250 232', fill: 'none', stroke: '#2a2224', 'stroke-width': 3 }),
          SV('rect', { x: 174, y: 188, width: 52, height: 44, fill: '#b98a62' }),
          SV('ellipse', { cx: 200, cy: 226, rx: 80, ry: 19, fill: '#efe6cf', stroke: '#c9bfa5', 'stroke-width': 2 }),
          SV('ellipse', { cx: 200, cy: 224, rx: 66, ry: 14, fill: '#f6eed8', stroke: '#c9bfa5' }),
          SV('ellipse', { cx: 200, cy: 222, rx: 53, ry: 10, fill: '#fbf5e4', stroke: '#c9bfa5' }),
          SV('ellipse', { cx: 200, cy: 100, rx: 46, ry: 52, fill: 'url(#' + g('fc') + ')' }),
          SV('ellipse', { cx: 186, cy: 78, rx: 12, ry: 6, fill: '#fff', opacity: 0.28 }),
          SV('ellipse', { cx: 214, cy: 84, rx: 6, ry: 3, fill: '#fff', opacity: 0.2 }),
          SV('ellipse', { cx: 200, cy: 142, rx: 52, ry: 66, fill: 'url(#' + g('fc') + ')' }),
          SV('path', { d: 'M200 136 Q193 158 201 165 Q211 167 208 160', fill: 'none', stroke: '#8a5a3a', 'stroke-width': 2 }),
          SV('path', { d: 'M184 182 Q200 185 216 182', fill: 'none', stroke: '#6b3a2a', 'stroke-width': 2.6, 'stroke-linecap': 'round' }),
          SV('path', { d: 'M162 124 Q178 110 194 124', fill: 'none', stroke: '#5a3a28', 'stroke-width': 3 }),
          SV('path', { d: 'M206 124 Q222 110 238 124', fill: 'none', stroke: '#5a3a28', 'stroke-width': 3 }),
          eyeSvg('L', 178), eyeSvg('R', 222),
          (E.browL = SV('path', { d: 'M160 108 Q178 98 196 106', fill: 'none', stroke: '#3a2416', 'stroke-width': 4, 'stroke-linecap': 'round', style: 'transform-box:fill-box;transform-origin:50% 50%' })),
          (E.browR = SV('path', { d: 'M204 106 Q222 98 240 108', fill: 'none', stroke: '#3a2416', 'stroke-width': 4, 'stroke-linecap': 'round', style: 'transform-box:fill-box;transform-origin:50% 50%' })),
          SV('g', { class: cl('hat') }, SV('path', { d: 'M168 66 L200 12 L232 66 Z', fill: '#b8801f', stroke: '#1c1417', 'stroke-width': 3 }), SV('circle', { cx: 200, cy: 12, r: 6, fill: '#f26b5b', stroke: '#1c1417', 'stroke-width': 2 })),
          SV('path', { d: 'M20 40 L120 90 L160 60 M300 20 L260 120 L380 160 M60 250 L140 200 M330 280 L270 230 L240 300', fill: 'none', stroke: '#000', 'stroke-width': 0.8, opacity: 0.14 }),
          SV('rect', { class: cl('gloss'), width: 400, height: 320, fill: 'url(#' + g('gl') + ')' }));
      }
      function glowSvg() {
        const eye = function (cx, key) {
          return SV('g', {}, SV('ellipse', { cx: cx, cy: 128, rx: 14, ry: 8, fill: '#fff6cf' }),
            (E[key] = SV('g', { class: cl('eyeg') }, SV('circle', { cx: cx, cy: 128, r: 6.5, fill: '#6b5a2e' }), SV('circle', { cx: cx, cy: 128, r: 3.2, fill: '#120b08' }))));
        };
        return SV('svg', { viewBox: '0 0 400 320', preserveAspectRatio: 'xMidYMid slice', class: cl('glowsvg'), 'aria-hidden': 'true', style: 'width:100%;height:100%;display:block' }, eye(178, 'gL'), eye(222, 'gR'));
      }
      function cowSvg() {
        return SV('svg', { viewBox: '0 0 120 78', class: cl('cowsvg'), 'aria-hidden': 'true' },
          SV('rect', { y: 0, width: 120, height: 78, fill: '#9ccbe8' }),
          SV('ellipse', { cx: 24, cy: 14, rx: 14, ry: 6, fill: '#fff' }), SV('ellipse', { cx: 60, cy: 9, rx: 12, ry: 5, fill: '#fff' }), SV('ellipse', { cx: 98, cy: 16, rx: 13, ry: 6, fill: '#fff' }),
          SV('rect', { y: 40, width: 120, height: 38, fill: '#5b8a3c' }),
          SV('rect', { x: 36, y: 22, width: 48, height: 36, rx: 12, fill: '#f4f0e4', stroke: '#1c1417', 'stroke-width': 2 }),
          SV('ellipse', { cx: 52, cy: 34, rx: 8, ry: 6, fill: '#2a2224' }), SV('ellipse', { cx: 72, cy: 44, rx: 7, ry: 5, fill: '#2a2224' }),
          SV('rect', { x: 42, y: 56, width: 8, height: 16, fill: '#f4f0e4', stroke: '#1c1417', 'stroke-width': 2 }), SV('rect', { x: 70, y: 56, width: 8, height: 16, fill: '#f4f0e4', stroke: '#1c1417', 'stroke-width': 2 }),
          SV('path', { d: 'M60 24 Q66 12 74 18', fill: 'none', stroke: '#1c1417', 'stroke-width': 2.5, 'stroke-linecap': 'round' }));
      }
      function ficusSvg() {
        return SV('svg', { viewBox: '0 0 60 92', 'aria-hidden': 'true' },
          SV('path', { d: 'M30 62 L30 38', stroke: '#5a3a1a', 'stroke-width': 4 }),
          SV('ellipse', { cx: 30, cy: 24, rx: 15, ry: 17, fill: '#3f8a47', stroke: '#1c1417', 'stroke-width': 2 }),
          SV('ellipse', { cx: 14, cy: 42, rx: 12, ry: 8, fill: '#4aa356', stroke: '#1c1417', 'stroke-width': 2 }), SV('ellipse', { cx: 46, cy: 40, rx: 12, ry: 8, fill: '#4aa356', stroke: '#1c1417', 'stroke-width': 2 }),
          SV('path', { d: 'M12 62 L48 62 L43 90 L17 90 Z', fill: '#c8683c', stroke: '#1c1417', 'stroke-width': 3 }));
      }
      function flySvg() {
        return SV('svg', { viewBox: '0 0 14 14', 'aria-hidden': 'true' },
          SV('ellipse', { cx: 5, cy: 5, rx: 4, ry: 2.4, fill: '#cfe8ff', opacity: 0.65 }), SV('ellipse', { cx: 9, cy: 5, rx: 4, ry: 2.4, fill: '#cfe8ff', opacity: 0.65 }),
          SV('ellipse', { cx: 7, cy: 8, rx: 2.6, ry: 4, fill: '#1c1417' }));
      }
      function clockSvg() {
        return SV('svg', { viewBox: '0 0 46 46', class: cl('clocksvg'), 'aria-hidden': 'true' },
          SV('circle', { cx: 23, cy: 23, r: 20, fill: '#f3e6c8', stroke: '#b8801f', 'stroke-width': 4 }),
          SV('path', { d: 'M23 23 L23 9 M23 23 L34 28', stroke: '#1c1417', 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
      }

      E.you = D('clkv', '00:00.0');
      E.pclk = D('pclk', L.units[0]);
      E.tier = D('tier', 'Mild');
      E.ringC = SV('circle', { cx: 29, cy: 29, r: 24, fill: 'none', stroke: '#8fd5b0', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-dasharray': '150.8', 'stroke-dashoffset': '150.8', transform: 'rotate(-90 29 29)' });
      E.wins = el('span', { class: cl('sw') }, 'PAINTING WINS: 1,743');
      E.best = el('span', {}, 'Best stare: none yet');
      E.rem = el('span', {}, 'Rematches: 0');
      E.pips = el('span', { class: cl('pips'), 'aria-hidden': 'true' }, el('span', { class: cl('pip') }), el('span', { class: cl('pip') }), el('span', { class: cl('pip') }));
      E.pipt = el('span', {}, 'Wobbles left: 3 (Sandra is counting)');
      E.foot = el('span', { class: cl('foot') }, '');
      E.hud = D('hud',
        D('clk', D('clkl', 'YOU'), E.you),
        D('ringbox', SV('svg', { viewBox: '0 0 58 58', class: cl('ring'), 'aria-hidden': 'true' }, SV('circle', { cx: 29, cy: 29, r: 24, fill: 'none', stroke: '#2a1520', 'stroke-width': 6 }), E.ringC), E.tier),
        D('clk clkr', D('clkl', 'PAINTING'), E.pclk),
        D('score', E.wins, el('span', {}, E.pips, E.pipt), E.best, E.rem, E.foot));

      E.canvas = D('canvas', paintingSvg(),
        (E.refl = D('refl', '\u{1F9CD}')), D('glass'), (E.cone = D('cone')),
        (E.dust = D('dust', D('mote'), D('mote'), D('mote'), D('mote'), D('mote'), D('mote'))), D('vign'),
        (E.notary = SV('svg', { viewBox: '0 0 74 74', class: cl('notary'), 'aria-hidden': 'true' }, SV('circle', { cx: 37, cy: 37, r: 33, fill: 'none', stroke: '#b9a6e8', 'stroke-width': 5 }), SV('circle', { cx: 37, cy: 37, r: 24, fill: 'none', stroke: '#b9a6e8', 'stroke-width': 2 }), SV('path', { d: 'M24 38 L33 47 L51 27', fill: 'none', stroke: '#b9a6e8', 'stroke-width': 5 }))),
        (E.gone = D('gone', 'BACK IN 5 MIN')),
        (E.zzz = el('div', { class: cl('zzz'), hidden: true, 'aria-hidden': 'true' }, 'z z z')));
      E.paint = D('paint', E.canvas);
      E.hook = SV('svg', { viewBox: '0 0 24 24', class: cl('hook'), 'aria-hidden': 'true' }, SV('circle', { cx: 12, cy: 12, r: 6, fill: '#c8933b', stroke: '#1c1417', 'stroke-width': 2.5 }), SV('path', { d: 'M12 12 L2 24 M12 12 L22 24', stroke: '#c8933b', 'stroke-width': 1.5 }));
      E.pale = D('pale', 'Formerly: a painting.');
      E.grace = D('grace', '3');
      E.stamp = D('stamp', 'PAINTING WINS');
      E.banner = el('div', { class: cl('banner'), hidden: true }, 'PAINTING FORFEITS');
      E.regard = el('div', { class: cl('regard'), hidden: true }, 'Mutual regard: 3 seconds. Not scored. Not scoreable.');
      E.cap = el('div', { class: cl('cap'), hidden: true, 'aria-hidden': 'true' });
      E.hanger = D('hanger', E.hook, E.pale, E.paint, E.grace, E.stamp, E.banner, E.regard, E.cap);
      E.cowEl = D('cow', cowSvg(), D('cowplate', 'MEADOW WITH MILD COW (c. 1822)'));
      E.rail = D('rail', E.cowEl);
      E.fly = el('div', { class: cl('fly'), hidden: true, 'aria-hidden': 'true' }, flySvg());
      E.dennis = el('button', { class: cl('dennis'), type: 'button', 'aria-label': 'Dennis, a plant', 'data-bait': 'dennis' }, ficusSvg(), D('medal', '\u{1F3C5}'));
      E.walk = D('walk');
      E.gerald = D('gerald', el('span', { 'aria-hidden': 'true' }, '\u{1F954}'), D('tie'), D('chairb'));
      E.prompt = el('div', { class: cl('prompt'), hidden: true }, el('div', {}, 'Would you like to blink?'),
        el('button', { type: 'button', 'data-bait': 'form' }, 'YES'), el('button', { type: 'button', 'data-bait': 'form' }, 'NO'), el('button', { type: 'button', 'data-bait': 'form' }, 'REMIND ME LATER'));
      E.free = el('button', { class: cl('bait'), type: 'button', hidden: true, 'data-bait': 'free' }, 'FREE MEH (DO NOT CLICK)');
      E.sign = el('div', { class: cl('sign'), hidden: true }, L.idle[5]);
      E.quartet = el('div', { class: cl('quartet'), hidden: true, 'aria-hidden': 'true' }, '\u{1F3BB}\u{1F3BB}\u{1F3BA}\u{1F941}');
      E.chair = D('chair');
      E.sock = el('div', { class: cl('sock'), hidden: true, 'aria-hidden': 'true' }, '\u{1F9E6}');
      E.cast = el('div', { class: cl('cast'), hidden: true, 'aria-hidden': 'true' });
      E.art = D('art', D('wain'), D('floor'), E.hanger, D('wclock', clockSvg(), D('pend')), E.dennis, D('mop', D('mop-m'), D('mop-h'), D('mop-b')), E.walk, D('rope'), D('bunt', '\u{1F6A9}\u{1F6A9}\u{1F6A9}\u{1F6A9}\u{1F6A9}\u{1F6A9}\u{1F6A9}\u{1F6A9}'), E.gerald, E.prompt, E.free, E.sign, E.quartet, E.chair, E.sock, E.cast);
      E.go = el('button', { class: cl('go'), type: 'button', 'aria-disabled': 'false', onclick: onGo }, 'BEGIN STARING');
      E.tea = el('button', { class: cl('tea'), type: 'button', hidden: true, 'aria-label': 'Tea', onclick: onTea }, '\u{1F375}');
      E.ctl = D('ctl', E.go, E.tea);
      E.verdict = el('div', { class: cl('verdict'), hidden: true });
      E.cert = el('div', { class: cl('cert'), hidden: true });
      E.honor = el('button', { class: cl('honor'), type: 'button', onclick: onHonor }, honorLabel());
      E.main = D('main', E.rail, E.art, E.ctl, E.honor, E.cert, E.verdict);

      E.ps = el('div', { class: cl('ps'), 'aria-live': 'polite' }, 'Currently winning.');
      E.rules = el('ul', { class: cl('rules') });
      E.rc = D('rc', 'Rules: 0');
      E.tray = D('tray', D('trayl', 'Forms pending: 0'));
      E.trayl = E.tray.firstChild;
      E.histl = el('ol');
      E.artist = D('pa', L.artists[0]);
      E.plac = D('plac',
        D('pt', 'PORTRAIT OF A MAN WHO HAS JUST REMEMBERED SOMETHING. Oil on panel, 1743 (Revised 1744).'), E.artist,
        E.rules, E.ps, E.tray, E.rc,
        el('details', { class: cl('hist') }, el('summary', {}, 'Past verdicts'), E.histl));
      E.dark = D('dark');
      E.glow = D('glow', glowSvg());
      E.shutT = D('shut t');
      E.shutB = D('shut b');
      const room = D('room', E.hud, E.main, E.plac, E.fly, E.dark, E.glow, E.shutT, E.shutB);
      room.setAttribute('data-state', 'READY');
      root.appendChild(room);
      api.setTitle('Staring Contest With a Painting');
      const PAINT_SEL = '.' + cl('paint');

      /* ---------- painting plumbing ---------- */
      function setPupils(dx, dy) {
        if (!isFinite(dx) || !isFinite(dy)) return;
        const t = 'translate(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px)';
        [E.pgL, E.pgR, E.gL, E.gR].forEach(function (p) { if (p) p.style.transform = t; });
      }
      function trackPupils() {
        pupRaf = 0;
        if (dead || lookOverride || !ptr) return;
        const c = E.canvas.getBoundingClientRect();
        const cx = c.left + c.width * 0.5, cy = c.top + c.height * 0.4;
        const dx = ptr.x - cx, dy = ptr.y - cy, len = Math.sqrt(dx * dx + dy * dy);
        if (!(len > 0)) { setPupils(0, 0); return; }
        const k = Math.min(1, len / 220) * 4;
        setPupils(dx / len * k, dy / len * k);
      }
      function schedPupils() { if (!pupRaf) pupRaf = api.requestAnimationFrame(trackPupils); }
      function setLids(on, which) {
        if (which !== 'R') E.lidL.setAttribute('opacity', on ? '1' : '0');
        if (which !== 'L') E.lidR.setAttribute('opacity', on ? '1' : '0');
      }
      function flashLids(ms, which) { setLids(true, which); after(ms, function () { setLids(false, which); }); }
      function setPaint(x, y, r, anim) {
        paintX = x; paintY = y; paintRot = r;
        E.paint.style.transition = anim ? 'transform .55s cubic-bezier(.3,1.5,.5,1)' : 'none';
        E.paint.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + (r + levelDeg) + 'deg)';
      }
      function setBrow() {
        const d = browDeg + (loops >= 1 ? 1 : 0);
        E.browL.style.transform = 'rotate(' + d + 'deg)';
        E.browR.style.transform = 'rotate(' + (-d) + 'deg)';
      }
      function setDrag(on) {                  // the fallen painting can be re-hung by pointer OR keyboard (Enter / Space)
        const p = E.paint;
        rc(p, 'draggable', on);
        if (on) { p.setAttribute('tabindex', '0'); p.setAttribute('role', 'button'); p.setAttribute('aria-label', 'Painting, fallen. Press Enter to hang it back up'); try { p.focus({ preventScroll: true }); } catch (e) { /* no focus */ } }
        else ['tabindex', 'role', 'aria-label'].forEach(function (a) { p.removeAttribute(a); });
      }
      function restart(node, cls) { node.classList.remove(cl(cls)); void node.offsetWidth; node.classList.add(cl(cls)); }
      function rc(node, cls, on) { node.classList.toggle(cl(cls), !!on); }
      function shake(node) { if (node) restart(node, 'shake'); }
      function paintPips() {
        const pips = E.pips.children;
        for (let i = 0; i < 3; i++) pips[i].classList.toggle(cl('off'), i >= saccades);
        E.pipt.textContent = 'Wobbles left: ' + saccades + ' (Sandra is counting)';
      }
      function paintScore() {
        E.wins.textContent = 'PAINTING WINS: ' + api.fmt(wins);
        E.best.textContent = bestMs > 0 ? 'Best stare: ' + (bestMs / 1000).toFixed(1) + ' s (provisional)' : 'Best stare: none yet';
        E.rem.textContent = 'Rematches: ' + api.fmt(rematches);
        E.foot.textContent = losses >= 15 ? L.foot[4] : losses >= 10 ? L.foot[3] : losses >= 6 ? L.foot[2] : losses >= 3 ? L.foot[1] : losses >= 1 ? L.foot[0] : '';
      }
      function setRing(gs) {
        const p = Math.min(1, gs / 60);
        E.ringC.setAttribute('stroke-dashoffset', (150.8 * (1 - p)).toFixed(1));
      }
      function paintHist() {
        E.histl.textContent = '';
        histRows.forEach(function (r) { E.histl.appendChild(el('li', {}, r)); });
      }
      function paintRules() { E.rc.textContent = 'Rules: ' + E.rules.children.length; }

      /* ---------- beats ---------- */
      function elapsedGs() { return (api.now() - t0Holder.v) / (1000 * K); }
      function beatAt() {
        const e = elapsedGs() / tf();
        for (let i = 1; i < BOUNDS.length; i++) if (e < BOUNDS[i]) return i;
        return 11;
      }
      function dressBeat(b, announce, delay) {
        room.classList.add(cl('b' + b));
        (L.rules[b] || []).forEach(function (r) {
          if (/^Rule 4b/.test(r)) {
            E.rules.appendChild(el('li', {}, el('button', { class: cl('r4b'), type: 'button', onclick: onR4b }, r)));
            if (r4bDone) E.rules.appendChild(el('li', {}, L.r4bFound[0]));
          } else E.rules.appendChild(el('li', {}, r));
        });
        while (E.rules.children.length > 14) E.rules.removeChild(E.rules.firstChild);
        paintRules();
        if (b === 6) E.trayl.textContent = 'Forms pending: ' + formsN;
        if (announce && b === 5) { if (delay) after(delay, threeMinutes); else threeMinutes(); }
        else if (announce && b > 1) {
          const line = b === 9 ? L.cafe[3] : L.intros[b];
          if (line) { if (delay) after(delay, function () { say(line, { priority: 1, mood: b === 8 ? 'confused' : 'smug' }); }); else say(line, { priority: 1, mood: b === 8 ? 'confused' : 'smug' }); }
        }
      }
      function threeMinutes() {                       // the 3:00 mark: a performance review nobody requested
        const c = E.cert;
        c.textContent = '';
        c.appendChild(el('div', { class: cl('rvh') }, 'THREE-MINUTE PERFORMANCE REVIEW'));
        L.reviewCard.forEach(function (r) { c.appendChild(el('div', {}, r)); });
        c.hidden = false; api.sfx('stamp');
        say(L.review[0], { priority: 2, mood: 'smug' });
        after(SK(4.5), function () { say(L.review[1], { priority: 1, mood: 'proud' }); });
        after(SK(9), function () { api.award(2, 'Review Bonus'); say(L.review[2], { priority: 1, mood: 'smug' }); });
        after(SK(16), function () { if (scene !== 'ending') c.hidden = true; });
      }
      function onR4b() {
        if (dead) return;
        noteActivity();
        if (state === 'STARE' && !honor) return;
        if (r4bDone) { say(L.r4bFound[1], { priority: 1, mood: 'smug' }); return; }
        r4bN++; api.sfx('pop');
        if (r4bN < 3) { say(L.r4b[r4bN - 1], { priority: 1, mood: 'confused' }); return; }
        r4bDone = true; persist(); S.inc('rule4b');
        E.rules.appendChild(el('li', {}, L.r4bFound[0])); paintRules();
        say(L.r4bFound[1], { priority: 2, mood: 'proud' });
        api.achieve('staring-contest.rule4b'); api.sfx('fanfare'); api.confetti();
      }
      function syncBeat() {
        const b = Math.min(10, beatAt());
        gameBeat = b;
        let n = 0;
        while (dressed < b) { dressed++; const ann = loops === 0 && dressed >= b - 1; dressBeat(dressed, ann, ann && n > 0 ? SK(4) : 0); if (ann) n++; }    // a long round can straddle a beat: announce the last two, in order
      }

      /* ---------- fx: every stage effect is a start/stop pair so cheats and the gala can share them ---------- */
      const fx = {};
      const fly = { on: false, x: -30, y: 60, vx: 0, vy: 0, mode: 'enter', raf: 0, last: 0 };
      function roomXY(r) { const rr = room.getBoundingClientRect(); return { x: r.left - rr.left, y: r.top - rr.top, w: r.width, h: r.height }; }
      function flyTarget() {
        const rr = room.getBoundingClientRect();
        if (fly.mode === 'nose') { const c = roomXY(E.canvas.getBoundingClientRect()); return { x: c.x + c.w * 0.5, y: c.y + c.h * 0.47 }; }
        if (fly.mode === 'hat') { const c = roomXY(E.gerald.getBoundingClientRect()); return { x: c.x + c.w * 0.5, y: c.y + 2 }; }
        if (fly.mode === 'cursor') {
          if (ptr) return { x: ptr.x - rr.left, y: ptr.y - rr.top };
          const g = roomXY(E.go.getBoundingClientRect());
          return { x: g.x + g.w / 2, y: g.y + g.h / 2 };
        }
        return { x: rr.width * 0.45, y: rr.height * 0.3 };
      }
      function flyStep(ts) {
        fly.raf = 0;
        if (dead || !fly.on) return;
        const dt = fly.last ? Math.min(0.05, Math.max(0.001, (ts - fly.last) / 1000)) : 0.016;
        fly.last = ts;
        const t = flyTarget();
        const near = fly.mode === 'nose' || fly.mode === 'hat';
        const kk = near ? 5 : 2.2, jit = near ? 60 : 340;
        fly.vx = fly.vx * 0.92 + ((t.x - fly.x) * kk + (api.rand() - 0.5) * jit) * dt * 6;
        fly.vy = fly.vy * 0.92 + ((t.y - fly.y) * kk + (api.rand() - 0.5) * jit) * dt * 6;
        const sp = Math.sqrt(fly.vx * fly.vx + fly.vy * fly.vy);
        if (sp > 260) { fly.vx = fly.vx / sp * 260; fly.vy = fly.vy / sp * 260; }
        fly.x += fly.vx * dt; fly.y += fly.vy * dt;
        if (isFinite(fly.x) && isFinite(fly.y)) E.fly.style.transform = 'translate(' + fly.x.toFixed(1) + 'px,' + fly.y.toFixed(1) + 'px)';
        fly.raf = api.requestAnimationFrame(flyStep);
      }
      fx.fly = {
        start: function (mode) {
          fly.mode = mode || 'enter';
          rc(E.fly, 'sash', flyLosses >= 3); rc(E.fly, 'collar', flyLosses >= 5); rc(E.fly, 'hatted', loops >= 1);
          if (fly.on) return;
          fly.on = true; fly.last = 0; fly.vx = 80; fly.vy = 20; fly.x = -24; fly.y = 80 + api.rand() * 80;
          E.fly.hidden = false;
          fly.raf = api.requestAnimationFrame(flyStep);
        },
        mode: function (m) { fly.mode = m; },
        stop: function () {
          fly.on = false;
          if (fly.raf) { api.cancelAnimationFrame(fly.raf); fly.raf = 0; }
          E.fly.hidden = true;
        }
      };
      fx.refl = {
        show: function () { rc(E.refl, 'on', true); },
        yawn: function () { fx.refl.show(); restart(E.refl, 'yawn'); },
        wave: function () { fx.refl.show(); restart(E.refl, 'wave'); },
        blink: function () { fx.refl.show(); restart(E.refl, 'blinkr'); },
        hide: function () { E.refl.className = cl('refl'); }
      };
      fx.cow = {
        slide: function () { rc(room, 'cowfront', true); api.sfx('whoosh'); },
        stop: function () { rc(room, 'cowfront', false); }
      };
      fx.lights = {
        on: function () {
          const rr = room.getBoundingClientRect(), c = E.canvas.getBoundingClientRect(), s = E.glow.style;
          s.left = (c.left - rr.left) + 'px'; s.top = (c.top - rr.top) + 'px'; s.width = c.width + 'px'; s.height = c.height + 'px';
          E.dark.classList.add(cl('on')); E.glow.classList.add(cl('on')); E.dennis.classList.add(cl('lit'));
          api.sfx('buzz');
        },
        off: function () { E.dark.classList.remove(cl('on')); E.glow.classList.remove(cl('on')); E.dennis.classList.remove(cl('lit')); }
      };
      fx.forms = {
        spawn: function () {
          if (formsN >= 17) return;
          formsN++;
          const f = el('div', { class: cl('form'), style: { left: Math.floor(api.rand() * 170) + 'px', top: Math.floor(10 + api.rand() * 44) + 'px', transform: 'rotate(' + Math.floor(api.rand() * 50 - 25) + 'deg)' } }, L.formHead[formsN % L.formHead.length]);
          E.tray.appendChild(f);
          E.trayl.textContent = 'Forms pending: ' + formsN;
          api.sfx('tick');
        },
        flood: function (secs) {
          const n = 17 - formsN, step = Math.max(8, secs * 1000 * K / Math.max(1, n));
          let i = 0;
          const id = api.setInterval(function () { if (dead || i++ >= n || state !== 'STARE') { api.clearInterval(id); return; } fx.forms.spawn(); }, step);
          rtI.push(id);
        },
        clear: function () {
          while (E.tray.children.length > 1) E.tray.removeChild(E.tray.lastChild);
          formsN = 0; E.trayl.textContent = 'Forms pending: 0';
        }
      };
      fx.prompt = { show: function () { E.prompt.hidden = false; }, hide: function () { E.prompt.hidden = true; } };
      fx.rope = { drop: function () { const r = room.querySelector('.' + cl('rope')); if (r) { r.classList.add(cl('drop')); api.sfx('boing'); } }, reset: function () { const r = room.querySelector('.' + cl('rope')); if (r) r.classList.remove(cl('drop')); } };
      fx.wall = {
        fall: function () {
          wallActive = true;
          const dy = Math.min(E.art.clientHeight * 0.4, 150);
          setPaint((api.rand() - 0.5) * 40, dy, 13, true);
          rc(room, 'palevis', true); setDrag(true);
          after(380, function () { if (wallActive) { shake(E.art); api.sfx('boing'); } });
        },
        reset: function () {
          if (!wallActive && !hookFallen) return;
          wallActive = false;
          setDrag(false);
          if (!hookFallen) { setPaint(0, 0, 0, true); if (paleCount === 0) rc(room, 'palevis', false); }
        }
      };
      fx.cafe = {
        leave: function () { rc(E.canvas, 'away', true); setLids(false); },
        stop: function () { rc(E.canvas, 'away', false); while (E.walk.firstChild) E.walk.removeChild(E.walk.firstChild); },
        visitor: function (child) {
          if (E.walk.children.length >= 12) return;
          visSeq++;
          const n = child ? 12 : (visSeq % 11) + 1, secs = child ? 2.1 : 1.2 + Math.floor(api.rand() * 24) / 10;
          const v = el('span', { class: cl('vis'), style: { left: '0%' } }, child ? '\u{1F9D2}' : api.pick(['\u{1F9CD}', '\u{1F6B6}', '\u{1F9D3}']));
          E.walk.appendChild(v);
          const target = 30 + api.rand() * 18;
          after(40, function () { v.style.left = target + '%'; });
          after(2300, function () {
            if (!v.parentNode) return;
            const rev1 = child ? 'She nodded.' : bag('visit');
            const review = child ? L.child[0] : 'Visitor ' + n + ' looked at you for ' + secs.toFixed(1) + " seconds. Review: '" + rev1 + "'";
            v.appendChild(el('span', { class: cl('bub') }, secs.toFixed(1) + ' s: ' + rev1));
            setStatus(review);
            S.inc('exhibits');
            if (api.stat.get('staring-contest.exhibits') >= 3) api.achieve('staring-contest.exhibit');
            if (child) { say(L.child[1], { priority: 1, mood: 'proud' }); api.sfx('ding'); } else if (visSeq % 2 === 0) say(review, { mood: 'smug' });
            api.sfx('pop');
          });
          after(2300 + SK(secs) + 300, function () { v.style.left = '112%'; });
          after(2300 + SK(secs) + 2800, function () { if (v.parentNode) v.parentNode.removeChild(v); });
        }
      };
      fx.int = {
        vig: function (v) { room.style.setProperty('--vig', String(v)); },
        big: function (on) { rc(E.canvas, 'big', on); },
        notary: function (on) { rc(E.notary, 'on', on); },
        reset: function () { fx.int.big(false); fx.int.notary(false); room.style.removeProperty('--vig'); }
      };
      function stopAllFx() {
        fx.fly.stop(); fx.refl.hide(); fx.cow.stop(); fx.lights.off(); fx.forms.clear(); fx.prompt.hide(); fx.rope.reset();
        fx.wall.reset(); fx.cafe.stop(); fx.int.reset(); E.free.hidden = true; E.banner.hidden = true; E.banner.textContent = 'PAINTING FORFEITS'; E.regard.hidden = true;
        E.sock.hidden = true; rc(E.sock, 'walkon', false); hush = false; E.cast.hidden = true; E.cast.textContent = '';
        if (resizeT) { api.clearTimeout(resizeT); resizeT = 0; }
        if (capT) { api.clearTimeout(capT); capT = 0; } E.cap.hidden = true;
        ['q1', 'q2', 'q3'].forEach(function (q) { rc(room, q, false); });
        setLids(false); lookOverride = false; quietActive = false; drifting = false; E.grace.classList.remove(cl('on'));
        rc(E.canvas, 'big', false); drag.on = false; schedPupils();
      }

      /* ---------- state ---------- */
      function goText() {
        if (scene === 'ending') return endDone ? 'Rematch (At Your Convenience)' : 'Skip the ceremony';
        if (loopFirst) return 'Round 1 (Again)';
        if (sessRounds === 0) return 'BEGIN STARING';
        const fixed = ['Rematch', 'Rematch (Again)', 'Rematch (Respectfully)', 'Rematch (Through Gritted Teeth)', 'Rematch (Theoretical)'];
        return sessRounds <= fixed.length ? fixed[sessRounds - 1] : pickedLabel;
      }
      function paintGo() {
        if (state === 'COOLING') { E.go.hidden = true; E.tea.hidden = false; return; }
        E.go.hidden = false; E.tea.hidden = true;
        let label = goText(), dis = api.now() < goLockUntil;
        if (dis) after(goLockUntil - api.now() + 20, function () { if (state !== 'COOLING') paintGo(); });
        if (state === 'GRACE') { label = 'Eyes Open'; dis = true; } else if (state === 'STARE') { label = 'Staring...'; dis = true; }
        E.go.textContent = label;
        E.go.setAttribute('aria-disabled', dis ? 'true' : 'false');
      }
      function setState(s) { state = s; room.setAttribute('data-state', s); paintGo(); }
      function focusGo() { if (!E.go.hidden && !dead) { try { E.go.focus({ preventScroll: true }); } catch (e) { /* no focus */ } } }

      function pickCheat() {
        if (forceCheat) { const f = forceCheat; forceCheat = ''; return f; }
        if (sessRounds <= 1 && loops === 0) { seen.retro = true; return 'retro'; }
        const b = gameBeat;
        if (b >= 10) return 'gala';
        if (loops === 0 && sessRounds === 2 && !seen.fly) { seen.fly = true; return 'fly'; }       // round 2 must not be round 1 again: the fly arrives early
        if (b >= 3 && api.chance(0.04)) return 'clock';
        if (b >= 4 && b < 10 && sessRounds > 3 && api.chance(1 / 12)) return 'stillness';
        const feat = FEATURED[b];
        if (!seen[feat]) { seen[feat] = true; return feat; }
        if (api.chance(0.75)) return feat;
        const pool = Object.keys(CHEATS).filter(function (k) { return CHEATS[k].gate <= b && k !== 'gala' && k !== 'stillness'; });
        return api.pick(pool) || 'retro';
      }
      function setUnit() { E.pclk.textContent = bag('units'); }
      function setArtist() { E.artist.textContent = loops >= 1 ? L.artists[5] : L.artists[Math.min(4, Math.max(0, sessRounds - 1))]; }

      function startRound(silent) {
        clearRoundTimers(); stopAllFx(); hideVerdict();
        roundId++;
        try { E.hud.scrollIntoView({ block: 'nearest' }); } catch (e) { /* no scrolling */ }   // the verdict card may have scrolled the clocks away
        syncBeat();
        if (!silent) { sessRounds++; roundsTotal++; }
        if (paleCount > 0 && !silent) { paleCount = Math.min(3, paleCount + 1); }
        if (paleCount > 0) E.pale.textContent = L.pale[Math.min(2, paleCount - 1)];
        cheat = pickCheat();
        browDeg = 0; setBrow(); saccades = 3; travel = 0; moveWin = []; drifting = false; curTier = 0; hbRound = 0;
        E.tier.textContent = GLARE_NAMES[0]; setRing(0); E.you.textContent = '00:00.0'; paintPips();
        setUnit(); setArtist();
        E.ps.textContent = 'Currently ' + FLOWERS[0] + '.'; pSec = -1;
        setState('GRACE');
        const gm = api.selftest ? 500 : 3000;
        E.grace.classList.add(cl('on'));
        const num2 = function (n) { E.grace.textContent = ''; E.grace.appendChild(el('span', { class: cl('grace-n') }, String(n))); if (n < 3) api.sfx('tick'); };
        num2(3);
        rt(gm / 3, function () { num2(2); }, ['GRACE']);
        rt(gm * 2 / 3, function () { num2(1); }, ['GRACE']);
        rt(gm, beginStare, ['GRACE']);
        if (!silent && (sessRounds === 1 || api.chance(0.7))) say(sessRounds === 1 ? L.grace1[0] : sessRounds % 3 === 0 ? bag('accept') : bag('grace'), { priority: 1 });
        api.sfx('blip');
        persist(); paintScore();
      }

      function beginStare() {
        E.grace.textContent = ''; E.grace.appendChild(el('span', { class: cl('grace-n') }, 'STARE'));       // the clock is live: say so
        after(Math.max(120, 700 * K), function () { if (state === 'STARE') E.grace.classList.remove(cl('on')); });
        setState('STARE');
        stareStart = api.now(); anchored = false; lastPos = null; restPtr = ptr ? { x: ptr.x, y: ptr.y } : null;
        w0 = window.innerWidth; h0 = window.innerHeight; ignoreMoveUntil = 0;
        every(5, dividend);
        every(7.5, heartbeat);
        GLARE.forEach(function (s, i) { rat(s, function () { glare(i + 1); }); });
        rat(60, function () { lose('sudden'); });
        rat(10, driftCheck);
        if (gameBeat >= 3 && (api.chance(0.6) || gameBeat === 7)) rat(5, restingLine);
        if (api.chance(1 / 40)) rat(6 + api.rand() * 14, function () { wink(); });
        if (api.chance(1 / 12)) rat(41.2, function () { say(L.ghost[0], { priority: 1, mood: 'smug' }); });
        if (gameBeat <= 2 && api.chance(0.6)) rat(5, function () { say(bag('early'), { priority: 1, mood: 'smug' }); });
        if (gameBeat >= 2 && api.chance(1 / 22)) rat(7 + api.rand() * 18, hendrik);
        if (gameBeat >= 2 && api.chance(1 / 30)) rat(6 + api.rand() * 18, sockCross);
        if (gameBeat >= 2 && api.chance(0.35)) rat(12 + api.rand() * 18, showFree);
        if (gameBeat >= 3 && loops === 0 && cheat !== 'fly' && cheat !== 'gala' && api.chance(0.15)) at(6 + api.rand() * 5, function () { fx.fly.start('cursor'); });
        if (honor && cheat !== 'cafe' && cheat !== 'clock' && cheat !== 'stillness') honorGag();
        (RUN[cheat] || RUN.retro)();
        S.inc('cheats_seen');
      }
      function honorGag() {                   // the Honor System binds the player only; the painting is on a different system
        rat(3.5, function () { if (!lookOverride) { lookOverride = true; setPupils(4, -1); } });
        rat(6.5, function () { if (lookOverride && !quietActive) { lookOverride = false; setPupils(0, 0); schedPupils(); } });
        rat(8, function () { fx.refl.yawn(); });
        rat(10, function () {
          if (drifting) return;
          showBanner('THE HONOR SYSTEM APPLIES TO YOU ONLY', 4); say(L.honorGag[0], { priority: 1, mood: 'smug' });
          if (!sv('honorGag', false)) { api.save.set('honorGag', true); api.award(1, 'Double Standard'); api.achieve('staring-contest.standard'); }
        });
      }

      function dividend() {
        api.award(0.2, 'Stillness Dividend');
        divCount++;
        if (divCount % 4 === 1) say(bag('dividend'), { priority: 0, mood: 'proud' });
      }
      function glare(tier) {
        curTier = tier;
        S.max('glare_max', tier);
        E.tier.textContent = GLARE_NAMES[tier - 1];
        const gl = (tierSeen[tier] = (tierSeen[tier] || 0) + 1) % 2 === 1 ? L.glare[tier - 1] : L.glareB[tier - 1];
        if (tier < 3) setStatus(gl); else say(gl, { priority: tier === 6 ? 2 : 1, mood: tier >= 4 ? 'smug' : 'neutral' });
        api.sfx('tick');
        if (tier === 3) api.achieve('staring-contest.withering');
      }
      function restingLine() {
        if (!restPtr) return;
        const x = restPtr.x, y = restPtr.y, inR = function (n) { const r = n.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; };
        const c = E.canvas.getBoundingClientRect(), rr = room.getBoundingClientRect();
        const eyeY = c.top + c.height * 0.4, ex1 = c.left + c.width * 0.445, ex2 = c.left + c.width * 0.555;
        let zone = 'wall';
        if (Math.min(Math.hypot(x - ex1, y - eyeY), Math.hypot(x - ex2, y - eyeY)) < 24) zone = 'eye';
        else if (inR(E.plac)) zone = 'placard';
        else if (gameBeat >= 3 && inR(room.querySelector('.' + cl('wclock')))) zone = 'clock';
        else if (Math.min(x - rr.left, rr.right - x) < 40 && Math.min(y - rr.top, rr.bottom - y) < 40) zone = 'corner';
        else if (inR(E.canvas)) zone = Math.abs(x - (c.left + c.width / 2)) < c.width * 0.15 ? 'face' : 'frame';
        else if (inR(E.paint)) zone = 'frame';
        say(L.rest[zone], { priority: 1, mood: 'smug' });
      }
      function heartbeat() {
        if (hush) return;
        const kinds = ['flicker', 'dust', 'cough', 'brow', 'placard', 'aside', 'pupil'];
        const ok = kinds.filter(function (k) { return lastHb.indexOf(k) < 0; });
        const k = api.pick(ok) || 'dust';
        lastHb.push(k); if (lastHb.length > 3) lastHb.shift();
        hbRound++;
        if (k === 'flicker') { restart(E.cone, 'flick'); setStatus(bag('flicker')); }
        else if (k === 'dust') { restart(E.dust, 'dustgo'); setStatus(bag('dust')); }
        else if (k === 'cough') { api.sfx('tick'); setStatus(bag('cough')); }
        else if (k === 'brow') { browDeg = Math.min(6, browDeg + 1); setBrow(); const bl = bag('brow'); setStatus(bl); say(bl, { priority: 0 }); }
        else if (k === 'placard') { setStatus(bag('placardw')); after(2400, function () { if (state === 'STARE') setStatus('Currently ' + FLOWERS[hbRound % FLOWERS.length] + '.'); }); }
        else if (k === 'pupil') { if (!lookOverride) setPupils(api.rand() * 2 - 1, api.rand() * 2 - 1); }
        else { const x = api.chance(0.3) ? xref() : ''; say(x || bag('aside'), { priority: 0, mood: 'smug' }); }
      }
      function wink() {
        flashLids(260, 'L'); wins += 1; paintScore();
        say(bag('wink'), { priority: 1, mood: 'confused' }); api.sfx('pop');
      }
      function showBanner(text, secs) {
        if (drifting) return;
        E.banner.textContent = text; E.banner.hidden = false;
        rt(SK(secs), function () { if (!drifting) { E.banner.hidden = true; E.banner.textContent = 'PAINTING FORFEITS'; } });
      }
      function hendrik() {
        if (drifting || quietActive || hush) return;
        hendDone++; S.inc('hendrik');
        showBanner('THE ARTIST HAS LOOKED IN', 4);
        say(bag('hend'), { priority: 2, mood: 'confused' }); api.sfx('bell');
        after(SK(4.5), function () { if (state === 'STARE') { api.award(0.5, "Artist's Royalty"); say(L.hendPay[0], { priority: 1, mood: 'smug' }); } });
      }
      function sockCross() {
        if (quietActive || hush) return;
        const seenBefore = !!api.flag.get('sockSeen');
        S.inc('socks'); api.flag.set('sockSeen', true);   // lint-ignore: shared cross-module flag
        E.sock.hidden = false; rc(E.sock, 'walkon', false); void E.sock.offsetWidth; rc(E.sock, 'walkon', true);
        say(seenBefore && api.chance(0.6) ? L.sock[2] : bag('sock'), { priority: 1, mood: 'confused' });
        api.sfx('whoosh');
        after(7400, function () { E.sock.hidden = true; rc(E.sock, 'walkon', false); });
      }
      function driftCheck() {
        if (honor || saccades !== 3 || !(travel >= 3 && travel <= 12) || drifting) return;
        drifting = true;
        E.banner.textContent = 'PAINTING FORFEITS'; E.banner.hidden = false; api.sfx('fanfare');
        say(L.drift1[0], { priority: 2, mood: 'confused' });
        rat(4, function () { drifting = false; E.banner.hidden = true; api.achieve('staring-contest.tectonic'); lose('drift'); });
      }

      /* ---------- cheats ---------- */
      const RUN = {
        retro: function () { atL(12, function () { lose('retro'); }); },
        fly: function () {
          at(4, function () { fx.fly.start('enter'); say(L.fly[0], { priority: 1, mood: 'confused' }); }); at(8, function () { fx.fly.mode('nose'); setStatus(L.fly[1]); });
          at(11, function () { fx.fly.mode('cursor'); say(L.fly[2], { priority: 1, mood: 'smug' }); }); at(12.7, function () { say(L.fly[4], { priority: 1, mood: 'smug' }); });
          at(14, function () { say(L.fly[3], { priority: 1, mood: 'confused' }); }); atL(15, function () { lose('fly'); });
        },
        appeal: function () {
          const pick = bag('pool');
          at(16, function () { say(bag('poolMid'), { priority: 1, mood: 'smug' }); }); at(27, function () { say(bag('poolMid'), { priority: 1, mood: 'confused' }); });
          atL(30 + api.rand() * 15, function () { lose('appeal', { pool: pick }); });
        },
        reflection: function () {
          at(3, fx.refl.show); at(7, function () { say(L.refl[2], { priority: 1, mood: 'smug' }); });
          at(11, function () { fx.refl.yawn(); say(L.refl[0], { priority: 1, mood: 'confused' }); }); at(14, function () { fx.refl.wave(); say(L.refl[1], { priority: 1, mood: 'smug' }); });
          at(16, fx.refl.blink); atL(17, function () { lose('reflection'); });
        },
        cow: function () {
          at(4, function () { fx.cow.slide(); say(L.cow[0], { priority: 1, mood: 'proud' }); }); at(9, function () { say(L.cow[1], { priority: 1, mood: 'smug' }); });
          at(14, function () { say(L.cow[2], { priority: 1, mood: 'proud' }); }); atL(19, function () { lose('cow'); });
        },
        varnish: function () {
          at(22, function () { flashLids(120); api.sfx('pop'); say(L.varnish[0], { priority: 1, mood: 'confused' }); });
          at(23.2, function () {
            say(L.varnish[1], { priority: 1, mood: 'panic' });
            let n = 0;
            const calm = reduced(), cap = calm ? 6 : 80;               // the flicker is JS-driven, so it honours reduced motion itself: a slow blink, not 13 Hz
            const id = api.setInterval(function () { if (dead || state !== 'STARE' || n >= cap) { api.clearInterval(id); setLids(false); return; } setLids(n % 2 === 0); n++; }, Math.max(8, (calm ? 450 : 37) * K));
            rtI.push(id);
          });
          at(24.8, function () { say(L.varnish[2], { priority: 1, mood: 'confused' }); }); atL(26, function () { lose('varnish'); });
        },
        closing: function () {
          at(14, function () { say(L.closing[0], { priority: 1, mood: 'smug' }); }); at(20, function () { fx.lights.on(); say(L.closing[1], { priority: 1, mood: 'panic' }); });
          at(22, function () { say(L.closing[2], { priority: 1, mood: 'smug' }); }); at(25, function () { say(L.closing[3], { priority: 1 }); });
          at(23.6, function () { say(L.closing[4], { priority: 1, mood: 'smug' }); }); atL(27.5, function () { lose('closing'); });
        },
        forms: function () {
          at(4, function () { say(L.forms[0], { priority: 1, mood: 'smug' }); fx.forms.spawn(); every(1.5 * tf(), fx.forms.spawn); }); at(8, function () { fx.prompt.show(); say(L.forms[1], { priority: 1, mood: 'smug' }); });
          at(18, function () { fx.prompt.hide(); setStatus('A choice has been made for you.'); }); at(24, function () { say(L.forms[3], { priority: 1, mood: 'smug' }); });
          atL(29.5, function () { lose('forms'); });
        },
        intensity: function () {
          at(7.5, function () { fx.int.vig(0.5); say(L.inten[0], { priority: 1, mood: 'smug' }); }); at(15, function () { fx.int.big(true); fx.int.vig(0.7); say(L.inten[1], { priority: 1, mood: 'confused' }); });
          at(25, function () { fx.int.notary(true); fx.int.vig(0.85); say(L.inten[2], { priority: 1, mood: 'smug' }); api.sfx('stamp'); }); at(28, function () { say(L.inten[3], { priority: 1, mood: 'confused' }); });
          atL(30.5, function () { lose('intensity'); });
        },
        wallfall: function () {
          at(14, function () { fx.wall.fall(); say(L.wall[0], { priority: 1, mood: 'panic' }); at(1.2, function () { say(L.wall[5], { priority: 1, mood: 'smug' }); }); }); at(15.5, function () { say(L.wall[1], { priority: 1, mood: 'confused' }); });
          atL(26, function () { lose('wallnone'); });
        },
        cafe: function () {
          const quiet = !quietDone && gameBeat === 9;
          if (!quiet) {
            at(5, function () { say(L.cafe[0], { priority: 1, mood: 'smug' }); fx.cafe.visitor(false); });
            [7.25, 9.5, 11.75].forEach(function (s) { at(s, function () { fx.cafe.visitor(false); }); });
            at(14, function () { fx.cafe.visitor(true); });
            at(12.8, function () { say(L.cafe[2], { priority: 1, mood: 'smug' }); });
            at(15, function () { fx.cafe.leave(); setStatus(L.cafe[1]); });
            atL(21, function () { lose('cafe'); });
          } else {
            at(9, function () { quietActive = true; lookOverride = true; setPupils(0, 0); E.regard.hidden = false; rc(room, 'q1', true); setStatus(L.quiet[0]); api.sfx('bell'); });
            at(10, function () { rc(room, 'q2', true); setStatus(L.quiet[1]); });
            at(11, function () { rc(room, 'q3', true); setStatus(L.quiet[2]); });
            at(12, function () {
              quietActive = false; quietDone = true; E.regard.hidden = true; lookOverride = false;
              say(L.quiet[3], { priority: 2, mood: 'proud' }); api.achieve('staring-contest.regard'); api.sfx('ding');
            });
            at(13.5, function () { ['q1', 'q2', 'q3'].forEach(function (q) { rc(room, q, false); }); schedPupils(); });
            [14, 17, 20, 23].forEach(function (s) { at(s, function () { fx.cafe.visitor(false); }); });
            at(26, function () { fx.cafe.visitor(true); });
            at(30, function () { fx.cafe.leave(); setStatus(L.cafe[1]); });
            atL(34, function () { lose('cafe'); });
          }
        },
        clock: function () {
          const when = 8 + api.rand() * 22;
          at(when, function () {
            lookOverride = true; setPupils(4, -1); say(L.clock[0], { priority: 2, mood: 'confused' }); api.achieve('staring-contest.clock');
          });
          at(when + 1, function () { api.sfx('tick'); }); at(when + 1.2, function () { lose('clock'); });
        },
        stillness: function () {                                  // The Minute: nothing is done to you, and the absence is the joke
          rat(25, function () { hush = true; lookOverride = true; setPupils(0, 0); });
          ['\u{1F99F}', '\u{1F404}', '\u{1F9F9}', '\u{1F33F}', '\u{1F9E6}', '\u{1F954}'].forEach(function (g, i) {
            rat(40 + i * 2.5, function () { E.cast.hidden = false; E.cast.appendChild(el('span', {}, g)); api.sfx('tick'); });
          });
          rat(58, function () { say(L.stillN[0], { priority: 2, mood: 'panic' }); }); rat(59.2, function () { api.sfx('bell'); setStatus(L.stillN[1]); });
          rat(59.7, function () { setStatus(L.stillN[2]); });
        },
        gala: function () {
          if (!geraldMet) {
            geraldMet = true;
            const met = !!api.flag.get('metGerald');
            say(met ? L.gerald[0] : L.gerald[1], { who: 'Gerald', priority: 2, mood: 'proud' });
            if (!met) api.flag.set('metGerald', true);
          }
          setStatus('Tonight: the Gala Final. Presiding: Gerald, Vice President of Spuds.');
          at(6, function () { fx.fly.start('hat'); }); at(9, function () { say(L.galaFly[0], { priority: 1, mood: 'confused' }); });
          at(12, function () { fx.refl.yawn(); }); at(16, function () { fx.cow.slide(); });
          at(22, function () { fx.lights.on(); }); at(26, function () { fx.lights.off(); });
          at(28, function () { fx.forms.flood(3); }); at(34, function () { fx.rope.drop(); });
          at(40, function () { fx.fly.stop(); say(L.galaFly[1], { priority: 1, mood: 'smug' }); }); at(44, function () { galaDone = true; lose('galawin'); });
        }
      };

      /* ---------- losing ---------- */
      function hideVerdict() { E.verdict.hidden = true; E.verdict.textContent = ''; E.stamp.classList.remove(cl('on')); E.cert.hidden = scene === 'ending' ? E.cert.hidden : true; }
      function cancelRoundSilently() {
        roundId++; clearRoundTimers(); stopAllFx();
      }
      function silentRestart() {
        cancelRoundSilently(); forceCheat = 'cafe'; startRound(true);
      }
      function lose(cause, extra) {
        if (dead || state !== 'STARE') return;
        extra = extra || {};
        if (drifting && cause !== 'drift') return;
        if (quietActive && INPUT[cause] && quietRestarts < 2) { quietRestarts++; silentRestart(); return; }
        const ms = Math.max(0, api.now() - stareStart), gs = ms / (1000 * K);
        setState('VERDICT');
        roundId++; clearRoundTimers(); stopAllFx();
        const ending = cause === 'galawin';
        if (ending) { startEnding(); return; }
        losses++; sessLosses++; S.inc('rounds'); S.inc('losses');
        const gameMs = Math.round(gs * 1000);
        if (gameMs > bestMs) bestMs = gameMs;
        S.max('best_ms', gameMs);
        S.inc('still_seconds', Math.floor(gs));
        const map = { mouse: 'mouse_blinks', key: 'key_blinks', click: 'mouse_blinks', wheel: 'mouse_blinks', touch: 'touch_blinks', tab: 'tab_blinks', leave: 'tab_blinks', resize: 'resizes', aspect: 'resizes', fly: 'fly_losses', clock: 'clock_wins', reflection: 'reflections' };
        if (map[cause]) S.inc(map[cause]);
        wins += api.pick(WIN_STEPS);
        if (gs >= 15) api.achieve('staring-contest.withering');
        if (cause === 'sudden') { api.award(5, 'The Minute'); api.achieve('staring-contest.minute'); S.inc('minutes'); }
        const part = losses <= 1 ? 1 : Math.min(4, 1 + 0.5 * curTier);
        api.award(part, 'Participation Meh');
        persist(); paintScore();

        const t = gs.toFixed(1);
        const vars = { t: t, px: Math.max(1, Math.round(extra.px || 1)), n: losses };
        const seven = INPUT[cause] && gameMs >= 7500 && gameMs <= 7599;
        let causeKey = cause, aspect = false;
        if (cause === 'resize') {
          const r = window.innerWidth / Math.max(1, window.innerHeight);
          if (Math.abs(r - 1.4) < 0.01) { causeKey = 'aspect'; aspect = true; api.achieve('staring-contest.aspect'); }
        }
        const cm = CAUSES[causeKey] || CAUSES.sudden;
        let mgmt = pickLine(cm.say);
        if (L.loss[cause]) mgmt = bag('loss:' + cause, L.loss[cause]);
        if (cause === 'dennis') mgmt = extra.line || L.dennis[0];
        if (cause === 'fly') { flyLosses++; if (flyLosses === 2) after(1800, function () { say(L.fly[6], { priority: 1, mood: 'smug' }); }); if (flyLosses === 3) after(1800, function () { say(L.fly[5], { priority: 1, mood: 'proud' }); }); api.achieve('staring-contest.insect'); }
        let cardCause = cm.card;
        if (cause !== 'appeal' && L[cardCause]) cardCause = bag(cardCause);
        if (cause === 'appeal') cardCause = extra.pool || bag('pool');
        const bylaw = cm.bylaw || bag('bylaws');
        showVerdict({ t: t, vars: vars, cause: fill(cardCause, vars), bylaw: bylaw, part: part, seven: seven, gala: gameBeat >= 10, aspect: aspect });

        if (gameBeat >= 10) geraldRuling();
        else if (seven) { say(L.seven[0], { priority: 2, mood: 'proud' }); api.sfx('fanfare'); api.achieve('staring-contest.seven'); }
        else say(mgmt, { vars: vars, priority: 2, mood: cause === 'aspect' || aspect ? 'proud' : 'disappointed' });
        if (aspect) say(L.aspectOk[0], { priority: 2, mood: 'proud' });
        if (losses > 1 && !seven && !aspect && gameBeat < 10) {          // the generic verdict and award jokes are spoken (alternating), not printed: one cause per card
          const aft = fill(losses % 2 === 0 ? bag('verdict') : bag('award'), { t: t, px: 1, n: losses % 2 === 0 ? losses : part }), lrid = roundId;
          after(SK(4.6), function () { if (lrid === roundId && state === 'VERDICT') say(aft, { priority: 1, mood: 'smug' }); });
        }
        after(200, function () { api.achieve('staring-contest.first'); });
        api.sfx('stamp');
        pickedLabel = api.pick(L.labels);
        goLockUntil = api.now() + Math.max(100, 600 * K);
        paintGo();
        after(60, focusGo);
        after(200, function () { if (state === 'VERDICT' && !E.verdict.hidden) { try { E.verdict.scrollIntoView({ block: 'nearest' }); } catch (e) { /* no scrolling */ } } });
        const rid = roundId;
        after(150, function () { if (rid === roundId) { const r = E.canvas.getBoundingClientRect(); api.confetti(r.left + r.width / 2, r.top + r.height / 2, 22); } });
        histRows.unshift('#' + losses + ' | ' + t + ' s | ' + fill(cardCause, vars).slice(0, 48));
        if (histRows.length > 8) histRows.length = 8;
        paintHist();
        extras(cause);
        if (beatAt() >= 11 && !galaDone) after(SK(2.5), function () { if (state === 'VERDICT' && !scene) startEnding(); });
      }

      function geraldRuling() {
        const n = ruleN++, len = L.rulings.length;
        const idx = n < len ? n : 2 + ((n - len) % (len - 2));          // in order, then repeat from ruling #3
        const sents = fill(L.rulings[idx]).split(/\.\s+/).map(function (s, i, a) { return i < a.length - 1 ? s + '.' : s; }).filter(Boolean);
        const k = Math.min(3, sents.length), parts = [];
        for (let i = 0; i < k; i++) parts.push(sents.slice(Math.floor(i * sents.length / k), Math.floor((i + 1) * sents.length / k)).join(' '));
        let delay = 0;
        parts.forEach(function (p) {
          after(delay, function () { if (state === 'VERDICT' && scene !== 'ending') api.say(p, { who: 'Gerald', priority: 2, mood: 'smug', duration: 3400 }); });
          delay += 3000;
        });
        setStatus('Gerald has ruled. The ruling is ' + parts.length + ' bubbles long.');
      }
      function extras(cause) {
        if (sessLosses === 2 || sessLosses === 4) after(2600, function () { say(sessLosses === 2 ? L.intro[3] : L.intro[4], { priority: 0, mood: 'smug' }); });
        if (sessLosses >= 3 && sessLosses % 3 === 0) after(3600, function () { say(L.callback[(sessLosses / 3) % 2], { priority: 0, mood: 'smug' }); });
        if (sessLosses >= 4 && sessLosses % 4 === 0) { const x = xref(); if (x) after(5200, function () { say(x, { priority: 1, mood: 'smug' }); }); }
        if (gameBeat >= 4 && !cameoDone && api.chance(1 / 6) && sessLosses > 1) {
          cameoDone = true;
          after(3400, function () { say(bag('cameoG'), { who: 'Gerald', priority: 1, mood: 'smug' }); });
        }
        if (sessLosses === 7 && !toastDone) {
          toastDone = true;
          after(3000, function () { api.say(L.cameoT[0], { who: 'The Toaster', priority: 1, mood: 'neutral' }); });
          after(5200, function () { say(L.cameoT[1], { priority: 1, mood: 'smug' }); });
        }
        lastInput = api.now(); idleLevel = 0;
        rc(E.fly, 'sash', flyLosses >= 3); rc(E.fly, 'collar', flyLosses >= 5);
      }

      function showVerdict(v) {
        const c = E.verdict;
        c.textContent = '';
        c.hidden = false;
        c.appendChild(el('div', { class: cl('vt') }, 'VERDICT NO. ' + api.fmt(losses)));
        if (v.aspect || v.seven) c.appendChild(el('p', { class: cl('vl') }, v.aspect ? fill(L.aspectOk[0]) : L.seven[0]));   // otherwise the cause is stated once, in the grid, and the verdict jokes are spoken
        if (v.seven) c.appendChild(el('div', { class: cl('plaque') }, L.plaque[0]));
        c.appendChild(el('dl', { class: cl('vg') },
          el('dt', {}, 'Stare'), el('dd', {}, v.t + ' s'),
          el('dt', {}, 'Painting'), el('dd', {}, 'ongoing'),
          el('dt', {}, 'Cause of loss'), el('dd', {}, v.cause + ' ' + v.bylaw + (/Sandra/.test(v.bylaw) ? '.' : ', per Sandra.')),
          el('dt', {}, 'Participation Meh'), el('dd', {}, String(v.part))));
        if (losses === 1) c.appendChild(el('p', { class: cl('va') }, fill(L.firstLoss[0])));
        if (sessLosses >= 3) {
          const cb = sessLosses % 2 === 0 ? L.callback[0] : L.callback[1];
          if (!shown[cb]) { shown[cb] = true; c.appendChild(el('p', { class: cl('vf') }, fill(cb))); }
        }
        c.appendChild(el('button', { class: cl('appeal'), type: 'button', onclick: onAppeal }, 'FILE AN APPEAL'));
        E.vap = el('p', { class: cl('vap'), 'aria-live': 'polite' });
        c.appendChild(E.vap);
        E.stamp.classList.remove(cl('on')); void E.stamp.offsetWidth; E.stamp.classList.add(cl('on'));
        setStatus('PAINTING WINS. ' + (v.gala ? 'Gerald presides.' : 'Per Sandra.'));
      }

      /* ---------- appeals, honor, tea ---------- */
      function onAppeal() {
        if (dead || state !== 'VERDICT') return;
        api.award(-0.5, 'Appeal Fee');
        appeals++; S.inc('appeals'); api.save.set('appeals', appeals);
        api.sfx('buzz');
        const nowA = api.now();
        appealTimes.push(nowA); appealTimes = appealTimes.filter(function (t) { return nowA - t < 6000; });
        const spamA = appealTimes.length >= 4 && appeals !== 5;
        if (!spamA) say(L.appealFee[0], { priority: 1, mood: 'smug' });
        const fifth = appeals === 5;
        const msg = fifth ? 'The Appeals Desk is reviewing the case...' : spamA ? bag('appealSpam') : bag('appeals');
        const vp = E.vap;
        if (vp) vp.textContent = msg;
        if (appeals >= 5) api.achieve('staring-contest.paperwork');
        if (fifth) {
          after(3000, function () {
            if (vp && vp === E.vap && vp.isConnected) vp.textContent = L.appealFive[0];
            say(L.appealFive[0], { priority: 2, mood: 'proud' }); api.sfx('fanfare'); api.confetti();
          });
        } else after(700, function () { say(msg, { priority: 1, mood: 'smug' }); });
      }
      function honorLabel() { return honor ? 'Honor System: ON (nobody is checking)' : 'Honor System: OFF (movement counts)'; }
      function onHonor() {
        if (dead) return;
        noteActivity();
        if (state !== 'READY' && state !== 'VERDICT') {
          setStatus('The Honor System may only be changed between contests. Honor is not a mid-contest feature.');
          after(3500, function () { if (state !== 'STARE') setStatus('Currently winning.'); });
          return;
        }
        honor = !honor;
        E.honor.textContent = honorLabel(); rc(E.honor, 'on', honor);
        const nowH = api.now();
        honorTimes.push(nowH); honorTimes = honorTimes.filter(function (t) { return nowH - t < 6000; });
        say(honorTimes.length >= 4 ? bag('honorFlip') : honor ? L.honorOn[0] : L.honorOff[0], { priority: 2, mood: honorTimes.length >= 4 ? 'confused' : honor ? 'smug' : 'neutral' });
        api.save.set('honor', honor); api.sfx(honor ? 'ding' : 'blip');
      }

      function startCooling() {
        if (state === 'COOLING' || dead) return;
        const wasRound = state === 'GRACE' || state === 'STARE';
        prevState = state === 'READY' ? 'READY' : 'VERDICT';
        if (wasRound) { cancelRoundSilently(); prevState = 'VERDICT'; }
        const now = api.now();
        setState('COOLING');
        sessCoolings++; S.inc('rematch_spam'); teaPresses = 0; teaFined = false;
        room.classList.add(cl('shuts'));
        after(Math.max(120, 600 * K), function () { room.classList.remove(cl('shuts')); });
        api.sfx('sad');
        say(L.cool[0], { priority: 2, mood: 'panic' });
        after(SK(2.2), function () { if (state === 'COOLING') say(L.cool[1], { priority: 1, mood: 'neutral' }); });
        after(SK(4.2), function () { if (state === 'COOLING') say(L.cool[2], { priority: 1, mood: 'smug' }); });
        if (sessCoolings >= 2 && now - lastCoolAt < 60000) { restart(room, 'eyeroll'); say(L.cool[4], { priority: 1, mood: 'confused' }); }
        if (sessCoolings === 3) { rc(room, 'cushion', true); after(SK(5), function () { say(L.cool[5], { priority: 1, mood: 'smug' }); }); }
        else if (sessCoolings > 3) { rc(room, 'cushion', true); after(SK(5), function () { say(bag('coolN'), { priority: 1, mood: 'smug', vars: { n: sessCoolings } }); }); }
        lastCoolAt = now;
        coolId = api.setTimeout(endCooling, Math.max(300, SK(7.5)));
        after(40, function () { if (state === 'COOLING') { try { E.tea.focus({ preventScroll: true }); } catch (e) { /* no focus */ } } });
      }
      function onTea() {
        if (dead || state !== 'COOLING') return;
        teaPresses++; api.sfx('pop'); noteActivity();
        if (teaPresses >= 3 && !teaFined) {
          teaFined = true; api.award(-0.5, 'Tea Fine');
          api.clearTimeout(coolId); coolId = api.setTimeout(endCooling, Math.max(300, SK(15)));
          say(L.cool[3], { priority: 2, mood: 'smug' });
        } else if (teaPresses < 3) say(L.tea[teaPresses - 1] || L.tea[0], { priority: 1, mood: 'neutral' });
      }
      function endCooling() {
        if (dead || state !== 'COOLING') return;
        rc(room, 'cushion', sessCoolings >= 3);
        spamBlockUntil = api.now() + 1000; inputs = [];
        setState(prevState);
        if (prevState === 'VERDICT' && E.verdict.hidden) showAdjourn();
        say(L.cool[6], { priority: 1, mood: 'proud' });
        goLockUntil = api.now() + Math.max(100, 600 * K);
        after(60, focusGo);
      }
      function showAdjourn() {
        const c = E.verdict;
        c.hidden = false; c.textContent = '';
        c.appendChild(el('div', { class: cl('vt') }, 'HEARING ADJOURNED'));
        c.appendChild(el('p', { class: cl('vl') }, 'No loss has been recorded. The painting has recorded the absence of a loss as a win.'));
        c.appendChild(el('dl', { class: cl('vg') }, el('dt', {}, 'Cause'), el('dd', {}, 'Conciliation Hearing, Bylaw 12 (was 11), per Sandra.')));
      }

      /* ---------- GO ---------- */
      function onGo() {
        if (dead || state === 'COOLING' || state === 'GRACE' || state === 'STARE') return;
        const now = api.now();
        if (now < goLockUntil) { lockPresses++; if (lockPresses === 3) say(bag('impatient'), { priority: 1, mood: 'smug' }); return; }
        lockPresses = 0;
        noteActivity();
        if (scene === 'ending') {
          if (!endDone) finishEnding();
          beginLoop();
        }
        if (scene === 'hook') endHook(false);
        if (state === 'VERDICT') rematches++;
        if (state === 'READY' && sessRounds === 0) api.flag.set('staring-contest.met', true);
        startRound(false);
        if (L.remMile[rematches] && state === 'GRACE') say(L.remMile[rematches], { priority: 2, mood: rematches >= 100 ? 'proud' : 'smug' });
        loopFirst = false; paintGo();
      }

      /* ---------- the hook (mouse wiggle) ---------- */
      function hookFall() {
        if (dead || scene || (state !== 'READY' && state !== 'VERDICT')) return;
        scene = 'hook'; hookFallen = true; rev = [];
        const dy = Math.min(E.art.clientHeight * 0.4, 150);
        setPaint((api.rand() - 0.5) * 40, dy, 14, true);
        setDrag(true); rc(room, 'palevis', true);
        after(350, function () { shake(E.art); api.sfx('boing'); });
        say(bag('hookA'), { priority: 2, mood: 'panic' });
        after(SK(2.6), function () { if (scene === 'hook') say(L.hook[1], { priority: 1, mood: 'smug' }); });
        hookT = api.setTimeout(function () { if (scene === 'hook') endHook(false); }, Math.max(100, SK(20)));
        paintGo();
      }
      function endHook(ok) {
        if (scene !== 'hook') return;
        api.clearTimeout(hookT); hookT = 0;
        scene = null; hookFallen = false; drag.on = false;
        setDrag(false);
        if (ok) {
          hookDone = true; levelDeg = 1; S.inc('hooks_rehung'); paleCount = 0; rc(room, 'palevis', false);
          setPaint(0, 0, 0, true);
          say(L.hook[2], { priority: 2, mood: 'proud' }); api.achieve('staring-contest.hook'); api.sfx('ding'); persist();
        } else {
          setPaint(0, 0, 0, true);
          paleCount = Math.max(paleCount, 1); E.pale.textContent = L.pale[Math.min(2, paleCount - 1)]; rc(room, 'palevis', true);
          say(L.hook[3], { priority: 1, mood: 'smug' });
        }
        paintGo(); after(60, focusGo);
      }
      function dragAllowed() { return (state === 'STARE' && wallActive) || (scene === 'hook' && hookFallen); }
      function onPaintDown(e) {
        if (!dragAllowed() || drag.on) return;
        drag.on = true; drag.sx = e.clientX; drag.sy = e.clientY; drag.bx = paintX; drag.by = paintY; drag.id = e.pointerId;
        try { E.paint.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointer */ }
      }
      function onPaintMove(e) {
        if (!drag.on) return;
        const x = drag.bx + e.clientX - drag.sx, y = drag.by + e.clientY - drag.sy;
        if (isFinite(x) && isFinite(y)) setPaint(x, y, Math.max(0, paintRot * 0.9), false);
      }
      function onPaintUp() {
        if (!drag.on) return;
        drag.on = false;
        try { if (drag.id !== null) E.paint.releasePointerCapture(drag.id); } catch (err) { /* nothing to release */ }
        const near = Math.hypot(paintX, paintY) <= 40;
        if (state === 'STARE' && wallActive) lose(near ? 'wallhook' : 'wallelse');
        else if (scene === 'hook' && near) endHook(true);
      }

      /* ---------- the not-ending ---------- */
      function startEnding() {
        if (scene === 'ending' || dead) return;
        if (scene === 'hook') endHook(false);
        scene = 'ending'; endDone = false; galaDone = true;
        setState('VERDICT'); hideVerdict(); stopAllFx();
        goLockUntil = 0;
        const step = function (sec, fn) { endingT.push(after(SK(sec), fn)); };
        fx.lights.off(); api.sfx('bell');
        step(1, function () {
          E.quartet.hidden = false; api.sfx('blip'); say(L.end[0], { priority: 2, mood: 'proud' });
          endingT.push(after(SK(0.4), function () { api.sfx('bloop'); }));
          endingT.push(after(SK(0.8), function () { api.sfx('ding'); }));
        });
        step(4, function () { say(L.end[1], { priority: 2, mood: 'proud' }); });
        step(9, function () { lookOverride = true; setPupils(-4, 1); api.sfx('pop'); say(L.endX[0], { priority: 2, mood: 'panic' }); });       // the 10:00 hint: the painting looks at the door
        step(16, function () {                     // Tuesday attends (the car park finally paid off). The painting blinks first, once, and it does not count.
          E.quartet.hidden = true; E.cast.hidden = false; E.cast.textContent = '\u{1F4C5}'; setPupils(-1, 0); api.sfx('whoosh');
          endingT.push(after(SK(1.4), function () { flashLids(300); api.sfx('pop'); say(L.tuesday[0], { priority: 2, mood: 'panic' }); }));
        });
        step(25, function () { rc(E.paint, 'trophy', true); say(L.end[2], { priority: 2, mood: 'proud' }); });
        step(30, function () { say(L.endX[1], { priority: 1, mood: 'smug' }); });
        step(34, function () { showCert(); say(L.end[4], { priority: 2, mood: 'proud' }); });
        step(39, function () { say(L.endX[2], { who: 'The Painting', priority: 2, mood: 'proud', duration: 5000 }); api.sfx('bell'); });
        step(44.5, function () { say(L.endX[3], { priority: 2, mood: 'confused' }); });
        step(49.5, function () { if (!endDone) finishEnding(); });
        paintGo(); setStatus('The contest is concluded. The contest continues.');
      }
      function showCert() {
        E.cert.hidden = false; E.cert.textContent = fill(L.end[3]);
        const r = E.canvas.getBoundingClientRect();
        api.confetti(r.left + r.width / 2, r.top + r.height / 2, 40);
        api.achieve('staring-contest.runnerup');
      }
      function finishEnding() {
        endingT.forEach(function (id) { api.clearTimeout(id); }); endingT = [];
        E.quartet.hidden = true; rc(E.paint, 'trophy', false); lookOverride = false; setPupils(0, 0); schedPupils();
        E.paint.style.transform = ''; setPaint(0, 0, 0, false);
        if (E.cert.hidden) showCert();
        endDone = true;
        E.artist.textContent = L.artists[5];
        say(L.end[5], { priority: 1, mood: 'proud' });
        setStatus('Artist: You, retroactively.');
        paintGo();
      }
      function beginLoop() {
        loops++; S.inc('loops'); endDone = false; scene = null;
        t0Holder.v = api.now(); seen = {}; quietDone = false; quietRestarts = 0; galaDone = false;
        loopFirst = true; sessRounds = 1;
        rc(room, 'loop', true); setBrow();
        E.cert.hidden = true;
        persist();
        say(L.end[6], { priority: 2, mood: 'smug' });
        after(SK(2.5), function () { say(L.end[7], { priority: 1, mood: 'confused' }); });
        if (!loop1Said) { loop1Said = true; after(SK(5), function () { say(L.end[8], { priority: 1, mood: 'proud' }); }); }
        setStatus(L.end[9]);
      }

      /* ---------- input ---------- */
      function noteActivity() {
        lastInput = api.now(); idleLevel = 0;
        E.zzz.hidden = true; E.sign.hidden = true;
      }
      function countInput() {
        const now = api.now();
        if (state === 'COOLING' || now < spamBlockUntil) return;
        inputs.push(now);
        while (inputs.length && now - inputs[0] > 4000) inputs.shift();
        if (inputs.length >= 12) { inputs = []; startCooling(); }
      }
      function dennisHit() {                 // returns the milestone line for this click, or ''
        dennisClicks++; api.save.set('dennis', dennisClicks); api.flag.set('plantClicked', true);   // lint-ignore: shared cross-module flag
        return dennisClicks === 3 ? L.dennis3[0] : (L.dennisN[dennisClicks] || '');
      }
      function blink(kind, extra) { if (state === 'STARE' && !honor) lose(kind, extra); }
      function onKey(e) {
        if (dead) return;
        noteActivity();
        const k = e.key;
        if (e.type === 'keyup') {
          if (heldAtStart[k]) { delete heldAtStart[k]; return; }           // a key held down from before the stare is not a blink when let go
          if (dragAllowed()) return;
        } else {
          if (state !== 'STARE') heldAtStart[k] = true;
          else if (!e.repeat) delete heldAtStart[k];
          else if (heldAtStart[k]) return;
          if (dragAllowed() && e.target === E.paint && (k === 'Enter' || k === ' ')) {      // keyboard players may touch the exhibit too
            e.preventDefault(); setPaint(0, 0, 0, true);
            if (state === 'STARE' && wallActive) lose('wallhook'); else if (scene === 'hook') endHook(true);
            return;
          }
          if (state === 'STARE' && wallActive && !honor && k === 'Tab') return;        // reaching the painting is not a blink
          if (!e.repeat) countInput();
          if (k === 'Escape' && state !== 'STARE') { escCount++; say(escCount <= 3 ? L.esc[escCount - 1] : bag('escMore'), { priority: 1, mood: 'smug' }); }
        }
        if (state === 'STARE' && !honor) skipClickUntil = api.now() + 800;       // the click this key is about to synthesise must not count a second time
        blink('key');
      }
      function onPointerDown(e) {
        if (dead) return;
        noteActivity();
        countInput();
        if (drag.on) return;
        const t = e.target && e.target.closest ? e.target : null;
        const bait = t && t.closest('[data-bait]');
        if (state === 'STARE' && !honor) {
          const kind = bait ? bait.getAttribute('data-bait') : '';
          skipClickUntil = api.now() + 800;
          if (kind === 'dennis') { lose('dennis', { line: dennisHit() }); return; }
          if (kind === 'free') { lose('freemeh'); return; }  // card text only; its Management line is drawn from the freeClick bag
          if (kind === 'form') { lose('formbtn'); return; }
          lose(e.pointerType === 'touch' ? 'touch' : 'click');
        }
      }
      function onBait(kind) {
        if (dead || (state === 'STARE' && !honor) || api.now() < skipClickUntil) return;
        if (kind === 'dennis') {
          const dl = dennisHit();
          say(dl || (state === 'STARE' ? L.dennis[0] : bag('dennisIdle')), { priority: 1, mood: 'smug' }); api.sfx('pop');
        } else if (kind === 'free') { E.free.hidden = true; say(bag('freeClick'), { priority: 1, mood: 'smug' }); api.sfx('buzz'); }
        else if (kind === 'form') { E.prompt.hidden = true; say(L.forms[2], { priority: 1, mood: 'smug' }); }
      }
      function showFree() {
        if (!E.free.hidden || dead) return;
        const a = E.art.getBoundingClientRect();
        E.free.style.left = Math.floor(10 + api.rand() * Math.max(10, Math.min(a.width * 0.45, a.width - 200))) + 'px';
        E.free.style.top = Math.floor(30 + api.rand() * Math.max(10, a.height * 0.5)) + 'px';
        E.free.hidden = false;
        say(bag('freeAppear'), { priority: 1, mood: 'smug' });
      }
      function onMove(e) {
        if (dead) return;
        if (e.pointerType === 'touch') return;
        const x = e.clientX, y = e.clientY;
        if (!isFinite(x) || !isFinite(y)) return;
        ptr = { x: x, y: y };
        schedPupils();
        const now = api.now();
        if (state === 'READY' || state === 'VERDICT') { noteActivity(); wiggle(x, now); }
        if (state === 'STARE') {
          noteActivity();
          if (!anchored) { anchored = true; lastPos = { x: x, y: y }; restPtr = { x: x, y: y }; return; }
          if (drag.on) { lastPos = { x: x, y: y }; return; }
          const d = lastPos ? Math.hypot(x - lastPos.x, y - lastPos.y) : 0;
          lastPos = { x: x, y: y };
          if (!(d > 0) || now < ignoreMoveUntil || honor) { if (d > 0 && honor) travel += d; return; }
          travel += d;
          moveWin.push({ t: now, d: d });
          while (moveWin.length && now - moveWin[0].t > 400) moveWin.shift();
          let sum = 0; for (let i = 0; i < moveWin.length; i++) sum += moveWin[i].d;
          if (sum > 6) {
            if (saccades > 0) {
              saccades--; paintPips(); api.sfx('tick');
              say(L.sacc[2 - saccades], { priority: 1, mood: 'smug' });
              moveWin = []; ignoreMoveUntil = now + 700; travel = 0;
            } else lose('mouse', { px: sum });
          }
        }
      }
      function wiggle(x, now) {
        if (scene) return;
        if (!hkDir) {                                     // direction not yet known: wait for 6 px of travel
          if (hkStart === null) { hkStart = x; hkX = x; return; }
          if (Math.abs(x - hkX) < 6) return;
          hkDir = x > hkX ? 1 : -1; hkX = x; return;
        }
        const d = x - hkX;
        if (d === 0) return;
        const dir = d > 0 ? 1 : -1;
        if (dir === hkDir) { hkX = x; return; }
        if (Math.abs(d) < 6) return;                      // jitter against the current direction
        if (Math.abs(hkX - hkStart) >= 20) {              // a finished segment of 20+ px: that is one reversal
          rev.push(now);
          rev = rev.filter(function (t) { return now - t < 3000; });
          if (rev.length >= 10) { rev = []; hkDir = 0; hkStart = null; hookFall(); return; }
        }
        hkStart = hkX; hkDir = dir; hkX = x;
      }
      function onWheel() { if (!dead) { noteActivity(); blink('wheel'); } }
      let tStart = null;
      function onTouchStart(e) { if (dead) return; noteActivity(); if (drag.on) return; const t = e.touches && e.touches[0]; tStart = t ? { x: t.clientX, y: t.clientY } : null; blink('touch'); }   // touching the fallen painting is the assignment
      function onTouchMove(e) {
        if (dead || drag.on) return;
        const t = e.touches && e.touches[0];
        if (t && tStart && Math.hypot(t.clientX - tStart.x, t.clientY - tStart.y) > 12) blink('touch');
      }
      function onTouchEnd() { if (!dead && !drag.on) blink('touch'); }
      function onVis() { if (!dead && document.hidden) blink('tab'); }
      function onBlur() { if (!dead) blink('tab'); }
      function onResize() {
        if (dead) return;
        if (state !== 'STARE' || honor) return;
        const coarse = window.matchMedia && window.matchMedia('(pointer:coarse)').matches;
        const dw = Math.abs(window.innerWidth - w0), dh = Math.abs(window.innerHeight - h0);
        if (dw >= 2 || (dh >= 2 && !coarse)) {      // debounced: the size the player settles on decides (so exactly 7:5 can be found)
          if (resizeT) api.clearTimeout(resizeT);
          resizeT = rt(Math.max(60, 350 * K), function () { resizeT = 0; lose('resize'); });
        }
      }
      function onLeave(e) {
        if (dead || state !== 'STARE' || honor) return;
        if (e.pointerType === 'touch') return;
        if (e.relatedTarget && root.contains(e.relatedTarget)) return;
        if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('#pm-narrator,#lb-narrator,#pm-fx')) return;   // Management is not "outside the room"
        if (!e.relatedTarget && document.hidden) return;
        lose('leave');
      }
      api.on(document, 'keydown', onKey);
      api.on(document, 'keyup', onKey);
      api.on(root, 'pointerdown', onPointerDown);
      api.on(root, 'mousedown', function (e) {       // fallback for engines that send mouse events without pointer events
        if (dead || drag.on || state !== 'STARE') return;
        if (wallActive && e.target && e.target.closest && e.target.closest(PAINT_SEL)) return;
        blink('click');
      });
      api.on(root, 'pointermove', onMove);
      api.on(root, 'wheel', onWheel, { passive: true });
      api.on(root, 'touchstart', onTouchStart, { passive: true });
      api.on(root, 'touchmove', onTouchMove, { passive: true });
      api.on(root, 'touchend', onTouchEnd, { passive: true });
      api.on(root, 'pointerleave', onLeave);
      api.on(document, 'visibilitychange', onVis);
      api.on(window, 'blur', onBlur);
      api.on(window, 'resize', onResize);
      api.on(E.paint, 'pointerdown', onPaintDown);
      api.on(E.paint, 'pointermove', onPaintMove);
      api.on(E.paint, 'pointerup', onPaintUp);
      api.on(E.paint, 'pointercancel', onPaintUp);
      api.on(E.dennis, 'click', function () { onBait('dennis'); });
      api.on(E.free, 'click', function () { onBait('free'); });
      api.on(E.prompt, 'click', function (e) { if (e.target && e.target.closest && e.target.closest('button')) onBait('form'); });

      /* ---------- idle ladder and the clock ---------- */
      function idleTick() {
        if (dead) return;
        if (state === 'STARE') {
          const gs = stareGs(), sec = Math.floor(gs);
          E.you.textContent = fmtClock(gs); setRing(gs);
          if (sec !== pSec) { pSec = sec; E.pclk.textContent = '283 years, 9 months, ' + sec + ' s (no change)'; }       // the other clock also runs, and reports nothing new
          return;
        }
        if (document.hidden || (!api.selftest && typeof document.hasFocus === 'function' && !document.hasFocus())) { lastInput = api.now(); idleLevel = 0; return; }       // nobody can witness a blink from a hidden or unfocused window
        if ((state !== 'READY' && state !== 'VERDICT') || scene) return;
        const idle = (api.now() - lastInput) / (1000 * K);
        const T = [60, 120, 180, 240, 330, 480, 660, 900, 1200];
        if (idleLevel >= T.length || idle < T[idleLevel]) return;
        const lv = idleLevel++;
        const ready = state === 'READY';
        if (lv === 0) say(ready ? L.idleR[0] : L.idle[0], { priority: 1, mood: 'smug' });
        else if (lv === 1) { E.zzz.hidden = false; say(ready ? L.idleR[1] : L.idle[1], { priority: 1, mood: 'smug' }); }
        else if (lv >= 4) {
          say(L.idle2[lv - 4], { priority: 1, mood: lv === 8 ? 'disappointed' : 'smug' });
          if (lv >= 7) { E.sign.textContent = L.idleSign[lv - 7]; E.sign.hidden = false; }
          if (lv === 7) { api.award(0.5, 'Bench Allowance'); api.sfx('ding'); }
        }
        else if (lv === 2) {
          setLids(true); after(100, function () { setLids(false); });
          S.inc('idle_blinks');
          if (!blinkDone) {
            blinkDone = true; persist(); setStatus(L.idle[2]);
            api.achieve('staring-contest.blink');
            after(1400, function () { say(L.idle[3], { priority: 1, mood: 'smug' }); });
          } else { setStatus(L.idle[4]); say(L.idle[4], { priority: 1, mood: 'smug' }); }
        } else { E.sign.textContent = L.idle[5]; E.sign.hidden = false; say(L.idle[5], { priority: 1, mood: 'smug' }); api.achieve('staring-contest.quiet'); }
      }
      api.setInterval(idleTick, 100);

      /* ---------- go ---------- */
      paintScore(); paintHist(); setBrow(); paintPips(); setUnit();
      if (hookDone) setPaint(0, 0, 0, false);
      if (loops >= 1) { rc(room, 'loop', true); E.artist.textContent = L.artists[5]; }
      rc(E.honor, 'on', honor);
      dressed = 1; dressBeat(1, false); syncBeat();
      after(80, focusGo);
      after(1200, function () {
        if (state !== 'READY') return;
        if (roundsTotal > 0) say(bag('welcomeBack'), { priority: 1, mood: 'smug' });
        else say(L.intro[0], { priority: 1, mood: 'proud' });
      });
      after(SK(8), function () { if (state === 'READY' && sessRounds === 0) say(L.intro[1], { priority: 0, mood: 'neutral' }); });
      after(SK(17), function () { if (state === 'READY' && sessRounds === 0) say(L.intro[2], { priority: 0, mood: 'smug' }); });
      after(SK(30), function () { if (state === 'READY' && sessRounds === 0) say(api.flag.get('metGerald') ? 'Gerald (Potato) asked after you. Gerald (Potato) has not blinked since.' : L.intro[3], { priority: 0, mood: 'smug' }); });

      return {
        destroy() {
          persist();
          dead = true;
          root.textContent = '';
        }
      };
    }
  });
})();
