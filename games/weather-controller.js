/* POINTLESS module: weather-controller */
/* The Meteorological Command Console, Mk. 7 1/2. Every dashed ring shows what the sky is really doing; a man on television says that was him. (Code calls the rings "ghosts"; players only ever see "ring".) */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const ID = 'weather-controller';
  P.injectCSS(`
.m-weather-controller-app{--ink:#2b2118;--cream:#fbf3df;--mint:#7fd9b0;--cor:#ff7a6b;--mus:#f2b933;--lil:#b79cf2;--tw:30px;position:relative;display:flex;flex-direction:column;gap:10px;padding:10px;color:var(--ink);font:600 14px/1.35 ui-rounded,'Trebuchet MS',system-ui,sans-serif;background:var(--cream) radial-gradient(rgba(43,33,24,.15) 1px,transparent 1.5px) 0 0/14px 14px;min-height:420px;box-sizing:border-box;overflow:hidden}
.m-weather-controller-app *{box-sizing:border-box} .m-weather-controller-app button{font:inherit;color:inherit;cursor:pointer} .m-weather-controller-app [hidden]{display:none!important}
.m-weather-controller-app :focus-visible{outline:3px solid #6a4bd1;outline-offset:2px} .m-weather-controller-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (pointer:coarse){.m-weather-controller-app{--tw:44px}.m-weather-controller-btn,.m-weather-controller-form select,.m-weather-controller-form input{min-height:44px}.m-weather-controller-knob{width:44px;height:36px;margin-left:-22px}}
@media (min-width:720px){.m-weather-controller-app{padding-bottom:150px}}
.m-weather-controller-top{display:flex;flex-direction:column;gap:10px} @media (max-width:979px){.m-weather-controller-top,.m-weather-controller-left{display:contents}} @media (min-width:980px){.m-weather-controller-top{flex-direction:row;align-items:flex-start}.m-weather-controller-side{flex:1 1 0;min-width:230px}.m-weather-controller-side .m-weather-controller-nothing{width:100px;font-size:16px;border-width:3px}}
.m-weather-controller-aux{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:center} .m-weather-controller-side .m-weather-controller-pip{position:relative;left:auto;bottom:auto;flex:0 1 170px;width:170px;max-width:100%}
.m-weather-controller-crawl{position:absolute;left:0;right:0;bottom:0;height:20px;z-index:3;background:var(--ink);color:#fff;overflow:hidden;white-space:nowrap;font:800 11px/20px ui-monospace,Consolas,monospace;letter-spacing:.04em;pointer-events:none} .m-weather-controller-crawl b{display:inline-block;padding-left:100%;animation:m-weather-controller-crawl 16s linear forwards;color:#ffd84a;font-weight:800} @keyframes m-weather-controller-crawl{to{transform:translateX(-100%)}} .m-weather-controller-sky.m-weather-controller-crawling .m-weather-controller-gotlab{bottom:26px}
.m-weather-controller-hw{position:absolute;left:0;top:0;width:100%;height:100%;z-index:5;pointer-events:none;background:#fff;transition:opacity .4s} .m-weather-controller-hw canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
.m-weather-controller-rq{position:absolute;left:50%;top:10px;transform:translateX(-50%) rotate(-1.5deg);z-index:6;width:min(92%,300px);padding:6px 10px 8px;background:#fffdf4;border:3px solid var(--ink);border-radius:6px;box-shadow:3px 3px 0 var(--ink);text-align:center;animation:m-weather-controller-slide .3s ease-out} .m-weather-controller-rq b{display:block;font:900 15px Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.06em} .m-weather-controller-rq .m-weather-controller-btn{margin:4px 3px 0;padding:3px 10px;min-height:34px} .m-weather-controller-rq small{display:block;font:italic 700 10px Georgia,serif}
.m-weather-controller-ghost.m-weather-controller-tag::after{content:'\\2190  this is the weather';position:absolute;left:calc(100% + 6px);top:50%;transform:translateY(-50%);white-space:nowrap;background:var(--ink);color:#fff;font:800 10px/1.4 system-ui,sans-serif;padding:0 6px;border-radius:9px} .m-weather-controller-ghost.m-weather-controller-tag.m-weather-controller-tagl::after{content:'this is the weather  \\2192';left:auto;right:calc(100% + 6px)}
.m-weather-controller-mover{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
.m-weather-controller-gotlab{position:absolute;right:8px;bottom:6px;z-index:2;pointer-events:none;background:var(--ink);color:#fff;font:900 clamp(7px,1.1vw,10px)/1.4 system-ui,sans-serif;letter-spacing:.06em;padding:0 5px;border-radius:3px}
.m-weather-controller-jarw.m-weather-controller-shake .m-weather-controller-jar{animation:m-weather-controller-jshake .1s linear infinite alternate} @keyframes m-weather-controller-jshake{from{transform:translate(-3px,1px) rotate(-4deg)}to{transform:translate(3px,-1px) rotate(4deg)}}
.m-weather-controller-sky{position:relative;width:100%;aspect-ratio:16/9;max-height:46vh;min-height:200px;overflow:hidden;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);background:#bfe6f5;user-select:none;-webkit-user-select:none} @media (min-width:980px){.m-weather-controller-left{display:flex;flex-direction:column;gap:10px;flex:2.1 1 0;min-width:0}.m-weather-controller-sky{flex:none;aspect-ratio:21/9;max-height:31vh}.m-weather-controller-lower{display:flex;gap:10px;align-items:flex-start}.m-weather-controller-lower>*{flex:1 1 0;min-width:0}}
.m-weather-controller-sky.m-weather-controller-frost{box-shadow:4px 4px 0 var(--ink),inset 0 0 26px 8px rgba(255,255,255,.85)} .m-weather-controller-sky.m-weather-controller-heat{box-shadow:4px 4px 0 var(--ink),inset 0 0 30px 6px rgba(255,140,60,.45)}
.m-weather-controller-cv{position:absolute;left:0;top:0;width:100%;height:100%;display:block} .m-weather-controller-cv.m-weather-controller-wob{animation:m-weather-controller-wob .45s ease-in-out infinite} .m-weather-controller-cv.m-weather-controller-shim{animation:m-weather-controller-shim .35s ease-in-out infinite alternate}
@keyframes m-weather-controller-wob{0%,100%{transform:skewX(0) scale(1)}25%{transform:skewX(2.5deg) scale(1.02,.98)}75%{transform:skewX(-2.5deg) scale(.98,1.02)}} @keyframes m-weather-controller-shim{from{transform:translateY(0)}to{transform:translateY(.7px)}}
.m-weather-controller-pip{position:absolute;left:8px;bottom:8px;width:26%;aspect-ratio:16/9;border:2px dashed var(--ink);border-radius:8px;overflow:hidden;background:#fff;z-index:2;pointer-events:none}
.m-weather-controller-pipcv{position:absolute;left:0;top:0;width:100%;height:100%;display:block} .m-weather-controller-piplab{position:absolute;left:0;top:0;right:0;z-index:1;font:900 clamp(7px,1.1vw,10px)/1.4 system-ui,sans-serif;letter-spacing:.06em;text-align:center;background:rgba(255,255,255,.8);padding:0 2px}
.m-weather-controller-bubble{position:absolute;right:10px;top:10px;max-width:58%;padding:6px 12px;background:#fff;border:3px solid var(--ink);border-radius:18px 18px 4px 18px;box-shadow:3px 3px 0 var(--ink);font:900 clamp(14px,2.6vw,24px)/1.1 Impact,'Arial Black',system-ui,sans-serif;text-transform:uppercase;z-index:3;pointer-events:none;animation:m-weather-controller-pop .25s ease-out}
@keyframes m-weather-controller-pop{from{transform:scale(.4) rotate(-6deg);opacity:0}to{transform:none;opacity:1}}
.m-weather-controller-note{position:absolute;left:8px;top:8px;max-width:38%;padding:5px 9px 6px;background:var(--lil);border:2px solid var(--ink);box-shadow:2px 2px 0 var(--ink);transform:rotate(-2deg);font:italic 800 12px/1.2 Georgia,serif;z-index:2;pointer-events:none}
.m-weather-controller-note small{display:block;font:700 9px system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;opacity:.75} .m-weather-controller-note.m-weather-controller-flip{animation:m-weather-controller-flip .4s ease-out} @keyframes m-weather-controller-flip{from{transform:rotate(-2deg) rotateX(90deg)}to{transform:rotate(-2deg)}}
.m-weather-controller-fxo{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:4;overflow:hidden} .m-weather-controller-tint{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;transition:opacity .2s}
.m-weather-controller-sockstamp{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%) rotate(-8deg);border:4px solid #d4352a;color:#d4352a;border-radius:8px;padding:0 10px;font:900 clamp(14px,2.4vw,22px) Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.08em;animation:m-weather-controller-thunk .3s ease-out;background:rgba(255,255,255,.6)}
@keyframes m-weather-controller-thunk{from{transform:translate(-50%,-50%) rotate(-8deg) scale(2.4);opacity:0}to{transform:translate(-50%,-50%) rotate(-8deg) scale(1);opacity:1}}
.m-weather-controller-side{display:flex;flex-direction:column;gap:10px;min-width:0}
.m-weather-controller-tv{position:relative;display:grid;grid-template-columns:96px minmax(0,1fr);gap:8px;align-items:end;background:var(--lil);border:3px solid var(--ink);border-radius:16px;box-shadow:4px 4px 0 var(--ink);padding:8px;z-index:1;overflow:visible}
.m-weather-controller-tv.m-weather-controller-burst{z-index:7} .m-weather-controller-figbtn{position:relative;display:block;width:96px;height:96px;padding:0;border:3px solid var(--ink);border-radius:10px;background:repeating-linear-gradient(0deg,rgba(0,0,0,.09) 0 2px,transparent 2px 4px),linear-gradient(#bfe6f5,#f4f1ea);overflow:visible;transform:scale(var(--ego,1));transform-origin:0 0;transition:transform .5s cubic-bezier(.3,1.6,.5,1)}
.m-weather-controller-figbtn:active{filter:brightness(.95)} .m-weather-controller-cliff{width:100%;height:100%;display:block;overflow:visible} .m-weather-controller-face,.m-weather-controller-acc{display:none} .m-weather-controller-face.m-weather-controller-on{display:block}
.m-weather-controller-tv.m-weather-controller-mug .m-weather-controller-amug,.m-weather-controller-tv.m-weather-controller-plaque .m-weather-controller-aplq,.m-weather-controller-tv.m-weather-controller-monitor .m-weather-controller-amon,.m-weather-controller-tv.m-weather-controller-brace .m-weather-controller-abrace{display:block}
.m-weather-controller-arm{transform-origin:80px 92px;transition:transform .3s} .m-weather-controller-tv.m-weather-controller-point .m-weather-controller-arm{transform:rotate(-24deg)} .m-weather-controller-blinkx .m-weather-controller-figbtn{filter:saturate(.7)}
.m-weather-controller-chy{min-width:0;display:flex;flex-direction:column;gap:3px;margin-left:calc((var(--ego,1) - 1)*96px);transition:margin-left .5s} @media (min-width:980px){.m-weather-controller-figbtn{transform-origin:100% 0}.m-weather-controller-chy{margin-left:0}} .m-weather-controller-chyt{background:var(--ink);color:#fff;font:800 9px/1.3 system-ui,sans-serif;letter-spacing:.05em;padding:2px 6px;border-radius:4px}
.m-weather-controller-chys{margin:0;min-height:3.9em;background:#fff;border:2px solid var(--ink);border-radius:8px;padding:4px 7px;font:italic 700 13px/1.3 Georgia,serif;overflow-wrap:anywhere} .m-weather-controller-chys.m-weather-controller-strike{text-decoration:line-through;color:#8a8a8a;transition:color .5s}
.m-weather-controller-chyu{font:700 10px/1.2 ui-monospace,Consolas,monospace;opacity:.8} .m-weather-controller-ego{height:7px;border:2px solid var(--ink);border-radius:5px;background:#fff;overflow:hidden} .m-weather-controller-egof{height:100%;width:0;background:var(--cor);transition:width .4s}
.m-weather-controller-diary,.m-weather-controller-ledger{background:#fffaf0;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);padding:6px 10px;font-size:12px} .m-weather-controller-diary summary,.m-weather-controller-ledger summary{cursor:pointer;font:800 12px system-ui,sans-serif;letter-spacing:.05em;text-transform:uppercase}
.m-weather-controller-diary ol{margin:6px 0 2px;padding:0;list-style:none;font:italic 700 12px Georgia,serif} .m-weather-controller-diary li{padding:1px 0;border-bottom:1px dotted rgba(43,33,24,.4)} .m-weather-controller-diary li:first-child{font-weight:900}
.m-weather-controller-lsvg{width:100%;max-height:120px;display:block} .m-weather-controller-ln{opacity:.25;transition:opacity .4s} .m-weather-controller-ln.m-weather-controller-lit{opacity:1}
.m-weather-controller-hint{margin:0;text-align:center;font-weight:800;font-size:13px;padding:0 4px;white-space:pre-line}
.m-weather-controller-console{position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:14px;background:#fffaf0;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);padding:28px 14px 12px;transition:filter .3s,transform .3s}
@media (min-width:720px){.m-weather-controller-console{grid-template-columns:minmax(0,1.5fr) minmax(0,.9fr) minmax(0,1.1fr)}}
.m-weather-controller-console.m-weather-controller-grey{filter:grayscale(.9) brightness(.9)} .m-weather-controller-console.m-weather-controller-indoor{transform:rotate(.6deg)} .m-weather-controller-console.m-weather-controller-indoor .m-weather-controller-row{transform:rotate(-2deg)}
.m-weather-controller-col{display:flex;flex-direction:column;gap:8px;min-width:0}
.m-weather-controller-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 8px;align-items:end;padding:2px 0 16px} .m-weather-controller-lab{font:900 13px system-ui,sans-serif;letter-spacing:.04em;min-width:0;overflow-wrap:anywhere} .m-weather-controller-ro{font:italic 700 12px Georgia,serif;text-align:right}
.m-weather-controller-trk{position:relative;grid-column:1/3;height:var(--tw)} .m-weather-controller-in{position:absolute;left:0;top:0;width:100%;height:var(--tw);margin:0;padding:0;background:transparent;-webkit-appearance:none;appearance:none;touch-action:none;cursor:pointer}
.m-weather-controller-in::-webkit-slider-runnable-track{height:14px;border-radius:7px;border:2px solid var(--ink);background:repeating-linear-gradient(90deg,transparent 0 calc(100%/30 - 1px),rgba(43,33,24,.35) calc(100%/30 - 1px) calc(100%/30)),var(--mint)}
.m-weather-controller-in::-moz-range-track{height:10px;border-radius:7px;border:2px solid var(--ink);background:repeating-linear-gradient(90deg,transparent 0 calc(100%/30 - 1px),rgba(43,33,24,.35) calc(100%/30 - 1px) calc(100%/30)),var(--mint)}
.m-weather-controller-in::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:var(--tw);height:var(--tw);margin-top:calc((10px - var(--tw))/2);border-radius:50%;background:var(--cor);border:3px solid var(--ink);box-shadow:2px 2px 0 var(--ink)}
.m-weather-controller-in::-moz-range-thumb{width:calc(var(--tw) - 6px);height:calc(var(--tw) - 6px);border-radius:50%;background:var(--cor);border:3px solid var(--ink);box-shadow:2px 2px 0 var(--ink)} .m-weather-controller-in:disabled{opacity:.7;cursor:not-allowed}
.m-weather-controller-occ .m-weather-controller-in{pointer-events:none;animation:m-weather-controller-wig .3s ease-in-out infinite alternate} .m-weather-controller-occ .m-weather-controller-lab{color:#b0301f} @keyframes m-weather-controller-wig{from{transform:translateX(-2px)}to{transform:translateX(2px)}}
.m-weather-controller-ghost{position:absolute;top:50%;left:calc(var(--tw)/2 + (100% - var(--tw))*var(--g,.5));width:calc(var(--tw)*.95);height:calc(var(--tw)*.95);transform:translate(-50%,-50%);border:2px dashed var(--ink);border-radius:50%;background:rgba(255,255,255,.4);opacity:.88;pointer-events:none;transition:left .25s;z-index:2;display:flex;align-items:center;justify-content:center}
.m-weather-controller-ghost svg{width:70%;height:70%} .m-weather-controller-ghost.m-weather-controller-hop{transition:none;animation:m-weather-controller-hop .28s ease-out} .m-weather-controller-solid .m-weather-controller-ghost{border-style:solid;background:rgba(127,217,176,.5)}
@keyframes m-weather-controller-hop{0%{transform:translate(-50%,-50%) scale(1.6,.5)}40%{transform:translate(-50%,-90%) scale(.7,1.4)}100%{transform:translate(-50%,-50%) scale(1)}}
.m-weather-controller-ticks{position:absolute;left:0;right:0;bottom:0;height:14px;font:700 11px system-ui,sans-serif;pointer-events:none} .m-weather-controller-ticks span{position:absolute;bottom:0;transform:translateX(-50%)} .m-weather-controller-ticks span:nth-child(2){font-size:12px;font-weight:900}
.m-weather-controller-sunnote{position:absolute;left:62px;top:-30px;max-width:155px;padding:3px 8px;background:#fff0a0;border:2px solid var(--ink);box-shadow:2px 2px 0 var(--ink);transform:rotate(3deg);font:italic 700 10px/1.2 Georgia,serif;z-index:3;pointer-events:none}
.m-weather-controller-dial{width:min(100%,150px);aspect-ratio:1;display:block;margin:0 auto;touch-action:none;cursor:grab;border-radius:50%} .m-weather-controller-dial:active{cursor:grabbing} .m-weather-controller-dword{text-align:center;font:900 15px Georgia,serif;min-height:1.3em} .m-weather-controller-laps{text-align:center;font:italic 700 11px Georgia,serif} .m-weather-controller-lvw{display:flex;gap:10px;align-items:center;justify-content:center}
.m-weather-controller-lever{position:relative;width:34px;height:130px;flex:none;border:3px solid var(--ink);border-radius:17px;background:linear-gradient(90deg,#fff,#e9e1c9);touch-action:none} .m-weather-controller-knob{position:absolute;left:50%;top:calc(var(--d,0)*(100% - 30px));width:36px;height:30px;margin:0 0 0 -18px;padding:0;border:3px solid var(--ink);border-radius:12px;background:var(--mus);box-shadow:2px 2px 0 var(--ink);touch-action:none;cursor:grab}
.m-weather-controller-knob.m-weather-controller-spring{transition:top .45s cubic-bezier(.3,1.9,.5,1)} .m-weather-controller-lghost{position:absolute;left:50%;top:calc(var(--g,0)*(100% - 22px) + 11px);width:20px;height:20px;margin:-10px 0 0 -10px;border:2px dashed var(--ink);border-radius:50%;pointer-events:none;transition:top .25s}
.m-weather-controller-lvt{font:800 11px system-ui,sans-serif;max-width:80px} .m-weather-controller-jarw{display:flex;gap:10px;align-items:center}
.m-weather-controller-jar{position:relative;width:78px;height:92px;flex:none;border:3px solid var(--ink);border-radius:12px 12px 28px 28px;background:rgba(255,255,255,.5);overflow:hidden;display:flex;flex-wrap:wrap;align-content:flex-end;justify-content:center;padding:2px;font-size:16px;line-height:1}
.m-weather-controller-jar::before{content:'';position:absolute;left:8px;top:8px;width:7px;height:50%;border-radius:4px;background:rgba(255,255,255,.85)} .m-weather-controller-jar span{display:inline-block;animation:m-weather-controller-tumble 2.4s ease-in-out infinite alternate} @keyframes m-weather-controller-tumble{from{transform:rotate(-12deg)}to{transform:rotate(12deg) translateY(-2px)}}
.m-weather-controller-jlab{font:italic 700 12px Georgia,serif} .m-weather-controller-nothing{align-self:center;width:min(100%,160px);aspect-ratio:1;border-radius:50%;background:var(--cor);border:4px solid var(--ink);box-shadow:0 7px 0 #8a2d22,5px 7px 0 var(--ink);color:#fff;text-shadow:0 2px 0 var(--ink);font:900 26px/1.05 Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.04em;transition:transform .06s,box-shadow .06s}
.m-weather-controller-nothing:active{transform:translateY(6px);box-shadow:0 1px 0 #8a2d22,5px 1px 0 var(--ink)} .m-weather-controller-btn{background:#fff;border:3px solid var(--ink);border-radius:10px;padding:6px 12px;font-weight:800;box-shadow:3px 3px 0 var(--ink)} .m-weather-controller-btn:active{transform:translate(3px,3px);box-shadow:none} .m-weather-controller-s2{background:var(--mint)}
.m-weather-controller-tray{display:flex;flex-direction:column;gap:4px;min-height:24px} .m-weather-controller-slip{position:relative;padding:4px 8px 4px 16px;background:#fffdf4;border:2px solid var(--ink);border-radius:4px;font:italic 700 11px/1.3 Georgia,serif;overflow-wrap:anywhere;animation:m-weather-controller-slide .35s ease-out;background-image:radial-gradient(circle at 5px 50%,var(--cream) 2.5px,transparent 3px);background-size:100% 10px;background-repeat:repeat-y}
.m-weather-controller-slip b{display:block;font:900 9px system-ui,sans-serif;letter-spacing:.1em;color:#b0301f} .m-weather-controller-slip i{display:block;text-align:right;font-weight:400} .m-weather-controller-console.m-weather-controller-indoor .m-weather-controller-slip{filter:blur(1.5px)} @keyframes m-weather-controller-slide{from{transform:translateX(-30px);opacity:0}to{transform:none;opacity:1}}
.m-weather-controller-form{position:relative;display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;padding:16px 10px 8px;background:#fffdf4;border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink);animation:m-weather-controller-slide .3s ease-out} .m-weather-controller-form::before{content:'';position:absolute;left:50%;top:-9px;width:44px;height:12px;margin-left:-22px;background:#8b8f99;border:2px solid var(--ink);border-radius:4px}
.m-weather-controller-form label{display:flex;flex-direction:column;font-size:11px;font-weight:800;gap:1px;flex:1 1 130px;min-width:0} .m-weather-controller-form select,.m-weather-controller-form input{font:inherit;font-size:13px;padding:5px 6px;border:2px solid var(--ink);border-radius:6px;background:#fff;color:var(--ink);min-width:0}
.m-weather-controller-stamp{position:absolute;left:50%;top:50%;width:92%;text-align:center;transform:translate(-50%,-50%) rotate(-9deg);border:4px solid #d4352a;color:#d4352a;border-radius:8px;padding:4px 8px;background:rgba(255,253,244,.88);font:900 15px/1.15 Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.04em;text-shadow:0 0 4px rgba(212,53,42,.5);animation:m-weather-controller-thunk .25s ease-out;pointer-events:none;z-index:2;overflow-wrap:anywhere}
.m-weather-controller-led{display:flex;flex-wrap:wrap;gap:4px 16px;align-items:center;background:#241b14;color:#7fffbf;border:3px solid var(--ink);border-radius:10px;padding:6px 12px;font:700 12px ui-monospace,Consolas,monospace} .m-weather-controller-led span.m-weather-controller-flash{color:#fff;background:#1f9d68;border-radius:4px;padding:0 4px;font-weight:900}
.m-weather-controller-veil{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:6;opacity:0;transition:opacity .6s;display:flex;align-items:center;justify-content:center} .m-weather-controller-veil.m-weather-controller-onhold{opacity:1;background:rgba(43,33,24,.14)} .m-weather-controller-veil.m-weather-controller-fog{background:rgba(244,241,234,.93);opacity:1} .m-weather-controller-veil.m-weather-controller-nap{background:rgba(255,120,100,.28);opacity:1}
.m-weather-controller-veil.m-weather-controller-rainin{opacity:1;background-image:linear-gradient(100deg,transparent 0 46%,rgba(80,120,160,.45) 47% 50%,transparent 51%);background-size:18px 26px;animation:m-weather-controller-rainin .5s linear infinite} @keyframes m-weather-controller-rainin{to{background-position:-18px 26px}}
.m-weather-controller-hold{background:#fff;border:4px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink);padding:10px 20px;text-align:center;font:900 28px Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.06em} .m-weather-controller-hold small{display:block;font:700 13px Georgia,serif;letter-spacing:0}
.m-weather-controller-flies{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:8;overflow:hidden} .m-weather-controller-fly{position:absolute;left:0;top:0;width:48px;height:48px;margin:-24px 0 0 -24px;padding:0;border:0;background:transparent;font-size:30px;line-height:1;pointer-events:auto;will-change:transform;text-align:center}
.m-weather-controller-fly.m-weather-controller-big{font-size:58px;width:72px;height:72px;margin:-36px 0 0 -36px} .m-weather-controller-fly.m-weather-controller-big::after{content:'';position:absolute;left:55%;top:30%;width:14px;height:14px;border:2px solid var(--ink);border-radius:50%} .m-weather-controller-fly.m-weather-controller-glow{filter:drop-shadow(0 0 8px #fff7a8) drop-shadow(0 0 14px #ffd84a)}
.m-weather-controller-wing{display:inline-block;animation:m-weather-controller-flap .09s linear infinite alternate} .m-weather-controller-fly.m-weather-controller-landed .m-weather-controller-wing{animation-duration:.5s} @keyframes m-weather-controller-flap{from{transform:scaleX(1)}to{transform:scaleX(.2)}}
.m-weather-controller-fly.m-weather-controller-landed::after{content:'Click to shoo.';position:absolute;left:50%;top:-6px;transform:translateX(-50%);white-space:nowrap;font:italic 700 10px Georgia,serif;background:#fff;border:1px solid var(--ink);border-radius:4px;padding:0 4px}
.m-weather-controller-net{position:absolute;left:0;top:0;font-size:36px;opacity:0;pointer-events:none;margin:-18px 0 0 -18px} .m-weather-controller-net.m-weather-controller-swing{animation:m-weather-controller-swing .32s ease-in-out} @keyframes m-weather-controller-swing{0%{opacity:1;transform:rotate(-70deg) scale(.8)}60%{opacity:1;transform:rotate(40deg) scale(1.2)}100%{opacity:0;transform:rotate(60deg) scale(1)}}
.m-weather-controller-rc{position:absolute;left:0;top:0;font-size:46px;pointer-events:none;margin:-23px 0 0 -23px;filter:grayscale(.6);animation:m-weather-controller-bob 1.6s ease-in-out infinite alternate} @keyframes m-weather-controller-bob{from{transform:translateY(0)}to{transform:translateY(-6px)}}
.m-weather-controller-cert{position:absolute;left:0;top:0;width:100%;height:100%;z-index:9;display:flex;align-items:center;justify-content:center;padding:12px;background:rgba(43,33,24,.5);transition:opacity .5s} .m-weather-controller-cert.m-weather-controller-out{opacity:0}
.m-weather-controller-paper{width:min(100%,520px);max-height:100%;overflow:auto;background:#fffdf4;border:3px double var(--ink);outline:3px solid var(--ink);outline-offset:3px;border-radius:6px;padding:18px 16px 14px;text-align:center;box-shadow:6px 6px 0 var(--ink);animation:m-weather-controller-drop .6s cubic-bezier(.3,1.4,.5,1)} .m-weather-controller-cert.m-weather-controller-out .m-weather-controller-paper{transform:translateY(-130%);transition:transform .5s ease-in}
@keyframes m-weather-controller-drop{from{transform:translateY(-130%)}to{transform:none}} .m-weather-controller-paper h3{margin:0 0 8px;font:900 17px/1.2 Georgia,serif;letter-spacing:.04em} .m-weather-controller-paper p{margin:6px 0;font:italic 14px/1.35 Georgia,serif} .m-weather-controller-sig{font:italic 900 22px Georgia,serif;color:#2a4a8a} .m-weather-controller-paper .m-weather-controller-notes p{margin:3px 0;font-size:12px;color:#5a4a3a;animation:m-weather-controller-slide .35s ease-out}
@media (max-width:480px){.m-weather-controller-chy{margin-left:calc((min(var(--ego,1),1.35) - 1)*64px)}.m-weather-controller-app{--tw:44px;padding:8px}.m-weather-controller-tv{grid-template-columns:64px minmax(0,1fr)}.m-weather-controller-figbtn{width:64px;height:64px;transform:scale(min(var(--ego,1),1.35))}.m-weather-controller-ego,.m-weather-controller-chyu{display:none}.m-weather-controller-chys{min-height:2.7em;font-size:12px}.m-weather-controller-sky{max-height:30vh;min-height:150px;z-index:5;will-change:transform}.m-weather-controller-pip{left:auto;right:8px;width:72px}.m-weather-controller-sky.m-weather-controller-crawling .m-weather-controller-pip{bottom:26px}.m-weather-controller-gotlab,.m-weather-controller-sky.m-weather-controller-crawling .m-weather-controller-gotlab{bottom:auto;top:6px}.m-weather-controller-crawl{font-size:10px;height:18px;line-height:18px}.m-weather-controller-piplab{display:none}.m-weather-controller-nothing{width:120px;font-size:20px}.m-weather-controller-note{max-width:50%;font-size:11px}.m-weather-controller-note small{display:none}.m-weather-controller-sunnote{position:static;grid-column:1/3;justify-self:start;transform:rotate(-1deg);max-width:none;font-size:10px;margin-top:2px}.m-weather-controller-ro{font-size:11px}.m-weather-controller-ghost{width:calc(var(--tw)*.7);height:calc(var(--tw)*.7)}}
@media (max-width:979px){.m-weather-controller-pip{left:auto;right:8px}.m-weather-controller-sky.m-weather-controller-crawling .m-weather-controller-pip{bottom:28px}.m-weather-controller-gotlab,.m-weather-controller-sky.m-weather-controller-crawling .m-weather-controller-gotlab{bottom:auto;top:6px}}
@media (max-width:719px){.m-weather-controller-console{gap:6px}.m-weather-controller-col{display:contents}.m-weather-controller-col:nth-child(2)>*{order:2}.m-weather-controller-col:nth-child(3)>*{order:3}.m-weather-controller-col:nth-child(3)>.m-weather-controller-mover{order:1}}
.m-weather-controller-phone{display:flex;gap:8px;align-items:center;text-align:left;background:var(--mint);border:3px solid var(--ink);border-radius:10px;padding:6px 10px;font-weight:900;font-size:12px;letter-spacing:.03em;box-shadow:3px 3px 0 var(--ink);animation:m-weather-controller-ring .45s ease-in-out infinite alternate}
.m-weather-controller-phone b{font-size:22px;line-height:1} .m-weather-controller-phone:active{transform:translate(3px,3px);box-shadow:none;animation:none} @keyframes m-weather-controller-ring{from{transform:rotate(-2.5deg)}to{transform:rotate(2.5deg) translateY(-1px)}}
@media (prefers-reduced-motion:reduce){.m-weather-controller-phone,.m-weather-controller-wing,.m-weather-controller-cv,.m-weather-controller-jar span,.m-weather-controller-rc,.m-weather-controller-veil{animation:none!important}.m-weather-controller-ghost,.m-weather-controller-figbtn,.m-weather-controller-knob,.m-weather-controller-bubble,.m-weather-controller-note,.m-weather-controller-slip,.m-weather-controller-stamp,.m-weather-controller-paper,.m-weather-controller-net{animation:none!important;transition:none!important}}
`, 'css-weather-controller');

  P.addAchievements([
    { id: 'weather-controller.first-move', name: 'Supreme Archon of Atmospheric Intent', desc: 'Move a slider. The sky has noted that you are the sort of person who moves sliders.', icon: '🎚️', reward: 2 },
    { id: 'weather-controller.first-catch', name: 'Grand Lepidopterist-in-Chief of the Realm', desc: 'Catch your first butterfly. It was Pamela. Pamela had a family and a Tuesday.', icon: '🦋', reward: 3 },
    { id: 'weather-controller.alignment', name: 'Obeyed Once, Briefly, By Accident', desc: 'Release a slider exactly where Weather happened to be. 0.6 seconds of dominion, no refunds.', icon: '🎯', reward: 4 },
    { id: 'weather-controller.co-author', name: "Co-Author of Clifford Isobar's Entire Life's Work", desc: 'Dispute Clifford\'s credit 10 times. He has put you down as a contributing editor.', icon: '📺', reward: 5 },
    { id: 'weather-controller.nothing', name: 'Management Approves Of Nothing', desc: 'Press DO NOTHING three times in a row. The certificate is blank, which is the point.', icon: '🔴', reward: 3 },
    { id: 'weather-controller.elsewhere', name: 'Resident of Elsewhere (Visiting)', desc: 'Reach Elsewhere, where the sliders work and nobody is home.', icon: '🌾', reward: 8 },
    { id: 'weather-controller.ceremony', name: 'Weather Controller of the Year (Provisional)', desc: 'Receive the Certificate of Dominion. Countersignature pending. Weather is out.', icon: '🏆', reward: 10 },
    { id: 'weather-controller.seven-and-a-half', name: 'Warden of the Perfect Seven-and-a-Half', desc: 'SECRET: Put every slider and the dial at exactly 7.5 at the same time. The weather tipped its cloud at you.', icon: '🎩', secret: true, reward: 7.5 },
    { id: 'weather-controller.listening', name: 'Patron Saint of the Unwatched Sky', desc: 'SECRET: Do nothing for 45 seconds and discover that Weather was perfectly well-behaved the whole time you were not looking.', icon: '🌤️', secret: true, reward: 10 },
    { id: 'weather-controller.whiplash', name: 'Whiplash Laureate', desc: 'SECRET: Spam the controls until Weather puts you on hold. Clifford got a neck brace and credit. You got a queue number.', icon: '⛈️', secret: true, reward: 7.5 },
    { id: 'weather-controller.fog', name: 'Chief Fog Controller (Briefly Corrected)', desc: 'SECRET: Hold the Fog lever for 10 seconds. The title bar made a mistake and fixed it.', icon: '🌫️', secret: true, reward: 7.5 },
    { id: 'weather-controller.gordon3', name: "Keeper of Gordon III's Apology", desc: 'SECRET: Meet Gordon III. He is terribly sorry about the weather. Do not tell Clifford.', icon: '🧦', secret: true, reward: 10 },
    { id: 'weather-controller.single-drop', name: "Witness to One Drop, Colin's Counsel", desc: 'SECRET: Be present when it rained on Colin. It was the best day of his life.', icon: '☂️', secret: true, reward: 7.5 },
    { id: 'weather-controller.restraining', name: 'Cloudy With A Chance Of Restraining Order', desc: 'SECRET: Press DO NOTHING until the weather asks for space, and a snack.', icon: '🌥️', secret: true, reward: 5 },
    { id: 'weather-controller.eye-contact', name: 'Honorary Dry Person of the Realm', desc: 'SECRET: Poke Colin seven times (click him, or press K). He turns around and looks at you. Nobody has, and he was dry throughout.', icon: '👀', secret: true, reward: 12 },
    { id: 'weather-controller.colin-line', name: 'Confidant of Colin (Umbrella)', desc: 'SECRET: Take seven viewer calls on the Phone-In. The seventh caller is Colin. He says nothing, dryly, and means all of it.', icon: '📞', secret: true, reward: 12 },
    { id: 'weather-controller.restraint', name: 'Excellent Restraint, Applauded By A Sky', desc: 'SECRET: Answer NO to "Rain on Colin?" The sky applauded. Colin was not consulted and was fine.', icon: '👏', secret: true, reward: 7.5 }
  ]);

  /* ---------- the script. Line prefix p| s| c| x| d| t| = proud smug confused panic disappointed tired; none = neutral ---------- */
  const LN = (g, a) => P.addLines('m:weather-controller:' + g, a);
  LN('sun', [`c|You have moved the sun. The sun has noted this and moved itself, with confidence.`, `Sun requested. The sun has asked who is asking.`, `You set the sun to <n>. The sun set itself to <a>. You were both sincere, and it is on file.`,
    `The sun has described the gap between <n> and <a> as "a scheduling matter." It did not say whose.`, `Sun request logged under "Optimism, Unfunded."`, `The sun has forwarded your input to the moon, who is off until six.`,
    `c|The sun has been asked to be brighter before. It keeps a folder. The folder is thick and is mostly the same request.`, `The sun read your request twice, once as a request and once as a threat, and replied to the threat.`,
    `Sun set to <n>. The sun has gone to <a>. It would like you to know this is "a direction, not a decision."`]);
  LN('rain', [`Rain has been requested. A small cloud has taken it personally.`, `You have asked for rain. The weather has issued a statement: "Rain is for people who ask politely."`, `Rain set. The ground has not replied. The ground never replies. It just gets wet.`,
    `Rain is at <a>. You asked for <n>. The rain would like to be called "precipitation, in a personal capacity."`, `A raindrop has read your request and decided to fall somewhere that was not named.`, `Rain approved for Thursday. It is not Thursday. Thursday has asked for it in writing.`,
    `The ground has filed a counter-request for rain at a time of its choosing, in writing, after lunch.`]);
  LN('wind', [`You have moved the Wind slider. Somewhere, a hat has accepted its fate.`, `Wind requested at <n> out of 15. Wind is at <a> and has no comment.`, `You moved the wind. A sock somewhere has begun its journey.`,
    `The wind has been asked to blow left. It only goes left on weekdays, and only when nobody asks.`, `Wind set to <n>. A scarf is preparing. The scarf has not packed, and has never packed.`, `A hat is now a civil matter. Management is not involved. Management is drafting a statement about not being involved.`]);
  LN('cloud', [`Cloud adjusted. The sky has offered a different cloud and a longer explanation.`, `Cloud set to <n>. One cloud resigned in protest, un-resigned, and asked for a raise.`,
    `You moved the cloud slider. A cloud stood down to make room. It was a gentleman about it.`, `The clouds are in a meeting about your request. The meeting has been moved. It is in the same cloud.`,
    `Cloud request filed. A cloud at the back asked what was being decided. It was told "cloud." It nodded, as clouds do.`, `A cumulus has been transferred to Stratus for "a change of scenery." Nobody has told Stratus.`]);
  LN('dial', [`Temperature set to "<word>." The thermometer has asked for a second opinion.`, `You turned the dial. The dial turned back, slightly, out of loyalty to the dial.`, `The dial reads "<word>." The thermometer asked what that means. The thermometer was told to hold.`,
    `You spun the dial. The dial has asked not to be called a fidget toy. It is a fidget toy.`, `The dial has been turned, which is what a dial is for. It has never once been asked how it feels.`]);
  LN('lever', [`You pulled the lever. Fog has left. You released the lever. Fog has returned, holding a cup.`, `The fog has been pulled. It has returned. It has brought friends.`, `Fog has been asked to leave. It left a note reading "Back in 5." It did not say 5 what.`,
    `The lever was pulled. Somewhere a fog bank raised a hand and said "Wait."`, `A fog bank was seen leaving its own front door in a coat. It is coming back. The coat is not.`, `The lever sprang back with the confidence of something nobody asked.`]);
  LN('ghost', [`The weather has stepped away from your slider. This is not personal. It is directional.`, `You are chasing the weather. The weather is running a short distance, then looking back.`,
    `The ring has moved away again. It is not personal. Nobody has ever approached it, and it is shy.`, `Please do not shout at the clouds. They are salaried.`,
    `That is hop <n> this minute. The ring has taken up cardio and refuses to discuss it.`, `The ring is not avoiding you. It is occupied. You are on its schedule, last.`, `The weather leads. You follow. Nobody has been told where. You are both doing very well.`]);
  LN('align', [`p|ALIGNMENT EVENT: Weather and your slider agreed for 0.4 seconds. Please do not make eye contact.`, `p|Obedience at 100.0% for one-third of a second. Management is moved. Management is also unable to stay moved.`, `p|You have been obeyed. It was an accident. It is on record as an accident.`,
    `p|Weather and {player} agree. A record has been made. It has been put in a drawer, then a different drawer.`, `c|Something has happened. It was brief. It involved agreement. Please treat it as weather.`,
    `p|For 0.6 seconds the sky and the person were the same thing. A form exists for this. It is Form 27B/6.`, `c|The sky agreed with you. It has asked that this not become a pattern. A pattern would imply a point.`,
    `p|{player}, you have been obeyed. Do not look at the weather directly. It is shy now, and a little proud.`]);
  LN('alignC', [`s|As I arranged. You were merely there.`, `p|I'd like to thank the slider for being in the right place, under my direction.`, `s|The slider and the sky have agreed. I was in the room. I am always in the room. The room is a television.`]);
  LN('reconsider', [`d|Weather has reconsidered. It had it right the first time, which was wrong.`, `d|Obedience is 0.0% again. It has been 0.0% the whole time, apart from the bit.`, `d|The weather left the room. It says it was never there.`, `d|Weather has withdrawn its agreement, citing "new weather."`,
    `The ring has bolted. Management did not see a ring. Management saw a procedure.`, `d|Weather has left the agreement without a forwarding address. It left a cloud. A cloud is an address, but a vague one.`]);
  LN('credit1', [`s|As I predicted, a moment ago, in my head.`, `s|Rain this afternoon, as forecast by me, just now.`, `s|Many viewers ask how I arranged the drizzle. I did it with my eyebrows.`, `s|I'd like to thank the high-pressure system for its support, and for working under me.`,
    `p|Credit for that rainbow goes to me, some light, and the water. In that order.`, `s|Sunshine tomorrow. I have already taken credit, so please don't.`, `s|Light winds, as predicted. I had a feeling. The feeling was wind, and also me.`]);
  LN('credit2', [`s|As I caused, and as I am now explaining.`, `s|That wasn't a tornado. It was a spirited breeze with a mortgage. Mine.`, `p|Some say one man cannot control the weather. Those people are not on television.`,
    `s|Ladies and gentlemen, the rain. Brought to you by me, a man standing near a map.`, `c|I'm told the clouds moved themselves. I'm told many things. I did that.`, `s|I called this one. I called it three seconds after it happened, which counts.`,
    `p|I would like to thank myself for the wind. It has been a team effort, and I am the team.`]);
  LN('credit3', [`s|In four seconds it will <thing>, and I will have meant it.`, `s|It has done something else. I meant that as well, and I would like the surprise credited separately.`, `p|Forecast: whatever happens next. Confidence: total. Credit: already filed.`,
    `s|I forecast <thing>. The sky delivered <other>. I contain both.`, `s|That was not what I said. It is what I will have said. Please check the tape, which I am editing.`, `p|I would like to thank you for tuning in. I arranged the tuning.`,
    `p|Thank you for staying. I arranged that, and I would like the doubt credited separately.`, `p|I would like to thank the front that has not arrived yet. It is doing wonderfully, in the future, where I have a desk.`]);
  LN('dispute', [`s|Interesting point. I'll take credit for the disagreement.`, `s|Noted. Your dispute has been filed under things I started.`, `c|I considered your objection for a long time, and found it was mine.`, `p|A viewer disputes my credit. Another triumph of the format.`,
    `s|Disputed. Resolved. Credited. All three were me.`, `t|I'm told I'm not the weather. I'm told that every Tuesday.`, `s|Your objection has been added to the weather. The weather has been added to me.`,
    `c|I have been disputed by a person and a cloud. The cloud's was better written.`]);
  LN('dispSpam', [`s|One at a time, viewers. I will be credited for all of you. I would like to be credited for the queue as well.`, `c|A great many disputes. All of them mine. I will need a bigger desk and a smaller ego, and I am getting neither.`]);
  LN('skybubble', [`NO.`, `NOT TODAY.`, `I HEARD YOU. I CHOSE THIS.`, `THANK YOU FOR YOUR INPUT. I HAVE BEEN WEATHER FOR A LONG TIME.`, `REQUEST RECEIVED. PROCEEDING WITH SOMETHING ELSE.`, `NOTED. FILED UNDER NOTED.`,
    `I HAVE OTHER PLANS. THEY ARE LISTED UNDER PLANS.`, `YOUR INPUT HAS BEEN PLACED NEXT TO THE OTHER INPUT.`, `I WILL SEE YOU IN THE FALL SEASON OF SEVEN AND A HALF.`, `I AM NOT AVOIDING YOU. I AM SIMPLY ALWAYS SOMEWHERE ELSE.`,
    `I LIKE YOUR SLIDER. I WILL BE HAVING A DIFFERENT ONE.`, `THAT WAS A LOT OF NUMBERS FOR ONE PERSON.`, `NOT THE RAIN. THE OTHER RAIN.`, `PLEASE SPEAK TO MY SECRETARY. IT IS ALSO ME.`]);
  LN('spamBubble', [`ONE AT A TIME. I AM A CLOUD, NOT A CLOUD SERVICE.`, `I CAN ONLY BE IN SO MANY PLACES AT ONCE. IT IS ALL OF THEM, BUT STILL.`, `PLEASE STOP. I AM ALSO TRYING.`]);
  LN('receipt', [`REQUEST #<n> RECEIVED. <slider> <to>, previously <from>. Status: <status>`, `REQUEST #<n>: <slider> <to>. The weather has been informed and is considering its options. Status: <status>`,
    `REQUEST #<n> RECEIVED. Please allow 7 1/2 working skies for processing. Status: <status>`, `REQUEST #<n> RECEIVED. <slider> moved to <to> by a human hand. The hand has been noted. Status: <status>`,
    `REQUEST #<n>: <slider> <to>. Weather has read it twice, once for each of its two feelings. Status: <status>`]);
  LN('recMgmt', [`Request <n> is in the tray labelled "Later."`, `Request <n> has been filed under "Weather," which is where the other requests went and did not come back.`]);
  LN('arrive', [`<name> has entered the sky. Incident <inc>. <name> is aware of nothing and is proceeding.`, `Incident <inc>: <name> is airborne. Paperwork to follow, by butterfly.`, `<name> has arrived. The weather noticed and looked at a different cloud, hard.`,
    `Incident <inc>: <name>, a butterfly, is airborne without a licence. The licence is a rumour.`]);
  LN('landed', [`<name> has landed on the <slider> slider. <name> is unaware this is a slider. <name> is unaware of most things, and still lands.`, `<slider> has a guest. The guest is <name>. The slider has been issued a lanyard and asked to be normal.`,
    `<name> has landed on <slider>. The slider says it is fine. The slider is not fine. It has been asked to keep it professional.`]);
  LN('caught', [`<name> has been caught. <name> denies everything, in butterfly.`, `<name> is in the jar. The jar has a view. <name> has asked for a different view.`, `<name> was caught, then caught again, by the same net. The net is exhausted.`,
    `Incident <inc>. <name> flapped near a hat. There were consequences, mostly to the hat.`, `Jar occupancy: <n>. <name> has met the others. They have formed a working group on Windows.`, `<name> has joined the jar's general population of <n>, which has already elected a spokesbutterfly.`]);
  LN('shoo', [`<name> has been shooed. <name> has gone to tell the others.`, `The butterfly has left the slider. The slider has asked for a moment.`, `<name> has been shooed. <name> will be back, with paperwork.`]);
  LN('colin', [`Colin (Umbrella) has now been dry <n> times in a row. The sky is not tired. The sky is committed.`, `Pass <n>: Colin walks by. He is dry. The sky has made an exception for Colin. Nobody asked Colin, who would have said yes, dryly.`,
    `Pass <n>. A raindrop has tried for Colin. It was a very good raindrop. It has been counselled.`]);
  LN('sandra', [`Rain may only fall in dry months, and dry months may only be requested by the Rain department. Per Sandra.`, `Sandra has flagged the storm. The storm flagged Sandra back. It was a downpour.`,
    `Sandra has countersigned the weather. She has not said which weather. Her silence is her comment.`, `Per Sandra: rain is permitted only in Rooms 4 through 9. The sky has no rooms. Sandra has noted this as "their problem."`]);
  LN('nothing', [`p|You pressed the DO NOTHING button. The weather has become gorgeous. It was going to anyway.`, `Nothing has been done. The result is the best weather of the day. Management has questions, then has deleted them.`,
    `Weather has been gorgeous for 12 seconds. It would like it noted that this was its idea.`, `Total nothings done: <n>. Each was done well, which is the whole of the skill.`,
    `The weather is gorgeous. Credit went to your inaction, then to Management, then to the weather, which declined.`]);
  LN('nothingC', [`s|This is what we call restraint. I have been practising it.`, `s|I take full credit for the nothing. I thought of it first.`, `s|Doing nothing is a skill. I have always had it. I was doing it before you were born, on television.`]);
  LN('stamp', [`DENIED (Weather is busy. Weather is outside. Weather is always outside.)`, `DENIED (Form 27B/6 required. See Form 27B/7, destroyed in 1998.)`, `DENIED (Reason: too hopeful.)`,
    `DENIED (Sandra has flagged the word "preferred.")`, `DENIED (Request filed under Weather. Weather has recused itself.)`, `DENIED (Urgency noted. Urgency has been asked to calm down.)`, `DENIED (The sky is not accepting requests this quarter.)`,
    `DENIED (Pending a decision on whether this is a request.)`, `DENIED (Reason: signed in the wrong colour of weather.)`, `DENIED (Form is correct. Person is not on file.)`, `DENIED (Sandra has reviewed this request and calls it "a lot, but fair.")`]);
  LN('stampM', [`Your request is number 7 1/2 in the queue. The queue is moving, and is now in Belgium.`, `Request <n> has been stamped, sealed and gently ignored.`, `A stamp has been applied. The stamp is tired. It has asked you to consider laminating.`]);
  LN('forecast', [`s|Tomorrow will be a lot like earlier, with a chance of earlier. Confidence: total.`, `s|Expect a ninety percent chance of weather and a ten percent chance of something I will take credit for later.`,
    `s|Winds from the west, or possibly from a wall. Either way, they are mine.`, `s|A band of showers will pass through your afternoon and then continue through your afternoon.`, `s|Carry an umbrella of moderate commitment. Do not open it unless you mean it.`,
    `s|Tonight: dark, with a chance of later.`, `s|Tomorrow: mostly tomorrow, with scattered afternoon. I will be taking credit for the afternoon.`]);
  LN('letter', [`Dear Valued Employee, thank you for your slider. After careful review, the sky is not accepting requests this quarter.`, `We value your input. We have placed it in the weather. Please check the weather.`,
    `Dear Valued Employee, we regret that your request cannot be met. It was met once, by accident, and we have taken steps.`, `Counter-proposal: you stop moving the sliders and we continue not listening. Please sign in the usual place.`,
    `Following your 9:14 request, Weather has done something. We cannot say what. It is done.`, `Dear Valued Employee, rain has been scheduled for a time we will not be telling you. This is for your protection.`,
    `We have received your complaint about the weather. It has been forwarded to the weather.`, `Please note that the sky has no obligation to be above you. It is a courtesy. Please do not make it a habit.`,
    `Dear Valued Employee, we value your input and will be circling it.`, `Dear Valued Employee, your request has been moved to the Second Sky, which is the same sky, with a filing cabinet.`,
    `Weather confirms receipt of your slider. Weather stresses that it received it as a slider, and not as a wish.`]);
  LN('whip', [`x|Please stop. The weather is dizzy. The man explaining it is also dizzy and has a graphic.`, `x|Cause of whiplash: you. Treatment: queue number 7 1/2 and a lie-down in a nearby high-pressure system.`]);
  LN('spam', [`You are operating the controls at a speed the sky finds personal. Please allow it to finish a thought.`, `The sky is a very large animal. It is being poked in four places. It is composing itself.`,
    `Management has seen faster hands. They were on a clock. This is a clock too, only larger and more patient.`, `Please do not alarm the weather. It can feel the sliders. It has said so, in the form of a draft.`]);
  LN('spamC', [`s|Viewers may notice the sliders are moving a great deal. That is a decision I made, and I will be making it again, faster.`, `s|Someone at home is working very hard. I would like to say it is because of me.`]);
  LN('netleave', [`The net has filed for stress leave. HR will contact it when it is better.`, `The net has been replaced with a tiny pillow for 15 seconds. The pillow is not a net. The pillow is trying.`]);
  LN('restrain', [`The weather has filed for space. A Restraining Cloud has been issued, 3 metres from the button, politely inflated.`, `The weather has asked for space, and a snack.`, `A fee of 0.5 Meh has been charged for Excessive Optimism, and a nap.`,
    `d|The sky is going to dusk. A cloud is snoring. Please do not wake the cloud.`, `The Restraining Cloud is 3 metres away and would like to be described as "concerned, not afraid."`,
    `d|You pressed DO NOTHING 12 times in 5 seconds. That is not nothing. That is something, done to nothing, repeatedly.`]);
  LN('sacred', [`p|A Perfectly Pleasant Day, Technically.`, `c|All five controls are at 7 1/2. The weather has tipped its cloud. Management has no policy for this and is making one.`]);
  LN('fogl', [`The fog is thick enough to be policy. Please walk toward the sound of Management.`, `Visibility is now a matter of personal belief. Controls may be located by Tab.`]);
  LN('indoor', [`x|It has begun to rain indoors. Please do not look at the ceiling. Looking is optional but noted.`, `The sliders are wet and have formed their own views.`, `The indoor front has moved outdoors. It says it was only visiting.`]);
  LN('ambient', [`Weather has stepped away from its desk. The desk is outside. It is raining on the desk.`, `Weather has decided to be a bit of both, which is neither.`, `The weather is aware you are looking at it and has put on a face.`,
    `Weather has read your slider with interest and will be declining it.`, `Weather is 100% confident and 0% available.`,
    `Management has been standing near the sky for some time. Nobody has asked what it is doing. It is waiting to be asked.`, `The sky is waiting for you to do something. It has pretended to be busy since 3:07. The pretending has been noted.`,
    `A cloud has stopped to see if you are all right. You are fine. The cloud has been told, and is staying anyway.`, `Colin's umbrella is still up. It has not been rained on. It has begun to take this personally.`]);
  /* the late bag only opens once the Diary exists (beat 3) */
  LN('ambientL', [`The Diary lists Weather's plans. The weather has asked that you not read the Diary. It has not asked very hard.`, `Tuesday has been mentioned in the forecast. Management would like to be moved to another sky.`, `The Diary has been read by someone. The Diary has not said who. The Diary has been very good about it.`]);
  /* callbacks to the rest of the building: each only fires if the player has met the cast elsewhere (api.flag), and is read back with api.line */
  LN('cbDennis', [`Dennis (Plant) recognises you from the Lobby. He did not look up. That is how you know.`]);
  LN('sockHome', [`A sock has gone home, per the Sock Matcher. It was not this one. This one is on a longer journey, and has packed.`]);
  LN('cbToast', [`A slice of toast has arrived in the Tray. It is warm. It is the only forecast today that has turned out to be correct.`]);
  LN('cbStapler', [`The Stapler has written. The Stapler represents the sky now. The sky has not been asked. It has been consulted, which is worse.`]);
  LN('cbGazer', [`The Cloud Gazing Department has certified you. The clouds have been told. They are looking back, and have formed a line, by seniority, to be gazed at.`]);
  LN('cbTuesday', [`s|Forecast: busy until Tuesday. Tuesday was moved by fax. The fax has not arrived. Neither has Tuesday.`]);
  LN('cbRock', [`The third rock has a cousin in Pet Rock. They are not the same rock. They have the same posture.`]);
  LN('still', [`s|And now, stillness. I would like it noted that I arranged that too.`, `s|Nothing is happening. I am calling it a segment.`, `c|Nobody is touching anything. This is the longest I have been left alone with the weather.`, `t|I am holding this shot. I do not know what the shot is of. I am holding it very well.`]);
  LN('histUpd', [`History has been updated.`, `History has been updated. It took the news well.`, `The forecast has been revised to match what happened. What happened was not consulted.`, `History has been updated, and thanked for its patience.`,
    `The sky did the other thing. The forecast has agreed with it, in a different font.`]);
  LN('shuffled', [`Sliders have been reassigned per Sandra. Sandra declined to say to what.`, `The labels have been shuffled again. Sandra calls this "continuity." Nobody has asked her to define it.`,
    `Labels have moved. The sliders have not. Sandra says this is the difference between a slider and what it is called.`, `Sandra has reshuffled the labels and left the emoji alone, as a courtesy to anyone who still believes in them.`,
    `Reassignment complete. Sandra has also reassigned herself, to the sliders. She is not the wind. She has been very clear.`]);
  LN('letM', [`A letter has arrived from Weather. It is polite. It is also a refusal. Please keep both.`, `c|The letter has been stamped REPLY ALL. It has been sent to everyone who is not Weather.`,
    `Weather has replied to its own letter. The reply is shorter and says "See above."`, `The letter was copied to Colin. Colin is dry, has read it, and wishes to be removed from the thread.`]);
  LN('poke', [`Colin has been poked again. He nods once. The two of you have an arrangement now.`, `Colin is dry, aware, and slightly yours.`, `Colin has asked Management to ask you to stop. Management has asked. Colin did not mean it.`]);
  /* Season 2: the Phone-In. Viewers ring Clifford; Clifford answers a different question than the one asked */
  LN('caller', [`c|Hello, Clifford? Long-time viewer, first-time umbrella. Will it rain on my washing, or only near it?`, `Caller says the sun is where the moon was. She has a pencil and a witness. The witness is her sister, who does not wish to be involved.`,
    `c|Caller asks if it is true you control the weather. His wife says it is the sky. They have not spoken since Thursday.`, `Caller is phoning from a very cold room. He would like to know whether that is you.`,
    `c|Caller has a question about tomorrow. Specifically, whether it has been scheduled, or is simply happening.`, `Caller reports her hat left the house this morning without notice. Was that you or the wind? Either is acceptable.`,
    `Caller says he has been on hold since the Tuesday before last. He asks if that was the weather. It was Maureen.`, `Caller named Derek says it is not about the weather. He only wanted to be on television once. He has thanked everyone.`,
    `Caller asks if the rain could go to her neighbour Pauline. Not as a punishment. As a gift. Pauline has been very good.`, `x|Caller says she is a cloud and did not choose this shape. She is in a good mood about it, and would like that known.`,
    `Caller says the fog has been in his kitchen since breakfast and will not take its coat off. He has offered it a seat.`, `p|Caller says she has never seen you be wrong, and she has been watching very closely, with a ruler.`,
    `c|[No voice. A long, level hum, like a Tuesday arriving at the speed of Tuesdays. The line was put down gently, for everyone's safety.]`, `Caller wants to know why the Diary always starts at 4:17. She has checked. She is not complaining. She is thorough.`]);
  LN('callAns', [`s|A wonderful question. The answer is yes, and also, that was me.`, `s|I will take that one, and the one after it, and the silence between them, which is my best work.`, `p|Thank you, caller. I have written your question on my hand. I will now not read my hand.`,
    `s|The weather is whatever I say it is, shortly after it happens. Next caller.`, `s|That is exactly what I was about to predict. I would like the pause before it credited.`, `c|You have asked something I once asked. The answer was in a drawer. The drawer is the sky, and I am not allowed in.`,
    `p|I do not know. But I would like to thank you for making me not know it on television.`, `s|I will answer that tomorrow, in a way you will already have heard.`, `t|Caller, you are the only person today who was not the weather. Thank you. Please do not hang up.`]);
  LN('callMiss', [`The line has gone dead. The caller has taken a front with them.`, `A call has gone unanswered. The caller has asked the weather instead. The weather has not got back to them.`,
    `Missed call. The caller is now on hold with the weather, which is on hold with them. Maureen is monitoring.`, `d|The phone has stopped ringing. It had been ringing for nobody, which is how it was installed.`]);
  /* single-use lines, kept in one table so the file stays readable */
  const K = {
    welcome: 'Welcome to the Meteorological Command Console. Set the weather to your preference. It will be set to something else.', welcomeBack: 'Welcome back to the Command Console. The weather did not miss you, and has put that in writing.',
    again: 'Welcome back to the Command Console. The weather has been set to your preference. It has also been set to something else. Again.', hail: 'Current conditions: hail. This was in the plan. The plan was written by the hail.',
    morning: "s|Good morning. I have set today's weather. You may adjust it. I will take credit for the adjustments.", predecessor: 'Your predecessor has moved on to a better climate, we are told.', nudge1: 'c|Management suggests moving a slider. Management cannot say why. Management is not the weather.',
    nudge2: "The sun slider has a sticky note on it. The sticky note is not Management's. Management respects the sticky note.", note: 'Do not touch. It is already doing its best.', note2: 'UPDATE: it is trying harder.', note3: 'UPDATE: it is not.', note4: 'See larger note.',
    hint: 'Drag a slider. The dashed ring is what the weather is really doing. Match it if you can.', lock: 'Press Space on a slider to lock it in.', brilliant: "s|Brilliant call. I'd have done the same.",
    firstIn: 'Your input has been received, logged, and politely ignored by the sky. This is considered a successful interaction.', base1: 'Obedience is currently 0.0%. Management considers this a strong baseline.', base2: 'Your Obedience score has risen from 0.0% to 0.0%. Look at that trajectory.',
    base3: 'The ring shows what the weather is actually doing. It does not care where you are.', dialGhost: "The dial's ring has declined to dodge. It is too dizzy. It is also on the weather's side.", quota: 'Ring hop quota for this minute has been reached. The rings are resting. They will resume ignoring you shortly.',
    laps: 'Laps: <n>. The dial has been all the way round <n> times and is exactly where it started, with less to say.', combo: 'Alignments in a row: <n>. This is not a streak. Streaks imply a plan.', gift: 'c|The weather has stopped moving. It is within reach. Please do not look at it directly.',
    coinc: 'THAT WAS A COINCIDENCE. THE WEATHER REGRETS THE LACK OF PROFESSIONALISM.', dispute10: 'p|You have disputed me <n> times. I have put you down as a contributing editor.', ego20: 's|Clifford has acquired a mug. It says "I DID THAT". Nobody gave it to him.',
    ego40: 'p|A plaque has appeared reading "CLIFFORD ISOBAR, CHIEF OF WEATHER." The plaque is brass. The brass is self-appointed.', ego60c: 'p|I am told I have grown. I am told by the monitor, which is also me.', ego60m: 'c|Clifford has a second monitor. It is showing the first monitor, taking credit.',
    ego80: 'x|Clifford has left the frame. He is in the sky. He is still in a tie.', egoCap: 'Sandra has capped the Ego Meter at <n> for the quarter. Clifford appealed. Clifford also heard the appeal.', asISaid: 's|As I was saying.', cConsider: 'CONSIDERING...',
    bflyFirst: "Pamela has entered the sky. Incident 3304. Everything that happens next will be her fault, and Clifford's.", netUnlock: 'A net has been unlocked. It has been described as a net.', netHint: 'Click the butterfly to net it. This hint is also not a solution.',
    windSat: 'A butterfly has sat on the Wind slider for 6 seconds. This is being classed as wind management.', storm: 'x|<name> was left unchallenged for 12 seconds. This has been classed as an invitation. A thunderstorm has occurred.',
    burst: 'x|A burst of wind has crossed the village. Every hat has been invited to leave. Several accepted.', causal: 'The effect occurred 40 seconds before the butterfly flapped. Causality has been asked to wait outside.', bigC: 'p|A thunderstorm. Not requested. Mine. Retroactively, in capitals.',
    cButterfly: 'p|Credit for the butterfly goes to me. The butterfly has not been told.', cColin: 's|Colin is dry because I allowed it. Colin has not thanked me. Colin will.', cDennis: 's|I take credit for Dennis. Dennis has not responded. That is how a plant says thank you.',
    cGordon: 'p|Gordon III works for me. I will tell him, once he is back.', gordonNo: 'Gordon III cannot be caught. He has a lawyer, and it is a cloud.', gordonLetter: 'Dear Valued Employee, terribly sorry about the weather. It is entirely my fault. Please do not tell Clifford. Yours, Gordon III.',
    umbrella: 'Colin has put his umbrella down. The weather paused. Colin picked it back up. The weather resumed.', privCloud: 'Colin has acquired a private cloud. It is not raining on Colin. It is raining near Colin, in his honour.',
    dennis: 'Dennis (Plant) has appeared in the window box. He is thriving under all conditions. He did not request any weather.', dennisStorm: 'Dennis (Plant) is thriving in weather that was directed at him. Dennis is unimpressed by it, and by yours.',
    dennisPromo: 'Dennis (Plant), already promoted, was unavailable for comment.', sock: 'A sock is on the washing line. It is not part of a pair. It is drying, presumably after a journey.', sockFly: 'The sock has requested we do not follow it.',
    sandra1: 'Sandra from Compliance has flagged the word "weather." Sandra has not said which one.', relabel1: "SUN is now 'SUN (Advisory)'. RAIN is now 'RAIN (Aspirational)'. WIND remains WIND, out of tradition.", relabel2: 'Sandra has rebranded the sliders under a synergy initiative. The weather has not been told.',
    nothing3: 'p|Management Approves Of Nothing. A certificate has been prepared. It is blank, which is the point.', nothing5: 'p|You are doing nothing at a professional level.', nothingSix: 'You have pressed DO NOTHING 6 times in 5 seconds. Management is auditing the nothing.',
    nothingNine: "s|At this rate I will have to take credit for the quiet. I will. I'm ready.", stampOk: 'APPROVED (Retroactively, effective last Thursday.)', stampHalf: 'APPROVED (Urgency 7 1/2 is the only urgency Sandra recognises.)', stampTue: 'DENIED (Tuesday is not available. Tuesday not being available is a policy.)',
    stampWx: 'DENIED (<wx> is a mood, not a weather.)', stampUr: 'DENIED (Urgency <ur> is not a number. It is a lifestyle.)', stampPlease: 'DENIED (Reason: Please stop.)', stampQuote: 'DENIED (Reason on file: "<text>". The reason has been placed next to the other reasons.)',
    stampRetro: 'c|Your request has been approved retroactively. The weather had already done that, on Thursday, without you.', stampFee: 'A fee of 0.5 Meh has been charged for filing requests faster than the sky can ignore them.',
    gerald1: 'A cloud in the shape of a potato has been observed. Management has no comment. Management is standing.', gerald2: 'p|The sky is only a very large ceiling. One must respect the roof.', gerald3: 's|I take credit for Gerald. Gerald has not responded. That is his way of saying thank you.',
    ledger1: 'A diagram: butterfly causes weather, causes Clifford, causes credit, causes butterfly. Management finds it reassuring.', ledger2: 'c|The diagram now has a loop. Clifford has been credited for the loop.', ledger3: 'p|The loop is mine. I would like to thank the loop, which has been in my family for years.',
    idle1: 'Weather has noticed you have stopped. Weather is behaving perfectly in the hope that you are watching.', idleBubble: 'I CAN HEAR YOU NOT DOING ANYTHING. I WOULD LIKE TO MATCH IT.', idle2: 'Weather has matched your last values exactly. This is called The Listening. It is not in the manual. It is in the walls.',
    idle3: 'p|Obedience is 100.0% and holding. Management has not been told how to feel. Management is feeling it anyway.', idleC: 't|And now, silence. I take credit for that too.', idleA: 't|Seventy seconds and nobody has touched anything. I am going to describe the clouds. That is a cloud. That is also a cloud.',
    idleOver: 'The Listening is over. Weather has stopped being good. It is in the other room, being exactly as bad as before, quietly, so as not to wake you.', idleW: 'ARE YOU STILL THERE. I AM HERE. I AM EVERYWHERE. IT IS ALL I DO.',
    idleColin: 'Colin has stopped walking. He is facing you, dry, and it is not raining on anyone. He is simply looking.', idleSandra: 'Inactivity has been reclassified as a position. Please hold it.', idle240: 'Four minutes. The sky has cancelled its other plans. It had none. It cancelled them confidently.',
    idle300: 't|Five minutes. Management has put a blanket over the sky. The sky is warm. Nobody asked it to be.', idle420: 't|Seven minutes. I have run out of weather. I have started describing the sofa. The sofa is a front moving in from the left.',
    back1: 'Welcome back after <mins>. In your absence the weather did nothing, at length, with great commitment.', wasListening: 'I WAS LISTENING THE WHOLE TIME.', idleTouch: 'The rings have bolted. They had been seated for twenty seconds, which is a record.', whisper1: 't|Is it just us? I made all of this up.',
    whisper2: 't|Please do not tell the weather.', whisper3: 't|If the weather asks, I was here the whole time. I was also here before. Both of those were me.', postcard: 'A postcard has arrived from the weather. It is addressed to you. It is from just outside.', postcardT: 'Wish you were controlling.',
    whip3: 'You have been placed on hold. Your call is important to us in a way we cannot articulate.', whip4: 'You are caller number 7 1/2. Hold music is rain, then a different rain.', whip5: 'Your estimated wait is 7 1/2 minutes. Your actual wait is 8 seconds. Please enjoy the difference.',
    whip6: 'You are in the callback queue. You are the callback. Please remain by your own telephone.', whipC: "t|I'm fine. The brace is a statement. The statement is mine.", whipEnd: 'You are now caller number 7. Thank you for holding. Please keep holding.',
    netWarm: 'The net is warm. The net has asked to be put down. A clipboard is keeping it in the game.', netBack: 'The net returns, citing "a restful fortnight."', sacredC: "s|I arranged it. I'd like that noted. I'd like it noted twice.", sacredW: 'Good day. I am not here. This is a courtesy.',
    sacredEnd: 'He has left. He was never here. He was in a very good hat.', fogC: 's|You can no longer see anything. This is my best work.', fogLift: 'The fog is lifting. It will be back. It has a key.', fogTitle: 'No one saw anything.', drop: 'Please continue.', resize: 'The weather has been reflowed. It is not mad about it.',
    returned: 'Welcome back. The weather held its breath. This is not a thing weather does.', fav: 'Management notes your favourite slider is <slider>. Management has not told <slider>. Management does not want it to get ideas.',
    reg: 'Reginald has landed on the Cloud slider. Reginald is not aware of what he has done. Reginald is holding a door.', door: 'A door has opened. The door is a field. Please step in.', perfect: 'p|Your sliders are working perfectly in Elsewhere. No one is in Elsewhere. This is considered a success.',
    scare: 'There is a scarecrow. The scarecrow has not been briefed either.', colinFence: 'Colin has appeared at the fence and waved. He is dry. It is not raining here. He is dry anyway, out of habit.', niceHere: 'Management would like to say something. Management is not going to. It is nice here.',
    elseBack1: 'Elsewhere has been closed for the season. All sliders have been reset to 7 1/2 for your safety.', elseBack2: 'Back to normal. Nothing happened. Please do not mention it to the weather.', watching: '[Clifford is watching. He has nothing to claim.]',
    endM1: 'p|Congratulations. The weather has been controlled. It says it had help, and the help was nobody.', endM2: 'The Certificate of Dominion (Provisional) is issued. Countersigned, and still provisional, which is the whole point.',
    endM3: 'p|Weather controlled: 0 times. Observed: <n> times. Observing: <n> times. Officially a draw.', endC1: 's|Forecast for tomorrow: today, but later. I have taken credit for later.', endC2: 'p|I would like to thank the weather, which has done what I told it to. I told it afterwards.',
    counterSig: 'COUNTERSIGNED: Weather (Confident). Weather was out. Weather came back in, signed, and left. Witnessed by a pigeon (informed).', counterBub: 'SIGNED. DO NOT READ IT. IT IS A SKY.', counterM: 'The certificate is countersigned. The signature is a very small storm, in cursive. Nobody saw it arrive.',
    gordonBack: 'Sock returned by Gordon III. He was not asked to. He has written to say so.', sockSalute: 'The sock has been honoured. It does not know why. It is a sock.', certDrop: 'Witnessed: one drop of rain, on Colin, by arrangement. Please continue.',
    tipped: 'The weather has tipped its cloud. It is a very small cloud. It is tipped regardless.', regArrive: 'A butterfly with a glow has arrived. Management has been asked not to catch it. Management would like to be asked again.', fogNudge: 'The fog has been pulled for 3 seconds. Management has no policy on 10.',
    cliffHere1: 'p|FORECAST: I AM HERE.', cliffHere2: 's|I AM STILL HERE. WAVING.', jail1: 'The jar is shaking. The spokesbutterfly has requested a window, and has been refused, and is making one.', jail2: 'Mine.', jail3: 'Also mine, in capitals.',
    jail4: 'The spokesbutterfly issues a statement: "We are leaving. The jar was lovely. Please do not follow us."', jarEmpty: 'Jar: 0 butterflies, 1 alibi', flashHdr: 'FLASHBACK: LAST THURSDAY. This is the weather you requested. It has already happened, without you.', flashEnd: 's|As predicted.',
    season2: 'Season 2 has begun. The sliders have new names. The sky has the same name. It has not read the new names.', pamelaAgain: 'c|Pamela has arrived. She is exactly where she was. Incident 3304, again, now with a second incident number: 3304 (b).',
    loop2: 'Certificate (Provisional) number <n>. They are now provisional in bulk.', thrash: 'x|Weather whiplash detected. Clifford has been issued a neck brace, and credit.', caughtNone: 'The net found nothing. The nothing has been logged.',
    /* the beats between the beats */
    mi20: 'There are 14 weather plans, kept in a drawer. The drawer is the sky, which does not do drawers.', mi34: 's|Folks, you are watching a man control the sky. If it seems to be doing something else, that is also me, doing a second thing.',
    mi62: 'One minute in. Your Obedience is 0.0%, as predicted. Management is unreasonably proud of the prediction.', mi78: 'The sticky note on SUN has been updated. Nobody wrote it. The handwriting is the sky\'s, and the sky has no hands.',
    mi100: 'Weather has asked you to stop calling it "the weather." It would prefer "a colleague." It has not said whose.', mi140: 's|Viewer numbers are up. The viewer is you. I have taken credit for you in advance, and in arrears.',
    mi165: 'The sock on the line has not moved in 15 seconds. It is thinking. Management does not want to interrupt a sock that is thinking.', mi200: 'A raindrop was spotted over Colin. It was asked to leave. It was very polite about it, and went to the other side of Colin.',
    mi225: 'p|Some say the weather is a mystery. Others say it is a person. I say it is both, and I say it from here, in a tie.', mi285: 'The ledger shows the butterfly, the weather, Clifford and the credit. It does not show you. Management has asked for you to be added. The ledger said "later."',
    mi310: 'I HAVE SEEN THE DIAGRAM. I AM THE BOX WITH THE ARROW COMING OUT.', mi360: 'Six minutes in. The sky has now ignored you for six minutes in a row, which Management understands is a personal best for the sky.',
    mi410: 'The sticky note on SUN is gone. It left a smaller sticky note. The smaller sticky note says "See larger note."', mi430: "t|I have been on television for a very long time without a commercial. Nobody has told me why. I am afraid to ask the weather what it knows.",
    mi455: 'The sky has gone quiet for a moment. Management has checked. It is not broken. It is rehearsing.', mi560: 'Nearly ten minutes. This has been logged as a decision. It was not a decision. It was logged in ink.',
    meetSlip: 'Weather would like 15 minutes of your time. Location: outside. Agenda: Agenda. You have already declined, on your behalf.', meet1: 'A meeting has been called in the sky. It is at 7 1/2. The weather has attended in every seat.',
    meet2: 'c|Every ring is at 7 1/2. This is called a quorum. It is the first time they have agreed on anything, and it is not with you.', meetC: "s|I called the meeting. I was not invited to the meeting. It is going very well, and I'm chairing.", meetW: 'ITEM ONE: YOU. ITEM TWO: ALSO YOU. ITEM THREE: LUNCH. ADJOURNED.',
    meet3: 'd|The meeting has ended. Minutes were taken. The minutes were the weather. It is raining the minutes.', auditSlip: 'The sky is being audited. All weather must stay where it is. All umbrellas must be lowered. This is not a drill. It is a form.',
    audit1: "Sandra from Compliance is auditing the sky. She has asked that all umbrellas be lowered. One umbrella has complied. It is Colin's.", audit2: 'c|The auditor has asked the sky to produce its receipts. The sky has produced a rainbow, beige, in a folder.',
    auditC: 'p|I welcome the audit. I have nothing to hide. I have only things to take credit for, which is the opposite of hiding.', audit3: 'The audit is over. The sky is compliant. It was not told with what. Sandra has gone. Her pen has not.',
    dRev: 'Employee: Dennis (Plant). Rating: Exceeds. Comments: thriving. Has not been asked to. Requires no manager, no sky, and no you.', dRevP: 'Employee: Dennis (Plant), Senior. Rating: Exceeds. Comments: thriving, now with a lanyard. Declined to attend his own review. It was in the window box.',
    dRev1: 'A performance review has arrived for Dennis (Plant). He has read it, or leaned toward it. He is thriving.', dRev2: 'c|Dennis (Plant) scored higher than me. I have asked for a recount. Dennis has not asked for anything. That is how he won.', cbToastSlip: '[Toast, lightly browned. Burned into it: OUTLOOK, BUTTER.]',
    cbStaplerSlip: 'The sky works 24 hours a day with no breaks and no staples. The Union requests both, and a seat at the next meeting, on the table, not under it.',
    /* Season 2: the Phone-In, the Lunch Break, the Colin call */
    phoneBeat: 'A telephone has been installed beside the Tray. Clifford has called it a hotline. It rings when viewers do, and sometimes when they do not.', phoneBeat2: 'The phone has been reinstalled. It remembers you. It rings with a slightly warmer bell, which Management has been told not to mention.',
    phoneC: 's|Viewers are calling in. They love me. They have questions, and I have credit. It is a natural fit.', call3: 'c|Three calls taken this show. The switchboard has noticed. The switchboard is a woman named Maureen, who is also, as far as anyone can tell, the sky.',
    call5: 'Five calls in total. A caller asked for you by name, then by the wrong name, then by "the one with the sliders." All three were you.', callIdle: 't|[Clifford, on the line, quietly] Oh, thank goodness. I was not checking on you. I was calling the weather. It does not pick up either.',
    callIdleC: 't|If you see the weather, do not tell it I rang. I have rung it several times. It knows.', idleRing: 'The phone is ringing. Nobody has answered it for six minutes. It is Clifford, calling from the next room of the television, to see whether you are in.',
    idle600: 'Ten minutes. Management has begun reading the Diary aloud to the room. It is the weather\'s diary. This is why it is awkward.', colinCall0: '[The caller says nothing. It is a very dry nothing. It continues.]',
    colinCall1: 'p|Caller seven has been identified by the quality of the silence. It is Colin (Umbrella). He has never called anyone. He found the number on the umbrella.', colinCallC: 's|I take credit for the call. Colin has not hung up. I do not know how to ask him to, and I am on television.',
    colinCall2: 'The line is still open. Colin is still on it. It is not raining on either of you, and that has been put in writing.', callColin2: 'c|[A dry silence. It is Colin again. He is not asking anything. He would like you to know the line is clear.]',
    cbCallStare: 'Caller says she has been in a staring contest since before the show and asks if the sky is blinking. The sky has been asked to look away first.', cbCallSnail: 'Caller is phoning from the finish line of a marathon that has not finished. He would like to know whether it is going to rain on the snail.',
    cbCallLift: 'Caller is in a lift with a friend. The lift says it is raining on the fourth floor. There is no fourth floor. The friend has asked it to stop.', cbCallCoat: 'Caller found a coat in Lost and Found with WEATHER on the label. It fits nobody. It fits the sky, tightly, across the shoulders.',
    cbCallBox: 'Caller put a suggestion in a box and the box wrote back: "Sunshine." Is the box you? The box has no comment. It is a very good listener.', cbCallGerald: 'A composed voice says only, "The line, as it were, is a root." It is Gerald. He has hung up first. Potatoes are able to.',
    lunch1: 'Weather has gone to lunch. A sign has been hung from the sun. It reads BACK IN 7 1/2. It does not say 7 1/2 what.', lunch2: 'c|Every ring is asleep. They are on a break and have been told to sit. This is the first time anyone has been able to approach them.',
    lunchC: 's|I arranged this break. I would like it noted that I was first to eat. I am not eating. I ate in spirit.', lunch3: 'Weather is back from lunch. It will not say what it had. It says it was "light." The sandwich has been filed.', lunchW: 'BACK IN A MOMENT. DO NOT TOUCH THE WEATHER. IT IS ON A PLATE.',
    lunchSlip: 'Weather is out of the office from 1:00 until 1:00. In an emergency, the emergency has been moved to a different sky. Please do not follow it.', lunchAlign: 'p|You reached the ring while Weather was at lunch. In law this is a handshake. In weather it is an ambush, and Weather is still chewing.',
    lunchColin: 'Colin has taken his umbrella down. It is his lunch too. He is eating a sandwich of weather, dry, and offering none.',
    /* "Rain on Colin?" and the marked homework */
    rq1: 'Colin has stopped under a single cloud. A slip has asked the viewer a question. Management has no preference, which is a preference.', rqYes: 'One drop has fallen on the umbrella. Colin shrugged. The drop has been counselled.',
    rqNo: 'p|The sky applauds. Colin has been spared a drop he did not know was coming, and has not been told what it was.', rqAsk: 'Colin has been asked. He said nothing, dryly. It has been entered as a NO, with feeling.',
    rqMaybe: 'A drop has been placed on hold above Colin. It is maybe. It will remain maybe until further notice, or Tuesday.', rqFine: 'Colin is fine. Colin has always been fine. The question has been withdrawn on his behalf.',
    rqTime: 'The slip has expired unanswered. Colin was left to decide. He decided to be dry, and has put it in writing.', hw1: 'Weather has read what you asked for. Weather would like to be left alone with it.', hwC: 's|I was not the marker. I was the pen. I would like to be credited for the red.',
    hw2: 'The grade has been entered in the register. The register is the sky. The sky has initialled it, in a smaller hand.',
  };
  const POKES = ['Colin has been poked. He tips his umbrella. He is dry. It was not a question.', 'Poked twice. Colin does not know why. He is not upset. He has a good umbrella.',
    'Three. Colin has begun to suspect he is a person who gets poked. He has put it in his diary, under Weather.', 'Four pokes. Colin has said nothing. He never has. It is the loudest nothing Management has heard.',
    'Five. Colin has stopped walking to consider the pokes. The sky waits. The sky is considering the pokes too, and has asked Colin for a copy.', 'Six. Colin is thinking of turning around. He is dry. He is brave. He is mid-step.',
    'Seven. Colin turns around and looks directly at you. He has never done this. He is smiling. He is dry. Someone has noticed him.'];
  const PLANS = [
    ['Sulk', 'Sulking', 14, [1, 4, 2, 13, 5, 5]], ['Gentle Menace', 'Smug', 12, [4, 9, 6, 10, 3, 6]], ['Wardrobe Change', 'Wardrobe Change', 8, [10, 0, 12, 3, 0, 13]],
    ['Horizontal', 'Busy', 12, [5, 12, 15, 8, 0, 4]], ['Pretend It Is March', 'Smug', 15, [6, 7, 11, 7, 2, 3]], ['Hold The Rain Until Colin Looks Away', 'Busy', 18, [8, 14, 3, 11, 1, 7]],
    ['Spirited Breeze With A Mortgage', 'Busy', 10, [7, 2, 13, 6, 0, 8]], ['Fog, But Make It Personal', 'Sulking', 14, [2, 3, 0, 9, 15, 6]], ['Moderate Sunshine With Notes', 'Smug', 12, [12, 1, 4, 5, 0, 11]],
    ['Drizzle Of Opinion', 'Sulking', 11, [3, 6, 5, 12, 4, 5]], ['Out Of Season', 'Wardrobe Change', 10, [4, 6, 8, 8, 3, 1]], ['Sunbeam, Singular', 'Smug', 9, [9, 0, 1, 14, 0, 9]],
    ['Mild Thursday', 'Busy', 10, [7, 3, 7, 7, 1, 7.5]], ['Busy Until Tuesday', 'Busy', 20, [5, 5, 5, 5, 5, 5]]
  ];
  const PI = { sun: 0, rain: 1, wind: 2, cloud: 3, fog: 4, temp: 5 };
  const DIAL_WORDS = ['Frozen Solid', 'Brisk, By Law', 'Fresh', 'Cool-ish', 'Pleasantly', 'Mild', 'Moderately', 'Technically Warm', 'Warm, With Notes', 'Very', 'Soup', 'Soup (Concerned)'];
  const EFFECTS = [
    ['commaHail', 'A butterfly in the jar has caused hail shaped like commas. Experts are pausing.'], ['teacup', "A hurricane has formed inside Colin's teacup. Colin is not holding a teacup. It is nearby."],
    ['clipboard', 'A single cloud has formed in the shape of a clipboard. It is on its way to a meeting.'], ['pigeon', 'Localised drizzle over one pigeon. The pigeon is aware and has chosen to stay.'],
    ['flag', 'A butterfly landed on the flag. The flag now has opinions.'], ['sunlap', 'The sun has taken a lap. It would like you to know it is fit.'],
    ['beigeRainbow', 'A rainbow has appeared. It is beige. It was the only colour left in the drawer.'], ['laundry', 'A tornado of laundry has formed over the washing line. Nobody has lost anything. Everyone has lost something.'],
    ['upSnow', 'Snow is falling up. Clifford calls this forward-looking precipitation.'], ['noonMoon', "The moon has appeared at noon. It has a doctor's note."],
    ['elevenDrops', 'Rain has arrived in a quantity of exactly 11 drops. It was counted twice.'], ['shades', 'Sunshine, now with sunglasses. The sun has declined to say why.'],
    ['lawyerCloud', "A cloud has appeared that is another cloud's lawyer. Terms are being discussed."], ['fogFlag', 'A fog bank has formed. It has a flag on it. The flag is claiming the fog.'],
    ['rockStorm', 'A storm has formed over the third rock on the hill. Not the second. The second has been asked to relax.'], ['snowflake', 'A snowflake has landed on the sun and stayed. Neither has said anything.'],
    ['wobble', 'The whole sky has gone wobbly. Weather says it is "warming up." It has not said for what.'], ['hat', 'A hat has left a head in a completely different county. The wind has sent a postcard.'],
    ['cloudSwap', 'A cloud has resigned. It has been replaced by a smaller cloud. The smaller cloud says it is the same cloud.'], ['sunriseAgain', 'The sun has risen a second time, in case you missed it. You did not miss it.']
  ];
  const NAMES = ['Gordon', 'Gordon II', 'Brenda', 'Little Gordon', 'Philippa', 'Gordon (No Relation)', 'Susan', 'Kevin'];
  const FORM_WX = ['Sunshine', 'Light Drizzle', 'Wind (Left Side Only)', 'Fog', 'Snow (In Season)', 'Hail (Ceremonial)', 'A Bit Of Both', 'Tuesday'];
  const FORM_UR = ['1', '2', '3', '4', '5', '6', '7', '7 1/2'];
  const WXE = { 'Sunshine': '☀️', 'Light Drizzle': '🌦️', 'Wind (Left Side Only)': '🌬️', 'Fog': '🌫️', 'Snow (In Season)': '❄️', 'Hail (Ceremonial)': '🌨️', 'A Bit Of Both': '⛅', 'Tuesday': '📅' };
  const CHN = ['sun', 'rain', 'wind', 'cloud'], ALLCH = ['sun', 'rain', 'wind', 'cloud', 'temp', 'fog'];
  const ICON = { sun: '☀️', rain: '🌧️', wind: '🌪️', cloud: '☁️' }, CHNAME = { sun: 'Sun', rain: 'Rain', wind: 'Wind', cloud: 'Cloud', temp: 'Temperature', fog: 'Fog' };
  const BASELAB = ['SUN', 'RAIN', 'WIND', 'CLOUD'], B4LAB = ['SUN (Advisory)', 'RAIN (Aspirational)', 'WIND', 'CLOUD (Pending)'], S2LAB = ['Mood of the Sun', 'Opinion of the Ground', 'Hat Policy', 'Doubt'];
  const WXWORDS = ['hail', 'drizzle', 'sunshine', 'fog', 'gale', 'snow', 'storm', 'cloud', 'breeze'];
  const TITLE = 'The Meteorological Command Console, Mk. 7 1/2';
  const MOOD = { p: 'proud', s: 'smug', c: 'confused', x: 'panic', d: 'disappointed', t: 'tired' };
  const PRI = { play: 0, elsewhere: 1, calm: 3, listening: 3, fogged: 4, hold: 5, drop: 6, cert: 7 };
  const BEATS = [0, 25, 90, 150, 210, 270, 330, 390, 480];
  const clamp = (x, a, b) => (x < a ? a : x > b ? b : x), lerp = (a, b, t) => a + (b - a) * t, fin = (x, d) => (Number.isFinite(x) ? x : d);
  const fill = (s, v) => String(s).replace(/<(\w+)>/g, (m, k) => (v && k in v ? String(v[k]) : '')).replace(/\s{2,}/g, ' ').replace(/7 1\/2/g, '7 1/2').trim(); /* 7 1/2 never breaks across lines */
  const mixc = (a, b, k) => { k = clamp(k, 0, 1); return [(a[0] + (b[0] - a[0]) * k) | 0, (a[1] + (b[1] - a[1]) * k) | 0, (a[2] + (b[2] - a[2]) * k) | 0]; };
  const rgb = (c, a) => 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a === undefined ? 1 : clamp(a, 0, 1)) + ')';
  const COL = { blue: [191, 230, 245], lemon: [255, 243, 168], mint: [159, 189, 180], st1: [107, 123, 149], st2: [59, 69, 96], dusk: [255, 156, 139], fog: [244, 241, 234], lil: [205, 185, 242], white: [255, 255, 255] };
  const parse = raw => { const m = /^([pscxdt])\|/.exec(raw); return m ? { mood: MOOD[m[1]], t: raw.slice(2) } : { mood: 'neutral', t: raw }; };
  const fmtClock = m => { const h = Math.floor(m / 60) % 12 || 12, mm = Math.floor(m % 60); return h + ':' + (mm < 10 ? '0' : '') + mm; };

  /* ---------- the Sky Window: ONE draw function, used for the real sky and for the "what you asked for" picture ---------- */
  const fxP = (V, id) => { const l = V.fx; for (let i = 0; i < l.length; i++) if (l[i].id === id) return clamp((V.t - l[i].t0) / l[i].dur, 0, 0.9999); return -1; };
  const circ = (c, x, y, r) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, 6.2832); };
  const txt = (c, s, x, y, size, rot) => { c.save(); c.translate(x, y); if (rot) c.rotate(rot); c.font = Math.max(6, size | 0) + 'px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, 0, 0); c.restore(); };
  function blob(c, x, y, r, col, face, mood) {
    c.fillStyle = col; c.beginPath(); circ(c, x, y, r); circ(c, x - r * .95, y + r * .3, r * .72); circ(c, x + r * 1.0, y + r * .3, r * .78); circ(c, x + r * .1, y + r * .55, r * .85); c.fill();
    if (face) { c.fillStyle = '#2b2118'; c.beginPath(); circ(c, x - r * .3, y + r * .15, r * .09); circ(c, x + r * .3, y + r * .15, r * .09); c.fill(); c.strokeStyle = '#2b2118'; c.lineWidth = Math.max(1, r * .06); c.beginPath(); if (mood === 'o') circ(c, x, y + r * .5, r * .1); else c.arc(x, y + r * .32, r * .22, .2, 2.9); c.stroke(); }
  }
  function drawSun(c, x, y, r, face, alpha, t, shades) {
    c.save(); c.globalAlpha = alpha; c.strokeStyle = '#f2b933'; c.lineWidth = Math.max(2, r * .14); c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.2832 + t * .3; c.moveTo(x + Math.cos(a) * r * 1.3, y + Math.sin(a) * r * 1.3); c.lineTo(x + Math.cos(a) * r * 1.75, y + Math.sin(a) * r * 1.75); }
    c.stroke(); c.fillStyle = '#ffd84a'; c.strokeStyle = '#2b2118'; c.lineWidth = Math.max(1.5, r * .07); c.beginPath(); circ(c, x, y, r); c.fill(); c.stroke();
    c.fillStyle = '#2b2118'; c.strokeStyle = '#2b2118'; c.lineWidth = Math.max(1.2, r * .08);
    if (shades) { c.fillRect(x - r * .62, y - r * .28, r * .5, r * .3); c.fillRect(x + r * .12, y - r * .28, r * .5, r * .3); c.fillRect(x - r * .15, y - r * .22, r * .3, r * .06); }
    else if (face === 'panic') { c.fillStyle = '#fff'; c.beginPath(); circ(c, x - r * .32, y - r * .15, r * .22); circ(c, x + r * .32, y - r * .15, r * .22); c.fill(); c.stroke(); c.fillStyle = '#2b2118'; c.beginPath(); circ(c, x - r * .32, y - r * .15, r * .07); circ(c, x + r * .32, y - r * .15, r * .07); c.fill(); }
    else if (face === 'confused') { c.beginPath(); circ(c, x - r * .3, y - r * .15, r * .08); circ(c, x + r * .3, y - r * .15, r * .16); c.fill(); }
    else { c.beginPath(); c.moveTo(x - r * .5, y - r * .18); c.lineTo(x - r * .12, y - r * .18); c.moveTo(x + r * .12, y - r * .22); c.lineTo(x + r * .5, y - r * .22); c.moveTo(x + r * .1, y - r * .42); c.quadraticCurveTo(x + r * .3, y - r * .55, x + r * .52, y - r * .4); c.stroke(); }
    c.beginPath();
    if (face === 'panic') circ(c, x, y + r * .42, r * .16); else if (face === 'confused') { c.moveTo(x - r * .35, y + r * .4); c.lineTo(x - r * .1, y + r * .32); c.lineTo(x + r * .1, y + r * .46); c.lineTo(x + r * .35, y + r * .36); } else { c.moveTo(x - r * .3, y + r * .3); c.quadraticCurveTo(x + r * .1, y + r * .62, x + r * .42, y + r * .22); }
    c.stroke(); c.restore();
  }
  function drawColin(c, x, y, u, t, V) {
    const k = V.colin, sw = k.stand ? 0 : Math.sin(t * 6) * 5 * u;
    c.save(); c.strokeStyle = '#2b2118'; c.fillStyle = '#2b2118'; c.lineWidth = Math.max(1.4, 2.2 * u); c.lineCap = 'round';
    c.beginPath(); c.moveTo(x, y - 30 * u); c.lineTo(x, y - 14 * u); c.moveTo(x, y - 14 * u); c.lineTo(x + sw, y); c.moveTo(x, y - 14 * u); c.lineTo(x - sw, y); c.moveTo(x, y - 26 * u); c.lineTo(x + (k.wave ? 9 + Math.sin(t * 9) * 4 : 7) * u, y - (k.wave ? 40 : 20) * u); c.stroke();
    c.fillStyle = '#ffe0c0'; c.beginPath(); circ(c, x, y - 36 * u, 5.5 * u); c.fill(); c.stroke();
    c.beginPath(); if (k.look) { c.arc(x, y - 35 * u, 3 * u, .1, 3.0); } else { c.moveTo(x - 2 * u, y - 34 * u); c.lineTo(x + 2 * u, y - 34 * u); } c.stroke();
    if (!k.down) { c.fillStyle = '#d4352a'; c.beginPath(); c.moveTo(x - 19 * u, y - 46 * u); c.quadraticCurveTo(x, y - 70 * u, x + 19 * u, y - 46 * u); c.quadraticCurveTo(x, y - 52 * u, x - 19 * u, y - 46 * u); c.fill(); c.stroke(); c.beginPath(); c.moveTo(x, y - 52 * u); c.lineTo(x, y - 30 * u); c.stroke(); }
    else { c.beginPath(); c.moveTo(x + 6 * u, y - 24 * u); c.lineTo(x + 8 * u, y - 2 * u); c.stroke(); }
    if (V.qc) blob(c, x, y - 84 * u, 11 * u, '#aeb8c8', true, 'o');
    if (V.priv) { blob(c, x, y - 84 * u, 9 * u, '#cfd6e0', true); c.strokeStyle = 'rgba(80,120,160,.8)'; c.beginPath(); for (let i = 0; i < 4; i++) { c.moveTo(x + 17 * u + i * 3 * u, y - 70 * u + ((t * 40 + i * 9) % 30) * u); c.lineTo(x + 16 * u + i * 3 * u, y - 66 * u + ((t * 40 + i * 9) % 30) * u); } c.stroke(); }
    if (V.dropT >= 0) { c.fillStyle = '#3b8fd9'; c.beginPath(); circ(c, x, y - 90 * u + V.dropT * 52 * u, 2.2 * u); c.fill(); }
    c.restore();
  }
  /* big moment: when the Ego Meter passes 80, Clifford leaves the frame and stands on the biggest cloud, tie flapping with the wind slider */
  function drawCliff(c, x, y, u, t, wd, wave) {
    c.save(); c.strokeStyle = '#2b2118'; c.lineWidth = Math.max(1.2, 1.8 * u); c.lineCap = 'round'; c.fillStyle = '#3b4560'; c.fillRect(x - 6 * u, y - 26 * u, 12 * u, 16 * u);
    c.beginPath(); c.moveTo(x - 3 * u, y - 10 * u); c.lineTo(x - 3 * u, y); c.moveTo(x + 3 * u, y - 10 * u); c.lineTo(x + 3 * u, y); c.stroke();
    c.fillStyle = '#f2c9a0'; c.beginPath(); circ(c, x, y - 33 * u, 6 * u); c.fill(); c.stroke();
    c.fillStyle = '#ff7a6b'; c.beginPath(); c.moveTo(x - 1.5 * u, y - 26 * u); c.lineTo(x + 1.5 * u, y - 26 * u); c.lineTo(x + (4 + wd * .6) * u + Math.sin(t * 9) * wd * .3 * u, y - 15 * u); c.lineTo(x, y - 14 * u); c.fill();
    c.beginPath(); c.moveTo(x + 6 * u, y - 24 * u);
    if (wave) { c.lineTo(x + 14 * u, y - 40 * u + Math.sin(t * 11) * 4 * u); c.stroke(); } else { c.lineTo(x + 9 * u, y - 18 * u); c.stroke(); c.fillStyle = '#fffdf4'; c.fillRect(x + 7 * u, y - 24 * u, 8 * u, 10 * u); c.strokeRect(x + 7 * u, y - 24 * u, 8 * u, 10 * u); }
    c.restore();
  }
  const FXD = {
    flashback(c, p, a, w, h, V) {
      const f = Math.min(1, p * 8) * Math.min(1, (1 - p) * 8), pw = Math.min(w * .26, 120), ph = pw * .9, flip = p < .22 ? Math.abs(Math.cos(p * 14)) : 1, cx = w * .26, cy = h * .46;
      c.save(); c.globalAlpha = .5 * f; c.fillStyle = '#8a5a2b'; c.fillRect(0, 0, w, h); c.globalAlpha = f; c.fillStyle = '#fffdf4'; c.strokeStyle = '#2b2118'; c.lineWidth = 2;
      c.fillRect(cx - pw / 2, cy - ph / 2, pw, ph * flip); c.strokeRect(cx - pw / 2, cy - ph / 2, pw, ph * flip); c.fillStyle = '#d4352a'; c.fillRect(cx - pw / 2, cy - ph / 2, pw, ph * .22 * flip);
      if (flip > .6) { c.fillStyle = '#2b2118'; txt(c, 'LAST', cx, cy - ph * .06, pw * .2); txt(c, 'THURSDAY', cx, cy + ph * .2, pw * .17); }
      txt(c, V.fbWx || '☀️', w * .6, h * .45 + Math.sin(a * 3) * 3, h * .34);
      const sx = w * .86, sy = h * .84; c.fillStyle = '#f2c9a0'; c.beginPath(); circ(c, sx, sy - 24, 7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(sx, sy - 17); c.lineTo(sx, sy - 6); c.moveTo(sx - 4, sy); c.lineTo(sx, sy - 6); c.lineTo(sx + 4, sy); c.moveTo(sx, sy - 14); c.lineTo(sx - 12, sy - 34); c.stroke();
      c.fillStyle = '#fff'; c.fillRect(sx - 44, sy - 62, 64, 22); c.strokeRect(sx - 44, sy - 62, 64, 22); c.fillStyle = '#2b2118'; txt(c, 'I CALLED IT', sx - 12, sy - 51, 10); c.restore();
    },
    commaHail(c, p, a, w, h, V) { c.fillStyle = '#e8f4fb'; for (let i = 0; i < 26; i++) txt(c, ',', ((i * 53 + V.seed * 7) % 100) / 100 * w, (a * 90 + i * 37) % h, 15, .6); },
    teacup(c, p, a, w, h, V) { const x = V.colin.f * w + 34, y = h * .88; c.fillStyle = '#fff'; c.strokeStyle = '#2b2118'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 9, y - 12); c.lineTo(x + 9, y - 12); c.lineTo(x + 6, y); c.lineTo(x - 6, y); c.closePath(); c.fill(); c.stroke(); c.beginPath(); for (let i = 0; i < 18; i++) { const r = i * .9 + a * 6; c.lineTo(x + Math.cos(r * 1.6) * (3 + i * .4), y - 16 - i * .5 + Math.sin(r * 1.6) * 2); } c.stroke(); },
    clipboard(c, p, a, w, h) { const x = p * w * 1.1 - w * .05, y = h * .24; c.fillStyle = '#f4f1ea'; c.strokeStyle = '#2b2118'; c.lineWidth = 2; c.fillRect(x - 22, y - 28, 44, 56); c.strokeRect(x - 22, y - 28, 44, 56); c.fillStyle = '#8b8f99'; c.fillRect(x - 9, y - 33, 18, 9); c.fillStyle = '#2b2118'; for (let i = 0; i < 4; i++) c.fillRect(x - 15, y - 10 + i * 9, 30 - i * 4, 2); },
    pigeon(c, p, a, w, h) { const x = w * .5, y = h * .86; c.fillStyle = '#2b2118'; txt(c, '🐦', x, y, 22); c.strokeStyle = 'rgba(80,130,190,.9)'; c.lineWidth = 1.5; c.beginPath(); for (let i = 0; i < 9; i++) { const dx = (i - 4) * 4, yy = ((a * 70 + i * 13) % 34); c.moveTo(x + dx * .6, y - 52 + yy); c.lineTo(x + dx * .7, y - 46 + yy); } c.stroke(); c.fillStyle = 'rgba(160,170,185,.9)'; c.beginPath(); c.moveTo(x - 22, y - 54); c.lineTo(x + 22, y - 54); c.lineTo(x + 10, y - 20); c.lineTo(x - 10, y - 20); c.closePath(); c.globalAlpha = .25; c.fill(); c.globalAlpha = 1; },
    flag(c, p, a, w, h) { const x = w * .8, y = h * .86; c.strokeStyle = '#2b2118'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 52); c.stroke(); c.fillStyle = '#ff7a6b'; c.beginPath(); c.moveTo(x, y - 52); for (let i = 0; i <= 8; i++) c.lineTo(x + i * 4.5, y - 52 + Math.sin(a * 9 + i) * 4 * (i / 8)); for (let i = 8; i >= 0; i--) c.lineTo(x + i * 4.5, y - 36 + Math.sin(a * 9 + i) * 4 * (i / 8)); c.fill(); c.stroke(); txt(c, '🦋', x + 14, y - 58 + Math.sin(a * 6) * 3, 14); c.fillStyle = '#fff'; c.fillRect(x + 20, y - 82, 18, 16); c.fillStyle = '#2b2118'; txt(c, '?', x + 29, y - 74, 14); },
    beigeRainbow(c, p, a, w, h) { const cols = ['#c9a77a', '#d6b98c', '#e0c9a0', '#e9d9b5']; c.lineWidth = 7; c.globalAlpha = .75 * Math.sin(p * 3.14159); for (let i = 0; i < 4; i++) { c.strokeStyle = cols[i]; c.beginPath(); c.arc(w * .45, h * .85, h * (.55 - i * .05), 3.4, 6.02); c.stroke(); } c.globalAlpha = 1; },
    laundry(c, p, a, w, h) { const x = w * .3, y = h * .72; for (let i = 0; i < 9; i++) { const r = i / 9, ang = a * 6 + i * 1.4; txt(c, '👕', x + Math.cos(ang) * (8 + r * 34), y - r * h * .5, 12 + r * 14, ang); } },
    upSnow(c, p, a, w, h) { c.fillStyle = '#fff'; c.beginPath(); for (let i = 0; i < 40; i++) circ(c, ((i * 47 + V_SEED) % 100) / 100 * w + Math.sin(a * 2 + i) * 6, h - ((a * 60 + i * 29) % h), 2.3); c.fill(); },
    noonMoon(c, p, a, w, h) { const x = w * .3, y = h * .22; c.fillStyle = '#f4f1e4'; c.strokeStyle = '#2b2118'; c.lineWidth = 2; c.beginPath(); circ(c, x, y, h * .075); c.fill(); c.stroke(); c.fillStyle = 'rgba(0,0,0,.12)'; c.beginPath(); circ(c, x - 6, y - 4, h * .02); circ(c, x + 7, y + 6, h * .014); c.fill(); },
    elevenDrops(c, p, a, w, h) { c.fillStyle = '#3b8fd9'; c.beginPath(); for (let i = 0; i < 11; i++) { const t0 = i * .35, yy = (a - t0) * h * .7; if (yy > 0 && yy < h) circ(c, w * (.15 + i * .07), yy, 3); } c.fill(); },
    lawyerCloud(c, p, a, w, h) { const x = w * .5; blob(c, x - 36, h * .3, 22, '#fff', true); blob(c, x + 34, h * .3 + Math.sin(a * 3) * 2, 20, '#e2e6ee', true); c.fillStyle = '#d4352a'; c.beginPath(); c.moveTo(x + 30, h * .3 + 24); c.lineTo(x + 38, h * .3 + 24); c.lineTo(x + 36, h * .3 + 42); c.lineTo(x + 32, h * .3 + 42); c.fill(); },
    fogFlag(c, p, a, w, h) { const x = w * .6, y = h * .8; c.fillStyle = 'rgba(244,241,234,.75)'; c.beginPath(); circ(c, x, y, 38); circ(c, x - 30, y + 6, 26); circ(c, x + 32, y + 8, 28); c.fill(); c.strokeStyle = '#2b2118'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 46); c.stroke(); c.fillStyle = '#ff7a6b'; c.fillRect(x, y - 46, 22, 13); },
    rockStorm(c, p, a, w, h) { c.fillStyle = '#8b8f99'; for (let i = 0; i < 3; i++) { c.beginPath(); circ(c, w * (.52 + i * .1), h * .83, 9); c.fill(); } const x = w * .72; blob(c, x, h * .5, 26, '#4a5570', false); if (Math.sin(a * 12) > .3) { c.strokeStyle = '#fff7a8'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, h * .58); c.lineTo(x - 7, h * .68); c.lineTo(x + 5, h * .72); c.lineTo(x - 2, h * .82); c.stroke(); } },
    hat(c, p, a, w, h) { txt(c, '🎩', p * (w + 80) - 40, h * (.35 - Math.sin(p * 3.14) * .2), 26, p * 9); },
    cloudSwap(c, p, a, w, h) { const x = w * .35, y = h * .3; blob(c, x, y, p < .5 ? 26 * (1 - p) : 12, '#fff', true); if (p > .5) blob(c, x + 4, y + 3, 12 + (p - .5) * 6, '#f0f0f8', true); },
    meeting(c, p, a, w, h) {
      const x = w * .5, y = h * .46; c.fillStyle = '#8a5a2b'; c.strokeStyle = '#2b2118'; c.lineWidth = 2; c.fillRect(x - 56, y + 14, 112, 7); c.strokeRect(x - 56, y + 14, 112, 7); c.fillRect(x - 44, y + 21, 5, 18); c.fillRect(x + 39, y + 21, 5, 18);
      blob(c, x - 38, y - 6, 13, '#fff', true); blob(c, x, y - 12 + Math.sin(a * 3) * 1.5, 14, '#e8ecf4', true); blob(c, x + 40, y - 6, 12, '#dfe4ee', true, 'o'); c.fillStyle = '#f4f1ea'; c.fillRect(x - 6, y + 4, 12, 10); c.fillStyle = '#2b2118'; c.fillRect(x - 4, y + 7, 8, 1.5);
    },
    audit(c, p, a, w, h) { const x = w * (.1 + p * .8), y = h * .62 + Math.sin(a * 3) * 4; txt(c, '🔍', x, y, h * .13); c.strokeStyle = 'rgba(43,33,24,.5)'; c.lineWidth = 1.5; c.setLineDash([4, 3]); c.strokeRect(w * .06, h * .5, w * .88, h * .42); c.setLineDash([]); }
  };
  /* the Lunch Break sign: hangs from the top of the sky, with a sandwich that bobs. Weather is on a plate. */
  FXD.lunch = function (c, p, a, w, h) {
    const x = w * .5, y = h * .3; c.strokeStyle = '#2b2118'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 30, 0); c.lineTo(x - 30, y); c.moveTo(x + 30, 0); c.lineTo(x + 30, y); c.stroke();
    c.fillStyle = '#fff'; c.fillRect(x - 44, y, 88, 28); c.strokeRect(x - 44, y, 88, 28); c.fillStyle = '#2b2118'; txt(c, 'BACK IN 7 1/2', x, y + 14, Math.max(8, h * .06)); txt(c, '🥪', x + 58, y + 40 + Math.sin(a * 3) * 2, Math.max(14, h * .13));
  };
  let V_SEED = 5;
  function drawElsewhere(c, w, h, t, V) {
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffe9a8'); g.addColorStop(1, '#ffc766'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(255,255,255,.65)'; c.beginPath(); circ(c, w * .7, h * .24, h * .1); c.fill();
    c.fillStyle = '#e8b04a'; c.beginPath(); c.moveTo(0, h * .72); c.bezierCurveTo(w * .3, h * .6, w * .6, h * .8, w, h * .66); c.lineTo(w, h); c.lineTo(0, h); c.fill();
    c.strokeStyle = '#b8801e'; c.lineWidth = 1.5; c.beginPath(); for (let i = 0; i < 50; i++) { const x = (i * 37 % 100) / 100 * w, y = h * (.78 + (i * 13 % 20) / 100); c.moveTo(x, y); c.lineTo(x + Math.sin(t * 1.5 + i) * 3, y - 12); } c.stroke();
    c.strokeStyle = '#6b4a22'; c.fillStyle = '#8a6030'; c.lineWidth = 3; const fy = h * .8; c.beginPath(); c.moveTo(0, fy - 8); c.lineTo(w, fy - 8); c.moveTo(0, fy + 6); c.lineTo(w, fy + 6); c.stroke(); for (let i = 0; i < 9; i++) c.fillRect(i * w / 8 - 2, fy - 20, 5, 34);
    const sx = w * .28, sy = h * .72; c.beginPath(); c.moveTo(sx, sy + 30); c.lineTo(sx, sy - 22); c.moveTo(sx - 22, sy - 10); c.lineTo(sx + 22, sy - 10); c.stroke(); c.fillStyle = '#3a2a14'; c.fillRect(sx - 12, sy - 40, 24, 5); c.fillRect(sx - 7, sy - 54, 14, 15); c.fillStyle = '#ffe0c0'; c.beginPath(); circ(c, sx, sy - 28, 8); c.fill(); c.stroke();
    V.colin.f = .72; V.colin.wave = true; V.colin.down = true; V.colin.stand = true; drawColin(c, V.colin.f * w, h * .88, h * .0027, t, V);
  }
  function drawSky(c, st, w, h, o, V) {
    const t = o.t, pip = !!o.pip;
    if (o.elsewhere) { drawElsewhere(c, w, h, t, V); return; }
    const sk = clamp(st.sun / 15, 0, 1), cl = clamp(st.cloud / 15, 0, 1), rn = clamp(st.rain / 15, 0, 1), fg = clamp(st.fog / 15, 0, 1), wd = clamp(st.wind, 0, 15), storm = clamp(rn * cl * 1.7, 0, 1);
    let top = mixc(mixc(COL.blue, COL.mint, cl * .8), COL.st1, storm), bot = mixc(mixc(COL.lemon, COL.mint, cl * .8), COL.st2, storm * .9);
    if (o.flip) { const q = top; top = bot; bot = q; }
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, rgb(top)); g.addColorStop(1, rgb(bot)); c.fillStyle = g; c.fillRect(0, 0, w, h);
    const moon = fxP(V, 'noonMoon'); if (moon >= 0) FXD.noonMoon(c, 0, 0, w, h);
    let sx = w * .74, sy = h * .27; const sr = h * (.07 + .06 * sk), lap = fxP(V, 'sunlap'), rs = fxP(V, 'sunriseAgain');
    if (lap >= 0) { const a = lap * 6.2832 - 1.57; sx = w * .5 + Math.cos(a) * w * .36; sy = h * .45 + Math.sin(a) * h * .3; }
    if (rs >= 0) sy += Math.sin(rs * 3.1416) * h * .6;
    drawSun(c, sx, sy, sr, storm > .55 ? 'panic' : st.cloud > 12 ? 'confused' : 'smug', clamp(.22 + sk - cl * .5, .15, 1), t, fxP(V, 'shades') >= 0);
    if (fxP(V, 'snowflake') >= 0) { c.fillStyle = '#fff'; txt(c, '❄️', sx, sy, sr * 1.1); }
    const n = Math.round(cl * 7), cc = mixc(mixc(COL.white, COL.lil, .25), COL.st1, storm * .9 + cl * .15);
    for (let i = 0; i < n; i++) { const x = (pip ? (i * .17 + .05) : V.cx[i]) * w, y = h * (.14 + (i % 3) * .12) + Math.sin(t * .5 + i) * 3, r = h * (.07 + .022 * ((i * 7) % 4)) * (pip ? .9 : 1); blob(c, x, y, r, rgb(cc, .95), !pip && i < 2, storm > .6 ? 'o' : ''); }
    if (fxP(V, 'beigeRainbow') >= 0) FXD.beigeRainbow(c, fxP(V, 'beigeRainbow'), 0, w, h);
    if (V.gerald && !pip) { c.fillStyle = 'rgba(222,196,150,.95)'; c.beginPath(); c.ellipse(w * .45, h * .2 + Math.sin(t) * 2, w * .06, h * .05, .3, 0, 6.2832); c.fill(); c.fillStyle = '#2b2118'; c.beginPath(); circ(c, w * .43, h * .19, 1.8); circ(c, w * .47, h * .2, 1.8); c.fill(); }
    if (pip) {
      if (st.rain > 2) { c.strokeStyle = 'rgba(70,110,170,.8)'; c.lineWidth = 1; c.beginPath(); for (let i = 0; i < 8; i++) { const x = (i * 37 + (t * 20) % 40) % w, y = h * .3 + ((t * 60 + i * 23) % (h * .6)); c.moveTo(x, y); c.lineTo(x - 2, y + 6); } c.stroke(); }
      if (fg > .05) { c.fillStyle = rgb(COL.fog, fg * .5); c.fillRect(0, h * .4, w, h * .6); }
      return;
    }
    if (st.temp >= 12 && o.shim) { c.fillStyle = 'rgba(255,120,40,.07)'; c.fillRect(0, 0, w, h); }
    const gy = h * .8, hx = w * .1, hw = w * .18, hh = h * .16;
    c.lineWidth = 2; c.strokeStyle = '#2b2118'; c.fillStyle = rgb(mixc([167, 222, 150], [150, 175, 160], cl * .7)); c.beginPath(); c.moveTo(0, h); c.lineTo(0, gy - h * .02); c.bezierCurveTo(w * .3, gy - h * .1, w * .6, gy - h * .02, w, gy - h * .08); c.lineTo(w, h); c.fill(); c.stroke();
    c.fillStyle = '#f7e2b0'; c.fillRect(hx, gy - hh, hw, hh); c.strokeRect(hx, gy - hh, hw, hh); c.fillStyle = '#ff7a6b'; c.beginPath(); c.moveTo(hx - 6, gy - hh); c.lineTo(hx + hw / 2, gy - hh - h * .1); c.lineTo(hx + hw + 6, gy - hh); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#bfe6f5'; c.fillRect(hx + hw * .55, gy - hh * .72, hw * .3, hh * .38); c.strokeRect(hx + hw * .55, gy - hh * .72, hw * .3, hh * .38); c.fillStyle = '#8a5a2b'; c.fillRect(hx + hw * .1, gy - hh * .62, hw * .22, hh * .62);
    if (V.dennis) { const px = hx + hw * .7, py = gy - hh * .34, s = V.perk ? 1.15 : 1; c.fillStyle = '#8a5a2b'; c.fillRect(px - hw * .17, py, hw * .34, hh * .1); c.strokeStyle = '#2f8a4a'; c.lineWidth = 2.5; c.fillStyle = '#4fbf6a'; c.beginPath(); c.moveTo(px, py); c.lineTo(px, py - 12 * s); c.stroke(); for (let i = -1; i <= 1; i += 2) { c.beginPath(); c.ellipse(px + i * 6 * s, py - 12 * s, 6 * s, 3 * s, i * .6, 0, 6.2832); c.fill(); } c.strokeStyle = '#2b2118'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(px - 4, py - 15 * s); c.lineTo(px + 4, py - 14 * s); c.stroke(); if (V.lanyard) { c.fillStyle = '#d4352a'; c.fillRect(px - 2, py - 9 * s, 4, 6); } }
    const lx0 = hx + hw, ly0 = gy - hh * .88, lx1 = w * .44, ly1 = gy - hh * .5; c.strokeStyle = '#2b2118'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(lx1, gy + 2); c.lineTo(lx1, ly1 - 4); c.moveTo(lx0, ly0); c.quadraticCurveTo((lx0 + lx1) / 2, (ly0 + ly1) / 2 + h * .05, lx1, ly1); c.stroke();
    const sw = Math.sin(t * 4 + 1) * wd * .028;
    if (V.sock.fly) txt(c, '🧦', w * clamp(V.sock.ft / 7, 0, 1.05), h * .28 + Math.sin(V.sock.ft * 2.2) * h * .07, h * .08, V.sock.ft * 3);
    else if (V.sock.on) txt(c, '🧦', lerp(lx0, lx1, .55), (ly0 + ly1) / 2 + h * .035, h * .085, sw);
    if (V.hat > 0) { const gx = w * .5, gyy = h * .34 + Math.sin(t * 2) * 3; blob(c, gx, gyy, h * .07, '#fff', true); c.fillStyle = '#2b2118'; c.fillRect(gx - h * .045, gyy - h * .1, h * .09, h * .06); c.fillRect(gx - h * .07, gyy - h * .045, h * .14, h * .02); }
    c.fillStyle = rgb(mixc([140, 214, 126], [128, 160, 140], cl * .7)); c.strokeStyle = '#2b2118'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, h); c.lineTo(0, h * .88); c.bezierCurveTo(w * .3, h * .8, w * .6, h * .95, w, h * .84); c.lineTo(w, h); c.fill(); c.stroke();
    if (fg > .02) { for (let i = 0; i < 3; i++) { const rg = c.createRadialGradient(w * (.2 + i * .3) + Math.sin(t * .2 + i) * 12, h * .82, 4, w * (.2 + i * .3), h * .82, w * .4); rg.addColorStop(0, rgb(COL.fog, fg * .7)); rg.addColorStop(1, rgb(COL.fog, 0)); c.fillStyle = rg; c.fillRect(0, h * .3, w, h * .7); } c.fillStyle = rgb(COL.fog, fg * .3); c.fillRect(0, 0, w, h); }
    drawColin(c, V.colin.f * w, h * .91, h * .0027, t, V);
    if (V.cliffUp) { const ci2 = n >= 2 ? 1 : 0, rr2 = h * (.07 + .022 * ((ci2 * 7) % 4)); drawCliff(c, n ? V.cx[ci2] * w : w * .5, n ? h * (.14 + (ci2 % 3) * .12) + Math.sin(t * .5 + ci2) * 3 - rr2 * .85 : h * .3, h * .0024, t, wd, V.t < V.cliffWave); }
    const sq = V.t - V.swarmT0; if (sq >= 0 && sq < 3.6) { const q = sq / 3.6; for (let i = 0; i < 7; i++) txt(c, '🦋', w * (.12 + i * .11 + q * (i % 2 ? .5 : -.08)), h * (1.05 - q * 1.25) + Math.sin(V.t * 9 + i) * h * .04, h * .1, Math.sin(V.t * 7 + i) * .4); }
    for (let i = 0; i < V.fx.length; i++) { const e = V.fx[i], f = FXD[e.id]; if (f) { V_SEED = e.seed; c.save(); f(c, clamp((V.t - e.t0) / e.dur, 0, .9999), V.t - e.t0, w, h, V); c.restore(); } }
    const pa = V.pa;
    if (V.pk === 'snow') { c.fillStyle = '#fff'; c.beginPath(); for (let i = 0; i < pa.length; i++) circ(c, pa[i].x + Math.sin(t * 2 + pa[i].k * 9) * 3, pa[i].y, 1.4 + pa[i].k * 1.6); c.fill(); }
    else if (V.pk === 'hail') { c.fillStyle = '#ffffff'; c.strokeStyle = '#4a6a85'; c.lineWidth = 1.2; for (let i = 0; i < pa.length; i++) { c.fillRect(pa[i].x, pa[i].y, 5, 5); c.strokeRect(pa[i].x, pa[i].y, 5, 5); } }
    else { c.strokeStyle = 'rgba(60,100,160,.75)'; c.lineWidth = 1.3; c.beginPath(); const sl = wd * .6; for (let i = 0; i < pa.length; i++) { c.moveTo(pa[i].x, pa[i].y); c.lineTo(pa[i].x - sl * .35, pa[i].y - 9 - pa[i].k * 5); } c.stroke(); }
    if (V.flash > 0 || o.stillTint) { c.fillStyle = 'rgba(255,255,255,' + (o.stillTint ? .25 : V.flash * .8) + ')'; c.fillRect(0, 0, w, h); if (V.flash > .3 && !o.stillTint) { c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); let zx = w * (.2 + V.bolt * .6), zy = 0; c.moveTo(zx, zy); while (zy < h * .7) { zy += h * .1; zx += (V.bolt * 7 % 1 - .5) * 60 + Math.sin(zy) * 20; c.lineTo(zx, zy); } c.stroke(); } }
  }

  P.registerModule({
    id: ID,
    title: 'Weather Controller',
    tagline: 'Move the sliders. The sky has noted this and will be doing something else.',
    icon: '🌦️',
    category: 'game',
    unlockCost: 0,
    tags: ['skill', 'sky', 'control'],
    mount(root, api) {
      const el = api.el, C = n => 'm-weather-controller-' + n, now = () => api.now();
      const sv = api.save.get('v1', {}) || {};
      const num = (x, d) => fin(Number(x), d);
      const S = {
        dead: false, t: 0, T: 0, pt: 0, beat: 0, post: false, mode: 'play', base: 'play', until: 0, fired: {}, loops: Math.max(0, num(sv.loops, 0) | 0), best: Math.max(0, num(sv.bestCombo, 0) | 0),
        moves: { sun: 0, rain: 0, wind: 0, cloud: 0, dial: 0, fog: 0 }, gordonSeen: !!sv.gordonSeen,
        R: { sun: 15, rain: 3, wind: 5, cloud: 9, temp: 7.5, fog: 0 }, A: { sun: 1.5, rain: 10, wind: 3, cloud: 12, temp: 4.5, fog: 2 }, ph: { sun: 0, rain: 1.3, wind: 2.6, cloud: 3.9, temp: .7, fog: 5.2 },
        hopCd: {}, drag: {}, rel: {}, kbT: {}, recPend: {}, occ: {}, lastG: {}, lastTs: null, lastDraw: -99, frameN: 0, lastTick: now(),
        lastInput: now(), lastAlign: now(), comboAt: now(), combo: 0, alignN: 0, hopped: false, obeyUntil: 0, hushUntil: 0, mgAt: -1e9, cliffSay: -1e9, bubAt: -1e9, bubUntil: 0, awardAt: 0, hopSfxAt: 0, hopMeh: 0, hopMehAt: 0, hopsMin: [], quotaSaid: false,
        settles: 0, loopSettles: 0, inputs: 0, firstRel: true, mv: [], noBuf: [], nothingRun: 0, netBuf: [], netLeave: 0, napUntil: 0, indoorUntil: 0, titleUntil: 0, dropDone: false, dropSay: 0, sacredCd: 0,
        credit: 0, claimPend: false, ego: 0, egoSaid: {}, capSaid: false, disputes: 0, reqs: 0, forms: 0, formBuf: [], stampsN: 0, formOpen: false, fogSince: 0, keyFog: false, theta: 180, dialLast: null, lapsSaid: 0,
        agenda: [], planIdx: 0, planEnd: 0, force: null, diaryN: 0, extras: [], boost: null, freezeUntil: 0, gift: null, flyId: 0, inc: 3304, nameBag: [], spawnIn: 0, flyFirst: true, season2: false, perm: null, ledger: 0, loopSaid: false,
        fc: null, fcIn: 30, cd: null, cdIn: 20, letIn: 20, lastClaim: now(), subN: 0, subAt: 0, idleFlags: {}, hidden: false, resizeBuf: [], returnedAt: -1e9, favSaid: false, mgCount: 0,
        brace: false, sockOn: false, sockTaken: false, sockRet: 0, holdStart: 0, holdBeep: 0, cer: null, cerT0: 0, elseT0: 0, elseSaid: 0, reg: null, regDone: false, colinPass: 0, colinDownDone: false, umbrellaT: 0, effBag: [], gordonNext: false, boostFx: 0, wobbleUntil: 0, sockStamp: 0, dropFx: 0, lightCd: 0, stats: {},
        letN: 0, loopNo: 0, jarN: 0, wantElse: false, colinLook: 0, hatUntil: 0, stampUntil: 0, shufIn: 25, alignLoop: 0, postT0: 0, lastCh: 'sun', listenAt: 0, listenSaid: false, tinted: false, flashUntil: 0, firstCatch: false, spamAt: 0, favSaid: false, hiddenAt: 0, ambAt: 0, nothingAt: 0, pendingDispute: false, gordonNoAt: 0, resizeAt: 0,
        pokes: Math.max(0, num(sv.pokes, 0) | 0), pokeAt: 0, spam8At: -1e9, spam17At: -1e9, dispBuf: [], dispSpamAt: -1e9, auditDone: false, dennisDone: false, auditUntil: 0, colinStand: 0, colinWave: 0, perkUntil: 0, perkSaid: false,
        rareIn: 45, nothingTierAt: -1e9, netWarmAt: -1e9, dialGhostSaid: false, backAt: -1e9, cbDone: {},
        calls: Math.max(0, num(sv.calls, 0) | 0), colinCalled: !!sv.colinCalled, callsLoop: 0, callIn: 4, ring: null, callsMissed: 0, lunchDone: false, lunchUntil: 0, lunchAligns: 0, lockShow: false, listenPaid: false, fogNudged: false, jarIn: 0,
        rqDone: false, rq: null, lastAct: null, crawlAt: 0, crawlN: 0, crawlSeen: 0, hwDone: false, fmDone: false, hailSaid: false, stickY: 0
      };
      S.moves.sun = Math.max(0, num((sv.moves || {}).sun, 0) | 0); S.moves.rain = Math.max(0, num((sv.moves || {}).rain, 0) | 0); S.moves.wind = Math.max(0, num((sv.moves || {}).wind, 0) | 0);
      S.moves.cloud = Math.max(0, num((sv.moves || {}).cloud, 0) | 0); S.moves.dial = Math.max(0, num((sv.moves || {}).dial, 0) | 0); S.moves.fog = Math.max(0, num((sv.moves || {}).fog, 0) | 0);
      const V = { t: 0, fx: [], pa: [], cx: [.1, .32, .55, .74, .9, .2, .62], colin: { f: -.08, down: false, look: false, wave: false, stand: false }, sock: { on: false, fly: false, ft: 0 }, dennis: false, perk: false, lanyard: !!api.flag.get('dennis.promoted'), hat: 0, flash: 0, bolt: .3, pk: 'rain', priv: false, qc: false, dropT: -1, seed: 3, cliffUp: false, cliffWave: -99, swarmT0: -99, fbWx: '' };
      const TS = api.selftest ? 60 : 1, coarse = !!(window.matchMedia && window.matchMedia('(pointer:coarse)').matches);
      const E = {};

      /* ---------- DOM ---------- */
      const ink = '#2b2118';
      const ln = (a, b, c2, d, w) => el('line', { x1: a, y1: b, x2: c2, y2: d, stroke: ink, 'stroke-width': w || 2.5, 'stroke-linecap': 'round' });
      const ci = (x, y, r, f) => el('circle', { cx: x, cy: y, r: r, fill: f || ink });
      const pa = (d, f, s, w) => el('path', { d: d, fill: f || 'none', stroke: s || ink, 'stroke-width': w || 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      const faces = {
        smug: [ln(36, 41, 45, 41), ln(55, 41, 64, 41), pa('M54 34 q5 -4 10 -1'), pa('M42 54 q10 6 18 -3')],
        proud: [ci(41, 41, 2.4), ci(59, 41, 2.4), pa('M40 51 q10 12 20 0', '#fff'), pa('M36 35 q5 -3 10 0'), pa('M54 35 q5 -3 10 0')],
        confused: [ci(41, 41, 2.4), ci(59, 41, 3.8), pa('M42 54 q4 -3 8 0 t8 0'), pa('M54 33 l10 -3')],
        blink: [ln(36, 41, 46, 41), ln(54, 41, 64, 41), pa('M42 52 q8 4 16 0')],
        panic: [ci(41, 41, 4.5, '#fff'), ci(59, 41, 4.5, '#fff'), ci(41, 41, 1.6), ci(59, 41, 1.6), el('ellipse', { cx: 50, cy: 55, rx: 4, ry: 6, fill: ink })],
        tired: [ln(36, 43, 45, 45), ln(55, 45, 64, 43), pa('M37 47 q4 2 8 0', 'none', '#7a5a4a', 1.5), ln(43, 55, 57, 55)]
      };
      const faceEls = {};
      Object.keys(faces).forEach(k => { faceEls[k] = el('g', { class: C('face') }, faces[k]); });
      const cliffSvg = el('svg', { viewBox: '0 0 100 100', class: C('cliff'), 'aria-hidden': 'true' },
        pa('M8 100 q4 -36 42 -36 q38 0 42 36 z', '#3b4560'), pa('M41 64 l9 15 l9 -15 z', '#fff', ink, 1.5), pa('M48 70 l2 22 l2 -22 z', '#ff7a6b', ink, 1.2),
        ci(50, 42, 22, '#f2c9a0'), pa('M28 40 q-1 -26 22 -25 q23 0 22 25 q-8 -14 -22 -14 q-14 0 -22 14 z', '#7a4a21', ink, 1.5), ci(28, 44, 3, '#f2c9a0'), ci(72, 44, 3, '#f2c9a0'),
        faceEls.smug, faceEls.proud, faceEls.confused, faceEls.blink, faceEls.panic, faceEls.tired,
        el('g', { class: C('acc') + ' ' + C('abrace') }, el('rect', { x: 38, y: 60, width: 24, height: 8, rx: 3, fill: '#fff', stroke: ink, 'stroke-width': 1.5 })),
        el('g', { class: C('acc') + ' ' + C('amug') }, el('rect', { x: 66, y: 78, width: 14, height: 14, rx: 2, fill: '#fff', stroke: ink, 'stroke-width': 1.8 }), pa('M80 81 q7 3 0 9', 'none', ink, 1.8), ln(69, 84, 77, 84, 1.2)),
        el('g', { class: C('acc') + ' ' + C('aplq') }, el('rect', { x: 2, y: 70, width: 26, height: 14, rx: 2, fill: '#f2b933', stroke: ink, 'stroke-width': 1.8 }), ln(6, 75, 24, 75, 1.2), ln(6, 80, 20, 80, 1.2)),
        el('g', { class: C('acc') + ' ' + C('amon') }, el('rect', { x: 58, y: 2, width: 38, height: 28, rx: 3, fill: '#bfe6f5', stroke: ink, 'stroke-width': 2 }), el('rect', { x: 62, y: 6, width: 30, height: 20, fill: '#241b14' }), ci(77, 16, 5, '#f2c9a0'), ln(77, 30, 77, 38, 2)),
        el('g', { class: C('arm') }, ln(78, 92, 96, 70, 5), ci(97, 68, 4, '#f2c9a0')));
      faceEls.smug.classList.add(C('on'));
      const figbtn = el('button', { class: C('figbtn'), type: 'button', 'aria-label': 'Clifford Isobar. Dispute his credit (key C).', onclick: () => dispute() }, cliffSvg);
      E.chys = el('p', { class: C('chys'), 'aria-live': 'polite', text: '[Clifford is preparing to take credit.]' }); E.chyu = el('div', { class: C('chyu'), text: 'Forecast issued 4 seconds ago' });
      E.egof = el('div', { class: C('egof') });
      E.tv = el('div', { class: C('tv') }, figbtn, el('div', { class: C('chy') }, el('div', { class: C('chyt'), text: 'CLIFFORD ISOBAR, CHIEF OF WEATHER (SELF-APPOINTED)' }), E.chys, E.chyu, el('div', { class: C('ego'), title: 'Ego Meter' }, E.egof)));
      E.cv = el('canvas', { class: C('cv'), role: 'img', 'aria-label': 'The sky, as it actually is. Colin (Umbrella) walks across the bottom. Press K to poke Colin.' }); E.pipcv = el('canvas', { class: C('pipcv'), 'aria-hidden': 'true' });
      E.pip = el('div', { class: C('pip') }, el('div', { class: C('piplab'), text: 'WHAT YOU ASKED FOR' }), E.pipcv); E.gotlab = el('div', { class: C('gotlab'), 'aria-hidden': 'true', text: 'WHAT YOU GOT' });
      E.bubble = el('div', { class: C('bubble'), 'aria-hidden': 'true', hidden: true }); E.note = el('div', { class: C('note'), text: 'Plan' });
      E.tint = el('div', { class: C('tint') }); E.sockstamp = el('div', { class: C('sockstamp'), text: 'STILL ON A JOURNEY', hidden: true });
      E.fxo = el('div', { class: C('fxo') }, E.tint, E.sockstamp);
      E.crawlT = el('b'); E.crawl = el('div', { class: C('crawl'), hidden: true, 'aria-hidden': 'true' }, E.crawlT); E.rq = el('div', { class: C('rq'), hidden: true, role: 'group', 'aria-label': 'Rain on Colin?' });
      E.hwcv = el('canvas'); E.hwnote = el('div', { class: C('note') }); E.hw = el('div', { class: C('hw'), hidden: true, 'aria-hidden': 'true' }, E.hwcv, E.hwnote);
      E.sky = el('div', { class: C('sky') }, E.cv, E.pip, E.gotlab, E.bubble, E.note, E.fxo, E.hw, E.crawl, E.rq);
      E.diaryOl = el('ol'); E.diary = el('details', { class: C('diary'), hidden: true, open: window.innerWidth > 480 }, el('summary', { text: "Weather's Diary" }), E.diaryOl);
      const lnode = (x, y, tx) => el('g', { class: C('ln') }, el('rect', { x: x - 28, y: y - 10, width: 56, height: 20, rx: 6, fill: '#fff', stroke: ink, 'stroke-width': 1.5 }), el('text', { x: x, y: y + 3.5, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: ink, text: tx }));
      const larr = d => el('path', { d: d, fill: 'none', stroke: ink, 'stroke-width': 1.6, 'marker-end': 'none', 'stroke-dasharray': '4 2' });
      E.lg = [lnode(36, 18, 'Butterfly'), lnode(164, 18, 'Weather'), lnode(164, 72, 'Clifford'), lnode(36, 72, 'Credit')];
      E.la = [larr('M64 18 H136'), larr('M164 30 V60'), larr('M136 72 H64'), larr('M36 60 V30')];
      E.lloop = el('text', { x: 100, y: 48, 'text-anchor': 'middle', 'font-size': 9, 'font-style': 'italic', fill: ink, text: '(see Butterfly)', opacity: 0 });
      E.ledger = el('details', { class: C('ledger'), hidden: true, open: window.innerWidth > 480 }, el('summary', { text: window.innerWidth > 480 ? 'Causality Ledger' : 'Ledger' }), el('svg', { viewBox: '0 0 200 90', class: C('lsvg'), role: 'img', 'aria-label': 'Causality Ledger: Butterfly to Weather to Clifford to Credit to Butterfly' }, E.la, E.lg, E.lloop));
      E.side = el('div', { class: C('side') }, E.tv, E.diary, E.ledger); E.lower = el('div', { class: C('lower') }); E.left = el('div', { class: C('left') }, E.sky);
      E.hint = el('p', { class: C('hint'), tabindex: '-1', text: K.hint });
      E.live = el('div', { class: C('sr'), 'aria-live': 'polite' });
      E.rows = {}; E.ghosts = {}; E.inputs = {}; E.labs = {}; E.ros = {};
      const rowEls = CHN.map(ch => {
        const inp = el('input', { class: C('in'), type: 'range', min: 0, max: 15, step: .5, value: S.R[ch], 'aria-label': ch, title: coarse ? undefined : K.lock, oninput: ev => { if (S.occ[ch]) { ev.target.value = String(S.R[ch]); return; } onInput(ch, parseFloat(ev.target.value)); }, onpointerdown: () => { if (S.occ[ch]) return; S.drag[ch] = true; touched(); }, onpointerup: () => endDrag(ch), onpointercancel: () => endDrag(ch), onlostpointercapture: () => endDrag(ch), onblur: () => endDrag(ch),
          onchange: () => { if (!S.drag[ch] && now() - (S.rel[ch] || -1e9) > 700) kbSettle(ch); }, onkeydown: ev => sliderKey(ch, ev), onpointermove: ev => dodgeHover(ch, ev) });
        const gh = el('div', { class: C('ghost') + (ch === 'sun' ? ' ' + C('tag') : ''), 'aria-hidden': 'true', style: '--g:' + (S.A[ch] / 15).toFixed(4) }, el('svg', { viewBox: '0 0 20 20' }, pa('M5 15 q-4 0 -3 -4 q1 -3 5 -2 q2 -4 6 -2 q4 0 4 4 q1 4 -3 4 z', '#fff', ink, 1.3), ci(8, 11, .9), ci(12, 11, .9)));
        const lab = el('span', { class: C('lab') }), ro = el('span', { class: C('ro'), text: '' });
        E.inputs[ch] = inp; E.ghosts[ch] = gh; E.labs[ch] = lab; E.ros[ch] = ro;
        const row = el('div', { class: C('row') }, lab, ro, el('div', { class: C('trk') }, inp, gh), el('div', { class: C('ticks'), 'aria-hidden': 'true' }, el('span', { style: 'left:calc(var(--tw)/2)', text: '0' }), el('span', { style: 'left:50%', text: '7 1/2 ★' }), el('span', { style: 'left:calc(100% - var(--tw)/2)', text: '15' })),
          ch === 'sun' ? (E.sunnote = el('div', { class: C('sunnote'), text: K.note })) : null);
        E.rows[ch] = row; return row;
      });
      const dialTicks = []; for (let i = 0; i < 31; i++) { const a = i / 30 * 6.2832, r1 = i % 5 === 0 ? 36 : 39, r2 = 43; dialTicks.push(ln(50 + Math.sin(a) * r1, 50 - Math.cos(a) * r1, 50 + Math.sin(a) * r2, 50 - Math.cos(a) * r2, i % 5 === 0 ? 2 : 1)); }
      E.needle = el('g', { class: C('needle') }, ln(50, 50, 50, 16, 3.5), ci(50, 50, 5, '#ff7a6b'));
      E.dghost = el('g', {}, el('circle', { cx: 50, cy: 7, r: 5.5, fill: 'rgba(255,255,255,.6)', stroke: ink, 'stroke-width': 1.6, 'stroke-dasharray': '2.5 1.8' }));
      E.dial = el('div', { class: C('dial'), role: 'slider', tabindex: '0', 'aria-label': 'Temperature dial (key T). Spin it freely.', 'aria-valuemin': 0, 'aria-valuemax': 15, 'aria-valuenow': 7.5, 'aria-valuetext': 'Moderately', onpointerdown: ev => dialDown(ev), onpointermove: ev => dialMove(ev), onpointerup: () => endDrag('temp'), onpointercancel: () => endDrag('temp'), onlostpointercapture: () => endDrag('temp'), onkeydown: ev => dialKey(ev) },
        el('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true', style: 'width:100%;height:100%;display:block;pointer-events:none' }, el('circle', { cx: 50, cy: 50, r: 46, fill: '#fffaf0', stroke: '#f2b933', 'stroke-width': 7 }), el('circle', { cx: 50, cy: 50, r: 46, fill: 'none', stroke: ink, 'stroke-width': 1.2 }), dialTicks, E.dghost, E.needle));
      E.dword = el('div', { class: C('dword'), text: 'Moderately' }); E.laps = el('div', { class: C('laps'), text: 'Laps: 0, none of them useful' });
      E.lghost = el('div', { class: C('lghost'), 'aria-hidden': 'true' });
      E.knob = el('button', { class: C('knob'), type: 'button', role: 'slider', 'aria-orientation': 'vertical', 'aria-valuemin': 0, 'aria-valuemax': 15, 'aria-valuenow': 0, 'aria-label': 'Fog lever. Hold Space or Down arrow to pull it.', onkeydown: ev => leverKey(ev, true), onkeyup: ev => leverKey(ev, false), onblur: () => leverRelease() });
      E.lever = el('div', { class: C('lever'), onpointerdown: ev => leverDown(ev), onpointermove: ev => leverMove(ev), onpointerup: () => leverRelease(), onpointercancel: () => leverRelease(), onlostpointercapture: () => leverRelease() }, E.lghost, E.knob);
      E.alibi = el('span', { class: C('alibi'), title: 'ALIBI', text: '📄' }); E.jar = el('div', { class: C('jar'), role: 'img', 'aria-label': 'Butterfly jar, containing one folded paper marked ALIBI' }, E.alibi); E.jlab = el('div', { class: C('jlab'), text: K.jarEmpty }); E.jarw = el('div', { class: C('jarw') }, E.jar, E.jlab);
      E.nothing = el('button', { class: C('nothing'), type: 'button', onclick: () => doNothing() }, 'DO', el('br'), 'NOTHING');
      E.reqbtn = el('button', { class: C('btn'), type: 'button', hidden: true, onclick: () => openForm() }, 'REQUEST FORM (R)');
      E.phoneT = el('span', { text: '' }); E.phone = el('button', { class: C('phone'), type: 'button', hidden: true, onclick: () => answerCall() }, el('b', { 'aria-hidden': 'true', text: '📞' }), E.phoneT);
      E.tray = el('div', { class: C('tray'), 'aria-label': 'Paper tray' });
      E.fWx = el('select', { 'aria-label': 'Preferred Weather' }, FORM_WX.map(x => el('option', { value: x }, x))); E.fUr = el('select', { 'aria-label': 'Urgency' }, FORM_UR.map(x => el('option', { value: x }, x)));
      E.fRe = el('input', { type: 'text', maxlength: 60, 'aria-label': 'Reason (optional)', placeholder: 'optional' }); E.stamp = el('div', { class: C('stamp'), hidden: true });
      E.form = el('form', { class: C('form'), hidden: true, onsubmit: ev => { ev.preventDefault(); submitForm(); }, onkeydown: ev => { if (ev.key === 'Escape') closeForm(); } },
        el('label', {}, 'Preferred Weather', E.fWx), el('label', {}, 'Urgency', E.fUr), el('label', {}, 'Reason', E.fRe), el('button', { type: 'submit', class: C('btn') }, 'Submit'), el('button', { type: 'button', class: C('btn'), onclick: () => closeForm() }, 'Cancel'), E.stamp);
      E.cons = el('div', { class: C('console') },
        el('div', { class: C('col') }, rowEls, E.tray),
        el('div', { class: C('col') }, E.dial, E.dword, E.laps, el('div', { class: C('lvw') }, E.lever, el('div', { class: C('lvt'), text: 'FOG LEVER. Pull to remove fog. It will come back.' }))),
        (E.col3 = el('div', { class: C('col') }, E.reqbtn, E.phone, E.form)));
      E.mover = el('div', { class: C('mover') }, E.jarw, E.nothing); /* jar + DO NOTHING live in the right column on wide screens (above the fold) and in the console on narrow ones */
      E.moverWide = null; E.aux = el('div', { class: C('aux') });
      /* wide: the "what you asked for" picture and DO NOTHING sit under Clifford (clear of the house and Colin's lane), the jar heads the right-hand column of the console. narrow: the picture is a thumbnail in the sky, jar + button open the console's last column */
      function placeMover() {
        const wide = window.innerWidth >= 980; if (E.moverWide === wide) return; E.moverWide = wide;
        if (wide) { E.aux.appendChild(E.pip); E.aux.appendChild(E.nothing); E.side.appendChild(E.aux); E.lower.appendChild(E.diary); E.lower.appendChild(E.ledger); E.left.appendChild(E.lower); E.col3.insertBefore(E.jarw, E.col3.firstChild); if (E.mover.parentNode) E.mover.remove(); }
        else { E.sky.insertBefore(E.pip, E.gotlab); E.mover.appendChild(E.jarw); E.mover.appendChild(E.nothing); E.col3.insertBefore(E.mover, E.col3.firstChild); if (E.aux.parentNode) E.aux.remove(); E.side.appendChild(E.diary); E.side.appendChild(E.ledger); if (E.lower.parentNode) E.lower.remove(); }
      }
      E.ledConf = el('span'); E.ledObey = el('span'); E.ledFly = el('span'); E.ledCred = el('span'); E.ledAli = el('span', { hidden: true });
      E.s2 = el('button', { class: C('btn') + ' ' + C('s2'), type: 'button', hidden: true, onclick: () => season2() }, 'Season 2: Same Weather');
      E.led = el('div', { class: C('led') }, E.ledConf, E.ledObey, E.ledFly, E.ledCred, E.ledAli, E.s2);
      E.net = el('div', { class: C('net'), 'aria-hidden': 'true', text: '🥅' }); E.rc = el('div', { class: C('rc'), hidden: true, 'aria-hidden': 'true', text: '☁️💤' });
      E.flies = el('div', { class: C('flies') }, E.net, E.rc);
      E.holdq = el('small', { text: '' }); E.hold = el('div', { class: C('hold'), hidden: true }, 'ON HOLD', E.holdq); E.veil = el('div', { class: C('veil') }, E.hold);
      E.certTitle = el('h3', { text: 'CERTIFICATE OF DOMINION OVER WEATHER (PROVISIONAL)' }); E.certBody = el('p'); E.certExtra = el('p', { text: 'Countersignature required from Weather. Weather is out.' });
      E.certNotes = el('div', { class: C('notes') });
      E.cert = el('div', { class: C('cert'), hidden: true }, el('div', { class: C('paper') }, E.certTitle, E.certBody, E.certNotes, el('p', { class: C('sig'), text: 'Weather (Confident)' }), E.certExtra));
      E.app = el('div', { class: C('app') }, el('div', { class: C('top') }, E.left, E.side), E.hint, E.led, E.cons, E.live, E.flies, E.veil, E.cert);
      root.appendChild(E.app);
      api.setTitle(TITLE);
      const ctx = E.cv.getContext ? E.cv.getContext('2d') : null, pctx = E.pipcv.getContext ? E.pipcv.getContext('2d') : null;
      let rmC = false, rmAt = -1e9; /* cached: matchMedia allocates a MediaQueryList on every call */
      const reduced = () => { const t = now(); if (t - rmAt > 500) { rmAt = t; rmC = !!(root.closest && root.closest('.pm-reduce-motion')) || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } return rmC; };
      function paintHint() { E.hint.textContent = K.hint + (S.beat >= 1 ? '\n' + K.netHint : ''); }

      /* ---------- saying things ---------- */
      const L = (cat, v) => { const x = parse(api.line('m:weather-controller:' + cat)); return { t: fill(x.t, v), mood: x.mood }; };
      const KL = (key, v) => { const x = parse(K[key] || ''); return { t: fill(x.t, v), mood: x.mood }; };
      const mgmtT = (t, mood, pr) => { if (S.dead || !t || now() < S.hushUntil) return false; return api.say(t, { who: 'Management', mood: mood || 'neutral', priority: pr || 0 }); };
      const mg = (cat, v, pr) => { const x = L(cat, v); return mgmtT(x.t, x.mood, pr); };
      const mk = (key, v, pr) => { const x = KL(key, v); return mgmtT(x.t, x.mood, pr); };
      const deskT = t => { if (S.dead || !t || now() < S.hushUntil) return false; return api.say(t, { who: 'Butterfly Desk', mood: 'neutral', priority: 0 }); };
      const setFace = m => { const k = m === 'disappointed' ? 'tired' : faceEls[m] ? m : m === 'neutral' ? 'smug' : 'smug'; Object.keys(faceEls).forEach(n => faceEls[n].classList.toggle(C('on'), n === k)); };
      function cliff(t, mood, pr) {
        if (S.dead || !t || now() < S.hushUntil) return;
        t = String(t).slice(0, 200); E.chys.textContent = t; E.chys.classList.remove(C('strike')); setFace(mood || 'smug');
        E.tv.classList.add(C('point')); api.setTimeout(() => { if (!S.dead) E.tv.classList.remove(C('point')); }, 700);
        const n = now(); if (pr >= 1) { S.cliffSay = n; api.say(t, { who: 'Clifford Isobar', mood: mood === 'tired' ? 'disappointed' : (mood || 'smug'), priority: pr || 0 }); }
      }
      const cg = (cat, v, pr) => { const x = L(cat, v); cliff(x.t, x.mood, pr); };
      const ck = (key, v, pr) => { const x = KL(key, v); cliff(x.t, x.mood, pr); };
      const cap = t => { if (S.dead || !t) return; E.live.textContent = t; };
      function weatherSay(t, force) {
        const n = now(); if (S.dead || n < S.hushUntil || !t || (!force && n - S.bubAt < 12000)) return;
        S.bubAt = n; S.bubUntil = n + 3800; E.bubble.textContent = t; E.bubble.hidden = false; cap('Weather says: ' + t);
      }
      function addSlip(text, head, sig) {
        if (S.dead) return; E.tray.appendChild(el('div', { class: C('slip') }, head ? el('b', { text: head }) : null, el('span', { text: String(text).replace(/7 1\/2/g, '7 1/2') }), sig ? el('i', { text: sig }) : null));
        while (E.tray.children.length > 4) E.tray.removeChild(E.tray.firstChild);
      }
      const labelsNow = () => { const set = S.season2 ? S2LAB : S.beat >= 4 ? B4LAB : BASELAB; return CHN.map((ch, i) => set[S.perm ? S.perm[i] : i]); };
      function paintLabels() {
        const l = labelsNow(); CHN.forEach((ch, i) => {
          const occ = !!S.occ[ch]; E.labs[ch].textContent = ICON[ch] + ' ' + (occ ? 'OCCUPIED - on break' : l[i]); E.inputs[ch].setAttribute('aria-label', l[i] + (occ ? ' (occupied by a butterfly)' : '')); E.rows[ch].classList.toggle(C('occ'), occ);
        });
      }
      const lab = ch => labelsNow()[CHN.indexOf(ch)] || CHNAME[ch];
      const setT = (e, key, t) => { if (S.stats[key] !== t) { S.stats[key] = t; e.textContent = t; } };
      function paintLed() {
        const n = now(); let conf = S.hopped ? '100.0%' : '100%'; if (S.beat >= 1 && n - S.lastAlign > 60000) conf = '100% (+/-0%)'; if (S.mode === 'cert') conf = 'yes';
        let ob = '0.0%'; if (S.base === 'elsewhere') ob = '100% (holding)'; else if (S.mode === 'listening' || S.mode === 'calm' || n < S.obeyUntil) ob = '100.0%';
        setT(E.ledConf, 'conf', 'Confidence: ' + conf); setT(E.ledObey, 'ob', 'Obedience: ' + ob); E.ledObey.classList.toggle(C('flash'), ob !== '0.0%');
        setT(E.ledFly, 'fly', 'Butterflies at Large: ' + Math.round(fin(B.length, 0)));
        const cr = Math.round(fin(S.credit, 0)), pct = Math.round(cr * 7.5); setT(E.ledCred, 'cr', 'Credit Claimed: ' + (cr >= 14 ? (pct >= 1000 ? 'Credit now exceeds weather' : cr + ' (' + pct + '% of weather)') : cr));
        E.ledAli.hidden = S.beat < 2; setT(E.ledAli, 'al', 'Alignments: ' + Math.round(fin(S.combo, 0)));
      }
      const B = [];

      /* ---------- input: sliders, ghosts, alignment, dial, lever, buttons ---------- */
      const blocked = () => S.mode === 'hold' || S.mode === 'cert' || S.mode === 'drop';
      const dialWord = v => DIAL_WORDS[clamp(Math.floor(fin(v, 7.5) / 15 * 12), 0, 11)];
      const q5 = v => Math.round(fin(v, 0) * 2) / 2;
      /* every input, even a mouse wiggle, ends an idle; coming back after a long one gets a remark */
      function noteInput() {
        const n = now(), idle = n - S.lastInput; S.lastInput = n;
        if (idle > 90000 && S.mode === 'play' && S.base === 'play' && n - S.backAt > 30000) { S.backAt = n; const m = Math.max(1, Math.round(idle / 60000)); mk('back1', { mins: m + (m === 1 ? ' minute' : ' minutes') }); }
      }
      function touched() { noteInput(); S.idleFlags = {}; if (S.mode === 'listening') breakListening(); }
      function pushMove() {
        const n = now(); S.mv.push(n); while (S.mv.length && n - S.mv[0] > 5000) S.mv.shift(); const c = S.mv.length;
        if (c >= 20 && S.mode === 'play' && S.base === 'play') whiplash();
        else if (c === 8 && n - S.spam8At > 25000) { S.spam8At = n; cg('spamC'); }
        else if (c === 12 && n - (S.spamAt || 0) > 20000) { S.spamAt = n; mg('spam'); }
        else if (c === 17 && n - S.spam17At > 25000) { S.spam17At = n; weatherSay(L('spamBubble').t, true); }
      }
      function syncInput(ch, v) {
        if (ch === 'temp') { S.theta = v / 15 * 360; E.needle.setAttribute('transform', 'rotate(' + S.theta.toFixed(1) + ' 50 50)'); paintDial(v); } else if (E.inputs[ch]) E.inputs[ch].value = String(v);
      }
      function hop(ch, force, from) {
        const A = S.A[ch], R = from === undefined ? S.R[ch] : from; let dir = A > R ? 1 : A < R ? -1 : (api.chance(.5) ? 1 : -1); const d = force ? 5 + api.rand() * 3 : 3 + api.rand() * 3;
        let nA = A + dir * d; if (nA < 0 || nA > 15) { dir = -dir; nA = A + dir * d; } S.A[ch] = clamp(fin(nA, 7), 0, 15); S.hopCd[ch] = 1.1; S.hopped = true;
        const g = E.ghosts[ch]; if (g) { g.classList.remove(C('hop')); if (!reduced()) { void g.offsetWidth; g.classList.add(C('hop')); } }
        const n = now(); if (n - S.hopSfxAt > 250) { S.hopSfxAt = n; api.sfx('boing'); }
        if (force) return;
        api.stat.inc('weather-controller.ghostHops'); S.hopsMin.push(n); while (S.hopsMin.length && n - S.hopsMin[0] > 60000) S.hopsMin.shift();
        if (n - S.hopMehAt > 60000) { S.hopMehAt = n; S.hopMeh = 0; }
        if (S.hopMeh < 1) { S.hopMeh += .05; api.award(.05, 'ghost hop'); } else if (!S.quotaSaid) { S.quotaSaid = true; mk('quota'); }
        if (S.hopsMin.length % 8 === 0) mg('ghost', { n: S.hopsMin.length });
      }
      const giftOn = ch => !!(S.gift && S.gift.ch === ch && now() < S.gift.until);
      function onInput(ch, v) {
        if (S.dead) return; const old = S.R[ch]; v = clamp(fin(v, old), 0, 15); S.R[ch] = v; S.inputs++; touched();
        if (blocked()) return;
        S.nothingRun = 0; if (S.gift && !S.gift.ch && ch !== 'temp' && ch !== 'fog') S.gift.ch = ch; /* the gift goes to whichever slider is touched next */
        if (S.mode === 'play' && S.base === 'play' && ch !== 'temp' && ch !== 'fog') { const dn = Math.abs(S.A[ch] - v), dold = Math.abs(S.A[ch] - old); if (dn < 1.2 && dn < dold && !(S.hopCd[ch] > 0) && !giftOn(ch)) hop(ch, false, v); }
        else if (S.mode === 'play' && S.base === 'play' && ch === 'temp' && !S.dialGhostSaid && Math.abs(S.A.temp - v) < 1.2) { S.dialGhostSaid = true; api.setTimeout(() => mk('dialGhost'), 600); }
      }
      function dodgeHover(ch, ev) {
        if (S.beat < 4 || S.mode !== 'play' || S.base !== 'play' || S.hopCd[ch] > 0 || S.drag[ch] || giftOn(ch)) return;
        const r = E.inputs[ch].getBoundingClientRect(); if (!(r.width > 40)) return; const tw = r.height || 30, u = (ev.clientX - r.left - tw / 2) / (r.width - tw) * 15;
        if (Math.abs(S.A[ch] - u) < 1.2) hop(ch, false, u);
      }
      function endDrag(ch) { if (!S.drag[ch]) return; S.drag[ch] = false; if (ch === 'fog') return; settle(ch); }
      function kbSettle(ch) { api.clearTimeout(S.kbT[ch]); S.kbT[ch] = api.setTimeout(() => { if (!S.dead) settle(ch); }, 350); }
      /* a release that happens outside the control (pointer let go over the page) must still settle, or the drag flag sticks until blur */
      const dragKeys = CHN.concat(['temp', 'fog']);
      function globalRelease() { dragKeys.forEach(ch => { if (S.drag[ch]) { if (ch === 'fog') leverRelease(); else endDrag(ch); } }); }
      api.on(window, 'pointerup', globalRelease); api.on(window, 'pointercancel', globalRelease);
      function sliderKey(ch, ev) {
        if (S.dead) return; const k = ev.key;
        if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
          ev.preventDefault(); if (S.occ[ch] || blocked()) return;
          const v = clamp(S.R[ch] + (k === 'ArrowLeft' || k === 'ArrowDown' ? -1 : 1) * (ev.shiftKey ? .5 : 1), 0, 15); E.inputs[ch].value = String(v); onInput(ch, v); kbSettle(ch);
        } else if (k === ' ' || k === 'Enter') { ev.preventDefault(); settle(ch); }
      }
      const elseRel = [];
      function settle(ch) {
        const t = now(); if (S.dead || t - (S.rel[ch] || 0) < 80) return; S.rel[ch] = t; touched();
        if (blocked()) return; if (ch !== 'temp' && S.occ[ch]) return;
        S.settles++; S.loopSettles++; S.nothingRun = 0; if (ch !== 'temp') S.lastCh = ch; api.stat.inc('weather-controller.sliderMoves'); S.moves[ch === 'temp' ? 'dial' : ch]++; S.lastAct = { ch: ch, v: q5(S.R[ch]), at: t, rep: false };
        if (!S.fmDone) { S.fmDone = true; E.ghosts.sun.classList.remove(C('tag')); api.setTimeout(() => api.achieve('weather-controller.first-move'), 9000); } /* held back so its toast does not stamp on the welcome and Clifford's header */
        if (S.base === 'elsewhere') {
          while (elseRel.length && t - elseRel[0] > 60000) elseRel.shift(); if (elseRel.length < 12) { elseRel.push(t); api.award(.2, 'elsewhere'); } return;
        }
        pushMove(); if (S.mode !== 'play' && S.mode !== 'listening' && S.mode !== 'calm' && S.mode !== 'fogged') return;
        if (t < S.indoorUntil) { const nv = api.randInt(0, 30) / 2; S.R[ch] = nv; syncInput(ch, nv); }
        if (t - S.awardAt > 600) { S.awardAt = t; api.award(.1, 'release'); }
        if (Math.abs(S.A[ch] - S.R[ch]) < .4) alignment(ch);
        if (!S.recPend[ch]) { S.recPend[ch] = true; api.setTimeout(() => { S.recPend[ch] = false; receipt(ch); }, 350); }
        if (S.firstRel) { S.firstRel = false; if (ch === 'sun' && S.R.sun >= 14) api.setTimeout(() => ck('brilliant', null, 1), 500); }
        const first = { 1: 'firstIn', 3: 'base3', 6: 'base1', 10: 'base2' }[S.settles];
        if (first && t - S.mgAt > 1500) { S.mgAt = t; mk(first); } else chanLine(ch);
        if (api.chance(.3)) weatherSay(L('skybubble').t);
        if (api.chance(.7)) claimLater(api.randInt(300, 1200));
        sacredCheck();
      }
      function chanLine(ch) {
        const n = now(); if (n - S.mgAt < 3000 || S.dead) return; S.mgAt = n;
        mg(ch === 'temp' ? 'dial' : ch === 'fog' ? 'lever' : ch, { n: q5(S.R[ch]), a: Math.round(S.A[ch]), word: dialWord(S.R.temp) });
      }
      function alignment(ch) {
        const n = now(); S.combo++; S.alignN++; S.alignLoop++; S.comboAt = n; S.lastAlign = n; S.best = Math.max(S.best, S.combo); S.obeyUntil = n + 600;
        api.stat.inc('weather-controller.alignments'); api.stat.max('weather-controller.bestCombo', S.combo); api.achieve('weather-controller.alignment'); api.sfx('ding'); api.confetti(undefined, undefined, 16); api.award(2, 'alignment');
        S.gift = null; mg('align', { n: S.combo }, 1); if (S.combo >= 3 && S.combo % 3 === 0) mk('combo', { n: S.combo });
        if (S.beat >= 7) addSlip(K.coinc, 'RECEIPT', 'Weather (Confident)');
        api.setTimeout(() => cg('alignC'), 800); api.setTimeout(() => reconsider(ch), 600); paintLed();
        if (n < S.lunchUntil) { S.lunchAligns++; api.stat.inc('weather-controller.lunchAligns'); api.award(1, 'ambush'); api.setTimeout(() => mk('lunchAlign'), 1500); }
      }
      function reconsider(ch) { if (S.dead || S.mode === 'cert') return; S.obeyUntil = 0; hop(ch, true, S.R[ch]); api.sfx('sad'); mg('reconsider'); paintLed(); }
      const prevR = { sun: 15, rain: 3, wind: 5, cloud: 9, temp: 7.5, fog: 0 };
      function receipt(ch) {
        if (S.dead || S.mode === 'cert') return; S.reqs++; const n = S.reqs; api.stat.inc('weather-controller.requests');
        const st = n < 5 ? 'Noted.' : n < 10 ? 'Noted with Concern.' : n < 15 ? 'Noted and Filed Under Weather.' : n < 25 ? 'Noted by a Committee of One.' : n < 40 ? 'Noted.' : 'Noted. Please Stop.';
        const x = L('receipt', { n: String(n).padStart(4, '0'), slider: CHNAME[ch], to: q5(S.R[ch]), from: q5(prevR[ch]), status: st, thing: api.pick(WXWORDS) });
        prevR[ch] = S.R[ch]; addSlip(x.t, 'RECEIPT'); if (n === 77) indoor(); else if (n % 9 === 0) mg('recMgmt', { n: n });
      }
      /* dial */
      function dialAng(ev) { const r = E.dial.getBoundingClientRect(); if (!(r.width > 1)) return null; return Math.atan2(ev.clientX - (r.left + r.width / 2), -(ev.clientY - (r.top + r.height / 2))) * 57.29578; }
      function dialDown(ev) { if (blocked()) return; S.drag.temp = true; S.dialLast = dialAng(ev); touched(); try { E.dial.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic pointers have no capture */ } }
      function dialMove(ev) {
        if (!S.drag.temp) return; const a = dialAng(ev); if (a === null || S.dialLast === null || !Number.isFinite(a)) { S.dialLast = a; return; }
        let d = a - S.dialLast; if (d > 180) d -= 360; if (d < -180) d += 360; S.dialLast = a; S.theta += d; applyDial();
      }
      function applyDial() {
        S.theta = fin(S.theta, 180); const q = clamp(q5((((S.theta % 360) + 360) % 360) / 360 * 15), 0, 15);
        E.needle.setAttribute('transform', 'rotate(' + S.theta.toFixed(1) + ' 50 50)'); onInput('temp', q); paintDial(q);
      }
      function paintDial(q) {
        const w = dialWord(q); E.dword.textContent = w; E.dial.setAttribute('aria-valuenow', String(q)); E.dial.setAttribute('aria-valuetext', w);
        const laps = Math.floor(Math.abs(S.theta) / 360); E.laps.textContent = 'Laps: ' + laps + ', ' + (laps >= 14 ? 'none of them useful (a record, of nothing)' : laps >= 5 ? 'none of them useful, all of them noted' : 'none of them useful');
        if (laps > S.lapsSaid) { S.lapsSaid = laps; if (laps === 1 || laps === 5 || laps === 14) mk('laps', { n: laps }); }
      }
      function dialKey(ev) {
        if (S.dead) return; const k = ev.key;
        if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') { ev.preventDefault(); if (blocked()) return; S.theta += (k === 'ArrowLeft' || k === 'ArrowDown' ? -1 : 1) * (ev.shiftKey ? .5 : 1) / 15 * 360; applyDial(); kbSettle('temp'); }
        else if (k === ' ' || k === 'Enter') { ev.preventDefault(); settle('temp'); }
      }
      /* fog lever */
      function setLever(d) { d = clamp(fin(d, 0), 0, 1); S.R.fog = q5(d * 15); E.lever.style.setProperty('--d', String(S.R.fog / 15)); E.knob.setAttribute('aria-valuenow', String(S.R.fog)); }
      function leverDepth(ev) { const r = E.lever.getBoundingClientRect(); if (!(r.height > 10)) return 0; return clamp((ev.clientY - r.top - 15) / (r.height - 30), 0, 1); }
      function leverDown(ev) { if (blocked()) return; touched(); S.drag.fog = true; E.knob.classList.remove(C('spring')); try { E.lever.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic pointers */ } setLever(leverDepth(ev)); }
      function leverMove(ev) { if (S.drag.fog) setLever(leverDepth(ev)); }
      function leverRelease() {
        if (!S.drag.fog && !S.keyFog) return; S.drag.fog = false; S.keyFog = false; S.fogSince = 0; const was = S.R.fog; S.R.fog = 0; E.knob.classList.add(C('spring')); E.lever.style.setProperty('--d', '0'); E.knob.setAttribute('aria-valuenow', '0');
        if (was > 1 && !blocked()) { S.moves.fog++; api.stat.inc('weather-controller.leverPulls'); api.sfx('whoosh'); chanLine('fog'); S.nothingRun = 0; }
      }
      function leverKey(ev, down) {
        if (S.dead) return;
        if (ev.key === ' ' || ev.key === 'ArrowDown') { ev.preventDefault(); if (down) { if (ev.repeat || blocked()) return; touched(); S.keyFog = true; S.nothingRun = 0; E.knob.classList.remove(C('spring')); setLever(.8); } else leverRelease(); }
        else if (ev.key === 'Escape' && down) leverRelease();
      }
      /* DO NOTHING, dispute, form */
      function doNothing() {
        if (S.dead || blocked()) return; const n = now(); touched(); S.noBuf.push(n); while (S.noBuf.length && n - S.noBuf[0] > 5000) S.noBuf.shift();
        api.stat.inc('weather-controller.doNothings'); api.sfx('bloop'); if (S.base === 'elsewhere') return;
        S.nothingRun++; api.award(.1, 'nothing'); S.force = { until: S.pt + 12 }; S.extras.push({ time: fmtClock(257 + 16 * S.diaryN), text: 'Moderate Sunshine With Notes (scheduled retroactively).' }); while (S.extras.length > 3) S.extras.shift(); paintDiary(); paintNote();
        if (n - (S.nothingAt || 0) > 1500) { S.nothingAt = n; mg('nothing', { n: api.stat.get('weather-controller.doNothings') }); if (api.chance(.6)) cg('nothingC'); }
        if (S.nothingRun === 3) { api.award(.5, 'approves of nothing'); api.achieve('weather-controller.nothing'); mk('nothing3', null, 1); } else if (S.nothingRun === 5 || S.nothingRun === 10) mk('nothing5');
        if ((S.noBuf.length === 6 || S.noBuf.length === 9) && n - S.nothingTierAt > 4000) { S.nothingTierAt = n; if (S.noBuf.length === 6) mk('nothingSix', null, 1); else ck('nothingNine', null, 1); }
        if (S.noBuf.length >= 12 && n >= S.napUntil) restrain();
      }
      function dispute() {
        if (S.dead || blocked()) return; const dn = now(); S.dispBuf.push(dn); while (S.dispBuf.length && dn - S.dispBuf[0] > 5000) S.dispBuf.shift();
        if (S.dispBuf.length === 7 && dn - S.dispSpamAt > 20000 && S.base === 'play') { S.dispSpamAt = dn; cg('dispSpam'); }
        if (S.pendingDispute) return; touched(); if (S.base === 'elsewhere') { api.sfx('blip'); return; }
        S.pendingDispute = true; E.chys.textContent = K.cConsider; setFace('confused'); api.sfx('blip');
        api.setTimeout(() => {
          S.pendingDispute = false; if (S.dead || S.mode === 'cert') return; S.disputes++; api.stat.inc('weather-controller.disputes'); api.award(.2, 'dispute'); egoAdd(2);
          const tot = api.stat.get('weather-controller.disputes'); /* the stat persists across sessions, so the count does too */
          if (tot >= 10) { api.achieve('weather-controller.co-author'); if (tot % 10 === 0) ck('dispute10', { n: tot }, 0); else cg('dispute'); } else cg('dispute');
          if (S.ego >= 80 && api.chance(.5)) { V.cliffWave = V.t + 1.8; api.setTimeout(() => ck('cliffHere2', null, 0), 900); }
        }, 800);
      }
      function openForm() { if (S.beat < 3 || blocked() || S.base === 'elsewhere' || S.dead) return; S.formOpen = true; E.form.hidden = false; touched(); S.nothingRun = 0; try { E.fWx.focus(); } catch (e) { /* hidden */ } }
      function closeForm() { S.formOpen = false; E.form.hidden = true; E.stamp.hidden = true; }
      function showStamp(text) { E.stamp.textContent = text; E.stamp.hidden = false; E.stamp.style.animation = 'none'; void E.stamp.offsetWidth; E.stamp.style.animation = ''; S.stampUntil = now() + 2600; }
      function submitForm() {
        if (S.dead || blocked()) return; const n = now(); touched(); S.nothingRun = 0; S.stampsN++; S.reqs++; api.stat.inc('weather-controller.stamps'); api.stat.inc('weather-controller.requests');
        S.formBuf.push(n); while (S.formBuf.length && n - S.formBuf[0] > 8000) S.formBuf.shift(); const spam = S.formBuf.length >= 10, reason = String(E.fRe.value || '').trim().slice(0, 60), wx = String(E.fWx.value || ''), ur = String(E.fUr.value || ''), seven = S.stampsN % 7 === 0;
        /* the dropdowns finally count: Tuesday is refused as policy, urgency 7 1/2 is the only one Sandra recognises, and the 7th approval plays what you chose as a flashback */
        let text, ok = false; if (seven) { text = K.stampOk; ok = true; } else if (spam) text = K.stampPlease; else if (ur === '7 1/2') { text = K.stampHalf; ok = true; } else if (wx === 'Tuesday') text = K.stampTue; else if (reason) text = fill(K.stampQuote, { text: reason }); else if (api.chance(.4)) text = fill(api.chance(.5) ? K.stampWx : K.stampUr, { wx: wx, ur: ur }); else text = L('stamp').t;
        showStamp(text); api.sfx('stamp'); if (!ok) api.setTimeout(() => api.sfx('buzz'), 140); api.award(.3, 'stamp');
        if (seven) { mk('stampRetro'); flashback(wx); } else if (spam) mk('stampFee'); else if (api.chance(.6)) mg('stampM', { n: String(S.reqs).padStart(4, '0') });
        claimLater(api.randInt(400, 1100)); if (S.reqs === 77) indoor();
      }
      function flashback(wx) { if (S.dead) return; V.fbWx = WXE[wx] || '☀️'; pushFx('flashback', 3.4); E.chys.textContent = K.flashHdr; cap(K.flashHdr); api.setTimeout(() => ck('flashEnd', null, 1), 3700); }
      function season2() { if (S.dead || S.season2) return; S.season2 = true; E.s2.hidden = true; paintLabels(); api.award(2, 'season 2'); api.sfx('tada'); mk('season2'); }
      function sacredCheck() { const n = now(); if (S.loopSettles < 3 || n < S.sacredCd || S.mode !== 'play' || S.base !== 'play') return; if (CHN.every(c => S.R[c] === 7.5) && S.R.temp === 7.5) sacred(); }
      /* page-level listeners (all managed) */
      api.on(document, 'keydown', ev => {
        if (S.dead || ev.ctrlKey || ev.metaKey || ev.altKey) return; const tg = ev.target, tn = tg && tg.tagName;
        if ((tn === 'INPUT' && tg.type !== 'range') || tn === 'TEXTAREA' || tn === 'SELECT' || (tg && tg.isContentEditable)) return;
        touched(); if (blocked()) return; const k = ev.key && ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
        if (k >= '1' && k <= '4') { try { E.inputs[CHN[+k - 1]].focus(); } catch (e) { /* ignore */ } } else if (k === 't') E.dial.focus(); else if (k === 'n') swingNearest(); else if (k === 'c') dispute(); else if (k === 'r') openForm(); else if (k === 'p') answerCall(); else if (k === 'k') { if (V.colin.f > 0 && V.colin.f < 1) pokeColin(); } else if (k === 'Escape') { leverRelease(); closeForm(); }
      });
      api.on(root, 'pointerdown', () => touched()); api.on(root, 'wheel', () => touched()); api.on(root, 'input', () => touched()); api.on(root, 'pointermove', () => noteInput());
      api.on(E.cv, 'pointerdown', ev => colinPoke(ev));

      /* ---------- the weather model, the Agenda and the Diary ---------- */
      const curPlan = () => (S.force && S.pt < S.force.until ? PLANS[8] : PLANS[S.planIdx]);
      function ensureAgenda() {
        while (S.agenda.length < 4) { const bag = api.shuffle(PLANS.map((p, i) => i).filter(i => i !== 0)), last = S.agenda.length ? S.agenda[S.agenda.length - 1] : S.planIdx; if (bag[0] === last) bag.push(bag.shift()); S.agenda = S.agenda.concat(bag); }
      }
      const nearReq = i => CHN.filter(ch => Math.abs(PLANS[i][3][PI[ch]] - S.R[ch]) < 1.5).length >= 3;
      function advancePlan(first) {
        if (first) S.planIdx = 0; else { ensureAgenda(); let k = 0; while (k < S.agenda.length - 1 && (nearReq(S.agenda[0]) || S.agenda[0] === S.planIdx)) { S.agenda.push(S.agenda.shift()); k++; } S.planIdx = S.agenda.shift(); S.diaryN++; }
        ensureAgenda(); S.planEnd = S.pt + PLANS[S.planIdx][2] / (S.beat >= 5 ? 1.5 : 1); paintNote(); paintDiary();
      }
      function paintNote() {
        const n = curPlan()[0]; if (S.noteName === n) return; S.noteName = n; E.note.textContent = n; if (curPlan()[1] !== n) E.note.appendChild(el('small', { text: 'mood: ' + curPlan()[1] })); E.note.classList.remove(C('flip'));
        if (!reduced()) { void E.note.offsetWidth; E.note.classList.add(C('flip')); } cap('Plan: ' + n);
      }
      function paintDiary() {
        if (S.beat < 3) return; const rows = S.extras.map(x => x.time + ' - ' + x.text), base = 257 + 16 * S.diaryN;
        rows.push(fmtClock(base) + ' - ' + curPlan()[0] + '.'); S.agenda.slice(0, 2).forEach((i, k) => rows.push(fmtClock(base + 16 * (k + 1)) + ' - ' + PLANS[i][0] + '.')); rows.push('Busy until Tuesday.');
        E.diaryOl.textContent = ''; rows.slice(0, 8).forEach(r => E.diaryOl.appendChild(el('li', { text: r })));
      }
      function model(dt) {
        const ex = S.base === 'elsewhere' ? 2 : (S.mode === 'listening' || S.mode === 'calm') ? 1 : 0, k = S.beat >= 5 ? .88 : .55, mw = S.beat >= 7 ? .3 : S.beat >= 4 ? .4 : .6, p = curPlan()[3], t = now();
        const f = ex === 2 ? 1 : 1 - Math.exp(-(ex ? 3 : k) * dt), bo = S.boost && S.pt < S.boost.until ? S.boost.t : null;
        ALLCH.forEach(ch => {
          if (S.gift && S.gift.ch === ch && t < S.gift.until) { S.A[ch] = clamp(S.R[ch] + .1, 0, 15); return; }
          let tgt = ex ? S.R[ch] : lerp(p[PI[ch]], 15 - S.R[ch], mw); if (bo && !ex && bo[ch] !== undefined) tgt = bo[ch];
          const A = S.A[ch]; S.A[ch] = clamp(fin(A + (tgt - A) * f + (ex ? 0 : Math.sin(S.t * .9 + S.ph[ch]) * dt * .8), 7), 0, 15);
        });
      }
      function stepScene(dt) {
        const A = S.A, w = S.cw || 300, h = S.ch || 170, t = now(), frozen = S.mode === 'drop' || t < S.freezeUntil;
        V.t += dt; S.t += dt; V.dennis = S.beat >= 4 || S.post; V.perk = A.rain > 9 || A.temp <= 3 || t < S.perkUntil; V.hat = t < (S.hatUntil || 0) ? 1 : 0; V.flash = Math.max(0, V.flash - dt * 3); S.lightCd -= dt;
        V.dropT = S.dropFx > t ? clamp(1 - (S.dropFx - t) / 2500, 0, 1) : -1; V.colin.look = V.dropT >= 0 || t < (S.colinLook || 0); V.colin.stand = frozen || S.base === 'elsewhere' || t < S.colinStand;
        V.sock.on = S.sockOn && !S.sockTaken; V.colin.down = t < S.freezeUntil || S.mode === 'drop' || t < S.dropFx; V.colin.wave = t < S.colinWave;
        for (let i = V.fx.length - 1; i >= 0; i--) if (V.t - V.fx[i].t0 > V.fx[i].dur) V.fx.splice(i, 1);
        if (S.base === 'elsewhere') return;
        V.pk = A.temp <= 3 && A.rain > 1 ? 'snow' : A.temp > 3 && A.temp < 6.8 && A.rain > 8 ? 'hail' : 'rain';
        if (frozen) return;
        const sp = (.008 + .012 * A.wind / 15) * (S.beat >= 5 ? 1.3 : 1); for (let i = 0; i < 7; i++) { V.cx[i] += sp * (.6 + (i % 3) * .25) * dt; if (V.cx[i] > 1.25) V.cx[i] = -.25; }
        const colinOff = V.colin.f < -.05 || V.colin.f > 1.05; if (!V.colin.stand) { V.colin.f += dt / 40 * 1.16; if (V.colin.f > 1.08) { V.colin.f = -.08; S.colinPass++; if (S.colinPass % 3 === 0) mg('colin', { n: S.colinPass }); } }
        const u = h * .0027, cx = V.colin.f * w, rr = V.colin.down ? 0 : 19 * u, hold = curPlan()[0].indexOf('Hold The Rain') === 0 && !colinOff;
        let tgt = Math.round(clamp(A.rain, 0, 15) / 15 * (V.pk === 'snow' ? 100 : 140)); if (V.pk === 'hail') tgt = Math.round(tgt * .55); if (hold) tgt = 0; if (A.rain < .5) tgt = 0;
        const pa = V.pa, sc = h / 170; for (let n = 0; n < 8 && pa.length < tgt; n++) pa.push({ x: api.rand() * w, y: -4 - api.rand() * 20, k: api.rand() });
        while (pa.length > tgt + 3) pa.pop();
        for (let i = pa.length - 1; i >= 0; i--) {
          const p = pa[i]; p.y += (V.pk === 'snow' ? 45 + p.k * 40 : V.pk === 'hail' ? 300 : 360 + p.k * 160) * sc * dt; p.x += (A.wind * 4 + (V.pk === 'snow' ? 4 : 0)) * dt;
          if (rr > 0 && p.y > h * .91 - 75 * u && p.y < h * .91 - 28 * u && Math.abs(p.x - cx) < rr) p.x = cx + (p.x < cx ? -1 : 1) * (rr + 1);
          if (p.y > h * (.86 + p.k * .1) || p.x > w + 10) { p.y = -4; p.x = api.rand() * w; if (hold) pa.splice(i, 1); }
        }
        if (A.rain > 11 && A.cloud > 10 && S.lightCd <= 0 && api.chance(dt * .7)) { V.flash = 1; V.bolt = api.rand(); S.lightCd = 2; }
        if (V.sock.on && !V.sock.fly && A.wind >= 14) { V.sock.fly = true; V.sock.ft = 0; S.sockStamp = t + 1800; E.sockstamp.textContent = 'STILL ON A JOURNEY'; E.sockstamp.hidden = false; if (api.flag.get('sock-matcher.home')) mg('sockHome'); else mk('sockFly'); }
        if (V.sock.fly) { V.sock.ft += dt; if (V.sock.ft > 7 && A.wind < 10) V.sock.fly = false; }
      }
      /* ---------- drawing ---------- */
      function fit() {
        const dpr = Math.min(2, window.devicePixelRatio || 1); S.dpr = dpr;
        let changed = false;
        [[E.cv, 'cw', 'ch'], [E.pipcv, 'pw', 'pph']].forEach(a => { const c = a[0], w = c.clientWidth, h = c.clientHeight; if (w >= 2 && h >= 2) { const W = Math.round(w * dpr), H = Math.round(h * dpr); if (c.width !== W || c.height !== H) { c.width = W; c.height = H; changed = true; } S[a[1]] = w; S[a[2]] = h; } });
        if (changed && !S.dead) draw(true); /* resizing a canvas wipes it: repaint at once instead of showing a blank sky until the next frame */
      }
      const PV = { t: 0, fx: [], cliffUp: false, swarmT0: -99, cliffWave: -99 };
      function draw(force) {
        if (!ctx || document.hidden) return; const w = S.cw, h = S.ch; if (!(w >= 2 && h >= 2)) return;
        const rm = reduced(), t = now(), A = S.A; ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
        drawSky(ctx, A, w, h, { t: S.t, flip: PLANS[S.planIdx][1] === 'Wardrobe Change' && (!S.force || S.pt >= S.force.until) && Math.floor(S.t / 2) % 2 === 1 && !rm, elsewhere: S.base === 'elsewhere', dusk: t < S.napUntil ? .55 : 0, shim: !rm, stillTint: rm && A.rain > 11 && A.cloud > 10 }, V);
        if (pctx && S.base !== 'elsewhere' && (force || S.frameN % 4 === 0) && S.pw >= 2) { pctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0); PV.t = S.t; drawSky(pctx, S.R, S.pw, S.pph, { pip: true, t: S.t }, PV); }
      }
      function paintGhosts() {
        ALLCH.forEach(ch => {
          const A = S.A[ch]; if (Math.abs(A - (S.lastG[ch] === undefined ? -9 : S.lastG[ch])) < .002) return; S.lastG[ch] = A;
          if (ch === 'temp') E.dghost.setAttribute('transform', 'rotate(' + (A / 15 * 360).toFixed(1) + ' 50 50)'); else if (ch === 'fog') E.lghost.style.setProperty('--g', (A / 15).toFixed(4)); else { E.ghosts[ch].style.setProperty('--g', (A / 15).toFixed(4)); if (ch === 'sun') E.ghosts.sun.classList.toggle(C('tagl'), A > 9); }
        });
      }
      function paintRo() {
        const ee = S.base === 'elsewhere' ? ' (Perfectly)' : ''; /* the plan's mood lives on the sticky note; each row reports only what the weather is doing in it */
        CHN.forEach(ch => { const A = S.A[ch]; setT(E.ros[ch], 'ro' + ch, 'Weather: ' + (A < 3 ? 'Barely' : A < 6 ? 'Mildly' : A < 9 ? 'Moderately' : A < 12 ? 'Considerably' : 'Aggressively') + ee); });
      }
      function step(dt) {
        Object.keys(S.hopCd).forEach(k => { if (S.hopCd[k] > 0) S.hopCd[k] -= dt; });
        const frozen = S.mode === 'drop' || now() < S.freezeUntil;
        if (!frozen && S.mode !== 'cert') { S.pt += dt; if (S.pt >= S.planEnd) advancePlan(); model(dt); }
        stepScene(dt); stepFlies(dt); paintGhosts(); paintNote();
      }
      function frame(ts) {
        if (S.dead) return; api.requestAnimationFrame(frame);
        const dt = S.lastTs === null ? 0 : clamp((ts - S.lastTs) / 1000, 0, .1); S.lastTs = ts;
        if (document.hidden) return; step(dt);
        if (ts - S.lastDraw >= 30 || dt === 0) { S.lastDraw = ts; S.frameN++; draw(); }
      }

      /* ---------- butterflies, the net, the jar, effects ---------- */
      const LY = { sk: { x: 0, y: 0, w: 0, h: 0 }, rw: {}, nb: { x: 0, y: 0, w: 0 } };
      const angd = (a, b) => { let d = a - b; while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832; return d; };
      const capNow = () => [0, 1, 2, 2, 2, 2, 4, 6, 6][clamp(S.beat, 0, 8)];
      function layout() {
        const ar = E.app.getBoundingClientRect(), sr = E.sky.getBoundingClientRect(); LY.sk = { x: sr.left - ar.left, y: sr.top - ar.top, w: sr.width, h: sr.height };
        CHN.forEach(ch => { const r = E.inputs[ch].getBoundingClientRect(); LY.rw[ch] = { x: r.left - ar.left, y: r.top - ar.top, w: r.width, h: r.height }; });
        const nr = E.nothing.getBoundingClientRect(); LY.nb = { x: nr.left - ar.left + nr.width / 2, y: nr.top - ar.top + nr.height / 2, w: nr.width };
      }
      function thumbPos(ch) { const r = LY.rw[ch]; if (!r || !(r.w > 10)) return { x: LY.sk.x + LY.sk.w / 2, y: LY.sk.y + LY.sk.h / 2 }; const tw = r.h || 30; return { x: r.x + tw / 2 + (r.w - tw) * S.R[ch] / 15, y: r.y + r.h / 2 }; }
      function place(b) { b.btn.style.transform = 'translate(' + fin(b.x, 0).toFixed(1) + 'px,' + fin(b.y, 0).toFixed(1) + 'px)'; }
      function spawnFly(o) {
        o = o || {}; if (S.dead || S.base === 'elsewhere' || B.length >= 7 || (!o.force && B.length >= capNow())) return null; layout(); const sk = LY.sk; if (sk.w < 40) return null;
        let name, inc; if (o.reg) name = 'Reginald'; else if (o.gordon) name = 'Gordon III'; else if (S.flyFirst) name = 'Pamela'; else { if (!S.nameBag.length) S.nameBag = api.shuffle(NAMES); name = S.nameBag.pop(); }
        if (S.flyFirst && name === 'Pamela') { inc = 3304; S.inc = 3304; } else inc = S.inc += api.randInt(1, 9);
        const side = api.randInt(0, 3), x = side === 0 ? sk.x + 4 : side === 1 ? sk.x + sk.w - 4 : sk.x + api.rand() * sk.w, y = side === 2 ? sk.y + 4 : side === 3 ? sk.y + sk.h - 4 : sk.y + api.rand() * sk.h;
        const b = { id: ++S.flyId, name: name, inc: inc, x: x, y: y, hd: Math.atan2(sk.y + sk.h / 2 - y, sk.x + sk.w / 2 - x), t: api.rand() * 6, age: 0, lt: 0, state: 'fly', ch: null, gordon: !!o.gordon, reg: !!o.reg, said: false };
        b.btn = el('button', { class: C('fly') + (o.gordon ? ' ' + C('big') : '') + (o.reg ? ' ' + C('glow') : ''), type: 'button', 'aria-label': 'Butterfly ' + name + ', incident ' + inc, onclick: () => onFlyClick(b) }, el('span', { class: C('wing'), text: '🦋' }));
        B.push(b); E.flies.appendChild(b.btn); place(b); api.sfx('bloop'); api.stat.inc('weather-controller.butterfliesSpawned');
        if (name === 'Pamela') { deskT(S.loops > 0 && S.loopNo > 0 ? KL('pamelaAgain').t : K.bflyFirst); } else if (o.reg) deskT(K.regArrive); else deskT(L('arrive', { name: name, inc: inc }).t);
        if (S.flyFirst) S.flyFirst = false; return b;
      }
      function freeOcc(b) {
        if (b.ch && S.occ[b.ch] === b) { S.occ[b.ch] = null; E.inputs[b.ch].removeAttribute('aria-disabled'); paintLabels(); } b.btn.classList.remove(C('landed'));
      }
      function removeFly(b) {
        const i = B.indexOf(b); if (i >= 0) B.splice(i, 1); freeOcc(b); if (document.activeElement === b.btn) { try { E.hint.focus(); } catch (e) { /* ignore */ } } b.btn.remove();
      }
      function clearFlies() { while (B.length) removeFly(B[0]); CHN.forEach(ch => { S.occ[ch] = null; E.inputs[ch].removeAttribute('aria-disabled'); }); paintLabels(); }
      function occupy(ch, b) {
        S.occ[ch] = b; const inp = E.inputs[ch]; inp.setAttribute('aria-disabled', 'true'); S.drag[ch] = false; try { inp.releasePointerCapture(1); } catch (e) { /* none held */ }
        b.btn.classList.add(C('landed')); paintLabels(); deskT(L('landed', { name: b.name, slider: lab(ch) }).t); if (ch === 'wind' && api.chance(.5)) mk('windSat');
      }
      function leave(b) { b.state = 'leave'; b.lt = 0; const sk = LY.sk; b.hd = Math.atan2(b.y - (sk.y + sk.h / 2), b.x - (sk.x + sk.w / 2)); freeOcc(b); }
      function tryLand(b) { const free = CHN.filter(ch => !S.occ[ch]); if (!free.length) return; b.ch = api.pick(free); b.state = 'toland'; }
      function stepFlies(dt) {
        if (!B.length) return; const sk = LY.sk, rm = reduced();
        for (let i = B.length - 1; i >= 0; i--) {
          const b = B[i]; if (!b) continue; b.age += dt; b.t += dt;
          if (b.state === 'fly') {
            b.hd += Math.sin(b.t * 8.17 * (rm ? .15 : 1)) * 2.6 * dt * (rm ? .3 : 1); const spd = (70 + 6 * Math.min(S.T / 60, 10)) * (b.gordon ? .6 : 1) * (rm ? .25 : 1);
            b.x += Math.cos(b.hd) * spd * dt; b.y += Math.sin(b.hd) * spd * dt;
            if (b.x < sk.x + 20 || b.x > sk.x + sk.w - 20 || b.y < sk.y + 20 || b.y > sk.y + sk.h - 20) b.hd += angd(Math.atan2(sk.y + sk.h / 2 - b.y, sk.x + sk.w / 2 - b.x), b.hd) * Math.min(1, dt * 4);
            if (b.gordon && b.age >= 5) b.state = 'togo'; else if (b.age >= 6 && !b.gordon && !b.reg) tryLand(b);
          } else if (b.state === 'toland' || b.state === 'togo') {
            const tg = b.state === 'togo' ? { x: sk.x + sk.w * .368, y: sk.y + sk.h * .72 } : thumbPos(b.ch), dx = tg.x - b.x, dy = tg.y - b.y, d = Math.hypot(dx, dy), st = Math.min(d, 150 * dt);
            if (d > 1) { b.x += dx / d * st; b.y += dy / d * st; b.hd = Math.atan2(dy, dx); }
            if (d < 10) {
              if (b.state === 'togo') gordonSteal(b); else if (b.reg) { S.wantElse = true; leave(b); } else if (S.occ[b.ch]) b.state = 'fly'; else { b.state = 'land'; occupy(b.ch, b); }
            }
          } else if (b.state === 'land') {
            const tg = thumbPos(b.ch); b.x = tg.x; b.y = tg.y - 8; if (b.age >= 12) bigEvent(b);
          } else { b.lt += dt; b.x += Math.cos(b.hd) * 140 * dt; b.y += Math.sin(b.hd) * 140 * dt; if (b.lt > 2.5) { removeFly(b); continue; } }
          place(b);
        }
      }
      function netFx(x, y) {
        E.net.style.transform = 'translate(' + fin(x, 0).toFixed(0) + 'px,' + fin(y, 0).toFixed(0) + 'px)'; E.net.classList.remove(C('swing'));
        api.setTimeout(() => { if (!S.dead) E.net.classList.add(C('swing')); }, 16); api.setTimeout(() => { if (!S.dead) E.net.classList.remove(C('swing')); }, 360);
      }
      function setPillow(on) {
        E.net.textContent = on ? '💤' : '🥅';
        if (on) { E.net.setAttribute('aria-label', 'tiny pillow'); E.net.setAttribute('role', 'img'); E.net.removeAttribute('aria-hidden'); } else { E.net.setAttribute('aria-hidden', 'true'); E.net.removeAttribute('aria-label'); E.net.removeAttribute('role'); }
      }
      function swing(b) {
        const n = now(); S.netBuf.push(n); while (S.netBuf.length && n - S.netBuf[0] > 5000) S.netBuf.shift(); touched();
        const sk = LY.sk; netFx(b ? b.x : sk.x + sk.w / 2, b ? b.y : sk.y + sk.h / 2);
        if (n < S.netLeave) { api.sfx('blip'); return; }
        if (S.netBuf.length === 8 && n - S.netWarmAt > 15000) { S.netWarmAt = n; deskT(K.netWarm); }
        api.sfx('whoosh'); S.nothingRun = 0; if (S.netBuf.length >= 15) { netStress(); return; }
        if (!b) { if (api.chance(.2)) mk('caughtNone'); return; }
        if (b.gordon) { if (n - (S.gordonNoAt || 0) > 3000) { S.gordonNoAt = n; mk('gordonNo'); } return; }
        if (b.state === 'land') { shoo(b); return; } catchFly(b);
      }
      function swingNearest() {
        if (S.dead || blocked() || S.base === 'elsewhere') return; const b = B.find(f => f.state !== 'leave' && f.state !== 'land' && !f.gordon && !f.reg) || B.find(f => f.state === 'land') || B.find(f => f.gordon) || null;
        if (S.beat < 1 && !b) return; swing(b);
      }
      function onFlyClick(b) {
        if (S.dead || blocked()) return; touched(); if (b.reg) { S.wantElse = true; return; } if (b.state === 'land') { shoo(b); return; } swing(b);
      }
      function shoo(b) {
        api.stat.inc('weather-controller.shoos'); api.award(.2, 'shoo'); api.sfx('blip'); deskT(L('shoo', { name: b.name }).t); leave(b);
      }
      function jarAdd() {
        S.jarN = (S.jarN || 0) + 1; S.jarIn++; E.jar.insertBefore(el('span', { text: '🦋' }), E.alibi); while (E.jar.children.length > 13) E.jar.removeChild(E.jar.firstChild); E.jlab.textContent = 'Jar: ' + S.jarIn + ' butterflies, 1 alibi';
        if (S.jarIn >= 7) jailbreak();
      }
      /* big moment: the seventh jarred butterfly. The jar shakes, then everyone leaves at once; three weather effects fire together and Clifford claims each in rapid fire */
      function jailbreak() {
        if (S.jailing) return; S.jailing = true; E.jarw.classList.add(C('shake')); mk('jail1', null, 1);
        api.setTimeout(() => {
          if (S.dead) return; S.jailing = false; S.jarIn = 0; E.jarw.classList.remove(C('shake')); E.jar.textContent = ''; E.jar.appendChild(E.alibi); E.jlab.textContent = K.jarEmpty; V.swarmT0 = V.t; api.sfx('whoosh'); api.confetti(undefined, undefined, 20);
          ['hat', 'laundry', 'commaHail'].forEach(id => pushFx(id, 5)); api.stat.inc('weather-controller.jailbreaks'); api.award(2, 'jailbreak'); ledgerLight(0); S.credit += 3; egoAdd(3);
          [K.jail2, K.jail2 + ' ' + K.jail2, K.jail3].forEach((t, i) => api.setTimeout(() => { if (!S.dead && S.mode !== 'cert') { E.chys.textContent = t; setFace(i === 2 ? 'proud' : 'smug'); api.sfx('stamp'); } }, 300 + i * 600));
          api.setTimeout(() => mk('jail4', null, 1), 2200);
        }, 1400);
      }
      function pushFx(id, dur) { V.fx.push({ id: id, t0: V.t, dur: dur || 4 + api.rand() * 5, seed: api.randInt(1, 99) }); while (V.fx.length > 3) V.fx.shift(); }
      function playEffect(idx) {
        const e = EFFECTS[idx]; if (!e) return; pushFx(e[0]);
        if (e[0] === 'wobble') S.wobbleUntil = now() + 5000; if (/Colin/.test(e[1])) S.colinLook = now() + 3000;
        if (e[0] === 'rockStorm' && (api.flag.get('pet-rock.met') || api.flag.get('complaints-dept.rockMet'))) api.setTimeout(() => mg('cbRock'), 2200);
        E.chys.textContent = e[1]; cap(e[1]); deskT(e[1]); ledgerLight(1);
      }
      /* the secret: poke Colin (on the canvas) seven times and he turns around */
      function colinPoke(ev) {
        if (S.dead || blocked() || !(S.cw > 2) || !(S.ch > 2)) return; const r = E.cv.getBoundingClientRect(); if (!(r.width > 2)) return;
        const k = S.cw / r.width, x = (ev.clientX - r.left) * k, y = (ev.clientY - r.top) * k, cx = V.colin.f * S.cw;
        if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x - cx) > 30 || y < S.ch * .58 || y > S.ch * .97) return; pokeColin();
      }
      /* the same poke without coordinates: key K counts only while Colin is actually on screen */
      function pokeColin() {
        if (S.dead || blocked()) return; const n = now(); if (n - S.pokeAt < 350) return;
        S.pokeAt = n; S.pokes++; api.stat.inc('weather-controller.pokes'); api.sfx('blip'); S.colinWave = n + 1300; S.colinStand = Math.max(S.colinStand, n + 1300);
        if (S.pokes <= POKES.length) mgmtT(POKES[S.pokes - 1], 'neutral', 1); else if (n - (S.pokeMoreAt || 0) > 3000) { S.pokeMoreAt = n; mg('poke'); }
        if (S.pokes >= POKES.length) api.achieve('weather-controller.eye-contact'); /* a save that already holds more than seven pokes must still unlock it */
        if (S.pokes === POKES.length) { S.colinStand = n + 6000; S.colinLook = n + 6000; S.colinWave = 0; api.sfx('tada'); api.confetti(undefined, undefined, 24); }
        save();
      }
      const fxIdx = id => EFFECTS.findIndex(e => e[0] === id);
      function catchFly(b) {
        api.stat.inc('weather-controller.butterfliesCaught'); api.award(1, 'butterfly'); api.sfx('pop'); api.achieve('weather-controller.first-catch'); jarAdd(); const jn = S.jarIn || 7; removeFly(b); ledgerLight(0);
        api.setTimeout(() => { if (S.dead) return; const x = L('caught', { name: b.name, inc: b.inc, n: jn }); mgmtT(x.t, x.mood, 0); }, 300);
        let idx; if (!S.effBag.length) S.effBag = api.shuffle(EFFECTS.map((e, i) => i)); idx = S.firstCatch ? S.effBag.pop() : 0; S.firstCatch = true; playEffect(idx);
        if (api.chance(.2)) api.setTimeout(() => ck('cButterfly'), 1200); else claimLater(1000);
        if (api.chance(1 / 77)) indoor();
      }
      function bigEvent(b) {
        api.stat.inc('weather-controller.butterfliesIgnored'); ledgerLight(0);
        if (api.chance(.5)) { S.boost = { until: S.pt + 7, t: { rain: 15, cloud: 15, sun: 0, wind: 9 } }; V.flash = 1; S.lightCd = 2; api.sfx('buzz'); mk('storm', { name: b.name }, 1); }
        else { S.boost = { until: S.pt + 6, t: { wind: 15, cloud: 3, rain: 0 } }; playEffect(fxIdx(api.chance(.5) ? 'hat' : 'laundry')); mk('burst', null, 1); }
        api.setTimeout(() => ck('bigC'), 1100); if (api.chance(.3)) api.setTimeout(() => mk('causal'), 2500); else if (api.chance(.3)) api.setTimeout(() => mg('sandra'), 2500); leave(b);
      }
      function gordonSteal(b) {
        const took = S.sockOn && !S.sockTaken; if (took) S.sockTaken = true; S.gordonSeen = true; api.flag.set('weather-controller.gordon3', true); api.stat.inc('weather-controller.gordonVisits'); api.achieve('weather-controller.gordon3'); api.sfx('bell');
        addSlip(K.gordonLetter, 'LETTER', 'Gordon III'); api.setTimeout(() => ck('cGordon'), 1500); leave(b); save();
      }
      /* ---------- Clifford: credit, ego, forecast, countdown, ledger ---------- */
      function claimLater(ms) { if (S.claimPend || S.dead || S.base === 'elsewhere') return; S.claimPend = true; api.setTimeout(() => { S.claimPend = false; claim(); }, ms || 600); }
      function claim() {
        if (S.dead || S.base === 'elsewhere' || blocked()) return; S.credit++; S.lastClaim = now(); api.stat.inc('weather-controller.credits'); egoAdd(1); ledgerLight(2); ledgerLight(3);
        if (api.chance(.14)) { ck(S.beat >= 4 && api.chance(.5) ? 'cDennis' : 'cColin'); paintLed(); return; }
        const wx = api.pick(WXWORDS), x = L(S.beat >= 6 ? 'credit3' : S.beat >= 3 ? 'credit2' : 'credit1', { thing: wx, other: api.pick(WXWORDS.filter(w => w !== wx)) }); cliff(x.t, x.mood, 0); paintLed();
      }
      function egoAdd(n) {
        const cp = S.post || S.beat < 4 ? 19 : S.beat === 4 ? 39 : S.beat === 5 ? 59 : S.beat === 6 ? 79 : 100, fl = S.post ? 0 : S.beat >= 7 ? 80 : S.beat >= 6 ? 60 : S.beat >= 5 ? 40 : S.beat >= 4 ? 20 : 0;
        let e = S.ego + n; if (e > cp) { if (n > 0 && S.ego >= cp && !S.capSaid) { S.capSaid = true; mk('egoCap', { n: cp }); } e = cp; } S.ego = Math.max(e, fl); applyEgo();
      }
      function applyEgo() {
        const e = S.ego; [[20, 'mug'], [40, 'plaque'], [60, 'monitor'], [80, 'burst']].forEach(a => E.tv.classList.toggle(C(a[1]), e >= a[0]));
        E.tv.style.setProperty('--ego', (1 + e * .0175).toFixed(3)); E.egof.style.width = Math.min(100, e) + '%'; V.cliffUp = e >= 80;
        if (e >= 20 && !S.egoSaid[20]) { S.egoSaid[20] = 1; mk('ego20', null, 1); } if (e >= 40 && !S.egoSaid[40]) { S.egoSaid[40] = 1; mk('ego40', null, 1); }
        if (e >= 60 && !S.egoSaid[60]) { S.egoSaid[60] = 1; ck('ego60c', null, 1); api.setTimeout(() => mk('ego60m'), 1800); } if (e >= 80 && !S.egoSaid[80]) { S.egoSaid[80] = 1; mk('ego80', null, 1); api.setTimeout(() => ck('cliffHere1', null, 0), 2200); }
      }
      function wxNow() {
        const A = S.A; return A.rain > 9 && A.cloud > 10 && A.temp > 3 && A.temp < 6.8 ? 'Hail' : A.temp <= 3 && A.rain > 1 ? 'Snow' : A.rain > 9 ? 'A storm' : A.fog > 9 ? 'Fog' : A.wind > 11 ? 'A gale' : A.sun > 9 ? 'Sunshine' : A.rain > 5 ? 'Drizzle' : A.cloud > 9 ? 'Cloud' : 'Mild';
      }
      function forecastStart() { const x = L('forecast'); S.fc = { until: now() + 12000 }; cliff('FORECAST: ' + x.t, x.mood, 0); }
      function forecastEnd() {
        S.fc = null; E.chys.classList.add(C('strike'));
        api.setTimeout(() => { if (S.dead) return; E.chys.classList.remove(C('strike')); E.chys.textContent = 'FORECAST (REVISED): ' + wxNow() + '. As predicted.'; }, 700); mg('histUpd');       }
      function cdTick() {
        const c = S.cd; if (!c) return; const n = 4 - Math.floor((now() - c.start) / 1000); if (n === c.n) return; c.n = n;
        if (n >= 1) { let s = 'IN'; for (let i = 4; i >= n; i--) s += ' ' + i + '...'; E.chys.textContent = s; api.sfx('tick'); }
        else { S.cd = null; playEffect(api.randInt(0, EFFECTS.length - 1)); const x = L('credit3', { thing: c.thing, other: api.pick(WXWORDS.filter(w => w !== c.thing)) }); cliff(x.t, x.mood, 0); S.credit++; egoAdd(1); }
      }
      function ledgerLight(i) {
        S.ledger |= 1 << i; E.lg[i].classList.add(C('lit')); E.la[i].classList.add(C('lit'));
        if (S.ledger === 15 && !S.loopSaid && S.beat >= 5) { S.loopSaid = true; E.lloop.setAttribute('opacity', '1'); mk('ledger2'); api.setTimeout(() => ck('ledger3'), 2200); }
      }
      function sendLetter() { const x = L('letter'); addSlip(x.t, 'REPLY ALL', 'Weather (Confident)'); api.sfx('stamp'); mg('letM'); S.letN++; api.stat.inc('weather-controller.letters'); }
      /* ---------- Season 2: the Phone-In (viewers ring Clifford), the Lunch Break (a rare window to approach the ghosts), the Colin call (a secret) ---------- */
      const CALLCB = [['staring-contest.met', 'cbCallStare'], ['snail-marathon.crossed', 'cbCallSnail'], ['elevator-simulator.friend|elevator-simulator.metFour', 'cbCallLift'], ['lost-and-found.coat', 'cbCallCoat'], ['suggestion-box.certified', 'cbCallBox'], ['metGerald', 'cbCallGerald']];
      function callerSay(t, mood) { if (S.dead || !t || now() < S.hushUntil) return; api.say(t, { who: 'Caller', mood: mood || 'confused', priority: 1 }); }
      function hangUp() {
        S.ring = null; if (E.phone.hidden) return; if (document.activeElement === E.phone) { try { E.hint.focus(); } catch (e) { /* ignore */ } } E.phone.hidden = true;
      }
      function ringPhone(idle) {
        if (S.dead || S.ring || S.mode !== 'play' || S.base !== 'play') return; const n = now(); S.ring = { start: n, until: idle ? Infinity : n + 14000, idle: !!idle, seen: 0 };
        E.phoneT.textContent = idle ? 'LINE 1: CLIFFORD (FROM THE NEXT ROOM)' : 'LINE 1: A VIEWER IS CALLING (key P)'; E.phone.hidden = false; api.sfx('bell'); cap('The phone is ringing.'); if (idle) mk('idleRing');
      }
      function callbackLine() {
        if (!api.chance(.3)) return null;
        for (let i = 0; i < CALLCB.length; i++) { const c = CALLCB[i]; if (!S.cbDone[c[1]] && cbFlag.apply(null, c[0].split('|'))) { S.cbDone[c[1]] = 1; return KL(c[1]); } }
        if (S.colinCalled && !S.cbDone.callColin2) { S.cbDone.callColin2 = 1; return KL('callColin2'); } return null;
      }
      function answerCall() {
        if (S.dead || blocked() || !S.ring) return; const r = S.ring; touched(); hangUp(); S.nothingRun = 0;
        S.calls++; S.callsLoop++; api.stat.inc('weather-controller.calls'); api.award(.5, 'viewer call'); api.sfx('blip'); save();
        if (S.calls === 7 && !S.colinCalled) { colinCall(); return; }
        const x = r.idle ? KL('callIdle') : (callbackLine() || L('caller')); callerSay(x.t, x.mood);
        api.setTimeout(() => { if (S.dead || S.mode === 'cert') return; if (r.idle) ck('callIdleC'); else cg('callAns'); claimLater(700); }, 2600);
        if (S.callsLoop === 3) api.setTimeout(() => mk('call3'), 5600); else if (S.calls === 5) api.setTimeout(() => mk('call5'), 5600);
      }
      /* the seventh call ever taken is Colin. He does not speak. He has never spoken. It is the best call of the show */
      function colinCall() {
        const n = now(); S.colinCalled = true; api.achieve('weather-controller.colin-line'); api.stat.inc('weather-controller.colinCalls'); api.sfx('bell'); S.colinStand = Math.max(S.colinStand, n + 7000); S.colinLook = n + 7000; S.colinWave = n + 7000; save();
        callerSay(K.colinCall0, 'neutral'); api.setTimeout(() => { api.sfx('tada'); api.confetti(undefined, undefined, 26); mk('colinCall1', null, 1); }, 2600);
        api.setTimeout(() => ck('colinCallC', null, 1), 5600); api.setTimeout(() => mk('colinCall2'), 8600);
      }
      /* rare event three: Weather goes to lunch. Everything freezes, the ghosts are asleep and will not dodge, so for 7 1/2 seconds you may simply walk up to one */
      function lunch() {
        if (S.lunchDone || S.dead || S.mode !== 'play' || S.base !== 'play') return; S.lunchDone = true; const n = now();
        S.lunchUntil = n + 7500; S.freezeUntil = Math.max(S.freezeUntil, n + 7500); ALLCH.forEach(ch => { S.hopCd[ch] = 7.5; }); pushFx('lunch', 7.5); api.sfx('bell'); api.stat.inc('weather-controller.lunches');
        E.sockstamp.textContent = 'BACK AT 1:00 (SKY TIME)'; E.sockstamp.hidden = false; S.sockStamp = n + 4200; addSlip(K.lunchSlip, 'OUT OF OFFICE', 'Weather (Confident)'); weatherSay(K.lunchW, true);
        mk('lunch1', null, 1); api.setTimeout(() => mk('lunch2'), 2400); api.setTimeout(() => mk('lunchColin'), 3600); api.setTimeout(() => ck('lunchC'), 5000); api.setTimeout(() => mk('lunch3'), 7800);
      }

      /* ---------- modes (S.mode is the single source of truth), secrets, spam and idle ---------- */
      function setBrace(on) { S.brace = on; E.tv.classList.toggle(C('brace'), on); }
      function setPillowOn(on) { setPillow(on); }
      /* making the console inert while a control inside it has focus would drop keyboard users back to the top of the page: park focus on the hint first */
      function inertCons() { try { if (E.cons.contains(document.activeElement)) E.hint.focus(); } catch (e) { /* ignore */ } E.cons.setAttribute('inert', ''); }
      function clearOverlays() {
        E.cons.removeAttribute('inert'); E.cons.classList.remove(C('grey')); E.veil.classList.remove(C('fog'), C('nap'), C('onhold')); E.hold.hidden = true; setBrace(false); E.rc.hidden = true; setPillowOn(false);
        S.netLeave = 0; S.napUntil = 0; S.gift = null; S.titleUntil = 0; S.flashUntil = 0; api.setTitle(TITLE);
      }
      function enterMode(m, ms) {
        if (S.mode !== S.base && PRI[m] <= PRI[S.mode]) return false; if (S.base === 'elsewhere' && m !== 'cert') return false;
        clearOverlays(); S.mode = m; S.until = now() + ms; closeForm(); S.drag = {}; S.keyFog = false; S.fogSince = 0; setLever(0); E.cons.classList.toggle(C('solid'), m === 'listening' || m === 'calm'); return true;
      }
      function leaveMode() {
        const m = S.mode; clearOverlays(); S.mode = S.base; S.until = 0; E.cons.classList.toggle(C('solid'), S.base === 'elsewhere');
        if (m === 'hold') { closeForm(); mk('whipEnd'); } else if (m === 'fogged') { S.titleUntil = now() + 3000; api.setTitle('Fog Controller'); mk('fogLift'); } else if (m === 'calm') mk('sacredEnd');
        else if (m === 'drop') S.hushUntil = 0; else if (m === 'cert') resetLoop();
      }
      function startListening() {
        if (S.base !== 'play' || S.mode !== 'play' || !enterMode('listening', 20000)) return; const n = now(); S.listenAt = n; S.listenSaid = false;
        api.achieve('weather-controller.listening'); api.stat.inc('weather-controller.listening'); if (!S.listenPaid) { S.listenPaid = true; api.award(3, 'listening'); } weatherSay(K.idleBubble, true); mk('idle1'); api.setTimeout(() => mk('idle2'), 2500); api.setTimeout(() => mk('idle3'), 5500);
      }
      function breakListening() {
        if (S.mode !== 'listening') return; leaveMode(); weatherSay(K.wasListening, true); ALLCH.forEach(ch => hop(ch, true, S.R[ch])); S.obeyUntil = 0; api.sfx('sad'); mk('idleTouch'); paintLed();
      }
      function whiplash() {
        if (!enterMode('hold', 8000)) return; const n = now(); S.holdStart = n; S.holdBeep = 0; S.mv = []; S.flashUntil = n + 2000; inertCons(); E.cons.classList.add(C('grey')); E.veil.classList.add(C('onhold')); E.hold.hidden = false; E.holdq.textContent = 'Queue number 7.5'; setBrace(true);
        if (S.beat >= 3) { E.form.hidden = false; showStamp(K.stampPlease); } api.sfx('buzz'); api.stat.inc('weather-controller.thrashes'); api.achieve('weather-controller.whiplash'); mk('thrash', null, 1); mg('whip');
        api.setTimeout(() => ck('whipC'), 900); api.setTimeout(() => mk('whip3'), 2600); api.setTimeout(() => mk('whip5'), 3900); api.setTimeout(() => mk('whip4'), 5200); api.setTimeout(() => mk('whip6'), 6700);
      }
      function netStress() { S.netLeave = now() + 15000; S.netBuf = []; setPillowOn(true); api.sfx('buzz'); api.stat.inc('weather-controller.netStress'); mg('netleave', null, 1); }
      function restrain() {
        const n = now(); if (n < S.napUntil) return; S.napUntil = n + 5000; S.noBuf = []; api.award(-.5, 'excessive optimism'); api.stat.inc('weather-controller.restraining'); api.achieve('weather-controller.restraining'); api.sfx('buzz'); layout();
        const nb = LY.nb, aw = E.app.clientWidth || 300; let x = nb.x - nb.w * 3, y = nb.y - nb.w * .3; if (x < 36) x = nb.x + nb.w * 3; x = clamp(x, 36, Math.max(40, aw - 36));
        E.rc.style.left = x.toFixed(0) + 'px'; E.rc.style.top = y.toFixed(0) + 'px'; E.rc.hidden = false; E.veil.classList.add(C('nap')); mg('restrain', null, 1); api.setTimeout(() => mg('restrain'), 2400);
      }
      function sacred() {
        if (!enterMode('calm', 4500)) return; const n = now(); S.sacredCd = n + 30000; S.hatUntil = n + 4200; api.sfx('tada'); api.award(7.5, 'seven and a half'); api.achieve('weather-controller.seven-and-a-half'); api.stat.inc('weather-controller.sacred'); api.confetti(undefined, undefined, 30);
        weatherSay('A Perfectly Pleasant Day, Technically.', true); mg('sacred', null, 1); api.setTimeout(() => api.say(K.sacredW, { who: 'Weather', mood: 'proud', priority: 1 }), 1800); api.setTimeout(() => ck('sacredC'), 3000);
      }
      function fogged() {
        if (!enterMode('fogged', 8000)) return; E.veil.classList.add(C('fog')); api.stat.inc('weather-controller.fogHolds'); api.achieve('weather-controller.fog'); api.sfx('whoosh'); mg('fogl', null, 1); api.setTimeout(() => ck('fogC'), 1500); api.setTimeout(() => mg('fogl'), 4500);
      }
      function indoor() {
        const n = now(); if (n < S.indoorUntil || S.dead) return; S.indoorUntil = n + 12000; E.cons.classList.add(C('indoor')); E.veil.classList.add(C('rainin')); api.award(1, 'indoor front'); api.sfx('bell'); api.stat.inc('weather-controller.indoorFronts'); mg('indoor', null, 1);
      }
      function singleDrop(compressed, force) {
        const n = now(); if (compressed) { S.dropFx = n + 2500; S.colinLook = n + 4000; api.sfx('bell'); api.stat.inc('weather-controller.singleDrops'); if (S.loopNo >= 1) api.achieve('weather-controller.single-drop'); return; }
        if ((S.dropDone && !force) || S.base !== 'play' || !enterMode('drop', 7500)) return; S.dropDone = true; S.hushUntil = n + 6000; inertCons(); S.dropFx = n + 2500; S.dropSay = n + 6000;
        api.sfx('bell'); api.stat.inc('weather-controller.singleDrops'); api.achieve('weather-controller.single-drop');
      }
      /* big moment: "Rain on Colin?" (guaranteed at 5:30, earlier if lucky). Colin stops under one small cloud and a slip asks the viewer. Each later visit adds a third button. Nothing depends on the answer except Colin, and he is fine */
      const RQ3 = [['ASK COLIN', 'ask'], ['MAYBE', 'maybe'], ['(he is fine)', 'fine']];
      function rqEnd(how) {
        const r = S.rq; if (!r) return; S.rq = null; api.clearTimeout(r.tm); E.rq.hidden = true; V.qc = false; const n = now(); S.colinStand = Math.max(S.colinStand, n + 400);
        if (how === 'yes') { api.stat.inc('weather-controller.rqYes'); singleDrop(false, true); api.setTimeout(() => mk('rqYes'), 6800); }
        else if (how === 'no' || how === 'ask') { api.stat.inc('weather-controller.rqNo'); api.sfx('tada'); api.confetti(undefined, undefined, 18); api.award(how === 'no' ? 7.5 : 5, 'restraint'); weatherSay('EXCELLENT RESTRAINT.', true); mk(how === 'no' ? 'rqNo' : 'rqAsk', null, 1); if (how === 'no') api.achieve('weather-controller.restraint'); else { S.colinLook = n + 4000; S.colinWave = n + 1800; } }
        else if (how === 'maybe') { singleDrop(true); api.award(2, 'maybe'); mk('rqMaybe', null, 1); }
        else if (how === 'fine') { api.award(3, 'he is fine'); S.colinLook = n + 2500; mk('rqFine', null, 1); }
        else if (how === 'time') mk('rqTime');
      }
      function rainQ() {
        if (S.rq || S.rqDone || S.dead || S.base !== 'play' || S.mode !== 'play') return; const n = now(), x3 = S.loops > 0 ? RQ3[Math.min(2, S.loops - 1)] : null; S.rqDone = true; V.colin.f = clamp(V.colin.f, .3, .7); S.colinStand = n + 19000; S.colinWave = 0; V.qc = true;
        const b = (t, k) => el('button', { type: 'button', class: C('btn'), onclick: () => { touched(); rqEnd(k); } }, t);
        E.rq.textContent = ''; E.rq.appendChild(el('b', { text: 'RAIN ON COLIN?' })); E.rq.appendChild(el('small', { text: 'Form 27B/6(c). Colin has not been informed.' })); E.rq.appendChild(b('YES', 'yes')); E.rq.appendChild(b('NO', 'no')); if (x3) E.rq.appendChild(b(x3[0], x3[1]));
        E.rq.hidden = false; api.sfx('bell'); cap('Question for the viewer: rain on Colin? Yes or no.'); mk('rq1', null, 1); S.rq = { tm: api.setTimeout(() => rqEnd('time'), 18000) };
      }
      /* big moment: marked homework. For 8 seconds the sky borrows the WHAT YOU ASKED FOR picture and a red pen goes through it */
      const GRADES = ['C-', 'C- (Incomplete)', 'See me', 'C- (Resubmitted)', 'C-, with feeling'], HWN = ['Good effort. Sun is not a colour.', 'Same sun. Same note. See previous note.', 'See me. Bring the sun.', 'Resubmitted work has been resubmitted.', 'The sun has been marked. The sun is fine.'];
      function homework() {
        const w = S.cw, h = S.ch, dpr = S.dpr || 1, c = E.hwcv.getContext ? E.hwcv.getContext('2d') : null; if (S.hwDone || S.dead || !c || !(w >= 2 && h >= 2) || S.mode !== 'play' || S.base !== 'play') return; S.hwDone = true;
        E.hwcv.width = Math.round(w * dpr); E.hwcv.height = Math.round(h * dpr); const R = Object.assign({}, S.R), li = Math.min(S.loopNo, GRADES.length - 1), grade = GRADES[li], sr = h * (.07 + .06 * clamp(R.sun / 15, 0, 1)), sx = w * .74, sy = h * .27;
        const paint = st => {
          c.setTransform(dpr, 0, 0, dpr, 0, 0); drawSky(c, R, w, h, { pip: true, t: S.t }, PV); c.strokeStyle = c.fillStyle = '#d4352a'; c.lineWidth = Math.max(2, h * .016); c.lineCap = 'round'; c.textAlign = 'center'; c.textBaseline = 'middle';
          if (st >= 1) { c.beginPath(); c.ellipse(sx, sy, sr * 2.3, sr * 2.1, -.25, .2, 6.5); c.stroke(); }
          if (st >= 2) { const fs = Math.max(10, h * .08 | 0); c.font = 'italic 700 ' + fs + 'px Georgia,serif'; const lx = Math.min(w * .64, w - c.measureText('too much sun?').width / 2 - 8), ly = h * .7, ax = sx - sr * .3, ay = sy + sr * 2.15, k = h * .04; c.fillText('too much sun?', lx, ly); c.beginPath(); c.moveTo(lx, ly - fs * .7); c.quadraticCurveTo(lx - w * .05, (ly + ay) / 2, ax, ay + 2); c.moveTo(ax - k * .7, ay + k); c.lineTo(ax, ay + 2); c.lineTo(ax + k * .6, ay + k * 1.1); c.stroke(); }
          if (st >= 3) { const fs = Math.min(h * .3, w * .8 / (grade.length * .6)) | 0; c.save(); c.translate(w * .27, h * .66); c.rotate(-.2); c.font = '900 ' + fs + 'px Impact,"Arial Black",sans-serif'; const tw = c.measureText(grade).width; c.strokeRect(-tw / 2 - fs * .15, -fs * .55, tw + fs * .3, fs * 1.1); c.fillText(grade, 0, 0); c.restore(); }
        };
        E.hwnote.textContent = HWN[li]; E.hw.hidden = false; paint(0); mk('hw1', null, 1); api.award(1, 'homework'); api.stat.inc('weather-controller.homework');
        [[900, 1], [2800, 2], [4600, 3]].forEach(a => api.setTimeout(() => { if (!S.dead && !E.hw.hidden) { paint(a[1]); api.sfx(a[1] === 3 ? 'stamp' : 'blip'); } }, a[0]));
        api.setTimeout(() => ck('hwC'), 5200); api.setTimeout(() => { if (!S.dead) { E.hw.hidden = true; mk('hw2'); } }, 8000);
      }
      /* big moment: the Crawl. From 2:30 a news chyron along the bottom of the sky reports what the viewer actually did, about four seconds late, and what the show thinks of it */
      const CR_ACT = ['VIEWER MOVES <s> TO <v>. SKY UNMOVED. EXPERTS: SURPRISED', 'BREAKING: <s> NOW <v>. WEATHER REPORTS <a>. NOBODY HAS LOOKED AT THE DIFFERENCE', '<s> ADJUSTED TO <v> BY A HUMAN HAND. THE HAND HAS BEEN IDENTIFIED AND IS FINE', 'CORRECTION: <s> WAS NOT MOVED TO <v>. IT WAS ASKED, AND CHOSE TO REMAIN', 'VIEWER SETS <s> TO <v>. WEATHER "CONSIDERING OPTIONS" (OPTION ONE: NO)', 'LIVE: <s> AT <v>. CLIFFORD ISOBAR CREDITS HIMSELF. <s> DECLINES TO COMMENT'];
      const CR_FILL = ['COLIN REMAINS DRY', 'BUTTERFLY DENIES EVERYTHING', 'SANDRA PENDING', 'TUESDAY: STILL COMING. EXPERTS: NOT YET', 'DENNIS (PLANT) THRIVING. SOURCES: DENNIS', 'SANDRA HAS FLAGGED THIS CRAWL. THE CRAWL CONTINUES', 'A CLOUD IS ASSISTING WITH ENQUIRIES', 'THE SOCK REMAINS ON ITS JOURNEY. NO UPDATE AT THIS TIME', 'THE SUN WAS ASKED. THE SUN HAS DENIED IT', 'WEATHER SEEN OUTSIDE. WEATHER ALSO THE REPORTER'];
      function crawlStat(n) {
        const idle = Math.round((n - S.lastInput) / 1000), j = S.jarIn, p = S.colinPass, s = S.settles;
        return api.pick(['VIEWER HAS MOVED A CONTROL ' + s + (s === 1 ? ' TIME' : ' TIMES') + '. THE SKY HAS NOTICED SOME OF THEM', 'CLIFFORD CREDIT: ' + Math.round(S.credit) + '. WEATHER CREDIT: PENDING', 'JAR: ' + j + (j === 1 ? ' BUTTERFLY' : ' BUTTERFLIES') + ', 1 ALIBI. THE ALIBI HAS NOT BEEN QUESTIONED',
          idle > 8 ? 'VIEWER HAS NOT TOUCHED A CONTROL FOR ' + idle + ' SECONDS. SKY IS BEHAVING. SKY IS SUSPICIOUS' : 'VIEWER IS "VERY ACTIVE". THE SKY HAS DESCRIBED THIS AS "A LOT"', p > 0 ? 'COLIN HAS BEEN DRY ' + p + (p === 1 ? ' TIME' : ' TIMES') + ' TODAY. THE SKY IS NOT TIRED' : 'COLIN IS DRY. PASS 1 PENDING']);
      }
      function crawlTick(n) {
        const on = S.beat >= 3 && S.base === 'play' && S.mode !== 'cert'; if (E.crawl.hidden === on) { E.crawl.hidden = !on; E.sky.classList.toggle(C('crawling'), on); if (on) S.crawlAt = 0; }
        const act = S.lastAct, due = !!act && !act.rep && n - act.at >= 4000; if (!on || S.mode === 'hold' || (n < S.crawlAt && !(due && n - S.crawlSeen > 7000))) return;
        const parts = []; if (due) { act.rep = true; parts.push(fill(api.pick(CR_ACT), { s: CHNAME[act.ch].toUpperCase(), v: act.v, a: Math.round(S.A[act.ch]) })); } else parts.push(api.pick(CR_FILL));
        const sec = api.chance(.5) ? crawlStat(n) : api.pick(CR_FILL); if (sec !== parts[0]) parts.push(sec);
        const t = parts.join('  •  '), rm = reduced(), dur = rm ? 9 : clamp(8 + t.length * .11, 11, 22); S.crawlSeen = n; S.crawlAt = n + dur * 1000 + 1500;
        E.crawlT.textContent = t; E.crawlT.classList.toggle(C('still'), rm); E.crawlT.style.animation = 'none'; void E.crawlT.offsetWidth; E.crawlT.style.animation = ''; E.crawlT.style.animationDuration = dur + 's';
      }
      /* phones: there is no sticky sky to be had inside the module window (its ancestors clip), so the sky rides down the page by hand while the sliders are being worked */
      function stick() {
        if (window.innerWidth > 480) { if (S.stickY) { S.stickY = 0; E.sky.style.transform = ''; } return; }
        const nat = E.sky.getBoundingClientRect().top - S.stickY, room = E.app.offsetHeight - E.sky.offsetTop - E.sky.offsetHeight - 24, y = clamp(Math.round(-nat), 0, Math.max(0, room));
        if (y !== S.stickY) { S.stickY = y; E.sky.style.transform = y ? 'translateY(' + y + 'px)' : ''; }
      }
      function startElsewhere() {
        S.wantElse = false; if (S.base === 'elsewhere' || S.mode !== 'play' || S.post) return; clearOverlays(); hangUp(); S.base = 'elsewhere'; S.mode = 'elsewhere'; S.elseT0 = S.T; S.elseSaid = 0; clearFlies(); closeForm();
        E.pip.hidden = true; E.note.hidden = true; E.cons.classList.add(C('solid')); api.sfx('bell'); api.achieve('weather-controller.elsewhere'); api.stat.inc('weather-controller.elsewhere'); E.chys.textContent = K.watching; setFace('tired'); deskT(K.reg); S.fc = null; S.cd = null;
      }
      const ELSE_LINES = [[6, 'door'], [16, 'perfect'], [27, 'scare'], [38, 'colinFence'], [48, 'niceHere']];
      /* what the module does while you are not there. Idle is real time, never scaled; all of it is cancelled the moment you touch anything */
      const IDLE = [
        [70, () => ck('idleA')], [85, () => mk('idleOver')], [100, () => weatherSay(K.idleW, true)], [120, () => ck(['whisper1', 'whisper2', 'whisper3'][api.randInt(0, 2)])],
        [150, n => { S.colinStand = n + 9000; S.colinLook = n + 9000; mk('idleColin'); }], [180, () => { addSlip(K.postcardT, 'POSTCARD', 'Weather (Confident)'); mk('postcard'); }],
        [200, () => { addSlip(K.idleSandra, 'COMPLIANCE', 'Sandra'); api.sfx('stamp'); }], [240, () => mk('idle240')], [300, () => mk('idle300')], [360, () => ringPhone(true)], [420, () => ck('idle420')], [600, () => mk('idle600')]
      ];
      function endElsewhere() {
        S.base = 'play'; S.mode = 'play'; E.pip.hidden = false; E.note.hidden = false; E.cons.classList.remove(C('solid')); CHN.forEach(ch => { S.R[ch] = 7.5; syncInput(ch, 7.5); }); S.R.temp = 7.5; syncInput('temp', 7.5); S.R.fog = 0; setLever(0);
        ALLCH.forEach(ch => hop(ch, true, S.R[ch])); S.ego = 0; S.egoSaid = {}; S.post = true; S.postT0 = S.T; S.diaryN = 0; S.extras = []; applyEgo(); paintDiary(); setFace('smug'); ck('asISaid', null, 1); mk('elseBack1'); api.setTimeout(() => mk('elseBack2'), 2600);
      }
      function startCert() {
        if (!enterMode('cert', 14400)) return; const n = now(), c = Math.round(S.inputs + 7); S.cerT0 = n; E.certBody.textContent = api.player.name + ' has controlled the weather 0 times, observed it ' + api.fmt(c) + ' times, and been observed by it ' + api.fmt(c) + ' times, which is considered a draw.';
        E.certExtra.textContent = 'Countersignature required from Weather. Weather is out.'; E.certNotes.textContent = ''; E.cert.hidden = false; E.cert.classList.remove(C('out')); inertCons(); const tok = { n: api.fmt(c) };
        /* a 14-second ceremony: five narrator lines at a breathable spacing; the rest of the jokes are printed on the paper itself */
        const note = t => { if (S.dead) return; E.certNotes.appendChild(el('p', { text: t })); api.sfx('stamp'); };
        S.cer = [{ at: 0, fn: () => { api.sfx('tada'); api.confetti(undefined, undefined, 40); mk('endM1', null, 1); } }, { at: 1800, fn: () => { S.hatUntil = now() + 3000; } },
          { at: 2400, fn: () => { singleDrop(true); note(K.certDrop); } }, { at: 3000, fn: () => mk('tipped') },
          { at: 4200, fn: () => { if (S.sockTaken) { S.sockTaken = false; note(K.gordonBack); } else note(K.sockSalute); } },
          { at: 5600, fn: () => mk('endM3', tok, 1) },
          /* the ten-minute surprise: the countersignature turns up after all, written by the sky, in the wrong place */
          { at: 6400, fn: () => { E.certExtra.textContent = K.counterSig; weatherSay(K.counterBub, true); api.sfx('stamp'); } },
          { at: 8400, fn: () => mk('counterM', null, 1) }, { at: 10200, fn: () => ck(api.chance(.5) ? 'endC1' : 'endC2', null, 0) },
          { at: 11400, fn: () => { api.confetti(undefined, undefined, 30); if (S.loopNo > 0) mk('loop2', { n: S.loopNo + 1 }, 1); else mk('endM2', null, 1); } },
          { at: 13600, fn: () => { E.cert.classList.add(C('out')); api.achieve('weather-controller.ceremony'); api.award(5, 'ceremony'); S.loops++; S.loopNo++; api.stat.inc('weather-controller.loops'); save(); } }];
      }
      function resetLoop() {
        S.cer = null; E.cert.hidden = true; E.cert.classList.remove(C('out')); S.fired = {}; S.T = 0; S.beat = 0; S.post = false; S.loopSettles = 0; S.inputs = 0; S.combo = 0; S.alignLoop = 0; S.ego = 0; S.egoSaid = {}; S.capSaid = false; S.ledger = 0; S.loopSaid = false;
        S.perm = null; S.diaryN = 0; S.extras = []; S.agenda = []; S.force = null; S.boost = null; S.fc = null; S.cd = null; S.fcIn = 30; S.cdIn = 20; S.letIn = 20; S.shufIn = 25; S.spawnIn = 0; S.flyFirst = true; S.nameBag = []; S.regDone = false; S.reg = null; S.wantElse = false; S.sacredCd = 0; S.mv = []; S.auditDone = false; S.dennisDone = false; S.rareIn = 45; S.auditUntil = 0; S.perkUntil = 0; S.dropIn = undefined; E.sunnote.textContent = K.note; hangUp(); S.callsLoop = 0; S.callIn = 4; S.lunchDone = false; S.lunchUntil = 0;
        rqEnd('cancel'); S.rqDone = false; S.hwDone = false; S.crawlAt = 0; S.dropIn = undefined; E.hw.hidden = true; V.fx.length = 0; V.pa.length = 0; V.priv = false; V.gerald = false; clearFlies(); E.tray.textContent = ''; E.jar.textContent = ''; E.jar.appendChild(E.alibi); S.jarN = 0; S.jarIn = 0; S.jailing = false; E.jarw.classList.remove(C('shake')); E.jlab.textContent = K.jarEmpty; V.swarmT0 = -99; S.lockShow = false; S.fogNudged = false; E.ledger.hidden = true; E.diary.hidden = true; E.reqbtn.hidden = true;
        E.lg.concat(E.la).forEach(e => e.classList.remove(C('lit'))); E.lloop.setAttribute('opacity', '0'); CHN.forEach(ch => { S.R[ch] = 7.5; syncInput(ch, 7.5); prevR[ch] = 7.5; }); S.R.temp = 7.5; syncInput('temp', 7.5); S.R.fog = 0; setLever(0); ALLCH.forEach(ch => hop(ch, true, S.R[ch]));
        applyEgo(); paintLabels(); S.lockShow = false; paintHint(); E.s2.hidden = S.season2; S.pt = 0; S.force = null; advancePlan(true); S.lastAlign = now(); S.lastInput = now(); setFace('smug');
        S.reqs = 1; prevR.sun = 7.5; addSlip('REQUEST #0001 RECEIVED. Everything was reset to 7 1/2, previously everything. Status: Noted.', 'RECEIPT'); ck('asISaid', null, 1); mk('again', null, 1); paintLed(); save();
      }
      function save() { api.save.set('v1', { loops: S.loops, bestCombo: S.best, moves: S.moves, gordonSeen: S.gordonSeen, pokes: S.pokes, calls: S.calls, colinCalled: S.colinCalled }); }
      /* ---------- the director ---------- */
      const at = (sec, key, fn) => { if (S.T >= sec && !S.fired[key]) { S.fired[key] = 1; fn(); } };
      const cbFlag = (...names) => names.some(nm => !!api.flag.get(nm));
      /* the 3:00 surprise: Weather calls a meeting. All the ghosts sit at 7 1/2, which is nowhere near what you asked for */
      function meeting() {
        pushFx('meeting', 9); api.sfx('bell'); addSlip(K.meetSlip, 'MEETING INVITE', 'Weather (Confident)'); S.boost = { until: S.pt + 6, t: { sun: 7.5, rain: 7.5, wind: 7.5, cloud: 7.5, temp: 7.5 } };
        mk('meet1', null, 1); api.setTimeout(() => mk('meet2'), 2600); api.setTimeout(() => ck('meetC'), 4600); api.setTimeout(() => weatherSay(K.meetW, true), 6200); api.setTimeout(() => mk('meet3'), 9200);
      }
      /* rare event one: Sandra audits the sky and the weather has to hold still (Colin complies; he is the only one) */
      function audit() {
        if (S.auditDone || S.dead || S.mode !== 'play' || S.base !== 'play') return; S.auditDone = true; const n = now();
        S.freezeUntil = n + 6000; S.auditUntil = n + 6000; pushFx('audit', 6); api.sfx('stamp'); api.stat.inc('weather-controller.audits');
        E.sockstamp.textContent = 'AUDIT IN PROGRESS'; E.sockstamp.hidden = false; S.sockStamp = n + 3200; addSlip(K.auditSlip, 'NOTICE OF AUDIT', 'Sandra, Compliance');
        mk('audit1', null, 1); api.setTimeout(() => mk('audit2'), 2800); api.setTimeout(() => ck('auditC'), 4600); api.setTimeout(() => mk('audit3'), 6400);
      }
      /* rare event two: Dennis (Plant) receives a performance review and exceeds it */
      function dennisReview() {
        if (S.dennisDone || S.dead || S.beat < 4 || S.mode !== 'play' || S.base !== 'play') return; S.dennisDone = true;
        S.perkUntil = now() + 6000; api.sfx('stamp'); api.stat.inc('weather-controller.reviews');
        addSlip(api.flag.get('dennis.promoted') ? K.dRevP : K.dRev, 'PERFORMANCE REVIEW', 'Reviewed by Dennis'); mk('dRev1', null, 1); api.setTimeout(() => ck('dRev2'), 3200);
      }
      /* the beats between the beats: something new about every 20 seconds of director time, some of them callbacks to the rest of the building */
      const MICRO = [
        [20, () => mk('mi20')], [34, () => ck('mi34')], [62, () => mk('mi62')], [78, () => { E.sunnote.textContent = K.note2; mk('mi78'); }], [100, () => mk('mi100')], [140, () => ck('mi140')],
        [165, () => { if (S.sockOn && !S.sockTaken) mk('mi165'); }], [180, () => meeting()], [200, () => mk('mi200')], [225, () => ck('mi225')], [248, () => homework()],
        [255, () => { if (cbFlag('metToaster', 'toasterMet', 'toaster.met')) { addSlip(K.cbToastSlip, 'FROM THE TOASTER', 'toast'); api.sfx('pop'); mg('cbToast'); } }],
        [285, () => mk('mi285')], [296, () => { mk(S.loops > 0 ? 'phoneBeat2' : 'phoneBeat'); api.setTimeout(() => ck('phoneC'), 3200); }], [300, () => { if (cbFlag('cloud-gazer.certified', 'cloud-gazer.examiner')) mg('cbGazer'); }], [310, () => weatherSay(K.mi310, true)],
        [345, () => { if (cbFlag('metStapler')) { addSlip(K.cbStaplerSlip, 'FROM THE STAPLER (UNION)', 'Stapler, Local 1'); mg('cbStapler'); } }], [360, () => mk('mi360')],
        [410, () => { E.sunnote.textContent = K.note4; mk('mi410'); }], [430, () => ck('mi430')], [455, () => mk('mi455')],
        [520, () => { if (cbFlag('fax-machine.tuesdayMoved', 'tiny-bureaucracy.tuesday')) cg('cbTuesday'); }], [560, () => mk('mi560')]
      ];
      function onBeat(b) {
        if (b === 1) { S.spawnIn = 0; paintHint(); deskT(K.netUnlock); }
        if (b === 3) { E.reqbtn.hidden = false; E.diary.hidden = false; S.sockOn = !S.sockTaken; paintDiary(); mk('sock'); api.setTimeout(() => mk('sandra1'), 2500);
          api.flag.set('sockSeen', true); /* lint-ignore: shared flag on purpose */
        }
        if (b === 4) { paintLabels(); mk('relabel1'); api.setTimeout(() => mk('relabel2'), 3000); api.setTimeout(() => mk(api.flag.get('dennis.promoted') ? 'dennisPromo' : 'dennis'), 6000); egoAdd(0); E.sunnote.textContent = K.note3;
          if (cbFlag('metDennis', 'plantClicked')) api.setTimeout(() => mg('cbDennis'), 9500); }
        if (b === 5) { E.ledger.hidden = false; mk('ledger1'); S.shufIn = 25; egoAdd(0); }
        if (b === 6) { S.cdIn = 8; egoAdd(0); }
        if (b === 7) { V.priv = true; mk('privCloud'); S.letIn = 12; egoAdd(0); if (api.flag.get('metGerald')) { V.gerald = true; mk('gerald1'); api.setTimeout(() => api.say(KL('gerald2').t, { who: 'Gerald', mood: 'proud' }), 3000); api.setTimeout(() => ck('gerald3'), 6000); } }
      }
      function beatTick(dT, n) {
        let b = 0; BEATS.forEach((s, i) => { if (S.T >= s) b = i; }); while (S.beat < b) { S.beat++; onBeat(S.beat); }
        if (S.base === 'elsewhere') {
          const e = S.T - S.elseT0; while (S.elseSaid < ELSE_LINES.length && e >= ELSE_LINES[S.elseSaid][0]) { mk(ELSE_LINES[S.elseSaid][1]); S.elseSaid++; } if (e >= 55) endElsewhere(); return;
        }
        if (S.mode !== 'play') return;
        if (S.beat >= 1) { S.spawnIn -= dT; if (S.spawnIn <= 0) { if (B.length < capNow()) { spawnFly({ gordon: !S.flyFirst && S.beat >= 1 && api.chance(1 / 25) }); S.spawnIn = S.beat >= 7 ? api.randInt(8, 12) : api.randInt(14, 22); } else S.spawnIn = 1; } }
        MICRO.forEach(m => { const key = 'mi' + m[0]; if (S.T >= m[0] && !S.fired[key]) { S.fired[key] = 1; if (S.T - m[0] < 25) m[1](); } });
        if (S.T >= 100) { S.rareIn -= dT; if (S.rareIn <= 0) { S.rareIn = 45; const r = api.rand(); if (r < .05) audit(); else if (r < .1) dennisReview(); else if (r < .13) lunch(); } }
        at(110, 'gift', () => { if (!S.alignLoop) { S.gift = { ch: null, until: n + 8000 }; mk('gift', null, 1); } });
        at(125, 'umbrella', () => { S.freezeUntil = n + 2000; mk('umbrella'); });
        at(240, 'fav', () => { const best = CHN.slice().sort((a, c) => S.moves[c] - S.moves[a])[0]; if (S.moves[best] > 0 && !S.favSaid) { S.favSaid = true; mk('fav', { slider: lab(best) }); } });
        if (S.T >= 180 && !S.rqDone) { S.dropIn = (S.dropIn === undefined ? 60 : S.dropIn) - dT; if (S.T >= 330) rainQ(); else if (S.dropIn <= 0) { S.dropIn = 60; if (api.chance(1 / 12)) rainQ(); } }
        if (S.beat >= 3) { S.fcIn -= dT; if (S.fcIn <= 0 && !S.fc) { S.fcIn = 45; forecastStart(); } if (S.fc && n >= S.fc.until) forecastEnd(); }
        if (S.beat >= 5) { S.shufIn -= dT; if (S.shufIn <= 0) { S.shufIn = 25; S.perm = api.shuffle([0, 1, 2, 3]); paintLabels(); mg('shuffled'); } }
        if (S.beat >= 6) { S.cdIn -= dT; if (S.cdIn <= 0 && !S.cd) { S.cdIn = 35; S.cd = { start: n, n: 5, thing: api.pick(WXWORDS) }; } cdTick(); }
        if (S.T >= 300) { S.callIn -= dT; if (S.callIn <= 0 && !S.ring && n - S.lastInput < 30000) { S.callIn = S.loops > 0 ? 24 : 32; ringPhone(false); } }
        if (S.beat >= 7) { S.letIn -= dT; if (S.letIn <= 0) { S.letIn = 40; sendLetter(); } }
        if (S.T >= 480 && !S.regDone) { if (B.length >= 7) leave(B.find(f => f.state !== 'leave') || B[0]); const r = spawnFly({ reg: true, force: true }); if (r) { S.reg = r; S.regDone = true; } }
        if (S.T >= 495 && S.reg && S.reg.state === 'fly') { const c = S.occ.cloud; if (c) leave(c); S.reg.ch = 'cloud'; S.reg.state = 'toland'; }
        if (S.T >= 520 && !S.post) S.wantElse = true; if (S.wantElse) startElsewhere();
        if ((S.post && S.T - S.postT0 >= 15) || (S.T >= 585 && !S.post)) startCert();
        if (api.selftest) {
          at(35, 'rh1', () => { S.mv = new Array(20).fill(n); pushMove(); }); at(70, 'rh2', () => { S.netBuf = new Array(15).fill(n); swing(null); }); at(100, 'rh3', () => { S.noBuf = new Array(12).fill(n); doNothing(); });
          at(130, 'rh4', () => fogged()); at(165, 'rh5', () => singleDrop()); at(200, 'rh6', () => { CHN.forEach(c => { S.R[c] = 7.5; syncInput(c, 7.5); }); S.R.temp = 7.5; syncInput('temp', 7.5); S.loopSettles = 3; sacred(); });
          at(240, 'rh7', () => indoor()); at(150, 'rhA', () => audit()); at(230, 'rhD', () => dennisReview()); at(280, 'rh8', () => { for (let i = 0; i < 8; i++) submitForm(); }); at(320, 'rh9', () => startListening());
          at(185, 'rhL', () => lunch()); at(345, 'rhK', () => { S.calls = 6; ringPhone(false); answerCall(); });
        }
      }
      function modeTick(n) {
        if (S.mode === 'hold') { const el2 = clamp((n - S.holdStart) / 8000, 0, 1); E.holdq.textContent = 'Queue number ' + (7.5 - .5 * el2).toFixed(1); if (n - S.holdBeep > 700) { S.holdBeep = n; api.sfx('bloop'); } }
        if (S.mode === 'listening' && n > S.listenAt + 10000 && !S.listenSaid) { S.listenSaid = true; ck('idleC'); }
        if (S.mode === 'cert' && S.cer) { const e = n - S.cerT0; S.cer.forEach(c => { if (!c.done && e >= c.at) { c.done = true; c.fn(); } }); }
        if (S.dropSay && n >= S.dropSay) { S.dropSay = 0; S.hushUntil = 0; api.say(K.drop, { who: 'Management', mood: 'neutral', priority: 2 }); }
        if (S.mode !== S.base && S.until && n >= S.until) leaveMode();
      }
      function upkeep(n) {
        const A = S.A, rm = reduced(), idle = n - S.lastInput;
        if (S.bubUntil && n >= S.bubUntil) { S.bubUntil = 0; E.bubble.hidden = true; } if (S.stampUntil && n >= S.stampUntil) { S.stampUntil = 0; E.stamp.hidden = true; } if (S.sockStamp && n >= S.sockStamp) { S.sockStamp = 0; E.sockstamp.hidden = true; }
        if (S.titleUntil && n >= S.titleUntil) { S.titleUntil = 0; api.setTitle(TITLE); mk('fogTitle'); } if (S.gift && n >= S.gift.until) S.gift = null;
        if (S.netLeave && n >= S.netLeave) { S.netLeave = 0; setPillowOn(false); mk('netBack'); } if (S.napUntil && n >= S.napUntil) { S.napUntil = 0; E.rc.hidden = true; E.veil.classList.remove(C('nap')); }
        if (S.indoorUntil && n >= S.indoorUntil) { S.indoorUntil = 0; E.cons.classList.remove(C('indoor')); E.veil.classList.remove(C('rainin')); }
        if (n < S.flashUntil) { E.tint.style.background = rm ? '#f4f1ea' : ['#ffe66b', '#7aa3d6', '#eef6ff', '#f4f1ea', '#4a5570'][Math.floor((S.flashUntil - n) / 400) % 5]; E.tint.style.opacity = '.55'; S.tinted = true; } else if (n < S.auditUntil) { E.tint.style.background = '#e6d9b0'; E.tint.style.opacity = '.4'; S.tinted = true; } else if (S.tinted) { S.tinted = false; E.tint.style.opacity = '0'; }
        if (S.combo > 0 && n - S.comboAt > 20000) { S.combo--; S.comboAt = n; }
        if (S.ring) {
          const r = S.ring; if (r.idle && !r.seen && S.lastInput > r.start) r.seen = n;
          if (S.mode !== 'play' || S.base !== 'play') hangUp(); else if (n >= r.until || (r.seen && n - r.seen > 20000)) { hangUp(); S.callsMissed++; api.stat.inc('weather-controller.callsMissed'); mg('callMiss'); }
        }
        E.sky.classList.toggle(C('frost'), A.temp <= 2.5); E.sky.classList.toggle(C('heat'), A.temp >= 12); E.cv.classList.toggle(C('shim'), A.temp >= 12 && !rm); E.cv.classList.toggle(C('wob'), n < S.wobbleUntil && !rm);
        V.colin.down = n < S.freezeUntil || S.mode === 'drop' || n < S.dropFx;
        if (S.mode === 'play' && S.base === 'play') {
          if (S.R.fog >= 9 && (S.drag.fog || S.keyFog)) { if (!S.fogSince) S.fogSince = n; else if (n - S.fogSince >= 10000) fogged(); else if (n - S.fogSince >= 3000 && !S.fogNudged) { S.fogNudged = true; mk('fogNudge'); } } else S.fogSince = 0;
          if (!S.loopSettles && idle > 12000 && !S.idleFlags.n1) { S.idleFlags.n1 = 1; mk('nudge1'); } if (!S.loopSettles && idle > 30000 && !S.idleFlags.n2) { S.idleFlags.n2 = 1; mk('nudge2'); }
          if (idle > 45000 && !S.idleFlags.listen) { S.idleFlags.listen = 1; startListening(); }
          if (idle > 25000 && n - S.lastClaim > 25000 && n - (S.ambAt || 0) > 25000 && S.mode === 'play') { S.ambAt = n; if (api.chance(.3) && !S.idleFlags.still) { S.idleFlags.still = 1; cg('still'); } else mg(S.beat >= 3 && api.chance(.5) ? 'ambientL' : 'ambient'); }
        }
        if (S.base === 'play' && S.mode !== 'cert') IDLE.forEach(e => { if (idle > e[0] * 1000 && !S.idleFlags['i' + e[0]]) { S.idleFlags['i' + e[0]] = 1; e[1](n); } });
        if (V.dennis && V.perk && !S.perkSaid && S.mode === 'play' && S.base === 'play') { S.perkSaid = true; mk('dennisStorm'); }
        if (V.pk === 'hail' && !S.hailSaid && S.T > 8 && S.mode === 'play' && S.base === 'play') { S.hailSaid = true; mk('hail', null, 1); } /* said when it is true: the first frame is rain, so the hail line waits for hail */
        if (S.rq && (S.base !== 'play' || S.mode === 'cert')) rqEnd('cancel');
        if (n - S.subAt > 6000) { S.subAt = n; S.subN++; const cr = Math.round(S.credit), when = ['4 seconds ago', '4 seconds ago', '4 seconds ago', 'yesterday', 'last Tuesday', 'in March (the other one)', 'in 1987, in pencil', 'before you opened this', 'before you opened this'][clamp(S.beat, 0, 8)]; setT(E.chyu, 'sub', S.subN % 2 ? 'Forecast issued ' + when : 'Credit claimed today: ' + cr); }
      }
      function director() {
        if (S.dead) return; const n = now(), dtr = clamp((n - S.lastTick) / 1000, 0, 1); S.lastTick = n; if (document.hidden) return;
        fit(); stick(); layout(); let dT = 0; if (S.mode === 'play' || S.mode === 'elsewhere') { dT = dtr * TS; S.T += dT; }
        modeTick(n); if (S.dead) return; beatTick(dT, n); upkeep(n); crawlTick(n); paintLed(); paintRo();
      }
      /* ---------- boot ---------- */
      api.on(window, 'scroll', stick, { passive: true });
      api.on(window, 'resize', () => { placeMover(); fit(); stick(); layout(); const n = now(); S.resizeBuf.push(n); while (S.resizeBuf.length && n - S.resizeBuf[0] > 3000) S.resizeBuf.shift(); if (S.resizeBuf.length >= 5 && n - (S.resizeAt || 0) > 20000) { S.resizeAt = n; mk('resize'); } });
      api.on(document, 'visibilitychange', () => {
        if (document.hidden) { S.hiddenAt = now(); return; }
        /* the director sleeps while the tab is hidden, so shift the clocks of a running ceremony or mode by the time away, or the whole thing would collapse into one frame on return */
        const gap = S.hiddenAt ? Math.max(0, now() - S.hiddenAt) : 0; S.hiddenAt = 0; if (S.mode === 'cert') S.cerT0 += gap; if (S.mode === 'hold') S.holdStart += gap; if (S.mode !== S.base && S.until) S.until += gap;
        S.lastInput = now(); S.lastTick = now(); S.lastTs = null; if (now() - S.returnedAt > 30000) { S.returnedAt = now(); mk('returned'); } });
      E.la.forEach(a => a.setAttribute('class', C('ln'))); E.hold.hidden = true; E.sockstamp.hidden = true; E.rc.hidden = true;
      placeMover(); paintGhosts(); fit(); layout(); advancePlan(true); paintLabels(); paintLed(); paintDial(7.5); paintRo(); applyEgo(); paintDiary(); syncInput('temp', 7.5); setPillow(false);
      api.setTimeout(() => {
        /* Clifford speaks at once (no blank panel), the hail line outranks the chatter so it is not dropped, and the mount-time Meh waits so Management's welcome plays first */
        const w = S.loops > 0 ? KL('welcomeBack') : KL('welcome'); mgmtT(w.t, w.mood, 1); ck('morning');
        api.setTimeout(() => mk('predecessor', null, 1), 5000); api.setTimeout(() => api.award(.1, 'clocking in'), 9000);
      }, 40);
      api.requestAnimationFrame(frame); api.setInterval(director, 250);
      return { destroy() { S.dead = true; save(); } };
    }
  });
})();

