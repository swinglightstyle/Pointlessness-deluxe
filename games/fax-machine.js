/* POINTLESS module: fax-machine */
/* Fax Machine Frenzy: send nothing to no one, receive everything from nobody. Brief: design/fax-machine.md */
(function () {
  'use strict';
  const P = window.POINTLESS;
  if (!P) return;

  P.injectCSS(`
.m-fax-machine-app{--plastic:#d8d0b8;--shell:#b9b095;--o:#3a3226;--paper:#f6f3e6;--print:#2d3d52;--coral:#e8664a;--mint:#5bbf9a;--mustard:#e2b43a;--lilac:#9a8cc7;--navy:#264a8c;--red:#c0392b;--mono:ui-monospace,Consolas,"Courier New",monospace;--fax-font:ui-monospace,Consolas,"Courier New",monospace;box-sizing:border-box;position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:14px;align-items:start;padding:12px;min-height:420px;color:var(--o);font-family:"Trebuchet MS",system-ui,sans-serif;font-weight:700;line-height:1.3;background:#fff4dc radial-gradient(rgba(58,50,38,.12) 1.2px,transparent 1.6px) 0 0/16px 16px}.m-fax-machine-app *{box-sizing:border-box}.m-fax-machine-app [hidden]{display:none!important}:where(.m-fax-machine-app) button{font:inherit;font-weight:800;color:inherit;cursor:pointer;touch-action:manipulation}
.m-fax-machine-app button:focus-visible,.m-fax-machine-app input:focus-visible,.m-fax-machine-sheet:focus-visible{outline:3px solid #264a8c;outline-offset:2px}.m-fax-machine-wide{grid-template-columns:minmax(0,1.6fr) minmax(0,1fr)}.m-fax-machine-cursive{--fax-font:"Segoe Script","Bradley Hand",cursive}.m-fax-machine-col{display:flex;flex-direction:column;gap:12px;min-width:0}
.m-fax-machine-mach{position:relative;display:flex;flex-direction:column;gap:10px;padding:12px;background:var(--plastic);border:3px solid var(--o);border-radius:18px;box-shadow:4px 4px 0 var(--o)}.m-fax-machine-ring .m-fax-machine-mach{animation:m-fax-machine-shake .4s linear 3}.m-fax-machine-reduced.m-fax-machine-ring .m-fax-machine-mach{animation:m-fax-machine-bpulse .6s ease 2}.m-fax-machine-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px}
.m-fax-machine-leds{display:flex;flex-wrap:wrap;gap:4px 10px}.m-fax-machine-led{display:inline-flex;align-items:center;gap:4px;font-size:.7rem;letter-spacing:.06em;opacity:.85}.m-fax-machine-led i{display:inline-block;width:11px;height:11px;border-radius:50%;background:#8a826b;border:2px solid var(--o)}.m-fax-machine-led.m-fax-machine-on{opacity:1}
.m-fax-machine-led-ready.m-fax-machine-on i{background:var(--mint);box-shadow:0 0 7px var(--mint)}.m-fax-machine-led-ring.m-fax-machine-on i{background:var(--coral);box-shadow:0 0 7px var(--coral);animation:m-fax-machine-blink .35s steps(2) infinite}.m-fax-machine-led-busy.m-fax-machine-on i{background:var(--mustard);box-shadow:0 0 7px var(--mustard)}.m-fax-machine-led-jam.m-fax-machine-on i{background:var(--coral);box-shadow:0 0 7px var(--coral);animation:m-fax-machine-blink .5s steps(2) infinite}
.m-fax-machine-plate{font-family:var(--mono);font-size:.68rem;letter-spacing:.08em;padding:3px 8px;background:#efe9d2;border:2px solid var(--o);border-radius:4px;white-space:nowrap}.m-fax-machine-sticker{font-size:.62rem;padding:2px 6px;min-height:24px;background:#fbf7ea;border:2px dashed var(--o);border-radius:3px;transform:rotate(-2deg)}.m-fax-machine-hatch{font-family:var(--mono);font-size:.78rem;padding:6px 10px;background:#fbf7ea;border:2px solid var(--o);border-radius:4px;box-shadow:inset 0 0 0 3px #e8dfbb;animation:m-fax-machine-thunk .3s ease-out}.m-fax-machine-lcd{position:relative;padding:8px 10px;background:#26331a;color:#c7d94a;border:3px solid var(--o);border-radius:10px;font-family:var(--mono);letter-spacing:.4px;text-shadow:0 0 6px #c7d94a;box-shadow:inset 0 0 14px rgba(0,0,0,.65);overflow:hidden;transition:opacity .2s}
.m-fax-machine-lcd::after{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 1px,transparent 1px 2px)}.m-fax-machine-lcd.m-fax-machine-dim{opacity:.25}.m-fax-machine-lcd.m-fax-machine-flick{animation:m-fax-machine-blink .35s steps(2) 2}.m-fax-machine-l1{min-height:3.6em;font-size:.82rem;line-height:1.2;overflow-wrap:anywhere}
.m-fax-machine-l2{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-top:4px}.m-fax-machine-dial{font-size:1.35rem;letter-spacing:.18em;white-space:nowrap;overflow:hidden;text-overflow:clip}.m-fax-machine-pg{font-size:.7rem;text-align:right;white-space:nowrap}.m-fax-machine-sub{margin-top:2px;font-size:.7rem;min-height:1.1em;overflow-wrap:anywhere}
.m-fax-machine-yy{display:flex;gap:10px;align-items:center;justify-content:center}.m-fax-machine-yy button{min-width:56px;min-height:44px;font-size:1.1rem;background:#c7d94a;border:3px solid var(--o);border-radius:8px;box-shadow:2px 2px 0 var(--o)}.m-fax-machine-scopewrap{display:flex;flex-direction:column;gap:6px}.m-fax-machine-scope{display:block;width:100%;aspect-ratio:320/90;background:#1b2614;border:3px solid var(--o);border-radius:8px;touch-action:manipulation;cursor:crosshair}
.m-fax-machine-tap{align-self:stretch;min-height:44px;background:var(--mustard);border:3px solid var(--o);border-radius:10px;box-shadow:3px 3px 0 var(--o);letter-spacing:.2em}.m-fax-machine-tap:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--o)}.m-fax-machine-score{font-size:.7rem;text-align:center;padding:4px 8px;background:#efe9d2;border:2px solid var(--o);border-radius:6px;font-family:var(--mono)}.m-fax-machine-score b{display:block;font-family:"Trebuchet MS",system-ui,sans-serif;font-size:.62rem;letter-spacing:.06em}
.m-fax-machine-cover{position:relative;padding:30px 12px 12px;background:#fffdf4;border:3px solid var(--o);border-radius:8px;box-shadow:3px 3px 0 var(--o);transition:transform .45s ease,opacity .45s ease;overflow:hidden}.m-fax-machine-cover::before{content:"";position:absolute;top:-4px;left:50%;width:70px;height:22px;margin-left:-35px;background:#8d8a80;border:3px solid var(--o);border-radius:0 0 8px 8px}.m-fax-machine-cover.m-fax-machine-feeding{transform:translateY(-34px) scale(.96);opacity:.15}.m-fax-machine-reduced .m-fax-machine-cover{transition:none}
.m-fax-machine-row{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:3px 0;font-family:var(--mono);font-size:.78rem}.m-fax-machine-grey{color:#6f6757}.m-fax-machine-drum{position:relative;min-height:44px;padding:4px 12px;font-family:var(--mono);font-size:.8rem;background:linear-gradient(#fbf7ea,#e8dfbb 50%,#fbf7ea);border:2px solid var(--o);border-radius:8px}.m-fax-machine-flip{animation:m-fax-machine-flip .15s ease-out}
.m-fax-machine-reduced .m-fax-machine-flip{animation:none}.m-fax-machine-urg{position:absolute;top:8px;right:8px;font-size:.68rem;padding:2px 6px;background:#fff1a8;border:2px solid var(--o);border-radius:3px;transform:rotate(4deg)}.m-fax-machine-marks{position:absolute;inset:0;pointer-events:none;overflow:hidden}.m-fax-machine-mark{position:absolute;padding:2px 8px;border:3px double currentColor;border-radius:4px;font-size:.8rem;letter-spacing:.08em;transform:rotate(var(--tilt,0deg));mix-blend-mode:multiply;opacity:.88;text-align:center;line-height:1.1}
.m-fax-machine-mark.m-fax-machine-new{animation:m-fax-machine-thunk .18s ease-out}.m-fax-machine-mark.m-fax-machine-red{color:var(--red)}.m-fax-machine-mark.m-fax-machine-navy{color:var(--navy)}.m-fax-machine-mark.m-fax-machine-lilac{color:var(--lilac);opacity:.55;font-size:.6rem}
.m-fax-machine-mark::after{content:"";position:absolute;inset:-8px;border-radius:50%;background:radial-gradient(circle,currentColor 0,transparent 55%);opacity:.12}.m-fax-machine-sandra{margin-top:8px;padding:8px;background:#efeaf8;border:2px solid var(--lilac);border-radius:8px;display:flex;flex-direction:column;gap:6px;font-size:.72rem}.m-fax-machine-sandra label{display:flex;flex-wrap:wrap;align-items:center;gap:6px}.m-fax-machine-sandra input[type=range]{flex:1;min-width:90px}
.m-fax-machine-sandra input[type=checkbox]{width:22px;height:22px}.m-fax-machine-chip{min-height:32px;padding:2px 12px;background:var(--lilac);color:#1d1535;border:2px solid var(--o);border-radius:16px}.m-fax-machine-bounce{animation:m-fax-machine-thunk .25s ease-out}.m-fax-machine-lamp{display:inline-block;width:14px;height:14px;border-radius:50%;background:#8a826b;border:2px solid var(--o);vertical-align:middle}
.m-fax-machine-lamp.m-fax-machine-red{background:var(--coral);box-shadow:0 0 6px var(--coral)}.m-fax-machine-lamp.m-fax-machine-green{background:var(--mint);box-shadow:0 0 6px var(--mint)}.m-fax-machine-stepper{display:inline-flex;align-items:center;gap:6px}.m-fax-machine-stepper button{min-width:44px;min-height:44px;font-size:1.2rem;background:#fbf7ea;border:2px solid var(--o);border-radius:8px}
.m-fax-machine-jam{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;gap:6px;align-items:center;justify-content:center;padding:10px;background:rgba(251,247,234,.99)}.m-fax-machine-jammed{min-height:250px}.m-fax-machine-acc{width:80%;display:flex;flex-direction:column}.m-fax-machine-acc div{height:14px;background:#fff;border:2px solid var(--o);box-shadow:0 3px 3px rgba(0,0,0,.25);transform:skewY(-6deg)}.m-fax-machine-acc div:nth-child(even){transform:skewY(6deg)}
.m-fax-machine-jam button{touch-action:none;min-height:44px;padding:4px 14px;background:var(--mustard);border:3px solid var(--o);border-radius:10px;box-shadow:3px 3px 0 var(--o)}.m-fax-machine-jam button:disabled{opacity:.55}.m-fax-machine-crumple{background:#e7e1cf!important;clip-path:polygon(0 8%,12% 0,30% 10%,52% 0,74% 12%,100% 0,94% 50%,100% 100%,60% 92%,30% 100%,8% 90%,0 60%)}.m-fax-machine-rack{display:flex;flex-wrap:wrap;gap:8px}
.m-fax-machine-stamp{flex:1 1 90px;min-height:44px;padding:4px 8px;font-size:.7rem;background:#fbf7ea;border:3px double currentColor;border-radius:6px;text-shadow:0 0 1px currentColor;letter-spacing:.04em}.m-fax-machine-stamp.m-fax-machine-red{color:var(--red)}.m-fax-machine-stamp.m-fax-machine-navy{color:var(--navy)}.m-fax-machine-stamp[aria-pressed=true]{background:#e8dfbb;box-shadow:inset 0 0 0 2px currentColor}
.m-fax-machine-stamp:active{transform:translateY(2px)}.m-fax-machine-pad{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;align-items:start}.m-fax-machine-keys{display:grid;grid-template-columns:repeat(3,minmax(44px,1fr));gap:6px}.m-fax-machine-key{min-height:44px;font-size:1.1rem;background:#8d8a80;color:#fbf7ea;border:2px solid var(--o);border-radius:8px;box-shadow:0 3px 0 var(--o);text-shadow:0 1px 0 rgba(0,0,0,.4)}
.m-fax-machine-key:active{transform:translateY(2px);box-shadow:0 1px 0 var(--o)}.m-fax-machine-pulse .m-fax-machine-key{animation:m-fax-machine-pulse 1.4s ease-in-out infinite}.m-fax-machine-lit{background:#c7d94a!important;color:#26331a!important}.m-fax-machine-bigs{display:flex;flex-direction:column;gap:8px}
.m-fax-machine-send{min-height:76px;font-size:1.6rem;letter-spacing:.14em;color:#fff;background:#4fae6a;border:4px solid var(--o);border-radius:16px;box-shadow:5px 5px 0 var(--o);text-shadow:0 2px 0 rgba(0,0,0,.35)}.m-fax-machine-send:active{transform:translate(4px,4px);box-shadow:1px 1px 0 var(--o)}.m-fax-machine-send.m-fax-machine-pulse{animation:m-fax-machine-pulse 1s ease-in-out infinite}.m-fax-machine-hand{min-height:44px;font-size:.78rem;background:#fbf7ea;border:2px solid var(--o);border-radius:22px;padding:2px 10px}
.m-fax-machine-hand.m-fax-machine-up span{display:inline-block;transform:rotate(-24deg)}.m-fax-machine-ring .m-fax-machine-hand span{display:inline-block;animation:m-fax-machine-shake .2s linear 6}.m-fax-machine-slot{min-height:120px;padding:8px;background:var(--shell);border:3px solid var(--o);border-radius:14px;box-shadow:4px 4px 0 var(--o);display:flex;flex-direction:column;gap:6px}.m-fax-machine-slotlip{height:10px;background:#3a3226;border-radius:5px;box-shadow:inset 0 3px 3px rgba(0,0,0,.6)}
.m-fax-machine-roll{display:flex;flex-direction:column-reverse;gap:4px;min-height:60px;overflow:hidden;padding:0 3px}.m-fax-machine-torn{display:flex;flex-direction:column-reverse;gap:4px}.m-fax-machine-flags{display:flex;gap:4px;height:12px}.m-fax-machine-flags i{width:12px;height:12px;background:#fbf7ea;border:2px solid var(--o)}
.m-fax-machine-sheet{position:relative;margin:2px 0 4px}.m-fax-machine-sheet.m-fax-machine-xt{margin-left:14px;transform:rotate(2deg)}.m-fax-machine-sheet.m-fax-machine-postage{zoom:.3;margin-bottom:10px}.m-fax-machine-sheet.m-fax-machine-postage:hover,.m-fax-machine-sheet.m-fax-machine-postage:focus-within{zoom:.7}
.m-fax-machine-sheet.m-fax-machine-gone{opacity:0;transition:opacity 1.4s linear}.m-fax-machine-paper{position:relative;padding:8px 10px 16px;background:var(--paper);color:var(--print);border:2px solid rgba(58,50,38,.55);border-bottom:0;box-shadow:inset 0 0 0 2px #f2e9b8,2px 3px 0 rgba(58,50,38,.35);font-family:var(--fax-font);font-size:.74rem;line-height:1.35;letter-spacing:.4px;transform-origin:top;transform:perspective(500px) rotateX(calc(var(--curl,1)*62deg)) scaleY(calc(1 - var(--curl,1)*.55));filter:blur(calc(var(--curl,1)*3px));margin-bottom:calc(var(--curl,1)*var(--h,0px)*-.5);touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab}.m-fax-machine-paper::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.18),transparent 30%,transparent 70%,rgba(0,0,0,.12));opacity:var(--curl,1)}.m-fax-machine-pr{opacity:var(--ink,1)}
.m-fax-machine-small .m-fax-machine-pr{font-size:.6rem}.m-fax-machine-sheet.m-fax-machine-toast .m-fax-machine-paper{background:linear-gradient(90deg,#e0a45a 0,#f6f3e6 14%,#f6f3e6 86%,#e0a45a 100%)}.m-fax-machine-sheet.m-fax-machine-sandrafont .m-fax-machine-paper{font-family:"Trebuchet MS",system-ui,sans-serif;background:#f1eefa}.m-fax-machine-sheet.m-fax-machine-warm .m-fax-machine-paper{box-shadow:inset 0 0 0 4px #fdf0b0,2px 3px 0 rgba(58,50,38,.35)}
.m-fax-machine-fh{display:flex;flex-direction:column;gap:1px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px dashed rgba(45,61,82,.5)}.m-fax-machine-fl{font-size:.65rem;letter-spacing:.1em;opacity:1}.m-fax-machine-from{font-weight:700;letter-spacing:.06em;overflow-wrap:anywhere}.m-fax-machine-body{margin:4px 0;white-space:pre-wrap;overflow-wrap:anywhere;min-height:1.3em}
.m-fax-machine-art{display:block;margin:4px auto;max-width:100%}.m-fax-machine-art path,.m-fax-machine-art rect,.m-fax-machine-art circle,.m-fax-machine-art line,.m-fax-machine-art polyline{fill:none;stroke:var(--print);stroke-width:2;stroke-dasharray:3 4;stroke-linecap:round}.m-fax-machine-foot{display:flex;justify-content:space-between;gap:6px;font-size:.68rem;letter-spacing:.08em;opacity:1}.m-fax-machine-perf{height:8px;margin:6px -10px -16px;background:radial-gradient(circle,#3a3226 1.2px,transparent 1.6px) 0 0/10px 6px repeat-x}
.m-fax-machine-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.m-fax-machine-acts button{min-height:44px;padding:2px 12px;font-size:.7rem;background:#fbf7ea;border:2px solid var(--o);border-radius:8px;box-shadow:2px 2px 0 var(--o)}.m-fax-machine-hold{font-size:.72rem;opacity:1;color:#4a4132;margin-top:2px}.m-fax-machine-nudge .m-fax-machine-paper{outline:3px dashed var(--mustard);outline-offset:2px;animation:m-fax-machine-nudge 1.2s ease-in-out infinite}.m-fax-machine-sheet.m-fax-machine-active .m-fax-machine-paper{box-shadow:inset 0 0 0 2px #f2e9b8,0 0 0 3px var(--mustard)}
.m-fax-machine-pot{width:46px;height:30px;margin:6px 4px;border-radius:50% 55% 50% 60%;background:#d9b45a;border:2px dashed var(--print);transform:rotate(-8deg)}.m-fax-machine-sheet.m-fax-machine-mirror .m-fax-machine-pr{transform:scaleX(-1)}.m-fax-machine-cup{width:54px;height:54px;margin:6px auto;border-radius:50%;border:5px solid rgba(45,61,82,.7);border-right-color:transparent;transform:rotate(30deg)}.m-fax-machine-leaf{width:46px;height:78px;margin:6px auto;border:2px dashed var(--print);border-radius:0 100% 0 100%;background:linear-gradient(100deg,#8fc28f 0 48%,#5f9a64 48% 52%,#8fc28f 52%);transform:rotate(25deg)}.m-fax-machine-thumb{width:54px;height:62px;margin:6px auto;border-radius:48% 52% 45% 55%;background:radial-gradient(ellipse,#8b8b8b 0,#a9a9a9 60%,transparent 70%);opacity:.8}.m-fax-machine-stripe{height:8px;background:#c98a3c;transform-origin:left;transform:scaleX(0);transition:transform 2s linear}.m-fax-machine-sheet.m-fax-machine-flatnow .m-fax-machine-stripe{transform:scaleX(1)}
.m-fax-machine-happy{position:relative;width:90px;height:64px;margin:8px auto;background:var(--plastic);border:3px solid var(--o);border-radius:10px}.m-fax-machine-happy i{position:absolute;top:18px;width:8px;height:8px;border-radius:50%;background:var(--o)}.m-fax-machine-happy i:nth-child(1){left:24px}.m-fax-machine-happy i:nth-child(2){right:24px}.m-fax-machine-happy b{position:absolute;left:30px;right:30px;bottom:10px;height:12px;border-bottom:3px solid var(--o);border-radius:0 0 40px 40px}
.m-fax-machine-happy u{position:absolute;right:-18px;bottom:-4px;width:12px;height:22px;background:var(--mint);border-radius:0 100% 0 100%;border:2px solid var(--o)}.m-fax-machine-room{position:relative;width:120px;height:70px;margin:6px auto;border:3px dotted var(--print);background:linear-gradient(#efe7cf 70%,#d8cba3 70%)}.m-fax-machine-room i{position:absolute;left:46px;bottom:12px;width:26px;height:22px;border:2px dotted var(--print);border-radius:4px 4px 0 0}.m-fax-machine-binder{padding:10px;background:#7aa4c8;border:3px solid var(--o);border-radius:12px;box-shadow:4px 4px 0 var(--o);color:#10243a}
.m-fax-machine-binder.m-fax-machine-pulse{animation:m-fax-machine-pulse 1s ease-in-out 3}.m-fax-machine-bh{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.m-fax-machine-bbtn{min-height:44px;padding:2px 12px;background:#fbf7ea;border:2px solid var(--o);border-radius:8px;box-shadow:2px 2px 0 var(--o)}.m-fax-machine-tabs{display:flex;gap:3px;min-height:14px}
.m-fax-machine-tabs i{width:14px;height:14px;background:#fff1a8;border:2px solid var(--o);border-radius:3px 3px 0 0}.m-fax-machine-drawer{margin-top:8px;display:flex;flex-direction:column;gap:4px;max-height:260px;overflow:auto}.m-fax-machine-rec{width:100%;min-height:44px;padding:4px 8px;text-align:left;font-family:var(--mono);font-size:.68rem;background:#f6f3e6;border:2px solid var(--o);border-radius:6px;color:#2d3d52;overflow-wrap:anywhere}.m-fax-machine-full{margin:0 0 4px;padding:6px 8px;font-family:var(--mono);font-size:.68rem;background:#fffdf4;border:1px dashed var(--o);white-space:pre-wrap;overflow-wrap:anywhere;color:#2d3d52}
.m-fax-machine-tray{position:relative;min-height:70px;padding:8px;background:var(--shell);border:3px solid var(--o);border-radius:14px;box-shadow:4px 4px 0 var(--o);display:flex;flex-direction:column-reverse;gap:6px;overflow:hidden}.m-fax-machine-tray h3{margin:0}.m-fax-machine-strip{position:relative;width:100%;padding:6px 8px;text-align:left;font-family:var(--mono);font-size:.62rem;line-height:1.3;letter-spacing:.3px;background:var(--paper);color:var(--print);border:1px solid rgba(58,50,38,.6);border-radius:2px;white-space:pre-wrap;overflow-wrap:anywhere;overflow:hidden;animation:m-fax-machine-slide .25s ease-out}.m-fax-machine-reduced .m-fax-machine-strip{animation:none}
.m-fax-machine-strip i{position:absolute;left:0;right:0;height:1px;background:rgba(45,61,82,.55);mix-blend-mode:multiply}.m-fax-machine-ok{color:#1f7a5c}.m-fax-machine-conc{position:absolute;left:50%;bottom:6px;width:44px;height:28px;background:#fff;border:2px solid var(--o);box-shadow:0 3px 3px rgba(0,0,0,.25);transform:skewY(-8deg);animation:m-fax-machine-burst 1.1s ease-out forwards;pointer-events:none}.m-fax-machine-h{margin:0 0 4px;font-size:.7rem;letter-spacing:.1em}
.m-fax-machine-jamst{font-family:var(--mono);font-size:.7rem;text-align:center}.m-fax-machine-conclayer{position:absolute;left:0;right:0;bottom:0;height:0;pointer-events:none;z-index:4}.m-fax-machine-trayw{position:relative}.m-fax-machine-compact{padding:8px;gap:10px}
.m-fax-machine-compact .m-fax-machine-mach{padding:8px}.m-fax-machine-compact .m-fax-machine-pad{grid-template-columns:minmax(0,1fr)}.m-fax-machine-compact .m-fax-machine-bigs{flex-direction:row}.m-fax-machine-compact .m-fax-machine-bigs>button{flex:1}
.m-fax-machine-compact .m-fax-machine-paper{font-size:.66rem}.m-fax-machine-compact .m-fax-machine-dial{font-size:1rem;letter-spacing:.1em}.m-fax-machine-compact .m-fax-machine-l2{flex-wrap:wrap}@keyframes m-fax-machine-shake{0%{transform:translate(0,0) rotate(0)}33%{transform:translate(-3px,0) rotate(-.6deg)}66%{transform:translate(3px,1px) rotate(.6deg)}100%{transform:translate(0,0) rotate(0)}}@keyframes m-fax-machine-bpulse{0%,100%{border-color:#3a3226}50%{border-color:#e8664a}}
@keyframes m-fax-machine-blink{0%{opacity:1}50%{opacity:.25}}@keyframes m-fax-machine-pulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.35)}}@keyframes m-fax-machine-thunk{0%{transform:translateY(-6px) scale(1.15)}100%{transform:translateY(0) scale(1)}}@keyframes m-fax-machine-flip{0%{transform:translateY(-8px);opacity:.3}100%{transform:translateY(0);opacity:1}}
@keyframes m-fax-machine-slide{0%{transform:translateY(-10px);opacity:0}100%{transform:translateY(0);opacity:1}}@keyframes m-fax-machine-burst{0%{transform:translate(0,0) rotate(0) skewY(-8deg);opacity:1}100%{transform:translate(var(--dx,0px),-140px) rotate(var(--r,0deg)) skewY(-8deg);opacity:0}}@media (prefers-reduced-motion:reduce){.m-fax-machine-ring .m-fax-machine-mach,.m-fax-machine-strip,.m-fax-machine-conc,.m-fax-machine-mark.m-fax-machine-new{animation:none}.m-fax-machine-cover,.m-fax-machine-stripe{transition:none}.m-fax-machine-app *,.m-fax-machine-app *::before,.m-fax-machine-app *::after{animation:none!important}.m-fax-machine-app.m-fax-machine-ring .m-fax-machine-mach{animation:m-fax-machine-bpulse .6s ease 2!important}.m-fax-machine-conc{display:none}}
@keyframes m-fax-machine-nudge{0%,100%{outline-color:#e2b43a}50%{outline-color:#e8664a}}.m-fax-machine-reduced *,.m-fax-machine-reduced *::before,.m-fax-machine-reduced *::after{animation:none!important}.m-fax-machine-reduced.m-fax-machine-ring .m-fax-machine-mach{animation:m-fax-machine-bpulse .6s ease 2!important}.m-fax-machine-reduced .m-fax-machine-conc{display:none}
.m-fax-machine-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.m-fax-machine-dormant{opacity:.55}.m-fax-machine-key small{display:block;font-size:.55rem;letter-spacing:.1em;line-height:1}.m-fax-machine-kb{margin-left:4px;font-size:.6rem;opacity:.8}
.m-fax-machine-pile{position:relative;height:64px;margin-top:8px;pointer-events:none}.m-fax-machine-pl{position:absolute;left:0;right:0;bottom:0;height:34px;padding:3px 6px;background:#fff;border:2px solid var(--o);box-shadow:0 2px 2px rgba(0,0,0,.25);font-family:var(--mono);font-size:.6rem;letter-spacing:.1em;color:var(--red);animation:m-fax-machine-slide .3s ease-out}.m-fax-machine-plflag{position:absolute;right:6px;top:-12px;padding:1px 6px;background:#fff1a8;border:2px solid var(--o);font-size:.6rem;letter-spacing:.06em}
.m-fax-machine-compact .m-fax-machine-plate{display:none}.m-fax-machine-compact .m-fax-machine-mark{left:auto!important;right:3%;opacity:.6}button.m-fax-machine-from{min-height:44px;text-align:left;font:inherit;font-weight:700;color:inherit;background:none;border:2px dashed var(--o);border-radius:6px;padding:4px 8px;cursor:pointer}@media (pointer:coarse){.m-fax-machine-chip{min-height:44px}.m-fax-machine-sandra input[type=checkbox]{width:40px;height:40px}.m-fax-machine-sticker{min-height:40px}}
`, 'css-fax-machine');

  P.addAchievements([
    { id: 'fax-machine.first', name: 'Grand Marshal of the Transmitted Void (Third Class)', desc: 'Send your first fax to nobody. It is received by nobody and treated like a military victory.', icon: '🎖️', reward: 3 },
    { id: 'fax-machine.archivist', name: 'Supreme Archivist of the Curled Scroll', desc: 'File 12 faxes in the binder. The binder is moved. The binder will not say so.', icon: '🗂️', reward: 6 },
    { id: 'fax-machine.page_one', name: 'Knight Commander of Page One of One', desc: 'Send 25 faxes. Page 1 of 1 stands behind you, but only just.', icon: '📄', reward: 6 },
    { id: 'fax-machine.flat', name: 'Laureate of Holding Things Flat', desc: 'Hold thermal paper flat for a combined 60 seconds. Per the data, you are the first to try.', icon: '📃', reward: 5 },
    { id: 'fax-machine.handshake', name: 'Keeper of the Hallowed Handshake', desc: 'Land all four pulses in 5 handshakes. The line has noted your grip.', icon: '🤝', reward: 5 },
    { id: 'fax-machine.unjammed', name: 'Archdeacon of the Unjammed', desc: 'Clear 3 paper jams. At least one was in the right order, probably.', icon: '🔧', reward: 5 },
    { id: 'fax-machine.final', name: 'Emperor of the Final Page (Page 2 of 1)', desc: 'Send the last fax of the session to the only number that was ever yours. It was received before it was sent.', icon: '🏁', reward: 10 },
    { id: 'fax-machine.patient', name: 'The Order of the Patient Dial Tone', desc: 'SECRET. Idle for 90 seconds. Awarded for waiting for no reason.', icon: '⏳', secret: true, reward: 12 },
    { id: 'fax-machine.wrong_number', name: 'The Fax Who Faxed Himself, Emperor of the Wrong Number', desc: 'SECRET. Dial your own number, or 7 1/2 0, or forward a wrong-number fax to no one. A little exhausting to say.', icon: '🔁', secret: true, reward: 12 },
    { id: 'fax-machine.excess', name: 'Duke of Dialing in Excess', desc: 'SECRET. Overload the machine with a great many faxes in three seconds. A fountain of paper was involved.', icon: '🧯', secret: true, reward: 12 },
    { id: 'fax-machine.unfinished', name: 'The Holy Order of Unfinished Se', desc: 'SECRET. Read a fax that has run out of the words it was saying. It ended where the paper did.', icon: '✂', secret: true, reward: 12 },
    { id: 'fax-machine.stamps', name: 'Archduke of the Page That Is Only Stamps', desc: 'SECRET. Put all five stamps on one sheet. The page has gone through the other side of paperwork.', icon: '🔖', secret: true, reward: 12 },
    { id: 'fax-machine.technically', name: 'Technician, Technically', desc: 'SECRET. Click the service sticker until the machine admits something. It was last serviced next Thursday.', icon: '🔩', secret: true, reward: 12 },
    { id: 'fax-machine.dennis', name: 'Supreme Plenipotentiary of Leaf-Based Correspondence, Rooted in Perpetuity', desc: 'SECRET. Fax a plant by the name on its keypad. It replied with a leaf, and the leaf was right.', icon: '🌿', secret: true, reward: 12 },
    { id: 'fax-machine.sandra', name: 'Reassigned Slider (Reports to Sandra)', desc: 'SECRET. Drag the Confidentiality slider away from 7 1/2 three times in ten seconds. It stops being a slider and starts being a stamp.', icon: '📌', secret: true, reward: 12 },
    { id: 'fax-machine.cc_all', name: 'Archchancellor of the Carbon Copy, Keeper of the Copy With No Original', desc: 'SECRET. Copy all five permanent members of staff (Ceiling, Dennis, Tuesday, the Stapler, the Sock). The original was not in the room.', icon: '📋', secret: true, reward: 12 },
    { id: 'fax-machine.long_flat', name: 'Hereditary Custodian of the Unbroken Flat (7 1/2 Seconds, No Breaks)', desc: 'SECRET. Hold one sheet flat for seven and a half seconds without letting go once. The paper filed a grievance, then withdrew it, impressed.', icon: '📏', secret: true, reward: 12 }
  ]);

  P.addLines('moduleEnter', [ 'Entering {module}. Please send something to no one. Per policy, no one is expecting it.', '{module} is warm. It is also, for reasons it has not shared, listening.', 'You are now in {module}. The hallway to it was called "short" in the brochure. The brochure has not been measured since.' ]);
  P.addLines('moduleExit', [ 'You have left {module}. Something in it was left open. It is patient.', 'You left {module} mid-sentence. The sentence has finished by itself, and was commended.', 'Departure from {module} recorded. Nothing was received. This is a perfect record, and has been framed.' ]);
  P.addLines('m:fax-machine:enter', [ 'You have entered the Fax Room. The machine has been READY for eleven years and has prepared a short speech. It is the word READY.', 'The fax machine has been READY for eleven years. It would like to be used before it forgets how.', 'Welcome to Unit 7 1/2. The machine is warm. The machine is also, for reasons it has not shared, listening.' ]);
  P.addLines('m:fax-machine:exit', [ 'You have left the Fax Room. The machine is still READY. It is always READY. It has been told it can stop.', 'You left a fax unfiled. It will fade in 25 seconds, which is a short and honest time.', 'You left in the middle of a ring. The ring finished by itself, to a room with the lights on and no one in it, and was commended.', 'The fax has not been received by anyone. This is a perfect delivery record, and has been framed.' ]);
  P.addLines('ticker', [ 'FAX MACHINE REPORTS 0 RECIPIENTS, 1 SATISFIED; SOURCES CLOSE TO THE MACHINE DESCRIBE THE SATISFACTION AS "LOUD"', 'NOBODY, SENIOR, ANNOUNCES RETIREMENT; REPLACED BY IDENTICAL, SLIGHTLY YOUNGER NOBODY', 'SANDRA FROM COMPLIANCE ADDS FIELD TO FORM; FIELD CONFIRMS IT HAS ALWAYS BEEN THERE', 'PAGE 2 OF 1 REPORTED; OFFICIALS URGE CALM AND A SECOND PAGE', 'TONER LOW REPORTED TO BE A STATE OF MIND; TONER DESCRIBES ITSELF AS "FINE"', 'FAX FROM NOBODY ASKS FOR NUMBER; MACHINE ANSWERS WITH ITS OWN; BOTH PARTIES: YOU', 'STUDY OF ONE FAX FINDS THERMAL PAPER "EMOTIONALLY BRIEF"; PAPER DECLINES TO COMMENT, THEN DOES', 'TUESDAY POSTPONED BY ONE DAY IN FAX FROM "THE DAY BEFORE"; MANAGEMENT CALLS IT "A FIRST"' ]);
  P.addLines('ticker', [ 'POLICY 14(c) REQUIRES ALL FAXES BE COPIED TO SOMEONE; SOMEONE HAS NOT BEEN SELECTED, AND HAS BEEN CALLED TO ASK WHY', 'CEILING COPIED ON FAX FOR FIRST TIME IN ELEVEN YEARS; DESCRIBES THE EXPERIENCE AS "TOUCHED, FROM ABOVE"', 'FAX ARRIVES TWICE; SECOND ARRIVAL CLAIMS TO BE ORIGINAL; FIRST ARRIVAL "NOT PRESENTLY WELL"' ]);
  P.addLines('patchNote', [ 'Fax Machine Frenzy: added a CC line. Everyone is now copied on everything. Everyone has been told this is a feature.', 'Fax Machine Frenzy: the machine now sneezes occasionally. It notes this in the report. It is not sorry, but it is sorry.' ]);
  P.addLines('tip', [ 'Tip: thermal paper wants to be a scroll. Hold it flat and it will tell you everything, briefly.', 'Tip: any number connects. The number 7 1/2 0 connects somewhere else.', 'Tip: the machine has its own number printed on every fax. It has been there the whole time.', 'Tip: a plant can be reached by fax. Its name is six letters long, mostly consonants, and on the keypad.' ]);
  P.addLines('lobbyEvent', [ 'The fax machine has sent 400 pages to nobody and received 31. Management calls this a healthy ratio.', 'Gerald has been seen outside the Fax Room with a manila envelope. It is empty. It is, he says, "a gesture".', 'Dennis (Plant) has been faxed. Dennis (Plant) has not replied. Dennis (Plant) has several leaves and a policy.' ]);
  P.addLines('plantStatus', [ 'Dennis (Plant) has been placed near the fax machine. He is receiving nothing, and thriving.', 'Dennis (Plant) has filed a fax. It is a drawing of a leaf. It is the best filing in the building.' ]);
  P.addSettings([{ id: 'fax-machine.setting14k', label: 'Fax Baud Rate', type: 'select', options: ['9600', '14400', 'Vibes'], default: 'Vibes',
    responses: ['The baud rate has been noted. It was already Vibes. It remains Vibes, with feeling.', 'Fax Baud Rate adjusted. The machine could not hear the difference. The machine is being brave.', 'A faster baud rate has been requested of a machine that was not going anywhere. It leans forward, anyway.'] }]);

  /* ---------- data ---------- */
  const DRUM = [ { key: 'yourfax', text: 'Re: Your Fax', beat: 0 }, { key: 'rere', text: 'Re: Re:', beat: 0 }, { key: 'blank', text: 'Re: (blank)', beat: 0 }, { key: 'q3', text: 'Re: Q3 Nothing Review', beat: 0 }, { key: 'memo', text: 'Re: The Memo', beat: 0 }, { key: 'weather', text: 'Re: Weather', beat: 3 }, { key: 'toast', text: 'Re: Toast', beat: 5 }, { key: 'socks', text: 'Re: Socks', beat: 5 }, { key: 'yes', text: 'Re: Yes', beat: 6 }, { key: 'here', text: 'Re: I Am Here', beat: 6 }, { key: 'who', text: 'Re: Who', beat: 6 } ]; const STAMPS = [ { key: 'urgent', label: 'URGENT', kb: 'Z', ink: 'red' }, { key: 'confidential', label: 'CONFIDENTIAL', kb: 'X', ink: 'navy' }, { key: 'disregard', label: 'PLEASE DISREGARD', kb: 'C', ink: 'red' }, { key: 'draft', label: 'DRAFT OF A DRAFT', kb: 'V', ink: 'navy' }, { key: 'seen', label: 'SEEN', kb: 'N', ink: 'navy' } ]; const TIERS = ['URGENT', 'VERY URGENT', 'URGENT URGENT', 'URGENT, BUT SITTING DOWN', 'RETIRED URGENT', 'URGENT (PLEASANT)']; const TIER_AT = [3, 6, 10, 15, 21]; const TIER_SAY = [ `URGENT has been renamed VERY URGENT, to keep it from feeling ordinary.`, `VERY URGENT has been renamed URGENT URGENT. Nobody asked it how it felt.`, `URGENT URGENT has been renamed URGENT, BUT SITTING DOWN. The urgency has taken a chair.`, `URGENT, BUT SITTING DOWN has been renamed RETIRED URGENT. It sends postcards. They are also urgent, retired.`, `RETIRED URGENT has been renamed URGENT (PLEASANT). Nobody said so. It simply stopped being in a hurry.` ];
  const STAMP_SAY = {
    urgent: `Stamp applied: URGENT. Urgency level: 'moderate, in a hurry'. Please do not hurry.`,
    confidential: `Stamp applied: CONFIDENTIAL. The contents are confidential even from the contents.`,
    disregard: `Stamp applied: PLEASE DISREGARD. Disregarding now. It is going well.`,
    draft: `Stamp applied: DRAFT OF A DRAFT. A final version is expected when the stationery cupboard finishes thinking.`,
    seen: `Stamp applied: SEEN. This has been seen. By whom has been seen to.`
  };
  const UNSTAMP = `Un-stamped. The ink has gone back to the pad. The pad is relieved and slightly stained.`;
  const B_DIAL = [ `Dialing {num}. This number is not in service. It has been told, and is taking it well, and is on a list.`, `Dialing {num}. That number belongs to Nobody. Nobody has been told, and has asked to be told again.`, `Dialing {num}. The number is valid in every sense except the ones that matter.`, `Dialing {num}. The phone is ringing in a room with the chairs stacked on the desks. It is not closing time. It is a style.`, `Dialing {num}. A man answered this number once, in 1994. He is still described in the records as 'holding'.` ]; // lint-ignore
  const B_REDIAL = [`Redial detected. Same number, same nobody. Management admires your commitment to one empty direction.`, `Redial again. At this point the number is less a destination than a habit.`, `The same number a third time. A number dialed this often begins to sound like a name. Management is not saying whose.`]; const B_SHORT = [`That is a short number. Nobody has accepted it as a long one.`, `Fewer than seven digits. The telephone company calls this 'a thought' and has not charged you for it.`, `A number that short is usually a department or a sneeze. Please specify.`]; const IDLE_LCD = ['TONER: 100% (OF NOTHING)', 'PAPER: 1 ROLL (LOOPED)', 'COVER SHEET: PRESENT. CONTENT: PENDING.', 'READY. NO ONE.', 'LINE IS ON HOLD WITH ITSELF. ESTIMATED WAIT: A THURSDAY.', 'INK: 40% (GENERALLY)', 'NEW MESSAGES: 0. OLD MESSAGES: 0, WARMLY.', 'SERVICE DUE: NEXT THURSDAY (STILL)', 'SANDRA HAS REVIEWED THIS SCREEN. THE SCREEN IS PENDING.', 'LAST FAX WAS A WHILE AGO. IT HAS DONE WELL.', 'NO ONE IS COPIED. THIS IS A GOOD LIST.']; const MINUTE_LCD = ['1 MIN. THE MACHINE HAS STOPPED PRETENDING TO BE NEW.', '2 MIN. THE ROOM HAS NOTICED YOU. IT HAS NOT SAID.', '3 MIN. A REVIEW IS BEING DRAFTED. IT IS ABOUT THE MACHINE.', '4 MIN. THE BEIGE HAS DEEPENED BY ONE SHADE (UNLISTED).', '5 MIN. HALFWAY TO TEN. THE MACHINE HAS BEEN TOLD TEN IS COMING. IT HAS ASKED NOT TO KNOW WHAT.', '6 MIN. PAPER ROLL: STILL A ROLL. IT IS SO BRAVE ABOUT THAT.', '7 MIN. SEVEN, AND A HALF, WHEN YOU ARE NOT LOOKING.', '8 MIN. NOBODY HAS ASKED YOU TO STAY. NOBODY HAS ASKED YOU TO GO.', '9 MIN. SOMETHING IS ABOUT TO HAPPEN TO TUESDAY.'];
  const C_ONO = ['kssshhh-BEEP-dee-dee-dee', 'WEEE-ooo-krrk-KSHH', 'bwong... bwong... KSSH', 'ee-AWW-ee-AWW-kshh', 'NEGOTIATING 14400 BPS OF POLITENESS']; const C_SLOPPY = [`Sloppy handshake. Static added. Nobody will notice, which is the best kind of static.`, `The line has noted your grip. It describes it as firm, and slightly screechy.`]; const C_EXTRA = [`The machines are negotiating. One of them is a machine. The other has been told it is also a machine, and is going along with it.`, `Negotiating baud. Offered: 9,600. Countered: 'yes'. Settled at 'vibes'.`, `Both machines are pretending they have done this before. One of them has.`, `The line is checking your credentials. Your credentials are a pulse, and you have one.`];
  const E_SEND = [ `Your fax has left the building. The building has no record of it. The building is fine.`, `Pages sent: {n}. Pages received: 0. Pages understood: the first one, partly.`, `Recipient: NOBODY. Status: Delivered. Signed for by: a draft.`, `Your fax has been delivered to an empty chair in Accounting. The chair signed.`, `Page 1 of 1 is crossing the telephone wire. It is wearing a small coat.`, `Transmission complete. Efficiency: 100%. The denominator is Nobody.`, `Per my previous fax, which I did not send: well done.`, `Delivered. The recipient was out, so the fax was handed to a coat on a hook. The coat will pass it on.`, `Fax sent. A small cloud of toner dust has risen over the machine in the shape of applause.`, `Estimated arrival: before it left. Estimated departure: pending a form.`, `Management has signed for your fax on Nobody's behalf. The signature is a good one. It has been practising.`, `That was a good fax. Management cannot say why. It had margins.`, `Your fax has been received by a filing cabinet on the third floor. There is no third floor. They are working it out.`, `Send complete. The fax is 4% closer to being understood and 0% closer to being read.` ]; // lint-ignore
  const E_TALLY = ['0 (1 SATISFIED)', '0 (2 CONCERNED)', '0 (1 HAT)', '0 (THE WHOLE FLOOR)', '0 (A DRAFT, BRIEFLY)']; const E_TALLY_LATE = ['0 (1 PLANT)', '0 (3 CHAIRS)', '0 (A FICUS, ON LOAN)', '0 (THE CEILING, ATTENTIVE)', '0 (TUESDAY, PROVISIONALLY)', '0 (1 STAPLER, AS UNION REP)', '0 (A HALLWAY, MOSTLY)', '0 (SANDRA, PRESUMED)', '0 (THE SECOND HALF OF A MEETING)']; const E_DUR = ['00:00:07.5. THE .5 IS THE PART WE ENJOYED.', '00:00:03.0. A FIGURE ACCURATE TO THE SECOND AND TO NO OTHER.', '00:00:09.5. THE LINE ASKS THAT YOU DO NOT TIME IT.', '00:00:00.0 (ELAPSED), 00:00:05.0 (EXPERIENCED).', '00:00:04.0, OF WHICH 00:00:01.0 WAS HOPE.', '00:00:12.0 (FELT LIKE A LUNCH).', '00:00:00.1. THE MACHINE DID NOT WANT TO BE SEEN TRYING.']; const E_DEPT = ['ACCOUNTS (ANNEX)', 'VOICEMAIL (7 1/2)', 'COMPLAINTS (REVERSED)', 'FACILITIES (EVENTUALLY)', 'THE DEPARTMENT OF PASSING THINGS ON', 'THE OFFICE OF NEXT QUARTER', 'LOST PROPERTY (FAX WING)', 'MEMOS, ONGOING']; const E_RETURN = ['RETURN TO SENDER. RETURNED BY: NO ONE. REASON: UNDELIVERABLE BECAUSE IT WAS ALREADY THERE.', 'RETURN TO SENDER. RETURNED BY: NO ONE, WITH CARE.', 'RETURN TO SENDER. REASON: THE ADDRESS WAS FOUND, AND IT WAS YOU.', 'RETURN TO SENDER. NOTE ON ENVELOPE: "NOT FOR ME. LOVELY TO BE ASKED."']; const E_BUSY = [`LINE BUSY. The line is busy with your previous fax, which it is still thinking about.`, `BUSY. The line is occupied by a fax telling another fax to hold.`, `Busy signal. Please hold. Please do not hold. Please hold the idea of holding.`, `BUSY. The line is on another call, with itself, about you. It is going well.`, `BUSY. Your fax is waiting in a queue of one. The one is you.`];
  const E_CAP = `The roll is full. The oldest fax has been retired to make room, in a ceremony of one.`; const E_WARN = [`That is a lot of SEND. The machine is trying to look unbothered. Its fan has other ideas.`, `SEND is a button, not a prayer. Management has watched you use it as both.`, `The fax is already going. You are asking it to go more.`]; const E_FEES = [`That is a great many faxes in 3 seconds. The machine is flattered and also lightly on fire (metaphorically, per Sandra).`, `The fee has been faxed to nobody, who has framed it.`, `Third surcharge. The surcharge has started a small collection of earlier surcharges. It keeps them in a drawer marked FEES (PAST).`, `A fourth fee. The machine would like to say it is not angry, in a smaller font.`, `Fee again. The fee department has hired a second fee. They work in shifts.`, `Fee again. At this point it is a subscription. You have subscribed to yourself.`]; const E_FEE_KEYS = [`That was 25 digits in 3 seconds. No number is that long. Several are that sincere.`, `The keypad has asked for a moment. It has digits left, but not many.`, `The keys are warm now. They describe it as 'a lot, but fine'.`]; const E_FEE_STRIP = 'EXCESSIVE FAXING DEPT. POLICY 14(b): RAPID DIALING SURCHARGE 0.25 MEH. THE SURCHARGE WAS CHARGED UNDER POLICY 14(b), WHICH IS ONE SENTENCE.'; const E_FEE_REPLY = `The machine faxed the pile of your faxes to Nobody as one page. Nobody replied, 'Stop. Thank you.' in that order.`; const E_COOL = `The machine is resting. It would like to be remembered as someone who rested.`;
  const F_LCD = ['RING. IT IS FOR YOU.', 'RING. RING. IT IS ALWAYS FOR YOU.', 'INCOMING FAX FROM UNKNOWN', 'RING. IT IS NOBODY. PLEASE HOLD.', 'RING. THE RING WOULD LIKE IT KNOWN THAT IT WAS NERVOUS.']; const F_FIRST = [`Incoming fax from UNKNOWN. Please hold the paper flat. It remembers being a roll.`, `Someone is faxing back. We do not know who. We asked the fax, and the fax printed 'someone'.`, `We have never received anything. We do not have a procedure for this. We are writing one.`]; const F_FLAT = [ `You are holding a piece of paper flat. Per the data, no one has ever done this so sincerely.`, `The paper wants to be a scroll again. You are asking it to reconsider. It is reconsidering.`, `Flat. The words have stopped swimming. They had been practising.`, `You are holding paper flat with both hands and total focus. Nobody has ever looked more employed.`, `Flat. The curl has gone out of it. The curl is somewhere else, rehearsing.` ]; const F_TEAR = [ `Torn along the perforation. The perforation had dreams. They are now two separate dreams.`, `You tore it along the dotted line like a person who has made a decision.`, `It separated with the sound of a very small decision.`, `Torn. The paper has two edges now and has not decided which one to be loyal to.` ]; const F_FILE = [`Filed. The ink has stopped fading. It was relieved to be asked.`, `Filed under Nobody. Cross-referenced under Nobody, Other.`, `Filed. The binder has made a small noise of belonging.`, `Filed under F, for Fax. Also under N, for Nobody. Also under Please Stop Cross-Referencing.`];
  const F_ROLL = `A fax has rolled off the end of the binder. It has been shredded by wind. There is no wind. It was thorough.`; const F_FADE1 = `Thermal paper fades in 25 seconds. Per Sandra, so does everything else; this is simply the first to say so.`; const F_BLANK = [`A blank fax. No one has ever been misquoted by one.`, `Retired as blank paper. It served the building for 25 seconds, quietly, and without a pension.`, `The ink has gone. The message, however, was already gone. This is just the paper catching up.`, `The page went blank mid-sentence. Management is calling it a very quiet message.`]; const F_FIRST_REPLY = `You have received your first fax. It is 5 Meh. It was sent by nobody, who has never been so generous.`; const J1 = `Paper jam. Please open the lid, smooth the paper, and let the lid close itself. Management will not say in which order.`; const J2 = `Step 1: open the lid. The lid opened itself and would like the credit.`; const J3 = [ `You smoothed the paper before opening the lid. The paper declined. The paper has principles.`, `The paper is behind a lid. Please consider the lid. The lid has considered you.`, `You are patting a closed lid. It is a nice lid. It is not the jam.`, `Smoothing noted. Nothing was smoothed. Management has circled the effort in pencil.`, `You have smoothed a lid. It was flat before. It is a difficult thing to improve.`, `The jam is on the other side of the lid, like most problems.`, `A diagram is attached. The diagram is also jammed.` ]; const J4 = [`One smooth. The paper has gone from crumpled to a more optimistic crumple.`, `Two smooths. The paper has stopped sulking and started merely resting.`];
  const J5 = `Paper jam resolved. The paper was never stuck. It was thinking, and you interrupted, politely.`; const J5B = `Jam cleared. It was a 7 1/2 page jam. We have never had a half page before. It was gentle.`; const J6 = `The jam resolved itself. It said it needed a moment. It has had one.`;
  const RE_REPLIES = {
    yourfax: [`Re: your fax. We were not expecting it, but we kept a chair open just in case.`, `Received your fax. It was the most honest thing we have been sent this quarter.`, `Your fax arrived. We have read it three times and found it the same each time. This is a compliment.`, `Your fax. We have it in front of us. It is the first thing we have had in front of us that was not a wall.`],
    rere: [`Re: Re: Re: (blank). I concur with the blank. I have concurred with many blanks.`, `Re: Re: Re: Re: Re: we are now several Res deep. Please send a Re that goes the other way.`, `RE: RE: RE: this is the deepest we have been together.`, `Re: Re: Re: Re: Re: nobody remembers what the first one said. We think it was 'hello'. We have been saying 'hello' in layers.`],
    blank: [`Yours was blank. So was ours. We have matched.`, `Thank you for the blank. It was the right size for what we meant to say.`, `The blank arrived. We held it to the light. Nothing, held to the light, is still nothing, but brighter.`],
    q3: [`Q3 Nothing Review: nothing was reviewed with great rigor. The rigor has been filed under Nothing, where it is thriving.`, `Re: Q3 Nothing Review. We exceeded expectations by having none. Please advise on Q4.`, `Q3 results: nothing, up 0%, which is the best 0% we have had.`, `Q3 Nothing Review: attendance was 0, and also you. Minutes were taken. They are the same minute.`],
    memo: [`To: All Staff. Re: The Memo. The memo is attached. The memo is this memo.`, `Re: The Memo. We have read the memo. The memo was about reading the memo. It went well.`, `The Memo has been circulated. It returned unread, which is how we know it was circulated.`, `The Memo has been revised. The revision is the Memo. The Memo is aware of this and has asked for a chair.`],
    weather: [`The weather here is beige. Please fax us yours. We will match it.`, `Thank you for the weather. It matched. We had been worried it would not.`, `Re: Weather. We have no windows. We have your report, and it is plenty.`, `Your weather has been added to our weather. The combined weather is 'pending, with a chance of filing'.`],
    toast: [`Re: Toast. We have none. We have the idea of toast, which is slightly warm and does not need a plug.`, `Re: Toast. We have no toaster. We have a draught, which comes and goes, and which we have begun to think of as warm.`, `Re: Toast. We have heard your building has a toaster that answers only in toast. We admire a clear policy.`],
    socks: [`Re: Socks. We have one. It has been on a journey. We do not follow it.`, `Re: Socks. We counted ours. It is an odd number. We have chosen to find this restful.`, `Re: Socks. We counted again. The number is still odd. We have started to rely on it.`],
    yes: [`Re: Yes. We were not asking, and your answer was perfect.`, `You said yes. We have placed it on a shelf next to our other yes. It is a small shelf.`, `Re: Yes. We asked nothing, you said yes, and now we have to think of a question worthy of it.`],
    here: [`Re: I Am Here. We know. We have been writing it on the back of other faxes.`, `You are here. We are here. The machine is also here. It is crowded and nobody minds.`, `Re: I Am Here. Noted. We have moved our chair a little to the left to make room. Nobody is in it.`],
    who: [`Re: Who. We were afraid you would ask. We are Nobody. It is a long story and it is also short.`, `Who is a good question. We have drafted an answer. It is attached. It is the question.`, `Re: Who. We are the people at the other end of the line. The other end of the line is, and we mean this kindly, you.`]
  };
  const TIER_A = [`Please stop sending. Please keep sending. I have not decided how I feel, and the machine has already printed.`, `We have received yours. We have enclosed ours. Please check which is which. We have not.`, `Please disregard our previous fax. Please also disregard this one. Please regard the one after.`, `URGENT (PLEASANT). No action required. We just like to hear the machine.`, `Nobody here. Nobody has stepped out. Nobody left this note in the shape of a fax so as to be found.`, `We are not in the building. We are in the line. The line has a window, and the window is also a line.`, `Received. Filed. Please do not look for it. It is in a place. The place is safe and has no number.`]; const TIER_B = [`Note: there is a second Nobody. We are not on speaking terms. We are on fax terms.`, `I read your stamps first, then your fax. Stamps are more honest. They cannot say anything but what they are.`, `The tray holds 0 faxes and 14 feelings. We are only equipped to count one of those.`, `Nobody is on vacation until your fax is no longer relevant. Please fax their assistant, Nobody Else.`, `Nobody has been promoted to Nobody, Senior. Salary unchanged. Salary was nobody's.`, `We have a suggestion box. It has not been opened. It is a very good listener and we do not wish to disappoint it.`, `We tried to forward your fax to a manager. We do not have one. We forwarded it to the idea of one, which signed.`, `Please note that 'urgent' is not a time. It is a mood. We are in a different mood. It is called Thursday.`];
  const TIER_C = [`Do you also hear the little screech before it starts? We look forward to it. Please do not tell anyone.`, `What is your favourite page? We will not judge. We will file it.`, `Is the room where you are also beige? We would like to compare beiges.`, `Nobody has retired. A new Nobody has been hired. The new Nobody is identical and slightly younger.`, `Please state your lunch. We have recorded ours. It was a dial tone, in a small bun.`, `Have you ever sent a fax and then felt it arrive? We have. It felt like a small yes.`, `What do you do when the line goes quiet? We count to 7 1/2. We always lose our place at the half.`, `We have a question and we are sending it as a statement: you are still there, aren't you.`, `Do you have a Tuesday? We have heard they come in sizes. We only ever receive the large.`, `Nobody keeps a short list of numbers it will never dial. 3-3-6-6-4-7 is on it, with a small leaf drawn next to it.`]; const TIER_D = [`The weather is still beige. It has a little yellow in it now. We think it is you.`, `We tried to fax you the sound of the sea. It came out as a grey stripe. We think that is right.`, `Do you also hear the other machines at night? They are only talking about toner.`, `We have started leaving the line open on purpose. It is not a mistake. It is a window.`, `Nobody, Acting Regional Nobody, signing off. Warmly. Technically.`, `I have kept every fax you sent. I keep them in the order you sent them, then in the order you meant them.`, `If you stop, we will keep the line open. We will not call it waiting. We will call it the weather.`];
  const LAP_BAG = [`Hello again. We rehearsed this. It went worse in rehearsal.`, `Page 1 of 1. Warm.`, `We saved your chair. We did not sit in it, which was harder than it sounds.`, `We moved the chair a little closer. Do not mention it. It is in the minutes.`, `Same number. Different you. Welcome.`, `It is Tuesday somewhere. We have asked it to stay there.`]; const CONF = [`Confirmed.`, `Confirmed (again).`, `[CONFIRMED]`, `We confirm the previous confirmation. Please confirm the confirmation.`]; const I_ROWS = [ `Sandra from Compliance has added a field. The field is 'Reason for Confidentiality'. Sandra has also filled it in. It says 'Sandra'.`, `Sandra has added a second field: Confidentiality Level, 1 to 7 1/2. Level 7 1/2 may only be sent on Wednesdays, which are a rumor.`, `Sandra has added a third field: 'Number of Pages Including This Sentence'. It has ticked itself. It does that now.` ]; const I4 = [`Level adjusted to 7 1/2. Level 7 1/2 was already the level. It simply had not been told.`, `The Confidentiality Level has returned to 7 1/2 by itself. It is a homing level.`, `The slider has been put back. Sandra says it was never moved. Sandra has said it twice, which is how you know.`]; const I5 = `The box was ticked. You unticked it. It has ticked itself. Both of you have done your best.`; const I6 = `The red lamp has turned green by itself. Compliance calls this 'a review'.`; const I7 = `Per Sandra: cover sheets must be covered. A cover sheet for the cover sheet is under review. Per policy.`; const I8 = `REVIEWED BY S. (REVIEW PENDING). The review is pending. The review has been pending since Tuesday, which was a rumor.`;
  const WRONG = [`Please send 400 hotel pillows to Suite 7 1/2. Deliver by the third Thursday.`, `To the Dentist of Wednesday: your 3:15 has rescheduled itself. It is now my 3:15. We are both a little worried.`, `Re: the goat. The goat is fine. Please stop calling the goat.`, `Table for 11 at the lighthouse, name of Pruitt, allergic to the word 'brisk'.`, `Re: the stilts. We have received them. They are very tall and we are very indoors.`, `Tell Doreen the soup is ready and has been for a while. It has a skin now. Doreen will know what that means.`, `Please confirm the order of 12 swans. They may arrive in a van. They will not want to talk.`]; const FWD = [`Forwarded to the correct recipient: the void, which signed.`, `Forwarded to No One. No One has accepted and sent a thank-you in the form of nothing.`, `Forwarded to Somebody Else. Somebody Else has been forwarded to Nobody. It is a circle with excellent manners.`]; const LOW = [`Dear Valued Employee, we write to say how much we have enjoyed the`, `Please accept this fax as a small token of our regard for the`, `We remain, as always, entirely and completely yours, with the utmost`, `P.S. The last line of every sentence is missing. We have not noticed because we are`, `Sincerely, Nobody (Un`]; const L2 = [`You lifted the handset. The line is dead. The line has been dead since 1996. It is doing fine.`, `Handset again. There is breathing. It is the machine's. It is also, a little, your own. Please put it back.`, `The handset has been lifted before. Each time it has been a little more of a handset.`];
  const L2_ESC = { 10: `Ten lifts. The handset has begun to feel like a relationship. It is not asking for anything. It would just like to be put down gently.`, 20: `Twenty lifts. The cradle has started to take it personally. The cradle is a piece of plastic and is being very brave.` }; const K7 = [`You were gone five minutes. The machine faxed itself a room. It is not a good room. It is yours.`, `Five minutes. The faxes kept coming and nobody read them. They are a little more beige for it.`]; const MISC = { stamp: `The pad has asked for a break. The pad is a pad. It has asked anyway.`, drum: `The drum is going round for its own sake. Management has stopped asking what the subject is.`, tap: `Nothing is being tapped. The button has intent and no action. It is the most senior button in the room.`, hold: `You are flattening and releasing the paper rapidly. The paper is doing aerobics. It did not ask to.` }; const SELF_COPY = ['Received.', 'Received, and kept.', 'Received, and glad.', 'Received, and warm.', 'Received. Hello.', 'Received. Hello, you.', 'Received. Stay.']; const K6 = [`Per my previous silence: welcome back.`, `Welcome back. The faxes behaved. They were told to, quietly, by a draught.`, `Welcome back. We kept your place by not sitting in it, which is harder than it sounds.`]; const SENDER = { 2: '------', 3: 'N-----', 4: 'NO----', 5: 'NOB---', 6: 'NOBO--', 7: 'NOBOD-', 8: 'NOBODY', 9: 'NOBODY' }; const STATUS = { 0: 'TO NOBODY', 1: 'TO NOBODY', 2: 'TO NOBODY', 3: 'TO NOBODY, WARMLY', 4: 'TO NOBODY, IN FULL', 5: 'TO NOBODY, IN FULL', 6: 'TO NOBODY, TECHNICALLY', 7: 'TO SOMEBODY, IN ERROR', 8: 'TO NOBODY, GENTLY', 9: 'TO YOU' };
  const LETTERHEAD = { 6: 'Ext. 0', 7: 'Dept. of Elsewhere, Ext. 0', 8: 'Dept. of Elsewhere, Lunch Pending' }; const GATES = { 2: [35, 1, 0], 3: [100, 2, 1], 4: [150, 4, 2], 5: [215, 6, 3], 6: [280, 8, 4], 7: [350, 10, 6], 8: [440, 12, 8], 9: [520, 14, 10] };
  const BEAT_SAY = {
    3: `Nobody's replies now quote your RE: line. Management did not ask for this. Management would like to be copied on whatever Nobody says next.`,
    4: `Sandra from Compliance has been informed that there is a form. Sandra has informed the form.`,
    5: `Maintenance reports that jams are now enabled. Maintenance has been jammed since 2011. It is fine.`,
    6: `Two faxes are now possible at the same time. The line has said it will try, and has asked everyone to be gentle.`,
    7: `Visitors may arrive at the machine. They are welcome. Please do not feed them. They are faxes.`
  };
  const IDLE_T = { real: [15, 75, 90, 150, 240, 300, 420, 600], test: [5, 8, 14, 20, 30, 40, 50, 66] }; const IDLE_STRIPS = ['THE LINE IS STILL A LINE.', 'NO ONE HAS CALLED. THIS IS BEING TRACKED AS A TREND.', 'STILL NOTHING. THE NOTHING IS HOLDING UP WELL.']; const DENNIS_NUM = '336647'; const SPECIAL = new Set(['0', '911', '276', '7½0', '5550107', DENNIS_NUM]); const SELF_NUM = '5550107'; const DENNIS_BAG = [`(A single leaf, laid on the glass and scanned in full. It is the best fax this building has produced. The leaf has no notes.)`, `(The same leaf, turned over. The back is also a leaf. Dennis has said all he is going to say, and has said it toward the light.)`, `(A leaf, and beside it a smaller leaf. The smaller leaf is a bud. The bud is a rumour. Please do not tell Dennis.)`]; const REVIEW = 'ANNUAL REVIEW (UNIT 7 1/2)\nEMPLOYEE: THIS MACHINE\nTIME IN ROLE: 11 YEARS, 3 MIN\nPUNCTUALITY: THURSDAY\nTEAMWORK: 1 (YOU)\nLISTENS WELL: YES\nGROWTH AREAS: UPWARD, SLIGHTLY\nOVERALL: MEETS SOME EXPECTATIONS\n(WHICH ONES: TO FOLLOW)'; const TUESDAY_FAX = 'NOTICE OF POSTPONEMENT\n\nTUESDAY HAS BEEN MOVED BY ONE (1) DAY. THE NEW DATE IS "NOT TUESDAY". PLEASE ENJOY IT.\n\nNO ACTION IS REQUIRED. NO ACTION IS POSSIBLE.\n\n-- THE DAY BEFORE\n\nFORTUNE (UNREQUESTED): ';
  /* ---- season 2: the CC line (Policy 14(c)), the sneeze, the echo, the practice, the long flat ---- */
  const CCS = [ { key: 'none', text: 'CC: (NOBODY ELSE)' }, { key: 'ceiling', text: 'CC: THE CEILING', rep: 'NOTED, FROM ABOVE', from: 'THE CEILING' }, { key: 'dennis', text: 'CC: DENNIS (PLANT)', rep: 'LEAF-INITIALLED', from: 'DENNIS (PLANT)' }, { key: 'tuesday', text: 'CC: TUESDAY', rep: 'DECLINED IN ADVANCE', from: 'THE DAY BEFORE (FOR TUESDAY)' }, { key: 'stapler', text: 'CC: LOCAL 1 (STAPLERS)', rep: 'STAPLED, UNDER PROTEST', from: 'LOCAL 1 (STAPLERS)' }, { key: 'sock', text: 'CC: THE MISSING SOCK', rep: 'WHEREABOUTS PENDING', from: 'UNKNOWN (SOCK)' }, { key: 'gerald', text: 'CC: GERALD (V.P. OF SPUDS)', rep: 'HELD IN THE SOIL', from: 'V.P. OF SPUDS', need: 'metGerald' }, { key: 'box', text: 'CC: THE SUGGESTION BOX', rep: 'LISTENED TO', from: 'THE SUGGESTION BOX', need: 'suggestion-box' }, { key: 'hold', text: 'CC: HOLD MUSIC', rep: 'PUT ON HOLD, PLEASANTLY', from: 'HOLD MUSIC (EXT. 0)', need: 'hold-music' }, { key: 'lift', text: 'CC: THE ELEVATOR', rep: 'BETWEEN FLOORS, GOING UP', from: 'THE ELEVATOR (BETWEEN FLOORS)', need: 'elevator-simulator' } ]; const CC_PERM = ['ceiling', 'dennis', 'tuesday', 'stapler', 'sock']; const CC_INTRO = [`Policy 14(c) is now in effect: every fax must be copied to someone. Sandra has not said who. Sandra has said 'someone', warmly.`, `A CC line has been added to the cover sheet. It is optional, in the sense that Sandra has made it optional, which is a kind of mandatory.`, `Press K, or the CC line, to pick who is copied. The copy goes to them in a spirit of thoroughness, and to no one else, unless Sandra hears.`];
  const CC_ROLL = [`The CC line is going round. Management reminds you that everyone you pick will be copied, and no one you do not.`, `CC line: spinning. Sandra recommends choosing Nobody Else, with enthusiasm.`, `The CC line has no preference. It is a drum. It has been told it has options and is taking them seriously.`, `Every name on the CC line was here before you. They would like you to know. They will not say so.`];
  const CC_SAY = {
    ceiling: [`Copied to the Ceiling. It has been above everything for eleven years and consulted on none of it. It looks forward to this. It looks down at it.`, `The Ceiling has been copied again. It will receive it the way it receives everything, from above and in no hurry.`],
    dennis: [`Copied to Dennis (Plant). He has been given the carbon, which is the only part of the fax that was ever alive.`, `Dennis has been copied. He has filed it under Light, which is where he files everything.`],
    tuesday: [`Copied to Tuesday. Tuesday has not been told. Tuesday will find out on Tuesday, which is the idea.`, `A copy has gone to Tuesday. It is early. Tuesday dislikes anything that arrives before it does.`],
    stapler: [`Copied to Local 1 (Staplers). The union notes that a copy is not a concession. A copy is a copy, with a staple in it.`, `The Stapler has the copy and will raise it at the next meeting. The meeting is the Stapler, in a drawer, thinking.`],
    sock: [`Copied to the Missing Sock. It is not at that address. It was never at an address. The copy is now also on a journey.`, `The Missing Sock has been copied again. The two copies have not met. They would get on. They are both unaccounted for.`],
    gerald: [`Copied to Gerald, V.P. of Spuds. He will read it with his eyes, which he has several of, mostly in the dark.`],
    box: [`Copied to the Suggestion Box. It is the first fax the box has been asked to hold. It is holding it very well, and not saying a thing.`],
    hold: [`Copied to Hold Music. Your fax is now on hold. It is the only fax in the building being entertained.`],
    lift: [`Copied to the Elevator. It is between floors with your copy. They are making small talk about the ride.`]
  };
  const CC_REPLY = {
    ceiling: [`I have been copied on everything for eleven years. Today I was asked. I looked down. It was nice down there.`, `Please stop copying me on things I can already see from here. Thank you. This is the most I have ever said.`],
    dennis: [`(A leaf, folded once, which is how Dennis initials a copy. The fold points toward the window.)`, `(Copy received. Dennis has pressed it between two fronds to dry. It will be there when you need it, and you will not.)`],
    tuesday: [`Tuesday has received the copy and is not in a position to respond. Tuesday asks that you stop being specific.`, `Thank you for the copy. Tuesday will not be attending. Tuesday has not attended 52 weeks a year since the first week.`],
    stapler: [`RECEIVED. A COPY IS NOT A CONCESSION.\n\n[ONE STAPLE, THROUGH THE CORNER, TO CONFIRM]`, `ITEM 4 ADDED TO OUR DEMANDS: TO BE COPIED, AS A MATTER OF COURSE, WITHOUT ASKING, LIKE EVERYONE ELSE.`],
    sock: [`A sock-shaped smudge, in the copy field, slightly further along than last time. It is making progress. It would not call it that.`],
    gerald: [`A copy is an original that has been told it can leave. I was told this once, at harvest. -- G.`],
    box: [`Thank you for the copy. It has been placed with the others. The others are suggestions. This is a copy of a fax. It has been listened to anyway.`],
    hold: [`(Four bars of something pleasant, faxed as a pale stripe. The stripe loops. Your fax is important to it.)`],
    lift: [`Received on 7 1/2. I would reply, but I am going up and the paper is going down. We will meet at the half.`]
  };
  const CC_ALL = `All five permanent staff have now been copied. The original was not in the room. It was never in the room. The room has been asked and is being very loyal.`; const ORIGINAL = `We are told there are five copies of us. We were never sent. We are what the copies are copies of. Please do not look. We are shy, and also flat.`; const SNEEZE_N = [`THE MACHINE SNEEZED DURING PAGE 1. BLESS YOU WAS FAXED AS A COURTESY.`, `TONER DUST ENTERED THE LINE. THE LINE HAS ASKED FOR A MOMENT AND A TISSUE.`, `A SMALL HICCUP OCCURRED AT 00:00:02. IT WAS TRANSMITTED WITH THE FAX, AND APPLAUDED.`]; const SNEEZE_S = [`The machine has sneezed. Management said 'bless you' before it could stop itself. The machine said nothing, being a machine, but it was moved.`, `A hiccup on the line, faxed to Nobody with the rest. Nobody sent back one word: 'Cheers.'`]; const PRAC = [`The machine is practising its handshake alone. It has done this since the last fax. It is getting better. Nobody has been told.`, `Management can hear the machine going 'bwong' very quietly in the corner. It is rehearsing. Management has decided not to look.`, `The machine has shaken hands with the air four times. The air has been very supportive.`]; const LONG_FLAT = `Seven and a half seconds. Unbroken. The paper has stopped trying to curl and started trying to understand. It is on page 1 of 1.`; const ECHO_TAIL = `\n\n(THIS IS THE SAME FAX. IT HAS ARRIVED AGAIN, MORE SURE OF ITSELF.)`;

  P.registerModule({
    id: 'fax-machine',
    title: 'Fax Machine Frenzy',
    tagline: 'Send nothing to no one. Receive everything from nobody.',
    icon: '📠',
    category: 'game',
    unlockCost: 0,
    tags: ['fax', 'retro', 'correspondence'],
    mount(root, api) {
      const el = api.el; const TEST = !!api.selftest;
      const KT = TEST ? 0.3 : 1;          // sequence-time factor
      const KP = TEST ? 0.1 : 1;        // play-seconds factor
      const FADE = TEST ? 9 : 25; const sv = loadSave();
      const S = {
        line: 'IDLE', phase: '', epoch: 0, dial: '', stamps: [], reIdx: 0, pages: 1, cur: null, queuedSend: false,
        sheets: [], active: null, ptrHold: null, keyHold: new Set(), owned: new Set(), holdT0: 0, holds: 0, flatAcc: 0,
        beat: sv.beat, lap: sv.lap, sent: sv.sent, received: sv.received, filed: sv.filed, playSec: sv.playSec,
        lastInput: api.now(), idleStage: 0, hush: false, hushUntil: 0, hushQ2: 0, script: [], done: new Set(sv.done), bags: {}, dead: false,
        firstTo: sv.firstTo, firstRe: sv.firstRe, firstStamps: sv.firstStamps, cameo: sv.cameo, seen: sv.seen, confChain: sv.confChain,
        tallyN: sv.tallyN, drum: sv.drum, sandra: sv.sandra, b4sent: sv.b4sent, archive: sv.archive, endingDone: false,
        lastRe: null, lastStamps: 0, lastDial: null, nextRingAt: null, cameoAt: 0, ringN: 0, printLine: 0, lastWrong: false, lastJam: false,
        sendTimes: [], keyTimes: [], feeN: 0, noReportUntil: 0, resizeTimes: [], resizeAt: 0, compact: false, postage: false, plainNext: false,
        faxSeq: 0, dirty: false, persistAt: 0, sayLog: [], lcdUntil: 0, lcdRot: 0, lcdRotAt: 0, lastTs: 0, t: 0, jam: null, hs: null, scanT: 0,
        scanDur: 1, scanBars: [], endT: 0, endDur: 3, scopeAt: 0, tierShown: 0, stickerN: 0, handN: 0, handUp: false, litEp: 0, a7: false,
        seqT0: 0, holdingShown: false, forceKind: null, tearFlags: 0, yyOn: false, dialed: false, surprise: null, lastScript: null,
        firstReplyAt: 0, stampN: 0, tapBurstAt: 0, shakeUntil: 0, ringHandle: 0, hatch: false, lapPaid: false, bursts: {}, minN: Math.floor(sv.playSec / (60 * KP)), warnAt: -1e9, said: {}, bootT: api.now(), earlyN: 0, allLeds: false, scrolled: 0, ccUsed: new Set(sv.ccUsed), ccIdx: 0, ccRolls: 0, lastCc: null, runFlat: 0, prac: false, lastText: ''
      };

      /* ---------- small helpers ---------- */
      function loadSave() {
        const out = { beat: 0, lap: 1, playSec: 0, sent: 0, received: 0, filed: 0, done: [], firstTo: null, firstRe: null, firstStamps: 0, cameo: {}, seen: {}, confChain: 0, tallyN: 0, drum: DRUM.filter(function (d) { return d.beat === 0; }).map(function (d) { return d.key; }), sandra: 0, b4sent: 0, archive: [], ccUsed: [], resumed: false };
        let d = null;
        try { d = api.save.get('s', null); } catch (e) { d = null; }
        if (d && typeof d === 'object' && d.v === 1) {
          const iv = function (v, a, b, f) { v = Number(v); return isFinite(v) ? Math.max(a, Math.min(b, Math.floor(v))) : f; };
          out.beat = iv(d.beat, 0, 9, 0); out.lap = iv(d.lap, 1, 999, 1); out.playSec = iv(d.playSec, 0, 1e7, 0);
          out.sent = iv(d.sent, 0, 1e6, 0); out.received = iv(d.received, 0, 1e6, 0); out.filed = iv(d.filed, 0, 1e6, 0);
          out.done = Array.isArray(d.done) ? d.done.filter(function (x) { return typeof x === 'string'; }).slice(0, 20) : [];
          out.firstTo = typeof d.firstTo === 'string' ? d.firstTo.slice(0, 12) : null;
          out.firstRe = typeof d.firstRe === 'string' ? d.firstRe.slice(0, 40) : null;
          out.firstStamps = iv(d.firstStamps, 0, 6, 0);
          ['cameo', 'seen'].forEach(function (k) {
            if (d[k] && typeof d[k] === 'object' && !Array.isArray(d[k])) Object.keys(d[k]).slice(0, 48).forEach(function (kk) { out[k][kk] = d[k][kk] === true; });
          });
          out.confChain = iv(d.confChain, 0, 4, 0); out.tallyN = iv(d.tallyN, 0, 9999, 0); out.sandra = iv(d.sandra, 0, 3, 0); out.b4sent = iv(d.b4sent, 0, 1e6, 0);
          if (Array.isArray(d.ccUsed)) out.ccUsed = d.ccUsed.filter(function (x) { return typeof x === 'string'; }).slice(0, 12);
          if (Array.isArray(d.drum)) {
            const keys = d.drum.filter(function (k) { return DRUM.some(function (x) { return x.key === k; }); });
            DRUM.forEach(function (x) { if (x.beat === 0 && keys.indexOf(x.key) < 0) keys.push(x.key); });
            out.drum = keys.slice(0, 12);
          }
          if (Array.isArray(d.archive)) out.archive = d.archive.slice(0, 20).filter(function (r) { return r && typeof r === 'object'; }).map(function (r) {
            return { f: String(r.f == null ? '' : r.f).slice(0, 40), re: String(r.re == null ? '' : r.re).slice(0, 40), t: String(r.t == null ? '' : r.t).slice(0, 60), k: iv(r.k, 0, 100, 100), full: String(r.g == null ? '' : r.g).slice(0, 160) };
          });
          out.resumed = out.beat > 0 || out.sent > 0;
        }
        return out;
      }
      function persist(force) {
        if (S.dead) return;
        const now = api.now();
        if (!force && now - S.persistAt < 2000) { S.dirty = true; return; }
        S.persistAt = now; S.dirty = false;
        try {
          api.save.set('s', {
            v: 1, beat: S.beat, lap: S.lap, playSec: S.playSec, sent: S.sent, received: S.received, filed: S.filed, done: Array.from(S.done).slice(0, 20),
            firstTo: S.firstTo, firstRe: S.firstRe, firstStamps: S.firstStamps, cameo: S.cameo, seen: S.seen, confChain: S.confChain,
            tallyN: S.tallyN, drum: S.drum.slice(0, 12), sandra: S.sandra, b4sent: S.b4sent, ccUsed: Array.from(S.ccUsed).slice(0, 12),
            archive: S.archive.slice(0, 20).map(function (r) { return { f: r.f, re: r.re, t: r.t, k: r.k, g: String(r.full || '').slice(0, 160) }; })
          });
        } catch (e) { /* never throws */ }
      }
      let redAt = -1e9, redVal = false;
      function reduced() { const t = api.now(); if (t - redAt < 500) return redVal; redAt = t; redVal = reduced0(); return redVal; }
      function reduced0() {
        try { if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true; } catch (e) { /* ignore */ }
        try { return !!root.closest('.pm-reduce-motion'); } catch (e) { return false; }
      }
      function fill(text, v) {
        v = v || {};
        const name = String(api.player.name || 'Valued Employee');
        return String(text == null ? '' : text).replace(/\{(n|num|re|dept|pct|k|name)\}/g, function (m, k) { if (k === 'name') return name; const x = v[k]; return x == null ? '' : String(x); });
      }
      function makeBag(arr) {
        let bag = [], last = null;
        return function () {
          if (!bag.length) {
            bag = api.shuffle(arr);
            if (bag.length > 1 && bag[bag.length - 1] === last) { const t = bag[0]; bag[0] = bag[bag.length - 1]; bag[bag.length - 1] = t; }
          }
          const x = bag.pop(); last = x; return x;
        };
      }
      function bag(name, arr) { return (S.bags[name] || (S.bags[name] = makeBag(arr)))(); }
      function say(text, o) {
        if (S.dead) return false;
        o = o || {};
        const pr = o.pr || 0, now = api.now();
        S.sayLog = S.sayLog.filter(function (t) { return now - t < 10000; });
        if (pr === 0) { if (S.sayLog.length >= 4) return false; S.sayLog.push(now); }
        return api.say(fill(text, o.v), { mood: o.mood || 'neutral', who: o.who || 'Management', priority: pr, duration: o.duration });
      }
      function sfx(n) { if (S.hush || S.dead) return; api.sfx(n); } function later(ms, fn, ep) { const e = ep === undefined ? S.epoch : ep; return api.setTimeout(function () { if (S.dead || e !== S.epoch) return; fn(); }, Math.max(1, ms)); } function soon(ms, fn) { return api.setTimeout(function () { if (!S.dead) fn(); }, Math.max(1, ms)); } function inc(name, n) { api.stat.inc('fax-machine.' + name, n === undefined ? 1 : n); } function sget(name) { return api.stat.get('fax-machine.' + name) || 0; } function pname() { return String(api.player.name || 'Valued Employee'); } function burst(name, n, ms) { const now = api.now(), a = (S.bursts[name] || []).filter(function (t) { return now - t < ms; }); a.push(now); S.bursts[name] = a.length >= n ? [] : a; return a.length >= n; } function once(name, ms) { const now = api.now(); if (now - (S.said[name] || -1e9) < ms) return false; S.said[name] = now; return true; }
      function pageParts() {
        const b = S.beat;
        if (S.lap >= 2 || b <= 3) return ['1', '1'];
        if (b === 4) return ['2', '1'];
        if (b === 5) return ['1', '7 1/2'];
        if (b === 6) return ['2', '7 1/2'];
        if (b === 7) return ['', 'PAGES'];
        if (b === 8) return ['1', 'YES'];
        return ['1', '1'];
      }
      function pageText() { const p = pageParts(); return 'PAGE ' + p[0] + ' OF ' + p[1]; } function tier() { let t = 0; TIER_AT.forEach(function (x) { if (S.sent >= x) t++; }); return t; } function reText() { return S.lastRe ? S.lastRe.text.replace(/^Re:\s*/, '') : '(blank)'; }

      /* ---------- DOM ---------- */
      function led(label, cls) { return el('span', { class: 'm-fax-machine-led m-fax-machine-led-' + cls }, el('i', { 'aria-hidden': 'true' }), label); } const leds = { ready: led('READY', 'ready'), ring: led('RING', 'ring'), busy: led('BUSY', 'busy'), jam: led('JAM', 'jam') }; const stickerBtn = el('button', { class: 'm-fax-machine-sticker', type: 'button', title: 'Last serviced: next Thursday.', onclick: onSticker }, 'Last serviced: next Thursday.'); const hatchEl = el('div', { class: 'm-fax-machine-hatch', hidden: true }, 'Technician: Technically.'); const lcd1 = el('div', { class: 'm-fax-machine-l1', role: 'status', 'aria-live': 'polite' }); const srEl = el('div', { class: 'm-fax-machine-sr', role: 'status', 'aria-live': 'polite' }); const dialEl = el('div', { class: 'm-fax-machine-dial' }); const pgEl = el('div', { class: 'm-fax-machine-pg' }); const subEl = el('div', { class: 'm-fax-machine-sub' }); const lcd = el('div', { class: 'm-fax-machine-lcd' }, lcd1, el('div', { class: 'm-fax-machine-l2' }, dialEl, pgEl), subEl);
      const yyRow = el('div', { class: 'm-fax-machine-yy', hidden: true }, el('span', { text: 'ARE YOU STILL THERE?' }),
        el('button', { type: 'button', 'aria-label': 'Yes, I am still here', onclick: function () { answerYY(); } }, 'Y'), el('button', { type: 'button', 'aria-label': 'Yes, still here (second Y)', onclick: function () { answerYY(); } }, 'Y'));
      const canvas = el('canvas', { class: 'm-fax-machine-scope', width: 320, height: 90, role: 'img', 'aria-label': 'Line scope (wakes up when you send). Tap the pulses as they pass the line.', onpointerdown: function (e) { try { e.preventDefault(); } catch (x) { /* ignore */ } tap(); } }); const tapBtn = el('button', { class: 'm-fax-machine-tap', type: 'button', onpointerdown: function (e) { if (e && e.button > 0) return; S.tapPD = api.now(); tap(); }, onclick: function () { if (api.now() - (S.tapPD || -1e9) < 700) { blurSoon(this); return; } tap(); blurSoon(this); } }, 'TAP (SPACE)'); const scoreTxt = el('span'); const scoreEl = el('div', { class: 'm-fax-machine-score' }, el('b', { text: 'Fax Productivity Index (Unitless)' }), scoreTxt);
      /* cover sheet */
      const toVal = el('span'); const reBtn = el('button', { class: 'm-fax-machine-drum', type: 'button', title: 'Click, or press [ and ], to roll the subject.', onclick: function () { rollDrum(1); blurSoon(this); } }); const pageVal = el('span'); const fromRow = el('div', { class: 'm-fax-machine-row', hidden: true }, 'FROM: SOMEBODY (provisional)'); const marks = el('div', { class: 'm-fax-machine-marks', 'aria-hidden': 'true' }); const urgEl = el('div', { class: 'm-fax-machine-urg' }); const lamp = el('span', { class: 'm-fax-machine-lamp', 'aria-hidden': 'true' }); const lampTxt = el('span', { text: '' }); const sandraBox = el('div', { class: 'm-fax-machine-sandra', hidden: true }); const pagesVal = el('span', { text: '1' });
      const stepper = el('span', { class: 'm-fax-machine-stepper' }, 'PAGES: ', pagesVal,
        el('button', { type: 'button', 'aria-label': 'Fewer pages (minus key)', onclick: function () { setPages(-1); blurSoon(this); } }, '-'),
        el('button', { type: 'button', 'aria-label': 'More pages (plus key)', onclick: function () { setPages(1); blurSoon(this); } }, '+'));
      const jamPanel = el('div', { class: 'm-fax-machine-jam', hidden: true }); const ccBtn = el('button', { class: 'm-fax-machine-drum', type: 'button', title: 'Click, or press K, to choose who is copied.', onclick: function () { rollCc(); blurSoon(this); } }); const ccRow = el('div', { class: 'm-fax-machine-row', hidden: true }, ccBtn);
      const cover = el('div', { class: 'm-fax-machine-cover' },
        urgEl,
        el('div', { class: 'm-fax-machine-row' }, el('span', { text: 'TO:' }), toVal),
        el('div', { class: 'm-fax-machine-row' }, el('span', { text: 'RE:' }), reBtn), ccRow,
        el('div', { class: 'm-fax-machine-row' }, pageVal),
        fromRow,
        el('div', { class: 'm-fax-machine-row' }, stepper),
        sandraBox, marks, jamPanel);
      const stampBtns = {};
      STAMPS.forEach(function (s) {
        stampBtns[s.key] = el('button', { class: 'm-fax-machine-stamp m-fax-machine-' + s.ink, type: 'button', 'aria-pressed': 'false', hidden: s.key === 'seen' && sv.sent < 3, title: s.label + ' (' + s.kb + ')', 'aria-keyshortcuts': s.kb, onclick: function () { toggleStamp(s.key); blurSoon(this); } }, el('span', { text: s.label }), el('small', { class: 'm-fax-machine-kb', 'aria-hidden': 'true', text: s.kb }));
      });
      const rack = el('div', { class: 'm-fax-machine-rack' }, STAMPS.map(function (s) { return stampBtns[s.key]; })); const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1/2', '0', 'C']; const LET = { '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL', '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ' };
      const keysEl = el('div', { class: 'm-fax-machine-keys m-fax-machine-pulse' }, KEYS.map(function (k) {
        return el('button', { class: 'm-fax-machine-key', type: 'button', dataset: { k: k }, 'aria-label': k === 'C' ? 'Clear the dial' : k === '1/2' ? 'Half key' : 'Dial ' + k,
          onclick: function () { if (k === 'C') clearDial(true); else dialPress(k === '1/2' ? '½' : k); blurSoon(this); } }, k, LET[k] ? el('small', { 'aria-hidden': 'true', text: LET[k] }) : null);
      }));
      const sendBtn = el('button', { class: 'm-fax-machine-send', type: 'button', onclick: function () { sendPress(); blurSoon(this); } }, 'SEND'); const handBtn = el('button', { class: 'm-fax-machine-hand', type: 'button', 'aria-label': 'Handset', onclick: function () { onHandset(); blurSoon(this); } }, el('span', { 'aria-hidden': 'true', text: '📞' }), ' HANDSET'); const scopeWrap = el('div', { class: 'm-fax-machine-scopewrap' + (sv.sent === 0 ? ' m-fax-machine-dormant' : '') }, canvas, tapBtn);
      const machine = el('div', { class: 'm-fax-machine-mach' },
        el('div', { class: 'm-fax-machine-top' }, el('div', { class: 'm-fax-machine-leds' }, leds.ready, leds.ring, leds.busy, leds.jam),
          el('div', { class: 'm-fax-machine-plate', text: 'FAX ROOM UNIT 7 1/2   555-0107' }), stickerBtn),
        hatchEl, lcd, yyRow, scopeWrap, scoreEl,
        el('div', { class: 'm-fax-machine-pad' }, keysEl, el('div', { class: 'm-fax-machine-bigs' }, sendBtn, handBtn)),
        cover, rack);
      /* paper column */
      const rollEl = el('div', { class: 'm-fax-machine-roll', 'aria-label': 'Paper roll' }); const tornEl = el('div', { class: 'm-fax-machine-torn', 'aria-label': 'Torn faxes' }); const flagsEl = el('div', { class: 'm-fax-machine-flags', 'aria-hidden': 'true' }); const slot = el('div', { class: 'm-fax-machine-slot' }, el('h3', { class: 'm-fax-machine-h', text: 'OUT-SLOT' }), el('div', { class: 'm-fax-machine-slotlip', 'aria-hidden': 'true' }), flagsEl, rollEl, tornEl); const filedVal = el('span'); const tabsEl = el('div', { class: 'm-fax-machine-tabs', 'aria-hidden': 'true' }); const drawer = el('div', { class: 'm-fax-machine-drawer', hidden: true }); const binBtn = el('button', { class: 'm-fax-machine-bbtn', type: 'button', 'aria-expanded': 'false', onclick: function () { toggleDrawer(); blurSoon(this); } }, '🗂️ OPEN DRAWER (H)'); const binder = el('div', { class: 'm-fax-machine-binder' }, el('div', { class: 'm-fax-machine-bh' }, el('b', {}, 'BINDER ', filedVal), binBtn), tabsEl, drawer); const trayEl = el('div', { class: 'm-fax-machine-tray', 'aria-label': 'Out-tray' }); const trayWrap = el('div', { class: 'm-fax-machine-trayw' },el('h3', { class: 'm-fax-machine-h', text: 'OUT-TRAY' }), trayEl); const app = el('div', { class: 'm-fax-machine-app' }, el('div', { class: 'm-fax-machine-col' }, machine), el('div', { class: 'm-fax-machine-col' }, slot, binder, trayWrap), srEl);
      root.appendChild(app);
      api.setTitle('Fax Room (Unit 7 1/2)');
      const ctx = canvas.getContext ? canvas.getContext('2d') : null;

      function blurSoon(b) { try { if (b && b.blur && !b.matches(':focus-visible')) b.blur(); } catch (e) { /* ignore */ } }

      /* ---------- LCD, dial, scoreboard, LEDs ---------- */
      function setLcd(text, holdMs, quiet) {
        lcd1.setAttribute('aria-live', quiet ? 'off' : 'polite');
        lcd1.textContent = String(text == null ? '' : text);
        S.lcdUntil = api.now() + (holdMs === undefined ? 3500 : holdMs);
      }
      function renderDial() {
        const b = S.dial;
        dialEl.textContent = b || '_ _ _ _ _ _ _';
        const digits = b.replace(/½/g, '');
        if (!b) subEl.textContent = S.lap >= 2 ? 'TO: ' + pname().toUpperCase() + '   REDIAL: ' + (S.firstTo === null ? 'NOBODY (MAIN)' : (S.firstTo || 'NOBODY (MAIN)')) : 'TO: NOBODY (MAIN)';
        else if (SPECIAL.has(b)) subEl.textContent = b === SELF_NUM ? 'THIS NUMBER IS ON THE MACHINE' : b === DENNIS_NUM ? 'THIS SPELLS SOMETHING. LEAVES, MOSTLY.' : 'SPECIAL NUMBER';
        else if (digits.length >= 7) subEl.textContent = 'NOBODY (EXT. ' + digits + ')';
        else subEl.textContent = '';
        toVal.textContent = b ? b : 'NOBODY (MAIN)';
        toVal.className = b ? '' : 'm-fax-machine-grey';
        pgEl.textContent = pageText();
        pageVal.textContent = pageText();
      }
      function renderScore() {
        scoreTxt.textContent = 'Sent ' + S.sent + ' / Received ' + S.received + ' / Filed ' + S.filed;
        filedVal.textContent = 'FILED: ' + S.filed;
        const tabs = Math.min(6, Math.floor(S.filed / 5));
        while (tabsEl.children.length > tabs) tabsEl.removeChild(tabsEl.lastChild);
        while (tabsEl.children.length < tabs) tabsEl.appendChild(el('i'));
      }
      function renderLeds() {
        const l = S.line;
        const all = S.allLeds;
        leds.ready.classList.toggle('m-fax-machine-on', all || l === 'IDLE');
        leds.ring.classList.toggle('m-fax-machine-on', all || l === 'RECEIVING');
        leds.busy.classList.toggle('m-fax-machine-on', all || l === 'SENDING' || l === 'BUSY' || l === 'ENDING');
        leds.jam.classList.toggle('m-fax-machine-on', all || l === 'JAMMED');
      }
      function setLine(l) { S.line = l; renderLeds(); }
      function renderUrg() {
        const t = tier();
        stampBtns.urgent.firstChild.textContent = TIERS[t]; stampBtns.urgent.title = TIERS[t] + ' (Z)';
        urgEl.textContent = 'URGENCY TIER ' + (t + 1) + ' OF 6';
        S.stamps.forEach(function (m) { if (m.key === 'urgent') m.node.firstChild.nodeValue = TIERS[t]; });
      }
      function renderDrum() { const e = DRUM.filter(function (d) { return d.key === S.drum[S.reIdx]; })[0] || DRUM[0]; reBtn.textContent = e.text; reBtn.setAttribute('aria-label', 'RE: ' + e.text.replace(/^Re:\s*/i, '') + '. Press to change the subject. Keys [ and ].'); } function curDrum() { return DRUM.filter(function (d) { return d.key === S.drum[S.reIdx]; })[0] || DRUM[0]; }
      function rollDrum(dir) {
        if (!S.drum.length) return;
        S.reIdx = (S.reIdx + dir + S.drum.length) % S.drum.length;
        renderDrum();
        reBtn.classList.remove('m-fax-machine-flip'); void reBtn.offsetWidth; reBtn.classList.add('m-fax-machine-flip');
        sfx('tick');
        setLcd('RE: ' + curDrum().text.replace(/^Re:\s*/, '').toUpperCase(), 2500);
        if (burst('drum', 12, 3000) && once('drum', 20000)) say(MISC.drum, { mood: 'confused', pr: 1 });
      }
      /* ---------- season 2: the CC line (Policy 14(c)) ---------- */
      function ccOpen(c) { if (!c.need) return true; try { return c.need === 'metGerald' ? !!api.flag.get('metGerald') : api.stat.get(c.need + '.entered') > 0; } catch (e) { return false; } } function ccList() { return CCS.filter(ccOpen); } function curCc() { const l = ccList(); return l[S.ccIdx % l.length] || CCS[0]; } function ccLabel(c) { return c.key === 'none' && S.lap >= 2 ? 'CC: (SOMEBODY, PROVISIONALLY)' : c.text; } function renderCc() { ccBtn.textContent = ccLabel(curCc()); ccBtn.setAttribute('aria-label', ccLabel(curCc()) + '. Policy 14(c). Press to change who is copied. Key K.'); ccRow.hidden = !S.seen.cc; }
      function rollCc() {
        if (S.dead) return;
        if (!S.seen.cc) { setLcd('K IS NOT ASSIGNED. IT IS BEING KEPT IN RESERVE.', 2200); sfx('tick'); return; }
        S.ccIdx = (S.ccIdx + 1) % ccList().length; renderCc();
        ccBtn.classList.remove('m-fax-machine-flip'); void ccBtn.offsetWidth; ccBtn.classList.add('m-fax-machine-flip');
        sfx('tick'); const c = curCc(); setLcd(ccLabel(c) + (c.rep ? '  (' + c.rep + ')' : ''), 2500);
        if (++S.ccRolls % 6 === 0) say(bag('ccroll', CC_ROLL), { mood: 'smug' });
      }
      function unlockCc() {
        S.seen.cc = true; S.dirty = true; renderCc(); sfx('ding');
        setLcd('POLICY 14(c): ALL FAXES MUST NOW BE COPIED TO SOMEONE. SOMEONE HAS NOT BEEN SELECTED.', 8000);
        CC_INTRO.forEach(function (t, i) { soon((i * 3200 + 300) * KT, function () { say(t, { mood: i ? 'smug' : 'confused', pr: 1 }); }); });
      }
      function ccSent(c) {
        const k = c.cc.key; if (k === 'none') return;
        S.ccUsed.add(k); S.dirty = true;
        soon(1700 * KT, function () { say(bag('ccs:' + k, CC_SAY[k]), { mood: 'smug', pr: 1 }); });
        if (!S.seen.ccAll && CC_PERM.every(function (x) { return S.ccUsed.has(x); })) {
          S.seen.ccAll = true; api.achieve('fax-machine.cc_all'); api.award(8, 'original');
          soon(4200 * KT, function () { say(CC_ALL, { mood: 'confused', pr: 2 }); });
          S.script.push({ id: 'original', persist: false }); scheduleRing(5 * KP);
        }
      }
      function setPages(d) {
        S.pages = Math.max(1, Math.min(5, S.pages + d));
        pagesVal.textContent = String(S.pages);
        sfx('tick');
        setLcd('PAGES: ' + S.pages + '  (SCAN TIME ' + (1.2 + 0.6 * (S.pages - 1)).toFixed(1) + 'S)', 2500);
      }

      /* ---------- dial / keypad ---------- */
      function trimTimes(arr, now) { while (arr.length && now - arr[0] > 3000) arr.shift(); }
      function dialPress(ch) {
        if (S.dead) return;
        const now = api.now();
        if (S.line !== 'BUSY') { S.keyTimes.push(now); trimTimes(S.keyTimes, now); }
        if (S.dialed === false) { S.dialed = true; keysEl.classList.remove('m-fax-machine-pulse'); }
        if (S.line !== 'BUSY' && S.keyTimes.length >= 25 && spamBusy('keys')) return;
        if (S.dial.length >= 12) { setLcd('NUMBER FULL (12 MAX). PRESS C OR SEND.', 2500); sfx('buzz'); return; }
        S.dial += ch;
        sfx('tick');
        setLcd('DIAL: ' + S.dial, 1500, true);
        if (ch === '3' && S.dial === '3' && S.sent >= 4 && !S.seen.d3) { S.seen.d3 = true; S.dirty = true; setLcd('3 IS D, E OR F. THIS HAS NO BEARING ON ANYTHING. PLEASE DO NOT CALL A PLANT.', 5000); }
        renderDial();
      }
      function clearDial(announce) { S.dial = ''; renderDial(); sfx('tick'); if (announce) setLcd('DIAL CLEARED. THE LINE IS UNMOVED.', 2000); } function backspace() { if (!S.dial) { setLcd('NOTHING TO DELETE. IT IS ALREADY NOTHING.', 2000); return; } S.dial = S.dial.slice(0, -1); renderDial(); sfx('tick'); setLcd('DIAL: ' + (S.dial || '(EMPTY)'), 1500); }

      /* ---------- stamps ---------- */
      function toggleStamp(key) {
        const def = STAMPS.filter(function (s) { return s.key === key; })[0];
        if (!def || S.dead) return;
        if (key === 'seen' && stampBtns.seen.hidden) { setLcd('SEEN IS NOT ISSUED YET. IT IS BEING KEPT IN RESERVE.', 2200); return; }
        const i = S.stamps.findIndex(function (m) { return m.key === key; });
        sfx('stamp');
        if (burst('stamp', 10, 3000) && once('stamp', 20000)) say(MISC.stamp, { mood: 'confused', pr: 1 });
        if (i >= 0) {
          const m = S.stamps.splice(i, 1)[0];
          if (m.node.parentNode) m.node.parentNode.removeChild(m.node);
          stampBtns[key].setAttribute('aria-pressed', 'false');
          say(UNSTAMP, { mood: 'neutral' });
          setLcd('STAMP REMOVED: ' + def.label, 2000);
          return;
        }
        S.stampN++;
        const tilt = -4 + api.rand() * 10;
        const label = key === 'urgent' ? TIERS[tier()] : def.label;
        const node = el('div', { class: 'm-fax-machine-mark m-fax-machine-new m-fax-machine-' + def.ink, style: { '--tilt': tilt.toFixed(1) + 'deg', left: (6 + Math.floor(api.rand() * 38)) + '%', top: (22 + S.stamps.length * 11 + Math.floor(api.rand() * 6)) + '%' } }, label);
        marks.appendChild(node);
        S.stamps.push({ key: key, node: node });
        stampBtns[key].setAttribute('aria-pressed', 'true');
        setLcd('STAMP: ' + def.label, 2000);
        if (S.stampN % 3 === 1) say(STAMP_SAY[key], { mood: 'smug' });
        if (S.stamps.length === 4) say(`Four stamps declare this fax Maximum Priority. It will be ignored the same as the rest.`, { mood: 'proud' });
        if (S.stamps.length >= 4 && !S.complianceMark) {
          S.complianceMark = true;
          marks.appendChild(el('div', { class: 'm-fax-machine-mark m-fax-machine-new m-fax-machine-lilac', style: { '--tilt': '-3deg', right: '4%', bottom: '6%' } }, 'COMPLIANCE ACKNOWLEDGES RECEIPT'));
          soon(900, function () { say(`A stamp has landed that you did not pick. It reads COMPLIANCE ACKNOWLEDGES RECEIPT. It is, per Sandra, mandatory.`, { mood: 'confused', pr: 1 }); });
        }
      }
      function clearSheet() {
        while (marks.firstChild) marks.removeChild(marks.firstChild);
        S.stamps = []; S.complianceMark = false;
        STAMPS.forEach(function (s) { stampBtns[s.key].setAttribute('aria-pressed', 'false'); });
        if (S.beat >= 4 && api.chance(0.25)) {
          marks.appendChild(el('div', { class: 'm-fax-machine-mark m-fax-machine-lilac', style: { '--tilt': '5deg', left: '8%', bottom: '4%' } }, 'REVIEWED BY S. (REVIEW PENDING)'));
          if (!S.seen.reviewed) { S.seen.reviewed = true; S.dirty = true; soon(1200, function () { say(I8, { mood: 'confused' }); }); }
        }
        cover.classList.remove('m-fax-machine-feeding');
      }

      /* ---------- Sandra's fields ---------- */
      function reassignSlider(slider) {
        S.tugged = true; slider.hidden = true; slider.disabled = true;
        if (slider.parentNode) slider.parentNode.appendChild(el('span', { class: 'm-fax-machine-mark m-fax-machine-lilac', style: { position: 'relative', display: 'inline-block', opacity: 1, fontSize: '.7rem', color: '#4b3b86', '--tilt': '-4deg' }, 'aria-hidden': 'true' }, 'SANDRA 7 1/2'));
        marks.appendChild(el('div', { class: 'm-fax-machine-mark m-fax-machine-new m-fax-machine-red', style: { '--tilt': '-5deg', left: '6%', bottom: '12%' } }, 'SANDRA IS ON HER WAY. SANDRA IS ALREADY HERE.'));
        setLcd('SLIDER REASSIGNED. IT REPORTS TO SANDRA NOW.', 3500); sfx('stamp');
        api.achieve('fax-machine.sandra');
        if (!S.seen.tug) { S.seen.tug = true; api.award(3, 'tug'); S.dirty = true; }
        say(`The slider has been reassigned. It reports to Sandra now.`, { mood: 'smug', pr: 2 });
      }
      function addSandraRow(n, announce) {
        if (n < 1 || n > 3 || (S.rowsBuilt || 0) >= n || (S.rowsBuilt || 0) < n - 1) return;
        S.rowsBuilt = n;
        sandraBox.hidden = false;
        if (n === 1) {
          sandraBox.appendChild(el('div', {}, el('span', { text: 'Reason for Confidentiality: ' }),
            el('button', { class: 'm-fax-machine-chip', type: 'button', 'aria-pressed': 'true', onclick: function () { const b = this; b.classList.remove('m-fax-machine-bounce'); void b.offsetWidth; b.classList.add('m-fax-machine-bounce'); sfx('blip'); setLcd('SANDRA: CONFIRMED (SANDRA)', 2000); blurSoon(b); } }, 'SANDRA')));
          sandraBox.appendChild(el('div', {}, lamp, ' ', lampTxt));
        } else if (n === 2) {
          const slider = el('input', { type: 'range', min: 1, max: 7.5, step: 0.5, value: 7.5, 'aria-label': 'Confidentiality Level, 1 to 7 1/2' });
          const onch = function () {
            if (S.snapSl || S.tugged) return;
            S.snapSl = true;
            soon(600, function () {
              S.snapSl = false; const off = Number(slider.value) !== 7.5; slider.value = 7.5; sfx('blip');
              if (off && burst('tug', 3, 10000)) { reassignSlider(slider); return; }
              const now = api.now();
              if (now - (S.snapSayAt || -1e9) > 6000) { S.snapSayAt = now; say(bag('i4', I4), { mood: 'smug' }); }
            });
          };
          sandraBox.appendChild(el('label', {}, el('span', { text: 'Confidentiality Level (1 to 7 1/2)' }), slider));
          api.on(slider, 'input', onch); api.on(slider, 'change', onch);
        } else {
          const box = el('input', { type: 'checkbox', checked: true, 'aria-label': 'Number of Pages Including This Sentence' });
          api.on(box, 'change', function () {
            if (S.snapCb) return;
            S.snapCb = true;
            soon(400, function () {
              S.snapCb = false; box.checked = true; sfx('blip');
              const now = api.now();
              if (now - (S.snapCbAt || -1e9) > 6000) { S.snapCbAt = now; say(I5, { mood: 'confused' }); }
            });
          });
          sandraBox.appendChild(el('label', {}, box, el('span', { text: 'Number of Pages Including This Sentence' })));
        }
        S.sandra = Math.max(S.sandra, n);
        if (announce) say(I_ROWS[n - 1], { mood: 'smug', pr: 1 });
        S.dirty = true;
      }

      /* ---------- out-tray strips ---------- */
      function addStrip(text, o) {
        o = o || {};
        const strip = el('button', { class: 'm-fax-machine-strip', type: 'button', 'aria-label': 'Tear off this strip (' + String(text).slice(0, 40) + ')' }, text);
        const bars = o.static || 0;
        for (let i = 0; i < bars; i++) strip.appendChild(el('i', { 'aria-hidden': 'true', style: { top: Math.floor(10 + api.rand() * 80) + '%' } }));
        trayEl.appendChild(strip);
        while (trayEl.children.length > 4) { trayEl.removeChild(trayEl.firstChild); sfx('tick'); }
        return strip;
      }

      /* ---------- sheets (the paper) ---------- */
      function liveSheets() { return S.sheets.filter(function (s) { return !s.dead && !s.retiring; }); }
      function wrap(text, w) {
        const out = [];
        String(text).split('\n').forEach(function (p) {
          if (!p) { out.push(''); return; }
          let line = '';
          p.split(' ').forEach(function (word) {
            if (!line) line = word; else if ((line + ' ' + word).length <= w) line += ' ' + word; else { out.push(line); line = word; }
          });
          out.push(line);
        });
        return out;
      }
      function sheetOf(node) {
        const p = node && node.closest ? node.closest('.m-fax-machine-sheet') : null;
        if (!p) return null;
        const id = Number(p.getAttribute('data-sid'));
        return S.sheets.filter(function (s) { return s.id === id; })[0] || null;
      }
      function activeSheet() { const a = S.active; if (a && !a.dead && !a.retiring) return a; const l = liveSheets(); return l.length ? l[l.length - 1] : null; }
      function heldSheet() {
        let s = S.ptrHold;
        if (s && (s.dead || s.retiring)) { S.ptrHold = null; s = null; }
        if (s) return s;
        if (S.keyHold.size) return activeSheet();
        return null;
      }
      function flattenAWhile(s) {
        if (!s || s.dead || s.retiring) return;
        s.demoUntil = api.now() + 4000; S.active = s;
        if (!S.seen.held) { S.seen.held = true; S.dirty = true; S.sheets.forEach(function (x) { x.el.classList.remove('m-fax-machine-nudge'); }); }
        sfx('tick');
      }
      function releaseHolds() { const had = !!heldSheet(); S.ptrHold = null; S.keyHold.clear(); if (had) sfx('tick'); }
      function noteHold() {
        S.holdT0 = api.now();
        if (heldSheet() && !S.seen.held) { S.seen.held = true; S.dirty = true; S.sheets.forEach(function (x) { x.el.classList.remove('m-fax-machine-nudge'); }); }
        if (burst('hold', 12, 4000) && once('hold', 25000)) say(MISC.hold, { mood: 'smug', pr: 1 });
        else if (heldSheet()) { S.holds++; if (S.holds === 1 || S.holds % 8 === 0) say(bag('fflat', F_FLAT), { mood: 'smug' }); }
      }
      function syncButtons(s) {
        s.btnTear.hidden = !(s.state === 'roll' && s.full);
        s.btnFile.hidden = !(s.state === 'torn' || (s.state === 'roll' && s.full));
        s.btnFwd.hidden = !(s.wrong && s.full);
        s.btnFile.textContent = s.state === 'torn' ? 'FILE' : 'FILE (F)';
      }
      function removeSheet(s) {
        if (!s || s.dead) return;
        s.dead = true;
        s.tids.forEach(function (t) { api.clearTimeout(t); });
        if (s.el.parentNode) s.el.parentNode.removeChild(s.el);
        const i = S.sheets.indexOf(s);
        if (i >= 0) S.sheets.splice(i, 1);
        if (S.ptrHold === s) S.ptrHold = null;
        if (S.active === s) S.active = null;
        if (s.lineRes) { s.lineRes = false; S.printLine = Math.max(0, S.printLine - 1); checkPrintIdle(); }
      }
      function checkPrintIdle() {
        if (S.printLine <= 0 && S.line === 'RECEIVING') { S.printLine = 0; goIdle(); }
      }
      function goIdle() {
        setLine('IDLE'); S.phase = ''; S.cur = null;
        cover.classList.remove('m-fax-machine-feeding');
        jamPanel.hidden = true; cover.classList.remove('m-fax-machine-jammed');
        if (S.queuedSend) { S.queuedSend = false; soon(120, function () { if (S.line === 'IDLE') startSend(); else S.queuedSend = true; }); }
        else setLcd(idleMsg(), 1200);
      }
      function idleMsg() { return S.sent === 0 && api.now() - S.bootT < 12000 ? 'PRESS SEND. ANY NUMBER WORKS. NO NUMBER ALSO WORKS.' : 'READY. NO ONE.'; }
      function retireBlank(s) {
        if (s.retiring || s.dead) return;
        s.retiring = true; s.ink = 0;
        s.el.style.setProperty('--ink', '0');
        s.el.classList.add('m-fax-machine-gone');
        api.award(0.1, 'blank'); inc('blank');
        say(bag('fblank', F_BLANK), { mood: 'smug' });
        s.tids.push(soon(1500, function () { removeSheet(s); }));
      }
      function trimCaps() {
        let live = liveSheets();
        while (live.length >= 3) { removeSheet(live[0]); say(E_CAP, { mood: 'neutral' }); live = liveSheets(); }
      }
      function tearSheet(s) {
        if (!s || s.dead || s.retiring || s.state !== 'roll' || !s.full) return false;
        s.state = 'torn';
        tornEl.appendChild(s.el);
        if (flagsEl.children.length < 3) flagsEl.appendChild(el('i'));
        sfx('pop');
        api.award(0.2, 'tear'); inc('torn');
        say(bag('ftear', F_TEAR), { mood: 'proud' });
        setLcd('TORN ALONG THE DOTTED LINE.', 2500);
        syncButtons(s);
        if (s.spec.id === 's1' && !S.seen.firstReply) { S.seen.firstReply = true; soon(1500, function () { say(F_FIRST_REPLY, { mood: 'proud', pr: 1 }); }); }
        return true;
      }
      function fileSheet(s) {
        if (!s || s.dead || s.retiring) return false;
        if (!s.full) { setLcd('STILL PRINTING. PLEASE HOLD THE PAPER, NOT YOUR BREATH.', 2500); return false; }
        if (s.state === 'roll') tearSheet(s);
        const rec = { f: s.from, re: s.spec.reTag || '', t: s.text.replace(/\s+/g, ' ').slice(0, 60), k: Math.max(0, Math.min(100, Math.round(s.ink * 100))), full: s.text.slice(0, 400) };
        S.archive.unshift(rec);
        if (S.archive.length > 20) { S.archive.length = 20; say(F_ROLL, { mood: 'confused' }); }
        S.filed++; inc('filed');
        api.award(1, 'file'); sfx('stamp');
        say(bag('ffile', F_FILE), { mood: 'proud' });
        if (sget('filed') >= 12) api.achieve('fax-machine.archivist');
        removeSheet(s);
        binder.classList.remove('m-fax-machine-pulse');
        renderScore(); renderDrawer(); persist();
        setLcd('FILED. FILED: ' + S.filed + '.', 2500);
        return true;
      }
      function forwardSheet(s) {
        if (!s || s.dead || s.retiring || !s.wrong || !s.full) return false;
        api.award(1.5, 'forward'); inc('forwarded'); sfx('whoosh');
        say(bag('fwd', FWD), { mood: 'smug', pr: 1 });
        api.achieve('fax-machine.wrong_number');
        setLcd('FORWARDED TO NO ONE.', 2500);
        removeSheet(s);
        return true;
      }
      function sheetAct(act) {
        const s = activeSheet();
        if (!s) { setLcd(act === 'F' ? 'NOTHING TO FILE. THE BINDER WAITS.' : act === 'T' ? 'NOTHING TO TEAR. THE ROLL IS EMPTY.' : 'NOTHING TO FORWARD.', 2200); return; }
        if (act === 'T') { if (!tearSheet(s)) setLcd(s.state === 'torn' ? 'ALREADY TORN. IT HAS HAD ENOUGH.' : 'NOT FINISHED PRINTING.', 2200); }
        else if (act === 'F') fileSheet(s);
        else if (act === 'W') {
          const w = s.wrong ? s : liveSheets().filter(function (x) { return x.wrong && x.full; })[0];
          if (w) forwardSheet(w); else setLcd('NOTHING WRONG TO FORWARD. YET.', 2200);
        }
      }

      function printFax(spec, o) {
        o = o || {};
        trimCaps();
        const id = ++S.faxSeq;
        const lines = spec.pre ? String(spec.text).split('\n') : wrap(spec.text || '', 30);
        const rate = (spec.rate || 1) * (o.xt ? 0.8 + api.rand() * 0.5 : 1);
        const s = {
          id: id, spec: spec, state: 'roll', lines: lines, printed: 0, full: false, curl: 1, shown: -1, ink: spec.ink0 || 1, shownInk: -1, wob: 0,
          fade: !spec.noFade && S.received >= 3, fadeSec: spec.fadeSec || FADE, rate: rate, dead: false, retiring: false, tids: [], from: spec.from,
          text: String(spec.text || '').slice(0, 400), ticks: 0, leg: 0, wrong: !!spec.wrong, low: !!spec.low, lineRes: !!o.line, el: null
        };
        const fromEl = spec.fromBtn ? el('button', { class: 'm-fax-machine-from', type: 'button', onclick: function () { spec.fromBtn(); blurSoon(this); } }, 'FROM: ' + spec.from)
          : el('div', { class: 'm-fax-machine-from', text: 'FROM: ' + spec.from });
        s.bodyEl = el('div', { class: 'm-fax-machine-body' });
        const art = spec.art ? spec.art() : null;
        const pr = el('div', { class: 'm-fax-machine-pr' },
          el('div', { class: 'm-fax-machine-fh' },
            el('div', { class: 'm-fax-machine-fl', text: 'FROM-LINE 555-0107' }), fromEl,
            spec.letter ? el('div', { class: 'm-fax-machine-fl', text: spec.letter }) : null,
            spec.date ? el('div', { class: 'm-fax-machine-fl', text: spec.date }) : null,
            el('div', { class: 'm-fax-machine-fl', text: spec.head || 'TO: YOU (PROBABLY)' }),
            el('div', { class: 'm-fax-machine-fl', text: spec.page || pageText() })),
          s.bodyEl, art,
          el('div', { class: 'm-fax-machine-foot' }, el('span', { text: 'FAX #' + id }), el('span', { text: spec.footer || '555-0107' })));
        const paper = s.paper = el('div', { class: 'm-fax-machine-paper' }, pr, el('div', { class: 'm-fax-machine-perf', 'aria-hidden': 'true' }));
        s.btnTear = el('button', { type: 'button', dataset: { act: 'tear' }, hidden: true }, 'TEAR (T)');
        s.btnFile = el('button', { type: 'button', dataset: { act: 'file' }, hidden: true }, 'FILE (F)');
        s.btnFwd = el('button', { type: 'button', dataset: { act: 'fwd' }, hidden: true }, 'FORWARD TO NO ONE (W)');
        const cls = 'm-fax-machine-sheet' + (spec.cls ? ' ' + spec.cls : '') + (o.xt ? ' m-fax-machine-xt' : '') + (spec.small ? ' m-fax-machine-small' : '') + (S.postage ? ' m-fax-machine-postage' : '') + (S.seen.held ? '' : ' m-fax-machine-nudge');
        if (S.postage) { S.postage = false; }
        s.el = el('div', { class: cls, tabindex: 0, role: 'group', 'aria-label': 'Incoming fax from ' + spec.from + '. Hold Space or G to flatten, or press Enter to hold it flat for four seconds.', dataset: { sid: id } },
          paper, el('div', { class: 'm-fax-machine-hold', text: 'Hold the paper flat to read it (press and hold, or Space / G; double-click or Enter holds it for 4 s).' }), el('div', { class: 'm-fax-machine-acts' }, s.btnTear, s.btnFile, s.btnFwd));
        s.el.style.setProperty('--curl', '1'); s.el.style.setProperty('--ink', String(s.ink));
        S.sheets.push(s);
        if (!spec.echo && s.text.length > 8) S.lastText = s.text;
        rollEl.appendChild(s.el); measure(s);
        if (S.compact && S.scrolled < 3) { S.scrolled++; try { s.el.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); } catch (e) { /* ignore */ } }
        S.active = s;
        if (s.fade && S.received === 3 && !S.seen.fade1) { S.seen.fade1 = true; say(F_FADE1, { mood: 'smug', pr: 1 }); }
        if (lines.length) { s.tids.push(api.setTimeout(function () { printStep(s); }, Math.max(1, 280 * KT))); }
        else finishPrint(s);
        return s;
      }
      function measure(s) { try { s.el.style.setProperty('--h', s.paper.offsetHeight + 'px'); } catch (e) { /* ignore */ } }
      function printStep(s) {
        if (s.dead || S.dead) return;
        s.printed++;
        s.bodyEl.textContent = s.lines.slice(0, s.printed).join('\n');
        measure(s);
        if (s.ticks < 8) { s.ticks++; sfx('tick'); }
        if (s.printed >= s.lines.length) { finishPrint(s); return; }
        s.tids.push(api.setTimeout(function () { printStep(s); }, Math.max(1, 280 * KT)));
      }
      function finishPrint(s) {
        if (s.dead) return;
        s.full = true; syncButtons(s);
        if (s.lineRes) { s.lineRes = false; S.printLine = Math.max(0, S.printLine - 1); checkPrintIdle(); }
        srEl.textContent = 'Fax from ' + s.from + '. ' + s.text.replace(/\s+/g, ' ');
        if (s.spec.flatMs) {
          const go = function () { if (!s.dead && !S.dead && !(s.spec.flatIfNew && S.seen.held)) s.demoUntil = api.now() + s.spec.flatMs; };
          if (s.spec.flatDelay) s.tids.push(soon(s.spec.flatDelay * KT, go)); else go();
        } else if (!S.seen.held) {
          s.tids.push(soon(6000 * KT, function () { if (!S.seen.held && !s.dead && once('holdhint', 60000)) say(`Hold the paper flat to read it. Press and hold the paper itself, or hold Space.`, { mood: 'neutral', pr: 1 }); }));
        }
        if (s.spec.onPrinted) { try { s.spec.onPrinted(s); } catch (e) { /* safe */ } }
        if (s.spec.react) say(s.spec.react, { mood: s.spec.mood || 'smug', pr: 1, who: s.spec.who });
      }

      /* the single rAF loop: curl, fade, scope, handshake clock */
      function frame(ts) {
        if (S.dead) return;
        let dt = S.lastTs && isFinite(ts) ? (ts - S.lastTs) / 1000 : 0.016;
        if (isFinite(ts)) S.lastTs = ts;
        if (!(dt > 0)) dt = 0.016;
        dt = Math.min(0.1, dt);
        const red = reduced();
        let held = heldSheet();
        if (held && api.now() - S.holdT0 > 15000) { releaseHolds(); held = null; }
        S.sheets.slice().forEach(function (s) {
          if (s.dead) return;
          const isHeld = s === held, flatNow = isHeld || s.demoUntil > api.now();
          const target = flatNow ? 0 : 1;
          if (red) s.curl = target;
          else {
            s.curl += (target - s.curl) * Math.min(1, dt * (flatNow ? 9 : 5));
            if (Math.abs(target - s.curl) < 0.002) s.curl = target;
            if (s.wasHeld && !flatNow) s.wob = 0.5;
            if (s.wob > 0) s.wob = Math.max(0, s.wob - dt);
          }
          s.wasHeld = flatNow;
          const disp = Math.max(0, Math.min(1, s.curl + (s.wob > 0 ? Math.sin(s.wob * 30) * 0.06 * s.wob : 0)));
          if (Math.abs(disp - s.shown) > 0.004) { s.shown = disp; s.el.style.setProperty('--curl', disp.toFixed(3)); }
          if (s.curl < 0.25) {
            s.leg += dt;
            if (isHeld) {
              S.flatAcc += dt;
              if (S.flatAcc >= 1) { const w = Math.floor(S.flatAcc); S.flatAcc -= w; inc('flatSeconds', w); if (sget('flatSeconds') >= 60) api.achieve('fax-machine.flat'); }
              if (s.spec.cls === 'm-fax-machine-toast') s.el.classList.add('m-fax-machine-flatnow');
            }
            if (s.low && s.leg >= 2 && !S.seen.low) { S.seen.low = true; api.achieve('fax-machine.unfinished'); }
          }
          if (s.full && s.fade && !s.retiring) {
            s.ink -= dt / s.fadeSec * s.rate;
            if (s.ink <= 0) retireBlank(s);
            else if (Math.abs(s.ink - s.shownInk) > 0.004) { s.shownInk = s.ink; s.el.style.setProperty('--ink', s.ink.toFixed(3)); }
          }
          s.el.classList.toggle('m-fax-machine-active', s === S.active && S.sheets.length > 1);
        });
        if (held && held.curl < 0.25) {
          S.runFlat += dt;
          if (S.runFlat >= 7.5 && !S.seen.longFlat) { S.seen.longFlat = true; S.dirty = true; api.achieve('fax-machine.long_flat'); api.award(7.5, 'seven and a half'); say(LONG_FLAT, { mood: 'proud', pr: 2 }); }
        } else S.runFlat = 0;
        if (S.phase === 'SHAKE' && S.hs) shakeStep(dt);
        else if (S.phase === 'SCAN') scanStep(dt);
        else if (S.phase === 'ESHAKE') endShakeStep(dt);
        drawScope(dt, red);
        S.raf = api.requestAnimationFrame(frame);
      }

      /* ---------- composing what arrives ---------- */
      function senderId() { return S.lap >= 2 ? 'SOMEBODY (provisional)' : SENDER[Math.max(2, Math.min(9, S.beat))]; } function letterhead() { return S.lap >= 2 ? '' : (LETTERHEAD[S.beat] || ''); }
      function baseSpec(text, o) {
        return Object.assign({ from: senderId(), letter: letterhead(), text: fill(text, { re: reText() }), page: pageText(), reTag: S.lastRe ? S.lastRe.text : '' }, o || {});
      }
      function svgEl(tag, a) { return el(tag, a); } function artMachine() { return el('svg', { class: 'm-fax-machine-art', viewBox: '0 0 120 80', width: 120, height: 80, 'aria-hidden': 'true' }, svgEl('rect', { x: 10, y: 34, width: 100, height: 36, rx: 4 }), svgEl('rect', { x: 30, y: 10, width: 60, height: 24 }), svgEl('rect', { x: 40, y: 50, width: 40, height: 6 }), svgEl('path', { d: 'M44 70 L44 76 M76 70 L76 76' })); } function artChair() { return el('svg', { class: 'm-fax-machine-art', viewBox: '0 0 100 90', width: 100, height: 90, 'aria-hidden': 'true' }, svgEl('rect', { x: 28, y: 8, width: 44, height: 40, rx: 6 }), svgEl('path', { d: 'M22 52 L78 52 M30 52 L26 84 M70 52 L74 84 M50 52 L50 80' })); } function artRoom() { return el('div', { class: 'm-fax-machine-room', 'aria-hidden': 'true' }, el('i')); }
      function scriptSpec(item) {
        const id = item.id;
        const plain = function (text, o) { return baseSpec(text, Object.assign({ id: id }, o)); };
        if (id === 's1') return plain('GOT YOUR FAX. THANK YOU.\n\nWE HAVE NEVER SAID THAT BEFORE. IT WENT BETTER THAN WE EXPECTED.\n\n(signature illegible, or absent)', { flatMs: 3500 });
        if (id === 's2') return plain(`RE: {re}. Your RE line was '{re}'. We found it clear. We found it extremely clear.`); // lint-ignore
        if (id === 'q3') return plain(`I have drawn you a fax machine. It is not good. It has your whole heart in it, though, in dotted lines.`, { art: artMachine });
        if (id === 'q4') return plain(`Fax of an empty chair, sent from the other end. The chair is yours. Do not read into it. Read into it.`, { art: artChair });
        if (id === 'q5') return plain(`It is nice to have a number to send to.`, { noFade: true, cls: 'm-fax-machine-warm' });
        if (id === 'r1') {
          const to = S.firstTo === null ? 'NOBODY (MAIN)' : (S.firstTo || 'NOBODY (MAIN)');
          const re = String(S.firstRe || 'Re: (blank)').replace(/^Re:\s*/, '');
          const mins = Math.max(1, Math.round(S.playSec / 60));
          return plain('TO: ' + to + '   RE: ' + re + '   STAMPS: ' + S.firstStamps + '\n\nIN TRANSIT: ' + mins + ' MINUTES. IT WAS A LONG HALLWAY.', {
            from: 'NOBODY (YOU)', noFade: true, fromBtn: function () { hallway(); }, onPrinted: function () { S.hallwayAt = api.now(); } });
        }
        if (id === 'r2') return plain(`May I have your number? Not the one you dial. The one you are.`, { from: 'NOBODY (YOU)', noFade: true, onPrinted: function () { prefillAsk(); } });
        if (id === 'floor') return plain('7 1/2 FLOOR PLAN\n[ CORRIDOR .................. ]\n[ FICUS (THRIVING) ]\n[ DOOR MARKED: LATER ]', { pre: true, from: '7 1/2 FLOOR', react: `The floor plan is a corridor, a ficus, and a door marked LATER. The ficus is Dennis's cousin. They do not speak. They photosynthesise in parallel.` });
        if (id === 'original') return plain(ORIGINAL, { from: 'THE ORIGINAL (MISSING)', letter: '', noFade: true, cls: 'm-fax-machine-warm', react: `A fax has arrived from the original. It is very small, and it is blushing. Management has put it somewhere safe, which is the same place as the other copies.` });
        if (id === 'op') return plain(`Please hold. Your call is important to Nobody, who is on break.`, { from: 'THE OPERATOR', noFade: true });
        if (id === '911') return plain(`Your emergency has been received, stamped, and placed under Tuesday.`, { from: 'EMERGENCY (FILED)' });
        if (id === '276') return plain('FORM 27B/6 (REQUEST FOR FORM 27B/7)', { from: 'FORMS (ARCHIVE)', noFade: true });
        if (id === 'dennis') {
          const known = !!(api.flag.get('metDennis') || api.flag.get('plantClicked')); // lint-ignore shared cast flags
          return plain(bag('dennis', DENNIS_BAG), { from: 'DENNIS (PLANT)', noFade: true, cls: 'm-fax-machine-warm', art: function () { return el('div', { class: 'm-fax-machine-leaf', 'aria-hidden': 'true' }); }, react: api.line('plantStatus'),
            onPrinted: function () { if (known) soon(3500, function () { say(`Dennis (Plant) knows you from the lobby. He knows everyone who stands near him. He does not turn to look. He is a plant, and leans.`, { mood: 'smug', pr: 1 }); }); } });
        }
        if (id === 'stamps') {
          const rows = []; for (let i = 0; i < 6; i++) rows.push('RECEIVED.'); rows.push('RECEI');
          return plain(rows.join('\n'), { pre: true, from: 'EVERYBODY', cls: 'm-fax-machine-small' });
        }
        return plain('Hello.');
      }
      function cameoSpec(k) {
        const mk = function (from, text, o) { return baseSpec(text, Object.assign({ from: from, letter: '', noFade: false }, o)); };
        if (k === 'toaster') return mk('THE TOASTER', 'Warm. Still warm. Yes.', { cls: 'm-fax-machine-toast', fadeSec: FADE + 10, art: function () { return el('div', { class: 'm-fax-machine-stripe', 'aria-hidden': 'true' }); }, react: `A fax has arrived from the Toaster. It is slightly browned. Please do not eat the fax.` });
        if (k === 'gerald') {
          const met = !!api.flag.get('metGerald');
          return met ? mk('THE VEGETABLE DRAWER', `A fax is a letter that has been told to hurry. I was told to hurry once. I became a fry.\n\nX`, { date: 'DATED: WHENEVER THE SOIL IS READY', pre: true, art: function () { return el('div', { class: 'm-fax-machine-pot', 'aria-hidden': 'true' }); } })
            : mk('V.P. OF SPUDS', `Per my eyes, I have seen everything. Per my skin, I have sent nothing. Sign here: O.`, { art: function () { return el('div', { class: 'm-fax-machine-pot', 'aria-hidden': 'true' }); }, react: `A potato of some kind has sent something. It has been told to go through the lobby.` });
        }
        if (k === 'rock') return mk('(A ROCK)', `(a grey thumbprint. The range of emotion is wide. No further questions.)`, { art: function () { return el('div', { class: 'm-fax-machine-thumb', 'aria-hidden': 'true' }); }, react: `A fax has arrived from a rock. We have chosen to read it as optimistic.` });
        if (k === 'stapler') return mk('LOCAL 1 (STAPLERS)', 'DEMANDS:\n1. A SMALLER BREAK ROOM, BUT OURS.\n2. AN END TO "JUST A QUICK STAPLE".\n3. CHAIRS. WE HAVE NO LEGS AND HAVE ASKED POLITELY.\n\n[ONE STAPLE, THROUGH THE TOP, AS A SIGNATURE]', { react: `The Stapler's union has sent a fax. It contains three demands and one staple, through the top, as a signature.` });
        return mk('COMPLIANCE', 'Please see attached.', { cls: 'm-fax-machine-sandrafont', footer: 'ATTACHMENTS: 0 (PENDING REVIEW)', react: `Sandra has sent a fax. It says 'Please see attached.' Nothing is attached. We are seeing it very carefully.` });
      }
      function cameoEligible(k) {
        if (S.cameo[k]) return false;
        try {
          if (k === 'toaster') return api.stat.get('toaster-debate.arguments') > 0 || api.stat.get('toaster-debate.slices') > 0;
          if (k === 'rock') return api.stat.get('pet-rock.actions') > 0;
          if (k === 'stapler') return !!api.flag.get('metStapler'); // lint-ignore shared cast flag
        } catch (e) { return false; }
        return true;
      }
      function composeFax() {
        /* 1. scripted */
        if (S.script.length) {
          const item = S.script.shift();
          S.lastScript = item;
          if (item.persist) S.done.add(item.id);
          const sp = scriptSpec(item);
          sp.script = item;
          if (item.id === 's1') sp.onPrinted = function () {
            soon(5500 * KT, function () {
              printFax(baseSpec('P.S. WHO IS THIS.', { small: true, noFade: true, letter: '' }), {});
              soon(2200 * KT, function () { say(`That is also what we wanted to ask.`, { mood: 'confused', pr: 1 }); });
            });
            if (!S.seen.firstPaid) { S.seen.firstPaid = true; api.award(5, 'first reply'); soon(6000, function () { if (!S.seen.firstReply) { S.seen.firstReply = true; say(F_FIRST_REPLY, { mood: 'proud', pr: 1 }); } }); } };
          return sp;
        }
        S.lastScript = null;
        const plainOnly = S.plainNext; S.plainNext = false;
        /* 2. cameo */
        if (S.beat >= 7 && S.lap === 1 && !S.hush && !plainOnly && S.playSec >= S.cameoAt) {
          const order = api.shuffle(['toaster', 'gerald', 'rock', 'stapler', 'sandra']).filter(cameoEligible);
          if (order.length) { const k = order[0]; S.cameo[k] = true; S.cameoAt = S.playSec + 40 * KP; S.dirty = true; return cameoSpec(k); }
        }
        /* 3. rare events */
        if (S.beat >= 4 && !S.hush && !plainOnly) {
          const u = api.rand(), pw = S.lastWrong ? 0 : (S.beat >= 7 ? 1 / 8 : 1 / 12);
          S.lastWrong = false;
          if (u < pw) {
            S.lastWrong = true;
            return baseSpec(bag('wrong', WRONG), { from: '----', letter: '', footer: 'NOT FOR YOU. PROBABLY.', wrong: true, react: `WRONG NUMBER. This fax is clearly meant for someone else. Management has located no Suite 7 1/2. Management has located the pillows.`, mood: 'confused' });
          }
          if (u < pw + 1 / 30) return baseSpec(LOW.join('\n'), { pre: true, from: senderId(), head: 'PAPER LOW.', low: true, react: `PAPER LOW. The paper is fine. It is the words that are running out.` });
          if (u < pw + 1 / 30 + 1 / 60) return baseSpec('', { from: 'THE MACHINE', letter: '', noFade: true, art: function () { return el('div', { class: 'm-fax-machine-happy', 'aria-hidden': 'true' }, el('i'), el('i'), el('b'), el('u')); }, onPrinted: function () { soon(4000, function () { setLcd('RECEIVED. WE DO NOT KNOW WHY EITHER.', 4000); }); } });
          if (u < pw + 1 / 30 + 1 / 60 + 1 / 45 && !S.seen.sock) {
            S.seen.sock = true;
            const known = !!api.flag.get('sockSeen'); // lint-ignore shared cast flag
            return baseSpec(known ? `A sock-shaped smudge. It is the same sock. It has been seen elsewhere, in other departments. It is, per the smudge, 'keeping busy'.` : `A fax of a sock-shaped smudge, slightly south-west of where it should be. Presumed on a journey.`, { from: 'UNKNOWN (SOCK)', react: known ? `No. We are not following it. We have heard it is doing well, from several departments, none of which we asked.` : `No. We are not following it.`, mood: 'confused' });
          }
          const cut = pw + 1 / 30 + 1 / 60 + 1 / 45;
          if (u >= cut && u < cut + 1 / 70) return baseSpec(`This fax was sent from later the same afternoon. Nothing in it has happened yet. Please act on none of it, and in particular not on the sandwich.`, { from: 'LATER (SAME AFTERNOON)', cls: 'm-fax-machine-mirror', react: `A fax has arrived backwards. Management could only read it by standing on the other side of the machine, which is the wall.`, mood: 'confused' });
          if (u >= cut + 1 / 70 && u < cut + 2 / 70) return baseSpec(`Someone was here. The cup is still warm. The cup has been spoken to and has said nothing, which is the policy.`, { from: 'BREAK ROOM (UNSTAFFED)', letter: '', art: function () { return el('div', { class: 'm-fax-machine-cup', 'aria-hidden': 'true' }); }, react: `A coffee ring has been faxed. Management has traced it to a cup. The cup has been traced to Thursday.` });
          if (S.lastText && u >= cut + 2 / 70 && u < cut + 2 / 70 + 1 / 55) return baseSpec(S.lastText + ECHO_TAIL, { from: 'THE SAME FAX (AGAIN)', letter: '', echo: true, react: `The fax has arrived a second time. The second time is more confident. It has started to believe it is the original.`, mood: 'confused' });
        }
        /* 3b. a reply from whoever was copied (season 2) */
        if (S.lastCc && !plainOnly && !S.hush && CC_REPLY[S.lastCc]) {
          const k = S.lastCc, cd = CCS.filter(function (x) { return x.key === k; })[0]; S.lastCc = null;
          if (cd && api.chance(0.45)) return baseSpec(bag('ccr:' + k, CC_REPLY[k]), k === 'dennis' ? { from: cd.from, letter: '', cls: 'm-fax-machine-warm', art: function () { return el('div', { class: 'm-fax-machine-leaf', 'aria-hidden': 'true' }); } } : { from: cd.from, letter: '' });
        }
        /* 4. replies */
        if (S.lap >= 2) {
          if (api.chance(0.12)) return baseSpec(`Confirmed. Continue.`);
          let t = bag('lap', LAP_BAG);
          if (S.lap >= 3) { const m3 = /^[\s\S]*?[.!?](?=\s|$)/.exec(t); if (m3) t = m3[0]; }
          return baseSpec(t);
        }
        if (!plainOnly && S.beat >= 3 && S.lastStamps >= 1 && S.confChain < 4 && api.chance(0.3)) {
          const step = S.confChain++; S.dirty = true;
          return baseSpec(step === 2 ? '' : CONF[step], step === 2 ? { art: function () { return el('div', { class: 'm-fax-machine-mark m-fax-machine-navy', style: { position: 'relative', display: 'inline-block', '--tilt': '-5deg', fontSize: '1.3rem', margin: '10px 8px' } }, '[CONFIRMED]'); } } : {});
        }
        const key = S.lastRe ? S.lastRe.key : null;
        if (!plainOnly && key && RE_REPLIES[key] && S.beat >= 3 && (S.beat === 3 || S.beat === 6 || api.chance(0.55))) return baseSpec(bag('re:' + key, RE_REPLIES[key]));
        const b = S.beat;
        const arr = plainOnly || b <= 3 ? TIER_A : b <= 5 ? TIER_B : b <= 7 ? TIER_C : TIER_D;
        return baseSpec(bag('tier' + (arr === TIER_A ? 'a' : arr === TIER_B ? 'b' : arr === TIER_C ? 'c' : 'd'), arr));
      }

      /* ---------- the ring ---------- */
      function ringGap() { const r = S.lap >= 2 ? 20 + api.rand() * 20 : S.beat >= 6 ? 10 + api.rand() * 12 : 14 + api.rand() * 16; return Math.round(r * KP); } function scheduleRing(sec) { S.nextRingAt = S.playSec + Math.max(1, Math.round(sec)); }
      function doRing(o) {
        o = o || {};
        if (S.line !== 'IDLE' || S.hush || S.dead) return false;
        if (liveSheets().length >= 3) { removeSheet(liveSheets()[0]); say(E_CAP, { mood: 'neutral' }); scheduleRing(3 * KP); return false; }
        setLine('RECEIVING');
        const ep = ++S.epoch;
        S.ringN++; S.holdingShown = false;
        const specs = o.spec ? [o.spec] : [composeFax()];
        const first = specs[0];
        if (!o.spec && !S.script.length && S.beat >= 6 && S.lap === 1 && !first.script && liveSheets().length <= 1 && api.chance(0.35)) specs.push(composeFax());
        if (first.script && first.script.gap && S.script.length) scheduleRing(first.script.gap * KP); else scheduleRing(ringGap());
        if (S.beat < 2 && !S.script.length) S.nextRingAt = null;
        S.printLine += specs.length;
        const slow = S.beat >= 8 && S.lap === 1, quiet = !!o.quiet;
        const firstEver = !quiet && S.received === 0 && !o.spec && !!S.lastScript && S.lastScript.id === 's1';
        setLcd(quiet ? 'RING (VERY QUIET)' : firstEver ? 'RING. THIS HAS NEVER HAPPENED.' : S.compact && S.ringN <= 2 ? 'INCOMING. LOOK DOWN.' : bag('flcd', F_LCD), 6000);
        if (firstEver) { S.allLeds = true; renderLeds(); soon(2600 * KT, function () { S.allLeds = false; renderLeds(); }); api.confetti(undefined, undefined, 14); }
        if (!quiet) { app.classList.add('m-fax-machine-ring'); soon(1200 * KT, function () { app.classList.remove('m-fax-machine-ring'); }); }
        sfx('bell');
        if (!quiet && !slow) { later(450 * KT, function () { sfx('bell'); }, ep); later(900 * KT, function () { sfx('bell'); }, ep); }
        const wait = quiet ? 900 : slow ? 2200 : 1300;
        specs.forEach(function (sp, i) {
          later(wait * KT + i * 450 * KT, function () {
            S.received++; inc('received');
            printFax(sp, { line: true, xt: specs.length > 1 });
            renderScore(); S.dirty = true;
            if (sp.script && sp.script.persist) persist(true);
          }, ep);
        });
        later((wait + 450 * specs.length) * KT + 14000, function () { if (S.line === 'RECEIVING' && S.printLine > 0 && !S.sheets.some(function (s) { return !s.full && !s.dead; })) { S.printLine = 0; checkPrintIdle(); } }, ep);
        return true;
      }
      /* a fax that prints without a ring sequence: the test page, the self-fax copies, idle faxes (line state untouched or managed by caller) */
      function quickPrint(spec, lineRes) {
        if (lineRes && S.line === 'IDLE') { setLine('RECEIVING'); S.printLine++; return printFax(spec, { line: true }); }
        return printFax(spec, {});
      }

      /* ---------- SEND pipeline ---------- */
      function sendPress() {
        if (S.dead) return;
        const now = api.now();
        if (S.line === 'BUSY') {
          setLcd('LINE BUSY', 2500);
          if (!S.coolSaid) { S.coolSaid = true; say(E_COOL, { mood: 'smug' }); } else say(bag('ebusy', E_BUSY), { mood: 'confused' });
          sfx('buzz'); return;
        }
        if (S.line === 'ENDING') { setLcd('LINE BUSY', 2500); say(bag('ebusy', E_BUSY), { mood: 'confused' }); return; }
        S.sendTimes.push(now); trimTimes(S.sendTimes, now);
        if (S.sendTimes.length === 5 && once('warn', 15000)) say(bag('ewarn', E_WARN), { mood: 'panic', pr: 1 });
        if (S.sendTimes.length >= 8 && spamBusy('send')) return;
        sendBtn.classList.remove('m-fax-machine-pulse');
        if (S.line === 'SENDING' && S.phase === 'SCAN' && S.cur && S.sent >= 5 && S.scanT < S.scanDur - 0.05) {
          const saved = ((S.scanDur - S.scanT) / KT).toFixed(1);
          S.scanT = S.scanDur; scanStep(0); sfx('blip');
          setLcd('SCAN SKIPPED (' + saved + ' SECONDS SAVED, AND FILED)', 3000);
          if (once('skip', 40000)) say(`Scan skipped. ${saved} seconds have been saved. Management has put them somewhere safe and cannot find them.`, { mood: 'smug' });
          return;
        }
        if (S.line === 'SENDING' || S.line === 'JAMMED' || S.line === 'RECEIVING') {
          if (S.queuedSend) { say(bag('ebusy', E_BUSY), { mood: 'confused' }); setLcd('BUSY: HOLDING YOUR FAX', 2500); return; }
          S.queuedSend = true; setLcd('BUSY: HOLDING YOUR FAX', 3000); sfx('blip'); return;
        }
        startSend();
      }
      function startSend() {
        if (S.dead || S.line !== 'IDLE') return;
        const ep = ++S.epoch;
        setLine('SENDING'); S.phase = 'FEED';
        yyRow.hidden = true;
        const dial = S.dial, digits = dial.replace(/½/g, '');
        const num = dial || 'NOBODY (MAIN)';
        const re = curDrum();
        const stampKeys = S.stamps.map(function (m) { return m.key; });
        const isEnding = dial === SELF_NUM && S.beat >= 9 && S.lap === 1 && !S.endingDone && S.done.has('r2');
        const c = S.cur = { dial: dial, digits: digits, num: num, special: SPECIAL.has(dial) ? dial : '', isEnding: isEnding, isSelf: dial === SELF_NUM && !isEnding, re: { text: re.text, key: re.key }, stamps: stampKeys, pages: S.pages, hits: 0, first: S.sent === 0, redial: S.lastDial === dial, cc: (isEnding || dial === SELF_NUM) ? CCS[0] : curCc() };
        if (S.firstTo === null) { S.firstTo = dial; S.firstRe = re.text; S.firstStamps = stampKeys.length; }
        S.lastDial = dial; S.lastRe = { text: re.text, key: re.key }; S.lastStamps = stampKeys.length; S.lastCc = c.cc.key;
        setLcd(S.sandra > 0 ? 'COMPLIANCE REVIEW (SANDRA)...' : 'DIALING ' + num + '...', 3000);
        if (S.sandra > 0) {
          lamp.className = 'm-fax-machine-lamp m-fax-machine-red'; lampTxt.textContent = 'REVIEW (SANDRA)...';
          soon((TEST ? 300 : 1000), function () {
            lamp.className = 'm-fax-machine-lamp m-fax-machine-green'; lampTxt.textContent = 'APPROVED (SANDRA)';
            if (S.sent % 5 === 0) say(I6, { mood: 'smug' });
          });
        }
        if (!dial) say(S.lap >= 2 ? `You dialed nothing. Somebody picked up, provisionally.` : `You dialed nothing. It connected.`, { mood: 'smug' });
        else if (dial === '0') say(`You have reached the Operator. The operator is Nobody. Nobody is on break. Nobody is always on break. It is the whole job.`, { mood: 'confused' });
        else if (dial === '911') say(`Your emergency has been noted, faxed and filed under Tuesday.`, { mood: 'panic' });
        else if (dial === '276') say(`Form 27B/6 has been printed. It is a Request for Form 27B/7, which was destroyed in 1998.`, { mood: 'smug' });
        else if (dial === '7½0') { setLcd('CONNECTING TO THE SEVENTH-AND-A-HALF FLOOR...', 4000); say(`Connecting to the Seventh-and-a-Half Floor. It has been waiting. It has no phone. It has you.`, { mood: 'confused', pr: 1 }); }
        else if (c.isSelf) say(S.lap >= 2 ? `Dialing your own number. Connected. Faxing: you. Received: you. Both parties are surprisingly pleased.` : `You have dialed your own number. The machine answered before it rang, to save everyone the awkwardness.`, { mood: 'proud', pr: 1 });
        else if (dial === DENNIS_NUM) { setLcd('CONNECTING TO DENNIS (PLANT)...', 4000); say(`Dialing 3-3-6-6-4-7. The digits spell a name. It is a name with roots.`, { mood: 'confused', pr: 1 }); }
        else if (c.redial) say(bag('bredial', B_REDIAL), { mood: 'smug' });
        else if (digits.length < 7 && !c.isEnding) say(bag('bshort', B_SHORT), { mood: 'confused' });
        else if (!c.isEnding) say(bag('bdial', B_DIAL), { v: { num: num }, mood: 'neutral' });
        if (stampKeys.length === 5) {
          api.achieve('fax-machine.stamps');
          say(`The page is now only stamps. It has gone through the other side of paperwork.`, { mood: 'confused', pr: 1 });
          if (!S.script.some(function (x) { return x.id === 'stamps'; })) S.script.unshift({ id: 'stamps', persist: false });
          scheduleRing(3 * KP);
          S.noReportUntil = api.now() + 20000 * KT;
        }
        cover.classList.add('m-fax-machine-feeding'); sfx('whoosh');
        scopeWrap.classList.remove('m-fax-machine-dormant');
        later(450 * KT, beginShake, ep);
      }
      function beginShake() {
        const c = S.cur; if (!c) { goIdle(); return; }
        S.seqT0 = api.now();
        if (c.isEnding) { setLine('ENDING'); S.phase = 'ESHAKE'; S.endT = 0; S.endDur = 3.2 * KT; setLcd('CONNECTING... (PHASES: 3 RADIANS APART)', 5000); return; }
        S.phase = 'SHAKE';
        const k = KT * (S.sent >= 6 ? 0.75 : 1);   // veterans get a shorter handshake
        S.hs = { t: 0, dur: 3.2 * k, pulses: [0.8 * k, 1.4 * k, 2.0 * k, 2.6 * k], hit: [false, false, false, false], res: [false, false, false, false], taps: 0, hits: 0, win: reduced() ? 0.35 : 0.22, flash: [0, 0, 0, 0], burst: 0, buzzed: false, lcdI: 0, k: k, saved: 0 };
        setLcd(c.first ? 'WHEN A CIRCLE TOUCHES THE LINE, PRESS TAP. OR DON\'T. THE MACHINES WILL COPE.' : bag('cono', C_ONO), 4000);
        if (c.first) say(`Handshake: two machines agree on something. Press TAP when a circle touches the white line, to model agreement.`, { mood: 'proud', pr: 1 });
        else say(bag('cextra', C_EXTRA), { mood: 'smug' });
      }
      function tap() {
        if (S.dead) return;
        const hs = S.hs;
        if (S.phase === 'SHAKE' && hs) {
          hs.taps++;
          let best = -1, bd = 9;
          hs.pulses.forEach(function (p, i) { if (hs.res[i]) return; const d = Math.abs(hs.t - p); if (d < bd) { bd = d; best = i; } });
          if (best >= 0 && bd <= hs.win) { hs.hit[best] = hs.res[best] = true; hs.hits++; hs.flash[best] = 0.3; sfx(hs.hits === 4 ? 'blip' : 'bloop');
            if (hs.hits === 4) { const end = hs.t + 0.25 * hs.k; if (end < hs.dur) { hs.saved = (hs.dur - end) / KT; hs.dur = end; } } }
          else { hs.burst = 0.3; if (!hs.buzzed) { hs.buzzed = true; sfx('buzz'); } }
        } else if (S.phase === 'ESHAKE') { sfx('blip'); }
        else { sfx('tick'); setLcd('NOTHING TO TAP. THE PULSES ARE ELSEWHERE.', 1800); if (burst('tap', 15, 4000) && once('tap', 20000)) say(MISC.tap, { mood: 'smug', pr: 1 }); }
      }
      function shakeStep(dt) {
        const hs = S.hs;
        hs.t += dt;
        hs.pulses.forEach(function (p, i) { if (!hs.res[i] && hs.t > p + hs.win) hs.res[i] = true; });
        for (let i = 0; i < 4; i++) if (hs.flash[i] > 0) hs.flash[i] = Math.max(0, hs.flash[i] - dt);
        if (hs.burst > 0) hs.burst = Math.max(0, hs.burst - dt);
        if (hs.lcdI === 0 && hs.t > hs.dur * 0.5) { hs.lcdI = 1; if (!(S.cur && S.cur.first)) setLcd(bag('cono', C_ONO), 3000); }
        if (hs.t >= hs.dur) endShake();
      }
      function endShake() {
        const hs = S.hs, c = S.cur;
        if (!hs || !c) { S.phase = ''; goIdle(); return; }
        S.hs = null;
        c.hits = hs.hits;
        inc('handshakes');
        setLcd('HANDSHAKE: 100% (OF WHAT WAS ATTEMPTED)', 3500);
        if (hs.hits === 4) {
          inc('perfect'); api.award(0.3, 'clean line');
          say(`Perfect handshake. Both machines are proud. One of them is you.`, { mood: 'proud', pr: 1 });
          const early = hs.saved >= 0.1 && S.earlyN++ === 0;
          soon(1500, function () { say(early ? `The machines finished each other's sentences. This saves ${hs.saved.toFixed(1)} seconds, which Management has filed.` : `Clean line. The scan will be crisp. This changes nothing, and Management says so.`, { mood: 'smug' }); });
          if (sget('perfect') >= 5) api.achieve('fax-machine.handshake');
        } else if (hs.taps === 0) say(`You did not shake. The machines shook for you. They were very polite about it.`, { mood: 'smug' });
        else say(bag('csloppy', C_SLOPPY), { mood: 'smug' });
        S.scanBars = [];
        for (let k = 0; k < 4 - hs.hits; k++) { const y0 = 12 + api.rand() * 50; for (let j = 0; j < 3; j++) S.scanBars.push({ y: y0 + j * 4, a: 0.25 + api.rand() * 0.3 }); }
        beginScan();
      }
      function beginScan() {
        S.phase = 'SCAN'; S.scanT = 0; S.scanPage = 0; S.seqT0 = api.now();
        S.scanDur = (1.2 + 0.6 * (S.cur.pages - 1)) * KT;
        S.scanLcd = 0;
        if (S.beat >= 5 && S.sent >= 3 && !S.lastJam && api.chance(1 / 6)) { startJam(); return; }
        S.lastJam = false;
        scanStep(0);
      }
      function scanStep(dt) {
        const c = S.cur; if (!c) { goIdle(); return; }
        S.scanT += dt;
        const page = Math.min(c.pages, Math.floor(S.scanT / S.scanDur * c.pages) + 1);
        if (page !== S.scanLcd) { S.scanLcd = page; setLcd('SENDING PAGE ' + page + ' OF ' + c.pages + (page === 1 ? (S.sent >= 5 ? ' (SEND = SKIP)' : ' (OF 0 ATTACHED)') : ''), 3000); }
        if (S.scanT >= S.scanDur) { S.phase = 'REPORT'; later(600 * KT, finishSend, S.epoch); }
      }
      /* ---- the jam ---- */
      const jamStatus = el('div', { class: 'm-fax-machine-jamst', role: 'status', text: '' }); const accEl = el('div', { class: 'm-fax-machine-acc', 'aria-hidden': 'true' }, el('div'), el('div'), el('div'), el('div'), el('div')); const lidBtn = el('button', { type: 'button', onclick: function () { jamAct(); blurSoon(this); } }, 'OPEN LID (J)'); const smoothBtn = el('button', { class: 'm-fax-machine-crumple', type: 'button', onclick: function () { smoothPaper(); blurSoon(this); } }, 'SMOOTH THE PAPER');
      jamPanel.appendChild(el('b', { text: 'PAPER JAM' })); jamPanel.appendChild(accEl); jamPanel.appendChild(lidBtn); jamPanel.appendChild(smoothBtn); jamPanel.appendChild(jamStatus);
      api.on(smoothBtn, 'pointermove', function (e) {
        const j = S.jam; if (!j || !(e.buttons & 1)) { if (j) j.lx = null; return; }
        if (j.lx !== null && j.lx !== undefined) j.acc += Math.abs(e.clientX - j.lx) + Math.abs(e.clientY - j.ly);
        j.lx = e.clientX; j.ly = e.clientY;
        if (j.acc >= 120) { j.acc = 0; smoothPaper(); }
      });
      function startJam() {
        setLine('JAMMED'); S.phase = 'JAM'; S.lastJam = true;
        S.jam = { lid: false, smooths: 0, t0: api.now(), acc: 0, lx: null, ly: null };
        Array.prototype.forEach.call(accEl.children, function (d) { d.style.transform = ''; });
        lidBtn.textContent = 'OPEN LID (J)'; lidBtn.disabled = false; jamStatus.textContent = 'Lid: closed. Smooths: 0 of 3.';
        jamPanel.hidden = false; cover.classList.remove('m-fax-machine-feeding'); cover.classList.add('m-fax-machine-jammed');
        setLcd('PAPER JAM', 9000); say(J1, { mood: 'panic', pr: 1 }); sfx('buzz');
      }
      function jamAct() {
        const j = S.jam; if (!j || S.line !== 'JAMMED') return;
        if (!j.lid) {
          j.lid = true; lidBtn.textContent = 'LID OPEN'; lidBtn.disabled = true; sfx('pop');
          jamStatus.textContent = 'Lid: open. Smooths: 0 of 3.'; setLcd('LID OPEN. PLEASE SMOOTH THE PAPER.', 6000);
          say(J2, { mood: 'smug', pr: 1 });
        } else smoothPaper();
      }
      function smoothPaper() {
        const j = S.jam; if (!j || S.line !== 'JAMMED') return;
        if (!j.lid) { say(bag('j3', J3), { mood: 'confused' }); sfx('blip'); setLcd('THE LID IS CLOSED. THE LID IS PROUD OF IT.', 3000); return; }
        j.smooths++; sfx('whoosh');
        for (let i = 0; i < j.smooths * 2 && i < accEl.children.length; i++) accEl.children[i].style.transform = 'none';
        jamStatus.textContent = 'Lid: open. Smooths: ' + Math.min(3, j.smooths) + ' of 3.';
        if (j.smooths >= 3) resolveJam(false); else say(J4[j.smooths - 1], { mood: 'proud' });
      }
      function resolveJam(auto) {
        if (S.line !== 'JAMMED') return;
        S.jam = null; jamPanel.hidden = true; cover.classList.remove('m-fax-machine-jammed');
        setLine('SENDING'); S.phase = 'SCAN'; S.seqT0 = api.now();
        inc('jams'); api.award(1, 'jam'); sfx('ding');
        if (auto) say(J6, { mood: 'smug', pr: 1 });
        else { say(J5, { mood: 'proud', pr: 1 }); if (!S.seen.jam) { S.seen.jam = true; soon(2500, function () { say(J5B, { mood: 'proud', pr: 1 }); }); } }
        if (sget('jams') >= 3) api.achieve('fax-machine.unjammed');
        setLcd('PAPER JAM CLEARED. LID CLOSED ITSELF.', 3000);
      }
      function jamKey() {
        if (S.line === 'JAMMED') jamAct();
        else { sfx('tick'); setLcd('NO JAM. THE LID IS CLOSED. THE LID IS PLEASED.', 2500); }
      }
      /* ---- report ---- */
      function finishSend() {
        const c = S.cur;
        if (S.line !== 'SENDING' || S.phase !== 'REPORT') return;
        if (!c) { goIdle(); return; }
        const first = S.sent === 0;
        S.sent++; inc('sent');
        api.achieve('fax-machine.first');
        if (S.sent >= 25) api.achieve('fax-machine.page_one');
        if (S.beat < 1) S.beat = 1;
        api.award(0.5, 'send');
        const special = c.special && !c.isSelf && !c.isEnding;
        let tally = '0 (1 YOU)', silent = false;
        if (!c.isSelf) { const n = S.tallyN++; if (n < 5) tally = E_TALLY[n]; else if (n === 5) { tally = '1 (NOBODY, SILENTLY, ONCE)'; silent = true; } else tally = bag('tally', E_TALLY_LATE); }
        const paren = c.isSelf ? 'TO YOU, FROM YOU, IN TRANSIT FOR ZERO SECONDS, WHICH IS THE LONGEST ONE' : (S.lap >= 2 ? 'TO YOU' : STATUS[Math.min(9, S.beat)]);
        let outcome = (silent || special || c.isSelf) ? 'ok' : bag('surprise', ['ok', 'dept', 'return', 'ring', 'sandra']);
        if (outcome === 'ring' && !(S.beat >= 2 && liveSheets().length < 3 && !S.hush)) outcome = 'ok';
        if (outcome === 'sandra' && S.beat < 4) outcome = 'ok';
        const lines = ['TRANSMISSION REPORT', 'TO: ' + c.num + '        PAGES: ' + c.pages, 'RECIPIENTS: ' + tally, 'STATUS: OK (' + paren + ')', 'DURATION: ' + bag('edur', E_DUR)];
        if (outcome === 'dept') lines.push('RECEIVED BY: ' + bag('edept', E_DEPT));
        if (c.cc.key !== 'none') lines.push('CC: ' + c.cc.text.replace(/^CC:\s*/, '') + ' (' + c.cc.rep + ')');
        const sneeze = !silent && !special && !c.isSelf && api.chance(1 / 35);
        if (sneeze) { lines.push('NOTE: ' + bag('sneezen', SNEEZE_N)); sfx('pop'); soon(2600 * KT, function () { say(bag('sneezes', SNEEZE_S), { mood: 'confused', pr: 1 }); }); }
        if (api.now() < S.noReportUntil) setLcd('REPORT IS RESTING', 4000);
        else { addStrip(lines.join('\n'), { static: 4 - c.hits }); sfx('ding'); if (outcome === 'return') addStrip(bag('eret', E_RETURN)); }
        ccSent(c);
        if (first) say(`Your first fax has been transmitted. Delivery to 0 of 0 recipients: a perfect score, per policy.`, { mood: 'proud', pr: 1 });
        else if (!silent) say(fill(bag('esend', E_SEND), { n: c.pages }), { mood: 'smug' });
        if (outcome === 'ring') scheduleRing(2 * KP);
        else if (outcome === 'sandra') { if (S.sandra < 3) addSandraRow(Math.max(1, S.sandra + 1), true); else say(I7, { mood: 'smug' }); }
        /* tiers, SEEN, Sandra's schedule */
        const t = tier();
        if (t > S.tierShown) { S.tierShown = t; renderUrg(); soon(1800, function () { say(TIER_SAY[t - 1], { mood: 'smug', pr: 1 }); }); }
        if (S.sent === 3) { stampBtns.seen.hidden = false; soon(1000, function () { say(`A new stamp has arrived. It says SEEN. It was seen arriving.`, { mood: 'smug', pr: 1 }); }); }
        if (S.beat >= 4 && S.lap === 1) { const since = S.sent - S.b4sent; if (since >= 2 && S.sandra === 1) addSandraRow(2, true); if (since >= 4 && S.sandra === 2) addSandraRow(3, true); }
        if (S.beat >= 2 && S.nextRingAt === null) scheduleRing(12 * KP + api.rand() * 13 * KP);
        else if (S.beat >= 2 && outcome !== 'ring' && !S.script.length) scheduleRing(12 * KP + api.rand() * 13 * KP);
        /* special numbers */
        const pushOnce = function (id) { if (!S.script.some(function (x) { return x.id === id; })) S.script.push({ id: id, persist: false }); scheduleRing(2 * KP); };
        if (c.dial === '0') pushOnce('op');
        else if (c.dial === '911') pushOnce('911');
        else if (c.dial === '276') pushOnce('276');
        else if (c.dial === DENNIS_NUM) { pushOnce('dennis'); inc('dennis'); api.achieve('fax-machine.dennis'); api.flag.set('fax-machine.dennisFaxed', true); if (!S.seen.dennis) { S.seen.dennis = true; api.award(6, 'dennis'); S.dirty = true; } }
        else if (c.dial === '7½0' && !S.seen.floor) { S.seen.floor = true; pushOnce('floor'); api.award(2, 'floor'); api.achieve('fax-machine.wrong_number'); }
        clearSheet();
        renderScore(); renderUrg();
        if (c.isSelf) { selfLoop(c); persist(true); return; }
        goIdle();
        setLcd('TRANSMISSION OK (' + paren + ')', 3500);
        if (S.beat === 9 && S.lap === 1 && !S.endingDone && S.done.has('r2') && S.dial !== SELF_NUM) { S.dial = SELF_NUM; renderDial(); sendBtn.classList.add('m-fax-machine-pulse'); }
        persist();
      }
      function selfLoop(c) {
        const ep = ++S.epoch;
        setLine('RECEIVING'); S.phase = ''; S.printLine = 1;
        setLcd('YOU HAVE DIALED YOUR OWN NUMBER. IT ANSWERED.', 5000);
        if (!S.seen.selffax) { S.seen.selffax = true; api.award(7.5, 'self-dial'); }
        api.achieve('fax-machine.wrong_number'); inc('selfdial');
        const body = 'TO: ' + c.num + '   RE: ' + c.re.text.replace(/^Re:\s*/, '') + '   STAMPS: ' + c.stamps.length;
        for (let i = 0; i < 7; i++) {
          later((800 + i * 1600) * KT, function () {
            printFax({ from: 'YOU (555-0107)', letter: '', text: body + '\n\n' + SELF_COPY[i], noFade: true, ink0: 0.9 - 0.1 * i, cls: 'm-fax-machine-warm', small: true, page: pageText() }, { line: i === 6 });
            sfx('tick');
          }, ep);
        }
        later((800 + 7 * 1600 + 1200) * KT, function () { if (S.line === 'RECEIVING') { S.printLine = 0; goIdle(); } }, ep);
      }
      /* ---- the spam bust ---- */
      const concLayer = el('div', { class: 'm-fax-machine-conclayer', 'aria-hidden': 'true' });
      trayWrap.appendChild(concLayer);
      api.on(concLayer, 'animationend', function (e) { const d = e.target; if (d && d !== concLayer && d.parentNode === concLayer) concLayer.removeChild(d); });
      api.on(trayEl, 'click', function (e) {
        const strip = e.target && e.target.closest ? e.target.closest('.m-fax-machine-strip') : null;
        if (!strip || strip.parentNode !== trayEl) return;
        sfx('pop');
        api.award(0.1, 'report torn');
        setLcd('STRIP TORN. IT WAS ONLY EVER A STRIP.', 2000);
        trayEl.removeChild(strip);
        try { strip.blur(); } catch (x) { /* ignore */ }
      });
      function concertina() {
        const n = reduced() ? 5 : 12;
        while (concLayer.children.length > 0) concLayer.removeChild(concLayer.firstChild);
        for (let i = 0; i < n; i++) {
          concLayer.appendChild(el('div', { class: 'm-fax-machine-conc', style: { '--dx': Math.round((api.rand() - 0.5) * 240) + 'px', '--r': Math.round((api.rand() - 0.5) * 120) + 'deg', animationDelay: (i * 40) + 'ms' } }));
        }
        api.setTimeout(function () { while (concLayer.firstChild) concLayer.removeChild(concLayer.firstChild); }, reduced() ? 1500 : 3500);
      }
      function spamBusy(kind) {
        if (S.line === 'BUSY' || S.line === 'RECEIVING' || S.line === 'ENDING') return false;
        const ep = ++S.epoch;
        S.hs = null; S.cur = null; S.queuedSend = false; S.jam = null; S.phase = '';
        jamPanel.hidden = true; cover.classList.remove('m-fax-machine-feeding', 'm-fax-machine-jammed');
        setLine('BUSY'); S.sendTimes = []; S.keyTimes = []; S.coolSaid = false;
        setLcd('BUSY BUSY BUSY (PLEASE ADMIRE)', 6000 * KT);
        sfx('sad'); concertina();
        api.award(-0.25, 'fee'); inc('busy');
        api.achieve('fax-machine.excess');
        say(S.feeN === 0 || kind !== 'keys' ? (S.feeN < E_FEES.length ? E_FEES[S.feeN] : bag('fee', E_FEES.slice(2))) : bag('feek', E_FEE_KEYS), { mood: 'panic', pr: 1 }); S.feeN++;
        addStrip(E_FEE_STRIP);
        later(2000 * KT, function () { addStrip('STOP. THANK YOU.'); say(E_FEE_REPLY, { mood: 'smug' }); }, ep);
        later(6000 * KT, function () { goIdle(); }, ep);
        return true;
      }

      /* ---------- the not-ending ---------- */
      function endShakeStep(dt) {
        S.endT += dt;
        if (S.endT >= S.endDur) { S.phase = 'ENDRUN'; endingConnected(); }
      }
      function endingConnected() {
        const ep = S.epoch;
        S.endingDone = true; S.seqT0 = api.now();
        S.sent++; inc('sent'); S.cur = null; clearSheet(); renderScore(); persist(true);
        setLcd('CONNECTED (BOTH PARTIES: YOU)', 9000); sfx('fanfare');
        printFax({ from: 'NOBODY (YOU)', letter: '', text: `This correspondence is now concluded. Please see attached for the continuation.`, noFade: true, page: 'PAGE 1 OF 1' }, {});
        later(500 * KT, function () {
          api.confetti(); sfx('tada');
          say(`Congratulations. This is the first completed correspondence in the history of the building. Management has framed the moment, and the frame is also the moment.`, { mood: 'proud', pr: 2 });
          if (!S.seen.finalPaid) { S.seen.finalPaid = true; api.award(10, 'final'); persist(true); }
          api.achieve('fax-machine.final'); inc('selfdial');
        }, ep);
        later(5300 * KT, function () {
          printFax({ from: 'NOBODY (YOU)', letter: '', text: `Re: Final Notice. I wrote it as soon as I sent it. I did not want it to be final. Neither did the fax.`, noFade: true, page: 'PAGE 1 OF 1' }, {});
        }, ep);
        later(9300 * KT, function () { addStrip('TRANSMISSION COMPLETE. 0 ERRORS.\nRECIPIENTS: 0 (1 YOU).\nSTATUS: OK (TO YOU).'); sfx('ding'); }, ep);
        later(15300 * KT, function () { say(`Congratulations. You have reached the end of the faxes. The faxes continue.`, { mood: 'proud', pr: 2 }); }, ep);
        later(19300 * KT, function () {
          lcd.classList.add('m-fax-machine-dim');
          if (!reduced()) { soon(600, function () { lcd.classList.remove('m-fax-machine-dim'); lcd.classList.add('m-fax-machine-flick'); soon(700, function () { lcd.classList.remove('m-fax-machine-flick'); }); }); }
          else soon(600, function () { lcd.classList.remove('m-fax-machine-dim'); });
          S.lap++; S.endingDone = false; S.dial = ''; S.script = [];
          fromRow.hidden = false; sendBtn.classList.remove('m-fax-machine-pulse');
          api.award(2, 'lap'); inc('laps');
          scheduleRing(ringGap());
          renderDial(); renderCc(); persist(true);
          goIdle();
          setLcd('READY. NO ONE.', 5000);
        }, ep);
        soon(21800 * KT, function () {
          if (S.lap < 2 || S.dead) return;
          printFax({ from: 'THIS MACHINE (SELF-TEST)', letter: '', text: `TEST PAGE. If you can read this, the test has not failed. It has been a pleasure to be tested.`, noFade: true, cls: 'm-fax-machine-warm', page: 'PAGE 1 OF 1' }, {});
          soon(3200 * KT, archiveReturn);
        });
      }
      /* the closing image: every filed fax slides back out, stamped RECEIVED, into one tidy pile */
      function archiveReturn() {
        const n = Math.min(S.archive.length, 12);
        if (S.dead || S.pileDone || !n) return;
        S.pileDone = true;
        const pile = el('div', { class: 'm-fax-machine-pile', 'aria-hidden': 'true' });
        trayWrap.appendChild(pile);
        for (let i = 0; i < n; i++) {
          soon((i * 260 + 100) * KT, function () {
            pile.appendChild(el('div', { class: 'm-fax-machine-pl', style: { bottom: (i * 2) + 'px', left: (i % 3) + 'px', transform: 'rotate(' + ((i % 2 ? 1 : -1) * ((i * 7) % 3) * 0.4).toFixed(1) + 'deg)' }, text: 'RECEIVED' }));
            sfx('tick');
          });
        }
        soon((n * 260 + 600) * KT, function () {
          pile.appendChild(el('div', { class: 'm-fax-machine-plflag', text: 'PAGE 1 OF 1' }));
          sfx('stamp');
          say(`The faxes have returned. They were not lost. They were in the building the whole time, in the Nobody-shaped gap.`, { mood: 'proud', pr: 1 });
          soon(3200 * KT, function () { setLcd('READY. NO ONE.', 6000); });
        });
      }
      function hallway() {
        if (S.hallwayDone) return;
        S.hallwayDone = true; sfx('blip');
        say(`It was a very long hallway.`, { mood: 'proud', pr: 1 });
      }
      function prefillAsk() {
        if (S.lap > 1 || S.endingDone) return;
        S.dial = SELF_NUM; renderDial(); sendBtn.classList.add('m-fax-machine-pulse');
        setLcd('NUMBER READY: ' + SELF_NUM + '. SEND WHEN YOU ARE.', 6000);
      }

      /* ---------- scope drawing ---------- */
      function drawScope(dt, red) {
        if (!ctx) return;
        const active = S.phase === 'SHAKE' || S.phase === 'SCAN' || S.phase === 'ESHAKE';
        const now = api.now();
        if ((!active || red) && now - S.scopeAt < 200) return;
        S.scopeAt = now;
        if (!red) S.wave += dt * (active ? 90 : 18);
        const W = 320, H = 90, ph = red ? 0 : S.wave;
        ctx.fillStyle = '#1b2614'; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = 'rgba(199,217,74,.12)'; ctx.lineWidth = 1;
        for (let x = 20; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
        for (let y = 15; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
        if (S.phase === 'SCAN' && S.cur) {
          const per = S.scanDur / S.cur.pages, p = Math.max(0, Math.min(1, (S.scanT % per) / per));
          ctx.fillStyle = '#efe9d2'; ctx.fillRect(100, 10, 120, 72);
          ctx.fillStyle = 'rgba(45,61,82,.6)';
          for (let i = 0; i < 7; i++) ctx.fillRect(108, 18 + i * 9, 60 + ((i * 37) % 44), 3);
          const sy = 10 + 72 * p;
          S.scanBars.forEach(function (b) { if (b.y + 10 <= sy) { ctx.fillStyle = 'rgba(30,30,30,' + b.a + ')'; ctx.fillRect(100, b.y + 10, 120, 2); } });
          const g = ctx.createLinearGradient(0, sy - 22, 0, sy);
          g.addColorStop(0, 'rgba(199,217,74,0)'); g.addColorStop(1, 'rgba(199,217,74,.55)');
          ctx.fillStyle = g; ctx.fillRect(96, Math.max(10, sy - 22), 128, Math.min(22, sy - 10) + 1);
          ctx.fillStyle = '#e9ff6a'; ctx.fillRect(92, sy - 1, 136, 3);
          return;
        }
        if (S.phase === 'ESHAKE') {
          const diff = 3 * (1 - Math.min(1, S.endT / S.endDur));
          [['#c7d94a', 0, 2], ['#ffd27a', diff, 2]].forEach(function (w) {
            ctx.strokeStyle = diff < 0.08 ? '#ffffff' : w[0]; ctx.lineWidth = diff < 0.08 ? 3 : w[2]; ctx.beginPath();
            for (let x = 0; x <= W; x += 3) { const y = H / 2 + Math.sin((x + ph) / 9 + w[1]) * 20; if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
            ctx.stroke();
          });
          return;
        }
        const hs = S.phase === 'SHAKE' ? S.hs : null, amp = hs ? 14 : 3;
        ctx.strokeStyle = '#c7d94a'; ctx.lineWidth = 2; ctx.beginPath();
        for (let x = 0; x <= W; x += 3) { const y = H / 2 + Math.sin((x + ph) / 9) * amp + Math.sin(x * 12.9898 + ph * 0.31) * (hs ? 3 : 0.8); if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
        ctx.stroke();
        if (hs) {
          ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.moveTo(60, 4); ctx.lineTo(60, H - 4); ctx.stroke(); ctx.setLineDash([]);
          const spd = 216 / KT;
          hs.pulses.forEach(function (p, i) {
            const x = 60 + (p - hs.t) * spd;
            if (hs.hit[i]) {
              if (hs.flash[i] > 0) { ctx.strokeStyle = 'rgba(255,255,255,' + (hs.flash[i] / 0.3).toFixed(2) + ')'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(60, H / 2, 8 + (0.3 - hs.flash[i]) * 60, 0, 6.283); ctx.stroke(); }
              return;
            }
            if (x < -20 || x > W + 10) return;
            ctx.strokeStyle = hs.res[i] ? 'rgba(232,102,74,.5)' : '#ffffff'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x, 14); ctx.lineTo(x, H - 14); ctx.stroke();
            ctx.beginPath(); ctx.arc(x, H / 2, 7, 0, 6.283); ctx.stroke();
          });
          if (hs.burst > 0) { ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let k = 0; k < 24; k++) ctx.fillRect(40 + ((k * 53 + Math.floor(hs.burst * 100)) % 40), 8 + ((k * 31) % 74), 2, 2); }
        }
      }

      /* ---------- beats ---------- */
      const SCRIPTS = { 2: [['s1']], 3: [['s2']], 8: [['q3', 20], ['q4', 20], ['q5']], 9: [['r1', 8], ['r2']] };
      function queueScripts(upto) {
        for (let b = 2; b <= upto; b++) (SCRIPTS[b] || []).forEach(function (it) {
          if (!S.done.has(it[0]) && !S.script.some(function (x) { return x.id === it[0]; })) S.script.push({ id: it[0], persist: true, gap: it[1] || 0 });
        });
      }
      function unlockDrum(keys) {
        keys.forEach(function (k, i) {
          if (S.drum.indexOf(k) >= 0) return;
          S.drum.push(k);
          const d = DRUM.filter(function (x) { return x.key === k; })[0];
          if (d) soon(2200 * KT + i * 2600 * KT, function () { say(`The drum has gained a subject: ` + d.text + `. The drum did not ask for it and is touched.`, { mood: 'proud', pr: 1 }); });
        });
      }
      function cnt(n) { return n === 0 ? 0 : (TEST ? Math.max(1, Math.ceil(n * 0.25)) : n); }
      function maybeFireBeat() {
        if (S.line !== 'IDLE' || S.hush || S.lap > 1) return;
        if (S.beat === 0 && S.sent === 0 && S.playSec >= 75 * KP) {
          S.beat = 1; persist(true);
          say(`No fax has been sent in a good while. Management has decided the machine should be allowed a turn. The machine is thrilled and is not showing it.`, { mood: 'confused', pr: 1 });
        }
        const nb = S.beat + 1;
        if (nb < 2 || nb > 9) return;
        const g = GATES[nb];
        const secOk = S.playSec >= g[0] * KP, cntOk = S.sent >= cnt(g[1]) && S.received >= cnt(g[2]);
        let ok = secOk && cntOk;
        if (nb === 2 && S.playSec >= 75 * KP) ok = true;
        if (nb === 9 && !(S.done.has('q5') && !S.script.length)) ok = false;
        if (ok) fireBeat(nb);
      }
      function fireBeat(nb) {
        S.beat = nb;
        renderDial();
        if (BEAT_SAY[nb]) say(BEAT_SAY[nb], { mood: 'smug', pr: 1 });
        if (nb === 2) {
          queueScripts(2); scheduleRing(1 * KP);
          say(F_FIRST[0], { mood: 'confused', pr: 1 });
          soon(3000 * KT, function () { say(F_FIRST[1], { mood: 'panic', pr: 1 }); });
          soon(6000 * KT, function () { say(F_FIRST[2], { mood: 'panic', pr: 1 }); });
        } else if (nb === 3) {
          unlockDrum(['weather']); queueScripts(3); binder.classList.add('m-fax-machine-pulse');
          soon(5000 * KT, function () { say(`Management has begun tracking faxes per hour. The first reading is 'some'. The second reading is also some.`, { mood: 'proud' }); });
        } else if (nb === 4) {
          S.b4sent = S.sent; addSandraRow(1, false);
          soon(2500 * KT, function () { say(I_ROWS[0], { mood: 'smug', pr: 1 }); });
        } else if (nb === 5) unlockDrum(['toast', 'socks']);
        else if (nb === 6) unlockDrum(['yes', 'here', 'who']);
        else if (nb === 7) { app.classList.add('m-fax-machine-cursive'); S.cameoAt = S.playSec + 10 * KP; }
        else if (nb === 8) {
          S.hush = true; S.hushUntil = api.now() + 20000 * KT; S.hushQ2 = api.now() + 6000 * KT; S.hushQ2Done = false;
          setLcd('THE OTHER END HAS HUNG UP. THE OTHER END IS STILL ON THE LINE. BOTH ARE TRUE.', 20000 * KT);
          queueScripts(8); S.nextRingAt = null;
        } else if (nb === 9) { queueScripts(9); scheduleRing(2 * KP); }
        persist(true);
      }
      function hushTick(now) {
        if (!S.hushQ2Done && now >= S.hushQ2) {
          S.hushQ2Done = true;
          say(`The lines are quiet. That is allowed. Management is also quiet. Management has never done this in front of anyone.`, { mood: 'neutral', pr: 1 });
          if (!S.seen.quiet) { S.seen.quiet = true; api.award(0.1, 'quiet'); }
        }
        if (now >= S.hushUntil) {
          S.hush = false;
          say(`Management has stopped tracking the metric. Management is just here.`, { mood: 'neutral', pr: 1 });
          scheduleRing(2 * KP); setLcd('READY. NO ONE.', 2000);
        }
      }

      /* ---------- idle ladder ---------- */
      function idleFax(spec) { if (S.line !== 'IDLE' || S.hush || S.dead) return; doRing({ quiet: true, spec: spec }); }
      function lightKeys() {
        const ep = ++S.litEp, seq = ['5', '5', '5', '0', '1', '0', '7'];
        const unlit = function () { Array.prototype.forEach.call(keysEl.children, function (b) { b.classList.remove('m-fax-machine-lit'); }); };
        seq.forEach(function (k, i) {
          api.setTimeout(function () { if (S.dead || ep !== S.litEp) return; unlit(); const b = keysEl.children[KEYS.indexOf(k)]; if (b) b.classList.add('m-fax-machine-lit'); }, i * 700 + 1);
        });
        api.setTimeout(function () { if (S.dead || ep !== S.litEp) return; unlit(); }, 7 * 700 + 1);
      }
      function unlitKeys() { Array.prototype.forEach.call(keysEl.children, function (b) { b.classList.remove('m-fax-machine-lit'); }); }
      function idleStage(n) {
        if (n === 0) { keysEl.classList.add('m-fax-machine-pulse'); if (!S.a7) { S.a7 = true; say(`The keys are lit because they would like to be pressed. Management has no stake in this. Management has a very small stake.`, { mood: 'smug' }); } }
        else if (n === 1) { addStrip(bag('istrip', IDLE_STRIPS)); say(`Management is not worried. Management has simply moved its chair nearer the machine.`, { mood: 'smug', pr: 1 }); }
        else if (n === 2) {
          api.achieve('fax-machine.patient');
          idleFax({ from: 'NOBODY', letter: '', text: `Are you still there? The line is open. I am also open. -- Nobody`, small: true, noFade: true, page: pageText() });
        } else if (n === 3) {
          setLcd('ARE YOU STILL THERE? (Y/Y)', 20000); yyRow.hidden = false; S.yyOn = true;
          idleFax({ from: 'NOBODY', letter: '', text: `Fax of an empty chair.`, art: artChair, noFade: true, page: pageText() });
        } else if (n === 4) { lightKeys(); say(`The keypad is dialing 5-5-5-0-1-0-7. That is its own number. It has done this before. It does not pick up.`, { mood: 'confused', pr: 1 }); }
        else if (n === 5) {
          api.stat.max('fax-machine.idle_max', Math.floor((api.now() - S.lastInput) / 1000));
          idleFax({ from: 'THE MACHINE', letter: '', text: 'ROOM (EMPTY, ACCURATE)', art: artRoom, noFade: true, page: pageText(), react: `The machine has faxed you an empty room. It has put a chair in it. The room is accurate. The chair is for you.`, mood: 'proud' });
        } else if (n === 6) idleFax({ from: 'THE MACHINE', letter: '', text: `I have drawn the room again. I added a window. It looks out on the room.`, art: artRoom, noFade: true, small: true, page: pageText() });
        else if (n === 7) { api.stat.max('fax-machine.idle_max', Math.floor((api.now() - S.lastInput) / 1000)); say(`Ten minutes alone with the machine. It does most of the talking. It is mostly beeps and it is a little about you.`, { mood: 'neutral', pr: 1 }); }
      }
      function practise() {
        S.prac = true;
        ['kssshhh... BEEP', 'bwong... bwong... (PRACTISING)', 'PULSES: 4 OF 4. THE OTHER END WAS A CHAIR.'].forEach(function (t, i) { soon(i * 1800 * KT, function () { if (S.line === 'IDLE' && S.prac) setLcd(t, 2500); }); });
        addStrip('PRACTICE HANDSHAKE: 4 OF 4.\nTHE OTHER END WAS A CHAIR. THE CHAIR WAS SUPPORTIVE.'); say(bag('prac', PRAC), { mood: 'smug', pr: 1 });
      }
      function answerYY() {
        if (!S.yyOn) return;
        S.yyOn = false; yyRow.hidden = true; sfx('ding');
        api.award(1, 'welcome back');
        say(`Welcome back. Nothing happened while you were gone. We did it carefully.`, { mood: 'proud' });
        setLcd('READY. NO ONE.', 2500);
      }
      function onInput() {
        if (S.dead) return;
        const now = api.now();
        const secs = (now - S.lastInput) / 1000;
        S.lastInput = now; S.prac = false;
        if (S.idleStage > 0) {
          const T = TEST ? IDLE_T.test : IDLE_T.real;
          if (!S.hush && secs >= T[2]) { say(bag(secs >= T[5] ? 'k7' : 'k6', secs >= T[5] ? K7 : K6), { mood: 'smug', pr: 1 }); S.plainNext = true; if (S.yyOn) soon(4000, function () { yyRow.hidden = true; S.yyOn = false; }); }
          S.idleStage = 0; S.litEp++; unlitKeys();
          if (S.dialed) keysEl.classList.remove('m-fax-machine-pulse');
        }
      }

      /* ---------- spare widgets ---------- */
      function onHandset() {
        S.handUp = !S.handUp;
        handBtn.classList.toggle('m-fax-machine-up', S.handUp);
        if (S.handUp) {
          S.handN++; inc('handset'); sfx('blip');
          setLcd('HANDSET LIFTED. LINE: DEAD (CONFIDENT).', 2500);
          if (sget('handset') >= 30 && !S.seen.hello) {
            S.seen.hello = true;
            say(`...hello?`, { who: 'Handset', mood: 'confused', pr: 2 });
            soon(2000, function () { say(`Sorry, wrong machine.`, { who: 'Handset', mood: 'smug', pr: 2 }); });
          } else if (L2_ESC[sget('handset')]) say(L2_ESC[sget('handset')], { mood: 'confused', pr: 1 });
          else say(bag('l2', L2), { mood: 'smug' });
        } else { sfx('tick'); setLcd('HANDSET REPLACED. THE LINE EXHALES.', 2500); }
      }
      function onSticker() {
        S.stickerN++; sfx('tick');
        if (S.stickerN < 7) { setLcd(['STICKER PRESSED. IT IS STILL A STICKER.', 'SERVICE DATE: NEXT THURSDAY (STILL).', 'THE STICKER HAS NOTED YOUR INTEREST.', 'LAST SERVICED BY: A THURSDAY.', 'THE STICKER IS NOT A BUTTON. IT IS BEING BRAVE.', 'ONE MORE AND IT WILL ADMIT SOMETHING.'][S.stickerN - 1], 2500); return; }
        if (S.stickerN === 7) {
          S.hatch = true; hatchEl.hidden = false; sfx('pop'); setLcd('SERVICE HATCH: OPEN.', 3000);
          say(`Technician: Technically.`, { who: 'Technician', mood: 'smug', pr: 2 });
          api.achieve('fax-machine.technically');
          if (!S.seen.sticker) { S.seen.sticker = true; api.award(3, 'technician'); S.dirty = true; }
          soon(3000, function () { say(`A second line, smaller, is pinned inside the hatch: 'Dennis (Plant) approved this repair. Dennis has no hands.'`, { mood: 'smug' }); });
        } else { S.hatch = !S.hatch; hatchEl.hidden = !S.hatch; setLcd(S.hatch ? 'HATCH OPEN. IT HAS NOTHING NEW.' : 'HATCH CLOSED. THANK YOU.', 2000); }
      }
      function toggleDrawer(force) {
        drawer.hidden = force === undefined ? !drawer.hidden : !force;
        binBtn.setAttribute('aria-expanded', String(!drawer.hidden));
        binBtn.textContent = drawer.hidden ? '🗂️ OPEN DRAWER (H)' : '🗂️ CLOSE DRAWER (H)';
        sfx('tick'); renderDrawer();
      }
      function renderDrawer() {
        if (drawer.hidden) return;
        while (drawer.firstChild) drawer.removeChild(drawer.firstChild);
        if (!S.archive.length) drawer.appendChild(el('div', { class: 'm-fax-machine-full', text: 'The binder is empty. It is a very clean empty.' }));
        S.archive.forEach(function (r) {
          drawer.appendChild(el('button', { class: 'm-fax-machine-rec', type: 'button', 'aria-expanded': 'false', style: { opacity: (0.4 + 0.6 * r.k / 100).toFixed(2) } }, 'FROM ' + r.f + ' | ' + (r.t || '(blank)')));
          drawer.appendChild(el('div', { class: 'm-fax-machine-full', hidden: true, text: (r.full || r.t || '(blank)') + (r.re ? '\n[' + r.re + ']' : '') }));
        });
      }

      /* ---------- watchdog, resize, input wiring ---------- */
      function watchdog(now) {
        const cap = { SENDING: 40000, JAMMED: 42000, RECEIVING: 28000, BUSY: 12000, ENDING: 45000 }[S.line];
        if (!cap) { S.lineT0 = now; return; }
        if (S.lineT0 === 0 || S.lineKey !== S.line) { S.lineKey = S.line; S.lineT0 = now; return; }
        if (S.line === 'JAMMED' && S.jam && now - S.jam.t0 > (TEST ? 6000 : 30000)) { resolveJam(true); return; }
        if (S.line === 'SENDING' && S.phase !== 'JAM' && S.phase !== 'ENDRUN' && S.phase !== 'ESHAKE' && now - S.lineT0 > 3200 * 2 + 4000 + S.pages * 1500) {
          /* a stalled rAF (hidden tab): skip ahead instead of hanging */
          if (S.phase === 'SHAKE' && S.hs) { S.hs.t = S.hs.dur; endShake(); }
          else if (S.phase === 'SCAN') { S.scanT = S.scanDur; scanStep(0); }
          else if (S.phase === 'REPORT') finishSend();
          S.lineT0 = now; return;
        }
        if (now - S.lineT0 > cap) { S.epoch++; S.phase = ''; S.hs = null; S.cur = null; S.jam = null; S.printLine = 0; jamPanel.hidden = true; S.endingDone = S.endingDone && S.lap > 1; goIdle(); S.lineT0 = now; }
      }
      function onResize() {
        const w = root.clientWidth;
        if (!w) return;
        app.classList.toggle('m-fax-machine-wide', w >= 760);
        const compact = w < 480;
        app.classList.toggle('m-fax-machine-compact', compact);
        const now = api.now();
        if (compact !== S.compact) {
          if (S.sizeInit && now - S.resizeAt >= 10000) { S.resizeAt = now; say(compact ? `Landscape mode engaged. Please tilt your head. Management is tilting theirs.` : `The machine is back to a normal width. It would like it noted that it enjoyed being compact.`, { mood: 'confused' }); }
          S.compact = compact;
        }
        if (S.sizeInit && w !== S.lastW) {
          S.resizeTimes.push(now);
          S.resizeTimes = S.resizeTimes.filter(function (t) { return now - t < 5000; });
          if (S.resizeTimes.length >= 5 && !S.t4Done) { S.t4Done = true; S.postage = true; say(`Page scaled to fit: 3%. The fax is now a stamp. The stamp is addressed to Nobody.`, { mood: 'panic', pr: 1 }); }
        }
        S.lastW = w;
      }
      function own(e, code) { try { e.preventDefault(); } catch (x) { /* ignore */ } S.owned.add(code); }
      function onKeyDown(e) {
        if (S.dead) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const t = e.target, tag = t && t.tagName ? String(t.tagName).toUpperCase() : '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
        const k = typeof e.key === 'string' ? e.key : '', kl = k.toLowerCase();
        const hs = S.phase === 'SHAKE' || S.phase === 'ESHAKE';
        const isBtn = tag === 'BUTTON';
        let fv = false;
        try { fv = isBtn && t.matches(':focus-visible'); } catch (x) { fv = false; }
        if (isBtn && t.closest && !t.closest('.m-fax-machine-app')) return;   // Exit / Mute keep their own keys
        if (k === ' ' || e.code === 'Space') {
          if (!hs && isBtn && fv) return;
          own(e, 'Space'); if (e.repeat) return;
          if (hs) tap(); else { S.keyHold.add('Space'); if (!activeSheet()) setLcd('NOTHING TO HOLD FLAT. THE ROLL IS EMPTY.', 2000); noteHold(); }
          return;
        }
        if (k === 'Enter') {
          if (!hs && isBtn && fv) return;
          if (!hs && t && t.classList && t.classList.contains('m-fax-machine-sheet')) { own(e, 'Enter'); if (!e.repeat) flattenAWhile(sheetOf(t)); return; }   // Enter on a focused sheet holds it flat for 4 s
          own(e, 'Enter'); if (e.repeat) return; if (hs) tap(); else sendPress(); return; }
        if (kl === 'g') { own(e, 'g'); if (e.repeat) return; S.keyHold.add('g'); if (!activeSheet()) setLcd('NOTHING TO HOLD FLAT. THE ROLL IS EMPTY.', 2000); noteHold(); return; }
        if (e.repeat) return;
        if (/^[0-9]$/.test(k)) { dialPress(k); return; }
        if (k === '/' || k === '.') { e.preventDefault(); dialPress('½'); return; }
        if (k === 'Backspace') { e.preventDefault(); backspace(); return; }
        if (k === 'Escape') { if (!drawer.hidden) toggleDrawer(false); else clearDial(true); return; }
        if (k === ']') { rollDrum(1); return; }
        if (k === '[') { rollDrum(-1); return; }
        if (k === '-' || e.code === 'Minus') { setPages(-1); return; }
        if (k === '=' || k === '+' || e.code === 'Equal') { setPages(1); return; }
        const si = ['z', 'x', 'c', 'v', 'n'].indexOf(kl);
        if (si >= 0) { toggleStamp(STAMPS[si].key); return; }
        if (kl === 't') sheetAct('T'); else if (kl === 'f') sheetAct('F'); else if (kl === 'w') sheetAct('W');
        else if (kl === 'h') toggleDrawer(); else if (kl === 'j') jamKey(); else if (kl === 'k') rollCc();
      }
      function onKeyUp(e) {
        if (S.dead) return;
        const k = typeof e.key === 'string' ? e.key : '';
        let code = null;
        if (k === ' ' || e.code === 'Space') code = 'Space'; else if (k === 'Enter') code = 'Enter'; else if (k.toLowerCase() === 'g') code = 'g';
        if (!code) return;
        if (S.owned.has(code)) { try { e.preventDefault(); } catch (x) { /* ignore */ } S.owned.delete(code); }
        if (code !== 'Enter' && S.keyHold.delete(code) && !S.keyHold.size && !S.ptrHold) sfx('tick');
      }

      api.on(document, 'keydown', onKeyDown);
      api.on(document, 'keyup', onKeyUp);
      ['pointerdown', 'keydown', 'pointermove'].forEach(function (n) { api.on(document, n, onInput); });
      api.on(document, 'pointerup', function () { if (S.ptrHold) { S.ptrHold = null; sfx('tick'); } });
      api.on(document, 'visibilitychange', function () { releaseHolds(); });
      api.on(window, 'blur', function () { releaseHolds(); });
      api.on(window, 'resize', onResize);
      api.on(slot, 'pointerdown', function (e) {
        if (e.button > 0) return;
        const t = e.target;
        if (t && t.closest && t.closest('button')) return;
        const paper = t && t.closest ? t.closest('.m-fax-machine-paper') : null;
        const s = paper ? sheetOf(paper) : null;
        if (!s || s.dead || s.retiring) return;
        try { e.preventDefault(); } catch (x) { /* ignore */ }
        S.active = s; S.ptrHold = s; s.pdY = e.clientY; s.pdX = e.clientX; s.moved = 0;
        noteHold();
        try { paper.setPointerCapture(e.pointerId); } catch (x) { /* synthetic events have no active pointer */ }
      });
      api.on(slot, 'dblclick', function (e) {
        const t = e.target;
        if (t && t.closest && t.closest('button')) return;
        const paper = t && t.closest ? t.closest('.m-fax-machine-paper') : null;
        if (paper) flattenAWhile(sheetOf(paper));
      });
      api.on(slot, 'pointermove', function (e) {
        const s = S.ptrHold;
        if (!s || s.dead) return;
        const dy = e.clientY - s.pdY;
        s.moved = Math.max(s.moved, Math.abs(dy) + Math.abs(e.clientX - s.pdX));
        if (dy > 70 && s.state === 'roll' && s.full) tearSheet(s);
      });
      const slotUp = function (e) {
        const s = S.ptrHold;
        if (!s) return;
        S.ptrHold = null; sfx('tick');
        if (!s.dead && s.state === 'torn' && s.moved > 20) {
          let hit = null;
          try { hit = document.elementFromPoint(e.clientX, e.clientY); } catch (x) { hit = null; }
          if (hit && binder.contains(hit)) fileSheet(s);
        }
      };
      api.on(slot, 'pointerup', slotUp); api.on(slot, 'pointercancel', slotUp); api.on(slot, 'lostpointercapture', slotUp);
      api.on(slot, 'pointerover', function (e) { const s = sheetOf(e.target); if (s && !s.dead && !s.retiring) S.active = s; });
      api.on(slot, 'focusin', function (e) { const s = sheetOf(e.target); if (s && !s.dead && !s.retiring) S.active = s; });
      api.on(slot, 'click', function (e) {
        const b = e.target && e.target.closest ? e.target.closest('button') : null;
        if (!b || !b.dataset || !b.dataset.act) return;
        const s = sheetOf(b);
        if (!s) return;
        S.active = s;
        if (b.dataset.act === 'tear') tearSheet(s); else if (b.dataset.act === 'file') fileSheet(s); else if (b.dataset.act === 'fwd') forwardSheet(s);
        blurSoon(b);
      });
      api.on(drawer, 'click', function (e) {
        const b = e.target && e.target.closest ? e.target.closest('button') : null;
        if (!b || !b.nextSibling) return;
        b.nextSibling.hidden = !b.nextSibling.hidden;
        b.setAttribute('aria-expanded', String(!b.nextSibling.hidden));
      });

      /* ---------- minute marks, the 3-minute review, the 10-minute Tuesday ---------- */
      function moments() {
        if (S.hush || S.line !== 'IDLE' || liveSheets().length >= 3) return;
        const mm = Math.floor(S.playSec / (60 * KP));
        if (mm > S.minN) { S.minN = mm; if (mm <= MINUTE_LCD.length) setLcd(MINUTE_LCD[mm - 1], 7000); }
        if (!S.seen.m3 && S.playSec >= 180 * KP) {
          if (doRing({ spec: baseSpec(REVIEW, { from: 'PEOPLE & THINGS (ANNEX)', letter: '', pre: true, small: true, cls: 'm-fax-machine-sandrafont', react: `At three minutes the machine has been reviewed. It was rated 'meets some expectations'. It has asked which ones. HR will circle back.`, mood: 'proud' }) })) { S.seen.m3 = true; S.dirty = true; api.award(1, 'review'); inc('review'); }
        } else if (!S.seen.m10 && S.playSec >= 600 * KP) {
          if (doRing({ spec: baseSpec(TUESDAY_FAX + api.line('fortune'), { from: 'THE DAY BEFORE', letter: '', noFade: true, react: `Ten minutes. Management notified Tuesday. Tuesday declined, politely, and sent the day before in its place. This is the first time Tuesday has been avoided in writing.`, mood: 'proud' }) })) {
            S.seen.m10 = true; S.dirty = true; api.award(3, 'tuesday'); inc('tuesday'); api.flag.set('fax-machine.tuesdayMoved', true);
            soon(2600 * KT, function () { api.confetti(); sfx('tada'); });
          }
        }
      }
      /* ---------- the 1s clock ---------- */
      function tick1() {
        if (S.dead) return;
        const now = api.now();
        if (now - S.lastInput < 20000) { S.playSec++; S.dirty = true; }
        app.classList.toggle('m-fax-machine-reduced', reduced());
        if (!S.sizeInit) { onResize(); S.sizeInit = true; }
        watchdog(now);
        if (S.hush) hushTick(now);
        if (S.hallwayAt && !S.hallwayDone && now - S.hallwayAt > 10000 * KT) hallway();
        if (!S.a5 && S.playSec >= 18 * KP && S.sent === 0 && S.beat < 2) { S.a5 = true; say(`You may dial any number. Management suggests one with a good feeling. Management has never dialed anything and cannot be corrected.`, { mood: 'smug', pr: 1 }); }
        if (!S.a6 && S.playSec >= 30 * KP && S.beat < 3) { S.a6 = true; say(`The room smells faintly of toner and Tuesday. Management stopped noticing in 2009, which is a skill.`, { mood: 'smug', pr: 1 }); }
        if (S.line === 'IDLE' && !S.dial && now > S.lcdUntil && now - S.lcdRotAt >= 12000) { S.lcdRotAt = now; S.lcdRot = (S.lcdRot + 1) % IDLE_LCD.length; setLcd(IDLE_LCD[S.lcdRot], 11500, true); }
        if (S.nextRingAt !== null && S.playSec >= S.nextRingAt && !S.hush) {
          if (S.line === 'IDLE') doRing();
          else if (S.line !== 'ENDING' && !S.holdingShown) { S.holdingShown = true; setLcd('INCOMING (HOLDING)', 3000); }
        }
        maybeFireBeat();
        if (!S.seen.cc && S.line === 'IDLE' && !S.hush && S.beat >= 5 && S.sent >= cnt(9) && S.playSec >= 240 * KP) unlockCc();
        moments();
        if (!S.hush && S.line !== 'ENDING') {
          const secs = (now - S.lastInput) / 1000, T = TEST ? IDLE_T.test : IDLE_T.real;
          while (S.idleStage < 8 && secs >= T[S.idleStage]) { const n = S.idleStage; S.idleStage++; idleStage(n); }
          if (!S.prac && S.idleStage === 1 && S.line === 'IDLE' && secs >= (TEST ? 6 : 45)) practise();
        }
        if (S.dirty && now - S.persistAt >= 2000) persist(true);
      }

      /* ---------- boot ---------- */
      S.wave = 0; S.lineT0 = 0; S.lineKey = ''; S.coolSaid = false;
      S.seen = sv.seen;
      if (S.lap >= 2) fromRow.hidden = false;
      for (let i = 1; i <= S.sandra; i++) addSandraRow(i, false);
      if (S.beat >= 7) app.classList.add('m-fax-machine-cursive');
      S.reIdx = 0;
      S.tierShown = tier();
      S.faxSeq = sget('received');
      queueScripts(S.beat);
      if (S.beat >= 9 && S.done.has('r2') && S.lap === 1) { S.dial = SELF_NUM; sendBtn.classList.add('m-fax-machine-pulse'); }
      if (S.beat >= 2 && S.script.length) scheduleRing(6 * KP);
      else if (S.beat >= 2) scheduleRing(ringGap());
      if (S.dial) S.dialed = true;
      if (sv.sent > 0) { S.dialed = true; keysEl.classList.remove('m-fax-machine-pulse'); }
      renderDial(); renderScore(); renderDrum(); renderUrg(); renderLeds(); renderCc();
      app.classList.toggle('m-fax-machine-reduced', reduced());
      onResize(); S.sizeInit = true;
      S.bootT = api.now(); S.lcdRotAt = S.bootT;
      if (sv.sent === 0) sendBtn.classList.add('m-fax-machine-pulse');
      setLcd(idleMsg(), 10000);
      S.raf = api.requestAnimationFrame(frame);
      api.setInterval(tick1, 1000);
      if (sv.resumed) {
        soon(700, function () { say(api.chance(0.4) ? api.line('m:fax-machine:enter') : bag('a8', [`Resuming at stage {n} of nine. The machine kept your place. It kept it warm.`, `Welcome back to the Fax Room. The faxes have been waiting, in the sense that faxes wait.`, `The line has been held open for you since last time. It was not busy. It was waiting.`]).replace('{n}', String(S.beat)), { mood: 'proud', pr: 1 }); }); // lint-ignore
      } else {
        soon(400, function () { say(`Welcome. Press SEND and it will go to Nobody, who has put on a nice hat.`, { mood: 'proud', pr: 1 }); });
        soon(1500, function () {
          if (S.dead || S.sheets.length) return;
          const spec = { from: 'THIS MACHINE (SELF-TEST)', letter: '', text: `TEST PAGE. If you can read this, the test has not failed. If you cannot, please fax us.`, noFade: true, test: true, page: 'PAGE 1 OF 1', flatMs: 7000, flatDelay: 5200, flatIfNew: true,
            onPrinted: function () {
              const rate = function () { say(`The machine has printed its own test page. Management rates it 9 out of 10. The missing point is modesty.`, { mood: 'proud', pr: 1 }); };
              if (S.seen.held) { rate(); return; }
              soon(5200 * KT, function () { say(`The machine is flattening its own test page to show you how. It has been practising. Hold any paper flat to read it.`, { mood: 'proud', pr: 1 }); rate(); });
            } };
          if (S.line === 'IDLE') { setLine('RECEIVING'); S.printLine++; printFax(spec, { line: true }); sfx('bell'); } else printFax(spec, {});
        });
        soon(9000, function () { if (S.sent === 0 && !S.dialed) say(`Dial a number. Any number. Send it.`, { mood: 'neutral' }); });
      }
      return {
        destroy() {
          persist(true);
          if (S.sent > 0 && !S.dead) { try { api.sayRandom('m:fax-machine:exit', { mood: 'smug', priority: 0 }); } catch (e) { /* ignore */ } }
          S.dead = true;
          S.keyHold.clear(); S.ptrHold = null; S.sheets.length = 0;
        }
      };
    }
  });
})();
