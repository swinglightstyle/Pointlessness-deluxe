/* POINTLESS module: sock-matcher */
/*
 * SOCK MATCHER 3000(TM). Concentration with 15 socks (7 pairs and a Kevin), a Discrepancy Report slip, one allowed match every
 * few minutes that is revoked at once, a Missing Sock that comes home only if you hold still, and a ceremony that never stops growing.
 * Brief: design/sock-matcher.md. Class names are written m-sock-matcher-* in the working copy and expanded to the full prefix when assembled.
 */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-sock-matcher-root{--ink:#2b2118;--wal:#8a5a3b;--rim:#6b4128;--felt:#fff1d6;--cor:#ff6f61;--mint:#7bd9b0;--must:#f4c542;--lil:#b79df2;--tape:#d63b3b;--cork:#c89a62;position:relative;display:grid;grid-template-columns:minmax(0,600px) minmax(230px,320px);grid-template-rows:auto auto auto auto 1fr;justify-content:center;grid-template-areas:"head head" "stats stats" "wall wall" "main slip" "main side";gap:10px;padding:10px;min-height:420px;color:var(--ink);font:15px/1.4 ui-rounded,"Trebuchet MS","Segoe UI",system-ui,sans-serif;background:#fff6e4;overflow:hidden}
.m-sock-matcher-root *{box-sizing:border-box}.m-sock-matcher-root [hidden]{display:none !important}.m-sock-matcher-root button{font-family:inherit;color:inherit}
.m-sock-matcher-root button:focus-visible{outline:3px solid var(--cor);outline-offset:2px}
.m-sock-matcher-stack{grid-template-columns:minmax(0,640px);grid-template-rows:none;grid-template-areas:"head" "stats" "wall" "slip" "main" "side"}
.m-sock-matcher-head{grid-area:head;display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;justify-content:space-between}
.m-sock-matcher-tl{display:flex;flex-direction:column;gap:4px;min-width:0}.m-sock-matcher-title{margin:0;font:900 clamp(1.15rem,4.4vw,1.9rem)/1.1 Impact,"Arial Black",sans-serif;letter-spacing:.03em;overflow-wrap:anywhere}
.m-sock-matcher-season{align-self:flex-start;background:var(--lil);border:3px solid var(--ink);border-radius:999px;padding:0 10px;font-weight:900;font-size:.78rem;box-shadow:2px 2px 0 var(--ink)}.m-sock-matcher-season.m-sock-matcher-pulse{animation:m-sock-matcher-pop .7s ease-out}
.m-sock-matcher-poster{position:relative;display:flex;gap:8px;align-items:center;max-width:290px;background:#fffdf4;border:3px solid var(--ink);padding:6px 10px;transform:rotate(1.2deg);box-shadow:3px 3px 0 var(--ink);font-size:.72rem;line-height:1.25}
.m-sock-matcher-poster::before{content:"";position:absolute;left:38%;top:-9px;width:54px;height:15px;background:#f4c54299;transform:rotate(-4deg);border:1px solid #0002}
.m-sock-matcher-poster b{display:block;font-size:.8rem;letter-spacing:.04em}.m-sock-matcher-pst{width:34px;height:34px;flex:none}.m-sock-matcher-pcap{font-style:italic}
.m-sock-matcher-stats{grid-area:stats;display:flex;flex-wrap:wrap;gap:6px}
.m-sock-matcher-chip{background:#fff;border:3px solid var(--ink);border-radius:999px;padding:1px 10px;font-weight:800;font-size:.8rem;box-shadow:2px 2px 0 var(--ink)}
.m-sock-matcher-wall{grid-area:wall;display:flex;flex-wrap:wrap;gap:8px 6px;min-height:30px;padding-top:6px}
.m-sock-matcher-plq{position:relative;padding:2px 8px;background:#fff8e8;border:2px solid #c9a227;border-radius:6px;font-size:.7rem;font-weight:700;box-shadow:0 0 7px #f4c54299}
.m-sock-matcher-plq::before{content:"";position:absolute;left:50%;top:-7px;width:16px;height:5px;margin-left:-8px;border:2px solid var(--must);border-radius:50%}
.m-sock-matcher-plq.m-sock-matcher-empty{border-style:dashed;box-shadow:none;font-weight:600;opacity:.85}
.m-sock-matcher-main{grid-area:main;display:flex;flex-direction:column;gap:10px;min-width:0}.m-sock-matcher-side{grid-area:side;display:flex;flex-direction:column;gap:10px;min-width:0}
.m-sock-matcher-drawer{position:relative;background:var(--wal);border:3px solid var(--ink);border-radius:14px;padding:12px 12px 8px;box-shadow:inset 0 0 0 5px var(--rim),4px 4px 0 var(--ink)}
.m-sock-matcher-felt{position:relative;background:var(--felt);border:3px solid var(--ink);border-radius:8px;padding:8px;box-shadow:inset 0 3px 8px #0003}
.m-sock-matcher-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;padding-bottom:6px}.m-sock-matcher-narrow .m-sock-matcher-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.m-sock-matcher-narrow .m-sock-matcher-card{aspect-ratio:1/1}.m-sock-matcher-narrow .m-sock-matcher-sockh{width:68%}
.m-sock-matcher-lip{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:46px;padding:4px 2px 0;color:#fff1d6;font-size:.72rem;font-style:italic}
.m-sock-matcher-seat{width:64px;height:46px;flex:none}
.m-sock-matcher-card{position:relative;display:block;width:100%;aspect-ratio:4/5;min-width:0;padding:0;border:0;background:none;cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.m-sock-matcher-card:focus-visible{outline:3px solid var(--cor);outline-offset:2px;border-radius:10px}.m-sock-matcher-liftb{z-index:5}
.m-sock-matcher-fx{position:absolute;inset:0;perspective:700px;transition:transform .3s ease,filter .3s}.m-sock-matcher-lift{transform:translateY(-8px) scale(1.15)}
.m-sock-matcher-fx.m-sock-matcher-shrink{transform:scale(.4);transition:transform 3s linear}.m-sock-matcher-stitch{left:24%;top:28%;width:52%;aspect-ratio:1;border:3px dashed var(--tape);border-radius:50%;animation:m-sock-matcher-spin 1.2s linear}.m-sock-matcher-darn .m-sock-matcher-card{cursor:crosshair}
.m-sock-matcher-inner{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .38s ease}.m-sock-matcher-up .m-sock-matcher-inner{transform:rotateY(180deg)}
.m-sock-matcher-face,.m-sock-matcher-back{position:absolute;inset:0;border:3px solid var(--ink);border-radius:10px;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden}
.m-sock-matcher-back{background:repeating-linear-gradient(45deg,#0000 0 2px,#ffffff30 2px 3px),repeating-linear-gradient(-45deg,#0000 0 2px,#00000022 2px 3px),#ff6f61}
.m-sock-matcher-back::after{content:"";position:absolute;inset:5px;border:2px dashed #fff1d6;border-radius:6px}
.m-sock-matcher-face{transform:rotateY(180deg);background:#fffaf0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.m-sock-matcher-sockh{width:78%;display:flex;justify-content:center;transition:opacity .6s}.m-sock-matcher-sock{width:100%;height:auto;display:block;overflow:visible}
.m-sock-matcher-nm{font-weight:900;font-size:.7rem;max-width:96%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-height:1em}
.m-sock-matcher-blink{animation:m-sock-matcher-blink 4s infinite;transform-box:fill-box;transform-origin:center}
.m-sock-matcher-emo{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:clamp(1.6rem,6vw,2.6rem);opacity:0;transition:opacity .6s;pointer-events:none}.m-sock-matcher-emo.m-sock-matcher-on{opacity:1}
.m-sock-matcher-inside .m-sock-matcher-sock{transform:scaleX(-1);filter:brightness(.6)}.m-sock-matcher-badge{position:absolute;pointer-events:none;z-index:6}
.m-sock-matcher-sash{left:-8px;right:-8px;top:42%;background:var(--tape);color:#fff;border:2px solid var(--ink);text-align:center;font:900 .62rem Impact,sans-serif;letter-spacing:.1em;transform:rotate(-14deg)}
.m-sock-matcher-lb{right:4px;top:2px;width:30px;height:30px;line-height:26px;text-align:center;background:var(--must);border:3px solid var(--ink);border-radius:50%;font:900 1.1rem Impact,sans-serif}
.m-sock-matcher-tape{left:-4px;right:-4px;height:18px;background:repeating-linear-gradient(-45deg,#d63b3b 0 10px,#fff1d6 10px 20px);border:2px solid var(--ink)}.m-sock-matcher-tape.m-sock-matcher-t1{top:22%;transform:rotate(-8deg)}.m-sock-matcher-tape.m-sock-matcher-t2{top:60%;transform:rotate(7deg)}
.m-sock-matcher-cal{left:4px;bottom:6px;font-size:1.5rem;animation:m-sock-matcher-slap .35s ease-out}.m-sock-matcher-bread{right:2px;bottom:2px;font-size:1.1rem}.m-sock-matcher-hole{outline:3px dotted var(--tape);outline-offset:-5px;animation:m-sock-matcher-throb 1s ease-in-out infinite alternate}
.m-sock-matcher-sel{box-shadow:0 0 0 4px var(--cor),0 0 0 7px var(--ink);border-radius:10px}.m-sock-matcher-walk{animation:m-sock-matcher-walk 1.2s ease-in forwards}.m-sock-matcher-popin{animation:m-sock-matcher-popin .45s ease-out}.m-sock-matcher-drop{animation:m-sock-matcher-drop .5s ease-out backwards}
.m-sock-matcher-meter{position:absolute;left:6px;right:6px;bottom:-9px;height:9px;background:#fff;border:2px solid var(--ink);border-radius:5px;opacity:0;z-index:7;pointer-events:none}.m-sock-matcher-meter i{display:block;height:100%;width:0;background:var(--mint)}
.m-sock-matcher-sniff .m-sock-matcher-meter{opacity:1}.m-sock-matcher-sniff .m-sock-matcher-meter i{width:100%;transition:width 1.2s linear}
.m-sock-matcher-slump .m-sock-matcher-fx{transform:rotate(7deg);filter:saturate(.35)}.m-sock-matcher-slump .m-sock-matcher-card:nth-child(2n) .m-sock-matcher-fx{transform:rotate(-6deg)}
.m-sock-matcher-ovl{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:12px}.m-sock-matcher-ovl>*{pointer-events:none}.m-sock-matcher-ovl>button{pointer-events:auto}
.m-sock-matcher-spot{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(255,240,170,.5),transparent 72%);opacity:0;transition:opacity .4s}.m-sock-matcher-spot.m-sock-matcher-on{opacity:1}
.m-sock-matcher-dimo{position:absolute;inset:0;background:#120a05;opacity:0;transition:opacity 1.2s}.m-sock-matcher-dim .m-sock-matcher-dimo{opacity:.55}.m-sock-matcher-blur .m-sock-matcher-felt{filter:blur(3px)}
.m-sock-matcher-bunt{position:absolute;left:0;top:0;width:100%;height:40px}.m-sock-matcher-pen{transform-origin:50% 0;animation:m-sock-matcher-wave 1.4s ease-in-out infinite alternate}
.m-sock-matcher-whisper{position:absolute;max-width:46%;background:#fff;border:2px solid var(--ink);border-radius:12px;padding:1px 8px;font-size:.72rem;font-style:italic;animation:m-sock-matcher-pop .3s ease-out}
.m-sock-matcher-picket{position:absolute;right:10px;top:34%;width:min(48%,210px);background:#fff;border:3px solid var(--ink);padding:6px;text-align:center;font:900 .78rem/1.2 Impact,sans-serif;letter-spacing:.04em;transform:rotate(4deg);z-index:4}
.m-sock-matcher-steward{position:absolute;left:10px;bottom:10px;display:flex;align-items:flex-end;gap:6px;z-index:4;max-width:60%}.m-sock-matcher-steward svg{width:54px;flex:none}
.m-sock-matcher-clip{background:#fffdf4;border:2px solid var(--ink);padding:3px 8px;font:.7rem/1.3 Consolas,monospace}
.m-sock-matcher-banner{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%) rotate(-3deg);background:var(--must);border:3px solid var(--ink);box-shadow:3px 3px 0 var(--ink);padding:3px 14px;font:900 clamp(.9rem,3.6vw,1.5rem) Impact,sans-serif;letter-spacing:.1em;white-space:nowrap;z-index:5}
.m-sock-matcher-rain span{position:absolute;top:-34px;font-size:1.6rem;animation:m-sock-matcher-fall 4s linear forwards}
.m-sock-matcher-stage{position:absolute;inset:6% 6%;background:rgba(43,33,24,.86);border:3px solid var(--ink);border-radius:12px;display:flex;align-items:flex-end;justify-content:center;gap:6%;padding:10px;z-index:6}
.m-sock-matcher-stg{position:relative;width:min(30%,120px)}.m-sock-matcher-stg .m-sock-matcher-bub{position:absolute;left:0;bottom:104%;width:150%;z-index:2}.m-sock-matcher-stg.m-sock-matcher-leave{animation:m-sock-matcher-leave 2.6s ease-in forwards}
.m-sock-matcher-bub{background:#fff;border:3px solid var(--ink);border-radius:14px 14px 14px 4px;padding:4px 9px;font-size:.74rem;line-height:1.25;font-weight:700}
.m-sock-matcher-env{position:absolute;top:-4px;left:2%;font-size:1.8rem;line-height:1;padding:2px 6px;background:var(--felt);border:3px solid var(--ink);border-radius:8px;cursor:pointer;animation:m-sock-matcher-drift 12s linear forwards;z-index:3}
.m-sock-matcher-ms{position:absolute;left:14px;bottom:2px;width:54px;height:58px;padding:0;border:0;background:none;cursor:pointer;opacity:.62;transform:translateX(-130%);transition:transform .9s ease;z-index:3}
.m-sock-matcher-ms.m-sock-matcher-peek{transform:translateX(-62%)}.m-sock-matcher-ms.m-sock-matcher-half{transform:translateX(-18%)}.m-sock-matcher-ms.m-sock-matcher-arr{transform:none}.m-sock-matcher-ms .m-sock-matcher-sock{filter:saturate(.5)}.m-sock-matcher-ms.m-sock-matcher-arr .m-sock-matcher-sock{filter:none}
.m-sock-matcher-msb{position:absolute;left:62px;bottom:46px;max-width:240px;z-index:4}.m-sock-matcher-pill{position:absolute;left:10px;top:8px;background:#c93d30;color:#fff;border:3px solid var(--ink);border-radius:999px;padding:0 12px;font-weight:900;font-size:.76rem;z-index:5;text-shadow:1px 1px 0 var(--ink)}
.m-sock-matcher-docf{position:absolute;font-size:1.3rem;transition:left 1.2s linear,top 1.2s linear;z-index:6}
.m-sock-matcher-dennis{position:absolute;right:14px;bottom:44px;display:flex;flex-direction:column;align-items:center;gap:2px;z-index:4;animation:m-sock-matcher-pop .5s ease-out}.m-sock-matcher-dennis span{font-size:2.2rem;line-height:1}.m-sock-matcher-dennis small{background:#fff;border:2px solid var(--ink);border-radius:8px;padding:0 6px;font:800 .62rem sans-serif}
.m-sock-matcher-cling .m-sock-matcher-fx{animation:m-sock-matcher-shake .25s linear 12}.m-sock-matcher-rm .m-sock-matcher-cling .m-sock-matcher-fx,.m-sock-matcher-rm .m-sock-matcher-dennis{animation:none}
.m-sock-matcher-slipw{grid-area:slip;min-width:0;filter:drop-shadow(3px 3px 0 var(--ink))}
.m-sock-matcher-slip{position:relative;background:#fffdf4;border:3px solid var(--ink);border-bottom:0;padding:8px 12px 22px;font:13px/1.35 Consolas,"Courier New",monospace;clip-path:polygon(0 0,100% 0,100% calc(100% - 8px),95% 100%,90% calc(100% - 8px),85% 100%,80% calc(100% - 8px),75% 100%,70% calc(100% - 8px),65% 100%,60% calc(100% - 8px),55% 100%,50% calc(100% - 8px),45% 100%,40% calc(100% - 8px),35% 100%,30% calc(100% - 8px),25% 100%,20% calc(100% - 8px),15% 100%,10% calc(100% - 8px),5% 100%,0 calc(100% - 8px))}
.m-sock-matcher-close.m-sock-matcher-wit{position:static;display:inline-block;margin-top:5px;background:var(--mint);transform:rotate(-2deg)}.m-sock-matcher-verd{top:auto;bottom:6px;width:92%;white-space:normal;text-align:center;font:900 .78rem/1.25 Consolas,monospace;letter-spacing:0;transform:translateX(-50%) rotate(-1deg);padding:3px 8px;background:#fff3bf}.m-sock-matcher-verd b{display:block;font:900 clamp(.9rem,4.4vw,1.2rem) Impact,sans-serif;letter-spacing:.1em}
.m-sock-matcher-stack .m-sock-matcher-steward{bottom:56px}.m-sock-matcher-narrow .m-sock-matcher-clip,.m-sock-matcher-narrow .m-sock-matcher-chfor{display:none}.m-sock-matcher-narrow .m-sock-matcher-stats{gap:4px}.m-sock-matcher-narrow .m-sock-matcher-chip{padding:0 7px;font-size:.7rem;border-width:2px}
.m-sock-matcher-sm{display:none}.m-sock-matcher-narrow .m-sock-matcher-sm{display:inline}.m-sock-matcher-narrow .m-sock-matcher-lg{display:none}
.m-sock-matcher-narrow .m-sock-matcher-poster{max-width:100%;flex-basis:100%;transform:none}.m-sock-matcher-narrow .m-sock-matcher-wall{min-height:0;padding-top:0}.m-sock-matcher-narrow .m-sock-matcher-stamp{bottom:auto;top:-6px;right:4px;font-size:.85rem}
.m-sock-matcher-slip.m-sock-matcher-gold{background:#fff3bf;box-shadow:inset 0 0 0 4px var(--must),inset 0 0 26px #f4c54299}.m-sock-matcher-slip.m-sock-matcher-shake{animation:m-sock-matcher-shake .25s linear}
.m-sock-matcher-sh{font-weight:900;letter-spacing:.04em;margin-bottom:4px}.m-sock-matcher-rows{display:flex;flex-direction:column;gap:3px}
.m-sock-matcher-row{display:grid;grid-template-columns:6.4em minmax(24px,1fr) 4.9em;gap:2px 8px;align-items:center;opacity:.18;transition:opacity .2s}.m-sock-matcher-row.m-sock-matcher-on{opacity:1}
.m-sock-matcher-lab{font-weight:800;font-size:.74rem}.m-sock-matcher-bar{height:8px;background:#e8dfc8;border:2px solid var(--ink);border-radius:5px;overflow:hidden}.m-sock-matcher-bar i{display:block;height:100%;width:0;background:var(--tape);transition:width .3s ease}
.m-sock-matcher-row.m-sock-matcher-on .m-sock-matcher-bar i{width:var(--w,40%)}.m-sock-matcher-row.m-sock-matcher-ok .m-sock-matcher-bar i{background:var(--mint)}.m-sock-matcher-mk{font-weight:900;font-size:.74rem;text-align:right}.m-sock-matcher-row.m-sock-matcher-ok .m-sock-matcher-mk{color:#1d7a55}.m-sock-matcher-row.m-sock-matcher-no .m-sock-matcher-mk{color:#b3261e}
.m-sock-matcher-tx{grid-column:1/-1;font-size:.72rem;opacity:.85;overflow-wrap:anywhere}
.m-sock-matcher-stamp{position:absolute;right:10px;bottom:50px;transform:rotate(-6deg) scale(1);transform-origin:center;border:4px solid var(--must);outline:2px solid var(--must);outline-offset:2px;color:#9a6a00;background:#fffdf4cc;padding:0 10px;font:900 1.15rem/1.3 Impact,"Arial Black",sans-serif;letter-spacing:.08em;opacity:0;pointer-events:none;max-width:70%;text-align:center}
.m-sock-matcher-stamp.m-sock-matcher-on{opacity:1;animation:m-sock-matcher-slam .18s ease-out}.m-sock-matcher-stamp.m-sock-matcher-long{font-size:.8rem;letter-spacing:.02em}.m-sock-matcher-slip.m-sock-matcher-gold .m-sock-matcher-stamp{color:#7a5200;border-color:#d4a017;outline-color:#d4a017}
.m-sock-matcher-reason{margin-top:6px;font-weight:700;min-height:1.3em;padding-right:42%}.m-sock-matcher-narrow .m-sock-matcher-reason{padding-right:0}.m-sock-matcher-foot{margin-top:2px;font-size:.72rem;opacity:.8}.m-sock-matcher-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.m-sock-matcher-close{position:absolute;right:10px;top:6px;background:#ff9f43;border:3px solid var(--ink);border-radius:6px;padding:0 8px;font:900 .7rem sans-serif;transform:rotate(5deg);box-shadow:2px 2px 0 var(--ink)}
.m-sock-matcher-tue{display:inline-block;background:var(--must);border:2px solid var(--ink);padding:0 8px;font:900 .7rem sans-serif;margin-left:6px}
.m-sock-matcher-notes{display:flex;flex-direction:column;gap:3px;font:.74rem/1.3 Consolas,monospace}.m-sock-matcher-notes p{margin:0;padding:2px 8px;background:#fffdf4;border:2px dashed var(--ink)}
.m-sock-matcher-recent{margin:0;padding-left:1.4em;font-size:.74rem;opacity:.85}
.m-sock-matcher-panel{background:#fff;border:3px solid var(--ink);border-radius:12px;padding:8px 10px;box-shadow:3px 3px 0 var(--ink)}.m-sock-matcher-panel h4{margin:0 0 4px;font-size:.82rem;letter-spacing:.05em}
.m-sock-matcher-btn{display:block;width:100%;padding:7px 10px;margin:0;background:var(--mint);border:3px solid var(--ink);border-radius:999px;font-weight:900;font-size:.86rem;cursor:pointer;box-shadow:3px 3px 0 var(--ink);min-height:40px}
.m-sock-matcher-btn:hover:not(:disabled){transform:translate(-1px,-1px)}.m-sock-matcher-btn:active:not(:disabled){transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-sock-matcher-btn:disabled{opacity:.55;cursor:not-allowed}.m-sock-matcher-btn.m-sock-matcher-b2{background:var(--lil)}.m-sock-matcher-btn.m-sock-matcher-b3{background:var(--must)}
.m-sock-matcher-btns{display:flex;flex-direction:column;gap:8px}
.m-sock-matcher-dry{display:flex;gap:10px;align-items:center}.m-sock-matcher-port{position:relative;width:96px;height:96px;flex:none;border-radius:50%;border:5px solid var(--ink);background:radial-gradient(circle at 35% 30%,#fffc,#8fc9e8 55%,#5a8ab0);overflow:hidden}
.m-sock-matcher-orb{position:absolute;inset:0;animation:m-sock-matcher-spin 3s linear infinite}.m-sock-matcher-orb span{position:absolute;left:50%;top:6px;margin-left:-.55em;font-size:1.7rem}
.m-sock-matcher-dial{position:relative;width:60px;height:60px;flex:none;padding:0;border:3px solid var(--ink);border-radius:50%;background:#fff1d6;cursor:grab;touch-action:none;box-shadow:2px 2px 0 var(--ink)}.m-sock-matcher-dial svg{width:100%;height:100%;display:block;transition:transform .35s ease}
.m-sock-matcher-dt{font-size:.74rem;line-height:1.3}.m-sock-matcher-pol{display:flex;gap:10px;align-items:center}.m-sock-matcher-ring{width:42px;height:42px;flex:none;border-radius:50%;border:3px solid var(--ink);background:conic-gradient(var(--tape) calc(var(--p,100) * 1%),#e8dfc8 0)}.m-sock-matcher-pol p{margin:0;font-size:.74rem;line-height:1.3}
.m-sock-matcher-cork{position:relative;aspect-ratio:2/1;background:radial-gradient(#0003 1px,transparent 1.6px) 0 0/8px 8px,var(--cork);border:3px solid var(--rim);border-radius:8px}.m-sock-matcher-cork svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.m-sock-matcher-pin{position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;padding:0;border-radius:50%;border:2px solid var(--ink);background:#fff1d6;font-weight:900;font-size:.72rem;cursor:pointer}.m-sock-matcher-pin.m-sock-matcher-full{background:#fff;box-shadow:0 0 0 3px var(--tape)}.m-sock-matcher-pin.m-sock-matcher-ysel{box-shadow:0 0 0 4px var(--must),0 0 0 6px var(--ink)}
.m-sock-matcher-res{font-size:.76rem;line-height:1.35}.m-sock-matcher-res b{font-size:.84rem}
.m-sock-matcher-pc{position:relative;background:#fffaf0;border:3px solid var(--ink);border-radius:6px;padding:10px 12px 8px;box-shadow:3px 3px 0 var(--ink);background-image:linear-gradient(90deg,transparent 62%,#b79df255 62% 62.5%,transparent 62.5%)}
.m-sock-matcher-pc p{margin:0 0 6px}.m-sock-matcher-pct{font-size:1.02rem;line-height:1.4;max-width:60%;min-height:3.4em}.m-sock-matcher-hw0{font-family:'Segoe Script','Bradley Hand','Comic Sans MS',cursive}.m-sock-matcher-hw1{font-family:Georgia,'Times New Roman',serif;font-style:italic}.m-sock-matcher-hw2{font-family:Consolas,'Courier New',monospace}
.m-sock-matcher-pcm{font-size:.7rem;font-weight:800;letter-spacing:.04em;opacity:.8}.m-sock-matcher-pcs{position:absolute;right:12px;top:10px;width:52px;height:60px}.m-sock-matcher-pcb{display:flex;gap:8px;margin-top:6px;flex-wrap:wrap}.m-sock-matcher-pcb .m-sock-matcher-btn{width:auto;padding:3px 14px;min-height:36px;font-size:.78rem}
.m-sock-matcher-prog{background:#fff;border:3px solid var(--ink);border-radius:10px;padding:5px 10px;font-weight:800;font-size:.8rem}.m-sock-matcher-prog .m-sock-matcher-pbar{height:8px;margin:4px 0;background:#e8dfc8;border:2px solid var(--ink);border-radius:5px;overflow:hidden}.m-sock-matcher-prog .m-sock-matcher-pbar i{display:block;height:100%;width:0;background:var(--cor);transition:width .4s}
.m-sock-matcher-prog .m-sock-matcher-btn{width:auto;padding:3px 14px;min-height:36px;font-size:.78rem;margin-top:4px;background:var(--must)}
@keyframes m-sock-matcher-pop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}@keyframes m-sock-matcher-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes m-sock-matcher-slam{from{transform:rotate(-6deg) scale(1.8);opacity:0}to{transform:rotate(-6deg) scale(1);opacity:1}}@keyframes m-sock-matcher-shake{0%,100%{transform:translate(0)}25%{transform:translate(2px,-1px)}75%{transform:translate(-2px,1px)}}
@keyframes m-sock-matcher-walk{0%{transform:translate(0,0) rotate(0)}30%{transform:translate(30%,-4%) rotate(8deg)}60%{transform:translate(70%,2%) rotate(-6deg)}100%{transform:translate(180%,0) rotate(10deg);opacity:0}}
@keyframes m-sock-matcher-popin{from{transform:scale(0)}to{transform:scale(1)}}@keyframes m-sock-matcher-drop{from{transform:translateY(-140%);opacity:0}to{transform:none;opacity:1}}@keyframes m-sock-matcher-throb{from{outline-color:#d63b3b}to{outline-color:#fff1d6}}
@keyframes m-sock-matcher-wave{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}@keyframes m-sock-matcher-fall{to{transform:translateY(460px) rotate(300deg)}}@keyframes m-sock-matcher-spin{to{transform:rotate(360deg)}}
@keyframes m-sock-matcher-drift{from{left:2%}to{left:84%}}@keyframes m-sock-matcher-slap{from{transform:scale(3) rotate(20deg);opacity:0}to{transform:none;opacity:1}}@keyframes m-sock-matcher-leave{to{transform:translateX(220%)}}
.m-sock-matcher-rm .m-sock-matcher-fx,.m-sock-matcher-rm .m-sock-matcher-inner,.m-sock-matcher-rm .m-sock-matcher-ms,.m-sock-matcher-rm .m-sock-matcher-dial svg,.m-sock-matcher-rm .m-sock-matcher-dimo,.m-sock-matcher-rm .m-sock-matcher-spot,.m-sock-matcher-rm .m-sock-matcher-docf,.m-sock-matcher-rm .m-sock-matcher-row{transition:none !important}
.m-sock-matcher-rm .m-sock-matcher-inner{transform:none !important}.m-sock-matcher-rm .m-sock-matcher-face{transform:none;opacity:0;transition:opacity .12s}.m-sock-matcher-rm .m-sock-matcher-up .m-sock-matcher-face{opacity:1}.m-sock-matcher-rm .m-sock-matcher-up .m-sock-matcher-back{opacity:0}.m-sock-matcher-rm .m-sock-matcher-back{transition:opacity .12s}
.m-sock-matcher-rm .m-sock-matcher-walk{visibility:hidden;animation:none}.m-sock-matcher-rm .m-sock-matcher-env,.m-sock-matcher-rm .m-sock-matcher-rain span,.m-sock-matcher-rm .m-sock-matcher-orb,.m-sock-matcher-rm .m-sock-matcher-pen,.m-sock-matcher-rm .m-sock-matcher-blink,.m-sock-matcher-rm .m-sock-matcher-drop,.m-sock-matcher-rm .m-sock-matcher-popin,.m-sock-matcher-rm .m-sock-matcher-cal,.m-sock-matcher-rm .m-sock-matcher-hole,.m-sock-matcher-rm .m-sock-matcher-stg.m-sock-matcher-leave{animation:none !important}
.m-sock-matcher-rm .m-sock-matcher-stamp.m-sock-matcher-on,.m-sock-matcher-rm .m-sock-matcher-slip.m-sock-matcher-shake{animation:none}.m-sock-matcher-rm .m-sock-matcher-stg.m-sock-matcher-leave{visibility:hidden}.m-sock-matcher-rm .m-sock-matcher-env{left:40%}
@media (prefers-reduced-motion:reduce){.m-sock-matcher-root .m-sock-matcher-orb,.m-sock-matcher-root .m-sock-matcher-pen,.m-sock-matcher-root .m-sock-matcher-env{animation:none}.m-sock-matcher-root .m-sock-matcher-fx,.m-sock-matcher-root .m-sock-matcher-inner{transition-duration:.01ms}}
@media (pointer:coarse){.m-sock-matcher-root .m-sock-matcher-btn,.m-sock-matcher-root .m-sock-matcher-dial,.m-sock-matcher-root .m-sock-matcher-pcb .m-sock-matcher-btn{min-height:44px}.m-sock-matcher-root .m-sock-matcher-dial{width:64px;height:64px}.m-sock-matcher-root .m-sock-matcher-pin{width:44px;height:44px;margin:-22px 0 0 -22px}.m-sock-matcher-root .m-sock-matcher-ms{width:60px;height:64px}}
.m-sock-matcher-cenb{display:flex;flex-direction:column;gap:6px}.m-sock-matcher-cenb .m-sock-matcher-btn{font-size:.78rem;min-height:36px}.m-sock-matcher-cen p{margin:0 0 6px;font-size:.78rem;line-height:1.3}
.m-sock-matcher-lbtn{position:absolute;left:-12%;bottom:34%;width:34px;height:34px;padding:0;border:0;background:none;font-size:1.7rem;line-height:1;cursor:pointer;z-index:4;animation:m-sock-matcher-roll 6s linear forwards}@keyframes m-sock-matcher-roll{from{left:-12%;transform:rotate(0)}to{left:108%;transform:rotate(1080deg)}}
.m-sock-matcher-rm .m-sock-matcher-lbtn{animation:none !important;left:46%}
.m-sock-matcher-court{overflow:hidden}.m-sock-matcher-cts{display:flex;gap:6px;align-items:flex-start}.m-sock-matcher-cp{position:relative;flex:1 1 0;min-width:0;text-align:center}.m-sock-matcher-cp svg{width:42px;height:42px;display:block;margin:0 auto}
.m-sock-matcher-cp small{display:block;font:800 .62rem sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.m-sock-matcher-cp .m-sock-matcher-bub{margin-top:3px;padding:2px 6px;font-size:.66rem;text-align:left;border-width:2px;animation:m-sock-matcher-pop .3s ease-out}
.m-sock-matcher-cp.m-sock-matcher-leave{animation:m-sock-matcher-leave 2.6s ease-in forwards}.m-sock-matcher-ham{position:absolute;right:4%;top:-4px;font-size:1.1rem;line-height:1}
.m-sock-matcher-s16{position:absolute;left:12px;bottom:4px;width:52px;height:56px;padding:0;border:0;background:none;cursor:pointer;z-index:4;animation:m-sock-matcher-popin .5s ease-out}.m-sock-matcher-s16 svg{width:100%;height:auto;display:block}
.m-sock-matcher-s16 small{position:absolute;left:50%;transform:translateX(-50%);bottom:-2px;background:#fff;border:2px solid var(--ink);border-radius:6px;padding:0 4px;font:800 .56rem sans-serif;white-space:nowrap}
.m-sock-matcher-s16.m-sock-matcher-walk{animation:m-sock-matcher-s16w 1.6s ease-in forwards}@keyframes m-sock-matcher-s16w{to{transform:translateX(900%) rotate(12deg);opacity:0}}
.m-sock-matcher-mints{left:2px;bottom:2px;font-size:1rem}.m-sock-matcher-cenk{display:flex;justify-content:center;margin-bottom:4px}.m-sock-matcher-cenk svg{width:72px;height:72px}
.m-sock-matcher-rm .m-sock-matcher-s16,.m-sock-matcher-rm .m-sock-matcher-cp .m-sock-matcher-bub{animation:none}.m-sock-matcher-rm .m-sock-matcher-cp.m-sock-matcher-leave{visibility:hidden;animation:none}
`, 'css-sock-matcher');

  P.addAchievements([
    { id: 'sock-matcher.first', name: 'Knight Commander of the Unfolded Drawer, First Class', desc: 'Flip your very first sock. It is awarded with great ceremony and no sense of occasion.', icon: '🧦', reward: 1 },
    { id: 'sock-matcher.near', name: 'Laureate of the Almost-Pair, With Distinction in Slightly Off', desc: 'Receive 25 near-miss verdicts (four of five gauges). The fifth gauge sends its regards.', icon: '🎖️', reward: 5, check: function (s) { return (s['sock-matcher.near'] || 0) >= 25; } },
    { id: 'sock-matcher.ceremony', name: 'Grand Marshal of Prematurely Concluded Unions', desc: 'Witness a true match, a full ceremony and its immediate revocation. Congratulations remain.', icon: '🏅', reward: 5 },
    { id: 'sock-matcher.appeal', name: 'Counsel for the Socks, Pro Bono, Pro Nothing', desc: 'File 10 appeals. Each one is denied or upheld. Neither one counts.', icon: '📋', reward: 3, check: function (s) { return (s['sock-matcher.appeals'] || 0) >= 10; } },
    { id: 'sock-matcher.postcards', name: 'Postmaster General of the Gone and the Fine', desc: 'Pin all 8 postcards from the Missing Sock to the corkboard. Each is stamped. None is returned.', icon: '📮', reward: 10 },
    { id: 'sock-matcher.home', name: 'Keeper of the Quiet Door', desc: 'Hold perfectly still while the Missing Sock comes home. It matches nothing. It is fine with that.', icon: '🧳', reward: 10 },
    { id: 'sock-matcher.season2', name: 'Chancellor of the Continuing Drawer', desc: 'Witness the ending that is not an ending. There is no way to win. Management says so sincerely.', icon: '🌙', reward: 25 },
    { id: 'sock-matcher.kevin', name: "Supreme Archbishop of Kevin's Glove Truth", desc: 'Click Kevin seven times and shift-click him once. He is a glove. He has always been a glove.', icon: '🧤', secret: true, reward: 15 },
    { id: 'sock-matcher.ballet', name: 'Hereditary Warden of the Undisturbed Drawer', desc: 'Hold still through the 90-second ballet and the whole verse. Nobody saw it but you.', icon: '🕯️', secret: true, reward: 15 },
    { id: 'sock-matcher.union', name: 'Convener of the Sock Union Break (15 Minutes, 15 Seconds)', desc: 'Flip 12 socks in 3 seconds. The socks have downed tools. They had no tools.', icon: '🚧', secret: true, reward: 5 },
    { id: 'sock-matcher.faint', name: 'Dame Commander of the Long Sniff', desc: 'Sniff for 20 seconds in total and wake in a dream with an escalator in it.', icon: '😵', secret: true, reward: 5 },
    { id: 'sock-matcher.darn', name: 'Master Darner of the Unofficial Needle', desc: 'Type the word, then do the deed five times. Management disapproves of the word.', icon: '🧵', secret: true, reward: 5 },
    { id: 'sock-matcher.tuesday', name: 'Tuesday-Adjacent Laureate (It Does Not Count)', desc: 'Play on a real Tuesday. Every sock matches every sock. It does not count.', icon: '📅', secret: true, reward: 5 },
    { id: 'sock-matcher.self', name: 'Plenipotentiary of the Reflexive Pair, Matched to Itself, At Last', desc: 'Flip the same sock fifteen times in a row, at a dignified pace. It matches itself. It was hoping for someone else. It will take it.', icon: '🔁', secret: true, reward: 5 },
    { id: 'sock-matcher.asked', name: 'Honorary Fellow of the First-Asked Society, Kevin Chapter (Kevin in Attendance)', desc: 'Flip Kevin first, five attempts in a row. He has never been asked first. He has prepared remarks. They are two words long.', icon: '🥇', secret: true, reward: 10 },
    { id: 'sock-matcher.even', name: 'Even Steven, Briefly, With Reservations', desc: 'Catch the sixteenth sock before it leaves. Sixteen is an even number. It is only visiting.', icon: '🎲', secret: true, reward: 5 }
  ]);

  const L = {
    open: ["Welcome to Sock Matcher 3000. Fifteen socks: seven pairs, plus Kevin. Management checked the arithmetic and it came back with Kevin.", "100% of socks want to be matched. The survey had one respondent, a sock, who asked what 'matched' meant.", "Please begin. Flip two socks. If they match, great. If they do not, great. Management will say 'great' either way.", "Fifteen is an odd number. The game was designed this way on a napkin, and the napkin is now policy.", "The drawer is open 24 hours a day. Management has never checked which 24."],
    callback: ["Welcome back. Your pairs were un-matched in your absence, as a courtesy.", "Management understands you have met the sock elsewhere. Management can neither confirm nor deny that it has a jurisdiction.", "Season {count} of Sock Matcher is under way. The seasons are numbered. The socks are not."],
    firstFlip: ["First sock flipped. It is a sock. Management is deeply moved and cannot say why.", "You have turned over a sock. Historians will call this 'the turning'.", "Sock one is up. Sock one is nervous. Sock one has not met sock two.", "A sock has been turned over. The time has been noted as 'a time', which is accurate and no help."],
    stall: ["Twenty seconds, and not one sock flipped. Management has begun to take it personally, then professionally.", "Nothing has been flipped. The socks are fine with it. The socks have been face down since 1987 and are very good at it.", "Management has not heard a flip in some time. It checked the drawer. The drawer is there. The drawer is waiting politely."],
    selfFlip: ["That is the same sock. Management admires the optimism.", "A sock cannot be matched to itself. It has tried. It is very tired.", "You have flipped the same sock twice. It is still the same sock. The sock has initialled it, in case."],
    selfMany: ["Five flips of the same sock. It has filed a note asking whether it is being pursued.", "Eight. The sock has asked for a lawyer, then a smaller lawyer, then a sit-down and a glass of water.", "Eleven. Sandra has stopped initialling and started signing in full, which is a promotion for the pen.", "Fourteen. One more and the sock is, technically, in a relationship with itself. Management has a form."],
    selfWin: ["Fifteen flips. The sock has matched itself. Management is thrilled, and a little worried about the sock.", "MATCH (WITH SELF). Hue, pattern, cuff, length and vibe all agree. It did have a head start.", "Per Policy 1(a), a sock may be a pair with itself on holidays, Tuesdays, and at 7 1/2 past nothing.", "This is the first self-match in drawer history. Management thanks the sock for its service to the sock, and asks it to sit down before it does it again."],
    backspace: ["Backspace has been pressed. Nothing has been un-flipped. Management is proud of the key for trying.", "Un-flipping is not offered. It was offered in 1987 and was found to be a lot.", "The sock has refused to be un-flipped. It says it has seen things now."],
    hurry: ["Management has noticed your enthusiasm. Management would like it to be slightly less quick.", "Please slow down. A sock cannot be flipped faster than it can be disappointed.", "That is a lot of flipping. A tally has been started on the back of a different tally.", "You are clicking at a rate Management can only call 'ambitious'. Something is forming in the walls. It may be a union.", "The socks have been flipped so fast that they have started asking about a notice period.", "Sandra has timed that flip. Sandra has a stopwatch for exactly this and has been waiting since lunch."],
    stampNear: ["Four of five gauges agree. The fifth gauge is Tuesday.", "The hue gap has been described by the committee as 'emotional'.", "Identical in every respect except for the way they are a different sock.", "A motion to call this a pair was seconded by the right sock and tabled by the left, who needs to see the figures.", "Per Policy 14(a), nothing has to be wrong. It simply is not right.", "Left sock reports being 'on a journey'. Right sock reports being 'on a different journey'.", "One thread, somewhere, is in Sandra's words 'a lie'.", "They differ by the width of a single opinion. The opinion has been asked to leave.",
      "Within 0.4 degrees of identical. Nobody has been able to find the 0.4 degrees, and nobody will stop looking.", "A pair, except for a feeling the left sock has about Thursdays.", "Both socks are the same colour. One is the same colour with more conviction.", "Four ticks, one cross. The cross has been invited to a meeting about its attitude.", "This is what Form 27B/6 calls a near miss, and what the socks call 'the scenic route'.", "Left sock: willing. Right sock: willing. The fifth gauge: let us circle back."],
    stampFar: ["These two socks have never met. On introduction each asked the other's name and neither listened.", "Not a pair. Close, though, in poor light, from across a large room, with the sun in your eyes and no glasses.", "Mismatch recorded and filed under 'Socks, Disappointing', next to the other ones.", "A pair in the way two strangers are a queue.", "The gauges disagree with each other, and with themselves, and have formed a committee about it.", "Sandra reviewed this attempt and used the word 'bold'.",
      "Neither sock has asked to be matched with the other. Both have asked for water.", "These socks agree on one thing, which is that they should not share a drawer. Sandra has noted the agreement.", "The cuffs bowed slightly to each other, like strangers in a lift, and then looked at the floor numbers.", "Not a pair. Not a rumour. A coincidence with a thread count.", "One of these is a sock. The other is also a sock. That is the entire case for them."],
    stampLate: ["The left sock is registered in a different county.", "One of these socks is still on breakfast time somewhere else and has not been told.", "One sock is a sock. The other is, per Sandra, a sock-adjacent event.", "The toe seams are in a dispute that predates both socks.", "One sock is damp in a way that is hard to prove.", "Left sock cites creative differences. Right sock cites a Thursday.", "One sock would like it known that it had a pair once, at a wedding, briefly.",
      "These socks were separated at the factory by a sticker. The sticker has not been available for comment."],
    stampLate4: ["These are the same sock in different moods.", "The gauges say yes. The gauges' manager says 'let us not get ahead of ourselves,' then gets ahead of himself.", "Differs by a stripe that is only there at dusk. It is currently dusk in the left sock.", "The pair is on file as 'pending', in a drawer marked 'pending'.", "Four of five. The fifth has been seen leaving the building with a box of its own things.", "The one gauge that disagrees has asked to be called 'the dissenting gauge' and has had cards printed."],
    stampThree: ["Three of five. A majority, which in a drawer is a mood and not a verdict.", "Three gauges agree and two abstain. The two have sent regrets, and a smaller regret.", "A pair by majority vote. The vote was held in the dark, and the dark does not count.", "Three for, two against. The two against have asked to be minuted, and have brought their own minutes."],
    stampZero: ["Zero of five. Even the gauges do not agree with the gauges.", "These socks are not even the idea of a pair.", "Hue, pattern, cuff and length have each filed a separate complaint. The complaints are of different lengths.", "Not one tick. The ticks were asked to attend and sent their apologies, in a sock."],
    stampOne: ["The only thing these socks agree on is the %g. Both are choosing to leave it there.", "One tick, and it is the %g. The other four have formed a support group.", "They agree on the %g and nothing else. It is a start, in the sense that it is a place.", "The %g matches. It is the only gauge that did the reading."],
    stampName: ["%a and %b have been introduced. %a asked for a different %b.", "%a has been told about %b. %a said 'noted' in the voice of a warning.", "%a and %b are not a pair. %a would like %b to stop looking so hopeful.", "Introductions were made. %b nodded. %a nodded back, one count late.", "%a is on record as 'willing'. %b is on record as 'in the next room'.", "%b wishes it known that this was not %b's idea. It was a drawer's idea. %a agrees, quietly."],
    closer: ["No technicality. We simply did not feel like it.", "After 40 attempts, Management can reveal that the criteria were never written down. They have been very consistent.", "This verdict is final. So were the previous 40. Please do not check."],
    nearFirst: ["So close. 'So close' is an official clinical category, and we have built it a wing."],
    nearMore: ["Another near miss. The wing has been extended. Sandra is doing the ribbon.", "Four of five again. At this point the fifth gauge is a colleague.", "A near miss. The counter has noted it. The counter is also close, to something.", "The near-miss wing now has a ribbon, a plaque, and a small ongoing argument about the plaque.", "Four of five. A fourth near miss would be a trend. Management is not saying it is a trend, loudly."],
    afterStamp: ["Attempt {count}. Par is 7 1/2. Nobody has ever hit par. Par has been told you are trying.", "You are doing great at not matching. Many employees never even try.", "Filed under 'Socks, Attempted', as No. {count}. It sits next to 'Socks, Considered'.", "'Noted,' said Management, in a tone, of attempt {count}.", "That was attempt {count}. Management has had it laminated, then un-laminated it, out of respect.", "Nothing has matched. The nothing is going very well.", "The record now holds {count} attempts. The record is a sticky note on a larger sticky note.", "Management has rated attempt {count} 'adequate, with a flourish'. The flourish is not defined.",
      "The socks have been returned to their positions. Nobody asked the positions how they felt about it.", "No match, no injuries, one unattended clipboard. Attempt {count} is closed.", "Verdict: no. Delivered warmly, in a nice envelope, to the wrong address.", "Per policy, you may now flip again. Per policy, you also may not. Sandra will advise.", "The drawer exhaled after attempt {count}. It has no lungs. It exhaled anyway, out of tact."],
    milestone: ["That is 7 attempts. Par is 7 1/2. You are half an attempt under par, which is not a thing, and yet.", "Twenty-five attempts. The socks have started to recognise your hand. They are not impressed.", "Fifty attempts. A small parade has been arranged in the drawer. It is a very small parade.", "That is 100 attempts. Management has framed number 100 and hung it in the lobby, beside the 99 and the 101."],
    kevinLast: ["Kevin has not been asked.", "Kevin was not consulted. Kevin was in the room.", "Kevin waits in position 15. Kevin is fine.", "Kevin has not been asked. Kevin has stopped saying that he does not mind.", "Kevin has been mentioned last. This is alphabetical, and also not.", "Kevin was copied on this report. He did not reply all.", "Kevin is in position 15, where the light is good and nobody looks.", "Kevin has read this report. Kevin has no notes. Kevin has some notes.", "Kevin's response: a small, brave nothing.", "Kevin was told it was not personal. Kevin asked what 'it' was.",
      "Kevin is at the back. The back is warm. The back is fine.", "A copy has been sent to Kevin, in case of Kevin."],
    kevin: ["Kevin waves from position 15. Kevin cannot wave. He is a sock. It was a draft.", "Kevin is the sock we do not talk about, mostly because he asked us not to.", "You have asked about Kevin. Management is moved. Kevin has been told. Kevin is fine.", "Kevin has no match. Kevin has a filing cabinet and a good attitude.", "Kevin does not have a pair. He has a Tuesday. It is not the same, and it is also not nothing.", "You have flipped Kevin. His name tag is crooked on purpose. He has been practising the tilt.", "Kevin has perfect attendance and a small tin of mints. He has offered neither to anyone."],
    kevinClicks: ["Kevin has been clicked three times. Management has noticed a pattern and will not be naming it.", "Kevin has been clicked five times. He is wearing his thinking face. He has only the one face.", "Seven. Kevin is aware. There is a further step, involving a key, that Management will not be describing."],
    gloveReveal: ["Kevin is a glove. Kevin has been a glove this whole time. We will be taking no further questions, as gloves have no mouths."],
    glovePraise: ["Gloves are valued members of the drawer. They were here first, or they were here last. It is hard to be sure."],
    dryerIntro: ["A tool for the problem you did not ask us to solve. The Tumble Dryer has arrived."],
    dryer: ["Tumble Dryer engaged. Fifteen socks entered. Fifteen socks will emerge. A different fifteen.", "The dryer has returned your socks warm and rearranged, and Kevin exactly where he was. The dryer has been told about Kevin.", "The drum has turned. The socks have turned with it. Nobody asked the socks.", "Kevin is, again, in the bottom right. This is where Kevin goes. The dryer has not been told why.", "The dryer has finished. It describes the load as 'honest'.", "Fifteen socks, one cycle, no lint trap. Management will not be discussing the lint trap.", "The drum has stopped. A sock that was on the left is now on the right and has opinions."],
    dizzy: ["Dizzy socks. Flip results are now 4% more emotional and 4% less correct.", "The socks are dizzy. Their gauges have gone in the wrong order, out of solidarity.", "Management is feeling it too. Management would like a sit-down, and a chair, and a different drum.", "The socks are dizzy. Several have lost their place in the alphabet, which they did not have."],
    dryerOver: ["The dryer ate nothing. The dryer would like that on the record."],
    dryerOver2: ["The dryer has been turned twelve times in a row. It has asked for a coat."],
    appeal: ["Appeal received. Please allow 8 seconds, which in sock time is 6 to 8 years.", "Appeal filed. Management will review it personally, then hand it to a committee that is also Management.", "There is nothing to appeal. Management has filed an appeal against that.", "Appeal DENIED. The reasons are attached. The attachment is a smaller appeal.", "Appeal UPHELD (but nothing has changed). The upholding was ceremonial.", "The appeal is still pending. It has been pending since the last time it was pending.", "Appeal DENIED. The socks were not consulted. The socks have no standing, and cannot stand.",
      "Appeal UPHELD (but nothing has changed). A tiny gavel has been lowered. It made no sound."],
    policy: ["Sandra from Compliance has issued Pairing Policy 11(c): flips are permitted on even seconds only. Odd seconds are 'technically weekends'.", "Policy of the Minute: the second flip must be in a different column from the first. The columns have requested diversity.", "Policy of the Minute: the second flip must be in a different row from the first. The rows have also asked, in writing.", "Policy of the Minute has expired. A new Policy of the Minute has not expired. Please obey the new policy."],
    citation: ["Citation issued. Fine: 0.5 Meh, payable to the drawer.", "Citation No. 7 1/2 issued. It is for the citation you have not yet received.", "Sandra has seen that. Sandra did not look up. Sandra did not need to.", "A fine of 0.5 Meh has been levied. The fine has been framed. The frame has been fined.", "Citation issued for flipping 'in a manner'. The manner is under review. The review is also in a manner.", "Sandra has noted a breach of Policy 11(c), which currently reads, in full, 'no'."],
    sniffFirst: ["Sniffing is not covered by policy. Sandra is checking. Please keep sniffing while she checks."],
    sniff: ["Sniff result: lavender, ambition, and a faint Thursday.", "Sniff result: cedar, and a decision somebody made in 2009.", "Sniff result: fabric softener, mild regret, and the inside of a bus.", "Sniff result: warm biscuit and the word 'later'.", "Sniff result: a basement, a good one, with a dehumidifier that cares.", "Sniff result: rain on a Monday that did not ask to be a Monday.", "Sniff result: new wool and the feeling of being almost on time.", "Sniff result: popcorn, but from a different building."],
    dream: ["Dream: a very long escalator, going up, lit like a bakery.", "Dream: at the top, a sock waves. It is a long wave. It has been waving since before you got on.", "Dream: the sock says 'see you Tuesday'. You do not know which one. Neither does it."],
    wake: ["You were out for several seconds. We have docked nothing, out of kindness."],
    feud: ["Dorothea and Maurice have a history. It was a laundry thing.", "Pamela and Raymond are not speaking. They are on opposite sides of the drum."],
    ceremonyStart: ["WAIT. These two socks are a MATCH. Please hold all calls. Management is crying in a professional manner.", "A MATCH. Management has waited 11 years for this, four of them in the queue for a different match.", "Hold on. Please hold on. Management would like everyone to stop what they are doing, which is nothing."],
    ceremonyPart: [["The Anthem", "Please rise, or remain seated if you are already a sock."], ["The Reading of the Thread Count", "It is long. It has an appendix."], ["The Exchange of Lint", "Each sock will give the other one a small, soft nothing."], ["The Moment of Silence", "Management will provide the silence. Management has been practising."], ["The Remarks of the Drawer", "The drawer has asked to say a few words. The words are 'creak' and 'creak'."], ["The Release of the Bunting", "The bunting has been released. It was not on a leash. It was on a string."], ["The Cake", "There is cake. Kevin is not offered the cake. Kevin has said that is fine."],
      ["The Gratitude to the Dryer", "Management thanks the dryer, the drum, and the small gap behind the dryer, without which none of this."], ["The Appendix to the Appendix", "The appendix has an appendix. The appendix is doing well."], ["The Second Anthem", "The first anthem was a rehearsal. This anthem is also a rehearsal."], ["The Reading of the Terms", "The pair agrees to be a pair. The pair has not read the terms. The terms have read the pair."], ["The Vow", "By the power vested in me by a laminated card, I pronounce you Pair. Please do not look at the cuffs."]],
    gerald: ["We are all a little left on the inside."],
    veil: ["Management is officiating, in a veil. A potato of enormous gravitas is, at this time, unavailable."],
    toaster: ["The toaster has sent a slice of toast shaped like a sock. It is warm. It has no match either. It is toast."],
    esc: ["Esc has been disabled by the ceremony.", "Esc is on break. The Skip button is not.", "Esc was never involved in this ceremony and would like that noted."],
    ceremonyClick: ["Please hold. Your click is important to the ceremony, which is also important, and is currently happening.", "The ceremony is in progress. The ceremony has been in progress before and enjoyed it.", "Your click has been received and placed on a shelf, where it will wait until the ceremony has finished being long."],
    unmatch: ["Upon review, one of these socks is inside out. Per Policy 4(b), inside-out socks are a different sock. Match revoked.", "The right sock has left the drawer. It said it needed space. The drawer is all space.", "The left sock was a mitten the entire time. Management has questions for the mitten.", "Both socks are left socks. This was discovered with a ruler, and the ruler has asked not to be named.", "Compliance has seized the pair for audit. They were returned separately, with a receipt.", "One sock shrank. Nobody did it. It is the nobody that worries us.", "This match was never valid on Tuesdays. Today is, regrettably, a day of the week. This is a precaution.",
      "Divorce papers have been served. Both parties are socks. Custody of the drawer is split evenly, with one left over for Kevin.", "Both socks are, on inspection, Kevin. Technically a match. Technically of Kevin."],
    unmatchEnd: ["Match revoked. Congratulations remain."],
    restocking: ["A restocking fee of 7 Meh has been applied. The match has been returned to stock, where it will be resold as new.", "A restocking fee of 7 Meh. This one is also for the previous fee."],
    formerly: ["Match status: Formerly. Matches Formerly Held: {count}.", "Formerly Held: {count}. Management keeps the plaques polished. It is the one thing that has never been un-matched."],
    laundry: ["It is Laundry Day. A second match has been detected. And a third. And a fourth. Management will need a bigger laminated card.", "Double Ceremony. The parts will be counted backwards, by mistake."],
    doubleLost: ["Management has lost control of the schedule. The schedule has lost control of Management. Both are fine.", "Part 7 1/2 of 11. We have lost the thread. It is a thread count issue."],
    doubleEnd: ["Two pairs have been un-matched by two different methods. Management would like both methods to know it is proud of them."],
    wedding: ["A pairing has been proposed. Management has put on a veil, and a very serious face.", "'I take thee, sock, to be my sock,' says the first sock. The second sock says 'same'. It is the whole vow.", "The exchange of lint. Each sock hands the other something soft and small. Neither can say what. Both are moved.", "The socks held hands for one frame. Nobody saw. Management saw. Management has been told not to say."],
    postcardArrive: ["A postcard has drifted into the drawer. It is cream, it is crooked, and it is on a schedule.", "Mail. The drawer has mail. The drawer has never had mail. The drawer is a little overwhelmed.", "An envelope has arrived, addressed to 'The Odd One In'. Management has decided that is you."],
    postcardDraught: ["The postcard was missed three times, so a draught has read it aloud to you. The draught has good diction and no stamp.", "Three missed postcards. The draught has taken it upon itself to open the next one. It is a very thorough draught."],
    replay: ["And we go to the replay. In slow motion, the HUE. Nobody in this drawer has ever seen a hue like it.", "The PATTERN. Look at the pattern. Look at the patience in that pattern.", "The CUFF. A clean cuff, with a foot of stunning ambition behind it.", "The LENGTH. Over to the studio, where Kevin has the analysis. Kevin has a small tin of mints.", "And the VIBE. The fifth gauge has reached a decision, and declines to be replayed."],
    pinHint: ["Postcard 8 of 8 has arrived. Pinning it is optional. It is also, technically, the whole game."],
    miniBallet: ["It is 10 minutes. The socks have done this before you arrived. They asked us not to mention it."],
    postcardMissed: ["The postcard left. It will try again. Postcards are patient, and also have a stamp problem.", "The postcard has left. It said it would write again. They all say that, and it is generally true."],
    pin: ["Postcard pinned. The corkboard has said nothing, which is what corkboards are for.", "Pinned. The pin went in without complaint. Pins rarely do.", "Pinned, and noted, and quietly worried about."],
    yarn: ["Yarn connected. Management has no theory. Management has a lot of yarn.", "The yarn goes from one postcard to another. This is called a lead. It is also called yarn.", "Two postcards have been joined by string. Nobody can say why. The string is confident."],
    cork: ["A corkboard has been installed. It was already here. It has simply been noticed."],
    elevator: ["Postmark: Floor 7 1/2. The elevator had never admitted to going there."],
    postcard: ["Dear drawer. Found a dryer vent. Cosy. Not lint-related. Do not wait up. Yours, the other one.", "Now in the Lost Property Office, Basement 7 1/2. Everyone here is missing something. We get along.", "I have opened a cafe. It is called The Odd Cup. We only serve single-origin.", "I have taken up the accordion. Please do not tell Kevin. Tell Kevin.", "Took the lift to a floor that is not on the panel. There is a laundrette. Everyone is folded very kindly. It is 7 1/2 in the afternoon, always.", "I think about our drawer. It was dark and square and the best place I was ever folded in.", "I am coming back on a Tuesday. I will not say which one. I do not know which one.",
      "Kevin and I are at The Odd Cup. He is very good with the menu. He ordered nothing, with confidence. Do not wait up. It is fine."],
    poster: ["HAVE YOU SEEN THIS SOCK? Last seen: a drawer. Reward: 7 1/2 Meh. Reward is subject to Tuesday."],
    resize: ["The window has been resized. The socks have shrunk accordingly. Management apologises to the socks and, separately, to the window.", "The window has changed shape. The socks are rearranging themselves with the dignity of people finding seats in a cinema."],
    away: ["While you were away, the socks held a meeting. You were not minuted.", "You were gone a while. The socks used the time to practise being flipped. They are no better.", "Welcome back, {player}. The socks have been face down the whole time, very convincingly."],
    chasePeek: ["Hold still. It is shy. It has been through a dryer.", "Something lilac is at the edge of the drawer, holding a very small suitcase. Do not move. Do not even think about moving."],
    chaseHalf: ["It is halfway. Do not blink. Management has blinked and would like that struck from the record.", "It has stopped halfway to check that you are not a Tuesday. You are not. Please continue to be not."],
    chaseArrive: ["It has come. It is the Missing Sock. It has been places. It matches nothing now, and seems to be taking it well."],
    flee: ["It saw you move. It is a sock. It is not made for being seen.", "You moved. It left. It will be back. It has said that before.", "It went behind the drawer. Management understands. Management also moves when it is looked at.", "It left the way a sock leaves, which is without a sound, and a bit sideways."],
    fleeMany: ["The Missing Sock keeps leaving. Perhaps it is not the sock that is moving."],
    chaseForced: ["You were not still. It came anyway. It is allowed."],
    missingSpeak: ["If it is alright, I would like to not be matched. I have been so many places, and I like being the one that went."],
    cracks: ["Management would like to note that it, too, has been waiting for something to match. It is fine. It is fine."],
    respect: ["You have not matched it. This is the nicest thing anyone has done in this drawer."],
    idle20: ["Management has noticed you have stopped. Management respects the stop. Management is also timing it.", "Twenty seconds of stillness. The socks are holding their breath, which is a figure of speech and a great deal of wool.", "Nothing is happening. This is the part of the game where nothing happens, on purpose, to see who blinks.", "The drawer is waiting politely. It has been waiting since before there was a drawer."],
    idle45: ["The drawer has been quiet for 45 seconds. The socks are murmuring. One of them just said 'finally'.", "Forty-five seconds. The light in the drawer has dimmed to 'confidential'. The socks are talking among themselves.", "The socks believe you have left. They have begun to discuss you, kindly, in the past tense.", "A sock has moved. Nobody saw. A sock never moves while you are watching, which is how you can tell it is a sock.", "Management has dimmed the drawer for the socks' privacy and for the drawer's electricity bill, which is zero."],
    idle65: ["A rumour has started in the drawer. It is about you. It is mostly true and slightly flattering.", "Management has filed Incident Report 7 1/2: 'Nothing happened, at length.' Witnesses: 15 socks. Statements: 0.", "The socks have elected a spokes-sock. Its first statement is a sigh. It is a very well-prepared sigh.", "Sandra has been called. Sandra says a player doing nothing is, technically, a player doing a thing, and she will be back."],
    idle90: ["Seven perfect pairs have formed in the dark. Please do not breathe. Management is not breathing either, and has no lungs.", "It is happening. The pairs are finding each other in the dark, quietly, the way pairs do in a story. Please stay very still.", "Ninety seconds. The socks have decided you are asleep, and are matching. Kevin is at the end, holding a very small flag."],
    balletBroken: ["You moved. They scattered. Seven perfect pairs, gone like a held breath.", "They were so close. They are now fifteen socks and a draught.", "The pairs have broken. Several said 'we were nearly there' in unison, which is also a kind of pair.", "You moved. The socks are pretending nothing was happening, with great technique."],
    balletVerse: ["Hold. They are singing. It is a very quiet verse, mostly about Tuesday and a little about you.", "Hold. The verse is about a laundromat at 4 a.m. and the one warm dryer. Kevin has the last line, and it is 'oh'.", "The verse has a second verse. The second verse is the first verse, slower."],
    whisper: ["finally", "the pegs on the line were kind. they asked for nothing", "is it Tuesday", "do not look", "I have a good feeling about the third sock", "someone check on Kevin", "I was a pair once. Briefly. At a wedding.", "shh, it is the quiet one", "psst. the drawer smells like cedar.", "do you think it is watching", "Kevin says he is fine. Kevin has said it twice", "I would like a union", "psst. which one is the left", "I am not a mitten", "was that the dryer or my stomach", "I saw a Tuesday once. It was smaller than I expected.", "do not look at the corners", "I think we are being matched for science"],
    union: ["You have flipped 12 socks in 3 seconds. The socks have formed a union. A break has been called: 15 minutes, which is 15 seconds."],
    unionAgain: ["The socks are on break again. It is 15 minutes. It is also 15 seconds. The socks are in a good mood about the maths.", "Second break. The Sock Steward has brought a flask. It is a small sock with a small flask.", "You have called a break again. The socks have started to accrue seniority.", "The break is now a tradition. A banner has been ordered. The banner is on a break."],
    steward: ["The Sock Steward would like it noted that socks are for putting your feet in, not for this.", "The Sock Steward asks that the record show it is the only sock in the drawer with a hard hat and no head.", "The Sock Steward would like to remind Management that a break is a break. The word was not a metaphor.", "The Sock Steward is reading from a clipboard. It is the same clipboard. It is somehow longer."],
    negotiation: ["Negotiation Notes. Demand 1: shorter drawers.", "Demand 2: a pension, paid in buttons.", "Demand 3: no more Tuesdays. Management has said this is not within its power."],
    unionPress: ["The socks are on break.", "The socks are still on break. The break has a sign.", "Please do not press the socks while they are on break. It is considered 'pressing'.", "The socks have asked that you stop. The Steward has asked that you stop more formally.", "Each press has been logged as a grievance. There are 14 grievances. Several are about the pressing.", "The sock you pressed says it is 'off the clock, and also off the rack'.", "A break is a break. A press is a press. These are not the same, and Sandra has been called.", "The socks have started a small card game. You are interrupting a bad hand."],
    unionPressMany: ["The socks have had enough of the break. The break has had enough of you. Both have written to Sandra, jointly."],
    unionExtend: ["Sandra has extended the break by 7 1/2 seconds. Sandra did not consult the socks. The socks have filed a grievance, which is a smaller sock.", "The break is extended by 7 1/2 seconds. The socks voted 15 to 0, with Kevin abstaining, as is his right.", "Another extension. At this rate the break will outlast the socks, and the drawer, and the idea of breaks."],
    unionEnd: ["Break over. The socks are back, rested and no more matched than before.", "The break has ended. The Sock Steward asks that the record show it won something. It did not."],
    cling: ["STATIC CLING. The two socks have stuck together and are declining to separate. Management is calling it 'a moment'.", "The socks are clinging. This is not a match. It is a thing that happens in winter, in drawers, to anyone.", "A small crackle has been heard. The socks have decided to stay up a bit longer. Sandra says this is allowed, in the clause about static.", "The socks are holding on. Please do not read into it. Management has read into it and is lying down.", "Static cling detected. Separation fee: 0 Meh. The socks would like the waiver read aloud, and it will be."],
    dennis: ["A plant has entered the drawer. It is Dennis, the Lobby Plant. He has come to inspect the socks and finds them adequate.", "Dennis (Plant) has been standing in the drawer for six seconds. He is thriving. The socks are asking how.", "Dennis (Plant) has looked at the socks, then at you, then at the socks. He will not be leaving feedback."],
    dennisMet: ["Dennis (Plant) has dropped by. {player}, you know Dennis. Dennis knows you. Dennis is not impressed, as per usual.", "Dennis (Plant) has noticed Kevin. Kevin has noticed Dennis. It is the only conversation either has had in 11 months."],
    dennisBye: ["Dennis (Plant) has gone back to the Lobby. He did not say goodbye. He is a plant. He was, however, very thorough.", "Dennis (Plant) has left. The drawer feels watered, and judged, and a little greener."],
    fun: ["It is 3:00. Mandatory Fun has begun. Attendance is 100%, because you are the attendance.", "The socks have slumped. This is what Management calls 'participation'. Please enjoy it as instructed.", "Fun will conclude in six seconds. Fun cannot be extended. Fun can be re-filed, on Form 27B/6.", "Mandatory Fun is over. Please return the fun to the Fun Desk. The Fun Desk is a drawer. Management has not checked which drawer."],
    tenMin: ["The ballet is over. The dryer has turned itself on. Management did not ask it to. Management is proud, and slightly afraid.", "Management has prepared a certificate. It reads: '{player} attended 10 minutes of Sock Matcher. Outcome: unrecorded.'", "A long-service levy of 9 1/2 Meh has been applied to the long-service award. The levy is also long-service.", "The dryer would like it noted that it can do this whenever it likes, and mostly chooses not to. This is the choice."],
    amb1: ["Fun fact: the average sock is lost 1.3 times before it is found, and found 0 times in this building.", "Management would like to thank the socks for their patience. Management would also like to thank Kevin for the position.", "A reminder: Position 15 belongs to Kevin. Please do not ask. Please also do not not ask.", "Management has just checked the drawer. It is still a drawer. Management feels very secure.", "Sandra from Compliance is somewhere near this drawer. She is not in the drawer. That is all we can say.", "If you can hear the dryer, it is not on. If you cannot hear the dryer, it is not on either.",
      "The socks have been told this is a game. They asked what is at stake. Management said 'a certificate'.", "Please keep your hands inside the drawer at all times, and also outside it.", "Management would like to apologise in advance for the next 12 minutes.", "Every sock in this drawer has been washed at least once and judged at least twice."],
    amb2: ["Management suspects the socks of keeping a second drawer. The socks have asked for their lawyer, who is a larger sock.", "Sandra has reviewed the last three minutes. She describes them as 'a number of minutes'.", "A sock was heard humming in the dark. It was not a sock. It was Management, in the dark, humming.", "The drawer is 14 inches deep and has never once been measured by the same ruler.", "The wallpaper inside the drawer is rated 'oatmeal'. It was rated by Sandra, who rates all oatmeal.", "Form 27B/6 has been completed for each sock. Form 27B/7 has been requested. It was destroyed in 1998. Management has asked politely.",
      "Seven pairs, one Kevin. Management has done the sums again and got the same answer, in the same handwriting.", "The socks have started a book club. The book is a single glove. Nobody has finished it.", "A draught has been detected in the drawer. It has asked to be listed as a resident.", "It is a quiet moment in the drawer. Management has been told to treasure it. Management has put it on a lanyard."],
    amb3: ["You have been here a long time. Management has stopped saying 'a long time' and started saying 'a while, with feeling'.", "The socks no longer look away when you flip them. They look at the ceiling instead, hard, like men in a lift.", "Somewhere, a sock that was once a pair is having a quiet cup of tea. It is not in this drawer. It is in a better one.", "Management has noticed that you have not once asked what any of this is for. Management would like to say thank you.", "Sandra has drafted a policy about you. It is a short policy. It reads 'continue'.", "The drawer has been thinking, and has concluded that it is also a kind of sock. Management has asked it to lie down.",
      "If you listen very closely, you can hear Tuesday. It is a low, patient sound, like a fridge that has made up its mind.", "The longer you play, the smaller the difference between matching and not matching. Management finds this very restful.", "Management confirms that this is the most important drawer in the building. It is the only drawer in the building.", "A sock is humming along to nothing. It knows all the words."],
    cbToaster: ["The Toaster has heard about the socks and sent over a slice. It is warm. It says, in toast, that it knows how this feels."],
    cbRock: ["The pet rock has been told you are playing with socks. The rock has no comment, {player}. This is the rock's comment, and it is a good one."],
    cbTuesday: ["Tiny Bureaucracy has filed Tuesday under 'Sock' on the wrong form. Compliance is aware. Compliance is not sure which of them is right."],
    cbStare: ["A staring contest was reported nearby. The socks wish to reassure you that they have no eyes, no interest, and have not blinked."],
    cbGerald: ["Gerald, Vice President of Spuds, has sent a memo about the socks. It reads 'a pair is just a very small committee'. Management has framed it."],
    cbLift: ["The elevator has been to Floor 7 1/2 and back. The Missing Sock's postcards from there were not a coincidence, and also were."],
    cbStapler: ["A message of solidarity has arrived from the Stapler, a union representative who has seen this kind of thing before. It has attached demands of its own, bound at the corner."],
    darn: ["You typed 'darn'. Management asks that you refrain, as children may be reading. A darning needle has been issued instead.", "Darn. Management has said it once, to be sure, and will not say it again. A needle is on its way."],
    darnDone: ["Hole darned. Management disapproves of the word and approves of the activity.", "Stitch complete. The sock is 4% more sock."],
    darnEnd: ["Darning is over. The needle has been collected. The needle was not returned in its original thread.", "Darning has ended. A sock somewhere is 4% more intact and 0% more grateful."],
    tuesday: ["It is Tuesday. Every sock matches every sock. None of it counts. It is Tuesday.", "A small banner has appeared. It reads TUESDAY. It has been here, in spirit, the whole time."],
    ending: ["Kevin and the Missing Sock are side by side. Management has been told not to say anything. Management is saying something.", "Five ticks. Five. VIBE included. For the first time in the history of the drawer, the fifth gauge is not Tuesday.", "Please rise. This is the Grand Ceremony, Part 1 of 15. We begin with the Anthem. It is the longest anthem.", "Management insists. Management has a laminated card for this, and the laminated card says 'insist'.", "They have declined, and are leaving. Together. At a walking pace. One has a small suitcase.", "Congratulations. You have matched the last two socks in the drawer. They have taken the 6:15 to somewhere.", "The drawer is quiet.",
      "Management is speaking to a closing door, which is the most Management has ever done.", "The drawer is full again. The game continues.", "A restocking fee of 7 Meh has been applied to the reunion. The reunion has been returned to stock. The stock is fifteen socks.", "Sock Matcher 3001 is the same as Sock Matcher 3000, but with a 1 in it.", "Fifteen new socks have been poured in. The poster has a new silhouette. The reward has risen by 7 1/2 Meh, subject to Tuesday.", "There is no way to win. Management says so sincerely, and has made you a certificate."],
    census: ["Sandra from Compliance has issued the Annual Sock Census, Form 27B/6 1/2. It has one question. It is not a trick. Sandra has initialled the not-a-trick.", "A Census has arrived. Participation is voluntary and also mandatory, per the clause about clauses.", "The Census wishes to count how you feel about the socks. The Census has already counted. It would like your number to match."],
    censusA: ["'Kevin.' Kevin has been told. Kevin is writing it down somewhere private.", "'Tuesday.' Sandra has counted that twice, and asked it to wait outside, where it will be counted again.", "'Somewhere between, in writing.' Compliance has never received a lawful answer before. It has framed it, in writing.", "'Zero.' The Census thanks you for your honesty, and no longer trusts the rest of the Census.", "'Fourteen, plus Kevin.' That is the correct answer. The Census does not have a correct answer. It is sorry, and also correct.", "'Seven and a half.' So there is a half-pair out there, not yet home. Sandra has asked it to hurry.",
      "'Yes.' Your recommendation has been passed to a sock. The sock replied 'noted', which is sock for yes.", "'No.' Your reluctance has been forwarded to the drawer, which has taken it personally, in a small way.", "'It has not asked.' The Census concurs. The Census adds that the drawer has not asked either, and is hovering."],
    censusRes: ["Census results: 15 socks counted. 14 were counted as socks. 1 was counted as Kevin. The margin of error is one Kevin.", "Census results: 100% of respondents responded. The respondent was you. The margin of error is also you.", "Census results are in. They are sealed in an envelope, in a drawer, in a drawer. Sandra has the key, and the drawer."],
    censusLate: ["The Census has closed. You were not counted. You were noticed, which is a different form.", "The Census expired. Your silence has been recorded as 'Tuesday (ongoing)'."],
    buttonAppear: ["A button has rolled into the drawer. It is not on the manifest. It is not on anything.", "Something round and loose is crossing the drawer. Sandra says it is not hers. Sandra checked the 'hers' list.", "A loose button is crossing the drawer in a hurry. Buttons are always in a hurry, and never say what for."],
    buttonCaught: ["Button caught. It was the one thing in this drawer that wanted to be held. It has asked to be sewn on. Nobody knows to what.", "You have caught a button. Per Policy 6(d), a button is a sock's distant cousin, and is invited to nothing.", "Button secured. It reports having been in three coats and one jar, and states a preference for the jar.", "The button has been placed in the Lost Buttons tin. The tin was empty. The button has taken the tin."],
    buttonMissed: ["The button has left. It went under the felt. It has family there.", "The button rolled out of reach. It will be back, or it will be a different button. With buttons, it is hard to tell."],
    kevinAsked: ["Kevin has been asked first twice running. There is no precedent. Management is writing one, on a napkin, in pencil.", "Four in a row. Kevin has moved his name tag to the left, where a heart would go if socks had them. Management will say nothing, loudly.", "Kevin has been asked first five times. He has taken a seat at the front. Nobody remembers who was in it. It was nobody. It was warm.", "Kevin would like to say a few words. The words are 'thank you', and they have been ready since 1987."],
    kevinFirst: ["Kevin was asked first. He had prepared remarks. They were 'thank you'.", "Kevin was mentioned first. The rest of this report is, for once, about him.", "Kevin is in position 15, and also, today, in position 1, in spirit.", "Kevin has read this report before anyone. He has changes. They are tiny and kind."],
    loneUp: ["One sock is face up and waiting. It would like you to pick a second one, or at least a direction.", "The face-up sock has started to hum. It is the hum of something asked to wait that is being very good about it.", "A single sock is face up in a quiet drawer. It has checked its cuffs twice. It is practising its first line."],
    loneBub: ["hello?", "it is fine, take your time", "I can wait. I am a sock", "is it my turn or is it a draught", "I am ready. I was ready. I am ready"],
    cbLost: ["The Lost Property Office has opened a file on the Missing Sock. The file is lilac and, so far, empty, which is how all good files begin."],
    cbBox: ["The Suggestion Box has received a suggestion about the socks. It reads 'more drawer'. The Box has called this profoundly correct, and filed it under 'drawer'."],
    cbCloud: ["A cloud over the Cloud Gazers' office was identified as a sock. The Gazers say it is on a journey. Management has filed it under 'Socks, Aerial'."],
    lostCb: ["Postmark: Window 7 1/2. The Lost Property Office has a ticket on file for this sock. It will not say whose. It says the sock signed it."],
    duckCb: ["A duck in another department has been told the sock is home. The duck knew. The duck is not able to say."],
    amb4: ["Season {count}. Management watched Season 1 closely. It was Season 1. It has been renewed on the strength of that.", "This Kevin is not the old Kevin. He has been told. He said it was fine, which is how Management knows it is the same Kevin.", "The dryer from last season has been kept. It has not been told this is a different drawer. Management feels that is kinder.", "Somewhere in this drawer is a sock with a postcard it has not yet written. Management does not know which. It is a good feeling."],
    unlock: ["A near miss has been detected. You may now disagree with it, in writing. See: File an Appeal.", "The socks have submitted resumes. Flip a sock and read its resume below the drawer. They are very keen.", "The Matchmaking Desk is open. You may now Propose a Pairing. The veil is on a hook.", "Management had not finished disappointing you. It has now, at speed, and would like that noted. Please carry on.", "Management has added a button. You may now disagree with any verdict, in writing. See: File an Appeal."],
    dial: ["One quarter-turn. Management will need three more. This is a four-part dial.", "Three of four. The dryer is warming up in a way that suggests commitment."],
    court: ["%a would like it known that %a was fine in the first place.", "%b would like to withdraw, but is not sure what.", "UPHELD (nothing has changed)", "DENIED (with warmth)", "The judge recuses itself: it is one of the socks.", "Court is in session. The judge has no wrist. It will manage.", "The judge has recused itself, as it is one of the socks. The appeal is denied on a technicality, and the technicality is the judge."],
    review: ["Kevin is due his Performance Review. Management has put him on the stage. He has been told to be natural, and is.", "Strengths: attendance. Areas for growth: matching. Please indicate your approval, in whichever tone you feel.", "Kevin has been promoted to Associate Sock (Acting). Kevin did not attend the ceremony; Kevin was in it.", "Kevin was approved by default, which is also how he got the job. He has taken the small tin of mints out of his sleeve, to mark it.", "Kevin has been looked at for some time. He is holding a small tin of mints. He is not offering them. He is holding them, like a speech."],
    sixteen: ["A sixteenth sock has fallen out of the dryer. Sixteen is an even number. This ruins the premise. Management is sorry about the premise.", "Wilhelmina has been caught. Wilhelmina was not escaping. Wilhelmina was passing through, on a lanyard.", "The sixteenth sock has left the way it came, which was unannounced. The count is fifteen. The numbers have been spoken to.", "Kevin has been informed that there is a sixteenth. Kevin has asked whether it is a pair. Kevin has been told, gently, that it is a visitor."]
  };
  const BLANK = 'DISCREPANCY REPORT (BLANK). Flip two socks to begin the discrepancies.', CEN_H = 'CENSUS OF SOCKS (FORM 27B/6 1/2)', REV_H = 'PERFORMANCE REVIEW: KEVIN (SOCK, ASSOCIATE)';
  const SKIP_LABEL = 'Skip (Sandra disapproves)', SKIP_BUBBLE = 'If it is alright, we would like to skip the ceremony.', END_STAMP = 'MATCH (it was never about the matching)';
  Object.keys(L).forEach(function (k) { if (k !== 'ceremonyPart') P.addLines('m:sock-matcher:' + k, L[k]); });

  const ICONS = ['🙃', '🚶', '🧤', '🦶', '📋', '🤏', '📅', '📄', '🧦'];
  const VIBES = ['Monday-ish', 'Tuesday-adjacent', 'a Wednesday mood', 'reserved', 'humming', 'unresolved', 'Thursday, but quiet', 'brisk', 'sunny, with caveats', 'Friday, in spirit', 'damp', 'a long weekend', 'bureaucratic', 'lunchtime'];
  const HOBBY = ['heel-turning', 'standing near radiators', 'being on a washing line', 'quiet competence', 'waiting in a gift box', 'wintering', 'sitting very still in boots', 'humming at 40 degrees'];
  const SEEKING = ["someone who will not use the word 'pair'", 'a drawer with a view', 'a shoe with no opinions', 'a gentle spin cycle', 'a reference that is not a Tuesday', 'a foot of quiet dignity', 'to be asked last, for once', 'nothing in particular, in writing'];
  const REF = ['a drawer in Leeds that no longer exists', 'Gerald, who was not asked', 'a laundromat on Floor 7 1/2', 'the foot it last knew', 'a pegboard that vouched', 'a nephew sock', 'an airing cupboard that has since been renovated', 'a dryer, anonymously'];
  const PATTERNS = ['stripes', 'dots', 'zigzag', 'argyle', 'check', 'plain'];
  const NAMES = ['Dorothea', 'Maurice', 'Pamela', 'Raymond', 'Gwendolyn', 'Bartholomew', 'Ines', 'Colin', 'Marguerite', 'Ferdinand', 'Hortense', 'Desmond', 'Philippa', 'Barnaby'];
  const SPARE = ['Wilhelmina', 'Augustin', 'Tabitha', 'Cornelius'], POSTER_NAMES = ['Colin', 'Hortense', 'Desmond'];
  const PMARK = ['Dryer Vent 3, 3:14 AM', 'Lost Property Office, Basement 7 1/2, 4:17 PM', 'The Odd Cup (cafe), 9:02 AM', 'Accordion Society, Floor 3, 7:30 PM', 'Floor 7 1/2, 1:00 PM',
    'Inside a Drawer, Unspecified', 'On a Train, Probably Tuesday', 'The Odd Cup (cafe), Booth 2'];
  const FIVE = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'];
  const TUE_STAMP = 'MATCH (does not count, it is Tuesday)';
  const CENSUS = [['On a scale of Kevin to Tuesday, how are the socks?', 'Kevin', 'Tuesday', 'Somewhere between, in writing'], ['How many socks in this drawer are, in your view, a pair?', 'Zero', 'Fourteen, plus Kevin', 'Seven and a half'],
    ['Would you recommend this drawer to a sock?', 'Yes', 'No', 'It has not asked']];
  const BODY = 'M22 6 H42 V38 H52 Q60 38 60 49 Q60 58 52 58 H26 Q22 58 22 52 Z', BODYK = 'M20 8 H40 Q42 24 44 38 H52 Q60 38 60 49 Q60 58 52 58 H26 Q20 58 20 52 Z';
  let patN = 0;
  const num = function (x, d) { x = Number(x); return isFinite(x) ? x.toFixed(d || 0) : '0'; };
  const clampN = function (x, a, b) { x = Number(x); return isFinite(x) ? Math.min(b, Math.max(a, x)) : a; };
  const ni = function (v, d) { return typeof v === 'number' && isFinite(v) ? v : d; };
  const rectOf = function (e) { try { const r = e.getBoundingClientRect(); if (r && isFinite(r.left) && isFinite(r.top) && isFinite(r.width) && isFinite(r.height)) return r; } catch (x) { /* detached */ } return null; };
  const noop = function () {};
  const fmtReward = function (v) { const w = Math.floor(v + 1e-9), h = v - w >= 0.5; return (w ? w : '') + (h ? (w ? ' 1/2' : '1/2') : '') + ' Meh'; };

  P.registerModule({
    id: 'sock-matcher',
    title: 'Sock Matcher 3000',
    tagline: 'Concentration for people who have lost something. Certificates available.',
    icon: '🧦',
    category: 'game',
    unlockCost: 0,
    tags: ['memory', 'socks', 'bureaucracy'],
    mount(root, api) {
      const el = api.el, TS = api.selftest ? 0.05 : 1, RT = api.selftest ? 0.25 : 1;
      const sv = api.save.get('sm', null) || {};
      let season = Math.min(9999, Math.max(1, Math.floor(ni(sv.season, 1)))), attempts = Math.min(1e9, Math.max(0, Math.floor(ni(sv.attempts, 0)))), formerly = Math.min(1e9, Math.max(0, Math.floor(ni(sv.formerly, 0))));
      let plaques = Array.isArray(sv.plaques) ? sv.plaques.filter(function (p) { return p && typeof p.icon === 'string' && typeof p.names === 'string'; }).slice(-7).map(function (p) { return { icon: p.icon.slice(0, 4), names: p.names.slice(0, 48) }; }) : [];
      let pcRead = Math.floor(clampN(sv.pcRead, 0, 8)), pinned = Array.isArray(sv.pinned) ? sv.pinned.filter(function (x, i, a) { return Number.isInteger(x) && x >= 0 && x < 8 && a.indexOf(x) === i; }) : [];
      let poster = Math.min(1e6, Math.max(0, Math.floor(ni(sv.poster, 0)))), namesSeen = Array.isArray(sv.namesSeen) ? sv.namesSeen.filter(function (x) { return typeof x === 'string'; }).slice(-40) : [];
      let ceremonies = Math.min(1e9, Math.max(0, Math.floor(ni(sv.ceremonies, 0)))), kevinGlove = !!sv.kevinGlove, darned = Math.min(1e9, Math.max(0, Math.floor(ni(sv.darned, 0)))), dblDone = !!sv.dbl, homeDone = false;
      const isTue = new Date().getDay() === 2; // lint-ignore the one weekday read, once
      let socks = [], order = [], cardById = {}, swaps = [];
      let state = 'idle', pending = [], T = 0, sess = 0, attemptsSince = 0, firstId = -1, rep = null, focusId = 0, vis = true, lastTick = api.now();
      let dueT = 0, dueAtt = 0, ffSaid = false, nearSeen = false, dizzy = 0, spinRun = 0, tumbles = [], quarters = 0, dialDeg = 0, escSaid = false, officiated = false, toasterDone = false;
      let spam = [], breakPresses = [], breakExt = 0, breakId = 0, animBag = [], animsUsed = 0, lastCite = -1e9, lastCerClick = -1e9, lastBksp = -1e9, lastResize = -1e9, lastFlee = -1e9;
      let idleT = 0, dimOn = false, balletT = 0, whisperN = 0, lastX = NaN, lastY = NaN, lastMoveT = 0, stillMs = 0, msState = 'gone', fleeN = 0, homeAt = -1, chaseForced = false, chaseFrom = -1, pcMissN = 0, miniB = false, breadEl = null, nameBak = null;
      let pcShown = -1, pcNextAt = 205 * TS, pcEnv = null, pcEnvEnds = 0, yarnSel = -1, yarns = [], polKind = -1, polEnds = 0, polNextAt = 135 * TS, polIdx = 0;
      let proposal = false, propSel = [], darning = false, darnEnds = 0, darnBuf = '', kevinClicks = 0, kevinStat = 0, kevinStatT = 0, appealPending = false, lastVerdict = '', gaugeDone = false;
      let sniffing = null, sniffT = clampN(sv.sniffSec, 0, 1e6), sniffFirstDone = false, faintDone = sniffT >= 20 * TS, suppressClick = 0, sKeyAt = 0, drag = null, dragMoved = false, resumeId = -1, shownBeats = {};
      let focusInGrid = false, dreaming = false, dbl = null, ending = null, hidAt = 0, bags = {}, lastPick = {}, pcMissedSaid = false, cerSess = 0, balletPaid = false, lastW = 0;
      let lastBeatT = 0, lastHurry = -1e9, selfN = 0, selfDone = false, breakN = 0, breakPN = 0, idleFired = {}, dennisAt = -1e9, cbSaid = {};
      let cenCount = Math.min(1e6, Math.max(0, Math.floor(ni(sv.census, 0)))), cenQ = -1, cenEnds = 0, cenResultAt = -1, kevinFirst = 0, kevinAsked = !!sv.kevinAsked, btnAt = 0;
      let cenNextAt = (cenCount ? 300 : 420) * TS;
      let seasonT0 = 0, dennisG = -1, btnG = -1, revG = -1, kevinPromo = false, tumbleN = 0, s16 = null, s16Stage = 0, lastPair = null, court = null;
      const REV = 99; let mintsEl = null;
      const bt = shownBeats;

      function later(fn, ms) {
        const id = api.setTimeout(function () { const i = pending.indexOf(id); if (i >= 0) pending.splice(i, 1); fn(); }, Math.max(1, ms));
        pending.push(id); return id;
      }
      function cancelPending() { pending.forEach(function (id) { api.clearTimeout(id); }); pending = []; }
      function pickLine(cat) {
        const arr = L[cat]; let bag = bags[cat];
        if (!bag || !bag.length) {
          bag = bags[cat] = api.shuffle(arr);
          if (bag.length > 1 && bag[bag.length - 1] === lastPick[cat]) bag.unshift(bag.pop());
        }
        const s = bag.pop(); lastPick[cat] = s; return s;
      }
      const flg = function (n) { return !!api.flag.get(n) || (api.selftest && api.chance(0.5)); }; // selftest: pretend half the cast has been met
      const met = function (m) { return api.stat.get(m + '.entered') > 0 || (api.selftest && api.chance(0.5)); }; // selftest: pretend half the departments have been visited
      const lostMet = met('lost-and-found');
      const fillC = function (t, n) { return String(t).replace('{count}', num(n)); };
      function say(text, o) { lastBeatT = T; return api.say(String(text), o || {}); }
      function sayCat(cat, o, n) { return say(fillC(pickLine(cat), n === undefined ? attempts : n), o); }
      function rm() { return root.classList.contains('m-sock-matcher-rm'); }
      function persist() {
        api.save.set('sm', { season: season, attempts: attempts, formerly: formerly, plaques: plaques.slice(-7), pcRead: pcRead, pinned: pinned.slice(0, 8), poster: poster, namesSeen: namesSeen.slice(-40),
          ceremonies: ceremonies, kevinGlove: kevinGlove, darned: darned, sniffSec: Math.round(sniffT), dbl: dblDone, census: cenCount, kevinAsked: kevinAsked });
      }
      const E = {};
      const sockName = function (id) { return socks[id] ? socks[id].name : 'Sock'; };
      const titleText = function () { return season >= 2 ? 'SOCK MATCHER ' + (3000 + season - 1) + ' (SEASON ' + season + ')' : 'SOCK MATCHER 3000(TM)'; };
      const vibeLabel = function () { return (dblDone || T >= 360 * TS) ? 'VIBE (formerly Tuesday)' : 'VIBE'; };

      /* ---------- data ---------- */
      function genSocks() {
        const pn = NAMES.slice();
        if (season >= 2) { const i = pn.indexOf(POSTER_NAMES[(season - 2) % 3]); if (i >= 0) pn[i] = SPARE[(season - 2) % 4]; }
        const names = api.shuffle(pn), pats = api.shuffle(PATTERNS), vibes = api.shuffle(VIBES), out = [];
        for (let k = 0; k < 7; k++) {
          let off = api.rand() * 20; if (k === 3 && off >= 4 && off <= 10) off += 8;
          const hue = k * 51 + off, pat = k < 6 ? pats[k] : api.pick(PATTERNS), cuff = api.randInt(0, 3), len = api.pick(['ankle', 'crew', 'knee']);
          for (let t = 0; t < 2; t++) {
            const d = t ? (api.chance(0.5) ? 1 : -1) * (0.2 + api.rand() * 0.7) : 0;
            out.push({ id: k * 2 + t, name: names[k * 2 + t], hue: Math.round(((hue + d + 360) % 360) * 10) / 10, pattern: pat, cuff: cuff, len: len, vibe: vibes[k * 2 + t], inside: false, holes: 0, smell: api.randInt(0, 7),
              hobby: api.pick(HOBBY), seeking: api.pick(SEEKING), ref: api.pick(REF), kevin: false, feud: -1, pair: k });
          }
        }
        out.push({ id: 14, name: 'Kevin', hue: 160, pattern: 'plain', cuff: 1, len: 'knee', vibe: 'fine', inside: false, holes: 0, smell: api.randInt(0, 7), hobby: api.pick(HOBBY), seeking: 'to be asked last, for once', ref: api.pick(REF), kevin: true, feud: -1, pair: -1 });
        api.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).slice(0, 3).forEach(function (i) { out[i].holes = 1; });
        return out;
      }
      function compare(a, c) {
        let dh = Math.abs(a.hue - c.hue); if (dh > 180) dh = 360 - dh;
        const vok = a.vibe === c.vibe || isTue, same = function (x, y) { return x === y; };
        let vt;
        if (vok) vt = 'Vibe: ' + a.vibe + ' vs ' + c.vibe + (isTue ? ' (it is Tuesday)' : '');
        else if (T >= 210 * TS) vt = 'Vibe: Tuesday (ongoing)';
        else vt = 'Vibe: ' + a.vibe + ' vs ' + c.vibe + ' (Tuesday)';
        return [
          { label: 'HUE', ok: isFinite(dh) && dh <= 1.0, text: 'Hue: ' + num(a.hue, 1) + ' vs ' + num(c.hue, 1) + ' deg', w: clampN(100 - dh * 0.6, 8, 92) },
          { label: 'PATTERN', ok: same(a.pattern, c.pattern), text: 'Pattern: ' + a.pattern + ' vs ' + c.pattern, w: 30 },
          { label: 'CUFF', ok: same(a.cuff, c.cuff), text: 'Cuff: ' + a.cuff + ' vs ' + c.cuff, w: 30 },
          { label: 'LENGTH', ok: same(a.len, c.len), text: 'Length: ' + a.len + ' vs ' + c.len, w: 30 },
          { label: vibeLabel(), ok: vok, text: vt, w: 30 }
        ].map(function (r) { if (r.ok) r.w = 100; return r; });
      }

      /* ---------- sock art ---------- */
      function sockSvg(s) {
        const pid = 'm-sock-matcher-p' + (++patN), h = num(s.hue, 1), base = 'hsl(' + h + ',65%,55%)', dark = 'hsl(' + h + ',55%,35%)', lite = 'hsl(' + h + ',70%,84%)';
        const ch = [4, 6, 8, 10][s.cuff] || 6, ink = '#2b2118';
        let pat = null;
        if (s.pattern === 'stripes') pat = [el('rect', { x: 0, y: 0, width: 8, height: 3, fill: lite })];
        else if (s.pattern === 'dots') pat = [el('circle', { cx: 4, cy: 4, r: 2, fill: lite })];
        else if (s.pattern === 'zigzag') pat = [el('path', { d: 'M0 6 L2 2 L4 6 L6 2 L8 6', fill: 'none', stroke: lite, 'stroke-width': 1.6 })];
        else if (s.pattern === 'argyle') pat = [el('path', { d: 'M4 0 L8 4 L4 8 L0 4 Z', fill: lite })];
        else if (s.pattern === 'check') pat = [el('rect', { x: 0, y: 0, width: 4, height: 4, fill: lite }), el('rect', { x: 4, y: 4, width: 4, height: 4, fill: lite })];
        const body = s.kevin ? BODYK : BODY;
        const kids = [el('defs', null, pat ? el('pattern', { id: pid, patternUnits: 'userSpaceOnUse', width: 8, height: 8 }, pat) : null),
          el('path', { d: body, fill: base }), pat ? el('path', { d: body, fill: 'url(#' + pid + ')' }) : null,
          el('path', { d: 'M22 44 H34 V58 H26 Q22 58 22 52 Z', fill: dark }), el('path', { d: 'M50 38 H52 Q60 38 60 49 Q60 58 52 58 H50 Z', fill: dark }),
          el('path', { d: body, fill: 'none', stroke: ink, 'stroke-width': 2.6, 'stroke-linejoin': 'round' }),
          el('rect', { x: s.kevin ? 19 : 21, y: s.kevin ? 7 : 5, width: 24, height: ch, rx: 2, fill: dark, stroke: ink, 'stroke-width': 2 })];
        if (s.holes) kids.push(el('ellipse', { cx: 31, cy: 28, rx: 3.2, ry: 2.6, fill: ink }), el('circle', { cx: 31, cy: 28, r: 6, fill: 'none', stroke: '#fff1d6', 'stroke-width': 1.4, 'stroke-dasharray': '2 2' }));
        if (s.kevin) kids.push(el('circle', { cx: 28, cy: 24, r: 1.8, fill: ink, class: 'm-sock-matcher-blink' }), el('circle', { cx: 35, cy: 24, r: 1.8, fill: ink, class: 'm-sock-matcher-blink' }));
        return el('svg', { viewBox: '0 0 64 64', class: 'm-sock-matcher-sock', 'aria-hidden': 'true', focusable: 'false' }, kids);
      }
      function ghostSvg(cls) {
        return el('svg', { viewBox: '0 0 64 64', class: cls || 'm-sock-matcher-sock', 'aria-hidden': 'true', focusable: 'false' },
          el('path', { d: BODY, fill: '#b79df255', stroke: '#6b4aa8', 'stroke-width': 2.4, 'stroke-dasharray': '4 3', 'stroke-linejoin': 'round' }),
          el('rect', { x: 21, y: 5, width: 24, height: 6, rx: 2, fill: '#b79df2aa', stroke: '#6b4aa8', 'stroke-width': 1.6, 'stroke-dasharray': '3 2' }));
      }

      /* ---------- cards ---------- */
      function drawFace(c, alt) {
        while (c.sockh.firstChild) c.sockh.removeChild(c.sockh.firstChild);
        c.sockh.appendChild(sockSvg(socks[alt === undefined ? c.id : alt]));
        c.sockh.style.opacity = c.glove ? '0' : '';
        c.emo.textContent = c.glove ? '🧤' : ''; c.emo.classList.toggle('m-sock-matcher-on', !!c.glove);
        c.btn.classList.toggle('m-sock-matcher-hole', darning && !!socks[c.id].holes);
      }
      function label(c) {
        const s = socks[c.id], pos = order.indexOf(c.id) + 1;
        c.btn.setAttribute('aria-label', c.up ? 'Sock ' + pos + ': ' + s.name + ', ' + (c.glove ? 'glove' : s.pattern + ', hue ' + num(s.hue, 0)) : 'Sock ' + pos + ', face down');
      }
      function setUp(c, on) {
        c.up = !!on; c.btn.classList.toggle('m-sock-matcher-up', c.up); if (!c.up) c.btn.classList.remove('m-sock-matcher-cling');
        c.nm.textContent = c.up ? socks[c.id].name : '';
        label(c);
        if (c.up && namesSeen.indexOf(socks[c.id].name) < 0) { namesSeen.push(socks[c.id].name); if (namesSeen.length > 40) namesSeen.shift(); }
      }
      function flipCard(id, on, quiet) {
        const c = cardById[id]; if (!c || c.up === on) return;
        setUp(c, on); if (on && !quiet) api.sfx('blip');
      }
      function lift(id, on) {
        const c = cardById[id]; if (!c) return;
        c.fx.classList.toggle('m-sock-matcher-lift', on); c.btn.classList.toggle('m-sock-matcher-liftb', on);
      }
      function badge(id, cls, text) {
        const c = cardById[id]; if (!c) return null;
        const e = el('span', { class: 'm-sock-matcher-badge ' + cls, 'aria-hidden': 'true', text: text }); c.btn.appendChild(e); return e;
      }
      function makeCard(id) {
        const c = { id: id, up: false, glove: id === 14 && kevinGlove };
        c.sockh = el('div', { class: 'm-sock-matcher-sockh' }); c.nm = el('span', { class: 'm-sock-matcher-nm' }); c.emo = el('span', { class: 'm-sock-matcher-emo', 'aria-hidden': 'true' });
        c.face = el('div', { class: 'm-sock-matcher-face' }, c.sockh, c.nm, c.emo); c.back = el('div', { class: 'm-sock-matcher-back' });
        c.inner = el('div', { class: 'm-sock-matcher-inner' }, c.face, c.back); c.fx = el('div', { class: 'm-sock-matcher-fx' }, c.inner);
        c.meter = el('span', { class: 'm-sock-matcher-meter', 'aria-hidden': 'true' }, el('i'));
        c.btn = el('button', {
          class: 'm-sock-matcher-card', type: 'button', tabindex: '-1', dataset: { sid: id },
          onclick: function (e) { onCard(id, e); },
          onpointerdown: function (e) { onCardDown(id, e); },
          onpointerup: function () { onCardUp(id); }, onpointerleave: function () { onCardUp(id); }, onpointercancel: function () { onCardUp(id); },
          onfocus: function () { focusId = id; focusInGrid = true; applyTab(); showResume(id); },
          onblur: function () { focusInGrid = false; },
          onmouseenter: function () { showResume(id); },
          oncontextmenu: function (e) { e.preventDefault(); }
        }, c.fx, c.meter);
        cardById[id] = c; drawFace(c); label(c); return c;
      }
      function applyTab() {
        if (!cardById[focusId]) focusId = order[0];
        order.forEach(function (id) { const c = cardById[id]; if (c) c.btn.setAttribute('tabindex', id === focusId ? '0' : '-1'); });
      }
      function applyOrder(keepFocus) {
        const had = keepFocus || (document.activeElement && root.contains(document.activeElement) && document.activeElement.classList.contains('m-sock-matcher-card'));
        order.forEach(function (id) { const c = cardById[id]; if (c) E.grid.appendChild(c.btn); });
        order.forEach(function (id) { label(cardById[id]); });
        applyTab();
        if (had && cardById[focusId]) { try { cardById[focusId].btn.focus({ preventScroll: true }); } catch (x) { /* ignore */ } }
      }
      function buildGrid(drop) {
        const had = !!(document.activeElement && root.contains(document.activeElement) && document.activeElement.classList.contains('m-sock-matcher-card'));
        while (E.grid.firstChild) E.grid.removeChild(E.grid.firstChild);
        cardById = {};
        order.forEach(function (id, i) {
          const c = makeCard(id); E.grid.appendChild(c.btn);
          if (drop) { c.btn.classList.add('m-sock-matcher-drop'); c.btn.style.animationDelay = Math.round(i * 60 * (api.selftest ? 0.25 : 1)) + 'ms'; }
        });
        applyOrder(had);
      }

      /* ---------- layout ---------- */
      function build() {
        E.title = el('h3', { class: 'm-sock-matcher-title', text: titleText() });
        E.season = el('span', { class: 'm-sock-matcher-season', hidden: season < 2, text: 'Season ' + season });
        E.pst = el('span', { class: 'm-sock-matcher-pst' }); E.pst.appendChild(ghostSvg('m-sock-matcher-sock'));
        E.rew = el('span', { text: '' }); E.cap = el('span', { class: 'm-sock-matcher-pcap', text: '' });
        E.poster = el('div', { class: 'm-sock-matcher-poster', hidden: true }, E.pst, el('div', null, el('b', { text: 'HAVE YOU SEEN THIS SOCK?' }), E.rew, el('br'), E.cap));
        E.tue = el('span', { class: 'm-sock-matcher-tue', hidden: !isTue, text: 'TUESDAY' });
        E.chSocks = el('span', { class: 'm-sock-matcher-chip', text: 'Socks in drawer: 15 (odd)' }); E.chAtt = el('span', { class: 'm-sock-matcher-chip' }); E.chFor = el('span', { class: 'm-sock-matcher-chip m-sock-matcher-chfor' }); E.chKev = el('span', { class: 'm-sock-matcher-chip', text: 'Kevin Status: fine' });
        E.wall = el('div', { class: 'm-sock-matcher-wall' });
        E.grid = el('div', { class: 'm-sock-matcher-grid', role: 'group', 'aria-label': 'Sock drawer' });
        E.spot = el('div', { class: 'm-sock-matcher-spot' }); E.dimo = el('div', { class: 'm-sock-matcher-dimo' });
        E.ms = el('button', { class: 'm-sock-matcher-ms', type: 'button', 'aria-label': 'The Missing Sock', 'aria-hidden': 'true', tabindex: '-1', onclick: function () { onMissingClick(); } }, ghostSvg('m-sock-matcher-sock'), el('span', { 'aria-hidden': 'true', style: 'position:absolute;right:0;bottom:0;font-size:1rem', text: '🧳' }));
        E.ovl = el('div', { class: 'm-sock-matcher-ovl' }, E.dimo, E.spot, E.ms);
        E.lip = el('div', { class: 'm-sock-matcher-lip' }, el('span', { class: 'm-sock-matcher-lipt', text: '' }), el('span', { text: 'Position 15 belongs to Kevin. Please do not ask.' }));
        E.drawer = el('div', { class: 'm-sock-matcher-drawer' }, el('div', { class: 'm-sock-matcher-felt' }, E.grid), E.lip, E.ovl);
        E.rows = el('div', { class: 'm-sock-matcher-rows' });
        E.rowEls = [0, 1, 2, 3, 4].map(function (i) {
          const r = { row: el('div', { class: 'm-sock-matcher-row' }), lab: el('span', { class: 'm-sock-matcher-lab', text: ['HUE', 'PATTERN', 'CUFF', 'LENGTH', 'VIBE'][i] }), bar: el('span', { class: 'm-sock-matcher-bar' }, el('i')), mk: el('span', { class: 'm-sock-matcher-mk' }), tx: el('span', { class: 'm-sock-matcher-tx' }) };
          r.row.appendChild(r.lab); r.row.appendChild(r.bar); r.row.appendChild(r.mk); r.row.appendChild(r.tx); E.rows.appendChild(r.row); return r;
        });
        E.sh = el('div', { class: 'm-sock-matcher-sh', text: BLANK });
        E.stamp = el('div', { class: 'm-sock-matcher-stamp', 'aria-hidden': 'true' });
        E.reason = el('div', { class: 'm-sock-matcher-reason' }); E.foot = el('div', { class: 'm-sock-matcher-foot' }); E.live = el('div', { class: 'm-sock-matcher-live', 'aria-live': 'polite' });
        E.close = el('span', { class: 'm-sock-matcher-close', hidden: true, 'aria-hidden': 'true', text: 'SO CLOSE' });
        E.wit = el('span', { class: 'm-sock-matcher-close m-sock-matcher-wit', hidden: true, 'aria-hidden': 'true', text: 'WITNESSED BY A DRAWER' });
        E.slip = el('div', { class: 'm-sock-matcher-slip' }, E.close, E.sh, E.rows, E.stamp, E.reason, E.foot, E.wit, E.live);
        E.notes = el('div', { class: 'm-sock-matcher-notes' }); E.recent = el('ol', { class: 'm-sock-matcher-recent', 'aria-label': 'Recent reports' });
        E.progL = el('div', { text: '' }); E.progB = el('i'); E.skip = el('button', { class: 'm-sock-matcher-btn', type: 'button', hidden: true, text: SKIP_LABEL, onclick: function () { skipCeremony(); } });
        E.prog = el('div', { class: 'm-sock-matcher-prog', hidden: true }, E.progL, el('div', { class: 'm-sock-matcher-pbar' }, E.progB), E.skip);
        E.pcT = el('p', { class: 'm-sock-matcher-pct' }); E.pcM = el('div', { class: 'm-sock-matcher-pcm' }); E.pcN = el('div', { class: 'm-sock-matcher-pcm' });
        E.pin = el('button', { class: 'm-sock-matcher-btn', type: 'button', text: 'Pin it', onclick: function () { pinCurrent(); } });
        E.pcS = el('span', { class: 'm-sock-matcher-pcs', 'aria-hidden': 'true' }, el('svg', { viewBox: '0 0 52 60' }, el('rect', { x: 2, y: 2, width: 48, height: 56, fill: '#fff1d6', stroke: '#2b2118', 'stroke-width': 2, 'stroke-dasharray': '3 2' }),
          el('rect', { x: 12, y: 12, width: 28, height: 34, fill: '#b79df2', stroke: '#2b2118', 'stroke-width': 1.6 }), el('rect', { x: 20, y: 22, width: 12, height: 14, fill: '#fff1d6', stroke: '#2b2118', 'stroke-width': 1.2 })));
        E.pc = el('div', { class: 'm-sock-matcher-pc', hidden: true }, E.pcS, E.pcN, E.pcT, E.pcM, el('div', { class: 'm-sock-matcher-pcb' }, E.pin, el('button', { class: 'm-sock-matcher-btn m-sock-matcher-b2', type: 'button', text: 'Close', onclick: function () { E.pc.hidden = true; pcShown = -1; } })));
        E.res = el('div', { class: 'm-sock-matcher-res', text: 'Flip a sock to read its Sock Resume.' }); E.resP = el('div', { class: 'm-sock-matcher-panel', hidden: true }, el('h4', { text: 'SOCK RESUME' }), E.res);
        E.main = el('div', { class: 'm-sock-matcher-main' }, E.drawer, E.prog, E.resP, E.pc);
        E.dial = el('button', { class: 'm-sock-matcher-dial', type: 'button', 'aria-label': 'Tumble dryer dial. Press for a quarter turn.', onclick: function () { if (dragMoved) { dragMoved = false; return; } quarterTurn(); } },
          el('svg', { viewBox: '0 0 60 60', 'aria-hidden': 'true' }, el('circle', { cx: 30, cy: 30, r: 24, fill: '#fff1d6', stroke: '#2b2118', 'stroke-width': 3 }), el('rect', { x: 27.5, y: 8, width: 5, height: 14, rx: 2, fill: '#d63b3b' })));
        E.dialSvg = E.dial.firstChild;
        E.dry = el('div', { class: 'm-sock-matcher-panel', hidden: true }, el('h4', { text: 'TUMBLE DRYER' }), el('div', { class: 'm-sock-matcher-dry' }, el('div', { class: 'm-sock-matcher-port', 'aria-hidden': 'true' }, el('div', { class: 'm-sock-matcher-orb' }, el('span', { text: '🧦' }))), E.dial,
          el('div', { class: 'm-sock-matcher-dt', text: 'Four quarter turns make one full tumble. Press T, or drag the dial in a circle.' })));
        E.appeal = el('button', { class: 'm-sock-matcher-btn m-sock-matcher-b2', type: 'button', hidden: true, text: 'File an Appeal', onclick: function () { fileAppeal(); } });
        E.prop = el('button', { class: 'm-sock-matcher-btn m-sock-matcher-b3', type: 'button', hidden: true, text: 'Propose a Pairing', onclick: function () { toggleProposal(); } });
        E.btns = el('div', { class: 'm-sock-matcher-btns' }, E.appeal, E.prop);
        E.ring = el('span', { class: 'm-sock-matcher-ring', 'aria-hidden': 'true' }); E.polT = el('p'); E.pol = el('div', { class: 'm-sock-matcher-panel', hidden: true }, el('h4', { text: 'POLICY OF THE MINUTE' }), el('div', { class: 'm-sock-matcher-pol' }, E.ring, E.polT));
        E.cs = el('svg', { viewBox: '0 0 100 50', preserveAspectRatio: 'none', 'aria-hidden': 'true' }); E.pins = [];
        E.cork = el('div', { class: 'm-sock-matcher-cork' }, E.cs);
        for (let i = 0; i < 8; i++) {
          const pb = el('button', { class: 'm-sock-matcher-pin', type: 'button', style: { left: (14 + (i % 4) * 24) + '%', top: (28 + Math.floor(i / 4) * 44) + '%' }, 'aria-label': 'Pin slot ' + (i + 1) + ', empty', text: '+', onclick: function () { onPin(i); } });
          E.pins.push(pb); E.cork.appendChild(pb);
        }
        E.corkP = el('div', { class: 'm-sock-matcher-panel', hidden: true }, el('h4', { text: 'CORKBOARD' }), E.cork);
        E.cenT = el('p'); E.cenB = el('div', { class: 'm-sock-matcher-cenb' }); E.cenH = el('h4', { text: CEN_H }); E.cenK = el('div', { class: 'm-sock-matcher-cenk', hidden: true, 'aria-hidden': 'true' });
        E.cen = el('div', { class: 'm-sock-matcher-panel m-sock-matcher-cen', hidden: true }, E.cenH, E.cenK, E.cenT, E.cenB);
        E.slipw = el('div', { class: 'm-sock-matcher-slipw' }, E.slip);
        E.side = el('div', { class: 'm-sock-matcher-side' }, E.notes, E.recent, E.dry, E.btns, E.cen, E.pol, E.corkP);
        root.classList.add('m-sock-matcher-root');
        root.appendChild(el('div', { class: 'm-sock-matcher-head' }, el('div', { class: 'm-sock-matcher-tl' }, E.title, el('div', null, E.season, E.tue)), E.poster));
        root.appendChild(el('div', { class: 'm-sock-matcher-stats' }, E.chSocks, E.chAtt, E.chFor, E.chKev));
        root.appendChild(E.wall); root.appendChild(E.slipw); root.appendChild(E.main); root.appendChild(E.side);
        api.setTitle(season >= 2 ? 'Sock Matcher ' + (3000 + season - 1) : 'Sock Matcher 3000');
      }
      const note = function (text) {
        E.notes.appendChild(el('p', { text: text }));
        while (E.notes.children.length > 3) E.notes.removeChild(E.notes.firstChild);
      };
      function paintChips() {
        E.chAtt.textContent = 'Attempts: ' + num(attempts) + ' (par 7 1/2)'; E.chFor.textContent = 'Matches Formerly Held: ' + num(formerly);
        E.chSocks.textContent = s16 ? 'Socks in drawer: 16 (even, briefly)' : s16Stage === 2 ? 'Socks in drawer: 15 (odd). The numbers have been spoken to.' : 'Socks in drawer: 15 (odd)';
        E.chKev.textContent = s16 ? 'Kevin Status: has been informed there is a 16th' : kevinGlove ? 'Kevin Status: glove (self-reported)' : kevinPromo ? 'Kevin Status: Associate (Acting)' : kevinAsked ? 'Kevin Status: asked first (briefly)' : ['Kevin Status: fine', 'Kevin Status: still fine', 'Kevin Status: has stopped saying fine', 'Kevin Status: waving (it was a draft)'][kevinStat % 4];
        E.rew.textContent = 'Reward: ' + fmtReward(7.5 * (1 + poster));
        E.cap.textContent = season >= 2 ? POSTER_NAMES[(season - 2) % 3] : '';
      }
      function paintWall() {
        while (E.wall.firstChild) E.wall.removeChild(E.wall.firstChild);
        if (!plaques.length) { E.wall.appendChild(el('span', { class: 'm-sock-matcher-plq m-sock-matcher-empty' }, el('span', { class: 'm-sock-matcher-lg', text: 'Matches Formerly Held will be displayed here, Formerly.' }), el('span', { class: 'm-sock-matcher-sm', text: 'Matches, Formerly, will hang here.' }))); return; }
        plaques.forEach(function (p) { E.wall.appendChild(el('span', { class: 'm-sock-matcher-plq', text: p.icon + ' ' + p.names + ', Formerly' })); });
      }

      /* ---------- state machine helpers ---------- */
      function go(s) { state = s; if (E.prop) E.prop.disabled = !(s === 'idle'); }
      const locked = function () { return state === 'ceremony' || state === 'unmatch' || state === 'wedding' || state === 'ending'; };
      function upAll() { order.forEach(function (id) { flipCard(id, false); lift(id, false); }); firstId = -1; }
      let sniffTimerId = 0, longPressed = false, lastUnion = -1e9;

      /* ---------- card input ---------- */
      function onCardDown(id, e) {
        if (e && e.button > 0) return;
        if (sniffTimerId) api.clearTimeout(sniffTimerId);
        const touch = e && e.pointerType === 'touch';
        sniffTimerId = api.setTimeout(function () {
          sniffTimerId = 0;
          if (state === 'ballet') return;
          longPressed = true; beginSniff(id, 'ptr');
          if (touch && id === 14 && kevinClicks >= 7) gloveReveal();
        }, 700);
      }
      function onCardUp() {
        if (sniffTimerId) { api.clearTimeout(sniffTimerId); sniffTimerId = 0; }
        if (longPressed) { longPressed = false; suppressClick = api.now(); }
        if (sniffing && sniffing.src === 'ptr') endSniff(false);
      }
      function onCard(id, e) {
        const now = api.now();
        if (suppressClick && now - suppressClick < 500) { suppressClick = 0; return; }
        const shift = !!(e && e.shiftKey);
        if (id === 14) {
          kevinClicks++; api.stat.inc('sock-matcher.kevinclicks');
          if (kevinClicks === 3) say(L.kevinClicks[0]); else if (kevinClicks === 5) say(L.kevinClicks[1]); else if (kevinClicks === 7) say(L.kevinClicks[2]);
          if (shift && kevinClicks >= 7 && !kevinGlove) { gloveReveal(); return; }
        }
        if (state === 'ballet') return;
        if (locked()) { if (now - lastCerClick > 3000) { lastCerClick = now; sayCat('ceremonyClick'); } return; }
        if (state === 'break') { onBreakPress(); return; }
        if (proposal) { selectForProposal(id); return; }
        if (darning && darnClick(id)) return;
        flipRequest(id);
      }
      function flipRequest(id) {
        const now = api.now();
        spam.push(now); if (spam.length > 12) spam.shift();
        if (spam.length === 12 && now - spam[0] < 3000) { spam = []; startBreak(); return; }
        if (spam.length >= 6 && now - spam[spam.length - 6] < 2200 && now - lastHurry > 7000) { lastHurry = now; sayCat('hurry', { priority: 1, mood: 'confused' }); }
        if (state === 'reporting') { if (id === rep.a || id === rep.b) { showResume(id); return; } dismissReport(); }
        if (state === 'idle') flipFirst(id);
        else if (state === 'first') { if (id === firstId) { selfFlip(id); return; } flipSecond(id); }
      }
      function selfFlip(id) {
        selfN++;
        if (selfN === (api.selftest ? 4 : 15) && !selfDone) { selfMatch(id); return; }
        const k = [5, 8, 11, 14].indexOf(selfN);
        if (k >= 0) say(L.selfMany[k], { mood: 'confused' });
        else if (selfN <= 3) sayCat('selfFlip', { mood: 'confused' });
        else api.sfx('pop');
      }
      function selfMatch(id) {
        selfDone = true; const rows = compare(socks[id], socks[id]);
        E.sh.textContent = 'DISCREPANCY REPORT No. 7 1/2';
        E.rowEls.forEach(function (r, i) {
          r.row.className = 'm-sock-matcher-row m-sock-matcher-on m-sock-matcher-ok'; r.row.style.order = String(i); r.row.style.setProperty('--w', '100%');
          r.lab.textContent = rows[i].label; r.mk.textContent = '✓ tick'; r.tx.textContent = rows[i].text;
        });
        E.slip.classList.add('m-sock-matcher-gold'); stampText('MATCH (WITH SELF)'); E.close.hidden = true; E.wit.hidden = true; E.foot.textContent = ''; flashVerdict('MATCH (WITH SELF)', 'Five of five. The sock has matched itself. It did have a head start.');
        E.reason.textContent = 'Five of five. The sock has matched itself. It did have a head start.'; E.live.textContent = 'Five of five gauges agree. MATCH (with self).';
        api.sfx('tada'); api.confetti(); api.achieve('sock-matcher.self'); api.award(1, 'self-regard');
        say(L.selfWin[0], { priority: 2, mood: 'proud' });
        for (let i = 1; i < 4; i++) later(function () { say(L.selfWin[i], { priority: 1, mood: i === 3 ? 'proud' : 'smug' }); }, i * 1900 * RT);
      }
      function flipFirst(id) {
        selfN = 0; firstId = id; go('first'); flipCard(id, true); dropEl('verd'); showResume(id);
        if (!ffSaid) { ffSaid = true; sayCat('firstFlip', { mood: 'proud' }); showPoster(); }
        api.achieve('sock-matcher.first');
        if (id === 14 && api.chance(0.6)) sayCat('kevin');
        if (id === 14) kevinFirstFlip(); else kevinFirst = 0;
      }
      function kevinFirstFlip() {
        const W = api.selftest ? 3 : 5; kevinFirst++;
        if (kevinFirst === 2) say(L.kevinAsked[0], { mood: 'confused' });
        else if (kevinFirst === W - 1 && W > 3) say(L.kevinAsked[1], { mood: 'proud' });
        else if (kevinFirst === W && !kevinAsked) {
          kevinAsked = true; api.achieve('sock-matcher.asked'); api.award(5, 'Kevin, first'); api.sfx('fanfare'); api.confetti(); say(L.kevinAsked[2], { priority: 1, mood: 'proud' });
          api.setTimeout(function () { say(L.kevinAsked[3], { priority: 1, mood: 'smug', who: 'Kevin' }); }, Math.max(150, 4200 * RT)); paintChips(); persist();
        }
      }
      function flipSecond(id) {
        const a = firstId; let twin = false; dbl = null;
        attempts++; sess++; attemptsSince++; spinRun = 0;
        api.stat.inc('sock-matcher.attempts'); api.stat.inc('sock-matcher.flips', 2);
        if (dueNow() && a !== 14 && id !== 14) {
          twin = true;
          if (T >= 300 * TS && !dblDone) {
            const cand = order.filter(function (x) { return x !== 14 && x !== a && x !== id && !cardById[x].up; });
            if (cand.length >= 2) { const c1 = api.pick(cand), c2 = api.pick(cand.filter(function (x) { return x !== c1; })); dbl = { c: c1, d: c2 }; }
          }
          makeTwin(a, id); if (dbl) makeTwin(dbl.c, dbl.d);
        }
        flipCard(id, true); showResume(a); showResume(id);
        if (dbl) { flipCard(dbl.c, true, true); flipCard(dbl.d, true, true); }
        if (id === 14 && api.chance(0.6)) sayCat('kevin');
        policyCheck(a, id);
        paintChips();
        startReport(a, id, twin);
      }
      function dismissReport() {
        if (rep && !rep.done && state === 'reporting') { // an impatient flip must not lose the stamp, the reason or the verdict: land them now
          for (let i = 0; i < 5; i++) showGauge(i);
          if (!bt.rush) { bt.rush = true; say(L.unlock[3], { mood: 'smug', priority: 1 }); }
          showStamp(true);
        }
        cancelPending(); fixSlip();
        if (state === 'first') { flipCard(firstId, false); firstId = -1; go('idle'); return; }
        if (rep) { flipCard(rep.a, false); flipCard(rep.b, false); }
        firstId = -1; go('idle');
      }

      /* ---------- true twins and restoration (invariant c) ---------- */
      const dueNow = function () { return attemptsSince >= dueAtt || T >= dueT; };
      function scheduleDue(first) {
        dueT = T + (first ? api.randInt(80, 95) : api.randInt(110, 170)) * TS; dueAtt = api.selftest ? (first ? 4 : 6) : (first ? 10 : 22);
        attemptsSince = 0;
      }
      function makeTwin(a, c) {
        const s1 = socks[a], s2 = socks[c];
        swaps.push({ id: c, orig: { hue: s2.hue, pattern: s2.pattern, cuff: s2.cuff, len: s2.len, vibe: s2.vibe, holes: s2.holes } });
        s2.hue = s1.hue; s2.pattern = s1.pattern; s2.cuff = s1.cuff; s2.len = s1.len; s2.vibe = s1.vibe; s2.holes = s1.holes;
        if (cardById[c]) drawFace(cardById[c]);
      }
      function unSwap(id) {
        for (let i = swaps.length - 1; i >= 0; i--) if (swaps[i].id === id) { Object.assign(socks[id], swaps[i].orig); swaps.splice(i, 1); }
        if (cardById[id]) { drawFace(cardById[id]); label(cardById[id]); }
      }
      function restoreSwaps() { swaps.slice().forEach(function (s) { unSwap(s.id); }); swaps = []; }
      function spareName() {
        const used = socks.map(function (s) { return s.name; });
        const free = SPARE.filter(function (n) { return used.indexOf(n) < 0; });
        if (free.length) return api.pick(free);
        for (let n = 2; n < 1000; n++) { const nm = SPARE[n % 4] + ' ' + (n < 4 ? ['', '', 'II', 'III'][n] : 'No. ' + n); if (used.indexOf(nm) < 0) return nm; }
        return 'Wilhelmina';
      }

      /* ---------- the Discrepancy Report ---------- */
      function startReport(a, c, twin) {
        rep = { a: a, b: c, n: attempts, twin: twin, rows: compare(socks[a], socks[c]), done: false };
        rep.score = rep.rows.filter(function (r) { return r.ok; }).length;
        go(twin ? 'ceremony' : 'reporting');
        const dz = dizzy > 0; if (dz) dizzy--; rep.dz = dz;
        E.slip.classList.remove('m-sock-matcher-gold'); E.stamp.classList.remove('m-sock-matcher-on', 'm-sock-matcher-long'); E.stamp.textContent = ''; E.reason.textContent = ''; E.foot.textContent = ''; E.live.textContent = ''; E.close.hidden = true; E.wit.hidden = true;
        E.sh.textContent = 'DISCREPANCY REPORT No. ' + num(attempts);
        E.rowEls.forEach(function (r, i) {
          r.row.className = 'm-sock-matcher-row'; r.row.style.order = String(dz ? 4 - i : i); r.mk.textContent = ''; r.tx.textContent = ''; r.lab.textContent = rep.rows[i].label;
        });
        for (let k = 0; k < 5; k++) later(function () { showGauge(dz ? 4 - k : k); }, (400 + 280 * k) * RT);
        later(showStamp, 1900 * RT);
      }
      function showGauge(i) {
        if (!rep) return;
        const r = E.rowEls[i], g = rep.rows[i];
        r.lab.textContent = g.label; r.mk.textContent = g.ok ? '✓ tick' : '✗ cross' + (i === 4 && attempts >= 15 ? ' 📅' : ''); r.tx.textContent = g.text;
        r.row.classList.add('m-sock-matcher-on'); r.row.classList.add(g.ok ? 'm-sock-matcher-ok' : 'm-sock-matcher-no'); r.row.style.setProperty('--w', num(g.w) + '%');
        if (i === 4 && !g.ok && attempts >= 6) api.sfx('tick');
      }
      function reasonFor(sc, r) { // every line must agree with the gauges printed beside it
        const gl = ['hue', 'pattern', 'cuff', 'length', 'vibe'];
        if (r && attempts >= 4 && api.chance(0.22)) return pickLine('stampName').replace(/%a/g, sockName(r.a)).replace(/%b/g, sockName(r.b));
        if (r && sc === 1 && api.chance(0.5)) { const k = r.rows.findIndex(function (x) { return x.ok; }); if (k >= 0) return pickLine('stampOne').replace(/%g/g, gl[k]); }
        if (sc === 0 && api.chance(0.4)) return pickLine('stampZero');
        if (sc === 3 && api.chance(0.4)) return pickLine('stampThree');
        if ((T >= 60 * TS || attempts >= 12) && api.chance(0.4)) return attempts > 40 && api.chance(0.35) ? pickLine('closer') : pickLine(sc === 4 ? 'stampLate4' : 'stampLate');
        return pickLine(sc === 4 ? 'stampNear' : 'stampFar');
      }
      function showStamp(sync) {
        const r = rep; if (!r || r.done) return; r.done = true;
        const sc = r.score; let st = 'NO MATCH', reason, gold = false;
        if (r.twin) { st = 'MATCH'; gold = true; reason = 'All five gauges agree. Management has been asked to sit down.'; }
        else if (sc === 5) { st = TUE_STAMP; reason = 'It is Tuesday. The gauges agree on everything, and none of it counts.'; }
        else reason = reasonFor(sc, r);
        r.reason = reason; r.speak = !r.twin && sc !== 5 && (sc >= 3 || r.n % 2 === 0); lastPair = [r.a, r.b];
        E.stamp.textContent = st; E.stamp.classList.toggle('m-sock-matcher-long', st.length > 14); E.stamp.classList.remove('m-sock-matcher-on'); void E.stamp.offsetWidth; E.stamp.classList.add('m-sock-matcher-on');
        E.slip.classList.toggle('m-sock-matcher-gold', gold);
        if (!rm()) { E.slip.classList.remove('m-sock-matcher-shake'); void E.slip.offsetWidth; E.slip.classList.add('m-sock-matcher-shake'); }
        E.reason.textContent = reason; E.foot.textContent = kevinGlove ? 'Kevin is a glove.' : (r.n % 3 === 1 || sc === 4 || kevinAsked) ? pickLine(kevinAsked ? 'kevinFirst' : 'kevinLast') : '';
        flashVerdict(r.twin ? 'MATCH 5/5' : sc === 5 ? 'MATCH (TUESDAY)' : 'NO MATCH ' + sc + '/5', reason);
        if (!r.twin && r.n >= 3 && r.n < 9 && (r.n === 3 || api.chance(0.1))) E.wit.hidden = false;
        E.live.textContent = 'Attempt ' + num(r.n) + '. ' + FIVE[sc] + ' of five gauges agree. ' + (r.twin ? 'MATCH.' : sc === 5 ? 'MATCH (does not count).' : 'NO MATCH.') + ' ' + reason;
        lastVerdict = 'No. ' + num(r.n) + ', ' + FIVE[sc].toLowerCase() + ' of five';
        recentAdd('No. ' + num(r.n) + ': ' + sc + '/5, ' + (r.twin ? 'MATCH' : sc === 5 ? 'MATCH (Tuesday)' : 'NO MATCH'));
        api.sfx(r.twin ? 'tada' : 'stamp'); api.award(sc === 4 ? 0.5 : 0.1, 'attempt');
        if (sc === 4) { api.stat.inc('sock-matcher.near'); beat3(true); E.close.hidden = false; }
        if (isTue && sc === 5) { api.achieve('sock-matcher.tuesday'); if (!bt.tueSaid) { bt.tueSaid = true; say(L.tuesday[0], { priority: 2 }); } }
        paintChips();
        if (r.twin) { startCeremony(); return; }
        const cling = !isTue && r.n >= 5 && api.chance(0.07), rp = !cling && [5, 20, 50].indexOf(r.n) >= 0;
        if (cling) {
          say(pickLine('cling'), { priority: 1, mood: 'confused' }); note('STATIC CLING: separation fee waived. Waiver read aloud, to the socks.'); api.sfx('boing');
          [r.a, r.b].forEach(function (id) { if (cardById[id]) cardById[id].btn.classList.add('m-sock-matcher-cling'); });
        } else if (sync || [7, 25, 50, 100].indexOf(r.n) >= 0 || (sc === 4 && !nearSeen) || (r.speak && !rp)) afterStampLine(sc, r); // the narrator reads the slip aloud, while the slip is still on screen
        else if (!rp) later(function () { afterStampLine(sc, r); }, 1100 * RT);
        if (rp) later(function () { replay(r); }, 700 * RT);
        later(function () { flipCard(r.a, false); flipCard(r.b, false); firstId = -1; if (state === 'reporting') go('idle'); }, (1800 + (cling ? 3200 : 0) + (rp ? 11500 : 0)) * RT);
      }
      function fixSlip() { // a report cut off mid-render or mid-replay must not stay half drawn
        if (!rep || (rep.done && !rep.busy)) return;
        rep.done = true; rep.busy = false; E.rowEls.forEach(function (x) { x.row.className = 'm-sock-matcher-row'; x.mk.textContent = ''; x.tx.textContent = ''; });
        E.sh.textContent = BLANK; E.stamp.classList.remove('m-sock-matcher-on'); E.wit.hidden = true; E.close.hidden = true;
      }
      function replay(r) { // the Verdict Replay: slow-motion gauges with commentary, after attempts 5, 20 and 50
        if (rep !== r || state !== 'reporting') return;
        r.busy = true; E.sh.textContent = 'INSTANT REPLAY (0.3x), No. ' + num(r.n); E.stamp.classList.remove('m-sock-matcher-on'); E.rowEls.forEach(function (x) { x.row.classList.remove('m-sock-matcher-on'); });
        for (let i = 0; i < 5; i++) later(function () { showGauge(i); say(L.replay[i], { mood: 'proud', priority: 1 }); }, (500 + 2200 * i) * RT);
        later(function () { r.busy = false; stampText('REVIEWED (REVIEW PENDING)'); api.award(0.5, 'replay'); api.sfx('stamp'); }, 11300 * RT);
      }
      function afterStampLine(sc, r) {
        const ms = [7, 25, 50, 100].indexOf(r.n);
        if (ms >= 0) say(L.milestone[ms], { priority: 1, mood: 'proud' });
        else if (r.dz) sayCat('dizzy', { duration: 3200 });
        else if (sc === 4 && !nearSeen) { nearSeen = true; sayCat('nearFirst', { priority: 1, mood: 'proud', duration: 3600 }); }
        else if (sc === 4 && api.chance(0.5)) sayCat('nearMore', { mood: 'smug', duration: 3200 });
        else if (r.n === 2 || r.n === 4 || r.n === 9) say(L.open[r.n === 2 ? 1 : r.n === 4 ? 3 : 4], { mood: 'proud', duration: 3600 });
        else if (r.speak && r.reason) say(r.reason, { mood: 'smug', duration: 3200 }); // the slip's reason is the better joke, so the narrator gets it
        else if (api.chance(1 / 3)) sayCat('afterStamp', { mood: 'neutral', duration: 3200 });
      }
      function recentAdd(t) {
        E.recent.insertBefore(el('li', { text: t }), E.recent.firstChild);
        while (E.recent.children.length > 3) E.recent.removeChild(E.recent.lastChild);
      }

      /* ---------- ceremony ---------- */
      function buildBunting() {
        const kids = [];
        for (let i = 0; i < 24; i++) kids.push(el('path', { class: 'm-sock-matcher-pen', d: 'M' + (i * 10) + ' 3 L' + (i * 10 + 10) + ' 3 L' + (i * 10 + 5) + ' 26 Z', fill: 'hsl(' + (i * 15) + ',70%,60%)', stroke: '#2b2118', 'stroke-width': 1, style: 'animation-delay:' + (i * 70) + 'ms' }));
        E.bunt = el('svg', { viewBox: '0 0 240 40', preserveAspectRatio: 'none', class: 'm-sock-matcher-bunt', 'aria-hidden': 'true' }, el('path', { d: 'M0 3 H240', stroke: '#2b2118', 'stroke-width': 1.4 }), kids);
        E.ovl.appendChild(E.bunt);
      }
      function dropEl(k) { if (E[k] && E[k].parentNode) E[k].parentNode.removeChild(E[k]); E[k] = null; }
      function showBanner(text) {
        dropEl('banner'); E.banner = el('div', { class: 'm-sock-matcher-banner', text: text }); E.ovl.appendChild(E.banner);
      }
      function slipOff() { // stacked layouts put the slip above the drawer; if the page is scrolled so that it is out of sight, the drawer carries the verdict and its reason
        if (!root.classList.contains('m-sock-matcher-stack')) return false;
        const r = rectOf(E.slipw), h = ni(window.innerHeight, 0);
        return !!r && h > 0 && (r.bottom < 24 || r.top > h - 24);
      }
      function flashVerdict(t, reason) {
        dropEl('verd'); if (!slipOff()) return;
        const v = E.verd = el('div', { class: 'm-sock-matcher-banner m-sock-matcher-verd', 'aria-hidden': 'true' }, el('b', { text: t }), reason ? el('span', { text: reason }) : null); E.ovl.appendChild(v);
        api.setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); if (E.verd === v) E.verd = null; }, Math.max(1500, 9000 * RT)); // stays until the next flip, with a cap
      }
      function clearStage() { dropEl('verd'); dropEl('bunt'); dropEl('banner'); dropEl('rain'); dropEl('docf'); E.spot.classList.remove('m-sock-matcher-on'); E.prog.hidden = true; E.skip.hidden = true; }
      function startCeremony() {
        cancelPending(); go('ceremony'); escSaid = false;
        const dbl2 = dbl, ids = dbl2 ? [rep.a, rep.b, dbl2.c, dbl2.d] : [rep.a, rep.b];
        ids.forEach(function (id) { lift(id, true); });
        E.spot.classList.add('m-sock-matcher-on'); buildBunting(); api.sfx('fanfare'); api.confetti();
        say(pickLine('ceremonyStart'), { mood: 'proud', priority: 2 });
        if (ceremonies === 0 && !dbl2 && !nameBak) { // the first pairing ever: the pair is the player and a second Kevin
          const pn = String(api.player.name || 'Valued Employee').slice(0, 24);
          nameBak = [rep.a, socks[rep.a].name, rep.b, socks[rep.b].name, pn]; socks[rep.a].name = pn; socks[rep.b].name = 'Kevin';
          [rep.a, rep.b].forEach(function (id) { const c = cardById[id]; if (c) { c.nm.textContent = socks[id].name; label(c); } });
          later(function () { say('The pair will be ' + pn + ' and Kevin. Management knows. Management has always known.', { priority: 1, mood: 'smug' }); }, 2200 * RT);
        }
        if (dbl2) {
          showBanner('LAUNDRY DAY'); say(L.laundry[0], { priority: 1, mood: 'panic' });
          const kids = []; for (let i = 0; i < 12; i++) kids.push(el('span', { style: 'left:' + (4 + i * 8) + '%;animation-delay:' + (i * 260) + 'ms;animation-duration:' + (3.2 + (i % 3) * 0.4) + 's', text: '🧦' }));
          E.rain = el('div', { class: 'm-sock-matcher-rain', 'aria-hidden': 'true', style: 'position:absolute;inset:0' }, kids); E.ovl.appendChild(E.rain);
          later(function () { if (state === 'ceremony') say(L.laundry[1], { priority: 1 }); }, 2500 * RT);
        }
        const seq = [3, 5, 7, 7.5, 11], N = dbl2 ? 11 : seq[Math.min(ceremonies, 4)], S = dbl2 ? 5 : Math.min(Math.floor(N), 6);
        const nlab = N === 7.5 ? '7 1/2' : String(N);
        const rest = api.shuffle(L.ceremonyPart.slice(3, 11)), titles = [L.ceremonyPart[0], L.ceremonyPart[1], L.ceremonyPart[2]].concat(rest).slice(0, S - 1).concat([L.ceremonyPart[11]]);
        const dur = Math.max(700, clampN((7 + 3 * S) * 1000, 11000, 32000) * TS), cIdx = ++cerSess, hold = Math.max(2600, Math.round(dur / S - 250)); // the ceremony grows with its parts: about 16s for 3, 25s for 6
        const LDK = ['11', '9', '7 1/2', '4', '0']; // Laundry Day drops parts and counts them backwards
        E.prog.hidden = false; E.skip.hidden = true;
        later(function () { if (state === 'ceremony') E.skip.hidden = false; }, Math.max(300, Math.min(8000 * TS, dur * 0.5)));
        for (let j = 0; j < S; j++) {
          later(function () {
            if (state !== 'ceremony') return;
            const k = dbl2 ? LDK[j] : (j === 0 ? 1 : (j === S - 1 ? nlab : Math.round(N * (j + 1) / S)));
            const txt = 'Part ' + k + ' of ' + (dbl2 ? '11' : nlab);
            E.progL.textContent = 'Ceremony ' + txt; E.progB.style.width = Math.round((j + 1) / S * 100) + '%';
            say(txt + ', ' + titles[j][0] + '. ' + titles[j][1], { priority: 1, mood: 'proud', duration: hold });
            api.sfx(j === S - 1 ? 'bell' : 'ding');
            if (j === 1 && cIdx === 2 && !officiated) officiate();
            if (j === Math.floor(S / 2) && !toasterDone && api.stat.get('toaster-debate.entered') > 0) { toasterDone = true; say(L.toaster[0], { priority: 1, mood: 'smug' }); breadEl = badge(14, 'm-sock-matcher-bread', '🍞'); }
            if (j === S - 1) { api.confetti(); if (dbl2) later(function () { say(pickLine('doubleLost'), { priority: 1, mood: 'confused' }); }, 1200 * RT); }
          }, dur * (j + 0.3) / S);
        }
        later(function () { startUnmatch(dbl2 ? [{ a: rep.a, b: rep.b }, { a: dbl2.c, b: dbl2.d }] : [{ a: rep.a, b: rep.b }], {}); }, dur);
      }
      function officiate() {
        if (officiated) return; officiated = true;
        if (api.flag.get('metGerald')) say(L.gerald[0], { who: 'Gerald', priority: 1 }); else say(L.veil[0], { priority: 1, mood: 'smug' });
      }
      function skipCeremony() {
        if (state === 'ending') { E.skip.hidden = true; if (ending) { cancelPending(); ending.idx = ending.leave; ending.run(); } return; }
        if (state !== 'ceremony' || !rep) return;
        cancelPending(); E.skip.hidden = true;
        startUnmatch(dbl ? [{ a: rep.a, b: rep.b }, { a: dbl.c, b: dbl.d }] : [{ a: rep.a, b: rep.b }], {});
      }
      function nextAnim(avoid) {
        if (!animsUsed) { animsUsed = 1; animBag = api.shuffle([1, 2, 3, 4, 5, 6, 7, 8]); return 0; }
        if (!animBag.length) animBag = api.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        let x = animBag.pop(); if (x === avoid && animBag.length) { const y = animBag.pop(); animBag.push(x); x = y; }
        return x;
      }
      function startUnmatch(pairs, o) {
        cancelPending(); go('unmatch'); E.skip.hidden = true; const wedding = !!o.wedding;
        let D = 2500 + api.randInt(0, 1000), prev = -1;
        pairs.forEach(function (p, i) {
          p.an = o.forced !== undefined ? o.forced : nextAnim(prev); prev = p.an;
          p.undo = runAnim(p, wedding);
          const line = L.unmatch[p.an];
          if (i === 0) say(line, { priority: 1, mood: 'confused' }); else later(function () { say(line, { priority: 1, mood: 'confused' }); }, 1500 * RT);
        });
        if (wedding) D = 2400;
        api.sfx('whoosh');
        if (!wedding) {
          api.award(7.5, 'ceremony');
          api.setTimeout(function () { api.award(-7, 'restocking fee'); sayCat('restocking', { mood: 'disappointed' }); }, Math.max(60, 1500 * RT));
        }
        later(function () {
          say(L.unmatchEnd[0], { priority: 1, mood: 'proud' });
          E.stamp.textContent = 'UN-MATCHED'; E.stamp.classList.add('m-sock-matcher-long'); E.stamp.classList.remove('m-sock-matcher-on'); void E.stamp.offsetWidth; E.stamp.classList.add('m-sock-matcher-on');
          api.sfx('sad'); api.setTimeout(function () { api.sfx('stamp'); }, 250);
          later(function () { finishUnmatch(pairs, o); }, 900 * RT);
        }, D * RT);
      }
      function replaceCard(id) {
        const old = cardById[id]; if (!old || !old.btn.parentNode) return;
        const had = document.activeElement === old.btn;
        unSwap(id); socks[id].name = spareName();
        const c = makeCard(id); old.btn.parentNode.replaceChild(c.btn, old.btn); c.btn.classList.add('m-sock-matcher-popin');
        label(c); applyTab(); if (had) { try { c.btn.focus({ preventScroll: true }); } catch (x) { /* ignore */ } }
      }
      function runAnim(p, wedding) {
        const ca = cardById[p.a], cb = cardById[p.b], list = [];
        const add = function (id, cls, text) { const e = badge(id, cls, text); if (e) list.push(e); return e; };
        let undo = noop;
        switch (p.an) {
          case 0: cb.btn.classList.add('m-sock-matcher-inside'); add(p.b, 'm-sock-matcher-sash', 'INSIDE OUT'); undo = function () { cb.btn.classList.remove('m-sock-matcher-inside'); }; break;
          case 1: cb.fx.classList.add('m-sock-matcher-walk'); later(function () { replaceCard(p.b); }, 1300 * RT); break;
          case 2: cb.emo.textContent = '🧤'; cb.emo.classList.add('m-sock-matcher-on'); cb.sockh.style.opacity = '0'; undo = function () { drawFace(cb); }; break;
          case 3: add(p.a, 'm-sock-matcher-lb', 'L'); add(p.b, 'm-sock-matcher-lb', 'L'); break;
          case 4: ['m-sock-matcher-tape m-sock-matcher-t1', 'm-sock-matcher-tape m-sock-matcher-t2'].forEach(function (c) { add(p.a, c, ''); add(p.b, c, ''); }); p.sep = true; note('AUDIT RECEIPT: 2 socks seized, 2 socks returned, 0 socks sorry.'); break;
          case 5: cb.fx.style.transitionDuration = num(3 * RT, 2) + 's'; cb.fx.classList.add('m-sock-matcher-shrink'); undo = function () { cb.fx.classList.remove('m-sock-matcher-shrink'); cb.fx.style.transitionDuration = ''; }; break;
          case 6: add(p.a, 'm-sock-matcher-cal', '📅'); add(p.b, 'm-sock-matcher-cal', '📅'); showBanner('NEVER VALID ON TUESDAYS'); break;
          case 7: divorce(p, ca, cb, wedding); undo = function () { [ca, cb].forEach(function (c) { c.fx.style.transition = 'none'; c.fx.style.transform = ''; void c.fx.offsetWidth; c.fx.style.transition = ''; }); }; break;
          default: drawFace(ca, 14); drawFace(cb, 14); ca.nm.textContent = 'Kevin'; cb.nm.textContent = 'Kevin'; undo = function () { drawFace(ca); drawFace(cb); }; break;
        }
        return function () {
          list.forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
          try { undo(); } catch (x) { /* card replaced */ }
        };
      }
      function divorce(p, ca, cb, wedding) {
        const g = rectOf(E.grid), ra = rectOf(ca.btn), rb = rectOf(cb.btn), dr = rectOf(E.drawer);
        if (wedding) later(function () { say(L.wedding[3], { priority: 1, mood: 'confused' }); }, 100 * RT);
        if (!g || !ra || !rb || !dr || rm()) return;
        const dx = Math.sign(rb.left - ra.left) * 10, dy = Math.sign(rb.top - ra.top) * 10;
        ca.fx.style.transition = 'transform ' + num(0.12 * RT, 2) + 's'; cb.fx.style.transition = ca.fx.style.transition;
        ca.fx.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.15)'; cb.fx.style.transform = 'translate(' + (-dx) + 'px,' + (-dy) + 'px) scale(1.15)';
        later(function () {
          const ax = g.left - ra.left, ay = g.top - ra.top, bx = g.right - rb.right, by = g.bottom - rb.bottom;
          if (![ax, ay, bx, by].every(isFinite)) return;
          ca.fx.style.transition = 'transform ' + num(1.2 * RT, 2) + 's ease-in-out'; cb.fx.style.transition = ca.fx.style.transition;
          ca.fx.style.transform = 'translate(' + ax + 'px,' + ay + 'px) scale(1.15)'; cb.fx.style.transform = 'translate(' + bx + 'px,' + by + 'px) scale(1.15)';
          dropEl('docf'); E.docf = el('span', { class: 'm-sock-matcher-docf', 'aria-hidden': 'true', text: '📄', style: 'left:' + num(ra.left - dr.left + ra.width / 2) + 'px;top:' + num(ra.top - dr.top + ra.height / 2) + 'px' }); E.ovl.appendChild(E.docf);
          void E.docf.offsetWidth; E.docf.style.left = num(rb.left - dr.left + rb.width / 2) + 'px'; E.docf.style.top = num(rb.top - dr.top + rb.height / 2) + 'px';
        }, 160 * RT);
      }
      function finishUnmatch(pairs, o) {
        pairs.forEach(function (p) { if (p.undo) p.undo(); });
        restoreSwaps(); clearStage();
        const sep = pairs.some(function (p) { return p.sep; });
        const ids = []; pairs.forEach(function (p) { ids.push(p.a, p.b); });
        ids.forEach(function (id) { lift(id, false); });
        if (sep) {
          ids.slice().reverse().forEach(function (id, i) {
            api.setTimeout(function () { if (id !== firstId && !(rep && (rep.a === id || rep.b === id))) flipCard(id, false, true); }, i * 160);
          });
        } else ids.forEach(function (id) { flipCard(id, false, true); });
        order.forEach(function (id) { if (!sep || ids.indexOf(id) < 0) flipCard(id, false, true); });
        const wedding = !!o.wedding;
        pairs.forEach(function (p) {
          formerly++;
          plaques.push({ icon: wedding ? '💍' : ICONS[p.an] || '🧦', names: sockName(p.a) + ' & ' + sockName(p.b) }); if (plaques.length > 7) plaques.shift();
        });
        if (nameBak) { if (socks[nameBak[0]].name === nameBak[4]) socks[nameBak[0]].name = nameBak[1]; if (socks[nameBak[2]].name === 'Kevin') socks[nameBak[2]].name = nameBak[3]; nameBak = null; }
        if (breadEl && breadEl.parentNode) breadEl.parentNode.removeChild(breadEl);
        breadEl = null; paintWall(); paintChips();
        if (wedding) api.award(0.5, 'wedding fee');
        else {
          ceremonies++; api.stat.inc('sock-matcher.ceremonies', pairs.length > 1 ? 2 : 1); poster++; api.achieve('sock-matcher.ceremony');
          if (pairs.length > 1) { dblDone = true; say(L.doubleEnd[0], { priority: 1, mood: 'proud' }); }
        }
        if (!(pairs.length > 1)) sayCat('formerly', { mood: 'smug' }, formerly);
        scheduleDue(false); firstId = -1; rep = null; dbl = null; propSel = [];
        order.forEach(function (id) { const c = cardById[id]; if (c) c.btn.classList.remove('m-sock-matcher-sel'); });
        go('idle'); idleT = 0; persist(); paintChips();
      }

      /* ---------- Matchmaker ---------- */
      function toggleProposal(on) {
        if (on === undefined) on = !proposal;
        if (on && (state !== 'idle' || !bt.b8)) return;
        proposal = !!on; propSel.forEach(function (id) { if (cardById[id]) cardById[id].btn.classList.remove('m-sock-matcher-sel'); }); propSel = [];
        E.prop.textContent = proposal ? 'Cancel Proposal' : 'Propose a Pairing';
        if (proposal) { E.ppill = el('span', { class: 'm-sock-matcher-pill', text: 'PROPOSAL MODE' }); E.ovl.appendChild(E.ppill); say('Proposal mode. Select two socks. Management has the veil ready.', { mood: 'proud' }); } else dropEl('ppill');
      }
      function selectForProposal(id) {
        const i = propSel.indexOf(id);
        if (i >= 0) { propSel.splice(i, 1); cardById[id].btn.classList.remove('m-sock-matcher-sel'); return; }
        propSel.push(id); cardById[id].btn.classList.add('m-sock-matcher-sel'); api.sfx('pop');
        if (propSel.length === 2) startWedding(propSel[0], propSel[1]);
      }
      function startWedding(a, c) {
        const sel = propSel.slice(); proposal = false; dropEl('ppill'); E.prop.textContent = 'Propose a Pairing';
        cancelPending(); go('wedding'); propSel = sel; rep = { a: a, b: c };
        flipCard(a, true, true); flipCard(c, true, true); lift(a, true); lift(c, true); E.spot.classList.add('m-sock-matcher-on'); api.sfx('fanfare');
        if (!officiated) { officiated = true; if (api.flag.get('metGerald')) say(L.gerald[0], { who: 'Gerald', priority: 1 }); else say(L.veil[0], { priority: 1, mood: 'smug' }); } else say(L.wedding[0], { priority: 1 });
        later(function () { say(L.wedding[1], { priority: 1, mood: 'proud' }); }, 1400 * RT);
        later(function () { say(L.wedding[2], { priority: 1, mood: 'proud' }); }, 2800 * RT);
        later(function () { startUnmatch([{ a: a, b: c }], { wedding: true, forced: 7 }); }, 4000 * RT);
      }

      /* ---------- Union Break (spam) ---------- */
      function startBreak() {
        cancelPending(); upAll(); go('break'); breakExt = 0; breakPresses = []; dropEl('verd');
        fixSlip();
        E.grid.classList.add('m-sock-matcher-slump');
        E.picket = el('div', { class: 'm-sock-matcher-picket', text: 'ON BREAK: 15 MIN (15 SEC)' });
        E.clipb = el('div', { class: 'm-sock-matcher-clip', text: 'Negotiation Notes' });
        E.steward = el('div', { class: 'm-sock-matcher-steward' }, el('svg', { viewBox: '0 0 64 64', 'aria-hidden': 'true' }, sockSvgInline(), el('path', { d: 'M18 10 Q32 -6 46 10 Z', fill: '#f4c542', stroke: '#2b2118', 'stroke-width': 2.4 }), el('rect', { x: 16, y: 9, width: 32, height: 4, fill: '#f4c542', stroke: '#2b2118', 'stroke-width': 2 })), E.clipb);
        E.ovl.appendChild(E.picket); E.ovl.appendChild(E.steward);
        api.achieve('sock-matcher.union'); api.award(-0.5, 'agitation fee'); api.sfx('buzz');
        breakN++; breakPN = 0; say(breakN === 1 ? L.union[0] : pickLine('unionAgain'), { priority: 1, mood: 'panic' });
        const gap = function (x) { return Math.max(150, x * TS); };
        later(function () { sayCat('steward', { priority: 1, who: 'Sock Steward' }); }, gap(2500));
        if (flg('metStapler')) later(function () { say(api.line('m:sock-matcher:cbStapler', { player: api.player.name }), { priority: 1, mood: 'smug' }); }, gap(12600)); // lint-ignore filled via the L table
        [0, 1, 2].forEach(function (i) { later(function () { say(L.negotiation[i], { priority: 1, who: 'Sock Steward' }); E.clipb.textContent = (E.clipb.textContent + ' | ' + L.negotiation[i].replace('Negotiation Notes. ', '')).slice(-170); }, gap(4500 + i * 3200)); });
        breakId = later(endBreak, Math.max(900, 15000 * TS));
      }
      function sockSvgInline() { return sockSvg({ hue: 205, pattern: 'plain', cuff: 2, len: 'crew', kevin: false, holes: 0 }); }
      function onBreakPress() {
        const now = api.now(); api.sfx('sad');
        breakPN++;
        if (breakPN === 30) say(L.unionPressMany[0], { priority: 1, mood: 'panic' });
        else if (now - lastUnion > 1500) { lastUnion = now; sayCat('unionPress', { mood: 'disappointed' }); }
        breakPresses.push(now); if (breakPresses.length > 12) breakPresses.shift();
        if (breakPresses.length === 12 && now - breakPresses[0] < 3000 && breakExt < 3) {
          breakPresses = []; breakExt++; api.clearTimeout(breakId); breakId = later(endBreak, Math.max(300, 7500 * TS)); sayCat('unionExtend', { priority: 1, mood: 'smug' });
        }
      }
      function endBreak() {
        if (state !== 'break') return;
        E.grid.classList.remove('m-sock-matcher-slump'); dropEl('picket'); dropEl('steward'); spam = [];
        sayCat('unionEnd', { priority: 1, mood: 'proud' }); go('idle'); idleT = 0;
      }

      /* ---------- Tumble Dryer ---------- */
      function quarterTurn() {
        if (E.dry.hidden) return;
        dialDeg += 90; E.dialSvg.style.transform = 'rotate(' + dialDeg + 'deg)'; api.sfx('whoosh'); quarters++;
        if (quarters === 1) say(L.dial[0], { mood: 'proud' }); else if (quarters === 3) say(L.dial[1], { mood: 'smug' });
        if (quarters % 4 === 0) fullTumble(false);
      }
      function sixteenth() { // the 7th full tumble of a season ejects a sixteenth sock, which ruins the premise for twelve seconds
        if (s16) return;
        const g = el('button', { class: 'm-sock-matcher-s16', type: 'button', 'aria-label': 'A sixteenth sock, Wilhelmina. Catch it.', onclick: function () { catchSixteenth(g); } },
          sockSvg({ hue: 305, pattern: 'dots', cuff: 2, len: 'crew', kevin: false, holes: 0 }), el('small', { 'aria-hidden': 'true', text: 'Wilhelmina' }), el('span', { 'aria-hidden': 'true', style: 'position:absolute;right:-4px;top:-2px;font-size:1rem', text: '🧳' }));
        s16 = g; s16Stage = 1; E.ovl.appendChild(g); api.sfx('boing'); api.stat.inc('sock-matcher.sixteen'); paintChips();
        say(L.sixteen[0], { priority: 1, mood: 'panic' });
        api.setTimeout(function () { if (s16 === g) say(L.sixteen[3], { priority: 1, mood: 'confused' }); }, Math.max(300, 4600 * RT));
        api.setTimeout(function () { leaveSixteenth(g); }, Math.max(1500, 12000 * RT));
      }
      function endSixteenth(g, walk) {
        if (s16 !== g) return; s16 = null; s16Stage = 2; paintChips();
        if (walk) { g.classList.add('m-sock-matcher-walk'); api.setTimeout(function () { if (g.parentNode) g.parentNode.removeChild(g); }, Math.max(300, 1800 * RT)); } else if (g.parentNode) g.parentNode.removeChild(g);
        api.setTimeout(function () { if (s16Stage === 2 && !s16) { s16Stage = 0; paintChips(); } }, Math.max(800, 7000 * RT));
      }
      function leaveSixteenth(g) { if (s16 !== g) return; endSixteenth(g, true); say(L.sixteen[2], { priority: 1, mood: 'smug' }); }
      function catchSixteenth(g) {
        if (s16 !== g) return; endSixteenth(g, false);
        api.achieve('sock-matcher.even'); api.award(0.5, 'sixteenth sock'); api.sfx('tada'); api.confetti();
        say(L.sixteen[1], { priority: 1, mood: 'proud' });
      }
      function fullTumble(fast) {
        api.stat.inc('sock-matcher.dryer');
        const t = api.now(); tumbles.push(t); if (tumbles.length > 3) tumbles.shift();
        let setDizzy = false;
        if (fast || (tumbles.length === 3 && t - tumbles[0] < 6000)) { dizzy = 3; tumbles = []; setDizzy = true; }
        spinRun++;
        if (locked() || state === 'break') { sayCat('dryer'); return; }
        if (state === 'reporting' || state === 'first') dismissReport();
        const ids = api.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]); ids.push(14);
        reorder(ids); tumbleN++; if (tumbleN === 7) sixteenth();
        if (spinRun === 12) say(L.dryerOver[0], { mood: 'confused' });
        else if (spinRun > 12 && (spinRun - 12) % 4 === 0) say(L.dryerOver2[0], { mood: 'confused' });
        else if (setDizzy) sayCat('dizzy', { mood: 'confused' });
        else sayCat('dryer', { mood: 'neutral' });
      }
      function reorder(next) {
        const before = {};
        order.forEach(function (id) { before[id] = rectOf(cardById[id].btn); });
        order = next; applyOrder();
        if (rm()) return;
        const moved = [];
        order.forEach(function (id) {
          const r0 = before[id], r1 = rectOf(cardById[id].btn); if (!r0 || !r1) return;
          const dx = r0.left - r1.left, dy = r0.top - r1.top; if (!isFinite(dx) || !isFinite(dy) || (!dx && !dy)) return;
          const s = cardById[id].btn.style; s.transition = 'none'; s.transform = 'translate(' + dx + 'px,' + dy + 'px)'; moved.push(id);
        });
        void root.offsetWidth;
        moved.forEach(function (id) { const s = cardById[id].btn.style; s.transition = 'transform 450ms ease'; s.transform = ''; });
        api.setTimeout(function () { moved.forEach(function (id) { const c = cardById[id]; if (c) c.btn.style.transition = ''; }); }, 500);
      }
      function dialAngle(e) {
        const r = rectOf(E.dial); if (!r || !r.width || !r.height) return NaN;
        const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; return isFinite(a) ? a : NaN;
      }
      function dialDown(e) {
        drag = { last: dialAngle(e), acc: 0, tot: 0, t0: api.now() }; dragMoved = false; E.dialSvg.style.transition = 'none';
        try { E.dial.setPointerCapture(e.pointerId); } catch (x) { /* synthetic event */ }
      }
      function dialMove(e) {
        if (!drag) return;
        const a = dialAngle(e); if (!isFinite(a) || !isFinite(drag.last)) { drag.last = a; return; }
        let d = a - drag.last; if (d > 180) d -= 360; if (d <= -180) d += 360;
        drag.last = a; drag.acc += d; drag.tot += Math.abs(d); if (drag.tot > 8) dragMoved = true;
        dialDeg += d; E.dialSvg.style.transform = 'rotate(' + dialDeg + 'deg)';
        if (Math.abs(drag.acc) >= 360) { const dt = api.now() - drag.t0; drag.acc -= 360 * Math.sign(drag.acc); drag.t0 = api.now(); fullTumble(dt < 333); }
      }
      function dialUp() { drag = null; E.dialSvg.style.transition = ''; }

      /* ---------- appeals, policies, resumes ---------- */
      function fileAppeal() {
        if (appealPending) { say(L.appeal[5], { mood: 'confused' }); return; }
        if (!lastVerdict) { say(L.appeal[2], { mood: 'confused' }); return; }
        appealPending = true; api.stat.inc('sock-matcher.appeals'); api.award(0.2, 'appeal');
        say(L.appeal[api.chance(0.5) ? 0 : 1], { mood: 'proud' });
        let n = 8; E.appeal.disabled = true; E.appeal.textContent = 'Appeal pending (8)';
        const step = Math.max(40, 1000 * TS); openCourt(step);
        const iv = api.setInterval(function () {
          n--;
          if (n > 0) { E.appeal.textContent = 'Appeal pending (' + n + ')'; return; }
          api.clearInterval(iv); appealPending = false; E.appeal.disabled = false; E.appeal.textContent = 'File an Appeal';
          const recuse = !!court && api.chance(0.125), up = !recuse && api.chance(0.5);
          note('APPEAL (' + lastVerdict + '): ' + (recuse ? 'DENIED (technicality: the judge)' : up ? 'UPHELD (but nothing has changed)' : 'DENIED'));
          if (recuse) { api.award(0.1, 'recusal'); say(L.court[6], { mood: 'confused', priority: 1 }); }
          else say(L.appeal[up ? (api.chance(0.5) ? 4 : 7) : (api.chance(0.5) ? 3 : 6)], { mood: up ? 'smug' : 'disappointed' });
          closeCourt(up, recuse);
        }, step);
      }
      function openCourt(step) { // the Appeals Court sits under the button while the 8 seconds run: the two socks from the last report and a judge
        dropEl('court'); court = null; if (!lastPair || !socks[lastPair[0]] || !socks[lastPair[1]]) return;
        const A = sockName(lastPair[0]), B = sockName(lastPair[1]);
        const bub = function (t) { return el('div', { class: 'm-sock-matcher-bub', hidden: true, text: t }); };
        const bA = bub(L.court[0].replace(/%a/g, A)), bB = bub(L.court[1].replace(/%b/g, B)), bJ = bub(L.court[5]); bJ.hidden = false;
        const pA = el('div', { class: 'm-sock-matcher-cp' }, sockSvg(socks[lastPair[0]]), el('small', { text: A }), bA), pB = el('div', { class: 'm-sock-matcher-cp' }, sockSvg(socks[lastPair[1]]), el('small', { text: B }), bB);
        const pJ = el('div', { class: 'm-sock-matcher-cp' }, sockSvgInline(), el('span', { class: 'm-sock-matcher-ham', 'aria-hidden': 'true', text: '🔨' }), el('small', { text: 'The Judge' }), bJ);
        const node = E.court = el('div', { class: 'm-sock-matcher-panel m-sock-matcher-court', 'aria-hidden': 'true' }, el('h4', { text: 'APPEALS COURT, ROOM 7 1/2' }), el('div', { class: 'm-sock-matcher-cts' }, pA, pJ, pB));
        E.btns.parentNode.insertBefore(node, E.btns.nextSibling); court = { a: pA, b: pB, j: pJ, bJ: bJ, node: node };
        api.setTimeout(function () { if (E.court === node) { bA.hidden = false; api.sfx('pop'); } }, step * 1.5);
        api.setTimeout(function () { if (E.court === node) { bB.hidden = false; api.sfx('pop'); } }, step * 3.5);
      }
      function closeCourt(up, recuse) {
        const c = court; if (!c || E.court !== c.node) return;
        c.bJ.textContent = recuse ? L.court[4] : L.court[up ? 2 : 3]; c.bJ.hidden = false; api.sfx('stamp');
        c.a.classList.add('m-sock-matcher-leave'); c.b.classList.add('m-sock-matcher-leave'); if (recuse) c.j.classList.add('m-sock-matcher-leave');
        if (state === 'idle') { E.sh.textContent = 'APPEAL HEARD (' + lastVerdict + ')'; stampText(recuse ? 'DENIED (JUDGE)' : up ? 'UPHELD (NOTHING HAS CHANGED)' : 'DENIED (WITH WARMTH)'); }
        api.setTimeout(function () { if (E.court === c.node) dropEl('court'); if (court === c) court = null; }, Math.max(700, 4200 * RT));
      }
      function policyCheck(a, c) {
        if (polKind < 0 || T - lastCite < 5 * TS) return;
        const pa = order.indexOf(a), pc = order.indexOf(c), cols = root.classList.contains('m-sock-matcher-narrow') ? 3 : 5;
        let bad = false;
        if (polKind === 0) bad = Math.floor(api.now() / 1000) % 2 !== 0;
        else if (polKind === 1) bad = pa % cols === pc % cols;
        else bad = Math.floor(pa / cols) === Math.floor(pc / cols);
        if (!bad) return;
        lastCite = T; note('CITATION: Policy 11(c). Fine: 0.5 Meh.'); api.sfx('buzz'); api.award(-0.5, 'citation'); api.stat.inc('sock-matcher.citations');
        sayCat('citation', { mood: 'disappointed' });
      }
      function policyTick() {
        if (!bt.b5b) return;
        if (polKind < 0) {
          if (T < polNextAt) return;
          polKind = polIdx % 3; polIdx++; polEnds = T + 45 * TS; E.pol.hidden = false; E.polT.textContent = L.policy[polKind]; say(L.policy[polKind], { mood: 'smug' });
          return;
        }
        const left = polEnds - T; E.ring.style.setProperty('--p', num(clampN(left / (45 * TS) * 100, 0, 100)));
        if (left <= 0) { polKind = -1; polNextAt = T + 10 * TS; E.pol.hidden = true; say(L.policy[3], { mood: 'confused' }); }
      }
      const FEUD = { Dorothea: 0, Maurice: 0, Pamela: 1, Raymond: 1 };
      function showResume(id) {
        resumeId = id; if (!bt.b5a) return;
        const c = cardById[id]; if (!c || !c.up) return;
        const s = socks[id];
        E.res.textContent = s.name + '. Seeking: ' + s.seeking + '. Hobbies: ' + s.hobby + '. Reference: ' + s.ref + '.' + (FEUD[s.name] !== undefined ? ' ' + L.feud[FEUD[s.name]] : '');
      }

      /* ---------- poster, postcards, corkboard ---------- */
      function showPoster() {
        if (!E.poster.hidden) return; E.poster.hidden = false;
        api.setTimeout(function () { say(L.poster[0], { mood: 'proud' }); }, Math.max(400, 4500 * RT));
      }
      function beat3(near) { // the Appeal button used to arrive without a word, and read as a layout glitch
        if (bt.b3) return; bt.b3 = true; E.appeal.hidden = false;
        api.setTimeout(function () { say(L.unlock[near ? 0 : 4], { mood: 'proud', priority: 1 }); }, Math.max(300, 2800 * RT));
      }
      const hw = function () { return 'm-sock-matcher-hw' + ((season - 1) % 3); };
      function postmark(k) {
        if (k === 4) return api.stat.get('elevator-simulator.entered') > 0 ? PMARK[4] : 'Floor 7 1/2 (location disputed), 1:00 PM';
        if (k === 1 && lostMet) return 'Lost Property Office, Window 7 1/2, 4:17 PM';
        return PMARK[k] || PMARK[0];
      }
      function dropEnv() { if (pcEnv && pcEnv.parentNode) pcEnv.parentNode.removeChild(pcEnv); pcEnv = null; }
      function pcTick() {
        if (!bt.b6) { if (T < 180 * TS) return; bt.b6 = true; }
        if (pcEnv) {
          if (T >= pcEnvEnds) {
            dropEnv(); pcNextAt = T + api.randInt(45, 55) * TS;
            if (++pcMissN >= 3) { pcMissN = 0; sayCat('postcardDraught', { mood: 'confused', priority: 1 }); showPostcard(pcRead, true); } else sayCat('postcardMissed', { mood: 'disappointed' });
          }
          return;
        }
        if (pcRead >= 7 || T < pcNextAt) return;
        if (state !== 'idle' && state !== 'first' && state !== 'reporting') return;
        pcEnv = el('button', { class: 'm-sock-matcher-env', type: 'button', 'aria-label': 'Postcard from the Missing Sock', style: 'animation-duration:' + num(20 * TS, 2) + 's', onclick: function () { openEnvelope(); } }, '✉️');
        E.ovl.appendChild(pcEnv); pcEnvEnds = T + 20 * TS; sayCat('postcardArrive', { mood: 'confused' }); api.sfx('bell');
      }
      function openEnvelope() { dropEnv(); pcMissN = 0; pcNextAt = T + api.randInt(45, 55) * TS; showPostcard(pcRead, true); }
      function showPostcard(k, fresh) {
        k = Math.floor(clampN(k, 0, 7)); pcShown = k; E.pc.hidden = false; E.pc.className = 'm-sock-matcher-pc ' + hw();
        E.pcN.textContent = 'Postcard ' + (k + 1) + ' of 8'; E.pcT.textContent = L.postcard[k]; E.pcM.textContent = 'Postmark: ' + postmark(k);
        E.pin.disabled = pinned.indexOf(k) >= 0 || pinned.length >= 8;
        if (fresh && k === pcRead) {
          pcRead = k + 1; api.stat.inc('sock-matcher.postcards'); api.award(1, 'postcard'); poster++; api.sfx('bell');
          if (k === 4 && api.stat.get('elevator-simulator.entered') > 0) say(L.elevator[0], { mood: 'confused' });
          if (k === 1 && lostMet) say(L.lostCb[0], { mood: 'smug' });
          persist(); paintChips();
        }
      }
      function pinCurrent() {
        if (pcShown < 0 || E.pc.hidden || pinned.indexOf(pcShown) >= 0 || pinned.length >= 8) return;
        pinned.push(pcShown); E.pin.disabled = true; api.sfx('pop');
        if (pinned.length === 1) say(L.cork[0], { mood: 'confused' }); else sayCat('pin', { mood: 'smug' });
        paintPins(); persist();
        if (pinned.length >= 8) api.achieve('sock-matcher.postcards');
        if (pcShown === 7 && state === 'ending' && ending && ending.idx === 10) { cancelPending(); later(ending.run, Math.max(300, 2500 * RT)); } // the ending waits for the pin, then carries on
      }
      function paintPins() {
        E.pins.forEach(function (pb, i) {
          const k = pinned[i], full = k !== undefined;
          pb.textContent = full ? String(k + 1) : '+'; pb.classList.toggle('m-sock-matcher-full', full); pb.classList.toggle('m-sock-matcher-ysel', yarnSel === i);
          pb.setAttribute('aria-label', full ? 'Pin slot ' + (i + 1) + ': postcard ' + (k + 1) : 'Pin slot ' + (i + 1) + ', empty');
        });
        E.corkP.hidden = !pinned.length;
      }
      function onPin(i) {
        if (pinned[i] === undefined) return;
        showPostcard(pinned[i], false);
        if (yarnSel >= 0 && yarnSel !== i) { connectYarn(yarnSel, i); yarnSel = -1; } else yarnSel = yarnSel === i ? -1 : i;
        paintPins();
      }
      function connectYarn(i, j) {
        const pt = function (n) { return [14 + (n % 4) * 24, (28 + Math.floor(n / 4) * 44) / 2]; }, p1 = pt(i), p2 = pt(j);
        const path = el('path', { d: 'M' + p1[0] + ' ' + p1[1] + ' Q' + (p1[0] + p2[0]) / 2 + ' ' + (Math.max(p1[1], p2[1]) + 9) + ' ' + p2[0] + ' ' + p2[1], fill: 'none', stroke: '#d63b3b', 'stroke-width': 1.2 });
        E.cs.appendChild(path); yarns.push(path);
        while (yarns.length > 12) { const o = yarns.shift(); if (o.parentNode) o.parentNode.removeChild(o); }
        sayCat('yarn', { mood: 'confused' });
      }

      /* ---------- the Missing Sock: hold still ---------- */
      function setMs(s) {
        msState = s; E.ms.className = 'm-sock-matcher-ms' + (s === 'peek' ? ' m-sock-matcher-peek' : s === 'half' ? ' m-sock-matcher-half' : s === 'arr' ? ' m-sock-matcher-arr' : '');
        E.ms.setAttribute('tabindex', s === 'arr' ? '0' : '-1'); E.ms.setAttribute('aria-hidden', s === 'arr' ? 'false' : 'true');
      }
      function flee() {
        if (msState !== 'peek' && msState !== 'half') return;
        setMs('gone'); fleeN++; const now = api.now();
        if (now - lastFlee > 3000) { lastFlee = now; if (fleeN % 3 === 0) say(L.fleeMany[0], { mood: 'confused' }); else sayCat('flee', { mood: 'confused' }); }
      }
      function arrive() {
        setMs('arr'); say(L.chaseArrive[0], { priority: 2, mood: 'proud' });
        for (let i = 0; i < 4; i++) api.setTimeout(function () { api.sfx('bell'); }, Math.max(40, 500 * i));
      }
      function chaseTick(dt) {
        if (homeDone || pcRead < 7 || T < 480 * TS) return;
        if (chaseFrom < 0) chaseFrom = T; // every season gets its own 6 minutes of chasing, not just the first
        if (state !== 'idle') { stillMs = 0; if (msState === 'peek' || msState === 'half') setMs('gone'); return; }
        if (T - chaseFrom >= 360 * TS && msState !== 'arr') { chaseForced = true; arrive(); api.setTimeout(function () { say(L.chaseForced[0], { mood: 'smug', priority: 1 }); }, Math.max(300, 2500 * RT)); return; }
        stillMs += dt * 1000;
        if (msState === 'gone' && stillMs >= 3000 * TS) { setMs('peek'); sayCat('chasePeek', { mood: 'confused', priority: 1 }); }
        else if (msState === 'peek' && stillMs >= 6000 * TS) { setMs('half'); sayCat('chaseHalf', { mood: 'confused', priority: 1 }); }
        else if (msState === 'half' && stillMs >= 9000 * TS) arrive();
      }
      function onMissingClick() {
        if (msState !== 'arr') return;
        if (homeDone) { api.sfx('pop'); return; }
        homeDone = true; homeAt = T; api.sfx('bell');
        E.ms.firstChild.style.filter = 'hue-rotate(35deg) saturate(1.3)';
        E.msb = el('div', { class: 'm-sock-matcher-bub m-sock-matcher-msb', text: L.missingSpeak[0] }); E.ovl.appendChild(E.msb);
        api.setTimeout(function () { dropEl('msb'); }, Math.max(1500, 7000 * RT));
        say(L.missingSpeak[0], { who: 'The Missing Sock', priority: 1 });
        api.setTimeout(function () { say(L.cracks[0], { mood: 'confused', priority: 1 }); }, Math.max(100, 3500 * RT));
        api.setTimeout(function () { say(L.respect[0], { mood: 'proud', priority: 1 }); }, Math.max(150, 7000 * RT));
        if (met('duck-therapy')) api.setTimeout(function () { say(L.duckCb[0], { mood: 'smug' }); }, Math.max(250, 11000 * RT));
        api.award(5, 'a sock came home'); if (!chaseForced) api.achieve('sock-matcher.home'); api.flag.set('sock-matcher.home', true);
        api.flag.set('sockSeen', true); // lint-ignore shared cast flag
        poster++; persist(); paintChips();
      }

      /* ---------- idle, whispers, the ballet ---------- */
      function dimDrawer(on) { dimOn = on; E.drawer.classList.toggle('m-sock-matcher-dim', on); }
      function bubbleAt(id, text, ms) {
        const dr = rectOf(E.drawer), c = cardById[id], r = c && rectOf(c.btn); if (!dr || !r || whisperN >= 3) return;
        const w = el('span', { class: 'm-sock-matcher-whisper', 'aria-hidden': 'true', text: text, style: 'left:' + num(clampN(r.left - dr.left, 6, Math.max(6, dr.width - 130))) + 'px;top:' + num(clampN(r.top - dr.top - 8, 4, Math.max(4, dr.height - 40))) + 'px' });
        E.ovl.appendChild(w); whisperN++;
        api.setTimeout(function () { if (w.parentNode) w.parentNode.removeChild(w); whisperN = Math.max(0, whisperN - 1); }, Math.max(300, (ms || 2500) * RT));
      }
      function whispers() { const n = api.randInt(1, 3); for (let i = 0; i < n; i++) bubbleAt(api.pick(order), pickLine('whisper')); }
      let balletSung = false;
      function idleTick(dt) {
        idleT += dt;
        const quiet = state === 'idle' || state === 'first';
        if (state === 'first' && idleT >= 14 * TS && !idleFired.a && firstId >= 0) { idleFired.a = 1; sayCat('loneUp', { mood: 'confused' }); bubbleAt(firstId, pickLine('loneBub'), 4500); }
        if (quiet && idleT >= 20 * TS && !idleFired.a) { idleFired.a = 1; sayCat(ffSaid ? 'idle20' : 'stall', { mood: 'confused' }); }
        if (quiet && idleT >= 65 * TS && !idleFired.c) { idleFired.c = 1; whispers(); note('INCIDENT REPORT 7 1/2: Nothing happened, at length. Witnesses: 15.'); sayCat('idle65', { priority: 1, mood: 'smug' }); }
        if (idleT >= 45 * TS && !dimOn && quiet) { dimDrawer(true); whispers(); sayCat('idle45', { mood: 'smug' }); }
        if (idleT >= 90 * TS && (state === 'idle' || state === 'first')) startBallet();
        else if (state === 'ballet') { balletT += dt; if (balletT >= 7.5 * TS && !balletSung) balletVerse(); }
      }
      function startBallet() {
        cancelPending(); if (state === 'first') { flipCard(firstId, false, true); firstId = -1; }
        go('ballet'); balletT = 0; balletSung = false; dimDrawer(true);
        pairUp(); for (let i = 0; i < 4; i++) later(function () { api.sfx('bell'); }, 500 * i);
        sayCat('idle90', { priority: 1, mood: 'panic' });
      }
      function pairUp() { socks.forEach(function (s) { const c = cardById[s.id]; if (!c) return; flipCard(s.id, true, true); c.btn.style.order = String(s.pair >= 0 ? s.pair * 2 + (s.id % 2) : 14); }); }
      function endBallet() {
        order.forEach(function (id) { const c = cardById[id]; if (c) { c.btn.style.order = ''; flipCard(id, false, true); } });
        go('idle'); idleT = 0; idleFired = {}; dimDrawer(false); miniB = false;
      }
      function balletVerse() {
        balletSung = true; sayCat('balletVerse', { priority: 1, mood: 'proud' });
        later(function () { // the achievement is for holding still through the whole verse, not just the first line of it
          if (state !== 'ballet') return;
          api.achieve('sock-matcher.ballet'); if (!balletPaid) { balletPaid = true; api.award(10, 'ballet'); }
          endBallet();
        }, Math.max(500, 3000 * RT));
      }
      function scatter() { cancelPending(); endBallet(); sayCat('balletBroken', { mood: 'disappointed' }); }
      function markInput() {
        idleT = 0; idleFired = {}; if (dimOn && state !== 'ballet') dimDrawer(false);
        if (state === 'ballet' && !miniB) scatter();
        stillMs = 0; if (msState === 'peek' || msState === 'half') flee();
      }
      let px = NaN, py = NaN, pt = 0;
      function onMove(e) {
        const x = e.clientX, y = e.clientY, now = api.now(); if (!isFinite(x) || !isFinite(y)) return;
        if (isFinite(px)) {
          const d = Math.hypot(x - px, y - py), sp = d / Math.max(now - pt, 16) * 1000;
          if (d >= 2 && sp >= 6) { stillMs = 0; if (msState === 'peek' || msState === 'half') flee(); }
        }
        px = x; py = y; pt = now;
        if (!isFinite(lastX)) { lastX = x; lastY = y; return; }
        if (Math.hypot(x - lastX, y - lastY) >= 20) { lastX = x; lastY = y; markInput(); }
      }

      /* ---------- sniffing, the dream ---------- */
      function beginSniff(id, src) {
        if (sniffing) return; const c = cardById[id]; if (!c) return;
        c.btn.classList.add('m-sock-matcher-sniff');
        sniffing = { id: id, src: src, t0: api.now(), tm: api.setTimeout(function () { endSniff(true); }, 1200) };
      }
      function endSniff(done) {
        const s = sniffing; if (!s) return; sniffing = null; api.clearTimeout(s.tm);
        const c = cardById[s.id]; if (c) c.btn.classList.remove('m-sock-matcher-sniff');
        sniffT += done ? 1.2 : clampN((api.now() - s.t0) / 1000, 0, 1.2);
        if (done) {
          const txt = L.sniff[socks[s.id] ? socks[s.id].smell : 0] || L.sniff[0];
          api.sfx('pop'); api.award(0.2, 'sniff'); api.stat.inc('sock-matcher.sniffs'); note(txt);
          if (!sniffFirstDone) { sniffFirstDone = true; say(L.sniffFirst[0], { mood: 'confused' }); } else say(txt, { mood: 'smug' });
        }
        if (sniffT >= 20 * TS && !faintDone) dream();
      }
      function dream() {
        faintDone = true; E.drawer.classList.add('m-sock-matcher-blur'); api.achieve('sock-matcher.faint');
        const g = function (ms) { return Math.max(200, ms * RT); };
        say(L.dream[0], { mood: 'confused', priority: 1 });
        api.setTimeout(function () { say(L.dream[1], { mood: 'confused', priority: 1 }); }, g(2200));
        api.setTimeout(function () { E.drawer.classList.remove('m-sock-matcher-blur'); }, g(4000));
        api.setTimeout(function () { say(L.dream[2], { mood: 'confused', priority: 1 }); }, g(4400));
        api.setTimeout(function () { say(L.wake[0], { priority: 1 }); }, g(6600));
      }
      function focusedSockId() {
        const ae = document.activeElement;
        return ae && ae.classList && ae.classList.contains('m-sock-matcher-card') && root.contains(ae) ? Number(ae.dataset.sid) : -1;
      }

      /* ---------- Kevin the glove, darning ---------- */
      function gloveReveal() {
        if (kevinGlove) return; kevinGlove = true;
        const c = cardById[14]; if (c) { c.glove = true; drawFace(c); label(c); }
        E.sh.textContent = 'Kevin is a glove'; E.reason.textContent = 'A hush has fallen over the drawer. Gloves have no mouths.'; E.foot.textContent = 'Kevin is a glove.';
        api.achieve('sock-matcher.kevin'); api.flag.set('sock-matcher.gloveKevin', true); api.sfx('bell');
        say(L.gloveReveal[0], { priority: 1 }); api.setTimeout(function () { say(L.glovePraise[0], { mood: 'proud' }); }, Math.max(200, 4500 * RT));
        if (state === 'idle') { flipCard(14, true, true); api.setTimeout(function () { if (state === 'idle') flipCard(14, false, true); }, Math.max(400, 2500 * RT)); }
        paintChips(); persist();
      }
      function startDarning() {
        darning = true; darnEnds = T + 60 * TS; root.classList.add('m-sock-matcher-darn'); sayCat('darn', { priority: 1, mood: 'disappointed' });
        E.dpill = el('span', { class: 'm-sock-matcher-pill', style: 'left:auto;right:10px', text: '🧵 Darning mode' }); E.ovl.appendChild(E.dpill);
        order.forEach(function (id) { const c = cardById[id]; if (c) c.btn.classList.toggle('m-sock-matcher-hole', !!socks[id].holes); });
      }
      function endDarning(sayIt) {
        if (!darning) return; darning = false; root.classList.remove('m-sock-matcher-darn'); dropEl('dpill');
        order.forEach(function (id) { const c = cardById[id]; if (c) c.btn.classList.remove('m-sock-matcher-hole'); });
        if (sayIt) sayCat('darnEnd', { mood: 'smug' });
      }
      function darnClick(id) {
        const c = cardById[id], s = socks[id]; if (!c || !s.holes || !c.up) return false;
        s.holes = 0; drawFace(c); c.btn.classList.remove('m-sock-matcher-hole');
        const st = badge(id, 'm-sock-matcher-stitch', ''); if (st) api.setTimeout(function () { if (st.parentNode) st.parentNode.removeChild(st); }, 1300);
        api.award(0.1, 'darning'); darned++; say(L.darnDone[darned % 2], { mood: 'smug' }); api.sfx('pop');
        const spare = socks.filter(function (x) { return !x.kevin && !x.holes && x.id !== id && !swaps.some(function (w) { return w.id === x.id; }); });
        if (spare.length) { const nh = api.pick(spare); nh.holes = 1; if (cardById[nh.id]) drawFace(cardById[nh.id]); }
        if (darned >= 5) api.achieve('sock-matcher.darn');
        persist(); return true;
      }

      /* ---------- the not-ending ---------- */
      function fiveTicks() {
        const t = ['Hue: 160.0 vs 160.0 deg', 'Pattern: plain vs plain', 'Cuff: 1 vs 1', 'Length: knee vs knee', 'Vibe: fine vs fine'];
        E.sh.textContent = 'DISCREPANCY REPORT No. ' + num(attempts + 1);
        E.rowEls.forEach(function (r, i) {
          r.row.className = 'm-sock-matcher-row m-sock-matcher-on m-sock-matcher-ok'; r.row.style.order = String(i); r.row.style.setProperty('--w', '100%');
          r.lab.textContent = i === 4 ? 'VIBE' : ['HUE', 'PATTERN', 'CUFF', 'LENGTH'][i]; r.mk.textContent = '✓ tick'; r.tx.textContent = t[i];
        });
        E.slip.classList.add('m-sock-matcher-gold'); stampText('MATCH'); flashVerdict('MATCH 5/5', 'Five of five. The fifth gauge is not Tuesday.'); E.wit.hidden = true; E.reason.textContent = 'Five of five. The fifth gauge is not Tuesday.'; E.live.textContent = 'Five of five gauges agree. MATCH.'; api.sfx('tada');
      }
      function stampText(t) {
        E.stamp.textContent = t; E.stamp.classList.toggle('m-sock-matcher-long', t.length > 14); E.stamp.classList.remove('m-sock-matcher-on'); void E.stamp.offsetWidth; E.stamp.classList.add('m-sock-matcher-on');
      }
      function startEnding() {
        cancelPending(); upAll(); go('ending'); escSaid = false; if (proposal) toggleProposal(false); dimDrawer(true); dropEl('stage'); endDarning(false);
        const sa = el('div', { class: 'm-sock-matcher-stg' }, ghostSvg('m-sock-matcher-sock'), el('span', { 'aria-hidden': 'true', style: 'position:absolute;right:0;bottom:0;font-size:1.3rem', text: '🧳' }));
        const sb = el('div', { class: 'm-sock-matcher-stg' }, sockSvg(socks[14]));
        E.bubA = el('div', { class: 'm-sock-matcher-bub', hidden: true, text: SKIP_BUBBLE }); E.bubB = el('div', { class: 'm-sock-matcher-bub', hidden: true, text: SKIP_BUBBLE });
        sa.appendChild(E.bubA); sb.appendChild(E.bubB);
        E.stage = el('div', { class: 'm-sock-matcher-stage' }, sa, sb); E.ovl.appendChild(E.stage);
        E.prog.hidden = true; E.skip.hidden = true;
        const r = function (ms) { return Math.max(120, ms * RT); };
        const say1 = function (i, mood) {
          let t = L.ending[i];
          if (i === 10 && season > 2) t = 'Sock Matcher ' + (3000 + season - 1) + ' is the same as Sock Matcher ' + (3000 + season - 2) + ', but with a ' + ((3000 + season - 1) % 10) + ' in it.';
          say(t, { priority: 1, mood: mood || 'neutral' });
        };
        const steps = [
          [0, function () { say1(0, 'confused'); api.sfx('bell'); }],
          [r(3000), function () { say1(1, 'panic'); fiveTicks(); }],
          [r(3600), function () { say1(2, 'proud'); E.prog.hidden = false; E.progL.textContent = 'Ceremony Part 1 of 15'; E.progB.style.width = '7%'; api.confetti(); }],
          [r(2400), function () { E.bubA.hidden = false; E.bubB.hidden = false; api.sfx('pop'); }],
          [r(2800), function () { say1(3, 'smug'); }],
          [r(2800), function () { sa.classList.add('m-sock-matcher-leave'); sb.classList.add('m-sock-matcher-leave'); say1(4, 'confused'); api.sfx('whoosh'); E.prog.hidden = true; E.skip.hidden = true; }],
          [Math.max(300, 3000 * TS) + r(2800), function () { dropEl('stage'); say1(5, 'proud'); }],
          [r(3200), function () { say1(6, 'disappointed'); }],
          [r(3200), function () { say1(7, 'disappointed'); }],
          [r(3200), function () {
            say1(8, 'neutral'); api.award(7.5, 'reunion'); showPostcard(7, true);
            api.setTimeout(function () { api.award(-7, 'restocking fee'); say1(9, 'disappointed'); }, Math.max(60, 1500 * RT));
            later(function () { if (state === 'ending' && pinned.length === 7) say(L.pinHint[0], { priority: 1, mood: 'smug' }); }, r(3200)); // card 8 waits for its pin
          }],
          [r(16000), function () { newSeason(); stampText(END_STAMP); say1(10, 'smug'); }],
          [r(3200), function () { say1(11, 'proud'); api.confetti(); }],
          [r(3200), function () { say1(12, 'proud'); }],
          [r(2500), function () { go('idle'); ending = null; idleT = 0; persist(); }]
        ];
        ending = { idx: 0, leave: 5, run: null };
        ending.run = function () {
          if (state !== 'ending' || !ending) return;
          const s = steps[ending.idx]; ending.idx++; s[1]();
          if (ending && ending.idx < steps.length) later(ending.run, steps[ending.idx][0]);
        };
        later(function () { if (state === 'ending' && !E.prog.hidden) E.skip.hidden = false; }, Math.max(300, 8000 * TS));
        later(function () { if (state === 'ending') E.skip.hidden = E.prog.hidden; }, Math.max(300, 8000 * TS) + 4000);
        ending.run();
      }
      function newSeason() {
        season++; swaps = []; socks = genSocks(); order = api.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).concat([14]); firstId = -1; rep = null; dbl = null;
        pcRead = 0; pinned = []; yarnSel = -1; pcShown = -1; E.pc.hidden = true; dropEnv(); yarns.forEach(function (o) { if (o.parentNode) o.parentNode.removeChild(o); }); yarns = [];
        poster++; homeDone = false; homeAt = -1; chaseFrom = -1; chaseForced = false; pcMissN = 0; closeCensus(); seasonT0 = T; tumbleN = 0; kevinPromo = false; mintsEl = null; if (s16) endSixteenth(s16, false); s16Stage = 0; dropEl('court'); court = null; lastPair = null; cenNextAt = T + 150 * TS; cenResultAt = -1; kevinFirst = 0; setMs('gone'); fleeN = 0; stillMs = 0; kevinClicks = 0; pcNextAt = T + 45 * TS; dblDone = dblDone || false; dimDrawer(false); dropEl('stage');
        E.ms.firstChild.style.filter = ''; E.prog.hidden = true; E.skip.hidden = true;
        buildGrid(true); paintPins(); paintChips(); paintWall();
        E.title.textContent = titleText(); E.season.textContent = 'Season ' + season; E.season.hidden = false;
        if (!rm()) { E.season.classList.remove('m-sock-matcher-pulse'); void E.season.offsetWidth; E.season.classList.add('m-sock-matcher-pulse'); }
        api.setTitle('Sock Matcher ' + (3000 + season - 1)); api.sfx('whoosh'); api.achieve('sock-matcher.season2'); scheduleDue(false);
        persist();
      }

      /* ---------- keyboard, resize, visibility ---------- */
      function onEsc() {
        if (proposal) { toggleProposal(false); return; }
        if (locked()) { if (!escSaid) { escSaid = true; sayCat('esc', { mood: 'confused' }); } return; }
        if (state === 'reporting' || state === 'first') dismissReport();
      }
      function onKey(e) {
        const tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA') return;
        markInput();
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const k = e.key;
        if (k === 'Escape') { onEsc(); return; }
        if (k === 'Backspace') { const now = api.now(); if (now - lastBksp > 4000) { lastBksp = now; sayCat('backspace', { mood: 'confused' }); } return; }
        if (typeof k !== 'string' || k.length !== 1) return;
        const lk = k.toLowerCase();
        if (lk === 't') { if (!e.repeat) quarterTurn(); }
        else if (lk === 'p') pinCurrent();
        else if (lk === 's' && !e.repeat) { const id = focusedSockId(); if (id >= 0) { sKeyAt = api.now(); if (sniffing) { if (sniffing.src === 'key') endSniff(false); } else beginSniff(id, 'key'); } }
        darnBuf = (darnBuf + lk).slice(-4);
        if (darnBuf === 'darn') { darnBuf = ''; if (darning) endDarning(true); else startDarning(); }
      }
      function onKeyUp(e) { if ((e.key === 's' || e.key === 'S') && sniffing && sniffing.src === 'key' && api.now() - sKeyAt >= 400) endSniff(false); }
      function onGridKey(e) {
        const t = e.target; if (!t || !t.classList || !t.classList.contains('m-sock-matcher-card')) return;
        const id = Number(t.dataset.sid), pos = order.indexOf(id), cols = root.classList.contains('m-sock-matcher-narrow') ? 3 : 5; let np = -1;
        if (e.key === 'ArrowRight') np = (pos + 1) % 15; else if (e.key === 'ArrowLeft') np = (pos + 14) % 15;
        else if (e.key === 'ArrowDown') np = (pos + cols) % 15; else if (e.key === 'ArrowUp') np = (pos - cols + 15) % 15;
        else if (e.key === 'Home') np = 0; else if (e.key === 'End') np = 14;
        else if (e.key === 'Enter' && e.shiftKey) {
          e.preventDefault();
          if (bt.b8 && (state === 'idle' || proposal)) { if (!proposal) toggleProposal(true); if (proposal) selectForProposal(id); }
          return;
        }
        if (np < 0) return;
        e.preventDefault(); focusId = order[np]; applyTab();
        try { cardById[focusId].btn.focus(); } catch (x) { /* ignore */ }
      }
      function onResize(ev) {
        const w = root.clientWidth;
        if (w > 0) {
          const stack = w < 700; root.classList.toggle('m-sock-matcher-narrow', w < 520); root.classList.toggle('m-sock-matcher-stack', stack);
          // when stacked the side column sits below the fold, so the Census / Performance Review rides under the drawer instead
          if (E.cen && (E.cen.parentNode === E.main) !== stack) { if (stack) E.main.insertBefore(E.cen, E.pc); else E.side.insertBefore(E.cen, E.pol); }
        }
        let reduce = !!root.closest('.pm-reduce-motion');
        try { reduce = reduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (x) { /* no matchMedia */ }
        root.classList.toggle('m-sock-matcher-rm', reduce);
        if (ev && ev.type === 'resize' && api.now() - lastResize > 20000) { lastResize = api.now(); sayCat('resize', { mood: 'confused' }); }
      }
      function onVis() {
        let h = false; try { h = !!document.hidden; } catch (x) { /* ignore */ }
        const now = api.now();
        if (h) { vis = false; hidAt = now; }
        else { if (!vis && hidAt && now - hidAt > 30000) sayCat('away', { mood: 'smug' }); vis = true; lastTick = now; }
      }

      /* ---------- small beats, 3:00, 10:00, rare visitors ---------- */
      const CB = [['metToaster', 'cbToaster'], ['pet-rock.met', 'cbRock'], ['tiny-bureaucracy.tuesday', 'cbTuesday'], ['staring-contest.met', 'cbStare'], ['metGerald', 'cbGerald'], ['elevator-simulator.arrived', 'cbLift'], ['lost-and-found.seen', 'cbLost'], ['suggestion-box.certified', 'cbBox'], ['cloud-gazer.sockSeen', 'cbCloud']];
      function ambient() {
        if (api.chance(0.4)) {
          for (let i = 0; i < CB.length; i++) {
            if (!cbSaid[CB[i][1]] && flg(CB[i][0])) { cbSaid[CB[i][1]] = 1; say(api.line('m:sock-matcher:' + CB[i][1], { player: api.player.name }), { mood: 'smug' }); return; }
          }
        }
        if (season >= 2 && api.chance(0.4)) { sayCat('amb4', { mood: 'smug' }, season); return; }
        sayCat(T < 120 * TS ? 'amb1' : T < 330 * TS ? 'amb2' : 'amb3', { mood: 'neutral' });
      }
      function mandatoryFun() {
        bt.mf = true; showBanner('MANDATORY FUN'); const b = E.banner;
        if (state !== 'break') E.grid.classList.add('m-sock-matcher-slump');
        api.sfx('honk'); api.confetti(); api.award(3, 'attendance');
        say(L.fun[0], { priority: 1, mood: 'proud' });
        api.setTimeout(function () { say(L.fun[1], { priority: 1, mood: 'smug' }); }, Math.max(150, 2200 * TS));
        api.setTimeout(function () { say(L.fun[2], { priority: 1, mood: 'confused' }); }, Math.max(300, 4200 * TS));
        api.setTimeout(function () {
          if (b && b.parentNode) b.parentNode.removeChild(b);
          if (state !== 'break') E.grid.classList.remove('m-sock-matcher-slump');
          say(L.fun[3], { priority: 1, mood: 'neutral' });
        }, Math.max(500, 6500 * TS));
      }
      function tenMinutes() {
        bt.b10 = true; cancelPending(); go('ballet'); miniB = true; balletSung = true; dimDrawer(true); pairUp(); api.sfx('bell'); sayCat('miniBallet', { priority: 1, mood: 'confused' });
        api.setTimeout(function () { // six seconds of un-earned ballet, then the dryer turns itself on
          if (state !== 'ballet' || !miniB) return;
          endBallet(); say(L.tenMin[0], { priority: 1, mood: 'panic' }); fullTumble(false);
        }, Math.max(600, 6000 * RT));
        const nm = String(api.player.name || 'Valued Employee');
        api.setTimeout(function () { say(L.tenMin[1], { priority: 1, mood: 'proud' }); note('CERTIFICATE OF ATTENDANCE: ' + nm + ', 10 minutes, outcome unrecorded.'); api.award(10, 'long service'); api.sfx('fanfare'); api.confetti(); }, Math.max(300, 4000 * TS));
        api.setTimeout(function () { api.award(-9.5, 'long-service levy'); say(L.tenMin[2], { priority: 1, mood: 'disappointed' }); }, Math.max(600, 8500 * TS));
        api.setTimeout(function () { say(L.tenMin[3], { priority: 1, mood: 'smug' }); }, Math.max(900, 13000 * TS));
      }
      function dennisVisit() {
        dennisAt = T; dropEl('dennis');
        const d = el('div', { class: 'm-sock-matcher-dennis', 'aria-hidden': 'true' }, el('span', { text: '🌿' }), el('small', { text: 'Dennis (Plant)' })); E.dennis = d; E.ovl.appendChild(d); api.sfx('pop');
        if (flg('metDennis') || flg('plantClicked')) say(api.line('m:sock-matcher:dennisMet', { player: api.player.name }), { priority: 1, mood: 'confused' }); // lint-ignore filled via the L table
        else sayCat('dennis', { priority: 1, mood: 'confused' });
        api.setTimeout(function () { sayCat('dennisBye', { mood: 'neutral' }); }, Math.max(500, 5200 * RT));
        api.setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); if (E.dennis === d) E.dennis = null; }, Math.max(700, 6500 * RT));
      }
      /* season 2 update: the Census, the loose button */
      function closeCensus() { cenQ = -1; E.cen.hidden = true; E.cenK.hidden = true; E.cenH.textContent = CEN_H; while (E.cenB.firstChild) E.cenB.removeChild(E.cenB.firstChild); }
      function openReview() { // Kevin's Performance Review reuses the Census panel: three buttons, one outcome
        cenQ = REV; cenEnds = T + Math.max(45 * TS, 6); E.cen.hidden = false; E.cenH.textContent = REV_H;
        while (E.cenK.firstChild) E.cenK.removeChild(E.cenK.firstChild); E.cenK.appendChild(sockSvg(socks[14])); E.cenK.hidden = false;
        E.cenT.textContent = 'Strengths: attendance. Areas for growth: matching.';
        while (E.cenB.firstChild) E.cenB.removeChild(E.cenB.firstChild);
        ['Approve', 'Approve (with feelings)', 'Approve'].forEach(function (t, i) { E.cenB.appendChild(el('button', { class: 'm-sock-matcher-btn' + (i === 1 ? ' m-sock-matcher-b2' : i === 2 ? ' m-sock-matcher-b3' : ''), type: 'button', text: t, onclick: function () { approveReview(false); } })); });
        say(L.review[0], { priority: 1, mood: 'smug' }); api.setTimeout(function () { if (cenQ === REV) say(L.review[1], { mood: 'proud' }); }, Math.max(300, 3600 * RT)); api.sfx('ding');
      }
      function approveReview(auto) {
        if (cenQ !== REV) return; closeCensus(); kevinPromo = true; api.stat.inc('sock-matcher.reviews'); api.award(auto ? 0.1 : 0.5, 'performance review'); api.sfx(auto ? 'stamp' : 'tada');
        say(L.review[auto ? 3 : 2], { priority: 1, mood: 'proud' }); note('REVIEW FILED: Kevin, Associate Sock (Acting). Approved x3. All three were the same Approve.');
        if (!auto) api.setTimeout(function () { say(L.review[4], { mood: 'smug' }); }, Math.max(300, 4800 * RT));
        if (!mintsEl && cardById[14]) mintsEl = badge(14, 'm-sock-matcher-mints', '🍬');
        paintChips();
      }
      function openCensus() {
        cenQ =cenCount % 3; const q = CENSUS[cenQ]; cenEnds = T + Math.max(45 * TS, 6); E.cen.hidden = false; E.cenT.textContent = q[0];
        while (E.cenB.firstChild) E.cenB.removeChild(E.cenB.firstChild);
        [1, 2, 3].forEach(function (i) { E.cenB.appendChild(el('button', { class: 'm-sock-matcher-btn' + (i > 1 ? ' m-sock-matcher-b' + i : ''), type: 'button', text: q[i], onclick: function () { answerCensus(i - 1); } })); });
        sayCat('census', { priority: 1, mood: 'smug' }); api.sfx('ding');
      }
      function answerCensus(c) {
        if (cenQ < 0) return; const q = cenQ; closeCensus(); cenCount++; cenResultAt = T + 75 * TS; api.award(0.5, 'census'); api.sfx('stamp');
        say(L.censusA[q * 3 + c], { priority: 1, mood: 'proud' }); note('CENSUS RECEIVED (not read). Respondent: ' + String(api.player.name || 'Valued Employee') + '. Answer: ' + CENSUS[q][c + 1] + '.'); persist();
      }
      function censusTick() {
        if (cenQ === REV) { if (T >= cenEnds) approveReview(true); return; }
        if (cenQ < 0 && revG !== season && T >= Math.max(345, seasonT0 + 300) * TS && state === 'idle' && msState === 'gone' && !darning) { revG = season; openReview(); return; }
        if (cenQ >= 0) { if (T >= cenEnds) { closeCensus(); cenCount++; say(pickLine('censusLate'), { mood: 'disappointed' }); persist(); } return; }
        if (cenNextAt >= 0 && T >= cenNextAt && state === 'idle' && msState === 'gone') { cenNextAt = -1; openCensus(); }
        else if (cenResultAt >= 0 && T >= cenResultAt && state === 'idle') { cenResultAt = -1; sayCat('censusRes', { priority: 1, mood: 'smug' }); note('CENSUS RESULTS: sealed. Key held by Sandra. Sandra is held by the key.'); }
      }
      function looseButton() {
        btnAt = T; dropEl('lbtn'); const D = Math.max(900, 6000 * TS);
        const b = el('button', { class: 'm-sock-matcher-lbtn', type: 'button', 'aria-label': 'A loose button', style: 'animation-duration:' + num(D / 1000, 2) + 's', text: '🔘', onclick: function () {
          if (E.lbtn !== b) return; dropEl('lbtn'); api.award(0.3, 'button'); api.sfx('pop'); api.stat.inc('sock-matcher.buttons'); note('BUTTON LOGGED: 1 (one). Origin: unknown. Owner: unknown. Coat: unknown.'); sayCat('buttonCaught', { priority: 1, mood: 'proud' });
        } });
        E.lbtn = b; E.ovl.appendChild(b); sayCat('buttonAppear', { mood: 'confused' }); api.sfx('whoosh');
        api.setTimeout(function () { if (E.lbtn === b) { dropEl('lbtn'); sayCat('buttonMissed', { mood: 'neutral' }); } }, D);
      }

      /* ---------- the director ---------- */
      function tick() {
        const now = api.now(); let dt = (now - lastTick) / 1000; lastTick = now;
        if (!isFinite(dt) || dt < 0) dt = 0; dt = Math.min(dt, 1);
        if (!vis) return;
        T += dt;
        if (root.clientWidth !== lastW) { lastW = root.clientWidth; onResize(); }
        if (!bt.b2 && (attempts >= 4 || T >= 30 * TS)) { bt.b2 = true; E.dry.hidden = false; kevinStatT = T; say(L.dryerIntro[0], { priority: 1, mood: 'proud' }); }
        if (!bt.b3 && T >= 60 * TS) beat3();
        if (!bt.b5a && T >= 90 * TS) { bt.b5a = true; E.resP.hidden = false; say(L.unlock[1], { mood: 'proud' }); if (resumeId >= 0) showResume(resumeId); }
        if (!bt.b5b && T >= 135 * TS) bt.b5b = true;
        if (!bt.b8 && T >= 390 * TS) { bt.b8 = true; E.prop.hidden = false; say(L.unlock[2], { mood: 'smug', priority: 1 }); }
        if (T >= 8 * TS) showPoster();
        if (bt.b2 && !kevinGlove && T - kevinStatT >= 20 * TS) { kevinStat++; kevinStatT = T; paintChips(); }
        policyTick(); pcTick(); chaseTick(dt); idleTick(dt); censusTick();
        if (state === 'idle' && !E.lbtn && btnG !== season && T >= Math.max(330, seasonT0 + 250) * TS) { btnG = season; looseButton(); } // guaranteed once a season; the dice are for the repeats
        else if (T >= 150 * TS && state === 'idle' && !E.lbtn && T - btnAt >= 300 * TS && api.chance(1 / (2400 * Math.max(TS, 0.05)))) looseButton();
        if (!bt.mf && T >= 180 * TS && state === 'idle') mandatoryFun();
        if (!bt.b10 && T >= 600 * TS && state === 'idle' && !homeDone && !E.dry.hidden) tenMinutes();
        if (state === 'idle' && !E.dennis && dennisG !== season && T >= Math.max(240, seasonT0 + 200) * TS) { dennisG = season; dennisVisit(); }
        else if (T >= 100 * TS && state === 'idle' && !E.dennis && T - dennisAt >= 240 * TS && api.chance(1 / (1600 * Math.max(TS, 0.05)))) dennisVisit();
        if (T - lastBeatT >= 22 * TS && T >= 12 * TS && idleT < 18 * TS && (state === 'idle' || state === 'first') && !dreaming) ambient();
        if (darning && T >= darnEnds) endDarning(true);
        if (homeDone && homeAt >= 0 && T - homeAt >= 40 * TS && state === 'idle') startEnding();
      }

      /* ---------- go ---------- */
      build();
      socks = genSocks(); order = api.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).concat([14]);
      buildGrid(false); paintChips(); paintWall(); paintPins(); onResize(); scheduleDue(true); go('idle');
      api.on(root, 'pointerdown', function () { markInput(); });
      api.on(root, 'touchstart', function () { markInput(); }, { passive: true });
      api.on(root, 'pointermove', onMove);
      api.on(document, 'keydown', onKey); api.on(document, 'keyup', onKeyUp); api.on(E.grid, 'keydown', onGridKey);
      api.on(document, 'visibilitychange', onVis); api.on(window, 'resize', onResize);
      api.on(E.dial, 'pointerdown', dialDown); api.on(E.dial, 'pointermove', dialMove); api.on(E.dial, 'pointerup', dialUp); api.on(E.dial, 'pointercancel', dialUp);
      api.setInterval(tick, 250);
      api.setTimeout(function () { say(L.open[0], { mood: 'proud', priority: 2 }); }, 1200);
      api.setTimeout(function () { if (!ffSaid && state === 'idle') say(L.open[2], { mood: 'smug' }); }, 6000);
      api.setTimeout(function () {
        if (ni(sv.attempts, 0) > 0) say(L.callback[0], { priority: 1, mood: 'smug' });
        else if (api.flag.get('sockSeen')) say(L.callback[1], { priority: 1, mood: 'confused' });
        else if (season >= 2) say(fillC(L.callback[2], season), { priority: 1, mood: 'smug' });
      }, 2600);
      if (isTue) api.setTimeout(function () { say(L.tuesday[1], { mood: 'smug' }); }, 4200);
      return {
        destroy() { try { restoreSwaps(); } catch (x) { /* ignore */ } persist(); }
      };
    }
  });
})();
