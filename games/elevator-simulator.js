/* POINTLESS module: elevator-simulator */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const C = function (n) { return 'm-elevator-simulator-' + n; };

  P.injectCSS(`
.m-elevator-simulator-wrap{--ink:#2B2118;--cream:#FFF3D6;--brass:#C79A3B;--brass2:#F3D58A;--brass3:#A9782A;--mus:#E8B531;--coral:#F26B5B;--mint:#7FD1B0;--lilac:#B9A2E0;--wal:#4A2F1A;display:grid;grid-template-columns:3fr 2fr;gap:14px;padding:8px;color:var(--ink);font-size:14px;line-height:1.35;max-width:1100px;margin:0 auto}.m-elevator-simulator-wrap.m-elevator-simulator-narrow{grid-template-columns:1fr}.m-elevator-simulator-wrap button{font-family:inherit;color:inherit}.m-elevator-simulator-cab{position:relative;display:flex;flex-direction:column;gap:8px;padding:10px 10px 24px;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);background:repeating-linear-gradient(90deg,#4A2F1A 0 26px,#3d2615 26px 28px);transition:filter .8s ease,box-shadow .8s ease;overflow:hidden}.m-elevator-simulator-cab::after{content:"";position:absolute;left:0;right:0;bottom:0;height:16px;border-top:3px solid var(--ink);background:linear-gradient(135deg,#E8B531 25%,transparent 25%) 0 0/16px 16px,linear-gradient(225deg,#B9A2E0 25%,transparent 25%) 0 0/16px 16px,#E8B531;pointer-events:none}.m-elevator-simulator-cab.m-elevator-simulator-dim{filter:brightness(.55)}
.m-elevator-simulator-cab.m-elevator-simulator-hush{filter:brightness(.8) saturate(.8)}.m-elevator-simulator-cab.m-elevator-simulator-warm{box-shadow:4px 4px 0 var(--ink),inset 0 0 0 999px rgba(255,160,40,.14)}.m-elevator-simulator-cab.m-elevator-simulator-riding .m-elevator-simulator-hallrow{animation:m-elevator-simulator-jit .18s linear infinite}@keyframes m-elevator-simulator-jit{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}.m-elevator-simulator-ceil{display:flex;gap:8px;align-items:stretch;padding:6px;border:3px solid var(--ink);border-radius:10px;background:linear-gradient(#efe3c4,#cdbd98)}.m-elevator-simulator-lcd{position:relative;flex:none;min-width:104px;height:56px;padding:0 10px;display:flex;align-items:center;justify-content:center;border:3px solid var(--ink);border-radius:8px;cursor:pointer;color:#FFB000;background:repeating-linear-gradient(0deg,rgba(0,0,0,.4) 0 1px,transparent 1px 3px),#1A0F00;text-shadow:0 0 8px #FFB000;touch-action:none;user-select:none;-webkit-user-select:none;overflow:hidden}
.m-elevator-simulator-lcdt{font-family:Consolas,"Courier New",monospace;font-weight:900;letter-spacing:.06em;font-size:34px;white-space:nowrap;position:relative;z-index:1}.m-elevator-simulator-lcd.m-elevator-simulator-s1 .m-elevator-simulator-lcdt{font-size:24px}.m-elevator-simulator-lcd.m-elevator-simulator-s2 .m-elevator-simulator-lcdt{font-size:20px}.m-elevator-simulator-lcd.m-elevator-simulator-s3 .m-elevator-simulator-lcdt{font-size:17px}.m-elevator-simulator-lcd.m-elevator-simulator-s4 .m-elevator-simulator-lcdt{font-size:14px;background:linear-gradient(90deg,#FFB000,#F26B5B);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none}.m-elevator-simulator-lcd.m-elevator-simulator-s5 .m-elevator-simulator-lcdt{font-size:12px;background:linear-gradient(90deg,#FFB000,#F26B5B,#B9A2E0);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none}
.m-elevator-simulator-lcd.m-elevator-simulator-flick .m-elevator-simulator-lcdt{animation:m-elevator-simulator-flick .22s linear}@keyframes m-elevator-simulator-flick{0%{opacity:.85}50%{opacity:1}100%{opacity:.9}}.m-elevator-simulator-lcd.m-elevator-simulator-face::before{content:"";position:absolute;left:12px;top:7px;width:8px;height:8px;border-radius:50%;background:#FFB000;box-shadow:70px 0 0 #FFB000,0 0 6px #FFB000}.m-elevator-simulator-lcd.m-elevator-simulator-face::after{content:"";position:absolute;left:36%;bottom:4px;width:28%;height:5px;border-radius:0 0 8px 8px;border-bottom:3px solid #FFB000}.m-elevator-simulator-lcd.m-elevator-simulator-strain::after{height:3px;border-radius:2px;border-bottom:0;border-top:3px solid #FFB000;transform:skewX(-20deg)}.m-elevator-simulator-ring{position:absolute;inset:-3px;border-radius:10px;border:3px solid var(--mint);pointer-events:none;opacity:0;transition:opacity .2s}
.m-elevator-simulator-lcd.m-elevator-simulator-stare .m-elevator-simulator-ring{opacity:1;animation:m-elevator-simulator-pulse 1s ease-in-out infinite}.m-elevator-simulator-lcd.m-elevator-simulator-holding .m-elevator-simulator-ring{border-color:var(--coral);animation:none;box-shadow:0 0 14px var(--coral)}@keyframes m-elevator-simulator-pulse{50%{box-shadow:0 0 12px var(--mint)}}.m-elevator-simulator-grille{flex:1;min-width:0;display:flex;align-items:center;padding:0 8px;border:3px solid var(--ink);border-radius:8px;background:radial-gradient(circle,#2B2118 1.2px,transparent 1.7px) 0 0/8px 8px,#d8c9a3}.m-elevator-simulator-sub{max-width:100%;overflow:hidden;white-space:normal;max-height:2.7em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:11px;font-weight:700;padding:1px 6px;border-radius:6px;background:rgba(255,243,214,.9)}.m-elevator-simulator-np{flex:none;width:118px;display:flex;flex-direction:column;justify-content:center;gap:2px;font-size:10px;font-weight:800;line-height:1.1}
.m-elevator-simulator-npt{max-height:2.3em;overflow:hidden}.m-elevator-simulator-eq{display:flex;gap:3px;align-items:flex-end;height:12px}.m-elevator-simulator-eq i{display:block;width:5px;height:3px;background:var(--lilac);border:1px solid var(--ink);animation:m-elevator-simulator-eq 1s ease-in-out infinite alternate;animation-play-state:paused}.m-elevator-simulator-eq i:nth-child(2){animation-delay:-.3s}.m-elevator-simulator-eq i:nth-child(3){animation-delay:-.6s}.m-elevator-simulator-eq i:nth-child(4){animation-delay:-.9s}.m-elevator-simulator-cab.m-elevator-simulator-playing .m-elevator-simulator-eq i{animation-play-state:running}@keyframes m-elevator-simulator-eq{from{height:2px}to{height:12px}}
.m-elevator-simulator-banner{padding:6px 10px;border:3px solid var(--ink);border-radius:8px;background:var(--cream);box-shadow:3px 3px 0 var(--ink);font-weight:800}.m-elevator-simulator-banner small{display:block;font-weight:700;font-size:12px;opacity:.85}.m-elevator-simulator-bubblerow{min-height:38px;display:flex;justify-content:flex-end}.m-elevator-simulator-bubble{align-self:flex-start;max-width:86%;padding:6px 10px;border:3px solid var(--ink);border-radius:12px;background:var(--lilac);font-size:13px;font-weight:700;opacity:0;transform:translateY(4px);transition:opacity .2s,transform .2s;position:relative}.m-elevator-simulator-bubble::after{content:"";position:absolute;right:26px;bottom:-12px;border:6px solid transparent;border-top:9px solid var(--ink)}.m-elevator-simulator-bubble.m-elevator-simulator-show{opacity:1;transform:none}
.m-elevator-simulator-hallrow{display:flex;gap:10px;align-items:flex-end}.m-elevator-simulator-hall{position:relative;flex:1;min-width:0;height:178px;border:3px solid var(--ink);border-radius:8px;overflow:hidden;background:linear-gradient(#f6e9c8,#e4cf9c)}.m-elevator-simulator-vig{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:6px;text-align:center}.m-elevator-simulator-vig.m-elevator-simulator-fog{background:linear-gradient(#b9c2c4,#7e8a8d)}.m-elevator-simulator-vsign{max-width:100%;padding:1px 8px;border:2px solid var(--ink);border-radius:6px;background:var(--mus);font-weight:900;font-size:11px;letter-spacing:.04em}.m-elevator-simulator-vemo{font-size:46px;line-height:1.1;margin:4px 0}
.m-elevator-simulator-vline{max-height:74px;overflow:hidden;padding:2px 6px;border-radius:6px;background:rgba(255,243,214,.92);font-size:11.5px;font-weight:700}.m-elevator-simulator-door{position:absolute;top:0;bottom:0;width:50%;z-index:2;transition:transform .5s ease;background:repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 1px,transparent 1px 4px),linear-gradient(135deg,#C79A3B,#F3D58A 45%,#A9782A)}.m-elevator-simulator-dl{left:0;border-right:3px solid var(--ink)}.m-elevator-simulator-dr{right:0;border-left:3px solid var(--ink)}.m-elevator-simulator-hall.m-elevator-simulator-open .m-elevator-simulator-dl{transform:translateX(-100%)}.m-elevator-simulator-hall.m-elevator-simulator-open .m-elevator-simulator-dr{transform:translateX(100%)}.m-elevator-simulator-sliver{position:absolute;z-index:3;left:50%;top:0;bottom:0;width:28px;margin-left:-14px;padding:0;border:0;cursor:pointer;background:linear-gradient(90deg,transparent,#fffbe0,transparent);box-shadow:0 0 14px 4px #fff6c0}
.m-elevator-simulator-sliver.m-elevator-simulator-sliverw{width:48px;margin-left:-24px}.m-elevator-simulator-fourbox{position:relative;flex:none;width:112px;height:206px}.m-elevator-simulator-four{position:absolute;left:14px;top:0;width:84px;height:158px;transition:opacity .6s}.m-elevator-simulator-four.m-elevator-simulator-faded{opacity:.8;filter:drop-shadow(0 0 2px #F3D58A)}.m-elevator-simulator-head{position:absolute;left:19px;top:0;width:46px;height:46px;border-radius:50%;border:3px solid var(--ink);background:#f1c9a0;z-index:2;transition:transform .3s}.m-elevator-simulator-four.m-elevator-simulator-turn .m-elevator-simulator-head{transform:rotate(-12deg)}
.m-elevator-simulator-eye{position:absolute;top:16px;width:6px;height:6px;border-radius:50%;background:var(--ink);transition:transform .25s}.m-elevator-simulator-e1{left:9px}.m-elevator-simulator-e2{right:9px}.m-elevator-simulator-four.m-elevator-simulator-staring .m-elevator-simulator-eye{transform:translate(-4px,-3px)}.m-elevator-simulator-mouth{position:absolute;left:15px;bottom:7px;width:12px;height:4px;border-radius:4px;background:var(--ink);transform-origin:center}.m-elevator-simulator-four.m-elevator-simulator-talking .m-elevator-simulator-mouth{animation:m-elevator-simulator-mouth .16s ease-in-out infinite alternate}@keyframes m-elevator-simulator-mouth{from{transform:scaleY(1)}to{transform:scaleY(2.6)}}
.m-elevator-simulator-body{position:absolute;left:6px;top:44px;width:72px;height:112px;border:3px solid var(--ink);border-radius:26px 26px 8px 8px;background:var(--lilac)}.m-elevator-simulator-tie{position:absolute;left:50%;top:3px;margin-left:-8px;border-left:8px solid transparent;border-right:8px solid transparent;border-top:46px solid var(--coral)}.m-elevator-simulator-lany{position:absolute;left:4px;right:4px;bottom:10px;padding:1px 3px;border:2px solid var(--ink);border-radius:4px;background:var(--cream);font-size:9px;font-weight:800;line-height:1.1;text-align:center;transform:rotate(-4deg)}.m-elevator-simulator-awks{position:absolute;left:0;right:0;bottom:0;padding:2px 4px;border:2px solid var(--ink);border-radius:6px;background:var(--cream);font-size:10px;font-weight:900}.m-elevator-simulator-awkbar{height:6px;margin-top:2px;border:1px solid var(--ink);border-radius:3px;background:#fff;overflow:hidden}.m-elevator-simulator-awkfill{height:100%;width:30%;background:var(--mint);transition:width .3s,background .3s}
.m-elevator-simulator-signs{padding:3px 8px;border:2px dashed var(--ink);border-radius:6px;background:var(--cream);font-size:11px;font-weight:700;min-height:22px}.m-elevator-simulator-plaques{display:flex;flex-wrap:wrap;gap:6px;align-items:center;min-height:0}.m-elevator-simulator-pq{padding:1px 8px;border:2px solid var(--ink);border-radius:4px;background:linear-gradient(135deg,#C79A3B,#F3D58A,#A9782A);font-size:11px;font-weight:900}.m-elevator-simulator-frame{padding:1px 10px;border:3px solid var(--ink);outline:2px solid var(--brass2);background:var(--cream);font-weight:900}.m-elevator-simulator-placard{display:none;font-size:11px;font-weight:800;padding:1px 6px;border-radius:4px;background:var(--cream)}.m-elevator-simulator-tiny .m-elevator-simulator-placard{display:inline-block}
.m-elevator-simulator-tray{display:flex;flex-wrap:wrap;gap:6px}.m-elevator-simulator-tray button{min-height:44px;padding:4px 12px;border:3px solid var(--ink);border-radius:999px;background:var(--cream);box-shadow:2px 2px 0 var(--ink);font-weight:800;cursor:pointer;font-size:13px}.m-elevator-simulator-tray button:hover{background:#fff}.m-elevator-simulator-tray button:active{transform:translate(2px,2px);box-shadow:0 0 0 var(--ink)}.m-elevator-simulator-ann{min-height:64px;max-height:11em;overflow:auto;padding:8px 10px;border:3px solid var(--ink);border-radius:8px;background:var(--cream);box-shadow:3px 3px 0 var(--ink);font-size:13px}.m-elevator-simulator-ann p{margin:0}.m-elevator-simulator-ann p+p{margin-top:4px;opacity:.85}
.m-elevator-simulator-cap{position:absolute;right:8px;top:2px;font-size:26px;z-index:4}.m-elevator-simulator-clip{position:absolute;left:8px;bottom:22px;font-size:22px;z-index:4}.m-elevator-simulator-panel{position:relative;align-self:start;padding:12px;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);background:repeating-linear-gradient(90deg,rgba(255,255,255,.14) 0 1px,transparent 1px 3px),linear-gradient(135deg,var(--brass),var(--brass2) 45%,var(--brass3))}.m-elevator-simulator-panel.m-elevator-simulator-wet::after{content:"WET PAINT";position:absolute;inset:0;z-index:5;border-radius:11px;display:flex;align-items:center;justify-content:center;font-weight:900;letter-spacing:.2em;pointer-events:none;background:repeating-linear-gradient(45deg,rgba(255,235,59,.6) 0 12px,rgba(43,33,24,.2) 12px 24px)}.m-elevator-simulator-pbody{display:flex;gap:10px}.m-elevator-simulator-pcol{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px}
.m-elevator-simulator-floors{display:grid;grid-template-columns:repeat(4,1fr);gap:12px 8px;justify-items:center;align-items:center}.m-elevator-simulator-tiny .m-elevator-simulator-floors{grid-template-columns:repeat(3,1fr)}.m-elevator-simulator-fb{position:relative;width:48px;height:48px;padding:0;border-radius:50%;border:3px solid var(--ink);cursor:pointer;font-weight:900;font-size:13px;background:radial-gradient(circle at 35% 30%,#fff7df,#d9c58f 70%,#a98a45);box-shadow:0 3px 0 rgba(43,33,24,.55),0 0 calc(var(--g,0)*14px) calc(var(--g,0)*4px) rgba(242,107,91,.85);transition:transform .08s,background .2s,box-shadow .2s}.m-elevator-simulator-fb::before{content:"";position:absolute;inset:3px;border-radius:50%;border:2px dotted rgba(43,33,24,.35);pointer-events:none}.m-elevator-simulator-fb:active{transform:scale(.92)}.m-elevator-simulator-fb.m-elevator-simulator-lit{background:radial-gradient(circle at 35% 30%,#ffe3dc,var(--coral) 70%);animation:m-elevator-simulator-glow .9s ease-in-out infinite alternate}
@keyframes m-elevator-simulator-glow{to{box-shadow:0 3px 0 rgba(43,33,24,.55),0 0 14px 5px rgba(242,107,91,.9)}}.m-elevator-simulator-fb.m-elevator-simulator-fill::after{content:"";position:absolute;inset:0;border-radius:50%;background:rgba(43,33,24,.35);animation:m-elevator-simulator-fillup .4s linear}@keyframes m-elevator-simulator-fillup{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0)}}.m-elevator-simulator-half{width:36px;height:36px;font-size:11px;box-shadow:0 2px 0 rgba(43,33,24,.55),0 0 var(--halo,0px) calc(var(--halo,0px)/3) rgba(242,107,91,.9);background:radial-gradient(circle at 35% 30%,#fff1d0,color-mix(in srgb,#d9a24a calc(var(--w,0)*100%),#d9c58f) 70%)}.m-elevator-simulator-half::before{inset:2px}.m-elevator-simulator-half::after{content:"";position:absolute;inset:-6px;border-radius:50%}
.m-elevator-simulator-half.m-elevator-simulator-wink{animation:m-elevator-simulator-wink 1.6s ease-in-out infinite}@keyframes m-elevator-simulator-wink{50%{box-shadow:0 2px 0 rgba(43,33,24,.55),0 0 12px 5px rgba(232,181,49,.95)}}.m-elevator-simulator-half.m-elevator-simulator-sticker .m-elevator-simulator-fl::after{content:"";position:absolute;right:-4px;top:-5px;width:9px;height:9px;border-radius:2px;background:var(--mint);border:1px solid var(--ink);transform:rotate(12deg)}.m-elevator-simulator-plate{background:radial-gradient(circle at 35% 30%,#d9cfb2,#a89e82 70%);border-style:double}.m-elevator-simulator-wide{width:auto;min-width:48px;padding:0 12px;border-radius:24px;font-size:11px;line-height:1.1;min-height:48px;height:auto}.m-elevator-simulator-badge{position:absolute;right:-7px;top:-7px;min-width:18px;height:18px;padding:0 3px;border-radius:9px;border:2px solid var(--ink);background:var(--cream);font-size:10px;line-height:14px;font-weight:900;display:none}
.m-elevator-simulator-has>.m-elevator-simulator-badge{display:block}.m-elevator-simulator-fl{pointer-events:none}.m-elevator-simulator-hide{display:none!important}.m-elevator-simulator-tired .m-elevator-simulator-fb{transform:skewY(3deg);filter:saturate(.7)}.m-elevator-simulator-dimfloors .m-elevator-simulator-floors{opacity:.4}.m-elevator-simulator-sec{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.m-elevator-simulator-sb{min-width:46px;min-height:44px;padding:4px 10px;border:3px solid var(--ink);border-radius:10px;background:linear-gradient(#fff3d0,#d9c58f);box-shadow:0 3px 0 rgba(43,33,24,.55);font-size:11px;font-weight:900;cursor:pointer;position:relative}.m-elevator-simulator-sb:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(43,33,24,.55)}.m-elevator-simulator-xtra{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center}.m-elevator-simulator-lever{display:flex;gap:12px;align-items:center;justify-content:center;padding:8px;border:3px solid var(--ink);border-radius:10px;background:rgba(43,33,24,.15);animation:m-elevator-simulator-slide .5s ease-out}@keyframes m-elevator-simulator-slide{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}.m-elevator-simulator-track{position:relative;width:30px;height:150px;border:3px solid var(--ink);border-radius:15px;background:var(--wal)}
.m-elevator-simulator-handle{position:absolute;left:-3px;bottom:-3px;width:36px;height:36px;padding:0;border-radius:50%;border:3px solid var(--ink);background:radial-gradient(circle at 35% 30%,#fff1c0,var(--brass) 70%);cursor:grab;touch-action:none;transition:transform .25s}.m-elevator-simulator-handle.m-elevator-simulator-hot{box-shadow:0 0 12px 3px var(--mint)}.m-elevator-simulator-nudge{min-width:76px;min-height:48px;padding:4px 14px;border:3px solid var(--ink);border-radius:999px;background:var(--mint);box-shadow:3px 3px 0 var(--ink);font-weight:900;cursor:pointer;touch-action:none}.m-elevator-simulator-nudge:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-elevator-simulator-shaft{flex:none;width:68px;border:3px solid var(--ink);border-radius:8px;background:rgba(255,243,214,.8)}.m-elevator-simulator-shaft svg{display:block;width:100%;height:auto}
.m-elevator-simulator-shaft text{font-size:9px;font-weight:700;fill:#2B2118}.m-elevator-simulator-dot{animation:m-elevator-simulator-dotp 1.2s ease-in-out infinite alternate}@keyframes m-elevator-simulator-dotp{from{opacity:.4}to{opacity:1}}.m-elevator-simulator-narrow .m-elevator-simulator-floors{max-width:380px;width:100%;margin:0 auto}.m-elevator-simulator-narrow .m-elevator-simulator-shaft{width:26px}.m-elevator-simulator-narrow .m-elevator-simulator-shaft text{display:none}
.m-elevator-simulator-narrow .m-elevator-simulator-four{transform:scale(.8);transform-origin:top center}.m-elevator-simulator-narrow .m-elevator-simulator-np{width:90px}.m-elevator-simulator-tiny .m-elevator-simulator-lcd{min-width:84px}.m-elevator-simulator-tiny .m-elevator-simulator-np{display:none}.m-elevator-simulator-tiny .m-elevator-simulator-fourbox{width:96px}.m-elevator-simulator-tiny .m-elevator-simulator-hall{height:auto;min-height:176px}
.m-elevator-simulator-tiny .m-elevator-simulator-vig{position:relative;inset:auto;min-height:176px}.m-elevator-simulator-tiny .m-elevator-simulator-vline{max-height:none;font-size:10.5px}.m-elevator-simulator-tiny .m-elevator-simulator-vemo{font-size:30px!important}.m-elevator-simulator-tiny .m-elevator-simulator-lany{font-size:8px}.m-elevator-simulator-tiny .m-elevator-simulator-goal small,.m-elevator-simulator-tiny .m-elevator-simulator-banner small{display:none}.m-elevator-simulator-tiny .m-elevator-simulator-bubblerow{min-height:30px}
.m-elevator-simulator-echo{display:none}.m-elevator-simulator-narrow .m-elevator-simulator-echo{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;position:sticky;top:0;z-index:4;margin:0 0 10px;padding:6px 8px;border:3px solid var(--ink);border-radius:8px;background:var(--cream);box-shadow:2px 2px 0 var(--ink);font-size:12px;font-weight:700}.m-elevator-simulator-fourbox.m-elevator-simulator-withhalf{width:150px}.m-elevator-simulator-halfp{position:absolute;right:0;top:44px;width:36px;height:114px;overflow:hidden;pointer-events:none;transition:opacity .6s}.m-elevator-simulator-hhead{position:absolute;left:-23px;top:0;width:46px;height:46px;border-radius:50%;border:3px solid var(--ink);background:#f1c9a0;z-index:2}.m-elevator-simulator-hhead i{position:absolute;left:30px;top:16px;width:6px;height:6px;border-radius:50%;background:var(--ink)}
.m-elevator-simulator-hbody{position:absolute;left:-36px;top:44px;width:72px;height:70px;border:3px solid var(--ink);border-radius:26px 26px 8px 8px;background:var(--lilac)}.m-elevator-simulator-htie{position:absolute;left:0;top:47px;border-right:8px solid transparent;border-top:46px solid var(--coral)}.m-elevator-simulator-hshoe{position:absolute;left:3px;bottom:0;width:22px;height:8px;border:2px solid var(--ink);border-bottom:0;border-radius:7px 7px 0 0;background:var(--ink)}.m-elevator-simulator-tiny .m-elevator-simulator-halfp{display:none}.m-elevator-simulator-tiny .m-elevator-simulator-fourbox.m-elevator-simulator-withhalf{width:96px}.m-elevator-simulator-fb,.m-elevator-simulator-sb,.m-elevator-simulator-tray button{touch-action:manipulation;-webkit-user-select:none;user-select:none}
.m-elevator-simulator-nudge{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}@media (prefers-reduced-motion:reduce){.m-elevator-simulator-door{transition:opacity .15s;transform:none!important}.m-elevator-simulator-hall.m-elevator-simulator-open .m-elevator-simulator-door{opacity:0}.m-elevator-simulator-cab.m-elevator-simulator-riding .m-elevator-simulator-hallrow,.m-elevator-simulator-eq i,.m-elevator-simulator-lever,.m-elevator-simulator-fb.m-elevator-simulator-lit,.m-elevator-simulator-fb.m-elevator-simulator-half.m-elevator-simulator-wink,.m-elevator-simulator-lcd.m-elevator-simulator-stare .m-elevator-simulator-ring,.m-elevator-simulator-dot,.m-elevator-simulator-four.m-elevator-simulator-talking .m-elevator-simulator-mouth,.m-elevator-simulator-fb.m-elevator-simulator-fill::after,.m-elevator-simulator-lcd.m-elevator-simulator-flick .m-elevator-simulator-lcdt{animation:none}}.pm-reduce-motion .m-elevator-simulator-door{transition:opacity .15s;transform:none!important}.pm-reduce-motion .m-elevator-simulator-hall.m-elevator-simulator-open .m-elevator-simulator-door{opacity:0}.pm-reduce-motion .m-elevator-simulator-cab.m-elevator-simulator-riding .m-elevator-simulator-hallrow,.pm-reduce-motion .m-elevator-simulator-eq i,.pm-reduce-motion .m-elevator-simulator-lever{animation:none}.pm-reduce-motion .m-elevator-simulator-fb.m-elevator-simulator-lit,.pm-reduce-motion .m-elevator-simulator-ring,.pm-reduce-motion .m-elevator-simulator-dot,.pm-reduce-motion .m-elevator-simulator-mouth,.pm-reduce-motion .m-elevator-simulator-fb::after,.pm-reduce-motion .m-elevator-simulator-lcdt,.pm-reduce-motion .m-elevator-simulator-half.m-elevator-simulator-wink{animation:none!important}
`, 'css-elevator-simulator');

  P.addAchievements([
    { id: 'elevator-simulator.first-ride', name: 'Grand Marshal of the Maiden Ascent to Roughly Somewhere', desc: 'Complete your first ride. You pressed one floor and arrived at another, which is the whole job.', icon: '🎖️', reward: 1 },
    { id: 'elevator-simulator.small-talk', name: 'Supreme Laureate of Small Talk (Provisional)', desc: 'Complete 5 small talks with Four, including at least one "Yep."', icon: '🗣️', reward: 3 },
    { id: 'elevator-simulator.zeno', name: "Zeno's Most Humble Servant, Duke of the Decimal", desc: 'Nudge the cab to 7.4999 without ever arriving.', icon: '➗', reward: 5 },
    { id: 'elevator-simulator.door-close', name: 'Archduke of the Placebo Door Close', desc: 'Press Door Close 50 times. Nothing closes. A plaque is installed.', icon: '🚪', reward: 3 },
    { id: 'elevator-simulator.near-miss', name: 'Grand Order of the Near Miss (Seven, Class of Eight)', desc: 'Press 7 1/2 and arrive at floor 7 or 8. Management calls this a personal best.', icon: '📏', reward: 2 },
    { id: 'elevator-simulator.silencer', name: 'Supreme Silencer of the Held Breath', desc: 'Trigger the Awkwardness 10 Silence and press nothing for 6 seconds.', icon: '🤫', reward: 2 },
    { id: 'elevator-simulator.stare', name: 'Warden of the Number', desc: 'Studied the number for 6 seconds. Management is moved.', icon: '👁️', reward: 2 },
    { id: 'elevator-simulator.arrived', name: 'Grand Order of the Exact Arrival (Paperwork Pending)', desc: 'The double hit 7.5. The paperwork says 7. The paperwork has been asked to reconsider.', icon: '📜', reward: 10 },
    { id: 'elevator-simulator.silence-between', name: 'Dowager Empress of the Silence Between the Floors', desc: 'Do nothing for 3 minutes. Nothing was done magnificently.', icon: '🕯️', secret: true, reward: 5 },
    { id: 'elevator-simulator.crack', name: 'Keeper of the Hallway That Is Secretly Another Elevator', desc: 'Click the door crack between 7 and 8 in time and meet the sock.', icon: '🧦', secret: true, reward: 5 },
    { id: 'elevator-simulator.typed', name: 'Registrar of the Decimal on the Wall', desc: 'Type 7.5. The elevator does not do decimals. It wrote it down anyway.', icon: '🖼️', secret: true, reward: 3 },
    { id: 'elevator-simulator.spam', name: 'Chairman of Every Floor, Detained by Himself', desc: 'Press so many buttons that Elevator Security detains the elevator.', icon: '🚨', secret: true, reward: 3 },
    { id: 'elevator-simulator.friend', name: 'Grand Duke of the Comfortable Silence, Protector of the Corner, Four\'s Only Friend (Elevator Division)', desc: 'Say nothing to Four three talks in a row. He has never been this happy. He is also the elevator.', icon: '🤝', secret: true, reward: 7 },
    { id: 'elevator-simulator.seed', name: 'Lead Investor in the Seed Round of Nothing (Oversubscribed)', desc: 'Sit through all four slides of Four\'s elevator pitch. He raised nothing, gently, and it was oversubscribed.', icon: '📊', secret: true, reward: 3 },
    { id: 'elevator-simulator.whole', name: 'Registrar of the Whole Person (Provisional)', desc: 'Meet the half person aboard, then reach the end. The other half was on Floor 7 the whole time.', icon: '🧩', secret: true, reward: 5 }
  ]);

  /* ---------- content ---------- */
  const FI = {
    B3: [-3, 'Basement 3', 'B3', 'B3'], B2: [-2, 'Basement 2', 'B2', 'B2'], B1: [-1, 'Basement 1', 'B1', 'B1'], L: [0, 'the Lobby', 'L', 'L'],
    '12B': [12.5, '12B', '12B', '12B'], ROOF: [13, 'Roof (Indoor)', 'R', 'Roof (Indoor)'], MINUS: [6.9, '7 minus a bit', '6.9', '7 minus a bit'],
    OTHER: [0, 'The Other Lobby', 'L', 'The Other Lobby'], CUR: [null, 'Floor (Current)', '--', 'Floor (Current)'], F13: [13, 'Floor 13', '13', '']
  };
  for (let i = 1; i <= 12; i++) FI[String(i)] = [i, String(i), String(i), String(i)];
  const BASE = ['B2', 'B1', 'L', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const EXTRA = ['B3', '12B', 'ROOF', 'MINUS', 'OTHER', 'CUR'];
  const EXACT = EXTRA.concat(['F13']);
  const KEYOF = { '-3': 'B3', '-2': 'B2', '-1': 'B1', '0': 'L' };

  const VIG = {
    B3: ['🌫️', 'BASEMENT 3', 'Basement 3. This floor was built from the leftover feelings of the other basements.', 'Basement 3. A sign says THIS IS NOT THE END. A second sign says IT IS A LONG WAY DOWN TO FIND OUT.', 'Basement 3. A single bare bulb is counting the days. It has stopped telling anyone the number.'],
    B2: ['🌫️', 'BASEMENT 2', 'Basement 2. Nobody is down here but the sense of having made a choice.', 'Basement 2. A dehumidifier hums a song about being needed.', 'Basement 2. A fire extinguisher hangs on the wall with the calm of something never once asked for anything.'],
    B1: ['📦', 'BASEMENT 1: STORAGE (OF STORAGE)', 'Basement 1. Boxes labeled Other Boxes. The boxes are accurate.', 'Basement 1. A mop in a bucket. The bucket is the manager.', 'Basement 1. A lost-and-found shelf holds one umbrella, one glove, and a tag that reads FOUND (LOST).'],
    L: ['🌿', 'LOBBY', 'The Lobby. You did not ask for it. It asked for you, by letter, in March.', 'The Lobby. Dennis (Plant) looks at you and says nothing. This is his entire job.', 'The Lobby. A directory lists 41 departments. Forty are on Floor 5. The other is Dennis.'],
    '1': ['🔔', 'FLOOR 1: RECEPTION (UNMANNED, WELL-LOVED)', 'Floor 1. A reception desk with a bell. The bell is on hold.', "Floor 1. A visitor's book with one signature: Visitor.", 'Floor 1. A ticket machine offers number 1,204. Now serving: 1. The wait is philosophical.'],
    '2': ['📋', 'FLOOR 2: MEETINGS', 'Floor 2. Doors opening on a meeting that has been going since Thursday. The doors close on a smaller one.', 'Floor 2. A man holding a clipboard that holds a smaller clipboard. He nods. You nod. Per policy.', 'Floor 2. Two conference rooms: BOOKED and ALSO BOOKED. They are the same room, double-booked with itself.'],
    '3': ['🖨️', 'FLOOR 3: PHOTOCOPIES', 'Floor 3. A lone photocopier, silently copying a single smudge since March.', 'Floor 3. A water cooler that has been out of water since a meeting that could have been a floor.', 'Floor 3. The copier has made a copy of the copier. The copy is also jammed, but younger.'],
    '4': ['🥔', 'FLOOR 4: SPUDS (ANNEX)', 'Floor 4. Everyone here is very quiet and very round.', 'Floor 4. The saxophone has left the building, but its sound remains.', 'Floor 4. A sack marked SPUDS (SENIOR) leans on a desk and runs a meeting by saying nothing, firmly.'],
    '5': ['🗄️', 'FLOOR 5: FILING', 'This elevator has stopped at Floor 5 to let nothing out. Nothing thanks you for your patience.', "Floor 5. A filing cabinet containing the filing cabinet's own file.", 'Floor 5. A cabinet labeled MISC contains a cabinet labeled MISC. Compliance is moved but not surprised.'],
    '6': ['🎈', 'FLOOR 6: MANDATORY FUN', 'Floor 6. A single balloon labeled MANDATORY FUN (BYO PARTY). The balloon is losing the argument.', 'Floor 6. The balloon has been here since the party, which was cancelled, on a Tuesday, in advance.', 'Floor 6. A banner says CONGRATULATIONS. It does not say to whom. It has been up since the first quarter.'],
    '7': ['🧦', 'FLOOR 7: THE PAPERWORK FLOOR', 'Arrived: Floor 7. Technically 7. Specifically 7.0, which is the loneliest way to be 7.', 'On the hallway floor, a single sock, facing away. It appears to be en route to somewhere with purpose. You are not invited.', 'Floor 7. A plaque reads OPEN 9 TO 5 AND A HALF. Nobody has asked which half. It is the left one.'],
    '8': ['🧶', 'FLOOR 8: A VERY QUIET CARPET', 'Floor 8. A very quiet carpet. It has something to say, and has decided against it.', 'Floor 8. A second carpet has been laid over the first, for depth. The first carpet has not been told.', 'Floor 8. A dropped pin makes no sound here. A pin has been tried. The carpet is proud.'],
    '9': ['🧥', 'FLOOR 9: SHADE', 'Floor 9. A coat on a hook. The coat is not occupied. The coat is wearing a lanyard.', 'Floor 9. The plant has grown another 6 inches. It has been given a title: Associate Director of Shade.', 'Floor 9. The plant is now taller than the ceiling tile above it. The tile has been moved, and offered a role.'],
    '10': ['☎️', 'FLOOR 10: CALLS', 'Floor 10. Everyone here is on a call. The call is about this elevator.', "Floor 10. A man says 'circling back' to a plant. The plant is Dennis. Dennis does not circle.", 'Floor 10. Someone says "let us take this offline." Everyone nods. The call continues, offline, at the same volume.'],
    '11': ['🧮', 'FLOOR 11: DEPARTMENT OF FLOORS 10 AND 12', 'Floor 11. It is the same as Floor 3, but with higher self-esteem.', 'Floor 11. The Department of Floors 10 and 12 is in a dispute. The dispute is on Floor 11.', 'Floor 11. An abacus clicks on a desk in a pattern that spells nothing and bills for it.'],
    '12': ['🏢', 'FLOOR 12: THE TOP', 'Floor 12. The top. Beyond it, only Tuesday.', 'Floor 12. An open-plan office where every desk is occupied by a coat with confidence.', 'Floor 12. A window faces Floor 13. There is no Floor 13. It is a very good view.'],
    '12B': ['🎞️', 'FLOOR 12B', 'Arrived at Floor 12B. The building has no Floor 13. Floor 12B is a rumor with carpeting.', 'Floor 12B. A carpet, and the rumor of a chair.', 'Floor 12B. The building directory shows this floor as a dotted line and the words PER RUMOR.'],
    ROOF: ['☁️', 'ROOF (INDOOR)', 'Roof (Indoor). It is raining on the carpet in a very controlled way.', 'Roof (Indoor). A sky has been installed. The sky has opinions about the sky.', 'Roof (Indoor). A weathervane spins in the ceiling. It points firmly at the idea of north.'],
    MINUS: ['📏', 'FLOOR 7 MINUS A BIT', 'You are fractionally under 7. The bit has been informed.', 'Floor 7 minus a bit. The bit is not here. The bit is on Floor 8, plus a bit.', 'Floor 7 minus a bit. A sock lies here too, slightly shorter. It is not the same sock. They know each other.'],
    OTHER: ['🌿', 'THE OTHER LOBBY', 'The Other Lobby. It is the same as the Lobby but slightly more confident.', 'The Other Lobby. Dennis (Plant) is also here. Dennis (Plant) says it is a coincidence.', 'The Other Lobby. The plant is the same height as the first plant, to the millimeter, out of spite.'],
    CUR: ['👣', 'FLOOR (CURRENT)', 'Floor (Current). You are here. It is the only floor guaranteed to be.', 'Floor (Current). Doors open on the doors you just came through.', 'Floor (Current). A sign says YOU ARE HERE. A second sign, lower down, says SO WERE WE.'],
    F13: ['⬜', 'FLOOR 13: NOT INCLUDED', 'Floor 13: Not Included. This floor was not in the original estimate. It is not in the revised estimate either.', 'Floor 13. The display reads 13 and nothing else. There is a polite sign. The sign is in good condition.', 'Floor 13. A small brass plate reads PLEASE DO NOT TELL FLOOR 12. Floor 12 has been told.']
  };
  const DENNIS10 = 'Dennis has been promoted to Floor 1 Ambassador. Dennis has not been told. Dennis is a plant.';
  const DENNIS20 = 'Dennis is thriving elsewhere. A note on the wall says so. The note is not signed by Dennis.';
  const GERALD7 = "Gerald (VP of Spuds) is standing on Floor 7. 'Seven is the greatest floor,' he says. 'It has a half.' The elevator does not stop for him. Management says: Gerald has been informed.";

  const WELCOME = ['Welcome aboard. This elevator serves floors 1 through 12, and on request, feelings.', 'Your destination is Floor 7 and a half. It is on the panel, between 7 and 8, being small about it.', 'Floor 7 and a half is where the 7 and the 8 shake hands. Please do not interrupt.', 'Please stand clear of the doors, the walls, and any conclusions.',
    'The elevator is thinking about your request. The request has been put on a post-it. The post-it is on Floor 6.'];
  const PLAQUE = 'This elevator has been inspected by Sandra. Sandra did not ride it. Sandra took the stairs and has opinions.';
  const GOALV = ['Please select it.', 'It has been selected for you.', 'Guidance only.', 'It is not on the panel in the way you are thinking.', 'Selection is optional. Arrival is a separate form.'];
  const FIRST_DEV = 'You pressed <FP>. You have been delivered to <FA>. Management calls this a scenic route to the correct number.';
  const ARRIVE = ['Doors opening. Doors reconsidering. Doors opening.', 'You have been delivered to <FA>. You did not ask for <FA>. <FA> asked for you.', 'Please mind the gap between expectation and the floor.', 'Doors opening. Please mind the gap, the step, and the lip of carpet that has a name.',
    'This elevator travels at a speed best described as mid-morning.', 'Please hold the doors. The doors are holding you. This is a mutual arrangement.', 'You have been in this elevator for <C> <RW>. Elevators are designed for 40 seconds. We believe in you.',
    'Reminder: the stairs are available. The stairs are on a different floor. The different floor is the stairs.', 'The elevator has reviewed what you pressed and has decided to treat it as a draft.', 'You have arrived at <FA>. It has been there since 1974 and is visibly not waiting for you.', 'Doors opening. A draft steps into the cab, looks around, and leaves without comment.',
    'Please note that the doors open at the floor, not for the floor. The floor has been told.', 'The elevator has arrived and would like a moment to process what it has done.', 'Arrival confirmed by one (1) ding and a second ding held in reserve.', 'This floor is open 9 to 5, and 5 to 9 on request, and at no time on Thursdays.',
    'The elevator has checked, and you are definitely here. It cannot vouch for the building.', 'Doors opening on a hallway in good standing. No one has complained about it since 2011.', 'You have arrived. Please collect your belongings, your posture and the expression you came in with.', 'A floor, as requested. A different floor, as supplied. The difference is held in escrow.',
    'The doors open with the caution of a man testing a bath.', 'If this is not the floor you wanted, please file Form 27B/6. If it is, please file it anyway.', 'Mind the step. The step is one millimeter high. It has hurt people.', 'The elevator went up, then across, then briefly and apologetically sideways.',
    'Please do not thank the elevator. It becomes difficult to manage.', 'Arrived. The elevator initialed the arrival. The initials are E. and a smudge.', 'The ceiling light flickers once, in solidarity with nothing in particular.', 'Doors opening. The elevator would like to apologize for nothing, and will itemize later.',
    'Doors opening on <FA>. The floor was told you were coming and has done what it could with the lighting.', 'The elevator would like to confirm that <FA> is a floor. It has checked twice. It is still a floor.', 'Arrival at <FA>. The carpet has been informed. The carpet has opinions about being informed.',
    'A small bell, a smaller silence, and then <FA>. In that order, by regulation.', 'Please exit the elevator the way you entered: uncertain, and slightly to the left.', 'The elevator has stopped. It would like it noted that it chose to.',
    'You have taken <C> <RW> today. The elevator has stopped being surprised and started being fond.', 'Doors opening. The elevator is not sure this is the floor, but it is very sure about the doors.', 'This floor was last visited in a different decade, by someone with a better hat.',
    'A small sign in the cab says THANK YOU FOR YOUR PATIENCE. It is a sign with a lot to be patient about.', 'The floor indicator and the doors have agreed on <FA>, for now. It is a working arrangement.', 'Doors opening on a hallway that has seen you before and has decided not to mention it.',
    'The elevator hums the last bar of something and lets the doors do the rest.', 'Arrival confirmed. The elevator is giving itself a round of applause. It is a very quiet round.'];
  const AGAIN = ['You have been delivered to where you already were. This is called efficiency.', 'You have arrived at the floor you are on. The elevator calls this a bold reading of the request.', 'Same floor. New doors. The elevator has changed everything except the part you can see.', 'You have gone nowhere, at speed. The elevator asks that you not tell the other elevators.'];
  const PREFIX = ['You pressed <FP>. You have been delivered to <FA>.', 'Going to <FP>. Arriving at <FA>.', 'Requested: <FP>. Provided: <FA>.', 'You pressed <FP>. The elevator heard <FA>.'];
  const DTYPE = ['Ambient', 'Pre-emptive', 'Scheduled Surprise', 'Per the Stranger', 'Per Sandra', 'Technically', 'Administrative', 'Seasonal', 'Retroactive', 'Weather-Adjacent', 'Courtesy', 'Interim'];
  const DBODY = ['The elevator wanted to see how you would react.', 'You reacted. See the previous reason.', 'A floor was lonely and has been compensated.', 'The cable felt strongly.', 'It was nearer, in a sense that has been withheld.', 'The building is taller on Mondays, and it is a Monday somewhere.', 'The doors voted. The doors abstained. The elevator broke the tie.',
    'A man on <A> had a feeling about you.', 'The number you pressed was already taken. It has been sent to Lost Numbers.', '<A> asked for you by name. The name was Passenger.', 'The elevator took the scenic route. The scenery is a corridor.', 'The counterweight had a moment, and the moment went to <A>.', 'Maintenance has not visited <A> in some time, and it wished to be seen.',
    '<A> was the closest floor to the idea of <P>.', 'Management requested a different outcome and was not clear which.', "The elevator's horoscope said to go to <A>. Horoscopes are binding.", 'It has always been <A>. You simply arrived in the wrong decade.', 'A rule exists. Sandra will provide it later.', 'The floor indicator and the floor did not see eye to eye.',
    'Gravity declined to comment.', 'The elevator remembered it had left something on <A>. It has not remembered what.', 'Per the previous passenger, who is still on Floor 9.', 'No reason. The reason has been filed under Reasons.', 'A draft in the shaft had a hunch. The draft has since been let go.', 'See the sticky note on <A>. The sticky note is also a reason.', 'The elevator was asked to be more proactive. It has begun arriving at things before they are pressed. Results are mixed, and early.',
    'The doors of <A> were already open and it felt rude to wait.', 'A form was filled out in the elevator\'s name. The elevator is honoring it out of courtesy.', 'Reasons are down to the last of the good ones. This is one of the other ones.', 'Someone on <A> pressed the same button at the same moment. The elevator split the difference. The difference was <A>.',
    'The elevator misheard <P> as <A>, and then, out of pride, committed.', 'It was a coin toss. The coin was a floor. It landed on <A>.', 'Seniority. <A> has been in the building longer than <P> and has the paperwork.', 'The stairs asked the elevator to take this one off their hands.',
    'Tuesday called ahead, and the elevator did not want to be on <P> when it arrived.', 'Insurance. The elevator was not told which kind and has chosen <A>.', 'The ride was too smooth. Management asked for a bit more of an experience.', 'A carpet on <A> was in a mood, and the elevator owed it a favor.', 'Sandra has measured <P> and found it 6 millimeters taller than <A>. This is unrelated. It is on the form.'];
  const SELFREF = ['Reason <N> cites Reason <K>, which cites this sentence.', 'Reason <N> cites Reason <K>, which cites the sentence you are reading.', 'Reason <N> cites Reason <K>, which is on Floor 5, filing itself.'];
  const HAND = ['Going to 9. Arriving at 4. Reason: Ambient.', 'Deviation noted on Form 27B/6. Reason <N> cites Reason 3, which cites this sentence.', 'You pressed 6. You have been delivered to 2. The elevator regrets nothing and has put that in writing.', 'Deviation <N> filed. The deviation has been deviated.',
    'Reason <N>: The elevator has a policy of arriving. The policy does not specify where.', 'Reason 22: The elevator wanted to see how you would react. Reason 23: You reacted. Reason 24: See Reason 22.', 'Deviation <N> filed. Reason <N> is a photograph of Reason 2. It is not a good photograph.', 'Reason <N>: Please see the reverse of this form. The reverse of this form is Floor 5.',
    'Deviation <N>. The elevator has taken the matter up with itself and lost.', 'Reason <N>: The elevator could not hear itself think and went somewhere quieter. It was not quieter.'];
  const DEV12 = 'Deviation 13 has been filed on Form 27B/7. Form 27B/7 was destroyed in 1998. It has been filed on the memory of it.';
  const DEV25 = 'Deviation 25. The deviations have been moved to a larger room. The room is Floor 5.';
  const DEV50 = 'Fifty deviations. Management has framed one. It is Reason 17. It is very good.';

  const OPEN_PRE = [
    'Cold in here, isn\'t it. Or it\'s warm. One of those. Which one is it for you?', 'Do you come to this floor often? I don\'t mean this floor. I mean any of them.', 'Nice weather we\'re having. I haven\'t checked. I\'d say it either way.', 'Long day? I\'ve had the same day since Floor 2.',
    'I once said hello to a man for eleven floors. We never spoke again. He is Floor 11 now.', 'That\'s a nice way of standing. Is that how you stand? Don\'t change it.', 'Sorry, that was my cable. I\'m very emotional in the mornings.', 'Do you ever think about how we\'re all just going up and down in a box? Anyway, how\'s your sister?',
    'I\'m going to the floor I\'m going to. It\'s in my calendar. I haven\'t opened the calendar.', 'Do you believe in Floor 13? I don\'t. I just think it\'s very private.', 'Did you take the stairs to get here? ...There are stairs. Please don\'t tell the others.', 'I was going to say something. I\'ve forgotten it. It was good.',
    'I like this elevator. It has the posture of a much larger elevator.', 'I\'ve been practicing a face for the ride up. This is it. How is it?', 'I almost took the stairs once. They were so honest about it. I got scared and came back.', 'Someone left a mint on the handrail in 2019. I haven\'t touched it. It\'s a long-term arrangement.',
    'My mother always said never speak in an elevator. She said it in an elevator. I have been thinking about that for eleven years.', 'This is my favorite part, where nobody knows what to do with their hands.', 'I\'ve been told I stand like a floor. I choose to take it as a compliment.', 'Are you a stairs person or an elevator person? Don\'t answer. I can\'t be seen to have asked.',
    'I once stood in a room that was clearly about to say something. I stayed a whole afternoon. It was a room.'];
  const OPEN_POST = ['I\'d get off here, but I\'m the thing you\'re standing in. It\'s fine. It\'s been fine.', 'I was told this elevator has a personality. It is not as good as I was told.', 'I can feel every floor. I mean that as a compliment to the floors.', 'Sorry, I was thinking about a different floor. Same people. Better snacks.',
    'Holding up a building from the inside is a thing. Nobody says thank you. Please do not say it now. I will cry in the cables.', 'I was going to tell you about the ceiling. I am the ceiling. It is going well.', 'People are always getting off me. I try not to take it personally. I take it a little personally.'];
  const REPL = [
    ['Comment on the weather', 0, 'It is currently raining on Floors 1 to 6. Seven and above is Q4.'], ['Say "Yep."', -1, 'You said "Yep." It was received as a full paragraph.'], ['Nod, slowly, to nobody', 1, 'You nodded. Four nodded back. Neither of you knows what was agreed. It is binding.'],
    ['Laugh a bit longer than needed', 3, 'You laughed for three seconds too long. The elevator is now laughing too, in a lower register.'], ['Pretend to be on the phone', -1, 'You checked a phone you do not have. Four respects it. He has also checked his.'], ['Study the floor indicator like it owes you money', -2, 'Good choice. It does owe you. It has not said how much.'],
    ['Look at your shoes', -2, 'Good choice. They look like they have been somewhere.'], ["Ask if he's going up", 1, "Up. Or the other one. I'll know when I get there. Don't wait."], ['Say "Small world."', 2, 'Small world, you said, in a box. Four agrees. He has measured it. It is 1.5 persons.'], ['Offer him a mint you do not have', 2, 'He accepts. You both enjoy it enormously. Nobody has a mint.'],
    ['Wave, with the wrong hand', 2, 'He waves back with the wrong hand too. It is the start of something.'], ['Say nothing', -3, ''], ['Hold the handrail like it is a decision', 1, 'You gripped the rail. The rail has been waiting for this since 1974. It is overwhelmed.'], ['Say "Busy day." (It is not.)', -1, 'It is not. But you said it with such authority that a meeting on Floor 2 was moved.'],
    ['Cough, as a form of conversation', 2, 'Four coughs back, lower. You have both said something. It is in the minutes.'], ['Admire the ceiling tiles', -1, 'There are 24. Four counted on the way up. He gets a different number every time and is very proud of the 25th.']
  ];
  const CONFESS = ['I once held a door for a whole afternoon and nobody was coming. It was the best afternoon of my life.', 'I have a small bag of tiny secrets. Want one? ...I think I am 14 percent escalator.', 'I have never once gone up on a Thursday. I am being brave about it.',
    'I have a favorite stain on the carpet. I will not say where. It knows.', 'At night, when the building empties, I do all the floors in order, just to feel them. Nobody knows. Now you do.', 'I told a man on Floor 8 I was going to 9. I have not been back to 9 since. He is waiting.'];
  const CALLB = { 1: 'You said "Yep." to me earlier. I have thought about it on every floor since.', 2: "You've nodded before. I took notes. I am the notes.",
    3: "You laughed like that before. I'm not saying I mind. I'm saying the elevator remembers.", 11: 'Your silence on the weather was very clear. I think we understand each other now.',
    6: 'Those are the same shoes. I like a person who commits to shoes.' };
  const SPAMTALK = 'You have said that before. I took notes. I am the notes.';
  const IGNORED = ["No, that's fine. I'm fine. It's fine. The silence is fine. We have a lot of it.", "Right. I'll just hold this thought. It's not heavy. It's quite heavy.", 'Not a problem. I enjoy a pause. This one I will be thinking about for a floor or two.', 'I asked a question and the question has gone to wait in the Lobby. It is fine. The Lobby is nice.'];
  const STARE_Q = ['Do you also find the number very interesting right now?', "That's a good number, isn't it?", 'Are we both looking at the number, or just one of us?', 'Has it always been that number?', "Isn't it nice when a number just sits there?", "You're not going to look at me, are you?",
    'Do you think the number knows it is being watched?', "I'm not going to say anything. I'm just going to also be looking at it.", 'I don\'t want to alarm you, but I think it\'s looking back.'];
  const STARE_OK = 'Thank you for not looking. Most people just look.';
  const STARE_FAIL = 'Are you looking at me? Look at the number. The number loves it.';
  const STARE_6 = 'Studied the number for 6 seconds. Management is moved.';
  const STARE_TO = 'You looked. He saw you look. It has been entered under Looking, which is a small drawer.';
  const LANY = ['Assistant to the Assistant', 'Acting Weather', 'Director, Whatever Floor', 'Head of Not Being Asked', 'Senior Vice Coat', 'Interim Between', 'Associate Handrail', 'Lead Pause', 'Chief of Staring Straight Ahead', 'Visitor (Permanent)', 'Regional Gap Manager', 'Deputy Elevator', 'Keeper of the Handrail', 'Floor Liaison (Part-Time, Eternal)', 'Coat Whisperer', 'Minister Without Floor'];
  const REVEAL_Q = "I should tell you something. I'm also the elevator. Please don't make it weird. You're doing great.";
  const REVEAL_A = "Thank you. That's a relief. The walls blink. That's me. Sorry.";
  const APOL = ['(Sorry.)', '(That was me. Sorry.)', '(I said that, as the elevator. Apologies.)', "(I'm so sorry. I'm the building's voice.)", '(Please read that in a nicer voice.)', '(Dennis would never have said it like that.)', '(Sorry. I did not mean to be load-bearing.)', '(That was a floor talking. Several of them do that.)'];
  const HARMONY = 'Four hums a harmony. It is a half step off. It is a half step that has never been wrong before.';
  const PARTING = 'Well. This is my floor. Oh. It\'s yours too. We keep doing this.';

  const HALF = {
    first: 'The half button is warm to the touch. The elevator has noted your interest.', every: 'Rounded for your convenience.',
    l7: 'You pressed 7 1/2. Of the 12 floors available, the elevator chose 7. It is a difficult number to love.', l8: 'You pressed 7 1/2. The elevator chose 8. 8 is 7 1/2, in a different department.',
    cert: 'Certificate of Near Miss: <A>. Issued with all the sincerity of a <A>. Not valid on the other one.',
    a5: 'Your 7 1/2 attempts have been compiled into a Progress Report. The bar is 61 percent. The confidence is 100.',
    a12: 'This is the 12th attempt. The elevator has decided to reach 7 and a half. You have arrived at the idea of 7 and a half. The idea is open for feedback.',
    a25: 'The 7 1/2 button has been awarded a small sticker. It reads WORKS HARD.',
    near: ['"Nearly" filed. Excuse 4, paragraph 2.', '"Nearly" filed. The blueprint had a typo. The typo was a floor.', '"Nearly" filed. Lunch.']
  };
  const L7 = 'Floor 7 and a half is 0.5 away. This is the same distance as before. Management is proud of the fraction.';
  const L8 = 'Floor 8. You are one door too late. Management has marked this as belatedly optimistic.';
  const L7EARLY = 'You are on 7. Floor 7 and a half is not available at this time. Please wait. It is also not available later.';
  const CRACK_MISS = 'You missed it. There was a hallway. There was a door in the hallway. The door was also an elevator. It is gone now.';
  const CRACK_HIT = 'Beyond the doors is a hallway, and in the hallway is a door, and the door is also an elevator. A sock faces away, quietly. It does not matter. It is a secret.';

  const TIER = [['Gentle Ascent in D (Slightly Flat)', 'A saxophone is being kind to you.'], ['Gentle Ascent in D, Tier 2 (Smoother)', 'A saxophone has discovered butter.'], ['Jazz With Ambitions', 'The piano has taken an evening class.'], ['Gentle Ascent in D, Tier 4 (Now With Feelings)', 'The drummer has locked the bassist out of the arrangement.'],
    ['Orchestral Jazz', 'The brass section has unionized and wants a longer break.'], ['A Single Held Note, Sincerely', 'It has been held since 2:17. It has not been told it can stop.'], ['Gentle Ascent in D, Tier 7 (Reprise of the Reprise)', 'A saxophone is arriving from a different floor.'], ['The Song From Before You Were an Employee', 'A perfectly straightforward melody. The elevator seems quietly proud of it.'],
    ["Gentle Ascent in D, Tier 9 (The Saxophone's Ghost)", 'The saxophone has left the building, but its sound remains on Floor 4.'], ['Gently', 'Tier 10 is the word Gently, repeated at different pitches.'],
    ['Gentle Ascent in D, Tier 11 (Reprise of the Reprise of a Different Reprise)', 'Nobody has asked who is reprising whom.'], ['Silence (Premium Edition)', 'Available only in the elevator. Free, with ads. There are no ads.']];
  const BADJ = ['Smooth', 'Beige', 'Reluctant', 'Overqualified', 'Sincere', 'Moderate', 'Hopeful', 'Underlit'];
  const BGEN = ['Lift Jazz', 'Panpipe Interpretation of a Spreadsheet', 'Waltz for Nobody in Particular', 'Lounge Concerto', 'Light Fugue', 'Bossa Nova for Carpet', 'Ballad of the Lanyard', 'Instrumental Meeting'];
  const BPAR = ['Reprise', 'Radio Edit', 'Extended Hold', 'Sad Version', 'Unplugged From Floor 3', 'Cell B4', 'Now With Feelings', 'For Strings and Management'];
  const MUSIC_EXTRA = ['Smooth Jazz Adjacent. Adjacent to what has been withheld.', 'Jazz Intermission. A stapled flyer has been left on the carpet.'];
  const PAT = ['tick', 'blip', 'tick', 'bloop', 'tick', 'blip', 'bell', 'tick'];

  const BEATL = {
    1: 'Welcome to the Elevator Simulator. Please select a floor. The floor will be selected for you.',
    2: 'You pressed <FP> and arrived at <FA>. This is a pattern. Management has made a tick mark on a clipboard.',
    3: 'A person, standing. We are told he is called Four. He would like to talk. A meter has appeared: Awkwardness. Lower is better. Higher is also fine.',
    4: 'Sandra has policies on eye contact. They are specific and contradictory. Please stare at the number.',
    5: 'Occupancy: 7 and a half persons maximum. Sandra from Compliance has flagged the half person as ambiguous.',
    6: 'Management has been asked to disclose that the person in the corner is also the elevator. Management wishes this had been phrased more gently.',
    7: 'A lever has arrived. It was not requested. It is, however, brass.',
    8: 'The building has grown. Management did not authorize this. Management has authorized it retroactively.',
    9: 'The decimal has exceeded what the display can say. The display is doing its best. The display is also a face.',
    10: 'Arrival has been certified. Please see Floor 7 for the paperwork.'
  };
  const BT = [0, 0, 20, 50, 90, 150, 210, 270, 360];
  const BR = [0, 0, 1, 3, 6, 9, 12, 15, 19];
  const MGQ = ['Your ride has no point. Your ride has been logged as important.', 'Thank you for riding. The committee rode alone.', 'You are 7.5 percent of the way to understanding the elevator. Please continue.', 'Management is not in the elevator. Management is in the walls, in a supportive capacity.', 'A reminder from Management: the elevator does not take requests, but it does take notes.',
    'Management has been told you are enjoying the ride. Management has asked for a source.', 'Please do not look for Management. Management is above your head and humbly under review.', 'Fun fact: this elevator holds 1.5 passengers, 4 unexpressed opinions, and a smell that was here before the lease.', 'Management would like to thank the cables. The cables did not ask to be thanked and are now stuck with it.',
    'This ride is brought to you by gravity, with additional support from the idea of up.'];
  const DO_ONE = 'Door Open pressed. The doors were already open. They now feel watched.';
  const DO_11 = 'You pressed Door Open eleven times. The doors have opened a little out of respect.';
  const ALARM1 = 'A polite bell rings. Your concern has been added to the pile of concerns.';
  const ALARM5 = 'The pile of concerns has been given its own floor. The floor has applied for a concern of its own.';
  const HELP = 'You have been connected to Help. Help is Four. Four is the elevator. Please hold.';
  const MYST = 'The blank button has been pressed. It reveals a counter. The counter says <C>. It says nothing else.';
  const PHONE = 'You checked a phone you do not have. Awks: -1.';
  const DC = ['Doors are already making their own decisions.', 'The doors sighed. They did it on principle.', 'Door Close pressed. The doors are aware, and are choosing not to be.'];
  const DC1 = 'Door Close pressed. The doors have noted your enthusiasm and filed it under Doors.';
  const DC12 = 'Door Close has been pressed 12 times. It is not connected to anything. It is, however, very well liked.';
  const DC25 = 'The button has been renamed Door Closeish. It is more honest this way.';
  const DC50 = 'You have pressed Door Close 50 times. A small plaque has been installed in your honor. It says Close.';
  const DC6A = 'Door Close is wired directly to Dennis (Plant). Dennis has declined to close anything.';
  const DC6B = 'Dennis (Plant) has been notified of your request. Dennis (Plant) is thriving.';
  const QUIET = ['This ride is quiet. No buttons are lit. Four stands there.', 'Four has been in this elevator since before the building. He asks softly: "Is it all right if I stay on to the top?"', 'Thank you. I don\'t get to see where it goes. I only get to be there.', 'The elevator goes up past 12 without a floor. The lights are a bit warmer. Then they are not. Then it is a Tuesday somewhere.'];
  const IDLE = { l90: 'The elevator has stopped between floors to give you space. It has given you the space. It is now standing in it.', f90: "Do you want to talk about it? I don't know what \"it\" is. I'm ready.",
    l180: 'Incident of Silence #1 filed. The silence has been given a badge and asked to wait in the hall.', l300: 'The elevator has started the music by itself. It is playing it very quietly, for itself. Four hums along, half a step off.',
    ret1: 'While you were away, Floor 7 and a half was visited by nobody. It was lovely. You missed it. Please do not feel anything.',
    ret2: 'While you were away, Dennis (Plant) filed a report about you. The report is nine words long. It says: no complaints. Present, apparently.',
    mgr: 'The doors open on Floor 7. Management is there. "I wanted to see what it is like to be a passenger," he says. He rides to 8. He does not tip.' };
  const SWAP = ['You are the one who is also the elevator today.', 'Going up?', 'Of course you are.'];
  const SPAM = { f: 'Button Fatigue detected. The buttons are tired. They would like a moment, and a modest raise.', s: 'Mash Surcharge applied: 1 Meh. Per policy, pressing is billed in arrears of feelings.',
    w: 'The panel has been wet-painted. Please wait 8 seconds. It is not wet. It is a policy.', e: 'Elevator Security has arrived. It is also the elevator. It has detained itself, gently, on your behalf.',
    e4: 'I can feel every one of those. Please press like you mean it. Or less.' };
  const PLEASE = ['Please.', 'Please. Thank you. That is better.'];
  const RESIZE = { tiny: 'Occupancy is now 1.5 persons. Cozy. Sandra has been notified of the coziness.', back: 'Thank you. I can finally gesture.', x5: "I think we've become a closet. I don't mind." };
  const TYPED = 'You typed 7.5. The elevator does not do decimals. It has, however, written it down and put it on a wall.';
  const GHOST = 'Floor 6 has been pressed. You did not press Floor 6. Nobody is on 6. Somebody wants to be.';
  const AWK8 = 'The silence is starting to have a shape. Please do not describe it.';
  const AWK10 = 'The elevator has opened its doors between floors to let the tension out. This is a policy.';
  const SILENCE_END = 'That was nice. Same time tomorrow? Not you. The elevator.';
  const GERALD_IN = 'Gerald (VP of Spuds) has boarded at Floor 4. He presses nothing. "We are all on the same floor," he says, "in the sense that we are not."';
  const GERALD_OUT = 'Gerald has disembarked mid-sentence. The sentence continues on Floor 4.';
  const SIGNS = ['Maximum occupancy: 1.5 people. Minimum occupancy: also 1.5. Stand accordingly.', 'Talking is encouraged. Talking is also a violation. Please do both in moderation.', 'Compliance Fee: 0.1 Meh for pressing during a red banner. Refundable via Form 27B/6.', 'All passengers must stand at a 35-degree angle to the wall.', 'Sandra has measured the angle. It is 34.',
    'Floor 13 is not a floor. Please do not visit it. It has been visited.', 'Please do not look at the sign. It knows.', 'Sandra took the stairs. The stairs have since been reclassified as a long hallway with consequences.',
    'Please do not lean on the walls. The walls are leaning on you, and it would be rude to compete.', 'Eye contact is permitted for up to 4 seconds. After 4 seconds it becomes a relationship and must be filed.', 'Hand sanitizer is available. It is the same hand sanitizer. It has been given a floor to think about.', 'Complaints may be submitted to the suggestion box, which is on Floor 4, and a very good listener.',
    'This sign has been approved by Sandra. The approval is on the other side. The other side is also a sign.', 'The 7½ button is for decorative use only. It has been told. It is trying.'];
  const TOAST = ['Do you smell that? Someone in a previous ride was crying into a slice. It was moving.', 'The elevator smells faintly of toast. It is nobody\'s fault. It is also somebody\'s.'];
  const MISC = ['Tuesday is not served by this elevator. Tuesday has its own.', 'The elevator is aware it is a Tuesday somewhere. It does not wish to discuss it.', 'Please do not step on the sock. It is on a journey.', 'The elevator wishes to remind you that Floors 1 through 12 are real and Floor 13 is a feeling.', 'Please note that the carpet has been told about you and has chosen to remain neutral.'];
  const ZGEN = ['The cab has moved half the distance. The other half has been asked to wait.', 'Display: <POS>. Management says the display is trying its best.', 'Nudge recorded. The nudge has been given a number. The number is smaller.', 'We are <GAP> from arrival. Please do not look at the gap.', 'Halfway there, again. That is a recurring appointment.',
    'Closer. Nobody chose closer. It came up under Any Other Business.', 'The gap is now smaller than a rumor and larger than a decision. It is a good place for a gap.', 'Floor 7 and a half took a small step toward you and then, shyly, a smaller one back.', 'The brass is warm. The lever has not been this loved since 1974.',
    'The remaining distance has been cut in half. The other half is being kept for emergencies.', 'At this rate you will arrive in a finite amount of time, which Management has been told is not the same as soon.', 'Floor 7 and a half has been informed you are coming. It has begun to tidy in a way it will regret.', 'The display now says <POS>. The display would like it noted that it did not round. The display is proud.',
    'A small committee has formed to discuss the remaining <GAP>. It has not chosen a chair, a time, or a gap.', 'Sandra measured the remaining <GAP> and found it exactly as advertised. She has filed a complaint about the advertising.', 'Nudge. The cab moves. The floor politely moves. Everyone involved is acting in good faith.', 'Somewhere below, the half button hears about this and goes warm.'];
  const ZMILE = { 1: 'Nudged. Floor 7 and a half is now 0.25 away. This has never failed to not arrive.', 5: 'We are 0.015625 from arrival. This is a personal best.',
    10: 'Display: <POS>. Management: "We\'re basically there." Elevator: "Basically is a floor I do not serve."', 13: '<NEAR>. The elevator would like it noted that it has not arrived. The elevator would like it noted twice.',
    20: '<D> decimal places. Management has started a spreadsheet. It has one row.', 30: '<D> decimal places. Nobody has been this close to 7 and a half. Nobody has been this far from it either.',
    40: '<D> decimal places. The nudge is now a rumor with a brass handle.', 49: 'The next nudge may be the last one, in the sense that it may not be.' };
  const ZLEVER = 'A brass lever has slid into view. It wants to be pulled. It does not say why.';
  const ZABAND = 'Abandoning <POS>. The decimal has been placed in a drawer. The drawer is labeled DECIMALS.';
  const Z12 = 'Management: "Does 7.499999999999 count?" The elevator: "It counts as a number." Management: "Does it count as a floor?"';
  const Z15 = "The display is struggling and so is the stranger's face. They are the same face. They are doing their best.";
  const Z49 = 'Management and the elevator hold a brief public disagreement about whether 7.4999999999999 counts. The elevator wins. It is not clear what it won.';
  const ZFLOAT = 'The decimal has exceeded the capacity of the number. Arrival certified as 7.5. Photographs show Floor 7.';
  const ZRETIRED = 'The lever has been retired. It now stands on a plaque. The plaque says LEVER.';
  const END = {
    a: 'Congratulations. You are on Floor 7 and a half. The paperwork says Floor 7. The paperwork has been asked to reconsider.', b: 'Deviation 7.5, Reason: Technically.',
    c: 'The doors open on Floor 7. This is the paperwork floor. The paperwork says 7.', d: 'Oh good, you\'re here. Going up?', e: 'I never get to see where you go. Tell me about Floor 7 and a half.',
    g: 'The Door Close button has been pressed <C> times. It would like to say it was in the hallway. It was.', h: 'New goal: Floor 7 and three quarters. Please hold your applause. It is the same applause, reused.',
    i: 'PASSENGER OF THE MOMENT: NOBODY. Nobody has been told. Nobody is thrilled.', k: "I'm Four again. I got better.", l: 'Going up. Or to a different version of up.',
    m: 'Elevator Simulator has awarded you 7.5 Meh. This is the maximum, rounded to the nearest 7.5.', n: 'Welcome back. The elevator remembers you. It has been doing nothing. It has been doing it for you.',
    sock: 'The Missing Sock is on the paperwork floor. It is the only passenger who ever reached 7 1/2. It did not say how.'
  };
  const TINY_PRESS = 'Pretend to check your phone';

  /* ---------- punch-up content: buttons, idle, spam, inspection, rare events ---------- */
  const DOB = ['Door Open pressed. The doors were already open. They are now open on purpose.', 'The doors accept the instruction with the dignity of something that was already doing it.', 'The doors are open. They have been open since you arrived. Credit has been given to the button.', 'A mild breeze enters the cab and signs the visitors\' book.',
    'Somewhere a Door Close button feels a wave of calm.', 'Door Open pressed <N> times. The doors have started to think of you as a person who likes things open.', 'The doors considered it. The doors have considered worse.', 'The doors are open. They were told it was your idea and have chosen to take credit.'];
  const DO30 = 'Door Open has been pressed 30 times. The doors have started a small support group for the already open.';
  const ALB = ['A polite bell rings. Somewhere, a smaller bell is relieved.', 'The alarm has sounded. No one is coming. The alarm knew that. It is a gesture.', 'The alarm rings and a calm voice says, "Noted." The voice does not say by whom.',
    'ALARM: one apologetic bell. It would like to be understood as a polite alarm.', 'You have rung the alarm. The alarm rang back. It was brief and kind.', 'The alarm is for emergencies. This is the kind of emergency that has no floor. Your concern is on file.',
    'The bell rings. Three floors below, Sandra pauses her stapler. Sandra resumes.', 'Alarm pressed. The elevator checked itself for fire, flood and feelings. Feelings: some.', 'A polite bell rings. It rings for <N> reasons, all of them concerns.'];
  const AL10 = 'The alarm has been pressed 10 times. It has been moved to a larger, quieter alarm room, with a chair.';
  const HELPB = ['Help has answered. Help says "Hello, this is Help" and waits for you to explain it.', 'Help is not available. Help is available only in the sense that it is also the elevator.', 'You are in a queue of one. You are position one. Your estimated wait is long, and lovely.', 'Help says, "Have you tried going up and then down?" It says it kindly. It is the whole manual.',
    'Help would like to help. Help does not know how. Help has asked the other Help.', 'Help suggests you press a floor. It will not say which. It has been told to say that.', 'Please hold. Your call is important to us in a way Sandra has been asked to define.'];
  const MYSB = ['The blank button has been pressed <C> times. The counter says so. The counter is the only thing here with a clear purpose.', 'The blank button does nothing. It is, however, known for it.', 'You pressed the blank button. Somewhere in the building, a smaller button felt pressed.', 'The blank button is unlabeled by request. Asked what it wanted to be called, it said "later."',
    'The blank button has a desk now. The desk is a smaller button. They are not speaking.'];
  const MY7 = 'The blank button has been pressed 7 times. Management has opened a file on it. The file is blank. It is the best file.';
  const PHB = ['You checked a phone you do not have. It had no new messages. It never has. Awks: -1.', 'You scrolled a phone you do not have, for a long time, with feeling. Awks: -1.', 'You held a phone you do not have to your ear. Four nodded as though you had said something. Awks: -1.', 'You have 14 notifications on a phone you do not have. All are from Floor 6. Awks: -1.', PHONE];
  const DCX = ['The doors acknowledge the request and add it to the other request, which is also yours, and older.', 'The doors are closed in spirit. The spirit is on Floor 6.', 'A distant door closes. It is not yours. It is a good effort.', 'Door Close pressed. The button has been warm for 19 minutes. It likes this.', 'The doors would, in a different life.',
    'The doors are on a break. They will close at a time of their choosing, which is when you stop looking.', 'You pressed Door Close. Somewhere an executive felt a small, inexplicable sense of control.'];
  const THINK = ['The elevator is thinking about it.', 'The elevator is consulting the elevator.', 'The request has been received and placed near other requests.', 'The elevator has a good feeling about this, about something.',
    'Please hold. The elevator is deciding what you meant.', 'The doors have heard your request and are looking at each other.', 'The elevator has opened a ticket with itself.', 'Request escalated to Floor 5, which does escalation.',
    'The elevator is asking the shaft for a second opinion.', 'A cable is being consulted. It has requested a moment of privacy.', 'The doors are practicing their closing face.', 'The elevator has chosen a floor and is getting used to it.', 'The elevator is deciding between your floor and a floor it likes better.',
    'Somewhere, a smaller elevator is learning about this.', 'The button you pressed is being forgiven.', 'Please remain calm and pressed.', 'The elevator is on the phone with the other elevator.', 'A decision has been reached. It is being walked over to the cab.'];
  const LOVE = { 10: 'Button <B> has been pressed 10 times. It has started to expect it.', 25: 'Button <B> has been pressed 25 times. It is flattered. It is also a little bruised.',
    50: 'Button <B> has been pressed 50 times. It has asked for a moment, a mug, and a plaque.', 100: 'Button <B> has been pressed 100 times. It has been renamed. The new name is also <B>, but with feeling.' };
  const LOVE_CER = 'Button <B> has been pressed 25 times. Elsewhere in the building, a different Button had a ceremony for less. Nobody has planned one for <B>. It has been told to wait.';
  const IMPAT = ['The elevator is already going. It was told first.', 'The elevator has your request. It is holding it carefully, like a bird made of paperwork.', 'Pressing again does not make the elevator go faster. It makes it go the same, with a witness.', 'The button has been pressed. It has been pressed again. The elevator would like the minutes to reflect that it noticed both.',
    'We are in transit. Please hold your press until the destination, where it will be needed.', 'Your second press has been received and filed under Confidence.', 'During transit, buttons are decorative. This has been true since 1974 and is written on a wall that is not in this elevator.', 'Please stop. The elevator is trying very hard and it is going to a place.'];
  const FOURPOKE = ['I am a person. Mostly. Please do not check the rest.', 'That is the same spot. It has become a spot.', 'You can press me. I am not a button. I just respond like one, out of manners.', 'I appreciate the attention. I would appreciate it more at a lower frequency.', 'Please. I am holding a lot of floors in my chest right now.', 'If you poke me again I will have to be the elevator at you.',
    'It is fine. I counted. It was fine until about the ninth.'];
  const LCDPOKE = { 5: 'The number has been poked 5 times. It is a number. It has a lot of dignity and a small number of digits.', 15: 'The floor indicator would like to be left to indicate. It has been indicating since before you got here.' };
  const LCDB = ['The number does not respond to poking. It is just very good at being a number.', 'You poked the number. The number is now slightly more poked.', 'The indicator felt that. It would like to be a different color, quietly.'];
  const FRIEND = ['You have said nothing to me three times in a row. Nobody has ever done that. May I sit? ...I am sitting. I have been sitting. Thank you.', 'I would like to tell you my real number. It is Four. It has always been Four. I never told anyone, because nobody asked, which is why I like you.'];
  const FRIEND_M = 'Four has been promoted to Friend. The promotion is unpaid and legally binding. Sandra has no objections. Sandra has opened a folder.';
  const FOP = ['Hi, friend. I mean passenger. I mean friend. I will go back and forth for a bit.', 'Do you want to say nothing together? I have saved us a spot. It is this one.', 'Friend. I have decided it is a word we use now. I have put it in the minutes.'];
  const BALLOON = { in: 'A balloon labeled MANDATORY FUN (BYO PARTY) has boarded from Floor 6. It does not say why. It is, for once, winning the argument.', four: 'That is not my balloon. I am not responsible for it. I am going to be nice to it anyway.',
    out: 'The balloon has stepped off at <A>. It said nothing. It is ahead of schedule on a schedule nobody has seen.', lany: 'Balloon (Mandatory)' };
  const COMMENT = ['A comment card slides under the doors. It reads: "4 stars." It does not say which four. Management is thrilled and has chosen the top four.', 'A comment card reads: "Would ride again, from a different floor." It is signed Floor 9.',
    'A comment card reads: "The elevator was fine. The floor was a lot." Management has had it laminated.', 'A comment card reads: "Please add a floor between 7 and 8." It is signed Everyone, and dated Tomorrow.', 'A comment card reads simply: "Thank you, Four." It is in Four\'s handwriting. Four is standing right there, looking at the number.'];
  const CB = { dennis: 'Dennis (Plant) recognizes you from a different department. He does not say which. His leaves say it is nothing personal.', sock: 'The sock on the hallway floor looks up at you, in the way a sock can. You have seen it elsewhere. It has been busy.',
    stapler: 'The Stapler has submitted a demand regarding the doors. The demand is that they close. The Stapler has no way to enforce it. The Stapler is unmoved.', staring: 'I heard you have been in a staring contest elsewhere. This is not that. This is a number. It is more forgiving.',
    cloud: 'The coat notes you hold a certificate from the sky. It has never seen one. It asks to hold it. Nobody has one. It holds the idea.' };
  const INSP = { sign: 'INSPECTION (UNANNOUNCED, ANNOUNCED)', line: 'A coat on a hanger enters the cab, carried by no one. The lanyard reads SANDRA\'S COAT (ACTING). It is thorough.',
    m1: 'An inspection is under way. The inspector is a coat. The coat has never missed a detail and has no eyes.', a2: 'The coat inspects the handrail, the ceiling, the floor indicator and the air, in that order, and lingers on the air.',
    a2f: 'The coat inspects the handrail, the ceiling, the floor indicator and Four, in that order, and lingers on Four.', four: 'Is it going to say something? ...It has said something. I think the something was "pass."',
    m3: 'Certificate issued: CERTIFIED UNTIL 10:00 (APPROX.). Valid for 7 minutes, or until the elevator becomes aware of it, whichever is sooner.', plq: 'CERTIFIED UNTIL 10:00 (APPROX.)',
    hold: 'An inspection is in progress. Please press nothing the inspector has not already approved.' };
  const EXP = { m1: 'The certificate has expired. The elevator is no longer, legally, an elevator. It is a room that goes places.', m2: 'Nothing has changed except the wording. The wording is on the wall. The wall is also a room now.',
    four: 'Does this change anything? ...Okay. Good. I will keep standing like this.', plq: 'EXPIRED (STILL STANDING)', title: 'Room That Goes Places', banner: 'This is a room now. Rooms may have goals. Goals may have doors.', lany: 'Room (Acting)' };
  const ROOMV = ['The room has arrived. The room is pleased with its new self-concept.', 'You have been delivered to <A> by a room. The room insists it is going well.', 'The room opens its doors. A room does not have doors. These are suggestions.',
    'The room has stopped. The floor outside has noticed. It has been waiting for a room for years.', 'Rooms are not required to be certified. Rooms are required to be rooms. The room is working on it.', 'The room has thought about the stairs. The stairs have thought about the room. It was mutual.'];
  const DRIP = ['It has been <M> minutes. The room would like you to know it is not counting. It is, however, aware.', 'The room has been uncertified for a while. It reports no change and a certain lightness.', 'Management has started calling it "the room." The room has started answering.', 'A plaque says EXPIRED (STILL STANDING). It is a proud plaque.', 'The room is <M> minutes into a ride. It has stopped asking where.',
    'Tuesday has been informed you are still here. Tuesday says it will wait. Tuesday is very patient, and very Tuesday.'];
  const MICRO = [
    { t: 12, x: 'Reminder: this elevator has been inspected but not yet certified. Certification is expected, in the sense that everything is.' },
    { t: 28, x: 'The speaker clears its throat. It does not have a throat. It has asked for one in the next budget cycle.' },
    { t: 44, c: 1, x: 'Rides so far: <C>. Number of those that arrived where you pressed: none. Management is calling this a baseline.' },
    { t: 66, x: 'Facilities reminds passengers that the elevator is not responsible for personal belongings, personal feelings, or personal floors.' },
    { t: 88, x: 'This elevator is currently doing 0.4 floors per mood. Management hopes to improve this by Q3. Q3 has been informed.' },
    { t: 112, x: 'Sandra from Compliance has left a note on Floor 5. The note says NOTE.' },
    { t: 138, x: 'Somewhere above you, a person is holding a door for nobody. It is a lovely thing. It is happening on 9.' },
    { t: 165, x: 'Management has heard footsteps in the shaft. The shaft is a vertical hole. Footsteps are not possible. Management is listening.' },
    { t: 180, x: 'INSPECT', big: 1 },
    { t: 208, x: 'The coat has left by a door that was not there before. The door has been asked to stay.' },
    { t: 236, x: 'The elevator would like it noted that it has no opinions on the weather, and many on carpet.' },
    { t: 266, x: 'Management is writing a short book about this ride. It is currently one sentence. The sentence is "Up."' },
    { t: 300, x: 'You have been aboard for five minutes. An elevator is designed for 40 seconds. We have started referring to you as staff.' },
    { t: 332, x: 'A mop passes the open doors, held by nobody. The mop is thriving.' },
    { t: 382, f: 1, x: 'Four is quietly proud of you. He will not say it. He is looking at the number so he does not have to.' },
    { t: 425, x: 'Management has worked in this building for 20 years and has never once ridden this elevator. Management would like to begin.' },
    { t: 472, x: 'Reminder: the elevator can be pressed for love, but not for money. Money has been tried.' },
    { t: 520, x: 'Sandra has gone home. Sandra\'s policies have not. They took the stairs.' },
    { t: 562, x: 'Nine and a half minutes. An announcement will be made shortly. It is a surprise. It is also a certificate.' },
    { t: 600, x: 'EXPIRE', big: 1 }
  ];
  const RET = ['Welcome back. You were gone a while. The elevator held your place. It is a very small place.', 'While you were away, the doors opened 11 times for nobody. Nobody was extremely polite.', 'You have returned. The elevator did not notice you leaving, and has noticed nothing else since.', 'While you were away, the floor indicator read 7 for a while. It was not 7. It enjoyed pretending.'];
  const RETF = ['While you were away, Four learned a second song. It is the same song, half a step off.', 'Welcome back. Your Awks was kept at the same level. It is a very stable Awks.'];
  const RET10 = 'You have been gone ten minutes. The elevator has filed this as a 40-second ride. We believe in you.';
  const IDLEX = { w20: 'No input detected. The elevator has elected to treat this as a decision.', dim: 'The lights have been lowered to a setting called Contemplative. It is the same setting as Tired, with better branding.',
    w70m: 'The elevator is checking the time. It has no clock. It is checking very accurately.', w70f: 'I am going to check the time. ...I do not have a watch. I am going to check it anyway.',
    w120: 'Two minutes of nothing, so far. The elevator is rating it highly. It has nothing to compare it to, but it is rating it highly.', w150m: 'Somewhere above you, a door opens for nobody and shuts again. The building does this at night too.',
    w150f: 'Sometimes I think I can hear the next floor. It sounds like a floor. It is a very good floor.', w240: 'The cab has started a rumor about you. The rumor is that you are thinking. It is the only rumor in the building and it is going very well.',
    w360: 'The speaker reads the news to itself, very quietly: "', w540: 'The elevator has begun to count the floors aloud, in order. It has reached 7. It has been on 7 for some time. It is trying to say the next part.',
    w600: 'The elevator has submitted its resignation. It was declined. It has been offered a consulting role: the same job, but with opinions.' };
  const SPAMX = { f: [SPAM.f, 'Button Fatigue. The buttons have been pressed more in the last 6 seconds than in the previous 6 years. They are lying down.', 'The panel is exhausted. It has asked for a chair. There is no chair. The panel is learning that.',
      'Button Fatigue declared. The buttons would like it noted that they are made of brass and good intentions, and only one of those is holding up.', 'The buttons have developed a slight lean. Please do not read into it.'],
    s: [SPAM.s, 'Mash Surcharge: 1 Meh. It has been added to your account and subtracted from your dignity, which is not on file.', 'Surcharge applied: 1 Meh. The receipt is the sound a button makes when it gives up.',
      'Mash Surcharge: 1 Meh. Sandra points out this is the third Meh she has charged this week. It is Tuesday somewhere.'],
    w: [SPAM.w, 'The panel has been wet-painted. The paint is a policy, and the policy is a color.', 'WET PAINT. The paint is a mood. The mood is dry. Please respect the mood.'],
    e: [SPAM.e, 'Elevator Security has been called. Elevator Security is the elevator in a hat. The elevator has detained itself and read itself its rights.'],
    e4: [SPAM.e4, 'That was 40 presses. I counted them with my whole chest.'],
    c: ['Management has noticed the pressing. Management would like to raise it, supportively, at the next all-hands, which is you.', 'The pressing is noted. The pressing is also, quietly, admired.',
      'You are pressing very fast. The elevator has begun to wonder whether it is being asked something, in a language of its own.'],
    rel: ['Elevator Security has released the elevator on its own recognizance. It has been asked not to leave the building. It is the building.', 'The elevator has been released with a warning. The warning was "okay."'] };

  /* ---------- additions: pitch, half person, procession, small fixes ---------- */
  const CRACK_M = 'Management did not see that. Management has it in writing that Management did not see that.';
  const CRACK_MISS_M = 'The hallway has gone. It did not leave a forwarding floor.';
  const INSP_M3B ='The coat has left a certificate and taken nothing. This is considered a clean inspection.';
  const SUBZ = ['Rounding: refused.', 'Rounding: declined, politely.', 'Rounding: under review.', 'Rounding: not today.'];
  const WINK = 'A passenger is present. He has not asked for attention. He has not asked for anything. Please press a floor, or him.';
  const HINT = ' That was nice. You can do it again if you like. I would not mind.';
  const WAITM = 'One moment. The conversation is not finished. Neither, for the record, is the elevator.';
  const PAINT2 = 'WET PAINT. The 7 1/2 button is not exempt. It asked. It was told it is also paint.';
  const PITCH = {
    open: "I have a thing. It's a pitch. It's an elevator pitch. I'm sorry. I have been waiting for this to be the appropriate time and I think it is.",
    slides: [['PROBLEM: FLOORS', 'Slide one. The problem. Floors. There are too many and none of them is the right one.'], ['FLOORS, SHORTER', 'Slide two. Our solution. Floors, but shorter. We are calling it Down.'],
      ['TRACTION: 7.5', 'Slide three. Traction. 7.5. We have never been closer to it than we are right now, and we have not moved.'], ['ASK: NOTHING', 'Slide four. The ask. Nothing. Gently.']],
    reply: ['You understand it is a floor, and also a feeling.', 'Excellent question. It is not yet clear what you asked.', 'That is the most convincing response I have had.'],
    note: 'Management is taking notes. The notes say "traction?" Management has underlined it twice.',
    fin: 'Thank you. That is the most anyone has ever raised in this elevator. It was nothing. It was oversubscribed.',
    pass: 'Management has seen the pitch and passes. Management has seen worse pitches. They were also here.'
  };
  const HALFP = {
    board: 'Occupancy has reached 1.5. Sandra has asked which half.', nod: '(Nods with the half of a head that is available.)', four: "It's okay. I'm only half listening too.",
    mgmt: 'Sandra has measured it as 0.5, then asked to be measured.',
    whole: 'The other half has been on Floor 7 the whole time. It is wearing the other half of the tie. They do not say anything. It is the most normal thing that has ever happened.'
  };
  const PROC = {
    sock: ['🧦', 'The sock goes by, facing away. It nods without turning.'], balloon: ['🎈', 'The balloon floats past. It is winning, quietly.'], coat: ['🧥', 'A coat in a lanyard checks the paperwork and initials the air.'],
    gerald: ['🥔', 'Gerald says, in passing, "Seven. A good number. It has a half."'], stapler: ['📎', 'The Stapler delivers its demand. The demand is: end. It ends.'], dennis: ['🌿', 'Dennis (Plant) is not here. His leaves are.'],
    half: ['🤝', HALFP.whole], tue: ['📅', 'Tuesday did not come. Tuesday was seen in the lobby, deciding not to.']
  };

  /* ---------- module ---------- */
  P.registerModule({
    id: 'elevator-simulator',
    title: 'Elevator Simulator',
    tagline: 'Press a floor. Arrive somewhere else, with paperwork.',
    icon: '🏢',
    category: 'game',
    unlockCost: 0,
    tags: ['simulator', 'awkward', 'zeno'],
    mount(root, api) {
      const h = api.el;
      const TS = api.selftest ? 0.1 : 1;
      const wt = function (ms) { return Math.max(1, Math.round(ms * TS)); };
      const clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
      const tg = function (e, n, on) { if (e) e.classList.toggle(C(n), !!on); };
      const fill = function (s, v) { return String(s).replace(/<(\w+)>/g, function (m, k) { return v && v[k] != null ? String(v[k]) : ''; }).replace(/(^|[.!?:]\s)([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }); };
      const bump = function (k, n) { api.stat.inc('elevator-simulator.' + k, n === undefined ? 1 : n); };
      const ach = function (k) { api.achieve('elevator-simulator.' + k); };
      const bag = function (arr) {
        let q = [], last = '';
        return function () {
          if (!q.length) { q = api.shuffle(arr); if (q.length > 1 && q[q.length - 1] === last) q.unshift(q.pop()); }
          last = q.pop(); return last;
        };
      };
      const sv0 = api.save.get('s', {}) || {};
      const cnt = function (v) { v = +v; return isFinite(v) && v > 0 ? Math.min(1e9, Math.floor(v)) : 0; };
      const sv = {
        totalRides: cnt(sv0.totalRides), yep: !!sv0.yep, closest: (sv0.closest && typeof sv0.closest.pos === 'number' && typeof sv0.closest.gap === 'number' && isFinite(sv0.closest.pos) && isFinite(sv0.closest.gap) && sv0.closest.gap >= 0 && sv0.closest.gap <= 0.5 && Math.abs(sv0.closest.pos - 7.5) <= 0.5) ? { pos: sv0.closest.pos, gap: sv0.closest.gap } : { pos: 7, gap: 0.5 },
        history: Array.isArray(sv0.history) ? sv0.history.slice(-12) : [], ended: !!sv0.ended, plaque: !!sv0.plaque, typedSign: !!sv0.typedSign, quietDone: !!sv0.quietDone,
        lobbyVisits: cnt(sv0.lobbyVisits), floor9Visits: cnt(sv0.floor9Visits), metFour: !!sv0.metFour, friend: !!sv0.friend, pitched: !!sv0.pitched, halfState: (sv0.halfState === 1 || sv0.halfState === 2) ? sv0.halfState : 0,
        zeno: (sv0.zeno && isFinite(sv0.zeno.n)) ? { active: !!sv0.zeno.active, n: clamp(Math.floor(sv0.zeno.n), 0, 49), from: sv0.zeno.from === 8 ? 8 : 7 } : { active: false, n: 0, from: 7 }
      };
      const persist = function () { api.save.set('s', sv); };
      const S = {
        dead: false, phase: 'idle', token: 0, rides: 0, floorKey: 'L', floor: 0, prevKey: 'L', pressed: {}, awks: 0, beat: sv.ended ? 3 : 1, t0: api.now(),
        idleSince: api.now(), idleLvl: 0, returns: 0, mash: 0, lastPress: 0, fired: {}, lockUntil: 0, painted: false, tired: false, pleaseRides: 0,
        armed: false, lastNudge: 0, trayMode: '', lastReplies: [], talkTimes: [], sinceTalk: 0, sinceCrack: 20, halfFlip: false, crackFlip: false, halfPresses: 0, lastHalfAward: -99,
        revealDone: sv.ended, revealPending: false, extrasOn: false, hold: null, tier: 1, noMusic: false, musicT: 0, lastSay: -1e9, pos: 7, ticks: 0, bannerI: 0, signI: 0,
        eyeUsed: false, fourClicks: 0, phoneUsed: false, geraldDone: false, geraldAboard: false, geraldForced: false, silenceDue: false, silenceBroken: false, yep: false, plateT: 0,
        lastP: '', lastR: '', lastTalkNothing: false, lcdBefore: null, resizeX: [], wasTiny: false, ghostSaid: false, disp12: false, disp15: false, leverSaid: false, scripted: false,
        m0: api.now(), microI: 0, dripAt: 0, cert: 0, nothingRun: 0, vigLast: {}, balloon: false, balAt: -99, comAt: -99, lcdPokes: 0, idleN: 0, idleDone: {}, impat: 0, hiddenAt: 0, smallTalks: 0, waitSaid: {}, prevFocus: null, repPause: 0
      };
      const ui = { btn: {}, badge: {} };
      const awl = [];
      const nextLany = bag(LANY), nextOpen = bag(OPEN_PRE), nextOpenP = bag(OPEN_PRE.concat(OPEN_POST)), nextStare = bag(STARE_Q), nextArr = bag(ARRIVE), nextBody = bag(DBODY),
        nextType = bag(DTYPE), nextPre = bag(PREFIX), nextZ = bag(ZGEN), nextDC = bag(DC.concat(DCX)), nextSign = bag(SIGNS), nextApol = bag(APOL), nextConf = bag(CONFESS), nextHand = bag(HAND), nextMg = bag(MGQ),
        nextAgain = bag(AGAIN), nextIgn = bag(IGNORED), nextDOB = bag(DOB), nextAL = bag(ALB), nextHelp = bag(HELPB), nextMys = bag(MYSB), nextPh = bag(PHB), nextImp = bag(IMPAT), nextPoke = bag(FOURPOKE),
        nextLcd = bag(LCDB), nextRet = bag(RET), nextRetF = bag(RETF), nextRoom = bag(ROOMV), nextCom = bag(COMMENT), nextFop = bag(FOP), nextDrip = bag(DRIP), nextThink = bag(THINK), nextRound = bag(SUBZ);
      const spBags = {};
      const sp = function (k) { return (spBags[k] || (spBags[k] = bag(SPAMX[k])))(); };
      const nextSide = {};
      let kindBag = bag(['tray', 'stare', 'tray']), talkBag = [];

      /* ----- small helpers ----- */
      function at(tok, fn, ms) {
        return api.setTimeout(function () { if (S.dead || tok !== S.token) return; fn(); }, Math.max(1, ms));
      }
      function mgmt(text, o) {
        o = o || {}; const t = api.now();
        if (!o.force && t - S.lastSay < 2500 * TS) return false;
        S.lastSay = t; return api.say(text, o);
      }
      function award(n, reason, big) {
        const t = api.now();
        if (!big && n > 0) {
          while (awl.length && t - awl[0][0] > 60000) awl.shift();
          let sum = 0; for (let i = 0; i < awl.length; i++) sum += awl[i][1];
          if (sum + n > 8) return;
          awl.push([t, n]);
        }
        api.award(n, reason);
      }
      const nm = function (k) { return (FI[k] || [0, 'this floor'])[1]; };
      const fl = function (n) { return /^\d+$/.test(String(n)) ? 'Floor ' + n : String(n); };
      const LCD_HINT = 'During a staring moment, hold Space or E.';
      const posOf = function (k) { return k === 'CUR' || !FI[k] ? S.floor : FI[k][0]; };
      const lcdOf = function (k) { return k === 'CUR' ? posLcd(S.floor) : (FI[k] ? FI[k][2] : '--'); };
      function posLcd(x) {
        if (x === 12.5) return '12B'; if (x === 6.9) return '6.9'; if (x === 13) return '13';
        const r = Math.round(x); return r < 0 ? 'B' + (-r) : r === 0 ? 'L' : String(r);
      }
      const keyOfPos = function (n) { n = Math.round(n); return KEYOF[String(n)] || (n >= 1 && n <= 12 ? String(n) : 'L'); };
      const tierNow = function () { return Math.max(S.nine ? 10 : 1, Math.min(12, 1 + Math.floor(S.rides / 3))); };
      const locked = function () { return api.now() < S.lockUntil; };
      const rideMs = function () { return api.selftest ? 400 : Math.max(2200, 3500 - ((api.now() - S.t0) / 60000) * 217); };

      /* ----- DOM ----- */
      ui.lcdText = h('span', { class: C('lcdt'), 'aria-hidden': 'true', text: '-' });
      ui.lcd = h('button', { class: C('lcd') + ' ' + C('s0'), type: 'button', 'aria-label': 'Floor indicator. ' + LCD_HINT }, ui.lcdText, h('span', { class: C('ring'), 'aria-hidden': 'true' }));
      ui.sub = h('span', { class: C('sub'), role: 'status', 'aria-live': 'polite', text: 'The speaker is listening.' });
      ui.npTitle = h('div', { class: C('npt'), text: TIER[0][0] });
      ui.eq = h('div', { class: C('eq'), 'aria-hidden': 'true' }, h('i'), h('i'), h('i'), h('i'));
      ui.goal = h('div', { class: C('banner') }, h('span', { text: 'Goal: Floor 7 and a half.' }), h('small', { text: GOALV[0] }));
      ui.bubbleTxt = h('span', { text: '' });
      ui.bubble = h('div', { class: C('bubble'), 'aria-hidden': 'true' }, ui.bubbleTxt);
      ui.vsign = h('div', { class: C('vsign'), text: 'LOBBY' });
      ui.vemo = h('div', { class: C('vemo'), 'aria-hidden': 'true', text: '🌿' });
      ui.vline = h('div', { class: C('vline'), text: PLAQUE });
      ui.vig = h('div', { class: C('vig') }, ui.vsign, ui.vemo, ui.vline);
      ui.sliver = h('button', { class: C('sliver'), type: 'button', 'aria-label': 'Peek', hidden: true, onclick: peek });
      ui.hall = h('div', { class: C('hall') + ' ' + C('open') }, ui.vig, h('div', { class: C('door') + ' ' + C('dl'), 'aria-hidden': 'true' }), h('div', { class: C('door') + ' ' + C('dr'), 'aria-hidden': 'true' }), ui.sliver);
      ui.lany = h('div', { class: C('lany'), text: 'Visitor' });
      ui.fourEl = h('div', { class: C('four') }, h('div', { class: C('body') }, h('div', { class: C('tie') }), ui.lany),
        h('div', { class: C('head') }, h('span', { class: C('eye') + ' ' + C('e1') }), h('span', { class: C('eye') + ' ' + C('e2') }), h('span', { class: C('mouth') })));
      ui.awkFill = h('div', { class: C('awkfill') });
      ui.awkTxt = h('span', { text: 'Awks 0' });
      ui.awks = h('div', { class: C('awks'), hidden: true }, ui.awkTxt, h('div', { class: C('awkbar'), 'aria-hidden': 'true' }, ui.awkFill));
      ui.halfp = h('div', { class: C('halfp'), 'aria-hidden': 'true', hidden: true }, h('div', { class: C('hbody') }), h('div', { class: C('htie') }), h('div', { class: C('hhead') }, h('i')), h('div', { class: C('hshoe') }));
      ui.fourBtn = h('div', { class: C('fourbox') },
        h('button', { type: 'button', 'aria-label': 'Make eye contact with Four', style: 'position:absolute;left:0;top:0;width:112px;height:158px;background:none;border:0;padding:0;cursor:pointer', onclick: eyeContact }, ui.fourEl), ui.halfp, ui.awks);
      ui.signs = h('div', { class: C('signs'), hidden: true, text: SIGNS[0] });
      ui.plaque = h('div', { class: C('plaques') }, h('span', { class: C('placard'), text: 'Occupancy: 1.5 persons. Cozy.' }));
      ui.tray = h('div', { class: C('tray'), hidden: true, role: 'group', 'aria-label': 'Say something' });
      ui.annMain = h('p', { text: WELCOME[0] });
      ui.annSub = h('p', { text: WELCOME[1] });
      ui.ann = h('div', { class: C('ann'), 'aria-live': 'polite' }, ui.annMain, ui.annSub);
      ui.cap = h('div', { class: C('cap'), 'aria-hidden': 'true', text: '🧢', hidden: true });
      ui.clip = h('div', { class: C('clip'), 'aria-hidden': 'true', text: '📋', hidden: true });
      ui.cab = h('div', { class: C('cab') },
        h('div', { class: C('ceil') }, ui.lcd, h('div', { class: C('grille') }, ui.sub), h('div', { class: C('np') }, h('span', { text: 'Now playing:' }), ui.npTitle, ui.eq)),
        ui.goal, h('div', { class: C('bubblerow') }, ui.bubble),
        h('div', { class: C('hallrow') }, ui.hall, ui.fourBtn), ui.signs, ui.plaque, ui.tray, ui.ann, ui.cap, ui.clip);

      function mkBtn(id, label, cls, aria) {
        const badge = h('span', { class: C('badge'), 'aria-hidden': 'true' });
        const b = h('button', { class: C('fb') + (cls ? ' ' + cls : ''), type: 'button', 'aria-label': aria || label, onclick: function () { onPanel(id); } },
          h('span', { class: C('fl'), 'aria-hidden': 'true', text: label }), badge);
        ui.btn[id] = b; ui.badge[id] = badge; return b;
      }
      ui.floors = h('div', { class: C('floors') });
      BASE.forEach(function (k) {
        ui.floors.appendChild(mkBtn(k, FI[k][3], '', k === 'L' ? 'Lobby' : /^B\d$/.test(k) ? 'Basement ' + k.charAt(1) : 'Floor ' + k));
        if (k === '7') ui.floors.appendChild(mkBtn('H', '7½', C('half'), 'Floor 7 and a half'));
      });
      ui.floors.appendChild(mkBtn('F13', '', C('plate'), 'Blank plate'));
      ui.xfl = h('div', { class: C('xtra'), hidden: true });
      EXTRA.forEach(function (k) { ui.xfl.appendChild(mkBtn(k, FI[k][3], C('wide') + ' ' + C('hide'), FI[k][1])); });
      function mkSec(id, label, aria) {
        const badge = h('span', { class: C('badge'), 'aria-hidden': 'true' });
        const b = h('button', { class: C('sb'), type: 'button', 'aria-label': aria || label, onclick: function () { onPanel(id); } }, h('span', { 'aria-hidden': 'true', text: label }), badge);
        ui.btn[id] = b; ui.badge[id] = badge; return b;
      }
      ui.sec = h('div', { class: C('sec') }, mkSec('DO', '◀ ▶', 'Door Open'), mkSec('DC', '▶ ◀', 'Door Close'), mkSec('AL', 'ALARM', 'Alarm'), mkSec('HP', 'HELP', 'Help'));
      ui.xtra = h('div', { class: C('xtra') });
      ui.xtra.appendChild(mkBtn('MY', '', C('hide'), 'Unlabeled button'));
      ui.btn.PH = mkSec('PH', 'PHONE', TINY_PRESS); ui.btn.PH.classList.add(C('hide')); ui.xtra.appendChild(ui.btn.PH);
      ui.btn.GU = mkSec('GU', 'Going up?', 'Going up?'); ui.btn.GU.classList.add(C('hide')); ui.xtra.appendChild(ui.btn.GU);
      ui.handle = h('button', { class: C('handle'), type: 'button', 'aria-label': 'Lever handle (drag up, or use the Nudge button)', tabIndex: -1 });
      ui.nudge = h('button', { class: C('nudge'), type: 'button', 'aria-label': 'Nudge toward 7 and a half' }, 'Nudge');
      ui.lever = h('div', { class: C('lever'), hidden: true }, h('div', { class: C('track') }, ui.handle), ui.nudge);
      ui.svg = buildShaft();
      ui.shaft = h('div', { class: C('shaft'), 'aria-hidden': 'true' }, ui.svg.root);
      ui.echo = h('div', { class: C('echo'), 'aria-hidden': 'true', text: WELCOME[0] });
      ui.panel = h('div', { class: C('panel') }, ui.echo, h('div', { class: C('pbody') }, h('div', { class: C('pcol') }, ui.floors, ui.xfl, ui.sec, ui.xtra, ui.lever), ui.shaft));
      ui.wrap = h('div', { class: C('wrap') }, ui.cab, ui.panel);
      root.appendChild(ui.wrap);
      api.setTitle('Elevator Simulator');

      function buildShaft() {
        const r = h('svg', { viewBox: '0 0 80 220', width: 80, height: 220, focusable: 'false' });
        r.appendChild(h('line', { x1: 40, y1: 6, x2: 40, y2: 214, stroke: '#2B2118', 'stroke-width': 2, 'stroke-dasharray': '5 4' }));
        for (let i = -2; i <= 12; i++) {
          const y = 210 - (i + 2) * 14;
          r.appendChild(h('line', { x1: 34, y1: y, x2: 46, y2: y, stroke: '#2B2118', 'stroke-width': 1.5 }));
          if (i % 2 === 0) r.appendChild(h('text', { x: 52, y: y + 3 }, i < 0 ? 'B' + (-i) : i === 0 ? 'L' : String(i)));
        }
        const dot = h('circle', { class: C('dot'), cx: 40, cy: 77, r: 4, fill: '#F26B5B', stroke: '#2B2118' });
        const cab = h('rect', { x: 28, y: 196, width: 24, height: 14, rx: 3, fill: '#E8B531', stroke: '#2B2118', 'stroke-width': 2 });
        r.appendChild(dot); r.appendChild(cab);
        return { root: r, dot: dot, cab: cab };
      }
      function paintShaft(pos) {
        const y = 210 - (clamp(pos, -2, 13) + 2) * 14 - 14;
        ui.svg.cab.setAttribute('y', String(clamp(y, 0, 200)));
        ui.svg.dot.setAttribute('cx', String(40 + Math.min(24, sv.zeno.n * 0.6)));
      }

      /* ----- renderers ----- */
      function lcdShow(t) {
        t = String(t); S.lcdLast = t; ui.lcdText.textContent = t; ui.lcd.setAttribute('aria-label', 'Floor indicator: ' + t + '. ' + LCD_HINT);
        const n = t.length, k = n <= 6 ? 0 : n <= 8 ? 1 : n <= 10 ? 2 : n <= 12 ? 3 : n <= 14 ? 4 : 5;
        for (let i = 0; i < 6; i++) tg(ui.lcd, 's' + i, i === k);
        const d = t.indexOf('.') >= 0 && /^\d+\.\d+$/.test(t) ? t.split('.')[1].length : 0;
        tg(ui.lcd, 'face', d >= 12); tg(ui.lcd, 'strain', d >= 15);
        ui.lcd.classList.remove(C('flick')); void ui.lcd.offsetWidth; ui.lcd.classList.add(C('flick'));
      }
      function ann(main, sub) { ui.annMain.textContent = main || ''; ui.annSub.textContent = sub || ''; ui.annSub.hidden = !sub; if (main || sub) ui.echo.textContent = main || sub; }
      function fourSay(text, keep) {
        if (!text) return;
        ui.bubbleTxt.textContent = text; tg(ui.bubble, 'show', true); ui.sub.textContent = 'Four: ' + text;
        tg(ui.fourEl, 'talking', true); tg(ui.fourEl, 'turn', true);
        api.clearTimeout(S.mouthT); S.mouthT = api.setTimeout(function () { tg(ui.fourEl, 'talking', false); tg(ui.fourEl, 'turn', false); }, Math.min(2800, 40 * text.length) * Math.max(TS, 0.3));
        api.clearTimeout(S.bubbleT);
        if (!keep) S.bubbleT = api.setTimeout(function () { tg(ui.bubble, 'show', false); }, Math.max(2500, 55 * text.length + 1500) * Math.max(TS, 0.3));
      }
      function hideBubble() { api.clearTimeout(S.bubbleT); tg(ui.bubble, 'show', false); }
      function paintAwks() {
        const v = clamp(S.awks, -5, 10);
        ui.awkFill.style.width = ((v + 5) / 15 * 100) + '%';
        ui.awkFill.style.background = v >= 8 ? '#F26B5B' : v >= 4 ? '#E8B531' : '#7FD1B0';
        ui.awkTxt.textContent = (S.beat < 5 && !sv.ended ? 'Awkwardness ' : 'Awks ') + (v > 0 ? '+' : '') + v;
      }
      function setAwks(d) {
        S.awks = clamp(S.awks + d, -5, 10); paintAwks(); api.stat.max('elevator-simulator.awks.peak', Math.max(0, S.awks));
        if (S.awks >= 8 && !S.w8) { S.w8 = true; mgmt(AWK8, { mood: 'confused', force: true }); } else if (S.awks < 8) S.w8 = false;
        if (S.awks >= 10) S.silenceDue = true;
      }
      function paintBanner() {
        const c = sv.closest, s = String(c.pos), after = s.indexOf('.') >= 0 ? s.split('.')[1].length : 1;
        const sec = sv.ended ? 'Goal: Floor 7 and three quarters.' : 'Goal: Floor 7 and a half.';
        ui.goal.firstChild.textContent = sec;
        ui.goal.lastChild.textContent = sv.ended ? 'The goal has been reused. It is the same goal.' : S.beat >= 7 ? 'Closest so far: ' + s + ' (technically ' + (c.pos === 7 ? '7.0' : after + ' decimals') + ')' : GOALV[S.bannerI % GOALV.length];
        if (S.cert === 2 && !sv.ended && S.bannerI % 2 === 1) ui.goal.lastChild.textContent = EXP.banner;
      }
      function paintBadge(id) {
        const n = S.pressed[id] || 0, b = ui.btn[id], bd = ui.badge[id];
        if (!b) return; bd.textContent = String(n); tg(b, 'has', n > 0); b.style.setProperty('--g', String(Math.min(20, n) / 20));
      }
      function litBtn(id, ms) {
        const b = ui.btn[id]; if (!b) return; tg(b, 'lit', true);
        api.setTimeout(function () { tg(b, 'lit', false); }, ms || 650);
      }
      function showVig(k, note) {
        const v = VIG[k] || VIG.L; let line = note;
        if (!line) {
          const pool = v.slice(2); let i = api.randInt(0, pool.length - 1);
          if (pool.length > 1 && i === S.vigLast[k]) i = (i + 1) % pool.length;
          S.vigLast[k] = i; line = pool[i];
        }
        ui.vemo.textContent = v[0]; ui.vsign.textContent = v[1]; ui.vline.textContent = line;
        let sz = 46;
        if (k === '9' && sv.lobbyVisits >= 20) { sz = 46 + Math.min(5, Math.floor(sv.floor9Visits / 5)) * 6; ui.vemo.textContent = '🧥🌳'; }
        ui.vemo.style.fontSize = sz + 'px';
        tg(ui.vig, 'fog', k === 'B3' || k === 'B2');
      }
      function setDoors(open) { tg(ui.hall, 'open', open); }
      function closeDoors() { if (ui.hall.classList.contains(C('open'))) { setDoors(false); api.sfx('whoosh'); } }
      function clearClose() { api.clearTimeout(S.closeT); }
      function scheduleClose() {
        clearClose(); const tok = S.token; S.phase = 'idle';
        S.closeT = api.setTimeout(function () { if (S.dead || tok !== S.token || S.phase !== 'idle') return; closeDoors(); }, wt(1800));
      }
      function updateNP() {
        const t = tierNow(), i = t - 1, k = S.rides % 3;
        let name = TIER[i][0], cap = TIER[i][1];
        if (k === 1) { name = BADJ[api.randInt(0, 7)] + ' ' + BGEN[api.randInt(0, 7)] + ' (' + BPAR[api.randInt(0, 7)] + ')'; cap = api.pick(MUSIC_EXTRA); }
        ui.npTitle.textContent = name; ui.npTitle.setAttribute('title', cap);
        ui.eq.childNodes.forEach(function (n) { n.style.animationDuration = (1.2 / t).toFixed(2) + 's'; });
        if (t !== S.tier) {
          S.tier = t;
          mgmt('Now playing: ' + TIER[i][0] + '. ' + TIER[i][1], { mood: 'smug' });
          if (t >= 5 && !S.harmony) { S.harmony = true; fourSay(HARMONY); }
        } else if (k === 1 && S.rides > 1 && api.chance(0.3)) ann('Now playing: ' + name + '. ' + cap);
      }
      function startMusic(auto) {
        stopMusic(); if (S.noMusic || S.phase === 'ending') return;
        const ms = Math.round(380 - (S.tier - 1) * 20.9) * (S.idleLvl >= 1 ? 2 : 1) * (auto ? 1.4 : 1);
        S.mStep = 0; S.mLeft = auto ? 8 : 1e9; tg(ui.cab, 'playing', true);
        S.musicT = api.setInterval(function () {
          let n = PAT[S.mStep % 8];
          if (S.tier >= 9 && (S.mStep % 8 === 2 || S.mStep % 8 === 6)) n = (S.mStep >> 3) % 2 ? 'honk' : 'bell';
          api.sfx(n); S.mStep++; S.mLeft--; if (S.mLeft <= 0) stopMusic();
        }, Math.max(60, ms));
      }
      function stopMusic() { if (S.musicT) { api.clearInterval(S.musicT); S.musicT = 0; } tg(ui.cab, 'playing', false); }

      /* ----- beats ----- */
      function maybeAdvanceBeat() {
        while (S.beat < 8) {
          const nb = S.beat + 1, secs = (api.now() - S.t0) / 1000 * (api.selftest ? 20 : 1);
          if (secs >= BT[nb] && S.rides >= BR[nb]) { S.beat = nb; onBeat(nb); } else break;
        }
      }
      function onBeat(b) {
        mgmt(fill(BEATL[b], { P: S.lastP || '9', A: S.lastR || '4', FP: fl(S.lastP || '9'), FA: fl(S.lastR || '4') }), { mood: 'proud', force: true, priority: 1 });
        if (b === 3) { ui.awks.hidden = false; paintAwks(); }
        if (b === 4) ui.btn.MY.classList.remove(C('hide'));
        if (b === 5) { ui.signs.hidden = false; ui.btn.PH.classList.remove(C('hide')); paintAwks(); }
        if (b === 6 && !S.revealDone) { S.revealPending = true; }
        if (b === 7) paintBanner();
        if (b === 8 && !sv.ended) { S.extrasOn = true; ui.xfl.hidden = false; EXTRA.forEach(function (k) { ui.btn[k].classList.remove(C('hide')); }); }
        if (b === 6) api.setTimeout(function () { mgmt(DC6A, { force: true }); }, 3000 * TS);
      }
      function checkNine() {
        if (!S.nine && S.beat >= 7 && api.stat.get('elevator-simulator.maxdigits') >= 12 && sv.zeno.active) {
          S.nine = true; mgmt(BEATL[9], { mood: 'confused', force: true, priority: 1 }); S.tier = 10; ui.npTitle.textContent = TIER[9][0];
        }
      }

      /* ----- the ride ----- */
      function availKeys() { return S.extrasOn ? BASE.concat(EXTRA) : BASE; }
      function drawDest(pk) {
        if (EXACT.indexOf(pk) >= 0) return pk;
        const P0 = FI[pk][0], av = availKeys().filter(function (k) { return k !== pk; });
        if (!S.scripted) { S.scripted = true; return keyOfPos(P0 > 6 ? P0 - 5 : P0 + 5); }
        if (S.beat >= 5 && !S.geraldDone && !S.geraldForced && pk !== '4') { S.geraldForced = true; return '4'; }
        const teaseP = S.beat >= 7 ? 0.45 : S.beat >= 4 ? 0.35 : 0.25;
        if (S.beat >= 3 && api.chance(teaseP)) {
          const u = api.rand() * 100, r = u < 40 ? '7' : u < 80 ? '8' : '6';
          if (r !== pk) return r;
        }
        const u = api.rand();
        let r;
        if (u < 0.4) r = api.pick(av);
        else if (u < 0.7) { const near = av.filter(function (k) { return Math.abs(posOf(k) - P0) <= 1; }); r = near.length ? api.pick(near) : api.pick(av); }
        else if (u < 0.85) r = S.prevKey; else r = S.floorKey;
        if (!r || r === pk) r = api.pick(av);
        if (r === pk) r = pk === '12' ? '11' : keyOfPos(P0 + 1);
        return r;
      }
      function onPanel(id) {
        if (S.dead) return;
        S.pressed[id] = (S.pressed[id] || 0) + 1; paintBadge(id); litBtn(id, 320); api.sfx('tick');
        if (!mash()) return;
        if (id === 'H') return pressHalf();
        if (FI[id]) { love(id); return pressFloor(id); }
        if (id === 'DO') return doorOpen();
        if (id === 'DC') return doorClose();
        if (id === 'AL') return alarm();
        if (id === 'HP') { bump('helps'); const hn = S.pressed.HP; mgmt(hn === 1 ? HELP : nextHelp(), { mood: 'confused', force: true }); if (hn % 3 === 1) fourSay('Hello. This is Help. It is also me.'); return; }
        if (id === 'MY') {
          const mn = S.pressed.MY, ml = mn === 7 ? MY7 : fill(mn === 1 ? MYST : nextMys(), { C: mn });
          ann(ml); if (mn === 7) mgmt(MY7, { force: true, mood: 'proud' }); api.sfx('pop'); return;
        }
        if (id === 'PH') return phone();
        if (id === 'GU') { mgmt(END.l, { force: true }); return pressFloor(api.pick(BASE), true); }
      }
      function annOk() { return ['ending', 'silence', 'quiet', 'inspect', 'crack'].indexOf(S.phase) < 0; }
      function love(id) {
        const n = S.pressed[id], B = id === 'F13' ? '13' : FI[id][3];
        if (n === 25 && api.flag.get('the-button.ceremony')) mgmt(fill(LOVE_CER, { B: B }), { force: true, mood: 'smug' });
        else if (LOVE[n]) mgmt(fill(LOVE[n], { B: B }), { force: true, mood: n >= 50 ? 'proud' : 'neutral' });
      }
      function waitNote(ph) { if (!S.waitSaid[ph]) { S.waitSaid[ph] = 1; mgmt(WAITM, { force: true, mood: 'confused' }); } }
      function impatient() {
        S.impat++; if (S.impat <= 2 || S.impat % 3 === 1) mgmt(nextImp(), { mood: 'confused' });
      }
      function pressFloor(id, viaGoUp) {
        const ph = S.phase;
        if (ph === 'pressed' || ph === 'riding') { impatient(); return; }
        if (ph === 'quiet') return waitNote(ph);
        if (ph === 'ending' || ph === 'crack') return;
        if (ph === 'inspect') { if (!S.inspSaid) { S.inspSaid = true; mgmt(INSP.hold, { force: true, mood: 'confused' }); } return; }
        if (ph === 'silence') { S.silenceBroken = true; return; }
        if (S.painted) { if (!S.paintSaid) { S.paintSaid = true; ann('WET PAINT.', 'Floor presses are ignored.'); } return; }
        if (id === 'F13') {
          if (S.beat < 4) { ann('The plate is blank. It has no opinion yet.'); api.sfx('blip'); return; }
          bump('floor13');
        }
        if (ph === 'talk') ignoreTalk(true); else if (ph === 'stare') stareEnd('fail');
        if (S.armed) disarmLever(true);
        beginRide(id, !!viaGoUp);
      }
      function beginRide(id, viaGoUp) {
        const tok = ++S.token; S.phase = 'pressed'; clearClose(); hideBubble(); hideTray(); tg(ui.fourEl, 'staring', false); S.eyeUsed = false; S.fourClicks = 0; S.phoneUsed = false; S.impat = 0;
        litBtn(id, 900); api.sfx('blip');
        if (S.beat >= 3 && !sv.zeno.active && id !== '6' && api.chance(1 / 30)) { litBtn('6', 1400); mgmt(GHOST, { mood: 'confused', force: true }); }
        const R = drawDest(id), special = EXACT.indexOf(id) >= 0;
        S.lastP = nm(id); S.lastR = nm(R);
        const c = { from: S.floor, p: posOf(id), r: posOf(R), rKey: R, ms: rideMs(), crack: false, meta: { kind: special ? 'special' : 'floor', P: id } };
        if (!special && S.beat >= 3 && S.sinceCrack >= 10 && !sv.zeno.active && api.chance(1 / 25)) c.crack = true;
        let delay = 0;
        if (S.pleaseRides > 0) { S.pleaseRides--; tg(ui.btn[id], 'fill', true); api.setTimeout(function () { tg(ui.btn[id], 'fill', false); }, 450 * TS); delay = wt(400); mgmt(S.pleaseRides === 0 ? PLEASE[1] : PLEASE[0], { force: true }); }
        updateNP();
        at(tok, function () {
          lcdShow('Going to ' + (id === 'F13' ? '13' : FI[id][2]));
          ann(viaGoUp ? END.l : 'Going to ' + nm(id) + '.', nextThink());
          at(tok, function () { travel(tok, c); }, wt(600));
        }, delay);
      }
      function lcdSeq(c) {
        const a = [], f = c.from, p = c.p, r = c.r;
        for (let i = 1; i <= 3; i++) a.push(posLcd(f + (p - f) * i / 3));
        a.push('--');
        for (let i = 1; i <= 3; i++) a.push(i === 3 ? lcdOf(c.rKey) : posLcd(p + (r - p) * i / 3));
        return a;
      }
      function travel(tok, c) {
        S.phase = 'riding'; tg(ui.cab, 'riding', true); startMusic(); closeDoors();
        const seq = lcdSeq(c), dt = Math.max(40, c.ms / seq.length); let i = 0;
        const step = function () {
          if (c.crack && i === 3) { c.crack = false; lcdShow('7-8'); S.sinceCrack = 0; return startCrack(tok, c, step); }
          if (i >= seq.length) return arrive(c.rKey, c.meta);
          lcdShow(seq[i]); if (i % 2 === 0) api.sfx('tick');
          paintShaft(c.from + (c.r - c.from) * i / seq.length); i++;
          at(tok, step, dt);
        };
        at(tok, step, wt(500));
      }
      function arrive(R, meta) {
        const tok = ++S.token; S.phase = 'arrived'; stopMusic(); tg(ui.cab, 'riding', false);
        S.prevKey = S.floorKey; if (R !== 'CUR') S.floorKey = R;
        S.floor = FI[R][0] == null ? S.floor : FI[R][0]; S.rides++; sv.totalRides++; S.sinceTalk++; S.sinceCrack++;
        sv.history.push(R); if (sv.history.length > 12) sv.history.shift();
        bump('rides'); award(0.2, 'ride'); ach('first-ride'); api.sfx('ding'); setDoors(true); lcdShow(lcdOf(R)); paintShaft(S.floor);
        if (R === 'L' || R === 'OTHER') sv.lobbyVisits++;
        if (R === '9') sv.floor9Visits++;
        S.lastR = nm(R);
        maybeAdvanceBeat();
        let note = null;
        if (R === 'L' && sv.lobbyVisits === 10) note = DENNIS10; else if (R === 'L' && sv.lobbyVisits === 20) note = DENNIS20;
        if (R === '7' && api.chance(1 / 40)) { note = GERALD7; api.flag.set('metGerald', true); }
        showVig(R, note);
        const v = { P: meta.P ? nm(meta.P) : '', A: nm(R), C: S.rides, RW: S.rides === 1 ? 'ride' : 'rides' };
        v.FP = fl(v.P); v.FA = fl(v.A);
        let main, sub = '';
        if (meta.kind === 'half') { main = (R === '7' ? HALF.l7 : HALF.l8); sub = nearMiss(R); }
        else if (meta.kind === 'floor' && meta.P && meta.P !== R) { const dv = deviation(v); main = (S.rides > 1 && R === S.prevKey && api.chance(0.6)) ? nextAgain() : dv; }
        else if (R === S.prevKey && meta.kind !== 'special') main = nextAgain();
        else main = fill(nextArr(), v);
        if (meta.kind === 'crack') main = CRACK_MISS; else if (meta.kind === 'crackhit') main = CRACK_HIT;
        if (R === '7' && meta.kind !== 'half') sub = S.beat < 7 ? L7EARLY : L7;
        if (R === '8' && meta.kind !== 'half') sub = L8;
        if (R === '7' && !sub) sub = MISC[2];
        if (api.flag.get('metToaster') && api.chance(1 / 20)) sub = api.pick(TOAST);
        if (R === '12' && !sub && api.chance(0.4)) sub = MISC[[0, 1, 3, 4][api.randInt(0, 3)]];
        if (R === 'L' && S.rides > 1 && api.flag.get('metDennis') && api.chance(0.35)) sub = CB.dennis;
        if (R === '7' && api.flag.get('sockSeen') && api.chance(0.4)) sub = CB.sock;
        if (S.cert === 2 && !sub && api.chance(0.3)) sub = fill(nextRoom(), v);
        if (meta.kind !== 'crack' && meta.kind !== 'crackhit') sub = rare(R, sub, v);
        if (S.beat >= 6 && api.chance(0.3)) main += ' ' + nextApol();
        ann(main, sub);
        ui.lany.textContent = S.balloon ? BALLOON.lany : S.cert === 2 ? EXP.lany : S.beat >= 6 && S.revealDone ? 'Elevator (Acting)' : nextLany();
        if (api.chance(1 / 6)) mgmt(nextMg(), { mood: 'smug' });
        if (S.beat >= 4 && api.chance(1 / 12)) { tg(ui.btn.F13, 'lit', true); api.setTimeout(function () { tg(ui.btn.F13, 'lit', false); }, wt(3000)); }
        if (S.geraldAboard) { S.geraldAboard = false; mgmt(GERALD_OUT, { force: true, mood: 'confused' }); }
        persist();
        afterArrive(tok, R, meta);
      }
      function rare(R, sub, v) {
        if (S.balloon) { S.balloon = false; return fill(BALLOON.out, v); }
        if (sv.halfState === 0 && S.beat >= 5 && S.rides >= 12 && api.chance(0.2)) return boardHalf();
        if (S.beat >= 3 && S.rides - S.balAt > 12 && api.chance(1 / 60)) {
          S.balloon = true; S.balAt = S.rides; bump('balloons'); award(0.5, 'balloon'); api.sfx('pop');
          if (sv.metFour) { const tk = S.token; at(tk, function () { fourSay(BALLOON.four); }, wt(1400)); }
          return BALLOON.in;
        }
        if (S.beat >= 4 && S.rides - S.comAt > 10 && api.chance(1 / 45)) {
          S.comAt = S.rides; bump('comments'); award(0.5, 'comment card'); api.sfx('stamp');
          return api.chance(0.2) ? 'A fortune slides under the doors, unattached to any cookie: "' + api.line('fortune') + '"' : nextCom();
        }
        return sub;
      }
      function showHalf(on) { ui.halfp.hidden = !on; tg(ui.fourBtn, 'withhalf', on); }
      function boardHalf() {
        sv.halfState = 1; persist(); showHalf(true); bump('halfboards'); award(1, 'half person'); api.sfx('pop');
        api.setTimeout(function () { if (sv.metFour && (S.phase === 'idle' || S.phase === 'closing')) fourSay(HALFP.four); }, wt(1500));
        api.setTimeout(function () { mgmt(HALFP.mgmt, { force: true, mood: 'confused' }); }, wt(3600));
        return HALFP.board + ' ' + HALFP.nod;
      }
      function deviation(v) {
        const n = api.stat.get('elevator-simulator.deviations') + 1; bump('deviations');
        if (S.rides === 1) return fill(FIRST_DEV, v) + ' Deviation ' + n + ' on Form 27B/6. Reason ' + n + ' (Ambient): The elevator wanted to see how you would react.';
        if (n === 12) return DEV12; if (n === 25) return DEV25; if (n === 50) return DEV50;
        v.N = n;
        if (api.chance(1 / 8)) return fill(nextHand(), v);
        const form = api.rand();
        if (form >= 0.45 && form < 0.75) return fill(nextArr(), v) + ' (Deviation ' + n + ' filed.)';
        if (form >= 0.75 && form < 0.9) return fill(nextPre(), v);
        if (form >= 0.9) return 'Deviation ' + n + '. ' + fill(nextBody(), v);
        let k = n > 1 ? api.randInt(1, n - 1) : 1, tail = '';
        if (n >= 4 && api.chance(0.3)) tail = ' ' + fill(S.beat >= 8 && api.chance(0.25) ? api.pick(SELFREF) : 'Reason <N> cites Reason <K>.', { N: n, K: k });
        return fill(nextPre(), v) + ' Deviation ' + n + ' on Form 27B/6. Reason ' + n + ' (' + nextType() + '): ' + fill(nextBody(), v) + tail;
      }
      function afterArrive(tok, R, meta) {
        if (S.beat >= 8 && !sv.quietDone && meta.kind !== 'special') return startQuiet();
        if (S.silenceDue) return startSilence();
        if (S.beat >= 7 && !sv.ended && (S.floorKey === '7' || S.floorKey === '8')) return armLever();
        if (R === '4' && S.beat >= 5 && !S.geraldDone) {
          S.geraldDone = true; S.geraldAboard = true; api.flag.set('metGerald', true); mgmt(GERALD_IN, { force: true, mood: 'proud', priority: 1 });
          return scheduleClose();
        }
        if (S.rides === 2 && S.beat < 3 && !S.ride2) {
          S.ride2 = true; fourSay('Going up?');
          at(tok, function () { fourSay('Of course you are. That is also up, from the basement\'s point of view.'); }, wt(2200));
          return scheduleClose();
        }
        if (talkDue()) return startTalk();
        scheduleClose();
      }

      /* ----- door crack ----- */
      function startCrack(tok, c, resume) {
        S.phase = 'crack'; S.cracking = true; ui.sliver.hidden = false;
        tg(ui.sliver, 'sliverw', !!S.crackMissed);
        S.prevFocus = document.activeElement;
        api.setTimeout(function () { if (S.cracking && !S.dead) { try { ui.sliver.focus(); } catch (e) { /* focus is optional */ } } }, 0);
        at(tok, function () {
          if (!S.cracking) return;
          S.cracking = false; ui.sliver.hidden = true; S.crackMissed = true; restoreFocus();
          mgmt(CRACK_MISS_M, { mood: 'disappointed', force: true });
          S.crackFlip = !S.crackFlip; c.rKey = S.crackFlip ? '8' : '7'; c.r = FI[c.rKey][0]; c.meta = { kind: 'crack', P: c.meta.P };
          S.phase = 'riding'; resume();
        }, api.selftest ? 600 : (S.crackMissed ? 1400 : 1000));
      }
      function restoreFocus() {
        const f = S.prevFocus; S.prevFocus = null;
        try { if (f && f !== ui.sliver && f.isConnected && !f.hidden && root.contains(f)) f.focus(); else if (document.activeElement === ui.sliver) ui.sliver.blur(); } catch (e) { /* focus is optional */ }
      }
      function peek() {
        if (!S.cracking || S.phase !== 'crack') return;
        S.cracking = false; ui.sliver.hidden = true; restoreFocus();
        bump('cracks'); award(3, 'door crack', true); ach('crack'); api.sfx('tada');
        showVig('7', CRACK_HIT); setDoors(true); mgmt(CRACK_M, { mood: 'confused', force: true, priority: 1 });
        ann(CRACK_HIT, MISC[2]);
        S.crackFlip = !S.crackFlip;
        const tok2 = ++S.token; S.phase = 'riding';
        at(tok2, function () { setDoors(false); arrive(S.crackFlip ? '8' : '7', { kind: 'crackhit', P: null }); }, wt(1600));
      }

      /* ----- small talk ----- */
      function talkDue() {
        if (S.beat < 3) return false;
        if (!sv.metFour || S.revealPending) return true;
        if (S.sinceTalk >= 4) return true;
        if (!talkBag.length) talkBag = api.shuffle(['talk', 'quiet', 'quiet']);
        return talkBag.pop() === 'talk';
      }
      function pickChoices() {
        const all = []; for (let i = 0; i < REPL.length; i++) all.push(i);
        const idx = api.shuffle(all).slice(0, 3);
        if (idx.indexOf(11) < 0 && (!S.lastTalkNothing || S.nothingRun > 0)) idx[2] = 11;
        S.lastTalkNothing = idx.indexOf(11) >= 0;
        return idx;
      }
      function startTalk() {
        const tok = ++S.token; S.phase = 'talk'; S.sinceTalk = 0; clearClose(); setDoors(true);
        const t = api.now(); S.talkTimes.push(t); if (S.talkTimes.length > 4) S.talkTimes.shift();
        if (!sv.metFour) {
          sv.metFour = true; api.flag.set('elevator-simulator.metFour', true); persist();
          fourSay("Hi. I'm Four. People say I'm between Three and Five, but I think I'm just Four.", true);
          at(tok, function () { openTray(tok, 'talk'); }, wt(2200));
          return;
        }
        if (S.revealPending) {
          fourSay(REVEAL_Q, true); showTray('reveal', [['I suspected.'], ['Sure.'], ['Say nothing']]); armTrayTimeout(tok); return;
        }
        const kind = S.beat >= 4 ? kindBag() : 'tray';
        if (kind === 'stare') return startStare(tok);
        openTray(tok, 'talk');
      }
      function openTray(tok, mode) {
        if (api.chance(1 / 60)) { mgmt(SWAP[0], { force: true, mood: 'confused' }); ann(SWAP[1], SWAP[2]); }
        let text = S.revealDone ? nextOpenP() : nextOpen();
        if (sv.friend && api.chance(0.4)) text = nextFop();
        fourSay(text, true); S.curChoices = pickChoices();
        showTray(mode, S.curChoices.map(function (i) { return [REPL[i][0]]; })); armTrayTimeout(tok);
      }
      function armTrayTimeout(tok, ms) { api.clearTimeout(S.trayT); S.trayT = at(tok, function () { ignoreTalk(false); }, wt(ms || (S.smallTalks > 2 ? 8000 : 12000))); }
      function holdTray() { if (S.trayMode === 'talk' || S.trayMode === 'reveal') armTrayTimeout(S.token, 20000); }
      api.on(ui.tray, 'focusin', holdTray); api.on(ui.tray, 'pointerenter', holdTray);
      function showTray(mode, choices) {
        S.trayMode = mode; ui.tray.textContent = '';
        choices.forEach(function (c, i) { ui.tray.appendChild(h('button', { type: 'button', onclick: function () { onTray(i); } }, c[0])); });
        ui.tray.hidden = false;
      }
      function hideTray() { api.clearTimeout(S.trayT); ui.tray.hidden = true; ui.tray.textContent = ''; S.trayMode = ''; }
      function onTray(i) {
        const mode = S.trayMode; if (!mode || S.dead) return;
        api.sfx('pop');
        if (mode === 'end') return endReply();
        if (mode === 'quiet') return quietReply();
        if (mode === 'reveal') return revealReply();
        if (mode === 'pitch') return pitchReply(i);
        const tok = S.token, ri = S.curChoices[i];
        if (ri === undefined) return;
        hideTray();
        const R = REPL[ri], now = api.now();
        let line = R[2];
        if (ri === 11) line = nextConf();
        else if (S.lastReplies.indexOf(ri) >= 0 && CALLB[ri] && api.chance(0.5)) line = CALLB[ri];
        if (S.talkTimes.length >= 4 && now - S.talkTimes[0] < 30000 * TS) line = SPAMTALK;
        S.lastReplies.push(ri); if (S.lastReplies.length > 3) S.lastReplies.shift();
        S.nothingRun = ri === 11 ? S.nothingRun + 1 : 0;
        if (ri === 11 && S.nothingRun === 1 && !sv.friend && !S.hinted) { S.hinted = true; line += HINT; }
        const friendNow = ri === 11 && S.nothingRun >= 3 && !sv.friend;
        if (friendNow) line = FRIEND[0];
        setAwks(R[1]); fourSay(line, true);
        if (ri === 1) { S.yep = true; sv.yep = true; persist(); }
        bump('smalltalks'); S.smallTalks = (S.smallTalks || 0) + 1; award(1, 'small talk');
        if (api.stat.get('elevator-simulator.smalltalks') >= 5 && (S.yep || sv.yep)) ach('small-talk');
        if (friendNow) {
          sv.friend = true; persist(); ach('friend'); award(2, 'friend', true); bump('friends'); api.flag.set('elevator-simulator.friend', true); api.sfx('tada');
          at(tok, function () { fourSay(FRIEND[1], true); mgmt(FRIEND_M, { force: true, mood: 'proud' }); }, wt(3200));
          return finishTalk(tok, 7600);
        }
        finishTalk(tok);
      }
      function finishTalk(tok, ms) {
        if (S.phase === 'talk' || S.phase === 'stare') S.phase = 'closing';
        at(tok, function () {
          if (S.silenceDue) return startSilence();
          if (api.chance(0.25)) fourSay(PARTING);
          hideBubbleSoon(); scheduleClose();
        }, wt(ms || 2400));
      }
      function hideBubbleSoon() { api.clearTimeout(S.bubbleT); S.bubbleT = api.setTimeout(function () { tg(ui.bubble, 'show', false); }, 1800 * Math.max(TS, 0.3)); }
      function ignoreTalk(startsRide) {
        if (S.phase !== 'talk' && S.phase !== 'stare') return;
        hideTray(); setAwks(2); fourSay(nextIgn());
        if (S.inPitch) { S.inPitch = false; lcdShow(lcdOf(S.floorKey)); }
        if (startsRide) { S.phase = 'idle'; return; }
        const tok = S.token; finishTalk(tok);
      }
      function revealReply() {
        const tok = S.token; hideTray(); S.revealPending = false; S.revealDone = true;
        fourSay(REVEAL_A, true); tg(ui.fourEl, 'faded', true); api.sfx('whoosh'); award(1, 'reveal'); ui.lany.textContent = 'Elevator (Acting)';
        mgmt(DC6B, { force: false });
        finishTalk(tok);
      }
      function eyeContact() {
        if (S.phase === 'talk' || S.phase === 'stare' || S.phase === 'ending') return;
        if (S.eyeUsed) { S.fourClicks++; fourSay(S.fourClicks === 1 ? "Please. I'm doing the best I can with this face." : nextPoke()); return; }
        S.eyeUsed = true; setAwks(2); fourSay('Please don\'t.'); api.sfx('blip');
      }
      function phone() {
        if (S.phoneUsed) { ann('The phone has already been checked on this ride. It is still not there.'); return; }
        S.phoneUsed = true; setAwks(-1); fourSay(nextPh()); api.sfx('bloop');
      }

      /* ----- stare ----- */
      function startStare(tok) {
        S.phase = 'stare'; fourSay(api.flag.get('staring-contest.met') && api.chance(0.3) ? CB.staring : nextStare(), true); tg(ui.lcd, 'stare', true); ann('Hold the number (press and hold, or hold Space or E). Do not look at him.', '');
        api.clearTimeout(S.stareT);
        S.stareT = at(tok, function () { if (S.hold) return; stareEnd('timeout'); }, wt(8000));
      }
      function holdStart() {
        if (S.phase !== 'stare' || S.hold || S.dead) return;
        const tok = S.token; S.hold = { tok: tok, ok: false, moved: false };
        api.clearTimeout(S.stareT); tg(ui.lcd, 'holding', true); tg(ui.fourEl, 'staring', true);
        S.hold.t2 = at(tok, function () {
          if (!S.hold) return; S.hold.ok = true; setAwks(-1); fourSay(STARE_OK, true); award(0.3, 'staring'); bump('stares'); api.sfx('ding');
        }, api.selftest ? 300 : 2000);
        S.hold.t6 = at(tok, function () {
          if (!S.hold) return; S.hold.moved = true; ann(STARE_6, ''); award(0.5, 'moved'); ach('stare'); mgmt(STARE_6, { mood: 'proud', force: true }); api.sfx('tada');
        }, api.selftest ? 900 : 6000);
        S.hold.tm = at(tok, function () { holdEnd(); }, api.selftest ? 1500 : 14000);
      }
      function holdEnd() {
        const hd = S.hold; if (!hd) return;
        S.hold = null; tg(ui.lcd, 'holding', false); tg(ui.fourEl, 'staring', false);
        if (S.phase !== 'stare' || hd.tok !== S.token) return;
        stareEnd(hd.ok ? 'ok' : 'fail');
      }
      function stareEnd(why) {
        if (S.phase !== 'stare') return;
        const tok = ++S.token; S.hold = null; tg(ui.lcd, 'stare', false); tg(ui.lcd, 'holding', false); tg(ui.fourEl, 'staring', false); api.clearTimeout(S.stareT);
        if (why === 'fail') { setAwks(1); fourSay(STARE_FAIL); api.sfx('buzz'); }
        else if (why === 'timeout') { setAwks(1); fourSay(STARE_TO); }
        S.phase = 'closing';
        finishTalk(tok);
      }

      /* ----- silence and the quiet ride ----- */
      function startSilence() {
        const tok = ++S.token; S.phase = 'silence'; S.silenceDue = false; hideTray(); stopMusic(); S.noMusic = true; clearClose();
        mgmt(AWK10, { mood: 'confused', force: true, priority: 1 }); setDoors(true); tg(ui.cab, 'hush', true);
        ann('(the elevator holds its breath)', ''); ui.sub.textContent = '';
        S.silenceBroken = false;
        at(tok, function () {
          tg(ui.cab, 'hush', false); S.noMusic = false;
          if (!S.silenceBroken) { ach('silencer'); award(1, 'silence'); }
          fourSay(SILENCE_END); S.awks = 3; paintAwks(); S.w8 = false; ann(SILENCE_END, '');
          if (!sv.pitched && sv.metFour) return at(tok, function () { startPitch(tok); }, wt(2000));
          S.phase = 'closing'; finishTalk(tok);
        }, api.selftest ? 800 : 6000);
      }
      function startPitch(tok) {
        sv.pitched = true; persist(); S.phase = 'talk'; S.pitchI = 0; S.inPitch = true; setDoors(true); clearClose(); bump('pitchstarts');
        lcdShow('PITCH'); fourSay(PITCH.open, true); ann('Four has a slide deck.', 'It is on the display. The display has agreed to this.');
        at(tok, function () { showSlide(tok); }, wt(3200));
      }
      function showSlide(tok) {
        const sl = PITCH.slides[S.pitchI]; if (!sl) return;
        lcdShow(sl[0]); fourSay(sl[1], true); api.sfx('blip');
        if (S.pitchI === 2) mgmt(PITCH.note, { force: true, mood: 'confused' });
        showTray('pitch', [['Invest'], ['Ask a follow-up question'], ['Say nothing']]); armTrayTimeout(tok);
      }
      function pitchReply(i) {
        const tok = S.token; hideTray(); award(0.5, 'pitch'); setAwks(i === 2 ? -1 : 0); fourSay(PITCH.reply[i] || PITCH.reply[0], true);
        S.pitchI++;
        at(tok, function () { if (S.pitchI >= PITCH.slides.length) pitchEnd(tok); else showSlide(tok); }, wt(2600));
      }
      function pitchEnd(tok) {
        S.inPitch = false; award(3, 'pitch', true); ach('seed'); bump('pitches'); api.sfx('tada'); lcdShow(lcdOf(S.floorKey));
        fourSay(PITCH.fin, true); mgmt(PITCH.pass, { force: true, mood: 'smug', priority: 1 });
        S.phase = 'closing'; finishTalk(tok, 4200);
      }
      function startQuiet() {
        const tok = ++S.token; S.phase = 'quiet'; sv.quietDone = true; persist(); stopMusic(); S.noMusic = true; clearClose(); setDoors(true);
        tg(ui.cab, 'warm', true); ui.lany.textContent = 'Passenger'; ann(QUIET[0], QUIET[1]); fourSay('Is it all right if I stay on to the top?', true);
        showTray('quiet', [['Of course.']]); api.clearTimeout(S.trayT); S.trayT = at(tok, function () { quietReply(); }, wt(15000));
      }
      function quietReply() {
        if (S.phase !== 'quiet') return;
        const tok = ++S.token; hideTray(); fourSay(QUIET[2], true); ann(QUIET[3], '');
        at(tok, function () { lcdShow('12'); closeDoors(); }, wt(1000));
        at(tok, function () { lcdShow('-'); }, wt(2000));
        at(tok, function () {
          tg(ui.cab, 'warm', false); S.noMusic = false; S.awks = 0; paintAwks(); S.w8 = false; award(1, 'quiet ride');
          lcdShow(lcdOf(S.floorKey)); setDoors(true); S.phase = 'idle'; scheduleClose();
        }, wt(3200));
      }

      /* ----- the half button ----- */
      function pressHalf() {
        const ph = S.phase; S.halfWinked = true; tg(ui.btn.H, 'wink', false);
        if (ph === 'pressed' || ph === 'riding') { impatient(); return; }
        if (ph === 'quiet') return waitNote(ph);
        if (ph === 'ending' || ph === 'crack' || ph === 'inspect') return;
        if (ph === 'silence') { S.silenceBroken = true; return; }
        if (S.painted) { if (!S.paintSaid2) { S.paintSaid2 = true; ann(PAINT2, ''); } return; }
        if (ph === 'talk') ignoreTalk(true); else if (ph === 'stare') stareEnd('fail');
        if (S.armed) disarmLever(true);
        const tok = ++S.token; S.phase = 'pressed'; clearClose(); hideBubble(); hideTray(); tg(ui.fourEl, 'staring', false); S.eyeUsed = false; S.fourClicks = 0; S.phoneUsed = false;
        S.halfPresses++; bump('halfpresses'); const n = S.halfPresses;
        const hb = ui.btn.H; hb.style.setProperty('--halo', Math.min(12, n) + 'px'); hb.style.setProperty('--w', String(Math.min(1, n / 12)));
        if (S.rides >= 40 || n >= 25) tg(hb, 'sticker', true);
        api.sfx('whoosh'); api.sfx('tick'); litBtn('H', 900); lcdShow('7.5');
        if (n === 1) mgmt(HALF.first, { force: true, mood: 'confused' });
        else if (n === 5) mgmt(HALF.a5, { force: true, mood: 'proud' });
        else if (n === 12) mgmt(HALF.a12, { force: true, mood: 'proud', priority: 1 });
        else if (n === 25) mgmt(HALF.a25, { force: true, mood: 'smug' });
        updateNP();
        S.halfFlip = !S.halfFlip; const R = S.halfFlip ? '7' : '8';
        S.lastP = '7 1/2'; S.lastR = nm(R);
        at(tok, function () {
          ann(HALF.every, 'The elevator is rounding.');
          travel(tok, { from: S.floor, p: 7.5, r: FI[R][0], rKey: R, ms: rideMs(), crack: false, meta: { kind: 'half', P: null } });
        }, 90);
      }
      function nearMiss(R) {
        ach('near-miss');
        if (S.halfPresses - S.lastHalfAward >= 10) {
          S.lastHalfAward = S.halfPresses; award(3, 'near miss', true);
          return S.halfPresses === 1 ? fill(HALF.cert, { A: nm(R) }) : api.pick(HALF.near);
        }
        return HALF.every;
      }

      /* ----- lever and Zeno ----- */
      function armLever() {
        S.armed = true; S.phase = 'lever'; clearClose(); ui.lever.hidden = false; tg(ui.panel, 'dimfloors', sv.zeno.active);
        ui.lever.style.animation = 'none'; void ui.lever.offsetWidth; ui.lever.style.animation = '';
        ann(ZLEVER, sv.zeno.active ? 'The decimal is exactly where you left it.' : '');
        if (!S.leverSaid) { S.leverSaid = true; mgmt(ZLEVER, { force: true, mood: 'proud' }); }
        api.sfx('bell');
      }
      function disarmLever(announce) {
        if (!S.armed) return;
        S.armed = false; ui.lever.hidden = true; snap();
        if (announce && sv.zeno.active && sv.zeno.n > 0) mgmt(fill(ZABAND, { POS: String(zenoPos(sv.zeno)) }), { force: true, mood: 'confused' });
        tg(ui.panel, 'dimfloors', sv.zeno.active && S.beat >= 7 && !sv.ended);
        stopRepeat();
      }
      function zenoPos(z) {
        if (z.n >= 50) return 7.5;
        const gap = Math.pow(2, -(z.n + 1)); return z.from === 7 ? 7.5 - gap : 7.5 + gap;
      }
      function nudge(auto) {
        if (!S.armed || S.phase !== 'lever' || S.dead) return;
        const t = api.now(); if (t - S.lastNudge < 250 * TS) return; S.lastNudge = t;
        if (locked() || (auto && t < S.repPause)) return;
        const z = sv.zeno;
        if (!z.active) { z.active = true; z.from = S.floorKey === '8' ? 8 : 7; z.n = 0; }
        z.n++; const n = z.n, pos = zenoPos(z), gap = Math.abs(7.5 - pos);
        S.pos = pos; S.floor = pos; bump('nudges'); api.sfx('tick');
        award(n % 10 === 0 ? 0.5 : 0.1, 'nudge');
        const s = String(pos), d = s.indexOf('.') >= 0 ? s.split('.')[1].length : 0;
        api.stat.max('elevator-simulator.maxdigits', d);
        if (pos === 7.5) { persist(); return doEnding(); }
        lcdShow(s); paintShaft(pos);
        if (gap < sv.closest.gap) { sv.closest = { pos: pos, gap: gap }; paintBanner(); }
        if (gap <= 0.0001 && pos !== 7.5) ach('zeno');
        const gtxt = gap >= 0.0001 ? gap.toFixed(n + 1) : (n + 1) + ' decimal places', v = { POS: s, GAP: gtxt, D: n + 1, NEAR: z.from === 7 ? '7.4999' : '7.5001' };
        const line = ZMILE[n] ? fill(ZMILE[n], v) : fill(nextZ(), v);
        if (auto && (ZMILE[n] || n % 10 === 0)) S.repPause = t + 1800 * TS;
        if (!auto || ZMILE[n] || n % 3 === 0) ann(line, nextRound());
        if (d >= 12 && !S.disp12) { S.disp12 = true; mgmt(Z12, { force: true, mood: 'confused' }); }
        if (d >= 15 && !S.disp15) { S.disp15 = true; mgmt(Z15, { force: true, mood: 'panic' }); }
        if (n === 49) api.setTimeout(function () { mgmt(Z49, { force: true, mood: 'confused' }); }, wt(2600));
        checkNine(); tg(ui.panel, 'dimfloors', true); persist();
      }
      function snap() { ui.handle.style.transform = ''; tg(ui.handle, 'hot', false); S.drag = null; }
      function stopRepeat() { if (S.rep) { api.clearTimeout(S.rep.t); S.rep = null; } }
      function startRepeat() {
        stopRepeat(); const r = S.rep = { n: 0, t: 0 };
        const loop = function () { if (S.rep !== r || !S.armed) return stopRepeat(); nudge(true); r.n++; r.t = api.setTimeout(loop, (r.n > 10 ? 900 : 600) * TS); };
        r.t = api.setTimeout(loop, 600 * TS);
      }
      api.on(ui.nudge, 'pointerdown', function (e) { if (e.button > 0) return; nudge(); startRepeat(); });
      ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach(function (ev) { api.on(ui.nudge, ev, stopRepeat); });
      api.on(ui.nudge, 'click', function (e) { if (e.detail === 0) nudge(); });
      api.on(ui.handle, 'pointerdown', function (e) {
        if (!S.armed) return; S.drag = { y0: isFinite(e.clientY) ? e.clientY : 0 };
        try { ui.handle.setPointerCapture(e.pointerId); } catch (x) { /* synthetic pointer */ }
      });
      api.on(ui.handle, 'pointermove', function (e) {
        if (!S.drag || !isFinite(e.clientY)) return;
        const dy = clamp(S.drag.y0 - e.clientY, 0, 120);
        ui.handle.style.transform = 'translateY(' + (-dy) + 'px)'; tg(ui.handle, 'hot', dy >= 100);
        if (dy >= 100) { snap(); nudge(); }
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) { api.on(ui.handle, ev, snap); });

      /* ----- the not-ending ----- */
      function doEnding() {
        const tok = ++S.token; S.phase = 'ending'; S.armed = false; ui.lever.hidden = true; stopRepeat(); stopMusic(); hideTray(); clearClose();
        api.sfx('fanfare'); api.confetti(); lcdShow('7.5'); mgmt(END.a, { mood: 'proud', force: true, priority: 2 });
        ann(END.b, 'Display: 7.5'); api.setTimeout(function () { api.sfx('ding'); }, 500 * TS);
        at(tok, function () { mgmt(ZFLOAT, { force: true, mood: 'confused' }); }, wt(600));
        at(tok, function () {
          showVig('7', END.c); ui.vemo.textContent = '🗄️🧦'; setDoors(true);
          ann(END.sock, '');
          at(tok, function () { lcdShow('7'); }, wt(1000));
        }, wt(1200));
        at(tok, function () {
          fourSay(END.d, true);
          at(tok, function () { fourSay(END.e, true); at(tok, function () { procession(tok); }, wt(2400)); }, wt(1800));
        }, wt(2500));
      }
      function procession(tok) {
        const pr = [PROC.sock];
        if (api.stat.get('elevator-simulator.balloons') > 0) pr.push(PROC.balloon);
        if (S.cert || api.stat.get('elevator-simulator.inspections') > 0) pr.push(PROC.coat);
        if (S.geraldDone || api.flag.get('metGerald')) pr.push(PROC.gerald);
        if (api.flag.get('metStapler')) pr.push(PROC.stapler);
        if (api.flag.get('metDennis')) pr.push(PROC.dennis);
        if (sv.halfState === 1) pr.push(PROC.half);
        pr.push(PROC.tue);
        const go = function (i) {
          if (i >= pr.length) {
            showVig('7', END.c); ui.vemo.textContent = '🗄️🧦'; mgmt(BEATL[10], { force: true, mood: 'proud' });
            showTray('end', [['It was fine.']]); api.clearTimeout(S.trayT); S.trayT = at(tok, function () { endReply(); }, wt(20000)); return;
          }
          const e = pr[i];
          showVig('7', e[1]); ui.vemo.textContent = e[0]; ui.vsign.textContent = 'THE PROCESSION'; api.sfx(e === PROC.tue ? 'bell' : 'blip');
          if (e === PROC.half) { sv.halfState = 2; persist(); showHalf(false); award(5, 'whole person', true); ach('whole'); bump('wholes'); api.sfx('tada'); }
          at(tok, function () { go(i + 1); }, wt(e === PROC.half ? 4200 : 2800));
        };
        go(0);
      }
      function endReply() {
        if (S.phase !== 'ending' || S.endDone) return;
        S.endDone = true; const tok = S.token; hideTray();
        award(7.5, 'arrived', true); bump('arrivals'); api.flag.set('elevator-simulator.arrived', true); ach('arrived');
        sv.ended = true; sv.plaque = true; sv.zeno = { active: false, n: 0, from: 7 }; persist();
        mgmt(fill(END.g, { C: api.stat.get('elevator-simulator.doorclose') }), { force: true, mood: 'smug' });
        at(tok, function () { paintBanner(); mgmt(END.h, { force: true, mood: 'proud' }); showPlaques(); }, wt(1800));
        at(tok, function () { mgmt(END.i, { force: true, mood: 'proud' }); }, wt(3600));
        at(tok, function () { mgmt(END.m, { force: true, mood: 'proud', priority: 1 }); resetCab(); }, wt(5600));
      }
      function resetCab() {
        S.token++; S.phase = 'idle'; S.endDone = false; S.armed = false; S.awks = 0; S.beat = 8; S.extrasOn = false; S.tier = 1; S.nine = false; S.noMusic = false; S.silenceDue = false; S.w8 = false;
        S.pressed = {}; Object.keys(ui.btn).forEach(paintBadge); S.rides = 0; S.scripted = true; S.t0 = api.now();
        ui.xfl.hidden = true; EXTRA.forEach(function (k) { ui.btn[k].classList.add(C('hide')); }); ui.btn.GU.classList.remove(C('hide'));
        ui.lever.hidden = true; tg(ui.cab, 'warm', false); tg(ui.cab, 'dim', false); tg(ui.panel, 'dimfloors', false); tg(ui.fourEl, 'faded', false);
        paintAwks(); stopMusic(); S.floorKey = 'L'; S.floor = 0; S.prevKey = 'L';
        ui.npTitle.textContent = TIER[0][0]; ui.eq.childNodes.forEach(function (n) { n.style.animationDuration = '1.2s'; });
        showVig('L', WELCOME[0]); lcdShow('-'); setDoors(true); ann(WELCOME[0], WELCOME[1]);
        ui.lany.textContent = 'Visitor'; fourSay(END.k); mgmt(ZRETIRED, { force: true, mood: 'smug' }); paintBanner(); showPlaques();
        persist(); scheduleClose();
      }
      function showPlaques() {
        while (ui.plaque.children.length > 1) ui.plaque.removeChild(ui.plaque.lastChild);
        if (api.stat.get('elevator-simulator.doorclose') >= 50) ui.plaque.appendChild(h('span', { class: C('pq'), text: 'CLOSE' }));
        if (sv.typedSign) ui.plaque.appendChild(h('span', { class: C('frame'), text: '7.5' }));
        if (S.cert) ui.plaque.appendChild(h('span', { class: C('pq'), text: S.cert === 1 ? INSP.plq : EXP.plq }));
        if (sv.plaque) ui.plaque.appendChild(h('span', { class: C('pq'), title: 'Passenger of the moment', text: 'PASSENGER OF THE MOMENT: NOBODY' }));
        if (sv.ended) ui.plaque.appendChild(h('span', { class: C('pq'), title: 'The lever has been retired', text: 'LEVER' }));
      }

      /* ----- secondary buttons ----- */
      function doorOpen() {
        bump('dooropen'); const n = S.pressed.DO; api.sfx('blip');
        if (S.phase === 'idle') { setDoors(true); scheduleClose(); }
        if (n === 1) mgmt(DO_ONE, { force: true, mood: 'confused' }); else if (n === 11) mgmt(DO_11, { force: true, mood: 'proud' });
        else if (n === 30) mgmt(DO30, { force: true, mood: 'smug' });
        else if (annOk()) ann(fill(nextDOB(), { N: n }), '');
      }
      function doorClose() {
        bump('doorclose'); const n = S.pressed.DC, total = api.stat.get('elevator-simulator.doorclose'); api.sfx('blip');
        if (S.hold) { fourSay('Thanks.'); return; }
        let line = nextDC();
        if (api.flag.get('metStapler') && api.chance(0.12)) line = CB.stapler;
        if (n === 1) line = DC1; else if (n === 12) line = DC12; else if (n === 25) { line = DC25; ui.btn.DC.firstChild.textContent = 'Closeish'; }
        else if (total >= 50 && n === 50) line = DC50;
        else if (S.beat >= 6 && n % 4 === 0) line = DC6B;
        if (n === 1 || n === 12 || n === 25 || n === 50) mgmt(line, { force: true }); else if (annOk()) ann(line, '');
        if (total >= 50) { ach('door-close'); showPlaques(); }
      }
      function alarm() {
        bump('alarms'); const n = S.pressed.AL; api.sfx('bell');
        if (n === 1) mgmt(ALARM1, { force: true, mood: 'confused' }); else if (n === 5) mgmt(ALARM5, { force: true, mood: 'proud' }); else if (n === 10) mgmt(AL10, { force: true, mood: 'smug' });
        else if (annOk()) ann(fill(nextAL(), { N: n }), '');
      }

      /* ----- spam ladder ----- */
      function mash() {
        if (S.phase === 'ending') { waitNote('ending'); return false; }
        if (locked()) return false;
        const t = api.now();
        if (t - S.lastPress < 600 * TS && S.lastPress) S.mash++; else { S.mash = 1; S.fired = {}; S.surcharged = false; }
        S.lastPress = t;
        if (S.mash >= 10 && !S.fired[10] && !S.tired) {
          S.fired[10] = true; S.tired = true; tg(ui.panel, 'tired', true);
          mgmt(sp('f'), { force: true, mood: 'disappointed' }); api.sfx('sad');
          api.setTimeout(function () { S.tired = false; tg(ui.panel, 'tired', false); }, 6000 * TS);
          if (!S.surcharged) { S.surcharged = true; award(-1, 'Mash Surcharge', true); bump('surcharges'); api.setTimeout(function () { mgmt(sp('s'), { force: true }); }, 900 * TS); }
          S.pleaseRides = 3;
        }
        if (S.mash >= 17 && !S.fired[17]) { S.fired[17] = true; mgmt(sp('c'), { force: true, mood: 'confused' }); }
        if (S.mash >= 25 && !S.fired[25] && !S.painted) {
          S.fired[25] = true; S.painted = true; S.paintSaid = false; S.paintSaid2 = false; tg(ui.panel, 'wet', true);
          mgmt(sp('w'), { force: true, mood: 'confused' }); api.sfx('buzz'); S.pleaseRides = 3;
          const tk = S.token;
          S.paintT = api.setTimeout(function () { S.painted = false; tg(ui.panel, 'wet', false); void tk; }, (api.selftest ? 1000 : 8000));
        }
        if (S.mash >= 40 && !S.fired[40] && !S.detained) {
          S.fired[40] = true; S.detained = true; S.lockUntil = t + 3000 * TS; ui.cap.hidden = false;
          mgmt(sp('e'), { force: true, mood: 'panic', priority: 2 }); fourSay(sp('e4')); ach('spam'); api.sfx('error'); S.pleaseRides = 3;
          api.setTimeout(function () { S.detained = false; ui.cap.hidden = true; mgmt(sp('rel'), { force: true, mood: 'smug' }); }, 3000 * TS);
        }
        return true;
      }

      /* ----- idle, input, resize, keys ----- */
      function touch() {
        const was = S.idleN, secs = (api.now() - S.idleSince) / 1000 * (api.selftest ? 30 : 1); S.idleSince = api.now();
        if (S.phase === 'silence') S.silenceBroken = true;
        if (was > 0) {
          S.idleN = 0; S.idleDone = {}; S.idleLvl = 0; tg(ui.cab, 'dim', false);
          if (S.lcdBefore !== null) { lcdShow(S.lcdBefore); S.lcdBefore = null; }
          if (secs >= 90) {
            S.returns++;
            const back = secs >= 600 ? RET10 : S.returns === 1 ? IDLE.ret1 : S.returns === 2 ? IDLE.ret2 : (S.beat >= 3 && api.chance(0.4)) ? nextRetF() : nextRet();
            mgmt(back, { force: true, mood: 'smug' });
          }
        }
      }
      const IDLE_EV = [[20, 'w20', 0], [45, 'dim', 1], [70, 'w70', 1], [90, 'l90', 2], [120, 'w120', 2], [150, 'w150', 2], [180, 'l180', 3], [240, 'w240', 3], [300, 'l300', 4], [360, 'w360', 4], [420, 'mgr', 5], [540, 'w540', 5], [600, 'w600', 5]];
      function idleEvent(k) {
        bump('idleevents'); const F = sv.metFour;
        if (k === 'w20') mgmt(IDLEX.w20, { force: true });
        else if (k === 'dim') { tg(ui.cab, 'dim', true); S.lcdBefore = S.lcdLast || '-'; lcdShow('THINKING'); mgmt(IDLEX.dim, { force: true, mood: 'smug' }); }
        else if (k === 'w70') { if (F) fourSay(IDLEX.w70f); else mgmt(IDLEX.w70m, { force: true }); }
        else if (k === 'l90') { mgmt(IDLE.l90, { force: true, mood: 'confused' }); fourSay(IDLE.f90); }
        else if (k === 'w120') mgmt(IDLEX.w120, { force: true, mood: 'proud' });
        else if (k === 'w150') { if (F) fourSay(IDLEX.w150f); else mgmt(IDLEX.w150m, { force: true }); }
        else if (k === 'l180') { ui.clip.hidden = false; ach('silence-between'); award(1, 'silence between', true); mgmt(IDLE.l180, { force: true, mood: 'smug' }); }
        else if (k === 'w240') mgmt(IDLEX.w240, { force: true, mood: 'confused' });
        else if (k === 'l300') { startMusic(true); mgmt(IDLE.l300, { force: true, mood: 'neutral' }); }
        else if (k === 'w360') mgmt(IDLEX.w360 + String(api.line('ticker')).replace(/"/g, "'") + '"', { force: true, mood: 'neutral' });
        else if (k === 'mgr') { showVig('7', IDLE.mgr); setDoors(true); ann(IDLE.mgr, ''); mgmt(IDLE.mgr, { force: true, mood: 'smug' }); }
        else if (k === 'w540') mgmt(IDLEX.w540, { force: true, mood: 'confused' });
        else if (k === 'w600') { award(2, 'consulting role', true); mgmt(IDLEX.w600, { force: true, mood: 'proud', priority: 1 }); }
      }
      function endEvent() { if (S.armed) S.phase = 'lever'; else scheduleClose(); }
      function inspect() {
        if (S.cert) return;
        const tok = ++S.token, F = sv.metFour; S.phase = 'inspect'; S.cert = 1; S.inspSaid = false; clearClose(); hideBubble(); hideTray(); setDoors(true); bump('inspections');
        showVig('L', INSP.line); ui.vemo.textContent = '🔍'; ui.vsign.textContent = INSP.sign;
        mgmt(INSP.m1, { force: true, mood: 'confused', priority: 1 }); ann(INSP.line, ''); api.sfx('bell');
        at(tok, function () { ann(F ? INSP.a2f : INSP.a2, ''); if (api.flag.get('cloud-gazer.certified')) mgmt(CB.cloud, { force: true, mood: 'confused' }); }, wt(2800));
        at(tok, function () { if (F) fourSay(INSP.four); }, wt(5200));
        at(tok, function () { api.sfx('stamp'); award(1, 'inspection', true); showPlaques(); ann(INSP.m3, ''); mgmt(INSP_M3B, { force: true, mood: 'proud', priority: 1 }); }, wt(7800));
        at(tok, endEvent, wt(10800));
      }
      function expire() {
        if (S.cert !== 1) return;
        const tok = ++S.token; S.phase = 'inspect'; S.cert = 2; S.inspSaid = true; clearClose(); hideBubble(); hideTray(); bump('expiries'); api.flag.set('elevator-simulator.expired', true);
        tg(ui.cab, 'dim', true); lcdShow('--'); api.sfx('buzz'); mgmt(EXP.m1, { force: true, mood: 'panic', priority: 2 }); ann(EXP.m2, '');
        api.setTitle(EXP.title); ui.lany.textContent = EXP.lany; showPlaques(); paintBanner();
        at(tok, function () { tg(ui.cab, 'dim', false); lcdShow(lcdOf(S.floorKey)); api.sfx('ding'); award(2, 'expiry', true); if (sv.metFour) fourSay(EXP.four); }, wt(3000));
        at(tok, function () { S.dripAt = (api.now() - S.m0) / 1000 * (api.selftest ? 20 : 1) + 90; endEvent(); }, wt(6600));
      }
      function microTick() {
        const secs = (api.now() - S.m0) / 1000 * (api.selftest ? 20 : 1);
        let m = MICRO[S.microI];
        while (m && secs - m.t > 50 && !m.big) { S.microI++; m = MICRO[S.microI]; }
        if (m) {
          if (secs < m.t) return;
          S.microI++;
          if (m.x === 'INSPECT') return inspect();
          if (m.x === 'EXPIRE') return expire();
          if ((m.f && !sv.metFour) || (m.c && S.rides < 1)) return;
          mgmt(fill(m.x, { C: S.rides }), { force: true, mood: 'smug' });
        } else if (S.cert === 2 && secs >= S.dripAt) {
          S.dripAt = secs + 90; mgmt(fill(nextDrip(), { M: Math.floor(secs / 60) }), { force: true, mood: 'smug' });
        }
      }
      function idleTick() {
        S.ticks++;
        if (document.hidden) return;
        if (S.ticks % 60 === 0) { S.bannerI++; paintBanner(); }
        if (S.beat >= 5 && S.ticks % 12 === 0 && !sv.ended) { ui.signs.textContent = nextSign(); }
        if (['idle', 'lever'].indexOf(S.phase) < 0) return;
        if (S.idleLvl === 0) microTick();
        if (['idle', 'lever'].indexOf(S.phase) < 0) return;
        const secs = (api.now() - S.idleSince) / 1000 * (api.selftest ? 30 : 1);
        for (let i = 0; i < IDLE_EV.length; i++) {
          const ev = IDLE_EV[i];
          if (secs >= ev[0] && !S.idleDone[ev[1]]) { S.idleDone[ev[1]] = 1; S.idleN++; S.idleLvl = Math.max(S.idleLvl, ev[2]); idleEvent(ev[1]); break; }
        }
        if (S.idleLvl === 0 && !ui.clip.hidden) ui.clip.hidden = true;
      }
      function setSize() {
        const w = root.clientWidth || root.getBoundingClientRect().width;
        if (!w) return;
        tg(ui.wrap, 'narrow', w < 820);
        const tiny = w < 400;
        if (tiny !== S.wasTiny) {
          S.wasTiny = tiny; tg(ui.wrap, 'tiny', tiny); tg(ui.cab, 'tiny', tiny);
          const t = api.now(); S.resizeX = S.resizeX.filter(function (x) { return t - x < 10000 * Math.max(TS, 0.2); }); S.resizeX.push(t);
          if (S.resizeX.length >= 5) { mgmt(RESIZE.x5, { force: true, mood: 'confused' }); S.resizeX = []; }
          else mgmt(tiny ? RESIZE.tiny : RESIZE.back, { force: true, mood: tiny ? 'smug' : 'proud' });
        }
      }
      let ro = null, rsT = 0;
      function onResize() { api.clearTimeout(rsT); rsT = api.setTimeout(setSize, 200 * TS + 20); }
      try { if (window.ResizeObserver) { ro = new window.ResizeObserver(onResize); ro.observe(root); } } catch (e) { ro = null; }
      if (!ro) api.on(window, 'resize', onResize);

      function releaseAll() { holdEnd(); stopRepeat(); snap(); }
      api.on(root, 'pointerdown', touch); api.on(root, 'click', touch);
      api.on(document, 'keydown', function (e) { touch(); onKey(e); });
      api.on(document, 'keyup', function (e) { if (e.key === 'e' || e.key === 'E' || e.key === ' ' || e.code === 'Space') holdEnd(); });
      api.on(window, 'blur', releaseAll);
      api.on(document, 'visibilitychange', function () {
        if (document.hidden) { releaseAll(); S.hiddenAt = api.now(); }
        else if (S.hiddenAt) { const d = api.now() - S.hiddenAt; S.hiddenAt = 0; S.idleSince += d; S.m0 += d; S.t0 += d; }
      });
      api.on(ui.nudge, 'contextmenu', function (e) { e.preventDefault(); });
      api.on(ui.lcd, 'contextmenu', function (e) { e.preventDefault(); });
      function lcdPoke() {
        if (S.phase === 'stare' || !annOk()) return;
        const n = ++S.lcdPokes;
        if (LCDPOKE[n]) mgmt(LCDPOKE[n], { force: true, mood: 'confused' }); else if (n % 4 === 0) ann(nextLcd(), '');
      }
      api.on(ui.lcd, 'pointerdown', function (e) { if (e.button > 0) return; lcdPoke(); holdStart(); try { ui.lcd.setPointerCapture(e.pointerId); } catch (x) { /* synthetic */ } });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) { api.on(ui.lcd, ev, holdEnd); });
      api.on(ui.lcd, 'keydown', function (e) { if ((e.key === ' ' || e.code === 'Space') && !e.repeat) { e.preventDefault(); holdStart(); } });

      let typed = [];
      function onKey(e) {
        if (S.dead || !root.isConnected) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const tgt = e.target, tag = tgt && tgt.tagName ? String(tgt.tagName) : '';
        if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (tgt && tgt.isContentEditable)) return;
        const k = e.key, now = api.now();
        typed = typed.filter(function (x) { return now - x.t < 4000; });
        if (k === '5' && typed.length >= 2 && typed[typed.length - 1].ch === '.' && typed[typed.length - 2].ch === '7') { typed = []; typedSecret(); return; }
        typed.push({ ch: k, t: now }); if (typed.length > 4) typed.shift();
        if (e.repeat && k !== 'n' && k !== 'N') return;
        let id = null;
        if (e.shiftKey && e.code === 'Digit1') id = '11'; else if (e.shiftKey && e.code === 'Digit2') id = '12';
        else if (!e.shiftKey && /^[1-9]$/.test(k)) id = k; else if (!e.shiftKey && k === '0') id = '10';
        else if (k === '[') id = 'B1'; else if (k === ']') id = 'B2'; else if (k === 'l' || k === 'L') id = 'L'; else if (k === 'h' || k === 'H') id = 'H';
        else if (k === 'd' || k === 'D') id = 'DC';
        if (id && ui.btn[id] && !ui.btn[id].classList.contains(C('hide'))) { onPanel(id); return; }
        if (k === 't' || k === 'T') { if (S.trayMode && ui.tray.firstChild) onTray(0); return; }
        if (k === 'n' || k === 'N') { nudge(e.repeat); return; }
        if (k === 'e' || k === 'E') { holdStart(); }
      }
      function typedSecret() {
        if (sv.typedSign) { mgmt('The wall already says 7.5. The wall is not taking questions.', { force: true }); return; }
        sv.typedSign = true; persist(); showPlaques(); award(1, 'typed 7.5', true); ach('typed'); api.sfx('stamp');
        mgmt(TYPED, { force: true, mood: 'smug', priority: 1 }); ann(TYPED, '(Four says nothing. He looks at the sign. It is the first time.)');
      }

      /* ----- init ----- */
      paintBanner(); showPlaques(); lcdShow('READY'); paintAwks(); paintShaft(0); updateNP();
      ui.lany.textContent = nextLany();
      if (sv.ended) { ui.btn.GU.classList.remove(C('hide')); S.scripted = false; }
      if (S.beat >= 3) { ui.awks.hidden = false; ui.fourEl.classList.toggle(C('faded'), sv.ended); }
      if (sv.halfState === 1) showHalf(true);
      api.setInterval(idleTick, 1000);
      api.setTimeout(function () {
        setSize();
        ui.annMain.textContent = WELCOME[0];
        api.say(sv.ended ? END.n : (sv.totalRides > 0 ? 'Welcome back to the Elevator Simulator. The elevator has kept your ' + api.fmt(sv.totalRides) + ' rides on file. It has not read them.' : BEATL[1]), { mood: 'proud', priority: 1 });
        S.lastSay = api.now();
        api.setTimeout(function () { if (S.rides === 0 && S.phase === 'idle') ann(WELCOME[2], WELCOME[3]); }, 4000 * TS);
        api.setTimeout(function () { if (S.rides === 0 && S.phase === 'idle') ann(WELCOME[4], PLAQUE); }, 9000 * TS);
        api.setTimeout(function () {
          if (S.rides > 0 || S.phase !== 'idle' || S.eyeUsed || sv.metFour) return;
          tg(ui.fourEl, 'staring', true); api.setTimeout(function () { if (S.phase === 'idle') tg(ui.fourEl, 'staring', false); }, 2500 * TS);
          mgmt(WINK, { mood: 'confused', force: true });
        }, 5000 * TS);
        api.setTimeout(function () { if (S.rides === 0 && S.lcdLast === 'READY') lcdShow('-'); }, 10000 * TS);
        if (sv.totalRides === 0) { tg(ui.btn.H, 'wink', true); api.setTimeout(function () { tg(ui.btn.H, 'wink', false); }, 15000 * TS); }
      }, 600);

      return {
        destroy() {
          S.dead = true; S.hold = null; S.rep = null;
          try { if (ro) ro.disconnect(); } catch (e) { /* gone already */ }
          persist();
        }
      };
    }
  });
})();
