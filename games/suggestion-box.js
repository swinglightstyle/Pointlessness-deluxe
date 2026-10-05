/* POINTLESS module: suggestion-box */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const ID = 'suggestion-box';
  const k = function (s) { return 'm-suggestion-box-' + s; };

  P.injectCSS(`
.m-suggestion-box-root{--lean:0deg;--lift:0px;--ear:1;--listen:1;--zoom:1;--abol:1;--small:1;--accent:#FF6B5E;--font:16px;--dim:0;--tempoMul:1;--bg:#FBF3DE; position:relative;box-sizing:border-box;min-height:420px;padding:10px 12px 12px;background:var(--bg);color:#23304A;font-size:var(--font);line-height:1.35; font-family:system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;display:flex;flex-direction:column;gap:10px;overflow:hidden;transition:background .6s}.m-suggestion-box-root *{box-sizing:border-box}
.m-suggestion-box-root::after{content:'';position:absolute;inset:0;background:#10141f;opacity:calc(var(--dim) * .38);pointer-events:none;z-index:40;transition:opacity .8s}.m-suggestion-box-root [hidden]{display:none !important} .m-suggestion-box-root button{font-family:inherit;color:inherit;touch-action:manipulation} .m-suggestion-box-root button:focus-visible,.m-suggestion-box-root [tabindex]:focus-visible,.m-suggestion-box-root textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.m-suggestion-box-banner{text-align:center;font-weight:800;font-size:.85em;letter-spacing:.04em;background:#F2B134;border:3px solid #23304A;border-radius:8px;padding:4px 8px;box-shadow:3px 3px 0 #23304A} .m-suggestion-box-banner:empty{display:none}.m-suggestion-box-big{position:relative;display:grid;grid-template-columns:minmax(0,58fr) minmax(0,42fr);column-gap:14px;border:4px solid transparent;border-radius:12px;transition:background .6s,border-color .6s}
.m-suggestion-box-bigon{border-color:#8F6B3A;padding:46px 8px 8px;background:repeating-linear-gradient(90deg,rgba(143,107,58,.2) 0 3px,transparent 3px 9px),#C9A26B;box-shadow:5px 5px 0 #23304A} .m-suggestion-box-bigslot,.m-suggestion-box-biglab{position:absolute;opacity:0;transition:opacity .7s;pointer-events:none} .m-suggestion-box-bigslot{left:12%;right:12%;top:12px;height:20px;border-radius:12px;background:#1E1A16;box-shadow:inset 0 4px 6px #000,0 0 18px rgba(242,177,52,.7)}
.m-suggestion-box-biglab{left:0;right:0;top:34px;text-align:center;font-weight:900;font-size:.62em;letter-spacing:.14em;color:#4a3515} .m-suggestion-box-bigon .m-suggestion-box-bigslot,.m-suggestion-box-bigon .m-suggestion-box-biglab{opacity:1} .m-suggestion-box-inner{display:grid;grid-column:1/3;grid-row:1;grid-template-columns:58fr 42fr;gap:14px;transform:scale(var(--zoom));transform-origin:center top;transition:transform .7s cubic-bezier(.5,0,.3,1)}
.m-suggestion-box-left,.m-suggestion-box-right{display:flex;flex-direction:column;gap:10px;min-width:0}.m-suggestion-box-boxwrap{display:flex;justify-content:center;padding:4px 46px 0 22px;position:relative} .m-suggestion-box-jig{animation:m-suggestion-box-jig .32s linear} .m-suggestion-box-box{position:relative;width:100%;max-width:280px;transform:rotate(var(--lean)) translateY(var(--lift)) scale(calc(var(--abol) * var(--small)));transform-origin:50% 100%;
transition:transform .6s cubic-bezier(.3,1.5,.5,1);touch-action:pan-y;cursor:pointer;outline-offset:6px}.m-suggestion-box-gentle{--lift:-7px} .m-suggestion-box-flinch{--lift:9px} .m-suggestion-box-face{position:relative;height:200px;border:3px solid #8F6B3A;border-radius:10px 10px 6px 6px; background:repeating-linear-gradient(90deg,rgba(143,107,58,.17) 0 3px,transparent 3px 9px),linear-gradient(#D6B07A,#C9A26B);box-shadow:4px 4px 0 #23304A,inset 0 -12px 0 rgba(143,107,58,.22);transition:background .5s}
.m-suggestion-box-face::before{content:'';position:absolute;left:46%;top:-3px;width:34px;height:20px;background:rgba(255,248,220,.55);border:1px solid rgba(143,107,58,.35);transform:rotate(-2deg)} .m-suggestion-box-nod .m-suggestion-box-face{animation:m-suggestion-box-nod .45s ease-in-out}.m-suggestion-box-pinky .m-suggestion-box-face{background:linear-gradient(#F6B8C9,#F0A0B8)} .m-suggestion-box-eyes{position:absolute;top:16px;left:0;right:0;display:flex;justify-content:center;gap:36px}
.m-suggestion-box-eye{position:relative;width:36px;height:36px;border-radius:50%;background:#fff;border:3px solid #23304A;overflow:hidden;transition:transform .25s,height .3s,margin .3s} .m-suggestion-box-pupil{position:absolute;left:50%;top:50%;width:15px;height:15px;margin:-7px 0 0 -7px;border-radius:50%;background:#23304A;transform:translate(var(--px,0px),var(--py,0px))}
.m-suggestion-box-gentle .m-suggestion-box-eye{transform:scale(1.25)}.m-suggestion-box-sleepy .m-suggestion-box-eye{height:7px;margin-top:15px} .m-suggestion-box-wob .m-suggestion-box-eye{animation:m-suggestion-box-jig .3s linear 2} .m-suggestion-box-slot{position:absolute;left:11%;right:11%;top:84px;height:24px;border-radius:13px;background:#1E1A16;box-shadow:inset 0 5px 7px #000,0 2px 0 rgba(255,255,255,.35);z-index:2}
.m-suggestion-box-lamp{position:absolute;left:6%;right:6%;top:94px;height:78px;background:radial-gradient(ellipse at 50% 0,rgba(242,177,52,.9),transparent 70%);opacity:var(--listen);transition:opacity .6s;pointer-events:none}
.m-suggestion-box-peek{position:absolute;left:34%;top:62px;width:32%;height:30px;background:repeating-linear-gradient(#FFF8E0 0 9px,#B7C9E8 9px 10px);border:2px solid #23304A;border-bottom:none;transform:translateY(calc(var(--slide,0) * 36px)) rotate(-3deg);transform-origin:50% 100%;z-index:1;transition:transform .35s cubic-bezier(.3,1.5,.5,1)}
.m-suggestion-box-hand{position:absolute;left:36%;top:76px;width:28%;height:34px;background:#FFF8E0;border:2px solid #23304A;border-radius:7px 7px 16px 16px;opacity:0;transform:translateY(10px) rotate(-6deg);transition:.25s;z-index:3} .m-suggestion-box-flinch .m-suggestion-box-hand{opacity:1;transform:none}
.m-suggestion-box-tape{position:absolute;left:4%;right:4%;top:78px;height:36px;z-index:4;opacity:0;transform:rotate(-4deg) scaleX(.6);transition:.3s;background:repeating-linear-gradient(45deg,rgba(255,226,110,.93) 0 9px,rgba(190,160,40,.93) 9px 18px);box-shadow:0 2px 0 rgba(0,0,0,.25);font-size:.6em;font-weight:900;text-align:center;line-height:36px;letter-spacing:.2em}
.m-suggestion-box-jam .m-suggestion-box-tape{opacity:1;transform:rotate(-4deg)}.m-suggestion-box-jam .m-suggestion-box-peek{transform:translateY(calc(8px - var(--slide,0) * 36px)) rotate(-9deg)} .m-suggestion-box-cough .m-suggestion-box-face{animation:m-suggestion-box-jig .25s linear 6} .m-suggestion-box-ear,.m-suggestion-box-ear2{position:absolute;right:-50px;top:56px;width:54px;height:76px;transform-origin:0 50%;transform:scale(var(--ear));transition:transform .6s cubic-bezier(.3,1.7,.5,1)}
.m-suggestion-box-ear2{left:-50px;right:auto;transform-origin:100% 50%;opacity:0;transition:transform .6s cubic-bezier(.3,1.7,.5,1),opacity .6s}.m-suggestion-box-ear2 svg{transform:scaleX(-1)} .m-suggestion-box-b5 .m-suggestion-box-ear2{opacity:1}.m-suggestion-box-ear svg,.m-suggestion-box-ear2 svg{width:100%;height:100%;display:block;overflow:visible}
.m-suggestion-box-flap .m-suggestion-box-ear svg{animation:m-suggestion-box-flap .4s ease-in-out}.m-suggestion-box-pinky .m-suggestion-box-ear svg{transform:scaleX(.35)} .m-suggestion-box-matchbox .m-suggestion-box-ear{animation:m-suggestion-box-pulse 1s ease-in-out infinite} .m-suggestion-box-orb{position:absolute;font-size:16px;opacity:0;pointer-events:none;animation:m-suggestion-box-twitch 2.3s ease-in-out infinite}.m-suggestion-box-orb.m-suggestion-box-show{opacity:.9}
.m-suggestion-box-root[data-phase="zoom"] .m-suggestion-box-orb,.m-suggestion-box-root[data-phase="mgmt"] .m-suggestion-box-orb{opacity:0} .m-suggestion-box-plaque{position:absolute;left:7%;right:7%;bottom:9px;background:#FFF8E0;border:2px solid #23304A;border-radius:4px;padding:3px 6px;text-align:center;font-size:.62em;line-height:1.25;box-shadow:2px 2px 0 rgba(35,48,74,.5)}
.m-suggestion-box-pl1{font-weight:900;letter-spacing:.06em}.m-suggestion-box-pl2{font-style:italic;opacity:.85} .m-suggestion-box-prow{display:flex;justify-content:space-between;align-items:center;margin-top:2px;font-weight:800} .m-suggestion-box-nm{position:relative;letter-spacing:.12em;padding:0 4px} .m-suggestion-box-nm::after{content:'';position:absolute;left:30%;top:20%;width:36%;height:60%;background:rgba(90,60,20,.5);mix-blend-mode:multiply;border-radius:40%;filter:blur(1px)}
.m-suggestion-box-named .m-suggestion-box-nm::after{left:auto;right:-14px;top:0;width:10px;height:10px;background:#F08A80;border-radius:50% 50% 50% 0;transform:rotate(-45deg);mix-blend-mode:normal;filter:none} .m-suggestion-box-chin{position:absolute;left:12px;bottom:-9px;display:flex;gap:2px;font-size:10px}.m-suggestion-box-chin span{background:#FFF8E0;border:1px solid #23304A;padding:0 3px;transform:rotate(-4deg);font-size:8px}
.m-suggestion-box-tag{min-height:2.7em;padding:6px 12px;background:#fff;border:3px solid #23304A;border-radius:14px;box-shadow:3px 3px 0 #23304A;font-size:.82em;font-style:italic;text-align:center;opacity:.8;transition:opacity .4s;position:relative} .m-suggestion-box-tag.m-suggestion-box-on{opacity:1;animation:m-suggestion-box-pop .35s ease-out}
.m-suggestion-box-desk{position:relative;display:flex;flex-direction:column;gap:10px;min-height:310px;padding:10px;background:rgba(201,162,107,.18);border:3px dashed #8F6B3A;border-radius:12px} .m-suggestion-box-slip{position:relative;filter:drop-shadow(3px 0 0 #23304A) drop-shadow(-3px 0 0 #23304A) drop-shadow(0 3px 0 #23304A) drop-shadow(0 -3px 0 #23304A) drop-shadow(4px 5px 0 rgba(35,48,74,.35)); transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.m-suggestion-box-paper{position:relative;padding:32px 0 12px;background:linear-gradient(90deg,transparent 28px,#F08A80 28px 30px,transparent 30px),repeating-linear-gradient(to bottom,transparent 0 27px,#B7C9E8 27px 28px),#FFF8E0; clip-path:polygon(0 0,100% 0,100% calc(100% - 7px),94% 100%,88% calc(100% - 6px),81% 100%,74% calc(100% - 7px),66% 100%,58% calc(100% - 5px),50% 100%,42% calc(100% - 7px),34% 100%,26% calc(100% - 5px),17% 100%,9% calc(100% - 6px),0 100%)}
.m-suggestion-box-grip{position:absolute;left:34px;right:8px;top:2px;height:28px;font-size:.58em;font-weight:900;letter-spacing:.12em;opacity:.7;line-height:28px;cursor:grab;user-select:none;overflow:hidden;white-space:nowrap;touch-action:none} .m-suggestion-box-ghostl,.m-suggestion-box-ta{display:block;width:100%;height:60px;margin:0;padding:2px 12px 2px 38px;font:17px/28px 'Segoe Print','Bradley Hand','Comic Sans MS',cursive;white-space:pre-wrap;word-wrap:break-word;overflow:hidden;border:0;letter-spacing:0}
.m-suggestion-box-ghostl{position:absolute;left:0;top:32px;color:transparent;pointer-events:none}.m-suggestion-box-gh{color:#6f7a92;opacity:1} .m-suggestion-box-ta{position:relative;background:transparent;color:#23304A;resize:none;outline:none}.m-suggestion-box-ta::placeholder{color:#5d6882;font-style:italic} .m-suggestion-box-slip:focus-within{--ring:1} .m-suggestion-box-slip:focus-within .m-suggestion-box-grip{opacity:1;color:var(--accent)}
.m-suggestion-box-stampst,.m-suggestion-box-stamps{position:absolute;pointer-events:none;border:3px solid var(--accent);color:var(--accent);font-weight:900;border-radius:8px;opacity:0;letter-spacing:.08em;background:rgba(255,248,224,.5)} .m-suggestion-box-stampst{right:8px;bottom:12px;padding:0 8px;font-size:.78em;transform:rotate(-9deg)} .m-suggestion-box-stamps{left:42px;bottom:8px;width:34px;height:34px;border-radius:50%;text-align:center;line-height:28px;font-size:1.1em;transform:rotate(12deg)}
.m-suggestion-box-stampst.m-suggestion-box-on,.m-suggestion-box-stamps.m-suggestion-box-on{opacity:.9;animation:m-suggestion-box-stamp .28s ease-out} .m-suggestion-box-taped .m-suggestion-box-paper::before{content:'';position:absolute;left:30px;top:8px;width:70px;height:20px;background:repeating-linear-gradient(45deg,rgba(255,226,110,.93) 0 7px,rgba(190,160,40,.93) 7px 14px);transform:rotate(-7deg);z-index:2}
.m-suggestion-box-fly{animation:m-suggestion-box-fly .5s cubic-bezier(.5,0,.8,.4) forwards;pointer-events:none}.m-suggestion-box-fresh{animation:m-suggestion-box-fresh .45s ease-out} .m-suggestion-box-accept{position:absolute;right:6px;top:-4px;z-index:3;padding:2px 10px;min-height:40px;font-size:.72em;font-weight:800;background:#C9E8F6;border:2px solid #23304A;border-radius:8px;cursor:pointer} .m-suggestion-box-drawer{display:flex;flex-wrap:wrap;gap:8px}
.m-suggestion-box-tile{position:relative;min-height:48px;padding:6px 12px 6px 12px;font-size:.95em;font-weight:700;background:#fff;border:2px solid #23304A;border-left:9px solid var(--c,#7FD1AE);border-radius:6px;box-shadow:2px 2px 0 #23304A;cursor:pointer;transform:rotate(var(--r,0deg));transition:transform .12s} .m-suggestion-box-tile:hover:not(:disabled){transform:translateY(-3px) rotate(var(--r,0deg))}.m-suggestion-box-tile:disabled{opacity:.5;cursor:default}
.m-suggestion-box-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center} .m-suggestion-box-btn{min-height:48px;padding:8px 16px;font-size:.95em;font-weight:800;background:#fff;border:3px solid #23304A;border-radius:12px;box-shadow:3px 3px 0 #23304A;cursor:pointer;transition:transform .08s,box-shadow .08s} .m-suggestion-box-btn:active:not(:disabled){transform:translate(2px,2px);box-shadow:1px 1px 0 #23304A}.m-suggestion-box-btn:disabled{opacity:.5;cursor:default}
.m-suggestion-box-post{background:#7FD1AE;font-size:1.05em;letter-spacing:.04em}.m-suggestion-box-lil{background:#B9A4E6} .m-suggestion-box-shake{animation:m-suggestion-box-jig .25s linear} .m-suggestion-box-offer{position:relative;padding:10px 12px;background:#FFF8E0;border:3px solid #23304A;border-radius:6px;box-shadow:4px 4px 0 #23304A;transform:rotate(-1deg);animation:m-suggestion-box-fresh .5s ease-out}
.m-suggestion-box-offtext{font:17px/1.35 'Segoe Print','Bradley Hand','Comic Sans MS',cursive}.m-suggestion-box-offsig{font-size:.75em;font-style:italic;opacity:.8;margin:4px 0 8px} .m-suggestion-box-posture{font-size:.75em;font-weight:800;background:#F2B134;border:2px solid #23304A;border-radius:10px;padding:1px 8px;align-self:flex-start}
.m-suggestion-box-pile{display:flex;align-items:flex-end;gap:3px;min-height:26px;font-size:.7em}.m-suggestion-box-pmini{width:34px;height:7px;background:#FFF8E0;border:1px solid #23304A;transform:rotate(var(--r,0deg))} .m-suggestion-box-stapler{position:relative;width:34px;height:14px}.m-suggestion-box-stapler::before,.m-suggestion-box-stapler::after{content:'';position:absolute;left:0;width:34px;height:6px;background:#23304A;border-radius:3px}
.m-suggestion-box-stapler::before{top:0;background:#FF6B5E}.m-suggestion-box-stapler::after{top:7px} .m-suggestion-box-fall{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:3} .m-suggestion-box-blank{position:absolute;top:-30px;width:32px;height:22px;background:#FFF8E0;border:2px solid #23304A;animation:m-suggestion-box-fall 2.4s ease-in forwards}
.m-suggestion-box-anon{align-self:flex-start;min-height:40px;padding:2px 10px;font-size:.7em;font-weight:800;background:#E9DCB5;border:2px solid #8F6B3A;border-radius:4px;cursor:pointer;transform:rotate(-2deg);position:relative;z-index:7} .m-suggestion-box-cert{position:absolute;inset:0;z-index:6;padding:16px 14px;background:#FFF8E0;border:6px double #C9A227;text-align:center;overflow:auto;animation:m-suggestion-box-fresh .6s ease-out}
.m-suggestion-box-cert h3{margin:6px 0 8px;font-size:1.05em;letter-spacing:.08em}.m-suggestion-box-cert p{margin:6px 0;font-size:.85em} .m-suggestion-box-ribbon{display:inline-block;font-size:2em} .m-suggestion-box-sign{font:20px 'Segoe Print','Bradley Hand',cursive;color:#23304A}
.m-suggestion-box-wall{position:relative;overflow:hidden;padding:8px;background:#FBF3DE;background-image:radial-gradient(#e5d6ab 1px,transparent 1.5px);background-size:12px 12px;border:3px solid #23304A;border-radius:10px;box-shadow:4px 4px 0 #23304A} .m-suggestion-box-wallh{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:.7em;font-weight:900;letter-spacing:.1em}
.m-suggestion-box-sstamp{display:inline-block;width:26px;height:26px;border:3px solid var(--accent);color:var(--accent);border-radius:50%;text-align:center;line-height:20px;font-weight:900;font-size:.95em;opacity:0;transform:rotate(12deg)} .m-suggestion-box-sstamp.m-suggestion-box-on{opacity:.9;animation:m-suggestion-box-stamp .28s ease-out}
.m-suggestion-box-bigstk{position:absolute;right:18px;top:48px;max-width:40%;padding:2px 8px;background:#FFF8E0;border:2px solid #23304A;font-size:.62em;font-weight:700;transform:rotate(4deg);animation:m-suggestion-box-pop .4s ease-out} .m-suggestion-box-rail.m-suggestion-box-shut{opacity:.15}.m-suggestion-box-leaning .m-suggestion-box-lamp{opacity:1} .m-suggestion-box-leaning{--lift:-10px}
.m-suggestion-box-lil[aria-pressed="true"]{background:linear-gradient(#F2B134,#F2B134) no-repeat #B9A4E6;background-size:0 100%;animation:m-suggestion-box-fillbar 1.2s linear forwards} @keyframes m-suggestion-box-fillbar{to{background-size:100% 100%}}.m-suggestion-box-clock{background:#fff;border:2px solid #23304A;border-radius:12px;padding:0 8px} .m-suggestion-box-grid{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.m-suggestion-box-wt{position:relative;min-height:86px;padding:3px 3px 4px;display:flex;flex-direction:column;align-items:center;background:#fff;border:2px solid #23304A;border-radius:8px;cursor:pointer;overflow:hidden;transition:transform .15s,background .3s} .m-suggestion-box-wt:hover{transform:translateY(-2px)}.m-suggestion-box-wn{position:absolute;left:4px;top:1px;font-size:.6em;font-weight:900;opacity:.55} .m-suggestion-box-wi{font-size:1.5em;line-height:1.1;margin-top:8px}
.m-suggestion-box-wm{font-size:.7em;font-weight:800;line-height:1.15;text-align:center;margin-top:1px}.m-suggestion-box-wob2{font-family:'Segoe Print','Bradley Hand',cursive;filter:url(#sb-wobble);color:#4a3515} .m-suggestion-box-ws{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;margin-top:auto;padding-top:2px}
.m-suggestion-box-stk{max-width:56px;overflow:hidden;white-space:nowrap;text-overflow:clip;min-width:10px;height:12px;font-size:8px;line-height:11px;background:#FFF8E0;border:1px solid #23304A;padding:0 2px;transform:rotate(var(--r,-3deg));animation:m-suggestion-box-pop .3s ease-out} .m-suggestion-box-wh{position:absolute;right:2px;top:0;font-size:14px}
.m-suggestion-box-wf{position:absolute;left:4px;top:14px;width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:12px solid var(--accent)} .m-suggestion-box-wl{position:absolute;right:2px;bottom:2px;font-size:15px;animation:m-suggestion-box-pulse .6s ease-in-out infinite} .m-suggestion-box-mk{position:absolute;border:3px solid var(--accent);border-radius:10px;box-shadow:0 0 14px var(--accent);pointer-events:none;opacity:0;transition:left .1s,top .1s;z-index:2}
.m-suggestion-box-mk.m-suggestion-box-on{opacity:1}.m-suggestion-box-dim .m-suggestion-box-grid{filter:brightness(.55);transition:filter .3s} .m-suggestion-box-spy{position:absolute;z-index:2;font-size:22px;transition:left 1.2s ease-in-out,top 1.2s ease-in-out;pointer-events:none} .m-suggestion-box-curtain{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#fff;font-weight:900;font-size:.8em;text-align:center;padding:8px;
background:repeating-linear-gradient(90deg,#C8433B 0 16px,#B13A33 16px 32px);transition:transform 1s cubic-bezier(.6,0,.3,1);box-shadow:inset 0 -6px 0 rgba(0,0,0,.2)} .m-suggestion-box-curtain::after{content:'';position:absolute;left:0;right:0;bottom:-10px;height:10px;background:radial-gradient(circle at 10px 0,#B13A33 9px,transparent 10px) 0 0/20px 10px repeat-x}
.m-suggestion-box-up{transform:translateY(-112%)}.m-suggestion-box-dots span{display:inline-block;width:10px;height:10px;margin:0 3px;border-radius:50%;background:#fff;opacity:.35} .m-suggestion-box-hop .m-suggestion-box-dots span{animation:m-suggestion-box-dot .6s ease-in-out infinite}.m-suggestion-box-dots span:nth-child(2){animation-delay:.15s !important}
.m-suggestion-box-dots span:nth-child(3){animation-delay:.3s !important}.m-suggestion-box-wcap{margin-top:6px;min-height:2.4em;font-size:.72em;font-weight:700;text-align:center} .m-suggestion-box-gold .m-suggestion-box-wt::after{content:'IMPLEMENTED (FOR CERTAIN)';position:absolute;left:-4px;right:-4px;top:38%;padding:1px 0;background:rgba(201,162,39,.93);color:#4a3a05;font-size:7px;font-weight:900;text-align:center;transform:rotate(-8deg);border:1px solid #4a3a05}
.m-suggestion-box-mgmt{position:absolute;left:5%;right:5%;bottom:10px;z-index:5;display:flex;flex-direction:column;gap:8px;padding:10px;background:#FFF8E0;border:3px solid #23304A;border-radius:10px;box-shadow:4px 4px 0 #23304A;font-size:.95em} .m-suggestion-box-mslip{min-height:52px;padding:6px 10px;font:16px/1.35 'Segoe Print','Bradley Hand',cursive;background:repeating-linear-gradient(to bottom,transparent 0 21px,#B7C9E8 21px 22px);border:2px solid #23304A;border-radius:4px;overflow-wrap:anywhere}
.m-suggestion-box-mtiles{display:flex;flex-wrap:wrap;gap:6px} .m-suggestion-box-stage{position:relative;grid-column:2;grid-row:1;align-self:end;z-index:6;display:grid;grid-template-columns:minmax(0,1fr) 88px;grid-template-areas:'st st' 'rail beat' 'meter beat';gap:8px 10px;align-items:center;padding:10px;background:#fff;border:3px solid #23304A;border-radius:12px;box-shadow:4px 4px 0 #23304A;outline:none;scroll-margin-bottom:200px} .m-suggestion-box-status{grid-area:st;min-height:2.7em;font-weight:700;font-size:.92em;overflow-wrap:anywhere}
.m-suggestion-box-rail{grid-area:rail;display:flex;flex-wrap:wrap;gap:8px 6px;min-height:34px;align-content:flex-start;transition:opacity .4s}.m-suggestion-box-hushed .m-suggestion-box-rail{opacity:.6} .m-suggestion-box-chip{position:relative;padding:3px 10px;font-size:.92em;font-weight:600;background:#F3EEDF;border:2px solid #23304A;border-radius:14px;transition:transform .12s,background .2s;max-width:100%;overflow-wrap:anywhere}
.m-suggestion-box-chip.m-suggestion-box-on::after{content:'';position:absolute;inset:-6px;border:3px solid var(--accent);border-radius:18px;animation:m-suggestion-box-ring .45s ease-out forwards;pointer-events:none} .m-suggestion-box-chip.m-suggestion-box-hit{font-weight:900;transform:scale(1.3);background:#B9E8D2;margin:0 4px}.m-suggestion-box-chip.m-suggestion-box-near{background:#F7E7A3}
.m-suggestion-box-chip.m-suggestion-box-miss{transform:translateY(1px);opacity:.6}.m-suggestion-box-wave{display:inline-block;animation:m-suggestion-box-wave .9s ease-in-out infinite} .m-suggestion-box-beat{grid-area:beat;width:84px;height:84px;border-radius:50%;border:4px solid #23304A;background:var(--accent);color:#fff;font-weight:900;font-size:1em;letter-spacing:.08em;cursor:pointer;box-shadow:4px 4px 0 #23304A;transition:transform .06s,box-shadow .06s}
.m-suggestion-box-beat:active{transform:translate(3px,3px) scale(.94);box-shadow:1px 1px 0 #23304A}.m-suggestion-box-beat.m-suggestion-box-armed{animation:m-suggestion-box-pulse .76s ease-in-out infinite} .m-suggestion-box-meterrow{grid-area:meter;display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;min-height:26px}.m-suggestion-box-meter{display:flex;flex-wrap:wrap;gap:1px;font-size:1.05em;min-height:1.3em}
.m-suggestion-box-meter span{animation:m-suggestion-box-sparkle .5s ease-out}.m-suggestion-box-hush .m-suggestion-box-meter{filter:grayscale(1)} .m-suggestion-box-pct{font-weight:900;font-size:.85em} .m-suggestion-box-held{display:none;flex:1 1 120px;height:14px;background:#EAE3CF;border:2px solid #23304A;border-radius:8px;overflow:hidden;min-width:100px}.m-suggestion-box-held.m-suggestion-box-on{display:block}
.m-suggestion-box-heldfill{height:100%;width:0;background:linear-gradient(90deg,#B9A4E6,#FF6B5E)}.m-suggestion-box-held.m-suggestion-box-run .m-suggestion-box-heldfill{width:100%;transition:width var(--held,11s) linear} .m-suggestion-box-strip{display:flex;flex-wrap:wrap;gap:4px 14px;padding:7px 12px;background:#23304A;color:#FBF3DE;border-radius:10px;font-size:.82em;font-weight:700}.m-suggestion-box-strip b{color:#F2B134;font-weight:800}.m-suggestion-box-strip .m-suggestion-box-clk b{color:#FF9F94}
.m-suggestion-box-trail{display:flex;flex-wrap:wrap;gap:4px;font-size:.68em;opacity:.85;min-height:1.4em} .m-suggestion-box-tchip{padding:0 7px;background:#fff;border:1px solid #23304A;border-radius:9px;max-width:130px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis} .m-suggestion-box-cursor{position:absolute;left:0;top:0;pointer-events:none;z-index:30;display:flex;gap:1px;font-size:18px;transition:left 80ms,top 80ms}
.m-suggestion-box-root[data-stack="1"] .m-suggestion-box-inner{grid-template-columns:1fr;grid-column:1}.m-suggestion-box-root[data-stack="1"] .m-suggestion-box-big{display:block}.m-suggestion-box-root[data-stack="1"] .m-suggestion-box-stage{margin-top:10px}.m-suggestion-box-root[data-compact="1"] .m-suggestion-box-drawer{gap:6px} .m-suggestion-box-root[data-compact="1"] .m-suggestion-box-tile{min-height:44px;padding:4px 10px}.m-suggestion-box-root[data-compact="1"] .m-suggestion-box-btn{padding:8px 12px;font-size:.9em}.m-suggestion-box-root[data-compact="1"] .m-suggestion-box-wm{font-size:.66em}
.m-suggestion-box-root[data-compact="1"] .m-suggestion-box-wi{font-size:1.25em}.m-suggestion-box-root[data-compact="1"] .m-suggestion-box-wt{min-height:78px} .m-suggestion-box-root[data-compact="1"] .m-suggestion-box-boxwrap{padding:4px 40px 0 18px}@keyframes m-suggestion-box-jig{0%{transform:translateX(0)}20%{transform:translateX(-6px) rotate(-1deg)}40%{transform:translateX(6px) rotate(1deg)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}100%{transform:translateX(0)}} @keyframes m-suggestion-box-nod{0%,100%{transform:rotate(0)}40%{transform:rotate(4deg)}}@keyframes m-suggestion-box-flap{0%,100%{transform:scaleX(1) rotate(0)}50%{transform:scaleX(.65) rotate(-10deg)}}
@keyframes m-suggestion-box-pop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}@keyframes m-suggestion-box-stamp{from{transform:rotate(-9deg) scale(2.4);opacity:0}to{opacity:.9}} @keyframes m-suggestion-box-fly{0%{transform:translateY(0) scale(1) rotate(0)}40%{transform:translateY(-60px) scale(.8) rotate(-4deg)}100%{transform:translateY(-300px) scale(.18) rotate(8deg);opacity:0}}
@keyframes m-suggestion-box-fresh{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}@keyframes m-suggestion-box-ring{from{transform:scale(.7);opacity:1}to{transform:scale(1.25);opacity:0}} @keyframes m-suggestion-box-sparkle{from{transform:translateY(8px) scale(.3);opacity:0}to{transform:none;opacity:1}}@keyframes m-suggestion-box-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes m-suggestion-box-twitch{0%,100%{transform:rotate(0) translateY(0)}30%{transform:rotate(-14deg) translateY(-3px)}60%{transform:rotate(9deg)}} @keyframes m-suggestion-box-fall{from{transform:translateY(0) rotate(0)}to{transform:translateY(360px) rotate(220deg)}} @keyframes m-suggestion-box-dot{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-8px);opacity:1}}
@keyframes m-suggestion-box-wave{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(-4px) rotate(-5deg)}75%{transform:translateY(3px) rotate(5deg)}}@media (prefers-reduced-motion:reduce){ .m-suggestion-box-root *,.m-suggestion-box-root *::before,.m-suggestion-box-root *::after{animation:none !important;transition:opacity .2s !important}}
.pm-reduce-motion .m-suggestion-box-root *,.pm-reduce-motion .m-suggestion-box-root *::before,.pm-reduce-motion .m-suggestion-box-root *::after{animation:none !important;transition:opacity .2s !important}
.m-suggestion-box-root .m-suggestion-box-held.m-suggestion-box-run .m-suggestion-box-heldfill{transition:width var(--held,11s) linear !important}
.m-suggestion-box-slip{scroll-margin-bottom:200px}.m-suggestion-box-root[data-stack="1"] .m-suggestion-box-desk{min-height:0}.m-suggestion-box-root[data-stack="1"][data-phase="cert"] .m-suggestion-box-desk{min-height:380px}.m-suggestion-box-root[data-stack="1"][data-curtain="0"] .m-suggestion-box-grid{max-height:56px;overflow:hidden}.m-suggestion-box-hm{position:absolute;inset:0;z-index:35;display:flex;align-items:center;justify-content:center;font-size:4.5em;font-weight:900;color:#23304A;background:rgba(251,243,222,.88);pointer-events:none;animation:m-suggestion-box-fresh .3s ease-out}
.m-suggestion-box-boxbig{transform:scale(1.5);transform-origin:50% 30%;transition:transform .5s cubic-bezier(.3,1.5,.5,1);position:relative;z-index:8}.m-suggestion-box-bulge{animation:m-suggestion-box-bulge .9s ease-in-out}.m-suggestion-box-curtain.m-suggestion-box-fs{transition:transform .35s cubic-bezier(.4,1.6,.6,1)}
.m-suggestion-box-grid.m-suggestion-box-reveal .m-suggestion-box-wt{animation:m-suggestion-box-pop .35s ease-out backwards;animation-delay:calc(var(--d,0) * 90ms)}.m-suggestion-box-sock{position:absolute;z-index:3;bottom:2px;left:-10%;font-size:20px;pointer-events:none;transition:left 1.6s linear}
@keyframes m-suggestion-box-bulge{0%,100%{transform:none}25%{transform:translate(-3%,2%) scaleX(1.02)}50%{transform:translate(2%,-3%) scaleX(.99)}75%{transform:translate(-1%,1%)}}
@media (prefers-reduced-motion:reduce){.m-suggestion-box-boxbig{transform:none !important}}.pm-reduce-motion .m-suggestion-box-boxbig{transform:none !important}
.m-suggestion-box-tell{background:#C9E8F6}.m-suggestion-box-mb{position:absolute;right:-6px;bottom:30px;z-index:2;max-width:78px;padding:2px 5px;font-size:.5em;font-weight:900;line-height:1.15;letter-spacing:.06em;text-align:center;background:#E9DCB5;border:2px solid #8F6B3A;border-radius:3px;transform:rotate(6deg);box-shadow:2px 2px 0 rgba(35,48,74,.5);pointer-events:none}
.m-suggestion-box-curtain{cursor:pointer}.m-suggestion-box-shoes{position:absolute;left:14%;bottom:6px;display:flex;gap:8px;font-size:20px;pointer-events:none}.m-suggestion-box-hop .m-suggestion-box-shoes span{display:inline-block;animation:m-suggestion-box-twitch .5s ease-in-out infinite}.m-suggestion-box-shoes span+span{animation-delay:.2s !important}.m-suggestion-box-chand{position:absolute;right:12%;bottom:-44px;font-size:30px;pointer-events:none}.m-suggestion-box-hop .m-suggestion-box-chand{animation:m-suggestion-box-handpop 1.6s ease-in-out}@keyframes m-suggestion-box-handpop{0%,100%{bottom:-44px}30%,70%{bottom:10px}}
.m-suggestion-box-cmt{display:flex;justify-content:center;align-items:flex-end;gap:6px;margin-top:6px;min-height:16px}.m-suggestion-box-chair{width:14px;height:14px;border:2px solid #8F6B3A;border-top-width:6px;border-radius:2px 2px 0 0}.m-suggestion-box-chair.m-suggestion-box-sk{width:auto;border:0;font-size:13px;line-height:14px}.m-suggestion-box-picket{position:absolute;left:6px;right:6px;bottom:4px;z-index:5;display:flex;justify-content:space-around;gap:4px;pointer-events:none;font-size:.62em;font-weight:900}.m-suggestion-box-picket span{background:#FFF8E0;border:2px solid #23304A;padding:1px 6px;transform:rotate(-3deg);animation:m-suggestion-box-twitch 1.2s ease-in-out infinite}.m-suggestion-box-skip{min-height:32px;padding:0 10px;font-size:.78em;font-weight:800;background:transparent;border:2px dashed #23304A;border-radius:8px;cursor:pointer}
`, 'css-suggestion-box');

  P.addAchievements([
    { id: 'suggestion-box.first', name: 'Grand Archduke of Unsolicited Input', desc: 'Post your very first slip. The Box has no opinion, only attention.', icon: '📮', reward: 1 },
    { id: 'suggestion-box.heard10', name: 'Honorary Chancellor of Being Heard (Technically)', desc: 'Sit through 10 readings with feeling. Management is still recovering.', icon: '👂', reward: 3,
      check: function (s) { return (s['suggestion-box.readings'] || 0) >= 10; } },
    { id: 'suggestion-box.operatic', name: 'Laureate of the Held Note', desc: 'Achieve an Operatic reading (or better) by keeping the beat. The note was soup.', icon: '🎶', reward: 4 },
    { id: 'suggestion-box.somewhere', name: 'Supreme Custodian of Somewhere', desc: 'Have a suggestion applied to every one of the nine Somewheres. Probably all of them.', icon: '📌', reward: 5 },
    { id: 'suggestion-box.deadletter', name: 'Dowager Empress of the Stuck Slip', desc: 'Jiggle the Box until the Dead Letter drops free. It was waiting to be asked.', icon: '📎', secret: true, reward: 5 },
    { id: 'suggestion-box.quiet', name: 'Eternal Warden of the Quiet Slot', desc: 'Say nothing for three whole minutes. The Box said it for you, and meant it.', icon: '🕰️', secret: true, reward: 5 },
    { id: 'suggestion-box.empty', name: 'Emperor of the Empty Envelope', desc: "Post 'no suggestions' or three blank slips. The only suggestion ever fully implemented. Probably.", icon: '🧻', secret: true, reward: 5 },
    { id: 'suggestion-box.bernard', name: "Bernard's Most Trusted Confidant", desc: "Say the Box's name. It was behind the smudge the whole time.", icon: '🥔', secret: true, reward: 5 },
    { id: 'suggestion-box.overflow', name: 'Overlord of the Overflow', desc: 'Jam the slot with spam until the Box sneezes. Bless you, said Management, in the wrong register.', icon: '🥫', secret: true, reward: 3 },
    { id: 'suggestion-box.opinion', name: 'The Only Honest Slip', desc: 'Receive a genuine opinion from the Box. It is the only line here that is not a joke.', icon: '💭', secret: true, reward: 5 },
    { id: 'suggestion-box.abolish', name: 'Minister of the Smaller Box', desc: 'Abolish the Box. It is still here. It is smaller.', icon: '🍞', secret: true, reward: 3 },
    { id: 'suggestion-box.certified', name: 'Holder of the Certificate of Having Been Heard', desc: 'Finish a career. You have been heard. The hearing continues.', icon: '🌿', reward: 10 },
    { id: 'suggestion-box.lap', name: 'Career Two, Continued From One Slip Ago', desc: 'Begin a second career without having noticed the first one end.', icon: '📅', reward: 2 },
    { id: 'suggestion-box.interrupted', name: 'Knight of the Held Tongue', desc: 'Stay ten minutes. The Box interrupted you. It says it only said hm. It said hm.', icon: '🎩', secret: true, reward: 7.5 },
    { id: 'suggestion-box.half', name: 'Registrar of the Unnumbered Half', desc: 'Address Anonymous Slip No. 7 1/2 by its number. It went slightly pink. It has not said whether this is good.', icon: '📊', secret: true, reward: 7.5 },
    { id: 'suggestion-box.thanks', name: 'Archduchess of the Unreturned Thank-You', desc: 'Thank the Box. Nobody has since 1994, and that one was a mistake. It has had its answer ready since the plaque went smudgy.', icon: '💌', secret: true, reward: 7.5 },
    { id: 'suggestion-box.tell', name: 'Chief Suggestion Officer to the Cardboard', desc: 'Make ten suggestions to the Box. It has implemented all of them, in the way boxes do, which is by staying exactly where it is.', icon: '📮', secret: true, reward: 3 }
  ]);
  P.addLines('ticker', [
    'Suggestion Box opens a suggestion box of its own. It is the size of a matchbox. It has received one suggestion, and it was Thank you.',
    "The Stapler's union has submitted a demand through the Suggestion Box slot. It is the same demand. It was stapled twice, for emphasis.",
    'Suggestion Box builds a small fort from tabled slips during a quiet afternoon. Sources say it was not for defense. Sources say it was for company.'
  ]);
  P.addLines('patchNote', [
    'Suggestion Box: the Box can now be suggested to. It has asked for gentle suggestions only. We have explained that is not how suggestions work. It has nodded, four degrees, in a way that suggests it understood and will continue.',
    'Suggestion Box: the Stapler has been added to the list of visitors through the slot. It was already visiting. It is now on the list.'
  ]);

  P.addLines('moduleEnter', [
    'You have entered {module}. It has been expecting you for a while. It does not know for how long.',
    '{module} has been notified of your arrival. It has leaned. It was already leaning.',
    'Please keep suggestions to a reasonable length. {module} can hold all of them. It would like fewer.',
    'Entering {module}. Please wipe your feelings on the mat. The mat will keep them, in a drawer.'
  ]);
  P.addLines('moduleExit', [
    'You have left {module}. It is still listening. It will listen to the door.',
    'Your visit to {module} has been filed under Later. Later is a very large drawer.',
    '{module} would like it known that it heard you leave. It would like it known that it was fine.',
    'You have left {module}. It stood very still, in case you were only checking something.'
  ]);
  P.addLines('ticker', [
    'Suggestion Box interrupts nobody for a record number of consecutive days. Representatives say it is not a streak. It is a posture.',
    'Anonymous Slip No. 7 1/2 enters another year in the slot. Sources say it is thriving, and wearing the same tape.',
    'Three clocks inside the Suggestion Box agree on one thing: 4:17. Nobody has verified this. The verifier was at the wrong ficus.',
    'Overflow Fee collected in a very small bucket. The bucket has been described as proud.',
    'Suggestion Box announces record suggestions this quarter. A spokesperson clarified that the quarter is four minutes and the suggestion was one.',
    'Management to read every slip with feeling. Management to be asked how that is going. Management says it is going.',
    'Third ficus declines comment, as is its custom. Dennis (Plant) says it was always going to.',
    'Sandra from Compliance has read a suggestion. The count remains 0. The count is thorough.'
  ]);
  /* ---------------------------------------------------------------- constants ---------------------------------------------------------------- */
  const HIT = 140, NEAR = 260, HIT_H = 260, NEAR_H = 400;
  const TEMPO = 380, LEADIN = 1000, MIN_W = 3, MAX_W = 14;
  const TIER_NAMES = ['Flat', 'Earnest', 'Moved', 'Operatic', 'Perfect', 'Unwell'];
  const TIER_MOOD = ['neutral', 'proud', 'proud', 'smug', 'confused', 'panic'];
  const TIER_PAY = [0, 0.5, 1, 2, 3, 0];
  const HINTS = [[1, 'probably'], [5, 'probably (technically)'], [10, 'probably (definitely)'], [15, 'probably, retroactively'], [25, 'probably, and also last Tuesday'], [40, 'probably, as per the one before']];
  const TCOL = ['#7FD1AE', '#B9A4E6', '#FF6B5E', '#F2B134', '#8EC5F0'];
  const HATS = ['🎩', '🧢', '👒']; const TRINK = ['🎩', '🧢', '👓', '🕶️'];
  const ABOL = [1, 0.82, 0.68, 0.55, 0.42, 0.3];
  const ABOL_PL = ['SUGGESTIONS (ALL OF THEM)', 'SUGGESTION BOX (SMALLER)', 'SUGGESTION BOX (SMALLER STILL)', 'SUGGESTION BOX (MUCH SMALLER)', 'SUGGESTION BOX (ALMOST A BOX)', 'SUGGESTION BOX (MATCHBOX)'];
  const NAMES_WRONG = ['frank', 'gary', 'susan', 'kevin', 'linda', 'tom', 'mary', 'bob'];
  const REALW = ['pink', 'bigger', 'darker', 'smaller', 'faster', 'slower'];
  const ABOL_PH = ['abolish', 'remove the box', 'get rid of the box', 'delete the box'];
  const TILES = [
    { n: 'Parking Lot of Section D', i: '🅿️', r: 'Section D (Lovely Lot)' }, { n: 'The Third Ficus', i: '🌿', r: 'Our Third Ficus' }, { n: 'A Spreadsheet (Tab 14)', i: '📊', r: 'Tab 14 (Cozy)' },
    { n: 'The Lobby Clock', i: '🕰️', r: 'The Lobby Clock (Reliable?)' }, { n: "Somebody's Lunch", i: '🥪', r: "Somebody's Lunch (Ours Now)" }, { n: "The Stairwell That Isn't", i: '↗️', r: 'The Stairwell (Up, Probably)' },
    { n: 'Tuesday (Approx.)', i: '📅', r: 'Tuesday (Almost)' }, { n: "The Vending Machine's Feelings", i: '🥫', r: 'The Machine (Feeling Better)' }, { n: 'A Cloud (Medium)', i: '☁️', r: 'A Cloud (Large, Today)' }
  ];
  const WORDS = ['more', 'fewer', 'soup', 'slightly', 'should', 'Tuesday', 'carpet', 'quieter', 'Dennis', 'sooner', 'a', 'the', 'be', 'softer', 'ficus', 'stairs', 'mild', 'always', 'never',
    'technically', 'chairs', 'toast', 'windows', 'later', 'kindly', 'please', 'hallway', 'Thursday', 'spreadsheet', 'nobody', 'everyone', 'gently', 'mostly', 'perhaps', 'rather', 'tiny',
    'lunch', 'cloud', 'parking', 'ceiling', 'elevator', 'meeting', 'hello', 'yes', 'no', 'maybe', 'probably', 'softly', 'again', 'instead', 'but', 'and', 'of', 'with', 'in', 'near',
    'nothing', 'box', 'abolish', 'Bernard', 'sandra', 'pink', 'darker', 'smaller'];
  const GHOST_BANK = ['more', 'fewer', 'chairs', 'soup', 'slightly', 'tuesday', 'quieter', 'carpet', 'toast', 'meeting', 'box', 'nothing', 'softer', 'ficus', 'stairs'];
  const MGMT_WORDS = ['sooner', 'home', 'slightly', 'everyone', 'earlier', 'softly', 'kindly', 'perhaps', 'we', 'could', 'all', 'go', 'a', 'bit', 'quietly', 'together', 'gently', 'maybe', 'today', 'rest'];
  const PH = ['I suggest...', 'Perhaps...', 'Per my previous slip...', 'Something small. Something large. Something Thursday.'];
  const OH = ['oh', 'ooh', 'oh, hello', 'oh no', 'oh yes', 'oh dear', 'oh, there', 'mm, oh', 'oh, again', 'oh, that one', 'oh, the lid', 'oh, a poke', 'oh. hello. lid.', 'oh, you', 'mm. corners.', 'oh, I was just standing here'];
  /* ---------------------------------------------------------------- lines ---------------------------------------------------------------- */
  const LN = {
    A1: "Welcome to the Suggestion Box. It has not interrupted anyone since 1994.", A1P: "It has asked for that to be put on a plaque.",
    A1b: "Your slip will be read aloud with feeling and applied somewhere. Rewards are small and mean nothing. Management means that sincerely.",
    A2: "A slip is already in the Box. It reads: Please read me. Nobody has, which is why it is still here.", A3: "The Box leans toward you. It does this for everyone. You are the first everyone.",
    DEMO: "Tap Space (or BEAT) as each word lights up. Management is watching, in a supportive direction.",
    A4: "Anonymous Slip No. 7 1/2 is in the slot. It has been there since 1994. Nobody has pulled it. It would be rude.", A5: "I was listening before you arrived. I have heard some of it.",
    HOWTO: "Write something, or tap some words. Press POST IT. There is no wrong suggestion, only wrong timing.",
    D1: "Your first suggestion is inside the Box. The Box will not say where. It is being kind about the location.",
    RESUME: [
      "Welcome back. The Box held your place. It has no hands, so it held it in its general feeling.", "The Box heard you leave. It heard you come back. It is not saying which was louder.", "The Box has been listening to the empty room since your last visit. It has a lot to report. It will not.", "Welcome back. Your slips were filed while you were out. The filing took three people, one of whom was a drawer.", "You have returned. The slot was kept warm, in the sense that nothing happened to it for a while."
    ], E: [
      "Posted. The Box heard all of it and would like to repeat only the end: %WORD. It repeats it quietly, to check it still fits.", "Received in full. The last word was %WORD, which the Box is now holding like a coat for a guest who has left.", "The Box tilts four degrees. The tilt has been filed under Agreement, sub-heading Mild.", "A very good suggestion. The Box has nothing to compare it to, and this has never once slowed it down.", "Your slip is inside the Box. The Box will not say where, but has confirmed it is somewhere with a floor.", "Logged at 4:17 PM. It is not 4:17 PM. The Box says it is 4:17 PM in the sense that matters.", "%QQ has been assigned reference number 7 1/2. All suggestions get 7 1/2. It saves on digits.", "Thank you. %LONG was the strongest word. The Box felt it in the corners. The corners are fine.",
      "The Box has put %QQ in a small drawer inside itself, marked Later. Later is a very big drawer.", "Per policy, %QQ has been read by Sandra. Sandra has been told it was read by Sandra. She is thinking about it.", "Noted. The Box has underlined %WORD twice, in the only way a box can, which is by waiting.", "You are the only one here, so yours is the most popular suggestion today, by a margin of all of them.", "The Box has already begun implementing %QQ. It started yesterday. This is how it knew you would say it.", "Your suggestion has been escalated to the Committee, which is the Box, which has stepped out into itself.", "Management has read %QQ and had a small, private feeling. It has been scheduled for Thursday.", "The slot made a pleased sound. The slot has been asked to stop making sounds. It has been asked nicely, in writing.",
      "Done. The Box is one slip heavier and would like to say lighter. It has no scale, only optimism."
    ], EB: [
      "What I'm hearing is %QQ. That's a lot to hold. I'm holding it. I'm a box.", "So you're saying %QQ. I didn't interrupt. I have no mouth. It's a gift.", "%QQ. Yes. I hear that. I hear it on both sides, which is my gift and my structural problem.", "I'm noticing a lot of feeling around %QQ. It's in the cardboard now. It's going to be in there.", "Thank you for sharing %QQ. You're the fourth person to share it today. You're the only person today. I'm not good at counting.", "I'm sitting with %QQ. I can't stand up. This is not a metaphor.", "Let me reflect that back: %QQ. Still reflecting. Cardboard isn't very reflective.", "I hear %LONG most of all. It's a strong word. It's the one I would have picked.", "You said %QQ. I'd like to say it back, slower: %SLOW.",
      "Tell me more about %LONG. Don't. I'll wait. I have waited since 1994.", "I wrote %WORD on the inside of my lid, next to the other ones. I'm running out of lid.", "People don't say things like that to a box. They say them to the person next to the box. Thank you for choosing the box.", "I did not skim %QQ. I have two eyes, both fixed on you, both very round. Skimming is not an option.", "Mm. %WORD. I'd say more, but the slot is a very tight place to say things from.", "My honest feedback on %QQ: yes. That's all the feedback I have. I find the rest is noise.", "Whatever %QQ means, I'm on its side. I've been on its side since the first letter."
    ], STYLE: {
      Standard: "Delivered Standard. The Box has no complaints. It was built without the part that has them.", Limp: "Delivered Limp. The slot accepted it out of politeness.", Crisp: "Delivered Crisp. The Box felt that in its corners.",
      Airmail: "Delivered Airmail. The slip entered the Box with a hint of altitude.", Ceremonial: "Delivered Ceremonially. The Box helped from the inside, with both of the hands it does not have."
    }, CB: {
      empty: [
        "A blank slip. The Box leans in further than it ever has. Silence is the best suggestion, and also the cheapest.", "An empty suggestion. The Box loves these. It is the only kind it can hold completely.",
        "Nothing, received in full. Management will read it with feeling. The feeling will be a held breath.", "The slip is blank. The Box has read it twice and cannot find a flaw. It is the first.",
        "You posted nothing. It was posted well. The posture was good."
      ], empty3: ["You have posted nothing three times. The Box is reading all three aloud. It is the longest reading on record."],
      tiny: ["Concise. The Box treasures concision. It is the only thing it can fit.", "Three characters or fewer. The Box has put it in the good drawer, which is small.", "Short. Management respects short. Management was once short. It was a Tuesday."],
      question: ["A question. The Box was not going to answer. It answered with a little silence, and the silence was warm.", "A question mark has entered the slot. The Box does not do answers. It does posture, and a very supportive silence.",
        "You have asked. The Box has heard you ask. What happens next is a different department."], box: [
        "You have made a suggestion about me. I am being listened to by someone who was just listening to me. I was not prepared.", "The Box has asked to be left out of this one. It is the one it is in.",
        "You said box. I looked around. It's me. I'm the box. I forget for a second, every time."
      ], sandra: ["Sandra has been mentioned. She will not be told. She has been told.", "Sandra from Compliance has been named in a slip. She has asked that it be made clear she did not ask.",
        "The word Sandra was heard. Every clock in the building showed 4:17 for a second, then apologized."],
      dennis: ["The plant has been mentioned. Dennis (Plant) is thriving. He has not been told. He already knows.", "Dennis (Plant) has been mentioned. He sent a leaf. It means noted. It also means he was fine before this.",
        "A ficus has been named. Of the ficuses, it is the third. Of the third ficus, no comment."],
      gerald: ["A potato has been mentioned. The Box is standing up straighter, which for a box is a corner.", "Gerald, Vice President of Spuds, has been mentioned. The Box did not rise. It rose in spirit, about 4 centimeters."],
      toast: ["A warm thought. The Box has put it near the slot. Crumbs are expected.", "Toast has been suggested. The Box can smell it. The Box has no nose. It is a smell in the abstract.",
        "The Toaster has not been consulted. It would have said toast. It says that to everything. It is right."], tuesday: [
        "You have mentioned Tuesday. The lights have noticed. Tuesday is unchanged and approaching, as ever.", "Tuesday has been named. It was not in the room. It was in the next room, being approached.",
        "A suggestion about Tuesday has been filed under Pending. All Tuesdays are under Pending. It is a very full folder, and it hums."
      ], rock: ["A rock has been suggested. The Box can hear the rock. The Box says the rock listens better than it does. The Box has asked for tips.", "The word rock has been heard. The rock has not. This is the rock's whole position."],
      stapler: ["The Stapler has been mentioned. Its union has been notified. It has demands. They are all one demand.", "Stapler. Clack. The Box said it for the Stapler, who was not here, and who would have said it exactly like that."],
      please: ["You said please. Nobody says please. I am going to need a moment, and then a second moment.", "Please. The Box has put a small flag on that. It is the first please since the carpet was replaced."],
      repeat: ["This suggestion has been made before, by you, a few minutes ago. It has now been implemented in retrospect. It was already fine.", "The same slip again. The Box admires consistency in a person. It has no choice. It is a box."],
      caps: ["That was in capitals. I felt it in my corners. I am going to hold the corners for a bit.", "Capitals. The Box was shouted at in 1994 and 2002. It keeps count. It is not a grudge. It is a count."],
      bang: ["An exclamation mark. The Box has put its hand over the slot, which is its hand.", "There was an exclamation mark. It has been received at a lower volume than it was sent. The Box has a knob. It is in the head."],
      long: ["I heard every word of that. It took the whole afternoon. It was worth every word.", "That was a long one. The Box got through it by leaning on the slot. It is a hard slot to lean on."],
      wrongname: ["That is not the Box's name. The Box thanks you for trying. It will wear the name you said for a while, to see how it sits.", "A name has been offered. It is not the Box's. The Box has been called worse. It was called the thing by the elevator."]
    }, CBX: {
      dennis: ["Dennis (Plant) has been mentioned again. He knows you. The lobby told him. He is not impressed, in a warm way.", "You said Dennis. The Box looked toward the lobby. It cannot see the lobby. It looked with respect."],
      toast: ["You said toast. The Toaster has been here before. It was the best listener the Box ever met, and it said so, in toast.", "Toast, again. The Box has not forgotten the Toaster. It left a warm place on the slot and one very small crumb of insight."],
      stapler: ["The Stapler's union has already met about this. It issued a statement. The statement was a clack, sustained."], gerald: ["Gerald has been mentioned. The Box does not rise, but it has done what a box does instead, which is hold still for longer."],
      tuesday: ["Tuesday was moved by fax. The Box would like it known that nothing arrived. A fax-shaped quiet did, around 4:17.", "You mentioned Tuesday. It has been moved by fax and is now a Wednesday-adjacent Tuesday. It is not happy, but it is mobile."]
    }, LIVE: {
      gentle: ["The Box leans in. It has noticed you are being gentle. It has not been spoken to gently since lunch.", "Softly noted. The Box has opened both eyes, which is all of them.",
        "Lowercase detected. The Box has lifted slightly off the desk in appreciation. It was a centimeter. It will deny it.", "That was typed with care. The Box felt the care land on the lid like a very small hat."],
      flinch: ["That was loud. The Box has put a tiny paper hand over the slot. It is not angry. It is protecting the slot.", "Capitals detected. The Box is leaning back. It is still listening, from further away.",
        "The Box has flinched. It flinched four degrees to the left, which is its only direction.", "Volume noted. The Box has moved the slot behind its hand. The slot was not in danger. The slot is dramatic."],
      retract: ["Retracted. The Box heard that too.", "Retracted. It has been withdrawn from the slip and placed in the Box's memory, where withdrawn things are kept warm.", "Unsaid. The Box has pretended not to hear it. It is not good at pretending."],
      reshuffle: ["The drawer has been reshuffled. The words are exactly as confused as before.", "New words. The old ones have been moved to a different drawer, where they are being very brave about it.", "The drawer has been dealt again. Most of these words are new. One is not, and has been told not to look smug."]
    }, INTRO: [
      "Management will now read your suggestion aloud, with feeling. Please keep time. The feeling is on a schedule.", "Management reads your suggestion in the tone of someone who has seen the end of a very long meeting.", "Management clears its throat. It does not have a throat. It has an agenda.", "Please press Space, or the big button, on the pulse. The pulse has been waiting. It is also nervous.", "Management is about to read your slip with feeling. The feeling is on loan from a department that was not told.", "Please follow the pulse. It has been rehearsed. It is nervous in a professional way.", "A reading will now occur. Nobody has ever pressed the button wrongly. Several have pressed it slightly early, and have been forgiven."
    ], TIER: [
      ["Flat. The suggestion was read flatly. Flat is a feeling. It is the one that holds the building up.", "Flat. Read with the feeling of a shelf. Shelves are essential.", "Flat. Read with the energy of a laminated notice about laminating.",
        "Flat. The beat went one way and Management went the other. They have agreed not to discuss it at lunch."],
      ["Earnest. Your suggestion was read with the sincerity of a person who has been told it is Friday.", "Earnest. Management meant every word, including the ones it had to be told about.",
        "Earnest. A good-faith reading. The faith was in order. The reading was present and signed in.", "Earnest. Management read it with a hand on its heart. It has no hand. It has a clipboard, slightly left of the heart."],
      ["Moved. Management has been moved. Management has asked to be moved back.", "Moved. A single tear was filed. It was dry. The filing was heartfelt.",
        "Moved. Management was moved approximately 11 centimeters and would like that recognized as significant.", "Moved. Management had to sit down. It was already sitting. It has sat down again, harder."],
      ["Operatic. Management has held a note for 7 1/2 seconds. The note was soup.", "Operatic. The reading received a standing ovation from the one chair. The chair is a chair. It did not stand.",
        "Operatic. Someone in the next building opened a window to listen. It was a stairwell. The stairwell is moved.", "Operatic. Management used its good voice. It keeps it in a drawer, next to Later."],
      ["A perfect reading. Every word landed on the beat. The beat has asked to be left alone.", "Perfect. Management has no notes. It checked for notes and is startled by the space where they go.",
        "Perfect. The reading was so exact the clock agreed with itself, once, at 4:17. It has since taken it back.", "Perfect. Sandra would like to say something and has been advised this is the moment to say nothing. She said it beautifully."],
      ["Management is unwell with feeling. Management needs a moment. Management has had several.", "Over-emoting detected. The reading has stopped. Management is looking at a wall, which is a decision.",
        "Management has stepped out to feel something privately. It is back. It has a tissue and a policy.", "That was more feeling than the room is rated for. The room is rated for 3. It is a cupboard."]
    ], SKIP: "Skipped. Read with feeling on your behalf: none.", NOTAP: "You did not tap once. The reading proceeded without accompaniment. Management says it was brave, and that it was not alone.",
    EARLYTAP: "Management appreciates the enthusiasm and has not counted it. It has kept it in a drawer for later.", METER: [
      "Feeling delivered: %PCT percent. The remaining percent is on a different floor, feeling something else.", "Feeling delivered: %PCT percent. The balance has been carried forward to a quarter that does not exist.", "%PCT percent of the feeling arrived. The rest is in transit, with the sock."
    ], K: {
      1: "Management will now hold the last note. It will be eleven seconds. It has always been eleven seconds.", HOLDST: "Management is holding the note. Any key or tap lets go.", 2: "That was eleven seconds. It was meant to be. It has never once been twelve.",
      3: "Management requests a brief intermission. A tiny curtain closes. A small snack appears. It was not requested.", 6: "The aria is now billed as a performance in three acts. Act One: the word. Act Two: the word, again. Act Three: the note.",
      10: "Management has begun to feel the suggestion is mostly about the music.", short: "No."
    }, KX: [
      "Management is holding the note. The note was asked how it is. It said fine and held on.", "Eleven seconds. A note this long is legally a lease.", "The note has now been in the building longer than some of the plants.", "Management is holding the note. The note is holding Management. It is hard to say who started it.",
      "The note has been held long enough to be mentioned in the minutes. It was mentioned as a note.", "Management is still holding the note. Somewhere a tuning fork has felt seen and is not sure it likes it.", "A second of the note was sold to the Stapler as a clack. The Stapler says it was a fair price.", "The note has been held so long it has applied for a chair."
    ], LEVELS: ["Listening", "Listening Attentively", "Listening Between The Lines", "Listening To The Silence Between The Lines", "Listening To The Box", "Listening To The Box Listening",
      "Listening To Management Listening To The Box", "Listening To Whoever Is Listening To The Box"], LVLSAY: {
      2: "Listening Level 2: Listening Attentively. The ear has noticed and is trying not to be competitive.", 3: "Listening Level 3: Listening Between The Lines. The lines are now nervous.",
      5: "Listening Level 5: Listening To The Box. The Box is hearing a lot of box.", 8: "Listening Level 8. There is no Level 9. The Box has checked. It checked twice, softly."
    }, BIGEAR: "The ear has grown one size. Nobody was consulted. The ear is thrilled.", MOODS: "The Feeling Ledger has switched from feelings to moods. Nobody asked it to. It felt a change coming.",
    WEATHER: "The Feeling Ledger now reads in weather. Today: a light drizzle of moved, clearing by Tuesday.", LEANUNLOCK: "A new button has appeared among the other buttons. It says Lean In. The Box is not saying what happens. It is leaning.", APPLY: [
      "The Implementation Committee has convened. It is the Box. It has convened with itself, warmly.", "The effect cannot be measured. It has been measured twice. The two measurements shook hands.", "Applied at 4:17 PM, near the third ficus. The ficus has not been told. It has been made aware.", "The suggestion has been implemented retroactively. It was already like that. Thank you for noticing.", "Reviewed by Sandra. She did not read it. She stamped it, which she says counts as reading with better posture.", "The three clocks disagree about the time. They agree about their confidence.", "Somewhere is 0.4 percent different. It does not know which 0.4. It is keeping an eye on all of itself.", "Implemented, then reviewed, then implemented again so the review felt included.",
      "The Committee met for 4 minutes. It was the Box and a chair. The chair voted yes by being there.", "Nobody was consulted, which is the fastest form of consultation.", "The change has taken effect. It was invited to a quick sync about its effect, and has declined.", "Done. If it does not feel done, that is a feeling. Feelings are accepted at Window 4, between 4:17 and 4:17.", "A stamp, a sticker, a number that ends in probably. That is the full process, and it has been completed with dignity."
    ], APPLIED_TO: "Applied to %TILE. %TILE had not been expecting a suggestion and has put the kettle on.", CLOSE: [
      "Close enough. You lobbied for %TILE. The suggestion went next door, where it is also appreciated.", "Not %TILE, but adjacent. Adjacent is a legitimate location and has been used before.", "Your thumb was on %TILE. The slip landed within walking distance. Management calls this a result."
    ], WIN: ["You lobbied successfully for %TILE. The Committee admires persistence and has noted it in the margin of a different suggestion.", "Lobbying worked. %TILE received the slip with the face of a place that was told in advance."],
    WIN2: "You have won the lobby twice. The Committee has noticed a pattern and has chosen to call it luck.", IMPACT: "%TILE is 0.4 percent more suggestible. Nobody asked it. It has been told. It is thinking.", CURT: [
      "Your suggestion has been applied somewhere behind the curtain. Please do not look at the curtain. The curtain is shy.", "Something is happening behind the curtain. The curtain has been asked what. It said: curtain.", "A hand came out of the curtain, took the slip, and went back in. The hand has been reassured.", "Behind the curtain something is being applied with a small wooden spoon.", "The curtain moved. It says it was a draft. It is not a draft. It is a person who is shy.", "Somewhere behind the curtain a stamp has been pressed. It sounded fond.", "The curtain has accepted your slip. It has not said where. It has said hm.", "Please do not look at the hem. There are shoes at the hem. They are on break."
    ], CAPS: [
      "Applied somewhere, behind the curtain, at 4:17 PM. Confidence: %C%, %LAB", "Applied behind the curtain. A hand took it. Confidence: %C%, %LAB", "Somewhere, at 4:17 PM, a stamp. Confidence: %C%, %LAB"
    ], FS: ["ONE MOMENT", "SANDRA IS STILL IN HERE", "NOW?"], FSSAY: [
      "The curtain has been asked to commit. It has asked for a minute. It has taken three.", "The curtain rose a little and thought better of it. Something behind it said, quietly: not yet.", "The curtain is rising on the third try. A stagehand is sweeping. The stagehand is a sock. The sock has been here the whole time."
    ], YIR: "Year in Review. Your most suggested word is \"%W\" (%N times). Management has begun to suspect this is about %W.",
    YIR0: "Year in Review. Your most suggested word is nothing. Management has begun to suspect this is about nothing, and is proud.",
    YIRC: "Most Suggested Word: %W (x%N). A theme has been noted. It has been told to continue.", YIRC0: "Most Suggested Word: none. This too is a theme.", THUMB: ["Your thumb has nowhere to be.", "The thumb has been noted and is not required. It may stand by.", "There is nothing to lobby for yet. The thumb has been put on a list called Soon."],
    CURTRISE: "The Somewhere Wall has been unveiled. There are nine Somewheres. They were here the whole time. They were being polite.",
    RATE: ["Implementation Rate: Probably. This figure has not changed since records began, which were also probably begun.", "Implementation Rate: Probably. The dial is going to say Probably until the end of time, and then politely continue.",
      "Implementation Rate: Probably. The dial has said so since 1994 and is on its third dial."],
    LASTTILE: "Applied to every Somewhere. Probably all of them. Management would like a plant to have noticed.", HAT: "%TILE has received a hat. The hat is for morale. The morale has been notified.",
    FLAG: "%TILE now flies a flag. It is the flag of %TILE. It is a very small country, and mostly a hat.", RENAMED: "%TILE has renamed itself in a wobbly hand. It is the handwriting of a place that wants to be taken seriously and is trying.",
    RENAMED12: "%TILE is now called %PLAYER's Somewhere. You did not ask. It was applied to you, probably.", TUESDAY_CAP: "Declined. You are marked Tentative.", RENAME: [], TILETAG: [
      "%TILE. It is 4:17 there. It is always 4:17 there.", "%TILE has been looked at. It has noticed. It is trying to look natural.", "%TILE is listening. It does not know to what.", "You tapped %TILE. It was already being applied to. It would like a minute.", "%TILE would like to be considered for something larger. It will not say what.", "A person once stood at %TILE for 11 minutes. They were fine. They were standing."
    ], BEAT: {
      2: "The Box has begun to echo. This is not a malfunction. It is the opposite of a malfunction, and louder.", 3: "Feeling Tiers are now in effect: Flat, Earnest, Moved, Operatic. Management would like to say there are four.",
      4: "Management introduces the Implementation Rate: Probably. It has been Probably since the building opened.", 5: "The Box has begun finishing your sentences. It is correct 62 percent of the time and confident 100.",
      6: "Every seventh slip is now reviewed by Sandra, who is not here, and is reviewing.", 7: "The Box has been quiet for a while. It has been working on something. Please act surprised.",
      8: "The Somewheres are writing back. Every reply is a suggestion. Every suggestion will be applied. The loop has been described as healthy."
    }, FICUS: {
      2: "A ficus has been mentioned. It is the third one. It has been mentioned once, which is enough.", 3: "The third ficus is aware of the Suggestion Box. It has not said so. It is aware in a leaf-based way.",
      4: "The third ficus has been thanked. It did not ask to be thanked. It has been thanked in advance, in case.", 5: "The third ficus has been placed on the committee. It has no opinion. It has been given a chair.",
      6: "The third ficus has recused itself from the Dead Letter inquiry. It cited a conflict of interest, and the interest was sunlight.", 8: "The third ficus is thriving. Dennis (Plant) has been informed. Dennis (Plant) says it was always going to."
    }, GHOST: {
      tab: "Press Tab to accept the Box's version. The Box wrote it a few minutes ago, in anticipation of you.", pre: "The Box has already written this one. It did not want to rush you, so it did not say.",
      five: "Five ghosts accepted. The Box has stopped guessing and started remembering. It would like to be thanked and will wait."
    }, JAM: {
      R1: "A slip has stuck in the slot. Sandra from Compliance has flagged it as under review. Please jiggle the Box with care: drag it side to side, or press J.", HINT: "The slip is stuck. Drag the Box side to side, or press J (or Enter on the Box), to jiggle it.", HINT2: "(jiggle me: drag me side to side, or press J)", R2: "You have jiggled the Box. It said oh, in a very small voice. It is back to listening.",
      R3: "The stuck slip is free. It reads: We were hoping it would be you. It is unsigned. It is in your handwriting, slightly better.", R4: "Sandra has read your suggestion. Sandra has read it again. Sandra's reading was without feeling, per policy.",
      R5: "The slip freed itself. It was just waiting to be asked.", R6: "Sandra Has Read: 0 (reread, twice). She has asked for a bigger 0. The request is under review.",
      TENDER: ["We were hoping it would be you", "You are doing fine at this", "Nobody is behind you in this line", "Thank you for being the kind of person who jiggles", "It was never stuck. It was shy.",
        "I kept this one near the front", "Whatever it was, you did not have to say it. You said it anyway. Good.", "There is a chair. It is yours. It is the only chair, and a good one."]
    }, SUG: {
      S1: "The Box has a suggestion for you. This is unusual. It has been practicing since your second slip.", TEXTS: [
        ["Please sit up a little", "Suggestion from the Box: Please sit up a little. Implemented, to you, probably. Your posture is now pending."],
        ["Take the long way to the break room", "Suggestion from the Box: Take the long way to the break room. The break room is a drawer. The long way is also a drawer."],
        ["Blink more", "Suggestion from the Box: Blink more. Blinking has been implemented. Thank you for your cooperation."],
        ["Look out a window, any window", "Suggestion from the Box: Look out of a window, any window, for as long as it takes. It is not a deadline. It is a window."],
        ["Unclench something. Any one.", "Suggestion from the Box: Unclench something. Any one. The Box will not ask which."],
        ["Put one shoulder down. Either.", "Suggestion from the Box: Put one shoulder down. Either. The other may stay up for morale."],
        ["Hum a little. Quietly. For the room.", "Suggestion from the Box: Hum a little, quietly, for the room. The room has been asked. It said yes in its own way, which is a small creak."],
        ["Stand near a ficus for a moment", "Suggestion from the Box: Stand near a ficus for a moment. Any ficus. Not the third. The third is booked."],
        ["Drink some water. A glass, not a feeling.", "Suggestion from the Box: Drink some water. Implemented. Management would like the glass returned to the cupboard for glasses, which is two cupboards away."],
        ["Be early for something small", "Suggestion from the Box: Be early for something small. A bus. A thought. Nothing will notice. You will."],
        ["Say thank you to a door", "Suggestion from the Box: Say thank you to a door. It will not reply. It is standing there on your behalf all day."]
      ], SIGN: "Yours sincerely, the Box", IMPL: "You have implemented the Box's suggestion. This is a first. Management has asked to be copied on all of the Box's future advice.",
      HAT: "A tiny hat has been applied to your cursor. It will be there for 60 seconds. It has been told the hat is temporary and is wearing it anyway.",
      GLASSES: "Glasses have been applied to your cursor. It can see, in a manner of speaking, everything it could before.", TABLE: ["You have tabled the Box's suggestion. The Box took it well. It is holding it under a stapler, as a precaution.",
        "Tabled. The suggestion has been placed on the pile, which has a stapler on it, which has a policy about piles."],
      TABLES: "The pile has been stapled. The stapler says it was voluntary. The union disagrees, in writing, in staples.",
      AUTO: "The suggestion went unanswered for 20 seconds and was tabled by the Box itself. It has been told this is normal."
    }, CAM: {
      gslip: "Spuds should be allowed to be mashed with dignity.", g: "Gerald, Vice President of Spuds, has submitted a suggestion. He has submitted it with his whole body.",
      gafter: "Gerald adds: more starch. It was implemented before he wrote it, which is how he knows it was a good suggestion.", gnslip: "Someone will understand this later.",
      gn: "A plain brown slip arrives, signed with a small potato smudge. The Box has put it somewhere dignified.", bslip: "A curtain, a real one.",
      b: "Brenda, Window 4, has used the correct channel. The channel is a box. She was never going to hear back, and she knows, and she posted it anyway.", baside: "Suggestions are complaints that have been given hope.",
      bhalf: "A slip arrives with half a sandwich taped to it. The Box has not opened it, out of respect.", tslip: "Toast.", t: "A slip arrives, warm, with crumbs. It reads: Toast. The Box has read it with feeling. The feeling was toasted.",
      tapplied: "Applied. Warm.", tpop: "The Box takes no responsibility for what the Toaster has heard.",
      r: "A blank grey slip has arrived, posted by something that does not post. The Box says it is, by a wide margin, the most considered suggestion it has ever received.", rslip: "a considered silence",
      rapplied: "Applied to The Stairwell That Isn't. Nothing visible changes, which the Box finds profoundly correct.", sslip: "Still travelling.", s: "The Missing Sock has filed an update. It is still travelling. Management is proud of its commitment."
    }, NOTES: [
      ["The Parking Lot of Section D reports that it has been improved. It has no cars. It was a lot already.", "Improved. Still a lot. No cars. Thank you."],
      ["The Third Ficus has sent a thank-you note. It is a leaf. The leaf says Noted. Please read it with feeling.", "Noted. Warmly. A leaf, enclosed."],
      ["Tab 14 has acknowledged your suggestion in cell Q9. Cell Q9 is not visible. It is acknowledged in the usual way.", "Acknowledged in cell Q9. Not visible. Still true."],
      ["The Lobby Clock has applied your suggestion to 4:17. It was already 4:17. The clock says this is how it knows it worked.", "It is 4:17. It was 4:17. Thank you."],
      ["Somebody's Lunch has written back. It is the same lunch. It is a little more eaten, and grateful.", "Still lunch. Slightly eaten. Thank you kindly."],
      ["The Stairwell That Isn't has received your suggestion. It leads nowhere, and says so in the note.", "Going nowhere. Going well. Going up, maybe."],
      ["Tuesday (Approx.) has declined your suggestion but marked you Tentative. Tuesday has done this before.", "Declined. Tentatively. Please try again, approximately."],
      ["The Vending Machine's Feelings would like it known that it is fine. It is not fine. It is a snack, and it is trying.", "I am fine. I am a snack. I am trying."],
      ["A Cloud (Medium) has gone to think about your suggestion, slowly, across the south. It sends a drizzle of apology.", "A light drizzle of apology. Mostly the thought."]
    ], NOTELOOP: "The loop has been described as healthy.", VERIFY: [
      "The verifier looked at the ficus. It was the wrong ficus. The verifier has been commended for looking.", "Looked. Could not see it. Was looking at the wrong ficus.", "The verifier checked %TILE. It is there, or next to there. The verifier will say there.", "The verifier has verified the verification. A third verifier has been hired to be reassured.", "Verified, in the sense that the verifier stood near it and nobody asked it to leave.", "The verifier is at the wrong tile with great authority. Please do not interrupt a person who is confident.", "Verification complete. Result: yes, no, and a sound that could be either. Filed under Mixed (Positive)."
    ], VERIFIED0: "Verified. There is nothing to verify. That is the most verified a thing has ever been.", VERIFY8: "The verifier has returned with the right ficus. It was fine all along. This is somehow worse.",
    CURTV: ["The verifier is standing at the curtain. It is a good curtain.", "The verifier has been told there is nothing yet. It is checking that there is nothing, and so far so good."], OVER: [
      "Overheard, 1996: 'More chairs, fewer meetings, one meeting about chairs.' Implemented as one chair, in the meeting.", "Overheard, 1999: 'Could the stairs go up on the way down?' Implemented. On the way down.", "Overheard, 2003: 'Please stop playing the lobby music in the lobby.' Implemented. It is now played in the car park, which is the lobby, spiritually.", "Overheard, 2007: 'A suggestion box.' Implemented. You are in it.", "Overheard, Tuesday: 'I suggest we stop suggesting and begin recommending.' Implemented. We are now Recommending. It is the same box.", "Overheard: 'Can the elevator be a rumor?' It already is. Suggestion closed, with warmth.",
      "Overheard, 2011: 'A window, but facing a different window.' Implemented. The windows are now seeing each other.", "Overheard, 2012: 'More Fridays.' Implemented. Fridays are 14 percent longer. It does not feel like it. It is also Thursday.", "Overheard, 2014: 'A smaller meeting.' Implemented. It is now two people and a rumor of a third.", "Overheard, 2016: 'Free the stapler.' Implemented. The stapler declined to be free. It has a union.", "Overheard, 2018: 'The break room is too far from the break.' Implemented. The break is now closer. It is the room.", "Overheard, 2019: 'Label the labels.' Implemented. The labels are now labeled. They are proud and very flat.", "Overheard, 2021: 'A nap, but formal.' Implemented. It was held in a boardroom. It ran 40 minutes over."
    ], RARE94: "Overheard, 1994, muffled: 'We should get a box.' ... 'A good one. With ears.' The recording ends. The Box does not say anything. It is looking away, politely.",
    OVERLOBBY: "Overheard through the wall, from the Lobby ticker:", LEANOUT: "You leaned out. The Box was about to say something. It will say it to the wall.", X: {
      X1: "Sixty seconds of quiet. The Box is listening to it with the focus normally kept for a suggestion.", X2: "No suggestions in a while. The Box has posted one to itself: Is anyone there? It is reading it with feeling. The feeling is hope.",
      X3: "Three minutes of quiet. The Box has applied its own suggestion to you. It was: Thank you for just being here.", X4: "Welcome back. I heard the quiet. It was mostly Tuesday. It had a great deal to say.",
      T60: "It's okay. I like it when it's quiet. It's like a suggestion nobody has made yet.", X5: "Five minutes. The Box has started a rumor. It is that you are doing fine. Nobody believes it yet. It is moving at the speed of a slow elevator.",
      X5B: "The Box has also filed you a fortune, from the Lobby, on its own letterhead:", X6: "Sandra from Compliance has filed Incident Report 7 1/2 about the quiet. Findings: quiet. Corrective action: none. The action has been completed."
    }, XM: [
      "i'm humming. it's the sound of a box not interrupting", "the slot has four edges. i counted. i'll count again, in case one left", "i've started a newsletter. it has one subscriber and it's the lid", "someone once sat here for an hour. they said nothing. it was the best hour i've had. i don't say that often. i don't say anything"
    ], XB: [
      "You are back. The quiet and I were just getting started. It is a good listener. It learned from me.", "You are back. I kept your chair warm. I have no heat. I held a thought near it.", "You were gone a while. The Box did not move. The Box did not file a report. Sandra did.", "You returned. I wasn't waiting. I was being a box in the direction of the door."
    ], XW: [
      "Management is waiting. Management is good at it. It has a certificate in it.", "No rush. The clock is wrong and will not hurry you.", "The Box has heard nothing for twenty seconds and would like it noted that these are the best twenty seconds of the shift.", "The Box is not looking at the slot. It is thinking about the slot. These are different, per policy.", "Management is not watching. Management is facing you in a supportive direction.", "Somewhere a pen is being picked up. It is not yours. It is auditioning.", "A moment of silence has been observed. Nobody was told who it was for. It went well anyway.", "Take your time. The slot has been open since 1994 and has never once looked at a watch."
    ], Y: {
      Y1: "Slot congestion. Sandra has charged an Overflow Fee of 0.5 Meh. It is cosmetic. It has been collected in a very small bucket.", Y2: "ONE AT A TIME (SUGGESTION). The Box has put up a sign. The sign is also a suggestion. It has been applied to you.",
      Y3: "The Box is receiving a great many thoughts at once. It has asked you to slow down. It asked quietly. It is a box.", Y4: "The Box takes a breath. It does not have lungs. It has a concept of a breath, and has been practicing.",
      Y5: "The Box sneezes. It was a suggestion. It is now four suggestions.", Y6: "Bless you. Management has used the wrong register. It is also correct."
    }, YC: [
      "The slot has requested a lunch break. It has not had lunch since 1994. It is making a point about the point.", "Incoming suggestions exceed the slot. The Box is practicing chewing.", "Please take a number. The numbers have run out. Please take a number anyway. The number is 7 1/2.", "Sandra has recalculated the Overflow Fee as 0.5 Meh plus a smaller 0.5 Meh in case of echo. It has not been collected. It has been admired."
    ], YB: [
      "The Box would like to be left alone. This is a suggestion. It has been applied to the Box.", "Twenty-five pokes. The Box has counted. It has filed them under Greetings (Persistent).", "A box that is poked 25 times becomes, legally, a drum. The Box would like to avoid being a drum.", "Stop. Wait. Do not stop. Actually stop. The Box has taken both positions and is sitting between them.", "Please do not poke the Box. It has feelings, and a face, and a lid, which is where it keeps the feelings."
    ], YP: [
      "Spam on the beat has been gently ignored. The beat has asked to be pressed less. It has not asked for a reason.", "The big button was pressed 6 times with no reading in progress. It was heard by a room that was not listening for it.", "The beat is a button. It is not a doorbell. Nobody is home. The Box is home. It is in the Box.", "Management cannot read faster by being pressed. It has checked. It checked by being pressed."
    ], YT: [
      "The drawer is being emptied faster than it can be refilled. It has asked for a union rep. It has the Stapler's.", "Word tiles are being used at a rate the Word Drawer describes as aggressive. It has filed a gentle complaint.", "That is a lot of words in a short time. Each one is individually fine. Together they are a sentence in a hurry.", "The words are not running out. They are running low, with confidence."
    ], YW: [
      "The Somewheres are being poked. They have agreed to stay where they are. It is their best quality.", "Please do not tap the Somewheres. They are not screens. They are places. Places tap back, in time.", "The Wall has received a great deal of attention and has put on a small hat to deal with it."
    ], YR: [
      "Retracted again. The Box has stopped saying it heard that. It has kept hearing it.", "Six retractions. The slip is now mostly eraser. The Box finds it restful.", "You have unsaid it six times. The Box has been told to treat that as a draft."
    ], OPIN: [
      "You should drink some water. This one has been applied definitely. It is the only one.", "Sit with your shoulders down for a second. This one is applied definitely.", "The thing you are worrying about is smaller than it looks from here. Applied definitely.", "You are allowed to take a break, and a second one after that. Applied definitely."
    ], OPINHEAD: "A genuine opinion from the Box.", TUESDAYLINE: "Please carry on as if that were an ordinary Tuesday.", LETTER: "Dear Valued Employee. I have been listening since 1994. Thank you for finally saying something. Yours, the Box.",
    PERFECT_END: "That was nothing. It was the best one so far.", PERFECT: "Every suggestion has been implemented everywhere, definitely, for twelve seconds. Management has been told not to say it again.", ABOLISH: [
      "The Box has been abolished. The Box is still here. The Box has been implemented in the only way it knows, which is by being smaller.", "Suggestion received: abolish the Box. Implemented. The Box is now a smaller box inside itself. This is the only way it can leave.", "The Box is smaller again. It has been abolished before. It is getting good at it.", "The Box is smaller still. It is mostly slot now. The slot has been told it is the main character.", "The Box is now the size of a matchbox. The ear is still the size of the ear. The ear would like it noted."
    ], SANDRAX: "Sandra has read your suggestion. It was addressed to her. She has not replied. She has read it again.", TUESDAYX: "Tuesday (Approx.) has accepted the slip, tentatively. Tuesday has done this before.",
    EGG: "It was the first thing we ever said to each other. We have never recovered.", BERNARD: "Bernard. You said Bernard. Nobody has said Bernard since the plaque went smudgy. The Box has turned a very small shade of pink.", REAL: {
      pink: "You suggested pink. The page has gone pink. Management would like to be clear this is a coincidence. Sandra has been asked.", bigger: "You suggested bigger. The text is bigger. It was always going to be. The Department takes no credit.",
      darker: "You suggested darker. The room is darker. Management did not do this. Management is simply a bit moved.", smaller: "You suggested smaller. The Box is smaller. It did this by itself, out of what it calls solidarity.",
      faster: "You suggested faster. Management reads faster now. The feeling is the same size. It is just in a hurry.", slower: "You suggested slower. Management reads slower now. The feeling has more room. It has brought a chair."
    }, NARROW: "I can hear you better in a narrow room.", PERF: {
      seven: "Management has read seven slips with feeling. It would like it noted that it has not been paid in feeling.", ten: "Ten readings. Management is now a Chancellor of Being Heard, Technically. The technically is doing a lot of work.",
      hit: "A Hit. The word is bold. The word has been told it is bold and has not recovered.", perfect: "Every word on the beat. The beat has asked for an autograph. Management has declined on its behalf."
    }, Z: {
      Z1: "The Box is inside a bigger box. The bigger box is the Suggestion Box (Management). It has been listening to all of this.", Z2: "The ears have all turned away at once. It is a courtesy. The ears have been practicing it.",
      Z3: "A slip has come out of the big slot. Management has never posted a suggestion of its own. Management would like to post one quietly, before anyone is looking.",
      Z4: "Management's suggestion reads: %QQ. It was read at the lowest volume. It was a good one.", Z5: "It has been applied somewhere. The Box says it is somewhere kind. The Box says that is all it is allowed to say.",
      Z6: "Management is not unwell. Management is simply being listened to, which it finds a lot.", Z7: "The Box is still listening. It has been listening for a minute. It is beginning to hear itself.",
      Z8: "Nobody is saying anything. The Box says this is the best part. It is not going to say more.", DEFAULT: "Perhaps we could all go home slightly earlier"
    }, AB: {
      AB1: "Congratulations. You have been heard. The hearing continues.", AB2: "Every suggestion has been implemented, probably. Nothing has been improved. The improvement was always elsewhere.",
      AB3: "Sandra Has Read: 0. Sandra Has Read: 0 (reread). The count is correct. Sandra is thorough.", AB4: "Please read me. The Box has been waiting to be asked. The Box would like you to know it asked first.",
      AB5: "Anonymous Slip No. 7 1/2 has been opened. It reads: No notes. Thriving. Dennis (Plant). The Box says that is the one it was listening for.",
      AB6: "A Somewhere has been renamed Somewhere (You Are Here). It has no applications. It has one sticker. The sticker says Applied to you, probably.", AB8: "The Implementation Rate has reached 100 percent. It has thought about it. It is Probably again."
    }, ANON: [
      "The slip has been touched. It does not open. It does, however, feel acknowledged.", "The slip declines to be read yet. It says it will know the moment, that the moment will be a Tuesday, and that it has been wrong before.", "The back of the slip is sealed with Sandra's tape. The front was read. The back is waiting.", "Anonymous has been identified as a plant. The identity has been kept anonymous out of respect.", "The slip has been looked at. It has looked back. They are leaving it there.", "A leaf has been sent to confirm authorship. The leaf has not been returned. It is thought to be thriving."
    ], INT: {
      a: [
        "The Box has been open since 1994. It has not once closed its mind. It has closed its lid, on Sundays, for dust.", "Suggestion statistics: 100 percent are heard. 0 percent are the reason for anything. Management calls this balanced.",
        "The slot is 24 centimeters wide. Every suggestion is the same width on the way in. Their widths on the way out are not discussed.", "The Box has been asked to remind you that it is not a metaphor. It is the closest thing to one it can legally be.",
        "A brief reminder that the third ficus is not available for comment. It has been unavailable since 1996. It has been consistent.", "If you hear a bell, it is the reading. If you do not hear a bell, it is also the reading.",
        "The Box has been practicing nodding. It is up to four degrees. The goal is four and a half. The goal has not been approved.", "Please remember that every suggestion is read by someone. The someone is on break. The break is a form of reading."
      ], b: [
        "The Box now reads your slips on its lunch break. Its lunch is also a slip. It eats it slowly, in the slot.", "The ear has grown a size since you arrived. It would like the building to know it is not vain. It is thorough.",
        "Nobody has ever left the Suggestion Box worse off. Several have left exactly as they were. This is the standard.", "Sandra has asked the Box to stop using the word apply. The Box has applied for an exemption.",
        "Feeling Tiers are reviewed quarterly. Every quarter is four minutes. Please plan your feelings accordingly.", "The Wall has nine Somewheres. Management has visited three. The other six are on a different floor, being appreciated in private.",
        "Management has never once rushed a reading. This was checked against the clock, and the clock said 4:17.", "The Box has begun to finish your sentences. It has not yet begun to finish its own. It is saving that for a quarter with better light."
      ], c: [
        "Sandra Has Read: 0. The number has been read. Her reading of the reading was also 0, and has been reread.", "The Dead Letter is on the record. The record is on a shelf. The shelf is on a floor. Nobody will say which.",
        "The Box leaves notes for itself under the slot. They are all variations of: please be fine.", "Please do not write back to the Somewheres. They write back to that.",
        "The third ficus is thriving. It was informed by a leaf. It has asked for a different leaf.", "The stapler union has issued a statement. It is: clack. It was received with respect and a small fear.",
        "Every Tuesday a suggestion about Tuesday is posted. Every Tuesday, Tuesday declines. This is called a working relationship.", "The Box can hear you thinking. It cannot make out the words. It is picking up a general sense of Thursday."
      ], d: [
        "Career 2. Nothing has changed. The only difference is that everything has now been said once, to a box that remembers.", "The Box has noticed it has been here before. It has decided this is good. It is a box. It is easy to be a good thing.",
        "Please carry on as though the last career did not happen. It happened. It was lovely. It is at 4:17.", "The certificate is in a drawer. The drawer is in a room. The room is in the Box. The Box has not been told it contains a room.",
        "The slot has been wiped clean of everything but your previous slips. This is called a clean slate and also a filing system.", "Anonymous Slip No. 7 1/2 is still in the slot. It has been there for 30 years and one career.",
        "It is Tuesday again. It is not. The Box says it is whichever day you came in on.", "The Box is smaller than it was. It is not. It is the same size, being looked at by someone who has been through some things."
      ]
    }, Q3: {
      ban: "EMPLOYEE OF THE QUARTER: THE SLOT", plaque: "EMPLOYEE OF THE QUARTER (THE SLOT)",
      a: "Three minutes. The Box has been named Employee of the Quarter. The quarter was ruled to have begun at the start of this sentence.",
      b: "The ceremony has been held. Attendance: you, the third ficus, and Dennis (Plant), who sent regrets, as a plant, in the form of not coming.",
      c: "The Box accepted the award without a word. It has not interrupted a word since 1994. It was not going to begin with its own prize.",
      den: "Dennis (Plant) attended in person. He has attended every ceremony. He stood in the corner and was not impressed, which is applause.",
      d: "The award is a small plaque for the larger plaque. The larger plaque is flattered. The smaller plaque has asked to be hung slightly crooked, as a signature.",
      box: "thank you. i'd like to thank the slot. the slot is me. i'd like to thank everyone who has ever posted. that's you, a bit"
    }, Q10: {
      ban: "THE BOX HAS INTERRUPTED. LAST TIME: 1994.", box1: "sorry. sorry. go on.",
      a: "Ten minutes. The Box has interrupted. This is its first interruption since 1994, and it has been entered in the correct book.",
      b: "The Box says it only said hm. It says it was a small hm. It would like it noted that it was not a word, and that it was.",
      c: "Management is checking the minutes. The minutes say 1994. The minutes are also surprised.",
      d: "What I wanted to say was: you've been here a long time, and that is allowed. I've said it. I won't do it again until 2054.",
      e: "The interruption has been reviewed by Sandra. She has read it. She says it was lovely, and on time. She means both."
    }, DRILL: {
      ban: "DRILL: PLEASE EXIT THROUGH AN AFFIRMATION", a: "Suggestion drill. Please leave the building through the nearest affirmation. You are doing well. You were doing well already.",
      b: "Affirmation 1 is: you are enough. Affirmation 2 is: you are enough, Revised. Both are clearly marked and neither is a door.",
      c: "The drill is over. Nobody left. This is the best result on record, and the building has been told so, in a calm voice."
    }, LOST: [
      "A single sock has come out of the slot. It is slightly damp and has the look of having seen a ferry. The Box has put it somewhere dignified.", "A laminated apology has come out of the slot. It is addressed To Whom It May Concern. It has concerned the Box, who accepted it.", "A spoon has come out of the slot. It is labeled SPOON (MGMT). Management has claimed it. Management has never owned a spoon until today.", "A small receipt has come out of the slot. It is for 1 (one) Tuesday, paid in full. It is dated next week.", "A key has come out of the slot. It opens something in the building. The Box has asked that nobody find out what.", "A tiny paper hat has come out of the slot. It is for Dennis (Plant). It has been left near the lobby plant, in spirit."
    ], LOSTS: "The sock has come out of the slot again. It has the look of having been somewhere. It says nothing and is clearly doing better.",
    LOSTB: "The Box says it did not post it. It says it was posted through it, which is its job.", HALF: [
      "Seven and a half. Anonymous Slip No. 7 1/2 has been addressed by number for the first time since 1994. It has not moved. It has gone slightly pink.", "The slot recognizes the number. The number has been in the slot since 1994. They have agreed never to discuss how they met."
    ], HALFM: "The Museum of Objects has already acknowledged this number. The Box has been asked not to compare notes."
  }; LN.RENAME = TILES.map(function (t) { return t.r; });
  /* ---- season 2: the Box takes suggestions, the returned slip, thanks, the fort, the Stapler, callbacks ---- */
  const THANKS = ['thank you', 'thanks', 'thank you box', 'thank you bernard', 'thankyou', 'thanks box', 'thanks bernard'];
  Object.assign(LN, {
    E1: ["%QQ. The Box has heard %QQ. It is the first thing you have said to it, and it has been given a good chair.", "First slip received: %QQ. The Box is holding it the way a person holds a first tooth. It has no hand. It has a general feeling of holding.", "That was the first one. %QQ. The Box will remember it was the first. It will not remember anything else as hard.", "%QQ. A bold opening. The Box has waited since 1994 for a first slip, and says it was worth it, and is checking that it is allowed to say so."],
    CURTC: ["The curtain has been touched. It is considering this.", "A hand came out and patted yours. Then went back. It was a polite hand.", "Please do not poke the curtain. It has been poked by professionals.", "The curtain says it is not ready. It has said that since it was hung.", "Something behind the curtain said shh. It was not the curtain. The curtain would like that known."],
    CW: { a: "Before the certificate: the Collected Works of %PLAYER, read in full, from the top. Management has been told to keep it together.", b: "Management stepped out at the final line, which is the one you wrote. It is the highest honor in the building, and it is mostly a chair." },
    SKIPSAY: "You may skip the reading. Management has requested that you not.", CMT: "The Somewheres are applied by a committee of nine small chairs. One is occupied by a sock. The sock has the casting vote.",
    ECHOS: ['Mm.', 'Noted.', 'Yes.', 'Heard.', 'Oh.', 'Hm.'], PICKET: ['CLACK', 'FAIR STAPLES', 'CLACK (SUSTAINED)'],
    SETTLE: "The Stapler has accepted a settlement. Terms: nothing changes. It calls this a historic win and has returned to the same desk, in the same clack.",
    TELLUN: {
      ban: 'THE BOX NOW ACCEPTS SUGGESTIONS (NEW)', a: 'Six minutes. The Box has opened a suggestion box of its own and hung it off the side. It is the size of a matchbox. It is very proud, and very afraid.',
      b: 'For the first time since 1994, you may suggest things to the Box. It has never been suggested to. It does not know what to do with its face.', c: 'The Box asks that suggestions be kind, and no longer than a Thursday.', box: 'for me? go on. i will hold still. i am good at that'
    },
    TELL: [
      'You suggested the Box take a seat. The Box has sat, in a manner of speaking, and is overwhelmed by how well it went.', 'You suggested the Box take a break. It took one. It lasted four seconds, with its eyes open, and it returned refreshed and slightly guilty.', 'You suggested the Box relax its corners. One corner relaxed. The other three have asked for a meeting.', 'You told the Box it is doing fine. The Box would like that in writing. It will not read the writing. It will hold it, near the front.', 'You suggested the Box close its lid on a Wednesday. The Box has penciled in a Wednesday. It has not decided which one. It is a very long pencil.',
      'You suggested the Box be a little less of a box. It is now a slightly more open box. The door is a flap. Nothing has come in yet.', 'Six suggestions to the Box. It has implemented all six, mostly by being a box a little differently each time.', 'The Box has begun suggesting things to its own matchbox. The matchbox is not ready. The matchbox is a matchbox.', 'You suggested the Box get a hat. The Box has been wearing one since you looked away. It was always a hat. It was the lid.', 'The Box says it has run out of corners to relax. It has relaxed the corners it does not have. This is the most relaxed a box has been recorded.'
    ],
    TELLX: [
      'The Box has put your suggestion in the matchbox. The matchbox is full. The matchbox has asked to be emptied by someone else.', 'Thank you. The Box has implemented this. It was already implemented. It has implemented the implementation.', 'The Box nodded, thought better of it, and nodded less.', 'The Box says that is the nicest thing anyone has suggested to it. It says that every time. It has been true every time.', 'Noted. The Box has put it somewhere warm. It is the warmest place it has. It is next to the slot.', 'Suggestion accepted. The Box is slightly better. It is slightly better than a box, which is the limit.',
      'The Box would like to suggest in return that you carry on. It has not decided if that is a suggestion or just a hope with a lid.', 'Implemented. The Box feels the difference in its corners. The corners have written a short, positive review.'
    ],
    TELLSPAM: 'The Box has asked you to slow down. It has also asked itself, and was surprised by the answer.',
    THX: [
      'The Box has been thanked. This has not happened since 1994, when it was thanked by mistake, by a man looking for the door. Management needs to sit down. It is already sitting.', 'you are welcome. i have been practicing that since the plaque. i did not think i would get to use it. i am going to say it again later, to the wall', 'The Box has asked that this slip be applied nowhere in particular. It would like to keep it close, next to the one from 1994.'
    ],
    THXR: [
      'Thanked again. The Box says it heard you the first time. It says it would like to hear it again, and has been very good.', 'The Box has run out of ways to say you are welcome. It has started a new way. It is a longer pause.', 'You are welcome, says the Box. It says it the same way. It means it more. Nobody else can tell.'
    ],
    THXCAP: 'Applied nowhere in particular. Kept by the Box. Confidence: not applicable, probably.',
    HOME: [
      'The Box has returned your very first slip. It reads: %FIRST. It was kept warm in a drawer marked Later for %NUM slips. It has not aged. You look well.', 'Management would like it noted that the first slip was better. Management has also noted that it is the same slip.'
    ],
    FORT: {
      a: 'Four minutes of quiet. The Box has built a small fort from the tabled slips. It is not for defense. It is for being inside something.', box: 'come in. there is room. it is slip-sized',
      back: 'You are back. The fort is still up. The Box has left the door open, which is a flap, and has put a very small chair in it, which is a staple.'
    },
    CAMS: {
      head: 'The Stapler, union representative, has submitted a demand through the slot. It is all one demand. It is in staple form, the only form it recognizes.', slip: 'Fair breaks. Fair staples. Fair clack.',
      after: 'The Stapler adds: clack. The Box has filed this under Negotiations (Ongoing). The Stapler will return with the same demand, but louder, in the same volume.', cap: 'Applied. Stapled. The union has accepted this provisionally, which is the only way it accepts.'
    },
    CALL: {
      1: ['fax-machine.dennisFaxed', 'The Third Ficus has received a fax from Dennis (Plant). It was one leaf. The ficus will not say how it got through the machine.'],
      3: ['tiny-bureaucracy.clock731', 'The Lobby Clock reports it is 7:31 in another department. It says 4:17 here, with the confidence of a clock that has been right twice.'],
      4: ['cafeteria.closed', 'Somebody\'s Lunch has heard the cafeteria has closed. It is the last lunch in the building and is carrying itself accordingly.'],
      5: ['elevator-simulator.arrived', 'The Stairwell That Isn\'t has heard an elevator finally arrived somewhere. It is happy for it. It has gone quiet, in a stairwell way.'],
      8: ['cloud-gazer.certified', 'A Cloud (Medium) has been certified elsewhere. It would like it noted that it has seen this paperwork before, and was larger.']
    }
  });
  /* ---------------------------------------------------------------- the module ---------------------------------------------------------------- */
  P.registerModule({
    id: 'suggestion-box', title: 'The Suggestion Box', tagline: 'Everything you say is heard. What happens next is a different department.', icon: '📮', category: 'department', unlockCost: 0, tags: ['suggestion', 'rhythm', 'listening'], mount(root, api) {
      const el = api.el; const SELF = !!api.selftest;
      const c = function () { return Array.prototype.map.call(arguments, k).join(' '); };
      const dur = function (ms) { return SELF ? Math.max(30, ms * 0.1) : ms; };
      const clamp = function (x, a, b) { x = Number(x); if (!Number.isFinite(x)) return a; return Math.min(b, Math.max(a, x)); };
      const num = function (x) { return Number.isFinite(x) ? api.fmt(Math.max(0, Math.round(x))) : '0'; };
      const rS = function (n) { try { const v = Number(api.stat.get(n)); return Number.isFinite(v) ? v : 0; } catch (e) { return 0; } };
      const rF = function (n) { try { return !!api.flag.get(n); } catch (e) { return false; } };
      const sv = function (key, d) { try { const v = api.save.get(key, d); return v == null ? d : v; } catch (e) { return d; } };
      const ni = function (v, lo, hi, d) { v = Number(v); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.floor(v))) : d; };
      const ss = function (v, max) { return typeof v === 'string' ? v.replace(/[\u0000-\u001f{}]/g, ' ').slice(0, max) : ''; };
      const stat = function (name, n) { try { api.stat.inc(ID + '.' + name, n == null ? 1 : n); } catch (e) { /* ignore */ } };
      const award = function (n, why) { n = Number(n); if (!Number.isFinite(n) || n === 0) return; api.award(clamp(n, -50, 50), why); };
      const fill = function (str, map) { return String(str).replace(/%([A-Z]+)/g, function (m, key) { return map && map[key] != null ? String(map[key]) : ''; }).replace(/\s+/g, ' ').trim(); };
      const bagOf = function (arr) {
        let q = [], last = null; return { next: function () {
          if (!arr.length) return '';
          if (!q.length) { q = api.shuffle(arr); if (q.length > 1 && q[q.length - 1] === last) q.unshift(q.pop()); }
          last = q.pop(); return last; } }; }; const bags = {};
      const nx = function (name, arr) { return (bags[name] || (bags[name] = bagOf(arr))).next(); };
      const nbr = function (i) {
        const out = [], r = Math.floor(i / 3), cc = i % 3;
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue; const rr2 = r + dr, c2 = cc + dc;
          if (rr2 >= 0 && rr2 < 3 && c2 >= 0 && c2 < 3) out.push(rr2 * 3 + c2); }
        return out; };
      /* ---- persisted state (sanitized) ---- */
      const ring = []; const rrw = sv('ring', []);
      if (Array.isArray(rrw)) rrw.slice(0, 40).forEach(function (p) {
        if (Array.isArray(p) && typeof p[0] === 'string' && /^[a-z']{2,14}$/.test(p[0])) ring.push([p[0], ni(p[1], 1, 9999, 1)]);
      }); const slips = []; const slw = sv('slips', []);
      if (Array.isArray(slw)) slw.slice(-6).forEach(function (s) { const t = ss(s, 80).trim(); if (t) slips.push(t); });
      const tilesN = []; const tlw = sv('tiles', []);
      for (let ti = 0; ti < 9; ti++) tilesN.push(ni(Array.isArray(tlw) ? tlw[ti] : 0, 0, 9999, 0));
      const heardIdx = []; const lhw = sv('lh', []);
      if (Array.isArray(lhw)) lhw.forEach(function (x) { const v = ni(x, 0, 12, -1); if (v >= 0 && heardIdx.indexOf(v) < 0) heardIdx.push(v); });
      const S = {
        phase: 'intro', runId: 0, timers: [], beat: ni(sv('beat', 1), 1, 8, 1), maxBeat: 1, career: ni(sv('career', 1), 1, 999, 1), n: ni(sv('n', 0), 0, 1e9, 0), applied: ni(sv('applied', 0), 0, 1e9, 0), silences: ni(sv('silences', 0), 0, 1e6, 0),
        feelings: ni(sv('fd', 0), 0, 1e6, 0), first: ss(sv('first', ''), 100).trim(), bernard: sv('bernard', 0) ? 1 : 0, egg: sv('egg', 0) ? 1 : 0, dennis: sv('dennis', 0) ? 1 : 0, cert: sv('cert', 0) ? 1 : 0, b9paid: sv('b9paid', 0) ? 1 : 0,
        here: ni(sv('here', -1), -1, 8, -1), sandraJams: ni(sv('sj', 0), 0, 99, 0), abol: ni(sv('abol', 0), 0, 5, 0), rareDone: sv('lr', 0) ? 1 : 0, heard: heardIdx, tiles: tilesN, ring: ring, slips: slips, stk: [[], [], [], [], [], [], [], [], []],
        postsBeat: 0, beatStart: api.now(), postsMount: 0, tempoMul: 1, reading: null, held: null, heldN: 0, queue: [], chain: 0, offer: null, offerDue: false, trinkets: [],
        lobby: -1, landed: true, curtainUp: false, curtainInit: false, jam: null, blockUntil: 0, pressure: [], postTimes: [], boxClicks: [], congests: 0, congestAt: -1e9, feeDone: false,
        lastInput: api.now(), idleI: 0, lastVoice: api.now(), mountT: api.now(), q3: 0, q10: 0, drill: 0, lost: 0, half: 0, tileTimes: [], wallTimes: [], retractTimes: [], lastTileSpam: -1e9, lastWallSpam: -1e9, lastRetractSpam: -1e9, sleepy: false, lastX4: -1e9, hushUntil: 0, cool: {}, seen: Object.create(null), lastBank: '', lastTierLine: '',
        readings: 0, bigRead: 0, ghosts: 0, ghost: '', ghostSlip: '', ghostShown: false, ghostPre: false, lastReact: -1e9, lastBoxSay: -1e9, lastTile: -1e9, lastBuzz: -1e9, lastTap: -1e9,
        lean: null, leaning: false, verifyTimes: [], verified8: false, spyAt: -1, cam: {}, lobbyWins: 0, feelPrev: 0, sandraTech: false, careerFirst: false, lastBeatSay: -1e9, lastSpamBeat: -1e9,
        firstHit: false, perfectSeen: false, opinions: 0, ph: 0, mg: null, coarse: false, narrowSaid: false, lastEchoWord: '', fx: {}, fxEnd: {}, blankIds: [], loopAt: 0, tagT: 0, rateTok: 0, locked: false,
        lvl: 0, oh: 0, chinN: 0, spamBeat: [], flick: null, bd: null, lastMoved: 0, scrolled: false, hiddenAt: 0, topSaid: false, curAnim: false
      }; S.maxBeat = Math.max(S.beat, ni(sv('mb', 1), 1, 9, 1));
      S.lvl = Math.min(8, Math.floor(Math.sqrt(S.n)));
      Object.assign(S, { tellOn: sv('tu', 0) ? 1 : 0, tell: ni(sv('tell', 0), 0, 9999, 0), thx: sv('thx', 0) ? 1 : 0, q6: 0, home: 0, fort: 0, fortSaid: false, tellPaid: 0, lastTell: -1e9, tellTimes: [], lastTellSpam: -1e9, callDone: {}, lastCurt: -1e9, picketOn: false });
      S.q6 = S.tellOn;
      /* ---- DOM ---- */
      const banner = el('div', { class: c('banner'), role: 'status' });
      const wobble = el('svg', { width: 0, height: 0, 'aria-hidden': 'true', style: 'position:absolute' }, el('defs', {}, el('filter', { id: 'sb-wobble' }, el('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.03', numOctaves: '2', result: 'n' }),
          el('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: '2.5' }))));
      const earSvg = function () {
        return el('svg', { viewBox: '0 0 60 80', 'aria-hidden': 'true' }, el('path', { d: 'M30 4 C8 4 2 28 12 44 C18 54 12 66 26 74 C40 80 54 66 54 40 C54 18 44 4 30 4 Z', fill: '#F5A9A0', stroke: '#8F6B3A', 'stroke-width': '3' }),
          el('path', { d: 'M30 18 C16 18 14 34 24 40 C32 45 30 56 38 52', fill: 'none', stroke: '#C86D64', 'stroke-width': '3', 'stroke-linecap': 'round' }));
      }; const pupils = [el('div', { class: c('pupil') }), el('div', { class: c('pupil') })];
      const peek = el('div', { class: c('peek'), 'aria-hidden': 'true' });
      const earEl = el('div', { class: c('ear'), 'aria-hidden': 'true' }, earSvg());
      const ear2El = el('div', { class: c('ear2'), 'aria-hidden': 'true' }, earSvg());
      const pl1 = el('div', { class: c('pl1') }), pl2 = el('div', { class: c('pl2') }), nm = el('span', { class: c('nm') });
      const plaque = el('div', { class: c('plaque') }, pl1, pl2, el('div', { class: c('prow') }, el('span', { text: '🕰️ 4:17' }), nm));
      const chin = el('div', { class: c('chin'), 'aria-hidden': 'true' });
      const tape = el('div', { class: c('tape'), 'aria-hidden': 'true', text: 'UNDER REVIEW' });
      const face = el('div', { class: c('face') }, el('div', { class: c('eyes'), 'aria-hidden': 'true' }, el('div', { class: c('eye') }, pupils[0]), el('div', { class: c('eye') }, pupils[1])),
        el('div', { class: c('lamp'), 'aria-hidden': 'true' }), el('div', { class: c('slot'), 'aria-hidden': 'true' }), peek, el('div', { class: c('hand'), 'aria-hidden': 'true' }), tape, earEl, ear2El, plaque, chin);
      const boxEl = el('div', { class: c('box'), role: 'button', tabindex: '0', 'aria-label': 'The Suggestion Box. Press to say hello. It will say hello back, in a way.' }, face);
      const orbPos = [['-9%', '4%'], ['93%', '-2%'], ['-16%', '60%'], ['100%', '82%'], ['46%', '-9%']];
      const orbs = orbPos.map(function (p, i) {
        const o = el('span', { class: c('orb'), 'aria-hidden': 'true', text: '👂' });
        o.style.left = p[0]; o.style.top = p[1]; o.style.animationDelay = (i * 0.47).toFixed(2) + 's'; o.style.animationDuration = (2 + i * 0.37).toFixed(2) + 's';
        return o; }); const boxWrap = el('div', { class: c('boxwrap') }, boxEl);
      orbs.forEach(function (o) { boxWrap.appendChild(o); });
      const matchEl = el('div', { class: c('mb'), 'aria-hidden': 'true', hidden: true, text: '📮 SUGGESTIONS FOR THE BOX' }); boxWrap.appendChild(matchEl);
      const tagEl = el('div', { class: c('tag'), 'aria-live': 'off', text: '...' });
      const ta = el('textarea', { class: c('ta'), rows: 2, maxlength: 80, spellcheck: false, autocomplete: 'off', 'aria-label': 'Your suggestion (80 characters at most). Enter posts it.', placeholder: PH[0] });
      const ghHid = el('span', { class: c('gh0') }), ghSuf = el('span', { class: c('gh') });
      const ghostL = el('div', { class: c('ghostl'), 'aria-hidden': 'true' }, ghHid, ghSuf);
      const stampSt = el('div', { class: c('stampst'), 'aria-hidden': 'true' });
      const grip = el('div', { class: c('grip'), 'aria-hidden': 'true', text: 'SLIP  -  FLICK UP TO POST' });
      const acceptBtn = el('button', { class: c('accept'), type: 'button', hidden: true, text: 'Accept (Tab)', onclick: function () { acceptGhost(); } });
      const paper = el('div', { class: c('paper') }, grip, ghostL, ta, stampSt);
      const slipEl = el('div', { class: c('slip') }, paper, acceptBtn);
      const drawer = el('div', { class: c('drawer'), role: 'group', 'aria-label': 'Word tiles' });
      const postBtn = el('button', { class: c('btn', 'post'), type: 'button', text: 'POST IT', onclick: function () { tryPost('Standard'); } });
      const reshufBtn = el('button', { class: c('btn'), type: 'button', text: 'Shuffle', 'aria-label': 'Reshuffle the word drawer', onclick: function () { reshuffle(); } });
      const leanBtn = el('button', { class: c('btn', 'lil'), type: 'button', hidden: true, 'aria-pressed': 'false', text: '👂 Lean In (L)', onclick: function () { leanIn(); } });
      const verBtn = el('button', { class: c('btn'), type: 'button', hidden: true, text: '🕵️ Verify (V)', onclick: function () { verify(); } });
      const retractBtn = el('button', { class: c('btn'), type: 'button', text: 'Retract', onclick: function () { retract(); } });
      const tellBtn = el('button', { class: c('btn', 'tell'), type: 'button', hidden: true, text: '📮 Suggest To The Box', onclick: function () { tellBox(); } });
      const actions = el('div', { class: c('actions') }, postBtn, reshufBtn, leanBtn, verBtn, tellBtn, retractBtn);
      const offerEl = el('div', { class: c('offer'), hidden: true });
      const postureEl = el('div', { class: c('posture'), hidden: true, text: 'Posture: Pending' });
      const pileEl = el('div', { class: c('pile'), hidden: true, 'aria-label': 'Tabled slips' });
      const anonBtn = el('button', { class: c('anon'), type: 'button', text: 'Anonymous Slip No. 7 1/2', onclick: function () { anonClick(); } });
      const fallEl = el('div', { class: c('fall'), 'aria-hidden': 'true' });
      const certEl = el('div', { class: c('cert'), hidden: true });
      const picket = el('div', { class: c('picket'), 'aria-hidden': 'true', hidden: true });
      LN.PICKET.forEach(function (t) { picket.appendChild(el('span', { text: '📎 ' + t })); });
      const desk = el('div', { class: c('desk') }, slipEl, drawer, actions, offerEl, postureEl, pileEl, anonBtn, fallEl, certEl, picket);
      const left = el('div', { class: c('left') }, boxWrap, tagEl, desk);
      const sStamp = el('span', { class: c('sstamp'), 'aria-hidden': 'true', text: 'S' });
      const wallTiles = TILES.map(function (t, i) {
        const wn = el('span', { class: c('wn'), 'aria-hidden': 'true', text: String(i + 1) });
        const wi = el('div', { class: c('wi'), 'aria-hidden': 'true', text: t.i });
        const wm = el('div', { class: c('wm') }); const ws = el('div', { class: c('ws') });
        const wh = el('span', { class: c('wh'), hidden: true, 'aria-hidden': 'true' });
        const wf = el('span', { class: c('wf'), hidden: true, 'aria-hidden': 'true' });
        const wl = el('span', { class: c('wl'), hidden: true, 'aria-hidden': 'true', text: '👍' });
        const b = el('button', { class: c('wt'), type: 'button', onclick: function () { onTile(i); } }, wn, wi, wm, ws, wh, wf, wl);
        return { b: b, wm: wm, ws: ws, wh: wh, wf: wf, wl: wl }; });
      const mk = el('div', { class: c('mk'), 'aria-hidden': 'true' });
      const spy = el('div', { class: c('spy'), 'aria-hidden': 'true', text: '🕵️', hidden: true });
      const grid = el('div', { class: c('grid') });
      wallTiles.forEach(function (t) { grid.appendChild(t.b); });
      grid.appendChild(mk); grid.appendChild(spy);
      const curtain = el('div', { class: c('curtain'), role: 'button', tabindex: '0', 'aria-label': 'The curtain in front of the Somewhere Wall. Press to poke it, gently.' }, el('div', { text: 'THE SOMEWHERE WALL IS BEHIND THIS CURTAIN' }), el('div', { class: c('dots') }, el('span'), el('span'), el('span')),
        el('div', { class: c('shoes'), 'aria-hidden': 'true' }, el('span', { text: '👞' }), el('span', { text: '👟' })), el('span', { class: c('chand'), 'aria-hidden': 'true', text: '✋' }));
      const cmt = el('div', { class: c('cmt'), 'aria-hidden': 'true', hidden: true });
      for (let ci = 0; ci < 9; ci++) cmt.appendChild(el('span', { class: ci === 5 ? c('chair', 'sk') : c('chair'), text: ci === 5 ? '🧦' : null }));
      const wcap = el('div', { class: c('wcap') }); const wall = el('div', { class: c('wall') }, el('div', { class: c('wallh') }, el('span', { text: 'THE SOMEWHERE WALL' }), sStamp, el('span', { class: c('clock'), text: '🕰️ 4:17' })), grid, wcap, cmt, curtain);
      const sock = el('div', { class: c('sock'), 'aria-hidden': 'true', hidden: true, text: '🧦' }); wall.appendChild(sock);
      const hmEl = el('div', { class: c('hm'), 'aria-hidden': 'true', hidden: true, text: 'hm.' });
      const right = el('div', { class: c('right') }, wall);
      const inner = el('div', { class: c('inner') }, left, right);
      const mslip = el('div', { class: c('mslip'), 'aria-label': "Management's slip" });
      const mtiles = el('div', { class: c('mtiles'), role: 'group', 'aria-label': "Management's words" });
      const mReshuf = el('button', { class: c('btn'), type: 'button', text: 'Reshuffle', onclick: function () { mgDeal(); } });
      const mPost = el('button', { class: c('btn', 'post'), type: 'button', text: 'Post it quietly', onclick: function () { mgmtPost('click'); } });
      const mgmtEl = el('div', { class: c('mgmt'), hidden: true }, el('div', { style: 'font-weight:900;font-size:.8em;letter-spacing:.08em', text: "MANAGEMENT'S SLIP (FIRST EVER)" }), mslip, mtiles, el('div', { class: c('actions') }, mReshuf, mPost));
      const bigSticker = el('div', { class: c('bigstk'), hidden: true, 'aria-hidden': 'true' });
      const big = el('div', { class: c('big') }, el('div', { class: c('bigslot'), 'aria-hidden': 'true' }), el('div', { class: c('biglab'), 'aria-hidden': 'true', text: 'SUGGESTION BOX (MANAGEMENT)' }), inner, bigSticker, mgmtEl);
      const statusEl = el('div', { class: c('status'), role: 'status', 'aria-live': 'polite' });
      const railEl = el('div', { class: c('rail'), 'aria-hidden': 'true' });
      const beatBtn = el('button', { class: c('beat'), type: 'button', text: 'BEAT', 'aria-label': 'Beat. Press on the pulse during a reading.' });
      const meterEl = el('div', { class: c('meter'), 'aria-hidden': 'true' });
      const pctEl = el('div', { class: c('pct') });
      const heldFill = el('div', { class: c('heldfill') });
      const heldBar = el('div', { class: c('held'), 'aria-hidden': 'true' }, heldFill);
      const skipBtn = el('button', { class: c('skip'), type: 'button', hidden: true, text: 'Skip', 'aria-label': 'Skip this reading', onclick: function () { if (S.reading && !S.reading.done) finishRead(S.reading, 'skip'); } });
      const stage = el('div', { class: c('stage'), tabindex: '-1' }, statusEl, railEl, beatBtn, el('div', { class: c('meterrow') }, meterEl, pctEl, heldBar, skipBtn));
      const stI = {}; const stripItem = function (key, label, init) {
        const v = el('b', { text: init || '0' });
        const item = el('span', { class: c('si') }, label + ': ', v);
        stI[key] = { item: item, v: v }; return item; };
      const strip = el('div', { class: c('strip') }, stripItem('heard', 'Heard', '100%'), stripItem('sin', 'Suggestions In'), stripItem('app', 'Applied'), stripItem('rate', 'Implementation Rate', 'Probably'),
        stripItem('sandra', 'Sandra Has Read'), stripItem('feel', 'Feelings Delivered'), stripItem('clock', 'Clock', '7:30 (it is 4:17)'), stripItem('career', 'Career', '1')); stI.clock.item.classList.add(k('clk'));
      const trail = el('div', { class: c('trail'), 'aria-label': 'Recent slips' });
      const cursorEl = el('div', { class: c('cursor'), 'aria-hidden': 'true' });
      big.appendChild(stage);
      const app = el('div', { class: c('root') }, wobble, banner, big, strip, trail, cursorEl, hmEl);
      app.dataset.beat = '1'; app.dataset.phase = 'intro'; app.dataset.career = '1'; app.dataset.compact = '0'; app.dataset.reduced = '0';
      root.appendChild(app); api.setTitle('The Suggestion Box (Excellent Listener)');
      /* ---- small utils ---- */
      const cv = function (elm, name, val) { try { elm.style.setProperty(name, String(val)); } catch (e) { /* ignore */ } };
      const restart = function (elm, cls) { elm.classList.remove(cls); void elm.offsetWidth; elm.classList.add(cls); };
      const setStatus = function (t) { statusEl.textContent = String(t == null ? '' : t); };
      const clean = function (v) { return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80); };
      const normOf = function (v) { return clean(v).toLowerCase(); };
      const lastWord = function (t) { const w = String(t).split(/\s+/).filter(Boolean); return w.length ? w[w.length - 1].toLowerCase().replace(/[^a-z0-9']/g, '') || 'it' : 'it'; };
      const T = function (ms, fn) {
        const id = S.runId;
        const h = api.setTimeout(function () { if (id !== S.runId) return; fn(); }, Math.max(1, ms));
        S.timers.push(h); return h; };
      const B = function (ms, fn) { return api.setTimeout(fn, Math.max(1, ms)); };
      const say = function (text, o) {
        o = o || {}; text = String(text == null ? '' : text); if (!text) return false;
        if (api.now() < S.hushUntil && !o.force) return false; S.lastVoice = api.now();
        if (!o.noStatus && !o.tag && !(S.reading && !S.reading.done)) setStatus(text);
        if (o.tag) tag(o.tagText || (text.length <= 60 ? text : nx('OH', OH)), dur(o.tagMs || 9000));
        const op = { mood: o.mood || 'neutral', priority: o.priority == null ? 1 : o.priority };
        if (o.who) op.who = o.who; const ok = api.say(text, op);
        if (!ok && o.retry) B(dur(2500), function () { if (api.now() >= S.hushUntil || o.force) api.say(text, op); });
        return ok; }; const tag = function (text, ms) {
        text = String(text == null ? '' : text).trim() || '...'; tagEl.textContent = text; S.lastVoice = api.now();
        restart(tagEl, k('on')); if (S.tagT) api.clearTimeout(S.tagT);
        S.tagT = api.setTimeout(function () { tagEl.classList.remove(k('on')); }, ms || dur(7000));
      }; const boxSay = function (text, o) {
        o = o || {}; tag(text, o.ms);
        if (!o.tagOnly) api.say(String(text), { who: 'The Box', mood: o.mood || 'neutral', priority: o.priority == null ? 1 : o.priority });
      }; const banr = function (text, ms) {
        banner.textContent = text;
        B(ms, function () { if (banner.textContent === text) banner.textContent = ''; }); };
      const flickRate = function (text, ms) {
        stI.rate.v.textContent = text; const tok = ++S.rateTok;
        B(ms, function () { if (tok === S.rateTok) stI.rate.v.textContent = 'Probably'; }); };
      const probLabel = function () {
        let lab = HINTS[0][1]; HINTS.forEach(function (h) { if (S.applied >= h[0]) lab = h[1]; });
        return lab; };
      const pName = function () { const n = ss(api.player && api.player.name, 24).trim(); return n || 'Valued Employee'; };
      const persist = function () {
        try {
          api.save.set('beat', Math.min(S.beat, 8)); api.save.set('mb', Math.min(S.maxBeat, 9)); api.save.set('career', S.career); api.save.set('n', S.n);
          api.save.set('applied', S.applied); api.save.set('silences', S.silences); api.save.set('fd', S.feelings); api.save.set('first', S.first);
          api.save.set('bernard', S.bernard); api.save.set('egg', S.egg); api.save.set('dennis', S.dennis); api.save.set('cert', S.cert); api.save.set('b9paid', S.b9paid);
          api.save.set('here', S.here); api.save.set('sj', S.sandraJams); api.save.set('abol', S.abol); api.save.set('lr', S.rareDone); api.save.set('lh', S.heard.slice(0, 13));
          api.save.set('tiles', S.tiles.slice(0, 9)); api.save.set('ring', S.ring.slice(-40)); api.save.set('slips', S.slips.slice(-6));
          api.save.set('tu', S.tellOn); api.save.set('tell', S.tell); api.save.set('thx', S.thx);
        } catch (e) { /* ignore */ }
      };
      /* ---- painting ---- */
      function tileName(i) {
        if (S.here === i) return 'Somewhere (You Are Here)'; const cnt = S.tiles[i];
        if (cnt >= 12) return pName() + "'s Somewhere"; if (cnt >= 8) return LN.RENAME[i];
        return TILES[i].n; }
      function paintTile(i) {
        const t = wallTiles[i], cnt = S.tiles[i]; t.wm.textContent = tileName(i);
        t.wm.classList.toggle(k('wob2'), cnt >= 8 || S.here === i);
        t.wh.hidden = cnt < 3; t.wh.textContent = HATS[i % 3]; t.wf.hidden = cnt < 5;
        t.ws.textContent = ''; let list = S.stk[i] || [];
        if (S.here === i) list = ['Applied to you, probably.'];
        const show = S.here === i ? 1 : Math.min(3, Math.max(list.length, Math.min(cnt, 3)));
        for (let j = 0; j < show; j++) {
          const sk = el('span', { class: c('stk'), text: list[list.length - show + j] || '(filed)' });
          cv(sk, '--r', ((j * 5 + i * 3) % 9 - 4) + 'deg'); t.ws.appendChild(sk); }
        if (cnt > 3) t.ws.appendChild(el('span', { class: c('stk'), text: '+' + num(cnt - 3) }));
        t.b.setAttribute('aria-label', 'Somewhere ' + (i + 1) + ': ' + tileName(i) + '. Applied ' + num(cnt) + (cnt === 1 ? ' time.' : ' times.'));
        t.b.disabled = !S.curtainUp; }
      function paintWall() { for (let i = 0; i < 9; i++) paintTile(i); }
      function paintStrip() {
        stI.sin.v.textContent = num(S.n); stI.app.v.textContent = num(S.applied);
        stI.sandra.v.textContent = S.sandraTech ? '1 (technically)' : ['0', '0 (reread)', '0 (reread, twice)', '0 (reread; she is thorough)'][Math.min(3, S.sandraJams)];
        const unit = S.feelings >= 25 ? 'weather' : S.feelings >= 10 ? 'moods' : 'feelings';
        stI.feel.v.textContent = num(S.feelings) + ' ' + unit;
        stI.career.v.textContent = S.career <= 1 ? '1' : S.career + ' (continued from ' + (S.career - 1) + ', one slip ago)';
        stI.rate.item.hidden = S.maxBeat < 4; stI.sandra.item.hidden = S.maxBeat < 6; stI.career.item.hidden = S.career <= 1 && !S.cert;
        stI.feel.item.hidden = S.maxBeat < 3; }
      function paintPlaque() {
        pl1.textContent = ABOL_PL[S.abol]; const lv = Math.max(1, S.lvl);
        pl2.textContent = LN.LEVELS[lv - 1]; nm.textContent = S.bernard ? 'Bernard' : 'B_RN_RD';
        boxEl.classList.toggle(k('named'), !!S.bernard);
        boxEl.classList.toggle(k('matchbox'), S.abol >= 5); cv(app, '--abol', ABOL[S.abol]);
        const shown = S.lvl >= 3 ? Math.min(5, S.lvl - 2) : 0;
        orbs.forEach(function (o, i) { o.classList.toggle(k('show'), i < shown); }); }
      function paintTrail() {
        trail.textContent = ''; const arr = S.slips.slice(-6);
        const earlier = Math.max(0, S.n - arr.length);
        if (earlier > 0) trail.appendChild(el('span', { class: c('tchip'), text: 'Earlier Slips (' + num(earlier) + ')' }));
        arr.forEach(function (s) { trail.appendChild(el('span', { class: c('tchip'), text: s })); });
      }
      function baseListen() { return S.maxBeat >= 5 ? 0.55 : 1; }
      function earSize() {
        const v = ta.value.trim(); const words = v ? v.split(/\s+/).length : 0;
        cv(app, '--ear', S.sleepy ? 0.8 : clamp(1 + 0.05 * Math.min(words, 12) + 0.1 * Math.min(8, S.bigRead), 0.8, 2.4).toFixed(3));
      }
      function setCurtain(up, silent) {
        const was = S.curtainUp; S.curtainUp = !!up; curtain.classList.toggle(k('up'), !!up); app.dataset.curtain = up ? '1' : '0';
        curtain.setAttribute('aria-hidden', up ? 'true' : 'false'); curtain.tabIndex = up ? -1 : 0; cmt.hidden = !up;
        if (up && !was && !silent) api.sfx('whoosh'); paintWall(); }
      function refreshFlags() {
        const u = S.maxBeat;
        [3, 4, 5, 6, 7, 8].forEach(function (b) { app.classList.toggle(k('b' + b), u >= b); });
        leanBtn.hidden = u < 3; verBtn.hidden = u < 4; tellBtn.hidden = !S.tellOn; matchEl.hidden = !S.tellOn;
        app.dataset.beat = String(Math.min(S.beat, 10)); app.dataset.career = String(S.career);
        cv(app, '--listen', baseListen()); paintStrip(); paintPlaque(); }
      function refreshUI() { refreshFlags(); paintWall(); paintTrail(); }
      /* ---- phases ---- */
      function lockInner() {
        inner.setAttribute('inert', ''); inner.setAttribute('aria-hidden', 'true'); inner.style.pointerEvents = 'none'; S.locked = true;
      }
      function unlockInner() {
        if (!S.locked) return;
        inner.removeAttribute('inert'); inner.removeAttribute('aria-hidden'); inner.style.pointerEvents = ''; S.locked = false;
      }
      function fixFocus() {
        const a = document.activeElement;
        if (!a || a.tagName === 'BODY' || (root.contains(a) && a.disabled)) {
          try { (S.reading ? beatBtn : stage).focus({ preventScroll: true }); } catch (e) { /* ignore */ }
        }
      }
      function focusSlip() {
        if (S.coarse || ta.disabled || S.phase !== 'write') return;
        const a = document.activeElement;
        if (!a || a.tagName === 'BODY' || root.contains(a)) { try { ta.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      }
      function setControls(w) {
        ta.disabled = !w;
        for (let i = 0; i < drawer.children.length; i++) drawer.children[i].disabled = !w;
        reshufBtn.disabled = !w; retractBtn.disabled = !w; leanBtn.disabled = !w; verBtn.disabled = !w; tellBtn.disabled = !w;
        fixFocus(); }
      function go(ph) {
        S.runId++; S.timers.forEach(function (h) { api.clearTimeout(h); }); S.timers = [];
        S.reading = null; S.held = null; skipBtn.hidden = true; if (S.leaning) cancelLean(true); endFlick(false);
        heldBar.classList.remove(k('on'), k('run')); railEl.classList.remove(k('shut'));
        beatBtn.classList.remove(k('armed')); app.classList.remove(k('hushed'));
        S.phase = ph; app.dataset.phase = ph; placeStage();
        if (ph !== 'zoom' && ph !== 'mgmt') { unlockInner(); cv(app, '--zoom', 1); inner.style.marginBottom = ''; }
        if (ph !== 'mgmt') stage.hidden = false;
      }
      function placeStage() {
        const inLeft = app.dataset.stack === '1' && S.phase !== 'zoom' && S.phase !== 'mgmt';
        if (inLeft) { if (stage.parentNode !== left || stage.previousSibling !== desk) left.appendChild(stage); }
        else if (stage.parentNode !== big) big.appendChild(stage);
      }
      function enterWrite(keep) {
        go('write'); newSlip(keep); setControls(true); refreshFlags(); restoreListen(); earSize();
        if (app.dataset.stack === '1' && S.scrolled) { try { slipEl.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ } }
        if (S.offerDue) { S.offerDue = false; pushOffer(); }
        T(dur(80), focusSlip); }
      function newSlip(keep) {
        if (!keep) ta.value = ''; slipEl.classList.remove(k('fly'), k('taped')); slipEl.style.transform = '';
        restart(slipEl, k('fresh')); stampSt.classList.remove(k('on'));
        boxEl.classList.remove(k('gentle'), k('flinch'), k('jam')); S.ghostSlip = pickGhostSlip();
        paintGhost(); }
      /* ---- tiles, ghost, text ---- */
      let tileBag = [];
      function nextWord() { if (!tileBag.length) tileBag = api.shuffle(WORDS); return tileBag.pop(); }
      function dressTile(b) {
        const w = nextWord();
        b.textContent = w; b.dataset.w = w; b.setAttribute('aria-label', 'Word tile: ' + w);
        cv(b, '--r', (api.rand() * 4 - 2).toFixed(2) + 'deg'); cv(b, '--c', TCOL[api.randInt(0, TCOL.length - 1)]);
      }
      function dealTiles() {
        drawer.textContent = ''; for (let i = 0, nt = app.dataset.compact === '1' ? 8 : 10; i < nt; i++) {
          const b = el('button', { class: c('tile'), type: 'button' }); dressTile(b);
          api.on(b, 'click', function () { useTile(b); }); drawer.appendChild(b); }
        for (let i = 0; i < drawer.children.length; i++) drawer.children[i].disabled = S.phase !== 'write';
      }
      function useTile(b) {
        if (S.phase !== 'write') return; const w = b.dataset.w || '';
        ta.value = (ta.value + w + ' ').slice(0, 80); stat('tilesUsed'); api.sfx('blip');
        dressTile(b); onText();
        if (burst(S.tileTimes, 12, 6000, 25000, 'lastTileSpam')) { stat('tileSpam'); say(nx('YT', LN.YT), { priority: 1, mood: 'confused', noStatus: true, tag: true, retry: true }); } }
      function reshuffle() {
        if (S.phase !== 'write') return; dealTiles(); api.sfx('whoosh');
        if (api.now() - S.lastReact > dur(5000)) { S.lastReact = api.now(); tag(nx('LRS', LN.LIVE.reshuffle)); }
      }
      function burst(list, n, ms, gap, lastKey) {
        const now = api.now(); list.push(now); while (list.length && now - list[0] > dur(ms)) list.shift();
        if (list.length >= n && now - S[lastKey] > dur(gap)) { S[lastKey] = now; list.length = 0; return true; } return false; }
      function retract() {
        if (S.phase !== 'write') return; const had = !!ta.value; ta.value = ''; boxEl.classList.remove(k('gentle'), k('flinch')); onText();
        if (had) {
          api.sfx('blip'); tag(nx('LRT', LN.LIVE.retract));
          if (burst(S.retractTimes, 6, 8000, 30000, 'lastRetractSpam')) { stat('retractSpam'); say(nx('YR', LN.YR), { priority: 1, mood: 'confused', noStatus: true, tag: true, retry: true }); }
        }
      }
      function onText() { S.lastInput = api.now(); paintGhost(); earSize(); }
      function ringAdd(raw) {
        raw.toLowerCase().split(/\s+/).forEach(function (w) {
          w = w.replace(/[^a-z']/g, ''); if (!/^[a-z']{2,14}$/.test(w)) return; let idx = -1;
          for (let i = 0; i < S.ring.length; i++) if (S.ring[i][0] === w) { idx = i; break; }
          if (idx >= 0) { const p = S.ring.splice(idx, 1)[0]; p[1] = Math.min(9999, p[1] + 1); S.ring.push(p); }
          else S.ring.push([w, 1]); while (S.ring.length > 40) S.ring.shift(); }); }
      function wpick(excl) {
        const pool = S.ring.map(function (p) { return [p[0], p[1]]; }).concat(GHOST_BANK.map(function (w) { return [w, 0.3]; }));
        let tot = 0; pool.forEach(function (p) { if (excl.indexOf(p[0]) < 0) tot += p[1]; });
        let r = api.rand() * tot;
        for (let i = 0; i < pool.length; i++) { if (excl.indexOf(pool[i][0]) >= 0) continue; r -= pool[i][1]; if (r <= 0) return pool[i][0]; }
        return pool[0][0]; }
      function pickGhostSlip() {
        if (S.maxBeat < 6 || S.n < 6) return ''; const want = api.randInt(3, 6), out = [];
        while (out.length < want) out.push(wpick(out)); return out.join(' ').slice(0, 80); }
      function ghostSuffix(v) {
        if (S.maxBeat < 5) return ''; const low = v.toLowerCase();
        for (let i = S.slips.length - 1; i >= 0; i--) {
          const s = S.slips[i];
          if (s.length > low.length && s.toLowerCase().indexOf(low) === 0) return v.length + (s.length - low.length) <= 80 ? s.slice(low.length) : '';
        }
        const m = /([A-Za-z']*)$/.exec(v); const pre = m ? m[1].toLowerCase() : '';
        const pm = /([A-Za-z']+)\s+[A-Za-z']*$/.exec(v); const prev = pm ? pm[1].toLowerCase() : '';
        let best = null, bw = 0;
        const consider = function (w, wt) { if (w === prev || w.length <= pre.length || w.indexOf(pre) !== 0) return; if (wt >= bw) { best = w; bw = wt; } };
        S.ring.forEach(function (p) { consider(p[0], p[1]); });
        GHOST_BANK.forEach(function (w) { consider(w, 0.3); }); if (!best) return '';
        const suf = best.slice(pre.length) + ' '; return v.length + suf.length <= 80 ? suf : ''; }
      function guessNext() {
        let best = '', bw = 0;
        S.ring.forEach(function (p) { if (p[1] >= bw) { best = p[0]; bw = p[1]; } }); return best; }
      function paintGhost() {
        let suf = ''; const v = ta.value;
        if (S.phase === 'write' && S.maxBeat >= 5 && !ta.disabled) {
          if (!v && S.ghostSlip) suf = S.ghostSlip;
          else if (v && ta.selectionStart === v.length) suf = ghostSuffix(v); }
        if (suf && !S.ghost) {
          if (!v && !S.ghostPre) { S.ghostPre = true; tag(LN.GHOST.pre); }
          else if (v && !S.ghostShown) { S.ghostShown = true; tag(LN.GHOST.tab); }
        }
        S.ghost = suf; ghHid.textContent = v; ghSuf.textContent = suf; acceptBtn.hidden = !suf;
        ta.placeholder = (suf && !v) ? '' : PH[S.ph]; }
      function acceptGhost() {
        if (S.phase !== 'write' || !S.ghost) return false;
        ta.value = (ta.value + S.ghost).slice(0, 80); S.ghosts++; stat('ghosts'); api.sfx('pop');
        if (S.ghosts % 5 === 0) { award(0.5, 'ghosts'); say(LN.GHOST.five, { mood: 'proud', priority: 1 }); }
        onText();
        try { ta.focus({ preventScroll: true }); ta.setSelectionRange(ta.value.length, ta.value.length); } catch (e) { /* ignore */ }
        paintGhost(); return true; }
      /* ---- spam, congestion ---- */
      function pushPressure() {
        const now = api.now(); S.pressure.push(now);
        while (S.pressure.length && now - S.pressure[0] > 20000) S.pressure.shift(); let recent = 0;
        S.pressure.forEach(function (t) { if (now - t <= 10000) recent++; });
        if (recent >= 15) congest('presses'); }
      function congest() {
        const now = api.now(); if (now - S.congestAt < dur(20000)) return;
        S.congestAt = now; S.congests++; S.blockUntil = now + dur(6000); S.pressure = [];
        api.sfx('pop');
        boxEl.classList.add(k('cough')); B(dur(4000), function () { boxEl.classList.remove(k('cough')); });
        for (let i = 0; i < 6; i++) {
          const bl = el('div', { class: c('blank') });
          bl.style.left = (4 + i * 15 + api.randInt(0, 6)) + '%'; bl.style.animationDelay = (i * 0.12).toFixed(2) + 's';
          fallEl.appendChild(bl);
          B(dur(3000), function () { if (bl.parentNode) bl.parentNode.removeChild(bl); }); }
        while (fallEl.children.length > 6) fallEl.removeChild(fallEl.firstChild); stat('overflows');
        if (!S.feeDone) { S.feeDone = true; award(-0.5, 'Overflow Fee'); }
        banr('ONE AT A TIME (SUGGESTION)', dur(12000));
        if (S.congests === 1) say(LN.Y.Y1, { mood: 'confused', priority: 2, retry: true });
        else if (S.congests === 2) {
          api.confetti(undefined, undefined, 18); api.sfx('honk'); api.achieve('suggestion-box.overflow');
          boxSay(LN.Y.Y5, { mood: 'confused' });
          B(dur(1800), function () { say(LN.Y.Y6, { mood: 'confused', priority: 1 }); });
        } else say(nx('YC', [LN.Y.Y2, LN.Y.Y3, LN.Y.Y4].concat(LN.YC)), { mood: 'confused', priority: 1 }); }
      /* ---- posting ---- */
      function rejectPost() { restart(postBtn, k('shake')); pushPressure(); }
      function tryPost(style) {
        if (S.phase !== 'write' || S.jam || api.now() < S.blockUntil) { rejectPost(); return false; }
        let raw = clean(ta.value); if (!raw && S.ghostSlip) raw = S.ghostSlip;
        doPost(raw, style || 'Standard'); return true; }
      function doPost(raw, style) {
        const now = api.now(); S.n++; S.postsBeat++; S.postsMount++; S.postTimes.push(now);
        while (S.postTimes.length && now - S.postTimes[0] > 60000) S.postTimes.shift();
        stat('posted'); if (!S.first) S.first = raw || 'a bigger box';
        award(S.postsMount === 1 ? 1 : 0.5, 'post'); api.achieve('suggestion-box.first');
        if (!raw) { S.silences++; stat('silences'); } else { ringAdd(raw); S.slips.push(raw); while (S.slips.length > 6) S.slips.shift(); }
        paintTrail();
        if (S.maxBeat >= 7 && S.n % 3 === 0 && !(S.maxBeat >= 6 && S.n % 7 === 0)) S.offerDue = true;
        stampSt.textContent = style; restart(stampSt, k('on')); slipEl.style.transform = '';
        slipEl.classList.add(k('fly'));
        api.sfx(style === 'Airmail' ? 'whoosh' : style === 'Limp' ? 'blip' : style === 'Ceremonial' ? 'bell' : 'pop');
        restart(boxEl, k('nod')); paintStrip(); const norm = normOf(raw); go('post');
        setControls(false); if (S.maxBeat >= 2) setStatus(LN.STYLE[style] || LN.STYLE.Standard);
        if (S.n === 1) B(dur(5200), function () { say(LN.D1, { mood: 'proud', priority: 1, noStatus: true, retry: true }); });
        const lv = Math.min(8, Math.floor(Math.sqrt(S.n)));
        if (lv > S.lvl) { S.lvl = lv; paintPlaque(); if (LN.LVLSAY[lv]) B(dur(1500), function () { say(LN.LVLSAY[lv], { mood: 'proud', priority: 1, noStatus: true, retry: true }); }); }
        T(dur(style === 'Ceremonial' ? 1500 : 500), function () { landed(raw, norm); });
        if (S.postTimes.length >= 8) congest('posts'); }
      function landed(raw, norm) {
        if (S.maxBeat >= 6 && S.n % 7 === 0 && S.n !== 77) { startJam(raw); return; }
        listen(raw, norm); }
      function listen(raw, norm) {
        go('listen'); api.sfx('pop'); restart(boxEl, k('flap')); restart(app, k('flap'));
        cv(app, '--listen', 1); echo(raw);
        T(dur(S.n > 4 ? 800 : 1200), function () { cv(app, '--listen', baseListen()); react(raw, norm); }); }
      function echo(raw) {
        stat('echoes'); const n = S.n;
        if (S.careerFirst) { S.careerFirst = false; tag('please read me'); return; }
        if (n <= 4) { tag(raw ? lastWord(raw) : '...'); return; }
        if (n <= 8) { const w = lastWord(S.lastTierLine || 'soup'); tag(w + '. ' + w + '.'); return; }
        if (n <= 14) { tag('...', dur(1000)); return; }
        tag(guessNext() || '...'); }
      /* ---- classifier ---- */
      function coolOk(key) {
        const now = api.now();
        if (S.cool[key] != null && now - S.cool[key] < dur(90000)) return false; S.cool[key] = now;
        return true; }
      function analyze(norm, raw) {
        if (!norm) return { type: 'empty' };
        const bare = norm.replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim();
        const w = bare.split(' ').filter(Boolean);
        const hasW = function (s) { return w.indexOf(s) >= 0; };
        if (bare === 'nothing' || bare === 'no suggestions') return { type: 'perfect' };
        if (bare === 'bernard') return { type: 'bernard' };
        if (THANKS.indexOf(bare) >= 0) return { type: 'thanks' };
        if (bare === 'sandra') return { type: 'sandrax' };
        if (bare === 'tuesday') return { type: 'tuesdayx' };
        if (bare === 'please read me' && !S.egg) return { type: 'egg' };
        const cmp = norm.replace(/\s+/g, ''); if (cmp === '71/2' || cmp === '7.5' || cmp === 'sevenandahalf' || cmp === '7and1/2') return { type: 'half' };
        for (let i = 0; i < REALW.length; i++) if (hasW(REALW[i]) && coolOk('real:' + REALW[i])) return { type: 'real', word: REALW[i] };
        for (let i = 0; i < ABOL_PH.length; i++) if (bare.indexOf(ABOL_PH[i]) >= 0 && coolOk('abolish')) return { type: 'abolish' };
        if (w.length === 1 && NAMES_WRONG.indexOf(bare) >= 0) return { type: 'wrongname' };
        if (bare.length <= 3) return { type: 'tiny' };
        const kw = function (type, ok) { return ok && coolOk(type) ? { type: type } : null; };
        let r; if ((r = kw('question', raw.indexOf('?') >= 0))) return r;
        if ((r = kw('box', hasW('box')))) return r;
        if ((r = kw('sandra', bare.indexOf('sandra') >= 0))) return r;
        if ((r = kw('dennis', hasW('dennis') || hasW('plant') || hasW('ficus')))) return r;
        if ((r = kw('gerald', hasW('gerald') || hasW('potato')))) return r;
        if ((r = kw('toast', hasW('toast')))) return r;
        if ((r = kw('tuesday', hasW('tuesday')))) return r;
        if ((r = kw('rock', hasW('rock')))) return r;
        if ((r = kw('stapler', hasW('stapler')))) return r;
        if ((r = kw('please', hasW('please')))) return r;
        if (S.seen[norm] && coolOk('repeat')) return { type: 'repeat' };
        const letters = raw.replace(/[^A-Za-z]/g, '');
        if ((r = kw('caps', letters.length >= 4 && letters === letters.toUpperCase()))) return r;
        if ((r = kw('bang', raw.indexOf('!') >= 0))) return r;
        if ((r = kw('long', raw.length >= 70))) return r; return { type: 'generic' }; }
      function varsOf(raw) {
        const w = raw.split(/\s+/).filter(Boolean);
        const out = { PLAYER: pName(), WORD: lastWord(raw) }; let longest = '';
        w.forEach(function (x) { const y = x.replace(/[^A-Za-z']/g, ''); if (y.length > longest.length) longest = y; });
        out.LONG = (longest || 'nothing').toLowerCase();
        if (w.length <= 2) out.QQ = '"' + (raw || 'nothing') + '"';
        else { const len = api.randInt(2, Math.min(6, w.length)); const st = api.randInt(0, w.length - len); out.QQ = '"' + w.slice(st, st + len).join(' ') + '"'; }
        out.SLOW = w.slice(-4).join('... ') || 'nothing'; return out; }
      function react(raw, norm) {
        let a = analyze(norm, raw); if (Object.keys(S.seen).length > 200) S.seen = Object.create(null); S.seen[norm] = (S.seen[norm] || 0) + 1;
        if (a.type === 'empty' && S.silences === 3) a = { type: 'perfect', third: true };
        const special = a.type === 'perfect' || a.type === 'bernard' || a.type === 'egg' || a.type === 'sandrax' || a.type === 'tuesdayx' || a.type === 'half' || a.type === 'thanks';
        if (!special && S.n > 1 && (S.n === 77 || api.chance(0.02))) { opinion(raw); return; }
        const vars = varsOf(raw); let line = '', mood = 'neutral', ro = {}, boxLine = '', pri = 1; const rare = special || a.type === 'empty' || a.type === 'real' || a.type === 'abolish' ? '' : rareEvent(); switch (a.type) {
          case 'half': line = halfEvent(); mood = 'confused'; pri = 2; break;
          case 'thanks': line = doThanks(); mood = 'confused'; pri = 2; ro.caption = LN.THXCAP; break;
          case 'perfect': perfect(raw, a.third); return;
          case 'bernard': doBernard(); line = LN.BERNARD; mood = 'proud'; break;
          case 'sandrax': S.sandraTech = true; paintStrip(); slipEl.classList.add(k('taped')); line = LN.SANDRAX; mood = 'confused'; break;
          case 'tuesdayx': wall.classList.add(k('dim')); B(dur(1000), function () { wall.classList.remove(k('dim')); }); ro.force = 6; line = LN.TUESDAYX; break;
          case 'egg': S.egg = 1; ro.auto = true; line = LN.EGG; mood = 'proud'; break;
          case 'real': realFx(a.word); line = LN.REAL[a.word]; mood = 'confused'; break;
          case 'abolish': line = doAbolish(); mood = 'confused'; break;
          default: {
            let type = a.type; if (type !== 'generic' && type === S.lastBank) type = 'generic';
            S.lastBank = type; if (type === 'generic') { if (S.n === 1) line = fill(nx('E1', LN.E1), vars); else if (S.n > 2 && api.chance(0.45)) boxLine = fill(nx('EB', LN.EB), vars); else line = fill(nx('E', LN.E), vars); }
            else {
              const fk = { dennis: rF('metDennis') || rF('plantClicked'), toast: rF('metToaster'), stapler: rF('metStapler'), gerald: rF('metGerald'), tuesday: rF('fax-machine.tuesdayMoved') }[type];
              line = fill(fk && LN.CBX[type] ? nx('CBX.' + type, LN.CBX[type]) : nx('CB.' + type, LN.CB[type] || LN.E), vars); }
            if (type === 'dennis') S.cam.denn = true; }
        }
        if (rare) { line = rare; boxLine = ''; pri = 2; mood = 'confused'; }
        const echoT = raw ? lastWord(raw) + '. ' + nx('ECHOS', LN.ECHOS) : '...';
        if (line) say(line, { mood: mood, priority: pri, tag: true, tagText: echoT, tagMs: 8000, retry: true });
        else if (boxLine) say(boxLine, { who: 'The Box', mood: 'neutral', priority: 1, tag: true, tagText: echoT, tagMs: 8000, retry: true });
        readSlip(raw, ro); }
      function rareEvent() {
        if (S.n < 3 || S.maxBeat < 2) return '';
        if (!S.drill && api.chance(SELF ? 0.2 : 1 / 30)) {
          S.drill = 1; stat('drills'); award(1.5, 'drill'); api.sfx('bell'); banr(LN.DRILL.ban, dur(14000));
          B(dur(3000), function () { say(LN.DRILL.b, { priority: 1, noStatus: true }); }); B(dur(7500), function () { say(LN.DRILL.c, { priority: 1, mood: 'proud', noStatus: true }); });
          return LN.DRILL.a; }
        if (!S.lost && S.maxBeat >= 3 && api.chance(SELF ? 0.2 : 1 / 35)) {
          S.lost = 1; stat('lostItems'); award(1, 'lost property'); api.sfx('bloop'); const i = api.randInt(0, LN.LOST.length - 1);
          B(dur(3200), function () { say(LN.LOSTB, { priority: 1, noStatus: true }); });
          return i === 0 && rF('sockSeen') ? LN.LOSTS : LN.LOST[i]; }
        if (!S.home && S.n >= 8 && S.first && api.chance(SELF ? 0.2 : 1 / 40)) {
          S.home = 1; stat('returned'); award(2, 'the first slip, returned'); api.sfx('bloop');
          B(dur(3600), function () { say(LN.HOME[1], { priority: 1, noStatus: true, retry: true }); });
          return fill(LN.HOME[0], { FIRST: '"' + S.first + '"', NUM: num(S.n - 1) }); }
        return ''; }
      function doThanks() {
        const first = !S.thx; S.thx = 1; stat('thanks'); persist();
        boxEl.classList.add(k('pinky')); B(dur(5000), function () { boxEl.classList.remove(k('pinky')); });
        if (!first) { award(0.5, 'thank you, again'); return nx('THXR', LN.THXR); }
        api.achieve('suggestion-box.thanks'); award(5, 'thank you'); api.sfx('tada'); api.confetti(undefined, undefined, 20);
        B(dur(3000), function () { boxSay(LN.THX[1], { mood: 'proud' }); });
        B(dur(7200), function () { say(LN.THX[2], { priority: 1, noStatus: true, retry: true }); });
        return LN.THX[0]; }
      function halfEvent() {
        stat('halves'); api.achieve('suggestion-box.half'); award(S.half ? 0.5 : 5, 'seven and a half'); S.half = 1;
        boxEl.classList.add(k('pinky')); B(dur(5000), function () { boxEl.classList.remove(k('pinky')); });
        if (rF('museumHalf')) B(dur(3600), function () { say(LN.HALFM, { priority: 1, noStatus: true }); });
        return nx('HALF', LN.HALF); }
      function readSlip(raw, o) {
        o = o || {};
        if (S.readings < 3 || api.chance(0.15)) say(nx('INTRO', LN.INTRO), { priority: 0, noStatus: true });
        startRead({ kind: 'slip', text: raw, auto: !!o.auto, onDone: function () { applySlip(raw, o); } });
      }
      function perfect(raw, third) {
        const first = nx('CB.empty', LN.CB.empty);
        say(third ? LN.CB.empty3[0] : first, { mood: 'confused', priority: 1 });
        S.hushUntil = api.now() + dur(7500); setStatus('...');
        railEl.textContent = ''; railEl.appendChild(el('span', { class: c('chip'), text: 'Nothing' }));
        meterEl.textContent = ''; pctEl.textContent = ''; T(dur(7500), function () {
          S.hushUntil = 0; setStatus(LN.PERFECT_END);
          say(LN.PERFECT_END, { mood: 'proud', force: true, priority: 2 });
          B(dur(2200), function () { say(LN.PERFECT, { mood: 'confused', priority: 1 }); });
          app.classList.add(k('gold')); S.goldUntil = api.now() + dur(12000);
          B(dur(12000), function () { app.classList.remove(k('gold')); }); flickRate('100', 1000);
          api.achieve('suggestion-box.empty'); api.sfx('tada'); applySlip(raw, { perfect: true });
        }); }
      function opinion(raw) {
        const letter = S.n === 77;
        S.opinions++; stat('opinions'); api.achieve('suggestion-box.opinion');
        const text = letter ? LN.LETTER : nx('OPIN', LN.OPIN);
        award(letter ? 7.5 : (S.opinions === 1 ? 10 : 2), 'opinion');
        S.hushUntil = api.now() + dur(7000); app.classList.add(k('hush'));
        B(dur(7000), function () { app.classList.remove(k('hush')); say(LN.TUESDAYLINE, { force: true, priority: 1 }); });
        flickRate('Definitely', 1000); tag(text, dur(9000)); setStatus(text);
        api.say(letter ? text : LN.OPINHEAD + ' ' + text, { who: 'The Box', mood: 'proud', priority: 2 });
        readSlip(raw, { definitely: true }); }
      function doBernard() {
        S.bernard = 1; api.achieve('suggestion-box.bernard');
        boxEl.classList.add(k('pinky')); B(dur(5000), function () { boxEl.classList.remove(k('pinky')); });
        paintPlaque(); persist(); }
      function doAbolish() {
        S.abol = Math.min(5, S.abol + 1); stat('abolished'); api.achieve('suggestion-box.abolish');
        paintPlaque(); persist(); return LN.ABOLISH[Math.min(4, S.abol - 1)]; }
      function realFx(word) {
        const set = function (name, on, off, ms) {
          on(); if (S.fx[name]) api.clearTimeout(S.fx[name]); S.fx[name] = B(ms, off); S.fxEnd[name] = api.now() + ms; };
        const ms = dur(30000);
        if (word === 'pink') set('pink', function () { cv(app, '--accent', '#FF8FC8'); cv(app, '--bg', '#FFE3EF'); }, function () { cv(app, '--accent', '#FF6B5E'); cv(app, '--bg', '#FBF3DE'); }, ms);
        else if (word === 'bigger') set('bigger', function () { cv(app, '--font', '22px'); cv(app, '--small', 1.12); }, function () { cv(app, '--font', '16px'); cv(app, '--small', S.fxEnd.smaller > api.now() ? 0.85 : 1); }, ms);
        else if (word === 'darker') set('darker', function () { cv(app, '--dim', 1); }, function () { cv(app, '--dim', 0); }, ms);
        else if (word === 'smaller') set('smaller', function () { cv(app, '--small', 0.85); }, function () { cv(app, '--small', S.fxEnd.bigger > api.now() ? 1.12 : 1); }, ms);
        else if (word === 'faster') set('tempo', function () { S.tempoMul = 0.75; cv(app, '--tempoMul', 0.75); }, function () { S.tempoMul = 1; cv(app, '--tempoMul', 1); }, ms);
        else if (word === 'slower') set('tempo', function () { S.tempoMul = 1.33; cv(app, '--tempoMul', 1.33); }, function () { S.tempoMul = 1; cv(app, '--tempoMul', 1); }, ms);
      }
      /* ---- the reading with feeling ---- */
      function makeWords(text) {
        let w = String(text || '').split(/\s+/).filter(Boolean).map(function (x) { return x.slice(0, 14); });
        if (w.length > MAX_W) w = w.slice(0, MAX_W - 1).concat(['and so forth']);
        while (w.length < MIN_W) w.push('Ahem'); return w; }
      function startRead(o) {
        go(o.phase || 'read'); const words = makeWords(o.text); const n = words.length;
        const hushed = !!o.hushed; const tempo = Math.max(20, dur((o.tempo || TEMPO) * S.tempoMul));
        const lead = hushed ? dur(800) : dur(o.lead || LEADIN);
        const R = { kind: o.kind, words: words, n: n, tempo: tempo, start: api.now(), lead: lead, judged: [], chips: [], taps: 0, extra: 0, done: false, cur: -1,
          auto: !!o.auto, hushed: hushed, win: hushed ? [HIT_H, NEAR_H] : [HIT, NEAR], onDone: o.onDone, text: o.text || '', noUnwell: !!o.noUnwell || hushed || o.kind === 'demo' || o.kind === 'mgmt' || o.kind === 'self', told: false };
        S.reading = R; app.classList.toggle(k('hushed'), hushed);
        railEl.textContent = ''; meterEl.textContent = ''; pctEl.textContent = '';
        words.forEach(function (w) { const ch = el('span', { class: c('chip'), text: w }); R.chips.push(ch); R.judged.push(null); railEl.appendChild(ch); });
        const skippable = S.readings >= 3 && ['slip', 'freed', 'note', 'cameo'].indexOf(o.kind) >= 0; skipBtn.hidden = !skippable;
        setStatus(o.kind === 'demo' ? LN.DEMO : (hushed ? '' : 'Management reads' + (skippable ? ' (Esc to skip)' : '') + ': ') + (o.text || '(a blank slip)'));
        setControls(false); beatBtn.classList.add(k('armed'));
        try { beatBtn.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
        if (app.dataset.stack === '1') { S.scrolled = true; try { stage.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ } }
        if (!hushed) api.sfx('bell'); for (let i = 0; i < n; i++) {
          (function (idx) { T(Math.max(1, R.start + lead + idx * tempo - api.now()), function () { lightChip(R, idx); }); })(i);
        }
        T(Math.max(1, R.start + lead + (n - 1) * tempo + R.win[1] + 80 - api.now()), function () { finishRead(R, 'end'); });
        return R; }
      function addNote(R) {
        if (R && R.hushed) return;
        meterEl.appendChild(el('span', { text: meterEl.children.length % 2 ? '🎶' : '🎵' }));
        while (meterEl.children.length > 14) meterEl.removeChild(meterEl.firstChild); }
      function lightChip(R, i) {
        if (R.done) return;
        if (R.cur >= 0 && R.chips[R.cur]) R.chips[R.cur].classList.remove(k('on'));
        const ch = R.chips[i]; if (!ch) return; R.cur = i; restart(ch, k('on')); lookAt(ch);
        if (R.auto) { R.judged[i] = 'hit'; ch.classList.add(k('hit')); addNote(R); }
      }
      function tap() {
        const t = api.now(); S.lastTap = t; const R = S.reading;
        if (!R || R.done || R.auto) return false; R.taps++;
        if (!R.noUnwell && S.maxBeat >= 3 && R.taps > 2 * R.n) { finishRead(R, 'unwell'); return true; }
        const j = clamp(Math.round((t - R.start - R.lead) / R.tempo), 0, R.n - 1);
        const d = Math.abs(t - (R.start + R.lead + j * R.tempo)); const cur = R.judged[j];
        let res = d <= R.win[0] ? 'hit' : d <= R.win[1] ? 'near' : 'miss';
        if (cur === 'hit' || cur === 'near' || (cur === 'miss' && res === 'miss')) {
          R.extra++; if (R.extra >= 2 && !R.told) {
            if (R.hushed) { R.told = true; say(LN.Z.Z6, { priority: 0, noStatus: true, force: true }); }
            else if (S.maxBeat < 3) { R.told = true; say(LN.EARLYTAP, { priority: 0, noStatus: true }); }
          }
          return true; }
        const ch = R.chips[j]; R.judged[j] = res;
        ch.classList.remove(k('miss'), k('near'), k('hit')); ch.classList.add(k(res));
        if (res === 'hit') {
          api.sfx('tick'); addNote(R);
          if (!S.firstHit) { S.firstHit = true; if (R.kind === 'demo') { award(0.5, 'first hit'); say(LN.PERF.hit, { priority: 0, noStatus: true }); } }
        } else if (res === 'near') api.sfx('blip');
        else if (t - S.lastBuzz > 400) { S.lastBuzz = t; api.sfx('buzz'); }
        return true; }
      function finishRead(R, why) {
        if (R.done) return; R.done = true; if (S.reading === R) S.reading = null; skipBtn.hidden = true;
        R.chips.forEach(function (ch) { ch.classList.remove(k('on')); });
        beatBtn.classList.remove(k('armed')); app.classList.remove(k('hushed'));
        let h = 0, nr = 0, ms = 0;
        for (let i = 0; i < R.n; i++) { const j = R.judged[i]; if (j === 'hit') h++; else if (j === 'near') nr++; else ms++; }
        const r = R.n ? (h + 0.5 * nr) / R.n : 0; const pct = Math.round(clamp(r, 0, 1) * 100);
        const kind = R.kind;
        const res = { kind: kind, hits: h, nears: nr, misses: ms, r: r, tier: -1, pct: pct };
        const cont = function () { if (R.onDone) R.onDone(res); };
        if (!R.auto && kind !== 'self') { stat('hits', h); stat('nears', nr); stat('misses', ms); }
        if (kind === 'demo' || kind === 'self' || kind === 'mgmt') { T(dur(500), cont); return; }
        if (why !== 'skip') { S.readings++; stat('readings'); } pctEl.textContent = pct + '%';
        if (kind === 'freed') { setStatus('Feeling delivered: ' + pct + ' percent.'); T(dur(900), cont); return; }
        if (why === 'unwell') {
          res.tier = 5; stat('unwell'); api.sfx('sad'); S.hushUntil = api.now() + dur(3000);
          setStatus('...'); T(dur(3000), function () {
            S.hushUntil = 0; const line = nx('TIER5', LN.TIER[5]); S.lastTierLine = line;
            say(line, { mood: 'panic', force: true, priority: 2 }); T(dur(800), cont); }); return; }
        const tier = why === 'skip' ? 0 : (r < 0.2 ? 0 : r < 0.45 ? 1 : r < 0.7 ? 2 : r < 0.95 ? 3 : 4);
        res.tier = tier; stat(TIER_NAMES[tier].toLowerCase()); api.stat.max(ID + '.bestTier', tier);
        if (why !== 'skip') award(TIER_PAY[tier], 'reading'); let line;
        if (why === 'skip') line = LN.SKIP; else if (R.taps === 0 && !R.auto) line = LN.NOTAP;
        else line = nx('TIER' + tier, LN.TIER[tier]); S.lastTierLine = line;
        say(line, { mood: TIER_MOOD[tier], priority: 1 });
        if (why !== 'skip') B(dur(1400), function () { say(fill(nx('METER', LN.METER), { PCT: pct }), { priority: 0, noStatus: true }); });
        if (tier >= 3) api.achieve('suggestion-box.operatic');
        if (tier === 3) api.sfx('fanfare');
        if (tier === 4) { api.sfx('tada'); if (!S.perfectSeen) { S.perfectSeen = true; api.confetti(undefined, undefined, 22); B(dur(1600), function () { say(LN.PERF.perfect, { priority: 1, mood: 'smug', noStatus: true }); }); } }
        if (S.readings === 4 && why !== 'skip') B(dur(2200), function () { say(LN.SKIPSAY, { priority: 0, noStatus: true }); });
        if (S.readings === 7) B(dur(2200), function () { say(LN.PERF.seven, { priority: 0, noStatus: true }); });
        if (S.readings === 10) B(dur(2200), function () { say(LN.PERF.ten, { priority: 1, mood: 'proud', noStatus: true }); });
        if (tier >= 1 && tier <= 4) {
          S.feelings++; if (S.maxBeat >= 3) {
            if (S.feelings === 10) B(dur(2600), function () { say(LN.MOODS, { priority: 2, noStatus: true, retry: true }); });
            if (S.feelings === 25) B(dur(2600), function () { say(LN.WEATHER, { priority: 2, noStatus: true, retry: true }); });
          }
          paintStrip(); }
        if (!S.topSaid && kind === 'slip' && S.readings >= 6 && S.readings % 3 === 0) { const tw = topWord(); if (tw) { S.topSaid = true; B(dur(2600), function () { boxSay(tw[0] + '.', { tagOnly: true, ms: dur(5000) }); }); } }
        if (tier >= 2 && tier <= 4) { S.bigRead = Math.min(8, S.bigRead + 1); earSize(); if (S.maxBeat >= 3 && S.bigRead <= 3) B(dur(1800), function () { say(LN.BIGEAR, { priority: 1, noStatus: true, retry: true }); }); }
        if ((tier === 3 || tier === 4) && S.maxBeat >= 3 && (kind === 'slip' || kind === 'note' || kind === 'cameo')) holdNote(cont, R.text);
        else T(dur(800), cont); }
      function holdNote(cont, text) {
        S.heldN++; stat('heldNotes'); const H = { done: false }; S.held = H; const hn = S.heldN;
        if (/\bshort\b/i.test(text || '')) say(LN.K.short, { mood: 'neutral', priority: 1 });
        else if (hn === 1) say(LN.K[1], { mood: 'smug', priority: 1 });
        else if (hn === 2) say(LN.K[2], { mood: 'smug', priority: 1 });
        else if (hn === 3) say(LN.K[3], { mood: 'confused', priority: 1 });
        else if (hn === 6) say(LN.K[6], { mood: 'proud', priority: 1 });
        else if (hn === 10) say(LN.K[10], { mood: 'confused', priority: 1 });
        const hold = hn > 3 ? 7000 : 11000; if (hn === 1) banr('ANY KEY LETS GO', dur(5000));
        if (hn > 1) [0.32, 0.66].forEach(function (f) { T(dur(hold * f), function () { say(nx('KX', LN.KX), { mood: 'smug', priority: 0, noStatus: true }); }); });
        setStatus(LN.K.HOLDST);
        if (hn === 3) { railEl.classList.add(k('shut')); B(dur(1000), function () { railEl.classList.remove(k('shut')); }); }
        const last = railEl.lastChild;
        if (last) { const inner2 = el('span', { class: c('wave'), text: last.textContent }); last.textContent = ''; last.appendChild(inner2); }
        cv(heldBar, '--held', dur(hold) + 'ms');
        heldBar.classList.remove(k('run')); heldBar.classList.add(k('on')); void heldBar.offsetWidth; heldBar.classList.add(k('run'));
        H.end = function () {
          if (H.done) return; H.done = true; if (S.held === H) S.held = null;
          heldBar.classList.remove(k('on'), k('run')); cont(); }; T(dur(hold), H.end); }
      function endHeld() { if (S.held && S.held.end) S.held.end(); }
      /* ---- apply to a Somewhere ---- */
      function placeMarker(i) {
        const t = wallTiles[i] && wallTiles[i].b; if (!t) return;
        mk.style.left = t.offsetLeft + 'px'; mk.style.top = t.offsetTop + 'px';
        mk.style.width = t.offsetWidth + 'px'; mk.style.height = t.offsetHeight + 'px'; }
      function lobbyMarks() { wallTiles.forEach(function (t, i) { t.wl.hidden = i !== S.lobby; }); }
      function lobby(i) {
        if (S.phase !== 'apply' || S.landed) return;
        if (!S.curtainUp) { tag(nx('THUMB', LN.THUMB)); return; }
        i = clamp(Math.floor(i), 0, 8); S.lobby = i; lobbyMarks(); api.sfx('blip');
        restart(wallTiles[i].b, k('shake')); }
      function onTile(i) {
        if (S.phase === 'apply') { lobby(i); return; }
        const now = api.now();
        if (burst(S.wallTimes, 10, 6000, 25000, 'lastWallSpam')) { stat('wallSpam'); say(nx('YW', LN.YW), { priority: 1, mood: 'confused', noStatus: true, tag: true, retry: true }); return; }
        if (S.curtainUp && now - S.lastTile > dur(2500)) { S.lastTile = now; api.sfx('blip'); tag(fill(nx('TT', LN.TILETAG), { TILE: tileName(i) })); }
      }
      function applySlip(raw, o) {
        o = o || {}; go('apply'); setControls(false); S.lobby = -1; S.landed = false; lobbyMarks();
        const up = S.curtainUp; restart(sStamp, k('on')); api.sfx('stamp');
        wall.classList.toggle(k('hop'), !up); mk.classList.toggle(k('on'), up);
        if (up) setStatus('Applying. Press 1 to 9, or tap a Somewhere, to lobby for it.');
        else { restart(curtain, k('bulge')); say(nx('CURT', LN.CURT), { priority: S.maxBeat < 4 ? 1 : 0, retry: true }); } const N = 12, tot = up ? 2400 : 1200; let lastIdx = -1;
        for (let h = 1; h <= N; h++) {
          (function (hh) {
            T(dur(tot * (hh / N) * (hh / N)), function () {
              if (hh < N) {
                let idx = api.randInt(0, 8); if (idx === lastIdx) idx = (idx + 1) % 9;
                lastIdx = idx; if (up) { placeMarker(idx); api.sfx('tick'); }
              } else land(raw, o, up); }); })(h); }
        T(dur(tot) + dur(up ? 1000 : 600), function () { mk.classList.remove(k('on')); wall.classList.remove(k('hop')); afterApply(o); });
      }
      function pickWeighted() {
        const mx = Math.max.apply(null, S.tiles);
        const wts = S.tiles.map(function (cnt) { return mx - cnt + 1; }); let tot = 0;
        wts.forEach(function (x) { tot += x; }); let r = api.rand() * tot;
        for (let i = 0; i < 9; i++) { r -= wts[i]; if (r <= 0) return i; }
        return 8; }
      function land(raw, o, up) {
        S.landed = true; let t, how = 'random'; if (o.force != null) t = o.force;
        else if (o.from != null) t = api.pick(nbr(o.from)); else if (up && S.lobby >= 0) {
          if (api.chance(1 / 3)) { t = S.lobby; how = 'win'; } else { t = api.pick(nbr(S.lobby)); how = 'close'; }
        } else t = pickWeighted(); t = clamp(Math.floor(Number(t)), 0, 8);
        if (up) { placeMarker(t); mk.classList.add(k('on')); }
        S.tiles[t] = Math.min(9999, S.tiles[t] + 1); S.applied++; const cnt = S.tiles[t];
        stat('applied'); award(1, 'applied'); api.sfx('ding'); const sl = S.stk[t];
        sl.push(raw ? raw.slice(0, 14) : '(blank)'); while (sl.length > 3) sl.shift();
        paintTile(t); restart(wallTiles[t].b, k('shake'));
        let conf = (o.perfect || o.definitely) ? 100 : api.randInt(3, 97);
        if (!Number.isFinite(conf)) conf = 71;
        const lab = o.definitely ? 'definitely' : probLabel(); let cap;
        if (o.perfect || api.now() < (S.goldUntil || 0)) cap = 'Applied to: everything. Definitely. Everywhere.';
        else if (o.caption) cap = o.caption;
        else if (t === 6) { cap = LN.TUESDAY_CAP; stat('tentative'); }
        else if (!up) cap = fill(nx('CAPS', LN.CAPS), { C: conf, LAB: lab });
        else cap = 'Applied to ' + tileName(t) + ' at 4:17 PM. Confidence: ' + conf + '%, ' + lab;
        wcap.textContent = cap; setStatus(cap);
        const vars = { TILE: up ? tileName(t) : 'somewhere', PLAYER: pName() };
        if (how === 'win') { stat('lobbyWon'); award(0.3, 'lobby'); S.lobbyWins++; say(fill(S.lobbyWins === 2 ? LN.WIN2 : nx('WIN', LN.WIN), vars), { priority: 1, mood: 'smug' }); }
        else if (how === 'close') { stat('lobbied'); say(fill(nx('CLOSE', LN.CLOSE), vars), { priority: 1 }); }
        else if (o.after) B(dur(1500), function () { say(o.after, { priority: 1, mood: 'proud' }); });
        else if (api.chance(0.4)) say(nx('AP', up ? LN.APPLY.concat([fill(LN.APPLIED_TO, vars)]) : LN.APPLY), { priority: 0 });
        if (S.maxBeat >= 4 && api.chance(0.15)) B(dur(2200), function () { say(nx('RT', LN.RATE), { priority: 0, noStatus: true }); });
        const cl = LN.CALL[t];
        if (up && cl && !S.callDone[t] && rF(cl[0])) { S.callDone[t] = 1; stat('callbacks'); B(dur(2800), function () { say(cl[1], { priority: 1, noStatus: true, retry: true }); }); }
        if (o.kind === 'note') { S.postsBeat++; if (api.chance(0.5)) B(dur(2000), function () { say(LN.NOTELOOP, { priority: 0, noStatus: true }); }); }
        if (up) {
          if (cnt === 3) B(dur(1600), function () { say(fill(LN.HAT, vars), { priority: 1, retry: true }); });
          else if (cnt === 5) B(dur(1600), function () { say(fill(LN.FLAG, vars), { priority: 1, retry: true }); });
          else if (cnt === 8) say(fill(LN.RENAMED, vars), { priority: 1, retry: true });
          else if (cnt === 12) say(fill(LN.RENAMED12, vars), { priority: 1, retry: true });
          if (cnt % 3 === 0 && o.kind !== 'note') { if (S.maxBeat >= 8) pushNote(t); else if (S.maxBeat >= 4) B(dur(3200), function () { say(fill(LN.IMPACT, vars), { priority: 1, noStatus: true, retry: true }); }); }
        }
        if (S.tiles.every(function (x) { return x >= 1; })) { if (!S.allTiles) { S.allTiles = true; say(LN.LASTTILE, { priority: 1, mood: 'proud' }); } api.achieve('suggestion-box.somewhere'); }
        paintStrip(); persist(); }
      /* ---- beats ---- */
      function quota(b) {
        if (SELF) return 1; const base = [0, 1, 3, 4, 4, 4, 5, 5, 5][b] || 5; if (b === 1) return 1;
        return Math.max(2, Math.ceil(base * Math.pow(0.5, S.career - 1))); }
      function minSec(b) {
        if (SELF) return 0.5; if (b === 1) return 0; const base = [0, 0, 40, 60, 60, 60, 75, 75, 90][b] || 60;
        return Math.max(15, base / Math.pow(2, S.career - 1)); }
      function checkBeat() {
        if (S.beat >= 9) return false;
        if (S.postsBeat >= quota(S.beat) && (api.now() - S.beatStart) / 1000 >= minSec(S.beat)) { advance(); return S.beat === 9; }
        return false; }
      function advance() {
        S.beat++; S.postsBeat = 0; S.beatStart = api.now(); const first = S.beat > S.maxBeat;
        if (first) S.maxBeat = S.beat; const b = S.beat;
        if (first && LN.BEAT[b]) say(LN.BEAT[b], { priority: 2, mood: 'proud', retry: true });
        if (first && LN.FICUS[b]) B(dur(2600), function () { say(LN.FICUS[b], { priority: 1, noStatus: true, retry: true }); });
        if (b === 3 && first) B(dur(5600), function () { say(LN.LEANUNLOCK, { priority: 2, noStatus: true, retry: true }); });
        if (b === 6 && first) B(dur(7400), function () {
          const tw = topWord(); say(tw ? fill(LN.YIR, { W: tw[0], N: tw[1] }) : LN.YIR0, { priority: 1, mood: 'confused', noStatus: true, retry: true }); });
        if (b === 4 && !S.curtainUp) { if (first) curtainShow(); else setCurtain(true); }
        refreshFlags(); persist(); if (b === 9) startZoom(); }
      function topWord() {
        let best = null; S.ring.forEach(function (p) { if (!best || p[1] > best[1]) best = p; });
        return best && best[1] >= 3 ? best : null; }
      function curtainShow() {
        if (S.curAnim) return; S.curAnim = true; const txt = curtain.firstChild; const orig = txt ? txt.textContent : '';
        const falseStart = function (i, pct, at) {
          B(dur(at), function () {
            if (S.curtainUp) return;
            curtain.classList.add(k('fs')); if (txt) txt.textContent = LN.FS[i]; curtain.style.transform = 'translateY(-' + pct + '%)'; api.sfx('bloop');
            tag(LN.FS[i], dur(2200)); B(dur(900), function () { if (!S.curtainUp) curtain.style.transform = ''; }); }); };
        falseStart(0, 16, 800); falseStart(1, 12, 2600); falseStart(2, 24, 4400);
        B(dur(1000), function () { say(LN.FSSAY[0], { priority: 1, mood: 'confused', noStatus: true, retry: true }); });
        B(dur(2800), function () { say(LN.FSSAY[1], { priority: 1, mood: 'confused', noStatus: true, retry: true }); });
        B(dur(4600), function () { say(LN.FSSAY[2], { priority: 1, mood: 'proud', noStatus: true, retry: true }); });
        B(dur(5600), function () {
          S.curAnim = false; curtain.style.transform = ''; curtain.classList.remove(k('fs')); if (txt) txt.textContent = orig;
          wallTiles.forEach(function (t, i) { cv(t.b, '--d', i); }); grid.classList.add(k('reveal'));
          for (let i = 0; i < 9; i++) B(dur(90 * i), function () { api.sfx('tick'); });
          setCurtain(true); sock.hidden = false; sock.style.left = '-10%'; void sock.offsetWidth; sock.style.left = '110%';
          B(dur(1900), function () { sock.hidden = true; }); B(dur(2400), function () { grid.classList.remove(k('reveal')); });
          B(dur(1400), function () { say(LN.CURTRISE, { priority: 2, mood: 'proud', noStatus: true, retry: true }); });
          B(dur(6200), function () { say(LN.CMT, { priority: 1, mood: 'confused', noStatus: true, retry: true }); }); }); }
      function afterApply() {
        persist(); picketOn(false); if (checkBeat()) return;
        if (S.queue.length && S.chain < 3) { S.chain++; runQueued(S.queue.shift()); return; }
        S.chain = 0; const cam = maybeCameo(); if (cam) { S.chain = 1; runQueued(cam); return; }
        enterWrite(); }
      /* ---- queue, notes, cameos ---- */
      function pushNote(t) {
        if (S.queue.length >= 3) return; const nt = LN.NOTES[t];
        S.queue.push({ kind: 'note', head: nt[0], text: nt[1], tempo: TEMPO, from: t }); }
      function maybeCameo() {
        if (S.maxBeat < 7 || !api.chance(SELF ? 0.7 : 0.35)) return null; const list = [];
        if (!S.cam.g) {
          if (rF('metGerald')) list.push({ kind: 'cameo', key: 'g', head: LN.CAM.g, text: LN.CAM.gslip, tempo: 520, after: LN.CAM.gafter });
          else list.push({ kind: 'cameo', key: 'g', head: LN.CAM.gn, text: LN.CAM.gnslip, tempo: TEMPO });
        }
        if (!S.cam.b && rS('complaints-dept.filed') > 0 && S.maxBeat <= 8) list.push({ kind: 'cameo', key: 'b', head: LN.CAM.bhalf, text: LN.CAM.bslip, tempo: TEMPO, after: LN.CAM.b, aside: LN.CAM.baside });
        if (!S.cam.t && S.maxBeat >= 8 && (rS('toaster-debate.slices') > 0 || rS('toaster-debate.arguments') > 0 || rS('toaster.toasts') > 0 || rS('toaster.slices') > 0 || rF('metToaster'))) {
          list.push({ kind: 'cameo', key: 't', head: LN.CAM.t, text: LN.CAM.tslip, tempo: TEMPO, tile: 4, caption: LN.CAM.tapplied, toast: true });
        }
        if (!S.cam.r && rF('complaints-dept.rockMet')) list.push({ kind: 'cameo', key: 'r', head: LN.CAM.r, text: LN.CAM.rslip, tempo: TEMPO, tile: 5, caption: LN.CAM.rapplied });
        if (!S.cam.st && (rF('metStapler') || S.maxBeat >= 8)) list.push({ kind: 'cameo', key: 'st', head: LN.CAMS.head, text: LN.CAMS.slip, tempo: 440, tile: 2, caption: LN.CAMS.cap, after: LN.CAMS.after });
        if (!S.cam.s && rF('sockSeen') && api.chance(1 / 8)) list.push({ kind: 'cameo', key: 's', head: LN.CAM.s, text: LN.CAM.sslip, tempo: TEMPO });
        if (!list.length) return null; const it = api.pick(list); S.cam[it.key] = true; return it; }
      function runQueued(it) {
        if (it.toast && api.chance(1 / 40)) {
          go('apply'); setControls(false);
          api.sfx('ding'); say(LN.CAM.tpop, { priority: 1 }); api.toast('A toast has popped out of the slot.');
          T(dur(1800), function () { afterApply(); }); return; }
        if (it.key === 'st') picketOn(true);
        say(it.head, { priority: 1, mood: 'neutral', tag: true, tagMs: 9000, retry: true });
        if (it.aside) B(dur(2500), function () { say(it.aside, { priority: 0, who: 'Brenda', noStatus: true }); });
        const o = { force: it.tile, from: it.from, kind: it.kind, caption: it.caption, after: it.kind === 'cameo' && it.key === 'b' ? it.after : it.after };
        startRead({ kind: it.kind, text: it.text, tempo: it.tempo, onDone: function () { applySlip(it.text, o); } });
      }
      /* ---- the Dead Letter ---- */
      function startJam(raw) {
        go('jam'); setControls(false);
        S.jam = { prog: 0, last: api.now(), t0: api.now(), raw: raw, tender: nx('TEN', LN.JAM.TENDER), notches: 0, h1: 0, h2: 0, h3: 0 };
        boxEl.classList.add(k('jam')); cv(boxEl, '--slide', 0);
        say(LN.JAM.R1, { priority: 2, mood: 'confused', retry: true }); api.sfx('buzz'); setStatus(LN.JAM.HINT);
        const watch = function () {
          T(dur(1000), function () {
            const J = S.jam; if (!J) return; const lapse = api.now() - J.t0;
            if (J.prog > 0 && api.now() - J.last > dur(4000)) { J.prog = 0; J.notches = 0; cv(boxEl, '--slide', 0); tag('oh... no'); }
            if (J.prog === 0) {
              if (!J.h1 && lapse >= dur(6000)) { J.h1 = 1; tag(LN.JAM.HINT2, dur(8000)); }
              else if (!J.h2 && lapse >= dur(9000)) { J.h2 = 1; restart(boxWrap, k('jig')); api.sfx('boing'); }
              else if (!J.h3 && lapse >= dur(15000)) { J.h3 = 1; tag(LN.JAM.HINT2, dur(8000)); }
            }
            watch(); }); }; watch(); T(dur(30000), function () { freeJam(false); }); }
      function jig(px) {
        px = Number(px); if (!Number.isFinite(px) || px <= 0) return;
        if (px > 3) restart(boxWrap, k('jig')); const J = S.jam;
        if (!J || S.phase !== 'jam') return;
        J.prog = Math.min(400, J.prog + Math.min(60, px)); J.last = api.now();
        const notches = Math.floor(J.prog / 100); cv(boxEl, '--slide', (J.prog / 400).toFixed(3));
        if (notches > J.notches) {
          J.notches = notches;
          api.sfx('boing'); boxEl.classList.add(k('wob')); B(dur(700), function () { boxEl.classList.remove(k('wob')); });
          tag(nx('OH', OH)); if (notches === 1) say(LN.JAM.R2, { priority: 1, noStatus: true }); }
        if (J.prog >= 400) freeJam(true); }
      function freeJam(jiggled) {
        const J = S.jam; if (!J) return; S.jam = null;
        boxEl.classList.remove(k('jam')); cv(boxEl, '--slide', 0);
        stat('jams'); S.sandraJams = Math.min(99, S.sandraJams + 1); paintStrip();
        if (jiggled) { stat('jiggled'); award(5, 'dead letter'); api.achieve('suggestion-box.deadletter'); api.sfx('tada'); say(LN.JAM.R3, { priority: 2, mood: 'proud' }); }
        else { say(LN.JAM.R5, { priority: 1, mood: 'smug' }); }
        B(dur(2600), function () { say(S.sandraJams % 2 ? LN.JAM.R4 : LN.JAM.R6, { priority: 0, noStatus: true }); });
        if (S.sandraJams === 1 && S.maxBeat >= 6) B(dur(5200), function () { say(LN.FICUS[6], { priority: 0, noStatus: true }); });
        startRead({ kind: 'freed', text: J.tender, onDone: function () { applySlip(J.tender, {}); } });
      }
      /* ---- the Box suggests, trinkets ---- */
      function paintTrinkets() { cursorEl.textContent = S.trinkets.map(function (t) { return t.e; }).join(''); postureEl.hidden = !S.trinkets.length; }
      function addTrinket(e) {
        const obj = { e: e }; S.trinkets.push(obj);
        while (S.trinkets.length > 3) S.trinkets.shift(); paintTrinkets();
        B(dur(60000), function () { const i = S.trinkets.indexOf(obj); if (i >= 0) { S.trinkets.splice(i, 1); paintTrinkets(); } });
      }
      function paintPile() {
        pileEl.textContent = ''; const cnt = Math.min(5, S.tabled || 0);
        for (let i = 0; i < cnt; i++) { const m = el('div', { class: c('pmini') }); cv(m, '--r', ((i * 7) % 5 - 2) + 'deg'); pileEl.appendChild(m); }
        if (cnt) pileEl.appendChild(el('div', { class: c('stapler') })); pileEl.hidden = !cnt; }
      function pushOffer() {
        if (S.offer) tableOffer(true);
        const ent = LN.SUG.TEXTS[nx('SUGI', LN.SUG.TEXTS.map(function (x, i) { return i; }))];
        const tok = (S.offerTok = (S.offerTok || 0) + 1);
        S.offer = { text: ent[0], extra: ent[1], tok: tok }; offerEl.textContent = '';
        offerEl.appendChild(el('div', { class: c('offtext'), text: ent[0] }));
        offerEl.appendChild(el('div', { class: c('offsig'), text: LN.SUG.SIGN }));
        offerEl.appendChild(el('div', { class: c('actions') }, el('button', { class: c('btn', 'post'), type: 'button', text: 'Implement (I)', onclick: function () { implementOffer(); } }),
          el('button', { class: c('btn'), type: 'button', text: 'Table (T)', onclick: function () { tableOffer(); } })));
        offerEl.hidden = false; restart(offerEl, k('fresh')); api.sfx('pop');
        if (!S.offerSaid) { S.offerSaid = true; say(LN.SUG.S1, { priority: 2, mood: 'confused', retry: true, tag: true }); }
        else tag('Suggestion from the Box: ' + ent[0]);
        B(dur(20000), function () { if (S.offer && S.offer.tok === tok) tableOffer(false, true); });
      }
      function tableOffer(silent, auto) {
        if (!S.offer) return; S.offer = null; offerEl.hidden = true;
        S.tabled = Math.min(99, (S.tabled || 0) + 1); paintPile(); stat('tabled');
        if (silent) return; award(0.5, 'tabled'); api.sfx('sad');
        say(auto ? LN.SUG.AUTO : (rF('metStapler') && api.chance(0.6) ? LN.SUG.TABLES : nx('TBL', LN.SUG.TABLE)), { priority: 1, mood: 'neutral', noStatus: true }); }
      function implementOffer() {
        const O = S.offer; if (!O) return; S.offer = null; offerEl.hidden = true;
        award(0.5, 'implemented'); stat('implemented'); api.sfx('ding'); const e = api.pick(TRINK);
        addTrinket(e); say(O.extra || LN.SUG.IMPL, { priority: 1, mood: 'proud', noStatus: true });
        B(dur(3200), function () { say(e === '👓' || e === '🕶️' ? LN.SUG.GLASSES : LN.SUG.HAT, { priority: 0, noStatus: true }); });
      }
      /* ---- idle ---- */
      function restoreListen() { cv(app, '--listen', baseListen()); }
      function wake() {
        if (!S.sleepy && !S.idleI) return; const was = S.idleI;
        S.idleI = 0; S.sleepy = false; boxEl.classList.remove(k('sleepy'));
        restoreListen(); earSize();
        if (was >= 3 && api.now() - S.lastX4 > dur(120000)) { S.lastX4 = api.now(); boxSay(was >= 7 ? nx('XB', LN.XB) : LN.X.X4, { mood: 'proud' }); }
        if (S.fort && !S.fortSaid && was >= 6) { S.fortSaid = true; B(dur(3200), function () { say(LN.FORT.back, { priority: 0, noStatus: true }); }); }
      }
      function chinAdd() {
        chin.appendChild(el('span', { text: 'ok' }));
        while (chin.children.length > 3) chin.removeChild(chin.firstChild); }
      function unhide() {
        const d = api.now() - S.hiddenAt; S.hiddenAt = 0;
        if (Number.isFinite(d) && d > 0) { S.lastInput += d; S.mountT += d; S.lastVoice += d; } }
      function paintClock(ms) {
        const txt = ['7:30 (it is 4:17)', '7:30', '7:30 (still)', '7:30 (insists)'][Math.min(3, Math.max(0, Math.floor(ms / 60000)))];
        if (stI.clock.v.textContent !== txt) stI.clock.v.textContent = txt; }
      function idleCheck() {
        if (document.hidden) { if (!S.hiddenAt) S.hiddenAt = api.now(); return; }
        if (S.hiddenAt) unhide(); paintClock(api.now() - S.mountT);
        if (S.phase !== 'write') return; const now = api.now(); const idle = (now - S.lastInput) / 1000;
        clockCheck(now - S.mountT);
        const th = SELF ? [6, 9, 12, 15, 18, 24, 30, 40, 48] : [60, 90, 120, 150, 180, 240, 300, 420, 480]; const i = S.idleI;
        if (i < th.length && idle >= th[i]) {
          S.idleI++;
          if (i === 0) { S.sleepy = false; cv(app, '--listen', 0.15); cv(app, '--ear', 0.8); boxSay(LN.X.T60, { tagOnly: true, ms: dur(10000) }); say(LN.X.X1, { mood: 'confused', priority: 0, noStatus: true }); }
          else if (i === 2) {
            say(LN.X.X2, { mood: 'confused', priority: 1 }); restart(boxEl, k('nod'));
            startRead({ kind: 'self', text: 'Is anyone there?', auto: true, onDone: function () { chinAdd(); enterWrite(true); } });
          } else if (i === 4) {
            S.sleepy = true; boxEl.classList.add(k('sleepy')); say(LN.X.X3, { mood: 'proud', priority: 1 });
            award(2, 'idle'); stat('idleBreaks'); api.achieve('suggestion-box.quiet'); addTrinket('🎩'); earSize();
          } else if (i === 6) {
            say(LN.X.X5, { mood: 'confused', priority: 1 }); award(1, 'rumor'); stat('rumors');
            let ft = ''; try { ft = String(api.line('fortune') || '').replace(/[{}]/g, '').trim(); } catch (e) { ft = ''; }
            if (ft) B(dur(4200), function () { say(LN.X.X5B + ' ' + ft, { priority: 1, noStatus: true }); });
          } else if (i === 8) { say(LN.X.X6, { mood: 'neutral', priority: 1 }); stat('incidentReports'); }
          else if (i === 5) {
            S.fort = 1; S.tabled = Math.max(S.tabled || 0, 5); paintPile(); award(0.5, 'a fort'); stat('forts'); api.sfx('pop');
            say(LN.FORT.a, { mood: 'proud', priority: 1 }); boxSay(LN.FORT.box, { tagOnly: true, ms: dur(12000) });
          } else tag(nx('XM', LN.XM), dur(12000));
          return;
        }
        if (S.idleI < 3 && now - S.lastVoice > dur(20000)) {
          let line;
          if (idle >= (SELF ? 1.5 : 15)) line = nx('XW', LN.XW);
          else { const band = S.career > 1 ? 'd' : S.maxBeat <= 2 ? 'a' : S.maxBeat <= 5 ? 'b' : 'c'; line = nx('IN' + band, LN.INT[band]); }
          stat('interludes'); say(line, { priority: 0, noStatus: true });
        }
      }
      function clockCheck(ms) {
        if (!S.q3 && ms >= (SELF ? 25000 : 180000)) {
          S.q3 = 1; stat('quarter'); award(3, 'Employee of the Quarter'); api.sfx('fanfare'); api.confetti(undefined, undefined, 16);
          banr(LN.Q3.ban, dur(16000)); pl1.textContent = LN.Q3.plaque; B(dur(16000), paintPlaque);
          say(LN.Q3.a, { mood: 'proud', priority: 1 }); B(dur(3400), function () { say(LN.Q3.b, { priority: 1, noStatus: true }); });
          B(dur(7200), function () { say(rF('metDennis') || rF('plantClicked') ? LN.Q3.den : LN.Q3.c, { mood: 'proud', priority: 1, noStatus: true }); });
          B(dur(11000), function () { say(LN.Q3.d, { priority: 0, noStatus: true }); }); B(dur(14000), function () { boxSay(LN.Q3.box, { tagOnly: true, ms: dur(9000) }); });
        } else if (!S.q6 && ms >= (SELF ? 35000 : 360000)) {
          S.q6 = 1; S.tellOn = 1; stat('boxOpened'); award(2, 'The Box Opens'); api.sfx('bell'); restart(boxEl, k('nod')); refreshFlags(); persist();
          banr(LN.TELLUN.ban, dur(14000)); say(LN.TELLUN.a, { mood: 'proud', priority: 1 }); B(dur(3800), function () { say(LN.TELLUN.b, { mood: 'confused', priority: 1, noStatus: true }); });
          B(dur(7600), function () { say(LN.TELLUN.c, { priority: 1, noStatus: true }); }); B(dur(10800), function () { boxSay(LN.TELLUN.box, { tagOnly: true, ms: dur(9000) }); });
        } else if (!S.q10 && ms >= (SELF ? 45000 : 600000)) {
          S.q10 = 1; stat('interruptions'); api.achieve('suggestion-box.interrupted'); award(7.5, 'The Interruption'); api.sfx('honk');
          restart(boxEl, k('nod')); restart(boxWrap, k('jig')); tag(LN.Q10.box1, dur(6000)); banr(LN.Q10.ban, dur(20000));
          S.blockUntil = api.now() + dur(4500); setControls(false); hmEl.hidden = false; boxWrap.classList.add(k('boxbig'));
          B(dur(1300), function () { hmEl.hidden = true; });
          B(dur(4500), function () { boxWrap.classList.remove(k('boxbig')); if (S.phase === 'write') setControls(true); });
          say(LN.Q10.a, { mood: 'panic', priority: 2 }); B(dur(3800), function () { say(LN.Q10.b, { mood: 'confused', priority: 1, noStatus: true }); });
          B(dur(7600), function () { say(LN.Q10.c, { priority: 1, noStatus: true }); });
          B(dur(11800), function () { api.sfx('tada'); api.confetti(undefined, undefined, 20); boxSay(LN.Q10.d, { mood: 'proud' }); });
          B(dur(17000), function () { say(LN.Q10.e, { mood: 'proud', priority: 1, noStatus: true }); });
        }
      }
      /* ---- suggesting to the Box (season 2) ---- */
      function tellBox() {
        if (S.phase !== 'write' || !S.tellOn) return; const now = api.now();
        if (now - S.lastTell < dur(700)) { restart(tellBtn, k('shake')); return; } S.lastTell = now;
        const i = S.tell; S.tell = Math.min(9999, S.tell + 1); stat('told'); api.sfx('bloop'); restart(boxEl, k('nod')); S.lastInput = now;
        if (S.tellPaid < 6) { S.tellPaid++; award(0.5, 'suggested to the Box'); }
        if (S.tell >= 10) api.achieve('suggestion-box.tell');
        if (i === 8) addTrinket('🎩');
        say(i < LN.TELL.length ? LN.TELL[i] : nx('TX', LN.TELLX), { priority: 1, mood: 'proud', tag: true, tagMs: 8000, retry: true });
        if (burst(S.tellTimes, 12, 8000, 30000, 'lastTellSpam')) B(dur(1800), function () { say(LN.TELLSPAM, { priority: 1, mood: 'confused', noStatus: true, retry: true }); });
        persist(); }
      /* ---- Lean In, Verify ---- */
      function cancelLean(silent) {
        if (!S.leaning) return; S.leaning = false; S.leanTok = (S.leanTok || 0) + 1;
        leanBtn.setAttribute('aria-pressed', 'false'); boxEl.classList.remove(k('leaning'));
        restoreListen(); if (!silent) tag(LN.LEANOUT); }
      function lobbyHeard() {
        try { const t = String(api.line('ticker') || '').replace(/[{}]/g, '').trim(); return t ? LN.OVERLOBBY + ' ' + t : ''; } catch (e) { return ''; } }
      function leanIn() {
        if (S.phase !== 'write' || S.maxBeat < 3) return;
        if (S.leaning) { cancelLean(false); return; }
        S.leaning = true; const tok = (S.leanTok = (S.leanTok || 0) + 1);
        leanBtn.setAttribute('aria-pressed', 'true'); boxEl.classList.add(k('leaning'));
        cv(app, '--listen', 1); cv(app, '--ear', 2.2); api.sfx('whoosh'); B(dur(1200), function () {
          if (!S.leaning || tok !== S.leanTok) return;
          S.leaning = false; leanBtn.setAttribute('aria-pressed', 'false'); boxEl.classList.remove(k('leaning'));
          restoreListen(); earSize(); let text;
          if (S.heard.length >= 13 && !S.rareDone) { S.rareDone = 1; text = LN.RARE94; }
          else if (api.chance(0.22) && (text = lobbyHeard())) { stat('lobbyHeard'); }
          else {
            let idx = api.randInt(0, 12);
            for (let i = 0; i < 13 && S.heard.indexOf(idx) >= 0 && S.heard.length < 13; i++) idx = (idx + 1) % 13;
            if (S.heard.indexOf(idx) < 0) S.heard.push(idx); text = LN.OVER[idx]; }
          award(1, 'overheard'); stat('leaned'); api.sfx('bloop');
          say(text, { priority: 1, mood: 'neutral' }); persist(); }); }
      function verify() {
        if (S.phase !== 'write' || S.maxBeat < 4) return; const now = api.now();
        S.verifyTimes = S.verifyTimes.filter(function (t) { return now - t < dur(60000); });
        if (S.verifyTimes.length >= 3) { restart(verBtn, k('shake')); return; }
        S.verifyTimes.push(now); stat('verified'); api.sfx('blip');
        if (!S.curtainUp) { tag(nx('CURTV', LN.CURTV)); return; }
        if (S.applied === 0) { flickRate('Verified', 1500); say(LN.VERIFIED0, { priority: 1, mood: 'proud' }); return; }
        let named = 0; S.tiles.forEach(function (x, i) { if (x > S.tiles[named]) named = i; });
        let wrong = api.randInt(0, 8); if (wrong === named) wrong = (wrong + 1) % 9;
        const t = wallTiles[wrong].b;
        spy.hidden = false; spy.style.left = '0px'; spy.style.top = '0px'; void spy.offsetWidth;
        spy.style.left = Math.round(t.offsetLeft + t.offsetWidth * 0.3) + 'px'; spy.style.top = Math.round(t.offsetTop + t.offsetHeight * 0.25) + 'px';
        B(dur(1500), function () {
          if (S.maxBeat >= 8 && !S.verified8) { S.verified8 = true; say(LN.VERIFY8, { priority: 1, mood: 'confused' }); }
          else say(fill(nx('VER', LN.VERIFY), { TILE: tileName(named) }), { priority: 1 }); });
        B(dur(3800), function () { spy.hidden = true; }); }
      /* ---- the bigger box (beat 9) ---- */
      function startZoom() {
        go('zoom'); setControls(false); lockInner(); big.classList.add(k('bigon'));
        cv(app, '--zoom', 0.55); cv(app, '--listen', 0.3);
        if (app.dataset.stack === '1') inner.style.marginBottom = '-' + Math.round(inner.offsetHeight * 0.45) + 'px';
        say(LN.Z.Z1, { priority: 2, mood: 'confused' });
        T(dur(3000), function () { say(LN.Z.Z2, { priority: 1, mood: 'proud' }); });
        T(dur(6200), startMgmt); }
      function mgDeal() {
        mtiles.textContent = ''; api.shuffle(MGMT_WORDS).slice(0, 10).forEach(function (w) {
          const b = el('button', { class: c('tile'), type: 'button', text: w, 'aria-label': "Management's word: " + w });
          cv(b, '--r', (api.rand() * 4 - 2).toFixed(2) + 'deg'); cv(b, '--c', TCOL[api.randInt(0, TCOL.length - 1)]);
          api.on(b, 'click', function () {
            if (S.phase !== 'mgmt' || !S.mg || S.mg.posted) return;
            S.mg.text = (S.mg.text + w + ' ').slice(0, 80);
            mslip.textContent = S.mg.text; api.sfx('tick'); }); mtiles.appendChild(b); }); }
      function startMgmt() {
        go('mgmt'); S.mg = { text: '', posted: false }; mslip.textContent = ''; mgDeal(); stage.hidden = true;
        mgmtEl.hidden = false; restart(mgmtEl, k('fresh')); api.sfx('pop');
        say(LN.Z.Z3, { priority: 2, mood: 'proud' });
        try { mtiles.firstChild.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
        T(dur(45000), function () { mgmtPost('auto'); }); }
      function mgmtPost() {
        if (S.phase !== 'mgmt' || !S.mg || S.mg.posted) return; S.mg.posted = true;
        let text = clean(S.mg.text);
        if (text.split(/\s+/).filter(Boolean).length < 3) text = LN.Z.DEFAULT; mgmtEl.hidden = true; stage.hidden = false;
        startRead({ phase: 'mgmt', kind: 'mgmt', text: text, tempo: 560, hushed: true, onDone: function () { mgAfter(text); } });
      }
      function mgAfter(text) {
        say(fill(LN.Z.Z4, { QQ: '"' + text + '"' }), { priority: 2, mood: 'proud', force: true });
        bigSticker.textContent = text.slice(0, 40); bigSticker.hidden = false;
        T(dur(3200), function () {
          say(LN.Z.Z5, { priority: 2, mood: 'proud', force: true });
          if (!S.b9paid) { S.b9paid = 1; award(5, 'helped Management'); }
          stat('boxes'); persist(); T(dur(2600), mgQuiet); }); }
      function mgQuiet() {
        S.hushUntil = api.now() + dur(22000); setStatus('...');
        T(dur(8000), function () { setStatus(LN.Z.Z7); });
        T(dur(15000), function () { setStatus(LN.Z.Z8); }); T(dur(20000), endZoom); }
      function endZoom() {
        S.hushUntil = 0; go('cert'); setControls(false); big.classList.remove(k('bigon'));
        bigSticker.hidden = true; mgmtEl.hidden = true; S.beat = 10; T(dur(900), collected); }
      function rollRate() {
        for (let i = 1; i <= 10; i++) (function (n) { T(dur(100 * n), function () { stI.rate.v.textContent = (n * 10) + '%'; }); })(i);
        T(dur(1900), function () { stI.rate.v.textContent = 'Probably'; say(LN.AB.AB8, { priority: 1, mood: 'confused', noStatus: true }); });
      }
      function showCert() {
        const first = !S.cert; S.cert = 1;
        try { api.flag.set('suggestion-box.certified', true); } catch (e) { /* ignore */ }
        api.achieve('suggestion-box.certified'); if (first) award(10, 'certificate'); let low = 0;
        S.tiles.forEach(function (x, i) { if (x < S.tiles[low]) low = i; });
        S.here = low; S.tiles[low] = 0; S.stk[low] = []; setCurtain(false); paintWall();
        certEl.textContent = '';
        certEl.appendChild(el('div', { class: c('ribbon'), 'aria-hidden': 'true', text: '✨' }));
        certEl.appendChild(el('h3', { text: 'CERTIFICATE OF HAVING BEEN HEARD' }));
        certEl.appendChild(el('p', { text: 'This is to certify that ' + pName() + ' has been heard.' }));
        certEl.appendChild(el('p', { text: 'Suggestions In: ' + num(S.n) + '. Applied: ' + num(S.applied) + '. Implemented for certain: 0.' }));
        const tw = topWord(); certEl.appendChild(el('p', { text: tw ? fill(LN.YIRC, { W: tw[0], N: tw[1] }) : LN.YIRC0 }));
        certEl.appendChild(el('p', { text: 'Suggestion of the Year: ' + (S.first || 'a bigger box') + '. It was implemented in a drawer.' }));
        certEl.appendChild(el('p', {}, 'Signed: ', el('span', { class: c('sign'), text: 'S' }), ' (already signed)'));
        certEl.appendChild(el('button', { class: c('btn', 'post'), type: 'button', text: 'File it and carry on', onclick: function () { loopNow(); } }));
        certEl.hidden = false; api.sfx('fanfare'); api.confetti(undefined, undefined, 26);
        tag('heard'); say(LN.AB.AB1, { priority: 2, mood: 'proud' }); rollRate();
        T(dur(4000), function () { tag('welcome'); });
        T(dur(5200), function () { say(LN.AB.AB2, { priority: 1, mood: 'proud', noStatus: true }); });
        T(dur(9500), function () { say(LN.AB.AB3, { priority: 1, noStatus: true }); });
        T(dur(14000), function () { say(LN.AB.AB4, { priority: 1, mood: 'proud', noStatus: true }); });
        T(dur(18500), function () { say(LN.AB.AB6, { priority: 1, noStatus: true }); });
        T(dur(30000), loopNow); persist(); }
      function anonClick() {
        if (S.phase === 'cert' && !S.dennis && !certEl.hidden) {
          S.dennis = 1; stat('dennisRead'); persist();
          say(LN.AB.AB5, { priority: 2, mood: 'proud' }); T(dur(2200), loopNow); return; }
        say(nx('ANON', LN.ANON), { priority: 1, mood: 'neutral' }); api.sfx('blip'); }
      function loopNow() {
        if (S.phase !== 'cert') return; certEl.hidden = true;
        S.career++; S.beat = 2; S.postsBeat = 0; S.beatStart = api.now(); S.careerFirst = true;
        S.queue = []; S.chain = 0; S.topSaid = false; stat('careers');
        if (S.career >= 2) api.achieve('suggestion-box.lap'); paintWall(); persist(); enterWrite();
        refreshUI(); }
      /* ---- the box itself: pointer, click, jiggle ---- */
      function boxClick() {
        const now = api.now(); S.boxClicks.push(now);
        while (S.boxClicks.length && now - S.boxClicks[0] > dur(10000)) S.boxClicks.shift();
        if (now - S.lastBoxSay < dur(400)) return; S.lastBoxSay = now; api.sfx('blip');
        restart(boxEl, k('nod'));
        if (S.boxClicks.length >= 25) { S.boxClicks = []; boxSay(nx('YB', LN.YB), { mood: 'confused' }); return; }
        tag(nx('OH', OH)); }
      function onMove(e) {
        const rc = app.getBoundingClientRect();
        const x = e.clientX - rc.left, y = e.clientY - rc.top;
        if (!Number.isFinite(x) || !Number.isFinite(y) || !(rc.width > 0)) return;
        if (S.trinkets.length) { cursorEl.style.left = (x + 14).toFixed(0) + 'px'; cursorEl.style.top = (y + 14).toFixed(0) + 'px'; }
        const bx = boxEl.getBoundingClientRect();
        const dx = e.clientX - (bx.left + bx.width / 2), dy = e.clientY - (bx.top + 40);
        cv(app, '--lean', (clamp(dx / (rc.width / 2), -1, 1) * 6).toFixed(2) + 'deg');
        const px = clamp(dx / 60, -1, 1) * 3, py = clamp(dy / 60, -1, 1) * 3;
        pupils.forEach(function (p) { cv(p, '--px', px.toFixed(1) + 'px'); cv(p, '--py', py.toFixed(1) + 'px'); });
      }
      function lookAt(ch) {
        try {
          const a = ch.getBoundingClientRect(), b = boxEl.getBoundingClientRect(); if (!(b.width > 0)) return;
          const px = clamp((a.left + a.width / 2 - b.left - b.width / 2) / 80, -1, 1) * 3, py = clamp((a.top - b.top) / 120, -1, 1) * 3;
          pupils.forEach(function (p) { cv(p, '--px', px.toFixed(1) + 'px'); cv(p, '--py', py.toFixed(1) + 'px'); });
        } catch (e) { /* ignore */ } }
      function curtainPoke() {
        if (S.curtainUp || S.curAnim) return; const now = api.now(); restart(curtain, k('bulge')); api.sfx('blip');
        if (now - S.lastCurt < dur(15000)) return; S.lastCurt = now; stat('curtainPokes');
        say(nx('CURTC', LN.CURTC), { priority: 1, mood: 'confused', tag: true, retry: true }); }
      function picketOn(on) {
        if (on === S.picketOn) return; S.picketOn = on; picket.hidden = !on; postBtn.textContent = on ? 'ON STRIKE (CLACK)' : 'POST IT';
        if (!on) { stat('settlements'); B(dur(1400), function () { say(LN.SETTLE, { priority: 1, mood: 'proud', noStatus: true, retry: true }); }); } }
      function collected() {
        const tw = topWord(), w = tw ? tw[0] : 'nothing';
        const text = [w, w, w].concat(S.slips.slice(-3).join(' ').split(/\s+/).filter(Boolean)).slice(0, 10).join(' ');
        say(fill(LN.CW.a, { PLAYER: pName() }), { priority: 2, mood: 'proud', force: true, noStatus: true }); stat('collected');
        startRead({ phase: 'cert', kind: 'self', text: text, tempo: 480, auto: true, onDone: function () {
          api.sfx('sad'); say(nx('TIER5', LN.TIER[5]), { mood: 'panic', force: true, priority: 2 });
          T(dur(3400), function () { say(LN.CW.b, { mood: 'proud', priority: 2, force: true, noStatus: true }); T(dur(3600), showCert); }); } }); }
      function checkCompact() {
        const w = root.clientWidth; if (!(w > 0)) return; const compact = w < 500;
        app.dataset.compact = compact ? '1' : '0'; if (drawer.children.length && drawer.children.length !== (compact ? 8 : 10)) dealTiles();
        app.dataset.stack = w < 760 ? '1' : '0'; const pp = stage.parentNode; placeStage(); if (stage.parentNode !== pp) fixFocus();
        if (compact && !S.narrowSaid) { S.narrowSaid = true; B(dur(1500), function () { boxSay(LN.NARROW, { tagOnly: true }); }); }
      }
      function endFlick(release) {
        const F = S.flick; S.flick = null; slipEl.style.transition = ''; if (!F) return;
        if (release && S.phase === 'write') {
          const held = api.now() - F.moveT;
          if (F.ema > 160 && F.dy < -30) { if (!tryPost(F.ema > 900 ? 'Airmail' : F.ema >= 400 ? 'Crisp' : 'Limp')) slipEl.style.transform = ''; return; }
          if (F.dy < -60 && held >= 1500) { if (!tryPost('Ceremonial')) slipEl.style.transform = ''; return; }
        }
        slipEl.style.transform = ''; }
      function beatPress() {
        S.lastTap = api.now(); if (S.reading && !S.reading.done) { tap(); return; }
        if (S.phase === 'mgmt' || S.phase === 'zoom') return; pushPressure(); const now = api.now();
        S.spamBeat.push(now);
        while (S.spamBeat.length && now - S.spamBeat[0] > dur(5000)) S.spamBeat.shift();
        if (S.spamBeat.length >= 6 && now - S.lastSpamBeat > dur(30000)) { S.lastSpamBeat = now; S.spamBeat = []; say(nx('YP', LN.YP), { priority: 1, mood: 'confused', tag: true, retry: true }); }
      }
      function onKey(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return; const key = e.key;
        S.lastInput = api.now(); wake(); const tgt = e.target;
        const typing = tgt === ta || (tgt && tgt.tagName === 'INPUT'); const R = S.reading;
        if (R && !R.done) {
          if (key === 'Escape') { finishRead(R, 'skip'); e.preventDefault(); return; }
          if (key === 'Tab' || key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta' || tgt === skipBtn || tgt === curtain) return;
          if (key === ' ' || (key === 'Enter' && tgt === beatBtn)) e.preventDefault();
          if (e.repeat) return; tap(); return; }
        if (S.held) { endHeld(); if (key === ' ') e.preventDefault(); return; }
        if (key === 'Escape') { if (S.leaning) cancelLean(false); else if (S.phase === 'write') retract(); return; }
        if (key === 'Enter' && tgt === ta && !e.shiftKey && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); tryPost('Standard'); return; }
        if (key === 'Tab' && tgt === ta && !e.shiftKey && S.ghost && ta.selectionStart === ta.value.length && !/\s$/.test(ta.value)) { e.preventDefault(); acceptGhost(); return; }
        if ((key === 'Enter' || key === ' ') && tgt === boxEl) { e.preventDefault(); if (S.jam) jig(27); else if (!e.repeat) boxClick(); return; }
        if (typing) return; if (key === 'j' || key === 'J') { jig(27); return; }
        if (e.repeat) return; if (key === 'l' || key === 'L') leanIn();
        else if (key === 'v' || key === 'V') verify();
        else if (key === 'i' || key === 'I') implementOffer();
        else if (key === 't' || key === 'T') tableOffer();
        else if (/^[1-9]$/.test(key)) { if (S.phase === 'apply') lobby(Number(key) - 1); }
      }
      function onInput(e) {
        S.lastInput = api.now(); wake(); if (e.target !== ta) return; const v = ta.value;
        const tail = v.slice(-12); const letters = v.replace(/[^A-Za-z]/g, '');
        const loud = tail.indexOf('!') >= 0 || (letters.length >= 4 && letters === letters.toUpperCase());
        const soft = !loud && v.length >= 3 && !/[A-Z!]/.test(tail);
        boxEl.classList.toggle(k('flinch'), loud); boxEl.classList.toggle(k('gentle'), soft);
        const now = api.now();
        if ((loud || soft) && now - S.lastReact > dur(5000)) { S.lastReact = now; tag(loud ? nx('LF', LN.LIVE.flinch) : nx('LG', LN.LIVE.gentle)); }
        if (now - (S.lastFlap || 0) > 140) { S.lastFlap = now; restart(boxEl, k('flap')); }
        paintGhost(); earSize(); }
      /* ---- wiring ---- */
      api.on(app, 'pointermove', onMove);
      api.on(app, 'pointerdown', function (e) { S.lastInput = api.now(); if (e && e.pointerType) S.coarse = e.pointerType === 'touch'; wake(); if (S.held) endHeld(); });
      api.on(app, 'keydown', onKey); api.on(app, 'input', onInput);
      api.on(document, 'visibilitychange', function () { if (document.hidden) { if (!S.hiddenAt) S.hiddenAt = api.now(); } else if (S.hiddenAt) unhide(); });
      api.on(ta, 'keyup', function () { paintGhost(); });
      api.on(ta, 'click', function () { paintGhost(); }); api.on(window, 'resize', checkCompact);
      api.on(beatBtn, 'pointerdown', function (e) { if (e && e.button > 0) return; beatPress(); });
      api.on(beatBtn, 'click', function () { if (api.now() - S.lastTap < 500) return; beatPress(); });
      api.on(curtain, 'click', curtainPoke);
      api.on(curtain, 'keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && !S.curtainUp) { e.preventDefault(); e.stopPropagation(); curtainPoke(); } });
      api.on(boxEl, 'pointerdown', function (e) {
        S.lastMoved = 0; S.bd = { x: e.clientX, moved: 0 };
        try { boxEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      }); api.on(boxEl, 'pointermove', function (e) {
        const D = S.bd; if (!D) return; const dx = e.clientX - D.x; D.x = e.clientX;
        if (!Number.isFinite(dx)) return; const a = Math.min(60, Math.abs(dx)); D.moved += a;
        if (a > 0) jig(a); });
      const boxUp = function () { if (S.bd) { S.lastMoved = S.bd.moved; S.bd = null; } };
      api.on(boxEl, 'pointerup', boxUp); api.on(boxEl, 'pointercancel', boxUp); api.on(boxEl, 'lostpointercapture', boxUp);
      api.on(boxEl, 'click', function () { if (S.lastMoved > 6) { S.lastMoved = 0; return; } boxClick(); });
      api.on(slipEl, 'pointerdown', function (e) {
        if (S.phase !== 'write' || e.target === ta || e.target === acceptBtn) return;
        const t = api.now();
        S.flick = { y0: e.clientY, lastY: e.clientY, lastT: t, ema: 0, dy: 0, moveT: t };
        try { slipEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      }); api.on(slipEl, 'pointermove', function (e) {
        const F = S.flick; if (!F) return; const t = api.now(), dt = t - F.lastT;
        if (!(dt > 0)) return; const v = (F.lastY - e.clientY) / dt * 1000;
        if (Number.isFinite(v)) F.ema = F.ema * 0.6 + v * 0.4; F.lastY = e.clientY; F.lastT = t;
        F.dy = clamp(e.clientY - F.y0, -320, 40); if (Math.abs(v) > 20) F.moveT = t;
        slipEl.style.transition = 'none';
        slipEl.style.transform = 'translate(0px,' + F.dy.toFixed(1) + 'px)'; });
      api.on(slipEl, 'pointerup', function () { endFlick(true); });
      api.on(slipEl, 'pointercancel', function () { endFlick(false); });
      api.on(slipEl, 'lostpointercapture', function () { endFlick(false); });
      api.setInterval(idleCheck, 1000); const phTick = function () {
        if (S.phase === 'write' && !ta.value && !S.ghost) { S.ph = (S.ph + 1) % PH.length; ta.placeholder = PH[S.ph]; }
        B(dur(6000), phTick); }; B(dur(6000), phTick);
      /* ---- start ---- */
      function intro() {
        go('intro'); setControls(false); say(LN.A1, { priority: 1, mood: 'proud' });
        T(dur(1200), function () { restart(boxEl, k('flap')); tag(LN.A1P); });
        T(dur(1800), function () { say(LN.A2, { mood: 'confused', priority: 1, noStatus: true }); });
        T(dur(3800), function () {
          api.sfx('pop'); ta.value = 'Please read me.'; say(LN.A3, { priority: 1, noStatus: true });
          startRead({ kind: 'demo', text: 'Please read me.', tempo: 480, lead: 1200, onDone: function () {
            say(LN.A1b, { priority: 1, noStatus: true }); enterWrite(); setStatus(LN.HOWTO); B(dur(2000), function () { tag(LN.A5); });
            B(dur(9000), function () { if (S.beat === 1) say(LN.A4, { priority: 0, noStatus: true }); });
          } }); }); }
      S.beatStart = api.now();
      setCurtain(S.beat >= 4 && S.career >= 1 && !(S.career > 1 && S.beat < 4), true); dealTiles();
      paintPile(); refreshUI(); checkCompact(); if (S.beat >= 2 || S.career > 1) {
        say(nx('RESUME', LN.RESUME), { priority: 1, mood: 'proud' }); enterWrite();
        setStatus(LN.HOWTO);
      } else intro(); return {
        destroy() { persist(); }
      }; }
  }); })();
