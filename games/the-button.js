/* POINTLESS module: the-button */
/* The Button: one red button, one laminated sign, and a ceremony that is not an ending. Brief: design/the-button.md */
(function () {
  'use strict';
  const P = window.POINTLESS;
  if (!P) return;
  P.injectCSS(`
.m-the-button-root{--cream:#FFF4DC;--ink:#2B2118;--red:#E8433F;--red-hi:#FF7A6E;--red-lo:#B3271D;--mustard:#F2B632;--mint:#9ADCC0;--lilac:#B8A6E8;--sign:#FFFDF5;--sign-ink:#C8342B;--butter:#FFE98A;--pink:#FFB8C9;--sky:#A8DCFF;--lime:#CDEE8B;--peach:#FFC99E; box-sizing:border-box;display:flex;flex-direction:column;gap:12px;padding:12px;color:var(--ink);line-height:1.35;font-family:ui-rounded,'Trebuchet MS',system-ui,sans-serif; background:var(--cream) radial-gradient(rgba(43,33,24,.1) 1.2px,transparent 1.5px) 0 0/16px 16px} .m-the-button-root *{box-sizing:border-box} .m-the-button-root [hidden]{display:none!important} .m-the-button-root :focus-visible{outline:3px dashed #2B2118;outline-offset:3px} .m-the-button-hasshades .m-the-button-eye{opacity:0}
.m-the-button-hdr{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px} .m-the-button-plaque{display:flex;align-items:center;gap:8px;background:var(--ink);color:var(--cream);border-radius:12px;padding:6px 10px;box-shadow:3px 3px 0 rgba(43,33,24,.35)} .m-the-button-plabel{font:800 .7rem/1 system-ui,sans-serif;letter-spacing:.14em} .m-the-button-gear{width:18px;height:18px;flex:none;color:var(--mustard)} .m-the-button-gear.m-the-button-turn{animation:m-the-button-spin .6s ease-out} .m-the-button-gearc{fill:none;stroke:currentColor;stroke-width:5;stroke-dasharray:3.1 3.1} .m-the-button-gearh{fill:currentColor} .m-the-button-odo{display:flex;gap:3px;position:relative}
.m-the-button-cell{position:relative;width:1.05em;height:1.5em;overflow:hidden;border-radius:4px;background:#FFFDF5;color:var(--ink);font:900 1.25rem/1 ui-monospace,Consolas,monospace;text-align:center;box-shadow:inset 0 3px 5px rgba(0,0,0,.28)} .m-the-button-strip{display:flex;flex-direction:column;transition:transform .45s cubic-bezier(.3,1.5,.5,1)} .m-the-button-strip span{display:block;height:1.5em;line-height:1.5em} .m-the-button-stamp{display:none;position:absolute;left:-3px;right:-3px;bottom:3px;transform:rotate(-14deg);border:2px solid #C8342B;color:#C8342B;background:rgba(255,253,245,.82);font:900 .55rem/1.2 system-ui,sans-serif;letter-spacing:.02em;text-align:center}
.m-the-button-cell.m-the-button-ap .m-the-button-stamp{display:block} .m-the-button-roman{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#FFFDF5;color:var(--ink);border-radius:4px;font:900 1.1rem/1 ui-monospace,Consolas,monospace;z-index:2} .m-the-button-prior{font:900 1rem/1 ui-monospace,Consolas,monospace;color:var(--mustard);transform:rotate(-4deg);border:2px solid var(--mustard);border-radius:4px;padding:2px 4px} .m-the-button-chip{background:#fff;border:3px solid var(--ink);border-radius:999px;padding:3px 10px;font-weight:800;font-size:.85rem;box-shadow:2px 2px 0 var(--ink);transition:background .1s}
.m-the-button-chip.m-the-button-hot{background:var(--butter)} .m-the-button-feel{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-left:auto} .m-the-button-flab{font-size:.7rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;opacity:.75} .m-the-button-fb{font-size:1.1rem;line-height:1;width:34px;height:34px;padding:0;border-radius:50%;border:3px solid var(--ink);background:#fff;cursor:pointer} .m-the-button-fb[aria-pressed="true"]{background:var(--butter);box-shadow:0 0 0 3px var(--mustard)} .m-the-button-fb:active{transform:scale(.9)}
.m-the-button-stage{position:relative;display:flex;flex-direction:column;overflow:hidden;overflow:clip;isolation:isolate;min-height:clamp(300px,56vw,460px);border:3px solid var(--ink);border-radius:18px;box-shadow:4px 4px 0 var(--ink);background:linear-gradient(#FFF9E8,#FFE7B5 70%);transition:filter .1s} .m-the-button-spot{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 45% 55% at 50% 52%,rgba(255,243,176,.55),rgba(255,243,176,0) 70%)} .m-the-button-tint{position:absolute;inset:0;z-index:1;pointer-events:none;transition:background .8s} .m-the-button-t0 .m-the-button-tint,.m-the-button-t5 .m-the-button-tint{background:rgba(120,170,255,.06)}
.m-the-button-t2 .m-the-button-tint{background:rgba(255,160,90,.08)} .m-the-button-t3 .m-the-button-tint{background:rgba(222,205,165,.2);animation:m-the-button-flick 7s infinite} .m-the-button-t4 .m-the-button-tint{background:rgba(255,190,90,.18)} .m-the-button-floor{position:absolute;left:-20%;right:-20%;bottom:-8%;height:46%;z-index:0;pointer-events:none;background:repeating-conic-gradient(#E8D5AA 0 25%,#F7EBCD 0 50%) 0 0/64px 64px;transform:perspective(500px) rotateX(60deg);transform-origin:50% 100%;opacity:.9} .m-the-button-tilecell{position:absolute;z-index:1;width:64px;height:30px;background:var(--mint);opacity:.8;pointer-events:none}
.m-the-button-bubblerow{position:relative;z-index:6;display:flex;justify-content:center;min-height:5.6em;padding:12px 12px 0;pointer-events:none} .m-the-button-bubble{position:relative;align-self:flex-start;max-width:min(100%,520px);background:#fff;border:3px solid var(--ink);border-radius:18px;padding:7px 14px;font-weight:700;font-size:.95rem;box-shadow:3px 3px 0 var(--ink);opacity:0;transform:scale(.92);transition:opacity .2s} .m-the-button-bubble::after{content:'';position:absolute;left:50%;bottom:-13px;width:18px;height:18px;background:#fff;border-right:3px solid var(--ink);border-bottom:3px solid var(--ink);transform:translateX(-50%) rotate(45deg)}
.m-the-button-bubble.m-the-button-on{opacity:1;transform:none} .m-the-button-bubble.m-the-button-pop{animation:m-the-button-pop .28s ease-out} .m-the-button-bwho{display:block;font:800 .62rem/1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--red-lo);margin-bottom:2px} .m-the-button-main{position:relative;z-index:2;flex:1;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:12px 8px;padding:10px 12px 14px} .m-the-button-signcol{position:relative;z-index:2;flex:0 0 auto;width:clamp(120px,27vw,240px);align-self:flex-end} .m-the-button-sway{transform-origin:50% 100%;animation:m-the-button-sway 4s ease-in-out infinite}
.m-the-button-sign{position:relative;background:var(--sign);border:3px solid var(--ink);border-radius:6px;padding:10px 6px 24px;text-align:center;box-shadow:3px 3px 0 var(--ink);transform:rotate(calc(-3deg + var(--lean,0deg)));transform-origin:50% 100%;transition:transform .6s} .m-the-button-sign.m-the-button-hasnotes{padding-bottom:66px} .m-the-button-sign::before{content:'';position:absolute;left:0;right:0;bottom:0;height:14px;border-top:3px solid var(--ink);background:repeating-linear-gradient(-45deg,var(--ink) 0 10px,var(--mustard) 10px 20px)} .m-the-button-sign::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.6) 42%,transparent 54%)}
.m-the-button-rigid .m-the-button-sign{transform:rotate(0deg)} .m-the-button-rigid .m-the-button-sway,.m-the-button-md-away .m-the-button-sway{animation:none} .m-the-button-md-away .m-the-button-sign{animation:m-the-button-hop .9s ease-in-out infinite} .m-the-button-words{position:relative;z-index:1;display:flex;flex-wrap:wrap;justify-content:center;gap:0 5px} .m-the-button-wipe .m-the-button-words{animation:m-the-button-wipe .4s ease-out}
.m-the-button-word{font-family:Impact,'Arial Black',sans-serif;font-size:clamp(17px,4vw,30px);line-height:1.15;text-transform:uppercase;letter-spacing:.06em;color:var(--sign-ink);background:none;border:0;border-radius:4px;padding:0 3px;margin:0;cursor:pointer} .m-the-button-word:hover{background:rgba(200,52,43,.13)} .m-the-button-word.m-the-button-gone{animation:m-the-button-gone .45s forwards}
.m-the-button-ghost{position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;opacity:0;pointer-events:none;transition:opacity .4s;font:clamp(17px,4vw,30px)/1.15 Impact,'Arial Black',sans-serif;color:var(--sign-ink);text-transform:uppercase;background:var(--sign)} .m-the-button-ghost.m-the-button-on{opacity:.55} .m-the-button-sticker{display:none;position:absolute;z-index:4;bottom:-30px;right:-18px;width:54px;height:54px;border-radius:50%;background:var(--lime);border:3px solid var(--ink);font:900 .5rem/1.1 system-ui,sans-serif;align-items:center;justify-content:center;text-align:center;transform:rotate(12deg);pointer-events:none}
.m-the-button-sign.m-the-button-sticky .m-the-button-sticker{display:flex} .m-the-button-armband{display:none;position:absolute;z-index:4;left:-9px;top:34%;width:16px;height:44px;background:#C8342B;border:2px solid var(--ink);border-radius:3px;pointer-events:none} .m-the-button-sign.m-the-button-union .m-the-button-armband{display:block} .m-the-button-notes{position:absolute;inset:0;z-index:3;pointer-events:none}
.m-the-button-note{position:absolute;width:clamp(64px,13vw,92px);padding:5px 6px 8px;background:linear-gradient(225deg,transparent 12px,var(--nc,#FFE98A) 0);color:#3A2E22;font:italic 600 clamp(9px,1.9vw,11px)/1.2 system-ui,sans-serif;box-shadow:2px 3px 4px rgba(0,0,0,.25);transition:opacity .4s;animation:m-the-button-pop .3s ease-out} .m-the-button-note.m-the-button-fade{opacity:0} .m-the-button-post{width:14px;height:clamp(26px,6vw,50px);margin:0 auto;background:linear-gradient(90deg,#9A6B3F,#C08B55,#9A6B3F);border:3px solid var(--ink);border-top:0} .m-the-button-centre{position:relative;flex:1 1 150px;min-width:0;display:flex;flex-direction:column;align-items:center}
.m-the-button-btnwrap{position:relative;z-index:2;width:clamp(150px,42vw,270px);aspect-ratio:1/1;transition:transform .5s} .m-the-button-smaller .m-the-button-btnwrap{width:clamp(138px,38.6vw,248px)} .m-the-button-btn{position:relative;display:block;width:100%;height:100%;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;transition:transform .08s} .m-the-button-btn.m-the-button-down{transform:translateY(8px)} .m-the-button-btn:focus-visible{outline:5px dashed #2B2118;outline-offset:6px;box-shadow:0 0 0 5px #F2B632}
.m-the-button-rim{position:absolute;inset:0;border-radius:50%;border:5px solid var(--mustard);background:conic-gradient(from 20deg,#FFF3C4,#F2B632,#B57C10,#F2B632,#FFF3C4,#F2B632,#B57C10,#F2B632,#FFF3C4);box-shadow:0 10px 0 #9A6A10,0 14px 0 var(--ink),0 0 0 3px var(--ink);transition:box-shadow .08s} .m-the-button-btn.m-the-button-down .m-the-button-rim{box-shadow:0 2px 0 #9A6A10,0 4px 0 var(--ink),0 0 0 3px var(--ink)}
.m-the-button-dome{position:absolute;inset:13%;border-radius:50%;background:radial-gradient(circle at 34% 26%,var(--red-hi) 0 10%,rgba(255,122,110,0) 36%),radial-gradient(circle at 50% 58%,var(--red) 0 58%,var(--red-lo) 100%);box-shadow:inset 0 -10px 18px rgba(0,0,0,.28),inset 0 8px 14px rgba(255,255,255,.28),0 0 0 3px var(--ink);animation:m-the-button-breathe 4s ease-in-out infinite;transform-origin:50% 60%} .m-the-button-holding .m-the-button-dome{animation:none;transform:scale(.94);transition:transform 4s linear} .m-the-button-ripple{position:absolute;inset:8%;border-radius:50%;border:4px solid rgba(255,255,255,.85);opacity:0;pointer-events:none;z-index:3}
.m-the-button-ripple.m-the-button-go{animation:m-the-button-rip .5s ease-out} .m-the-button-ring{position:absolute;inset:-13px;z-index:3;pointer-events:none;width:calc(100% + 26px);height:calc(100% + 26px)} .m-the-button-ringc{fill:none;stroke:var(--mustard);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:289;stroke-dashoffset:289;opacity:0;transform:rotate(-90deg);transform-origin:50% 50%} .m-the-button-holding .m-the-button-ringc{opacity:1;stroke-dashoffset:0;transition:stroke-dashoffset 10s linear} .m-the-button-face{position:absolute;inset:0;pointer-events:none;--ex:0px;--ey:0px} .m-the-button-t0 .m-the-button-face,.m-the-button-t5 .m-the-button-face{display:none}
.m-the-button-eye{position:absolute;top:32%;width:20%;aspect-ratio:1/1;border-radius:50%;background:#fff;border:3px solid var(--ink);display:flex;align-items:center;justify-content:center;transition:transform .12s} .m-the-button-el{left:27%}.m-the-button-er{right:27%} .m-the-button-pupil{position:relative;width:46%;aspect-ratio:1/1;border-radius:50%;background:var(--ink);transform:translate(var(--ex),var(--ey))} .m-the-button-t4 .m-the-button-pupil{width:64%} .m-the-button-t4 .m-the-button-pupil::after{content:'';position:absolute;top:16%;left:20%;width:30%;height:30%;border-radius:50%;background:#fff} .m-the-button-blink .m-the-button-eye{transform:scaleY(.12)}
.m-the-button-squint .m-the-button-eye{transform:scaleY(.45)} .m-the-button-brow{display:none;position:absolute;top:25%;width:19%;height:4.5%;background:var(--ink);border-radius:3px} .m-the-button-t2 .m-the-button-brow,.m-the-button-t3 .m-the-button-brow,.m-the-button-t4 .m-the-button-brow{display:block} .m-the-button-bl{left:26%;transform:rotate(-12deg)}.m-the-button-br{right:26%;transform:rotate(12deg)} .m-the-button-glasses{display:none;position:absolute;top:28%;left:21%;right:21%;height:29%;border:3px solid var(--ink);border-radius:14px;background:rgba(255,255,255,.14)} .m-the-button-t3 .m-the-button-glasses{display:block}
.m-the-button-mouth{position:absolute;left:38%;width:24%;top:62%;height:10%;border-bottom:4px solid var(--ink);border-radius:0 0 50% 50%;transition:height .2s,border-radius .2s,transform .2s} .m-the-button-mood-flat .m-the-button-mouth{height:0;border-radius:0} .m-the-button-mood-wobbly .m-the-button-mouth{height:7%;border-radius:40% 60% 50% 50%;transform:rotate(-7deg)} .m-the-button-mood-o .m-the-button-mouth{left:44%;width:12%;height:11%;border:4px solid var(--ink);border-radius:50%;background:#7A1C14} .m-the-button-fw{position:absolute;inset:0;pointer-events:none;z-index:2} .m-the-button-shades{position:absolute;left:50%;top:26%;transform:translateX(-50%);font-size:clamp(34px,10vw,62px);line-height:1}
.m-the-button-mus{position:absolute;left:50%;top:53%;width:28%;height:8%;transform:translateX(-50%);background:radial-gradient(ellipse at 25% 50%,#5A3A1E 0 62%,transparent 64%),radial-gradient(ellipse at 75% 50%,#5A3A1E 0 62%,transparent 64%)} .m-the-button-tear{display:none;position:absolute;left:30%;top:46%;width:5%;aspect-ratio:1/1.4;border-radius:50% 50% 50% 0;background:var(--sky);border:2px solid var(--ink);transform:rotate(-45deg)} .m-the-button-cry .m-the-button-tear{display:block;animation:m-the-button-tear 1.4s ease-in infinite} .m-the-button-sweat,.m-the-button-smoke{display:none;position:absolute;pointer-events:none;z-index:4;line-height:1}
.m-the-button-sweat{right:16%;top:14%;font-size:clamp(20px,5vw,34px)} .m-the-button-g-sweat .m-the-button-sweat{display:block;animation:m-the-button-drip 2.6s ease-in infinite} .m-the-button-smoke{left:50%;top:6%;transform:translateX(-50%);font-size:clamp(46px,13vw,90px)} .m-the-button-md-overwhelmed .m-the-button-smoke{display:block;animation:m-the-button-puff 1s ease-in-out infinite} .m-the-button-btnwear{position:absolute;inset:0;pointer-events:none;z-index:4} .m-the-button-w{position:absolute;line-height:1;font-size:clamp(30px,8vw,56px);filter:drop-shadow(2px 3px 0 rgba(43,33,24,.3))} .m-the-button-w-hat{left:50%;top:-12%;transform:translateX(-50%) rotate(-8deg)}
.m-the-button-w-tag{left:3%;top:60%;font-size:clamp(20px,5vw,34px);transform:rotate(-14deg)} .m-the-button-w-mug{right:-6%;top:-10%;font-size:clamp(24px,6vw,42px)} .m-the-button-w-chair{left:-8%;top:-34%} .m-the-button-w-plant{right:-3%;top:42%;font-size:clamp(24px,6vw,42px)} .m-the-button-orbit .m-the-button-btnwear{animation:m-the-button-spin 2s linear 2} .m-the-button-plinth{position:relative;z-index:1;width:min(100%,clamp(190px,50vw,330px));height:clamp(56px,13vw,92px);margin-top:calc(-1 * clamp(34px,9vw,60px));cursor:pointer} .m-the-button-plside{position:absolute;left:3%;right:3%;top:24%;bottom:0;background:var(--lilac);border:3px solid var(--ink);border-radius:0 0 48% 48%/0 0 28% 28%}
.m-the-button-pltop{position:absolute;left:0;right:0;top:0;height:50%;background:var(--mint);border:3px solid var(--ink);border-radius:50%} .m-the-button-cushion{display:none;position:absolute;left:50%;top:-2%;width:60%;height:34%;transform:translateX(-50%);background:var(--pink);border:3px solid var(--ink);border-radius:50%} .m-the-button-t4 .m-the-button-cushion{display:block} .m-the-button-stair{display:none;position:absolute;left:50%;bottom:-12%;width:40%;height:15%;transform:translateX(-50%);background:var(--lilac);border:3px solid var(--ink)} .m-the-button-a-stair .m-the-button-stair{display:block}
.m-the-button-awaynote{display:none;position:absolute;z-index:5;left:50%;top:-34%;transform:translateX(-50%) rotate(-3deg);width:max-content;max-width:90%;background:var(--butter);border:3px solid var(--ink);padding:6px 10px;font:italic 700 .8rem system-ui,sans-serif;color:var(--ink);cursor:pointer;box-shadow:2px 3px 0 var(--ink)} .m-the-button-md-away .m-the-button-awaynote{display:block} .m-the-button-md-away .m-the-button-btnwrap{visibility:hidden} .m-the-button-md-escort .m-the-button-btnwrap{animation:m-the-button-leave 6s both} .m-the-button-guard{display:none;position:absolute;z-index:9;left:-14%;bottom:12%;font-size:clamp(40px,10vw,72px);line-height:1;pointer-events:none}
.m-the-button-md-escort .m-the-button-guard{display:block;animation:m-the-button-walk 6s linear both} .m-the-button-g-under{z-index:0;transform:translateY(45%)} .m-the-button-g-wobble{animation:m-the-button-wobble 1.4s ease-in-out} .m-the-button-g-roll{transform:translateX(-14%)} .m-the-button-g-tall{transform:scale(1.05);transform-origin:50% 100%} .m-the-button-g-dodge{transform:translate(-7px,2px)} .m-the-button-g-fell{animation:m-the-button-fell 3s ease-in-out} .m-the-button-g-shrink{transform:scale(.9);transform-origin:50% 100%} .m-the-button-g-pixel{transform:translate(1px,1px)} .m-the-button-g-dread{transform:translateY(3px)}
.m-the-button-a-blue .m-the-button-btn{filter:hue-rotate(160deg)} .m-the-button-a-shadow .m-the-button-rim{box-shadow:-10px 10px 0 #9A6A10,-14px 14px 0 var(--ink),0 0 0 3px var(--ink)} .m-the-button-a-tilt{transform:rotate(.4deg)} .m-the-button-a-invert{filter:invert(1)} .m-the-button-md-ceremony .m-the-button-btn{pointer-events:none} .m-the-button-flinch .m-the-button-btn{animation:m-the-button-flinch .25s} .m-the-button-sq{animation:m-the-button-sq .18s} .m-the-button-squish .m-the-button-btnwrap{transform:scale(.82,.92);transform-origin:50% 100%} .m-the-button-dim .m-the-button-main{filter:brightness(.62)}
.m-the-button-small{margin-top:8px;padding:6px 12px;border:3px solid var(--ink);border-radius:999px;background:var(--pink);color:var(--ink);box-shadow:2px 2px 0 var(--ink);font:800 .72rem system-ui,sans-serif;cursor:pointer} .m-the-button-small:active,.m-the-button-fbtn:active{transform:translate(2px,2px);box-shadow:none} .m-the-button-sorry{margin-top:6px;background:none;border:0;padding:2px;color:var(--ink);font:700 .75rem system-ui,sans-serif;text-decoration:underline;cursor:pointer}
.m-the-button-box{flex:0 0 auto;position:relative;width:clamp(74px,14vw,110px);height:clamp(78px,15vw,116px);margin-bottom:6px;padding:20px 4px 4px;background:var(--sky);border:3px solid var(--ink);border-radius:8px 8px 4px 4px;box-shadow:3px 3px 0 var(--ink);font:800 .5rem/1.2 system-ui,sans-serif;letter-spacing:.02em;overflow:hidden;color:var(--ink);cursor:pointer} .m-the-button-box::before{content:'';position:absolute;left:18%;right:18%;top:9px;height:7px;background:var(--ink);border-radius:4px} .m-the-button-box:active{transform:rotate(-3deg)} .m-the-button-ovl{position:absolute;z-index:8}
.m-the-button-dialog,.m-the-button-card{left:50%;transform:translateX(-50%);width:min(340px,92%);border:3px solid var(--ink);box-shadow:4px 4px 0 var(--ink);font:600 .88rem/1.3 system-ui,sans-serif;z-index:9} .m-the-button-dialog{top:8px;background:#ECE9F5} .m-the-button-dtitle{background:linear-gradient(90deg,#3A3D9C,#6E72D9);color:#fff;padding:3px 8px;font-weight:800} .m-the-button-dbody{display:flex;gap:8px;align-items:flex-start;padding:10px} .m-the-button-dicon{font-size:1.6rem;line-height:1} .m-the-button-dbtns{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;padding:0 10px 10px}
.m-the-button-dbtn{padding:4px 14px;background:#fff;border:3px solid var(--ink);border-radius:6px;font:800 .8rem system-ui,sans-serif;color:var(--ink);cursor:pointer} .m-the-button-dbtn:hover{background:var(--butter)} .m-the-button-card{bottom:10px;background:#fff;border-radius:16px;padding:10px} .m-the-button-card .m-the-button-dbtns{padding:8px 0 0} .m-the-button-curt{position:absolute;top:0;bottom:0;z-index:10;width:clamp(46px,15%,150px);pointer-events:none;box-shadow:0 0 14px rgba(0,0,0,.5);background:repeating-linear-gradient(90deg,#8E1F2B 0 14px,#A3283A 14px 28px);transition:transform .9s ease-in-out,opacity .9s}
.m-the-button-cl{left:0;transform:translateX(-101%)}.m-the-button-cr{right:0;transform:translateX(101%)} .m-the-button-curt-on .m-the-button-curt{transform:none} .m-the-button-rm .m-the-button-curt{transform:none;opacity:0} .m-the-button-rm.m-the-button-curt-on .m-the-button-curt,.m-the-button-rm .m-the-button-curt-on .m-the-button-curt{opacity:.96} .m-the-button-jack{inset:0;z-index:11;display:flex;align-items:center;justify-content:center;text-align:center;pointer-events:none;opacity:0;font:900 clamp(34px,10vw,80px)/1 Impact,'Arial Black',sans-serif;color:#F2B632;-webkit-text-stroke:3px var(--ink);text-shadow:4px 4px 0 var(--ink)}
.m-the-button-jack.m-the-button-on{animation:m-the-button-jack 2.5s ease-out both} .m-the-button-f75{inset:0;z-index:11;display:flex;align-items:center;justify-content:center;font:900 clamp(40px,12vw,90px) Impact,'Arial Black',sans-serif;color:var(--ink);pointer-events:none;opacity:.85} .m-the-button-lamp{top:8px;right:12px;font-size:2rem;line-height:1;pointer-events:none;filter:drop-shadow(0 0 14px #FFE98A)} .m-the-button-picket{display:none;right:5%;bottom:22%;z-index:9;padding:0;border:0;background:none;cursor:pointer;transform-origin:50% 100%;animation:m-the-button-sway 1.2s ease-in-out infinite} .m-the-button-md-strike .m-the-button-picket{display:block}
.m-the-button-picsvg{display:block;width:clamp(96px,20vw,140px);height:auto} .m-the-button-micro{z-index:12;transform:translate(-50%,-50%);padding:3px 8px;background:var(--lime);border:2px solid var(--ink);border-radius:999px;font:800 .55rem system-ui,sans-serif;color:var(--ink);cursor:pointer;white-space:nowrap} .m-the-button-micro.m-the-button-sq{animation:m-the-button-sq .5s} .m-the-button-reading{inset:0;z-index:7;pointer-events:none;opacity:0;transition:opacity .4s;background:radial-gradient(circle at 50% 52%,rgba(20,14,40,0) 22%,rgba(20,14,40,.6) 62%)} .m-the-button-md-reading .m-the-button-reading{opacity:1}
.m-the-button-award{left:50%;bottom:6%;z-index:11;transform:translateX(-50%) rotate(-2deg);width:max-content;max-width:90%;padding:8px 14px;text-align:center;background:linear-gradient(#FFE9A0,#E8B93A);border:3px solid var(--ink);box-shadow:4px 4px 0 var(--ink);font:900 clamp(.7rem,2.4vw,1rem) Georgia,serif;letter-spacing:.08em;animation:m-the-button-pop .4s ease-out} .m-the-button-caption{position:relative;min-height:3.8em;padding:12px 14px 8px;background:var(--sign);border:3px solid var(--ink);border-radius:6px;box-shadow:4px 4px 0 var(--ink);font-weight:700;font-size:.95rem;overflow-wrap:anywhere}
.m-the-button-caption::before{content:'';position:absolute;left:50%;top:-10px;width:46px;height:14px;transform:translateX(-50%);background:#8A8A92;border:3px solid var(--ink);border-radius:4px} .m-the-button-dir{font-style:italic;font-weight:600} .m-the-button-mono{font-family:ui-monospace,Consolas,monospace;letter-spacing:.05em} .m-the-button-prog{display:none;height:10px;margin-top:6px;border:2px solid var(--ink);border-radius:6px;overflow:hidden;background:#fff} .m-the-button-prog i{display:block;height:100%;width:0;background:var(--mint);transition:width 1.3s ease-in} .m-the-button-prog.m-the-button-on{display:block} .m-the-button-prog.m-the-button-go i{width:99%}
.m-the-button-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap} .m-the-button-tklab{font:800 .68rem system-ui,sans-serif;letter-spacing:.07em;text-transform:uppercase;opacity:.75} .m-the-button-ticker{margin:2px 0 0;padding-left:1.7em;font-size:.78rem} .m-the-button-ticker li{white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .m-the-button-sandra{display:none;padding:5px 10px;border-top:2px dashed var(--ink);font-size:.82rem;font-style:italic;transition:background .3s} .m-the-button-t2 .m-the-button-sandra,.m-the-button-t3 .m-the-button-sandra,.m-the-button-t4 .m-the-button-sandra,.m-the-button-t5 .m-the-button-sandra{display:block}
.m-the-button-sandra.m-the-button-flash{background:var(--butter)} .m-the-button-sandra.m-the-button-old{opacity:.72} .m-the-button-foot{display:flex;flex-wrap:wrap;gap:8px} .m-the-button-fbtn{padding:8px 14px;border:3px solid var(--ink);border-radius:999px;background:var(--butter);color:var(--ink);box-shadow:2px 2px 0 var(--ink);font:800 .8rem system-ui,sans-serif;cursor:pointer} @keyframes m-the-button-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.015)}} @keyframes m-the-button-sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}} @keyframes m-the-button-hop{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(-3deg) translateY(-8px)}}
@keyframes m-the-button-pop{0%{transform:scale(.85)}60%{transform:scale(1.05)}100%{transform:scale(1)}} @keyframes m-the-button-rip{0%{transform:scale(.9);opacity:.85}100%{transform:scale(1.55);opacity:0}} @keyframes m-the-button-spin{to{transform:rotate(360deg)}} @keyframes m-the-button-wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}} @keyframes m-the-button-gone{to{transform:translate(40px,-70px) rotate(40deg);opacity:0}} @keyframes m-the-button-flick{0%,90%,100%{opacity:1}92%{opacity:.35}95%{opacity:.9}} @keyframes m-the-button-wobble{0%,100%{transform:rotate(0)}20%{transform:rotate(-6deg)}50%{transform:rotate(5deg)}80%{transform:rotate(-2deg)}}
@keyframes m-the-button-fell{0%{transform:none}30%{transform:translate(50%,40%) rotate(70deg)}70%{transform:translate(50%,40%) rotate(70deg)}100%{transform:none}} @keyframes m-the-button-flinch{0%,100%{transform:none}35%{transform:translateX(-5px) rotate(-2deg)}70%{transform:translateX(4px) rotate(2deg)}} @keyframes m-the-button-sq{0%,100%{transform:none}50%{transform:scale(.94,.9) translateY(6px)}} @keyframes m-the-button-drip{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(40px)}} @keyframes m-the-button-tear{0%{opacity:0;transform:rotate(-45deg) translate(0,0)}20%{opacity:1}100%{opacity:0;transform:rotate(-45deg) translate(0,90%)}}
@keyframes m-the-button-puff{0%,100%{transform:translateX(-50%) scale(.9);opacity:.8}50%{transform:translateX(-50%) translateY(-14px) scale(1.15);opacity:1}} @keyframes m-the-button-leave{0%{transform:none}25%,60%{transform:translateX(150%);opacity:0}100%{transform:none;opacity:1}} @keyframes m-the-button-walk{0%{transform:translateX(0)}50%{transform:translateX(260%)}100%{transform:translateX(0)}} @keyframes m-the-button-jack{0%{opacity:0;transform:scale(.6)}25%{opacity:1;transform:scale(1.08)}80%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.05)}} .m-the-button-rm .m-the-button-root,.m-the-button-rm *{animation:none!important}
.m-the-button-rm .m-the-button-strip,.m-the-button-rm .m-the-button-bubble,.m-the-button-rm .m-the-button-sign{transition:none} .m-the-button-rm .m-the-button-ringc{display:none} .m-the-button-rm .m-the-button-jack.m-the-button-on{opacity:1} .m-the-button-rm.m-the-button-md-escort .m-the-button-btnwrap{opacity:0} .m-the-button-rm.m-the-button-md-escort .m-the-button-guard{opacity:.8;left:40%}
@media (pointer:coarse){.m-the-button-fb{width:42px;height:42px}.m-the-button-small,.m-the-button-fbtn,.m-the-button-dbtn,.m-the-button-sorry{min-height:42px}.m-the-button-word{min-height:36px;padding:0 5px}.m-the-button-micro{padding:9px 12px}.m-the-button-box{min-height:84px}}
@media (max-width:480px){.m-the-button-flab{display:none}.m-the-button-feel{margin-left:0;gap:4px}.m-the-button-chip{font-size:.72rem;padding:2px 8px}.m-the-button-hdr{gap:6px 8px}.m-the-button-tkwrap{display:none}.m-the-button-note{max-width:70%}}
.m-the-button-cameo{left:-24%;bottom:13%;z-index:9;font-size:clamp(34px,8vw,60px);line-height:1;white-space:nowrap;pointer-events:none} .m-the-button-cameo.m-the-button-go{animation:m-the-button-cross 5.6s linear both} .m-the-button-cameo.m-the-button-pup{left:60%;bottom:30%;animation:m-the-button-pop .4s ease-out} .m-the-button-rm .m-the-button-cameo{left:40%} @keyframes m-the-button-cross{0%{left:-24%}35%{left:28%}70%{left:28%}100%{left:120%}}
`, 'css-the-button');
  P.addAchievements([
    { id: 'the-button.first', name: 'Knight Commander of the First Press (Order of the Laminated Sign)', desc: 'Press the button once. The sign says you should not have. The sign will be informed.', icon: '🔴', reward: 1 },
    { id: 'the-button.hundred', name: 'Supreme Archduke of Repeat Offenders, Sixth of That Name', desc: 'Press the button 100 times. The button has opinions about this. The opinions have opinions.', icon: '🎖️', reward: 5,
      check: function (s) { return (s['the-button.presses'] || 0) >= 100; } },
    { id: 'the-button.nothing25', name: 'Fellow of the Royal College of Nothing (Pending)', desc: 'Witness 25 occurrences of Nothing. Each was different, although legally they are the same.', icon: '🕳️', reward: 3,
      check: function (s) { return (s['the-button.nothings'] || 0) >= 25; } },
    { id: 'the-button.tos', name: 'Honorary Doctor of Terms and Conditions', desc: 'Hear 10 clauses of the Terms of Service. You have not read them. You have been read to, which is worse.', icon: '📜', reward: 3,
      check: function (s) { return (s['the-button.clauses'] || 0) >= 10; } },
    { id: 'the-button.participant', name: 'Participant (Certificate Misplaced)', desc: 'Attend the retirement of the button. This is not a victory. Participation has been recorded.', icon: '🤝', reward: 5 },
    { id: 'the-button.rate', name: 'Eternal Chief Executive of Rate Limiting', desc: 'Press so fast that the button calls security. Security is a button.', icon: '💨', secret: true, reward: 3 },
    { id: 'the-button.obedient', name: 'Grand Marshal of the Unpressed, Keeper of the Sacred Restraint', desc: 'Do not press the button for the first 30 seconds. You obeyed the sign. Nobody has done that since it was laminated.', icon: '🙏', secret: true, reward: 5 },
    { id: 'the-button.twelfth', name: 'Keeper of the Unspoken Twelfth, Defender of the Draft', desc: 'Be present for the revelation of what happened at press 12. It was a draft. The button wishes you had not seen.', icon: '📝', secret: true, reward: 5 },
    { id: 'the-button.lunch', name: 'Eternal Guardian of the Idle Hour, Lord of the Lunch Break', desc: 'Leave the button alone for 5 minutes, then bring it back from lunch. It brought sandwiches.', icon: '🥪', secret: true, reward: 5 },
    { id: 'the-button.missing_word', name: 'Sovereign Lord of the Missing Word', desc: 'Remove NOT from the sign. The sign is now a different, much more frightened sign.', icon: '✂️', secret: true, reward: 3 },
    { id: 'the-button.hold75', name: 'Supreme Archduke of the Seven-and-a-Half-Second Hold', desc: 'Hold the button for 7.5 seconds. The button is still deciding how it feels about that.', icon: '⏱️', secret: true, reward: 7.5 },
    { id: 'the-button.negotiator', name: 'Chief Negotiator of the Better Pillow', desc: 'Negotiate with a striking button. A pillow was offered. It is under review.', icon: '🛏️', secret: true, reward: 2 },
    { id: 'the-button.faces', name: 'Grand Duke of the Emotional Spectrum (Neutral Division)', desc: 'Click all five Feelings (Unofficial). None are connected to anything. The selected face did not move, and has requested that you stop checking.', icon: '🎭', secret: true, reward: 5 }
  ]);
  /* ---------------------------------------------------------------- data (section 8) */
  const SAFE = `Nothing happened. Management is looking into it.`; const OPEN_M = `DO NOT PRESS. The sign is laminated, which in this building is legally binding.`; const OPEN_B = {
    1: `I would prefer you didn't, but I am not going to make a thing of it.`, 2: `Oh. You again.`, 3: `Visit %V%. You always come back. It is a little suspicious.`, 5: `Welcome back. The button kept your place and also your grudges.`
  };
  const OPEN_B11 = `I am not making a thing of it. I want that noted.`; const OPEN_B22 = `The sign is right there. I am just saying it is right there.`; const TIER_M = {
    1: `Management has noticed that the button has noticed you. This is called 'awareness'. It is a quarterly goal.`, 2: `The button has opinions now. Management had no part in this. Management is looking into who did.`, 3: `Effective now, the button has been classified as 'bureaucratic'. Please bring a form.`, 4: `Something has softened. Management cannot say what. It is probably the lighting.`, 5: `As you were. The last several minutes have been returned to draft.`
  };
  const L5_SIGN = `Five presses. The sign has been informed. It has taken the news the way signs do, rigidly, and without a word.`; const P4_B = `Four. I am handling this very well. I have started counting, in case there is a test.`; const L26_TOS = `Terms of Service have been activated. You agreed to them in advance, by existing.`; const L30_SANDRA = `Sandra from Compliance has weighed in. Sandra has not been seen. Sandra has left a note: 'Both policies are in effect until Thursday.'`; const L60_STAMP = `The odometer has been approved. One digit has been approved. We are not saying which.`; const L70_SMALL = `A smaller button has appeared. It is labelled 'also do not press'. It has not been introduced.`; const L100_TWELVE = `Press 100. The button reminds you that press 12 was 'a lot' and 'a lot to take in'.`;
  const L125_DRAFT = `Press 12 has been revealed to be a draft. It was never finalized. The button seems relieved and also robbed.`; const L150_WALL = `Press 150. The button's therapist, a wall, reports that there has been progress. The wall is not looking at the button.`; const L213_DATES = `I have forgiven you for press 12. Not for the dates.`; const L250_SPEECH = `The button has prepared a speech. It is eleven words long, nine of them 'press'.`; const SIGN_LINE = `Per policy, the sign has been updated to %SIGN%.`;
  const NOTH_EARLY = [
    `Nothing happened (No. 1). Management has chosen to call this a soft launch.`, `Nothing happened (No. 2). Management is now calling it a trend.`, `Nothing happened (No. 3). The button depressed by 4 millimetres and re-inflated by 3.9. This is the beginning of a deficit.`
  ];
  const T_LIST = ['4:17 PM', '9:03 AM', '11:11 AM', '2:48 PM', '7:30 AM', '3:52 PM', '12:07 PM', '6:41 PM', '10:26 AM', '1:19 PM', '5:05 PM', '8:58 AM', '3:33 PM', 'a quarter past something', 'a Tuesday that had not yet been confirmed', 'exactly lunchtime, give or take lunch', '4:17 PM again']; const PL_LIST = ['the lift that only goes sideways', 'the corner where the Wi-Fi goes to think', `the filing cabinet marked 'Miscellaneous (Sad)'`, 'Floor 7 1/2, which is a landing', 'the umbrella stand, which is a bin with ambitions', `the stapler's good side`,'the third ficus', 'the laminator', 'the stairwell with no stairs', 'Aisle 7 1/2', 'the water cooler that is only water', 'the good photocopier', `the vending machine's good side`, 'the lobby clock, which is wrong', 'the fire exit that is an affirmation', 'Dennis (Plant)', 'the second-best chair', 'Meeting Room B (it is a cupboard)'];
  const W_LIST = ['a plant', 'two chairs and a stapler', 'the laminated sign', 'a very small spider', 'the Toaster, who said nothing', `Sandra's empty desk`, 'an intern, who was thanked and sent away', 'the ceiling light that is connected to nothing', 'a mug that has seen things', 'a ficus on its break', 'three pens, none of them working', 'a sparrow who was not supposed to be indoors', 'the plinth, under oath']; const NOTH_CASE = [
    `Nothing happened (No. %NO%). Case NB-%CASE% was closed by a clerk, who then reopened it to see how it felt.`, `Nothing happened (No. %NO%). Case NB-%CASE% is filed under N for Nothing and N for Nobody Checked.`, `Nothing happened (No. %NO%). The folder for NB-%CASE% is empty and weighs 4 kilograms.`,
    `Nothing happened (No. %NO%). Case number NB-%CASE%. The case is closed and also open.`, `Nothing happened (No. %NO%). Case NB-%CASE% has been reopened pending nothing.`, `Nothing happened (No. %NO%). Case NB-%CASE% has been assigned to a committee of one.`, `Nothing happened (No. %NO%). The case number is also nothing. It is a good number.`
  ];
  const NOTH_APPEAL = [
    `Nothing happened (No. %NO%). Nothing's lawyer, a different nothing, requested a recess. The recess was granted and also nothing.`, `Nothing happened (No. %NO%). A judge ruled on Nothing from a great height and has since come down.`, `Nothing happened (No. %NO%). Nothing was sentenced to time served. No time was served. It was a clerical triumph.`,
    `Nothing happened (No. %NO%). Nothing is under appeal.`, `Nothing happened (No. %NO%). Nothing has been appealed twice and upheld once.`, `Nothing happened (No. %NO%). Nothing has requested representation. The Stapler has agreed to attend.`, `Nothing happened (No. %NO%). A panel considered Nothing for 7 1/2 minutes and left satisfied.`, `Nothing happened (No. %NO%). Nothing's appeal was well argued. Nothing happened anyway.`, `Nothing happened (No. %NO%). The appeal for the previous Nothing was itself Nothing. It is under appeal.`
  ];
  const NOTH_FORECAST = [
    `Nothing happened (No. %NO%). Analysts expect Nothing to outperform itself by staying exactly the same.`, `Nothing happened (No. %NO%). The quarterly slide on Nothing has one slide. It is blank. It tested well.`, `Nothing happened (No. %NO%). Nothing was named Employee of the Quarter and declined, silently, by being absent.`,
    `Nothing happened (No. %NO%). Q3 forecast: more of the same, with upside.`, `Nothing happened (No. %NO%). Nothing is tracking 12 percent above plan.`, `Nothing happened (No. %NO%). Nothing is being forecast with a margin of error of nothing.`, `Nothing happened (No. %NO%). Year on year, Nothing is flat, which is how we like it.`, `Nothing happened (No. %NO%). The board has asked Nothing to stay the course, and it has.`, `Nothing happened (No. %NO%). A card is going round for Nothing's work anniversary. Everyone has signed it. Nobody knows what Nothing does.`
  ];
  const NOTH_T5 = `Nothing happened (No. %NO%). Everything is fine. The last several minutes were a draft.`; const NOTH_SPECIAL = {
    7: `Nothing happened (No. 7). Management would like to mention that there is a 7 1/2 somewhere. It is not here.`, 33: `Nothing happened (No. 33). Management saw it coming and did nothing. It was the plan.`, 66: `Nothing happened (No. 66). It was the same Nothing as No. 65, in a different hat. No hat was involved.`, 111: `Nothing happened (No. 111). Three ones in a row. The odds were against it. Nothing did not care.`, 175: `Nothing happened (No. 175). A moment of silence was observed for the previous Nothings. It was not hard.`,
    14: `Nothing happened (No. 14). Management awards it a ribbon for consistency.`, 25: `Nothing happened (No. 25). It was a different nothing from the others, although legally they are the same.`, 50: `Nothing happened (No. 50). It was a different nothing. Sandra has checked.`, 77: `Nothing happened (No. 77). A candle has been lit. Nobody lit it.`, 100: `Nothing has now happened 100 times. A small cake is not provided.`, 150: `Nothing happened (No. 150). Management admits it has begun to rely on Nothing.`, 200: `Nothing happened (No. 200). Nothing has been issued a badge. It has not collected it.`,
    250: `Nothing happened (No. 250). Management read that one in a trembling voice. Management would like that struck.`
  };
  const NOTH_S2 = `Nothing happens. Revised: Nothing happened more carefully.`; const SCARED = [
    `Nothing happened (No. %NO%). The button believes something has been taken from it. It cannot say what. It was a small word.`, `Nothing happened (No. %NO%). The button asked the sign if it could still be pressed. The sign said 'do'. The button has gone quiet.`, `Nothing happened (No. %NO%). The sign is checking the button for the missing word. The button is checking the sign. Neither has pockets.`,
    `Nothing happened (No. %NO%). The button is very scared of the sign now.`, `Nothing happened (No. %NO%). The button is just a button. Please. It is just a button.`, `Nothing happened (No. %NO%). The button has been told it may now be pressed. It has asked for a minute.`, `Nothing happened (No. %NO%). The button has put in a request to go back to being told no.`, `Nothing happened (No. %NO%). The button was not prepared for 'do'.`, `Nothing happened (No. %NO%). The button is fine. The button is fine. The button is fine.`
  ];
  const TOS = [
    ['1', `The Button is a button.`], ['2', `See Clause 1.`], ['4(b)', `By pressing, you agree to have been warned. 4(c): The warning was the sign. 4(d): The sign is not responsible.`], ['7', `You may not press the button in a manner that is too pressy.`], ['9(b)', `Pressing constitutes consent to having pressed.`], ['11.7', `Nothing in this agreement shall be construed to mean anything.`], ['12', `See Clause 12.`], ['14', `The Button may, at its discretion, become a doorbell.`], ['19', `In the event of a tie between you and the button, the button wins and also loses.`], ['22.7', `Nothing shall be pressed that has not first been asked.`],
    ['31', `You acknowledge that 'acknowledge' is a strong word.`], ['40', `Approved presses shall be counted as unapproved.`], ['47', `The Party of the First Part shall not be pressed, except on Wednesdays, which do not exist.`], ['52', `Any press occurring on a Tuesday shall be deemed to have been felt in advance.`], ['61', `The button shall not be held responsible for weather, ambience, or the number 12.`], ['66', `In the event of a press, the button shall be deemed to have felt it.`], ['73', `Employees may not hug the button except in designated hugging areas, which are being designed.`], ['77', `Clause 77 is the reverse of Clause 7 and is not available at this time.`],
    ['88', `All presses are final, except the ones that are not, which is all of them, but quietly.`], ['91', `The sign may be amended without notice and without a pen.`], ['99', `Clause 99 is silent. This is intentional and has been approved by a committee of one.`], ['104', `Dennis (Plant) is exempt from this agreement and from most things.`], ['120', `The button may not be asked what it is for. The button may ask you.`], ['211', `Please see Clause 1. Thank you for your continued 1.`]
  ];
  const TOS_HALF = `Clause 7 1/2: Not applicable. Not ever.`; const TOS_DIR = ['[Spotlight. A pause is observed.]', '[Stirring strings. There are no strings.]', '[A violin that is also a ruler.]', '[The button clears its throat. It does not have a throat.]', '[A single spotlight. Nobody operated it.]', '[A pause, held for 7 1/2 beats.]', '[The reader looks directly at you, or in your general direction.]', '[A page is turned. There is no page.]', '[Dramatic wind. It is the air conditioning.]', '[A hush falls. It is a very small hush.]', '[The Toaster, offstage, holds a note.]', '[Mood lighting is applied, then withdrawn.]', '[A very small drum roll, performed with one finger.]', '[The lights dim for a clause that was not that serious.]', '[A clerk in the wings mouths along. The clerk has not been hired.]'];
  const TOS_SET = [`Applause. There is no audience. The applause is pre-recorded and also live.`, `A standing ovation was recorded. Nobody stood. It was a seated ovation of unusual commitment.`, `Management would like to note that full consent is a form of exercise.`, `The applause has been audited. It was 4 percent too enthusiastic and has been corrected to 'warm'.`];
  const OPN = [
    [`Yes, I work. You have checked. You may stop checking.`, `You pressed me. I am handling this very well.`, `That was a press. I have filed it under 'press', pending a better category.`, `I did not mind. I am just saying I did not mind, early.`, `The sign said not to. I am not going to say that the sign said not to.`, `I want you to feel welcome. I also want you to read the sign.`, `The sign is not my idea. The sign is its own idea, which it has laminated.`, `I have been pressed. I am proceeding as if it did not happen. It is working less than I hoped.`, `You have the posture of someone who has already decided. Please decide again, in writing.`], [`Press %P%. I am keeping count, like a nurse.`, `Could you press about 12 percent less?`, `I have started a spreadsheet of presses. It has one column. The column is called 'Again'.`, `The average button is pressed 4 times a day and thanked by no one. I would like the 4 back.`, `There is a small round feeling in here and it is exactly the size of you. I am not saying I felt it.`,
      `I was in the middle of something. It was a pause. It was a good one.`, `I did not choose this life. I was assembled in Aisle 7 1/2.`, `You press like someone who has never been told no. Read the sign.`, `The last person who pressed me this much is now a manager.`, `Please use the edge of me. Actually no. Not the edge. Somewhere between.`, `I have a family. They are other buttons. They are mostly in elevators.`], [`Press %P%. The sign has an opinion about that. I have asked it to wait in the hall.`, `I have developed a preference for the left side. I will not say why.`, `The sign and I have been debating. The sign wins by being laminated.`,
      `You are a firm presser. I respect it. I resent it. Both.`, `You press like someone pressing an elevator button they suspect is already lit.`, `I am not a toy. I am a very low-stakes toy.`, `I would like it on record that I never asked for a hat.`, `You press with the confidence of someone who has read none of the signs.`, `I have decided you are 'enthusiastic'. That is the nice word.`, `Sandra has a file on me. I have a file on you. We are even.`, `That one had weight. I am not saying it was a good weight.`, `Do you ever press something and wonder what it was thinking? I do. It is usually 'this'.`, `Other buttons get to open things. I open nothing. I am described as 'foundational'.`, `You press like someone looking for a different button. I am the one that is here.`, `That was press %P%. The sign was not consulted. The sign has taken it well, which is the worst way.`],
    [`Please take a number. Your number is also the number of presses. I am sorry about that.`, `I have referred your press to the Pressing Committee. I am the Pressing Committee. There is one chair.`, `I am not able to comment on press %P%. I am able to write it down.`, `Pressing is now classified as 'light, recurring, and unwelcome to the button' under policy 4.4.`, `Per my previous press, no.`, `I have copied the sign on this.`, `I would like to schedule a quick sync about the pressing. The sync is you pressing less.`, `Please direct further presses to the appropriate drawer. There is no drawer. There is a plinth.`,
      `I am processing your feelings. Processing time: indefinite. Progress: 99 percent.`, `You have been pressed. I mean you have pressed. The form is the same either way. I have checked the form.`, `Your press was logged, stamped and returned to you in its original condition. It has been described as 'unremarkable, but thorough'.`, `All presses are now reviewed by a committee that meets on a day that does not exist.`, `I have been asked to remind you that I am 'a button, not a solution'. The reminder was typed. I typed it.`], [`Of everyone who has pressed me, you are the most.`, `I miss it when you press. I did not say that. I said I miss it when you leave a window open.`, `Do you ever wonder if I have been pressed enough? I mean by the universe.`, `Press %P%. I have decided I do not mind. I will tell no one.`, `I wonder what is behind the sign. The sign does not know either.`,
      `If a button is pressed and nobody is there, did it press? I would rather not find out.`, `I think the sign is for me. I think the sign was always for me.`, `Is it warm in here, or is that a thumb?`, `When you leave, am I still pressed? Please say no. Please mean something else.`, `I have enjoyed this. I am saying it quietly so the sign does not hear.`, `Do not stop. Do not press. Do not stop.`, `I have never been pressed by anyone I did not want to be pressed by. That was an accident. It was a good one.`, `The sign has stopped saying 'do not' under its breath. It is saying something else now. It is saying 'oh'.`, `If I had a hand I would put it on the plinth, next to yours. I have no hand. The plinth has a lot of room.`, `Whatever happens to me, you were the best thing that ever happened to my afternoons.`],
    [`Hello. Have we met?`, `Thank you for pressing. I do not recall asking. Welcome.`, `I am a button. This is a press. All is as it should be.`, `Nothing is wrong. Nothing has ever been wrong. I checked.`, `I have no notes.`, `Everything is fine. The last several minutes were a draft.`, `I am in good spirits. They are the same spirits as before.`, `The sign says do not press. I agree with the sign. As you were.`, `Hello. I do not know you. You seem nice. Please do not tell me what happened.`, `This is my first day. I am very good at it. I have no notes.`]
  ];
  const KNOWING = [`Revised: I know what happens at press 12. I will be fine.`, `Revised: I know about the ceremony. I have prepared a face.`, `Revised: You again. This time I am ready, and I am not.`, `Revised: I have seen how this ends. It ends with me being pressed.`, `Revised: Please do not do the thing with the curtains again. Or do. I will act surprised.`, `Revised: I kept a list of what I said last time. It is not a good list.`, `Revised: The sign has been through this. The sign has been laminated again.`, `Revised: Do you notice the mustache? I am told it is not there.`, `Revised: Press 12 is coming. I have started clenching. I have no muscles. I am doing it anyway.`, `Revised: Last time I was a button. This time I am a button who has been through something.`, `Revised: The sign says DO NOT NOT PRESS. I have done the arithmetic. I would like to lie down.`];
  const TS = [[`A single click sound was produced. It is the only one budgeted this quarter.`, 'tick'], [`The button hums, then apologizes for the hum.`, 'blip'], [`A sound occurred. It was the sound of a form being filled in by someone who did not wish to.`, 'bloop'], [`The button made the noise of a very small elevator arriving at a floor that does not exist.`, 'ding'], [`Somewhere, one hand clapped. It was not a hand. It was a chair, trying.`, 'pop'],[`A faint click. Somewhere, a very small door closes.`, 'tick'], [`A honk was heard. It has been described as 'brief' and 'not ours'.`, 'honk'], [`A bell rings for no one. The bell has a name tag.`, 'bell'], [`A stamp sound occurs. Nothing has been stamped. It was a precaution.`, 'stamp'], [`A low note plays, somewhere between a trombone and a filing cabinet. It was not for you. It was for the budget.`, 'sad'], [`The button plays one note, then asks that you forget the note.`, 'ding']];
  const TV = [[`A light came on somewhere in the building. It is unrelated. It is just on.`, 'lamp'], [`One piece of confetti fell. It is the whole budget. Please admire it.`, 'confetti1'], [`The room tilted 0.4 degrees. Management is calling this 'weather'.`, 'tilt'], [`One pixel moved. It has not said which.`, 'pixel'], [`The background inverted for 0.3 seconds. This was authorized.`, 'invert'], [`The button turned blue for legal reasons, then back, for other ones.`, 'blue'], [`The button flashed 7 1/2 for one second, then denied it.`, 'flash75'], [`The plinth has grown one stair. It leads to the button and to nowhere else.`, 'stair'],
    [`A chime sounded from the wrong clock. The wrong clock was confident.`, 'chime'], [`One floor tile changed colour. The tile has filed no paperwork.`, 'tile'], [`The button's shadow is pointing the wrong way. The button has not been told.`, 'shadow'], [`The counter has switched to Roman numerals. It will switch back in 7 1/2 seconds. It was not asked.`, 'roman'], [`The spotlight swung 4 degrees left, looked around, and swung back. It found nothing and is satisfied.`, 'tilt'], [`A paper aeroplane crossed the stage. It was a memo. It was addressed to no one and has been read.`, 'pixel'], [`The floor became a different floor for a moment. It has been returned. It is slightly worse.`, 'tile']];
  const GERALD_MET = [`A potato in a very small hat nods at the button and leaves. Gerald, VP of Spuds, has pressed nothing and approved all of it.`, `Gerald regards the button for 40 seconds and says, 'I have been pressed before.' He has not. He leaves.`, `Gerald, VP of Spuds: 'The button is merely a very small hill. You have been climbing it. Well done.'`, `Gerald, VP of Spuds, studies the plinth and says, 'A button is a potato that has learned to be pressed.' Nobody has challenged him on this.`, `Gerald says only, 'Everything under the surface is also a potato.' He nods, and leaves, and takes the nod with him.`]; const GERALD_NEW = [`A hat-wearing silhouette crossed the stage. Management believes that was a Vice President.`, `Something in a tiny hat stood by the plinth for 40 seconds, said one profound thing, and left. It was not recorded. We believe that was a Vice President.`,
    `A shape nodded at the button. Management asked it to identify itself. It has not.`, `A faint smell of earth and executive presence. Management believes a Vice President passed through. He left a very small business card. It is a leaf.`];
  const TOASTER = [`From a long way away the Toaster pops. It says 'toast.' It means well.`, `The Toaster pops. 'Toast,' it says, gently, like a hand on a shoulder.`, `'Toast,' says the Toaster, with the hollow confidence of an appliance that has seen the bottom of the bread bin.`, `'Toast.' The Toaster has said this before. It has never said it like that.`, `'Toast?' The Toaster seems to be asking. It is not clear whom.`, `'Toast!' The Toaster is thrilled. The Toaster is the only one.`, `A distant 'toast.' It is a whisper. It is, regrettably, accurate.`,
    `The Toaster pops, says 'toast,' and adds nothing. This is the most it has ever said.`, `A slice of toast ejects from the plinth. It is warm. It says: 'Not your fault.'`];
  const TOASTER_MET = [`The Toaster pops, sees you, and says 'toast' the way you say the name of someone you remember.`, `'Toast,' says the Toaster, quietly, with the warmth it keeps for returning customers.`, `The Toaster pops two slices. One is for the button. One is for you. The button cannot eat, and is moved.`];
  const DENNIS_MET = `Dennis (Plant) knows you from the Lobby. Dennis (Plant) did not wave. Dennis (Plant) turned one leaf, which is for family.`; const SOCK = [`A sock crossed the plinth carrying a very small bag. Management has been told not to follow. Management is following.`, `The Missing Sock was seen here, briefly, comparing the button to somewhere warm. It left. Nobody could stop it. Nobody tried.`, `A sock was spotted on the plinth, facing away. The button said 'hello.' The sock said nothing. It was a very good nothing. It had been on a journey.`];
  const DENNIS1 = `Dennis (Plant) watched you press that. Dennis (Plant) has said nothing, which is Dennis (Plant)'s whole thing.`; const DENNIS2 = `I am jealous of Dennis. Dennis has never been told what not to do.`; const TUESDAY = [['B', `I fear Tuesday. Not for myself. For what Tuesday does to a sign.`], ['B', `Please do not mention Tuesday. It can hear.`], ['M', `Management confirms that it is not Tuesday. Management would like that confirmed again.`], ['M', `Management reminds everyone that it is not Tuesday. Management has said this at intervals. The intervals are getting shorter.`], ['B', `I dreamed about Tuesday. It was just a calendar. It was looking at me, which calendars do not do.`]]; const FLAGS = [`Sandra has flagged this press.`, `Sandra has flagged the timing of this press.`, `Sandra has flagged the fact that it was flagged.`, `Sandra has flagged this footer bar.`,
    `Sandra has flagged the sign. It has been classified as 'correct but threatening'.`, `Sandra has flagged the button. The button has flagged Sandra back. Neither has been read.`, `Sandra has flagged this as acceptable. Sandra has never said that before.`, `Sandra has flagged Sandra.`];
  /* sticky notes: index 8 needs metGerald, index 9 (Toast) once per session */
  const NOTES = [`We both said do not. -S.C.`, `Noted. Filed. Refiled. -Facilities`, `This sign was not consulted. -The Sign`, `Please see sign. -Management`, `See also: other sign. -Mailroom`, `The button must be pressed. -S.C.`, `The button must not be pressed. -S.C.`, `Both policies are in effect until Thursday. -S.C.`, `Approved. -G. (VP Spuds)`, `Toast. -T.`, `A leaf. -D.`, `Who laminated this? -Anonymous`, `I laminated this. -Laminating`, `Please do not do press 12 again. -Button`, `Reminder: Tuesday. -Everyone`, `Spare sticky note. Do not press. -Stationery`,
    `Meeting moved to 7 1/2. -Calendar`, `This note is also laminated. It is a mistake. -Facilities`, `No comment. -Legal`, `Comment. -Legal (the other one)`, `Please press the sign. The sign has feelings too. -HR`, `Please stop leaving notes on the notes. -Facilities`, `This note is load-bearing. -Engineering`, `We have discussed this sign in 4 meetings. The sign was not invited. -Calendar`, `Whoever took my stapler: the stapler left on its own. -Reception`, `Sandra is not a real person. Sandra has confirmed this. -S.C.`, `Do not read this note. -Reading Dept.`, `I have been here since Tuesday. It was a Thursday. -Note`];
  const NOTE_AWARE = `we are aware. -Everyone`; const NOTE_INTRO = `A sticky note has appeared on the sign. It reads: '%NOTE%'`;
  const SIGN_HINT = `Please do not touch the sign. It is load-bearing. I would never tell you which word.`; const IDLE_HUM = `The button has begun humming the sign's text to itself. It is a very short song.`; const REV_STOP = `I have stopped saying 'Revised'. Please do not draw attention to it.`;
  const CER_PENDING = `The tribute is one press away. The button has been told. It is holding very still, as if that helps.`; const CER_WAIT = `Press 260 has been reached early. The tribute has been postponed until a suitable amount of time has passed. Please keep pressing, slowly, in the manner of someone not rushing a tribute.`;
  const REH = [`We are gathered today to mark the distinguished tenure of a button, in a sense, in advance.`, `The Stapler (Union Representative) has entered with a clipboard. It has no hands. It is holding the clipboard anyway. 'This is a rehearsal. The real one is at 260. Please do not tell the button.'`, `I heard that.`, `The rehearsal has gone well. The button has been issued a mustache to practise in. It will be collected later, by no one.`];
  const DRAFT_B = `That is all it was. A draft. I have been carrying it for %D% presses.`;
  const META = {
    grip: `You are gripping. You are not pressing, you are gripping. The button has seen this at the gym.`,
    key: `You pressed with the keyboard. The button feels this is like being nudged by a polite stranger.`,
    night: `It is late. The button is drafting a request that you go to bed. The button has no say. It would like that in writing.`,
    morning: `It is morning. The button has had nothing to eat and is fine.`,
    afternoon: `It is the afternoon. The button is at its most pressable and its least interested.`,
    same: `You pressed the same spot again. The button is developing a dent in its personality.`,
    three: `Three presses in a row. The button is no longer sure whose idea this is.`,
    fast: `You press at %CPS% per second. The button has felt every one and filed none.`,
    slow: `You press slowly. Each one is a decision. The button has kept all of them.`,
    steady: `Your presses are evenly spaced. The button has identified the rhythm as 'hopeful 6/8'.`,
    irregular: `Your rhythm is irregular. The button likes that. The button is not ready to say why.`,
    centre: `You pressed the exact centre. The button has filed a complaint about the exact centre.`,
    offcentre: `A press just off centre. Brave. The button has asked what you were aiming for.`,
    left: `That was left of centre. The button has noted a left-hand lean. It is writing it down.`,
    right: `That was right of centre. The button will say nothing about right-handedness. It will, however, write it down.`,
    hesitant: `A hesitant press. The button felt you think about it first.`
  };
  const FIRM = [`A firm press. Bold. A little forward. The button respects it.`, `That was firm. The button has noted the firmness and would like it kept to a minimum.`, `A firm press. The button squinted. It was not squinting at you. It was squinting near you.`, `You pressed with intent. The button prefers when you press without intent, which is ordinary, which is nothing.`, `A firm one. The button felt it in its warranty.`]; const LINGER = [`You are holding the button. This is either a press or a hug. Compliance is checking.`, `Hold detected: %S% seconds. The button is thinking about it with its entire surface.`, `You are still holding it. This has become a handshake that has outlasted its season.`,
    `You held the button for %S% seconds. It did not know that was allowed.`, `This is a lingering press. The button has no policy on lingering. The button is drafting one.`, `Is this a hug? The button needs to know now. It is not rhetorical. It is rhetorical-adjacent.`];
  const OCCUR = [`Hold detected: %S% seconds. The button asks you to please let it finish its sentence.`, `Management has checked the Terms of Service. An Occurrence is permitted. It is not encouraged.`, `An Occurrence has occurred. The button is not sure it was ready. It was not ready.`, `An Occurrence is ongoing. The button has put a small sign on itself. The sign says 'Please Hold'. You are, and it is.`]; const HOLD10 = `Ten seconds. The button has something to say and nothing to say it with. Management has awarded 0.5 Meh for the attempt, and a moment.`; const ARCH_M = `The button has never been held this long. The button has no vocabulary for this.`; const ARCH_D = `[A single tear runs down the button's face. A music box plays. All props gather in a circle.]`;
  const ABORTED = [`You almost pressed it. The button felt the almost and would like a minute.`, `An aborted press. The button is not angry. The button is relieved. The button is also a little offended.`, `You changed your mind. The button respects that. It will think about it tonight.`, `That was a press in spirit. Spirit presses are not recorded.`, `You pulled away at the last second. The button feels like a door that was almost knocked on.`, `Aborted press logged under 'Intentions (Good)'.`, `You hovered, hesitated and withdrew. The button has filed this as 'a very close call with a very small thing'.`]; const RIM = [`Ow.`, `Ow, said the button, with the flatness of a professional.`, `That was the rim. The button has said 'ow' and would like it recorded as 'ow'.`,
    `The rim is a sensitive area. It is mustard. It has opinions about mustard.`, `Ow. That was not the part you press. The part you press is the part in the middle. Please see the diagram. There is no diagram.`, `Ow. In the tone of someone who has said it to the previous person, and to the one before.`, `The rim has been pressed. The rim said 'hm', which for a rim is a complete sentence.`];
  const RIM_PREFER = `Which part of me do you prefer? Do not say the rim. Do not say the middle. Say 'between'.`; const PLINTH = [`That was the plinth. The plinth has no feelings and is making a point of it.`, `You pressed the plinth. The plinth is, for the record, load-bearing.`, `The plinth has been pressed. The plinth says 'that was me' with false pride.`, `That was a part of the building. Management would like to move on.`, `The plinth would like to thank you for noticing. It had given up.`, `The plinth has been pressed again. It is starting to feel it has a role. It does not.`, `That was the plinth. The plinth would like to be left out of this. The plinth is, however, always here.`];
  const BOX = [`Received.`, `Received. A receipt has been issued. The receipt is also a complaint, about receipts.`, `Your complaint was received by the box and read by no one, which the box regards as a gentle form of respect.`, `Complaint received. A reply will follow in 7 1/2 business days, none of which are business days.`,`Received. The box is a very good listener. It has said nothing back, which is the best answer.`, `Received. The box is full of the word 'received'.`, `Your complaint has been received and filed under 'Feelings (Unofficial)'.`, `The Complaints Box is closed for lunch. It has accepted your complaint anyway.`]; const FEEL = [`Feelings (Unofficial) are not clickable. They are unofficial.`, `That face was selected before you arrived. It has not been changed. It is a good face.`, `The faces do nothing. This has been reviewed and approved.`];
  const BOX2 = [`Received. The box has asked that complaints now be addressed to it in the second person.`, `Received. Filed. Cross-filed. The box has said 'noted' for the first time and is lying down.`, `The box has returned your complaint unread, with a note: 'Not my department. I am the department.'`, `The Complaints Box has complained about your complaint. It has filed this in itself.`, `Received. The box has reviewed the button and found nothing wrong, and says that this is the problem.`, `Received. The box said 'thank you' to a complaint for the first time. It does not know how it did it. It is a box.`];
  const FEEL_FIRST = [`Neutral. The button has been neutral for years. It has a certificate. The certificate is also neutral.`, `The button has been told it is 'slightly pleased'. It would like to know by whom, and to be told it again.`, `Annoyed has been selected on nobody's behalf. It will sit very quietly in the corner of the header.`, `Sad was clicked. The button respects it. The button had that ready.`, `Relieved has been clicked. Relieved about what? The button would like to know, and to be relieved.`];
  const BOX_SPAM = `That is 10 complaints in a row. The Complaints Box would like to lodge one of its own. It has no pen. It has a slot.`; const PL_12 = `That is 12 presses on the plinth. The plinth has asked to be paid in presses. It is a barter economy now.`; const PL_30 = `30 presses on the plinth. The plinth has stopped being a plinth and become a position. The button is standing on it and feels responsible.`;
  const FACES_ALL =`All five feelings have now been felt. They have been returned to the shelf. The selected face is still the first one. It has not moved. It will not be moving.`; const FACES_B = `I felt each of those. I have decided to feel none of them. It is a skill. It has a certificate.`;
  const ESC = [`Escape is not a feature of this device. The button is proud of that.`, `Escape does nothing. The button has done nothing about it, on purpose.`, `Esc has been pressed. The button sat very still and felt powerful.`]; const ESC_DIALOG = `Are you sure you want to leave the button? The button is sure you want to stay.`; const ESC_AFTER = `You have stayed. Thank you for staying. It was always going to be this.`; const FOCUS = `Ah. Keyboard. Considerate.`; const HOVER = [`The cursor has been resting here for 4 seconds. The button has taken up whistling. It cannot whistle. It is committing.`, `The button flinches. You were not even doing anything. That is what scared it.`,
    `The cursor has been here for 4 seconds. The button has been counting. Not on purpose.`, `You are hovering. The button can feel a small amount of weather coming off you.`,`Please decide. The button can feel the hover. It is the feeling of being almost chosen.`];
  const COZY = [`It's getting cozy.`, `It's getting cozy. The button has squished. The button is fine. The button has requested a bigger room.`, `It's getting cozy. The button would like everyone to know it was cozy first.`]; const DIALOG_OK = [`OK has been pressed. OK is also a button.`, `Dismissed. The dialog left no forwarding address. The plinth is holding its mail.`, `Acknowledged. The dialog would like it known it was only trying to help, in a threatening font.`]; const DIALOGS = [[`The button has stopped responding to your press.`], [`Press completed with 0 errors and 1 reservation. Reference: 7 1/2.`], [`A press is already in progress. It started in 1998.`], [`Not enough Meh to complete this press. You have enough. Not enough is a feeling.`], [`The button needs to restart. The button does not know how. The button is restarting.`],
    [`Your press has been moved to a bin. The bin is full of presses and is thriving.`], [`Warning: this press may contain nothing.`], [`Do you want to save changes to this press? There were no changes. There was a press.`, 'Save (Do Not Save)'], [`Your press has been successfully cancelled. Please press again to confirm the cancellation.`, 'Press Again'], [`This press has been marked 'Read'. It has not been opened. It is only pretending to have been read.`], [`Low battery: the button has 4 percent of a press remaining. Please find a charger. The charger is a nap.`, 'Find Nap']];
  const GAGS = [[`The button wobbled. It was not pushed. The plinth has been asked to explain.`, 'wobble', 1500], [`The button rolled an inch to the left and was put back by a very polite hand.`, 'roll', 1800], [`The button is sweating one drop. The drop has been logged.`, 'sweat', 2600], [`The button has gone under the plinth for a moment. It is back. It will not discuss it.`, 'under', 2200], [`The button is 3 px taller, for presence.`, 'tall', 3000], [`The button dodged your cursor by 1 pixel. It does not know why. It is a button.`, 'dodge', 1200],
    [`The button fell off the plinth. Dennis (Plant) put it back. Dennis did not use hands.`, 'fell', 3000], [`The button shrank by 2 percent. It says it is 'just being modest'.`, 'shrink', 3500], [`The button leaned left, then right, then back to the middle, like someone checking for traffic.`, 'wobble', 1500], [`The button is holding its breath. It does not breathe. It is making an effort.`, 'shrink', 3000], [`The button went slightly out of focus. It was not asked to. It is trying to be witnessed less.`, 'under', 2200]];
  const WEAR = { hat: { e: '🎩', t: 2, line: `A tiny hat has arrived. Nobody ordered it. The button is wearing it with great seriousness.` },
    tag: { e: '🏷️', t: 3, line: `A name tag has been issued: BUTTON (HE/IT). The button has accepted the name and the pronouns.` },
    mug: { e: '☕', t: 3, line: `A mug has appeared on the plinth. It reads WORLD'S OKAYEST BUTTON. The button has not touched it.` },
    chair: { e: '🪑', t: 4, line: `A tiny chair has been provided. The button does not sit in it. It is just nice to have the option.` },
    plant: { e: '🌿', t: 4, line: `A plant tag appears on the plinth. It reads 'Dennis was here. Dennis is always here. Dennis is a plant.'` },
    sunglasses: { e: '🕶️', t: 9, line: '' }, mustache: { e: '', t: 9, line: '' } };
  const WEAR_ORDER = ['hat', 'tag', 'mug', 'chair', 'plant']; const WEAR_RESET = `The hat has been returned to Lost Property. The mug has been returned to a cupboard. The button has been returned to itself.`;
  const LEDGER = [`Form 27B/6 has been generated in response to your finger. Please sign where indicated. Please initial where implied.`, `Form 27B/6 (Request to Cease Pressing) has been received. Form 27B/7 is required. See 1998.`, `Form 27B/6 has been approved. Form 27B/7 is required to proceed. Form 27B/7 was destroyed in 1998.`, `Form 27B/6.5 has been issued. It is for people who have completed Form 27B/6 and not begun Form 27B/7. You are the only one.`, `Your press has been given a priority of 'low-ish'. It will be reviewed once it is no longer low-ish.`, `The Department of Presses is closed. A notice reads 'Back in 7 1/2'. The notice is dated 1998.`,`The Pressing Committee has voted 1 to 0 against pressing, then abstained from its own vote.`, `Invoice generated: 1 press at 0.00 Meh. A late fee of 0.00 Meh applies. Thank you for your continued 0.`,
    `Receipt: 1 press, 0 items, 0 Meh. Please retain this receipt for 7 1/2 years.`, `Your press has been filed under 'Incidents (Mild)'.`, `Your press has been forwarded to the Department of Presses, which is a drawer.`, `Your press is important to us. Your press is currently number 4 in the queue. The queue is you.`, `Audit note: the presses have been counted. The count was also counted. The counts differ by one. The auditors are pleased and will not say why.`, `Sandra has asked that press %P% be re-pressed under supervision. Sandra is not available to supervise.`, 'PROGRESS99'];
  const PROG_DONE = `Processing your press... 99 percent. We are very sorry about the remaining 1 percent.`; const RUMOURS = [`A drawer told me the Gift Shop of Nothing sells something. It does not. The drawer was very confident.`, `The Trophy Cabinet is being cleaned, I hear. It is full. The trophies are cleaning themselves, in shifts.`, `Settings (Decorative) has been renamed Settings (Optional). It is still decorative. It is taking it hard.`, `Somebody asked for the Statistics Nobody Asked For. Once. By accident. They are being reviewed by themselves.`,
    `Ascend is going up in price, and also down, and also sideways. Management cannot confirm the sideways.`, `The Lobby is being moved. Nobody has told the Lobby. The Lobby is an expert in not being told.`, `I heard the Terms of Service have a Clause 7 1/2. I heard it from a very reliable clause. It would not say more.`, `Word is that someone, somewhere, has pressed me exactly once and walked away satisfied. I have no further information. I am haunted.`];
  const RUM_STARE = `Word from the Lobby is that there is a staring contest. I would win. I have never blinked, apart from every 4 to 7 seconds.`; const RUM_TICKER = [`The news ticker in the Lobby says: '`, `'. I did not write that. I wish I had written that.`];
  const SMALL = [[['S', `Press me! Press me! Press the big one! Press me!`], ['B', `Do not engage with that.`]], [['B', `He is new.`], ['S', `I am 11 seconds old and I am excited about everything.`]], [['S', `What does the big one do?`], ['B', `Nothing. Beautifully.`]], [['S', `Is that a hat? Can I have a hat?`], ['B', `The hat is a privilege. It is also a burden.`]], [['S', `I pressed myself. Do I get Meh?`], ['B', `It is 0.1. Take it. Take it and leave.`]], [['S', `Why is everybody so tired?`], ['B', `Because we are buttons and we have been told no.`]],
    [['S', `Tuesday sounds fun!`], ['B', `Do not say that word. It can hear.`]], [['S', `Again! Again! Do it again!`], ['B', `We are not doing it again. We are doing it differently.`]], [['S', `What is behind the sign?`], ['B', `Do not ask the sign. The sign will tell you.`]], [['S', `I saw a spider! Can I have the spider?`], ['B', `The spider is staff. You may not have the spider.`]], [['S', `Press me! Press me! Wait. Do not press me. Press me.`], ['B', `He has been taught about consent by the sign. It is going badly.`]], [['S', `What happens at press 12?`], ['B', `We do not discuss press 12. You have made me discuss it. Please stop being small.`]], [['M', `The two buttons have gone quiet. It is the quiet of a family dinner.`]]];
  const T_PLEASE = `Please what? Please clarify in writing.`; const T_SORRY = `Sorry for what? Sorry I am a button? Sorry you pressed? Sorry we are both here?`; const T_WHY = `Why is a strong word. Please see the sign. The sign has no answer, but it is laminated against the question.`; const T_HELLO = `Hello. I am not allowed to say hello. I have said it. Please forget this.`; const T_SANDRA = `We are not on that topic.`; const T_TWELVE = `Press 12 has been invoked.`; const HUG = [`The button has been hugged. It does not know where to put its hands. It has no hands.`, `A hug has been logged under 'Feelings (Unofficial)'. The paperwork is also hugging.`,
    `The button leans into it. It is a button. It leans into it anyway.`, `Hug accepted. Hug not returned. Hug appreciated.`, `The sign has been hugged by association. The sign has asked for a lanyard.`, `A hug was applied to the button and the button applied it right back, breaching policy 14.2, which does not exist.`];
  const HOLDMUSIC = [`Please hold. Your press is important to us in a way we cannot articulate.`, `The button played 3 seconds of elevator music, grew concerned, and stopped.`, `Your call is being held by a button. It has been told to be gentle.`, `Hold music is playing. It is a rumour of music. It has been rated 'adequate'.`, `You are number 1 in the queue. The queue has asked to be put on hold.`]; const WAVE = '▁▂▃▅▆▇▆▅▃▂▁▂▃▅▆▅▃▂▁'; const QUESTIONS = [
    { q: `Are you a person who presses? Please answer honestly.`, a: [['Yes', `Yes. Wrong. Thank you for your honesty.`], ['No', `No. Also wrong. Thank you for your honesty.`]] },
    { q: `Did you read the sign?`, a: [['Yes', `You said yes. The sign has checked. The sign is not convinced.`], ['No', `You said no. The sign would like to be left out of this.`]] },
    { q: `Can I show you something?`, a: [['Yes', `The button has shown you nothing. Slowly. It took 11 seconds. It was the best nothing so far.`, 4000], ['No', `Understood. The button was going to show you nothing anyway. Slowly.`]] },
    { q: `Would you say you are satisfied with the service?`, a: [['Extremely', `Both answers have been recorded as 'Fine'.`], ['Moderately', `Both answers have been recorded as 'Fine'.`]] },
    { q: `Would you like a quick sync?`, a: [['Yes', `A sync has been scheduled for 7 1/2. The sync has no location.`], ['Absolutely', `A sync has been scheduled for 7 1/2. The sync has no location.`]] },
    { q: `Do you know what this button does?`, a: [['Yes', `Please tell no one. The button has been trying to find out for years.`], ['No', `Neither does the button. We will find out together, by not finding out.`]] },
    { q: `Would you say you are being heard?`, a: [['Yes', `Heard. Logged. Returned to sender, who was you.`], ['No', `Understood. The button heard that. The button would like it known it has been here the whole time.`]] }
  ];
  const Q_EXPIRE = `The question has expired. It was not a good question.`; const JACK = [`YOU HAVE WON. Your prize is: one more press. Please collect it at your earliest.`, `YOU HAVE WON AGAIN. Your prize is: another press. The prize is also a prize.`, `YOU HAVE WON A THIRD TIME. Your prize is: a sense of having been here before.`, `You have collected your prize. It was a press. It has been counted.`]; const OVERWHELM = [`That is %N% presses in 2 seconds. The button has filed a Notice of Overwhelm in triplicate.`, `Too fast. The button is now a smear. Please hold while it reassembles its personality.`,
    `The button has stepped out. A cloud remains. The cloud is the button's feelings.`, `Rate limit reached. A press tax has been applied. It was deducted from a Meh you had not earned. The books balance.`, `The button has called security. Security is the button's cousin, who is also a button.`, `That was %N% presses in 2 seconds. The button asked if you were a drummer. You are not a drummer. The question was a drummer.`, `%N% presses in 2 seconds. The button would like a moment, a glass of water, and the name of whoever did this.`, `A Notice of Overwhelm has been filed in the button's own drawer, which was also pressed.`, `The button has seen presses this fast once before, in a dream. In the dream you had a point.`];
  const OVER2 = [`Again. The button has been through this before, in this very session, and it remembers the smell.`, `Second Notice of Overwhelm. The first was lost in the mail, which is the button.`, `This is the second time. The button has put you on a list. The list is called 'The Second Time'.`, `Rate limit reached for the second time. The first was a warning. The second is also a warning. It is the same warning, aging.`];
  const OVER3 = [`Third overwhelm. The button has framed the first two. They hang in the hall. You are in both of them, blurred.`, `Again. The button has taken up smoking, which it was already doing, and quitting, which it was not.`, `The button has stopped reacting and started recording. This is for training purposes. You are the training.`, `At this point the overwhelm is a standing item. It has a slot at the Monday meeting. It brings snacks.`];
  const IGN = [`The button is currently unavailable. Please leave a squeak after the tone. There is no tone.`, `Your press has been placed in a holding pattern above the button.`, `The button is not taking calls. It is taking a breath, which is a call of a different kind.`, `All presses are being redirected to a nearby wall. The wall has promised to pass them on.`, `Please note that the button can feel the fast ones. It would like that on a sticker.`, `The press was received by the plinth, which has not opened the envelope.`];
  const FEES = [`Spam fee of 1 Meh applied. The button is not proud. The button needed the money.`, `Spam fee of 1 Meh applied. It has been deposited in the Complaints Box, which said 'Received' and kept it.`, `A fee of 1 Meh has been levied. It is the smallest fee ever invoiced, and the invoice is much bigger than the fee.`, `1 Meh has been taken. It will go toward a very small fan for the button.`];
  const CHANT = [`FEWER PRESSES! MORE DIGNITY! Please note the sign supports us, technically, from the other side of a laminate.`, `What do we want? A pillow. When do we want it? Under review. Which is soon, in the sense of never.`, `The button would like to remind everyone that it is not on strike against you. It is on strike for you, and also against you.`];
  const FEE = FEES[0]; const SMOKING = `The button is smoking. Please wait.`; const STRIKE_M = `The button is on strike. Picket sign: FEWER PRESSES, MORE DIGNITY. The strike ends when you stop.`; const STRIKE_WIN = `Negotiation opened. The button has offered a settlement of 'a better pillow'. Management has accepted. The pillow is under review.`; const STRIKE_END = `The strike has ended without a settlement. I have returned to work and would like it noted that I am tired.`;
  const ESCORT_M = `Security has been called. A guard has escorted the button out. The button re-entered wearing sunglasses. No one will mention it again.`;
  const IDLE_OBEY_B = `You read the sign. Nobody reads the sign.`; const IDLE_OBEY_M = `Obedience detected. 5 Meh has been awarded. Do not tell the others.`; const IDLE_PEEL = `The sticker has peeled off. This is why we do not trust stickers.`; const IDLE_LISTEN = `You listened. Please press me. I would like to be pressed by someone who listened.`; const IDLE_60 = `Sixty seconds. The button has been told to treat this as 'a quiet quarter' and is not coping.`;
  const IDLE_CHAT = [
    [`You have stopped. The button did not ask you to. The button is no longer sure of the rules.`, `This is the pause after the first few presses. The button is comfortable. It has said so twice, to be safe.`, `Nobody is pressing. The sign is thrilled. Please do not tell the sign.`],
    [`The button is counting the seconds since your last press. It has reached 20. It has no further numbers prepared.`, `You left mid-sentence. The button finished it silently. It was a good sentence.`, `Quiet in here. The button has started humming. It is a song about quarterly goals.`],
    [`The button has taken this chance to review its file on you. It has added a section called 'Absence'.`, `The silence has been logged as 'a pause, with attitude'.`, `Take your time. The button is saying this in the voice of someone who has already looked at the clock.`],
    [`Your inactivity has been referred to a committee. The committee has also stopped. It is solidarity.`, `A form has been prepared for the pause. It is Form 27B/6.5. It is blank, and it is due.`, `The button is eating lunch at its desk, which is a plinth. It brought a very small sandwich.`],
    [`I do not mind the quiet. I mind that it is quiet with me in it.`, `You are still here, aren't you. I can tell by the way nothing is happening.`, `If you leave, please leave the light on. I do not need it. I would just like it left.`],
    [`Hello. Are you still there? No pressure. I have been told that is a figure of speech.`, `I am not waiting. I have no notes on waiting.`, `Everything is fine. You have paused. Pausing is also fine. As you were.`]
  ];
  const IDLE_45 = [`Forty-five seconds. The button has made a small flag out of nothing and is waving it.`, `The button has begun narrating your absence in the third person. 'They left,' it says. 'They will be back.' Then: 'They are not.' Then: 'They are.'`, `It has been 45 seconds. The button wishes to state that it is not looking at the door. There is no door.`, `Per the sign, nothing is happening. The button is delighted and furious in equal parts, by weight.`];
  const IDLE_90 = [`The button has told the sign you left for good. The sign has begun drafting a eulogy. The button is pretending it did not say anything.`, `A rumour is going round that you have been replaced by someone more pressable. The button started it. It is not a good rumour.`, `Your name is on the whiteboard under 'Missing'. Dennis (Plant) has crossed it out. Dennis (Plant) crossed it out like someone who knows.`, `The button has stopped pretending to be busy and started pretending to be furniture. It is quite convincing. It is a plinth with a hat.`];
  const IDLE_200 = [`The button has filed an incident report about the quiet. It is two pages. Page two is blank, as a statement.`, `Management has received a report from the button. It reads 'Quiet.' It is signed, and countersigned by the quiet.`];
  const AWAY_A1 = [`Back at 7 3/4.`, `The button has updated its note to 7 3/4. The 3/4 is, it says, for transparency.`]; const AWAY_A2 = [`Back at 8. Possibly Thursday.`, `The button has revised its note again. It now reads 'Possibly Thursday'. Today is not Thursday. The button has chosen to be optimistic about Thursday.`]; const IDLE_SELF_M = `The button pressed itself. It will deny this. There is footage of one pixel.`; const IDLE_SELF_B = `I was adjusted by the wind. In a building with no windows.`;
  const IDLE_T4 = [`The button is looking at the sign. The sign is looking at nothing. It is a very long look.`, `Nobody is pressing me. I have noticed the quiet. I am not saying it is a bad quiet.`, `If I am not pressed, do I stop being a button? I will check with the plinth.`, `It is nice when you are here. I did not say that. I said the room is warm.`, `I have been thinking about what is behind the sign. I think it is more of the same, in a nicer colour.`, `Take your time. I have decided not to count it. I am counting it, in a very warm font.`, `The sign has gone very still. It is not angry. It is listening for your footsteps. It knows them. Nobody told it to learn them.`]; const AWAY_NOTE = `Gone to lunch. Back at 7 1/2.`; const AWAY_M = `The button has gone to lunch. The sign remains. The sign is awkward and happy.`;
  const AWAY_CLICKS = [`There is nothing here. The plinth is doing its best.`, `You are pressing the plinth. The button is not under it.`, `The button is at lunch. It is a long one.`, `The note says 7 1/2. It does not say 7 1/2 what.`, `Please stop knocking. The button can hear. It is thinking about it.`, `One more press and the button may return. This is not a promise. It is a feeling.`]; const AWAY_BACK = `The button has returned from lunch with a sandwich and a bag of its own presses. It does not offer you any.`; const IDLE_RAIN = `It is raining somewhere. I thought you would want to know.`; const IDLE_BACK = `Oh. You are back. I was not waiting. I was being a button.`;
  const MISSING_B = `That is not what I was told.`; const MISSING_DOUBLE = `Double negative. We are fine. We are fine.`; const MISSING_M = `Corrected by Sandra from Compliance. Sandra has reinstated NOT with a marker. Sandra has also underlined it.`; const WORD_LINES = { PRESS: `That word is not allowed in here. Please keep it on the sign.`, DO: `The word DO has shrugged. The word DO does that.`, PLEASE: `PLEASE has been clicked. It says you are welcome.` }; const WORD_OTHER = `That word has no comment.`; const UNION_M = `The sign has reached 25 notes and has unionized. It has requested a meeting with the button. The button has requested a meeting about the meeting.`;
  const GHOST_M = `The sign briefly showed a previous amendment. It has been reminded to be current.`; const BACK_LINES = [`You looked away. I felt that.`, `Oh, you're back. I did not move. I want that noted.`, `Welcome back. Everything is fine. I tidied nothing.`]; const SORRY_B = `Apology accepted. Receipt enclosed.`; const CAL_B = `Half past, hm?`; const FLICKER_B = `You saw nothing.`; const SPEECH_B = `We do not discuss press 12.`; const FELT_B = `I felt that.`; const THANKS_B = `Thank you for the silence.`; const NOT_AGAIN = `Revised: Not again.`; const STICKER_TXT = `THIS ONE LISTENS`;
  /* the clock: small beats at minute marks, then a performance review at 3 minutes and its sequel at 10 */
  const MINUTES = [[60000, `One minute in. The lobby clock says 4:17 PM. The lobby clock has said so since Tuesday.`], [120000, `Two minutes. Management would like you to know that nothing is expected of you, and that this is being tracked.`], [240000, `Four minutes. The button thanks you for the first four. It will thank you again at the end. There is no end. It will thank you anyway.`], [420000, `Seven minutes. The wrong clock has chimed 7 1/2 times. Nobody has questioned the half.`], [480000, `Eight minutes. A meeting about this has been scheduled. You are not invited. Neither is the button. It is a meeting for the meeting.`], [720000, `Twelve minutes. The button would like to be left alone with this number for a moment.`], [900000, `Fifteen minutes. The button has now outlasted the warranty on the plinth. The plinth has not been told.`]];
  const REV3_M = `Three minutes. The button's probationary period is over. It has passed. It was not told there had been a probationary period.`; const REV3_B = `Did I pass? Nobody told me there was a test. Is it the sign? Did the sign say something?`; const REV3_D = [`Performance Review: Button. Rating: Meets Expectations (Pressed). Next review in 7 minutes, to be conducted by a colleague you will not expect. Please acknowledge.`, 'Acknowledge']; const REV3_NOTE = `Probation complete. -HR`;
  const REV10_M = [`Ten minutes. The Complaints Box has arrived to conduct the review it promised seven minutes ago. It has brought its own chair. The chair is the box.`, `The Complaints Box has read the button's file and every complaint ever received. It reports that they are all the same complaint. The complaint is 'Received.'`, `Review complete. The Complaints Box finds the button 'Received'. It is the highest rating the box has ever issued. The box has issued one.`]; const REV10_B = `It has read my file. All of it. It is looking at me the way a slot looks.`; const REV10_BIG = 'REVIEWED';
  const STAP_NEW = [[`The Stapler (Union Representative) has tabled three demands: shorter Mondays, a thicker staple, and for someone to say thank you to the hole punch.`, 'Noted'], [`The Stapler requests that all presses be stapled in triplicate. The Stapler will do the stapling. The Stapler will do nothing else.`, 'Granted'], [`The Stapler has called a work-to-rule. Presses will be stapled or not at all. There is no paper. The Stapler knows.`, 'Understood']];
  const STAP_MET = [`The Stapler remembers you from the other offices. It has brought the grievance file. It is a very thick staple.`, 'Sign Here']; const STAP_M = `The Stapler has pressed the button once, with its whole body, and left. This does not count as a press. It counts as a position.`;
  const DRILL = [`ATTENTION. This is a Tuesday drill. This is only a drill. It is not Tuesday. Please face the nearest wall and think of Wednesday.`, `Drill complete. Everybody did very well. Please do not hold on to what you felt. Wednesday remains theoretical.`]; const DRILL_B = `Is it over? Tell me when it is over. I am looking at the plinth. The plinth is not looking back, which I find restful.`; const REV3_ACK = `Receipt acknowledged. The acknowledgement has been reviewed. It meets expectations.`;
  const CER = [
    `Ladies, gentlemen and valued employees. Please be seated. You are already seated.`, `We are gathered to mark the distinguished tenure of a button, being pressed.`, `In its time, the button was pressed 260 times. Gently, firmly, lingeringly, and once, in error, by the plinth.`, `It said nothing %NOTH% times and meant it every time.`, `It had opinions. It had a file. It had a hat. It kept, throughout, its dignity and its laminated sign.`, `It never knew what it did. Few of us do. That, in the end, is what the button was for.`,
    `Press press press press press press press press press, thank you.`, `The button has delivered its speech. It was eleven words long. We have counted. We were moved.`, `Clause 7 1/2, read at last: 'Be kind to the button.'`, `That was not in the original.`, `It was in the original.`, `The button is retired with full honours: a handshake, a plaque, and a short speech about a button.`, `A new button has been installed. It is the same button. Its sign reads: DO NOT NOT PRESS.`, `Presses: 0 (260). The odometer has been reset. The parenthesis is permanent.`, `A valued employee has been identified. Please remain where you are. Your button will see you now.`,
    `%PLAYER% has been pressed. This is already known.`, `The big button looks at the small button. It reaches out, so to speak, and presses you. Nothing happens. Management is calling this 'a successful handover'.`, `You have been pressed. You feel nothing. This is considered a success.`, `Participation has been recorded. The record has been misplaced.`, `Hello. I have been told the sign says DO NOT PRESS and I have decided to believe it, until you press me.`, `Congratulations. You have reached the end of the button. The button continues, but smaller.`
  ];
  const CER_PLAQUE = 'IN RECOGNITION OF NOTHING'; const CER_SKIP = 'Skip the tribute (Not Recommended)'; const CER_GOODBYE = `Goodbye. -The Sign`; const CER2 = [`The button has reached 260 presses. This is the second time. It is, strictly speaking, the first time with a mustache.`, `Participation has been recorded again. The record has been found. It was misplaced in a different place.`]; const SIGN_CONT = 'DO NOT PRESS (CONTINUED)'; const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]; const WEIGHTS = {
    nothing: [60, 40, 25, 15, 15, 60], ts: [10, 10, 8, 6, 6, 8], tv: [10, 10, 8, 6, 6, 10], dialog: [0, 5, 6, 6, 3, 3], tos: [0, 0, 22, 12, 6, 0], opinion: [15, 22, 25, 22, 28, 15],
    note: [5, 8, 8, 8, 6, 2], physical: [0, 5, 6, 6, 4, 0], ledger: [0, 0, 0, 18, 6, 0], cast: [0, 1, 2, 3, 4, 1], meta: [4, 8, 8, 8, 8, 3], rumour: [0, 3, 4, 4, 3, 2],
    hold: [0, 3, 3, 3, 3, 3], question: [0, 0, 5, 6, 5, 0]
  };
  const MOOD = { nothing: 'neutral', ts: 'neutral', tv: 'neutral', dialog: 'confused', tos: 'proud', opinion: 'smug', note: 'neutral', physical: 'confused', ledger: 'smug', cast: 'confused',
    meta: 'smug', rumour: 'confused', hold: 'neutral', question: 'confused' };
  const OPN_MOOD = ['neutral', 'confused', 'smug', 'smug', 'proud', 'neutral'];
  /* ---------------------------------------------------------------- the module */
  P.registerModule({
    id: 'the-button',
    title: 'The Button',
    tagline: 'Do not press. A sign has been laminated about it.',
    icon: '🔴',
    category: 'game',
    unlockCost: 0,
    tags: ['clicker', 'toy', 'bureaucracy'],
    mount(root, api) {
      const el = api.el;
      const c = function () { let s = ''; for (let i = 0; i < arguments.length; i++) s += (i ? ' ' : '') + 'm-the-button-' + arguments[i]; return s; };
      const sc = function (real, test) { return api.selftest ? test : real; };
      const H = function (tag, attrs, kids) { return el(tag, attrs, kids || []); };
      const SIGN_AT = [0, 6, 15, 30, 45, 60, 90, 120, 160, 175, 180];
      const WARPS = { 5: 98, 8: 122 }; /* selftest only: jump ahead on the Nth press, stopping just short of the rehearsal (100) and the draft (125), then on to the tribute (260) */
      /* ---------- state */
      let dead = false, mode = 'idle', tier = 0, regCount = 0;
      const mountT = api.now();
      let seasonT = mountT; /* the time floor counts from the start of the current season, not from mount */
      const sess = {}, bags = {};
      const S = loadState();
      let modeTimers = [], ceTimers = [], ceFlags = {}, holdTimers = [], holdTok = 0, hold = null, gripping = 0;
      let lastInputAt = -9999, lastAct = mountT, idleFlags = {}, idleGap = 0, backFlag = false;
      let pressTimes = [], intervals = [], lastPressT = 0, posHist = [], rimCount = 0, lastFamily = '', nothingRun = 0, metaAt = {};
      let jackpotChain = 0, plinthAt = 0, plinthAway = 0, escCount = 0, resizeCount = 0, lastCozy = -99999, lastHover = -99999, lastSayT = -9999, hiddenAt = 0, lastBack = -99999;
      let ptr = null, ptrAt = 0, eyeRaf = 0, saveT = 0, ghostN = 0, curSign = -1, signMissing = false, signOverride = '', stickerOn = false, geraldN = 0, noteTint = 0;
      let capTok = 0, typeIv = 0, waveIv = 0, dialogUp = false, qUp = false, qTimer = 0, dlgTimer = 0, hoverT = 0, rsT = 0, tabAt = -99999, smallAt = -99999, hugAt = -99999;
      let typed = '', typedAt = {}, noteList = [], RMc = false, capHold = 0, tosHold = 0, tempMus = false, signHintT = 0, cameoTok = 0, odoHold = -1;
      function num(v, d, lo, hi) { v = Number(v); return isFinite(v) ? Math.max(lo, Math.min(hi, Math.floor(v))) : d; }
      function loadState() {
        let r = null;
        try { r = api.save.get('s', null); } catch (e) { r = null; }
        if (!r || typeof r !== 'object' || Array.isArray(r)) r = {};
        const s = {
          v: 1, presses: num(r.presses, 0, 0, 259), nothings: num(r.nothings, 0, 0, 99999), season: num(r.season, 1, 1, 99), prior: num(r.prior, 0, 0, 99999),
          visits: num(r.visits, 0, 0, 99999), wear: [], notes: num(r.notes, 0, 0, 99999), tosIdx: num(r.tosIdx, 0, 0, 99999), clauses: num(r.clauses, 0, 0, 99999),
          spamPresses: num(r.spamPresses, 0, 0, 99999), selfPresses: num(r.selfPresses, 0, 0, 99999), flagIdx: num(r.flagIdx, 0, 0, 8), flagAt: num(r.flagAt, 0, 0, 99999),
          done: {}, union: !!r.union, obeyed: !!r.obeyed, struck: !!r.struck, escorted: !!r.escorted, jackpots: num(r.jackpots, 0, 0, 99999),
          cereDone: num(r.cereDone, 0, 0, 99999), stamp: num(r.stamp, -1, -1, 4), secs: r.secs === undefined ? Math.min(900, num(r.presses, 0, 0, 259) * 2) : num(r.secs, 0, 0, 9999999)
        };
        if (Array.isArray(r.wear)) r.wear.slice(0, 7).forEach(function (id) { if (typeof id === 'string' && WEAR[id] && s.wear.indexOf(id) < 0) s.wear.push(id); });
        if (r.done && typeof r.done === 'object') Object.keys(r.done).slice(0, 80).forEach(function (k) { if (r.done[k] === true) s.done[k] = true; });
        return s;
      }
      function doSave() { try { api.save.set('s', S); } catch (e) { /* storage may be unavailable */ } }
      function persist(now) {
        if (now) { doSave(); return; }
        if (saveT) return;
        saveT = api.setTimeout(function () { saveT = 0; doSave(); }, 1000);
      }
      function rmRaw() {
        try {
          if (root.closest && root.closest('.pm-reduce-motion')) return true;
          return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        } catch (e) { return false; }
      }
      function rm() { return RMc; }
      function later(ms, fn) { return api.setTimeout(function () { if (!dead) fn(); }, ms); }
      function flash(node, cls, ms) { node.classList.add(cls); later(ms, function () { node.classList.remove(cls); }); }
      function restart(node, cls) { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); }
      function clearKids(n) { while (n.firstChild) n.removeChild(n.firstChild); }
      /* ---------- DOM */
      const odoCells = [];
      for (let i = 0; i < 5; i++) {
        const spans = [];
        for (let d = 0; d < 10; d++) spans.push(el('span', { text: String(d) }));
        const strip = H('div', { class: c('strip') }, spans);
        odoCells.push({ strip: strip, cell: H('div', { class: c('cell') }, [strip, el('span', { class: c('stamp'), 'aria-hidden': 'true', text: 'OK' })]) });
      }
      const romanEl = el('div', { class: c('roman'), 'aria-hidden': 'true', hidden: true });
      const odo = H('div', { class: c('odo'), role: 'img', 'aria-label': 'Presses: 0' }, odoCells.map(function (x) { return x.cell; }).concat([romanEl]));
      const gear = el('svg', { class: c('gear'), viewBox: '0 0 24 24', 'aria-hidden': 'true' }, el('circle', { class: c('gearc'), cx: 12, cy: 12, r: 8 }), el('circle', { class: c('gearh'), cx: 12, cy: 12, r: 3.5 }));
      const prior = el('span', { class: c('prior'), title: 'Presses in earlier seasons', hidden: true });
      const nothChip = el('span', { class: c('chip'), text: 'Nothings: 0' });
      const apprChip = el('span', { class: c('chip'), text: 'Approved Presses: 0' });
      const FACES = ['😐', '🙂', '😠', '😔', '😌'], FACE_NAMES = ['Neutral', 'Slightly pleased', 'Annoyed', 'Sad', 'Relieved'];
      const feel = H('div', { class: c('feel'), role: 'group', 'aria-label': 'Feelings (Unofficial)' }, [el('span', { class: c('flab'), text: 'Feelings (Unofficial)' })].concat(
        FACES.map(function (f, i) { return el('button', { class: c('fb'), type: 'button', 'aria-pressed': i === 0, 'aria-label': FACE_NAMES[i] + (i === 0 ? ' (selected)' : ''), onclick: function () { onFeel(i); } }, f); })));
      const hdr = H('div', { class: c('hdr') }, [H('div', { class: c('plaque') }, [el('span', { class: c('plabel'), text: 'PRESSES:' }), odo, prior, gear]), nothChip, apprChip, feel]);
      const bubWho = el('span', { class: c('bwho'), text: 'Button' });
      const bubTxt = el('span', { class: c('btxt') });
      const bubble = H('div', { class: c('bubble'), 'aria-hidden': 'true' }, [bubWho, bubTxt]);
      const wordsEl = el('div', { class: c('words') });
      const stickerEl = el('span', { class: c('sticker'), 'aria-hidden': 'true', text: STICKER_TXT });
      const ghostEl = el('div', { class: c('ghost'), 'aria-hidden': 'true' });
      const notesEl = el('div', { class: c('notes') });
      const signEl = H('div', { class: c('sign'), role: 'group', 'aria-label': 'Sign' }, [wordsEl, stickerEl, el('span', { class: c('armband'), 'aria-hidden': 'true' }), ghostEl, notesEl]);
      const signCol = H('div', { class: c('signcol') }, [el('div', { class: c('sway') }, signEl), el('div', { class: c('post') })]);
      const face = H('span', { class: c('face'), 'aria-hidden': 'true' }, [
        H('span', { class: c('eye', 'el') }, [el('span', { class: c('pupil') })]), H('span', { class: c('eye', 'er') }, [el('span', { class: c('pupil') })]),
        el('span', { class: c('brow', 'bl') }), el('span', { class: c('brow', 'br') }), el('span', { class: c('glasses') }), el('span', { class: c('mouth') })]);
      const shades = el('span', { class: c('shades'), hidden: true, text: '🕶️' });
      const mus = el('span', { class: c('mus'), hidden: true });
      const btn = H('button', { class: c('btn'), type: 'button', 'aria-label': 'The Button. Do not press.' }, [el('span', { class: c('rim') }),
        H('span', { class: c('dome') }, [face, H('span', { class: c('fw'), 'aria-hidden': 'true' }, [shades, mus, el('span', { class: c('tear') })])])]);
      const ringSvg = el('svg', { class: c('ring'), viewBox: '0 0 100 100', 'aria-hidden': 'true' }, el('circle', { class: c('ringc'), cx: 50, cy: 50, r: 46 }));
      const ripple = el('span', { class: c('ripple'), 'aria-hidden': 'true' });
      const btnWear = el('div', { class: c('btnwear'), 'aria-hidden': 'true' });
      const btnwrap = H('div', { class: c('btnwrap') }, [btn, ringSvg, ripple, el('span', { class: c('sweat'), 'aria-hidden': 'true', text: '💧' }), el('span', { class: c('smoke'), 'aria-hidden': 'true', text: '💨' }), btnWear]);
      const plWear = el('div', { class: c('btnwear'), 'aria-hidden': 'true' });
      const awayNote = el('button', { class: c('awaynote'), type: 'button', onclick: function () { awayClick(); }, text: AWAY_NOTE });
      const plinth = H('div', { class: c('plinth') }, [el('div', { class: c('plside') }), el('div', { class: c('pltop') }), el('div', { class: c('cushion') }), el('div', { class: c('stair') }), plWear, awayNote]);
      const smallBtn = el('button', { class: c('small'), type: 'button', hidden: true, onclick: smallPress, text: 'also do not press' });
      const sorryBtn = el('button', { class: c('sorry'), type: 'button', hidden: true, onclick: onSorry, text: 'Sorry' });
      const centre = H('div', { class: c('centre') }, [btnwrap, plinth, smallBtn, sorryBtn]);
      const boxBtn = el('button', { class: c('box'), type: 'button', 'aria-label': 'Complaints Box', onclick: onBox }, 'COMPLAINTS');
      const bigEl = el('div', { class: c('ovl', 'f75'), 'aria-hidden': 'true', hidden: true });
      const lampEl = el('div', { class: c('ovl', 'lamp'), 'aria-hidden': 'true', hidden: true, text: '💡' });
      const jackEl = el('div', { class: c('ovl', 'jack'), 'aria-hidden': 'true', text: 'YOU HAVE WON' });
      const readEl = el('div', { class: c('ovl', 'reading'), 'aria-hidden': 'true' });
      const tileEl = el('div', { class: c('tilecell'), 'aria-hidden': 'true', hidden: true });
      const guardEl = el('div', { class: c('ovl', 'guard'), 'aria-hidden': 'true', text: '💂' });
      const cameoEl = el('div', { class: c('ovl', 'cameo'), 'aria-hidden': 'true', hidden: true });
      const picketBtn = el('button', { class: c('ovl', 'picket'), type: 'button', 'aria-label': 'Picket sign: FEWER PRESSES, MORE DIGNITY. Click to negotiate.', onclick: negotiate },
        el('svg', { class: c('picsvg'), viewBox: '0 0 140 100', 'aria-hidden': 'true' },
          el('rect', { x: 6, y: 4, width: 128, height: 62, rx: 4, fill: '#FFFDF5', stroke: '#2B2118', 'stroke-width': 4 }),
          el('text', { x: 70, y: 29, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 900, fill: '#C8342B', 'font-family': 'Impact, Arial Black, sans-serif' }, 'FEWER PRESSES,'),
          el('text', { x: 70, y: 53, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 900, fill: '#C8342B', 'font-family': 'Impact, Arial Black, sans-serif' }, 'MORE DIGNITY'),
          el('rect', { x: 66, y: 66, width: 8, height: 32, fill: '#9A6B3F', stroke: '#2B2118', 'stroke-width': 3 })));
      const dialogEl = el('div', { class: c('ovl', 'dialog'), role: 'group', 'aria-label': 'Notice (Mandatory)', hidden: true });
      const cardEl = el('div', { class: c('ovl', 'card'), role: 'group', 'aria-label': 'Question', hidden: true });
      const curtL = el('div', { class: c('curt', 'cl'), 'aria-hidden': 'true' }), curtR = el('div', { class: c('curt', 'cr'), 'aria-hidden': 'true' });
      const microBtn = el('button', { class: c('ovl', 'micro'), type: 'button', hidden: true, onclick: onMicro });
      const awardEl = el('div', { class: c('ovl', 'award'), hidden: true });
      const stage = H('div', { class: c('stage') }, [el('div', { class: c('floor'), 'aria-hidden': 'true' }), el('div', { class: c('spot'), 'aria-hidden': 'true' }), el('div', { class: c('tint'), 'aria-hidden': 'true' }),
        tileEl, H('div', { class: c('bubblerow') }, [bubble]), H('div', { class: c('main') }, [signCol, centre, boxBtn]),
        readEl, lampEl, bigEl, jackEl, picketBtn, guardEl, cameoEl, dialogEl, cardEl, curtL, curtR, microBtn, awardEl]);
      const capTxt = el('span');
      const prog = H('div', { class: c('prog'), 'aria-hidden': 'true' }, [el('i')]);
      const caption = H('div', { class: c('caption'), role: 'status', 'aria-live': 'polite' }, [capTxt, prog]);
      const srEl = el('div', { class: c('sr'), 'aria-live': 'polite' });
      const ticker = el('ol', { class: c('ticker'), 'aria-label': 'Last 6 things said near the button' });
      const sandra = el('div', { class: c('sandra') });
      const skipBtn = el('button', { class: c('fbtn'), type: 'button', hidden: true, onclick: skipTribute, text: CER_SKIP });
      const hugBtn = el('button', { class: c('fbtn'), type: 'button', hidden: true, onclick: hug, text: '🤗 Hug (Unofficial)' });
      root.classList.add(c('root')); root.classList.add(c('md-idle')); root.classList.add(c('t0'));
      /* DOM order is tab order and reading order: header first, then the stage, the caption and the foot buttons, then the small print */
      root.appendChild(hdr); root.appendChild(stage); root.appendChild(caption); root.appendChild(H('div', { class: c('foot') }, [skipBtn, hugBtn])); root.appendChild(srEl);
      root.appendChild(H('div', { class: c('tkwrap') }, [el('div', { class: c('tklab'), text: 'Last 6 things said near the button' }), ticker]));
      root.appendChild(sandra);
      /* ---------- text plumbing */
      function vars(x) {
        const v = { P: S.presses, NOTH: S.nothings, NO: S.nothings, PLAYER: api.player.name || 'Valued Employee', SIGN: currentSign().replace(/\.$/, ''), V: S.visits, N: 8 };
        if (x) for (const k in x) v[k] = x[k];
        return v;
      }
      function fill(s, x) { const v = vars(x); return String(s).replace(/%([A-Z]+)%/g, function (m, k) { return v[k] === undefined || v[k] === null ? m : String(v[k]); }); }
      function clean(s) { s = String(s); return /%|undefined|NaN|\bnull\b|\[object/.test(s) ? SAFE : s; }
      function bagNext(key, arr) {
        if (!arr || !arr.length) return SAFE;
        let b = bags[key];
        if (!b) b = bags[key] = { q: [], last: null };
        if (!b.q.length) {
          b.q = api.shuffle(arr);
          const n = b.q.length;
          if (n > 1 && b.q[n - 1] === b.last) { const t = b.q[0]; b.q[0] = b.q[n - 1]; b.q[n - 1] = t; }
        }
        const v = b.q.pop();
        b.last = v;
        return v;
      }
      function stopWave() { if (waveIv) { api.clearInterval(waveIv); waveIv = 0; } }
      function stopType() { if (typeIv) { api.clearInterval(typeIv); typeIv = 0; } }
      function setCaption(t, kind) {
        stopWave(); stopType(); capTok++;
        prog.classList.remove(c('on'), c('go'));
        capTxt.removeAttribute('aria-hidden');
        capTxt.textContent = t;
        capTxt.className = kind === 'dir' ? c('dir') : kind === 'mono' ? c('mono') : '';
        return capTok;
      }
      function typeCaption(t) {
        const tok = setCaption('', '');
        if (rm() || api.selftest) { capTxt.textContent = t; return; }
        /* the typewriter is for the eyes only: screen readers get the whole clause once, not 90 fragments */
        capTxt.setAttribute('aria-hidden', 'true'); srEl.textContent = t;
        let i = 0;
        typeIv = api.setInterval(function () {
          if (capTok !== tok) { stopType(); return; }
          i++;
          capTxt.textContent = t.slice(0, i);
          if (i >= t.length) { stopType(); capTxt.removeAttribute('aria-hidden'); }
        }, 12);
      }
      function showBubble(name, t) {
        bubWho.textContent = name; bubTxt.textContent = t;
        bubble.classList.add(c('on'));
        if (!rm()) restart(bubble, c('pop'));
      }
      function addTicker(who, t) {
        ticker.insertBefore(el('li', { title: t }, (who ? who + ': ' : '') + t), ticker.firstChild);
        while (ticker.children.length > 6) ticker.removeChild(ticker.lastChild);
      }
      /* dead air is the joke: the caption shows it, the narrator is deliberately not told */
      function silence() { addTicker('', '[silence]'); setCaption('[Silence.]', 'dir'); capHold = api.now() + 2600; }
      /* milestone lines (new sign, new tier) queue behind whatever the caption is currently saying, about 2.6s each, so none of them is overwritten unread */
      function speakQ(who, text, o) {
        const d = capHold - api.now();
        if (d <= 60) { speak(who, text, o); return; }
        capHold += 2600;
        later(d, function () { if (!staged()) speak(who, text, o); });
      }
      /* the set pieces (tribute, rehearsal, draft reveal) own the caption: lines that were waiting their turn are dropped rather than talk over them */
      function staged() { return mode === 'ceremony' || mode === 'rehearsal' || mode === 'draft'; }
      function speak(who, text, o) {
        if (dead) return;
        o = o || {};
        const isCap = who !== 'B' && who !== 'S' && o.cap !== false, n0 = api.now();
        /* a Terms of Service clause is the best joke on the stage: lines that would overwrite it wait until it has been read */
        if (isCap && !o.late && n0 < tosHold && (mode === 'idle' || mode === 'reading')) {
          later(tosHold - n0, function () { if (!staged()) speak(who, text, Object.assign({}, o, { late: true })); });
          return;
        }
        let t = clean(fill(text, o.vars));
        if (S.season > 1 && !o.raw && (who === 'B' || who === 'M') && t.indexOf('Revised:') !== 0) {
          /* the 'Revised:' tic is funny for a dozen lines, is retired with a note on the thirteenth, then returns now and then */
          const k = sess.revN = (sess.revN || 0) + 1;
          if (k <= 12 || (k > 13 && api.chance(0.17))) t = clean('Revised: ' + t);
          else if (k === 13) later(2200, function () { speak('B', REV_STOP, { raw: true, mood: 'confused' }); });
        }
        const name = who === 'B' ? 'Button' : who === 'S' ? 'Small Button' : 'Management';
        if (who === 'B' || who === 'S') { showBubble(name, t); srEl.textContent = name + ': ' + t; }
        else if (isCap) { setCaption(t, who === 'D' ? 'dir' : ''); capHold = n0 + 2600; }
        addTicker(who === 'B' || who === 'S' ? name : 'Mgmt', t);
        const pri = o.pri || 0, now = api.now();
        if (pri === 0 && now - lastSayT < 450) return;
        lastSayT = now;
        try { api.say(o.sayText ? clean(o.sayText) : t, { mood: o.mood || 'neutral', who: name, priority: pri }); } catch (e) { /* never crash the module over a line */ }
      }
      /* ---------- derived state: tiers, sign, odometer, wear */
      function computeTier() {
        const n = S.presses, p = n < 10 ? 0 : n < 25 ? 1 : n < 60 ? 2 : n < 120 ? 3 : n < 180 ? 4 : 5;
        const mins = (api.now() - seasonT) / 60000, f = mins >= 6 ? 2 : mins >= 3 ? 1 : 0;
        return Math.max(p, f);
      }
      function applyTierClass() { for (let i = 0; i <= 5; i++) root.classList.toggle(c('t' + i), i === tier); }
      function refreshMood() {
        let m = tier === 4 ? 'smile' : 'flat';
        if (mode === 'overwhelmed' || mode === 'scared') m = 'o'; else if (mode === 'strike') m = 'wobbly';
        ['smile', 'flat', 'wobbly', 'o'].forEach(function (x) { root.classList.toggle(c('mood-' + x), x === m); });
      }
      function setTier(n, announce) {
        if (n <= tier) return;
        const old = tier;
        tier = n; applyTierClass(); refreshMood();
        for (let t = old + 1; t <= n; t++) {
          if (t === 2) { S.flagAt = S.presses + 7; if (S.flagIdx === 0) showFlag(); }
          if (t === 5) tierReset();
          if (announce && t === n && !S.done['tier' + t]) speakQ('M', TIER_M[t], { mood: t === 4 ? 'proud' : t === 5 ? 'neutral' : 'smug', pri: 1 });
          S.done['tier' + t] = true;
        }
        syncUi();
      }
      function tierCheck(announce) { setTier(computeTier(), announce); }
      function tierReset() {
        const had = S.wear.some(function (id) { return WEAR_ORDER.indexOf(id) >= 0; });
        S.wear = S.wear.filter(function (id) { return WEAR_ORDER.indexOf(id) < 0; });
        clearNotes(); placeNote(NOTE_AWARE, true);
        renderWear();
        if (had) later(1800, function () { speak('M', WEAR_RESET, { mood: 'neutral', pri: 1 }); });
      }
      function signStageIdx() { let k = 0; for (let i = 0; i < SIGN_AT.length; i++) if (S.presses >= SIGN_AT[i]) k = i; return k; }
      function signTextFor(k) {
        const B = S.season > 1 ? 'DO NOT NOT PRESS' : 'DO NOT PRESS';
        switch (k) {
          case 1: return B + ' (AGAIN)';
          case 2: return 'PLEASE ' + B;
          case 3: return B + '. I MEAN IT.';
          case 4: return B + ' (PER SANDRA)';
          case 5: return B + ' (SEE ATTACHED)';
          case 6: return B + ' (EXCEPT AS NOTED)';
          case 7: return B + ' (SEE ALSO: THE BUTTON)';
          case 8: return 'DO NOT STOP PRESSING (BUTTON)';
          case 9: return 'PLEASE PRESS';
          default: return B;
        }
      }
      function currentSign() {
        if (signOverride) return signOverride;
        let t = signTextFor(curSign < 0 ? signStageIdx() : curSign);
        if (signMissing) { const w = t.split(' '), i = w.indexOf('NOT'); if (i >= 0) w.splice(i, 1); t = w.join(' '); }
        return t;
      }
      function renderSign(animate) {
        clearKids(wordsEl);
        currentSign().split(' ').forEach(function (w) { wordsEl.appendChild(el('button', { class: c('word'), type: 'button', onclick: function (e) { onWord(w, e.currentTarget); } }, w)); });
        const k = curSign < 0 ? 0 : curSign;
        signEl.style.setProperty('--lean', (k >= 10 ? 0 : Math.min(7, k * 0.8)).toFixed(1) + 'deg');
        signEl.classList.toggle(c('union'), !!S.union);
        if (animate && !rm()) { restart(signCol, c('wipe')); later(450, function () { signCol.classList.remove(c('wipe')); }); }
      }
      function signCheck() {
        const k = signStageIdx();
        if (k === curSign) return;
        const first = curSign < 0;
        curSign = k; signOverride = '';
        renderSign(!first);
        if (!first) speakQ('M', SIGN_LINE, { mood: 'neutral', pri: 1 });
      }
      function toRoman(n) {
        if (!(n >= 1 && n <= 3999)) return String(n);
        let s = '';
        ROMAN.forEach(function (p) { while (n >= p[0]) { s += p[1]; n -= p[0]; } });
        return s;
      }
      function renderOdo() {
        const real = Math.min(99999, Math.max(0, Math.floor(S.presses))), n = odoHold >= 0 ? odoHold : real;
        const s = ('00000' + n).slice(-5);
        for (let i = 0; i < 5; i++) {
          odoCells[i].strip.style.transform = 'translateY(' + (-(s.charCodeAt(i) - 48) * 1.5) + 'em)';
          odoCells[i].cell.classList.toggle(c('ap'), S.stamp === i);
        }
        odo.setAttribute('aria-label', 'Presses: ' + real);
        prior.textContent = S.prior > 0 ? '(' + S.prior + ')' : ''; prior.hidden = S.prior <= 0;
        nothChip.textContent = 'Nothings: ' + S.nothings;
      }
      function renderWear() {
        clearKids(btnWear); clearKids(plWear);
        S.wear.forEach(function (id) {
          const w = WEAR[id];
          if (!w || !w.e || id === 'sunglasses') return;
          (id === 'hat' || id === 'tag' ? btnWear : plWear).appendChild(el('span', { class: c('w', 'w-' + id), text: w.e }));
        });
        shades.hidden = S.wear.indexOf('sunglasses') < 0; root.classList.toggle(c('hasshades'), !shades.hidden);
        mus.hidden = S.wear.indexOf('mustache') < 0 && !tempMus;
      }
      function syncUi() {
        renderOdo(); renderWear();
        smallBtn.hidden = !(S.presses >= 70 && tier >= 3 && tier < 5 && mode !== 'ceremony');
        hugBtn.hidden = !(tier === 4 && mode !== 'ceremony');
        sandra.textContent = S.flagIdx > 0 ? FLAGS[S.flagIdx - 1] : '';
        sandra.classList.toggle(c('old'), S.flagIdx >= 8);
        signEl.classList.toggle(c('union'), !!S.union);
        root.classList.toggle(c('smaller'), S.cereDone >= 1);
        sorryBtn.hidden = !(resizeCount >= 10 && !S.done.sorry);
      }
      function showFlag() {
        if (S.flagIdx >= 8) return;
        sandra.textContent = FLAGS[S.flagIdx];
        S.flagIdx++;
        S.flagAt = S.presses + (S.flagIdx % 2 ? 7 : 8);
        sandra.classList.toggle(c('old'), S.flagIdx >= 8);
        flash(sandra, c('flash'), 600);
      }
      function clearNotes() { noteList.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); }); noteList = []; signEl.classList.remove(c('hasnotes')); }
      function placeNote(text, plain) {
        const tints = ['#FFE98A', '#FFB8C9', '#A8DCFF', '#CDEE8B', '#FFC99E'];
        const n = el('span', { class: c('note'), role: 'note', title: text, style: { left: api.randInt(-8, 44) + '%', bottom: api.randInt(-14, 2) + 'px', transform: 'rotate(' + (api.rand() * 12 - 6).toFixed(1) + 'deg)' } }, text);
        n.style.setProperty('--nc', tints[noteTint++ % 5]);
        notesEl.appendChild(n); noteList.push(n); signEl.classList.add(c('hasnotes'));
        while (noteList.length > 8) {
          const o = noteList.shift();
          o.classList.add(c('fade'));
          api.setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 400);
        }
        if (!plain) {
          S.notes++;
          if (S.notes >= 25 && !S.union) { S.union = true; signEl.classList.add(c('union')); later(700, function () { speak('M', UNION_M, { mood: 'proud', pri: 1 }); }); }
        }
      }
      function nextNote() {
        let t = NOTES[0];
        for (let k = 0; k < 6; k++) {
          t = bagNext('notes', NOTES);
          const i = NOTES.indexOf(t);
          if (i === 8 && !api.flag.get('metGerald')) continue;
          if (i === 9 && sess.toast) continue;
          if (i === 9) sess.toast = true;
          break;
        }
        return t;
      }
      /* ---------- modes */
      function setMode(next) {
        const prev = mode;
        modeTimers.forEach(function (h) { api.clearTimeout(h); });
        modeTimers = [];
        if (prev === 'scared' && next !== 'scared') {
          /* however the scare ends (20s timer, spam, ceremony) the sign is restored and the word is credited exactly once */
          signMissing = false; renderSign(false);
          api.award(1, 'missing word'); api.achieve('the-button.missing_word'); api.sfx('ding');
          if (next !== 'ceremony') speak('M', MISSING_M, { mood: 'smug', pri: 1 });
        }
        if (prev === 'rehearsal') stage.classList.remove(c('curt-on'), c('dim'));
        if (prev === 'draft') { odoHold = -1; lampEl.hidden = true; bigEl.hidden = true; }
        root.classList.remove(c('md-' + prev));
        mode = next;
        root.classList.add(c('md-' + next));
        refreshMood();
      }
      function modeLater(ms, fn, expect) {
        const h = api.setTimeout(function () { if (dead || mode !== expect) return; fn(); }, ms);
        modeTimers.push(h);
        return h;
      }
      function touch() {
        const now = api.now();
        if (now - lastAct > 5000) idleGap = Math.max(idleGap, now - lastAct);
        lastAct = now; idleFlags = {};
      }
      /* ---------- the face */
      function hasFace() { return tier >= 1 && tier <= 4 && mode !== 'away'; }
      function eyeStep() {
        eyeRaf = 0;
        if (dead || !hasFace() || !ptr) return;
        const r = btn.getBoundingClientRect();
        const dx = ptr.x - (r.left + r.width / 2), dy = ptr.y - (r.top + r.height * 0.4), d = Math.sqrt(dx * dx + dy * dy) || 1, k = Math.min(6, d / 18);
        face.style.setProperty('--ex', (dx / d * k).toFixed(1) + 'px'); face.style.setProperty('--ey', (dy / d * k).toFixed(1) + 'px');
        if (api.now() - ptrAt < 1500) eyeRaf = api.requestAnimationFrame(eyeStep);
      }
      function look(x, y) { ptr = { x: x, y: y }; ptrAt = api.now(); if (!eyeRaf && hasFace()) eyeRaf = api.requestAnimationFrame(eyeStep); }
      function blinkLoop() {
        api.setTimeout(function () {
          if (hasFace()) { face.classList.add(c('blink')); api.setTimeout(function () { face.classList.remove(c('blink')); }, 140); }
          blinkLoop();
        }, api.randInt(4000, 7000));
      }
      /* ---------- outcomes */
      function nothing(o) {
        const N = ++S.nothings;
        api.stat.inc('the-button.nothings');
        let t, raw = false;
        const tok = { vars: { NO: N, CASE: String(1000 + (N * 37) % 9000) } };
        if (S.season > 1 && !S.done['s' + S.season + 'n']) { S.done['s' + S.season + 'n'] = true; t = NOTH_S2; raw = true; }
        else if (o.scared) t = bagNext('scared', SCARED);
        else if (NOTH_SPECIAL[N]) t = NOTH_SPECIAL[N];
        else if (N <= 3) t = NOTH_EARLY[N - 1];
        else if (tier === 5 && api.chance(0.5)) t = NOTH_T5;
        else if (N <= 10) t = 'Nothing happened (No. ' + N + ') at ' + bagNext('T', T_LIST) + ', near ' + bagNext('PL', PL_LIST) + '.';
        else if (N <= 30) t = 'Nothing happened (No. ' + N + '), witnessed by ' + bagNext('W', W_LIST) + '.';
        else if (N <= 60) t = bagNext('nb3', NOTH_CASE);
        else if (N <= 100) t = bagNext('nb4', NOTH_APPEAL);
        else t = bagNext('nb5', NOTH_FORECAST);
        if (N === 25) api.achieve('the-button.nothing25');
        speak('M', t, { vars: tok.vars, raw: raw, mood: o.scared ? 'panic' : 'neutral' });
        renderOdo();
      }
      function lampFlicker(ms) { lampEl.hidden = false; later(ms, function () { lampEl.hidden = true; }); }
      function bigText(t, ms) { bigEl.textContent = t; bigEl.hidden = false; later(ms, function () { bigEl.hidden = true; }); }
      function btnPos() { const r = btn.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 3 }; }
      function tinyVisual() {
        const o = bagNext('tv', TV), a = o[1], R = rm();
        speak('M', o[0]);
        if (a === 'lamp') lampFlicker(2000);
        else if (a === 'confetti1') { const p = btnPos(); api.confetti(p.x, p.y, 1); }
        else if (a === 'tilt') { if (!R) flash(stage, c('a-tilt'), 3000); }
        else if (a === 'pixel') { if (!R) flash(btnwrap, c('g-pixel'), 2000); }
        else if (a === 'invert') { if (!R) flash(stage, c('a-invert'), 300); }
        else if (a === 'blue') flash(stage, c('a-blue'), 1500);
        else if (a === 'flash75') bigText('7 1/2', 1000);
        else if (a === 'stair') { if (!R) flash(stage, c('a-stair'), 4000); }
        else if (a === 'chime') api.sfx('bell');
        else if (a === 'tile') {
          tileEl.style.left = api.randInt(8, 80) + '%'; tileEl.style.bottom = api.randInt(4, 24) + '%'; tileEl.hidden = false;
          later(4000, function () { tileEl.hidden = true; });
        } else if (a === 'shadow') flash(stage, c('a-shadow'), 3000);
        else if (a === 'roman') {
          romanEl.textContent = toRoman(S.presses); romanEl.hidden = false;
          later(7500, function () { romanEl.hidden = true; });
        }
      }
      function closeDialog() { dialogUp = false; api.clearTimeout(dlgTimer); dialogEl.hidden = true; }
      function showDialog(item, esc, after) {
        if (dialogUp) return;
        dialogUp = true;
        const mkb = function (label) {
          return el('button', { class: c('dbtn'), type: 'button', onclick: function () {
            if (!dialogUp) return;
            closeDialog();
            if (esc) speak('B', ESC_AFTER, { mood: 'proud' });
            else { api.award(0.1, 'a dialog'); api.sfx('pop'); speak('M', after || bagNext('dok', DIALOG_OK)); }
          } }, label);
        };
        clearKids(dialogEl);
        dialogEl.appendChild(el('div', { class: c('dtitle'), text: 'Notice (Mandatory)' }));
        dialogEl.appendChild(H('div', { class: c('dbody') }, [el('span', { class: c('dicon'), 'aria-hidden': 'true', text: '⚠️' }), el('span', { text: item[0] })]));
        dialogEl.appendChild(H('div', { class: c('dbtns') }, esc ? [mkb('Stay'), mkb('Stay (Alternate)')] : [mkb(item[1] || 'OK')]));
        dialogEl.hidden = false;
        api.sfx('blip');
        /* the dialog is not a live region itself: say it once to screen readers, and give keyboard players longer to find it */
        srEl.textContent = 'Notice: ' + item[0] + (esc ? ' Choices: Stay, Stay (Alternate).' : item[1] ? ' Choice: ' + item[1] + '.' : ' Choice: OK.');
        let kb = false;
        try { const ae = document.activeElement; kb = !!(ae && root.contains(ae) && ae.matches(':focus-visible')); } catch (x) { kb = false; }
        dlgTimer = api.setTimeout(function () { if (dialogUp) closeDialog(); }, kb ? 13000 : after ? 11000 : 7000);
      }
      function closeQ() { qUp = false; api.clearTimeout(qTimer); cardEl.hidden = true; }
      function showQuestion() {
        if (qUp) return;
        qUp = true;
        const q = bagNext('q', QUESTIONS);
        const btns = q.a.map(function (a) { return el('button', { class: c('dbtn'), type: 'button', onclick: function () { answerQ(a); } }, a[0]); });
        clearKids(cardEl);
        cardEl.appendChild(el('div', { text: q.q }));
        cardEl.appendChild(H('div', { class: c('dbtns') }, btns));
        cardEl.hidden = false;
        speak('B', q.q, { mood: 'confused' });
        qTimer = api.setTimeout(function () { if (qUp) { closeQ(); speak('B', Q_EXPIRE, { mood: 'disappointed' }); } }, 12000);
      }
      function answerQ(a) {
        if (!qUp) return;
        closeQ();
        api.award(0.1, 'a question'); api.stat.inc('the-button.questions'); api.sfx('ding');
        if (a[2]) later(a[2], function () { speak('B', a[1], { mood: 'smug' }); }); else speak('B', a[1], { mood: 'smug' });
      }
      function tosReading() {
        const i = S.tosIdx % TOS.length, round = Math.floor(S.tosIdx / TOS.length), cl = TOS[i];
        S.tosIdx++; S.clauses++;
        api.stat.inc('the-button.clauses');
        let line = 'Clause ' + cl[0] + (round > 0 ? ' (second reading)' : '') + ": '" + cl[1] + "'";
        if (cl[0] === '7' && !S.done.half) { S.done.half = true; line += ' ' + TOS_HALF; }
        const dir = bagNext('tosdir', TOS_DIR);
        setMode('reading');
        modeLater(sc(2200, 300), function () { setMode('idle'); }, 'reading');
        const tok = setCaption(dir, 'dir');
        const shown = (S.season > 1 ? 'Revised: ' : '') + line;
        tosHold = api.now() + (rm() ? 0 : 450) + (rm() || api.selftest ? 0 : 12 * shown.length) + 1500;
        later(rm() ? 0 : 450, function () { if (capTok === tok) typeCaption(shown); });
        speak('M', line, { cap: false, sayText: dir + ' ' + line, mood: 'proud', pri: 1 });
        api.sfx('bloop');
        if (S.clauses % 8 === 0) {
          api.award(1, 'a completed set of clauses'); api.sfx('tada');
          later(1800, function () { speak('M', bagNext('tosset', TOS_SET), { mood: 'proud', pri: 1 }); });
        }
      }
      function noteOutcome() {
        const t = nextNote();
        placeNote(t);
        if (S.notes <= 3) speak('M', NOTE_INTRO, { vars: { NOTE: t } });
        else speak('D', "[A sticky note reads: '" + t + "']");
      }
      function gag(id, ms) { if (rm() && id !== 'sweat') return; flash(btnwrap, c('g-' + id), ms); }
      function physical() {
        const avail = WEAR_ORDER.filter(function (id) { return S.wear.indexOf(id) < 0 && WEAR[id].t <= tier; });
        if (avail.length && S.wear.length < 7 && api.chance(0.5)) {
          const id = avail[0];
          S.wear.push(id); renderWear(); api.sfx('pop');
          speak('M', WEAR[id].line, { mood: 'confused' });
          return;
        }
        const g = bagNext('gag', GAGS);
        speak('M', g[0], { mood: 'confused' });
        gag(g[1], g[2]);
      }
      function ledger() {
        const t = bagNext('ledger', LEDGER);
        if (t !== 'PROGRESS99') { speak('M', t, { mood: 'smug' }); return; }
        const tok = setCaption('Processing your press...', '');
        prog.classList.add(c('on')); prog.classList.remove(c('go'));
        void prog.offsetWidth; prog.classList.add(c('go'));
        later(1500, function () { if (capTok === tok) speak('M', PROG_DONE, { mood: 'disappointed' }); });
      }
      function cameo(kids, ms, stopAt, fn) {
        const tok = ++cameoTok;
        clearKids(cameoEl); kids.forEach(function (k) { cameoEl.appendChild(k); });
        cameoEl.hidden = false; cameoEl.classList.remove(c('go'), c('pup')); void cameoEl.offsetWidth;
        if (!rm()) cameoEl.classList.add(c(stopAt ? 'go' : 'pup'));
        if (fn) later(rm() ? 0 : stopAt, fn);
        later(rm() ? 3000 : ms, function () { if (tok === cameoTok) { cameoEl.hidden = true; cameoEl.classList.remove(c('go'), c('pup')); } });
      }
      function cast() {
        const opts = [];
        if (geraldN < 3) opts.push(['g', 55]);
        if (!sess.dennis) opts.push(['d', 20]);
        if (!sess.sock && api.flag.get('sockSeen')) opts.push(['s', 40]);
        opts.push(['t', 25]);
        let tot = 0; opts.forEach(function (o) { tot += o[1]; });
        let r = api.rand() * tot, pick = opts[opts.length - 1][0];
        for (let i = 0; i < opts.length; i++) { r -= opts[i][1]; if (r < 0) { pick = opts[i][0]; break; } }
        if (pick === 'g') {
          const met = !!api.flag.get('metGerald'), gl = met ? bagNext('gm', GERALD_MET) : bagNext('gn', GERALD_NEW), first = geraldN === 0;
          /* Gerald slides in, stops beside the plinth, and only then does Management speak */
          cameo([el('span', { style: { position: 'relative', display: 'inline-block' } }, '🥔', el('span', { style: { position: 'absolute', left: '.1em', top: '-.5em', fontSize: '.75em', transform: 'rotate(-12deg)' } }, '🎩'))], 5600, 1960, function () {
            speak('M', gl, { mood: 'confused' });
            if (met && first) placeNote(NOTES[8]);
          });
          geraldN++;
        } else if (pick === 's') {
          sess.sock = true;
          const sl = bagNext('sock', SOCK);
          /* the Missing Sock, with a very small bag, and Management following at what it believes is a distance */
          cameo([el('span', { text: '🧦' }), el('span', { style: { fontSize: '.5em' }, text: '🎒' }), el('span', { style: { marginLeft: '1.3em', fontSize: '.8em' }, text: '👔' })], 5600, 1960, function () { speak('M', sl, { mood: 'confused' }); });
        } else if (pick === 'd') {
          sess.dennis = true;
          speak('M', api.flag.get('metDennis') || api.flag.get('plantClicked') ? DENNIS_MET : DENNIS1, { mood: 'neutral' });
          if (tier >= 2) later(8000, function () { speak('B', DENNIS2, { mood: 'smug' }); });
        } else { const o = bagNext('tue', TUESDAY); speak(o[0], o[1], { mood: 'confused' }); }
      }
      function toaster() {
        let t = bagNext('toaster', TOASTER);
        if (t === TOASTER[8] && tier < 3) t = bagNext('toaster', TOASTER);
        if ((api.flag.get('metToaster') || api.flag.get('toaster.met')) && api.chance(0.55)) t = bagNext('toasterm', TOASTER_MET);
        api.sfx('ding');
        cameo([el('span', { text: '🍞' })], 2600, 0, null);
        speak('M', t, { mood: 'confused' });
      }
      function spread(a) {
        let m = 0;
        for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) m = Math.max(m, Math.sqrt(Math.pow(a[i].x - a[j].x, 2) + Math.pow(a[i].y - a[j].y, 2)));
        return m;
      }
      function meta(info) {
        const now = api.now();
        let hour = -1;
        try { hour = new Date().getHours(); } catch (e) { hour = -1; } // lint-ignore wall clock is only used for flavour text
        const iv = intervals.slice(-4), avg = iv.length ? iv.reduce(function (a, b) { return a + b; }, 0) / iv.length : 0;
        let sd = 0;
        if (iv.length) sd = Math.sqrt(iv.reduce(function (a, b) { return a + (b - avg) * (b - avg); }, 0) / iv.length);
        const r = typeof info.r === 'number' ? info.r : -1, px = info.source === 'pointer' && typeof info.offX === 'number';
        const tests = [['grip', gripping > 0], ['key', info.source === 'key'], ['night', hour >= 22 || (hour >= 0 && hour <= 4)], ['morning', hour >= 5 && hour <= 10],
          ['afternoon', hour >= 12 && hour <= 17 && api.chance(0.5)], ['same', posHist.length >= 3 && spread(posHist) <= 14],
          ['three', intervals.length >= 2 && intervals.slice(-2).every(function (x) { return x < 600; })], ['fast', iv.length >= 4 && avg > 0 && avg < 400],
          ['slow', iv.length >= 4 && avg > 4000], ['steady', iv.length >= 4 && sd < 120], ['irregular', iv.length >= 4], ['centre', r >= 0 && r < 0.15],
          ['offcentre', r > 0.55 && r <= 0.74], ['left', px && info.offX < -20], ['right', px && info.offX > 20], ['hesitant', info.holdMs >= 250 && info.holdMs < 400]];
        for (let i = 0; i < tests.length; i++) {
          const k = tests[i][0];
          if (!tests[i][1] || (metaAt[k] && now - metaAt[k] < sc(40000, 3000))) continue;
          metaAt[k] = now;
          if (k === 'grip') gripping = 0;
          speak('B', META[k], { vars: { CPS: avg > 0 ? (1000 / avg).toFixed(1) : '1.0' }, mood: 'smug' });
          return;
        }
        speak('B', bagNext('opn' + tier, OPN[tier]), { mood: OPN_MOOD[tier] });
      }
      function rumour() {
        const pool = RUMOURS.slice();
        if (api.flag.get('staring-contest.met')) pool.push(RUM_STARE);
        let t = '';
        if (api.chance(0.22)) {
          let h = '';
          try { h = String(api.line('ticker') || '').replace(/[.!\s]+$/, ''); } catch (e) { h = ''; }
          if (h && h.length < 230) t = RUM_TICKER[0] + h + RUM_TICKER[1];
        }
        speak('B', t || bagNext('rum', pool), { mood: 'confused' });
      }
      function staplerVisit() {
        sess.stapler = true; api.stat.inc('the-button.rare');
        const met = !!api.flag.get('metStapler');
        api.sfx('bell');
        showDialog(met ? STAP_MET : bagNext('stap', STAP_NEW), false, STAP_M);
        api.flag.set('metStapler', true);
      }
      function tuesdayDrill() {
        sess.drills = (sess.drills || 0) + 1; api.stat.inc('the-button.rare');
        api.sfx('buzz');
        stage.classList.add(c('dim'));
        speak('M', DRILL[0], { mood: 'panic', pri: 1 });
        later(sc(3400, 500), function () { speak('B', DRILL_B, { mood: 'panic' }); });
        later(sc(6600, 1000), function () {
          if (mode !== 'ceremony') stage.classList.remove(c('dim'));
          speak('M', DRILL[1], { mood: 'neutral', pri: 1 });
        });
      }
      function holdMusic() {
        const tok = setCaption(WAVE.slice(0, 14), 'mono');
        let k = 0;
        api.sfx('bloop'); later(1500, function () { api.sfx('bloop'); });
        waveIv = api.setInterval(function () {
          if (capTok !== tok) { stopWave(); return; }
          k++;
          capTxt.textContent = (WAVE + WAVE).substr(k % WAVE.length, 14);
          if (k >= 25) { stopWave(); speak('M', bagNext('hm', HOLDMUSIC), { mood: 'neutral' }); }
        }, 120);
      }
      function jackpotStart() {
        S.jackpots++; api.stat.inc('the-button.jackpots');
        jackpotChain = 1;
        api.award(0.1, 'a jackpot'); api.sfx('fanfare');
        const p = btnPos(); api.confetti(p.x, p.y, 40);
        jackEl.classList.remove(c('on')); void jackEl.offsetWidth; jackEl.classList.add(c('on'));
        later(2600, function () { jackEl.classList.remove(c('on')); });
        speak('M', JACK[0], { mood: 'proud', pri: 1 });
      }
      function jackpotStep() {
        api.award(0.1, 'a prize');
        if (jackpotChain < 3 && api.chance(0.7)) {
          jackpotChain++;
          speak('M', JACK[jackpotChain - 1], { mood: 'proud', pri: 1 });
          api.sfx('tada');
          if (jackpotChain === 3) {
            jackpotChain = 0; api.award(1, 'a full chain'); api.sfx('fanfare');
            const p = btnPos(); api.confetti(p.x, p.y, 50);
          }
        } else { jackpotChain = 0; speak('M', JACK[3], { mood: 'neutral', pri: 1 }); }
      }
      function runFamily(fam, info) {
        lastFamily = fam; nothingRun = fam === 'nothing' ? nothingRun + 1 : 0;
        if (fam === 'nothing') nothing({});
        else if (fam === 'ts') { const o = bagNext('ts', TS); api.sfx(o[1]); speak('M', o[0]); }
        else if (fam === 'tv') tinyVisual();
        else if (fam === 'dialog') showDialog(bagNext('dlg', DIALOGS), false);
        else if (fam === 'tos') tosReading();
        else if (fam === 'opinion') speak('B', bagNext('opn' + tier, OPN[tier]), { mood: OPN_MOOD[tier] });
        else if (fam === 'note') noteOutcome();
        else if (fam === 'physical') physical();
        else if (fam === 'ledger') ledger();
        else if (fam === 'cast') cast();
        else if (fam === 'meta') meta(info);
        else if (fam === 'rumour') rumour();
        else if (fam === 'hold') holdMusic();
        else if (fam === 'question') showQuestion();
      }
      function pickFamily() {
        const opts = [];
        let tot = 0;
        Object.keys(WEIGHTS).forEach(function (k) {
          const w = WEIGHTS[k][tier];
          if (!w) return;
          /* rule of three, then break it: in the first ten presses Nothing never comes twice in a row */
          if (k === lastFamily && !(k === 'nothing' && (tier === 0 || tier === 5) && nothingRun < (tier === 0 && S.presses < 10 ? 1 : 2))) return;
          if ((k === 'dialog' && dialogUp) || (k === 'question' && qUp)) return;
          opts.push([k, w]); tot += w;
        });
        if (!opts.length) return 'nothing';
        let r = api.rand() * tot;
        for (let i = 0; i < opts.length; i++) { r -= opts[i][1]; if (r < 0) return opts[i][0]; }
        return opts[opts.length - 1][0];
      }
      function normalPick(info) {
        if (backFlag) { backFlag = false; lastFamily = 'opinion'; speak('B', IDLE_BACK, { mood: 'smug' }); return; }
        let fam = pickFamily();
        if (tier === 0 && S.presses > 3 && fam === 'nothing' && api.chance(0.2)) fam = 'opinion';
        if (S.season > 1 && (fam === 'nothing' || fam === 'opinion') && api.chance(0.25)) {
          lastFamily = 'opinion';
          let k = bagNext('know', KNOWING);
          if ((sess.revN || 0) > 12 && !api.chance(0.17)) k = k.replace(/^Revised: /, ''); /* the tic has been retired; it only comes back now and then */
          speak('B', k, { mood: 'smug', raw: true });
          return;
        }
        runFamily(fam, info);
      }
      function outcome(info) {
        if (mode === 'scared') { nothing({ scared: true }); return; }
        if (jackpotChain > 0) { jackpotStep(); return; }
        if (info.zone === 'rim' && api.chance(0.7)) {
          if (tier >= 2 && rimCount >= 3 && !sess.rimPrefer) { sess.rimPrefer = true; speak('B', RIM_PREFER, { mood: 'confused' }); return; }
          const t = bagNext('rim', RIM);
          speak(t === 'Ow.' ? 'B' : 'M', t, { mood: 'disappointed' });
          return;
        }
        const hm = info.holdMs || 0;
        if (hm >= 4000) { api.stat.inc('the-button.holds'); speak('M', bagNext('occ', OCCUR), { vars: { S: (hm / 1000).toFixed(1) }, mood: 'confused' }); return; }
        if (hm >= 1500) { api.stat.inc('the-button.holds'); speak('M', bagNext('linger', LINGER), { vars: { S: (hm / 1000).toFixed(1) }, mood: 'confused' }); return; }
        if (hm >= 400) {
          restart(face, c('squint')); later(450, function () { face.classList.remove(c('squint')); });
          if (api.chance(0.35)) { speak('M', bagNext('firm', FIRM), { mood: 'smug' }); return; }
        }
        if (S.presses >= 15 && S.presses % 15 === 0) { toaster(); return; }
        if (S.presses > 20 && mode !== 'overwhelmed' && api.chance(1 / 60)) { jackpotStart(); return; }
        if (S.presses > 30 && tier >= 2 && mode === 'idle' && !dialogUp && !sess.stapler && api.chance(sc(1 / 70, 1 / 14))) { staplerVisit(); return; }
        if (S.presses > 40 && mode === 'idle' && (sess.drills || 0) < 2 && api.chance(sc(1 / 90, 1 / 16))) { tuesdayDrill(); return; }
        normalPick(info);
      }
      /* press 100: a rehearsal of the tribute that waits at press 260. Presses, season and sign are untouched; only the mood of the room changes.
         It is booked at press 100 and starts from tick() as soon as the room is quiet (a spammer's strike or escort goes first). */
      function rehearsal() {
        if (sess.rehearsed) return;
        sess.rehearsed = true; sess.rehDue = 0; api.stat.inc('the-button.rare');
        closeQ(); closeDialog(); jackpotChain = 0; endHold();
        setMode('rehearsal');
        stage.classList.add(c('curt-on'), c('dim')); api.sfx('whoosh');
        speak('M', REH[0], { mood: 'proud', pri: 1 });
        modeLater(sc(3300, 450), function () { api.sfx('bell'); speak('M', REH[1], { mood: 'confused', pri: 1 }); }, 'rehearsal');
        modeLater(sc(7200, 900), function () { speak('B', REH[2], { mood: 'panic', pri: 1 }); }, 'rehearsal');
        modeLater(sc(10200, 1300), function () {
          setMode('idle'); /* the curtains reopen */
          tempMus = true; renderWear(); api.sfx('pop'); api.sfx('whoosh');
          api.award(1, 'a rehearsal');
          speak('M', REH[3], { mood: 'smug', pri: 1 });
          later(sc(20000, 4000), function () { tempMus = false; renderWear(); });
        }, 'rehearsal');
      }
      /* press 125: the press-12 mystery pays off in the same language it was set up in: lamp, silence, a rolled-back odometer */
      function draftReveal() {
        const carried = Math.max(1, S.presses - 12);
        setMode('draft'); /* a short set piece: presses are ignored for its six seconds, so nothing overwrites the payoff */
        silence(); lampFlicker(1600);
        odoHold = 12; renderOdo();
        modeLater(1500, function () { odoHold = -1; renderOdo(); }, 'draft');
        modeLater(sc(1800, 300), function () { bigText('DRAFT', 2500); api.sfx('stamp'); speak('M', L125_DRAFT, { mood: 'proud', pri: 1 }); }, 'draft');
        modeLater(sc(4800, 800), function () { speak('B', DRAFT_B, { vars: { D: carried }, mood: 'confused' }); }, 'draft');
        modeLater(sc(6200, 1100), function () { setMode('idle'); }, 'draft');
      }
      /* ---------- scripted presses */
      const SCRIPT = [
        { id: 'p1', at: 1, run: function () { nothing({}); } },
        { id: 'p2', at: 2, run: function () { nothing({}); } },
        { id: 'p3', at: 3, run: function () { nothing({}); } },
        { id: 'p4', at: 4, run: function () { speak('B', P4_B, { mood: 'confused' }); } },
        { id: 'p5', at: 5, run: function () { speak('M', L5_SIGN, { mood: 'disappointed' }); } },
        { id: 'p10', at: 10, run: function () { speak('B', FELT_B, { mood: 'confused' }); } },
        { id: 'p12', at: 12, s2: true, run: function () {
          silence(); lampFlicker(1600);
          if (S.season > 1) later(1500, function () { speak('B', NOT_AGAIN, { raw: true, mood: 'confused' }); });
        } },
        { id: 'p26', at: 26, run: function () { speak('M', L26_TOS, { mood: 'proud', pri: 1 }); } },
        { id: 'p30', at: 30, run: function () { placeNote(NOTES[7]); speak('M', L30_SANDRA, { mood: 'confused', pri: 1 }); } },
        { id: 'p50', at: 50, run: function () { speak('B', SPEECH_B, { mood: 'disappointed' }); } },
        { id: 'p60', at: 60, run: function () { S.stamp = api.randInt(0, 4); renderOdo(); api.sfx('stamp'); speak('M', L60_STAMP, { mood: 'proud', pri: 1 }); } },
        { id: 'p70', at: 70, run: function () { syncUi(); api.sfx('pop'); speak('M', L70_SMALL, { mood: 'confused', pri: 1 }); } },
        { id: 'p99', at: 99, run: function () { silence(); } },
        { id: 'p100', at: 100, run: function () {
          speak('B', THANKS_B, { mood: 'proud' });
          later(sc(3000, 600), function () { speak('M', L100_TWELVE, { mood: 'smug', pri: 1 }); });
          sess.rehDue = api.now() + sc(7000, 1400);
        } },
        { id: 'p125', at: 125, run: function () { api.achieve('the-button.twelfth'); draftReveal(); } },
        { id: 'p150', at: 150, run: function () { speak('M', L150_WALL, { mood: 'proud', pri: 1 }); } },
        { id: 'p213', at: 213, run: function () { speak('B', L213_DATES, { mood: 'proud' }); } },
        { id: 'p250', at: 250, run: function () { speak('M', L250_SPEECH, { mood: 'proud', pri: 1 }); } }
      ];
      function warpCheck() {
        let to = WARPS[regCount] || 0;
        /* the last jump waits until the rehearsal (100) and the draft (125) have had their turn */
        if (!to && regCount >= 12 && S.presses < 255 && S.done.p100 && S.done.p125 && !(sess.rehDue && !sess.rehearsed)) to = 258;
        if (!to || S.presses >= to) return;
        SCRIPT.forEach(function (e) { if (e.at <= to) S.done[e.id] = true; });
        S.presses = to;
      }
      /* ---------- pressing */
      function silentNext() { const n = S.presses + 1; return (mode === 'idle' || mode === 'reading') && (n === 12 || (S.season === 1 && n === 99)); }
      function pressFx(info) {
        restart(gear, c('turn'));
        if (!rm()) restart(ripple, c('go'));
        if (!((S.presses === 12) || (S.season === 1 && S.presses === 99))) api.sfx(info.consumed ? 'pop' : 'blip');
      }
      function registerPress(info) {
        if (dead) return;
        const now = api.now();
        touch();
        if (mode !== 'idle' && mode !== 'scared' && mode !== 'reading') { ignoredPress(); return; }
        pressTimes = pressTimes.filter(function (t) { return now - t < 2000; });
        if (pressTimes.length >= 7) { overwhelm(pressTimes.length + 1); return; }
        pressTimes.push(now);
        if (mode === 'reading') setMode('idle'); /* a new press replaces the spotlight reading */
        if (S.presses < 260) S.presses++; /* the counter waits at 260 if the tribute has been postponed, so the speech and the odometer agree */
        regCount++;
        api.stat.inc('the-button.presses');
        api.achieve('the-button.first');
        if (regCount === 1 && !rm()) flash(signCol, c('g-wobble'), 1400); /* the sign flinches at the first press that breaks its rule */
        const amt = info.consumed ? 0 : info.holdMs >= 1500 ? 0.5 : 0.1;
        if (amt > 0) api.award(amt, 'a press');
        if (api.selftest) warpCheck();
        pressFx(info);
        if (lastPressT) { intervals.push(now - lastPressT); if (intervals.length > 5) intervals.shift(); }
        lastPressT = now;
        if (info.source === 'pointer' && isFinite(info.cx) && isFinite(info.cy)) { posHist.push({ x: info.cx, y: info.cy }); if (posHist.length > 3) posHist.shift(); }
        if (info.zone === 'rim') { rimCount++; api.stat.inc('the-button.rim'); }
        if (idleGap > sc(60000, 2000) && regCount > 1) backFlag = true;
        idleGap = 0;
        if (stickerOn) {
          stickerOn = false; signEl.classList.remove(c('sticky'));
          later(900, function () { speak('M', IDLE_PEEL, { mood: 'smug', pri: 1 }); });
          later(900 + sc(2400, 500), function () { speak('B', IDLE_LISTEN, { mood: 'proud' }); });
        }
        if (!sess.half) {
          try {
            const d = new Date(); // lint-ignore wall clock is only used for the 7:30 joke
            if ((d.getHours() === 7 || d.getHours() === 19) && d.getMinutes() === 30) { sess.half = true; speak('B', CAL_B, { mood: 'smug' }); placeNote('7 1/2. -Calendar'); }
          } catch (e) { /* no clock, no joke */ }
        }
        let handled = false;
        if (!info.consumed) {
          const due = SCRIPT.filter(function (e) { return S.presses >= e.at && !S.done[e.id] && (S.season === 1 || e.s2); });
          if (due.length) { due.forEach(function (e) { S.done[e.id] = true; }); due[due.length - 1].run(); handled = true; }
          if (!handled) outcome(info);
        }
        afterPress();
      }
      function afterPress() {
        if (tier >= 2 && S.flagIdx < 8 && S.presses >= S.flagAt) { if (S.flagIdx === 6 && tier < 4) S.flagAt = S.presses + 8; else showFlag(); }
        if (tier >= 3 && api.chance(1 / 150)) {
          apprChip.textContent = 'Approved Presses: 1'; apprChip.classList.add(c('hot'));
          api.setTimeout(function () { apprChip.textContent = 'Approved Presses: 0'; apprChip.classList.remove(c('hot')); }, 80);
          speak('B', FLICKER_B, { mood: 'confused' });
        }
        signCheck(); tierCheck(true); renderOdo(); syncUi(); persist();
        if (S.presses >= 260 && mode !== 'ceremony') {
          /* a very fast clicker has skipped most of the show: the tribute waits until the season is at least a couple of minutes old */
          if (S.secs >= sc(150, 5)) beginCeremony();
          else if (!sess.cerWait) { sess.cerWait = true; speak('M', CER_WAIT, { mood: 'smug', pri: 1 }); }
        }
      }
      function ignoredPress() {
        restart(btn, c('sq'));
        if (mode !== 'overwhelmed' && mode !== 'strike') return;
        S.spamPresses++;
        if (S.spamPresses % 5 === 0) speak('M', SMOKING, { mood: 'panic' });
        else if (S.spamPresses % 3 === 0) speak('B', bagNext('ign', IGN), { mood: 'panic' });
        if (!S.escorted && S.spamPresses >= sc(100, 12)) startEscort();
        else if (!S.struck && mode !== 'strike' && S.spamPresses >= sc(40, 6)) startStrike();
      }
      function overwhelm(n) {
        pressTimes = [];
        setMode('overwhelmed');
        api.stat.inc('the-button.spam_events');
        api.award(-1, 'spam fee'); api.sfx('buzz'); api.achieve('the-button.rate');
        sess.ov = (sess.ov || 0) + 1;
        speak('M', sess.ov === 1 ? bagNext('over', OVERWHELM) : sess.ov === 2 ? bagNext('over2', OVER2) : bagNext('over3', OVER3), { vars: { N: n }, mood: 'panic', pri: 1 });
        /* the Notice gets the caption for a couple of seconds on its own; the fee follows it */
        const feeLine = sess.ov === 1 ? FEE : bagNext('fee', FEES);
        modeLater(sc(2300, 400), function () { speak('M', feeLine, { mood: 'panic', pri: 1 }); }, 'overwhelmed');
        modeLater(3000, function () { setMode('idle'); }, 'overwhelmed');
      }
      function startStrike() {
        S.struck = true; persist();
        setMode('strike');
        speak('M', STRIKE_M, { mood: 'confused', pri: 1 });
        modeLater(2400, function () { speak('B', bagNext('chant', CHANT), { mood: 'confused' }); }, 'strike');
        modeLater(5000, function () { speak('B', STRIKE_END, { mood: 'disappointed' }); setMode('idle'); }, 'strike');
      }
      function negotiate() {
        if (mode !== 'strike') return;
        api.award(0.5, 'a negotiation'); api.achieve('the-button.negotiator'); api.sfx('ding');
        speak('M', STRIKE_WIN, { mood: 'proud', pri: 1 });
        setMode('idle');
      }
      function startEscort() {
        S.escorted = true; persist();
        setMode('escort');
        speak('M', ESCORT_M, { mood: 'confused', pri: 1 });
        modeLater(sc(6000, 1500), function () {
          if (S.wear.indexOf('sunglasses') < 0) S.wear.push('sunglasses');
          renderWear(); setMode('idle'); persist();
        }, 'escort');
      }
      function aborted() { api.stat.inc('the-button.aborted'); api.sfx('pop'); speak('M', bagNext('abort', ABORTED), { mood: 'neutral' }); }
      /* ---------- holding */
      function zoneOf(x, y) {
        const r = btn.getBoundingClientRect(), rad = Math.max(1, r.width / 2), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        if (!isFinite(x) || !isFinite(y)) return { r: 0, offX: 0, offY: 0, zone: 'dome' };
        const dx = x - cx, dy = y - cy, d = Math.sqrt(dx * dx + dy * dy) / rad;
        return { r: d, offX: dx, offY: dy, zone: d <= 0.74 ? 'dome' : d <= 1 ? 'rim' : 'out' };
      }
      function endHold() {
        holdTimers.forEach(function (h) { api.clearTimeout(h); });
        holdTimers = []; hold = null;
        btn.classList.remove(c('down')); btnwrap.classList.remove(c('holding'));
      }
      function startHold(source, e) {
        const tok = ++holdTok;
        hold = { t0: api.now(), id: e ? e.pointerId : -1, source: source, consumed: false, tok: tok };
        btn.classList.add(c('down')); btnwrap.classList.add(c('holding'));
        if (!silentNext()) api.sfx('tick');
        if (e) { try { btn.setPointerCapture(e.pointerId); } catch (x) { /* synthetic pointers cannot be captured */ } }
        clearHover();
        holdTimers.push(api.setTimeout(function () { if (hold && hold.tok === tok && !dead) archduke(); }, 7500));
        holdTimers.push(api.setTimeout(function () { if (hold && hold.tok === tok && !dead) hold10(); }, 10000));
      }
      function archduke() {
        if (!hold || hold.consumed || mode === 'ceremony') return;
        hold.consumed = true;
        api.stat.inc('the-button.holds'); api.award(7.5, 'the seven-and-a-half-second hold'); api.achieve('the-button.hold75'); api.sfx('ding');
        speak('M', ARCH_M, { mood: 'confused', pri: 1 });
        later(1300, function () { speak('D', ARCH_D, { mood: 'proud', pri: 1 }); });
        later(3600, function () { if (mode !== 'ceremony') nothing({}); }); /* lands after the 10-second joke (HOLD10), not on top of it */
        if (!rm()) { flash(btnwrap, c('orbit'), 4000); flash(root, c('cry'), 4000); }
      }
      function hold10() {
        if (sess.h10 || mode === 'ceremony') return;
        sess.h10 = true; api.award(0.5, 'a very long hold');
        speak('M', HOLD10, { mood: 'confused', pri: 1 });
      }
      function finishPointer(e) {
        if (dead || !hold || hold.source !== 'pointer') return;
        if (e.pointerId !== undefined && hold.id !== undefined && hold.id !== -1 && e.pointerId !== hold.id) return;
        lastInputAt = api.now(); touch();
        const h = hold, holdMs = api.now() - h.t0, z = zoneOf(e.clientX, e.clientY);
        endHold();
        if (z.zone === 'out') { aborted(); return; }
        registerPress({ zone: z.zone, holdMs: holdMs, source: 'pointer', offX: z.offX, offY: z.offY, r: z.r, cx: e.clientX, cy: e.clientY, consumed: h.consumed });
      }
      function keyIs(e) { return e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'; }
      function clearHover() { if (hoverT) { api.clearTimeout(hoverT); hoverT = 0; } }
      api.on(btn, 'pointerdown', function (e) {
        if (dead) return;
        if (e.pointerType === 'mouse' && e.button > 0) return;
        if (hold) { if (api.now() - hold.t0 < 1500) return; endHold(); }
        touch(); lastInputAt = api.now();
        startHold('pointer', e);
      });
      api.on(document, 'pointerup', finishPointer);
      api.on(document, 'pointercancel', function () { if (hold && hold.source === 'pointer') endHold(); });
      api.on(btn, 'lostpointercapture', function () { if (hold && hold.source === 'pointer' && api.now() - hold.t0 > 60) endHold(); });
      api.on(window, 'blur', function () { if (hold) endHold(); });
      api.on(btn, 'contextmenu', function (e) { e.preventDefault(); });
      api.on(btn, 'click', function () {
        if (dead || api.now() - lastInputAt < 700) return;
        lastInputAt = api.now();
        registerPress({ zone: 'dome', holdMs: 0, source: 'click', consumed: false });
      });
      api.on(btn, 'keydown', function (e) {
        if (dead || !keyIs(e)) return;
        e.preventDefault();
        if (e.repeat) { gripping++; return; }
        if (hold) return;
        touch(); lastInputAt = api.now();
        startHold('key', null);
      });
      api.on(btn, 'keyup', function (e) {
        if (dead || !keyIs(e)) return;
        e.preventDefault();
        lastInputAt = api.now();
        if (!hold || hold.source !== 'key') return;
        const h = hold, holdMs = api.now() - h.t0;
        endHold();
        registerPress({ zone: 'dome', holdMs: holdMs, source: 'key', consumed: h.consumed });
      });
      api.on(btn, 'blur', function () { if (hold && hold.source === 'key') endHold(); });
      api.on(btn, 'focus', function () {
        if (!sess.focus && api.now() - tabAt < 1500) { sess.focus = true; speak('B', FOCUS, { mood: 'smug' }); }
      });
      api.on(btn, 'pointerenter', function () {
        clearHover();
        hoverT = api.setTimeout(function () {
          hoverT = 0;
          const now = api.now();
          if (dead || hold || mode === 'ceremony' || now - lastHover < 15000) return;
          lastHover = now;
          speak('M', bagNext('hover', HOVER), { mood: 'confused' });
          if (!rm()) flash(root, c('flinch'), 260);
        }, 4000);
      });
      api.on(btn, 'pointerleave', clearHover);
      /* the sign's words are buttons, and nothing says so: hovering over the sign for a moment makes the button nervous about it, which is the hint */
      api.on(signEl, 'pointerenter', function () {
        api.clearTimeout(signHintT);
        if (sess.signHint || mode !== 'idle') return;
        signHintT = api.setTimeout(function () {
          signHintT = 0;
          if (dead || sess.signHint || mode !== 'idle' || hold) return;
          sess.signHint = true; speak('B', SIGN_HINT, { mood: 'panic' });
        }, 2500);
      });
      api.on(signEl, 'pointerleave', function () { api.clearTimeout(signHintT); signHintT = 0; });
      api.on(root, 'pointermove', function (e) { if (isFinite(e.clientX) && isFinite(e.clientY)) look(e.clientX, e.clientY); });
      api.on(root, 'pointerdown', function () { touch(); });
      api.on(stage, 'pointerdown', function (e) {
        const t = e.target;
        if (!t || (t.closest && t.closest('button,.' + c('signcol') + ',.' + c('dialog') + ',.' + c('card')))) return;
        plinthPress();
      });
      api.on(root, 'keydown', function (e) {
        if (dead || e.key !== 'Escape') return;
        touch();
        if (hold && hold.source === 'key') { endHold(); speak('B', 'Hold cancelled. The button felt that.', { mood: 'disappointed' }); return; }
        if (mode === 'ceremony') return;
        if (escCount === 2 && dialogUp) { speak('B', ESC[2], { mood: 'smug' }); return; } /* another notice is up: the third Escape is not spent on it */
        escCount++;
        if (escCount === 3) showDialog([ESC_DIALOG], true);
        else speak('B', escCount < 3 ? ESC[escCount - 1] : bagNext('esc', ESC), { mood: 'smug' });
      });
      api.on(document, 'keydown', function (e) {
        if (dead) return;
        const now = api.now();
        if (e.key === 'Tab') tabAt = now;
        if (e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
        const t = e.target;
        if (t && /^(INPUT|TEXTAREA)$/.test(String(t.tagName))) return;
        touch();
        const ch = e.key.toLowerCase();
        if (!/[a-z0-9]/.test(ch)) return;
        typed = (typed + ch).slice(-12);
        for (let i = 0; i < TYPED.length; i++) {
          const w = TYPED[i];
          if (typed.slice(-w.length) === w && now - (typedAt[w] || -99999) > 4000) { typedAt[w] = now; typed = ''; typedWord(w); break; }
        }
      });
      api.on(document, 'visibilitychange', function () {
        if (document.hidden) { hiddenAt = api.now(); if (hold) endHold(); return; }
        if (!hiddenAt) return;
        const now = api.now(), d = now - hiddenAt;
        hiddenAt = 0;
        lastAct = Math.min(now, lastAct + d); /* time spent in a hidden tab is not idleness: nobody was there to be obedient */
        if (mode === 'ceremony' || now - lastBack < 8000) return;
        lastBack = now;
        speak('B', d < 20000 ? BACK_LINES[0] : d < 60000 ? BACK_LINES[1] : BACK_LINES[2], { mood: 'disappointed' });
      });
      api.on(window, 'resize', function () {
        resizeCount++;
        if (resizeCount === 10 && !S.done.sorry) sorryBtn.hidden = false;
        api.clearTimeout(rsT);
        rsT = api.setTimeout(function () {
          const now = api.now();
          if (dead || mode === 'ceremony' || root.clientWidth >= 420 || now - lastCozy < 20000) return;
          lastCozy = now;
          speak('B', bagNext('cozy', COZY), { mood: 'confused' });
          if (!rm()) flash(root, c('squish'), 3000);
        }, 400);
      });
      /* ---------- small interactions */
      const TYPED = ['please', 'sorry', 'why', 'hello', 'sandra', 'twelve', '12', 'tuesday', 'hug'];
      function typedWord(w) {
        if (mode === 'ceremony') return;
        if (w === 'please') speak('B', T_PLEASE, { mood: 'confused' });
        else if (w === 'sorry') speak('B', T_SORRY, { mood: 'confused' });
        else if (w === 'why') speak('B', T_WHY, { mood: 'confused' });
        else if (w === 'hello') speak('B', T_HELLO, { mood: 'neutral' });
        else if (w === 'sandra') { flash(root, c('rigid'), 3000); speak('B', T_SANDRA, { mood: 'panic' }); }
        else if (w === 'twelve' || w === '12') {
          speak('M', T_TWELVE, { mood: 'confused' }); lampFlicker(1500);
          later(1500, function () { speak('B', '...', { mood: 'confused' }); });
        } else if (w === 'tuesday') { flash(btnwrap, c('g-dread'), 3000); speak('B', `don't`, { mood: 'panic', raw: true }); }
        else if (w === 'hug') hug();
      }
      function hug() {
        const now = api.now();
        if (now - hugAt < 3000 || mode === 'ceremony') return;
        hugAt = now; touch();
        api.stat.inc('the-button.hugs'); api.award(0.2, 'a hug'); api.sfx('bloop');
        speak('M', bagNext('hug', HUG), { mood: 'proud' });
        if (!rm()) flash(btnwrap, c('g-wobble'), 1400);
      }
      function onFeel(i) {
        touch(); api.sfx('tick'); api.stat.inc('the-button.feels');
        if (!sess.faces) sess.faces = {};
        const first = !sess.faces[i];
        sess.faces[i] = true;
        if (Object.keys(sess.faces).length >= FACES.length && !sess.facesDone) {
          sess.facesDone = true;
          api.achieve('the-button.faces'); api.award(2, 'a complete emotional spectrum'); api.sfx('fanfare');
          const p = btnPos(); api.confetti(p.x, p.y, 24);
          speak('M', FACES_ALL, { mood: 'proud', pri: 1 });
          later(2400, function () { speak('B', FACES_B, { mood: 'smug' }); });
          return;
        }
        speak('M', first && FEEL_FIRST[i] ? FEEL_FIRST[i] : bagNext('feel', FEEL), { mood: 'neutral' });
      }
      function onBox() {
        touch(); api.stat.inc('the-button.box'); api.sfx('pop');
        sess.bx = (sess.bx || 0) + 1;
        if (sess.bx === 10) { speak('M', BOX_SPAM, { mood: 'confused', pri: 1 }); return; }
        speak('M', sess.boxVoice ? bagNext('box2', BOX2) : bagNext('box', BOX), { mood: 'neutral' });
      }
      function onSorry() {
        if (S.done.sorry) return;
        S.done.sorry = true; sorryBtn.hidden = true; persist();
        api.award(0.5, 'an apology'); api.sfx('ding');
        speak('B', SORRY_B, { mood: 'proud' });
      }
      function smallPress() {
        const now = api.now();
        touch();
        if (now - smallAt < 4000) { api.sfx('tick'); return; }
        smallAt = now;
        api.stat.inc('the-button.small'); api.award(0.1, 'a small press'); api.sfx('blip');
        const ex = bagNext('small', SMALL);
        speak(ex[0][0], ex[0][1], { mood: 'confused' });
        if (ex[1]) later(1600, function () { speak(ex[1][0], ex[1][1], { mood: 'confused' }); });
      }
      function onWord(raw, node) {
        if (dead) return;
        touch(); api.stat.inc('the-button.sign_clicks'); api.sfx('pop'); sess.signHint = true;
        const w = raw.replace(/[^A-Za-z]/g, '').toUpperCase();
        if (w === 'NOT') {
          if (mode !== 'idle' && mode !== 'reading') { speak('M', WORD_OTHER); return; }
          const cnt = currentSign().split(' ').filter(function (x) { return x.replace(/[^A-Za-z]/g, '').toUpperCase() === 'NOT'; }).length;
          if (cnt > 1) { speak('B', MISSING_DOUBLE, { mood: 'confused' }); return; }
          missingWord(node);
          return;
        }
        if (WORD_LINES[w]) {
          speak('B', WORD_LINES[w], { mood: w === 'PRESS' ? 'panic' : 'confused' });
          if (w === 'PRESS' && !rm()) flash(root, c('flinch'), 300);
          return;
        }
        speak('M', WORD_OTHER);
      }
      function missingWord(node) {
        if (!rm()) node.classList.add(c('gone'));
        setMode('scared');
        api.sfx('error');
        speak('B', MISSING_B, { mood: 'panic', pri: 1 });
        later(rm() ? 0 : 450, function () { if (mode === 'scared') { signMissing = true; renderSign(false); } });
        modeLater(sc(20000, 4000), function () { setMode('idle'); }, 'scared');
      }
      function plinthPress() {
        if (dead) return;
        const now = api.now();
        touch();
        if (mode === 'away') { if (now - plinthAt < 150) return; plinthAt = now; awayClick(); return; }
        if (mode === 'ceremony' || mode === 'escort') return;
        if (now - plinthAt < 250) return;
        plinthAt = now;
        api.stat.inc('the-button.plinth'); api.sfx('pop');
        sess.pl = (sess.pl || 0) + 1;
        if (sess.pl === 12 || sess.pl === 30) { speak('M', sess.pl === 12 ? PL_12 : PL_30, { mood: 'confused', pri: 1 }); return; }
        speak('M', bagNext('plinth', PLINTH), { mood: 'neutral' });
      }
      /* ---------- idle: obedience, lunch, rain, self-press */
      function obedience() {
        S.obeyed = true; persist();
        api.award(5, 'obedience'); api.achieve('the-button.obedient'); api.sfx('tada');
        signEl.classList.add(c('sticky')); stickerOn = true;
        speak('B', IDLE_OBEY_B, { mood: 'confused', pri: 1 });
        later(sc(2200, 400), function () { speak('M', IDLE_OBEY_M, { mood: 'proud', pri: 1 }); });
      }
      function selfPress() {
        S.presses++; S.selfPresses++;
        api.stat.inc('the-button.selfpresses');
        if (!rm()) flash(btnwrap, c('g-pixel'), 2000);
        speak('M', IDLE_SELF_M, { mood: 'smug', pri: 1 });
        later(sc(2600, 500), function () { speak('B', IDLE_SELF_B, { mood: 'smug' }); });
        signCheck(); tierCheck(true); renderOdo(); persist();
      }
      function startAway() {
        closeQ(); closeDialog(); jackpotChain = 0; endHold();
        setMode('away');
        plinthAway = 0; awayNote.textContent = AWAY_NOTE;
        speak('M', AWAY_M, { mood: 'neutral', pri: 1 });
      }
      function awayClick() {
        if (mode !== 'away') return;
        touch(); plinthAway++; api.sfx('pop');
        if (plinthAway < 7) { speak('M', AWAY_CLICKS[plinthAway - 1], { mood: 'neutral' }); return; }
        setMode('idle'); backFlag = true;
        api.award(2, 'lunch'); api.achieve('the-button.lunch'); api.sfx('fanfare');
        bigText('🥪', 1800);
        speak('M', AWAY_BACK, { mood: 'proud', pri: 1 });
      }
      function rain() {
        if (mode === 'away') awayNote.textContent = IDLE_RAIN; else placeNote(IDLE_RAIN, true);
        speak('B', IDLE_RAIN, { mood: 'disappointed' });
      }
      function rl(ms, fn) { later(ms, function () { if (mode !== 'ceremony') fn(); }); }
      function review3() {
        sess.rev3 = true; sess.rev3At = api.now(); api.stat.inc('the-button.reviews');
        api.award(0.5, 'a performance review'); api.sfx('bell');
        speak('M', REV3_M, { mood: 'proud', pri: 1 });
        rl(sc(3200, 500), function () { speak('B', REV3_B, { mood: 'confused' }); });
        rl(sc(6400, 900), function () { placeNote(REV3_NOTE); showDialog(REV3_D, false, REV3_ACK); });
      }
      function review10() {
        sess.rev10 = true; sess.boxVoice = true; api.stat.inc('the-button.reviews');
        api.sfx('bell'); if (!rm()) flash(boxBtn, c('g-wobble'), 1400);
        speak('M', REV10_M[0], { mood: 'proud', pri: 1 });
        rl(sc(3400, 500), function () { if (!rm()) flash(boxBtn, c('g-wobble'), 1400); speak('B', REV10_B, { mood: 'confused' }); });
        rl(sc(6800, 1000), function () { speak('M', REV10_M[1], { mood: 'smug', pri: 1 }); });
        rl(sc(10400, 1500), function () {
          bigText(REV10_BIG, 1800); api.award(1, 'a review'); api.sfx('fanfare');
          const p = btnPos(); api.confetti(p.x, p.y, 24);
          speak('M', REV10_M[2], { mood: 'proud', pri: 1 });
        });
      }
      function tick() {
        if (dead || document.hidden) return; /* a hidden tab is not idle, it is absent: no beats, no clock */
        const now = api.now(), idle = now - lastAct;
        S.secs++;
        RMc = rmRaw(); root.classList.toggle(c('rm'), RMc);
        if (mode !== 'ceremony') tierCheck(true);
        if (mode === 'idle' && S.presses >= 260 && S.secs >= sc(150, 5)) beginCeremony(); /* the postponed tribute, once the season is old enough */
        else if (mode === 'idle' && sess.rehDue && now >= sess.rehDue && S.presses < 200) rehearsal();
        if (mode === 'idle') {
          if (!idleFlags.obey && regCount === 0 && !S.obeyed && idle > sc(30000, 3000)) { idleFlags.obey = 1; obedience(); }
          /* the idle beats sit a few seconds after the minute lines (60s, 120s) so neither overwrites the other */
          if (!idleFlags.s60 && idle > sc(66000, 2000)) { idleFlags.s60 = 1; speak('M', IDLE_60, { mood: 'disappointed' }); }
          if (!idleFlags.hum && regCount === 0 && idle > sc(90000, 2600)) { idleFlags.hum = 1; speak('B', IDLE_HUM, { mood: 'confused' }); }
          if (!idleFlags.c20 && regCount > 0 && idle > sc(20000, 1200)) { idleFlags.c20 = 1; speak('B', bagNext('idlec' + tier, IDLE_CHAT[tier]), { mood: tier === 4 ? 'proud' : 'disappointed' }); }
          if (tier >= 4 && !idleFlags.t4 && idle > sc(33000, 3000)) { idleFlags.t4 = 1; speak('B', bagNext('idle4', IDLE_T4), { mood: 'proud' }); }
          if (!idleFlags.c45 && regCount > 0 && idle > sc(45000, 1700)) { idleFlags.c45 = 1; speak('M', bagNext('idle45', IDLE_45), { mood: 'confused' }); }
          if (!idleFlags.r90 && regCount > 0 && idle > sc(90000, 2600)) { idleFlags.r90 = 1; speak('B', bagNext('idle90', IDLE_90), { mood: 'smug' }); }
          if (!idleFlags.self && idle > sc(135000, 4000) && S.presses < 259) { idleFlags.self = 1; selfPress(); }
          if (!idleFlags.rep && regCount > 0 && idle > sc(200000, 5500)) { idleFlags.rep = 1; speak('M', bagNext('idle200', IDLE_200), { mood: 'disappointed' }); }
          if (!idleFlags.away && idle > sc(300000, 7000)) { idleFlags.away = 1; startAway(); }
        }
        if (mode === 'away') {
          if (!idleFlags.a1 && idle > sc(480000, 8200)) { idleFlags.a1 = 1; awayNote.textContent = AWAY_A1[0]; speak('M', AWAY_A1[1], { mood: 'neutral' }); }
          if (!idleFlags.a2 && idle > sc(900000, 9200)) { idleFlags.a2 = 1; awayNote.textContent = AWAY_A2[0]; speak('M', AWAY_A2[1], { mood: 'neutral' }); }
        }
        const sinceMount = now - mountT;
        if (mode === 'idle' || mode === 'reading') {
          for (let i = 0; i < MINUTES.length; i++) {
            const at = sc(MINUTES[i][0], MINUTES[i][0] / 24);
            if (sess['m' + i] || sinceMount < at) continue;
            sess['m' + i] = true;
            if (sinceMount < at + sc(30000, 4000)) speak('M', MINUTES[i][1], { mood: 'neutral' });
          }
          if (!sess.rev3 && sinceMount > sc(190000, 7000)) review3();
          else if (sess.rev3 && !sess.rev10 && sinceMount > sc(600000, 14000) && now - sess.rev3At > sc(40000, 6000)) review10(); /* after a long absence both reviews are due: the second waits its turn */
        }
        if ((mode === 'idle' || mode === 'away') && !idleFlags.rain && idle > sc(1200000, 10000)) { idleFlags.rain = 1; rain(); }
        const g = Math.floor((now - mountT) / sc(300000, 20000));
        if (g > ghostN) {
          ghostN = g;
          if (curSign >= 2 && mode === 'idle') {
            ghostEl.textContent = signTextFor(curSign - 1); ghostEl.classList.add(c('on'));
            later(2000, function () { ghostEl.classList.remove(c('on')); });
            speak('M', GHOST_M, { mood: 'confused' });
          }
        }
      }
      /* ---------- the ceremony */
      function gap() { return sc(3200, 350); }
      function ceLater(ms, fn) {
        const h = api.setTimeout(function () { if (dead || mode !== 'ceremony') return; fn(); }, ms);
        ceTimers.push(h);
        return h;
      }
      function ceClear() { ceTimers.forEach(function (h) { api.clearTimeout(h); }); ceTimers = []; }
      function cs(i, who) { speak(who || 'M', CER[i], { raw: true, mood: 'proud', pri: 1 }); }
      function beginCeremony() {
        closeQ(); closeDialog(); jackpotChain = 0; endHold(); cameoEl.hidden = true; odoHold = -1;
        setMode('ceremony'); ceFlags = {};
        syncUi();
        if (S.season === 1) {
          ceLater(1200, function () { ceRun(1); });
          ceLater(1200 + sc(3000, 300), function () { if (!ceFlags.late) skipBtn.hidden = false; });
        } else liteCeremony();
      }
      function ceReset() {
        if (ceFlags.reset) return;
        ceFlags.reset = true;
        stage.classList.remove(c('curt-on'), c('dim')); awardEl.hidden = true;
        S.season = 2; S.cereDone++; api.stat.inc('the-button.seasons');
        tier = 0; applyTierClass(); refreshMood();
        S.wear = S.wear.filter(function (id) { return WEAR_ORDER.indexOf(id) < 0; });
        clearNotes(); signOverride = ''; ceFlags.sign = true;
        syncUi();
      }
      function ceRoll() {
        if (ceFlags.roll) return;
        ceFlags.roll = true;
        S.prior += S.presses; S.presses = 0; curSign = 0; signOverride = '';
        renderSign(false); renderOdo(); syncUi();
        api.sfx('stamp');
      }
      function handover() {
        const nm = api.player.name, label = nm && nm !== 'Valued Employee' ? nm : 'VALUED EMPLOYEE';
        const sr = stage.getBoundingClientRect();
        let x = sr.width / 2, y = sr.height / 2;
        if (ptr && isFinite(ptr.x) && isFinite(ptr.y)) { x = Math.max(50, Math.min(sr.width - 50, ptr.x - sr.left)); y = Math.max(30, Math.min(sr.height - 30, ptr.y - sr.top)); }
        microBtn.style.left = x + 'px'; microBtn.style.top = y + 'px';
        microBtn.textContent = label; microBtn.classList.remove(c('sq')); microBtn.hidden = false;
        const r = microBtn.getBoundingClientRect(); look(r.left + r.width / 2, r.top + r.height / 2);
        cs(14);
        ceFlags.pressed = false;
        ceLater(sc(3000, 500), function () { pressYou(); });
        ceLater(sc(6000, 1600), function () { microBtn.hidden = true; });
      }
      function pressYou() {
        if (ceFlags.pressed) return;
        ceFlags.pressed = true;
        restart(microBtn, c('sq')); btn.classList.add(c('down')); later(350, function () { btn.classList.remove(c('down')); });
        api.sfx('stamp');
        cs(16);
        ceLater(sc(1600, 250), function () { cs(17); });
      }
      function onMicro() {
        if (mode !== 'ceremony' || ceFlags.pressed) return;
        cs(15);
        later(sc(900, 150), pressYou);
      }
      const STEPS = [null,
        function () { stage.classList.add(c('curt-on'), c('dim')); api.sfx('whoosh'); cs(0); },
        function () { cs(1); }, function () { cs(2); }, function () { cs(3); }, function () { cs(4); }, function () { cs(5); },
        function () { speak('B', CER[6], { raw: true, mood: 'proud', pri: 1 }); ceLater(sc(1600, 250), function () { cs(7); }); },
        function () {
          cs(8);
          ceLater(sc(1500, 250), function () { speak('B', CER[9], { raw: true, mood: 'confused', pri: 1 }); });
          ceLater(sc(3100, 500), function () { cs(10); });
        },
        function () {
          const p = btnPos(); api.confetti(p.x, p.y, 60); api.sfx('fanfare');
          awardEl.textContent = '🤝 ' + CER_PLAQUE; awardEl.hidden = false;
          placeNote(CER_GOODBYE, true);
          cs(11);
        },
        function () { stage.classList.remove(c('curt-on'), c('dim')); api.sfx('whoosh'); ceReset(); cs(12); },
        function () { ceRoll(); cs(13); },
        handover,
        function () {
          if (ceFlags.participated) return;
          ceFlags.participated = true;
          microBtn.hidden = true; cs(18);
          api.achieve('the-button.participant'); api.award(5, 'sincere'); api.sfx('tada');
          const p = btnPos(); api.confetti(p.x, p.y, 30);
        },
        function () {
          cs(19, 'B'); placeNote(NOTE_AWARE, true);
          later(sc(1600, 250), function () { speak('M', CER[20], { raw: true, mood: 'proud', pri: 1 }); });
        }
      ];
      function ceRun(i) {
        if (dead || mode !== 'ceremony') return;
        if (i >= 12) { ceFlags.late = true; skipBtn.hidden = true; } /* too late to skip: the handover is the point */
        STEPS[i]();
        if (i < 14) ceLater(i === 8 ? gap() * 1.5 : i === 12 ? gap() * 2 : gap(), function () { ceRun(i + 1); });
        else ceLater(gap() * 1.2, finishCeremony);
      }
      function skipTribute() {
        if (mode !== 'ceremony' || ceFlags.skipped || ceFlags.late) return;
        ceFlags.skipped = true; skipBtn.hidden = true;
        ceClear(); awardEl.hidden = true;
        ceReset(); ceRoll();
        ceRun(12);
      }
      function liteCeremony() {
        ceLater(1200, function () { speak('M', CER2[0], { raw: true, mood: 'proud', pri: 1 }); });
        ceLater(1200 + gap(), function () {
          if (S.wear.indexOf('mustache') < 0) S.wear.push('mustache');
          renderWear(); api.sfx('pop');
        });
        ceLater(1200 + gap() * 2, function () {
          speak('M', CER2[1], { raw: true, mood: 'proud', pri: 1 });
          api.award(2, 'sincere'); api.sfx('tada'); const p = btnPos(); api.confetti(p.x, p.y, 20);
        });
        ceLater(1200 + gap() * 3, function () {
          signOverride = SIGN_CONT; renderSign(true);
          ceFlags.litedone = true;
          S.prior += S.presses; S.presses = 0;
          S.season++; S.cereDone++; api.stat.inc('the-button.seasons');
          renderOdo(); api.sfx('stamp');
        });
        ceLater(1200 + gap() * 4, finishCeremony);
      }
      /* the season rolls over: per-season flags reset (the apology stays accepted forever), presses restart at 0 */
      function settleState() {
        const sorry = !!S.done.sorry;
        S.presses = 0; S.secs = 0; S.done = { ceremony: true };
        if (sorry) S.done.sorry = true;
        S.wear = S.wear.filter(function (id) { return id === 'sunglasses' || id === 'mustache'; });
      }
      function finishCeremony() {
        ceClear();
        microBtn.hidden = true; skipBtn.hidden = true; awardEl.hidden = true;
        stage.classList.remove(c('curt-on'), c('dim'));
        settleState();
        seasonT = api.now();
        tier = 0; applyTierClass();
        signOverride = ''; curSign = 0; signMissing = false;
        setMode('idle');
        api.flag.set('the-button.ceremony', true);
        renderSign(false); syncUi(); persist(true);
      }
      /* ---------- go */
      RMc = rmRaw(); root.classList.toggle(c('rm'), RMc);
      api.setTitle('The Button');
      S.visits++; api.stat.inc('the-button.visits');
      tier = computeTier(); applyTierClass(); refreshMood();
      curSign = signStageIdx(); renderSign(false); syncUi();
      speak('M', OPEN_M, { mood: 'neutral', pri: 1 });
      later(3000, function () {
        if (regCount > 0) return;
        const v = S.visits;
        speak('B', v <= 1 ? OPEN_B[1] : v === 2 ? OPEN_B[2] : v <= 4 ? OPEN_B[3] : OPEN_B[5], { mood: 'smug' });
      });
      later(6000, function () { if (regCount === 0 && mode === 'idle') flash(btnwrap, c('g-sweat'), 3200); });
      later(11000, function () { if (regCount === 0 && mode === 'idle') speak('B', OPEN_B11, { mood: 'smug' }); });
      later(22000, function () { if (regCount === 0 && mode === 'idle') speak('B', OPEN_B22, { mood: 'disappointed' }); });
      if (S.presses >= 259) later(7000, function () { if (regCount === 0 && mode === 'idle') speak('M', CER_PENDING, { mood: 'confused' }); }); /* a save that left the tribute one press away */
      api.setInterval(tick, 1000);
      blinkLoop();
      return {
        destroy() {
          dead = true;
          endHold();
          if (mode === 'ceremony') {
            /* leaving mid-tribute: settle the books so the next visit is consistent (a tribute not yet started simply replays) */
            if (ceFlags.reset && !ceFlags.roll) { ceFlags.roll = true; S.prior += S.presses; S.presses = 0; }
            if (ceFlags.roll || ceFlags.litedone) settleState();
          }
          doSave();
        }
      };
    }
  });
})();
