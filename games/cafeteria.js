/* POINTLESS module: cafeteria */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-cafeteria-root{--ink:#2b2a33;--cream:#f3ead2;--mint:#a8c9a0;--mint2:#8fb587;--steel:#c9ced3;--steel2:#8f979e;--mus:#d9a62e;--cor:#e8756a;--lil:#b8a6d9;--gray:#8c8f86;--u:12px;position:relative;display:flex;flex-direction:column;gap:9px;padding:10px;min-height:420px;box-sizing:border-box;color:var(--ink);font:15px/1.35 ui-rounded,"Trebuchet MS",system-ui,sans-serif;background:#faf3df;overflow:hidden;-webkit-user-select:none;user-select:none}.m-cafeteria-root *{box-sizing:border-box}.m-cafeteria-label,.m-cafeteria-charter{-webkit-user-select:text;user-select:text}.m-cafeteria-root [hidden]{display:none!important}.m-cafeteria-root button{font:inherit;color:inherit;cursor:pointer}.m-cafeteria-root button:focus-visible,.m-cafeteria-seat:focus-visible{outline:3px dashed var(--cor);outline-offset:2px}.m-cafeteria-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.m-cafeteria-hdr{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.m-cafeteria-tab,.m-cafeteria-btn{border:3px solid var(--ink);border-radius:10px;background:#fff;padding:5px 11px;font-weight:800;box-shadow:3px 3px 0 var(--ink);min-height:38px;line-height:1.1}.m-cafeteria-tab.m-cafeteria-on{background:var(--mus)}.m-cafeteria-tab[aria-disabled="true"]{opacity:.55}.m-cafeteria-tab:active,.m-cafeteria-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-cafeteria-btn.m-cafeteria-on{background:var(--lil)}.m-cafeteria-btn[aria-disabled="true"]{opacity:.6}.m-cafeteria-sp{flex:1}.m-cafeteria-board{position:relative;align-self:center;max-width:100%;min-width:min(100%,300px);padding:8px 22px 10px;background:#fcfcf6;border:5px solid #9aa2a8;border-radius:6px;box-shadow:4px 4px 0 var(--ink),inset 0 0 0 2px #e3e6e8;transform:rotate(-1.2deg);text-align:center}.m-cafeteria-board:after{content:"";position:absolute;left:14px;right:14px;bottom:3px;height:6px;border-bottom:3px solid #e8756a;border-radius:50%/100%;opacity:.7}.m-cafeteria-btxt{display:inline-block;font:italic 700 clamp(1rem,3.4vw,1.45rem)/1.2 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;color:#27406b;overflow-wrap:anywhere;transition:clip-path .8s}.m-cafeteria-erase .m-cafeteria-btxt{animation:m-cafeteria-wipe .8s ease-in}@keyframes m-cafeteria-wipe{from{clip-path:inset(0 0 0 0)}to{clip-path:inset(0 100% 0 0)}}.m-cafeteria-main{display:grid;grid-template-columns:minmax(0,1fr);gap:10px}.m-cafeteria-root[data-w="wide"] .m-cafeteria-main{grid-template-columns:minmax(0,1fr) 270px}.m-cafeteria-left{display:flex;flex-direction:column;gap:10px;min-width:0}.m-cafeteria-brow{display:flex;flex-direction:column;gap:10px;min-width:0}.m-cafeteria-root[data-b="r"] .m-cafeteria-brow{flex-direction:row;align-items:flex-start}.m-cafeteria-cw{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}.m-cafeteria-band{position:relative;height:214px;border:3px solid var(--ink);border-radius:12px;overflow:hidden;overflow:clip;background:repeating-conic-gradient(#f3ead2 0 25%,#e1ead3 0 50%) 0 0/34px 34px;box-shadow:4px 4px 0 var(--ink);touch-action:none;cursor:grab}.m-cafeteria-counter{position:absolute;left:0;right:0;bottom:0;height:44%;background:linear-gradient(#b7d4ae,var(--mint2));border-top:8px solid var(--steel);box-shadow:inset 0 3px 0 #fff8,0 -3px 0 var(--ink)}.m-cafeteria-strip{position:absolute;inset:0;overflow:clip}.m-cafeteria-hall .m-cafeteria-tray{margin:0 auto}.m-cafeteria-wc.m-cafeteria-half .m-cafeteria-ie{font-size:calc(var(--u)*1.1)}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-seat circle{r:21px}.m-cafeteria-zone{position:absolute;top:0;bottom:0;left:calc(30% - 45px);width:90px;border-left:3px dashed #e8c44a;border-right:3px dashed #e8c44a;background:rgba(232,196,74,.13);pointer-events:none}
.m-cafeteria-zone.m-cafeteria-glow{background:rgba(232,117,106,.2);border-color:var(--cor);animation:m-cafeteria-glow 1.2s ease-in-out infinite}@keyframes m-cafeteria-glow{50%{background:rgba(232,117,106,.38)}}.m-cafeteria-dish{position:absolute;left:0;bottom:6px;width:220px;height:196px;padding:0;border:0;background:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;will-change:transform;-webkit-tap-highlight-color:transparent}.m-cafeteria-emo{font-size:clamp(48px,calc(var(--u)*5.5),72px);line-height:1;filter:grayscale(35%) sepia(20%) saturate(.7);transition:transform .5s;margin-bottom:6px}.m-cafeteria-dish:hover .m-cafeteria-emo{transform:translateY(-4px) scale(1.06)}.m-cafeteria-tent{max-width:150px;padding:2px 7px;background:#fffdf3;border:2px solid var(--ink);border-radius:5px;font:italic 700 .72rem/1.15 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;text-align:center;transform:rotate(-2deg);box-shadow:2px 2px 0 var(--ink)}.m-cafeteria-dish:focus-visible .m-cafeteria-tent{background:var(--mus)}.m-cafeteria-dennis{position:absolute;right:36px;bottom:44px;font-size:26px;animation:m-cafeteria-sway 3s ease-in-out infinite}@keyframes m-cafeteria-sway{50%{transform:rotate(8deg)}}.m-cafeteria-slice{position:absolute;top:18px;left:50%;margin-left:-26px;padding:3px 8px;background:#e6bd7c;border:2px solid var(--ink);border-radius:8px 8px 3px 3px;font-weight:900;font-size:.72rem;opacity:0;pointer-events:none;transform:translateY(18px)}.m-cafeteria-slice.m-cafeteria-up{opacity:1;transform:translateY(0);transition:transform .25s cubic-bezier(.3,1.8,.5,1),opacity .15s}.m-cafeteria-sbbl,.m-cafeteria-bubble{position:absolute;padding:4px 9px;background:#fff;border:2px solid var(--ink);border-radius:12px;font:italic 700 .75rem/1.2 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;box-shadow:2px 2px 0 var(--ink);z-index:4;pointer-events:none;max-width:210px;text-align:center}.m-cafeteria-sbbl{top:0;left:50%;transform:translateX(-50%)}.m-cafeteria-steam{position:absolute;left:0;right:0;bottom:30%;height:60px;pointer-events:none;opacity:.55}.m-cafeteria-steam:before,.m-cafeteria-steam:after{content:"";position:absolute;bottom:0;width:70px;height:54px;border-radius:50%;background:#fff;filter:blur(7px);animation:m-cafeteria-rise 5s linear infinite}.m-cafeteria-steam:before{left:20%}.m-cafeteria-steam:after{left:62%;animation-delay:-2.5s}@keyframes m-cafeteria-rise{from{transform:translateY(20px) scale(.7);opacity:0}30%{opacity:.7}to{transform:translateY(-40px) scale(1.3);opacity:0}}.m-cafeteria-guard{position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.34) 0 14%,transparent 14% 20%,rgba(255,255,255,.2) 20% 24%,transparent 24%),linear-gradient(rgba(255,255,255,.2),transparent 40%);border-bottom:6px solid rgba(255,255,255,.4)}.m-cafeteria-card{position:absolute;z-index:6;background:#fffef8;border:3px solid var(--ink);border-radius:8px;padding:9px 12px;box-shadow:4px 4px 0 var(--ink);font-size:.8rem}.m-cafeteria-receipt{top:8px;right:8px;width:min(250px,calc(100% - 16px));font-family:ui-monospace,Consolas,monospace;max-height:calc(100% - 16px);display:flex;flex-direction:column;overflow:hidden;transform-origin:top;animation:m-cafeteria-unfurl .35s ease-out}@keyframes m-cafeteria-unfurl{from{transform:scaleY(.1);opacity:0}to{transform:scaleY(1);opacity:1}}.m-cafeteria-receipt h4,.m-cafeteria-invoice h4,.m-cafeteria-flyer h4{margin:0 0 4px;font-size:.85rem;letter-spacing:.06em}.m-cafeteria-receipt ul{list-style:none;margin:0 0 4px;padding:0;flex:1 1 auto;min-height:0;overflow-y:auto}.m-cafeteria-receipt li{border-bottom:1px dotted #9a9a9a;padding:1px 0;overflow-wrap:anywhere}.m-cafeteria-tot{font-weight:900}.m-cafeteria-invoice{left:50%;top:14px;width:min(270px,calc(100% - 16px));margin-left:calc(min(270px,100% - 16px)/-2);background:#fff7bf;transform:rotate(-2deg);animation:m-cafeteria-slam .3s ease-out}.m-cafeteria-flyer{left:10px;top:8px;width:min(240px,calc(100% - 20px));background:#fff;transform:rotate(1.5deg);border-color:var(--cor)}@keyframes m-cafeteria-slam{from{transform:scale(1.6) rotate(-6deg);opacity:0}}.m-cafeteria-small{font-size:.72rem;opacity:.8}.m-cafeteria-bern{width:100%;display:flex;flex-direction:column;gap:6px}.m-cafeteria-root[data-b="r"] .m-cafeteria-bern{width:250px;flex:none}.m-cafeteria-portrait{position:relative;display:flex;align-items:flex-end;gap:8px;min-height:92px;border:0;background:none;padding:0;text-align:left}
.m-cafeteria-face{position:relative;width:78px;height:86px;flex:none;transition:transform .3s}.m-cafeteria-head{position:absolute;left:8px;top:2px;width:62px;height:62px;border-radius:50%;background:#e9c9a6;border:3px solid var(--ink);overflow:hidden}.m-cafeteria-head:before{content:"";position:absolute;inset:0;border-radius:50%;background:repeating-radial-gradient(circle at 50% 40%,rgba(80,70,90,.5) 0 1.4px,transparent 1.6px 5px);transition:opacity .6s}.m-cafeteria-nonet .m-cafeteria-head:before{opacity:0}.m-cafeteria-brow1,.m-cafeteria-brow2{position:absolute;top:26px;width:15px;height:4px;border-radius:3px;background:var(--ink);transition:transform .2s}.m-cafeteria-brow1{left:15px}.m-cafeteria-brow2{right:15px}.m-cafeteria-raise .m-cafeteria-brow2{transform:translateY(-6px) rotate(-14deg)}.m-cafeteria-eye{position:absolute;top:33px;width:6px;height:6px;border-radius:50%;background:var(--ink)}.m-cafeteria-eye.m-cafeteria-l{left:20px}.m-cafeteria-eye.m-cafeteria-r{right:20px}.m-cafeteria-mouth{position:absolute;left:25px;top:47px;width:12px;height:5px;border-bottom:3px solid var(--ink);border-radius:0 0 8px 8px}.m-cafeteria-apron{position:absolute;left:4px;bottom:0;width:70px;height:28px;border:3px solid var(--ink);border-radius:26px 26px 4px 4px;background:var(--mus)}.m-cafeteria-ladleb{position:absolute;right:-4px;bottom:18px;width:8px;height:44px;border-radius:5px;background:var(--steel);border:2px solid var(--ink);transform-origin:50% 100%;transform:rotate(18deg);transition:transform .25s}.m-cafeteria-stepout .m-cafeteria-face{transform:scale(1.25) translateY(-4px)}.m-cafeteria-stepout .m-cafeteria-ladleb{transform:rotate(-70deg) translateY(-10px)}.m-cafeteria-valve{position:absolute;left:-2px;bottom:6px;width:16px;height:10px;border-radius:3px;background:var(--steel2);border:2px solid var(--ink)}.m-cafeteria-puff{position:absolute;left:-6px;bottom:14px;width:24px;height:24px;border-radius:50%;background:#fff;filter:blur(3px);opacity:0}.m-cafeteria-venting .m-cafeteria-puff{animation:m-cafeteria-vent .9s ease-out}@keyframes m-cafeteria-vent{from{opacity:.95;transform:translate(0,0) scale(.5)}to{opacity:0;transform:translate(-8px,-52px) scale(2.6)}}.m-cafeteria-glass{position:relative;flex:1;min-width:0;height:140px;min-height:100px;border:3px solid var(--ink);border-radius:10px;background:#c4dcd8;overflow:hidden;box-shadow:3px 3px 0 var(--ink)}.m-cafeteria-root[data-b="r"] .m-cafeteria-glass{height:150px}.m-cafeteria-sent{position:absolute;inset:6px;display:flex;flex-direction:column;justify-content:center;gap:6px;pointer-events:none;overflow:hidden}.m-cafeteria-sline{font:italic 700 .88rem/1.25 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;color:#3a3345;overflow-wrap:anywhere}.m-cafeteria-tri .m-cafeteria-sline{font-size:.68rem;line-height:1.15}.m-cafeteria-final{font-size:clamp(1.05rem,2.9vw,1.25rem);color:#27406b;animation:m-cafeteria-slam .5s ease-out}.m-cafeteria-fog{position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y;cursor:crosshair}.m-cafeteria-sqon .m-cafeteria-fog{touch-action:none}.m-cafeteria-glint{position:absolute;inset:0;pointer-events:none;background:linear-gradient(120deg,transparent 0 30%,rgba(255,255,255,.55) 30% 36%,transparent 36% 44%,rgba(255,255,255,.35) 44% 47%,transparent 47%)}.m-cafeteria-hsss{position:absolute;right:10px;top:8px;font-weight:900;font-size:1.3rem;letter-spacing:.08em;color:#fff;text-shadow:0 0 3px #0008,2px 2px 0 var(--ink);opacity:0;pointer-events:none}.m-cafeteria-hsss.m-cafeteria-up{animation:m-cafeteria-hs 1s ease-out}@keyframes m-cafeteria-hs{from{opacity:1;transform:translateY(10px) scale(.7)}to{opacity:0;transform:translateY(-14px) scale(1.4)}}.m-cafeteria-bbl{position:absolute;right:8px;bottom:6px;z-index:3;left:auto}
.m-cafeteria-trayzone{position:relative;border:3px solid var(--ink);border-radius:12px;background:linear-gradient(#e4dcc3,#d6cdb0);padding:34px 8px 8px;box-shadow:4px 4px 0 var(--ink);display:flex;flex-direction:column;gap:8px}.m-cafeteria-trayhold{position:relative;min-height:112px}.m-cafeteria-tray{position:relative;z-index:1;width:min(300px,60%);height:112px;margin-left:calc(30% - min(150px,30%));border:3px solid var(--ink);border-radius:12px;background:linear-gradient(#dfe3e6,var(--steel) 40%,#b4bbc1);box-shadow:inset 0 0 0 3px #fff8,inset 0 -6px 0 var(--steel2),3px 4px 0 var(--ink);padding:7px;transition:margin-top .2s;touch-action:none;transform-origin:50% 60%;outline:0}.m-cafeteria-lev{margin-top:-4px}.m-cafeteria-wells{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:5px;height:100%}.m-cafeteria-wc{position:relative;min-width:0;min-height:0}.m-cafeteria-wc.m-cafeteria-half{align-self:end;height:56%;grid-column:4;grid-row:2}.m-cafeteria-well{position:absolute;inset:0;width:100%;border:3px solid var(--ink);border-radius:9px;background:#e9edf0;box-shadow:inset 2px 3px 0 #0003;padding:0}.m-cafeteria-sel .m-cafeteria-well{background:#fff3b8}.m-cafeteria-item{position:absolute;inset:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:0;background:none;padding:0;z-index:1;will-change:transform}.m-cafeteria-item.m-cafeteria-picked{background:rgba(217,166,46,.45);border-radius:7px;outline:2px solid var(--ink)}.m-cafeteria-ie{font-size:calc(var(--u)*1.7);line-height:1}.m-cafeteria-in{font-size:.58rem;font-weight:800;line-height:1;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.m-cafeteria-adj .m-cafeteria-ie{transform:rotate(14deg)}.m-cafeteria-stamp{position:absolute;right:0;top:0;font-size:.45rem;font-weight:900;color:var(--cor);border:1px solid var(--cor);transform:rotate(12deg);background:#fffd;padding:0 2px}.m-cafeteria-tape{position:absolute;left:0;right:0;top:40%;height:7px;background:repeating-linear-gradient(45deg,#e8c44a 0 5px,var(--ink) 5px 9px);opacity:.9}.m-cafeteria-trail{position:absolute;left:-14px;top:50%;width:12px;border-top:3px dotted var(--ink)}.m-cafeteria-gary{position:absolute;left:calc(30% - min(150px,30%) + 10px);top:-30px;display:flex;flex-direction:column;align-items:center;font-size:.58rem;font-weight:800;z-index:0;transition:opacity .6s}.m-cafeteria-gary span:first-child{font-size:2.3rem;line-height:1}.m-cafeteria-coat{position:absolute;left:calc(30% - min(150px,30%) + 62px);top:-24px;font-size:1.5rem}.m-cafeteria-away .m-cafeteria-gary,.m-cafeteria-away .m-cafeteria-coat{opacity:0}.m-cafeteria-gbbl{left:calc(30% - min(150px,30%) + 44px);top:-32px;width:max-content;max-width:min(230px,66%)}.m-cafeteria-gary.m-cafeteria-lean{transform:translateY(-8px) rotate(7deg) scale(1.12)}.m-cafeteria-plate{position:absolute;left:calc(30% - 30px);top:-42px;width:60px;height:42px;display:flex;align-items:flex-end;justify-content:center;z-index:5;pointer-events:none}.m-cafeteria-plate span{display:block;transform-origin:50% 100%;transition:transform .08s linear;font-size:34px;line-height:1}.m-cafeteria-ladle{position:absolute;left:calc(30% + 14px);top:-46px;font-size:30px;z-index:5;pointer-events:none;transform-origin:20% 10%;transform:rotate(60deg);opacity:0;transition:transform .15s,opacity .15s}.m-cafeteria-holding .m-cafeteria-ladle{opacity:1;transform:rotate(-8deg)}.m-cafeteria-ctrl{position:relative;z-index:2;display:flex;flex-wrap:wrap;gap:7px;align-items:center}.m-cafeteria-take{flex:1 1 150px;min-height:56px;font-size:1.25rem;font-weight:900;letter-spacing:.06em;background:#c7463a;color:#fff;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);text-shadow:0 2px 0 rgba(43,42,51,.55);touch-action:none;user-select:none}.m-cafeteria-take:active,.m-cafeteria-holding .m-cafeteria-take{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--ink)}.m-cafeteria-pulse{animation:m-cafeteria-pulse .9s ease-in-out 3}@keyframes m-cafeteria-pulse{50%{transform:scale(1.07);box-shadow:0 0 0 6px rgba(232,196,74,.7),4px 4px 0 var(--ink)}}.m-cafeteria-gauge{display:flex;gap:8px;align-items:center;font-weight:800;font-size:.78rem;background:#fff;border:2px solid var(--ink);border-radius:8px;padding:3px 9px}
.m-cafeteria-tilt{font-variant-numeric:tabular-nums;font-family:ui-monospace,Consolas,monospace;min-width:4.5ch;text-align:right}.m-cafeteria-label{background:#fff;border:3px solid #000;border-radius:2px;padding:7px 9px;font:13px/1.25 "Helvetica Neue",Arial,sans-serif;box-shadow:4px 4px 0 var(--ink);align-self:start}.m-cafeteria-lh{font-size:1.9rem;font-weight:900;line-height:1;margin:0;letter-spacing:-.02em;border-bottom:1px solid #000;padding-bottom:3px}.m-cafeteria-lr{padding:3px 0;border-bottom:1px solid #000;overflow-wrap:anywhere}.m-cafeteria-lr.m-cafeteria-thick{border-bottom:7px solid #000;font-weight:800;font-size:.8rem}.m-cafeteria-lr.m-cafeteria-b{font-weight:900;border-bottom:4px solid #000}.m-cafeteria-lq{margin:6px 0;border:2px solid #000;padding:5px 7px;font-style:italic}.m-cafeteria-lf{font-size:.72rem}.m-cafeteria-root[data-w="mid"] .m-cafeteria-label,.m-cafeteria-root[data-w="narrow"] .m-cafeteria-label{display:none}.m-cafeteria-lbopen[data-w="mid"] .m-cafeteria-label,.m-cafeteria-lbopen[data-w="narrow"] .m-cafeteria-label{display:block;align-self:stretch;animation:m-cafeteria-sheet .2s ease-out}@keyframes m-cafeteria-sheet{from{opacity:0;transform:translateY(-8px)}}.m-cafeteria-nb{position:relative;background:#fffef6;border:3px solid var(--ink);border-radius:10px;padding:8px 10px;box-shadow:4px 4px 0 var(--ink)}.m-cafeteria-nb h3{margin:0 0 6px;font-size:.95rem}.m-cafeteria-nl{display:flex;flex-direction:column;gap:5px;max-height:220px;overflow:auto;position:relative}.m-cafeteria-note{position:relative;font:italic 700 .8rem/1.25 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;padding:4px 8px;background:#fff7bf;border-left:4px solid var(--mus)}.m-cafeteria-cork .m-cafeteria-nl{display:block;height:auto;max-height:300px;overflow:auto;background:#c79a62;border:3px solid #7a5530;border-radius:6px;box-shadow:inset 0 0 20px #0004}.m-cafeteria-cork .m-cafeteria-note{position:absolute;width:44%;font-size:.7rem;box-shadow:2px 3px 0 #0003;border-left:0;z-index:1}.m-cafeteria-pin{position:absolute;left:50%;top:-4px;width:9px;height:9px;border-radius:50%;background:var(--cor);border:2px solid var(--ink);z-index:2}.m-cafeteria-strings{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.m-cafeteria-strings line{stroke:#c0302a;stroke-width:1.5;vector-effect:non-scaling-stroke}.m-cafeteria-hallv{display:flex;flex-direction:column;gap:9px;width:100%;max-width:600px;margin:0 auto}.m-cafeteria-hw{position:relative;border:3px solid var(--ink);border-radius:12px;background:var(--cream);box-shadow:4px 4px 0 var(--ink);overflow:hidden}.m-cafeteria-hsvg{display:block;width:100%;height:auto;aspect-ratio:4/3;min-height:0;touch-action:pan-y}.m-cafeteria-carry{touch-action:none}.m-cafeteria-seat{cursor:pointer;outline:none}.m-cafeteria-seat rect{fill:#fff;stroke:var(--ink);stroke-width:1.4;transition:fill .2s}.m-cafeteria-seat:hover rect,.m-cafeteria-seat:focus-visible rect{fill:#ffe9a0;stroke-width:2.4}.m-cafeteria-seat.m-cafeteria-here rect{fill:#ffe08a}.m-cafeteria-diner{transform-box:fill-box;transform-origin:50% 100%;transition:transform .5s}.m-cafeteria-shifting .m-cafeteria-diner{animation:m-cafeteria-shift 1.1s ease-in-out 3}@keyframes m-cafeteria-shift{50%{transform:translateY(-6px) rotate(-12deg)}}
.m-cafeteria-nod{animation:m-cafeteria-gnod 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}@keyframes m-cafeteria-gnod{50%{transform:rotate(6deg)}}.m-cafeteria-t75{transition:transform .4s ease-in-out}.m-cafeteria-htray rect.m-cafeteria-hb{fill:var(--steel);stroke:var(--ink);stroke-width:1.5}.m-cafeteria-tplate{font-size:7.5px;font-weight:800;fill:var(--ink)}.m-cafeteria-hbub{max-width:46%}.m-cafeteria-charter{padding:6px 10px;background:#f6e9c1 repeating-linear-gradient(90deg,transparent 0 8px,rgba(150,110,40,.07) 8px 9px);border:2px solid #b18a3c;border-radius:4px;font:italic .78rem/1.3 Georgia,serif;overflow-wrap:anywhere}.m-cafeteria-lunch{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px;border:3px solid var(--ink);border-radius:12px;background:#fff;box-shadow:4px 4px 0 var(--ink)}.m-cafeteria-ring{width:46px;height:46px;flex:none}.m-cafeteria-ring circle{fill:none;stroke-width:6}.m-cafeteria-stand{padding:9px 12px;background:#fff;border:3px solid var(--ink);border-radius:10px;box-shadow:4px 4px 0 var(--ink);animation:m-cafeteria-slam .3s ease-out;font-weight:800}.m-cafeteria-pips{display:inline-flex;flex-wrap:wrap;gap:2px;margin-left:6px;vertical-align:middle;font-size:.7rem}.m-cafeteria-pip{width:10px;height:10px;border-radius:50%;background:var(--lil);border:2px solid var(--ink);display:inline-block}.m-cafeteria-blue{position:absolute;inset:0;z-index:8;pointer-events:none;background:#1d2a4a;opacity:0;transition:opacity 2s}.m-cafeteria-ah .m-cafeteria-blue,.m-cafeteria-closed .m-cafeteria-blue{opacity:.55}.m-cafeteria-ah .m-cafeteria-emo{transform:scaleX(-1) rotate(-6deg)}.m-cafeteria-ah .m-cafeteria-steam{opacity:.9}.m-cafeteria-dark .m-cafeteria-blue{opacity:.86;transition-duration:.25s}.m-cafeteria-dark .m-cafeteria-emo{filter:grayscale(80%) brightness(.7)}.m-cafeteria-plaque{position:absolute;left:50%;top:40%;z-index:9;transform:translate(-50%,-50%);padding:10px 18px;background:#caa24a;color:#2b2a33;border:4px solid var(--ink);border-radius:6px;font-weight:900;text-align:center;box-shadow:5px 5px 0 var(--ink);max-width:90%;animation:m-cafeteria-slam .4s ease-out}.m-cafeteria-claps{position:absolute;left:0;right:0;top:34%;z-index:7;display:flex;justify-content:space-around;pointer-events:none;font-size:1.8rem}.m-cafeteria-claps span{animation:m-cafeteria-clap .5s ease-in-out infinite alternate}.m-cafeteria-claps span:nth-child(even){animation-delay:.2s}@keyframes m-cafeteria-clap{from{transform:translateY(0) rotate(-12deg)}to{transform:translateY(-14px) rotate(10deg)}}.m-cafeteria-fxl{position:absolute;inset:0;pointer-events:none;z-index:7;overflow:hidden}.m-cafeteria-fx{position:absolute;font-size:22px;opacity:0}.m-cafeteria-fx.m-cafeteria-go{animation:m-cafeteria-fly .9s ease-out}@keyframes m-cafeteria-fly{from{opacity:1;transform:translate(0,0) scale(.6)}to{opacity:0;transform:translate(var(--dx,0),-40px) scale(1.5) rotate(40deg)}}.m-cafeteria-closed .m-cafeteria-board{opacity:.85}.m-cafeteria-root .m-cafeteria-dish:focus-visible{outline:none}.m-cafeteria-root .m-cafeteria-dish:focus-visible .m-cafeteria-tent{outline:3px dashed var(--cor);outline-offset:2px;background:var(--mus)}.m-cafeteria-memo{top:8px;left:8px;right:auto;width:min(262px,calc(100% - 16px));background:#eef3ff;border-color:#27406b;transform:rotate(-1deg);animation:m-cafeteria-slam .3s ease-out}.m-cafeteria-memo h4{margin:0 0 4px;font-size:.8rem;letter-spacing:.06em}@keyframes m-cafeteria-rushbg{to{background-position:-34px 0}}.m-cafeteria-rush .m-cafeteria-band{animation:m-cafeteria-rushbg .45s linear infinite}.m-cafeteria-rush .m-cafeteria-board,.m-cafeteria-drill .m-cafeteria-board{border-color:var(--cor);animation:m-cafeteria-pulse .9s ease-in-out infinite}
@media (pointer:coarse){.m-cafeteria-hsvg{touch-action:none}}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-tplate{font-size:8px}.m-cafeteria-pl75{font-size:7px;paint-order:stroke;stroke:#f3ead2;stroke-width:2px;stroke-linejoin:round}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-pl75{font-size:9px}.m-cafeteria-lbx{display:none;margin-top:6px;min-height:34px}.m-cafeteria-lbopen[data-w="mid"] .m-cafeteria-lbx,.m-cafeteria-lbopen[data-w="narrow"] .m-cafeteria-lbx{display:block}@media (prefers-reduced-motion:reduce){.m-cafeteria-root *{animation-duration:.01s!important;animation-iteration-count:1!important;transition-duration:.01s!important}.m-cafeteria-steam{display:none}}.m-cafeteria-root .m-cafeteria-take{color:#fff}.m-cafeteria-hint{font-size:.76rem;font-weight:700;opacity:.85;text-align:center;margin-top:-2px}.m-cafeteria-rg{position:absolute;top:8px;z-index:5;padding:2px 8px;font-weight:800;font-size:.72rem;background:#ffe9a0;border:2px solid var(--ink);border-radius:8px;box-shadow:2px 2px 0 var(--ink);pointer-events:none;animation:m-cafeteria-pulse .9s ease-in-out infinite}.m-cafeteria-tent.m-cafeteria-ping{animation:m-cafeteria-pulse .9s ease-in-out 10;background:#ffe9a0}.m-cafeteria-soupw{position:absolute;left:0;bottom:30px;z-index:3;font-size:32px;line-height:1;pointer-events:none;transform:translateX(-60px)}.m-cafeteria-soupw.m-cafeteria-go{animation:m-cafeteria-soupgo 9s linear forwards}.m-cafeteria-soupw span{display:inline-block;animation:m-cafeteria-bob .5s ease-in-out infinite alternate}@keyframes m-cafeteria-soupgo{from{transform:translateX(-60px)}to{transform:translateX(calc(var(--bw,330px) + 40px))}}@keyframes m-cafeteria-bob{to{transform:translateY(-6px) rotate(6deg)}}.m-cafeteria-root[data-w="narrow"]{padding:8px 8px 140px;gap:7px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-tab,.m-cafeteria-root[data-w="narrow"] .m-cafeteria-btn{padding:4px 8px;font-size:.85rem;min-height:36px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-band{height:150px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-dish{height:140px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-board{padding:3px 14px 7px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-btxt{font-size:.95rem}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-bern{flex-direction:row;align-items:stretch;gap:6px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-portrait{min-height:0;flex:none;align-items:flex-start}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-portrait .m-cafeteria-small{display:none}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-glass{height:108px;min-height:0}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-trayzone{padding-top:30px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-ctrl{position:static}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-take{position:absolute;right:8px;top:30px;width:104px;height:112px;min-height:0;flex:none;font-size:1.3rem;z-index:2}.m-cafeteria-root[data-w="narrow"]:not(.m-cafeteria-hall) .m-cafeteria-tray{width:calc(100% - 118px);margin-left:0}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-card{font-size:.7rem;padding:6px 8px}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-hallv>.m-cafeteria-small{font-size:.9rem;opacity:1}.m-cafeteria-root:not([data-w="narrow"]) .m-cafeteria-trayzone{padding-top:8px}.m-cafeteria-root:not([data-w="narrow"]) .m-cafeteria-trayhold{margin-top:34px}.m-cafeteria-root:not([data-w="narrow"]) .m-cafeteria-ctrl,.m-cafeteria-root:not([data-w="narrow"]) .m-cafeteria-hint{order:-1}@media (max-height:860px){.m-cafeteria-root:not([data-w="narrow"]) .m-cafeteria-band{height:168px}.m-cafeteria-root:not([data-w="narrow"]) .m-cafeteria-receipt h4{display:none}}
@media (pointer:coarse){.m-cafeteria-root .m-cafeteria-btn,.m-cafeteria-root .m-cafeteria-tab{min-height:44px!important}.m-cafeteria-root .m-cafeteria-card .m-cafeteria-btn{min-height:40px!important}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-card .m-cafeteria-btn{min-height:36px!important}}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-receipt{padding:5px 8px;top:4px;right:4px;max-height:calc(100% - 8px)}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-receipt h4{display:none}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-receipt .m-cafeteria-btn{min-height:30px;margin-top:3px!important;padding:2px 8px}.m-cafeteria-corkin{position:relative;width:100%}.m-cafeteria-shelf{font-size:.72rem;font-weight:800;padding:2px 8px;background:#fff;border:2px dashed var(--ink);border-radius:8px}.m-cafeteria-sign{padding:3px 6px;background:#fff;border:2px solid var(--ink);font:900 .66rem/1.15 ui-rounded,system-ui,sans-serif;letter-spacing:.04em;text-align:center}.m-cafeteria-kev{color:#27406b;font-size:.8rem}.m-cafeteria-root[data-w="narrow"] .m-cafeteria-kev{font-size:.7rem}.m-cafeteria-lbl{font-style:italic;font-weight:600;opacity:1}.m-cafeteria-rvw{font-size:clamp(.85rem,2.6vw,1.05rem)}
`, 'css-cafeteria');

  P.addAchievements([
    { id: 'cafeteria.marshal', name: 'Grand Marshal of the Almost Cuisine', desc: 'Read the Nutrition Facts of 12 different dishes. Nobody feels more informed. The Percent Daily Value of Tuesday has been recorded.', icon: '🏅', reward: 3, check: function (s) { return (s['cafeteria.labels'] || 0) >= 12; } }, { id: 'cafeteria.velocity', name: 'Order of the Velocity, Third Class (Technically Fourth)', desc: 'Take Velocity for the first time by approaching the ladle too fast. You are 0.4 oz faster than you were.', icon: '➡️', reward: 1 }, { id: 'cafeteria.chancellor', name: 'Chancellor of the Seating Arrangement', desc: 'Sit at 10 different seats in the Hall. Each seat was warm. Each was wrong. The table has accepted your resignation from it.', icon: '🎓', reward: 4, check: function (s) { return (s['cafeteria.seats'] || 0) >= 10; } },
    { id: 'cafeteria.hiss', name: 'Keeper of the Sacred Hiss', desc: 'Read 12 different things Bernadette almost said. Not one finished sentence among them. This is the finest collection of its kind.', icon: '♨️', reward: 4, check: function (s) { return (s['cafeteria.fragments'] || 0) >= 12; } }, { id: 'cafeteria.tuesday', name: 'It Was Always Tuesday', desc: 'Reach the Closing Bell. The soup was Tuesday. It was always Tuesday. It is now somebody else\'s Tuesday.', icon: '📅', reward: 5 }, { id: 'cafeteria.balanced', name: 'The Tray That Balanced Physically (Do Not Tell The Tray)', desc: 'SECRET: Hit exactly 0.0 degrees of tilt. Management says it was an accident and signs it anyway.', icon: '⚖️', secret: true, reward: 5 },
    { id: 'cafeteria.reserved', name: 'Reserved Forever, Technically 7.5 Seconds Ago', desc: 'SECRET: Sit at Table 7 1/2. The placard has your name on it, and it is for someone else.', icon: '🔖', secret: true, reward: 7.5 }, { id: 'cafeteria.soup', name: 'The Soup Was Listening', desc: 'SECRET: Leave the line alone until it goes blue. The soup spoke once, softly. It has not done so since.', icon: '🍲', secret: true, reward: 3 }, { id: 'cafeteria.nothing', name: 'The Grand Order of Nothing On A Tray', desc: 'SECRET: Reach the register with an empty tray. The cashier saluted. Gerald stood.', icon: '🍽️', secret: true, reward: 3 },
    { id: 'cafeteria.seconds', name: 'Seconds of Seconds of Seconds', desc: 'SECRET: Take faster than a ladle can lawfully ladle. Bernadette stepped out. She was calm. It was worse.', icon: '🔔', secret: true, reward: 3 }, { id: 'cafeteria.half', name: 'Seven and a Half of Velocity', desc: 'SECRET: Collect Velocity 7 times, then one more at a standstill. A small fanfare was heard. It had not been told to start.', icon: '🌬️', secret: true, reward: 7.5 }, { id: 'cafeteria.skin', name: 'A Small, Offended Cloak', desc: 'SECRET: Receive the Pudding Skin. It sits on the tray. It will not discuss it.', icon: '🥣', secret: true, reward: 2 },
    { id: 'cafeteria.hm', name: 'Honorary Fellow of the Royal Society of Hm (Lifetime, Pending)', desc: 'SECRET: Ask Bernadette seven times while she is mid-sentence. She said Hm each time. On the seventh she meant it. A certificate exists and is a cough in a frame.', icon: '🎖️', secret: true, reward: 7 }, { id: 'cafeteria.service', name: 'Ten Minutes of Service (Plaque Pending)', desc: 'Spend ten minutes in the Cafeteria. You were presented with a plaque, a handshake from an empty chair, and the right to a second ten minutes.', icon: '🏷️', reward: 4 }, { id: 'cafeteria.rush', name: 'Express Lane Citizen of the Rush', desc: 'Reach the Register during the Lunch Rush. You arrived before your lunch did. It will be along, and it will not be sorry.', icon: '🏃', reward: 2 },
    { id: 'cafeteria.drill', name: 'Certified Still Under Soup (Class B, Provisional)', desc: 'SECRET: Hold perfectly still through a Soup Drill. The soup was still too. It has done it for years and asked not to be compared.', icon: '🚨', secret: true, reward: 2 }, { id: 'cafeteria.vp', name: 'Honorary Vice President of Spuds, Standing Division (Adjacent)', desc: 'SECRET: Stand beside the Executive Table with a tray, asking for nothing, for seven and a half seconds. Gerald stood. Nobody sat. It was the finest standing of the quarter, and the quarter has been told.', icon: '🥔', secret: true, reward: 7 },
    { id: 'cafeteria.kevin', name: 'Witness to the Complete Sentence (Temporary)', desc: 'SECRET: Be present while Kevin finishes every sentence he starts. Nobody was hurt. The steam is still thinking about it.', icon: '📝', secret: true, reward: 4 }, { id: 'cafeteria.garyfed', name: 'Hungry Gary, Served (Technically)', desc: 'SECRET: Let Hungry Gary hold your seventh take for seven and a half seconds. He did not want to eat it. He wanted to have been served.', icon: '🧍', secret: true, reward: 3 }
  ]);

  /* Management lines, one bag per key (category m:cafeteria:<key>) */
  const LINES = {
    'open.1': ["Welcome to lunch. It is already in progress. You are in it."], 'open.again': ["Welcome back to lunch. Nothing has changed except the parts nobody wrote down.", "Lunch is open. It was open before and will be open after. We stress the 'open'."], 'open.2': ["Tomorrow's Special will be today's special, but nervous. Today's is on the board, in chalk, with some courage."], 'open.3': ["The menu changes daily. Today it changed to yesterday's menu, in a smaller font."], 'open.drift': ["The line has moved a little on its own, as a courtesy. Take over whenever you like. We will not notice."], 'open.soup': ["Soup, Tentative. Served warm in the sense that it has heard of warmth."], 'open.push': ["Drag the counter, or use the arrow keys. Stop at a dish and hold TAKE. That is the whole job, and it is plenty."], 'friction.note': ["You will have noticed that the soup is slippery and the Jello is sticky. This is not a defect. This is a feel."], 'b2.ladle': ["The ladle has met many trays. It does not say how any of them turned out."],
    'b2.hold': ["Hold TAKE to serve. Release to stop. The serving size is however long you held it, which is a fact about you."], 'b2.velocity': ["The ladle has been seen scooping air at speed. Air is on the menu. We will not say what it is called."], 'wipehint': ["The glass is fogged. Bernadette is mid-sentence behind it. Wipe the fog to read her. She will not finish."], 'b3.gauge': ["Please note the Tray Equilibrium gauge. It reads 'Balanced (Emotionally)'. The tilt is physical. The two are not speaking."], 'b3.half': ["Please note that the tray holds seven whole compartments and one half. The half is not a rumor. The half is a rule."], 'tilt.first': ["Your tray has begun to lean. Per Sandra from Compliance, a tray may lean up to 12 degrees, or one afternoon, whichever comes first."], 'pa1': ["Attention, lunch. A reminder that lunch is currently happening. Thank you.", "Would the owner of a grey cardigan please collect it from Table 4. It has been there since 11:15 and is beginning to look at people.", "Napkins are available at the napkin station. The napkin station is wherever you are not.", "Attention. The 11:45 lunch has been moved to 11:44 for reasons we cannot discuss, which are traffic.", "A tray has been found. If it is yours, please describe it. If it is not yours, please describe yours.", "Please remember that the no-running policy applies to thought. Sandra has measured.", "Today's soup will be served at the temperature of its previous serving.", "Would whoever left a banana at the register please come forward and explain the banana."], 'pa2': ["Attention. The Cafeteria is aware of the Cafeteria. Further updates when the Cafeteria is.", "Would the person who has stood at Station 4 since 11:20 please confirm that they are a person.", "Reminder: the dishwasher is not a member of staff, despite repeated nominations.", "A coat in the Hall has been reported by several other coats. Please remain seated and coat-adjacent.", "Lost: one salt shaker, answers to 'Reasonably'. Last seen with a pepper. They are not related.", "Attention. A lunch has been left unattended in the line. It is yours. It has been yours the whole time.", "The Tuesday you ordered has been delayed. A Thursday has been substituted and will be received coldly.", "Would the owner of a parked sandwich please move it. It is blocking the other sandwich."], 'pa3': ["Attention. The Cafeteria wishes to apologise in advance for the next ten minutes, to everyone, individually.", "Would the soup please report to the soup. The soup has been looking for the soup.", "This is a courtesy announcement. The announcement is the courtesy.", "Attention. A coat has been seated at every table. This is not an emergency. It is a seating plan.", "The Cafeteria will be closing shortly. The Cafeteria will be opening shortly after. Please keep your sense of time on you.", "Hungry Gary has been paged to the front of the line. He is already at the front of the line. He has been paged anyway.", "A reminder that 'almost' is not an ingredient. It is a promise. Please stop asking the soup for it.", "Will the person holding the pea please return the pea. We know it is a message. We would like it back."],
    'dark.1': ["Please remain calm. The lights have been turned off as a scheduled surprise. The surprise has been delivered."], 'dark.2': ["Lights restored to their previous setting, which was 'on', and which nobody had been consulted about."], 'dark.3': ["During the outage, four sandwiches were unaccounted for. They are accounted for. They were all in the dark, together, and they would like to be left alone."], 'ten.1': ["You have been here ten minutes, rounded up by a generous clock. Management has prepared a short ceremony. The words of the ceremony are: ten minutes."], 'ten.2': ["For your service you receive this plaque, a handshake from the empty chair, and the right to a second ten minutes."], 'ten.gerald': ["Ten minutes is a long time to be a potato. I have waited in a cellar for longer. It was less lunch."], 'sock.1': ["A sock has crossed the counter at walking pace. It did not stop. It looked like it knew where it was going. It is not on the menu."], 'sock.2': ["The sock is back on the counter. It has been seen elsewhere in the building. It nods at you, because you have met."], 'sock.3': ["The sock has left through the register. It paid nothing. It was not asked. It was, if anything, thanked."],
    'stapler.known': ["Management recognises the Stapler from the Chairs. The Stapler recognises Management from the minutes."], 'hm.seven': ["That's seven, hon. I only ever had six in me. I borrowed the seventh off the steam."], 'hm.seven2': ["Management has no comment. Management has a certificate. It is a cough in a frame."], 'pudding.pop': ["The pudding's skin has popped. It made a small sound, like a very quiet decision."], 'line.different': ["The line is now a different line. Nobody mentions it. Bernadette is standing where she was, but to the left.", "The line is now another different line. Please update your sense of the line.", "The line has changed again. For the record, this is the third different line of the day. It still opens at 11:30, or sooner."], 'take': ["One {item}. It was on your tray in spirit already. We have simply made it official.", "Tray weight: 0.9 lbs of food and 3.1 lbs of expectation.", "{item}: taken. The {item} was not consulted. It has asked to be copied on any future decisions.", "A portion of {item} has joined your tray. It looked around. It does not love it, but it is staying.", "The ladle returns to its holster, which is a cup. The cup has been saying 'finally' since 1996.", "The {item} was served at the temperature of the room, which is the temperature of the {item}.", "Please keep the {item} level. The tray has agreed to hold it, not to like it.", "Per Sandra from Compliance, a take is a promise to the tray. The tray has not agreed to this.", "You took the {item} like someone who has taken things before. The {item} has no data on this.","The {item} goes to the tray. The tray goes to the register. The register goes to the register.", "A hairnet watched you take the {item}. It has made a note. It is a very small note.", "Another {item}. Management has begun to think of you as 'the {item} person'. It is not unkind. It is administrative."], 'take.short': ["That was a sample. We do not do samples. It has been recorded as 'a gesture'.", "That was less a serving than a rumor of a serving. The tray has filed it under 'hint'."], 'take.long': ["That was a very long serving. The {item} has had time to think. It has not changed its mind.", "You held that for two full seconds. The {item} used them to review its life choices and found them in order."], 'take.adequate': ["Adequate. Our highest rating. The next one up was never ordered.", "Adequate. It is the rating the soup got. The soup has it framed."],
    'take.n': ["That is {count} takes. The ladle has begun keeping a tally in a language it is inventing.", "{count} takes so far. Management is not counting. Management has a colleague who is."], 'take.adjacent': ["You have been served Adjacent {item}. Adjacent is the closest thing we have to arrived.", "Adjacent {item}: ladled near you, in your general direction, with love and poor aim."], 'take.adjacent2': ["Bernadette ladled at you without looking. The {item} landed at an angle that the tray is calling 'a lifestyle'."], 'velocity.first': ["You approached the ladle too fast and were served Velocity (0.4 oz). Nutritionally, it is mostly forward."], 'velocity': ["Velocity has been added to your tray. It will not stay put, which is its whole personality.", "Another Velocity. Your tray is now 0.4 oz more eager.", "Velocity, {count} of 7. Please do not rush the count. That is exactly what we are serving you.", "You have taken Velocity before. You have not taken it recently, and it noticed.", "Velocity, {count} of 7. It weighs almost nothing and has strong opinions about direction."], 'velocity.seven': ["Seven Velocities. Please slow down. We would like you to take exactly one more, at the speed of a held breath."], 'velocity.half': ["A half-portion of Velocity (0.2 oz), served at the speed of a held breath. The counter plays a very quiet fanfare. Nobody told it to start."],
    'pudding.skin': ["A Pudding Skin has been issued. It sits on the tray like a small, offended cloak. It cannot be moved. It has said so."], 'dennis.promote': ["Dennis (Plant) has been promoted. Dennis (Plant) did not attend the ceremony because Dennis is a plant. The Salad station is now called Dennis."], 'dennis.take': ["You took Dennis. Dennis is a plant, and was not on the menu. Dennis has not complained. Dennis has nothing to add.", "You took Dennis. Dennis took it well. Dennis takes everything well. It is why we have never asked."], 'donot.taken': ["You took the Do Not Take. The Do Not Take has been informed. It said 'do not' in a small voice and it was already too late."], 'sandra.nope': ["The checkpoint cannot be taken. The checkpoint takes.", "You may not take the Compliance Checkpoint. You may, however, be taken by it, with paperwork."], 'toaster': ["The Toaster has offered toast. It reads 'sorry'. The Toaster is not sorry about anything in particular. It is sorry in general, which is the warmest kind.", "A slice has popped up that says 'enjoy'. It means it. Toast, but it means it.", "The Toaster says 'welcome'. It says it with its whole slot.", "The Toaster pops nothing, which is a sentence. It is a sentence that says 'still here'."], 'toaster.known': ["The Toaster recognises you from elsewhere in the building. It pops nothing, warmly. It reads 'again'.", "The Toaster has seen you argue with a toaster before. It does not hold it against you. It has no holds. It has two slots."], 'spill': ["The {item} has been reclaimed by the line. It left quietly with its dignity partially intact.", "Your tray tilts left. The pudding takes this personally.", "The {item} has slid into a better life. The floor has accepted it. The floor has no comment.", "Lunch Incident #{count}. The {item} has been reclaimed. Please do not take it personally. Take it a little personally.", "The {item} has gone. We observed a moment of silence, and then a longer moment, because someone was still looking.", "Spill #{count}. You are developing a style. The style is gravity.", "The {item} left the tray at 4 degrees per second, which per policy counts as a graceful exit."], 'spill.first': ["The first item has left your tray. We gather here, briefly, in the cafeteria, to say a few words about the gravy, which has slid off into a better life. Thank you."],
    'overfull.1': ["Overfull. The tray holds seven and a half. You asked for eight. The {item} has been moved to Seconds, which is a shelf."], 'overfull.2': ["Seconds now holds 2 items. It has begun to organise."], 'overfull.3': ["The tray is full. The {item} has been moved to Seconds, which is a place, and is lovely this time of year."], 'overfull.4': ["Seconds has a waiting list. The waiting list is also in Seconds."], 'overfull.6': ["Overfull. The {item} has been asked to wait in the hall. The hall is the part of lunch that comes after this."], 'overfull.8': ["Seconds has elected a representative. It is the Velocity."], 'overfull.12': ["Seconds has a seating plan now. It has one table. The table is a shelf. Nobody has sat."], 'overfull.16': ["Seconds is now larger than Firsts. Firsts has asked for a meeting. Seconds will attend, late."], 'overfull.32': ["Seconds has been renamed 'Lunch'. Please update your sense of lunch."], 'overfull.64': ["Seconds has applied to be the Cafeteria. It would keep the name. It would change nothing else."],
    'velocity.over': ["Velocity, {count} of 7. The 7 has been informed.", "Velocity, {count} of 7. Seven has requested a transfer to Eight.", "Velocity, {count}. We have stopped saying 'of 7'. Seven has stopped answering."], 'gary.served': ["Hungry Gary has taken your {item}. The line has gone quiet. Nobody has seen him hold anything before."], 'gary.served2': ["Hungry Gary has returned the {item}, uneaten. He has been served. It was the whole of what he wanted."], 'sub.1': ["Complete sentences have been introduced on a trial basis. Kevin is temporary. His sentences are not."], 'sub.2': ["Kevin has finished two sentences in a row. The steam has not been consulted. The steam is restless, and also on a break."], 'sub.3': ["Bernadette is back. She has the apron, the ladle and the look of someone who has been told a thing."], 'end.sent': ["Bernadette has finished a sentence."], 'again.1': ["Welcome back. The ladle remembers you. It has not mentioned it."], 'again.2': ["Bernadette has been told you can read. She has taken it badly and well."], 'again.3': ["Reminder: Tuesday is still the soup. We had hoped to hear otherwise."], 'again.4': ["Gary Jr. has asked what the first Gary was like. Nobody could say. Everyone said 'hungry'."], 'perfect': ["The tray has reached 0.0 degrees. We believe this was an accident. We have signed it anyway."], 'gary.mgmt': ["You pushed backward. The line does not allow backward. Hungry Gary, to his credit, allows it, briefly.", "Backward detected. Hungry Gary has been asked to be flexible and has said he is.", "The line has gone backward. Technically it is also a line.", "Backward. Hungry Gary has gone from first in line to second in a line of one. He is processing."], 'glide': ["The tray is gliding to the dish. It could go faster. It has been asked not to, on behalf of the people who like to watch."], 'bern.ask': ["Bernadette leans in. Bernadette always leans in.", "Bernadette lowers her voice, which does not lower the steam."], 'frag': ["You have read: '{item}'. It stops there. It has always stopped there.", "Fragment filed under 'Things Bernadette Almost Said'. The folder is getting heavier.", "The steam valve opened at the exact wrong moment. It has never once opened at the right one.", "Another sentence, interrupted. This is the finest collection of its kind. It is also the only one.", "The sneeze guard fogs. The sneeze guard is loyal to someone.", "Bernadette says 'Nothing.' She says it like she is holding a door shut with it.", "Bernadette looks at the valve. The valve looks at the ceiling. The ceiling has seen this before.", "Filed. Page 4 of the notebook is only the word 'because', which has never once been followed."], 'wipeall': ["Steam cooldown: 10 seconds. Please do not take this personally. The steam does not."], 'wipeall.cooldown': ["The steam is still recovering. It has asked for a minute. It has asked for ten seconds, which is the same minute.", "The squeegee is on its break. It is not a long break. It is the break after the break.", "Please stop pressing it. The button is not broken. The button is tired of being right.", "Wipe all is cooling. Ten seconds. The steam asked for a sigh and was told a sigh is not a unit.", "You pressed it again. It heard you. It heard you the first time. This is the second time it heard you.", "Cooldown: a word that means 'we both need a minute'. It has been seven and a half seconds. Probably."], 'b4.register': ["The Register is at the end of the line, which is also the beginning. Please pay at whichever you reach first."], 'b4.register2': ["The Register is still at the end of the line, which is also the beginning. Please pay at whichever end you reach first."],
    'cork': ["Are you keeping a corkboard? On our time?"], 'cork2': ["The corkboard has been reviewed. All the strings lead to the soup. This has been noted, and then immediately denied."], 'b8.cork': ["The notebook has begun sorting itself. Please do not help it. It is doing very well on its own, and the strings are red."], 'b8.soup': ["The soup is now the heaviest thing in the building. It paid for itself earlier, which nothing else here has managed. Today it is official."], 'soup.line': ["The soup has joined the line, behind Hungry Gary. It has a tray. It is carrying itself, which is the only way soup has ever been carried."], 'soup.ahead': ["The soup is at the front now. Nobody asked where it was going. It looks like it has been there before."], 'soup.paid': ["The cashier has rung up the soup as 'Self'. The soup has paid for the soup. We are all still working out what that means."], 'b7.fog': ["Bernadette is writing more now. Three sentences in a row. She has chosen to be insistent. The steam has chosen to be on time."], 'hiss.register': ["The steam valve has opened over the register beep. The valve appears to be following you."], 'hiss.quiet': ["A sneeze at the Quiet Table was covered by steam. It was not a sneeze. It was the first half of a word."], 'hiss.gerald': ["Gerald nodded. The valve opened. Gerald did not appear to be affected, which is what worries the valve."], 'hiss.sheepish': ["The valve has given a very small, sheepish hiss. It did it for old time's sake. It would like that not to be discussed.", "A small hiss, from nowhere. Nobody has been interrupted. The valve is practising."],
    'sandra.bern': ["Sandra has asked Bernadette to stop. Bernadette has not been asked in the way that matters."], 'register': ["Register total: one feeling, plus tax. Tax is also a feeling.", "Please pay at the beginning of the line, where the line begins, for the second time.", "Your tray has been approved by a cashier who scans, weighs, and forgives.", "The Register accepts your feeling. It gives you change in weather. It is partly cloudy.", "The register has rung up your tray. The ring was brief, like a small bell being told something.", "Receipt printed. It will not be needed. It is a receipt the way a hug is a transaction.", "You have paid. Nothing has left your account. Something has left your afternoon.", "Please keep your receipt for as long as you keep your keys, then look at both and wonder."], 'regempty': ["The Register would like something to ring up. Nothing is not yet something. Please return once nothing has had time to settle."], 'seating.open': ["Seating: Open (it has always been open). Seating has also always been taken."], 'hall.first': ["Welcome to the Hall. Please carry your tray at a speed that suggests you know where you are going."], 'b4.seating': ["The door marked 'Seating' has opened. It was not locked. It was marked 'Seating' and that was enough."], 'fasting': ["Nutritional Void. The cashier salutes. Every table goes quiet. Gerald has stood and will not sit again this lap. We are all moved and have nowhere to put it."], 'lunch.start': ["Lunch has begun. It lasts seven and a half seconds. This is the whole of it.", "Lunch begins now. It will last 7.5 seconds, a number chosen by no one in particular.", "You are seated. Lunch lasts 7.5 seconds. Chew, if applicable. It is not applicable."], 'shift': ["You sat down and the table stood up. Per policy, this is a 'shift in seating philosophy'.", "Someone from your table has gone to get a napkin. They have been gone for the napkin's entire life.", "A new faction has arrived at your table. It is the same faction, wearing different name tags.", "The table has swapped places with the table next to it. Nobody has moved. The tables have.", "One diner leaves with a neat bow. You may have started this. The record is divided.", "The seat beneath you is now the seat beside you. You are pleased in a way that is not recorded.", "Everyone at your table has been reassigned to your table, in a different order. It is called 'rotation' and it is exactly what happened.", "Your conversation has been moved to Table 4, where it will be better received, by people who were not there."],
    'bell': ["You have been asked to find a better seat. There are 31 seats. The correct one is the one you just left. It is warm.", "Standing: Adjacent. Dignity: Adjacent. Belonging: also Adjacent, but closer than last time.", "The bell has rung. The bell is not wrong. The bell is ahead of you by a small, constant amount.", "Lunch is over. Please return your tray to where you got it. You got it from yourself, so it is a short walk.", "That was lunch. If it felt like less, it was. If it felt like more, please see the desk marked 'More'.", "The bell has rung for you personally. It has rung for others, but this one was yours."], 'coat.1': ["Request denied. The seat is taken by the Coat of Early Arrival. The coat has been there since 1996 and has seniority."], 'coat.2': ["The seat belongs to the Coat Whose Owner Is Unknown. The owner is unknown. The coat is not worried."], 'coat.3': ["That seat is held by the Coat (Quiet). It is so quiet it is technically a coat-shaped sound."], 'coat.4': ["The Coat That Remembers The Old Soup is seated there. It will not discuss the old soup. It remembers it anyway."], 'coat.6': ["The seat is taken by the Mop. The Mop has been here since the window was painted and is part of the view."], 'coat.again': ["You have asked the coat again. The coat has not changed its mind. It does not have a mind. It has a collar.", "The coat has been asked three times. It would like you to know it is flattered and has not moved.", "Persistence is noted. The seat remains occupied by something that does not blink and cannot be asked to.", "The coat has received your request. It is considering it in the manner of a coat, which is to hang there."], 'exec.refuse': ["The Executive Table is not enterable until Standing exceeds Adjacent. Standing is Adjacent. Standing will remain Adjacent. Please walk adjacent to it.", "The Executive Table is reserved for people who have been to the Executive Table. Gerald is reviewing your history. It is short and beige."], 'sandra.table': ["Sandra's Table (Compliance). Nobody sits. The clipboard has the seat. The clipboard has the minutes.", "Sandra's Table is not for sitting. It is for the idea of Sandra sitting, which is stronger."],
    'hall.idle': ["The nearest table has noticed you standing there with a tray. It is willing to be sat at. It is also willing to be looked at, and would prefer that.", "A table has gone quiet to match you. It is a very supportive silence, and it knows what it is doing.", "Someone at the Interns' table asked the table whether you are a new hire. The table said 'Probably.'", "The coat at Table 2 has not moved. It has been waiting longer than you. It would like you to know that this is not a competition."], 'hall.walk': ["The tray is walking itself to the seat. You are welcome to follow, which is the same as leading, with less responsibility."], 'coat.line': ["Management notes that a coat has joined the line. It holds no tray. It has seniority."], 'gerald.nod': ["Gerald, at the Executive Table, nods at the mashed potatoes. It is not clear whom the nod is for. It is a family matter."], 'gerald.line': ["A tray is merely a plate with ambition.", "He who carries soup carries a small ocean, and a large mistake.", "The potato does not hurry. The potato arrives, in the form of dinner.", "Every lunch is a small retirement.", "Do not ask the soup what it was. Ask what it is becoming. It will say 'cold'.", "It is not the tray that is heavy. It is the Tuesday upon the tray."], 'gerald.stand': ["Gerald has stood up at the Executive Table, nodded at you, and sat again. Nobody has ever seen Gerald stand. It was fine. It was a lot."], 'half.slide': ["Table 7 1/2 is Reserved. Please see the host. There is no host. The host is reserved.", "You came within 7.5 of the table. The table slid one seat to the right. It was not rude about it.", "The table has moved again. It has moved the way a thought moves when you look at it.", "Table 7 1/2 has stepped aside. It does that. It is politer than the other tables and more difficult to meet.", "The table has gone. It left a smaller table's worth of silence."], 'half.pity': ["That is 7 attempts. The table has stopped out of pity. You have 7.5 seconds. Sit quickly, and with feeling."], 'half.sit': ["You have sat at Table 7 1/2. Nobody has ever sat at Table 7 1/2. It is set for one. It has your name on it, and it is for someone else."],
    'half.removed': ["The table has been removed as a clerical issue. You were never there. You were, in fact, there."], 'placard.late': ["Table 7 1/2 now reads: Reserved for Valued Employee. You arrived 7.5 seconds late. The table is very understanding about it."], 'b6.menu': ["Management has updated the menu. The menu has been updated to include the things that were already there."], 'b6.steam': ["Steam vents are now random. The steam has been given discretion and is using it badly."], 'b7.flyer': ["Policy 9.4: Sporks Flagged by Sandra from Compliance. Every utensil on your tray is now Under Review."], 'sandra.stamp': ["REVIEWED (PENDING). One of your items has been reviewed. It is pending. It will be pending when you leave.", "An item on your tray has been stamped. The stamp says it is fine. The stamp also says it is pending. Both are legally the same."], 'sandra.fork': ["Policy 9.4: no one may eat a fork's worth of anything with a spoon's attitude."], 'tuesday.review': ["We have flagged this percentage for review. The review is Tuesday."], 'b9.bell': ["A long lunch bell has rung and the whole Hall has rotated one seat clockwise. Nobody has moved. The seats have."],
    'b9.stations': ["Five new stations have opened. They were always here. They were waiting for you to be more."], 'b9.gerald': ["Somewhere in the Hall, Gerald has stood and nodded at nobody. It has been entered into the record as 'at you'."], 'gary.jr': ["Hungry Gary has become Hungry Gary Jr. This is not a promotion. It is a continuation."], 'idle.20': ["Management notes you are standing very still. The soup is concerned.", "You have stopped moving. Lunch has not. Lunch is going slightly more quietly.", "Twenty seconds of nothing. We have written it down. It is now the longest item on the menu."], 'idle.40': ["Forty seconds. The Jello has begun to wobble in sympathy. It is not sure with whom.", "Still here? Good. Whatever you are doing is on the schedule as 'standing'.", "The tray has fallen asleep on its own tilt. It would like you to keep this between you.", "Hungry Gary has asked whether you are all right. He asked quietly, because he is also hungry."], 'idle.60': ["Sixty seconds. Management has begun to narrate the silence, which is a violation of the silence.", "The lights are thinking about dimming. They are asking the other lights. The other lights are also thinking.", "If you are waiting for something, it is also waiting for you. You may be meeting in the middle. The middle is Station 6."], 'afterhours.soup': ["I have been the same soup the whole time."], 'afterhours.1': ["It is quiet. The cafeteria is blue. Management is not lonely. Management has simply noticed the blue."], 'afterhours.gary': ["Hungry Gary has gone home. He left a note. The note says 'Same time tomorrow?' and then, smaller, 'Is there a tomorrow?'"],
    'afterhours.drip': ["It is 11:51 in the blue, and the soup has not asked Management a single question. Management has noticed this.", "The steam table hums a note it learned from somewhere. It is the only note. It is a good one.", "Somewhere in the Hall, a chair has been pushed in by no one. The chair has apologised.", "The Salad station has turned to face the wall. It said it needed a minute. It has had several.", "Bernadette has taken off her hairnet and is looking at it like a map of a country she has been to.", "The Toaster says nothing. It is the most comfortable nothing in the building.", "The register has counted what you have. It came to 'present'. It has added a small asterisk.", "It is blue in here. It is the blue of a form nobody has yet filled in. The blue has been waiting.", "Dennis (Plant) is thriving in the dark. Dennis (Plant) notes that this is not a metaphor.", "A clock somewhere has agreed with itself. Be careful. It is wrong, with confidence."], 'afterhours.back': ["Welcome back. Everything is as you left it, except warmer and also blue.", "You are back. The blue has been put away in a drawer with the other blues.", "Oh. You moved. Everyone is going to act normal about this. Act normal."], 'chairs.up': ["Chairs are going up on the tables, one by one, by themselves. Management did not ask. Management is, frankly, impressed."], 'chairs.drop': ["The chairs have come down. They would like it known that they went up on their own initiative."], 'spam.warn': ["Your ladle hand has begun to attract attention. Bernadette has stopped ladling and started looking.", "That is a lot of takes in a short time. The ladle has begun to sweat. It is a spoon. It was not built for this.", "Easy. The counter can hear you. It is a very long counter and it has been listening since 1996."], 'spam.seconds': ["Portion Control Bell. A second helping has been charged to the account of the first helping."], 'spam.seconds.again': ["Another invoice. Bernadette has begun stapling them together. The Stapler has asked who is responsible.", "Invoice for the invoice. Bernadette has stopped saying 'hon'. She has started saying 'account holder'.", "The Portion Control Bell has rung again. It is unfazed. It has rung for worse. It has rung for 'Thursday'.", "Fee applied. The fee has a fee. The fee's fee has a form. The form is on you."], 'spam.step': ["Bernadette has stepped out from behind the guard holding the ladle like a gavel. Please slow down."], 'spam.seconds2': ["You have taken Seconds of Seconds of Seconds. The tray is now a form of testimony.", "Seconds #{count} has been reviewed by the Seconds before it, who found it adequate and withdrew the word."],
    'spam.pea': ["Bernadette took the tray and counted the 70 things on it. You have been given one pea. 'Pace yourself, hon.'"], 'spam.pea.again': ["The pea has returned. It is the same pea. It has been on leave, and has grown, by perhaps a pea's width."], 'spam.pea2': ["The tray has been slid back, politely, with exactly one pea on it. The pea is warm. The pea is a message."], 'pea.follow': ["The pea has followed you into the Hall. It is not on your tray. It is simply with you. Bernadette has asked it to leave before, and it did not take it as a no."], 'end.pea': ["The pea has been seated at the Executive Table, beside Gerald. Gerald stood for it. The pea did not notice, which Gerald took as respect."], 'spam.label': ["You have read the label eleven times. It has started to say 'yes, I know' under its breath.", "Reading the label again has not changed it. It has, however, changed you slightly, and the label has noticed.", "The label has stopped saying anything new. It is now simply being looked at, which it finds a lot."], 'spam.nod': ["The table has run out of reactions to nod at. It has started to nod at the nodding.", "Please stop. The table has used up the week's nods. It is nodding on credit.", "The nodding has become structural. A table that stands for this is called a 'load-bearing table'."], 'end.1': ["Lunch is concluded. Lunch has been very well attended by you. Please return your tray."], 'end.2': ["Every table applauds politely. Gerald stands, nods, and sits. The soup is, for the first time, not being asked to explain itself."], 'end.3': ["Management congratulates you sincerely on the 4,000th lunch you have not yet had."], 'end.reset': ["The Special is now 'A Special (Again)'. The register total is 'one feeling, plus tax, minus yesterday'. Hungry Gary has become Hungry Gary Jr. Nothing is won. Nothing is lost."],
    'end.coat': ["A coat has sat down first. It is eating nothing at Table 2 with perfect posture. It has seniority."], 'end.valve': ["A very small hiss was heard from off-screen. It was an apology. It was received."], 'end.noach': ["The achievement for finishing does not exist. We checked. We also checked whether we had checked."], 'enter': ["Cafeteria of Almost Food. Please take a tray. The tray has already taken you.", "Lunch is served. Lunch has been served since before you arrived. You are arriving into a lunch already in progress."], 'exit': ["You have left lunch unfinished. Lunch has not noticed. Lunch never notices.", "You have left the cafeteria. Hungry Gary has moved up one place in a line that did not move."]
  };
  /* dishes speak once when you stop at them: a string, or [first cycle, later cycles] */
  const DISHLINE = {
    soup: ["Soup, Tentative. Served warm in the sense that it has heard of warmth.", "Soup, Tentative, again. Nobody has been told the soup is the same soup. The soup knows."], meatloaf: ["Meatloaf (Theoretical). Comes with a proof, which is also meatloaf.", "Meatloaf (Theoretical). The proof has been peer-reviewed by a second meatloaf, favorably."], jello: ["Jello Cube. It is wobbling under advisement.", "Jello Cube. It has stopped wobbling for 4 seconds in a row. It is rumored to be holding something in."],
    casserole: ["Casserole (Contains Casserole). Allergens: also casserole.", "Casserole (Contains Casserole). A smaller casserole is visible inside. It waves. It is not a wave."], salad: ["Salad Bar of Implication: a lettuce-like gesture, a cucumber-adjacent coin, and a tomato that wishes to be consulted.", "Salad Bar of Implication. The lettuce has begun to imply other things. All of them are about the dressing."], pudding: ["Pudding (Skin Optional). The skin has declined to comment.", "Pudding (Skin Optional). The skin has now commented. Its statement is a ripple, and it is under oath."],
    toaster: ["The Toaster offers toast. Only toast. It is warm, and it means 'I am glad you came.'", "The Toaster is here. The Toaster was always going to be here. That is its entire promise, and it keeps it."], sauce: ["Sauce, Source Unknown. Please do not ask the sauce. The sauce is on a break from being asked.", "Sauce, Source Unknown. The source has been located. The source has asked to remain unknown, for the sauce's sake."], corn: ["Corn (Distributed). It has been shared equally, which is to say none of it reached you in particular.", "Corn (Distributed). It was redistributed overnight. You received exactly what you received before, from a different direction."],
    sandwich: ["Sandwich of Implied Filling. Please do not check. Checking has been discouraged since Lunch Period 2.", "Sandwich of Implied Filling. Someone checked. The filling is now implied more firmly, and checking is discouraged for a second Lunch Period running."], beige: ["The Beige Cube. It is warm in spirit and beige in everything else.", "The Beige Cube. It has gone one shade past beige. The shade has no name yet and is being called 'the next one'."], cup: ["Pudding Cup, Sealed and Empty. The seal is intact. The emptiness is also intact. Both are guaranteed.", "Pudding Cup, Sealed and Empty. It has been resealed and re-emptied. A certificate was issued for each, and both certificates are empty."],
    register: ["The Register. A cash drawer made of a muffin tin. It accepts feelings and returns change in weather.", "The Register. The muffin tin has been polished. Nothing was in it. It is the polish of someone who is expecting company."], mashed: "Mashed Potatoes (Not Gerald). Gerald has asked that we stop saying 'Not Gerald' so loudly.", fish: "Fish Stick, Singular. He is the last of his line, and the line is one.",
    milk: "Milk of Uncertain Cow. The cow is pending.", sandra: "Compliance Checkpoint. Please present your tray, your items, and your reasons.", tomato: "Tomato Who Wishes To Be Consulted. It has been consulted. It wishes to be consulted again.",
    spork: "Spork (Flagged). Sandra from Compliance has asked it to choose a side. It has chosen both, in writing.", salt: "Salt, Reasonably. Reasonably is the amount. We are not taking questions on the amount.", gravy: "Gravy Boat (Empty). The boat is full of intention.",
    donot: "Station 7 1/2: Do Not Take. The sign is the dish."
  };
  P.addLines('m:cafeteria:enter', LINES.enter); P.addLines('m:cafeteria:exit', LINES.exit); delete LINES.enter; delete LINES.exit;
  Object.keys(LINES).forEach(function (k) { P.addLines('m:cafeteria:' + k, LINES[k]); });
  /* season 2: the Lunch Rush, the Soup Drill, the Hall hush, Gerald's standing order */
  const S2 = {
    'rush.1': ["The Lunch Rush has begun. The counter has been issued a conveyor and told to be a line.", "It is 12:04, which is Rush. The line is now moving at the speed of everyone else's lunch.", "Rush has been declared by a committee of one, who is already at the front and has not looked back."], 'rush.2': ["You are being carried. Per policy, being carried counts as taking part.", "The counter is now moving at four miles an hour, a speed Sandra has described as 'brisk, with intent'.", "To stay at a dish, lean backward. To be at a dish, you are already late.", "Please do not resist the Rush. The Rush has not noticed you resisting. It has noticed the tray."], 'rush.express': ["Express Lane. You reached the Register during the Rush, which is all a rush is for. A plaque was ordered, then cancelled for being too quick.", "Rush Express: 3 Meh. The Meh was already in a hurry and has gone ahead without you."],
    'rush.end': ["The Rush is over. It lasted about half a minute and will be remembered as 'the Rush', and also as 'that Tuesday'.", "The Rush has ended. The counter has been told to stand down, and is standing, in the sense that counters do.", "That was the Rush. Everyone behaved exactly as before, only faster, and in your direction."], 'rush.fax': ["Tuesday has replied to the fax. The reply is also a fax. It says: 'Moved. Not gone.'", "A fax from Tuesday has arrived at the register. It reads 'Received.' It was sent the day before, which is the problem."], 'drill.1': ["SOUP DRILL. In the event of soup, remain exactly where you are. This is not a test of you. It is a test of where you are.", "This is a Soup Drill. Please hold still for 7.5 seconds. Nothing is on fire. The soup is the nearest thing, and it is tentative."],
    'drill.mid': ["Hold. Hold it. The soup is watching your feet, which are not in the frame.", "Halfway. The drill would like you to know that it is nervous too, and is being very still about it."], 'drill.pass': ["Drill passed. You were exactly as still as the soup, which has had a great deal more practice.", "Soup Drill complete. Stillness has been recorded and filed under 'a lot to ask'.", "You held still for 7.5 seconds. Management cannot say what that was for. Management would like to say it again, slowly."], 'drill.fail': ["You moved during the Soup Drill. A fine of 0.5 Meh has been levied against your momentum.", "The drill has ended. Moving was not the right answer, but it was an answer, which is more than the soup gave.", "Drill failed. In the event of actual soup, you would have been somewhere else, and so would the soup."],
    'gerald.adj': ["You stand very well. Most people sit, and miss the whole point of the chair.", "I have not been stood next to in some years. It is like being a cellar with company."], 'gerald.adj2': ["Gerald has stood, said something to the doily, and sat. A title has been issued. It is Honorary. It is Adjacent. By cellar standards, it is a promotion.", "Management notes that nobody has stood beside Gerald for 7.5 seconds before. Management notes it a second time, privately, to see how it sounds."], 'hall.idle2': ["Forty seconds with a tray and no table. The Hall considers this a form of seating and has chosen not to say so.", "A chair at Table 3 has been pulled out for you by the draft. The draft is very polite and would like to be thanked in advance.", "Hungry Gary has entered the Hall, looked at your tray, and left. He did not take it personally. He took the line personally."],
    'hall.hush': ["A full minute. Every table has turned toward you, politely, the way a very large clock turns toward a very small hour.", "Sixty seconds of standing with a tray. All 31 seats now face you. Several of them are chairs, and it is going very well."], 'hall.hush.back': ["Everyone has turned back. They were not looking. They were, at the time, simply in that direction.", "The Hall resumes. The Hall says it was only stretching. It stretched at you."], 'coat.found': ["The coat at Table 2 has a ticket pinned to it, countersigned by Wendell. The ticket says 'Found.' The coat was not told it was lost."], 'coat.rock': ["A small rock has been left on the mop's chair, and told to stay, and has taken this as a career."],
    'afterhours.drip': ["The Jello has stopped wobbling. It is not holding anything in. It is simply, for once, between thoughts.", "One tray has been left at the end of the counter. It reflects a very small cafeteria, which also has a very small blue.", "The sneeze guard hums. Behind it a ladle rests on its hook, off duty, thinking about soup in the abstract.", "It is 11:58 on the clock that is wrong. For one minute it is right, by accident, and has decided not to mention it."], 'bern.ask': ["Bernadette checks the valve, checks you, and checks the valve again. She begins.", "Bernadette wipes her hands on her apron, which is how she clears her throat.", "Bernadette takes a breath she has been saving. There is a sentence in it."]
  };
  Object.keys(S2).forEach(function (k) { P.addLines('m:cafeteria:' + k, S2[k]); });
  P.addLines('tip', ["Tip: when the line starts moving by itself, lean backward. It is called Flow, and it has opinions but no brakes.", "Tip: if the soup is ever drilled, stop. If you are already stopped, stop harder.", "Tip: Management has noticed that nobody has ever stood beside Gerald on purpose. Management has noticed this on purpose."]);
  P.addLines('ticker', ["Lunch Rush declared at 12:04. Lunch declined to comment on being rushed. Gary was first through, behind you.", "Soup Drill held at Station 1. Soup remained still throughout and requests partial credit for an entire career.", "Tuesday sends memo. Memo read by Thursday, who feels implicated.", "Honorary VP of Spuds (Standing Division) still vacant. Nominees must have stood. Nominees have, in small numbers."]);
  P.addLines('tip', ["Tip: hold TAKE longer for a bigger portion. Hold it shorter for a gesture. Neither is lunch.", "Tip: the soup is slippery and the Jello is sticky. Bernadette is somewhere in between.", "Tip: wipe the fog. Read the sentence. Do not expect the end.", "Tip: Bernadette says 'Hm.' when asked twice. She is keeping count. So, privately, is the steam."]);
  P.addLines('ticker', ["BREAKING: Cafeteria reports 4,000 lunches not yet had. Sources: lunch.", "Bernadette declines to comment on the soup. Steam declines to comment on Bernadette.", "Table 7 1/2 'Reserved', again. Sources close to the table say it moved.", "Percent Daily Value of Tuesday reaches 112. Management calls the number 'a lot of Tuesday'.", "Coat at Table 2 still seated. Coat says 'I was here first.' Coat has seniority.", "Stapler (Local 7) lists Demand 6. Management calls it 'a minute of silence with extra steps'.", "Hungry Gary reaches the front of the line for the 40th consecutive lunch. He has not been served. He has been noticed.", "Sock spotted crossing cafeteria at walking pace. Authorities describe it as 'purposeful'."]);

  /* local bubble / label / card text, read through a shuffle bag */
  const TXT = {
    hm: ["Hm.", "Hm. (Dismissal.)", "Hm. (Concern.)", "Hm. (Recognition.)", "Hm. Not yet.", "Hm. (Soup-related.)", "Hm. (Off the record.)", "Hm. (Pending.)", "Hm. (Sandra is listening.)", "Hm. (Wait for it.)"], hon: ["Hon.", "Hon. Hon.", "Easy, hon.", "The ladle is not a doorbell.", "I see you.", "The ladle has a limit. I have a lower one."], gsigh: ["...", "I could eat. I could also not.", "The line shifts. Nothing else does.", "My stomach says 'soon'. I do not trust its tone.", "I have been first for 40 lunches. The line has no memory. I have a very good one.", "I have been hungry since the previous lunch.", "I am next. I have been next since before the soup was soup.", "Somebody said 'two minutes'. They meant two other minutes.", "I would like to speak to whoever made 'almost'.", "I brought a fork. It was confiscated for being optimistic.", "My tray is empty. My hope is a smaller tray inside it.", "The Jello and I are the same age. We do not discuss it."],
    gback: ["...is this backward?", "I did not know it could do that.", "I was here first. Now I am here second.", "Backward. Okay. I am flexible.", "The line has an opinion, and it is 'Gary, move.'"], gdark: ["Is this the surprise? I thought it would be food.", "I am still here. Just so somebody knows I am still here.", "I cannot see the line. That is fine. I have never needed to."], bdark: ["It is all right, hon. It is only the lights.", "Hold still. The soup likes this part.", "Do not worry. I have done this before. I have not enjoyed it before."],
    isanyone: ["Is anyone sitting here?", "Yes. Whoever you were about to be.", "Not yet. Soon. Not you.", "It is warm. That is not a yes. It is not a no.", "Someone is sitting here. They are in the napkin line.", "Technically.", "Only the draft. It is very particular about its chair.", "I think so. Ask the napkin.", "Probably not. It has the look of a seat that has never been asked."], clip: ["Minutes: lunch was held. Present: lunch.", "Item 1: the seat. Item 2: the seat (cont.).", "Action: Sandra to review Sandra.", "Sandra has asked Bernadette to stop. Bernadette has not been asked in the way that matters.", "Item 3: whether Item 3 is an item. Carried over.", "Motion to adjourn: moved, seconded, tabled, fed.", "Attendees: 31 seats, 3 of whom are coats. Quorum: not applicable.", "Minutes of the previous minutes: pending the minutes."], shush: ["Shhh."],
    salutes: ["I salute the tray. It is light. It is the lightest tray I have seen.", "I salute the nothing. It has done its best, and it is a lot."], placard: ["Reserved for: The Missing Sock", "Reserved for: A Quorum", "Reserved for: Someone Already Seated", "Reserved for: You, Last Tuesday", "Reserved for: The Previous Sitting", "Reserved for: Whoever Just Left", "Reserved for: A Long Story", "Reserved for: Sandra (Pending)", "Reserved for: Four Minutes From Now"], toastw: ["welcome", "sorry", "enjoy", "ok", "warm", "yes", "hello", "glad", "again", "here", "still here", "toast", "no problem", "thank you", "I know", "stay", "almost", "me too", "go on"],
    receipt: ["7 1/2 x Moments of Doubt", "Adjacent Surcharge ........ a nod", "Item Processing Fee ........ 3 seconds", "Tray Rental (per lunch) ...... 1 sigh", "Sandra's Review Levy ........ pending", "Napkin (theoretical) ....... free, not free", "Ladle Service ........ 2 dignity", "Bernadette's Silence ........ complimentary", "Gravy Tax ........ a little more than expected", "Loyalty Points ........ -4 (loyal to who)", "Gratuity ........ a feeling, again", "Forgiveness Fee ........ waived, then re-applied", "Parking (none) ........ validated", "Soup Handling ........ a nod from the soup", "Tuesday Reserve ........ 1 Tuesday, refundable", "Sneeze Guard Fee ........ forgotten", "Bernadette's Patience ........ -1, rolling"], serv: ["1 ladle (the ladle disputes this)", "1 reasonable amount of regret", "1 portion, spiritually", "7 1/2 grams, give or take a mood", "1 tray's worth, per tray", "1 forkful (a fork is on its way)", "1 afternoon, sliced", "whatever fits in the sentence", "2 heaped opinions", "1 serving, as defined by a different serving", "about as much as is polite", "1 Tuesday, divided by the number of Tuesdays", "the amount you would have taken, slightly less", "1 shrug (metric)", "14 bites, none of them yours"], cal: ["Calories: 140, give or take a mood", "Calories: enough", "Calories: not too many, not too few", "Calories: 0 (see footnote)", "Calories: a number, in a trench coat", "Calories: 4 minutes of reflection", "Calories: pending approval", "Calories: on loan", "Calories: roughly a short walk to the soup", "Calories: unknown, but in a good mood", "Calories: a rounding error that has been promoted", "Calories: equal to the weight of the question", "Calories: yes"],
    notc: ["Does not contain: the other 4 minutes", "Does not contain: closure", "Does not contain: a Wednesday", "Does not contain: what you hoped", "Does not contain: any of the above", "Does not contain: Gerald (confirmed)", "Does not contain: a decision", "Does not contain: seconds", "Does not contain: the feeling from the poster", "Does not contain: a second thought (a first is available on request)", "Does not contain: the soup that was promised", "Does not contain: Sandra", "Does not contain: an exit strategy", "Does not contain: itself, entirely"], alg: ["Allergens: the wrong decade", "Allergens: eye contact", "Allergens: mild interest", "Allergens: also allergens", "Allergens: the wrong shift", "Allergens: none, but it has opinions", "Allergens: being asked how it was", "Allergens: cheerful laminate", "Allergens: the memory of a different lunch", "Allergens: the word 'hearty'", "Allergens: mild guilt (trace)", "Allergens: Thursday"], foot: ["*See Form 27B/6.", "*Continued on the back. The back says 'see front'.", "*Footnote destroyed in 1998.", "*Per Sandra.", "*Not applicable after the feeling.", "*Ask Bernadette. She will say 'Nothing.'", "*Daily Value is a number nobody agreed on.", "*The asterisk is also an ingredient.", "*Subject to a recall of the recall.", "*Applies to servings, not to eating.", "*This asterisk has a smaller asterisk.", "*Read with the label that says 'Read with the label'.", "*Terms and conditions are lunch.", "*The footnote is not responsible for the label."],
    special: ["Today's Special: A Special", "Today's Special: A Special (Revised)", "Today's Special: Tomorrow's Special, Today", "Today's Special: The Special Formerly Known As Soup", "Today's Special: Whatever Is Left Of Tuesday", "Today's Special: Lunch, Reconsidered", "Today's Special: What The Soup Said Last Tuesday", "Today's Special: Please See Other Special", "Today's Special: The Last Special, Again"]
  };
  TXT.bserve = ["Mm-hm.", "There you go, hon.", "That is a serving.", "Careful with that.", "Hot. Possibly.", "Next.", "Sure.", "Hm. Fine.", "It's yours now.", "Mind the tilt."];
  TXT.price = ["a look", "a nod", "half a shrug", "3 seconds", "a small sigh", "one favour owed to Thursday", "a fond memory of a different soup", "your complete attention, then not", "the right to be mildly disappointed"];
  TXT.kask = ["I am Kevin. I am temporary. Ask me anything. I will finish it.", "Yes? Go on. I will answer, to the end.", "Please, ask. I have a very large supply of ends."];
  TXT.rvs = ["3 stars and a half.", "4 stars, reluctantly.", "2 stars and a nod.", "Half a star (the good half).", "3 stars, pending.", "5 stars, withdrawn."];
  TXT.rvc = ["Mixed signals.", "Would be seated again.", "Sandra has questions.", "The tray was level in spirit.", "The tilt has been noted, kindly.", "Recommended, by someone."];
  TXT.review = ["accepted", "noted", "reluctantly", "fine", "again?", "taken", "as expected", "pending", "warm-ish", "brave", "gone", "ok"];
  TXT.grush = ["Is it moving? It is moving. Why is it moving?", "I did not order a Rush.", "The line has gone forward without me, which is how I know it is working.", "I am being carried toward soup.", "This is the fastest I have ever been served nothing.", "Forward is a lot. Forward is so much."];
  TXT.hushb = ["Shh. The tray is doing a thing.", "Is that tray ours?", "They have been standing there so well.", "Nobody say anything. Nobody has.", "Seven and a half more seconds and we are all witnesses.", "It is holding the tray beautifully. It does not know where to put it."];
  TXT.memo = ["FROM: Tuesday. RE: Lunch. I will be attending. I am always attending. Please do not save me a seat. I will be in all of them.", "FROM: Tuesday. CC: Thursday (reluctantly). RE: The Rush. Noted. Please disregard the rest of the week.", "FROM: Tuesday. RE: The soup. I have read the soup. It is mine. It has always been mine. Regards, Tuesday.", "FROM: Tuesday (PROVISIONAL). RE: Your Meh. I have taken none of it. I would like you to notice that.", "FROM: Tuesday. RE: Scheduling. I have moved myself to the day before the day before. It has not helped. I am still here."];
  /* what a table says back, per button (Nod, 'Interesting', Pass the Salt): three variants each */
  const REPLY = {
    T1: [["The Staplers' union notes your nod. It was a good nod. It was not union scale.", "A stapler nods back. It is the sound of one jaw closing, repeated.", "Your nod has been submitted as Exhibit A. There is no Exhibit B. A is feeling confident."], ["'Interesting' is not on the list of demands. It has been added to the list of demands.", "'Interesting,' says the shop steward. 'Put it in writing, then staple it.'", "They write 'Interesting' on a placard. The placard goes on strike, and is also the placard."], ["The salt has been passed. The salt has joined the union. The salt wants better lighting.", "Local 7 accepts the salt under protest and uses it under supervision.", "A stapler seasons nothing, ceremonially, then passes the salt back with a receipt."]],
    T2: [["An intern nods back with great confidence and no information.", "The Interns nod in a wave, starting with the one who did not hear the question.", "Three interns nod. The fourth nods about the nod. It is called 'synergy'. They learned it this morning."], ["'Interesting,' says an intern, who did not hear what was said. 'Very.'", "An intern writes 'Interesting' on a napkin and circulates it for sign-off.", "'We were just saying that,' say the Interns, who were not."], ["The Interns pass the salt in a circle for forty seconds, correctly.", "An intern asks whether the salt has a deadline. It does not. It has a vibe.", "The salt is on its fourth review. It has been rated 'promising'. Salt is promising."]],
    T3: [["The Quiet Table nods in silence, which is the loudest way to nod.", "They nod back so softly it registers as a draft.", "One of them mouths 'thank you' with such restraint that it counts as a refund."], ["You said 'Interesting.' The Quiet Table is now at 9 decibels of disapproval.", "'Interesting' lands on the table like a dropped fork in a library.", "Someone at the Quiet Table says 'Shh' in a way that is also a review."], ["The salt is passed without sound. Nobody has ever heard it land.", "The salt is received with a nod so quiet it is also a bow.", "They pass the salt by a method that does not involve touching, hearing, or acknowledging salt."]],
    T4: [["'In my day the soup said something,' someone says, to your nod.", "A man nods slowly, the way you nod at a tide.", "'That is not how we nodded,' says someone, and shows you. It is the same nod. It is slower."], ["'Interesting,' they repeat, like the word is a reheated thing.", "'We had a different word for that,' says someone. 'We had no words. We had soup.'", "'Interesting,' says a woman, and the whole table goes quiet to see if it is true."], ["'This is not the old salt,' says a man, and holds it for the rest of the lunch.", "The salt is tasted, in silence, by a committee. It is 'near'.", "'The old salt had a shake,' says someone. They shake it. It is not the shake."]],
    T6: [["The mop nods, which is only the mop being moved by a draft.", "The mop has nodded. It is holding itself up, which is more than most.", "You nod at the mop. The mop is wet. It is having a quiet day."], ["The window has not responded. It is painted.", "'Interesting,' you say, to the view. The view, which is a painting of a view, takes it well.", "The mop considers 'Interesting' and, in a draft, withdraws it."], ["The salt is placed in front of the mop, who has not asked.", "You pass the salt to the window. The window is a rectangle. It thanks you in glare.", "The mop has been given the salt. It is the most responsibility the mop has had since the spill of '04."]]
  };
  const DEMANDS = ["Demand 1: one (1) corner of every tray to be called Break Room.", "Demand 2: a lunch that does not depend on anyone's tray being level.", "Demand 3: the word 'staple' to be spoken only in the past tense, with respect.", "Demand 4: a Thursday exclusively for the clamped. Management will take this to a Thursday.", "Demand 5: that the Jello be told what it is wobbling about. The Stapler will read it out personally.", "Demand 6: seven and a half minutes of silence per shift, to be observed by the shift. The Stapler will bring the minute.", "Demand 7: that Management stop saying 'circling back' in the presence of anything circular.", "Demand 8: a wider chair. The Stapler is a stapler. It would simply like to be asked.", "Demand 9: a coat to hold its seat. Management notes that coats hold their own. The Stapler says that is the point.", "Demand 10: nothing. The Stapler has met every demand and has stayed on, out of solidarity with the demands."];
  const MIL = { 10: "Ten takes. A small plaque has been ordered. It will arrive on a Tuesday, which we cannot promise exists.", 25: "25 takes. Bernadette has stopped counting out of respect and started counting out of fear.", 50: "50 takes. The ladle has asked for a day off. The ladle is a spoon. Management has said we will see.", 100: "100 takes. Please do not take this as an invitation. It is a statistic. It has been framed.", 250: "250 takes. The tray has been sent a card. It says 'Congratulations on your load.'", 500: "500 takes. We have run out of ways to say 'a lot of lunch'. We have started on 'a lot of a lot of lunch'." };
  const CHARTER = ["Seating Charter, Clause 14(c): persons holding the Wobble may not sit with persons not holding the Wobble, as the Wobble is not a social event.", "Clause 14(d): persons not holding the Wobble may sit with persons not holding it, provided they are holding something else.", "Clause 22: a seat is a promise made by a chair. The chair has not been informed.", "Clause 3(a): the seat you are standing in is the seat you are asked to leave.", "Clause 7 1/2: a table of one is a meeting.", "Clause 31: there are 31 seats. The correct seat is the one you just left, and it is warm.", "Amendment 14(c)(ii): see Amendment 14(c)(i), which was destroyed in 1998.", "Clause 14(z): see Clause 14(a). Clause 14(a) does not exist. Sandra has initialled this.", "Clause 9: a table with fewer than two people is a monologue. Monologues require a permit, which requires two people.", "Clause 11(b): the salt may be passed but not accepted. Acceptance is a separate form.", "Clause 40: any seat warmer than the person in it is, by definition, someone else's.", "Clause 6 1/4: a diner who leaves for a napkin is deemed to be present in the napkin.", "Clause 19: coats are persons for seating purposes and objects for tax purposes.", "Clause 28: there shall be no Clause 28. Please stop looking for it.", "Clause 0: this Charter was drafted by a chair under duress."];
  /* the sentences Bernadette never finishes (the hissed last word is the glyph, not the word) */
  const SENT = ["Listen, hon, the soup isn't actually", "Don't take the third tray from the left. That tray has seen", "Back in '98 we served something that wasn't", "I'm not supposed to say who orders the Thursday meatloaf, but it's the one who", "The walk-in has a door, and behind the door there is", "Between you and the gravy, the gravy was never", "The Jello is not wobbling for fun. It is wobbling because", "Gerald has been coming here since before he was", "Sandra from Compliance asked me to stop telling you the sporks are", "The pudding's skin is not a skin. It is", "There's a reason it's called Tuesday casserole on a Thursday, and the reason is", "Table seven and a half was set for somebody in 1996, and when they finally came they", "I have worked here since the building was a different building, and nobody has", "The soup was Tuesday, hon. It was always Tuesday."];
  /* Kevin (temporary) finishes the sentences Bernadette never does; the board reviews a tray in adjectives */
  const KEV = ["Listen, hon, the soup isn't actually a hazard. It is just soup. Anyway.", "The Jello is not wobbling for fun. It is wobbling because it is Jello. That is the whole reason.", "Table seven and a half was set for somebody in 1996, and when they finally came they sat down, had a roll, and left. Nobody has mentioned it since.", "The walk-in has a door, and behind the door there is a walk-in. It is very clean. Nothing is wrong.", "Gerald has been coming here since before he was a potato. He was a seed. Seeds are fine.", "I have no further sentences. I have finished all of my sentences. Enjoy your lunch."];
  const ADJ = { soup: 'Brave', meatloaf: 'Theoretical', jello: 'Anxious', casserole: 'Recursive', salad: 'Implied', pudding: 'Skinned', toaster: 'Sincere', sauce: 'Unsourced', corn: 'Distributed', sandwich: 'Unchecked', beige: 'Beige, advanced', cup: 'Empty; confident', mashed: 'Not Gerald', fish: 'Singular', milk: 'Pending', tomato: 'Consulted', spork: 'Flagged', salt: 'Reasonable', gravy: 'Intentional', donot: 'Taken, against advice', velocity: 'Forward', seconds: 'Second', skin: 'Offended', pea: 'A message', register: 'Muffin-tin', sandra: 'Pending' };
  /* dish table: id, tent card, short name, emoji, friction, gravitas */
  const DEFS = [['soup', 'Soup, Tentative', 'Soup', '🍲', 0.35, 4], ['meatloaf', 'Meatloaf (Theoretical)', 'Meatloaf', '🍖', 1, 3], ['jello', 'Jello Cube', 'Jello', '🍮', 3.5, 2], ['casserole', 'Casserole (Contains Casserole)', 'Casserole', '🥘', 1, 5], ['salad', 'Salad Bar of Implication', 'Salad', '🥗', 1, 1], ['pudding', 'Pudding (Skin Optional)', 'Pudding', '🥣', 1, 2], ['toaster', 'The Toaster', 'Toast', '🍞', 1, 1], ['sauce', 'Sauce, Source Unknown', 'Sauce', '🥫', 0.35, 3], ['corn', 'Corn (Distributed)', 'Corn', '🌽', 1, 1], ['sandwich', 'Sandwich of Implied Filling', 'Sandwich', '🥪', 1, 2], ['beige', 'The Beige Cube', 'Beige', '🍘', 1, 3], ['cup', 'Pudding Cup, Sealed and Empty', 'Pudding Cup', '🥤', 1, 1], ['register', 'The Register (a muffin tin)', 'Register', '🧁', 1, 0],
    ['mashed', 'Mashed Potatoes (Not Gerald)', 'Mashed Potatoes', '🥔', 1, 4], ['fish', 'Fish Stick, Singular', 'Fish Stick', '🐟', 1, 1], ['milk', 'Milk of Uncertain Cow', 'Milk', '🥛', 0.5, 2], ['sandra', 'Compliance Checkpoint', 'Checkpoint', '📋', 1, 0], ['tomato', 'Tomato Who Wishes To Be Consulted', 'Tomato', '🍅', 1, 1], ['spork', 'Spork (Flagged)', 'Spork', '🍴', 1, 1], ['salt', 'Salt, Reasonably', 'Salt', '🧂', 1, 1], ['gravy', 'Gravy Boat (Empty)', 'Gravy', '🍯', 0.35, 2], ['donot', 'Station 7 1/2: Do Not Take', 'Do Not Take', '🚫', 1, 5]];
  const DISH = {};
  DEFS.forEach(function (d) { DISH[d[0]] = { id: d[0], name: d[1], short: d[2], emoji: d[3], fr: d[4], g: d[5] }; });
  const START = ['soup', 'meatloaf', 'jello', 'casserole', 'salad', 'pudding', 'toaster', 'sauce', 'corn', 'sandwich', 'beige', 'cup', 'register'];
  /* Nutrition Facts: [Contains, philosophy A, philosophy B] per dish */
  const DT = {
    soup: ["warmth (alleged), a lesson, a bay leaf of unclear intent", "Soup is a question the bowl has been asked for years, and it keeps answering 'warm'.", "Soup is only soup when someone agrees to call it that, and no one has been home."], meatloaf: ["a proof, a second proof, loaf", "Meatloaf is a theory that has been cooked long enough to count.", "To eat the meatloaf is to accept the theory. To refuse is also to accept it."], jello: ["wobble, resolve, a rumour of fruit", "The Jello is not unsure. It is merely shaking from the weight of being certain.", "Everything wobbles. The Jello simply has the decency to be seen doing it."],
    casserole: ["casserole, and a smaller casserole", "The casserole is the casserole's own reason.", "What is in the casserole is a matter between the casserole and the casserole."], salad: ["a gesture of lettuce, an idea of tomato", "The salad has been reviewed by Dennis, who is a plant, and found 'adequate, for a relative'.", "*The salad asked for eleven minutes to think and was given seven and a half. It has not forgotten the difference."], pudding: ["skin (optional, unrequested), a spoon's worth of wait", "Complaint filed by the Jello: the pudding's skin is 'showing off'. The Jello has no skin and has made its peace.", "Pudding is just patience that agreed to be eaten."],
    toaster: ["bread, heat, the sentence 'I am glad you came'", "Note from the toast: 'it is nearly time.' Time was asked to comment and has not yet been located.", "The toast says what the Toaster cannot, which is everything, in a very small amount."], sauce: ["sauce, source unknown, intent unknown, temperature known", "The sauce is a source the sauce has not named.", "You do not ask the sauce where it is from. You ask where it is going. It does not know either."], corn: ["kernels, in a fair distribution", "Every kernel has been treated equally. Not one of them knows how that felt.", "The corn was shared. It was shared in the way weather is shared."],
    sandwich: ["bread, bread, and a considered silence", "The filling is implied. So is the rest of lunch.", "A sandwich is a promise made by two slices, to a third thing, in good faith."], beige: ["beige, beige, and a beige that was not in the plan", "The cube is beige in the way that a Tuesday is beige.", "There is no bad beige, only beige that was not asked how it was feeling."], cup: ["a seal, an emptiness, a small guarantee", "The cup is full of wait, which is a thing that weighs nothing and lasts.", "To be sealed and empty is to be exactly what you said you were. That is rare."],
    register: ["a muffin tin, a feeling, weather", "The register accepts what you have. It has always accepted what you have.", "*Footnote 4: change is the register noticing you. It has noticed you. It would like the footnote removed."], mashed: ["potato, restraint, a name that is not Gerald", "A mash is a vegetable that has been asked to reconsider everything.", "Gerald is not in it. That is what makes it Gerald-adjacent."], fish: ["one fish, shaped like a stick, in a line of one", "The fish stick is the last of the fish stick. It is dignified about it.", "A single stick is a trend nobody wanted to start."],
    milk: ["milk, from a cow that is pending", "The cow has not been confirmed. The milk has been, which is the problem.", "Whole milk is a statement from the cow. This one was drafted in a hurry and has not been signed."], sandra: ["a clipboard, a stamp, a pending review", "The checkpoint is a place where being looked at is the whole dish.", "Review is a kind of attention. Pending is a kind of patience."], tomato: ["tomato, a wish, a request to be consulted", "The tomato wants to be consulted. The tomato has been consulted. It is thinking.", "The tomato is a fruit that refused to be told."],
    spork: ["a spoon's attitude and a fork's ambition", "A spork has chosen both and signed neither.", "Under Review is a place a spork can live for a very long time."], salt: ["salt, reasonably", "Reasonably is the amount of salt that makes a person feel seen.", "Salt is how the soup knows it was meant."], gravy: ["intention, a boat, a long wait", "The boat is empty. The gravy is somewhere better.", "Gravy is a sauce that has made peace with the plate."],
    donot: ["do not, do not, and a quieter do not", "Do Not Take is a dish. It is the only dish that is honest about it.", "Some things are placed in front of you so you can say no and be seen saying it."]
  };
  const TUES = [31, 34, 47, 62, 88, 100, 112], TUESI = [0, 0, 1, 2, 3, 3, 4, 5, 6, 6];
  const BEATS = [0, 20, 60, 105, 150, 210, 300, 390, 480, 570];
  const DINERS = ['🙂', '😐', '🧐', '😎', '😶', '🤓', '😑'];
  const TABLES = [
    { id: 'T1', num: 1, name: 'Staples, Local 7', shape: 'rect', x: 80, y: 60, w: 80, h: 34, tint: '#d9a62e', seats: 5, coat: '🧥' },
    { id: 'T2', num: 2, name: 'Interns (confident)', shape: 'round', x: 200, y: 55, r: 24, tint: '#e8756a', seats: 5, coat: '🧥' },
    { id: 'T3', num: 3, name: 'The Quiet Table', shape: 'round', x: 320, y: 65, r: 22, tint: '#b8a6d9', seats: 4, coat: '🧥' },
    { id: 'T4', num: 4, name: 'Remember The Old Soup', shape: 'round', x: 75, y: 165, r: 24, tint: '#8c8f86', seats: 5, coat: '🧥' },
    { id: 'T5', num: 5, name: 'Executive Table', shape: 'round', x: 200, y: 160, r: 30, tint: '#e3c15a', seats: 6, exec: true },
    { id: 'T6', num: 6, name: 'The Window Table', shape: 'round', x: 325, y: 170, r: 22, tint: '#f1e7c8', seats: 4, coat: '🧹' },
    { id: 'T7', num: 7, name: "Sandra's Table", shape: 'rect', x: 200, y: 250, w: 70, h: 28, tint: '#ffffff', seats: 1, sandra: true },
    { id: 'T75', num: 75, name: 'Table 7 1/2', shape: 'round', x: 45, y: 262, r: 10, tint: '#f4a8c0', seats: 1, half: true }
  ];

  P.registerModule({
    id: 'cafeteria', title: 'Cafeteria of Almost Food', tagline: 'Lunch is served. Lunch is also, technically, a concept.', icon: '🍲', category: 'department', unlockCost: 0, tags: ['physical', 'lunch', 'department'],
    mount(root, api) {
      const el = api.el, SCALE = api.selftest ? 80 : 1, DIV = api.selftest ? 10 : 1, W = 220, FW = 160, FH = 90;
      const num = function (x, d) { return typeof x === 'number' && isFinite(x) ? x : (d || 0); }; const clamp = function (x, a, b) { x = num(x, a); return x < a ? a : x > b ? b : x; };
      const A = api.save.get('s', null) || {}; let closings = Math.floor(clamp(A.closings, 0, 9999)), velCount = Math.floor(clamp(A.vel, 0, 7)), hallM = clamp(A.hm, 0, 1e7);
      const uniq = function (v, i, a) { return a.indexOf(v) === i; };
      const frag = (Array.isArray(A.frag) ? A.frag : []).filter(function (n) { return Number.isInteger(n) && n >= 0 && n < 14; }).filter(uniq).slice(0, 16);
      const labelsRead = (Array.isArray(A.labels) ? A.labels : []).filter(function (s) { return typeof s === 'string' && Object.prototype.hasOwnProperty.call(DISH, s); }).filter(uniq).slice(0, 40);
      const seatsSet = (Array.isArray(A.seats) ? A.seats : []).filter(function (s) { return typeof s === 'string' && s.length < 12; }).filter(uniq).slice(0, 31);
      const seenF = A.flags && typeof A.flags === 'object' && !Array.isArray(A.flags) ? A.flags : {};
      /* ---- state ---- */
      let epoch = 0, T = 0, rt = 0, phase = 'play', scene = 'line', fired = {}, last = api.now(), playSec = 0, nextSent = 0, saveAt = 0, saveDirty = false, sched = [];
      let pos = 0, prevPos = 0, vel = 0, dragging = false, keyR = false, keyL = false, keyU = false, keyD = false, keyShift = false, drift = 0, tween = null, skin = true;
      let curZone = -1, peakV = 0, dwell = 0, travel = 0, tickCool = 0, bandW = 330, measureAt = 0, laps = 0, lapFlags = {}, spoken = {}, soupSeen = false, jelloNoted = false;
      let stations = [], nodes = {}, wells = [null, null, null, null, null, null, null, null], selected = -1, uidN = 1, trayDirty = true;
      let tiltA = 0, tiltW = 0, accEst = 0, prevVel = 0, balT = 0, balDone = false, reclaimCool = 0, tiltFirst = false, tiltTxtAt = 0, gaugeAt = 0, levUntil = 0, spillN = 0;
      let holding = false, holdT = 0, holdKind = '', holdSt = null, holdNear = null, lastTake = -1e9, takes = 0, recentTakes = [], presses = [], pressRun = 0, lastPress = -1e9, feeCool = 0, secondsUntil = 0, secondsN = 0, peaGiven = false, saladTakes = 0;
      let curLabel = '', lbPick = null, readTimes = [], lastLabelPay = -1e9, adequateN = 0, labelOpen = false, noteOpen = false, corkOn = false; const fog = new Float32Array(FW * FH).fill(0.88);
      let fogOpen = false, fogDirty = true, clearUntil = 0, wipeCool = 0, fogLock = false, sents = [], lastSpawn = -99, checkAt = 0, wipeLbl = '', squeegee = false, hissN = 0;
      let scanT = 0, scanLines = [], scanShown = 0, scanEmpty = false, scanDone = false, hallOpen = false, hideReceiptAt = 0, seenHall = false, regHissed = false, autoHall = false;
      let tx = 360, ty = 272, hvx = 0, hvy = 0, ptr = null, hAx = 0, walk = null, touchCarry = false, lunchT = 0, shiftT = 0, sitSeat = null, convTimes = [], lunchAwards = 0, lastConv = -1e9;
      let halfAttempts = 0, halfHold = 0, halfNear = false, t75x = 45, halfAwarded = false, geraldStands = false, lastCameo = -1e9, meter = 0, meterHissed = false, hallAcc = 0, hallStatAt = 0, lastIsAnyone = -1e9, curCharter = 0, nearTable = '', seatings = 0, seatingsMount = 0, lastRefuse = -1e9, coatShown = false, lastHallTxt = -1;
      let hmN = 0, honAt = -99, feeN = 0, nextPA = 70, tenDone = false, rareAt = 0, rareStapler = false, rareSock = false, ahNext = 12, chairsN = 0, chairAt = 0, coatRef = {}, wipeSpam = 0;
      let lbLineAt = 0, ovN = 0, sub = null, kevDone = false, gary7 = false, boardRevAt = 0;
      let lastInput = 0, lastMove = 0, idleSaid = 0, ahOn = false, ahStage = 0, ahT = 0, specialI = 0, cycle = 1 + closings, closeStarted = false, cT = 0, closeDefer = 0, noachAt = 0, sheepishAt = 0, soupSaid = false, ahAwarded = false;
      let pointerMode = 'none', pid = null, lastX = 0, startX = 0, movedPx = 0, samples = [], suppressClick = false, lastClickPress = -1e9, wipeLastX = 0, wipeLastY = 0, backT = 0, gBackAt = -99, gBackN = 0, garyAt = 0, hudAt = 0, plateEmoji = '';
      let rushEnd = 0, rushLast = 0, rushPaid = false, memoAt = 0, memoPending = false, drill = null, rareDrill = false, hushOn = false, gerStill = 0, gerDone = false;
      const bags = {}, bubbles = [], seatList = [], dinerList = [], tableG = {}, htrayDots = [], saltEls = [];
      let t75g = null, htray = null, holdSrc = 'ptr', peaEl = null, regHintOn = false, regHintAt = 0, regHintTxt = '';
      if (seenF.pea && TXT.placard.indexOf('Reserved for: The Pea') < 0) TXT.placard.push('Reserved for: The Pea');
      function bag(name, arr) {
        let b = bags[name]; if (!b) b = bags[name] = { q: [], last: '' };
        if (!b.q.length) { b.q = api.shuffle(arr); if (b.q.length > 1 && b.q[b.q.length - 1] === b.last) b.q.unshift(b.q.pop()); }
        const s = b.q.pop(); b.last = s; return s;
      }
      const tx_ = function (k) { return bag(k, TXT[k]); }; let lastChat = -1e9;
      function say(cat, o) { return api.sayRandom('m:cafeteria:' + cat, o || {}); }
      function chat(cat, o, gap) { const n = api.now(); if (n - lastChat < (gap || 6000)) return false; lastChat = n; say(cat, Object.assign({ priority: 0 }, o || {})); return true; }
      let lastAnn = -1e9;
      function announce(t, force) { const n = api.now(); if (!force && n - lastAnn < 1500) return; lastAnn = n; live.textContent = t; }
      function bubble(node, text, secs) { node.textContent = text; node.hidden = false; node._until = rt + (secs || 3); if (bubbles.indexOf(node) < 0) bubbles.push(node); }
      function later(s, fn) { if (sched.length < 160) sched.push({ t: rt + s, fn: fn, ep: epoch }); }
      function pulseEl(e, secs, cls) { const c = cls || 'm-cafeteria-pulse'; e.classList.add(c); later(secs, function () { e.classList.remove(c); }); }
      function raiseBrow(secs) { const f = face.parentNode; if (!f || f.classList.contains('m-cafeteria-raise')) return; f.classList.add('m-cafeteria-raise'); later(secs, function () { f.classList.remove('m-cafeteria-raise'); }); }
      function beatOf(t) { let b = 1; for (let i = 0; i < BEATS.length; i++) if (t >= BEATS[i]) b = i + 1; return b; }
      let beat = 1;
      const reduced = function () { try { return !!(root.closest && root.closest('.pm-reduce-motion')) || (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } };
      let reduceNow = reduced();
      function mkDish(id) { return Object.assign({}, DISH[id]); }
      function nx(v) { return Math.round(num(v) * 2) / 2; }

      /* ---- DOM ---- */
      const live = el('div', { class: 'm-cafeteria-sr', 'aria-live': 'polite' });
      const tabLine = el('button', { type: 'button', class: 'm-cafeteria-tab m-cafeteria-on', 'aria-current': 'page', onclick: function () { touch(); setScene('line'); } }, 'The Line');
      const tabHall = el('button', { type: 'button', class: 'm-cafeteria-tab', 'aria-current': 'false', 'aria-disabled': true, title: 'Seating: not yet. Management is working on yes.', onclick: function () { touch(); if (!hallOpen) { api.toast('Seating: not yet. Management is working on yes.'); api.sfx('buzz'); } else setScene('hall'); } }, 'The Hall');
      const btnNut = el('button', { type: 'button', class: 'm-cafeteria-btn', 'aria-pressed': false, onclick: function () { touch(); toggleNut(); } }, 'Nutrition');
      const btnNote = el('button', { type: 'button', class: 'm-cafeteria-btn', 'aria-pressed': false, title: 'Things Bernadette almost said', onclick: function () { touch(); toggleNote(); } }, 'Notes (0)');
      const hdr = el('div', { class: 'm-cafeteria-hdr' }, tabLine, tabHall, el('span', { class: 'm-cafeteria-sp' }), btnNut, btnNote);
      const boardTxt = el('span', { class: 'm-cafeteria-btxt', text: '' }); const board = el('div', { class: 'm-cafeteria-board', role: 'group', 'aria-label': 'Menu board' }, boardTxt);
      /* the counter */
      const strip = el('div', { class: 'm-cafeteria-strip' }); const zoneEl = el('div', { class: 'm-cafeteria-zone', 'aria-hidden': 'true' });
      const receiptCard = el('div', { class: 'm-cafeteria-card m-cafeteria-receipt', hidden: true });
      const invoiceCard = el('div', { class: 'm-cafeteria-card m-cafeteria-invoice', hidden: true }, el('h4', { text: 'INVOICE: Seconds of Seconds of Seconds' }), el('div', { text: 'Fee: 2 Meh. Applied by Bernadette, personally.' }));
      const flyerCard = el('div', { class: 'm-cafeteria-card m-cafeteria-flyer', hidden: true }, el('h4', { text: 'POLICY 9.4: SPORKS FLAGGED BY SANDRA FROM COMPLIANCE' }), el('div', { class: 'm-cafeteria-small', text: 'Utensils must be reviewed. Reviews are pending. Pending is a status.' }),
        el('button', { type: 'button', class: 'm-cafeteria-btn', style: 'margin-top:6px;min-height:30px', onclick: function () { flyerCard.hidden = true; } }, 'Dismiss (pending)'));
      const memoBody = el('div', { text: '' });
      const memoCard = el('div', { class: 'm-cafeteria-card m-cafeteria-memo', hidden: true }, el('h4', { text: 'MEMO (INTERNAL)' }), memoBody, el('button', { type: 'button', class: 'm-cafeteria-btn', style: 'margin-top:6px;min-height:30px', onclick: function () { memoCard.hidden = true; } }, 'Noted (pending)'));
      const regHint = el('div', { class: 'm-cafeteria-rg', 'aria-hidden': 'true', hidden: true });
      const soupW = el('div', { class: 'm-cafeteria-soupw', 'aria-hidden': 'true', hidden: true }, el('span', { text: '🍲' }));
      const band = el('div', { class: 'm-cafeteria-band' }, el('div', { class: 'm-cafeteria-counter' }), zoneEl, strip, soupW, el('div', { class: 'm-cafeteria-steam', 'aria-hidden': 'true' }), el('div', { class: 'm-cafeteria-guard', 'aria-hidden': 'true' }), regHint, receiptCard, invoiceCard, flyerCard, memoCard);
      /* Bernadette and the glass */
      const brow1 = el('i', { class: 'm-cafeteria-brow1' }), brow2 = el('i', { class: 'm-cafeteria-brow2' }); const puff = el('i', { class: 'm-cafeteria-puff' });
      const face = el('div', { class: 'm-cafeteria-face', 'aria-hidden': 'true' }, el('div', { class: 'm-cafeteria-head' }, brow1, brow2, el('i', { class: 'm-cafeteria-eye m-cafeteria-l' }), el('i', { class: 'm-cafeteria-eye m-cafeteria-r' }), el('i', { class: 'm-cafeteria-mouth' })),
        el('i', { class: 'm-cafeteria-apron' }), el('i', { class: 'm-cafeteria-ladleb' }), el('i', { class: 'm-cafeteria-valve' }), puff);
      const portCap = el('span', { class: 'm-cafeteria-small', text: frag.length ? 'Bernadette (behind glass, mid-sentence)' : 'Bernadette, mid-sentence. Wipe the fog, then Ask.' });
      const portrait = el('button', { type: 'button', class: 'm-cafeteria-portrait', 'aria-label': 'Ask Bernadette what she was saying', onclick: function () { touch(); ask(); } }, face, portCap);
      const sentBox = el('div', { class: 'm-cafeteria-sent' }); const fogCv = el('canvas', { class: 'm-cafeteria-fog', width: FW, height: FH, 'aria-hidden': 'true' });
      const hsss = el('span', { class: 'm-cafeteria-hsss', 'aria-hidden': 'true', text: 'HSSSS' }); const bernBbl = el('span', { class: 'm-cafeteria-bubble m-cafeteria-bbl', hidden: true });
      const glass = el('div', { class: 'm-cafeteria-glass' }, sentBox, fogCv, el('div', { class: 'm-cafeteria-glint' }), hsss, bernBbl);
      const bern = el('div', { class: 'm-cafeteria-bern' }, portrait, glass);
      /* the tray */
      const wcEls = [], wellEls = [];
      for (let i = 0; i < 8; i++) {
        const wb = el('button', { type: 'button', class: 'm-cafeteria-well', 'aria-label': 'Well ' + (i + 1) + (i === 7 ? ' (the half well), empty' : ', empty'), onclick: function () { touch(); onWell(i); } });
        wellEls.push(wb); wcEls.push(el('div', { class: 'm-cafeteria-wc' + (i === 7 ? ' m-cafeteria-half' : '') }, wb));
      }
      const trayEl = el('div', { class: 'm-cafeteria-tray', tabindex: -1, role: 'group', 'aria-label': 'Your tray' }, el('div', { class: 'm-cafeteria-wells' }, wcEls));
      const garyCap = el('span', { text: 'Hungry Gary' }), garyBbl = el('span', { class: 'm-cafeteria-bubble m-cafeteria-gbbl', hidden: true });
      const garyEl = el('div', { class: 'm-cafeteria-gary' }, el('span', { text: '🧍', 'aria-hidden': 'true' }), garyCap);
      const coatEl = el('div', { class: 'm-cafeteria-coat', text: '🧥', 'aria-hidden': 'true', hidden: true }); const plateSpan = el('span', { text: '', 'aria-hidden': 'true' });
      const plate = el('div', { class: 'm-cafeteria-plate' }, plateSpan); const ladle = el('div', { class: 'm-cafeteria-ladle', text: '🥄', 'aria-hidden': 'true' });
      const trayHost = el('div', { class: 'm-cafeteria-trayhold' }, garyEl, garyBbl, coatEl, plate, ladle, trayEl);
      const takeBtn = el('button', { type: 'button', class: 'm-cafeteria-take', 'aria-label': 'Take (hold to serve)', onpointerdown: function (e) { touch(); if (e.button > 0) return; lastClickPress = api.now(); takePress('ptr'); }, onkeydown: function (e) { if (e.key === 'Enter' && !e.repeat) { e.preventDefault(); touch(); lastClickPress = api.now(); takePress('key'); } }, onkeyup: function (e) { if (e.key === 'Enter') { e.preventDefault(); takeRelease(); } },
        onclick: function () { touch(); if (api.now() - lastClickPress > 700) { lastClickPress = api.now(); takePress('tap'); holdT = 0.9; takeRelease(); } } }, 'TAKE');
      const askBtn = el('button', { type: 'button', class: 'm-cafeteria-btn', title: 'Ask Bernadette what she was saying', onclick: function () { touch(); ask(); } }, 'Ask');
      const sqBtn = el('button', { type: 'button', class: 'm-cafeteria-btn', title: 'Toggle: drag across the glass to wipe the fog', 'aria-pressed': false, onclick: function () { touch(); squeegee = !squeegee; sqBtn.setAttribute('aria-pressed', squeegee ? 'true' : 'false'); sqBtn.classList.toggle('m-cafeteria-on', squeegee); glass.classList.toggle('m-cafeteria-sqon', squeegee); } }, 'Squeegee');
      const wipeBtn = el('button', { type: 'button', class: 'm-cafeteria-btn', onclick: function () { touch(); wipeAll(); } }, 'Wipe all');
      const gaugeTxt = el('span', { text: 'Balanced (Emotionally)' }), tiltTxt = el('span', { class: 'm-cafeteria-tilt', text: '0.0°' });
      const gauge = el('div', { class: 'm-cafeteria-gauge', hidden: true }, gaugeTxt, tiltTxt);
      const shelfEl = el('span', { class: 'm-cafeteria-shelf', hidden: true, text: 'Seconds shelf: 0 (unclaimed)' });
      const ctrl = el('div', { class: 'm-cafeteria-ctrl' }, takeBtn, askBtn, sqBtn, wipeBtn, gauge, shelfEl);
      const hintEl = el('div', { class: 'm-cafeteria-hint', text: 'Drag the counter or use the arrow keys. Stop at a dish. Hold TAKE.', hidden: api.stat.get('cafeteria.takes') >= 5 });
      const lbLine = el('div', { class: 'm-cafeteria-hint m-cafeteria-lbl', hidden: true, 'aria-hidden': 'true' });
      const trayzone = el('div', { class: 'm-cafeteria-trayzone' }, trayHost, ctrl, hintEl, lbLine); const cw = el('div', { class: 'm-cafeteria-cw' }, band, trayzone);
      /* nutrition label card and notebook */
      const L = {}; ['serv', 'cal', 'amt', 'cont', 'notc', 'dv', 'alg', 'quote', 'foot', 'per'].forEach(function (k) { L[k] = el('div', { class: 'm-cafeteria-lr' }); });
      L.amt.className = 'm-cafeteria-lr m-cafeteria-thick'; L.amt.textContent = 'Amount per serving'; L.dv.className = 'm-cafeteria-lr m-cafeteria-b'; L.quote.className = 'm-cafeteria-lq'; L.foot.className = 'm-cafeteria-lf';
      const lbName = el('div', { class: 'm-cafeteria-small', text: 'Click a dish to read its label.' });
      const labelCard = el('div', { class: 'm-cafeteria-label', 'aria-label': 'Nutrition Facts' }, el('h3', { class: 'm-cafeteria-lh', text: 'Nutrition Facts' }), lbName, L.serv, L.amt, L.cal, L.cont, L.notc, L.dv, L.alg, L.quote, L.foot, L.per, el('button', { type: 'button', class: 'm-cafeteria-btn m-cafeteria-lbx', onclick: function () { touch(); if (labelOpen) toggleNut(); } }, 'Close label'));
      const nbHead = el('h3', { text: 'Things Bernadette Almost Said' }), nbList = el('div', { class: 'm-cafeteria-nl' });
      const nb = el('div', { class: 'm-cafeteria-nb', hidden: true }, nbHead, nbList); const brow = el('div', { class: 'm-cafeteria-brow' }, cw, bern);
      const lineView = el('div', { class: 'm-cafeteria-main' }, el('div', { class: 'm-cafeteria-left' }, brow, nb), labelCard);
      /* the Hall (scene B) */
      const hsvg = buildHallSvg(); const hallBub = el('div', { class: 'm-cafeteria-bubble m-cafeteria-hbub', hidden: true });
      const hallHost = el('div', { style: 'padding:8px;border:3px solid var(--ink);border-radius:12px;background:#e4dcc3;box-shadow:4px 4px 0 var(--ink)' });
      const charterEl = el('div', { class: 'm-cafeteria-charter', 'aria-live': 'off', text: CHARTER[0] });
      const ringC = el('circle', { cx: 23, cy: 23, r: 18, stroke: '#d9a62e', 'stroke-dasharray': '113.1', 'stroke-dashoffset': '0', transform: 'rotate(-90 23 23)' });
      const lunchTxt = el('span', { style: 'font-weight:900;flex:1 1 90px', text: 'Lunch: 7.5' });
      const lbtn = function (k, label) { return el('button', { type: 'button', class: 'm-cafeteria-btn', onclick: function () { touch(); converse(k); } }, label); };
      const lunchBox = el('div', { class: 'm-cafeteria-lunch', hidden: true }, el('svg', { class: 'm-cafeteria-ring', viewBox: '0 0 46 46', 'aria-hidden': 'true' }, el('circle', { cx: 23, cy: 23, r: 18, stroke: '#e3e3e3' }), ringC), lunchTxt, lbtn(0, 'Nod'), lbtn(1, "Say 'Interesting'"), lbtn(2, 'Pass the Salt'));
      const standCard = el('div', { class: 'm-cafeteria-stand', hidden: true });
      const hallStatus = el('div', { class: 'm-cafeteria-small', text: 'Carry the tray to a seat. Arrow keys walk, Shift hustles, Enter sits.' });
      const hallView = el('div', { class: 'm-cafeteria-hallv', hidden: true }, el('div', { class: 'm-cafeteria-hw' }, hsvg, hallBub), hallStatus, charterEl, lunchBox, standCard, hallHost);
      /* overlays */
      const blue = el('div', { class: 'm-cafeteria-blue', 'aria-hidden': 'true' });
      const claps = el('div', { class: 'm-cafeteria-claps', 'aria-hidden': 'true', hidden: true }, ['👏', '👏', '👏', '👏', '👏', '👏', '👏'].map(function (t) { return el('span', { text: t }); }));
      const fxl = el('div', { class: 'm-cafeteria-fxl', 'aria-hidden': 'true' });
      const fxPool = []; for (let i = 0; i < 14; i++) { const f = el('span', { class: 'm-cafeteria-fx' }); fxPool.push(f); fxl.appendChild(f); }
      let fxI = 0; const R = el('div', { class: 'm-cafeteria-root', 'data-w': 'wide', 'data-b': 'r' }, hdr, board, lineView, hallView, blue, claps, fxl, live); root.appendChild(R);
      api.setTitle('Cafeteria of Almost Food'); const fogCtx = (function () { try { return fogCv.getContext('2d'); } catch (e) { return null; } })();
      const fogImg = fogCtx ? (function () { try { const im = fogCtx.createImageData(FW, FH); for (let i = 0; i < FW * FH; i++) { im.data[i * 4] = 236; im.data[i * 4 + 1] = 239; im.data[i * 4 + 2] = 238; } return im; } catch (e) { return null; } })() : null;

      /* ---- the Hall SVG (31 seats) ---- */
      function seatPts(t) {
        const p = [], n = t.seats;
        if (t.shape === 'round') { const rr = t.r + 11; for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n; p.push([t.x + rr * Math.cos(a), t.y + rr * Math.sin(a)]); } }
        else if (n === 1) p.push([t.x, t.y + t.h / 2 + 11]);
        else {
          const top = Math.ceil(n / 2), bot = n - top;
          for (let i = 0; i < top; i++) p.push([t.x - t.w / 2 + 10 + i * (t.w - 20) / Math.max(1, top - 1), t.y - t.h / 2 - 11]);
          for (let i = 0; i < bot; i++) p.push([t.x - t.w / 2 + 18 + i * (t.w - 36) / Math.max(1, bot - 1), t.y + t.h / 2 + 11]);
        }
        return p;
      }
      function buildHallSvg() {
        const kids = [el('defs', {}, el('pattern', { id: 'm-cafeteria-floor', width: 24, height: 24, patternUnits: 'userSpaceOnUse' }, el('rect', { width: 24, height: 24, fill: '#f3ead2' }), el('rect', { width: 12, height: 12, fill: '#e1ead3' }), el('rect', { x: 12, y: 12, width: 12, height: 12, fill: '#e1ead3' })),
          el('radialGradient', { id: 'm-cafeteria-doily' }, el('stop', { offset: '0%', 'stop-color': '#fff3b0' }), el('stop', { offset: '100%', 'stop-color': '#d8b04a' }))),
          el('rect', { width: 400, height: 300, fill: 'url(#m-cafeteria-floor)' }), el('rect', { x: 2, y: 2, width: 396, height: 296, fill: 'none', stroke: '#2b2a33', 'stroke-width': 4 }),
          el('rect', { x: 8, y: 266, width: 26, height: 24, rx: 3, fill: '#d6d8da', stroke: '#2b2a33', 'stroke-width': 2 }), el('path', { d: 'M14 268v20M20 268v20M26 268v20', stroke: '#8f979e', 'stroke-width': 2 }),
          el('rect', { x: 380, y: 96, width: 16, height: 64, fill: '#cfe6f5', stroke: '#2b2a33', 'stroke-width': 2 }), el('path', { d: 'M388 96v64M380 128h16', stroke: '#2b2a33', 'stroke-width': 1.5 }),
          el('rect', { x: 336, y: 280, width: 50, height: 14, rx: 3, fill: '#a8c9a0', stroke: '#2b2a33', 'stroke-width': 2 }), el('text', { x: 361, y: 290, 'text-anchor': 'middle', class: 'm-cafeteria-tplate', text: 'SEATING' })];
        const seatsG = [];
        function shape(t) {
          const fill = t.exec ? 'url(#m-cafeteria-doily)' : t.tint;
          const sh = t.shape === 'round' ? el('circle', { cx: t.x, cy: t.y, r: t.r, fill: fill, stroke: '#2b2a33', 'stroke-width': 2.5 }) : el('rect', { x: t.x - t.w / 2, y: t.y - t.h / 2, width: t.w, height: t.h, rx: 4, fill: fill, stroke: '#2b2a33', 'stroke-width': 2.5 });
          const pl = t.half ? el('text', { x: t.x - 14, y: t.y + 20, 'text-anchor': 'start', class: 'm-cafeteria-tplate m-cafeteria-pl75', 'font-size': 4.6, text: 'Reserved for: The Missing Sock' }) : el('text', { x: t.x, y: t.y + 2.4, 'text-anchor': 'middle', class: 'm-cafeteria-tplate', text: t.exec ? 'EXECUTIVE' : t.id === 'T7' ? 'COMPLIANCE' : 'TABLE ' + t.num });
          if (t.half) t.pl = pl;
          tableG[t.id] = el('g', { class: 'm-cafeteria-table' }, sh, pl);
          return tableG[t.id];
        }
        function mkSeats(t) {
          const pts = seatPts(t);
          pts.forEach(function (pt, i) {
            const x = pt[0], y = pt[1], coat = !!t.coat && i === 0, exec = !!t.exec;
            const face = coat ? t.coat : t.sandra ? '📋' : exec ? (i === 0 ? '🥔' : DINERS[(i + 2) % DINERS.length]) : '';
            const emo = el('text', { x: x, y: y + 4.2, 'text-anchor': 'middle', 'font-size': 12, class: exec && i === 0 ? 'm-cafeteria-nod' : '', 'pointer-events': 'none', text: face });
            const s = { id: t.id + '-' + i, t: t, i: i, x: x, y: y, coat: coat, emo: emo, g: null };
            const label = 'Table ' + (t.half ? '7 1/2' : t.num) + ', ' + t.name + ', seat ' + (i + 1) + (coat ? ', taken by a coat' : exec ? ', Executive Table, not enterable' : t.sandra ? ', clipboard only' : t.half ? ', reserved' : '');
            s.g = el('g', { class: 'm-cafeteria-seat', role: 'button', tabindex: 0, 'aria-label': label, onclick: function () { touch(); seatAction(s); }, onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); e.stopPropagation(); touch(); seatAction(s); } } },
              el('circle', { cx: x, cy: y, r: 13, fill: 'transparent' }), el('rect', { x: x - 6.5, y: y - 6.5, width: 13, height: 13, rx: 3.5 }), emo);
            seatList.push(s); seatsG.push(s);
            if (t.half) tableG[t.id].appendChild(s.g); else kids.push(s.g);
          });
        }
        TABLES.filter(function (t) { return !t.half; }).forEach(function (t) { kids.push(shape(t)); });
        TABLES.filter(function (t) { return !t.half; }).forEach(function (t) {
          kids.push(el('text', { x: t.x, y: t.y + (t.shape === 'round' ? t.r + 28 : t.h / 2 + 31), 'text-anchor': 'middle', class: 'm-cafeteria-tplate', 'font-size': 5.5, text: t.name }));
        });
        TABLES.forEach(function (t) {
          if (t.half) return;
          mkSeats(t);
          if (t.coat) for (let k = 0; k < 2; k++) {                                   /* decor diners (not seats) */
            const px = t.shape === 'round' ? t.x + (t.r + 4) * Math.cos(-Math.PI / 2 + (2 * k + 1.5) * 2 * Math.PI / t.seats) : t.x + (k ? 1 : -1) * (t.w / 2 + 7);
            const py = t.shape === 'round' ? t.y + (t.r + 4) * Math.sin(-Math.PI / 2 + (2 * k + 1.5) * 2 * Math.PI / t.seats) + 4 : t.y + 4;
            const d = { t: t, k: k, x: px, y: py, el: el('text', { x: px, y: py, 'text-anchor': 'middle', 'font-size': 11, class: 'm-cafeteria-diner', 'pointer-events': 'none', text: DINERS[(t.num + k) % DINERS.length] }) };
            dinerList.push(d); kids.push(d.el);
          }
        });
        [TABLES[2], TABLES[3]].forEach(function (t) { const s = el('text', { x: t.x, y: t.y + 3, 'text-anchor': 'middle', 'font-size': 8, 'pointer-events': 'none', hidden: true, text: '🧂' }); saltEls.push(s); kids.push(s); });
        const half = TABLES[7]; kids.push(shape(half)); t75g = tableG.T75; t75g.setAttribute('class', 'm-cafeteria-table m-cafeteria-t75'); mkSeats(half);
        htray = el('g', { class: 'm-cafeteria-htray', transform: 'translate(360 272)', 'pointer-events': 'none' }, el('rect', { class: 'm-cafeteria-hb', x: -11, y: -7, width: 22, height: 14, rx: 3 }));
        for (let i = 0; i < 8; i++) { const c = el('circle', { cx: -8.2 + (i % 4) * 5.5, cy: i < 4 ? -2.6 : 3, r: 2, fill: 'none', stroke: '#2b2a33', 'stroke-width': 0.6 }); htrayDots.push(c); htray.appendChild(c); }
        kids.push(htray);
        peaEl = el('text', { x: 0, y: 0, 'text-anchor': 'middle', 'font-size': 8, 'pointer-events': 'none', hidden: true, text: '🟢' }); kids.push(peaEl);
        return el('svg', { class: 'm-cafeteria-hsvg', viewBox: '0 0 400 300', preserveAspectRatio: 'xMidYMid meet', role: 'group', 'aria-label': 'The Hall: 31 seats, 8 tables',
          onpointermove: function (e) { if (scene !== 'hall') return; const p = svgPt(e); ptr = p; if (e.pointerType === 'touch') touchCarry = true; },
          onpointerleave: function (e) { if (e.pointerType !== 'touch') ptr = null; },
          onpointerdown: function (e) { touch(); if (e.pointerType === 'touch') { touchCarry = true; hsvg.classList.add('m-cafeteria-carry'); ptr = svgPt(e); } },
          onpointerup: function (e) { if (e.pointerType === 'touch' && touchCarry) { touchCarry = false; hsvg.classList.remove('m-cafeteria-carry'); const s = nearestSeat(26); ptr = null; if (s && !(e.target && e.target.closest && e.target.closest('.m-cafeteria-seat'))) seatAction(s); } },
          onpointercancel: function () { touchCarry = false; hsvg.classList.remove('m-cafeteria-carry'); ptr = null; } }, kids);
      }
      function svgPt(e) {
        const r = hsvg.getBoundingClientRect(); if (!r.width || !r.height) return { x: tx, y: ty };
        const s = Math.min(r.width / 400, r.height / 300), ox = (r.width - 400 * s) / 2, oy = (r.height - 300 * s) / 2;
        return { x: clamp((e.clientX - r.left - ox) / s, 8, 392), y: clamp((e.clientY - r.top - oy) / s, 12, 290) };
      }
      function seatXY(s) { return [s.t.half ? t75x : s.x, s.y]; }
      function nearestSeat(maxD) {
        let b = null, bd = maxD;
        seatList.forEach(function (s) { const p = seatXY(s), d = Math.hypot(p[0] - tx, p[1] - ty); if (d < bd) { bd = d; b = s; } });
        return b;
      }

      /* ---- stations and the counter ---- */
      function loopLen() { return Math.max(1, stations.length) * W; }
      function wd(d) { const l = loopLen(); return ((d + l / 2) % l + l) % l - l / 2; }
      function atStation() { for (let i = 0; i < stations.length; i++) if (Math.abs(wd(i * W + W / 2 - pos)) < 45) return i; return -1; }
      function nearestStation() { let b = 0, bd = 1e9; for (let i = 0; i < stations.length; i++) { const d = Math.abs(wd(i * W + W / 2 - pos)); if (d < bd) { bd = d; b = i; } } return b; }
      function stIndex(id) { for (let i = 0; i < stations.length; i++) if (stations[i].id === id) return i; return -1; }
      function dishAria(d) { return d.name + (d.fr < 0.5 ? ', slippery' : d.fr > 2 ? ', sticky' : '') + '. Enter reads the label.'; }
      function getNode(d) {
        let n = nodes[d.id]; if (n) return n;
        const emo = el('span', { class: 'm-cafeteria-emo', 'aria-hidden': 'true', text: d.emoji }), tent = el('span', { class: 'm-cafeteria-tent', text: d.name }), kids = [emo, tent];
        n = { d: d, emo: emo, tent: tent, x: null, sbbl: null, slice: null, den: null, b: null };
        if (d.id === 'salad') { n.den = el('span', { class: 'm-cafeteria-dennis', text: '🌿', 'aria-hidden': 'true' }); kids.push(n.den); }
        if (d.id === 'soup') { n.sbbl = el('span', { class: 'm-cafeteria-sbbl', hidden: true }); kids.push(n.sbbl); }
        if (d.id === 'toaster') { n.slice = el('span', { class: 'm-cafeteria-slice', 'aria-hidden': 'true' }); kids.push(n.slice); }
        n.b = el('button', { type: 'button', class: 'm-cafeteria-dish', 'data-id': d.id, 'aria-label': dishAria(d),
          onclick: function () { touch(); if (suppressClick) { suppressClick = false; return; } readLabel(d.id); },
          onfocus: function (e) { band.scrollLeft = 0; try { const i = stIndex(d.id); if (i >= 0 && phase === 'play' && scene === 'line' && atStation() !== i && e.target.matches(':focus-visible')) glideTo(i); } catch (er) { /* no focus-visible */ } },
          onkeydown: function (e) { if (e.key === 'Enter') { e.preventDefault(); touch(); const i = stIndex(d.id); if (i >= 0) { if (atStation() === i) readLabel(d.id); else glideTo(i); } } } }, kids);
        strip.appendChild(n.b); nodes[d.id] = n; return n;
      }
      function orderNodes() {
        stations.forEach(function (s) { const n = getNode(s); n.d = s; n.b.style.display = ''; strip.appendChild(n.b); });
        Object.keys(nodes).forEach(function (id) { if (stIndex(id) < 0) { nodes[id].b.style.display = 'none'; nodes[id].x = null; } });
      }
      function resetStations() { stations = START.map(mkDish); skin = true; orderNodes(); Object.keys(nodes).forEach(function (id) { const n = nodes[id]; n.rv = 0; n.tent.classList.remove('m-cafeteria-ping'); n.tent.textContent = DISH[id].name; n.b.setAttribute('aria-label', dishAria(DISH[id])); if (n.den) n.den.hidden = false; }); }
      function insertStations(ids) {
        const ins = stations.length - 1, k = ids.length;
        ids.forEach(function (id, j) { stations.splice(ins + j, 0, mkDish(id)); });
        if (pos >= ins * W) pos += W * k;
        prevPos = pos; curZone = -1; tween = null; orderNodes();
        later(1.5, function () { chat('line.different', { priority: 1 }, 3000); });
      }
      function renderStations() {
        const trayX = bandW * 0.3;
        for (let i = 0; i < stations.length; i++) {
          const st = stations[i], n = getNode(st), x = nx(trayX + wd(i * W + W / 2 - pos) - W / 2);
          if (n.x !== x) { n.x = x; n.b.style.transform = 'translate3d(' + x + 'px,0,0)'; }
        }
      }
      function refreshNames() {
        stations.forEach(function (st) { const n = nodes[st.id]; if (n && !(n.rv > rt) && n.tent.textContent !== st.name) { n.tent.textContent = st.name; n.b.setAttribute('aria-label', dishAria(st)); } });
        const sn = nodes.salad; if (sn && sn.den) sn.den.hidden = stIndex('salad') < 0;
      }
      function puffAt(x, y, em) {
        const f = fxPool[fxI++ % fxPool.length], r = root.getBoundingClientRect();
        f.textContent = em; f.style.left = clamp(x, 0, 2000) + 'px'; f.style.top = clamp(y, 0, 2000) + 'px'; f.style.setProperty('--dx', Math.round((api.rand() - 0.5) * 60) + 'px');
        f.classList.remove('m-cafeteria-go'); void f.offsetWidth; f.classList.add('m-cafeteria-go');
      }
      function bodyPuff(em, el_) { try { const r = root.getBoundingClientRect(), b = (el_ || trayEl).getBoundingClientRect(); puffAt(b.left - r.left + b.width / 2, b.top - r.top + b.height / 2, em); } catch (e) { /* layout not ready */ } }

      /* ---- tray ---- */
      function items() { return wells.filter(function (w) { return !!w; }); }
      function firstFree() { for (let i = 0; i < 8; i++) if (!wells[i]) return i; return -1; }
      function wellsChanged() { selected = -1; trayDirty = true; }
      function mkItem(d, f, extra) { return Object.assign({ uid: uidN++, id: d.id, name: d.name, short: d.short, emoji: d.emoji, w: Math.round(d.g * f * 100) / 100, size: f, flags: {}, slide: 0 }, extra || {}); }
      /* the Seconds shelf counts silently; Management only speaks at the milestones, each with its own line */
      function overfull(item) {
        ovN++; shelfEl.textContent = 'Seconds shelf: ' + api.fmt(ovN) + ' (unclaimed)'; shelfEl.hidden = false;
        if ([1, 2, 3, 4, 6, 8, 12, 16, 32].indexOf(ovN) >= 0 || (ovN >= 64 && ovN % 64 === 0)) { lastChat = api.now(); say('overfull.' + Math.min(64, ovN), { priority: 1, item: item }); }
      }
      function placeItem(it) {
        let i = firstFree();
        if (i < 0) {
          let oi = -1, ou = 1e9;
          for (let k = 0; k < 8; k++) if (wells[k] && !wells[k].flags.locked && wells[k].uid < ou) { ou = wells[k].uid; oi = k; }
          if (oi < 0) oi = 0;
          const gone = wells[oi]; wells[oi] = null; i = oi;
          overfull(gone ? gone.short : 'item');
          api.sfx('buzz'); api.stat.inc('cafeteria.seconds_moved');
        }
        wells[i] = it; wellsChanged(); announce(it.short + ' placed in well ' + (i + 1), true); return i;
      }
      function removeAt(i) { const it = wells[i]; wells[i] = null; wellsChanged(); return it; }
      function swapWells(a, b) {
        if (a === b || a < 0 || b < 0 || a > 7 || b > 7) return false;
        if ((wells[a] && wells[a].flags.locked) || (wells[b] && wells[b].flags.locked)) { api.sfx('buzz'); return false; }
        const t = wells[a]; wells[a] = wells[b]; wells[b] = t; wellsChanged(); api.sfx('blip'); return true;
      }
      function itemBtn(it, i) {
        const wt = Math.round(it.w * (i === 7 ? 0.5 : 1) * 10) / 10;
        return el('button', { type: 'button', class: 'm-cafeteria-item' + (selected === i ? ' m-cafeteria-picked' : '') + (it.flags.adj ? ' m-cafeteria-adj' : ''), 'data-i': i,
          'aria-label': it.short + ', weight ' + wt + (it.flags.locked ? ', cannot be moved' : ', press Enter to pick up, arrows to move'), onclick: function () { touch(); onItem(i); }, onkeydown: function (e) { onItemKey(e, i); } },
          el('span', { class: 'm-cafeteria-ie', 'aria-hidden': 'true', text: it.emoji, style: 'transform:scale(' + (it.size < 1 ? 0.8 : it.size > 1 ? 1.15 : 1) + ')' }), el('span', { class: 'm-cafeteria-in', text: it.short }),
          it.flags.review ? el('span', { class: 'm-cafeteria-stamp', text: 'REVIEWED (PENDING)' }) : null, (beat >= 7 && it.id === 'spork') ? el('span', { class: 'm-cafeteria-tape', title: 'Under Review' }) : null);
      }
      function renderTray() {
        trayDirty = false;
        for (let i = 0; i < 8; i++) {
          const wc = wcEls[i], it = wells[i];
          if (wc._ib) { wc.removeChild(wc._ib); wc._ib = null; }
          wc.classList.toggle('m-cafeteria-sel', selected === i); wellEls[i].tabIndex = it ? -1 : 0;
          wellEls[i].setAttribute('aria-label', 'Well ' + (i + 1) + (i === 7 ? ' (the half well)' : '') + (it ? ', holds ' + it.short : ', empty'));
          if (it) { const b = itemBtn(it, i); wc.appendChild(b); wc._ib = b; }
          if (htrayDots[i]) htrayDots[i].setAttribute('fill', it ? '#d9a62e' : 'none');
        }
      }
      function paintSel() {
        for (let i = 0; i < 8; i++) { wcEls[i].classList.toggle('m-cafeteria-sel', selected === i); if (wcEls[i]._ib) wcEls[i]._ib.classList.toggle('m-cafeteria-picked', selected === i); }
      }
      function onItem(i) {
        const it = wells[i];
        if (selected >= 0 && selected !== i) { moveSel(i); return; }
        if (selected === i) { selected = -1; announce('Put down', true); }
        else if (it && !it.flags.locked) { selected = i; announce(it.short + ' picked up. Choose a well.', true); api.sfx('tick'); }
        else if (it) { api.sfx('buzz'); announce(it.short + ' cannot be moved. It has said so.', true); }
        paintSel();
      }
      function onWell(i) { if (selected >= 0) moveSel(i); else if (wells[i]) onItem(i); }
      function moveSel(j) { const a = selected; selected = -1; if (swapWells(a, j)) announce('Moved to well ' + (j + 1), true); paintSel(); }
      function onItemKey(e, i) {
        const k = e.key, col = i % 4, row = i >> 2; let j = -1;
        if (k === 'ArrowLeft') j = col > 0 ? row * 4 + col - 1 : -1; else if (k === 'ArrowRight') j = col < 3 ? row * 4 + col + 1 : -1;
        else if (k === 'ArrowUp') j = row > 0 ? col : -1; else if (k === 'ArrowDown') j = row < 1 ? 4 + col : -1;
        else if (k === 'Escape') { selected = -1; paintSel(); return; } else return;
        e.preventDefault(); e.stopPropagation(); touch();
        if (j >= 0 && j < 8 && swapWells(i, j)) { renderTray(); if (wcEls[j]._ib) wcEls[j]._ib.focus(); }
      }

      /* ---- labels, notebook, board ---- */
      let qN = {}, readCount = 0;
      function liveServing(name, secs) { L.serv.textContent = 'Serving size: ' + num(secs).toFixed(2) + ' seconds of ' + name; }
      function paintLabel() {
        const d = DISH[curLabel]; if (!d || !lbPick) return;
        const dt = DT[d.id] || ['a thing', 'It is a dish.', 'It is also a dish.'];
        lbName.textContent = d.name; L.serv.textContent = 'Serving size: ' + lbPick.serv; L.cal.textContent = lbPick.cal; L.cont.textContent = 'Contains: ' + dt[0]; L.notc.textContent = lbPick.notc;
        L.dv.textContent = '% Daily Value of Tuesday: ' + TUES[TUESI[Math.max(0, beat - 1)]] + '%'; L.alg.textContent = lbPick.alg; L.quote.textContent = lbPick.q; L.foot.textContent = lbPick.foot;
        L.per.textContent = 'Servings per container: ' + (beat >= 9 ? 'you' : '1');
      }
      function readLabel(id, auto) {
        const d = DISH[id]; if (!d) return;
        qN[id] = (qN[id] || 0) + 1; curLabel = id;
        lbPick = { serv: tx_('serv'), cal: tx_('cal'), notc: tx_('notc'), alg: tx_('alg'), foot: tx_('foot'), q: (DT[id] || ['', '', ''])[1 + (qN[id] % 2)] };
        paintLabel();
        if (auto) return;
        if (!labelOpen && R.getAttribute('data-w') !== 'wide') { lbLine.textContent = d.short + ': ' + lbPick.q; lbLine.hidden = false; lbLineAt = rt + 9; }
        readCount++; readTimes.push(rt); readTimes = readTimes.filter(function (t) { return rt - t < 6; });
        if (labelsRead.indexOf(id) < 0) { labelsRead.push(id); if (labelsRead.length > 40) labelsRead.shift(); api.stat.max('cafeteria.labels', labelsRead.length); api.award(0.3, 'label'); saveDirty = true; }
        else if (rt - lastLabelPay >= 3) { lastLabelPay = rt; api.award(0.05, 'label'); }
        api.sfx('blip'); announce(d.short + ': nutrition label opened');
        if (readTimes.length > 10) { if (rt - (bags.sl || 0) > 8) { bags.sl = rt; say('spam.label', { priority: 1 }); } }
        else if (readCount % 4 === 0 && DISHLINE[id]) chatText(dishLine(id), { priority: 0 }, 5000);
      }
      function toggleNut() { labelOpen = !labelOpen; if (labelOpen && R.getAttribute('data-w') !== 'wide') { lbLine.hidden = true; later(0.05, function () { try { labelCard.scrollIntoView({ block: 'nearest' }); } catch (er) { /* no scrolling here */ } }); } R.classList.toggle('m-cafeteria-lbopen', labelOpen); btnNut.setAttribute('aria-pressed', labelOpen ? 'true' : 'false'); btnNut.classList.toggle('m-cafeteria-on', labelOpen); }
      function fragText(i) { return SENT[i] + (i === 13 ? '' : ' ♨'); }
      function renderNote() {
        corkOn = frag.length >= 8 || (beat >= 8 && frag.length > 0);
        btnNote.textContent = (R.getAttribute('data-w') === 'narrow' ? 'Notes (' : 'Notes: Things She Almost Said (') + frag.length + ')';
        nbHead.textContent = 'Things Bernadette Almost Said' + (closings > 0 || frag.indexOf(13) >= 0 ? '  ★' : '');
        nb.classList.toggle('m-cafeteria-cork', corkOn);
        if (!noteOpen) return;
        nbList.textContent = '';
        const list = frag.slice().reverse().slice(0, 24);
        if (corkOn) {
          /* two columns, newest first, a row per pair: every note stays readable and the board scrolls instead of piling up */
          const pitch = R.getAttribute('data-w') === 'narrow' ? 76 : 58, h = Math.max(250, 60 + Math.ceil(list.length / 2) * pitch), cork = el('div', { class: 'm-cafeteria-corkin', style: 'height:' + h + 'px' });
          const ys = list.map(function (idx, i) { return 50 + Math.floor(i / 2) * pitch + (i % 3) * 3; });
          cork.appendChild(el('svg', { class: 'm-cafeteria-strings', viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' }, list.map(function (idx, i) { return el('line', { x1: (i % 2 ? 52 : 3) + 22, y1: (ys[i] + 4) / h * 100, x2: 50, y2: 14 / h * 100 }); })));
          cork.appendChild(el('div', { class: 'm-cafeteria-note', style: 'left:38%;top:2px;width:24%;text-align:center;font-size:.65rem', text: 'THE SOUP' }));
          list.forEach(function (idx, i) { cork.appendChild(el('div', { class: 'm-cafeteria-note', style: 'left:' + (i % 2 ? 52 : 3) + '%;top:' + ys[i] + 'px;transform:rotate(' + (((idx * 7) % 9) - 4) + 'deg)' }, el('i', { class: 'm-cafeteria-pin' }), (idx === 13 ? '★ ' : '') + fragText(idx))); });
          nbList.appendChild(cork);
        } else list.forEach(function (idx) { nbList.appendChild(el('div', { class: 'm-cafeteria-note' }, (idx === 13 ? '★ ' : '') + fragText(idx))); });
        if (!list.length) nbList.appendChild(el('div', { class: 'm-cafeteria-small', text: 'Nothing yet. Wipe the fog. Read quickly. She never finishes.' }));
      }
      function toggleNote() { noteOpen = !noteOpen; nb.hidden = !noteOpen; btnNote.setAttribute('aria-pressed', noteOpen ? 'true' : 'false'); btnNote.classList.toggle('m-cafeteria-on', noteOpen); renderNote(); }
      function boardTextFor() {
        if (rushEnd) return "Today's Special: Hurry (Not Included)";
        if (cycle >= 2) return "Today's Special: A Special " + (cycle === 2 ? '(Again)' : cycle === 3 ? '(Again, again)' : '(Again) x' + Math.min(cycle, 5));
        return TXT.special[Math.min(specialI, TXT.special.length - 1)];
      }
      function setBoard(t) { boardTxt.textContent = t; boardTxt.classList.remove('m-cafeteria-rvw'); }

      /* ---- input bookkeeping ---- */
      function touch() { lastInput = rt; idleSaid = 0; if (ahOn) wake(); if (hushOn) hushOff(); }
      function dishLine(id) { const v = DISHLINE[id]; return Array.isArray(v) ? v[(cycle - 1) % v.length] : v; }
      function releaseAll() { if (holding) { holding = false; R.classList.remove('m-cafeteria-holding'); plateSpan.textContent = ''; } keyR = keyL = keyU = keyD = keyShift = false; dragging = false; pointerMode = 'none'; touchCarry = false; ptr = null; hsvg.classList.remove('m-cafeteria-carry'); }
      function chatText(text, o, gap) { const n = api.now(); if (n - lastChat < (gap || 6000)) return false; lastChat = n; return api.say(text, Object.assign({ priority: 0 }, o || {})); }
      function garySigh() { if (ahOn) return; bubble(garyBbl, tx_('gsigh'), 3.2); garyAt = rt + api.randInt(35, 55); }

      /* ---- the counter: pushing, friction, zones ---- */
      function tweenTo(target, dur, done) { tween = { from: pos, delta: wd(target - pos), t: 0, dur: Math.max(0.1, dur), done: done || null }; vel = 0; }
      function glideTo(i) { if (phase !== 'play' || scene !== 'line') return; tweenTo(i * W + W / 2, 0.9); chat('glide', { priority: 0 }, 5000); }
      function lapDone() {
        laps++; lapFlags = {}; scanDone = false; geraldStands = false; removedDiners = {}; api.stat.inc('cafeteria.laps'); api.award(1, 'lap'); saveDirty = true; hallRefresh();
      }
      function conveyor(dt) {
        if (reduceNow || !rushEnd || phase !== 'play' || tween || !stations.length) return 0;
        const rd = wd((stations.length - 1) * W + W / 2 - pos);
        return rd > -60 && rd < 130 ? 0 : (90 + 15 * Math.min(cycle - 1, 4)) * dt;
      }
      function pushStep(dt) {
        if (!stations.length) return;
        const l = loopLen();
        if (drift > 0) { const s = Math.min(drift, 14 / 1.2 * dt); drift -= s; pos += s; }
        if (tween) {
          tween.t += dt; const k = Math.min(1, tween.t / tween.dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          pos = tween.from + tween.delta * e; vel = 0;
          if (k >= 1) { const fn = tween.done; tween = null; if (fn) fn(); }
        } else if (phase === 'scan' || phase === 'resetting') vel = 0;
        else {
          const acc = (keyR ? 1 : 0) - (keyL ? 1 : 0);
          if (acc > 0 && vel < 520) vel = Math.min(520, vel + 900 * dt); else if (acc < 0 && vel > -520) vel = Math.max(-520, vel - 900 * dt);
          if (dragging) { if (!samples.length || api.now() - samples[samples.length - 1].t > 100) vel *= Math.exp(-10 * dt); }
          else {
            const d = stations[Math.min(stations.length - 1, Math.max(0, Math.floor(pos / W)))];
            let fr = d ? d.fr : 1;
            if (d && d.id === 'pudding') {
              if (skin && Math.abs(vel) >= 60) { skin = false; api.sfx('pop'); if (!spoken.pudpop) { spoken.pudpop = 1; say('pudding.pop', { priority: 1 }); } }
              fr = skin ? 7 : 0.6;
            } else skin = true;
            if (Math.abs(vel) < 80 && !acc) {
              for (let i = 0; i < stations.length; i++) { if (stations[i].id === 'register') continue; const dd = wd(i * W + W / 2 - pos); if (Math.abs(dd) < 25) { vel += dd * 4 * dt; break; } }
            }
            vel *= Math.exp(-fr * dt);
            if (Math.abs(vel) < 0.4 && !acc) vel = 0;
          }
          vel = clamp(vel, -900, 900);
          if (!dragging) pos += vel * dt + conveyor(dt);
        }
        if (!isFinite(vel)) vel = 0; if (!isFinite(pos)) pos = 0;
        pos = ((pos % l) + l) % l;
        const raw = pos - prevPos;
        if (raw < -l / 2) lapDone();
        travel += Math.abs(raw) > l / 2 ? 0 : Math.abs(raw); prevPos = pos;
        tickCool -= dt;
        if (travel >= (Math.abs(vel) > 700 ? 120 : 60)) { travel = 0; if (tickCool <= 0) { tickCool = 0.125; api.sfx('tick'); } }
        if (vel < -60) { backT += dt; if (backT > 0.6 && beat >= 3 && rt - gBackAt > 20 && gBackN < 4) { gBackAt = rt; gBackN++; bubble(garyBbl, tx_('gback'), 3); chat('gary.mgmt', {}, 3000); } } else backT = 0;
      }
      function popSlice(text) {
        const n = nodes.toaster; if (!n || !n.slice) return; n.slice.textContent = text; n.slice.classList.add('m-cafeteria-up');
        later(1.4, function () { n.slice.classList.remove('m-cafeteria-up'); });
      }
      function enterZone(i) {
        const st = stations[i];
        if (st.id === 'toaster') { api.sfx('ding'); popSlice(ahOn ? 'still here' : tx_('toastw')); }
        else if (st.id === 'soup') soupSeen = true;
        else if (st.id === 'jello' && soupSeen && !jelloNoted && beat >= 2) { jelloNoted = true; say('friction.note', { priority: 1 }); }
      }
      function stampItem() {
        const cand = []; for (let i = 0; i < 8; i++) if (wells[i] && !wells[i].flags.review) cand.push(i);
        lapFlags.stamp = true; if (!cand.length) return;
        const it = wells[api.pick(cand)]; it.flags.review = true; trayDirty = true; api.sfx('stamp'); chat('sandra.stamp', { priority: 1 }, 2500);
      }
      function zoneStep(dt) {
        const z = atStation();
        if (z !== curZone) {
          curZone = z; dwell = 0; peakV = 0;
          if (z >= 0) enterZone(z);
          if (z < 0 || stations[z].id !== 'register') scanDone = false;
        }
        if (z < 0) return;
        const st = stations[z], av = Math.abs(vel);
        peakV = Math.max(peakV, av);
        if (av < 15 && peakV > 60) { peakV = 0; api.sfx('blip'); }
        if (av < 40) {
          dwell += dt;
          if (dwell >= 0.35 && !spoken['d' + st.id + cycle] && DISHLINE[st.id] && phase === 'play') { if (chatText(dishLine(st.id), { priority: 0 }, 3500)) spoken['d' + st.id + cycle] = 1; }
        }
        if (st.id === 'sandra' && !lapFlags.stamp && av < 200 && phase === 'play') stampItem();
        if (st.id === 'register' && phase === 'play' && av < 60 && !scanDone) {
          if (items().length > 0) startScan(false);
          else if (playSec >= 30 && !lapFlags.fasting) startScan(true);
          else if (!spoken.regempty) { spoken.regempty = 1; say('regempty', { priority: 0 }); }
        }
      }

      /* ---- taking: hold to serve ---- */
      function spamCheck() {
        if (scene !== 'line' || phase !== 'play') return;
        if (presses.length >= 20 && rt >= feeCool) {
          feeCool = rt + 6; feeN++; api.sfx('bell'); R.classList.add('m-cafeteria-stepout'); invoiceCard.hidden = false; secondsUntil = rt + 4;
          invoiceCard.lastChild.textContent = feeN > 1 ? 'Fee: 2 Meh. Invoice #' + feeN + ', stapled to #' + (feeN - 1) + '. Applied by Bernadette, personally, again.' : 'Fee: 2 Meh. Applied by Bernadette, personally.';
          later(4, function () { R.classList.remove('m-cafeteria-stepout'); invoiceCard.hidden = true; });
          api.award(-2, 'Seconds Fee'); api.achieve('cafeteria.seconds'); say(feeN > 1 ? 'spam.seconds.again' : 'spam.seconds', { mood: 'panic', priority: 2 }); if (feeN === 1) say('spam.step', { priority: 1 });
        } else if (presses.length >= 10 && presses.length < 20 && rt - honAt > 1.8) {
          honAt = rt; bubble(bernBbl, tx_('hon'), 2.2); if (presses.length >= 14) chat('spam.warn', {}, 5000);
        }
        if (pressRun >= 70) {
          pressRun = 0; presses = []; wells = [null, null, null, null, null, null, null, null]; wellsChanged();
          placeItem(mkItem({ id: 'pea', name: 'Pea', short: 'Pea', emoji: '🟢', g: 1 }, 1, { w: 0.1 })); api.sfx('sad');
          say(peaGiven || seenF.pea ? 'spam.pea.again' : 'spam.pea', { priority: 2 }); say('spam.pea2', { priority: 1 });
          if (!peaGiven && !seenF.pea) { seenF.pea = 1; saveDirty = true; api.award(7, 'pea'); if (TXT.placard.indexOf('Reserved for: The Pea') < 0) TXT.placard.push('Reserved for: The Pea'); } peaGiven = true;
        }
      }
      function takePress(src) {
        const n = api.now();
        presses.push(n); while (presses.length && n - presses[0] > 4000) presses.shift();
        pressRun = n - lastPress < 1000 ? pressRun + 1 : 1; lastPress = n;
        spamCheck();
        if (holding || phase !== 'play' || scene !== 'line' || n - lastTake < 140) return;
        const zi = atStation(), av = Math.abs(vel);
        holding = true; holdSrc = src || 'ptr'; holdT = 0; holdSt = zi >= 0 ? stations[zi] : null; holdNear = null; holdKind = 'dish';
        if (velCount >= 7 && av < 30 && wells[7] === null && firstFree() >= 0) holdKind = 'half';
        else if (av > 120) holdKind = 'vel';
        else if (!holdSt) { holdNear = stations[nearestStation()]; holdKind = 'adj'; }
        const d = holdSt || holdNear;
        plateEmoji = holdKind === 'half' || holdKind === 'vel' ? '➡️' : d ? d.emoji : '';
        plateSpan.textContent = plateEmoji; plateSpan.style.transform = 'scale(.5)'; R.classList.add('m-cafeteria-holding'); api.sfx('whoosh');
        if (d && holdKind !== 'vel' && holdKind !== 'half' && curLabel !== d.id) readLabel(d.id, true);
      }
      function afterTake(it, d) {
        takes++; api.stat.inc('cafeteria.takes'); recentTakes.push(rt); recentTakes = recentTakes.filter(function (t) { return rt - t < 10; });
        api.award(recentTakes.length > 10 ? 0.02 : 0.1, 'take'); saveDirty = true;
        const lifeTakes = api.stat.get('cafeteria.takes'), tcat = takes >= 2 && takes % 3 === 0 ? 'take.n' : 'take';
        if (lifeTakes >= 3 && !hintEl.hidden) hintEl.hidden = true;
        let spoke = true;
        if (MIL[lifeTakes]) api.say(MIL[lifeTakes], { priority: 1 });
        else if (lifeTakes <= 6) chat(tcat, { item: it.short, count: takes, priority: 0 }, 1);
        else if (takes % 3 === 0) chat(tcat, { item: it.short, count: takes, priority: 0 }, 2500);
        else if (holdT < 0.25) chat('take.short', { priority: 0 }, 5000);
        else if (holdT >= 2.3) chat('take.long', { priority: 0, item: it.short }, 5000);
        else spoke = false;
        if (!spoke && presses.length < 8 && api.chance(0.6)) bubble(bernBbl, tx_('bserve'), 1.8);
        if (d && nodes[d.id] && !ahOn) { const nd = nodes[d.id]; nd.tent.textContent = tx_('review'); nd.rv = rt + 1.6; }
        api.sfx('pop'); bodyPuff(it.emoji);
        if (takes === 7 && !gary7 && !ahOn && scene === 'line' && phase === 'play' && !it.flags.locked && wells.indexOf(it) >= 0) garyServed(it);
      }
      /* take number seven: Hungry Gary is served (the item is borrowed for 7.5 seconds, uneaten) */
      function garyServed(it) {
        gary7 = true; const gi = wells.indexOf(it), cn = cycle >= 2 ? 'Hungry Gary Jr.' : 'Hungry Gary';
        wells[gi] = null; wellsChanged(); garyEl.classList.add('m-cafeteria-lean'); garyCap.textContent = cn + ' (Fed, Technically)';
        bubble(garyBbl, 'May I hold that.', 3.2); say('gary.served', { item: it.short, mood: 'confused', priority: 1 }); api.sfx('whoosh');
        later(7.5, function () {
          garyEl.classList.remove('m-cafeteria-lean'); garyCap.textContent = cn; it.slide = 0; placeItem(it); api.sfx('ding');
          bubble(garyBbl, 'I did not want to eat it. I wanted to have been served.', 5); say('gary.served2', { item: it.short, mood: 'proud', priority: 1 });
          api.achieve('cafeteria.garyfed'); api.stat.inc('cafeteria.garyfed'); api.award(1.5, 'Gary, served');
        });
      }
      function doVelocity(half) {
        const it = mkItem({ id: 'velocity', name: 'Velocity', short: half ? 'Half Velocity' : 'Velocity', emoji: '➡️', g: 1 }, 1, { w: half ? 0.2 : 0.4, size: half ? 0.8 : 1 });
        if (half) {
          wells[7] = it; wellsChanged(); velCount = 0; trayEl.classList.add('m-cafeteria-lev'); later(2, function () { trayEl.classList.remove('m-cafeteria-lev'); });
          for (let k = 0; k < 3; k++) later(0.2 * k, function () { api.sfx('tick'); });
          say('velocity.half', { mood: 'proud', priority: 2 }); api.achieve('cafeteria.half'); api.award(1, 'half velocity'); api.confetti();
        } else {
          placeItem(it); velCount++; api.stat.inc('cafeteria.velocity');
          if (api.stat.get('cafeteria.velocity') === 1) { say('velocity.first', { mood: 'proud', priority: 1 }); api.achieve('cafeteria.velocity'); }
          else if (velCount === 7) say('velocity.seven', { priority: 1 });
          else if (velCount > 7) chat('velocity.over', { count: velCount, priority: 0 }, 2500);
          else chat('velocity', { count: velCount, priority: 0 }, 2500);
        }
        afterTake(it, null); saveDirty = true;
      }
      function takeRelease() {
        if (!holding) return;
        holding = false; R.classList.remove('m-cafeteria-holding'); plateSpan.textContent = ''; lastTake = api.now();
        if (phase !== 'play' || scene !== 'line') return;
        const f = holdT < 0.6 ? 0.7 : holdT < 1.5 ? 1 : 1.3, kind = holdKind, d = holdSt || holdNear;
        if (kind === 'vel' || kind === 'half') { doVelocity(kind === 'half'); return; }
        if (!d) return;
        if (d.id === 'sandra') { api.sfx('buzz'); chat('sandra.nope', { priority: 1 }, 3000); return; }
        if (d.id === 'register') { api.sfx('buzz'); chat('register', { priority: 0 }, 6000); return; }
        let it;
        if (secondsUntil > rt) { secondsN++; it = mkItem({ id: 'seconds', name: 'Seconds', short: 'Seconds #' + secondsN, emoji: '🥄', g: 1 }, 1); if (secondsN % 4 === 1) chat('spam.seconds2', { count: secondsN, priority: 1 }, 3000); }
        else if (d.id === 'pudding' && api.chance(1 / 40)) {
          it = mkItem({ id: 'skin', name: 'Pudding Skin', short: 'Pudding Skin', emoji: '🥣', g: 1 }, 1, { flags: { locked: true } }); say('pudding.skin', { priority: 2 }); api.achieve('cafeteria.skin');
        } else if (d.id === 'donot') {
          it = mkItem({ id: 'donot', name: 'Do Not Take (Taken)', short: 'Do Not Take (Taken)', emoji: '🚫', g: 5 }, 1); api.stat.inc('cafeteria.donots'); api.award(0.5, 'do not take'); say('donot.taken', { priority: 1 });
        } else {
          it = mkItem(d, f);
          if (holdKind === 'adj') { it.short = 'Adjacent ' + d.short; it.name = it.short; it.w = Math.round(d.g * 0.8 * 100) / 100; it.flags.adj = true; chat(api.chance(0.5) ? 'take.adjacent' : 'take.adjacent2', { item: d.short, priority: 0 }, 2500); }
          if (d.id === 'toaster') { it.short = 'Toast (It Means It)'; chat(api.flag.get('metToaster') || api.flag.get('toasterMet') ? (api.chance(0.5) ? 'toaster.known' : 'toaster') : 'toaster', { priority: 0 }, 3000); }
          if (d.id === 'salad') {
            saladTakes++;
            if (saladTakes === 4) {
              d.name = 'Dennis'; d.short = 'Dennis'; refreshNames(); say('dennis.promote', { priority: 2, mood: 'proud' });
              if (api.flag.get('plantClicked') || api.flag.get('metDennis')) later(5, function () { api.say('Relayed from the Lobby, where he has a different job: ' + api.line('plantStatus'), { priority: 0 }); });
            } else if (d.short === 'Dennis') chat('dennis.take', { priority: 1 }, 3000);
          }
          if (d.id === 'spork' && beat >= 7 && !spoken.fork) { spoken.fork = 1; say('sandra.fork', { priority: 0 }); }
        }
        placeItem(it); afterTake(it, d);
        if (Math.abs(holdT - (0.7 + ((takes * 0.1618) % 1.2))) <= 0.1 && takes - adequateN >= 5) { adequateN = takes; chat('take.adequate', { priority: 0 }, 1500); }
      }

      /* ---- tilt, spills and the 0.0 degree event ---- */
      function reclaim(i) {
        const it = wells[i]; if (!it) return;
        wells[i] = null; wellsChanged(); reclaimCool = 0.8; api.sfx('buzz'); api.stat.inc('cafeteria.spills'); spillN = api.stat.get('cafeteria.spills'); bodyPuff('💨');
        if (spillN === 1) say('spill.first', { mood: 'disappointed', priority: 2 }); else chat('spill', { item: it.short, count: spillN, priority: 1 }, 2000);
      }
      function tiltStep(dt) {
        let torque = 0, cnt = 0;
        for (let i = 0; i < 8; i++) { const it = wells[i]; if (!it) continue; cnt++; torque += it.w * (i === 7 ? 0.5 : 1) * ((i % 4) - 1.5); }
        const hall = scene === 'hall';
        let target = clamp(torque * 1.6, -22, 22);
        if (hall) target = clamp(target + clamp(hAx / 150, -14, 14) + (keyShift && (keyR || keyL || keyU || keyD) ? 6 * Math.sign(hAx || 1) : 0), -30, 30);
        const wobble = hall ? 0 : Math.sin(rt * 9) * Math.min(3, Math.abs(vel) / 300 + Math.abs(accEst) / 2500);
        if (reduceNow) { tiltA = target; tiltW = 0; }
        else { tiltW += ((target + wobble - tiltA) * 80 - tiltW * 11) * dt; tiltA = clamp(tiltA + tiltW * dt, -30, 30); }
        if (!isFinite(tiltA) || !isFinite(tiltW)) { tiltA = 0; tiltW = 0; }
        reclaimCool = Math.max(0, reclaimCool - dt);
        const aa = Math.abs(tiltA), thr = hall ? 20 : 12;
        if (aa > thr && cnt > 0) {
          if (!tiltFirst && !hall) { tiltFirst = true; say('tilt.first', { priority: 1 }); gauge.hidden = false; }
          let bi = -1, bw = -1;
          for (let i = 0; i < 8; i++) { const it = wells[i]; if (it && !it.flags.locked && ((i % 4) - 1.5) * tiltA > 0 && it.w > bw) { bw = it.w; bi = i; } }
          if (bi >= 0) { const it = wells[bi]; it.slide += dt / (hall ? 0.3 : aa >= 20 ? 0.5 : 1.5); if (it.slide >= 1 && reclaimCool <= 0) reclaim(bi); }
        } else for (let i = 0; i < 8; i++) { const it = wells[i]; if (it && it.slide > 0) it.slide = Math.max(0, it.slide - dt / 2); }
        if (!hall && phase === 'play' && cnt >= 2 && aa < 0.05 && Math.abs(tiltW) < 0.02 && Math.abs(vel) < 30) balT += dt; else balT = 0;
        if (balT >= 0.6 && !balDone) {
          balDone = true; gaugeTxt.textContent = 'Balanced (Physically). Please do not tell the tray.'; gaugeAt = rt + 4; gauge.hidden = false; if (!seenF.bal) { seenF.bal = 1; saveDirty = true; api.award(5, 'perfect balance'); } api.achieve('cafeteria.balanced'); say('perfect', { mood: 'confused', priority: 2 }); api.sfx('tada');
        }
        if (gaugeAt && rt >= gaugeAt) { gaugeAt = 0; gaugeTxt.textContent = 'Balanced (Emotionally)'; }
      }
      function renderTilt() {
        const r = Math.round(tiltA * 20) / 20;
        if (trayEl._ra !== r) { trayEl._ra = r; trayEl.style.transform = r ? 'rotate(' + r + 'deg)' : ''; }
        for (let i = 0; i < 8; i++) { const it = wells[i], ib = wcEls[i]._ib; if (!it || !ib) continue; const s = it.slide > 0 ? 'translateX(' + (it.slide * 6).toFixed(1) + 'px)' : ''; if (ib._st !== s) { ib._st = s; ib.style.transform = s; } }
        if (rt >= tiltTxtAt) {
          tiltTxtAt = rt + 0.1; let v = Math.round(tiltA * 10) / 10; if (!v) v = 0;
          const s = (balDone && gaugeAt && Math.abs(tiltA) < 0.06 ? 0 : v).toFixed(1) + '°'; if (tiltTxt.textContent !== s) tiltTxt.textContent = s;
          if (Math.abs(tiltA) > 3 && Math.abs(tiltA - (renderTilt.lastA || 0)) > 4) { renderTilt.lastA = tiltA; announce('Tilt ' + v.toFixed(1) + ' degrees'); }
        }
      }

      /* ---- Bernadette, fog and fragments ---- */
      function fogDraw() {
        fogDirty = false; if (!fogImg || !fogCtx) return;
        const d = fogImg.data; for (let i = 0; i < FW * FH; i++) d[i * 4 + 3] = Math.min(255, (fog[i] * 255) | 0);
        try { fogCtx.putImageData(fogImg, 0, 0); } catch (e) { /* no canvas */ }
      }
      function fogFill(x0, y0, x1, y1, v) { for (let y = Math.max(0, y0 | 0); y <= Math.min(FH - 1, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(FW - 1, x1 | 0); x++) fog[y * FW + x] = v; fogDirty = true; if (v > 0) fogOpen = true; }
      function wipeAt(cx, cy, r) {
        const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(FW - 1, Math.ceil(cx + r)), y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(FH - 1, Math.ceil(cy + r));
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dd = Math.hypot(x - cx, y - cy); if (dd > r) continue; const i = y * FW + x; fog[i] = Math.max(0, fog[i] - (dd < r * 0.6 ? 1 : (r - dd) / (r * 0.4))); }
        fogOpen = true; fogDirty = true;
      }
      function wipeEvent(e, first) {
        const rect = fogCv.getBoundingClientRect(); if (!rect.width || !rect.height) return;
        const cx = (e.clientX - rect.left) / rect.width * FW, cy = (e.clientY - rect.top) / rect.height * FH, r = Math.max(3, 28 * FW / rect.width);
        if (first) { wipeLastX = cx; wipeLastY = cy; wipeAt(cx, cy, r); return; }
        const dx = cx - wipeLastX, dy = cy - wipeLastY, steps = Math.max(1, Math.min(60, Math.ceil(Math.hypot(dx, dy) / (r * 0.5))));
        for (let s = 1; s <= steps; s++) wipeAt(wipeLastX + dx * s / steps, wipeLastY + dy * s / steps, r);
        wipeLastX = cx; wipeLastY = cy;
      }
      function fogStep(dt) {
        if (fogLock) { if (fogDirty) fogDraw(); return; }
        if (rt < clearUntil) fogFill(4, 6, FW - 5, FH - 7, 0);
        else if (fogOpen) {
          const rate = (reduceNow ? 0.3 : 0.14) * dt; let any = false;
          for (let i = 0; i < FW * FH; i++) { let v = fog[i]; if (v < 0.88) { v += rate; if (v < 0.88) any = true; else v = 0.88; fog[i] = v; } }
          fogOpen = any; fogDirty = true;
        }
        if (fogDirty) fogDraw();
        if (wipeCool > 0) { wipeCool = Math.max(0, wipeCool - dt); const s = wipeCool > 0 ? 'Steam: ' + Math.ceil(wipeCool) + 's' : 'Wipe all'; if (s !== wipeLbl) { wipeLbl = s; wipeBtn.textContent = s; wipeBtn.setAttribute('aria-disabled', wipeCool > 0 ? 'true' : 'false'); } }
      }
      function wipeAll() {
        if (scene !== 'line' || fogLock) return;
        if (wipeCool > 0) { wipeSpam++; if (wipeSpam === 6) { wipeSpam = 0; bubble(bernBbl, 'Hon. It is a squeegee. It is not a pulse.', 3); } chat('wipeall.cooldown', { priority: 0 }, 3500); api.sfx('buzz'); return; }
        wipeCool = 10; clearUntil = rt + 1.2; fogOpen = true; api.sfx('whoosh');
        if (!spoken.wipeall) { spoken.wipeall = 1; say('wipeall', { priority: 1 }); }
      }
      function regionOf(s) {
        const gw = glass.clientWidth, gh = glass.clientHeight;
        if (!gw || !gh || !s.el.offsetHeight) return { x0: 10, x1: 150, y0: 25, y1: 65 };
        const top = sentBox.offsetTop + s.el.offsetTop, left = sentBox.offsetLeft + s.el.offsetLeft;
        return { x0: clamp(left / gw * FW, 0, FW - 2), x1: clamp((left + s.el.offsetWidth) / gw * FW, 1, FW - 1), y0: clamp(top / gh * FH, 0, FH - 2), y1: clamp((top + s.el.offsetHeight) / gh * FH, 1, FH - 1) };
      }
      function hiss(s) {
        s.done = true; s.doneAt = rt; hissN++; api.sfx('whoosh'); R.classList.remove('m-cafeteria-venting'); void R.offsetWidth; R.classList.add('m-cafeteria-venting');
        hsss.classList.remove('m-cafeteria-up'); void hsss.offsetWidth; hsss.classList.add('m-cafeteria-up');
        const g = regionOf(s); fogFill(0, g.y0 - 4, FW - 1, g.y1 + 4, 0.88);
        later(1, function () { R.classList.remove('m-cafeteria-venting'); });
      }
      function markRead(s) {
        s.read = true; s.hissAt = rt + 0.8;
        const isNew = frag.indexOf(s.idx) < 0;
        if (isNew) { frag.push(s.idx); api.stat.max('cafeteria.fragments', frag.length); api.award(1, 'fragment'); } else api.award(0.2, 'fragment');
        api.sfx('pop'); raiseBrow(1.4); portCap.textContent = 'Bernadette (behind glass, mid-sentence)';
        const txt = SENT[s.idx]; announce('Bernadette said: ' + txt + ' ... and then the steam.', true);
        chat('frag', { item: txt.length > 64 ? txt.slice(0, 62) + '...' : txt, priority: 0 }, 3000);
        saveDirty = true; renderNote();
        if (frag.length >= 8 && !spoken.cork) { spoken.cork = 1; say('cork', { priority: 1 }); later(6, function () { say('cork2', { priority: 0 }); }); if (!noteOpen) toggleNote(); }
      }
      function readCheck() {
        sents.forEach(function (s) {
          if (s.done || s.read) return;
          const g = regionOf(s); let clear = 0, tot = 0;
          for (let iy = 0; iy < 6; iy++) for (let ix = 0; ix < 12; ix++) { const cx = g.x0 + (ix + 0.5) / 12 * (g.x1 - g.x0), cy = g.y0 + (iy + 0.5) / 6 * (g.y1 - g.y0); tot++; if (fog[(cy | 0) * FW + (cx | 0)] < 0.35) clear++; }
          s.clearN = clear / tot >= 0.4 ? s.clearN + 1 : 0;
          if (s.clearN >= 2) markRead(s);
        });
      }
      function dropSents() { sents.forEach(function (s) { if (s.el.parentNode) s.el.parentNode.removeChild(s.el); }); sents = []; }
      function spawnSentence(count) {
        if (scene !== 'line' || fogLock || closeStarted) { pendingSent = Math.max(pendingSent, count || 1); return; }
        pendingSent = 0; dropSents();
        const maxI = beat >= 8 ? 12 : 11, picks = [];
        if (beat >= 8 && frag.indexOf(12) < 0) picks.push(12);
        for (let i = 0; i <= maxI && picks.length < (count || 1); i++) if (frag.indexOf(i) < 0 && picks.indexOf(i) < 0) picks.push(i);
        for (let g = 0; picks.length < (count || 1) && g < 30; g++) { const r = api.randInt(0, maxI); if (picks.indexOf(r) < 0) picks.push(r); }
        picks.forEach(function (idx) {
          const line = el('div', { class: 'm-cafeteria-sline', text: SENT[idx] + ' ♨' }); sentBox.appendChild(line);
          sents.push({ idx: idx, el: line, read: false, done: false, clearN: 0, hissAt: 0, doneAt: 0, autoAt: rt + (beat >= 6 ? api.randInt(6, 14) : 45) });
        });
        sentBox.classList.toggle('m-cafeteria-tri', picks.length > 1); lastSpawn = rt; fogFill(0, 0, FW - 1, FH - 1, 0.88);
      }
      function sentStep() {
        if (rt >= checkAt) { checkAt = rt + 0.25; readCheck(); }
        for (let i = sents.length - 1; i >= 0; i--) {
          const s = sents[i];
          if (!s.done && ((s.read && rt >= s.hissAt) || (!s.read && rt >= s.autoAt))) hiss(s);
          else if (s.done && rt >= s.doneAt + 5) { if (s.el.parentNode) s.el.parentNode.removeChild(s.el); sents.splice(i, 1); }
        }
        if (pendingSent && scene === 'line') spawnSentence(pendingSent);
      }
      function ask() {
        if (sub && scene === 'line') { bubble(bernBbl, tx_('kask'), 2.6); api.sfx('blip'); return; }
        if (scene !== 'line' || phase === 'closing' || phase === 'resetting' || fogLock) return;
        if (sents.some(function (s) { return !s.done; }) || rt - lastSpawn < 6) {
          hmN++; api.stat.inc('cafeteria.hms'); api.sfx('blip'); raiseBrow(1);
          bubble(bernBbl, hmN === 7 ? 'Hm. (Seven.)' : hmN > 7 && hmN % 4 === 0 ? 'Hm. (' + hmN + '.)' : tx_('hm'), 2.4);
          if (hmN === 7) later(1.1, function () {
            say('hm.seven', { who: 'Bernadette', mood: 'proud', priority: 2 }); later(3.2, function () { say('hm.seven2', { priority: 1 }); });
            api.achieve('cafeteria.hm'); if (!seenF.hm) { seenF.hm = 1; saveDirty = true; api.award(7, 'hm'); } api.confetti(); api.sfx('tada');
          });
          return;
        }
        chat('bern.ask', { priority: 0 }, 2500); spawnSentence(beat >= 7 ? 3 : 1);
      }

      /* ---- the Register ---- */
      function unlockHall(announceIt) {
        if (hallOpen) return;
        hallOpen = true; tabHall.setAttribute('aria-disabled', 'false'); tabHall.title = 'Seating'; tabHall.classList.add('m-cafeteria-pulse');
        if (announceIt) { api.toast('Seating: Open (it has always been open)'); say('seating.open', { mood: 'proud', priority: 2 }); }
      }
      function startScan(empty) {
        if (holding) { holding = false; R.classList.remove('m-cafeteria-holding'); plateSpan.textContent = ''; }
        phase = 'scan'; regHintOn = false; scanT = 0; scanEmpty = empty; scanDone = true; scanShown = 0; vel = 0; scanLines = [];
        const its = items(), cap = R.getAttribute('data-w') === 'narrow' ? 5 : 8, beep = beat >= 4 && !regHissed;
        its.slice(0, cap - 3).forEach(function (it, i) { scanLines.push('Item ' + (i + 1) + ': ' + it.short + ' .... ' + (it.id === 'velocity' ? it.w + ' oz of hurry' : tx_('price'))); });
        if (its.length > cap - 3) scanLines.push('+ ' + (its.length - cap + 3) + ' more, each a look');
        for (let k = 0; k < 3 && scanLines.length < Math.min(cap - (beep ? 1 : 0), its.length + 3); k++) scanLines.push(tx_('receipt'));
        if (empty) scanLines = ['(nothing to scan)', tx_('receipt')];
        if (beep) { regHissed = true; scanLines.push('BEEP (HSSSS)'); later(3.4, function () { say('hiss.register', { priority: 1 }); }); }
        scanLines = scanLines.slice(0, cap);
        receiptCard.textContent = ''; receiptCard.hidden = false; receiptCard._ul = el('ul', {}); receiptCard._tot = el('div', { class: 'm-cafeteria-tot', text: '' });
        receiptCard.appendChild(el('h4', { text: 'RECEIPT' })); receiptCard.appendChild(receiptCard._ul); receiptCard.appendChild(receiptCard._tot);
        announce('Scanning your tray at the register', true);
      }
      function scanStep(dt) {
        scanT += dt; const n = scanLines.length, want = Math.min(n, Math.floor(scanT / (3 / Math.max(1, n))));
        while (scanShown < want) { receiptCard._ul.appendChild(el('li', { text: scanLines[scanShown] })); scanShown++; api.sfx('tick'); receiptCard._ul.scrollTop = receiptCard._ul.scrollHeight; }
        if (scanT >= 3) finishScan();
      }
      /* the Special board erases and writes a deadpan review of what is actually on your tray */
      let revTxt = '';
      function reviewBoard() {
        if (drill || ahOn || rushEnd || sub || phase === 'closing') return;
        const by = {}, ord = [];
        items().forEach(function (it) { if (!by[it.id]) { by[it.id] = { it: it, n: 0, w: 0 }; ord.push(it.id); } by[it.id].n++; by[it.id].w += it.w; });
        ord.sort(function (a, b) { return by[b].w - by[a].w; });
        const top = ord.slice(0, 2).map(function (k) { const b = by[k]; return b.it.short.replace(/^Adjacent /, '').replace(/\s*\(.*\)$/, '').replace(/\s*#\d+$/, '') + (b.n > 1 ? ' x' + b.n : '') + ' (' + (ADJ[k] || 'Present') + ')'; });
        revTxt = tx_('rvs') + ' ' + top.join(', ') + '. ' + tx_('rvc'); boardRevAt = rt + 10; board.classList.add('m-cafeteria-erase');
        later(0.8, function () { board.classList.remove('m-cafeteria-erase'); setBoard(revTxt); boardTxt.classList.add('m-cafeteria-rvw'); });
      }
      function finishScan() {
        phase = 'play'; api.sfx('ding'); api.award(0.5, 'register'); hideReceiptAt = rt + 14;
        if (rushEnd && !rushPaid) { rushPaid = true; api.award(3, 'rush express'); api.achieve('cafeteria.rush'); later(1.2, function () { say('rush.express', { priority: 2 }); }); }
        receiptCard._tot.textContent = scanEmpty ? 'Total: nothing, plus tax' : cycle >= 2 ? 'TOTAL: one feeling, plus tax, minus yesterday' : 'TOTAL: 1 feeling + tax';
        if (scanEmpty) {
          lapFlags.fasting = true; geraldStands = true; receiptCard.appendChild(el('div', { class: 'm-cafeteria-small', text: '💂 ' + tx_('salutes') }));
          say('fasting', { mood: 'proud', priority: 2 }); api.achieve('cafeteria.nothing'); if (!seenF.fast) { seenF.fast = 1; saveDirty = true; api.award(3, 'fasting'); } api.confetti(); hallRefresh();
        } else { reviewBoard(); chat('register', { priority: 1 }, 2000); if (api.chance(0.3)) later(3.2, function () { api.say('The register has printed a fortune on the back of the receipt. It reads: ' + api.line('fortune'), { priority: 0 }); }); }
        receiptCard.appendChild(el('button', { type: 'button', class: 'm-cafeteria-btn', style: 'min-height:32px;margin-top:6px', onclick: function () { touch(); if (!hallOpen) unlockHall(false); setScene('hall'); } }, 'Go to Seating'));
        const first = !hallOpen && !seenF.seatingOpened;
        unlockHall(false);
        if (first) {
          seenF.seatingOpened = true; saveDirty = true; api.toast('Seating: Open (it has always been open)'); say('seating.open', { mood: 'proud', priority: 2 }); say('b4.seating', { priority: 0 });
          later(2.5, function () { if (scene === 'line' && phase === 'play') setScene('hall'); });
        }
      }

      /* ---- the Hall ---- */
      let removedDiners = {}, pendingSent = 0, closingSlide = false, geraldUntil = 0, cStep = 0, hallLean = '', lunchTxtLast = '', t75Gone = false, halfPlacardMode = 0, lunchesN = 0, geraldHissed = false, clipAt = 0;
      function setT75x(x) { t75x = x; t75g.style.transform = 'translateX(' + (x - 45) + 'px)'; }
      function setPlacard(t) { const pl = TABLES[7].pl, i = t.indexOf(': '), x = pl.getAttribute('x'); pl.textContent = ''; pl.appendChild(el('tspan', { x: x, text: i > 0 ? t.slice(0, i + 1) : t })); if (i > 0) pl.appendChild(el('tspan', { x: x, dy: '1.1em', text: t.slice(i + 2) })); }
      function showBub(x, y, text, secs) { const low = y < 45; hallBub.style.left = clamp(x / 4, 22, 78) + '%'; hallBub.style.top = clamp((low ? y + 50 : y) / 3, 4, 92) + '%'; hallBub.style.transform = low ? 'translate(-50%,0)' : 'translate(-50%,-100%)'; bubble(hallBub, text, secs || 3.4); }
      function hallRefresh() {
        dinerList.forEach(function (d) { const rem = removedDiners[d.t.id] && d.k === 1; d.el.style.display = rem ? 'none' : ''; const em = DINERS[(d.t.num + d.k + lunchesN) % DINERS.length]; if (d.el.textContent !== em) d.el.textContent = em; });
        saltEls.forEach(function (s) { if (beat >= 8) s.removeAttribute('hidden'); else s.setAttribute('hidden', ''); });
        seatList.forEach(function (s) { if (s.t.coat && s.coat) { const sat = coatSat; s.emo.style.transform = sat ? 'translateY(-2px) scale(1.15)' : ''; } });
      }
      function setScene(s, force) {
        if (s === scene) return;
        if (!force && phase !== 'play' && phase !== 'afterhours') return;
        if (s === 'hall' && !hallOpen) return;
        scene = s; releaseAll(); if (ahOn) wake();
        R.classList.toggle('m-cafeteria-hall', s === 'hall'); lineView.hidden = s === 'hall'; hallView.hidden = s !== 'hall';
        tabLine.classList.toggle('m-cafeteria-on', s === 'line'); tabHall.classList.toggle('m-cafeteria-on', s === 'hall');
        tabLine.setAttribute('aria-current', s === 'line' ? 'page' : 'false'); tabHall.setAttribute('aria-current', s === 'hall' ? 'page' : 'false');
        (s === 'hall' ? hallHost : trayHost).appendChild(trayEl); trayEl._ra = null;
        if (s === 'hall') {
          tx = 360; ty = 272; hvx = hvy = 0; ptr = null; walk = null; nearTable = ''; hAx = 0; receiptCard.hidden = true; lunchesN = api.stat.get('cafeteria.seatings') % 7;
          if (!seenHall) { seenHall = true; say('hall.first', { priority: 1 }); }
          if (seenF.pea && !spoken.peaF) { spoken.peaF = 1; later(4, function () { if (scene === 'hall') say('pea.follow', { priority: 0 }); }); }
          hallRefresh(); announce('The Hall. Carry your tray to a seat.', true);
        } else if (phase !== 'closing') announce('The Line', true);
        measure();
      }
      function seatAction(seat) {
        if (scene !== 'hall' || (phase !== 'play' && phase !== 'closing')) return;
        const p = seatXY(seat);
        if (Math.hypot(p[0] - tx, p[1] - ty) <= 40) sitAt(seat);
        else { walk = { sx: tx, sy: ty, ex: p[0], ey: p[1], t: 0, seat: seat }; ptr = null; hvx = hvy = 0; chat('hall.walk', {}, 4000); }
      }
      function amendCharter(t) { curCharter = (curCharter + 1) % CHARTER.length; charterEl.textContent = CHARTER[curCharter] + (t ? ' (' + t.name + ', per Sandra)' : ''); }
      function geraldCameo() {
        if (api.now() - lastCameo < 240000) return;
        lastCameo = api.now();
        if (api.flag.get('metGerald')) say('gerald.line', { who: 'Gerald', priority: 2 }); else say('gerald.nod', { priority: 1 });
        if (!geraldHissed) { geraldHissed = true; later(4, function () { say('hiss.gerald', { priority: 0 }); }); }
      }
      function refuse(cat, seat) {
        api.stat.inc('cafeteria.refusals'); api.sfx('buzz');
        if (rt - lastRefuse > 3) { lastRefuse = rt; api.award(1, 'refusal'); }
        say(cat, { priority: 1 }); amendCharter(seat.t); announce('Request denied.', true);
        if (!coatShown && api.stat.get('cafeteria.refusals') >= 7) { coatShown = true; coatEl.hidden = false; later(3, function () { say('coat.line', { priority: 0 }); }); }
      }
      function sitAt(seat) {
        if (seat.coat) {
          if (phase === 'closing') return;
          const cn = coatRef[seat.t.num] = (coatRef[seat.t.num] || 0) + 1, alt = seat.t.num === 2 && api.flag.get('lost-and-found.coat') ? 'coat.found' : seat.t.num === 6 && api.flag.get('pet-rock.met') ? 'coat.rock' : '';
          if (alt && !spoken[alt]) { spoken[alt] = 1; refuse(alt, seat); return; }
          refuse(cn >= 3 && cn % 2 === 1 ? 'coat.again' : 'coat.' + seat.t.num, seat); return;
        }
        if (seat.t.exec) { refuse('exec.refuse', seat); geraldCameo(); return; }
        if (seat.t.sandra) { showBub(seat.t.x, seat.t.y - 14, tx_('clip'), 3.6); refuse('sandra.table', seat); return; }
        if (seat.t.half) { if (halfHold > 0 || closingSlide) halfSit(seat); else { chat('half.slide', {}, 5000); api.sfx('buzz'); } return; }
        if (phase !== 'play') return;
        startLunch(seat, false);
      }
      function halfSit(seat) {
        const wasClose = phase === 'closing';
        halfHold = 0; closingSlide = false;
        if (!wasClose) startLunch(seat, true);
        say('half.sit', { priority: 2, mood: 'proud' }); api.achieve('cafeteria.reserved'); if (!halfAwarded) { halfAwarded = true; if (!seenF.half) { seenF.half = 1; saveDirty = true; api.award(7.5, 'table seven and a half'); } } api.confetti();
        later(4, function () { say('half.removed', { priority: 1 }); t75Gone = true; t75g.style.opacity = '0'; });
      }
      function startLunch(seat, half) {
        phase = 'lunch'; lunchT = 0; sitSeat = seat; lunchAwards = 0; convTimes = []; walk = null; ptr = null; hvx = hvy = 0;
        const p = seatXY(seat); tx = p[0]; ty = p[1]; lunchBox.hidden = false; seat.g.classList.add('m-cafeteria-here'); standCard.hidden = true;
        try { lunchBox.scrollIntoView({ block: 'nearest' }); } catch (e) { /* no scrolling here */ }
        say('lunch.start', { priority: 1 }); api.sfx('blip'); announce('Seated at ' + seat.t.name + '. Lunch: 7.5 seconds.', true);
        if (half) { /* the reservation line is spoken by halfSit */ }
      }
      function converse(k) {
        if (phase !== 'lunch' || !sitSeat) return;
        const n = api.now(); convTimes.push(n); convTimes = convTimes.filter(function (t) { return n - t < 4000; });
        if (convTimes.length > 6) { chat('spam.nod', { priority: 0 }, 4000); return; }
        if (n - lastConv < 600) return; lastConv = n;
        const key = REPLY[sitSeat.t.id] ? sitSeat.t.id : 'T2';
        showBub(sitSeat.t.x, sitSeat.t.y - (sitSeat.t.r || 14) - 12, bag('r' + key + k, REPLY[key][k] || REPLY.T2[0]), 4.2); api.sfx('blip');
        if (lunchAwards < 5) { lunchAwards++; api.award(0.2, 'conversation'); }
      }
      function startShift() {
        phase = 'shift'; shiftT = 0; lunchBox.hidden = true; api.sfx('bell'); say('shift', { priority: 1 });
        const t = sitSeat ? sitSeat.t : null; if (t) { removedDiners[t.id] = true; const g = tableG[t.id]; if (g) { g.classList.add('m-cafeteria-shifting'); later(3.5, function () { g.classList.remove('m-cafeteria-shifting'); }); } }
        seatingsMount++; api.stat.inc('cafeteria.seatings'); const sn = api.stat.get('cafeteria.seatings'); lunchesN = sn % 7;
        if (sitSeat && seatsSet.indexOf(sitSeat.id) < 0) { seatsSet.push(sitSeat.id); api.stat.max('cafeteria.seats', seatsSet.length); }
        api.award(2, 'seating'); saveDirty = true; hallRefresh();
        standCard.textContent = ''; standCard.hidden = false;
        ['Standing', 'Belonging', 'Dignity'].forEach(function (nm) {
          const pips = el('span', { class: 'm-cafeteria-pips', 'aria-hidden': 'true' }); for (let i = 0; i < Math.min(12, sn); i++) pips.appendChild(el('i', { class: 'm-cafeteria-pip' }));
          standCard.appendChild(el('div', {}, nm + ': Adjacent', pips, sn > 12 ? ' +' + (sn - 12) : ''));
        });
      }
      function returnToLine() {
        api.sfx('bell'); say('bell', { priority: 1 }); api.stat.inc('cafeteria.trays'); wells = [null, null, null, null, null, null, null, null]; wellsChanged();
        specialI++; board.classList.add('m-cafeteria-erase'); later(0.8, function () { board.classList.remove('m-cafeteria-erase'); setBoard(boardTextFor()); });
        standCard.hidden = true; if (sitSeat) sitSeat.g.classList.remove('m-cafeteria-here'); sitSeat = null; phase = 'play';
        if (t75Gone || halfHold) { t75Gone = false; t75g.style.opacity = ''; } halfHold = 0; setT75x(45); setPlacard(tx_('placard'));
        setScene('line', true); pos = 60; prevPos = pos; vel = 0; curZone = -1; scanDone = false; tween = null;
        if (seatingsMount >= 9 && !closeStarted) T = Math.max(T, 565);
        if (frag.length === 0 && !sents.length && T > 30) later(1, function () { chat('bern.ask', {}, 2000); });
      }
      function hallStep(dt) {
        const pvx = hvx, pvy = hvy, px = tx, py = ty;
        if (phase === 'lunch' || phase === 'shift') { hvx = hvy = 0; hAx *= Math.exp(-8 * dt); }
        else {
          if (walk) {
            walk.t += dt; const k = clamp(walk.t / 1.2, 0, 1), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
            tx = walk.sx + (walk.ex - walk.sx) * e; ty = walk.sy + (walk.ey - walk.sy) * e;
            if (k >= 1) { const s = walk.seat; walk = null; hvx = hvy = 0; sitAt(s); }
          } else {
            const kx = (keyR ? 1 : 0) - (keyL ? 1 : 0), ky = (keyD ? 1 : 0) - (keyU ? 1 : 0);
            if (kx || ky) { const sp = keyShift ? 200 : 120, m = Math.hypot(kx, ky); hvx += clamp(kx / m * sp - hvx, -900 * dt, 900 * dt); hvy += clamp(ky / m * sp - hvy, -900 * dt, 900 * dt); }
            else if (ptr) {
              hvx += (60 * (ptr.x - tx) - 11 * hvx) * dt; hvy += (60 * (ptr.y - ty) - 11 * hvy) * dt;
              const sp = Math.hypot(hvx, hvy); if (sp > 260) { hvx *= 260 / sp; hvy *= 260 / sp; }
            } else { hvx *= Math.exp(-6 * dt); hvy *= Math.exp(-6 * dt); }
            tx = clamp(tx + hvx * dt, 8, 392); ty = clamp(ty + hvy * dt, 12, 290);
            if (phase === 'closing' && closingSlide) { /* table comes to the tray */ }
          }
          if (!isFinite(tx) || !isFinite(ty)) { tx = 360; ty = 272; hvx = hvy = 0; }
          hAx += (((hvx - pvx) / Math.max(dt, 0.001)) - hAx) * Math.min(1, dt * 8); hAx = clamp(hAx, -3000, 3000);
        }
        const moved = Math.hypot(tx - px, ty - py); hallM += moved / 12;
        if (rt >= hallStatAt) { hallStatAt = rt + 5; api.stat.max('cafeteria.hallMeters', Math.round(hallM)); saveDirty = true; }
        if (phase === 'lunch' || phase === 'shift') return;
        /* tables: lean, Charter, bubbles */
        let near = null, nd = 1e9;
        TABLES.forEach(function (t) { if (t.half) return; const d = Math.hypot(tx - t.x, ty - t.y) - (t.shape === 'round' ? t.r * 0.3 : 12); if (d < 45 && d < nd) { nd = d; near = t; } });
        const nid = near ? near.id : '';
        if (nid !== nearTable) {
          nearTable = nid;
          dinerList.forEach(function (d) { d.el.style.transform = near && d.t.id === nid ? 'rotate(' + (tx < d.x ? -4 : 4) + 'deg)' : ''; });
          if (near) {
            amendCharter(near);
            if (near.id === 'T7') { if (rt > clipAt) { clipAt = rt + 6; showBub(near.x, near.y - 14, tx_('clip'), 3.6); } }
            else if (near.id !== 'T5' && api.now() - lastIsAnyone > 6000) { lastIsAnyone = api.now(); showBub(near.x, near.y - (near.r || 14) - 12, tx_('isanyone'), 3.4); }
            if (near.id === 'T5') geraldCameo();
          }
        }
        /* the Quiet Table's silence meter works with an empty tray too */
        const q = TABLES[2], qd = Math.hypot(tx - q.x, ty - q.y);
        if (qd < 50 && (Math.abs(tiltA) > 8 || moved / Math.max(dt, 0.001) > 150)) meter += dt * 3; else meter = Math.max(0, meter - 0.5 * dt);
        if (meter >= 5 && !meterHissed) { meterHissed = true; showBub(q.x, q.y - 26, '*achoo* (HSSSS)', 3.4); say('hiss.quiet', { priority: 1 }); }
        if (meter >= 10) { meter = 3; showBub(q.x, q.y - 26, tx_('shush'), 2.4); api.sfx('tick'); }
        /* Table 7 1/2 slides away from you */
        const h = TABLES[7], hd = Math.hypot(tx - t75x, ty - h.y);
        if (closingSlide) { /* parked at the tray */ }
        else if (halfHold > 0) { halfHold -= dt; if (halfHold <= 0) { halfHold = 0; setPlacard(tx_('placard')); } }
        else if (hd < 21.5 && !halfNear && !t75Gone) {
          halfNear = true; halfAttempts++;
          if (halfAttempts === 7) { halfHold = 7.5; setPlacard('Reserved for: You, 7.5 Seconds Ago'); say('half.pity', { priority: 2 }); api.sfx('ding'); }
          else { setT75x(t75x + 38 > 190 ? 45 : t75x + 38); setPlacard(tx_('placard')); chat('half.slide', {}, 8000); api.sfx('boing'); }
        } else if (hd > 36) halfNear = false;
        const g5 = TABLES[4];                                                  /* Gerald's standing order: park beside the Executive Table, ask for nothing */
        if (!walk && Math.hypot(tx - g5.x, ty - g5.y) < 58 && Math.hypot(hvx, hvy) < 25) gerStill += dt; else gerStill = Math.max(0, gerStill - 2 * dt);
        if (gerStill >= 7.5 && !gerDone) gerSecret();
        if (beat >= 9 && !spoken.placard9) {
          if (!spoken.placardSet) { spoken.placardSet = 1; setPlacard('Reserved for: ' + api.player.name); }
          if (hd < 40) { spoken.placard9 = 1; setPlacard('Reserved for: Next Employee'); say('placard.late', { priority: 1 }); }
        }
      }
      function gerSecret() {
        gerDone = true; geraldUntil = rt + 7; api.flag.set('metGerald', true); api.achieve('cafeteria.vp'); api.confetti(); api.sfx('fanfare');
        if (!seenF.vp) { seenF.vp = 1; saveDirty = true; api.award(7, 'standing adjacent'); }
        say('gerald.adj', { who: 'Gerald', mood: 'proud', priority: 2 }); later(4.5, function () { say('gerald.adj2', { priority: 1 }); });
      }
      function lunchStep(dt) {
        lunchT += dt; const left = Math.max(0, 7.5 - lunchT), s = 'Lunch: ' + left.toFixed(1);
        if (s !== lunchTxtLast) { lunchTxtLast = s; lunchTxt.textContent = s; ringC.setAttribute('stroke-dashoffset', (113.1 * Math.min(1, lunchT / 7.5)).toFixed(1)); }
        if (lunchT >= 7.5) startShift();
      }
      function shiftStep(dt) { shiftT += dt; if (shiftT >= 3.5) returnToLine(); }

      /* ---- idle: After Hours ---- */
      let coatSat = false;
      function startAfterHours() {
        ahOn = true; phase = 'afterhours'; ahT = 0; ahStage = 0; vel = 0; ahNext = 0; chairsN = 0; chairAt = 0; releaseAll();
        R.classList.add('m-cafeteria-ah', 'm-cafeteria-away', 'm-cafeteria-nonet'); garyBbl.hidden = true; say('afterhours.1', { priority: 1 });
      }
      function ahStep(dt) {
        if (!ahOn) return;
        ahT += dt;
        if (ahStage === 0 && ahT >= 1.5) { ahStage = 1; say('afterhours.gary', { priority: 0 }); popSlice('still here'); }
        if (ahStage === 1 && ahT >= 3) {
          ahStage = 2; const sn = nodes.soup; if (sn && sn.sbbl) bubble(sn.sbbl, 'I have been the same soup the whole time.', 6);
          say('afterhours.soup', { who: 'Soup', priority: 2 }); setBoard('Employee of the Lunch: ' + api.player.name); api.achieve('cafeteria.soup');
          if (!ahAwarded) { ahAwarded = true; if (!seenF.ah) { seenF.ah = 1; saveDirty = true; api.award(3, 'after hours'); } }
        }
        if (ahStage >= 2 && ahT >= 12 + ahNext) { ahNext += api.randInt(16, 24); say('afterhours.drip', { priority: 0 }); }
        if (ahT >= 105 / DIV && chairsN < 14 && ahT >= chairAt) {
          chairAt = ahT + 2; if (!chairsN) say('chairs.up', { priority: 0 });
          chairsN++; try { const r = band.getBoundingClientRect(), rr = root.getBoundingClientRect(); puffAt(r.left - rr.left + 20 + api.rand() * Math.max(40, r.width - 60), r.top - rr.top + 20 + api.rand() * 70, '🪑'); } catch (e) { /* layout not ready */ }
        }
      }
      function wake() {
        if (!ahOn) return;
        ahOn = false; if (phase === 'afterhours') phase = 'play';
        R.classList.remove('m-cafeteria-ah', 'm-cafeteria-away', 'm-cafeteria-nonet'); setBoard(boardTextFor());
        const sn = nodes.soup; if (sn && sn.sbbl) sn.sbbl.hidden = true; say('afterhours.back', { priority: 1 });
        if (chairsN > 0) { chairsN = 0; api.sfx('tick'); later(2.5, function () { say('chairs.drop', { priority: 0 }); }); }
      }
      const IDLES = [20, 40, 60];
      function hushOff() { hushOn = false; nearTable = ''; dinerList.forEach(function (d) { d.el.style.transform = ''; }); say('hall.hush.back', { priority: 0 }); }
      function hallHush() {
        hushOn = true; api.stat.inc('cafeteria.hushes'); api.award(0.5, 'being looked at'); api.sfx('tick');
        dinerList.forEach(function (d) { d.el.style.transform = 'rotate(' + (tx < d.x ? -6 : 6) + 'deg) translateY(-1px)'; });
        charterEl.textContent = 'Clause 75: a diner who stands still for sixty seconds is deemed a table, and may be sat at, per Sandra.'; showBub(tx, Math.max(30, ty - 18), tx_('hushb'), 6); say('hall.hush', { priority: 1 });
      }
      function idleStep() {
        const idle = rt - lastInput;
        if (phase === 'play' && idleSaid < IDLES.length && idle >= IDLES[idleSaid] / DIV) { const k = idleSaid++; if (scene === 'hall') { if (k < 2) say(k ? 'hall.idle2' : 'hall.idle', { priority: 0 }); else hallHush(); } else say('idle.' + IDLES[k], { priority: 0 }); }
        if (!ahOn && idle >= 75 / DIV && phase === 'play' && scene === 'line') startAfterHours();
      }

      /* ---- the beat clock ---- */
      function darkness() {
        R.classList.add('m-cafeteria-dark'); api.sfx('buzz'); say('dark.1', { mood: 'panic', priority: 2 }); api.stat.inc('cafeteria.darks');
        later(1.3, function () { popSlice('hello'); }); later(1.8, function () { bubble(garyBbl, tx_('gdark'), 4); }); later(3.6, function () { bubble(bernBbl, tx_('bdark'), 3.6); });
        later(5.6, function () { R.classList.remove('m-cafeteria-dark'); api.sfx('ding'); say('dark.2', { priority: 1 }); api.award(1, 'blackout'); });
        later(11, function () { say('dark.3', { priority: 0 }); });
      }
      function tenMin() {
        tenDone = true; const p = el('div', { class: 'm-cafeteria-plaque', role: 'status', text: 'TEN MINUTES OF SERVICE. Your reward: a second ten minutes.' }); R.appendChild(p);
        later(9, function () { if (p.parentNode) p.parentNode.removeChild(p); });
        say('ten.1', { mood: 'proud', priority: 2 }); later(4, function () { say('ten.2', { priority: 1 }); }); if (api.flag.get('metGerald')) later(9, function () { say('ten.gerald', { who: 'Gerald', priority: 1 }); });
        api.achieve('cafeteria.service'); api.confetti(); api.sfx('fanfare'); if (!seenF.ten) { seenF.ten = 1; saveDirty = true; api.award(10, 'ten minutes'); }
      }
      function staplerEvent() {
        rareStapler = true; const n = api.stat.get('cafeteria.demands'); api.stat.inc('cafeteria.demands'); const known = !!api.flag.get('metStapler'); api.flag.set('metStapler', true);
        api.toast('Union notice posted: Local 7', { icon: '📎' }); api.sfx('stamp'); bodyPuff('📎', band);
        later(0.6, function () { api.say('The Stapler (Local 7) has asked for the floor. The floor said yes, then asked what for. ' + DEMANDS[Math.min(n, DEMANDS.length - 1)], { who: 'The Stapler', priority: 1 }); });
        if (known) later(6, function () { say('stapler.known', { priority: 0 }); });
      }
      function sockEvent() {
        rareSock = true; const known = !!api.flag.get('sockSeen'); api.flag.set('sockSeen', true); /* lint-ignore shared cast flag */ api.stat.inc('cafeteria.socks'); api.award(0.75, 'sock');
        const bb = band.getBoundingClientRect(), rr = root.getBoundingClientRect();
        for (let k = 0; k < 5; k++) later(0.5 * k, function () { puffAt(bb.left - rr.left + bb.width * (0.1 + 0.18 * k), bb.top - rr.top + bb.height * 0.62, '🧦'); });
        say(known ? 'sock.2' : 'sock.1', { priority: 1 }); later(5, function () { say('sock.3', { priority: 0 }); });
      }
      function rareStep() {
        if (rt < rareAt || phase !== 'play' || scene !== 'line' || ahOn || T < 40) return;
        rareAt = rt + 10; const p = api.selftest ? 0.25 : 1 / 150;
        if (!rareStapler && api.chance(p)) staplerEvent(); else if (!rareSock && api.chance(p)) sockEvent(); else if (!rareDrill && !drill && !rushEnd && api.chance(api.selftest ? 0.4 : 1 / 110)) drillEvent();
      }
      /* the Substitute (T 325): Bernadette goes on break; Kevin (temporary) finishes every sentence and nothing is hidden */
      function kevinStart(tries) {
        if (sub || kevDone) return;
        if (scene !== 'line' || phase !== 'play' || ahOn || drill || rushEnd || fogLock || closeStarted) { if (tries < 8) later(8, function () { kevinStart(tries + 1); }); return; }
        kevDone = true; sub = { n: 0, cur: null, ids: api.shuffle([0, 1, 2, 3, 4]).slice(0, 3).concat([5]) }; dropSents(); pendingSent = 0; fogLock = true; fogFill(0, 0, FW - 1, FH - 1, 0); fogOpen = false;
        portCap.textContent = 'KEVIN (temporary, complete sentences)'; sentBox.appendChild(el('div', { class: 'm-cafeteria-sign', text: 'BERNADETTE ON BREAK. BACK IN 7 1/2 MINUTES' }));
        api.sfx('bell'); say('sub.1', { mood: 'confused', priority: 2 }); announce('Bernadette is on break. Kevin, temporary, is finishing every sentence.', true);
        for (let k = 0; k < 4; k++) later(2.5 + k * 5.5, kevinLine);
        later(8.5, function () { say('sub.2', { priority: 1 }); }); later(26, kevinEnd);
      }
      function kevinLine() {
        if (!sub) return; if (sub.cur && sub.cur.parentNode) sub.cur.parentNode.removeChild(sub.cur);
        const t = KEV[sub.ids[sub.n++ % 4]]; sub.cur = el('div', { class: 'm-cafeteria-sline m-cafeteria-kev', text: t }); sentBox.appendChild(sub.cur); api.sfx('pop'); api.award(0.25, 'Kevin'); announce('Kevin says: ' + t, true);
      }
      function kevinEnd() {
        if (!sub) return; sub = null; sentBox.textContent = ''; sentBox.classList.remove('m-cafeteria-tri'); fogLock = false; fogFill(0, 0, FW - 1, FH - 1, 0.88);
        portCap.textContent = frag.length ? 'Bernadette (behind glass, mid-sentence)' : 'Bernadette, mid-sentence. Wipe the fog, then Ask.';
        R.classList.remove('m-cafeteria-venting'); void R.offsetWidth; R.classList.add('m-cafeteria-venting'); hsss.classList.remove('m-cafeteria-up'); void hsss.offsetWidth; hsss.classList.add('m-cafeteria-up'); api.sfx('whoosh');
        later(1, function () { R.classList.remove('m-cafeteria-venting'); });
        say('sub.3', { priority: 1 }); bubble(bernBbl, 'What did he say?', 3); later(3.2, function () { bubble(garyBbl, 'Nothing.', 2.6); }); later(5.8, function () { bubble(bernBbl, 'Good.', 2.4); });
        api.achieve('cafeteria.kevin'); api.stat.inc('cafeteria.subs'); api.award(1, 'the substitute');
      }
      /* the Soup Drill: a rare event that pays you to do nothing */
      function drillEvent() {
        rareDrill = true; drill = { t: 0, still: 0, txt: '', mid: false }; R.classList.add('m-cafeteria-drill'); api.sfx('bell'); api.toast('SOUP DRILL: hold still', { icon: '🍲' }); say('drill.1', { mood: 'panic', priority: 2 });
      }
      function drillEnd(ok, quiet) {
        drill = null; R.classList.remove('m-cafeteria-drill'); if (!ahOn) setBoard(boardTextFor()); if (quiet) return;
        if (ok) { api.stat.inc('cafeteria.drills'); api.award(2, 'soup drill'); api.achieve('cafeteria.drill'); api.sfx('tada'); api.confetti(); say('drill.pass', { mood: 'proud', priority: 2 }); }
        else { api.award(-0.5, 'soup drill fine'); api.sfx('sad'); say('drill.fail', { priority: 1 }); }
      }
      function drillStep(dt) {
        if (!drill) return;
        if (scene !== 'line' || phase !== 'play' || ahOn) { drillEnd(false, true); return; }
        const moving = dragging || keyR || keyL || holding || !!tween || Math.abs(vel) > 12;
        drill.t += dt; drill.still = moving ? 0 : drill.still + dt;
        if (drill.still >= 3.5 && !drill.mid) { drill.mid = true; chat('drill.mid', {}, 1500); }
        const s = 'SOUP DRILL: hold still ' + Math.max(0, 7.5 - drill.still).toFixed(1); if (s !== drill.txt) { drill.txt = s; setBoard(s); }
        if (drill.still >= 7.5) drillEnd(true); else if (drill.t >= 20) drillEnd(false);
      }
      /* the Lunch Rush (mid-session escalation) and the memo from Tuesday, who never appears */
      function rushStart() {
        if (drill) drillEnd(false, true);
        rushEnd = rt + 30 + 6 * Math.min(cycle - 1, 4); rushLast = rt + 3; rushPaid = false; R.classList.add('m-cafeteria-rush'); setBoard(boardTextFor());
        api.sfx('bell'); say('rush.1', { mood: 'panic', priority: 2 }); later(7, function () { chat('rush.2', {}, 2000); });
      }
      function showMemo() {
        memoPending = false; memoBody.textContent = tx_('memo'); memoCard.hidden = false; memoAt = rt + 14; api.sfx('stamp'); announce('A memo from Tuesday has been pinned to the counter.', true);
        if (api.flag.get('fax-machine.tuesdayMoved')) later(4, function () { say('rush.fax', { priority: 0 }); });
      }
      function rushStep() {
        if (memoAt && rt >= memoAt) { memoAt = 0; memoCard.hidden = true; }
        if (memoPending && scene === 'line' && phase === 'play' && !ahOn) showMemo();
        if (!rushEnd) return;
        if (rt >= rushEnd) { rushEnd = 0; R.classList.remove('m-cafeteria-rush'); if (!ahOn && !drill) setBoard(boardTextFor()); api.stat.inc('cafeteria.rushes'); say('rush.end', { priority: 1 }); memoPending = true; return; }
        if (rt >= rushLast) { rushLast = rt + 8; if (scene === 'line' && !ahOn) bubble(garyBbl, tx_('grush'), 3); }
      }
      /* the soup gets in line (beat 6): a callback-in-waiting for b8.soup */
      function soupJoins(tries) {
        if (scene !== 'line' || phase !== 'play' || ahOn) { if (tries < 6) later(8, function () { soupJoins(tries + 1); }); return; }
        soupW.hidden = false; soupW.style.setProperty('--bw', Math.round(bandW) + 'px'); soupW.classList.remove('m-cafeteria-go'); void soupW.offsetWidth; soupW.classList.add('m-cafeteria-go');
        say('soup.line', { priority: 1 }); later(2.8, function () { bubble(garyBbl, 'Go ahead. It has seniority.', 3.6); });
        later(5.5, function () { say('soup.ahead', { priority: 0 }); });
        later(9.2, function () { soupW.hidden = true; soupW.classList.remove('m-cafeteria-go'); api.sfx('ding'); api.stat.inc('cafeteria.soupjoins'); api.award(1, 'the soup pays'); api.toast("Register: 1 soup. Payer: 'Self'.", { icon: '🍲' }); say('soup.paid', { mood: 'confused', priority: 1 }); });
      }
      function regHintStep() {
        let on = regHintOn && scene === 'line' && phase === 'play' && !ahOn && !rushEnd;
        if (on && rt >= regHintAt) {
          regHintAt = rt + 0.3; const ri = stIndex('register');
          if (ri < 0) on = false; else {
            const d = wd(ri * W + W / 2 - pos), left = d < 0, n = Math.max(1, Math.round(Math.abs(d) / W)), t = (left ? '⬅ ' : '') + 'Register: ' + n + (n === 1 ? ' dish' : ' dishes') + ' this way' + (left ? '' : ' ➡');
            if (Math.abs(d) < 130) on = false;
            if (t !== regHintTxt) { regHintTxt = t; regHint.textContent = t; regHint.style.left = left ? '8px' : 'auto'; regHint.style.right = left ? 'auto' : '8px'; }
          }
        }
        if (regHint.hidden === on) regHint.hidden = !on;
      }
      const TL = [
        [0.2, 's0', function () { spawnSentence(1); if (sents[0]) sents[0].autoAt = rt + 30; nextSent = 0; }], [0.4, 'o1', function () { say(cycle >= 2 ? 'open.again' : 'open.1', { mood: 'proud', priority: 2 }); }],
        [0.8, 'dr', function () { drift = 14; }], [1.6, 'bd', function () { setBoard(boardTextFor()); }], [2.8, 'o2', function () { if (cycle < 2) say('open.2', { priority: 0 }); }], [4.5, 'gs', function () { garySigh(); }],
        [5, 'op', function () { if (cycle < 2) say('open.push', { priority: 2 }); }], [6, 's1', function () { nextSent = 40; }], [8, 'c2a', function () { if (cycle >= 2) say('again.1', { priority: 1 }); }],
        [9.5, 'ph', function () { pulseEl(takeBtn, 3); pulseEl(trayEl, 3); }], [10.5, 'wh', function () { if (cycle < 2) say('wipehint', { priority: 1 }); pulseEl(sqBtn, 3); pulseEl(askBtn, 3); }],
        [12, 'dr2', function () { if (cycle < 2 && rt - lastInput > 6) { drift = 14; later(0.6, function () { chat('open.drift', {}, 1500); }); } }],
        [14, 'ls', function () { readLabel('soup', true); if (cycle < 2) say('open.soup', { priority: 0 }); }], [18, 'o3', function () { if (cycle < 2) say('open.3', { priority: 0 }); }],
        [22, 'b2', function () { if (cycle < 2) say('b2.ladle', { priority: 1 }); }], [25, 'c2b', function () { if (cycle >= 2) say('again.2', { priority: 1 }); }],
        [28, 'bh', function () { if (cycle < 2) say('b2.hold', { priority: 1 }); pulseEl(takeBtn, 3); }],
        [40, 'b4', function () { if (cycle < 2) say('b4.register', { priority: 1 }); if (!seenF.seatingOpened && !hallOpen) { regHintOn = true; pulseEl(zoneEl, 8, 'm-cafeteria-glow'); const rn = nodes.register; if (rn) { rn.tent.classList.add('m-cafeteria-ping'); later(10, function () { rn.tent.classList.remove('m-cafeteria-ping'); }); } } }],
        [45, 'c2c', function () { if (cycle >= 2) say('again.3', { priority: 1 }); }], [46, 'bv', function () { if (cycle < 2 && velCount === 0 && api.stat.get('cafeteria.velocity') === 0) say('b2.velocity', { priority: 0 }); }],
        [52, 'b3', function () { gauge.hidden = false; if (cycle < 2) say('b3.gauge', { priority: 1 }); }], [55, 'b3h', function () { if (cycle < 2) say('b3.half', { priority: 0 }); }],
        [70, 'c2d', function () { if (cycle >= 2) say('again.4', { priority: 0 }); }],
        [80, 'gb', function () { if (scene === 'line' && !ahOn) { bubble(garyBbl, 'Bernadette. Bernadette. Is it soup yet?', 3.5); later(3.6, function () { bubble(bernBbl, 'It has always been soup, Gary.', 3); }); } }],
        [90, 'sk', function () { if (!rareSock && !api.flag.get('sockSeen') && scene === 'line' && phase === 'play' && !ahOn) sockEvent(); }],
        [105, 's2', function () { if (!hallOpen) { say('b4.register2', { priority: 0 }); pulseEl(zoneEl, 8, 'm-cafeteria-glow'); } }], [110, 'hu', function () { if (!hallOpen) { unlockHall(true); } else tabHall.classList.add('m-cafeteria-pulse'); }],
        [125, 'dk', function () { darkness(); }], [210, 'b6', function () { insertStations(['mashed', 'fish', 'milk']); say('b6.menu', { priority: 1 }); say('b6.steam', { priority: 0 }); }], [216, 'sj', function () { soupJoins(0); }],
        [255, 'rh', function () { rushStart(); }],
        [300, 'b7', function () {
          flyerCard.hidden = false; later(12, function () { flyerCard.hidden = true; }); insertStations(['sandra']); say('b7.flyer', { mood: 'smug', priority: 1 }); say('b7.fog', { priority: 0 }); later(7, function () { say('sandra.bern', { priority: 0 }); });
          items().forEach(function () { /* utensils are taped at render time */ }); trayDirty = true;
        }],
        [325, 'kv', function () { kevinStart(0); }], [360, 'tr', function () { say('tuesday.review', { priority: 1 }); }],
        [390, 'b8', function () {
          const si = stIndex('soup'); if (si >= 0) stations[si].g = 6; say('b8.cork', { priority: 1 }); say('b8.soup', { priority: 0 });
          if (!noteOpen) toggleNote(); renderNote();
        }],
        [480, 'b9', function () {
          api.sfx('bell'); later(0.6, function () { api.sfx('bell'); }); say('b9.bell', { priority: 1 }); insertStations(['tomato', 'spork', 'salt', 'gravy', 'donot']); say('b9.stations', { priority: 0 });
          geraldUntil = rt + 4; later(1, function () { say(scene === 'hall' ? 'gerald.stand' : 'b9.gerald', { priority: 1 }); }); paintLabel();
        }]
      ];
      function onBeat() { gauge.hidden = !(beat >= 3 || tiltFirst); paintLabel(); renderNote(); hallRefresh(); trayDirty = true; if (beat === 4 || beat === 5) tabHall.classList.toggle('m-cafeteria-pulse', hallOpen && beat === 5); }
      function beatStep(dt) {
        if (ahOn || phase === 'closing' || phase === 'resetting') return;
        T += dt * SCALE;
        const b = beatOf(T); if (b !== beat) { beat = b; onBeat(); }
        for (let i = 0; i < TL.length; i++) if (T >= TL[i][0] && !fired[TL[i][1]]) { fired[TL[i][1]] = 1; TL[i][2](); }
        if (nextSent && T >= nextSent && scene === 'line') {
          if (!sents.some(function (s) { return !s.done; })) { spawnSentence(beat >= 7 ? 3 : 1); nextSent = T + api.randInt(20, 35); } else nextSent = T + 5;
        }
        if (T >= nextPA && phase === 'play') { nextPA = T + api.randInt(24, 34); chat('pa' + (T < 180 ? 1 : T < 390 ? 2 : 3), { who: 'The PA', priority: 0 }, 4000); }
        if (T >= 570 && !closeStarted) { if (phase === 'play' || closeDefer > 11) startClosing(); else closeDefer += dt; }
      }

      /* ---- the Closing Bell, the not-ending and the reset ---- */
      function startClosing() {
        closeStarted = true; phase = 'closing'; cT = 0; cStep = 0; releaseAll(); if (ahOn) wake(); phase = 'closing';
        walk = null; if (scene === 'line') receiptCard.hidden = true;
      }
      function finalSentence() {
        dropSents(); sub = null; sentBox.textContent = ''; sentBox.classList.remove('m-cafeteria-tri'); fogLock = true; fogFill(0, 0, FW - 1, FH - 1, 0); fogOpen = false; fogDirty = true;
        sentBox.appendChild(el('div', { class: 'm-cafeteria-sline m-cafeteria-final', text: SENT[13] }));
        board.classList.add('m-cafeteria-erase'); later(0.8, function () { board.classList.remove('m-cafeteria-erase'); setBoard(SENT[13]); });
        try { board.scrollIntoView({ block: 'nearest' }); } catch (e) { /* no scrolling here */ }
        if (frag.indexOf(13) < 0) frag.push(13); renderNote(); api.sfx('whoosh'); R.classList.add('m-cafeteria-venting');
        api.award(5, 'closing bell'); api.achieve('cafeteria.tuesday'); api.confetti(); api.sfx('fanfare'); api.flag.set('cafeteria.closed', true); announce('Bernadette says: ' + SENT[13], true);
      }
      function closingStep(dt) {
        cT += dt * (api.selftest ? 4 : 1);
        if (cStep === 0) { cStep = 1; api.sfx('bell'); later(0.5, function () { api.sfx('bell'); }); later(1, function () { api.sfx('bell'); }); say('end.1', { mood: 'proud', priority: 2 }); }
        if (cStep === 1 && cT >= 2.5) { cStep = 2; finalSentence(); say('end.sent', { mood: 'proud', priority: 2 }); }
        if (cStep === 2 && cT >= 7) {
          cStep = 3; claps.hidden = false; geraldUntil = rt + 4; say('end.2', { priority: 2 });
          if (scene === 'hall') { closingSlide = true; setT75x(clamp(tx, 30, 370)); setPlacard('Reserved for: Next Employee'); }
          ovation(); if (seenF.pea) later(7, function () { geraldUntil = rt + 4; say('end.pea', { priority: 1 }); });
        }
        if (cStep === 3 && cT >= 11) {
          cStep = 4; R.classList.add('m-cafeteria-closed'); R.appendChild(el('div', { class: 'm-cafeteria-plaque', role: 'status', text: 'Cafeteria of Almost Food: Closed. Reopening: Now.' }));
          board.classList.add('m-cafeteria-erase'); later(0.8, function () { setBoard('Breakfast (Lunch)'); board.classList.remove('m-cafeteria-erase'); });
          if (scene === 'line') tweenTo(0, 3); coatSat = true; hallRefresh(); say('end.3', { priority: 1 }); later(1.5, function () { say('end.coat', { priority: 0 }); });
        }
        if (cStep === 4 && cT >= 15) { cStep = 5; say('end.valve', { priority: 0 }); api.sfx('tick'); }
        if (cStep === 5 && cT >= 17.5) { cStep = 6; resetAll(); }
      }
      /* the Standing Ovation: each table applauds one real number from this very session */
      function ovation() {
        const n = function (v, one, many) { return api.fmt(v) + ' ' + (v === 1 ? one : many); };
        const sp = api.stat.get('cafeteria.spills'), hm = api.stat.get('cafeteria.hms'), tk = api.stat.get('cafeteria.takes'), lb = labelsRead.length, st = seatsSet.length, fr = frag.length;
        const all = [[sp, 'Table 4 applauds your ' + n(sp, 'spill', 'spills') + ". 'In my day it was " + api.fmt(sp + 1) + ".'"],
          [hm, "The Interns applaud your " + n(hm, "Hm", "Hm's") + '. They do not know what a Hm is. They applaud louder.'],
          [tk, 'Staples, Local 7 applauds your ' + n(tk, 'take', 'takes') + ', one small clamp each. It is the most clamping the Local has done since the Demands.'],
          [lb, 'The Quiet Table applauds your ' + n(lb, 'nutrition label', 'nutrition labels') + ', silently, which is how a label is best received.'],
          [st, 'The Window Table applauds your ' + n(st, 'seat', 'seats') + '. The window has not been told. The mop nods.'],
          [fr, 'The Hall applauds the ' + n(fr, 'sentence', 'sentences') + ' you read and Bernadette did not finish. It is the longest standing ovation for something that stopped.']];
        const use = api.shuffle(all.filter(function (a) { return a[0] > 0; })).slice(0, 2);
        if (!use.length) use.push([0, "Sandra's Table applauds the empty column in your record. 'Nothing,' says Sandra, 'is also a record.'"]);
        use.forEach(function (a, i) { later(2.5 + i * 4, function () { api.say(a[1], { priority: 1 }); }); });
      }
      function resetAll() {
        epoch++; sched = []; phase = 'resetting';
        closings++; api.stat.inc('cafeteria.closings'); cycle = 1 + closings; saveDirty = true;
        T = 0; beat = 1; fired = {}; nextPA = 70; R.classList.remove('m-cafeteria-dark'); closeStarted = false; closeDefer = 0; cStep = 0; releaseAll(); ahOn = false;
        Array.prototype.slice.call(R.querySelectorAll('.m-cafeteria-plaque')).forEach(function (p) { p.parentNode.removeChild(p); });
        R.classList.remove('m-cafeteria-closed', 'm-cafeteria-ah', 'm-cafeteria-away', 'm-cafeteria-nonet', 'm-cafeteria-stepout', 'm-cafeteria-venting', 'm-cafeteria-erase', 'm-cafeteria-rush', 'm-cafeteria-drill');
        regHintOn = false; soupW.hidden = true; soupW.classList.remove('m-cafeteria-go'); rushEnd = 0; memoPending = false; memoAt = 0; memoCard.hidden = true; drill = null; gerStill = 0; if (hushOn) { hushOn = false; nearTable = ''; dinerList.forEach(function (d) { d.el.style.transform = ''; }); }
        face.parentNode.classList.remove('m-cafeteria-raise'); trayEl.classList.remove('m-cafeteria-pulse', 'm-cafeteria-lev'); takeBtn.classList.remove('m-cafeteria-pulse'); sqBtn.classList.remove('m-cafeteria-pulse'); zoneEl.classList.remove('m-cafeteria-glow'); board.classList.remove('m-cafeteria-erase');
        if (nodes.toaster && nodes.toaster.slice) nodes.toaster.slice.classList.remove('m-cafeteria-up'); garyBbl.hidden = true; bernBbl.hidden = true; hallBub.hidden = true; bubbles.length = 0;
        sub = null; boardRevAt = 0; garyEl.classList.remove('m-cafeteria-lean'); portCap.textContent = frag.length ? 'Bernadette (behind glass, mid-sentence)' : 'Bernadette, mid-sentence. Wipe the fog, then Ask.';
        claps.hidden = true; invoiceCard.hidden = true; flyerCard.hidden = true; receiptCard.hidden = true; standCard.hidden = true; lunchBox.hidden = true;
        if (sitSeat) sitSeat.g.classList.remove('m-cafeteria-here'); sitSeat = null;
        resetStations(); pos = W + W / 2; prevPos = pos; vel = 0; tween = null; drift = 0; curZone = -1; laps = 0; lapFlags = {}; spoken = {}; soupSeen = false; jelloNoted = false; saladTakes = 0;
        wells = [null, null, null, null, null, null, null, null]; wellsChanged(); velCount = 0; seatingsMount = 0; scanDone = false; nextSent = 0; pendingSent = 0; secondsUntil = 0; presses = []; pressRun = 0; tiltA = 0; tiltW = 0;
        curCharter = 0; charterEl.textContent = CHARTER[0]; dropSents(); fogLock = false; fogFill(0, 0, FW - 1, FH - 1, 0); clearUntil = 0; fogOpen = true;
        t75Gone = false; t75g.style.opacity = ''; halfHold = 0; closingSlide = false; halfNear = false; removedDiners = {}; geraldStands = false; geraldUntil = 0; meter = 0; coatSat = false; hallRefresh();
        sentBox.textContent = ''; setScene('line', true); phase = 'play';
        if (cycle >= 2) { garyCap.textContent = 'Hungry Gary Jr.'; later(2, function () { say('gary.jr', { priority: 1 }); }); }
        setBoard(boardTextFor()); paintLabel(); renderNote(); trayDirty = true;
        say('end.reset', { mood: 'proud', priority: 2 }); later(6, function () { say('end.noach', { priority: 0 }); }); sheepishAt = rt + 150; garyAt = rt + api.randInt(35, 55);
      }

      /* ---- measuring, saving, rendering, the main loop ---- */
      function measure() {
        const rw = R.clientWidth || 800; bandW = band.clientWidth || bandW;
        const w = rw >= 900 ? 'wide' : rw >= 560 ? 'mid' : 'narrow', b = rw >= 700 ? 'r' : 'c';
        if (R.getAttribute('data-w') !== w) {
          R.setAttribute('data-w', w);
          /* small screens: the label sits below the controls, so opening it never shoves TAKE down; Bernadette's glass is a strip between the counter and the tray */
          if (w !== 'wide') cw.appendChild(labelCard); else lineView.appendChild(labelCard);
          if (w === 'narrow') cw.insertBefore(bern, trayzone); else if (bern.parentNode !== brow) brow.appendChild(bern);
          btnNut.textContent = w === 'narrow' ? 'Label' : 'Nutrition'; renderNote();
        }
        if (R.getAttribute('data-b') !== b) R.setAttribute('data-b', b);
        R.style.setProperty('--u', clamp(rw / 100, 10, 14).toFixed(1) + 'px'); reduceNow = reduced(); refreshNames();
      }
      function saveNow() {
        saveDirty = false; saveAt = rt + 2;
        api.save.set('s', { closings: closings, vel: velCount, hm: Math.round(hallM * 10) / 10, frag: frag.slice(0, 16), labels: labelsRead.slice(0, 40), seats: seatsSet.slice(0, 31), flags: seenF });
      }
      let gerEmo = null;
      function renderHall() {
        const a = Math.round(tiltA * 10) / 10, key = tx.toFixed(1) + ',' + ty.toFixed(1) + ',' + a;
        if (htray._k !== key) { htray._k = key; htray.setAttribute('transform', 'translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') rotate(' + a + ')'); }
        if (peaEl) {
          const pv = !!seenF.pea; if (peaEl.hasAttribute('hidden') === pv) { if (pv) peaEl.removeAttribute('hidden'); else peaEl.setAttribute('hidden', ''); }
          if (pv) { const seated = phase === 'closing' && cStep >= 3, px = seated ? 235 : tx + 16, py = seated ? 143 : ty - 9, pk = px.toFixed(1) + ',' + py.toFixed(1); if (peaEl._k !== pk) { peaEl._k = pk; peaEl.setAttribute('x', px.toFixed(1)); peaEl.setAttribute('y', py.toFixed(1)); } }
        }
        if (!gerEmo) seatList.forEach(function (s) { if (s.t.exec && s.i === 0) gerEmo = s.emo; });
        if (gerEmo) { const up = geraldStands || hushOn || rt < geraldUntil; if (gerEmo._up !== up) { gerEmo._up = up; gerEmo.style.transform = up ? 'translateY(-8px)' : ''; } }
        if (rt - hallStatAt < 4.9 && lastHallTxt !== phase && phase === 'play') { lastHallTxt = phase; hallStatus.textContent = 'Carry the tray to a seat. Arrow keys walk, Shift hustles, Enter sits.'; }
      }
      function tick(dt) {
        rt += dt; playSec += dt;
        for (let i = 0; i < sched.length;) { const s = sched[i]; if (s.ep !== epoch) { sched.splice(i, 1); continue; } if (s.t <= rt) { sched.splice(i, 1); s.fn(); } else i++; }
        if (rt >= measureAt) { measureAt = rt + 0.4; measure(); }
        const line = scene === 'line';
        if (line) { pushStep(dt); accEst += (((vel - prevVel) / dt) - accEst) * Math.min(1, dt * 8); accEst = clamp(accEst, -6000, 6000); prevVel = vel; zoneStep(dt); }
        if (holding) {
          holdT += dt; plateSpan.style.transform = 'scale(' + (0.5 + Math.min(holdT, 2.4) * 0.4).toFixed(2) + ')';
          const d = holdSt || holdNear; if (holdKind === 'vel' || holdKind === 'half') liveServing('Velocity', holdT); else if (d && curLabel === d.id) liveServing(d.short, holdT);
          if (holdT >= 3.4) takeRelease();
        }
        tiltStep(dt);
        if (phase === 'scan') scanStep(dt);
        fogStep(dt); sentStep(); beatStep(dt); idleStep(); ahStep(dt); rareStep(); rushStep(); drillStep(dt); regHintStep();
        if (!tenDone && playSec >= (api.selftest ? 25 : 600) && phase === 'play') tenMin();
        if (scene === 'hall') hallStep(dt);
        if (phase === 'lunch') lunchStep(dt); else if (phase === 'shift') shiftStep(dt); else if (phase === 'closing') closingStep(dt);
        if (rt >= garyAt && line && phase === 'play' && !ahOn) garySigh();
        if (sheepishAt && rt >= sheepishAt && phase === 'play') { sheepishAt = rt + api.randInt(150, 240); chat('hiss.sheepish', {}, 1000); }
        if (!receiptCard.hidden && phase === 'play' && rt >= hideReceiptAt) receiptCard.hidden = true;
        if (lbLineAt && rt >= lbLineAt) { lbLineAt = 0; lbLine.hidden = true; }
        if (boardRevAt && rt >= boardRevAt) { boardRevAt = 0; if (boardTxt.textContent === revTxt) setBoard(boardTextFor()); }
        for (let i = bubbles.length - 1; i >= 0; i--) if (rt >= bubbles[i]._until) { bubbles[i].hidden = true; bubbles.splice(i, 1); }
        if (saveDirty && rt >= saveAt) saveNow();
        if (line) renderStations(); else renderHall();
        if (trayDirty) renderTray();
        renderTilt();
      }
      function frame() {
        api.requestAnimationFrame(frame);
        const n = api.now(); let dt = (n - last) / 1000; last = n;
        if (!(dt > 0)) return;
        tick(Math.min(0.05, dt));
      }

      /* ---- input: pointer, wheel, keyboard ---- */
      function onDown(e) {
        touch(); suppressClick = false;
        if (e.button > 0) return;
        const t = e.target; if (!t || scene !== 'line') return;
        if (glass.contains(t)) { if (e.pointerType === 'mouse' || squeegee) { pointerMode = 'wipe'; try { glass.setPointerCapture(e.pointerId); } catch (er) { /* synthetic event */ } wipeEvent(e, true); } return; }
        if (ctrl.contains(t) || portrait.contains(t)) return;
        if (band.contains(t) || trayHost.contains(t)) { pointerMode = 'push'; startX = lastX = e.clientX; movedPx = 0; samples = [{ t: api.now(), x: e.clientX }]; dragging = false; }
      }
      function onMove(e) {
        const n = api.now(); if (n - lastMove > 200) { lastMove = n; touch(); }
        if (pointerMode === 'wipe') { if (e.buttons || e.pointerType !== 'mouse') wipeEvent(e, false); return; }
        if (pointerMode !== 'push' || scene !== 'line') return;
        const dx = clamp(e.clientX - lastX, -250, 250); lastX = e.clientX;
        if (!dragging) { movedPx += Math.abs(dx); if (movedPx < 6) return; dragging = true; suppressClick = true; tween = null; try { root.setPointerCapture(e.pointerId); } catch (er) { /* synthetic event */ } }
        if (phase !== 'scan' && phase !== 'resetting') pos += dx;
        samples.push({ t: n, x: e.clientX }); samples = samples.filter(function (s) { return n - s.t <= 80; });
        if (samples.length >= 2) { const a = samples[0], b = samples[samples.length - 1]; vel = clamp((b.x - a.x) / Math.max(16, b.t - a.t) * 1000, -900, 900); }
      }
      function onUp() {
        if (holding && holdSrc === 'ptr') takeRelease();
        if (pointerMode === 'push') { if (dragging && (!samples.length || api.now() - samples[samples.length - 1].t > 100)) vel = 0; dragging = false; }
        pointerMode = 'none';
      }
      function isTakeTarget(t) { return !t || t === root || t === R || t === trayEl || t === takeBtn || t.tagName === 'BODY' || t.tagName === 'HTML' || (t.classList && t.classList.contains('m-cafeteria-dish')); }
      function onKeyDown(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const t = e.target;
        if (t && t.nodeType === 1) { if (!root.contains(t) && t.tagName !== 'BODY' && t.tagName !== 'HTML') return; if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) return; }
        touch(); keyShift = !!e.shiftKey;
        const k = e.key, line = scene === 'line';
        if (k === ' ' || k === 'Spacebar') {
          if (line) { if (isTakeTarget(t)) { e.preventDefault(); if (!e.repeat) { lastClickPress = api.now(); takePress('key'); } } }
          else if (isTakeTarget(t)) { const s = nearestSeat(22); if (s) { e.preventDefault(); if (!e.repeat) seatAction(s); } }
          return;
        }
        if (k === 'ArrowRight' || k === 'd' || k === 'D') { if (!keyR && line && phase === 'play') vel = clamp(vel + 260, -900, 900); keyR = true; if (k[0] === 'A') e.preventDefault(); }
        else if (k === 'ArrowLeft' || k === 'a' || k === 'A') { if (!keyL && line && phase === 'play') vel = clamp(vel - 260, -900, 900); keyL = true; if (k[0] === 'A') e.preventDefault(); }
        else if (k === 'ArrowUp') { e.preventDefault(); if (line) { if (!e.repeat) ask(); } else keyU = true; }
        else if (k === 'ArrowDown') { e.preventDefault(); if (line) { if (!e.repeat) toggleNut(); } else keyD = true; }
        else if (k === 'Escape') { selected = -1; paintSel(); try { trayEl.focus({ preventScroll: true }); } catch (er) { /* no focus */ } }
        else if (k === 'Enter' && !line && (t.tagName === 'BODY' || t === R || t === root || t === trayEl)) { const s = nearestSeat(40); if (s) seatAction(s); }
        if (line && (k === 'ArrowRight' || k === 'ArrowLeft') && tween) tween = null;
      }
      function onKeyUp(e) {
        const k = e.key; keyShift = !!e.shiftKey;
        if (k === 'ArrowRight' || k === 'd' || k === 'D') keyR = false;
        else if (k === 'ArrowLeft' || k === 'a' || k === 'A') keyL = false;
        else if (k === 'ArrowUp') keyU = false; else if (k === 'ArrowDown') keyD = false;
        else if ((k === ' ' || k === 'Spacebar')) { if (holding && holdSrc === 'key') takeRelease(); if (scene === 'line' && isTakeTarget(e.target)) e.preventDefault(); }
      }
      function onBlur() { releaseAll(); }
      api.on(root, 'pointerdown', onDown); api.on(root, 'pointermove', onMove);
      api.on(window, 'pointerup', onUp); api.on(window, 'pointercancel', onUp); api.on(window, 'blur', onBlur); api.on(document, 'visibilitychange', onBlur);
      api.on(window, 'resize', function () { measure(); }); api.on(root, 'wheel', function () { touch(); });
      api.on(band, 'wheel', function (e) { if (scene !== 'line' || phase === 'scan' || (Math.abs(e.deltaX) < Math.abs(e.deltaY) && !e.shiftKey)) return; e.preventDefault(); vel = clamp(vel + clamp(e.deltaY + e.deltaX, -120, 120) * 3, -900, 900); }, { passive: false });
      api.on(document, 'keydown', onKeyDown); api.on(document, 'keyup', onKeyUp);

      /* ---- start ---- */
      stations = START.map(mkDish); orderNodes(); pos = 60; prevPos = pos; measure(); readLabel('soup', true); renderTray(); renderNote();
      fogFill(0, 0, FW - 1, FH - 1, 0.88); fogOpen = false; fogDraw();
      setBoard("Today's Special: ..."); garyCap.textContent = cycle >= 2 ? 'Hungry Gary Jr.' : 'Hungry Gary'; coatShown = api.stat.get('cafeteria.refusals') >= 7; coatEl.hidden = !coatShown;
      setT75x(45); setPlacard(tx_('placard')); hallRefresh(); announce('Welcome to the Cafeteria of Almost Food. Push the line with the arrow keys, hold Take to serve.', true);
      api.requestAnimationFrame(frame); return { destroy: function () { saveNow(); } };
    }
  });
})();
