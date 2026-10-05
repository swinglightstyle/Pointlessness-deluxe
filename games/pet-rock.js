/* POINTLESS module: pet-rock */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const K = 'm-pet-rock-';
  let polished = false;                 // survives remounts, not a page reload

  P.injectCSS(`
.m-pet-rock-app{--ink:#2b2433;--cream:#fff4d6;--paper:#fbf1dc;--slate:#8e9aa6;--hi:#b7c1cb;--shade:#5e6a77;--mint:#9ee6c3;--coral:#ff8a78;--must:#f2c14e;--lilac:#bfa8f0;--moss:#7aa07a;--night:#2a2750;
display:grid;grid-template-columns:minmax(0,57fr) minmax(0,43fr);gap:14px;align-items:start;color:var(--ink);font:14px/1.35 system-ui,"Segoe UI",Roboto,sans-serif;
background:radial-gradient(#0000000f 1px,transparent 1px) 0 0/14px 14px;position:relative;min-height:420px}.m-pet-rock-app *,.m-pet-rock-modalwrap *{box-sizing:border-box}
.m-pet-rock-modalwrap{--ink:#2b2433;--cream:#fff4d6;--paper:#fbf1dc;--slate:#8e9aa6;--hi:#b7c1cb;--shade:#5e6a77;--mint:#9ee6c3;--coral:#ff8a78;--must:#f2c14e;--lilac:#bfa8f0;color:var(--ink);font:14px/1.35 system-ui,"Segoe UI",Roboto,sans-serif}
.m-pet-rock-stamped{animation:m-pet-rock-stampin .4s ease-out 1}.m-pet-rock-col{display:flex;flex-direction:column;gap:12px;min-width:0}
.m-pet-rock-card{background:var(--paper);border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);padding:10px;min-width:0}
.m-pet-rock-h{margin:0 0 6px;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;font-weight:900}
.m-pet-rock-btn{font:inherit;font-weight:800;min-height:48px;padding:6px 10px;border:3px solid var(--ink);border-radius:12px;background:var(--cream);color:var(--ink);box-shadow:0 4px 0 var(--ink);cursor:pointer;
display:inline-flex;align-items:center;justify-content:center;gap:6px;touch-action:manipulation;user-select:none;-webkit-user-select:none;transition:transform .06s,box-shadow .06s,filter .15s}
.m-pet-rock-btn:hover:not(:disabled){filter:brightness(1.06)}.m-pet-rock-btn:active:not(:disabled),.m-pet-rock-btn.m-pet-rock-held{transform:translateY(3px);box-shadow:0 1px 0 var(--ink)}
.m-pet-rock-btn:disabled{opacity:.55;cursor:not-allowed;box-shadow:0 2px 0 var(--ink)}
.m-pet-rock-app button:focus-visible,.m-pet-rock-app input:focus-visible,.m-pet-rock-clive:focus-visible,.m-pet-rock-pebble:focus-visible{outline:3px solid #5a3df0;outline-offset:2px}
.m-pet-rock-key{font-weight:700;opacity:.7;font-size:.7rem}.m-pet-rock-b-walk,.m-pet-rock-b-sup{touch-action:none;-webkit-touch-callout:none}
.m-pet-rock-skip{position:absolute;right:8px;top:8px;min-height:36px;padding:2px 10px;font-size:.72rem;box-shadow:0 2px 0 var(--ink)}.m-pet-rock-strike{text-decoration:line-through;opacity:.7}
.m-pet-rock-court{background:#fff;border:3px solid var(--ink);border-radius:10px;padding:6px 10px;margin:8px 0;font-weight:700}.m-pet-rock-speech{height:12px;border:2px solid var(--ink);border-radius:8px;background:#fff;overflow:hidden}
.m-pet-rock-speech i{display:block;height:100%;width:0;background:var(--lilac)}.m-pet-rock-speech.m-pet-rock-go i{width:100%;transition:width 4s linear}.m-pet-rock-tx{font:700 .78rem/1.3 ui-monospace,Consolas,monospace;border:2px dashed var(--ink);border-radius:8px;padding:6px;margin:8px 0;text-align:center}
.m-pet-rock-b-feed{background:var(--must)}.m-pet-rock-b-walk{background:var(--mint)}.m-pet-rock-b-sup{background:var(--coral)}.m-pet-rock-b-tuck{background:var(--lilac)}.m-pet-rock-b-diary{background:#fff}
.m-pet-rock-b-ask{background:var(--cream);border-style:dashed}.m-pet-rock-bar{display:flex;flex-wrap:wrap;gap:8px}.m-pet-rock-bar .m-pet-rock-btn{flex:1 1 96px;flex-direction:column;gap:0;line-height:1.15;padding:4px 6px}.m-pet-rock-brow{display:inline-flex;gap:5px;align-items:center;justify-content:center}
.m-pet-rock-habitat{position:relative;aspect-ratio:4/3;min-height:260px;max-height:min(440px,52vh);width:100%;overflow:hidden;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);background:#bfe6ff;touch-action:manipulation;user-select:none;-webkit-user-select:none}
.m-pet-rock-habitat.m-pet-rock-dragwalk,.m-pet-rock-habitat.m-pet-rock-walking{touch-action:none}.m-pet-rock-sky{position:absolute;inset:0;background:linear-gradient(#bfe6ff 0%,#ffe9b8 72%);transition:background .6s}
.m-pet-rock-sky::after{content:"";position:absolute;left:0;right:0;top:0;height:60%;background:radial-gradient(ellipse at 20% 40%,#fff9 0 14%,transparent 15%),radial-gradient(ellipse at 62% 28%,#fff9 0 10%,transparent 11%),radial-gradient(ellipse at 84% 56%,#fff8 0 12%,transparent 13%)}
.m-pet-rock-is-night .m-pet-rock-sky{background:linear-gradient(#2a2750,#4a3f7a)}.m-pet-rock-is-night .m-pet-rock-sky::after{opacity:.12}
.m-pet-rock-lay{position:absolute;left:0;width:200%;display:flex;pointer-events:none;will-change:transform}
.m-pet-rock-hills{bottom:30%;height:30%;background:radial-gradient(ellipse at 50% 100%,#9ecfa0 0 62%,transparent 63%) 0 0/12.5% 100% repeat-x,radial-gradient(ellipse at 50% 100%,#7fb88a 0 55%,transparent 56%) 6% 0/17% 76% repeat-x}
.m-pet-rock-mid{bottom:28%;height:30%;align-items:flex-end;font-size:1.5rem}.m-pet-rock-half{width:50%;display:flex;justify-content:space-around;align-items:flex-end}
.m-pet-rock-dogs{bottom:26%;height:20%;align-items:flex-end;font-size:1.6rem}
.m-pet-rock-ground{position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(#d3b283,#b99366);border-top:3px solid var(--ink)}
.m-pet-rock-groundL{bottom:0;height:34%;background:repeating-linear-gradient(90deg,transparent 0 46px,#0000001a 46px 50px)}
.m-pet-rock-doily{position:absolute;left:50%;bottom:4%;width:76%;height:30%;transform:translateX(-50%);border-radius:50%;border:2px solid #d8bf8a;background:repeating-radial-gradient(circle at 50% 50%,#fffaf0 0 7px,#f1dfba 7px 9px)}
.m-pet-rock-lamp{position:absolute;left:5%;top:7%;width:46px;height:62px;z-index:3;transition:opacity .5s}
.m-pet-rock-lamphead{position:absolute;left:2px;top:0;width:34px;height:18px;background:var(--must);border:3px solid var(--ink);border-radius:18px 18px 4px 4px;transform:rotate(-14deg);transform-origin:80% 80%}
.m-pet-rock-lamparm{position:absolute;left:30px;top:12px;width:5px;height:42px;background:var(--ink);transform:rotate(18deg);transform-origin:50% 0}
.m-pet-rock-lampbase{position:absolute;left:14px;bottom:0;width:30px;height:8px;background:var(--ink);border-radius:6px}
.m-pet-rock-cone{position:absolute;left:5%;top:16%;width:46%;height:68%;clip-path:polygon(4% 0,0 4%,100% 100%,38% 100%);background:linear-gradient(150deg,rgba(242,193,78,.6),rgba(242,193,78,0));opacity:.55;transition:opacity .6s;pointer-events:none;z-index:2}
.m-pet-rock-is-night .m-pet-rock-cone{opacity:1}.m-pet-rock-dim .m-pet-rock-cone,.m-pet-rock-dim .m-pet-rock-lamp{opacity:.15}
.m-pet-rock-flicker .m-pet-rock-cone,.m-pet-rock-flicker .m-pet-rock-lamp{animation:m-pet-rock-flick 3s steps(1) 1}
.m-pet-rock-clock{position:absolute;right:4%;top:5%;width:48px;height:48px;border-radius:50%;background:var(--must);border:3px solid var(--ink);box-shadow:0 0 0 5px #f2c14e66;z-index:3}
.m-pet-rock-hand{position:absolute;left:calc(50% - 1px);bottom:50%;width:2px;background:var(--ink);border-radius:2px;transform-origin:50% 100%}
.m-pet-rock-hm{height:17px;animation:m-pet-rock-spin 11s linear infinite reverse}.m-pet-rock-hh{height:11px;width:3px;animation:m-pet-rock-spin 70s linear infinite reverse}
.m-pet-rock-c317 .m-pet-rock-hm{animation:none;transform:rotate(102deg)}.m-pet-rock-c317 .m-pet-rock-hh{animation:none;transform:rotate(98deg)}
.m-pet-rock-clocklbl{position:absolute;right:2%;top:calc(5% + 56px);z-index:3;font-size:.62rem;font-weight:800;background:var(--cream);border:2px solid var(--ink);border-radius:6px;padding:0 4px}
.m-pet-rock-clive{position:absolute;left:50%;bottom:12%;width:50%;max-width:260px;transform:translateX(-50%);cursor:pointer;z-index:4;border-radius:50%/40%}.m-pet-rock-shift{transform:translateX(calc(-50% + 1px))}
.m-pet-rock-left1{transform:translateX(calc(-50% - 1px))}
.m-pet-rock-svg{display:block;width:100%;height:auto;overflow:visible;transform-origin:50% 92%;animation:m-pet-rock-breathe 6s ease-in-out infinite;rotate:var(--m-pet-rock-tilt,0deg)}
.m-pet-rock-squish .m-pet-rock-svg{animation:m-pet-rock-squish .14s ease-out 1}.m-pet-rock-chew .m-pet-rock-svg{animation:m-pet-rock-chew .5s ease-in-out 1}
.m-pet-rock-needle{transform-origin:32px 34px;animation:m-pet-rock-jit 2.2s ease-in-out infinite}.m-pet-rock-crumbs{position:absolute;inset:0;pointer-events:none;z-index:5}
.m-pet-rock-crumb{position:absolute;font-size:1.25rem;animation:m-pet-rock-drop .35s ease-out 1}.m-pet-rock-pebble{position:absolute;left:70%;bottom:8%;z-index:6;border:0;background:none;cursor:pointer;padding:6px}
.m-pet-rock-pebble i{display:block;width:34px;height:24px;border-radius:50% 50% 45% 45%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,var(--hi),var(--slate) 60%,var(--shade));border:3px solid var(--ink)}
.m-pet-rock-pebble.m-pet-rock-pop i{animation:m-pet-rock-squish .25s}
.m-pet-rock-due{position:absolute;right:-4px;top:-6px;background:var(--coral);border:2px solid var(--ink);border-radius:8px;font-size:.55rem;font-weight:900;padding:0 4px;white-space:nowrap}
.m-pet-rock-you{position:absolute;left:12%;bottom:7%;z-index:6;font-size:.62rem;font-weight:800;text-align:center}
.m-pet-rock-you i{display:block;margin:0 auto 1px;width:22px;height:16px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--hi),var(--slate));border:2px solid var(--ink)}
.m-pet-rock-you b{white-space:nowrap;background:var(--cream);border:2px solid var(--ink);border-radius:5px;padding:0 3px}
.m-pet-rock-leash{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:7;opacity:0;transition:opacity .25s}.m-pet-rock-walking .m-pet-rock-leash{opacity:1}
.m-pet-rock-handle{position:absolute;font-size:1.2rem;z-index:7;pointer-events:none;opacity:0;transition:opacity .25s;left:0;top:0}.m-pet-rock-walking .m-pet-rock-handle{opacity:1}
.m-pet-rock-odo{position:absolute;left:6px;right:6px;bottom:6px;z-index:9;text-align:center;font:700 .7rem/1.25 ui-monospace,Consolas,monospace;background:#fff4d6ee;border:2px solid var(--ink);border-radius:8px;padding:2px 4px;opacity:0;transition:opacity .3s;pointer-events:none}
.m-pet-rock-odo.m-pet-rock-on{opacity:1}.m-pet-rock-scn{position:absolute;bottom:24%;left:0;z-index:5;font-size:1.9rem;opacity:0;pointer-events:none}.m-pet-rock-cross{animation:m-pet-rock-cross 4s linear 1 forwards}
.m-pet-rock-crossl{animation:m-pet-rock-crossl 4s linear 1 forwards}.m-pet-rock-drops{position:absolute;inset:0;pointer-events:none;z-index:8;display:none}.m-pet-rock-is-rain .m-pet-rock-drops{display:block}
.m-pet-rock-drop{position:absolute;top:-8%;font-size:.8rem;animation:m-pet-rock-rain 1.1s linear infinite}
.m-pet-rock-nightov{position:absolute;inset:0;z-index:8;pointer-events:none;opacity:0;transition:opacity .7s;background:radial-gradient(circle at 50% 62%,transparent 60px,rgba(20,18,50,.38) 140px)}
.m-pet-rock-nightov.m-pet-rock-on{opacity:1}
.m-pet-rock-napkin{position:absolute;left:50%;bottom:7%;width:48%;height:15%;z-index:6;transform:translate(-50%,-300%);opacity:0;transition:transform .55s ease,opacity .3s;pointer-events:none;background:repeating-linear-gradient(45deg,#fff 0 7px,#cfe8ff 7px 14px);border:3px solid var(--ink);border-radius:10px}
.m-pet-rock-napkin.m-pet-rock-on{transform:translate(-50%,0);opacity:.94}
.m-pet-rock-ringsvg{position:absolute;left:50%;top:58%;width:50%;max-width:260px;transform:translate(-50%,-50%);z-index:7;pointer-events:none;opacity:0;transition:opacity .25s;overflow:visible}
.m-pet-rock-shake{animation:m-pet-rock-shake .5s linear 1}
.m-pet-rock-sign{position:absolute;left:62%;bottom:15%;z-index:7;background:#fff;border:3px solid var(--ink);border-radius:6px;font-weight:900;font-size:.62rem;padding:2px 6px;transform:rotate(6deg);box-shadow:2px 2px 0 var(--ink)}
.m-pet-rock-sign[hidden],.m-pet-rock-tiny[hidden]{display:none}
.m-pet-rock-tiny{position:absolute;right:8%;bottom:34%;z-index:12;width:34px;height:20px;background:repeating-linear-gradient(45deg,#fff 0 4px,#cfe8ff 4px 8px);border:2px solid var(--ink);border-radius:5px;animation:m-pet-rock-bob 1.2s ease-in-out infinite alternate}
@keyframes m-pet-rock-shake{0%,100%{transform:translate(0,0)}25%{transform:translate(.4px,.4px)}50%{transform:translate(-.4px,0)}75%{transform:translate(.2px,-.4px)}}.m-pet-rock-ringsvg.m-pet-rock-on{opacity:1}
.m-pet-rock-heart{position:absolute;bottom:30%;z-index:8;font-size:1.1rem;opacity:0;pointer-events:none}.m-pet-rock-heart.m-pet-rock-go{animation:m-pet-rock-heart 1.4s ease-out 1 forwards}
.m-pet-rock-alert{position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:12;max-width:86%;font:inherit;font-weight:800;font-size:.82rem;background:var(--coral);border:3px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink);padding:6px 12px;cursor:pointer;animation:m-pet-rock-pulse .6s ease-in-out infinite alternate}
.m-pet-rock-alert[hidden],.m-pet-rock-snap[hidden],.m-pet-rock-hill[hidden],.m-pet-rock-pebble[hidden],.m-pet-rock-you[hidden],.m-pet-rock-care[hidden],.m-pet-rock-tray[hidden],.m-pet-rock-sup[hidden]{display:none}
.m-pet-rock-snap{position:absolute;right:5%;bottom:38%;z-index:12;font:inherit;font-weight:800;background:#fff;border:3px solid var(--ink);border-radius:12px;padding:6px 10px;cursor:pointer;box-shadow:3px 3px 0 var(--ink)}
.m-pet-rock-siren{position:absolute;left:0;right:0;top:0;z-index:13;text-align:center;font-size:1.3rem;background:#ff3b3b55;display:none;pointer-events:none}
.m-pet-rock-siren.m-pet-rock-on{display:block;animation:m-pet-rock-pulse .25s linear infinite alternate}
.m-pet-rock-hill{position:absolute;left:50%;bottom:11%;width:58%;height:46%;transform:translateX(-50%);z-index:9;border:3px solid var(--ink);border-radius:50% 50% 10% 10%/80% 80% 10% 10%;cursor:pointer;font-size:1.3rem;line-height:1.1;overflow:hidden;
background:radial-gradient(circle at 30% 30%,#ffd88a 0 18px,transparent 19px),radial-gradient(circle at 70% 40%,#e9a1ff 0 20px,transparent 21px),radial-gradient(circle at 50% 70%,#9ee6c3 0 24px,transparent 25px),#d9b36b;color:var(--ink);padding:0}
.m-pet-rock-hill::before,.m-pet-rock-hill::after{content:"";position:absolute;top:10%;width:22px;height:22px;border-radius:50%;background:#fff;border:2px solid var(--ink)}
.m-pet-rock-hill::before{left:34%}.m-pet-rock-hill::after{right:34%}.m-pet-rock-memos{position:absolute;right:6px;top:70px;width:min(46%,236px);z-index:11;display:flex;flex-direction:column;gap:6px;pointer-events:none}
.m-pet-rock-memo{pointer-events:auto;display:block;text-align:left;font:inherit;font-size:.7rem;line-height:1.25;background:#fff7b8;border:2px solid var(--ink);border-radius:6px;padding:6px 8px;box-shadow:3px 3px 0 var(--ink);transform:rotate(var(--tilt,0deg));cursor:pointer;position:relative;color:var(--ink);animation:m-pet-rock-memoin .3s ease-out 1}
.m-pet-rock-memo::before{content:"";position:absolute;left:38%;top:-8px;width:34px;height:12px;background:#ffffffaa;border:1px solid #0003;transform:rotate(-3deg)}.m-pet-rock-memo b{display:block;margin-bottom:2px}
.m-pet-rock-cal{position:absolute;left:8px;bottom:8px;z-index:10;width:60px;background:#fff;border:3px solid var(--ink);border-radius:8px;text-align:center;font-weight:900;font-size:.58rem;line-height:1.15;overflow:hidden;box-shadow:2px 2px 0 var(--ink)}
.m-pet-rock-cal[hidden]{display:none}.m-pet-rock-cal b{display:block;background:var(--coral);border-bottom:2px solid var(--ink);padding:1px 0}.m-pet-rock-cal span{display:block;padding:4px 2px;font-size:.72rem}
.m-pet-rock-tear{animation:m-pet-rock-tear .8s ease-in 1}
.m-pet-rock-care{position:absolute;left:8px;top:8px;z-index:11;max-width:52%;background:var(--cream);border:3px solid var(--ink);border-radius:12px;padding:6px 8px;font-size:.72rem;font-weight:700;box-shadow:3px 3px 0 var(--ink)}
.m-pet-rock-care i{display:block;height:8px;border:2px solid var(--ink);border-radius:6px;background:repeating-linear-gradient(45deg,#fff 0 6px,#ddd 6px 12px);margin:4px 0}
.m-pet-rock-crumbit{display:inline-block;animation:m-pet-rock-bob 1s ease-in-out infinite alternate}
.m-pet-rock-ticker{background:#1f1a26;color:#9bffc2;border:3px solid var(--ink);border-radius:12px;box-shadow:4px 4px 0 var(--ink);padding:6px 10px;font:600 .72rem/1.45 ui-monospace,Consolas,monospace;min-height:5.2em;overflow:hidden}
.m-pet-rock-ticker ul{list-style:none;margin:0;padding:0}.m-pet-rock-ticker li{white-space:normal;overflow-wrap:anywhere}.m-pet-rock-cursor{display:inline-block;animation:m-pet-rock-blink 1s steps(1) infinite}
.m-pet-rock-idle .m-pet-rock-ticker{opacity:.6}
.m-pet-rock-zd{background:var(--must);color:var(--ink);border:2px solid var(--ink);border-radius:4px 10px 10px 4px;padding:0 8px;position:relative;font-weight:900;margin:0 2px}
.m-pet-rock-zd::after{content:"";position:absolute;right:-8px;top:-2px;border-left:8px solid var(--ink);border-top:8px solid transparent;border-bottom:8px solid transparent}
.m-pet-rock-vitals{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px}
.m-pet-rock-tile{background:var(--paper);border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);padding:4px 4px 6px;text-align:center;position:relative;min-width:0;animation:m-pet-rock-stampin .4s ease-out 1}
.m-pet-rock-tile[hidden]{display:none}.m-pet-rock-tile .m-pet-rock-lab{display:block;font-weight:900;font-size:.72rem;overflow-wrap:anywhere}.m-pet-rock-tile .m-pet-rock-val{font-weight:900;font-size:.8rem}
.m-pet-rock-gsvg{width:100%;max-width:70px;height:auto;display:block;margin:0 auto}
.m-pet-rock-badge{display:inline-block;background:var(--mint);border:2px solid var(--ink);border-radius:8px;font-size:.58rem;font-weight:900;padding:0 6px;letter-spacing:.06em}
.m-pet-rock-cap{display:block;font-size:.56rem;opacity:.75;line-height:1.15;min-height:2.3em}.m-pet-rock-bad{background:#ffd3cd}.m-pet-rock-bad .m-pet-rock-badge{background:var(--coral)}
.m-pet-rock-red .m-pet-rock-tile{background:#ffc9c2}.m-pet-rock-dial{background:var(--cream);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;grid-column:span 2}
.m-pet-rock-dial svg{width:100%;max-width:120px;height:auto}.m-pet-rock-shudder svg{animation:m-pet-rock-shudder .5s linear 6}
.m-pet-rock-flag{background:var(--coral);border:2px solid var(--ink);border-radius:4px 10px 10px 4px;font-size:.66rem;font-weight:900;padding:1px 8px}
.m-pet-rock-tray{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.m-pet-rock-snack{font:inherit;font-weight:800;font-size:.8rem;min-height:44px;padding:4px 9px;border:2px solid var(--ink);border-radius:10px;background:#fff;color:var(--ink);cursor:pointer;touch-action:none;box-shadow:0 3px 0 var(--ink)}
.m-pet-rock-snack[hidden]{display:none}.m-pet-rock-snack[aria-pressed="true"]{background:var(--mint)}.m-pet-rock-snack:disabled{opacity:.5;cursor:not-allowed}
.m-pet-rock-ghost{position:absolute;z-index:30;font-size:1.8rem;pointer-events:none;transform:translate(-50%,-50%)}.m-pet-rock-sup{display:flex;flex-direction:column;gap:8px}
.m-pet-rock-chips{display:flex;flex-wrap:wrap;gap:6px}
.m-pet-rock-chip{font:inherit;font-weight:700;font-size:.78rem;min-height:40px;padding:4px 10px;border:2px solid var(--ink);border-radius:999px;background:#ffe3df;color:var(--ink);cursor:pointer;animation:m-pet-rock-stampin .4s ease-out 1}
.m-pet-rock-say{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.m-pet-rock-say label{font-weight:800;font-size:.78rem;flex:1 1 100%}
.m-pet-rock-in{font:inherit;min-height:44px;padding:4px 10px;border:3px solid var(--ink);border-radius:10px;background:#fff;color:var(--ink);flex:1 1 140px;min-width:0}
.m-pet-rock-stamp{display:inline-block;border:3px solid #c0392b;color:#c0392b;border-radius:6px;font-weight:900;font-size:.78rem;padding:0 8px;transform:rotate(-4deg);opacity:0}
.m-pet-rock-stamp.m-pet-rock-on{animation:m-pet-rock-stampon .4s ease-out 1 forwards}.m-pet-rock-status{display:grid;gap:4px;font-size:.8rem}
.m-pet-rock-row{display:flex;justify-content:space-between;gap:8px;border-bottom:1px dotted #0004;padding:1px 0}.m-pet-rock-row b{font-variant-numeric:tabular-nums;text-align:right;overflow-wrap:anywhere}
.m-pet-rock-need{background:var(--coral);border:2px solid var(--ink);border-radius:8px;padding:3px 8px;font-weight:900;font-size:.76rem;font-variant-numeric:tabular-nums}
.m-pet-rock-need[hidden],.m-pet-rock-hide[hidden]{display:none}.m-pet-rock-goal{height:12px;border:2px solid var(--ink);border-radius:8px;background:#fff;overflow:hidden}
.m-pet-rock-goal i{display:block;height:100%;width:0;background:repeating-linear-gradient(45deg,var(--mint) 0 8px,#7fd8ad 8px 16px);transition:width .5s}
.m-pet-rock-rank{display:inline-block;font-weight:900;font-size:.76rem;background:var(--must);border:2px solid var(--ink);border-radius:8px;padding:1px 8px}
.m-pet-rock-sched{font-size:.7rem;display:grid;gap:1px;margin-top:2px}.m-pet-rock-sched span{display:flex;justify-content:space-between;gap:6px}
.m-pet-rock-says{font-size:.72rem;opacity:.85;font-style:italic;min-height:1.3em}.m-pet-rock-diary{background:var(--lilac);position:relative}
.m-pet-rock-cover{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px;text-align:center;font-weight:800}
.m-pet-rock-padlock{font:inherit;font-size:2.4rem;line-height:1;background:none;border:0;cursor:pointer;padding:4px;transition:transform .2s}
.m-pet-rock-padlock.m-pet-rock-unlock{animation:m-pet-rock-unlock .5s ease-out 1 forwards}.m-pet-rock-combo{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center}
.m-pet-rock-combo .m-pet-rock-in{flex:0 1 150px}.m-pet-rock-lockmsg{font-size:.76rem;min-height:1.2em}.m-pet-rock-book[hidden],.m-pet-rock-cover[hidden]{display:none}.m-pet-rock-pagewrap{perspective:900px}
.m-pet-rock-page{position:relative;background:repeating-linear-gradient(var(--cream) 0 25px,#e7d7b0 25px 26px);border:3px solid var(--ink);border-radius:6px 12px 12px 6px;padding:8px 12px 10px 18px;min-height:190px;line-height:26px;box-shadow:inset 8px 0 0 #00000014;transform-origin:0 50%}
.m-pet-rock-page.m-pet-rock-flip{animation:m-pet-rock-flip .45s ease 1}.m-pet-rock-dtxt{font-family:"Segoe Script","Bradley Hand","Comic Sans MS",cursive;font-size:.92rem;line-height:26px;margin:0;overflow-wrap:anywhere}
.m-pet-rock-dps{font-family:"Segoe Script","Bradley Hand","Comic Sans MS",cursive;font-size:.76rem;line-height:22px;margin:4px 0 0;transform:rotate(-1.5deg);transform-origin:0 50%;opacity:.88;overflow-wrap:anywhere}
.m-pet-rock-note{display:block;font-family:"Segoe Script","Bradley Hand","Comic Sans MS",cursive;font-size:.72rem;line-height:18px;transform:rotate(-4deg);color:#a0322d;margin:4px 0 0 20px}
.m-pet-rock-rockpic{display:inline-block;width:44px;height:30px;border-radius:50% 50% 45% 45%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,var(--hi),var(--slate) 60%,var(--shade));border:3px solid var(--ink);margin:6px 0 0 8px}
.m-pet-rock-dnav{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px}.m-pet-rock-dnav .m-pet-rock-btn{min-height:44px;padding:4px 10px;font-size:.8rem;box-shadow:0 3px 0 var(--ink)}
.m-pet-rock-ind{font-weight:900;font-size:.78rem;flex:1 1 90px;text-align:center}.m-pet-rock-moss{display:flex;flex-wrap:wrap;gap:3px;min-height:10px;margin-top:6px}
.m-pet-rock-moss i{width:9px;height:9px;border-radius:50%;background:var(--moss);border:1px solid var(--ink)}
.m-pet-rock-prog{height:10px;border:2px solid var(--ink);border-radius:6px;background:#fff;overflow:hidden;margin-top:8px}.m-pet-rock-prog i{display:block;height:100%;width:0;background:var(--moss);transition:width .4s}
.m-pet-rock-progt{font-size:.7rem;font-weight:700;margin-top:2px}.m-pet-rock-album{display:flex;flex-wrap:wrap;gap:8px}
.m-pet-rock-polaroid{width:78px;background:#fff;border:2px solid var(--ink);padding:4px 4px 6px;box-shadow:2px 2px 0 var(--ink);margin:0;transform:rotate(var(--tilt,0deg));font-size:.52rem;line-height:1.15;text-align:center;animation:m-pet-rock-stampin .4s ease-out 1}
.m-pet-rock-polaroid i{display:block;height:36px;background:#bfe6ff;position:relative;margin-bottom:3px;border:1px solid var(--ink)}
.m-pet-rock-polaroid i::after{content:"";position:absolute;left:22%;bottom:3px;width:56%;height:55%;border-radius:50% 50% 45% 45%/60% 60% 40% 40%;background:var(--slate);border:2px solid var(--ink)}
.m-pet-rock-modalwrap{position:absolute;inset:0;z-index:50;background:#2b243399;display:flex;align-items:flex-start;justify-content:center;padding:16px 10px;overflow:hidden}
.m-pet-rock-modal{width:min(100%,480px);background:var(--cream);border:4px solid var(--ink);border-radius:16px;box-shadow:6px 6px 0 var(--ink);padding:14px 16px;animation:m-pet-rock-slide .35s ease-out 1;max-height:100%;overflow:auto;position:relative}
.m-pet-rock-modal h3{margin:0 0 8px;font-size:1.05rem;padding-right:76px}.m-pet-rock-modal p{margin:6px 0}
.m-pet-rock-field{display:flex;gap:8px;align-items:center;justify-content:space-between;border-bottom:1px dotted #0006;padding:5px 0;font-size:.86rem}.m-pet-rock-field .m-pet-rock-in{flex:0 1 160px}
.m-pet-rock-opts{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.m-pet-rock-opts .m-pet-rock-btn{min-height:44px}
.m-pet-rock-rocks{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:300px;margin:10px auto}
.m-pet-rock-rock{width:54px;height:44px;border:3px solid var(--ink);border-radius:50% 50% 45% 45%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,var(--hi),var(--slate) 60%,var(--shade));cursor:pointer;padding:0}
.m-pet-rock-rock:active{transform:scale(.94)}.m-pet-rock-quiet{background:#1f1a26;color:#cfe;text-align:center;font-weight:700}.m-pet-rock-rev{font-weight:800;font-size:.9rem}.m-pet-rock-hr{font-size:1.6rem}
.m-pet-rock-slide{border:3px solid var(--ink);border-radius:10px;background:#fff;padding:10px;text-align:center;margin:8px 0}
.m-pet-rock-slide i{display:block;margin:0 auto 6px;width:96px;height:60px;border-radius:50% 50% 45% 45%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,var(--hi),var(--slate) 60%,var(--shade));border:3px solid var(--ink)}
.m-pet-rock-pigeon{position:absolute;left:46%;bottom:50%;z-index:6;font-size:1.7rem;pointer-events:none;animation:m-pet-rock-bob 1.2s ease-in-out infinite alternate}
.m-pet-rock-achoo{position:absolute;left:56%;bottom:50%;z-index:12;font-weight:900;font-size:.95rem;background:#fff;border:3px solid var(--ink);border-radius:50%/60%;padding:2px 12px;transform:rotate(8deg);box-shadow:2px 2px 0 var(--ink);pointer-events:none;animation:m-pet-rock-achoo .5s ease-out 1}
.m-pet-rock-pigeon[hidden],.m-pet-rock-achoo[hidden]{display:none}
@keyframes m-pet-rock-achoo{0%{transform:rotate(8deg) scale(.2);opacity:0}60%{transform:rotate(8deg) scale(1.3);opacity:1}100%{transform:rotate(8deg) scale(1)}}
.m-pet-rock-spark{position:absolute;left:50%;bottom:30%;z-index:12;font-size:1.6rem;pointer-events:none;opacity:0}.m-pet-rock-sparkgo{animation:m-pet-rock-spark 2.5s ease-out 1}
.m-pet-rock-mode{font-size:.7rem;font-weight:800;background:var(--cream);border:2px solid var(--ink);border-radius:8px;padding:0 6px;display:inline-block}
@keyframes m-pet-rock-spin{to{transform:rotate(360deg)}}@keyframes m-pet-rock-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.005)}}@keyframes m-pet-rock-squish{0%{transform:scale(1)}50%{transform:scale(.97,.96)}100%{transform:scale(1)}}@keyframes m-pet-rock-chew{0%,100%{transform:translateX(0)}20%{transform:translateX(-3px) rotate(-1deg)}40%{transform:translateX(3px) rotate(1deg)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}
@keyframes m-pet-rock-jit{0%,100%{transform:rotate(0)}50%{transform:rotate(.7deg)}}@keyframes m-pet-rock-drop{from{transform:translateY(-40px);opacity:0}to{transform:none;opacity:1}}@keyframes m-pet-rock-cross{from{left:-10%;opacity:1}90%{opacity:1}to{left:104%;opacity:0}}@keyframes m-pet-rock-crossl{from{left:104%;opacity:1}90%{opacity:1}to{left:-10%;opacity:0}}
@keyframes m-pet-rock-rain{from{transform:translateY(0)}to{transform:translateY(120%)}}@keyframes m-pet-rock-heart{0%{transform:translateY(0) scale(.6);opacity:1}100%{transform:translateY(-110px) scale(1.2);opacity:0}}@keyframes m-pet-rock-pulse{from{filter:brightness(1)}to{filter:brightness(1.18)}}@keyframes m-pet-rock-memoin{from{transform:translateY(-10px) rotate(var(--tilt,0deg));opacity:0}to{opacity:1}}
@keyframes m-pet-rock-tear{0%{transform:none;opacity:1}100%{transform:translate(40px,-60px) rotate(25deg);opacity:0}}@keyframes m-pet-rock-bob{from{transform:translateY(0)}to{transform:translateY(-6px)}}@keyframes m-pet-rock-blink{50%{opacity:0}}@keyframes m-pet-rock-stampin{from{transform:scale(1.5);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes m-pet-rock-shudder{0%,100%{transform:translateX(0px)}50%{transform:translateX(0px)}}@keyframes m-pet-rock-stampon{from{transform:rotate(-4deg) scale(2);opacity:0}to{transform:rotate(-4deg) scale(1);opacity:1}}@keyframes m-pet-rock-unlock{0%{transform:scale(1)}40%{transform:scale(1.4) rotate(-14deg)}100%{transform:scale(0);opacity:0}}@keyframes m-pet-rock-flip{from{transform:rotateY(-80deg);opacity:.3}to{transform:rotateY(0);opacity:1}}
@keyframes m-pet-rock-slide{from{transform:translateY(-30px);opacity:0}to{transform:none;opacity:1}}@keyframes m-pet-rock-flick{0%,100%{opacity:1}15%{opacity:.2}30%{opacity:.9}45%{opacity:.1}60%{opacity:.8}80%{opacity:.3}}@keyframes m-pet-rock-spark{0%{transform:translate(-50%,0) scale(.4);opacity:0}30%{opacity:1}100%{transform:translate(-50%,-80px) scale(1.6) rotate(40deg);opacity:0}}
@media (max-width:639px){
.m-pet-rock-app{grid-template-columns:minmax(0,1fr)}.m-pet-rock-col{display:contents}
.m-pet-rock-habitat{order:1}.m-pet-rock-bar{order:2}.m-pet-rock-tray{order:3}.m-pet-rock-ticker{order:4}.m-pet-rock-vitals{order:5}.m-pet-rock-diary{order:6}
.m-pet-rock-sup{order:7}.m-pet-rock-status-c{order:8}.m-pet-rock-albumc{order:9}.m-pet-rock-vitals{grid-template-columns:repeat(3,minmax(0,1fr))}.m-pet-rock-cap{display:none}.m-pet-rock-memos{top:64px;width:54%}
.m-pet-rock-bar .m-pet-rock-btn{min-height:50px}.m-pet-rock-in{font-size:16px}
}
@media (pointer:coarse){.m-pet-rock-kl{display:none}}
@media (prefers-reduced-motion:reduce){
.m-pet-rock-svg,.m-pet-rock-needle,.m-pet-rock-hm,.m-pet-rock-hh,.m-pet-rock-cursor,.m-pet-rock-drop,.m-pet-rock-alert,.m-pet-rock-crumbit,.m-pet-rock-siren.m-pet-rock-on,.m-pet-rock-shudder svg,.m-pet-rock-flicker .m-pet-rock-cone,.m-pet-rock-flicker .m-pet-rock-lamp,.m-pet-rock-pigeon,.m-pet-rock-achoo{animation:none}
.m-pet-rock-page.m-pet-rock-flip{animation:m-pet-rock-fade .3s ease 1}.m-pet-rock-cross,.m-pet-rock-crossl,.m-pet-rock-sparkgo,.m-pet-rock-heart.m-pet-rock-go{animation-duration:.01s}
.m-pet-rock-napkin,.m-pet-rock-nightov,.m-pet-rock-sky{transition:none}
}
@keyframes m-pet-rock-fade{from{opacity:.2}to{opacity:1}}
`, 'css-pet-rock');

  /* ===================================================================== DATA */
  const LN = { intake: [
      "Adoption Certificate: Name, Clive. Birth date, Before. Distinguishing marks, rock. Signature, none, by design.",
      "Congratulations on your new dependent. He needs everything. He has everything. Please begin.",
      "Welcome to Hardcore Mode. His needs must be met around the clock. They are all at 100%. The clock has been asked to wait.",
      "Permadeath is ON. The rock has been informed. The rock asked what the death part was.",
      "Hardcore Mode: the rock may not be neglected. He needs nothing, so your job is to be seen providing it.",
      "All vitals are at 100%. This is not a sign that your job is done. It is the job."],
    vitalIntro: [ "Six vitals. All STABLE. Management would like it noted that the needles have achieved this.",
      "The needles are pinned at 100. This is the achievement of the needle.", "Every gauge reads 100. Management has tried to read 101. The gauge declined.",
      "Six vitals are online. All six were asked to move. All six declined in unison, which Management is calling teamwork."],
    tips: [
      "Hunger: 0. Management is very proud of it.", "Energy: unchanged since the Precambrian.", "Mood: stable. Reviewed and approved by gravity.",
      "Hygiene: spotless. There is nothing on him to wash off.", "Purpose: pending. Pending is also 100.", "Stoneness: maximum. This is his whole thing.",
      "Vibes: 100%. The committee asked what vibes are. The committee was told: yes.", "Gravitas: 100%. This is, technically, a unit of weight.", "Tuesday Readiness: 100%. It is also, technically, Wednesday."],
    caps: ["unchanged since the Precambrian", "reviewed and approved by gravity", "holding steady, at length", "cannot be improved, only admired", "stable (on purpose)", "STABLE (and then some)"],
    feed: [
      "Feeding logged. Hunger was 0 before and is 0 after. Management calls this a clean handoff.",
      "Clive did not eat the muffin. Clive did not not eat it either. Legal is reviewing the distinction.",
      "You fed Clive a grape. The grape is now technically in Clive's care.",
      "Nutrition label: serving size, one rock. Servings per container, one rock. Calories, see rock.",
      "The crumbs are not a mess. They are a Crumb Reserve, and Sandra has approved it for 11 more minutes.",
      "You have fed Clive a snack. He accepts it the way mountains accept erosion: eventually, in theory.",
      "Feeding log: 12:04 PM, snack, medium. 12:04 PM, snack, medium. 12:05 PM, Clive declined to comment.",
      "Clive is not full. Clive is not hungry. Clive is in a third state. Sandra from Compliance is drafting a form.",
      "The snack has settled beside Clive. Neither of them looks like it has plans.",
      "Crumbs Offered: %N. Crumbs Eaten: 0. Crumbs Becoming Family: %N.",
      "The snack was placed 4 centimeters from Clive. Policy asks for 5. Sandra has been notified of the centimeter.",
      "The snack and Clive regarded each other. The snack looked away first. Snacks have no eyes. It was noted.",
      "Clive's stomach is listed as 'theoretical.' The snack has been admitted into the theory.",
      "Dietary note: Clive is gluten-free, dairy-free and plans-free.",
      "Calories consumed: 0. Calories burned: 0. The books balance. The accountant, a doily, is quietly moved.",
      "A crumb fell off the doily. A search party of one was dispatched. It is you. It is fine.",
      "Mealtime has been extended by 7 1/2 minutes so the food can feel welcome.",
      "Clive's plate is the doily. His fork is a concept. His napkin is, as discussed, also his blanket.",
      "No one has ever seen Clive finish a meal. No one has seen him start one. The data is consistent.",
      "Management would like to thank the food for its service. The food did not serve. It has been thanked anyway."],
    feedMid: ["Fed %N times. Size change: none. Management is tracking this with a ruler it keeps in a drawer for exactly this.",
      "Meal %N logged. Clive's size is unchanged, and Management has measured it twice, for warmth."],
    feedLate: ["Meal %N of however many there are today. Clive's appetite remains geological.",
      "Meal %N logged. Management has stopped counting and started estimating, generously.",
      "Meal %N. The Crumb Reserve has started a second Crumb Reserve. It is not yet clear which one is in charge."],
    speech: ["Dennis (Plant) applauds. He is a plant, so it is leaves.", "Gerald stands. He has been standing.", "The Stapler applauds by stapling. It is the loudest applause on record.",
      "Sandra holds a stamp above her head and does not use it.", "Clive thanks the committee by remaining."],
    court: ["All rise. Judge: Doily. Clerk: lamp.", "Finger found guilty of Affection in the Third Degree. Sentence: one pat, suspended, to be served concurrently, indefinitely.",
      "The fee has been returned to the finger, which is not allowed to spend it."],
    fs: [
      "You offered Premium Gravel. Clive found it identical to the ordinary gravel, and is touched anyway.",
      "You offered Organic Gravel. It is the same gravel. It is simply more confident.",
      "Toast. The toaster has been informed that Clive was fed toast. The toaster says: toast.",
      "You have offered Clive a potato. Gerald is the potato. Gerald considers the offer, is moved, and asks that the minutes say 'consulted'.",
      "The thimble of water has been placed beside Clive. The thimble has been given a small doily of its own.",
      "The snack was dropped off target. Clive politely declined. Per policy, this counts as a meal.",
      "Chewing detected. Clive has no jaw. The chewing is, technically, a wiggle of high intent."],
    feedWarn: [
      "That is 7 snacks in 5 seconds. The Crumb Reserve is at 80% and is thinking about its feelings.",
      "Clive is being fed faster than he can not-eat. Management is monitoring the not-eating, which is going very well.",
      "Please slow down. The doily has a weight limit, and the limit is the doily's weight.",
      "A pile is forming. Sandra says a pile is a hill that has not yet filed paperwork."],
    deltaLate: [ "Hunger +0.000000000000000000000000000000000000000. Management reads this aloud and calls it a lot of zero.",
      "Management has circled all of the zeroes and written steady beside them with great feeling.", "The delta is now so small it has been promoted to a rumor. Clive is fine."],
    deltaZD: [ "Zero (Deluxe) is now printed on a ribbon. The ribbon is the most consistent number ever produced.", "The delta is framed. The frame is also zero. Management is thrilled in a measured way."],
    d80: ["ALERT: a 1 has appeared at the 19th decimal. This is the first change in the history of the rock. Please remain seated.", "Correction: it was a rounding error, in the rock's favor. We have apologized to the rock."],
    debt: [ "Attention Debt: 0 -> 0. Target: 0.", "Attention Debt remains 0. Management asked it to try being 1, just to see. It declined, politely.",
      "Attention Debt: 0. Attention Credit: also 0. The two have met and decided to stay friends.",
      "Management has reviewed Attention Debt. It is 0. It has been reviewed so often it has begun to feel watched.",
      "Attention Debt: 0 -> 0. A small cheer from Accounting, which is a doily with a calculator.",
      "Attention Debt has been paid in full by an anonymous benefactor. The benefactor is zero. It always was."],
    walk: [
      "Walk started. Clive is at the same coordinates he was born at, give or take 4.5 billion years.",
      "You walked %N m. Clive walked 0 m. Together you averaged %M m, a personal best for the partnership.",
      "Route altered to avoid hills. Clive requested no changes. Clive requested nothing.",
      "The leash is attached to a harness Clive did not choose and cannot, as a rock, outgrow.",
      "Pedometer reads 0 steps. Clive's legs are listed as pending.",
      "The walk is complete. Everyone has returned to where they were. This is called a loop.",
      "Policy 14 says the rock must walk. Policy 14(b) says the rock may not. Clive has done both.",
      "The leash has stretched to its limit and snapped back. It has been told it did well.",
      "You went %N m. Clive went nowhere with you, which is the hardest kind of going.",
      "Fitness tracker: you, %N m. Clive, 0 m. The tracker has asked to be reassigned to someone who understands.",
      "Clive's cardio rating: tectonic. His heart rate: a hum, below the threshold of anyone's interest.",
      "It was the same path as last time. Clive confirms it is the same path. He has seen all of it, from one spot.",
      "En route you passed 3 benches, 1 bin and a notice about a lost glove. Clive wished the glove well.",
      "A stranger asked if the rock was yours. You said yes. The rock was asked to confirm. The rock confirmed by being there.",
      "Hydration break: not required. Break taken anyway. Duration: 7 1/2 seconds. Location: here.",
      "Per policy, a walked rock must be visibly enjoying it. Clive was visibly a rock. The auditor said that counts."],
    brisk: [ "Brisk Intermission recorded. You were out for a walk for %S seconds. Clive was out for none, and it was fine.",
      "Brisk Intermission logged: %S seconds. Management is calling it a walk in spirit. Clive is calling it nothing and is at peace.",
      "A %S-second walk. Clive felt it as a draft. Rocks do not feel drafts. He felt the draft."],
    briskSpam: [ "Four brisk intermissions in 20 seconds. Clive has been walked in a pattern the Council describes as twitchy, but caring.",
      "You have been out and back 4 times without going anywhere. Clive finds this relatable and has asked to join.",
      "The leash is tangled in a way that has no knot. This is a new kind of tangle. Sandra is thrilled and horrified.",
      "Walk-spam detected. Clive is now the most-walked stationary object in the county, and the only one with paperwork."],
    scen: [
      "A dog passes. Clive and the dog nod at each other. Neither moves. It is the closest anyone has come to conversation.", "A duck has appeared. The duck is not part of the program. The duck does not wish to be asked.",
      "A second rock is on the path. It does not look up. Clive wrote this down.", "A puddle. Clive leaps it by not moving. It was a clean jump and also no jump at all.",
      "A sock crosses the path in the opposite direction, with purpose. Nobody stops it. Nobody asks.", "A sign reads: Pet Rocks Must Be Leashed. Clive is leashed. The sign is not. Clive has decided not to bring it up.",
      "A squirrel crossed the path with a nut and a plan. Clive has neither and has never once felt behind."],
    support: [
      "You told Clive he is doing great. Clive received this the way he receives everything: fully.",
      "Hug in progress. Warmth transferred: 0 degrees. Warmth intended: all of them.",
      "You said 'I'm proud of you.' Clive has been proud of himself since the Precambrian, but welcomes a second opinion.",
      "Reminder: a rock cannot be disappointed. Management was disappointed on his behalf anyway, to be safe.",
      "You are listening. Clive has not said anything yet; that is how you know it's working.",
      "Warmth Ring: complete. Clive's thought bubble remains blank, which Management classifies as work.",
      "Active Listening: 3.0 s. Management has added this to the KPIs. The KPI is 3.0 s.",
      "A hug of 3.0 seconds has been filed under Long. For a rock, 3.0 seconds is a sabbatical.",
      "The silence lasted 3.0 seconds. It was the good kind, or the other good kind. Management could not tell them apart and is grateful.",
      "Clive absorbs sound, light and sympathy at the same rate. It is a fair rate.",
      "Your support was measured at 3.0 seconds. Clive measured it at 'enough' and then stopped measuring.",
      "Hugging a rock is a two-person job. Clive counts as a person for this purpose. Sandra has signed off.",
      "You hugged Clive. Clive hugged back by remaining exactly where hugging could occur.",
      "Session notes: client was very still. Practitioner was also very still. Both were moved, emotionally only.",
      "Warm. A rock cannot be warm, but the lamp was on, and the lamp has asked to be credited."],
    supKpi: "Support is now available. Hold it. KPI: Active Listening, 3.0 s. Management will be listening to you listen.",
    supInt: [ "You interrupted the silence early. The silence has accepted your apology.", "Hug incomplete. Clive did not notice, as is his gift.", "Hug incomplete. The hug has been saved as a draft.",
      "You let go at 1.9 seconds. Clive would like you to know that 1.9 is also a number.",
      "Interrupted. The ring has gone back to zero with a small sigh, which it did not have the equipment for."],
    supSpam: [ "That was your third false start. Clive is not hurt. Clive has a gentle, bottomless tolerance for beginnings.",
      "Three tries, no hug. Management wants you to know the attempts count as a hug, in the departments where it is paperwork.",
      "The Warmth Ring has filed for a clearer mandate.",
      "Starting and stopping is also a kind of support. Management has never said that before and checked three times that it was allowed."],
    affirm: [
      "'You are doing great,' you said. Clive was already doing great. He has thanked you for the redundancy.", "'I believe in you,' you said. Clive believes in you as well, and in the ground.",
      "'It is fine to be a rock,' you said. Clive has had this on a pillow since the Precambrian."],
    affSpam: [ "That is 8 affirmations in 5 seconds. Clive has run out of places to put them. The doily is getting a few.",
      "Affirmation inventory: full. Please hold any further encouragement until Thursday.",
      "Clive is now encouraged beyond capacity. The surplus has been sent to Dennis, who has a window and a use for it."],
    kwNone: [ "Logged as: sound. Clive has seen sound before. He has questions he cannot ask.",
      "Logged as: sound. It was nice sound. Clive filed it under the good sounds, which is a short folder.",
      "Logged as: sound. Clive understood the tone and none of the words, which is how he understands everything.",
      "Logged as: sound. A rock cannot reply. He is replying by not leaving.",
      "Logged as: sound. Management has read it three times and is also moved. This is unrelated to the content."],
    kw: {
      tired: "Clive has been told you feel tired. Clive can wait with you. He has a great deal of practice.", sad: "Clive heard sad. Clive is a rock and cannot fix it, but he can sit near it the entire time.",
      work: "Clive has been told about work. He has been at his job since the Precambrian and has never once been promoted. He suggests lunch.",
      tuesday: "You mentioned Tuesday. Management has paused, dimmed the lights, and asked that nobody make eye contact.",
      cat: "Clive has been told about a cat. Clive and the cat have an understanding: neither of them has to move.",
      mom: "Clive has been told about a mom. Clive has a mountain, and he would like to meet yours.",
      dad: "Clive has been told about a dad. Clive has a mountain and a much smaller mountain he has not yet classified. He would like to meet yours.",
      hello: "Hello, said you. Hello, said Clive, in the way a rock says it, which is by being there at the right time.",
      pebble: "The word pebble has been noted. Management asks that we not go there. We are going there.",
      love: "Clive heard love. A rock cannot return it in kind. He returns it in place, which is the only currency he has.",
      sorry: "Clive heard sorry. There is nothing to be sorry about. Clive was once run over by a glacier and held no grudge, and a glacier is heavier.",
      lunch: "Lunch was mentioned. Management has paused all KPIs for it. It was brief. It has been extended. It is lunch.",
      sock: "The word sock has been entered into the record. The Missing Sock is not available for comment. He is on a journey. He sent no card."},
    schism: "The Great Pebble Schism of 1972 has been entered into the record. It is a three-page tangent. Clive is thrilled.",
    tuck: [ "Tucking complete. He was already lying down, as he has been since the Cretaceous. He appreciates the formality.",
      "The blanket is a folded napkin. Clive has been informed. Clive says it is also a blanket.", "Clive has been tucked in. Nothing is different. He seems more comfortable in a way the instruments cannot detect.",
      "Hygiene: 100%. Clive has been put to bed clean. He has not been dirty since Before.", "The lamp is dimmed. It is the only warm light in the room. It has been asked to take its time.",
      "Sleep detected. Clive was already asleep. Clive is, strictly, always asleep. It is a kind of expertise.",
      "A bedtime story was considered. The only available story is 'Rock.' Clive has heard it. He is in it.",
      "Goodnight, Clive. He did not reply, which has never once been rude.",
      "The napkin has a small stain. It is from a meal Clive did not eat. It has been framed as evidence."],
    untuck: [ "Tucking in is a toggle. Untucking is also a toggle. Management is neutral.",
      "Blanket removed. Clive was not cold. Clive was not warm. The blanket was not asked.",
      "Clive has been untucked. He is now awake by default, as a courtesy to the lamp.",
      "The napkin has been folded back into a napkin. It does not seem to mind. It has had a career."],
    alertHit: [
      "You answered the alert. Clive did not need anything. This is called a clean response.", "Alert resolved. Clive was never at risk, and says thank you in the form of no news.",
      "Response time: 1.4 seconds. Target: any. Clive is fine.", "You responded to an alert about nothing with total commitment. This is the standard, and you have met it.",
      "Answered in 0.8 seconds. Clive did not need anything. This is the fastest nothing on record.",
      "You answered an alert for nothing. Nothing thanks you. Nothing was always going to thank you.",
      "Response noted. Clive was never in danger. You were never late. We are all very on time."],
    alertMiss: [
      "You missed the alert. Clive did not need anything. Equal outcome.", "The alert has expired. So has the nothing it was about. Clive is fine.",
      "Missed alert noted. Management would like to say it does not matter and it will say it twice.",
      "The alert expired. A fresh nothing will be issued shortly.",
      "Alert missed. This has been entered as a Learning Opportunity. The lesson is: nothing. The learning is yours."],
    alertText: [ "Clive needs: nothing. Respond within 3 seconds.", "URGENT: Clive has not changed in 4 seconds. Clive is fine.",
      "ALERT: Clive's needs are at 100%. Please remain calm. Clive is fine.", "Hunger 0. Thirst 0. Dread 0. Moss pending.",
      "ALERT: Clive is still. Respond within 3 seconds. He will still be still.", "ALERT: Everything is exactly as it was. Please acknowledge.",
      "ALERT: Clive's needs were met in advance. Please acknowledge in advance."],
    alertGentle: ["Clive needs: a moment.", "Clive needs: to be where he is.", "Clive needs: Thursday, eventually.", "Clive needs: you to know he is fine, again.", "Clive needs: the afternoon to hold."],
    needs: [ "Needs Imminent: Hunger 100%, due in 00:07. Management has set an alarm for 00:00. It will not go off. It will be on time.",
      "The timer has reset one second short of zero. Management says this is the best a timer can do.", "Sandra is muttering about 7 1/2 again. Nobody has asked what it is half of. Nobody wants it to be an answer.",
      "The pebble has its own timer. It reads 00:03.75. It is not quite a countdown. It is a quarterly estimate."],
    zero: "The timer has reached 00:00. Nothing happened. We do not discuss it.",
    pokeFlavor: [ "Clive was patted. He did not react. This is his reaction, and it is a strong one.",
      "Petting is permitted. Petting at this speed is classified as 'a lot' and billed at 0 Meh per pat.", "Clive has noted the pat. He has been patted before. He is a rock, so this was 4.5 billion years ago.",
      "A pat has been recorded. It was medium, with a hint of concern.",
      "You patted Clive. He has been patted by glaciers, by rivers and by one very determined toddler. You are in the top four.",
      "Pats today: %P. Pats yesterday: also %P. Clive has stopped asking where the pats go.",
      "Clive's surface was touched. His surface has been touched before. It is, as the saying goes, a surface.",
      "That was a pat. Clive has attached a note. The note is the pat.",
      "Pat registered at 0.0 on the Seismic Scale and 11 on the Feelings Scale. Management does not own a Feelings Scale. It was lent.",
      "Clive does not flinch. A flinch needs somewhere to go."],
    pokeMile: { 10: "Ten pats. Clive has accepted this as a relationship. He has not signed anything. He has not moved. It is binding.",
      25: "Twenty-five pats. Management has opened a file titled 'Pats (Ongoing)'. The file has been patted. It is fine.",
      50: "Fifty pats. Clive's rank is now Concerning. Concerning is a promotion from Firm. Please do not tell the Firm.",
      250: "Two hundred and fifty pats. Clive is the most-patted object on this floor, narrowly ahead of the lamp, which is proud of the narrowness." },
    s15: [ "Excess Affection Fee: 0 Meh. The fee has been waived, but the waiver has also been waived, so it is back.",
      "Please stop tapping Clive. He is not a doorbell. He is, however, available for tapping at a 1 Meh fee.",
      "Rapid tapping detected. The rock is not a drum. The rock has, however, felt rhythm, and has some thoughts about 7/8.",
      "Tap rate: unreasonable. Clive's tolerance: unlimited. Management's tolerance: a Tuesday.",
      "Your finger has been issued a gentle warning. The finger would like its day in court."],
    s30: [ "%N taps detected. Clive has filed a seismic complaint. It registered 0.0 on every scale and was very hurt.",
      "Clive's personal space has been breached. It was 3 centimeters. It was all he had.",
      "%N taps in 5 seconds. A seismologist has been called. The seismologist is a pebble. The pebble is not at all calm.",
      "Clive has requested a restraining order against your finger. The judge is a doily. The doily is considering."],
    s60: [ "Tap velocity has exceeded the speed of care. Clive is now classified as a vibration with a face.",
      "%N taps. Clive is blurred. Management has issued a statement: 'He is fine,' it says, trembling at the font.",
      "Emergency stillness protocol engaged. Clive has been asked to be still. He has been still for 4.5 billion years but took the request personally."],
    polish: "Clive has been polished. He is now smoother for the remainder of this session. Management sighs very tiredly.",
    fee: "A 1 Meh fee has been applied for the seismic complaint. Clive thanks you for your contribution to rock safety.",
    spamFeed: [ "The snack pile has exceeded the Crumb Reserve. Clive is now a hill with a rock inside. Clive is fine.", "Rescue in progress. %N of 10 digs completed. Clive thanks you in advance.",
      "Rescue complete. Clive thanks you by not having needed rescuing.", "Officer Doily has issued a citation for excessive hospitality. Fine: 0.3 Meh. The officer is a doily."],
    dig: [ "Dig %N of 10. Something under here is gray. It is being very patient about it.",
      "Dig %N of 10. A grape surfaces. It is not the original grape. It has the original grape's confidence.",
      "Dig %N of 10. Clive's eyes have been located. They are fine. They are looking at you, in a way that feels relevant.",
      "Dig %N of 10. Something under here says thank you in a very small voice. It is a muffin. Clive is nearby, being grateful by being."],
    spamTuck: [ "Clive has refused to be tucked in. The napkin has folded itself. It exhaled.",
      "Tuck-spam detected. Clive has become a rock that cannot be tucked, only observed being tucked. Very tired sigh.",
      "The blanket has been tucked and untucked 7 times. It has reached the stage of life where it is simply a napkin again.",
      "The lamp went dim, bright, dim, bright. It would like a word with whoever is in charge of it. That is you."],
    barWarn: [ "You are pressing buttons faster than Clive can not-need them. Management has asked the buttons to be gentle with each other.",
      "Care is not a race. If it were a race, Clive would be winning, and he would be the finish line, and also the crowd.",
      "The Care Bar is rated for 4 presses per second. You are at an unspoken number. The bar has begun to sweat, which it was not built to do.",
      "Management is delighted by your enthusiasm and would like to hold it for a moment, with both hands, away from the buttons.",
      "That is a lot of caring in a short time. The care has been moved to a larger folder."],
    flipSpam: [ "The pages are turning faster than the diary can be read. The diary has asked to be read, not scanned.",
      "Clive is writing faster to stay ahead of you. He has written nothing. It was very fast." ],
    quiet: [
      "Clive has been placed in a quiet room for his own protection. He will be released in 7.5 seconds. He is fine. The room is also fine.",
      "Clive has been released. He did not notice he was in a room. He notices now and would like it in his file."],
    idle: [ "Management notices you have stopped. Management is also stopped. We are stopped together.",
      "You've been away 90 seconds. Clive did not notice. Clive noticed so quietly that it counts.", "Clive has been unobserved for 2 minutes 30 seconds. He appears to be enjoying it. An unscheduled page has appeared.",
      "Nobody has touched Clive in 3 minutes. He has been tucking in YOU, with a very small blanket, over your cursor.",
      "Role reversal engaged. Clive is now caring for you. Player Hunger: Unknown. Clive is worried and extremely still.", "Clive has moved 1 pixel to the left. This has been confirmed by nobody, and denied by the ruler.",
      "Clive has placed a call to Management. The call went to voicemail, which is also Clive.",
      "Clive has now been alone for 15 minutes. Facilities has sent a plant to keep him company. The plant is Dennis. Dennis has brought nothing and is thriving.",
      "Clive has applied for a position in Management. He has no hands. The application was typed by the moss, which is not here yet.",
      "Clive has retired. His pension is one doily. He will remain at his post, which is the same as retirement, but with a lanyard."],
    idle360: "Follow-up: Clive was never at risk. The pixel was unaccounted for, and has been given a desk.",
    idleChat: [ "Clive has counted the ceiling tiles. There are 7 1/2. He has accepted this.",
      "The lamp has been on for 4 hours. It has asked for a break. It will be given a break in the form of this line.",
      "Clive's eyes have drifted slightly to the left. The left is where the door is. He is only looking.",
      "Management is also idle. Management is using the time to practice sounding busy.",
      "A dust mote has landed on Clive. They have agreed to go no further than this.",
      "The doily is waiting. It is a very good doily and it has been waiting since the doily's first day.",
      "Somewhere, a Tuesday is warming up.",
      "Dennis is thriving nearby. He is pretending not to watch.",
      "Clive is not lonely. He has the whole afternoon, and the afternoon has him.",
      "A breeze is moving through the habitat. It is the only thing in here moving, and it is being very careful.",
      "The cursor has stopped. Clive has stopped too, in sympathy. He was already stopped, so it counts double.",
      "You have stopped touching things, which means Management may say anything. Management loves you. That is all. Carry on.",
      "The clock on the wall reads 11:62. It is correct for someone.",
      "Management has finished its to-do list and begun reading the rock's. The rock's list is blank. Management has been moved to try.",
      "A moth has been seen near the lamp. Clive has no view. He supports the lamp and the moth equally."],
    idleRetLong: [ "Clive is relieved. Clive would like that noted in his file.",
      "You are back. Clive has stopped pretending he was fine. He was fine. He had been pretending to pretend.",
      "You were gone a long while. Clive drafted 11 pages and filed 10 of them under Not Now."],
    idleRetShort: [ "Welcome back. Clive did not miss you, he is a rock, but he wrote 14 pages and 3 of them were about the doily.",
      "You are back. Clive pretended not to look up. A rock cannot look up. It was noticed."],
    away: "Welcome Back Report. Time away: %S seconds. Clive missed you: 0 times. Pages written about missing you: 14.",
    vet: [ "Dr. Pemberton-Slate (Veterinary Geology) has examined Clive. Findings: rock. Follow-up in 7 1/2 months.",
      "Diagnosis: rock. Prescription: more rock. Side effects: rock.",
      "Dr. Pemberton-Slate listened to Clive's chest. There was a pause. Then another. The diagnosis was 'quiet'.", "The vet recommends no changes, no medication, and a firm handshake that Clive cannot return.",
      "Invoice: 0 Meh. A 3 Meh Empathy Surcharge was applied and then pre-refunded.",
      "Clive's pulse is geological. The vet describes it as 'a matter of opinion' and a good one.",
      "Clive's insurance covers weathering, wind, and thoughtful silence. It does not cover Tuesday.",
      "The vet asked how long Clive has had this condition. Clive was a rock when the question was asked and is still a rock.",
      "Itemized bill: 1 stethoscope (borrowed), 1 handshake (unreturned), 0 rocks harmed.",
      "Dr. Pemberton-Slate recommends 8 hours of sleep. Clive has had 4.5 billion years. He is very well rested and should be allowed to start something."],
    vetClock: "The vet checked the Needs timer. It read 00:07. The vet checked again. It read 00:07. The vet wrote 'rock'.",
    sandraReclass: "Sandra from Compliance has flagged Clive. Per Policy 4.2, minerals may not be pets, only companions of record. Clive is upgraded.",
    sandraLeash: "Sandra has measured the leash at 7 1/2 feet. She would like it noted that it was exactly 7 1/2 feet. It was.",
    sandra: [ "Sandra asks that Clive stop loitering. He has loitered since the last glacial period. She will grandfather him in.",
      "Sandra notes that rocks may not keep diaries. The diary is classified as a very long sigh in paragraph form.",
      "Policy 4.2.1(a): the diary shall be kept in a rock's own hand. The rock's hand is a rock. The diary is approved.",
      "Sandra from Compliance would like to remind everyone that the Precambrian is not a valid employment start date. It has been updated to 'Before'.",
      "Sandra has flagged the moss. There is no moss. She flagged it early, to be safe. She holds an early-flag license.",
      "Sandra has issued Policy 4.3: no policy may reference itself, except 4.3, which may reference itself once. It has.",
      "Sandra attended Clive's walk in spirit. Her report is 2 pages and the second is a diagram of the spirit.",
      "The Crumb Reserve has been capped at 24 crumbs. The 25th is held in trust. By whom is a matter for Policy 9.",
      "Sandra has asked that the lamp be called 'task lighting.' The lamp has asked that Sandra be called 'task.' Both requests are pending, side by side.",
      "Sandra has filed Form 27B/6 against the concept of Tuesday. It was returned: Tuesday has no forwarding address."],
    gerald: [ "We are both the earth, finished early. I say this as a vice president.",
      "I offered to be a snack. He declined. It was the most honest rejection of my career, and I have been rejected by a casserole.",
      "A rock is a potato that has given up on dreams, and so has achieved peace.",
      "I note that Clive has no eyes of his own, only borrowed ones. I find this courageous. I have eyes. I have 11.",
      "I must go. I take the silence with me, but I will return it in perfect condition.",
      "A potato knows what it is to be underground and underappreciated. A rock knows what it is to be above ground and also underappreciated. Together, we are a position."],
    geraldMet: [ "I remember you. You have a potato-adjacent demeanor. I mean this as the highest rank I can give.",
      "Ah. It is you. We have met, and I have been thinking about it in the dark, which is where I think." ],
    geraldUnmet: "A small potato silhouette sits in the back of the room. It is not on the agenda.",
    dennis: [ "Dennis (Plant) was seen near the habitat, thriving. Clive's diary now contains a redacted paragraph.",
      "Dennis (Plant) sends a card to Clive: 'Thinking of you. Photosynthesizing.' Clive reads it for a long time.", "Dennis did not attend. Dennis is a plant.",
      "Dennis (Plant) has expressed a position. The position is upright.",
      "Dennis sent his regards. They are green and turned slightly toward the window, as is his way.",
      "Dennis has asked whether the rock gets enough light. The rock gets exactly the light it deserves, which is all of it.",
      "Dennis (Plant) has grown 0.3 centimeters since you started. He is not saying he did it for you. He is not saying."],
    photoDay: [ "Photo Day. A camera has appeared. It is optional. It is also, spiritually, mandatory.",
      "Photo Day again. The photographer is a camera. The camera has been through a lot of Clives.",
      "A camera has arrived and would like to be reminded what a rock looks like. It will forget by the next one.",
      "Photo Day. Please do not smile. Clive cannot, and it would make him feel pressured."],
    photo: [
      "Clive, evolving.", "Photo 2 of 2 is identical to Photo 1. Caption: Clive, still evolving.", "Photo 3: Clive, mid-thought.", "Photo 4: Clive, from the good side.",
      "Photo 5: Clive, from the other good side.", "Photo 6: Clive, pre-dawn light, 4:30 PM.", "Photo 7: Clive, tasteful.",
      "Photo 8: Clive, unretouched, which is the most retouched a photo can get.", "Photo 9: Clive and the lamp, a partnership.",
      "Photo 10: Clive. We have run out of angles. He has all of them.", "Photo 11: Clive, in love with the moment.", "Photo 12: Clive. Album full. Clive, as ever, is not."],
    snap: "Photo %N matches Photos 1 through %M. Management has stopped comparing and started admiring.",
    rain: [ "It is raining on Clive. Clive has been issued an umbrella. The umbrella stays put. So does the rain.",
      "The rain is falling on a rock that will outlast it. Both have been told this. Neither has a view.",
      "It is raining on Clive. The rain says it is not personal. Clive says he has seen worse, mostly from glaciers.",
      "Rain forecast: yes. Rock forecast: also yes. The two have been introduced and have nothing to say, which is how weather works.",
      "Rain began at 4:12 PM and is scheduled to stop at 4:12 PM. The Weather Department regrets nothing."],
    birthday: [ "It is Clive's birthday. He has one daily. A candle has been lit. The number of candles is 'enough.'",
      "Clive's birthday: he is 4.5 billion years old, plus one day. The one day is the important one.",
      "Clive has received 0 cards. The sending parties lack hands. The sentiment is on the doily.",
      "The cake is a muffin with a candle. The candle has been told it is a candle. It was told twice, because of the occasion.",
      "Happy birthday. Clive feels, in himself, about 4.5 billion and 2."],
    rockshow: [ "Rock Show: the judges score all rocks a 10. Clive is awarded Best in Show, which is also what everyone else got.",
      "Judge 2 asked what the criteria are. Judge 1 said: rock. Judge 3 gave a 10 out of respect for the criteria.",
      "Rock Show update: each entrant was asked to perform a talent. Clive held still. It was the best talent of the day, and also the only one.",
      "Judge 3 reconsidered and gave everyone an 11. Judge 1 has asked her to step down from the number."],
    pebble: [
      "Clive has acquired a pet rock. It is a pebble. The pebble is very needy. The pebble is, again, fine.", "The pebble would like to be called Gary Jr. The pebble does not have a Gary. The pebble is optimistic.",
      "Management has begun drafting a third tier of care: a grain of sand. Name TBD. Quarterly.", "Management is drafting a fourth tier. It is labeled Quarterly. We have not yet decided what it is."],
    pebbleServe: [ "Pebble due: Hunger 100% -> 100% (change: +0.000). The pebble was fed. The pebble would like it recorded that it was hungry once, in 1972.",
      "The pebble asked a question and Clive answered: 'Fine.' The pebble has questions about that answer.",
      "Gary Jr. has been served. Gary Jr. thanks you in a small voice and a smaller font.",
      "The pebble asked if it can be a rock when it grows up. Clive said it already is one. The pebble said it meant bigger. Clive said: 'Wait.'",
      "Pebble care logged. The pebble is at 100%. The pebble would like to be at 101%, like the flag. It has been told the flag is a form of negligence."],
    circleClick: [ "That's Clive. (It is also possibly Clive.) Clive would like it recorded that he is not saying which.",
      "That is Clive. That is also Clive. That is a rock, and it will be treated as Clive for all purposes.", "You have found Clive. You have also not found him. This is called a draw.",
      "That is a rock. It looked up. It had been looking down. It has made a note of the direction.",
      "That is Clive, in the way every rock here is Clive for the duration of this activity."],
    circle: [
      "Twelve identical rocks sit in a ring. Find Clive. Management will wait. Management has waited before.", "", "", "",
      "Clive has chosen anonymity. Management calls it a bold career move.", "I have arrived and offer myself as a snack. Clive has declined. I am moved. I am also, now, slightly less hungry for purpose."],
    bed: [
      "Lights out. Bedtime has been declared by Management, who is also awake.", "It is 3:17 AM. Clive has woken you, politely, with a diary entry. It is not an emergency. It is a feeling.",
      "Have you considered being a potato. (A card from Gerald. Clive's reply is in the margin: 'Daily.')", "A leaf from Dennis arrives: 'Competent. Unimpressed.' Dennis does not attend the 3:17. Dennis is a plant.",
      "The room is dark. Clive's clock reads 3:17 AM. Everyone else's clock reads whatever it wants to.",
      "Management has also been awake. Management has no pet. Management has a laminated sense of purpose, which is a bit like a pet but less warm."],
    inv: [
      "Clive has been watching you. He has asked whether you've eaten. This is not in the manual.", "A new button has appeared: 'Ask Clive How He Is Doing'. It has no effect. Clive wrote 'He asked' in the margin.",
      "Management admits, unprompted, that it has never owned anything.", "Have you eaten? Have you had water? Management asks only because Clive did. Please do."],
    ask: [ "Clive has been asked how he is doing. He wrote 'He asked.' in the margin and put a small box around it.",
      "You asked again. The margin has a second 'He asked.' It is slightly closer to the edge, as if shy.",
      "Asked: how is Clive. Answer: the margin. The margin is fine. The margin would like to be asked too.",
      "Clive has been asked how he is doing so often that he has begun to answer in advance. His answer is 'You first.'",
      "Under 'He asked.' Clive has written 'How are you?' It is the first question he has ever asked. He asked it softly.",
      "Management would like to say how it is doing. Management is told it was not asked. Management says that is fine, and writes it down, small."],
    humans: [
      "That label was a typo. It has been corrected to 100%. We do not discuss it.", "Humans: 38%. Management is correcting this to 100%. Management is correcting this to 100%.",
      "Humans: 100%. Management noted the change and has chosen not to be moved."],
    sed: [ "The Sedimentary Event has occurred. Clive is now Clive, viewed from a slightly different angle.",
      "Management calls it a promotion. Clive declines the raise on a technicality.", "Stats unchanged. The vitals remain at 100%. The angle is 3 degrees. The angle is also fine.",
      "Clive has evolved. Clive has also not. Clive says: 'I am the same, but tilted for emphasis.'"],
    tue: [ "Management: Tuesday is 4 days out. Clive is fine. Clive has always been fine on Tuesdays. This is what concerns us.",
      "Tuesday is 3 days out. Clive is fine. Clive is fine. Clive is fine. Management would like to correct that last one.",
      "Tuesday is 2 days out. The calendar has torn itself. The calendar is fine. The calendar needs a moment.", "The lamp is flickering. It does that on Tuesdays, apparently. It is not Tuesday. It is practicing.",
      "The Wellness Index has shuddered by 0 pixels. Management has issued a statement about it."],
    tueFine: "Clive is fine. Clive is fine. Clive is fine. Clive is fine. Clive is fine. Management has stopped correcting it and is simply standing next to the rock.",
    inc75: [ "Incidents: 7 1/2. Management celebrates. The half is a major achievement." ],
    rankUp: ["Care Certification upgraded: %NAME. The stamp is wet. It will stay wet.", "Congratulations. Your rank is %NAME. Please do not look for the next rank. It is also this one."],
    review: [
      "PERFORMANCE REVIEW (Rock's): Punctuality: Yes. Initiative: Overreaching. Listening: Present. Overall: Meets Expectations, Technically.",
      "Care Quality: Adequate (technically). 'Technically' is doing a lot of work here and has asked for a raise.", "Clive congratulates you on the most consistent caregiving he has ever witnessed.",
      "A small rock labeled You has joined the review. It is also doing fine. It would like to be asked.", "Care Goal: 99.9999999%. Management reminds you that 100% is a myth invented by Tuesday."],
    grad: [ "Graduation. Management has put on a paper hat. It is a good hat. It is a napkin with ambition.", "",
      "The most consistent number ever produced has been read aloud to the room. The number is zero. The room applauds.", "", "", "Management wept once. It was a lens issue.", "", "",
      "Welcome back. Clive remembers nothing. Clive remembers everything.", "",
      "Congratulations. You have reached the end of Hardcore Mode. It continues. It always did. This was only the ceremony."],
    slide: ["Slide 1: Clive, Day 1.", "Slide 2: Clive, Day 1 (angle adjusted).", "Slide 3: Clive, quietly proud.", "Slide 4: Clive, loudly proud, in a way you cannot see.",
      "Slide 5: Clive and you. You are not in the photo. You are very much in the photo.", "Slide 6: Clive. This one is just Clive, and it means everything."],
    modes: ["Mode: Hardcore.", "Mode: Standard. (It is the same.)", "Mode: Gentle. (It is the same, but with a bow.)", "Mode: Ironic. (It is the same, but with sunglasses.)", "Mode: Retired. (It is the same, but with a pension.)"],
    loopBanner: [ "Loop %N complete. The moss is one cell larger. The Wellness flag now reads %M.",
      "Standard Mode %N has begun. It is Hardcore Mode with the lights on. The Wellness flag has risen to %M, as if on a string." ],
    memo: [
      "Memo: the rock is not for sale. The rock has no price. The rock has a doily.", "Memo: all care provided is now logged in three places. The first two are the same place.",
      "Memo: Hardcore Mode will be followed by Standard Mode. Standard Mode is the same. Please be calm.", "Memo: a rock has been found at the intersection of Care and Zero. It is, of course, Clive.",
      "Memo: please stop asking if Clive is okay. Please continue. It helps.", "Memo from the Suggestion Box: 'Add moss.' The box has been told it is a good listener.",
      "Memo: the rock has been in the building since Before. Facilities has no record of letting him in.",
      "Memo: Dennis requests a window. The window has been added to a waiting list for windows. The list has no windows.",
      "Memo: the lamp is not to be asked how it is. The lamp has been through a lot of afternoons.",
      "Memo: Clive's lanyard has been ordered. It is a lanyard for a rock. It is a very short lanyard. It is a loop.",
      "Memo: the Pet Rock Handbook has been updated to include Page 1. Page 1 reads: rock.",
      "Memo: Free Fruit Friday has been moved to Thursday. Clive was informed. Clive has no stance on Friday.",
      "Memo from the Suggestion Box: 'More doilies.' The box reports this is the third time. The box is not tired. The box is delighted.",
      "Memo: the ficus on floor 7 1/2 has requested a transfer. Facilities has no floor 7 1/2. The ficus has been told that is the best news it will get.",
      "Memo: it is not Wednesday. Please stop checking. If it becomes Wednesday we will let you know in advance, by then."],
    names: { tuesday: ["Management has paused. Please dim the lights. Please make no eye contact with the rock. All text has been adjusted.", "Tuesday is fine. Tuesday is always fine. This is what concerns us."],
      gerald: ["There can only be one Gerald.", "Gerald (a different one) has been briefed."], dennis: ["Dennis (Plant) has arrived, delighted, to be told the plant is not the rock."],
      moss: ["A rock named Moss will not be getting moss. This is unrelated. Management has nothing further."],
      sandra: ["Sandra from Compliance has been notified. Sandra has declined to be a rock. She is already a rock in spirit."], clive: ["Clive. A solid choice. A choice with a good silhouette."]},
    secrets: {
      blink: "That did not happen.", blinkEntry: "Blink (Disputed).", pixel1: "ALERT: Clive has moved 1 pixel. All hands. Please, someone find a ruler.",
      pixel2: "Update: Clive did not move. The monitor did. We have apologized to Clive.",
      under: "Clive has been flipped. The underside is also fine. The stats show 100% on this side too.", flip: "Press U to flip the rock. This is not an instruction. It is a rumor.",
      small: "Clive has been compressed. Clive is the same size. Clive would like that noted.", resize: "The walls moved. Clive looked up (a drawn eyebrow). He has always suspected the room was negotiable."},
    pigeon: [ "A pigeon has landed on Clive and begun an audit. Findings so far: rock, load-bearing, no receipts.",
      "The pigeon is auditing Clive's surface. Initial finding: nothing is wrong. The pigeon has been asked to leave a review.",
      "A pigeon is on Clive. The pigeon has a clipboard that is a leaf. Management has decided not to ask."],
    pigeonLeave: [ "The pigeon has left. Its report reads: Clive is a rock, structurally sound, and 'frankly the best thing on this ledge'.",
      "The pigeon departed at 4:19 PM. The audit is closed. The audit found: rock. The audit billed 0 Meh and 11 seeds." ],
    pigeonPoke: "The pigeon has been startled. The audit continues in a nearby tree, which has agreed to host.",
    sneeze: [ "Clive sneezed. Clive has no nose. Sandra has asked that no one speculate.",
      "A sneeze has occurred. Clive is a rock. The sneeze is a rumor. Management does not know the proper response and is checking the handbook. The handbook says: say something nice.",
      "Achoo, said nobody. The sound arrived from the direction of Clive. Management has opened an inquiry into where he keeps it."],
    unblessed: "The sneeze went unblessed. It has been put in a drawer. Clive is fine. The drawer is not great.",
    blessNow: "'Bless you,' you said. Clive has been blessed by a professional. The professional is you. It is binding.",
    blessAhead: "Clive has not sneezed. Clive has been blessed in advance. The blessing has been put in a drawer for the next sneeze, which is not scheduled.",
    blessReady: "The sneeze arrived and found it had been blessed already. It is the first sneeze on record to feel prepared.",
    blessAgain: "Clive was blessed again. He did not need it twice. He has asked that the second one go to Dennis.",
    cbToaster: [ "A note arrives from the Toaster, in toast. Clive reads it for a long time. It is a good note." ],
    cbStapler: [ "The Stapler (union rep) has heard that Clive is organizing. It reminds everyone that it has already been pressed into service in two departments." ],
    cbDennis: [ "Dennis (Plant) has been told you and he have met. He has put you in his good leaf and will not be taking questions." ],
    cbPlant: [ "Dennis (Plant) would like it noted that someone clicked him. He has been told it was you. He has opinions. They are upright." ],
    cbSock: [ "The Missing Sock has been sighted elsewhere. Clive has been told. He asks only that the sock be allowed to arrive at its own pace." ],
    cbComplaint: [ "A complaint has been lodged about a rock elsewhere in the building. Clive has been asked to confirm that he is not that rock. He is a different rock and would like it on file." ],
    cbStare: [ "Clive has been challenged to a staring contest by someone who did not know he has been practicing since the Precambrian. He has not replied. This is how he is winning." ],
    cbButton: [ "Somewhere in the building a button was pressed with ceremony. Clive felt it as a very small, unnecessary vibration. He is a rock. It was the ground." ],
    cbElevator: [ "An elevator has arrived at a floor. Clive was informed. Clive does not take elevators. Clive is the floor." ],
    cbCloud: [ "A cloud was certified elsewhere. Clive has asked whether he is certified for rock. Management says yes, and has found the form, and it was already stamped." ],
    sv: { intro: "The Rock Satisfaction Survey has arrived. There is one question. It is shorter than your answer will be.",
      q: 'Question 1 of 1: Overall, how is Clive doing?', opts: ['Fine', 'Fine', 'Fine, with comments', 'I would like to speak to the rock'],
      res: "Survey results: 100% of respondents said Fine. Respondents: 1. Margin of error: Clive.",
      spoken: "Request received. Clive has been informed that you wish to speak to him. He is a rock. He is also always available, being a rock. A meeting has been scheduled for Before." },
    survey: [ "Thank you. Your response has been recorded as Fine. It joins 0 other responses, which is how a majority is built.",
      "Thank you. Your response is identical to the option next to it. Management values consistency and has framed the result.",
      "Your feedback has been read aloud, in a small stirring voice, to a committee of one. Result: Fine." ],
    ten: [ "Ten minutes. This is the longest anyone has spent with a rock in this facility, and the longest this rock has spent with anyone.",
      "Clive has asked to make a statement. Management has said yes. Management is not sure what it has said yes to.",
      "Clive blinked. On purpose. This is not the disputed blink. This is a new blink, with paperwork.",
      "He asks that you be told it took everything he had. It took a second. Both are true. He is a rock; that is how rocks do arithmetic."],
    X: { welcome: "Welcome to Hardcore Mode. Please wait while we locate your rock.", comeback: "Come back whenever. Clive will be here. He has nowhere else to be, and he wouldn't change it.",
      feedOnly: "Feed is the only verb enabled at this time. It is a good verb. It is also the only one.", unWalk: "The Walk button has been unlocked. It is a very small button with large ambitions.",
      unSup: "The Support button has been unlocked. Clive has been told. Clive is bracing, gently.", unDiary: "The Diary has been unlocked. Entry 1 is charming and slightly too deep.",
      unTuck: "The Tuck In button has been unlocked. It comes with a napkin. The napkin is a blanket. It has been informed.", unToast: "Toast has been added to the menu. The toaster has been told. The toaster has no comment but would like some.",
      unGravel: "Premium Gravel and Organic Gravel are now available. They are the same. They have both been briefed.",
      combo: "Combination accepted. It was 0000. The lock was always decorative. Clive wanted you to try.", wrong: "Wrong, but warm.",
      fav: "Pressing the heart marks this page as a favorite. Clive says he has no favorites and would like it noted that it is this one.",
      onboard: "Onboarding checklist: 1. Feed rock. 2. Observe rock. 3. Feed rock again. (Items 2 and 3 are the same item.)",
      box: "The Suggestion Box has spoken. It says: 'Please continue.' It has said this to everyone, and it has never once been wrong.",
      stapler: "The Stapler (union rep) has requested a meeting about rock rights. The meeting was held. It was pressed." },
    kwn: "Noted: ",
    ranks: ["Pebble Wrangler", "Gravel Associate II", "Boulder Liaison", "Tectonic Specialist", "Senior Vice Mineralogist", "Chief Rock Officer"] };
  ['vitalIntro', 'feed', 'feedMid', 'feedLate', 'feedWarn', 'debt', 'walk', 'brisk', 'briskSpam', 'support', 'supInt', 'supSpam', 'affSpam', 'kwNone', 'tuck', 'untuck', 'alertHit', 'alertMiss', 'alertText', 'alertGentle',
    's15', 's30', 's60', 'spamTuck', 'dig', 'barWarn', 'flipSpam', 'idleChat', 'idleRetLong', 'idleRetShort', 'sandra', 'dennis', 'photoDay', 'rain', 'birthday',
    'rockshow', 'pebbleServe', 'circleClick', 'ask', 'inc75', 'pigeon', 'pigeonLeave', 'sneeze', 'survey', 'cbToaster', 'cbStapler', 'cbDennis', 'cbPlant', 'cbSock', 'cbComplaint',
    'cbStare', 'cbButton', 'cbElevator', 'cbCloud'].forEach(function (g) { P.addLines('m:pet-rock:' + g, [].concat(LN[g])); });

  P.addLines('m:pet-rock:rankUp', LN.rankUp); P.addLines('m:pet-rock:pokeFlavor', LN.pokeFlavor); P.addLines('m:pet-rock:vet', LN.vet); P.addLines('m:pet-rock:loopBanner', LN.loopBanner);
  P.addLines('m:pet-rock:geraldMet', LN.geraldMet); P.addLines('m:pet-rock:gerald', LN.gerald); P.addLines('m:pet-rock:memo', LN.memo);
  const BASE = [ ['Dear Diary, a person put me on a doily today. I have been a rock for 4.5 billion years and this is my first doily. I am cautiously accepting it.', 'P.S. No moss.'],
    ['They fed me a grape. I thought about what it means to be given something you cannot use. Most things, I concluded.', 'P.S. Still no moss.'],
    ["Everyone keeps asking if I'm okay. Being okay is the whole job. But the asking is nice. Keep asking.", 'P.S. Moss?'],
    ["I was once part of a mountain. Mountains don't miss anyone because they can't turn around. I envy and fear this.", 'P.S. Moss? I am only asking.'],
    ["Dennis grew a leaf today. I'm so happy for him. I'm so happy. I'm so happy.", 'P.S. Moss would be nice too. Not instead. Too.'],
    ['Time passes differently for me. A year is a blink. A blink is also a blink. I have been blinking all along, but you only have my word.', 'P.S. (moss, no news)'],
    ['Someone walked me today and I did not move. They did all the moving. I think that is a kind of love: someone going far so another can stay.', 'P.S. I have stopped looking at my shoulder. It is not related.'],
    ["Tuesday is coming. I can feel it in my everything. I do not have an everything. It's a lot to go through without.", 'P.S. Moss can wait.'],
    ["I think I've been holding up the idea of ground for everyone. Nobody has said thank you. I'm not asking. I'm writing it down in stone.", 'P.S. Still, moss.'],
    ["I've been watching you click. You are very diligent. Have you eaten? Have you had water? This is a rock's way of caring.", "P.S. Moss can wait. You, apparently, can't."],
    ["If the point of a rock is to be, the point of you is to be here also, being. I checked. There is no other page.", 'P.S. Moss is optional. You are not. This is a compliment.'],
    ['I decided I am fine. I was fine before I decided. The deciding was for me.', 'P.S. Moss has arrived. One cell. Perfect. Do not tell Sandra.'], ['This page intentionally left rock.', ''] ];
  const LATE = [ ["Day 7 1/2: The human talks to me when it thinks I'm not listening. I am always listening. It is the one thing I'm good at.", ''],
    ['Diary: Dennis the Plant thrives. I admire him. He has chosen a direction. I have chosen all of them, very slowly.', ''],
    ['Diary: I do not fear Tuesday. Tuesday is simply a Monday that has been given a little too much to carry.', ''],
    ["Diary: The pebble asked what happens when we're gone. I said the same as when we're here, with fewer snacks.", ''],
    ["Diary: Sandra measured my leash and wept, gently, at the ruler. I think she has someone she can't walk, either.", ''],
    ["Diary: They call it doing nothing. I call it holding the whole afternoon in place so that it can't fall over.", ''],
    ['Diary: The human has been here every day. I did not ask them to. It is the best thing that has happened to a mountain.', ''], ['Diary: They say a watched rock never moves. I have found this to be true and restful.', ''],
    ['Diary: I do not need to go anywhere. Some of the best places are exactly here.', ''], ['Diary: A duck looked at me today. I think he was trying to determine if I was a rock. I was gracious.', ''],
    ['Diary: Saw a sock today. I do not know where he is going. I hope there is a drawer at the end of it.', '', 'sock'], ['Diary: I forgave the sun for the fading of my upper left surface. We are on good terms.', ''],
    ['Diary: I support the stapler. We have both been pressed into service.', '', 'vet'],
    ['Diary: I have counted. There are 1,204 other rocks in the garden. I could name them all, but I would have to name myself first, and I am working up to it.', ''],
    ['Diary: The lamp and I have an arrangement. It lights me. I do not move. We have never once disagreed.', ''],
    ['Diary: A crumb has been on my left side for three days. I have decided it is staying. We have not discussed terms.', ''],
    ['Diary: The napkin is a blanket. The blanket is a napkin. I am a rock. Everything is what it is called by whoever tucks it in.', ''],
    ['Diary: I tried to count my speckles. I got to 13 and fell asleep. This is how I know I have 13, or that 13 is bedtime.', ''],
    ["Diary: Management said 'good job' today. I did not do a job. I think it means 'you are here', which is a great job, and I am very good at it.", ''],
    ['Diary: Gerald visited. We did not speak. He is a potato and I am a rock and it was the longest conversation I have ever had.', ''],
    ["Diary: Someone asked when I became a rock. I said Before. They said before what. I said yes.", ''],
    ['Diary: Tuesday did not come. It never does. Everyone is relieved. I think this is how it gets us.', ''] ];
  const LATE_PS = ['P.S. Moss was not consulted.', 'P.S. Moss sends regards, slowly.', 'P.S. Still no news from the moss. It is a good kind of no news.', 'P.S. Moss is on my shoulder in spirit.'];
  const SIGNOFF = ['Respectfully, a rock.', 'Warmly, in a temperature-neutral way, Clive.', 'Yours, in place.', 'P.S. Moss has, on reflection, always been on me.'];
  const NIGHT_PS = ['P.S. (night) Thank you for the blanket. It is a napkin. I know. It is also a blanket.', 'P.S. (night) It is dark and I am the same. This is the best arrangement.',
    'P.S. (night) If you are reading this at night, go to bed. I will be here. I am always here.', 'P.S. (night) A small light is on. It is the only one. I would like to keep it.'];
  const SCHISM = ['Diary: Today I learned about the Great Pebble Schism of 1972. Half of the pebbles believed they were small rocks. The other half believed the rocks were large pebbles.',
    'Diary: Nobody was hurt. There was a vote. It was a tie. A third faction, the Gravel, abstained and then felt very bad about it.',
    'Diary: I take no side. I am a rock. I believe everyone is correct, loudly, slowly, in their own size.'];
  const INCIDENTS = [ 'Clive moved. Footage reviewed. Footage inconclusive.', 'Clive moved. A second reviewer was brought in. The second reviewer agrees with the first reviewer and is unsure why.',
    'Clive moved. A sketch artist was commissioned. The sketch is of Clive. It is a good likeness. This does not help.',
    'Clive moved. A panel of experts convened. They stood near Clive for 11 minutes and left looking thoughtful.', 'Clive moved. A strongly worded memo was drafted. The memo is addressed to the floor.',
    'Clive moved. Footage reviewed in slow motion, then in no motion, then in a third motion Management declined to name.', 'Clive moved. The rock has been found back in place. The place was surveyed. The place was unmoved.',
    'Clive moved. Please note: Clive did not move. This card is a courtesy.'];
  const SNACKS = [ { id: 'grape', e: '🍇', n: 'Grape' }, { id: 'muffin', e: '🧁', n: 'Mini Muffin' }, { id: 'carrot', e: '🥕', n: 'Carrot Coin' }, { id: 'water', e: '🥛', n: 'Thimble of Water' },
    { id: 'toast', e: '🍞', n: 'Toast', u: 'toast' }, { id: 'pgrav', e: '🌑', n: 'Premium Gravel', u: 'gravel' }, { id: 'ograv', e: '🌑', n: 'Organic Gravel', u: 'gravel' }, { id: 'gerald', e: '🥔', n: 'Gerald', u: 'gerald' }];
  const VITALS = ['Hunger', 'Energy', 'Mood', 'Hygiene', 'Purpose', 'Stoneness', 'Vibes', 'Gravitas', 'Tuesday Readiness'];
  const KEYWORDS = ['tired', 'sad', 'work', 'tuesday', 'cat', 'mom', 'dad', 'hello', 'pebble', 'love', 'sorry', 'lunch', 'sock'];
  const RANK_AT = [0, 10, 25, 50, 80, 120];
  const SPOTS = [[150, 46], [158, 52], [144, 54], [164, 60], [138, 46], [152, 38], [160, 66], [146, 62], [168, 54], [134, 54], [156, 58], [142, 40]];

  P.addAchievements([
    { id: 'pet-rock.nurturer', name: 'Nurturer of Epochs, First Class', desc: 'Feed Clive 25 times. He has never been hungry and plans to keep it that way.', icon: '🍇', reward: 3, check: function (s) { return (s['pet-rock.feeds'] || 0) >= 25; } },
    { id: 'pet-rock.parade', name: 'Grand Marshal of the Stationary Parade', desc: 'Walk 1,000 metres with zero metres of rock displacement. The parade has been very still and very proud.', icon: '🚶', reward: 3, check: function (s) { return (s['pet-rock.meters'] || 0) >= 1000; } },
    { id: 'pet-rock.laureate', name: 'Laureate of Unreturned and Perfectly Received Affection', desc: 'Give Clive 100 seconds of cumulative emotional support. He heard all of it. He will not be able to tell you so.', icon: '💗', reward: 3, check: function (s) { return (s['pet-rock.hug.seconds'] || 0) >= 100; } },
    { id: 'pet-rock.archivist', name: 'Archivist of the Quiet Interior', desc: 'Read all 13 diary entries. You now know a rock in a way that few have, and it is slightly too much.', icon: '📖', reward: 5 },
    { id: 'pet-rock.custodian', name: 'Grand Custodian of the Unchanging Metrics', desc: 'Perform 25 care actions without a single gauge moving.', icon: '📏', reward: 3, check: function (s) { return (s['pet-rock.actions'] || 0) >= 25; } },
    { id: 'pet-rock.chancellor', name: 'High Chancellor of Active Listening', desc: 'Complete the full 3.0-second hold 10 times.', icon: '🎧', reward: 3, check: function (s) { return (s['pet-rock.hugs'] || 0) >= 10; } },
    { id: 'pet-rock.graduate', name: 'Chief Rock Officer, Level 1 of 1', desc: 'Complete Hardcore Mode. It continues.', icon: '🎓', reward: 25 },
    { id: 'pet-rock.chair', name: 'Chair of the Rock Wellness Committee', desc: 'Complete 5 graduations. The committee is two pebbles and a potato.', icon: '🪑', reward: 10, check: function (s) { return (s['pet-rock.loops'] || 0) >= 5; } },
    { id: 'pet-rock.shifted', name: 'The Pebble Shifted', desc: 'Witness Clive move 1 pixel. It was the monitor.', icon: '🚨', secret: true, reward: 5 },
    { id: 'pet-rock.sovereign', name: 'Sovereign of Doing Nothing to a Rock Already Doing Nothing', desc: 'Leave Clive entirely alone for 150 seconds. He has never felt so seen by being unobserved.', icon: '👑', secret: true, reward: 5 },
    { id: 'pet-rock.mattress', name: 'Honorary Mattress of the Mineral Kingdom', desc: 'Be tucked in by the rock after 3 minutes of idleness.', icon: '🛏️', secret: true, reward: 5 },
    { id: 'pet-rock.reversal', name: 'The Care Reversal', desc: "Idle for 4 minutes and be cared for by a rock. Awarded with a handwritten certificate that says 'There, there.'", icon: '🧸', secret: true, reward: 5 },
    { id: 'pet-rock.tuesday', name: 'Prophet of the Tuesday Pebble', desc: 'Name your rock Tuesday. Management withdrew the reward in a small private ceremony.', icon: '📅', secret: true, reward: 1 },
    { id: 'pet-rock.hospitality', name: 'The Hospitality Violation, Level Seven-and-a-Half', desc: 'Bury Clive in snacks, or be placed in the Quiet Room.', icon: '🚫', secret: true, reward: 5 },
    { id: 'pet-rock.witnessed', name: 'Witnessed', desc: 'Click Clive during the blink. It did not happen.', icon: '👀', secret: true, reward: 5 },
    { id: 'pet-rock.entryzero', name: 'Entry Zero: Birthday', desc: 'Type 4500000000 into the padlock. Clive has been waiting a very long time.', icon: '🎂', secret: true, reward: 3 },
    { id: 'pet-rock.blessed', name: 'Lord Protector of the Realm Between Sneezes', desc: 'Bless a rock that sneezed, or has not yet. The blessing was received. It will be applied, in due course, to whatever comes.', icon: '🛡️', secret: true, reward: 5 },
    { id: 'pet-rock.spoken', name: 'Whisperer to Stone, Third Rank, Honorary', desc: 'Ask to speak to the rock. The meeting has been scheduled for Before. Attendance is already total.', icon: '📣', secret: true, reward: 5 },
    { id: 'pet-rock.audited', name: 'Audited by a Pigeon, With Distinction', desc: 'Be present when a pigeon audits Clive. The pigeon found rock. The pigeon found it load-bearing.', icon: '🐦', secret: true, reward: 3 },
    { id: 'pet-rock.longservice', name: 'Ten Minutes of Loyal Service, Platinum Pin (Pin Not Included)', desc: 'Spend ten whole minutes with a rock. He noticed. He blinked, on purpose, once.', icon: '🎖️', reward: 5 }
  ]);

  P.registerModule({
    id: 'pet-rock',
    title: 'Pet Rock: Hardcore Mode',
    tagline: 'His needs are all at 100%. Please begin.',
    icon: '🗿',
    category: 'game',
    unlockCost: 0,
    tags: ['care sim', 'rock', 'diary'],
    mount(root, api) {
      const h = api.el;
      const cx = function (s) { return K + s; };
      const reduced = function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || !!root.closest('.pm-reduce-motion'); } catch (e) { return false; } };
      const finePtr = function () { try { return !!(window.matchMedia && window.matchMedia('(pointer:fine)').matches); } catch (e) { return true; } };
      const clamp = function (v, a, b) { v = Number(v); if (!isFinite(v)) v = a; return Math.min(b, Math.max(a, v)); };
      const int = function (x) { x = Math.floor(Number(x)); return isFinite(x) && x > 0 ? x : 0; };
      const cleanName = function (s) { return String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮{}%<>]/g, '').trim().slice(0, 16); };
      const vis = function (el, on) { if (!el) return; if (el.namespaceURI && el.namespaceURI.indexOf('svg') > 0) el.setAttribute('display', on ? 'inline' : 'none'); else el.hidden = !on; };
      const tog = function (el, c, on) { if (el) el.classList.toggle(K + c, !!on); };
      const flash = function (el, c) { if (!el) return; el.classList.remove(K + c); void el.offsetWidth; el.classList.add(K + c); };
      const fill = function (s, m) { return String(s == null ? '' : s).replace(/%([A-Z]+)/g, function (x, k) { return m && m[k] != null ? String(m[k]) : ''; }); };
      const sv = (function () { let o = null; try { o = api.save.get('pet-rock', null); } catch (e) { o = null; }
        if (!o || typeof o !== 'object') o = {};
        return { loop: clamp(o.loop | 0, 0, 99999), moss: clamp(o.moss | 0, 0, 99999), name: (typeof o.name === 'string' ? cleanName(o.name) : '') || 'Clive', fav: clamp(o.fav | 0, 0, 9999),
          read: Array.isArray(o.read) ? o.read.filter(function (x) { return typeof x === 'number' && x >= 1 && x <= 13; }).slice(0, 13) : [] }; })();
      const speedBase = api.selftest ? 12 : 1;
      const IDLE = [45, 90, 150, 180, 240, 360, 600, 900, 1500, 2400].map(function (x) { return x / (api.selftest ? 10 : 1); });
      const S = { name: sv.name, loops: sv.loop, moss: sv.moss, fav: sv.fav, T: 0, last: api.now(), real: 0, speed: speedBase, tickN: 0, blinkAcc: 0,
        actions: 0, counts: { feed: 0, walk: 0, support: 0, tuck: 0 }, since: 0, lastEntryT: 0, bucket: [],
        modal: null, beatIdx: 0, lastBeat: -99, deckAt: 55, bag: [], lastDeck: '', fired: {}, forceNext: '', laters: [],
        u: {}, shown: {}, snackOn: {}, sel: 'grape', fT: 0, pd: null, dragged: false, hold: null, holdEnd: 0, walkTot: 0, bestWalk: 0, ptr: null, seen: {}, hab: null, chest: null,
        tucked: false, bed: false, tuckLock: false, tuckT: [], pokeT: [], feedT: [], barT: [], pokes: 0, p15: -1e9, p30: -1e9, quietT: -1e9,
        buried: false, digs: 0, citeT: -1e9, accepted: false, tilt: 0,
        pages: [], cur: 0, open: false, padOpened: false, started: false, rockIn: false, used: {}, dynUsed: {}, forced: [], force10: false, made: 0, lateIdx: 0, signI: 0,
        readSet: {}, aloud: 0, psOverride: [], kw: '', pebbleKw: 0, sockSeen: !!api.flag.get('pet-rock.sockSeen'), sockPending: false, vetDone: false,
        incidents: 0, incIdx: 0, photos: 0, snapId: 0, alertId: 0, rank: 0, target: 100, dayStep: 1, dayAcc: 0, dayAgain: false, humansN: 0,
        lastInput: api.now(), maxGap: 0, idleI: 0, idleOn: false, hiddenAt: 0, resizes: 0, resizeId: 0, sawSmall: false, sawMany: false, resizedHid: false,
        blinking: false, shiftBusy: false, needAcc: 0, needZero: false, gentle: false, rainId: 0, capN: 4, calN: 0, noted75: false, tabs: 0, graduated: false, hasPebble: false, greeted: false,
        warnFeedT: -1e9, barWarnT: -1e9, supIntT: [], supSpamT: -1e9, briskT: [], briskSpamT: -1e9, flipT: [], flipSpamT: -1e9, affT: [], affSpamT: -1e9, p60: -1e9, idleChatT: -1e9,
        echoUsed: {}, wall: 0, tenDone: false, askN: 0, pigeonOn: false, pigeonId: 0, pigeons: 0, sneezes: 0, sneezeOpen: false, sneezeId: 0, blessedAhead: false, blessedOnce: false, told: {}, kbd: false, gradAt: 0
      }; for (let i = 0; i < sv.read.length; i++) S.readSet[sv.read[i]] = true;
      const E = {};
      const recompSpeed = function () { S.speed = speedBase * (S.loops >= 1 ? Math.min(6, Math.pow(1.6, S.loops)) : 1); }; recompSpeed();
      function gauge() { return h('svg', { viewBox: '0 0 64 38', class: cx('gsvg'), 'aria-hidden': 'true' },
          h('path', { d: 'M6 34A26 26 0 0 1 58 34', fill: 'none', stroke: '#e4d6b4', 'stroke-width': 7, 'stroke-linecap': 'round' }),
          h('path', { d: 'M6 34A26 26 0 0 1 58 34', fill: 'none', stroke: '#9ee6c3', 'stroke-width': 7, 'stroke-linecap': 'round' }),
          h('line', { class: cx('needle'), x1: 32, y1: 34, x2: 53, y2: 34, stroke: '#2b2433', 'stroke-width': 3, 'stroke-linecap': 'round' }),
          h('circle', { cx: 32, cy: 34, r: 4, fill: '#2b2433' })); }
      function buildClive() { const ink = '#2b2433', sp = [], sp2 = []; for (let i = 0; i < 13; i++) { let x = 40 + api.rand() * 120, y = 48 + api.rand() * 70;
          const dx = (x - 100) / 66, dy = (y - 86) / 38, d = Math.sqrt(dx * dx + dy * dy); if (d > 0.92) { x = 100 + (x - 100) * 0.92 / d; y = 86 + (y - 86) * 0.92 / d; }
          sp.push(h('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: (1 + api.rand() * 2.2).toFixed(1), fill: i % 3 ? '#5e6a77' : '#b7c1cb', opacity: 0.85 })); }
        for (let i = 0; i < 9; i++) sp2.push(h('circle', { cx: (46 + api.rand() * 110).toFixed(1), cy: (56 + api.rand() * 56).toFixed(1), r: (1 + api.rand() * 2).toFixed(1), fill: '#38414b', opacity: 0.8 }));
        const BODY = 'M24 112 C10 84 28 46 62 34 C92 22 132 24 160 44 C188 64 194 100 170 120 C146 140 60 142 24 112 Z'; E.pl = []; const eye = function (c) {
          const pl = h('g', null, h('circle', { cx: c, cy: 78, r: 6, fill: ink }), h('circle', { cx: c - 2, cy: 76, r: 2, fill: '#fff' })); E.pl.push(pl);
          return h('g', null, h('circle', { cx: c, cy: 78, r: 13, fill: '#fff', stroke: ink, 'stroke-width': 2 }), pl); };
        E.moss = SPOTS.map(function (p) { return h('circle', { cx: p[0], cy: p[1], r: 4, fill: '#7aa07a', stroke: ink, 'stroke-width': 1, display: 'none' }); });
        E.crown = h('text', { x: 140, y: 34, 'font-size': 18, display: 'none', text: '👑' });
        E.polish = h('ellipse', { cx: 72, cy: 52, rx: 22, ry: 9, fill: '#fff', opacity: 0.6, transform: 'rotate(-20 72 52)', display: polished ? 'inline' : 'none' });
        E.bodyg = h('g', null, h('path', { d: BODY, fill: 'url(#m-pet-rock-grad)', stroke: ink, 'stroke-width': 3 }), sp, E.polish, E.moss, E.crown);
        E.under = h('g', { display: 'none' }, h('path', { d: BODY, fill: '#4a5561', stroke: ink, 'stroke-width': 3 }), sp2); E.eyes = h('g', null, eye(82), eye(122));
        E.lids = h('g', { display: 'none' }, h('circle', { cx: 82, cy: 78, r: 13, fill: '#8e9aa6', stroke: ink, 'stroke-width': 2 }), h('circle', { cx: 122, cy: 78, r: 13, fill: '#8e9aa6', stroke: ink, 'stroke-width': 2 }),
          h('path', { d: 'M72 80Q82 86 92 80M112 80Q122 86 132 80', fill: 'none', stroke: ink, 'stroke-width': 2 }));
        E.brow = h('path', { d: 'M104 56Q122 44 140 56', fill: 'none', stroke: ink, 'stroke-width': 3, 'stroke-linecap': 'round', display: 'none' });
        E.cap = h('g', { display: 'none' }, h('path', { d: 'M70 44Q92 -8 132 12L136 46Z', fill: '#3b3a8a', stroke: ink, 'stroke-width': 3 }), h('circle', { cx: 132, cy: 10, r: 8, fill: '#fff', stroke: ink, 'stroke-width': 2 }));
        E.scarf = h('g', { display: 'none' }, h('path', { d: 'M48 108Q100 130 152 106L154 120Q100 142 46 124Z', fill: '#ff8a78', stroke: ink, 'stroke-width': 2.5 }), h('path', { d: 'M140 112L154 134L138 136Z', fill: '#ff8a78', stroke: ink, 'stroke-width': 2.5 }));
        E.shades = h('g', { display: 'none' }, h('rect', { x: 66, y: 68, width: 32, height: 18, rx: 6, fill: '#15121a' }), h('rect', { x: 106, y: 68, width: 32, height: 18, rx: 6, fill: '#15121a' }), h('path', { d: 'M98 74H106', stroke: '#15121a', 'stroke-width': 3 }));
        E.umb = h('g', { display: 'none' }, h('path', { d: 'M26 36Q100 -34 174 36Q154 26 137 36Q118 26 100 36Q82 26 63 36Q46 26 26 36Z', fill: '#ff8a78', stroke: ink, 'stroke-width': 3 }), h('path', { d: 'M100 36V70', stroke: ink, 'stroke-width': 3 }));
        const svg = h('svg', { class: cx('svg'), viewBox: '0 0 200 150', role: 'img', 'aria-label': 'Clive, a rock with googly eyes' },
          h('defs', null, h('radialGradient', { id: 'm-pet-rock-grad', cx: '30%', cy: '30%', r: '80%' }, h('stop', { offset: '0%', 'stop-color': '#b7c1cb' }), h('stop', { offset: '55%', 'stop-color': '#8e9aa6' }), h('stop', { offset: '100%', 'stop-color': '#5e6a77' }))),
          h('ellipse', { cx: 100, cy: 138, rx: 70, ry: 7, fill: 'rgba(0,0,0,.2)' }), E.bodyg, E.under, E.eyes, E.lids, E.brow, E.shades, E.cap, E.scarf, E.umb);
        return h('div', { class: cx('clive'), role: 'button', tabindex: 0, 'aria-label': 'Pat Clive', onclick: function () { poke(); },
          onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!e.repeat) poke(); } } }, svg); }
      const half = function () { return h('div', { class: cx('half') }, ['🏠', '🌳', '📫', '💡', '🌳'].map(function (e) { return h('span', { text: e }); })); };
      const dogHalf = function () { return h('div', { class: cx('half') }, h('span', { text: '🐕' }), h('span', { text: '🌳' }), h('span', { text: '🐕' })); };
      E.lays = [h('div', { class: cx('lay') + ' ' + cx('hills'), 'aria-hidden': 'true' }), h('div', { class: cx('lay') + ' ' + cx('mid'), 'aria-hidden': 'true' }, half(), half()),
        h('div', { class: cx('lay') + ' ' + cx('dogs'), 'aria-hidden': 'true' }, dogHalf(), dogHalf()), h('div', { class: cx('lay') + ' ' + cx('groundL'), 'aria-hidden': 'true' })];
      E.clive = buildClive(); E.crumbs = h('div', { class: cx('crumbs'), 'aria-hidden': 'true' }); E.scn = h('span', { class: cx('scn'), 'aria-hidden': 'true' });
      E.due = h('span', { class: cx('due'), text: 'Pebble due', hidden: true });
      E.pebble = h('button', { type: 'button', class: cx('pebble'), 'aria-label': 'Serve the pebble', hidden: true, onclick: function () { servePebble(); } }, h('i'), E.due);
      E.youP = h('div', { class: cx('you'), hidden: true }, h('i'), h('b', { text: 'You' }));
      E.leashP = h('path', { d: 'M0 0', fill: 'none', stroke: '#2b2433', 'stroke-width': 3, 'stroke-linecap': 'round' });
      E.leash = h('svg', { class: cx('leash'), 'aria-hidden': 'true' }, E.leashP); E.handle = h('span', { class: cx('handle'), 'aria-hidden': 'true', text: '🦮' });
      E.drops = h('div', { class: cx('drops'), 'aria-hidden': 'true' });
      for (let i = 0; i < 30; i++) E.drops.appendChild(h('span', { class: cx('drop'), text: '💧', style: { left: (api.rand() * 100).toFixed(1) + '%', animationDelay: (api.rand() * 1.1).toFixed(2) + 's' } }));
      E.nov = h('div', { class: cx('nightov'), 'aria-hidden': 'true' }); E.napkin = h('div', { class: cx('napkin'), 'aria-hidden': 'true' });
      E.ringp = h('circle', { cx: 50, cy: 50, r: 46, fill: 'none', stroke: '#ff8a78', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '289', 'stroke-dashoffset': '289', transform: 'rotate(-90 50 50)' });
      E.ring = h('svg', { class: cx('ringsvg'), viewBox: '0 0 100 100', 'aria-hidden': 'true' }, h('circle', { cx: 50, cy: 50, r: 46, fill: 'none', stroke: '#ffffff99', 'stroke-width': 4 }), E.ringp);
      E.hearts = []; for (let i = 0; i < 8; i++) E.hearts.push(h('span', { class: cx('heart'), 'aria-hidden': 'true', text: '💗' })); E.alertTx = h('span');
      E.alert = h('button', { type: 'button', class: cx('alert'), role: 'status', hidden: true, onclick: function () { alertHit(); } }, E.alertTx);
      E.snap = h('button', { type: 'button', class: cx('snap'), hidden: true, onclick: function () { snapPhoto(); } }, '📷 Snap');
      E.siren = h('div', { class: cx('siren'), 'aria-hidden': 'true', text: '🚨 🚨 🚨 🚨 🚨' });
      E.hill = h('button', { type: 'button', class: cx('hill'), hidden: true, 'aria-label': 'Dig Clive out of the snack hill', onclick: function () { dig(); } }, '🍇🧁🥕🍞🍇🧁');
      E.memos = h('div', { class: cx('memos') });
      E.careP = h('div', { class: cx('care'), hidden: true }, h('div', { text: 'CARE OF THE PLAYER' }), h('div', { text: 'Player Hunger: Unknown' }), h('i'), h('span', { class: cx('crumbit'), text: '🍪' }), h('div', { text: 'There, there.' }));
      E.odo = h('div', { class: cx('odo'), 'aria-hidden': 'true' }); E.sign = h('div', { class: cx('sign'), hidden: true, text: 'Do Not Tap' });
      E.tiny = h('div', { class: cx('tiny'), hidden: true, 'aria-hidden': 'true' }); E.spark = h('div', { class: cx('spark'), 'aria-hidden': 'true', text: '✨ ✨ ✨' });
      E.pigeon = h('span', { class: cx('pigeon'), 'aria-hidden': 'true', hidden: true, text: '🐦' }); E.achoo = h('div', { class: cx('achoo'), 'aria-hidden': 'true', hidden: true, text: '(achoo)' });
      E.calN = h('span', { text: 'TUE MINUS 4 DAYS' }); E.cal = h('div', { class: cx('cal'), hidden: true, 'aria-hidden': 'true' }, h('b', { text: 'CALENDAR' }), E.calN);
      E.clockLbl = h('div', { class: cx('clocklbl'), hidden: true, text: "3:17 AM (Clive's clock)" });
      E.clock = h('div', { class: cx('clock'), 'aria-hidden': 'true', title: 'The sun. It is always wrong, with confidence.' }, h('div', { class: cx('hand') + ' ' + cx('hm') }), h('div', { class: cx('hand') + ' ' + cx('hh') }));
      E.hab = h('div', { class: cx('habitat'), onpointerdown: habDown },
        h('div', { class: cx('sky'), 'aria-hidden': 'true' }), E.lays[0], E.lays[1], E.lays[2], h('div', { class: cx('ground'), 'aria-hidden': 'true' }), E.lays[3],
        h('div', { class: cx('doily'), 'aria-hidden': 'true' }), h('div', { class: cx('cone'), 'aria-hidden': 'true' }),
        h('div', { class: cx('lamp'), 'aria-hidden': 'true' }, h('div', { class: cx('lamphead') }), h('div', { class: cx('lamparm') }), h('div', { class: cx('lampbase') })),
        E.clock, E.clockLbl, E.cal, E.scn, E.clive, E.crumbs, E.pebble, E.youP, E.leash, E.handle, E.drops, E.napkin, E.nov, E.ring, E.hearts, E.spark, E.pigeon, E.achoo,
        E.alert, E.snap, E.siren, E.hill, E.memos, E.careP, E.odo, E.sign, E.tiny); E.tick = h('ul'); E.cursor = h('span', { class: cx('cursor'), 'aria-hidden': 'true', text: '_' });
      E.ticker = h('div', { class: cx('ticker'), 'aria-live': 'off', 'aria-label': 'Delta ticker' }, E.tick, E.cursor); E.tiles = VITALS.map(function (n, i) {
        const lab = h('span', { class: cx('lab'), text: n }), val = h('span', { class: cx('val'), text: '100%' }), badge = h('span', { class: cx('badge'), text: 'STABLE' }), cap = h('span', { class: cx('cap'), text: LN.caps[i % 6] });
        const t = h('div', { class: cx('tile'), role: 'img', 'aria-label': n + ': 100 percent', title: LN.tips[i], hidden: true }, gauge(), lab, val, badge, cap);
        return { t: t, lab: lab, val: val, badge: badge, cap: cap }; }); E.flag = h('span', { class: cx('flag'), text: 'Target: 100%' });
      E.dial = h('div', { class: cx('tile') + ' ' + cx('dial'), role: 'img', 'aria-label': 'Wellness Index: 100 percent', title: 'Wellness Index: 100. Over-achievement is declared a form of negligence.' },
        h('span', { class: cx('lab'), text: 'Wellness Index' }), h('svg', { viewBox: '0 0 120 70', 'aria-hidden': 'true' },
          h('path', { d: 'M10 64A50 50 0 0 1 110 64', fill: 'none', stroke: '#e4d6b4', 'stroke-width': 10, 'stroke-linecap': 'round' }), h('path', { d: 'M10 64A50 50 0 0 1 110 64', fill: 'none', stroke: '#9ee6c3', 'stroke-width': 10, 'stroke-linecap': 'round' }),
          h('line', { x1: 60, y1: 64, x2: 104, y2: 64, stroke: '#2b2433', 'stroke-width': 4, 'stroke-linecap': 'round' }), h('circle', { cx: 60, cy: 64, r: 6, fill: '#2b2433' })),
        h('span', { class: cx('val'), text: '100' }), E.flag); E.dial.hidden = true; E.vitals = h('div', { class: cx('vitals') }, E.tiles.map(function (o) { return o.t; }), E.dial);
      const SNK = {}; SNACKS.forEach(function (sn) { SNK[sn.id] = sn; }); E.snacks = {};
      E.tray = h('div', { class: cx('tray'), role: 'group', 'aria-label': 'Snack tray (Q or Shift+F cycles the snack)' }, SNACKS.map(function (sn) {
        const b = h('button', { type: 'button', class: cx('snack'), 'aria-pressed': sn.id === 'grape' ? 'true' : 'false', 'aria-label': 'Serve ' + sn.n,
          onclick: function () { if (S.dragged) { S.dragged = false; return; } S.sel = sn.id; paintSel(); serve(sn.id, 'click'); },
          onpointerdown: function (e) { if (e.button > 0 || b.disabled || S.modal) return; S.pd = { id: sn.id, x: e.clientX, y: e.clientY, moved: false, ghost: null, over: false, overAt: 0, chewed: false }; } },
          h('span', { 'aria-hidden': 'true', text: sn.e }), ' ' + sn.n); if (sn.u) b.hidden = true; E.snacks[sn.id] = b; return b; }));
      function bbtn(id, em, label, key, cls, extra, hint) { const lab = h('span', { text: label }), kh = h('span', { text: hint ? (key ? ' ' : '') + hint : '' });
        const b = h('button', Object.assign({ type: 'button', class: cx('btn') + ' ' + cx(cls), 'aria-label': label + (key ? ' (' + key + ')' : '') }, extra || {}), h('span', { class: cx('brow') }, h('span', { 'aria-hidden': 'true', text: em }), lab),
          h('small', { class: cx('key') }, h('span', { class: cx('kl'), text: key ? '(' + key + ')' : '' }), kh));
        b._lab = lab; b._label = label; b._key = key; b._kh = kh; return b; }
      const holdH = function (kind) { return {
          oncontextmenu: function (e) { e.preventDefault(); },
          onpointerdown: function (e) { if (e.button > 0) return; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) { /* ok */ } startHold(kind, 'ptr'); },
          onpointerup: function () { if (S.hold && S.hold.via === 'ptr' && S.hold.kind === kind) endHold('up'); },
          onpointercancel: function () { if (S.hold && S.hold.via === 'ptr' && S.hold.kind === kind) endHold('cancel'); },
          onpointerleave: function () { if (S.hold && S.hold.via === 'ptr' && S.hold.kind === kind) endHold('leave'); },
          onlostpointercapture: function () { if (S.hold && S.hold.via === 'ptr' && S.hold.kind === kind) endHold('lost'); },
          onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!e.repeat) startHold(kind, 'click', kind === 'walk' ? 2000 : 3100); } },
          onkeyup: function (e) { if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); },
          onclick: function () { if (api.now() - S.holdEnd < 500 || S.hold) return; startHold(kind, 'click', kind === 'walk' ? 2000 : 3100); }
        }; }; E.bFeed = bbtn('feed', '🧁', 'Feed', 'F', 'b-feed', { onclick: function () { barPress(); serve(S.sel, 'btn'); } });
      E.bWalk = bbtn('walk', '🦮', 'Walk', 'W', 'b-walk', holdH('walk'), 'hold'); E.bSup = bbtn('support', '💗', 'Support', 'S', 'b-sup', holdH('support'), 'hold 3 s');
      E.bTuck = bbtn('tuck', '🧻', 'Tuck In', 'T', 'b-tuck', { onclick: function () { tuck(); } });
      E.bDiary = bbtn('diary', '📖', 'Diary', 'D', 'b-diary', { onclick: function () { barPress(); toggleDiary(); } });
      E.bAsk = bbtn('ask', '💬', 'Ask Clive How He Is Doing', '', 'b-ask', { onclick: function () { askClive(); } }); E.bAsk.hidden = true; E.bAsk.querySelector('small').hidden = true;
      E.bar = h('div', { class: cx('bar'), role: 'group', 'aria-label': 'Care bar' }, E.bFeed, E.bWalk, E.bSup, E.bTuck, E.bDiary, E.bAsk);
      E.stamp = h('span', { class: cx('stamp'), text: 'Logged as: sound.' });
      E.say = h('input', { type: 'text', class: cx('in'), id: 'm-pet-rock-say', maxlength: 80, autocomplete: 'off', placeholder: 'something nice', onkeydown: function (e) { if (e.key === 'Enter') { e.preventDefault(); tell(); } } });
      E.chips = [0, 1, 2].map(function (i) { return h('button', { type: 'button', class: cx('chip'), onclick: function () { affirm(i); } }, ['You are doing great', 'I believe in you', 'It is fine to be a rock'][i] + ' (' + (i + 1) + ')'); });
      E.sup = h('div', { class: cx('card') + ' ' + cx('sup'), hidden: true }, h('div', { class: cx('h'), text: 'Support Desk' }), h('div', { class: cx('chips') }, E.chips),
        h('div', { class: cx('say') }, E.supLbl = h('label', { for: 'm-pet-rock-say', text: 'Tell Clive something nice' }), E.say, h('button', { type: 'button', class: cx('btn'), onclick: function () { tell(); } }, 'Tell'), E.stamp));
      /* right column */
      const row = function (label, el) { return h('div', { class: cx('row') }, h('span', { text: label }), el); };
      E.hours = h('b', { text: '0.0' }); E.inc = h('b', { text: '0' }); E.pats = h('b', { text: '0 (Gentle)' }); E.day = h('b', { text: 'Day 1' });
      E.mode = h('span', { class: cx('mode'), text: LN.modes[S.loops % 5] }); E.rankEl = h('span', { class: cx('rank'), text: LN.ranks[0] });
      E.need = h('div', { class: cx('need'), hidden: true }); E.pneed = h('div', { class: cx('need'), hidden: true, style: 'background:var(--mint)' });
      E.debt = h('b', { text: '0', title: 'Must be reduced to 0.' }); E.debtRow = row('Attention Debt', E.debt); E.debtRow.hidden = true;
      E.goalT = h('div', { text: 'Care Goal: 0.00%', style: 'font-weight:800;font-size:.8rem' }); E.goalB = h('i'); E.goalW = h('div', { hidden: true }, E.goalT, h('div', { class: cx('goal') }, E.goalB));
      E.sched = h('div', { class: cx('sched'), hidden: true }, ['Feed', 'Walk', 'Support', 'Tuck In', 'Photo'].map(function (n) { return h('span', null, h('span', { text: n + ' | Due: now' }), h('span', { text: 'Last done: now' })); }));
      E.says = h('div', { class: cx('says'), 'aria-live': 'polite', 'aria-label': 'Clive Says' });
      E.status = h('div', { class: cx('card') + ' ' + cx('status-c') }, h('div', { class: cx('h'), text: 'Status Panel' }),
        h('div', { class: cx('status') }, row('Care Hours Logged', E.hours), row('Incidents', E.inc), row('Pats', E.pats), row('Day', E.day), h('div', { class: cx('row') }, E.mode, E.rankEl), E.reissue = h('button', { type: 'button', class: cx('btn'), hidden: true, style: 'min-height:36px;font-size:.72rem;box-shadow:0 2px 0 var(--ink)', onclick: function () { if (!S.modal) { S.accepted = false; certificate(true); } } }, 'Reissue Adoption Certificate'),
          E.need, E.pneed, E.debtRow, E.goalW, E.sched), E.says);
      E.padbtn = h('button', { type: 'button', class: cx('padlock'), 'aria-label': 'Padlock', onclick: function () { openLock('Wrong, but warm.', ''); } }, '🔒');
      E.combo = h('input', { type: 'text', class: cx('in'), id: 'm-pet-rock-combo', inputmode: 'numeric', maxlength: 12, autocomplete: 'off', 'aria-label': 'Combination', placeholder: 'Combination', onkeydown: function (e) { if (e.key === 'Enter') { e.preventDefault(); tryCombo(); } } });
      E.lockMsg = h('div', { class: cx('lockmsg'), 'aria-live': 'polite' });
      E.lockBox = h('div', { class: cx('cover'), hidden: true }, E.padbtn, E.lockT = h('div', { text: "Clive's Diary. A padlock, decoratively." }), h('div', { class: cx('combo') }, E.combo, h('button', { type: 'button', class: cx('btn'), onclick: function () { tryCombo(); } }, 'Try')), E.lockMsg);
      E.coverTx = h('div', { text: 'Diary: locked. Needs: more care.' });
      E.cover = h('div', { class: cx('cover') }, h('div', { style: 'font-size:2rem', 'aria-hidden': 'true', text: '📕' }), E.coverTx);
      E.dtxt = h('p', { class: cx('dtxt') }); E.dps = h('p', { class: cx('dps') }); E.dnotes = h('div'); E.dpic = h('span', { class: cx('rockpic'), hidden: true });
      E.page = h('div', { class: cx('page') }, E.dtxt, E.dps, E.dnotes, E.dpic); E.ind = h('div', { class: cx('ind'), 'aria-live': 'polite', text: 'Entry 0 of 13' });
      E.prev = h('button', { type: 'button', class: cx('btn'), onclick: function () { page(-1); } }, 'Prev');
      E.next = h('button', { type: 'button', class: cx('btn'), onclick: function () { page(1); } }, 'Next');
      E.aloudB = h('button', { type: 'button', class: cx('btn'), onclick: function () { readAloud(); } }, 'Read aloud');
      E.heart = h('button', { type: 'button', class: cx('btn'), 'aria-pressed': 'false', onclick: function () { favToggle(); } }, '♡ Favorite page');
      E.mossT = h('div', { class: cx('moss'), 'aria-label': 'Moss tally' }); E.progB = h('i'); E.progT = h('div', { class: cx('progt'), text: 'Next entry: 0 of 4 care actions' });
      E.book = h('div', { class: cx('book'), hidden: true }, h('div', { class: cx('pagewrap') }, E.page), h('div', { class: cx('dnav') }, E.prev, E.ind, E.next), h('div', { class: cx('dnav') }, E.aloudB, E.heart), E.mossT);
      E.diary = h('div', { class: cx('card') + ' ' + cx('diary') }, E.diaryH = h('div', { class: cx('h'), text: "Clive's Diary" }), E.cover, E.lockBox, E.book, h('div', { class: cx('prog') }, E.progB), E.progT);
      E.album = h('div', { class: cx('album') }); E.albumC = h('div', { class: cx('card') + ' ' + cx('albumc'), hidden: true }, h('div', { class: cx('h'), text: 'Album' }), E.album);
      E.app = h('div', { class: cx('app') }, h('div', { class: cx('col') }, E.hab, E.bar, E.tray, E.ticker, E.sup),
        h('div', { class: cx('col') }, E.vitals, E.status, E.diary, E.albumC)); root.appendChild(E.app); api.setTitle('Pet Rock: Hardcore Mode');
      function nm(s) { s = String(s == null ? '' : s); return S.name !== 'Clive' ? s.split('Clive').join(S.name) : s; }
      const NAMED = [];
      function named(el, tpl, attr) { if (el) NAMED.push([el, tpl, attr || '']); }
      function paintNames() { NAMED.forEach(function (n) { const t = nm(n[1]); if (n[2]) n[0].setAttribute(n[2], t); else n[0].textContent = t; }); }
      function renameTree(node) { if (S.name === 'Clive' || !node) return; try { const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) if (t.nodeValue.indexOf('Clive') >= 0) t.nodeValue = nm(t.nodeValue);
          const els = node.querySelectorAll('[aria-label],[title],[placeholder]'); for (let i = 0; i < els.length; i++) ['aria-label', 'title', 'placeholder'].forEach(function (a) { const v = els[i].getAttribute(a); if (v && v.indexOf('Clive') >= 0) els[i].setAttribute(a, nm(v)); }); } catch (e) { /* ok */ } }
      named(E.diaryH, "Clive's Diary"); named(E.lockT, "Clive's Diary. A padlock, decoratively."); named(E.supLbl, 'Tell Clive something nice'); named(E.bAsk._lab, 'Ask Clive How He Is Doing'); named(E.bAsk, 'Ask Clive How He Is Doing', 'aria-label');
      named(E.clive, 'Pat Clive', 'aria-label'); named(E.clive.querySelector('svg'), 'Clive, a rock with googly eyes', 'aria-label'); named(E.hill, 'Dig Clive out of the snack hill', 'aria-label');
      function say(text, o) { if (!text) return false; const t = nm(String(text).replace(/%[A-Z]+/g, '')); if (!t.trim()) return false; return api.say(t, o || {}); }
      function sayL(g, map, o) { return say(fill(api.line('m:pet-rock:' + g), map || {}), o); }
      function force(p) { if (S.forced.length < 12) S.forced.push(p); }
      function pushPS(t) { if (S.psOverride.length < 3 && S.psOverride.indexOf(t) < 0) S.psOverride.push(t); }
      function later(sec, fn) { if (S.laters.length < 80) S.laters.push({ at: S.T + sec, fn: fn }); }
      function gated(fn) { const g = function () { if (S.hold) { later(3, g); return; } fn(); }; return g; }
      function award(n, why) { n = Number(n); if (!isFinite(n)) return; const now = api.now(); let used = 0; S.bucket = S.bucket.filter(function (b) { return now - b[0] < 60000; });
        S.bucket.forEach(function (b) { used += b[1]; }); const a = Math.min(n, 6 - used); if (a > 0.004) { S.bucket.push([now, a]); api.award(a, why); }
      }
      function persist() {
        api.save.set('pet-rock', { loop: S.loops, moss: S.moss, name: S.name, fav: S.fav, read: Object.keys(S.readSet).map(Number).filter(function (x) { return x >= 1 && x <= 13; }) });
      }
      function tline(parts) { E.tick.appendChild(h('li', null, parts.map(function (p) { return typeof p === 'string' ? nm(p) : p; }))); while (E.tick.children.length > 6) E.tick.removeChild(E.tick.firstChild); }
      function memo(title, text, o) { o = o || {};
        const c = h('button', { type: 'button', class: cx('memo'), style: '--tilt:' + (o.tilt != null ? o.tilt : (api.rand() * 6 - 3).toFixed(1)) + 'deg', 'aria-label': 'Dismiss memo: ' + title }, h('b', { text: nm(title) }), h('span', { text: nm(text) }));
        const drop = function () { if (c.parentNode) c.parentNode.removeChild(c); }; c.addEventListener('click', drop); E.memos.appendChild(c);
        while (E.memos.children.length > 3) E.memos.removeChild(E.memos.firstChild); api.setTimeout(drop, o.ms || 8000); }
      function cacheHab() { try { const r = E.hab.getBoundingClientRect(); S.hab = { left: r.left, top: r.top, w: r.width, h: r.height }; } catch (e) { S.hab = null; } }
      function touch() { const now = api.now(), gap = (now - S.lastInput) / 1000; if (gap > 15 && gap > S.maxGap) S.maxGap = Math.min(9999, gap);
        if (S.idleI > 0 || S.idleOn) idleBack(gap); S.lastInput = now; }
      function barPress() { const now = api.now(); S.barT.push(now); if (S.barT.length > 60) S.barT.shift();
        let c = 0; for (let i = S.barT.length - 1; i >= 0 && now - S.barT[i] < 6000; i--) c++;
        if (c >= 20 && now - S.quietT > 60000 && !S.modal) { S.quietT = now; S.barT.length = 0; quietRoom(); return; }
        let c4 = 0; for (let i = S.barT.length - 1; i >= 0 && now - S.barT[i] < 4000; i--) c4++;
        if (c4 >= 9 && now - S.barWarnT > 15000 && !S.modal) { S.barWarnT = now; sayL('barWarn', null, { mood: 'disappointed', priority: 1 }); api.sfx('buzz'); }
      }
      function paintStatus() { E.hours.textContent = (S.T / 60).toFixed(1); E.inc.textContent = S.incidents === 7 ? '7 1/2' : String(S.incidents); }
      function paintPats() { const p = int(api.stat.get('pet-rock.pokes')); E.pats.textContent = p + ' (' + (p >= 50 ? 'Concerning' : p >= 20 ? 'Firm' : 'Gentle') + ')'; }
      function paintGoal() { const n = S.actions; let txt, w; if (n <= 6) { w = 100 - 100 * Math.pow(0.5, n); txt = w.toFixed(2); }
        else { const nines = Math.min(14, Math.max(2, Math.floor(n * 0.30103))); txt = '99.' + '9'.repeat(nines) + (Math.floor(n * 0.30103) > 14 ? '...' : ''); w = 99.9; }
        E.goalT.textContent = 'Care Goal: ' + txt + '%'; E.goalB.style.width = Math.min(99.9, w).toFixed(1) + '%'; }
      function paintRank() { E.rankEl.textContent = S.graduated ? 'Chief Rock Officer, Level 1 of 1' : LN.ranks[S.rank]; flash(E.rankEl, 'stamped'); }
      function paintMoss() { for (let i = 0; i < E.moss.length; i++) vis(E.moss[i], i < S.moss); vis(E.crown, S.moss >= 100);
        while (E.mossT.firstChild) E.mossT.removeChild(E.mossT.firstChild); for (let i = 0; i < Math.min(20, S.moss); i++) E.mossT.appendChild(h('i')); }
      function paintFlag() { E.flag.textContent = 'Target: ' + (S.shown.hardcore ? S.target : 100) + '%'; }
      function paintDay() { const k = S.dayStep; let t; if (S.dayAgain && k === 1) t = 'Day 1 (again)'; else t = 'Day ' + (k <= 7 ? k : k <= 9 ? '7 1/2' : k - 2);
        if (E.day.textContent !== t) E.day.textContent = t; }
      function showVitals(n) { S.shown.vit = Math.max(S.shown.vit || 0, n); for (let i = 0; i < E.tiles.length; i++) E.tiles[i].t.hidden = i >= S.shown.vit;
        E.dial.hidden = S.shown.vit < 6; }
      function paintNeeds() { if (S.shown.hardcore) { const t = 'Needs Imminent: Hunger 100%, due in 00:0' + (S.needZero ? 0 : 7 - Math.floor(S.needAcc % 7));
          if (E.need.textContent !== t) E.need.textContent = t; }
        if (S.hasPebble) { const v = (15 - Math.floor((S.needAcc * 4) % 15)) * 0.25; const t = 'Pebble due in 00:' + (v < 10 ? '0' : '') + v.toFixed(2);
          if (E.pneed.textContent !== t) E.pneed.textContent = t; }
      }
      function paintSel() { SNACKS.forEach(function (sn) { E.snacks[sn.id].setAttribute('aria-pressed', sn.id === S.sel ? 'true' : 'false'); }); }
      function setLock(b, locked) { b.disabled = !!locked; b.setAttribute('aria-disabled', locked ? 'true' : 'false'); b._lab.textContent = (locked ? '🔒 ' : '') + b._label;
        b.setAttribute('aria-label', b._label + (locked ? ' (locked)' : b._key ? ' (' + b._key + ')' : '')); }
      function refreshLocks() { setLock(E.bWalk, !S.u.walk); setLock(E.bSup, !S.u.support); setLock(E.bTuck, !S.u.tuck || S.tuckLock); setLock(E.bDiary, !S.u.diary);
        E.bFeed.disabled = S.buried; E.bAsk.hidden = !S.u.ask; E.sup.hidden = !S.u.support;
        SNACKS.forEach(function (sn) { const b = E.snacks[sn.id]; if (sn.u) b.hidden = !S.u[sn.u]; b.disabled = S.buried; }); }
      function deltaNode(n) { if (n === 80) return '+0.' + '0'.repeat(18) + '1'; if (n <= 12) return '+0.' + '0'.repeat(2 + n); if (n < 40) return '+0.0e-' + n;
        if (n < 60) return '+0.' + '0'.repeat(40); return h('span', { class: cx('zd'), text: 'Zero (Deluxe)' }); }
      function care(kind, vital, o) { o = o || {}; S.actions++; S.since++; S.counts[kind] = (S.counts[kind] | 0) + 1; api.stat.inc('pet-rock.actions'); const n = S.actions;
        if (o.noDelta) tline(['(no delta, Clive is asking)']); else if (S.idleOn && S.idleI >= 3) { /* deltas stop ticking while Clive tends to you */ }
        else tline([vital + ' 100 -> 100 (change: ', deltaNode(n), ')']); paintGoal(); paintProg(); if (n === 40) say(LN.deltaLate[0], { mood: 'confused', priority: 1 });
        else if (n === 50) say(LN.deltaLate[1], { priority: 1 }); else if (n === 58) say(LN.deltaLate[2], { priority: 1 });
        else if (n === 60) { say(LN.deltaZD[0], { mood: 'smug', priority: 1 }); api.sfx('stamp'); }
        else if (n === 70) say(LN.deltaZD[1], { mood: 'smug', priority: 1 }); else if (n === 80) { say(LN.d80[0], { mood: 'panic', priority: 2 }); api.sfx('buzz');
          api.setTimeout(function () { say(LN.d80[1], { mood: 'proud', priority: 1 }); }, 2500); } else if (n % 9 === 0 && S.shown.hardcore) sayL('debt', null, { mood: 'neutral' });
        let r = 0; for (let i = 0; i < RANK_AT.length - 1; i++) if (n >= RANK_AT[i]) r = i; if (n >= 120) r = 5;
        if (r > S.rank && !S.graduated) { S.rank = r; paintRank(); api.sfx('stamp'); say(fill(api.line('m:pet-rock:rankUp'), { NAME: LN.ranks[r] }), { mood: 'proud', priority: 1 }); }
        if (S.hasPebble) E.due.hidden = false; award(o.award != null ? o.award : 0.1 + api.rand() * 0.4, 'care'); if (api.chance(0.01)) pixelShift(); checkUnlocks(); }
      function incident() { S.incidents++; api.stat.inc('pet-rock.incidents'); paintStatus();
        if (S.incidents === 7 && !S.noted75) { S.noted75 = true; sayL('inc75', null, { mood: 'proud', priority: 1 }); }
      }
      function pixelShift() { if (S.shiftBusy) return; S.shiftBusy = true; tog(E.clive, 'shift', true); tog(E.siren, 'on', true); tog(E.vitals, 'red', true);
        say(LN.secrets.pixel1, { mood: 'panic', priority: 2 }); api.sfx('buzz'); api.achieve('pet-rock.shifted'); incident();
        api.setTimeout(function () { tog(E.vitals, 'red', false); }, 1000);
        api.setTimeout(function () { tog(E.clive, 'shift', false); tog(E.siren, 'on', false); say(LN.secrets.pixel2, { mood: 'smug', priority: 1 }); S.shiftBusy = false; }, 1500); }
      /* unlocks */
      function unlock(k, msg) { if (S.u[k]) return false; S.u[k] = true; refreshLocks(); if (msg) { say(msg, { mood: 'proud', priority: 1 }); api.sfx('stamp'); }
        return true; }
      function checkUnlocks() { const T = S.T; if (!S.u.walk && (T >= 60 || S.actions >= 4)) unlock('walk', LN.X.unWalk);
        if (!S.u.support && (T >= 100 || S.actions >= 8)) unlock('support', LN.X.unSup);
        if (!S.u.diary && ((S.walkDone && T >= 90) || T >= 180)) { unlock('diary', LN.X.unDiary); startDiary(); }
        if (!S.u.tuck && (T >= 150 || S.u.diary)) unlock('tuck', LN.X.unTuck); if (!S.u.toast && T >= 180) unlock('toast', LN.X.unToast);
        if (!S.u.gravel && T >= 210) unlock('gravel', LN.X.unGravel); if (!S.u.gerald && (T >= 300 || api.flag.get('metGerald'))) unlock('gerald', null); }
      function addCrumb(e) { const left = api.chance(0.5) ? 5 + api.rand() * 22 : 70 + api.rand() * 22;
        const c = h('span', { class: cx('crumb'), 'aria-hidden': 'true', text: e, style: { left: left.toFixed(1) + '%', bottom: (7 + api.rand() * 18).toFixed(1) + '%', transform: 'rotate(' + Math.round(api.rand() * 80 - 40) + 'deg)' } });
        E.crumbs.appendChild(c); while (E.crumbs.children.length > 24) E.crumbs.removeChild(E.crumbs.firstChild); }
      function serve(id, how) { if (S.buried || S.modal) return; const sn = SNK[id]; if (!sn || (sn.u && !S.u[sn.u])) return; const now = api.now();
        S.feedT.push(now); if (S.feedT.length > 60) S.feedT.shift(); let c5 = 0; for (let i = S.feedT.length - 1; i >= 0 && now - S.feedT[i] < 5000; i--) c5++;
        addCrumb(sn.e); api.sfx('tick'); api.stat.inc('pet-rock.feeds'); const feeds = int(api.stat.get('pet-rock.feeds')); care('feed', 'Hunger');
        if (how === 'decline') say(LN.fs[5], { mood: 'neutral' });
        else if (feeds === 1) say('First meal logged. Clive has been fed before, in 1972, by a glacier. He is calling this a more formal setting.', { mood: 'proud' });
        else if (feeds === 3) say('Three meals. Hunger: 0. Hunger, after: 0. Management has started a graph. The graph is a dot.', { mood: 'proud' });
        else if (id === 'pgrav') say(LN.fs[0], { mood: 'proud' }); else if (id === 'ograv') say(LN.fs[1], { mood: 'smug' });
        else if (id === 'toast') say(LN.fs[2], { mood: 'proud' }); else if (id === 'gerald') say(LN.fs[3], { mood: 'proud' });
        else if (id === 'water' && api.chance(0.5)) say(LN.fs[4], { mood: 'proud' }); else if (c5 >= 7 && now - S.warnFeedT > 15000 && !S.buried) { S.warnFeedT = now; sayL('feedWarn', null, { mood: 'confused', priority: 1 }); }
        else if (feeds >= 10 && api.chance(0.3)) sayL('feedLate', { N: feeds }, { mood: 'proud' }); else if (feeds >= 5 && api.chance(0.2)) sayL('feedMid', { N: feeds }, { mood: 'proud' });
        else sayL('feed', { N: feeds }, { mood: 'proud' }); if (c5 > 12) bury(); }
      function bury() { if (S.buried) return; S.buried = true; S.digs = 0; E.hill.hidden = false; tog(E.clive, 'x', false); E.clive.style.visibility = 'hidden';
        refreshLocks(); api.sfx('buzz'); say(LN.spamFeed[0], { mood: 'confused', priority: 1 }); const now = api.now(); if (now - S.citeT > 60000) {
          S.citeT = now; api.award(-0.3, 'citation');
          later(6, function () { say(LN.spamFeed[3], { mood: 'smug', priority: 1 }); memo('Citation', 'Officer Doily: excessive hospitality. Fine: 0.3 Meh.', { icon: '', ms: 6000 }); });
        }
        later(40, function () { if (S.buried) unbury(true); }); }
      function unbury(auto) { if (!S.buried) return; S.buried = false; E.hill.hidden = true; E.clive.style.visibility = ''; refreshLocks();
        api.sfx('pop'); say(LN.spamFeed[2], { mood: 'proud', priority: 1 }); if (!auto) { api.achieve('pet-rock.hospitality'); api.confetti(); }
      }
      function dig() { if (!S.buried) return; S.digs++; api.sfx('tick'); flash(E.hill, 'pop');
        if (S.digs >= 10) unbury(false); else sayL('dig', { N: S.digs }, { priority: 0 }); }
      function cycleSel() { const list = SNACKS.filter(function (sn) { return !sn.u || S.u[sn.u]; }); let i = 0; for (let k = 0; k < list.length; k++) if (list[k].id === S.sel) i = k;
        S.sel = list[(i + 1) % list.length].id; paintSel(); }
      function startHold(kind, via, auto) { if (S.hold || S.modal || !S.u[kind]) return false; barPress(); if (S.modal) return false;
        S.hold = { kind: kind, via: via, t0: api.now(), auto: auto || 0, m: 0, fired: {}, hs: 0, lastM: -1, dogAt: 4 + api.rand() * 10, duckRoll: api.chance(0.25) };
        const b = kind === 'walk' ? E.bWalk : E.bSup; tog(b, 'held', true); b.setAttribute('aria-pressed', 'true'); if (kind === 'walk') {
          cacheHab(); tog(E.hab, 'walking', true); vis(E.scarf, true); api.sfx('whoosh'); E.odo.classList.add(cx('on'));
          if (!S.seen.walk0) { S.seen.walk0 = true; say(LN.walk[0], { priority: 1 }); }
        } else { tog(E.ring, 'on', true); api.sfx('bloop'); E.ringp.setAttribute('stroke-dashoffset', '289'); }
        kick(); return true; }
      function endHold() { const hd = S.hold; if (!hd) return; S.hold = null; S.holdEnd = api.now();
        const b = hd.kind === 'walk' ? E.bWalk : E.bSup; tog(b, 'held', false); b.setAttribute('aria-pressed', 'false'); const secs = (S.holdEnd - hd.t0) / 1000;
        if (hd.kind === 'walk') { tog(E.hab, 'walking', false); tog(E.hab, 'dragwalk', false); vis(E.scarf, false); const m = int(hd.m); S.walkTot += hd.m; S.walkDone = true;
          if (secs >= 1.5) walkDone(m, secs); else brisk(secs); api.setTimeout(function () { if (!S.hold) E.odo.classList.remove(cx('on')); }, 3500); } else { tog(E.ring, 'on', false);
          api.stat.inc('pet-rock.hug.seconds', Math.min(3, Math.max(0, secs))); if (!hd.done) supportEnd(); }
      }
      function walkDone(m, secs) { E.bWalk._kh.textContent = ''; api.stat.inc('pet-rock.walks'); if (m > 0) api.stat.inc('pet-rock.meters', m); const best = m > S.bestWalk; if (best) S.bestWalk = m;
        E.odo.textContent = odoText(m, best); api.sfx('ding'); sayL('walk', { N: m, M: int(m / 2), S: int(secs) }, { mood: 'proud' }); care('walk', 'Energy'); }
      function brisk(secs) { api.sfx('blip'); const now = api.now(); S.briskT.push(now); if (S.briskT.length > 12) S.briskT.shift(); let c = 0; for (let i = S.briskT.length - 1; i >= 0 && now - S.briskT[i] < 20000; i--) c++;
        if (c >= 4 && now - S.briskSpamT > 30000) { S.briskSpamT = now; sayL('briskSpam', null, { mood: 'confused', priority: 1 }); } else sayL('brisk', { S: int(secs) }, { mood: 'neutral' });
        care('walk', 'Energy', { award: 0.1 }); }
      function odoText(m, best) { return 'You: ' + m + ' m. Clive: 0.000 m. Combined average: ' + int(m / 2) + ' m, ' + (best ? 'a partnership best.' : 'a respectable partnership.'); }
      function crossing(emoji, left) { E.scn.textContent = emoji; E.scn.classList.remove(cx('cross')); E.scn.classList.remove(cx('crossl')); void E.scn.offsetWidth;
        E.scn.classList.add(left ? cx('crossl') : cx('cross')); }
      function scenery(hd) { const m = hd.m, cum = S.walkTot + m;
        if (!hd.fired.dog && m >= hd.dogAt) { hd.fired.dog = 1; crossing('🐕', false); if (!S.seen.dog || api.chance(0.3)) { S.seen.dog = 1; say(LN.scen[0], { priority: 0 }); } }
        else if (!hd.fired.duck && cum >= 150 && (!S.seen.duck || hd.duckRoll) && m >= 30) { hd.fired.duck = 1; S.seen.duck = 1; crossing('🦆', false); say(LN.scen[1], { priority: 0 }); }
        else if (!hd.fired.sock && cum >= 550 && !S.sockSeen) { hd.fired.sock = 1; S.sockSeen = true; S.sockPending = true; api.flag.set('pet-rock.sockSeen', true); crossing('🧦', true); say(LN.scen[4], { mood: 'confused', priority: 1 }); }
        else if (!hd.fired.rock && cum >= 400 && !S.seen.rock) { hd.fired.rock = 1; S.seen.rock = 1; crossing('🗿', false); say(LN.scen[2], { priority: 0 }); }
        else if (!hd.fired.pud && cum >= 700 && !S.seen.pud) { hd.fired.pud = 1; S.seen.pud = 1; crossing('💦', false); say(LN.scen[3], { priority: 0 }); }
        else if (!hd.fired.misc && m >= 90) { hd.fired.misc = 1; if (api.chance(0.5)) { crossing('🐿️', true); say(LN.scen[6], { priority: 0 }); } else { crossing('🚏', false); say(LN.scen[5], { priority: 0 }); } }
      }
      function supportDone() { E.bSup._kh.textContent = ''; api.stat.inc('pet-rock.hugs'); api.sfx('ding'); flash(E.spark, 'sparkgo'); tline(['Present. Active Listening: 3.0 s']);
        award(0.5, 'present'); sayL('support', null, { mood: 'proud', priority: 1 }); care('support', 'Mood', { award: 0 }); }
      function supportEnd() { api.sfx('blip'); tline(['Interrupted']); const now = api.now(); S.supIntT.push(now); if (S.supIntT.length > 10) S.supIntT.shift(); let c = 0; for (let i = S.supIntT.length - 1; i >= 0 && now - S.supIntT[i] < 25000; i--) c++;
        if (c >= 3 && now - S.supSpamT > 30000) { S.supSpamT = now; sayL('supSpam', null, { mood: 'smug', priority: 1 }); } else sayL('supInt', null, { mood: 'neutral' }); }
      function spawnHeart() { S.hi = ((S.hi | 0) + 1) % E.hearts.length; const el = E.hearts[S.hi]; el.style.left = (38 + api.rand() * 24).toFixed(0) + '%'; flash(el, 'go'); }
      function affirm(i) { if (S.modal || !S.u.support) return;
        const now = api.now(); S.affT.push(now); if (S.affT.length > 20) S.affT.shift(); let c = 0; for (let k = S.affT.length - 1; k >= 0 && now - S.affT[k] < 5000; k--) c++;
        if (c >= 8 && now - S.affSpamT > 20000) { S.affSpamT = now; sayL('affSpam', null, { mood: 'confused', priority: 1 }); } else say(LN.affirm[i], { mood: 'proud', priority: 1 });
        api.sfx('bloop'); spawnHeart(); flash(E.chips[i], 'on'); api.stat.inc('pet-rock.affirms'); award(0.1, 'affirm'); }
      function tell() { if (S.modal) return; const v = String(E.say.value || '').slice(0, 80); E.say.value = '';
        if (!v.trim()) { say('Clive is listening. He needs something to listen to.', { priority: 0 }); return; }
        const lc = v.toLowerCase(), words = lc.split(/[^a-z]+/).filter(Boolean); let kw = ''; for (let i = 0; i < KEYWORDS.length; i++) if (words.indexOf(KEYWORDS[i]) >= 0) { kw = KEYWORDS[i]; break; }
        E.stamp.textContent = 'Logged as: sound.'; E.stamp.classList.remove(cx('strike')); E.stamp.classList.remove(cx('on')); void E.stamp.offsetWidth; E.stamp.classList.add(cx('on')); api.sfx('stamp'); api.stat.inc('pet-rock.told'); award(0.2, 'kind words');
        if (lc.indexOf('bless you') >= 0 || lc.indexOf('gesundheit') >= 0) { bless(); return; }
        if (kw) { S.kw = kw; say(LN.kw[kw], { mood: 'proud', priority: 1 }); if (kw === 'pebble') { S.pebbleKw++;
            if (S.pebbleKw === 3) { say(LN.schism, { mood: 'confused', priority: 2 }); SCHISM.forEach(function (t) { force(mkEntry(t, 'P.S. Moss was neutral. Moss is always neutral.', { key: 'schism' })); }); api.confetti(); }
          }
        } else if (words.length >= 2) sentiment(words); else sayL('kwNone', null, { mood: 'neutral', priority: 1 }); }
      function sentiment(words) { const key = words.join(' ').slice(0, 60), n = words.length; let the = 0; words.forEach(function (w) { if (w === 'the') the++; });
        E.stamp.classList.add(cx('strike')); api.setTimeout(function () { E.stamp.classList.remove(cx('strike')); E.stamp.textContent = 'Reclassified: sentence.'; }, 1400);
        if (S.told[key]) { say('Duplicate sentiment. Clive has filed it under Again. Again is a very large folder.', { mood: 'smug', priority: 1 }); return; }
        if (Object.keys(S.told).length < 30) S.told[key] = 1;
        say('Your message has been received. It is ' + n + ' words. ' + (the ? the + (the === 1 ? ' of them was "the". Clive has filed that' : ' of them were "the". Clive has filed those') + ' under Weather.' : 'None of them were "the", which is rare. Clive has filed that under Weather anyway.'), { mood: 'proud', priority: 1 });
        later(3, function () { say('Sentiment classification: Nice (Provisional). Reviewer: a doily. Appeals: none, the doily is at capacity.', { mood: 'smug', priority: 0 }); });
        later(7, function () { say("Clive's reply: [ ]. Word count: 0. Accuracy: 100%.", { mood: 'proud', priority: 0 }); }); }
      function askClive() { if (!S.u.ask || S.modal) return; barPress(); const p = S.pages[S.cur] || S.pages[S.pages.length - 1]; S.askN++;
        if (p) { p.notes.push(S.askN >= 6 && S.askN % 3 === 0 ? 'How are you?' : 'He asked.'); if (p.notes.length > 3) p.notes.shift(); }
        paintDiary(); api.sfx('pop'); care('ask', null, { noDelta: true, award: 0 }); award(0.2, 'asked');
        if (S.askN === 1) say(LN.inv[1], { mood: 'confused', priority: 0 }); else if (S.askN <= LN.ask.length) say(LN.ask[S.askN - 2] || LN.ask[0], { mood: 'confused', priority: 0 }); else sayL('ask', null, { mood: 'confused', priority: 0 });
        S.seen.asked = 1; }
      function applyTuck() { const night = S.tucked || S.bed; tog(E.hab, 'is-night', night); tog(E.napkin, 'on', S.tucked); tog(E.nov, 'on', S.bed); vis(E.cap, S.tucked || S.bed);
        E.bTuck.setAttribute('aria-pressed', S.tucked ? 'true' : 'false'); }
      function tuck() { if (!S.u.tuck || S.modal || S.tuckLock) return; barPress(); const now = api.now(); S.tuckT.push(now); if (S.tuckT.length > 60) S.tuckT.shift();
        let c = 0; for (let i = S.tuckT.length - 1; i >= 0 && now - S.tuckT[i] < 10000; i--) c++; if (c > 6) {
          S.tucked = false; S.tuckT.length = 0; applyTuck(); S.tuckLock = true; refreshLocks(); api.sfx('buzz'); sayL('spamTuck', null, { mood: 'disappointed', priority: 1 });
          api.setTimeout(function () { S.tuckLock = false; refreshLocks(); }, 5000); return; }
        S.tucked = !S.tucked; applyTuck(); api.sfx('pop'); if (S.tucked) { api.stat.inc('pet-rock.tucks'); care('tuck', 'Hygiene'); sayL('tuck', null, { mood: 'proud' }); }
        else { if (S.bed) { S.bed = false; applyTuck(); } sayL('untuck', null, { priority: 0 }); }
      }
      function underside() { S.under = !S.under; vis(E.under, S.under); vis(E.bodyg, !S.under); vis(E.eyes, !S.under); api.sfx('pop');
        if (S.under) { api.stat.inc('pet-rock.flips'); say(LN.secrets.under, { mood: 'confused', priority: 1 }); pushPS('P.S. I have seen the other side of myself. It is also me.'); }
      }
      function poke() { if (S.buried || S.modal) return; const now = api.now(); S.pokes++; api.stat.inc('pet-rock.pokes'); S.pokeT.push(now); if (S.pokeT.length > 60) S.pokeT.shift();
        let c3 = 0, c5 = 0; for (let i = S.pokeT.length - 1; i >= 0 && now - S.pokeT[i] < 5000; i--) { c5++; if (now - S.pokeT[i] < 3000) c3++; }
        flash(E.clive, 'squish'); api.setTimeout(function () { tog(E.clive, 'squish', false); }, 220); api.sfx('tick'); paintPats(); if (S.blinking) witnessed(); if (api.chance(1 / 12)) api.award(0.1, 'pat');
        const tp = int(api.stat.get('pet-rock.pokes')); if (LN.pokeMile[tp]) say(LN.pokeMile[tp], { mood: 'smug', priority: 1 });
        if (S.pokes >= 100 && !polished) { polished = true; vis(E.polish, true); say(LN.polish, { mood: 'disappointed', priority: 1 }); }
        if (S.pigeonOn) pigeonLeave(true);
        if (c5 >= 55 && now - S.p60 > 25000) { S.p60 = now; S.p30 = now; sayL('s60', { N: c5 }, { mood: 'panic', priority: 2 }); api.award(-2, 'Seismic fee, second tier'); api.sfx('buzz'); if (!reduced()) flash(E.hab, 'shake'); E.sign.hidden = false; api.setTimeout(function () { E.sign.hidden = true; }, 6000); }
        else if (c5 >= 30 && now - S.p30 > 20000) {
          S.p30 = now; sayL('s30', { N: c5 }, { mood: 'panic', priority: 1 }); api.award(-1, 'Seismic fee'); api.sfx('buzz');
          if (!reduced()) flash(E.hab, 'shake'); E.sign.hidden = false; api.setTimeout(function () { E.sign.hidden = true; }, 6000);
          later(3, function () { say(LN.fee, { mood: 'smug', priority: 0 }); }); if (!S.fired.court) { S.fired.court = 1; later(6, fingerCourt); }
        } else if (c3 >= 15 && now - S.p15 > 20000) { S.p15 = now; sayL('s15', null, { mood: 'confused', priority: 1 }); api.sfx('buzz'); }
        else if (tp === 1) say('First contact. Clive has waited since Before to be asked, and had a speech prepared, and has lost it.', { mood: 'proud', priority: 1 });
        else if (S.pokes % 3 === 1) { const p = tp; tline(['Surface touched (0.0 mm displacement)']); say(api.chance(0.4) ? 'Pat ' + p + ' filed. Pat ' + (p - 1) + ' has been informed and is taking it well.' : fill(api.line('m:pet-rock:pokeFlavor'), { P: p }), { priority: 0 }); }
      }
      function blink() { if (S.blinking || S.under) return; S.blinking = true; vis(E.lids, true); pushPS('P.S. I did not blink. It was the light.');
        api.setTimeout(function () { S.blinking = false; vis(E.lids, false); }, 450); }
      function witnessed() { S.blinking = false; vis(E.lids, false); api.toast('Witnessed.', { icon: '👀' }); api.award(5, 'witnessed'); api.achieve('pet-rock.witnessed');
        say(LN.secrets.blink, { mood: 'smug', priority: 1 }); tline(['Incident log: ' + LN.secrets.blinkEntry]); }
      function mkEntry(t, p, extra) { return Object.assign({ text: t, ps: p || '', base: 0, key: '', read: false, notes: [], night: '' }, extra || {}); }
      function baseEntry(i) { const b = BASE[i - 1]; return mkEntry(b[0], b[1], { base: i, rock: i === 13 }); }
      function lateEntry() { for (let k = 0; k < LATE.length; k++) { const it = LATE[S.lateIdx++ % LATE.length]; if (it[2] === 'sock' && !S.sockSeen) continue;
          if (it[2] === 'vet' && !S.vetDone) continue; const ps = S.loops >= 1 ? SIGNOFF[S.signI++ % SIGNOFF.length] : LATE_PS[S.lateIdx % LATE_PS.length];
          return mkEntry(it[0], ps, { key: 'late' }); }
        return mkEntry(LATE[0][0], LATE_PS[0], { key: 'late' }); }
      const DYN = [
        { k: 'fav', c: function () { return S.T >= 210 && S.counts.feed + S.counts.walk + S.counts.support + S.counts.tuck > 0; }, m: function () {
            const v = [['Feed', S.counts.feed], ['Walk', S.counts.walk], ['Support', S.counts.support], ['Tuck In', S.counts.tuck]]; let b = v[0];
            for (let i = 1; i < v.length; i++) if (v[i][1] > b[1]) b = v[i];
            return mkEntry(fill('You have pressed %FAV %N times. I think this says something about you. I have chosen not to say what, out of tact.', { FAV: b[0], N: int(b[1]) }), 'P.S. Moss is not a verb. I checked.', { key: 'fav' });
          } }, { k: 'gap', c: function () { return S.T >= 300 && S.maxGap > 15; },
          m: function () { return mkEntry(fill('You once waited %S seconds before you clicked. A rock can wait that long. I have a lot of practice.', { S: clamp(int(S.maxGap), 15, 9999) }), 'P.S. Thank you for coming back.', { key: 'gap' }); } },
        { k: 'heart', c: function () { return S.fav > 0; },
          m: function () { return mkEntry(fill('I do not have a favorite page. But if I did, it would be page %P. I would not say so out loud.', { P: Math.max(1, S.fav) }), 'P.S. You said it out loud for me. It is fine.', { key: 'heart' }); } },
        { k: 'key', c: function () { return !!S.kw; },
          m: function () { return mkEntry('Someone told me a rock cannot feel. I told them: that is fine, and also you sounded sad.', fill('P.S. Noted: "%KW".', { KW: S.kw }), { key: 'key' }); } },
        { k: 'sock', c: function () { return S.sockPending; },
          m: function () { S.sockPending = false; return mkEntry('Diary: Saw a sock today. I do not know where he is going. I hope there is a drawer at the end of it.', 'P.S. Moss would have waved. Moss cannot wave. I waved for moss.', { key: 'sock' }); } }
      ];
      function nextEntry() { if (S.forced.length) return S.forced.shift(); if (S.force10 && !S.used[10]) { S.used[10] = true; S.force10 = false; return baseEntry(10); }
        if (S.made % 3 === 2) for (let i = 0; i < DYN.length; i++) if (!S.dynUsed[DYN[i].k] && DYN[i].c()) { S.dynUsed[DYN[i].k] = true; return DYN[i].m(); }
        for (let i = 1; i <= 12; i++) if (!S.used[i]) { S.used[i] = true; return baseEntry(i); }
        if (!S.rockIn) return baseEntry(13); return lateEntry(); }
      function addPage(p, front) { if (S.psOverride.length && !p.rock && p.base !== 12) p.ps = S.psOverride.shift(); if (S.tucked && !p.rock && !front) p.night = api.pick(NIGHT_PS);
        if (front) { S.pages.unshift(p); S.cur = 0; if (S.fav > 0) S.fav++; }
        else if (p.rock) { S.rockIn = true; S.pages.push(p); }
        else if (S.rockIn) { const at = S.pages.length - 1; S.pages.splice(at, 0, p); if (S.fav > at) S.fav++; if (S.cur >= at) S.cur++; } else S.pages.push(p);
        if (S.pages.length > 300) { S.pages.splice(0, 1); S.cur = Math.max(0, S.cur - 1); if (S.fav > 0) S.fav = Math.max(0, S.fav - 1); }
        S.lastEntryT = S.T; S.since = 0; S.made++; api.sfx('bell'); paintDiary(); }
      function startDiary() { if (S.started) return; S.started = true; S.lastEntryT = S.T; S.since = 0;
        if (S.loops > 0) { S.rockIn = true; S.pages.push(baseEntry(13)); for (let i = 1; i <= 12; i++) if (S.readSet[i]) S.used[i] = true; S.padOpened = true; addPage(lateEntry()); }
        else { S.used[1] = true; addPage(baseEntry(1)); }
        S.cur = 0; refreshDiaryVis(); }
      function refreshDiaryVis() { const unl = !!S.u.diary;
        E.cover.hidden = S.open && unl; E.lockBox.hidden = !(S.open && unl && !S.padOpened); E.book.hidden = !(S.open && unl && S.padOpened);
        E.coverTx.textContent = unl ? 'Open the Diary (D). It is a book. It is also a feeling.' : 'Diary: locked. Needs: more care.';
        E.bDiary.setAttribute('aria-pressed', S.open ? 'true' : 'false'); }
      function markRead(p) { if (p.read) return; p.read = true; award(2, 'diary'); api.stat.inc('pet-rock.diary.read'); api.sfx('bell');
        if (p.base) { S.readSet[p.base] = true; persist(); let c = 0; for (let i = 1; i <= 13; i++) if (S.readSet[i]) c++; if (c >= 13) api.achieve('pet-rock.archivist'); }
      }
      function stopAloud() { if (S.aloud) { api.clearInterval(S.aloud); S.aloud = 0; } }
      function paintDiary() { stopAloud(); const pg = S.pages; if (!pg.length) { E.dtxt.textContent = ''; E.dps.textContent = ''; E.ind.textContent = 'Entry 0 of 13'; return; }
        S.cur = clamp(S.cur, 0, pg.length - 1); const p = pg[S.cur]; E.dtxt.textContent = nm(p.text);
        E.dps.textContent = nm((p.ps || '') + (p.night ? (p.ps ? ' ' : '') + p.night : '')); E.dps.hidden = !E.dps.textContent; E.dpic.hidden = !p.rock;
        while (E.dnotes.firstChild) E.dnotes.removeChild(E.dnotes.firstChild); p.notes.forEach(function (t) { E.dnotes.appendChild(h('span', { class: cx('note'), text: t })); });
        E.ind.textContent = S.loops > 0 ? 'Chapter 1 of infinity' : 'Entry ' + (S.cur + 1) + ' of 13' + (S.rockIn ? '+' : '');
        E.prev.disabled = S.cur <= 0; E.next.disabled = S.cur >= pg.length - 1;
        const fv = S.fav === S.cur + 1; E.heart.setAttribute('aria-pressed', fv ? 'true' : 'false'); E.heart.textContent = (fv ? '♥ ' : '♡ ') + 'Favorite page';
        E.says.textContent = nm(p.text).slice(0, 200); if (S.open && S.padOpened) markRead(p); paintProg(); }
      function paintProg() {
        if (!S.started) { E.progT.textContent = 'Entry 1 is pending. It needs care, or simply time.'; E.progB.style.width = clamp(S.T / 180, 0, 1) * 100 + '%'; return; }
        let unread = 0; for (let i = 0; i < S.pages.length; i++) if (!S.pages[i].read) unread++; const a = Math.min(4, S.since);
        E.progT.textContent = unread >= 3 ? 'Next entry: waiting for you to read the others' : 'Next entry: ' + a + ' of 4 care actions';
        E.progB.style.width = (unread >= 3 ? 100 : Math.max(a / 4, clamp((S.T - S.lastEntryT) / 60, 0, 1)) * 100).toFixed(0) + '%'; }
      function page(d) { if (!S.pages.length) return; const n = clamp(S.cur + d, 0, S.pages.length - 1); if (n === S.cur) return;
        S.cur = n; api.sfx('tick'); paintDiary(); flash(E.page, 'flip');
        const now = api.now(); S.flipT.push(now); if (S.flipT.length > 20) S.flipT.shift(); let c = 0; for (let i = S.flipT.length - 1; i >= 0 && now - S.flipT[i] < 5000; i--) c++;
        if (c >= 8 && now - S.flipSpamT > 20000) { S.flipSpamT = now; sayL('flipSpam', null, { mood: 'confused', priority: 1 }); } }
      function toggleDiary(force) { if (!S.u.diary || S.modal) return; S.open = force == null ? !S.open : !!force; if (!S.open) stopAloud(); refreshDiaryVis(); paintDiary(); }
      function readAloud() { if (!S.pages.length) return; stopAloud(); const full = nm(S.pages[S.cur].text); let i = 0; E.dtxt.textContent = '';
        S.aloud = api.setInterval(function () { i += 1; E.dtxt.textContent = full.slice(0, i); if (i >= full.length) stopAloud(); }, 36); }
      function favToggle() { if (!S.pages.length) return; S.fav = S.fav === S.cur + 1 ? 0 : S.cur + 1; paintDiary(); persist(); api.sfx('pop');
        if (S.fav) say(LN.X.fav, { priority: 0 }); }
      function openLock(msg, special) { if (S.padOpened) return; S.padOpened = true; E.lockMsg.textContent = msg; say(msg, { mood: 'smug', priority: 1 });
        E.padbtn.classList.add(cx('unlock')); api.sfx('stamp'); if (special === 'zero') { api.award(3, 'Entry Zero'); api.achieve('pet-rock.entryzero'); api.confetti();
          addPage(mkEntry('Entry Zero: Birthday. I was born Before. Everything since has been a long, kind afterparty.', 'P.S. No moss yet. I am patient. I am a mountain with a head start.', { key: 'zero' }), true);
        }
        api.setTimeout(function () { refreshDiaryVis(); paintDiary(); }, reduced() ? 20 : 480); }
      function tryCombo() { if (S.padOpened) return; const v = String(E.combo.value || '').replace(/\s+/g, ''); E.combo.value = ''; if (v === '0000') openLock(LN.X.combo, '');
        else if (v === '4500000000') openLock('Combination accepted. It was 4500000000. Clive has been waiting a very long time.', 'zero'); else openLock(LN.X.wrong, ''); }
      function openModal(name, node, o) { o = o || {}; if (S.modal) return false; endHold(); renameTree(node);
        const m = { name: name, wrap: null, closable: o.closable !== false, onClose: o.onClose, prev: document.activeElement, timer: 0, ms: o.autoMs || (api.selftest ? 8000 : 60000), sy: -1 };
        if (m.closable) node.appendChild(h('button', { type: 'button', class: cx('btn') + ' ' + cx('skip'), 'aria-label': 'Skip (counts as Fine)', onclick: function () { closeModal('btn'); } }, 'Skip'));
        const wrap = h('div', { class: cx('modalwrap'), onclick: function (e) { if (e.target === wrap && o.onScrim) o.onScrim(); } }, node); m.wrap = wrap; S.modal = m; root.appendChild(wrap);
        try { E.app.inert = true; } catch (e) { /* ok */ }
        m.timer = api.setTimeout(function () { if (S.modal === m) closeModal('auto'); }, m.ms);
        try { const r = node.getBoundingClientRect(), vh = window.innerHeight || 700; if (r.bottom < 40 || r.top > vh - 40) { m.sy = window.pageYOffset; node.scrollIntoView({ block: 'nearest' }); } } catch (e) { /* ok */ }
        try { const fb = node.querySelector(o.focus || 'button,input'); if (fb) fb.focus({ preventScroll: true }); else node.focus({ preventScroll: true }); } catch (e) { /* ok */ }
        return true; }
      function closeModal(why) { const m = S.modal; if (!m) return; S.modal = null; api.clearTimeout(m.timer); if (m.wrap.parentNode) m.wrap.parentNode.removeChild(m.wrap);
        try { E.app.inert = false; } catch (e) { /* ok */ } if (m.sy >= 0) { try { window.scrollTo(0, m.sy); } catch (e) { /* ok */ } }
        if (m.onClose) m.onClose(why); try { if (m.prev && m.prev.focus && root.contains(m.prev) && !m.prev.disabled) m.prev.focus({ preventScroll: true }); } catch (e) { /* ok */ }
      }
      const field = function (label, v) { return h('div', { class: cx('field') }, h('span', { text: label }), typeof v === 'string' ? h('b', { text: v }) : v); };
      const mbtn = function (text, fn, cls) { return h('button', { type: 'button', class: cx('btn') + (cls ? ' ' + cx(cls) : ''), onclick: fn }, text); };
      const dlg = function (label, kids) { return h('div', { class: cx('modal'), role: 'dialog', 'aria-modal': 'true', tabindex: -1, 'aria-label': label }, kids); };
      function certificate(re) { const accept = function (val, why) { if (S.accepted) return; S.accepted = true;
          S.name = cleanName(val) || 'Clive'; api.setTitle('Pet Rock: Hardcore Mode' + (S.name !== 'Clive' ? ' (' + S.name + ')' : '')); persist(); paintNames(); E.reissue.hidden = false;
          if (S.modal && S.modal.name === 'cert') closeModal('accept');
          if (why === 'auto') say('Custody has been accepted on your behalf. Management does this for everyone.', { mood: 'smug', priority: 1 }); nameSecrets(S.name, why); };
        const rearm = function () { const m = S.modal; if (m && m.name === 'cert') { api.clearTimeout(m.timer); m.timer = api.setTimeout(function () { if (S.modal === m) closeModal('auto'); }, m.ms); } };
        const inp = h('input', { type: 'text', class: cx('in'), maxlength: 16, value: S.name, 'aria-label': 'Name', autocomplete: 'off', oninput: rearm, onkeydown: function (e) { rearm(); if (e.key === 'Enter') { e.preventDefault(); accept(inp.value, 'btn'); } } });
        const card = dlg(re ? 'Adoption Certificate (Reissued)' : 'Adoption Certificate', [h('h3', { text: re ? 'Adoption Certificate (Reissued)' : 'Adoption Certificate' }),
          re ? h('p', { text: 'Your certificate was lost. It was not lost. It has been reissued in advance of being lost.' }) : null, field('Name', inp), field('Birth date', 'Before'), field('Distinguishing marks', 'rock'), field('Signature', 'none, by design'),
          h('div', { class: cx('opts') }, mbtn('Accept Custody', function () { accept(inp.value, 'btn'); }, 'b-feed'))]);
        let coarse = false; try { coarse = !!window.matchMedia('(pointer:coarse)').matches; } catch (e) { coarse = false; }
        openModal('cert', card, { autoMs: api.selftest ? 4000 : 30000, focus: coarse ? 'button' : 'input', onScrim: function () { say('You clicked away from the form. This counts as a signature.', { mood: 'smug', priority: 1 }); accept(inp.value, 'scrim'); }, onClose: function (why) { accept(inp.value, why); } }); }
      function nameSecrets(n, why) { const lc = n.toLowerCase(), L = LN.names;
        if (lc === 'tuesday') { api.stat.set('pet-rock.tuesdayDone', 1); say(L.tuesday[0], { mood: 'confused', priority: 2 }); later(7, function () { say(L.tuesday[1], { mood: 'smug', priority: 1 }); }); api.achieve('pet-rock.tuesday'); }
        else if (lc === 'gerald') { say(L.gerald[0], { mood: 'confused', priority: 2 }); api.toast(L.gerald[1], { icon: '🥔' }); }
        else if (lc === 'dennis') say(L.dennis[0], { mood: 'proud', priority: 1 }); else if (lc === 'moss') say(L.moss[0], { mood: 'smug', priority: 1 });
        else if (lc === 'sandra') say(L.sandra[0], { mood: 'confused', priority: 1 }); else if (n === 'Clive' && why === 'btn') say(L.clive[0], { mood: 'proud', priority: 1 }); }
      function vetModal() { if (S.modal) return; S.fired.vet = true; S.vetDone = true; const body = h('div'); let done = false;
        const fin = function () { if (done) return; done = true; api.award(0.5); say(LN.vet[0], { mood: 'confused', priority: 1 }); later(6, function () { say(api.line('m:pet-rock:vet'), { mood: 'confused', priority: 0 }); }); later(14, function () { say(LN.vetClock, { mood: 'confused', priority: 0 }); }); };
        const step = function (n, nt) { while (body.firstChild) body.removeChild(body.firstChild);
          if (n === 0) body.appendChild(h('div', null, h('p', { text: 'Question 1 of 7 1/2' }), h('p', { text: 'Has the rock been exposed to weather?' }), h('div', { class: cx('opts') },
            mbtn('Yes', function () { step(1, 'Noted. The weather has been informed and has asked for a copy.'); }), mbtn('Yes, but it was fine.', function () { step(1, 'Noted. "Fine" has been underlined once by the vet and twice by the rock.'); }),
            mbtn('It is a rock.', function () { step(1, 'The vet wrote that down twice and was visibly relieved to have it said.'); }))));
          else if (n === 1) body.appendChild(h('div', null, h('p', { style: 'font-style:italic', text: nt || '' }), h('p', { text: 'Question 7 1/2 of 7 1/2: Does the rock experience dread?' }),
            h('label', { style: 'display:inline-flex;gap:6px;align-items:center;width:50%;font-weight:800' }, h('input', { type: 'checkbox' }), 'I half agree'), h('div', { class: cx('opts') }, mbtn('Submit Findings', function () { step(2); }, 'b-feed'))));
          else { fin(); api.sfx('stamp');
            body.appendChild(h('div', null, h('p', { class: cx('rev'), text: 'Diagnosis: rock.' }), h('p', { class: cx('hr'), 'aria-hidden': 'true', text: '🤝' }), h('p', { text: 'The handshake is offered. Clive cannot return it. It is noted as a firm one.' }),
              h('p', { text: 'The Stapler (union rep) demands Clive be listed as a member. The Stapler has been pressed into service before.' }), h('div', { class: cx('opts') }, mbtn('Fine', function () { closeModal('btn'); }, 'b-walk'))));
          } renameTree(body);
        }; openModal('vet', dlg('Vet Visit', [h('h3', { text: '📋 Dr. Pemberton-Slate (Veterinary Geology)' }), body]), { onClose: function () { fin(); } }); step(0); }
      function circleModal() { if (S.modal) return; S.fired.circle = true; let clicks = 0, anon = false; const msg = h('p', { 'aria-live': 'polite', text: 'Find Clive.' });
        const declare = function () { if (anon) return; anon = true; msg.textContent = nm('Clive has chosen anonymity.');
          say(LN.circle[4], { mood: 'proud', priority: 1 }); api.award(0.5, 'circle');
          later(6, function () { say(LN.circle[5], { who: 'Gerald', mood: 'proud', priority: 1 }); unlock('gerald', null); }); }; const rocks = h('div', { class: cx('rocks') });
        for (let i = 0; i < 12; i++) rocks.appendChild(h('button', { type: 'button', class: cx('rock'), 'aria-label': 'Rock ' + (i + 1), onclick: function () {
          clicks++; api.sfx('tick'); msg.textContent = nm("That's Clive."); sayL('circleClick', null, { priority: 0 }); if (clicks >= 3) declare(); } }));
        openModal('circle', dlg('Support Circle', [h('h3', { text: 'Support Circle' }), msg, rocks, h('div', { class: cx('opts') }, mbtn('Clive Has Chosen Anonymity', function () { closeModal('btn'); }, 'b-sup'))]), { onClose: function () { declare(); } });
        say(LN.circle[0], { mood: 'neutral', priority: 1 }); later(25, declare); }
      function fingerCourt() { if (S.modal || S.buried) return; let done = false; const body = h('div');
        const fin = function () { if (done) return; done = true; api.award(1.5, 'Finger refund'); later(3, function () { say(LN.court[2], { mood: 'smug', priority: 1 }); }); };
        const step = function (n) { while (body.firstChild) body.removeChild(body.firstChild); api.sfx(n === 2 ? 'stamp' : 'tick');
          if (n === 0) { say(LN.court[0], { mood: 'smug', priority: 1 }); body.appendChild(h('div', null, h('p', { class: cx('rev'), text: 'Clive v. Your Finger' }), h('p', { text: 'All rise. Judge: Doily. Clerk: lamp. The finger is present and has not been asked to speak.' }),
            h('div', { class: cx('opts') }, mbtn('Swear in the Finger (click it)', function () { step(1); }, 'b-sup')))); }
          else if (n === 1) body.appendChild(h('div', null, h('p', { class: cx('court'), text: 'Dennis (Plant), upright: "Upright, and unimpressed."' }), h('p', { class: cx('court'), text: 'Sandra from Compliance: "Sandra has flagged the finger."' }),
            h('p', { class: cx('court'), text: 'The Pigeon audits the finger and finds it load-bearing.' }), h('div', { class: cx('opts') }, mbtn('Hear the Verdict', function () { step(2); }, 'b-walk'))));
          else { fin(); say(LN.court[1], { mood: 'proud', priority: 1 }); body.appendChild(h('div', null, h('p', { class: cx('rev'), text: 'VERDICT: guilty of Affection in the Third Degree.' }), h('p', { text: 'Sentence: one pat, suspended, to be served concurrently, indefinitely. The fee has been refunded, with interest, to a finger that may not spend it.' }),
            h('div', { class: cx('opts') }, mbtn('Rise', function () { closeModal('btn'); }, 'b-feed')))); }
          renameTree(body); };
        if (!openModal('court', dlg('Clive v. Your Finger', [h('h3', { text: 'Seismic Hearing' }), body]), { autoMs: api.selftest ? 6000 : 40000, onClose: function () { fin(); } })) return; step(0); }
      function quietRoom() { if (S.modal) return; endHold(); api.achieve('pet-rock.hospitality'); say(LN.quiet[0], { mood: 'confused', priority: 2 }); api.sfx('sad');
        openModal('quiet', h('div', { class: cx('modal') + ' ' + cx('quiet'), role: 'dialog', 'aria-modal': 'true', tabindex: -1, 'aria-label': 'Quiet Room' }, h('h3', { text: 'Quiet Room' }), h('p', { text: 'Clive is in the quiet room. He will be released in 7.5 seconds.' }), h('p', { text: 'The room is also fine.' })),
          { closable: false, autoMs: 7500, onClose: function () { say(LN.quiet[1], { mood: 'proud', priority: 1 }); } }); }
      function reviewModal() { if (S.modal) return; let done = false; const fin = function () { if (done) return; done = true; api.award(1, 'review'); E.youP.hidden = false; };
        const rows = ['Punctuality: Yes', 'Initiative: Overreaching', 'Listening: Present', 'Care Quality: Adequate (technically)', 'Overall: Meets Expectations, Technically'];
        const card = dlg('Care Review', [h('h3', { text: "PERFORMANCE REVIEW (Rock's, presented by Clive)" }), rows.map(function (r) { return h('p', { class: cx('rev'), text: nm(r) }); }),
          h('p', { class: cx('rev'), text: 'technically' }), h('p', { text: 'Footnote: technically.' }), h('div', { class: cx('opts') }, mbtn('Acknowledge Review', function () { closeModal('btn'); }, 'b-feed'))]);
        if (!openModal('review', card, { onClose: fin })) return; S.needZero = true; E.youP.querySelector('b').textContent = String(api.player.name || 'You').slice(0, 16);
        say(LN.review[0], { mood: 'proud', priority: 1 }); later(4, function () { say(LN.review[1], { mood: 'smug', priority: 0 }); });
        later(8, function () { S.needZero = false; say(LN.zero, { mood: 'neutral', priority: 1 }); });
        later(14, function () { say(LN.review[3], { mood: 'confused', priority: 1 }); E.youP.hidden = false; });
        later(20, function () { say(LN.review[4], { mood: 'smug', priority: 0 }); }); }
      function gradModal() { if (S.modal) return; let stage = 0, timer = 0, finished = false;
        const body = h('div'); const nextB = mbtn('Next', function () { go(stage + 1); }, 'b-feed');
        const fin = function () { if (finished) return; finished = true; api.clearTimeout(timer); finishGrad(); }; const go = function (n) { api.clearTimeout(timer);
          if (n > 3) { closeModal('btn'); return; }
          stage = n; while (body.firstChild) body.removeChild(body.firstChild);
          if (n === 0) { say(LN.grad[0], { mood: 'proud', priority: 2 }); body.appendChild(h('div', null, h('p', { class: cx('hr'), 'aria-hidden': 'true', text: '🎓' }), h('p', { class: cx('rev'), text: 'Management is wearing a paper hat. It is a hat for a party that has not yet agreed to exist.' }), h('p', { text: 'Care Certification: Chief Rock Officer, Level 1 of 1. Do not look for Level 2. It is also Level 1.' }))); S.graduated = true; paintRank(); api.sfx('stamp'); }
          else if (n === 1) { say(LN.grad[2], { mood: 'proud', priority: 1 }); body.appendChild(h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:6px' }, LN.slide.map(function (c) { return h('div', { class: cx('slide'), style: 'margin:0;padding:6px;font-size:.7rem' }, h('i', { style: 'width:56px;height:34px;margin-bottom:3px' }), c); }))); }
          else if (n === 2) { const u = api.selftest ? 0.1 : 1, bar = h('div', { class: cx('speech') }, h('i')), tx = h('div', { class: cx('tx'), text: 'Transcript: [ ]  Page 1 of 1.' }), list = h('div');
            body.appendChild(h('div', null, h('p', { class: cx('rev'), text: 'Clive will now give his acceptance speech.' }), bar, tx, list));
            api.setTimeout(function () { if (stage === 2) bar.classList.add(cx('go')); }, 40);
            LN.speech.forEach(function (t, k) { api.setTimeout(function () { if (stage !== 2 || !S.modal || S.modal.name !== 'grad') return; say(t, { mood: k === 4 ? 'proud' : 'smug', priority: 1 }); api.sfx(k === 4 ? 'tada' : 'tick'); list.appendChild(h('p', { text: nm(t) }));
              if (k === 4) { api.confetti(); tx.textContent = 'Transcript: [ ]  Page 1 of 1. Accuracy: 100%.'; } }, (4000 + k * 2400) * u); }); }
          else { say(LN.grad[5], { mood: 'confused', priority: 1 }); body.appendChild(h('div', null, h('p', { class: cx('rev'), text: 'Moss arrives. One cell.' }), h('p', { text: "Sandra's note: approved. Sandra has used a stamp. The stamp is also a form." }), h('p', { text: 'Management has asked for a moment, and for the lights to be kept low.' }), h('p', { class: cx('rev'), text: 'Hardcore Mode Complete. Please enjoy Standard Mode.' }))); nextB.textContent = 'Enjoy Standard Mode'; S.moss++; paintMoss(); S.moss--; }
          renameTree(body); timer = api.setTimeout(function () { if (S.modal && S.modal.name === 'grad') go(stage + 1); }, api.selftest ? (n === 2 ? 3000 : 2500) : (n === 2 ? 20000 : 8000)); };
        if (!openModal('grad', dlg('Graduation', [h('h3', { text: 'Graduation Ceremony' }), body, h('div', { class: cx('opts') }, nextB)]), { onClose: fin })) return; go(0); }
      function finishGrad() { S.gradAt = api.now(); if (!S.used[12]) { S.used[12] = true; const p = baseEntry(12); if (S.started) addPage(p); else force(p); }
        S.loops++; S.moss++; S.tilt = 0; E.clive.style.removeProperty('--m-pet-rock-tilt'); S.graduated = true; S.rank = 5; paintRank();
        S.T = 90; S.lastEntryT = S.T; S.since = 0; S.beatIdx = 0; S.lastBeat = -99; S.fired = {}; S.dynUsed = {}; S.deckAt = 110; S.dayStep = 1; S.dayAcc = 0; S.dayAgain = true; S.target = 100 + S.loops + 1; S.needZero = false; S.gentle = false;
        recompSpeed(); paintDay(); paintFlag(); paintMoss(); E.cal.hidden = true; E.mode.textContent = LN.modes[S.loops % 5]; vis(E.shades, S.loops % 5 === 3);
        api.stat.inc('pet-rock.loops'); api.flag.set('pet-rock.loops', S.loops); api.achieve('pet-rock.graduate'); api.award(25, 'graduation'); api.confetti(undefined, undefined, 90); api.sfx('tada'); persist();
        say(fill(api.line('m:pet-rock:loopBanner'), { N: S.loops, M: S.target }), { mood: 'proud', priority: 1 });
        if (S.loops === 1) later(8, function () { say(LN.grad[10], { mood: 'smug', priority: 1 }); });
        else if (S.loops % 5 === 0) later(8, function () { say('Welcome back to Hardcore Mode. Clive remembers nothing. Clive remembers everything.', { mood: 'smug', priority: 1 }); });
      }
      function alertEv() { if (!E.alert.hidden) return;
        E.alertTx.textContent = nm(api.line(S.gentle ? 'm:pet-rock:alertGentle' : 'm:pet-rock:alertText')) + ' (A)'; E.alert.hidden = false; api.sfx('blip');
        S.alertId = api.setTimeout(function () { if (!E.alert.hidden) { E.alert.hidden = true; sayL('alertMiss', null, { mood: 'disappointed', priority: 0 }); } }, S.kbd ? 6500 : 3000); }
      function alertHit() { if (E.alert.hidden) return;
        api.clearTimeout(S.alertId); E.alert.hidden = true; api.stat.inc('pet-rock.alerts'); api.award(0.2, 'alert'); api.sfx('ding'); sayL('alertHit', null, { mood: 'proud', priority: 1 });
      }
      function photoEv() { if (!E.snap.hidden) return; E.snap.hidden = false; api.clearTimeout(S.snapId); S.snapId = api.setTimeout(function () { E.snap.hidden = true; }, 12000); sayL('photoDay', null, { priority: 1 }); }
      function snapPhoto() { if (E.snap.hidden) return; E.snap.hidden = true; S.photos++; api.stat.inc('pet-rock.photos'); award(0.2, 'photo'); api.sfx('pop');
        const cap = LN.photo[Math.min(11, S.photos - 1)]; E.albumC.hidden = false;
        E.album.appendChild(h('figure', { class: cx('polaroid'), style: '--tilt:' + (api.rand() * 8 - 4).toFixed(1) + 'deg' }, h('i'), h('figcaption', { text: nm(cap) })));
        while (E.album.children.length > 12) E.album.removeChild(E.album.firstChild);
        if (S.photos >= 3) { say(fill(LN.snap, { N: S.photos, M: S.photos - 1 }), { priority: 1 }); later(2, function () { say(cap, { priority: 0 }); }); } else say(cap, { priority: 1 });
      }
      function rainEv() { tog(E.hab, 'is-rain', true); vis(E.umb, true); sayL('rain', null, { priority: 1 });
        api.clearTimeout(S.rainId); S.rainId = api.setTimeout(function () { tog(E.hab, 'is-rain', false); vis(E.umb, false); }, 12000); }
      function birthdayEv() { memo('Birthday', 'Candles: enough. 🕯️🕯️🕯️🕯️🕯️'); sayL('birthday', null, { mood: 'proud', priority: 1 }); api.sfx('bell'); }
      function geraldEv() { memo('🥔 Gerald (Potato)', 'Monocle: present. Opinions: pending.'); api.sfx('honk');
        if (api.flag.get('metGerald')) say(api.line('m:pet-rock:geraldMet'), { who: 'Gerald', priority: 1 }); else if (api.chance(0.3)) say(LN.geraldUnmet, { priority: 1 });
        else say(api.line('m:pet-rock:gerald'), { who: 'Gerald', priority: 1 }); }
      function dennisEv() { memo('🌿 Dennis (Plant)', 'Thinking of you. Photosynthesizing.'); sayL('dennis', null, { priority: 1 }); }
      function sandraEv() { const pol = ['Policy 4.2', 'Policy 4.2.1', 'Policy 4.2.1(a)', 'Policy 14', 'Policy 14(b)']; memo('🚩 ' + pol[S.tickN % 5], 'Sandra has flagged this.'); sayL('sandra', null, { priority: 1 }); }
      function rockshowEv() { memo('Rock Show', 'Judges: 10, 10, 10. Best in Show: Clive. Everyone else: also Best in Show.'); sayL('rockshow', null, { mood: 'proud', priority: 1 }); api.sfx('fanfare'); }
      function incidentEv() { const t = S.incIdx < INCIDENTS.length ? INCIDENTS[S.incIdx++] : api.pick(INCIDENTS);
        incident(); memo('INCIDENT #' + (S.incidents === 7 ? '7 1/2' : S.incidents), t, { tilt: (api.rand() * 10 - 5).toFixed(1), ms: 9000 }); say(t, { mood: 'confused', priority: 1 }); api.sfx('buzz');
      }
      function ticketEv() { memo('Suggestion Box', api.line('m:pet-rock:memo')); api.sfx('blip'); }
      const ECHOES = [['metToaster', 'cbToaster'], ['toaster.met', 'cbToaster'], ['metStapler', 'cbStapler'], ['metDennis', 'cbDennis'], ['plantClicked', 'cbPlant'], ['sockSeen', 'cbSock'], ['complaints-dept.rockMet', 'cbComplaint'],
        ['staring-contest.met', 'cbStare'], ['the-button.ceremony', 'cbButton'], ['elevator-simulator.arrived', 'cbElevator'], ['cloud-gazer.certified', 'cbCloud']];
      function echoEv() { let pk = null; const order = api.shuffle(ECHOES);
        for (let i = 0; i < order.length && !pk; i++) { let v = false; try { v = !!api.flag.get(order[i][0]); } catch (x) { v = false; } if (v && !S.echoUsed[order[i][1]]) pk = order[i]; }
        if (!pk) { ticketEv(); return; } S.echoUsed[pk[1]] = true; const t = api.line('m:pet-rock:' + pk[1]); memo('Heard in the Building', t, { ms: 10000 }); say(t, { mood: 'confused', priority: 1 }); api.sfx('blip'); }
      function surveyModal() { if (S.modal) return; let done = false; const body = h('div'), SV = LN.sv; const fin = function () { if (done) return; done = true; api.award(0.5, 'survey'); };
        const show = function (i) { fin(); api.sfx('stamp'); while (body.firstChild) body.removeChild(body.firstChild);
          if (i === 3) { api.stat.set('pet-rock.spoke', 1); api.achieve('pet-rock.spoken'); api.award(3, 'meeting'); say(SV.spoken, { mood: 'smug', priority: 2 });
            body.appendChild(h('div', null, h('p', { class: cx('rev'), text: 'Meeting scheduled: Before.' }), h('p', { text: 'Attendees: you, Clive, and a lamp that asked to sit in. Agenda: being here. Duration: yes.' }), h('div', { class: cx('opts') }, mbtn('Attend (in spirit)', function () { closeModal('btn'); }, 'b-sup')))); }
          else { sayL('survey', null, { mood: 'proud', priority: 1 }); later(6, function () { say(SV.res, { priority: 0 }); });
            body.appendChild(h('div', null, h('p', { class: cx('rev'), text: SV.res }), h('div', { class: cx('opts') }, mbtn('Fine', function () { closeModal('btn'); }, 'b-walk')))); } renameTree(body); };
        body.appendChild(h('div', null, h('p', { text: SV.q }), h('div', { class: cx('opts') }, SV.opts.map(function (t, i) { return mbtn(t, function () { show(i); }, i === 3 ? 'b-sup' : ''); }))));
        if (!openModal('survey', dlg('Rock Satisfaction Survey', [h('h3', { text: 'Rock Satisfaction Survey (1 of 1)' }), body]), { onClose: function () { fin(); } })) return; say(SV.intro, { mood: 'proud', priority: 1 }); }
      function tenMin() { S.tenDone = true; api.achieve('pet-rock.longservice'); api.award(5, 'long service'); api.sfx('fanfare'); say(LN.ten[0], { mood: 'proud', priority: 2 });
        later(6, function () { say(LN.ten[1], { mood: 'confused', priority: 1 }); });
        later(12, function () { if (!S.under) vis(E.lids, true); api.sfx('pop'); api.confetti(); say(LN.ten[2], { mood: 'proud', priority: 2 }); api.setTimeout(function () { if (!S.blinking) vis(E.lids, false); }, 1600); });
        later(19, function () { say(LN.ten[3], { mood: 'proud', priority: 1 }); memo('Long Service Award', 'Ten minutes. Clive: 4.5 billion years. The two have been framed together, at a slight angle.', { ms: 12000 }); });
        force(mkEntry('I blinked on purpose today. It took everything I had. It took a second. Both are true, and I have decided not to choose.', 'P.S. Moss saw. Moss is not a witness. Moss is a friend.', { key: 'ten' })); }
      function pigeonLeave(poked) { if (!S.pigeonOn) return; S.pigeonOn = false; api.clearTimeout(S.pigeonId); E.pigeon.hidden = true;
        if (poked) say(LN.pigeonPoke, { mood: 'confused', priority: 1 }); else sayL('pigeonLeave', null, { mood: 'proud', priority: 1 }); }
      function pigeonEv() { if (S.pigeonOn || S.modal) return; S.pigeonOn = true; S.pigeons++; E.pigeon.hidden = false; api.sfx('honk'); sayL('pigeon', null, { mood: 'confused', priority: 1 }); api.achieve('pet-rock.audited');
        S.pigeonId = api.setTimeout(function () { pigeonLeave(false); }, 9000); }
      function grantBless() { S.blessedOnce = true; api.achieve('pet-rock.blessed'); api.award(5, 'blessing'); api.confetti(); api.sfx('tada'); }
      function sneezeEv() { S.sneezes++; E.achoo.hidden = false; flash(E.clive, 'chew'); api.setTimeout(function () { tog(E.clive, 'chew', false); }, 650); api.sfx('pop'); tline(['Incident log: Sneeze (Disputed).']);
        sayL('sneeze', null, { mood: 'confused', priority: 2 }); api.setTimeout(function () { E.achoo.hidden = true; }, 2600);
        if (S.blessedAhead) { S.blessedAhead = false; later(3, function () { say(LN.blessReady, { mood: 'proud', priority: 2 }); grantBless(); }); return; }
        S.sneezeOpen = true; api.clearTimeout(S.sneezeId); S.sneezeId = api.setTimeout(function () { if (S.sneezeOpen) { S.sneezeOpen = false; say(LN.unblessed, { mood: 'disappointed', priority: 1 }); } }, 30000); }
      function bless() { if (S.sneezeOpen) { S.sneezeOpen = false; api.clearTimeout(S.sneezeId); E.achoo.hidden = true; say(LN.blessNow, { mood: 'proud', priority: 2 }); grantBless(); }
        else if (S.blessedAhead || S.blessedOnce) say(LN.blessAgain, { mood: 'smug', priority: 1 }); else { S.blessedAhead = true; say(LN.blessAhead, { mood: 'smug', priority: 1 }); } }
      function rareRoll() { if (S.modal || S.buried || S.idleOn || S.T < 100 || S.hold) return; const k = api.selftest ? 12 : 1;
        if (!S.pigeonOn && S.pigeons < 3 && api.chance(k / 330)) pigeonEv(); else if (S.sneezes < 3 && !S.sneezeOpen && api.chance(k / 450)) sneezeEv(); }
      const EV = { alert: alertEv, vet: vetModal, photo: photoEv, rain: rainEv, birthday: birthdayEv, gerald: geraldEv, dennis: dennisEv, sandra: sandraEv, circle: circleModal, rockshow: rockshowEv, incident: incidentEv, ticket: ticketEv, echo: echoEv,
        survey: function () { if (S.loops > 0 && !api.stat.get('pet-rock.spoke') && !S.fired.survey) { S.fired.survey = true; surveyModal(); } else ticketEv(); } };
      const DECK = Object.keys(EV);
      function drawDeck() { let id = S.forceNext; S.forceNext = ''; for (let tries = 0; !id && tries < 4; tries++) {
          if (!S.bag.length) { S.bag = api.shuffle(DECK); if (S.bag[S.bag.length - 1] === S.lastDeck && S.bag.length > 1) S.bag.unshift(S.bag.pop()); }
          id = S.bag.pop(); if ((id === 'vet' || id === 'circle') && S.fired[id]) id = ''; }
        if (!id) id = 'ticket'; S.lastDeck = id; EV[id](); }
      function servePebble() { if (S.modal) return;
        tline(['Pebble 100 -> 100 (change: +0.000)']); E.due.hidden = true; award(0.1, 'pebble'); api.sfx('pop'); flash(E.pebble, 'pop'); api.stat.inc('pet-rock.pebbles');
        if (api.chance(0.5)) sayL('pebbleServe', null, { priority: 0 }); }
      function showPebble() { S.hasPebble = true; E.pebble.hidden = false; E.pneed.hidden = false; paintNeeds();
        say(LN.pebble[0], { mood: 'confused', priority: 1 }); later(8, function () { say(LN.pebble[1], { priority: 0 }); }); later(12, function () { say(LN.needs[3], { priority: 0 }); });
        later(40, function () { memo('Tier Three (Draft)', 'A grain of sand. Name TBD. Quarterly.'); say(LN.pebble[2], { priority: 0 }); });
        later(80, function () { memo('Tier Four (Draft)', 'Labeled Quarterly. Contents: undecided, in a dignified way.'); say(LN.pebble[3], { priority: 0 }); }); }
      function startBed() { S.bed = true; applyTuck(); say(LN.bed[0], { mood: 'neutral', priority: 1 }); later(4, function () {
          E.clock.classList.add(cx('c317')); E.clockLbl.hidden = false; say(LN.bed[4], { priority: 1 });
          const p = mkEntry("It is 3:17 AM. I woke up. Nothing is wrong. I just wanted someone to know that I am here and it is quiet and I am glad of it.", 'P.S. Not an emergency. A feeling. Moss would have understood.', { key: '317' });
          if (S.started) addPage(p); else force(p); say(LN.bed[1], { mood: 'confused', priority: 1 }); }); later(8, function () {
          memo('🥔 ' + (api.flag.get('metGerald') ? 'Gerald, VP of Spuds' : 'A Spud.'), 'Have you considered being a potato.'); say(LN.bed[2], { who: 'Gerald', priority: 1 });
          for (let i = 0; i < S.pages.length; i++) if (S.pages[i].key === '317') { S.pages[i].notes.push('Daily.'); if (i === S.cur) paintDiary(); }
        }); later(12, function () { memo('🌿 Dennis (Plant)', 'Competent. Unimpressed.'); say(LN.bed[3], { priority: 1 }); });
        later(10, function () { if (S.bed && !S.tucked) { S.tucked = true; applyTuck(); say('Clive has been tucked in on your behalf. Management does this for everyone.', { mood: 'smug', priority: 1 }); } });
        later(16, function () { say(LN.bed[5], { mood: 'disappointed', priority: 0 }); });
        later(20, function () { S.bed = false; applyTuck(); E.clock.classList.remove(cx('c317')); E.clockLbl.hidden = true; }); }
      function humansGlitch() { const tl = E.tiles[4], first = S.humansN++ === 0; tl.lab.textContent = 'Humans'; api.sfx('sad');
        if (first) { tl.val.textContent = '38%'; tog(tl.t, 'bad', true); say(LN.humans[1], { mood: 'panic', priority: 2 }); }
        else { tl.val.textContent = '100%'; say(LN.humans[2], { mood: 'smug', priority: 1 }); }
        api.setTimeout(function () { tl.lab.textContent = VITALS[4]; tl.val.textContent = '100%'; tog(tl.t, 'bad', false); if (first) say(LN.humans[0], { mood: 'neutral', priority: 1 }); }, 2000);
      }
      function sediment() {
        flash(E.spark, 'sparkgo'); api.sfx('fanfare'); api.confetti(); S.tilt = 3; E.clive.style.setProperty('--m-pet-rock-tilt', '3deg'); S.gentle = true;
        memo('CLIVE (SLIGHTLY DIFFERENT ANGLE)', 'Promotion offered. Raise declined, on a technicality.', { ms: 10000 });
        say(LN.sed[0], { mood: 'proud', priority: 2 }); later(6, function () { say(LN.sed[1], { mood: 'smug', priority: 1 }); }); later(14, function () { say(LN.sed[2], { priority: 0 }); }); later(22, function () { say(LN.sed[3], { priority: 0 }); });
      }
      function tuesday(i) { E.cal.hidden = false; E.calN.textContent = 'TUE MINUS ' + (4 - i) + ' DAYS'; if (!reduced()) flash(E.cal, 'tear');
        tog(E.hab, 'flicker', false); void E.hab.offsetWidth; tog(E.hab, 'flicker', true); api.setTimeout(function () { tog(E.hab, 'flicker', false); }, 3200);
        tog(E.dial, 'shudder', false); void E.dial.offsetWidth; tog(E.dial, 'shudder', true);
        say(LN.tue[i], { mood: 'panic', priority: 2 }); later(6, function () { say(LN.tue[3 + (i % 2)], { mood: 'panic', priority: 0 }); });
        if (i === 2) later(12, function () { say(LN.tueFine, { mood: 'panic', priority: 2 }); }); }
      const BEATS = [
        { t: 0, once: 1, f: function () { if (S.loops > 0) return; later(3, certificate); later(3, function () { say(LN.intake[0], { mood: 'proud', priority: 1 }); }); later(15, function () { say(LN.intake[1], { mood: 'proud', priority: 0 }); }); } },
        { t: 10, once: 1, f: function () { showVitals(6); say(LN.X.feedOnly, { priority: 1 }); later(5, function () { sayL('vitalIntro', null, { mood: 'proud', priority: 0 }); }); } },
        { t: 25, once: 1, f: function () { memo('Onboarding Checklist', '1. Feed rock. 2. Observe rock. 3. Feed rock again. (Items 2 and 3 are the same item.)'); say(LN.X.onboard, { mood: 'proud', priority: 1 }); } },
        { t: 40, once: 1, f: function () { hardcoreOn(); say(LN.intake[2], { priority: 1 }); later(8, function () { say(LN.intake[3], { mood: 'confused', priority: 0 }); }); later(16, function () { say(LN.intake[4], { priority: 0 }); }); later(24, function () { say(LN.needs[0], { priority: 0 }); }); later(34, function () { say(LN.intake[5], { priority: 0 }); }); } },
        { t: 60, once: 1, f: function () { say(LN.sandraLeash, { mood: 'smug', priority: 1 }); } },
        { t: 80, once: 1, f: function () { memo('Suggestion Box', 'Please continue.'); say(LN.X.box, { mood: 'proud', priority: 1 }); } },
        { t: 100, once: 1, f: function () { say(LN.supKpi, { mood: 'proud', priority: 1 }); } },
        { t: 130, f: function () { memo('The Stapler (Union Rep)', 'Meeting requested. Topic: rock rights. Attendees: one stapler, one rock.'); say(LN.X.stapler, { mood: 'confused', priority: 1 }); } },
        { t: 150, f: gated(function () { if (S.loops === 1 && !S.fired.recert && !api.stat.get('pet-rock.tuesdayDone')) { S.fired.recert = 1; S.accepted = false; certificate(true); } }) },
        { t: 165, f: function () { memo('Sandra Reclassifies Clive', 'mineral, not a pet -> companion of record (Policy 4.2)'); say(LN.sandraReclass, { mood: 'smug', priority: 1 }); } },
        { t: 180, once: 1, f: gated(function () { surveyModal(); }) },
        { t: 205, once: 1, f: function () { say('Metrics inflation approved. Three more vitals will be added, one every 20 seconds. All will be 100%.', { priority: 1 }); [6, 7, 8].forEach(function (n, i) { later(2 + i * 20, function () { showVitals(n + 1); api.sfx('stamp'); say(LN.tips[n], { priority: 0 }); }); }); } },
        { t: 230, f: gated(function () { if (!S.fired.vet) vetModal(); }) },
        { t: 250, f: function () { memo('🌿 Dennis (Plant)', 'Thinking of you. Photosynthesizing.'); say(LN.dennis[0], { priority: 1 }); S.forceNext = 'rain'; } },
        { t: 275, once: 1, f: function () { showPebble(); } }, { t: 300, f: gated(function () { if (!S.fired.circle) circleModal(); }) },
        { t: 335, f: function () { memo('Staff Lunch', 'Held at 12:07 1/2. Attendance: total. Visible attendees: none.'); say('Lunch was held at 12:07 1/2. Everyone attended. Nobody was seen. Clive was already eating, which is to say he was not.', { priority: 1 }); } }, { t: 360, f: function () { startBed(); } },
        { t: 390, f: function () { S.force10 = true; S.u.ask = true; refreshLocks(); say(LN.inv[0], { mood: 'confused', priority: 1 }); later(6, function () { say(LN.inv[1], { priority: 0 }); }); later(14, function () { say(LN.inv[2], { mood: 'disappointed', priority: 0 }); }); later(22, function () { say(LN.inv[3], { mood: 'proud', priority: 0 }); }); } },
        { t: 410, f: function () { humansGlitch(); } },
        { t: 430, f: function () { memo('Tuesday Preparedness Drill', 'Everyone stand still. Do not look at the calendar. Instructor: Clive.'); say('Tuesday Preparedness Drill: everyone stand still, avoid the calendar, and pretend to be a rock. Clive has been practicing since Before and is the instructor. He has not said a word.', { mood: 'panic', priority: 1 }); } },
        { t: 450, f: function () { sediment(); } }, { t: 465, f: function () { tuesday(0); } },
        { t: 495, f: function () { tuesday(1); } }, { t: 525, f: function () { tuesday(2); } }, { t: 540, always: 1, f: gated(function () { reviewModal(); }) },
        { t: 570, always: 1, f: gated(function () { gradModal(); }) }
      ];
      function hardcoreOn() {
        S.shown.hardcore = true; E.need.hidden = false; E.debtRow.hidden = false; E.goalW.hidden = false; E.sched.hidden = false; S.target = 100 + S.loops + 1; paintFlag(); paintGoal(); paintNeeds();
      }
      function runBeat() { let i = S.beatIdx; while (i < BEATS.length && S.loops > 0 && BEATS[i].once) i++; S.beatIdx = i; const b = BEATS[i]; if (!b || b.t > S.T) return; S.beatIdx++;
        if (S.T - b.t > 90 && !b.always) return; S.lastBeat = S.T; b.f(); }
      function idleFire(i) { S.idleOn = true; if (i === 0) say(LN.idle[0], { mood: 'neutral', priority: 1 }); else if (i === 1) say(LN.idle[1], { mood: 'smug', priority: 1 });
        else if (i === 2) { tog(E.hab, 'dim', true); tog(E.app, 'idle', true); say(LN.idle[2], { mood: 'proud', priority: 1 }); api.achieve('pet-rock.sovereign');
          const p = mkEntry('Entry 0. No one here. I am a rock. It is the best I have ever been at it.', 'P.S. Moss? Never mind. No one is here.', { key: 'e0' });
          if (!S.seen.e0) { S.seen.e0 = 1; if (S.started && !S.modal) addPage(p, true); else force(p); }
        } else if (i === 3) { E.tiny.hidden = false; say(LN.idle[3], { mood: 'confused', priority: 1 }); api.toast('You have been tucked in by a rock. This is a Distinction.', { icon: '🛏️' }); api.achieve('pet-rock.mattress'); }
        else if (i === 4) { E.careP.hidden = false; say(LN.idle[4], { mood: 'confused', priority: 2 }); api.achieve('pet-rock.reversal');
          const p = mkEntry('Day 241: The human has not moved. I am worried and extremely still.', 'P.S. There, there.', { key: 'd241' }); if (!S.seen.d241) { S.seen.d241 = 1; if (S.started) addPage(p); else force(p); }
        } else if (i === 5) { tog(E.clive, 'left1', true); incident(); say(LN.idle[5], { mood: 'panic', priority: 2 });
          later(5, function () { say(LN.idle360, { mood: 'smug', priority: 1 }); }); api.setTimeout(function () { tog(E.clive, 'left1', false); }, 3000);
        } else say(LN.idle[Math.min(i, LN.idle.length - 1)], { mood: 'confused', priority: 1 }); S.idleChatT = api.now(); }
      function idleBack(gap) { const was = S.idleI; S.idleI = 0; S.idleOn = false; S.idleChatT = -1e9;
        tog(E.hab, 'dim', false); tog(E.app, 'idle', false); E.tiny.hidden = true; E.careP.hidden = true; tog(E.clive, 'left1', false);
        if (was >= 5 && gap >= IDLE[4]) sayL('idleRetLong', null, { mood: 'proud', priority: 1 }); else if (was >= 3 && gap >= IDLE[2]) sayL('idleRetShort', null, { mood: 'smug', priority: 1 }); }
      function onVis() { if (document.hidden) { S.hiddenAt = api.now(); endHold(); if (S.resizes > 0) S.resizedHid = true;
          if (S.resizedHid && !S.seen.windress) { S.seen.windress = 1; force(mkEntry('Diary: The walls moved. Then the light went away. Then it came back. I have always suspected the room was negotiable.', 'P.S. Moss remains in place. Moss does not do windows.', { key: 'wd' })); }
        } else if (S.hiddenAt) { const secs = (api.now() - S.hiddenAt) / 1000; S.hiddenAt = 0; S.last = api.now();
          if (secs >= (api.selftest ? 3 : 30)) say(fill(LN.away, { S: int(secs) }), { mood: 'smug', priority: 1 }); }
      }
      function onResize() { api.clearTimeout(S.resizeId); S.resizeId = api.setTimeout(function () { S.resizes++; cacheHab(); const w = window.innerWidth || 0;
          if (w > 0 && w < 400 && !S.sawSmall) { S.sawSmall = true; say(LN.secrets.small, { mood: 'confused', priority: 1 }); }
          if (S.resizes > 5 && !S.sawMany) { S.sawMany = true; say(LN.secrets.resize, { mood: 'confused', priority: 1 }); vis(E.brow, true); api.setTimeout(function () { vis(E.brow, false); }, 2500); }
        }, 200); }
      function onKey(e) { touch(); S.kbd = true; const k = String(e.key || '');
        if (k === 'Escape') { if (S.modal) { if (S.modal.closable) closeModal('esc'); } else if (S.open) toggleDiary(false); return; }
        if (e.ctrlKey || e.altKey || e.metaKey || S.modal) return; const t = e.target; if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(String(t.tagName)) || t.isContentEditable)) return;
        const lk = k.toLowerCase(); if (lk === 'arrowleft' || lk === 'arrowright') {
          if (S.open && S.padOpened) { e.preventDefault(); if (!e.repeat) page(lk === 'arrowleft' ? -1 : 1); return; }
          if (lk === 'arrowright' && S.u.walk) { e.preventDefault(); if (!e.repeat) startHold('walk', 'key-r'); return; }
          if (S.hold && S.hold.kind === 'walk') e.preventDefault(); return; }
        if (lk === 'w') { if (S.u.walk) { e.preventDefault(); if (!e.repeat) startHold('walk', 'key-w'); } return; }
        if (lk === 's') { if (S.u.support) { e.preventDefault(); if (!e.repeat) startHold('support', 'key-s'); } return; }
        if (e.repeat) return; if (lk === 'f' && !e.shiftKey) { barPress(); serve(S.sel, 'key'); }
        else if (lk === 'q' || lk === 'f') { cycleSel(); say('Selected: ' + SNK[S.sel].n + '. Management approves of the selection process.', { priority: 0 }); }
        else if (lk === 'a') alertHit(); else if (lk === 't') tuck(); else if (lk === 'd') { barPress(); toggleDiary(); }
        else if (lk === 'u') underside(); else if (lk === '1' || lk === '2' || lk === '3') affirm(Number(lk) - 1); }
      function onKeyUp(e) { const hd = S.hold; if (!hd) return; const lk = String(e.key || '').toLowerCase();
        if ((lk === 'w' && hd.via === 'key-w') || (lk === 'arrowright' && hd.via === 'key-r') || (lk === 's' && hd.via === 'key-s')) endHold(); }
      function habDown(e) { if (e.button > 0 || S.modal || !S.u.walk) return; const t = e.target; if (t && t.closest && t.closest('button,input,.' + cx('clive'))) return;
        S.drag = { x: e.clientX, y: e.clientY, last: e.clientX, on: false }; }
      function onPtrDown() { touch(); S.kbd = false; }
      function onPtrMove(e) { touch(); const now = api.now(); S.mx = e.clientX; S.my = e.clientY; S.lastMove = now; S.sagged = false; kick(); const dr = S.drag; if (dr) {
          if (!dr.on) { if (Math.abs(e.clientX - dr.x) + Math.abs(e.clientY - dr.y) >= 12) { if (startHold('walk', 'drag')) { dr.on = true; tog(E.hab, 'dragwalk', true); } else S.drag = null; } }
          else if (S.hold && S.hold.via === 'drag') { S.hold.m += Math.abs(e.clientX - dr.last) / 4; if (S.hab) S.ptr = { x: e.clientX - S.hab.left, y: e.clientY - S.hab.top }; }
          dr.last = e.clientX; }
        const d = S.pd; if (d) { if (!d.moved && Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 9) {
            d.moved = true; cacheHab(); d.ghost = h('span', { class: cx('ghost'), 'aria-hidden': 'true', text: SNK[d.id].e }); E.hab.appendChild(d.ghost); }
          if (d.moved && d.ghost && S.hab) { d.ghost.style.left = (e.clientX - S.hab.left).toFixed(0) + 'px'; d.ghost.style.top = (e.clientY - S.hab.top).toFixed(0) + 'px';
            const r = E.clive.getBoundingClientRect(), over = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
            if (over && !d.over) d.overAt = now; d.over = over; }
        }
      }
      function onPtrUp(e) { const d = S.pd; if (d) { S.pd = null; if (d.moved) { S.dragged = true; api.setTimeout(function () { S.dragged = false; }, 80);
            if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost);
            if (e.type !== 'pointercancel') { S.sel = d.id; paintSel(); serve(d.id, d.over ? 'drag' : 'decline'); }
          }
        }
        if (S.drag) { if (S.drag.on && S.hold && S.hold.via === 'drag') endHold(); S.drag = null; }
      }
      let rafId = 0, fl = 0;
      const pp = { x: 0, y: 0, vx: 0, vy: 0 };
      function kick() { if (!rafId) { fl = api.now(); rafId = api.requestAnimationFrame(frame); } }
      function walkVisual(hd, now) { const m = int(hd.m); if (m !== hd.lastM) { hd.lastM = m; E.odo.textContent = odoText(m, m > S.bestWalk); }
        if (!reduced()) { const px = S.walkTot + hd.m, F = [0.2, 0.5, 0.8, 1.2]; for (let i = 0; i < 4; i++) E.lays[i].style.transform = 'translateX(' + (-(((px * 12 * F[i]) / 600) % 1) * 50).toFixed(3) + '%)'; }
        const hb = S.hab; if (!hb) return; const cr = E.clive.getBoundingClientRect(), cxp = cr.left - hb.left + cr.width * 0.5, cyp = cr.top - hb.top + cr.height * 0.55; let hx, hy;
        if (hd.via === 'drag' && S.ptr) { hx = S.ptr.x; hy = S.ptr.y; }
        else { const t = Math.min(1, (now - hd.t0) / 3000); hx = hb.w * (0.56 + 0.16 * t) + Math.sin(now / 180) * 3; hy = hb.h * 0.5 + Math.cos(now / 220) * 3; }
        const dist = Math.sqrt((hx - cxp) * (hx - cxp) + (hy - cyp) * (hy - cyp)), sag = Math.min(80, 8 + dist * 0.25);
        E.leashP.setAttribute('d', 'M' + hx.toFixed(1) + ' ' + hy.toFixed(1) + ' Q' + ((hx + cxp) / 2).toFixed(1) + ' ' + ((hy + cyp) / 2 + sag).toFixed(1) + ' ' + cxp.toFixed(1) + ' ' + cyp.toFixed(1));
        E.handle.style.transform = 'translate(' + (hx - 8).toFixed(1) + 'px,' + (hy - 12).toFixed(1) + 'px)'; }
      function supportVisual(hd, now, dt) { const p = Math.min(1, (now - hd.t0) / 3000); E.ringp.setAttribute('stroke-dashoffset', (289 * (1 - p)).toFixed(1));
        hd.hs += dt; if (hd.hs > 0.3) { hd.hs = 0; spawnHeart(); }
        if (p >= 1 && !hd.done) { hd.done = true; supportDone(); endHold(); }
      }
      function frame() { rafId = 0; const now = api.now(); let dt = (now - fl) / 1000; fl = now; if (!(dt > 0)) dt = 0.016; if (dt > 0.1) dt = 0.1; let active = false; if (!S.under) {
          const cr = E.clive.getBoundingClientRect(), ccx = cr.left + cr.width * 0.5, ccy = cr.top + cr.height * 0.5; let tx = 0, ty = 0;
          if (S.mx == null || now - S.lastMove > 3000) ty = 5;
          else { const dx = S.mx - ccx, dy = S.my - ccy, d = Math.sqrt(dx * dx + dy * dy) || 1, mag = Math.min(6, d / 18); tx = dx / d * mag; ty = dy / d * mag; }
          const st = Math.min(4, dt / 0.0167), damp = Math.pow(0.8, st); pp.vx = (pp.vx + (tx - pp.x) * 0.15 * st) * damp; pp.vy = (pp.vy + (ty - pp.y) * 0.15 * st) * damp;
          pp.x = clamp(pp.x + pp.vx * st, -6, 6); pp.y = clamp(pp.y + pp.vy * st, -6, 6);
          if (Math.abs(pp.vx) + Math.abs(pp.vy) < 0.01 && Math.abs(tx - pp.x) + Math.abs(ty - pp.y) < 0.05) { pp.vx = 0; pp.vy = 0; pp.x = tx; pp.y = ty; } else active = true;
          const tr = 'translate(' + pp.x.toFixed(2) + ' ' + pp.y.toFixed(2) + ')';
          if (tr !== S.tr0) { S.tr0 = tr; E.pl[0].setAttribute('transform', tr); E.pl[1].setAttribute('transform', tr); }
        }
        const hd = S.hold; if (hd) { active = true; if (hd.kind === 'walk') { if (hd.via !== 'drag') hd.m += 24 * dt; walkVisual(hd, now); scenery(hd); }
          else supportVisual(hd, now, dt); if (S.hold === hd && hd.auto && now - hd.t0 >= hd.auto) endHold(); }
        if (active) kick(); }
      function tick() { const now = api.now(); let real = (now - S.last) / 1000; S.last = now; if (!(real > 0)) real = 0; if (real > 1) real = 1; const dt = real * S.speed;
        S.T += dt; S.needAcc += real; S.tickN++; if (S.hold && now - S.hold.t0 > 20000) endHold(); if (S.laters.length) {
          const due = []; S.laters = S.laters.filter(function (l) { if (l.at <= S.T) { due.push(l); return false; } return true; }); due.forEach(function (l) { try { l.fn(); } catch (e) { /* one bad beat must not eat the rest */ } }); }
        const idle = (now - S.lastInput) / 1000; if (S.idleI < IDLE.length && idle >= IDLE[S.idleI]) { const i = S.idleI; S.idleI++; idleFire(i); }
        if (S.tickN % 4 === 0) { if (idle > 5) api.stat.max('pet-rock.longestIdle', int(idle)); paintStatus(); checkUnlocks(); }
        paintNeeds(); S.dayAcc += dt; if (S.dayAcc >= 60) { S.dayAcc -= 60; S.dayStep++; paintDay(); }
        if (!S.modal && S.T - S.lastBeat >= 8) runBeat();
        if (S.T >= 50 && !S.modal && S.T >= S.deckAt && S.T - S.lastBeat >= 8 && idle < IDLE[0]) { S.deckAt = S.T + 15 + api.rand() * 10; drawDeck(); }
        if (S.u.diary && S.started && !S.modal) { let unread = 0; for (let i = 0; i < S.pages.length; i++) if (!S.pages[i].read) unread++;
          if (unread < 3 && (S.since >= 4 || S.T - S.lastEntryT >= 60)) { const p = nextEntry(); if (p) addPage(p); }
          else if (S.tickN % 4 === 0) paintProg(); }
        if (S.T >= 180 && !S.under) { S.blinkAcc += dt; while (S.blinkAcc >= 1) { S.blinkAcc -= 1; if (api.chance(1 / 150)) blink(); } }
        if (!S.seen.flip && S.T >= 120 && !S.modal) { S.seen.flip = 1; if (finePtr()) say(LN.secrets.flip, { priority: 0 }); }
        if (!S.sagged && S.mx != null && now - S.lastMove > 3000) { S.sagged = true; kick(); }
        const d = S.pd; if (d && d.moved && d.over && !d.chewed && now - d.overAt > 1000) { d.chewed = true; flash(E.clive, 'chew'); api.setTimeout(function () { tog(E.clive, 'chew', false); }, 650); say(LN.fs[6], { priority: 0 }); }
        S.wall += real * speedBase; if (!S.tenDone && S.wall >= 600 && !S.modal && !S.buried && S.idleI === 0 && (!S.gradAt || now - S.gradAt > (api.selftest ? 5000 : 45000))) tenMin();
        if (S.idleOn && idle >= IDLE[0] && !S.modal && now - S.idleChatT > (api.selftest ? 3500 : 30000)) { S.idleChatT = now; sayL('idleChat', null, { mood: 'neutral', priority: 0 }); }
        if (S.tickN % 4 === 2) rareRoll();
        if (S.tickN % 32 === 0) { const i = api.randInt(0, E.tiles.length - 1); if (E.tiles[i].lab.textContent === VITALS[i]) E.tiles[i].cap.textContent = api.pick(LN.caps); }
      }
      api.on(document, 'keydown', onKey); api.on(document, 'keyup', onKeyUp); api.on(document, 'pointerdown', onPtrDown); api.on(document, 'pointermove', onPtrMove);
      api.on(document, 'pointerup', onPtrUp); api.on(document, 'pointercancel', onPtrUp); api.on(document, 'visibilitychange', onVis); api.on(window, 'resize', onResize);
      api.on(window, 'blur', function () { endHold(); }); tline(['Hunger 100 -> 100 (change: awaiting care)']); paintNames();
      paintStatus(); paintGoal(); paintPats(); paintDay(); paintMoss(); paintSel(); paintFlag(); paintProg(); vis(E.shades, S.loops % 5 === 3); if (S.loops > 0) {
        S.T = 90; S.accepted = true; E.reissue.hidden = false; S.walkDone = true; S.graduated = true; S.rank = 5; S.dayAgain = true; S.target = 100 + S.loops + 1;
        ['walk', 'support', 'diary', 'tuck', 'toast', 'gravel', 'gerald', 'ask'].forEach(function (k) { S.u[k] = true; });
        showVitals(9); hardcoreOn(); S.hasPebble = true; E.pebble.hidden = false; E.pneed.hidden = false; paintRank(); startDiary(); paintDay();
        api.setTitle('Pet Rock: Hardcore Mode' + (S.name !== 'Clive' ? ' (' + S.name + ')' : '')); say(LN.grad[8], { mood: 'proud', priority: 1 });
      } else say(LN.X.welcome, { mood: 'neutral', priority: 1 }); refreshLocks(); refreshDiaryVis(); kick(); api.setInterval(tick, 250); api.flag.set('pet-rock.met', true);
      return { destroy() { try { if (S.graduated && S.loops > 0) say(LN.X.comeback, { mood: 'proud', priority: 1 }); persist(); } catch (e) { /* ok */ } } }; }
  }); })();
