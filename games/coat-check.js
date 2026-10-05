/* POINTLESS module: coat-check */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`
.m-coat-check-room{position:relative;display:flex;flex-direction:column;gap:10px;padding:10px;min-height:420px;color:#2B2233;font:14px/1.35 system-ui,"Segoe UI",sans-serif;background-color:#FFF3D6;background-image:radial-gradient(rgba(43,34,51,.1) 1px,transparent 1.5px);background-size:14px 14px;border-radius:14px;overflow-x:hidden}
.m-coat-check-room *{box-sizing:border-box}.m-coat-check-room button{font:inherit;color:inherit;cursor:pointer;margin:0}.m-coat-check-room button:focus-visible{outline:3px solid #FF6F59;outline-offset:2px}.m-coat-check-room [hidden]{display:none!important}
.m-coat-check-wrap{display:flex;flex-direction:column;gap:10px}.m-coat-check-over{position:absolute;inset:0;pointer-events:none;z-index:40;overflow:hidden}
.m-coat-check-ghost{position:absolute;left:0;top:0;width:72px;padding:4px;text-align:center;font-size:11px;font-weight:700;background:#fff;border:3px solid #2B2233;border-radius:14px;box-shadow:4px 4px 0 #2B2233;opacity:.92;will-change:transform}.m-coat-check-ghost b{display:block;font-size:30px;line-height:1.1}
.m-coat-check-hstr{position:absolute;height:0;border-top:1px solid #2B2233;transform-origin:0 0}.m-coat-check-back{position:relative;min-height:64px;display:flex;align-items:stretch;border:3px solid #2B2233;border-radius:14px;overflow:hidden;background:#3a2f45;box-shadow:4px 4px 0 #2B2233}
.m-coat-check-glass{position:relative;flex:1;min-width:0;overflow:hidden;background:linear-gradient(135deg,rgba(183,156,237,.6),rgba(183,156,237,.25)),#2e2538;backdrop-filter:blur(3px);transition:filter .8s}
.m-coat-check-glass::before{content:"";position:absolute;inset:0;background:radial-gradient(rgba(255,255,255,.4) 1px,transparent 1.2px);background-size:5px 5px;opacity:.5;pointer-events:none}.m-coat-check-room:not(.m-coat-check-f-back) .m-coat-check-glass{filter:brightness(.4) saturate(.4)}
.m-coat-check-shade{position:absolute;bottom:15px;font-size:26px;filter:brightness(0) blur(1.5px) opacity(.7);animation:m-coat-check-shade1 7s ease-in-out infinite alternate;pointer-events:none}.m-coat-check-shade:nth-child(2n){animation-name:m-coat-check-shade2;animation-duration:9s}
.m-coat-check-busy{animation:m-coat-check-busy .6s ease-in-out 3!important}@keyframes m-coat-check-shade1{from{transform:translateX(-10px) rotate(-4deg)}to{transform:translateX(12px) rotate(5deg)}}@keyframes m-coat-check-shade2{from{transform:translate(8px,2px) rotate(5deg)}to{transform:translate(-12px,-3px) rotate(-3deg)}}
@keyframes m-coat-check-busy{50%{transform:translateY(-8px) rotate(10deg) scale(1.2)}}.m-coat-check-bcap{position:absolute;left:8px;right:8px;bottom:2px;font-size:11px;color:#fff;text-shadow:0 1px 2px #2B2233;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-coat-check-stop,.m-coat-check-selfsh{position:absolute;display:none;right:18%;bottom:14px;font-size:12px;font-weight:900;background:#fff;border:2px solid #C63D2F;color:#C63D2F;padding:0 6px;border-radius:4px;transform:rotate(-6deg)}
.m-coat-check-selfsh{right:auto;left:46%;font-size:16px;border:0;background:none;padding:0;transform:none}.m-coat-check-stopon .m-coat-check-stop,.m-coat-check-selfon .m-coat-check-selfsh{display:block}.m-coat-check-mini{position:absolute;right:8px;top:4px;display:none;font-size:11px}
.m-coat-check-f-recur .m-coat-check-mini{display:block}.m-coat-check-mbox{display:flex;align-items:flex-end;gap:2px;padding:2px 4px;background:rgba(255,243,214,.9);border:2px solid #2B2233;border-radius:6px;transform-origin:100% 0}.m-coat-check-mbox .m-coat-check-mbox{transform:scale(.7)}.m-coat-check-mlyle{font-size:15px}
.m-coat-check-mh{min-width:16px;min-height:16px;padding:0;background:#D9A441;border:2px solid #2B2233;border-radius:50%;font-size:10px;line-height:1}
.m-coat-check-clockbox{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px 8px;background:#FFF3D6;border-left:3px solid #2B2233;font-size:11px;font-weight:800}.m-coat-check-clock{position:relative;width:34px;height:34px;border:3px solid #2B2233;border-radius:50%;background:#fff}
.m-coat-check-clock i{position:absolute;left:50%;bottom:50%;width:2px;background:#2B2233;transform-origin:50% 100%}.m-coat-check-mhand{height:11px}.m-coat-check-shand{height:13px;width:1px!important;background:#C63D2F!important;animation:m-coat-check-spin 60s linear infinite}
@keyframes m-coat-check-spin{to{transform:rotate(360deg)}}.m-coat-check-banner{display:none;padding:6px 12px;background:#B79CED;border:3px solid #2B2233;border-radius:14px;box-shadow:4px 4px 0 #2B2233;font-weight:800;font-size:12px;letter-spacing:.03em}.m-coat-check-f-sandra .m-coat-check-banner{display:block}
.m-coat-check-grid{display:grid;grid-template-columns:22% minmax(0,1fr) 22%;gap:12px;align-items:start}.m-coat-check-narrow .m-coat-check-grid{grid-template-columns:minmax(0,1fr)}
.m-coat-check-narrow .m-coat-check-pilecol{order:1}.m-coat-check-narrow .m-coat-check-rackcol{order:2}.m-coat-check-narrow .m-coat-check-tickcol{order:3}.m-coat-check-col h3{margin:0 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase}
.m-coat-check-pile{display:flex;flex-wrap:wrap;gap:8px;min-height:84px;padding:8px;background:rgba(255,255,255,.45);border:3px dashed #A8693A;border-radius:14px}
.m-coat-check-chip{position:relative;width:76px;min-height:74px;padding:4px 3px;display:flex;flex-direction:column;align-items:center;gap:1px;background:#fff;border:3px solid var(--bc,#A8693A);border-radius:14px;box-shadow:3px 3px 0 #2B2233;cursor:grab!important;touch-action:none;-webkit-user-select:none;user-select:none;transform:rotate(var(--rot,0deg));transition:box-shadow .15s,translate .15s}
.m-coat-check-chip:hover{translate:0 -2px;box-shadow:3px 5px 0 #2B2233}.m-coat-check-sel{outline:4px solid #FF6F59;outline-offset:2px;background:#FFF9E8}
.m-coat-check-c-time{--bc:#7FD1AE}.m-coat-check-c-feeling{--bc:#FF6F59}.m-coat-check-c-corporate{--bc:#F2C14E}.m-coat-check-c-abstract,.m-coat-check-c-self,.m-coat-check-c-cameo{--bc:#B79CED}.m-coat-check-c-concept{opacity:.62;border-style:dashed}
.m-coat-check-em{display:inline-block;font-size:30px;line-height:1.1;filter:hue-rotate(calc(var(--hue,0)*1deg)) saturate(calc(1 + var(--d,0)*.04));transform:rotate(calc(var(--d,0)*4deg)) scaleX(var(--fx,1))}.m-coat-check-flip{--fx:-1}.m-coat-check-fz .m-coat-check-em{font-size:21px}
.m-coat-check-nm{max-width:68px;font-size:11px;font-weight:700;line-height:1.05;text-align:center;overflow:hidden;max-height:2.3em;word-break:break-word}.m-coat-check-now{max-width:68px;font-size:10px;line-height:1.05;text-align:center;opacity:.8;overflow:hidden;max-height:2.2em}
.m-coat-check-orb{position:absolute;top:3px;right:3px;font-size:12px;animation:m-coat-check-orbit 3s linear infinite}@keyframes m-coat-check-orbit{from{transform:rotate(0) translateX(7px) rotate(0)}to{transform:rotate(360deg) translateX(7px) rotate(-360deg)}}
.m-coat-check-stamp{position:absolute;left:-6px;right:-6px;bottom:14px;padding:0 2px;text-align:center;font-size:8px;font-weight:900;line-height:1.1;color:#C63D2F;border:2px solid #C63D2F;border-radius:4px;background:rgba(255,255,255,.85);transform:rotate(-12deg);pointer-events:none}
.m-coat-check-fresh .m-coat-check-stamp{animation:m-coat-check-slam .45s ease-out}@keyframes m-coat-check-slam{from{transform:rotate(-12deg) scale(2.2);opacity:0}to{transform:rotate(-12deg) scale(1);opacity:1}}
.m-coat-check-pbtn{margin-top:6px;min-height:36px;padding:4px 12px;font-weight:800;background:#F2C14E;border:3px solid #2B2233;border-radius:12px;box-shadow:3px 3px 0 #2B2233}.m-coat-check-plist{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;max-height:150px;overflow:auto;padding:4px}
.m-coat-check-hint{margin:8px 0 0;font-size:12px;opacity:.75}.m-coat-check-rack{position:relative;display:flex;align-items:stretch;min-height:300px;background:linear-gradient(#FFFBEF,#FFF3D6);border:3px solid #2B2233;border-radius:14px;box-shadow:4px 4px 0 #2B2233;overflow:hidden}
.m-coat-check-scroll{position:relative;flex:1;min-width:0;overflow-x:auto;overflow-y:hidden}.m-coat-check-rackin{position:relative;height:300px;min-width:100%}.m-coat-check-rail{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}.m-coat-check-path{fill:none;stroke:#D9A441;stroke-width:8;stroke-linecap:round}
.m-coat-check-path2{fill:none;stroke:rgba(255,255,255,.55);stroke-width:2;stroke-linecap:round}
.m-coat-check-hook{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;padding:0;border-radius:50%;font-size:10px;font-weight:900;line-height:1;background:radial-gradient(circle at 35% 30%,#F6DC8B,#D9A441 60%,#9C7220);border:2px solid #2B2233;transition:left .6s,top .6s,transform .2s}
.m-coat-check-near{transform:scale(1.3) rotate(8deg);box-shadow:0 0 0 4px rgba(127,209,174,.65)}.m-coat-check-nearest{box-shadow:0 0 0 5px #7FD1AE}.m-coat-check-ring{box-shadow:0 0 0 4px #FF6F59}.m-coat-check-hl{box-shadow:0 0 0 5px #F2C14E,0 0 14px #F2C14E}
.m-coat-check-drill{animation:m-coat-check-drill .7s cubic-bezier(.3,1.4,.5,1)}@keyframes m-coat-check-drill{from{transform:translateY(-70px);opacity:0}to{transform:none;opacity:1}}
.m-coat-check-ghosthook{position:absolute;width:30px;height:26px;margin:-13px 0 0 -15px;padding:0;opacity:.18;font-size:10px;background:#D9A441;border:2px dashed #2B2233;border-radius:50%}.m-coat-check-ghosthook:hover,.m-coat-check-ghosthook:focus-visible{opacity:.8}
.m-coat-check-dust{position:absolute;width:8px;height:8px;border-radius:50%;background:#e8d9b5;animation:m-coat-check-dust .9s ease-out forwards;pointer-events:none}@keyframes m-coat-check-dust{to{transform:translate(var(--dx,0),30px) scale(2);opacity:0}}
.m-coat-check-hsign{position:absolute;top:2px;left:50%;max-width:70%;padding:3px 8px;background:#fff;border:2px solid #2B2233;border-radius:6px;font-size:10px;font-weight:900;text-align:center;transform:translateX(-50%) rotate(-2deg);display:none;z-index:6}
.m-coat-check-hsign.m-coat-check-on{display:block;animation:m-coat-check-drill .5s ease-out}.m-coat-check-hung{position:absolute;width:52px;padding:0;display:block;background:none;border:0;transition:left .6s,top .6s,opacity .4s}
.m-coat-check-pend{display:flex;flex-direction:column;align-items:center;transform-origin:50% 0;animation:m-coat-check-sway var(--sd,4s) ease-in-out var(--dl,0s) infinite alternate}@keyframes m-coat-check-sway{from{transform:rotate(calc(var(--sw,5)*-1deg))}to{transform:rotate(calc(var(--sw,5)*1deg))}}
.m-coat-check-str{width:1px;height:18px;background:#2B2233;transform-origin:50% 0}.m-coat-check-snap .m-coat-check-str{animation:m-coat-check-snap .15s ease-out}@keyframes m-coat-check-snap{from{transform:scaleY(.5)}to{transform:none}}
.m-coat-check-hb{display:flex;flex-direction:column;align-items:center;padding:2px;min-width:46px;background:#fff;border:2px solid var(--bc,#A8693A);border-radius:10px;box-shadow:2px 2px 0 #2B2233}.m-coat-check-hb .m-coat-check-em{font-size:24px}.m-coat-check-hb .m-coat-check-nm{font-size:10px;max-width:50px;max-height:2.1em}
.m-coat-check-hung.m-coat-check-sel .m-coat-check-hb{outline:3px solid #FF6F59;outline-offset:1px}.m-coat-check-lk{margin-top:2px;padding:0 5px;font-size:10px;font-weight:800;font-style:normal;background:#7FD1AE;border:1px solid #2B2233;border-radius:8px}
.m-coat-check-yel{background:#F2C14E}.m-coat-check-unpub{background:#eee;font-style:italic}.m-coat-check-flag{position:absolute;top:14px;left:-6px;padding:0 3px;font-size:10px;font-weight:900;color:#fff;background:#FF6F59;border:1px solid #2B2233;border-radius:3px;transform:rotate(-10deg)}
.m-coat-check-jerk .m-coat-check-pend{animation:m-coat-check-jerk .2s linear 1}@keyframes m-coat-check-jerk{50%{transform:rotate(2deg)}}.m-coat-check-committee .m-coat-check-pend{transform:rotate(var(--tilt,0deg))}.m-coat-check-gone{opacity:0;pointer-events:none}
.m-coat-check-curtain{position:absolute;top:0;bottom:0;display:none;background:repeating-linear-gradient(90deg,#7A2E3B 0 8px,#8d3a49 8px 16px);border-left:3px solid #2B2233;border-right:3px solid #2B2233;z-index:5;pointer-events:none}.m-coat-check-f-conv .m-coat-check-curtain{display:block}
.m-coat-check-dennis{position:relative;display:none;flex-direction:column;align-items:center;justify-content:flex-end;width:58px;padding:2px;background:linear-gradient(transparent 55%,#C96F3B 55%);border:0;border-right:3px solid #2B2233;font-size:26px;z-index:3}.m-coat-check-dennis small{font-size:9px;font-weight:800;color:#fff}
.m-coat-check-f-conv .m-coat-check-dennis{display:flex}.m-coat-check-hatchbox{position:relative;width:104px;flex:none;display:flex;flex-direction:column;justify-content:flex-end;padding:6px;background:linear-gradient(#A8693A,#7C4A24);border-left:3px solid #2B2233}
.m-coat-check-hatch{position:relative;height:130px;width:100%;padding:0;overflow:hidden;background:#FFF3D6;border:3px solid #D9A441;border-radius:10px 10px 4px 4px;box-shadow:inset 0 0 0 2px #2B2233;display:flex;align-items:flex-end;justify-content:center}
.m-coat-check-hatch small{position:absolute;bottom:2px;left:0;right:0;font-size:9px;font-weight:900;letter-spacing:.1em;color:#7C4A24}.m-coat-check-lyle{position:absolute;left:50%;top:2px;font-size:46px;transform:translateX(-50%);transition:transform .5s,opacity .4s}
.m-coat-check-asleep .m-coat-check-lyle{transform:translateX(-50%) rotate(14deg) translateY(6px)}.m-coat-check-asleep .m-coat-check-lyle::after{content:"z";position:absolute;right:-10px;top:-6px;font-size:14px;font-weight:900}.m-coat-check-away .m-coat-check-lyle{transform:translate(-50%,90px);opacity:0}
.m-coat-check-door{position:absolute;left:0;right:0;bottom:0;height:46%;background:linear-gradient(#C48552,#A8693A);border-top:3px solid #2B2233;transform-origin:50% 100%;transition:transform .35s;z-index:2}.m-coat-check-open .m-coat-check-door{transform:rotateX(75deg)}
.m-coat-check-shut .m-coat-check-hatch{background:#7C4A24}.m-coat-check-shut .m-coat-check-door{height:100%;border-top:0}.m-coat-check-hand{position:absolute;right:-30px;bottom:34px;font-size:30px;opacity:0;z-index:3;filter:drop-shadow(-14px 0 0 #7A2E3B)}
.m-coat-check-open .m-coat-check-hand{animation:m-coat-check-hand .8s ease-in-out}@keyframes m-coat-check-hand{0%{opacity:0;right:-30px}30%,70%{opacity:1;right:30px}100%{opacity:0;right:-30px}}
.m-coat-check-bubbles{position:absolute;left:-10px;top:auto;bottom:6px;width:96px;display:flex;flex-direction:column;gap:3px;z-index:7;pointer-events:none;transform:translateX(-100%)}
.m-coat-check-bubble{padding:3px 6px;font-size:10px;line-height:1.15;background:#fff;border:2px solid #2B2233;border-radius:8px;animation:m-coat-check-drill .3s ease-out}
.m-coat-check-rsign{display:none;margin-top:6px;padding:4px;text-align:center;font:700 11px/1.2 "Segoe Print","Bradley Hand",cursive;color:#fff;background:#FF6F59;border:2px solid #2B2233;border-radius:6px;transform:rotate(-3deg);animation:m-coat-check-sway 1.2s ease-in-out infinite alternate;--sw:4}
.m-coat-check-shut .m-coat-check-rsign{display:block}.m-coat-check-ticket{padding:8px;background:#FBF5E6;border:3px solid #2B2233;border-radius:14px;box-shadow:4px 4px 0 #2B2233;perspective:400px}
.m-coat-check-thead{display:flex;flex-wrap:wrap;gap:4px;align-items:baseline;font:700 11px ui-monospace,Consolas,monospace;letter-spacing:.06em}.m-coat-check-tno{font:900 18px ui-monospace,Consolas,monospace;color:#C63D2F;overflow-wrap:anywhere;text-shadow:1px 0 0 rgba(198,61,47,.35)}
.m-coat-check-tlen{display:block;margin:2px 0 6px;font:11px ui-monospace,Consolas,monospace;opacity:.7}.m-coat-check-stubs{display:flex;flex-direction:column;gap:4px;max-height:420px;overflow:hidden}
.m-coat-check-f-over .m-coat-check-stubs{column-count:2;display:block;transform:rotateX(8deg);transform-origin:50% 100%;box-shadow:0 12px 12px -12px rgba(43,34,51,.5)}.m-coat-check-f-over .m-coat-check-stub{break-inside:avoid;margin-bottom:4px}
.m-coat-check-stub{position:relative;display:flex;align-items:center;gap:4px;padding:3px 4px 3px 12px;font:11px/1.2 ui-monospace,Consolas,monospace;background:#fff;border:1px solid #2B2233;border-radius:3px;touch-action:none;transition:transform .2s;background-image:radial-gradient(circle,#FBF5E6 2px,transparent 2.5px);background-size:8px 8px;background-position:-4px 0;background-repeat:repeat-y}
.m-coat-check-stubtxt{flex:1;min-width:0;padding:2px;text-align:left;background:none;border:0;text-shadow:1px 0 0 rgba(198,61,47,.4);overflow-wrap:anywhere}.m-coat-check-stubtxt:hover{background:#FFF3D6}
.m-coat-check-tear{padding:2px 6px;font-size:10px;font-weight:900;color:#fff;background:#FF6F59;border:2px solid #2B2233;border-radius:4px}.m-coat-check-torn{opacity:.5;background:#ddd;clip-path:polygon(0 0,100% 0,96% 25%,100% 50%,95% 75%,100% 100%,0 100%)}.m-coat-check-torn .m-coat-check-tear{display:none}
.m-coat-check-w2{padding-left:12px;border-style:double;border-width:3px}.m-coat-check-arch{display:none;margin-top:6px;min-height:34px;padding:2px 8px;font-size:11px;font-weight:800;background:#F2C14E;border:2px solid #2B2233;border-radius:8px}.m-coat-check-f-over .m-coat-check-arch{display:inline-block}
.m-coat-check-archl{margin-top:4px;font:10px/1.3 ui-monospace,Consolas,monospace;max-height:140px;overflow:auto}.m-coat-check-foot{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end}.m-coat-check-narrow .m-coat-check-foot{grid-template-columns:minmax(0,1fr)}
.m-coat-check-meter{display:none;grid-column:1/-1;padding:8px 10px;background:#fff;border:3px solid #2B2233;border-radius:14px;box-shadow:4px 4px 0 #2B2233}.m-coat-check-f-meter .m-coat-check-meter{display:block}
.m-coat-check-mtop{display:flex;justify-content:space-between;gap:8px;align-items:baseline;font-size:12px;font-weight:800}.m-coat-check-mval{font:900 20px ui-monospace,Consolas,monospace;position:relative}
.m-coat-check-ruler{position:relative;height:16px;margin:8px 0 6px;border:2px solid #2B2233;border-radius:4px;background:repeating-linear-gradient(90deg,rgba(43,34,51,.35) 0 1px,transparent 1px 1%),#FFF3D6}.m-coat-check-mfill{position:absolute;left:0;top:0;bottom:0;background:#7FD1AE;transition:width 1.2s}
.m-coat-check-mneedle{position:absolute;top:-8px;width:0;height:0;margin-left:-6px;border:6px solid transparent;border-top:9px solid #C63D2F;transition:left 1.2s}.m-coat-check-hundred{position:absolute;right:0;top:-3px;bottom:-3px;border-right:2px dashed #C63D2F}
.m-coat-check-hundred::after{content:"100 not available";position:absolute;right:4px;top:-12px;font-size:10px;font-weight:800;color:#C63D2F;white-space:nowrap}.m-coat-check-mcap{display:block;font-size:12px;font-style:italic;min-height:2.6em}
.m-coat-check-gold{position:absolute;right:0;top:-4px;display:none;padding:0 8px;font:900 20px ui-monospace,Consolas,monospace;color:#7C4A24;background:#F2C14E;border:2px solid #2B2233;border-radius:6px;animation:m-coat-check-slam .4s ease-out}.m-coat-check-gold.m-coat-check-on{display:block}.m-coat-check-medal{font-size:16px}
.m-coat-check-tray{padding:8px;background:#A8693A;background-image:linear-gradient(rgba(255,255,255,.18),transparent);border:3px solid #2B2233;border-radius:14px;box-shadow:4px 4px 0 #2B2233;color:#fff}.m-coat-check-tray h3{margin:0 0 6px;font-size:12px;letter-spacing:.12em}
.m-coat-check-trayrow{display:flex;flex-wrap:wrap;gap:8px;min-height:80px}.m-coat-check-tempty .m-coat-check-trayrow{min-height:36px}.m-coat-check-tempty h3,.m-coat-check-tempty .m-coat-check-mat,.m-coat-check-tempty [data-act=home]{display:none}.m-coat-check-room:not(.m-coat-check-f-meter) .m-coat-check-rack{min-height:230px}.m-coat-check-room:not(.m-coat-check-f-meter) .m-coat-check-rackin{height:230px}.m-coat-check-trayrow .m-coat-check-chip{color:#2B2233}.m-coat-check-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.m-coat-check-btn{min-height:40px;padding:6px 14px;font-weight:900;background:#F2C14E;border:3px solid #2B2233;border-radius:12px;box-shadow:3px 3px 0 #2B2233;color:#2B2233!important}.m-coat-check-btn:active{transform:translate(3px,3px);box-shadow:0 0 0 #2B2233}
.m-coat-check-mat{padding:10px 14px;font-size:11px;font-weight:900;letter-spacing:.1em;color:#2B2233;background:repeating-linear-gradient(45deg,#7FD1AE 0 8px,#68b998 8px 16px);border:3px dashed #2B2233;border-radius:8px}.m-coat-check-side{display:flex;flex-direction:column;gap:10px;align-items:center}
.m-coat-check-mq{position:relative;display:none;width:150px;height:250px}.m-coat-check-f-mann .m-coat-check-mq{display:block}.m-coat-check-fig{position:absolute;inset:0;pointer-events:none}.m-coat-check-fig i{position:absolute;background:#e9d8b8;border:3px solid #2B2233}
.m-coat-check-mhead{left:55px;top:6px;width:40px;height:40px;border-radius:50%}.m-coat-check-mneck{left:68px;top:46px;width:14px;height:14px}.m-coat-check-mtorso{left:40px;top:58px;width:70px;height:110px;border-radius:14px 14px 6px 6px}
.m-coat-check-marm1{left:22px;top:62px;width:16px;height:90px;border-radius:8px;transform:rotate(8deg)}.m-coat-check-marm2{left:112px;top:62px;width:16px;height:90px;border-radius:8px;transform:rotate(-8deg)}.m-coat-check-mpole{left:70px;top:168px;width:10px;height:78px;background:#7C4A24!important}
.m-coat-check-mqbtn{position:absolute;inset:0;background:none;border:0;border-radius:14px}.m-coat-check-mqbtn:hover{background:rgba(127,209,174,.2)}.m-coat-check-slots{position:absolute;inset:0}.m-coat-check-slots .m-coat-check-chip{position:absolute;width:56px;min-height:0;padding:2px;box-shadow:2px 2px 0 #2B2233}
.m-coat-check-slots .m-coat-check-em{font-size:22px}.m-coat-check-slots .m-coat-check-nm,.m-coat-check-slots .m-coat-check-now{display:none}.m-coat-check-aura{animation:m-coat-check-orbit2 6s linear infinite;animation-delay:var(--ad,0s)}
@keyframes m-coat-check-orbit2{from{transform:rotate(0) translateX(6px) rotate(0)}to{transform:rotate(360deg) translateX(6px) rotate(-360deg)}}.m-coat-check-jar,.m-coat-check-bell{width:56px;height:56px;padding:0;font-size:28px;background:#F2C14E;border:3px solid #2B2233;border-radius:50%;box-shadow:3px 3px 0 #2B2233}
.m-coat-check-bell:active,.m-coat-check-jar:active{transform:translate(3px,3px);box-shadow:none}.m-coat-check-jar::after{content:"TIPS";position:absolute;font-size:8px;font-weight:900}.m-coat-check-lyt{display:none}.m-coat-check-f-lyt .m-coat-check-lyt{display:inline-block}
.m-coat-check-cap{margin:0;min-height:2.6em;padding:6px 10px;font-weight:700;background:#fff;border:2px dashed #2B2233;border-radius:10px}.m-coat-check-small{opacity:.7;font-size:11px}.m-coat-check-shake{animation:m-coat-check-shake .3s linear}.m-coat-check-rattle .m-coat-check-rackin{animation:m-coat-check-shake .4s linear}
@keyframes m-coat-check-shake{25%{transform:translate(-3px,1px)}50%{transform:translate(3px,-1px)}75%{transform:translate(-2px,0)}}.m-coat-check-wipe .m-coat-check-rack{animation:m-coat-check-wipe .8s ease-out}@keyframes m-coat-check-wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}
.m-coat-check-rm *,.m-coat-check-rm *::before,.m-coat-check-rm *::after{animation:none!important;transition:none!important}@media (prefers-reduced-motion:reduce){.m-coat-check-room *{animation:none!important;transition:none!important}}
@media (pointer:coarse){.m-coat-check-room button{min-width:44px;min-height:44px}.m-coat-check-hook{min-width:34px;min-height:34px}.m-coat-check-tear{min-height:40px}.m-coat-check-chip{width:80px}.m-coat-check-chip,.m-coat-check-stub{touch-action:pan-y}.m-coat-check-room .m-coat-check-hook{margin:-22px 0 0 -22px}.m-coat-check-room .m-coat-check-ghosthook{margin:-22px 0 0 -22px}.m-coat-check-room .m-coat-check-mh{min-width:16px;min-height:16px}}@media (max-width:420px){.m-coat-check-room{padding:6px;gap:8px}.m-coat-check-hatchbox{width:84px}.m-coat-check-dennis{width:44px}}
.m-coat-check-narrow .m-coat-check-rack{flex-wrap:wrap}.m-coat-check-narrow .m-coat-check-scroll{flex:1 1 100%;order:1}.m-coat-check-narrow .m-coat-check-hatchbox{order:3;flex:1 1 0;width:auto;flex-direction:row;align-items:flex-end;justify-content:center;gap:10px;border-left:0;border-top:3px solid #2B2233;padding:6px 10px}.m-coat-check-narrow .m-coat-check-hatch{width:110px;height:100px;flex:none}.m-coat-check-narrow .m-coat-check-dennis{order:2;height:100px;align-self:flex-end;border-right:0;border-top:3px solid #2B2233}.m-coat-check-narrow .m-coat-check-rsign{margin:0;align-self:center}.m-coat-check-narrow .m-coat-check-rack{min-height:0}.m-coat-check-narrow .m-coat-check-rackin{height:250px}
`, 'css-coat-check');
  P.addAchievements([
    { id: 'coat-check.first', name: 'Grand Custodian of the Hallowed Hook', desc: 'Hang your first item on the rack. It was always going to be a coat. It was always going to be Hook 1.', icon: '🧥', reward: 1 },
    { id: 'coat-check.slight', name: 'Archduke of Slight Differences', desc: 'Retrieve 10 items and notice that every single one is slightly different. Management would like to say you noticed.', icon: '🔖', reward: 3, check: function (s) { return (s['coat-check.retrieved'] || 0) >= 10; } },
    { id: 'coat-check.technically', name: 'Supreme Sovereign of the Technically-Yours Decree', desc: 'Re-check the same item until its drift reaches depth 7. It is technically still yours. It is technically still an item.', icon: '📜', reward: 4, check: function (s) { return (s['coat-check.drift-max'] || 0) >= 7; } },
    { id: 'coat-check.ticket', name: 'Perpetual Patron of the Unending Ticket', desc: 'Accumulate 40 stubs on one ticket. The denominator remains 7 1/2 in recognition of tradition.', icon: '🎫', reward: 4 },
    { id: 'coat-check.fusion', name: 'Matchmaker Royal to the Couple on Hook', desc: 'Let two items share a hook until they become a portmanteau. Congratulations to the couple.', icon: '🎈', reward: 3 },
    { id: 'coat-check.wear', name: 'Wearer of the Tuesday', desc: 'Wear something that was never meant to be worn. It suits you. It suits everyone.', icon: '📅', reward: 3 },
    { id: 'coat-check.concept', name: 'Thinker of The Coat, Idea Of', desc: 'Drift an item past depth 12 until it becomes the idea of itself.', icon: '💭', reward: 3 },
    { id: 'coat-check.handback', name: 'Retrieved, First Class', desc: 'Complete the Coat Check. The Coat Check has not completed you.', icon: '🏅', reward: 5 },
    { id: 'coat-check.lyle', name: "Keeper of Lyle's Ticket", desc: "Hold Lyle's ticket for his Tuesday. He did not say why. You did not ask.", icon: '👴', reward: 4 },
    { id: 'coat-check.self', name: 'Lord High Chamberlain of Everything Having Been Checked', desc: 'SECRET: Check yourself. You were retrieved. You are 2 percent more coat. This is a measurement, not a review.', icon: '🙂', secret: true, reward: 6 },
    { id: 'coat-check.surcharge', name: 'Most Serene Sultan of Surcharges', desc: 'SECRET: Trigger the Rush and pay a surcharge of 3 Meh. Lyle breathed into a bag for you.', icon: '💨', secret: true, reward: 3 },
    { id: 'coat-check.gerald', name: 'Bearer of the Very Serious Coat', desc: 'SECRET: Retrieve the wrong coat. It was the right coat for a potato.', icon: '🥔', secret: true, reward: 4 },
    { id: 'coat-check.half', name: 'Half-Hanger Extraordinary', desc: 'SECRET: Hang something on Hook 7 1/2. The hook was not there. The item was.', icon: '⭐', secret: true, reward: 5 },
    { id: 'coat-check.stayed', name: 'Patience of the Coat Rack', desc: 'SECRET: Idle until the counter slides you a ticket for the one who stayed.', icon: '🕰', secret: true, reward: 12 },
    { id: 'coat-check.feeling', name: 'One of You Has Had a Feeling', desc: 'SECRET: Tip the jar 20 times. We will not say which of you.', icon: '🍯', secret: true, reward: 3 },
    { id: 'coat-check.stop', name: 'Moved By the Building', desc: 'SECRET: Resize the window five times. A shadow holds up a sign.', icon: '👤', secret: true, reward: 3 },
    { id: 'coat-check.beginning', name: 'Chronicler of the Ending (It Is the Beginning)', desc: 'SECRET: Check The Ending. It came back slightly different.', icon: '🎫', secret: true, reward: 5 },
    { id: 'coat-check.empty', name: 'Eternal Hierophant of the Hatch, Which Was Empty, Seven Times Running (Not Counting the Pause)', desc: 'SECRET: Ask the hatch for something seven times with nothing on the rack. It answered every time. It said the same thing, differently.', icon: '🔔', secret: true, reward: 20 },
    { id: 'coat-check.five', name: "Sole Witness of the Brief and Terrible Five O'Clock", desc: 'SECRET: Be present when the clock reaches closing time. It lasts under two seconds. Lyle reached for a coat he does not have.', icon: '🕰', secret: true, reward: 15 }
  ]);
  const LN = {};
  const add = function (name, arr) { LN[name] = arr; P.addLines('m:coat-check:' + name, arr); };
  add('openm', ['Welcome to the Coat Check, {player}. Everything you leave here comes back. We have not said as what.',
    'Ticket No. 0001 (Provisional) has printed itself. Provisional is Permanent that has not yet made up its mind.'
  ]);
  add('openl', ["Afternoon. You've brought a coat. I know because it's the only thing on the pile. Any hook. They're all the same hook. (They aren't.)", 'Take your time. I have a pencil behind each ear and a third for emergencies. This is not an emergency.', 'Is it a coat? Say it is a coat. It makes the form shorter.',
    'Nobody is behind you. I check. Nobody has been behind you since 1994.', "The hooks are the brass circles. I'm told this is not obvious. I'm told by the hooks."
  ]);
  add('againm', ['Welcome to your first visit. Again.', 'Ticket No. 0001 has been reprinted. The denominator has been quietly adjusted. We do not discuss the denominator.',
    "Your previous visit has been filed under 'Previous'. It is a thin file. It is a thick coat.", 'Counter 7 1/2 is open. It was never closed. It was merely Next.'
  ]);
  add('backm', ['Welcome back. Your coat has been waiting. It went to a conference and hasn\'t stopped talking about it.', 'Welcome back. The rack remembers everyone. It is not a compliment. It is a rack.'
  ]);
  add('hang', ["{item}. Hook {count}. It's a good hook. The one next to it is a better hook, and knows it.", 'Hung. {item} swings once, for the form, and then a little more, for itself.',
    "We take {item} at the owner's risk. The owner is you. The risk is mostly Thursday, and Thursday has been informed.", "That's {item} between two others. They haven't been introduced. I'm not going to do it.",
    '{item} received. Condition on arrival: hopeful.', "Hook {count} has accepted the weight and also, quietly, the idea.", "Another one on the rail. Per policy the rack isn't full. Per physics it's leaning.",
    "I once hung a Wednesday. It lasted until Thursday and then simply was.", "Hung. The hook says nothing. It's been trained.", "{item} on {count}. The ticket will say so. The ticket will also say a few things I didn't.",
    "Right. {item}, hook {count}. I'll remember it. I won't, but the pencil will.", "Good weight. Not great weight. Weight with ambitions.", "Hook {count} looked a bit bare. It's less bare now. It's bare-adjacent."
  ]);
  const HANGITEM = {
    'Coat': "One coat, on a hook. This is the only time it will be exactly this coat. Enjoy it. I'm enjoying it for both of us.", 'Umbrella': "Umbrella. Hung. It has never been opened indoors. It would like that on its ticket.",
    'A Tuesday': "A Tuesday. Heaviest thing on the rack. Weighs nothing. Don't ask me how.", 'A Vague Unease': 'A Vague Unease. Hung. It has been hung before, and not by us.',
    'The Concept of Q3': "The Concept of Q3. The rack's down eleven millimetres. We have a form for sag. It's eleven millimetres long.",
    'Your Posture': "Your Posture. The rack is standing up straighter. The rack is showing off.", '4:17 PM': "4:17 PM. Everything on the rack ticked once. I can't say why. I can say when.",
    'The Third Ficus (Partial)': "The Third Ficus, partial. The other two are fine. They don't want to talk about it.", 'The Sound of a Meeting': 'The Sound of a Meeting. Quiet now. Also, somehow, still going.',
    'Momentum': "Momentum. It wants to be somewhere else. It's holding still. For you.", 'Your Passport Photo Face': 'Your Passport Photo Face. Exactly as unimpressed as the original.',
    'A Surprise Pocket': "A Surprise Pocket. Wasn't a surprise to me. It was a surprise to the pocket.", 'Scarf (Long)': "A Scarf, long. I'll need the other end. Everyone says the other end is with them. It never is.",
    'Left Glove (Right Hand)': "Left Glove, Right Hand. It's trying its best. So is the hand.", 'One (1) Sigh': "One sigh. Hung. It sounds better on a hook. Sighs usually do.",
    'A Mild Disagreement': "A Mild Disagreement. Hung, politely. It'll want to be on the left of the other one.", 'Leftover Enthusiasm': "Leftover Enthusiasm. Keep it away from the radiator. It keeps.",
    'The Mandatory Fun': 'The Mandatory Fun is up. I will note that I did not enjoy it, as required.'
  };
  add('stub', ["Stub {count}. Keep it somewhere you'll remember. Not here. Here is where people forget.", "Ticket's grown a stub. Sign of health.", "That's stub {count} of seven and a half. Seven and a half stays. It's the part I trust.",
    "It says what you checked. It doesn't say what you'll get back. That's called a surprise.", "The terms are on the reverse. The reverse is on order.", "Stub {count}. I'll hold the other half. There's no other half. I'll hold it anyway."
  ]);
  add('tear', ["That tore clean. Rare. Frame it. Don't frame it.", "You hesitated at the perforation. Everyone does. The perforation is used to it.", "You tore the ticket, not the stub. I've taped it. The tape is also a stub now.",
    "Perforations are guidelines. The stub has chosen to follow them. That's its choice.", 'A tear, a small whoosh, and nothing in it for me. Fine. This is a good job.'
  ]);
  add('retrieve', ["{item}. Slightly different. Within tolerance. I don't know whose.", "Retrieval's guaranteed. Resemblance isn't. See the back of your ticket. I'm told there's no back.", "It was in the other place. There's no other place. It came back slightly sunburnt.",
    "{item}. It's seen things. Mostly the inside of a rack. With feeling.", "Here. Any improvements are complimentary. Any damages are also complimentary.", "{item}'s back. Wouldn't say where it'd been. I didn't push. We're not that kind of window.",
    "Not quite how you left it. It is, however, how it left.", "You get the same coat back every time. It's the sameness that's new.", "It came back through the hatch backwards. That's the correct way. It's a long way.",
    "I'd like it noted that I didn't touch it. I'd also like it noted that something did.", "{item}. Smells of cedar and a decision. Don't ask which decision.", "{item}, returned. I counted it out and counted it in. The numbers were different. They both went home."
  ]);
  const RETITEM = {
    'Umbrella': "Your umbrella's back with a small opinion about rain. Don't engage.", 'A Tuesday': "Your Tuesday. It's Wednesday-adjacent now. It won't say where it's been.",
    'A Tuesday2': "Your Tuesday's got a middle name now. Gregory. Tuesday Gregory is a designated Tuesday. Be kind to it.", 'TuesdayF': "Your Tuesday's back. They moved Tuesday by fax, and this one came back to its old place out of loyalty.",
    'A Vague Unease': "Your Vague Unease is a bit less vague. I'm monitoring it. With the other eye.", 'The Concept of Q3': "Your Q3's back. It isn't the same Q3. Nobody can tell me which Q3 is better.",
    'Your Posture': "Your Posture's back. It's better. You're sitting up. Thank you.", '4:17 PM': "4:17 PM's back. It's 4:18 now. I told it to come back when it'd made up its mind.",
    'The Sound of a Meeting': "The Sound of a Meeting's back. It could have been nothing. It is now.", 'The Mandatory Fun': "The Mandatory Fun's back. A bit more mandatory, a bit less fun. Ratio's in tolerance.",
    'Left Glove (Right Hand)': "Your Left Glove's back as the right one. Still the wrong glove.", 'GloveK': "Your Left Glove's back. It says it has heard of a Kevin. A glove, in a drawer, in another department. It would like an introduction. It's a small world and a smaller drawer.",
    'Scarf (Long)': "The Scarf came back longer. Don't measure it. It'll know.", 'One (1) Sigh': "One sigh, returned. It's fuller now. Exhale carefully.",
    'A Mild Disagreement': 'The Mild Disagreement came back with a second point. It is now a Mild Disagreement (Two-Part).', 'Leftover Enthusiasm': "Your Leftover Enthusiasm's had time to think. It's down a bit. It's still enthusiasm.",
    'Your Passport Photo Face': "Your Passport Face has been through something. It still isn't smiling. It's more not-smiling.", 'A Surprise Pocket': "The Surprise Pocket's back. There's something in it. It won't be surprised. You will.",
    'The Third Ficus (Partial)': 'The Third Ficus (Partial) returns, 4 percent more ficus. The other two have been told.', 'Momentum': "Momentum's back. It's been somewhere. It arrived before it left."
  };
  const COATL = {
    1: "Your coat's come back a degree warmer. Warmth isn't a defect. It's a feature we didn't ship.", 2: "Second collar. Within tolerance. The first collar looks relieved.",
    3: "There's a name tag on it now. Gordon. I've not met Gordon. Treat him kindly.", 4: "It's a size you identify with now. I didn't measure. It measured me.",
    5: "Your coat's been to a conference. It came back with a lanyard and an opinion about breakouts.", 6: "It's technically a cape now. It doesn't seem to mind. It's walking differently.",
    7: "Back from a better coat. It won't discuss it. It got a look.", 8: "That's eight checks. At this point it's less a coat than a relationship.",
    12: "Twelve checks. Management would like to say a few words. They are 'coat' and 'thank you'."
  };
  const TECH = [
    ['It is technically yours. We checked. We also checked that you would check.', 'Technically yours. Technically is a word we are going to be using a lot.', 'Yours. In the sense that no one else has asked for it yet.'],
    ['It is technically yours. Technically is doing a lot of work. Technically has been given a desk.', 'Ownership is a spectrum. You are on it. Lyle has the map. The map is in the other coat.', 'Technically yours, as of 4:17, give or take the 4:17.'],
    ['It is yours in all the ways that count. The remaining ways are with Sandra.', 'Yours until further notice, which is now. Please do not ask for further notice.', 'Technically has been promoted. Technically now has a title and a small plant.'],
    ['Yours in a legal sense. Yours in spirit, not in coat.', 'Technically has been awarded a pension. Technically has not said what it will do with it.', 'Your ownership has been stamped. The stamp has been stamped. We are quietly proud of the stamp.'],
    ['Technically yours has reached the point where it simply sounds like a name. Please answer to it.', 'The deed to your coat is now longer than the coat. The coat has asked for representation.', 'Technically is now a department. It has a budget of one stamp.'],
    ['You may keep it. Technically.', 'At this point the stamp is retrieving you.', 'Yours. Mine. Ours. Technically. Please initial where indicated; the indicator has been lost.',
    "Technically has retired. Technically's replacement is also called Technically.", 'The word yours has been audited. It is on leave.', 'Yours has been stamped so many times the stamp has started to lean on it.', 'Please do not say yours again. Say it was handed to you. It was handed to you.']
  ];
  add('tech1', TECH[0]); add('tech2', TECH[1]); add('tech3', TECH[2]); add('tech4', TECH[3]); add('tech5', TECH[4]); add('tech6', TECH[5]);
  add('tshift', ['Technically, you did not ask for that to be yours. It has been stamped anyway.', 'Shift was held. Shift is a different department. It stamps anyway.']);
  add('meter', ['The remaining fraction is on a journey.', 'Anything over 99 percent is yours in all the ways that count. The rest belongs to the building.', "The needle has settled on a number. It wasn't the number we asked for. We have adopted it.",
    'Ownership is measured here in Technicallys. One Technically is a small amount of yours.', 'The needle wobbles. It has been told it is allowed to commit. It prefers to be available.', 'Please do not stare at the meter. It knows.',
    'Between Owned and Merely Near is a legal status. You are in it, comfortably.', 'This figure has been audited by Sandra. Sandra changed it to a different figure, then back.',
    'The meter has never read 0 and has never read 100. It lives in the middle, with the rest of us.', 'A reading of 100 would be unauthorized. A reading of 0 would be an incident.',
    'The meter would like to remind you that it is a meter and not a verdict.', 'Of this item, 0.8 percent has been to a conference. It took notes.',
    "The needle was asked to describe itself in one word. It said 'approximately'.", 'Yours (adj.): of, relating to, or loitering near you.', 'The meter was calibrated against a coat in 1994. The coat has since changed.',
    'Percent yours: a number between 40 and 99.9, which are the only numbers we trust.'
  ]);
  add('sag', ['The rack has sagged. We have a form for sag. It is 11 millimetres long.', 'The rail is now a smile. It is not smiling at you. It is smiling at the weight.',
    'The rack has reached maximum sag, which is 70 millimetres. There has never been a minimum sag. It was thought to be unlucky.'
  ]);
  add('hooks', ['We are out of hooks. A hook is being installed. Please step back from the hook. The hook has questions.', 'Hook 8 has arrived. It was in the ceiling the whole time. Management regrets nothing.',
    'Hook 9 arrives with a ribbon. The ribbon has been cut with small brass ceremony. The ribbon is also a hook now.', 'Hook 10. We have run out of hooks before. This is a pattern, and the pattern has been given a hook.',
    'Hook 12 has been installed. It is the twelfth. Please applaud the way you would for a twelfth: warmly, briefly, from a seat.', 'Hook 14. We have hung a hook. This is the recursion we were promised.',
    'Hook 16 is the final hook. A seventeenth has been requested. It is in committee. The committee is on hook 3.', 'The rack is full. Your oldest item has been retrieved for its own good. It is on the counter. It is a little different, and a little grateful.'
  ]);
  add('floor', ["That's not a hook. That's the floor. I'll tell it you tried.", "Dropped. I'll log it under Gravity. Gravity has a lot of entries from you.", '{item} fell. It bounced once, in apology, and went back to the pile.',
    "The floor took {item} and gave it back. That's the floor's whole job.", "Missed. Hooks are the round brass ones. I've pointed at them before."
  ]);
  add('pile', ['New items have arrived at the pile. Nobody saw who brought them. HR is aware, and is not saying.', 'The pile has grown. The pile has asked for a bigger pile.',
    'Please do not feed the pile after 5 PM. It is 4:59. The pile can wait a minute and has.', 'Something has been left at the pile. It is not labelled. It is, however, a Thursday.',
    "A tray of things has appeared. Nobody is claiming it. It has a sticker that says 'CLAIMED'.", 'The pile is now 6 percent taller than it was at the start of this sentence.'
  ]);
  add('pilex', ['A second Coat has arrived. It is not the first coat. Please do not introduce them.', 'The pile has overflowed into a smaller pile. The smaller pile is proud and has asked for a lanyard.',
    'The pile has politely absorbed its oldest item. It was not asked to. It was very polite about it.'
  ]);
  add('gap', ['A fresh copy has been put back to fill the gap you left. It is not the coat you took. It is the coat you meant.', 'The gap you left has been filled with a replacement. The replacement has been told nothing. It is doing well.',
    'Something has arrived to stand where your item stood. It is not a substitute. It is a successor. Please do not use that word to it.', 'A new one has been put in the old one\'s place. The old one is at home. The new one has been told it is at home also.']);
  add('backroom', ['The shadows in the back room are staff. Please do not wave. They have been waving at each other since 1998.', 'A shape in the back room is trying on your coat. This is part of the process. The process is mostly a shape.',
    'A shape in the back room is weeping at Q3, politely. It keeps a handkerchief for it.', 'A shape is filing your Tuesday. It was not a filing sort of Tuesday. It has been talked round.',
    'The back room has gone quiet. It is a working quiet. It is also a listening quiet. It may be a different quiet from earlier.', 'Someone back there is holding your Posture. They are holding it correctly. We are all slightly jealous.',
    'The frosted glass is a design feature. We do not know what is behind it. We know that it is busy.', 'Two shapes in the back room are sharing one coat. They did not ask. They look happy.',
    'A shape in the back room has been practising your signature. It is better than yours. It has been told not to say.'
  ]);
  add('sandra', ['Sandra from Compliance has flagged the rack. Items must now hang in order of how coat-like they are. The ordering is unpublished.', 'Sandra has clarified: a Tuesday is 4 percent coat-like. Sandra declined to say which 4.',
    'Sandra has noticed the rack is in order. She has withdrawn the rule and issued a new one: in order, but sadder.', "Green means coat-like. Yellow means coat-adjacent. 'Unpublished' means Sandra has not published it, will not, and has a form for that.",
    "Sandra has asked that the rack stop leaning. The rack has asked what Sandra means by 'stop'."
  ]);
  add('sandraflag', ['Sandra has flagged this as too soft.', 'Sandra has flagged this as too hard.', 'Sandra has flagged this as, quote, moist.', "Sandra has flagged this as 'a bit Wednesday'.", 'Sandra has flagged this, and then flagged the flag.']);
  add('fusion', ['{item} and its hook-mate have shared a hook long enough. They are now one. Congratulations to the couple.', 'Two items on one hook have merged. The tickets have merged as well. The perforation is awkward about it.',
    'A fusion has occurred. The result is a portmanteau. The portmanteau has not been consulted.', 'They are now a pair. A pair is a legal term. They did not read it.',
    'The stubs have fused into one double-wide stub. It shares a perforation. It also shares the denominator.', 'The merged item would like it noted that it was happy before. It would also like it noted that it is happy now.',
    "Lyle would like to say a few words at the reception. They are 'mind the hook'."
  ]);
  add('creep', ["The items are drifting toward the middle. It's gravity, or loyalty. The inquiry is ongoing.", 'One crept a hook toward the centre. Nobody saw it move. Everybody saw that it had moved.',
    "The rack is leaning inward. It's been told this is how racks hold hands.", 'Something on the rail has moved one hook. We asked the hook. The hook says it was not consulted.'
  ]);
  add('ticket', ['Your ticket is now 14 centimetres longer than the building. It has been allowed to leave through the window.', 'Stub 41 of 7 1/2. The denominator has been consulted and declined to comment.',
    'Your ticket has grown a second column. The columns have not met. They have exchanged a look.', 'The denominator remains 7 1/2. In recognition of tradition. And of the denominator.',
    'Your ticket has been laminated at no charge. It is now harder to read and easier to hold.', 'The ticket is longer than the queue it replaced.'
  ]);
  add('ticketx', ["Ticket's outgrown the window. I'm carrying it in both hands like a long scarf. You people. I mean that fondly.", 'You have 40 stubs on one ticket. It is now a document. You may file it under Tickets (Long).']);
  add('archaeology', ["Ticket Archaeology: oldest stub at the bottom. It says 'coat'. It is the same coat. Probably.", 'This stub is very old. Its item has collected the facts of every day it was not here. You may collect them all at once.',
    'Old stubs are layered like sediment. Lyle brushes one gently. It says COAT (BROWN-ISH). He nods, and does not say what about.'
  ]);
  add('wear', ['You are now wearing a Tuesday. It suits you. It suits everyone, which has always been its problem.', 'Please check what you are wearing. We can see it. We will not say what it is.',
    'You have checked what you were wearing. You are now wearing less. You are also wearing more. See Form 27B/6.', 'The Concept of Q3 looks well on you. It is a cold concept. Please dress for it.',
    'A coat, on a person. Finally a coat in the right place.', "You're wearing {item}. I've noted it. I note a lot of things. My notes are in a coat.",
    'Your aura has changed. Management declines to say which colour. It is the colour of the thing you are wearing.', 'You are wearing too much. Please check some of yourself. The rack is practically waiting.',
    "{item}, off. It didn't resist. They never do, with me."
  ]);
  add('conveyor', ['The rack is now a conveyor. This has always been the plan. The plan was in the coat.', 'A dry-cleaner hum fills the room. It is the same hum as in 1994. It is possible the hum is employed here.',
    'Items ride round and vanish behind the curtain. They come back changed. They come back, which is the main thing.', "Patron 4417's coat is passing. Patron 4417 left in 1991 and said they would be right back.",
    'A coat on the rack is not yours. It is technically yours. It has been technically yours since you looked at it.', "That's someone else's coat. It's the right coat for someone. Hold it till they're ready.",
    "Another patron's coat has joined the rack. The rack is a shared economy now. Please do not check anything you would miss. Check everything you would miss.",
    'Behind the curtain something is being done to your items. It is being done kindly, with a small lamp.', 'The conveyor has been going for six minutes. It has no destination and the confidence of a train.',
    'A coat has gone round four times and is starting to get a look.'
  ]);
  add('dennis', ['Dennis (Plant) is on hook 0. He did not check in. He is simply always there.', 'Dennis does not want to be checked. Dennis is thriving. Dennis has not been asked.',
    'Dennis was checked in 2019 and has not been collected. Dennis was never issued a ticket. Dennis is thriving.', 'Dennis (Plant) has been moved one hook to the left. He moved himself back. It took a long time and nobody saw.',
    'Dennis (Plant) recognises you from the lobby. He does not wave. He is a plant. He leans.', 'You have tried to pick up Dennis. Dennis has considered this and stayed.',
    'Dennis has been in the building longer than the rack, the hatch and Lyle. He does not mention it. He photosynthesises, pointedly.',
    'Dennis would like it noted that he has never been late, never been off, and has never once been asked how he is. Dennis is fine.'
  ]);
  add('gerald', ['A trench coat the size of a spud has been checked by Gerald, Vice President of Spuds. Please do not open it. It is a very serious coat.',
    '(G) I left a coat here in a year I cannot name. It has grown. I have not. This is the way of coats.', 'The owner is a large potato, and we will say no more.',
    'Gerald has been informed. Gerald is a potato. Gerald does not check things; Gerald is checked on.', 'The trench has been hung. It is a Large Coat (Small). Gerald has not commented. Gerald is on a break.'
  ]);
  add('sock', ['A sock was found in the lining. It is not yours. It is, however, on a journey, and has asked us to hold its ticket.',
    "It waved. 'Still travelling,' it said. It's back on the rack and still on its journey. Both are true.", "The sock has a home now, I hear. It's asked to keep its ticket anyway."
  ]);
  add('lyle', ["I've been checking coats since 1994. Nobody has ever asked how mine is.", "It doesn't need to be on the good hook. (a pause) It goes on the good hook.",
    "Lyle's coat has returned warmer, and slightly more thanked. That is not on the ticket. We will let it through.", 'Technically Yours has reached 100.0 percent. This was an error. It has been corrected. We regret the moment.',
    'Lyle has left a ticket on the counter. It is for his lunch break, which began in 2004. A button has appeared. It would like to be pressed gently.', "Hold it for me. Just till I'm back. I'm not going anywhere. That's the point.",
    "You are holding Lyle's ticket. It is for a lunch break. It is, technically, yours. He said it quietly.", "Lyle's own coat has arrived in the pile. Lyle is looking at the ceiling. The ceiling is very interesting."
  ]);
  add('recursion', ['You have checked the Coat Check. It is hanging in the back room, slightly smaller, with a Lyle in it. The Lyle is fine.', 'There is a smaller rack in the window. A smaller coat would fit it. Nobody is stopping you. Nobody is smaller than that.',
    'The Coat Check inside the Coat Check inside the Coat Check is as deep as it is permitted to be. Sandra has a form.', "The smaller Lyle has asked for a coat. The larger Lyle said, 'Sure.' Neither coat was a coat."
  ]);
  add('handback', ['Your coat has been retrieved 107 times. It is a coat in spirit, in colour, and in a smaller, legal sense. Please take it home.', 'Congratulations on completing the Coat Check. Your certificate has been printed on a stub.',
    'You have retrieved everything. Everything is slightly different. This has been our promise.', '(L, quietly) Technically a coat. Technically yours. Technically you.', 'Lyle blinks. The counter wipes. The hatch rises. Nothing has happened.',
    'Technically Yours has settled at 61.8 percent. It has never reached 0 and has never reached 100. It rests there for no reason.', 'The meter has been told to rest. It has been told by the meter.'
  ]);
  add('next', ['Next. What would you like to check?', "Next. State what you'd like to check. You've already stated it. State it again, slightly different.", 'Next. Same as before? Not the same as before. Next.']);
  add('ending', ['The Ending (Please Check) is in the pile. It is a very small ending. It has been told to wait.', 'You have retrieved The Ending. It has come back slightly different: it is now the beginning.'
  ]);
  add('spam', ['Please form a queue. You are the queue. Please form it behind yourself.', 'A Rush Surcharge of 3 Meh has been applied. It was applied apologetically, with two fingers, like a plaster on a very small wound.',
    "Hatch is shut for 7 1/2 seconds. That's a real timer. I'm breathing into a paper bag shaped like a coat.",
    "The hatch has opened 2 centimetres. A pamphlet has been passed through. It is called 'Queueing: A Guide'. It is a coat.", 'You have exceeded the item limit of 3 items per second. This is a limit we made up. It is a good limit.',
    'The stub printer has jammed and printed a stub for a stub. The stub for the stub is for a stub.',
    "Open. Everything you asked for during the countdown is coming at once. Thanks are fine. Eye contact isn't.", 'The queue has been served. It was a small queue. It was entirely you.'
  ]);
  add('spamw', ["Steady. That's a lot of asking per second. I'm one man with three pencils.", "I can hear you clicking. It's like rain on a very small roof.",
    "Whatever you're doing, I'd like to be asked first. At this speed. Whatever it is.", 'Slow down. The hatch is old. It was installed before speed.'
  ]);
  add('rushx', ['Again. The Surcharge is 3 Meh. It was 3 Meh last time. We are consistent. We are consistent at you.', 'Rush number {count}. Lyle has brought a second bag. It is the first bag, in retirement.',
    'The hatch is shut. Rush is now a tradition, which means it is optional, but expected.', 'A further Rush has been recorded. The hatch has been given a number to hold. It is {count}.'
  ]);
  add('bell', ['Rang it back. Once. Different bell.', 'Heard it. I always hear it.', "It isn't a doorbell. It's what a doorbell becomes when the door stops expecting anyone.", "That's the bell. It has been rung 40,000 times and is still surprised.",
    "I'd come out for a bell. I'm coming out. There's nobody out here. That was me.", 'That bell is from the old coat check. The one before. The one that was always here.',
    'Ding. That is the sound of nothing being retrieved. It is an excellent sound.', 'I rang the bell back. It was a mistake. It rang.'
  ]);
  add('bellx', ["That's a lot of bell. The bell can hear. The bell has feelings. The bell's feelings are a high C.", "You can ring it harder. It won't ring louder. I've tested it. I tested it on a Tuesday.",
    "If it's a different note you're after, I have a spoon.", "I'll come out when I'm ready to come out. I'm ready. I'm not coming out."
  ]);
  add('nope', ["That one's not coming off. It's in use.", "You can't have that. It has a job. It's on a hook for the month."]);
  add('empty', ["The rack is empty. The hatch has nothing to hand you. It's still a hatch.", "Still empty. It's a good rack. It's just between coats.", "I can retrieve you nothing. I can do it nicely, though. Nothing, retrieved.",
    "Four times. You're very committed to the absence of a coat. I respect it. I can feel myself respecting it.", "Five. I'll write it down. I've nothing to write it on. I'll write it on the nothing.",
    "Six. Whatever you're after, it isn't in the rack. Whatever you're after is also not here, on principle.",
    "Seven. That's seven. I've a ticket for that. It's for the one who asked for nothing seven times. Nobody has ever collected it. It's been waiting since 1994."
  ]);
  add('idle', ['Lyle has hung his own afternoon on the rack and left the hatch. He will return at an unspecified moment. Please enjoy the rack.', 'The coats have formed a committee. The agenda is one item long. The item is you, standing there.',
    'You have been standing here a long time. Would you like to check yourself? It is the quiet option.', 'The committee has adjourned. Minutes will follow. They are one page long and the page is the committee.'
  ]);
  add('idlea', ['Take your time. The coats have all the time. They are coats.', "Is anyone there? I'm not asking you. I'm asking the coats.", 'I used to count the stubs. Now they count me.',
    "Still there? That's all right. I've had longer. I once had a man for a week. He was a coat.", "I'm going to ring the bell once, for nobody. And again, to be sure.", "I'm naming the coats on the rack. Each name is a month. We're up to August.",
    "The clock's wrong. It's been wrong with such confidence that we've started to trust it.", "Don't mind me. I'm listening to the rack. It has a tune. It isn't a good tune. It's ours."
  ]);
  add('idlex', ['The coats are reviewing their own minutes. The minutes are reviewing the coats.', 'Item 1: the person at the counter. Item 2: why. Item 3: Tuesday.', 'A coat has proposed a motion. The motion is to remain a coat. It carried.',
    'The rack has begun to hum. It is a low hum. It is the hum of a rack with a quorum.', "Lyle's afternoon is swinging on its hook. It has not been checked. It has been admired.", 'Someone has moved the hooks one half to the left. No one is left to ask who.',
    'The Concept of Q3 has been mentioned in the corridor. The corridor has gone quiet. The corridor is now in session.', 'A raincoat has asked to be excused. It was not raining. It was excused.',
    'A scarf has been appointed to chair. It accepted by hanging there.', 'You are still here. That is noted. That is the whole minute.', 'Management is not saying anything. Management is not saying it loudly.',
    'The clock reads 4:59 with such certainty that we have stopped checking.'
  ]);
  add('wake', ["I'm back. My afternoon was fine. I had it retrieved. It's slightly different.", 'Sorry. I was in the back. I was also in the front. It was a day.', "Oh. You're still here. Good. That's the job. I mean yours.",
    "Welcome back. The coats got on without you. They've formed a view.", "I've been to the other side of the hatch. It's the same, but it hums."
  ]);
  add('self', ['You have been checked. The counter is empty. Management remarks that it has never been so peaceful and so wrong.', 'Something in the back room has put on a tiny version of you. It fits. This is worrying for both of you.',
    'You are back. You are slightly different. You are 2 percent more coat. This is not a compliment. It is a measurement.', "Welcome back. You've been checked. You were within tolerance. Your ticket was out of it.",
    '{player} (2% More Coat) has been added to the title bar. It is a drift bracket. It will fade after the session, as brackets do.'
  ]);
  add('stayed', ["A handwritten ticket slides out from under the counter. It reads: 'For the one who stayed.' It is for item 0000: Nothing, Checked Carefully.",
    'Item 0000 has been retrieved. It has returned as Something. Something is, strictly, an improvement.'
  ]);
  add('resize', ['The rack has been moved. Please do not blame the rack. The rack was moved by the building.', 'The building has moved the rack again. The building says it is for the light. There is no light.',
    'The rack has been moved a fifth time. A shape in the back room holds up a small sign. It says STOP.', 'Narrow window detected. Hooks have been reduced to fit your mood.'
  ]);
  add('tip', ["One Meh. Thank you. I'll tip it back. That'll be the end of it.", "I've tipped it back. You've tipped it again. We're just passing it now. It's mostly motion.",
    "I tipped you a Meh, more gently this time. It's the same Meh. It's been through a lot.", "A stub's printed: FEELING (1). Nobody's saying whose.", "One of us has had a feeling. I'll not say which. It was a very small feeling."
  ]);
  add('tipx', ["Tip received. Tip returned. It's a good tip. It's been both.", "That's the jar. It doesn't hold much. It holds attention.", 'Every time the jar jingles, a hook somewhere stands up straighter.',
    "I've never kept a tip in thirty years. It's an unwritten rule. It's written on my sleeve.", "The jar takes it. The jar gives it back. We have an understanding. I don't understand it.", "That's a lot of tipping for a coat. Is this about the coat?"
  ]);
  const MILE = {
    r10: 'You have retrieved 10 items. Each came back with one new thing. The new things are called details.',
    c25: 'You have checked 25 items. Per policy, I now owe you an acknowledgment. Acknowledged.',
    c50: 'We are experiencing high volumes of things. We were not prepared for the things.',
    c100: 'One hundred checks. The hatch has requested a pamphlet on its own condition. It is, again, a coat.',
    d7: "An item has reached depth 7. Beneath its name it now reads 'formerly'. Formerly is a thriving department.",
    concept: '{item} has drifted so far that it is now an idea. Please check it in as an idea.'
  };
  add('medal', ['You have been awarded a medal for hanging things. It is a hook with a ribbon. The ribbon is also hanging.']);
  add('time', ['This afternoon has been, in a manner of speaking, a kind of', '...afternoon. Sorry. I never find the end of that one.', 'The clock has reached 4:59 PM. It will stay there. It is a very good place to stay.', 'We close at 5:00 PM.',
    "Closing time isn't a time. It's an attitude.", 'A clock in another department reached 7:31 and was thrilled. This clock is at 4:17 and has chosen to be dignified about it.'
  ]);
  add('wrong', ['That is not your ticket. It is someone else\'s, and it came with their item. It is exactly what they left. It is the only unmodified return in the building.', "That's the one you left. Exactly the one you left. I don't know what to do with exactly.",
    'Dear whoever has my Tuesday. Please be gentle. It likes toast.', "That stub said SEE GERALD. I went and saw him. He gave me this. I didn't ask the size."
  ]);
  add('halfhook', ['Hook 7 1/2 is not a hook. It is a suggestion with a nail in it. Use gently.', "That was 7 1/2. I handed it back before you let go. Efficiency. I feel a bit sick.",
    "It's come back from the future. A little early. It'll be on time next week."
  ]);
  add('cross', ['Wendell in Lost Property sends regards. He says everything you left here is also, technically, lost.', 'A coat from Lost Property has been mentioned. It is not here. It is a ticket there. Lyle has a feeling about it.',
    'There is a box in Suggestions that has also been open since 1994. We have never met. We wave at the same time.',
    'Tuesday has been consulted about the rack. Tuesday has not responded. Tuesday is the heaviest thing here and not even a thing.',
    "I hear they moved Tuesday by fax. This one hasn't been told. I'm not going to be the one."
  ]);
  add('union', ['A small metal person has arrived at the hatch with a clipboard. It is the Stapler, Union Representative. It has demands.', 'The Stapler, Union Rep, is back. It recognises you. It nods, which is how a stapler nods, by being closed.',
    'Demand 1: the rack to be given a break. Demand 2: a break to be given a rack. Demand 3: hooks to be paid in coats.', "I'm not in the union. I'm sort of in the union. It's a union of one hat.",
    'We will take this to the denominator.', "A stub has printed: STAPLER LOCAL 7 1/2, DUES. It was taken from a coat. The coat hasn't noticed."
  ]);
  add('closing', ['It is 5:00 PM. Closing time has arrived. It is here. It is in the room.', "Right. That's five. I'll just get my coat. ... Where's my coat.",
    'It is 4:59 PM. Closing time has been postponed. It was a rumour, and the rumour has been spoken to.', 'Anyway.'
  ]);
  add('phone', ['The bell has rung itself. Lyle picks up a pencil, which is how he answers.', "Counter 7 1/2. Yes. No, we only have the one Tuesday. Yes, I'll hold.",
    "That was the other Coat Check. Far side of the wall. I didn't know there was a wall. She says hello.", 'A stub has printed: HELLO (RECEIVED, FROM THE OTHER SIDE OF THE WALL). It was not requested. It has been kept.'
  ]);
  add('itemtip', ['{item} has left a tip. It is 1 Meh. It was under the stamp. It does not want to discuss where it came from.', '{item} came back and pressed 1 Meh into your hand, the way one does at the end of a good visit.',
    '{item} has tipped you. This is not in the policy. It is not against the policy. The policy has gone quiet.'
  ]);
  add('amb', ["Today's Coat Check throughput is 11 items, 4 of them coats and 7 of them intentions.", 'Reminder: the Coat Check is a safe space for items and an unsafe space for opinions about hooks.',
    'Per my previous message: the hatch is not a window. It has been mistaken for one on 14 occasions.', 'Circling back to the thing we never visited: it is still not here, and is thriving.',
    'Please remember to check your belongings. Management once checked its own. It came back as a Thursday.', 'Management would like to be clear that it was not asked how the hooks are. The hooks are fine.',
    'Fun fact: the Coat Check has 7 1/2 hooks. Fun is mandatory. The fact is under review.', 'Lyle has not sat down since 2003. The stool has been moved. It remains hopeful.',
    'A coat on the rack was observed doing nothing for four minutes. It has been recommended for a promotion.', 'There is a draught at hook 3. It is not a draught. It is a coat, taking a breath.',
    'A pencil has been dropped. Lyle has two more. The balance is maintained.', 'Somewhere in the building a tray of cups has been put down gently. We felt it here.',
    'The lobby plant has been consulted about the rack. The lobby plant is thriving. The lobby plant declined to comment.', 'Tuesday is 14 hours away. It has not been mentioned. It has been mentioned.',
    'Please keep your claim ticket on you at all times, including in the shower, including in a dream.', 'Item 4417 (Coat) was seen near the exit. It was only looking. Coats do.'
  ]);
  const BEATS = {
    2: 'Please retrieve your coat at your convenience. The stub is the one that says TEAR. Tearing is encouraged. Tearing is the whole job.', 3: 'Please note that the pile has become more abstract. This is not our doing. We have only noticed it.',
    4: 'The back room window has been lit. It is a window. What is behind it is staff.', 5: 'The rack has begun to move. It is not moving. It is being moved by the idea of the middle.',
    6: 'The ticket has gone past the bottom of the window. It is now making its own way down the stairs.', 7: 'A mannequin has been delivered. It has no name. It would like one. Please do not give it one.',
    8: 'The rack is a conveyor. This was in the brochure. The brochure is in the coat.', 9: 'There is an item in the pile called The Coat Check (Partially). Please do not worry about it. Please check it.',
    10: 'Your Coat Check is complete. This is not a threat. This is an assessment.'
  };
  add('extra', ["You are already holding Lyle's ticket. Please hold it harder.", "Lyle's ticket is held. It has been held so well that Lyle has asked for it back, and then not.",
    'You are holding Lyle\'s ticket again. This is called commitment. It has no other name.'
  ]);
  const ITEMS = [
    ['Coat', '🧥', 'physical', 3, 0, 100, 1], ['Umbrella', '🌂', 'physical', 1, 0, 38, 2], ['Scarf (Long)', '🧣', 'physical', 1, 0, 62, 2],
    ['Left Glove (Right Hand)', '🧤', 'physical', 0.5, 0, 31, 2], ['A Tuesday', '📅', 'time', 0, 12, 4, 3], ['A Vague Unease', '💭', 'feeling', 0, 0, null, 3],
    ['The Concept of Q3', '📈', 'corporate', 40, 0, null, 3], ['Your Posture', '🧘', 'feeling', 5, 0, 18, 3], ['4:17 PM', '🕓', 'time', 2, 0, null, 3],
    ['One (1) Sigh', '💨', 'feeling', 0.5, 0, null, 3], ['A Mild Disagreement', '💬', 'feeling', 6, 0, null, 4], ['Leftover Enthusiasm', '🎉', 'feeling', 2, 0, null, 4],
    ['A Surprise Pocket', '👝', 'physical', 1, 0, 55, 4], ['Your Passport Photo Face', '🤨', 'self', 2, 0, 9, 4], ['The Mandatory Fun', '🎈', 'corporate', 25, 0, null, 5],
    ['Momentum', '🏃', 'abstract', 15, 0, null, 5], ['The Third Ficus (Partial)', '🌿', 'physical', 8, 0, 12, 5], ['The Sound of a Meeting', '🔊', 'corporate', 9, 0, null, 5]
  ];
  const TRAIT = ['now has a second collar', 'smells faintly of the third ficus', 'is warmer than it was', 'has developed a small regret', 'has acquired a small, unexplained pocket', 'now has opinions on lunch (well-formed)', 'returned smelling faintly of a decision', 'is facing a different direction', 'has taken up a hobby', 'contains a receipt for itself', 'is slightly more thanked', 'now hums, quietly, in the key of Q3', 'has a faint opinion about rain', 'is now 4% more Thursday'];
  const QTY = ['now 1.5 of itself', 'now has 3 sleeves, 1 of them retired', 'now one (1) fewer shadow', 'is 11 centimetres more, approximately', 'now two thirds of a pair', 'is now 7 1/2 percent coat', 'has gained a second, smaller one', 'now arrives in a quantity of Tuesday', 'is one-and-a-bit', 'has lost a quarter of its Mondays'];
  const PROV = ['recently from 1987', 'previously owned by a Thursday', 'was a gift, from itself', 'on loan from a better version of itself', 'returned from a wedding, not saying whose', 'last seen at a conference', 'formerly the property of a committee', 'has a pension (small)', 'was found in the lining of something', 'came with a note, in handwriting that is not yours'];
  const NOUN = ['Brown-ish', 'Second Collar', 'Thursday-Adjacent', 'Slightly Damp', 'Warmer', 'Middle Name', 'Beige-ish', 'Loud', 'Technically', 'Partial', 'Reconsidered', 'Formerly Warmer', 'Wednesday-ish', 'Mildly Famous', 'Laminated', 'Gently Used', 'Sort Of', 'On Loan', 'Left-Handed', 'Pensionable', 'Hooked', 'Retired'];
  const COATD = ['slightly warmer', 'second collar', 'name tag: Gordon', 'now a size you identify with', 'has been to a conference', 'is now technically a cape', 'back from a better coat'];
  const COATBR = { 1: 'Second Collar', 2: 'Gordon', 5: 'Cape' };
  const STAMPS = [[50, 'TECHNICALLY YOURS (STAMPED, THEN STAMPED)'], [35, 'CERTIFICATE OF TECHNICALITY, SIGNED BY THE ITEM'], [20, 'TECHNICALLY YOURS, WORN ON A LANYARD'], [10, 'DEED OF TECHNICALITY'], [5, 'TECHNICALLY YOURS (CERTIFIED)'], [1, 'TECHNICALLY YOURS']];
  const NEED = [0, 2, 4, 6, 8, 10, 12, 12, 12, 10, 0];
  const DEN = ['7 1/2', '7 and 3/5', '7 and 5/8', '7 and 2/3', '7 and 3/4'];
  const TOKS = ['-A', '/7 1/2', '-ii', '.5', '-B', '/3', '-iii', ' (Rev. 2)', '-C', '/7', '-iv', ' (Rev. 3)', '-D', '-v', '/11', '-E', ' (Rev. 4)', '-F'];
  const BADGES = ['📎', '🔖', '⭐', '💫', '🍂', '🕓'];
  const PATRONS = ["Patron 4417's Coat", "Patron 2290's Umbrella", "Patron 31's Tuesday", "Patron 4417's Coat (Returning)"];
  const BACKCAP = { Coat: 'a shape tries it on', 'The Concept of Q3': 'a shape weeps at it, politely', 'A Tuesday': 'a shape files it', 'A Vague Unease': 'a shape holds it at arm\'s length' };
  const WEARSLOT = [[/coat|trench/i, 'torso'], [/scarf|q3|posture|sigh/i, 'neck'], [/tuesday|ficus|passport|unease/i, 'head']];
  const PORT = { 'Umbrella+Coat': 'Umbrellacoat', 'Tuesday+Scarf': 'Tuesdayscarf', 'Unease+Q3': 'Unease-of-Q3', 'Posture+Coat': 'Postcoat' };
  P.registerModule({
    id: 'coat-check',
    title: 'Coat Check',
    tagline: 'Check anything. Get back something. It is technically yours.',
    icon: '🧥',
    category: 'department',
    unlockCost: 0,
    tags: ['hanging', 'drift', 'tickets'],
    mount(root, api) {
      const el = api.el;
      const k = function (s) { return 'm-coat-check-' + s; };
      const LC = 'm:coat-check:';
      const SC = api.selftest ? 0.12 : 1;
      const D = function (ms) { return Math.max(40, ms * SC); };
      const num = function (x) { x = +x; return Number.isFinite(x) ? x : 0; };
      const clamp = function (x, a, b) { return Math.min(b, Math.max(a, num(x))); };
      const cutE = function (s, n) { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
      const cut40 = function (s) { return String(s == null ? '' : s).slice(0, 60); };
      const cap1 = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
      const tok = function (i) { return TOKS[i - 1] || ('-' + i.toString(36).toUpperCase()); };
      const ticketNo = function (kk) { if (kk <= 0) return '0001'; const a = []; for (let i = Math.max(1, kk - 2); i <= kk; i++) a.push(tok(i)); return '0001' + (kk > 3 ? '…' : '') + a.join(''); };
      const Tn = function (d) { return 99.9 - 48 * (1 - Math.exp(-Math.pow(num(d) / 6, 2))); };
      const stat = function (n, v) { api.stat.inc('coat-check.' + n, v === undefined ? 1 : v); };
      const den = function () { return DEN[Math.min(S.loops, 4)]; };
      const fill = function (t, tk) {
        tk = tk || {};
        return String(t == null ? '' : t).replace(/^\((?:G|L)[^)]*\)\s*/, '').replace(/\{player\}/g, String(api.player.name || 'Valued Employee').slice(0, 24))
          .replace(/\{item\}/g, tk.item != null ? String(tk.item) : 'it').replace(/\{count\}/g, tk.count != null ? String(num(tk.count)) : '').replace(/\{[^}]*\}/g, '');
      };
      class Bag {
        constructor(a) { this.a = a; this.q = []; this.last = null; }
        next() {
          if (!this.q.length) { this.q = api.shuffle(this.a); if (this.q.length > 1 && this.q[this.q.length - 1] === this.last) this.q.unshift(this.q.pop()); }
          const v = this.q.pop(); this.last = v; return v;
        }
      }
      const axisBag = new Bag([0, 1, 2, 3]);
      const axBags = [new Bag(TRAIT), new Bag(QTY), new Bag(PROV), new Bag(NOUN)];
      const sfxBag = new Bag(['blip', 'bloop', 'pop']);
      const S = {
        beat: 1, beatAt: api.now(), actions: 0, actAtBeat: 0, phase: 'play', runId: 0, loopId: 0, timers: [], hooks: 6, items: [], uid: 1,
        sel: null, ring: 0, ringMoved: false, drag: null, lastDragEnd: -999, stubN: 0, ticketK: 0, stubs: [], stubsHidden: 0, retrievals: 0, checks: 0,
        technically: 0, bursts: [], rush: { until: 0, queue: [], knocked: false, cool: 0 }, loops: 0, world: 0, tyWobble: 0, settled: false,
        idleStage: 0, lastInput: api.now(), lastTick: api.now(), clock: 0, nest: 0, mini: [false, false, false], flags: {}, sessions: 0, total: 0,
        tips: 0, resizes: 0, lastW: 0, resizeCool: 0, pileOpen: false, archOpen: false, halfPlate: -1, sag: 0, sagLines: {}, printed: false, nx: {},
        titleSuffix: '', actSinceArr: 0, lastArr: api.now(), endingPending: false, sockN: 0, pT: 0, dirty: false, sandraSince: 0, lastBackSay: 0,
        lastMeterSay: 0, expanding: false, asleep: true, lyleHold: 0, miniN: 0, hungBases: {}, lastKey7: 0, eatSpace: 0, lastConv: 0, afternoon: 0, hbItem: 0, hbDone: false,
        t0: api.now(), lastSay: api.now(), emptyN: 0, rushN: 0, lastWarn: 0, bellRun: 0, lastBell: 0, idleSay: 0, marks: {}
      };
      const feat = {};
      const byId = function (id) { for (let i = 0; i < S.items.length; i++) if (S.items[i].id === id) return S.items[i]; return null; };
      const inLoc = function (loc) { return S.items.filter(function (i) { return i.loc === loc; }); };
      const occ = function (h) { return S.items.filter(function (i) { return i.loc === 'rack' && i.hook === h; }); };
      const shortName = function (b) { if (/Q3/.test(b)) return 'Q3'; const w = String(b).replace(/^(A|The|Your|One)\s+/i, '').replace(/\(.*$/, '').trim().split(/\s+/)[0]; return w || 'Thing'; };
      const portmanteau = function (a, b) {
        const x = shortName(a), y = shortName(b);
        return PORT[x + '+' + y] || cutE(cap1(x) + y.toLowerCase(), 20);
      };
      const displayName = function (it) { return it.base + (it.brackets.length ? ' (' + it.brackets.join(', ') + ')' : ''); };
      const dvis = function (it) { return it.gen ? it.depth % 12 : Math.min(it.depth, 12); };
      const reduced = function () {
        let r = false;
        try { r = !!root.closest('.pm-reduce-motion') || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { r = false; }
        root.classList.toggle(k('rm'), r); return r;
      };
      function mkItem(base, o) {
        let row = null;
        for (let i = 0; i < ITEMS.length; i++) if (ITEMS[i][0] === base) row = ITEMS[i];
        const it = Object.assign({
          id: S.uid++, base: base, emoji: row ? row[1] : '🎫', cls: row ? row[2] : 'physical', w: row ? row[3] : 1, heavy: row ? row[4] : 0, likeness: row ? row[5] : null,
          depth: 0, drift: [], brackets: [], gen: 0, checks: 0, loc: 'pile', hook: -1, slot: '', born: api.now(), shareSince: 0, fused: null, tag: '', patron: false,
          locked: false, fixed: false, key: '', badge: '', rot: Math.round((api.rand() * 8 - 4) * 10) / 10, stampAt: 0, stampTxt: '', stubAt: 0, note: '', noG: false, rot2: 0,
          sw: Math.round((3 + api.rand() * 6) * 10) / 10, dl: Math.round(api.rand() * -30) / 10, sd: Math.round((3 + api.rand() * 2) * 10) / 10, flagUntil: 0
        }, o || {});
        S.items.push(it); return it;
      }
      function removeItem(it) { const i = S.items.indexOf(it); if (i >= 0) S.items.splice(i, 1); if (S.sel === it.id) S.sel = null; }
      /* ---------------- timers and speech ---------------- */
      function after(ms, fn) { const id = S.runId; const t = api.setTimeout(function () { const x = S.timers.indexOf(t); if (x >= 0) S.timers.splice(x, 1); if (id !== S.runId || api.destroyed) return; fn(); }, ms); S.timers.push(t); return t; }
      function later(ms, fn) { const id = S.loopId; return api.setTimeout(function () { if (id !== S.loopId || api.destroyed) return; fn(); }, ms); }
      function say(text, who, mood, pri) {
        who = who || 'Management'; text = String(text == null ? '' : text);
        if (!text) return;
        S.lastSay = api.now();
        api.say(text, { who: who, mood: mood || 'neutral', priority: pri || 0 });
        if (who === 'Lyle' && text.length <= 110) bubble(text);
      }
      function sayR(cat, who, tk, mood, pri) { say(api.line('m:coat-check:' + cat, tk || {}), who, mood, pri); }
      function sayI(cat, i, who, a, b, c) {
        let tk = null, mood = 'neutral', pri = 0;
        if (typeof a === 'string') { mood = a; pri = b || 0; } else { tk = a; mood = b || 'neutral'; pri = c || 0; }
        say(fill(LN[cat][i], tk), who, mood, pri);
      }
      function cap(t) { capEl.textContent = String(t == null ? '' : t); }
      function bubble(text) {
        const b = el('span', { class: k('bubble'), text: text });
        bubbles.appendChild(b);
        while (bubbles.children.length > 2) bubbles.removeChild(bubbles.firstChild);
        later(4000, function () { if (b.parentNode) b.parentNode.removeChild(b); });
      }
      function backCap(t) { bcap.textContent = t; }
      function backReact(kind, it) {
        if (!feat.back) return;
        const sh = api.pick(shades); sh.classList.add(k('busy'));
        later(2000, function () { sh.classList.remove(k('busy')); });
        let t = 'a shape waves';
        if (kind === 'fuse') t = 'two shapes share one coat'; else if (kind === 'ret') t = 'a shape waves it off'; else if (it && BACKCAP[it.base]) t = BACKCAP[it.base];
        backCap(t);
        const now = api.now();
        if (now - S.lastBackSay > D(25000) && api.chance(0.35)) { S.lastBackSay = now; sayR('backroom', 'Management', null, 'neutral', 0); }
      }
      /* ---------------- DOM ---------------- */
      root.classList.add(k('room'));
      const ov = el('div', { class: k('over') });
      const mhand = el('i', { class: k('mhand') }), shand = el('i', { class: k('shand') });
      const clockTxt = el('span', { text: '4:00 PM' });
      const shades = ['👤', '🧑', '👴', '👵', '🧔'].map(function (c, i) { return el('span', { class: k('shade'), 'aria-hidden': 'true', style: 'left:' + (6 + i * 17) + '%;animation-delay:' + (-i * 1.3) + 's', text: c }); });
      const bcap = el('span', { class: k('bcap'), 'aria-hidden': 'true', text: 'frosted glass. staff. do not wave.' });
      const mini = el('div', { class: k('mini') });
      const glass = el('div', { class: k('glass') }, ...shades, el('span', { class: k('stop'), 'aria-hidden': 'true', text: 'STOP' }), el('span', { class: k('selfsh'), 'aria-hidden': 'true', text: '🙂' }), mini, bcap);
      const back = el('div', { class: k('back') }, glass, el('div', { class: k('clockbox'), 'aria-hidden': 'true', title: 'The clock' }, el('div', { class: k('clock') }, mhand, shand), clockTxt));
      const banner = el('div', { class: k('banner'), text: 'SANDRA (COMPLIANCE): ITEMS MUST HANG IN ORDER OF HOW COAT-LIKE THEY ARE.' });
      const pileEl = el('div', { class: k('pile') });
      const plistBtn = el('button', { class: k('pbtn'), type: 'button', dataset: { act: 'plist' }, hidden: true });
      const plistEl = el('div', { class: k('plist'), hidden: true });
      const pileCol = el('section', { class: k('col') + ' ' + k('pilecol') }, el('h3', { text: 'The Pile' }), pileEl, plistBtn, plistEl, el('p', { class: k('hint'), text: (function () { try { return window.matchMedia('(pointer:coarse)').matches; } catch (_) { return false; } })() ? 'Tap a thing, then tap a hook.' : 'Drag a thing onto a hook. Or click it, then click a hook.' }));
      const railPath = el('path', { class: k('path') }), railPath2 = el('path', { class: k('path2') });
      const rail = el('svg', { class: k('rail'), 'aria-hidden': 'true' }, railPath, railPath2);
      const halfHook = el('button', { class: k('ghosthook'), type: 'button', dataset: { act: 'half' }, 'aria-label': 'Hook 7 and a half', title: 'Hook 7 and a half', hidden: true, text: '7½' });
      const curtain = el('div', { class: k('curtain'), 'aria-hidden': 'true' });
      const hsign = el('div', { class: k('hsign'), 'aria-hidden': 'true' });
      const rackin = el('div', { class: k('rackin') }, rail, curtain, halfHook, hsign);
      const scroll = el('div', { class: k('scroll') }, rackin);
      const dennis = el('button', { class: k('dennis'), type: 'button', dataset: { act: 'dennis' }, 'aria-label': 'Dennis (Plant), Hook 0' }, el('span', { text: '🌱' }), el('small', { text: 'Hook 0' }));
      const lyleImg = el('span', { class: k('lyle'), 'aria-hidden': 'true', text: '👴' });
      const hatch = el('button', { class: k('hatch'), type: 'button', dataset: { act: 'hatch' }, 'aria-label': 'Hatch: retrieve the selected item, or the oldest one' }, lyleImg, el('span', { class: k('door') }), el('span', { class: k('hand'), 'aria-hidden': 'true', text: '✋' }), el('small', { text: 'HATCH' }));
      const bubbles = el('div', { class: k('bubbles'), 'aria-hidden': 'true' });
      const rsign = el('div', { class: k('rsign'), 'aria-hidden': 'true' });
      const hatchBox = el('div', { class: k('hatchbox') + ' ' + k('asleep') }, bubbles, hatch, rsign);
      const rackEl = el('div', { class: k('rack') }, dennis, scroll, hatchBox);
      const rackCol = el('section', { class: k('col') + ' ' + k('rackcol') }, el('h3', { text: 'The Rack (Counter 7 1/2)' }), rackEl);
      const tno = el('b', { class: k('tno') });
      const tlen = el('small', { class: k('tlen') });
      const stubsEl = el('div', { class: k('stubs') });
      const archBtn = el('button', { class: k('arch'), type: 'button', dataset: { act: 'arch' } });
      const archList = el('div', { class: k('archl') });
      const tickCol = el('section', { class: k('col') + ' ' + k('tickcol') }, el('div', { class: k('ticket') }, el('div', { class: k('thead') }, el('span', { text: 'CLAIM TICKET No.' }), tno), tlen, stubsEl, archBtn, archList));
      const mval = el('b', { class: k('mval') }), gold = el('span', { class: k('gold') });
      const medal = el('span', { class: k('medal'), 'aria-hidden': 'true', hidden: true, text: '🏅' });
      const mfill = el('i', { class: k('mfill') }), mneedle = el('i', { class: k('mneedle') });
      const mcap = el('span', { class: k('mcap') });
      const meterEl = el('div', { class: k('meter') }, el('div', { class: k('mtop') }, el('span', { text: 'TECHNICALLY YOURS' }), el('span', {}, medal, mval, gold)),
        el('div', { class: k('ruler'), 'aria-hidden': 'true' }, mfill, mneedle, el('i', { class: k('hundred') })), mcap);
      const trayEl = el('div', { class: k('trayrow') });
      const homeBtn = el('button', { class: k('btn'), type: 'button', dataset: { act: 'home' }, text: 'TAKE IT HOME' });
      const lytBtn = el('button', { class: k('btn') + ' ' + k('lyt'), type: 'button', dataset: { act: 'lyt' }, text: "HOLD LYLE'S TICKET" });
      const mat = el('div', { class: k('mat'), 'aria-hidden': 'true', text: 'EXIT MAT' });
      const tray = el('div', { class: k('tray') }, el('h3', { text: 'Counter Tray' }), trayEl, el('div', { class: k('acts') }, homeBtn, lytBtn, mat));
      const wornEl = el('div', { class: k('slots') });
      const mqBtn = el('button', { class: k('mqbtn'), type: 'button', dataset: { act: 'mann' }, 'aria-label': 'Mannequin: wear the selected tray item' });
      const mq = el('div', { class: k('mq') }, el('div', { class: k('fig'), 'aria-hidden': 'true' }, el('i', { class: k('mhead') }), el('i', { class: k('mneck') }), el('i', { class: k('mtorso') }), el('i', { class: k('marm1') }), el('i', { class: k('marm2') }), el('i', { class: k('mpole') })), mqBtn, wornEl);
      const jar = el('button', { class: k('jar'), type: 'button', dataset: { act: 'jar' }, 'aria-label': 'Tip jar', title: 'Tip jar', text: '🍯' });
      const bell = el('button', { class: k('bell'), type: 'button', dataset: { act: 'bell' }, 'aria-label': 'Ring the bell', title: 'Ring the bell', text: '🔔' });
      const side = el('div', { class: k('side') }, mq, el('div', { class: k('acts') }, bell, jar));
      const capEl = el('p', { class: k('cap'), 'aria-live': 'polite', text: 'The counter is open. Lyle is nearly awake.' });
      const foot = el('div', { class: k('foot') }, meterEl, tray, side);
      root.appendChild(el('div', { class: k('wrap') }, back, capEl, banner, el('div', { class: k('grid') }, pileCol, rackCol, tickCol), foot, el('small', { class: k('small'), text: 'Retrieval always works. It is the only promise we make.' })));
      root.appendChild(ov);
      const hookEls = [], hungEls = new Map();
      api.setTitle('Coat Check, Counter 7 1/2');
      /* ---------------- features, rendering ---------------- */
      function applyFeatures() {
        const b = S.beat;
        feat.meter = b >= 2; feat.back = b >= 4; feat.sandra = b >= 4; feat.creep = b >= 5 && b < 8; feat.fusion = b >= 5; feat.over = b >= 6; feat.mann = b >= 7; feat.conv = b >= 8; feat.recur = b >= 9; feat.lyt = b === 9 && !!S.flags.lytOn;
        const m = { meter: feat.meter, back: feat.back, sandra: feat.sandra, over: feat.over, mann: feat.mann, conv: feat.conv, recur: feat.recur || S.nest > 0, lyt: feat.lyt };
        Object.keys(m).forEach(function (n) { root.classList.toggle(k('f-' + n), !!m[n]); });
        root.classList.toggle(k('f-recur'), S.nest > 0);
      }
      function meterBase() {
        const held = S.items.filter(function (i) { return (i.loc === 'rack' && !i.fixed) || i.loc === 'tray' || i.loc === 'worn'; });
        if (!held.length) return 99.2;
        let s = 0; held.forEach(function (i) { s += Tn(i.depth); });
        return s / held.length;
      }
      function chipEl(it, ctx) {
        const d = dvis(it), now = api.now(), full = displayName(it);
        const fresh = ctx === 'tray' && it.stampAt && now - it.stampAt < 1400;
        const cls = [k('chip'), k('c-' + it.cls)];
        if (it.gen) cls.push(k('c-concept'));
        if (S.sel === it.id) cls.push(k('sel'));
        if (it.depth >= 3) cls.push(k('flip'));
        if (it.fused) cls.push(k('fz'));
        if (fresh) cls.push(k('fresh'));
        const kids = [el('span', { class: k('em'), text: it.emoji }), el('span', { class: k('nm'), text: cutE(full, 22) })];
        if (it.depth >= 2 || it.badge) kids.push(el('span', { class: k('orb'), 'aria-hidden': 'true', text: it.badge || BADGES[it.id % 6] }));
        if (ctx === 'tray') {
          const last = it.note || (it.drift.length ? 'now: ' + it.drift[it.drift.length - 1].replace(/^now /, '') : '');
          if (it.depth >= 7) kids.push(el('span', { class: k('now'), text: 'formerly: ' + String(it.base).toLowerCase() }));
          else if (last) kids.push(el('span', { class: k('now'), text: last }));
          if (fresh && it.stampTxt) kids.push(el('span', { class: k('stamp'), 'aria-hidden': 'true', text: it.stampTxt }));
        }
        const title = full + (it.drift.length ? ' | ' + it.drift.join(' | ') : '') + (it.tag ? ' | ' + it.tag : '') + (it.checks ? ' | ' + (it.checks === 1 ? 'checked once' : 'checked ' + it.checks + ' times') : '');
        return el('button', { class: cls.join(' '), type: 'button', dataset: { act: 'chip', id: String(it.id), fk: 'c' + it.id }, title: title, 'aria-label': full + (it.loc === 'tray' ? ', on the tray' : it.loc === 'worn' ? ', worn' : ''),
          style: '--rot:' + num(it.rot) + 'deg;--hue:' + (d * 37 + S.world) + ';--d:' + d }, ...kids);
      }
      function renderPile() {
        const pile = inLoc('pile'), shown = pile.slice(0, 18), over = pile.slice(18);
        pileEl.textContent = '';
        shown.forEach(function (it) { pileEl.appendChild(chipEl(it, 'pile')); });
        if (!shown.length) pileEl.appendChild(el('small', { class: k('small'), text: 'The pile is empty. It will not stay that way.' }));
        plistBtn.hidden = !over.length; plistBtn.textContent = 'Pile (+' + over.length + ')';
        plistEl.hidden = !over.length || !S.pileOpen; plistEl.textContent = '';
        if (!plistEl.hidden) over.slice(0, 12).forEach(function (it) { plistEl.appendChild(chipEl(it, 'pile')); });
      }
      function stubText(s) { return s.raw || ('STUB ' + s.n + ' of ' + den() + ': ' + s.name); }
      function renderStubs() {
        tno.textContent = S.printed ? (S.ticketK ? ticketNo(S.ticketK) : '0001 (Provisional)') : '';
        tlen.textContent = 'ticket length: ' + (num(S.ticketK) * 3.4).toFixed(1) + ' cm';
        stubsEl.textContent = '';
        S.stubs.slice(-14).reverse().forEach(function (s) {
          const kids = [el('button', { class: k('stubtxt'), type: 'button', dataset: { act: 'stubsel', n: String(s.n), fk: 's' + s.n }, text: stubText(s) + (s.torn ? ' (TORN)' : '') })];
          if (!s.torn) kids.push(el('button', { class: k('tear'), type: 'button', dataset: { act: 'tear', n: String(s.n), fk: 't' + s.n }, 'aria-label': 'Tear ' + stubText(s), text: 'TEAR' }));
          stubsEl.appendChild(el('div', { class: k('stub') + (s.torn ? ' ' + k('torn') : '') + (s.pair ? ' ' + k('w2') : ''), dataset: { stub: String(s.n) } }, ...kids));
        });
        const hid = S.stubsHidden + Math.max(0, S.stubs.length - 14);
        archBtn.hidden = !hid; archBtn.textContent = 'Archaeology (+' + hid + ')';
        archList.textContent = '';
        if (hid && S.archOpen) S.stubs.slice(0, Math.min(10, Math.max(0, S.stubs.length - 14))).forEach(function (s) { archList.appendChild(el('div', { text: stubText(s) })); });
      }
      function renderTray() {
        const tr = inLoc('tray');
        trayEl.textContent = ''; tray.classList.toggle(k('tempty'), !tr.length);
        tr.forEach(function (it) { trayEl.appendChild(chipEl(it, 'tray')); });
        if (!tr.length) trayEl.appendChild(el('small', { text: 'Retrieved things appear here, slightly different.' }));
      }
      const SLOTXY = { head: [47, -2], neck: [47, 42], torso: [47, 84] }, AURA = [[-4, 8], [98, 8], [-4, 120], [98, 120], [47, 176]];
      function renderWorn() {
        wornEl.textContent = '';
        let ai = 0;
        inLoc('worn').forEach(function (it) {
          const c = chipEl(it, 'worn');
          let p = SLOTXY[it.slot];
          if (!p) { p = AURA[ai % 5]; c.classList.add(k('aura')); c.style.setProperty('--ad', (-ai * 1.2) + 's'); ai++; }
          c.style.left = p[0] + 'px'; c.style.top = p[1] + 'px';
          wornEl.appendChild(c);
        });
      }
      function renderMeter() {
        const base = S.settled ? 61.8 : meterBase();
        const shown = S.settled ? 61.8 : clamp(base + S.tyWobble, 40, 99.9);
        S.tyShown = shown;
        mval.textContent = shown.toFixed(1);
        mfill.style.width = shown + '%'; mneedle.style.left = shown + '%';
        medal.hidden = !S.flags.medal;
      }
      function renderMini() {
        mini.textContent = '';
        let host = mini;
        for (let lv = 0; lv < S.nest; lv++) {
          const box = el('div', { class: k('mbox') }, el('span', { class: k('mlyle'), 'aria-hidden': 'true', text: '👴' }));
          for (let i = 0; i < 3; i++) box.appendChild(el('button', { class: k('mh'), type: 'button', dataset: { act: 'mini', i: String(i) }, 'aria-label': 'Small hook ' + (i + 1), text: S.mini[i] ? '🧥' : '' }));
          box.appendChild(el('span', { 'aria-hidden': 'true', text: '🧥' }));
          host.appendChild(box); host = box;
        }
      }
      function hookGeom() {
        const W = Math.max(scroll.clientWidth || 560, S.hooks * 56), y0 = 46;
        const sag = S.sag;
        return { W: W, y0: y0, x: function (i) { return W * (i + 0.5) / S.hooks; }, y: function (i) { const t = (i + 0.5) / S.hooks; return y0 + 4 * sag * t * (1 - t); } };
      }
      function likePill(it) {
        if (it.likeness === null || it.likeness === undefined) return { t: 'unpublished', c: k('unpub') };
        let left = null;
        for (let h = it.hook - 1; h >= 0 && left === null; h--) occ(h).forEach(function (o) { if (o.likeness !== null && o.likeness !== undefined) left = o.likeness; });
        return { t: String(num(it.likeness)), c: (left !== null && it.likeness < left) ? k('yel') : '' };
      }
      function hungSig(it, pill) { return [displayName(it), it.emoji, it.depth, pill ? pill.t + pill.c : '', it.flagUntil > api.now() ? 'F' : '', S.beat >= 4 ? 'b' : ''].join('|'); }
      function renderRack() {
        const items = inLoc('rack');
        let wsum = 0; items.forEach(function (i) { wsum += num(i.w) + num(i.heavy); });
        S.sag = clamp(wsum * 0.35, 0, 70);
        const g = hookGeom();
        rackin.style.width = g.W + 'px';
        rail.setAttribute('width', String(g.W)); rail.setAttribute('height', '300');
        railPath.setAttribute('d', 'M 0 ' + g.y0 + ' Q ' + (g.W / 2) + ' ' + (g.y0 + 2 * S.sag) + ' ' + g.W + ' ' + g.y0);
        railPath2.setAttribute('d', 'M 0 ' + (g.y0 - 3) + ' Q ' + (g.W / 2) + ' ' + (g.y0 - 3 + 2 * S.sag) + ' ' + g.W + ' ' + (g.y0 - 3));
        while (hookEls.length < S.hooks) {
          const b = el('button', { class: k('hook'), type: 'button', dataset: { act: 'hook', i: String(hookEls.length), fk: 'h' + hookEls.length } });
          if (S.newHook && !reduced()) { b.classList.add(k('drill')); later(760, function () { b.classList.remove(k('drill')); }); }
          rackin.appendChild(b); hookEls.push(b);
        }
        S.newHook = false;
        while (hookEls.length > S.hooks) { const b = hookEls.pop(); if (b.parentNode) b.parentNode.removeChild(b); }
        const sel = byId(S.sel), selHook = sel && sel.loc === 'rack' ? sel.hook : -1, ringOn = S.ringMoved || (sel && sel.loc !== 'rack');
        hookEls.forEach(function (h, i) {
          h.style.left = g.x(i) + 'px'; h.style.top = g.y(i) + 'px';
          h.textContent = (S.beat >= 4 && S.halfPlate === i) ? (i + 1) + '½' : String(i + 1);
          h.classList.toggle(k('ring'), !!ringOn && S.ring === i); h.classList.toggle(k('hl'), selHook === i);
          h.setAttribute('aria-label', 'Hook ' + (i + 1) + (occ(i).length ? ': ' + occ(i).map(displayName).join(' and ') : ': empty'));
        });
        halfHook.hidden = S.hooks < 8;
        if (!halfHook.hidden) { halfHook.style.left = (g.W * 7 / S.hooks) + 'px'; halfHook.style.top = (g.y0 + 4 * S.sag * (7 / S.hooks) * (1 - 7 / S.hooks)) + 'px'; }
        curtain.style.left = (g.W * (S.hooks - 1) / S.hooks) + 'px'; curtain.style.width = (g.W / S.hooks) + 'px';
        const seen = {}, grp = {}, ctr = (S.hooks - 1) / 2;
        items.forEach(function (i) { (grp[i.hook] = grp[i.hook] || []).push(i); });
        Object.keys(grp).forEach(function (h) { grp[h].sort(function (a, b) { return a.born - b.born || a.id - b.id; }); });
        items.forEach(function (it) {
          seen[it.id] = 1;
          let e = hungEls.get(it.id), isNew = false;
          if (!e) {
            e = el('button', { class: k('hung'), type: 'button', dataset: { act: 'hung', id: String(it.id), fk: 'u' + it.id } }); isNew = true;
            hungEls.set(it.id, e); rackin.appendChild(e);
          }
          const pill = feat.sandra ? likePill(it) : null, sig = hungSig(it, pill);
          if (e.dataset.sig !== sig) {
            e.dataset.sig = sig; e.textContent = '';
            const d = dvis(it), full = displayName(it);
            const hb = el('span', { class: k('hb') + ' ' + k('c-' + it.cls) + (it.depth >= 3 ? ' ' + k('flip') : ''), style: '--hue:' + (d * 37 + S.world) + ';--d:' + d }, el('span', { class: k('em'), text: it.emoji }), el('span', { class: k('nm'), text: cutE(full, 14) }));
            if (pill) hb.appendChild(el('em', { class: k('lk') + ' ' + pill.c, text: pill.t }));
            if (it.flagUntil > api.now()) hb.appendChild(el('span', { class: k('flag'), text: 'FLAGGED' }));
            if (it.depth >= 2 || it.badge) hb.appendChild(el('span', { class: k('orb'), 'aria-hidden': 'true', text: it.badge || BADGES[it.id % 6] }));
            e.appendChild(el('span', { class: k('pend'), style: '--sw:' + it.sw + ';--dl:' + it.dl + 's;--sd:' + it.sd + 's;--tilt:' + (it.hook < ctr ? 6 : it.hook > ctr ? -6 : 0) + 'deg' }, el('i', { class: k('str') }), hb));
            e.title = full + (it.checks > 1 ? ', ' + nth(it.checks) + ' check' : '') + (it.drift.length ? ' | ' + it.drift.join(' | ') : '');
          }
          e.setAttribute('aria-label', displayName(it) + ', on hook ' + (it.hook + 1));
          const arr = grp[it.hook], idx = arr.indexOf(it), two = arr.length > 1;
          const px = g.x(it.hook) + (two ? (idx ? 15 : -15) : 0) - 26, py = g.y(it.hook) + 6 + (two && idx ? 14 : 0);
          e.style.left = px + 'px'; e.style.top = py + 'px';
          const gone = feat.conv && it.hook === S.hooks - 1;
          e.classList.toggle(k('gone'), gone); e.tabIndex = gone ? -1 : 0; if (gone) e.setAttribute('aria-hidden', 'true'); else e.removeAttribute('aria-hidden');
          e.classList.toggle(k('sel'), S.sel === it.id);
          const tilt = (it.hook < ctr ? 6 : it.hook > ctr ? -6 : 0);
          e.firstChild.style.setProperty('--tilt', tilt + 'deg');
          if (isNew && !reduced()) { e.classList.add(k('snap')); later(200, function () { e.classList.remove(k('snap')); }); }
        });
        hungEls.forEach(function (e, id) { if (!seen[id]) { if (e.parentNode) e.parentNode.removeChild(e); hungEls.delete(id); } });
      }
      function withFocus(fn) {
        const a = document.activeElement; let key = null;
        if (a && a.tagName !== 'BODY' && root.contains(a) && a.dataset) key = a.dataset.fk || null;
        fn();
        if (key) {
          const t = root.querySelector('[data-fk="' + String(key).replace(/"/g, '') + '"]');
          if (t && t !== document.activeElement) { try { t.focus({ preventScroll: true }); } catch (_) { /* ignore */ } }
        }
      }
      function renderAll() {
        reduced();
        withFocus(function () { renderPile(); renderStubs(); renderTray(); renderWorn(); renderRack(); renderMeter(); });
        mcap.textContent = S.mcap || '';
      }
      function flush() {
        if (S.sel && !byId(S.sel)) S.sel = null;
        if (S.drag) { S.dirty = true; return; }
        S.dirty = false; renderAll();
      }
      function nth(n) { const v = n % 100; const s = ['th', 'st', 'nd', 'rd']; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
      /* ---------------- core actions ---------------- */
      function act() { S.actions++; S.actAtBeat++; S.actSinceArr++; }
      function recompute() { sagCheck(); persist(); flush(); }
      function sagCheck() {
        let ws = 0; inLoc('rack').forEach(function (i) { ws += num(i.w) + num(i.heavy); });
        const sag = clamp(ws * 0.35, 0, 70);
        [[20, 0], [45, 1], [70, 2]].forEach(function (p) { if (sag >= p[0] && !S.sagLines[p[0]]) { S.sagLines[p[0]] = 1; api.sfx('boing'); sayI('sag', p[1], 'Management'); } });
      }
      function addStub(o) { S.stubs.push(o); if (S.stubs.length > 60) { S.stubs.shift(); S.stubsHidden++; } }
      function newestStub(id) { for (let i = S.stubs.length - 1; i >= 0; i--) if (S.stubs[i].item === id && !S.stubs[i].torn) return S.stubs[i]; return null; }
      function stubName(it) {
        const br = it.checks > 1 ? 'RETURNING' : (it.base === 'Coat' && S.stubN === 1 && !it.brackets.length ? 'BROWN-ISH' : (it.brackets[0] || ''));
        return String(it.base).toUpperCase().slice(0, 22) + (br ? ' (' + String(br).toUpperCase() + ')' : '');
      }
      function stampText() { for (let i = 0; i < STAMPS.length; i++) if (S.technically >= STAMPS[i][0]) return STAMPS[i][1]; return STAMPS[STAMPS.length - 1][1]; }
      function select(id) {
        const it = byId(id); if (!it) return;
        if (S.sel === id) { S.sel = null; S.ringMoved = false; cap('Nothing selected. The nothing is well looked after.'); }
        else {
          S.sel = id; S.ringMoved = false;
          if (it.loc === 'rack') { S.ring = Math.max(0, it.hook); stat('examined'); cap('Selected: ' + displayName(it) + ', on hook ' + (it.hook + 1) + '. Press T or click the hatch to retrieve it.'); }
          else cap('Selected: ' + displayName(it) + '. Choose a hook.');
        }
        api.sfx('pop'); flush();
      }
      function place(it, h, keepBorn) {
        it.loc = 'rack'; it.slot = ''; it.hook = Math.floor(clamp(h, 0, S.hooks - 1));
        const now = api.now(); if (!keepBorn) it.born = now;
        const o = occ(it.hook).filter(function (x) { return x !== it; });
        if (o.length) { it.shareSince = now; o.forEach(function (x) { x.shareSince = now; }); } else it.shareSince = 0;
      }
      function resolveHook(h, it) {
        h = Math.floor(clamp(h, 0, S.hooks - 1));
        const okShare = function (x) { const o = occ(x); return o.length === 0 || (o.length === 1 && !o[0].fused && !o[0].locked && !(it && it.fused)); };
        if (okShare(h)) return h;
        const order = []; for (let i = 0; i < S.hooks; i++) order.push(i);
        order.sort(function (a, b) { return Math.abs(a - h) - Math.abs(b - h); });
        for (let i = 0; i < order.length; i++) if (occ(order[i]).length === 0) return order[i];
        for (let i = 0; i < order.length; i++) if (okShare(order[i])) return order[i];
        return -1;
      }
      function oldestRack() {
        const a = S.items.filter(function (i) { return i.loc === 'rack' && !i.fixed; }).sort(function (x, y) { return x.born - y.born || x.id - y.id; });
        return a[0] || null;
      }
      function hangItem(it, h, o) {
        if (!it || it.locked || it.loc === 'rack' || it.loc === 'hand' || S.phase === 'reset') return false;
        if (h === 'half') return halfHang(it);
        const prev = it.loc, prevSlot = it.slot;
        it.loc = 'hand';
        let t = resolveHook(h, it);
        if (t < 0) { const old = oldestRack(); if (old) { doRetrieve(old, { auto: true }); sayI('hooks', 7, 'Management'); } t = resolveHook(h, it); }
        if (t < 0) { it.loc = prev; it.slot = prevSlot; floorDrop(it); return false; }
        place(it, t);
        const now = api.now(), rechk = it.checks >= 1;
        it.checks++; S.checks++; S.total++; S.ticketK++; S.emptyN = 0; act(); stat('hung');
        const n = ++S.stubN; addStub({ n: n, name: stubName(it), item: it.id, torn: false }); it.stubAt = n; stat('stubs');
        S.ring = t; S.ringMoved = false; if (S.sel === it.id) S.sel = null;
        api.sfx('ding'); api.award(rechk ? 0.2 : 0.5, 'hang'); api.achieve('coat-check.first');
        cap(displayName(it) + ' hung on hook ' + (t + 1) + '. ' + stubText(S.stubs[S.stubs.length - 1]) + '.' + (S.checks === 1 ? ' Click the hatch, or press T, to get it back.' : ''));        if (S.checks === 1 && S.beat === 1) after(D(3000), function () { say('Whenever you want it back, ask the hatch. Or tear the stub. Same thing, different noise.', 'Lyle', 'neutral', 1); });
        if (S.ticketK >= 40 && !S.flags.t40) { S.flags.t40 = 1; api.achieve('coat-check.ticket'); later(D(2000), function () { sayI('ticketx', 1, 'Management'); }); }
        else if (S.ticketK === 12 || S.ticketK === 26) later(D(2600), function () { sayR('ticket', 'Management'); });
        if (HANGITEM[it.base] && !S.hungBases[it.base]) { S.hungBases[it.base] = 1; say(HANGITEM[it.base], 'Lyle', 'neutral', 0); }
        else sayR('hang', 'Lyle', { item: displayName(it), count: t + 1 });
        if (api.chance(0.25)) after(D(1800), function () { sayR('stub', 'Lyle', { count: n }); });
        if (it.key === 'you' && (S.phase === 'play' || S.phase === 'rush')) startSelf(it);
        else if (it.key === 'coatcheck') nestUp();
        else if (it.key === 'gerald') later(D(1500), function () { sayI('gerald', 4, 'Management'); });
        else if (it.key === 'sock' && api.flag.get('sockSeen')) later(D(1500), function () { sayI('sock', 1, 'Lyle'); });
        if (it.base === '4:17 PM') clockTick();
        if (it.base === 'A Tuesday') {
          if (api.flag.get('fax-machine.tuesdayMoved') && !S.flags.faxTue) { S.flags.faxTue = 1; later(D(2400), function () { sayI('cross', 4, 'Lyle'); }); } // lint-ignore shared callback flag
          else if (feat.sandra && !S.flags.sandraTue) { S.flags.sandraTue = 1; later(D(2200), function () { sayI('sandra', 1, 'Management'); }); }
          else if (api.chance(0.3) && !S.flags.crossTue) { S.flags.crossTue = 1; later(D(2600), function () { sayI('cross', 3, 'Management'); }); }
        }
        if (feat.sandra && api.chance(0.125)) { it.flagUntil = now + 6000; sayR('sandraflag', 'Management'); later(6100, flush); }
        backReact('hang', it);
        if (S.checks === 25 || S.checks === 50 || S.checks === 100) later(D(2400), function () { say(MILE['c' + S.checks], 'Management', 'smug', 1); });
        burst(); checkExpand(); recompute();
        return true;
      }
      function clockTick() {
        api.sfx('tick');
        hungEls.forEach(function (e) { e.classList.add(k('jerk')); });
        later(260, function () { hungEls.forEach(function (e) { e.classList.remove(k('jerk')); }); });
      }
      function floorDrop(it) { api.sfx('boing'); sayR('floor', 'Lyle', { item: displayName(it) }); flush(); }
      function checkExpand() {
        if (S.hooks >= 16 || S.expanding) return;
        for (let i = 0; i < S.hooks; i++) if (!occ(i).length) return;
        S.expanding = true;
        later(D(1500), function () {
          S.expanding = false;
          if (S.hooks >= 16) return;
          S.hooks++;
          const n = S.hooks, M = { 7: 0, 8: 1, 9: 2, 10: 3, 12: 4, 14: 5, 16: 6 };
          hsign.textContent = 'HOOK EXPANSION PROGRAMME, PHASE ' + (n - 5) + ' OF 7 1/2';
          hsign.classList.add(k('on')); later(3000, function () { hsign.classList.remove(k('on')); });
          if (!reduced()) {
            const g = hookGeom(), x = g.x(n - 1), y = g.y(n - 1), dust = [];
            for (let i = 0; i < 8; i++) { const d = el('span', { class: k('dust'), 'aria-hidden': 'true', style: 'left:' + (x - 4) + 'px;top:' + (y + 6) + 'px;--dx:' + (Math.round((i - 3.5) * 9)) + 'px' }); rackin.appendChild(d); dust.push(d); }
            if (n === 9) { const rb = el('span', { class: k('dust'), 'aria-hidden': 'true', style: 'left:' + (x - 10) + 'px;top:' + (y - 24) + 'px;font-size:18px;background:none', text: '🎀' }); rackin.appendChild(rb); dust.push(rb); }
            later(950, function () { dust.forEach(function (d) { if (d.parentNode) d.parentNode.removeChild(d); }); });
          }
          S.newHook = true; api.sfx('whoosh');
          if (M[n] !== undefined) sayI('hooks', M[n], 'Management', null, 'proud', 1);
          if (n === 12) api.confetti(undefined, undefined, 14);
          if (n === 8) later(D(3500), function () { cap('A faint 7½ has appeared between hooks 7 and 8. It is not a hook. Yet.'); });
          recompute();
        });
      }
      /* ---------------- retrieval and drift ---------------- */
      function queueTear(id) {
        if (S.rush.queue.length >= 12) { cap('The queue is full. The queue is also you.'); return; }
        S.rush.queue.push(id || null); cap('Queued (' + S.rush.queue.length + '). The hatch will serve you shortly.'); api.sfx('tick');
      }
      function retrieve(id, o) {
        o = o || {}; touch();
        burst();
        if (S.phase === 'rush' || S.phase === 'self') { queueTear(id); return false; }
        let it = id ? byId(id) : null;
        if (id && (!it || it.loc !== 'rack')) { sayR('tear', 'Lyle'); return false; }
        if (!it) it = oldestRack();
        if (!it) {
          const en = ++S.emptyN; if (en > 7) sayR('bell', 'Lyle'); else sayI('empty', en - 1, 'Lyle', en === 7 ? 'proud' : 'neutral', en === 7 ? 1 : 0); cap('The rack is empty. The hatch has nothing to hand you.'); api.sfx('blip');
          if (en === 7) { api.achieve('coat-check.empty'); api.award(7, 'nothing, retrieved'); api.confetti(); }
          return false;
        }
        if (it.fixed) { cap('That one is not retrievable. It is in use.'); sayR('nope', 'Lyle'); return false; }
        doRetrieve(it, o);
        return true;
      }
      function hatchAnim() {
        if (reduced()) return;
        hatchBox.classList.add(k('open')); root.classList.add(k('shake'));
        later(D(900), function () { hatchBox.classList.remove(k('open')); }); later(320, function () { root.classList.remove(k('shake')); });
      }
      function toTray(it) {
        const t = S.items.filter(function (i) { return i.loc === 'tray' && i !== it; }).sort(function (a, b) { return (a.trayAt || 0) - (b.trayAt || 0) || a.id - b.id; });
        while (t.length >= 8) takeHome(t.shift(), true);
        it.loc = 'tray'; it.hook = -1; it.slot = ''; it.trayAt = api.now();
      }
      function driftOnce(it, special) {
        let ph, br = null;
        if (special) ph = special;
        else if (it.base === 'Coat' && !it.gen && it.depth < 7) { ph = COATD[it.depth]; br = COATBR[it.depth] || null; }
        else { const a = axisBag.next(), v = axBags[a].next(); if (a === 3) { br = v; ph = 'now also known as ' + v; } else ph = v; }
        it.drift.push(ph); if (it.drift.length > 12) it.drift.shift();
        if (br) { it.brackets.push(br); while (it.brackets.length > 3) it.brackets.shift(); }
        it.depth = Math.min(99999, it.depth + 1);
        api.stat.max('coat-check.drift-max', it.depth);
      }
      function afterDrift(it) {
        if (it.key === 'orig') return;
        if (it.depth >= 7 && !S.flags.d7) { S.flags.d7 = 1; later(D(2600), function () { say(MILE.d7, 'Management', 'smug', 1); }); }
        if (it.depth >= 12 * (it.gen + 1)) promote(it);
      }
      function promote(it) {
        it.gen++;
        it.root = it.root || String(it.base).replace(/^(A|The|Your|One)\s+/i, '');
        it.base = it.gen === 1 ? 'The ' + it.root : 'The Idea of The ' + it.root;
        it.brackets = []; it.loc = 'pile'; it.hook = -1; it.slot = ''; it.likeness = null; it.key = it.key === 'orig' ? '' : it.key;
        if (S.sel === it.id) S.sel = null;
        api.achieve('coat-check.concept'); api.award(3, 'concept'); api.sfx('fanfare');
        later(D(1200), function () { say(fill(MILE.concept, { item: it.base }), 'Management', 'confused', 1); });
      }
      function doRetrieve(it, o) {
        const n = ++S.retrievals, auto = !!o.auto, now = api.now();
        if (!auto) { act(); hatchAnim(); api.sfx('whoosh'); }
        stat('retrieved');
        const st = newestStub(it.id);
        if (!auto && n >= 4 && !it.key && !it.patron) {
          if (!it.noG && api.chance(1 / 25)) return geraldPath(it, st);
          if (api.chance(1 / 60)) return lostPath(it, st);
          if (api.chance(1 / 45)) return neighbourPath(it);
        }
        if (st) st.torn = true;
        let target = it;
        if (it.key === 'sock' && api.flag.get('sockSeen')) { target = mkItem('A Sock', { emoji: '🧦', cls: 'cameo', w: 0.2, loc: 'hand', depth: 1, drift: ['Doing well. Do not circle back.'] }); if (st) st.torn = false; }
        else if (it.key === 'sock') { it.drift = ['Doing well. Do not circle back.']; it.depth = 1; }
        toTray(target); target.stampAt = now; S.technically++; target.stampTxt = stampText();
        if (S.sel === it.id) S.sel = null;
        if (auto) { driftOnce(it); afterDrift(it); recompute(); return true; }
        later(D(450), function () { api.sfx('stamp'); }); later(1500, flush);
        const wasPatron = it.patron;
        if (wasPatron) { it.patron = false; it.locked = false; }
        if (it.key === 'nothing') {
          it.base = 'Something'; it.emoji = '🎁'; it.key = ''; api.award(12, 'something'); api.achieve('coat-check.stayed'); api.confetti();
          later(D(1200), function () { sayI('stayed', 1, 'Management', null, 'proud', 1); });
        } else if (it.key === 'ending') {
          it.base = 'The Beginning (Please Check)'; it.drift = ['slightly different: it is now the beginning']; it.key = ''; api.achieve('coat-check.beginning');
          sayI('ending', 1, 'Management', 'proud', 1);
          setPhase('reset'); later(D(2000), function () { resetLoop(); });
        } else if (it.key === 'pamphlet' || it.key === 'gerald') {
          driftOnce(it);
        } else {
          const reps = (feat.over && S.stubN - it.stubAt >= 20 && it.key !== 'lylecoat') ? 3 : 1;
          if (it.key === 'lylecoat') { driftOnce(it, 'warmer, and slightly more thanked'); }
          else for (let i = 0; i < reps; i++) driftOnce(it);
          if (target !== it) driftOnce(target, 'still travelling');
        }
        if (it.key === 'lylecoat') {
          goldFlash(); it.key = ''; api.award(3, 'lyle coat');
          sayI('lyle', 2, 'Management', 'proud', 1); later(D(2600), function () { sayI('lyle', 3, 'Management', 'panic', 1); });
        }
        afterDrift(target === it ? it : target);
        const ph = target.loc === 'tray' ? target : it;
        const isCoat = ph.base === 'Coat' && !ph.gen;
        cap('Retrieved: ' + displayName(ph) + (n === 1 ? '. It is on the tray. You may check it again. Most people do.' : '. It is slightly different.'));
        if (wasPatron) sayI('conveyor', 5, 'Lyle');
        else if (it.key === '' && isCoat && COATL[ph.depth]) say(COATL[ph.depth], 'Lyle', 'neutral', 0);
        else if (RETITEM[ph.base] && (rkey(ph) !== ph.base || api.chance(0.4))) say(RETITEM[rkey(ph)], 'Lyle', 'neutral', 0);
        else sayR('retrieve', 'Lyle', { item: displayName(ph) });
        const tier = n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : n <= 16 ? 4 : n <= 30 ? 5 : 6;
        const shift = !!o.shift;
        if (shift || tier !== S.lastTier || n % 3 === 0) after(D(1500), function () { if (shift) sayR('tshift', 'Management', null, 'smug', 0); else sayR('tech' + tier, 'Management', null, 'smug', 0); }); S.lastTier = tier;
        api.award(0.3, 'retrieve');
        if (n === 10) later(D(3200), function () { say(MILE.r10, 'Management', 'proud', 1); });
        if (S.beat === 2 && !S.flags.cross1 && api.stat.get('lost-and-found.entered') > 0) { S.flags.cross1 = 1; later(D(4200), function () { sayI('cross', 0, 'Management'); }); if (api.flag.get('lost-and-found.coat')) later(D(8200), function () { sayI('cross', 1, 'Management'); }); }
        if (ph.depth >= 4 && S.sockN < 2 && api.chance(1 / 12)) dropSock();
        if (n >= 6 && !wasPatron && S.phase === 'play' && api.chance(1 / 70)) phoneCall();
        else if (n >= 5 && api.chance(1 / 90)) { api.award(1, 'tipped by an item'); later(D(2400), function () { api.sfx('bloop'); sayR('itemtip', 'Management', { item: displayName(ph) }, 'smug', 1); }); }
        backReact('ret', ph);
        recompute();
        return true;
      }
      function rkey(p) {
        if (p.base === 'A Tuesday') return api.flag.get('fax-machine.tuesdayMoved') ? 'TuesdayF' : p.depth > 1 ? 'A Tuesday2' : p.base; // lint-ignore shared callback flag
        if (p.base === 'Left Glove (Right Hand)' && api.flag.get('sock-matcher.gloveKevin')) return 'GloveK'; // lint-ignore shared callback flag
        return p.base;
      }
      function phoneCall() {
        api.sfx('bell'); sayI('phone', 0, 'Management', 'confused', 1);
        later(D(2600), function () { sayI('phone', 1, 'Lyle', 'neutral', 1); });
        later(D(6200), function () { sayI('phone', 2, 'Lyle', 'neutral', 1); });
        later(D(9800), function () { addStub({ n: ++S.stubN, name: 'HELLO', raw: 'HELLO (RECEIVED, FROM THE OTHER SIDE OF THE WALL)', item: 0, torn: false }); api.award(2, 'hello'); api.sfx('stamp'); sayI('phone', 3, 'Management', 'smug', 1); flush(); });
      }
      function geraldPath(it, st) {
        it.noG = true; if (st) st.name = 'SEE GERALD';
        const g = mkItem("Gerald's Trench", { emoji: '🧥', cls: 'cameo', w: 14, brackets: ['Large Coat (Small)'], badge: '🥔', tag: 'G. (VP SPUDS)', note: 'G. (VP SPUDS)', key: 'gerald', loc: 'hand' });
        toTray(g); g.stampAt = api.now(); S.technically++; g.stampTxt = stampText();
        api.flag.set('coat-check.gerald', true); api.achieve('coat-check.gerald'); api.award(2, 'trench'); api.sfx('fanfare');
        if (api.flag.get('metGerald')) say(fill(LN.gerald[1]), 'Gerald', 'neutral', 1); else sayI('gerald', api.chance(0.5) ? 0 : 2, 'Management', null, 'confused', 1);
        later(D(2800), function () { sayI('wrong', 3, 'Lyle'); });
        later(1500, flush); recompute(); return true;
      }
      function lostPath(it, st) {
        if (st) st.torn = true;
        toTray(it); it.tag = 'what you left'; it.note = 'what you left'; it.stampAt = api.now(); S.technically++; it.stampTxt = stampText();
        api.award(4, 'lost ticket'); sayI('wrong', 0, 'Management', 'confused', 1); later(D(3500), function () { sayI('wrong', 1, 'Lyle'); });
        later(1500, flush); recompute(); return true;
      }
      function neighbourPath(it) {
        const row = api.pick(ITEMS), g = mkItem(row[0], { loc: 'hand', note: 'Dear whoever has my Tuesday. Please be gentle.' });
        toTray(g); g.stampAt = api.now(); S.technically++; g.stampTxt = stampText();
        api.award(2, 'neighbour'); sayI('wrong', 2, 'Management', 'confused', 1); later(1500, flush); recompute(); return true;
      }
      function dropSock() {
        S.sockN++; mkItem('A Sock', { emoji: '🧦', cls: 'cameo', w: 0.2, key: 'sock' }); api.sfx('pop');
        later(D(2200), function () { sayI('sock', api.flag.get('sockSeen') ? 1 : 0, api.flag.get('sockSeen') ? 'Lyle' : 'Management', 'confused', 1); if (api.flag.get('sock-matcher.home')) later(D(3000), function () { sayI('sock', 2, 'Lyle'); }); });
      }
      function goldFlash() {
        gold.textContent = '100.0'; gold.classList.add(k('on'));
        later(1200, function () { gold.textContent = 'CORRECTED'; later(1200, function () { gold.classList.remove(k('on')); }); });
      }
      function takeHome(it, auto) {
        if (!it) return;
        const base = it.base, key = it.key, fused = it.fused, gen = it.gen;
        removeItem(it);
        api.award(0.5, 'home'); stat('home'); api.sfx('whoosh');
        if (!auto) act();
        if (key === 'orig') { handbackDone(); return; }
        let row = null; for (let i = 0; i < ITEMS.length; i++) if (ITEMS[i][0] === base) row = ITEMS[i];
        if (row && !fused && !gen) later(D(15000), function () { if (S.phase === 'reset') return; mkItem(row[0]); api.sfx('pop'); sayR('gap', 'Management'); flush(); });
        if (!auto) { cap(base + ' has gone home. A gap has been left. It will be filled.'); recompute(); } else persist();
      }
      function tearStub(n, o) {
        let s = null; for (let i = 0; i < S.stubs.length; i++) if (String(S.stubs[i].n) === String(n)) s = S.stubs[i];
        if (!s) return;
        if (s.locked) { cap("That stub cannot be torn. It is Lyle's."); sayI('lyle', 5, 'Lyle'); return; }
        if (s.torn) return;
        const it = s.item ? byId(s.item) : null;
        if (it && it.loc === 'rack') { retrieve(it.id, o); return; }
        touch(); burst(); s.torn = true; api.sfx('whoosh'); sayR('tear', 'Lyle'); flush(); persist();
      }
      /* ---------------- spam: the Rush ---------------- */
      function burst() {
        const now = api.now();
        S.bursts = S.bursts.filter(function (t) { return now - t < 3000; }); S.bursts.push(now);
        if (S.bursts.length === 6 && S.phase === 'play' && now - S.lastWarn > D(9000)) { S.lastWarn = now; sayR('spamw', 'Lyle', null, 'confused', 1); }
        if (S.bursts.length > 8 && S.phase === 'play' && now >= S.rush.cool) rush();
      }
      function setPhase(p) {
        S.runId++; S.timers.forEach(function (t) { api.clearTimeout(t); }); S.timers = []; S.phase = p;
        if (p !== 'rush') { hatchBox.classList.remove(k('shut')); rsign.textContent = ''; }
        if (S.drag) endDrag();
      }
      function rush() {
        S.bursts = []; setPhase('rush'); S.rush.until = api.now() + D(7500); S.rush.knocked = false;
        hatchBox.classList.add(k('shut')); hatchBox.classList.remove(k('open')); api.sfx('buzz');
        api.award(-3, 'rush surcharge'); stat('rush'); api.achieve('coat-check.surcharge'); S.rushN++;
        if (S.rushN > 1) sayR('rushx', 'Management', { count: S.rushN }, 'panic', 1); else sayI('spam', 0, 'Management', 'panic', 1);
        after(D(900), function () { api.sfx('sad'); if (S.rushN === 1) sayI('spam', 1, 'Management', 'disappointed', 1); });
        after(D(2400), function () { sayI('spam', 2, 'Lyle', 'panic', 0); });
        after(D(4200), function () { sayI('spam', 4, 'Management', 'confused', 0); });
        after(D(5400), function () {
          addStub({ n: ++S.stubN, name: 'STUB (FOR A STUB)', item: 0, torn: false }); api.sfx('buzz'); sayI('spam', 5, 'Management', 'confused', 0); flush();
        });
        const step = function () {
          const left = Math.max(0, S.rush.until - api.now());
          rsign.textContent = 'BACK IN ' + (left / SC / 1000).toFixed(1) + ' SECONDS';
          if (left > 0) after(100, step); else endRush();
        };
        step(); flush();
      }
      function knock() {
        if (S.rush.knocked) { api.sfx('blip'); return; }
        S.rush.knocked = true; api.sfx('pop');
        mkItem('Queueing: A Guide', { emoji: '📜', cls: 'physical', w: 1, likeness: 70, key: 'pamphlet' });
        sayI('spam', 3, 'Management', 'smug', 1); flush();
      }
      function drainQueue() {
        const q = S.rush.queue.splice(0);
        q.forEach(function (id, i) { after(60 * (i + 1), function () { retrieve(id, {}); }); });
        return q.length;
      }
      function endRush() {
        setPhase('play'); S.rush.cool = api.now() + D(20000); S.bursts = [];
        hatchBox.classList.remove(k('shut')); rsign.textContent = ''; api.sfx('bell');
        sayI('spam', 6, 'Lyle', 'neutral', 1);
        const q = drainQueue();
        after(60 * q + 500, function () { sayI('spam', 7, 'Management', 'smug', 0); });
        flush();
      }
      /* ---------------- the self phase ---------------- */
      function startSelf(it) {
        setPhase('self'); S.selfItem = it.id;
        hatchBox.classList.add(k('away')); root.classList.add(k('selfon'));
        sayI('self', 0, 'Management', 'confused', 1);
        after(D(2800), function () { sayI('self', 1, 'Management', 'confused', 1); });
        for (let i = 1; i <= 11; i++) after(D(1000 * i), function () { api.sfx('tick'); });
        after(D(12000), endSelf); after(D(20000), endSelf);
      }
      function endSelf() {
        if (S.phase !== 'self') return;
        const it = byId(S.selfItem);
        setPhase('play'); hatchBox.classList.remove(k('away')); root.classList.remove(k('selfon'));
        if (S.beat >= 10 && !S.hbDone) { S.phase = 'handback'; armHandbackWatch(); }
        if (it) {
          const st = newestStub(it.id); if (st) st.torn = true;
          if (it.loc === 'rack' || it.loc === 'hand') { it.loc = 'hand'; toTray(it); }
          it.base = 'You (Valued Employee)'; it.brackets = ['2% More Coat']; it.drift = ['is 2 percent more coat']; it.depth = 1; it.key = ''; it.emoji = '🙂'; it.stampAt = api.now(); S.technically++; it.stampTxt = stampText();
        }
        S.titleSuffix = ': ' + String(api.player.name || 'Valued Employee').slice(0, 24) + ' (2% More Coat)';
        api.setTitle('Coat Check, Counter 7 1/2' + S.titleSuffix);
        api.award(6, 'self'); api.achieve('coat-check.self'); api.sfx('fanfare'); api.confetti();
        sayI('self', 2, 'Management', 'proud', 1);
        after(D(2200), function () { sayI('self', 3, 'Lyle', 'neutral', 1); });
        after(D(4600), function () { sayI('self', 4, 'Management', 'smug', 0); });
        drainQueue(); later(1500, flush); recompute();
      }
      /* ---------------- idle, wake, bell, tips ---------------- */
      function touch() { S.lastInput = api.now(); wake(); }
      function wake() {
        if (S.asleep) { S.asleep = false; hatchBox.classList.remove(k('asleep')); }
        S.flags.idleChat = 0;
        if (!S.idleStage) return;
        S.idleStage = 0; S.flags.idleChat = 0; root.classList.remove(k('committee')); hatchBox.classList.remove(k('away'));
        const a = byId(S.afternoon);
        if (a && a.loc === 'rack') { a.locked = false; a.fixed = false; driftOnce(a); a.loc = 'hand'; toTray(a); a.stampAt = api.now(); a.stampTxt = 'TECHNICALLY YOURS'; }
        S.afternoon = 0;
        sayR('wake', 'Lyle', null, 'neutral', 1); api.sfx('bell'); flush();
      }
      function idleWatch(now) {
        if (S.phase !== 'play') return;
        const K = api.selftest ? 0.3 : 1, idle = now - S.lastInput;
        if (S.idleStage < 1 && !S.flags.idleChat && idle > 25000 * K) { S.flags.idleChat = 1; sayR('idlea', 'Lyle', null, 'neutral', 0); }
        if (S.idleStage >= 1 && idle >= S.idleSay) { S.idleSay = idle + 20000 * K; sayR('idlex', 'Management', null, 'neutral', 0); }
        if (S.idleStage === 0 && idle >= 45000 * K) {
          S.idleStage = 1; S.idleSay = idle + 16000 * K;
          const a = mkItem("Lyle's Afternoon", { emoji: '🕰', cls: 'cameo', w: 1, locked: true, fixed: true, key: 'afternoon', loc: 'hand' });
          const h = resolveHook(api.randInt(0, S.hooks - 1), a);
          if (h >= 0) { place(a, h); S.afternoon = a.id; } else removeItem(a);
          hatchBox.classList.add(k('away')); sayI('idle', 0, 'Management', 'confused', 1); api.sfx('bell'); flush();
        } else if (S.idleStage === 1 && idle >= 90000 * K) {
          S.idleStage = 2;
          const grp = {}; inLoc('rack').forEach(function (i) { (grp[i.hook] = grp[i.hook] || []).push(i); });
          const hs = Object.keys(grp).map(Number), perm = api.shuffle(hs);
          hs.forEach(function (h, i) { grp[h].forEach(function (it) { it.hook = perm[i]; }); });
          root.classList.add(k('committee')); sayI('idle', 1, 'Management', 'smug', 1); api.sfx('tick'); flush();
        } else if (S.idleStage === 2 && idle >= 120000 * K) {
          S.idleStage = 3; if (!S.items.some(function (i) { return i.key === 'you'; })) mkItem('You (Valued Employee, Partial)', { emoji: '🙂', cls: 'self', w: 2, key: 'you' });
          sayI('idle', 2, 'Management', 'disappointed', 1); api.sfx('pop'); flush();
        } else if (S.idleStage === 3 && idle >= 150000 * K) {
          S.idleStage = 4; if (!S.items.some(function (i) { return i.key === 'nothing'; })) mkItem('Nothing, Checked Carefully', { emoji: '🎫', cls: 'abstract', w: 0, key: 'nothing' });
          sayI('stayed', 0, 'Management', 'proud', 1); api.sfx('whoosh'); flush();
        } else if (S.idleStage === 4 && idle >= 200000 * K) {
          S.idleStage = 5; addStub({ n: ++S.stubN, name: 'MINUTES', raw: 'MINUTES OF THE COMMITTEE (1 PAGE, BLANK, SIGNED)', item: 0, torn: false });
          sayI('idle', 3, 'Management', 'smug', 1); api.sfx('stamp'); flush();
        }
      }
      function ringBell() {
        touch(); stat('bells'); api.sfx('bell'); api.award(0.1, 'bell');
        const now = api.now(); S.bellRun = now - S.lastBell < 1600 ? S.bellRun + 1 : 1; S.lastBell = now;
        if (S.bellRun >= 3 && S.bellRun % 2) sayR('bellx', 'Lyle', null, 'confused', 1); else sayR('bell', 'Lyle'); burst();
        hatchBox.classList.add(k('open')); later(300, function () { hatchBox.classList.remove(k('open')); });
      }
      function tipJar() {
        touch(); S.tips++; stat('tips'); api.sfx('bloop');
        const paid = -api.award(-1, 'tip');
        api.setTimeout(function () { if (!api.destroyed && paid > 0) { api.award(paid, 'tip returned'); api.sfx('blip'); } }, D(700));
        const n = S.tips;
        if (n === 9) { addStub({ n: ++S.stubN, name: 'FEELING (1)', item: 0, torn: false }); sayI('tip', 3, 'Lyle', 'confused', 1); flush(); }
        else if (n === 20) { api.confetti(); sayI('tip', 4, 'Lyle', 'proud', 1); api.achieve('coat-check.feeling'); }
        else if (n <= 3) sayI('tip', n - 1, 'Lyle'); else sayR('tipx', 'Lyle');
      }
      function holdLyle() {
        touch(); api.sfx('bell');
        S.lyleHold++;
        if (S.lyleHold === 1) {
          addStub({ n: '?', raw: 'STUB ? of ' + den() + ": LYLE'S LUNCH BREAK (2004)", name: "LYLE'S LUNCH BREAK (2004)", item: 0, torn: false, locked: true });
          api.achieve('coat-check.lyle'); api.award(2, 'lyle'); sayI('lyle', 5, 'Lyle', 'neutral', 1); later(D(3600), function () { sayI('lyle', 6, 'Management', 'proud', 1); }); flush();
        } else sayR('extra', 'Management');
      }
      /* ---------------- back room, mini, Sandra, creep, fusion, conveyor ---------------- */
      function nestUp() {
        S.nest = Math.min(3, S.nest + 1); renderMini(); applyFeatures(); api.sfx('pop');
        later(D(1400), function () { sayI('recursion', S.nest >= 3 ? 2 : 0, 'Management', 'confused', 1); });
        if (S.nest === 1) later(D(5200), function () { sayI('recursion', 1, 'Management'); });
      }
      function miniHook(i) {
        S.mini[i] = true; renderMini(); touch(); api.sfx('bloop'); S.miniN++;
        sayI('recursion', S.miniN % 2 ? 1 : 3, 'Lyle', 'neutral', 0);
      }
      function sandraCheck(now) {
        if (!feat.sandra || S.flags.sandraDone || S.phase !== 'play') return;
        const a = S.items.filter(function (i) { return i.loc === 'rack' && i.likeness !== null && i.likeness !== undefined; }).sort(function (x, y) { return x.hook - y.hook || x.born - y.born; });
        let ok = a.length >= 3;
        for (let i = 1; i < a.length && ok; i++) if (a[i].likeness > a[i - 1].likeness) ok = false;
        if (!ok) { S.sandraSince = 0; return; }
        if (!S.sandraSince) { S.sandraSince = now; return; }
        if (now - S.sandraSince >= D(5000)) {
          S.flags.sandraDone = 1; banner.textContent = 'SANDRA (COMPLIANCE): ITEMS MUST HANG IN ORDER, BUT SADDER.';
          api.award(1, 'Sandra'); api.sfx('ding'); sayI('sandra', 2, 'Management', 'smug', 1);
        }
      }
      function creep() {
        if (!feat.creep || S.phase !== 'play') return;
        const c1 = Math.floor((S.hooks - 1) / 2), c2 = Math.ceil((S.hooks - 1) / 2), dragId = S.drag ? S.drag.id : -1;
        const cand = S.items.filter(function (i) { return i.loc === 'rack' && !i.locked && !i.fixed && i.hook !== c1 && i.hook !== c2 && i.id !== dragId && i.id !== S.sel; });
        if (!cand.length) return;
        const it = api.pick(cand), to = it.hook < c1 ? it.hook + 1 : it.hook - 1, o = occ(to);
        if (o.length >= 2 || (o.length === 1 && (o[0].fused || o[0].locked || it.fused))) return;
        place(it, to, true); api.sfx('tick');
        if (!S.flags.creepSaid || api.chance(0.35)) { S.flags.creepSaid = 1; sayR('creep', api.chance(0.5) ? 'Lyle' : 'Management'); }
        if (!S.flags.sandraLean && feat.sandra) { S.flags.sandraLean = 1; later(D(3500), function () { sayI('sandra', 4, 'Management'); }); }
        flush(); persist();
      }
      function fuseCheck(now) {
        if (!feat.fusion || S.phase !== 'play') return;
        const dragId = S.drag ? S.drag.id : -1;
        for (let h = 0; h < S.hooks; h++) {
          const o = occ(h);
          if (o.length !== 2) continue;
          if (o.some(function (x) { return x.fused || x.locked || x.fixed || x.patron || x.key; })) continue;
          if (o.some(function (x) { return x.id === dragId || x.id === S.sel; })) { o[0].shareSince = o[1].shareSince = now; continue; }
          if (now - Math.max(o[0].shareSince, o[1].shareSince) >= D(10000)) { fuse(o[0], o[1]); break; }
        }
      }
      function fuse(a, b) {
        const names = [a.base, b.base];
        const f = mkItem(portmanteau(a.base, b.base), {
          emoji: a.emoji + b.emoji, cls: a.cls, w: a.w + b.w, heavy: a.heavy + b.heavy, likeness: a.likeness, depth: Math.max(a.depth, b.depth), fused: names, loc: 'hand',
          checks: Math.max(a.checks, b.checks), stubAt: Math.max(a.stubAt, b.stubAt)
        });
        const dr = a.drift.concat(b.drift).filter(function (v, i, arr) { return arr.indexOf(v) === i; }); f.drift = dr.slice(-12);
        f.brackets = a.brackets.concat(b.brackets).filter(function (v, i, arr) { return arr.indexOf(v) === i; }).slice(-3);
        const hook = a.hook;
        const sa = newestStub(a.id), sb = newestStub(b.id);
        let pos = S.stubs.length;
        [sa, sb].forEach(function (s) { if (s) { const i = S.stubs.indexOf(s); if (i >= 0) { S.stubs.splice(i, 1); pos = Math.min(pos, i); } } });
        removeItem(a); removeItem(b); place(f, hook, true);
        addStub({ n: (sa ? sa.n : '?') + '+' + (sb ? sb.n : '?'), name: portmanteau(a.base, b.base).toUpperCase(), item: f.id, torn: false, pair: true });
        stat('fused'); api.award(2, 'fusion'); api.achieve('coat-check.fusion'); api.sfx('fanfare'); api.confetti(undefined, undefined, 6);
        sayR('fusion', 'Management', { item: names[0] }, 'proud', 1); backReact('fuse', f);
        if (!S.flags.medal) { S.flags.medal = 1; api.award(3, 'medal'); later(D(3500), function () { sayI('medal', 0, 'Management', 'proud', 1); }); }
        recompute();
      }
      function rotate() {
        if (!feat.conv || S.phase !== 'play') return;
        const H = S.hooks, now = api.now();
        S.items.slice().forEach(function (it) {
          if (it.loc !== 'rack') return;
          const was = it.hook; it.hook = (it.hook + 1) % H; it.rot2 = (it.rot2 || 0) + 1;
          if (was === H - 1 && !it.locked && !it.fixed) { driftOnce(it); backCap('an item re-emerges, changed'); }
          if (it.patron && it.rot2 >= 2 * H) { removeItem(it); }
        });
        api.sfx('tick');
        if (now - S.lastConv > D(40000)) { S.lastConv = now; sayR('conveyor', api.chance(0.5) ? 'Lyle' : 'Management'); }
        flush(); persist();
      }
      function patron() {
        if (!feat.conv || S.phase !== 'play') return;
        if (S.items.filter(function (i) { return i.patron && i.loc === 'rack'; }).length >= 2) return;
        const free = []; for (let h = 0; h < S.hooks - 1; h++) if (!occ(h).length) free.push(h);
        if (!free.length) return;
        S.patronN = (S.patronN || 0) + 1;
        const base = PATRONS[(S.patronN - 1) % PATRONS.length], em = /Umbrella/.test(base) ? '🌂' : /Tuesday/.test(base) ? '📅' : '🧥';
        const it = mkItem(base, { emoji: em, cls: 'physical', w: 3, patron: true, locked: true, likeness: null, loc: 'hand' });
        place(it, api.pick(free)); api.sfx('pop');
        sayI('conveyor', S.patronN === 1 ? 3 : 6, 'Management'); flush();
      }
      function wobble() {
        S.tyWobble = S.settled ? 0 : Math.round((api.rand() * 0.6 - 0.3) * 100) / 100;
        S.mcap = api.line(LC + 'meter');
        renderMeter(); mcap.textContent = S.mcap;
        const now = api.now();
        if (feat.meter && now - S.lastMeterSay > D(60000)) { S.lastMeterSay = now; say(S.mcap, 'Management', 'smug', 0); }
      }
      function clockStep() {
        if (S.clock >= 59) return;
        S.clock++;
        clockTxt.textContent = '4:' + String(S.clock).padStart(2, '0') + ' PM'; mhand.style.transform = 'rotate(' + (S.clock * 6) + 'deg)';
        if (S.clock === 17 && !S.t417) { S.t417 = 1; sayI('time', 0, 'Lyle', 'neutral', 1); api.setTimeout(function () { if (!api.destroyed) sayI('time', 1, 'Lyle', 'neutral', 1); }, D(1500)); if (api.flag.get('tiny-bureaucracy.clock731')) later(D(5200), function () { sayI('time', 5, 'Management', 'smug', 0); }); } // lint-ignore shared callback flag
        if (S.clock === 59) { sayI('time', 2, 'Management', 'smug', 1); later(D(20000), function () { sayI('time', 3, 'Lyle'); }); later(D(52000), function () { sayI('time', 4, 'Lyle'); }); }
      }
      function halfHang(it) {
        if (!it || it.locked) return false;
        it.loc = 'hand'; it.slot = '';
        sayI('halfhook', 1, 'Lyle', 'confused', 1);
        S.ticketK++; act();
        driftOnce(it); driftOnce(it, 'from the future'); it.tag = 'from the future';
        if (api.chance(0.1)) { it.base = 'Your Coat, But More Yours'; api.award(1, 'more yours'); }
        toTray(it); it.stampAt = api.now(); S.technically++; it.stampTxt = stampText(); afterDrift(it);
        api.achieve('coat-check.half'); api.award(1, 'half hook'); api.sfx('whoosh'); later(D(2400), function () { sayI('halfhook', 2, 'Lyle'); });
        later(1500, flush); recompute(); return true;
      }
      /* ---------------- mannequin ---------------- */
      function wear(it) {
        if (!it || it.locked || !feat.mann || it.loc !== 'tray') return false;
        let slot = 'aura';
        for (let i = 0; i < WEARSLOT.length; i++) if (WEARSLOT[i][0].test(it.base)) { slot = WEARSLOT[i][1]; break; }
        it.loc = 'hand';
        let worn = inLoc('worn');
        if (slot !== 'aura' && worn.some(function (w) { return w.slot === slot; })) slot = 'aura';
        if (worn.length >= 8 || (slot === 'aura' && worn.filter(function (w) { return w.slot === 'aura'; }).length >= 5)) {
          worn.sort(function (a, b) { return (a.wornAt || 0) - (b.wornAt || 0); });
          const old = worn.find(function (w) { return slot !== 'aura' || w.slot === 'aura'; }) || worn[0];
          old.loc = 'hand'; toTray(old); old.slot = '';
        }
        it.slot = slot; it.loc = 'worn'; it.wornAt = api.now(); if (S.sel === it.id) S.sel = null;
        stat('worn'); act(); api.award(0.5, 'wear'); api.achieve('coat-check.wear'); api.sfx('bloop');
        worn = inLoc('worn');
        const WB = { 'A Tuesday': 0, 'The Concept of Q3': 3, 'Coat': 4 };
        if (WB[it.base] !== undefined) sayI('wear', WB[it.base], WB[it.base] === 4 ? 'Lyle' : 'Management', 'proud', 0);
        else if (worn.length >= 6) sayI('wear', 7, 'Management');
        else if (api.chance(0.5)) sayI('wear', 5, 'Lyle', { item: displayName(it) }); else sayI('wear', 6, 'Management');
        cap('Wearing: ' + displayName(it) + '.'); recompute(); return true;
      }
      function unwear(it) {
        if (!it || it.loc !== 'worn') return;
        it.loc = 'hand'; toTray(it); it.slot = ''; api.sfx('bloop'); sayI('wear', 8, 'Lyle', { item: displayName(it) }); cap('Took off: ' + displayName(it) + '.'); recompute();
      }
      /* ---------------- beats, arrivals, handback, reset ---------------- */
      function beatTick(now) {
        if (S.phase !== 'play' || S.beat >= 10 || S.idleStage >= 1) return;
        const e = now - S.beatAt;
        if (e >= 40000 * SC && (S.actAtBeat >= NEED[S.beat] || e >= 70000 * SC) && !(S.beat === 9 && !S.flags.lytOn && e < 130000 * SC)) advance();
      }
      function advance() {
        S.beat++; S.beatAt = api.now(); S.actAtBeat = 0; stat('beats'); api.award(5, 'beat'); api.sfx('tada');
        applyFeatures(); enterBeat(S.beat); persist(); flush();
      }
      function enterBeat(n) {
        if (BEATS[n]) say(BEATS[n], 'Management', n === 10 ? 'proud' : 'neutral', 1);
        if (n === 2) cap('The meter has appeared. It reads 99.2. It is, technically, accurate.');
        if (n === 3) ['A Tuesday', 'A Vague Unease', 'The Concept of Q3'].forEach(function (b, i) { later(120 * (i + 1), function () { mkItem(b); api.sfx('pop'); flush(); }); });
        if (n === 4) { backCap('the glass is lit. a shape waves'); later(D(3000), function () { sayI('sandra', 0, 'Management', 'smug', 1); }); later(D(9000), function () { sayI('sandra', 3, 'Management'); }); }
        if (n === 6) later(D(3500), function () { sayI('ticketx', 0, 'Lyle'); });
        if (n === 7) later(D(3000), function () { sayI('wear', 1, 'Management'); });
        if (n === 8) {
          later(D(3000), function () { sayI('conveyor', 0, 'Management'); }); later(D(7000), function () { sayI('dennis', 0, 'Management'); });
          if (api.stat.get('suggestion-box.entered') > 0 && !S.flags.cross8) { S.flags.cross8 = 1; later(D(11000), function () { sayI('cross', 2, 'Management'); }); }
        }
        if (n === 9) {
          mkItem('The Coat Check (Partially)', { emoji: '🧥', cls: 'physical', w: 20, likeness: 40, key: 'coatcheck' }); api.sfx('pop');
          lyleSeq();
        }
        if (n === 10) startHandback();
      }
      function lyleSeq() {
        later(D(30000), function () {
          if (S.beat !== 9) return;
          sayI('lyle', 0, 'Lyle', 'neutral', 1); later(D(5000), function () { sayI('lyle', 1, 'Lyle', 'neutral', 1); });
          later(D(9500), function () { mkItem("Lyle's Own Coat (Worn Through, Sentimental)", { emoji: '🧥', cls: 'cameo', w: 3, likeness: null, key: 'lylecoat' }); api.sfx('pop'); sayI('lyle', 7, 'Management', 'smug', 1); flush(); });
          later(D(14000), function () { S.flags.lytOn = 1; applyFeatures(); sayI('lyle', 4, 'Management', 'proud', 1); });
        });
      }
      function arrivals(now) {
        if (S.phase !== 'play') return;
        if (S.beat < 2 && !S.endingPending) return;
        if (!(S.actSinceArr >= 2 || now - S.lastArr >= D(18000))) return;
        S.lastArr = now; S.actSinceArr = 0;
        if (S.endingPending) {
          S.endingPending = false; mkItem('The Ending (Please Check)', { emoji: '🎫', cls: 'abstract', w: 30, key: 'ending' }); api.sfx('pop'); sayI('ending', 0, 'Management', 'smug', 1); flush(); return;
        }
        if (S.bagBeat !== S.beat) { S.bagBeat = S.beat; S.pileBag = new Bag(ITEMS.filter(function (r) { return r[6] <= S.beat && (r[0] !== 'Coat' || S.beat >= 3); }).map(function (r) { return r[0]; })); }
        const base = S.pileBag.next();
        mkItem(base); api.sfx(sfxBag.next());
        const pile = inLoc('pile');
        if (pile.length > 40) { removeItem(pile[0]); sayI('pilex', 2, 'Management'); }
        else if (base === 'Coat') sayI('pilex', 0, 'Management');
        else if (pile.length === 19) sayI('pilex', 1, 'Management');
        else if (api.chance(0.3)) sayR('pile', 'Management');
        flush();
      }
      function startHandback() {
        setPhase('handback'); S.settled = true; S.hbDone = false;
        hatchBox.classList.remove(k('away'), k('shut'));
        const o = mkItem('Coat', { brackets: ['Original', 'Retrieved'], depth: 107, tag: 'a coat in spirit, in colour, and in a smaller, legal sense', note: 'a coat in spirit', key: 'orig', loc: 'hand', checks: 4 });
        toTray(o); S.hbItem = o.id; S.sel = o.id; api.sfx('bell');
        cap('Your original coat has been retrieved. Take it home with the button, the mat, or the H key.');
        sayI('handback', 0, 'Management', 'proud', 1);
        after(D(4000), function () { sayI('handback', 5, 'Management', 'smug', 0); });
        after(D(8000), function () { sayI('handback', 6, 'Management', 'smug', 0); });
        armHandbackWatch();
        flush();
      }
      function armHandbackWatch() {
        after(D(20000), function () {
          if (S.phase !== 'handback' || S.hbDone) return;
          say('It is yours. Technically.', 'Lyle', 'neutral', 1);
          const hb = byId(S.hbItem);
          if (hb) takeHome(hb); else handbackDone();
        });
      }
      function handbackDone() {
        if (S.hbDone) return; S.hbDone = true;
        addStub({ n: ++S.stubN, name: 'CERTIFICATE', raw: 'You have retrieved everything. Everything is slightly different. This has been our promise.', item: 0, torn: false });
        api.confetti(undefined, undefined, 18); api.sfx('tada'); api.award(5, 'handback'); api.achieve('coat-check.handback');
        sayI('handback', 1, 'Management', 'proud', 1);
        after(D(2000), function () { sayI('handback', 2, 'Management', 'proud', 1); });
        after(D(3800), function () { sayI('handback', 3, 'Lyle', 'neutral', 2); });
        later(D(6000), function () { resetLoop(); });
        flush(); persist();
      }
      function resetLoop() {
        setPhase('reset'); S.loopId++;
        const keep = {}; ['medal', 'cross1', 'cross8', 'crossTue', 'd7', 't417'].forEach(function (n) { if (S.flags[n]) keep[n] = 1; });
        S.flags = keep; S.items = []; S.stubs = []; S.stubsHidden = 0; S.sel = null; S.nest = 0; S.mini = [false, false, false];
        S.beat = 1; S.beatAt = api.now(); S.actAtBeat = 0; S.actions = 0; S.stubN = 0; S.ticketK = 0; S.hooks = 6; S.retrievals = 0; S.technically = 0;
        S.loops++; stat('loops'); S.world = (S.world + 2) % 360; S.settled = false; S.sagLines = {}; S.hungBases = {}; S.rush = { until: 0, queue: [], knocked: false, cool: 0 }; S.bursts = [];
        S.idleStage = 0; S.endingPending = true; S.hbDone = false; S.hbItem = 0; S.expanding = false; S.afternoon = 0; S.lyleHold = 0; S.printed = true; S.actSinceArr = 0; S.lastArr = api.now(); S.bagBeat = 0;
        banner.textContent = 'SANDRA (COMPLIANCE): ITEMS MUST HANG IN ORDER OF HOW COAT-LIKE THEY ARE.';
        ['committee', 'shut', 'away', 'selfon', 'open'].forEach(function (c) { root.classList.remove(k(c)); hatchBox.classList.remove(k(c)); });
        hatchBox.classList.remove(k('asleep')); rsign.textContent = '';
        mkItem('Coat'); applyFeatures(); renderMini(); api.sfx('whoosh');
        if (!reduced()) { root.classList.add(k('wipe')); api.setTimeout(function () { root.classList.remove(k('wipe')); }, 900); }
        after(200, function () {
          S.phase = 'play'; S.beatAt = api.now();
          say(api.line(LC + 'againm'), 'Management', 'proud', 1);
          after(D(1800), function () { sayR('next', 'Lyle', null, 'neutral', 1); });
          after(D(2600), function () { sayI('handback', 4, 'Management', 'neutral', 0); });
        });
        persist(); flush();
      }
      function startOpening(mode) {
        S.asleep = true; hatchBox.classList.add(k('asleep'));
        after(D(400), function () {
          S.printed = true; api.sfx('tick'); flush();
          if (mode === 'back') sayR('backm', 'Management', null, 'proud', 1); else if (mode === 'again') sayR('againm', 'Management', null, 'proud', 1); else sayI('openm', 0, 'Management', 'proud', 1);
        });
        after(D(1600), function () { if (mode === 'new') sayI('openm', 1, 'Management', 'proud', 0); });
        after(D(3000), function () { if (S.asleep) { S.asleep = false; hatchBox.classList.remove(k('asleep')); } sayI('openl', 0, 'Lyle', 'neutral', 1); api.sfx('blip'); });
        after(D(7000), function () { if (!S.actions) sayI('openl', 4, 'Lyle', 'neutral', 0); });
        after(D(15000), function () { if (!S.actions) sayI('openl', 1 + api.randInt(0, 2), 'Lyle', 'neutral', 0); });
        if (mode !== 'new') after(D(2500), function () { if (BEATS[S.beat]) say(BEATS[S.beat], 'Management', 'neutral', 0); });
      }
      /* ---------------- save / restore ---------------- */
      function persist() {
        if (S.pT || api.destroyed) return;
        S.pT = api.setTimeout(function () { S.pT = 0; persistNow(); }, 800);
      }
      function persistNow() {
        try {
          const items = S.items.filter(function (i) { return !i.locked && !i.fixed && i.loc !== 'hand'; }).slice(0, 70), idx = {};
          items.forEach(function (i, n) { idx[i.id] = n; });
          const v = {
            loops: num(S.loops), world: num(S.world), beat: Math.min(9, num(S.beat)), ticketK: num(S.ticketK), stubN: num(S.stubN), retrievals: num(S.retrievals), checks: num(S.checks),
            technically: num(S.technically), hooks: num(S.hooks), stubsHidden: num(S.stubsHidden), sessions: num(S.sessions), total: num(S.total),
            items: items.map(function (i) {
              return {
                b: cut40(i.base), e: String(i.emoji).slice(0, 12), c: String(i.cls).slice(0, 12), w: num(i.w), h: num(i.heavy), l: (i.likeness === null || i.likeness === undefined) ? null : num(i.likeness),
                d: num(i.depth), dr: i.drift.slice(-12).map(cut40), br: i.brackets.slice(-3).map(cut40), g: num(i.gen), ck: num(i.checks), loc: i.loc, hk: num(i.hook), sl: String(i.slot || '').slice(0, 8),
                f: i.fused ? i.fused.slice(0, 2).map(cut40) : 0, tg: cut40(i.tag), k: String(i.key || '').slice(0, 12), bd: String(i.badge || '').slice(0, 4)
              };
            }),
            stubs: S.stubs.slice(-60).map(function (s) { return [String(s.n).slice(0, 12), cut40(s.name), idx[s.item] !== undefined ? idx[s.item] : -1, s.torn ? 1 : 0, s.raw ? String(s.raw).slice(0, 110) : '', s.pair ? 1 : 0, s.locked ? 1 : 0]; }),
            worn: items.map(function (i, n) { return i.loc === 'worn' ? n : -1; }).filter(function (n) { return n >= 0; })
          };
          api.save.set('v', v);
        } catch (_) { /* saving never throws */ }
      }
      function restore() {
        try {
          const v = api.save.get('v', null);
          if (!v || typeof v !== 'object' || Array.isArray(v) || !Array.isArray(v.items)) return false;
          const ni = function (x, a, b) { return Math.floor(clamp(x, a, b)); }, isS = function (s) { return typeof s === 'string'; };
          S.loops = ni(v.loops, 0, 99999); S.world = ni(v.world, 0, 359); S.beat = ni(v.beat, 1, 9); S.ticketK = ni(v.ticketK, 0, 99999); S.stubN = ni(v.stubN, 0, 999999);
          S.retrievals = ni(v.retrievals, 0, 999999); S.checks = ni(v.checks, 0, 999999); S.technically = ni(v.technically, 0, 999999); S.hooks = ni(v.hooks, 6, 16);
          S.stubsHidden = ni(v.stubsHidden, 0, 999999); S.sessions = ni(v.sessions, 0, 999999); S.total = ni(v.total, 0, 9999999);
          const made = [], CL = ['physical', 'time', 'feeling', 'corporate', 'abstract', 'self', 'cameo'], KEYS = ['ending', 'you', 'coatcheck', 'lylecoat', 'nothing', 'sock', 'pamphlet', 'gerald', 'orig'];
          const cnt = { tray: 0, worn: 0 };
          v.items.slice(0, 70).forEach(function (r) {
            if (!r || typeof r !== 'object' || !isS(r.b) || !r.b || !isS(r.e)) { made.push(null); return; }
            let loc = ['pile', 'rack', 'tray', 'worn'].indexOf(r.loc) >= 0 ? r.loc : 'pile', hook = ni(r.hk, 0, S.hooks - 1), slot = ['head', 'neck', 'torso', 'aura'].indexOf(r.sl) >= 0 ? r.sl : 'aura';
            if (loc === 'rack' && occ(hook).length >= 2) loc = 'pile';
            if (loc === 'tray' && ++cnt.tray > 8) loc = 'pile';
            if (loc === 'worn' && ++cnt.worn > 8) loc = 'pile';
            const list = function (a, n) { return Array.isArray(a) ? a.filter(isS).slice(-n).map(cut40) : []; };
            const it = mkItem(cut40(r.b), {
              emoji: r.e.slice(0, 12) || '🎫', cls: CL.indexOf(r.c) >= 0 ? r.c : 'physical', w: clamp(r.w, 0, 999), heavy: clamp(r.h, 0, 999), likeness: (r.l === null || r.l === undefined) ? null : clamp(r.l, 0, 100),
              depth: ni(r.d, 0, 99999), drift: list(r.dr, 12), brackets: list(r.br, 3), gen: ni(r.g, 0, 99), checks: ni(r.ck, 0, 99999), loc: 'pile', hook: -1,
              fused: Array.isArray(r.f) ? list(r.f, 2) : null, tag: isS(r.tg) ? cut40(r.tg) : '', key: KEYS.indexOf(r.k) >= 0 ? r.k : '', badge: isS(r.bd) ? r.bd.slice(0, 4) : ''
            });
            if (it.gen) it.root = it.base.replace(/^The (Idea of The )?/, '');
            if (loc === 'rack') place(it, hook); else if (loc === 'tray') { it.loc = 'tray'; it.trayAt = made.length; } else if (loc === 'worn') { it.loc = 'worn'; it.slot = slot; it.wornAt = made.length; }
            made.push(it);
          });
          if (Array.isArray(v.stubs)) v.stubs.slice(-60).forEach(function (s) {
            if (!Array.isArray(s) || !isS(s[0]) || !isS(s[1]) || /\b(undefined|NaN|null)\b|\[object/.test(s[0] + ' ' + s[1] + ' ' + (isS(s[4]) ? s[4] : ''))) return;
            const t = made[ni(s[2], -1, 69)];
            S.stubs.push({ n: /^\d{1,9}$/.test(s[0]) ? +s[0] : s[0].slice(0, 12), name: cut40(s[1]), item: t ? t.id : 0, torn: !!s[3], raw: isS(s[4]) ? s[4].slice(0, 110) : '', pair: !!s[5], locked: !!s[6] });
          });
          if (!S.items.some(function (i) { return i.loc === 'pile' || i.loc === 'rack' || i.loc === 'tray' || i.loc === 'worn'; })) mkItem('Coat');
          S.printed = true;
          return true;
        } catch (_) {
          S.items = []; S.stubs = []; S.hooks = 6; S.beat = 1; S.loops = 0; S.world = 0; S.total = 0;
          return false;
        }
      }
      /* ---------------- drag (one implementation, root/document level) ---------------- */
      let ghost = null, hstr = null;
      function capture(t, e) { try { t.setPointerCapture(e.pointerId); } catch (_) { /* synthetic pointer */ } }
      function makeGhost(d) {
        const it = byId(d.id); if (!it) return;
        ghost = el('div', { class: k('ghost'), 'aria-hidden': 'true' }, el('b', { text: it.emoji }), el('span', { text: cutE(displayName(it), 16) }));
        hstr = el('div', { class: k('hstr'), 'aria-hidden': 'true' });
        ov.appendChild(hstr); ov.appendChild(ghost); api.sfx('pop');
      }
      function moveGhost(d) {
        if (!ghost) return;
        const r = root.getBoundingClientRect(), x = d.cx - r.left, y = d.cy - r.top, sx = d.sx - r.left, sy = d.sy - r.top;
        ghost.style.transform = 'translate(' + (x - 36) + 'px,' + (y - 36) + 'px) rotate(' + clamp(d.vx / 600 * 3, -14, 14) + 'deg)';
        hstr.style.cssText = 'left:' + sx + 'px;top:' + sy + 'px;width:' + Math.hypot(x - sx, y - sy) + 'px;transform:rotate(' + Math.atan2(y - sy, x - sx) + 'rad)';
        let bi = -1, bd = 90;
        hookEls.forEach(function (h, i) {
          const hr = h.getBoundingClientRect(), dd = Math.hypot(d.cx - (hr.left + hr.width / 2), d.cy - (hr.top + hr.height / 2));
          h.classList.toggle(k('near'), dd <= 90); h.classList.remove(k('nearest'));
          if (dd < bd) { bd = dd; bi = i; }
        });
        if (bi >= 0) hookEls[bi].classList.add(k('nearest'));
      }
      function endDrag() {
        const d = S.drag; S.drag = null;
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        if (hstr && hstr.parentNode) hstr.parentNode.removeChild(hstr);
        ghost = hstr = null;
        hookEls.forEach(function (h) { h.classList.remove(k('near'), k('nearest')); });
        if (d) {
          if (d.moved) S.lastDragEnd = api.now();
          if (d.el) { if (d.kind === 'stub') d.el.style.transform = ''; try { d.el.releasePointerCapture(d.pid); } catch (_) { /* nothing captured */ } }
        }
        if (S.dirty) flush();
        return d;
      }
      function onDown(e) {
        touch();
        if (e.button > 0) return;
        if (S.drag) endDrag();
        const tg = e.target;
        const t = tg && tg.closest ? tg.closest('[data-act="chip"],[data-stub]') : null;
        if (!t || !root.contains(t)) return;
        const base = { sx: e.clientX, sy: e.clientY, cx: e.clientX, cy: e.clientY, px: e.clientX, py: e.clientY, pt: api.now(), vx: 0, dx: 0, moved: false, el: t, t0: api.now(), pid: e.pointerId, touch: e.pointerType === 'touch' };
        if (t.dataset.stub !== undefined) { if (tg.closest('[data-act="tear"]')) return; S.drag = Object.assign(base, { kind: 'stub', n: t.dataset.stub }); capture(t, e); return; }
        const it = byId(+t.dataset.id);
        if (!it || it.locked) return;
        S.drag = Object.assign(base, { kind: 'chip', id: it.id }); capture(t, e);
      }
      function onMove(e) {
        const d = S.drag; if (!d) return;
        if (api.now() - d.t0 > 15000) { endDrag(); return; }
        const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
        if (d.kind === 'stub') { if (Math.abs(dx) > 6) d.moved = true; if (d.moved) { d.dx = Math.min(0, dx); d.el.style.transform = 'translateX(' + d.dx + 'px)'; } return; }
        if (!d.moved && Math.hypot(dx, dy) >= 6) { d.moved = true; makeGhost(d); }
        if (!d.moved) return;
        const now = api.now(), dt = Math.max(1, now - d.pt);
        d.vx = ((e.clientX - d.px) / dt) * 300 + d.vx * 0.7; d.px = e.clientX; d.pt = now;
        d.cx = e.clientX; d.cy = e.clientY - (d.touch ? 40 : 0);
        moveGhost(d);
      }
      function onUp(e) {
        const d = S.drag; if (!d) return;
        endDrag();
        if (!d.moved) return;
        if (d.kind === 'stub') { if (d.dx <= -60) tearStub(d.n, { shift: !!e.shiftKey }); else { sayI('tear', 1, 'Lyle'); flush(); } return; }
        const it = byId(d.id); if (it) drop(it, d.cx, d.cy);
      }
      function drop(it, cx, cy) {
        let best = -1, bd = 1e9;
        hookEls.forEach(function (h, i) {
          const r = h.getBoundingClientRect(), dd = Math.hypot(cx - (r.left + r.width / 2), cy - (r.top + r.height / 2));
          if (dd < bd) { bd = dd; best = i; }
        });
        if (!halfHook.hidden) {
          const r = halfHook.getBoundingClientRect(), dd = Math.hypot(cx - (r.left + r.width / 2), cy - (r.top + r.height / 2));
          if (dd <= 30 && dd < bd) { hangItem(it, 'half'); return; }
        }
        if (best >= 0 && bd <= 34) { hangItem(it, best); return; }
        const inR = function (n) { const r = n.getBoundingClientRect(); return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom; };
        if (feat.mann && it.loc === 'tray' && inR(mq)) { wear(it); return; }
        if (it.loc === 'tray' && (inR(mat) || inR(homeBtn))) { takeHome(it); return; }
        floorDrop(it);
      }
      /* ---------------- clicks and keys ---------------- */
      const ACT = {
        chip: function (t) { select(+t.dataset.id); },
        hung: function (t) { select(+t.dataset.id); },
        hook: function (t) {
          const i = +t.dataset.i, sel = byId(S.sel);
          S.ring = i;
          if (sel && sel.loc !== 'rack') { hangItem(sel, i); return; }
          const o = occ(i);
          if (o.length) select(o[0].id); else { cap('Hook ' + (i + 1) + ' is empty. It is patient.'); flush(); }
        },
        stubsel: function (t) {
          let s = null; for (let i = 0; i < S.stubs.length; i++) if (String(S.stubs[i].n) === t.dataset.n) s = S.stubs[i];
          if (!s) return;
          const it = s.item ? byId(s.item) : null;
          if (it && it.loc === 'rack') select(it.id); else { cap(stubText(s)); api.sfx('tick'); }
        },
        tear: function (t, shift) { tearStub(t.dataset.n, { shift: shift }); },
        hatch: function (t, shift) {
          if (S.phase === 'rush') { knock(); return; }
          const sel = byId(S.sel);
          if (sel && sel.loc === 'rack') retrieve(sel.id, { shift: shift }); else retrieve(null, { shift: shift });
        },
        bell: function () { ringBell(); },
        jar: function () { tipJar(); },
        lyt: function () { holdLyle(); },
        home: function () {
          const it = byId(S.sel), hb = byId(S.hbItem);
          if (it && it.loc === 'tray') takeHome(it); else if (S.phase === 'handback' && hb && hb.loc === 'tray') takeHome(hb);
          else { cap('Select something on the tray first. Then take it home.'); api.sfx('blip'); }
        },
        mann: function () {
          const it = byId(S.sel);
          if (it && it.loc === 'tray') wear(it); else { cap('Select something on the tray first. The mannequin is patient.'); api.sfx('blip'); }
        },
        dennis: function () {
          api.sfx('pop');
          if (api.flag.get('metDennis') && !S.flags.dennisMet) { S.flags.dennisMet = 1; sayI('dennis', 4, 'Management'); } else sayR('dennis', 'Management');
        },
        mini: function (t) { miniHook(+t.dataset.i); },
        half: function () {
          const it = byId(S.sel);
          if (it && it.loc !== 'rack') hangItem(it, 'half'); else sayI('halfhook', 0, 'Lyle');
        },
        plist: function () { S.pileOpen = !S.pileOpen; flush(); },
        arch: function () { S.archOpen = !S.archOpen; if (S.archOpen) sayR('archaeology', 'Management'); flush(); }
      };
      function onClick(e) {
        touch();
        if (api.now() - S.lastDragEnd < 60) return;
        const tg = e.target, t = tg && tg.closest ? tg.closest('[data-act]') : null;
        if (!t || !root.contains(t)) return;
        const fn = ACT[t.dataset.act];
        if (fn) fn(t, !!e.shiftKey);
      }
      function onKey(e) {
        const tg = e.target, tn = tg && tg.tagName ? String(tg.tagName) : '';
        if (/^(INPUT|TEXTAREA|SELECT)$/.test(tn) || (tg && tg.isContentEditable)) return;
        if (e.ctrlKey || e.altKey || e.metaKey || e.repeat) return;
        touch();
        const key = String(e.key || ''), inRoot = !!(tg && tg.tagName !== 'BODY' && root.contains(tg)), sel = byId(S.sel);
        if (!inRoot && tn && tn !== 'BODY' && tn !== 'HTML' && key.length === 1) return; if (key === 'Escape') { if (S.sel || S.ringMoved) { S.sel = null; S.ringMoved = false; cap('Nothing selected. The nothing is well looked after.'); flush(); } return; }
        if (key === 'ArrowLeft' || key === 'ArrowRight') {
          if (!(inRoot || sel)) return;
          e.preventDefault();
          S.ring = Math.floor(clamp(S.ring + (key === 'ArrowLeft' ? -1 : 1), 0, S.hooks - 1)); S.ringMoved = true;
          cap('Hook ' + (S.ring + 1) + (occ(S.ring).length ? ': ' + occ(S.ring).map(displayName).join(' and ') : ' (empty)') + '.'); api.sfx('tick'); flush(); return;
        }
        if (/^[1-9]$/.test(key)) {
          const n = +key, now = api.now();
          if (n === 8 && S.hooks >= 8 && now - S.lastKey7 < 600 && sel && sel.loc !== 'rack') { S.lastKey7 = 0; hangItem(sel, 'half'); return; }
          if (n === 7) S.lastKey7 = now;
          if (n <= S.hooks) { S.ring = n - 1; S.ringMoved = true; cap('Hook ' + n + (sel && sel.loc !== 'rack' ? '. Press Enter to hang ' + displayName(sel) + '.' : '.')); flush(); }
          return;
        }
        if ((key === 'Enter' || key === ' ') && S.ringMoved && sel && sel.loc !== 'rack' && (tn !== 'BUTTON' || (tg.dataset && tg.dataset.act === 'chip'))) {
          e.preventDefault(); S.eatSpace = api.now(); hangItem(sel, S.ring); return;
        }
        switch (key.length === 1 ? key.toLowerCase() : '') {
          case 't': retrieve(sel && sel.loc === 'rack' ? sel.id : null, { shift: !!e.shiftKey }); break;
          case 'r': {
            const last = S.stubs.slice(-3), txt = last.length ? 'Your last stubs, read aloud: ' + last.map(stubText).join('; ') + '.' : 'You have no stubs yet. Stubs are how we know you were here.';
            cap(txt); say(txt, 'Management', 'proud', 0); break;
          }
          case 'w': { const w = inLoc('worn').sort(function (a, b) { return (a.wornAt || 0) - (b.wornAt || 0); }).pop(); if (w) unwear(w); break; }
          case 'e': if (sel && sel.loc === 'tray') wear(sel); break;
          case 'h': if (sel && sel.loc === 'tray') takeHome(sel); break;
          case 'b': ringBell(); break;
          default: break;
        }
      }
      function onResize() {
        const w = root.clientWidth;
        if (!w) return;
        const narrow = w < 820;
        if (root.classList.contains(k('narrow')) !== narrow) {
          root.classList.toggle(k('narrow'), narrow);
          if (narrow && !S.flags.narrowSaid && S.ready) { S.flags.narrowSaid = 1; sayI('resize', 3, 'Management'); }
        }
        if (!S.lastW) S.lastW = w;
        else if (Math.abs(w - S.lastW) >= 60) {
          S.lastW = w;
          if (S.resizeTimer) api.clearTimeout(S.resizeTimer);
          S.resizeTimer = api.setTimeout(resizeEffect, D(800));
        }
        flush();
      }
      function resizeEffect() {
        S.resizeTimer = 0;
        const now = api.now();
        if (now < S.resizeCool || S.phase !== 'play') return;
        S.resizeCool = now + D(4000); S.resizes++;
        const c = S.items.filter(function (i) { return i.loc === 'rack' && !i.locked && !i.fixed; });
        if (c.length >= 2) { const a = api.pick(c), b = api.pick(c.filter(function (x) { return x !== a; })); const h = a.hook; a.hook = b.hook; b.hook = h; }
        root.classList.add(k('rattle')); later(420, function () { root.classList.remove(k('rattle')); });
        api.sfx('boing');
        if (S.resizes === 5) { glass.classList.add(k('stopon')); later(5000, function () { glass.classList.remove(k('stopon')); }); sayI('resize', 2, 'Management', 'smug', 1); api.achieve('coat-check.stop'); }
        else sayI('resize', S.resizes % 2, 'Management', 'confused', 0);
        recompute();
      }
      function mark3() {
        const known = !!api.flag.get('metStapler'); api.flag.set('metStapler', true); // lint-ignore shared cast flag
        api.sfx('honk'); sayI('union', known ? 1 : 0, 'Management', 'panic', 1);
        later(D(3200), function () { sayI('union', 2, 'The Stapler', 'neutral', 1); });
        later(D(6800), function () { sayI('union', 3, 'Lyle', 'neutral', 1); });
        later(D(10200), function () { sayI('union', 4, 'The Stapler', 'smug', 1); });
        later(D(13500), function () { addStub({ n: ++S.stubN, name: 'UNION DUES', raw: 'STAPLER LOCAL 7 1/2: DUES (RECEIVED, FROM A COAT)', item: 0, torn: false }); api.award(1, 'dues'); api.sfx('stamp'); sayI('union', 5, 'Management', 'smug', 1); flush(); });
      }
      function mark10() {
        clockTxt.textContent = '5:00 PM'; mhand.style.transform = 'rotate(0deg)'; api.sfx('bell'); api.achieve('coat-check.five'); api.award(5, 'closing time');
        sayI('closing', 0, 'Management', 'panic', 2);
        later(D(1600), function () { sayI('closing', 1, 'Lyle', 'neutral', 1); });
        api.setTimeout(function () { if (api.destroyed) return; clockTxt.textContent = '4:59 PM'; mhand.style.transform = 'rotate(354deg)'; api.sfx('sad'); sayI('closing', 2, 'Management', 'smug', 1); }, D(3400));
        later(D(5600), function () { sayI('closing', 3, 'Lyle', 'neutral', 1); });
        if (api.flag.get('metToaster') || api.flag.get('toasterMet')) later(D(9000), function () { say('Toast.', 'The Toaster', 'neutral', 1); }); // lint-ignore shared cast flags
      }
      function marks(now) {
        if (S.phase !== 'play' || S.idleStage) return;
        const up = now - S.t0;
        if (!S.marks.m3 && up >= D(180000)) { S.marks.m3 = 1; mark3(); }
        else if (!S.marks.m10 && up >= D(600000)) { S.marks.m10 = 1; mark10(); }
      }
      function ambient(now) {
        if (S.phase === 'play' && !S.idleStage && now - S.lastInput < 20000 && now - S.lastSay > D(21000)) sayR('amb', 'Management', null, 'neutral', 0);
      }
      function due(name, ms) {
        const n = api.now();
        if (S.nx[name] === undefined) { S.nx[name] = n + ms; return false; }
        if (n >= S.nx[name]) { S.nx[name] = n + ms; return true; }
        return false;
      }
      function tick() {
        if (api.destroyed) return;
        const now = api.now(), dt = now - S.lastTick; S.lastTick = now;
        if (S.phase === 'reset') return;
        if (S.idleStage >= 1) S.beatAt += dt;
        if (due('sec', 1000)) { beatTick(now); fuseCheck(now); sandraCheck(now); arrivals(now); idleWatch(now); marks(now); ambient(now); }
        if (due('clock', D(3000))) clockStep();
        if (due('creep', D(12000))) creep();
        if (due('conv', D(6000))) rotate();
        if (due('patron', D(20000))) patron();
        if (due('wob', 4000)) wobble();
        if (due('plate', 20000) && S.beat >= 4) { S.halfPlate = api.randInt(0, S.hooks - 1); flush(); }
      }
      /* ---------------- start ---------------- */
      const restored = restore();
      if (!restored) mkItem('Coat');
      S.sessions++; S.beatAt = api.now(); S.lastTick = api.now(); S.lastInput = api.now();
      applyFeatures(); renderMini();
      api.flag.set('coat-check.seen', true);
      if (S.titleSuffix) api.setTitle('Coat Check, Counter 7 1/2' + S.titleSuffix);
      api.on(window, 'resize', onResize);
      api.on(root, 'click', onClick);
      api.on(root, 'pointerdown', onDown);
      api.on(root, 'lostpointercapture', function () { endDrag(); });
      api.on(document, 'pointermove', onMove);
      api.on(document, 'pointerup', onUp);
      api.on(document, 'pointercancel', function () { endDrag(); });
      api.on(document, 'visibilitychange', function () { endDrag(); });
      api.on(document, 'keydown', onKey);
      api.on(document, 'keyup', function (e) { if (e.key === ' ' && api.now() - S.eatSpace < 500) e.preventDefault(); });
      api.setInterval(tick, 250);
      onResize();
      if (restored && S.beat === 9) {
        if (!S.items.some(function (i) { return i.key === 'coatcheck'; })) mkItem('The Coat Check (Partially)', { emoji: '🧥', cls: 'physical', w: 20, likeness: 40, key: 'coatcheck' });
        if (!S.items.some(function (i) { return i.key === 'lylecoat'; })) lyleSeq(); else { S.flags.lytOn = 1; applyFeatures(); }
      }
      startOpening(restored ? (S.loops > 0 ? 'again' : 'back') : 'new');
      S.ready = true;
      flush(); persist();
      return { destroy: function () { try { endDrag(); } catch (_) { /* ignore */ } persistNow(); } };
    }
  });
})();
