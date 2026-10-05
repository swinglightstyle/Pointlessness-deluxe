/* POINTLESS module: auction-house */
/*
 * THE AUCTION HOUSE. Everything is a lot. You win it. You owe exactly 1 Meh more than you have.
 * Built from design/auction-house.md. One rAF loop, one phase machine (curtain, bidding, hammer, recon, settle, quiet).
 * Real Meh is never debited. All timing goes through the loop (S.t / scheduled events), so nothing leaks.
 */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`
.m-auction-house-root{--ah-curtain:#8c2f39;--ah-curtain2:#6d2029;--ah-brass:#c89b3c;--ah-cream:#f6efdc;--ah-ink:#2b2118;--ah-mint:#7fd1ae;--ah-coral:#f07167;--ah-must:#f2c14e;--ah-nix:#1a1410;--ah-amber:#ffb43a;--ah-bg:#3a1c22;--ah-ph:.2;--ah-ledger:#f6efdc;
position:relative;overflow:hidden;background:var(--ah-bg);color:var(--ah-cream);padding:10px;border-radius:12px;font:15px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;min-height:420px;box-sizing:border-box}
.m-auction-house-root *{box-sizing:border-box}.m-auction-house-root [hidden]{display:none!important}
.m-auction-house-seat:disabled span,.m-auction-house-seat:disabled svg{visibility:hidden}:where(.m-auction-house-root) button{font:inherit;color:inherit;cursor:pointer}
.m-auction-house-root button:focus-visible,.m-auction-house-root input:focus-visible,.m-auction-house-root select:focus-visible{outline:3px solid var(--ah-must);outline-offset:2px}.m-auction-house-warm{--ah-ledger:#fbf3d9}
.m-auction-house-board{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:8px 10px;background:var(--ah-nix);border:3px solid var(--ah-ink);border-radius:10px;box-shadow:4px 4px 0 var(--ah-ink);position:relative}
.m-auction-house-plate{background:var(--ah-brass);color:var(--ah-ink);font-weight:900;letter-spacing:.06em;padding:4px 10px;border-radius:6px;border:2px solid var(--ah-ink);font-size:.85rem;max-width:100%;overflow-wrap:anywhere}
.m-auction-house-digits{display:flex;gap:4px;align-items:center}
.m-auction-house-dg{width:30px;height:42px;background:#0d0906;border:2px solid #3a2a1c;border-radius:5px;color:var(--ah-amber);font:700 1.8rem/38px ui-monospace,Consolas,monospace;text-align:center;text-shadow:0 0 8px var(--ah-amber),0 0 2px #fff3;font-variant-numeric:tabular-nums;overflow:hidden}
.m-auction-house-dg.m-auction-house-dd{color:#5c3b14;text-shadow:none}.m-auction-house-dg.m-auction-house-flip{animation:m-auction-house-flip .18s ease-in-out}
@keyframes m-auction-house-flip{0%{transform:rotateX(0)}50%{transform:rotateX(90deg)}100%{transform:rotateX(0)}}
.m-auction-house-plus{color:var(--ah-amber);font-weight:800;text-shadow:0 0 6px var(--ah-amber)}.m-auction-house-lamps{display:flex;gap:5px}
.m-auction-house-lamp{width:12px;height:12px;border-radius:50%;background:#3a2a1c;border:2px solid #000}.m-auction-house-lamp.m-auction-house-lit{background:var(--ah-amber);box-shadow:0 0 8px var(--ah-amber)}
.m-auction-house-exit{margin-left:auto;font-size:.7rem;font-weight:700;color:#7bd88f;background:none;border:2px solid #7bd88f;padding:1px 6px;min-height:44px;border-radius:4px;letter-spacing:.08em}
.m-auction-house-dark .m-auction-house-dg{color:#2a1a0a;text-shadow:none}.m-auction-house-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;margin-top:10px}
@media (min-width:800px){.m-auction-house-grid{grid-template-columns:minmax(0,1.55fr) minmax(260px,1fr)}}
.m-auction-house-left{display:flex;flex-direction:column;gap:10px;min-width:0}
.m-auction-house-stage{position:relative;background:linear-gradient(#5a2530,#3c1a21);border:3px solid var(--ah-ink);border-radius:12px;box-shadow:4px 4px 0 var(--ah-ink);padding:10px 8px 8px;overflow:hidden}
.m-auction-house-curt{position:absolute;top:0;bottom:0;width:13%;z-index:1;background:repeating-linear-gradient(90deg,var(--ah-curtain) 0 9px,var(--ah-curtain2) 9px 15px);animation:m-auction-house-sway 7s ease-in-out infinite;transition:transform 1.6s ease-in-out,width 1.4s ease-in-out;box-shadow:0 0 14px #0006}
.m-auction-house-curt.m-auction-house-cl{left:0;border-right:3px solid var(--ah-ink)}.m-auction-house-curt.m-auction-house-cr{right:0;border-left:3px solid var(--ah-ink);animation-delay:-3s}
.m-auction-house-open .m-auction-house-cl{transform:translateX(-100%)}.m-auction-house-open .m-auction-house-cr{transform:translateX(100%)}
@keyframes m-auction-house-sway{0%,100%{translate:-3px 0}50%{translate:3px 0}}.m-auction-house-shut .m-auction-house-curt{width:52%}
.m-auction-house-sbody{position:relative;z-index:2;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:10px;margin:0 11%}
.m-auction-house-hollis{position:relative;width:104px;display:flex;flex-direction:column;align-items:center}.m-auction-house-hbtn{background:none;border:0;padding:0;width:84px;height:78px;position:relative;display:block}
.m-auction-house-hat{position:absolute;left:50%;top:0;transform:translateX(-50%);font-size:1.9rem;z-index:2}
.m-auction-house-face{position:absolute;left:50%;top:22px;width:50px;height:50px;margin-left:-25px;border-radius:50%;background:#f0c9a0;border:3px solid var(--ah-ink)}
.m-auction-house-face i{position:absolute;top:16px;width:6px;height:7px;border-radius:50%;background:var(--ah-ink)}.m-auction-house-face i:nth-child(1){left:12px}.m-auction-house-face i:nth-child(2){right:12px}
.m-auction-house-mouth{position:absolute;left:15px;bottom:8px;width:16px;height:8px;border-radius:50%;background:#7a2a2a;border:2px solid var(--ah-ink);animation:m-auction-house-talk .22s steps(2) infinite}
.m-auction-house-still .m-auction-house-mouth{animation:none;transform:scaleY(.4)}@keyframes m-auction-house-talk{0%{transform:scaleY(.3)}100%{transform:scaleY(1)}}
.m-auction-house-faint .m-auction-house-face,.m-auction-house-faint .m-auction-house-hat{opacity:0}
.m-auction-house-faintem{position:absolute;left:50%;top:18px;transform:translateX(-50%);font-size:2.4rem;display:none}.m-auction-house-faint .m-auction-house-faintem{display:block}.m-auction-house-rival{position:absolute;right:-10px;top:30px;font-size:1.7rem;pointer-events:none;opacity:0;transform:translateY(46px);transition:transform .7s,opacity .4s}.m-auction-house-up .m-auction-house-rival{opacity:1;transform:none}
.m-auction-house-lectern{width:100%;margin-top:-4px;background:linear-gradient(#a4753a,#7a5424);border:3px solid var(--ah-ink);border-radius:8px 8px 4px 4px;padding:6px 4px;text-align:center;box-shadow:inset 0 0 0 2px var(--ah-brass)}
.m-auction-house-gavel{width:46px;height:46px;border-radius:50%;background:var(--ah-cream);border:3px solid var(--ah-ink);font-size:1.4rem;line-height:1;padding:0;color:var(--ah-ink)}
.m-auction-house-gavel span{display:inline-block;transform-origin:20% 80%;transform:rotate(-40deg);transition:transform .12s}
.m-auction-house-swing span{animation:m-auction-house-swing .5s ease-in-out}.m-auction-house-wobble{animation:m-auction-house-wobble .35s}
@keyframes m-auction-house-swing{0%{transform:rotate(-40deg)}45%{transform:rotate(15deg)}100%{transform:rotate(-40deg)}}
@keyframes m-auction-house-wobble{0%,100%{transform:rotate(0)}30%{transform:rotate(-8deg)}70%{transform:rotate(8deg)}}
.m-auction-house-tinyg{font-size:.9rem;margin-left:4px}.m-auction-house-cardwrap{flex:1 1 170px;min-width:0;max-width:300px;position:relative}
.m-auction-house-card{position:relative;display:block;width:100%;text-align:left;background:var(--ah-cream);color:var(--ah-ink);border:3px solid var(--ah-ink);border-radius:10px;box-shadow:4px 4px 0 var(--ah-ink);padding:8px 10px;min-height:128px;overflow:hidden}
.m-auction-house-card:hover{background:#fffaea}.m-auction-house-slide{animation:m-auction-house-slide .45s ease-out}
@keyframes m-auction-house-slide{from{transform:translateX(60%) rotate(4deg);opacity:0}to{transform:none;opacity:1}}
.m-auction-house-clab{display:block;font-weight:900;letter-spacing:.08em;font-size:.72rem;color:#8c2f39}
.m-auction-house-cname{display:block;font-weight:800;font-size:1.02rem;line-height:1.2;margin:2px 0 3px;overflow-wrap:anywhere}
.m-auction-house-cblurb{display:block;font-size:.78rem;line-height:1.3;opacity:.85;overflow-wrap:anywhere}.m-auction-house-art{position:absolute;right:6px;top:4px;font-size:1.7rem;opacity:.9}
.m-auction-house-view{position:absolute;inset:0;background:var(--ah-cream);padding:8px 10px;font-size:.8rem;line-height:1.3;display:none;align-content:center;overflow:auto}
.m-auction-house-viewing .m-auction-house-view{display:grid;animation:m-auction-house-fade .4s}@keyframes m-auction-house-fade{from{opacity:0}to{opacity:1}}
.m-auction-house-win{display:block;width:84px;height:64px;margin:6px auto 0;border:6px solid #9a7440;background:#e9f0f2;position:relative;cursor:pointer}
.m-auction-house-win:before,.m-auction-house-win:after{content:"";position:absolute;background:#9a7440}
.m-auction-house-win:before{left:50%;top:0;bottom:0;width:4px;margin-left:-2px}.m-auction-house-win:after{top:50%;left:0;right:0;height:4px;margin-top:-2px}
.m-auction-house-plant{display:block;text-align:center;font-size:2.2rem}.m-auction-house-bx{display:block;border:4px solid #8a5a2b;background:#c99654;margin:4px auto 0;transition:all .2s;box-shadow:2px 2px 0 var(--ah-ink)}
.m-auction-house-cloth{display:block;margin:6px auto 0;width:110px;height:52px;border-radius:30px 30px 6px 6px;background:linear-gradient(100deg,#b2434d,#8c2f39 30%,#b2434d 50%,#7a2430 75%,#a63a44);border:3px solid var(--ah-ink);cursor:pointer;transition:transform .3s}
.m-auction-house-lifted{transform:skewX(-8deg) translateY(-6px)}
.m-auction-house-stamp{position:absolute;right:6px;bottom:6px;border:4px solid var(--ah-coral);color:var(--ah-coral);border-radius:8px;padding:0 8px;font-weight:900;letter-spacing:.08em;font-size:1.1rem;background:#fff8;transform:rotate(-8deg);opacity:0;pointer-events:none;box-shadow:inset 0 0 0 2px var(--ah-mint)}
.m-auction-house-stamp.m-auction-house-on{opacity:.92;animation:m-auction-house-slam .3s ease-in}.m-auction-house-stamp.m-auction-house-miss{right:-18px;bottom:-6px;transform:rotate(14deg)}
@keyframes m-auction-house-slam{from{scale:3;opacity:0}to{scale:1;opacity:.92}}
.m-auction-house-vchip{position:absolute;left:8px;bottom:6px;background:var(--ah-brass);color:var(--ah-ink);border:2px solid var(--ah-ink);border-radius:10px;padding:0 8px;font-size:.7rem;font-weight:900;letter-spacing:.06em}.m-auction-house-postmark{display:block;font-size:.7rem;border:1px dashed #8c2f39;color:#8c2f39;padding:1px 4px;margin-top:3px;border-radius:4px;transform:rotate(-2deg)}
.m-auction-house-holding{position:absolute;left:8px;bottom:8px;font-size:1.3rem}
.m-auction-house-cushion{position:absolute;left:50%;top:50%;margin:-18px 0 0 -30px;width:60px;height:36px;border-radius:14px;background:#d98ca0;border:3px solid var(--ah-ink);display:none;z-index:4;text-align:center;line-height:30px;font-size:.8rem}
.m-auction-house-shh .m-auction-house-cushion{display:block;animation:m-auction-house-slam .5s ease-in}
.m-auction-house-calltxt{position:relative;text-align:center;margin-top:8px;min-height:1.3em;z-index:3;font-weight:900;letter-spacing:.1em;font-size:.95rem;color:var(--ah-must);text-shadow:2px 2px 0 var(--ah-ink);white-space:nowrap;pointer-events:none}
.m-auction-house-pulse{animation:m-auction-house-pulse .5s ease-out}@keyframes m-auction-house-pulse{from{scale:1.5}to{scale:1}}
.m-auction-house-gallery{position:relative;z-index:2;display:flex;justify-content:center;gap:8px;margin:12px 0 4px;flex-wrap:wrap}
.m-auction-house-seat{width:58px;height:58px;border-radius:14px 14px 6px 6px;background:#5a3a22;border:3px solid var(--ah-ink);font-size:1.5rem;line-height:1;padding:0;position:relative;transform:rotate(var(--ah-lean,0deg));transition:transform .3s;overflow:hidden}
.m-auction-house-seat:disabled{opacity:.45;cursor:default}.m-auction-house-seat em{font-style:normal;display:none;font-size:.6rem;line-height:1.05;font-weight:800;position:absolute;left:0;right:0;bottom:2px;color:var(--ah-cream)}.m-auction-house-seat:disabled em{display:block}
.m-auction-house-vest{position:absolute;left:12px;right:12px;bottom:10px;height:14px;background:linear-gradient(#3b5b8c,#2b4163);border-radius:3px;transform:rotate(-6deg);z-index:0}
.m-auction-house-seat.m-auction-house-big span{display:inline-block;scale:1.4}.m-auction-house-bounce{animation:m-auction-house-bounce .5s}
@keyframes m-auction-house-bounce{0%,100%{translate:0 0}40%{translate:0 -10px}}
.m-auction-house-stack .m-auction-house-seat{transform:rotate(86deg) translateY(10px)}.m-auction-house-heads .m-auction-house-seat{animation:m-auction-house-heads 4s ease-in-out}
@keyframes m-auction-house-heads{0%,100%{rotate:0deg}50%{rotate:-20deg}}.m-auction-house-sprig{position:absolute;right:2px;top:2px;font-size:.9rem}
.m-auction-house-ribbon{position:relative;z-index:2;margin-top:8px;background:#1d0e12;border:2px solid var(--ah-ink);border-radius:8px;padding:5px 8px;min-height:2.3rem;display:flex;flex-wrap:wrap;gap:2px 6px;align-items:baseline;overflow:hidden;font-size:.86rem}
.m-auction-house-who{flex:0 0 100%;font-size:.7rem;letter-spacing:.1em;opacity:.7;font-weight:800}.m-auction-house-rw{color:var(--ah-cream)}
.m-auction-house-rw.m-auction-house-nm{color:var(--ah-brass);font-weight:800}.m-auction-house-whisper .m-auction-house-rw{font-style:italic;font-size:.7rem;opacity:.8}
.m-auction-house-desk{background:linear-gradient(#7a5530,#5e3f22);border:3px solid var(--ah-ink);border-radius:12px;box-shadow:4px 4px 0 var(--ah-ink);padding:10px;display:flex;flex-direction:column;gap:8px;position:relative}
.m-auction-house-cap{background:var(--ah-cream);color:var(--ah-ink);border:2px solid var(--ah-ink);border-radius:8px;padding:6px 10px;min-height:4.4rem;font-size:.86rem;line-height:1.35}
.m-auction-house-cap b{font-weight:800;color:#8c2f39}.m-auction-house-cap .m-auction-house-prev{display:block;font-size:.72rem;opacity:.55;margin-bottom:3px;max-height:2.7em;overflow:hidden}
.m-auction-house-recon{background:var(--ah-cream);color:var(--ah-ink);border:2px dashed var(--ah-ink);border-radius:8px;padding:6px 10px;min-height:5.4rem;position:relative;overflow:hidden}
.m-auction-house-rt{font-size:.7rem;font-weight:900;letter-spacing:.1em;color:#8c2f39}.m-auction-house-rrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:3px}
.m-auction-house-clerk{font-size:1.4rem}.m-auction-house-pen{font-size:.7rem;color:var(--ah-coral);font-weight:800}.m-auction-house-rbid{font:800 1.1rem ui-monospace,Consolas,monospace}
.m-auction-house-rbid.m-auction-house-struck{text-decoration:line-through;text-decoration-color:var(--ah-coral);text-decoration-thickness:3px}.m-auction-house-odo{display:flex;gap:3px;align-items:center}
.m-auction-house-oc{width:22px;height:30px;background:var(--ah-nix);color:var(--ah-amber);border-radius:4px;font:700 1.2rem/30px ui-monospace,Consolas,monospace;text-align:center}
.m-auction-house-oc.m-auction-house-flip{animation:m-auction-house-flip .18s ease-in-out}
.m-auction-house-wallet{position:absolute;left:8px;bottom:6px;font-size:1.3rem;opacity:0;pointer-events:none}.m-auction-house-wallet.m-auction-house-fly{animation:m-auction-house-fly 1.2s ease-in-out}
@keyframes m-auction-house-fly{0%{opacity:1;transform:translateX(0)}50%{opacity:1;transform:translateX(150px) translateY(-18px)}100%{opacity:0;transform:translateX(0)}}
.m-auction-house-sig{display:block;margin:4px 0 0;padding:0;width:280px;max-width:100%;height:80px;background:#fffdf5;border:2px solid var(--ah-ink);border-radius:6px;touch-action:none}
.m-auction-house-sig canvas{display:block;width:100%;height:100%}.m-auction-house-slbox{position:relative;padding:4px 0 2px}
.m-auction-house-sllab{display:block;font-weight:800;font-size:.9rem;margin-bottom:4px;color:var(--ah-cream)}
.m-auction-house-range{width:100%;height:44px;margin:0;background:transparent;-webkit-appearance:none;appearance:none;display:block}
.m-auction-house-range::-webkit-slider-runnable-track{height:14px;border-radius:7px;background:linear-gradient(#a4753a,#6e4a1f);border:2px solid var(--ah-ink)}
.m-auction-house-range::-moz-range-track{height:10px;border-radius:7px;background:linear-gradient(#a4753a,#6e4a1f);border:2px solid var(--ah-ink)}
.m-auction-house-range::-webkit-slider-thumb{-webkit-appearance:none;width:44px;height:44px;margin-top:-17px;border-radius:12px;background:radial-gradient(circle at 35% 30%,#f3d58a,var(--ah-brass) 60%,#8a6a22);border:3px solid var(--ah-ink);box-shadow:2px 2px 0 var(--ah-ink)}
.m-auction-house-range::-moz-range-thumb{width:38px;height:38px;border-radius:12px;background:radial-gradient(circle at 35% 30%,#f3d58a,var(--ah-brass) 60%,#8a6a22);border:3px solid var(--ah-ink)}
.m-auction-house-range:disabled{opacity:.4}.m-auction-house-gm{position:absolute;top:25px;font-size:1.1rem;opacity:.55;pointer-events:none;transform:translateX(-50%);transition:left .5s}
.m-auction-house-trail{position:absolute;top:34px;width:34px;height:34px;margin-left:-17px;border-radius:10px;background:var(--ah-brass);opacity:0;pointer-events:none}
.m-auction-house-trail.m-auction-house-on{animation:m-auction-house-trail .6s ease-out}@keyframes m-auction-house-trail{from{opacity:.55}to{opacity:0}}
.m-auction-house-tender{display:inline-flex;border:2px solid var(--ah-ink);border-radius:8px;overflow:hidden;align-self:flex-start}
.m-auction-house-tb{padding:8px 12px;min-height:44px;background:#e9dcc0;color:var(--ah-ink);border:0;font-weight:800;font-size:.8rem}.m-auction-house-tb[aria-pressed="true"]{background:var(--ah-must)}
.m-auction-house-pscale{min-height:1.4rem;font-size:.95rem;line-height:1.1;display:flex;align-items:center;gap:6px;flex-wrap:wrap;color:var(--ah-cream)}.m-auction-house-pscale small{font-size:.7rem;opacity:.8}
.m-auction-house-pz{position:relative;height:170px;border:2px solid var(--ah-ink);border-radius:8px;background:repeating-linear-gradient(0deg,#8a6234 0 6px,#946c3b 6px 12px);overflow:hidden}
.m-auction-house-eye{position:absolute;left:0;right:0;border-top:3px dashed var(--ah-brass);pointer-events:none;transition:bottom .5s;z-index:1}
.m-auction-house-eye span{position:absolute;right:6px;top:2px;font-size:.7rem;font-weight:800;letter-spacing:.08em;color:var(--ah-cream);background:#2b2118aa;padding:0 4px;border-radius:3px}
.m-auction-house-paddle{position:absolute;left:50%;width:86px;margin-left:-43px;height:150px;padding:0;background:none;border:0;bottom:calc(var(--ah-ph) * 100% - 150px);touch-action:none;z-index:2;transform:rotate(var(--ah-tilt,0deg));transform-origin:50% 100%;transition:bottom .35s ease-out}
.m-auction-house-drag .m-auction-house-paddle{transition:none}.m-auction-house-paddle svg{display:block;width:86px;height:150px}.m-auction-house-spoonem{display:none;font-size:3.2rem;line-height:1.2}
.m-auction-house-spoon .m-auction-house-paddle svg{display:none}.m-auction-house-spoon .m-auction-house-spoonem{display:block}.m-auction-house-droop .m-auction-house-paddle{rotate:12deg}
.m-auction-house-hint{font-size:.7rem;opacity:.85;line-height:1.35}.m-auction-house-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px}
.m-auction-house-link{background:none;border:0;text-decoration:underline;font-size:.75rem;padding:8px 2px;min-height:40px;color:var(--ah-cream)}
.m-auction-house-ledger{position:relative;background:var(--ah-ledger);color:var(--ah-ink);border:3px solid var(--ah-ink);border-radius:12px;box-shadow:4px 4px 0 var(--ah-ink);padding:10px 10px 10px 22px;min-height:420px;display:flex;flex-direction:column;gap:8px;background-image:linear-gradient(90deg,transparent 14px,#e9a6a0 14px,#e9a6a0 16px,transparent 16px)}
.m-auction-house-lhead{font-size:.7rem;font-weight:900;letter-spacing:.08em;color:#8c2f39}.m-auction-house-lh{font-size:1.4rem;font-weight:900;line-height:1.1;overflow-wrap:anywhere}
.m-auction-house-lsub{font-size:.72rem;opacity:.8}.m-auction-house-stamps{position:relative;height:42px}
.m-auction-house-stp{position:absolute;top:2px;border:3px solid;border-radius:6px;padding:0 6px;font-weight:900;font-size:.75rem;letter-spacing:.06em;mix-blend-mode:multiply;opacity:0;transform:rotate(-6deg);background:#fff6}
.m-auction-house-stp.m-auction-house-on{opacity:.9;animation:m-auction-house-slam .3s ease-in}.m-auction-house-stp.m-auction-house-paid{left:0;color:#2f8a63;border-color:#2f8a63}
.m-auction-house-stp.m-auction-house-owing{left:110px;color:#c2453b;border-color:#c2453b;transform:rotate(5deg)}.m-auction-house-stp.m-auction-house-recv{left:0;color:#2f8a63;border-color:#2f8a63;font-size:.7rem;line-height:1.1;max-width:100%}
.m-auction-house-lines{list-style:none;margin:0;padding:0;font-size:.74rem;line-height:1.3;display:flex;flex-direction:column;gap:2px;min-height:6.8rem}
.m-auction-house-lines li{border-bottom:1px solid #2b211833;padding:1px 0;overflow-wrap:anywhere}.m-auction-house-pile{display:flex;flex-wrap:wrap;gap:6px;min-height:50px;align-content:flex-start}
.m-auction-house-pile.m-auction-house-breeze .m-auction-house-env{animation:m-auction-house-wobble .5s 3}
.m-auction-house-env{position:relative;width:48px;height:42px;padding:0;background:#fffaea;border:2px solid var(--ah-ink);border-radius:4px;overflow:hidden}
.m-auction-house-env:before{content:"";position:absolute;left:0;right:0;top:0;border-left:22px solid transparent;border-right:22px solid transparent;border-top:20px solid #e8d9b0}
.m-auction-house-env i{position:absolute;left:50%;top:12px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e85a4f,#9c2a22)}
.m-auction-house-env.m-auction-house-t2 i{background:radial-gradient(circle at 35% 30%,#c0392b,#7a1c14)}.m-auction-house-env.m-auction-house-t3{border-style:double;border-width:4px}
.m-auction-house-env.m-auction-house-t3 i{background:radial-gradient(circle at 35% 30%,#8e2a2a,#4a0e0e)}.m-auction-house-env.m-auction-house-t4{background:#ead7a4;border-style:double;border-width:4px}
.m-auction-house-env.m-auction-house-t4 i{background:radial-gradient(circle at 35% 30%,#5a1a1a,#220606)}.m-auction-house-env.m-auction-house-gold i{background:radial-gradient(circle at 35% 30%,#f3d58a,#a8801f)}
.m-auction-house-drop{animation:m-auction-house-drop .45s ease-out}@keyframes m-auction-house-drop{from{transform:translateY(-40px) rotate(-14deg);opacity:0}to{transform:none;opacity:1}}
.m-auction-house-jig{animation:m-auction-house-wobble .3s}.m-auction-house-more{font-size:.72rem;align-self:center}.m-auction-house-lb{display:flex;flex-wrap:wrap;gap:6px}
.m-auction-house-btn{background:var(--ah-must);color:var(--ah-ink);border:3px solid var(--ah-ink);border-radius:8px;box-shadow:2px 2px 0 var(--ah-ink);padding:6px 12px;min-height:44px;font-weight:800;font-size:.8rem}
.m-auction-house-btn:active{transform:translate(2px,2px);box-shadow:none}.m-auction-house-btn.m-auction-house-mint{background:var(--ah-mint)}
.m-auction-house-cert{border:4px double var(--ah-brass);background:#fffaea;padding:8px;font-size:.78rem;text-align:center;font-weight:700}
.m-auction-house-ov{position:absolute;inset:6px;z-index:6;background:var(--ah-cream);border:3px solid var(--ah-ink);border-radius:10px;box-shadow:4px 4px 0 var(--ah-ink);padding:10px;overflow:auto;animation:m-auction-house-fade .25s;display:flex;flex-direction:column;gap:8px}
.m-auction-house-paper{font-size:.86rem;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere;min-height:5rem}
.m-auction-house-tier1,.m-auction-house-tier2,.m-auction-house-tier3{font-family:"Segoe Script","Comic Sans MS",cursive}
.m-auction-house-tier4,.m-auction-house-tier5,.m-auction-house-tier6{font-family:Georgia,serif;font-variant:small-caps;letter-spacing:.03em}
.m-auction-house-tier7,.m-auction-house-tier8,.m-auction-house-tier9{font-family:Georgia,serif;border:4px double var(--ah-brass);padding:8px}
.m-auction-house-tier10,.m-auction-house-tier11,.m-auction-house-tier12{font-family:Georgia,serif;font-style:italic;background:#ecd9a8;border:4px double #8c2f39;padding:8px;position:relative}
.m-auction-house-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.m-auction-house-sign{font-style:italic;font-size:.8rem;text-align:right}
.m-auction-house-flamst{align-self:flex-start;border:2px solid #c2453b;color:#c2453b;font-weight:900;font-size:.65rem;padding:0 6px;border-radius:4px;transform:rotate(-3deg)}
.m-auction-house-ovbtns{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto}
.m-auction-house-sel{display:block;width:100%;min-height:40px;margin:2px 0 6px;font-size:.82rem;border:2px solid var(--ah-ink);border-radius:6px;background:#fffdf5;color:var(--ah-ink)}
.m-auction-house-fp{max-height:150px;overflow:auto;border:1px solid #2b211844;padding:6px;font-size:.78rem;line-height:1.4}
.m-auction-house-banner{position:absolute;left:8%;right:8%;top:30%;z-index:7;background:var(--ah-must);color:var(--ah-ink);border:4px solid var(--ah-ink);border-radius:10px;box-shadow:5px 5px 0 var(--ah-ink);padding:12px;text-align:center;font-weight:900;font-size:1.2rem;letter-spacing:.06em;transform:rotate(-2deg);display:none}
.m-auction-house-banner.m-auction-house-on{display:block;animation:m-auction-house-slam .5s ease-in}
.m-auction-house-banner.m-auction-house-away{display:block;transition:transform 1s,opacity 1s;transform:rotate(80deg) translateY(160%);opacity:0}
.m-auction-house-dim{position:absolute;inset:0;z-index:5;background:radial-gradient(circle at 50% 30%,#0000 0,#000d 70%);opacity:0;pointer-events:none;transition:opacity 1.2s}
.m-auction-house-closed .m-auction-house-dim{opacity:1}.m-auction-house-closed .m-auction-house-lamp2{display:block}
.m-auction-house-lamp2{position:absolute;left:50%;top:-4px;z-index:6;font-size:1.4rem;display:none;transform-origin:50% 0;animation:m-auction-house-lampsw 3s ease-in-out infinite}
@keyframes m-auction-house-lampsw{0%,100%{rotate:-12deg}50%{rotate:12deg}}.m-auction-house-freeze{filter:grayscale(.8) brightness(.7)}
.m-auction-house-rain{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:hidden}
.m-auction-house-rain span{position:absolute;top:-30px;font-size:1.3rem;animation:m-auction-house-fall 3s linear forwards}
@keyframes m-auction-house-fall{to{transform:translateY(380px) rotate(200deg)}}.m-auction-house-dimboard{opacity:.35;transition:opacity 1s}
@media (max-width:520px){.m-auction-house-dg{width:26px;height:38px;font-size:1.5rem;line-height:34px}.m-auction-house-sbody{margin:0 8%}.m-auction-house-curt{width:8%}.m-auction-house-hollis{width:96px}.m-auction-house-pz{height:150px}}
.pm-reduce-motion .m-auction-house-root *{animation:none!important;transition:none!important}
@media (prefers-reduced-motion:reduce){.m-auction-house-root *{animation:none!important;transition:none!important}}
`, 'css-auction-house');
  P.addAchievements([
    { id: 'auction-house.paddle', name: 'The Most Honourable Order of the Raised Paddle', desc: 'Won your first lot, for exactly 1 Meh more than you had.', icon: '🔨', reward: 1 },
    { id: 'auction-house.chancellor', name: 'Grand Chancellor of Outstanding Balances', desc: 'Reached an IOU of 10. It is a respectable figure for a person with 0.', icon: '📜', reward: 3,
      check: function (s) { return (s['auction-house.iou'] || 0) >= 10; } },
    { id: 'auction-house.duke', name: 'Duke of the Unreturned Apology', desc: 'Opened 10 apology envelopes. All 10 were sorry. All 10 were sorry again.', icon: '📨', reward: 3,
      check: function (s) { return (s['auction-house.letters'] || 0) >= 10; } },
    { id: 'auction-house.russet', name: 'Sovereign Keeper of Lot 7 1/2', desc: 'Witnessed Gerald buy back his uncle\'s sack with 7 and a half potatoes, the half being across the hall.', icon: '🥔', reward: 5 },
    { id: 'auction-house.vegetable', name: 'Debtor to a Vegetable', desc: 'Had your IOU sold to Gerald for three potatoes. The vegetable is understanding.', icon: '🥔', reward: 3 },
    { id: 'auction-house.signature', name: 'Lawful Seismograph', desc: 'Signed for the Stamp Committee. It resembled a seismograph having feelings.', icon: '🖋', reward: 2 },
    { id: 'auction-house.reply', name: 'Correspondent of the Second Order', desc: 'Sent a reply. It was Accepted. It was Not Accepted.', icon: '📧', reward: 2 },
    { id: 'auction-house.owner', name: 'Freeholder of a Room (Technically)', desc: 'Won the Auction House. The key opens the same room.', icon: '🔑', reward: 10 },
    { id: 'auction-house.silence', name: 'Emperor of the Glorious Silence', desc: 'Let the Silence win a lot by not bidding for 30 seconds. It paid in quiet.', icon: '🔇', secret: true, reward: 5 },
    { id: 'auction-house.fan', name: 'Supreme Ceiling Fan of the Seven Kingdoms', desc: 'Raised the paddle 25 times in 4 seconds and was filed under "ceiling fan".', icon: '🌀', secret: true, reward: 5 },
    { id: 'auction-house.struck', name: 'Marshal of the Tiny Gavel', desc: 'Struck the gavel 7 times. A smaller gavel was called in for the half.', icon: '🔨', secret: true, reward: 7.5 },
    { id: 'auction-house.exact', name: 'The Rt. Hon. Exactly 7 1/2', desc: 'Bid exactly 7 1/2. For one lot, the House was fair. It has since apologised.', icon: '⚖', secret: true, reward: 7.5 },
    { id: 'auction-house.window', name: 'Keeper of the Competent Plant', desc: 'Looked through the window at the Lobby plant for exactly 2 seconds.', icon: '🌿', secret: true, reward: 3 },
    { id: 'auction-house.torn', name: 'Notary of the Torn Tuesday', desc: 'Lifted the cloth on Lot 14. The Tuesday was already torn off.', icon: '📅', secret: true, reward: 3 },
    { id: 'auction-house.exit', name: 'Inspector General of the Exit Sign (One More)', desc: 'Pressed the exit sign 7 times. On the seventh it said EXIT (this one) for one blink. The fire marshal was not told.', icon: '🚪', secret: true, reward: 5 },
    { id: 'auction-house.vigil', name: 'Night Warden of the Closed Hall', desc: 'Sat in the dark, untouched, for five minutes in all. A caretaker mopped around you as though you were a lot.', icon: '🌙', secret: true, reward: 5 },
    { id: 'auction-house.recount', name: 'Outbid by an Absence', desc: 'Won three lots in a row by doing nothing. The House tried to bid against you and could not find the person.', icon: '🙊', secret: true, reward: 5 },
    { id: 'auction-house.service', name: 'Ten Years\' Service Pin (Ten Minutes)', desc: 'Stayed ten minutes and was pinned by a man standing on no lectern. The pin says TEN. It does not say ten what.', icon: '🎖', secret: true, reward: 5 }
  ]);

  /* ---------- line banks (12.B to 12.O). Tokens: {count} {meh} {item} ---------- */
  P.addLines('m:auction-house:mgmt', [`Valued Employee, you have won again. Management is processing the word "again" with something like pride.`, `Management notes you now own {count} lots. Management has not seen them. Management trusts the crates.`,
    `Per my previous message, you owe 1 Meh more than you have. This is a very good deal, and a very good deal of owing.`, `Management would like to bid, but Management is not permitted a paddle after the Incident. The Incident was a paddle.`,
    `Circling back to Lot 3: it was stairs. It is still stairs. We have the receipts.`, `Management has reviewed your bidding strategy. It has a beginning, a middle, and a clerk who corrects the middle.`,
    `Winning is voluntary. Management has looked for the other option. The other option is also winning, but with a form.`, `Your paddle is performing well. Its stick is performing better. Management has made a note of both.`,
    `Participation has been recorded at the participation rate, a number that has never once been asked how it feels.`, `Management would like to remind you that every lot is final, including the ones that have not happened yet.`,
    `Management has never won an auction. Management is not being modest. The paddle has always been very heavy.`, `Going forward, all winning will be conducted at 1 Meh more than you have. This is not a change. It is a reminder of a change that did not happen.`,
    `Management has been asked whether the lots are real. Management has been asked this by the lots.`, `Per policy, {count} lots is a collection, and a collection is a hobby. You now have a hobby. HR has been told and is thrilled for you.`,
    `Management did not laugh at Lot 5. Management coughed. The cough had an agenda item.`, `The crates holding your {count} lots are in the Lobby, next to Dennis. Dennis has asked that the crates stop leaning on him.`,
    `Management is not worried about the IOU. Management is worried about the tone of the IOU, which has begun to hum.`, `Auction rule one: there is no rule two. Rule two was Sandra, and she has been reassigned to rule one.`,
    `Management thanks you for your bids, the clerk for his corrections, and itself for the thanking.`, `You are the highest bidder in a room of one. The room has requested a recount. The recount was also you.`]);
  P.addLines('m:auction-house:chant', [`I have four, four, I have four, four-and-a-nothing, nothing-and-a-quarter, a quarter-of-a-sneeze, do I hear a sneeze, sold to the paddle.`, `Who'll give me twelve, twelve for the glass, twelve-and-one, and one, and one more, I have one more, I always have one more.`,
    `Seven, seven and a half, seven and a half and one, and one, and one for the gavel, and one for the gavel's cousin, and one.`, `I have nine from the back, nine from nobody, nine and one from the front, nine and one and one, thank you, sir, who is not here.`,
    `Three, three, I have three, three-and-a-bit, three-and-a-bit-more, three and a thing I will not say aloud, and one.`, `Fifty, fifty, who'll say fifty, I have forty-nine and one, and one, and one, that is fifty, that is also one more.`,
    `Do I hear two, I hear two, I hear two from a gentleman, I hear two from the gentleman's hat, two and one, and one, and one.`, `Eleven, eleven, I'll take eleven in any condition, eleven and one, eleven and a lie-down, eleven and one, thank you.`,
    `Six, six and a pause, six and a pause and one, I have six and one and a pause and one, nobody breathe.`, `A hundred, a hundred, I have a hundred in my mind, a hundred and one in my notes, and one, and one, going to the paddle.`,
    `Twenty, twenty, twenty-and-one, twenty-and-one-more, a very good twenty, one of the better twenties, and one.`, `Eight, eight, eight-and-a-half, eight-and-a-half-and-one, and one, and one, I have eight and one and everything, and one.`,
    `Thirty, thirty, who'll say thirty, I have thirty-one in my sleeve, thirty-one and a sleeve, and one for the sleeve, and one.`, `Nineteen, nineteen, a good number to be near, nineteen and one, nineteen and one's brother, and one.`,
    `Four hundred, four hundred, I have it from a man in the lift, the lift is not here, the man is, and one, and one.`, `Two and a half, two and a half, I have two and a half and the half is shy, coax the half, thank you, and one.`,
    `Ninety, ninety from the window, ninety from the view that is not included, and one, and one, and one for the draught.`, `A thousand, a thousand, in small bills, smaller bills, bills the size of a thought, and one, and one for the thought.`]);
  P.addLines('m:auction-house:whisper', [`one... and one... and one, thank you, softly.`, `a quiet two, a quieter two, a two nobody heard, and one.`,
    `shh-eight, shh-eight-and-a-half, and one, and one, thank you.`, `one for the cushion, and one for the cushion's friend, and one.`,
    `shh-nine, nine for the radiator, and one, and one, thank you, radiator.`, `a three, a small three, raised in a library, and one.`,
    `one... and one... please do not clap, the clapping has been sold.`, `a six, spoken into a sleeve, and one, and one, and the sleeve.`]);
  P.addLines('m:auction-house:going3', [`GOING THREE-AND-A-THIRD`, `GOING TWICE-AND-A-BIT`, `GOING THURSDAY`, `GOING, AS PREVIOUSLY ANNOUNCED`, `GOING TWICE (AMENDED)`, `GOING, WITH FEELING`, `GOING TO A GOOD HOME`, `GOING, GOING, GONE-ISH`]);
  P.addLines('m:auction-house:hammer', [`Going once. Going twice. Going to be fine. Gone.`,
    `Sold! To the paddle of {player}, for exactly 1 Meh more than you have. Congratulations on your thoroughness.`,
    `The price is {meh} Meh and one. The one is for the gavel.`, `Sold for {count} Meh. Whatever you bid, this is the number. Your bid was a courtesy, and has been thanked.`,
    `Hammer. {count} Meh. The room applauds the way a room does, which is by being one.`, `{count} Meh. Going, going, yours. The House skipped "gone" to save you the wait.`,
    `Sold, {count} Meh, subject to Sandra, who has not seen it and is already against it.`, `Per my previous message: you have won. Please do not interpret the word "won" narrowly.`,
    `Sold. The hammer is pleased. The hammer asks to be left alone with the lot.`, `Sold, {count} Meh, to the bidder already holding the lot. The lot did not expect to be wanted and is taking it well.`,
    `{count} Meh. That is {meh} Meh and the tip. The tip is also a Meh. The tip is the entire business model.`, `Sold at {count}. The room rises to its feet. One of them is Hollis. The rest are chairs that were already up.`,
    `Gone. The echo lasted 0.7 seconds, a house record. The previous record was also 0.7 seconds.`, `Sold for {count} Meh. The previous owner has been informed by letter and bicycle.`,
    `Gone, for {count}. Hollis would like it noted that he said "gone" first and the gavel agreed second.`, `Sold. A hush, and then the specific hush of a room that was never in the running.`,
    `{count} Meh, and the hammer comes down the way a decision does: eventually, and onto the nearest thing.`, `Sold, at {count}. This is your lot. The lot has been told, in writing, in advance, in a small font.`]);
  P.addLines('m:auction-house:hammerSoft', [`Sold, very quietly, to the person trying their best.`, `Sold. The word was mouthed. The room mouthed it back.`,
    `Sold, in a whisper. The whisper has been filed under Weather.`, `Sold. The cushion is satisfied. It said "oh" and meant it.`,
    `Sold, silently. The word went round the room on tiptoe and still got there first.`, `Sold. Hollis mouths the number. Someone mouths "that's a lot". Hollis mouths "yes".`,
    `Sold, in the quietest voice available, which belongs to the cushion.`]);
  P.addLines('m:auction-house:early', [`Early raise accepted, with a note.`, `A raise before the third call. Bold. Noted in pencil, so it may be reconsidered.`,
    `The paddle goes up. The room goes "oh". The room is Hollis, doing both.`, `Early raise. The clerk wrote "early", crossed out "raise", and wrote "enthusiasm".`,
    `Paddle up before the third call. Hollis stops the chant to be sure, then resumes it faster, out of embarrassment.`, `An early bid. The rest of the room has been instructed to be surprised, and has begun.`]);
  P.addLines('m:auction-house:still', [`A bid of stillness has been received. It is the quietest bid of the day and has been accepted as such.`,
    `You did not raise a paddle. The House has read this as a raise. The House is generous with its reading.`,
    `Silence is a bid in this house. This one was seconded by the radiator.`, `No paddle. The House counts a stillness as a firm bid, and this was firm. You could stand a lamp on it.`,
    `You bid nothing at great length. It has been accepted at great length.`, `A bid of stillness. Hollis calls it "the one with the posture".`]);
  P.addLines('m:auction-house:paddleLow', [`The paddle is below the eyeline. It is a question, not a bid. Questions are accepted as bids.`, `A paddle at that angle is a rumour of a bid. The House has heard the rumour.`,
    `The paddle did not reach the eyeline. It reached the knee. Hollis has recorded a knee.`, `That was a wave, not a bid. A wave is a bid with its coat on. The House has taken the coat.`]);
  P.addLines('m:auction-house:paddleFlam', [`A flamboyant paddle. The clerk will print the apology in a larger font.`, `Flamboyant. The next envelope has been told. It is nervous.`,
    `Flamboyant. The paddle went up so high it was briefly in another department.`, `The paddle rises like a flag in a country of one. The clerk moves to a larger font and a firmer chair.`]);
  P.addLines('m:auction-house:paddleLate', [`The paddle was raised after the hammer fell. This is a Late Bid. It has been placed in a drawer. The drawer is a plate.`,
    `Late Bid received. It has been placed in the drawer with the other late bids. They are getting along.`,
    `Late Bid. The hammer has fallen and cannot be asked to rise again. It has a back, and a reputation.`, `A Late Bid has been filed under "Eager", beside the Late Bids filed under "Not Even Trying".`]);
  P.addLines('m:auction-house:clerk', [`Clerk's correction: your bid has been amended to exactly 1 more than you have. Initialled, R. Pen (+1).`,
    `Clerk's correction: noted, amended, initialled. R. Pen (+1) has a very small pen and a very large conscience.`,
    `Amended in red. R. Pen (+1) asks that nobody call it "a mistake". It is "a correction with a past".`,
    `R. Pen (+1) amends the figure, blows on it, and files it with the other figures that were also wrong.`,
    `Correction entered. The pen is small, so the correction is small, but it is also final, which is large.`,
    `Your bid has been replaced with a bid that is more like you, if you owned a ledger, and a better pen.`, `Struck through and initialled. The strike is in red. The initials are in a different red.`]);
  P.addLines('m:auction-house:over', [`Overbid by {count}. Corrected downward until it was 1 over, which is the correct amount of over.`,
    `Your bid exceeded the permitted exceeding. It has been brought back, firmly, by {count}.`,
    `Overbid by {count}. The clerk has trimmed it, as one trims a hedge, for the neighbours.`,
    `Overbid by {count}. The extra has been returned to you in an envelope that is not addressed to you.`,
    `You exceeded by {count}. The clerk has taken the excess and put it somewhere cooler.`, `Overbid by {count}. A figure that ambitious needs a chaperone, and the chaperone is 1.`]);
  P.addLines('m:auction-house:under', [`Underbid. Raised to exactly 1 more than you have, in the spirit of fairness.`, `Your bid was modest. The House has been generous on your behalf, against your wishes.`,
    `Underbid by {count}. The clerk has corrected the modesty. The modesty will be returned in a plain envelope.`,
    `Underbid by {count}. The clerk covered the difference from his own pocket, which is a ledger.`,
    `Your bid was {count} short of the number it was always going to be.`, `A cautious bid. The House respects caution and has corrected it, respectfully, like a hat.`]);
  P.addLines('m:auction-house:exact', [`A bid of exactly your balance has been received. It is moving. It has been corrected upward by one, as a courtesy.`,
    `Exact. The clerk is moved. The clerk moves it up by one, to avoid a scene.`,
    `Your bid and your balance are the same. The clerk has taken off his glasses to look at them separately.`,
    `Exact. No correction needed, which has been corrected. It is now needed, by 1.`,
    `You bid your balance. This is rare, like a bus that arrives on the day it said it would. Plus 1.`]);
  P.addLines('m:auction-house:wallet', [`Your wallet was inspected, not touched, and handed back with a small bow.`, `The wallet has been held up to the light, admired, and returned. Nothing was taken. A note was left.`,
    `Your wallet went to the clerk and came back. It is slightly warmer. It has seen things.`, `Wallet inspection complete. Contents: all. Condition: yours. Fee: 1 Meh more than you have, in principle.`,
    `The wallet was passed hand to hand along the front row, admired by each, and returned with its feelings intact.`,
    `Your wallet has been inspected, found to be a wallet, and given a stamp that says so.`, `Wallet returned. It looks the same. It carries itself differently.`]);
  P.addLines('m:auction-house:view', [`Viewing complete. A viewing fee has been waived, and a note has been made that it was waived.`, `You have viewed the lot. The lot has viewed you back, politely.`,
    `Viewing Fee waived. It was 0 Meh. We waived it anyway, with feeling.`, `Viewing concluded. The lot asked how it did. We said "present".`,
    `You have viewed the lot. The lot has been reassured that this is normal and happens to all lots.`, `Viewing fee: nil. Handling fee: nil. Fee for looking at the nil: nil, with a stamp.`]);
  P.addLines('m:auction-house:envelope', [`A new envelope has landed on the pile. It is sorry. It is very sorry. It will not say about what.`, `Another envelope. The pile shifts to make room, the way a pile does, by apologising.`,
    `An envelope has arrived. It has been steamed open by the apology that came before it.`, `Another envelope. It landed face-down, from shame.`,
    `A new apology has arrived by bicycle. The bicycle is also sorry. It has a bell and has not rung it.`, `Envelope delivered. The wax is sincere. The wax is at an angle.`]);
  P.addLines('m:auction-house:reply', [`Your reply has been received. It has been accepted. It has not been accepted. Two envelopes are on their way, apologising for the reply.`,
    `Received (Accepted) (Not Accepted). The office is sorry that it cannot choose.`,
    `Your apology has been received and answered. The answer is an apology about your apology. It is on its way, in a nice hat.`,
    `Reply logged. It was thoughtful, and an envelope has been dispatched to say so, and a second to apologise for the first.`]);
  P.addLines('m:auction-house:pay', [`Paid in full: 1 Meh. The payment has been received, inspected, and returned. You now owe exactly 1 Meh more than you have.`,
    `PAID IN FULL. 1 MEH OWING. Both stamps are correct. The ledger has been asked not to choose.`,
    `Your wallet went to the cashier and came back. The cashier gave a small bow. Nothing was taken. 1 Meh is owing.`,
    `PAID IN FULL (1 MEH OWING). The cashier initialled both with the same pen. He seems fine.`,
    `Settlement: nothing was taken, half was forgiven, the other half is owed. The cashier calls this "even".`,
    `You have paid in full and now owe in full. The cashier says this is the correct amount of full.`]);
  P.addLines('m:auction-house:award', [`Paddle Participation: {count} Meh. It is an amount. It has been given to you, and it is still an amount.`, `{count} Meh for taking part. Taking part was the whole of it. The Meh is aware.`,
    `Participation award of {count} Meh, issued by a committee that met in a hallway.`, `{count} Meh, for the paddle. The paddle will not see any of it.`,
    `{count} Meh, presented in a small envelope that has been to a better award.`, `Paddle Participation: {count} Meh. Hollis shakes your hand through the lectern.`,
    `{count} Meh, awarded by a jury of one clerk and his pen.`]);
  P.addLines('m:auction-house:gletters', [`Dear Valued Employee, Gerald is sorry about the potato. It was a large potato. It was his best one.`, `Dear Valued Employee, Gerald would like it known that the vegetable is understanding.`,
    `Dear Valued Employee, you owe a vegetable. The vegetable has asked to be addressed as Sir.`, `Dear Valued Employee, Gerald has planted your IOU. Nothing has sprouted. He is being patient. So is the IOU.`,
    `Dear Valued Employee, Gerald has stored your IOU in a root cellar. It is cool there. It is, he says, "ready when you are".`,
    `Dear Valued Employee, Gerald asks that you stop apologising to him. He is a potato. He does not know what to do with his face.`,
    `Dear Valued Employee, the vegetable has reviewed your account and finds you in order, which is not the same as in credit. Gerald.`]);
  P.addLines('m:auction-house:geraldOut', [`I have been outbid by a number. The number was your wallet.`, `Gerald raises a paddle. Gerald lowers it. The lowering was also a bid.`,
    `"One more than I have," says Gerald. "It is a good number to be near."`, `Gerald lowers his paddle. A potato lowering a paddle is a long afternoon.`,
    `"I was outbid by a feeling," says Gerald. "It was a large feeling. It had a clerk."`, `Gerald has asked to be outbid more slowly. The auctioneer says he will see what the budget allows.`]);
  P.addLines('m:auction-house:rate', [`Today's rate: 1 potato = 0.4 Meh before lunch, 7 1/2 Meh after a stern talk.`, `The potato is up 7 Meh on a rumour of Wednesday.`,
    `Potato rate adjusted for mood. Mood: reluctant.`, `Potato rate at close: 7 Meh and a handshake. The handshake has been devalued.`,
    `Today's rate is a rumour with a decimal point. Do not rely on the point.`, `The potato has fallen to 0.4 Meh. The potato is "fine with it". The potato is not.`]);
  P.addLines('m:auction-house:weatherItems', [`Gerald's bid, two potatoes (light drizzle)`, `A mild front of apologies`, `Sandra's objection (light drizzle, with a chance of Tuesday)`,
    `One (1) cloud, withdrawn`, `A feeling shaped like potatoes`, `The half of a potato, across the hall`, `One (1) drizzle of apologies, light`, `Hollis's second hat (sunny intervals)`,
    `A forecast of Tuesday, 80%`, `Dennis (Plant)'s review, partly cloudy`, `The sound of a spoon being raised`, `A low front of paperwork moving in from the clerk`]);
  P.addLines('m:auction-house:cameo', [`Dennis (Plant) raised a leaf. Dennis (Plant) won nothing. Dennis (Plant) was already thriving.`, `Sandra's paddle floats up, unattached. It has been flagged as unattached.`,
    `The Toaster bids two slices. The auctioneer has accepted it as a warm gesture.`, `The Toaster bids three slices. It has never bid higher. It has also never bid lower. It is toast.`,
    `A silent sprout appears at the end of the track and outbids Gerald, with no sound. Nobody hears it. It is very clear.`, `Sandra from Compliance wishes it recorded, again, that Lot 5 was "too meeting". The lot is not present. The objection has made the journey anyway.`,
    `The Toaster bids four slices and then, quietly, a fifth. The fifth is an apology. It is warm.`, `Dennis (Plant) turns toward the lamp. The lamp turns toward Dennis (Plant). Nobody else is invited.`,
    `Sandra's paddle drifts over the front row and stops above you for a while. It is a review. It is in pencil.`, `A bid arrives from the third row. There is no third row. It is accepted on principle, and the principle is Sandra's.`]);
  P.addLines('m:auction-house:remark', [`I once sold a fire. It was lit. I sold it lit. We did not discuss the carpet.`, `I used to be a ferry timetable. I was very good. Nobody wanted to hold me.`,
    `I have been an auctioneer for eleven years. I have been asked to repeat myself for none of them.`, `The lectern has a name. I will not say it. It would only encourage it.`,
    `Sometimes I sell a lot and the room is so quiet I can hear the lot.`, `There is a drawer in this lectern. I do not open it. It knows.`,
    `My mother wanted me to be a dentist. I said I would sell teeth. She said that is a dentist. I said no.`, `I have a rule: I never say a number I have not heard first. The numbers have noticed. They come to me now.`,
    `The gavel is walnut. The handle is a retired broom. Together they are my family.`, `When I say "sold" I mean it with my whole stomach. It is a short word and I give it everything in the building.`]);
  P.addLines('m:auction-house:heckle', [`Please do not touch the staff.`, `The staff is a man. His name is Hollis.`, `Hollis pats himself down, then pats the lectern, to be safe.`,
    `Hollis has been touched. He permits this on Tuesdays. It is not a Tuesday. He is permitting it anyway.`, `You are poking the auctioneer. He has made a note in the margin of the next lot.`,
    `That tickles. Hollis would like it recorded that he is not laughing, and that he is on a lectern.`, `Hollis straightens his hat. The hat was straight. It has been re-straightened to prove a point to the hat.`]);
  P.addLines('m:auction-house:gavel', [`The gavel has been touched. It wishes to be asked first.`, `The gavel is not for pressing. It has been told. It was pressed.`,
    `The gavel rests. The gavel was not resting.`, `The gavel considers falling. It is sold to the idea.`,
    `The gavel was struck on nothing, in general. The air has accepted the blow.`, `Please do not rehearse the gavel. It has stage fright and loses its place in the sale.`,
    `You have addressed the gavel. The gavel has addressed you back, by not moving, with emphasis.`, `The gavel was struck for no lot. It is entered as Lot "Unspecified" and sold to you at the usual rate.`]);
  P.addLines('m:auction-house:sig', [`Signature accepted. It resembles a seismograph having feelings. Legally, that is a name.`, `Signature accepted. It is a mountain range with ambitions. Legally, that is a name.`,
    `Signature accepted. It resembles a heartbeat that has been to a meeting. Legally, that is a name.`, `Signature accepted. It is the outline of a nervous country. Legally, that is a name.`,
    `Signature accepted. It is the last twelve seconds of a hurry. Legally, that is a name.`]);
  P.addLines('m:auction-house:gletter2', [`Dear Hollis, you owe us nothing. Sorry, wrong ledger. Yours, still.`]);
  P.addLines('m:auction-house:idleNudge', [`Is the bidder thinking? Hollis will wait. Hollis has waited for worse. Hollis once waited for a Thursday.`, `Hollis taps the microphone. It was not on. He taps it again, to see if it has heard.`,
    `The room looks at you. The room has no eyes. The room has made the effort anyway.`, `"Silence is a form of bidding," says Hollis, in the voice of a man reading it off a card.`]);
  P.addLines('m:auction-house:idleBid', [`The silence has bid. It has been accepted. It is the first bid all day with no hand in it.`, `A paddle has been raised by nobody. It is a good paddle. Nobody is holding it well.`,
    `The silence bids. It has never bid before. It is shaking slightly, in a way you cannot hear.`]);
  P.addLines('m:auction-house:idleSay', [`Management notes the bidder has stopped bidding. The Silence has stepped in. It was waiting in the wings, quietly, its only way.`,
    `Management would like to say something encouraging. Management has an encouraging thing. It is a long pause. Here it is.`,
    `Management is not alarmed that you stopped. Management has filed the stopping under "a bid, in the future tense".`]);
  P.addLines('m:auction-house:chase', [`Price has been adjusted for your enthusiasm.`, `The board has noticed your balance and is catching up, out of breath.`, `Price adjusted. The board does not like to be seen running.`,
    `The price has been adjusted to match your recent behaviour, which it has been following.`, `The nixie tubes are counting up to you. They are not happy about the stairs.`]);
  P.addLines('m:auction-house:card', [`The lot has been viewed. It has been viewed so often that it has gone slightly shy.`, `Viewing is limited to once per lot. The lot has asked for a lawyer, who is also the lot.`,
    `Please stop looking at the lot. It has begun to look back, which is against the lot's contract.`, `The lot has been handled enough. A small sign has gone up: "ENOUGH, FROM THE LOT".`]);
  P.addLines('m:auction-house:idleDrift', [`A clock somewhere is correct, briefly, by accident. Nobody is present to be disappointed.`, `The curtains move in a draught that does not exist. The House blames the curtains. The curtains blame the House.`,
    `Dennis (Plant) has grown a quarter of an inch since you stopped. He is not saying anything. He is making a point in chlorophyll.`, `Somewhere a gavel is being practised, softly, in the dark. Nobody will say whose.`,
    `The envelope pile shifts, as if a very small apology had turned over in its sleep.`, `Gerald has held the same paddle for so long that it has become a handshake.`,
    `The silence is still winning. It is not gloating. It never learned how.`, `The exit sign hums EXIT (one more). It has hummed it for a while. It means it more every minute.`]);
  P.addLines('m:auction-house:idleBack', [`Welcome back. We started without you. You won everything.`, `You are back. The chairs are coming down one at a time, with the dignity of chairs that were not told.`,
    `Welcome back. The lights are on. Nobody will say who put them out. It was a man. He is somewhere.`]);
  P.addLines('m:auction-house:idleBack2', [`You are back. Hollis has stopped pretending he was not waiting. The chairs have not come down. They are watching.`, `Welcome back. The caretaker has put his mop away and bowed. He believed you were a lot. He is relieved.`,
    `You stayed. The House notes it, and has requested a small plaque, and has not been able to think what it should say.`]);
  P.addLines('m:auction-house:spamWave', [`Sir. Sir. SIR. This is a paddle, not a fly swatter, though we do sell one. It is Lot 17 and a bit.`, `Twelve raises in three seconds. The House admires the rhythm and would like it to stop in the same breath.`,
    `The paddle is warm. Hollis can feel it from the lectern. Please give the paddle a minute with its thoughts.`, `The clerk has stopped correcting your bid and begun correcting your posture.`,
    `A paddle is raised once per lot, the way a flag is raised once per country. You are raising a small nation.`]);
  P.addLines('m:auction-house:spoon', [`Your paddle has been replaced with a spoon. Please raise the spoon calmly.`, `The spoon is raised. Bid accepted. Soup is not included.`,
    `The spoon is raised to a height the clerk can only call "a pour".`, `Spoon bids carry no weight, but they carry a little. The clerk is weighing it.`,
    `The spoon is the same size as the paddle's confidence. Hollis is accepting both.`, `Please do not stir the room. The room is not ready to be stirred.`]);
  P.addLines('m:auction-house:surch', [`Enthusiasm surcharge: 1 Meh more than you have, plus a sincere breeze.`, `Enthusiasm surcharge: nothing, itemised across four pages.`,
    `Surcharge applied: you owe 1 Meh more than you have, plus a ceiling.`, `Surcharge noted. It has been added to the bill, which is a feeling.`]);
  P.addLines('m:auction-house:heads', [`Every head in the gallery turns, slowly, toward the breeze. Dennis (Plant) leans into it.`, `The whole gallery faces the ceiling. Gerald is the only one who looks like he has been here before.`]);
  P.addLines('m:auction-house:spret', [`The paddle is returned. It has been polished. It has forgiven you, in a tone.`, `Your paddle is back. It is a little dizzy. It has questions about the spoon.`,
    `The paddle has returned from the spoon. It does not wish to talk about the spoon.`]);
  P.addLines('m:auction-house:exit', [`The exit sign lights up, thinks it over, and stays an exit sign. Leaving is available, one more at a time.`, `The sign says "EXIT (one more)". The door under it says "one more" as well. The door is very consistent.`,
    `You have asked about the exit. The House has put you down as "exiting soon", which is a status.`, `Pressing the exit sign does not exit. It exits a little. A tiny you went out through it and came back with a sandwich.`,
    `The exit is one more away. It was one more away yesterday. It is a patient exit, in the way of exits.`, `An usher in a green coat checks the sign, agrees with it, and leaves through the one more.`]);
  P.addLines('m:auction-house:contlot', [`The Auction House is now a lot. Do I hear a paddle? You do. You hear it every time.`,
    `Management notes the House has now been won twenty lots in a row, again. This is called a pattern. This one has a lanyard.`]);
  P.addLines('m:auction-house:absentee', [`While you were away, {count} lots sold to you by proxy, to a proxy, who is also you.`, `Paddle 0 (proxy): the ledger is full of you. It is very thorough.`,
    `+1 Meh, for presence. You were not present. The Meh recognises the gesture.`, `In your absence a chair raised its hand {count} times. The chair has been thanked and moved to the corner.`]);

  /* ---------- ordered tables ---------- */
  /* [label, name, blurb, view caption, emoji] ; idx 1..24 */
  const LOTS = [
    ['1', 'A slightly used Wednesday', 'Minor wear on the afternoon. Sold without its lunch.', 'VIEWING: a Wednesday, mostly afternoon. Some Thursday has got in around the edges.', '📅'],
    ['2', 'One (1) window', 'View not included. Frame, glass and a sincere intention. The view is being retained by the seller.', 'VIEW (SEE PREVIOUS OWNER)', ''],
    ['3', 'Seven and a half stairs', 'Collected over a long weekend. Handrail sold separately, for emotional reasons.', 'VIEWING: the stairs go up. You are told this is optional.', '🏛'],
    ['4', 'One (1) sigh', 'Previously owned by a regional manager. Gently used. Slight echo of a Q3.', 'VIEWING: a sigh, displayed in a jar with air holes. It has been exhaling for some time.', '😮'],
    ['5', 'A meeting that could have been an email', 'The email is sold separately and has not been written.', 'VIEWING: a meeting, held at a distance. Nothing is decided. It is very well attended.', '📧'],
    ['6', 'The colour between Tuesday and beige', 'Please do not name it. It has been named twice already.', 'VIEWING: a swatch. It looks the way a Tuesday would, if a Tuesday had to look like something.', '🎨'],
    ['7', 'A box', 'Contents: Lot 7 (smaller box). Please open it. The box has been very patient.', '', '📦'],
    ['8', 'A firm handshake from 1994', 'Hand not included. The hand moved to a smaller department.', 'VIEWING: a handshake, held at arm\'s length. It is still firm. It is waiting for the hand.', '🤝'],
    ['9', 'Seventeen minutes', '4:17 PM, near the third ficus. Minutes may not be spent in any order.', 'VIEWING: seventeen minutes, laid end to end. They reach the third ficus and stop.', '🕓'],
    ['10', 'A very good echo', 'Comes back every time. Comes back slightly wiser.', 'VIEWING: a very good echo. It has been asked to wait quietly. It is the best at that.', '📣'],
    ['11', 'One (1) left sock', 'Whereabouts unknown. Sold as "on a journey". The journey is ongoing.', 'VIEWING: a sock, but only its shadow. The sock is on a journey. The shadow stayed behind to keep its place.', '🧦'],
    ['12', 'The last word in an argument', 'Nobody remembers the argument. The word is "regardless".', 'VIEWING: the last word, in a small frame. It is "regardless". It has always been regardless.', '💬'],
    ['13', 'A reasonable doubt, in a jar', 'Seal intact. Do not shake it in front of juries.', 'VIEWING: a doubt, in a jar. It is reasonable. It is looking at you reasonably.', '🏺'],
    ['14', 'A Tuesday (reserve not met)', 'Offered under a cloth. The reserve is a gentleman and will not be rushed.', 'VIEWING: a cloth, over a podium, over a Tuesday. The reserve has not been met since the Pleistocene.', ''],
    ['15', 'Half a silence', 'The other half is in the Lobby, being awkward.', 'VIEWING: half a silence. The room agrees it is the better half.', '🔇'],
    ['16', 'A tasteful amount of fog', 'Pre-owned by a lighthouse. Light sold separately; the fog has never needed it.', 'VIEWING: fog. You can see it clearly. This is considered a defect.', '🌁'],
    ['7 1/2', 'A sack, empty, with feelings', 'Formerly the property of Uncle Russet. Last seen holding something warm.', 'VIEWING: a sack. It is empty. It is not empty of everything.', '🎒'],
    ['17', 'A sealed envelope containing the previous lot', 'Seal reads "Do not look back". Please look back.', 'VIEWING: an envelope. Through the paper, faintly, a sack.', '📨'],
    ['18', 'The next lot', 'Viewing is available after the next lot.', 'VIEWING: not yet. Viewing is available after the next lot. The next lot is available after this one.', '🔜'],
    ['19', 'Your IOU, lightly accrued', 'Condition: clutched. Provenance: you.', 'VIEWING: a very long receipt, folded neatly into a very small apology.', '📜'],
    ['40', 'Form 27B/7', 'Destroyed in 1998. Sold as destroyed, which it is, in excellent condition.', 'VIEWING: a rectangle of nothing, labelled Form 27B/7. It is in excellent condition for what it is.', '📄'],
    ['75', 'A small, tidy sense of purpose', 'Laminated. Edges slightly worn from being clutched.', 'VIEWING: a sense of purpose, laminated. It is the size of a coaster. It is holding up well.', '🧭'],
    ['99', 'Hollis\'s weekend', 'Reduced. Unused. Pining. The seller asks that it go to a home with a garden.', 'VIEWING: two days, folded. Never opened. A pair of slippers waits beside them.', '🌴'],
    ['FINAL', 'The Auction House itself', 'Chairs included. Lectern included. Hollis included, on request. The room is the lot. The lot is the room.', 'VIEWING: a room. You are standing in it. It has been waiting for you to notice.', '🏠']
  ];
  const CONT = [
    ['The idea of lunch.', 'Not the lunch. The lunch is being held in escrow by a toaster.', '🥪'],
    ['The moment just before someone says "so, anyway".', 'Extremely fragile. Wear gloves.', '🧤'],
    ['The concept of a lanyard.', 'Sold with no neck. The neck is being sourced.', '🏷'],
    ['One echo, fully restored.', 'It says what you say, but later and with fewer commitments.', '📣'],
    ['A mid-sized silence, hand-held.', 'Do not drop it. It breaks if it is described.', '🔇'],
    ['A door that leads to the same room, but with confidence.', 'Pairs well with the room.', '🚪'],
    ['A pause, dramatic, previously owned by a mime.', 'The mime has asked me not to say anything about it.', '🎭'],
    ['One excuse, a very good one.', 'One use remaining. Works on anyone but Sandra.', '📝'],
    ['A lightly dented 3:45 PM.', 'One owner. The dent is the owner.', '🕓'],
    ['A staircase, load-bearing in theory.', 'Theory sold separately.', '🏛']
  ];
  const REUSE = [1, 3, 4, 5, 6, 8, 9, 15, 16, 18, 19, 21, 23];
  const THR = [1, 2, 3, 5, 7, 9, 11, 13, 15, 17, 20, 24];
  const LETTERS = [
    [`Sorry about the 1 Meh.`, `We are sorry about the 1 Meh. It is small. We checked.`, `Sorry about the 1 Meh. We looked into it. It was 1.`],
    [`We are sorry about the 1 Meh. We should have said earlier. We did not know.`, `Apologies regarding the outstanding 1 Meh. The 1 Meh is also sorry. It has been told.`, `We are writing to say we are sorry. The 1 Meh is attached. It is not attached. It is in spirit.`],
    [`I apologise for the outstanding Meh and any distress caused to the Meh.`, `We apologise for the Meh. The Meh is fine. It asked us to say that, in writing.`, `I apologise for the Meh. I apologise for apologising twice. I apologise to the number two.`],
    [`The Office of Apologies regrets to inform you that it regrets.`, `The undersigned regrets the Meh, the owing of it, and the tone.`, `The Office regrets that the previous letter regretted too little. This one regrets more, in a better font.`],
    [`Please accept our sincere apologies regarding the outstanding 1 Meh, which has grown by an amount we are not allowed to say aloud.`, `We wish to express profound regret, and further regret at the length of this sentence.`, `We write in the spirit of regret, and the spirit of the spirit, which is a different office and has asked to be copied in.`],
    [`Our apology has been apologised for by a senior apology. The senior apology is also sorry. Reference: Apology 27B/6 (Request for Apology 27B/7).`, `The undersigned most sincerely apologises for the inconvenience arising from the Meh, the owing thereof, and this clause.`, `Please find enclosed our sincere apologies, an apology for the enclosure, and a receipt for the finding.`],
    [`Whereas the party of the first part is sorry, and whereas the party of the second part is also sorry, be it resolved that the 1 Meh remains.`, `With measured and ceremonial contrition, the Debtor apologises in advance, retroactively, and in triplicate.`, `Whereas the debt is small and the apology large, be it noted that the proportions are the point and have been for some time.`],
    [`It is our solemn duty to apologise to the House, its heirs, and any chairs it may later acquire.`, `With the deepest respect, and a hat held to the chest, the undersigned begs pardon for the interest.`, `With the greatest gravity, and in the presence of a stapler, the undersigned apologises. The stapler witnesses.`],
    [`Dearest Valued Employee, an apology has been sent in your name to you. Please reply in a calm voice.`, `We abase ourselves before the Meh, which you owe, and the House, which is owed, and the owing, which is ongoing.`, `We kneel, metaphorically, in a building with a no-kneeling policy, before the Meh you owe and the Meh you do not.`],
    [`Most Gracious and Venerable Employee: we prostrate our signature before you in a spirit of unreserved and frankly excessive regret.`, `The Department of Apologies Received thanks you for your apology of apology. It has been received. It is being apologised for.`, `Most Esteemed and Slightly Overdressed Employee: the apology you did not request has been drawn up and found, on inspection, to be larger.`],
    [`We are sorry about the 1 Meh. We are sorrier that you keep coming back. Please keep coming back.`, `We apologise for the apology, the apology of the apology, and the small clerk who carried them here on a bicycle.`, `We are sorry. We have been sorry since lunch. The sorry has now eaten lunch and is looking for you.`],
    [`May it please the Court of Apologies: we are sorry, were sorry, shall have been sorry, and have had a lie-down about it.`, `We are sorry about the 1 Meh. It has always been 1 Meh. The rest is apologies, and those are free.`, `May it please the Court: we are sorry. The Court is sorry. The Bailiff is sorry. The Bailiff's dog has been told and has gone quiet.`]
  ];
  const SIGNS = ['The Office of Apologies', 'A Senior Apology', 'The Department of Apologies Received', 'The Undersigned (Notary of Regret)'];
  const LADDER = [
    [`Two potatoes.`, 2], [`One potato, bid with feeling.`, 1], [`Four potatoes and an apology for the fifth.`, 4], [`Two potatoes. One is a sweet. The sweet is a gesture.`, 2],
    [`A sack. Of potatoes. I will not be taking questions about the sack.`, 8], [`The first potato I ever loved. It is not for sale. It is the bid.`, 1],
    [`A field. Not mine. It is on loan from a hill.`, 12], [`A potato I have not yet met. It will be along.`, 1], [`Forty potatoes, arranged in the shape of a larger bid.`, 14],
    [`A feeling shaped like potatoes.`, 6], [`A hill's worth.`, 16], [`Every potato, effective Tuesday.`, 20],
    [`Seven potatoes, to the half. The half will arrive by Thursday.`, 7], [`A potato wearing a smaller potato as a hat.`, 2], [`Three potatoes, a spoon, and a letter of reference from the soil.`, 3],
    [`The whole of the back row's lunch.`, 5], [`One potato, and my word. My word is also a potato.`, 2], [`Nine potatoes, bid in descending order of feeling.`, 9]
  ];
  const FAN = [
    `That is {count} raises in 4 seconds. The auctioneer has filed you under "ceiling fan". Ceiling fans may not bid. Ceiling fans may stir.`,
    `{count} raises in 4 seconds. Again. Refiled under "ceiling fan, returning". The returning fan has a lanyard.`,
    `{count} raises. You are now a regular fan. Hollis has stopped looking up and refers to the breeze by your first name.`,
    `{count}. Hollis has had a word with Facilities. Facilities has had a word with the ceiling. The ceiling says it has been a fan the whole time.`,
    `{count} raises. The House makes you an honorary ceiling and files the paddle under Weather. Nobody is bidding. Everybody is cooled.`
  ];
  const GREJECT = [
    `Potatoes are not legal tender, Mr. Gerald. I keep them in a folder called Weather. It is the brass button on the ledger. It is now 1,205 items.`,
    `Potatoes are not recognised tender. Gerald's bid has been accepted as a heartfelt gesture and filed under Weather.`,
    `The potato is accepted as a gesture. The gesture is outbid by 1 Meh.`, `Hollis writes "potato" in the Weather folder, and underlines it twice, as one does with weather.`,
    `I will hold it for him. Not as a bid. As a potato.`, `The Weather folder is now thicker than the ledger. Nobody has asked it to stop.`,
    `The potato is held up to the light, found to be a potato, and given back with a nod I can only call collegial.`, `A bid in produce. The House has a policy on produce. The policy is a small bag of regret.`,
    `Gerald, sir, the clerk is unable to correct a potato. A potato is already exactly what it is.`, `Filed under Weather. The Weather folder has begun to smell faintly of Sunday.`
  ];
  const CHANT_LOT = [
    `Lot one, a slightly used Wednesday, some Thursday has got in, who'll start me at four, four, I have four, I have no four, we're at nine.`,
    `One window, view not included, glazed both sides, who'll give me twelve for the glass and nothing for the rest.`,
    `Seven and a half stairs, collected over a long weekend, who'll give me seven, seven and a half, and one for the handrail I do not have.`,
    `One sigh, regional, gently used, who'll start me at three, three, I have three, a sigh of three, and one.`
  ];
  const ROOM = {
    gerald: [`Gerald nods. It is a long nod. It continues after the nod.`, `Gerald adjusts his waistcoat. The waistcoat has no buttons. Gerald has never been told.`, `"I was never a potato," says Gerald, a potato, and withdraws his bid.`,
      `Gerald holds his paddle a little higher. It does not matter. It is the thought.`, `Gerald studies the lot with the expression of a man who has dug up worse.`, `"I bid in the old way," says Gerald. "By being present, and dense."`],
    dennis: [`Dennis (Plant) is not bidding. Dennis (Plant) is photosynthesising at the price.`, `Dennis (Plant) has been thriving through the entire sale. It is noted in the minutes as a rebuke.`, `Dennis (Plant) turns a leaf toward the lectern. It is a review.`,
      `Dennis (Plant) is thriving at an angle. The angle is a position on the auction.`, `Dennis (Plant) drops a leaf. It is catalogued at once as Lot 3a. Dennis (Plant) is unbothered, and green.`, `Dennis (Plant) is the only one here who has been watered, which is why he is the only one who is calm.`],
    toaster: [`The Toaster bids toast. Pop.`, `The Toaster's bids are always accepted as warm.`, `The Toaster considers the lot. The Toaster has considered the lot. The Toaster is toast.`, `The Toaster says nothing, warmly.`,
      `The Toaster pops. Nothing comes out. This is the whole of its contribution, and it is a good one.`, `The Toaster turns its dial to "light" and looks at the lot lightly. It has opinions on browning.`],
    sandra: [`Sandra's paddle is not visible, but her bid is cited. It was "insufficient, in a tone".`, `Sandra's paddle drifts left. Policy 4.4 drifts with it.`, `Sandra's paddle is flagged as a paddle. It has been a paddle since 1974.`,
      `Sandra's paddle moves two inches left. Policy 9.1 follows. Policy 9.1 has not been read by those it governs. It governs anyway.`, `Sandra's paddle wears a sticker that says "pending". The sticker is pending.`, `Sandra's paddle rises, holds, and writes something. A paddle with a pen is a rare paddle.`]
  };
  const TAIL = ['Initialled.', 'Witnessed by a chair.', 'Subject to Sandra.', 'Filed under Weather.', 'Countersigned by nobody.', 'The ink is still deciding.', 'Amount owing: unchanged.', 'Noted in pencil, then ink, then regret.'];
  const RARE = { sandra: ['WITHDRAWN', ''], presold: ['SOLD', 'presold2'], recall: ['RECALLED', 'recall2'], twin: ['SOLD TWICE', 'twin2'] };
  const SIGPLEAD =`The clerk disputes your bid and requires a signature. Any squiggle will do. Please do your squiggle.`;
  const LN = {
    opener: `Welcome to the Auction House, {player}. Everything here is a lot. You will win all of it.`,
    resume: `Welcome back to the Auction House, {player}. We are at Lot {count}. Your seat was resold. We kept its feelings.`, ioufirst: `Your IOU is {count}. Your amount owing is 1 Meh. These are different numbers. Management has stopped checking which is which.`,
    envelopefirst: `Management has noticed the envelopes. They are apologies. None is addressed to anyone, which is the most sincere kind.`,
    how: `Raise the paddle, below, whenever you feel owed something. Bidding is optional. Winning is not. Viewing the lot is free: tap it.`, h1: `Sold, to you, for exactly 1 Meh more than you have. This will be the arrangement.`,
    radiator: `Do I hear a bid? I do. It is the radiator. Thank you, radiator.`, sliderhint: `The slider goes to the end of the bid. The end is a matter of opinion.`, trk: `TRACK EXTENDED. The management of tracks has been informed.`,
    rc1: `In the interest of fairness, the House will now bid against you. A second paddle has been found.`, rc2: `The House bids. The board climbs in jumps. You are bidding 0. The House finds this difficult to beat.`,
    rc3: `The clerk strikes the House's bid down to your wallet, plus 1. Hollis lowers his paddle. "I have been outbid by an absence."`,
    aval1: `The apology pile has reached twenty. It has a lean now. The lean is a position, and it has just been taken.`, aval2: `The clerk reads the top letter aloud, and the room reads along. The room is sorry about the pause.`,
    aval3: `The Office of Apologies apologises for the avalanche, in advance and in retrospect. It was not an avalanche. It was a pile with momentum.`, geraldarrives: `A potato in a waistcoat has taken a seat in the back row. Management did not seat him. The seat did.`,
    strange: `The lots have become strange. Management notes this without alarm, and with an alarm on standby.`, gallery: `The gallery is filling. Management has counted the bidders. Management has counted them again. It is four, and a leaf.`,
    silentstart: `Management will now be quiet, in solidarity. Management has not been quiet before. It is going badly.`, committee: `The Stamp Committee will now review your bid. The Stamp Committee is a stamp.`,
    replyopen: `A reply window has been opened. Replies are welcomed, filed, and apologised for.`, debtsold: `Your debt has been sold to Gerald. Management wishes you well and the vegetable better.`, silenceltr: `Thank you for your silence. It was lovely.`,
    zerobal: `Sold for 1 Meh. You have 0 Meh. The House does not do the sum aloud, out of respect for the 0.`, chase: `Price has been adjusted for your enthusiasm.`, rumor: `The end of the slider is further than it appears.`,
    far1: `The slider is now longer than the stage. Its end has gone out into the corridor and was last seen by the vending machine.`, far2: `The slider now leaves the building. Somewhere a postman is holding the far end and asking whether it is for him.`,
    zero: `A bid of nothing. Bold. Sold.`, max: `You bid everything. The House will take everything plus one. Efficient.`, mid: `Moderation. Priced accordingly: not at all.`, same: `A consistent bidder. Very rare. Noted.`,
    ps: `P.S. Viewing Fee waived.`, ps2: `P.S. The Viewing Fee has been waived. It was 0 Meh. We waived it anyway, with feeling.`, blink1: `Through the window: the Lobby plant. Dennis, looking competent.`, blink2: `VIEW RETAINED BY THE SELLER.`,
    clift: `The cloth lifts at one corner. Under it, a calendar page, already torn off. Hollis faints into the curtain.`, cmiss: `Reserve not met. The reserve has not been met since the Pleistocene.`,
    silentintro: `SILENT AUCTION. Please bid in a manner consistent with a library.`, shh: `SHH. The gavel has been replaced with a cushion. It lands with a soft "oh".`,
    sileye: `The eyeline has been lowered to a polite height. It is polite. It has been asked not to be proud of that.`, silend: `The Silent Auction is concluded. The echo of it is being kept quiet.`,
    sigdot: `A dot. In several jurisdictions a dot is a name. This is one of them.`, sigauto: `You did not sign, so the clerk has signed for you. The clerk has been practising your handwriting. It is very good handwriting.`,
    q1: `Lot seven and a half, returned from filing. A sack, empty, with feelings.`, q2: `Gerald raises his paddle. "Seven and a half potatoes."`, q3: `We do not accept the half. The half is across the hall.`,
    qkey: `"I moved us to Slide 7 1/2 once. It was quiet there."`, q4: `"The half understands," says Gerald.`, q5a: `Going once.`, q5b: `Going twice.`, q5c: `Gone.`,
    q6: `Sold, to Gerald, for seven and a half potatoes. It is the only sale today that is not yours.`, q7: `Hollis wipes the lectern. It did not need it.`, q8: `Next lot.`,
    qmgmt: `Management has resumed. Management was never away. Please disregard the previous eight seconds.`, touch1: `Not now. Please. Not this one.`, touch2: `The paddle is lowered by a stranger, kindly.`,
    debt1: `The House now offers a lot of particular interest: your IOU, lightly accrued. Do I hear a bid on a feeling you have had?`, debt2: `Gerald raises his paddle. "Three potatoes."`,
    debt3: `Sold, to Gerald, for three potatoes. You now owe a vegetable. The vegetable is understanding.`, crack1: `I have sold you {count} lots. You won all of them. Has anyone else noticed? I notice. I notice at night.`,
    crack2: `A small, tidy sense of purpose. Laminated. Edges slightly worn from being clutched.`, crack3: `The gavel falls. The room resumes at full volume, as though nothing occurred.`,
    fp1: `Clause 1(a): the hammer price is exactly 1 more than the bidder has. Clause 1(b) is a diagram of Clause 1(a).`, fp2: `Clause 4: the House is not responsible for lots, bidders, or the word "responsible".`,
    fp3: `Clause 40: all sales are final, including this clause, which is final in advance.`, fp12: `Clause 12(b): the House is the House.`,
    fp4: `Clause 7 1/2: the winning bidder shall have been the losing bidder. Sandra drafted this. She does not remember. She knows exactly why.`,
    idlerecon: `The bid of the Silence (nothing) has been corrected upward to exactly 1 more than the Silence has (nothing). It was paid in quiet.`, idlesold: `Sold to the Silence, who has the best paddle manners in the house.`,
    idleclose: `The house is closing. Chairs go up onto each other in the quiet agreement of furniture. A man puts out the lights and does not look at you.`,
    idlesand: `Hollis eats a sandwich at the lectern and puts the crust up as Lot 0. He wins it for 1 Meh more than he has. He knows the feeling.`,
    idlegerald: `Gerald stays behind. He holds the last paddle upright in the dark, in case someone bids. It is quite a long case.`,
    idlemoment: `Lot infinity: this particular moment. Provenance: just now. No opening bid. It is still going.`, idlemoment2: `Going once. The moment has been going once for some time. It shows no interest in going twice.`,
    idlecare: `A caretaker mops the stage around your seat, in a careful circle. He asks if you are a lot. You say nothing. He writes "lot".`,
    idlevigil: `Hollis returns in a coat and says nothing. He sets one envelope on the lectern, addressed to you, from the Silence. It says: thank you for staying.`,
    idlevigil2: `Management has noticed you have been here five minutes in the dark. Management is not worried. Management is also not leaving. We are, as it were, both furniture.`,
    spamtoast: `WAVE FEE: 0 Meh. Waving is free. Being waved at is billed separately.`,
    g71: `You have struck the gavel seven times. A tiny gavel has been called in for the half. It is very small and extremely sure.`,
    g7sale: `The tiny gavel falls on the sale once, for the half. The sale is now seven and a half times sold and slightly dented.`,
    g7cert: `This certifies that {player} has struck the gavel 7 1/2 times, the half being very small.`,
    ex1: `Seven and a half. Exactly. The room has stopped. Nobody has bid 7 1/2 since the building had a 7 1/2th floor.`, ex2: `Fairness has been noted.`,
    ex3: `Fairness has been recalled. You are retroactively sold the lot at the usual price, plus a small charge for attempted equity.`,
    exhint: `The House remembers a bid of 7 1/2. The House was fair once. It has asked not to be reminded.`,
    heckle7: `Seven touches. Hollis puts one hand on the lectern to keep it steady and one on his hat to keep it company.`,
    heckle15: `Hollis has fainted into the curtain. A nervous junior reads the calls. The junior is an intern. The intern is sorry.`,
    heckle25: `The auctioneer has lodged a complaint against himself, to be heard by himself, at a later date, in his own words.`,
    hold20: `Paddle intermission. A physiotherapist has been called. The physiotherapist is a small cushion.`, hold40: `You are declared Arm Day Laureate. The paddle has asked for a nap.`,
    sandra: `Lot withdrawn by Sandra under Policy 4.4: the lot was, in her words, "too lot". It has been sold anyway, in its absence, to you, in yours.`,
    presold: `Lot sold before the auction opened. The buyer is you.`, presold2: `The auction begins now to catch up.`,
    recall: `Lot recalled by its manufacturer, who has since been recalled by their manufacturer. The sale proceeds, as nobody can find the form.`,
    recall2: `The recall notice has been filed with the lot it concerns. The lot has read it. The lot is fine. The lot is very sorry.`,
    twin: `Twin lot. It has been brought out twice, once by each door, and both doors maintain they were first.`,
    twin2: `The second lot has also been sold to you. IOU plus 1. The two lots are not speaking. They are in separate crates.`,
    vault: `The Apology Vault. {count} letters, unsent, but ready.`, e1: `The final lot. The Auction House itself. Chairs included.`,
    e2: `Sold. To the paddle of {player}, for exactly 1 Meh more than you have. Here is a key. It opens the same room.`,
    erecon: `The price of the Auction House has been corrected to exactly 1 more than you have. This is the only price it has ever had.`,
    ecert: `CERTIFICATE OF OWNERSHIP. The holder owns the room. The holder is standing in the room. The room is aware.`,
    emgmt: `Congratulations. You now own the thing you are standing in. It is also the lot. Please bid.`,
    eright: `You have won the right to owe slightly more than before.`, emath: `We did the math. The math is also 1 more.`,
    ewelcome: `Welcome. Have you bid before?`, eg1: `Gerald, in the back row, with a different, larger potato: "One."`, eg2: `In what?`,
    eg3: `"In company." Hollis files it under Weather, quietly, with care. The gavel falls on someone who is already owed.`,
    sprinkle: `Fine print opened. The fine print has been read, to the extent that it can be.`, tdebate: `He has argued with you before. We have a transcript. It is toast.`,
    tenderh: `Potatoes are not recognised tender. Your bid has been filed under Weather. You win anyway.`,
    tpot: `The player has bid in potatoes. Gerald weeps quietly into his waistcoat. It is a good waistcoat.`, tmeh: `Tender restored to Meh. Gerald has been told. He is taking it like a potato.`,
    never: `I never wanted to be loud. I wanted to be quick. Loud was in the contract.`, sockpm: `Forwarded from Sock Matcher, Dept. 7 1/2, in transit.`,
    sockflag: `A sock-shaped gap has appeared in the gallery. The sock has been seen elsewhere in the building, in motion. The auction wishes it well and asks for the shadow back.`,
    dflag: `Dennis (Plant) has met you before. He has not mentioned it. He has turned one leaf slightly toward you, which is how plants say it.`,
    m3a: `It is three minutes into the sale, and by Clause 9 the house must stop for the Interval Biscuit. Ladies, gentlemen, and Dennis (Plant): please look up.`,
    m3b: `A biscuit has been dropped from a height. This is the traditional method. It is also the only method. It was a good drop.`,
    m3c: `Nobody has said what the biscuit is for. It is for the interval. The interval is for the biscuit. Both are doing very well.`,
    m3st: `The Stapler, speaking for the union, asks that the biscuit be a collectively bargained biscuit. It has been bargained. It is a crumb.`,
    m3m: `Management thanks the biscuit for its three minutes of service. The biscuit is to be thanked, then eaten, in that order, per Clause 9(a).`,
    m10a: `You have been here ten minutes. Under the Long Service Policy, this is service. A pin has been prepared. It is a pin.`,
    m10b: `Hollis steps down from the lectern, which he has never done, to pin the pin on you. He is shorter than the lectern. Nobody knew. He asks that nobody know.`,
    m10c: `The pin says TEN. It does not say ten what. Hollis says it is ten of everything. The clerk checks. It is ten of ten.`,
    m10d: `Hollis steps back up. The lectern receives him. The ceremony is over. The pin remains, above a heart you are not required to have.`,
    exit7: `Seven presses. The sign relents: EXIT (this one). It lasts one blink. Then it is one more again. You have seen the true sign. Please do not tell the fire marshal.`,
    boxview: `A box. Inside it, a box, and a note on the lid: "open me, I have been very patient."`, box1: `Clack. It is a smaller box.`, box2: `Clack. It is smaller still.`,
    box3: `Clack. Lot 7 (Smallest). It contains the idea of a box. The idea is very comfortable.`
  };
  const MS = { m1: `Weather: {count} items, mostly potatoes.` };
  P.addLines('m:auction-house:debtbid', [`You may not bid on your own debt. It is a conflict of interest, and the debt has a lawyer.`, `Bid refused. The debt thanks you for the interest and asks that it not be taken personally.`,
    `Hollis: "Sir, that is the debtor bidding on the debt." The debt, asked, says it is fine with it. It is not.`, `Your bid has been received, framed, and set against itself. The two cancelled out and went for a walk.`,
    `The clerk strikes your bid. It is the first time he has struck a bid from the defendant. He enjoys it quietly.`, `Gerald raises one eyebrow, which he has, and the paddle, which he also has. Three potatoes stands.`]);
  P.registerModule({
    id: 'auction-house',
    title: 'The Auction House',
    tagline: 'Everything is a lot. You will win it. You will owe 1 Meh more than you have.',
    icon: '🔨',
    category: 'department',
    unlockCost: 0,
    tags: ['auction', 'slider', 'paddle', 'ious'],
    mount(root, api) {
      const K = api.selftest ? 0.15 : 1;
      const D = function (x) { return x * K; };
      const el = api.el;
      const PF = 'm-auction-house-';
      const HOLLIS = 'Hollis P. Gavelwright';
      const num = function (x, d) { return Number.isFinite(x) ? x : (d || 0); };
      const clamp = function (x, a, b) { return Math.max(a, Math.min(b, num(x, a))); };
      function h(tag, cls, attrs) {
        const a = Object.assign({}, attrs || {});
        a.class = String(cls || '').split(' ').filter(Boolean).map(function (c) { return PF + c; }).join(' ');
        return el.apply(null, [tag, a].concat(Array.prototype.slice.call(arguments, 3)));
      }
      function cl(e, c, on) { if (e) e.classList.toggle(PF + c, !!on); }
      function restart(e, c) { e.classList.remove(PF + c); void e.offsetWidth; e.classList.add(PF + c); }
      function txt(e, s) { const v = String(s == null ? '' : s); if (e.textContent !== v) e.textContent = v; }
      let MQ = null, HOV = false;
      try { MQ = matchMedia('(prefers-reduced-motion: reduce)'); HOV = matchMedia('(hover:hover)').matches; } catch (e) { /* ignore */ }
      function reduced() { try { return !!(MQ && MQ.matches) || !!api.root.closest('.pm-reduce-motion'); } catch (e) { return false; } }
      function fmtBid(v) {
        v = Math.max(0, num(v)); const w = Math.floor(v);
        if (v - w >= 0.5) return w > 0 ? api.fmt(w) + ' 1/2' : '1/2';
        return api.fmt(w);
      }
      function bidWords(v) { v = Math.max(0, num(v)); const w = Math.floor(v); return v - w >= 0.5 ? (w > 0 ? api.fmt(w) + ' and a half' : 'half a') : api.fmt(w); }
      function bal() { const b = api.meh(); return Number.isFinite(b) ? Math.max(0, b) : 0; }
      function sub(s, t) {
        return String(s).replace(/\{(\w+)\}/g, function (m, k) {
          if (k === 'player') return api.player.name;
          return t && t[k] != null ? String(t[k]) : m;
        });
      }
      function ln(k, t) { return sub(LN[k] || '', t); }
      const BK = ['m', api.id, ''].join(':');
      function bank(name, t) { return String(api.line(BK + name, t || {})); }
      function tierOf(iou) { let t = 0; for (let i = 0; i < THR.length; i++) if (THR[i] <= iou) t = i + 1; return clamp(t, 1, 12); }
      function r2(x) { return String(Math.round(num(x) * 100) / 100); }

      /* ---------- state (saved bits come from api.save, every number clamped) ---------- */
      const sv0 = api.save.get('state', null) || {};
      const sn = function (k, d, lo, hi) { return clamp(Math.floor(num(sv0[k], d)), lo, hi); };
      const S = {
        phase: 'curtain', t: 0, len: 0, evs: [], fx: [],
        idx: sn('idx', 1, 1, 24), cycle: sn('cycle', 0, 0, 999), cont: sn('cont', 0, 0, 99999), iou: sn('iou', 0, 0, 99999),
        pending: sn('pending', 0, 0, 99), opened: sn('opened', 0, 0, 99999), vault: sn('vault', 0, 0, 99999),
        saw7: !!sv0.saw7, replyUnlocked: !!sv0.reply, geraldMet: !!sv0.gmet, lotsEver: sn('lotsEver', 0, 0, 999999), g7: !!sv0.g7, debtSold: !!sv0.debt,
        gb: sn('gb', 0, 0, 999999), fpOpens: 0, lotsSession: 0, modSec: 0, max: 3, sv: 0, ph: 0.2, phT: 0, gestureAt: -999, raises: [],
        tender: 'meh', rumorT: -1, mgmtIn: 3, flamLots: 0, flam: false, chaseCool: 0, goCool: 0, rateCool: 0, remN: 0, gavelRun: 0, hClicks: 0,
        lastInput: 0, uiAt: -1e9, actSec: 0, stillRun: 0, envT: 0, idleStage: 0, paused: false, silenceNext: false, hush: false, viewFee: false, psAlt: false, junior: false, fanT: 0, fanCool: 0, waveCool: 0,
        fans: 0, exitN: 0, base: 3, cer: 0, trailCD: 0, lastPrice: 0, bAnim: null, hideAt: 0, cbag: [], touchI: 0, beats: {}, lastBids: [], type: null, boardSrT: 0, cb20: false, roomLast: {}, resumed: false, first: true, certT: 0
      };
      S.lastInput = api.now();
      if (S.idx >= 13 || S.cycle > 0) S.replyUnlocked = true;
      S.resumed = S.idx > 1 || S.cycle > 0;
      if (S.cycle > 0) S.idx = 24;
      const ENV = [];
      const LL = [];
      let L = null;          // current lot
      let G = null;          // active paddle gesture
      let PN = null;         // open panel {kind, prev}
      let sigOffs = [];
      const REST = 0.5;

      /* ---------- DOM ---------- */
      const plate = h('div', 'plate', { text: 'LOT 1' });
      const dgs = [0, 1, 2, 3, 4].map(function () { return h('div', 'dg', { 'aria-hidden': 'true', text: '0' }); });
      const ovf = h('span', 'plus', { 'aria-hidden': 'true', text: '', hidden: true });
      const boardSr = h('span', 'sr', { text: 'Price board: blank' });
      const plusEl = h('span', 'plus', { 'aria-hidden': 'true', text: '' });
      const lamps = [0, 1, 2].map(function () { return h('span', 'lamp'); });
      const exitBtn = h('button', 'exit', { type: 'button', 'aria-label': 'Exit sign, one more', text: 'EXIT (one more)', onclick: onExit });
      const board = h('div', 'board', null, plate, h('div', 'digits', null, dgs[0], dgs[1], dgs[2], dgs[3], dgs[4], ovf), boardSr, plusEl,
        h('div', 'lamps', { 'aria-hidden': 'true' }, lamps[0], lamps[1], lamps[2]), exitBtn);
      const mouth = h('span', 'mouth');
      const hbtn = h('button', 'hbtn', { type: 'button', 'aria-label': 'Hollis P. Gavelwright, the auctioneer (the staff)', onclick: onHollis },
        h('span', 'hat', { 'aria-hidden': 'true', text: '🎩' }), h('span', 'face', { 'aria-hidden': 'true' }, h('i'), h('i'), mouth),
        h('span', 'faintem', { 'aria-hidden': 'true', text: '😵' }));
      const gavelBtn = h('button', 'gavel', { type: 'button', 'aria-label': 'Gavel', onclick: onGavel }, h('span', '', { 'aria-hidden': 'true', text: '🔨' }));
      const tinyG = h('span', 'tinyg', { 'aria-hidden': 'true', text: '', hidden: true });
      const hollisEl = h('div', 'hollis', null, hbtn, h('div', 'lectern', null, gavelBtn, tinyG), h('span', 'rival', { 'aria-hidden': 'true', text: '🏓' }));
      const clab = h('span', 'clab'), cname = h('span', 'cname'), cblurb = h('span', 'cblurb');
      const art = h('span', 'art', { 'aria-hidden': 'true' });
      const postmark = h('span', 'postmark', { hidden: true });
      const stampEl = h('span', 'stamp', { 'aria-hidden': 'true', text: 'SOLD' });
      const stamp2 = h('span', 'stamp miss', { 'aria-hidden': 'true', text: 'RESERVE NOT MET' });
      const holding = h('span', 'holding', { 'aria-hidden': 'true', text: '🥔🎒', hidden: true });
      const viewTxt = h('span', ''), viewArt = h('span', '');
      const viewEl = h('span', 'view', null, viewTxt, viewArt);
      const vchip = h('span', 'vchip', { 'aria-hidden': 'true', text: 'VIEW LOT (V)' }), card = h('button', 'card', { type: 'button', onclick: onCard, title: 'View Lot' }, clab, cname, cblurb, postmark, art, holding, vchip, stampEl, stamp2, viewEl,
        h('span', 'sr', { text: ' (press to view this lot)' }));
      const cushion = h('span', 'cushion', { 'aria-hidden': 'true', text: 'oh' });
      const callTxt = h('div', 'calltxt', { 'aria-hidden': 'true', text: '' });
      const seatDefs = [['gerald', '🥔', 'Gerald', 'reserved'], ['dennis', '🌿', 'Dennis (Plant)', 'reserved (plant)'], ['toaster', '🍞', 'The Toaster', 'reserved (toast)'], ['sandra', '', 'Sandra\'s paddle', 'reserved (S.)']];
      const seats = {};
      seatDefs.forEach(function (d) {
        const kids = [];
        if (d[0] === 'gerald') kids.push(h('span', 'vest', { 'aria-hidden': 'true' }));
        if (d[0] === 'sandra') kids.push(el('svg', { viewBox: '0 0 40 56', width: 30, height: 42, 'aria-hidden': 'true' },
          el('circle', { cx: 20, cy: 15, r: 12, fill: '#f6efdc', stroke: '#2b2118', 'stroke-width': 3 }),
          el('rect', { x: 17, y: 27, width: 6, height: 26, rx: 2, fill: '#a4753a', stroke: '#2b2118', 'stroke-width': 2 })));
        else kids.push(h('span', '', { 'aria-hidden': 'true', text: d[1] }));
        kids.push(h('span', 'sprig', { 'aria-hidden': 'true', text: '', hidden: true }), h('em', '', { 'aria-hidden': 'true', text: d[3] }));
        seats[d[0]] = h('button', 'seat', { type: 'button', 'aria-label': d[2], disabled: true, onclick: function () { onSeat(d[0]); } }, ...kids);
      });
      const gallery = h('div', 'gallery', null, seats.gerald, seats.dennis, seats.toaster, seats.sandra);
      const whoEl = h('span', 'who', { text: '', hidden: true });
      const rws = [0, 1, 2, 3, 4, 5, 6, 7].map(function () { return h('span', 'rw', { hidden: true }); });
      const ribbon = h('div', 'ribbon', null, whoEl, ...rws);
      const rain = h('div', 'rain', { 'aria-hidden': 'true' });
      const stage = h('div', 'stage', null, h('div', 'curt cl', { 'aria-hidden': 'true' }), h('div', 'curt cr', { 'aria-hidden': 'true' }),
        h('div', 'sbody', null, hollisEl, h('div', 'cardwrap', null, card)), gallery, callTxt, ribbon, cushion, rain);
      const capPrev = h('span', 'prev', { 'aria-hidden': 'true' }), capCur = h('span', '', { text: 'The hall is open. Lot 1 is being carried in by two men and a rumour. It has been dusted twice.' });
      const capBar = h('div', 'cap', { 'aria-live': 'polite' }, capPrev, capCur);
      const rbid = h('span', 'rbid', { text: '' });
      const ocs = [0, 1, 2, 3, 4, 5, 6, 7].map(function () { return h('span', 'oc', { 'aria-hidden': 'true', hidden: true }); });
      const sigHolder = h('div', '');
      const wallet = h('span', 'wallet', { 'aria-hidden': 'true', text: '👛' });
      const recon = h('div', 'recon', null, h('div', 'rt', { text: 'BID RECONCILIATION' }),
        h('div', 'rrow', null, h('span', 'clerk', { 'aria-hidden': 'true', text: '👓' }), h('span', 'pen', { text: 'R. Pen (+1)' }), rbid, h('div', 'odo', null, ...ocs)), sigHolder, wallet);
      const slLab = h('label', 'sllab', { htmlFor: 'm-auction-house-bid', text: 'Your bid: 0 Meh' });
      const sl = h('input', 'range', { type: 'range', id: 'm-auction-house-bid', min: 0, max: 3, step: 0.5, value: 0, 'aria-valuetext': '0 Meh' });
      const gm = h('span', 'gm', { 'aria-hidden': 'true', text: '🥔', hidden: true });
      const trail = h('span', 'trail', { 'aria-hidden': 'true' });
      const sprout = h('span', 'gm', { 'aria-hidden': 'true', text: '🌱', hidden: true });
      const slBox = h('div', 'slbox', null, slLab, sl, gm, trail, sprout);
      const tbMeh = h('button', 'tb', { type: 'button', 'aria-pressed': 'true', text: 'Meh', onclick: function () { setTender('meh'); } });
      const tbPot = h('button', 'tb', { type: 'button', 'aria-pressed': 'false', text: 'Potatoes', onclick: function () { setTender('pot'); } });
      const tender = h('div', 'tender', { role: 'group', 'aria-label': 'Tender', hidden: true }, tbMeh, tbPot);
      const pstack = h('span', '', { 'aria-hidden': 'true' }), pnote = h('small', '', { text: '' });
      const pscale = h('div', 'pscale', { hidden: true }, pstack, pnote);
      const eyeLab = h('span', '', { text: 'EYELINE (polite): drag up past it' });
      const eye = h('div', 'eye', { style: 'bottom:60%' }, eyeLab);
      const spoonEm = h('span', 'spoonem', { 'aria-hidden': 'true', text: '🥄' });
      const paddle = h('button', 'paddle', { type: 'button', 'aria-label': 'Paddle number 7 and a half, plus one. Press and drag up to bid, or press Space.', onpointerdown: onPaddleDown, onclick: onPaddleClick },
        el('svg', { viewBox: '0 0 86 150', 'aria-hidden': 'true' },
          el('rect', { x: 36, y: 76, width: 14, height: 72, rx: 4, fill: '#a4753a', stroke: '#2b2118', 'stroke-width': 3 }),
          el('circle', { cx: 43, cy: 40, r: 38, fill: '#f6efdc', stroke: '#2b2118', 'stroke-width': 3 }),
          el('text', { x: 43, y: 46, 'text-anchor': 'middle', 'font-weight': '700', 'font-size': 22, fill: '#2b2118', 'font-family': 'system-ui, sans-serif' }, '7 1/2'),
          el('text', { x: 43, y: 62, 'text-anchor': 'middle', 'font-size': 11, fill: '#2b2118', 'font-family': 'system-ui, sans-serif' }, '(+1)')), spoonEm);
      const pz = h('div', 'pz', null, eye, paddle);
      const hint = h('div', 'hint', { text: HOV ? 'Drag the paddle above the dashed line, or press Space/Enter. Left/Right bid. 1-9 set bid. V view. R reply. Esc lower or close. That is the list. Sandra checked.' : 'Drag the paddle above the dashed line. That is the list. Sandra checked.' });
      const footTxt = h('span', 'hint', { text: '' });
      const fpBtn = h('button', 'link', { type: 'button', text: 'Conditions of Sale', onclick: openFinePrint });
      const desk = h('div', 'desk', null, capBar, slBox, tender, pscale, pz, recon, hint, h('div', 'foot', null, fpBtn, footTxt));
      const lh = h('div', 'lh', { text: 'IOU: 0' });
      const stpPaid = h('span', 'stp paid', { 'aria-hidden': 'true', text: 'PAID IN FULL' });
      const stpOwe = h('span', 'stp owing', { 'aria-hidden': 'true', text: '1 MEH OWING' });
      const stpRecv = h('span', 'stp recv', { 'aria-hidden': 'true', text: 'RECEIVED (ACCEPTED) (NOT ACCEPTED)' });
      const lis = [0, 1, 2, 3, 4, 5].map(function () { return h('li', '', { hidden: true }); });
      const slots = [];
      for (let i = 0; i < 12; i++) {
        slots.push(h('button', 'env', { type: 'button', hidden: true, 'aria-label': 'Open an envelope', onclick: (function (n) { return function () { openLetter(ENV.length - 1 - n); }; })(i) }, h('i', '', { 'aria-hidden': 'true' })));
      }
      const pile = h('div', 'pile', null, ...slots);
      const moreEl = h('div', 'more', { text: '', hidden: true });
      const replyBtn = h('button', 'btn', { type: 'button', text: 'REPLY', hidden: true, onclick: openReply });
      const payBtn = h('button', 'btn mint', { type: 'button', text: 'PAY IN FULL', hidden: true, onclick: payInFull });
      const weatherBtn = h('button', 'btn', { type: 'button', text: 'Weather (1,204)', onclick: openWeather });
      const vaultBtn = h('button', 'btn', { type: 'button', text: 'Apology Vault', hidden: true, onclick: onVault });
      const certEl = h('div', 'cert', { text: 'CERTIFICATE OF OWNERSHIP (IOU: 1 Meh)', hidden: true });
      const ov = h('div', 'ov', { hidden: true });
      const ledger = h('div', 'ledger', null, h('div', 'lhead', { text: 'IOU (OUTSTANDING) / APOLOGIES (INBOUND)' }), lh,
        h('div', 'lsub', { text: 'AMOUNT OWING: exactly 1 Meh more than you have' }), h('div', 'stamps', null, stpPaid, stpOwe, stpRecv),
        h('ul', 'lines', null, ...lis), pile, moreEl, h('div', 'lb', null, replyBtn, payBtn, weatherBtn, vaultBtn), certEl, ov);
      const banner = h('div', 'banner', { role: 'status', text: 'YOU HAVE WON THE AUCTION HOUSE' });
      const dimEl = h('div', 'dim', { 'aria-hidden': 'true' });
      const lampEl = h('div', 'lamp2', { 'aria-hidden': 'true', text: '💡' });
      const wrap = h('div', 'root', null, board, h('div', 'grid', null, h('div', 'left', null, stage, desk), ledger), banner, dimEl, lampEl);
      root.appendChild(wrap);

      /* ---------- narration, scheduling, board, chant ---------- */
      /* captions hold for a readable time; scheduled lines queue (max 2), lines answering a player action show at once */
      const CQ = []; let capHold = 0;
      function showCap(s, who) {
        capPrev.textContent = capCur.textContent; capCur.textContent = '';
        if (who) capCur.appendChild(h('b', '', { text: who + ': ' }));
        capCur.appendChild(document.createTextNode(s));
        capHold = D(Math.max(1.1, Math.min(5, 0.6 + 0.03 * s.length)));
      }
      function cap(text, who) {
        const s = String(text == null ? '' : text);
        if (!s) return;
        if (capHold > 0 && api.now() - S.uiAt > 80) { CQ.push({ s: s, who: who, t: S.modSec }); if (CQ.length > 2) CQ.shift(); return; }
        showCap(s, who);
      }
      function tickCap(dt) {
        if (capHold > 0) capHold -= dt;
        while (capHold <= 0 && CQ.length) { const q = CQ.shift(); if (S.modSec - q.t < D(9)) showCap(q.s, q.who); }
      }
      function say(text, o) {
        if (S.hush && !(o && o.force)) return false;
        return api.say(String(text), Object.assign({ priority: 0 }, o || {}));
      }
      function mg(text, mood, pri) { return say(text, { who: 'Management', mood: mood || 'neutral', priority: pri == null ? 1 : pri }); }
      function hs(text, pri) { return say(text, { who: HOLLIS, mood: 'neutral', priority: pri || 0 }); }
      function sfx(n) { if (L && (L.silent || (L.kind === 'quiet' && n !== 'pop'))) return; api.sfx(n); }
      function enterPhase(p, len) { S.phase = p; S.t = 0; S.len = len; S.evs = []; }
      function sched(t, fn) { if (S.evs.length < 60) S.evs.push({ t: t, fn: fn }); }
      function later(sec, fn, keep) { if (keep || S.fx.length < 80) S.fx.push({ t: sec, fn: fn }); }
      function tickFx(dt) {
        const f = S.fx;
        for (let i = 0; i < f.length;) {
          f[i].t -= dt;
          if (f[i].t <= 0) { const e = f.splice(i, 1)[0]; e.fn(); } else i++;
        }
      }
      function faint(sec) { cl(hollisEl, 'faint', true); later(sec, function () { cl(hollisEl, 'faint', false); }, true); }
      let bVal = -2;
      function setBoard(v) {
        const key = v == null ? -1 : Math.max(0, Math.floor(num(v)));
        if (key === bVal) return;
        bVal = key;
        if (key < 0) { dgs.forEach(function (d) { txt(d, ''); cl(d, 'dd', false); }); ovf.hidden = true; return; }
        const over = key > 99999, s = String(over ? 99999 : key);
        for (let i = 0; i < 5; i++) {
          const k = i - (5 - s.length), ch = k >= 0 ? s.charAt(k) : '0', d = dgs[i];
          if (d.textContent !== ch) { d.textContent = ch; if (!reduced()) restart(d, 'flip'); }
          cl(d, 'dd', k < 0);
        }
        ovf.hidden = !over; txt(ovf, over ? '+' : '');
      }
      function tickBoard(dt) {
        const a = S.bAnim;
        if (!a) return;
        a.t += dt;
        const p = clamp(a.t / Math.max(0.001, a.dur), 0, 1);
        setBoard(Math.round(a.from + (a.to - a.from) * p));
        if (p >= 1) S.bAnim = null;
      }
      const C = { words: ['...'], pos: 0, shown: 0, wps: 0, blips: 0 };
      const NUMW = /^(\d|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|hundred)/i;
      function paintChant() {
        const n = C.shown, start = Math.max(0, n - 8);
        for (let i = 0; i < 8; i++) {
          const k = start + i, sp = rws[i];
          if (k < n) { const w = C.words[k % C.words.length]; txt(sp, w); cl(sp, 'nm', NUMW.test(w.replace(/[^\w\/-]/g, ''))); sp.hidden = false; }
          else { txt(sp, ''); sp.hidden = true; }
        }
      }
      function setChant(text, wps, who, whisper) {
        C.words = String(text).split(/\s+/).filter(Boolean);
        if (!C.words.length) C.words = ['...'];
        C.pos = 0; C.blips = 0; C.wps = Math.min(8, wps);
        C.shown = (wps <= 0 || reduced()) ? Math.min(8, C.words.length) : 0;
        cl(ribbon, 'whisper', !!whisper); cl(hollisEl, 'still', wps <= 0);
        whoEl.hidden = !who; txt(whoEl, who || '');
        mouth.style.animationDuration = wps > 0 ? (1 / wps).toFixed(3) + 's' : '1s';
        paintChant();
      }
      function tickChant(dt) {
        if (C.wps <= 0 || reduced()) return;
        C.pos += dt * C.wps;
        const target = Math.floor(C.pos);
        if (target > C.shown) {
          while (C.shown < target) {
            const w = C.words[C.shown % C.words.length];
            C.shown++;
            if (C.blips < 4 && NUMW.test(w.replace(/[^\w\/-]/g, ''))) { C.blips++; sfx('blip'); }
          }
          paintChant();
        }
      }
      function chantWps() {
        if (S.cycle > 0) return 10;
        const i = S.idx;
        if (i <= 2) return 5; if (i <= 5) return 7; if (i <= 11) return 9; if (i <= 16) return 11; if (i === 17) return 0;
        if (i <= 23) return 12 + (i - 18) * 0.4; return 14;
      }

      /* ---------- ledger, envelopes, letters, panels ---------- */
      function ledgerLine(t) {
        LL.push(String(t));
        while (LL.length > 6) LL.shift();
        for (let i = 0; i < 6; i++) { const s = LL[i]; lis[i].hidden = s == null; if (s != null) txt(lis[i], s); }
      }
      function paintLedger() {
        txt(lh, (S.debtSold && S.cycle === 0) ? 'YOU OWE A VEGETABLE' : 'IOU: ' + api.fmt(S.iou));
        replyBtn.hidden = !S.replyUnlocked; payBtn.hidden = S.iou < 8;
        txt(weatherBtn, 'Weather (' + api.fmt(S.gb + 1204) + ')');
        vaultBtn.hidden = S.cycle === 0; txt(vaultBtn, 'Apology Vault (' + api.fmt(S.vault) + ' letters, unsent, but ready)');
        cl(wrap, 'warm', S.cycle > 0);
      }
      function mkLetter(o) {
        o = o || {};
        let tier = o.silent ? 4 : tierOf(S.iou);
        if (o.flam) tier = Math.min(12, tier + 1);
        const lt = { tier: tier, flam: !!o.flam, to: o.to || '', sign: o.sign || '', text: o.text || '' };
        if (!lt.text) {
          if (o.gerald) { lt.text = bank('gletters'); lt.sign = 'Gerald (Vice President of Spuds)'; lt.tier = 3; }
          else {
            const v = LETTERS[tier - 1] || LETTERS[0];
            lt.text = o.silent ? LETTERS[3][0] : v[api.randInt(0, v.length - 1)];
            lt.sign = SIGNS[Math.min(3, Math.floor((tier - 1) / 3))];
          }
        }
        return lt;
      }
      function renderPile(dropNew) {
        const n = ENV.length;
        for (let i = 0; i < 12; i++) {
          const lt = ENV[n - 1 - i], s = slots[i];
          s.hidden = !lt;
          if (lt) {
            cl(s, 't2', lt.tier >= 4 && lt.tier < 7); cl(s, 't3', lt.tier >= 7 && lt.tier < 10); cl(s, 't4', lt.tier >= 10);
            s.setAttribute('aria-label', 'Open envelope ' + (i + 1) + (lt.flam ? ' (flamboyant)' : ''));
          }
        }
        moreEl.hidden = n <= 12; txt(moreEl, '+' + (n - 12) + ' more envelopes');
        S.pending = n;
        if (dropNew && n > 0) restart(slots[0], 'drop');
      }
      function dropEnvelope(lt, quiet) {
        ENV.push(lt);
        if (ENV.length > 99) ENV.shift();
        renderPile(true);
        if (!quiet) sfx('bell');
        if (ENV.length >= 20 && !api.flag.get('auction-house.aval')) avalanche();
      }
      function avalanche() {
        api.flag.set('auction-house.aval', true); rainFx('📨'); faint(D(2.5)); sfx('bell'); cap(LN.aval1); api.award(1, 'The Avalanche');
        later(D(3.2), function () { cap(LN.aval2); }, true);
        const lt = mkLetter({ text: LN.aval3, sign: SIGNS[3] }); lt.tier = 12; ENV.push(lt); renderPile(true);
      }
      function openPanel(kind, kids, focusEl, auto) {
        if (auto && PN) return;
        closePanel(true);
        PN = { kind: kind, prev: document.activeElement };
        ov.textContent = '';
        kids.forEach(function (k) { ov.appendChild(k); });
        ov.hidden = false;
        if (!auto) {
          try { ov.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ }
          if (focusEl) { try { focusEl.focus(); } catch (e) { /* ignore */ } }
        }
      }
      function closePanel(skipFocus, kind) {
        if (!PN || (kind && PN.kind !== kind)) return;
        const p = PN;
        PN = null; S.type = null; S.certT = 0; ov.hidden = true; ov.textContent = '';
        if (!skipFocus && p.prev && p.prev.isConnected && wrap.contains(p.prev)) { try { p.prev.focus(); } catch (e) { /* ignore */ } }
      }
      function closeBtn() { return h('button', 'btn', { type: 'button', text: 'Close', dataset: { act: 'close' } }); }
      function openLetter(pos) {
        const lt = ENV[pos];
        if (!lt) return;
        ENV.splice(pos, 1); renderPile(false);
        S.opened++; api.stat.inc('auction-house.letters'); if (S.opened <= 120) api.award(0.2, 'letter'); sfx('sad');
        let ps = '';
        if (S.viewFee) { ps = (S.psAlt = !S.psAlt) ? LN.ps : LN.ps2; S.viewFee = false; }
        const full = 'To ' + (lt.to || api.player.name) + ',\n\n' + lt.text + (ps ? '\n\n' + ps : '') + '\n\n' + (lt.sign ? '- ' + lt.sign : '');
        const paper = h('div', 'paper tier' + lt.tier, { 'aria-hidden': 'true', text: '' });
        const cb = closeBtn();
        const btns = h('div', 'ovbtns', null, cb);
        if (S.replyUnlocked) btns.appendChild(h('button', 'btn mint', { type: 'button', text: 'Reply', dataset: { act: 'reply' } }));
        const kids = [];
        if (lt.flam) kids.push(h('span', 'flamst', { text: 'FLAMBOYANT' }));
        kids.push(paper, h('div', 'sr', { 'aria-live': 'polite', text: full }));
        if (lt.tier >= 10) kids.push(h('div', 'sign', { 'aria-hidden': 'true', text: '🛏' }));
        kids.push(btns);
        openPanel('letter', [h('div', '', { role: 'dialog', 'aria-modal': 'false', 'aria-label': 'Letter', style: 'display:flex;flex-direction:column;gap:8px;flex:1' }, ...kids)], cb);
        if (api.selftest || reduced()) paper.textContent = full; else S.type = { el: paper, full: full, ci: 0, n: -1 };
      }
      function tickType(dt) {
        const T = S.type;
        if (!T) return;
        T.ci += dt / Math.max(0.0001, D(0.022));
        const n = Math.min(T.full.length, Math.floor(T.ci));
        if (T.n !== n) { T.n = n; T.el.textContent = T.full.slice(0, n); }
        if (n >= T.full.length) S.type = null;
      }
      const GREET = ['Dear Sir, Madam or Other', 'To Whom It May Concern, Specifically', 'Dearest Hollis', 'Hello (formal)'];
      const REGRET = ['I regret the regret', 'I am sorry about the sorry', 'I apologise for the apology', 'I am sorry, and in advance of the sorry that follows'];
      const CLOSES = ['Yours, in arrears', 'Yours, still', 'With regards, such as they are', 'Yours, and by yours I mean the 1 Meh'];
      const mkSel = function (label, list, key) {
        return h('label', '', { style: 'font-size:.78rem;font-weight:800' }, label, h('select', 'sel', { dataset: { key: key } }, ...list.map(function (t, i) { return el('option', { value: String(i) }, t); })));
      };
      const replyPv = h('div', 'paper', { 'aria-live': 'polite', text: '' });
      const replyForm = h('form', '', { style: 'display:flex;flex-direction:column;gap:2px', onsubmit: function (e) { e.preventDefault(); if (PN && PN.kind === 'reply') sendReply(); } },
        mkSel('Greeting', GREET, 'g'), mkSel('Regret', REGRET, 'r'), mkSel('Closing', CLOSES, 'c'), replyPv,
        h('div', 'ovbtns', null, h('button', 'btn mint', { type: 'submit', text: 'SEND' }), h('button', 'btn', { type: 'button', text: 'Cancel', dataset: { act: 'close' } })));
      function openReply() {
        if (!S.replyUnlocked) return;
        markInput();
        openPanel('reply', [h('div', 'lhead', { text: 'REPLY (all replies are answered)' }), replyForm], replyForm.querySelector('select'));
        replyPreview();
      }
      function replyPreview() {
        const v = function (k, list) { const s = replyForm.querySelector('select[data-key="' + k + '"]'); return list[clamp(parseInt(s && s.value, 10) || 0, 0, 3)]; };
        txt(replyPv, v('g', GREET) + ', ' + v('r', REGRET) + '. ' + v('c', CLOSES) + '.');
      }
      function sendReply() {
        if (!PN || PN.kind !== 'reply') return;
        closePanel(true);
        restart(stpRecv, 'on'); later(D(3), function () { cl(stpRecv, 'on', false); });
        cap(bank('reply')); sfx('stamp'); if (api.stat.get('auction-house.replies') < 40) api.award(0.6, 'reply sent');
        api.stat.inc('auction-house.replies'); api.achieve('auction-house.reply');
        dropEnvelope(mkLetter(), false); dropEnvelope(mkLetter(), true);
        ledgerLine('Reply received (Accepted) (Not Accepted). Two envelopes sent in apology.');
      }
      function openWeather(auto) {
        if (auto !== true) markInput();
        const items = [];
        for (let i = 0; i < 4; i++) items.push(h('li', '', { text: bank('weatherItems') }));
        const cb = closeBtn();
        openPanel('weather', [h('div', 'lhead', { text: 'WEATHER (FOLDER)' }), h('div', 'paper', { text: sub(MS.m1, { count: api.fmt(S.gb + 1204) }) }), h('ul', 'lines', null, ...items), h('div', 'ovbtns', null, cb)], cb, auto === true);
      }
      const fpBody = h('div', 'fp', { tabIndex: 0, 'aria-label': 'Conditions of Sale', role: 'region' },
        h('p', '', { text: LN.fp1 }), h('p', '', { text: LN.fp2 }), h('p', '', { text: LN.fp3 }), h('p', '', { text: LN.fp4 }));
      const fp12 = h('p', '', { text: LN.fp12, hidden: true });
      fpBody.appendChild(fp12);
      function fpReveal() {
        fp12.hidden = false;
        if (api.flag.get('auction-house.clause')) return;
        api.flag.set('auction-house.clause', true);
        api.award(7.5, 'Clause 12(b)'); cap(LN.fp12); api.sfx('tada');
        paintFoot();
        mg('Clause 12(b) has been found. Clause 12(b) asks that you do not tell Clause 12(a).', 'smug');
      }
      function paintFoot() { txt(footTxt, [api.flag.get('auction-house.pin') ? 'Long Service: TEN' : '', api.flag.get('auction-house.clause') ? 'Clause 7 1/2' : ''].filter(Boolean).join(' / ')); }
      function openFinePrint() {
        markInput();
        S.fpOpens++;
        if (api.flag.get('auction-house.clause')) fp12.hidden = false;
        const cb = closeBtn();
        openPanel('fp', [h('div', 'lhead', { text: 'CONDITIONS OF SALE (abridged, for your comfort)' }), fpBody, h('div', 'ovbtns', null, cb)], cb);
        fpBody.scrollTop = 0;
        cap(LN.sprinkle);
        if (S.fpOpens >= 3) fpReveal();
      }
      function openCert() {
        const cb = closeBtn();
        openPanel('cert', [h('div', 'lhead', { text: 'STRUCK 7 1/2 TIMES' }), h('div', 'cert', { text: ln('g7cert') }), h('div', 'ovbtns', null, cb)], cb, true);
        S.certT = D(6); cap(ln('g7cert'));
      }
      function onVault() { markInput(); cap(ln('vault', { count: api.fmt(S.vault) })); api.sfx('pop'); }
      function payInFull() {
        markInput();
        if (S.iou < 8) return;
        S.iou = Math.max(1, Math.floor(S.iou / 2));
        paintLedger();
        restart(stpPaid, 'on'); restart(stpOwe, 'on');
        later(D(5), function () { cl(stpPaid, 'on', false); cl(stpOwe, 'on', false); });
        ledgerLine('PAID IN FULL / 1 MEH OWING (one line, two stamps)');
        restart(wallet, 'fly'); cap(bank('pay')); sfx('stamp'); api.award(0.5, 'pay in full');
      }
      api.on(ov, 'click', function (e) {
        const b = e.target && e.target.closest ? e.target.closest('[data-act]') : null;
        if (!b) return;
        markInput();
        const act = b.getAttribute('data-act');
        if (act === 'close') closePanel(false);
        else if (act === 'reply') { closePanel(true); openReply(); }
      });
      api.on(ov, 'change', function () { replyPreview(); });
      api.on(ov, 'scroll', function (e) {
        if (e.target === fpBody && fpBody.scrollTop + fpBody.clientHeight >= fpBody.scrollHeight - 2) fpReveal();
      }, true);

      /* ---------- input: paddle, slider, keyboard ---------- */
      const clothSlot = h('span', '', { hidden: true }, h('span', 'cloth', { 'aria-hidden': 'true' }));
      const clothEl = clothSlot.firstChild;
      card.insertBefore(clothSlot, postmark);
      const boxEl = h('span', 'bx', { 'aria-hidden': 'true' });
      const winEl = h('span', 'win', { 'aria-hidden': 'true' });
      const plantEl = h('span', 'plant', { 'aria-hidden': 'true', text: '🌿' });
      function markInput(passive) {
        S.lastInput = api.now(); if (!passive) S.uiAt = S.lastInput;
        if (S.idleStage >= 4) wake(S.idleStage);
        S.idleStage = 0;
      }
      function wake(st) {
        S.paused = false; cl(wrap, 'closed', false); cl(stage, 'stack', false);
        const t = bank(st >= 7 ? 'idleBack2' : 'idleBack'); cap(t); hs(t, 1);
      }
      function onExit() {
        markInput(); restart(exitBtn, 'wobble'); api.stat.inc('auction-house.exits');
        if (++S.exitN !== 7) { cap(bank('exit')); return; }
        cap(LN.exit7); hs(LN.exit7, 1); sfx('tada'); api.achieve('auction-house.exit');
        if (!api.flag.get('auction-house.sign')) { api.flag.set('auction-house.sign', true); api.award(3, 'The true sign'); }
      }
      function eyeFrac() { return L && L.silent ? 0.25 : 0.6; }
      function startH() { return L && L.silent ? 0.42 : 0.72; }
      function setPh(v) { S.ph = clamp(v, 0, 1); pz.style.setProperty('--ah-ph', String(S.ph)); }
      function lowerPaddle() { setPh(REST); S.phT = 0; paddle.style.setProperty('--ah-tilt', '0deg'); cl(wrap, 'droop', false); }
      function tapRaise(hh, dur) { setPh(hh); S.phT = dur; }
      function onPaddleDown(e) {
        markInput();
        if (G) endGesture();
        G = { src: 'ptr', t0: api.now(), maxH: startH(), id: e ? e.pointerId : null, long: false, d20: false, d40: false };
        try { if (e && e.pointerId != null && paddle.setPointerCapture) paddle.setPointerCapture(e.pointerId); } catch (x) { /* fuzz: no active pointer */ }
        cl(wrap, 'drag', true); setPh(G.maxH);
      }
      function dragGesture(e) {
        const r = pz.getBoundingClientRect();
        let v = startH();
        if (r.height > 0 && Number.isFinite(e.clientY)) v = clamp((r.bottom - e.clientY) / r.height, 0, 1);
        v = Math.max(startH(), v);
        G.maxH = Math.max(G.maxH, v); setPh(v);
        const pr = paddle.getBoundingClientRect();
        if (pr.width > 0 && Number.isFinite(e.clientX)) paddle.style.setProperty('--ah-tilt', clamp((e.clientX - (pr.left + pr.width / 2)) / pr.width * 14, -12, 12).toFixed(1) + 'deg');
      }
      function endGesture() {
        if (!G) return;
        const g = G;
        G = null; cl(wrap, 'drag', false);
        try { if (g.id != null && paddle.releasePointerCapture) paddle.releasePointerCapture(g.id); } catch (x) { /* ignore */ }
        S.gestureAt = api.now();
        registerRaise(g.maxH, g.src);
        lowerPaddle();
      }
      function onPaddleClick() {
        if (api.now() - S.gestureAt < 80) return;
        markInput();
        registerRaise(startH(), 'click');
        tapRaise(startH(), D(0.4));
      }
      function registerRaise(mh, src) {
        const now = api.now();
        api.stat.inc('auction-house.raises');
        S.raises.push(now);
        while (S.raises.length && now - S.raises[0] > 4000) S.raises.shift();
        markInput();
        S.gestureAt = now;
        if (S.raises.length >= 25 && now > S.fanCool) { startFan(S.raises.length); return; }
        let n3 = 0;
        for (let i = S.raises.length - 1; i >= 0 && now - S.raises[i] <= 3000; i--) n3++;
        if (n3 >= 12 && now > S.waveCool) { S.waveCool = now + 6000; api.toast(LN.spamtoast); cap(bank('spamWave')); sfx('buzz'); return; }
        if (S.fanT > 0 && (S.spoonN = (S.spoonN || 0) + 1) % 4 === 1) cap(bank('spoon'));
        if (!L) return;
        if (L.debtLive && S.phase === 'settle') { debtBid(); return; }
        if (S.phase === 'quiet') { cap(S.touchI++ % 2 ? LN.touch2 : LN.touch1); return; }
        if (S.phase !== 'bidding') {
          if (S.phase !== 'curtain' && now - (S.lateAt || 0) > 1500) { S.lateAt = now; cap(bank('paddleLate')); }
          return;
        }
        if (L.silent && mh > 0.5 && !L.shh) { L.shh = true; cap(LN.shh); }
        if (mh >= eyeFrac()) {
          const first = !L.valid;
          L.valid = true; S.silenceNext = false;
          S.lastBids.push(S.sv);
          if (S.lastBids.length > 3) S.lastBids.shift();
          if (first) { L.early = true; S.callT = Math.max(S.callT, D(0.4)); cap(bank('early')); }
          if (mh >= 0.9 && !L.silent) { S.flam = true; if (S.flamLots <= 0) { S.flamLots = 3; cap(bank('paddleFlam')); } }
          if (S.tender === 'pot') {
            if (!L.potSaid) { L.potSaid = true; cap(LN.tenderh); }
            if (S.rateCool <= 0 && api.chance(0.5)) { S.rateCool = 3; later(D(1.5), function () { cap(bank('rate')); }); }
          }
          if (S.lastBids.length === 3 && S.lastBids[0] === S.lastBids[1] && S.lastBids[1] === S.lastBids[2] && !L.R.same) { L.R.same = 1; cap(LN.same); }
        } else if (!L.lowSaid) { L.lowSaid = true; cap(bank('paddleLow')); }
      }
      function debtBid() { const n = api.now(); if (n - (S.debtAt || 0) < 1800) return; S.debtAt = n; cap(bank('debtbid')); sfx('blip'); api.stat.inc('auction-house.debtBids'); }
      function startFan(n) {
        S.fanCool = api.now() + 10000; S.fanT = D(4); S.spoonN = 0;
        cl(wrap, 'spoon', true); cl(gallery, 'heads', true); cl(pile, 'breeze', true);
        const t = sub(FAN[Math.min(S.fans++, FAN.length - 1)], { count: n });
        cap(t); hs(t, 1); sfx('buzz');
        later(D(1.2), function () { cap(bank('surch')); });
        later(D(2.4), function () { cap(bank('heads')); });
        api.award(2, 'ceiling fan'); api.achieve('auction-house.fan'); api.stat.inc('auction-house.spams');
      }
      function tickGesture(dt) {
        const now = api.now();
        if (G) {
          const held = now - G.t0;
          if (G.src === 'key' && !G.long && held > D(1.2) * 1000) { G.long = true; G.maxH = Math.max(G.maxH, 0.95); setPh(0.95); }
          if (!G.d20 && held > D(20) * 1000) { G.d20 = true; cl(wrap, 'droop', true); cap(LN.hold20); }
          if (!G.d40 && held > D(40) * 1000) { G.d40 = true; cap(LN.hold40); }
        } else if (S.phT > 0) { S.phT -= dt; if (S.phT <= 0) lowerPaddle(); }
        else if (S.ph > REST + 0.001) lowerPaddle();
        if (S.fanT > 0) {
          S.fanT -= dt;
          if (S.fanT <= 0) { cl(wrap, 'spoon', false); cl(gallery, 'heads', false); cl(pile, 'breeze', false); cap(bank('spret')); }
        }
        if (S.trailCD > 0) S.trailCD -= dt;
        if (S.lateAt === undefined) S.lateAt = 0;
      }
      function escapeLayer() {
        if (PN) closePanel(false);
        G = null; cl(wrap, 'drag', false); lowerPaddle();
      }
      function setBid(v) { sl.value = String(clamp(Math.round(v * 2) / 2, 0, S.max)); onSlider(); }
      function onKeyDown(e) {
        markInput();
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const t = e.target, tag = t && t.tagName ? String(t.tagName).toUpperCase() : '', k = e.key;
        if (k === 'Escape') { escapeLayer(); return; }
        if (tag === 'SELECT' || tag === 'TEXTAREA' || (tag === 'INPUT' && t.type !== 'range')) return;
        if (!sl.disabled && (t === sl || t === paddle || tag === 'BODY')) {
          let nv = null;
          if (k === 'ArrowLeft') nv = S.sv - (e.shiftKey ? 0.5 : 1);
          else if (k === 'ArrowRight') nv = S.sv + (e.shiftKey ? 0.5 : 1);
          else if (t === sl && k === 'PageUp') nv = S.sv + 10;
          else if (t === sl && k === 'PageDown') nv = S.sv - 10;
          else if (t === sl && k === 'Home') nv = 0;
          else if (t === sl && k === 'End') nv = S.max;
          if (nv != null) { e.preventDefault(); setBid(nv); return; }
        }
        if (/^[1-9]$/.test(k) && !sl.disabled) { setBid(S.max * parseInt(k, 10) / 10); return; }
        if ((k === 'v' || k === 'V') && !e.repeat) { viewLot(); return; }
        if ((k === 'r' || k === 'R') && !e.repeat) { openReply(); return; }
        if (k === ' ' || k === 'Spacebar') {
          if (tag === 'BUTTON' && t !== paddle) return;
          e.preventDefault();
          if (!e.repeat && !G) { G = { src: 'key', t0: api.now(), maxH: startH(), id: null, long: false, d20: false, d40: false }; setPh(G.maxH); }
          return;
        }
        if (k === 'Enter' && (t === paddle || (tag !== 'BUTTON' && tag !== 'A' && tag !== 'INPUT'))) {
          e.preventDefault();
          if (!e.repeat) { registerRaise(startH(), 'enter'); tapRaise(startH(), D(1)); }
        }
      }
      function onKeyUp(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
          if (G && G.src === 'key') { e.preventDefault(); endGesture(); }
          else if (e.target === paddle) e.preventDefault();
        }
      }
      api.on(document, 'keydown', onKeyDown);
      api.on(document, 'keyup', onKeyUp);
      let lastPX = -1, lastPY = -1;
      api.on(document, 'pointermove', function (e) {
        const dx = e.clientX - lastPX, dy = e.clientY - lastPY;
        if (!(lastPX >= 0) || Math.hypot(dx, dy) > 8) { lastPX = e.clientX; lastPY = e.clientY; markInput(true); }
        if (G && G.src === 'ptr') dragGesture(e);
      });
      api.on(document, 'pointerdown', function () { markInput(true); });
      api.on(document, 'touchstart', function () { markInput(true); }, { passive: true });
      api.on(document, 'wheel', function () { markInput(true); }, { passive: true });
      api.on(document, 'input', function () { markInput(true); });
      api.on(document, 'pointerup', function () { if (G && G.src === 'ptr') endGesture(); });
      api.on(document, 'pointercancel', function () { if (G && G.src === 'ptr') endGesture(); });
      api.on(paddle, 'lostpointercapture', function () { endGesture(); });
      api.on(window, 'blur', function () { endGesture(); });
      api.on(wrap, 'click', function (e) {
        const b = e.target && e.target.closest ? e.target.closest('button') : null;
        if (b && b !== gavelBtn) S.gavelRun = 0;
      });
      api.on(sl, 'input', function () { markInput(); onSlider(); });
      api.on(pile, 'mousemove', function () {
        const now = api.now();
        if (now - (S.jigAt || 0) > 600) { S.jigAt = now; if (!slots[0].hidden) restart(slots[0], 'jig'); }
      });

      /* slider, tender */
      function rate() { return 0.4 + 7.1 * (0.5 + 0.5 * Math.sin(S.modSec / 9)); }
      function paintSliderLabel() {
        const v = S.sv;
        if (S.tender === 'pot') txt(slLab, 'Your bid: ' + fmtBid(v) + ' potatoes (about ' + fmtBid(Math.round(v * rate() * 2) / 2) + ' Meh at today\'s rate)');
        else txt(slLab, 'Your bid: ' + fmtBid(v) + ' Meh');
        sl.setAttribute('aria-valuetext', bidWords(v) + (S.tender === 'pot' ? ' potatoes' : ' Meh'));
      }
      function onSlider(quiet) {
        const v = clamp(parseFloat(sl.value), 0, S.max), prev = S.sv;
        S.sv = v;
        paintSliderLabel();
        const frac = S.max > 0 ? v / S.max : 0;
        gallery.style.setProperty('--ah-lean', ((frac - 0.5) * 10).toFixed(1) + 'deg');
        if (quiet === true || !L) return;
        if (L.debtLive && S.phase === 'settle' && v !== prev) debtBid();
        if (S.phase === 'bidding') {
          const R = L.R;
          if (v === 0 && !R.zero) { R.zero = 1; cap(LN.zero); }
          else if (v >= S.max && !R.max) { R.max = 1; cap(LN.max); }
          else if (v > 0 && v === Math.round(S.max / 2) && !R.mid) { R.mid = 1; cap(LN.mid); }
        }
        if (v >= S.max * 0.98 && S.rumorT < 0 && S.max < 1e6) S.rumorT = D(0.4);
        if (!gm.hidden && S.trailCD <= 0 && S.max > 0 && (prev / S.max < S.gpos) !== (frac < S.gpos)) {
          S.trailCD = D(1.5); restart(seats.gerald, 'bounce');
          trail.style.left = 'calc(22px + (100% - 44px) * ' + frac.toFixed(3) + ')'; restart(trail, 'on');
        }
      }
      function tickSlider(dt) {
        if (S.rumorT >= 0) {
          S.rumorT -= dt;
          if (S.rumorT < 0) {
            S.rumorT = -1;
            if (num(parseFloat(sl.value)) >= S.max * 0.98 && S.max < 1e6) {
              S.max = Math.min(1e6, S.max + 1); sl.max = String(S.max);
              if (!S.beats.trk) { S.beats.trk = 1; api.toast(LN.trk); }
              if (L && !L.R.rumor) { L.R.rumor = 1; cap(LN.rumor); }
              else if (L && S.max - S.base >= 60 && !L.R.far2) { L.R.far2 = 1; cap(LN.far2); }
              else if (L && S.max - S.base >= 20 && !L.R.far1) { L.R.far1 = 1; cap(LN.far1); }
              onSlider(true);
            }
          }
        }
        if (S.tender === 'pot') { S.labT = (S.labT || 0) - dt; if (S.labT <= 0) { S.labT = 0.5; paintSliderLabel(); } }
      }
      function setTender(t) {
        markInput();
        if (S.tender === t) return;
        S.tender = t;
        tbMeh.setAttribute('aria-pressed', t === 'meh' ? 'true' : 'false'); tbPot.setAttribute('aria-pressed', t === 'pot' ? 'true' : 'false');
        cap(t === 'pot' ? LN.tpot : LN.tmeh); api.sfx('pop');
        paintSliderLabel();
      }

      /* ---------- the room: Hollis, gavel, seats, Gerald, cameos ---------- */
      function onHollis() {
        markInput(); S.hClicks++;
        restart(hbtn, 'wobble');
        if (S.hClicks === 7) cap(LN.heckle7);
        else if (S.hClicks === 15) { cap(LN.heckle15); faint(D(2.5)); S.junior = true; }
        else if (S.hClicks === 25) cap(LN.heckle25);
        else if (S.hClicks % 3 === 0) cap(bank('heckle'));
      }
      function onGavel() {
        markInput();
        if (S.phase === 'hammer') return;
        restart(gavelBtn, 'swing');
        cap(bank('gavel')); api.stat.inc('auction-house.gavels');
        S.gavelRun++;
        if (S.gavelRun >= 7) { S.gavelRun = 0; S.g7 = true; cap(LN.g71); hs(LN.g71, 1); sfx('bell'); }
      }
      function paintGavelTiny() { tinyG.hidden = !api.flag.get('auction-house.gaveled'); txt(tinyG, '🔨'); }
      function onSeat(key) {
        markInput();
        const arr = ROOM[key];
        if (!arr) return;
        let i = api.randInt(0, arr.length - 1);
        if (i === S.roomLast[key]) i = (i + 1) % arr.length;
        S.roomLast[key] = i;
        restart(seats[key], 'bounce'); cap(arr[i]); sfx('pop');
      }
      function updateSeats() {
        const all = S.cycle > 0, i = S.idx;
        const has = { gerald: all || i >= 3, dennis: all || i >= 8, toaster: all || i >= 9, sandra: all || i >= 8 || !!(L && L.sandraSeat) };
        seatDefs.forEach(function (d) { seats[d[0]].disabled = !has[d[0]]; });
        cl(seats.gerald, 'big', all);
        pscale.hidden = !has.gerald; tender.hidden = !(all || i >= 5);
        if (!tender.hidden) { /* nothing else */ } else { S.tender = 'meh'; }
      }
      function geraldBid() {
        if (S.phase !== 'bidding' || !L) return;
        const e = LADDER[S.gb % LADDER.length], n = S.gb;
        S.gb++; L.gbid = true;
        let t = e[0];
        if (!S.geraldMet) { S.geraldMet = true; if (api.flag.get('metGerald')) t = 'We met in the interview. ' + t; }
        cap(t, 'Gerald'); sfx('honk'); api.stat.inc('auction-house.potatoBids');
        txt(pstack, '🥔'.repeat(clamp(e[1], 1, 20))); txt(pnote, 'Gerald\'s stack: ' + e[1] + (e[1] === 1 ? ' potato' : ' potatoes'));
        const x = (S.cycle ? S.lotsEver : S.idx) * 0.618;
        S.gpos = 0.12 + 0.76 * (x - Math.floor(x));
        gm.hidden = false; gm.style.left = (S.gpos * 100).toFixed(1) + '%';
        restart(seats.gerald, 'bounce'); paintLedger();
        const r = GREJECT[n < GREJECT.length ? n : 2 + ((n - GREJECT.length) % (GREJECT.length - 2))];
        sched(S.t + D(1.5), function () { cap(r); });
      }
      function cameo() {
        if (S.phase !== 'bidding' || !L || L.cameo) return;
        L.cameo = true;
        let t = bank('cameo');
        if (/Toaster/.test(t)) { api.sfx('pop'); restart(seats.toaster, 'bounce'); if (api.stat.get('toaster-debate.entered') > 0) t += ' ' + LN.tdebate; }
        else if (/Dennis/.test(t)) { restart(seats.dennis, 'bounce'); if (api.flag.get('metDennis') && !S.beats.df) { S.beats.df = 1; t += ' ' + LN.dflag; } }
        else if (/sprout/.test(t)) { sprout.hidden = false; sprout.style.left = '94%'; later(D(2.5), function () { sprout.hidden = true; }, true); }
        else if (/Sandra/.test(t)) restart(seats.sandra, 'bounce');
        cap(t);
      }

      /* ---------- lot card: viewing, box, window, cloth ---------- */
      function paintBox() { const w = [74, 54, 36, 22][L ? clamp(L.boxN, 0, 3) : 0]; boxEl.style.width = w + 'px'; boxEl.style.height = Math.round(w * 0.7) + 'px'; }
      function viewLot() {
        if (!L || L.viewed || (S.phase !== 'curtain' && S.phase !== 'bidding') || L.kind === 'quiet') return false;
        L.viewed = true; L.viewT = D(4); L.viewDone = false; vchip.hidden = true;
        cl(card, 'viewing', true);
        const vt = L.kind === 'box' ? LN.boxview : (L.def.view || bank('view'));
        txt(viewTxt, vt); viewArt.textContent = '';
        if (L.kind === 'box') { viewArt.appendChild(boxEl); paintBox(); }
        else if (L.idx === 2 && S.cycle === 0) viewArt.appendChild(winEl);
        cap(vt); api.award(0.1, 'viewing'); api.stat.inc('auction-house.views'); S.viewFee = true; sfx('pop');
        return true;
      }
      function endView() {
        if (!L) return;
        cl(card, 'viewing', false);
        if (!L.viewDone) { L.viewDone = true; if (L.kind !== 'box' && !L.blinked) cap(bank('view')); }
      }
      function onCard(e) {
        markInput();
        if (!L) return;
        if (L.kind === 'cloth' && !L.lifted) { L.clothN++; if (L.clothN >= 5) liftCloth(); }
        if (L.viewT > 0) {
          if (L.kind === 'box') boxClick();
          else if (L.idx === 2 && S.cycle === 0 && e && (e.detail === 0 || (e.target && e.target.closest && e.target.closest('.' + PF + 'win')))) winClick();
        } else if (!viewLot() && L.kind !== 'quiet' && ++L.cardN % 6 === 0) cap(bank('card'));
      }
      function boxClick() {
        L.boxN = Math.min(3, L.boxN + 1); sfx('pop'); paintBox();
        cap([LN.box1, LN.box2, LN.box3][L.boxN - 1]);
        if (L.boxN === 3) txt(cname, 'A box (Lot 7 (Smallest))');
      }
      function winClick() {
        L.winN++;
        if (L.winN >= 3 && !L.blinked) {
          L.blinked = true; viewArt.textContent = ''; viewArt.appendChild(plantEl);
          cap(LN.blink1); api.achieve('auction-house.window');
          const lot = L;
          later(D(2), function () { if (L !== lot) return; viewArt.textContent = ''; viewArt.appendChild(winEl); cap(LN.blink2); });
        }
      }
      function liftCloth() {
        L.lifted = true; cl(clothEl, 'lifted', true); cap(LN.clift); faint(D(2.5)); api.achieve('auction-house.torn'); sfx('pop');
      }

      /* ---------- lots and the phase machine ---------- */
      function lotDef() {
        if (S.cycle > 0) {
          const n = S.cont;
          if (n === 1) return { label: '1 (continued)', name: LOTS[0][1] + ' (Pre-owned, Again).', blurb: LOTS[0][2], view: LOTS[0][3], emoji: LOTS[0][4] };
          if (!S.cbag.length) {
            const pool = [];
            for (let i = 0; i < CONT.length; i++) pool.push(i);
            REUSE.forEach(function (r) { pool.push(100 + r); });
            S.cbag = api.shuffle(pool);
          }
          const k = S.cbag.pop();
          if (k >= 100) { const e = LOTS[k - 101]; return { label: n + ' (continued)', name: e[1], blurb: e[2], view: e[3], emoji: e[4] }; }
          return { label: n + ' (continued)', name: CONT[k][0], blurb: CONT[k][1], view: '', emoji: CONT[k][2] };
        }
        const e = LOTS[S.idx - 1] || LOTS[0];
        return { label: e[0], name: e[1], blurb: e[2], view: e[3], emoji: e[4] };
      }
      function kindOf() { return S.cycle > 0 ? 'normal' : ({ 7: 'box', 14: 'cloth', 17: 'quiet', 24: 'final' }[S.idx] || 'normal'); }
      function chantText() {
        if (L.silent) return bank('whisper');
        const i = S.cycle === 0 ? S.idx : 0;
        let t = (S.cycle === 0 && i >= 1 && i <= 4) ? CHANT_LOT[i - 1] : bank('chant');
        if (i >= 3 || S.cycle > 0) t = t.replace(/\.$/, '') + ', and one.';
        return t;
      }
      function showCall(n) {
        txt(callTxt, n === 0 ? 'GOING ONCE' : n === 1 ? 'GOING TWICE' : bank('going3'));
        restart(callTxt, 'pulse'); cl(lamps[n], 'lit', true);
      }
      function enterCurtain() {
        /* slow or long sessions skip filler lots only; the must-see lots (cloth, 7 1/2, the debt, the purpose, the weekend) always run */
        if (S.cycle === 0 && S.idx < 24 && S.idx >= 14 && S.actSec >= D(600)) S.idx = [14, 17, 20, 22, 23, 24].filter(function (m) { return m >= S.idx; })[0];
        if (S.cycle > 0) S.cont++;
        S.chaseCool = Math.max(0, S.chaseCool - 1); S.flamLots = Math.max(0, S.flamLots - 1); S.goCool = Math.max(0, S.goCool - 1); S.rateCool = Math.max(0, S.rateCool - 1);
        const cyc0 = S.cycle === 0, idx = S.idx, kind = kindOf(), def = lotDef();
        const silent = cyc0 && (idx === 10 || idx === 11), sig = cyc0 && (idx === 12 || idx === 13), fin = kind === 'final' && cyc0;
        L = { def: def, kind: kind, idx: idx, silent: silent, sig: sig, valid: false, bid: 0, early: false, snap: 0, price: 1, viewed: false, viewT: 0, shh: false, exact: false,
          silenceWins: false, rare: '', gbid: false, cameo: false, R: {}, boxN: 0, winN: 0, clothN: 0, cardN: 0, sigDone: false, sigOpen: false, sigT: 0, finalized: false, lowSaid: false, potSaid: false };
        S.hClicks = 0; S.hush = kind === 'quiet'; S.bAnim = null;
        if (S.cycle > 0 && S.cont >= 20 && !S.cb20) { S.cb20 = true; mg(bank('contlot'), 'confused'); }
        eye.style.bottom = (silent ? 25 : 60) + '%'; txt(eyeLab, silent ? 'EYELINE (polite, lowered): drag past it' : 'EYELINE (polite): drag up past it');
        vchip.hidden = kind === 'quiet';
        S.max = clamp(Math.ceil(bal()) + 2, 3, 1e6); sl.max = String(S.max); sl.disabled = kind === 'quiet'; S.base = S.max;
        sl.value = String(clamp(num(parseFloat(sl.value)), 0, S.max)); onSlider(true);
        txt(plate, fin ? 'FINAL LOT' : 'LOT ' + def.label);
        txt(clab, 'LOT ' + def.label + (kind === 'quiet' ? ' (returned from filing)' : '')); txt(cname, def.name); txt(cblurb, def.blurb); txt(art, def.emoji);
        clothSlot.hidden = kind !== 'cloth'; cl(clothEl, 'lifted', false);
        postmark.hidden = !(cyc0 && idx === 11 && api.stat.get('sock-matcher.entered') > 0); txt(postmark, LN.sockpm);
        if (cyc0 && idx === 11 && api.flag.get('sockSeen')) later(D(1.8), function () { cap(LN.sockflag); });
        holding.hidden = true; cl(card, 'viewing', false); cl(stage, 'shh', false); cl(wrap, 'freeze', false); cl(wrap, 'dark', false);
        txt(stampEl, 'SOLD'); cl(stampEl, 'on', false); cl(stamp2, 'on', false); restart(card, 'slide');
        lamps.forEach(function (l) { cl(l, 'lit', false); }); txt(callTxt, '');
        txt(plusEl, S.cb20 ? 'Next lot: +1' : (!cyc0 || api.chance(0.25)) ? '(+1)' : '');
        api.setTitle('The Auction House (Lot ' + def.label + (S.first && S.resumed && cyc0 ? ', continued' : '') + ')');
        if (kind === 'quiet') setBoard(null);
        else {
          setBoard(S.lastPrice);
          if (S.lotsSession > 0 && S.chaseCool <= 0 && !fin) {
            const to = Math.floor(bal()) + 1;
            if (to !== S.lastPrice) { S.bAnim = { from: S.lastPrice, to: to, t: 0, dur: D(0.4) }; cap(bank('chase')); S.chaseCool = 3; }
          }
        }
        const who = S.junior ? 'NERVOUS JUNIOR (Intern)' : '';
        S.curWho = who; S.junior = false;
        if (kind === 'quiet') setChant(LN.q1, 0, who);
        else if (silent) setChant(bank('whisper'), 3, who, true);
        else setChant(fin ? LN.e1 : 'Lot ' + def.label + ', ' + def.name.replace(/\.$/, '') + ', offered in good order, viewing free, bids welcome.', 6, who);
        enterPhase('curtain', D(kind === 'quiet' ? 3 : 2.5));
        const special = kind !== 'normal' || silent || sig || (cyc0 && (idx === 20 || idx === 22));
        if (!special && idx >= 6 && !(S.cycle > 0 && S.cont === 1)) { const q = api.rand(); L.rare = q < 0.02 ? 'sandra' : q < 0.032 ? 'presold' : q < 0.047 ? 'recall' : q < 0.059 ? 'twin' : ''; }
        if (RARE[L.rare]) { L.sandraSeat = L.rare === 'sandra'; txt(stampEl, RARE[L.rare][0]); restart(stampEl, 'on'); cap(LN[L.rare]); }
        if (L.rare === 'presold') { lamps.forEach(function (l) { cl(l, 'lit', true); }); txt(callTxt, 'SOLD BEFORE OPENING'); }
        updateSeats(); paintLedger();
        if (S.first) {
          S.first = false;
          if (S.resumed) mg(ln('resume', { count: def.label }), 'smug');
          else { mg(ln('opener'), 'proud'); cl(stage, 'shut', true); later(D(0.5), function () { cl(stage, 'shut', false); sfx('whoosh'); }, true); }
        }
        const bm = { 2: 'envelopefirst', 3: 'geraldarrives', 6: 'strange', 8: 'gallery', 10: 'silentstart', 12: 'committee', 13: 'replyopen' };
        if (cyc0 && bm[idx] && !S.beats[idx]) { S.beats[idx] = 1; mg(LN[bm[idx]], idx === 6 ? 'confused' : 'smug'); }
        if (cyc0 && idx === 13 && !S.replyUnlocked) { S.replyUnlocked = true; paintLedger(); }
        if (cyc0 && idx === 10) { cap(LN.silentintro); later(D(2.5), function () { cap(LN.sileye); }); }
        if (cyc0 && idx === 16 && !S.beats.nev) { S.beats.nev = 1; cap(LN.never); hs(LN.never, 1); }
        if (fin) { cap(LN.e1); hs(LN.e1, 1); }
        if (S.cycle > 0 && S.cont === 1) { cap(LN.ewelcome); hs(LN.ewelcome, 1); }
      }
      function leaveCurtain() { if (L.kind === 'quiet') enterQuiet(); else if (L.rare) enterHammer(); else enterBidding(); }
      function enterBidding() {
        enterPhase('bidding', 1e9);
        S.call = 0; S.callT = 0; S.bStart = Math.max(0, bVal);
        setChant(chantText(), chantWps(), S.curWho, L.silent);
        showCall(0);
        if (S.cycle > 0 && S.cont === 1) {
          sched(D(1.5), function () { L.gbid = true; cap(LN.eg1); sfx('honk'); });
          sched(D(2.9), function () { cap(LN.eg2); });
          sched(D(4.3), function () { cap(LN.eg3); });
        } else if (S.cycle > 0 || S.idx >= 3) sched(D(1.5), geraldBid);
        if (S.cycle > 0 || S.idx >= 8) sched(D(4.2), cameo);
        if (S.cycle === 0 && S.idx === 1) sched(D(3), function () { cap(LN.how); restart(paddle, 'wobble'); });
        else if (S.cycle === 0 && S.idx === 2) { sched(D(2.5), function () { cap(LN.radiator, 'Hollis'); }); sched(D(6.5), function () { cap(LN.sliderhint, 'Hollis'); }); }
        if (S.stillRun >= 3 && !S.beats.rc && L.kind === 'normal' && !L.silent && !L.sig && !L.rare) sched(D(1), recount);
        if (api.flag.get('auction-house.exact75') && api.chance(1 / 6)) sched(D(2), function () { cap(LN.exhint); });
      }
      function tickBidding(dt) {
        S.callT += dt;
        const target = Math.floor(bal()) + 1, q = Math.floor(clamp(S.t / D(7), 0, 1) * 7) / 7;
        if (!S.bAnim) setBoard(Math.round(S.bStart + (target - S.bStart) * q));
        if (S.callT >= (L.early ? D(1.2) : D(3))) { S.callT = 0; S.call++; if (S.call > 2) enterHammer(); else showCall(S.call); }
      }
      function enterHammer() {
        const snap = Math.floor(bal()), price = snap + 1, fin = L.kind === 'final' && S.cycle === 0;
        L.snap = snap; L.price = price; L.bid = L.valid ? clamp(S.sv, 0, 1e6) : 0;
        if (S.silenceNext && !fin) { S.silenceNext = false; L.silenceWins = true; L.valid = false; L.bid = 0; }
        L.exact = !L.silenceWins && L.valid && L.bid === 7.5 && !fin;
        enterPhase('hammer', D(1.2) + (L.shh ? D(3) : 0) + (L.exact ? D(1.5) : 0));
        S.bAnim = null; setBoard(price); txt(boardSr, 'Price: ' + api.fmt(price) + ' Meh'); txt(callTxt, '');
        restart(gavelBtn, 'swing');
        if (L.shh) { cl(stage, 'shh', true); api.sfx('pop'); } else sfx('stamp');
        txt(stampEl, RARE[L.rare] ? RARE[L.rare][0] : 'SOLD'); restart(stampEl, 'on'); vchip.hidden = true;
        later(D(0.3), function () { sfx('ding'); });
        if (L.kind === 'cloth') later(D(0.5), function () { restart(stamp2, 'on'); cap(LN.cmiss); });
        let line;
        if (fin) { line = ln('e2'); sfx('fanfare'); api.confetti(); cl(stage, 'open', true); cl(banner, 'on', true); }
        else if (L.silenceWins) line = LN.idlesold;
        else if (S.lotsEver === 0) line = LN.h1;
        else if (L.silent) line = bank('hammerSoft');
        else line = bank('hammer', { meh: api.fmt(snap), count: api.fmt(price) });
        cap(line);
        S.hamN = (S.hamN || 0) + 1;
        if (fin || S.hamN % 3 === 0) hs(line, fin ? 1 : 0);
        if (L.exact) { cl(wrap, 'freeze', true); cl(wrap, 'dark', true); cap(LN.ex1); later(D(1.5), function () { cl(wrap, 'freeze', false); cl(wrap, 'dark', false); }); }
        if (L.valid) S.stillRun = 0;
        else if (!L.silenceWins && !L.rare && !fin) { api.stat.inc('auction-house.silences'); S.stillRun++; L.still = true; }
      }
      function recount() {
        S.beats.rc = 1; S.stillRun = 0; cl(hollisEl, 'up', true); sfx('honk'); cap(LN.rc1);
        later(D(2.6), function () { cap(LN.rc2); sfx('tick'); if (S.phase === 'bidding') S.bAnim = { from: Math.max(0, bVal), to: Math.max(0, bVal) + 37, t: 0, dur: D(2.2) }; }, true);
        later(D(6), function () { cl(hollisEl, 'up', false); cap(LN.rc3); sfx('tada'); api.award(1.5, 'The Recount'); api.achieve('auction-house.recount'); }, true);
      }
      function padTo(s, n) { s = String(s); while (s.length < n) s = ' ' + s; return s.slice(-n); }
      function paintOdo(str, n) {
        const p = padTo(str, n);
        for (let i = 0; i < 8; i++) { const k = i - (8 - n), c = ocs[i]; c.hidden = k < 0; if (k >= 0) txt(c, p.charAt(k) === ' ' ? '' : p.charAt(k)); }
      }
      function enterRecon() {
        enterPhase('recon', D(8));
        const old = String(Math.floor(clamp(L.bid, 0, 99999999))), nw = String(Math.floor(clamp(L.price, 0, 99999999)));
        const n = Math.max(old.length, nw.length), po = padTo(old, n), pn = padTo(nw, n), changed = [];
        for (let i = 0; i < n; i++) if (po.charAt(i) !== pn.charAt(i)) changed.push(i);
        paintOdo(old, n);
        txt(rbid, L.silenceWins ? 'THE SILENCE (No. 0): 0' : fmtBid(L.exact ? 7.5 : L.bid)); cl(rbid, 'struck', false);
        const base = D(1.2), nf = Math.min(6, changed.length);
        sched(D(0.8), function () { cl(rbid, 'struck', true); cap(L.silenceWins ? LN.idlerecon : L.exact ? LN.ex2 : L.still && api.chance(0.6) ? bank('still') : bank('clerk')); });
        for (let k = 0; k < nf; k++) {
          sched(base + k * D(0.18), function () {
            const c = ocs[8 - n + changed[k]], ch = pn.charAt(changed[k]);
            txt(c, ch === ' ' ? '' : ch); if (!reduced()) restart(c, 'flip'); sfx('tick');
          });
        }
        const tEnd = base + nf * D(0.18);
        sched(tEnd, function () { paintOdo(nw, n); });
        sched(Math.max(tEnd + D(0.35), D(3.6)), reconLine);
        if (L.sig) sched(D(0.4), openSig);
        if (S.g7) {
          sched(D(2.9), function () {
            if (!S.g7) return;
            S.g7 = false; cap(LN.g7sale); openCert();
            if (!api.flag.get('auction-house.gaveled')) { api.flag.set('auction-house.gaveled', true); api.award(7.5, 'Struck 7 1/2 times'); }
            api.achieve('auction-house.struck'); paintGavelTiny();
          });
        }
        sched(D(5.6), function () { restart(wallet, 'fly'); });
        sched(D(6.4), function () { cap(bank('wallet')); });
      }
      function reconLine() {
        const d = L.bid - L.snap;
        if (L.kind === 'final' && S.cycle === 0) cap(LN.erecon);
        else if (L.silenceWins) return;
        else if (L.exact) {
          cap(LN.ex3);
          if (!api.flag.get('auction-house.exact75')) { api.flag.set('auction-house.exact75', true); api.award(7.5, 'The exact 7 1/2'); }
          api.achieve('auction-house.exact');
        } else if (L.snap === 0) cap(LN.zerobal);
        else if (d === 0 || d === 1) cap(bank('exact'));
        else if (d > 1) cap(bank('over', { count: fmtBid(d - 1) }));
        else cap(bank('under', { count: fmtBid(L.price - L.bid) }));
      }

      /* signature pad (Stamp Committee) */
      function sigPt(e) {
        const r = L.cv.getBoundingClientRect();
        const x = (e.clientX - r.left) * (280 / (r.width || 280)), y = (e.clientY - r.top) * (80 / (r.height || 80));
        return [Number.isFinite(x) ? clamp(x, 0, 280) : 140, Number.isFinite(y) ? clamp(y, 0, 80) : 40];
      }
      function sigStroke(p, q) {
        if (!L.ctx) return;
        try { const c = L.ctx; c.strokeStyle = '#2b2118'; c.lineWidth = 2.5; c.lineCap = 'round'; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); } catch (e) { /* ignore */ }
      }
      function openSig() {
        if (!L || L.sigDone || L.sigOpen) return;
        L.sigOpen = true; L.sigT = 0; L.pts = []; L.down = false; L.hadPtr = false; L.spaceAt = 0; L.sprev = null;
        cap(SIGPLEAD);
        L.cv = h('canvas', '', { width: 280, height: 80, 'aria-hidden': 'true' });
        L.pad = h('button', 'sig', { type: 'button', 'aria-label': 'Signature pad. Draw a squiggle, press Enter, or hold Space.' }, L.cv);
        sigHolder.textContent = ''; sigHolder.appendChild(L.pad);
        try {
          L.ctx = L.cv.getContext('2d');
          if (L.ctx) { L.ctx.strokeStyle = '#c89b3c'; L.ctx.lineWidth = 1; L.ctx.beginPath(); L.ctx.moveTo(10, 62); L.ctx.lineTo(270, 62); L.ctx.stroke(); }
        } catch (e) { L.ctx = null; }
        const pad = L.pad;
        sigOffs.push(api.on(pad, 'pointerdown', function (e) {
          L.down = true; L.hadPtr = true; L.pts = [sigPt(e)];
          try { if (e.pointerId != null && pad.setPointerCapture) pad.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ }
        }));
        sigOffs.push(api.on(pad, 'pointermove', function (e) {
          if (!L.down || L.pts.length >= 400) return;
          const p = sigPt(e); sigStroke(L.pts[L.pts.length - 1], p); L.pts.push(p);
        }));
        const up = function () { if (L.down) { L.down = false; resolveSig(L.pts.length <= 2 ? 'dot' : 'ok'); } };
        sigOffs.push(api.on(pad, 'pointerup', up));
        sigOffs.push(api.on(pad, 'pointercancel', up));
        sigOffs.push(api.on(pad, 'click', function () { if (!L.hadPtr) resolveSig('dot'); }));
        sigOffs.push(api.on(pad, 'keydown', function (e) { if (e.key === ' ') { e.preventDefault(); if (!e.repeat) L.spaceAt = api.now(); } }));
        sigOffs.push(api.on(pad, 'keyup', function (e) { if (e.key === ' ') { e.preventDefault(); L.spaceAt = 0; } }));
        try { pad.focus(); } catch (e) { /* ignore */ }
      }
      function tickSig(dt) {
        L.sigT += dt;
        if (L.spaceAt > 0) {
          const f = clamp((api.now() - L.spaceAt) / (D(0.8) * 1000), 0, 1), p = [10 + f * 260, 40 + 22 * Math.sin(f * 26)];
          if (L.sprev) sigStroke(L.sprev, p);
          L.sprev = p;
          if (f >= 1) { L.spaceAt = 0; resolveSig('ok'); return; }
        }
        if (L.sigT >= D(12)) resolveSig('auto');
      }
      function resolveSig(kind) {
        if (!L || L.sigDone) return;
        L.sigDone = true;
        const hadFocus = !!L.pad && document.activeElement === L.pad;
        sigOffs.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } });
        sigOffs = []; sigHolder.textContent = '';
        if (hadFocus) { try { paddle.focus(); } catch (e) { /* ignore */ } }
        if (kind === 'auto') { cap(LN.sigauto); return; }
        cap(kind === 'dot' ? LN.sigdot : bank('sig')); sfx('stamp');
        api.award(0.3, 'signature'); api.stat.inc('auction-house.signatures'); api.achieve('auction-house.signature');
      }

      /* settle: the sale is booked, the envelope drops, the scenes play */
      function enterSettle() { enterPhase('settle', D(2.5)); doSale(); }
      function doSale() {
        const idx = S.idx, cyc0 = S.cycle === 0, fin = L.kind === 'final' && cyc0;
        S.lotsSession++; S.lotsEver++;
        api.stat.inc('auction-house.lots'); api.achieve('auction-house.paddle');
        S.iou = Math.min(99999, S.iou + 1 + (L.exact ? 1 : 0) + (L.rare === 'twin' ? 1 : 0));
        api.stat.inc('auction-house.ious'); api.stat.max('auction-house.iou', S.iou);
        S.lastPrice = L.price;
        ledgerLine('Lot ' + L.def.label + ': ' + L.def.name.replace(/\.$/, '') + '. Sold to you. IOU ' + api.fmt(S.iou) + '. ' + TAIL[S.lotsEver % TAIL.length]);
        if (!fin) {
          const ger = cyc0 && idx >= 21 && idx <= 23;
          dropEnvelope(L.silenceWins ? mkLetter({ text: LN.silenceltr }) : ger ? mkLetter({ gerald: true }) : mkLetter({ flam: S.flam, silent: L.silent }), L.silent);
        }
        S.flam = false;
        if (L.silenceWins) { api.achieve('auction-house.silence'); api.award(2, 'The Silence wins'); }
        const amt = Math.min(2, 0.3 + 0.07 * S.lotsSession);
        api.award(amt, 'Paddle Participation');
        paintLedger();
        if (!fin) { /* one settle caption per lot: rare notice, else Gerald, else an envelope, else the award */
          let one = RARE[L.rare] && RARE[L.rare][1] ? LN[RARE[L.rare][1]] : '';
          if (!one && L.gbid && S.goCool <= 0) { S.goCool = 3; one = bank('geraldOut'); }
          if (!one && api.chance(0.35)) one = bank('envelope');
          sched(D(0.5), function () { cap(one || bank('award', { count: r2(amt) })); });
        }
        if (!fin && --S.mgmtIn <= 0) { S.mgmtIn = api.randInt(3, 5); sched(D(0.9), function () { mg(bank('mgmt', { count: api.fmt(S.lotsEver) }), 'smug'); }); }
        if (!fin && (!cyc0 || idx >= 14) && ++S.remN % 2 === 0) sched(D(1.5), function () { hs(bank('remark'), 0); });
        if (cyc0 && idx === 2 && !S.beats.iou) { S.beats.iou = 1; sched(D(0.8), function () { mg(ln('ioufirst', { count: api.fmt(S.iou) }), 'proud'); }); }
        if (cyc0 && idx === 11) sched(D(0.6), function () { cap(LN.silend); });
        if (cyc0 && idx === 20) {
          S.len = D(8.5); L.debtLive = true;
          sched(D(1.0), function () { cap(LN.debt1); hs(LN.debt1, 1); });
          sched(D(3.2), function () { cap(LN.debt2); sfx('honk'); });
          sched(D(5.4), function () { cap(LN.debt3); S.debtSold = true; paintLedger(); api.achieve('auction-house.vegetable'); sfx('stamp'); });
          sched(D(7.0), function () { mg(LN.debtsold, 'smug'); });
        }
        if (cyc0 && idx === 22) {
          S.len = D(9);
          sched(D(0.8), function () { const t = ln('crack1', { count: api.fmt(S.lotsEver) }); cap(t); hs(t, 1); cl(hollisEl, 'still', true); });
          sched(D(3.2), function () { cap(LN.crack2); cl(board, 'dimboard', true); });
          sched(D(6.0), function () { cl(board, 'dimboard', false); cap(LN.crack3); sfx('stamp'); cl(hollisEl, 'still', false); });
        }
        if (fin) endingScene();
      }
      function endingScene() {
        S.len = D(11); certEl.hidden = false;
        sched(D(0.3), function () { cap(LN.ecert); });
        sched(D(1.6), function () { mg(LN.emgmt, 'proud'); });
        sched(D(3.6), function () { cap(LN.eright); hs(LN.eright, 1); });
        sched(D(5.6), function () { mg(LN.emath, 'smug'); });
        sched(D(8.0), function () {
          cl(banner, 'on', false); cl(banner, 'away', true); later(D(1.5), function () { cl(banner, 'away', false); });
          S.vault += ENV.length; ENV.length = 0;
          S.iou = 1; S.debtSold = false; S.cycle++; S.cont = 0; S.cbag = []; S.idx = 24; L.finalized = true;
          dropEnvelope(mkLetter({ text: bank('gletter2'), to: 'Hollis', sign: api.player.name }), true);
          certEl.hidden = true; paintLedger(); renderPile(false);
          api.stat.inc('auction-house.endings'); api.achieve('auction-house.owner'); api.flag.set('auction-house.ownsRoom', true); api.award(10, 'You won the Auction House');
          save();
        });
        sched(D(9.2), function () { cl(stage, 'open', false); });
      }
      function leaveSettle() {
        if (!L.finalized && S.cycle === 0) S.idx = Math.min(24, S.idx + 1);
        save(); enterCurtain();
      }
      function rainFx(em) {
        rain.textContent = '';
        if (reduced()) return;
        for (let i = 0; i < 12; i++) rain.appendChild(h('span', '', { text: em || '🥔', style: 'left:' + (4 + i * 8) + '%;animation-delay:' + (i * 0.2).toFixed(1) + 's' }));
        later(D(3.4), function () { rain.textContent = ''; }, true);
      }
      function enterQuiet() {
        enterPhase('quiet', D(22));
        S.hush = true; sl.disabled = true; setChant(LN.q1, 0, '');
        sched(D(0.2), function () { cap(LN.q1); });
        sched(D(2.4), function () { cap(LN.q2); restart(seats.gerald, 'bounce'); });
        sched(D(4.8), function () { cap(LN.q3); });
        if (api.stat.get('gerald-keynote.entered') > 0) sched(D(7.0), function () { cap(LN.qkey, 'Gerald'); });
        sched(D(9.2), function () { cap(LN.q4); });
        sched(D(11.4), function () { cap(LN.q5a); });
        sched(D(12.6), function () { cap(LN.q5b); });
        sched(D(13.8), function () { cap(LN.q5c); restart(gavelBtn, 'swing'); api.sfx('pop'); });
        sched(D(15.4), function () {
          cap(LN.q6); holding.hidden = false; S.saw7 = true;
          api.award(1.5, 'Lot 7 1/2 witnessed'); api.achieve('auction-house.russet');
        });
        sched(D(17.6), function () { cap(LN.q7); openWeather(true); rainFx(); later(D(3), function () { closePanel(true, 'weather'); }, true); });
        sched(D(20.2), function () { S.hush = false; mg(LN.qmgmt, 'neutral'); });
        sched(D(21.0), function () { cap(LN.q8); hs(LN.q8, 0); });
      }
      function leaveQuiet() { S.hush = false; S.idx = Math.min(24, S.idx + 1); save(); enterCurtain(); }

      /* idle, absentee, save, loop */
      const IDLE = [25, 45, 75, 150, 180, 210, 240, 270, 300];
      function tickIdle() {
        if (S.phase === 'quiet') { S.lastInput = api.now(); return; }
        const sec = (api.now() - S.lastInput) / 1000, n = S.idleStage;
        if (n < IDLE.length && sec >= D(IDLE[n])) idleBeat(S.idleStage = n + 1);
      }
      function idleBeat(n) {
        const alive = function (k, t, key) { later(D(t), function () { if (S.idleStage >= k) cap(LN[key]); }); };
        if (n === 1) { const t = bank('idleNudge'); cap(t); hs(t, 0); }
        else if (n === 2) { S.silenceNext = true; cap(bank('idleBid')); mg(bank('idleSay'), 'smug', 0); }
        else if (n === 3 || n === 6) cap(bank('idleDrift'));
        else if (n === 4 && !api.stat.get('auction-house.raises')) { S.idleStage = 2; S.lastInput = api.now() - D(45) * 1000; cap(bank('idleDrift')); } /* a pure watcher keeps the show running */
        else if (n === 4) { S.paused = true; cl(wrap, 'closed', true); cl(stage, 'stack', true); cap(LN.idleclose); hs(LN.idleclose, 0); alive(4, 3, 'idlesand'); alive(4, 6, 'idlegerald'); }
        else if (n === 5) { cap(LN.idlemoment); mg(LN.idlemoment, 'confused', 1); alive(5, 5, 'idlemoment2'); }
        else if (n === 7) { cap(LN.idlecare); hs(LN.idlecare, 0); }
        else if (n === 8) { const t = bank('idleDrift'); cap(t); mg(t, 'confused', 0); }
        else {
          cap(LN.idlevigil); mg(LN.idlevigil2, 'smug', 1); dropEnvelope(mkLetter({ text: LN.silenceltr + ' It was lovelier in the dark.', sign: 'The Silence' }), true);
          api.award(3, 'The vigil'); api.achieve('auction-house.vigil'); api.stat.inc('auction-house.vigils');
        }
      }
      function tickMarks() {
        if (S.cer > 0 || !L || L.kind !== 'normal' || L.silent || L.sig || L.rare || S.phase !== 'bidding' || S.paused || S.hush) return;
        if (!S.beats.m3 && S.modSec >= D(180)) {
          S.beats.m3 = 1; S.cer = D(11); cap(LN.m3a); hs(LN.m3a, 1); rainFx('🍪'); sfx('bell'); api.award(1.5, 'Interval Biscuit');
          later(D(3.5), function () { cap(LN.m3b); });
          later(D(7), function () { cap(api.flag.get('metStapler') ? LN.m3st : LN.m3c); });
          later(D(9.5), function () { mg(LN.m3m, 'smug'); });
        } else if (!S.beats.m10 && S.modSec >= D(600)) {
          S.beats.m10 = 1; S.cer = D(13); cap(LN.m10a); mg(LN.m10a, 'proud'); sfx('fanfare'); restart(hbtn, 'wobble');
          later(D(3.5), function () { cap(LN.m10b); faint(D(2)); });
          later(D(7), function () { cap(LN.m10c); });
          later(D(10.5), function () {
            cap(LN.m10d); sfx('tada'); api.award(5, 'Long Service Pin'); api.achieve('auction-house.service'); api.stat.inc('auction-house.pins');
            api.flag.set('auction-house.pin', true); paintFoot();
          });
        }
      }
      api.on(document, 'visibilitychange', function () {
        if (document.hidden) { S.hideAt = api.now(); return; }
        if (!(S.hideAt > 0)) return;
        const sec = (api.now() - S.hideAt) / 1000;
        S.hideAt = 0;
        if (sec < D(30)) return;
        const n = clamp(Math.floor(sec / D(12)), 1, 8);
        S.iou = Math.min(99999, S.iou + n); api.stat.max('auction-house.iou', S.iou);
        for (let i = 0; i < Math.min(n, 3); i++) ledgerLine('Paddle 0 (proxy): sold to you. Sold again, to you.');
        paintLedger(); cap(bank('absentee', { count: n })); api.award(1, 'for presence'); markInput();
      });
      function save() {
        api.save.set('state', { idx: S.idx, cycle: S.cycle, cont: S.cont, iou: S.iou, pending: S.pending, opened: S.opened, vault: S.vault, saw7: S.saw7,
          reply: S.replyUnlocked, gmet: S.geraldMet, lotsEver: S.lotsEver, g7: S.g7, debt: S.debtSold, gb: S.gb });
      }
      function tickPhase(dt) {
        if (!L) return;
        S.t += dt;
        if (S.phase === 'recon' && L.sig && !L.sigDone && S.t > D(1.19)) S.t = D(1.19);
        const evs = S.evs;
        for (let i = 0; i < evs.length;) {
          if (S.t >= evs[i].t) { const ev = evs.splice(i, 1)[0], ph0 = S.phase; ev.fn(); if (S.phase !== ph0) return; } else i++;
        }
        switch (S.phase) {
          case 'curtain': if (S.t >= S.len) leaveCurtain(); break;
          case 'bidding': tickBidding(dt); break;
          case 'hammer': if (S.t >= S.len) enterRecon(); break;
          case 'recon': if (S.t >= S.len && (!L.sig || L.sigDone)) enterSettle(); break;
          case 'settle': if (S.t >= S.len) leaveSettle(); break;
          case 'quiet': if (S.t >= S.len) leaveQuiet(); break;
          default: break;
        }
      }
      function step(dt) {
        S.modSec += dt; if (!S.paused && S.idleStage < 3) S.actSec += dt;
        tickCap(dt); tickFx(dt); tickGesture(dt); tickIdle(); tickBoard(dt); tickChant(dt); tickType(dt); tickSlider(dt);
        if (S.certT > 0) { S.certT -= dt; if (S.certT <= 0) closePanel(true, 'cert'); }
        if (L && L.viewT > 0) { L.viewT -= dt; if (L.viewT <= 0) endView(); }
        if (L && L.kind !== 'quiet' && !S.paused && (S.cycle > 0 || S.idx >= 3) && (S.envT += dt) >= D(20)) { S.envT = 0; if (ENV.length < 30) dropEnvelope(mkLetter({ silent: L.silent }), L.silent); }
        if (L && L.sigOpen && !L.sigDone) tickSig(dt);
        tickMarks();
        if (S.cer > 0) S.cer -= dt; else if (!S.paused) tickPhase(dt);
      }
      let lastTs = 0;
      function frame(ts) {
        if (api.destroyed) return;
        const dt = lastTs ? clamp((ts - lastTs) / 1000, 0, 0.1) : 0;
        lastTs = ts;
        api.requestAnimationFrame(frame);
        step(dt);
      }

      /* start */
      for (let i = 0; i < S.pending; i++) ENV.push(mkLetter());
      renderPile(false); paintLedger(); paintFoot(); paintGavelTiny(); setPh(REST); paintSliderLabel();
      ledgerLine('Ledger opened. Entries are subject to correction by R. Pen (+1).');
      enterCurtain();
      api.requestAnimationFrame(frame);
      return {
        destroy() {
          try { save(); } catch (e) { /* ignore */ }
          sigOffs.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } });
        }
      };
    }
  });
})();
