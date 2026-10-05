/* POINTLESS module: whack-a-nothing */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const K = 'm-whack-a-nothing-';
  const S = 'whack-a-nothing.';
  P.injectCSS(`
.m-whack-a-nothing-app{--ink:#2b2118;--cream:#fff6e0;--coral:#ff6f61;--mustard:#f2c14e;--lilac:#b9a4e6;--lawn:#9ad8a0;--teal:#2f8f8a;--sh:4px 4px 0 var(--ink);position:relative;display:grid;gap:10px;padding:10px;background:var(--cream);color:var(--ink);min-height:420px;font-weight:600;-webkit-user-select:none;user-select:none;touch-action:manipulation}.m-whack-a-nothing-app *{box-sizing:border-box}.m-whack-a-nothing-app [hidden]{display:none!important}.m-whack-a-nothing-top{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:10px}.m-whack-a-nothing-narrow .m-whack-a-nothing-top{grid-template-columns:minmax(0,1fr)}.m-whack-a-nothing-panel{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;background:#e9dcc0;border:3px solid var(--ink);border-radius:14px;padding:12px 6px 6px;box-shadow:var(--sh)}.m-whack-a-nothing-jdg{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;position:relative}.m-whack-a-nothing-bust{position:relative;width:46px;height:46px;border-radius:50%;border:3px solid var(--ink);box-shadow:2px 2px 0 var(--ink);display:grid;place-items:center;font-size:25px;line-height:1;transition:transform .2s,opacity .2s}.m-whack-a-nothing-j0 .m-whack-a-nothing-bust{background:#8be0c0}
.m-whack-a-nothing-j1 .m-whack-a-nothing-bust{background:#9fd4ff}.m-whack-a-nothing-j2 .m-whack-a-nothing-bust{background:#ffb4a6}.m-whack-a-nothing-plq{background:var(--mustard);border:2px solid var(--ink);border-radius:6px;padding:1px 5px;font-size:.68rem;font-weight:900;text-align:center;line-height:1.15;max-width:100%}.m-whack-a-nothing-plq small{display:block;font-weight:600;font-size:.56rem}.m-whack-a-nothing-padl{position:relative;width:60px;height:40px;perspective:300px;border:0;background:none;padding:0;font:inherit;color:inherit;cursor:pointer}.m-whack-a-nothing-padl:disabled{cursor:default;color:inherit}.m-whack-a-nothing-pad{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .35s}.m-whack-a-nothing-pf,.m-whack-a-nothing-pb{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:3px solid var(--ink);border-radius:8px;display:grid;place-items:center;font-weight:900;font-size:1.1rem;line-height:1}.m-whack-a-nothing-pf{background:var(--mustard);font-size:.7rem;opacity:.9}.m-whack-a-nothing-pb{background:#fff;transform:rotateX(180deg)}.m-whack-a-nothing-rev .m-whack-a-nothing-pad{transform:rotateX(180deg)}.m-whack-a-nothing-spin .m-whack-a-nothing-pad{animation:m-whack-a-nothing-spin 1.2s linear infinite}.m-whack-a-nothing-blur .m-whack-a-nothing-pb{filter:blur(2px)}.m-whack-a-nothing-down .m-whack-a-nothing-pf{background:#bfa66a}
.m-whack-a-nothing-pst{position:absolute;left:50%;top:78%;z-index:5;transform:translate(-50%,-50%) rotate(-9deg);border:2px double var(--coral);color:#d4352a;font-size:.6rem;font-weight:900;padding:0 4px;background:rgba(255,255,255,.55);white-space:nowrap;opacity:0;transition:opacity .2s;pointer-events:none}.m-whack-a-nothing-pst.m-whack-a-nothing-on{opacity:1}.m-whack-a-nothing-gone{visibility:hidden}.m-whack-a-nothing-party .m-whack-a-nothing-bust::before{content:'';position:absolute;top:-17px;left:50%;transform:translateX(-50%);border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:21px solid var(--coral)}.m-whack-a-nothing-clap .m-whack-a-nothing-bust{animation:m-whack-a-nothing-clap .35s ease-in-out infinite alternate}.m-whack-a-nothing-heck{position:static;grid-column:1/-1;margin-top:4px;pointer-events:none;background:#fff;border:3px solid var(--ink);border-radius:12px;padding:5px 8px;font-size:.74rem;line-height:1.25;box-shadow:2px 2px 0 var(--ink)}.m-whack-a-nothing-biscuit{position:absolute;left:50%;top:-14px;transform:translateX(-50%);z-index:7;background:#fff;border:3px solid var(--ink);border-radius:20px;padding:0 10px;font-size:.78rem;white-space:nowrap}.m-whack-a-nothing-score{background:#fff;border:3px solid var(--ink);border-radius:14px;box-shadow:var(--sh);padding:8px 10px;display:flex;flex-direction:column;gap:3px;font-size:.8rem;min-width:0}.m-whack-a-nothing-tot{font-weight:900;font-size:.92rem;line-height:1.2}.m-whack-a-nothing-avg{opacity:.75;font-size:.74rem}
.m-whack-a-nothing-rbar{position:relative;height:16px;margin:8px 10px 2px;border-bottom:3px dotted var(--ink)}.m-whack-a-nothing-rcirc{position:absolute;left:50%;bottom:-3px;width:16px;height:16px;margin-left:-8px;border:3px solid var(--ink);border-radius:50%}.m-whack-a-nothing-rpip{position:absolute;left:50%;bottom:-2px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--coral);border:2px solid var(--ink);transition:left .4s cubic-bezier(.3,1.5,.5,1)}.m-whack-a-nothing-rcap{font-size:.72rem;opacity:.85;line-height:1.25;min-height:2.5em}.m-whack-a-nothing-spons{display:flex;gap:8px;align-items:center;justify-content:space-between;font-size:.76rem;background:var(--mustard);border:3px solid var(--ink);border-radius:10px;padding:3px 10px;font-weight:800;box-shadow:2px 2px 0 var(--ink)}.m-whack-a-nothing-mid{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:10px;align-items:start}.m-whack-a-nothing-solo{grid-template-columns:minmax(0,1fr)}.m-whack-a-nothing-stack .m-whack-a-nothing-mid{grid-template-columns:minmax(0,1fr)}.m-whack-a-nothing-lawn{position:relative;border:3px solid var(--ink);border-radius:18px;box-shadow:var(--sh);background:repeating-linear-gradient(90deg,#9ad8a0 0 48px,#7fc48a 48px 96px);overflow:hidden;padding:34px 12px 14px;min-height:260px;transition:filter .4s,padding .3s;cursor:crosshair}
.m-whack-a-nothing-hush .m-whack-a-nothing-lawn{filter:grayscale(1)}.m-whack-a-nothing-annex .m-whack-a-nothing-lawn{padding-right:40px}.m-whack-a-nothing-clock{position:absolute;left:10px;top:7px;font-family:inherit;line-height:1.4;color:var(--ink);cursor:pointer;font-size:.68rem;font-weight:900;background:var(--cream);border:2px solid var(--ink);border-radius:6px;padding:0 6px;z-index:3}.m-whack-a-nothing-hint{position:absolute;left:10px;right:10px;bottom:8px;text-align:center;font-size:.7rem;line-height:1.3;font-weight:900;background:#fff;border:2px solid var(--ink);border-radius:6px;padding:1px 6px;z-index:3}.m-whack-a-nothing-one .m-whack-a-nothing-lawn{padding-bottom:50px}.m-whack-a-nothing-grid{display:grid;grid-template-columns:repeat(var(--cols,3),minmax(0,172px));gap:10px;justify-content:center}.m-whack-a-nothing-one .m-whack-a-nothing-grid{grid-template-columns:minmax(0,250px)}.m-whack-a-nothing-hole{position:relative;display:block;width:100%;min-height:64px;aspect-ratio:1.25/1;border:3px solid var(--ink);border-radius:16px;background:var(--lawn);padding:0;font:inherit;color:inherit;cursor:inherit;box-shadow:2px 2px 0 rgba(43,33,24,.5);overflow:visible;-webkit-tap-highlight-color:transparent}.m-whack-a-nothing-one .m-whack-a-nothing-hole{aspect-ratio:1.3/1;min-height:150px;background:#86c98f;box-shadow:3px 4px 0 rgba(43,33,24,.55),inset 0 0 0 4px rgba(255,255,255,.28)}.m-whack-a-nothing-one .m-whack-a-nothing-hnum{left:8px;top:6px;font-size:.74rem;opacity:1;background:#c98f4e;color:var(--cream);border:2px solid var(--ink);border-radius:5px;padding:0 6px}.m-whack-a-nothing-one .m-whack-a-nothing-hnum::before{content:'HOLE '}.m-whack-a-nothing-hole:active{transform:translateY(1px)}.m-whack-a-nothing-h75{position:absolute;right:-31px;top:calc(50% - 32px);width:62px;height:64px;min-height:0;aspect-ratio:auto;z-index:4}
.m-whack-a-nothing-pit{position:absolute;left:12%;right:12%;bottom:9%;height:34%;border-radius:50%;background:radial-gradient(ellipse at 50% 30%,#2a180c 0 38%,#6b4426 78%);border:3px solid #4a2d17;box-shadow:inset 0 8px 14px #3d2514,0 3px 0 #8a5a35}.m-whack-a-nothing-win{position:absolute;left:17%;right:17%;top:4%;bottom:26%;overflow:hidden;pointer-events:none}.m-whack-a-nothing-nth{position:absolute;left:0;bottom:0;width:100%;height:94%;transform:translateY(108%);transition:transform var(--td,300ms) ease-out;fill:var(--lawn);stroke:var(--ink);stroke-width:3.2;stroke-dasharray:3 4;overflow:visible}.m-whack-a-nothing-rise .m-whack-a-nothing-nth{transform:translateY(0)}.m-whack-a-nothing-sink .m-whack-a-nothing-nth{transition-timing-function:ease-in}.m-whack-a-nothing-rise .m-whack-a-nothing-nth path{animation:m-whack-a-nothing-march .5s linear infinite}.m-whack-a-nothing-peak .m-whack-a-nothing-nth path{animation:none;stroke-dasharray:none;stroke:var(--coral)}.m-whack-a-nothing-nul{stroke:none;fill:rgba(43,33,24,.4);font-weight:900}.m-whack-a-nothing-stir .m-whack-a-nothing-pit{animation:m-whack-a-nothing-jig .22s linear infinite}.m-whack-a-nothing-crumb{position:absolute;top:58%;width:5px;height:5px;border-radius:50%;background:#6b4426;opacity:0;pointer-events:none}.m-whack-a-nothing-crumb.m-whack-a-nothing-on{animation:m-whack-a-nothing-fall .6s ease-in forwards}.m-whack-a-nothing-hnum{position:absolute;left:5px;top:2px;font-size:.62rem;font-weight:900;opacity:.65;pointer-events:none}
.m-whack-a-nothing-occ{position:absolute;left:0;right:0;bottom:0;height:100%;display:grid;place-items:end center;font-size:1.9rem;line-height:1;transform:translateY(115%);transition:transform .3s;transform-origin:50% 100%}.m-whack-a-nothing-occ.m-whack-a-nothing-on{transform:translateY(0)}.m-whack-a-nothing-eyes{position:absolute;left:32%;right:32%;bottom:17%;display:none;justify-content:space-between;pointer-events:none;z-index:2}.m-whack-a-nothing-eyes.m-whack-a-nothing-on{display:flex}.m-whack-a-nothing-eyes i{width:7px;height:9px;border-radius:50%;background:#fff;border:1px solid #000}.m-whack-a-nothing-flag{position:absolute;right:4px;top:0;font-size:1.05rem;display:none;pointer-events:none;z-index:2}.m-whack-a-nothing-hasflag .m-whack-a-nothing-flag{display:block}.m-whack-a-nothing-sign{position:absolute;left:6%;right:6%;top:26%;z-index:3;background:#fff;border:2px solid var(--ink);border-radius:4px;font-size:.58rem;line-height:1.1;font-weight:900;text-align:center;padding:1px 2px;transform:rotate(-4deg);display:none;pointer-events:none}.m-whack-a-nothing-brk .m-whack-a-nothing-sign{display:block}.m-whack-a-nothing-brk .m-whack-a-nothing-pit{opacity:.55}.m-whack-a-nothing-hat{position:absolute;left:50%;top:-9px;transform:translateX(-50%) rotate(8deg);font-size:1.1rem;display:none;pointer-events:none;z-index:3}.m-whack-a-nothing-hashat .m-whack-a-nothing-hat{display:block}
.m-whack-a-nothing-chat{position:absolute;left:50%;bottom:92%;transform:translateX(-50%);z-index:12;width:max-content;max-width:150px;background:#fff;border:2px solid var(--ink);border-radius:10px;padding:2px 6px;font-size:.62rem;line-height:1.15;font-weight:700;display:none;pointer-events:none}.m-whack-a-nothing-chat.m-whack-a-nothing-on{display:block}.m-whack-a-nothing-rain .m-whack-a-nothing-hole::after{content:'☂️';position:absolute;left:50%;top:-6px;transform:translateX(-50%);font-size:1.5rem;pointer-events:none;z-index:6}.m-whack-a-nothing-table{border-radius:50%;background:repeating-conic-gradient(#fff 0 15deg,#ffc9bd 15deg 30deg)}.m-whack-a-nothing-table .m-whack-a-nothing-win,.m-whack-a-nothing-table .m-whack-a-nothing-pit{opacity:.15}.m-whack-a-nothing-table .m-whack-a-nothing-hnum{left:50%;top:38%;transform:translateX(-50%);font-size:.7rem;opacity:1;text-align:center;line-height:1.1}.m-whack-a-nothing-mal{position:absolute;left:0;top:0;font-size:2.5rem;line-height:1;pointer-events:none;z-index:50;transform-origin:70% 85%;transition:transform 90ms ease-out;display:none;will-change:transform}.m-whack-a-nothing-mal.m-whack-a-nothing-on{display:block}.m-whack-a-nothing-lan{position:absolute;right:-6px;bottom:-4px;font-size:1rem}.m-whack-a-nothing-dust{position:absolute;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;background:radial-gradient(circle,transparent 42%,rgba(255,255,255,.85) 52%,rgba(255,240,200,.5) 62%,transparent 72%);opacity:0;pointer-events:none;z-index:30}
.m-whack-a-nothing-dust.m-whack-a-nothing-on{animation:m-whack-a-nothing-dust .42s ease-out}.m-whack-a-nothing-stamp{position:absolute;z-index:40;pointer-events:none;padding:1px 9px;border:3px double #d4352a;color:#d4352a;font-weight:900;letter-spacing:.05em;font-size:.88rem;text-transform:uppercase;background:rgba(255,255,255,.25);mix-blend-mode:multiply;opacity:0;white-space:nowrap;transition:opacity .35s;transform:translate(-50%,-50%) rotate(var(--r,-8deg))}.m-whack-a-nothing-stamp.m-whack-a-nothing-on{opacity:.92;animation:m-whack-a-nothing-thunk .22s ease-out}.m-whack-a-nothing-hushb,.m-whack-a-nothing-gban{position:absolute;left:0;right:0;top:0;z-index:45;background:var(--coral);color:#fff;font-weight:900;text-align:center;padding:6px 8px;border-bottom:3px solid var(--ink);letter-spacing:.08em;transform:translateY(-120%);transition:transform .5s cubic-bezier(.3,1.6,.5,1);pointer-events:none;font-size:.9rem}.m-whack-a-nothing-gban{background:var(--mustard);color:var(--ink);letter-spacing:.02em}.m-whack-a-nothing-hushb.m-whack-a-nothing-on,.m-whack-a-nothing-gban.m-whack-a-nothing-on{transform:none}.m-whack-a-nothing-leaf{position:absolute;left:-14%;top:30%;z-index:35;font-size:2rem;line-height:1;border:0;background:none;padding:6px;font-family:inherit;cursor:inherit;display:none}.m-whack-a-nothing-leaf.m-whack-a-nothing-go{display:block;animation:m-whack-a-nothing-leaf 5s linear forwards}
.m-whack-a-nothing-pcw{position:absolute;z-index:36;animation:m-whack-a-nothing-dx 6.3s ease-in-out infinite alternate}.m-whack-a-nothing-ring{position:absolute;inset:-9px;border-radius:14px;background:conic-gradient(var(--coral) var(--p,0deg),rgba(255,255,255,.35) 0)}.m-whack-a-nothing-pc{position:relative;display:block;width:88px;height:60px;background:#fdf0c9;border:3px solid var(--teal);border-radius:6px;padding:0;font:inherit;color:var(--ink);cursor:inherit;box-shadow:var(--sh);animation:m-whack-a-nothing-dy 3.7s ease-in-out infinite alternate}.m-whack-a-nothing-pcs{position:absolute;right:4px;top:3px;width:26px;height:26px;border:2px dashed var(--teal);display:grid;place-items:center;font-size:.95rem;line-height:1}.m-whack-a-nothing-pct{position:absolute;left:5px;bottom:3px;font-size:.62rem;font-weight:900;color:var(--teal);text-align:left;line-height:1.1}.m-whack-a-nothing-dmg{background:repeating-linear-gradient(135deg,#fdf0c9 0 10px,#f3dca0 10px 12px)}.m-whack-a-nothing-scorch{position:absolute;width:44px;height:22px;margin:-11px 0 0 -22px;border-radius:50%;background:radial-gradient(#1a120a,rgba(26,18,10,.2));z-index:20;pointer-events:none;opacity:0;transition:opacity .4s}.m-whack-a-nothing-scorch.m-whack-a-nothing-on{opacity:.85}.m-whack-a-nothing-ghm{position:absolute;z-index:32;font-size:2.4rem;line-height:1;opacity:0;pointer-events:none;color:var(--lilac);filter:drop-shadow(0 0 0 var(--lilac)) saturate(0) sepia(1) hue-rotate(220deg);margin:-30px 0 0 -20px}.m-whack-a-nothing-ghm.m-whack-a-nothing-on{animation:m-whack-a-nothing-ghost .8s ease-in forwards}
.m-whack-a-nothing-cert{position:absolute;left:50%;top:50%;z-index:55;width:min(86%,300px);transform:translate(-50%,-50%) rotate(-2deg);background:#fff;border:4px double var(--teal);border-radius:8px;padding:12px;text-align:center;box-shadow:var(--sh);display:grid;gap:6px;font-size:.84rem}.m-whack-a-nothing-side{display:grid;gap:10px;min-width:0}.m-whack-a-nothing-stack .m-whack-a-nothing-side{grid-template-columns:repeat(2,minmax(0,1fr))}.m-whack-a-nothing-narrow .m-whack-a-nothing-side{grid-template-columns:minmax(0,1fr)}.m-whack-a-nothing-board,.m-whack-a-nothing-wallbox,.m-whack-a-nothing-rank{background:#fff;border:3px solid var(--ink);border-radius:14px;box-shadow:var(--sh);padding:8px 10px;min-width:0}.m-whack-a-nothing-board{background:#e4cc94}.m-whack-a-nothing-bt{font-weight:900;font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}.m-whack-a-nothing-note{display:block;width:100%;text-align:left;background:#fff9c4;border:2px solid var(--ink);border-radius:6px;padding:4px 6px;margin:4px 0;font:inherit;font-size:.7rem;line-height:1.25;color:var(--ink);cursor:pointer;transition:transform .15s}.m-whack-a-nothing-note:nth-child(odd){transform:rotate(-.7deg)}.m-whack-a-nothing-note:nth-child(even){transform:rotate(.6deg)}.m-whack-a-nothing-note small{display:block;font-weight:600;opacity:.8}.m-whack-a-nothing-tick{font-size:.68rem;border-top:2px dashed var(--ink);padding-top:3px;margin-top:4px;min-height:1.6em}
.m-whack-a-nothing-wall{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px}.m-whack-a-nothing-slot{aspect-ratio:1;border:2px dashed #9a8a60;border-radius:4px;background:rgba(255,255,255,.4);font-size:.95rem;line-height:1;padding:0;cursor:pointer;color:inherit;min-height:28px}.m-whack-a-nothing-slot.m-whack-a-nothing-full{border:2px solid var(--teal);background:#fdf0c9}.m-whack-a-nothing-wc{font-size:.68rem;margin-top:4px;opacity:.85}.m-whack-a-nothing-rname{display:flex;justify-content:space-between;gap:8px;font-weight:900;font-size:.82rem}.m-whack-a-nothing-bar{position:relative;height:18px;margin:6px 0 4px;border:3px solid var(--ink);border-radius:10px;overflow:hidden;background:#fff}.m-whack-a-nothing-fill{height:100%;width:12%;background:repeating-linear-gradient(45deg,#8be0c0 0 9px,#5cc9a0 9px 18px);transition:width .5s}.m-whack-a-nothing-rstamp{position:absolute;left:50%;top:50%;font-size:.8rem;border:2px double #d4352a;color:#d4352a;padding:0 6px;font-weight:900;background:rgba(255,255,255,.7);transform:translate(-50%,-50%) rotate(-6deg);display:none;white-space:nowrap}.m-whack-a-nothing-rstamp.m-whack-a-nothing-on{display:block}.m-whack-a-nothing-rfoot{font-size:.66rem;opacity:.75}.m-whack-a-nothing-streak{font-size:.74rem;font-weight:800;text-align:center;margin-top:6px}.m-whack-a-nothing-narr{background:var(--ink);color:var(--cream);border-radius:12px;padding:8px 12px;min-height:3em;font-size:.84rem;line-height:1.35;font-weight:600;margin-top:10px}.m-whack-a-nothing-app:not(.m-whack-a-nothing-stack) .m-whack-a-nothing-narr{display:none}
.m-whack-a-nothing-log{font-size:.74rem;background:#fff;border:2px solid var(--ink);border-radius:10px;padding:4px 10px}.m-whack-a-nothing-log summary{cursor:pointer;font-weight:800}.m-whack-a-nothing-log ol{margin:4px 0 0;padding-left:18px;max-height:120px;overflow:auto}.m-whack-a-nothing-reader{position:absolute;inset:0;z-index:60;background:rgba(43,33,24,.6);display:grid;place-items:center;padding:12px}.m-whack-a-nothing-rcard{width:min(100%,380px);background:#fdf0c9;border:5px solid var(--teal);border-radius:10px;box-shadow:var(--sh);padding:14px;display:grid;gap:10px;text-align:center}.m-whack-a-nothing-sun{width:70px;height:70px;margin:0 auto;border-radius:50%;background:radial-gradient(circle,#2a180c 0 30%,#f9c74f 31%);border:3px solid var(--ink)}.m-whack-a-nothing-rtext{font-size:.9rem;line-height:1.45;text-align:left}.m-whack-a-nothing-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}.m-whack-a-nothing-btn{font:inherit;font-weight:900;padding:8px 18px;min-height:40px;background:var(--mustard);color:var(--ink);border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);cursor:pointer}.m-whack-a-nothing-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}@keyframes m-whack-a-nothing-march{to{stroke-dashoffset:-14}}@keyframes m-whack-a-nothing-jig{0%{transform:translate(-1px,0)}50%{transform:translate(1px,1px)}100%{transform:translate(-1px,-1px)}}@keyframes m-whack-a-nothing-fall{0%{opacity:1;transform:translateY(-6px)}100%{opacity:0;transform:translateY(22px)}}
@keyframes m-whack-a-nothing-dust{0%{opacity:.95;transform:scale(.3)}100%{opacity:0;transform:scale(1.7)}}@keyframes m-whack-a-nothing-thunk{0%{opacity:0;transform:translate(-50%,-50%) rotate(var(--r,-8deg)) scale(2.4)}100%{opacity:.92;transform:translate(-50%,-50%) rotate(var(--r,-8deg)) scale(1)}}@keyframes m-whack-a-nothing-spin{from{transform:rotateX(180deg) rotateZ(0)}to{transform:rotateX(180deg) rotateZ(360deg)}}@keyframes m-whack-a-nothing-clap{from{transform:translateY(0)}to{transform:translateY(-5px) rotate(4deg)}}@keyframes m-whack-a-nothing-leaf{0%{left:-14%;transform:rotate(0) translateY(0)}50%{transform:rotate(270deg) translateY(16px)}100%{left:108%;transform:rotate(540deg) translateY(-8px)}}@keyframes m-whack-a-nothing-dx{from{transform:translateX(-24px) rotate(-6deg)}to{transform:translateX(30px) rotate(7deg)}}@keyframes m-whack-a-nothing-dy{from{transform:translateY(-10px)}to{transform:translateY(14px)}}@keyframes m-whack-a-nothing-ghost{0%{opacity:0;transform:translateY(-40px) rotate(0)}40%{opacity:.5}70%{opacity:.5;transform:translateY(0) rotate(-70deg)}100%{opacity:0;transform:translateY(0) rotate(-70deg)}}@media (pointer:coarse){.m-whack-a-nothing-h75{width:80px;right:-31px;min-height:64px}}@media (hover:hover) and (pointer:fine){.m-whack-a-nothing-lawn,.m-whack-a-nothing-lawn *{cursor:none!important}}@media (prefers-reduced-motion:reduce){ .m-whack-a-nothing-app *,.m-whack-a-nothing-app *::after{animation-duration:1ms!important;animation-iteration-count:1!important;transition-duration:1ms!important}
.m-whack-a-nothing-rise .m-whack-a-nothing-nth path,.m-whack-a-nothing-stir .m-whack-a-nothing-pit,.m-whack-a-nothing-pcw,.m-whack-a-nothing-pc{animation:none!important}.m-whack-a-nothing-ghm.m-whack-a-nothing-on{opacity:.5;animation:none!important}.m-whack-a-nothing-stir .m-whack-a-nothing-pit{outline:2px dotted var(--ink)}}.pm-reduce-motion .m-whack-a-nothing-ghm.m-whack-a-nothing-on{opacity:.5;animation:none!important}.pm-reduce-motion .m-whack-a-nothing-app *,.pm-reduce-motion .m-whack-a-nothing-app *::after{animation-duration:1ms!important;animation-iteration-count:1!important;transition-duration:1ms!important}.pm-reduce-motion .m-whack-a-nothing-rise .m-whack-a-nothing-nth path,.pm-reduce-motion .m-whack-a-nothing-stir .m-whack-a-nothing-pit,.pm-reduce-motion .m-whack-a-nothing-pcw,.pm-reduce-motion .m-whack-a-nothing-pc{animation:none!important}
`, 'css-whack-a-nothing');
  P.addAchievements([
    { id: 'whack-a-nothing.perfected', name: 'Grand Marshal of the Unoccupied Aperture', desc: 'Land your first Nothing, Perfected (within 55 ms). Judge Finch holds up 7½ in congratulations.', icon: '🏆', reward: 5 }, { id: 'whack-a-nothing.seventh-half', name: 'The Order of the Seventh and Also Half Whack', desc: 'Whack Hole 7½ at a Textbook grade or better. It counts as half a hole, and so half an achievement, and so full.', icon: '🥇', reward: 5 },
    { id: 'whack-a-nothing.appeals', name: 'Knight Commander of the Appeals Process', desc: 'File 5 appeals and receive 5 identical scores with 5 different stamps.', icon: '📜', reward: 5, check: function (s) { return (s['whack-a-nothing.appeals'] || 0) >= 5; } }, { id: 'whack-a-nothing.stillness', name: 'Chancellor of Stillness, First Class', desc: 'Hold perfectly still through a full Hush round, even when a leaf drifts by.', icon: '🤫', reward: 5 },
    { id: 'whack-a-nothing.duet', name: 'Duettist of the Temporal Variety', desc: 'Whack in unison with your own ghost. Sandra has already fined you.', icon: '👻', reward: 5 }, { id: 'whack-a-nothing.hundred', name: 'Hundred-Whack Dignitary, Order of the Mallet (Third Class)', desc: 'Whack 100 times. The ceremony is attended by one plant and several drifting dust motes.', icon: '🔨', reward: 5, check: function (s) { return (s['whack-a-nothing.whacks'] || 0) >= 100; } },
    { id: 'whack-a-nothing.postmaster', name: 'Postmaster General of Absent Moles', desc: 'Catch a postcard without damaging it, then read it fully. Hidden because it is hard to be this patient.', icon: '📮', secret: true, reward: 10 }, { id: 'whack-a-nothing.unwitnessed', name: 'Supreme Witness of the Unwitnessed Whack', desc: 'Land an Unobserved Whack in the exact moment all three judges blink, then be told it never happened.', icon: '👁️', secret: true, reward: 10 },
    { id: 'whack-a-nothing.idle', name: 'Grand Master of Not Whacking, Emeritus, With Distinction', desc: 'Do nothing for 180 seconds. This was the best whack we have ever seen.', icon: '🕰️', secret: true, reward: 10 }, { id: 'whack-a-nothing.fatigue', name: 'Supreme Arbiter of the Mallet Grievance', desc: 'Whack 12 times in 3 seconds. The holes would like a word. The word is "break".', icon: '📛', secret: true, reward: 5 },
    { id: 'whack-a-nothing.toast', name: 'Order of the Unwhackable Breakfast', desc: 'Witness the toast. Whack it or spare it. The toaster is grateful either way.', icon: '🍞', secret: true, reward: 10 }, { id: 'whack-a-nothing.zwhack', name: 'Signatory of the Lawn', desc: 'Sign the lawn with a Z. It will be taken into account at the next review of nothing.', icon: '✍️', secret: true, reward: 5 },
    { id: 'whack-a-nothing.eyes', name: 'Witness, Unconfirmed', desc: 'Whack a Nothing at the exact moment it had eyes. Management has no record of this.', icon: '👀', secret: true, reward: 10 }, { id: 'whack-a-nothing.gala', name: 'Guest of Honour (By Default)', desc: 'Attend the Retirement Gala of a mole who did not.', icon: '🎉', reward: 10 },
    { id: 'whack-a-nothing.sock', name: 'Lord Warden of the Misplaced Hosiery, Keeper of Its Itinerary', desc: 'Meet the Missing Sock. It was not lost. It was, in its own words, pending.', icon: '🧦', secret: true, reward: 10 }, { id: 'whack-a-nothing.clock', name: 'Grand Chronometrist of the Perpetually Correct Hour', desc: 'Check the lawn clock seven times. It was right each time. It will not be discussing this further.', icon: '⏰', secret: true, reward: 5 },
    { id: 'whack-a-nothing.appointment', name: 'Sovereign of the Appointed Instant, Warden of 12:00:03', desc: 'Stay ten minutes, then whack the one Nothing that arrived exactly on schedule. Judge Finch put down his 7½ for it. This has not happened before and will be denied.', icon: '🕛', secret: true, reward: 15 }
  ]);
  P.addShopItems([
    { id: 'whack-a-nothing.lanyard', name: 'Mallet Lanyard (Compliance Approved)', desc: 'A lanyard for the mallet. The mallet did not ask for one. The mallet has a badge now.', price: 15, icon: '📛', category: 'cosmetic', flavor: ['Sandra has approved the lanyard. Sandra has not approved the mallet.'] }, { id: 'whack-a-nothing.gavinhat', name: 'Gavin\'s Little Hat', desc: 'A small hat for a mallet named Gavin. Gavin has never needed one.', price: 40, icon: '🎩', category: 'junk', flavor: ['Gavin has accepted the hat without comment. Gavin has never needed one. Gavin appreciates being asked.'] }
  ]);
  P.addSettings([
    { id: 'whack-a-nothing.weight', label: 'Mallet Weight', type: 'slider', min: 0, max: 100, default: 50, responses: ['The mallet has been weighed. The mallet declines to say.', 'Sandra from Compliance has flagged the new weight.', 'The mallet is now exactly as heavy as it was.'] }, { id: 'whack-a-nothing.sens', label: 'Nothing Sensitivity', type: 'select', options: ['Low', 'Medium', 'Yes'], default: 'Medium', responses: ['Sensitivity noted. The nothing remains as sensitive as before.', 'Nothing has been consulted.'] }
  ]);
  P.addLines('ticker', [
    'POINTLESS NEWS: Whack-A-Nothing reports record attendance of nothing. The nothing declined to comment.',
    'BREAKING: a mole has been rumored again. Experts confirm this is the fourteenth time this hour.',
    'JUDGING UPDATE: the panel awarded 7½ to a whack that did not occur. It is the finest 7½ of the quarter.',
    'LAWN REPORT: Hole 5 remains on a break. Hole 5 will be back in 5. The 5 has not been specified.',
    'LAWN REPORT: Judge Finch has held up a 7½ for the 4,000th consecutive time. Analysts call it a trend, then decline to elaborate.',
    'WEATHER: Rain Delay (Indoors) is expected at some point. Umbrellas are standing by, ready to be of no use.',
    'SPORTS: Gavin the mallet declines to say whether he is a mallet or a Gavin. Both camps have asked for space.',
    'MARKETS: shares in Hole 7½ are up half. Shares in Hole 7 are alarmed.',
    'BREAKING: a sock has been seen near a lawn. It is not missing. It is pending.'
  ]);
  const LINES = {
    intro: [ `Welcome to Whack-A-Nothing. Whack when it appears. It will not appear. Timing is everything, and everything is absent.`, `Please stand by. The first Nothing is scheduled for 12:00:03. A second Nothing is provisionally pencilled in for 12:00:04.`, `The hole is ready. The hole has been ready since before you arrived. The hole is a professional.`, `This is Hole 1. It is the only hole at this time. It is not nervous.`, `Whack-A-Nothing was declared a sport by the same committee that declared Thursday. They were thorough.`, `You do not need to see the nothing. You need only trust the outline of it.`, `A mole is scheduled. The mole has not confirmed. The mole has not declined. The mole has a lanyard somewhere.`, `First-time whackers are advised to whack at the instant the nothing peaks. The peak is marked by the absence of a marking.`, `Whack-A-Nothing has been audited by Sandra from Compliance and found to be, in her words, 'present'.`, `Safety notice: the mallet is soft, the lawn is soft, and the nothing is of no known hardness. Whack accordingly.`, `Today's forecast: nothing, with a chance of the same nothing later.`, `Management has laminated the rules. There are no rules. The laminate is excellent.`, `Please keep all limbs inside the whacking area. The whacking area is a hole. It is not large. Neither are limbs.` ], sponsor: [ `Hole 1 is sponsored by Dennis (Plant).`, `Hole 4 is sponsored by Dennis (Plant). Dennis (Plant) is thriving in it.`, `Hole 7 is sponsored by the idea of it.`, `Hole 9 is sponsored by a hole that wishes to remain anonymous.`, `Hole 4 is sponsored by Dennis (Plant). Dennis (Plant) believes in nothing in particular.`, `Hole 12 is sponsored by Hole 11, who was not consulted.`, `Hole 7½ is sponsored by a half-page advertisement for itself.` ], firstWhack: [ `Whack registered. Nothing was struck. Nothing has been informed.`, `That was your first whack. Management notes it was recorded, and also that it was yours.`, `A first whack. Three chairs are being wheeled in so it can be judged retroactively. Please remain whacked.`, `You have struck at nothing with a mallet for the first time. Go gently. It will be your career.` ],
    panelArrives: [ `The panel apologizes for being late. They were held up by something. It is unclear what.`, `Judges, please be seated. You are reviewing the previous whack 'on tape'. There is no tape.`, `Judge Finch has arrived with a 7½ already raised. He has not yet seen the whack.`, `The panel has been wheeled in. The panel is on casters. The panel is not insured for casters.`, `Scores will now accumulate under the panel. Please do not attempt to read them as a trend.` ], wait: [ `To whack: click the hole, tap it, or press Q. All three are the same whack. The nothing has no preference and has been asked.`, `The first Nothing is on its way. Management has checked. Management has checked again, in a calmer voice.` ], gradePerfected: [ `Nothing, Perfected. Please sit down. We are all very uncomfortable.`, `Nothing, Perfected. %err% ms from the peak. The peak has asked for a moment alone.`, `That was exactly the nothing. Judge Plimsoll has put down her pen and picked it up again.`, `Perfected. There is no higher grade, in the sense that there is one and it is in a drawer.`, `You whacked the exact instant of nothing. The silence lasts four seconds. It is the longest anyone has felt anything.`, `Nothing, Perfected. Three people have stopped breathing. One of them is Finch, who does not need to.`, `Perfected. The hole has requested a copy of the footage and then remembered there is none.`, `Nothing, Perfected. A single tear has been entered into the minutes as 'condensation'.`, `Perfected. Management has waited its whole career to say this and cannot recall the next word.` ], gradeTextbook: [ `Textbook Nothing. A clean whack. The nothing never saw it coming, which is its default state.`, `Textbook Nothing. The mallet was committed. The nothing was merely present.`, `Textbook Nothing. %err% ms off the peak. Management calls this 'precision'.`, `Textbook Nothing. This will be used to teach other nothings.`, `Textbook Nothing. The textbook is thin, but it is yours.`, `Textbook Nothing. %err% ms. A footnote has been added in your honour. The footnote is also nothing.`, `Textbook. The nothing has been whacked in the manner described on page 7½.`, `Textbook Nothing. Judge Plimsoll nodded once. It was a very economical nod.`, `Textbook Nothing. The chapter is called 'Hitting Air With Intent'. You are on the cover.` ],
    gradeAdequate: [ `Adequate Nothing. Adequate is the grade we give when we are tired and fond of you.`, `Adequate Nothing, %err% ms from the peak. The peak will be in touch.`, `Adequate Nothing. Nobody was harmed. One thing was mildly acknowledged and has asked for a day off.`, `Adequate Nothing. It has been placed on your permanent record, in pencil.`, `Adequate Nothing, %err% ms. Management would describe it as 'fine' and then lie down.`, `Adequate. The nothing wanted to be hit harder. The nothing is not going to say so.`, `Adequate Nothing. This is the grade of someone who showed up. Showing up is a nothing of its own.`, `Adequate Nothing. The panel exchanged a look. The look was a 6.` ], gradeEarly: [ `Premature Nothing. You whacked it before it had a chance to not appear.`, `Early by %err% ms. The nothing was still putting its coat on.`, `Premature Nothing. Whacking before the nothing is called Pre-Nothing. It is frowned upon at trade level.`, `Premature Nothing. The nothing has been inconvenienced and asks that you ring ahead next time.`, `Early. The nothing was told you were keen. It was not flattered.`, `Early by %err% ms. The hole was still doing its stretches.`, `Premature. The nothing had not yet been announced. Management has now announced it, a bit flat.`, `Premature Nothing. You have whacked the idea of the nothing. The idea was not ready.`, `Early. The hole is rattled. The hole had prepared a few words.` ], gradeLate: [ `Belated Nothing. The nothing left at 4:17. You arrived at 4:17 and a half.`, `Late by %err% ms. The nothing has already gone home and taken the good chair.`, `Belated Nothing. You are whacking the memory of a nothing. It is a very good memory.`, `Belated Nothing. Nothing occurred %err% ms before you. Nothing was not told.`, `Belated. The hole is exactly as empty as it was, but now with regret.`, `Belated Nothing, %err% ms. The nothing left you a note under the good rock.`, `Late by %err% ms. The nothing peaked, was admired, and sank. There was cake. The cake was also nothing, and you missed it.`, `Belated. The nothing has gone to a better, emptier place.`, `Belated Nothing. The peak was lovely. We would have taken a photo, but see 'tape'.` ],
    unscheduled: [ `Unscheduled Whack at Pure Nothing. This is also a nothing, but it was not on the agenda.`, `You have struck the lawn. The lawn has filed a brief complaint (Form 27B/6).`, `Unscheduled Whack. Management will log it under 'Enthusiasm (Unspecified)'.`, `Impact detected on air. The air has requested a copy of your credentials.`, `The whack was real. The target was not scheduled. Both are true at once, which is rare for a Tuesday.`, `Unscheduled Whack. The hole has been struck without an appointment. Reception is mortified.`, `You have whacked where nothing was not. Nothing is displeased, in a negative sense.`, `Whack logged under 'Cardio'.`, `That was a whack at a lawn. The lawn bears you no ill will. The lawn has a great deal else to bear.`, `The grass has been touched. The grass would like to speak to whoever is in charge. It has been told it is a lawn.` ],
    unCh: [ [ `Three unscheduled whacks in a row. Management has begun to refer to this as 'a style'.`, `Three whacks at nothing in a row, none of them on the agenda. The agenda has asked to be left out of it.`, `That is three in a row at nothing. A pattern is forming. The pattern is a flinch.` ], [ `Six in a row at pure nothing. The lawn has retained counsel. Counsel is a worm with a lanyard.`, `Six unscheduled whacks. The air has filed a motion. The motion is to be left alone, in the air.`, `Six. The lawn has started calling you 'the whacker', in the voice reserved for weather.` ], [ `Ten consecutive whacks at nothing that was not even scheduled. You are doing what we do, without the paperwork.`, `Ten in a row with no nothing in sight. Management admires the faith and would also like to see a form.`, `Ten whacks at the unscheduled. The nearest hole has put down a small cushion. It does not help. It is a lovely gesture.` ], [ `Fifteen. The lawn has stopped flinching. This is not a good sign for either of you.`, `Fifteen in a row. The lawn is so used to you that it has begun to lean into it.`, `Fifteen. A moth has landed on the mallet. The moth has the right of way.` ], [ `Twenty-five unscheduled whacks. Sandra has opened a file titled 'Mallet, Over-Hours'.`, `Twenty-five. Sandra has added a column to the file. The column is 'Whack, Why'.` ], [ `Forty. The mallet and the lawn are now so familiar that they share a mailbox.`, `Forty unscheduled whacks. The lawn has begun to sign its replies. They are all the same reply.` ] ], gradeRun: [ `That is %n% %grade% whacks in a row. The panel is no longer sure whose idea this was.`, `%n% %grade% whacks, back to back. %grade% has begun to feel seen, and is not sure it likes it.`, `A run of %n% %grade% whacks. The word has now lost all meaning, which is the most it can do for you.`, `%n% in a row, all '%grade%'. Management has stopped fighting the pattern and started setting a table for it.` ], replayLate: [ `The nothing peaked %err% ms ago and is already telling the story at parties.`, `You arrived %err% ms after the peak. The peak had a lovely time and has left a plate for you.`, `The nothing peaked, was admired, and sank, all %err% ms before you. You will hear about it from the others.` ],
    replayEarly: [ `Nothing occurred %err% ms after you. Nothing is not usually this keen.`, `You were %err% ms ahead of the peak. The peak is being told now and is putting on a nicer shirt.`, `You beat the peak by %err% ms. There is no medal for beating a nothing to it, but there is a drawer.` ], replayAny: [ `The pip and the circle are %err% ms apart. The photo finish shows a very clean hole.`, `The replay is available. The replay is a hole. It is, once again, a hole.`, `Replay: a hole, a circle, and a pip. The pip is you. The circle is the plan.`, `Frame-by-frame review shows %err% ms of daylight between you and nothing. The daylight has been cited.`, `The photo finish has been developed. It is a photo of a hole, taken a little after it mattered.`, `Replay: %err% ms. The hole was consulted. The hole said, 'I was right here.'` ], judgeDeduct: [ `Judge Plimsoll deducts 0.5 for 'posture of the mallet', citing clause 4(a). The mallet was not consulted.`, `Judge Plimsoll deducts 0.5 for posture under clause 4(a)(ii)(c). The clause is a long way down.`, `Judge Plimsoll has found clause 11½. It was in the cupboard. It is a very small clause.`, `Judge Plimsoll deducts 0.5 for posture, citing the clause appendix to the clause appendix.`, `Judge Plimsoll deducts 0.5 for posture, citing clause 4:17 PM. Clause 4:17 PM is a time and also a clause.` ], deductLate: [ `Judge Plimsoll has blamed the posture deduction on 'the previous mallet'. The previous mallet is unavailable for comment.`, `Judge Plimsoll is still deducting for the previous mallet. The previous mallet is being very patient about it.`, `Judge Plimsoll deducts 0.5 for posture. She says the previous mallet 'had a stance'. The stance is described as upright, but insulting.`, `Judge Plimsoll deducts for posture, and for the previous mallet's posture, which she says is still on the lawn.`, `Judge Plimsoll deducts 0.5 for posture. The previous mallet has retained a representative. The representative is a smaller mallet.`, `Judge Plimsoll has deducted for posture again. She takes no pleasure in it, and has brought a pen that suggests otherwise.`, `Judge Plimsoll deducts 0.5 under the 'previous mallet' precedent. She was asked to cite it. She cited the previous mallet.`, `Judge Plimsoll: 'Posture.' The previous mallet, wherever it is, is doing very well and has asked us not to say how.` ],
    judgePlimsoll: [ `Judge Plimsoll: 'The wrist was committed. The nothing was not. A 6.5.'`, `Judge Plimsoll: 'I mark technique, not outcome. The outcome is nothing, and I mark that too.'`, `Judge Plimsoll notes that the whack arrived on time, in the sense that it arrived. She has underlined 'arrived'.`, `Judge Plimsoll awards full marks for the swing and none for the sky.`, `Judge Plimsoll: 'Excellent follow-through. Through what, I cannot say.'`, `Judge Plimsoll, on the footwork: 'There was footwork. There were feet. I have seen less.'`, `Judge Plimsoll has scored the whack against a scale she keeps in a drawer. The drawer sends its regards.`, `Judge Plimsoll lowered her glasses to review a whack that was already over. She has not raised them since.` ], quillGen: [ `Judge Quill: 'I felt something. I checked. It was the draft. 8.'`, `Judge Quill wishes it noted that the previous whack was 'more nothing-forward'.`, `Judge Quill is moved by the geometry of your whacks. He asked not to say which geometry.`, `Judge Quill: 'There was a hush before the whack. I have chosen to believe it was for me.'`, `Judge Quill murmurs that the whack had 'good bones'. He has been asked whose.`, `Judge Quill dabs at an eye with a pocket square. It was dust. It was also not.`, `Judge Quill: 'I admire the commitment to a thing that is not there. It is my entire career.'` ], quillRep: [ `Judge Quill deducts a point for repetition. 'We have seen this hole. We were there.'`, `Judge Quill: 'Hole %hole% again. The hole had the same expression. I took it personally.'`, `Judge Quill deducts a point for repetition. A second point was considered and set down gently.` ], quillNew: [ `Judge Quill rewards a new hole. 'Variety. In a field of nothing, a variety of nothing is a gift.'`, `Judge Quill: 'A different hole. You have range. The range is a lawn.'` ], quillLife: [ `Judge Quill: 'Three in a row at the same hole is not a pattern. It is a lifestyle.'`, `Judge Quill: 'Three at Hole %hole%. This is no longer a performance. It is a residency.'` ], quillWhisper: [ `Judge Quill, quietly: 'Was any of this the point? ... I will score that 7.5.'` ], judgeFinch: [ `Judge Finch holds up a 7½.`, `Judge Finch holds up a 7½. Management notes this is consistent.`, `Judge Plimsoll quietly asks Judge Finch if he has ever considered a 7. Judge Finch holds up a 7½ in reply.` ],
    finchRand: [ `Judge Finch holds up a 7½. Judge Finch always holds up a 7½. It is the system.`, `Judge Finch's 7½ has been reviewed and found to be a 7½.`, `Judge Finch holds up a 7½ and, for the first time, looks at it.`, `A 7½ went up before the whack had finished happening. Judge Finch calls this 'anticipation of consistency'.`, `Judge Finch holds up a 7½. Somewhere a ruler feels seen.`, `Judge Finch's paddle has been replaced. The new paddle also reads 7½. It was printed that way before he knew.`, `The 7½ is held at the same height as last time, to the millimetre. Finch has been practicing with a level.` ], finchNoShow: [ `Judge Finch holds up a 7½ for a whack that did not occur. The whack has sent regrets.`, `Judge Finch holds up a 7½ for the air. The air has accepted, with some hesitation.`, `A 7½ has been awarded to a whack that never took place. It is the most consistent thing that has not happened to us.`, `Judge Finch holds up a 7½ for a whack at nothing. Nothing has framed it.`, `Judge Finch's 7½ has been awarded for effort, and for the absence of a thing to apply it to. It is the same 7½.`, `Judge Finch has held up a 7½ before being shown the whack. He has been shown the whack. The 7½ stands.` ], finchStare: [ `The other two judges slowly turn to stare at Judge Finch. Judge Finch holds up a 7½.`, `The panel turns to look at Judge Finch, who has been holding a 7½ the whole time. He appears calm. He is not.`, `Plimsoll and Quill look at Finch. Finch looks at his 7½. His 7½ looks, if anything, away.` ],
    heckle: [ `Plimsoll to Quill: 'You cannot score a whack for ambiance.' Quill to Plimsoll: 'I have scored for ambiance.'`, `The judges confer. They agree to disagree about nothing, for eleven seconds, in writing.`, `Judge Quill says the lawn is too green. Judge Plimsoll says it is the correct green. They have agreed to disagree about the grass.`, `Judge Plimsoll accuses Judge Quill of 'feeling during working hours'. Judge Quill does not deny it.`, `The panel is overwhelmed with nothing and requests lunch. Lunch has been classified as a nothing.`, `Judge Quill asks whether the whack 'meant it'. Judge Plimsoll asks whether anything does.`, `Judge Plimsoll asks Judge Quill to stop sighing at the whack. Judge Quill says it is how he breathes in.`, `The panel has paused to discuss whether the last nothing was 'in character'. The discussion has been minuted. The minutes are in character.`, `Quill to Plimsoll: 'Your marks are cold.' Plimsoll to Quill: 'My marks are accurate.' Neither of them has asked Finch.`, `The Stapler has been asked to take minutes. The Stapler is a union representative and has declined, citing breaks.`, `Plimsoll and Quill are not speaking. Finch is not speaking either, but that is his baseline.` ], score: [ `Panel total: %total% of 30. The remaining %rest% is on back order from a supplier who is also Finch.`, `Panel total: %total% of 30 (30 not available at this time). The scale was built that way on purpose.`, `The scoreboard has been updated. The scoreboard did not ask to be updated.`, `Thirty is reserved. We cannot tell you for whom.`, `Panel total: %total% of 30. The panel would like to point out that 26.5 is a very good number and also the ceiling.`, `Panel total: %total% of 30. A number has been produced. Nobody has asked what it is for.`, `Panel total: %total% of 30. Management is rounding it up out of affection.`, `The scoreboard reads %total% of 30 and would like to be considered a friend.`, `Panel total: %total% of 30. The 30 is on loan from a larger scoreboard in another building, which has been asking after it.` ], streakMs: [ `Streak of %n%. A streak is just a nothing that has been repeated by someone who cares.`, `Streak of %n%. The streak is now old enough to have opinions about the next one.`, `%n% in a row. Management has told the Stapler. The Stapler has told no one, in solidarity.`, `Streak of %n%. The nothing is starting to take it personally, in a respectful way.` ],
    streakBrk: [ `Streak of %n% broken. The streak has been thanked for its service.`, `The streak of %n% has ended. Management would like to say a few words and has said them.`, `Streak of %n% over. It leaves behind a small, dignified silence and a whack.` ], streakBest: [ `Best streak: %n%. This has been filed under 'Persistence' and also under 'Lawn'.`, `Your best streak is %n%. It is framed, in a drawer.`, `Best streak: %n%. The number is safe. We keep it with the other numbers.` ], lawnOpens: [ `The lawn has been opened. Eight more holes were unfolded from the dirt. They were not asked.`, `Nothings may now overlap. Please track two or three at once. Management believes in your peripheral vision.`, `Holes 2 through 9 are now on site. They have all read Hole 1's notes.`, `A streak counter has been installed for Adequate-or-better whacks. It has never counted anything before and is nervous about the 4.` ], beats: [ `The panel has requested a larger table. The table is for the panel's other table. Budgets are being consulted.`, `Management has been told the mole has read none of the emails. Management has sent a fourth.`, `A wide, unplanned calm has settled on the lawn. It arrived at 2:49. Management will not speak about it, so as not to spoil it.`, `Please note that Tuesday is approaching. Tuesday is not here. Tuesday has been scheduled to not be here. We are holding the line.`, `The lawn has been in continuous use for nearly six minutes. It has asked for a plaque and been given a leaf.`, `Hole 5 has filed a request to have its name restored. Its name is 5. It is thinking about changing it to a word.`, `The Retirement Gala is being prepared. A banner has been hung. It says 'CONGRATULATIONS,' and then a space, left open for the mole.` ], threeMin: [ `Three minutes. Gavin would like to say he is fine. Gavin has been told he does not have to say it.`, `Three minutes in. The panel has asked if this is going to be the whole thing. Management said yes, in a voice that lingered.`, `It has been three minutes. The mallet has been named, the lawn has been opened, and nothing has been decided.` ],
    rumorSay: [ `A rumor flag has been planted on Hole %hole%. Whack it at its peak for Rumor Adjacency. Do not whack it at its trough, which is unscheduled.`, `Rumor Adjacency. You whacked near a rumor at the exact nothing. The rumor is flattered and will not be confirming.`, `The rumor on Hole %hole% has expired and been replaced by a correction.`, `A Rumor Board has been pinned up beside the lawn. Moles are now being rumored in writing. HR has no comment. HR is a rumor.`, `Sandra from Compliance: 'Moles are not currently authorized to be rumored after 6 PM.'`, `Sandra from Compliance has ruled that moles may not be rumored 'in a way that implies moles'.`, `The only true rumor of the day: the mole will send a postcard. The worm is now considered credible.` ], rumorCorrection: [ `Correction: the earlier rumor was about a different hole. The different hole has been notified.`, `Correction: the earlier rumor was about Dennis. Dennis (Plant) is not a mole. Dennis (Plant) has asked us to stop.`, `Correction: the earlier rumor was a draft. The draft is back and would like an apology.`, `Correction: the earlier rumor has been replaced by a slightly nicer rumor.`, `Rumor withdrawn. It has been replaced by a rumor with more detail and less evidence.`, `Correction: the earlier rumor was a pigeon's opinion. The pigeon has been spoken to, at a distance.`, `Correction: there was no earlier rumor. The earlier rumor has been informed.`, `Correction: the mole was not near the vending machine. The vending machine was near the mole. Sources disagree on which is worse.`, `Correction: the earlier rumor had a typo. It said 'mole'. It meant 'mold'. The mold has taken it well.`, `Correction: the earlier rumor was started by the board itself, to see if the board would read it. It did.`, `Correction: the earlier rumor has been moved to a drawer, where it will be accurate in a different drawer.` ],
    hole5: [ `Hole 5 is on a break. Back in 5. Hole 5 has not said which 5.`, `Hole 5 has put up a 'Back in 5' sign. It is a very good sign. It is laminated.`, `Hole 5 has opted out of your performance review. Hole 5 is still listening.`, `That hole is on a break. It can see you. It has chosen to look at a wall.`, `Hole 5 has returned from its break in a tiny hat. The hole has questions about the board's direction.`, `Hole 5 has taped a note to its rim asking for a raise. The note is polite and has bullet points.`, `Hole 5 has taken a different break. The sign reads 'Back in 5 (revised: 7½)'.` ], rude: [ `That hole is on a break. The whack has been filed under Rude.`, `Hole 5 is still on a break. The sign now says 'Still'.`, `Hole 5 has moved the sign to eye level, if you were a worm.`, `Hole 5 has asked Sandra for a restraining order. Sandra has approved it, with a clause about holes.`, `Hole 5 would like to remind you that 'Back in 5' is a promise, not a threat. One more whack and it becomes both.` ], appealOpen: [ `The appeals window is open. Click any scorecard to appeal. The fee is 0.2 Meh. The fee is for appealing, not for winning.` ], appealRecv: [ `Your appeal has been received. A committee of one is forming. The committee is late.`, `Appeal fee: 0.2 Meh. Fee for appealing the fee: also 0.2 Meh. Fee for noticing: waived.`, `The appeal has been filed in a drawer marked 'Pending'. The drawer is also pending.` ], appealMix: [ `Appeal denied. Appeal upheld. Appeal denied again, but warmly.`, `Appeal received, rejected, received again, and thanked. The thanking was a clerical error and has been kept.` ], appealDone: [ `Appeal complete. The score has been reviewed with great care and left exactly as it was.`, `The paddle has finished spinning. The paddle is dizzy and would like it noted.`, `Appeal complete. The result is the same score with a stamp on it. The stamp is the whole result.`, `The committee of one has returned. The committee of one has had a very full morning and would like you to know.`, `Appeal concluded. The score was held up to a light and put back.` ], appealFinch: [ `Judge Finch's appeal returns: 7½ (upheld, 7½).`, `Judge Finch's appeal returns after eight seconds of spinning: 7½. The spinning was not a factor in the 7½.` ],
    appealBusy: [ `An appeal is already in progress for this judge. The paddle is deliberating. Please do not rush the paddle.`, `The paddle is still deliberating. Prodding the paddle has been logged as a second, unrelated appeal.`, `The paddle has asked you to stop. It asked politely. It is now asking in the way paddles ask.`, `The Stapler, speaking for the paddles, notes that paddles are entitled to a rest period, and that this is not it.`, `A fourth click on a busy paddle. The paddle has filed an appeal against you. It is going well for the paddle.`, `The paddle has been clicked so many times that it has become, legally, a button. It is a little embarrassed.` ], appealBlank: [ `The paddle is blank. The appeal has been filed against the blank. The blank is considering it.`, `There is no score to appeal yet. Management admires the optimism and has filed it under Pre-Appeals.` ], appealStapler: [ `The Stapler has asked that the paddles be given a day off, rotating, starting last Thursday.`, `The Stapler, on behalf of the staff, notes the paddle is working through its spin. The paddle says it is on a spin. The Stapler can see the paddle.`, `The Stapler has filed a grievance about the paddles. It is stapled to the grievance about the grievances.` ], hushStart: [ `SILENCE IN PROGRESS. Do not whack. Whacking the silence is a Class C Noise.`, `Silence round. The holes will still stir. You will still not whack. This is called leadership.`, `Management is whispering. Management has never whispered before. Management is not good at it.`, `Silence has been called. Management is holding its breath, which is a lot to ask of a narrator.`, `SILENCE IN PROGRESS. Even the lawn has stopped. The lawn is not sure how it did that.` ], hushLeaf: [ `A leaf drifts past during the silence. You did not whack it. The leaf is moved and also late for something.`, `A leaf is crossing the lawn. It is making no sound with great effort.`, `The leaf has stopped at no hole. It was not asked to. Everyone has noticed.` ], hushFail: [ `Class C Noise. Please apologize to the lawn, quietly, in writing.`, `You whacked during Silence. A small committee turned and looked at you. It is still looking.`, `Class C Noise. The silence has been reported. It was the only one there.`, `You whacked during Silence. Several small judges have looked away with enormous dignity.` ],
    hushWin: [ `You did not whack. Judge Quill wept. Judge Finch held up a 7½. It was a very quiet 7½.` ], hushWinB: [ `Serenity points awarded: 4. They are valid for nothing, and nowhere.`, `Silence upheld. The panel has been moved. Judge Finch has been moved by exactly 7½ of an inch.`, `You stood still through the whole silence. Management is considering naming something after it. A bench, probably.`, `Serenity points: 4. They have been added to your serenity, which is a ledger and also a hat.` ], hushEnd: [ `The silence has ended. Please resume noise at your own pace.`, `Silence is over. It will be missed by a small number of holes.` ], ghost: [ `Your past self has arrived to whack. Please do not make eye contact.`, `A ghost mallet is retracing your rhythm. Management finds your rhythm 'brave'.`, `The ghost has noticed you have changed your rhythm. The ghost is not angry. The ghost is on a delay.`, `Your past self is twenty seconds behind and it shows. It is also the better whacker. It has been practicing.`, `A ghost mallet has appeared at Hole %hole%. It is exactly where you were, but older, and with less to say.`, `The ghost whack landed. The lawn flinched at something that had already happened. This is called 'anticipatory flinching'.`, `Management can see you and your past self. Management would like you both to be at your desks.`, `Your ghost has improved. It has also learned your mistakes and elected to repeat them for consistency.` ], duet: [ `Temporal Duet. Your ghost whacked Hole %hole% at the same moment you did. That is a duet. It is also a fine.` ], duetFine: [ `Sandra from Compliance has fined the duet 0.2 Meh. 'Whacking with oneself is permitted. Whacking with oneself in public is a levy.'` ], annex: [ `Hole 10 has been installed without consultation. It says nothing. It is good at it.`, `Holes 11 and 12 have joined Hole 10. A fourth column has been formed. It has no minutes.`, `Hole 7½ has been added. It is half a hole, in the sense that it is also half a hole.`, `Nothings on Hole 7½ now peak at the same instant as a nothing elsewhere. This is a coincidence in the sense that it is scheduled.` ],
    dennisGrow: [ `Dennis (Plant) is growing out of Hole 2. Dennis is not a mole. Dennis is not impressed.`, `Dennis (Plant) has grown again. Dennis (Plant) now has opinions about light.`, `Dennis (Plant) is now taller than the hole. He has opened a small line in the budget titled 'Light'.`, `Dennis (Plant) has outgrown the grid. The grid has requested a transfer.`, `Dennis (Plant) now casts a shadow over Hole 2 and, by extension, over the idea of Hole 2.`, `Dennis (Plant) has reached a height he will not discuss. He has also reached a decision.` ], dennisKnown: [ `Dennis (Plant) recognises you from the lobby. He has chosen to keep it professional and slightly leafy.`, `Dennis (Plant) has recalled the lobby. He is choosing not to bring it up. A leaf has, on his behalf.` ], dennisWhack: [ `Dennis (Plant) has been struck. Dennis (Plant) has photosynthesized it.`, `Dennis (Plant) has gained a leaf. The leaf has been counted. The leaf is thriving.`, `You have whacked a plant. Management is calling this 'a gardening incident' and looking at Tuesday.`, `Dennis (Plant) was whacked. He has logged it under 'Weather' and taken a leaf from the experience.`, `You have whacked Dennis (Plant) again. Dennis (Plant) is still thriving. Dennis (Plant) is thriving at you.` ], toastPop: [ `Something popped up. It is toast. Toast is not nothing. This round is void.`, `The Toaster has popped one slice at Hole 4 and left. It had somewhere to be. You are a spectator.`, `The panel is hushed. Nobody has ever been this quiet about bread.` ], toastWhack: [ `You have whacked toast. This was not a whack. This was breakfast.`, `Toast struck. It is a little flatter and a little more toast.`, `You have whacked the Toaster's slice. The Toaster says nothing, in a way that is clearly toast.` ], toastSpared: [ `Toast left unwhacked. A rare act of restraint, and a small snack for the Toaster.`, `You let the toast sink. It went down warm. Somewhere a toaster is writing a thank-you note, in toast.`, `Toast spared. The slice went down slowly, like it had been told it could.` ], toastSpeak: [ `The Toaster, in toast: 'Toast.' It is the warmest thing anyone has said all day.`, `The Toaster says something in toast. It is brief and it is kind. The slice is warm to the touch.`, `The Toaster, in toast: 'Toast. Toast. Toast.' It is the longest speech it has made, and the most sincere.` ],
    toastKnown: [ `The slice has a small note baked into the crust: 'We have met.' The Toaster is not a talker, but it has a pen.`, `The Toaster pops a second slice, which is blank. It means 'you again'. It means it warmly.` ], draftA: [ `A draft crosses the lawn. It is a leaf. It would like to be left out of this.`, `Something has come in through a window that does not exist. It is a leaf. It is carrying a very small agenda.`, `A leaf is crossing the lawn on a course that suggests it has been briefed.` ], draftHit: [ `You whacked the leaf. That is a foul of 'Something'. Something is not on the agenda.`, `You whacked the leaf again. The leaf has been sent a card.`, `Third foul of Something. Something has lodged a complaint, and an alternate spelling.`, `Another leaf, another foul. Something has been moved to a larger folder.` ], draftEnd: [ `The draft has passed. It was never here. It would like that on file.`, `The leaf has left the lawn unwhacked. It will tell the others. There are no others. It will tell them anyway.`, `The draft is over. The lawn is back to its usual weather, which is none.` ], microSandra: [ `Sandra from Compliance has audited the mallet. Policy 14.2: mallets must be whack-neutral. Yours has leanings.`, `Sandra has clarified: mallets are permitted, whacking is permitted, mallets whacking is under review.`, `Sandra from Compliance notes that Policy 14.2 contradicts Policy 14.3. She has reviewed both and agrees with each.`, `Sandra from Compliance has approved the lawn on condition that it is not used as a lawn.`, `Sandra from Compliance has flagged the mallet's tone. The mallet has been asked to be 'less percussive'.`, `Audit note: whacks must be performed 'with feeling, but not that much'. Sandra has attached a diagram. It is a square.` ], microRain: [ `Rain Delay (Indoors). The umbrellas have been deployed over the holes. There is no rain. The umbrellas are for the holes' dignity.`, `The Rain Delay has ended. The holes would like to thank the umbrellas for their service.`, `The Rain Delay continues. It is still not raining. Management has asked the weather to confirm it is not involved.` ],
    memo: [ `MEMO: Hole 3 is no longer permitted to be adjacent to Hole 6. Reason: it knows.`, `MEMO: The 4:17 meeting has been moved to 4:17. All attendees have been moved with it.`, `MEMO: Please refrain from naming the nothing. It has been named. It does not respond to it.`, `MEMO: The break room will be closed for cleaning. The break room is a hole. It has been vacated by a worm.`, `MEMO: The lawn will be reviewed at the next review of the lawn.`, `MEMO from Sandra: 'Nothing may be described as nothing in writing. Please use 'the absence'.' She has used 'nothing' in writing four times.` ], stapler: [ `The Stapler, on behalf of the staff, notes the mallet is working through its break. The mallet says it is on a break. The Stapler can see the mallet.`, `The Stapler asks that the hole be called 'the hole' and not 'the nothing'. It says words matter, and also holes.`, `The Stapler has presented a demand: every judge must be given a chair that is not the same chair.` ], gavin: [ `The mallet has been named Gavin. Gavin has accepted the name without comment.`, `Gavin, the mallet: 'I would like to say a few words. I have been swung %n% times this session and asked nothing.'`, `Gavin: 'I do not want a hat. I would like it on record that I have never wanted a hat.'`, `Gavin: 'The hat is fine. I would like to thank whoever asked. Nobody asked. It is fine.'`, `Gavin has been added to the org chart, below the mallet and above the lawn. It is the first time anyone has asked where he sits.` ], guestChair: [ `Substitute Judge: A Folding Chair. The chair scores 5.0. The chair is unmoved.`, `The Folding Chair has been asked for notes. The Folding Chair has the same notes as last time, folded.`, `Substitute Judge: the Folding Chair. It scores 5.0 on any day, including the day it is unfolded.` ], guestGerald: [ `Guest Judge Gerald has arrived. Gerald scores by observation. 'I score you the color of Thursday.' He left without leaving a number.`, `Guest Judge Gerald is seated. He considers the whack for some time. 'It was round,' he says. 'In the way of things.' His paddle shows a ~.`, `Gerald has judged the whack by weight, which he has decided is 'about a Tuesday'. His paddle shows a wave. The wave is a score.` ], geraldKnown: [ `Ah. The one from the spuds.`, `Gerald, again. The room straightens, in a way it does not for anyone else.` ],
    geraldNew: [ `Gerald introduces himself as a stranger of gravitas. He has set a flag. It is a very small flag.` ], geraldBench: [ `Gerald (Potato) has appeared on the bench beside Hole 7½. 'The half is the whole, slightly wrongly.'` ], idle40: [ `The nothing is still on. You are not whacking it. Management respects the discipline and is also a little worried.`, `Hole 1 has noticed you have stopped. It is trying not to make it weird.` ], idle60: [ `Nothing is still happening. Management is pleased with your consistency in watching it.`, `Sixty seconds. Management has begun to call this 'the quiet phase of the whack'.` ], idle75: [ `Judge Quill has asked if the whack has been postponed. The whack has not been postponed. The whack is in the building and has declined to take its coat off.`, `Management has checked the lawn for a pulse. The lawn has one. It is yours, at a distance.` ], idle90: [ `The holes have begun to talk among themselves. It is mostly about weather.`, `The holes are talking. They have agreed not to discuss you. This is how you can tell they are.` ], idle105: [ `The holes have moved on from weather. They are now discussing you, kindly, in the third person.`, `Hole 4 has started a book club. The book is the lawn. Nobody has finished it.` ], idle120: [ `Nothing has started appearing on its own. You are not required for this. You never were.` ], idleAuto: [ `The panel has scored the nothing automatically. Judge Finch held up a 7½. He did not need to be asked.`, `The panel has scored an unattended nothing. They gave it a 7½ and a firm handshake, which it cannot return.`, `Nothing has been whacked by nobody. The panel scored it fairly, in the sense that it scored it.`, `The lawn is being judged without a whacker. The judges say it feels like the old days, which were last Tuesday.` ], idle135: [ `Nothing continues to occur without you. Management has prepared a slide deck about it. The deck is a hole.`, `The nothing has been whacked fourteen times in your absence. It is doing better than you were. It does not mention it.` ], idleEyes: [ `A hole has opened its eyes very slightly. They blinked once. Did you see that? Neither did I. We are choosing not to log it.` ], idle165: [ `The eyes are back, in a different hole. They have acquired a lanyard. Nobody has asked to see the lanyard.` ], idle180: [ `%player%, you have not whacked in 180 seconds. This is the best whack we have ever seen.` ],
    idle240: [ `The panel has fallen asleep. Judge Finch is asleep with a 7½ held up. It is the most consistent sleep on record.` ], idle300: [ `Five minutes. Management has stopped checking the lawn and started checking on you. You are fine. It is the lawn that is not.` ], idle420: [ `The holes have held an election. Hole 5 abstained, citing its break. The Folding Chair won, unopposed, from the corner.` ], idleOOO: [ `Out of Office from B. (Mole): 'I am out of the office until further notice. Nothing is urgent. I was never in.'` ], idle900: [ `Auto-reply update from B. (Mole): 'Still out. Nothing is urgent. I have begun to enjoy it. Please do not tell the worm.'` ], idleEnd: [ `We have noticed you. The nothing has not.`, `You have returned. The holes were told you were away on business. They are choosing to believe it.`, `While you were away, the nothing continued. It is going very well without you. It would like that kept private.` ], idleBack: [ `Welcome back. Nothing happened. We took notes.`, `You are back. Management did not worry. Management has a spreadsheet of how little it worried.`, `Welcome back. The holes asked where you were. We said 'whacking', which seemed the safest word.` ], holeChat: [ `Hole 1: Rain at 4:17, they said. It is 4:17. I am staying in.`, `Hole 3: It is always raining somewhere.`, `Hole 6: Not in me. I would know. I am where it would land.`, `Hole 2: I heard Thursday is cancelled. I heard it from a Thursday.`, `Hole 8: Humid in here. I have been told this is my fault.`, `Hole 4: Dennis says it is the light.`, `Hole 9: I do not have a view. I have a position.`, `Hole 7: Hole 7½ keeps talking over me. I cannot hear it. I assume it is half as loud.`, `Hole 1: I have been here the whole time. Not that anyone is counting. 4:17 is.`, `Hole 1: Nobody say 'whack'. It is a lovely evening and I would like it to stay that way.`, `Hole 1: I am not nervous. I would like that on the record. I would like the record to be a bit warmer.`, `Hole 5: I am on a break. I am also, technically, available.`, `Hole 3: Does anyone else feel a bit half?`, `Hole 2: Dennis is leaning on me. It is going well.`, `Hole 6: I used to be a bunker. Now I am a venue.`, `Hole 9: The mole is just a rumor with a hat.`, `Hole 8: We should do something. I am not saying what. I am saying we should.` ],
    spam: [ `Whack Fatigue detected. The mallet has requested a break and a small chair.`, `Excess Whack Levy: 0.1 Meh. This is a whack tax. It is also, technically, a nothing tax.`, `The judges have left for a break. Their paddles are face down. Judge Finch stayed behind holding a 7½ in each hand.`, `ON BREAK. Whacks are currently producing only a tired sigh.`, `The judges are back with biscuits. They will score the entire spam as a single piece called 'Study in Urgency'.`, `'Study in Urgency': Plimsoll 6.5, Quill 8, Finch 7½. The biscuits were also scored. The biscuits received a 9.`, `The mallet is on a statutory break. Management has asked it to please remain a mallet.` ], spamWarn: [ `Whack velocity advisory: that is a lot of whacks. The lawn has started counting and is losing track.`, `Management would like to gently suggest that the nothing is not going anywhere. Please pace the nothing.`, `You are whacking at a rate the panel describes as 'concerning, in a lovely way'.`, `The mallet has gone warm. It has asked for water and, I regret to say, a form.` ], spamSarc: [ `The judges applaud slowly and sarcastically. It is the second time. They have a method.`, `A second break so soon. The judges clap, one at a time, with the confidence of people who were not asked.` ], spamMany: [ `A third break. The judges no longer leave. They put their coats on and look at the clock, which is wrong with confidence.`, `The holes have unionized. The Stapler is representing. The first demand is that you stop.`, `Fatigue again. The mallet has been given a tiny chair and asked to think about what it has done.`, `You have used up the break room. The break room has been moved to a smaller break room.` ], fatWhack: [ `The mallet is on break. Your whack has been received and placed in a tray marked Later.`, `The mallet is eating a small sandwich on its statutory break. Please do not hit the sandwich.`, `The mallet does not respond to whacks while on a break. It wrote that policy itself.`, `Please wait. The judges are fetching biscuits. This is not a delay. This is a procedure.` ],
    unobserved: [ `Did anyone see that? Per policy, it did not happen. Please do it again.`, `The judges blinked. All of them. At the same time. This has been entered as 'Unobserved' and then removed from the record.`, `The paddles read '?'. This is the official grade for a whack nobody witnessed.`, `Management has not seen that whack and would like to congratulate you on it privately.`, `The whack has been struck from the record by three people who did not see it, which is the most reliable kind.`, `A whack has taken place in a blink. The blink is under review. The whack is now a rumor.` ], zwhack: [ `You have signed the lawn. This will be taken into account at the next review of nothing.`, `The scorch marks are in the shape of a Z. The lawn has asked what it stands for.`, `The Z has been inspected. It is a good Z. It leans slightly, like a person trying to hear.`, `The lawn now bears a Z. Nobody knows what for. Management has chosen 'Zeal'.` ], eyes: [ `Something looked out of the hole. It said 'Oh,' and went back down. Management has no record of that.`, `Management has been asked about the eyes. Management would like to talk about Tuesday.`, `The eyes have been logged as 'weather'.`, `The eyes blinked at you. They have been entered as 'a trick of the light', and the light has been asked to stop.` ], sockPop: [ `Something has come up out of Hole %hole%. It is not a mole. It is a sock. The sock is on a journey and has stopped to ask directions.`, `It is the sock. The same sock. It has been through a lot since the last time and has learned to hide it.` ], sockWhack: [ `You have whacked the Missing Sock. The sock was not missing. It was, technically, en route. Several people have been informed.`, `The sock has been struck. It says, 'Not lost. Pending.' It says it with its whole toe.` ], sockSpared: [ `The sock sank back into the hole without incident. It nodded once, in the way socks do. Its journey continues.`, `The sock has left a note on the rim: 'Not lost. Pending.' Management has pinned it next to the sign for Hole 5.` ],
    coin: [ `The panel could not agree on a grade and has tossed a coin. The coin landed on its edge. That is a 7½.`, `Judges Plimsoll and Quill have settled the score by coin. Judge Finch declined to take part and held up a 7½, as a coin.`, `The score is being decided by coin. The coin has been asked for a statement. It says 'heads', and also 'the other one'.`, `A coin has been tossed to decide the whack. The coin is still in the air. We will all be told in due course.` ], postcardLand: [ `A postcard has landed on the lawn. It has a stamp from a place with a lawn.`, `Hold the postcard to catch it. Whacking it is permitted, and will be noted in the follow-up.`, `A postcard has fluttered in, addressed to 'Whoever Is Holding the Mallet'. That is a job title now.` ], postcardCaught: [ `Postcard caught undamaged. It has been pinned to the wall with a thumbtack. The thumbtack is a rumor.` ], postcardDamaged: [ `Postcard damaged. The mole has sent a second postcard about the first postcard.` ], postcardRead: [ `Management has read the postcard 41 times. The postcard has not changed. Management has changed.` ], postcardFull: [ `The postcard wall is full. The oldest postcard has been moved to a drawer, which has been informed.` ], postcardCourier: [ `The postcard has been delivered by courier. Nobody read it. The courier did.` ], sched: [ `It is 12:00:03. The first Nothing was scheduled for exactly now. Please do not whack. Please do not breathe on it.`, `The lawn clock has stopped to watch. Everyone is standing. Judge Finch has put down his 7½, which has not happened before.`, `The first Nothing is rising. It is huge. It has been rising for ten minutes and has only now been seen.`, `You have whacked the first Nothing. It was on time. It was the only one that ever was. This will be known as 'the Appointment'.`, `The first Nothing has sunk on schedule. It was punctual in every respect. Management has needed a moment, and then another.`, `The appointment has been rescheduled for 12:00:03. It is not clear to which day.`, `It is 12:00:04. The second Nothing is provisionally pencilled in. Management will not say for when.` ],
    clockL: [ `The clock has been consulted. It says 4:17 PM. It says it with confidence.`, `You have checked the clock again. It still reads 4:17 PM. It has not been updated because it has not been wrong.`, `Third check. The clock has begun to feel observed, and is therefore a little more 4:17.`, `The clock has been checked four times. It has stopped being a clock and become a position.`, `Fifth check. The clock asks that you take your time. It says it has all of it, and it is 4:17.`, `Six checks. The clock is now 4:17 PM and one-sixth. It was not consulted about this either.`, `The clock has been proven correct seven times. It would like the record to show it was never in doubt. A certificate will follow, from Finch.` ], clockSpam: [ `The clock is verified. It has stopped answering. It is leaning back.`, `The clock has been checked again. It has asked for a window and been given a smaller clock.`, `Still 4:17 PM. The clock will be here when you are done, which it is quietly sure you will not be.` ],
    gala: [ `The mole's final postcard announces retirement. Management is visibly shaken and has put on a tie.`, `Retirement Gala. The holes are now tables. The tables are round. The party is going very well.`, `The banner says Barry. The B. on every postcard was Barry. He has not arrived, and the party is going very well without him.`, `Table 5 is hosted by Hole 5, waiting since 2:30. Dennis (Plant) is best man. He has prepared no speech. It will be a good one.`, `Hole 1 has asked to say a few words. It has prepared nothing. It is delivered flawlessly.`, `The mole is not present. You are. The judges stand and applaud you instead, because someone should be applauded and he sent regrets.`, `Gerald (Potato) is giving the toast. The toast is a slice. The Toaster is not allowed to see it.`, `Certificate: Outstanding Contribution to Not-Appearing. Signed: Finch (7½) and Sandra (unseen).`, `Gavin has been given the evening off. Gavin has spent it standing exactly where he was.`, `The cake is a hole. It is served in slices of nothing. There is enough for everyone and a second sitting of no one.`, `A figure has been seen near the door. It is a coat on a hook. Hope has been recalibrated.`, `Congratulations: Whack-A-Nothing is complete. Whack-A-Nothing (Continued) will begin shortly.`, `You have whacked a table. The table accepts. It has been told it is a hole in a hat.` ], galaToast: [ `Every paddle is a 7½. The judges are wearing party hats. Judge Finch's party hat also reads 7½.`, `The Stapler has delivered a short statement on behalf of the staff. The staff is the Stapler.` ], galaTable: [ `A table has been struck. Nobody is bothered. They think it is a toast.`, `The centrepiece has taken a whack and is still centred.`, `Table 5 would like it noted that it is not a whackable table. It is a hole on a break at a party. Please do not make it a metaphor.`, `You have whacked a table. The tablecloth has forgiven you. The tablecloth forgives everyone, and is the reason for the stain.` ], reset: [ `Per my previous message, nothing happened. Please resume nothing.`, `Postcards received: 1 (of a total unavailable).`, `The rank has been rebalanced to 12 percent. The percentage was not consulted.`, `The mole has sent the next postcard from a new, more specific location. Nobody has asked where.` ],
    loopIntro: [ `Welcome back to Whack-A-Nothing (Continued). Loop %loop%. The nothing has been refreshed.`, `Whack-A-Nothing (Continued). The mole is still scheduled. The mole has not read the schedule.`, `Round %loop% of the continuing nothing. The holes have been told you are returning. They have not been told why.`, `Good to see you again. The nothing kept your seat warm, and also cold, for balance.`, `The hole is ready. The hole has been ready the whole time. The hole has some notes for the mole.`, `Loop %loop%. The nothing has been rested, fed and asked to return in a better mood.`, `Whack-A-Nothing (Continued), part %loop%. The recap: nothing happened. It was well attended.` ], esc: [ `Escape detected. Management is not sure what you are escaping. The holes are not holding you.`, `Escape has been pressed. The nothing was not aware that it was a hostage situation.`, `Escape was pressed. The Escape key has been thanked. It has not been asked to do anything else.`, `Esc pressed. Management has pretended to hear a door.` ], resize: [ `The venue has been resized. The nothing is still full size.`, `The holes have been rearranged without consultation. Hole 7 has been moved next to a window.`, `The lawn has changed shape. It would like it known that it was the same shape on the inside.`, `Reflow detected. The holes have reflowed. Hole 3 is a little upset about where it ended up, but it will not say next to what.` ], rankLines: [ `Rank rebalancing in progress. Your rank is unchanged. Your percentage is not.`, `99.9 percent. Rank rebalancing. The percentage is a privilege, not a right.`, `Rank rebalanced. You are now %rank%. The ladder is the ladder.`, `Promotion recorded: %rank%. It was not announced. The announcer is Finch, and he held up a 7½.` ], welcomeBack: [ `Welcome back. The holes remember %n% whacks and have chosen not to mention it.`, `The postcard wall is still up. The mole has not corrected it. The mole has not been asked.`, `Hole 1 would like it noted that you left and came back. Hole 1 did not move. Hole 1 never does.`, `Welcome back. Gavin has been in the same place since you left. He would like you to know he did not mind.` ], gerald: [ `Gerald (Potato) has sent word that the lawn is 'technically adjacent to a field'. He says it with the confidence of a vegetable.` ],
    lanyard: [ `Management notes the mallet is wearing a Compliance-approved lanyard. It has never looked more employed.` ]
  };
  const DEF = { err: '0', hole: '1', total: '0.0', rest: '30.0', n: '1', loop: '1', region: 'Somewhere Lower', rank: 'Apprentice of Nothing', grade: 'Adequate' };
  const GALA_BANNER = 'CONGRATULATIONS, BARRY (NOT PRESENT)';
  const RUNN = { perfect: 'Perfected', textbook: 'Textbook', adequate: 'Adequate', early: 'Premature', late: 'Belated' };
  const BEAT_T = [75, 125, 170, 250, 345, 410, 465];
  const IDLE_X = [[40, 'idle40'], [75, 'idle75'], [105, 'idle105'], [135, 'idle135'], [165, 'idle165'], [240, 'idle240'], [300, 'idle300'], [420, 'idle420'], [900, 'idle900']];
  const RANKS = ['Apprentice of Nothing', 'Associate Under-Whacker', 'Senior Under-Whacker', 'Principal Whacker (Acting)', 'Director of Air Strikes', 'Grand Emeritus Under-Whacker'];
  const JD = [
    { n: 'Plimsoll', f: '🧐', r: 'Technical Merit' }, { n: 'Quill', f: '🎩', r: 'Artistic Impression of Nothing' },
    { n: 'Finch', f: '🧓', r: 'Consistency' }
  ];
  const HIDS = [1, 2, 3, 4, 5, 6, 7, 7.5, 8, 9, 10, 11, 12];
  const KEYS = { KeyQ: 1, KeyW: 2, KeyE: 3, KeyA: 4, KeyS: 5, KeyD: 6, KeyZ: 7, KeyX: 8, KeyC: 9, Numpad7: 1, Numpad8: 2, Numpad9: 3, Numpad4: 4, Numpad5: 5, Numpad6: 6, Numpad1: 7, Numpad2: 8, Numpad3: 9, KeyV: 7.5, KeyR: 10, KeyT: 11, KeyY: 12 };
  const STG = [0, 45, 60, 105, 150, 210, 270, 330, 390, 480];
  const MOLE = 'M50 6 C68 6 78 20 79 38 C79 48 83 54 89 62 C95 72 88 80 79 77 C77 90 68 97 50 97 C32 97 23 90 21 77 C12 80 5 72 11 62 C17 54 21 48 21 38 C22 20 32 6 50 6 Z M43 40 L50 49 L57 40';
  const RUM = [
    { t: 'Mole sighted at Hole 3, Tuesday-ish.', s: 'a worm with a lanyard', h: 3 }, { t: 'Mole seen near the vending machine, in a hat.', s: 'a pigeon on a cable' },
    { t: `Mole is 'between jobs'. Mole is also 'doing very well'.`, s: 'a sock in transit' }, { t: `Mole sighted at Hole 6. Mole 'wants to be left alone, but also called twice'.`, s: 'a pebble who was there', h: 6 },
    { t: 'Mole sighted at Hole 2. Tall, thriving, not a mole.', s: 'Dennis (Plant)', h: 2, c: 'very high; a plant would know' }, { t: 'A mole was spotted. It was a glove.', s: 'the glove, who has asked not to be involved' },
    { t: 'Mole has taken up knitting. First project: a scarf for a hole.', s: 'a dust mote with a clipboard' }, { t: `Mole enrolled in 'Appearing: A Beginner's Guide'. Has withdrawn twice.`, s: 'a leaf, somewhat blown' },
    { t: 'Mole has retained a lawyer. The lawyer is also a mole.', s: 'the third ficus' }, { t: 'Mole is on sabbatical until a Wednesday that has not been scheduled.', s: 'the previous mallet' },
    { t: 'Mole seen near the elevator, which is also a rumor.', s: 'a person who was told about it by the elevator' },
    { t: 'Mole has applied for a role in Facilities. Mole has no experience. Mole has no feet.', s: 'a lanyard, lying on its own' }, { t: `Mole said to be 'at a thing'. The thing is a Tuesday.`, s: 'a calendar, anonymously' },
    { t: 'Mole is the one who has been taking the good pens.', s: 'the Stapler, on behalf of the union', c: 'low; the union has a position' }
  ];
  const RUM_TOASTER = { t: 'The toaster has been seen near a lawn.', s: 'a crumb' };
  const RUM_TRUE = { t: 'The mole will send a postcard.', s: 'the worm with a lanyard (now credible)', c: 'high' };
  const RUM_TOAST = { t: 'Moles do not like toast.', s: 'unnamed', c: 'not applicable' };
  const PCS = {
    l1a: { e: '🐛', t: `Dear Valued Employee, weather lovely. Sank three feet today. Yours in absence, B. (Mole). P.S. Do not wait up.` }, l1b: { e: '🌱', t: `Wish you were here. Actually, I wish I were there. It is complicated. There is a lawn. B. P.S. I did not wait up either. P.P.S. cc: A Worm (Credible).` },
    l1bd: { e: '🩹', t: `The crease is noted. The crease is fine. The crease has character. I am still in the hole, but with views. B. P.S. Please stop. P.P.S. The crease asks to be called Doris. P.P.P.S. cc: A Worm (Credible).` }, final: { e: '🏡', t: `To whom it may concern: I am retiring from not-appearing. I am relocating to a hole in the countryside. It is the same, but with a view. B. P.S. Do not wait up. P.P.S. Please tell the judges I enjoyed their work, especially the seven and a half. P.P.P.S. The new hole has a fridge.` },
    r1: { e: '🌙', t: `Greetings from the Basement of the Moon. It is lower than it sounds. B. P.S. I am still not appearing. P.P.S. The moon has a hole. It is not mine.` }, r2: { e: '🌿', t: `Greetings from a Different Lawn. The grass is the same, but mowed by someone who believes in me. B. P.S. Hole 7½ sends regards. P.P.S. The regards are half.` },
    r3: { e: '🛋️', t: `Greetings from the Gap Between Two Couches. It is cozy. I have found four coins and a philosophy. B. P.S. The philosophy is mostly about down. P.P.S. The coins are for the judges.` }, r4: { e: '🥄', t: `Greetings from the Back of a Drawer. I share it with a spoon who has strong views on Tuesday. B. P.S. The spoon is credible. P.P.S. The worm is jealous.` },
    r5: { e: '🧥', t: `Greetings from the pocket of a coat last worn in 1994. There is a ticket stub. I think it is for me. B. P.S. It is for a different mole. P.P.S. I am happy for them.` }, r6: { e: '🌴', t: `Greetings from Underneath the Third Ficus. Dennis waved. It was a leaf. B. P.S. Dennis (Plant) is a great listener, for a plant. P.P.S. Dennis does not know I am here. This is going well.` },
    r7: { e: '🕟', t: `Greetings from the Gap Between 4:17 and 4:18. There is a lot of room. Nobody has ever been late here. B. P.S. I was here at 4:17 and a half. P.P.S. So were you, I think. I was not looking.` }, r8: { e: '½', t: `Greetings from the other side of Hole 7½. It is the same, but half. B. P.S. This is the last postcard I will send from a hole. P.P.S. There will be another postcard from a hole.` }
  };
  const pcBase = (id) => String(id).split('#')[0];
  const pcOf = (id) => PCS[pcBase(id)] || PCS.l1a;
  const pcText = (id) => (String(id).indexOf('#') > 0 ? 'Postcard (Resent). ' : '') + pcOf(id).t;
  const pcEmoji = (id) => (String(id).indexOf('#') > 0 ? '📮' : pcOf(id).e);
  const pcRegion = (id) => { const m = /^Greetings from ([^.]*)\./.exec(pcOf(id).t); return m ? m[1] : DEF.region; };
  P.registerModule({
    id: 'whack-a-nothing',
    title: 'Whack-A-Nothing',
    tagline: 'Whack at the exact moment nothing peaks. A panel of three will grade you out of a total you cannot reach.',
    icon: '🔨',
    category: 'game',
    unlockCost: 0,
    tags: ['timing', 'judged', 'whack'],
    mount(root, api) {
      const el = api.el;
      const SEL = !!api.selftest;
      const TS = SEL ? 10 : 1;
      const IS = SEL ? 30 : 1;
      let dead = false;
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      const num = (v, d) => (typeof v === 'number' && isFinite(v) ? v : d);
      const st = (name, n) => api.stat.inc(S + name, n || 1);
      const reduced = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches || !!root.closest('.pm-reduce-motion'); } catch (e) { return false; } };
      const hn = (id) => (id === 7.5 ? '7½' : String(id));
      const c = (n) => K + n;
      const raw = api.save.get('s', null);
      const rs = raw && typeof raw === 'object' ? raw : {};
      const cap = (v, d) => Math.min(1e9, Math.max(0, Math.floor(num(v, d))));
      const sv = {
        rank: clamp(Math.floor(num(rs.rank, 0)), 0, 5), rankPts: clamp(num(rs.rankPts, 0), 0, 1e6), rankLoops: cap(rs.rankLoops, 0),
        postcards: Array.isArray(rs.postcards) ? rs.postcards.filter((x) => typeof x === 'string' && PCS[pcBase(x)]).slice(-12) : [],
        whacks: cap(rs.whacks, 0), bestStreak: cap(rs.bestStreak, 0), loop: Math.max(1, cap(rs.loop, 1)),
        appeals: cap(rs.appeals, 0), deductions: cap(rs.deductions, 0), gavin: !!rs.gavin,
        seven: cap(rs.seven, 0), bench: !!rs.bench, visits: cap(rs.visits, 0), regions: cap(rs.regions, 0)
      };
      let saveT = 0;
      function dirty() {
        if (saveT || dead) return;
        saveT = api.setTimeout(function () { saveT = 0; if (!dead) api.save.set('s', sv); }, 2000);
      }
      let loop = sv.loop;
      let T = 0, stage = 0, forced1 = false, mode = 'play', F = {};
      let lastInput = api.now(), lastTick = api.now(), lastMovX = -999, lastMovY = -999;
      let nextSpawn = api.now() + (SEL ? 500 : 3000), toastDue = false, holeBag = [], lastSpawn = 0;
      let streak = 0, holeHist = [], zLog = [], lastPlayer = null, lastGhost = null, ghostPending = 0;
      let roundToken = 0, ghostEpoch = 0, appealEpoch = 0, modeEpoch = 0, galaTok = 0;
      let blinkUntil = 0, rainUntil = 0, hushDueT = 0, hushViolated = false, hushLeafSeen = false;
      let microAt = 0, nextPlant = 0, nextChat = 0, lastEsc = -99999, lastSay = 0, logN = 0, lastResizeSay = -99999;
      let spamT = [], fatigueCool = 0, lastFatigueEnd = -99999, lastUnsched = -99999, lastTable = -99999;
      let totals = [], finchN = 0, judgeTick = 0, guestNext = 0, guestAt = 0, guestOn = false, pendingFirst = null;
      let downAt = 0, upAt = -99999, pfT = 0, pcDownAt = 0, rebal = false, readerOpen = false, reader = null, pc = null, wall = sv.postcards.slice();
      let leafCount = 0, sponsorIdx = 0, narrow = null, sayQ = [], sayQT = 0, lastStreakSay = 0, dennisK = 0, ghostOn = false, IF = {}, rumorIdx = 0;
      let rumors = [], toastRumorUntil = 0, mallX = 0, mallY = 0, mallSwing = false, mallVx = 0, galaCert = false, zSigned = false, touchMode = false;
      const PN = String((api.player && api.player.name) || 'Valued Employee').slice(0, 24);
      let sessW = 0, runKey = '', runN = 0, unCh = 0, fatN = 0, busyN = 0, rudeN = 0, foulN = 0, clockN = 0, sched = 0, threeDone = false, warned = -99999;
      const t0 = api.now();
      const chainSeen = [0, 0, 0, 0, 0, 0];
      const bags = {};
      let revealTs = [];
      const apTok = [0, 0, 0];
      let leafT = 0, hiddenAt = 0, lastLoopAt = -99999, apptHint = false, idleEyes = { h: 0, until: 0 };
      const apBusy = [false, false, false], padTxt = ['', '', ''], curFace = [JD[0].f, JD[1].f, JD[2].f];
      const holes = {};
      const stamps = [];
      const thr = (x) => x * (loop >= 2 ? 0.5 : 1);
      function bag(arr) {
        let b = [], last;
        return function () {
          if (!b.length) { b = api.shuffle(arr); if (b.length > 1 && b[b.length - 1] === last) b.unshift(b.pop()); }
          last = b.pop();
          return last;
        };
      }
      function pickLine(cat) { const b = bags[cat] || (bags[cat] = bag(LINES[cat] || [''])); return b(); }
      function fill(s, v) {
        v = Object.assign({ player: PN }, v || {});
        return String(s).replace(/%(\w+)%/g, function (m, k) {
          const x = v[k];
          return x === undefined || x === null || (typeof x === 'number' && !isFinite(x)) ? (DEF[k] || '') : String(x);
        }).replace(/\bundefined\b|\bNaN\b|\bnull\b/g, 'nothing');
      }
      function emit(text, o) {
        lastSay = api.now();
        api.say(text, { mood: o.mood || 'neutral', who: o.who || 'Management', priority: o.pr === 2 ? 2 : o.pr === 1 ? 1 : 0 });
        narr.textContent = text;
        logN++;
        logList.appendChild(el('li', { text: 'Report ' + logN + ', filed 4:17 PM: ' + text }));
        while (logList.children.length > 12) logList.removeChild(logList.firstChild);
      }
      function say(text, o) {
        o = o || {};
        if (dead || !text) return false;
        const now = api.now();
        if (o.pr !== 2 && now - lastSay < 1200) {
          if (o.pr === 1) { if (sayQ.length >= 3) sayQ.shift(); sayQ.push([text, o]); if (!sayQT) sayQT = api.setTimeout(drainQ, 1300); }
          return false;
        }
        emit(text, o);
        return true;
      }
      function drainQ() { sayQT = 0; if (dead) return; const q = sayQ.shift(); if (q) emit(q[0], q[1]); if (sayQ.length) sayQT = api.setTimeout(drainQ, 1300); }
      function sayC(cat, vars, o) { return say(fill(pickLine(cat), vars), o); }
      function sayN(cat, i, vars, o) { return say(fill((LINES[cat] || [''])[i] || '', vars), o); }
      function after(ms, fn) { return api.setTimeout(function () { if (!dead) fn(); }, ms); }
      function later(ms, fn) { const e = modeEpoch; return api.setTimeout(function () { if (!dead && e === modeEpoch) fn(); }, ms); }
      const narr = el('div', { class: c('narr'), 'aria-live': 'off', text: '' });
      const logList = el('ol', {});
      const sponsorEl = el('span', { text: LINES.sponsor[0] });
      const leafCountEl = el('span', { text: '' });
      const benchEl = el('span', { text: '', hidden: true });
      const totEl = el('div', { class: c('tot'), 'aria-live': 'polite', 'aria-atomic': 'true', text: 'Panel total: none yet of 30 (30 not available at this time)' });
      const avgEl = el('div', { class: c('avg'), text: 'Panel average: none yet' });
      const rcirc = el('span', { class: c('rcirc') });
      const rpip = el('span', { class: c('rpip') });
      const rcap = el('div', { class: c('rcap'), text: 'The replay is available once there is something to replay.' });
      const heck = el('div', { class: c('heck'), hidden: true, text: '' });
      const biscuit = el('div', { class: c('biscuit'), hidden: true, text: '🍪 Biscuits: 9' });
      const judges = JD.map(function (j, i) {
        const bust = el('div', { class: c('bust'), 'aria-hidden': 'true', text: j.f });
        const plq = el('div', { class: c('plq') }, 'Judge ' + j.n, el('small', { text: j.r }));
        const back = el('span', { class: c('pb'), text: '' });
        const pad = el('span', { class: c('pad') }, el('span', { class: c('pf'), text: '·' }), back);
        const pst = el('span', { class: c('pst'), text: '' });
        const btn = el('button', { class: c('padl'), type: 'button', disabled: true, 'aria-label': 'Scorecard from Judge ' + j.n + ': blank', onclick: function () { appeal(i); } }, pad);
        const box = el('div', { class: c('jdg') + ' ' + c('j' + i) }, bust, plq, el('div', { style: { position: 'relative' } }, btn, pst));
        return { bust: bust, plq: plq, back: back, btn: btn, pst: pst, box: box };
      });
      const panelEl = el('div', { class: c('panel') }, judges.map((j) => j.box), biscuit, heck);
      const scoreEl = el('div', { class: c('score') }, totEl, avgEl, el('div', { class: c('rbar'), 'aria-hidden': 'true' }, rcirc, rpip), rcap);
      const topEl = el('div', { class: c('top'), hidden: true }, panelEl, scoreEl);
      const sponsEl = el('div', { class: c('spons') }, sponsorEl, leafCountEl, benchEl);
      /* the lawn */
      const gridEl = el('div', { class: c('grid') });
      HIDS.forEach(function (id) {
        const n = hn(id);
        const crumbs = [0, 1, 2].map((i) => el('span', { class: c('crumb'), style: { left: 28 + i * 20 + '%' } }));
        const svg = el('svg', { class: c('nth'), viewBox: '0 0 100 100', preserveAspectRatio: 'xMidYMax meet', 'aria-hidden': 'true' },
          el('path', { d: MOLE }), el('text', { x: 50, y: 66, 'text-anchor': 'middle', 'font-size': 26, class: c('nul'), text: '∅' }));
        const occ = el('span', { class: c('occ'), 'aria-hidden': 'true' });
        const eyes = el('span', { class: c('eyes'), 'aria-hidden': 'true' }, el('i'), el('i'));
        const chat = el('span', { class: c('chat'), 'aria-hidden': 'true' });
        const numEl = el('span', { class: c('hnum'), 'aria-hidden': 'true', text: id === 7.5 ? '7½' : String(id) });
        const btn = el('button', { class: c('hole') + (id === 7.5 ? ' ' + c('h75') : ''), type: 'button', dataset: { hole: String(id) }, 'aria-label': 'Hole ' + n, hidden: id !== 1 },
          el('span', { class: c('pit') }), el('span', { class: c('win') }, svg, occ), eyes, crumbs,
          el('span', { class: c('flag'), 'aria-hidden': 'true', text: '🚩' }), numEl,
          el('span', { class: c('sign'), 'aria-hidden': 'true', text: 'Back in 5' }), el('span', { class: c('hat'), 'aria-hidden': 'true', text: '🎩' }), chat);
        holes[id] = { id: id, n: n, btn: btn, svg: svg, occ: occ, eyes: eyes, chat: chat, numEl: numEl, crumbs: crumbs, vis: id === 1, nothing: null, occT: null, brk: false, rumor: null };
        gridEl.appendChild(btn);
      });
      const mallet = el('span', { class: c('mal'), 'aria-hidden': 'true', text: '🔨' });
      const lanEl = el('span', { class: c('lan'), text: '📛', hidden: true });
      mallet.appendChild(lanEl);
      const dusts = [0, 1, 2, 3].map(() => el('span', { class: c('dust'), 'aria-hidden': 'true' }));
      const ghms = [0, 1, 2].map(() => el('span', { class: c('ghm'), 'aria-hidden': 'true', text: '🔨' }));
      const scorches = [0, 1, 2, 3, 4, 5, 6].map(() => el('span', { class: c('scorch'), 'aria-hidden': 'true' }));
      const leaf = el('button', { class: c('leaf'), type: 'button', 'aria-label': 'A leaf drifting across the lawn', dataset: { nw: '1' }, text: '🍃' });
      const hushb = el('div', { class: c('hushb'), 'aria-hidden': 'true', text: 'SILENCE IN PROGRESS' });
      const gban = el('div', { class: c('gban'), 'aria-hidden': 'true', text: '' });
      const hint = el('div', { class: c('hint'), text: 'Whack the dotted outline when it is tallest. Or whack nothing. That also counts.' });
      const certBtn = el('button', { class: c('btn'), type: 'button', text: 'Dismiss', onclick: function () { certEl.hidden = true; } });
      const certEl = el('div', { class: c('cert'), hidden: true }, el('b', { text: 'Certificate' }), el('span', { text: 'Outstanding Contribution to Not-Appearing' }), el('span', { text: 'Signed: Finch (7½) and Sandra (unseen)' }), certBtn);
      const clockEl = el('button', { class: c('clock'), type: 'button', dataset: { nw: '1' }, text: 'Lawn time 4:17 PM', onclick: function () { clockHit(); } });
      const clockTxt = () => 'Lawn time 4:17 PM' + (clockN >= 7 ? (apptHint && sched === 0 ? ' (Verified; 12:00:03 pending)' : ' (Verified)') : (apptHint && sched === 0 ? ' (12:00:03 pending)' : ''));
      const lawn = el('div', { class: c('lawn') }, clockEl, hint, hushb, gban, gridEl, leaf, certEl, scorches, ghms, dusts, mallet);
      const streakEl = el('div', { class: c('streak'), hidden: true, text: '' });
      const lawnW = el('div', {}, lawn, streakEl, narr);
      /* the side column */
      const notesEl = el('div', {});
      const tickEl = el('div', { class: c('tick'), text: 'The rumor ticker is quiet. It is working on it.' });
      const boardEl = el('div', { class: c('board'), hidden: true }, el('div', { class: c('bt'), text: 'Rumor Board' }), notesEl, tickEl);
      const slots = [];
      for (let i = 0; i < 12; i++) slots.push(el('button', { class: c('slot'), type: 'button', 'aria-label': 'Postcard wall slot ' + (i + 1) + ', empty', onclick: function () { openWall(i); } }));
      const ccEl = el('div', { class: c('wc'), hidden: true, text: 'cc: A Worm (Credible)' });
      const wcEl = el('div', { class: c('wc'), text: '' });
      const wallBox = el('div', { class: c('wallbox'), hidden: true }, el('div', { class: c('bt'), text: 'Postcard Wall' }), el('div', { class: c('wall') }, slots), ccEl, wcEl);
      const sideEl = el('div', { class: c('side'), hidden: true }, boardEl, wallBox);
      const midEl = el('div', { class: c('mid') + ' ' + c('solo') }, lawnW, sideEl);
      /* bottom */
      const rnameEl = el('b', { text: RANKS[0] });
      const rpctEl = el('span', { text: '12.0%' });
      const fillEl = el('div', { class: c('fill') });
      const rstamp = el('span', { class: c('rstamp'), text: 'RANK REBALANCING' });
      const rankEl = el('div', { class: c('rank'), hidden: true }, el('div', { class: c('rname') }, rnameEl, rpctEl), el('div', { class: c('bar'), 'aria-hidden': 'true' }, fillEl, rstamp),
        el('div', { class: c('rfoot'), text: 'Finch not included in the rank algorithm because Finch is the rank algorithm.' }));
      const logEl = el('details', { class: c('log') }, el('summary', { text: 'Lawn Report' }), logList);
      /* postcard reader */
      const rFront = el('div', { class: c('rtext'), style: { textAlign: 'center' } });
      const rSun = el('div', { class: c('sun'), 'aria-hidden': 'true' });
      const rStamp = el('div', { style: { fontSize: '1.4rem' }, 'aria-hidden': 'true', text: '' });
      const rBody = el('div', { class: c('rtext') });
      const flipBtn = el('button', { class: c('btn'), type: 'button', text: 'Flip', onclick: function () { flipReader(); } });
      const doneBtn = el('button', { class: c('btn'), type: 'button', text: 'Done', onclick: function () { closeReader(true); } });
      const readerEl = el('div', { class: c('reader'), hidden: true, role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Postcard' },
        el('div', { class: c('rcard') }, rSun, rStamp, rFront, rBody, el('div', { class: c('btns') }, flipBtn, doneBtn)));
      const app = el('div', { class: c('app') + ' ' + c('one') }, topEl, sponsEl, midEl, rankEl, logEl, readerEl);
      root.appendChild(app);
      function lawnPos(cx, cy) { const r = lawn.getBoundingClientRect(); return { x: cx - r.left - lawn.clientLeft, y: cy - r.top - lawn.clientTop }; }
      function holeCenter(h) { const r = h.btn.getBoundingClientRect(), l = lawn.getBoundingClientRect(); return { x: r.left + r.width / 2 - l.left - lawn.clientLeft, y: r.top + r.height / 2 - l.top - lawn.clientTop }; }
      function clientOf(p) { const l = lawn.getBoundingClientRect(); return { x: l.left + p.x, y: l.top + p.y }; }
      let dustI = 0;
      function dustAt(x, y) { const d = dusts[dustI++ % dusts.length]; d.style.left = x + 'px'; d.style.top = y + 'px'; d.classList.remove(c('on')); void d.offsetWidth; d.classList.add(c('on')); }
      let stampI = 0;
      function stampAt(text, x, y) {
        let s;
        if (stamps.length < 12) { s = el('div', { class: c('stamp'), 'aria-hidden': 'true' }); lawn.appendChild(s); stamps.push(s); }
        else { s = stamps[stampI++ % 12]; }
        const k = (s._k = (s._k || 0) + 1);
        s.textContent = text;
        const w = lawn.clientWidth || 300;
        s.style.left = clamp(x, 60, Math.max(61, w - 60)) + 'px'; s.style.top = Math.max(30, y) + 'px';
        s.style.setProperty('--r', Math.round(api.rand() * 24 - 12) + 'deg');
        s.classList.remove(c('on')); void s.offsetWidth; s.classList.add(c('on'));
        api.clearTimeout(s._h);
        s._h = api.setTimeout(function () { if (s._k === k) s.classList.remove(c('on')); }, 1100);
        api.sfx('stamp');
      }
      function stampHole(text, hid) { const h = holes[hid]; const p = h ? holeCenter(h) : { x: (lawn.clientWidth || 300) / 2, y: 120 }; stampAt(text, p.x, p.y - 14); }
      function setMallet(x, y, vx) {
        mallX = x; mallY = y;
        const tilt = clamp((vx || 0) * 0.4, -25, 25);
        mallet.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px) translate(-30%,-80%) rotate(' + (mode === 'fatigue' ? 60 : mallSwing ? -70 : Math.round(tilt)) + 'deg) scale(' + (mallSwing && mode !== 'fatigue' ? 0.9 : 1) + ')';
      }
      let swingT = 0, swingT2 = 0;
      function swing(x, y, brief) {
        mallSwing = true;
        if (brief) mallet.classList.add(c('on'));
        setMallet(x, y, 0);
        api.clearTimeout(swingT); api.clearTimeout(swingT2);
        swingT = api.setTimeout(function () { mallSwing = false; setMallet(mallX, mallY, 0); if (brief) swingT2 = api.setTimeout(function () { mallet.classList.remove(c('on')); }, 140); }, 140);
      }
      function visList() { return HIDS.filter((id) => holes[id].vis); }
      function applyLayout() {
        const vis = stage >= 7 ? HIDS : stage >= 2 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [1];
        HIDS.forEach(function (id) {
          const h = holes[id], v = vis.indexOf(id) >= 0;
          if (h.vis && !v) { killNothing(h, 'gone'); clearOcc(h); }
          h.vis = v; h.btn.hidden = !v;
        });
        app.classList.toggle(c('one'), stage < 2);
        app.classList.toggle(c('annex'), stage >= 7);
        gridEl.style.setProperty('--cols', stage < 2 ? 1 : stage >= 7 ? 4 : 3);
      }
      function setSponsor() { sponsorEl.textContent = LINES.sponsor[sponsorIdx % LINES.sponsor.length]; }
      function showSide() { const sb = stage >= 3, sw = stage >= 8 || wall.length > 0; boardEl.hidden = !sb; wallBox.hidden = !sw; sideEl.hidden = !(sb || sw); midEl.classList.toggle(c('solo'), sideEl.hidden); }
      function enterStage(s) {
        const now = api.now();
        sponsorIdx = (sponsorIdx + 1) % LINES.sponsor.length; setSponsor();
        if (s === 1) {
          topEl.hidden = false; rankEl.hidden = false; hint.hidden = true;
          sayC('panelArrives', null, { pr: 1, mood: 'smug' });
          if (pendingFirst) { const pf = pendingFirst; pendingFirst = null; pfT = after(1800, function () { pfT = 0; if (mode === 'play') { revealPanel(pf.ent, pf.o); showReplay(pf.err, pf.g); } }); }
        } else if (s === 2) {
          applyLayout(); api.sfx('whoosh'); sayC('lawnOpens', null, { pr: 1, mood: 'proud' }); streakEl.hidden = false; paintStreak();
        } else if (s === 3) {
          showSide(); sayN('rumorSay', 3, null, { pr: 1, mood: 'confused' }); nextPlant = now + (SEL ? 600 : 2500);
        } else if (s === 4) {
          setBreak(true); sayN('hole5', loop >= 2 ? 6 : 0, null, { pr: 1 }); after(2200, function () { sayN('hole5', 1, null, { pr: 1 }); });
          after(5000, function () { sayC('appealOpen', null, { pr: 1 }); });
          judges.forEach(function (j) { j.btn.disabled = false; }); refreshAria();
        } else if (s === 5) {
          hushDueT = T;
        } else if (s === 6) {
          ghostOn = true;
        } else if (s === 7) {
          applyLayout(); sayN('annex', 0, null, { pr: 1 }); after(2300, function () { sayN('annex', 1, null, { pr: 1 }); }); after(4700, function () { sayN('annex', 2, null, { pr: 1 }); }); after(8600, function () { sayN('annex', 3, null, { pr: 1 }); });
          F.dennisOn = true;
        } else if (s === 8) {
          setBreak(false); holes[5].btn.classList.add(c('hashat')); sayN('hole5', 4, null, { pr: 1 });
          showSide();
        } else if (s === 9) {
          startGala();
        }
      }
      function checkStage() {
        let target = 0;
        for (let i = 1; i <= 9; i++) if (T >= thr(STG[i])) target = i;
        if (forced1 && target < 1) target = 1;
        while (stage < target && !F.galaStarted) { stage++; enterStage(stage); }
      }
      function setBreak(on) {
        const h = holes[5];
        h.brk = on; h.btn.classList.toggle(c('brk'), on);
        h.btn.querySelector('.' + c('sign')).textContent = loop >= 2 ? 'Back in 5 (revised: 7½)' : 'Back in 5';
        h.btn.setAttribute('aria-label', on ? 'Hole 5, on a break, back in 5' : 'Hole 5');
        if (on) killNothing(h, 'gone');
      }
      function maxSim() { return stage <= 1 ? 1 : stage <= 4 ? 2 : 3; }
      function activeCount() { let n = 0; HIDS.forEach(function (id) { if (holes[id].nothing && id !== 7.5) n++; }); return n; }
      function nDur() {
        if (stage <= 0 && loop === 1) return 2200 * (SEL ? 0.6 : 1); /* a first-time player gets time to read the outline */
        const f = clamp(T / 420, 0, 1);
        return Math.max(900, loop >= 2 ? 1500 - 600 * f : 1800 - 900 * f) * (SEL ? 0.6 : 1);
      }
      function gapMs() {
        const g = stage <= 1 ? 2200 + api.rand() * 1000 : stage <= 4 ? 900 + api.rand() * 700 : 700 + api.rand() * 600;
        return SEL ? g / 3 : g;
      }
      function pickHole() {
        const ok = (h) => h.vis && h.id !== 7.5 && !h.nothing && !h.occT && !h.brk;
        let cand = HIDS.filter((id) => ok(holes[id]));
        if (!cand.length) return 0;
        if (cand.length > 1) cand = cand.filter((id) => id !== lastSpawn);
        holeBag = holeBag.filter((id) => cand.indexOf(id) >= 0);
        if (!holeBag.length) holeBag = api.shuffle(cand);
        lastSpawn = holeBag.pop();
        return lastSpawn;
      }
      function startNothing(hid, n) { const h = holes[hid]; h.nothing = n; n.ph = 0; setPhase(h, n, 1); }
      function setPhase(h, n, ph) {
        n.ph = ph;
        const b = h.btn, now = api.now();
        if (ph === 1) {
          b.classList.add(c('stir'));
          if (!reduced()) h.crumbs.forEach(function (cr, i) { api.setTimeout(function () { cr.classList.remove(c('on')); void cr.offsetWidth; cr.classList.add(c('on')); }, 60 + i * 110); });
          api.sfx('tick');
        } else if (ph === 2) {
          b.classList.remove(c('stir'));
          h.svg.style.setProperty('--td', Math.round(n.dur * 0.3) + 'ms');
          b.classList.add(c('rise'));
        } else if (ph === 3) {
          b.classList.add(c('peak'));
          api.setTimeout(function () { b.classList.remove(c('peak')); }, 90);
          h.svg.style.setProperty('--td', Math.round(n.dur * 0.35) + 'ms');
          b.classList.remove(c('rise')); b.classList.add(c('sink'));
          if (n.eyes) { h.eyes.classList.add(c('on')); n.eyesUntil = now + 220; }
        }
      }
      function killNothing(h, why) {
        const n = h.nothing;
        if (!n) return;
        h.nothing = null;
        if (n.sched) schedEnd(why === 'hit' ? 'hit' : why === 'end' ? 'end' : 'gone');
        h.svg.style.setProperty('--td', why === 'hit' ? '40ms' : '200ms');
        h.btn.classList.remove(c('stir'), c('rise'), c('sink'), c('peak'));
        h.eyes.classList.remove(c('on'));
        if (why === 'hit' && maxSim() === 1) nextSpawn = Math.min(nextSpawn, api.now() + gapMs());
      }
      function clearNothings() { HIDS.forEach(function (id) { killNothing(holes[id], 'gone'); }); }
      function spawn() {
        const now = api.now();
        const h4 = holes[4];
        if (stage >= 2 && h4.vis && !h4.nothing && !h4.occT && !h4.brk && (toastDue || api.chance(SEL ? 1 / 20 : 1 / 150))) { toastDue = false; spawnToast(); nextSpawn = now + gapMs() + 1500; return; }
        const hid = pickHole();
        if (!hid) { nextSpawn = now + 300; return; }
        if (stage >= 2 && mode === 'play' && api.chance(SEL ? 1 / 25 : 1 / 250)) { spawnSock(hid); nextSpawn = now + gapMs() + 1200; return; }
        const d = nDur();
        const n = { h: hid, start: now, dur: d, peakAt: now + 0.65 * d, ph: 0, eyes: api.chance(SEL ? 1 / 30 : 1 / 150), eyesUntil: 0, autoAt: 0, autoErr: 0 };
        if (mode === 'idleauto') { n.autoErr = (api.chance(0.5) ? -1 : 1) * (60 + api.rand() * 240); n.autoAt = n.peakAt + n.autoErr; }
        startNothing(hid, n);
        const h75 = holes[7.5];
        if (stage >= 7 && h75.vis && !h75.nothing && !h75.occT && api.chance(0.25)) startNothing(7.5, { h: 7.5, start: now, dur: d, peakAt: now + 0.65 * d, ph: 0, eyes: false, eyesUntil: 0, autoAt: 0, autoErr: 0 });
        nextSpawn = now + (maxSim() === 1 ? d + gapMs() : gapMs());
      }
      function nothingsTick(now) {
        HIDS.forEach(function (id) {
          const h = holes[id], n = h.nothing;
          if (n) {
            const p = (now - n.start) / n.dur;
            const ph = p >= 1 ? 4 : p >= 0.65 ? 3 : p >= 0.35 ? 2 : 1;
            if (ph === 4) { killNothing(h, 'end'); return; }
            if (ph > n.ph) setPhase(h, n, ph);
            if (n.eyesUntil && now > n.eyesUntil) { n.eyesUntil = 0; h.eyes.classList.remove(c('on')); }
            if (mode === 'idleauto' && n.autoAt && now >= n.autoAt) { n.autoAt = 0; autoWhack(h, n); }
          }
          if (h.occT && now >= h.occT.end) endOcc(h, false);
        });
      }
      function spawnTick(now) {
        if (now < nextSpawn || readerOpen || now < rainUntil) return;
        if (mode !== 'play' && mode !== 'hush' && mode !== 'idleauto') return;
        if (activeCount() >= maxSim()) { nextSpawn = now + 120; return; }
        spawn();
      }
      function clearOcc(h) {
        if (!h.occT) return; h.occT = null; h.occ.classList.remove(c('on')); h.occ.textContent = '';
        h.btn.setAttribute('aria-label', 'Hole ' + h.n + (h.brk ? ', on a break, back in 5' : ''));
      }
      function endOcc(h, whacked) { const o = h.occT; if (!o) return; clearOcc(h); if (o.type === 'toast') toastOutcome(whacked); else if (o.type === 'sock') sockOutcome(whacked); }
      function spawnSock(hid) {
        const h = holes[hid], now = api.now();
        h.occT = { type: 'sock', end: now + Math.max(3200, nDur() * 1.6) };
        h.occ.textContent = '🧦'; h.occ.style.fontSize = '1.8rem'; h.occ.classList.add(c('on'));
        h.btn.setAttribute('aria-label', 'Hole ' + h.n + ', a sock has come up');
        api.sfx('boing');
        sayN('sockPop', api.flag.get('sockSeen') ? 1 : 0, { hole: h.n }, { pr: 1, mood: 'confused' });
      }
      function sockOutcome(whacked) {
        st('socks'); api.award(1, 'Sock'); api.achieve('whack-a-nothing.sock'); api.flag.set('sockSeen', true); // lint-ignore
        sayC(whacked ? 'sockWhack' : 'sockSpared', null, { pr: 1, mood: whacked ? 'panic' : 'proud' });
      }
      function spawnToast() {
        const h = holes[4], now = api.now();
        h.occT = { type: 'toast', end: now + Math.max(2600, nDur() * 1.4) };
        h.occ.textContent = '🍞'; h.occ.style.fontSize = '2rem'; h.occ.classList.add(c('on'));
        h.btn.setAttribute('aria-label', 'Hole 4, a slice of toast has popped up');
        api.sfx('pop');
        roundToken++; resetPaddles(); totEl.textContent = 'Panel total: hushed, of 30 (30 not available at this time)';
        sayC('toastPop', null, { pr: 1, mood: 'confused' });
        after(1800, function () { if (holes[4].occT) sayN('toastPop', 2, null, { pr: 1 }); });
      }
      function toastOutcome(whacked) {
        st('toast'); api.award(1, 'Toast'); api.achieve('whack-a-nothing.toast');
        sayC(whacked ? 'toastWhack' : 'toastSpared', null, { pr: 1, mood: whacked ? 'confused' : 'proud' });
        after(2400, function () { sayC('toastSpeak', null, { pr: 1, mood: 'proud' }); });
        if (api.flag.get('metToaster') || api.flag.get('toaster.met')) after(5600, function () { sayC('toastKnown', null, { pr: 1, mood: 'proud' }); });
        if (api.chance(0.6)) after(9500, function () { say(fill('There is a fortune baked into the crust. It reads: ' + api.line('fortune')), { pr: 1 }); });
        toastRumorUntil = api.now() + 5000;
        renderBoard();
        after(5100, function () { toastRumorUntil = 0; renderBoard(); });
      }
      function spawnDennis() {
        let h = null;
        if (stage >= 7) { h = holes[2]; if (!h.vis || h.nothing || h.occT) return false; }
        else {
          const c2 = HIDS.filter((id) => holes[id].vis && id !== 7.5 && !holes[id].nothing && !holes[id].occT && !holes[id].brk && id !== 4);
          if (!c2.length) return false;
          h = holes[api.pick(c2)];
        }
        const k = stage >= 7 ? ++dennisK : 0;
        h.occT = { type: 'dennis', end: api.now() + 5000 };
        h.occ.textContent = '🌿'; h.occ.style.fontSize = (2 * (1 + 0.15 * Math.min(k, 7))).toFixed(2) + 'rem';
        h.occ.classList.add(c('on'));
        h.btn.setAttribute('aria-label', 'Hole ' + h.n + ', Dennis (Plant) is present');
        if (k >= 1) sayN('dennisGrow', Math.min(k - 1, 5), null, { pr: 1 });
        if ((k === 0 && !F.dKnown) || k === 3) {
          F.dKnown = 1;
          const kn = !!(api.flag.get('metDennis') || api.flag.get('plantClicked'));
          after(2800, function () { if (kn && k === 0) sayC('dennisKnown', null, { pr: 1 }); else say(fill(api.line('plantStatus')), { pr: 1 }); });
        }
        return true;
      }
      function grade(err, has) {
        const a = Math.abs(err);
        if (!has || a > 450) return { key: 'unsched', label: 'Unscheduled Whack at Pure Nothing', meh: 0.1, plim: 2, cat: 'unscheduled', pts: 0.4, good: 0 };
        const plim = a <= 55 ? 9.5 : a <= 80 ? 9 : a <= 120 ? 8.5 : a <= 180 ? 7.5 : a <= 250 ? 6.5 : a <= 350 ? 5 : 4;
        if (a <= 55) return { key: 'perfect', label: 'Nothing, Perfected', meh: 2, plim: plim, cat: 'gradePerfected', pts: 3, good: 1 };
        if (a <= 120) return { key: 'textbook', label: 'Textbook Nothing', meh: 0.8, plim: plim, cat: 'gradeTextbook', pts: 2, good: 1 };
        if (a <= 250) return { key: 'adequate', label: 'Adequate Nothing', meh: 0.4, plim: plim, cat: 'gradeAdequate', pts: 1.2, good: 1 };
        if (err < 0) return { key: 'early', label: 'Premature Nothing', meh: 0.1, plim: plim, cat: 'gradeEarly', pts: 0.4, good: 0 };
        return { key: 'late', label: 'Belated Nothing', meh: 0.1, plim: plim, cat: 'gradeLate', pts: 0.4, good: 0 };
      }
      const postureBag = (function () { let b = []; return function () { if (!b.length) b = api.shuffle([0, 0, 0, 1]); return b.pop(); }; })();
      function scorePanel(g, hid) {
        let p = g.plim, ded = false;
        if (postureBag() === 1) { p -= 0.5; ded = true; }
        p = clamp(p, 0, 9.5);
        let q = 7, qnote = '';
        const hh = holeHist, l1 = hh[hh.length - 1], l2 = hh[hh.length - 2];
        if (hh.length && l1 !== hid) { q += 1; qnote = 'new'; }
        if (hh.length >= 2 && l1 !== hid && l2 !== hid && l1 !== l2) q += 1;
        if (hh.length >= 2 && l1 === hid && l2 === hid) { q -= 1; qnote = 'life'; } else if (hh.length && l1 === hid) qnote = 'rep';
        q = clamp(q, 0, 9.5);
        holeHist.push(hid); if (holeHist.length > 6) holeHist.shift();
        const ent = [{ v: p, txt: p.toFixed(1) }, { v: q, txt: q.toFixed(1) }, { v: 7.5, txt: '7½' }];
        let guest = '';
        const now = api.now();
        if (T >= thr(180) && now >= guestAt && api.chance(1 / 15)) {
          guest = guestNext === 0 ? 'gerald' : 'chair'; guestNext = 1 - guestNext; guestAt = now + (SEL ? 6000 : 180000);
          ent[1] = guest === 'gerald' ? { v: 7, txt: '~' } : { v: 5, txt: '5.0' };
        }
        return { ent: ent, ded: ded, qnote: qnote, guest: guest };
      }
      function judgeTalk(g, sc, hid) {
        if (sc.ded) {
          sv.deductions++; dirty();
          const d = sv.deductions;
          if (d <= 5) sayN('judgeDeduct', d - 1, null, { pr: 1 }); else sayC('deductLate', null, { pr: 1 });
          return;
        }
        const hv = { hole: hn(hid || 1) };
        if (sc.guest) {
          if (sc.guest === 'gerald') {
            sayC('guestGerald', null, { pr: 1, who: 'Gerald' });
            if (api.flag.get('metGerald')) sayC('geraldKnown', null, { pr: 1 }); else { sayC('geraldNew', null, { pr: 1 }); api.flag.set('metGerald', true); }
          } else sayC('guestChair', null, { pr: 1 });
          return;
        }
        if (g.key === 'perfect') { sayC('finchStare', null, { pr: 1, mood: 'smug' }); return; }
        if (g.key === 'unsched' && api.chance(0.4)) { sayC('finchNoShow', null, { pr: 1 }); return; }
        judgeTick++;
        if (judgeTick % 3 !== 2) return;
        const w = (judgeTick / 3 | 0) % 3;
        if (w === 0) sayC('judgePlimsoll', null, { pr: 1 });
        else if (w === 1) {
          if (sc.qnote === 'new' && api.chance(0.5)) sayC('quillNew', hv, { pr: 1 });
          else if (sc.qnote === 'life') sayC('quillLife', hv, { pr: 1 });
          else if (sc.qnote === 'rep') sayC('quillRep', hv, { pr: 1 });
          else sayC('quillGen', null, { pr: 1 });
        } else finchSay();
      }
      function finchSay() {
        if (finchN < 3) sayN('judgeFinch', finchN++, null, { pr: 1 });
        else sayC('finchRand', null, { pr: 1 });
      }
      function resetPaddles() {
        judges.forEach(function (j, i) {
          j.btn.classList.remove(c('rev'), c('blur'), c('spin')); j.pst.classList.remove(c('on')); j.pst.textContent = '';
          padTxt[i] = ''; apBusy[i] = false; apTok[i]++;
        });
        refreshAria();
      }
      function refreshAria() { judges.forEach(function (j, i) { j.btn.setAttribute('aria-label', 'Scorecard from Judge ' + JD[i].n + ': ' + (padTxt[i] || 'blank') + (stage >= 4 ? '. Press to appeal for 0.2 Meh.' : '')); }); }
      function setJudgeUI(i, face, name) { curFace[i] = face; judges[i].bust.textContent = face; judges[i].plq.firstChild.textContent = name; }
      function setPad(i, e) {
        judges[i].back.textContent = e.txt;
        judges[i].btn.classList.toggle(c('blur'), !!e.blur);
        judges[i].btn.classList.add(c('rev'));
        padTxt[i] = e.txt; refreshAria();
      }
      function revealPanel(ent, o) {
        o = o || {};
        const tok = ++roundToken;
        resetPaddles();
        if (o.guest === 'gerald') setJudgeUI(1, '🥔', 'Gerald (Guest)');
        else if (o.guest === 'chair') setJudgeUI(1, '🪑', 'Folding Chair');
        else if (curFace[1] !== JD[1].f) setJudgeUI(1, JD[1].f, 'Judge Quill');
        revealTs.forEach(function (h) { api.clearTimeout(h); }); revealTs = [];
        ent.forEach(function (e, i) {
          revealTs.push(after(300 * (i + 1) + 100, function () {
            if (tok !== roundToken) return;
            setPad(i, e);
            api.sfx(i === 2 ? 'bell' : 'tick');
            if (i === 2) {
              if (o.unobs) totEl.textContent = 'Panel total: unobserved (30 not available at this time)';
              else if (o.totText) totEl.textContent = o.totText;
              else {
                const total = ent[0].v + ent[1].v + ent[2].v;
                totals.push(total); if (totals.length > 10) totals.shift();
                totEl.textContent = 'Panel total: ' + total.toFixed(1) + ' of 30 (30 not available at this time)';
                const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
                avgEl.textContent = 'Panel average: ' + avg.toFixed(1) + ' of 30';
                if (!o.quiet && api.chance(0.18)) sayC('score', { total: total.toFixed(1), rest: (30 - total).toFixed(1) });
              }
              if (o.biscuit) { biscuit.hidden = false; after(7000, function () { biscuit.hidden = true; }); }
            }
          }));
        });
      }
      function showReplay(err, g) {
        const e = Math.round(Math.abs(err));
        const p = clamp(err / 450, -1, 1);
        rpip.style.left = (50 + p * 44) + '%';
        let cat = 'replayAny';
        if (g.key !== 'unsched' && api.chance(0.6)) cat = err > 0 ? 'replayLate' : 'replayEarly';
        rcap.textContent = fill(pickLine(cat), { err: e });
      }
      const stampBag = bag(['UPHELD', 'DENIED', 'UPHELD, DENIED', 'NOTED', 'FILED']);
      function appeal(i) {
        if (dead || stage < 4 || mode === 'gala') return;
        onInput();
        if (mode === 'fatigue') return;
        if (apBusy[i]) { if (busyN < LINES.appealBusy.length) sayN('appealBusy', busyN++, null, { pr: busyN > 3 ? 2 : 1, mood: 'confused' }); else sayC('appealBusy', null, { pr: 1 }); return; }
        apBusy[i] = true;
        api.award(-0.2, 'Appeal fee');
        const j = judges[i], e = appealEpoch, mytok = ++apTok[i];
        j.btn.classList.add(c('spin'));
        if (!padTxt[i]) sayC('appealBlank', null, { pr: 1 }); else if (api.flag.get('metStapler') && api.chance(0.3)) sayC('appealStapler', null, { pr: 1, who: 'The Stapler' }); else if (api.chance(0.5)) sayC('appealRecv', null, { pr: 1 }); else sayC('appealMix', null, { pr: 1 });
        api.setTimeout(function () {
          if (dead || e !== appealEpoch || mytok !== apTok[i]) return;
          apBusy[i] = false;
          j.btn.classList.remove(c('spin'));
          j.pst.textContent = stampBag(); j.pst.classList.add(c('on'));
          sv.appeals++; st('appeals'); dirty();
          if (i === 2) sayC('appealFinch', null, { pr: 1 }); else sayC('appealDone', null, { pr: 1 });
        }, SEL ? 1000 : 8000);
      }
      function rankName() { return RANKS[sv.rank] + (sv.rankLoops === 0 ? '' : sv.rankLoops === 1 ? ' (Returning)' : ' (Returning x' + sv.rankLoops + ')'); }
      function rankNeed() { return 14 + 6 * (sv.rank + 1); }
      function paintRank() {
        const f = clamp(sv.rankPts / rankNeed(), 0, 1);
        const shape = (1 - Math.exp(-3.2 * f)) / (1 - Math.exp(-3.2));
        const pct = rebal ? 99.9 : Math.min(99.9, 12 + 87.9 * shape);
        fillEl.style.width = pct.toFixed(1) + '%';
        rpctEl.textContent = pct.toFixed(1) + '%';
        rnameEl.textContent = rankName();
      }
      function addRank(pts) {
        sv.rankPts += pts; dirty();
        if (!rebal && sv.rankPts >= rankNeed()) {
          rebal = true; paintRank(); rstamp.classList.add(c('on')); api.sfx('stamp');
          sayN('rankLines', api.chance(0.5) ? 0 : 1, null, { pr: 1 });
          after(2000, function () {
            sv.rank++;
            if (sv.rank > 5) { sv.rank = 0; sv.rankLoops++; }
            sv.rankPts = 0; rebal = false; rstamp.classList.remove(c('on')); paintRank(); dirty();
            sayN('rankLines', api.chance(0.5) ? 2 : 3, { rank: rankName() }, { pr: 1, mood: 'proud' });
          });
        } else paintRank();
      }
      function paintStreak() { streakEl.textContent = 'Streak: ' + streak + ' (best ' + sv.bestStreak + ')'; }
      function targetHole(e, p) {
        const t = e.target && e.target.closest ? e.target.closest('[data-hole]') : null;
        if (t) { const id = Number(t.getAttribute('data-hole')); if (holes[id] && holes[id].vis) return id; }
        let best = 0, bd = 90;
        HIDS.forEach(function (id) {
          const h = holes[id];
          if (!h.vis) return;
          const q = holeCenter(h), d = Math.hypot(q.x - p.x, q.y - p.y);
          if (d < bd) { bd = d; best = id; }
        });
        return best || null;
      }
      function whack(hid, x, y, brief) {
        if (dead) return;
        const t = api.now();
        downAt = t;
        onInput();
        swing(x, y, brief);
        dustAt(x, y);
        api.sfx('whoosh');
        if (mode === 'gala') {
          if (t - lastTable > 2000) { lastTable = t; api.award(0.1, 'Table'); if (api.chance(0.4)) sayN('gala', 12, null, { pr: 1 }); else sayC('galaTable', null, { pr: 1 }); }
          return;
        }
        if (mode === 'fatigue') {
          api.sfx('sad'); stampAt('ON BREAK', x, y - 20);
          if (api.chance(0.3)) sayC('fatWhack', null, { pr: 1 });
          return;
        }
        if (mode === 'hush') { hushViolation(x, y); return; }
        st('whacks'); sv.whacks++; sessW++; dirty();
        if (!forced1) { forced1 = true; sayC('firstWhack', null, { pr: 1, mood: 'smug' }); }
        spamT.push(t); spamT = spamT.filter((q) => t - q < 3000);
        if (spamT.length === 8 && t >= fatigueCool && t - warned > 15000) { warned = t; sayC('spamWarn', null, { pr: 2, mood: 'confused' }); }
        if (spamT.length >= 12 && t >= fatigueCool) { startFatigue(); return; }
        const h = hid ? holes[hid] : null;
        if (h && h.brk) {
          stampHole('RUDE', hid); api.award(-0.1, 'Rude'); if (rudeN < LINES.rude.length) sayN('rude', rudeN++, null, { pr: 1 }); else sayC('rude', null, { pr: 1 }); zLog = []; streak = 0; paintStreak();
          return;
        }
        if (h && h.occT) {
          const o = h.occT;
          if (o.type === 'dennis') {
            clearOcc(h); leafCount++; leafCountEl.textContent = '🍃 x ' + leafCount; sayC('dennisWhack', null, { pr: 1, mood: 'confused' });
            stampHole('DENNIS', hid);
          } else if (o.type === 'toast') { endOcc(h, true); stampHole('BREAKFAST', hid); }
          else if (o.type === 'sock') { endOcc(h, true); stampHole('SOCK', hid); }
          return;
        }
        const n = h ? h.nothing : null;
        const err = n ? t - n.peakAt : 0;
        const graded = !!n && Math.abs(err) <= 450;
        const g = grade(err, graded);
        if (graded) killNothing(h, 'hit');
        finish(g, hid, err, n, t, x, y, false);
      }
      function autoWhack(h, n) {
        const err = n.autoErr;
        killNothing(h, 'hit');
        finish(grade(err, true), h.id, err, n, api.now(), 0, 0, true);
      }
      function finish(g, hid, err, n, t, x, y, auto) {
        const unobs = !auto && t < blinkUntil && stage >= 1 && mode === 'play';
        const lbl = unobs ? 'Unobserved' : g.label;
        if (!auto) stampHole(lbl, hid || 1);
        if (g.key === 'perfect') { if (!auto) { st('perfects'); api.sfx('ding'); const q = clientOf(hid ? holeCenter(holes[hid]) : { x: x, y: y }); api.confetti(q.x, q.y, 14); api.achieve('whack-a-nothing.perfected'); } }
        else if (g.key === 'early') { st('premature'); api.sfx('boing'); }
        else if (g.key === 'late') { st('belated'); api.sfx('sad'); }
        /* Meh */
        if (unobs) { /* no Meh for a whack nobody saw */ }
        else if (auto) api.award(0.1, 'Auto-score');
        else if (g.key === 'unsched') { if (t - lastUnsched >= 2000) { lastUnsched = t; api.award(0.1, 'Unscheduled'); } }
        else api.award(g.meh, g.label);
        if (auto) { st('autos'); addRank(0.6); } else addRank(g.pts);
        /* streak */
        if (!auto) {
          if (g.good) { streak++; if (streak > sv.bestStreak) { sv.bestStreak = streak; dirty(); } api.stat.max(S + 'streak', streak); if (streak === 5 || streak === 10 || streak === 25) sayC('streakMs', { n: streak }, { pr: 1 }); }
          else { if (streak >= 3) { if (api.chance(0.4)) sayC('streakBest', { n: sv.bestStreak }, { pr: 1 }); else sayC('streakBrk', { n: streak }, { pr: 1 }); } streak = 0; }
          paintStreak();
        }
        /* panel */
        const sc = scorePanel(g, hid || 0);
        const coin = !sc.guest && !unobs && !auto && stage >= 1 && mode === 'play' && api.chance(SEL ? 1 / 10 : 1 / 45);
        const o = { guest: sc.guest, unobs: unobs, quiet: auto || coin, totText: coin ? 'Panel total: decided by coin (30 not available at this time)' : '' };
        let ent = sc.ent;
        if (unobs) { ent = [{ v: 0, txt: '?', blur: true }, { v: 0, txt: '?', blur: true }, { v: 0, txt: '?', blur: true }]; }
        if (coin) ent = [{ v: 0, txt: 'H' }, { v: 0, txt: 'T' }, { v: 7.5, txt: '7½' }];
        if (stage >= 1) { if (pfT) { api.clearTimeout(pfT); pfT = 0; } revealPanel(ent, o); showReplay(err, g); }
        else if (!auto) pendingFirst = { ent: ent, o: o, err: err, g: g };
        if (unobs) { st('unobserved'); sayC('unobserved', null, { pr: 1, mood: 'confused' }); api.achieve('whack-a-nothing.unwitnessed'); return; }
        if (auto) { if (api.chance(0.3)) sayC('idleAuto', null, { pr: 1 }); return; }
        if (coin) { st('coins'); api.award(1, 'Coin toss'); sayC('coin', null, { pr: 1, mood: 'confused' }); }
        /* grade line first, and at priority 1 so the say throttle queues it instead of dropping it; the judges chime in after */
        if (!coin && (stage < 1 || !sc.ded)) sayC(g.cat, { err: Math.round(Math.abs(err)) }, { mood: g.key === 'perfect' ? 'proud' : g.good ? 'neutral' : 'disappointed', pr: g.key === 'unsched' && spamT.length > 3 ? 0 : 1 });
        if (!coin && stage >= 1 && mode === 'play') judgeTalk(g, sc, hid);
        if (g.key === 'unsched') { unCh++; const ci = [3, 6, 10, 15, 25, 40].indexOf(unCh); if (ci >= 0) { const vs = LINES.unCh[ci]; say(fill(vs[chainSeen[ci]++ % vs.length]), { pr: 2, mood: 'confused' }); } } else unCh = 0;
        if (g.key === runKey) runN++; else { runKey = g.key; runN = 1; }
        if (g.key !== 'unsched' && (runN === 4 || runN === 7 || runN === 12)) sayC('gradeRun', { n: runN, grade: RUNN[g.key] }, { pr: 1, mood: 'smug' });
        /* specials */
        const h = hid ? holes[hid] : null;
        if (h && h.rumor && g.good && Math.abs(err) <= 120 && Math.abs(err) > -1) rumorHit(h);
        const eyed = (n && n.eyes && !n.sched && n.eyesUntil && t < n.eyesUntil) || (hid && idleEyes.h === hid && t < idleEyes.until);
        if (eyed) { idleEyes.h = 0; st('eyes'); api.achieve('whack-a-nothing.eyes'); sayC('eyes', null, { pr: 1, mood: 'confused' }); }
        if (hid === 7.5) {
          sv.seven++; dirty();
          if ((g.key === 'perfect' || g.key === 'textbook') && n) api.achieve('whack-a-nothing.seventh-half');
          if (sv.seven >= 7 && !sv.bench) { sv.bench = true; benchEl.hidden = false; benchEl.textContent = '🥔 Gerald is on the bench'; sayC('geraldBench', null, { pr: 1, who: 'Gerald' }); }
        }
        lastPlayer = { hole: hid, t: t };
        if (lastGhost && lastGhost.hole === hid && Math.abs(t - lastGhost.t) <= 220) duet(hid);
        if (ghostOn && hid) recordGhost(hid);
        if (hid) zCheck(hid, t);
      }
      function zCheck(hid, t) {
        zLog.push({ h: hid, t: t }); if (zLog.length > 7) zLog.shift();
        if (zLog.length < 7) return;
        const Z = [1, 2, 3, 5, 7, 8, 9];
        for (let i = 0; i < 7; i++) if (zLog[i].h !== Z[i]) return;
        if (t - zLog[0].t > 8000) return;
        zLog = [];
        st('zwhack'); api.achieve('whack-a-nothing.zwhack'); sayC('zwhack', null, { pr: 1, mood: 'proud' });
        if (!zSigned) { zSigned = true; api.award(5, 'Signed the lawn'); }
        Z.forEach(function (id, i) { const p = holeCenter(holes[id]); const s = scorches[i]; s.style.left = p.x + 'px'; s.style.top = (p.y + 12) + 'px'; s.classList.add(c('on')); });
        api.setTimeout(function () { scorches.forEach(function (s) { s.classList.remove(c('on')); }); }, 8000);
      }
      function startHush() {
        setMode('hush'); clearNothings(); roundToken++; ghostEpoch++;
        hushViolated = false; hushLeafSeen = false;
        hushb.classList.add(c('on'));
        sayC('hushStart', null, { pr: 2, mood: 'panic', who: 'Management' });
        const len = SEL ? 2000 : 10000;
        later(len * 0.4, function () { launchLeaf(); hushLeafSeen = true; sayN('hushLeaf', 0, null, { pr: 1 }); });
        later(len, function () { endHush(); });
      }
      function endHush() {
        if (mode !== 'hush') return;
        setMode('play');
        const ok = !hushViolated;
        nextSpawn = Math.min(nextSpawn, api.now() + 800);
        hushDueT = T + 60 + api.rand() * 30;
        if (ok) {
          st('hushes'); api.award(1, 'Serenity'); addRank(4); api.achieve('whack-a-nothing.stillness');
          sayN('hushWin', 0, null, { pr: 1, mood: 'proud' }); sayC('hushWinB', null, { pr: 1 });
          revealPanel([{ v: 9, txt: '9.0' }, { v: 9.5, txt: '9.5' }, { v: 7.5, txt: '7½' }], { quiet: true });
          after(4200, function () { sayC('hushEnd', null, { pr: 1 }); });
        } else sayC('hushEnd', null, { pr: 1 });
      }
      function hushViolation(x, y) {
        if (hushViolated) return;
        hushViolated = true; st('whacks'); st('hushfails');
        api.sfx('buzz'); stampAt('Class C Noise', x, y - 16); api.award(-0.2, 'Class C Noise');
        sayC('hushFail', null, { pr: 2, mood: 'disappointed' });
        endHush();
      }
      function startFatigue() {
        const t = api.now();
        fatigueCool = t + 20000;
        fatN++;
        const second = t - lastFatigueEnd < 60000 || fatN >= 3;
        setMode('fatigue'); clearNothings(); roundToken++; ghostEpoch++; resetPaddles();
        st('fatigue'); api.achieve('whack-a-nothing.fatigue'); api.award(-0.1, 'Excess Whack Levy'); api.sfx('buzz');
        lanEl.hidden = false; mallSwing = false; setMallet(mallX, mallY, 0);
        panelEl.classList.add(c('fat'));
        judges[0].box.classList.add(c('gone')); judges[1].box.classList.add(c('gone'));
        judges.forEach(function (j) { j.btn.classList.add(c('down')); });
        padTxt[2] = '7½ 7½'; judges[2].back.textContent = '7½ 7½'; judges[2].btn.classList.add(c('rev'));
        sayN('spam', 0, null, { pr: 2, mood: 'panic' });
        sayN('spam', 1, null, { pr: 1 }); sayN('spam', 2, null, { pr: 1 });
        if (second) { sayC(fatN >= 3 ? 'spamMany' : 'spamSarc', null, { pr: 1, mood: 'smug' }); [0, 250, 500].forEach(function (d) { later(d, function () { api.sfx('tick'); }); }); }
        later(SEL ? 1000 : 6000, endFatigue);
      }
      function endFatigue() {
        if (mode !== 'fatigue') return;
        setMode('play'); lastFatigueEnd = api.now();
        lanEl.hidden = !api.hasItem('whack-a-nothing.lanyard');
        judges[0].box.classList.remove(c('gone')); judges[1].box.classList.remove(c('gone'));
        judges.forEach(function (j) { j.btn.classList.remove(c('down')); });
        nextSpawn = api.now() + 1000; spamT = [];
        sayN('spam', 4, null, { pr: 2, mood: 'proud' }); sayN('spam', 5, null, { pr: 1 });
        revealPanel([{ v: 6.5, txt: '6.5' }, { v: 8, txt: '8.0' }, { v: 7.5, txt: '7½' }], { biscuit: true, quiet: true });
        setMallet(mallX, mallY, 0);
      }
      function recordGhost(hid) {
        if (ghostPending >= 60) return;
        ghostPending++;
        const ge = ghostEpoch;
        api.setTimeout(function () {
          ghostPending = Math.max(0, ghostPending - 1);
          if (dead || ge !== ghostEpoch) return;
          ghostFire(hid);
        }, SEL ? 2500 : 20000);
      }
      let ghI = 0;
      function ghostFire(hid) {
        if (mode === 'gala' || mode === 'hush' || mode === 'fatigue') return;
        const h = holes[hid];
        if (!h || !h.vis) return;
        const p = holeCenter(h), g = ghms[ghI++ % ghms.length];
        g.style.left = p.x + 'px'; g.style.top = p.y + 'px';
        g.classList.remove(c('on')); void g.offsetWidth; g.classList.add(c('on'));
        const gk = (g._k = (g._k || 0) + 1);
        api.setTimeout(function () { if (g._k === gk) g.classList.remove(c('on')); }, 900);
        const now = api.now();
        lastGhost = { hole: hid, t: now };
        if (api.chance(0.18)) sayC('ghost', { hole: hn(hid) }, { pr: 0 });
        if (lastPlayer && lastPlayer.hole === hid && Math.abs(now - lastPlayer.t) <= 220) duet(hid);
      }
      function duet(hid) {
        lastGhost = null; lastPlayer = null;
        st('duets'); api.award(1, 'Temporal Duet'); stampHole('TEMPORAL DUET', hid); addRank(3); api.achieve('whack-a-nothing.duet');
        sayC('duet', { hole: hn(hid) }, { pr: 2, mood: 'confused' });
        after(900, function () { api.award(-0.2, 'Sandra'); sayC('duetFine', null, { pr: 1 }); });
      }
      const microBag = bag(['draft', 'dennis', 'heckle', 'rumor', 'blink', 'sandra', 'rain', 'memo', 'notice', 'stapler']);
      function gavinScene() {
        sv.gavin = true; dirty(); mallet.title = 'Gavin'; api.award(1, 'Gavin'); stampAt('GAVIN', (lawn.clientWidth || 300) / 2, 80);
        sayN('gavin', 0, null, { pr: 2, mood: 'smug' });
        after(3800, function () { sayN('gavin', 1, { n: sessW }, { pr: 2, who: 'Gavin' }); });
        after(8200, function () { sayN('gavin', api.hasItem('whack-a-nothing.gavinhat') ? 3 : 2, null, { pr: 2, who: 'Gavin' }); });
        after(12600, function () { chatBubble('Hole 1: Welcome to the team, Gavin.'); });
        after(14200, function () { sayN('gavin', 4, null, { pr: 2 }); });
      }
      function schedTick(now) {
        if (sched || now - t0 < th(600) || mode !== 'play' || readerOpen || stage < 2 || (pc && pc.hold) || now - lastLoopAt < th(45)) return;
        sched = 1; rainUntil = now + 40000; clockEl.textContent = 'Lawn time 12:00:03'; judges[2].btn.classList.add(c('down'));
        sayN('sched', 0, null, { pr: 2, mood: 'panic' });
        after(3800, function () { sayN('sched', 1, null, { pr: 1, mood: 'panic' }); });
        after(SEL ? 700 : 7500, function () {
          if (sched !== 1) return;
          if (mode !== 'play') { schedEnd('gone'); return; }
          const h = holes[1], t = api.now(), d = SEL ? 3600 : 6000;
          killNothing(h, 'gone'); clearOcc(h);
          startNothing(1, { h: 1, start: t, dur: d, peakAt: t + 0.65 * d, ph: 0, eyes: true, eyesUntil: 0, sched: true, autoAt: 0, autoErr: 0 });
          sayN('sched', 2, null, { pr: 1, mood: 'confused' });
        });
      }
      function schedEnd(why) {
        if (sched !== 1) return;
        sched = 2; rainUntil = 0; nextSpawn = api.now() + 2500; clockEl.textContent = clockTxt(); judges[2].btn.classList.remove(c('down'));
        if (why === 'hit') { api.award(10, 'The Appointment'); api.achieve('whack-a-nothing.appointment'); api.flag.set('whack-a-nothing.appointed', true); api.confetti(undefined, undefined, 40); api.sfx('fanfare'); sayN('sched', 3, null, { pr: 2, mood: 'proud' }); }
        else if (why === 'end') { api.award(3, 'Punctuality'); sayN('sched', 4, null, { pr: 2, mood: 'proud' }); }
        else sayN('sched', 5, null, { pr: 1, mood: 'confused' });
        after(5200, function () { sayN('sched', 6, null, { pr: 1, mood: 'smug' }); });
      }
      function clockHit() {
        if (dead) return;
        onInput(); clockN++; api.sfx('tick');
        if (clockN <= 7) sayN('clockL', clockN - 1, null, { pr: clockN === 7 ? 2 : 1, mood: clockN === 7 ? 'proud' : 'neutral' });
        else if (clockN % 3 === 0) sayC('clockSpam', null, { pr: 1 });
        if (clockN === 7) { st('clock'); api.achieve('whack-a-nothing.clock'); api.award(2, 'Verified time'); api.confetti(undefined, undefined, 12); clockEl.textContent = clockTxt(); }
      }
      function scheduleMicro() { microAt = api.now() + (SEL ? 1000 + api.rand() * 1000 : 12000 + api.rand() * 8000); }
      function microTick(now) {
        if (stage < 1 || now < microAt) return;
        if (mode !== 'play' || readerOpen || now < rainUntil) { microAt = now + 1000; return; }
        scheduleMicro();
        if (!threeDone && T >= thr(180)) { threeDone = true; if (!sv.gavin) gavinScene(); else sayC('threeMin', null, { pr: 1, mood: 'smug' }); return; }
        for (let i = 0; i < 10; i++) {
          const e = microBag();
          if (e === 'rumor' && stage < 3) continue;
          if (e === 'rain' && stage < 2) continue;
          if (e === 'stapler' && !api.flag.get('metStapler')) continue;
          runMicro(e);
          return;
        }
      }
      function runMicro(e) {
        const now = api.now();
        if (e === 'draft') { launchLeaf(); sayC('draftA', null, { pr: 1 }); after(5400, function () { if (!leaf.classList.contains(c('go')) && !F.leafWhacked) sayC('draftEnd', null, { pr: 0 }); F.leafWhacked = false; }); }
        else if (e === 'memo') sayC('memo', null, { pr: 1 });
        else if (e === 'stapler') sayC('stapler', null, { pr: 1, who: 'The Stapler' });
        else if (e === 'notice') say(fill('A notice has been pinned beside the lawn: ' + api.line('notice')), { pr: 1, who: 'Notice Board' });
        else if (e === 'dennis') spawnDennis();
        else if (e === 'heckle') heckBubble(fill(pickLine('heckle'), null));
        else if (e === 'rumor') plantRumor(false);
        else if (e === 'blink') blinkOne(api.randInt(0, 2));
        else if (e === 'sandra') {
          if (api.chance(0.35) && stage >= 3) sayN('rumorSay', 4 + api.randInt(0, 1), null, { pr: 1 });
          else sayC('microSandra', null, { pr: 1 });
          api.toast(api.pick(['Sandra from Compliance has audited something.', 'Audit complete. The audit has been audited.', 'Policy 14.2 applies. Nobody knows to what.', 'Sandra has noted this toast.', 'Compliance has noted that you noticed.', 'Audit pending. The pending is also pending.']));
        } else if (e === 'rain') {
          rainUntil = now + (SEL ? 1000 : 5000); app.classList.add(c('rain'));
          sayN('microRain', 0, null, { pr: 1 });
          after(SEL ? 500 : 2800, function () { if (app.classList.contains(c('rain'))) sayN('microRain', 2, null, { pr: 1 }); });
          after(SEL ? 1000 : 5000, function () { app.classList.remove(c('rain')); sayN('microRain', 1, null, { pr: 1 }); });
        }
      }
      function heckBubble(text) {
        heck.textContent = text; heck.hidden = false;
        const k = (F.heckK = (F.heckK || 0) + 1);
        say(text, { pr: 1 });
        after(5200, function () { if (F.heckK === k) heck.hidden = true; });
      }
      function launchLeaf() {
        if (leaf.classList.contains(c('go'))) return;
        leaf.style.top = (14 + Math.floor(api.rand() * 50)) + '%';
        leaf.classList.remove(c('go')); void leaf.offsetWidth; leaf.classList.add(c('go'));
        F.leafWhacked = false;
        api.clearTimeout(leafT);
        leafT = api.setTimeout(function () { leaf.classList.remove(c('go')); }, 5100);
      }
      function leafHit() {
        if (!leaf.classList.contains(c('go'))) return;
        onInput();
        api.clearTimeout(leafT);
        leaf.classList.remove(c('go')); F.leafWhacked = true;
        if (mode === 'hush') { const p = holeCenter(holes[1]); hushViolation(p.x, p.y); return; }
        st('fouls'); api.award(-0.1, 'Foul of Something'); api.sfx('boing'); foulN++; if (foulN <= 4) sayN('draftHit', foulN - 1, null, { pr: 1, mood: 'confused' }); else sayC('draftHit', null, { pr: 1, mood: 'confused' });
      }
      function blinkOne(i) {
        if (stage < 1 || mode !== 'play') return;
        judges[i].bust.textContent = '😑';
        api.setTimeout(function () { judges[i].bust.textContent = curFace[i]; }, 150);
      }
      function blinkLoop(i) {
        api.setTimeout(function () {
          if (dead) return;
          if (stage >= 1 && mode === 'play') {
            if (api.chance(SEL ? 1 / 4 : 1 / 12)) {
              blinkUntil = api.now() + 400;
              judges.forEach(function (j) { j.bust.textContent = '😑'; });
              api.setTimeout(function () { judges.forEach(function (j, k) { j.bust.textContent = curFace[k]; }); }, 400);
            } else blinkOne(i);
          }
          blinkLoop(i);
        }, api.randInt(8000, 14000) / (SEL ? 10 : 1));
      }
      function renderBoard() {
        const fIdx = Array.prototype.indexOf.call(notesEl.children, document.activeElement);
        notesEl.textContent = '';
        const list = rumors.slice(-4);
        if (toastRumorUntil > api.now()) list.push({ r: RUM_TOAST, temp: true });
        list.slice(-4).forEach(function (r) {
          const b = el('button', { class: c('note'), type: 'button', onclick: function () { b.firstChild.textContent = '🚩 ' + r.r.t; b.lastChild.textContent = 'Source: a hole.'; api.setTimeout(function () { b.lastChild.textContent = 'Source: ' + r.r.s + '.'; }, 1000); } },
            el('span', { text: '🚩 ' + r.r.t }), el('small', { text: 'Confidence: ' + (r.r.c || 'moderate-to-elevator') }), el('small', { text: 'Source: ' + r.r.s + '.' }));
          notesEl.appendChild(b);
        });
        if (fIdx >= 0 && notesEl.children[fIdx]) { try { notesEl.children[fIdx].focus(); } catch (e) { /* ignore */ } }
        const last = list[list.length - 1];
        tickEl.textContent = last ? 'NEWEST: ' + last.r.t : 'The rumor ticker is quiet. It is working on it.';
      }
      function removeRumor(r) {
        if (r.h) { r.h.rumor = null; r.h.btn.classList.remove(c('hasflag')); }
        const i = rumors.indexOf(r); if (i >= 0) rumors.splice(i, 1);
      }
      function plantRumor(isCorr, special) {
        const now = api.now();
        let src = special;
        if (!src) { src = RUM[rumorIdx % RUM.length]; rumorIdx++; }
        const free = HIDS.filter((id) => holes[id].vis && id !== 7.5 && !holes[id].rumor && !holes[id].brk);
        let h = null;
        if (!special || special === RUM_TOASTER) {
          if (src.h && holes[src.h] && holes[src.h].vis && !holes[src.h].rumor && !holes[src.h].brk) h = holes[src.h];
          else if (free.length && !special && !src.h) h = holes[api.pick(free)];
        }
        const r = { r: src, h: h, exp: now + (SEL ? 5000 : 20000) };
        if (h) { h.rumor = r; h.btn.classList.add(c('hasflag')); }
        rumors.push(r);
        while (rumors.length > 4) removeRumor(rumors[0]);
        renderBoard();
        if (!F.rumorExplained && h) { F.rumorExplained = true; sayN('rumorSay', 0, { hole: h.n }, { pr: 1, mood: 'confused' }); }
        else if (isCorr && api.chance(0.5)) sayC('rumorCorrection', null, { pr: 1 });
        nextPlant = now + (SEL ? 4000 : 12000);
      }
      function rumorTick(now) {
        if (stage < 3 || mode === 'gala') return;
        for (let i = rumors.length - 1; i >= 0; i--) {
          const r = rumors[i];
          if (r && now >= r.exp) {
            const h = r.h;
            removeRumor(r);
            if (mode === 'play') { plantRumor(true); if (h && api.chance(0.4)) sayN('rumorSay', 2, { hole: h.n }, { pr: 0 }); }
            else renderBoard();
          }
        }
        if (now >= nextPlant && mode === 'play' && !readerOpen) plantRumor(false);
      }
      function rumorHit(h) {
        const r = h.rumor;
        removeRumor(r); renderBoard();
        st('rumors'); api.award(0.5, 'Rumor Adjacency'); stampHole('Rumor Adjacency', h.id);
        sayN('rumorSay', 1, null, { pr: 1, mood: 'smug' });
      }
      function paintWall() {
        slots.forEach(function (s, i) {
          const id = wall[i];
          s.textContent = id ? pcEmoji(id) : '';
          s.classList.toggle(c('full'), !!id);
          s.setAttribute('aria-label', id ? 'Postcard wall slot ' + (i + 1) + ': postcard, press to read it again' : 'Postcard wall slot ' + (i + 1) + ', empty');
        });
        ccEl.hidden = !wall.some((id) => pcBase(id) === 'l1b' || pcBase(id) === 'l1bd');
        wcEl.textContent = 'Postcards received: ' + wall.length + ' (of a total unavailable)';
        showSide();
      }
      function pinWall(id) {
        wall.push(id);
        if (wall.length > 12) { wall.shift(); sayC('postcardFull', null, { pr: 1 }); }
        sv.postcards = wall.slice(-12); dirty();
        paintWall();
      }
      function nextRegion() {
        const k = sv.regions++; dirty();
        return 'r' + ((k % 8) + 1) + (k >= 8 ? '#' + Math.floor(k / 8) : '');
      }
      function removePostcard() { if (pc) { pc.wrap.remove(); pc = null; } }
      function spawnPostcard(id) {
        if (dead || mode === 'gala') return;
        if (pc) { after(3000, function () { spawnPostcard(id); }); return; }
        const ring = el('span', { class: c('ring'), 'aria-hidden': 'true' });
        const btn = el('button', { class: c('pc'), type: 'button', 'aria-label': 'Postcard from the mole. Press and hold for 1.5 seconds to catch it. A quick tap damages it.', dataset: { nw: '1', pc: '1' } },
          el('span', { class: c('pcs'), 'aria-hidden': 'true', text: pcEmoji(id) }), el('span', { class: c('pct'), 'aria-hidden': 'true', text: 'Greetings!' }));
        const wrap = el('div', { class: c('pcw'), dataset: { nw: '1' }, style: { left: (8 + Math.floor(api.rand() * 45)) + '%', top: (12 + Math.floor(api.rand() * 30)) + '%' } }, ring, btn);
        lawn.appendChild(wrap);
        pc = { id: id, damaged: false, wrap: wrap, btn: btn, ring: ring, born: api.now(), hold: 0 };
        api.sfx('whoosh');
        sayC('postcardLand', null, { pr: 1, mood: 'proud' });
      }
      function pcStart() { if (pc && !pc.hold) { pc.hold = api.now(); pcDownAt = pc.hold; onInput(); } }
      function pcEnd() {
        upAt = api.now(); pcDownAt = upAt;
        if (!pc || !pc.hold) return;
        const d = api.now() - pc.hold;
        pc.hold = 0; pc.ring.style.setProperty('--p', '0deg');
        if (d < 300) pcTap();
      }
      function pcTap() {
        if (!pc || pc.damaged) return;
        pc.damaged = true; pc.btn.classList.add(c('dmg'));
        stampAt('DAMAGED', lawn.clientWidth / 2, 70); api.sfx('sad'); sayC('postcardDamaged', null, { pr: 1, mood: 'disappointed' });
        const id = pc.id;
        after(SEL ? 1500 : 15000, function () { if (mode !== 'gala') spawnPostcard(id === 'l1a' ? 'l1bd' : nextRegion()); F.bDone = true; });
      }
      function holdMs() { return SEL ? 300 : 1500; }
      function pcTick(now) {
        if (!pc) return;
        if (pc.hold) {
          const f = (now - pc.hold) / holdMs();
          pc.ring.style.setProperty('--p', Math.round(clamp(f, 0, 1) * 360) + 'deg');
          if (f >= 1) { pcCaught(); return; }
        } else if (now - pc.born > (SEL ? 6000 : 45000)) {
          const id = pc.id; removePostcard(); pinWall(id); st('postcards'); sayC('postcardCourier', null, { pr: 1 });
        }
      }
      function pcCaught() {
        const p = pc;
        removePostcard(); st('postcards'); pinWall(p.id); api.sfx('tada');
        sayC(p.damaged ? 'postcardDamaged' : 'postcardCaught', null, { pr: 1, mood: 'proud' });
        openReader(p.id, !p.damaged);
      }
      function openReader(id, eligible) {
        reader = { id: id, flipped: false, t0: 0, eligible: eligible, prev: document.activeElement };
        rFront.textContent = 'Greetings from ' + (/^(l1|final)/.test(pcBase(id)) ? 'Somewhere Lower!' : pcRegion(id) + '.');
        rBody.textContent = pcText(id); rBody.hidden = true; rFront.hidden = false; rSun.hidden = false;
        rStamp.textContent = pcEmoji(id);
        readerEl.hidden = false; readerOpen = true;
        flipBtn.focus();
      }
      function openWall(i) { const id = wall[i]; if (id && !readerOpen) openReader(id, false); }
      function flipReader() {
        if (!reader) return;
        reader.flipped = !reader.flipped;
        rBody.hidden = !reader.flipped; rFront.hidden = reader.flipped; rSun.hidden = reader.flipped;
        if (reader.flipped && !reader.t0) reader.t0 = api.now();
        api.sfx('tick');
      }
      function closeReader(done) {
        if (!reader) return;
        const r = reader; reader = null; readerOpen = false; readerEl.hidden = true;
        try { (r.prev && r.prev.isConnected && root.contains(r.prev) && r.prev.focus ? r.prev : (holes[visList()[0]] || holes[1]).btn).focus(); } catch (e) { /* ignore */ }
        if (done && r.eligible && r.t0 && api.now() - r.t0 >= (SEL ? 400 : 3000)) {
          api.achieve('whack-a-nothing.postmaster'); sayC('postcardRead', null, { pr: 1, mood: 'proud' }); api.confetti(undefined, undefined, 22);
        }
      }
      function setMode(m) {
        mode = m; modeEpoch++;
        ['hush', 'fatigue', 'gala'].forEach(function (k) { app.classList.toggle(c(k), m === k); });
        if (m !== 'hush') hushb.classList.remove(c('on'));
        if (m !== 'fatigue') { panelEl.classList.remove(c('fat')); }
      }
      function clearAll() {
        clearNothings(); roundToken++; ghostEpoch++; appealEpoch++;
        HIDS.forEach(function (id) { const h = holes[id]; clearOcc(h); if (h.rumor) removeRumor(h.rumor); h.btn.classList.remove(c('hasflag')); });
        rumors = []; renderBoard();
        leaf.classList.remove(c('go')); heck.hidden = true; biscuit.hidden = true;
        removePostcard(); resetPaddles(); app.classList.remove(c('rain')); rainUntil = 0; toastDue = false;
        judges.forEach(function (j, i) { j.box.classList.remove(c('gone')); j.btn.classList.remove(c('down')); apBusy[i] = false; });
        if (curFace[1] !== JD[1].f) setJudgeUI(1, JD[1].f, 'Judge Quill');
        scorches.forEach(function (s) { s.classList.remove(c('on')); }); lanEl.hidden = !api.hasItem('whack-a-nothing.lanyard'); mallSwing = false; setMallet(mallX, mallY, 0);
      }
      function startGala() {
        F.galaStarted = true; galaTok++;
        const gt = galaTok, mini = loop >= 2, sc = SEL ? 0.1 : 1;
        setMode('gala'); clearAll();
        const at = (ms, fn) => after(ms * sc, function () { if (gt === galaTok) fn(); });
        if (!mini) {
          pinWall('final');
          sayN('gala', 0, null, { pr: 2, mood: 'panic' });
          at(3000, function () {
            api.sfx('tada');
            app.classList.add(c('party'));
            HIDS.forEach(function (id) { const h = holes[id]; if (h.vis) { h.btn.classList.add(c('table')); h.numEl.textContent = id === 1 ? 'Dennis' : id === 5 ? 'Table 5' : 'Table ' + h.n; } });
            panelEl.classList.add(c('party'));
            judges.forEach(function (j, i) { setPad(i, { txt: '7½' }); });
            gban.textContent = GALA_BANNER; gban.classList.add(c('on'));
            sayN('gala', 1, null, { pr: 1, mood: 'proud' });
          });
          /* one beat every ~5 s so the narrator queue never lags behind the party */
          [[8000, 2], [13000, 3], [18000, 4], [28000, 6], [38000, 8], [48000, 10], [53000, 11]].forEach(function (b) { at(b[0], function () { sayN('gala', b[1], null, { pr: 1 }); }); });
          [[17000, 0], [40000, 1]].forEach(function (b) { at(b[0], function () { api.toast(LINES.galaToast[b[1]]); }); });
          at(23000, function () { api.sfx('fanfare'); panelEl.classList.add(c('clap')); api.confetti(undefined, undefined, 40); sayN('gala', 5, null, { pr: 2, mood: 'proud' }); });
          at(33000, function () {
            api.sfx('tada'); certEl.hidden = false; panelEl.classList.remove(c('clap'));
            api.achieve('whack-a-nothing.gala'); api.award(10, 'Retirement Gala'); st('gala'); sayN('gala', 7, null, { pr: 1, mood: 'proud' });
          });
          at(43000, function () { certEl.hidden = true; sayN('gala', 9, null, { pr: 1 }); });
          at(57000, resetLoop);
        } else {
          at(100, function () { api.sfx('fanfare'); gban.textContent = 'CONGRATULATIONS, BARRY (STILL NOT PRESENT)'; gban.classList.add(c('on')); st('gala'); api.confetti(undefined, undefined, 16); });
          at(15000, resetLoop);
        }
      }
      function resetLoop() {
        if (mode !== 'gala') return;
        galaTok++;
        const now = api.now();
        lastLoopAt = now;
        loop++; sv.loop = loop; sv.rankPts = 0; rebal = false; rstamp.classList.remove(c('on'));
        T = 0; stage = 0; forced1 = false; F = {}; sponsorIdx = 0; setSponsor(); threeDone = false; unCh = 0;
        pendingFirst = null; holeHist = []; zLog = []; streak = 0; hushDueT = 0; ghostOn = false; dennisK = 0;
        setMode('play'); clearAll();
        app.classList.remove(c('party')); panelEl.classList.remove(c('party'), c('clap'));
        gban.classList.remove(c('on')); certEl.hidden = true;
        HIDS.forEach(function (id) { const h = holes[id]; h.btn.classList.remove(c('table'), c('hashat'), c('brk')); h.brk = false; h.numEl.textContent = hn(id); });
        holes[5].btn.setAttribute('aria-label', 'Hole 5');
        totEl.textContent = 'Panel total: none yet of 30 (30 not available at this time)'; avgEl.textContent = 'Panel average: none yet'; totals = [];
        topEl.hidden = true; rankEl.hidden = true; hint.hidden = false; streakEl.hidden = true; judges.forEach(function (j) { j.btn.disabled = true; });
        applyLayout(); showSide(); paintRank(); paintStreak(); paintWall();
        wcEl.textContent = 'Postcards received: 1 (of a total unavailable)';
        nextSpawn = now + (SEL ? 500 : 3000); microAt = 0; lastInput = now;
        api.setTitle('Whack-A-Nothing (Continued)');
        sayN('reset', 0, null, { pr: 2, mood: 'smug' });
        after(2500, function () { sayN('reset', 1, null, { pr: 1 }); });
        after(5000, function () { sayN('reset', 2, null, { pr: 1 }); });
        after(7500, function () { sayC('loopIntro', { loop: loop }, { pr: 1, mood: 'proud' }); });
        after(10000, function () { sayN('reset', 3, null, { pr: 1 }); });
        dirty();
      }
      const th = (s) => s * 1000 / IS;
      function onInput() {
        const now = api.now(), idleMs = now - lastInput;
        lastInput = now;
        if (mode === 'idleauto') {
          setMode('play'); clearNothings(); nextSpawn = now + 1500; sayC('idleEnd', null, { pr: 2, mood: 'smug' });
        } else if (IF.a60 && idleMs >= th(60)) {
          sayC(idleMs < th(120) ? 'idleBack' : 'idleEnd', null, { pr: 1, mood: 'smug' });
        }
        if (IF.a60) { HIDS.forEach(function (id) { holes[id].chat.classList.remove(c('on')); }); }
        if (IF.x240) judges.forEach(function (j, k) { j.bust.textContent = curFace[k]; });
        IF = {};
      }
      function chatLine() {
        for (let i = 0; i < 8; i++) {
          const t = pickLine('holeChat'), m = /^Hole (7½|\d+)/.exec(t), hh = m ? holes[m[1] === '7½' ? 7.5 : Number(m[1])] : null;
          if (hh && hh.vis) return t;
        }
        return LINES.holeChat[0];
      }
      function chatBubble(text) {
        const m = /^Hole (7½|\d+)/.exec(text);
        let h = m ? holes[m[1] === '7½' ? 7.5 : Number(m[1])] : null;
        if (!h || !h.vis) h = holes[api.pick(visList())] || holes[1];
        h.chat.textContent = text; h.chat.classList.add(c('on'));
        const k = (h._ck = (h._ck || 0) + 1);
        api.setTimeout(function () { if (h._ck === k) h.chat.classList.remove(c('on')); }, th(13));
      }
      function idleTick(now, idleMs) {
        if (mode !== 'play' && mode !== 'idleauto') return;
        if (readerOpen) return;
        if (idleMs >= th(60) && !IF.a60) { IF.a60 = 1; sayC('idle60', null, { pr: 1, mood: 'smug' }); }
        if (idleMs >= th(90) && !IF.a90) { IF.a90 = 1; nextChat = now; sayC('idle90', null, { pr: 1 }); }
        IDLE_X.forEach(function (x) {
          const k = 'x' + x[0];
          if (idleMs < th(x[0]) || IF[k]) return;
          IF[k] = 1;
          if (x[0] === 240) judges.forEach(function (j) { j.bust.textContent = '😴'; });
          sayC(x[1], null, { pr: 1, mood: 'smug' });
        });
        if (IF.a90 && !IF.a120 && now >= nextChat) { nextChat = now + th(6); chatBubble(chatLine()); }
        if (idleMs >= th(120) && !IF.a120) { IF.a120 = 1; if (mode === 'play') { setMode('idleauto'); nextSpawn = now + 300; } sayC('idle120', null, { pr: 1 }); }
        if (idleMs >= th(150) && !IF.a150) {
          IF.a150 = 1;
          const h = holes[api.pick(visList())] || holes[1];
          h.eyes.classList.add(c('on')); idleEyes = { h: h.id, until: now + 800 / (SEL ? 3 : 1) };
          api.setTimeout(function () { h.eyes.classList.remove(c('on')); }, th(0.8) * IS / (SEL ? 3 : 1));
          sayC('idleEyes', null, { pr: 1, mood: 'confused' });
        }
        if (idleMs >= th(180) && !IF.a180) { IF.a180 = 1; sayC('idle180', null, { pr: 1, mood: 'proud' }); api.award(10, 'Not whacking'); api.achieve('whack-a-nothing.idle'); }
        if (idleMs >= th(600) && !IF.a600) { IF.a600 = 1; sayC('idleOOO', null, { pr: 1, who: 'B. (Mole)' }); }
      }
      function sizeTick(now) {
        const w = root.clientWidth || 0;
        if (!w) return;
        app.classList.toggle(c('stack'), w < 720);
        const nw = w < 480;
        if (narrow !== null && nw !== narrow && now - lastResizeSay > 60000) { lastResizeSay = now; sayC('resize', null, { pr: 0 }); }
        narrow = nw; app.classList.toggle(c('narrow'), nw);
      }
      function timedEvents(now) {
        if (mode === 'gala') return;
        if (!apptHint && !sched && stage >= 5 && T >= thr(300)) {
          /* plant the 12:00:03 setup before the Appointment, so the punchline has something to land on */
          apptHint = true; clockEl.textContent = clockTxt();
          say('Management would ask that 12:00:03 be kept free. Management has not said why. It is on a calendar the calendar did not write.', { pr: 1, mood: 'confused' });
        }
        if (stage >= 6 && !F.quill && T >= thr(300)) { F.quill = 1; sayC('quillWhisper', null, { pr: 1, mood: 'confused' }); }
        if (stage >= 7 && !F.toaster && T >= thr(330)) {
          F.toaster = 1; plantRumor(false, RUM_TOASTER);
          after(SEL ? 1000 + api.rand() * 1500 : 8000 + api.rand() * 12000, function () { toastDue = true; });
        }
        if (loop === 1 && stage >= 7 && !F.truth && T >= thr(360)) { F.truth = 1; plantRumor(false, RUM_TRUE); sayN('rumorSay', 6, null, { pr: 1, mood: 'proud' }); }
        if (stage >= 8 && !F.pc1 && T >= thr(390)) { F.pc1 = 1; spawnPostcard(loop === 1 ? 'l1a' : nextRegion()); }
        if (loop === 1 && stage >= 8 && !F.pc2 && T >= thr(435)) { F.pc2 = 1; if (!F.bDone) { F.bDone = true; spawnPostcard('l1b'); } }
        if (stage >= 8 && !F.raise && T >= thr(450)) { F.raise = 1; sayN('hole5', 5, null, { pr: 1, mood: 'smug' }); holes[5].btn.setAttribute('aria-label', 'Hole 5, with a polite note asking for a raise'); }
        if (stage >= 5 && mode === 'play' && T >= hushDueT && !readerOpen && !(pc && pc.hold) && stage < 9 && sched !== 1) startHush();
        if (stage === 0 && mode === 'play' && loop === 1) {
          if (!F.w1 && T >= 14) { F.w1 = 1; sayN('wait', 0, null, { pr: 1 }); }
          if (!F.w2 && T >= 28) { F.w2 = 1; sayN('wait', 1, null, { pr: 1, mood: 'smug' }); }
        }
        BEAT_T.forEach(function (bt, i) { if (!F['b' + i] && T >= thr(bt) && mode === 'play') { F['b' + i] = 1; sayN('beats', i, null, { pr: 1 }); } });
      }
      function tick() {
        if (dead) return;
        const now = api.now();
        let dt = now - lastTick;
        lastTick = now;
        if (dt > 1000 || dt < 0) dt = 33;
        const idleMs = now - lastInput;
        if (mode !== 'gala' && idleMs < th(45)) T += dt / 1000 * TS;
        checkStage();
        nothingsTick(now);
        spawnTick(now);
        pcTick(now);
        rumorTick(now);
        microTick(now);
        idleTick(now, idleMs);
        schedTick(now);
        timedEvents(now);
        sizeTick(now);
      }
      api.on(lawn, 'pointerdown', function (e) {
        if (e.button > 0) return;
        if (e.target.closest && e.target.closest('[data-nw]')) {
          if (e.target.closest('.' + c('leaf'))) { downAt = api.now(); leafHit(); }
          else if (e.target.closest('[data-pc]')) pcStart();
          return;
        }
        touchMode = e.pointerType === 'touch' || e.pointerType === 'pen';
        const p = lawnPos(e.clientX, e.clientY);
        whack(targetHole(e, p), p.x, p.y, touchMode);
      });
      api.on(lawn, 'click', function (e) {
        const now = api.now();
        if (e.target.closest && e.target.closest('[data-nw]')) {
          if (e.target.closest('[data-pc]') && now - pcDownAt > 1000 && now - upAt > 80 && pc) { pcDownAt = now; pcTap(); }
          else if (e.target.closest('.' + c('leaf')) && now - downAt > 1000 && now - upAt > 80) leafHit();
          return;
        }
        if (now - downAt < 1000 || (now - upAt < 80 && downAt > 0)) return;
        const p = e.clientX || e.clientY ? lawnPos(e.clientX, e.clientY) : null;
        const t = e.target.closest ? e.target.closest('[data-hole]') : null;
        let hid = t ? Number(t.getAttribute('data-hole')) : null;
        if (hid && !(holes[hid] && holes[hid].vis)) hid = null;
        const q = p && (e.clientX || e.clientY) ? p : (hid ? holeCenter(holes[hid]) : { x: 100, y: 100 });
        whack(hid, q.x, q.y, true);
      });
      api.on(lawn, 'pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        const p = lawnPos(e.clientX, e.clientY);
        mallVx = p.x - mallX;
        if (!mallet.classList.contains(c('on')) && e.pointerType === 'mouse') mallet.classList.add(c('on'));
        if (mode !== 'fatigue') setMallet(p.x, p.y, mallVx);
        if (Math.hypot(e.clientX - lastMovX, e.clientY - lastMovY) > 30) { lastMovX = e.clientX; lastMovY = e.clientY; onInput(); }
        if (pc && pc.hold && !(e.target.closest && e.target.closest('[data-pc]'))) { pc.hold = 0; pc.ring.style.setProperty('--p', '0deg'); }
      });
      api.on(lawn, 'pointerleave', function () { if (!touchMode) mallet.classList.remove(c('on')); });
      api.on(document, 'pointerup', pcEnd);
      api.on(document, 'pointercancel', pcEnd);
      api.on(root, 'touchstart', function () { onInput(); }, { passive: true });
      /* anything the player does inside the module (paddles, board, wall, report) counts as not being idle */
      api.on(root, 'pointerdown', function () { onInput(); });
      api.on(root, 'pointermove', function (e) {
        if (Math.hypot(e.clientX - lastMovX, e.clientY - lastMovY) > 30) { lastMovX = e.clientX; lastMovY = e.clientY; onInput(); }
      }, { passive: true });
      /* time spent in a hidden tab is not idle time */
      api.on(document, 'visibilitychange', function () {
        const n = api.now();
        if (document.hidden) { if (!hiddenAt) hiddenAt = n; }
        else if (hiddenAt) { lastInput = Math.min(lastInput + (n - hiddenAt), n); lastTick = n; hiddenAt = 0; }
      });
      api.on(window, 'resize', function () { sizeTick(api.now()); });
      function holeFromTarget(t) { const b = t && t.closest ? t.closest('[data-hole]') : null; return b ? Number(b.getAttribute('data-hole')) : 0; }
      function moveFocus(cur, key) {
        /* Hole 7½ hangs off the right edge of the lawn, beside Hole 8: it is not part of the 4-column flow */
        if (cur === 7.5) { if (key === 'ArrowLeft' || key === 'ArrowUp') holes[8].btn.focus(); return; }
        if (cur === 8 && key === 'ArrowRight' && holes[7.5].vis) { holes[7.5].btn.focus(); return; }
        const vis = HIDS.filter((id) => holes[id].vis && id !== 7.5);
        const i = vis.indexOf(cur);
        if (i < 0) return;
        const cols = stage >= 7 ? 4 : 3;
        let j = i;
        if (key === 'ArrowLeft') j = i - 1; else if (key === 'ArrowRight') j = i + 1; else if (key === 'ArrowUp') j = i - cols; else j = i + cols;
        if (j >= 0 && j < vis.length) holes[vis[j]].btn.focus();
      }
      api.on(document, 'keydown', function (e) {
        if (dead || !root.isConnected) return;
        const tg = e.target, tag = tg && tg.tagName ? String(tg.tagName) : '';
        if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.ctrlKey || e.altKey || e.metaKey) return;
        if (tg && tg.closest && !root.contains(tg) && tag !== 'BODY' && tag !== 'HTML') return;
        const k = e.code || e.key;
        if (e.key === 'Escape') {
          if (readerOpen) { closeReader(false); return; }
          if (pc && pc.hold) { pc.hold = 0; pc.ring.style.setProperty('--p', '0deg'); }
          const now = api.now();
          if (now - lastEsc > 30000) { lastEsc = now; sayC('esc', null, { pr: 1 }); }
          return;
        }
        onInput();
        if (readerOpen && e.key === 'Tab') {
          /* the postcard reader is modal: keep Tab between Flip and Done */
          const a = document.activeElement;
          if (!readerEl.contains(a) || (e.shiftKey && a === flipBtn) || (!e.shiftKey && a === doneBtn)) { e.preventDefault(); (e.shiftKey && a === flipBtn ? doneBtn : flipBtn).focus(); }
          return;
        }
        const fh = holeFromTarget(tg);
        if (/^Arrow(Left|Right|Up|Down)$/.test(e.key) && fh) { e.preventDefault(); moveFocus(fh, e.key); return; }
        if (e.repeat) { if (KEYS[k] || (fh && (e.key === ' ' || e.key === 'Enter'))) e.preventDefault(); return; }
        if (tg && tg.closest && tg.closest('[data-pc]') && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); pcStart(); return; }
        if (readerOpen) return;
        let hid = 0;
        if (KEYS[k]) hid = stage < 2 ? 1 : KEYS[k];
        else if (fh && (e.key === ' ' || e.key === 'Enter' || e.code === 'Space')) hid = fh;
        if (!hid || !holes[hid] || !holes[hid].vis) return;
        e.preventDefault();
        const p = holeCenter(holes[hid]);
        whack(hid, p.x, p.y, true);
      });
      api.on(document, 'keyup', function (e) {
        if (dead) return;
        const tg = e.target;
        if (tg && tg.closest && tg.closest('[data-pc]') && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); pcEnd(); return; }
        if (tg && tg.closest && tg.closest('[data-hole]') && (e.key === ' ' || e.key === 'Enter')) e.preventDefault();
      });
      sv.visits++; dirty();
      if (loop >= 2) api.setTitle('Whack-A-Nothing (Continued)'); else api.setTitle('Whack-A-Nothing');
      lanEl.hidden = !api.hasItem('whack-a-nothing.lanyard');
      if (api.hasItem('whack-a-nothing.gavinhat')) { mallet.title = 'Gavin'; }
      if (sv.gavin) mallet.title = 'Gavin';
      if (sv.bench) { benchEl.hidden = false; benchEl.textContent = '🥔 Gerald is on the bench'; }
      paintRank(); paintStreak(); paintWall(); scheduleMicro();
      holes[5].btn.querySelector('.' + c('sign')).textContent = loop >= 2 ? 'Back in 5 (revised: 7½)' : 'Back in 5';
      setSponsor(); applyLayout();
      rnameEl.textContent = rankName();
      /* opening beats: the first joke fires before the player does anything */
      if (loop >= 2) sayC('loopIntro', { loop: loop }, { pr: 2, mood: 'proud' });
      else if (sv.visits <= 1) sayN('intro', 0, null, { pr: 2, mood: 'proud' });
      else sayC('intro', null, { pr: 2, mood: 'proud' });
      after(4000, function () { if (sv.visits <= 1 && loop < 2) sayN('intro', 1, null, { pr: 1 }); else if (sv.whacks > 0 && api.chance(0.6)) sayC('welcomeBack', { n: sv.whacks }, { pr: 1, mood: 'smug' }); else sayC('intro', null, { pr: 1 }); });
      after(9000, function () {
        if (sv.visits <= 1 && loop < 2 && sv.whacks === 0) sayN('intro', 7, null, { pr: 1 });
        else if (api.flag.get('metGerald') && api.chance(0.5)) sayC('gerald', null, { pr: 1, who: 'Gerald' });
        else if (api.hasItem('whack-a-nothing.lanyard')) sayC('lanyard', null, { pr: 1 });
        else if (wall.length) sayN('welcomeBack', 1, null, { pr: 1 });
      });
      api.setInterval(tick, 33);
      [0, 1, 2].forEach(blinkLoop);
      return { destroy() { if (saveT) { try { api.save.set('s', sv); } catch (e) { /* ignore */ } } dead = true; } };
    }
  });
})();
