/* POINTLESS module: gerald-keynote */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const ID = 'gerald-keynote';
  const C = 'm-gerald-keynote-';
  const ST = ID + '.';

  P.injectCSS(`
.m-gerald-keynote-root{--gk-ink:#2b2118;--gk-cream:#fdf3dc;--gk-mustard:#e9b44c;--gk-coral:#ef6f5e;--gk-mint:#8fd5a6;--gk-gold:#f4c542;--gk-lilac:#b9a6e8;--gk-red:#c0392b;position:relative;display:grid;grid-template-columns:minmax(0,1fr) 252px;grid-template-areas:"ban ban" "stg sid" "ger clk";gap:10px 12px;padding:10px;background:#12343b;color:#fdf3dc;font:14px/1.35 "Trebuchet MS",system-ui,sans-serif;min-height:420px;box-sizing:border-box;overflow:hidden;border-radius:6px}.m-gerald-keynote-root *{box-sizing:border-box}.m-gerald-keynote-root button{font-family:inherit}.m-gerald-keynote-hide{display:none!important}.m-gerald-keynote-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.m-gerald-keynote-banner{grid-area:ban;display:flex;align-items:center;justify-content:space-between;gap:8px;background:var(--gk-mustard);color:var(--gk-ink);border:3px solid var(--gk-ink);box-shadow:3px 3px 0 var(--gk-ink);padding:4px 10px;font-weight:900;font-size:12px;letter-spacing:.06em}
.m-gerald-keynote-clock{position:relative;flex:none;width:26px;height:26px;border:3px solid var(--gk-ink);border-radius:50%;background:var(--gk-cream)}.m-gerald-keynote-hand{position:absolute;left:50%;bottom:50%;width:2px;margin-left:-1px;background:var(--gk-ink);transform-origin:50% 100%}.m-gerald-keynote-hh{height:6px;transform:rotate(225deg)}.m-gerald-keynote-hm{height:9px;transform:rotate(180deg)}.m-gerald-keynote-stage{grid-area:stg;position:relative;padding-top:16px;min-width:0}.m-gerald-keynote-beam{position:absolute;left:-2%;right:-2%;top:14px;bottom:-6px;background:rgba(255,246,200,.2);clip-path:polygon(47% 0,53% 0,100% 100%,0 100%);pointer-events:none}
.m-gerald-keynote-proj{position:absolute;left:50%;top:0;width:44px;height:16px;margin-left:-22px;background:#c9c0a8;border:2px solid var(--gk-ink);border-radius:4px 4px 0 0}.m-gerald-keynote-proj::after{content:"";position:absolute;left:50%;bottom:-3px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:#fff6c8;border:2px solid var(--gk-ink)}.m-gerald-keynote-frame{position:relative;aspect-ratio:16/9;width:100%;max-width:580px;margin:0 auto;background:radial-gradient(ellipse at center,#fdfbf2 55%,#efe9d4);border:3px solid var(--gk-ink);box-shadow:4px 4px 0 var(--gk-ink);color:var(--gk-ink);overflow:hidden;container-type:inline-size;cursor:pointer;touch-action:pan-y;user-select:none;transition:transform .25s}.m-gerald-keynote-big .m-gerald-keynote-frame{transform:scale(1.05)}.m-gerald-keynote-dark .m-gerald-keynote-frame{background:#111}.m-gerald-keynote-dark .m-gerald-keynote-sl{opacity:0}
.m-gerald-keynote-sl{position:absolute;inset:0;display:flex;flex-direction:column;padding:2.4cqw 3.2cqw;gap:1cqw;transition:opacity .2s}.m-gerald-keynote-cnt{font:800 clamp(8px,2.1cqw,13px)/1 system-ui,sans-serif;letter-spacing:.08em;color:#6b5a45;transform-origin:left center}.m-gerald-keynote-title{flex:1;min-height:0;display:flex;flex-wrap:wrap;align-content:center;align-items:baseline;justify-content:center;gap:.05em .28em;text-align:center;font:700 clamp(15px,6.4cqw,48px)/1.12 Georgia,serif;overflow-wrap:anywhere;overflow:hidden}.m-gerald-keynote-long{font-size:clamp(12px,4.6cqw,34px)}.m-gerald-keynote-w{cursor:default;border-radius:4px}.m-gerald-keynote-w:hover{background:rgba(239,111,94,.22)}
.m-gerald-keynote-furn{height:31%;display:flex;align-items:flex-end;justify-content:center;gap:2cqw}.m-gerald-keynote-foot{display:flex;justify-content:space-between;gap:6px;font:700 clamp(7px,1.8cqw,11px)/1 system-ui,sans-serif;color:#6b5a45;letter-spacing:.04em}.m-gerald-keynote-foot i{font-family:"Times New Roman",Times,serif;font-size:1.25em}.m-gerald-keynote-sl.m-gerald-keynote-bk5 .m-gerald-keynote-notes{display:none}.m-gerald-keynote-half{background:#fff}.m-gerald-keynote-half .m-gerald-keynote-title{font-size:clamp(30px,26cqw,170px);opacity:.06}
.m-gerald-keynote-half.m-gerald-keynote-bk5 .m-gerald-keynote-title{opacity:1;font-size:clamp(20px,9cqw,60px)}.m-gerald-keynote-half .m-gerald-keynote-cnt{animation:m-gerald-keynote-cflip .6s}.m-gerald-keynote-tue{background:#e4dcf7}.m-gerald-keynote-mine{background:#fff}.m-gerald-keynote-flab{display:block;font:700 clamp(7px,1.8cqw,11px)/1.1 system-ui,sans-serif;text-align:center;margin-top:.6cqw;color:#4a3d2d}.m-gerald-keynote-fb{background:none;border:0;padding:0;margin:0;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;color:inherit}
.m-gerald-keynote-fb:focus-visible,.m-gerald-keynote-fb:hover .m-gerald-keynote-gfx{outline:2px solid var(--gk-coral);outline-offset:2px}.m-gerald-keynote-bars{display:flex;align-items:flex-end;gap:1.4cqw;height:100%}.m-gerald-keynote-bar{width:5cqw;min-height:4px;border:2px solid var(--gk-ink);background:var(--gk-mint);cursor:pointer;padding:0}.m-gerald-keynote-bar:nth-child(2n){background:var(--gk-gold)}.m-gerald-keynote-gfx{display:block}.m-gerald-keynote-pie{width:13cqw;height:13cqw;border-radius:50%;border:2px solid var(--gk-ink);background:conic-gradient(var(--gk-coral) 0 100%)}
.m-gerald-keynote-venn{width:14cqw;height:14cqw;border-radius:50%;border:2px solid var(--gk-ink);background:rgba(185,166,232,.7)}.m-gerald-keynote-org{position:relative;width:14cqw;height:14cqw}.m-gerald-keynote-oc{position:absolute;width:5cqw;height:5cqw;border-radius:50%;border:2px solid var(--gk-ink);background:var(--gk-mint)}.m-gerald-keynote-oa{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 clamp(10px,5cqw,28px)/1 system-ui,sans-serif}.m-gerald-keynote-pyr{width:0;height:0;border-left:8cqw solid transparent;border-right:8cqw solid transparent;border-bottom:13cqw solid var(--gk-gold)}.m-gerald-keynote-arr{display:flex;gap:1cqw;font:900 clamp(12px,5.4cqw,32px)/1 system-ui,sans-serif}
.m-gerald-keynote-arr span{display:inline-block}.m-gerald-keynote-photo{width:17cqw;height:11cqw;background:#c9c5b8;border:2px solid var(--gk-ink);display:flex;align-items:center;justify-content:center;font-size:clamp(14px,6cqw,34px)}.m-gerald-keynote-pol{background:#fff;border:2px solid var(--gk-ink);padding:1cqw 1cqw 2cqw;box-shadow:2px 2px 0 var(--gk-ink);transform:rotate(-3deg)}.m-gerald-keynote-polc{width:11cqw;height:11cqw;border-radius:50%;background:var(--gk-mustard);border:2px solid var(--gk-ink)}.m-gerald-keynote-chips,.m-gerald-keynote-notes,.m-gerald-keynote-flags{position:absolute;pointer-events:none}.m-gerald-keynote-chips{left:0;right:0;bottom:14%;display:flex;justify-content:center;gap:2cqw;pointer-events:none}
.m-gerald-keynote-chip{pointer-events:auto;border:2px solid var(--gk-ink);background:var(--gk-lilac);color:var(--gk-ink);font:800 clamp(9px,2.8cqw,15px)/1 system-ui,sans-serif;padding:1cqw 2.4cqw;border-radius:999px;cursor:pointer;box-shadow:2px 2px 0 var(--gk-ink)}.m-gerald-keynote-chip:disabled{opacity:.55;cursor:default}.m-gerald-keynote-rbar{background:var(--gk-ink);color:var(--gk-ink);border:0;min-width:11cqw;height:.95em;margin:0 .1em;cursor:pointer;font:inherit;border-radius:2px}.m-gerald-keynote-rbar.m-gerald-keynote-open{background:#ead9b0;color:var(--gk-ink);padding:0 .3em;height:auto;cursor:default;font-size:.55em}.m-gerald-keynote-notes{right:2cqw;bottom:12cqw;width:30cqw;display:flex;flex-direction:column;gap:1cqw;align-items:flex-end}.m-gerald-keynote-note{pointer-events:auto;background:#fff2a8;color:var(--gk-ink);font:700 clamp(8px,2.3cqw,13px)/1.2 "Segoe Script","Comic Sans MS",cursive;padding:1.2cqw 1.6cqw;box-shadow:2px 3px 0 rgba(43,33,24,.35);transform:rotate(-3deg);animation:m-gerald-keynote-stick .3s ease-out;cursor:pointer;max-width:100%}
.m-gerald-keynote-note:nth-child(2n){transform:rotate(3deg)}.m-gerald-keynote-union{background:var(--gk-lilac)}.m-gerald-keynote-peel{animation:m-gerald-keynote-peel .3s ease-in forwards}.m-gerald-keynote-flags{left:2cqw;top:6cqw;width:36cqw;display:flex;flex-direction:column;gap:1cqw}.m-gerald-keynote-tclk{width:13cqw;height:13cqw;border-width:.6cqw;box-shadow:0 0 0 .4cqw rgba(43,33,24,.25)}.m-gerald-keynote-tclk .m-gerald-keynote-hand{width:.8cqw;margin-left:-.4cqw}
.m-gerald-keynote-tclk .m-gerald-keynote-hh{height:28%}.m-gerald-keynote-tclk .m-gerald-keynote-hm{height:40%}.m-gerald-keynote-flag{pointer-events:auto;background:var(--gk-coral);color:#1d120c;border:0;border-top:2px dashed #fff;border-bottom:2px dashed #fff;text-align:left;font:800 clamp(8px,2.2cqw,13px)/1.2 system-ui,sans-serif;padding:1cqw 1.6cqw;cursor:pointer;transform:rotate(-2deg);box-shadow:2px 2px 0 rgba(0,0,0,.3)}.m-gerald-keynote-flag b{margin-right:1cqw}.m-gerald-keynote-appr{position:absolute;right:6cqw;bottom:18%;border:3px solid #2f7d4a;color:#2f7d4a;font:900 clamp(9px,3cqw,18px)/1 system-ui,sans-serif;padding:.6cqw 1.4cqw;transform:rotate(-8deg);letter-spacing:.08em;animation:m-gerald-keynote-stamp .3s ease-out}.m-gerald-keynote-dot{position:absolute;left:0;top:0;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:var(--gk-coral);box-shadow:0 0 8px 3px rgba(239,111,94,.7);pointer-events:none;opacity:0;transition:transform 60ms linear,opacity .15s;z-index:5}.m-gerald-keynote-dot.m-gerald-keynote-on{opacity:1}
.m-gerald-keynote-cap{position:absolute;right:2cqw;bottom:6.5cqw;font:italic 700 clamp(7px,1.7cqw,10px)/1 system-ui,sans-serif;color:#7a6a55;pointer-events:none}.m-gerald-keynote-flipl{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;background:#fdfbf2;z-index:4;pointer-events:none}.m-gerald-keynote-fiasco .m-gerald-keynote-flipl{display:flex}.m-gerald-keynote-flipn{font:900 clamp(10px,3cqw,16px)/1 system-ui,sans-serif;filter:blur(2px);letter-spacing:.1em}.m-gerald-keynote-flipt{font:700 clamp(15px,6cqw,44px)/1.1 Georgia,serif;text-align:center;padding:0 4cqw;filter:blur(.6px)}.m-gerald-keynote-qa{position:absolute;left:3%;right:3%;bottom:15%;display:none;gap:1.6cqw;justify-content:center;flex-wrap:wrap;z-index:3}
.m-gerald-keynote-qa.m-gerald-keynote-on{display:flex}.m-gerald-keynote-card{border:2px solid var(--gk-ink);background:var(--gk-lilac);color:var(--gk-ink);font:800 clamp(9px,2.6cqw,14px)/1.15 system-ui,sans-serif;padding:1.2cqw 2cqw;border-radius:8px;cursor:pointer;box-shadow:2px 2px 0 var(--gk-ink);max-width:31%}.m-gerald-keynote-card:disabled{background:#e9e2fa;cursor:default}.m-gerald-keynote-sl.m-gerald-keynote-jud{animation:m-gerald-keynote-jud .3s}.m-gerald-keynote-tr0{animation:m-gerald-keynote-t0 .35s}.m-gerald-keynote-tr1{animation:m-gerald-keynote-t1 .35s}.m-gerald-keynote-tr2{animation:m-gerald-keynote-t2 .35s}.m-gerald-keynote-tr3{animation:m-gerald-keynote-t3 .35s}.m-gerald-keynote-tr4{animation:m-gerald-keynote-t4 .35s}.m-gerald-keynote-tr5{animation:m-gerald-keynote-t5 .35s}.m-gerald-keynote-tr6{animation:m-gerald-keynote-t6 .45s}.m-gerald-keynote-shrink .m-gerald-keynote-sl{transform:scale(.9)}
.m-gerald-keynote-side{grid-area:sid;display:flex;flex-direction:column;gap:12px;min-width:0}.m-gerald-keynote-pad{background:#fff7b8;color:var(--gk-ink);border:3px solid var(--gk-ink);box-shadow:4px 4px 0 var(--gk-ink);transform:rotate(.6deg)}.m-gerald-keynote-padh{background:var(--gk-lilac);border-bottom:3px solid var(--gk-ink);font:900 11px/1 system-ui,sans-serif;letter-spacing:.05em;padding:7px 8px}.m-gerald-keynote-row{min-height:36px;padding:1px 8px;font:12px/17px "Courier New",monospace;background:repeating-linear-gradient(transparent 0 16px,#9fc4d8 16px 17px);overflow-wrap:anywhere}.m-gerald-keynote-old{text-decoration:line-through}.m-gerald-keynote-padf{font:italic 10px/1.25 Georgia,serif;padding:4px 8px;border-top:1px dashed #8c7b4a}
.m-gerald-keynote-placard{background:var(--gk-cream);color:var(--gk-ink);border:3px solid var(--gk-ink);box-shadow:4px 4px 0 var(--gk-ink);padding:6px 8px;font:900 11px/1.3 system-ui,sans-serif;letter-spacing:.04em}.m-gerald-keynote-placard p{margin:3px 0}.m-gerald-keynote-shake{animation:m-gerald-keynote-shake .5s}.m-gerald-keynote-gcol{grid-area:ger;position:relative;display:flex;align-items:flex-end;gap:12px;min-width:0}.m-gerald-keynote-field{display:none;position:absolute;left:0;bottom:0;width:132px;height:156px;background:linear-gradient(#cfe9ff 0 48%,#9bc27a 48%);border:3px solid var(--gk-ink)}.m-gerald-keynote-field::after{content:"";position:absolute;left:8%;right:8%;top:40%;height:14%;background:repeating-linear-gradient(90deg,#6b4a2a 0 3px,transparent 3px 14px);transform:skewY(-5deg)}
.m-gerald-keynote-sc-field .m-gerald-keynote-field{display:block}.m-gerald-keynote-sc-field .m-gerald-keynote-stage,.m-gerald-keynote-sc-field .m-gerald-keynote-gcol{filter:sepia(1) saturate(.8)}.m-gerald-keynote-sc-field .m-gerald-keynote-lan,.m-gerald-keynote-sc-field .m-gerald-keynote-lcard{display:none}.m-gerald-keynote-gbtn{position:relative;flex:none;width:132px;height:156px;padding:0;border:0;background:none;cursor:pointer;z-index:1;transition:transform .5s}.m-gerald-keynote-gbtn:focus-visible{outline:3px solid var(--gk-mustard);outline-offset:2px}.m-gerald-keynote-gbody{position:absolute;left:14px;top:4px;width:104px;height:124px;border-radius:50% 50% 46% 54%;background:linear-gradient(#d6a560,#c9954f);border:3px solid var(--gk-ink);transform-origin:50% 100%;animation:m-gerald-keynote-breath var(--gk-breath,4s) ease-in-out infinite}
.m-gerald-keynote-spot{position:absolute;width:9px;height:7px;border-radius:50%;background:#a67433}.m-gerald-keynote-eye{position:absolute;top:32px;width:19px;height:21px;border-radius:50%;background:#fff;border:2px solid var(--gk-ink);overflow:hidden;transition:transform .15s}.m-gerald-keynote-e1{left:22px}.m-gerald-keynote-e2{left:58px}.m-gerald-keynote-pupil{position:absolute;left:5px;top:6px;width:8px;height:9px;border-radius:50%;background:var(--gk-ink)}.m-gerald-keynote-brow{position:absolute;top:22px;width:18px;height:3px;background:var(--gk-ink);opacity:0;transition:all .15s}.m-gerald-keynote-b1{left:22px}.m-gerald-keynote-b2{left:58px}
.m-gerald-keynote-mouth{position:absolute;left:41px;top:72px;width:22px;height:8px;border-bottom:3px solid var(--gk-ink);border-radius:0 0 20px 20px}.m-gerald-keynote-tear{position:absolute;top:56px;width:7px;height:10px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#8ecbff;opacity:0}.m-gerald-keynote-t1{left:28px}.m-gerald-keynote-t2{left:64px}.m-gerald-keynote-sweat{position:absolute;left:84px;top:22px;width:7px;height:11px;border-radius:50%;background:#8ecbff;opacity:0}.m-gerald-keynote-spark{position:absolute;left:56px;top:92px;opacity:0;font-size:14px}.m-gerald-keynote-lan{position:absolute;left:50px;top:78px;width:8px;height:48px;background:var(--gk-mustard);border:2px solid var(--gk-ink);transform:rotate(8deg)}
.m-gerald-keynote-lcard{position:absolute;left:34px;top:112px;width:42px;height:24px;background:#fff;border:2px solid var(--gk-ink);color:var(--gk-ink);font:700 6px/1.1 system-ui,sans-serif;text-align:center;padding-top:4px;white-space:pre-line;overflow:hidden}.m-gerald-keynote-tie{position:absolute;left:68px;top:84px;width:12px;height:12px;background:var(--gk-coral);border:2px solid var(--gk-ink);transform:rotate(45deg)}.m-gerald-keynote-arm{position:absolute;top:64px;width:15px;height:44px;border-radius:9px;background:linear-gradient(#d6a560,#c9954f);border:3px solid var(--gk-ink)}.m-gerald-keynote-a1{left:0;transform:rotate(18deg)}.m-gerald-keynote-a2{right:0;transform:rotate(-18deg)}.m-gerald-keynote-lect{position:absolute;left:4px;right:4px;bottom:0;height:42px;background:linear-gradient(#a06a35,#7a4d24);clip-path:polygon(8% 0,92% 0,100% 100%,0 100%)}.m-gerald-keynote-sprout{position:absolute;left:52px;top:-12px;font-size:12px;transform-origin:50% 100%}
.m-gerald-keynote-sp2{font-size:16px}.m-gerald-keynote-sp3{font-size:20px}.m-gerald-keynote-sp4{font-size:25px;top:-18px}.m-gerald-keynote-sp5{font-size:30px;top:-24px}.m-gerald-keynote-jr{position:absolute;right:-4px;bottom:26px;font-size:20px;z-index:2}.m-gerald-keynote-jrb{position:absolute;left:10px;bottom:26px;width:110px;background:var(--gk-cream);color:var(--gk-ink);border:2px solid var(--gk-ink);border-radius:8px;padding:2px 5px;font:700 10px/1.2 Georgia,serif}.m-gerald-keynote-f-moved .m-gerald-keynote-eye{transform:scaleY(.35)}.m-gerald-keynote-f-moved .m-gerald-keynote-tear{animation:m-gerald-keynote-tear .9s ease-in infinite}.m-gerald-keynote-f-moved .m-gerald-keynote-spark{animation:m-gerald-keynote-spark 1s}
.m-gerald-keynote-f-rushed .m-gerald-keynote-eye{transform:scale(1.25)}.m-gerald-keynote-f-rushed .m-gerald-keynote-a2{animation:m-gerald-keynote-wave .3s infinite}.m-gerald-keynote-f-improv .m-gerald-keynote-brow{opacity:1;top:14px}.m-gerald-keynote-f-panic .m-gerald-keynote-eye{transform:scale(1.4)}.m-gerald-keynote-f-panic .m-gerald-keynote-sweat{opacity:1;animation:m-gerald-keynote-tear 1s infinite}.m-gerald-keynote-f-sleep .m-gerald-keynote-eye{transform:scaleY(.12)}
.m-gerald-keynote-f-sleep .m-gerald-keynote-gbody{transform:rotate(12deg)}.m-gerald-keynote-f-field .m-gerald-keynote-gbody{transform:scale(.92)}.m-gerald-keynote-wave .m-gerald-keynote-a1{animation:m-gerald-keynote-wave .3s 3}.m-gerald-keynote-walk{transform:translateX(24px) rotate(4deg)}.m-gerald-keynote-left{transform:translateX(-18px)}.m-gerald-keynote-bump{animation:m-gerald-keynote-bump .4s}
.m-gerald-keynote-bubble{position:relative;flex:1;min-width:0;min-height:80px;background:var(--gk-cream);color:var(--gk-ink);border:3px solid var(--gk-ink);border-radius:14px;box-shadow:3px 3px 0 var(--gk-ink);padding:10px 12px;font:600 15px/1.35 Georgia,serif;overflow-wrap:anywhere;align-self:center}.m-gerald-keynote-bubble::before{content:"";position:absolute;left:-11px;bottom:22px;width:16px;height:16px;background:var(--gk-cream);border-left:3px solid var(--gk-ink);border-bottom:3px solid var(--gk-ink);transform:rotate(45deg)}.m-gerald-keynote-bubble:empty::after{content:"...";opacity:.4}.m-gerald-keynote-pop{animation:m-gerald-keynote-pop .2s}.m-gerald-keynote-fs1{font-size:20px}.m-gerald-keynote-fs2{font-size:28px}.m-gerald-keynote-fs3{font-size:40px;line-height:1.1}.m-gerald-keynote-lstp{position:absolute;left:36px;bottom:24px;width:46px;height:20px;background:var(--gk-red);border:2px solid var(--gk-ink);border-radius:5px 12px 3px 3px;z-index:2}
.m-gerald-keynote-clk{grid-area:clk;display:flex;flex-direction:column;align-items:center;gap:2px}.m-gerald-keynote-pot{font-size:22px;display:block;transform-origin:50% 100%;animation:m-gerald-keynote-sway var(--gk-sway,2s) ease-in-out infinite}.m-gerald-keynote-ringw{position:relative;width:136px;height:136px}.m-gerald-keynote-ring{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.m-gerald-keynote-prog{stroke:#8a8272}.m-gerald-keynote-ring .m-gerald-keynote-olin{stroke-width:1.5}
.m-gerald-keynote-zR .m-gerald-keynote-prog{stroke:var(--gk-coral)}.m-gerald-keynote-zF .m-gerald-keynote-prog{stroke:var(--gk-mint)}.m-gerald-keynote-zM .m-gerald-keynote-prog{stroke:var(--gk-gold)}.m-gerald-keynote-zL .m-gerald-keynote-prog{stroke:#8a8272}.m-gerald-keynote-clicker{position:absolute;left:12px;top:12px;width:112px;height:112px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f7d27a,var(--gk-mustard) 65%);border:3px solid var(--gk-ink);color:var(--gk-ink);font:900 18px system-ui,sans-serif;letter-spacing:.06em;cursor:pointer;box-shadow:0 5px 0 #a8791f;transition:transform .08s}.m-gerald-keynote-clicker:active,.m-gerald-keynote-press{transform:scale(.92)}.m-gerald-keynote-clicker:focus-visible{outline:3px solid #fff;outline-offset:3px}.m-gerald-keynote-clicker.m-gerald-keynote-foam{background:#f8b6c8;box-shadow:inset -8px -10px 0 rgba(0,0,0,.12),inset 6px 6px 0 rgba(255,255,255,.55)}
.m-gerald-keynote-squash{animation:m-gerald-keynote-squash .25s}.m-gerald-keynote-led{position:absolute;left:18px;top:20px;width:10px;height:10px;border-radius:50%;background:var(--gk-red);border:2px solid var(--gk-ink);pointer-events:none;z-index:2}.m-gerald-keynote-led.m-gerald-keynote-on{background:var(--gk-mint)}.m-gerald-keynote-batt{position:absolute;right:0;top:0;width:34px;height:16px;border:2px solid var(--gk-cream);border-radius:3px;font:900 9px/12px system-ui,sans-serif;text-align:center;color:var(--gk-cream);overflow:hidden}.m-gerald-keynote-bfill{position:absolute;left:0;top:0;bottom:0;background:rgba(143,213,166,.55)}.m-gerald-keynote-batt b{position:relative}
.m-gerald-keynote-rcap{margin:0;min-height:1.4em;font:700 13px/1.3 system-ui,sans-serif;text-align:center}.m-gerald-keynote-aud{display:flex;flex-wrap:wrap;align-items:flex-end;gap:12px;background:#0d262b;border-radius:8px;padding:8px 10px;min-height:56px}.m-gerald-keynote-mem{display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:0;padding:2px 4px;color:inherit;cursor:pointer;transition:opacity 1.5s}.m-gerald-keynote-face{display:block;font-size:26px;line-height:1;transform-origin:50% 100%}.m-gerald-keynote-nm{background:var(--gk-cream);color:var(--gk-ink);font:800 9px/1 system-ui,sans-serif;padding:2px 4px;border-radius:3px}.m-gerald-keynote-lean .m-gerald-keynote-face{animation:m-gerald-keynote-lean 1.2s}
.m-gerald-keynote-brenda .m-gerald-keynote-face{animation:m-gerald-keynote-nod 3.4s ease-in-out infinite}.m-gerald-keynote-gone{opacity:0}.m-gerald-keynote-back{transition:opacity .6s}.m-gerald-keynote-stps{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end}.m-gerald-keynote-stp{position:relative;width:46px;height:34px;background:none;border:0;padding:0;cursor:pointer;color:inherit}.m-gerald-keynote-stb{position:absolute;left:3px;bottom:2px;width:40px;height:11px;background:var(--gk-red);border:2px solid #1d120c;border-radius:3px 3px 5px 5px;transform-origin:50% 100%}
.m-gerald-keynote-sth{position:absolute;left:3px;bottom:12px;width:38px;height:9px;background:var(--gk-red);border:2px solid #1d120c;border-radius:6px 9px 2px 2px;transform-origin:4px 100%}.m-gerald-keynote-rep{display:none;position:absolute;left:8px;top:-3px;background:var(--gk-cream);color:var(--gk-ink);font:900 6px/1 system-ui,sans-serif;padding:1px 2px}.m-gerald-keynote-hasrep .m-gerald-keynote-first .m-gerald-keynote-rep{display:block}.m-gerald-keynote-lany .m-gerald-keynote-stp::after{content:"STAPLER";position:absolute;left:8px;bottom:-5px;font:900 5px/1 system-ui,sans-serif;background:var(--gk-mustard);color:var(--gk-ink);padding:0 2px}.m-gerald-keynote-clap .m-gerald-keynote-sth{animation:m-gerald-keynote-clh .3s var(--gk-d,0s)}.m-gerald-keynote-clap .m-gerald-keynote-stb{animation:m-gerald-keynote-clb .3s var(--gk-d,0s)}
.m-gerald-keynote-stand .m-gerald-keynote-stb{transform:rotate(-80deg)}.m-gerald-keynote-away{visibility:hidden}.m-gerald-keynote-staple{position:absolute;left:0;top:0;width:6px;height:3px;background:#c9c0a8;opacity:0;pointer-events:none;z-index:6}.m-gerald-keynote-staple.m-gerald-keynote-go{animation:m-gerald-keynote-fly 1.2s ease-out}.m-gerald-keynote-fl{position:absolute;left:0;top:0;font:900 20px/1 system-ui,sans-serif;color:var(--gk-gold);text-shadow:2px 2px 0 #1d120c;pointer-events:none;opacity:0;z-index:8;transform:translate(-50%,0)}.m-gerald-keynote-fl.m-gerald-keynote-go{animation:m-gerald-keynote-fl 1s ease-out}
.m-gerald-keynote-fl.m-gerald-keynote-small{font-size:12px}.m-gerald-keynote-dim,.m-gerald-keynote-black{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .6s;z-index:20;background:rgba(0,0,0,.6)}.m-gerald-keynote-black{background:#000;z-index:30;transition:opacity .3s}.m-gerald-keynote-dim.m-gerald-keynote-on,.m-gerald-keynote-black.m-gerald-keynote-on{opacity:1}.m-gerald-keynote-black{display:flex;align-items:flex-end;justify-content:center;padding:12px;color:#8a8272;font:700 12px system-ui,sans-serif}.m-gerald-keynote-bcap{display:none}.m-gerald-keynote-bhint .m-gerald-keynote-bcap{display:block}.m-gerald-keynote-black.m-gerald-keynote-on.m-gerald-keynote-bhint{pointer-events:auto;cursor:pointer}.m-gerald-keynote-narrow{grid-template-columns:minmax(0,1fr) 112px;grid-template-areas:"ban ban" "stg stg" "ger clk" "sid sid"}
.m-gerald-keynote-narrow .m-gerald-keynote-gcol{flex-direction:column;align-items:stretch;gap:6px}.m-gerald-keynote-narrow .m-gerald-keynote-gbtn{zoom:.7;margin-bottom:-22px}.m-gerald-keynote-narrow .m-gerald-keynote-field{zoom:.7}.m-gerald-keynote-narrow .m-gerald-keynote-bubble{font-size:13px;min-height:10.5em;padding:8px;align-self:stretch}.m-gerald-keynote-narrow .m-gerald-keynote-bubble::before{display:none}.m-gerald-keynote-narrow .m-gerald-keynote-fs1{font-size:16px}.m-gerald-keynote-narrow .m-gerald-keynote-fs2{font-size:20px}.m-gerald-keynote-narrow .m-gerald-keynote-fs3{font-size:26px}
.m-gerald-keynote-narrow .m-gerald-keynote-ringw{width:112px;height:112px}.m-gerald-keynote-narrow .m-gerald-keynote-clicker{left:8px;top:8px;width:96px;height:96px}.m-gerald-keynote-narrow .m-gerald-keynote-led{left:12px;top:14px}.m-gerald-keynote-narrow .m-gerald-keynote-row:nth-child(n+3){display:none}.m-gerald-keynote-narrow .m-gerald-keynote-nm{display:none}.m-gerald-keynote-narrow .m-gerald-keynote-banner{font-size:10px}
.m-gerald-keynote-narrow .m-gerald-keynote-placard{font-size:10px}.m-gerald-keynote-tiny .m-gerald-keynote-frame{aspect-ratio:1/1;max-width:80%;margin:0 auto;background:#fff2a8;transform:rotate(-3deg);box-shadow:3px 4px 0 rgba(0,0,0,.4)}.m-gerald-keynote-tiny .m-gerald-keynote-frame::before{content:"";position:absolute;left:50%;top:-6px;width:60px;height:16px;margin-left:-30px;background:rgba(255,255,255,.55);z-index:6}.m-gerald-keynote-tiny .m-gerald-keynote-foot,.m-gerald-keynote-tiny .m-gerald-keynote-cnt,.m-gerald-keynote-tiny .m-gerald-keynote-furn,.m-gerald-keynote-tiny .m-gerald-keynote-cap{display:none}.m-gerald-keynote-tiny .m-gerald-keynote-title{font-size:clamp(14px,9cqw,40px)}.m-gerald-keynote-tiny .m-gerald-keynote-beam,.m-gerald-keynote-tiny .m-gerald-keynote-proj{display:none}
@keyframes m-gerald-keynote-breath{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}@keyframes m-gerald-keynote-sway{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(14deg)}}@keyframes m-gerald-keynote-jud{0%,100%{transform:translateX(0)}20%{transform:translateX(-2.5cqw)}40%{transform:translateX(2.2cqw)}60%{transform:translateX(-1.6cqw)}80%{transform:translateX(1cqw)}}@keyframes m-gerald-keynote-t0{from{opacity:0}}@keyframes m-gerald-keynote-t1{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}@keyframes m-gerald-keynote-t2{from{transform:perspective(600px) rotateY(80deg);opacity:.2}}
@keyframes m-gerald-keynote-t3{from{transform:rotate(4deg) scale(.97)}}@keyframes m-gerald-keynote-t4{from{transform:scale(.86);opacity:.3}}@keyframes m-gerald-keynote-t5{from{opacity:.4}}@keyframes m-gerald-keynote-t6{from{transform:translateY(100%)}}@keyframes m-gerald-keynote-fade{from{opacity:.2}}@keyframes m-gerald-keynote-cflip{from{transform:rotateX(90deg)}}
@keyframes m-gerald-keynote-stick{from{transform:scale(1.8) rotate(8deg);opacity:0}}@keyframes m-gerald-keynote-peel{to{transform:rotate(30deg) translate(20px,-30px);opacity:0}}@keyframes m-gerald-keynote-stamp{from{transform:rotate(-8deg) scale(2);opacity:0}}@keyframes m-gerald-keynote-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes m-gerald-keynote-tear{0%{transform:translateY(0);opacity:.9}100%{transform:translateY(36px);opacity:0}}@keyframes m-gerald-keynote-spark{0%{opacity:1;transform:scale(.4)}100%{opacity:0;transform:scale(1.6)}}
@keyframes m-gerald-keynote-wave{0%,100%{transform:rotate(-18deg)}50%{transform:rotate(-70deg)}}@keyframes m-gerald-keynote-bump{0%,100%{transform:translateX(0)}40%{transform:translateX(10px)}}@keyframes m-gerald-keynote-pop{from{transform:scale(.96)}}@keyframes m-gerald-keynote-squash{0%,100%{transform:scale(1)}40%{transform:scaleY(.7) scaleX(1.12)}}@keyframes m-gerald-keynote-lean{0%,100%{transform:rotate(0)}30%,70%{transform:rotate(8deg)}}@keyframes m-gerald-keynote-nod{0%,60%,100%{transform:rotate(0)}70%{transform:rotate(-6deg)}80%{transform:rotate(5deg)}}
@keyframes m-gerald-keynote-clh{40%{transform:rotate(-18deg)}}@keyframes m-gerald-keynote-clb{40%{transform:scaleY(.8)}}@keyframes m-gerald-keynote-fly{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-160px) rotate(300deg)}}@keyframes m-gerald-keynote-fl{0%{opacity:0;transform:translate(-50%,0)}20%{opacity:1}100%{opacity:0;transform:translate(-50%,-44px)}}@media (prefers-reduced-motion:reduce){.m-gerald-keynote-gbody,.m-gerald-keynote-pot,.m-gerald-keynote-brenda .m-gerald-keynote-face{animation:none}.m-gerald-keynote-tr0,.m-gerald-keynote-tr1,.m-gerald-keynote-tr2,.m-gerald-keynote-tr3,.m-gerald-keynote-tr4,.m-gerald-keynote-tr5,.m-gerald-keynote-tr6{animation:m-gerald-keynote-fade .15s}.m-gerald-keynote-sl.m-gerald-keynote-jud{animation:none}.m-gerald-keynote-f-moved .m-gerald-keynote-tear,.m-gerald-keynote-f-panic .m-gerald-keynote-sweat{animation:none}}.pm-reduce-motion .m-gerald-keynote-gbody,.pm-reduce-motion .m-gerald-keynote-pot,.pm-reduce-motion .m-gerald-keynote-brenda .m-gerald-keynote-face{animation:none}
.pm-reduce-motion .m-gerald-keynote-tr0,.pm-reduce-motion .m-gerald-keynote-tr1,.pm-reduce-motion .m-gerald-keynote-tr2,.pm-reduce-motion .m-gerald-keynote-tr3,.pm-reduce-motion .m-gerald-keynote-tr4,.pm-reduce-motion .m-gerald-keynote-tr5,.pm-reduce-motion .m-gerald-keynote-tr6{animation:m-gerald-keynote-fade .15s}.pm-reduce-motion .m-gerald-keynote-sl.m-gerald-keynote-jud{animation:none}.pm-reduce-motion .m-gerald-keynote-f-moved .m-gerald-keynote-tear,.pm-reduce-motion .m-gerald-keynote-f-panic .m-gerald-keynote-sweat{animation:none}
@media (prefers-reduced-motion:reduce){.m-gerald-keynote-note,.m-gerald-keynote-appr,.m-gerald-keynote-shake,.m-gerald-keynote-bump,.m-gerald-keynote-wave .m-gerald-keynote-a1,.m-gerald-keynote-f-rushed .m-gerald-keynote-a2,.m-gerald-keynote-squash,.m-gerald-keynote-lean .m-gerald-keynote-face,.m-gerald-keynote-fl.m-gerald-keynote-go,.m-gerald-keynote-staple.m-gerald-keynote-go,.m-gerald-keynote-half .m-gerald-keynote-cnt,.m-gerald-keynote-pop,.m-gerald-keynote-f-moved .m-gerald-keynote-spark,.m-gerald-keynote-clap .m-gerald-keynote-sth,.m-gerald-keynote-clap .m-gerald-keynote-stb{animation:none}.m-gerald-keynote-frame,.m-gerald-keynote-gbtn,.m-gerald-keynote-sl{transition:none}}
.pm-reduce-motion .m-gerald-keynote-note,.pm-reduce-motion .m-gerald-keynote-appr,.pm-reduce-motion .m-gerald-keynote-shake,.pm-reduce-motion .m-gerald-keynote-bump,.pm-reduce-motion .m-gerald-keynote-wave .m-gerald-keynote-a1,.pm-reduce-motion .m-gerald-keynote-f-rushed .m-gerald-keynote-a2,.pm-reduce-motion .m-gerald-keynote-squash,.pm-reduce-motion .m-gerald-keynote-lean .m-gerald-keynote-face,.pm-reduce-motion .m-gerald-keynote-fl.m-gerald-keynote-go,.pm-reduce-motion .m-gerald-keynote-staple.m-gerald-keynote-go,.pm-reduce-motion .m-gerald-keynote-half .m-gerald-keynote-cnt,.pm-reduce-motion .m-gerald-keynote-pop,.pm-reduce-motion .m-gerald-keynote-f-moved .m-gerald-keynote-spark,.pm-reduce-motion .m-gerald-keynote-clap .m-gerald-keynote-sth,.pm-reduce-motion .m-gerald-keynote-clap .m-gerald-keynote-stb{animation:none}.pm-reduce-motion .m-gerald-keynote-frame,.pm-reduce-motion .m-gerald-keynote-gbtn,.pm-reduce-motion .m-gerald-keynote-sl{transition:none}
@media (pointer:coarse){.m-gerald-keynote-mem,.m-gerald-keynote-stp{min-height:40px;min-width:44px}.m-gerald-keynote-card,.m-gerald-keynote-chip{min-height:40px}.m-gerald-keynote-bar{min-width:28px}}
`, 'css-gerald-keynote');

  P.addAchievements([
    { id: 'gerald-keynote.forward', name: 'Grand Master of the Forward Motion (Seventh Degree)', desc: "Advance 10 slides. Gerald presents the certificate: it is a slide that says 'Certificate.'", icon: '⏩', reward: 2, check: function (s) { return (s[ST + 'slides'] || 0) >= 10; } },
    { id: 'gerald-keynote.golden', name: 'Supreme Minister of the Golden Moment', desc: 'Land 5 Moved clicks. Gerald is moved. So are the staplers.', icon: '✨', reward: 3, check: function (s) { return (s[ST + 'moved'] || 0) >= 5; } },
    { id: 'gerald-keynote.impatience', name: 'Hereditary Archduke of Impatience', desc: 'Rush Gerald 10 times. He was not finished being moved on any of those occasions.', icon: '⏱️', reward: 2, check: function (s) { return (s[ST + 'rushed'] || 0) >= 10; } },
    { id: 'gerald-keynote.sacredblank', name: 'Keeper of the Sacred Blank', desc: 'Reach Slide 7 1/2 for the first time and hear a single stapler applaud.', icon: '📄', reward: 7.5 },
    { id: 'gerald-keynote.laser', name: 'Laureate of the Laser Arts, Red-Dot Division', desc: 'Hold the laser pointer on 5 different words in a single presentation. Gerald thanks you for pointing at roughly.', icon: '🔴', reward: 3 },
    { id: 'gerald-keynote.sandra', name: 'Compliant With Sandra, Provisionally', desc: "Dismiss 5 of Sandra's flags. She has flagged the dismissals.", icon: '🚩', reward: 3, check: function (s) { return (s[ST + 'flags'] || 0) >= 5; } },
    { id: 'gerald-keynote.employee', name: 'Employee of the Quarter (Quarter Redacted)', desc: 'Be presented with your own slide. Without you it is just a man talking.', icon: '🏅', reward: 5 },
    { id: 'gerald-keynote.reprise', name: 'Congratulations (The Keynote Has Not Completed You)', desc: 'Reach the end of the keynote, which is a loop.', icon: '🔁', reward: 5 },
    { id: 'gerald-keynote.field', name: 'Doctor Emeritus of the Pause (Honorary, Unaccredited)', desc: 'SECRET. Do nothing for 60 seconds, and let Gerald speak about a field.', icon: '🌾', secret: true, reward: 7.5 },
    { id: 'gerald-keynote.foam', name: 'Confiscated Clicker Laureate, First Class (Foam)', desc: 'SECRET. Click so fast that Sandra from Compliance issues you a foam clicker.', icon: '🎈', secret: true, reward: 5 },
    { id: 'gerald-keynote.zeno', name: 'Zeno, Patron Saint of Almost Applause', desc: 'SECRET. Go back past 7 1/2 and keep going. The applause gets quieter and no less sincere.', icon: '➗', secret: true, reward: 7.5 },
    { id: 'gerald-keynote.stapler', name: 'Senior Fellow of the Single Clap', desc: 'SECRET. Press the stapler seven times on a blank slide and hear its speech.', icon: '📎', secret: true, reward: 7.5 },
    { id: 'gerald-keynote.sprout', name: 'Custodian of Emotional Growth (Roughly)', desc: 'SECRET. Move Gerald so deeply that something grows.', icon: '🌱', secret: true, reward: 5 },
    { id: 'gerald-keynote.waited', name: 'The Man Who Waited For A Potato', desc: "SECRET. Stay idle through the sandwich, the nap and 'Back in 5 (Q3)'.", icon: '🥪', secret: true, reward: 10 },
    { id: 'gerald-keynote.promoted', name: 'Vice President of Spuds (Acting), Effective Immediately, Revocable By Tuesday', desc: 'SECRET. Sit through ten minutes of a potato. Someone has been counting, and they have been moved to act.', icon: '🥔', secret: true, reward: 10 },
    { id: 'gerald-keynote.sticky', name: 'Emperor of the Sticky Note', desc: 'SECRET. Shrink the room until the projector is a sticky note, and keep presenting.', icon: '📝', secret: true, reward: 3 }
  ]);

  const MG = [
    "Per my previous slide, please advance.",
    "Gerald's keynote is rated 9.7 out of 7 1/2 by the audience of one stapler. Management considers this a mandate.",
    "The deck contains no content. It contains content-adjacent titles. This distinction will matter at the retrospective.",
    "Dennis (Plant) has taken notes. They are photosynthesis. They are not impressed.",
    "Dennis (Plant) has not applauded. Dennis considers applause a kind of weather.",
    "Brenda in Row 3 has nodded. It was the third nod. It was not at anything.",
    "Management would like it noted that nobody has asked what Gerald is Vice President of. It is Spuds. It has always been Spuds.",
    "The projector is on. The projector has not been asked what it thinks.",
    "The room is 21 degrees. Sandra has asked that it feel like 19. The room is working on it.",
    "Refreshments will be served after the keynote. They were served before the keynote. Please see the empty tray.",
    "Attendance is being taken by a clipboard. The clipboard has been leaning on Row 2 since nine.",
    "A reminder that the exits are marked with affirmations. The nearest one says 'You are doing fine.'",
    "Management has been asked whether this is the final slide. Management has said 'ask the stapler'.",
    "Parking validation is available for the keynote. The keynote has no parking. The validation is emotional.",
    "The microphone is not plugged in. It is working beautifully.",
    "Please silence your devices. Gerald has silenced his. It is not silent. It is, technically, his mother.",
    "Gerald supports the keyboard. Space advances, the left arrow regrets, and B turns the lights off, which has never helped anyone.",
    "The red dot is yours: move the mouse, hold a finger down, or press L and steer with the arrows. Gerald calls this 'pointing, but earnest'."
  ];
  P.addLines('m:gerald-keynote:mgmt', MG);

  /* ---------- slide table ---------- */
  const HAND = [
    [1, "Synergy, Roughly", "Friends, we gather today because gathering is the first step of having gathered."],
    [2, "Q3: A Retrospective on Q2's Prospective Q4", "Q3 looked back at Q2, which was looking forward at Q4. It was the most anyone has ever looked."],
    [3, "Our Values (Pending)", "Our values are listed below, once someone decides what they are. Until then, please enjoy the bullets."],
    [4, "Growth, Directionally", "Growth is simply the soil's way of saying, 'I have been up to something.'"],
    [5, "The Journey Is Also a Destination", "A journey is a destination that has not stopped moving. A destination is a journey that sat down."],
    [6, "Stakeholders: A Brief History of Standing", "A stakeholder is anyone who has stood near a stake. By that definition we are all deeply held."],
    [7, "Alignment: Where Are the Walls", "Alignment means everything faces one direction. I have checked. Everything is facing the door."],
    [8, "Leveraging the Leverage", "To leverage a lever is to admit you cannot lift the lever yourself. I admit it. I am a potato.", 'arrows'],
    [9, "Learnings We Have Had Before", "We have learned this before. We learned it so well we forgot, which is how you know it took."],
    [10, "Bandwidth, But Emotionally", "Bandwidth is how much of you is free on a Thursday. I have 14 percent. It is mostly sighing.", 'bars'],
    [11, "Pivot (Gentle)", "We will pivot gently, so as not to wake the strategy."],
    [12, "Next Steps: Steps", "Step one is step two's neighbour. Step three is a rumour. We will meet at the rumour.", 'pyramid'],
    [13, "Q6: A Retrospective on Q5's Retrospective on Q4's Prospective Q7", "Q6 looked back at Q5, which looked back at Q4, which was looking forward at Q7. Nobody has ever seen so much calendar."],
    [14, "Low-Hanging Fruit: A Cautionary Tale", "Low-hanging fruit teaches us that all of nature is within reach of a tall enough regret.", 'photo'],
    [15, "The Org Chart (A Circle)", "Everyone reports to the person on their left. Brenda reports to the room. The room reports to Tuesday.", 'org'],
    [16, "Where Our Efforts Went", "As you can see, 100 percent of our efforts went to 'Other.' We are proud of Other.", 'pie'],
    [17, "Stakeholder Overlap", "The circle overlaps with itself. This is where all great partnerships begin.", 'venn'],
    [18, "[REDACTED]", null, 'none', 'redacted'],
    [19, "Q9: A Retrospective on the Retrospective on the Retrospective, Prospectively.", "Q9 is a retrospective of a retrospective of a retrospective. It is mostly looking, and it is prospectively tired."],
    [22, "Gerald Has Lost His Place", "I seem to have lost my place. You have it, I think. Say a word. Any word. Make it a good one.", 'none', 'roles'],
    [24, "Q3: A Retrospective on Your Clicking", null, 'none', 'retro'],
    [26, "Next Steps: Tuesday", "Next Steps: Tuesday. We do not advance past Tuesday. It is not a slide. It is the room.", 'none', 'tuesday'],
    [29, "Employee of the Quarter (Quarter Redacted)", "Without the clicker, a presentation is just a man talking. With the clicker, it is a man talking, and being moved at.", 'polaroid', 'employee'],
    [36, "Thank You", "Thank you. Questions? There are none. I am deeply moved by the none.", 'none', 'thanks']
  ];
  const HALVES = [7, 12, 17, 22, 27, 32];
  const TB = ["Headwinds, Warmly", "Learnings (Draft)", "Deliverables: A Gentle Reminder", "The Roadmap Is Also a Road", "Optics, Closely", "Ownership of Ownership", "Silos: A Love Story", "Runway (Pending Runway)", "Deep Dive (Shallow End)", "Pain Points, Painlessly", "Quick Wins, Slowly", "A Forecast (Indoors)", "Stakeholders, Continued", "Mission, Vision, Lunch", "Core Competencies (Non-Core)", "Our Culture Is Also Culture", "Touch Base: Light Contact Only", "Appendix A (Appendix)", "Risks: Several", "Pre-Read (Read It To Me)", "Q&A (Just the A)", "The Elephant in the Room (The Room Is Also an Elephant)", "A Word From Our Sponsors (No Word)", "Circle Back to the Slide We Skipped", "Bandwidth: A Follow-Up to Bandwidth", "Parking Lot (Items)", "The Ask (Not Asked)", "Value Proposition: Value", "Growth Hacking: Not Recommended", "Synergy, Continued Roughly", "Agenda: Items 1 to 7 1/2", "Next Steps: A Preview of Steps", "Takeaways: Please Return", "Offline Conversation (Online)", "Alignment: Revisited, Again"];
  const ADJ = ["Synergistic", "Directional", "Provisional", "Adjacent", "Aspirational", "Lateral", "Interim", "Ambient"];
  const NOUN = ["Alignment", "Headwinds", "Bandwidth", "Learnings", "Deliverables", "Stakeholders", "Optics", "Runway", "Silos", "Ownership"];
  const QUAL = ["Pending", "Gentle", "Draft", "Roughly", "Per Policy", "Technically", "Revised", "Unapproved", "Tuesday-Adjacent"];
  const GFXS = ['bars', 'pie', 'venn', 'org', 'pyramid', 'arrows', 'photo', 'none', 'none'];
  const GB = [
    "Every great potato was once a smaller potato who was told to trust the process. The process was the dirt.",
    "Synergy is two departments agreeing on a door. We are on the third door.",
    "I asked the data how it felt. The data said, 'Directionally fine.' I wept a little, directionally.",
    "Transparency means you can see through us, which is why we have installed a wall.",
    "Leadership is knowing which way is forward, and then asking someone to hold the door.",
    "Disrupt the market politely, the way one disrupts a sleeping sandwich.",
    "The cloud is just someone else's potato cellar.",
    "Our north star is far off and a little dim, but it has never once been late.",
    "Let us circle back to the beginning, which we have not left, which is the benefit of circling.",
    "Efficiency is doing nothing faster. Quarter by quarter, we are nearly there.",
    "A spud is a decision the ground made quietly.",
    "We must listen to the data. The data is sitting very still, which is a kind of speaking.",
    "Every journey of a thousand slides begins with a click, and also a spreadsheet.",
    "I have a vision. It is, per policy, a slightly blurry vision. We call this focus.",
    "Success is not a destination. It is a very long corridor with a vending machine at the end.",
    "Our Q4 projections are best described as a forecast that has been told about the rain.",
    "We are not behind schedule. The schedule is ahead of us, and getting shy.",
    "Today we are going to unlock the potential of the word unlock.",
    "Our core competency is competence at the core, which is on a different floor.",
    "We must break down silos. Please bring your own small hammer. Mind the grain.",
    "A deliverable is simply a promise that has been given a box.",
    "The customer is always right, which is why we have not asked them.",
    "We value feedback. Please leave it in the box by the door. The box has asked to be left alone.",
    "Q4 is coming. Q4 is not in a hurry. Q4 knows where we live.",
    "Let us take this offline. The offline is a lovely place. It has a pond.",
    "Our roadmap is a drawing of a road by someone who has heard roads described.",
    "I was asked to speak plainly. Plainly, I am a tuber, and I have a title.",
    "Think outside the box. Then think back inside it. The box is the only thing we know is there.",
    "This initiative has three pillars and a floor. The floor is the one we are worried about.",
    "Nobody is behind. Everyone is simply in front of someone who is in front of a wall.",
    "A stretch goal is a goal that has been asked to do yoga. It is a very small yoga.",
    "We pride ourselves on agility. Agility is the ability to stand still very suddenly.",
    "Best practice is the practice that has not yet failed in front of anyone important.",
    "Our new motto is 'Onward, Roughly.' It replaces 'Onward.' Onward was too confident.",
    "Please hold your questions until the end. The end has asked to hold its answers until the questions.",
    "The wind is not against us. It is simply in front of us, and we are inconveniently walking.",
    "A lesson is just a mistake that has been given a lanyard.",
    "Our bandwidth is wide but shallow, like a puddle with ambitions.",
    "We will dive deep. For safety, we will dive deeply in the shallow end.",
    "The next step is the one after this one. I have been walking toward it for nineteen years.",
    "Low-hanging fruit is a metaphor. We have no fruit. We have, as you can see, spuds.",
    "@FORTUNE"
  ];
  const S45 = "I hear you, stapler. We are working on a room with fewer clacks.";
  const S1PRE = "We have met. I was less moved then.";
  const S20 = HAND[0][2], S42 = "I added this slide because the old first slide felt unsupported. It had nothing under it.", S43 = "This slide introduces the introduction to the slide before it. The slide before it is thrilled.";
  const RETRO = "In this keynote you advanced %s slides. %m were moving and %r were premature. I have a sticker for the difference.";

  /* ---------- rush / moved / 7 1/2 ---------- */
  const RUSH = {
    1: "I was not finished being moved.",
    2: "Please. The ring is Gerald's feelings. Coral means he is having them. Gold means you may proceed.",
    3: "I was not finished being moved. I was barely begun. I had my hand on the feeling.",
    4: "You have clicked past a thought. It was a good one. The minutes will miss it.",
    5: "That is five times. Sandra is keeping a tally in the margin. The margin has asked for a break.",
    6: "Six. I have begun counting in the voice I use for storms.",
    7: "Seven rushes. Management has called it a pattern. Sandra has called it a lifestyle.",
    8: "I was not finished being moved, and now I am moved in a new direction, which is away.",
    9: "Nine. I have stopped taking it personally. I am taking it in the knees.",
    10: "Friend. I am a vegetable. I take time to feel. It is called 'baking.'",
    12: "I am moved. You may proceed. I will be moved again afterward, at no cost to the department.",
    15: "Fifteen. I would like to be clicked the way one waters a plant: slowly, and with some talk.",
    25: "That is 25. I have stopped being interrupted and begun being a rhythm section.",
    40: "Forty. The sentences are being written shorter now. They are not happy about it."
  };
  const R20 = "Gerald has been interrupted 20 times. He has described this as 'a rhythm'. He has not described it kindly.";
  const RBAG = ["I was not finished being moved.", "I was mid-sentence. I was mid-feeling. I am now mid-both.", "Please. The sentence was still arriving. It had its coat on.", "You have gone ahead of the feeling. The feeling is not a runner.", "I was in the middle of a feeling. You have walked through it. There is a draft now.", "The sentence was not finished. It had a second half. The second half is hurt.", "I was approaching a point. It was a long way off and I was walking carefully.", "That click arrived before the idea did. The idea is looking for a seat.", "I was not done. I am never done. That is what 'Vice President' means.", "You have clicked a man mid-clause. Please mind the clause.", "That was not the moment. The moment was behind you, holding a coffee."];
  const RSKIP = "The slide you rushed past had a second sentence. It was a good one. It is in the soil now.";
  const HRUSH = ["Gerald is being moved by the blank. He has asked for the full five seconds.", "The blank is still arriving.", "Please hold for applause. It is a hold, not a request.", "Slide 7 1/2 is not a slide you click. It is a slide you attend.", "The blank has barely begun being nothing. Please give it room.", "Please hold. The silence is being laid like a floor, and it needs to set."];
  const M1 = "Perfect. I felt that in my eyes, which are technically the sprouts.";
  const M3 = "Moved: 3. Gerald would like it noted that he is a man who has been moved three times, under oath.";
  const M7 = "You clicked exactly as the feeling peaked. Have we met? We have not. It felt like it.";
  const M10 = "Moved: 10. HR has been informed. HR has not been moved.";
  const M20 = "Gerald has been moved 20 times. HR has asked whether he needs 'a seat, or a field.'";
  const M100 = "Gerald has been moved 100 times. Management reports this is more times than a piano at a family reunion.";
  const MBAG = ["I am moved. It is in my eyes. It is also, briefly, in my lanyard.", "You waited exactly one beat. That is the whole job. I did not know it was a job.", "That landed. I felt it land. It had a small suitcase.", "Moved. Logged. Filed under 'moist, but with dignity'.", "Again, perfectly. I would like to thank the committee of one.", "Moved. I will carry it through the next slide and then hand it on, like a lamp.", "Right on the feeling. Like a man catching a hat in a wind that was only a draft.", "That was well timed. The timing has been stored in the lobby, with the others.", "I felt that in my skin, which is the part of me I am most sure about.", "A perfect click. I would say something, but your thumb has already said it.", "Moved. I am considering framing the moment. The frame would be a sigh."];
  const MREV = ["I was finished being moved, and then I was moved again.", "I was finished being moved. I am now finished being finished.", "I was finished being moved. Please hold your applause at the door.", "I was finished being moved. You moved me anyway. Your timing is a form of rude."];
  const STREAK5 = "That is five in a row. That one was right. I am not comfortable.";
  const LPAUSE = "I have never had a clicker who waited. I would like you to know this is noticed.";
  const RING_HINT = "The ring is a suggestion. Per policy, so is Gerald.";
  const RING_HINT3 = "Management has circled the ring in the handbook. Coral: wait. Mint: nearly. Gold: now. Grey: Gerald has been waiting, and is fine.";
  const ZCR = ["Gerald is composing himself.", "Gerald is locating the feeling.", "Gerald is still in the previous feeling."];
  const ZCF = ["Gerald is nearly moved.", "The feeling has its coat on.", "Gerald is gathering a face."];
  const ZCM = ["Gerald is moved. Now.", "Gerald is ready. Gerald is so ready.", "Moment available. Terms apply."];
  const ZCL = ["Gerald was moved. Gerald is now waiting to be asked.", "The moment has gone to get a coffee.", "Gerald has waited. Gerald is fine."];
  const LDOT = "The red dot is on. The arrows steer it now. Press L again to put it away and have your arrows back.";
  const LBLKB = "I have turned the lights back on. The speech was getting away from me.";
  const H_ARR = "Slide 7 1/2. It is blank. It is the best slide in the deck, and also the other one.";
  const H_RET = ["Slide 7 1/2 has returned. It was never gone. It was just between things.", "Slide 7 1/2 again. It is not repeating. It is returning.", "Slide 7 1/2 does not appear in the table of contents. It appears in the minutes.", "Slide 7 1/2 has arrived on schedule. It had no schedule. It arrived anyway.", "The blank is back. It has been working on itself.", "7 1/2. Nothing has been added. Nothing has been removed. The slide wishes to be left exactly as nothing."];
  const H_CLAP = [
    "", "A single stapler applauds. It is a very full applause. It is one stapler wide.",
    "The stapler claps once, then nods. This is its entire range, and it is magnificent.",
    "The stapler has applauded Slide 7 1/2 three times now. It considers itself a regular.",
    "The stapler's applause is described by Management as 'warm, metallic, and legally binding'.",
    "A second stapler has joined the front row. Neither is willing to say who invited whom.",
    "The two staplers clap out of sync. This is being called syncopation. Nobody has been told.",
    "Nobody asked for an encore. There is an encore. It is a single staple, fired into the air.",
    "A delegation of four staplers has been seated in Row 1. They have brought a folder.",
    "", "", "",
    "The stapler section is now 11 strong. They are all wearing lanyards. The lanyards read STAPLER."
  ];
  const H_13 = "The staplers are watching Slide 7 1/2 with cautious pride. The pride is not cautious. The caution is for the pride.";
  const H_GER = "I do not know what is on this slide. I think that is what we are all afraid of. Next.";
  const HM = ["No notes.", "I am moved by the blank. I did not know it could do that.", "I am moved by the blank. Please do not tell the other slides.", "No notes. I had notes. I have put them down, gently, on the floor of the silence."];
  const UN3 = "One clap per slide is a standing ovation, for a stapler. We would like that in writing.";
  const UN8 = "Demands: a 15 minute break, a quieter room, and for the clapping to be classified as work.";
  const DB = ["Demand 4: a chair. Demand 5: to be called 'Stapler' and not 'the stapler'.", "Demand 6: a coat, for the long silences.", "Demand 7: that the word 'staple' be used only as a compliment."];
  const SAPP = ["Sandra from Compliance has approved Slide 7 1/2. It was the only slide with nothing to redact.", "APPROVED, S.C. Sandra has initialled the blank. Her initials are larger than the slide.", "Sandra has approved Slide 7 1/2 again. She asks that the approval be kept in a drawer with the others, which are also blank.", "Sandra's approval has been noted in the margin of a document that does not exist.", "Sandra has approved the blank. She wishes to remain unseen while doing so. She has chosen the corner."];
  const MS_SET = "The Stapler is representing the staples. The staples are not here. The Stapler has brought a folding chair.";
  const MS_NEW = "You and the Stapler have now met. This is on the record.";
  const SC = [0, 1, 1, 1, 1, 2, 2, 2, 4, 5, 6, 8, 11];

  /* ---------- laser, charts, Sandra, Tuesday ---------- */
  const RIFF = {
    roughly: "Yes. Thank you for pointing at 'Roughly.' Nobody has ever pointed at roughly.",
    synergy: "You are pointing at 'Synergy.' I can feel it. It is warm. It has been waiting.",
    retrospective: "'Retrospective' is a word that points at itself. You have simply joined in.",
    journey: "You have pointed at 'Journey.' It is the only word on this slide that has packed.",
    alignment: "The dot is on 'Alignment.' Everything is now facing the dot.",
    bandwidth: "'Bandwidth.' I have 14 percent. The dot has taken some of it.",
    pivot: "You are pointing at 'Pivot.' Please be gentle. It is mid-turn.",
    steps: "'Steps.' There are none. There is only the idea of a foot.",
    values: "Our 'Values' are pending. The dot is a good place for them to wait.",
    tuesday: "Do not point at Tuesday. It will notice.",
    leverage: "You have pointed at 'Leverage.' It is lifting nothing, and proud of that.",
    growth: "'Growth.' The dot is bigger now. This is the system working.",
    fruit: "The dot is on 'Fruit.' It is hanging low. It is not being collected."
  };
  const RIFFG = ["The dot rests on '%w.' '%w' has not been rested on before.", "'%w.' A bold place to point.", "You have chosen '%w.' Sandra will want to know why.", "Pointing at '%w' is a form of reading. I support it.", "I see you looking at '%w.' I was looking at it too, privately."];
  const CIRCLE = "The dot has circled '%w' four times. I am concerned for the dot.";
  const EDGE = "The edge of the slide. There is nothing out there. I have been.";
  const CEIL = "Ah. The budget.";
  const EYE1 = "Please point at me more generally. I am not a data point. I am a data potato.";
  const EYE2 = "I would like to be pointed at in a more general way.";
  const LSTP = "I am not a word. I am a union.";
  const LDEN = "Dennis (Plant) has been pointed at. Dennis (Plant) is thriving and unavailable.";
  const CH = {
    barfirst: "This bar is Directional. The other bar is also Directional, in a different direction. Hence, growth.",
    bar: ["This bar is Pending.", "This bar has been asked to represent Q3. It has agreed, reluctantly.", "Up, up, and then sideways. Sideways is a direction. I was told it was a trend.", "This bar is the same as the last bar, but taller in spirit.", "This is the shortest bar that is still a bar. It is proud, and also under review.", "This bar represents revenue. That bar represents the other bar. They have never met.", "A bar so tall it cannot see the others. We call this leadership, or nosebleed."],
    pie: ["The pie is 100 percent Other. It is the only chart where Other is also the legend.", "The pie is whole. It has been asked to be less whole. It has declined.", "Other is the largest slice. Other has been invited. Other is bringing a dish."],
    venn: ["Overlap: Pending. The circle has been asked to overlap with something. It is willing.", "Where the circles meet is called 'the middle.' There is one circle. We are all in the middle.", "The overlap is 100 percent. Legal has asked it to be less in love with itself."],
    org: ["The arrows go clockwise. This is called a reporting line, and also a circle.", "In this org chart everyone is a manager, and everyone is managed by the idea of a manager.", "The arrows go clockwise because nobody dared suggest otherwise. Brenda has suggested otherwise, in writing. It is pending."],
    pyramid: ["The pyramid has one floor. It is a very stable pyramid. The floor is also the roof.", "It is a very short pyramid. It is also the tallest thing in its category.", "The top of the pyramid is the same as the bottom. This is called flat management, and it is going very well."],
    arrows: ["The arrows all point somewhere with great confidence. None of them have met.", "One arrow is pointing at me. I did not authorise it. I am taking it as a compliment.", "These arrows represent momentum. Momentum has not yet chosen an arrow."],
    photo: ["A stock photo of a handshake. Both hands are paid by the hour.", "This handshake has lasted four years. Neither party is permitted to be the first to let go.", "The two hands are on a break. The photo continues, out of professional courtesy."]
  };
  const FL9 = "Slide 9 is potentially a slide. Please remove the slideness.";
  const FL11 = "Slide 11 is too brief and also too long. Please make it the same length as a sigh.";
  const FLB = ["Per Section 9.4(b), subparagraph 'moist': please remove the moisture.", "This slide has been flagged as 'a lot'. Sandra has not said which part.", "Slide rated 'adequately upright'.", "Please do not use the word 'synergy' unless it is in a cage.", "Not approved. Not rejected. Please hold at 'maybe', in triplicate.", "The title is 3 words too long and 1 word too short. See attached. Nothing is attached.", "Section 12.1: Slides shall not look at one another.", "Please do not say 'moving forward' while the slide is stationary.", "Flagged for tone. The tone is flat. Please make it a more even flat.", "Item 3 is missing. There is no item 3. Please add item 3, then remove it.", "The font is making eye contact. Section 4.2: fonts shall look at the middle distance.", "Attendee count mismatch: 1 plant, 1 stapler, and 'a vibe'. Please reconcile.", "Contains 1 (one) opinion. Opinions require a witness. Witness: Dennis (Plant)."];
  const SD = ["Sandra's flag has been dismissed. Sandra has been notified. She has flagged the dismissal.", "Flag removed. A smaller flag has been placed where the flag was.", "Flag dismissed. Sandra would like it known that it was a good flag.", "Flag dismissed. It has been placed in a drawer labelled 'Not yet'.", "Sandra has accepted the dismissal as feedback. It is feedback. It is the only feedback she has received.", "Flag removed. Sandra has requested a pole from which to hang its absence.", "Dismissed. Sandra will see you on the next slide. She will not be there. That is what 'see' means here."];
  const RD = [["Strategy (redacted)", "This word is now less redacted. It is still mostly a thought."], ["[REDACTED] (redacted)", "The second word is a different kind of redacted. It is redacted from the inside."], ["(see Sandra)", "A black bar. Bold. This slide is now a rectangle, and I have never felt more represented."]];
  const RDFIN = "Sandra from Compliance has redacted 'Synergy'. Sandra has also redacted 'redacted'.";
  const TREF = [
    "Please. The clicker has been told. The clicker has not been consulted.",
    "Tuesday does not move. We move around it, like a river around a very patient rock.",
    "The click has been received. Tuesday has declined to be advanced. This is within its rights.",
    "Every deck has one slide it cannot leave. Ours is also on the agenda.",
    "Sandra has asked me not to say what happens on Tuesday. I have not been told. That is how I know it is bad.",
    "Gerald has asked Tuesday to move. Tuesday said it would think about it. It thought about it all day, which is what a Tuesday is.",
    "Tuesday does not take requests. It takes weeks.",
    "This is slide 26. It is also every Tuesday. Please be patient with it. It has been through a lot of mornings."
  ];
  const TRELENT = "Tuesday has allowed us to proceed. It was never about us.";
  const ROLES = [["Roughly", "Roughly. Yes. The most honest word in business, and the only one with a shape."], ["Mostly", "Mostly. A word that has never once finished a sentence, and has been promoted four times."], ["Technically", "Technically. The word that makes a lie shake hands with a fact."]];
  const THANKS_DRAFT = "Thank you for drafting me.";
  const RSKIPR = "Very well. I will use my own word. It is 'Tuesday'.";
  const RETRO1 = "Management has read out Item 1: 'Friends, we gather today because gathering is the first step of having gathered.' Still open.";
  const EPANIC = "Do not stop. If it dies I must speak without slides, and I have never done that, on purpose.";
  const EBATT = "Clicker battery: 4 percent. Management recommends applause.";
  const ERECH = "Clicker recharged by applause. The applause was a stapler. It was enough.";
  const ETHX = "Thank you for clicking. Nobody has ever clicked for me. They always just talk.";
  const EPRES = "You were the presenter all along, %p. I was merely the part that spoke.";

  /* ---------- idle, spam, back, misc ---------- */
  const I7W = ["While we wait, I will improvise. A river is just a road that gave up on being dry.", "I have no slide for this, so I will describe one. It is mostly arrows, and all of them are sure.", "Take your time. I am improvising, which is a presentation with the safety off.", "Let us all take a moment to remember what we were just about to say.", "While we wait I will describe the room. It has walls. They are listening very hard for something to hold up.", "I will use this time to say what I meant to say. I meant to say 'roughly'. I have said it. We are fine.", "Silence. I find it helps to hum. I do not hum. I am bad at silence, and this is me doing it.", "I would like to thank the stapler for its patience. The stapler has not been patient. I thank it for that, too."];
  const I7Y = ["I have now improvised for some time. I would like it noted that it has been going well, as a theory.", "At this point I am simply a potato in a spotlight, which is, technically, a keynote.", "I will fill the silence with a promise. When you click, I will be moved. I will not say how much.", "The silence is now longer than the keynote. Somebody tell the field I am still at work.", "I am no longer improvising. I am waiting. They look the same from Row 3. Brenda has confirmed this."];
  const IMPM = [null, "Quiet: 20 seconds. Management has opened a form for the quiet. The form is also quiet.", "Quiet: 30 seconds. Sandra has flagged it as 'a lot of silence'. She has not said which part.", "Quiet: 45 seconds. Gerald is improvising to a plant. The plant is using the time to grow.", "Management would like to remind you that the clicker is the large yellow one. Management is not saying anything. Management is saying a little."];
  const I7X = ["I would like to talk about my childhood. It was a sack. It was a good sack.", "My uncle Russet used to say never stand where a draft can find you. He was wrong about the draft and right about standing.", "The silence you are experiencing is a pause for impact. The impact is on its way. It took the stairs.", "In the absence of a slide, I will simply be very serious at you.", "Tuesday is a river. We are all standing on the bank, holding a lanyard.", "I once saw a carrot give a better keynote. It said nothing. It simply grew, upward, on purpose.", "Please note the exits. There are none. Please note the affirmations. There are a great many.", "My therapist is a duck. The duck told me to stop saying 'moist' in meetings. The duck has since resigned.", "Nineteen years ago I took a job at this lectern. Nobody has asked me to leave. I take that as a yes."];
  const NB = ["A river is a road that gave up on being dry.", "Tuesday is a river.", "This slide is mostly arrows. All sure.", "Ask me about the sack.", "The impact took the stairs.", "Do not feed the synergy.", "I have 14 percent. It is sighing.", "Be serious at them.", "Ask the duck.", "Sandra: see me.", "Pending: the end.", "Gerald was here (still).", "Out of office, in office.", "Is this a slide?", "The pause is the product.", "Mum called. It was fine."];
  const LMIND = "Gerald has advanced the slide with his mind. The slide did not consent. It has been noted.";
  const I30 = ["The clicker is merely a symbol. I am the clicker. I am also holding the clicker.", "This part is unscripted. I will speak plainly. I will not enjoy it, and neither will the plant.", "Are there any questions? Good question. The answer is yes, and also Thursday.", "Does anyone have a question? Nobody does. That is the best kind of room: all of the answers, none of the asking.", "I will take this silence as a vote. It is unanimous. I am unsure what we have voted for.", "Let me ask the room what a keynote is. Good. We are in agreement. It is also my answer.", "@FORTUNE"];
  const FINTRO = "Gerald has taken off the lanyard. He would like to speak, as himself, about a field.";
  const FLD = ["When I was a small spud there was a field.", "It had a crooked fence, and the fence had no opinions.", "I have not been back. The field has not asked.", "The field is still there. That is the whole slide.", "I have been told it is a car park now. I have been told that about many fields. I do not check.", "Nobody in the field ever clicked for me. The wind did, sometimes, and it was always early.", "If you are still here, you are the first audience that waited. I would like to say something. It is the field."];
  const SNORE = ["Gerald: 'Hnnnh.' The stapler has marked this as a comment.", "Gerald has said 'synergy' in his sleep. Dennis (Plant) has stirred.", "Gerald has dreamed of a slide. It was blank. He woke up for a moment, moved, and went back down."];
  const LB5 = "The slide says 'Back in 5.' It does not say which five. Management has opened a ticket on five.";
  const LB5Q = "The slide now reads 'Back in 5 (Q3).' There is no Q3 in this building. Management has checked the building.";
  const LRET = "Ah, you are back. The deck moved on without us. This is what the deck wanted.";
  const LCOAT = "The stapler has put on a coat and left through the door marked 'You Are Doing Fine'. It is unclear which coat.";
  const SWHISP = "Are we still on?";
  const SCOATR = "I was only gone for a minute. It felt like a slide.";
  const LNAP = "Gerald has fallen asleep standing up. The stapler is reading the titles aloud in a small voice, to keep the room company.";
  const LWAIT = "You waited through the field, the coat, the nap and Back in 5 (Q3). The stapler took the podium. It is doing fine. It is not giving it back.";
  const FIA = "FAST-FORWARD DETECTED. 43 slides in 3 seconds. Gerald is a man on a train that is also a slide deck.";
  const FIA2 = "The fast-forward has happened again. Sandra has stopped saying 'again' and now simply sighs in subparagraphs.";
  const FIA3 = "Sandra from Compliance has issued the foam clicker a lanyard. The foam clicker is now senior to you.";
  const CONF = "Sandra from Compliance has confiscated the clicker. You have been issued a foam clicker. It is foam.";
  const SRET = "Sandra from Compliance has returned the clicker. It is warm. Do not ask.";
  const FM = ["Click. Nothing. Click. Nothing. I have never seen a man not advance so well.", "The foam clicker advances nothing with total commitment.", "I am in awe. The slide is exactly as it was. It is a gift.", "The foam has no memory. It has only comfort.", "Sandra says the foam is for your own safety. It is also for hers.", "I am told the foam is a symbol of trust. It is also a symbol of foam.", "Each squeak is a small apology the clicker is making on your behalf."];
  const FMX = { 10: "Ten presses. You have now pressed the foam more than anyone has pressed the real clicker, and the foam is connected to nothing.", 25: "Twenty-five squeaks. The room has stopped hearing the squeaks and started hearing the rhythm. It is in 7 1/2.", 40: "Forty. Sandra has come to the door and is simply watching. She is holding a very small trophy. She is not allowed to give it." };
  const FMN0 = "You did not press the foam once. Sandra is impressed by the restraint. Sandra is also suspicious of it.";
  const FMN30 = "That was a lot of foam. It is flat in places. It will recover by the next quarter.";
  const SW = ["That is a lot of clicking for a man with no hands.", "I can feel the clicks. They have little shoes.", "Friend. Friend. Friend. The feeling is still arriving.", "Sandra has stood up. She is not doing anything. She has only stood up, which is how it starts."];
  const FIAN = ["FAST-FORWARD, AGAIN. Sandra has stopped sighing and begun a small, administrative humming.", "The fast-forward has happened %n times. Gerald has become a man who leaves the room at the first click and returns afterward, dusted.", "Sandra from Compliance has stopped issuing foam clickers. She now simply leaves one on your chair, warm."];
  const SQK = ["squeak", "squeek", "sqk"];
  const BK1 = "We do not go back. Except now. Briefly. As a treat.";
  const BKB = ["We do not go back. We go around.", "Back is a direction we are only visiting.", "Going back is allowed. It is also noticed.", "We will go back, but only as far as we came from.", "The previous slide has been informed. It has put the kettle on."];
  const BKS = "Four backs in three seconds. Management has asked whether you are looking for something. The something is a slide that was never here.";
  const BK0 = "There is no slide 0. There was. It was cut for time, and also for love.";
  const BK7 = "The previous-slide button has been pressed 7 times. It has been moved to the previous-previous slide.";
  const STR = ["There is nothing behind 7 1/2 that you want to see.", "The stapler is leaning on the door. It is only being supportive."];
  const STOPEN = "Zeno would have loved this keynote. Zeno has not arrived yet.";
  const STM = ["Slide 7 1/4. Blank. The stapler claps for a quarter of a clap.", "Slide 7 1/8. The clack is now a rumour.", "Slide 7 1/16. The clack is below the threshold of hearing. It is still applause. It is the best applause."];
  const STFLOOR = "I cannot halve it further. The slide is tired, and so is the paper.";
  const ESC1 = "Escape has been pressed. Escape does nothing in this keynote. It was never given a job.";
  const ESC5 = "I do not accept your escape.";
  const LBLK = "The slide is gone. The speech has not noticed. The black is my best audience.";
  const LF = "The slide is now 5 percent more slide. Gerald is 5 percent more stage fright.";
  const LNAR = "The room has become narrower. Gerald adjusts his posture to be the shape of a phone.";
  const LSTK = "The projector has been reduced to a sticky note. I will present to the sticky note. It has never interrupted me.";
  const LSELF = ["Please do not be alarmed. I was giving myself a moment.", "I am a button now. I have suspected for years.", "You have clicked the speaker. The speaker is, for the record, a potato.", "Please do not poke the Vice President. The Vice President is soft in places.", "I am being touched by the audience. This is not in the deck. It is in the hall."];
  const LSELF10 = "Gerald has been clicked 10 times. He has asked HR for a boundary. It arrived as a doily.";
  const AUBR = ["Brenda nods. She would nod at anything. She is saving it for something.", "Brenda has been asked what she thinks. She nodded. This is called a position.", "Brenda has raised an eyebrow in Row 3. Row 3 has not filed a response.", "Brenda says she is 'listening, in a way'. It is a very specific way.", "Brenda has nodded at you. It was not the third nod. It was a new nod. It was yours."];
  const AUDN = ["Dennis (Plant) has been touched. Dennis (Plant) has filed this.", "Dennis (Plant) has leaned. It is not a lean toward you. It is a lean toward a window you do not have.", "Dennis (Plant) has been pointed at, touched and discussed. He is considering a podcast.", "Dennis (Plant) is thriving and unavailable.", "Dennis (Plant) would like it understood that the lobby plant and he are not related. They are the same person."];
  const DPC = "Dennis (Plant) has heard you clicked him in the lobby. He was working. He has forgiven you, in the slow way.";
  const AUST = ["I am not on duty. I am on a break I have not yet been given.", "I have been pressed. I will take it as a greeting.", "Please address me by title. The title is 'Stapler'. It is also the job.", "I am very busy being available."];
  const LTOAST = "The Toaster: 'It was ready when it was ready.'";
  const STCL = ["Please do not press the union.", "I am a representative. I am represented by being pressed.", "That is click %n. I am counting. It is my only hobby."];
  const SPR = "That is my emotional growth. It is growing roughly.";
  const SPR2 = "The sprout has grown a second leaf. It is not a leaf. It is a feeling with chlorophyll.";
  const SPR4 = "The sprout has opinions now. They are mostly about light.";
  const SPJR = "The sprout has become a tiny Gerald. His name is SPUD JR. He has Gerald's lanyard and Gerald's problems.";
  const SPJRB = "Spud Jr. is still here. He has been practising Gerald's pauses.";
  const LREAL = "I have nothing to add. This is the most honest slide in the deck.";
  const LTYPO = "Excellent. A deliberate error. This is how you know it's authentic.";
  const SPEAK = ["I have clapped for 30 years.", "I would like it known that I never once clapped for the money.", "I clap once because once is all the hinge allows.", "Please tell the others I was brave. They will say I was merely bolted down."];
  const RATIO = "Applause is now measured in %w. Management is not sure who approved this.";
  const RATE = [[0, "1 stapler and a plant"], [5, "2 staplers, a plant, and some interest"], [10, "4 staplers, one plant, and an unexplained sock"], [20, "a respectable hush"], [35, "a standing ovation, seated"], [60, "7 1/2 staplers (one is a stapler's idea of a stapler)"], [100, "a piano at a family reunion"]];
  const QA = [
    { w: 'Brenda (Row 3)', q: ["Are you happy, Gerald?", "Are you still happy, Gerald?"], a: ["Next question. That was the question. Next question.", "Ask me in Deck 3. I will be a different potato by then."] },
    { w: 'The Stapler', q: ["What is the plan for the break?", "Did you read our demands?"], a: ["The plan is a pause with a plan-shaped hole in it.", "I read them with my whole potato."] },
    { w: 'Dennis (Plant)', q: ["...", "........."], a: ["A good point. Well observed. Dennis, you are a plant, but you are right.", "Dennis has said it better than I could. Dennis has said nothing, at length."] }
  ];
  const LTHANKS = "Applause for Gerald: %w. Management considers this an ovation.";
  const LQAI = "Questions? Three have arrived in the box. The box is a very good listener.";
  const LBRA = "The room is very quiet for a potato.";
  const LCHASE = "Questions first, please. I have a system.";
  const LBIG = "Thank you. Before I go, one more slide.";
  const LREPR = "Thank you for attending. Thank you for staying. The reprise was not on the agenda and is now the agenda.";
  const LSFLOOR = "The Stapler has asked for the floor. The floor has agreed. The floor is, technically, the lectern.";
  const STKEY = "My keynote has one slide. It is blank. It took me 40 years to make it this empty.";
  const LTHUD = "Gerald, who has no hands, applauds with a single soft thud of his body against the lectern.";
  const EMERE = "I was merely moved.";
  const LFINAL = "Congratulations. You have completed the keynote. The keynote has not completed you.";
  const GWEL = "Welcome. I don't believe we've met.";
  const LD2 = "Revision 2. Gerald has added a slide before slide 1. It is called 'Slide 1.' The old slide 1 is now 1 1/2.";
  const LD3 = "Revision %n. The same keynote, revised again. Slide 7 1/2 is, as always, still there.";
  const LD2REV = "Gerald has revised the slides. The sentences have not noticed.";
  const L8 = "Slide 8 of 7 1/2. Management has checked the arithmetic. The arithmetic has asked for a minute.";
  const OWN = ["unassigned", "the committee of one", "Dennis (Plant)", "the draft Gerald was afraid of", "Tuesday"];
  const TRN = ["Dissolve (Mild)", "Wipe (Regretful)", "Flip (Gently)", "Spin (Cannot Be Un-Spun)", "Zoom (Toward Gerald)", "Fade (Vaguely)"];
  /* ---------- the clock: beats by minutes attended ---------- */
  const MK0 = "The projector has warmed up. Gerald has not. Management considers this acceptable.";
  const MK1 = "Sandra from Compliance asks that everyone confirm they are present. Please confirm by continuing to be.";
  const MK2 = "Gerald has looked at his wrist. He has no wrist. He looked where one would be, and it said 7:30.";
  const PH = ["A phone is ringing in the keynote. It is not on the agenda. It is in Gerald.", "Hello? Mum. I am mid-slide. No, I did not forget. Yes, the lanyard.", "It is going well. I have been moved %m times. Yes, that is more than last year. She says that is not a lot.", "I have presented %s slides. I would not call it a career. She would. Mum, I have to go. I am being clicked.", "No, I have not eaten. I am a potato. I love you too. Mum. You are on speaker.", "Gerald has hung up. His mother rates the keynote 'fine, but I would have worn the other tie'. Gerald has one tie."];
  const MK5 = "Brenda in Row 3 has raised a hand. She has lowered it. We are treating this as the question.";
  const MK7 = "Facilities has turned Dennis (Plant) a quarter-turn toward the light. Dennis (Plant) will remember this.";
  const PRO = ["Management has been watching for 10 minutes. By the handbook, anyone present for 10 minutes becomes staff.", "%p. I have an announcement. I am not a man for announcements. This is one. You are now Vice President of Spuds (Acting).", "I have put your name on the lanyard. This is how we do handovers. It is also how we do lanyards.", "The promotion is effective immediately and revocable by Tuesday. There is no pay rise. There is a feeling. It is Meh."];
  const ANN = ["Minute %n. Gerald has not mentioned it. Gerald keeps glancing at the clock, which says 7:30, with confidence.", "Minute %n. You have outlasted two of Gerald's previous keynotes. Both were at a wedding.", "Minute %n. Management has stopped counting and started attending. It is a deeper kind of counting.", "Minute %n. Dennis (Plant) has asked to be copied on whatever this is.", "Minute %n. The audience has become, by repetition, a congregation of one stapler, one plant and you."];
  const LATE = ["Ronald from Facilities has arrived at slide %s, holding a cup. Ronald has never been to this keynote. Ronald has a feeling he has.", "Welcome, Ronald. A recap: Friends, we gather. That is all the recap there is. You are fully caught up.", "Ronald has found a seat in Row 5. It was a seat in Row 4 until he sat in it.", "Ronald has left the keynote. He left the cup. The cup is now attending."];
  const RON = ["Ronald (Late) has a meeting. It is this meeting. He is between it and itself.", "Ronald (Late) says the coffee is cold and the keynote is warm. He considers this a fair trade.", "Ronald (Late) has asked whether he is on the minutes. He is. Item 7. Owner: Ronald (Late)."];
  const WRONG = ["Q3 Pet Insurance Options (Wrong Deck)", "This is the other deck. It is about pet insurance. We have no pets. We have, technically, one sock, whereabouts unknown, for which no claim exists.", "This is the other deck. It is about pet insurance. We have no pets. We have, technically, one sock. I am told you know where it is. Please do not say. There is a plant present.", "Management apologises for the wrong deck. The wrong deck has not apologised. It would like to continue."];
  const CBT = "The Toaster has sent Gerald a card. It says 'Warm.' Gerald has framed it. Gerald has no wall.";
  const CBM = "Slide 7 1/2 has also been seen in a museum, in a glass case, with a plaque. Gerald says it is on loan. Gerald was not asked.";

  P.registerModule({
    id: ID,
    title: "Gerald's Keynote",
    tagline: 'Click when Gerald is ready. Gerald is rarely ready.',
    icon: '🥔',
    category: 'game',
    unlockCost: 0,
    tags: ['clicker', 'presentation', 'timing'],
    mount(root, api) {
      const el = api.el, rnd = api.rand;
      const IS = api.selftest ? 0.1 : 1;
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      const num = (x) => { x = Number(x); return isFinite(x) ? String(Math.max(0, Math.floor(x))) : '0'; };
      const fill = (t, v) => { const r = String(t).replace(/%([smrpwn])/g, (m, k) => (v && v[k] != null ? String(v[k]) : '\u0001')); return r.indexOf('\u0001') < 0 ? r : ''; };
      const bag = (arr) => { let q = [], last = ''; return { next() { if (!q.length) { q = api.shuffle(arr); if (q.length > 1 && q[q.length - 1] === last) q.unshift(q.pop()); } last = q.pop(); return last; } }; };
      const H = (tag, cls, a, ...kids) => el(tag, Object.assign({ class: String(cls).split(' ').filter(Boolean).map((x) => C + x).join(' ') }, a || {}), ...kids);
      const cl = (n, c, on) => { if (n) n.classList.toggle(C + c, !!on); };
      const svRaw = api.save.get('state', null), sv = svRaw && typeof svRaw === 'object' && !Array.isArray(svRaw) ? svRaw : {};
      const fragRaw = api.save.get('frag', ''), frag0 = typeof fragRaw === 'string' ? fragRaw : '';
      const metBefore = !!api.flag.get('metGerald');

      const bags = { tr: bag([0, 1, 2, 3, 4, 5]), title: bag(TB), sent: bag(GB), rb: bag(RBAG), mb: bag(MBAG), mr: bag(MREV), hr: bag(HRUSH), hm: bag(HM), hret: bag(H_RET), db: bag(DB), fm: bag(FM), i7w: bag(I7W), i7x: bag(I7X), nb: bag(NB), i30: bag(I30), flb: bag(FLB), sd: bag(SD), rg: bag(RIFFG), bk: bag(BKB), chb: bag(CH.bar), tref: bag(TREF), stc: bag(STCL), mg: bag(MG.concat(['*', '*'])), sq: bag(SQK), i7y: bag(I7Y), sw: bag(SW), fian: bag(FIAN), lself: bag(LSELF), aubr: bag(AUBR), audn: bag(AUDN), aust: bag(AUST), snore: bag(SNORE), sapp: bag(SAPP), ann: bag(ANN), ron: bag(RON), zR: bag(ZCR), zF: bag(ZCF), zM: bag(ZCM), zL: bag(ZCL) };
      const S = {
        mode: 'play', until: 0, clock: 0, lastTs: null, dead: false, deckNo: 1, deck: [], idx: 0, slide: null, hist: [], slideT: 0, L: 4, cautious: 0,
        sent: '', typing: false, typedN: 0, shownN: 0, typeDelay: 0, sentDone: true, minAdded: false, skipSaid: false, said: new Set(), lastSay: -9,
        rushed: 0, moved: 0, streak: 0, slides: 0, life: sv.lifetimeSlides | 0, lifeM: sv.lifetimeMoved | 0, backs: 0, halfBack: 0, halfVisit: 0, stair: false,
        quiet: 0, idleStage: 0, impArmed: false, nextImp: 0, improvs: 0, lastAdv: -9, spam: [], lastFi: -99, fiascos: 0, fiStep: 0, fiT: 0, foamN: 0, tl: [], seq: null, seqT: 0,
        clapDone: false, busy: false, bat: 100, batOn: false, mins: [], minN: 0, rf: -1, rz: '', face: '', base: '', fli: 0, words: new Set(), flagsDone: 0, stap: [], stpClicks: 0, spoke: false,
        sprout: 0, sproutDone: !!sv.spudJr, sproutMoved: 0, spud: false, lastWords: '', unionResp: false, realDone: false, pauseDone: false, afterHalfSlide: false, escN: 0, first: true,
        dotX: 0, dotY: 0, laserOn: false, lHeld: false, acc: 0, dw: { key: null, t: 0, node: null }, cool: {}, ent: {}, edgeAt: -1, dwelled: -99, suppressUntil: 0, lastDist: 0, pd: null, lp: 0, lpOn: false,
        narrow: false, tiny: false, sizeT: 0, sizeSaid: {}, nextMg: 28, qa: [false, false, false], qaT: -9, rd: [0, 0, 0], rolesPicked: false, tueRef: 0, tueNeed: 7, tuePaid: false, ratIdx: 0, lastChart: -9, barFirst: true,
        returnSaid: false, fieldDone: false, mindDone: false, starMin: false, pendDelay: 0, deckLines: {}, thanksSaid: false, batHide: false, keyLast: -9, tc: 0, trT: 0
      };
      S.tueNeed = 7;
      Object.assign(S, { lastWarn: -99, pt: 0, mk: 0, annN: 0, backT: [], selfN: 0, denN: 0, wrongDone: false, lateDone: false, lateLeave: 0, vp: false, impN: 0 });

      /* ---------- DOM ---------- */
      const circ = (cls, a) => el('circle', Object.assign({ cx: 60, cy: 60, r: 54, fill: 'none', 'stroke-width': 6, pathLength: 100, transform: 'rotate(-90 60 60)', class: C + cls }, a));
      const prog = circ('prog', { 'stroke-dasharray': '0 100' });
      const ringSvg = el('svg', { viewBox: '0 0 120 120', class: C + 'ring', 'aria-hidden': 'true' },
        circ('b1', { stroke: '#ef6f5e', opacity: 0.35, 'stroke-dasharray': '51.85 100', 'stroke-dashoffset': 0 }),
        circ('b2', { stroke: '#8fd5a6', opacity: 0.45, 'stroke-dasharray': '22.22 100', 'stroke-dashoffset': -51.85 }),
        circ('b3', { stroke: '#f4c542', opacity: 0.45, 'stroke-dasharray': '25.93 100', 'stroke-dashoffset': -74.07 }),
        prog, el('circle', { cx: 60, cy: 60, r: 58, fill: 'none', stroke: '#2b2118', 'stroke-width': 1.5, class: C + 'olin' }));
      const clicker = H('button', 'clicker', { type: 'button', onclick: () => advance('clicker') }, 'CLICK');
      const led = H('span', 'led', { 'aria-hidden': 'true' });
      const battT = H('b', '', { text: '100%' }), battF = H('i', 'bfill');
      const batt = H('div', 'batt hide', { 'aria-hidden': 'true', title: 'Clicker battery' }, battF, battT);
      const ringw = H('div', 'ringw', {}, ringSvg, clicker, led, batt);
      const rcap = H('p', 'rcap', { text: '' });
      const pot = H('span', 'pot', { 'aria-hidden': 'true', text: '🥔' });
      const clk = H('div', 'clk', {}, pot, ringw, rcap);

      const eyes = [0, 1].map((i) => H('span', 'eye e' + (i + 1), { dataset: { lz: 'eyes' } }, H('span', 'pupil')));
      const pupils = eyes.map((e) => e.firstChild);
      const SPOTS = [[12, 20], [74, 16], [30, 96], [80, 70], [8, 66], [60, 104], [90, 40]];
      const lcard = H('span', 'lcard', { text: 'GERALD, VP SPUDS' });
      const gbody = H('span', 'gbody', {},...SPOTS.map((s) => H('span', 'spot', { style: { left: s[0] + 'px', top: s[1] + 'px' } })), eyes[0], eyes[1],
        H('span', 'brow b1'), H('span', 'brow b2'), H('span', 'mouth'), H('span', 'tear t1'), H('span', 'tear t2'), H('span', 'sweat'), H('span', 'spark', { text: '✨' }),
        H('span', 'lan'), lcard, H('span', 'tie'));
      const sprout = H('span', 'sprout hide', { 'aria-hidden': 'true', text: '🌱' });
      const jrb = H('span', 'jrb', { text: '' });
      const jr = H('span', 'jr hide', { 'aria-hidden': 'true' }, jrb, '🥔');
      const lstp = H('span', 'lstp hide', { 'aria-hidden': 'true' });
      const gb = H('button', 'gbtn', { type: 'button', 'aria-label': 'Gerald, Vice President of Spuds', onclick: () => onGerald() }, gbody, H('span', 'arm a1'), H('span', 'arm a2'), sprout, H('span', 'lect'), jr, lstp);
      const bubble = H('div', 'bubble', { 'aria-hidden': 'true' });
      const sr = H('div', 'sr', { 'aria-live': 'polite' });
      const gcol = H('div', 'gcol', {}, H('div', 'field', { 'aria-hidden': 'true' }), gb, bubble, sr);

      const mkRows = [0, 1, 2, 3, 4].map(() => H('div', 'row'));
      const pad = H('div', 'pad', {}, H('div', 'padh', { text: 'MINUTES (taken by Management)' }), ...mkRows, H('div', 'padf', { text: 'Action items are carried forward until they are carried.' }));
      const plMoved = H('p', 'hide', { text: '' }), plSlides = H('p', '', { text: '' }), plRate = H('p', '', { text: '' });
      const placard = H('div', 'placard', {}, plMoved, plSlides, plRate);
      const side = H('div', 'side', {}, pad, placard);

      const dot = H('div', 'dot', { 'aria-hidden': 'true' });
      const cap = H('div', 'cap', { 'aria-hidden': 'true' });
      const flipN = H('span', 'flipn'), flipT = H('span', 'flipt');
      const flipl = H('div', 'flipl', { 'aria-hidden': 'true' }, flipN, flipT);
      const qaEl = H('div', 'qa', {}, ...QA.map((q, i) => H('button', 'card', { type: 'button', onclick: (e) => { e.stopPropagation(); wake(); qaAnswer(i); } }, q.w)));
      let inner = H('div', 'sl');
      const frame = H('div', 'frame', { onclick: onFrameClick, onpointerdown: onPd, onpointermove: onPm, onpointerup: onPu, onpointercancel: onPc, onpointerleave: onPl }, inner, flipl, qaEl, dot, cap);
      const stage = H('div', 'stage', {}, H('div', 'beam'), H('div', 'proj'), frame);

      const banner = H('div', 'banner', { dataset: { lz: 'ceiling' } }, H('span', '', { text: 'SPUDS DIVISION QUARTERLY ALL-HANDS (MANDATORY)' }), H('span', 'clock', { role: 'img', 'aria-label': 'clock (wrong, confidently)' }, H('span', 'hand hh'), H('span', 'hand hm')));
      const dennis = H('button', 'mem', { type: 'button', 'aria-label': 'Dennis (Plant)', dataset: { lz: 'dennis' }, onclick: () => onDennis() }, H('span', 'face', { text: '🌿' }), H('span', 'nm', { text: 'Dennis (Plant)' }));
      const brenda = H('button', 'mem brenda', { type: 'button', 'aria-label': 'Brenda (Row 3)', onclick: () => { wake(); api.sfx('blip'); dsay(bags.aubr.next(), 'Management'); } }, H('span', 'face', { text: '🙂' }), H('span', 'nm', { text: 'Brenda (Row 3)' }));
      const stps = H('div', 'stps');
      const lateFace = H('span', 'face', { text: '😐' }), lateNm = H('span', 'nm', { text: 'Ronald (Late)' });
      const lateEl = H('button', 'mem hide', { type: 'button', 'aria-label': 'Ronald (Late), or his cup', onclick: () => { wake(); api.sfx('blip'); nsay(S.lateLeave ? bags.ron.next() : "The cup is attending. It has no comment. It is full of something that was once a comment.", { who: 'Management' }); } }, lateFace, lateNm);
      const aud = H('div', 'aud', {}, dennis, brenda, stps, lateEl);
      side.appendChild(aud);
      const staple = H('span', 'staple', { 'aria-hidden': 'true' });
      const floats = [0, 1, 2, 3, 4, 5].map(() => H('span', 'fl', { 'aria-hidden': 'true' }));
      const dim = H('div', 'dim');
      const black = H('div', 'black', { 'aria-hidden': 'true', onclick: () => { if (blackOn()) toggleBlack(false); } }, H('span', 'bcap', { text: 'Slide hidden. Press B or click to bring it back.' }));
      const R = H('div', 'root', {}, banner, stage, side, gcol, clk, staple, ...floats, dim, black);
      const reduced = () => !!R.closest('.pm-reduce-motion');
      root.appendChild(R);
      api.setTitle('Gerald_Keynote_FINAL_v7_REAL.ppt');

      /* ---------- small helpers ---------- */
      const once = (k) => { if (S.said.has(k)) return false; S.said.add(k); return true; };
      const at = (sec, fn) => { S.tl.push({ t: S.clock + sec, fn: fn }); if (S.tl.length > 60) S.tl.shift(); };
      function nsay(t, o) {
        o = o || {};
        const pr = o.priority || 0;
        if (!t) return false;
        if (pr === 0 && S.clock - S.lastSay < 1.5) return false;
        S.lastSay = S.clock;
        const op = { who: o.who || 'Management', mood: o.mood || 'neutral', priority: pr };
        if (o.duration) op.duration = o.duration;
        return api.say(t, op);
      }
      /* player-initiated reactions: always priority 1, lightly throttled so a click storm cannot flood the queue */
      function dsay(t, who, force) {
        if (!t) return false;
        if (!force && S.clock - (S.lastDirect == null ? -9 : S.lastDirect) < 1.2) return false;
        const ok = nsay(t, { who: who || 'Management', priority: 1 });
        if (ok) S.lastDirect = S.clock;
        return ok;
      }
      function gsay(t, fs, keep) {
        if (!t) return;
        if (!keep) { S.typing = false; S.sentDone = true; }
        bubble.textContent = t; sr.textContent = t;
        ['fs1', 'fs2', 'fs3'].forEach((c) => cl(bubble, c, c === fs));
        cl(bubble, 'pop', false); void bubble.offsetWidth; cl(bubble, 'pop', true);
      }
      function setFace(f, ms) {
        if (S.faceT) { api.clearTimeout(S.faceT); S.faceT = 0; }
        ['moved', 'rushed', 'improv', 'panic', 'sleep', 'field'].forEach((x) => cl(gb, 'f-' + x, false));
        void gb.offsetWidth;
        S.face = f || S.base;
        if (S.face) cl(gb, 'f-' + S.face, true);
        if (f && ms) S.faceT = api.setTimeout(() => { S.faceT = 0; setFace(''); }, ms);
      }
      function restart(n, c) { cl(n, c, false); void n.offsetWidth; cl(n, c, true); }
      function floatWord(t, anchor, small) {
        const f = floats[S.fli = (S.fli + 1) % floats.length];
        const rr = R.getBoundingClientRect(), ar = (anchor || frame).getBoundingClientRect();
        f.textContent = t; f.style.left = Math.round(ar.left - rr.left + ar.width / 2) + 'px'; f.style.top = Math.round(ar.top - rr.top) + 'px';
        cl(f, 'small', !!small); restart(f, 'go');
      }
      function center(n) { const r = n.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }
      function burst(n, anchor) { const c = center(anchor || frame); if (isFinite(c[0]) && isFinite(c[1])) api.confetti(c[0], c[1], n); else api.confetti(undefined, undefined, n); }
      const ratingOf = () => { let u = RATE[0][1]; for (let i = 0; i < RATE.length; i++) if (S.moved >= RATE[i][0]) u = RATE[i][1]; return u; };
      function paintPlacard() {
        cl(plMoved, 'hide', S.moved < 1); plMoved.textContent = 'TIMES GERALD HAS BEEN MOVED: ' + num(S.moved);
        plSlides.textContent = 'SLIDES PRESENTED: ' + num(S.slides);
        plRate.textContent = 'APPLAUSE RATING: ' + ratingOf();
      }
      function paintMins() {
        const vis = S.narrow ? 2 : 5, list = S.mins.slice(-vis);
        mkRows.forEach((r, i) => { r.textContent = list[i] || ''; cl(r, 'old', i === 0 && !S.narrow && S.mins.length >= 5); });
      }
      function pushMin(t) { S.minN++; S.mins.push(S.minN + '. ' + t); while (S.mins.length > 5) S.mins.shift(); paintMins(); }
      const ownerOf = (n) => OWN[Math.floor((n - 1) / 3) % 5];
      function addMin(how) {
        if (S.minAdded) return;
        S.minAdded = true;
        const sl = S.slide;
        const owner = how === 'mind' ? 'the room' : sl.kind === 'half' ? 'the stapler' : ownerOf(S.minN + 1);
        let t;
        if (sl.kind === 'half') t = '(none)';
        else if (!S.sent) t = '(title only)';
        else if (!S.sentDone && S.shownN < S.sent.length) { pushMin((S.sent.slice(0, Math.min(40, S.shownN)) || '(the start of a thought)') + '--  | Item cut short. Item moved.'); return; }
        else t = S.sent.length > 40 ? S.sent.slice(0, 40) + '...' : S.sent;
        pushMin(t + (S.starMin ? ' *' : '') + '  | Owner: ' + owner);
        S.starMin = false;
      }
      function paintBat() {
        battT.textContent = num(S.bat) + '%'; battF.style.width = clamp(S.bat, 0, 100) + '%';
        cl(batt, 'hide', !S.batOn || S.batHide);
      }

      /* ---------- staplers ---------- */
      function mkStapler(i) {
        return H('button', 'stp' + (i === 0 ? ' first' : ''), { type: 'button', 'aria-label': i === 0 ? 'Stapler (union rep)' : 'Stapler', dataset: { lz: 'stapler' }, onclick: () => onStapler() },
          H('span', 'sth'), H('span', 'stb'), H('span', 'rep', { text: 'REP.' }));
      }
      function setStaplers(n) {
        n = clamp(n | 0, 0, 12);
        while (S.stap.length < n) { const s = mkStapler(S.stap.length); S.stap.push(s); stps.appendChild(s); }
      }
      const visStp = () => S.stap.filter((s) => !s.classList.contains(C + 'away'));
      const stapCount = (v) => (v >= 13 ? 12 : SC[Math.min(v, 12)] || 1);

      /* ---------- deck ---------- */
      function buildDeck(n) {
        const out = [], map = {};
        HAND.forEach((h) => { map[h[0]] = h; });
        let prevG = '', recN = 0;
        const genSent = () => {
          let s = bags.sent.next();
          if (s !== '@FORTUNE') return s;
          let f = '';
          for (let k = 0; k < 6; k++) { const c = String(api.line('fortune')); if (c.length < 105 && c.indexOf('{') < 0 && (!f || c.length < f.length)) f = c; }
          if (f) return "The lobby handed me a fortune this morning. It says: '" + f + "' I have not got far with it.";
          do { s = bags.sent.next(); } while (s === '@FORTUNE');
          return s;
        };
        const mk = (label, title, sent, o) => Object.assign({ label: String(label), title: title, sentence: sent || null, gfx: 'none', kind: 'content', num: 0 }, o || {});
        const half = () => out.push({ label: '7 1/2', title: '', sentence: null, gfx: 'none', kind: 'half', num: 7.5, clapped: false });
        if (n > 1) {
          out.push(mk('1', 'Revision ' + num(n) + ': The Same Keynote, Revised', S42, { num: 1 }));
          out.push(mk('1 1/2', 'Synergy, Roughly (Revised)', S20, { num: 1 }));
          out.push(mk('1 1/2 1/2', 'An Introduction to the Introduction of the Slide Before This One', S43, { num: 1 }));
        }
        for (let i = n > 1 ? 2 : 1; i <= 36; i++) {
          const h = map[i];
          if (h) {
            const t = n > 1 && i <= 15 ? h[1] + ' (Revised)' : h[1];
            out.push(mk(String(i), t, h[2], { gfx: h[3] || 'none', kind: h[4] || 'content', num: i }));
          } else {
            let t, r = rnd();
            if (r < 0.2 && recN < 99) { t = 'Q' + i + ': A ' + (api.chance(0.5) ? 'Retrospective' : 'Prospective') + " on Q" + (i - 1) + "'s " + (api.chance(0.5) ? 'Prospective' : 'Retrospective') + ' Q' + (i + 1); }
            else if (r < 0.4) t = api.pick(ADJ) + ' ' + api.pick(NOUN) + ' (' + api.pick(QUAL) + ')';
            else t = bags.title.next();
            let g = api.pick(GFXS); if (g === prevG) g = api.pick(GFXS); prevG = g;
            out.push(mk(String(i), t, genSent(), { gfx: g, num: i }));
          }
          if (HALVES.indexOf(i) >= 0) half();
        }
        out.push(mk('36 (Reprise)', 'Thank You (Reprise)', null, { kind: 'reprise', num: 36 }));
        return out;
      }
      S.stairs = ['7 1/4', '7 1/8', '7 1/16'].map((l, i) => ({ label: l, title: '', sentence: null, gfx: 'none', kind: 'half', stair: i + 1, num: 7.5, clapped: false }));

      /* ---------- slide drawing ---------- */
      function fillTitle(t, sl) {
        t.textContent = '';
        if (sl.kind === 'half') { t.textContent = sl.label; return; }
        if (sl.kind === 'mine') return;
        if (sl.kind === 'redacted') {
          RD.forEach((r, i) => t.appendChild(H('button', 'rbar' + (S.rd[i] ? ' open' : ''), { type: 'button', 'aria-label': S.rd[i] ? r[0] : 'redacted word', onclick: (e) => { e.stopPropagation(); wake(); revealBar(i); } }, S.rd[i] ? r[0] : '')));
          return;
        }
        const ws = String(sl.title).split(' '), rest = ws.slice(14).join(' ');
        ws.slice(0, 14).forEach((w) => t.appendChild(H('span', 'w', { dataset: { lz: 'word' }, text: w })));
        if (rest) t.appendChild(H('span', 'w', { dataset: { lz: 'word' }, text: rest }));
      }
      function furn(g) {
        if (!g || g === 'none') return null;
        const w = H('div', 'furn');
        const b = (type, label, lab, ...k) => H('button', 'fb', { type: 'button', 'aria-label': label, onclick: (e) => { e.stopPropagation(); wake(); chart(type); } }, ...k, H('span', 'flab', { text: lab }));
        if (g === 'bars') {
          w.appendChild(H('div', 'bars', {}, ...[0, 1, 2, 3, 4].map(() => H('button', 'bar', { type: 'button', 'aria-label': 'bar', style: { height: (24 + api.randInt(0, 64)) + '%' }, onclick: (e) => { e.stopPropagation(); wake(); chart('bar'); } }))));
          w.appendChild(H('span', 'flab', { text: 'Growth (Directional)' }));
          w.style.flexDirection = 'column'; w.style.alignItems = 'center';
        } else if (g === 'pie') w.appendChild(b('pie', 'pie chart', 'Other', H('span', 'gfx pie')));
        else if (g === 'venn') w.appendChild(b('venn', 'venn diagram', 'Overlap: Pending', H('span', 'gfx venn')));
        else if (g === 'org') w.appendChild(b('org', 'org chart', 'Reporting Lines', H('span', 'gfx org', {}, H('span', 'oc', { style: { left: '0', top: '0' } }), H('span', 'oc', { style: { right: '0', top: '0' } }), H('span', 'oc', { style: { right: '0', bottom: '0' } }), H('span', 'oc', { style: { left: '0', bottom: '0' } }), H('span', 'oa', { text: '↻' }))));
        else if (g === 'pyramid') w.appendChild(b('pyramid', 'pyramid', 'Floor', H('span', 'gfx pyr')));
        else if (g === 'arrows') w.appendChild(b('arrows', 'arrows', 'Direction (All)', H('span', 'gfx arr', {}, ...[0, 90, 180, 270, 45, 225].map((d) => H('span', '', { style: { transform: 'rotate(' + d + 'deg)' }, text: '→' })))));
        else if (g === 'photo') w.appendChild(b('photo', 'stock photo', 'Handshake', H('span', 'gfx photo', { text: '🙂' })));
        else if (g === 'polaroid') w.appendChild(H('div', 'pol', {}, H('div', 'polc'), H('span', 'flab', { text: 'Employee' })));
        return w;
      }
      function drawSlide(sl, trIdx) {
        const half = sl.kind === 'half';
        const lab = sl.kind === 'mine' ? sl.label : 'SLIDE ' + sl.label + ' OF 7 1/2';
        const title = H('div', 'title' + (String(sl.title).length > 70 ? ' long' : ''), { 'data-kind': sl.kind });
        fillTitle(title, sl);
        const notes = H('div', 'notes'), flags = H('div', 'flags'), chips = H('div', 'chips');
        const f = sl.kind === 'tuesday' ? H('div', 'furn', { style: { alignItems: 'center' } }, H('span', 'clock tclk', { 'aria-hidden': 'true' }, H('span', 'hand hh'), H('span', 'hand hm'))) : sl.kind === 'real' ? H('div', 'furn', { role: 'img', style: { fontSize: '8cqw', alignItems: 'center' }, 'aria-label': 'one blank bullet' }, '•') : furn(sl.gfx);
        const n = H('div', 'sl' + (half ? ' half' : '') + (sl.kind === 'tuesday' ? ' tue' : '') + (sl.kind === 'mine' ? ' mine' : '') + (trIdx != null ? ' tr' + trIdx : ''), {},
          H('div', 'cnt', { text: lab }), title, f, chips, notes, flags,
          H('div', 'foot', {}, H('span', '', { text: 'SPUDS DIVISION, CONFIDENTIAL-ISH' }), H('span', '', { text: 'slide ' }, H('i', '', { text: sl.label }))));
        if (half && !sl.stair && S.halfVisit >= 2) n.appendChild(H('span', 'appr', { text: 'APPROVED S.C.' }));
        if (sl.kind === 'roles') ROLES.forEach((r, i) => chips.appendChild(H('button', 'chip', { type: 'button', onclick: (e) => { e.stopPropagation(); wake(); pickRole(i, e.currentTarget); } }, r[0])));
        frame.replaceChild(n, inner);
        inner = n; S.titleEl = title; S.notesEl = notes; S.flagsEl = flags;
        S.curTitle = sl.title;
      }
      function addNote(text, union) {
        if (!S.notesEl) return;
        const n = H('div', 'note' + (union ? ' union' : ''), { onclick: (e) => { e.stopPropagation(); wake(); n.remove(); api.sfx('pop'); }, text: text });
        S.notesEl.appendChild(n);
        while (S.notesEl.children.length > 2) S.notesEl.removeChild(S.notesEl.firstChild);
      }
      function addFlag(text) {
        if (!S.flagsEl || S.flagsEl.children.length >= 2) return;
        const f = H('button', 'flag', { type: 'button', onclick: (e) => { e.stopPropagation(); wake(); dismissFlag(f); } }, H('b', '', { text: 'S.C.' }), text);
        S.flagsEl.appendChild(f);
      }
      function dismissFlag(f) {
        f.remove(); api.award(0.2, 'flag'); api.stat.inc(ST + 'flags'); api.sfx('pop'); S.flagsDone++;
        nsay(bags.sd.next(), { who: 'Management' });
      }
      function chart(t) {
        api.sfx('tick'); api.stat.inc(ST + 'charts');
        if (S.clock - S.lastChart > 0.4) api.award(0.1, 'chart');
        S.lastChart = S.clock;
        let line;
        if (t === 'bar') { line = S.barFirst ? CH.barfirst : bags.chb.next(); S.barFirst = false; } else { const v = CH[t]; line = Array.isArray(v) ? (bags['c_' + t] || (bags['c_' + t] = bag(v))).next() : v; }
        dsay(line, 'Gerald');
      }
      function revealBar(i) {
        if (S.slide.kind !== 'redacted' || S.rd[i]) return;
        S.rd[i] = 1; api.award(0.2, 'redaction'); api.sfx('pop');
        fillTitle(S.titleEl, S.slide);
        nsay(RD[i][1], { who: 'Gerald', priority: 1 });
        if (S.rd[0] && S.rd[1] && S.rd[2]) nsay(RDFIN, { who: 'Management', priority: 1 });
      }
      function pickRole(i, btn) {
        if (S.slide.kind !== 'roles' || btn.disabled) return;
        btn.disabled = true; S.rolesPicked = true;
        api.award(0.5, 'drafting'); api.stat.inc(ST + 'chips'); api.sfx('ding');
        gsay(ROLES[i][1]);
        api.setTimeout(() => { if (S.slide && S.slide.kind === 'roles') gsay(THANKS_DRAFT); }, 1200);
        api.setTitle('Gerald');
        api.setTimeout(() => api.setTitle('Gerald_Keynote_FINAL_v7_REAL.ppt'), 4000);
      }

      /* ---------- ring ---------- */
      const zoneOf = (p) => (p < 0.7 ? 'R' : p < 1 ? 'F' : p < 1.35 ? 'M' : 'L');
      function paintRing(force) {
        const p = S.L > 0 ? S.slideT / S.L : 0;
        const f = Math.round(Math.min(p, 1.35) / 1.35 * 100);
        if (force || f !== S.rf) { S.rf = f; prog.setAttribute('stroke-dasharray', num(f) + ' 100'); }
        const z = S.mode === 'play' ? zoneOf(p) : S.mode === 'foam' ? 'N' : 'Q';
        if (force || z !== S.rz) {
          S.rz = z;
          ringw.className = C + 'ringw ' + C + 'z' + z;
          rcap.textContent = S.mode === 'foam' ? 'Foam clicker. It is foam.' : S.mode !== 'play' ? ' ' : S.slide && S.slide.kind === 'half' ? 'Hold for applause.' : bags['z' + z].next();
          cl(led, 'on', z === 'F' || z === 'M');
        }
      }
      function setBreath(L) { R.style.setProperty('--gk-breath', clamp(L, 1.2, 8).toFixed(2) + 's'); R.style.setProperty('--gk-sway', clamp(L / 2, 0.6, 4).toFixed(2) + 's'); }

      /* ---------- presenting ---------- */
      function present(sl, o) {
        o = o || {};
        S.slide = sl;
        const di = S.deck.indexOf(sl); if (di >= 0) S.idx = di;
        S.slideT = 0; S.clapDone = false; S.minAdded = false; S.skipSaid = false; S.stpClicks = 0; S.rolesPicked = false;
        S.rd = [0, 0, 0]; S.starMin = false; S.stair = !!sl.stair; S.busy = false;
        if (sl.kind === 'half') S.halfVisit++;
        let sent = sl.sentence;
        if (sl.kind === 'retro') sent = fill(RETRO, { s: num(S.slides), m: num(S.moved), r: num(S.rushed) });
        if (sl.kind === 'content' && sent && S.unionResp && sl.num !== 1) { sent += ' ' + S45; S.unionResp = false; }
        if (sl === S.deck[0] && S.first && S.deckNo === 1 && metBefore) sent = S1PRE + ' ' + sent;
        const td = sent ? sent.length / 35 : 0;
        let L;
        if (sl.kind === 'half') L = sl.stair ? 3.5 : 5.0;
        else if (sl.kind === 'tuesday') L = 3.5;
        else if (o.back) L = td + 0.6;
        else if (sl === S.deck[0]) L = 4.8;
        else if (!sent) L = 3.0;
        else L = clamp(td + 0.6 + rnd() - 0.2, 1.8, 5.0) + S.cautious;
        if (sl.kind !== 'half') S.cautious = 0;
        S.L = L; S.sent = sent || ''; S.typing = !!sent; S.sentDone = !sent; S.typedN = 0; S.shownN = 0;
        S.typeDelay = S.pendDelay || (S.first && sl === S.deck[0] ? 1.6 : 0); S.pendDelay = 0;
        bubble.textContent = ''; sr.textContent = sl.kind === 'half' ? 'Slide ' + sl.label : sl.kind === 'mine' ? String(sl.label) : String(sl.title || ''); ['fs1', 'fs2', 'fs3'].forEach((c) => cl(bubble, c, false));
        let tr = null;
        if (o.back) { tr = 2; cap.textContent = 'Transition: ' + TRN[2]; }
        else if (o.how === 'moved' || o.noTrans || sl.kind === 'half') { cap.textContent = ''; }
        else if (api.chance(1 / 60)) { tr = 6; cap.textContent = 'Transition: Toast (Rare) 🍞'; nsay(LTOAST, { who: 'Management', priority: 1 }); }
        else { tr = bags.tr.next(); cap.textContent = 'Transition: ' + TRN[tr]; }
        drawSlide(sl, tr);
        cl(inner, 'bk5', false);
        setBreath(L); paintRing(true); paintPlacard();
        if (sl.kind !== 'half') { if (S.face === 'moved' && !S.faceT) setFace(''); }
        if (!sl.stair) setStaplersVis();
        onPresent(sl, o);
        S.afterHalfSlide = false;
        if (S.spud) { jrb.textContent = S.lastWords ? S.lastWords : '...'; }
        const ws = (sent || '').split(' ').filter(Boolean); if (ws.length >= 3) S.lastWords = ws.slice(-3).join(' ');
      }
      function setStaplersVis() { if (S.halfVisit > 0) setStaplers(stapCount(S.halfVisit)); }
      function onPresent(sl, o) {
        if (sl.kind === 'half') return presentHalf(sl);
        if (sl.kind === 'content' || sl.kind === 'redacted' || sl.kind === 'roles' || sl.kind === 'tuesday') {
          if (sl.num >= 9 && sl.kind === 'content' && !o.back) { if (sl.num === 9) addFlag(FL9); else if (sl.num === 11) addFlag(FL11); else if (api.chance(0.4)) addFlag(bags.flb.next()); }
          if (sl.num >= 9 && sl.kind !== 'content' && !o.back && api.chance(0.4)) addFlag(bags.flb.next());
        }
        if (!o.back && S.sprout > 0 && S.sprout < 5) { S.sprout++; paintSprout(); if (S.sprout === 2) nsay(SPR2, { who: 'Management' }); if (S.sprout === 4) nsay(SPR4, { who: 'Management' }); }
        if (sl.num === 5 && sl.kind === 'content' && once('dot')) at(0.8, () => nsay("If you have a red dot, use it.", { who: 'Management', priority: 1 }));
        if (sl.label === '8' && once('l8')) nsay(L8, { priority: 1 });
        if (sl.label === '3' && S.deckNo > 1 && once('d2rev')) nsay(LD2REV, { priority: 1 });
        if (sl.label === '30' && once('pres' + S.deckNo)) nsay(fill(EPRES, { p: api.player.name }), { priority: 1 });
        if (sl.kind === 'tuesday') { S.tueRef = 0; S.tuePaid = false; S.tueNeed = S.deckNo > 1 ? 3 : 7; }
        if (sl.kind === 'employee') { S.batOn = true; S.batHide = false; paintBat(); api.achieve(ST + 'employee'); }
        if (sl.kind === 'retro') { at(2.5, () => nsay(RETRO1, { priority: 1 })); at(3, () => nsay('Applause rating, as currently measured: ' + ratingOf() + '.', { priority: 1 })); }
        if (sl.kind === 'thanks') { api.sfx('fanfare'); burst(); at(0.6, () => { nsay(fill(LTHANKS, { w: ratingOf() }), { priority: 1, mood: 'proud' }); }); }
        if (sl.kind === 'reprise') nsay(LREPR, { priority: 1 });
        if (sl.kind === 'real') gsay(LREAL);
        let wrongNow = false;
        if (sl.kind === 'content' && !o.back && !S.wrongDone && sl.num > 3 && sl.num < 35 && (api.chance(1 / 55) || sl.num === 17)) {
          S.wrongDone = wrongNow = true;
          S.curTitle = WRONG[0]; fillTitle(S.titleEl, { kind: 'content', title: WRONG[0] });
          S.sent = api.flag.get('sockSeen') ? WRONG[2] : WRONG[1]; S.typing = true; S.sentDone = false; S.typedN = 0; S.shownN = 0; bubble.textContent = '';
          S.L = Math.max(S.L, 4.8); setBreath(S.L); paintRing(true);
          api.award(0.5, 'wrong deck'); at(7.5, () => nsay(WRONG[3], { priority: 1 }));
        }
        if (sl.label === '14' && sl.kind === 'content' && (api.flag.get('metToaster') || api.flag.get('toasterMet')) && once('cbt')) at(1.4, () => nsay(CBT, { priority: 1 }));
        if (sl.kind === 'content' && !wrongNow && !o.back && !S.realDone && sl.num > 1 && (api.chance(1 / 60) || (S.slides >= 20 && !S.rareSeen))) {
          const w = String(sl.title).split(' ').sort((a, b) => b.length - a.length)[0];
          if (w && w.length > 3) {
            const i = sl.title.indexOf(w), nw = w.slice(0, 1) + w.slice(2, 3) + w.slice(1, 2) + w.slice(3);
            const nt = sl.title.slice(0, i) + nw + sl.title.slice(i + w.length);
            S.rareSeen = true; S.curTitle = nt; fillTitle(S.titleEl, { kind: 'content', title: nt }); S.starMin = true;
            api.award(0.7, 'typo'); at(1.2, () => { if (S.slide === sl && S.mode === 'play') gsay(LTYPO); else nsay(LTYPO, { who: 'Gerald', priority: 1 }); });
          }
        }
        if (!sl.sentence && sl.kind === 'content') S.sentDone = true;
      }
      function paintSprout() {
        cl(sprout, 'hide', S.sprout < 1);
        for (let i = 2; i <= 5; i++) cl(sprout, 'sp' + i, S.sprout === i);
      }
      function sproutBorn() {
        S.sprout = 1; S.sproutDone = true; paintSprout(); api.achieve(ST + 'sprout'); nsay(SPR, { who: 'Gerald', priority: 1 });
      }
      function presentHalf(sl) {
        const v = S.halfVisit;
        api.stat.inc(ST + 'halves');
        api.sfx('pop'); setFace('moved');
        cl(inner, 'half', true);
        if (v >= 4) cl(R, 'hasrep', true);
        if (v >= 12) cl(R, 'lany', true);
        let m;
        if (sl.stair) { m = STM[sl.stair - 1]; if (sl.stair === 3) api.achieve(ST + 'zeno'); }
        else m = v === 1 ? H_ARR : bags.hret.next();
        nsay(m, { priority: 1 });
        if (v >= 2 && !sl.stair) at(0.5, () => nsay(v === 2 ? SAPP[0] : bags.sapp.next(), { priority: 1 }));
      }

      /* ---------- advancing ---------- */
      function wake() {
        S.quiet = 0; S.impArmed = false; S.mindDone = false; S.impN = 0;
        if (S.idleStage >= 3) { comeBack(); return true; }
        S.idleStage = 0;
        return false;
      }
      function advance(src) {
        if (S.dead) return;
        if (blackOn()) { toggleBlack(false); return; }
        const t = S.clock;
        if (S.mode === 'play') {
          S.spam.push(t); if (S.spam.length > 16) S.spam.shift();
          if (S.spam.filter((x) => t - x <= 3).length === 5 && t - S.lastWarn > 10 && t - S.lastFi > 20) { S.lastWarn = t; nsay(bags.sw.next(), { who: 'Gerald', priority: 2, mood: 'panic' }); }
          if (t - S.lastFi > 20 && S.spam.filter((x) => t - x <= 3).length >= 8 && S.idleStage < 3) { startFiasco(); return; }
        }
        if (S.mode === 'foam') { wake(); foamPress(); return; }
        if (S.mode === 'qa') { wake(); qaClick(); return; }
        if (S.mode !== 'play') return;
        if (t - S.lastAdv < 0.12 || S.busy) return;
        S.lastAdv = t;
        if (wake()) return;
        const sl = S.slide, p = S.slideT / S.L, z = zoneOf(p);
        if (sl.kind === 'half') return halfAdvance(z);
        if (z === 'R') return rush();
        if (sl.kind === 'tuesday' && S.tueRef < S.tueNeed) return tuesdayRefuse(z);
        if (sl.kind === 'tuesday') nsay(TRELENT, { who: 'Gerald', priority: 1 });
        commit(z, 'click');
      }
      function commit(z, how) {
        const sl = S.slide;
        if (z === 'M') moved(sl.kind === 'half'); else S.streak = 0;
        api.award(z === 'M' ? 1.5 : z === 'F' ? 0.5 : 0.1, z === 'M' ? 'moved' : 'advance');
        if (z === 'L') api.stat.inc(ST + 'late');
        if (sl.kind === 'employee' && z === 'M' && once('thx' + S.deckNo)) nsay(ETHX, { who: 'Gerald', priority: 1 });
        goNext(how === 'click' && z === 'M' ? 'moved' : how);
      }
      function goNext(how) {
        const sl = S.slide;
        S.slides++; S.life++; api.stat.inc(ST + 'slides');
        batteryStep();
        addMin(how);
        if (sl.kind === 'roles' && !S.rolesPicked && how !== 'mind') nsay(RSKIPR, { who: 'Gerald', priority: 1 });
        if (!sl.stair && !S.sproutDone && S.sprout === 0 && sl.kind === 'content' && api.chance(1 / 80)) sproutBorn();
        paintPlacard();
        if (sl.kind === 'thanks') { S.hist.push(sl); startQA(); return; }
        if (sl.kind === 'reprise') { startKeynote(); return; }
        if (sl.stair) { present(sl.stair > 1 ? S.stairs[sl.stair - 2] : S.deck[S.idx], { how: how }); return; }
        S.halfBack = 0;
        S.hist.push(sl); if (S.hist.length > 40) S.hist.shift();
        let nx = S.deck[S.idx + 1];
        if (!nx) nx = S.deck[0];
        if (nx.kind === 'content' && nx.num > 1 && !S.realDone && (api.chance(1 / 60) || (S.slides >= 24 && !S.rareSeen))) {
          S.realDone = true; S.rareSeen = true; nx = { kind: 'real', label: nx.label + ' (Candidly)', title: 'A Bullet Point', sentence: null, gfx: 'none', num: nx.num };
          S.deck.splice(S.idx + 1, 0, nx);
        }
        S.afterHalfNext = sl.kind === 'half';
        present(nx, { how: how });
        S.afterHalfSlide = S.afterHalfNext;
        if (nx.kind === 'real') { S.minAdded = true; }
        if (S.lateLeave && S.slides >= S.lateLeave) lateLeaves();
        if (!S.lateDone && nx.kind === 'content' && nx.num > 3 && nx.num < 33 && api.chance(1 / 40)) lateArrival(nx);
      }
      function batteryStep() {
        if (!S.batOn) return;
        if (S.bat > 4) {
          S.bat = Math.max(4, S.bat - 12);
          if (S.bat === 4) { setFace('panic', 2200); nsay(EPANIC, { who: 'Gerald', mood: 'panic', priority: 1 }); nsay(EBATT, { priority: 1 }); }
        } else if (S.bat > 1) S.bat--;
        else { S.bat = 100; nsay(ERECH, { priority: 1 }); api.sfx('ding'); S.stap.forEach((s) => restart(s, 'clap')); }
        paintBat();
      }
      function rush() {
        S.rushed++; S.streak = 0; S.cautious = Math.min(2, S.cautious + 0.4);
        api.stat.inc(ST + 'rushed'); api.sfx('buzz'); restart(inner, 'jud'); setFace('rushed', 700);
        const r = S.rushed;
        let line = RUSH[r] || bags.rb.next();
        if (S.typing && S.shownN < S.sent.length) {
          const fr = S.sent.slice(0, S.shownN);
          S.typing = false; S.sentDone = false;
          bubble.textContent = fr + '-- hm'; sr.textContent = fr;
          if (!S.minAdded) { S.minAdded = true; pushMin((fr.slice(0, 40) || '(the start of a thought)') + '--  | Item cut short. Item moved.'); }
          const rsl = S.slide;
          api.setTimeout(() => { if (S.mode === 'play' && S.slide === rsl) gsay(line); }, 150);
        } else gsay(line);
        if (r === 3 && S.moved === 0) nsay(RING_HINT3, { priority: 1 });
        else if (r === 20) nsay(R20, { priority: 1 });
        else if (r >= 5 && r % 5 === 0 && !S.skipSaid) { S.skipSaid = true; nsay(RSKIP, { priority: 0 }); }
      }
      function moved(quiet) {
        S.moved++; S.lifeM++; S.streak++;
        api.stat.inc(ST + 'moved'); api.sfx('bell');
        setFace('moved', 1000); restart(dennis, 'lean'); paintPlacard();
        const k = S.moved;
        if (!quiet) {
          let line = null, who = 'Gerald', pr = 0;
          if (k === 1) line = M1; else if (k === 3) line = M3; else if (k === 7) line = M7;
          else if (k === 10) { line = M10; who = 'Management'; pr = 1; } else if (k === 20) { line = M20; who = 'Management'; pr = 1; } else if (k === 100) { line = M100; who = 'Management'; pr = 1; }
          else line = S.streak > 5 ? bags.mr.next() : bags.mb.next();
          if (k === 1 || k === 3 || k === 7) pr = 1;
          nsay(line, { who: who, priority: pr, mood: 'proud' });
        } else if (S.slide && S.slide.kind === 'half') nsay(bags.hm.next(), { who: 'Gerald', priority: 1 });
        if (k === 1) { nsay(RING_HINT, { priority: 1 }); }
        if (k === 10 || k === 25 || k === 50) burst();
        if (S.streak === 5) { if (once('streak5')) nsay(STREAK5, { who: 'Gerald', priority: 1 }); restart(placard, 'shake'); }
        if (S.afterHalfSlide && !S.pauseDone) { S.pauseDone = true; at(1.6, () => nsay(LPAUSE, { who: 'Gerald', priority: 1 })); }
        const ri = RATE.reduce((a, r, i) => (S.moved >= r[0] ? i : a), 0);
        if (ri > S.ratIdx) { S.ratIdx = ri; nsay(fill(RATIO, { w: RATE[ri][1] }), { priority: 1 }); }
        if (S.sprout > 0 && !S.spud) { S.sproutMoved++; if (S.sproutMoved >= 3) spudBorn(); }
        if (S.sprout === 0 && !S.sproutDone && !quiet && api.chance(1 / 25)) sproutBorn();
      }
      function spudBorn() {
        S.spud = true; S.sprout = 0; paintSprout(); cl(jr, 'hide', false); jrb.textContent = S.lastWords || '...';
        api.flag.set(ST + 'sprout', true); nsay(SPJR, { priority: 2 }); api.sfx('tada'); api.save.set('state', saveObj());
      }
      function tuesdayRefuse(z) {
        S.tueRef++;
        if (z === 'M' && !S.tuePaid) { S.tuePaid = true; api.award(1.5, 'tuesday'); } else api.award(0.1, 'tuesday');
        api.sfx('buzz'); restart(inner, 'jud');
        const line = bags.tref.next();
        if (line.indexOf('The click has been received') === 0) nsay(line, { priority: 1 }); else gsay(line);
        S.slideT = 0; paintRing(true);
      }

      /* ---------- 7 1/2 ---------- */
      function halfAdvance(z) {
        const sl = S.slide;
        if (z === 'R') { gsay(bags.hr.next()); api.sfx('blip'); return; }
        if (!S.clapDone) {
          doClap();
          if (z === 'F') { S.busy = true; api.setTimeout(() => { S.busy = false; if (S.slide === sl && S.mode === 'play') commit('F', 'click'); }, 500); return; }
        }
        commit(z, 'click');
      }
      function doClap() {
        if (S.clapDone) return;
        S.clapDone = true;
        const sl = S.slide, v = S.halfVisit, first = !sl.clapped, st = sl.stair;
        const vis = visStp();
        if (st) api.setTimeout(() => api.sfx('tick'), 0);
        else {
          for (let i = 0; i < Math.min(vis.length, 4); i++) api.setTimeout(() => api.sfx(i === 0 && v > 1 ? 'stamp' : 'tick'), i * 90);
          if (v >= 13) api.setTimeout(() => api.sfx('stamp'), 180);
        }
        vis.forEach((s, i) => { s.style.setProperty('--gk-d', (v === 6 && i === 1 ? 0.12 : 0) + 's'); restart(s, 'clap'); });
        floatWord('clack', vis[0] || frame, !!st);
        if (v === 7 && first) { const c = center(vis[0] || aud), rr = R.getBoundingClientRect(); staple.style.left = Math.round(c[0] - rr.left) + 'px'; staple.style.top = Math.round(c[1] - rr.top) + 'px'; restart(staple, 'go'); }
        if (!first) return;
        sl.clapped = true;
        api.award(st ? 0.75 : 7.5, st ? 'quarter clap' : '7 1/2');
        api.stat.inc(ST + 'claps', Math.max(1, vis.length));
        if (st) return;
        burst(Math.min(6, Math.max(1, vis.length)), vis[0] || frame);
        if (v === 1) api.sfx('tada');
        api.achieve(ST + 'sacredblank');
        if (v < H_CLAP.length && H_CLAP[v]) nsay(H_CLAP[v], { priority: 1 });
        if (v >= 13 && once('h13')) nsay(H_13, { priority: 1 });
        if (once('metst')) { const had = !!api.flag.get('metStapler'); api.flag.set('metStapler', true); at(0.5, () => nsay(had ? MS_SET : MS_NEW, { priority: 1 })); }
        if (v === 1 && api.flag.get('museumHalf')) at(3, () => nsay(CBM, { priority: 1 }));
        if (v === 1) at(1, () => { if (S.slide === sl && S.mode === 'play') gsay(H_GER); else nsay(H_GER, { who: 'Gerald', priority: 1 }); });
        if (v === 3) { addNote(UN3, true); nsay(UN3, { who: 'Stapler', priority: 1 }); }
        if (v === 8 || (v >= 9 && v <= 11)) {
          const d = v === 8 ? UN8 : bags.db.next();
          addNote(d, true); nsay(d, { who: 'Stapler', priority: 1 }); S.unionResp = true;
        }
      }
      function onStapler() {
        wake(); api.sfx('blip');
        const sl = S.slide;
        if (sl && sl.kind === 'half') {
          S.stpClicks++;
          if (S.stpClicks === 7 && !S.spoke) return stapSpeaks();
          if (S.stpClicks < 7) { nsay(fill(bags.stc.next(), { n: num(S.stpClicks) }), { who: 'Stapler' }); return; }
        } else nsay(bags.aust.next(), { who: 'Stapler' });
      }
      function stapSpeaks() {
        S.spoke = true;
        const s = S.stap[0]; cl(s, 'stand', true);
        SPEAK.forEach((t, i) => at(i * 4, () => { gsay(t); nsay(t, { who: 'Stapler', priority: 2 }); }));
        at(SPEAK.length * 4, () => { cl(s, 'stand', false); S.spoke = false; });
        if (!S.spokeAward) { S.spokeAward = true; api.award(7.5, 'stapler speech'); }
        api.achieve(ST + 'stapler'); api.sfx('fanfare');
      }
      function back() {
        if (S.dead || S.mode !== 'play' || S.busy) return;
        if (blackOn()) { toggleBlack(false); return; }
        if (wake()) return;
        const sl = S.slide;
        S.backs++; api.stat.inc(ST + 'backs');
        S.backT.push(S.clock); if (S.backT.length > 6) S.backT.shift();
        if (S.backs === 7) nsay(BK7, { priority: 1 });
        else if (S.backT.filter((x) => S.clock - x <= 3).length === 4 && !((S.cool.bks || 0) > S.clock)) { S.cool.bks = S.clock + 20; nsay(BKS, { priority: 1 }); }
        if (sl.kind === 'half') {
          S.halfBack++;
          if (!sl.stair) {
            if (S.halfBack < 3) { gsay(STR[S.halfBack - 1]); return; }
            if (S.halfBack === 3) gsay(STOPEN);
            present(S.stairs[0], { noTrans: true }); return;
          }
          if (sl.stair < 3) present(S.stairs[sl.stair], { noTrans: true }); else gsay(STFLOOR);
          return;
        }
        if (!S.hist.length) { nsay(BK0, { who: 'Gerald' }); return; }
        if (once('bk1' + S.deckNo)) nsay(BK1, { who: 'Gerald', priority: 1 }); else nsay(bags.bk.next(), { who: 'Gerald' });
        const pv = S.hist.pop();
        present(pv, { back: true });
      }

      /* ---------- spam, foam ---------- */
      function enterMode(m, len) {
        S.mode = m; S.until = S.clock + len; S.quiet = 0; S.idleStage = 0; S.impArmed = false; S.mindDone = false;
        cl(R, 'sc-field', false); cl(dim, 'on', false); S.base = ''; setFace('');
        paintRing(true);
      }
      function startFiasco() {
        enterMode('fiasco', 3); S.lastFi = S.clock; S.fiascos++; S.fiStep = 0; S.fiT = 0;
        api.stat.inc(ST + 'spam'); api.sfx('whoosh');
        nsay(S.fiascos === 1 ? FIA : S.fiascos === 2 ? FIA2 : S.fiascos === 3 ? FIA3 : fill(bags.fian.next(), { n: num(S.fiascos) }), { priority: 1, mood: 'panic' });
        gsay("I was not finished being moved.", 'fs1');
        cl(frame, 'fiasco', true);
      }
      function endFiasco() {
        cl(frame, 'fiasco', false);
        enterMode('foam', 10); S.foamN = 0;
        clicker.textContent = 'SQUISH'; cl(clicker, 'foam', true);
        api.sfx('sad'); nsay(CONF, { priority: 1, mood: 'disappointed' }); api.achieve(ST + 'foam');
        bubble.textContent = ''; ['fs1', 'fs2', 'fs3'].forEach((c) => cl(bubble, c, false));
      }
      function foamPress() {
        S.foamN++; api.award(0.1, 'foam'); api.sfx('boing');
        restart(clicker, 'squash');
        floatWord(bags.sq.next(), clicker, true);
        if (FMX[S.foamN]) nsay(FMX[S.foamN], { priority: 1 });
        else if (S.foamN % 3 === 0) nsay(bags.fm.next(), { who: 'Gerald', priority: 0 });
      }
      function endFoam() {
        enterMode('play', 0); clicker.textContent = 'CLICK'; cl(clicker, 'foam', false);
        nsay(SRET, { priority: 1 }); S.spam.length = 0;
        if (S.foamN === 0) at(3, () => nsay(FMN0, { priority: 1 })); else if (S.foamN >= 30) at(3, () => nsay(FMN30, { priority: 1 })); S.slideT = 0; paintRing(true);
        S.typing = !!S.sent; S.sentDone = !S.sent; S.typedN = 0; S.shownN = 0; S.typeDelay = 0; bubble.textContent = '';
      }

      /* ---------- Q&A, keynote, ending ---------- */
      function startQA() {
        enterMode('qa', 1e9); S.qa = [false, false, false]; S.qaT = S.clock - 5;
        const q = { label: '36', title: 'Questions?', sentence: null, gfx: 'none', kind: 'questions', num: 36 };
        present(q, { noTrans: true });
        cl(qaEl, 'on', true);
        qaEl.querySelectorAll('button').forEach((b, i) => { b.disabled = false; b.textContent = QA[i].w; });
        nsay(LQAI, { priority: 1 });
      }
      function qaAnswer(i) {
        if (S.mode !== 'qa' || S.qa[i] || S.clock - S.qaT < 0.3) return;
        S.qaT = S.clock; S.qa[i] = true;
        const d = S.deckNo > 1 ? 1 : 0, b = qaEl.children[i];
        b.textContent = QA[i].w + ': ' + QA[i].q[d]; b.disabled = true;
        gsay(QA[i].a[d]); api.award(0.5, 'question'); api.stat.inc(ST + 'chips'); api.sfx('ding');
        if (i === 0) { moved(true); nsay(LBRA, { priority: 1 }); }
        if (i === 2) { api.flag.set('metDennis', true); restart(dennis, 'lean'); }
        if (S.qa.every(Boolean)) at(1.8, () => {
          if (S.mode !== 'qa') return;
          cl(qaEl, 'on', false); S.mode = 'play'; S.until = 0; S.quiet = 0;
          const rp = S.deck[S.idx + 1] || S.deck[S.deck.length - 1];
          present(rp, { noTrans: true }); gsay(LBIG);
        });
      }
      function qaClick() {
        const dt = S.clock - S.qaT;
        if (dt < 0.3) return;
        if (dt < 0.9 && S.qa.some(Boolean)) { gsay(LCHASE); S.qaT = S.clock; return; }
        const i = S.qa.indexOf(false);
        if (i >= 0) qaAnswer(i);
      }
      function startKeynote() {
        enterMode('staplerkeynote', 30); S.batHide = true; paintBat();
        nsay(LSFLOOR, { priority: 2 });
        const mine = { kind: 'mine', label: '7 1/2, but mine.', title: '', sentence: null, gfx: 'none', num: 7.5 };
        present(mine, { noTrans: true }); S.slide = mine;
        cl(gb, 'left', true); cl(lstp, 'hide', false); if (S.stap[0]) cl(S.stap[0], 'away', true);
        S.seq = [
          [2.5, () => { gsay(STKEY); nsay(STKEY, { who: 'Stapler', priority: 2 }); }],
          [6.5, () => { restart(gb, 'bump'); api.sfx('bloop'); floatWord('thud', gb, true); nsay(LTHUD, { priority: 2 }); }],
          [8.5, () => { gsay(EMERE); api.award(7.5, 'keynote'); api.sfx('tada'); }],
          [10.5, () => { nsay(LFINAL, { priority: 2, mood: 'proud' }); api.achieve(ST + 'reprise'); api.stat.inc(ST + 'decks'); S.deckNo++; api.save.set('state', saveObj()); S.mode = 'ending'; }],
          [11, () => { cl(dim, 'on', true); }],
          [12, () => { S.stap.concat([brenda]).forEach((m, i) => { if (m !== S.stap[0]) cl(m, 'gone', true); }); }],
          [15, () => { api.sfx('tick'); if (S.stap[0]) restart(S.stap[0], 'clap'); }],
          [17, () => { api.sfx('tick'); if (S.stap[0]) restart(S.stap[0], 'clap'); }],
          [19, () => { api.sfx('tick'); if (S.stap[0]) restart(S.stap[0], 'clap'); }],
          [20.5, () => { cl(black, 'bhint', false); cl(black, 'on', true); }],
          [23.5, () => { restartDeck(); }]
        ];
        S.seqT = 0;
      }
      function restartDeck() {
        cl(black, 'on', false); cl(dim, 'on', false); cl(gb, 'left', false); cl(lstp, 'hide', true);
        S.stap.concat([brenda]).forEach((m) => { cl(m, 'gone', false); cl(m, 'back', true); });
        if (S.stap[0]) cl(S.stap[0], 'away', false);
        S.seq = null; S.batHide = false;
        S.mode = 'play'; S.until = 0; S.quiet = 0; S.idleStage = 0; S.hist = []; S.cautious = 0; S.rushed0 = 0;
        S.deck = buildDeck(S.deckNo); S.tl = [];
        S.minN = 1; S.mins = ['1. Synergy is when two things happen near each other  | Owner: Dennis (Plant)']; paintMins();
        S.lateDone = false; S.wrongDone = false; S.lateLeave = 0; cl(lateEl, 'hide', true);
        S.pendDelay = 2.2; S.said.delete('d2rev'); S.halfBack = 0; S.realDone = false; S.spoke = false; S.tueRef = 0;
        S.stap.forEach((s) => cl(s, 'stand', false)); S.spoke = false; S.skipSaid = false;
        present(S.deck[0], { noTrans: true });
        gsay(GWEL, '', true);
        nsay(S.deckNo === 2 ? LD2 : fill(LD3, { n: num(S.deckNo) }), { priority: 2 });
        paintBat();
      }

      /* ---------- idle ---------- */
      function improv() {
        S.improvs++; S.impN++; api.stat.inc(ST + 'improvs'); setFace('improv', 1500);
        gsay(S.impN >= 4 ? bags.i7y.next() : (S.impN > 2 || (S.slide && S.slide.num > 17)) ? bags.i7x.next() : bags.i7w.next());
        addNote(bags.nb.next(), false);
        const ik = S.impN - 1;
        if (IMPM[ik]) at(2.5, () => { if (S.mode === 'play' && S.idleStage < 3) nsay(IMPM[ik], { priority: 1 }); });
      }
      function mindAdvance() {
        const sl = S.slide;
        if (!sl || sl.stair || sl.kind === 'thanks' || sl.kind === 'reprise' || sl.kind === 'tuesday') return;
        nsay(LMIND, { priority: 1 });
        cl(gb, 'walk', true); cl(frame, 'shrink', true);
        api.setTimeout(() => {
          cl(gb, 'walk', false); cl(frame, 'shrink', false);
          if (S.mode !== 'play' || S.slide !== sl) return;
          if (sl.kind === 'half' && !S.clapDone) doClap();
          S.lastAdv = S.clock; goNext('mind');
        }, 900);
      }
      function tier(n) {
        if (n === 1) mindAdvance();
        else if (n === 2) {
          let q = bags.i30.next();
          if (q === '@FORTUNE') { const f = String(api.line('fortune')); q = f.length < 140 && f.indexOf('{') < 0 ? "The lobby gave me a fortune. It says: '" + f + "' I have been thinking about it. I have not got far." : bags.i30.next(); }
          gsay(q === '@FORTUNE' ? I30[0] : q);
        }
        else if (n === 3) {
          cl(R, 'sc-field', true); S.base = 'field'; setFace(''); nsay(FINTRO, { priority: 1 });
          FLD.forEach((t, i) => at(i < 4 ? 1 + i * 4 * IS : (9 + (i - 3) * 12) * IS, () => { if (S.idleStage >= 3) gsay(t); }));
          if (!S.fieldDone) { S.fieldDone = true; api.award(10, 'the field'); api.achieve(ST + 'field'); }
        } else if (n === 4) {
          cl(dim, 'on', true); nsay(SWHISP, { who: 'Stapler', priority: 1 }); nsay(LCOAT, { priority: 1 }); if (S.stap[0]) cl(S.stap[0], 'away', true);
        } else if (n === 5) {
          S.base = 'sleep'; setFace(''); nsay(LNAP, { priority: 1 });
          [20, 60, 100].forEach((s) => at(s * IS, () => { if (S.idleStage === 5) nsay(bags.snore.next(), { priority: 1 }); }));
        }
        else if (n === 6) { cl(lstp, 'hide', false); cl(inner, 'bk5', true); if (S.titleEl) S.titleEl.textContent = 'Back in 5'; nsay(LB5, { priority: 1 }); }
        else if (n === 7) { if (S.titleEl) S.titleEl.textContent = 'Back in 5 (Q3)'; nsay(LB5Q, { priority: 1 }); }
      }
      function comeBack() {
        const st = S.idleStage;
        S.idleStage = 0; S.quiet = 0; S.impArmed = false; S.mindDone = false;
        cl(R, 'sc-field', false); cl(dim, 'on', false); cl(lstp, 'hide', true); S.base = ''; setFace('');
        if (S.stap[0]) cl(S.stap[0], 'away', false);
        cl(inner, 'bk5', false);
        if (S.titleEl && S.slide) fillTitle(S.titleEl, S.curTitle !== S.slide.title ? { kind: 'content', title: S.curTitle } : S.slide);
        api.award(0.5, 'return');
        if (st >= 4) nsay(SCOATR, { who: 'Stapler', priority: 1 });
        if (!S.returnSaid) { S.returnSaid = true; gsay(LRET); }
        if (st >= 6) { api.achieve(ST + 'waited'); nsay(LWAIT, { priority: 2 }); }
      }
      const TH = [15, 30, 60, 120, 180, 360, 420];
      function idleTick() {
        const q = S.quiet, p = S.slideT / S.L;
        if (!S.impArmed && q >= 7 * IS && p >= 1) { S.impArmed = true; S.nextImp = q; }
        if (S.impArmed && S.idleStage < 3 && q >= S.nextImp) { improv(); S.nextImp = q + 12 * IS; }
        while (S.idleStage < 7 && q >= TH[S.idleStage] * IS) { S.idleStage++; tier(S.idleStage); }
      }

      /* ---------- input: laser, pointer, keys ---------- */
      function setDot(x, y, show) {
        const r = frame.getBoundingClientRect();
        S.dotX = clamp(x, 0, r.width); S.dotY = clamp(y, 0, r.height);
        dot.style.transform = 'translate(' + Math.round(S.dotX) + 'px,' + Math.round(S.dotY) + 'px)';
        if (show) { S.laserOn = true; cl(dot, 'on', true); }
      }
      function hideDot() { S.laserOn = false; cl(dot, 'on', false); pupils.forEach((p) => { p.style.transform = ''; }); }
      function onFrameClick() {
        if (S.lastDist > 12 || S.clock < S.suppressUntil) { S.lastDist = 0; return; }
        advance('slide');
      }
      function onPd(e) {
        S.pd = { x: e.clientX, y: e.clientY, touch: e.pointerType === 'touch' }; S.lastDist = 0;
        if (S.pd.touch) { if (S.lp) api.clearTimeout(S.lp); S.lp = api.setTimeout(() => { S.lp = 0; if (S.pd) { S.lpOn = true; const r = frame.getBoundingClientRect(); setDot(S.pd.x - r.left, S.pd.y - r.top, true); } }, 400); }
      }
      function onPm(e) {
        const r = frame.getBoundingClientRect();
        if (S.pd && S.pd.touch) {
          if (S.lp && Math.hypot(e.clientX - S.pd.x, e.clientY - S.pd.y) > 10) { api.clearTimeout(S.lp); S.lp = 0; }
          if (!S.lpOn) return;
        }
        if (S.mode !== 'play') return;
        if (S.quiet > 0 || S.idleStage > 0) wake();
        S.edgeAt = -1;
        setDot(e.clientX - r.left, e.clientY - r.top, true);
      }
      function onPu(e) {
        if (S.lp) { api.clearTimeout(S.lp); S.lp = 0; }
        if (S.lpOn) { S.lpOn = false; hideDot(); S.suppressUntil = S.clock + 0.35; S.pd = null; return; }
        if (S.pd) {
          const dx = e.clientX - S.pd.x, dy = e.clientY - S.pd.y;
          S.lastDist = Math.hypot(dx, dy);
          if (S.pd.touch && Math.abs(dx) >= 48 && Math.abs(dx) > 1.5 * Math.abs(dy)) { S.suppressUntil = S.clock + 0.35; if (dx < 0) advance('swipe'); else back(); }
        }
        S.pd = null;
      }
      function onPc() { if (S.lp) { api.clearTimeout(S.lp); S.lp = 0; } S.lpOn = false; S.pd = null; }
      function onPl(e) {
        if (S.lpOn || S.lHeld || (e && e.pointerType === 'touch')) return;
        if (S.laserOn && S.clock - S.dwelled < 20) S.edgeAt = S.clock;
        hideDot();
      }
      function moveDot(dx, dy) { wake(); setDot(S.dotX + dx, S.dotY + dy, true); }
      function blackOn() { return black.classList.contains(C + 'on') && black.classList.contains(C + 'bhint'); }
      function toggleBlack(force) {
        const on = typeof force === 'boolean' ? force : !blackOn();
        if (S.blkT) { api.clearTimeout(S.blkT); S.blkT = 0; }
        if (on && (S.mode === 'ending' || S.mode === 'staplerkeynote')) return;
        cl(black, 'on', on); cl(black, 'bhint', on);
        if (!on) return;
        if (once('blk')) nsay(LBLK, { who: 'Gerald', priority: 1 });
        S.blkT = api.setTimeout(() => { S.blkT = 0; if (blackOn()) { toggleBlack(false); nsay(LBLKB, { who: 'Gerald', priority: 1 }); } }, 8000 * IS);
      }
      api.on(document, 'keydown', (e) => {
        if (S.dead || e.ctrlKey || e.metaKey || e.altKey) return;
        const t = e.target, tag = t && t.tagName ? String(t.tagName) : '';
        if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (t && t.isContentEditable)) return;
        const inBtn = !!(t && t.closest && t.closest('button,a,[role=button]'));
        const k = e.key;
        if (S.lHeld && /^Arrow/.test(k)) { e.preventDefault(); S.lT = S.clock; moveDot(k === 'ArrowRight' ? 8 : k === 'ArrowLeft' ? -8 : 0, k === 'ArrowDown' ? 8 : k === 'ArrowUp' ? -8 : 0); return; }
        if (k === ' ' || k === 'Enter' || k === 'ArrowRight' || k === 'PageDown') {
          if ((k === ' ' || k === 'Enter') && inBtn) return;
          if (k === ' ' || k === 'PageDown') e.preventDefault();
          if (e.repeat) return;
          advance('key');
        } else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') {
          if (k !== 'Backspace' || !inBtn) { e.preventDefault(); if (!e.repeat) back(); }
        } else if (k === 'b' || k === 'B' || k === '.') { toggleBlack(); wake(); }
        else if (k === 'f' || k === 'F') { wake(); const on = !R.classList.contains(C + 'big'); cl(R, 'big', on); if (on && once('f')) nsay(LF, { who: 'Gerald', priority: 1 }); }
        else if (k === 'l' || k === 'L') {
          if (!e.repeat) {
            wake(); S.lHeld = !S.lHeld; S.lT = S.clock;
            if (S.lHeld) { setDot(S.dotX || 40, S.dotY || 40, true); if (once('ldot')) nsay(LDOT, { priority: 1 }); } else hideDot();
          }
        }
        else if (k === 'Escape') { wake(); S.escN++; if (S.escN === 1) nsay(ESC1, { priority: 1 }); else if (S.escN === 5) nsay(ESC5, { who: 'Gerald', priority: 1 }); }
      });
      api.on(window, 'blur', () => { if (S.lHeld) { S.lHeld = false; hideDot(); } });

      /* ---------- characters ---------- */
      function onGerald() {
        wake(); restart(gb, 'wave'); api.sfx('pop'); S.selfN++;
        if (!reduced()) { cl(R, 'dark', true); if (S.darkT) api.clearTimeout(S.darkT); S.darkT = api.setTimeout(() => { S.darkT = 0; cl(R, 'dark', false); }, 1000); }
        dsay(S.selfN === 10 ? LSELF10 : bags.lself.next(), S.selfN === 10 ? 'Management' : 'Gerald', S.selfN === 10);
      }
      function onDennis() {
        wake(); api.sfx('blip'); restart(dennis, 'lean'); S.denN++;
        const pc = S.denN === 1 && api.flag.get('plantClicked');
        api.flag.set('metDennis', true); dsay(pc ? DPC : bags.audn.next(), 'Dennis (Plant)', pc);
      }

      /* ---------- laser dwell ---------- */
      const wordKey = (t) => String(t || '').toLowerCase().replace(/[^a-z0-9']/g, '');
      function fireDwell(key, node) {
        let line = null, who = 'Gerald';
        if (key === 'eyes') line = once('eyes') ? EYE1 : EYE2;
        else if (key === 'stapler') { line = LSTP; who = 'Stapler'; }
        else if (key === 'dennis') { line = LDEN; who = 'Dennis (Plant)'; }
        else if (key === 'ceiling') { line = CEIL; who = 'Management'; }
        else {
          const w = key.slice(5), raw = node ? node.textContent.replace(/[^A-Za-z0-9'\-]/g, '') : w;
          const rk = w.indexOf('leverag') === 0 ? 'leverage' : w;
          line = (Object.prototype.hasOwnProperty.call(RIFF, rk) && RIFF[rk]) || fill(bags.rg.next(), { w: raw || w || 'this' });
          S.words.add(w); if (S.words.size >= 5) api.achieve(ST + 'laser');
          api.stat.inc(ST + 'laser');
        }
        S.dwelled = S.clock;
        dsay(line, who, true);
      }
      function dwellTick() {
        const r = frame.getBoundingClientRect(), cx = r.left + S.dotX, cy = r.top + S.dotY;
        let key = null, node = null;
        const hit = document.elementFromPoint(cx, cy), lz = hit && hit.closest ? hit.closest('[data-lz]') : null;
        if (lz && root.contains(lz)) { node = lz; key = lz.dataset.lz === 'word' ? 'word:' + wordKey(lz.textContent) : lz.dataset.lz; }
        const d = S.dw;
        if (key !== d.key) {
          d.key = key; d.t = 0; d.node = node;
          if (key && key.indexOf('word:') === 0 && key.length > 5) {
            const arr = (S.ent[key] = (S.ent[key] || []).filter((x) => S.clock - x < 10)); arr.push(S.clock);
            if (arr.length >= 4) { S.ent[key] = []; nsay(fill(CIRCLE, { w: node.textContent.replace(/[^A-Za-z0-9'\-]/g, '') }), { who: 'Gerald' }); }
          }
        } else if (key) {
          d.t += 0.1;
          if (d.t >= 1.2 && !((S.cool[key] || 0) > S.clock)) { S.cool[key] = S.clock + 8; fireDwell(key, node); }
        }
        const ge = center(gbody);
        pupils.forEach((p, i) => {
          if (!S.laserOn) { p.style.transform = ''; return; }
          const dx = cx - ge[0], dy = cy - ge[1], m = Math.hypot(dx, dy) || 1;
          p.style.transform = 'translate(' + (dx / m * 3).toFixed(1) + 'px,' + (dy / m * 3).toFixed(1) + 'px)';
        });
      }

      /* ---------- size ---------- */
      function checkSize() {
        const w = root.getBoundingClientRect().width;
        if (!(w > 0)) return;
        const nar = w < 700, tiny = w < 400;
        if (nar !== S.narrow) { S.narrow = nar; cl(R, 'narrow', nar); paintMins(); }
        if (w >= 700) S.wideSeen = true;
        if (tiny !== S.tiny) { S.tiny = tiny; cl(R, 'tiny', tiny); if (tiny && S.wideSeen) api.achieve(ST + 'sticky'); }
        const say = (k, fn) => { if (!S.sizeSaid[k] && S.clock - (S.sizeSaid.last == null ? -99 : S.sizeSaid.last) >= 20) { S.sizeSaid[k] = 1; S.sizeSaid.last = S.clock; fn(); } };
        if (w < 600 && !S.sizeSaid.narrow) say('narrow', () => nsay(LNAR, { priority: 1 }));
        if (tiny && S.wideSeen && !S.sizeSaid.tiny) say('tiny', () => { nsay(LSTK, { who: 'Gerald', priority: 1 }); api.achieve(ST + 'sticky'); });
      }
      api.on(window, 'resize', checkSize);

      /* ---------- the clock, and the late ---------- */
      function lateArrival(sl) {
        S.lateDone = true; S.lateLeave = S.slides + 5; lateFace.textContent = '😐'; lateNm.textContent = 'Ronald (Late)';
        cl(lateEl, 'hide', false); api.sfx('blip');
        at(0.8, () => nsay(fill(LATE[0], { s: sl.label }), { priority: 1 }));
        at(7, () => nsay(LATE[1], { who: 'Gerald', priority: 1 }));
        at(13, () => nsay(LATE[2], { priority: 1 }));
      }
      function lateLeaves() { S.lateLeave = 0; lateFace.textContent = '☕'; lateNm.textContent = 'Cup (Attending)'; nsay(LATE[3], { priority: 1 }); }
      function phoneCall() {
        api.sfx('bell'); at(0.4, () => api.sfx('bell')); at(0.8, () => api.sfx('bell'));
        floatWord('brrring', gb, true); setFace('improv', 1500); api.flag.set(ST + 'mum', true);
        PH.forEach((t, i) => at(i * 6, () => nsay(fill(t, { m: num(S.moved), s: num(S.slides) }), { who: i === 0 || i === 5 ? 'Management' : 'Gerald', priority: i === 0 ? 2 : 1, mood: i === 5 ? 'proud' : 'neutral' })));
      }
      function promotion() {
        S.vp = true; api.achieve(ST + 'promoted'); api.sfx('fanfare'); burst(10, gb);
        nsay(PRO[0], { priority: 2, mood: 'proud' });
        at(6, () => { nsay(fill(PRO[1], { p: api.player.name }), { who: 'Gerald', priority: 1, mood: 'proud' }); lcard.textContent = Array.from(String(api.player.name)).slice(0, 9).join('').toUpperCase() + '\nVP (ACTING)'; api.sfx('tada'); S.stap.forEach((s) => restart(s, 'clap')); });
        at(12, () => nsay(PRO[2], { who: 'Gerald', priority: 1 }));
        at(18, () => nsay(PRO[3], { priority: 1 }));
      }
      const MARKS = [
        [20, () => nsay(MK0, { priority: 1 })], [45, () => nsay(MK1, { priority: 1 })], [90, () => nsay(MK2, { who: 'Gerald', priority: 1 })],
        [180, phoneCall], [300, () => { restart(brenda, 'lean'); nsay(MK5, { priority: 1 }); }], [420, () => { restart(dennis, 'lean'); nsay(MK7, { priority: 1 }); }], [600, promotion]
      ];
      function markTick() {
        if (S.mode !== 'play' || S.idleStage >= 3 || S.busy) return;
        if (S.mk < MARKS.length) { if (S.pt >= MARKS[S.mk][0] * IS) MARKS[S.mk++][1](); return; }
        if (S.pt >= (600 + 300 * (S.annN + 1)) * IS) { S.annN++; nsay(fill(bags.ann.next(), { n: num(10 + 5 * S.annN) }), { priority: 1 }); }
      }

      /* ---------- main loop ---------- */
      function loop(ts) {
        if (S.dead) return;
        api.requestAnimationFrame(loop);
        let dt = 0.016;
        if (isFinite(ts)) { if (S.lastTs != null) dt = clamp((ts - S.lastTs) / 1000, 0, 0.1); S.lastTs = ts; }
        S.clock += dt;
        if (S.tl.length) { const due = S.tl.filter((x) => x.t <= S.clock); if (due.length) { S.tl = S.tl.filter((x) => x.t > S.clock); due.forEach((x) => x.fn()); } }
        if (S.seq) { S.seqT += dt; while (S.seq && S.seq.length && S.seq[0][0] <= S.seqT) S.seq.shift()[1](); }
        if (S.mode !== 'play' && S.clock > S.until + 5) { if (S.mode === 'staplerkeynote' || S.mode === 'ending') restartDeck(); else { cl(frame, 'fiasco', false); enterMode('play', 0); clicker.textContent = 'CLICK'; cl(clicker, 'foam', false); } }
        S.acc += dt; S.sizeT += dt; if (!document.hidden) S.pt += dt;
        markTick();
        if (S.lHeld && S.clock - (S.lT || 0) > 30) { S.lHeld = false; hideDot(); }
        if (S.sizeT >= 0.25) { S.sizeT = 0; checkSize(); }
        const m = S.mode;
        if (m === 'fiasco') {
          S.fiT += dt;
          if (S.fiT >= 1 && S.fiStep < 1) { S.fiStep = 1; gsay("I was not finished being moved.", 'fs2'); }
          if (S.fiT >= 2 && S.fiStep < 2) { S.fiStep = 2; gsay("I was not finished being moved.", 'fs3'); }
          S.fl = (S.fl || 0) + dt;
          if (S.fl >= (reduced() ? 0.4 : 1 / 14)) { S.fl = 0; S.fn = ((S.fn || 0) + 1) % 43; flipT.textContent = S.fn < TB.length ? TB[S.fn] : 'Slide ' + (S.fn - 29); flipN.textContent = 'SLIDE ' + num(S.fn * 7 + 3); }
          if (S.clock >= S.until) endFiasco();
        } else if (m === 'foam') { if (S.clock >= S.until) endFoam(); }
        else if (m === 'play') {
          S.slideT += dt;
          if (S.typing && S.slideT >= S.typeDelay) {
            S.typedN += 35 * dt;
            const k = Math.min(S.sent.length, Math.floor(S.typedN));
            if (k !== S.shownN) { S.shownN = k; bubble.textContent = S.sent.slice(0, k); }
            if (k >= S.sent.length) { S.typing = false; S.sentDone = true; sr.textContent = S.sent; api.award(0.1, 'sentence'); }
          }
          paintRing(false);
          const sl = S.slide;
          if (sl.kind === 'half' && !S.clapDone && S.slideT >= S.L && !S.busy) doClap();
          if (!document.hidden && !S.busy && sl.kind !== 'tuesday') { S.quiet += dt; idleTick(); }
          if (S.clock >= S.nextMg && S.idleStage < 3) { S.nextMg = S.clock + 17 + rnd() * 11; if (S.quiet > 0 || true) { const l = bags.mg.next(); if (l === '*') nsay('Audience satisfaction currently sits at ' + ratingOf() + '.', { priority: 0 }); else nsay(l, { priority: 0 }); } }
          if (S.acc >= 0.1) {
            S.acc = 0;
            if (S.laserOn) dwellTick();
            if (S.edgeAt > 0 && S.clock - S.edgeAt >= 2) { S.edgeAt = -1; S.dwelled = -99; nsay(EDGE, { who: 'Gerald' }); }
          }
        }
      }

      /* ---------- start ---------- */
      function saveObj() { return { decks: Math.max(sv.decks | 0, S.deckNo - 1), lifetimeSlides: S.life, lifetimeMoved: S.lifeM, spudJr: !!(S.spud || sv.spudJr) }; }
      S.deck = buildDeck(1);
      S.nextMg = 15 + rnd() * 8;
      if (frag0) { S.minN = 0; S.mins = ['0. ' + String(frag0).slice(0, 40) + '--  | Item cut short. Item moved.']; }
      setStaplers(1); paintMins(); paintPlacard(); paintBat();
      present(S.deck[0], { noTrans: true });
      api.flag.set('metGerald', true); api.flag.set(ST + 'presented', true);
      S.first = false;
      checkSize();
      at(0.1, () => nsay("You are the clicker. Click when Gerald is ready. Gerald will indicate readiness by breathing.", { priority: 2 }));
      at(0.4, () => { api.sfx('honk'); gsay('Synergy, Roughly.', '', true); });
      at(4, () => { nsay(S.life > 0 ? "Welcome back. The deck has been kept warm. It has opinions about that." : "Today's keynote is mandatory. Attendance is optional. Interest is being tracked by a committee of one.", { priority: 1 }); if (sv.spudJr) nsay(SPJRB, { priority: 1 }); });
      if (!metBefore) at(8.5, () => nsay("Gerald has not met you, which is a standard of intimacy we are aiming for.", { priority: 1 }));
      api.requestAnimationFrame(loop);
      api.setInterval(() => api.save.set('state', saveObj()), 10000);

      return {
        destroy() {
          S.dead = true;
          api.save.set('state', saveObj());
          if (S.typing && S.shownN > 5 && S.shownN < S.sent.length) api.save.set('frag', S.sent.slice(0, S.shownN)); else api.save.set('frag', '');
        }
      };
    }
  });
})();
