/* POINTLESS module: wait-for-it */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-wait-for-it-wrap{--ink:#2B2118;--cream:#FFF4DC;--mint:#9BE0C4;--mint2:#6CC7A4;--coral:#FF7A66;--mus:#F2B93B;--lil:#C3A6F0;--sky:#BFE3F2;--track:#FFFDF5;--fill:var(--mint);--fill2:var(--mint2);position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:12px;align-items:start;padding:12px;min-height:420px;color:var(--ink);background:radial-gradient(#2b211822 1px,transparent 1.5px) 0 0/14px 14px,var(--cream);font:500 .92rem/1.35 ui-rounded,'Trebuchet MS',system-ui,sans-serif;overflow-x:hidden}
.m-wait-for-it-wrap *{box-sizing:border-box}
.m-wait-for-it-wrap [hidden]{display:none!important}
.m-wait-for-it-wrap[data-fill="lil"]{--fill:var(--lil);--fill2:#a98be0}
.m-wait-for-it-wrap[data-fill="mus"]{--fill:var(--mus);--fill2:#d99a1a}
@media (min-width:900px){.m-wait-for-it-wrap{grid-template-columns:minmax(0,1.7fr) minmax(250px,1fr)}}
.m-wait-for-it-col{display:flex;flex-direction:column;gap:12px;min-width:0}
.m-wait-for-it-win{position:relative;background:#fffdf5;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);overflow:hidden}
.m-wait-for-it-tb{display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--lil);border-bottom:3px solid var(--ink);font-weight:800;font-size:.8rem}
.m-wait-for-it-dt{width:12px;height:12px;border-radius:50%;border:2px solid var(--ink);background:var(--coral);flex:none}
.m-wait-for-it-dt:nth-child(2){background:var(--mus)}.m-wait-for-it-dt:nth-child(3){background:var(--mint)}
.m-wait-for-it-tbt{margin-left:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-wait-for-it-body{position:relative;display:flex;flex-direction:column;gap:10px;padding:12px}
.m-wait-for-it-head{display:flex;gap:10px;align-items:flex-start;justify-content:space-between}
.m-wait-for-it-info{min-width:0;flex:1;display:flex;flex-direction:column;gap:3px}
.m-wait-for-it-task{font-weight:900;font-size:1.05rem;overflow-wrap:anywhere}
.m-wait-for-it-eta{font-style:italic;font-size:.82rem;overflow-wrap:anywhere}
.m-wait-for-it-tip{font-size:.75rem;color:#5a4a3c;overflow-wrap:anywhere}
.m-wait-for-it-chipf{align-self:flex-start;font-size:.7rem;font-weight:900;padding:1px 10px;border:2px solid var(--ink);border-radius:99px;background:var(--mus)}
.m-wait-for-it-read{flex:none;display:flex;align-items:baseline;gap:2px;max-width:56%;font:800 clamp(1.4rem,5.5vw,2.4rem)/1 ui-monospace,Consolas,monospace;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden}
.m-wait-for-it-ru{font-size:.42em;font-weight:800;font-family:ui-rounded,'Trebuchet MS',system-ui,sans-serif}
.m-wait-for-it-rew .m-wait-for-it-read,.m-wait-for-it-rew3 .m-wait-for-it-read{text-shadow:2px 0 var(--coral),-2px 0 #4aa8d8}
.m-wait-for-it-barwrap{position:relative;width:100%;transition:width .8s}
.m-wait-for-it-narrow .m-wait-for-it-barwrap{width:70%}
.m-wait-for-it-bar{position:relative;display:block;width:100%;height:44px;padding:0;border:3px solid var(--ink);border-radius:24px;background:var(--track);overflow:hidden;cursor:pointer;font:inherit;box-shadow:inset 0 3px 0 #2b211822;-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;--r:99%}
.m-wait-for-it-btn:focus-visible,.m-wait-for-it-bar:focus-visible,.m-wait-for-it-sb:focus-visible,.m-wait-for-it-red:focus-visible,.m-wait-for-it-range:focus-visible{outline:3px dashed var(--mus);outline-offset:3px}
.m-wait-for-it-fill{position:absolute;inset:0;clip-path:inset(0 var(--r) 0 0);background:repeating-linear-gradient(-45deg,var(--fill) 0 14px,var(--fill2) 14px 28px);animation:m-wait-for-it-stripe 1s linear infinite}
.m-wait-for-it-rew .m-wait-for-it-fill{transition:clip-path .4s steps(8)}
.m-wait-for-it-rew3 .m-wait-for-it-fill{transition:clip-path 3s steps(24)}
.m-wait-for-it-walk .m-wait-for-it-fill{transition:clip-path .9s ease-in-out}
.m-wait-for-it-ribbon .m-wait-for-it-fill{animation:none;background:var(--mus)}
.m-wait-for-it-seg{position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 19px,rgba(43,33,24,.16) 19px 21px);pointer-events:none}
.m-wait-for-it-shim{position:absolute;top:0;bottom:0;left:0;width:100%;background:linear-gradient(90deg,transparent 0,transparent 42%,rgba(255,255,255,.75) 50%,transparent 58%,transparent 100%);transform:translateX(-100%);will-change:transform;opacity:0;pointer-events:none}
.m-wait-for-it-wrap[data-beat="2"] .m-wait-for-it-shim,.m-wait-for-it-wrap[data-beat="3"] .m-wait-for-it-shim,.m-wait-for-it-wrap[data-beat="4"] .m-wait-for-it-shim{opacity:1;animation:m-wait-for-it-shim 2.6s linear infinite}
.m-wait-for-it-scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.14) 0 2px,transparent 2px 4px);opacity:0;pointer-events:none}
.m-wait-for-it-rew .m-wait-for-it-scan,.m-wait-for-it-rew3 .m-wait-for-it-scan{opacity:1}
.m-wait-for-it-dot{position:absolute;top:50%;left:calc(100% - var(--r));width:12px;height:12px;margin:-6px 0 0 -8px;border-radius:50%;background:var(--coral);border:2px solid var(--ink);opacity:0;pointer-events:none}
.m-wait-for-it-stall .m-wait-for-it-dot{opacity:1;animation:m-wait-for-it-pulse .6s ease-in-out infinite alternate}
.m-wait-for-it-sweat{position:absolute;top:1px;left:calc(100% - var(--r));margin-left:-6px;font-size:14px;line-height:1;opacity:0;transition:opacity .3s;pointer-events:none}
.m-wait-for-it-watch .m-wait-for-it-sweat{opacity:1}
.m-wait-for-it-blush .m-wait-for-it-bar{background:#ffd9d2}
.m-wait-for-it-tip{min-height:2.7em}
.m-wait-for-it-tipb{align-self:flex-start;color:var(--ink);background:#fff;border:2px solid var(--ink);border-radius:10px;padding:2px 9px;font-weight:700;box-shadow:2px 2px 0 var(--ink)}
.m-wait-for-it-norsp .m-wait-for-it-win{filter:saturate(.45);cursor:progress}
.m-wait-for-it-norsp .m-wait-for-it-win::after{content:'';position:absolute;inset:0;z-index:5;background:rgba(255,255,255,.25);pointer-events:none}
.m-wait-for-it-norsp .m-wait-for-it-bar,.m-wait-for-it-norsp .m-wait-for-it-btn{cursor:progress}
.m-wait-for-it-cap.m-wait-for-it-struck{text-decoration:line-through;opacity:.35;transition:opacity .3s}
.m-wait-for-it-cap.m-wait-for-it-gap{visibility:hidden}
.m-wait-for-it-puff,.m-wait-for-it-bread{position:absolute;top:8px;font-size:18px;opacity:0;pointer-events:none}
.m-wait-for-it-puff.m-wait-for-it-on{animation:m-wait-for-it-drift 4s linear forwards}
.m-wait-for-it-bread{right:12px;font-size:20px}.m-wait-for-it-bread.m-wait-for-it-on{animation:m-wait-for-it-fade 3.5s ease-out forwards}
.m-wait-for-it-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.m-wait-for-it-btn{font:800 .85rem ui-rounded,'Trebuchet MS',system-ui,sans-serif;min-height:40px;padding:0 14px;color:var(--ink);background:#fff;border:3px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink);cursor:pointer}
.m-wait-for-it-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
.m-wait-for-it-btn[disabled],.m-wait-for-it-btn[aria-disabled="true"]{opacity:.6;cursor:default}
.m-wait-for-it-look{background:var(--sky);min-height:44px;border-radius:24px;font-size:.95rem;padding:0 20px}
.m-wait-for-it-cancel{background:var(--coral)}.m-wait-for-it-skip{background:var(--mus)}
.m-wait-for-it-pulsing{animation:m-wait-for-it-glow 1.2s ease-in-out infinite alternate}
.m-wait-for-it-shake{animation:m-wait-for-it-shake .4s}
@media (max-width:480px){.m-wait-for-it-btn{min-height:44px}.m-wait-for-it-body{padding:10px}.m-wait-for-it-caps{height:7em}.m-wait-for-it-mini{width:92px}.m-wait-for-it-tbt{font-size:.72rem}}
.m-wait-for-it-regard{display:flex;align-items:center;gap:6px;font-size:.7rem;font-weight:800}
.m-wait-for-it-gauge{width:70px;height:10px;border:2px solid var(--ink);border-radius:8px;background:#fff;overflow:hidden}
.m-wait-for-it-gauge b{display:block;height:100%;width:0;background:var(--coral);transition:width .3s}
.m-wait-for-it-kids{display:flex;flex-direction:column;gap:6px;align-items:flex-start;padding:8px;border:3px dashed var(--ink);border-radius:12px;background:#f1e8ff}
.m-wait-for-it-sb{position:relative;display:block;height:26px;width:100%;padding:0;border:3px solid var(--ink);border-radius:16px;background:var(--track);overflow:hidden;font:inherit;color:var(--ink);text-align:left}
button.m-wait-for-it-sb{cursor:pointer}
.m-wait-for-it-sb i{position:absolute;left:0;top:0;bottom:0;width:100%;transform-origin:left;transform:scaleX(var(--p,0));background:var(--lil)}
.m-wait-for-it-sl{position:relative;display:block;font-size:.7rem;font-weight:800;line-height:20px;padding:0 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-wait-for-it-kc{width:70%}.m-wait-for-it-kt{width:50%}
.m-wait-for-it-decoy i{background:var(--mint)}
.m-wait-for-it-mini{position:absolute;top:3px;right:8px;z-index:3;width:112px;height:24px;border-width:2px;border-radius:12px}
.m-wait-for-it-mini .m-wait-for-it-sl{font-size:.6rem;line-height:18px;padding:0 6px}
.m-wait-for-it-queue{display:flex;flex-wrap:wrap;gap:4px 6px;align-items:flex-end;padding:6px 10px;background:var(--sky);border:3px solid var(--ink);border-radius:12px;font-size:1.35rem;line-height:1.2;overflow:hidden;transition:transform 2s}
.m-wait-for-it-qc{display:inline-block;animation:m-wait-for-it-bob 2s ease-in-out infinite alternate}
.m-wait-for-it-qc:nth-child(2n){animation-delay:-.7s}.m-wait-for-it-qc:nth-child(3n){animation-delay:-1.3s}
.m-wait-for-it-qhalf{font-size:.9rem;font-weight:900;align-self:center}
.m-wait-for-it-gone{visibility:hidden}
.m-wait-for-it-slide{transform:translateX(10px)}
.m-wait-for-it-red{font-size:1.1rem;background:none;border:0;padding:0 2px;cursor:pointer;min-width:28px;min-height:28px}
@media (pointer:coarse){button.m-wait-for-it-sb{height:40px}button.m-wait-for-it-sb .m-wait-for-it-sl{line-height:34px}.m-wait-for-it-red{min-width:40px;min-height:40px}}
.m-wait-for-it-sv{display:flex;flex-direction:column;gap:2px;font-size:.8rem;font-weight:700}
.m-wait-for-it-svr{display:flex;justify-content:space-between;font-size:.68rem;font-weight:600}
.m-wait-for-it-range{width:100%;accent-color:#7a5bc4;min-height:24px}
.m-wait-for-it-dlg{display:flex;flex-direction:column;gap:8px;padding:10px 12px;background:var(--lil);border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);font-weight:700}
.m-wait-for-it-formb .m-wait-for-it-sl{animation:m-wait-for-it-twitch .5s steps(2) infinite}
.m-wait-for-it-detail{max-height:9.6em;overflow:auto;padding:6px 8px;background:#fff;border:2px solid var(--ink);border-radius:8px;font:.72rem/1.35 ui-monospace,Consolas,monospace}
.m-wait-for-it-lg{padding:1px 0;overflow-wrap:anywhere}.m-wait-for-it-lg b{color:#5a4a3c}
.m-wait-for-it-curtain{position:absolute;inset:0;z-index:6;display:flex;align-items:center;justify-content:center;background:rgba(255,244,220,.94);font-weight:800;font-style:italic;opacity:0;pointer-events:none;transition:opacity .4s}
.m-wait-for-it-curtain.m-wait-for-it-on{opacity:1;pointer-events:auto}
.m-wait-for-it-gold{position:absolute;inset:0;z-index:2;background:linear-gradient(rgba(242,185,59,.35),rgba(255,122,102,.18));opacity:0;pointer-events:none;transition:opacity 3s}
.m-wait-for-it-gold.m-wait-for-it-on{opacity:1}
.m-wait-for-it-body{transition:padding-top .6s}
.m-wait-for-it-party .m-wait-for-it-body{padding-top:30px}
.m-wait-for-it-bunt{position:absolute;top:31px;left:0;right:0;height:16px;z-index:3;opacity:0;pointer-events:none;transition:opacity 2s;background:conic-gradient(from 135deg at 25% 0,var(--coral) 0 90deg,transparent 0) 0 0/48px 16px repeat-x,conic-gradient(from 135deg at 75% 0,var(--mus) 0 90deg,transparent 0) 0 0/48px 16px repeat-x}
.m-wait-for-it-party .m-wait-for-it-bunt{opacity:1}
.m-wait-for-it-balloon{position:absolute;left:50%;bottom:-30px;z-index:3;font-size:28px;pointer-events:none;opacity:0}
.m-wait-for-it-party .m-wait-for-it-balloon{opacity:1;animation:m-wait-for-it-float 9s ease-out forwards}
.m-wait-for-it-frozen .m-wait-for-it-balloon{animation-play-state:paused}
.m-wait-for-it-frozen .m-wait-for-it-bunt{opacity:0;transition:opacity 2s}
.m-wait-for-it-cool{position:absolute;inset:0;z-index:7;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:rgba(255,244,220,.96);font-weight:800;text-align:center;padding:10px}
.m-wait-for-it-wave{width:140px;height:24px;overflow:hidden}.m-wait-for-it-wave svg{width:280px;height:24px;animation:m-wait-for-it-wave 1.4s linear infinite}
.m-wait-for-it-cert{position:absolute;left:50%;top:50%;z-index:8;width:min(86%,260px);transform:translate(-50%,-50%) rotate(-3deg);padding:12px;text-align:center;background:#fffdf0;border:4px double var(--ink);box-shadow:4px 4px 0 var(--ink);font-weight:700;font-size:.78rem}
.m-wait-for-it-cert b{display:block;font-size:.95rem;letter-spacing:.06em;margin-bottom:4px}
.m-wait-for-it-stage{display:flex;align-items:flex-end;justify-content:center;gap:12px;min-height:56px;position:relative;z-index:3}
.m-wait-for-it-trobox{display:flex;align-items:flex-end;gap:6px;opacity:0;transform:translateY(40px);transition:opacity .8s,transform 1.4s}
.m-wait-for-it-rise{opacity:1;transform:none}
.m-wait-for-it-tro{position:relative;display:inline-block;width:36px;height:36px;flex:none}
.m-wait-for-it-tro i{position:absolute;display:block}
.m-wait-for-it-tb1{left:7px;top:0;width:22px;height:17px;border:2px solid var(--ink);border-radius:2px 2px 12px 12px;background:linear-gradient(135deg,#fbe39a,var(--mus) 55%,#c98e1a)}
.m-wait-for-it-th1,.m-wait-for-it-th2{top:3px;width:8px;height:9px;border:2px solid var(--ink)}
.m-wait-for-it-th1{left:0;border-right:0;border-radius:7px 0 0 7px}.m-wait-for-it-th2{right:0;border-left:0;border-radius:0 7px 7px 0}
.m-wait-for-it-ts{left:15px;top:17px;width:6px;height:8px;background:var(--mus);border:2px solid var(--ink);border-top:0;border-bottom:0}
.m-wait-for-it-tp{left:7px;top:25px;width:22px;height:9px;background:var(--ink);border-radius:3px}
.m-wait-for-it-tsp{left:23px;top:3px;width:3px;height:3px;background:#fff;opacity:0;animation:m-wait-for-it-spark 7.5s ease-in-out infinite}
.m-wait-for-it-plq{position:relative;min-width:62px;height:20px;padding:0 6px;display:flex;align-items:center;background:var(--cream);border:2px solid var(--ink);border-radius:4px;font:800 10px ui-monospace,Consolas,monospace;letter-spacing:.06em}
.m-wait-for-it-plq small{position:absolute;right:1px;top:-1px;font-size:5px}
.m-wait-for-it-ger{position:relative;font-size:1.9rem;line-height:1;opacity:0;transform:translateX(140px);transition:transform 1.2s ease-out,opacity .4s}
.m-wait-for-it-ger.m-wait-for-it-on{opacity:1;transform:none}
.m-wait-for-it-ger::before{content:'';position:absolute;left:8px;top:-6px;width:18px;height:9px;background:var(--ink);border-radius:3px 3px 0 0}
.m-wait-for-it-ger::after{content:'';position:absolute;left:4px;bottom:2px;width:26px;height:5px;background:var(--coral);border:1px solid var(--ink);transform:rotate(-8deg)}
.m-wait-for-it-inst{width:100%}
.m-wait-for-it-caps{display:flex;flex-direction:column;justify-content:flex-end;gap:3px;height:10em;overflow:hidden;padding:6px 9px;background:rgba(255,255,255,.7);border:2px solid var(--ink);border-radius:10px;font-size:.78rem;line-height:1.25}
.m-wait-for-it-caps{-webkit-mask-image:linear-gradient(transparent,#000 1.6em);mask-image:linear-gradient(transparent,#000 1.6em)}
.m-wait-for-it-cap{animation:m-wait-for-it-in .3s ease-out}.m-wait-for-it-cap b{font-weight:900}
.m-wait-for-it-foot{margin-top:6px;font-weight:800;font-size:.8rem}
.m-wait-for-it-fine{font-size:10px;color:#5a4a3c}
.m-wait-for-it-rcpt{position:relative;padding:14px 10px;background:#fffef8;border:2px solid var(--ink);font:12px/1.35 ui-monospace,Consolas,monospace;box-shadow:3px 3px 0 var(--ink)}
.m-wait-for-it-rcpt::before,.m-wait-for-it-rcpt::after{content:'';position:absolute;left:-2px;right:-2px;height:8px;background:linear-gradient(135deg,#fffef8 25%,transparent 25%) -4px 0/8px 8px,linear-gradient(225deg,#fffef8 25%,transparent 25%) -4px 0/8px 8px}
.m-wait-for-it-rcpt::before{top:-8px;transform:scaleY(-1)}.m-wait-for-it-rcpt::after{bottom:-8px}
.m-wait-for-it-rh{text-align:center;font-weight:800;letter-spacing:.08em;border-bottom:1px dashed var(--ink);padding-bottom:4px;margin-bottom:6px}
.m-wait-for-it-notes{display:flex;flex-direction:column;gap:7px;overflow:hidden}
.m-wait-for-it-notes:empty::before{content:'No impatience on file. Management is suspicious.';font-style:italic}
.m-wait-for-it-note{animation:m-wait-for-it-feed .25s ease-out;overflow-wrap:anywhere}.m-wait-for-it-note b{display:block}
.m-wait-for-it-ticket{margin-top:10px;padding:6px 8px;text-align:center;border:2px dashed var(--ink);background:var(--mus)}
.m-wait-for-it-ticket b{display:block;font-size:14px}
.m-wait-for-it-print{animation:m-wait-for-it-feed .35s ease-out}
.m-wait-for-it-memo{padding:8px 10px;background:#fff;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink)}
.m-wait-for-it-rib{font-size:.7rem;font-weight:900;letter-spacing:.06em;margin-bottom:5px}
.m-wait-for-it-chips{display:flex;flex-wrap:wrap;gap:5px;min-height:24px}
.m-wait-for-it-chips:empty::before{content:'None filed yet. Management is optimistic.';font-size:.72rem;font-style:italic}
.m-wait-for-it-chip{font-size:.72rem;font-weight:800;padding:2px 9px;border-radius:99px;background:#d9d4cc;border:2px solid var(--ink);animation:m-wait-for-it-drop .5s ease-out}
.m-wait-for-it-shelf{display:flex;flex-wrap:wrap;align-items:flex-end;align-content:flex-start;gap:12px;min-height:64px;padding:8px 10px 0;background:#fff;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);position:relative;padding-bottom:12px}
.m-wait-for-it-shelf::after{content:'';position:absolute;left:0;right:0;bottom:0;height:8px;background:#b98a52;border-top:3px solid var(--ink)}
.m-wait-for-it-shl{width:100%;font-size:.7rem;font-weight:900;letter-spacing:.06em}.m-wait-for-it-slot{display:flex;flex-direction:column;align-items:center;font-size:.6rem;font-weight:800;position:relative;z-index:1}
.m-wait-for-it-sock{position:absolute;top:4px;left:-6%;font-size:20px;opacity:0;pointer-events:none}
.m-wait-for-it-sock.m-wait-for-it-on{animation:m-wait-for-it-sockwalk 9s linear forwards}
.m-wait-for-it-clip{position:absolute;left:-4px;top:-16px;z-index:3;font-size:20px;opacity:0;pointer-events:none;transform:rotate(-12deg)}
.m-wait-for-it-clip.m-wait-for-it-on{animation:m-wait-for-it-fade 9s ease-out forwards}
.m-wait-for-it-still .m-wait-for-it-fill,.m-wait-for-it-still .m-wait-for-it-shim,.m-wait-for-it-still .m-wait-for-it-qc{animation-play-state:paused}
.m-wait-for-it-rev,.m-wait-for-it-pin{margin-top:6px;padding:5px 10px;border:2px dashed var(--ink);border-radius:8px;background:#fff;font-size:.72rem;font-weight:800}
.m-wait-for-it-pin{background:var(--mus)}
@keyframes m-wait-for-it-sockwalk{0%{left:-6%;opacity:0;transform:translateY(0)}6%{opacity:1}20%{transform:translateY(-5px)}35%{transform:translateY(0)}50%{transform:translateY(-5px)}65%{transform:translateY(0)}80%{transform:translateY(-5px)}94%{opacity:1}100%{left:96%;opacity:0;transform:translateY(0)}}
@keyframes m-wait-for-it-stripe{to{background-position:39.6px 0}}
@keyframes m-wait-for-it-shim{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
@keyframes m-wait-for-it-pulse{from{transform:scale(.8)}to{transform:scale(1.3)}}
@keyframes m-wait-for-it-bob{from{transform:translateY(0)}to{transform:translateY(-1px)}}
@keyframes m-wait-for-it-feed{from{transform:translateY(-100%);opacity:0}to{transform:none;opacity:1}}
@keyframes m-wait-for-it-drop{0%{transform:translateY(-34px);opacity:0}60%{transform:translateY(3px);opacity:1}100%{transform:none}}
@keyframes m-wait-for-it-shake{0%,100%{transform:none}25%{transform:translateX(-5px) rotate(-2deg)}75%{transform:translateX(5px) rotate(2deg)}}
@keyframes m-wait-for-it-glow{from{box-shadow:3px 3px 0 var(--ink)}to{box-shadow:3px 3px 0 var(--ink),0 0 0 4px rgba(242,185,59,.7)}}
@keyframes m-wait-for-it-float{from{transform:translate(-50%,0)}to{transform:translate(-50%,-260px)}}
@keyframes m-wait-for-it-drift{0%{left:8%;opacity:0}15%{opacity:.9}85%{opacity:.9}100%{left:80%;opacity:0}}
@keyframes m-wait-for-it-fade{0%{opacity:0}20%{opacity:1}100%{opacity:0}}
@keyframes m-wait-for-it-twitch{from{opacity:1}to{opacity:.55}}
@keyframes m-wait-for-it-wave{to{transform:translateX(-140px)}}
@keyframes m-wait-for-it-spark{0%,92%,100%{opacity:0;transform:scale(.4)}96%{opacity:1;transform:scale(1.6)}}
@keyframes m-wait-for-it-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.m-wait-for-it-wrap *,.m-wait-for-it-wrap *::before,.m-wait-for-it-wrap *::after{animation:none!important;transition:none!important}}
.pm-reduce-motion .m-wait-for-it-wrap *,.pm-reduce-motion .m-wait-for-it-wrap *::before,.pm-reduce-motion .m-wait-for-it-wrap *::after{animation:none!important;transition:none!important}
@media (prefers-reduced-motion:reduce){.m-wait-for-it-puff.m-wait-for-it-on,.m-wait-for-it-bread.m-wait-for-it-on,.m-wait-for-it-sock.m-wait-for-it-on,.m-wait-for-it-clip.m-wait-for-it-on{opacity:1!important}.m-wait-for-it-puff{left:80%}.m-wait-for-it-sock{left:45%}.m-wait-for-it-party .m-wait-for-it-balloon{bottom:auto;top:52px}.m-wait-for-it-shim{display:none}}
.pm-reduce-motion .m-wait-for-it-puff.m-wait-for-it-on,.pm-reduce-motion .m-wait-for-it-bread.m-wait-for-it-on,.pm-reduce-motion .m-wait-for-it-sock.m-wait-for-it-on,.pm-reduce-motion .m-wait-for-it-clip.m-wait-for-it-on{opacity:1!important}
.pm-reduce-motion .m-wait-for-it-puff{left:80%}.pm-reduce-motion .m-wait-for-it-sock{left:45%}.pm-reduce-motion .m-wait-for-it-party .m-wait-for-it-balloon{bottom:auto;top:52px}.pm-reduce-motion .m-wait-for-it-shim{display:none}
`, 'css-wait-for-it');

  P.addAchievements([
    { id: 'wait-for-it.minute', name: 'Grand Magister of the First Minute', desc: 'Wait 60 seconds without clicking the bar. Management has framed your 60 seconds. The frame is empty. The seconds are in a drawer.', icon: '🕰️', reward: 1 },
    { id: 'wait-for-it.rewinds', name: 'Honorary Fellow of the Rewind Society (Retroactive)', desc: 'Be rewound 5 times. Each rewind has a notice. Each notice is slightly more formal than the one before it, and one is half a notice.', icon: '⏪', reward: 2,
      check: function (s) { return (s['wait-for-it.rewinds'] || 0) >= 5; } },
    { id: 'wait-for-it.dark', name: 'Archduke of Progress Made in the Dark', desc: 'Take your cursor out of the window (or switch tabs) for 20 seconds and come back to find the bar has advanced. It wishes to be thanked and also not mentioned.', icon: '🌙', reward: 2 },
    { id: 'wait-for-it.cancel', name: 'Sworn Officer of the Cancellation Committee (Keep Waiting)', desc: 'Cancel waiting all the way through Form 27B/6. Waiting was rescheduled. You were thanked.', icon: '📋', reward: 1 },
    { id: 'wait-for-it.trophy', name: 'Supreme Laureate of the Small Trophy', desc: 'Reach 100 percent and receive the Trophy. It is small and perfectly sincere. It is, at this time, installing.', icon: '🏆', reward: 10 },
    { id: 'wait-for-it.party', name: 'Lord Chamberlain of the Unattended Party', desc: 'Do nothing for 180 seconds and attend the bar\'s tiny party. There is one balloon. It is a good balloon.', icon: '🎈', secret: true, reward: 5 },
    { id: 'wait-for-it.witness', name: 'Sole Witness of the 37.5', desc: 'Watch an entire 7.5 second stall at 37.5 percent without clicking. The bar gave you ticket 7 1/2. It is for nothing and is numbered.', icon: '🎟️', secret: true, reward: 7.5 },
    { id: 'wait-for-it.cascade', name: 'Framed Recipient of the Certificate of Impatience', desc: 'Click the bar 15 times in 3 seconds. The bar rewound, you were cooled off for 7 1/2 seconds, and Management apologised, mostly to itself.', icon: '🧾', secret: true, reward: 1 },
    { id: 'wait-for-it.hand', name: 'Founding Holder of the Bar\'s Hand', desc: 'Press and hold the bar for 30 seconds. The bar said one true thing. It is not entered in the notices.', icon: '✋', secret: true, reward: 3 },
    { id: 'wait-for-it.toast', name: 'Witness of the Toast', desc: 'Be present when the bar asked if you smelled something. It was the toast. It is always the toast.', icon: '🍞', secret: true, reward: 2 },
    { id: 'wait-for-it.tenmin', name: 'Chancellor Emeritus of Having Simply Been Here (Ten Minutes, Unbroken)', desc: 'Remain at the bar for ten minutes. A pin was presented. It is shaped like a 10 that has been sat on. It has been put somewhere you cannot reach.', icon: '🏅', secret: true, reward: 10 }
  ]);

  /* ---------- every spoken line: KEY: "Speaker | text" (square-bracket tokens are filled by say()) ---------- */
  const RAW = {
    A1: "Management | Please wait. The wait has been scheduled for you personally. It is not a rush job.",
    A2: "Management | Estimated time remaining: about 2 minutes. The estimate was supplied by someone who has not met the bar, in good faith, from a different building.",
    A3: "Management | Your wait has been reissued. The bar is shorter. The wait is not. These are separate departments.",
    A4: "Management | The bar is already at 1 percent. This is not progress. It is a head start, and head starts are not discussed.",
    A5: "Management | This is the entire game. A bar will load. Your job is to be somewhere nearby while it does.",
    A6: "Management | Nothing has happened yet. Management considers this a good start and would like it noted.",
    A7: "Management | No input detected. The bar is moving on its own, at [pct] percent. It has asked not to be congratulated and is being congratulated quietly.",
    A8: "Management | You have touched nothing for 45 seconds. This is either the strategy or a nap. Both are fully supported.",
    RW1: "Management | Rewinding. The bar is walking backwards, politely, so as not to turn its back on you.",
    RW2: "Management | The bar has gone back [lost] percent to think about what it did. It did nothing. It is thinking anyway.",
    RW3: "Management | Lost percent: [name] ([lost]). [name] will be missed. A chip has been placed in the memorial strip.",
    RWC: "Management | The last two lines have been rewound as well, by association. You are the only one who heard them.",
    RW4: "Management | The memorial strip now holds [count] percents. Gordon is always listed as 'missed in the 40s', regardless.",
    SH: "Management | The bar has reached a Safe Harbour. It will go back no further. Sandra has put a small chair there.",
    S1: "Management | A note on the bar: it loads faster when nobody is looking. Management will now leave the room. Management is still here.",
    S2: "Bar | I can feel you looking. It is fine. It is just that I am a bar and this is how I load.",
    S3: "Management | Your cursor has been on the bar for 8 seconds. The bar has slowed to a modest crawl, like a person being photographed eating.",
    S4: "Management | You looked away and the bar did [gain] percent in a rush. It would like you to believe it was always going to.",
    S5: "Management | Welcome back. In your absence the bar made [gain] percent of progress. It wishes to be known as 'self-motivated'.",
    S6: "Bar | Please go and do something else. I will be done by the time you come back, or I will not.",
    S7: "Management | The Regard gauge measures how much the bar feels looked at. It is cosmetic. The bar says it is not.",
    S8: "Management | The bar is faster when you look away. Management has asked it why, three times. The bar talked about the weather.",
    LA1: "Management | You have looked away on purpose. This is the nicest thing anyone has done for the bar this week.",
    LA2: "Management | You are looking away. Please continue not looking. A curtain has been provided.",
    LA3: "Bar | You are back. I was not doing anything. I was only doing a lot.",
    AB1: "Management | The cursor has left the building. The bar is not saying anything. The bar is saving it up.",
    AB2: "Management | The cursor is still outside. The bar has stopped pretending it is not listening for it.",
    ABL: "Management | You were gone [secs] seconds. The bar kept your place. Your place is exactly as you left it. It has been kept extremely well.",
    PI: "Management | The bar feels bad about the delay and has decided to hurry. It will deny this in writing.",
    T1: "Management | The bar is going backwards for a moment. This is called tidying. It will be back.",
    T2: "Bar | I just remembered I left something at 41 percent. Please do not follow me.",
    T3: "Management | The bar has gone back to check on something. It does not say what. It was the stove.",
    T4: "Management | Tidying complete. The bar is 3 percent tidier and, it says, 3 percent less itself.",
    T4s: "Management | You stayed away through the tidying. The bar did not have to be brave. Serenity bonus: 0.5 Meh.",
    ST0: "Bar | 37.5 percent. I need a moment. It is not a long moment. It is a precise one.",
    ST1: "Management | The bar has stalled at 37.5 percent, as scheduled. The stall is on the calendar. Your attendance is optional.",
    RS1: "Management | Reason for stall: the signature is in a meeting about signatures.",
    RS2: "Management | Reason for stall: Sandra is reviewing the percentage. Sandra says 37.5 'looks fine, but not in a way I can sign'.",
    RS3: "Management | Reason for stall: a very small fire drill, inside the bar. Everyone has left the bar. Everyone is back.",
    RS4: "Management | Reason for stall: 37 has finished and 38 has not started. They are both on break.",
    RS5: "Management | Reason for stall: Dennis (Plant) was asked to look at the bar and has declined, politely, by being a plant.",
    RS6: "Management | Reason for stall: a decimal is being carried across the room by two people who have not met.",
    RS7: "Management | Reason for stall: someone has set a cup down on 37.5. The bar will not move until the cup is claimed. Three people have said it is not theirs, in the voice of someone it is.",
    RS8: "Management | Reason for stall: an intern, who is the bar, has been asked to approve itself.",
    RS9: "Management | Reason for stall: 37.5 is a scenic point. Visitors are asked to pause and read the plaque. There is no plaque.",
    RS10: "Management | Reason for stall: the next number took a different road and has texted that it is 'nearly there'. It has no phone.",
    RSD: "Management | Reason for stall: Dennis (Plant) was asked to sign. Dennis (Plant) signed. It was a leaf. It was accepted.",
    SNR: "Management | The window is not responding. Not responding is a form of responding. It has said so.",
    ST2: "Management | The bar has stalled at 37.5 percent again, in a different file. Please do not ask which file. The file does not know either.",
    STS: "Management | The stall is sleeping through its own reason. It will be along. It has been told.",
    WI: "Bar | You watched the whole stall. Nobody has ever done that. Please accept this ticket. It is for nothing and numbered 7 1/2.",
    WIL: "Log | Stall ticket 7 1/2 issued to [player]. Admit one. Valid for nothing.",
    DT1: "Management | Details is open. The bar can see that you are reading about it. It is flattered, and slower.",
    C1: "Management | Cancel is now available. Cancel will ask if you are sure. Cancel has a lot of questions.",
    C2: "Dialog | Are you sure you want to cancel waiting?",
    C3: "Dialog | Cancelling waiting requires Form 27B/6. Please wait while Form 27B/6 loads.",
    C3b: "Dialog | Form 27B/6 is 0.0 percent loaded. It has been 0.0 percent loaded since 1998. It is consistent.",
    C4: "Management | Waiting has not been cancelled. It has been rescheduled for now.",
    C4s: "Management | Waiting has not been cancelled. It has been rescheduled for now. The Stapler wishes it recorded that it was not consulted.",
    C5: "Management | You have cancelled again. Waiting has been rescheduled for slightly later now.",
    C6: "Management | Waiting has been cancelled so many times it has become a hobby. The hobby is also waiting.",
    B1: "Management | The wait is running in the background. It has been moved to a smaller bar in the corner. It is the same bar, but braver.",
    B2: "Management | You are now waiting in two places. This is not recommended and is, as of today, a policy.",
    B3: "Management | The second bar advances in lockstep with the first. Only one of them counts. Management will not say which, for morale.",
    B4: "Bar | The decoy is doing very well. Please do not tell it about the word 'decoy'. It thinks it is a second bar.",
    B5: "Management | Bringing the decoy to the front is not available. The decoy has a good job where it is.",
    D0: "Management | The bar has been moved to 50 percent for the dependency. It was not asked.",
    D1:"Management | The bar is waiting for another bar. The other bar is waiting for this bar. They have agreed to be patient with each other.",
    D2: "Bar | I cannot start until the one below me finishes. The one below me cannot start until I finish. We are very close.",
    D3: "Management | A third bar has appeared. It is waiting for the parent. It does not know why. It was told it would find out.",
    D4: "Management | The bars have agreed to be patient with each other. Both have jumped 7 1/2 percent. This is called synergy and it is not repeatable.",
    D5: "Management | You have restarted the child bar. Only the child. The parent did not feel it, but it noticed the draught.",
    D6: "Child Bar | I was at 80. I am at 0. I would say it was fine, but I am a child bar and I am not allowed to say that.",
    D7: "Management | The child bar has been restarted [count] times. It now has the posture of someone told to start again by a series of kind people.",
    D8: "Child Bar | Nobody asked the third bar how it is doing. It is not doing great. It is at 0 and it has not even moved.",
    D9: "Management | The third bar has asked the child how it is doing. The child has asked the parent. The parent is looking at the ceiling.",
    D10: "Management | The parent bar is at 50 percent and holding. It is holding the way a person holds a very full cup.",
    D11: "Bar | We are all doing very well and nobody is moving. It is like a family.",
    Q1: "Management | You are number 7 in line to wait. Please do not wait ahead of your turn.",
    Q2a: "Gerald | Ah, [player]. We have met. I have been waiting longer than last time.",
    Q2b: "Gerald | I am Gerald, Vice President of Spuds. I am number 5. It is a good number to be near.",
    Q2c: "Gerald | A potato is simply a patient chip. I have been waiting since the harvest. It is going well.",
    Q3: "Management | Gary is in the queue, exactly 1 position ahead of you. Gary is not able to explain this.",
    Q3b: "Management | Gary says it is a contract. Gary has not said which contract.",
    Q4: "Management | You are now number 7 1/2 in line. Someone has cut in at the half. We asked them to leave. They are a fraction.",
    Q5: "Management | Something small and red has joined the back of the queue. It has been asked not to be pressed. It has agreed, with a sigh.",
    Q5b: "The Button | Also do not press. I have been pressed [count] times and it is a lot, for a button.",
    Q5c: "The Button | Also do not press.",
    Q6: "Management | The queue has advanced one place. It then regretted it and went back.",
    Q7: "Management | The queue advances only while nobody fidgets. Please sit like a person with nothing in their pockets.",
    Q8: "Management | Fidgeting detected. The queue has moved back one place to give you room.",
    Q9: "Management | Gary has been asked why he is exactly 1 position ahead of you. He went slightly further ahead and then came back.",
    Q10: "Management | The sock in the queue has not moved. It is presumed on a journey. The journey is the queue.",
    TA: "Management | Please take a number. Your number is 7 1/2. We ran out of whole numbers on Tuesday.",
    TB: "Management | You have taken another number. It is 7 1/2 as well. Numbers are a very small club here.",
    U1: "Management | Progress is now measured in elevenths. You are [x] elevenths of the way there. Eleven was the number we had.",
    U2: "Management | The bar is now at [x] Tuesdays. We are not saying a Tuesday of what.",
    U3: "Management | Percent has been retired after long service. The bar is now measured in enough. It is [pct] percent enough.",
    U4: "Survey | How long have you been waiting? Please answer from 'a bit' to 'since the harvest'. Thank you. Your answer has been waited on.",
    U5: "Management | Your survey answer has been placed in the queue for answers. You are 7 1/2 in that queue. Answers rarely arrive.",
    U6: "Management | Skip is available. Skip is not available in your region. Your region has been informed.",
    U7: "Management | Percent is back from leave. It sends its best and says nothing happened.",
    U8: "Management | An eleventh is a perfectly good portion of something. Management is looking for the something.",
    U9: "Management | Tuesday has been seen at the edge of the bar. It is only counting. Please do not make eye contact with the counting.",
    U10: "Management | 'Enough' is a unit now. Nobody has agreed how much it is. Everyone agrees this is about right.",
    V1: "Bar | I am nervous when you watch me. I did not want to say that. I just did. It is out.",
    V2: "Management | The bar has asked to be left alone for exactly 20 seconds. Dennis (Plant) is available to look at instead. He does not mind.",
    V3: "Bar | Thank you for looking away. I did not do anything. I am saying that, but I did a little.",
    V4: "Management | Staff were retrained this morning to say 'shy' instead of 'slow'. The bar has noticed and is, if anything, slower.",
    V5: "Management | The bar has surged [gain] percent while unobserved. It is thanking you in a way that does not involve being seen.",
    V6: "Bar | It is getting warm in here. That is not the bar. That is the time of day we have decided it is.",
    V7: "Management | That lasted four sentences. Normal service has resumed. Nothing happened. It was very good.",
    X1: "Management | The bar is at 99 percent. It will be at 99.9 percent shortly. Then 99.99. We have run out of nines and ordered more.",
    X2: "Management | Each new nine takes twice as long as the last. This is a rule. Nobody here made it.",
    X3: "Bar | I am so close. I am always so close. This is the nicest I have ever been to anything.",
    X4: "Management | Impatience at this stage costs you the nines but not the 99. It is mild and it is devastating. Please sit.",
    X5: "Management | The decimal point has requested a chair.",
    X6: "Management | For one frame the readout said 37.5. It was just checking. It is fine.",
    X7: "Management | It is too close for this. Please put the mouse down and think about something far away.",
    E1: "Management | Your wait is complete. Please remain seated. A small trophy is on its way. It is sincere.",
    E2: "Gerald | To wait is to be a potato in time. Eventually you are mashed into destiny. Well done. Hold the trophy.",
    E3: "Management | You waited. That is the whole accomplishment. Thank you for it.",
    E4: "Management | The trophy is small. It is real. Management is proud and has stepped out to be proud somewhere private.",
    E6: "Management | Installing trophy. 0 percent. Please wait.",
    E6b: "Management | Installation has stalled at 37.5 percent. It will finish in Season 2. Please proceed to Season 2.",
    E7: "Management | The Lost Percents have been invited to the ceremony. They are late. They are all 0.3.",
    E8: "Management | Welcome to Season [season]. Everything is the same, but shorter, and the wait is not.",
    E10: "Management | Gary is exactly 1 position ahead of the trophy. Gary did not wait for it. Gary is just there.",
    E11: "Management | The trophy has been given a sibling. The sibling is also sincere.",
    E12: "Management | Your Impatience Notices continue at No. 13. Numbers have not stopped.",
    E13: "Management | The plaque has a tiny 37.5 in the corner. We have been asked not to explain it. We were not going to.",
    E14: "Management | Step [season] of 1,204. The bar has been told you are good at this.",
    CE: "Management | Not now. The trophy is being sincere.",
    Z1: "Management | Rapid impatience detected. The bar is being rewound faster than we are equipped to supervise.",
    Z2: "Management | A Cooling-Off Wait of 7 1/2 seconds has begun. It will not be spent. It will only be waited.",
    Z3: "Management | A Certificate of Impatience has been issued. It is framed. It is also an apology, from us, to you.",
    Z5: "Management | Cooling-Off Wait in progress. All clicks are absorbed. The bar thanks you for them. It kept none.",
    Z6: "Management | The bar has been restored to roughly where it was, minus 7 1/2. The 7 1/2 went to the Cooling-Off Wait, which was hungry.",
    I30: "Management | 30 seconds without input. This has been entered in the ledger under Nothing, Admirable.",
    I60: "Management | You have not moved for 60 seconds. The bar has noticed. It is trying not to make it weird.",
    I120: "Management | 120 seconds of stillness. Progress made while nobody looked: [gain] percent. The bar would like this to stay between us.",
    I180: "Management | Nobody is watching. The bar is throwing a very small party. There is one balloon. It is a good balloon.",
    PA1: "Management | The bunting was put up by no one. It is very well put up.",
    PA2: "Bar | Nothing was happening. Please disregard the balloon.",
    F1: "Management | A key was pressed. The bar has not been asked to take dictation. It is writing everything down.",
    F2: "Management | Fidgeting detected. The bar can hear the drumming. It calls it 'a good rhythm for something that is not progress'.",
    F10: "Management | That is 10 fidgets. The bar has begun to hum along. It is in a different key.",
    F25: "Management | 25 fidgets. Management has written 'restless' on a very small card and put it in a drawer.",
    W1: "Management | You typed 'faster'. The bar has slowed down to be safe. That is what faster means here.",
    W2: "Bar | You typed 'patience'. The bar says show it, do not type it. Then it says, actually, typing is fine.",
    W3: "Management | Sandra from Compliance has been told you typed her name. Sandra says she is 'not here, but flattered'.",
    W4: "Management | You typed 'tuesday'. It is not here yet. It has been seen near the horizon. Please remain calm.",
    W5: "Bar | Thank you for saying please. Nobody says please to a bar. The bar will remember. The bar remembers nothing. It will remember this.",
    H2: "Management | You are sitting with the bar. This was in a brochure, in the section for hypothetical customers.",
    H15: "Management | 15 seconds. The bar has gone very still, in the way of a person being measured for a coat.",
    H22: "Bar | I am trying very hard to be only a bar. It is not working. I am a bar with feelings now.",
    H75: "Management | 7 1/2 seconds. The bar is thanking you for the company. It is not refundable.",
    H30: "Bar | Nobody has ever held me. I thought I was only meant to be looked at.",
    HR: "Management | You have let go. The bar is fine. The bar is not fine. The bar will tell no one.",
    TO1: "Bar | Do you smell something?",
    TO2: "Bar | It was the toast.",
    TO2t: "Bar | It was the toast. The Toaster has been informed. The Toaster said nothing, in toast.",
    CZ: "Bar | The window is narrow. I am choosing to feel held.",
    KB: "Management | Keyboard. Considerate. The bar notes you have not clicked. The bar notes everything.",
    WH60: "Bar | One minute. Nobody has looked at me for a whole minute. I think I like it. I also think I would like you to stop.",
    WH120: "Management | Two minutes of continuous regard. The bar has asked for a day off. It did not say which. It has gone to look for one.",
    SO1: "Bar | Did something just walk past me? It had a purpose. I have never had one of those.",
    SO2: "Management | The Missing Sock has been sighted at [pct] percent, heading right with confidence. It did not stop for the stall. It has places.",
    SO2b: "Management | The Missing Sock has been sighted again, at [pct] percent. Management has stopped saying 'missing' and now says 'ahead of schedule'.",
    AU1: "Bar | Everyone act normal. Sandra is here.",
    AU2: "Management | Sandra from Compliance is in the building. Nobody has seen her. Everyone is acting normal. It is the most normal the bar has ever looked.",
    AU3: "Management | Audit result: the bar is compliant. Sandra has left a sticky note on the percentage. It says 'fine'. It is not signed. It is initialled with a sigh.",
    AU3s: "Management | Audit result: compliant. The Stapler has asked to be present for the audit, retroactively. The Stapler has demands, and the first is a chair.",
    RV1: "Management | It is the 3 minute mark. By policy the bar is due a performance review. The bar is in the room. The bar is the room.",
    RV2: "Management | Sandra from Compliance is conducting the review by absence. She has left a score in an envelope marked 'not yet'.",
    RV3: "Bar | Please say something nice. It does not need to be true. It needs to be about 3 minutes long.",
    RV4: "Management | Review outcome: Meets Expectations (Barely Looked). A raise of 0.1 Meh has been approved. It is in an envelope. The envelope is the raise.",
    TM1: "Management | Ten minutes. This is the longest anyone has stayed in this window without being asked to. We do not know what to do. A pin is being found.",
    TM2: "Management | Long Service Award presented. It is a pin shaped like a 10 that has been sat on. It has been put on the shelf, where you cannot reach it.",
    TM3: "Bar | I have loaded for ten minutes and I think I am a different bar. I checked. I am the same bar. It was a good ten minutes."
  };
  const LOW = { RW1: 1, RW2: 1, RW3: 1, RW4: 1, F1: 1, F2: 1, F10: 1, F25: 1, Q6: 1, Q7: 1, TA: 1, TB: 1, S3: 1, W1: 1, W2: 1, W3: 1, W4: 1, C3b: 1, D9: 1, D10: 1, D11: 1, U8: 1, U9: 1, U10: 1, Q9: 1, Q10: 1, A7: 1 };
  /* repeating material lives in pools (shuffle bags): idle, spam, rewinds, hovering, fidgets, button abuse, and a filler per beat */
  function pool(prefix, arr, low) { return arr.map(function (s, i) { const k = prefix + (i + 1); RAW[k] = s; if (low) LOW[k] = 1; return k; }); }
  const P_IL = pool('IL', [
    "Management | Four minutes of nothing. A plaque is being drafted. It currently reads 'Here.' Legal has asked that it also say 'Probably.'",
    "Bar | You have not moved in 5 minutes. I have filed a report. It says you are fine and that I am worried. Both are in the report.",
    "Management | Management has checked the lobby for you. The lobby says you are in a module. The module says you are in the lobby. Dennis (Plant) said nothing, which was the most accurate answer.",
    "Management | Seven minutes. Management has begun to say 'they' about you in meetings. 'They are still there. They have not blinked. We assume.'",
    "Bar | I have counted my stripes. There are 11. I thought you should know. There is nobody else to tell, and you are very still.",
    "Management | Nine minutes of stillness. A candle has been lit in the break room. It is an electric candle. The intention is real."
  ]);
  RAW.ISN = "Management | Management will now read its prepared statement on nothing, which it has been saving. '[line]' Thank you.";
  RAW.ISI = "Management | The bar has asked for something to listen to. Management recited a remark from the lobby: '[line]' The bar said thank you and meant a little of it.";
  const IL_T = [[240, P_IL[0]], [270, 'ISN', 'nothing'], [300, P_IL[1]], [360, P_IL[2]], [420, P_IL[3]], [450, 'ISI', 'idle'], [480, P_IL[4]], [540, P_IL[5]]];
  const P_IM = pool('IM', [
    "Management | You are still here. Management is now unsure who is waiting for whom. It has stopped keeping score. It keeps the pencil.",
    "Bar | I think we are friends. Neither of us has said so. That is how I know.",
    "Management | The seat you are sitting in is legally yours, provided you are not sitting in it. Sandra will explain, later, to someone else.",
    "Management | Stillness has been your department for some time. A name plate has been ordered. It is blank, in case you move.",
    "Bar | I have started to hum. Please do not look. It is a song about 37.5.",
    "Management | The ceiling has been checked on your behalf. It is still there. It was not asked."
  ]);
  const P_MU = pool('MU', [
    "Bar | (humming, but only the numbers)",
    "Bar | I am not doing anything. I am being very quiet about it.",
    "Bar | Is it a good time to say I am nervous about the ending? No? I will wait.",
    "Bar | I counted to 37.5 in my head. It took the same time as outside my head. Disappointing.",
    "Bar | If you leave, I will pretend you did not leave. I do this already with the others.",
    "Bar | I am tidying the percent sign. It is not on fire. I just wanted to be near it.",
    "Bar | (rearranging the stripes, one at a time, to look busy)",
    "Bar | I rehearsed what to say when I reach 100. It is 'oh'.",
    "Bar | Somebody should check on the Missing Sock. It had a plan.",
    "Bar | I can hear the clock. It is wrong with confidence. I find that comforting.",
    "Bar | (a very small sigh, in the shape of a bar)",
    "Bar | If anyone asks, I was at [pct] percent the whole time."
  ], true);
  const P_WP = pool('WP', [
    "Bar | I can feel the cursor. It is warm. I would like it somewhere else, with love.",
    "Bar | When you look at me I forget which stripe I was on. I go back to the first one. It is a good stripe.",
    "Management | Regard is high. The bar has produced one bead of sweat. It has only the one and is rationing it.",
    "Bar | Hello. I am loading. I am also being looked at. Both are going slowly.",
    "Bar | I will tell you when it is done. I will not tell you if it is not.",
    "Management | The cursor has not moved for a while. Management has given it a name. The name is Cursor. It did not react.",
    "Bar | You have the look of someone about to check. Please do not check. I have been checked.",
    "Management | A bar watched by someone with nothing else to do loads at the speed of that person's nothing.",
    "Bar | I am trying to load and be natural. I am doing neither."
  ], true);
  const P_RW = ['RW1', 'RW2'].concat(pool('RWP', [
    "Management | Rewound. The bar went back so politely that three people apologised.",
    "Management | A rewind is a regret with a progress bar on it.",
    "Management | The bar has been rewound [lost] percent. It is now ranked among the top eleven things to happen to the bar today.",
    "Management | The bar has gone back [lost] percent. It would like to be clear that it knew where it was going.",
    "Management | You have rewound the bar. It has gone to stand where you cannot see it. It can see you.",
    "Management | Going backwards is a form of progress if you look at it from the other end. Nobody has looked at it from the other end.",
    "Management | The stripes have reversed. The stripes did not want to. The stripes will not be taking questions.",
    "Bar | I was at [x] and I was fine. I was there. That is what I would like on the record.",
    "Bar | It is okay. I have gone back before. I go back every time somebody blinks.",
    "Management | Rewinding at a rate of [lost] percent. This is within the tolerance of a bar that has been rewound.",
    "Management | The tape has been wound back. There is no tape. The sound is coming from a drawer.",
    "Management | Your impatience has been processed and returned. It is the same impatience. It has a receipt now."
  ], true));
  const P_MEM = ['RW3', 'RW4'].concat(pool('MEM', [
    "Management | [name] ([lost]) has been filed under 'Recently Missed'. [name] had a good run. It was [lost] percent long.",
    "Management | A chip for [name] has been set down gently. [name] was not consulted about the font, which is small.",
    "Management | The memorial strip now holds [count] percents. There is a chair for each. The chairs are the same chair.",
    "Management | [name] was lost in the rewind. [name] was last seen near [x] percent, holding a very small umbrella.",
    "Management | In memoriam: [name]. Loved by the bar. Mildly resented by the next percent in line."
  ], true));
  const P_SH = ['SH'].concat(pool('SHP', [
    "Management | You have clicked a Safe Harbour. It is nothing. It is a flat part of the bar with a small chair.",
    "Management | The bar cannot go back any further without becoming the previous bar. Sandra has asked that this not happen.",
    "Management | Nothing was lost. Please enjoy this unusual feeling of being clicked at, and nothing happening."
  ], true));
  const P_ZP = pool('ZP', [
    "Management | Four clicks in under 3 seconds. The bar has noticed the tempo and would like to know if it is a song.",
    "Bar | I am going back and forth so fast I have become a rumour.",
    "Management | Twelve. The bar is not hurt. The bar is dizzy, which the brochure lists under 'hurt'.",
    "Management | Fourteen. Please consider whether fifteen is something you wish to be known for."
  ]);
  const ZP_N = [4, 8, 12, 14];
  const P_ZR = pool('ZR', [
    "Management | A second Certificate of Impatience. It has been laminated over the first. The first is still in there, quietly.",
    "Management | Certificate No. 3 has been stapled to the others. The Stapler has asked to be told it was not consulted.",
    "Management | Certificates of Impatience on file: [count]. They have been bound into a book. The book is called 'Understandable'.",
    "Management | The Cooling-Off Wait has been cancelled for staffing reasons and replaced by a longer one. Please remain seated."
  ]);
  const COOLT = [
    'Your call is important to us in a way we cannot articulate.',
    'You are caller number 7 1/2. Your position in the queue is the queue.',
    'Please hold. Holding is also a form of clicking, but slower, and with dignity.',
    'Our hold music has been replaced by the sound of someone thinking about hold music.',
    'All of our representatives are busy being the bar.'
  ];
  const P_FB = pool('FB', [
    "Management | Fidget [count] logged. Your hands have been described to the bar as 'busy'.",
    "Management | The keyboard is receiving a lot of attention it did not apply for.",
    "Management | Typing has no effect on the bar. The bar finds the sound of it companionable.",
    "Management | Key number [count] has been pressed. It will be placed with the others, in a small dish.",
    "Management | The bar has been told that keys are not progress. It is asking whether it can have a few for itself.",
    "Management | If you are trying to type a word, there are 5 of them. The bar will not say which. One of them is polite."
  ], true);
  const P_SK = pool('SK', [
    "Management | Skip has been pressed again. Skip is still not available in your region. Your region has been moved, in case that helps.",
    "Management | Skip is now available in the region next to yours. Your region has been asked to lean.",
    "Management | The Skip button has been taken off the wall and examined. It was never connected to anything. It was a very good button.",
    "Management | Skip has been refused [count] times. This is a record for Skip. Skip is taking a few days.",
    "Management | Skip has been pressed [count] times. Each press was received personally, by someone who is no longer here.",
    "Management | Skip remains unavailable. Management would like to skip this too.",
    "Management | Skip says it understands. It has been in your position, which is a button."
  ]);
  const P_DS = pool('DS', [
    "Management | Details has been opened and closed 6 times in 6 seconds. Details is not a door.",
    "Management | The Details panel is exhausted. It has asked to be left open or closed, but not both, ever again.",
    "Bar | Please stop opening me up. I have a lot going on in there and it is none of your business."
  ]);
  const P_LX = pool('LX', [
    "Management | You are already looking away. Looking away has a maximum, and it is exactly the thing you are doing.",
    "Management | The curtain cannot be made more closed. It has been closed to a standard Management is proud of.",
    "Bar | I am hiding behind the curtain too. Please do not look behind the curtain."
  ]);
  const P_TC = pool('TC', [
    "Management | You now hold [count] tickets, all 7 1/2. Nobody has ever collected a set of one.",
    "Management | The ticket machine is running low on halves. Please take a different fraction. We have a third and it is not good.",
    "Management | Your tickets have been stapled together by the Stapler, who says it is a union matter. They now read 7 1/2 times [count].",
    "Management | The number 7 1/2 is feeling busy. It has asked to be used less. It has been used [count] times."
  ], true);
  const P_RB = pool('RB', [
    "The Button | Also do not press. I have started leaving the room when I hear you coming. I am a button. I do not have a room.",
    "The Button | Please stop. I have been pressed so much I have developed a stance.",
    "Management | The small red thing has asked to be moved to the back of the queue. It is already at the back. It has asked to be moved further back.",
    "The Button | I feel like a guest at a party that is also my body.",
    "Management | Pressing the small red thing is not impatience, a favour or a recommendation. It is a thing a hand did."
  ], true);
  const P_CX = pool('CX', [
    "Management | That is [count] cancellations. Cancel is beginning to recognise your handwriting.",
    "Management | Form 27B/6 has been received [count] times. It has been filed under Received and, for fun, under Pending.",
    "Management | Waiting has been cancelled and rescheduled [count] times. It is now the busiest thing in the building and it is not doing anything.",
    "Management | Cancel is not for cancelling. Cancel is for being pressed. Nobody has been told this because it would hurt Cancel."
  ]);
  const P_S5 = ['S5'].concat(pool('S5', [
    "Management | You are back. The bar did [gain] percent without you. It did not make a sandwich. Please note the discipline.",
    "Bar | I did [gain] percent. Nobody saw. It was the best I have ever done. I would like it on a mug.",
    "Management | Welcome back. Your seat was held with a coat. The bar made [gain] percent in the meantime and has put the coat on.",
    "Management | Presence restored. The bar advanced [gain] percent in your absence and has been asked to do it in your presence. It has gone quiet."
  ]));
  /* one filler per beat: if nothing has been said for ~22 seconds, the next one lands */
  const BEATP = [null,
    pool('BPA', [
      "Management | The bar is at [pct] percent. This is up from earlier, which was lower. Management is tracking the difference.",
      "Management | If you are wondering whether it is loading, it is. If you are wondering what it is loading, so is the bar.",
      "Management | Please do not refresh. There is nothing to refresh. It is the principle.",
      "Management | The bar has been described by a colleague as 'confident, for a bar'. The colleague has since moved to a different bar."
    ], true),
    pool('BPB', [
      "Bar | If you move your cursor away, I will pretend I did not notice you move it. This is called manners.",
      "Management | Early research suggests the bar is faster at night. The research was done at night, by the bar, and has not been reviewed by anyone awake.",
      "Management | Moving the mouse to the margin is a recognised form of looking away. So is closing one eye. So is closing the other.",
      "Bar | I am not slow. I am under observation."
    ], true),
    pool('BPC', [
      "Management | The Details panel contains 14 sprockets, 7 of them 1/2. Please do not count them. They notice.",
      "Management | At 37.5 percent the bar will pause. The pause was entered into freely, and with a sigh.",
      "Bar | Everything is on schedule. The schedule is a drawing of a schedule.",
      "Management | A rumour has reached the bar that 37.5 is the new 50. The bar has not confirmed it, and neither has 50."
    ], true),
    pool('BPD', [
      "Management | Cancel is available and will not work. It is very proud of that. It has put it on its CV.",
      "Bar | I am going to go back and check the stove. Do not worry. I do not have a stove. I will check where it would be.",
      "Management | Waiting is going well. The bar has been waiting since the beginning, which was a while ago, at 1 percent.",
      "Management | Run in background has been approved by Sandra on the condition that it does not run, and is not in the background."
    ], true),
    pool('BPE', [
      "Management | The bars are waiting for each other with the discipline of two people who both said 'after you'.",
      "Bar | I am at 50 and I will stay at 50. It is a very good number to be stopped at. It is half of something.",
      "Management | If nothing happens, that is the dependency working. If something happens, that is also the dependency working.",
      "Management | The child is eager. The parent is sleepy. The third bar is a rumour and has been told to stand near the door."
    ], true),
    pool('BPF', [
      "Management | You are number 7 in line. If you are not number 7 in line, please wait until you are.",
      "Management | The queue is moving at the pace of its slowest member, which is Gary, and also the idea of a queue.",
      "Management | A queue is a line that has agreed to wait together. Nobody agreed. It formed around you.",
      "Management | Gerald has been asked whether he minds waiting. Gerald is a potato. Gerald minds nothing. It is his gift."
    ], true),
    pool('BPG', [
      "Management | Measurement has become flexible. This is not a failure. It is a feature of a bar under pressure.",
      "Bar | Am I at 70? Am I at 7 elevenths? I do not know. I heard the units were changing and I took it personally.",
      "Management | The conversion rate between percent and Tuesdays is, per Sandra, 'seasonal'.",
      "Management | The units have been reviewed by a panel. The panel had no opinion and a very good lunch."
    ], true),
    pool('BPH', [
      "Bar | I am so close to being a different bar. A finished one. I do not know if I will be good at it.",
      "Management | The bar is nervous. A small cushion has been placed nearby. It is not for sitting. It is so the bar knows one exists.",
      "Bar | If I get to 100, what happens to the stripes? Do they keep going? Do they know?",
      "Bar | Whatever happens next, I would like it known that this was a nice stretch."
    ], true),
    pool('BPI', [
      "Management | More nines are expected. Four are on order. Five have been described as 'in the post'.",
      "Management | The decimal point is working overtime. It has been told it will be recognised. It will not.",
      "Bar | I am at 99 and something. The something is the best part of me.",
      "Management | At this point the bar is a number with a bar around it. Please do not tell the bar. It has been working on this."
    ], true)
  ];
  const LN = {};
  Object.keys(RAW).forEach(function (k) { const s = RAW[k], i = s.indexOf(' | '); LN[k] = { who: s.slice(0, i), text: s.slice(i + 3) }; });
  const MOOD = { A: 'neutral', R: 'disappointed', S: 'smug', L: 'smug', T: 'neutral', Q: 'confused', D: 'confused', B: 'smug', U: 'smug', V: 'proud', X: 'panic', E: 'proud', Z: 'panic', I: 'disappointed', F: 'disappointed', W: 'smug', H: 'proud', P: 'smug', C: 'confused', M: 'confused' };

  const ETA = [
    "about 2 minutes.", "1 minute.", "4 minutes.", "please disregard that.", "one lunch.", "a pleasant amount.", "17 minutes, give or take a Tuesday.",
    "calculating. Calculating how to calculate. Calculating is 12 percent done.", "nine minutes, in every direction.",
    "3 minutes, 51 seconds, give or take a lunch.",
    "4 minutes. Updated: still 4 minutes. It has been 1 minute. We are not discussing this.",
    "unknown. This is the most accurate estimate yet and Management is proud of it.", "about about 5 minutes.",
    "between now and later, with later favoured.", "12 minutes, or until someone says otherwise.", "a coffee, but not the one you are thinking of.",
    "two Mondays, which is not how Mondays work.", "soon, in a font that implies it.", "depends on the stripes. The stripes have not been asked.",
    "we asked the bar. The bar asked us. We are both waiting on that.", "8 minutes, per Sandra, who has never looked at a clock directly.",
    "a figure has been proposed. The figure has been taken outside for some air.", "a short while. It is a longer while than that.",
    "the length of this sentence, read aloud by someone in no hurry."
  ];
  const TIPS = [
    "Loading tip: if the bar says 99 percent, it is lying slightly, in a friendly way.",
    "Loading tip: for best results, wait. For worst results, also wait. Results may vary by less than that.",
    "Loading tip: a watched bar does not boil. Nobody has checked whether it loads.",
    "Loading tip: Dennis (Plant) has never clicked a progress bar. Dennis is doing fine.",
    "Loading tip: waiting is the only task that gets easier the less you do it.",
    "Loading tip: 7 1/2 percent of all waiting is spent wondering how much is left.",
    "Loading tip: Sandra from Compliance recommends blinking at a normal speed. Sandra has not said what normal is.",
    "Loading tip: the bar was trained on thousands of other bars and learned only patience.",
    "Loading tip: do not trust the stripes. They move whether or not anything is happening. They are for morale.",
    "Loading tip: you may leave. The bar will not be hurt. It will pretend to be hurt, briefly, and then finish.",
    "Loading tip: if you hear a faint humming, that is the progress. If you hear nothing, that is also the progress.",
    "Loading tip: the percent sign is doing most of the work.",
    "Loading tip: the bar has been told it is 100 percent bar. It is unsure how to check.",
    "Loading tip: 100 percent is not a place. It is a rumour started by the number 99.",
    "Loading tip: bring a book. If you do not own a book, bring the idea of one and hold it at a reading angle.",
    "Loading tip: this tip is also loading. The next tip is 3 percent done.",
    "Loading tip: the first minute is the longest. This is a lie told to the first minute, kindly.",
    "Loading tip: a potato does not rush. Gerald has not been asked for a statement and has offered one anyway. It was 'mm'."
  ];
  const LOGS = [
    "Aligning the 7 1/2 sprockets... done (again).", "Warming up the warm-up... warm.", "Asking the previous step how it is... it is fine, it says.",
    "Rounding up the stragglers... 3 found, all of them nearly there.", "Defragmenting 14 seconds (two found under the sofa).",
    "Buffering anticipation (3.5 GB). Available in small, medium, and 'any moment now'.", "Polishing the middle. The middle is now very shiny. Nobody is looking at it.",
    "Unpacking 'soon' (flat-packed, one screw missing).", "Locating It... It is behind a more important It.", "Sandra has the file. Sandra is on a Tuesday.",
    "Consulting the other bar. The other bar is consulting a different bar.", "Counting to 37.5. This takes longer than it sounds and exactly as long as it looks.",
    "Calibrating the calibrator against a smaller calibrator...", "Moving the 4 to make room for the 5... the 4 has agreed to wait.",
    "Dusting the cache. The cache is fine. The cache is sentimental.", "Filing the file under Pending. Pending is full. Opening Pending (2).",
    "Verifying the verification... verified, but not by the same person.", "Reading the manual for the manual... page 7 1/2 is missing, as always.",
    "Spooling a spool. The spool is exactly as it was.", "Asking Dennis (Plant) for a second opinion... Dennis is thriving. No notes.",
    "Inflating a very small number. It is now only slightly bigger.", "Shaking hands with the server... a firm grip, held a bit long, no reason given.",
    "Rounding 37.5 to 37.5. This is the most we are allowed to round it.", "Applying 3 updates. One is for the update. One is an apology. One is blank on purpose."
  ];
  const NOTICES = [
    ['Notice No. 1', 'You clicked the bar. The bar has been clicked before and it did not help then either. Progress reduced by [lost] percent.'],
    ['Notice No. 2', 'Clicking does not make a bar faster. It makes the bar go back and think about what it did.'],
    ['Notice No. 3 (supersedes No. 2, which was about lunch)', 'Please wait without checking that you are waiting.'],
    ['Notice No. 4', 'A watched bar does not boil, and it does not load. Please look at something else. Please look at it less.'],
    ['Notice No. 5', 'The bar has been rewound [lost] percent. The [lost] percent has not been lost. It is being held in the memorial strip for safekeeping.'],
    ['Notice No. 6', "Impatience has been detected, logged and filed under 'Understandable'. The bar has gone back anyway. Policy."],
    ['Notice No. 7 1/2', 'This notice is a half notice. It is as much notice as we could spare.'],
    ['Notice No. 8', 'Per Notice No. 3, please wait without checking. Per Notice No. 8, please stop reading Notice No. 3.'],
    ['Notice No. 9', "You have clicked the bar 9 times. The bar would like a word. The word is 'please'."],
    ['Notice No. 10', "Notice No. 10 is a courtesy copy of Notice No. 9, with the word 'please' underlined by a different person."],
    ['Notice No. 11', 'The bar has asked to see the notices. It has read them. It says it understands. It does not understand.'],
    ['Notice No. 12 (final)', 'We will no longer notify you of impatience. Please consider yourself notified.']
  ];
  const NREV = [
    'You have been notified. The previous notification remains in force.', 'Impatience noted. The note is in a drawer with the other notes, gently.',
    'The bar has been rewound again. It is getting good at it. Nobody is proud.', 'This notice was issued in error. The error was issued correctly.',
    'Please see Notice No. 3, which is about lunch, and has been superseded.', 'Impatience is not a crime. It is an administrative event with a receipt.',
    'This notice is a photocopy of a notice about a different bar. The bar has asked that you not read it aloud.',
    'Your impatience is now the longest-running item on the agenda. It has been moved, with respect, to Any Other Business.',
    'The bar acknowledges your click. It has put its hand on its heart. It is a bar and has no heart. It has put its hand there anyway.',
    "Notice withdrawn. Notice reinstated. Notice has asked for a clearer position on whether it exists.",
    "This notice has been read by Sandra. She has initialled the margin. The initials are 'S.' and a small sigh.",
    'Per the Rewind Society, you have now been rewound enough to receive a pen. The pen has been put somewhere safe, and then somewhere safer.',
    'The notices have started to stack and are beginning to resemble a building. It has no door. It has a lobby.',
    'If you are reading this, the bar was rewound. If you are not reading this, the bar was also rewound, and there is a notice for that.',
    "The previous notice was a typo. It said 'impatience'. It meant 'enthusiasm'. It will be reprinted in a better mood.",
    'Management has reviewed your impatience and finds it consistent with a person who is alive.'
  ];
  const NAMES = ['Doreen', 'Gordon', 'Marguerite', 'Keith', 'Bernadette', 'Clive', 'Philippa', 'Norman', 'Yvette', 'Terence', 'Bartholomew', 'Ingrid', 'Wendell', 'Prudence', 'Lionel', 'Hortense', 'Dwayne', 'Mavis', 'Rupert', 'Agnes (the other one)'];
  const TITLES = ['', 'Preparing to prepare', 'Configuring the configuration', 'Reticulating 7 1/2 splines', 'Thinking about thinking', 'Waiting for the thing that is waiting for this', 'Queueing', 'Converting percent to elevenths', 'Almost almost', 'Almost almost almost', 'Complete (Provisional)'];
  const RATE = [0, 0.30, 0.35, 0.36, 0.30, 0, 0.23, 0.233, 0.157, 0.10];
  const VTH = [84, 86.5, 89, 91, 93, 94, 94.9];
  const UT = [[70, 'U1'], [73, 'U8'], [76, 'U2'], [78, 'U9'], [80, 'U3'], [82, 'U10']];
  const REV2 = ['Revised: ', 'Revised (again): ', 'Per the revision of the revision: ', 'Revised, but not by us: '];
  const QBASE = [['🪑', 'an empty chair'], ['🪑', 'an empty chair'], ['🪑', 'an empty chair'], ['🧦', 'presumed on a journey'], ['🥔', 'Gerald, number 5'], ['🐌', 'Gary, number 6'], ['🙂', 'you, number 7']];
  const QEV = [[0, 'q1'], [3, 'gerald'], [8, 'gary'], [23, 'gerald2'], [30, 'half'], [45, 'red'], [60, 'gary2'], [75, 'sockq']];
  const WORDS = { faster: 'W1', patience: 'W2', sandra: 'W3', tuesday: 'W4', please: 'W5' };

  const K = function (s) { return s.split(' ').map(function (x) { return 'm-wait-for-it-' + x; }).join(' '); };
  const clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  const num = function (v, d) { return Number.isFinite(v) ? Number(v).toFixed(d) : (0).toFixed(d); };

  P.registerModule({
    id: 'wait-for-it',
    title: 'Wait For It(TM)',
    tagline: 'The bar is loading. You are also loading. Please do not look at either.',
    icon: '⏳',
    category: 'game',
    unlockCost: 0,
    tags: ['patience', 'progress', 'bureaucracy'],
    mount(root, api) {
      const el = api.el;
      const SPEED = (api.selftest || (P.params && P.params.shot)) ? 20 : 1;   // fuzz and screenshot runs play 20x so every beat is reachable
      const mountedAt = api.now();

      /* ---------- persistent ---------- */
      const loadInt = function (k, d, lo, hi) { const v = Math.floor(Number(api.save.get(k, d))); return Number.isFinite(v) ? clamp(v, lo, hi) : d; };
      let season = loadInt('season', 1, 1, 9999);
      let trophies = loadInt('trophies', 0, 0, 5);
      let noticeNo = loadInt('noticeNo', 0, 0, 99999);
      let bestUnw = clamp(Number(api.save.get('bestUnwatched', 0)) || 0, 0, 1e6);
      let e13Seen = !!api.save.get('e13', false);
      let pins = loadInt('pins', 0, 0, 99);

      /* ---------- state (everything lives in this closure so a remount is clean) ---------- */
      let S = 1, maxS = 1, q = 0, flick = 0, beat = 1, beatT0 = 0, sim = 0, active = 0, lastTs = 0;
      let tabHidden = false, hiddenAt = 0, lastFwd = -9999;
      let lastInput = -999, lastAct = 0, everInput = false, lastBarClick = 0;
      let overWindow = false, overBar = false, barFocused = false, detailsOpen = false;
      let holding = false, holdStart = 0, holdX = 0, holdY = 0, holdStage = 0, heldLong = false, heldUntil = 0;
      let inRoot = false, pointerSeen = false, outSince = 0, absent = false, darkBank = 0;
      let watched = false, watchedRun = 0, unwRun = 0, unwPaid = 0, s4arm = false, s4S0 = 0, regard = 0;
      let curtainUntil = 0, curtainS0 = 0, rewUntil = 0, walkUntil = 0, blushUntil = 0, bubUntil = 0, hush = 0, fasterUntil = 0;
      let streak = 0, streakAt = -999, nClicks = 0, nRew = 0, stamps = [], casCool = 0, cas = null, cer = null;
      let dlg = 0, dlgT = 0, cancelsDone = 0, bgOn = false, party = null, toast = null;
      let nFid = 0, lastFidget = 0, slideUntil = 0, lastSlide = 0, qi = 0, qT0 = 0, tickets = 0, kbuf = '', svAt = -99, svN = 0, skipN = 0;
      let histAcc = 0, hist = [], titleAt = 0, rollAcc = 0, logNext = 0, etaNext = 6, tipNext = 12, etaCount = 0, aboutN = 1;
      let bubText = '', lastTouchMs = -99999;
      let etaBase = ETA[0], tipText = TIPS[0], memoIdx = 0, memoCount = 0, lastName = NAMES[0], lostLast = 0;
      let idleK = 0, i60 = false, i120 = false, lastX = 0, vAcc = 0;
      let stall = { active: false, n: 0, until: 0, done1: false, done2: false, clicks0: 0, witness: true, wit: false };
      let tidy = { acc: 0, check: 0, failed: false };
      let dep = { on: false, child: 0, resolved: false };
      let fl = {};                       // per-season story flags
      let mf = {};                       // per-mount story flags
      let hatch1 = false, hatch2 = false, sA0 = 0;
      let lastSayT = 0, idleI = 0, idleM = 0, mumNext = 45, wpNext = 0, spamTier = 0, casN = 0, childN = 0, redN = 0, lastFB = -99, lastDS = -99, dtTimes = [], lxN = 0, curIdle = 0;
      let sockEv = null, auditEv = null, coolI = 0;
      const wordAt = {}, sched = [];

      function makeBag(arr) { let b = [], last = null; return function () { if (!b.length) { b = api.shuffle(arr); if (b.length > 1 && b[b.length - 1] === last) b.unshift(b.pop()); } last = b.pop(); return last; }; }
      const etaBag = makeBag(ETA), tipBag = makeBag(TIPS), logBag = makeBag(LOGS), nrevBag = makeBag(NREV), rwBag = makeBag(P_RW), memBag = makeBag(P_MEM), shBag = makeBag(P_SH);
      const tidyBag = makeBag(['T1', 'T2', 'T3']), childBag = makeBag(['D5', 'D6', 'D8']), qBag = makeBag(['Q6', 'Q7']), rsBag = makeBag(['RS1', 'RS2', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS8', 'RS9', 'RS10']);
      const imBag = makeBag(P_IM), muBag = makeBag(P_MU), wpBag = makeBag(P_WP), zrBag = makeBag(P_ZR.slice(2)), fbBag = makeBag(P_FB), skBag = makeBag(P_SK.slice(4)), dsBag = makeBag(P_DS);
      const lxBag = makeBag(P_LX), tcBag = makeBag(P_TC), rbBag = makeBag(P_RB), cxBag = makeBag(P_CX), s5Bag = makeBag(P_S5), coolBag = makeBag(COOLT);
      const beatBags = BEATP.map(function (a) { return a ? makeBag(a) : null; });

      /* ---------- DOM ---------- */
      const taskEl = el('div', { class: K('task') });
      const etaEl = el('div', { class: K('eta') });
      const tipEl = el('div', { class: K('tip') });
      const fasterChip = el('span', { class: K('chipf'), text: 'Faster', hidden: true });
      const rNum = el('span', { class: K('rn'), text: '1.0' });
      const rUnit = el('span', { class: K('ru'), text: '%' });
      const fillEl = el('span', { class: K('fill') });
      const dotEl = el('span', { class: K('dot'), 'aria-hidden': 'true' });
      const sweatEl = el('span', { class: K('sweat'), 'aria-hidden': 'true', text: '💧' });
      const bar = el('button', { class: K('bar'), type: 'button', 'aria-label': 'Progress bar. Please do not click.', onclick: barClick },
        fillEl, el('span', { class: K('seg') }), el('span', { class: K('shim') }), el('span', { class: K('scan') }), dotEl, sweatEl);
      const puff = el('span', { class: K('puff'), 'aria-hidden': 'true', text: '💨' });
      const bread = el('span', { class: K('bread'), 'aria-hidden': 'true', text: '🍞' });
      const sock = el('span', { class: K('sock'), 'aria-hidden': 'true', text: '🧦' });
      const clip = el('span', { class: K('clip'), 'aria-hidden': 'true', text: '📋' });
      const barWrap = el('div', { class: K('barwrap') }, bar, puff, bread, sock, clip);

      const plaqueTxt = el('span', { text: '' });
      const plaqueSub = el('small', { 'aria-hidden': 'true', text: '37.5', hidden: true });
      function makeTrophy() { return el('span', { class: K('tro'), 'aria-hidden': 'true' }, el('i', { class: K('th1') }), el('i', { class: K('th2') }), el('i', { class: K('ts') }), el('i', { class: K('tb1') }), el('i', { class: K('tp') }), el('i', { class: K('tsp') })); }
      const trobox = el('div', { class: K('trobox') }, makeTrophy(), el('div', { class: K('plq'), 'aria-hidden': 'true' }, plaqueTxt, plaqueSub));
      const gerEl = el('div', { class: K('ger'), 'aria-hidden': 'true', text: '🥔' });
      const instFill = el('i');
      const instLbl = el('span', { class: K('sl'), text: 'Installing trophy  0%' });
      const instBar = el('div', { class: K('sb inst'), hidden: true }, instFill, instLbl);
      const stage = el('div', { class: K('stage'), hidden: true }, trobox, gerEl);

      const childFill = el('i'), thirdFill = el('i');
      const childBtn = el('button', { class: K('sb kc'), type: 'button', 'aria-label': 'Child bar. Please do not click.', onclick: childClick }, childFill, el('span', { class: K('sl'), text: 'Child (waiting for parent)' }));
      const thirdBar = el('div', { class: K('sb kt') }, thirdFill, el('span', { class: K('sl'), text: 'Third (waiting for parent)' }));
      const kids = el('div', { class: K('kids'), hidden: true }, childBtn, thirdBar);
      const decoyFill = el('i');
      const decoy = el('button', { class: K('sb decoy'), type: 'button', hidden: true, onclick: function () { say('B5'); } }, decoyFill, el('span', { class: K('sl'), text: 'Waiting (second location)' }));
      const miniFill = el('i');
      const mini = el('div', { class: K('sb mini'), hidden: true }, miniFill, el('span', { class: K('sl'), text: 'Waiting (background)' }));

      const queue = el('div', { class: K('queue'), hidden: true, role: 'group', 'aria-label': 'The queue. You are number 7.' });
      let qGer = null;
      function buildQueue() {
        queue.textContent = '';
        QBASE.forEach(function (c, i) { const s = el('span', { class: K('qc'), title: c[1], text: c[0] }); if (i === 4) qGer = s; queue.appendChild(s); });
      }
      buildQueue();
      const redBtn = el('button', { class: K('red'), type: 'button', 'aria-label': 'Something small and red. Please do not press.', title: 'Something small and red', text: '🔴', onclick: redPress });

      const detBtn = el('button', { class: K('btn'), type: 'button', 'aria-expanded': 'false', onclick: toggleDetails, text: 'Details' });
      const cancelBtn = el('button', { class: K('btn cancel'), type: 'button', hidden: true, onclick: openCancel, text: 'Cancel' });
      const runBtn = el('button', { class: K('btn'), type: 'button', hidden: true, onclick: runBg, text: 'Run in background' });
      const lookBtn = el('button', { class: K('btn look'), type: 'button', hidden: true, onclick: lookAway, text: 'Look away (10 s)' });
      const numBtn = el('button', { class: K('btn'), type: 'button', hidden: true, onclick: takeNumber, text: 'Take a Number' });
      const skipBtn = el('button', { class: K('btn skip'), type: 'button', hidden: true, onclick: skipPress, text: 'Skip (not available in your region)' });
      const gaugeB = el('b');
      const regardBox = el('div', { class: K('regard'), hidden: true }, el('span', { text: 'Regard' }), el('span', { class: K('gauge'), 'aria-hidden': 'true' }, gaugeB));
      const ctrl = el('div', { class: K('row') }, lookBtn, detBtn, cancelBtn, runBtn, numBtn, skipBtn, regardBox);

      const dlgText = el('div', { 'aria-live': 'polite', text: '' });
      const yesBtn = el('button', { class: K('btn'), type: 'button', onclick: dlgNext, text: 'Yes (Keep Waiting)' });
      const noBtn = el('button', { class: K('btn'), type: 'button', onclick: dlgNext, text: 'No (Keep Waiting)' });
      const formFill = el('i');
      const dlgRow = el('div', { class: K('row') }, yesBtn, noBtn);
      const formBar = el('div', { class: K('sb formb'), hidden: true }, formFill, el('span', { class: K('sl'), text: 'Form 27B/6  0.0%' }));
      const dlgBox = el('div', { class: K('dlg'), role: 'dialog', 'aria-label': 'Cancel waiting', tabIndex: -1, hidden: true }, dlgText, dlgRow, formBar);
      const detail = el('div', { class: K('detail'), hidden: true, role: 'log' });
      const survey = el('label', { class: K('sv'), hidden: true }, el('span', { text: 'How long have you been waiting?' }),
        el('input', { class: K('range'), type: 'range', min: 0, max: 100, value: 50, onchange: onSurvey }),
        el('span', { class: K('svr') }, el('span', { text: 'a bit' }), el('span', { text: 'since the harvest' })));

      const body = el('div', { class: K('body') },
        el('div', { class: K('head') }, el('div', { class: K('info') }, taskEl, etaEl, tipEl, fasterChip), el('div', { class: K('read') }, rNum, rUnit)),
        barWrap, stage, instBar, kids, decoy, queue, ctrl, dlgBox, detail, survey);
      const curtain = el('div', { class: K('curtain'), 'aria-hidden': 'true', text: 'looking away...', onclick: function () { say('LA2'); } });
      const gold = el('div', { class: K('gold'), 'aria-hidden': 'true' });
      const bunting = el('div', { class: K('bunt'), 'aria-hidden': 'true' });
      const balloon = el('span', { class: K('balloon'), 'aria-hidden': 'true', text: '🎈' });
      const pts = []; for (let i = 0; i <= 56; i++) pts.push((i * 5) + ',' + (12 + Math.round(Math.sin(i * 0.9) * 8 * Math.sin(i * 0.23 + 1))));
      const wave = el('div', { class: K('wave'), 'aria-hidden': 'true' }, el('svg', { viewBox: '0 0 280 24' }, el('polyline', { points: pts.join(' '), fill: 'none', stroke: '#2B2118', 'stroke-width': 2 })));
      const coolTxt = el('div', { text: COOLT[0] });
      const cool = el('div', { class: K('cool'), hidden: true }, el('div', { text: 'Cooling-Off Wait' }), wave, coolTxt);
      const certTxt = el('span', { text: '' });
      const cert = el('div', { class: K('cert'), hidden: true }, el('b', { text: 'CERTIFICATE OF IMPATIENCE' }), certTxt);
      const tbt = el('span', { class: K('tbt'), text: 'Wait For It(TM) Setup' });
      const win = el('div', { class: K('win') },
        el('div', { class: K('tb') }, el('span', { class: K('dt'), 'aria-hidden': 'true' }), el('span', { class: K('dt'), 'aria-hidden': 'true' }), el('span', { class: K('dt'), 'aria-hidden': 'true' }), tbt),
        body, gold, bunting, balloon, mini, curtain, cool, cert);

      const caps = el('div', { class: K('caps'), role: 'log', 'aria-live': 'off' });
      const footEl = el('div', { class: K('foot') });
      const reviewEl = el('div', { class: K('rev'), hidden: true, text: 'PERFORMANCE REVIEW: The Bar (3:00). Meets Expectations (Barely Looked).' });
      const pinEl = el('div', { class: K('pin'), hidden: true });
      const capBox = el('div', {}, caps, footEl, el('div', { class: K('fine'), text: 'Impatience may result in a notice. Patience may result in a trophy. Neither is guaranteed.' }), reviewEl, pinEl);

      const notes = el('div', { class: K('notes') });
      const ticketEl = el('div', { class: K('ticket'), hidden: true }, el('b', { text: 'NUMBER 7 1/2' }), el('span', { text: 'ADMIT ONE (1) WAIT' }));
      const rcpt = el('div', { class: K('rcpt') }, el('div', { class: K('rh'), text: 'IMPATIENCE NOTICES' }), notes, ticketEl);
      const chips = el('div', { class: K('chips') });
      const memo = el('div', { class: K('memo') }, el('div', { class: K('rib'), text: 'In memoriam (percents)' }), chips);
      const shelf = el('div', { class: K('shelf') });

      const wrap = el('div', { class: K('wrap'), 'data-beat': '1', 'data-fill': 'mint' },
        el('div', { class: K('col') }, win, capBox),
        el('div', { class: K('col') }, rcpt, memo, shelf));
      root.appendChild(wrap);

      /* ---------- helpers ---------- */
      function fill(t, tok) {
        tok = tok || {};
        return String(t).replace(/\[([a-z]+)\]/g, function (m, k) {
          if (k === 'player') return api.player.name;
          if (tok[k] !== undefined && tok[k] !== null) return String(tok[k]);
          return /^(gain|lost|x|n|count|pct|secs|season)$/.test(k) ? '0' : '';
        });
      }
      function addCap(who, text) {
        caps.appendChild(el('div', { class: K('cap') }, el('b', { text: who + ': ' }), text));
        while (caps.children.length > 8) caps.removeChild(caps.firstChild);
      }
      function say(key, tok, o) {
        o = o || {};
        const ln = LN[key];
        if (!ln || (sim < hush && !o.force)) return false;
        lastSayT = sim;
        let text = fill(ln.text, tok);
        if (api.now() - lastTouchMs < 120000) text = text.replace(/\bcursor\b/g, 'finger').replace(/\bCursor\b/g, 'Finger');
        if (season >= 2 && ln.who === 'Management' && !o.sincere && (mf.rev2 || 0) < REV2.length) { text = REV2[mf.rev2 || 0] + text; mf.rev2 = (mf.rev2 || 0) + 1; }
        addCap(ln.who, text);
        if (ln.who === 'Bar' || ln.who === 'Child Bar') { bubText = text; bubUntil = sim + 6; }
        const t = api.now(), pri = o.pri === undefined ? (LOW[key] ? 0 : 1) : o.pri;
        if (pri >= 2 || t - lastFwd >= 2500) { lastFwd = t; api.say(text, { who: ln.who, mood: o.mood || MOOD[key.charAt(0)] || 'neutral', priority: pri }); }
        return true;
      }
      function after(sec, fn) { if (sched.length < 120) sched.push({ t: sim + sec, fn: fn }); }
      /* rewinding is literal: the newest caption lines are struck out (animate) or quietly blanked (a gap in the log) */
      function rewindCaps(n, strike) {
        const list = [];
        for (let i = caps.children.length - 1; i >= 0 && list.length < n; i--) { const c = caps.children[i]; if (!c.classList.contains(K('gap')) && !c.classList.contains(K('struck'))) list.push(c); }
        list.forEach(function (c) {
          if (strike) { c.classList.add(K('struck')); api.setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 350); } else c.classList.add(K('gap'));
        });
        return list.length;
      }
      function restoreFocus() {
        const ae = document.activeElement;
        if (!ae || ae.tagName === 'BODY' || dlgBox.contains(ae)) { try { cancelBtn.focus(); } catch (e) { /* ignore */ } }
      }
      function runSched() {
        for (let i = 0; i < sched.length;) {
          if (sched[i].t <= sim) { const f = sched.splice(i, 1)[0].fn; f(); } else i++;
        }
      }
      function show(node, on) { if (node.hidden === !!on) node.hidden = !on; }
      function tg(node, cls, on) { node.classList.toggle(K(cls), !!on); }
      const cache = {};
      function put(key, v, fn) { if (cache[key] !== v) { cache[key] = v; fn(v); } }
      function histAgo(sec) { const i = hist.length - 1 - sec; return i >= 0 ? hist[i] : (hist.length ? hist[0] : S); }
      function harbour() { let f = 10 * Math.floor(maxS / 10); if (beat >= 9) f = Math.max(f, 95); return Math.min(f, S); }
      function pctText(v, d) { const f = Math.pow(10, d); return num(Math.floor(v * f + 1e-7) / f, d); }
      function addLog(text) {
        const m = Math.floor(active / 60), s = Math.floor(active % 60);
        detail.appendChild(el('div', { class: K('lg') }, el('b', { text: (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + ' ' }), text));
        while (detail.children.length > 40) detail.removeChild(detail.firstChild);
        if (detailsOpen) detail.scrollTop = detail.scrollHeight;
      }
      function printNote(head, text) {
        notes.appendChild(el('div', { class: K('note') }, el('b', { text: head }), el('span', { text: text })));
        while (notes.children.length > 5) notes.removeChild(notes.firstChild);
      }
      function nextNotice(lost) {
        noticeNo++;
        api.stat.inc('wait-for-it.notices');
        if (noticeNo <= 12) printNote(NOTICES[noticeNo - 1][0], fill(NOTICES[noticeNo - 1][1], { lost: num(lost, 1) }));
        else printNote('Notice No. ' + noticeNo + ' (Revised)', nrevBag());
      }
      function fileChip(lost) {
        lastName = NAMES[memoIdx % NAMES.length]; memoIdx++; memoCount++;
        const c = el('span', { class: K('chip'), text: lastName + ' (' + num(lost, 1) + ')' });
        c._name = lastName;
        chips.appendChild(c);
        while (chips.children.length > 12) chips.removeChild(chips.firstChild);
      }
      function renderShelf() {
        shelf.textContent = '';
        shelf.appendChild(el('div', { class: K('shl'), text: 'Trophies of Waiting' }));
        for (let i = 0; i < trophies; i++) {
          const last = season >= 2 && i === trophies - 1, tro = makeTrophy();
          if (last) tro.style.clipPath = 'inset(0 62.5% 0 0)';
          const kids2 = [tro, el('span', { text: 'No. ' + (i + 1) })];
          if (last) kids2.push(el('span', { title: 'Gary, exactly 1 position ahead', text: '🐌' }));
          shelf.appendChild(el('div', { class: K('slot'), title: last ? 'Trophy No. ' + (i + 1) + ' (installing: 37.5%)' : 'Trophy No. ' + (i + 1) }, ...kids2));
        }
        footEl.textContent = 'Step ' + season + ' of 1,204' + (season > 1 ? '. The bar has been told you are good at this.' : '');
        pinEl.hidden = pins < 1;
        pinEl.textContent = pins < 1 ? '' : 'Long Service Pin' + (pins > 1 ? 's' : '') + ': ' + pins + '. Each is shaped like a 10 that has been sat on. They are in the drawer with the seconds.';
      }
      function saveAll() {
        api.save.set('season', season); api.save.set('trophies', trophies); api.save.set('noticeNo', noticeNo);
        api.save.set('bestUnwatched', Math.round(bestUnw * 10) / 10); api.save.set('e13', e13Seen); api.save.set('pins', pins);
      }
      function markInput() {
        lastInput = sim; lastAct = sim; everInput = true; idleK = 0; i60 = false; i120 = false; blushUntil = 0;
        idleI = 0; idleM = 0; mumNext = sim + 45;
        if (party && !party.frozen) freezeParty();
      }
      function freezeParty() { party.frozen = true; party.end = sim + 2; tg(wrap, 'frozen', true); say('PA2'); }

      /* ---------- attention, progress ---------- */
      function isWatched() { return curtainUntil <= sim && (overWindow || overBar || barFocused || sim - lastInput < 4 || detailsOpen || dlg > 0 || holding); }
      function factor() {
        let f = sim < fasterUntil ? 0.5 : (watched ? (beat >= 8 ? 0.3 : 0.55) : 1);
        const sa = active - sA0;
        if (sa > 600) { f = Math.max(f, 0.6); if (!mf.pity) { mf.pity = 1; say('PI'); } }
        if (sa > 1000) f = Math.max(f, 1);
        return f;
      }
      function canAdvance() { return !stall.active && !cas && !cer && beat !== 5; }
      function advance(d) {
        if (!(d > 0) || S >= 99) return;
        let ns = Math.min(99, S + d);
        if (!stall.done1 && S < 37.5 && ns >= 37.5) { S = 37.5; maxS = Math.max(maxS, S); startStall(1); return; }
        if (beat === 4 && S < 50 && ns > 50) ns = 50;
        S = ns; if (S > maxS) maxS = S;
      }
      function nines(h, f) {
        q = clamp(q, 0, 3);
        q = Math.min(3, q + f * h / (15 * Math.pow(2, q)));
        S = 100 - Math.pow(10, -q); if (S > maxS) maxS = S;
        if (q >= 2.97 && flick === 0) { flick = 1; if (!fl.x6) { fl.x6 = 1; say('X6'); } }
      }
      function startStall(n) {
        stall.active = true; stall.n = n; stall.until = sim + 7.5; stall.clicks0 = nClicks; stall.witness = true;
        api.sfx('pop');
        if (n === 1) {
          say('ST0'); after(5.2, function () { if (stall.active) say('SNR'); });
          if (season >= 2) after(1.5, function () { say('STS'); }); else { after(1.5, function () { say('ST1'); }); after(3, function () { say((api.flag.get('metDennis') || api.flag.get('plantClicked')) && api.chance(0.5) ? 'RSD' : rsBag()); }); }
        } else { say('ST2'); addLog('A stall at 37.5 percent has been filed in a different file.'); }
      }
      function endStall() {
        stall.active = false; api.sfx('ding');
        if (stall.n === 1) {
          stall.done1 = true;
          if (stall.witness && nClicks === stall.clicks0 && !fl.wit) {
            fl.wit = 1; say('WI'); addLog(fill(LN.WIL.text)); api.stat.inc('wait-for-it.stalls_witnessed'); api.achieve('wait-for-it.witness');
          }
        } else stall.done2 = true;
      }
      function startCascade() {
        stamps = []; casCool = sim + 60; casN++; spamTier = 0;
        cas = { t0: sim, ph: 0, preS: S, z5: false, ticks: 0 };
        for (let i = 0; i < 5; i++) { nextNotice(0); }
        printNote('Notice No. ' + noticeNo, 'Notice. Notice. Notice. Notice. Notice.');
        say('Z1'); api.sfx('whoosh');
      }
      function stepCascade() {
        const t = sim - cas.t0;
        if (cas.ph === 0 && t >= 3) { cas.ph = 1; say('Z2'); coolTxt.textContent = COOLT[(casN - 1) % COOLT.length]; }
        if (cas.ph === 1) { while (cas.ticks < 3 && t >= 3 + cas.ticks * 2.5) { cas.ticks++; api.sfx('tick'); if (cas.ticks > 1) coolTxt.textContent = coolBag(); } }
        if (cas.ph < 2 && (t >= 10.5 || t > 20)) {
          cas.ph = 2; cas.t2 = sim;
          certTxt.textContent = fill('[player] has been impatient. This has been framed. Management apologises, mostly to itself.');
          if (casN <= 1) say('Z3'); else say(casN === 2 ? P_ZR[0] : casN === 3 ? P_ZR[1] : zrBag(), { count: casN });
          api.achieve('wait-for-it.cascade'); api.award(-0.5, 'cooling-off fee'); api.sfx('error'); api.stat.inc('wait-for-it.spam');
          S = Math.max(harbour(), cas.preS - 7.5); if (!(S >= 0)) S = 1; if (S < 99) { q = 0; flick = 0; }
          walkUntil = sim + 1; say('Z6');
        }
        if (cas.ph === 2 && sim - cas.t2 >= 6) cas = null;
      }

      /* ---------- impatience ---------- */
      function barClick() {
        const now = api.now();
        if (heldLong && now < heldUntil) { heldLong = false; return; }
        heldLong = false;
        markInput();
        if (cer) { if (!cer.said) { cer.said = true; say('CE'); } api.sfx('blip'); return; }
        if (cas) { if (cas.ph < 2 && !cas.z5) { cas.z5 = true; say('Z5'); } return; }
        if (curtainUntil > sim) { say('LA2'); return; }
        nClicks++; lastBarClick = sim;
        api.stat.inc('wait-for-it.clicks');
        stamps = stamps.filter(function (t) { return now - t < 3000; }); stamps.push(now);
        if (stamps.length >= 15 && sim >= casCool) { startCascade(); return; }
        if (stamps.length < 3) spamTier = 0;
        for (let zi = ZP_N.length - 1; zi >= 0; zi--) {
          if (stamps.length >= ZP_N[zi]) { if (spamTier < zi + 1) { spamTier = zi + 1; say(P_ZP[zi], null, { force: true }); } break; }
        }
        if (sim - streakAt > 20) streak = 0;
        const drop = Math.min(6, 2 + 0.5 * streak); streak++; streakAt = sim;
        let actual = 0, inNines = false;
        if (S >= 99) { inNines = true; actual = S - 99; S = 99; q = 0; flick = 0; }
        else { const ns = Math.max(harbour(), S - drop); actual = Math.max(0, S - ns); S = ns; }
        rewUntil = sim + 0.4; lostLast = actual;
        nextNotice(actual);
        if (nClicks % 5 === 0) { api.award(-0.1, 'impatience'); api.sfx('buzz'); } else api.sfx('whoosh');
        if (inNines) { if (!fl.x4) { fl.x4 = 1; say('X4'); } }
        if (actual >= 0.05) {
          nRew++; api.stat.inc('wait-for-it.rewinds'); fileChip(actual);
          const rt = { name: lastName, lost: num(actual, 1), count: memoCount, x: num(S + actual, 1) };
          if (nRew === 3 && caps.children.length >= 3) { rewindCaps(2, true); say('RWC'); }
          else if (nRew > 3 && nRew % 7 === 0 && caps.children.length >= 3) { rewindCaps(1, false); if (nRew % 4 === 0) say(memBag(), rt); }
          else if (nRew % 4 === 0) say(memBag(), rt);
          else if (!stall.active && api.chance(0.4)) say(rwBag(), rt);
        } else if (!inNines) say(shBag());
        if (nClicks % 5 === 0) saveAll();
      }
      function childClick() {
        if (cer || !dep.on) return;
        dep.child = 0; S = Math.max(harbour(), S - 0.5);
        childN++;
        api.stat.inc('wait-for-it.child_clicks'); api.sfx('boing'); say(childN === 3 ? 'D7' : childBag(), { count: childN });
      }

      /* ---------- controls ---------- */
      function toggleDetails() {
        detailsOpen = !detailsOpen; detBtn.setAttribute('aria-expanded', detailsOpen ? 'true' : 'false'); api.sfx('blip');
        dtTimes.push(sim); if (dtTimes.length > 6) dtTimes.shift();
        if (dtTimes.length >= 6 && sim - dtTimes[0] <= 6 && sim - lastDS >= 15) { lastDS = sim; say(dsBag(), null, { pri: 1 }); }
        if (detailsOpen) { if (!mf.dt1) { mf.dt1 = 1; say('DT1'); } detail.scrollTop = detail.scrollHeight; }
      }
      function lookAway() {
        if (cer || cas) return;
        if (curtainUntil > sim) { lxN++; say(lxN % 2 ? 'LA2' : lxBag()); return; }
        lxN = 0;
        curtainUntil = sim + 10; curtainS0 = S; api.sfx('whoosh');
        if (!mf.la1) { mf.la1 = 1; say('LA1'); } else say('LA2');
      }
      function endCurtain() {
        curtainUntil = 0;
        const g = S - curtainS0;
        if (!mf.la3) { mf.la3 = 1; say('LA3'); }
        else if (g >= 1) say('S4', { gain: num(g, 1) });
        if (g >= 1) { api.award(0.1, 'surge'); api.stat.inc('wait-for-it.surges'); api.sfx('ding'); }
      }
      function setDlg(n) {
        dlg = n; show(dlgBox, n > 0); show(dlgRow, n === 1); show(formBar, n === 2);
        dlgText.textContent = n === 1 ? LN.C2.text : n === 2 ? LN.C3.text : '';
      }
      function openCancel() { if (dlg || cer) return; dlgT = sim + 30; setDlg(1); api.sfx('blip'); try { yesBtn.focus(); } catch (e) { /* ignore */ } }
      function dlgNext() { if (dlg !== 1) return; dlgT = sim + 3; setDlg(2); api.sfx('tick'); try { dlgBox.focus(); } catch (e) { /* ignore */ } after(1.5, function () { if (dlg === 2) say('C3b'); }); }
      function finishCancel() {
        setDlg(0); restoreFocus(); cancelsDone++; api.stat.inc('wait-for-it.cancels'); api.sfx('stamp');
        if (cancelsDone === 1) { api.achieve('wait-for-it.cancel'); say(api.flag.get('metStapler') ? 'C4s' : 'C4'); } else if (cancelsDone === 2) say('C5'); else if (cancelsDone === 3) say('C6'); else say(cxBag(), { count: cancelsDone });
      }
      function runBg() {
        if (bgOn) return;
        bgOn = true; runBtn.textContent = 'Run in background (done)'; runBtn.setAttribute('aria-disabled', 'true'); api.sfx('whoosh');
        say('B1'); after(4, function () { say('B2'); }); after(8, function () { say('B3'); }); after(30, function () { say('B4'); });
      }
      function takeNumber() {
        tickets++; api.stat.inc('wait-for-it.tickets'); api.sfx('stamp');
        ticketEl.hidden = false; tg(ticketEl, 'print', false); void ticketEl.offsetWidth; tg(ticketEl, 'print', true);
        say(tickets === 1 ? 'TA' : tickets === 2 ? 'TB' : tcBag(), { count: tickets });
      }
      function skipPress() {
        skipN++; say(skipN === 1 ? 'U6' : skipN <= 5 ? P_SK[skipN - 2] : skBag(), { count: skipN }); api.sfx('buzz');
        tg(skipBtn, 'shake', false); void skipBtn.offsetWidth; tg(skipBtn, 'shake', true);
      }
      function onSurvey() { if (sim - svAt >= 15) { svAt = sim; say(svN === 0 ? 'U4' : 'U5'); svN++; api.sfx('pop'); } }
      function redPress() {
        const n = api.stat.get('the-button.presses');
        api.stat.inc('wait-for-it.child_clicks'); api.sfx('pop');
        redN++;
        if (redN >= 4) say(rbBag());
        else if (n > 0) say('Q5b', { count: api.fmt(n) }); else say('Q5c');
      }

      /* ---------- absence ---------- */
      function comeBack(away) {
        const lump = darkBank; darkBank = 0;
        const before = S;
        if (lump > 0 && canAdvance()) advance(lump);
        const gain = Math.max(0, S - before);
        if (away >= 60) { say('ABL', { secs: Math.floor(away) }); after(4, function () { say(s5Bag(), { gain: num(gain, 1) }); }); }
        else if (away >= 8) say(s5Bag(), { gain: num(gain, 1) });
        if (away >= 20 && lump > 0) { api.achieve('wait-for-it.dark'); api.stat.inc('wait-for-it.absences'); }
        const mins = Math.floor(away / 60);
        if (mins > 0) api.award(0.1 * mins, 'absence');
      }

      /* ---------- the tick ---------- */
      function step(h) {
        sim += h; active += h;
        runSched();
        if (cer) { stepCer(); return; }
        if (dlg === 2 && sim >= dlgT) finishCancel();
        else if (dlg === 1 && sim >= dlgT) { setDlg(0); restoreFocus(); say('C4'); }
        watched = isWatched();
        regard = clamp(regard + (watched ? h : -h) / 3, 0, 1);
        attention(h);
        if (curtainUntil && sim >= curtainUntil) endCurtain();
        if (pointerSeen && !inRoot && !absent && sim - outSince >= 5) { absent = true; if (!mf.ab1) { mf.ab1 = 1; say('AB1'); } }
        if (absent) { darkBank = Math.min(6, darkBank + 1.4 * h); if (!mf.ab2 && sim - outSince >= 30) { mf.ab2 = 1; say('AB2'); } }
        if (cas) stepCascade();
        if (stall.active) {
          if (!(overBar || barFocused || holding) || curtainUntil > sim) stall.witness = false;
          if (sim >= stall.until) endStall();
        }
        if (canAdvance()) { const f = factor(); if (S >= 99) nines(h, f); else { const r = RATE[beat] || 0; if (r > 0) advance(r * f * h); } }
        if (flick === 2) { flick = 3; startCeremony(); return; }
        if (beat >= 6 && !stall.done2 && !stall.active && S >= 62 && S < 99) startStall(2);
        tidying(h); dependency(h); queueStep(); etaTip(); idleLadder(); events(h); holdStep(); story(); checkBeat();
        histAcc += h; while (histAcc >= 1) { histAcc -= 1; hist.push(S); if (hist.length > 130) hist.shift(); }
        if (party) {
          if (!party.frozen) { const t = sim - party.t0; while (party.beeps < 3 && t >= party.beeps * 1.5) { party.beeps++; api.sfx('bloop'); } }
          else if (sim >= party.end) { party = null; tg(win, 'party', false); tg(win, 'frozen', false); tg(wrap, 'frozen', false); }
        }
        if (sim >= titleAt) {
          titleAt = sim + 5; const fp = Math.floor(clamp(S, 0, 99));
          api.setTitle('Wait For It(TM) - ' + fp + '%');
          bar.setAttribute('aria-label', 'Progress bar, ' + fp + ' percent. Please do not click.');
        }
        misc();
      }
      function attention(h) {
        if (watched) {
          watchedRun += h; unwRun = 0; unwPaid = 0; s4arm = false;
          if (beat >= 2 && watchedRun >= 8 && !fl.s3) { fl.s3 = 1; say('S3'); }
          if (beat >= 2 && watchedRun >= 20 && !mf.s6) { mf.s6 = 1; say('S6'); }
          if (beat >= 2 && watchedRun >= 30 && sim >= wpNext) { wpNext = sim + 25; say(wpBag()); }
          if (beat >= 2 && watchedRun >= 60 && !mf.wh60) { mf.wh60 = 1; say('WH60'); }
          if (beat >= 2 && watchedRun >= 120 && !mf.wh120) { mf.wh120 = 1; say('WH120'); }
        } else {
          if (watchedRun >= 8 && beat >= 2 && !mf.s4) { s4arm = true; s4S0 = S; }
          watchedRun = 0; unwRun += h;
          if (s4arm && unwRun >= 6) { s4arm = false; mf.s4 = 1; say('S4', { gain: num(Math.max(0, S - s4S0), 1) }); }
          const k = Math.floor(unwRun / 10);
          if (k > unwPaid) {
            unwPaid = k; api.award(0.1, 'looking away'); api.stat.inc('wait-for-it.unwatched_seconds', 10);
            api.stat.max('wait-for-it.bestUnwatched', Math.round(unwRun)); bestUnw = Math.max(bestUnw, unwRun);
          }
        }
        if (!mf.minute && sim - lastBarClick >= 60) { mf.minute = 1; api.achieve('wait-for-it.minute'); }
      }
      function tidying(h) {
        if (beat === 4 && !stall.active && S < 50 && !cas) {
          if (!watched) tidy.acc += h;
          if (tidy.acc >= 25) {
            tidy.acc = 0; S = Math.max(harbour(), S - 3); walkUntil = sim + 1; say(tidyBag());
            tidy.check = sim + 4; tidy.failed = false;
          }
        }
        if (tidy.check) {
          if (sim < tidy.check && watched) tidy.failed = true;
          if (sim >= tidy.check) {
            tidy.check = 0;
            if (!tidy.failed) { api.award(0.5, 'serenity'); say('T4s'); } else say('T4');
          }
        }
      }
      function dependency(h) {
        if (!dep.on || dep.resolved || beat !== 5) return;
        dep.child = Math.min(100, dep.child + (100 / 45) * factor() * h);
        const t = sim - beatT0;
        if (t >= 6 && !fl.d3) { fl.d3 = 1; say('D3'); }
        if (t >= 10 && !fl.d2) { fl.d2 = 1; say('D2'); }
        if (t >= 25 && !fl.d9) { fl.d9 = 1; say('D9'); }
        if (t >= 40 && !fl.d10) { fl.d10 = 1; say('D10'); }
        if (t >= 55 && !fl.d11) { fl.d11 = 1; say('D11'); }
        if (dep.child >= 100 || t >= 75) {
          dep.resolved = true; say('D4'); advance(7.5); api.sfx('fanfare');
        }
      }
      function queueStep() {
        if (beat < 6) return;
        const t = sim - qT0;
        while (qi < QEV.length && t >= QEV[qi][0]) {
          const ev = QEV[qi][1]; qi++;
          if (ev === 'q1') say('Q1');
          else if (ev === 'gerald') { if (api.flag.get('metGerald')) say('Q2a'); else { say('Q2b'); api.flag.set('metGerald', true); } api.save.set('metGeraldSeen', true); }
          else if (ev === 'gary') { say('Q3'); if (api.stat.get('snail-marathon.pixels') > 0) after(3, function () { say('Q3b'); }); }
          else if (ev === 'gerald2') say('Q2c');
          else if (ev === 'half') { queue.insertBefore(el('span', { class: K('qc qhalf'), title: 'a fraction', text: '1/2' }), queue.lastChild); say('Q4'); }
          else if (ev === 'red') { queue.appendChild(redBtn); say('Q5'); }
          else if (ev === 'gary2') say('Q9');
          else if (ev === 'sockq') say('Q10');
        }
        if (slideUntil && sim >= slideUntil) { slideUntil = 0; tg(queue, 'slide', false); }
        else if (!slideUntil && sim - Math.max(lastFidget, lastSlide) >= 20) {
          lastSlide = sim; slideUntil = sim + 2; tg(queue, 'slide', true); if (beat <= 7) say(qBag());
        }
      }
      function etaTip() {
        if (sim >= etaNext) {
          etaNext = sim + 4.5 + api.rand() * 2.5; etaCount++; etaBase = etaBag();
          if (S >= 99) aboutN = Math.min(12, aboutN + 1);
        }
        if (!mf.a2 && sim >= 4) { mf.a2 = 1; say('A2'); }
        if (sim >= tipNext) { tipNext = sim + 12; tipText = tipBag(); }
      }
      function etaText() {
        if (cer) return cer.s >= 5 ? 'Now (previous).' : 'Now.';
        if (stall.active) return stall.n === 1 ? 'calculating. The calculator is also stalled.' : 'your number.';
        if (S >= 99) { let a = ''; for (let i = 0; i < aboutN; i++) a += 'about '; return a + '5 seconds.'; }
        if (beat === 6) return 'your number.';
        if (beat === 7) return etaCount % 2 ? 'one and a half Tuesdays.' : '2 Tuesdays, but only the quiet ones.';
        if (beat >= 8) return 'it depends on whether you are looking.';
        return etaBase;
      }
      function idleLadder() {
        const idle = sim - lastAct;
        if (!everInput) {
          if (!mf.a6 && idle >= 10) { mf.a6 = 1; say('A6'); }
          if (!mf.a7 && idle >= 25) { mf.a7 = 1; say('A7', { pct: Math.floor(clamp(S, 0, 99)) }); }
          if (!mf.a8 && idle >= 45) { mf.a8 = 1; say('A8'); }
        }
        if (idle >= 45 && sim >= mumNext) { mumNext = sim + 26 + api.rand() * 12; say(muBag(), { pct: Math.floor(clamp(S, 0, 99)) }); }
        while (idleI < IL_T.length && idle >= IL_T[idleI][0]) {
          const e = IL_T[idleI]; idleI++;
          say(e[1], e[2] ? { line: api.line(e[2]) } : null);
        }
        if (idle >= 600) { const n = Math.floor((idle - 600) / 90); if (n >= idleM) { idleM = n + 1; say(imBag()); } }
        const k = Math.floor(idle / 30);
        if (k > idleK) { idleK = k; api.award(0.2, 'nothing'); if (k === 1) say('I30'); }
        if (idle >= 60 && !i60) { i60 = true; say('I60'); }
        if (idle >= 120 && !i120) { i120 = true; say('I120', { gain: num(Math.max(0, S - histAgo(120)), 1) }); blushUntil = sim + 4; }
        if (idle >= 180 && !mf.party && !tabHidden) {
          mf.party = 1; party = { t0: sim, frozen: false, beeps: 0, end: 0 }; tg(win, 'party', true);
          say('I180'); after(3, function () { say('PA1'); }); api.stat.inc('wait-for-it.parties'); api.achieve('wait-for-it.party');
        }
      }
      function events(h) {
        rollAcc += h;
        while (rollAcc >= 1) {
          rollAcc -= 1;
          if (!mf.toast && beat >= 2 && sim >= hush && !sockEv && !auditEv && api.chance(api.selftest ? 1 / 150 : 1 / 900)) { mf.toast = 1; toast = { t0: sim, ph: 0 }; }
          if (!mf.sock && beat >= 3 && sim >= hush && !toast && !auditEv && !sockEv && api.chance(api.selftest ? 1 / 170 : 1 / 1200)) { mf.sock = 1; sockEv = { t0: sim, ph: 0 }; }
          if (!mf.audit && beat >= 2 && sim >= hush && !stall.active && !cas && !toast && !sockEv && !auditEv && api.chance(api.selftest ? 1 / 190 : 1 / 1100)) { mf.audit = 1; auditEv = { t0: sim, ph: 0 }; }
        }
        if (sockEv) {
          const t = sim - sockEv.t0;
          if (sockEv.ph === 0) { sockEv.ph = 1; say('SO1'); tg(sock, 'on', true); }
          if (sockEv.ph === 1 && t >= 4.5) {
            sockEv.ph = 2; say(api.flag.get('sockSeen') ? 'SO2b' : 'SO2', { pct: Math.floor(clamp(S, 0, 100)) });
            api.flag.set('sockSeen', true); api.stat.inc('wait-for-it.events'); api.sfx('pop'); // lint-ignore (sockSeen is a shared cast flag)
          }
          if (sockEv.ph === 2 && t >= 10) { sockEv = null; tg(sock, 'on', false); }
        }
        if (auditEv) {
          const t = sim - auditEv.t0;
          if (auditEv.ph === 0) { auditEv.ph = 1; say('AU1'); tg(clip, 'on', true); tg(wrap, 'still', true); api.sfx('tick'); }
          if (auditEv.ph === 1 && t >= 4) { auditEv.ph = 2; say('AU2'); }
          if (auditEv.ph === 2 && t >= 8.5) {
            auditEv.ph = 3; say(api.flag.get('metStapler') ? 'AU3s' : 'AU3'); tg(wrap, 'still', false);
            api.award(0.5, 'compliance'); api.stat.inc('wait-for-it.events'); api.sfx('stamp');
          }
          if (auditEv.ph === 3 && t >= 11) { auditEv = null; tg(clip, 'on', false); }
        }
        if (toast) {
          const t = sim - toast.t0;
          if (toast.ph === 0) { toast.ph = 1; say('TO1'); tg(puff, 'on', true); }
          if (toast.ph === 1 && t >= 4) { toast.ph = 2; say(api.flag.get('metToaster') ? 'TO2t' : 'TO2'); tg(bread, 'on', true); api.achieve('wait-for-it.toast'); api.stat.inc('wait-for-it.events'); api.sfx('pop'); }
          if (toast.ph === 2 && t >= 8) { toast = null; tg(puff, 'on', false); tg(bread, 'on', false); }
        }
      }
      function holdStep() {
        if (!holding) return;
        const d = api.now() - holdStart;
        if (d >= 2000 && holdStage < 1) { holdStage = 1; say('H2'); api.sfx('tick'); }
        if (d >= 7500 && holdStage < 2) { holdStage = 2; say('H75'); api.award(0.5, 'sitting'); }
        if (d >= 15000 && holdStage < 3) { holdStage = 3; say('H15'); }
        if (d >= 22000 && holdStage < 4) { holdStage = 4; say('H22'); }
        if (d >= 30000 && holdStage < 5) { holdStage = 5; say('H30'); api.achieve('wait-for-it.hand'); api.stat.inc('wait-for-it.holds'); api.sfx('ding'); }
        if (d > 90000) holding = false;
      }
      function story() {
        if (!fl.a4 && S >= 1.5) { fl.a4 = 1; say('A4'); }
        if (!mf.rev && active >= 180 && !cer && sim >= hush && (!party || party.frozen)) {
          mf.rev = 1; say('RV1', null, { pri: 2 });
          after(6, function () { say('RV2'); });
          after(12, function () { say('RV3'); });
          after(18, function () { say('RV4'); api.award(0.1, 'raise'); reviewEl.hidden = false; api.sfx('stamp'); });
        }
        if (!mf.ten && active >= 600 && !cer && sim >= hush) {
          mf.ten = 1; say('TM1', null, { pri: 2 }); api.sfx('bell');
          after(7, function () {
            say('TM2'); pins = Math.min(99, pins + 1); renderShelf(); saveAll();
            api.achieve('wait-for-it.tenmin'); api.stat.inc('wait-for-it.events'); api.award(1, 'long service'); api.confetti(undefined, undefined, 14); api.sfx('fanfare');
          });
          after(14, function () { say('TM3'); });
        }
        if (!cer && !stall.active && !cas && !dlg && beatBags[beat] && sim - lastSayT >= 22 && sim >= hush) say(beatBags[beat](), { pct: Math.floor(clamp(S, 0, 99)) });
        if (beat >= 2 && sim - beatT0 >= 4 && !mf.s7) { mf.s7 = 1; say('S7'); }
        if (!mf.c1 && (active >= 130 || beat >= 4)) { mf.c1 = 1; say('C1'); }
        if (beat === 7) {
          const ui = fl.ui || 0;
          if (ui < UT.length && S >= UT[ui][0]) { fl.ui = ui + 1; say(UT[ui][1], { x: num(UT[ui][1] === 'U1' ? S * 0.11 : S / 20, 1), pct: Math.floor(S) }); }
        }
        if (beat === 8) {
          const vi = fl.vi || 0;
          if (vi < 7 && S >= VTH[vi]) {
            fl.vi = vi + 1;
            if (vi === 4) { if (!fl.v5) { fl.v5 = 1; say('V5', { gain: num(Math.max(0, S - histAgo(20)), 1) }); } } else say('V' + (vi + 1));
          }
          if (!watched && unwRun >= 20 && !mf.surge8) {
            mf.surge8 = 1; fl.v5 = 1; say('V5', { gain: num(Math.max(0, S - histAgo(20)), 1) }); api.award(0.3, 'thanks'); api.stat.inc('wait-for-it.surges'); api.sfx('ding');
          }
        }
        if (S >= 99 && !cer) {
          if (!fl.x1) { fl.x1 = 1; say('X1'); }
          if (q >= 1 && !fl.x2) { fl.x2 = 1; say('X2'); }
          if (q >= 2 && !fl.x3) { fl.x3 = 1; say('X3'); }
          if (q >= 2.5 && !fl.x5) { fl.x5 = 1; say('X5'); }
          if (q >= 2.8 && !fl.x7) { fl.x7 = 1; say('X7'); }
        }
      }
      function checkBeat() {
        let nb = beat;
        const sa = active - sA0;          // time within this season: the fallbacks must not fire early in Season 2
        if (beat === 1 && (S >= 12 || sa >= 60)) nb = 2;
        else if (beat === 2 && (S >= 26 || sa >= 120)) nb = 3;
        else if (beat === 3 && ((S >= 37.5 && stall.done1) || sa >= 190)) nb = 4;
        else if (beat === 4 && (S >= 50 || sa >= 260)) nb = 5;
        else if (beat === 5 && dep.resolved) nb = 6;
        else if (beat === 6 && (S >= 70 || sa >= 380)) nb = 7;
        else if (beat === 7 && S >= 84) nb = 8;
        else if (beat === 8 && S >= 95) nb = 9;
        if (nb !== beat) enterBeat(nb);
      }
      function enterBeat(nb) {
        beat = nb; beatT0 = sim;
        if (nb === 2) say('S1');
        if (nb === 3) { logNext = sim; say('S8'); }
        if (nb === 5) {
          dep = { on: true, child: 0, resolved: false }; say('D1');
          if (S < 50) { stall.done1 = true; S = 50; maxS = Math.max(maxS, S); walkUntil = sim + 1; after(3, function () { say('D0'); }); }
        }
        if (nb === 6) { qT0 = sim; qi = 0; lastSlide = sim; }
        if (nb === 8) say('U7');
      }
      function misc() {
        if (beat >= 3 || detailsOpen) {
          if (sim >= logNext) { logNext = sim + 4 + api.rand() * 4; addLog(logBag()); }
        }
        if (!mf.cozyChecked && sim > 3) { mf.cozyChecked = 1; checkCozy(); }
        if (api.selftest) {
          const el2 = (api.now() - mountedAt) / 1000;
          if (el2 > 35 && beat < 9 && !hatch1) {
            hatch1 = true; stall.done1 = true; stall.done2 = true; dep.resolved = true; S = Math.max(S, 95); maxS = Math.max(maxS, S);
            while (beat < 8) enterBeat(beat + 1);
          }
          if (el2 > 55 && !cer && !hatch2) { hatch2 = true; S = Math.max(S, 99); q = Math.max(q, 2.99); flick = 3; startCeremony(); }
        }
      }
      function checkCozy() { if (!mf.cozy && root.clientWidth > 0 && root.clientWidth < 420) { mf.cozy = 1; say('CZ'); api.stat.inc('wait-for-it.events'); } }

      /* ---------- the ceremony and the next season ---------- */
      function startCeremony() {
        cer = { t0: sim, s: 0, said: false };
        S = 100; maxS = 100; q = 3; hush = sim + 44; instFill.style.setProperty('--p', '0'); instLbl.textContent = 'Installing trophy  0%'; stall.active = false; cas = null; curtainUntil = 0; setDlg(0);
        if (party) { party = null; tg(win, 'party', false); tg(win, 'frozen', false); tg(wrap, 'frozen', false); }
        sockEv = null; auditEv = null; tg(sock, 'on', false); tg(clip, 'on', false); tg(wrap, 'still', false);
        plaqueTxt.textContent = ''; api.sfx('bell'); titleAt = 0; api.setTitle('Wait For It(TM) - 100%');
      }
      function stepCer() {
        const c = sim - cer.t0, F = { force: true, pri: 2 };
        if (c >= 1 && cer.s < 1) { cer.s = 1; say('E1', null, { force: true, pri: 2, sincere: true, mood: 'proud' }); }
        if (c >= 1) plaqueTxt.textContent = 'WAITED.'.slice(0, Math.min(7, 2 * Math.floor((c - 1) / 0.15 + 1)));
        if (c >= 3.5 && cer.s < 2) { cer.s = 2; api.flag.set('metGerald', true); say('E2', null, F); }
        if (c >= 8 && cer.s < 3) {
          cer.s = 3; say('E3', null, { force: true, pri: 2, sincere: true, mood: 'proud' });
          api.confetti(undefined, undefined, 20); api.achieve('wait-for-it.trophy'); api.stat.inc('wait-for-it.trophies');
          trophies = Math.min(5, trophies + 1); saveAll();
        }
        if (c >= 11 && cer.s < 4) { cer.s = 4; say('E4', null, { force: true, pri: 2, sincere: true, mood: 'proud' }); }
        if (c >= 17 && cer.s < 5) { cer.s = 5; say('E6', null, F); }
        if (c >= 17 && c < 21) { const ip = (c - 17) / 4 * 37.5; instFill.style.setProperty('--p', String(ip / 100)); instLbl.textContent = 'Installing trophy  ' + num(ip, 1) + '%'; }
        if (c >= 21 && cer.s < 6) {
          cer.s = 6; say('E6b', null, F); api.sfx('error');
          instFill.style.setProperty('--p', '0.375'); instLbl.textContent = 'Installing trophy  37.5%';
        }
        if (c >= 24 && cer.s < 7) {
          cer.s = 7; say('E7', null, F);
          for (let i = 0; i < chips.children.length; i++) chips.children[i].textContent = (chips.children[i]._name || 'Percent') + ' (0.3)';
        }
        if (c >= 28) newSeason();
      }
      function newSeason() {
        cer = null; hush = 0; season++; api.stat.inc('wait-for-it.seasons');
        S = 1; maxS = 1; q = 0; flick = 0; beat = 1; beatT0 = sim; hist = []; histAcc = 0; sA0 = active;
        stall = { active: false, n: 0, until: 0, done1: false, done2: false, clicks0: 0, witness: true, wit: false };
        tidy = { acc: 0, check: 0, failed: false }; dep = { on: false, child: 0, resolved: false }; fl = {};
        mf.surge8 = 0; mf.rev2 = 0; qi = 0; slideUntil = 0; tg(queue, 'slide', false);
        etaBase = ETA[0]; etaNext = sim + 6; tipNext = sim + 12; aboutN = 1; etaCount = 0; tipText = TIPS[0];
        const bumped = noticeNo < 12; if (bumped) noticeNo = 12;
        buildQueue(); plaqueTxt.textContent = ''; plaqueSub.hidden = false; gerEl.classList.remove(K('on'));
        notes.textContent = ''; printNote('Notice of Appreciation', 'All previous notices are withdrawn. You did very well, in the sense that you came back.');
        renderShelf(); saveAll();
        say('E8', { season: season }); if (bumped) after(3, function () { say('E12'); }); after(6, function () { say('E10'); });
        if (!e13Seen) { e13Seen = true; api.save.set('e13', true); after(9, function () { say('E13'); }); }
        if (season >= 3) after(12, function () { say('E11'); });
        after(15, function () { say('E14', { season: season }); });
        api.setTitle('Wait For It(TM) - 1%');
      }

      /* ---------- render ---------- */
      function readout() {
        if (cer) return ['100.0', '%'];
        if (flick === 1) { flick = 2; return ['37.5', '%']; }
        if (beat === 7 && S >= 70 && S < 84) {
          if (S < 76) return [num(S * 0.11, 1), ' elevenths'];
          if (S < 80) return [num(S / 20, 1), ' Tuesdays'];
          return [String(Math.floor(S)), ' enough'];
        }
        return [pctText(S, S >= 99 ? Math.max(1, Math.floor(q)) : 1), '%'];
      }
      function render() {
        const shown = cer ? 100 : (cas && cas.ph < 2 ? 0 : S);
        put('r', (100 - clamp(shown, 0, 100)).toFixed(2) + '%', function (v) { bar.style.setProperty('--r', v); });
        const rd = readout();
        put('rn', rd[0], function (v) { rNum.textContent = v; }); put('ru', rd[1], function (v) { rUnit.textContent = v; });
        put('task', cer ? (cer.s >= 5 ? 'Installing trophy' : TITLES[10]) : TITLES[clamp(beat, 1, 9)], function (v) { taskEl.textContent = v; });
        put('eta', 'Estimated time remaining: ' + etaText(), function (v) { etaEl.textContent = v; });
        const bubOn = sim < bubUntil && !cer && !!bubText;
        put('tip', cer && cer.s >= 1 ? '' : (bubOn ? bubText : tipText), function (v) { tipEl.textContent = v; });
        tg(tipEl, 'tipb', bubOn);
        const norsp = stall.active || (!!cer && cer.s >= 6);
        tg(wrap, 'norsp', norsp);
        put('tbt', norsp ? 'Wait For It(TM) Setup (Not Responding)' : 'Wait For It(TM) Setup', function (v) { tbt.textContent = v; });
        put('mode', cas && cas.ph === 0 ? 'rew3' : sim < rewUntil ? 'rew' : sim < walkUntil ? 'walk' : '', function (v) {
          tg(wrap, 'rew', false); tg(wrap, 'rew3', false); tg(wrap, 'walk', false); if (v) tg(wrap, v, true);
        });
        put('beat', String(beat), function (v) { wrap.setAttribute('data-beat', v); });
        put('fill', beat >= 7 && S >= 80 ? 'mus' : (beat >= 7 && S >= 70 ? 'lil' : 'mint'), function (v) { wrap.setAttribute('data-fill', v); });
        tg(wrap, 'watch', watched && beat >= 2 && !cer); tg(wrap, 'stall', stall.active); tg(wrap, 'ribbon', !!cer);
        tg(wrap, 'narrow', season >= 2); tg(wrap, 'blush', sim < blushUntil);
        tg(gold, 'on', beat >= 8 || !!cer); tg(curtain, 'on', curtainUntil > sim);
        show(lookBtn, beat >= 2 || active >= 20); show(cancelBtn, active >= 130 || beat >= 4); show(runBtn, active >= 155 || beat >= 4);
        show(skipBtn, active >= 390 || beat >= 8); show(numBtn, beat >= 6); show(regardBox, beat >= 2 || active >= 20);
        show(queue, beat >= 6); show(survey, beat >= 7); show(kids, dep.on && !dep.resolved && beat === 5);
        show(decoy, bgOn); show(mini, bgOn); show(detail, detailsOpen); show(stage, !!cer); show(instBar, !!cer && cer.s >= 5);
        show(cool, !!cas && cas.ph === 1); show(cert, !!cas && cas.ph >= 2); show(fasterChip, sim < fasterUntil);
        tg(detBtn, 'pulsing', beat >= 3 && !detailsOpen);
        tg(trobox, 'rise', !!cer && cer.s >= 1); tg(gerEl, 'on', !!cer && cer.s >= 2);
        if (qGer) tg(qGer, 'gone', !!cer && cer.s >= 2);
        plaqueSub.hidden = season < 2;
        put('gauge', Math.round(regard * 100), function (v) { gaugeB.style.width = v + '%'; });
        put('child', Math.round(dep.child), function (v) { childFill.style.setProperty('--p', String(v / 100)); thirdFill.style.setProperty('--p', String(v / 200)); });
        const sNow = clamp(cer ? 100 : S, 0, 100);
        put('mini', Math.round(sNow), function (v) { miniFill.style.setProperty('--p', String(v / 100)); });
        put('decoy', Math.round(clamp(sNow * 0.9 + Math.sin(sim * 0.4) * 1.5, 0, 100) * 2), function (v) { decoyFill.style.setProperty('--p', String(v / 200)); });
      }

      /* ---------- events ---------- */
      function onKey(e) {
        const t = e.target, tag = String((t && t.tagName) || ''), k = String(e.key || '');
        markInput();
        if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || e.repeat || /^(Tab|Shift|Control|Alt|Meta|CapsLock)$/.test(k)) return;
        if ((k === ' ' || k === 'Enter' || k === 'Spacebar') && tag === 'BUTTON') return;
        nFid++; lastFidget = sim; api.stat.inc('wait-for-it.fidgets');
        if (slideUntil) { slideUntil = 0; tg(queue, 'slide', false); if (sim - lastX >= 20) { lastX = sim; say('Q8'); } }
        if (nFid === 1) say('F1'); else if (nFid === 3) say('F2'); else if (nFid === 10) say('F10'); else if (nFid === 25) say('F25');
        else if (nFid > 25 && nFid % 15 === 0 && sim - lastFB >= 8) { lastFB = sim; say(fbBag(), { count: nFid }); }
        if (k.length === 1 && /[a-z]/i.test(k)) {
          kbuf = (kbuf + k.toLowerCase()).slice(-12);
          Object.keys(WORDS).forEach(function (w) {
            if (kbuf.slice(-w.length) !== w || (wordAt[w] !== undefined && sim - wordAt[w] < 20)) return;
            if (w === 'please') { if (mf.please) return; mf.please = 1; }
            wordAt[w] = sim; kbuf = '';
            if (w === 'faster') fasterUntil = sim + 30;
            say(WORDS[w]);
          });
        }
      }
      // Touch: emulated mouse events and pointerleave-after-lift must not count as hovering or as walking away,
      // otherwise a phone player would be "watched" forever or "absent" between taps. A touch is watched for 4 s (lastInput) only.
      const isTouchEv = function (e) { return !!(e && e.pointerType === 'touch') || api.now() - lastTouchMs < 1500; };
      function enterWin(e) { if (isTouchEv(e)) return; overWindow = true; if (beat >= 2 && !mf.s2 && !cer) { mf.s2 = 1; say('S2'); } }
      function cancelHold() { holding = false; }
      function rootIn(e) { if (isTouchEv(e)) return; inRoot = true; pointerSeen = true; if (absent) { absent = false; comeBack(sim - outSince); } }
      function rootOut(e) { if (isTouchEv(e)) return; inRoot = false; outSince = sim; overWindow = false; overBar = false; }
      api.on(win, 'pointerenter', enterWin); api.on(win, 'mouseenter', enterWin);
      api.on(win, 'pointermove', function (e) { if (!isTouchEv(e)) overWindow = true; });
      api.on(win, 'pointerleave', function () { overWindow = false; overBar = false; });
      api.on(win, 'mouseleave', function () { overWindow = false; overBar = false; });
      api.on(root, 'pointermove', rootIn);
      api.on(root, 'pointerenter', rootIn);
      api.on(root, 'pointerleave', rootOut);
      api.on(root, 'mouseleave', rootOut);
      api.on(root, 'pointerdown', function (e) {
        if (e && e.pointerType === 'touch') lastTouchMs = api.now();
        else if (!isTouchEv(e)) { inRoot = true; pointerSeen = true; }
        markInput();
      }, { capture: true });
      api.on(root, 'touchstart', function () { lastTouchMs = api.now(); markInput(); }, { capture: true, passive: true });
      api.on(document, 'keydown', onKey);
      api.on(bar, 'pointerenter', function (e) { if (!isTouchEv(e)) overBar = true; });
      api.on(bar, 'pointermove', function (e) {
        if (!isTouchEv(e)) overBar = true;
        if (holding && Math.hypot((e.clientX || 0) - holdX, (e.clientY || 0) - holdY) > 12) cancelHold();
      });
      api.on(bar, 'pointerleave', function () { overBar = false; cancelHold(); });
      api.on(bar, 'pointercancel', cancelHold);
      api.on(bar, 'pointerdown', function (e) {
        if (e.button > 0) return;
        holding = true; holdStart = api.now(); holdX = e.clientX || 0; holdY = e.clientY || 0; holdStage = 0; heldLong = false;
      });
      api.on(bar, 'pointerup', function () {
        if (!holding) return;
        const dur = api.now() - holdStart; holding = false;
        if (dur >= 2000) { heldLong = true; heldUntil = api.now() + 400; if (holdStage >= 5) say('HR'); }
      });
      api.on(bar, 'focus', function () {
        let kbd = true;
        try { kbd = bar.matches(':focus-visible'); } catch (e) { kbd = true; }
        barFocused = kbd; markInput();
        if (kbd && !mf.kb) { mf.kb = 1; say('KB'); }
      });
      api.on(bar, 'blur', function () { barFocused = false; });
      api.on(document, 'visibilitychange', function () {
        const hid = !!(document.hidden || document.visibilityState === 'hidden');
        if (hid) { tabHidden = true; hiddenAt = api.now(); cancelHold(); return; }
        tabHidden = false;
        if (!hiddenAt) return;
        const away = (api.now() - hiddenAt) / 1000; hiddenAt = 0; lastTs = 0;
        darkBank = Math.min(6, 1.4 * away); comeBack(away);
      });
      api.on(window, 'resize', checkCozy);

      /* ---------- go ---------- */
      function tick(ts) {
        if (api.destroyed) return;
        if (typeof ts !== 'number') ts = api.now();
        let real = (ts - lastTs) / 1000;
        if (!lastTs || !(real > 0)) real = lastTs ? 0 : 0.016;
        if (real > 0.25) real = 0.25;
        lastTs = ts;
        if (!tabHidden) {
          let rem = real * SPEED;
          while (rem > 1e-6) { const h = Math.min(rem, 0.25); step(h); rem -= h; }
          render();
        }
        api.requestAnimationFrame(tick);
      }
      renderShelf();
      api.setTitle('Wait For It(TM) - 1%');
      if (season >= 2) { plaqueSub.hidden = false; printNote('Notice of Appreciation', 'All previous notices are withdrawn. You did very well, in the sense that you came back.'); }
      render();
      api.setTimeout(function () { say(season >= 2 ? 'A3' : 'A1'); }, 1200);
      api.setTimeout(function () { if (nClicks === 0 && season < 2) say('A5'); }, 7400);
      api.requestAnimationFrame(tick);

      return {
        destroy() { saveAll(); }
      };
    }
  });
})();
