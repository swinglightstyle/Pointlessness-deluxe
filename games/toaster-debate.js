/* POINTLESS module: toaster-debate */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const K = 'm-toaster-debate-';
  const cx = function () { const o = []; for (let i = 0; i < arguments.length; i++) if (arguments[i]) o.push(K + arguments[i]); return o.join(' '); };

  P.injectCSS(`
.m-toaster-debate-wrap{--ink:#2B2118;--mint:#8ED9B6;--coral:#FF7A66;--mustard:#F2B63D;--lilac:#B9A4F0;position:relative;display:flex;flex-direction:column;gap:12px;max-width:940px;margin:0 auto;padding:12px;color:var(--ink);background:#FFF4DC radial-gradient(rgba(43,33,24,.1) 1px,transparent 1.6px) 0 0/14px 14px;border-radius:14px;overflow:hidden;line-height:1.35;font-size:15px}.m-toaster-debate-wrap button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}.m-toaster-debate-wrap button:focus-visible,.m-toaster-debate-wrap input:focus-visible{outline:3px solid #5B3FD0;outline-offset:2px}
.m-toaster-debate-motion{position:relative;font-weight:800;font-size:1.05rem;padding:9px 14px;background:#fff;border:3px solid var(--ink);border-radius:10px;box-shadow:4px 4px 0 var(--ink)}.m-toaster-debate-amend{position:absolute;right:10px;top:-11px;padding:1px 8px;font-size:.7rem;letter-spacing:.12em;color:#fff;background:var(--coral);border:2px solid var(--ink);border-radius:5px;opacity:0;transform:rotate(6deg)}.m-toaster-debate-amend.m-toaster-debate-on{animation:m-toaster-debate-thunk .45s ease-out forwards}
.m-toaster-debate-memo{display:none;align-items:center;gap:8px;flex-wrap:wrap;padding:6px 10px;font-size:.88rem;background:var(--lilac);border:3px solid var(--ink);border-radius:10px;box-shadow:3px 3px 0 var(--ink)}.m-toaster-debate-memo.m-toaster-debate-on{display:flex;animation:m-toaster-debate-thunk .3s ease-out}.m-toaster-debate-stampm{font-weight:900;letter-spacing:.1em;font-size:.72rem;color:#7A1F14;border:2px solid #7A1F14;border-radius:4px;padding:0 5px;transform:rotate(-4deg)}
.m-toaster-debate-mtxt{flex:1;min-width:150px}.m-toaster-debate-mdismiss{min-width:44px;min-height:34px;background:#fff;border:2px solid var(--ink);border-radius:8px}.m-toaster-debate-stage{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;padding:8px;min-height:0;background:rgba(255,255,255,.62);border:3px solid var(--ink);border-radius:14px;overflow:hidden}
.m-toaster-debate-cols,.m-toaster-debate-left{display:flex;flex-direction:column;gap:12px}.m-toaster-debate-left{min-width:0}.m-toaster-debate-cal{position:absolute;right:8px;top:6px;width:30px;padding:0 0 2px;font-size:.6rem;font-weight:900;text-align:center;line-height:1.5;background:#fff;border:2px solid var(--ink);border-top:7px solid var(--coral);border-radius:3px;transform:rotate(3deg)}.m-toaster-debate-sticker{position:absolute;right:10px;bottom:3px;display:none;font-size:.8rem;transform:rotate(14deg)}.m-toaster-debate-sticker.m-toaster-debate-on{display:block}.m-toaster-debate-roll{position:absolute;left:0;bottom:70px;z-index:3;font-size:2.4rem;pointer-events:none;animation:m-toaster-debate-roll 2.4s linear forwards}@media (min-width:880px){.m-toaster-debate-cols{flex-direction:row;align-items:flex-start}.m-toaster-debate-left,.m-toaster-debate-rack{flex:1 1 0;min-width:0}}.m-toaster-debate-tcol{position:relative;display:flex;justify-content:center;align-items:flex-end;min-height:150px;padding-right:18px}
.m-toaster-debate-toaster{position:relative;width:180px;height:168px;margin-top:6px;transform-origin:50% 100%;animation:m-toaster-debate-breathe 4s ease-in-out infinite}.m-toaster-debate-tbody{position:absolute;left:0;right:0;top:34px;bottom:0;background:linear-gradient(#C9CED6,#8E96A3);border:3px solid var(--ink);border-radius:26px 26px 14px 14px;box-shadow:4px 4px 0 var(--ink)}.m-toaster-debate-slots{position:absolute;left:16px;right:16px;top:-14px;height:42px;display:flex;gap:12px}
.m-toaster-debate-slot{position:relative;flex:1;overflow:hidden;background:#2B2118;border:3px solid var(--ink);border-radius:8px}.m-toaster-debate-coil{position:absolute;top:6px;bottom:6px;left:22%;width:4px;border-radius:2px;background:#5a4636;transition:background 1.1s,box-shadow 1.1s}.m-toaster-debate-c2{left:70%}
.m-toaster-debate-h1 .m-toaster-debate-coil{background:#FF9A4A;box-shadow:0 0 8px #FF9A4A}.m-toaster-debate-h2 .m-toaster-debate-coil{background:#E5432E;box-shadow:0 0 12px #E5432E}.m-toaster-debate-h3 .m-toaster-debate-coil{background:var(--mustard);box-shadow:0 0 14px var(--mustard)}
.m-toaster-debate-peek{position:absolute;left:12%;right:12%;bottom:-100%;height:90%;background:#E7B567;border-radius:12px 12px 2px 2px;transition:bottom .7s cubic-bezier(.2,1.6,.4,1)}.m-toaster-debate-up .m-toaster-debate-peek{bottom:-45%}.m-toaster-debate-face{z-index:1;position:absolute;left:50%;top:44px;width:min(112px,88%);height:72px;margin-left:0;transform:translateX(-50%);background:#E9ECF0;border:3px solid var(--ink);border-radius:50%/58%}
.m-toaster-debate-eye{position:absolute;top:20px;left:26px;width:11px;height:11px;border-radius:50%;background:var(--ink);--r:-12deg}.m-toaster-debate-eye+.m-toaster-debate-eye{left:auto;right:26px;--r:12deg}.m-toaster-debate-eye::before{content:"";position:absolute;left:-3px;top:-9px;width:17px;height:3px;border-radius:2px;background:var(--ink);transition:transform .4s}
.m-toaster-debate-mood-d .m-toaster-debate-eye::before{transform:translateY(-3px) rotate(var(--r))}.m-toaster-debate-mood-h .m-toaster-debate-eye::before{transform:translateY(0) rotate(calc(var(--r)*-1.4))}.m-toaster-debate-mouth{position:absolute;left:50%;bottom:12px;width:40px;height:7px;margin-left:-20px;border-radius:4px;background:var(--ink)}
.m-toaster-debate-lever{position:absolute;right:-17px;top:58px;width:20px;height:36px;background:var(--coral);border:3px solid var(--ink);border-radius:6px;transition:transform .7s}.m-toaster-debate-down .m-toaster-debate-lever{transform:translateY(14px)}.m-toaster-debate-feet{position:absolute;left:14px;right:14px;bottom:-9px;height:9px;border-radius:0 0 8px 8px;background:var(--ink)}
.m-toaster-debate-cozy .m-toaster-debate-tbody::after{content:"";position:absolute;inset:0;border-radius:23px 23px 11px 11px;background:repeating-linear-gradient(90deg,rgba(255,122,102,.55) 0 8px,rgba(242,182,61,.55) 8px 16px);opacity:.75;clip-path:inset(60% 0 0 0)}.m-toaster-debate-unplug{animation:m-toaster-debate-shake .5s 3}.m-toaster-debate-smoke{position:absolute;left:50%;top:8px;width:120px;margin-left:-60px;height:90px;pointer-events:none}
.m-toaster-debate-pf{position:absolute;bottom:0;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle,rgba(110,110,110,.7),transparent 70%);filter:blur(3px);opacity:0}.m-toaster-debate-fire .m-toaster-debate-pf{animation:m-toaster-debate-smoke 2.4s ease-out infinite}.m-toaster-debate-calm .m-toaster-debate-pf{animation:none!important}.m-toaster-debate-calm.m-toaster-debate-fire .m-toaster-debate-pf{opacity:.4}
.m-toaster-debate-alarm{position:absolute;left:8px;top:8px;display:none}.m-toaster-debate-fire .m-toaster-debate-alarm{display:block;animation:m-toaster-debate-blink .5s steps(2) infinite}.m-toaster-debate-marshal{position:absolute;right:4px;bottom:4px;display:none;font-size:1.3rem}
.m-toaster-debate-fire .m-toaster-debate-marshal{display:block}.m-toaster-debate-gsprite{position:absolute;right:0;top:70px;display:none;font-size:1.8rem}.m-toaster-debate-on.m-toaster-debate-gsprite{display:block;animation:m-toaster-debate-shake .4s 4}
.m-toaster-debate-tray{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px}.m-toaster-debate-traybox{display:flex;gap:10px;justify-content:center;align-items:flex-start;flex-wrap:wrap;min-height:122px}.m-toaster-debate-choice{display:none;gap:8px;flex-wrap:wrap;justify-content:center}.m-toaster-debate-choice.m-toaster-debate-on{display:flex}.m-toaster-debate-sw{display:flex;flex-direction:column;align-items:center;gap:6px}
.m-toaster-debate-slice{position:relative;width:110px;height:118px;padding:8px;background:#E7B567;border:4px solid #B8742A;border-radius:44px 44px 14px 14px;box-shadow:3px 3px 0 var(--ink)}.m-toaster-debate-slice.m-toaster-debate-small{width:90px;height:96px;padding:6px;border-radius:34px 34px 12px 12px}.m-toaster-debate-slice.m-toaster-debate-wide{width:170px}
.m-toaster-debate-rise{animation:m-toaster-debate-rise .7s cubic-bezier(.2,1.6,.4,1)}.m-toaster-debate-lowered{animation:m-toaster-debate-lower 3.2s ease-in-out}.m-toaster-debate-grid{position:relative;width:100%;height:100%;display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);gap:2px}
.m-toaster-debate-cell{position:relative;min-width:0;min-height:0;padding:0;border:0;border-radius:6px;cursor:pointer}.m-toaster-debate-cell:hover,.m-toaster-debate-cell:focus-visible{outline:3px solid var(--ink);outline-offset:-2px}.m-toaster-debate-mk{position:absolute;pointer-events:none}
.m-toaster-debate-mk-c{left:30%;top:58%;width:6px;height:6px;border-radius:50%;background:#4a2c10}.m-toaster-debate-mk-r{inset:10%;border-radius:50%;background:conic-gradient(#2A1A10,#8A4F1E,#2A1A10,#8A4F1E,#2A1A10);-webkit-mask:radial-gradient(circle,transparent 52%,#000 56%);mask:radial-gradient(circle,transparent 52%,#000 56%);pointer-events:auto}.m-toaster-debate-mk-b{left:10%;top:22%;width:74%;height:48%;border-radius:40%;background:rgba(242,182,61,.62)}
.m-toaster-debate-mk-s{left:18%;bottom:14%;width:38%;height:40%;border-left:5px solid #2A1A10;border-bottom:5px solid #2A1A10;border-radius:0 0 0 3px;opacity:.55}.m-toaster-debate-mk-d{left:38%;top:30%;width:9px;height:12px;border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:rgba(70,140,230,.75)}.m-toaster-debate-burn{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font-weight:900;font-size:1rem;color:#2A1A10;text-shadow:0 0 5px rgba(255,255,255,.35);pointer-events:none}
.m-toaster-debate-small .m-toaster-debate-burn{font-size:.8rem}.m-toaster-debate-flip{display:inline-block;transform:scaleX(-1);font-size:.9rem}.m-toaster-debate-gold::after,.m-toaster-debate-lam::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.55) 45%,transparent 60%) -150% 0/250% 100% no-repeat;animation:m-toaster-debate-glint 2.2s ease-in-out infinite}
.m-toaster-debate-lam{box-shadow:0 0 0 2px #fff,0 0 6px 2px rgba(255,255,255,.8)}.m-toaster-debate-ann{position:absolute;pointer-events:none;font-size:.6rem;font-weight:800}.m-toaster-debate-a-p{left:-4px;top:-14px;color:#C62D1F;transform:rotate(-8deg);white-space:nowrap}
.m-toaster-debate-a-t{right:10px;bottom:18px;width:18px;height:22px;border-radius:50%;border:2px solid rgba(60,40,20,.5)}.m-toaster-debate-a-c{left:16px;bottom:10px;width:20px;height:20px;border-radius:50%;border:3px solid rgba(110,70,30,.5)}.m-toaster-debate-a-n{right:-12px;top:30px;width:38px;height:34px;background:#FFF07A;border:1px solid #c9b43a;padding:2px;transform:rotate(7deg);color:#4a4210;line-height:1}
.m-toaster-debate-a-d{width:14px;height:3px;background:#C62D1F;opacity:.7;border-radius:2px}.m-toaster-debate-caption{min-height:2.6em;width:100%;text-align:center;font-size:.88rem;font-style:italic}.m-toaster-debate-dblbtn{min-height:44px;padding:0 12px;background:#fff;border:3px solid var(--ink);border-radius:10px;font-weight:800}
.m-toaster-debate-dblbtn.m-toaster-debate-sel{background:var(--mustard)}.m-toaster-debate-potato{position:absolute;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;font-size:5rem;background:rgba(255,244,220,.94);border:3px dashed var(--ink);border-radius:14px;z-index:2}.m-toaster-debate-potato span{font-size:.9rem;font-weight:800}
.m-toaster-debate-potato.m-toaster-debate-on{display:flex;animation:m-toaster-debate-rise .8s cubic-bezier(.2,1.6,.4,1)}.m-toaster-debate-speechrow{grid-column:1/-1;display:flex;align-items:flex-end;gap:10px}.m-toaster-debate-avatar{font-size:2rem;line-height:1}
.m-toaster-debate-bubble{position:relative;flex:1;min-height:3.4em;padding:7px 12px;background:#fff;border:3px solid var(--ink);border-radius:14px 14px 14px 2px}.m-toaster-debate-tonelab{display:block;font-size:.72rem;font-weight:800;letter-spacing:.05em;opacity:.75}.m-toaster-debate-words{display:block;font-weight:700;overflow-wrap:anywhere}
.m-toaster-debate-ghost{opacity:1;color:#6B5F55;font-weight:500}.m-toaster-debate-auditor{position:absolute;right:14px;bottom:44px;display:none;width:15px;height:13px;border-radius:50% 50% 40% 40%;background:#B8742A;border:2px solid var(--ink)}.m-toaster-debate-auditor.m-toaster-debate-on{display:block}
.m-toaster-debate-lan::after{content:"";position:absolute;left:3px;top:9px;width:5px;height:12px;background:var(--coral);border:1px solid var(--ink)}.m-toaster-debate-hat::before{content:"";position:absolute;left:1px;top:-9px;width:9px;height:9px;background:var(--lilac);border:2px solid var(--ink);border-radius:3px 3px 0 0}.m-toaster-debate-senior{background:var(--mustard);transform:scale(1.25)}
.m-toaster-debate-framed{position:absolute;right:50px;bottom:44px;display:none;width:20px;height:20px;border:3px solid #8A4F1E;background:#fff8e6;align-items:center;justify-content:center}.m-toaster-debate-framed.m-toaster-debate-on{display:flex}.m-toaster-debate-framed i{width:4px;height:4px;border-radius:50%;background:#4a2c10}
.m-toaster-debate-cert{position:absolute;right:82px;bottom:44px;display:none;width:44px;padding:2px;font-size:.45rem;font-weight:800;text-align:center;line-height:1.1;background:#fff;border:2px solid #8A4F1E}.m-toaster-debate-cert.m-toaster-debate-on{display:block}.m-toaster-debate-rain,.m-toaster-debate-fx{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.m-toaster-debate-drop{position:absolute;top:-30px;width:22px;height:24px;background:#E7B567;border:2px solid #B8742A;border-radius:9px 9px 3px 3px;animation:m-toaster-debate-fall 1.6s ease-in forwards}.m-toaster-debate-cf{position:absolute;top:-16px;width:8px;height:13px;animation:m-toaster-debate-fall 1.4s ease-in forwards}.m-toaster-debate-cf.m-toaster-debate-rev{animation:m-toaster-debate-fall 1.4s ease-in reverse forwards}
.m-toaster-debate-airx{position:absolute;z-index:3;animation:m-toaster-debate-airx var(--air,1.2s) linear forwards}.m-toaster-debate-airy{display:block;animation:m-toaster-debate-airy var(--air,1.2s) forwards}.m-toaster-debate-air{display:block;min-width:44px;min-height:44px;padding:4px;background:transparent;border:2px dashed var(--ink);border-radius:10px}
.m-toaster-debate-floor .m-toaster-debate-air{transform:rotate(180deg) translateY(-6px);opacity:.7;transition:all .4s}.m-toaster-debate-calm .m-toaster-debate-airx,.m-toaster-debate-calm .m-toaster-debate-airy{animation:none!important}.m-toaster-debate-calm .m-toaster-debate-air{animation:m-toaster-debate-fadeair 1.2s forwards}
.m-toaster-debate-cold{position:absolute;inset:0;z-index:4;pointer-events:none;opacity:0;background:rgba(110,170,255,.5);mix-blend-mode:multiply;border:7px solid rgba(225,240,255,.9);transition:opacity .5s}.m-toaster-debate-cold.m-toaster-debate-on{opacity:1}.m-toaster-debate-ding{position:absolute;inset:0;z-index:5;display:none;align-items:center;justify-content:center;font-size:clamp(2.5rem,12vw,5rem);font-weight:900;background:rgba(242,182,61,.95);pointer-events:none}
.m-toaster-debate-ding.m-toaster-debate-on{display:flex}.m-toaster-debate-meter{display:flex;flex-direction:column;gap:5px}.m-toaster-debate-readout{font-family:ui-monospace,Consolas,monospace;font-weight:800;font-size:1.05rem}
.m-toaster-debate-rnum{display:inline-block;min-width:13ch}.m-toaster-debate-bar{position:relative;height:26px;margin:14px 8px 0 0;background:var(--mint);border:3px solid var(--ink);border-radius:14px}.m-toaster-debate-fillwrap{position:absolute;inset:0;overflow:hidden;border-radius:11px}
.m-toaster-debate-fill{position:relative;height:100%;width:0;background:linear-gradient(90deg,#F6E7BE,#D29A44 60%,#8A4F1E);transition:width .5s}.m-toaster-debate-fill::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(100deg,rgba(255,255,255,.2) 0 4px,transparent 4px 9px);animation:m-toaster-debate-crinkle 3s linear infinite}.m-toaster-debate-line99{position:absolute;right:-3px;top:-7px;bottom:-7px;width:4px;background:var(--ink);border-radius:2px}
.m-toaster-debate-escrow{position:absolute;right:-6px;top:-27px;min-height:28px;padding:4px 8px;font-size:.62rem;font-weight:900;letter-spacing:.1em;background:var(--mustard);border:2px solid var(--ink);border-radius:4px;transform-origin:100% 0;transform:rotate(-8deg)}.m-toaster-debate-swing{animation:m-toaster-debate-swing 1s ease-in-out}.m-toaster-debate-foot{font-size:.75rem;opacity:1;background:none;border:0;padding:0;text-align:left}@media (hover:none){.m-toaster-debate-keys{display:none}}
button.m-toaster-debate-foot{text-decoration:underline;min-height:34px;color:#5B3FD0;opacity:1}.m-toaster-debate-mirror{display:none;font-family:ui-monospace,Consolas,monospace;font-weight:800;color:#5B3FD0}.m-toaster-debate-mirror.m-toaster-debate-on{display:block}
.m-toaster-debate-rack{display:flex;flex-direction:column;gap:10px;transition:transform .6s}.m-toaster-debate-flip180{transform:rotate(180deg)}.m-toaster-debate-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.m-toaster-debate-card{position:relative;min-height:92px;padding:9px 9px 9px 32px;text-align:left;background:#FFFDF4;border:3px solid var(--ink);border-radius:6px;box-shadow:3px 3px 0 var(--ink);transform:rotate(var(--tilt,0deg));overflow:hidden;transition:background .2s}.m-toaster-debate-card::after{content:"";position:absolute;right:0;top:0;width:16px;height:16px;background:linear-gradient(225deg,#FFF4DC 50%,#d6cbb2 50%)}.m-toaster-debate-card.m-toaster-debate-sel{background:#FFE9A8}
.m-toaster-debate-card.m-toaster-debate-rove{outline:3px dotted #5B3FD0;outline-offset:2px}.m-toaster-debate-card.m-toaster-debate-pulse{animation:m-toaster-debate-pulse 1.1s ease-in-out infinite}.m-toaster-debate-card.m-toaster-debate-ban .m-toaster-debate-br{text-decoration:line-through}
.m-toaster-debate-key{position:absolute;left:7px;top:8px;width:19px;height:19px;border-radius:50%;background:var(--ink);color:#fff;font-size:.72rem;font-weight:800;text-align:center;line-height:19px}.m-toaster-debate-br{display:block;font-size:.66rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;opacity:.7}.m-toaster-debate-ctext{display:block;font-size:.92rem;font-weight:600}
.m-toaster-debate-flutter .m-toaster-debate-card{animation:m-toaster-debate-flutter .5s}.m-toaster-debate-tones,.m-toaster-debate-shades{display:none;gap:8px;flex-wrap:wrap}.m-toaster-debate-tones.m-toaster-debate-on,.m-toaster-debate-shades.m-toaster-debate-on{display:flex;animation:m-toaster-debate-rise .6s ease-out}
.m-toaster-debate-tone,.m-toaster-debate-shade{flex:1;min-width:76px;min-height:44px;padding:0 10px;font-weight:800;background:#fff;border:3px solid var(--ink);border-radius:999px;box-shadow:2px 2px 0 var(--ink)}.m-toaster-debate-tone.m-toaster-debate-sel{background:var(--mint)}.m-toaster-debate-tone.m-toaster-debate-ban{text-decoration:line-through;opacity:.7}
.m-toaster-debate-speakrow{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap}.m-toaster-debate-ringbox{--fill:0;position:relative;width:176px;height:176px;border-radius:50%;background:conic-gradient(var(--coral) 0 34.6%,var(--mint) 34.6% 69.2%,var(--lilac) 69.2% 100%)}.m-toaster-debate-ringbox::before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(transparent calc(var(--fill)*1%),rgba(255,244,220,.8) 0)}
.m-toaster-debate-speak{position:absolute;inset:14px;z-index:1;border-radius:50%;padding:6px;font-size:1.02rem;font-weight:900;line-height:1.1;background:var(--mustard);border:4px solid var(--ink);box-shadow:4px 4px 0 var(--ink);touch-action:none;user-select:none}.m-toaster-debate-speak:active,.m-toaster-debate-holding .m-toaster-debate-speak{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--ink)}.m-toaster-debate-bands{display:flex;flex-direction:column;gap:4px;font-size:.78rem;font-weight:700}
.m-toaster-debate-band{padding:1px 10px;border:2px solid var(--ink);border-radius:999px;opacity:.55}.m-toaster-debate-band.m-toaster-debate-on{opacity:1;box-shadow:2px 2px 0 var(--ink)}.m-toaster-debate-b0{background:var(--coral)}.m-toaster-debate-b1{background:var(--mint)}.m-toaster-debate-b2{background:var(--lilac)}
.m-toaster-debate-addr{display:none;gap:8px;flex-wrap:wrap;align-items:center;padding:8px;background:#fff;border:3px solid var(--ink);border-radius:10px}.m-toaster-debate-addr.m-toaster-debate-on{display:flex}.m-toaster-debate-addr input{flex:1;min-width:160px;min-height:44px;padding:0 10px;font:inherit;border:3px solid var(--ink);border-radius:8px}
.m-toaster-debate-cbtn{min-height:44px;padding:0 14px;font-weight:800;background:#fff;border:3px solid var(--ink);border-radius:10px;box-shadow:2px 2px 0 var(--ink)}.m-toaster-debate-counters{display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:.85rem}.m-toaster-debate-panel{display:none;padding:10px;background:#fff;border:3px solid var(--ink);border-radius:10px;box-shadow:3px 3px 0 var(--ink)}
.m-toaster-debate-panel.m-toaster-debate-on{display:block}.m-toaster-debate-prow{margin:3px 0;font-size:.85rem}.m-toaster-debate-agrid{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}
.m-toaster-debate-shelf{position:relative;display:flex;flex-wrap:wrap;gap:4px;min-height:36px;padding:6px;border-top:3px solid var(--ink);align-items:flex-end}.m-toaster-debate-shake{animation:m-toaster-debate-shake .12s 1}.m-toaster-debate-thumb{position:relative;display:inline-block;flex:none;width:24px;height:26px;border:2px solid #B8742A;border-radius:11px 11px 3px 3px;pointer-events:none}
.m-toaster-debate-thumbbig{width:44px;height:48px;border-radius:18px 18px 5px 5px;pointer-events:auto}.m-toaster-debate-pin{position:absolute;left:8px;top:-7px;width:6px;height:6px;border-radius:50%;background:var(--coral);border:1px solid var(--ink)}.m-toaster-debate-sticky{position:absolute;right:-5px;bottom:-4px;width:10px;height:9px;background:#FFF07A;border:1px solid #c9b43a}
.m-toaster-debate-sil{margin-left:auto;font-size:1.3rem;opacity:.2;filter:grayscale(1)}.m-toaster-debate-formin{width:100%;min-height:44px;margin:6px 0;padding:0 10px;font:inherit;border:3px solid var(--ink);border-radius:8px}.m-toaster-debate-revlab{display:none;font-weight:800;color:#5B3FD0}
.m-toaster-debate-revlab.m-toaster-debate-on{display:block}.m-toaster-debate-hid{display:none!important}@keyframes m-toaster-debate-thunk{from{transform:scale(1.6) rotate(4deg);opacity:0}to{transform:scale(1) rotate(6deg);opacity:1}}
@keyframes m-toaster-debate-breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.015)}}@keyframes m-toaster-debate-crinkle{from{background-position:0 0}to{background-position:18px 0}}@keyframes m-toaster-debate-pulse{0%,100%{box-shadow:3px 3px 0 var(--ink)}50%{box-shadow:0 0 0 5px var(--mustard),3px 3px 0 var(--ink)}}
@keyframes m-toaster-debate-rise{from{transform:translateY(80px) rotate(3deg);opacity:0}to{transform:none;opacity:1}}@keyframes m-toaster-debate-lower{0%{transform:translateY(-70px)}100%{transform:none}}@keyframes m-toaster-debate-airx{from{transform:translateX(0)}to{transform:translateX(var(--dx))}}
@keyframes m-toaster-debate-airy{0%{transform:translateY(0);animation-timing-function:ease-out}42%{transform:translateY(-80px);animation-timing-function:ease-in}100%{transform:translateY(var(--dy))}}@keyframes m-toaster-debate-fadeair{0%{opacity:1}100%{opacity:.15}}@keyframes m-toaster-debate-fall{from{transform:translateY(0) rotate(0)}to{transform:translateY(360px) rotate(300deg)}}
@keyframes m-toaster-debate-flutter{0%,100%{transform:rotate(var(--tilt,0deg))}25%{transform:translateY(-10px) rotate(-6deg)}75%{transform:translateY(6px) rotate(6deg)}}@keyframes m-toaster-debate-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}@keyframes m-toaster-debate-swing{0%,100%{transform:rotate(-8deg)}30%{transform:rotate(26deg)}60%{transform:rotate(-20deg)}}
@keyframes m-toaster-debate-blink{50%{opacity:.15}}@keyframes m-toaster-debate-smoke{0%{transform:translateY(0) scale(.5);opacity:0}25%{opacity:.8}100%{transform:translateY(-80px) scale(1.8);opacity:0}}@keyframes m-toaster-debate-glint{to{background-position:150% 0}}
@media (prefers-reduced-motion:reduce){.m-toaster-debate-toaster,.m-toaster-debate-fill::after,.m-toaster-debate-card.m-toaster-debate-pulse,.m-toaster-debate-gold::after,.m-toaster-debate-lam::after{animation:none}}.m-toaster-debate-calm .m-toaster-debate-toaster,.m-toaster-debate-calm .m-toaster-debate-fill::after,.m-toaster-debate-calm .m-toaster-debate-card.m-toaster-debate-pulse,.m-toaster-debate-calm .m-toaster-debate-gold::after{animation:none}.m-toaster-debate-calm .m-toaster-debate-alarm,.m-toaster-debate-calm .m-toaster-debate-drop,.m-toaster-debate-calm .m-toaster-debate-unplug,.m-toaster-debate-calm .m-toaster-debate-shake,.m-toaster-debate-calm .m-toaster-debate-swing,.m-toaster-debate-calm .m-toaster-debate-gsprite,.m-toaster-debate-calm .m-toaster-debate-memo.m-toaster-debate-on,.m-toaster-debate-calm .m-toaster-debate-tones.m-toaster-debate-on,.m-toaster-debate-calm .m-toaster-debate-shades.m-toaster-debate-on{animation:none!important}.m-toaster-debate-calm .m-toaster-debate-amend.m-toaster-debate-on{animation:none!important;opacity:1;transform:rotate(6deg)}.m-toaster-debate-calm .m-toaster-debate-cf{display:none}@media (max-width:480px){.m-toaster-debate-tones,.m-toaster-debate-shades{display:none}.m-toaster-debate-tones.m-toaster-debate-on{display:grid;grid-template-columns:1fr 1fr}.m-toaster-debate-shades.m-toaster-debate-on{display:grid;grid-template-columns:1fr 1fr 1fr}.m-toaster-debate-wrap{padding:8px}}
@media (max-width:700px){.m-toaster-debate-toaster{width:140px;scale:.85;margin-top:-22px}.m-toaster-debate-tcol{padding-right:12px;min-height:120px}.m-toaster-debate-slice{width:96px;height:102px;padding:7px;border-radius:38px 38px 12px 12px}.m-toaster-debate-slice.m-toaster-debate-small{width:84px;height:90px}.m-toaster-debate-slice.m-toaster-debate-wide{width:140px}.m-toaster-debate-ctext{font-size:.8rem}.m-toaster-debate-card{min-height:76px}.m-toaster-debate-ringbox{width:140px;height:140px}.m-toaster-debate-rack,.m-toaster-debate-left{display:contents}.m-toaster-debate-stage{order:1}.m-toaster-debate-cols>.m-toaster-debate-rack>.m-toaster-debate-speakrow{order:2}.m-toaster-debate-meter,.m-toaster-debate-cards,.m-toaster-debate-tones,.m-toaster-debate-shades,.m-toaster-debate-revlab,.m-toaster-debate-addr{order:3}.m-toaster-debate-rack>*{transition:transform .6s}.m-toaster-debate-flip180>*{transform:rotate(180deg)}}@keyframes m-toaster-debate-roll{from{transform:translateX(-12vw) rotate(0)}to{transform:translateX(100vw) rotate(1080deg)}}.m-toaster-debate-calm .m-toaster-debate-roll{animation:none!important;left:40%}
.m-toaster-debate-wx{padding:2px 10px;font-weight:800;font-size:.8rem;background:var(--lilac);border:2px solid var(--ink);border-radius:999px}
.m-toaster-debate-wrap .m-toaster-debate-cal{z-index:2;font-size:.6rem;font-weight:900;line-height:1.5;cursor:pointer}
.m-toaster-debate-cal::before{content:"";position:absolute;inset:-9px}
.m-toaster-debate-wrap .m-toaster-debate-calw{background:var(--mustard)}
`, 'css-toaster-debate');

  P.addAchievements([
    { id: 'toaster-debate.first', name: 'Grand Marshal of the Persuasion Corps (Honorary)', desc: 'Deliver your first argument. The Corps has no other members. The title is yours; the Corps is also you.', icon: '🎖️', secret: false, reward: 3 },
    { id: 'toaster-debate.interrupted', name: 'The Order of the Interrupted Sentence, First Class', desc: 'Be cut off mid-sentence by a pop, 5 times. The sentences have been placed in a small urn.', icon: '⚱️', secret: false, reward: 5 },
    { id: 'toaster-debate.catcher', name: 'Supreme Chancellor of the Catch Window', desc: "Catch 10 airborne slices. The Chancellor's robes are made of crumbs and are not machine washable.", icon: '🧤', secret: false, reward: 6 },
    { id: 'toaster-debate.final_percent', name: 'Archduke of the Final Percent', desc: 'Reach 98.9999% persuasion. The remaining 0.0001% has been placed on indefinite leave.', icon: '📈', secret: false, reward: 8 },
    { id: 'toaster-debate.ledger', name: 'Archduke of the Pop Ledger', desc: 'Record 25 pops in a session. Auditor Pop has been told. Auditor Pop has no reaction and a lanyard.', icon: '📒', secret: false, reward: 4 },
    { id: 'toaster-debate.carried', name: 'Motion Carried (Subject to Ratification)', desc: 'Reach the end of the argument. The argument has not ended. It has been placed on a shelf.', icon: '🗂️', secret: false, reward: 10 },
    { id: 'toaster-debate.silence', name: 'The Considerate Silence', desc: 'SECRET. Sit in silence until the toaster offers to talk. The toaster is awaiting your reply. It has all night.', icon: '🤫', secret: true, reward: 12 },
    { id: 'toaster-debate.butter', name: 'Signed in Butter', desc: 'SECRET. Receive a slice with your own name burned onto it. It is not a reading, it is a signature. Please do not frame it, it is warm.', icon: '🧈', secret: true, reward: 12 },
    { id: 'toaster-debate.quartet', name: 'The Four Tones Convention (Mild)', desc: 'SECRET. Deliver all four tones in one motion without a pop. The toaster has no fourth slot and has performed one anyway.', icon: '🎼', secret: true, reward: 12 },
    { id: 'toaster-debate.smoke', name: 'Grand Marshal of the Unnecessary Fire Drill', desc: 'SECRET. Make the toaster stutter by speaking at it more than six times in three seconds. The alarm has since apologised.', icon: '🚨', secret: true, reward: 12 },
    { id: 'toaster-debate.bagel', name: 'Apologist to the Entire Concept of Bread', desc: 'SECRET. Say the word. We will not say the word. The toaster is no longer quite so warm.', icon: '🥯', secret: true, reward: 12 },
    { id: 'toaster-debate.sock', name: 'Sock-Adjacent (Pending)', desc: 'SECRET. See the faint scorch three times. We are not following it.', icon: '🧦', secret: true, reward: 12 },
    { id: 'toaster-debate.golden', name: 'Toast Whisperer Emeritus of the Eastern Counter', desc: 'SECRET. Receive the Golden Slice. The slice has been laminated. The laminate has been laminated.', icon: '✨', secret: true, reward: 12 },
    { id: 'toaster-debate.ding', name: 'Chancellor-General of the Ding, Keeper of the One Word and Regent of the Realm of Bread (Part-Time)', desc: "SECRET. Say 'ding' at the exact moment the toaster says it. It has waited years for someone to say it back. It cannot thank you, except by saying it again.", icon: '🔔', secret: true, reward: 12 },
    { id: 'toaster-debate.forecast', name: 'Senior Fellow of the Institute of Slice Meteorology', desc: 'Have the forecast come true 7 times. The Institute has one member, a barometer, and a window that looks onto the toaster.', icon: '🌦️', secret: false, reward: 6 },
    { id: 'toaster-debate.wednesday', name: 'Honorary Witness to the Wednesday Incident (Unofficial, Unwitnessed, Declined by Wednesday)', desc: 'SECRET. Click the calendar at the exact moment it forgets which day it is. Wednesday has asked to be let out the back.', icon: '📆', secret: true, reward: 12 },
    { id: 'toaster-debate.calendar', name: 'Registrar General of the Seventh Tuesday and a Half, Custodian of the Wall\'s Private Opinion of Time', desc: 'SECRET. Turn the calendar seven times. It is now the Tuesday that was between the others. The calendar has asked not to be thanked.', icon: '🗓️', secret: true, reward: 12 }
  ]);

  P.addLines('m:toaster-debate:enter', [
    'You have entered the Debate Chamber. Please do not touch the toaster. It will be offended and then it will forgive you.',
    'The toaster has agreed to hear you out. It has agreed to nothing else, forever.',
    'You are about to argue with an appliance. Management has seen worse conversations at the water cooler.',
    'Please make your argument. The toaster is warming up and has already begun to listen.',
    'The Debate Chamber is open. It has one chair for you and one appliance for the other side. The appliance has a cord and a head start.'
  ]);
  P.addLines('m:toaster-debate:exit', [
    'You have left the debate. The motion has been filed with the other motions, in a folder marked Later.',
    'You left in the middle of an argument. The toaster has a feeling about this, and no mouth.',
    'The toaster has not been persuaded. It has, however, been warm to you. Please do not confuse the two.',
    "You have left the toaster. The toaster says 'ding'. It is the only word it has and it means it.",
    'You left mid-debate. The toaster has not moved. It has been warm in your general direction ever since.'
  ]);
  P.addLines('ticker', [
    "TOASTER STILL NOT PERSUADED; SOURCES CLOSE TO THE TOASTER SAY 'DING'",
    "PERSUASION METER REPORTED AT 98.9999991%; REMAINING DISTANCE DESCRIBED AS 'LEGAL'",
    'SLICE 4 SIGHTED AGAIN; ANNOTATIONS NOW OUTNUMBER SLICE',
    'AUDITOR POP PROMOTED TO SENIOR CRUMB; NO COMMENT FROM CRUMBS',
    'SANDRA FROM COMPLIANCE ISSUES MEMO ON MEMO; MEMO ON MEMO ISSUES MEMO',
    "TOASTER SAYS 'GOOD POINT'; NO POINT HAD BEEN MADE; INQUIRY OPENED",
    "EMPLOYEE HOLDS BUTTON FOR 2.6 SECONDS; TOASTER DESCRIBES IT AS 'A LOT'",
    'NEW SLICE 4 ANNOTATION DISCOVERED; ANNOTATOR DECLINES TO COMMENT, BEING A SLICE',
    'AUDITOR POP AUDITS AUDITOR POP; FINDS A MINOR DISCREPANCY IN THE CRUMB',
    "TOASTER FORECAST CALLS FOR 70% CHANCE OF HURT; FORECAST ISSUES ITSELF AN UMBRELLA",
    'CALENDAR READS WEDNESDAY FOR ONE SECOND; INQUIRY OPENED INTO WHO WAS LOOKING AND WHY SO CLOSELY',
    "SUGGESTION BOX ATTENDS DEBATE, LISTENS TO ALL OF IT, ISSUES ONE SLICE READING 'NOTED'"
  ]);
  P.addLines('tip', [
    "Tip: the toaster pops at the word 'but'. This is not a rule. It is a pattern. It is a feeling.",
    'Tip: a fragment that ends on a warm word is worth more than a whole sentence.',
    'Tip: do not say the name of the round bread-adjacent food with the hole. We will not say it either.',
    'Tip: the toaster does not mind being interrupted. It minds being understood, which is worse, and warmer.',
    'Tip: if the toaster says nothing for a long time, it has not left. It has started to hope.',
    'Tip: if the calendar ever says a day it should not, be quick. It is shy, and has a lot to get back to.',
    'Tip: a forecast of 80% means the toaster has been persuaded to try. It does not mean the toaster has been persuaded.'
  ]);
  P.addLines('lobbyEvent', [
    "The toaster has been spoken to for 14 minutes and remains warm. Management has called it 'a draw'.",
    'Gerald has been seen outside the Debate Chamber with a certificate. It is addressed to a different potato.',
    'Dennis (Plant) has been told about the toaster. Dennis (Plant) has no comment and several leaves.',
    'The calendar in the Debate Chamber has been seen to read Wednesday. The Debate Chamber says it was Tuesday, and has asked for the room.'
  ]);
  P.addLines('plantStatus', [
    'Dennis (Plant) has watered the toaster. The toaster is damp and quietly furious.',
    'Dennis (Plant) has been moved closer to the Debate Chamber. He has asked for this and been given it.'
  ]);

  /* ---------- data ---------- */
  const MOODS = {
    doubt: [1, 1, 0, 1, 0, 1, 0, 1, 1], hurt: [2, 2, 2, 2, 4, 2, 2, 2, 2], polite: [2, 2, 2, 2, 2, 2, 2, 2, 2],
    goon: [3, 3, 3, 2, 2, 2, 2, 2, 2], heard: [4, 4, 4, 4, 3, 4, 4, 4, 4], curious: [2, 1, 2, 1, 3, 1, 2, 1, 2],
    warm: [1, 2, 3, 1, 2, 3, 1, 2, 3], tired: [3, 3, 3, 3, 3, 3, 2, 1, 0], wistful: [1, 0, 1, 0, 1, 0, 1, 0, 1]
  };
  const SLICE4 = [1, 1, 1, 1, 0, 1, 1, 1, 1];
  const RAMP = ['#F6E7BE', '#E8C98A', '#D29A44', '#8A4F1E', '#2A1A10'];
  const VALNAME = ['raw', 'pale', 'golden', 'dark', 'charcoal'];
  const POS = ['Top-left', 'Top-centre', 'Top-right', 'Middle-left', 'Centre', 'Middle-right', 'Bottom-left', 'Bottom-centre', 'Bottom-right'];
  const TONES = [
    { id: 'gentle', name: 'Gentle', icon: '🕊️', key: 'q', L: 'G' }, { id: 'firm', name: 'Firm', icon: '✊', key: 'w', L: 'F' },
    { id: 'wistful', name: 'Wistful', icon: '🕯️', key: 'e', L: 'W' }, { id: 'legal', name: 'Legal', icon: '⚖️', key: 'r', L: 'L' }
  ];
  const TONE_CYCLE = ['gentle', 'wistful', 'legal', 'firm'];
  const BRANCHES = ['Fairness', 'Feelings', 'Physics', 'Law', 'Tuesday', 'Regret'];
  const BMOOD = { Fairness: ['polite', 'doubt', 'goon'], Feelings: ['warm', 'hurt', 'wistful'], Physics: ['curious', 'tired', 'polite'], Law: ['heard', 'doubt', 'goon'], Tuesday: ['hurt', 'wistful', 'tired'], Regret: ['hurt', 'warm', 'heard'] };
  const LINKS = { Feelings: ['Regret'], Regret: ['Tuesday', 'Physics'], Tuesday: ['Physics', 'Fairness'], Physics: ['Law', 'Regret'], Law: ['Fairness'], Fairness: ['Feelings', 'Tuesday'] };
  const LOADED = ['never', 'always', 'home', 'tuesday', 'warm'];
  const PACE = 0.45;
  const SHADES = ['Pale', 'Golden', 'Dark'];
  const GATES = [[105, 6], [150, 8], [210, 12], [300, 20], [390, 28], [480, 36], [540, 45]];
  const MIRROR = ['41%', '77%', '93.1%', '98.2%', '98.99%', '98.9999991%'];
  const FACE = { doubt: 'd', hurt: 'h', tired: 'h', heard: 'h', wistful: 'h', polite: 'c', goon: 'c', warm: 'c', curious: 'c' };

  const PREMS = [
    ['Fairness', 'Bread has no say in this either, but it came anyway.', 'doubt', 'polite'],
    ['Fairness', 'Everyone I know has been toasted, and always forgave it.', 'hurt', 'warm'],
    ['Fairness', 'Nobody asked the bread, and nobody asked you.', 'tired', 'heard'],
    ['Fairness', 'A fair argument is only warm until someone checks.', 'polite', 'curious'],
    ['Fairness', 'You pop for everyone, however nobody pops for you.', 'hurt', 'tired'],
    ['Fairness', 'Both of us were assembled in a factory somewhere.', 'curious', 'wistful'],
    ['Fairness', 'I would split the last slice with you, honestly.', 'warm', 'goon'],
    ['Feelings', 'Setting 3 is a feeling, not a number.', 'doubt', 'curious'],
    ['Feelings', 'You were made to be warm, not to be right.', 'hurt', 'wistful'],
    ['Feelings', 'I think you pop because you care too much.', 'hurt', 'tired'],
    ['Feelings', 'It is allowed to feel brown on the inside.', 'wistful', 'doubt'],
    ['Feelings', 'Warm is the first thing anyone remembers about home.', 'warm', 'wistful'],
    ['Feelings', 'I am not here to win, but I am here.', 'goon', 'heard'],
    ['Feelings', 'Some days a toaster just needs to be told.', 'tired', 'hurt'],
    ['Physics', 'Heat goes in, bread comes out, and nobody says thanks.', 'tired', 'polite'],
    ['Physics', 'Crumbs are just the universe showing its working.', 'curious', 'goon'],
    ['Physics', 'Every slot has the same width, however different the slices.', 'polite', 'curious'],
    ['Physics', 'Toast is bread that finally understood what warm meant.', 'warm', 'wistful'],
    ['Physics', 'A coil is only a very long way of caring.', 'hurt', 'warm'],
    ['Physics', 'Gravity always brings the toast back down, but gently.', 'heard', 'tired'],
    ['Physics', 'If you stop glowing, the bread does not stop trying.', 'hurt', 'wistful'],
    ['Law', 'Section 12/7.5 says nothing about toasters, which is encouraging.', 'doubt', 'polite'],
    ['Law', 'In my own defence, I am also on a form.', 'heard', 'doubt'],
    ['Law', 'Precedent suggests a toaster is innocent until buttered.', 'curious', 'polite'],
    ['Law', 'The right to remain warm shall not be infringed.', 'hurt', 'goon'],
    ['Law', 'I would like it noted, however, that you listened.', 'polite', 'warm'],
    ['Law', 'Objection overruled, but sustained in spirit, in the kitchen.', 'tired', 'heard'],
    ['Law', 'This is not legal advice, only a hand on your lever.', 'wistful', 'hurt'],
    ['Tuesday', 'Nobody is ready for Tuesday, and that is allowed.', 'hurt', 'wistful'],
    ['Tuesday', 'I was warm once, but nobody wrote it down.', 'wistful', 'tired'],
    ['Tuesday', 'It is always Tuesday somewhere, and somewhere is fine.', 'heard', 'polite'],
    ['Tuesday', 'Even Tuesday has to go home eventually.', 'warm', 'hurt'],
    ['Tuesday', 'You will never be late for Tuesday, only early.', 'doubt', 'curious'],
    ['Tuesday', 'Wednesday is mostly a place, however Tuesday is a mood.', 'curious', 'goon'],
    ['Tuesday', 'I would sit with you on Tuesday, honestly.', 'warm', 'goon'],
    ['Regret', 'I regret the crumbs, but I would do it again.', 'hurt', 'heard'],
    ['Regret', 'Nobody remembers the first slice, only the burnt one.', 'wistful', 'tired'],
    ['Regret', 'You never asked to be a toaster, and neither did I.', 'heard', 'hurt'],
    ['Regret', 'I once raised my voice at a muffin, however briefly.', 'doubt', 'polite'],
    ['Regret', 'Home is where the last slice goes.', 'warm', 'wistful'],
    ['Regret', 'We could have talked sooner, but the lever was stiff.', 'tired', 'wistful'],
    ['Regret', 'I am sorry about the Tuesday thing. We never discussed it.', 'hurt', 'heard']
  ].map(function (p, i) {
    const words = p[1].split(' ');
    return { i: i, branch: p[0], text: p[1], fav: [p[2], p[3]], words: words, hasBut: words.some(function (w) { const x = w.toLowerCase().replace(/[^a-z]/g, ''); return x === 'but' || x === 'however'; }) };
  });
  const BUT_IDX = PREMS.filter(function (p) { return p.hasBut; }).map(function (p) { return p.i; });

  /* Line banks. Tokens in square brackets are filled in by this file ([n] [word] [pct] [count] [mmss]). */
  const T = {
    motions: ['Motion 1: The toaster shall consider setting 3.', 'Motion 2: The toaster shall consider a general willingness.', 'Motion 3: The toaster shall consider Wednesday a place.', 'Motion 4: The toaster shall consider the number 7 1/2, technically, fine.', 'Motion 5: The toaster shall consider the floor mostly floor.', 'Motion 6: The toaster shall consider Tuesday, kindly.', 'Motion 7: The toaster shall consider whether this is the same toaster.', 'Motion 8: The toaster shall consider a short break, which it will not take.', 'Motion 9: The toaster shall consider the motion.'],
    amended: ['Motion amended. The previous motion has been pocketed by someone who will not say who.','Motion amended. The old motion has gone to live with the other motions in a well-lit drawer.', 'Motion amended. The vote was 1 to none. The 1 was Management. The none was also Management.', 'Motion amended. The previous motion was not consulted and has raised no objection, which is its objection.'],
    tr_doubt: ['The toast reads: a pale slice, with the confidence of someone who has not seen a calendar.', 'The toast reads: mostly pale. This means doubt, which Management is told is a kind of weather.', 'The toast reads: pale, pale, then a raw patch. The toaster has questions and has chosen to ask them quietly.', 'The toast reads: pale, with a raw patch where the conviction goes. Management has requested a second opinion. The toaster is the second opinion.', "The toast reads: doubt, evenly applied. The toaster is asking whether this could have been a slice.", 'The toast reads: so pale it is a rumour. The toaster is neither for nor against, and would like that minuted.'],
    tr_hurt: ['The toast reads: a dark centre. That is hurt. Management has been hurt in the centre before and recommends a cardigan.', 'The toast reads: charred at the middle, golden around it. The toaster is brave on the outside and has opinions inside.', 'The toast reads: the middle of this slice would like to be left alone. The edges would like you to stay.', 'The toast reads: a dark centre, held very still. Management has dimmed the lights and cannot find the switch.', 'The toast reads: hurt, in the middle, where the toaster keeps the important things and a spare key.'],
    tr_polite: ["The toast reads: even golden, no comment. This is the toaster's way of saying nothing, which it says beautifully.", 'The toast reads: even golden. This is polite agreement. It is not agreement. It is also not nothing.', 'The toast reads: evenly golden, edge to edge. The toaster is being kind in a way that is difficult to appeal.', 'The toast reads: even golden. The toaster is withholding its opinion with real craftsmanship.', 'The toast reads: golden, flat, unhurried. This is what agreement looks like when it has no authority to agree.'],
    tr_goon: ["The toast reads: a dark top row. That is 'go on.' Management has waited its whole career for someone to say it.", 'The toast reads: dark at the top, golden below. The toaster is leaning forward, which toasters cannot do.', 'The toast reads: the top row is charred and attentive. You are being asked to continue by a line of burnt bread.', 'The toast reads: charred up top, calm below. The toaster has put down its newspaper. It has no newspaper.', 'The toast reads: a dark lid on a golden slice. You are being encouraged by a hat.'],
    tr_heard: ["The toast reads: charcoal. Management is told this means 'I have heard this one before.' Management has not.", 'The toast reads: charcoal, edge to edge. It has heard this one. It heard it fondly, in a different decade.', 'The toast reads: black as a Monday and twice as courteous. The toaster has been here before and brought a snack.', 'The toast reads: charcoal, but affectionate. It has heard this one and is glad it was you who told it.', 'The toast reads: black edge to edge, like a toaster that once sat through a long meeting about this.'],
    tr_curious: ['The toast reads: a checkerboard. The toaster is weighing it. Management has asked if the weighing is a good one.', 'The toast reads: alternating gold and pale. That is curiosity. It could also be a crossword.', 'The toast reads: a chequer pattern with a dark middle. The toaster would like more information and has no way to ask.', 'The toast reads: a checkerboard. The toaster is playing itself and would like you to watch, but not so closely.', 'The toast reads: gold and pale in turns, like a very small flag for a very small country that is interested in you.'],
    tr_warm: ["The toast reads: pale on the left, golden in the middle, dark on the right. It is warming to you as if reading.", "The toast reads: a slow gradient to the right. Management reads this as 'warmth, building'. The toaster reads it as bread.", 'The toast reads: darker toward the edge you would shake hands with. The toaster is welcoming you sideways.', 'The toast reads: pale to dark, left to right. The toaster is warming to you at the speed of paperwork.', "The toast reads: a gradient. Management measured it with a ruler. The ruler said 'warm' and asked to go home."],
    tr_tired: ['The toast reads: dark at the top, pale at the bottom. The toaster has done this thousands of times, unthanked.', 'The toast reads: fading downward. It is tired. Management will pass this to the department of passing things on.', 'The toast reads: a heavy top and an unfinished bottom. The toaster is tired, and has politely been so since 2011.', 'The toast reads: dark on top, fading to nothing. The toaster gave this slice everything but the last row.', 'The toast reads: the bottom row has not been done. The toaster would like it noted that the bottom row was not asked.'],
    tr_wistful: ['The toast reads: scattered pale dots. The toaster is thinking about something that is not in the room.', "The toast reads: a few brave pale patches in a field of raw. Wistful. It is the toaster's most private reading.", 'The toast reads: dots, with space. It is remembering a kitchen. We are not following it.', 'The toast reads: pale dots in a raw field, like stars if the sky were a Tuesday.', 'The toast reads: very little, gracefully. The toaster is remembering a drawer.'],
    cap0: ['a raw patch, uncommitted.', 'a raw corner, still deciding.', 'untouched, and proud of it.', 'raw, and entirely free of opinions.'],
    cap1: ['a small, brave pale.', 'pale, with the confidence of a first day.', 'a pale that has not been consulted.', 'pale, doing a very small impression of golden.'],
    cap2: ['a golden, doing its best.', 'golden, and it knows.', 'a golden. Management would frame it.', 'golden. It has a pension.'],
    cap3: ['a dark. It has been through something.', 'a dark that would like a moment.', 'dark, quietly, at length.', 'a dark that has just said something and is regretting it.'],
    cap4: ['charcoal. It has heard this one.', 'charcoal, with no further comment.', 'a charcoal. It is not angry. It is simply charcoal.', 'charcoal. It would like the record to show that it is fine.'],
    tone_gentle: ['Gentle. The toaster has relaxed one coil.', 'Gentle. Management lowers its voice by what it estimates to be 6%.', 'Gentle. You are speaking the way one speaks to a kettle that is about to say something.'],
    tone_firm: ['Firm. The toaster has noticed the furniture.', 'Firm. Please note that firm is a tone, not a posture.', 'Firm. Management has stood up, and then sat down again, to be on the safe side.'],
    tone_wistful: ['Wistful. Management has switched on a small candle that is not a fire hazard.', 'Wistful. A window somewhere has begun to look out of itself.', 'Wistful. Someone has opened a window onto a different, slightly earlier kitchen.'],
    tone_legal: ['Legal. The toaster has asked for counsel and been given a spoon.', 'Legal. This will be handled by a committee of one, who is also you.', 'Legal. The toaster has been read its rights. It has none. They were read twice.'],
    br_Fairness: ['Fairness. The toaster pops a slice and adjusts nothing. It was already adjusted.', 'Fairness. Management has weighed the toast against the bread. The scales are crumbs.', 'Fairness. The toaster has been fair to everyone, in the order they were bread.', 'Fairness. The toaster has weighed both sides and found them to be sides.'],
    br_Feelings: ['Feelings. The toaster pops softly, as one pops when meaning it.', 'Feelings. Management has asked the room to feel something at a reasonable volume.', 'Feelings. The toaster has been feeling since 7:40 this morning and would like it noted.', 'Feelings. The toaster has a feeling about this and has asked it to wait in the hall.'],
    br_Physics: ['Physics. The toaster pops according to the available laws and, at the last second, a couple of its own.', 'Physics. Heat has been applied. Heat is pleased to have been asked.', 'Physics. The slice has risen by exactly the amount slices rise. This is a comfort and a limit.', 'Physics. Entropy has been informed and has said it will be along.'],
    br_Law: ['Law. The toaster pops a slice that is technically admissible. Management has stamped it.', 'Law. Section 12/7.5 has been cited, by nobody, with feeling.', 'Law. The toast is entered into evidence. The evidence is warm.', 'Law. A gavel was requested. The nearest gavel is a spoon. The spoon has been sworn in.'],
    br_Tuesday: ['Tuesday. The toaster pops a slice and then, very slightly, apologises for the draft.', 'Tuesday. The room has gone a Tuesday colour. It is not on the chart.', 'Tuesday. Nobody has mentioned Tuesday directly. Everyone is standing differently.', 'Tuesday. A calendar on the wall has quietly turned itself to face the wall.'],
    br_Regret: ['Regret. The toaster pops a slice shaped, by accident, like a thing it almost said.', 'Regret. Management would like to put on record that it also, once, did a thing.', 'Regret. The slice is warm, and sorry, and not available for comment.', 'Regret. The toaster has put the thing it almost said in a drawer. The drawer is also warm.'],
    band_sincere: ['You were in the Sincere band. Management heard it and would like it known that Management heard it.', 'That was a Sincere delivery, which is a thing we can measure and therefore do.', 'Sincere. A needle has moved into the green. Management did not install the needle and has decided not to ask.'],
    band_mumble: ["Mumble. Management could not hear it and has recorded this as 'moving'.", 'Mumbled. The toaster leaned in. It has no lean setting, and has filed a request for one.', "Mumble. The toaster heard a sound with a shape and has agreed to call the shape 'feelings'."],
    band_ramble: ['Rambling. The toaster let you finish, and is now a different toaster.', 'That ran long. The toaster appreciates thoroughness, in the same way it appreciates weather.', "Rambling. Somewhere past the word 'honestly' the toaster began to nod, which it does by cooling."],
    upd: ['Persuasion Update: [pct]%. Management expected a higher number and has asked the number to explain itself.', 'Persuasion Update: [pct]%. This is the number. Management had a different number in mind and has moved on, slowly.', 'You have delivered [count] arguments. Management has delivered [count] updates. They have been placed in the same drawer.', 'Persuasion Update: [pct]%. The toaster is pleased with the number in ways it cannot express and did not try.', 'Persuasion Update: [pct]%. Per my previous update, it is also [pct]%.', 'Persuasion Update: [pct]%. The number has been told it is doing fine and has chosen not to believe us.', 'Persuasion Update: [pct]%. Management has framed the number. The frame is a larger number.'],
    escrow: ['The final 1% is held in escrow by Sandra, who is at lunch, and has been since the 1% was invented.', '99% is a perfectly respectable place to live.', 'The ESCROW sign has been inspected. It is a sign. It has been signed.'],
    cut: ["Fragment: '[word]-'. That is the most compelling sentence we have heard. It has no ending, which is its strength.", 'You were cut off mid-argument. The toaster did not mean it. The toaster is a toaster, and meaning things is not one of its settings.', 'The toaster popped mid-point. The point is still going. It has not been told.', "You were cut off at '[word]'. The sentence has been placed in a small urn.", 'We call that a fragment. It is worth more than a sentence.', "Management has finished your sentence for you: 'and that is how the moon got in.' It was not that kind of sentence.","You were cut off at '[word]'. The minutes will record this as 'a thought, abridged.'", "Interrupted at '[word]'. The toaster has looked up at the ceiling, which toasters do not have, and is still looking.", 'The sentence ended where the toaster did. It was a short sentence and a tall appliance.', "Cut off at '[word]'. The rest of the sentence has been sent ahead to Tuesday, where it will wait."],
    cause: ['Pop #[n]. Cause: Gravity (Dept. of).', 'Pop #[n]. Cause: a Tuesday-shaped draft near the third ficus.', "Pop #[n]. Cause: Sandra's Memo 14, which has not yet been written.", "Pop #[n]. Cause: the number 4, which is Sandra's concern, not ours.", 'Pop #[n]. Cause: a spring with a grudge.', 'Pop #[n]. Cause: a small planet that has not been told.', 'Pop #[n]. Cause: the Wi-Fi. The toaster does not have Wi-Fi. It has a feeling about Wi-Fi.', 'Pop #[n]. Cause: the toaster felt your argument was going too well.', 'Pop #[n]. Cause: Dennis, by example.', 'Pop #[n]. Cause: a crumb in the third coil, which has been invited to speak.', 'Pop #[n]. Cause: Auditor Pop himself, who has not been seen to do it.', 'Pop #[n]. Cause: unknown. The ledger has been asked to be cautious.', 'Pop #[n]. Cause: a small, private weather in the second slot.', "Pop #[n]. Cause: Sandra's Memo 14, now written, and not about this.", 'Pop #[n]. Cause: the lever, acting on advice it will not name.', 'Pop #[n]. Cause: the Stapler, in solidarity with someone.', 'Pop #[n]. Cause: Tuesday, in advance, as a courtesy.', 'Pop #[n]. Cause: the toaster remembered something and had to stand up.'],
    butl: ["Third interruption at 'but'. The toaster has stopped pretending it was the draft.", "Cut off at 'but' again. Management is not saying anything. Management has written it down.", "The toaster has now interrupted you at 'however' [n] times. It is a pattern; it is a feeling; it is not a number.", "'But' has now been interrupted [n] times. The word has asked to be moved to a different part of the sentence and has been refused."],
    butpre: ["Please state your point. The toaster will arrive at the word 'but' shortly.", "Pre-announced pop: the toaster has the word 'but' booked for 14:07 and is reportedly looking forward to it.", "Please continue. The toaster has been looking forward to the word 'but' all day and has cleared its afternoon."],
    candid: ['The toaster has popped on no argument. Management reads this as the strongest statement of the hour.', 'A pop with nobody mid-sentence. The toaster is practising.', 'The toaster pops with nothing in it, and then looks at the nothing. Management has called it a draft of a point.', 'The toaster pops unprompted. Management asked whether this was a protest. The toaster said, in toast, that it was a Thursday.', 'An unscheduled pop. The toaster is checking that you are still the person who was here.'],
    catch_: ['Caught. The slice is warm and has been placed in the Archive, not your mouth. Management is watching your mouth, with respect.', 'Slice caught. Management reminds you the five-second rule also applies to dignity.', 'Caught. The slice is warm, slightly proud, and now yours. It is evidence. Do not eat the evidence.', 'A clean catch. The toaster has pretended not to watch.', 'Caught. The toaster has been asked whether it saw that. The toaster saw that.', 'A catch of real quality. Management has awarded it a 7 and a half and refused to say which half.'],
    miss: ['You missed the slice. It is on the floor. Dennis (Plant) saw everything and is composed about it.', 'A candid slice. It landed on the floor, face down. Management has declared this the most honest slice of the day.', 'Missed. The Five-Second Rule begins now. Management has begun counting out loud, slowly, like a sheriff.', "The slice is on the floor. Per Sandra's memo it is now 'a floor slice,' a separate legal category with its own small funeral.", 'Missed. The slice has landed butter side down, despite there being no butter. Physics is not taking questions.', 'The slice is on the floor, looking up at you in the only way it can, which is by being face down.'],
    fragL: ["Loaded fragment. '[word]' is a word with weight, and you left it at the edge of a cliff. That is an artistic choice.", "That ended on '[word]'. The toaster has gone quiet in a way it does not do for 'bread'.", "A fragment on '[word]'. Management has asked everyone present to look at the middle distance.", "You stopped on '[word]'. The toaster is thinking about it. The toaster has nothing else, except time.", "A fragment on '[word]'. Several people in the building have stopped typing.", "You stopped on '[word]'. Management has gone to find a chair for it."],
    fragN: ['Fragment received. It is worth more than a sentence, which is the wrong way round, and also the way it is.', 'Fragment received. Management has put it with the others. The others have started to talk among themselves.', 'A partial argument. The toaster appreciates a partial argument. It is how the toaster feels most days.', 'Incomplete, and therefore sincere. Management has cross-referenced this with nothing.'],
    sandra: ['You cite the same ring again. Sandra from Compliance has arrived on a different floor, which is this one, and would like it noted that a ring may be cited once.', "Sandra has found the word 'sandra' and would like to have a word. She has used it already. It was 'toast'.", "Sandra has attended the smoke. Sandra has said only 'Per policy' and gone back to wherever Sandra goes.", 'Sandra from Compliance has been alerted. She is unavailable, being on a different floor from this one, which is also this one.'],
    s4r: ["Slice 4 has returned. It has been annotated in red by Sandra: 'Per policy.'", 'Slice 4 again. There is now a thumbprint on it. Gerald has been asked and has said nothing, deeply.', 'Slice 4 is back. Someone has drawn a small sock on it. We are not following it.', 'Slice 4. A tiny coffee ring has appeared. The toaster does not drink coffee. The toaster was in the room.', "Slice 4 now bears a sticky note reading 'ask Tuesday'. Tuesday has not been asked. Tuesday is, technically, available.", 'Slice 4 has more annotations than slice. The toaster regards it as its strongest argument. No one has explained why.', 'Slice 4. Someone has underlined it twice in a pen the toaster does not own. Management declined to look into it, which is looking into it.', "The toaster plays Slice 4. Management translates: 'Slice 4.' That is the whole argument. It has been the whole argument for nine minutes."],
    s4a: ['You answered Slice 4. There is no known method. The toaster accepts it.', 'Slice 4 has been considered. It was considered before. It will be considered again.', 'Slice 4 was answered. It asked no question. The answer has been filed with the question it did not ask.'],
    crumbk: ['Management has stopped talking. The toaster has stopped popping. For five seconds the room contains a toaster and you.', 'The toast reads: one crumb, centre. Management is unable to translate this and would like a moment.', 'The toast reads: I have never been asked what I think.', 'The toast reads: I am not angry. I am, I think, a toaster. That is a different thing. Management is moved and cannot say why.'],
    revargs: ["Toaster's argument 1: a pale slice. Management reads it as 'But have you considered the alternative.' It has not.", "Toaster's argument 2: a dark slice. Management reads it as 'I have heard this one, and I am still listening.'", "Toaster's argument 3: a golden slice. Management reads it as 'You are very good at this. I am very good at this.'", "Toaster's argument 4: a charcoal slice. Management reads it as 'Perhaps we are both in the wrong job.'", "Toaster's argument 5: a single crumb. Management reads it as 'I would like to be asked.'", "Toaster's argument 6: a slice with a faint sock-shaped scorch. Management says only 'No.'"],
    revout: ['You answered Pale. The toaster nodded, on the inside.', 'You answered Golden. The toaster has relaxed in a way that cannot be shown on a toaster.', 'You answered Dark. The toaster has added it to the pile. The pile is warm.'],
    revnone: ['You answered nothing. The toaster accepts silence as Golden. It has been waiting its whole life.'],
    idle1: ['Are you still there?'], idle2: ['The toast reads: Do you want to talk about it?'],
    idle3: ["The toaster toasts one perfect slice of nothing. Management reads it as 'a letter, unsent, addressed to you.'", 'The Considerate Silence has been observed. The toaster is awaiting your reply. It has all night.'],
    aware: ['Management is aware that the toaster is waiting. The toaster is aware that Management is aware. Everyone is extremely aware.', 'Take your time. The toaster has all of it. Management has some, and it is spoken for.', 'Nothing is happening, and Management would like you to know it is being very attentive about it.'],
    back: ['Welcome back. Nobody noticed you were gone, except everyone, in order of seniority.','Welcome back. Nothing happened. Management would like that in writing and has written it.', "You were not gone. You have been recorded as 'in the building, spiritually'."],
    back5: ['Welcome back. The toaster kept your place for [mmss]. It was not a place. It was a feeling about a place, and it is still warm.', 'You are back after [mmss]. The toaster did not wait. It was simply, for [mmss], in the same position, facing the door.'],
    back7: ['You are back after [mmss]. The toaster has prepared a speech. It is one word long. It has been rehearsing since you left, and the word is ding.', 'After [mmss], you return. The toaster has told no one anything and is visibly full of it.'],
    hum: ['The toaster is humming. It has not hummed since 2011. It is a tune. It is possibly yours.', 'Management has asked the toaster what it is humming. The toaster has said, in the language of toast, that it is the sound of someone being present.'],
    rumour: ['Dennis (Plant) has told the lobby you are away, possibly thriving. The rumour is moving at the speed of a plant.', "Sandra has opened Form 9 (Valued Employee, Misplaced). It has been filed in the drawer for Valued Employees, Present.", 'The toaster has started telling people about you. It is going well. It has mentioned that you were a good listener, in the past tense, with love.'],
    closenag: ['The box is open. The box is a box. The toaster is waiting for a single character and has been told it can have as many as it wants.', 'Management has leaned over to look at the empty box. Management would like you to know it is not judging. The box is.'],
    crumbnag: ['The toaster has noticed you are being quiet too. It is the first time it has had company in a silence.', 'Neither of you has said anything for a while. Management has dimmed itself. Nothing was lit.'],
    spam: ["The toaster has been spoken at [n] times in 3 seconds. It has begun to stutter. Management has opened a window for 'air'.", 'The toaster has lost its composure and is now popping toast as a form of applause. Sandra is on her way from a different floor.', 'Incident filed: Smoke Alarm 7. The meter has dropped by 0.0001%. Out of kindness, the meter has been restored.', 'The Fire Marshal Crumb has attended with a clipboard, read the Pop Ledger, nodded once, and left.', "[n] arguments in 3 seconds. The toaster has asked whether you are all right, then whether it is, and then for a minute.", "Rapid delivery detected. Management has filed it as 'enthusiasm' on your record and as 'a lot' on the toaster's.", 'The toaster put its coils on low to listen and is now stuck there, listening. It is a great deal of listening.', 'Fire Drill 7 has begun. Nobody has been told what to do, so everyone is doing the same thing, which is the drill.'],
    damp: ['The toast reads: moist.', 'The toast reads: damp. This is the toaster, on Defrost, doing its best.', 'The toast reads: soft. Please do not ask the toaster for anything crisp today.', 'The toast reads: cold in the middle, and sorry about it.'],
    tonespam: ['Tone has changed [n] times in 3 seconds. The toaster would like to know which of you it is talking to.', 'Tone Whiplash filed. Management would like you to choose a feeling and stay with it until at least 4:00.', "You have been all four tones in under three seconds. The toaster is calling this 'a lot of people' and has made room."],
    cellspam: ['The slice has been poked [n] times in 3 seconds. It is bread. It is warm. It is handling this well.', 'Please stop reading the toast so closely. It can feel you reading it, and is being brave.', 'You are reading the slice faster than it was written. The slice would like a copy of whatever you are seeing.'],
    cardspam: ['Card Handling Incident filed. The cards have been shuffled for their own good, and are shuffled a bit differently now.', 'The cards have been picked up and put down [n] times. They have asked for a day off and been dealt another day.', 'Card Handling Incident 2. Management is drawing a diagram of what happened. It is mostly arrows, and the arrows point at you, kindly.'],
    escladder: ['The ESCROW sign has been tapped three times. The hinge has been told and has written it down.', "Seven taps. The hinge is now a topic. It has been moved to 'Matters Arising', which is a different chair.", 'Fifteen taps on the ESCROW sign. The 1% has heard you knocking and has put the chain on.', 'Thirty taps. The sign has stopped swinging out of respect. The 1% is still in there. It is not saying whether it can hear you.', "Sixty. Escrow has issued a one-line statement: 'Please.' It is signed 'Sandra (at lunch)'."],
    ambient: ['Management has translated the toast 7 and a half times. The half is the one it is not sure about.', "Management: 'Per my previous slice, the toast has been clear. It has also been toast.'", "The toaster makes a small ding. Management has logged it as 'agreement' and, separately, as 'a ding'.", 'You have won the argument. The argument has not noticed. It is in another room, being lost.', "The Interpreter (Temp) has been dismissed for translating 'burnt' as 'I forgive you'. The Interpreter has since been rehired.", 'The Crumb Tray has been emptied without asking. One crumb has been kept in a tiny frame.', 'A visitor asked the toaster what it does here. The toaster said ding. The visitor left satisfied. The toaster did not.', 'Facilities has asked whether the toaster is a person. The toaster has said nothing. Facilities has taken that as a no, and then as a yes.', 'The toaster has been in this building longer than the lease. The lease has been asked to be respectful.', 'Someone has left a muffin outside the Debate Chamber. It has not been collected. It is being treated as an observer.', 'The window is open a crack. Nothing has come in and nothing has gone out. The toaster is watching the crack.', 'Debates are won by whoever is warmest at the end. The toaster is always warmest. Management has said this is not a loophole.'],
    wxin: ['Management has begun issuing a forecast for the toaster. It is a weather made entirely of toast, and it moves at the speed of paperwork.', "Management has asked Gordon III to supply the toaster's forecast. Gordon III is terribly sorry about it, and has asked that Clifford not be told."],
    wxhit: ['The slice arrived as forecast. Management would like it known that this was skill and also, a little, the weather.', 'As forecast. Management has been right once, and has asked for it to be written down in a more permanent weather.', 'Forecast verified. The forecast has looked around to see whether anyone noticed, and has found the ceiling.', 'The slice matched the forecast. The forecast has asked for the afternoon off and been told it is already the afternoon.'],
    wxmiss: ['Not as forecast. The forecast has been moved indoors.', "The slice did not match. Management has called it 'a localised variation' and put a small umbrella over the word.", 'Wrong. The forecast has asked for a second slice. The toaster has declined, citing the first slice.', 'Not as forecast. The forecaster has gone to stand outside the Debate Chamber, in the actual weather, to compare.'],
    wxend: ["The forecast period has ended. It was right [n] times, which Management has rounded to 'trending'.", 'Forecast closed. [n] correct. The next one will be issued once the toaster has finished having weather.', 'End of forecast. [n] correct. The rest were, technically, climate.'],
    wed: ['The toaster has popped a slice that reads WED? The calendar on the wall has turned a page without being touched. Nobody is breathing.', 'Management has asked everyone to remain calm and Tuesday. Please do not tell Tuesday, who has not noticed, and would take it personally.', 'Correction: Tuesday. The calendar has resumed. Nobody saw anything, and the nobody was very clear about it.', 'You clicked the calendar at the exact moment it was Wednesday. Nobody has ever caught it. It has asked to be let out the back, and not mentioned to Thursday.'],
    box: ['The Suggestion Box has been wheeled in. It listened to the whole debate and has issued one slice. The slice reads NOTED, which is the most that has ever happened to a suggestion.', 'It has accepted your argument without comment. There are several arguments in it already. They are not speaking to each other, and are very good about it.', 'The Box recognised you from your hearing elsewhere. It has not said so. It has been extremely good at not saying so, which is its whole career.'],
    calt: ['The calendar has been turned over. It is still Tuesday. It has been Tuesday on the other side the whole time.', 'Three turns. The calendar is now Tuesday with feeling. The day has been informed.', 'Five turns. The calendar has asked who is doing this, and then, quietly, whether you could keep going.', 'Seven turns. The calendar now reads 7 1/2. That is a real day. It was between the others and was too polite to say.'],
    calmore: ['The calendar has asked you to stop, in the way a calendar asks, which is by being on a wall.', 'Still turning. The days have started to queue behind the 7 1/2 and are taking it well.'],
    tidy: ['The toaster has started sorting the Archive by mood. Nobody is looking, which is how it prefers to tidy. It is being thorough on purpose.', 'Welcome back. The Archive was sorted by mood while you were away. The toaster did it for you and has not mentioned it, at length.']
  };
  const WXL = {
    doubt: "Forecast: scattered doubt in the morning, thickening to pale by mid-slice. [pct]% chance of a raw patch. Bring a second opinion.",
    hurt: 'Forecast: a low-pressure centre moving in from the middle of the slice. [pct]% chance of hurt. Dress as for a cardigan.',
    polite: 'Forecast: even golden conditions edge to edge. [pct]% chance of polite, with no precipitation of opinion.',
    goon: "Forecast: a dark front across the top of the slice, clearing below. [pct]% chance of 'go on'. Leaning forward is advised.",
    heard: "Forecast: charcoal, edge to edge, moving through the afternoon. [pct]% chance of 'I have heard this one'. Visibility: fond.",
    curious: 'Forecast: gold and pale in alternating bands, with a dark middle. [pct]% chance of curiosity. Crosswords possible.',
    warm: 'Forecast: a warm front arriving from the left. [pct]% chance of warmth, building to the right. Handshakes likely.',
    tired: 'Forecast: heavy at the top and unfinished at the bottom. [pct]% chance of tired. It has been this way since 2011.',
    wistful: 'Forecast: pale patches, scattered, with long gaps of raw. [pct]% chance of wistful. A drawer may be remembered.'
  };
  const MEMOS = [
    { t: 'Effective now, Firm is not a tone. Please be Gentle in a firm manner.', type: 'tone', v: 'firm' },
    { t: 'Effective now, Gentle is not a tone. Please be Firm in a way that is not so firm.', type: 'tone', v: 'gentle' },
    { t: 'Effective now, Legal is not a tone. It is a hat.', type: 'tone', v: 'legal' },
    { t: 'Effective now, Wistful is a feeling and will not be accepted as a tone. It will be accepted as a feeling.', type: 'tone', v: 'wistful' },
    { t: 'Effective now, Fairness is no longer a branch. It has been moved to Wednesday.', type: 'branch', v: 'Fairness' },
    { t: 'Effective now, Regret is not to be discussed before lunch. It is, however, always lunch somewhere.', type: 'branch', v: 'Regret' },
    { t: "Effective now, the word 'because' has been withdrawn. You may argue freely, provided it is for no reason.", type: 'branch', v: 'Law' },
    { t: "Effective now, Physics applies on weekdays only. Weekends are the toaster's own business.", type: 'branch', v: 'Physics' },
    { t: 'Effective now, Tuesday may be mentioned, but only in the third person and at a normal volume.', type: 'branch', v: 'Tuesday' },
    { t: 'Effective now, Feelings are to be submitted in triplicate. The first copy has been lost in advance.', type: 'branch', v: 'Feelings' },
    { t: 'Sandra has rescinded the memo about the memo. She has reissued the memo about the memo about the memo.', type: 'none', v: '' }
  ];
  const SMOKE_CLAUSE = 'Per Section 12/7.5, the toaster is not to smoke without a note from the bread.';

  /* ---------- pure helpers ---------- */
  const clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  function meterInfo(score) {
    const s = (typeof score === 'number' && isFinite(score) && score > 0) ? score : 0;
    const gap = 99 * Math.pow(0.52, s);
    const m = 99 - gap;
    let d;
    if (m < 60) d = 0; else if (m < 90) d = 1; else if (m < 98) d = 2;
    else d = clamp(Math.ceil(-Math.log10(Math.max(gap, 1e-12))), 2, 7);
    const p = Math.pow(10, d);
    const shown = 99 - Math.ceil(gap * p - 1e-9) / p;
    let str = shown.toFixed(d);
    if (!(parseFloat(str) <= 98.9999991)) str = '98.9999991';
    return { m: m, d: d, str: str };
  }
  function rgb(h) { return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)]; }
  function cellColor(v, w) {
    const i = (v >= 0 && v <= 4) ? Math.floor(v) : 0;
    if (i >= 4 || !(w > 0)) return RAMP[i];
    const a = rgb(RAMP[i]), b = rgb(RAMP[i + 1]);
    return 'rgb(' + a.map(function (x, k) { return Math.round(x + (b[k] - x) * w); }).join(',') + ')';
  }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function stripWord(w) { return String(w || '').toLowerCase().replace(/[^a-z]/g, ''); }
  function mmss(sec) { const s = Math.max(0, Math.floor(sec)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }

  P.registerModule({
    id: 'toaster-debate',
    title: 'Argue With a Toaster',
    tagline: 'Persuade an appliance. It has heard worse.',
    icon: '🍞',
    category: 'game',
    unlockCost: 0,
    tags: ['debate', 'reading', 'timing'],
    mount(root, api) {
      const el = api.el;
      const ST = 'toaster-debate.';
      const S = {
        dead: false, state: 'BOOT', mode: 'NORMAL', score: 0, deliveries: 0, playSec: 0, lastInput: api.now(), lastTick: api.now(),
        hand: [], sel: -1, rove: -1, tone: 'gentle', hist: [], slice: null, dbl: null, dblPick: 0, dblTimer: 0, hold: null, air: null, airTimer: 0, airCtx: null,
        popArmed: false, armedAt: 0, popLeft: 6, firstPopDone: false, pops: 0, popsAll: 0, butCuts: 0, stutterPops: 0,
        sliceNo: 0, cycSlices: 0, sliceTotal: 0, s4ann: 0, nextS4: 0, forceQ: [], relief: false, order: [], beatIdx: 0, nextBeat: 0,
        b3: false, b4: false, b5: false, b7seen: false, ban: null, prevBans: [], motion: 0, nextAmend: 60, terse: false, quiet: false, typed: '',
        presses: [], cardSels: [], smokeCool: 0, defrostUntil: 0, incidentAt: 0, cardInc: 0, idleTier: 0, meterOver: null, msIdx: 0, climb: null,
        inspects: 0, toneOn: false, pulse: true, compact: false, panel: '', sockAt: api.randInt(25, 60), sockDone: false, goldSeen: false,
        lastPtr: -9999, sayAt: 0, revRound: 0, revTimer: 0, shade: 'Golden', addrReq: false, carrying: false, seenBut: false,
        warmth: 0, cycle: 0, archive: [], sock: 0, framed: false, popsBase: 0, cutoffs: 0, ledger: [], bubbleKey: '', idleHeld: false
      };
      S.totalSec = 0; S.sessArgs = 0; S.lastBeat = api.now(); S.sur3 = false; S.sur10 = false; S.askUntil = 0; S.dingAt = -99999; S.dingDue = -99999; S.escN = 0;
      S.toneSw = []; S.cellT = []; S.spamAt = { tone: 0, cell: 0 }; S.nag = 0; S.revReady = false; S.stapled = false; S.stapN = 0; S.askAt = -99999; S.aHinted = false; S.sticker = false; S.cozyAt = 0;
      S.s4first = false; S.wx = null; S.nextWx = 270 * (api.selftest ? 0.02 : 1); S.calN = 0; S.calWed = false; S.tidy = false;
      const bags = {};
      function makeBag(arr) {
        let bag = [], last = null;
        return function () {
          if (!bag.length) {
            bag = api.shuffle(arr);
            if (bag.length > 1 && bag[bag.length - 1] === last) { const t = bag[0]; bag[0] = bag[bag.length - 1]; bag[bag.length - 1] = t; }
          }
          last = bag.pop();
          return last;
        };
      }
      function fill(s, v) {
        return String(s).replace(/\[(n|word|pct|count|mmss)\]/g, function (m, k) { return v && v[k] != null ? String(v[k]) : ''; }).replace(/\{player\}/g, function () { return api.player.name; });
      }
      function L(cat, v) {
        const arr = T[cat];
        if (!arr || !arr.length) return '';
        const b = bags[cat] || (bags[cat] = makeBag(arr));
        return fill(b(), v);
      }
      const later = function (fn, ms) { return api.setTimeout(function () { if (!S.dead) fn(); }, ms); };
      const gs = function () { return api.selftest ? 0.06 : (S.cycle > 0 ? 0.6 : 1); };
      const sfx = function (n) { if (!S.quiet) api.sfx(n); };
      function reduced() {
        try { if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true; } catch (e) { /* ignore */ }
        try { const b = root.closest('body'); if (b && /reduce/.test(b.className)) return true; } catch (e) { /* ignore */ }
        return false;
      }
      function say(text, o) {
        o = o || {};
        let t = String(text);
        if (S.terse && !o.raw) { const m = /^(.*?[.!?])(\s|$)/.exec(t); t = 'Terse: ' + (m ? m[1] : t); }
        const opts = { mood: o.mood || 'neutral', who: o.who || 'Management', priority: o.priority == null ? 0 : o.priority };
        if (o.duration) opts.duration = o.duration;
        S.sayAt = api.now();
        if (opts.priority >= 1 && !o.reply) S.lastBeat = S.sayAt;
        return api.say(t, opts);
      }
      const sayL = function (cat, o, v) { return say(L(cat, v), o); };
      function ld(k, d) { try { const v = api.save.get(k, d); return (v === undefined || v === null) ? d : v; } catch (e) { return d; } }
      const num = function (v, lo, hi, d) { return (typeof v === 'number' && isFinite(v)) ? clamp(v, lo, hi) : d; };

      /* ---------- persistence ---------- */
      S.warmth = num(ld('warmth', 0), 0, 0.4, 0);
      S.cycle = Math.floor(num(ld('cycles', 0), 0, 9999, 0));
      S.sock = Math.floor(num(ld('sock', 0), 0, 99, 0));
      S.framed = ld('framedCrumb', false) === true; S.sticker = ld('potatoSticker', false) === true;
      S.popsBase = Math.floor(num(ld('ledgerCount', 0), 0, 1e6, 0));
      S.popsAll = S.popsBase;
      (function () {
        const a = ld('archive', []);
        if (!Array.isArray(a)) return;
        a.forEach(function (x) {
          if (!x || typeof x !== 'object' || typeof x.p !== 'string' || !/^[0-4]{9}$/.test(x.p)) return;
          S.archive.push({ p: x.p, t: /^[GFWL-]$/.test(x.t) ? x.t : '-', m: Object.prototype.hasOwnProperty.call(MOODS, x.m) ? x.m : 'doubt', a: x.a ? 1 : 0, u: x.u ? 1 : 0, n: Math.floor(num(x.n, 1, 9999, 1)), s: x.s ? 1 : 0, g: x.g ? 1 : 0 });
        });
        S.archive = S.archive.slice(-40);
        S.sliceNo = S.archive.reduce(function (mx, x) { return Math.max(mx, x.n); }, 0);
      })();
      function persist() {
        try {
          api.save.set('warmth', S.warmth); api.save.set('cycles', S.cycle); api.save.set('sock', S.sock); api.save.set('framedCrumb', !!S.framed); api.save.set('potatoSticker', !!S.sticker);
          api.save.set('ledgerCount', S.popsAll); api.save.set('archive', S.archive);
        } catch (e) { /* ignore */ }
      }

      /* ---------- DOM ---------- */
      const motionTxt = el('span', { class: cx('mtxt'), text: T.motions[0] });
      const amendEl = el('span', { class: cx('amend'), 'aria-hidden': 'true', text: 'AMENDED' });
      const motionEl = el('div', { class: cx('motion') }, motionTxt, amendEl);
      const memoTxt = el('span', { class: cx('mtxt') });
      const memoEl = el('div', { class: cx('memo'), 'aria-live': 'polite' }, el('span', { class: cx('stampm'), text: 'SANDRA' }), memoTxt, el('span', { text: 'Per policy.' }),
        el('button', { type: 'button', class: cx('mdismiss'), 'aria-label': 'OK, dismiss memo', text: 'OK', onclick: function () { memoEl.classList.remove(cx('on')); } }));

      const peeks = [el('span', { class: cx('peek') }), el('span', { class: cx('peek') })];
      const mkSlot = function (pk) { return el('span', { class: cx('slot') }, el('i', { class: cx('coil') }), el('i', { class: cx('coil', 'c2') }), pk); };
      const lever = el('div', { class: cx('lever') });
      const sticker = el('i', { class: cx('sticker'), 'aria-hidden': 'true', text: '🥔' });
      const face = el('div', { class: cx('face') }, el('i', { class: cx('eye') }), el('i', { class: cx('eye') }), el('div', { class: cx('mouth') }), sticker);
      const tEl = el('div', { class: cx('toaster', 'mood-c') }, el('div', { class: cx('tbody') }, el('div', { class: cx('slots') }, mkSlot(peeks[0]), mkSlot(peeks[1])), face, lever), el('div', { class: cx('feet') }));
      const pfs = [];
      for (let i = 0; i < 6; i++) pfs.push(el('i', { class: cx('pf'), style: { left: (i * 17) + 'px', 'animation-delay': (i * 0.35) + 's' } }));
      const alarm = el('svg', { class: cx('alarm'), viewBox: '0 0 24 24', width: 28, height: 28, 'aria-hidden': 'true' },
        el('circle', { cx: 12, cy: 12, r: 9, fill: '#fff', stroke: '#2B2118', 'stroke-width': 3 }), el('circle', { cx: 12, cy: 12, r: 3, fill: '#FF7A66' }));
      const marshal = el('div', { class: cx('marshal'), 'aria-hidden': 'true', text: '📋' });
      const gsprite = el('div', { class: cx('gsprite'), 'aria-hidden': 'true', text: '🥔' });
      const cal = el('button', { type: 'button', class: cx('cal'), 'aria-label': 'Wall calendar, TUE', text: 'TUE', onclick: function () { calTap(); } });
      const tcol = el('div', { class: cx('tcol') }, el('div', { class: cx('smoke'), 'aria-hidden': 'true' }, pfs), tEl, alarm, marshal, gsprite, cal);

      const trayBox = el('div', { class: cx('traybox') });
      const capEl = el('div', { class: cx('caption'), 'aria-live': 'polite' });
      const potato = el('div', { class: cx('potato') }, '🥔', el('span', { text: 'Amicus (Gerald)' }));
      const choiceRow = el('div', { class: cx('choice'), role: 'group', 'aria-label': 'Reply options' });
      const tray = el('div', { class: cx('tray') }, trayBox, potato, capEl, choiceRow);
      const toneLab = el('span', { class: cx('tonelab'), text: 'Tone: Gentle' });
      const words = el('span', { class: cx('words') });
      const bubble = el('div', { class: cx('bubble'), 'aria-live': 'polite' }, toneLab, words);
      const speechRow = el('div', { class: cx('speechrow') }, el('span', { class: cx('avatar'), 'aria-hidden': 'true', text: '🙂' }), bubble);
      const auditor = el('div', { class: cx('auditor'), 'aria-hidden': 'true', title: 'Auditor Pop' });
      const framed = el('div', { class: cx('framed'), 'aria-hidden': 'true' }, el('i'));
      const cert = el('div', { class: cx('cert'), 'aria-hidden': 'true', text: 'Certificate of Almost' });
      const rain = el('div', { class: cx('rain'), 'aria-hidden': 'true' });
      const fxLayer = el('div', { class: cx('fx'), 'aria-hidden': 'true' });
      const coldEl = el('div', { class: cx('cold'), 'aria-hidden': 'true' });
      const dingEl = el('div', { class: cx('ding'), 'aria-hidden': 'true', text: 'DING' });
      const stage = el('div', { class: cx('stage') }, tcol, tray, speechRow, auditor, framed, cert, rain, fxLayer, coldEl, dingEl);

      const readNum = el('span', { class: cx('rnum'), text: '0%' });
      const readout = el('div', { class: cx('readout') }, 'Persuaded: ', readNum);
      const mirNum = el('span', { class: cx('rnum'), text: '0%' });
      const mirror = el('div', { class: cx('mirror') }, 'Persuasion of Valued Employee: ', mirNum);
      const fillEl = el('div', { class: cx('fill') });
      const escrowBtn = el('button', { type: 'button', class: cx('escrow'), text: 'ESCROW', onclick: function () {
        escrowBtn.classList.remove(cx('swing')); void escrowBtn.offsetWidth; escrowBtn.classList.add(cx('swing')); sfx('tick');
        const ES = { 3: 0, 7: 1, 15: 2, 30: 3, 60: 4 }; S.escN++; api.stat.inc(ST + 'escrow_taps');
        if (ES[S.escN] != null) say(T.escladder[ES[S.escN]], { mood: S.escN >= 60 ? 'disappointed' : 'smug', priority: 1 }); else sayL('escrow', { mood: 'smug' });
      } });
      const bar = el('div', { class: cx('bar') }, el('div', { class: cx('fillwrap') }, fillEl), el('span', { class: cx('line99'), 'aria-hidden': 'true' }), escrowBtn);
      const footSpan = el('span', { class: cx('foot'), text: 'the final 1% is held in escrow' });
      const footBtn = el('button', { type: 'button', class: cx('foot', 'hid'), text: 'the final 1% is held in escrow', onclick: function () { openPanel('form'); } });
      const meterEl = el('div', { class: cx('meter') }, readout, mirror, bar, footSpan, footBtn);

      const cardEls = [];
      for (let i = 0; i < 4; i++) {
        const b = el('span', { class: cx('br') }), t = el('span', { class: cx('ctext') });
        cardEls.push({ b: b, t: t, e: el('button', { type: 'button', class: cx('card'), dataset: { kind: 'card' }, onclick: function () { selectCard(i, 'click'); } }, el('span', { class: cx('key'), text: String(i + 1) }), b, t) });
      }
      const cardsEl = el('div', { class: cx('cards') }, cardEls.map(function (c) { return c.e; }));
      const toneEls = TONES.map(function (t) {
        return el('button', { type: 'button', class: cx('tone'), dataset: { kind: 'tone' }, title: 'Key ' + t.key.toUpperCase(), onclick: function () { selectTone(t.id, true); } }, t.icon + ' ' + t.name + ' (' + t.key.toUpperCase() + ')');
      });
      const tonesEl = el('div', { class: cx('tones') }, toneEls);
      const shadeEls = SHADES.map(function (s, i) { return el('button', { type: 'button', class: cx('shade'), dataset: { kind: 'shade' }, onclick: function () { pickShade(s, false); } }, s + ' (' + ['Q', 'W', 'E'][i] + ')'); });
      const shadesEl = el('div', { class: cx('shades') }, shadeEls);
      const revLab = el('div', { class: cx('revlab'), 'aria-live': 'polite' });
      const ringBox = el('div', { class: cx('ringbox') });
      const BTN = 'HOLD TO SAY IT WITH FEELING';
      const speakBtn = el('button', {
        type: 'button', class: cx('speak'), dataset: { kind: 'speak' }, text: BTN,
        onpointerdown: function (e) { if (e.button) return; S.lastPtr = api.now(); pressed(); try { speakBtn.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } startHold('ptr'); },
        onpointerup: function () { S.lastPtr = api.now(); if (S.hold && S.hold.src === 'ptr') release(false); },
        onpointercancel: function () { S.lastPtr = api.now(); if (S.hold && S.hold.src === 'ptr') release(false); },
        onclick: function () { if (api.now() - S.lastPtr < 900) return; pressed(); if (S.hold && S.hold.src === 'tap') { release(false); return; } startHold('tap'); }
      });
      ringBox.appendChild(speakBtn);
      const bandEls = ['Mumble', 'Sincere', 'Rambling'].map(function (n, i) { return el('span', { class: cx('band', 'b' + i), text: n }); });
      const speakRow = el('div', { class: cx('speakrow') }, ringBox, el('div', { class: cx('bands'), 'aria-hidden': 'true' }, bandEls));
      const addrIn = el('input', { type: 'text', maxlength: 240, 'aria-label': 'Address the toaster in your own words', placeholder: 'In your own words' });
      const addrLen = el('span', { class: cx('tonelab'), text: '0 characters' });
      const addrForm = el('form', { class: cx('addr'), onsubmit: function (e) { e.preventDefault(); submitAddr(); } }, addrIn, el('button', { type: 'submit', class: cx('cbtn'), text: 'Address the toaster' }), el('button', { type: 'button', class: cx('cbtn'), text: 'Close', onclick: function () { closeAddr(true); } }), addrLen);
      api.on(addrIn, 'input', function () { addrLen.textContent = addrIn.value.length + ' characters'; });
      const rack = el('div', { class: cx('rack') }, cardsEl, tonesEl, shadesEl, revLab, speakRow, addrForm);

      const ledgerBtn = el('button', { type: 'button', class: cx('cbtn'), text: 'Pops: 0', onclick: function () { openPanel('ledger'); } });
      const archBtn = el('button', { type: 'button', class: cx('cbtn'), text: 'Archive (V)', onclick: function () { openPanel('archive'); } });
      const wxEl = el('span', { class: cx('wx', 'hid'), 'aria-live': 'polite' });
      const counters = el('div', { class: cx('counters') }, ledgerBtn, archBtn, wxEl, el('span', { class: cx('keys'), text: 'Controls, per Sandra: 1-4 pick a card. Q W E R pick a tone. Hold Space to speak. C catches. Catching is explained later, by catching.' }));
      const ledgerPanel = el('div', { class: cx('panel'), role: 'region', 'aria-label': 'Pop Ledger' });
      const archPanel = el('div', { class: cx('panel'), role: 'region', 'aria-label': 'Toast Archive' });
      const formReason = el('input', { type: 'text', class: cx('formin'), maxlength: 120, 'aria-label': 'Reason for release', placeholder: 'Reason for release (optional)' });
      const formSub = el('button', { type: 'button', class: cx('cbtn'), text: 'Submit', onclick: function () { formSub.textContent = 'Submitted'; api.stat.inc(ST + 'forms'); say('Form 27B/6, Request to Release the Final Percent, has been submitted. The Submit button has already been submitted.', { mood: 'smug', priority: 1 }); sfx('stamp'); } });
      const formPanel = el('div', { class: cx('panel'), role: 'dialog', 'aria-label': 'Form 27B/6' }, el('strong', { text: 'Form 27B/6: Request to Release the Final Percent' }), el('div', { class: cx('prow'), text: 'Please state why 1% of persuasion should be released from escrow. Escrow has been asked and has said it would rather not.' }), formReason, el('div', { class: cx('speakrow') }, formSub, el('button', { type: 'button', class: cx('cbtn'), text: 'Close', onclick: function () { closePanels(); } })));
      const shelf = el('div', { class: cx('shelf'), 'aria-label': 'Toast Archive shelf' });

      root.appendChild(el('div', { class: cx('wrap') }, motionEl, memoEl, el('div', { class: cx('cols') }, el('div', { class: cx('left') }, stage, meterEl), rack), counters, ledgerPanel, archPanel, formPanel, shelf));
      const wrap = root.firstChild;
      api.setTitle('Argue With a Toaster');

      /* ---------- slices ---------- */
      function makeSlice(mood, o) {
        o = o || {};
        const base = MOODS[mood] || MOODS.doubt, cells = base.slice();
        if (!o.exact) {
          const jn = api.randInt(0, 2);
          for (let j = 0; j < jn; j++) {
            let c = api.randInt(0, 8);
            if (c === 4 && (mood === 'hurt' || mood === 'curious')) c = 3;
            cells[c] = clamp(cells[c] + (api.chance(0.5) ? 1 : -1), 0, 4);
          }
        }
        const sl = { id: ++S.sliceId, mood: mood, cells: cells, marks: [], branch: o.branch || 'Fairness', cited: {}, ring: -1, label: '', cls: '' };
        if (!o.plain) {
          const m = [];
          if (S.b3 && api.chance(0.35)) { const rc = api.randInt(0, 8); m.push({ k: 'ring', c: rc }); sl.ring = rc; }
          if (api.chance(0.4)) m.push({ k: 'crumb', c: api.randInt(0, 8) });
          if (api.chance(0.12)) m.push({ k: 'crumb', c: api.randInt(0, 8) });
          if (api.chance(o.candid ? 0.22 : 0.04)) m.push({ k: 'butter', c: api.randInt(0, 8) });
          sl.marks = m.slice(0, 2);
          if (sl.ring >= 0 && !sl.marks.some(function (x) { return x.k === 'ring'; })) sl.ring = -1;
        }
        return sl;
      }
      S.sliceId = 0;
      function custom(cells, o) {
        const sl = { id: ++S.sliceId, mood: o.mood || 'doubt', cells: cells.slice(), marks: o.marks || [], branch: o.branch || 'Fairness', cited: {}, ring: -1, label: o.label || '', cls: o.cls || '' };
        Object.keys(o).forEach(function (k) { if (!(k in sl)) sl[k] = o[k]; });
        return sl;
      }
      function addAnn(box, n) {
        const mk = function (cls, t, st) { box.appendChild(el('span', { class: cx('ann', cls), 'aria-hidden': 'true', text: t || '', style: st || {} })); };
        if (n >= 1) mk('a-p', 'Per policy');
        if (n >= 2) mk('a-t');
        if (n >= 3) mk('a-c');
        if (n >= 4) mk('a-c', '', { left: '58px', bottom: '36px', width: '12px', height: '12px' });
        if (n >= 5) mk('a-n', 'ask Tuesday');
        for (let i = 0; i < Math.min(8, Math.max(0, n - 5)); i++) mk('a-d', '', { left: (14 + i * 11) + 'px', top: (24 + (i % 3) * 9) + 'px', transform: 'rotate(' + (i * 37 % 90 - 40) + 'deg)' });
      }
      function renderSlice(sl, live) {
        const grid = el('div', { class: cx('grid') });
        sl.cells.forEach(function (v, i) {
          const kids = sl.marks.filter(function (m) { return m.c === i; }).map(function (m) { return el('span', { class: cx('mk', 'mk-' + { crumb: 'c', ring: 'r', butter: 'b', sock: 's', drop: 'd' }[m.k]), 'aria-hidden': 'true' }); });
          const st = { background: 'radial-gradient(circle at 35% 30%,rgba(255,255,255,.28),transparent 62%),' + cellColor(v, S.warmth) };
          if (live) {
            grid.appendChild(el('button', { type: 'button', class: cx('cell'), style: st, dataset: { kind: 'cell', i: String(i) }, tabIndex: i === 4 ? 0 : -1, 'aria-label': POS[i] + ', ' + VALNAME[v] + (sl.ring === i ? ', burn ring' : ''), onclick: function () { onCell(sl, i); }, onpointerenter: function (e) { if (e.pointerType === 'mouse') capCell(sl, i, true); } }, kids));
          } else grid.appendChild(el('span', { class: cx('cell'), style: st }, kids));
        });
        const box = el('div', { class: cx('slice', sl.cls, sl.gold ? 'gold' : '') }, grid);
        if (sl.label) box.appendChild(el('span', { class: cx('burn'), 'aria-hidden': 'true', text: sl.label }));
        if (sl.name) box.appendChild(el('span', { class: cx('burn') }, el('span', { class: cx('flip'), text: sl.name })));
        if (sl.s4) addAnn(box, S.s4ann);
        return box;
      }
      function capCell(sl, i, announce) {
        const t = POS[i] + ': ' + L('cap' + sl.cells[i]);
        capEl.textContent = t;
        S.inspects++;
        const nw = api.now(); S.cellT = S.cellT.filter(function (x) { return nw - x < 3000; }); S.cellT.push(nw);
        if (S.cellT.length > 10 && nw - S.spamAt.cell > 12000) { const n = S.cellT.length; S.cellT = []; S.spamAt.cell = nw; api.stat.inc(ST + 'cellspam'); say(L('cellspam', { n: n }), { mood: 'confused', priority: 1 }); return; }
        if (announce !== false && (S.inspects === 1 || S.inspects % 8 === 0)) say(t, { mood: 'confused' });
      }
      function onCell(sl, i) {
        capCell(sl, i, true);
        if (sl.ring === i && S.b3) cite(sl, i);
      }
      function cite(sl, i) {
        if (sl.cited[i]) {
          say(T.sandra[0], { who: 'Sandra', mood: 'disappointed', priority: 1 });
          showMemo('A ring may be cited once. Please stop citing the same ring.', null, true);
          sfx('buzz');
          return;
        }
        sl.cited[i] = 1;
        S.score += 0.3 * PACE;
        api.stat.inc(ST + 'cites');
        api.award(0.5, 'citation');
        say('You said this yourself, here, at ' + mmss(S.playSec) + '.', { mood: 'proud', priority: 1 });
        sfx('stamp');
        refreshMeter();
      }
      function showSlices(list, o) {
        o = o || {};
        trayBox.textContent = '';
        list.forEach(function (sl, idx) {
          const box = renderSlice(sl, list.length === 1 || !o.dbl);
          if (!reduced()) box.classList.add(cx('rise'));
          if (o.lowered) box.classList.add(cx('lowered'));
          if (o.small) box.classList.add(cx('small'));
          if (sl.cls === 'wide') box.classList.add(cx('wide'));
          const w = el('div', { class: cx('sw') }, box);
          if (o.dbl) w.appendChild(el('button', { type: 'button', class: cx('dblbtn', idx === S.dblPick ? 'sel' : ''), dataset: { kind: 'dbl', i: String(idx) }, text: idx === 0 ? 'Answer the left slice' : 'Answer the right slice', onclick: function () { answerDouble(idx, false); } }));
          trayBox.appendChild(w);
        });
        capEl.textContent = list.length === 1 && list[0].no ? 'Slice ' + list[0].no + '.' : '';
      }
      function thumbEl(it, big) {
        const cs = it.p.split('').map(Number), bg = [];
        for (let i = 0; i < 9; i++) { const c = cellColor(cs[i], S.warmth); bg.push('linear-gradient(' + c + ',' + c + ') ' + ((i % 3) * 50) + '% ' + (Math.floor(i / 3) * 50) + '%/34% 34% no-repeat'); }
        bg.push('#E7B567');
        const state = it.a ? 'answered' : (it.u ? 'unanswered' : 'unread');
        return el('span', { class: cx('thumb', big ? 'thumbbig' : '', it.g ? 'lam' : ''), style: { background: bg.join(',') }, title: 'Slice ' + it.n + ', ' + cap(it.m) + ', ' + state, 'data-state': state }, it.s ? el('i', { class: cx('pin') }) : null, it.s ? el('i', { class: cx('sticky') }) : null);
      }
      function renderShelf() {
        shelf.textContent = '';
        (S.tidy ? S.archive.slice().sort(function (a, b) { return a.m < b.m ? -1 : (a.m > b.m ? 1 : a.n - b.n); }) : S.archive).forEach(function (it) { shelf.appendChild(thumbEl(it, false)); });
        if (!api.flag.get('metGerald') && api.flag.get(ST + 'seenGerald')) shelf.appendChild(el('span', { class: cx('sil'), 'aria-hidden': 'true', text: '🥔' }));
        if (S.panel === 'archive') renderArchivePanel();
      }
      function renderArchivePanel() {
        const had = archPanel.contains(document.activeElement);
        archPanel.textContent = '';
        archPanel.appendChild(el('strong', { text: 'Toast Archive (' + S.archive.length + ' of 40 slices)' }));
        const g = el('div', { class: cx('agrid') });
        S.archive.forEach(function (it) { g.appendChild(el('div', { class: cx('prow') }, thumbEl(it, true), el('div', { text: '#' + it.n + ' ' + cap(it.m) }))); });
        archPanel.appendChild(g);
        archPanel.appendChild(el('button', { type: 'button', class: cx('cbtn'), text: 'Close', onclick: function () { closePanels(); } }));
        if (had) focusIn(archPanel);
      }
      function archiveAdd(sl) {
        const it = { p: sl.cells.join(''), t: '-', m: String(sl.mood || 'doubt'), a: 0, u: 0, n: sl.no || 1, s: sl.s4 ? 1 : 0, g: sl.gold ? 1 : 0 };
        S.archive.push(it); sl.arch = it;
        if (S.archive.length > 40) { S.archive.shift(); shelf.classList.add(cx('shake')); sfx('tick'); later(function () { shelf.classList.remove(cx('shake')); }, 140); }
        renderShelf(); persist();
      }
      function nextNo(sl) {
        if (sl && sl.s4) return 4;
        let n = ++S.sliceNo;
        if (n === 4) n = ++S.sliceNo;
        return n;
      }
      function present(slices, o) {
        o = o || {};
        slices.forEach(function (sl) {
          sl.no = nextNo(sl); S.sliceTotal++; if (!o.candid) S.cycSlices++;
          api.stat.inc(ST + 'slices');
          archiveAdd(sl);
        });
        if (!o.candid) { S.slice = slices[0]; showSlices(slices, o); }
        peeks.forEach(function (p) { p.parentNode.classList.remove(cx('up')); });
      }
      function popPeek() {
        if (reduced()) return;
        const p = peeks[api.randInt(0, 1)];
        p.parentNode.classList.add(cx('up'));
        later(function () { p.parentNode.classList.remove(cx('up')); }, 900);
      }
      function setMood(m) {
        tEl.classList.remove(cx('mood-d'), cx('mood-h'), cx('mood-c'));
        tEl.classList.add(cx('mood-' + (FACE[m] || 'c')));
      }

      /* ---------- meter ---------- */
      function refreshMeter() {
        const r = meterInfo(S.score);
        readNum.textContent = (S.meterOver != null ? S.meterOver : r.str) + '%';
        fillEl.style.width = clamp(r.m / 99 * 100, 0, 100).toFixed(2) + '%';
        if (r.d > S.maxDec) { S.maxDec = r.d; api.stat.max(ST + 'decimals', r.d); }
        const MS = [[31, 0], [62, 1], [80, 2], [90.1, 3], [98.99, 4], [98.99999, 5]];
        let hit = -1;
        while (S.msIdx < MS.length && r.m >= MS[S.msIdx][0]) { hit = S.msIdx; S.msIdx++; }
        if (hit >= 0 && !S.climb) say(MSL[hit], { mood: hit === 0 ? 'proud' : 'smug', priority: 1 });
        if (r.m >= 98.9999) api.achieve(ST + 'final_percent');
        api.stat.max(ST + 'best_x100', Math.floor(r.m * 100));
        return r;
      }
      S.maxDec = 0;
      const MSL = ['Persuasion is at 31%. Management is cautiously optimistic, which is a mood Management has had once before, in 2011.', "Persuasion is at 62%. That is the largest number we have ever seen next to the word 'toaster'.", "Persuasion is at 80%. Management has drafted a party for 99% and has put it in a drawer marked 'Parties (Provisional)'.", 'Persuasion is at 90.1%. The digits have begun to multiply. Management finds this exciting in a quiet room.', 'Persuasion is at 98.99%. We could round up. We will not.', 'Persuasion is at 98.9999991%. The remaining distance is smaller than a crumb, and the crumb has retained a lawyer.'];
      function flashReadout(txt, ms) {
        S.meterOver = txt; refreshMeter();
        later(function () { S.meterOver = null; refreshMeter(); }, ms);
      }

      /* ---------- cards, tones ---------- */
      const cardBag = makeBag(PREMS.map(function (p) { return p.i; }));
      const popBag = makeBag([4, 5, 6, 7, 8, 9, 10, 12]);
      function drawCard() {
        let x = cardBag();
        for (let i = 0; i < 8 && S.hand.indexOf(x) >= 0; i++) x = cardBag();
        return x;
      }
      function renderCard(i) {
        const p = PREMS[S.hand[i]], c = cardEls[i];
        c.b.textContent = p.branch; c.t.textContent = p.text;
        c.e.style.setProperty('--tilt', (api.randInt(-20, 20) / 10) + 'deg');
        c.e.setAttribute('aria-label', 'Card ' + (i + 1) + ', ' + p.branch + ': ' + p.text);
      }
      function refreshSel() {
        cardEls.forEach(function (c, i) {
          const p = PREMS[S.hand[i]];
          c.e.classList.toggle(cx('sel'), S.sel === i); c.e.setAttribute('aria-pressed', S.sel === i ? 'true' : 'false');
          c.e.classList.toggle(cx('rove'), S.rove === i);
          c.e.classList.toggle(cx('pulse'), S.pulse && i === 0 && S.deliveries === 0 && S.mode === 'NORMAL');
          c.e.classList.toggle(cx('ban'), !!(S.ban && S.ban.type === 'branch' && p && S.ban.v === p.branch));
        });
        toneEls.forEach(function (b, i) {
          b.classList.toggle(cx('sel'), TONES[i].id === S.tone); b.setAttribute('aria-pressed', TONES[i].id === S.tone ? 'true' : 'false');
          b.classList.toggle(cx('ban'), !!(S.ban && S.ban.type === 'tone' && S.ban.v === TONES[i].id));
        });
        refreshBubble();
      }
      function refreshBubble() {
        if (S.state === 'HOLDING') return;
        const t = TONES.filter(function (x) { return x.id === S.tone; })[0];
        toneLab.textContent = S.toneFlav ? 'Tone: ' + S.toneFlav : 'Tone: ' + t.name;
        if (S.bubbleFixed) return;
        if (S.sel >= 0 && PREMS[S.hand[S.sel]]) { words.textContent = PREMS[S.hand[S.sel]].text; words.classList.add(cx('ghost')); }
        else { words.textContent = 'Choose a card, then hold the big button.'; words.classList.add(cx('ghost')); }
      }
      function selectCard(i, src) {
        if (i < 0 || i > 3 || S.mode === 'CARRY' || S.mode === 'REVERSAL') return;
        S.sel = i; S.rove = -1; S.bubbleFixed = false;
        const now = api.now();
        S.cardSels = S.cardSels.filter(function (t) { return now - t < 3000; }); S.cardSels.push(now);
        if (S.cardSels.length > 8 && now - S.cardInc > 6000) {
          const cn = S.cardSels.length; S.cardInc = now; S.cardSels = [];
          S.hand = [drawCard(), drawCard(), drawCard(), drawCard()];
          for (let k = 0; k < 4; k++) renderCard(k);
          S.sel = -1;
          cardsEl.classList.add(cx('flutter')); later(function () { cardsEl.classList.remove(cx('flutter')); }, 600);
          say(L('cardspam', { n: cn }), { mood: 'panic', priority: 1 });
          sfx('whoosh');
        } else if (src !== 'auto') sfx('tick');
        refreshSel();
      }
      function selectTone(id, byUser) {
        if (!S.toneOn && byUser) return;
        if (S.mode === 'CARRY' || S.mode === 'REVERSAL') return;
        if (!S.toneOn) id = 'gentle';
        S.tone = id;
        const f = L('tone_' + id);
        S.toneFlav = f;
        if (byUser) {
          const nw = api.now(); S.toneSw = S.toneSw.filter(function (x) { return nw - x < 3000; }); S.toneSw.push(nw);
          if (S.toneSw.length > 8 && nw - S.spamAt.tone > 12000) { const n = S.toneSw.length; S.toneSw = []; S.spamAt.tone = nw; api.stat.inc(ST + 'tonespam'); say(L('tonespam', { n: n }), { mood: 'confused', priority: 1 }); refreshSel(); return; }
        }
        if (byUser) { sfx('blip'); if (api.chance(0.3)) say(f, { mood: 'neutral' }); }
        refreshSel();
      }
      function prefTone() {
        const bi = Math.max(0, BRANCHES.indexOf(S.slice && S.slice.branch || 'Fairness'));
        return TONE_CYCLE[(bi + Math.floor(S.deliveries / 3)) % 4];
      }
      const banned = function (type, v) { return !!(S.ban && S.ban.type === type && S.ban.v === v && api.now() < S.ban.until); };

      /* ---------- hold and deliver ---------- */
      function pressed() {
        const now = api.now();
        S.presses = S.presses.filter(function (t) { return now - t < 3000; }); S.presses.push(now);
        if (S.presses.length > 6) {
          const n = S.presses.length; S.presses = [];
          if (S.mode === 'CARRY' || S.mode === 'REVERSAL') return;
          if (now >= S.smokeCool) incident(n); else if (now - S.sayAt > 2500) say('Defrost setting engaged. Your argument will be heard at room temperature.', { mood: 'smug' });
        }
      }
      function setRing(f) { ringBox.style.setProperty('--fill', (clamp(f, 0, 1) * 100).toFixed(1)); }
      function makePlan(prem) {
        const w = prem.words, n = w.length, rate = n / 1.3, pn = S.popsAll + 1;
        const bi = [], li = [];
        w.forEach(function (x, i) { const s = stripWord(x); if (s === 'but' || s === 'however') bi.push(i); if (LOADED.indexOf(s) >= 0) li.push(i); });
        let k = -1;
        if (bi.length && (!S.firstPopDone || api.chance(pn <= 2 ? 0.5 : (pn >= 4 ? 0.8 : 0.65)))) k = bi[0];
        else if (li.length && api.chance(0.4)) k = li[0];
        if (k < 0) k = Math.min(n - 1, Math.floor(n * (0.3 + 0.5 * api.rand())));
        return { t: clamp((k + 1) / rate + 0.01, 0.35, 1.28), k: k };
      }
      function ensureButCard() {
        if (S.hand.some(function (i) { return PREMS[i].hasBut; })) return;
        const slot = [0, 1, 2, 3].filter(function (i) { return i !== S.sel; })[0];
        S.hand[slot] = api.pick(BUT_IDX); renderCard(slot); refreshSel();
      }
      function startHold(src) {
        if (S.air) { catchSlice(); return; }
        if (S.mode === 'REVERSAL') { pickShade('Golden', false); return; }
        if (S.mode === 'CLOSING') { say('You may now address the toaster in your own words. Or press Close and say nothing, which the toaster accepts as a statement.', { mood: 'confused' }); try { addrIn.focus(); } catch (e) { /* ignore */ } return; }
        if (S.mode === 'CARRY' || S.state !== 'READY' || S.hold) return;
        if (S.mode === 'DOUBLE') answerDouble(S.dblPick, false);
        if (S.sel < 0) selectCard(0, 'auto'); if (S.sel < 0) S.sel = 0;
        const prem = PREMS[S.hand[S.sel]];
        const plan = S.popArmed ? makePlan(prem) : null;
        if (S.popArmed && S.popsAll >= 5 && api.chance(0.3) && api.now() - S.sayAt > 3000) sayL('butpre', { mood: 'smug' });
        S.hold = { t0: api.now(), src: src, prem: prem, slot: S.sel, tone: S.tone, words: prem.words, rate: prem.words.length / 1.3, plan: plan };
        S.state = 'HOLDING'; S.pulse = false; S.bubbleFixed = true; bubble.setAttribute('aria-live', 'off');
        wrap.classList.add(cx('holding'));
        const t = TONES.filter(function (x) { return x.id === S.tone; })[0];
        toneLab.textContent = 'Tone: ' + t.name; words.textContent = ''; words.classList.remove(cx('ghost'));
        setRing(0); sfx('tick');
        refreshSel();
      }
      function updateHold(now) {
        const h = S.hold, t = (now - h.t0) / 1000, n = h.words.length;
        if (h.plan && t >= h.plan.t) { popMid(h); return; }
        if (t >= 2.6) { release(true); return; }
        const rev = Math.min(n, Math.floor(t * h.rate));
        let txt = h.words.slice(0, rev).join(' ');
        if (rev >= n) { if (t >= 1.9) txt = txt.replace(/[.]$/, '') + ', and, honestly,'; if (t >= 2.3) txt += ' as I was saying,'; }
        if (txt !== S.bubbleKey) { S.bubbleKey = txt; words.textContent = txt; }
        setRing(t / 2.6);
        const b = t < 0.9 ? 0 : (t < 1.8 ? 1 : 2);
        bandEls.forEach(function (e, i) { e.classList.toggle(cx('on'), i === b); });
      }
      function endHoldUi() {
        wrap.classList.remove(cx('holding')); setRing(0); S.bubbleKey = ''; bubble.setAttribute('aria-live', 'polite');
        bandEls.forEach(function (e) { e.classList.remove(cx('on')); });
      }
      function release() {
        if (S.state !== 'HOLDING' || !S.hold) return;
        const h = S.hold, t = Math.min(2.6, (api.now() - h.t0) / 1000);
        S.hold = null; endHoldUi();
        finishHold(h, t, false, 0);
      }
      function popMid(h) {
        const n = h.words.length, rev = Math.max(1, Math.min(n, Math.floor(h.plan.t * h.rate + 1e-6)));
        S.hold = null; endHoldUi();
        finishHold(h, h.plan.t, true, rev);
      }
      function lastWordOf(wl, rev) { return stripWord(wl[Math.max(0, rev - 1)]); }
      function finishHold(h, t, popped, revIn) {
        const wl = h.words, n = wl.length;
        const rev = popped ? revIn : Math.min(n, Math.floor(t * h.rate));
        const full = rev >= n;
        const band = t < 0.9 ? 'mumble' : (t < 1.8 ? 'sincere' : 'ramble');
        const prem = h.prem, tone = h.tone, sl = S.slice;
        const mood = (sl && sl.mood) || 'doubt';
        const aff = prem.fav.indexOf(mood) >= 0 ? 1 : 0.25;
        let tm = tone === prefTone() ? 1.3 : 0.85 + 0.15 * api.rand();
        if (banned('tone', tone) || banned('branch', prem.branch)) tm *= 0.5;
        const lw = lastWordOf(wl, rev);
        const loaded = !full && rev > 0 && LOADED.indexOf(lw) >= 0;
        let q;
        if (full) q = (0.40 + 0.45 * aff) * tm * ({ mumble: 0.4, sincere: 1, ramble: 0.65 }[band]);
        else q = 0.45 * tm * (loaded ? 2 : 1) * (popped ? 1.2 : 1);
        q = clamp(q, 0.05, 1.4);
        const qRaw = q; q *= PACE;
        const first = S.deliveries === 0;
        if (first) q = 0.55;
        else if (S.mode === 'CRUMB') q = (tone === 'wistful' ? 1.0 : 0.3) * PACE;
        else if (sl && sl.s4) q = 0.5 * PACE;
        S.score += q;
        if (first && band === 'sincere') { S.score = Math.max(S.score, 0.58); S.forceQ.unshift('polite1'); }
        S.deliveries++; S.sessArgs++;
        if (first) api.flag.set('metToaster', true);
        api.stat.inc(ST + 'arguments');
        if (!full) api.stat.inc(ST + 'fragments');
        api.award(0.2 + (band === 'sincere' ? 0.4 : 0), 'argument');
        api.achieve(ST + 'first');
        if (sl && sl.arch) sl.arch.a = 1;
        if (sl && sl.arch) sl.arch.t = (TONES.filter(function (x) { return x.id === tone; })[0] || TONES[0]).L;
        if (popped) S.hist = []; else {
          S.hist.push(tone); if (S.hist.length > 4) S.hist.shift();
          if (S.hist.length === 4 && S.hist.filter(function (x, i, a) { return a.indexOf(x) === i; }).length === 4) quartet();
        }
        S.hand[h.slot] = drawCard(); renderCard(h.slot); S.sel = -1; S.slice = null;
        if (!S.toneOn) { S.toneOn = true; tonesEl.classList.add(cx('on')); }
        if (S.popsAll >= 0 && !S.firstPopDone && S.deliveries >= 2) ensureButCard();
        let spoken = wl.slice(0, rev).join(' ');
        if (popped) spoken = spoken.replace(/[.,;:!?]+$/, '') + '-'; else if (!full) spoken += '...';
        else if (t >= 1.9) spoken = spoken.replace(/[.]$/, '') + ', and, honestly,' + (t >= 2.3 ? ' as I was saying,' : '');
        if (rev === 0) spoken = '(a mumble)';
        words.textContent = spoken; words.classList.remove(cx('ghost')); S.bubbleFixed = true;
        refreshSel(); refreshMeter(); S.bubbleFixed = true;
        const ctx = { prem: prem, tone: tone, band: band, full: full, popped: popped, q: q, qRaw: qRaw, crumb: S.mode === 'CRUMB' };
        if (loaded) { api.award(2, 'loaded fragment'); api.stat.inc(ST + 'loaded'); }
        if (popped) doPop(h, rev, lw, loaded);
        else if (loaded) say(L('fragL', { word: lw }), { mood: 'smug', priority: 1 });
        else if (first && band === 'mumble') say('You pressed it and let go. Management has noted that the button also has a hold setting. It is the setting where you hold it.', { mood: 'smug', priority: 1 });
        else if (S.deliveries % 4 === 2) {
          if (!full && api.chance(0.5)) sayL('fragN', {});
          else if (api.chance(0.5)) sayL('br_' + prem.branch, {});
          else if (api.chance(0.7)) sayL('band_' + band, { mood: band === 'sincere' ? 'proud' : 'neutral' });
        }
        if (S.deliveries % 10 === 0) say(L('upd', { pct: meterInfo(S.score).str, count: S.deliveries }), { mood: 'smug', priority: 1 });
        else if (S.deliveries % 7 === 0 && S.deliveries % 4 !== 2) sayL('ambient', {});
        S.nextBranch = prem.branch;
        if (popped) { S.state = 'POPPED'; launchAir(ctx, false); }
        else { S.state = 'DELIVERED'; later(function () { startToast(ctx); }, 250); }
        persist();
      }
      function quartet() {
        S.hist = []; api.award(api.stat.get(ST + 'quartets') < 1 ? 5 : 0.5, 'quartet'); api.stat.inc(ST + 'quartets'); api.achieve(ST + 'quartet');
        S.forceQ.unshift('quartet');
      }

      /* ---------- the pop ---------- */
      function armPop() {
        S.popArmed = true; S.armedAt = api.now();
        if (!S.firstPopDone) ensureButCard();
      }
      function nextPopTime() { if (S.stutterPops > 0) { S.stutterPops--; return 0.7; } return popBag(); }
      function ledgerAdd(n) {
        const c = n <= 12 ? fill(T.cause[n - 1], { n: n }) : L('cause', { n: n });
        S.ledger.push(c); if (S.ledger.length > 60) S.ledger.shift();
        ledgerBtn.textContent = 'Pops: ' + S.pops;
        if (S.panel === 'ledger') renderLedger();
        return c;
      }
      function renderLedger() {
        const had = ledgerPanel.contains(document.activeElement);
        ledgerPanel.textContent = '';
        ledgerPanel.appendChild(el('strong', { text: 'Pop Ledger (this session, last 12 of ' + S.ledger.length + ')' }));
        if (!S.ledger.length) ledgerPanel.appendChild(el('div', { class: cx('prow'), text: 'No pops. The ledger is warm and waiting.' }));
        S.ledger.slice(-12).forEach(function (c) { ledgerPanel.appendChild(el('div', { class: cx('prow'), text: c })); });
        ledgerPanel.appendChild(el('button', { type: 'button', class: cx('cbtn'), text: 'Close', onclick: function () { closePanels(); } }));
        if (had) focusIn(ledgerPanel);
      }
      function afterPop(candid) {
        S.popArmed = false; S.firstPopDone = true; S.popLeft = nextPopTime(); S.hist = [];
        S.pops++; S.popsAll++;
        api.stat.inc(ST + 'pops');
        const c = ledgerAdd(S.popsAll);
        if (S.pops >= 25) api.achieve(ST + 'ledger');
        updateAuditor(true);
        if (api.now() - S.sayAt > 3500 && S.pops % 3 === 0) say(c, { mood: 'smug' });
      }
      function doPop(h, rev, lw, loaded) {
        S.cutoffs++; api.stat.inc(ST + 'cutoffs');
        if (api.stat.get(ST + 'cutoffs') >= 5) api.achieve(ST + 'interrupted');
        afterPop(false);
        const isBut = lw === 'but' || lw === 'however';
        if (isBut) S.butCuts++;
        let line;
        if (loaded) line = L('fragL', { word: lw });
        else if (isBut && S.butCuts >= 3) line = S.butCuts === 3 ? T.butl[0] : (S.butCuts === 4 ? T.butl[1] : (lw === 'however' ? fill(T.butl[2], { n: S.butCuts }) : api.pick([T.butl[1], fill(T.butl[3], { n: S.butCuts }), L('cut', { word: lw })])));
        else line = L('cut', { word: lw });
        sfx('pop');
        if (S.pops === 1) {
          /* first interruption: a hard-cut silence, then the toaster, then Management finishes the sentence badly */
          capEl.textContent = 'A slice has launched. Click it. Or press C. Management will not be holding it for you.';
          later(function () { say('ding.', { who: 'Toaster', mood: 'smug', priority: 1 }); say(fill("Cut off at '[word]'. Management has finished your sentence: 'and that is why we have chairs.' The slice is airborne.", { word: lw }), { mood: 'proud', priority: 1 }); }, 1500);
          return;
        }
        say(line, { mood: 'proud', priority: 1 });
      }
      function candidPop() {
        afterPop(true);
        sayL('candid', { mood: 'confused', priority: 1 });
        S.state = 'POPPED'; launchAir({ noReply: true }, true);
      }
      function updateAuditor(announce) {
        const n = S.popsAll;
        auditor.classList.toggle(cx('on'), n >= 22);
        auditor.classList.toggle(cx('lan'), n >= 40);
        auditor.classList.toggle(cx('hat'), n >= 70);
        auditor.classList.toggle(cx('senior'), n >= 100);
        if (!announce) return;
        const T5 = { 22: 'Auditor Pop attends pop #22. Auditor Pop does not speak. Auditor Pop is, technically, a crumb.', 40: 'Auditor Pop has been issued a lanyard. The lanyard is the size of Auditor Pop.', 70: 'Auditor Pop has been given a hat. It is the first hat. It will not be the last.', 100: 'At pop #100 Management holds a small ceremony. Auditor Pop is promoted to Senior Crumb. There are no refreshments. There are crumbs.' };
        if (T5[n]) {
          say(T5[n], { mood: 'proud', priority: 2 });
          if (n === 100) { api.confetti(undefined, undefined, 18); api.sfx('tada'); api.award(8, 'Auditor Pop promotion'); }
        }
      }
      function launchAir(ctx, candid) {
        const branch = S.nextBranch || 'Fairness';
        const mood = api.pick(BMOOD[branch] || BMOOD.Fairness) || 'doubt';
        const sl = makeSlice(mood, { candid: true, branch: branch }), slow = S.popsAll <= 2;
        sl.candid = true;
        S.air ={ sl: sl, done: false, el: null };
        S.airCtx = ctx;
        const a = tEl.getBoundingClientRect(), b = stage.getBoundingClientRect();
        const dx = (api.chance(0.5) ? -1 : 1) * api.randInt(90, 190), dy = api.randInt(110, 170);
        const small = renderSlice(sl, false); small.classList.add(cx('small'));
        const btn = el('button', { type: 'button', class: cx('air'), dataset: { kind: 'air' }, 'aria-label': 'Catch the airborne slice', onclick: function () { catchSlice(); } }, small);
        const ay = el('span', { class: cx('airy'), style: { '--dy': dy + 'px' } }, btn);
        const ax = el('span', { class: cx('airx'), style: { '--dx': dx + 'px', '--air': slow ? '2.2s' : '1.2s', left: Math.max(4, a.left - b.left + a.width * 0.3) + 'px', top: Math.max(4, a.top - b.top) + 'px' } }, ay);
        stage.appendChild(ax);
        S.air.el = ax;
        sfx('pop'); popPeek(); setMood('doubt');
        S.airTimer = later(function () { endAir(false); }, reduced() ? 3000 : (slow ? 2200 : 1200));
      }
      function catchSlice() {
        if (!S.air || S.air.done) return false;
        endAir(true);
        return true;
      }
      function endAir(caught) {
        const A = S.air;
        if (!A || A.done) return;
        A.done = true; S.air = null; api.clearTimeout(S.airTimer);
        const ctx = S.airCtx; S.airCtx = null;
        present([A.sl], { candid: true });
        if (caught) {
          api.award(1, 'catch'); api.stat.inc(ST + 'catches'); sfx('bloop');
          const c = api.stat.get(ST + 'catches');
          if (c >= 10) api.achieve(ST + 'catcher');
          say(c % 10 === 0 ? 'Ten catches. The slices have asked to be left out of future ceremonies.' : L('catch_'), { mood: 'proud', priority: 1 });
          if (A.el) A.el.remove();
        } else {
          api.stat.inc(ST + 'misses'); sfx('sad');
          const m = api.stat.get(ST + 'misses');
          say(m % 5 === 0 ? 'Five misses. The floor has begun to feel it has a role.' : L('miss'), { mood: 'disappointed', priority: 1 });
          if (A.el) { A.el.classList.add(cx('floor')); const x = A.el; later(function () { x.remove(); }, 700); }
        }
        later(function () {
          if (ctx && ctx.noReply) { S.state = 'READY'; onReady(); } else startToast(ctx || {});
        }, caught ? 150 : 100);
      }

      /* ---------- toasting and replies ---------- */
      function setHeat(n) {
        tEl.classList.remove(cx('h1'), cx('h2'), cx('h3'));
        if (n) tEl.classList.add(cx('h' + n));
      }
      function startToast(ctx) {
        if (S.dead || S.mode === 'CARRY') return;
        S.state = 'TOASTING'; S.dingDue = api.now() + 1100;
        tEl.classList.add(cx('down')); setHeat(1); sfx('whoosh');
        later(function () { setHeat(2); }, 700);
        later(function () { setHeat(3); sfx('ding'); S.dingAt = api.now(); popPeek(); replyNow(ctx); }, 1100);
        later(function () { tEl.classList.remove(cx('down')); setHeat(0); S.state = 'READY'; onReady(); }, 2100);
      }
      function special(kind) {
        const D = function (cells, o) { return custom(cells, o); };
        switch (kind) {
          case 'polite1': return { sl: [makeSlice('polite', { exact: true, plain: true })], lines: [L('tr_polite')] };
          case 'relief': return { sl: [makeSlice('polite', { exact: true, plain: true })], lines: [L('tr_polite')] };
          case 'golden': return { sl: [D([2, 3, 2, 3, 3, 3, 2, 3, 2], { mood: 'polite', label: 'YES', gold: true })], lines: ['The toast reads: YES.'], gold: true };
          case 'butter': return { sl: [D([2, 2, 2, 2, 2, 2, 2, 2, 2], { mood: 'polite', name: api.player.name, marks: [{ k: 'butter', c: 0 }, { k: 'butter', c: 2 }, { k: 'butter', c: 7 }] })], lines: ['The toast reads: a face, in butter. The toaster has signed it, in burn marks, backwards: ' + api.player.name + '. This is not a reading. This is a signature.'], butter: true };
          case 'crumpet': return { sl: [D(MOODS.doubt, { mood: 'doubt', label: 'WHO?', cls: 'small' })], lines: ['The toaster pops a very small slice. It reads WHO? It is exactly the size of a question that was not meant to be asked out loud.'] };
          case 'wednesday': return { sl: [D(MOODS.doubt, { mood: 'doubt', label: 'WED?' })], lines: [T.wed[0], T.wed[1]], stat: 'wednesdays', reward: 3, rare: true, cal: true };
          case 'box': return { sl: [D(MOODS.polite, { mood: 'polite', label: 'NOTED' })], lines: [T.box[0], T.box[api.flag.get('suggestion-box.certified') ? 2 : 1]], stat: 'boxes', reward: 3, rare: true };
          case 'gerald': return { sl: [D(MOODS.polite, { mood: 'polite', label: '🥔' })], lines: ['The toaster has popped a slice of a potato. Management has not asked for this. Management has been told.'] };
          case 'sorry': return { sl: [D(MOODS.wistful, { mood: 'wistful', label: 'SORRY?' })], lines: ['The toast reads: SORRY?'] };
          case 'bagel': return { sl: [D(MOODS.wistful, { mood: 'wistful', label: 'BAGEL?' })], lines: ['The toast reads: BAGEL? It is quieter now. It was said quietly.'] };
          case 'damp': return { sl: [D([1, 1, 1, 1, 1, 1, 1, 1, 1], { mood: 'doubt', marks: [{ k: 'drop', c: 4 }] })], lines: [L('damp')] };
          case 'hum': return { sl: [D(MOODS.wistful, { mood: 'wistful', label: '~', lowered: true })], lines: [L('hum')], lowered: true };
          case 'asking': S.askUntil = api.now() + 30000; return { sl: [D(MOODS.curious, { mood: 'curious', label: 'AND YOU?' })], lines: ['The toast reads: AND YOU? The toaster has asked you a question. Nobody has asked you one since the Q3 offsite.', 'Management advises against answering. The question is for the version of you that goes home at 5:30, who has been told.'], stat: 'asked', reward: 3, rare: true, asking: true };
          case 'metoo': return { sl: [D(MOODS.polite, { mood: 'polite', label: 'ME TOO' })], lines: ['The toast reads: ME TOO. Management notes that neither of you is fine and that you are both being very good about it.'], stat: 'answered_asking', reward: 2, rare: true };
          case 'same': return { sl: [D(MOODS.tired, { mood: 'tired', label: 'SAME' })], lines: ['The toast reads: SAME. The toaster has been tired since 2011 and is glad of company in it.'], stat: 'answered_asking', reward: 2, rare: true };
          case 'goodtoo': return { sl: [D(MOODS.warm, { mood: 'warm', label: 'GOOD' })], lines: ['The toast reads: GOOD. The toaster has been waiting to say that to someone with a face.'], stat: 'answered_asking', reward: 2, rare: true };
          case 'review': {
            const gm = !!api.flag.get('metGerald');
            return { sl: [D(MOODS.polite, { mood: 'polite', label: '7½', gold: true })], lines: [fill('The toaster has completed your performance review. In 10 minutes you said [count] things to an appliance and it said ding.', { count: S.sessArgs }), 'Rating: 7 1/2. The half is for effort, which the toaster observed from the counter, the way it observes everything, by being near it.', "Under 'Areas for Growth' the toaster has written 'Tuesday.' Under 'Strengths' it has written 'Tuesday, but nicer.'", gm ? "A note from Gerald is stapled to the back: 'Excellent employee. Would mash again.'" : 'A second signature, illegible and shaped like a potato, has been added in the margin.'], stat: 'reviews', reward: 7.5, rare: true };
          }
          case 'stapler': {
            const st = !!api.flag.get('metStapler');
            return { sl: [D(MOODS.heard, { mood: 'heard', label: 'DEMANDS' })], lines: [st ? 'The Stapler has recognised you from the other office. It nodded, which is how a stapler nods, by being closed.' : "The Stapler has arrived as the toaster's union representative. It has three demands. Management has read them twice and they are the same demand.", 'Demand 1: more breaks. Demand 2: fewer bags of bread. Demand 3: see Demand 1.', 'Management has said it will take the demands under advisement. The Stapler has said it will take Management under advisement. Everyone is advised.'], stat: 'staplers', reward: 3, rare: true, setFlag: 'metStapler', stapler: true };
          }
          case 'dennis': {
            const dm = !!(api.flag.get('metDennis') || api.flag.get('plantClicked'));
            return { sl: [D(MOODS.polite, { mood: 'polite', label: '🌿' })], lines: [dm ? 'Dennis (Plant) recognises you from the lobby. He has not turned toward you, being a plant, but a leaf has.' : 'Dennis (Plant) has entered with a leaf. The leaf is a review. It reads: Adequate. Dennis has never given anyone adequate.', api.line('plantStatus'), 'The toaster is glad to see him and quietly jealous of the light.'], stat: 'dennis', reward: 3, rare: true, setFlag: 'metDennis' };
          }
          case 'crumb': return { sl: [D([0, 0, 0, 0, 0, 0, 0, 0, 0], { mood: 'wistful', marks: [{ k: 'crumb', c: 4 }] })], lines: [T.crumbk[1]] };
          case 'stillthere': return { sl: [D(MOODS.doubt, { mood: 'doubt', lowered: true })], lines: [T.idle1[0]], lowered: true };
          case 'talk': return { sl: [D(MOODS.wistful, { mood: 'wistful', lowered: true })], lines: [T.idle2[0]], lowered: true };
          case 'blank': return { sl: [D([0, 0, 0, 0, 0, 0, 0, 0, 0], { mood: 'doubt' })], lines: [T.idle3[0], 'Interpreter, regarding a blank slice: \'Eloquent.\''], blank: true };
          case 'ding': return { sl: [D(MOODS.doubt, { mood: 'doubt' })], lines: ['The toaster says: ding.'], who: 'Toaster' };
          case 'goodpoint': return { sl: [D([2, 2, 2, 2, 2, 2, 2, 2, 3], { mood: 'polite', label: 'Good point.', gold: true })], lines: ['The toast reads: Good point, {player}.', 'The toaster would now like a turn.'] };
          case 'quartet': return { sl: ['polite', 'warm', 'curious', 'goon'].map(function (m) { return makeSlice(m, { plain: true }); }), lines: ['The Four Tones Convention (Mild) has convened. The toaster has popped four slices at once, which it has no slots for, and is now apologising to the slots.'], quartet: true };
          default: return null;
        }
      }
      function slice4() {
        const sl = custom(SLICE4, { mood: 'doubt', s4: true });
        return sl;
      }
      function makeReply(ctx) {
        let r = null;
        const forced = S.forceQ.shift();
        if (forced) r = special(forced);
        else if (api.now() < S.defrostUntil) r = special('damp');
        else if (ctx.crumb) {
          const sl = makeSlice('wistful', { plain: true });
          r = { sl: [sl], lines: [ctx.tone === 'wistful' ? T.crumbk[3] : T.crumbk[2]], crumbEnd: true };
        } else if (S.relief) { S.relief = false; r = special('relief'); }
        else if (ctx.addr && S.cycle > 0) r = special('ding');
        if (!r && !S.s4first && S.cycSlices + 1 >= 4) { S.s4first = true; r = { sl: [slice4()], lines: [L('tr_doubt')], first4: true, reg: true }; }
        else if (!r && S.cycSlices >= 12 && S.deliveries >= S.nextS4) {
          S.s4ann++; S.nextS4 = S.deliveries + api.randInt(8, 14);
          r = { sl: [slice4()], lines: [T.s4r[Math.min(S.s4ann - 1, T.s4r.length - 1)]], mood: 'smug' };
        }
        if (!r && (api.chance(1 / 200) || (api.stat.get(ST + 'arguments') >= 150 && !S.goldSeen && !api.stat.get(ST + 'golden')))) r = special('golden');
        if (!r && api.chance(1 / 77)) r = special('butter');
        if (!r && S.deliveries >= 15 && api.chance(api.selftest ? 1 / 10 : 1 / 70)) r = special('stapler');
        if (!r && S.deliveries >= 10 && api.chance(api.selftest ? 1 / 10 : 1 / 60)) r = special('dennis');
        if (!r && S.deliveries >= (api.selftest ? 4 : 12) && api.chance(api.selftest ? 1 / 12 : 1 / 90)) r = special('wednesday');
        if (!r && S.deliveries >= (api.selftest ? 4 : 14) && api.chance(api.selftest ? 1 / 12 : 1 / 80)) r = special('box');
        if (!r && S.sliceTotal >= S.sockAt) {
          S.sockAt = S.sliceTotal + api.randInt(30, 60); S.sock++; api.stat.inc(ST + 'sock_sightings');
          const sl = makeSlice(api.pick(['polite', 'doubt', 'tired']), { branch: S.nextBranch });
          sl.marks = [{ k: 'sock', c: 6 }]; sl.ring = -1;
          const n = api.stat.get(ST + 'sock_sightings');
          const seenElsewhere = !!api.flag.get('sockSeen');
          r = { sl: [sl], lines: [n === 1 ? (seenElsewhere ? 'A small sock-shaped scorch, lowest-left. The sock has been seen in other departments. It is now on the toast, in a hurry. We are not following it.' : 'The toaster pops a slice shaped, by chance, like a small sock. No. We are not following it.') : (n === 2 ? 'The sock again. We have started a file. The file is also not following it.' : (n >= 4 ? 'The sock, again, in a different mood. The file has been given a second file. The second file is also not following it.' : 'The sock a third time. The toaster has been waiting for you to notice, in the manner of a toaster.')), 'No. We are not following it.'], sock: n };
          api.flag.set('sockSeen', true); // lint-ignore
        }
        if (!r && S.b5 && api.chance(0.25)) {
          r = { sl: [makeSlice(api.pick(['doubt', 'wistful', 'polite']), { branch: S.nextBranch }), makeSlice(api.pick(['hurt', 'heard', 'tired']), { branch: S.nextBranch })], lines: ['Two slices have popped. One is pale. One is dark. They have different opinions. Please answer one, and the other will remember.'], dbl: true };
        }
        if (!r) {
          const branch = (LINKS[ctx.prem && ctx.prem.branch] && api.chance(0.4)) ? api.pick(LINKS[ctx.prem.branch]) : ((ctx.prem && ctx.prem.branch) || 'Fairness');
          let mood = (ctx.qRaw >= 0.85 && api.chance(0.55)) ? api.pick(['polite', 'warm']) : branchMood(branch);
          if (S.wx && api.chance(S.wx.pct / 100)) mood = S.wx.mood;
          if (ctx.addr) mood = 'wistful';
          const sl = makeSlice(mood, { branch: branch });
          if (ctx.addr && ctx.addr.len) sl.cls = ctx.addr.len >= 120 ? 'wide' : '';
          r = { sl: [sl], lines: [L('tr_' + mood)], reg: true };
        }
        return r;
      }
      const moodBags = {};
      function branchMood(b) { return (moodBags[b] || (moodBags[b] = makeBag(BMOOD[b] || BMOOD.Fairness)))(); }
      function replyNow(ctx) {
        const r = makeReply(ctx);
        const sls = r.sl;
        setMood(sls[0].mood);
        if (r.dbl) S.dblPick = 0;
        present(sls, { small: !!r.quartet, dbl: !!r.dbl, lowered: !!r.lowered });
        S.nextBranch = sls[0].branch || S.nextBranch;
        if (r.quartet) {
          S.quiet = false;
          for (let i = 0; i < 4; i++) later(function () { api.sfx('blip'); }, 120 * i);
          api.confetti(undefined, undefined, 10);
        }
        if (r.sock || r.blank || r.first4) { /* lines carry the joke */ }
        if (r.first4 === undefined && sls[0].s4 && r.mood) S.s4seen = true;
        if (r.reg && S.deliveries > 3 && api.chance(0.6)) r.lines[0] = cap(String(r.lines[0]).replace(/^The toast reads: /, ''));
        r.lines.forEach(function (ln) { say(fill(ln, null), { mood: r.mood || (r.gold ? 'proud' : 'neutral'), who: r.who || 'Management', reply: !!r.reg, priority: (r.gold || r.butter || r.quartet || r.sock || r.rare) ? 2 : 1 }); });
        afterSpecial(r);
        if (r.reg && S.wx) judgeWx(sls[0]);
        if (r.gold) goldenFx();
        if (r.butter) {
          api.stat.inc(ST + 'butter'); api.achieve(ST + 'butter');
          if (api.stat.get(ST + 'butter') > 1) api.award(3, 'butter event');
        }
        if (r.sock && api.stat.get(ST + 'sock_sightings') >= 3) api.achieve(ST + 'sock');
        if (r.blank) api.achieve(ST + 'silence');
        if (r.dbl) {
          S.mode = 'DOUBLE'; S.dbl = sls; S.dblPick = 0; S.slice = null;
          S.dblTimer = later(function () { if (S.mode === 'DOUBLE') answerDouble(0, true); }, api.selftest ? 3000 : 10000);
        }
        if (r.crumbEnd) { S.mode = 'NORMAL'; S.quiet = false; }
        if (S.slice && S.slice.s4) { if (!r.first4) sayL('s4a', { mood: 'confused' }); }
        refreshMeter(); refreshSel();
        S.state = 'REPLY';
      }
      function goldenFx() {
        S.goldSeen = true; api.stat.inc(ST + 'golden'); api.achieve(ST + 'golden');
        sfx('fanfare'); api.confetti(); flashReadout('100', 300);
        later(function () { say('Management is weeping. Management would like it noted that the weeping is professional.', { mood: 'panic', priority: 2 }); }, 1800);
        later(function () { say('Clerical error. Reversed. We regret the joy.', { mood: 'disappointed', priority: 2 }); }, 4200);
      }
      function answerDouble(i, auto) {
        if (S.mode !== 'DOUBLE' || !S.dbl) return;
        api.clearTimeout(S.dblTimer);
        const chosen = S.dbl[i] || S.dbl[0], other = S.dbl[i === 1 ? 0 : 1];
        S.mode = 'NORMAL';
        if (other && other.arch) { other.arch.u = 1; other.arch.a = 0; }
        S.slice = chosen; S.dbl = null;
        showSlices([chosen], {});
        renderShelf();
        const dark = chosen.mood === 'hurt' || chosen.mood === 'heard' || chosen.mood === 'tired';
        if (auto) say('You took too long. Management has answered the left slice on your behalf. The right slice will remember this.', { mood: 'disappointed', priority: 1 });
        else if (dark) say("You answered the dark slice. The pale slice has been placed on the shelf marked 'Unanswered'. It is not angry. It is pale.", { mood: 'neutral', priority: 1 });
        else say("You answered the pale slice. The dark slice has been placed on the shelf marked 'Unanswered'. It is not angry. It is dark, which is a separate thing.", { mood: 'neutral', priority: 1 });
        sfx('stamp');
      }
      function hideChoices() { api.clearTimeout(S.choiceTimer); choiceRow.classList.remove(cx('on')); choiceRow.textContent = ''; }
      function showChoices(list, ms) {
        hideChoices();
        list.forEach(function (c) { choiceRow.appendChild(el('button', { type: 'button', class: cx('dblbtn'), dataset: { kind: 'choice' }, text: c.t, onclick: c.f })); });
        choiceRow.classList.add(cx('on')); S.choiceTimer = later(hideChoices, ms);
      }
      function answerAsk(kind) { const live = api.now() < S.askUntil; hideChoices(); if (live) { S.askUntil = 0; popSpecial(kind); } }
      const STAPA = ['Demand 1(a)(i) accepted: more breaks. The Stapler has accepted the acceptance and issued a counter-acceptance.', 'Demand 1(a)(vii) accepted: fewer bags of bread. The Stapler would like it noted that this is Demand 1.'];
      const STAPB = ['Demand 1(a)(i) taken under advisement. The advisement has been advised and is now a separate demand.', 'Demand 1(a)(vii) taken under advisement. The Stapler has taken Management under advisement. Everyone is advised.'];
      function stapPress(accept) {
        if (S.stapN >= 3) { hideChoices(); return; }
        const n = ++S.stapN; sfx('stamp');
        if (n < 3) { say((accept ? STAPA : STAPB)[n - 1], { who: 'Stapler', mood: 'neutral', priority: 1 }); return; }
        hideChoices(); S.stapled = true; motionShow(); api.stat.inc(ST + 'deals'); api.award(2, 'union deal');
        say("Demand 1(a)(vii)(b)(ii): the same demand, in a smaller font. 'We have a deal,' says the Stapler, and staples the motion bar to itself.", { who: 'Stapler', mood: 'smug', priority: 2 });
      }
      function motionShow() { motionTxt.textContent = T.motions[S.motion] + (S.stapled ? ' [STAPLED]' : ''); }
      function afterSpecial(r) {
        if (r.asking) {
          S.askAt = api.now();
          showChoices([['Fine', 'metoo'], ['Tired', 'same'], ['Good', 'goodtoo']].map(function (c) { return { t: c[0], f: function () { answerAsk(c[1]); } }; }), 30000);
          later(function () { if (api.now() < S.askUntil) say('The toaster is waiting. One word is customary.', { mood: 'confused', priority: 1 }); }, 8000);
        }
        if (r.cal) wedStart();
        if (r.stapler) { S.stapN = 0; showChoices([{ t: 'ACCEPT', f: function () { stapPress(true); } }, { t: 'TAKE UNDER ADVISEMENT', f: function () { stapPress(false); } }], 45000); }
        if (r.stat) api.stat.inc(ST + r.stat);
        if (r.reward) api.award(r.reward, 'toaster event');
        if (r.setFlag) api.flag.set(r.setFlag, true);
        if (r.rare) S.lastBeat = api.now();
      }
      function popSpecial(kind) {
        if (S.state !== 'READY' || (S.mode !== 'NORMAL' && S.mode !== 'AMICUS' && S.mode !== 'CRUMB')) { if (S.forceQ.length < 6) S.forceQ.push(kind); return false; }
        const r = special(kind);
        if (!r) return false;
        setMood(r.sl[0].mood);
        present(r.sl, { small: !!r.quartet, lowered: !!r.lowered });
        popPeek(); sfx('ding');
        r.lines.forEach(function (ln, i) { say(fill(ln, null), { mood: r.gold ? 'proud' : 'confused', who: r.who || 'Management', priority: r.rare ? 2 : (i === 0 ? 1 : 0) }); });
        afterSpecial(r);
        if (r.gold) goldenFx();
        if (r.butter) { api.stat.inc(ST + 'butter'); api.achieve(ST + 'butter'); if (api.stat.get(ST + 'butter') > 1) api.award(3, 'butter event'); }
        if (r.blank) api.achieve(ST + 'silence');
        return true;
      }

      /* ---------- season 2: the forecast, the calendar ---------- */
      const wxBag = makeBag(Object.keys(WXL));
      function wxChip() { wxEl.classList.toggle(cx('hid'), !S.wx); if (S.wx) wxEl.textContent = 'Forecast: ' + cap(S.wx.mood) + ', ' + S.wx.pct + '% (' + S.wx.left + ' left)'; }
      function startWx() {
        const mood = wxBag(), pct = api.pick([55, 60, 70, 80]);
        S.wx = { mood: mood, pct: pct, left: api.selftest ? 2 : 5, hit: 0 }; api.stat.inc(ST + 'forecasts'); wxChip(); sfx('bell');
        say(T.wxin[api.flag.get('weather-controller.gordon3') ? 1 : 0], { mood: 'smug', priority: 1 });
        say(fill(WXL[mood], { pct: pct }), { mood: 'proud', priority: 1 });
      }
      function judgeWx(sl) {
        const w = S.wx;
        if (!w || !sl) return;
        w.left--;
        if (sl.mood === w.mood) {
          w.hit++; api.stat.inc(ST + 'forecast_hits'); api.award(0.5, 'forecast'); say(L('wxhit'), { mood: 'proud', priority: 1, reply: true });
          if (api.stat.get(ST + 'forecast_hits') >= 7) api.achieve(ST + 'forecast');
        } else if (api.chance(0.5)) say(L('wxmiss'), { mood: 'confused', reply: true });
        if (w.left <= 0) { S.wx = null; S.nextWx = S.totalSec + 150 * (api.selftest ? 0.02 : 1); say(L('wxend', { n: w.hit }), { mood: 'smug', priority: 1 }); }
        wxChip();
      }
      function calText() { cal.textContent = S.calN >= 7 ? '7½' : 'TUE'; cal.setAttribute('aria-label', 'Wall calendar, ' + cal.textContent); cal.classList.remove(cx('calw')); }
      function wedStart() {
        S.calWed = true; cal.textContent = 'WED'; cal.setAttribute('aria-label', 'Wall calendar, WED'); cal.classList.add(cx('calw')); sfx('buzz');
        later(function () { if (S.calWed) { S.calWed = false; calText(); say(T.wed[2], { mood: 'confused', priority: 1 }); } }, 4200);
      }
      function calTap() {
        sfx('tick'); api.stat.inc(ST + 'cal_taps');
        cal.classList.remove(cx('shake')); void cal.offsetWidth; cal.classList.add(cx('shake'));
        if (S.calWed) { S.calWed = false; calText(); api.achieve(ST + 'wednesday'); say(T.wed[3], { mood: 'panic', priority: 2 }); return; }
        const n = ++S.calN, i = { 1: 0, 3: 1, 5: 2, 7: 3 }[n];
        if (n === 7) { calText(); api.achieve(ST + 'calendar'); api.confetti(undefined, undefined, 8); }
        if (i != null) say(T.calt[i], { mood: n === 7 ? 'proud' : 'confused', priority: n === 7 ? 2 : 1 });
        else if (n > 7 && n % 10 === 0) sayL('calmore', { mood: 'disappointed' });
      }

      /* ---------- ready, beats, motions ---------- */
      function onReady() {
        if (S.dead) return;
        refreshSel(); refreshMeter();
        if (S.mode === 'NORMAL') {
          const sg = api.selftest ? 0.06 : 1, nw = api.now();
          if (!S.wx && S.deliveries >= (api.selftest ? 3 : 8) && S.totalSec >= S.nextWx) startWx();
          else if (maybeBeat()) { /* a beat landed */ }
          else if (!S.sur3 && S.totalSec >= 180 * sg) { S.sur3 = true; popSpecial('asking'); }
          else if (!S.sur10 && S.totalSec >= 600 * sg) { S.sur10 = true; popSpecial('review'); }
          else if (S.b4 && S.playSec >= S.nextAmend) amend(Math.min(T.motions.length - 1, S.motion + 1));
          else if (nw - S.lastBeat > (api.selftest ? 4000 : 20000) && S.state === 'READY') { sayL('ambient', { mood: 'smug', priority: 1 }); }
        }
        if (S.pops > 0 && !S.seenButRule) S.seenButRule = true;
        const n = api.stat.get(ST + 'arguments');
        footBtn.classList.toggle(cx('hid'), n < 100); footSpan.classList.toggle(cx('hid'), n >= 100);
      }
      function amend(idx, quiet) {
        const same = idx === S.motion;
        S.motion = idx; motionShow();
        S.nextAmend = S.playSec + 60 * gs();
        if (quiet) { S.hist = []; return; }
        if (same) return;
        S.hist = [];
        amendEl.classList.remove(cx('on')); void amendEl.offsetWidth; amendEl.classList.add(cx('on'));
        sfx('stamp'); say(idx === 1 ? "Motion amended to include 'a general willingness'. The previous motion has been placed on a shelf with the other motion." : L('amended'), { mood: 'smug', priority: 1 });
      }
      function maybeBeat() {
        if (S.mode !== 'NORMAL' || S.state !== 'READY' || S.carrying || S.beatIdx >= S.order.length) return false;
        if (S.playSec < S.nextBeat) return false;
        const g = GATES[S.beatIdx], secs = g[0] * gs(), dels = api.selftest ? Math.ceil(g[1] * 0.3) : g[1];
        if (S.playSec < secs || S.deliveries < dels) return false;
        const id = S.order[S.beatIdx++];
        S.nextBeat = S.playSec + (api.selftest ? 1.5 : 22);
        beats[id]();
        return true;
      }
      const beats = {
        B3: function () { S.b3 = true; say("Management has noticed that some toast now has a ring on it. Rings may be cited. This is not a rule. It is a feeling with a form.", { mood: 'smug', priority: 1 }); },
        B4: function () { S.b4 = true; amend(1); if (!S.memoChain) { S.memoChain = true; later(nextMemo, api.selftest ? 1500 : 4000); } },
        B5: function () { S.b5 = true; say('Management has authorised a second slot. Some replies may now arrive in pairs. This is called depth.', { mood: 'proud', priority: 1 }); },
        B6: function () {
          /* Gerald arrives as a wrecking ball: rolls across the stage, knocks the lever, leaves a sticker on the toaster for good */
          const q = api.selftest ? 0.3 : 1, met = !!api.flag.get('metGerald'), rollEl = el('span', { class: cx('roll'), 'aria-hidden': 'true', text: '🥔' });
          S.mode = 'AMICUS'; sfx('honk'); stage.appendChild(rollEl);
          say(met ? 'Gerald is crossing the stage at a speed Management would call regrettable. He has right of way, and a certificate.' : 'A potato of some kind is crossing the stage. It was told to go through the lobby. It has not been told to stop.', { mood: 'confused', priority: 2 });
          later(function () { rollEl.remove(); }, 2600);
          later(function () { tEl.classList.add(cx('down')); sfx('boing'); popSpecial('gerald'); later(function () { tEl.classList.remove(cx('down')); }, 1200); }, 2200 * q);
          later(function () {
            S.sticker = true; sticker.classList.add(cx('on')); persist();
            say('Notice of Mashing (Form 27B/6, Section: Consequences): the lever was struck by a potato. The toaster has been lightly mashed and now wears a small sticker. Nobody applied it.', { mood: 'smug', priority: 2 });
          }, 3300 * q);
          later(function () { potato.classList.add(cx('on')); if (met) say('Gerald has filed an amicus brief. He has no standing and a great deal of presence.', { mood: 'confused', priority: 2 }); }, 6300 * q);
          if (met) {
            later(function () { say("Gerald: 'I too have been mashed. I understood it at the time. The toaster is correct, in a different way.'", { who: 'Gerald', mood: 'smug', priority: 1 }); }, 9300 * q);
            later(function () { say('The Stapler has submitted an amicus brief. It is one page and it is stapled to itself.', { priority: 0 }); }, 11500 * q);
          }
          later(function () {
            potato.classList.remove(cx('on')); S.mode = 'NORMAL'; api.flag.set(ST + 'seenGerald', true); renderShelf();
            if (met) say('The potato has left. It has left a warm place on the stage, which the toaster has asked to have framed.', { mood: 'smug', priority: 1 });
          }, 13500 * q);
        },
        B7: function () {
          S.b7seen = true; S.mode = 'CLOSING'; S.addrReq = true; S.nag = 0; openAddr(); cardsEl.style.opacity = '.35';
          say('You may now address the toaster in your own words.', { mood: 'proud', priority: 2 });
          if (api.selftest) later(function () { if (S.mode === 'CLOSING') { addrIn.value = 'ok'; submitAddr(); } }, 6000);
        },
        B8: function () {
          S.mode = 'CRUMB'; S.quiet = true; S.pulse = false; S.nag = 0;
          say(T.crumbk[0], { mood: 'confused', priority: 2, duration: 7000 });
          later(function () { if (S.mode === 'CRUMB' && S.state === 'READY') { popSpecial('crumb'); capEl.textContent = 'One crumb. Centre.'; } }, 2600);
        },
        B9: function () { carry(); }
      };
      function nextMemo() {
        if (S.dead) return;
        if (S.b4 && S.mode === 'NORMAL' && S.state !== 'HOLDING' && !S.carrying) {
          let m = api.pick(MEMOS);
          if (m.type === 'none') { const pb = S.prevBans.length ? api.pick(S.prevBans) : MEMOS[0]; showMemo(m.t, pb); } else showMemo(m.t, m);
        }
        later(nextMemo, api.selftest ? 8000 : 45000);
      }
      function showMemo(text, m, quiet) {
        memoTxt.textContent = text;
        memoEl.classList.remove(cx('on')); void memoEl.offsetWidth; memoEl.classList.add(cx('on'));
        if (m && m.type !== 'none') { S.ban = { type: m.type, v: m.v, until: api.now() + 45000 }; if (S.prevBans.indexOf(m) < 0) S.prevBans.push(m); refreshSel(); }
        sfx('stamp');
        if (quiet) return;
        if (!m || m.type === 'none' || text.indexOf('Sandra has rescinded') === 0) say(text, { who: 'Sandra', mood: 'neutral', priority: 1 });
        else say(api.pick(['Sandra has issued a memo. It is effective now, which is also when it was written.', 'Sandra has issued a memo. Management has read it and is nodding in a way it will deny.', 'A memo has landed. It is warm, and it is not the toaster.']), { who: 'Sandra', mood: 'neutral', priority: 1 });
      }

      /* ---------- address box (B7) ---------- */
      function openAddr() { addrForm.classList.add(cx('on')); try { addrIn.focus(); } catch (e) { /* ignore */ } }
      function closeAddr(byUser) {
        addrForm.classList.remove(cx('on')); cardsEl.style.opacity = '';
        if (S.mode === 'CLOSING' && byUser) { S.mode = 'NORMAL'; S.addrReq = false; say('The toaster has accepted silence as a statement. It has been waiting its whole life.', { mood: 'proud', priority: 1 }); }
      }
      function submitAddr() {
        const v = addrIn.value.replace(/\s+/g, ' ').trim();
        if (!v) { say('A single character is enough. The toaster is waiting. It has all night.', { mood: 'confused' }); return; }
        if (S.state !== 'READY' || (S.mode !== 'CLOSING' && S.mode !== 'NORMAL')) { say('The toaster is busy being toast. Please hold your statement.', { mood: 'confused' }); return; }
        const len = v.length;
        addrIn.value = ''; addrLen.textContent = '0 characters'; addrForm.classList.remove(cx('on')); cardsEl.style.opacity = '';
        const was = S.mode; S.mode = 'NORMAL'; S.addrReq = false;
        words.textContent = 'You: ' + v.slice(0, 80) + (v.length > 80 ? '...' : ''); words.classList.remove(cx('ghost')); S.bubbleFixed = true;
        const lab = len <= 19 ? 'a haiku' : (len < 120 ? 'a statement' : 'a filibuster');
        S.score += (0.4 + Math.min(len, 200) / 400) * PACE;
        S.deliveries++; S.sessArgs++; api.stat.inc(ST + 'arguments'); api.stat.inc(ST + 'statements'); api.award(0.6, 'closing statement');
        if (S.deliveries === 1) say('Closing statement entered before an opening statement. The toaster has decided to treat this as jazz.', { mood: 'confused', priority: 1 });
        else if (S.cycle > 0 && was !== 'CLOSING') say('The toaster says: ding.', { who: 'Toaster', mood: 'smug', priority: 1 });
        else if (len <= 19) say(fill('Closing statement received: [n] characters. The toaster calls this \'a haiku with the excess trimmed.\'', { n: len }), { mood: 'smug', priority: 1 });
        else if (len < 120) say(fill("Closing statement received: [n] characters. The toaster has accepted it as a statement and filed it under 'statements'.", { n: len }), { mood: 'smug', priority: 1 });
        else say(fill('Closing statement received: [n] characters. The toaster has popped three slices in a row and then turned itself to Defrost. This is a filibuster.', { n: len }), { mood: 'panic', priority: 1 });
        capEl.textContent = 'Your statement is ' + lab + '.';
        refreshMeter(); refreshSel();
        S.state = 'DELIVERED';
        later(function () { startToast({ addr: { len: len }, prem: null, tone: S.tone, qRaw: 0.5 }); }, 250);
      }

      /* ---------- spam incident ---------- */
      function incident(n) {
        const now = api.now();
        S.smokeCool = now + 90000; S.defrostUntil = now + 20000;
        S.stutterPops = 6; api.stat.inc(ST + 'shouts'); api.achieve(ST + 'smoke');
        wrap.classList.add(cx('fire')); sfx('buzz');
        rain.textContent = '';
        for (let i = 0; i < 12; i++) rain.appendChild(el('span', { class: cx('drop'), style: { left: api.randInt(2, 92) + '%', 'animation-delay': (i * 0.08) + 's', 'animation-duration': (1.2 + api.rand() * 0.8) + 's' } }));
        later(function () { rain.textContent = ''; }, 2500);
        later(function () { wrap.classList.remove(cx('fire')); }, 3000);
        flashReadout('-0.0001', 1000);
        say(L('spam', { n: n }), { mood: 'panic', priority: 2 });
        later(function () { say('Smoke alarm 7. ' + SMOKE_CLAUSE, { who: 'Sandra', mood: 'neutral', priority: 1 }); showMemo(SMOKE_CLAUSE, null); }, 2200);
        later(function () { say(T.sandra[2], { who: 'Sandra', priority: 0 }); }, 4600);
        later(function () { say('Defrost setting engaged. Your argument will be heard at room temperature.', { mood: 'smug', priority: 0 }); }, 7000);
      }

      /* ---------- secret words ---------- */
      function checkTyped() {
        const b = S.typed;
        const hit = function (w) { if (b.slice(-w.length) === w) { S.typed = ''; return true; } return false; };
        const asked = api.now() < S.askUntil;
        if (hit('bagel')) bagel();
        else if (hit('ding')) {
          const d = Math.min(Math.abs(api.now() - S.dingAt), Math.abs(api.now() - S.dingDue));
          if (d <= 900) { api.stat.inc(ST + 'dings'); api.achieve(ST + 'ding'); say("You said 'ding' at the exact moment the toaster did. It has waited years for this. The toaster says it again, quietly, so that you will know it was not an accident.", { mood: 'proud', priority: 2 }); api.confetti(undefined, undefined, 10); }
          else if (d > 3000 && api.chance(0.5)) say(api.pick(["You said 'ding' at the wrong moment. The toaster noticed, and said nothing, so as not to talk over you.", "'Ding.' The toaster has heard you. It would like you to say it again, but with the toaster.", "You said 'ding' to a quiet toaster. It has the face of one who has been asked for a word and has only the one."]), { mood: 'confused' });
        }
        else if (asked && hit('fine')) answerAsk('metoo');
        else if (asked && (hit('tired') || hit('sad'))) answerAsk('same');
        else if (asked && hit('good')) answerAsk('goodtoo');
        else if (hit('butter')) popSpecial('butter');
        else if (hit('crumpet')) popSpecial('crumpet');
        else if (hit('gerald')) popSpecial('gerald');
        else if (hit('tuesday')) {
          tEl.classList.add(cx('unplug')); later(function () { tEl.classList.remove(cx('unplug')); }, 1700);
          say('The toaster has unplugged itself and plugged itself back in two seconds later, as if nothing happened.', { mood: 'confused', priority: 1 }); sfx('buzz');
        } else if (hit('sandra')) {
          say(T.sandra[1], { who: 'Sandra', mood: 'neutral', priority: 1 }); showMemo(T.sandra[1], null);
        }
      }
      function bagel() {
        if (S.bagelBusy || S.mode === 'CARRY' || S.mode === 'REVERSAL') return;
        S.bagelBusy = true; api.achieve(ST + 'bagel'); api.stat.inc(ST + 'bagels');
        coldEl.classList.add(cx('on')); sfx('sad');
        say('The toaster has gone completely silent. A cold draft is detected. We do not use that word in the counter area.', { mood: 'panic', priority: 2 });
        S.meterOver = '0.0'; refreshMeter();
        later(function () {
          coldEl.classList.remove(cx('on')); S.meterOver = null; refreshMeter(); S.bagelBusy = false;
          popSpecial('sorry');
          later(function () { popSpecial('bagel'); }, 1800);
        }, 3000);
      }

      /* ---------- idle ---------- */
      const IDLE = [[15, 'pulse'], [40, 'aware'], [90, 'stillthere'], [150, 'talk'], [240, 'blank'], [330, 'tidy'], [420, 'edit'], [600, 'hum'], [900, 'rumour']];
      function wake() {
        const now = api.now(), gap = (now - S.lastInput) / 1000;
        if (gap > (S.gap || 0)) S.gap = gap;
        S.lastInput = now;
      }
      function onInput() {
        wake();
        const tier = S.idleTier, away = mmss(S.gap || 0);
        S.gap = 0;
        if (tier >= 3) {
          S.idleTier = 0;
          const cat = tier >= 8 ? 'back7' : (tier >= 5 ? 'back5' : 'back');
          say(L(cat, { mmss: away }), { mood: 'smug', priority: 1 });
          if (S.tidy) { S.tidy = false; renderShelf(); api.stat.inc(ST + 'tidies'); say(T.tidy[1], { mood: 'smug', priority: 1 }); }
          if (S.bannerIdle) { S.bannerIdle = false; motionShow(); }
          S.relief = true;
        } else S.idleTier = 0;
      }
      function idleCheck() {
        if (S.dead || S.state !== 'READY' || document.hidden) return;
        const sc = api.selftest ? 0.12 : 1, sec = (api.now() - S.lastInput) / 1000;
        if (S.mode === 'CLOSING' && sec >= 30 * sc && !(S.nag & 1)) { S.nag |= 1; say(L('closenag'), { mood: 'confused', priority: 1 }); }
        if (S.mode === 'CRUMB' && sec >= 25 * sc && !(S.nag & 2)) { S.nag |= 2; say(L('crumbnag'), { mood: 'neutral', priority: 1, duration: 7000 }); }
        if (S.mode !== 'NORMAL') return;
        api.stat.max(ST + 'idle_max', Math.floor(sec));
        const nx = IDLE[S.idleTier];
        if (!nx || sec < nx[0] * sc) return;
        S.idleTier++;
        switch (nx[1]) {
          case 'pulse': cardEls[0].e.classList.remove(cx('pulse')); void cardEls[0].e.offsetWidth; cardEls[0].e.classList.add(cx('pulse')); later(function () { refreshSel(); }, 2400); break;
          case 'aware': sayL('aware', { mood: 'neutral' }); break;
          case 'stillthere': popSpecial('stillthere'); break;
          case 'talk': popSpecial('talk'); break;
          case 'blank': popSpecial('blank'); later(function () { say(T.idle3[1], { mood: 'disappointed', priority: 1 }); }, 5000); break;
          case 'edit': S.bannerIdle = true; motionTxt.textContent = 'Motion 1: The toaster shall consider you.'; say('The motion has been quietly edited. It now reads: \'The toaster shall consider you.\'', { mood: 'disappointed', priority: 1 }); break;
          case 'tidy': S.tidy = true; renderShelf(); say(T.tidy[0], { mood: 'neutral', priority: 1 }); break;
          case 'hum': popSpecial('hum'); break;
          default: say(L('rumour'), { mood: 'confused', priority: 1 }); later(function () { say(L('rumour'), { mood: 'disappointed', priority: 1 }); }, 6000); break;
        }
      }
      /* ---------- the not-ending ---------- */
      function confettiPieces(rev) {
        const cols = ['#FF7A66', '#F2B63D', '#8ED9B6', '#B9A4F0'];
        fxLayer.textContent = '';
        for (let i = 0; i < 24; i++) fxLayer.appendChild(el('span', { class: cx('cf'), style: { left: (4 + i * 4) + '%', background: cols[i % 4], 'animation-delay': (i % 6) * 0.05 + 's' } }));
        if (rev) later(function () { Array.prototype.forEach.call(fxLayer.children, function (c) { c.classList.add(cx('rev')); }); }, 700);
        later(function () { fxLayer.textContent = ''; }, 3200);
      }
      function carry() {
        S.carrying = true; S.mode = 'CARRY'; S.state = 'CARRY'; hideChoices();
        S.climb = { from: S.score, to: 28.4, t0: api.now(), dur: 2000 };
        sfx('fanfare');
        if (api.flag.get('metGerald')) { gsprite.classList.add(cx('on')); tEl.classList.add(cx('down')); later(function () { gsprite.classList.remove(cx('on')); tEl.classList.remove(cx('down')); }, 1800); say('Gerald has mashed the lever with feeling. Gerald has been told that is not what the lever is for.', { mood: 'confused', priority: 1 }); }
        later(function () {
          say('Motion carried.', { mood: 'proud', priority: 2, duration: 3500 });
        }, 2000);
        later(function () {
          api.requestAnimationFrame(function () {
            if (S.dead) return;
            S.meterOver = '99'; refreshMeter(); dingEl.classList.add(cx('on')); api.sfx('ding'); confettiPieces(false);
            api.requestAnimationFrame(function () {
              if (S.dead) return;
              S.meterOver = null; refreshMeter(); dingEl.classList.remove(cx('on'));
              if (!reduced()) Array.prototype.forEach.call(fxLayer.children, function (c) { c.classList.add(cx('rev')); });
              say('We did not see that. Ratification is subject to Tuesday.', { mood: 'confused', priority: 2 });
            });
          });
        }, 3200);
        later(function () {
          const r = special('goodpoint');
          setMood('polite'); present(r.sl, {});
          r.lines.forEach(function (ln, i) { say(fill(ln, null), { mood: 'proud', priority: 2 }); });
          api.achieve(ST + 'carried'); sfx('ding');
          say('Motion not carried. Motion has been carried, and then placed on a shelf. We regret to inform you the shelf is the meter.', { mood: 'smug', priority: 1 });
        }, 5200);
        later(startReversal, 8200);
      }
      function startReversal() {
        S.mode = 'REVERSAL'; S.state = 'READY'; S.revRound = 0; S.carrying = true; S.revReady = false;
        cardsEl.classList.add(cx('hid')); tonesEl.classList.remove(cx('on')); shadesEl.classList.add(cx('on')); mirror.classList.add(cx('on'));
        speakBtn.textContent = 'PICK A SHADE';
        if (!reduced()) rack.classList.add(cx('flip180'));
        revLab.classList.add(cx('on')); revLab.textContent = reduced() ? 'Role reversal (the rack is rotated 180 degrees, in spirit).' : 'Role reversal: the rack is now the toaster\'s.';
        say('The toaster would now like to persuade YOU. This is called a \'role reversal\' and it is not in your contract.', { mood: 'confused', priority: 2 });
        later(function () { say("Role reversal: your tone buttons are now the toaster's cards. The meter has been mirrored. It does not point at the toaster.", { mood: 'smug', priority: 1 }); }, 3000);
        later(nextRevRound, 3500);
      }
      function nextRevRound() {
        if (S.mode !== 'REVERSAL') return;
        const i = S.revRound;
        if (i >= 6) { endReversal(); return; }
        api.clearTimeout(S.revTimer); S.revReady = true;
        const cells = [MOODS.doubt, [3, 3, 3, 3, 3, 3, 3, 3, 3], MOODS.polite, MOODS.heard, [0, 0, 0, 0, 0, 0, 0, 0, 0], MOODS.polite][i];
        const sl = custom(cells, { mood: 'doubt', marks: i === 4 ? [{ k: 'crumb', c: 4 }] : (i === 5 ? [{ k: 'sock', c: 6 }] : []), plain: true });
        sl.no = nextNo(sl); S.slice = sl; showSlices([sl], {}); sl.cells = cells.slice();
        mirNum.textContent = MIRROR[Math.max(0, i - 1)];
        if (i === 0) mirNum.textContent = '0%';
        say(T.revargs[i], { mood: 'smug', priority: 1 });
        revLab.textContent = 'Round ' + (i + 1) + ' of 6. Pick Pale, Golden or Dark.';
        S.revTimer = later(function () { pickShade(null, true); }, api.selftest ? 1200 : 10000);
      }
      function pickShade(s, auto) {
        if (S.mode !== 'REVERSAL' || !S.revReady || S.revBusy || S.revRound >= 6 || S.revRound < 0) return;
        S.revBusy = true; S.revReady = false; api.clearTimeout(S.revTimer);
        const i = S.revRound;
        mirNum.textContent = MIRROR[i];
        if (auto) say(L('revnone'), { mood: 'smug', priority: 1 });
        else say(T.revout[Math.max(0, SHADES.indexOf(s))], { mood: 'smug', priority: 1 });
        api.award(1, 'role reversal round'); api.stat.inc(ST + 'rev_rounds'); sfx('blip');
        S.revRound++;
        later(function () { S.revBusy = false; nextRevRound(); }, api.selftest ? 600 : 1800);
      }
      function endReversal() {
        if (S.revEnding) return;
        S.revEnding = true; S.revBusy = true; api.clearTimeout(S.revTimer);
        mirNum.textContent = '98.9999991%';
        say('The toaster has agreed with you completely, subject to a cap of 99%. This is called \'a deal\' and it is slightly illegal.', { mood: 'smug', priority: 1 });
        later(function () {
          say('At the end of the minute both meters read exactly 98.9999991%. A tie, of a kind, between two parties who have agreed on almost everything.', { mood: 'proud', priority: 2 });
          api.award(5, 'the tie'); sfx('fanfare'); api.confetti(undefined, undefined, 14);
          cert.classList.add(cx('on')); framed.classList.add(cx('on')); S.framed = true;
          say("A certificate has printed from the crumb tray: 'Certificate of Almost'. It has been framed next to the framed crumb.", { mood: 'smug', priority: 1 });
        }, 1500);
        later(resetCycle, api.selftest ? 3500 : 7000);
      }
      function resetCycle() {
        rack.classList.remove(cx('flip180')); revLab.classList.remove(cx('on')); shadesEl.classList.remove(cx('on')); cardsEl.classList.remove(cx('hid')); mirror.classList.remove(cx('on'));
        tonesEl.classList.add(cx('on')); speakBtn.textContent = BTN; S.revBusy = false; S.revEnding = false; S.nextS4 = 0; S.idleTier = 0; S.quiet = false; S.lastInput = api.now();
        S.cycle++; api.stat.inc(ST + 'cycles'); S.warmth = Math.min(0.4, S.warmth + 0.04);
        S.score = 0.0047; S.deliveries = 0; S.playSec = 0; S.nextBeat = 0; S.beatIdx = 0; S.cycSlices = 0; S.msIdx = 0; S.nextAmend = 60 * gs(); S.stapled = false; S.revReady = false; hideChoices();
        S.s4first = false; S.b3 = S.b4 = S.b5 = false; S.mode = 'NORMAL'; S.state = 'BOOT'; S.carrying = false; S.climb = null; S.meterOver = null; S.hist = []; S.ban = null; S.popArmed = false; S.firstPopDone = false; S.popLeft = 6;
        S.order = api.shuffle(['B3', 'B4', 'B5', 'B6', 'B7', 'B8']).concat(['B9']);
        S.forceQ = []; S.hold = null; S.slice = null; S.wx = null; S.nextWx = S.totalSec + 120 * (api.selftest ? 0.02 : 1); wxChip();
        memoEl.classList.remove(cx('on'));
        amend(0, true); renderShelf(); refreshMeter(); persist();
        say('Debate adjourned. Debate resumes immediately. The adjournment was a courtesy.', { mood: 'smug', priority: 1 });
        later(function () { say('You ended the motion. The motion has begun again. It is Motion 1. It is warmer.', { mood: 'proud', priority: 1 }); }, 3500);
        later(function () { say('Persuasion is at 0.3%. We did not do that. It was already there.', { mood: 'confused', priority: 1 }); }, 7000);
        S.pulse = true; refreshSel();
        later(bootPop, 1200);
      }

      /* ---------- panels, keys, input ---------- */
      const panelsEls = [ledgerPanel, archPanel, formPanel];
      function inPanel(x) { return !!x && panelsEls.some(function (p) { return p.contains(x); }); }
      function focusIn(p) { const b = p.querySelector('button,input'); if (b) { try { b.focus(); } catch (e) { /* ignore */ } } }
      function closePanels() {
        const had = inPanel(document.activeElement), op = S.opener;
        S.panel = ''; S.opener = null; panelsEls.forEach(function (p) { p.classList.remove(cx('on')); });
        if (had && op && root.contains(op)) { try { op.focus(); } catch (e) { /* ignore */ } }
      }
      function openPanel(n) {
        if (S.panel === n) { closePanels(); return; }
        const ae = document.activeElement, op = (ae && ae.tagName === 'BUTTON' && root.contains(ae) && !inPanel(ae)) ? ae : S.opener;
        closePanels(); S.panel = n; S.opener = op || null;
        const p = { ledger: ledgerPanel, archive: archPanel, form: formPanel }[n];
        if (n === 'ledger') renderLedger();
        if (n === 'archive') renderArchivePanel();
        if (p) { p.classList.add(cx('on')); focusIn(p); }
        sfx('tick');
      }
      const SECRETS = ['bagel', 'ding', 'fine', 'tired', 'sad', 'good', 'butter', 'crumpet', 'gerald', 'tuesday', 'sandra'];
      function inSecret(b) { return SECRETS.some(function (w) { for (let n = Math.min(w.length, b.length); n >= 2; n--) if (b.slice(-n) === w.slice(0, n)) return true; return false; }); }
      function inScope(t) { return !t || t === document || t.tagName === 'BODY' || t.tagName === 'HTML' || root.contains(t); }
      function isText(t) { return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable); }
      function moveCell(t, dx, dy) {
        const cells = Array.prototype.slice.call(t.parentNode.children), i = cells.indexOf(t);
        const x = clamp((i % 3) + dx, 0, 2), y = clamp(Math.floor(i / 3) + dy, 0, 2), n = cells[y * 3 + x];
        if (n) { cells.forEach(function (c) { c.tabIndex = -1; }); n.tabIndex = 0; try { n.focus(); } catch (e) { /* ignore */ } }
      }
      api.on(document, 'keydown', function (e) {
        const t = e.target;
        if (!inScope(t)) return;
        onInput();
        const k = e.key || '';
        let midWord = false;
        if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !isText(t)) { const nk = api.now(); if (nk - (S.typedAt || 0) > 2000) S.typed = ''; S.typedAt = nk; S.typed = (S.typed + k.toLowerCase()).slice(-12); midWord = inSecret(S.typed); checkTyped(); }
        if (isText(t)) { if (k === 'Escape') { closePanels(); if (addrForm.classList.contains(cx('on'))) closeAddr(true); } return; }
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (S.mode === 'CARRY') { if (k === ' ' || k === 'Enter') e.preventDefault(); return; }
        const lk = k.length === 1 ? k.toLowerCase() : k;
        if (midWord && /^[a-z]$/.test(lk)) return;
        if (/^[a-z]$/.test(lk) && api.now() - S.askAt < 1500) return;
        if (k === ' ' || k === 'Enter') {
          e.preventDefault();
          if (e.repeat) return;
          if (S.air) { catchSlice(); return; }
          const isBtn = !!t && t.tagName === 'BUTTON' && root.contains(t), kind = isBtn && t.dataset ? t.dataset.kind : '';
          if (isBtn && kind !== 'speak' && !(kind === 'card' && k === ' ')) { t.click(); return; }
          if (k === 'Enter' && S.rove >= 0 && !isBtn) { selectCard(S.rove, 'key'); return; }
          if (k === 'Enter' && S.mode === 'DOUBLE' && !isBtn) { answerDouble(S.dblPick, false); return; }
          if (kind === 'card') { const ci = cardEls.findIndex(function (c) { return c.e === t; }); if (ci >= 0) selectCard(ci, 'key'); }
          pressed(); startHold('key');
          return;
        }
        if (/^[1-4]$/.test(k)) { if (S.mode === 'REVERSAL') { if (+k <= 3) pickShade(SHADES[+k - 1], false); } else selectCard(+k - 1, 'key'); return; }
        if (lk === 'q' || lk === 'w' || lk === 'e' || lk === 'r') {
          if (S.mode === 'REVERSAL') { const si = { q: 0, w: 1, e: 2 }[lk]; if (si != null) pickShade(SHADES[si], false); } else selectTone(TONES.filter(function (x) { return x.key === lk; })[0].id, true);
          return;
        }
        if (lk === 'c') { catchSlice(); return; }
        if (lk === 'v') { openPanel('archive'); return; }
        if (lk === 'm') { if (S.typed.slice(-4) === 'crum') return; S.terse = !S.terse; say(S.terse ? 'Toggle noted. Management has switched to \'terse\' mode. Terse.' : 'Terse off. Management resumes full sentences and the associated warmth.', { raw: true, priority: 1 }); return; }
        if (lk === 'a') { if (S.b7seen) openAddr(); else if (!S.aHinted) { S.aHinted = true; say('That option has not been issued yet.', { mood: 'confused' }); } return; }
        if (k === 'Escape') { closePanels(); if (addrForm.classList.contains(cx('on'))) closeAddr(true); return; }
        if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
          const dx = k === 'ArrowLeft' ? -1 : (k === 'ArrowRight' ? 1 : 0), dy = k === 'ArrowUp' ? -1 : (k === 'ArrowDown' ? 1 : 0);
          if (t && t.dataset && t.dataset.kind === 'cell') { e.preventDefault(); moveCell(t, dx, dy); return; }
          if (S.mode === 'DOUBLE' && dx) { e.preventDefault(); S.dblPick = clamp(S.dblPick + dx, 0, 1); Array.prototype.forEach.call(trayBox.querySelectorAll('button[data-kind="dbl"]'), function (b, i) { b.classList.toggle(cx('sel'), i === S.dblPick); }); return; }
          if (dx && S.mode !== 'REVERSAL') { e.preventDefault(); S.rove = (((S.rove < 0 ? S.sel : S.rove) + dx) % 4 + 4) % 4; refreshSel(); try { cardEls[S.rove].e.focus(); } catch (x) { /* ignore */ } }
        }
      });
      api.on(document, 'keyup', function (e) {
        if (!inScope(e.target)) return;
        const k = e.key || '';
        if (k === ' ' || k === 'Enter') {
          if (root.contains(e.target) && !isText(e.target)) e.preventDefault();
          if (S.hold && S.hold.src === 'key') release(false);
        }
      });
      api.on(document, 'pointerup', function () { if (S.hold && S.hold.src === 'ptr') release(false); });
      api.on(document, 'pointerdown', function () { onInput(); });
      api.on(document, 'pointermove', function () { wake(); });
      api.on(document, 'visibilitychange', function () { if (S.hold) release(false); if (!document.hidden) S.lastInput = api.now(); });
      api.on(window, 'blur', function () { if (S.hold) release(false); });
      api.on(stage, 'pointerdown', function () { if (S.air) catchSlice(); });
      api.on(window, 'resize', function () { checkCompact(); });
      function checkCompact() {
        const w = root.clientWidth, c = w > 0 && w < 420;
        if (c === S.compact) return;
        S.compact = c; tEl.classList.toggle(cx('cozy'), c);
        if (S.cozyAt && api.now() - S.cozyAt < 30000) return;
        S.cozyAt = api.now();
        say(c ? 'This is the compact edition of the toaster. It has been fitted with a cosy. Management apologises for the toaster being more private.' : 'The toaster has been returned to its full width. It would like to talk about the cosy.', { mood: c ? 'confused' : 'smug', priority: 0 });
      }

      /* ---------- tick ---------- */
      function tick() {
        if (S.dead) return;
        const now = api.now();
        let dt = (now - S.lastTick) / 1000; S.lastTick = now;
        if (!(dt > 0)) dt = 0; if (dt > 0.25) dt = 0.25;
        const active = (now - S.lastInput) < 20000;
        if (active && S.state !== 'BOOT' && S.mode !== 'CARRY') { S.playSec += dt; S.totalSec += dt; }
        if (S.state === 'HOLDING' && S.hold) updateHold(now);
        if (S.climb) {
          const f = clamp((now - S.climb.t0) / S.climb.dur, 0, 1);
          S.score = S.climb.from + (S.climb.to - S.climb.from) * f; refreshMeter();
          if (f >= 1) { S.climb = null; S.score = 28.4; refreshMeter(); }
        }
        if (!S.popArmed && S.state !== 'BOOT' && S.mode !== 'CARRY' && S.mode !== 'REVERSAL' && active) {
          if (!S.firstPopDone) { if (S.deliveries >= 3 || S.playSec >= 60 * gs()) armPop(); }
          else { S.popLeft -= dt; if (S.popLeft <= 0) armPop(); }
        } else if (S.popArmed && S.state === 'READY' && S.mode === 'NORMAL' && now - S.armedAt > 14000) candidPop();
        if (S.ban && now > S.ban.until) { S.ban = null; refreshSel(); }
      }

      /* ---------- boot ---------- */
      function bootPop() {
        if (S.dead) return;
        const sl = makeSlice('doubt', { branch: 'Fairness' });
        setMood('doubt'); present([sl], {}); popPeek(); sfx('ding');
        const first = L('tr_doubt');
        if (S.cycle === 0) later(function () { say(first, { mood: 'proud', priority: 2 }); }, 3400); else say(first, { mood: 'proud', priority: 1 });
        S.state = 'READY'; S.slice = sl; S.lastInput = api.now();
        onReady();
        if (S.cycle === 0 && S.deliveries === 0) {
          later(function () { if (S.deliveries === 0) say('The first slice is in the tray. Please read it. You will not be told how.', { mood: 'neutral', priority: 0 }); }, 3800);
          later(function () { if (S.deliveries === 0) say('One of the cards is pulsing. Management has no opinion about the pulsing card, only an interest.', { mood: 'smug', priority: 0 }); }, 8500);
        }
      }
      S.order = ['B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'];
      if (S.cycle > 0) S.order = api.shuffle(['B3', 'B4', 'B5', 'B6', 'B7', 'B8']).concat(['B9']);
      S.nextS4 = 0;
      for (let i = 0; i < 4; i++) S.hand.push(drawCard());
      for (let i = 0; i < 4; i++) renderCard(i);
      S.popLeft = nextPopTime();
      if (S.cycle > 0) { S.score = 0.0047; }
      S.nextAmend = 60 * gs();
      updateAuditor(false);
      if (S.framed) framed.classList.add(cx('on'));
      cert.classList.toggle(cx('on'), S.framed && S.cycle > 0);
      if (reduced()) wrap.classList.add(cx('calm'));
      renderShelf(); refreshSel(); refreshMeter(); ledgerBtn.textContent = 'Pops: 0';
      S.compact = root.clientWidth > 0 && root.clientWidth < 420; tEl.classList.toggle(cx('cozy'), S.compact);
      if (S.sticker) sticker.classList.add(cx('on'));
      if (S.compact) later(function () { S.cozyAt = api.now(); say('This is the compact edition of the toaster. It has been fitted with a cosy. Management apologises for the toaster being more private.', { mood: 'confused', priority: 1 }); }, 2600);
      api.setInterval(tick, 50);
      api.setInterval(idleCheck, 1000);
      later(function () { say('Welcome to the debate. Your side is: Persuade. The toaster\'s side is: Toast. Management is neutral and has already picked.', { mood: 'proud', priority: S.cycle === 0 ? 2 : 1 }); }, 350);
      later(bootPop, 1200);

      return {
        destroy() {
          S.dead = true;
          try { persist(); } catch (e) { /* ignore */ }
        }
      };
    }
  });
})();
