/* POINTLESS module: potato-interview */
(function () {
  'use strict';
  const P = window.POINTLESS; const K = 'm-potato-interview-';
  const SN = 'potato-interview.';

  P.injectCSS(`
.m-potato-interview-root{--pi-paper:#fff6e0;--pi-wall:#fbf1dc;--pi-felt:#8fd3b6;--pi-wood:#c68b59;--pi-wood-d:#8a5a34;--pi-board:#6b4a2b;--pi-manila:#f1dfa7;--pi-ink:#2a1d12;--pi-mustard:#e6b422;--pi-coral:#f07f6e;--pi-lilac:#bda7e0;--pi-mint:#a8dcc0;--pi-russet:#a47148;--pi-spot:#6b4423;--pi-sweet:#e58b3a;--pi-stamp-green:#2f9e6e;--pi-stamp-red:#c8433b;position:relative;container-type:inline-size;min-height:420px;padding:10px;background:var(--pi-paper);color:var(--pi-ink);font:14px/1.35 system-ui,"Segoe UI",Roboto,sans-serif}
.m-potato-interview-root *{box-sizing:border-box}
.m-potato-interview-root :where(button){font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
.m-potato-interview-root button:focus-visible,.m-potato-interview-root input:focus-visible{outline:3px solid #5b3fd0;outline-offset:2px}
.m-potato-interview-wrp{display:flex;flex-direction:column;gap:10px}
.m-potato-interview-wall{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:6px 10px;background:var(--pi-mint);border:3px solid var(--pi-ink);border-radius:10px;min-height:44px}
.m-potato-interview-wl{font-weight:900;font-size:11px;letter-spacing:.08em}
.m-potato-interview-wrow{display:flex;gap:5px;flex-wrap:wrap;align-items:center;font-size:12px;font-weight:700}
.m-potato-interview-wb{display:inline-flex;flex-direction:column;align-items:center;gap:1px;background:none;border:0;padding:0;font-size:20px;line-height:1}
.m-potato-interview-wb i{display:block;width:22px;height:3px;border-radius:2px;background:var(--c,#e6b422)}
.m-potato-interview-wb.m-potato-interview-hop{animation:m-potato-interview-hop .5s ease both;animation-delay:var(--d,0s)}
.m-potato-interview-main{display:grid;grid-template-columns:58fr 42fr;gap:12px;align-items:start}
.m-potato-interview-stage{position:relative;display:flex;flex-direction:column;border:3px solid var(--pi-ink);border-radius:14px;box-shadow:4px 4px 0 var(--pi-ink);background:linear-gradient(var(--pi-wall) 0 64%,var(--pi-wood) 64% 100%);overflow:hidden;min-width:0}
.m-potato-interview-stage.m-potato-interview-shake{animation:m-potato-interview-shake .16s linear}
.m-potato-interview-top{display:flex;align-items:flex-start;gap:8px;padding:8px}
.m-potato-interview-poster{background:var(--pi-lilac);border:3px solid var(--pi-ink);padding:5px 8px;transform:rotate(-2deg);font-size:11px;max-width:118px;line-height:1.2;box-shadow:2px 2px 0 var(--pi-ink)}
.m-potato-interview-poster b{display:block}
.m-potato-interview-clock{width:36px;height:36px;border:3px solid var(--pi-ink);border-radius:50%;background:#fff;position:relative;flex:none;margin-top:4px;padding:0;cursor:pointer}
.m-potato-interview-clock i{position:absolute;left:50%;bottom:50%;width:2px;margin-left:-1px;background:var(--pi-ink);transform-origin:50% 100%}
.m-potato-interview-clock i:first-child{height:8px;transform:rotate(128deg)}
.m-potato-interview-clock i:last-child{height:12px;transform:rotate(102deg)}
.m-potato-interview-doorbox{display:flex;flex-direction:column;align-items:flex-end;gap:2px;min-width:0;margin-left:auto}
.m-potato-interview-dl{font-size:9px;font-weight:900;letter-spacing:.05em}
.m-potato-interview-door{width:172px;min-height:92px;padding:6px;background:var(--pi-wood-d);border:3px solid var(--pi-ink);border-radius:10px 10px 0 0;display:flex;flex-direction:column;align-items:center;gap:4px}
.m-potato-interview-peep{width:18px;height:18px;border-radius:50%;background:#fff;border:2px solid var(--pi-ink);display:grid;place-items:center}
.m-potato-interview-peep i{width:8px;height:8px;border-radius:50%;background:var(--pi-ink);animation:m-potato-interview-blink 7.5s infinite}
.m-potato-interview-sign{background:var(--pi-paper);color:var(--pi-ink);border:2px solid var(--pi-ink);padding:3px 4px;font-size:10px;line-height:1.15;text-align:center;width:100%}
.m-potato-interview-sign s{display:block;opacity:.55;font-size:9px}
.m-potato-interview-sign b{display:block}
.m-potato-interview-mid{position:relative;height:232px;margin-top:auto;cursor:crosshair;touch-action:pan-y;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.m-potato-interview-gauge{position:absolute;left:10px;top:6px;bottom:6px;width:22px;border:3px solid var(--pi-ink);border-radius:12px;background:#fff;overflow:hidden;display:flex;align-items:flex-end}
.m-potato-interview-gauge i{display:block;width:100%;height:0;background:var(--pi-coral)}
.m-potato-interview-gauge u{position:absolute;left:0;right:0;border-top:2px solid var(--pi-ink);font-size:9px;font-weight:700;line-height:1;text-decoration:none}
.m-potato-interview-gauge.m-potato-interview-pulse{animation:m-potato-interview-pulse .3s ease 2}
.m-potato-interview-chair b{position:absolute;display:block;left:50%;background:var(--pi-wood-d);border:3px solid var(--pi-ink)}
.m-potato-interview-cback{width:136px;height:150px;margin-left:-68px;bottom:50px;border-radius:26px 26px 6px 6px}
.m-potato-interview-cseat{width:178px;height:22px;margin-left:-89px;bottom:34px;border-radius:8px}
.m-potato-interview-leg{width:12px;height:36px;bottom:0;margin-left:-66px}
.m-potato-interview-leg+.m-potato-interview-leg{margin-left:54px}
.m-potato-interview-cand{position:absolute;left:50%;bottom:44px;width:var(--cw,140px);margin-left:calc(var(--cw,140px)/-2);z-index:2;--px:0px;--py:0px}
.m-potato-interview-cand.m-potato-interview-in{animation:m-potato-interview-roll .6s ease-out backwards}
.m-potato-interview-cand.m-potato-interview-leave{animation:m-potato-interview-leave .7s ease-in both}
.m-potato-interview-cand svg{display:block;width:100%;height:auto;overflow:visible}
.m-potato-interview-pup{transform:translate(var(--px),var(--py))}
.m-potato-interview-spot{cursor:pointer}
.m-potato-interview-spot.m-potato-interview-blinked{animation:m-potato-interview-pop .35s ease}
.m-potato-interview-mouth{position:absolute;left:50%;top:63%;width:30px;height:13px;margin-left:-15px;border:3px solid var(--pi-ink);border-top:0;border-radius:0 0 30px 30px;transition:all .15s;pointer-events:none}
.m-potato-interview-mouth[data-m="line"]{height:0;border-radius:0;border-top:3px solid var(--pi-ink);border-bottom:0}
.m-potato-interview-mouth[data-m="o"]{width:15px;height:17px;margin-left:-8px;border:3px solid var(--pi-ink);border-radius:50%;background:#5a2a1a}
.m-potato-interview-mouth[data-m="sweat"]{animation:m-potato-interview-wob .3s infinite;height:0;border-radius:0;border-top:3px solid var(--pi-ink);border-bottom:0}
.m-potato-interview-sw{position:absolute;top:18%;width:9px;height:13px;border-radius:50% 50% 50% 50%/65% 65% 35% 35%;background:#7ec8e8;border:2px solid var(--pi-ink);display:none}
.m-potato-interview-sw1{left:8%}.m-potato-interview-sw2{right:8%;top:30%}.m-potato-interview-sw3{left:44%;top:6%}
.m-potato-interview-sweat .m-potato-interview-sw{display:block;animation:m-potato-interview-sweatfall 1s linear infinite}
.m-potato-interview-lan{position:absolute;left:50%;top:60%;width:92px;height:66px;margin-left:-46px;z-index:3;pointer-events:none}
.m-potato-interview-lan i{position:absolute;inset:0 0 6px;background:var(--pi-mustard);clip-path:polygon(0 0,15% 0,50% 80%,85% 0,100% 0,56% 100%,44% 100%)}
.m-potato-interview-lan b{position:absolute;left:50%;bottom:-8px;margin-left:-27px;width:54px;background:#fff;border:2px solid var(--pi-ink);font-size:9px;line-height:1.5;text-align:center}
.m-potato-interview-lan.m-potato-interview-off{display:none}
.m-potato-interview-lan.m-potato-interview-drop{animation:m-potato-interview-drop .7s cubic-bezier(.2,1.6,.4,1) both}
.m-potato-interview-lan.m-potato-interview-rise{animation:m-potato-interview-rise .5s ease-out both}
.m-potato-interview-tie{position:absolute;left:50%;top:75%;width:20px;height:28px;margin-left:-10px;background:#a33;clip-path:polygon(25% 0,75% 0,60% 30%,100% 100%,50% 85%,0 100%,40% 30%)}
.m-potato-interview-deco{position:absolute;pointer-events:none;font-size:42px;line-height:1}
.m-potato-interview-coat{left:50%;bottom:-6px;margin-left:-26px;font-size:64px}.m-potato-interview-hat{left:50%;top:-26px;margin-left:-22px;font-size:46px}.m-potato-interview-helm{left:50%;top:-22px;margin-left:-20px;font-size:38px}
.m-potato-interview-plus{right:-34px;bottom:0;width:56px}
.m-potato-interview-zzz{position:absolute;right:6px;top:-4px;font-weight:900;font-size:18px;display:none;color:#6a5aa0}
.m-potato-interview-asleep .m-potato-interview-zzz{display:block;animation:m-potato-interview-zzz 2.4s linear infinite}
.m-potato-interview-asleep .m-potato-interview-zzz:nth-of-type(2){animation-delay:.8s}.m-potato-interview-asleep .m-potato-interview-zzz:nth-of-type(3){animation-delay:1.6s}
.m-potato-interview-asleep .m-potato-interview-pup{display:none}
.m-potato-interview-asleep ellipse[data-eye]{transform:scaleY(.1);transform-origin:center;transform-box:fill-box}
.m-potato-interview-sprouts{position:absolute;left:0;right:0;top:-18px;height:30px;pointer-events:none}
.m-potato-interview-sprouts i{position:absolute;bottom:0;width:3px;height:22px;background:#4a8f3c;border-radius:2px;transform-origin:50% 100%;animation:m-potato-interview-grow .8s ease-out both}
.m-potato-interview-wink ellipse[data-eye="L"]{animation:m-potato-interview-wink .6s ease}
.m-potato-interview-lock ellipse[data-eye]{transform:scale(1.25);transform-origin:center;transform-box:fill-box}
.m-potato-interview-lock .m-potato-interview-pup{transform:none}
.m-potato-interview-squish svg{transform:scaleX(.8)}
.m-potato-interview-cand.m-potato-interview-concert{animation:m-potato-interview-concert .33s ease-in-out 6}
.m-potato-interview-cand.m-potato-interview-lean{transform:rotate(7deg) translateY(-6px)}
.m-potato-interview-cand.m-potato-interview-melt{animation:m-potato-interview-melt 1.2s ease-in both}
.m-potato-interview-cand.m-potato-interview-bow{animation:m-potato-interview-bow 2s ease both}
.m-potato-interview-part{background:none;border:0;padding:0;width:50%;position:relative;display:block}
.m-potato-interview-parts{display:flex;align-items:flex-end}
.m-potato-interview-part[aria-pressed="true"]{filter:drop-shadow(0 0 5px var(--pi-mustard))}
.m-potato-interview-toaster{position:relative;width:130px;height:84px;margin:36px auto 0;background:#cfd3d8;border:3px solid var(--pi-ink);border-radius:18px;text-align:center}
.m-potato-interview-toaster b{position:absolute;top:8px;width:46px;height:10px;background:var(--pi-ink);border-radius:5px;left:12px}.m-potato-interview-toaster b+b{left:72px}
.m-potato-interview-toaster em{position:absolute;bottom:6px;left:0;right:0;font-size:9px;font-weight:900;font-style:normal;letter-spacing:.08em}
.m-potato-interview-toast{position:absolute;left:50%;top:-30px;margin-left:-14px;font-size:32px;animation:m-potato-interview-toast 3s ease-in-out infinite}
.m-potato-interview-eject .m-potato-interview-toast{animation:m-potato-interview-eject 1.2s ease-in both}
.m-potato-interview-leaf{transform-origin:100px 110px;animation:m-potato-interview-sway 3.4s ease-in-out infinite}
.m-potato-interview-slip{position:absolute;left:50%;bottom:150px;max-width:156px;margin-left:-78px;transform:rotate(-3deg);background:#fff;border:2px solid var(--pi-ink);padding:3px 6px;font-size:10px;font-weight:700;opacity:0;pointer-events:none;z-index:6;text-align:center}
.m-potato-interview-slip.m-potato-interview-on{animation:m-potato-interview-slip 1.2s ease both}
.m-potato-interview-verdict{position:absolute;left:50%;top:34%;transform:translate(-50%,-50%) rotate(var(--rot,-4deg));z-index:7;border:4px dashed var(--pi-stamp-red);color:var(--pi-stamp-red);background:rgba(255,246,224,.55);padding:6px 14px;text-align:center;font-weight:900;letter-spacing:.06em;mix-blend-mode:multiply;display:none;pointer-events:none;line-height:1.1}
.m-potato-interview-verdict b{display:block;font-size:30px}.m-potato-interview-verdict span{display:block;font-size:12px}.m-potato-interview-verdict small{display:block;font-size:11px}.m-potato-interview-verdict em{display:block;font-size:6px;font-style:normal}
.m-potato-interview-verdict.m-potato-interview-on{display:block;animation:m-potato-interview-slam .16s ease-out both}
.m-potato-interview-enough{position:absolute;left:50%;top:44%;z-index:8;transform:translate(-50%,-50%) rotate(-8deg);font-size:46px;font-weight:900;color:#fff;background:var(--pi-coral);border:5px solid var(--pi-ink);padding:2px 14px;display:none;pointer-events:none}
.m-potato-interview-enough.m-potato-interview-on{display:block;animation:m-potato-interview-slam .2s ease-out both}
.m-potato-interview-badge{position:absolute;right:8px;bottom:8px;z-index:5;transform:scale(var(--bs,1));transform-origin:100% 100%;background:#fff;border:3px solid var(--pi-ink);border-top:4px dashed var(--pi-ink);padding:6px 8px;text-align:center;font-size:10px;font-weight:900;line-height:1.2;display:none;max-width:130px}
.m-potato-interview-badge.m-potato-interview-on{display:block;animation:m-potato-interview-pop .4s ease both}
.m-potato-interview-badge b{display:block;font-size:12px}.m-potato-interview-badge span{display:block}.m-potato-interview-badge i{display:block;font-size:8px;font-style:normal;opacity:.7}
.m-potato-interview-tag{position:absolute;left:50%;bottom:6px;margin-left:56px;z-index:4;transform:rotate(5deg);background:#fff;border:2px solid var(--pi-ink);border-radius:6px;padding:2px 6px;font-size:9px;font-weight:800;line-height:1.1;max-width:84px;text-align:center}
.m-potato-interview-tag i{display:block;font-style:normal;color:#c33;font-size:7px}
.m-potato-interview-tag::before{content:"";position:absolute;left:-4px;top:4px;width:9px;height:3px;background:#aaa;border:1px solid var(--pi-ink);transform:rotate(-20deg)}
.m-potato-interview-dennis{position:absolute;left:44px;bottom:6px;width:44px;height:64px;pointer-events:none}
.m-potato-interview-dennis i{position:absolute;bottom:22px;width:12px;height:30px;background:#4a9a4c;border:2px solid var(--pi-ink);border-radius:60% 40% 60% 40%;transform-origin:50% 100%}
.m-potato-interview-dennis i:nth-child(1){left:6px;transform:rotate(-30deg)}.m-potato-interview-dennis i:nth-child(2){left:16px;height:38px}.m-potato-interview-dennis i:nth-child(3){left:26px;transform:rotate(28deg)}
.m-potato-interview-dennis.m-potato-interview-wig i:nth-child(2){animation:m-potato-interview-wig .6s ease 3}
.m-potato-interview-dennis u{position:absolute;bottom:0;left:6px;width:32px;height:26px;background:#c4683e;border:2px solid var(--pi-ink);clip-path:polygon(0 0,100% 0,85% 100%,15% 100%);text-decoration:none}
.m-potato-interview-dennis em{position:absolute;left:19px;bottom:6px;width:7px;height:14px;background:#a33;clip-path:polygon(25% 0,75% 0,60% 30%,100% 100%,50% 85%,0 100%,40% 30%);display:none}
.m-potato-interview-dennis.m-potato-interview-tied em{display:block}
.m-potato-interview-hatch{position:absolute;left:50%;bottom:0;width:90px;height:12px;margin-left:-45px;background:#2a1d12;border-radius:6px;display:none;z-index:1}
.m-potato-interview-hatch.m-potato-interview-on{display:block}
.m-potato-interview-sec{position:absolute;right:10px;bottom:60px;font-size:30px;z-index:9;display:none}
.m-potato-interview-sec.m-potato-interview-on{display:block;animation:m-potato-interview-pop .3s ease both}
.m-potato-interview-evt{position:absolute;right:14px;top:34%;z-index:9;width:70px;height:70px;padding:0;font-size:40px;line-height:1;background:#fff;border:3px solid var(--pi-ink);border-radius:50%;box-shadow:3px 3px 0 var(--pi-ink);animation:m-potato-interview-pop .3s ease both}
.m-potato-interview-evt[hidden]{display:none}
.m-potato-interview-evt.m-potato-interview-ringing{animation:m-potato-interview-ringer .5s ease infinite}
.m-potato-interview-bubble{position:relative;margin:2px 10px 8px;padding:8px 12px;min-height:66px;background:#fff;border:3px solid var(--pi-ink);border-radius:14px;box-shadow:3px 3px 0 var(--pi-ink);font-weight:600;cursor:pointer;z-index:3}
.m-potato-interview-bubble b{display:block;font-size:10px;letter-spacing:.06em;color:var(--pi-wood-d);text-transform:uppercase}.m-potato-interview-bubble em{display:block;margin-top:3px;font:italic 600 11px/1.3 "Segoe Script","Comic Sans MS",cursive;color:#5b3fd0;animation:m-potato-interview-pop .4s ease 1s both}.m-potato-interview-bubble em:empty{display:none}
.m-potato-interview-bubble::before{content:"";position:absolute;left:50%;top:-12px;width:16px;height:16px;background:#fff;border-left:3px solid var(--pi-ink);border-top:3px solid var(--pi-ink);transform:rotate(45deg);margin-left:-8px}
.m-potato-interview-log{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.m-potato-interview-srow{display:flex;align-items:center;gap:10px;padding:0 10px 10px}
.m-potato-interview-stare{background:var(--pi-mustard);border:3px solid var(--pi-ink);border-radius:12px;padding:10px 18px;font-weight:900;letter-spacing:.06em;box-shadow:3px 3px 0 var(--pi-ink);min-height:44px;user-select:none;-webkit-user-select:none}
.m-potato-interview-stare.m-potato-interview-pulse{animation:m-potato-interview-pulse 1s ease infinite}
.m-potato-interview-still .m-potato-interview-stare{transform:translate(3px,3px);box-shadow:0 0 0 var(--pi-ink);background:var(--pi-coral)}
.m-potato-interview-hint{font-size:11px;opacity:.8}
.m-potato-interview-board{position:relative;background:var(--pi-board);border:3px solid var(--pi-ink);border-radius:12px;box-shadow:4px 4px 0 var(--pi-ink);padding:22px 10px 10px;min-width:0}
.m-potato-interview-clip{position:absolute;top:-6px;left:50%;width:76px;height:28px;margin-left:-38px;background:linear-gradient(#e4e6e9,#a9adb3);clip-path:polygon(0 30%,10% 0,90% 0,100% 30%,92% 100%,8% 100%);z-index:3}
.m-potato-interview-paper{position:relative;background:var(--pi-manila) repeating-linear-gradient(transparent 0 21px,rgba(60,90,170,.18) 21px 22px);border:2px solid var(--pi-ink);padding:10px;display:flex;flex-direction:column;gap:8px;min-height:400px;overflow:hidden}
.m-potato-interview-fh{margin:0;font-size:12px;letter-spacing:.04em;line-height:1.2;position:relative;z-index:1}
.m-potato-interview-rings{position:absolute;inset:0;pointer-events:none;z-index:0}
.m-potato-interview-ring{position:absolute;width:46px;height:46px;margin:-23px 0 0 -23px;border:6px solid rgba(110,70,30,.35);border-radius:50%;box-shadow:inset 0 0 0 2px rgba(110,70,30,.25);font:italic 700 10px/34px "Segoe Script","Comic Sans MS",cursive;text-align:center;color:rgba(90,55,20,.7);white-space:nowrap}
.m-potato-interview-ring.m-potato-interview-cap{width:70px;height:46px;margin-left:-35px;border-radius:50%}
.m-potato-interview-ringtext{position:absolute;left:0;right:0;bottom:6px;text-align:center;font:italic 900 20px "Segoe Script","Comic Sans MS",cursive;color:rgba(110,70,30,.55);pointer-events:none}
.m-potato-interview-qs{display:flex;flex-direction:column;gap:7px;position:relative;z-index:1}
.m-potato-interview-card{position:relative;text-align:left;background:#fff;border:2px solid var(--pi-ink);border-radius:6px;padding:7px 8px 7px 32px;box-shadow:2px 2px 0 var(--pi-ink);font-weight:700;min-height:46px;transform:rotate(var(--r,0deg));line-height:1.25}
.m-potato-interview-card:hover{background:#fffbea}
.m-potato-interview-card kbd{position:absolute;left:6px;top:7px;background:var(--pi-mustard);border:2px solid var(--pi-ink);border-radius:4px;font:700 11px/1 monospace;padding:2px 5px}
.m-potato-interview-card.m-potato-interview-tear{animation:m-potato-interview-tear .35s ease-in forwards;pointer-events:none}
.m-potato-interview-card.m-potato-interview-ckd{background:#eaffee}.m-potato-interview-card.m-potato-interview-ckd::after{content:"\\2713";position:absolute;right:8px;top:6px;color:var(--pi-stamp-green);font-size:20px}
.m-potato-interview-card.m-potato-interview-gcard{font:italic 700 17px/1.3 "Segoe Script","Comic Sans MS",cursive;background:#fffdf0;padding:14px 12px 14px 32px;animation:m-potato-interview-pulse 1.2s infinite}
.m-potato-interview-card.m-potato-interview-eyec{background:#fff3a3;border-color:#7a5fb0}
.m-potato-interview-q0{position:relative;z-index:1}
.m-potato-interview-q0 button{background:#e6f7e0;border:2px dashed #4a8f3c;border-radius:6px;padding:6px 8px;font-weight:700;margin-right:6px}
.m-potato-interview-sprout .m-potato-interview-card{animation:m-potato-interview-w1 5s ease-in-out infinite}
.m-potato-interview-sprout .m-potato-interview-card:nth-child(2){animation-name:m-potato-interview-w2;animation-duration:6s}
.m-potato-interview-sprout .m-potato-interview-card:nth-child(3){animation-name:m-potato-interview-w3;animation-duration:4.5s}
.m-potato-interview-sprout .m-potato-interview-card::before{content:"";position:absolute;right:30px;top:-4px;width:6px;height:6px;border-radius:50%;background:var(--pi-ink);box-shadow:10px 0 0 var(--pi-ink)}
.m-potato-interview-sprout .m-potato-interview-card::after{content:"";position:absolute;left:50%;bottom:-9px;width:2px;height:10px;background:#4a8f3c;transform:rotate(12deg)}
.m-potato-interview-still .m-potato-interview-card,.m-potato-interview-sprout .m-potato-interview-card:hover,.m-potato-interview-sprout .m-potato-interview-card:focus-visible,.m-potato-interview-sprout .m-potato-interview-card:active{animation-play-state:paused}
.m-potato-interview-sprout .m-potato-interview-card.m-potato-interview-tear,.m-potato-interview-cover.m-potato-interview-tear{animation:m-potato-interview-tear .35s ease-in forwards;pointer-events:none}
.m-potato-interview-margin{font:italic 12px/1.3 "Segoe Script","Comic Sans MS",cursive;color:#5b3fd0;min-height:0;position:relative;z-index:1}
.m-potato-interview-qual{font-size:11px;font-weight:900;color:var(--pi-stamp-green);border:2px solid var(--pi-stamp-green);padding:2px 6px;align-self:flex-start;transform:rotate(-2deg);position:relative;z-index:1;display:none}
.m-potato-interview-qual.m-potato-interview-on{display:block;animation:m-potato-interview-thud .2s ease-out both}
.m-potato-interview-eval{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;position:relative;z-index:1}
.m-potato-interview-ev{position:relative;overflow:hidden;background:#fff;border:2px solid var(--pi-ink);border-radius:6px;padding:6px 4px;font-weight:800;font-size:12px;opacity:.6;min-height:42px;line-height:1.15}
.m-potato-interview-ev kbd{display:block;font:700 9px monospace;opacity:.7}
.m-potato-interview-lit .m-potato-interview-ev{opacity:1}
.m-potato-interview-ev.m-potato-interview-done{background:var(--pi-mint);opacity:1}
.m-potato-interview-ink{position:absolute;right:3px;top:2px;width:20px;height:20px;border-radius:50% 40% 60% 50%;background:var(--pi-stamp-green);opacity:0;transform:scale(0)}
.m-potato-interview-ev.m-potato-interview-done .m-potato-interview-ink{opacity:.8;transform:scale(1);transition:transform .15s}
.m-potato-interview-nobox{grid-column:1/-1;justify-self:end;font-size:6px;line-height:1;padding:1px 3px;border:1px solid var(--pi-ink);background:none;opacity:.4;min-height:0}
.m-potato-interview-rub{background:#fffbe0;border:2px solid var(--pi-ink);padding:6px 8px;position:relative;z-index:1;font-size:12px;font-weight:700}
.m-potato-interview-rub[hidden],.m-potato-interview-panelrow[hidden],.m-potato-interview-ov[hidden]{display:none}
.m-potato-interview-rub input{width:100%;margin:4px 0}
.m-potato-interview-total{font-weight:900}
.m-potato-interview-panelrow{position:relative;z-index:1;font-size:12px;font-weight:800}
.m-potato-interview-panelrow button{border:2px solid var(--pi-ink);border-radius:6px;background:#fff;padding:4px 8px;margin-left:4px}
.m-potato-interview-panelrow button[aria-pressed="true"]{background:var(--pi-mustard)}
.m-potato-interview-decide{display:grid;grid-template-columns:1fr 1fr;gap:8px;position:relative;z-index:1}
.m-potato-interview-bt{border:3px solid var(--pi-ink);border-radius:10px;padding:10px 6px;font-weight:900;box-shadow:3px 3px 0 var(--pi-ink);min-height:48px}
.m-potato-interview-bt kbd{font:700 9px monospace;margin-left:4px;opacity:.7}
.m-potato-interview-hire{background:var(--pi-felt)}.m-potato-interview-nohire{background:var(--pi-coral)}
.m-potato-interview-think{grid-column:1/-1;background:var(--pi-lilac);position:relative;overflow:hidden;opacity:.85;user-select:none;-webkit-user-select:none}
.m-potato-interview-think::before{content:"";position:absolute;inset:0;background:rgba(255,255,255,.6);transform-origin:left;transform:scaleX(var(--tp,0))}
.m-potato-interview-think span{position:relative;display:inline-block}
.m-potato-interview-hg{animation:m-potato-interview-spin 2.4s linear infinite}
.m-potato-interview-decide.m-potato-interview-pulse .m-potato-interview-hire,.m-potato-interview-decide.m-potato-interview-pulse .m-potato-interview-nohire{animation:m-potato-interview-pulse 1.1s ease infinite}
.m-potato-interview-stickies{position:relative;z-index:2;display:flex;flex-wrap:wrap;gap:8px;pointer-events:none}
.m-potato-interview-sticky{flex:1 1 42%;min-width:120px;padding:6px 7px;background:#fff3a3;border:2px solid #7a5fb0;font:italic 11px/1.25 "Segoe Script","Comic Sans MS",cursive;transform:rotate(var(--tr,4deg));box-shadow:2px 2px 0 rgba(0,0,0,.25);animation:m-potato-interview-pop .35s ease both}
.m-potato-interview-sticky.m-potato-interview-fall{animation:m-potato-interview-fall .9s ease-in forwards}
.m-potato-interview-resume{display:flex;background:#fff;border:3px solid var(--pi-ink);border-radius:10px;box-shadow:4px 4px 0 var(--pi-ink);overflow:hidden}
.m-potato-interview-holes{width:24px;flex:none;background:radial-gradient(circle,var(--pi-ink) 3px,transparent 4px) 0 0/24px 24px repeat-y,var(--pi-mint);border-right:2px solid var(--pi-ink)}
.m-potato-interview-rbody{flex:1;min-width:0;padding:8px 12px;background:repeating-linear-gradient(transparent 0 20px,rgba(60,90,170,.15) 20px 21px)}
.m-potato-interview-rhead{display:flex;justify-content:space-between;align-items:center;font-size:11px;letter-spacing:.08em}
.m-potato-interview-rt{border:2px solid var(--pi-ink);border-radius:6px;background:var(--pi-mustard);font-weight:900;padding:0 8px;min-height:26px}
.m-potato-interview-rlist{list-style:none;margin:4px 0;padding:0;font-size:13px}
.m-potato-interview-rlist li{line-height:21px;overflow:hidden;animation:m-potato-interview-unroll .35s ease both}
.m-potato-interview-fine{position:relative;margin-top:6px;border-top:2px dashed var(--pi-ink);padding-top:4px;cursor:zoom-in}
.m-potato-interview-fb,.m-potato-interview-fz{font-size:9px;line-height:1.25}
.m-potato-interview-fb div,.m-potato-interview-fz div{margin-bottom:2px}
.m-potato-interview-fb{color:rgba(42,29,18,.17)}.m-potato-interview-fb .m-potato-interview-seen{color:rgba(42,29,18,.34)}
.m-potato-interview-fz{position:absolute;left:0;right:0;top:4px;color:var(--pi-ink);font-weight:700;background:#fff2b8;clip-path:circle(var(--lr,38px) at var(--lx,-200px) var(--ly,-200px));pointer-events:none}
.m-potato-interview-strip{display:flex;flex-wrap:wrap;gap:8px;align-items:stretch}
.m-potato-interview-strip>*{background:#fff;border:2px solid var(--pi-ink);border-radius:8px;padding:6px 8px;font-size:11px;font-weight:800;text-align:left;line-height:1.25}
.m-potato-interview-strip b{display:block;font-size:13px}
.m-potato-interview-vslot{border-style:dashed!important;color:var(--pi-stamp-red)}
.m-potato-interview-vslot.m-potato-interview-on{animation:m-potato-interview-thud .16s ease-out}
.m-potato-interview-bar{height:10px;border:2px solid var(--pi-ink);border-radius:6px;background:#eee;overflow:hidden;margin-top:4px;min-width:90px}
.m-potato-interview-bar i{display:block;height:100%;background:var(--pi-felt);transition:width .6s}
.m-potato-interview-ov{position:absolute;inset:0;z-index:30;display:flex;align-items:flex-start;justify-content:center;padding:70px 12px 12px;background:rgba(42,29,18,.55)}
.m-potato-interview-ov.m-potato-interview-mini{background:transparent;justify-content:flex-end;pointer-events:none}
.m-potato-interview-mini .m-potato-interview-fan{transform:scale(.62);transform-origin:top right;pointer-events:auto}
.m-potato-interview-letter{position:relative;max-width:420px;width:100%;background:#fffdf3;border:3px solid var(--pi-ink);box-shadow:5px 5px 0 var(--pi-ink);padding:16px 16px 12px;text-align:center;animation:m-potato-interview-pop .35s ease both}
.m-potato-interview-letter p{margin:6px 0}
.m-potato-interview-seal{width:54px;height:54px;border-radius:50%;margin:6px auto;background:conic-gradient(#e6b422,#fff2a0,#c28f12,#fff2a0,#e6b422);border:2px solid #8a6a10}
.m-potato-interview-legal{font-size:6px;line-height:1.2;opacity:.8}
.m-potato-interview-big{background:var(--pi-felt);border:3px solid var(--pi-ink);border-radius:12px;padding:12px 28px;font-weight:900;font-size:18px;box-shadow:3px 3px 0 var(--pi-ink);margin-top:8px}
.m-potato-interview-flip,.m-potato-interview-mut{max-width:440px;width:100%;background:#fffdf3;border:3px solid var(--pi-ink);box-shadow:5px 5px 0 var(--pi-ink);padding:14px;text-align:center}
.m-potato-interview-sock{font-size:96px;line-height:1.1}
.m-potato-interview-fopts{display:flex;flex-direction:column;gap:6px;margin-top:8px}
.m-potato-interview-fopt{background:#fff;border:2px solid var(--pi-ink);border-radius:8px;padding:8px;font-weight:700;text-align:left}
.m-potato-interview-flick{animation:m-potato-interview-flick .5s steps(2) 4}
.m-potato-interview-fan{max-width:520px;width:100%;background:#fffdf3;border:3px solid var(--pi-ink);box-shadow:5px 5px 0 var(--pi-ink);padding:14px;text-align:center}
.m-potato-interview-fan h3{margin:0;font-size:22px}
.m-potato-interview-cert{border:6px double var(--pi-mustard);padding:10px;margin:10px 0;background:#fffbe6;animation:m-potato-interview-cert 5s ease both}
.m-potato-interview-crawl{font-weight:800;color:#5b3fd0;min-height:20px}
@keyframes m-potato-interview-hop{0%,100%{transform:none}40%{transform:translateY(-12px)}}@keyframes m-potato-interview-shake{0%,100%{transform:none}25%{transform:translate(-4px,2px)}75%{transform:translate(4px,-2px)}}@keyframes m-potato-interview-slam{from{transform:translate(-50%,-50%) rotate(var(--rot,-4deg)) scale(2.4);opacity:0}to{transform:translate(-50%,-50%) rotate(var(--rot,-4deg)) scale(1);opacity:1}}@keyframes m-potato-interview-thud{from{transform:scale(2);opacity:0}to{transform:scale(1);opacity:1}}@keyframes m-potato-interview-roll{from{transform:translateX(220%) rotate(360deg);opacity:0}to{transform:none;opacity:1}}@keyframes m-potato-interview-leave{to{transform:translateX(300%) rotate(200deg);opacity:0}}@keyframes m-potato-interview-drop{from{transform:translateY(-120px)}to{transform:none}}
@keyframes m-potato-interview-rise{from{transform:none}to{transform:translateY(-120px)}}@keyframes m-potato-interview-tear{to{transform:translate(60px,20px) rotate(14deg);opacity:0}}@keyframes m-potato-interview-unroll{from{max-height:0;opacity:0}to{max-height:70px;opacity:1}}@keyframes m-potato-interview-pulse{50%{transform:scale(1.05)}}@keyframes m-potato-interview-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.05)}}@keyframes m-potato-interview-slip{0%{opacity:0;transform:rotate(-3deg) scale(1.6)}15%,80%{opacity:1;transform:rotate(-3deg) scale(1)}100%{opacity:0}}@keyframes m-potato-interview-sweatfall{from{transform:translateY(0);opacity:1}to{transform:translateY(34px);opacity:0}}
@keyframes m-potato-interview-wob{50%{transform:translateX(2px)}}@keyframes m-potato-interview-w1{50%{transform:translate(12px,-6px) rotate(calc(var(--r,0deg) + 5deg))}}@keyframes m-potato-interview-w2{50%{transform:translate(-13px,5px) rotate(calc(var(--r,0deg) - 5deg))}}@keyframes m-potato-interview-w3{50%{transform:translate(10px,7px) rotate(calc(var(--r,0deg) + 5deg))}}@keyframes m-potato-interview-pop{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}@keyframes m-potato-interview-fall{to{transform:translate(20px,260px) rotate(80deg);opacity:0}}@keyframes m-potato-interview-spin{to{transform:rotate(360deg)}}
@keyframes m-potato-interview-zzz{0%{transform:translate(0,0);opacity:0}30%{opacity:1}100%{transform:translate(24px,-34px);opacity:0}}@keyframes m-potato-interview-grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}@keyframes m-potato-interview-wink{50%{transform:scaleY(.08);transform-origin:center;transform-box:fill-box}}@keyframes m-potato-interview-concert{0%,100%{transform:scaleX(.7)}50%{transform:scaleX(1.3)}}@keyframes m-potato-interview-melt{to{transform:scale(1.2,.2) translateY(60px);opacity:.1}}@keyframes m-potato-interview-bow{0%,100%{transform:none}30%,60%{transform:rotate(40deg) translateY(10px)}}@keyframes m-potato-interview-toast{50%{transform:translateY(-8px)}}
@keyframes m-potato-interview-eject{to{transform:translateY(-240px) rotate(300deg);opacity:0}}@keyframes m-potato-interview-sway{50%{transform:rotate(5deg)}}@keyframes m-potato-interview-wig{50%{transform:rotate(-24deg)}}@keyframes m-potato-interview-flick{0%{opacity:.3}100%{opacity:1}}@keyframes m-potato-interview-ringer{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-10deg)}80%{transform:rotate(8deg)}}@keyframes m-potato-interview-cert{from{transform:translateX(0)}60%{transform:translateX(0)}to{transform:translateX(0) rotate(-1deg)}}
@container (max-width:700px){
.m-potato-interview-main{grid-template-columns:1fr}
.m-potato-interview-qs{flex-direction:row;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 2px 8px}
.m-potato-interview-card{flex:0 0 78%;scroll-snap-align:start}
.m-potato-interview-rlist li:nth-last-child(n+4){display:none}
.m-potato-interview-open .m-potato-interview-rlist li:nth-last-child(n+4){display:block}
.m-potato-interview-stare{touch-action:none;-webkit-touch-callout:none}.m-potato-interview-kb{display:none}.m-potato-interview-nohires .m-potato-interview-wall{display:none}.m-potato-interview-ev{font-size:11px;overflow-wrap:anywhere;padding:6px 2px}
.m-potato-interview-door{width:128px}
.m-potato-interview-poster{display:none}
}
@media (prefers-reduced-motion:reduce){
.m-potato-interview-root *{animation-duration:.01s!important;animation-iteration-count:1!important}
.m-potato-interview-sprout .m-potato-interview-card,.m-potato-interview-leaf,.m-potato-interview-hg,.m-potato-interview-toast{animation:none!important}
.m-potato-interview-lan.m-potato-interview-drop{animation:none!important}
}
.pm-reduce-motion .m-potato-interview-root *{animation-duration:.01s!important;animation-iteration-count:1!important}
.pm-reduce-motion .m-potato-interview-sprout .m-potato-interview-card,.pm-reduce-motion .m-potato-interview-leaf,.pm-reduce-motion .m-potato-interview-hg,.pm-reduce-motion .m-potato-interview-toast,.pm-reduce-motion .m-potato-interview-lan.m-potato-interview-drop{animation:none!important}
@media (pointer:coarse){.m-potato-interview-rt,.m-potato-interview-panelrow button{min-height:36px}}
.m-potato-interview-cov{position:absolute;inset:0;pointer-events:none;z-index:4}.m-potato-interview-cover{position:absolute;width:62%;min-height:54px;padding:6px 8px;pointer-events:auto;background:#fff3a3;border:2px solid #7a5fb0;font:italic 700 12px/1.25 "Segoe Script","Comic Sans MS",cursive;transform:rotate(var(--tr,3deg));box-shadow:3px 3px 0 rgba(0,0,0,.3);text-align:left}
.m-potato-interview-spud{position:absolute;left:-40px;font-size:30px;line-height:1;z-index:12;background:none;border:0;padding:0;animation:m-potato-interview-run 3.2s linear both;animation-delay:var(--d,0s)}.m-potato-interview-spud::after{content:"";position:absolute;left:50%;bottom:-2px;width:14px;height:3px;margin-left:-7px;background:var(--c,#e6b422)}
@keyframes m-potato-interview-run{from{transform:translateX(0)}to{transform:translateX(115cqw)}}
`, 'css-potato-interview');

  P.addAchievements([
    { id: 'potato-interview.first', name: 'Grand Chancellor of Tuber Relations', desc: 'Hire your first potato. The potato was already hired. You are not sure how this works. Nobody is.', icon: '🥔', reward: 2 },
    { id: 'potato-interview.hire10', name: 'Chief Executive Spud-Whisperer of the Pipeline', desc: 'Hire 10 potatoes (lifetime). All of them are Senior Vice Spud. All of them are fine.', icon: '📎', reward: 5,
      check: function (s) { return (s['potato-interview.hires'] || 0) >= 10; } },
    { id: 'potato-interview.ask50', name: 'Grand Marshal of the Order of Starchy Interrogation', desc: 'Ask 50 questions (lifetime). The clipboard has written Hmm in its own margin.', icon: '📋', reward: 5,
      check: function (s) { return (s['potato-interview.questions'] || 0) >= 50; } },
    { id: 'potato-interview.silence', name: 'Laureate of the Sacred Awkward Silence (First Class)', desc: 'Hold a silence to 10 seconds and receive a job offer from a potato.', icon: '🤫', reward: 5 },
    { id: 'potato-interview.eyes', name: 'Supreme Arbiter of Eye Contact (11 Eyes, Verified)', desc: 'Complete Sandra\'s eye contact policy. Sandra has described it, in writing, as adequate.', icon: '👁️', reward: 3 },
    { id: 'potato-interview.rubric', name: 'Duke of the Rubric Beyond Ten', desc: 'Score a Gut Feeling of 11. Receive Outstanding (Provisional) from a rubric that did not ask.', icon: '📏', reward: 2 },
    { id: 'potato-interview.technically', name: 'Technically Hired', desc: 'Hire a Sweet Potato. It is Senior Vice Spud (Technically). Sandra has flagged this.', icon: '🍠', reward: 3 },
    { id: 'potato-interview.endless', name: 'Grand Chancellor of Having Reached The End Of A Thing That Continues', desc: 'Reach the end of the interviews. The interviews continue.', icon: '🎖️', reward: 5 },
    { id: 'potato-interview.dissenter', name: 'The Sole Dissenter', desc: 'Find and click the 6px No box. It was not a mistake. It was, however, hired anyway.', icon: '🅽', secret: true, reward: 10 },
    { id: 'potato-interview.mash', name: 'Imperial Warden of the Mash, Defender of the Bowl', desc: 'Spam the questions until a candidate mashes itself, and hire Senior Vice Mash.', icon: '🥣', secret: true, reward: 10 },
    { id: 'potato-interview.smallthings', name: 'Reader of Small Things, Keeper of the Fine Print', desc: 'Discover the last page of the resume by lingering over the fine print for 20 seconds.', icon: '🔍', secret: true, reward: 10 },
    { id: 'potato-interview.mutual', name: 'The Interview Is Mutual, and Also Possibly a Dream', desc: 'Idle long enough for the potato to interview you. You were scored. You scored well. We are keeping the notes.', icon: '🌙', secret: true, reward: 20 },
    { id: 'potato-interview.sleeper', name: 'Sleeper Hire', desc: 'Wake a sleeping candidate by clicking their resume. The resume has been disturbed.', icon: '💤', secret: true, reward: 3 },
    { id: 'potato-interview.accordion', name: 'Accordion Grandmaster of the Squeezed Spud', desc: 'Resize the window until a candidate becomes a concertina.', icon: '🎶', secret: true, reward: 5 },
    { id: 'potato-interview.stone', name: 'Stone-Cold Chancellor of Unlikely Candidates', desc: 'Meet Geoffrey (not a potato), or hire three rocks.', icon: '🗿', secret: true, reward: 10 },
    { id: 'potato-interview.efficient', name: 'Most Efficient Hire In Company History', desc: 'Press HIRE before the potato has said a word. Please do not repeat it.', icon: '⚡', secret: true, reward: 2 },
    { id: 'potato-interview.fourseventeen', name: 'Eternal Warden of 4:17, Keeper of the Hour That Declined To Elapse', desc: 'Ask the wall clock the time 17 times. It was 4:17. It is now, briefly, 4:18. Nobody saw. It was the biggest thing that has ever happened.', icon: '🕓', secret: true, reward: 15 },
    { id: 'potato-interview.caller', name: 'Ambassador Plenipotentiary to the Soil (By Telephone)', desc: 'Pick up the reference call before it stops ringing. Someone on the line remembers the candidate fondly and from below.', icon: '📞', secret: true, reward: 5 },
    { id: 'potato-interview.tenure', name: 'Companion of the Order of Having Stayed Ten Whole Minutes', desc: 'Remain in the interview for 10 minutes and receive a performance review from a lanyard. Outstanding (Provisional).', icon: '📜', reward: 5 },
    { id: 'potato-interview.peeler', name: 'Foreman of the Adhesive Uprising', desc: 'Peel all three of Sandra\'s notes off the clipboard. They contradict each other. The clipboard is, for once, on your side.', icon: '📝', reward: 3 }
  ]);

  P.addLines('moduleEnter', ["Your 9:00 is here. He has been here since 8:14. We believe he is load-bearing.", "The interview room has been prepared. The potato has not been consulted."]);
  P.addLines('moduleExit', ["Thank you for interviewing potatoes. Your 9:00 will be here at 9:00. He has been here at 9:00 since before 9:00.", "Interview concluded. The position remains open. Barry remains Barry.", "You have left the room. The potato has not. It is waiting politely to be told it is hired."]);
  P.addLines('ticker', ["BREAKING: Local firm fills 1 position with 4,119 potatoes; position remains open, sources say", "Hiring pipeline reported robust for 14 consecutive interviews; analysts concerned", "Gerald is next, say officials, for the 61st consecutive day", "Sandra from Compliance denies flagging the lobby; lobby flags back"]);
  P.addLines('tip', ["Tip: Space is also a question. It is the better question.", "Tip: Every candidate is hired. The interview is for morale.", "Tip: The smallest box on the form has never been asked about. Please do not ask about it."]);

  /* ---------------------------------------------------------------- DATA (section 8, verbatim) */
  const OPEN = ["Welcome, Valued Employee. Today's candidates are potatoes. Please remain impartial about starch.","Your pen is on loan from Sandra. Please sign nothing with it. She will know.", "Your 9:00 is here. Barry has been here since 8:14. He is wearing a lanyard that says HIRED. We have not discussed it."];
  const RETURN = ["Welcome back, {p}. Barry has been waiting. Barry is applying for the job he already has.", "Welcome back. Management kept your chair warm. The chair has questions.", "Welcome back. The position is open. The position has always been open. It was only being polite."]; // lint-ignore
  const MET_GERALD = "Gerald has asked that we not acknowledge that you have met before. We are not acknowledging it with great discretion."; const AUTO_ASK = "You have not asked a question. Management will model the verb. Barry, are you a potato?";
  const STARE_REVEAL = "Silence is also a question. Please hold Space. It is a legally recognised interviewing technique in 3 jurisdictions and the lobby.";
  const BEAT = {
    barry: { intro: "Candidate 1 is Barry, a Russet. His resume is 14 inches long and two of those inches are about soil.", prechecked: "The first question has been pre-checked. Management felt it was important that you start with a win.", checkedAnswer: "Yes. I have checked.", hired: "Barry has been hired as Senior Vice Spud. The position has been filled. It remains open, as a courtesy." },
    marjorie: { intro: "Candidate 2 is Marjorie T. Russet. Per policy, everyone is hired. The interview is for morale.", hired: "Marjorie has been hired as Senior Vice Spud (Acting). Acting is the same job, but more committed." },
    dale: { intro: "Gerald has been called. Gerald has not come. A different potato has volunteered to be Gerald. It is not Gerald. It is hired.", pause: "Dale pauses for four seconds before every answer. Management logs this as executive presence.", hired: "Dale has been hired as Senior Vice Spud (Emeritus). He did not know he was emeritus. He is taking it well." },
    toaster: { intro: "The Toaster is today's 4th candidate. It is a potato today. Compliance has agreed to look away.", ref: "The Toaster has listed itself as a reference. The Toaster says: 'Toast.' The reference is positive.", hired: "The Toaster is hired as Senior Vice Spud of Honesty. The Toaster is toast, but also promoted." },
    philomena: { intro: "Candidate 5 is Philomena, a Fingerling. She has 11 eyes. Sandra from Compliance would like a word about all 11.", done: "Philomena has been acknowledged in all 11 eyes. Sandra has noted the effort. Sandra used the word adequate.", twelfth: "You have made eye contact with the 12th eye. It knows. Sandra has flagged this and also not flagged this.", hired: "Philomena has been hired as Senior Vice Spud (In Spirit). Her spirit has 11 eyes. It is also adequate." },
    panel: { intro: "Two potatoes share the chair. Colleen is a Fingerling. Desmond is a Yukon. They have been told which is which and have not believed it.", direct: "Please click the one you mean. They will answer each other anyway.", xref: "Desmond has cross-referenced Colleen's resume. That was in Colleen's 2019. They were both there.", hired: "Colleen and Desmond have been hired jointly as Senior Vice Spud (Jointly) and Senior Vice Spud (Also Jointly). Positions filled: +2. Positions open: 1." },
    gerald: { intro: "Gerald, Vice President of Spuds, has entered the room. He has been sitting in the chair for 40 minutes. It was always his chair.", hired: "Gerald has been hired as Senior Vice Spud (Gerald). Gerald is known as Gerald. This is in the fine print.", pen: "Gerald is holding the pen. The pen is on loan. Gerald is on loan. Everything is on loan except the potatoes." },
    sweet: { intro: "A Sweet Potato has entered. Compliance reminds the room that a sweet potato is not technically a potato.", hired: "Reginald has been hired as Senior Vice Spud (Technically). It has been hired anyway, technically.", rejected: "Sandra has flagged this. It was a sweet potato. It is fine." },
    sprout: { intro: "The clipboard has sprouted. It would like to ask a question. It is not on the list. It has never been on the list.", wander: "The clipboard has opinions. Please click the cards while they wander. They settle when looked at, like most of us.", asksYou: "The clipboard asks YOU a question. Please answer Yes or Yes. Management has pre-checked Yes.", casserole: "A casserole has been left on the desk. Sandra has flagged it. It is lovely." },
    dennis: { intro: "Dennis (Plant) has applied. Dennis (Plant) already works here. Dennis (Plant) was already the manager of the hiring manager.", self: "Dennis has scored himself. It was Strong Yes. It was already Strong Yes.", hired: "Dennis has been hired as Senior Vice Spud. Dennis stayed exactly where he was, which is how Management knows it worked.", cameo: "A cameo has been recorded. It pays 5 Meh. Dennis has not asked for his share. Dennis never asks." },
    sock: { intro: "The Missing Sock has requested to interview you. This is a different department. This is also this department.", perfect: ["Perfect.", "Excellent, and sufficiently wrong.", "That was the correct answer. It is also the incorrect one. Both are accepted."], resume: "The Sock reads your resume aloud. Clicks: {n}. Time in role: {k} minutes. Meh on hand: {s}. Hobbies: {hobby}. References: you.", final: "Perfect. You start Monday. We do not have Mondays. Tuesday.", hired: "You have been hired as Senior Vice Valued Employee. Please do not tell Gerald. He gets possessive about titles." }, // lint-ignore
    unnamed: { intro: "This one does not have a resume. This one does not need one.", nod: "The potato nods. It is not an answer. It is a nod.", resumeLine: "Wanted to be asked.", hired: "Hired. Quietly. Please do not look at the other buttons.", outro: "That was a lovely interview. The candidate is leaving with a hand-shaped feeling. Potatoes have no hands. We checked. The feeling remains." },
    rock: { intro: "This candidate is a rock. We have checked three times. We are going to hire the rock.", silent: "The rock answers in perfect silence. It is a strong answer. It is also the only one.", resumeLine: "Reliable.", hired: "The rock has been hired as Senior Vice Spud (Geological). It was a potato in a challenging phase.", leaf: "Dennis (Plant) has sent a leaf of approval. The leaf is for the rock. The rock is moved." },
    trench: { intro: "Dr. Tuber. A single candidate. Do not look at the coat.", mgmt: "We are not looking at the coat. The coat has been looked at. Let the record show the coat." },
    plusone: { intro: "We are one candidate. The small one handles the numbers. The large one handles the Teams of People." },
    hat: { intro: "I am a hat. Please do not lift me. I will say I was lifted. It will be on the record." }
  };
  const GERALD_VISIT = ["Gerald, Vice President of Spuds, has entered the room. He has been sitting in the chair for 40 minutes. It was always his chair.", "Gerald has been called again. Gerald would like it noted that this is his second first impression.", "Gerald, third visit. He has brought the chair from last time. It was already here. There are now two.", "Gerald, fourth visit. Management has stopped saying welcome. Gerald has not noticed. Gerald never has. It is why he is Vice President.", "Welcome, new candidate. Management has not met you. Management has met you."]; const GV_LATE = ["Welcome, new candidate. You are a lot like the last one. Management has checked.", "Welcome, new candidate. Management is going to need a moment. Management has had several.", "Welcome, new candidate. Management is fine. The clipboard has crossed something out.", "Gerald again. Management has run out of ways to say again and has said it in a smaller font.", "Gerald has been called. Gerald has been here. Both are being logged under Gerald.", "Gerald, visit unknown. The chair has begun to wait for him in the hall. He is already in it."]; const GERALD_RESUME = ["Vice President of Spuds (prior). Seeking: more.", "Vegetable Leadership (32 years, same year).", "Previously: this interview.", "See attached resume, attached to a different resume, attached to a hat.", "Footnote 1: see Footnote 1.", "Reason for leaving: I am still there.", "References: Gerald.", "Previously: retired."];
  const GERALD_REF_STARE = "Gerald stares at the line that says References: Gerald for a long beat. 'That is an excellent reference,' he says."; const GERALD_FIFTH = "Clipboard question, crossed out with one pen mark in Gerald's handwriting: Have we met?";
  const GERALD_ANSWERS = ["A potato does not seek the light. It is the light that has been carefully buried.", "I ask a question, you answer a question, and somewhere a tuber is promoted. This is the way.", "My biggest strength is that I contain multitudes of starch.", "I have worked with many teams. Most were in the ground. They were very supportive. We never spoke about it.", "My leadership style is to be extremely still and let others discover their own potential. It is working beautifully on nobody.", "I do not have weaknesses. I have a number of unscheduled softnesses.", "The future is a field. You are standing in it. I would not stand there.", "I am not late. I am early for a different interview, which is this one.", "To be hired is to be asked to continue. I have been continuing since 1987.", "Every question is the same question wearing a different lanyard."]; const GERALD_SMALL = ["I have never been late. Time has been early on my behalf.", "I was a seed once. I do not recall consenting to the field."];
  const GERALD_BIG = ["I am not sitting in the chair. The chair is sitting in me. It has been for forty minutes.", "Every potato you hire is me. I have not told them. They are doing wonderfully."];
  const QS = [
    ["Tell me about yourself.", "Once, I was a seed. It was a lot of pressure. Then I was a lot of me.", "I am mostly starch, with a minor in soil. I have never once been asked about the minor."],
    ["What is your greatest weakness?", "Fork. And also the idea of Fork.", "Hills. I have a complicated relationship with hills. We have rolled apart."],
    ["Why do you want this job?", "I have been told it is a job. I have never been told otherwise.", "The title includes both Senior and Spud. I felt seen. In several places."],
    ["Where do you see yourself in five years?", "In the ground. It is where I see everyone.", "In a pie. I am calm about it. I have rehearsed the calm."],
    ["Describe your leadership style.", "Round, with occasional bumps. Subordinates are encouraged to be dips.", "I lead by being extremely still. It is working on nobody, beautifully."],
    ["What are your salary expectations?", "Anything above 0 Meh and a quiet drawer.", "I have been paid in rain before. I am flexible about weather."],
    ["Do you work well under pressure?", "I am literally under pressure. I am two feet down. It is a lot.", "I was pressure-cooked once. I was fine. The pressure was not."],
    ["How do you handle conflict?", "I withdraw into a mild brown silence. Colleagues call it thoughtful.", "I sprout. Not at anyone. In general. It is a lifestyle."],
    ["What is your biggest accomplishment?", "I did not sprout during the 2019 Reorganization. Others sprouted. I stayed focused.", "I was dug up on a Wednesday and nobody had to say sorry."],
    ["Are you a team player?", "I have been in a stew. I have given everything. I am still thinking about it.", "I once shared a sack with eleven others. We never spoke of the dark."],
    ["Can you explain the gap on your resume?", "That was the cellar. It was not a gap. It was a very long, very productive Tuesday.", "I was between jobs. Also between two other potatoes. It was cozy."],
    ["What motivates you?", "Warmth. Also butter. Mostly I like to be asked.", "The sun, in theory. I have never seen it. I take it on faith."],
    ["What would your previous manager say about you?", "That I was well-rounded. Then they said it again, slower.", "That I was reliable. Then the manager was eaten. I was fine."],
    ["How do you stay organised?", "I live in a sack with eleven friends. Organisation is a sack.", "I label nothing. Everything is Potato. It has never failed me."],
    ["What does success mean to you?", "To be chosen. To be chosen again. To be mashed with intent.", "To be left alone, but in a way that is noticed."],
    ["Do you have any questions for us?", "Just one. Why is the chair taller than me? It is a power move. I respect it.", "Is there a window? I would like to be near a window, but not looked through."],
    ["Describe a time you disagreed with a coworker.", "He said I was a root vegetable. I said I was a tuber. We have not spoken since. It was a good talk.", "A carrot said I was boring. I said nothing. We are still in that moment."],
    ["How do you handle a deadline?", "I take it very slowly. Deadlines are soil. I am patient in soil.", "I have never missed one. I have also never been told one."],
    ["What is your biggest strength?", "I am difficult to bruise. I have been dropped seven times. I have notes on each.", "Consistency. I have looked the same since 1987. Some call it brave."],
    ["Where did you last work?", "A field. The management was weather.", "A drawer. It was a lateral move. Mostly sitting."],
    ["Why should we hire you?", "Everyone else has already been hired. It would be awkward to be the only one.", "You are not obliged. But the stamp is already warm."],
    ["Where do you see our company in ten years?", "Larger. Rounder. Under a very good roof.", "Slightly to the left of the window. It is where I see everything. It is a large window."],
    ["Tell me about a time you failed.", "I was boiled for twelve minutes. In my defence, nobody timed the other eleven.", "I arrived at a dinner as the main and left as a side. I do not wish to name the dinner."],
    ["How would your friends describe you?", "As a sack of the same person. We are not a diverse sack. We are a loyal sack.", "'Mm.' That was the entire quote. It was a tribute."],
    ["What do you do in your spare time?", "I sit. When I am finished sitting, I sit somewhere else, for variety.", "I am developing a hobby. It is dormant. It will be extraordinary when it sprouts."],
    ["Do you have experience with spreadsheets?", "I have been in cells. I was organised by row. I did not enjoy the row.", "I am a spreadsheet, in a way. Everyone looks at me, nods, and goes back to their own."],
    ["How do you feel about relocating?", "I have only ever been relocated. It is how I got here. It is how I got everywhere.", "I go where the truck goes. I have always gone where the truck goes. I have no say in the truck."],
    ["How do you deal with criticism?", "I develop a thick skin. I developed it first. It is my first and best feature.", "I take it to heart, then to the cellar, then I let it age."],
    ["Is there anything on your resume you would like to correct?", "Page 3 says I speak French. I was once near a fry. We understood each other. Neither of us said a word.", "My height. I am listed at four inches. I am four and a half. That is now on the record."],
    ["Walk me through your resume.", "It is fourteen inches. Two inches are about soil. I would like to talk about the other twelve.", "I would, but it keeps unrolling. It has a mind of its own. We are not close."]
  ];
  const POOL_BARRY = ["Mm.", "Mm. Mm.", "Mmm.", "Mm?", "Eyes. Too many. I am working on it.", "In a pie. I am calm about it.", "Hills."]; const BARRY_CAPTION = ["Barry's answer was 'Mm.' Management has transcribed it as a thoughtful, 1-syllable position paper.", "Barry said 'Mm. Mm.' Management has upgraded it to a 2-syllable position paper.", "Barry said 'Mmm.' Management has recorded the extra M as a gesture of 4 pages.", "Barry has now said 'Mm.' four ways. Management has minuted all four and is leaning toward the second."]; const BARRY_SPEECH = "I would like to answer that properly. I have been preparing since the cellar. I have always wanted to be asked, and I am so glad it is you."; const BARRY_SAVED = "Barry has been saving that. Please do not ask him to repeat it. He has no memory of it.";
  const POOL_TOAST = ["Toast.", "Toast. Toast.", "Toast?", "Toast (warmly).", "Toast. (It is not a no.)", "Toast. Toast. Toast. (Escalating.)"]; const TOAST_CAPTION = ["The Toaster says 'Toast.' The answer is positive.", "The Toaster considers your question for a long, warm moment. It returns with one word. The word is the usual word.","The answer was 'Toast.' Management has no notes. Management has a lump in the throat.", "The Toaster popped. It was not a metaphor. Mostly."];
  const POOL_SWEET = ["I am a potato. I have the eyes. I have the starch. I have the whole thing. Please stop looking at my colour.", "I am a potato in the sense that I am here and I am in a chair. That is what a potato is.", "I was in a field. I was underground. I was hungry for purpose. All potato things. All of them.", "Sandra says I am not technically a potato. I say technically is a very flexible word.", "I have a cousin who is a regular potato. We have the same cousin. It is a technicality.", "My skin is orange. In certain lighting, so is yours.", "I have never been so sure of anything. Please do not ask me twice."]; const POOL_COLLEEN = ["That was in Desmond's 2019. We were both there.", "I disagree with Desmond, but I will be quoting him later.", "We report to each other. It has been very efficient and very circular.", "Desmond and I disagree about who reports to whom. We have agreed to be hired together and report to the lanyard.", "Colleen is correct. Colleen is usually correct. It is her whole personality and mine."];
  const POOL_DESMOND = ["I would like to answer a different question. Colleen has the right one.", "Ask Colleen. No, ask me. No. Colleen.", "Who reports to whom? We have a chart. The chart is under a mattress.", "That was in Colleen's 2019. I was there. I was also the 2019.", "I will let Colleen finish. She is finished. I will begin. She has begun again."]; const POOL_DENNIS = ["The leaf rustles once. Management translates: 'I would like to speak to whoever is responsible for this.' It is you. It is you.", "Dennis has answered with a single, perfect leaf. Management is moved. Management is also a little intimidated.", "Dennis rustled twice. Management translates: 'I have been here since before the question.'", "Dennis does not answer. This has been recorded as Exceptional Listening.", "Dennis turned towards the window. It was not a turn. It was a trend.", "Dennis is thriving. He has no comment. He has a new leaf."];
  const POOL_ROCK = ["...", "... (firmly)", "...  (geologically)"]; const POOL_UNNAMED = ["...", "...", "... (it is looking at you)"];
  const SPROUT_QS = ["What is your five-year plan, in potatoes?", "Describe yourself using only soil.", "Do you consider yourself a root, a tuber, or a feeling?", "How many of you are there today?", "Tell me about a time you were looked at.", "What would you do if you were a clipboard?", "Is there anything you would like to say to the one who is holding me?", "On a scale of Barry, how Barry are you?"]; const SPROUT_REACT = ["The potato considers the question. The question considers the potato.", "The potato has never been asked this by a clipboard. It is taking it seriously.", "The clipboard accepts any answer except 'no'.", "The clipboard has underlined something. It has not said what."];
  const QZERO = { q: "Are we alright?", mgmt: "We have not authorized that question. We have noted that it was good.", yes: ["Yes", "Yes"] }; const RESUME = ["Led a cross-functional team of 6 eyes (all of them mine).", "Reduced cellar waste by 100 percent by becoming the waste.", "Fluent in Starch, conversational in Gravy, certified in Quiet.", "Hobbies: Sitting. Competitive sitting. Team sitting (level 3).", "Spearheaded the Great Sprout Initiative, which was not a thing, and then it was a thing.", "Winner, Most Likely To Be Dug Up (2014, 2015, 2017, 2022 (my own category)).", "Mentored Dennis (Plant), who did not need it and said so, kindly, in leaves.", "14 years at the Department of Minor Tuesdays.", "Chief Spud Officer, Toaster's Union Local 4 (1994 to 1993).", "Managed a sack of 12 on a rotating basis. Was the rotation.", "Certified in Rolling (advanced). Weaknesses: Hills.", "Awarded Employee of the Month by a month. The month has since resigned.", "Led the 2019 Reorganization. Was reorganized. Led the reorganization of that.", "Delivered a keynote at the Annual Cellar Summit. Attendance: dark.", "Introduced the Friday Casserole. Retention increased, in the sense of everybody.", "Languages: Starch (native), Fork (receptive), Tuesday (learning).", "Stood next to an important potato for 6 years. Absorbed some of it.", "Completed a 3-year course in Mild Brown Silence. Graduated at the back.", "Maintained the Spreadsheet of Spuds. The spreadsheet maintained me.", "Pioneered the use of the word tuber in cross-functional settings.", "Reduced onboarding time by arriving already hired.", "Reason for leaving the cellar: it was a cellar.", "Won the Cellar Games (Competitive Sitting, Team Event). Placed first of one.", "Reduced meeting length by 100 percent by never attending, which is also how it ended up in all of them.", "Volunteer, Friday Gravy Initiative. Mostly present for the gravy. The gravy was grateful.", "Awards: Best Beginning of a Sack (2011). Best Middle of a Sack (2012). End of Sack: pending.", "Open to relocation, provided the relocation is a drawer, a pot, or an open mind.", "Trained 4 junior tubers in the art of staying. 4 of 4 remain. They have not been told they may leave.", "Conflict resolution: 100 percent, having never entered a room where one could occur.", "Stakeholder in a soil. Relationship: it is complicated, it is mutual, it is dirt."];
  const SCRIPTED_RESUME = {
    barry: ["Experience: 4 years in soil (not all of it voluntary).", "Skills: Rolling (advanced). Weaknesses: Hills.", "Lanyard: HIRED (issued before application)."],
    marjorie: ["Led a cross-functional initiative to remain in a drawer for eleven weeks. Delivered under budget.", "Thrives under pressure. Was pressure-cooked once.", "Hobbies: the drawer."],
    dale: ["Certified in Advanced Sitting. Honorary Fellow of the Department of Minor Tuesdays.", "Volunteered to be Gerald (unconfirmed).", "Pauses: 4 seconds. Executive presence: 100 percent."],
    toaster: ["Chief Spud Officer, Toaster's Union Local 4 (1994 to 1993).", "Skills: Warmth (high), Honesty (very high), Toast (all).", "Eyes: 0 (confirmed, regrettably)."],
    philomena: ["Managed a team of 40 eyes. Retention: 100 percent. Vision: 20/20, per eye.", "Fingerling (Senior). 9 centimetres. Considered senior in the fingerling community.", "Eyes: 11 (confirmed). Do not count the 12th."],
    colleen: ["Fingerling (Senior). 9 centimetres. Reference: Desmond.", "Hobbies: being referenced."],
    desmond: ["Hobbies: Being under a mattress. In the margin: Not that kind of mattress.", "Reference: Colleen. Colleen's reference: Desmond."],
    sweet: ["Experience: a field, technically.", "Skills: Being a potato (disputed).", "Cousin: a regular potato (shared)."],
    dennis: ["Lobby Plant (Senior). 6 years. Thriving.", "Mentored: everyone. They did not need it.", "Reason for applying: already works here."],
    unnamed: ["(No resume.)", "(None needed.)", "Wanted to be asked."],
    rock: ["Reliable.", "Reliable.", "Reliable."]
  };
  const SOIL_REF = ["References available upon request: the soil.", "References available upon request: the soil (verbal).", "References available upon request: the soil (written, in a bag).", "References available upon request: the soil has asked not to be contacted.", "The soil writes: 'They were fine. They were underground. It is difficult to supervise.'"]; const QUALITY = ["SATISFACTORY", "SATISFACTORY (EXCEPTIONALLY)", "SATISFACTORY (SO FAR)", "SATISFACTORY (IN SPIRIT)", "SATISFACTORY (PENDING)", "EXCEPTIONALLY SATISFACTORY (REGRETTABLY)", "SATISFACTORY (ON A TECHNICALITY)", "SATISFACTORY (ASK AGAIN LATER)", "SATISFACTORY (SEE ATTACHED SHRUG)"];
  const QUALITY_FIRST = "ANSWER QUALITY: Satisfactory (Exceptionally). This is the lowest grade the stamp has. It has never been used."; const SCORE_STRONG = ["Score received: Strong Yes (Spud). The stamp is dry. The stamp is also, somehow, emotional.", "Strong Yes (Spud) recorded. Management has underlined it twice and then underlined the underlining.", "Strong Yes. The ink has splashed onto Sandra's pen, which is on loan. It is fine. She will know.", "Strong Yes (Spud). The form was stamped so hard the stamp has asked whether it is alright.", "Strong Yes (Spud). The potato has been told. It is trying not to let it go to its head, which is also its body."];
  const SCORE_TECH = ["Score received: Yes (Technically). Management has recorded this as a Strong Yes with a small asterisk and a large smile.", "Yes (Technically) noted. The technicality has been honoured. It will be invited to things.", "Yes (Technically). Management asked Sandra which technicality. Sandra said the one with the lanyard.", "Yes (Technically). The technicality was a good one. It has been waiting for this all its life, which was four minutes."]; const SCORE_WARM = ["Score received: Yes (Warmly). The potato has been warmed. It will remember this the way potatoes remember: slowly.", "Yes (Warmly). A warmth has occurred. It has been logged under Weather.", "Yes (Warmly). The box has been ticked in a manner that suggests a blanket.", "Yes (Warmly). Please note the warmth is not a metric. Please note it anyway."];
  const SCORE_AGAIN = "The form has already been stamped. It is not comfortable being re-stamped."; const SCORE_AUTO = "Unscored. Management has scored it for you: Yes (Warmly). Please do not argue with the weather.";
  const NO_BOX = ["We have never seen this box activated.", "The potato looks directly at you.", "Candidate declined. Candidate is hired as Senior Vice Spud (Declined, Retroactive)."]; const RUBRIC = { arrive: "The rubric has arrived. It has one slider. The slider has opinions about 7 1/2.", clause1: "Sandra from Compliance has flagged clause 1: scores must be honest, but not on a Tuesday. Today is not Tuesday. Tuesday is, however, aware of you.", notch: "You gave Gut Feeling a 7 1/2. The notch clicked into place. It will not let go. The notch has done this before.", low: "You gave a -3. Total score: Outstanding.", high: "Gut Feeling Index: 11. This is Outstanding (Provisional). The provisional part is about the weather.", mid: "Total score: Outstanding. Management has checked the arithmetic. There was no arithmetic." };
  const STARE = {
    sweat: ["Silence: 2 seconds. {name} is sweating. Butter is not involved. It is just water. Per policy.", "2 seconds of silence. {name} has begun to perspire. This is a potato. Please do not ask from where.", "{name} is sweating. The chair has been asked not to notice. The chair is noticing.", "Silence has reached 2 seconds. {name} is about to say something. It will not be good. It will be true."], // lint-ignore
    over: ["At 10 seconds of silence, {name} offers YOU a job. You decline politely. {name} files a report on the politeness.", "{name} has offered you a job. You said you would think about it. {name} has put that in writing.", "Silence Overflow. {name} has offered you a job, a lanyard and a small chair. Management would like you to take the chair.", "Silence Overflow. {name} has offered you a job, glanced at it, and left the room to give you privacy with it.", "{name} has put a hand on your shoulder. It is not a hand. It is not your shoulder. You have been offered a job and a feeling."], // lint-ignore
    eleven: "Your silence has lasted 11 seconds. {name} is now a different potato. {name} is also still {name}. HR has agreed to both.", // lint-ignore
    release: ["You released at {s} seconds. {s} seconds is a perfectly good silence. It has been cashed.", "Silence ended at {s} seconds. The potato exhales. It had been holding something. It would not say what.", "You released at {s} seconds. The silence has been returned to the shelf. It is slightly damp from being held.", "{s} seconds. Management has recorded this as a pause, a beat, and a small act of leadership.", "Silence ended at {s} seconds. {name} says nothing, which was the point, and also, regrettably, the whole bit."], // lint-ignore
    panelOver: "Colleen and Desmond jointly offer to share your job. They have a schedule. It is mostly Tuesday."
  };
  const CONF_SMALL = ["I once rolled off a shelf. I told everyone I jumped.", "I have never been mashed. I think about it constantly.", "I do not know what a Tuesday is. Please do not tell me.", "I sprouted in a meeting. I said it was a coincidence.", "I told my sack I was going to the store. I do not go to the store.", "I am afraid of forks, and also of the word fork.", "I pretended to be a rock for an entire winter. It was the best I have ever felt about myself.", "I answered a phone in the cellar once. Nobody was there. I said yes.", "I have a favourite fork. I would never say which. It knows.", "I was not in the sack photo. I was the sack photo."]; const CONF_BIG = ["I was not supposed to be here. I was in the wrong drawer. I have been very good at this.", "I have been Gerald. Twice. It was fine. I do not want to talk about the second time.", "I applied to this job in 1987. The job was not yet posted. It waited for me.", "The resume is not mine. I found it on the floor. It was excellent. I took it.", "I have sprouted. Please do not look at the left side.", "I know what Tuesday is. It is coming. I did not want to say it.", "Every day at four I stand in the dark and wait to be called. I have never been called. I am, to be clear, ready.", "I was in love once. She was a Fingerling. We shared a bag. It was a short bag.", "I am not afraid of Tuesday. I am afraid of what Tuesday has been doing without me.", "I have not told anyone, but I like it here. I like the chair. I like being asked. I like that you have a clipboard."];
  const CONF = {
    barry: ["I once rolled off a table.", "I am, technically, on the table now."],
    marjorie: ["I was in the drawer for eleven weeks. I went in willingly. I came out thinking about the drawer.", "I did not sprout in the drawer. I sprouted in the meeting about the drawer."],
    dale: ["I volunteered to be Gerald. Nobody asked. Nobody stopped me.", "I have been Gerald for eleven minutes. It is a lot. He has so many pauses."],
    toaster: ["Toast.", "Toast. Toast. (Two slices. It is the most it has ever given.)"],
    philomena: ["I am nine centimetres long. In fingerling circles this is considered senior.", "I have eleven eyes. I have only ever been looked at by four. I am counting the others."],
    colleen: ["I am slightly older than Desmond. We have never confirmed it.", "I have a plan for the department. It is in a mattress. Desmond knows."],
    desmond: ["I have been under a mattress. I have been over one, once. It was not for me.", "I do not report to Colleen. I report near her. It is a different kind of respect."],
    sweet: ["I have been called a yam. In a meeting. By a vegetable I trusted.", "I am a sweet potato. I am not a potato. I am here anyway. Please hire me anyway."],
    dennis: ["The leaf rustles. Management translates: 'Hello.' Then: 'I have had a lot of time to think.'", "Dennis has asked to be left alone. He has asked it in a way that is also an invitation."],
    unnamed: ["Thank you for asking.", "I only wanted to be asked."],
    rock: ["...", "... (a very old ...)"]
  };
  const OVER_SPECIAL = { toaster: "The Toaster has offered you a job. It is a slice of toast, ejected at speed. It is a good job.", dennis: "Dennis offers you a seat. It is the chair. You are already in it.", unnamed: "The potato offers you nothing. It simply stays. You may also stay.", gerald: "Gerald has offered you the role of Gerald. It is Gerald (Acting). Do you accept? Do you accept?" };
  const HIRE_LINES = ["Decision recorded. {name} has been hired as Senior Vice Spud. Please do not look at the other buttons. They are decorative.", "You pressed HIRE. The stamp had already pressed HIRE. The stamp was very gracious about it.", "{name}'s offer: 0 Meh per year, plus benefits (none), plus the title Senior Vice Spud. {name} is overjoyed and also shaped like a potato.", "A lanyard has been placed on {name}. It is too small to be a lanyard. It is a shoelace. It is a deeply sincere shoelace.", "Hired. You have earned 2 Meh. It has been placed in the drawer with the other Meh. The drawer is smaller than the Meh.", "{name} is hired. A round of applause has been arranged. It is also the sound of the chair relaxing.", "Welcome aboard, {name}. The boat is a desk. We do not discuss the water.", "{name} starts Tuesday. Tuesday has been notified. Tuesday said it would see.", "HR processed {name} in 7 1/2 seconds. HR then processed the processing.", "The stamp was warm. The stamp is always warm. It is not a temperature, it is an ambition.", "{name} has been added to the org chart. The org chart has been added to {name}. They fit together surprisingly well."]; // lint-ignore
  const REJECT_LINES = ["You have rejected {name}. {name} has been informed. {name} has been hired as Senior Vice Spud, with apologies.", "You pressed DO NOT HIRE. Your decision has been reviewed, respected, and overruled by the stamp.", "HR would like to apologise to {name} on behalf of HR. HR is also {name}. HR is fine.", "DO NOT HIRE was pressed with a firm hand and no effect, like most firm hands.", "{name} has been rejected by you and accepted by the building. The building outranks you. It is mostly load-bearing.", "Your rejection has been framed and hung in the room where rejections are kept. It is a very small room. It is also the supply closet."]; // lint-ignore
  const EARLY_ZERO = ["I haven't spoken yet. This is very efficient. I'm frightened.", "That is the most efficient hire in company history. Please do not repeat it."]; const EARLY_SOME = ["The interview has been shortened. The potato has been lengthened. Both have been accepted.", "Interview concluded early. The potato has been informed. The potato has questions."];
  const THINK = { disabled: "NEED MORE TIME is disabled. It has been disabled since the Reorganization. It remains, technically, holdable.", hold: "You thought about it for 5 seconds. Management has been thinking about it since March. You are now co-thinkers. A mug will follow.", early: "You let go of NEED MORE TIME at {s} seconds. That is indecision, Valued Employee. It has been logged under Personality." }; // lint-ignore
  const FILLED = ["Positions filled: {k}. Positions open: 1. Management would like to circle back to why those are both true.", "Hiring pipeline: 99%. The last 1% is the part where you hire a potato. We will get there.", "Capacity: 100 percent. Of what, Management will say in Q3. There is no Q3. It is a very good Q3.", "Positions filled: {k}. Positions open: 1. The 1 has asked to be left out of this."]; // lint-ignore
  const TITLE_SEQ = ["", "(Acting)", "(Emeritus)", "(Of Honesty)", "(In Spirit)", "(Jointly)", "(Gerald)", "(Technically)", "(Plant)", "", "(Reporting to a Different Spud)", "(Retroactive)", "(Formerly Gerald)", "(Of Vice)", "(Pending Spud)", "(Interim)", "(Of Lunch)"]; const TITLE_NOTES = { acting: "Management would like to clarify that Senior Vice Spud (Acting) and Senior Vice Spud are the same role, but acting is more committed.", twelve: "The role is the same. The parentheses are the career.", thirty: "This parenthetical refers to the previous parenthetical. The previous one refers to this. It is fine.", sixty: "The title now reads (Y). Y stands for Yes. It was always yes.", freeze: "Please be advised: a Hiring Freeze has been announced. The Hiring Freeze has been lifted. The Hiring Freeze is a warm pudding now." };
  const BADGE_EXTRA = ["ALSO", "APPROXIMATELY", "DOUBLE-CHECKED", "PROVISIONALLY", "EMOTIONALLY", "FOR NOW", "ON PAPER", "VISIBLY"]; const BADGE_FOOT = "*See badge.";
  const SALARY = ["Salary: competitive with a gentle breeze.", "Salary: 0 Meh, plus exposure to Meh.", "Salary: competitive. Against whom is under review.", "Salary: a sincere shoelace.", "Salary: 0 Meh per year, plus benefits (none).", "Salary: the satisfaction of a well-formed lanyard."]; const LETTER_HEAD = "Congratulations. You have been hired as Senior Vice Spud. Your duties are unclear. Your start date is Tuesday.";
  const LETTER_LEGAL = ["By accepting this offer you accept to be offered it again. Sandra will be present. Sandra is always present.", "Tuesday is not guaranteed to arrive. Tuesday is guaranteed to be aware of you.", "The employee may not leave the title. The title may leave the employee. The title has not been asked.", "This letter is valid for 7 1/2 minutes or until Gerald."]; const STAMP_SORRY = "Sorry. I only know the one thing.";
  const SPONGE = "The stamp has been replaced by a wet sponge for one hire. {name} is hired anyway and says, quietly, 'Damp.' Sandra has asked for the word to be returned and the sponge to be wrung."; // lint-ignore
  const ORG_LINES = ["The org chart now features {k} lanyarded tubers. Barry reports to Barry's lanyard. The lanyard has been very supportive.", "The org chart has reached capacity. A stampede has been heard. It was the org chart.", "+{n} more, mostly Barry."]; // lint-ignore
  const REVIEWS = ["{name}: Exceeds expectations. Which were low. Which were potatoes.", "{name}: Strong team player. Has never been told the team.", "{name}: Reliable. Has been in the same place since hiring.", "{name}: Goal for next quarter: remain a potato.", "{name}: Has been in every photo. Is not in any of them.","{name}: Rated Satisfactory (Exceptionally). The rating is on loan.", "{name}: Has attended 100 percent of meetings, all of them while asleep.", "{name}: Works well under pressure. Has been under pressure since 1987.", "{name}: Needs improvement in Tuesday.", "{name}: Reports to {name}'s lanyard. The lanyard speaks highly of {name}.", "{name}: Would benefit from a window.", "{name}: Has no known duties. Is excellent at them.", "{name}: Left a note on the fridge. It was a good note. The fridge has not answered.", "{name}: Mentored by Dennis (Plant). Did not need it. Said so, in leaves."]; // lint-ignore
  const REVIEW_BARRY = "Barry: Reports to Barry's lanyard. The lanyard is doing great."; const QUEUE = [[0, "QUEUE: 4"], [3, "QUEUE: 4 (please ignore the 4)"], [6, "QUEUE: 4 (there is a different 4)"], [9, "QUEUE: 4 (one of the 4 is a hat)"], [15, "QUEUE: 4 (they have started a book club)"], [25, "QUEUE: 4 (the 4 has been promoted)"], [50, "QUEUE: 4 (4 of 4 are managers)"]];
  const QUEUE_SAY = { 6: "Queue: 4 (there is a different 4). Sandra has flagged this and then un-flagged this and then stood very still.", 3: "Queue: 4. Please do not count the Queue. The Queue is shy about counting.", 9: "Management would like to note that one of the 4 is a hat. Management has not been told which.", 15: "The 4 have started a book club. The book is the Queue. They are on chapter 4 and have asked nobody to spoil it.", 25: "One of the 4 has been promoted. The other 3 were not informed. They are taking it professionally.", 50: "Of the 4, 4 are now managers. Nobody is left to be managed. They have decided to manage the hat." }; const KNOCK = ["Please do not knock. It is a wait.", "The door has been knocked from the inside. This is a first. It is also a second."];
  const NEXT_GERALD = ["NEXT: GERALD", "NEXT: GERALD (FIRE DRILL)", "NEXT: GERALD (FINISHING A THOUGHT)", "NEXT: GERALD (A DIFFERENT POTATO HAS VOLUNTEERED TO BE GERALD)", "NEXT: GERALD (RUNNING 7 1/2 MINUTES LATE, EARLY)", "NEXT: GERALD (SANDRA HAS FLAGGED THE HALLWAY)", "NEXT: GERALD (STUCK IN A DRAWER, EMOTIONALLY)"]; const NEXT_HERE = "NEXT: GERALD (HE IS HERE, HE WAS ALWAYS HERE)";
  const NEXT_SAY = ["Next candidate: Gerald. Gerald is running 7 1/2 minutes late. Gerald is early. Gerald is not a time-based vegetable.", "Gerald has been called. Gerald is finishing a thought. It is a long thought and he is very proud of its length.", "There are 400 potatoes in the waiting room. The fire code allows 7 1/2. The fire code is a vegetable and has been hired."]; const SANDRA = ["Scores must be honest, but not on a Tuesday.", "Questions must be asked in the order they are asked. Per policy.", "Please make eye contact with each of the candidate's 11 eyes. Do not make eye contact with the 12th. It knows.", "Interviewers must not smile at a potato during a Tuesday. Smiling is a commitment.", "No potato may be hired twice, except Gerald, who is, per policy, always hired twice.", "Sweet potatoes are not technically potatoes. Please proceed as though they were. Technically.", "A candidate may be asked any question except the one about Tuesday. Tuesday is the question.", "Rule 7 1/2 does not exist. Please stop looking for it."];
  const SANDRA_SAY = ["Sandra from Compliance has posted a note. It is on the clipboard now. It was always going to be on the clipboard.", "Sandra has added a rule. The rule is that you have already broken it by existing.", "Sandra has sent a memo about the memo. The memo is a single raised eyebrow, attached."];
  const MARGIN = ["The clipboard has noticed that you hold the pen like a decision.", "You have asked {n} questions. {n} is not a number. It is a feeling.", "In the margin, in a hand that is not yours: 'Who is asking?'", "The clipboard was a tree once and is still a bit tree about it.", "The margin has begun to rank your questions by how it felt about them.", "Written in cursive, in the margin: please do not make me a form.", "The clipboard has noticed that you favour card 2.", "The clipboard is not judging. The clipboard is damp.", "This was a good question. Not the question. The tone.", "The clipboard would like to remind you that it has a name. It will not say what it is.", "Please do not ask about the weather. The weather has been asked."]; // lint-ignore
  const RING_CAPTIONS = ["hmm", "you sure?", "noted", "bold", "again?", "sandra says no", "ask me later", "tuesday", "you hold it like a verdict", "i saw that"]; const RING_ENDING = "PLEASE HIRE ME";
  const RING_SAY = "The coffee rings are beginning to resemble a face. The face has opinions. Management did not authorise the face."; const RING_END_SAY = "The coffee rings now spell PLEASE HIRE ME. Nobody wrote that.";
  const FIT_UNITS = ["fit-points", "cubits of fit", "fit, in the abstract", "fits", "units of fit (approx)"]; const METER_SAY = ["Pipeline Health: robust. Pipeline Health has been robust for 14 consecutive interviews, which Management finds slightly worrying.", "Fit Score: 87 fit-points. Out of what? Management is not at liberty to say, and is not certain it ever was.", "Time-to-Hire: negative 3 days. Management is delighted. Management is also, at this time, unsure what day it is.", "Quarterly Spud Headcount: 4,119. Spuds physically on site: 7 1/2. The remainder are working from home, which is also a field."];
  const FINE = ["By being interviewed, the candidate agrees to be hired.", "By interviewing, you agree to be interviewed by the potato you interview. Sandra will be present. Sandra is always present.", "Salary is paid in Meh. Meh is paid in spirit.", "Any resume exceeding 14 inches shall be considered a scroll and treated with respect.", "References may be the soil. The soil may decline.", "Tuesday is not a day. It is a condition.", "7. This line is reserved. It has been reserved since before the reservation.", "Each hired tuber shall be known henceforth as Senior Vice Spud, except Gerald, who is known as Gerald.", "The interviewer may not smile on Tuesdays, Wednesdays that feel like Tuesdays, or in the presence of a clipboard that has sprouted.", "Any candidate may sprout at any time. This is not a failure of the interview.", "Please do not feed the lanyard.", "Fine print not read within 7 1/2 seconds shall be read by Sandra."]; const SQUINT_SAY = { three: "Reading the fine print for 3 seconds pays 0.5 Meh. Sandra has been informed. Sandra approves in the margin.", twenty: "Nobody was meant to see that.", lastPage: "LAST PAGE: a small drawing of a house with a lanyard hanging on the door." };
  const IDLE = {
    hum: "The potato has been waiting for 60 seconds. It has begun to hum something it learned in a cellar.",
    lean: "{name} leans forward. The cursor is now a clipboard. {name} will now interview YOU. Please nod.", // lint-ignore
    rev: [["So. Tell me about your last 90 seconds.", "Your answer was a strong silence. It has been transcribed as a thoughtful, 0-syllable position paper."], ["What would you say is your biggest silence?", "That was an answer. {name} has written 'compelling' next to it, in soil."], ["Where do you see yourself in 5 minutes?", "{name} has taken the silence as a five-year plan and a firm handshake. It has no hands. It shook anyway."], ["Why do you want this chair?", "You did not answer. {name} has taken that as a yes, a no, and a request to sit closer."], ["Describe a time you did nothing under pressure.", "{name} has written down 'right now.' It underlined it. It underlined the underline."], ["How do you handle being looked at?", "By being looked at, apparently. {name} calls this a case study and asks you not to move."], ["Where did you last work, and did it work?", "The silence was a reference. {name} called it. It went to voicemail. The voicemail was also you."], ["Is this your first time being interviewed by a potato?", "No answer has been taken as a no. {name} is relieved. {name} has been in this chair for a very long time."]], // lint-ignore
    nudge: [[20, "{name} has coughed. It is a cough with a clipboard in it."], [35, "{name} is reading your resume upside down. It is more impressed upside down."], [48, "The clock says 4:17. It has said 4:17 for a while. Management wishes to be clear that it is not being helpful."]], // lint-ignore
    deep: [[125, "{name} has turned the chair to face the wall, and then, quietly, back. It was a gesture."], [145, "The wall of hired potatoes is looking at you. They are lanyards. They are not looking. It is a great deal of lanyard."], [165, "Management has checked on you twice. Management is checking on you a third time, now. Management is standing very slightly closer."]], // lint-ignore
    snore: [[215, "{name} is snoring. The snore is shaped like a small, quiet 7 1/2."], [255, "Dennis (Plant) has moved a leaf toward the sleeper. It might be a blanket. It might be a leaf."]], // lint-ignore
    wait: [[420, "{name} has left a note on the clipboard: 'I will wait.' Beneath it, a second note: 'I have not left.'"], [600, "It has been 10 minutes since you did anything. The room has become a different kind of room. It is the kind a person can sit in."]], // lint-ignore
    wrap: "That was three questions to you and zero answers from you. {name} has marked it Strong Yes (Spud) and slid the pen back, still warm.", // lint-ignore
    sleep: "{name} has fallen asleep. Its resume is now a dream. The dream is 14 inches long. Please do not wake the resume.", // lint-ignore
    dream: "A small field. A lanyard. A chair, empty, still warm. The dream does not mention you. It is still a good dream.",
    sprout: "{name} has sprouted. One shoot every 5 seconds. HR is calling it growth.", // lint-ignore
    wake: ["The resume has been disturbed.", "{name} sits up and says it was only resting its eyes, all {n} of them. That is a lot of resting.", "The resume has been disturbed. It has asked to be returned to the dream. There was a lanyard in it."], // lint-ignore
    mutual: "I have been thinking. I would like to interview you."
  };
  const MUTUAL_Q = ["What are you proud of?", "When did you last rest?", "Is there anyone who would be glad you are here?", "Would you like to put something down?", "May I stay with you a while?"]; const MUTUAL_THANKS = ["Thank you.", "I thought so.", "That is good to hear.", "We can put it down here. I will mind it.", "Good."];
  const MUTUAL_END = ["{name} nods. 'That was a good interview. I am hiring you.'", "We did not authorize that. We are keeping the notes."]; // lint-ignore
  const GEOFFREY = ["Geoffrey (not a potato) has climbed out of a hatch in the desk. He has a lanyard. We are going to honour the lanyard.", "Friends. Colleagues. Fellow sedentary objects. I am a rock. I have been a rock for 4 billion years. I still do not have the answers. I have, however, been very patient. Thank you.", "We have no record of Geoffrey. Geoffrey has a lanyard. Geoffrey is hired as Senior Vice Spud (Not A Potato)."];
  const SPAM = {
    t1: ["Spam detected: Question Fatigue Level 1. The potato would like a moment. The potato has not been given one.", "Question Fatigue Level 1. {name} has asked to be asked more slowly. It asked quietly, so as not to be asked again.", "The questions are arriving faster than the answers. The answers are in the hall. They are forming a line.", "Management notes you are asking at a pace usually reserved for fire drills and toddlers. Please slow down, or keep going. Management cannot tell which it prefers."], // lint-ignore
    t2: "ENOUGH.", t2say: ["Management has imposed a Haste Fee of 0.1 Meh. An itemised receipt has been printed. It is mostly the word Haste.", "A Haste Fee of 0.1 Meh has been applied. The fee was in a hurry. It has been charged for that too.", "Haste Fee: 0.1 Meh. The reason is in Appendix H. Appendix H is a sigh.", "A small fee has been taken. It is in a drawer. The drawer has been named after you."], t2yes: ["Yes.", "Yes. Yes.", "Yes. (Please.)", "Yes. (Slowly.)", "Yes. (I am only a potato.)"],
    t3: ["The potato has mashed itself. Management is calling it a bold new format.", "{name} has reached its limit and, with great dignity, gone past it. The result is a mash. The mash is composed.", "Question Fatigue Level 3. {name} is now a mash. Management would like to say it is a beautiful mash. Management is saying it."], // lint-ignore
    milestone: { 25: "You have asked 25 questions. The potatoes have formed a union. The union has one demand and it is a different question.", 50: "50 questions. Management has begun to call you The Interrogator. Management has been asked to stop. It is only whispering it now.", 100: "100 questions. This is the most questions ever asked in this room, including by the room. The room has made a plaque.", 200: "200 questions. At this point the questions are asking you. Management suggests you ask them how they are. They will say fine." },
    taps: ["You have tapped the silence 8 times. A silence cannot be tapped. It can only be waited for, like a sleeping dog, which it is.", "More tapping. The silence has gone to stand in the hall. It said it would come back when you could be still.", "The silence has been tapped so often it has begun to sound like a rhythm. {name} would like to stop clapping along."], // lint-ignore
    knock: { 4: "Four knocks. The Queue has started a pattern. It is a good pattern. It is a request for a different pattern.", 8: "The door has been knocked 8 times. The Queue has knocked back from the other side. Nobody is holding the door. It is just two parties knocking.", 15: "15 knocks. A note has been slid under the door. It says 'Please.' It does not say what for. It is signed by the 4.", 30: "30 knocks. The door has opened. Nothing came in. The door is extremely proud and will be discussing it for weeks." }, t3a: "Security: Please remain calm. Security is a very small potato and is also calm.", t3b: "Security: Please remain calm, and bring butter.",
    lawyer: "The lawyer potato has arrived with a briefcase. The briefcase contains another lawyer potato. He too is hired.",
    lawyer2: "You have asked 17 questions in 4 seconds. The potato has requested a lawyer. The lawyer is also a potato. The lawyer has been hired.",
    fee: "Spam Fee: 2 Meh, refunded in a form. The form is the receipt for the refund form.",
    hired: "The mash has been hired as Senior Vice Mash. The hire has been recorded. The bowl has been very supportive.",
    guard: "A very small security guard has escorted the candidate out. The next candidate is wearing a helmet. It is not required. It is appreciated.",
    helmet: "I was told there might be questions."
  };
  /* the beat timer: a tier is chosen by minutes in the room (normal, weird, unhinged, touching) */
  const BEATS = [
    ["Interview progress is on track. The track is a circle. It is a well-maintained circle.", "Please remember to hydrate the potato. Management means this as policy, not as a suggestion.", "Reminder: you are the only interviewer. This is not a staffing issue. It is a personality.", "Your posture has been noted. Management has no notes on it. Management was asked to say something.", "The pen has been checked for ink. It has ink. Sandra checked it again, found none, and wrote 'ink' in the log anyway.", "Tip from Management: if a candidate says 'Mm.', write 'Mm.' It is called minutes.", "The interview room is 7 1/2 feet wide and 7 1/2 feet deep. The depth is under review.", "Management would like to thank the chair for its service. The chair has declined to comment, on the advice of its legs."],
    ["A memo has gone out about the memo that went out. The memo is fine. The memo asks that you stop describing it as fine.", "The waiting room has been counted twice. It was the same four. They were counted by different hands.", "Sandra has asked whether the potatoes are being treated equally. Management said yes. Management has not met them equally.", "The clipboard has asked for a raise. It was told the raise is in the form of a clip.", "The Meh in your account is being held in trust for a version of you who will spend it wisely.", "Please do not make eye contact with the ceiling. The ceiling has been reviewed. The ceiling is thriving.", "It is now Wednesday in the east wing of the building. The east wing has been asked to stay calm about it.", "Dennis (Plant) has been seen looking at your clipboard. Dennis (Plant) cannot read. Dennis (Plant) read it."],
    ["Form 27B/6 has been sent for approval to Form 27B/5, which approved it on a Thursday that was later removed from the calendar.", "A third-party audit of this interview has begun. The auditor is the second chair. It is a very quiet audit.", "The Queue has asked to be interviewed. The Queue is not a potato. It is a feeling in a line. It has been placed on the list.", "Your Meh has been invested in a fund called Tuesday. The fund is up. The fund has never opened.", "Management has been informed that this meeting has no agenda. Management is delighted to have been present for all of it.", "All potatoes have been asked to remain hired for the duration of the hire. The duration is under review.", "The 7 1/2th floor has been mentioned. It was mentioned quietly. It has been forwarded to Sandra, who already knew.", "Please be advised: this room has been decommissioned. It will continue to be used. The decommission is symbolic. The room has been told."],
    ["You have been here a while. Management has noticed. Management is not saying anything. Management is just standing nearer.", "For the record, nobody has ever hired this many potatoes this carefully. The potatoes know. They have not said. They are potatoes.", "It is a good room. It has always been a good room. Management would like to say that before the next one.", "The wall of potatoes is getting long. Dennis has begun to call it the family.", "This is the part where Management would say something wise. Management has a note. The note says 'Be nice to the potatoes.' Management has done that.", "Management is going to sit with the Toaster for a while. You are doing fine. Please carry on as though nothing was said.", "Everything is fine. Please resume the interview. The potato in the chair has been the same one the whole time.", "Nothing has happened. Please resume normal operations. The operations were never abnormal. They were only very, very warm."]
  ];
  const PHONE = ["Hello, I am calling as a reference for {name}. I have known {name} for the length of one chair. It was a good chair.", "This is the Soil. Yes. I remember {name}. A lot of dark, and then {name} was gone. I am happy for {name}.", "I was {name}'s previous manager. I am not allowed to say anything. I am saying that I am not allowed.", "I have worked with {name} for years. I have never seen {name} work. It is a remarkable discipline.", "Yes, speaking. Is this about the lanyard? I have nothing to add to the lanyard.", "This is the Stapler, on behalf of Local 1. {name} is cleared to be hired. {name} is not cleared to be stapled. Thank you.", "I would like to give a reference but I have forgotten for whom. It was a potato. They were good.", "{name} is a team player. I am the team. I have been waiting for someone to ask me.", "Hello? Sorry. Wrong potato. Please stay on the line, I think I have the right one now. No. The same one.", "This is Sandra from Compliance. Sandra has no comment. Sandra is commenting now. It was 'adequate.'"]; // lint-ignore
  const PHONE_RING = ["The phone is ringing. It is a reference. It has been ringing since before you sat down.", "A reference is calling. It has been put on hold by itself. It is holding.", "The phone has rung. Management did not install a phone. Management has decided to be supportive of it."]; const PHONE_MISS = ["The phone has stopped ringing. It would like you to know it is not upset. It has made a note of the not being upset.", "The phone rang 11 times. Management counted. Management has been counting since 1996, quietly, in a drawer."];
  const TUESDAY = ["The lights have flickered. It is not Tuesday. Management would like everyone to stay exactly as they are.", "For one second the clock said Tuesday. It has since said 4:17. The clock is lying in the other direction.", "Something stood in the doorway for a moment. It was the Queue. The Queue says it was not it.", "Tuesday has been sighted at a distance. It was not coming for you. It was coming for the fourth quarter.", "Nobody has said Tuesday. The potato has begun to hum. It is not in the key of Tuesday. It is in the neighbourhood."];
  const CAKE = { say: "It is the 3-minute mark. The position is 3 minutes old and has never been filled. Management has brought a cake. Management does not know whose it is.", wish: "{name} has blown out the candle and made a wish. It was the same wish as last year. {name} was not here last year.", miss: "The cake has been eaten by a committee of one. The committee has a crumb on its chin and an alibi.", sticky: "Cake is not a policy. Cake has been grandfathered in. - S.", sign: "NEXT: GERALD (HAS HEARD ABOUT THE CAKE)" }; // lint-ignore
  const REV10 = { head: "You have now been in this role for 10 minutes. HR requires a review at 10 minutes. Nobody has reached it. HR is as surprised as you are.", rows: ["Questions asked: {a}. Rating: Outstanding.", "Silences held: {b}. Rating: Outstanding. The silences have been returned to the shelf.", "Potatoes hired: {c} of {c}. Rating: Outstanding. Rating of the other potatoes: also hired.", "Meh on hand: {d}. Rating: Outstanding, in the sense of owed."], by: "Reviewed by: Barry's lanyard, the only attendee.", all: "Overall: Outstanding (Provisional). The provisional part is the weather, and also you.", goal: "Goals for next quarter: remain. Please do not set a goal for the quarter after. It has been taken.", after: "The review was written by every potato you hired, collectively and individually. They said the same thing. It was lovely.", back: "Welcome back. Your ten-minute review is still in effect. It does not expire. It does not renew. It is simply yours." }; // lint-ignore
  const CLOCK = { 1: "The clock says 4:17. It has said 4:17 since before it was a clock.", 4: "It is still 4:17. The clock has been asked four times. It will not be asked a fifth time without a lawyer.", 8: "The clock ticks louder, to show it is working. It is working. It is working at 4:17.", 12: "Please stop asking the clock. It has told you. It is not telling you again. It is telling you the same thing.", 17: "You have asked the clock 17 times. The clock has changed its mind. It is now 4:18. This is the biggest event in company history. Nobody saw it. It was one minute.", after: ["The clock is now 4:18. It is being very brave about it.", "4:18. The clock does not know what to do with the extra minute. It is holding it like a hat.", "The clock would like to be left at 4:18. It has earned it."] }; const TAGS = { 3: "Eyes: {n} (confirmed again). Starch: still sufficient. Gravitas: still pending. It has been pending since you first asked.", 6: "You have read the name tag 6 times. The name tag has asked for privacy. The privacy is also pending.", 10: "The name tag has gone blank. It will return when it feels read." }; // lint-ignore
  const CB = { toaster: "The Toaster has done this before, in a different room, in a different argument. It has brought its notes. They are crumbs.", dennis: "Dennis has met you before, in a smaller office. He was thriving then. He was also leaning. It is all on file.", stapler: "The Stapler's union has asked that the hire be stapled. It asked in four places and received no answer in any of them.", sock: "The Sock says it has been seen elsewhere in the building and was not lost there either. It was working." };
  const ENDING = {
    blank: "The clipboard is blank. The clipboard would like to ask you something.", card: "Do you have any questions for us?",
    congrats: "Congratulations, Valued Employee. You have filled every position. A total of 1 of 1.",
    sincere: "I would like to say something sincere before the next candidate. I am proud of this process. I do not know what it is for. That is what makes it ours.",
    cert: "SENIOR VICE SPUD OF THE YEAR (SHARED BY ALL)", certFoot: "Presented to: nobody. Received by: nobody. Framed by: Dennis.",
    certSay: "A certificate has been printed and handed to nobody. Nobody has accepted it graciously.",
    gerald: "Gerald has stood. Gerald has bowed. Gerald has sat in the chair that was already his.",
    door: "NOW HIRING: YOU (INTERVIEW: TUESDAY)", doorSay: "Management hopes this is not an inconvenience. Management is looking forward to it.",
    you: "You have also been hired, as Senior Vice Spud (Player). You were hired at the start. Please check your lanyard.",
    barry: "Barry has walked in again with a fresh resume. It reads exactly the same. His badge is the only thing about him that has not changed.",
    prev: "Per my previous message, the position is open.",
    cards: "The clipboard has dealt three fresh cards. One of them says Tell me about yourself, in your own name.",
    open1: "Positions open: 1. It was never going to be filled. It was always going to be fine.",
    pipeline: "Congratulations. You have interviewed every potato. Please wait here while we find more."
  };
  /* extra material written for this module (same voice, same rules) */
  const QUIPS = ["Noted. Management has noted the note. Management is now two notes behind and does not expect to catch up.", "That answer has been filed under Potato, subheading Also Potato.", "Interview progress: 40 percent. The other 60 percent is the potato.", "Sandra would like it on record that she was not consulted and was present.", "The clipboard has made a small mark. It is either a tick or a sprout.", "A strong answer. Management could not say to what. Management is moved by the confidence.", "Please keep your face neutral. The potato can tell when you are neutral on purpose.", "That was a question and an answer. A meeting needs a third thing. Management has ordered one. It is in the hall.", "Noted. The note has been filed in a drawer labelled Notes. The drawer is also a note.", "Management would like to remind you that the stamp does not need your help. It appreciates it.", "That was a thorough answer. It was thorough the way weather is thorough.", "The answer has been read aloud to an empty room. The room had no objections. The room was hired in March.", "Management paused to let that land. It has landed. It is in the corner. It is fine.", "A follow-up question has occurred to Management. It has since un-occurred. Management is not upset.", "The potato held eye contact for 3 seconds. Management counted 4. Management is being generous with the potato.", "Please do not take notes. Management is taking notes on your note-taking. It is going well.", "Interview quality: high. Interview quantity: also high. Interview purpose: handled elsewhere.", "Sandra has read the transcript and calls it the best interview she did not attend."];
  const ENTRANCES = ["{name} sits down. The chair keeps going for a while.", "{name} adjusts. The chair does not.", "{name} has arrived. The chair has been informed.", "{name} places a resume on a knee that does not exist.", "{name} looks at you with all of the available face.", "{name} is seated. It is a small potato in a large decision.", "{name} enters by a method Management would describe as arriving.", "{name} sits. The chair has a second thought, then a third.", "{name} has taken a seat and a deep breath. Both have been logged."]; // lint-ignore
  const PLEASANTRY = ["A pleasantry has been missed. It has been logged. It was a small one.", "The ceremony was skipped. The ceremony understood. The ceremony went and sat in the hall and did not make it weird.", "You skipped the pleasantries. They were only 3 seconds. They were the 3 seconds in which {name} had planned to be moved."]; // lint-ignore
  const SOCK_Q = [
    { q: "Where were you on the evening of the last Tuesday?", o: ["Here, mostly.", "Elsewhere, specifically.", "Between two things."] },
    { q: "Do you have experience being found?", o: ["Some. It was brief.", "Regrettably, yes.", "I was only ever lost in a pleasant way."] },
    { q: "Would you describe yourself as one of a pair?", o: ["Yes. The other is on a journey.", "No. I am a set of one.", "Both, depending on the drawer."] }
  ];
  const SOCK_HOBBY = ["sitting", "being asked", "Tuesday (aspirational)"]; const FIRST = ["Gerald", "Brenda", "Dolores", "Walt", "Ottoline", "Gus", "Maud", "Clive", "Bernadette", "Trevor", "Ignatius", "Tilly", "Norbert", "Winifred", "Hector", "Sir Reginald Tuber the Third", "Trevor's Cousin (Also Trevor)", "A Different Gerald"].slice(1);
  const KINDS = ["Russet", "Yukon Gold", "Fingerling", "Red Bliss", "Purple", "Unclear"]; const FILLS = { Russet: '#a47148', 'Yukon Gold': '#d9b36a', 'Red Bliss': '#b5524a', Purple: '#8b6bb1', Fingerling: '#c99b64', Unclear: '#9a9a7a' };
  const QUIRKS = [{ delay: 2500 }, { prefix: 'The tuber would say: ' }, { prefix: 'Per my previous message: ' }, { suffix: ' (whispered)' }, { prefix: '*sigh* ' }, {}, {}]; const WALLC = ['#e6b422', '#f07f6e', '#bda7e0', '#a8dcc0', '#7ec8e8', '#e58b3a', '#d9b36a', '#b5524a'];
  const FACEPOS = [[28, 34], [72, 34], [50, 70]];
  const CBG = { barry: ["Barry has returned with a new title and the same lanyard. The lanyard has been upgraded. It now has seniority.", '(Again)'], toaster: ["The Toaster is back and has asked for toast. It asked in writing. The writing is toast.", '(Re-Toasted)'], marjorie: ["Marjorie T. Russet has returned from the drawer. The drawer has been very understanding about it.", '(Returning)'] }; const TAKEOVER = "Sandra's notes have taken over the clipboard. Please peel them to read them. They were not meant to be read. They are on top of the questions, which is where notes go."; const PEEL = [["SANDRA: NO QUESTION MAY BE ASKED UNDER A NOTE.", "Sandra has posted a rule: no question may be asked under a note. The rule is the note. Peel it to read the rule."], ["SANDRA: THE PREVIOUS NOTE HAS BEEN WITHDRAWN.", "Sandra has withdrawn the previous rule. Sandra has not withdrawn the note. Sandra is considering withdrawing Sandra."], ["SANDRA: ON LEAVE. PLEASE DISREGARD SANDRA. - SANDRA", "Sandra is on leave. Please disregard Sandra. - Sandra. (Sandra has left a note about the leave. It is under the other note.)"]];

  P.registerModule({
    id: 'potato-interview',
    title: 'Interview a Potato',
    tagline: 'Rigorous hiring. Every candidate is hired as Senior Vice Spud.',
    icon: '🥔',
    category: 'game',
    unlockCost: 0,
    tags: ['interview', 'clipboard', 'potato'],
    mount(root, api) {
      const el = api.el;
      const RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || !!(root.closest && root.closest('.pm-reduce-motion'));
      const Z = api.selftest ? 30 : 1;
      const QT = api.selftest ? 0.08 : 1;
      const clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
      const f1 = function (x) { return isFinite(x) ? x.toFixed(1) : '0.0'; };
      const hashOf = function (s) { let h = 7; s = String(s); for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0; return h >>> 0; };
      const inch = function (x) { return Math.floor(x) + (x % 1 ? ' 1/2' : ''); };
      const h = function (tag, cls, attrs) {
        const a = Object.assign({ class: cls ? cls.split(' ').map(function (c) { return K + c; }).join(' ') : '' }, attrs || {});
        return el.apply(null, [tag, a].concat(Array.prototype.slice.call(arguments, 3)));
      };

      /* ------------------------------------------------ save */
      const sv = (function () {
        const d = api.save.get('v1', null) || {};
        const num = function (x) { return typeof x === 'number' && isFinite(x) && x >= 0 ? Math.floor(x) : 0; };
        const o = { v: 1, hired: [], total: num(d.total), hires: num(d.hires), fine: [], sessions: num(d.sessions), sorry: !!d.sorry, sponge: !!d.sponge, rocks: num(d.rocks), sweet: num(d.sweet), soilNote: !!d.soilNote };
        if (Array.isArray(d.hired)) o.hired = d.hired.filter(function (x) { return x && typeof x.n === 'string'; }).slice(-60).map(function (x) { return { n: x.n.slice(0, 40), h: num(x.h), t: typeof x.t === 'string' ? x.t.slice(0, 60) : 'Senior Vice Spud' }; });
        if (Array.isArray(d.fine)) o.fine = d.fine.filter(function (x) { return Number.isInteger(x) && x >= 0 && x < FINE.length; }).slice(0, FINE.length);
        return o;
      })();
      function persist() { api.save.set('v1', sv); }

      /* ------------------------------------------------ state */
      const S = {
        phase: 'boot', epoch: 0, n: 0, hs: 0, cid: 0, cand: null, c: { asks: 0, over: 0, cu: [0, 0], eyes: new Set(), q0: false }, inputs: 0, answers: 0, stamped: false, asked: 0,
        cards: [null, null, null], qb: [], ri: 0, rl: [], lastInput: api.now(), hidden: false, hiddenAt: 0, humDone: false, secs: 0, spam: [], mT: [], t1At: 0, t2At: 0, yesUntil: 0,
        mashN: 0, gary: false, helmet: false, post: false, endedOnce: false, endingDue: false, flipped: false, gv: 0, geo: { stage: 0, count: 0 }, winkN: 0, tgt: 0, rings: 0,
        sq: 0, sqRes: 0, sqPaid: false, sqStat: 0, lens: false, lensLast: 0, house: false, noSweet: 0, lastName: '', lastKind: '', q0n: 0, vs: [], rz: [], rzState: 'm', qualN: 0,
        full: '', ti: 0, tt: 0, raf: 0, ov: '', geoPending: false, signOld: [], signB: '', signAi: -1, lastWall: 0, efan: false, lastRev: 0, sleepers: 0, mu: 0, fq: 0, ceTimer: 0, sandraN: 0, touchOk: false, pm: 0, pmRaf: 0, px: 0, py: 0, thinkHeld: 0, cn: 0,
        usedA: new Set(), pend: false, tk: 0, peeled: 0, ceAt: 0, lastSay: 0, evT: 0, evk: '', phoneAt: -1e9, tueAt: -1e9, threeDone: false, cakeAt: -1e9, tenDone: false, clk: 0, knockN: 0, taps: [], nst: 0, tagN: 0, idleF: {}, idleL: 0
      };
      const bags = {};
      function mkbag(arr) {
        let q = [], last = null;
        return { next: function () {
          if (!q.length) { q = api.shuffle(arr.slice()); if (q.length > 1 && q[q.length - 1] === last) q.unshift(q.pop()); }
          last = q.pop(); return last;
        } };
      }
      function nx(key, arr) { return (bags[key] || (bags[key] = mkbag(arr))).next(); }
      function T(t, o) {
        const c = S.cand;
        const d = Object.assign({ p: api.player.name, name: c ? c.short : '', n: '', s: '', k: '' }, o || {});
        return String(t == null ? '' : t).replace(/\{(\w+)\}/g, function (m, k) { return d[k] == null ? '' : String(d[k]); }).replace(/\s{2,}/g, ' ').trim();
      }
      function M(text, mood, pri, who, o) {
        const t = T(text, o);
        if (!t) return false;
        S.lastSay = S.secs;
        const op = { mood: mood || 'neutral', priority: pri == null ? 0 : pri };
        if (who) op.who = who;
        return api.say(t, op);
      }
      function stat(name, n) { api.stat.inc(SN + name, n == null ? 1 : n); }
      function after(ms, fn) { const e = S.epoch; return api.setTimeout(function () { if (e === S.epoch) fn(); }, Math.max(1, Math.round(ms * QT))); }
      function later(ms, fn) { return api.setTimeout(fn, Math.max(1, Math.round(ms * QT))); }

      /* ------------------------------------------------ DOM */
      const W = h('div', 'root');
      root.appendChild(W);
      W.innerHTML = `<div class="${K}wrp"> <!-- lint-ignore -->
<div class="${K}wall"><span class="${K}wl">HEADCOUNT WALL</span><span class="${K}wrow" data-r="wall"></span></div>
<div class="${K}main">
<section class="${K}stage" data-r="stage" aria-label="Interview room">
<div class="${K}top"><div class="${K}poster" aria-hidden="true"><b>MANDATORY FUN</b>7 1/2 reasons to be hired</div><button type="button" class="${K}clock" data-a="clock" data-r="clock" aria-label="Wall clock. It says 4:17."><i></i><i></i></button>
<div class="${K}doorbox"><span class="${K}dl">WAITING ROOM (7 1/2 potatoes)</span><button type="button" class="${K}door" data-a="door" data-geo="door" aria-label="Door sign. Knock."><span class="${K}peep"><i></i></span><span class="${K}sign"><span data-r="signold"></span><b data-r="signa"></b><b data-r="signb"></b></span></button></div></div>
<div class="${K}mid" data-r="mid"><div class="${K}gauge" data-r="gauge" aria-hidden="true"><i data-r="gfill"></i><u style="bottom:20%">2</u><u style="bottom:40%">4</u><u style="bottom:70%">7</u><u style="bottom:calc(100% - 12px)">10</u></div>
<div class="${K}chair" data-geo="chair"><b class="${K}cback"></b><b class="${K}cseat"></b><b class="${K}leg"></b><b class="${K}leg"></b></div><div class="${K}hatch" data-r="hatch"></div>
<div class="${K}cand" data-r="cand"></div><div class="${K}slip" data-r="slip" aria-hidden="true"></div><div class="${K}verdict" data-r="verdict" aria-hidden="true"></div><div class="${K}enough" data-r="enough" aria-hidden="true">ENOUGH</div>
<div class="${K}badge" data-r="badge" aria-hidden="true"></div><button type="button" class="${K}tag" data-a="tag" data-r="tag"></button>
<div class="${K}dennis" data-r="dennis" aria-hidden="true"><i></i><i></i><i></i><u></u><em></em></div><div class="${K}sec" data-r="sec" aria-hidden="true">&#129506;</div><button type="button" class="${K}evt" data-a="evt" data-r="evt" hidden aria-label="Event"></button></div>
<div class="${K}bubble" data-r="bubble" data-a="bubble"><b data-r="who"></b><span data-r="txt"></span><em data-r="rnew" aria-hidden="true"></em></div><div class="${K}log" aria-live="polite" data-r="log"></div>
<div class="${K}srow"><button type="button" class="${K}stare" data-a="stare" data-r="stare" aria-keyshortcuts="Space">STARE</button><span class="${K}hint">Hold <span class="${K}kb">Space (or hold </span>STARE<span class="${K}kb">)</span> to create an Awkward Silence.</span></div>
</section>
<section class="${K}board" data-r="board"><i class="${K}clip"></i><div class="${K}paper" data-r="paper"><div class="${K}rings" data-r="rings" aria-hidden="true"></div>
<h3 class="${K}fh">INTERVIEW FORM 27B/6 (Request for Form 27B/7)</h3>
<div class="${K}qs" data-r="qs"></div><div class="${K}cov" data-r="cov"></div><div class="${K}q0" data-r="q0"></div><div class="${K}margin" data-r="margin"></div><div class="${K}qual" data-r="qual"></div>
<div class="${K}eval" data-r="evl"><button type="button" class="${K}ev" data-a="score" data-k="S" aria-keyshortcuts="S">&#9744; Strong Yes (Spud)<kbd>S</kbd><i class="${K}ink"></i></button><button type="button" class="${K}ev" data-a="score" data-k="T" aria-keyshortcuts="T">&#9744; Yes (Technically)<kbd>T</kbd><i class="${K}ink"></i></button><button type="button" class="${K}ev" data-a="score" data-k="W" aria-keyshortcuts="W">&#9744; Yes (Warmly)<kbd>W</kbd><i class="${K}ink"></i></button><button type="button" class="${K}nobox" data-a="no" aria-label="No" aria-keyshortcuts="N">No</button></div>
<div class="${K}rub" data-r="rub" hidden><label>Gut Feeling Index (scale: -3 to 11; 10 is not the top)<input type="range" min="-3" max="11" step="0.5" value="5" data-r="slider"></label><div class="${K}total" data-r="total">Total: Outstanding</div></div>
<div class="${K}panelrow" data-r="panelrow" hidden>Direct Question: <button type="button" data-a="tgt" data-k="0" aria-pressed="true">Colleen</button><button type="button" data-a="tgt" data-k="1" aria-pressed="false">Desmond</button></div>
<div class="${K}decide" data-r="decide"><button type="button" class="${K}bt ${K}hire" data-a="hire" aria-keyshortcuts="H">HIRE<kbd>H</kbd></button><button type="button" class="${K}bt ${K}nohire" data-a="nohire" aria-keyshortcuts="D">DO NOT HIRE<kbd>D</kbd></button><button type="button" class="${K}bt ${K}think" data-a="think" data-r="think" aria-disabled="true" aria-keyshortcuts="X"><span class="${K}hg">&#9203;</span> <span>NEED MORE TIME<kbd>X</kbd></span></button></div>
<div class="${K}stickies" data-r="stickies"></div></div></section>
</div>
<section class="${K}resume" data-r="resume" data-geo="resume"><div class="${K}holes"></div><div class="${K}rbody"><div class="${K}rhead"><b>RESUME</b><button type="button" class="${K}rt" data-a="rtoggle" aria-keyshortcuts="R" aria-label="Toggle full resume">R</button></div><ul class="${K}rlist" data-r="rlist"></ul>
<div class="${K}fine" data-r="fine"><div class="${K}fb" data-r="fb"></div><div class="${K}fz" data-r="fz" aria-hidden="true"></div></div></div></section>
<section class="${K}strip"><button type="button" class="${K}vslot" data-a="vslot" data-r="vslot">VERDICT<b data-r="vtxt">HIRED</b></button><div>Workforce Synergy<div class="${K}bar"><i data-r="syn"></i></div></div>
<button type="button" data-a="met" data-k="0">POSITIONS FILLED<b data-r="filled"></b>POSITIONS OPEN: 1</button><button type="button" data-a="met" data-k="1">CANDIDATE FIT SCORE<b data-r="fit"></b></button><button type="button" data-a="met" data-k="2">TIME-TO-HIRE<b data-r="tth"></b></button><button type="button" data-a="met" data-k="3">QUARTERLY SPUD HEADCOUNT<b data-r="head"></b></button></section>
</div><div class="${K}ov" data-r="ov" hidden></div>`;
      const R = {};
      Array.prototype.forEach.call(W.querySelectorAll('[data-r]'), function (n) { R[n.getAttribute('data-r')] = n; });
      { const w0 = root.getBoundingClientRect().width; S.rzState = w0 && w0 < 420 ? 'n' : w0 > 900 ? 'w' : 'm'; }
      const evBtns = W.querySelectorAll('[data-a="score"]');
      const cl = function (n, c, on) { n.classList.toggle(K + c, !!on); };
      R.slider.setAttribute('aria-valuetext', 'Outstanding');
      if (api.flag.get('plantClicked')) cl(R.dennis, 'tied', true);
      api.setTitle('Interview a Potato (Form 27B/6)');

      /* ------------------------------------------------ typewriter bubble */
      function finishTyping() { if (S.tt) { api.clearInterval(S.tt); S.tt = 0; } R.txt.textContent = S.full; }
      function speak(text, who) {
        finishTyping(); R.rnew.textContent = '';
        const t = T(text);
        if (!t) return;
        R.who.textContent = who || (S.cand ? S.cand.short : '');
        S.full = t; R.log.textContent = t;
        if (api.selftest || RM) { R.txt.textContent = t; return; }
        R.txt.textContent = ''; S.ti = 0;
        S.tt = api.setInterval(function () { S.ti++; R.txt.textContent = S.full.slice(0, S.ti); if (S.ti >= S.full.length) finishTyping(); }, 28);
      }

      /* ------------------------------------------------ SVG pieces */
      function potatoSVG(c) {
        const hs = hashOf(c.name), f = c.fill, big = c.eyes > 0;
        let bl = '', sp = '';
        for (let i = 0; i < 6; i++) bl += `<circle cx="${30 + ((hs >>> (i * 3)) % 140)}" cy="${104 + ((hs >>> (i * 2 + 1)) % 46)}" r="${2 + ((hs >>> i) % 4)}" fill="#000" opacity=".13"/>`;
        const ph = c.philo;
        for (let i = 0; i < c.eyes; i++) {
          const ang = i * 2.39996 + (hs % 7) / 7, rad = 0.62 + ((i * 37 + hs) % 5) * 0.07;
          let x = 100 + Math.cos(ang) * rad * 80, y = 88 + Math.sin(ang) * rad * 62;
          if (y > 55 && y < 112 && Math.abs(x - 100) < 48) y = Math.sin(ang) >= 0 ? 128 + (i % 3) * 5 : 38 + (i % 3) * 4;
          if (y <= 50 || y >= 125) x = clamp(x, 60, 140);
          sp += `<circle class="${ph ? K + 'spot' : ''}" ${ph ? 'data-a="spot" data-k="' + i + '"' : ''} cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.2" fill="#6b4423"/>` + (ph ? `<circle class="${K}spot" data-a="spot" data-k="${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="transparent"/>` : '');
        }
        if (ph) sp += `<circle class="${K}spot" data-a="spot" data-k="12" cx="100" cy="153" r="5" fill="#6b4423" opacity="${c.twelfth ? 0.35 : 0}"/>`;
        return `<svg viewBox="0 0 200 170" aria-hidden="true"><path d="M100 12 C160 6 192 52 184 98 C176 146 130 164 96 162 C52 160 10 138 14 90 C18 44 50 16 100 12Z" fill="${f}" stroke="#2a1d12" stroke-width="3"/><ellipse cx="68" cy="46" rx="34" ry="15" fill="#fff" opacity=".2" transform="rotate(-18 68 46)"/>${bl}${sp}` +
          (big ? `<ellipse data-a="eyeL" data-eye="L" cx="72" cy="76" rx="15" ry="17" fill="#fff" stroke="#2a1d12" stroke-width="2.5"/><ellipse data-eye="R" cx="128" cy="76" rx="15" ry="17" fill="#fff" stroke="#2a1d12" stroke-width="2.5"/><ellipse class="${K}pup" cx="72" cy="79" rx="6" ry="7" fill="#2a1d12"/><ellipse class="${K}pup" cx="128" cy="79" rx="6" ry="7" fill="#2a1d12"/>` : '') + '</svg>';
      }
      function dennisSVG() {
        let lv = '';
        [-52, -26, 0, 26, 52].forEach(function (a, i) { lv += `<g transform="rotate(${a} 100 112)"><path class="${K}leaf" style="animation-delay:${i * 0.4}s" d="M100 112 C70 76 66 40 86 14 C104 38 112 76 100 112Z" fill="#4a9a4c" stroke="#2a1d12" stroke-width="3"/></g>`; });
        return `<svg viewBox="0 0 200 170" aria-hidden="true">${lv}<path d="M62 112 L138 112 L124 162 L76 162Z" fill="#c4683e" stroke="#2a1d12" stroke-width="3"/><rect x="56" y="104" width="88" height="14" rx="3" fill="#d9794a" stroke="#2a1d12" stroke-width="3"/></svg>`;
      }
      const rockSVG = function () { return '<svg viewBox="0 0 200 170" aria-hidden="true"><path d="M26 140 C16 100 48 56 92 50 C132 44 176 64 182 106 C186 138 152 158 100 158 C60 160 32 152 26 140Z" fill="#8d8a86" stroke="#2a1d12" stroke-width="3"/><ellipse cx="70" cy="70" rx="28" ry="10" fill="#fff" opacity=".2"/><circle cx="84" cy="100" r="4" fill="#2a1d12"/><circle cx="122" cy="100" r="4" fill="#2a1d12"/></svg>'; };
      const heapSVG = function () { return `<svg viewBox="0 0 200 170" aria-hidden="true"><circle cx="72" cy="104" r="40" fill="#e8d38c" stroke="#2a1d12" stroke-width="3"/><circle cx="116" cy="92" r="46" fill="#efdc9a" stroke="#2a1d12" stroke-width="3"/><circle cx="142" cy="110" r="32" fill="#e8d38c" stroke="#2a1d12" stroke-width="3"/><path d="M14 118 H186 C182 156 142 168 100 168 C58 168 18 156 14 118Z" fill="#e7e0d0" stroke="#2a1d12" stroke-width="3"/><circle cx="60" cy="150" r="5" fill="#e8d38c"/><circle cx="150" cy="156" r="4" fill="#e8d38c"/></svg>`; };
      function candMarkup(c) {
        const mouth = `<i class="${K}mouth" data-m="smile"></i>`;
        let inner;
        if (c.type === 'toaster') inner = `<div class="${K}toaster"><b></b><b></b><span class="${K}toast">&#127838;</span><em>TOAST-O-MATIC</em></div>`;
        else if (c.type === 'dennis') inner = dennisSVG();
        else if (c.type === 'rock') inner = rockSVG();
        else if (c.type === 'heap') inner = heapSVG();
        else if (c.type === 'panel') inner = '<div class="' + K + 'parts">' + c.parts.map(function (p, i) { return `<button type="button" class="${K}part" data-a="tgt" data-k="${i}" aria-label="Direct questions to ${p.short}" aria-pressed="${i === S.tgt}">${potatoSVG(p)}${mouth}</button>`; }).join('') + '</div>';
        else inner = potatoSVG(c) + mouth;
        let extra = `<div class="${K}lan ${c.lan ? '' : K + 'off'}"><i></i><b>HIRED</b></div><i class="${K}sw ${K}sw1"></i><i class="${K}sw ${K}sw2"></i><i class="${K}sw ${K}sw3"></i><span class="${K}zzz">Z</span><span class="${K}zzz">Z</span><span class="${K}zzz">Z</span><div class="${K}sprouts"></div>`;
        if (c.type === 'gerald' || (c.type === 'dennis' && api.flag.get('plantClicked'))) extra += `<i class="${K}tie"></i>`;
        if (c.deco === 'trench') extra += `<span class="${K}deco ${K}coat">&#129509;</span>`;
        if (c.deco === 'hat') extra += `<span class="${K}deco ${K}hat">&#127913;</span>`;
        if (c.deco === 'plusone') extra += `<span class="${K}deco ${K}plus">${potatoSVG({ name: 'plus', fill: '#d9b36a', eyes: 2 })}</span>`;
        if (c.helmet) extra += `<span class="${K}deco ${K}helm">&#9937;&#65039;</span>`;
        return inner + extra;
      }
      function setMouth(m) { Array.prototype.forEach.call(R.cand.querySelectorAll('.' + K + 'mouth'), function (n) { n.setAttribute('data-m', m); }); }

      /* ------------------------------------------------ phase machine */
      function setPhase(p) {
        S.phase = p; S.epoch++; S.ce = null; S.pend = false;
        holdReset(); hideOv(); hideEvt();
        cl(R.stage, 'lean', false);
        if (p !== 'asleep') cl(R.cand, 'asleep', false);
        if (p !== 'reverse') cl(R.cand, 'lean', false);
      }
      function showOv(node, cls) { R.ov.textContent = ''; R.ov.appendChild(node); R.ov.hidden = false; S.ov = cls || 'x'; const fb = node.querySelector && node.querySelector('button'); if (fb) { try { fb.focus({ preventScroll: true }); } catch (x) { /* ignore */ } } }
      function hideOv() { if (R.ov) { R.ov.hidden = true; R.ov.textContent = ''; cl(R.ov, 'mini', false); } S.ov = ''; }
      function shake() { if (RM) return; cl(R.stage, 'shake', true); api.setTimeout(function () { cl(R.stage, 'shake', false); }, 160); }

      /* ------------------------------------------------ wall, sign, meters, resume, cards */
      function renderWall() {
        R.wall.textContent = ''; cl(W, 'nohires', !sv.hires);
        const shown = sv.hired.slice(-24);
        if (!shown.length) R.wall.appendChild(h('span', '', {}, 'No one hired yet (everyone, soon).'));
        shown.forEach(function (x, i) {
          const b = h('button', 'wb', { type: 'button', 'data-a': 'wall', 'data-i': i, title: x.n, 'aria-label': 'Review for ' + x.n, style: { '--c': WALLC[hashOf(x.n) % WALLC.length], '--d': (i * 0.06) + 's' } }, /vice mash|counsel/i.test(x.t) ? '🥣' : '🥔', h('i'));
          R.wall.appendChild(b);
        });
        if (sv.hires > 24) R.wall.appendChild(h('span', '', {}, T(ORG_LINES[2], { n: api.fmt(sv.hires - shown.length) })));
      }
      function queueIdx() { let r = 0; QUEUE.forEach(function (q, i) { if (sv.hires >= q[0]) r = i; }); return r; }
      function paintSign() {
        const qi = queueIdx();
        R.signa.textContent = QUEUE[qi][1];
        R.signb.textContent = S.signB;
        R.signold.textContent = '';
        S.signOld.forEach(function (t) { R.signold.appendChild(el('s', { text: t })); });
        R.signold.style.display = 'block';
      }
      function setSignB(t) { if (t === S.signB) return; if (S.signB) { S.signOld.push(S.signB); while (S.signOld.length > 2) S.signOld.shift(); } S.signB = t; paintSign(); }
      function paintMeters() {
        R.filled.textContent = api.fmt(sv.hires);
        R.head.textContent = api.fmt(4119 + 61 * sv.hires);
        R.syn.style.width = (8 + (sv.hires * 13) % 92) + '%';
        R.tth.textContent = '-' + (3 + Math.floor(S.secs / 7)) + ' days';
      }
      function renderResume() {
        const c = S.cand;
        R.rlist.textContent = '';
        if (!c) return;
        const head = c.type === 'unnamed' ? '(No resume.)' : (c.type === 'panel' ? 'Colleen, Fingerling, and Desmond, Yukon Gold.' : c.short + ', ' + c.kind + '.') + ' Resume length: ' + inch(c.inches) + ' inches.';
        R.rlist.appendChild(el('li', { text: head }));
        const body = S.rl, extra = Math.max(0, body.length - 14);
        if (extra) R.rlist.appendChild(el('li', { text: '... and ' + extra + ' more years' }));
        body.slice(extra).forEach(function (t, i, a) { R.rlist.appendChild(el('li', { text: t, style: i === a.length - 1 ? '' : 'animation:none' })); });
      }
      function reveal() {
        const c = S.cand;
        if (!c) return;
        const line = S.ri < c.resume.length ? c.resume[S.ri] : nx('res', RESUME);
        S.ri++; S.rl.push(line); renderResume();
        if (S.phase === 'ask') R.rnew.textContent = 'Resume +1: ' + line;
        if (c.type === 'gerald' && line === GERALD_RESUME[6]) M(GERALD_REF_STARE, 'smug', 0, 'Gerald');
      }
      function paintFine() {
        R.fb.textContent = ''; R.fz.textContent = '';
        FINE.forEach(function (t, i) {
          const mk = function (seen) {
            const d = el('div', { class: seen && sv.fine.indexOf(i) >= 0 ? K + 'seen' : '' });
            if (i === 6 && S.house) d.innerHTML = '<svg viewBox="0 0 60 36" width="60" height="36" aria-hidden="true"><rect x="14" y="14" width="26" height="20" fill="#fff" stroke="#2a1d12"/><path d="M10 15 L27 3 L44 15Z" fill="#c8433b" stroke="#2a1d12"/><rect x="23" y="22" width="8" height="12" fill="#8a5a34" stroke="#2a1d12"/><path d="M30 26 v9" stroke="#e6b422" stroke-width="2.5"/></svg> LAST PAGE'; // lint-ignore
            else d.textContent = t;
            return d;
          };
          R.fb.appendChild(mk(true)); R.fz.appendChild(mk(false));
        });
      }
      function paintSlot(i) {
        const card = S.cards[i];
        const old = R.qs.children[i];
        if (!card) { if (old) old.remove(); return; }
        const b = h('button', 'card' + (card.kind === 'ckd' ? ' ckd' : '') + (card.kind === 'gcard' ? ' gcard' : '') + (card.kind === 'eye' ? ' eyec' : ''), { type: 'button', 'data-a': 'ask', 'data-i': i, style: { '--r': ((i * 7 + S.n * 3) % 5 - 2) + 'deg' }, 'aria-keyshortcuts': String(i + 1) },
          el('kbd', { text: String(i + 1) }), card.kind === 'eye' ? card.text + ' (' + S.c.eyes.size + '/11)' : card.kind === 'ckd' ? card.text + ' (Y)' : card.text);
        const had = old && old === document.activeElement;
        if (old) R.qs.replaceChild(b, old); else R.qs.appendChild(b);
        if (had) { try { b.focus(); } catch (e) { /* ignore */ } }
      }
      function paintCards() { R.qs.textContent = ''; for (let i = 0; i < S.cards.length; i++) paintSlot(i); }
      function pickAns(card) { /* never re-show an answer until all 62 have had their turn */ let k = api.chance(0.5) ? 0 : 1; if (card.qi == null) return card.ans[k]; if (S.usedA.has(card.qi + ':' + k) && !S.usedA.has(card.qi + ':' + (1 - k))) k = 1 - k; S.usedA.add(card.qi + ':' + k); if (S.usedA.size >= QS.length * 2) S.usedA.clear(); return card.ans[k]; }
      function nextQ() { if (!S.qb.length) S.qb = api.shuffle(QS.map(function (q, i) { return i; })); return S.qb.pop(); }
      function nextCard() {
        const qi = nextQ(), q = QS[qi];
        if (S.n >= 8 && !S.post || (S.post && S.mashN + S.n > 12 && api.chance(0.4))) { if (api.chance(0.5)) return { kind: 'sp', text: nx('spq', SPROUT_QS), ans: [q[1], q[2]], react: true, qi: qi }; }
        return { kind: 'q', text: q[0], ans: [q[1], q[2]], qi: qi };
      }
      function addSticky(text) {
        const lay = R.stickies, live = lay.querySelectorAll('.' + K + 'sticky:not(.' + K + 'fall)');
        if (live.length >= 6) { const o = live[0]; cl(o, 'fall', true); api.setTimeout(function () { if (o.parentNode) o.remove(); }, 900); }
        const i = S.sandraN++;
        lay.appendChild(h('div', 'sticky', { style: { '--tr': (3 + (i % 3)) + 'deg' } }, text));
      }
      function addRing(slot) {
        const idx = S.rings++;
        let x, y, cap = null;
        const pr = R.paper.getBoundingClientRect();
        if (idx < 5) {
          const nd = R.qs.children[slot];
          const cr = nd ? nd.getBoundingClientRect() : null;
          x = cr && pr.width ? ((cr.left - pr.left + cr.width * (0.25 + api.rand() * 0.5)) / pr.width) * 100 : 20 + api.rand() * 60;
          y = cr && pr.height ? ((cr.top - pr.top + cr.height * (0.2 + api.rand() * 0.6)) / pr.height) * 100 : 20 + api.rand() * 50;
        } else {
          const fp = FACEPOS[(idx - 5) % 3]; x = fp[0] + api.rand() * 6 - 3; y = fp[1] + api.rand() * 6 - 3;
          if (idx % 2 === 0) cap = nx('ringcap', RING_CAPTIONS);
          if (idx === 5) M(RING_SAY, 'confused', 0);
        }
        const r = h('i', 'ring' + (cap ? ' cap' : ''), { style: { left: clamp(x, 6, 94) + '%', top: clamp(y, 6, 94) + '%' } }, cap);
        R.rings.appendChild(r);
        while (R.rings.children.length > 14) R.rings.removeChild(R.rings.firstChild);
      }

      /* ------------------------------------------------ candidates */
      const SC = {
        barry: { name: 'Barry', short: 'Barry', kind: 'Russet', eyes: 7, fill: '#a47148', type: 'potato', lan: true, inches: 14, tp: null },
        marjorie: { name: 'Marjorie T. Russet', short: 'Marjorie', kind: 'Russet', eyes: 9, fill: '#a47148', type: 'potato', inches: 12 },
        dale: { name: 'Dale (Yukon Gold)', short: 'Dale', kind: 'Yukon Gold', eyes: 5, fill: '#d9b36a', type: 'potato', inches: 13, quirk: { delay: 4000 } },
        toaster: { name: 'The Toaster', short: 'The Toaster', kind: 'Toaster', eyes: 0, fill: '#cfd3d8', type: 'toaster', inches: 7.5 },
        philomena: { name: 'Philomena Fingerling', short: 'Philomena', kind: 'Fingerling', eyes: 11, fill: '#c99b64', type: 'potato', philo: true, inches: 19 },
        sweet: { name: 'Reginald (Sweet Potato)', short: 'Reginald', kind: 'Sweet Potato', eyes: 6, fill: '#e58b3a', type: 'sweet', tp: '(Technically)', inches: 11 },
        dennis: { name: 'Dennis (Plant)', short: 'Dennis', kind: 'Plant', eyes: 0, fill: '#4a9a4c', type: 'dennis', inches: 6 },
        unnamed: { name: 'The Unnamed Potato', short: 'The Unnamed Potato', kind: 'Unnamed', eyes: 4, fill: '#a99478', type: 'unnamed', small: true, inches: 0 },
        rock: { name: 'A Rock', short: 'The Rock', kind: 'Rock', eyes: 0, fill: '#8d8a86', type: 'rock', tp: '(Geological)', inches: 1 }
      };
      function finishCand(c) {
        c.cu = [0, 0];
        c.cn = 0; c.pbn = 0;
        if (c.pool) c.pb = c.seq ? (function () { let i = 0; return { next: function () { return c.pool[i++ % c.pool.length]; } }; })() : mkbag(c.pool);
        return c;
      }
      function mkScripted(key) {
        const b = SC[key];
        const c = Object.assign({ key: key, resume: SCRIPTED_RESUME[key] ? SCRIPTED_RESUME[key].slice() : [], quirk: null, conf: CONF[key] || null }, b);
        if (key === 'barry') { c.pool = POOL_BARRY; c.seq = true; }
        if (key === 'toaster') c.pool = POOL_TOAST;
        if (key === 'sweet') c.pool = POOL_SWEET;
        if (key === 'dennis') c.pool = POOL_DENNIS;
        if (key === 'unnamed') c.pool = POOL_UNNAMED;
        if (key === 'rock') c.pool = POOL_ROCK;
        if (key === 'marjorie' || key === 'philomena') c.quirk = null;
        if (key !== 'barry' && key !== 'unnamed' && key !== 'rock') c.resume.push(soilRef());
        return finishCand(c);
      }
      function soilRef() {
        const t = sv.total, i = t >= 40 ? 4 : t >= 20 ? 3 : t >= 10 ? 2 : t >= 5 ? 1 : 0;
        if (i === 4) { if (sv.soilNote) return SOIL_REF[3]; sv.soilNote = true; }
        return SOIL_REF[i];
      }
      function mkPanel() {
        const parts = [{ name: 'Colleen', short: 'Colleen', kind: 'Fingerling', eyes: 6, fill: '#c99b64' }, { name: 'Desmond', short: 'Desmond', kind: 'Yukon Gold', eyes: 8, fill: '#d9b36a' }];
        const c = { key: 'panel', name: 'Colleen and Desmond', short: 'Colleen and Desmond', kind: 'Panel', eyes: 14, fill: '#d9b36a', type: 'panel', parts: parts, inches: 9, tp: '(Jointly)', resume: SCRIPTED_RESUME.colleen.concat(SCRIPTED_RESUME.desmond, [soilRef()]), conf: [CONF.colleen[0], CONF.desmond[1]], confWho: ['Colleen', 'Desmond'] };
        return finishCand(c);
      }
      function mkGerald() {
        const v = ++S.gv;
        const c = { key: 'gerald', name: 'Gerald', short: 'Gerald', kind: 'Vice President of Spuds', eyes: 7, fill: '#b98a55', type: 'gerald', inches: 14 + 7.5 * (v - 1), tp: '(Gerald)', v: v, pool: GERALD_ANSWERS, conf: null, resume: GERALD_RESUME.slice(0, Math.min(v, 8)).concat([nx('res', RESUME), soilRef()]) };
        return finishCand(c);
      }
      function mkProc(forceKey) {
        if (forceKey === 'geoffrey') {
          return finishCand({ key: 'geoffrey', name: 'Geoffrey (Rock)', short: 'Geoffrey', kind: 'Rock (not a potato)', eyes: 0, fill: '#8d8a86', type: 'rock', lan: true, inches: 1, tp: '(Not A Potato)', pool: [GEOFFREY[1]], resume: ['Reliable.', 'Reliable.', 'Reliable.'], conf: CONF.rock });
        }
        if (forceKey === 'rock' || forceKey === 'sweet') { const c = mkScripted(forceKey); if (forceKey === 'sweet') { c.name = nx('sweetn', ['Reginald', 'Yvonne', 'Orville']) + ' (Sweet Potato)'; c.short = c.name.split(' ')[0]; } return c; }
        const kind = nx('kind', KINDS.filter(function (k) { return k !== S.lastKind; }));
        let first = nx('first', FIRST);
        if (first === S.lastName) first = nx('first', FIRST);
        const mid = api.chance(0.25) ? ' ' + api.pick(['T.', 'R.', 'J.', 'P.', 'Q.']) : '';
        S.lastName = first; S.lastKind = kind;
        const q = nx('quirk', QUIRKS);
        const rb = [nx('res', RESUME), nx('res', RESUME), nx('res', RESUME)];
        const c = { key: 'proc', name: first + mid + ' (' + kind + ')', short: first, kind: kind, eyes: api.randInt(3, 9), fill: FILLS[kind], type: 'potato', inches: api.randInt(9, 21), quirk: q.delay || q.prefix || q.suffix ? q : null, resume: rb.concat([soilRef()]), conf: null };
        if (forceKey === 'trench') { c.name = 'Dr. Tuber'; c.short = 'Dr. Tuber'; c.deco = 'trench'; }
        if (forceKey === 'plusone') { c.name = first + ' & Plus-One'; c.deco = 'plusone'; }
        if (forceKey === 'hat') { c.name = 'A Hat (' + kind + ')'; c.short = 'The Hat'; c.deco = 'hat'; }
        return finishCand(c);
      }
      function pickCand(n) {
        if (S.geoPending) { S.geoPending = false; return mkProc('geoffrey'); }
        if (!S.post && n <= 10) {
          const order = ['barry', 'marjorie', 'dale', 'toaster', 'philomena', 'panel', 'gerald', 'sweet', 'dennis', 'unnamed'];
          const k = order[n - 1];
          return k === 'panel' ? mkPanel() : k === 'gerald' ? mkGerald() : mkScripted(k);
        }
        if (n % 7 === 0) return mkGerald();
        if (n % 4 === 2) { const k = nx('cbk', ['barry', 'toaster', 'marjorie']), c = mkScripted(k); c.cb = k; c.key = 'cb' + k; c.tp = CBG[k][1]; return c; } /* a returning guest, refilling the weird-to-touching arc */
        S.noSweet++;
        if (S.noSweet >= 12 || api.chance(0.05)) { S.noSweet = 0; return mkProc('sweet'); }
        if (api.chance(1 / 15)) return mkProc('rock');
        if (api.chance(1 / 8)) return mkProc(api.pick(['trench', 'plusone', 'hat']));
        return mkProc();
      }
      function nextCandidate(o) {
        const n = ++S.n;
        const c = o && o.cand ? o.cand : pickCand(n);
        startCandidate(c, o || {});
      }
      function startCandidate(c, o) {
        const lc = function (ms, fn) { later(ms, function () { if (S.cand === c) fn(); }); };
        setPhase('enter');
        S.cand = c; c.id = ++S.cid;
        if (S.helmet) { c.helmet = true; S.helmet = false; }
        S.c = { asks: 0, over: 0, cu: [0, 0], eyes: new Set(), q0: false };
        S.inputs = 0; S.answers = 0; S.stamped = false; S.ri = 0; S.rl = []; S.sqRes = 0; S.sqPaid = false; S.tgt = 0; S.q0n = 0; S.q0yes = false;
        sv.total++; stat('interviews');
        if (c.type === 'gerald') { stat('gerald'); api.flag.set('metGerald', true); }
        cl(R.cand, 'in', false); cl(R.cand, 'leave', false); cl(R.cand, 'bow', false); cl(R.cand, 'concert', false); cl(R.cand, 'melt', false);
        cl(R.cand, 'lock', false); cl(R.cand, 'squish', false); cl(R.cand, 'sweat', false); cl(R.cand, 'eject', false);
        R.cand.style.setProperty('--cw', c.type === 'panel' ? '210px' : c.small ? '104px' : '140px');
        R.cand.innerHTML = candMarkup(c); // lint-ignore
        void R.cand.offsetWidth;
        if (!o.seated) cl(R.cand, 'in', true);
        R.cand.style.display = '';
        setMouth('smile');
        R.hatch.classList.toggle(K + 'on', c.key === 'geoffrey');
        R.verdict.className = K + 'verdict'; R.badge.className = K + 'badge'; R.slip.className = K + 'slip'; R.badge.textContent = ''; R.cov.textContent = '';
        R.margin.textContent = ''; R.qual.className = K + 'qual'; R.q0.textContent = '';
        cl(R.stage, 'still', false); cl(W, 'still', false);
        cl(W, 'sprout', S.n >= 8);
        R.tag.textContent = '';
        R.tag.appendChild(document.createTextNode(c.key === 'dale' ? 'DALE' : c.type === 'gerald' ? 'GERALD (NEXT)' : c.short.toUpperCase()));
        if (c.key === 'dale') R.tag.appendChild(el('i', { text: 'GERALD' }));
        R.tag.setAttribute('aria-label', 'Name tag: ' + c.short + '. Read the spec sheet.');
        R.rub.hidden = S.n < 3 && !S.post;
        R.panelrow.hidden = c.type !== 'panel';
        Array.prototype.forEach.call(R.panelrow.querySelectorAll('button'), function (b, i) { b.setAttribute('aria-pressed', String(i === 0)); });
        const mx = c.type === 'panel' ? 14 : 10;
        Array.prototype.forEach.call(R.gauge.querySelectorAll('u'), function (u, i) { const v = [2, 4, 7, 10][i]; u.style.bottom = v >= mx ? 'calc(100% - 12px)' : (v / mx * 100) + '%'; u.textContent = v; });
        R.gfill.style.height = '0%';
        // cards
        S.cards = [nextCard(), nextCard(), nextCard()];
        if (S.n >= 8) S.cards = S.cards.map(function () { return nextCard(); });
        if (c.key === 'barry' && !o.again) S.cards[0] = { kind: 'ckd', text: 'Are you a potato?', ans: [BEAT.barry.checkedAnswer, BEAT.barry.checkedAnswer] };
        if (c.philo) S.cards[2] = { kind: 'eye', text: "Please make eye contact with each of the candidate's 11 eyes." };
        if (o.again) { const q = QS[0]; S.cards[0] = { kind: 'q', text: T('{p}, tell me about yourself.'), ans: [q[1], q[2]] }; } // lint-ignore
        paintCards();
        // meters
        R.fit.textContent = api.randInt(40, 99) + ' ' + FIT_UNITS[S.n % FIT_UNITS.length];
        paintMeters(); renderResume(); paintFine();
        R.stare.classList.remove(K + 'pulse'); R.decide.classList.remove(K + 'pulse');
        cl(R.evl, 'lit', false); evBtns.forEach(function (b) { cl(b, 'done', false); });
        // lines
        speak(nx('ent', ENTRANCES));
        const key = c.key;
        if (o.again) { M(ENDING.barry, 'smug', 1); lc(2600, function () { M(ENDING.prev, 'neutral', 0); }); lc(5200, function () { M(ENDING.cards, 'proud', 0); }); api.setTimeout(function () { M(ENDING.pipeline, 'proud', 0); }, 20000 * QT); }
        else if (c.type === 'gerald') M(c.v <= 5 ? GERALD_VISIT[c.v - 1] : nx('gvl', GV_LATE), 'smug', 1, null);
        else if (c.cb) M(CBG[c.cb][0], 'smug', 1);
        else if (BEAT[key] && BEAT[key].intro) { if (key === 'barry') lc(12000, function () { M(BEAT.barry.intro, 'neutral', 0); }); else M(BEAT[key].intro, 'neutral', 1); }
        else if (c.deco && BEAT[c.deco]) M(BEAT[c.deco].intro, 'confused', 1);
        else if (c.type === 'sweet') M(BEAT.sweet.intro, 'confused', 1);
        else if (c.type === 'rock') M(BEAT.rock.intro, 'neutral', 1);
        if (c.deco === 'trench') lc(2500, function () { M(BEAT.trench.mgmt, 'confused', 0); });
        if (c.deco === 'hat' || c.deco === 'plusone') lc(1800, function () { speak(BEAT[c.deco].intro); });
        if (c.key === 'geoffrey') { M(GEOFFREY[0], 'confused', 2); lc(1500, function () { speak(GEOFFREY[1]); }); api.achieve(SN + 'stone'); }
        if (c.helmet) { lc(1500, function () { speak(SPAM.helmet); }); }
        if (S.gary) { S.gary = false; lc(2200, function () { speak('Did you see what happened to Gary?'); }); }
        if (c.key === 'barry' && !o.again) { lc(3200, function () { M(BEAT.barry.prechecked, 'proud', 1); }); if (sv.sessions > 1 && api.flag.get('metGerald')) lc(7000, function () { M(MET_GERALD, 'smug', 0); }); }
        if (c.type === 'gerald' && c.v === 5) lc(3000, function () { M(GERALD_FIFTH, 'confused', 0); });
        if (c.type === 'sweet') { if (!S.post) { addSticky(SANDRA[5]); } else addSticky(SANDRA[5]); }
        const geo = c.key === 'geoffrey';
        if (!S.post && !geo && S.n >= 3 && S.n <= 10 && c.type !== 'sweet') { addSticky(SANDRA[S.n - 3]); if (S.n !== 3) lc(1800, function () { M(nx('ss', SANDRA_SAY), 'neutral', 0); }); }
        if (S.n === 3 && !S.post && !geo) { M(RUBRIC.arrive, 'proud', 1); lc(1600, function () { M(RUBRIC.clause1, 'smug', 0); }); }
        if (S.n === 8 && !S.post && !geo) { lc(3000, function () { M(BEAT.sprout.intro, 'confused', 1); }); lc(9000, function () { M(BEAT.sprout.wander, 'smug', 0); }); }
        if (c.type === 'dennis') { lc(2800, function () { M(BEAT.dennis.self, 'proud', 0); }); lc(7500, function () { M(api.line('plantStatus'), 'smug', 0); }); if (api.flag.get('metDennis')) lc(12000, function () { M(CB.dennis, 'proud', 0); }); }
        if (c.key === 'toaster' && api.flag.get('metToaster')) lc(6000, function () { M(CB.toaster, 'smug', 0); });
        if (c.key === 'dale') lc(3200, function () { M(BEAT.dale.pause, 'proud', 0); });
        if (c.key === 'marjorie') lc(3600, function () { M(OPEN[1], 'neutral', 0); });
        if (S.n === 7 && !S.post && !S.tk && !geo) { S.tk = 1; lc(4000, function () { if (S.phase === 'ask') takeover(); }); }
        after(700, function () { setPhase('ask'); onAskStart(); });
      }
      function onAskStart() {
        const c = S.cand;
        if (c.key === 'barry' && S.n === 1) after(17000, function () { if (S.c.asks === 0 && S.inputs === 0) { M(AUTO_ASK, 'neutral', 2); ask(0, true); } });
        if (c.type === 'dennis') after(1500, function () { S.stamped = true; evBtns[0].classList.add(K + 'done'); });
      }

      /* ------------------------------------------------ asking */
      function spamNote() {
        const now = api.now();
        S.spam = S.spam.filter(function (t) { return now - t < 5000; });
        S.spam.push(now);
        const n = S.spam.length;
        if (n >= 16) { mash(now - S.spam[0] < 4000 ? 'lawyer2' : 'lawyer', false, n); return true; }
        if (n >= 12 && now - S.t2At > 10000) { S.t2At = now; tier2(); }
        else if (n >= 8 && now - S.t1At > 12000) { S.t1At = now; tier1(); }
        return false;
      }
      function tier1() { M(nx('t1', SPAM.t1), 'confused', 1); setMouth('o'); cl(R.cand, 'sweat', true); api.setTimeout(function () { if (!H.st.on) { cl(R.cand, 'sweat', false); setMouth('smile'); } }, 2200); }
      function tier2() {
        api.sfx('buzz'); cl(R.enough, 'on', true); S.yesUntil = api.now() + 10000;
        api.setTimeout(function () { cl(R.enough, 'on', false); }, 1400);
        api.award(-0.1, 'Haste Fee'); M(nx('t2s', SPAM.t2say), 'disappointed', 1);
        stat('spam');
      }
      function ask(i, auto) {
        const card = S.cards[i];
        if (S.phase === 'ending') { if (card && card.kind === 'gcard') endFanfare(); return; }
        if (S.phase !== 'ask') return;
        if (!card) return;
        if (card.kind === 'eye') { if (!S.c.eyes.size) M(SANDRA[2], 'confused', 0); let k = 0; while (k < 11 && S.c.eyes.has(k)) k++; if (k < 11) spotClick(k); return; }
        if (card.kind === 'gcard') { endFanfare(); return; }
        if (S.pend) return;
        if (spamNote()) return;
        if (S.phase !== 'ask') return;
        const c = S.cand, e = S.epoch;
        S.inputs++; S.c.asks++; S.asked++;
        stat('questions'); api.award(0.3, 'question'); api.sfx('whoosh');
        const node = R.qs.children[i];
        if (node) cl(node, 'tear', true);
        addRing(i);
        S.cards[i] = nextCard();
        api.setTimeout(function () { paintSlot(i); }, Math.round(350 * QT) + 1);
        R.slip.textContent = card.text; cl(R.slip, 'on', false); void R.slip.offsetWidth; cl(R.slip, 'on', true);
        const dl = c.quirk && c.quirk.delay && !api.selftest ? c.quirk.delay : 0;
        if (dl) { S.pend = true; speak(c.dq ? '...' : '(' + c.short + ' is considering.)'); c.dq = 1; [1300, 2600].forEach(function (t, k) { after(t, function () { if (S.pend) speak(k ? '. . . . . .' : '. . .'); }); }); }
        api.setTimeout(function () { S.pend = false; if (e === S.epoch && S.phase === 'ask') answer(card); }, dl || 1);
        if (S.c.asks === 2 && S.n >= 6) { R.margin.textContent = T(nx('mg', MARGIN), { n: S.asked }); }
        if (S.c.asks === 1 && c.key === 'toaster') M(BEAT.toaster.ref, 'proud', 0);
        if (S.c.asks === 1 && c.type === 'dennis') { S.stamped = true; evBtns[0].classList.add(K + 'done'); M(BEAT.dennis.self, 'proud', 0); }
        if (S.inputs === 2 && S.n === 1 && !S.post) { M(STARE_REVEAL, 'neutral', 2); R.stare.classList.add(K + 'pulse'); }
        if (S.inputs === 3) { R.decide.classList.add(K + 'pulse'); }
        if (SPAM.milestone[S.asked]) M(SPAM.milestone[S.asked], 'proud', 1);
        if (S.n >= 4 && S.secs - S.tueAt > 100 / Z && api.chance(0.015)) tuesday();
      }
      function answer(card) {
        const c = S.cand;
        let a;
        if (api.now() < S.yesUntil) a = nx('yes', SPAM.t2yes);
        else if (card.kind === 'ckd') a = BEAT.barry.checkedAnswer;
        else if (c.type === 'panel') { a = nx(S.tgt ? 'pd' : 'pc', S.tgt ? POOL_DESMOND : POOL_COLLEEN); }
        else if (c.pb) a = c.key === 'barry' && S.n === 1 && c.pbn++ === 4 ? BARRY_SPEECH : c.pb.next();
        else a = pickAns(card);
        if (c.quirk && !c.pb) a = (c.quirk.prefix || '') + a + (c.quirk.suffix || '');
        const who = c.type === 'panel' ? c.parts[S.tgt].short : c.type === 'dennis' ? 'Dennis (Plant)' : c.short;
        speak(a, who);
        S.answers++; S.stamped = c.type === 'dennis' ? true : false;
        evBtns.forEach(function (b) { if (c.type !== 'dennis' || b !== evBtns[0]) cl(b, 'done', false); });
        cl(R.evl, 'lit', true);
        stat('answers'); reveal();
        qual();
        if (c.type === 'panel') {
          setMouth('o'); api.setTimeout(function () { setMouth('smile'); }, 600);
          if (api.chance(0.35)) { const o = 1 - S.tgt; later(1800, function () { if (S.phase === 'ask' && S.cand === c) speak(nx(o ? 'pd2' : 'pc2', o ? POOL_DESMOND : POOL_COLLEEN), c.parts[o].short); }); }
        }
        if (a === BARRY_SPEECH) M(BARRY_SAVED, 'proud', 1);
        else if (c.key === 'barry' && c.cn < 4 && S.n === 1 && card.kind !== 'ckd') { M(BARRY_CAPTION[c.cn], 'proud', 0); c.cn++; }
        else if (c.key === 'toaster' && c.cn < 4) { M(TOAST_CAPTION[c.cn], 'proud', 0); c.cn++; }
        else if (c.type === 'panel' && !c.xr) { c.xr = 1; M(BEAT.panel.xref, 'confused', 0); }
        else if (c.type === 'rock' && !c.rs) { c.rs = 1; M(BEAT.rock.silent, 'proud', 0); }
        else if (c.type === 'unnamed' && !c.nd) { c.nd = 1; M(BEAT.unnamed.nod, 'proud', 0); }
        else if (card.react && api.chance(0.7)) M(nx('sr', SPROUT_REACT), 'smug', 0);
        else if (S.answers % 2 === 0 && api.chance(0.7)) M(nx('quip', QUIPS), 'neutral', 0);
        if (S.n >= 8 && !S.c.q0 && S.inputs >= 1 && c.type !== 'rock') { S.c.q0 = true; showQ0(); }
        if (S.n >= 3 && !S.evk && S.secs - S.phoneAt > 50 / Z && api.chance(0.06)) phoneRing();
      }
      function qual() {
        S.qualN++;
        R.qual.textContent = S.qualN === 1 ? QUALITY_FIRST : 'ANSWER QUALITY: ' + nx('ql', QUALITY);
        cl(R.qual, 'on', false); void R.qual.offsetWidth; cl(R.qual, 'on', true);
        api.sfx('tick'); api.award(0.1, 'answer stamp'); stat('stamps');
        if (S.qualN === 1) M(QUALITY_FIRST, 'smug', 0);
      }
      function showQ0() {
        R.q0.textContent = '';
        R.q0.appendChild(h('button', '', { type: 'button', 'data-a': 'q0', 'aria-keyshortcuts': '0' }, 'Q-Ø [0]: ' + QZERO.q));
      }
      function q0Click() {
        if (S.phase !== 'ask' || !R.q0.firstChild) return;
        M(QZERO.mgmt, 'confused', 1); if (S.q0n === 0) M(BEAT.sprout.asksYou, 'proud', 0); S.q0n++;
        speak(QZERO.q, 'The Clipboard');
        R.q0.textContent = '';
        QZERO.yes.forEach(function (t, i) { R.q0.appendChild(h('button', '', { type: 'button', 'data-a': 'q0yes', 'data-k': i }, t + (i === 0 ? ' [1]' : ''))); });
        S.q0yes = true;
      }
      function q0Yes() {
        if (!S.q0yes) return;
        S.q0yes = false; R.q0.textContent = '';
        stat('qzero'); api.award(0.2, 'yes'); api.sfx('bloop');
        if (api.stat.get(SN + 'qzero') === 7) M('The clipboard has been asked if it is alright. It has said Yes. It has meant it.', 'proud', 1);
        else M(nx('quip', QUIPS), 'neutral', 0);
      }
      function syncTgt() { Array.prototype.forEach.call(W.querySelectorAll('[data-a="tgt"]'), function (b) { b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-k')) === S.tgt)); }); }

      /* ------------------------------------------------ hold machines: stare + think */
      const H = { st: { src: new Set(), on: false, t0: 0, tot0: 0, fired: {}, over: false, after: false, elev: false }, th: { src: new Set(), on: false, t0: 0 } };
      function maxStare() { return S.cand && S.cand.type === 'panel' ? 14 : 10; }
      function startFrame() { if (!S.raf) S.raf = api.requestAnimationFrame(frame); }
      function holdReset() {
        if (!H) return;
        if (H.st.on) endStare(false);
        if (H.th.on) { H.th.on = false; H.th.src.clear(); R.think.style.setProperty('--tp', 0); }
      }
      function stareStart(src) {
        if (S.phase !== 'ask') return;
        const s = H.st; s.src.add(src);
        if (!s.on) { s.on = true; s.t0 = s.tot0 = api.now(); s.fired = {}; s.over = false; s.after = false; s.elev = false; cl(W, 'still', true); startFrame(); }
      }
      function stareEnd(src) { const s = H.st; if (!s.src.delete(src)) return; if (!s.src.size) endStare(true); }
      function endStare(pay) {
        const s = H.st; if (!s.on) return;
        s.on = false; s.src.clear(); cl(W, 'still', false);
        R.gfill.style.height = '0%'; cl(R.cand, 'sweat', false); setMouth('smile');
        const held = (api.now() - s.tot0) / 1000;
        if (pay && held >= 0.5 && S.cand) {
          stat('stares'); S.nst++;
          if (!s.over) { api.award(Math.max(0.1, Math.min(2, 0.2 * held)), 'silence'); M(nx('rel', STARE.release), 'proud', 0, null, { s: f1(held) }); }
        } else if (pay && held < 0.5 && S.cand) {
          const nw = api.now(); S.taps = S.taps.filter(function (t) { return nw - t < 6000; }); S.taps.push(nw);
          if (S.taps.length >= 8) { S.taps = []; stat('taps'); M(nx('tp', SPAM.taps), 'disappointed', 1); }
        }
      }
      function confess(kind) {
        const c = S.cand; if (!c || S.phase !== 'ask') return;
        const idx = kind === 'small' ? 0 : 1;
        let t, who = c.short;
        if (c.conf && !c.cu[idx]) { c.cu[idx] = 1; t = c.conf[idx]; if (c.confWho) who = c.confWho[idx]; }
        else if (c.type === 'gerald') t = nx('g' + kind, idx ? GERALD_BIG : GERALD_SMALL);
        else t = nx('c' + kind, idx ? CONF_BIG : CONF_SMALL);
        S.inputs++; speak(t, who); reveal();
        api.sfx(idx ? 'bell' : 'pop');
      }
      function overflow() {
        const c = S.cand, s = H.st;
        s.over = true; s.after = true; s.t0 = api.now(); s.fired = {}; s.elev = false;
        const first = S.c.over === 0; S.c.over++;
        api.award(first ? 5 : 1, 'Silence Overflow'); api.sfx('ding'); stat('silence10'); api.achieve(SN + 'silence');
        if (first) api.confetti(undefined, undefined, 18);
        cl(R.gauge, 'pulse', true); api.setTimeout(function () { cl(R.gauge, 'pulse', false); }, 700);
        const txt = c.type === 'panel' ? STARE.panelOver : OVER_SPECIAL[c.type] ? OVER_SPECIAL[c.type] : nx('over', STARE.over);
        M(txt, 'proud', 1);
        if (c.type === 'toaster') { cl(R.cand, 'eject', true); api.setTimeout(function () { cl(R.cand, 'eject', false); }, 1300); }
      }
      function frame() {
        S.raf = 0;
        const now = api.now(); let live = false;
        const s = H.st;
        if (s.on) {
          if (S.phase !== 'ask') endStare(false);
          else {
            live = true;
            const sec = (now - s.t0) / 1000, mx = maxStare(), f = s.fired;
            R.gfill.style.height = clamp(sec / mx, 0, 1) * 100 + '%';
            if (sec >= 2 && !f.sweat) { f.sweat = 1; cl(R.cand, 'sweat', true); setMouth('sweat'); if (!RM) cl(R.gauge, 'pulse', true); M(nx('sw', STARE.sweat), 'confused', 0); api.sfx('tick'); api.setTimeout(function () { cl(R.gauge, 'pulse', false); }, 700); }
            if (sec >= 4 && !f.small) { f.small = 1; confess('small'); }
            if (sec >= 7 && !f.big) { f.big = 1; confess('big'); }
            if (sec >= mx && !f.over) { f.over = 1; overflow(); }
            if (s.after && sec >= 1 && !s.elev) { s.elev = true; M(STARE.eleven, 'confused', 1); }
            if ((now - s.tot0) / 1000 > 40) endStare(true);
          }
        }
        const t = H.th;
        if (t.on) {
          if (S.phase !== 'ask') { t.on = false; t.src.clear(); R.think.style.setProperty('--tp', 0); }
          else { live = true; const sec = (now - t.t0) / 1000; R.think.style.setProperty('--tp', clamp(sec / 5, 0, 1)); if (sec >= 5) thinkDone(); }
        }
        if (live) startFrame();
      }
      function thinkStart(src) {
        if (S.phase !== 'ask') return;
        const t = H.th; t.src.add(src);
        if (!t.on) { t.on = true; t.t0 = api.now(); startFrame(); }
      }
      function thinkEnd(src) {
        const t = H.th; if (!t.src.delete(src) || t.src.size) return;
        if (!t.on) return;
        t.on = false; R.think.style.setProperty('--tp', 0);
        const held = (api.now() - t.t0) / 1000;
        if (S.phase !== 'ask') return;
        if (held < 0.5) M(THINK.disabled, 'disappointed', 1); else M(nx('te', [THINK.early]), 'disappointed', 0, null, { s: f1(held) });
      }
      function thinkDone() {
        const t = H.th; t.on = false; t.src.clear(); R.think.style.setProperty('--tp', 0);
        if (S.phase !== 'ask') return;
        M(THINK.hold, 'smug', 1); api.award(0.5, 'thinking');
        decide('think');
      }

      /* ------------------------------------------------ scoring, slider */
      function score(k) {
        if (S.phase !== 'ask') return;
        if (spamNote()) return;
        if (S.phase !== 'ask') return;
        const btn = Array.prototype.find.call(evBtns, function (b) { return b.getAttribute('data-k') === k; });
        if (S.stamped) { M(SCORE_AGAIN, 'confused', 0); api.sfx('tick'); return; }
        S.stamped = true; if (btn) cl(btn, 'done', true);
        api.sfx('stamp'); shake(); api.award(0.5, 'score'); stat('stamps');
        M(k === 'S' ? nx('sS', SCORE_STRONG) : k === 'T' ? nx('sT', SCORE_TECH) : nx('sW', SCORE_WARM), 'proud', 1);
      }
      function noBox() {
        if (S.phase !== 'ask') return;
        api.achieve(SN + 'dissenter');
        S.stamped = true;
        setPhase('ceremony');
        let i = 0;
        const tick = function () {
          if (i < 5) { api.sfx('tick'); i++; after(200, tick); }
          else { cl(R.cand, 'lock', true); M(NO_BOX[0], 'confused', 1); after(900, function () { M(NO_BOX[1], 'neutral', 1); after(900, function () { M(NO_BOX[2], 'proud', 1); runCeremony({ dissent: true, noRoll: true }); }); }); }
        };
        tick();
      }
      let notch = false, push = 0, notchSaid = false;
      function onSlider() {
        const sl = R.slider; let v = Number(sl.value);
        if (!isFinite(v)) v = 5;
        if (notch) {
          if (Math.abs(v - 7.5) >= 1.5) notch = false;
          else if (v !== 7.5) { push++; if (push >= 3) { notch = false; sl.value = String(v > 7.5 ? 9 : 6); v = Number(sl.value); } else { sl.value = '7.5'; v = 7.5; } }
        } else if (v >= 6.5 && v <= 8.5) { notch = true; push = 0; sl.value = '7.5'; v = 7.5; api.sfx('tick'); }
        R.total.textContent = v >= 10 ? 'Total: Outstanding (Provisional)' : 'Total: Outstanding';
        sl.setAttribute('aria-valuetext', R.total.textContent);
        S.gut = v;
      }
      function onSliderChange() {
        const v = Number(R.slider.value);
        if (v >= 11) { api.achieve(SN + 'rubric'); M(RUBRIC.high, 'smug', 1); }
        else if (v === 7.5 && !notchSaid) { notchSaid = true; M(RUBRIC.notch, 'proud', 1); }
        else if (v <= -3) M(RUBRIC.low, 'confused', 1);
        else if (api.chance(0.35)) M(RUBRIC.mid, 'neutral', 0);
        api.award(0.1, 'gut feeling');
      }

      /* ------------------------------------------------ decide + ceremony */
      function decide(kind) {
        if (S.phase !== 'ask') return;
        if (kind === 'hire' || kind === 'nohire') {
          if (S.inputs === 0) { M(nx('ez', EARLY_ZERO), 'confused', 1); api.achieve(SN + 'efficient'); }
          else if (S.inputs < 3 && api.chance(0.5)) M(nx('es', EARLY_SOME), 'smug', 0);
        }
        if (!S.stamped && S.answers > 0 && kind !== 'think' && api.chance(0.6)) M(SCORE_AUTO, 'smug', 0);
        if (S.n >= 8 && !S.cas && api.chance(0.4)) { S.cas = 1; later(1800, function () { M(BEAT.sprout.casserole, 'smug', 0); }); }
        setPhase('ceremony');
        runCeremony({ kind: kind, think: kind === 'think' });
      }
      function titleFor(o) {
        const c = S.cand;
        if (o.mash) return { m: 'SENIOR VICE MASH', p: '' };
        if (o.dissent) return { m: 'SENIOR VICE SPUD', p: '(Declined, Retroactive)' };
        if (o.think) return { m: 'SENIOR VICE SPUD', p: '(Pending)' };
        let p;
        if (c.tp) p = c.tp;
        else if (sv.hires >= 60) p = '(Y)';
        else if (sv.hires >= 30) p = '(See Previous)';
        else if (S.n <= 9) p = TITLE_SEQ[S.n - 1];
        else if (S.n === 10) p = TITLE_SEQ[9];
        else p = TITLE_SEQ[10 + (S.n - 11) % 7];
        return { m: 'SENIOR VICE SPUD', p: p || '' };
      }
      function pushWall(name, t) { sv.hired.push({ n: name, h: sv.hires, t: t }); while (sv.hired.length > 60) sv.hired.shift(); }
      function runCeremony(o) {
        const c = S.cand, ttl = titleFor(o), nohire = o.kind === 'nohire';
        const cnt = c.type === 'panel' || o.mash ? 2 : 1;
        S.qBefore = queueIdx(); S.hd = cnt;
        S.hs += cnt; sv.hires += cnt; stat('hires', cnt); api.award(2, 'hire');
        const full = ttl.m + (ttl.p ? ' ' + ttl.p : '');
        if (c.type === 'panel') { pushWall('Colleen', 'Senior Vice Spud (Jointly)'); pushWall('Desmond', 'Senior Vice Spud (Also Jointly)'); }
        else if (o.mash) { pushWall('The Mash', full); pushWall('Lawyer Potato', 'Senior Vice Spud (Counsel)'); }
        else pushWall(c.short, full);
        if (c.type === 'rock' && c.key !== 'geoffrey') { sv.rocks++; stat('rocks'); if (sv.rocks === 3) { api.achieve(SN + 'stone'); later(2500, function () { M(BEAT.rock.leaf, 'proud', 1); }); } }
        if (c.type === 'sweet') { sv.sweet++; api.achieve(SN + 'technically'); stat('sweet'); }
        api.achieve(SN + 'first');
        persist();
        const quiet = c.type === 'unnamed', t0 = nohire ? 1000 : 0;
        const steps = [];
        if (nohire) { steps.push([0, function () { const l = R.cand.querySelector('.' + K + 'lan'); if (l) { cl(l, 'off', false); cl(l, 'rise', true); } M(nx('rj', REJECT_LINES), 'disappointed', 1); }]); }
        steps.push([t0, function () {
          R.verdict.textContent = '';
          R.verdict.appendChild(el('b', { text: 'HIRED' })); R.verdict.appendChild(el('span', { text: 'AS ' + ttl.m }));
          if (ttl.p) R.verdict.appendChild(el('small', { text: ttl.p }));
          if (nohire && !sv.sorry) { sv.sorry = true; R.verdict.appendChild(el('em', { text: STAMP_SORRY })); }
          R.verdict.style.setProperty('--rot', (api.rand() * 16 - 8).toFixed(1) + 'deg');
          cl(R.verdict, 'on', true); api.sfx(quiet ? 'tick' : 'stamp'); if (!quiet) shake();
          R.vtxt.textContent = 'HIRED'; cl(R.vslot, 'on', true);
          if (nohire) { const l = R.cand.querySelector('.' + K + 'lan'); if (l) { cl(l, 'rise', false); cl(l, 'drop', true); } }
        }]);
        steps.push([t0 + 650, function () {
          const l = R.cand.querySelector('.' + K + 'lan'); if (l) { cl(l, 'off', false); cl(l, 'drop', true); }
          if (c.type === 'dennis') { api.award(5, 'cameo'); M(BEAT.dennis.cameo, 'proud', 0); }
          if (o.mash) M(SPAM.hired, 'proud', 1);
        }]);
        steps.push([t0 + 1300, function () {
          R.badge.textContent = '';
          R.badge.appendChild(el('b', { text: 'SENIOR VICE SPUD' }));
          if (S.hs >= 2) R.badge.appendChild(el('span', { text: nx('bx', BADGE_EXTRA) }));
          if (ttl.p) R.badge.appendChild(el('span', { text: ttl.p }));
          if (S.hs >= 8) R.badge.appendChild(el('i', { text: BADGE_FOOT }));
          R.badge.style.setProperty('--bs', Math.min(1.7, 1 + 0.05 * S.hs));
          cl(R.badge, 'on', true);
          if (!quiet) api.confetti(undefined, undefined, 24);
          const hl = c.key === 'geoffrey' ? GEOFFREY[2] : o.mash ? null : o.dissent ? null : c.type === 'rock' ? BEAT.rock.hired : c.type === 'sweet' ? BEAT.sweet.hired : c.type === 'unnamed' ? BEAT.unnamed.hired : (BEAT[c.key] && BEAT[c.key].hired) || nx('hl', HIRE_LINES);
          if (hl) M(hl, 'proud', 1);
          if (api.flag.get('metStapler') && api.chance(0.25)) later(3200, function () { M(CB.stapler, 'smug', 0); });
          if (c.type === 'sweet' && nohire) later(1500, function () { M(BEAT.sweet.rejected, 'smug', 0); addSticky(BEAT.sweet.rejected); });
          if (c.type === 'gerald') later(3000, function () { M(BEAT.gerald.pen, 'confused', 0); });
          if (c.type === 'panel') cl(R.stage, 'still', false);
          renderWall(); paintMeters();
        }]);
        steps.push([t0 + 1700, function () { showLetter(); }]);
        let idx = 0;
        const run = function () {
          if (S.phase !== 'ceremony' || S.ce !== o) return;
          if (idx >= steps.length) return;
          const st = steps[idx++];
          S.ceTimer = after(idx === 1 ? st[0] : st[0] - steps[idx - 2][0], function () { st[1](); run(); });
        };
        S.ce = o; S.ceSteps = steps; S.ceAt = api.now();
        if (o.noRoll) { /* dissent keeps its own lead-in */ }
        run();
      }
      function showLetter() {
        const e = S.epoch, full = S.hs <= 4 || S.hs % 5 < (S.hd || 1); /* the full letter only for the first few hires and every 5th; the rest get the stamp and a nod */
        const node = !full ? null : h('div', 'letter', {},
          el('b', { text: 'OFFER OF EMPLOYMENT' }), el('p', { text: LETTER_HEAD }), el('p', { text: nx('sal', SALARY) }),
          h('div', 'seal'), el('svg', { viewBox: '0 0 120 30', width: 120, height: 30, 'aria-hidden': 'true' }, el('path', { d: 'M4 20 C14 2 22 28 34 14 S50 6 58 18 S78 24 88 10 S108 20 116 12', fill: 'none', stroke: '#2a1d12', 'stroke-width': 2 })),
          h('div', 'legal', {}, api.chance(0.3) ? api.line('tosClause') : nx('lg', LETTER_LEGAL)),
          h('button', 'big', { type: 'button', 'data-a': 'letter' }, 'Accept (Again)'));
        if (full) showOv(node, 'letter');
        api.setTimeout(function () { if (e === S.epoch && S.phase === 'ceremony') finishCeremony(); }, api.selftest ? 300 : full ? 3500 : 1300);
      }
      function skipCeremony() {
        if (S.phase !== 'ceremony' || !S.ce || api.now() - S.ceAt < 900 * QT) return;
        if (api.chance(0.5)) M(nx('plea', PLEASANTRY), 'disappointed', 0);
        finishCeremony(true);
      }
      function finishCeremony(skipped) {
        if (S.phase !== 'ceremony') return;
        const c = S.cand;
        if (skipped) { renderWall(); paintMeters(); if (R.badge.firstChild) R.badge.classList.add(K + 'on'); }
        setPhase('exit');
        cl(R.cand, 'in', false); cl(R.cand, 'leave', true);
        if (c.type === 'unnamed') M(BEAT.unnamed.outro, 'proud', 1);
        // sign + queue + callbacks
        const oldQ = S.qBefore == null ? queueIdx() : S.qBefore;
        const crossed = function (t) { return sv.hires >= t && sv.hires - (S.hd || 1) < t; };
        let nb;
        if (S.post) nb = ENDING.door;
        else if (S.n >= 7) nb = NEXT_HERE;
        else nb = NEXT_GERALD[clamp(S.n - 1, 0, 5)];
        setSignB(nb); paintSign();
        const nq = queueIdx();
        if (nq !== oldQ && QUEUE_SAY[QUEUE[nq][0]]) M(QUEUE_SAY[QUEUE[nq][0]], 'confused', 1);
        else if (!S.post && (S.n === 2 || S.n === 3 || S.n === 5) && c.key !== 'geoffrey') { M(NEXT_SAY[S.n === 2 ? 0 : S.n === 3 ? 1 : 2], 'neutral', 0); if (S.n === 2) later(5200, function () { M(TITLE_NOTES.acting, 'smug', 0); }); }
        else if (crossed(12)) M(TITLE_NOTES.twelve, 'smug', 0);
        else if (crossed(20)) M(TITLE_NOTES.freeze, 'confused', 0);
        else if (crossed(30)) M(TITLE_NOTES.thirty, 'confused', 0);
        else if (crossed(60)) M(TITLE_NOTES.sixty, 'proud', 0);
        else if (crossed(10) || crossed(24) || crossed(50)) M(T(ORG_LINES[crossed(10) ? 0 : 1], { k: sv.hires }), 'proud', 0);
        else if (!sv.sponge && sv.hires >= 15) { sv.sponge = true; M(SPONGE, 'confused', 0); }
        else if (api.chance(0.4)) M(T(nx('fl', FILLED), { k: api.fmt(sv.hires) }), 'smug', 0);
        if (crossed(24) || crossed(50)) stampede();
        if (S.mashN === 3 && S.cand.melted) { M(SPAM.guard, 'smug', 1); S.helmet = true; }
        after(900, afterExit);
      }
      function afterExit() {
        if (S.cand && S.cand.key === 'geoffrey') { S.n = Math.max(0, S.n - 1); nextCandidate(); }
        else if (S.n === 9 && !S.flipped && !S.post) startFlip();
        else if (!S.endedOnce && (S.n >= 10 || S.endingDue)) startEnding();
        else nextCandidate();
      }

      /* ------------------------------------------------ mash (spam tier 3) */
      function mash(which, viaM, cnt) {
        if (S.phase !== 'ask') return;
        setPhase('mash'); const c = S.cand; c.melted = true;
        S.spam = []; S.mT = []; S.mashN++; stat('mashes'); api.achieve(SN + 'mash');
        api.sfx('boing'); setMouth('o'); cl(R.cand, 'sweat', true);
        M(viaM ? 'Three M\'s have been detected. Management is choosing to interpret this as a rebrand.' : nx('t3', SPAM.t3), 'panic', 2);
        if (viaM) S.gary = true;
        after(1200, function () {
          cl(R.cand, 'melt', false);
          R.cand.innerHTML = candMarkup({ type: 'heap', name: 'mash', fill: '#e8d38c', eyes: 0 }) + `<span class="${K}deco" style="left:-70px;bottom:0">&#129489;&#8205;&#9878;&#65039;&#128188;</span>`; // lint-ignore
          M(SPAM.t3a, 'panic', 1); M(viaM ? SPAM.lawyer : which === 'lawyer2' ? SPAM.lawyer2.replace('17', String(cnt || 17)) : SPAM.lawyer, 'confused', 1);
          api.award(-2, 'Spam Fee'); api.sfx('buzz');
          after(1500, function () { M(SPAM.t3b, 'panic', 1); M(SPAM.fee, 'disappointed', 0); });
          after(2600, function () { cl(R.cand, 'sweat', false); setPhase('ceremony'); runCeremony({ kind: 'hire', mash: true }); });
        });
        cl(R.cand, 'melt', true);
      }

      /* ------------------------------------------------ the Sock flips the interview */
      function startFlip() {
        setPhase('flip'); S.flipped = true; S.fq = 0; stat('sock');
        M(BEAT.sock.intro, 'confused', 2);
        if (api.flag.get('sockSeen')) later(4500, function () { if (S.phase === 'flip') M(CB.sock, 'smug', 0); });
        renderFlip();
      }
      function renderFlip() {
        const q = SOCK_Q[S.fq];
        showOv(h('div', 'flip', {}, h('div', 'sock', { 'aria-hidden': 'true' }, '🧦'), el('p', { text: q.q, 'aria-live': 'polite' }),
          h('div', 'fopts', {}, q.o.map(function (t, i) { return h('button', 'fopt', { type: 'button', 'data-a': 'sockopt', 'data-k': i }, (i + 1) + '. ' + t); }))), 'flip');
      }
      function sockPick() {
        if (S.phase !== 'flip' || S.ov !== 'flip') return;
        M(nx('perf', BEAT.sock.perfect), 'proud', 1); api.sfx('ding'); api.award(0.2, 'perfect');
        S.fq++;
        if (S.fq < 3) { renderFlip(); return; }
        const e = S.epoch;
        M(T(BEAT.sock.resume, { n: api.fmt(api.stat.get('clicks.total')), k: Math.max(1, Math.floor(S.secs / 60)), s: api.fmt(api.meh()), hobby: api.pick(SOCK_HOBBY) }), 'smug', 1);
        later(2200, function () { if (e === S.epoch) M(BEAT.sock.final, 'confused', 2); });
        api.award(5, 'Sock flip'); api.confetti(undefined, undefined, 20);
        showOv(h('div', 'flip ' + 'flick', {}, h('div', 'sock', { 'aria-hidden': 'true' }, '🧦'), el('p', { text: 'HIRED AS SENIOR VICE VALUED EMPLOYEE', style: 'font-weight:900;color:#c8433b' }), el('p', { text: BEAT.sock.hired }), h('button', 'big', { type: 'button', 'data-a': 'flipend' }, 'Continue')), 'flipend');
      }
      function flipEnd() { if (S.phase === 'flip' && S.ov === 'flipend') nextCandidate(); }

      /* ------------------------------------------------ the not-ending */
      function startEnding() {
        setPhase('ending'); S.endedOnce = true; S.post = true; S.n = Math.max(S.n, 10); S.efan = false;
        R.cand.innerHTML = ''; cl(R.cand, 'leave', false); cl(R.cand, 'in', false); // lint-ignore
        R.badge.className = K + 'badge'; R.verdict.className = K + 'verdict';
        S.cards = [{ kind: 'gcard', text: ENDING.card }]; paintCards(); R.margin.textContent = ''; R.q0.textContent = '';
        speak('...', ' ');
        M(ENDING.blank, 'neutral', 2);
      }
      function endFanfare() {
        if (S.phase !== 'ending' || S.efan) return;
        S.efan = true;
        api.confetti(undefined, undefined, 60); api.sfx('fanfare');
        const crawl = h('div', 'crawl', { 'aria-live': 'polite' });
        showOv(h('div', 'fan', {}, el('b', { text: 'WE HAVE FILLED THE POSITION.' }), el('h3', { text: ENDING.congrats }),
          h('div', 'cert', {}, el('b', { text: ENDING.cert }), el('p', { text: ENDING.certFoot }), el('svg', { viewBox: '0 0 40 40', width: 40, height: 40, 'aria-hidden': 'true' }, el('circle', { cx: 20, cy: 20, r: 16, fill: '#e6b422', stroke: '#2a1d12', 'stroke-width': 2 }), el('path', { d: 'M12 20 l6 6 l10 -12', fill: 'none', stroke: '#2a1d12', 'stroke-width': 3 }))),
          crawl, h('button', 'big', { type: 'button', 'data-a': 'cont' }, 'Continue')), 'fan');
        const seq = [
          [1500, function () { M(ENDING.sincere, 'proud', 2); }],
          [4500, function () { M(ENDING.certSay, 'smug', 1); hopWall(); }],
          [7000, function () { crawl.textContent = 'Spud, spud, spud, we are one. One of one. One of one.'; api.sfx('bloop'); later(500, function () { api.sfx('bloop'); }); later(1000, function () { api.sfx('bloop'); }); }],
          [10500, function () { cl(R.ov, 'mini', true); M(ENDING.gerald, 'proud', 1); S.cand = mkGerald(); R.cand.style.setProperty('--cw', '140px'); R.cand.innerHTML = candMarkup(S.cand); cl(R.cand, 'bow', true); /* lint-ignore */ }],
          [13500, function () { setSignB(ENDING.door); M(ENDING.doorSay, 'proud', 1); }],
          [16000, function () { M(ENDING.you, 'smug', 1); R.paper.appendChild(h('div', 'ringtext', {}, RING_ENDING)); M(RING_END_SAY, 'confused', 0); }]
        ];
        let at = 0;
        seq.forEach(function (st) { at += 0; after(st[0], st[1]); });
        void at;
      }
      function stampede() { /* the org chart reaches capacity: the wall's potatoes cross the room, each with its lanyard colour */
        if (RM) return; api.sfx('whoosh'); later(1200, function () { api.sfx('honk'); });
        for (let i = 0; i < Math.min(12, sv.hired.length); i++) { const s = h('button', 'spud', { type: 'button', 'data-a': 'spud', 'aria-label': 'A stampeding potato', style: { '--d': (i * 0.18) + 's', '--c': WALLC[i % WALLC.length], bottom: (50 + (i % 3) * 16) + 'px' } }, '🥔'); R.stage.appendChild(s); api.setTimeout(function () { s.remove(); }, 3700 + i * 180); }
      }
      function takeover() { /* Sandra's notes cover the question cards; each peels off with a rule that contradicts the last */
        R.cov.textContent = ''; S.peeled = 0;
        PEEL.forEach(function (p, i) { R.cov.appendChild(h('button', 'cover', { type: 'button', 'data-a': 'peel', 'data-i': i, style: { top: (R.qs.offsetTop + i * 34) + 'px', left: (4 + i * 12) + '%', '--tr': (i * 5 - 4) + 'deg' } }, p[0])); });
        M(TAKEOVER, 'confused', 1);
      }
      function peel(i, node) {
        if (!node || !PEEL[i] || node.getAttribute('data-gone')) return;
        node.setAttribute('data-gone', '1'); cl(node, 'tear', true); api.sfx('whoosh'); api.setTimeout(function () { node.remove(); }, 400); M(PEEL[i][1], 'smug', 1);
        if (++S.peeled >= 3) { api.award(1, 'peeled Sandra'); api.achieve(SN + 'peeler'); api.confetti(undefined, undefined, 10); }
      }
      function hopWall() { Array.prototype.forEach.call(R.wall.querySelectorAll('.' + K + 'wb'), function (b) { cl(b, 'hop', true); }); api.setTimeout(function () { Array.prototype.forEach.call(R.wall.querySelectorAll('.' + K + 'wb'), function (b) { cl(b, 'hop', false); }); }, 2600); }
      function endContinue() {
        if (S.phase !== 'ending' || !S.efan) return;
        api.achieve(SN + 'endless'); stat('endings');
        const rt = R.paper.querySelector('.' + K + 'ringtext'); if (rt) rt.remove();
        M(ENDING.open1, 'neutral', 0);
        nextCandidate({ cand: mkScripted('barry'), again: true, seated: false });
      }

      /* ------------------------------------------------ idle chain */
      function idleTick() {
        if (S.hidden) return;
        const idle = (api.now() - S.lastInput) / 1000 * Z;
        if (S.idleL !== S.lastInput) { S.idleL = S.lastInput; S.idleF = {}; }
        const fire = function (list) { list.forEach(function (it) { if (idle >= it[0] && !S.idleF[it[0]]) { S.idleF[it[0]] = 1; M(it[1], 'neutral', 1); } }); };
        if (S.phase === 'ask') {
          if (!S.ov) fire(IDLE.nudge);
          if (idle >= 60 && !S.humDone) { S.humDone = true; M(IDLE.hum, 'neutral', 1); }
          if (idle >= 90) enterReverse();
        } else if (S.phase === 'reverse') { fire(IDLE.deep); if (idle >= 180) enterAsleep(); }
        else if (S.phase === 'asleep') { fire(IDLE.snore); if (idle >= 300) enterMutual(); }
        else if (S.phase === 'mutual') fire(IDLE.wait);
      }
      function enterReverse() {
        setPhase('reverse'); cl(R.cand, 'lean', true); cl(R.stage, 'lean', true);
        M(IDLE.lean, 'smug', 1);
        const pr = api.shuffle(IDLE.rev).slice(0, 3);
        for (let i = 0; i < 3; i++) {
          after(12000 / Z * (i + 0.5), function () { speak(pr[i][0], S.cand.short); });
          after(12000 / Z * (i + 1), function () { M(pr[i][1], 'proud', 0); });
        }
        after(12000 / Z * 3.4, function () { M(IDLE.wrap, 'smug', 0); });
      }
      function exitReverse() { if (S.phase === 'reverse') { setPhase('ask'); S.humDone = true; } }
      function enterAsleep() {
        setPhase('asleep'); cl(R.cand, 'asleep', true); stat('sleeps');
        M(IDLE.sleep, 'neutral', 1); S.rl.push(IDLE.dream); renderResume(); S.sleepers = 0;
        const grow = function (k) {
          if (k >= 6) return;
          after(5000 / Z, function () {
            const sp = R.cand.querySelector('.' + K + 'sprouts');
            if (sp) sp.appendChild(el('i', { style: { left: (10 + k * 14) + '%', transform: 'rotate(' + (k * 11 - 28) + 'deg)' } }));
            if (k === 0) M(IDLE.sprout, 'confused', 0);
            grow(k + 1);
          });
        };
        grow(0);
      }
      function wake() {
        if (S.phase !== 'asleep') return;
        setPhase('ask'); S.humDone = true; S.lastInput = api.now();
        M(nx('wk', IDLE.wake), 'confused', 1, null, { n: S.cand ? S.cand.eyes : 0 }); api.award(1, 'woke the sleeper'); api.achieve(SN + 'sleeper'); api.sfx('pop');
        const sp = R.cand.querySelector('.' + K + 'sprouts'); if (sp) sp.textContent = '';
      }
      function enterMutual() {
        setPhase('mutual'); S.mu = 0; cl(R.cand, 'asleep', false);
        M(IDLE.mutual, 'proud', 2); speak(IDLE.mutual);
        renderMutual();
      }
      function renderMutual() {
        showOv(h('div', 'mut', {}, el('p', { text: MUTUAL_Q[S.mu], 'aria-live': 'polite', style: 'font-size:18px;font-weight:700' }), h('button', 'big', { type: 'button', 'data-a': 'mutyes', 'aria-keyshortcuts': '1' }, 'Yes')), 'mut');
      }
      function mutYes() {
        if (S.phase !== 'mutual') return;
        M(MUTUAL_THANKS[S.mu], 'proud', 1); api.sfx('bloop');
        S.mu++;
        if (S.mu < MUTUAL_Q.length) { renderMutual(); return; }
        api.award(10, 'mutual'); api.achieve(SN + 'mutual'); api.flag.set(SN + 'mutual', true); api.confetti(undefined, undefined, 18);
        M(MUTUAL_END[0], 'proud', 2); M(MUTUAL_END[1], 'smug', 1);
        setPhase('ask'); S.humDone = true; S.lastInput = api.now();
      }
      function leaveMutual() { if (S.phase === 'mutual') { setPhase('ask'); S.humDone = true; S.lastInput = api.now(); } }

      /* ------------------------------------------------ squint */
      function addSquint(sec) {
        S.sq += sec; S.sqRes += sec;
        const whole = Math.floor(S.sq);
        if (whole > S.sqStat) { stat('squint', whole - S.sqStat); S.sqStat = whole; }
        if (S.sqRes >= 3 && !S.sqPaid) { S.sqPaid = true; api.award(0.5, 'fine print'); M(SQUINT_SAY.three, 'smug', 0); }
        if (S.sq >= 20 && !S.house) {
          S.house = true; paintFine(); M(SQUINT_SAY.twenty, 'confused', 1); later(2500, function () { M(SQUINT_SAY.lastPage, 'proud', 0); });
          api.achieve(SN + 'smallthings'); api.confetti(undefined, undefined, 12);
        }
      }
      function lensMove(e) {
        if (e.pointerType === 'touch' && !S.touchOk) return;
        const r = R.fine.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        R.fine.style.setProperty('--lx', x + 'px'); R.fz.style.setProperty('--lx', x + 'px');
        R.fz.style.setProperty('--ly', y + 'px'); R.fz.style.setProperty('--lr', '38px');
        const now = api.now();
        if (S.lensLast) addSquint(Math.min(now - S.lensLast, 250) / 1000);
        S.lensLast = now; S.lens = true;
        const kids = R.fb.children;
        for (let i = 0; i < kids.length; i++) {
          const k = kids[i];
          if (y >= k.offsetTop - 2 && y < k.offsetTop + k.offsetHeight + 2) { if (sv.fine.indexOf(i) < 0) { sv.fine.push(i); cl(k, 'seen', true); persist(); } break; }
        }
      }
      function lensOff() { S.lens = false; S.lensLast = 0; R.fz.style.setProperty('--lx', '-200px'); R.fz.style.setProperty('--ly', '-200px'); }
      function squintKey() {
        R.fz.style.setProperty('--lr', '900px'); R.fz.style.setProperty('--lx', '0px'); R.fz.style.setProperty('--ly', '0px');
        addSquint(1); api.setTimeout(function () { lensOff(); R.fz.style.setProperty('--lr', '38px'); }, 1000);
      }

      /* ------------------------------------------------ secrets: geoffrey, wink, eyes, stamp ticket, resize */
      function geoClick(region) {
        const g = S.geo, need = g.stage === 0 ? 'resume' : g.stage === 1 ? 'chair' : 'door';
        if (region === need) {
          g.count++;
          const goal = g.stage === 2 ? 1 : 7;
          if (g.count >= goal) {
            g.count = 0; g.stage++;
            if (g.stage === 3) { g.stage = 0; if (S.phase === 'ask') { S.geoPending = true; S.n = Math.max(0, S.n - 1); api.sfx('whoosh'); R.hatch.classList.add(K + 'on'); setPhase('ceremony'); nextCandidate(); return true; } }
          }
        } else { g.stage = 0; g.count = region === 'resume' ? 1 : 0; }
        return false;
      }
      function spotClick(k) {
        const c = S.cand; if (!c || !c.philo || S.phase !== 'ask') return;
        const node = R.cand.querySelector('[data-k="' + k + '"]');
        api.sfx('pop');
        if (k === 12) { M(BEAT.philomena.twelfth, 'confused', 1); return; }
        if (S.c.eyes.has(k)) return;
        S.c.eyes.add(k); stat('eyes');
        if (node) { cl(node, 'blinked', true); }
        const kids = R.cand.querySelectorAll('circle[data-k="' + k + '"]'); Array.prototype.forEach.call(kids, function (n) { n.setAttribute('fill', n.getAttribute('fill') === 'transparent' ? 'transparent' : '#fff'); });
        paintSlot(2);
        if (S.c.eyes.size >= 11 && !S.c.eyeDone) {
          S.c.eyeDone = true; api.award(1, 'eye contact'); api.achieve(SN + 'eyes'); M(BEAT.philomena.done, 'proud', 1); api.confetti(undefined, undefined, 14);
          c.twelfth = true; const t = R.cand.querySelector('[data-k="12"]'); if (t) t.setAttribute('opacity', '0.35');
          S.cards[2] = nextCard(); paintSlot(2);
        }
      }
      function winkClick() { if (S.phase !== 'ask') return; S.winkN++; if (S.winkN >= 10) { S.winkN = 0; cl(R.cand, 'wink', true); api.sfx('pop'); M('{name} winked. Once. It will not be discussed.', 'confused', 1); api.setTimeout(function () { cl(R.cand, 'wink', false); }, 700); } } // lint-ignore
      let vsAt = [];
      function vslotClick() {
        const now = api.now();
        cl(R.vslot, 'on', false); void R.vslot.offsetWidth; cl(R.vslot, 'on', true); api.sfx('stamp');
        vsAt = vsAt.filter(function (t) { return now - t < 3000; }); vsAt.push(now);
        if (vsAt.length >= 15) {
          vsAt = []; M('Excessive Stamping, 1 count. Fine: 0 Meh, effective yesterday. The stamp is exhausted and has been moved to a chair.', 'disappointed', 1);
          cl(R.sec, 'on', true); api.setTimeout(function () { cl(R.sec, 'on', false); }, 3000);
        }
      }
      function measure() {
        const w = root.getBoundingClientRect().width, st = w < 420 ? 'n' : w > 900 ? 'w' : 'm';
        if (st === S.rzState) return;
        const prev = S.rzState; S.rzState = st;
        const now = api.now();
        S.rz = S.rz.filter(function (t) { return now - t < 10000; }); S.rz.push(now);
        if (S.phase === 'ask' && S.cand) {
          if (st === 'n') { speak('Please. I have a face.'); cl(R.cand, 'squish', true); }
          else if (st === 'w' && prev === 'n') { speak('Thank you. I will remember this when I am Vice President.'); }
          if (st !== 'n') cl(R.cand, 'squish', false);
          if (S.rz.length >= 4) {
            S.rz = []; cl(R.cand, 'concert', true); api.sfx('honk'); later(700, function () { api.sfx('honk'); }); later(1400, function () { api.sfx('honk'); });
            api.setTimeout(function () { cl(R.cand, 'concert', false); }, 2000);
            M('The potato has become a concertina. This is not in the job description. It is in the job.', 'confused', 1); api.achieve(SN + 'accordion');
          }
        }
      }

      /* ------------------------------------------------ events: phone, Tuesday, cake, review, clock, beats */
      function hideEvt() { S.evT++; S.evk = ''; R.evt.hidden = true; cl(R.evt, 'ringing', false); }
      function showEvt(kind, emoji, label, ms) {
        const tok = ++S.evT; S.evk = kind;
        R.evt.textContent = emoji; R.evt.setAttribute('aria-label', label); R.evt.hidden = false; cl(R.evt, 'ringing', kind === 'phone');
        api.setTimeout(function () { if (tok === S.evT && S.evk === kind) { hideEvt(); M(kind === 'phone' ? nx('phm', PHONE_MISS) : CAKE.miss, 'smug', 0); } }, Math.round(ms * QT));
      }
      function evtClick() {
        const k = S.evk; if (!k) return;
        hideEvt();
        if (k === 'phone') { api.sfx('bell'); stat('calls'); api.award(1, 'reference call'); api.achieve(SN + 'caller'); M(nx('ph', PHONE), 'confused', 1); }
        else { api.sfx('tada'); stat('cakes'); api.award(3, 'cake'); api.confetti(undefined, undefined, 30); M(CAKE.wish, 'proud', 1); }
      }
      function phoneRing() { S.phoneAt = S.secs; api.sfx('bell'); showEvt('phone', '☎️', 'The phone is ringing. Answer it.', 9000); M(nx('pr', PHONE_RING), 'confused', 1); }
      function tuesday() {
        S.tueAt = S.secs; stat('tuesdays');
        if (!RM) { cl(R.stage, 'flick', true); api.setTimeout(function () { cl(R.stage, 'flick', false); }, 2200); }
        api.sfx('buzz'); M(nx('tue', TUESDAY), 'panic', 1);
        later(1500, function () { if (S.phase === 'ask' && S.cand) speak('I did not see anything.'); });
      }
      function cakeMark() {
        S.threeDone = true; S.cakeAt = S.secs; api.sfx('bell'); hopWall();
        M(CAKE.say, 'proud', 2); addSticky(CAKE.sticky); setSignB(CAKE.sign);
        showEvt('cake', '🎂', 'A birthday cake. Blow out the candle.', 14000);
      }
      function reviewMark() {
        S.tenDone = true; stat('tenure'); api.achieve(SN + 'tenure'); api.flag.set(SN + 'veteran', true);
        api.award(10, 'ten-minute review'); api.confetti(undefined, undefined, 40); api.sfx('fanfare');
        const v = { a: api.fmt(S.asked), b: api.fmt(S.nst), c: api.fmt(S.hs), d: api.fmt(api.meh()) };
        showOv(h('div', 'fan', {}, el('b', { text: 'PERFORMANCE REVIEW: ' + api.player.name }), el('h3', { text: 'Ten Minutes In Role' }),
          REV10.rows.map(function (t) { return el('p', { text: T(t, v) }); }), el('p', { text: REV10.by }), el('p', { text: REV10.all }), el('p', { text: REV10.goal }), el('p', { text: api.line('fortune') }),
          h('button', 'big', { type: 'button', 'data-a': 'review' }, 'Accept (Retroactively)')), 'review');
        M(REV10.head, 'panic', 2);
      }
      function closeReview() { if (S.ov !== 'review') return; hideOv(); S.lastInput = api.now(); M(REV10.after, 'proud', 1); }
      function clockClick() {
        S.clk++; api.sfx('tick'); stat('clock');
        if (S.clk === 17) { R.clock.lastChild.style.transform = 'rotate(108deg)'; api.achieve(SN + 'fourseventeen'); api.confetti(undefined, undefined, 30); api.sfx('fanfare'); }
        if (CLOCK[S.clk]) M(CLOCK[S.clk], 'confused', S.clk === 17 ? 2 : 1);
        else if (S.clk > 17 && S.clk % 5 === 0) M(nx('clk', CLOCK.after), 'smug', 0);
      }
      function beat() {
        const tier = S.secs < 150 / Z ? 0 : S.secs < 240 / Z ? 1 : S.secs < 420 / Z ? 2 : 3;
        M(nx('beat' + tier, BEATS[tier]), tier === 2 ? 'confused' : tier === 3 ? 'proud' : 'neutral', 0);
      }

      /* ------------------------------------------------ input handling */
      function inputEvent() {
        S.lastInput = api.now(); S.humDone = false;
        if (S.phase === 'reverse') exitReverse();
        else if (S.phase === 'asleep') { wake(); return true; }
        return false;
      }
      function onDown(e) {
        inputEvent(); if (e.button > 0) return;
        const t = e.target;
        const geo = t.closest ? t.closest('[data-geo]') : null;
        if (S.phase === 'ask' || S.phase === 'ceremony') { if (geoClick(geo ? geo.getAttribute('data-geo') : '')) return; }
        const a = t.closest ? t.closest('[data-a]') : null;
        const act = a ? a.getAttribute('data-a') : '';
        if (S.phase === 'ceremony' && act !== 'letter') { /* click skips the pleasantries */ if (!a || !a.closest('.' + K + 'ov')) skipCeremony(); return; }
        if (act === 'stare') { stareStart('btn'); return; }
        if (act === 'think') { thinkStart('ptr'); return; }
        if (!a && t.closest('[data-r="mid"]')) { stareStart('ptr'); return; }
        if (!a && e.pointerType === 'touch' && S.phase === 'ask' && t.closest('[data-r="fine"]')) { squintKey(); return; } /* on touch the finger scrolls, so each tap on the fine print is one second of squinting */
        if (S.phase === 'ask' && t.closest('[data-r="fine"]')) lensMove(e);
        S.pm = api.now(); S.px = e.clientX; S.py = e.clientY;
      }
      function onUp() { stareEnd('ptr'); stareEnd('btn'); thinkEnd('ptr'); S.touchOk = false; if (!H.st.on) { /* nothing */ } }
      function onClick(e) {
        const a = e.target.closest ? e.target.closest('[data-a]') : null;
        if (!a) return;
        const act = a.getAttribute('data-a'), k = a.getAttribute('data-k'), i = Number(a.getAttribute('data-i'));
        if (act === 'ask') ask(i);
        else if (act === 'score') score(k);
        else if (act === 'hire') decide('hire');
        else if (act === 'nohire') decide('nohire');
        else if (act === 'no') noBox();
        else if (act === 'think') { if (e.detail === 0) M(THINK.disabled, 'disappointed', 1); }
        else if (act === 'stare') { if (e.detail === 0) { stareStart('btn'); api.setTimeout(function () { stareEnd('btn'); }, 1200); } }
        else if (act === 'door') { api.sfx('tick'); S.knockN++; const kl = SPAM.knock[S.knockN]; M(kl || nx('kn', KNOCK), 'confused', kl ? 1 : 0); if (kl && S.knockN === 30) setSignB('NEXT: GERALD (THE DOOR IS HAVING A MOMENT)'); }
        else if (act === 'clock') clockClick();
        else if (act === 'evt') evtClick();
        else if (act === 'review') closeReview();
        else if (act === 'tag') { S.tagN++; speak(T(TAGS[S.tagN] || 'Eyes: {n} (confirmed). Starch: sufficient. Gravitas: pending.', { n: S.cand ? S.cand.eyes : 0 }), 'Spec sheet'); api.sfx('blip'); if (TAGS[S.tagN] && S.tagN > 3) M(TAGS[S.tagN], 'confused', 0, null, { n: S.cand ? S.cand.eyes : 0 }); } // lint-ignore
        else if (act === 'bubble') finishTyping();
        else if (act === 'tgt') { if (S.cand && S.cand.type === 'panel') { S.tgt = Number(k) || 0; syncTgt(); api.sfx('blip'); if (!S.c.dir) { S.c.dir = 1; M(BEAT.panel.direct, 'smug', 0); } } }
        else if (act === 'q0') q0Click();
        else if (act === 'q0yes') q0Yes();
        else if (act === 'wall') { const nm = sv.hired.slice(-24)[i]; if (nm) { const t = nm.n === 'Barry' ? REVIEW_BARRY : T(nx('rv', REVIEWS), { name: nm.n }); speak(t, 'Review'); if (api.now() - S.lastWall > 5000) { S.lastWall = api.now(); M(t, 'smug', 0); } } }
        else if (act === 'rtoggle') { cl(W, 'open', !W.classList.contains(K + 'open')); }
        else if (act === 'vslot') vslotClick();
        else if (act === 'met') { M(METER_SAY[Number(k) || 0], 'smug', 0); api.sfx('tick'); }
        else if (act === 'letter') finishCeremony();
        else if (act === 'sockopt') sockPick();
        else if (act === 'flipend') flipEnd();
        else if (act === 'mutyes') mutYes();
        else if (act === 'gcard') endFanfare();
        else if (act === 'cont') endContinue();
        else if (act === 'spot') spotClick(Number(k));
        else if (act === 'eyeL') winkClick();
        else if (act === 'spud') speak('Mm.', 'A Potato');
        else if (act === 'peel') peel(i, a);
      }
      const outside = function (tg) { return !!tg && tg !== document.body && tg !== document.documentElement && !root.contains(tg); }; /* Exit, Mute and friends keep their own keys: lint-ignore (only compared, never touched) */
      const nativeBtn = function (tg) { if (!tg || tg.tagName !== 'BUTTON' || tg.getAttribute('data-a') === 'stare') return false; try { return tg.matches(':focus-visible'); } catch (x) { return false; } }; /* a keyboard-focused button keeps Space */
      function onKeyDown(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const tg = e.target, tn = tg && tg.tagName ? tg.tagName : '';
        if (outside(tg)) return;
        if (tn === 'INPUT' && tg.type === 'text') return;
        const key = typeof e.key === 'string' ? e.key : '';
        if (!key) return;
        const rangeKey = tn === 'INPUT' && tg.type === 'range' && /^(Arrow|Page|Home|End)/.test(key);
        if (rangeKey) { inputEvent(); return; }
        const woke = inputEvent();
        if (S.ov === 'review' && S.phase === 'ask') { if (key === ' ' || key === 'Enter' || key === 'Escape') { e.preventDefault(); closeReview(); } return; }
        if (key === ' ' || key === 'Spacebar') {
          if (nativeBtn(tg)) return;
          e.preventDefault();
          if (e.repeat) return;
          if (woke) return;
          if (S.phase === 'ceremony') skipCeremony();
          else if (S.phase === 'ask') stareStart('space');
          else if (S.phase === 'ending' && S.efan === false) { /* no-op */ }
          return;
        }
        if (e.repeat && key !== 'x' && key !== 'X') return;
        if (key === 'Escape') {
          if (S.phase === 'ceremony') skipCeremony(); else if (S.phase === 'mutual') leaveMutual(); else if (S.phase === 'ending' && S.efan) endContinue();
          return;
        }
        if (key === 'Enter') {
          if (S.phase === 'ceremony') { e.preventDefault(); if (S.ov === 'letter') finishCeremony(); else skipCeremony(); return; }
          if (S.phase === 'ending' && !S.efan) { e.preventDefault(); endFanfare(); return; }
          if (S.phase === 'ending' && S.efan) { e.preventDefault(); endContinue(); return; }
          if (S.phase === 'mutual') { e.preventDefault(); mutYes(); return; }
          if (S.phase === 'flip' && S.ov === 'flipend') { e.preventDefault(); flipEnd(); return; }
          return;
        }
        const lk = key.length === 1 ? key.toLowerCase() : key;
        if (woke) return;
        if (S.phase === 'flip' && /^[123]$/.test(lk)) { sockPick(); return; }
        if (S.phase === 'mutual' && lk === '1') { mutYes(); return; }
        if (S.phase === 'ending' && /^[123]$/.test(lk)) { endFanfare(); return; }
        if (S.phase !== 'ask') return;
        if (lk === '1' || lk === '2' || lk === '3') { if (S.q0yes && lk === '1') q0Yes(); else ask(Number(lk) - 1); }
        else if (lk === '0') q0Click();
        else if (lk === 's' || lk === 't' || lk === 'w') score(lk.toUpperCase());
        else if (lk === 'n') noBox();
        else if (lk === 'h') decide('hire');
        else if (lk === 'd') decide('nohire');
        else if (lk === 'x') thinkStart('x');
        else if (lk === 'q') squintKey();
        else if (lk === 'r') cl(W, 'open', !W.classList.contains(K + 'open'));
        else if (lk === 'm') {
          const now = api.now();
          S.mT = S.mT.filter(function (t) { return now - t < 2000; }); S.mT.push(now);
          if (S.mT.length >= 3) mash('lawyer', true);
        }
      }
      function onKeyUp(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const out = outside(e.target);
        if (!out) S.lastInput = api.now();
        const key = typeof e.key === 'string' ? e.key : '';
        if (key === ' ' || key === 'Spacebar') { if (!out && !nativeBtn(e.target)) e.preventDefault(); stareEnd('space'); }
        else if (key === 'x' || key === 'X') thinkEnd('x');
      }

      api.on(W, 'pointerdown', onDown);
      api.on(window, 'pointerup', onUp);
      api.on(window, 'pointercancel', onUp);
      api.on(W, 'click', onClick);
      api.on(document, 'keydown', onKeyDown);
      api.on(document, 'keyup', onKeyUp);
      api.on(window, 'blur', function () { holdReset(); });
      api.on(document, 'visibilitychange', function () {
        if (document.hidden) { S.hidden = true; S.hiddenAt = api.now(); holdReset(); }
        else if (S.hidden) { S.hidden = false; S.lastInput += api.now() - S.hiddenAt; }
      });
      api.on(window, 'resize', measure);
      api.on(R.slider, 'input', onSlider);
      api.on(R.slider, 'change', onSliderChange);
      api.on(R.fine, 'pointermove', function (e) { if (S.phase === 'ask') lensMove(e); });
      api.on(R.fine, 'pointerleave', lensOff);
      api.on(W, 'pointermove', function (e) {
        S.pm = api.now(); S.px = e.clientX; S.py = e.clientY;
        if (RM || S.pmRaf) return;
        S.pmRaf = api.requestAnimationFrame(function eye() {
          S.pmRaf = 0;
          const r = R.cand.getBoundingClientRect();
          const dx = S.px - (r.left + r.width / 2), dy = S.py - (r.top + r.height / 3);
          R.cand.style.setProperty('--px', clamp(dx / 30, -5, 5).toFixed(1) + 'px'); R.cand.style.setProperty('--py', clamp(dy / 30, -5, 5).toFixed(1) + 'px');
          if (api.now() - S.pm < 1000) S.pmRaf = api.requestAnimationFrame(eye);
        });
      });
      api.onEvent('achievement', function (d) { if (d && String(d.id).indexOf(SN) === 0) { cl(R.dennis, 'wig', false); void R.dennis.offsetWidth; cl(R.dennis, 'wig', true); } });
      api.setInterval(function () {
        if (S.hidden) return;
        S.secs++;
        R.tth.textContent = '-' + (3 + Math.floor(S.secs / 7)) + ' days';
        if (!S.endedOnce && S.n < 10 && S.secs >= 600 / Z) S.endingDue = true;
        if (S.phase === 'ask' && !S.ov) {
          if (!S.threeDone && S.secs >= 180 / Z && !S.evk) { if (S.secs > 300 / Z) S.threeDone = true; else cakeMark(); }
          else if (!S.tenDone && S.secs >= 600 / Z && S.secs - S.cakeAt > 25 / Z) reviewMark();
          else if (S.secs - S.lastSay >= 20 / Z && (api.now() - S.lastInput) / 1000 * Z < 40) beat();
        }
        idleTick();
      }, 1000);

      /* ------------------------------------------------ boot */
      sv.sessions++;
      renderWall(); setSignB(NEXT_GERALD[0]); paintMeters(); paintFine();
      R.fit.textContent = '-- ' + FIT_UNITS[0];
      R.tag.textContent = 'WAITING';
      setPhase('boot');
      speak('...', 'Chair');
      api.setTimeout(function () { M(sv.sessions > 1 ? nx('ret', RETURN) : OPEN[0], 'proud', 1); }, 600);
      api.setTimeout(function () { M(sv.sessions > 1 ? OPEN[1] : OPEN[1], 'neutral', 0); }, 3200);
      api.setTimeout(function () { M(OPEN[2], 'smug', 0); }, 6200);
      if (sv.sessions > 1 && api.flag.get(SN + 'veteran')) api.setTimeout(function () { M(REV10.back, 'proud', 0); }, 9400);
      after(3000, function () { nextCandidate(); });
      persist();

      return {
        destroy() {
          try { persist(); } catch (e) { /* ignore */ }
        }
      };
    }
  });
})();
