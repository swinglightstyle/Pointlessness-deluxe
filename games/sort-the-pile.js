/* POINTLESS module: sort-the-pile */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`
.m-sort-the-pile-root{--ink:#2b2230;--cream:#fbf3df;--coral:#ff7a6b;--mustard:#f2b632;--mint:#7fd6b0;--lilac:#b79af0;--red:#d6322e;--beige:#efe3c2;--sh:4px 4px 0 var(--ink);color:var(--ink);font-family:ui-rounded,'Trebuchet MS',system-ui,sans-serif;font-size:15px;line-height:1.25;background:radial-gradient(#2b223322 1px,transparent 1.4px) 0 0/14px 14px,var(--cream);-webkit-user-select:none;user-select:none;overflow-x:hidden} .m-sort-the-pile-root *{box-sizing:border-box} .m-sort-the-pile-root :where(button){font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent} .m-sort-the-pile-root button:focus-visible{outline:3px solid #5b2fe0;outline-offset:2px} .m-sort-the-pile-root [hidden]{display:none!important} .m-sort-the-pile-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.m-sort-the-pile-top{display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:10px;margin:0 0 8px} .m-sort-the-pile-tag{position:relative;display:block;background:#fff;border:3px solid var(--ink);border-radius:10px 14px 10px 12px;box-shadow:var(--sh);padding:5px 10px 6px;text-align:left;min-width:0} .m-sort-the-pile-top>.m-sort-the-pile-tag:nth-child(1){transform:rotate(-1deg)} .m-sort-the-pile-top>.m-sort-the-pile-tag:nth-child(2){transform:rotate(.8deg)} .m-sort-the-pile-top>.m-sort-the-pile-tag:nth-child(3){transform:rotate(-.5deg);background:#fff2a8} .m-sort-the-pile-tl{display:block;font-size:.66rem;font-weight:900;letter-spacing:.14em} .m-sort-the-pile-big{display:block;font-size:1.5rem;font-weight:900;font-variant-numeric:tabular-nums;line-height:1.15;overflow-wrap:anywhere}
.m-sort-the-pile-accb{display:inline-block;max-width:100%;background:none;border:0;padding:0 2px;touch-action:none;cursor:grab;font-weight:900;font-size:1.9rem;line-height:1.1;font-variant-numeric:tabular-nums;color:var(--ink);overflow-wrap:anywhere;text-align:left;min-height:34px} .m-sort-the-pile-accb.m-sort-the-pile-lift{outline:3px dashed #5b2fe0;outline-offset:2px} .m-sort-the-pile-accb.m-sort-the-pile-wig{animation:m-sort-the-pile-wig .4s} .m-sort-the-pile-accb.m-sort-the-pile-wd{font-size:1.05rem;line-height:1.15} .m-sort-the-pile-accu{font-size:.62em;margin-left:1px} .m-sort-the-pile-sm{display:block;font-size:.72rem;font-weight:700;opacity:.85} .m-sort-the-pile-fn{position:absolute;right:6px;top:2px;width:28px;height:28px;border:0;background:none;font-size:1.2rem;font-weight:900} .m-sort-the-pile-rubb{text-align:left;cursor:pointer;font:inherit}
.m-sort-the-pile-rubb:hover{background:#fff7c4} .m-sort-the-pile-mgmt{display:flex;align-items:center;gap:10px;margin:0 0 10px;padding:4px 10px;border:3px dashed var(--ink);border-radius:8px;background:#fff9;font-size:.78rem;font-weight:800;letter-spacing:.06em;min-height:32px} .m-sort-the-pile-mgmt.m-sort-the-pile-over{background:#ffe38a;border-style:solid} .m-sort-the-pile-mgmt b{letter-spacing:.2em} .m-sort-the-pile-mgmt span{margin-left:auto;font-variant-numeric:tabular-nums} .m-sort-the-pile-main{display:grid;grid-template-columns:55fr 45fr;gap:14px;align-items:start} .m-sort-the-pile-narrow .m-sort-the-pile-main{grid-template-columns:minmax(0,1fr)} .m-sort-the-pile-tray,.m-sort-the-pile-right{position:relative;min-width:0}
.m-sort-the-pile-stage{position:relative;height:300px;--cw:min(240px,76%);border:3px solid var(--ink);border-radius:14px 18px 12px 20px;background:#eadfc2;box-shadow:var(--sh)} .m-sort-the-pile-narrow .m-sort-the-pile-stage{height:276px} .m-sort-the-pile-tilt{transform:rotate(2deg);transition:transform .6s} .m-sort-the-pile-conv{position:absolute;left:0;right:0;bottom:0;height:36px;border-top:3px solid var(--ink);border-radius:0 0 10px 14px;background:repeating-linear-gradient(90deg,#d6c69c 0 18px,#c8b58a 18px 36px);animation:m-sort-the-pile-belt 1.6s linear infinite} .m-sort-the-pile-slow .m-sort-the-pile-conv{animation-duration:4s} .m-sort-the-pile-boxb{position:absolute;left:7%;right:7%;bottom:20px;height:92px;background:linear-gradient(#e0ad70,#c98f55);clip-path:polygon(0 24%,6% 0,94% 0,100% 24%,100% 100%,0 100%);z-index:0}
.m-sort-the-pile-heap{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:12px} .m-sort-the-pile-slip{position:absolute;width:64px;height:40px;padding:3px;background:#fffdf6;border:2px solid var(--ink);border-radius:4px;font-size:.55rem;line-height:1.05;overflow:hidden;transform:rotate(var(--r,0deg));animation:m-sort-the-pile-wob 3.4s ease-in-out infinite alternate} .m-sort-the-pile-neat .m-sort-the-pile-slip{--r:0deg!important;animation:none} .m-sort-the-pile-gh{position:absolute;left:calc(50% - var(--cw)/2);top:46px;width:var(--cw);min-height:156px;padding:10px;background:#fffdf6;border:3px solid var(--ink);border-radius:14px;text-align:center;transform:translate(14px,-10px) rotate(3deg);z-index:1;pointer-events:none;overflow:hidden} .m-sort-the-pile-gh+.m-sort-the-pile-gh{transform:translate(-16px,-18px) rotate(-3deg);z-index:0}
.m-sort-the-pile-gh .m-sort-the-pile-title{filter:blur(5px)} .m-sort-the-pile-gh .m-sort-the-pile-cap{display:none} .m-sort-the-pile-card{position:absolute;left:calc(50% - var(--cw)/2);top:50px;width:var(--cw);min-height:156px;padding:0;border:0;background:none;text-align:center;touch-action:none;cursor:grab;z-index:4;will-change:transform} .m-sort-the-pile-card.m-sort-the-pile-lifted{cursor:grabbing;z-index:60} .m-sort-the-pile-cardfx{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;min-height:156px;padding:10px 10px 12px;background:#fffdf6;border:3px solid var(--ink);border-radius:14px;box-shadow:var(--sh)} .m-sort-the-pile-enter .m-sort-the-pile-cardfx{animation:m-sort-the-pile-in .32s cubic-bezier(.2,1.4,.4,1)} .m-sort-the-pile-sel .m-sort-the-pile-cardfx{outline:3px dashed #5b2fe0;outline-offset:3px}
.m-sort-the-pile-lifted .m-sort-the-pile-cardfx{box-shadow:9px 11px 0 #2b223388} .m-sort-the-pile-jig .m-sort-the-pile-cardfx{animation:m-sort-the-pile-jig .5s} .m-sort-the-pile-shake .m-sort-the-pile-cardfx{animation:m-sort-the-pile-shake .35s} .m-sort-the-pile-lite .m-sort-the-pile-art{opacity:.3} .m-sort-the-pile-hintl{display:block;font-weight:900;font-size:1.15rem;letter-spacing:.25em;margin-top:2px} .m-sort-the-pile-bump{animation:m-sort-the-pile-bump .4s} .m-sort-the-pile-creepL .m-sort-the-pile-cardfx{animation:m-sort-the-pile-creepL .8s} .m-sort-the-pile-creepR .m-sort-the-pile-cardfx{animation:m-sort-the-pile-creepR .8s} .m-sort-the-pile-busy .m-sort-the-pile-slip{animation-duration:.45s} .m-sort-the-pile-busy .m-sort-the-pile-cardfx{transform:rotate(-4deg)}
.m-sort-the-pile-art{position:relative;height:62px;min-width:62px;font-size:52px;line-height:62px;filter:drop-shadow(2px 3px 0 #2b223344)} .m-sort-the-pile-art i{position:absolute;right:-16px;bottom:-4px;font-style:normal;font-size:30px;line-height:1} .m-sort-the-pile-blob{width:84px;height:60px;margin-top:2px;background:#bfe0f5aa;border:3px solid #7fb2d6;border-radius:60% 40% 55% 45%;animation:m-sort-the-pile-blob 3s ease-in-out infinite alternate} .m-sort-the-pile-slab{position:relative;width:60px;height:60px;border-radius:8px;background:#2b2230;border:3px solid #000} .m-sort-the-pile-slab i{position:absolute;left:12px;top:12px;width:30px;height:30px;border-radius:50%;background:conic-gradient(#fff 0 12%,#2b2230 12% 38%,#fff 38% 100%);border:2px solid #fff}
.m-sort-the-pile-minis{display:flex;flex-wrap:wrap;justify-content:center;max-width:96px;height:62px;font-size:24px;line-height:28px} .m-sort-the-pile-title{font-weight:900;font-size:1rem;overflow-wrap:anywhere} .m-sort-the-pile-cap{font-size:.8rem;font-weight:600;opacity:.9;overflow-wrap:anywhere} .m-sort-the-pile-sticky{position:absolute;right:-10px;top:-12px;max-width:70%;padding:3px 8px;background:#ffe97a;border:2px solid var(--ink);font-size:.7rem;font-weight:800;transform:rotate(5deg);box-shadow:2px 2px 0 var(--ink)}
.m-sort-the-pile-tag2{position:absolute;left:50%;top:-30px;display:none;max-width:90%;padding:2px 10px;background:#fff6dd;border:2px solid var(--ink);border-radius:4px 10px 10px 4px;font-size:.7rem;font-weight:800;transform-origin:50% -10px;animation:m-sort-the-pile-swing 1.2s ease-in-out infinite alternate;pointer-events:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .m-sort-the-pile-lifted .m-sort-the-pile-tag2{display:block} .m-sort-the-pile-ring{position:absolute;inset:-6px;border-radius:18px;border:5px solid transparent;pointer-events:none} .m-sort-the-pile-fat .m-sort-the-pile-ring{border-color:var(--red);animation:m-sort-the-pile-fade 3s linear forwards} .m-sort-the-pile-fat .m-sort-the-pile-cardfx{background:#e7e1f0;filter:grayscale(.6)}
.m-sort-the-pile-ptag{position:absolute;left:8px;top:6px;font-size:.7rem;font-weight:900;z-index:2;background:#fff;border:2px solid var(--ink);border-radius:6px;padding:0 6px} .m-sort-the-pile-otag{position:absolute;right:8px;top:6px;font-size:.7rem;font-weight:900;z-index:2;background:#ffe38a;border:2px solid var(--ink);border-radius:6px;padding:0 6px} .m-sort-the-pile-drawer{position:absolute;right:-6px;top:84px;width:74px;min-height:92px;padding:4px;border:3px solid var(--ink);border-radius:8px;background:#b79af066;z-index:3;font-size:.58rem;font-weight:800;text-align:center;display:flex;flex-direction:column;gap:2px} .m-sort-the-pile-drawer span{font-size:1.2rem;min-height:1.4rem}
.m-sort-the-pile-intro{position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);z-index:8;min-height:44px;padding:4px 14px;background:var(--mint);border:3px solid var(--ink);border-radius:12px;font-weight:900;box-shadow:var(--sh)} .m-sort-the-pile-bins{display:grid;grid-template-columns:1fr 1fr;gap:16px 12px;padding-top:12px} .m-sort-the-pile-shuf .m-sort-the-pile-bin:nth-child(1){order:3}.m-sort-the-pile-shuf .m-sort-the-pile-bin:nth-child(2){order:4}.m-sort-the-pile-shuf .m-sort-the-pile-bin:nth-child(3){order:1}.m-sort-the-pile-shuf .m-sort-the-pile-bin:nth-child(4){order:2}
.m-sort-the-pile-bin{position:relative;display:block;min-height:112px;padding:34px 24px 30px 8px;background:linear-gradient(var(--bc),var(--bc));border:3px solid var(--ink);border-radius:10px 14px 12px 16px;box-shadow:var(--sh);text-align:center;transition:transform .15s;transform:rotate(calc(var(--lean,0)*1deg))} .m-sort-the-pile-bin::before{content:'';position:absolute;left:-3px;top:-14px;width:calc(100% + 6px);height:16px;background:var(--bc);filter:brightness(.88);border:3px solid var(--ink);border-radius:6px 6px 0 0;transform-origin:top left;transform:rotate(calc(var(--lean,0)*-2.2deg));transition:transform .15s} .m-sort-the-pile-open::before{transform:rotate(-24deg)} .m-sort-the-pile-closed::before{transform:rotate(0);filter:brightness(.7)} .m-sort-the-pile-bin:active{transform:translate(2px,2px)}
.m-sort-the-pile-c0{--bc:var(--coral)}.m-sort-the-pile-c1{--bc:var(--mustard)}.m-sort-the-pile-c2{--bc:var(--mint)}.m-sort-the-pile-c3{--bc:var(--lilac)}.m-sort-the-pile-c4{--bc:#fff} .m-sort-the-pile-cursor{outline:4px solid #5b2fe0;outline-offset:3px} .m-sort-the-pile-face{position:absolute;left:0;right:0;top:6px;height:22px;pointer-events:none} .m-sort-the-pile-eye{position:absolute;top:2px;width:7px;height:7px;border-radius:50%;background:var(--ink)} .m-sort-the-pile-eye:nth-child(1){left:34%}.m-sort-the-pile-eye:nth-child(2){left:62%} .m-sort-the-pile-mouth{position:absolute;left:44%;top:12px;width:14px;height:0;border-bottom:3px solid var(--ink);border-radius:0 0 14px 14px;transition:all .3s} .m-sort-the-pile-root:not(.m-sort-the-pile-g3) .m-sort-the-pile-mouth{height:0!important;border-radius:0!important} .m-sort-the-pile-t1 .m-sort-the-pile-mouth{height:3px}
.m-sort-the-pile-t2 .m-sort-the-pile-mouth{height:7px} .m-sort-the-pile-uneasy .m-sort-the-pile-mouth{height:6px;border-bottom:0;border-top:3px solid var(--ink);border-radius:14px 14px 0 0;top:14px} .m-sort-the-pile-lab{position:relative;display:block;margin:0 auto;max-width:94%;padding:4px 8px;background:#fffdf6;border:2px solid var(--ink);font-style:italic;font-weight:900;font-size:.8rem;letter-spacing:.04em;text-transform:uppercase;transform:rotate(var(--rot,-1deg));clip-path:polygon(0 0,97% 0,100% 12%,100% 100%,4% 100%,0 88%);touch-action:none;cursor:grab;overflow-wrap:anywhere;min-height:30px} .m-sort-the-pile-lab.m-sort-the-pile-flip{animation:m-sort-the-pile-flip .45s} .m-sort-the-pile-lab.m-sort-the-pile-wet{filter:blur(.4px)}
.m-sort-the-pile-lab.m-sort-the-pile-peel::after{content:'';position:absolute;right:0;top:0;width:16px;height:16px;background:linear-gradient(225deg,transparent 50%,#bdb39c 50%);transform-origin:top right;animation:m-sort-the-pile-peel 1.2s ease-in-out} .m-sort-the-pile-lab.m-sort-the-pile-lift{outline:3px dashed #5b2fe0;outline-offset:2px} .m-sort-the-pile-note{position:absolute;left:4px;bottom:-14px;max-width:90%;padding:1px 6px;background:#ffe97a;border:2px solid var(--ink);font-size:.62rem;font-weight:800;font-style:normal;text-transform:none;transform:rotate(-4deg);z-index:4} .m-sort-the-pile-cnt{position:absolute;left:4px;right:24px;bottom:3px;font-size:.7rem;font-weight:800;line-height:1.1} .m-sort-the-pile-spill{position:absolute;right:4px;top:30px;display:flex;flex-direction:column;align-items:flex-end;gap:0;font-size:.85rem;line-height:1;pointer-events:none}
.m-sort-the-pile-tape{position:absolute;inset:-6px;display:none;background:repeating-linear-gradient(45deg,#f2b632cc 0 10px,#2b2230cc 10px 20px);border-radius:12px;pointer-events:none;opacity:.85;z-index:3} .m-sort-the-pile-taped .m-sort-the-pile-tape{display:block} .m-sort-the-pile-hat{position:absolute;left:4px;top:-30px;display:none;font-size:1.6rem;pointer-events:none;z-index:5} .m-sort-the-pile-hats .m-sort-the-pile-hat{display:block} .m-sort-the-pile-hand{position:absolute;right:2px;top:-22px;display:none;font-size:1.5rem;z-index:5;pointer-events:none} .m-sort-the-pile-wave .m-sort-the-pile-hand{display:block;animation:m-sort-the-pile-wave .5s ease-in-out infinite alternate} .m-sort-the-pile-thumb{position:absolute;left:4px;top:30px;display:none;font-size:1.3rem;z-index:5;opacity:.6;pointer-events:none} .m-sort-the-pile-thumbs .m-sort-the-pile-thumb{display:block}
.m-sort-the-pile-sign{position:absolute;left:6px;right:6px;top:36px;display:none;padding:2px;background:#fff;border:2px solid var(--ink);font-size:.6rem;font-weight:900;z-index:6;transform:rotate(-3deg);pointer-events:none} .m-sort-the-pile-onbreak .m-sort-the-pile-sign{display:block} .m-sort-the-pile-flipped{animation:m-sort-the-pile-inout .65s} .m-sort-the-pile-smudge{opacity:.55;filter:blur(1px);transform:scale(.7)} .m-sort-the-pile-shaky .m-sort-the-pile-bin{animation:m-sort-the-pile-shake .3s 6} .m-sort-the-pile-rail.m-sort-the-pile-has{min-height:84px} .m-sort-the-pile-rail::before{content:'RECEIPT PRINTER';position:absolute;left:0;top:-14px;font-size:.6rem;font-weight:900;letter-spacing:.2em;opacity:.55} .m-sort-the-pile-rail:not(.m-sort-the-pile-has)::before{content:'RECEIPT PRINTER: WARMING UP (SINCE 2011)';top:30px;left:10px;max-width:90%;opacity:.6;line-height:1.4} .m-sort-the-pile-rail{position:relative;display:flex;gap:6px;min-height:84px;margin-top:14px;padding:6px 4px 10px;overflow-x:auto;align-items:flex-start;border-bottom:6px solid #2b22331f;border-radius:0 0 8px 8px}
.m-sort-the-pile-chain{position:absolute;right:0;top:-4px;width:14px;height:56px;background:repeating-linear-gradient(#fffdf6 0 8px,#aac4e6 8px 10px);border:2px solid var(--ink);display:none} .m-sort-the-pile-jam .m-sort-the-pile-chain{display:block}
.m-sort-the-pile-rec{flex:0 0 auto;width:140px;min-height:76px;padding:6px 8px 10px;text-align:left;font-family:ui-monospace,'Cascadia Mono','Courier New',monospace;font-size:.62rem;font-weight:700;line-height:1.25;background:#fffdf6 repeating-linear-gradient(transparent 0 11px,#aac4e655 11px 12px);border:2px solid var(--ink);border-bottom:0;box-shadow:2px 2px 0 var(--ink);animation:m-sort-the-pile-print .5s steps(6) both;position:relative;border-radius:2px 2px 0 0;-webkit-mask:linear-gradient(#000,#000) top/100% calc(100% - 6px) no-repeat,repeating-linear-gradient(90deg,#000 0 6px,transparent 6px 9px) bottom/100% 6px no-repeat;mask:linear-gradient(#000,#000) top/100% calc(100% - 6px) no-repeat,repeating-linear-gradient(90deg,#000 0 6px,transparent 6px 9px) bottom/100% 6px no-repeat} .m-sort-the-pile-rec.m-sort-the-pile-pick{background-color:#fff2a8}
.m-sort-the-pile-rec b{display:block;font-size:.66rem;overflow-wrap:anywhere} .m-sort-the-pile-rec em{display:block;font-style:normal;color:var(--red);font-size:.6rem;overflow-wrap:anywhere} .m-sort-the-pile-mk{cursor:help;padding:0 3px;font-weight:900} .m-sort-the-pile-stk{position:absolute;right:-4px;top:-6px;padding:0 5px;background:#ffe97a;border:1px solid var(--ink);transform:rotate(6deg);font-size:.55rem} .m-sort-the-pile-stp{position:absolute;left:6px;bottom:10px;padding:1px 4px;border:2px solid var(--red);color:var(--red);font-weight:900;font-size:.58rem;transform:rotate(-8deg);background:#fffdf6dd} .m-sort-the-pile-lower{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:12px;align-items:start} .m-sort-the-pile-narrow .m-sort-the-pile-lower{grid-template-columns:minmax(0,1fr)} .m-sort-the-pile-btns{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.m-sort-the-pile-btn{min-height:44px;padding:6px 14px;background:#fff;border:3px solid var(--ink);border-radius:12px;font-weight:900;box-shadow:3px 3px 0 var(--ink)} .m-sort-the-pile-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)} .m-sort-the-pile-btn.m-sort-the-pile-pri{background:var(--mustard)} .m-sort-the-pile-revs,.m-sort-the-pile-tick{font-size:.78rem;font-weight:800;margin:4px 0} .m-sort-the-pile-tick{min-height:1.3em;opacity:.9;font-style:italic} .m-sort-the-pile-tick.m-sort-the-pile-tfade{animation:m-sort-the-pile-fade2 9s}
.m-sort-the-pile-root:not(.m-sort-the-pile-g3) .m-sort-the-pile-revs,.m-sort-the-pile-root:not(.m-sort-the-pile-g4) .m-sort-the-pile-dialw,.m-sort-the-pile-root:not(.m-sort-the-pile-g4) .m-sort-the-pile-appeal,.m-sort-the-pile-root:not(.m-sort-the-pile-g5) .m-sort-the-pile-otag,.m-sort-the-pile-root:not(.m-sort-the-pile-g7) .m-sort-the-pile-tick,.m-sort-the-pile-root:not(.m-sort-the-pile-g4) .m-sort-the-pile-drawer{display:none} .m-sort-the-pile-dialw svg{display:block;width:100%;max-width:270px;height:auto} .m-sort-the-pile-needle{transition:transform .6s cubic-bezier(.3,1.5,.5,1);transform-origin:100px 100px}
.m-sort-the-pile-clip{position:relative;padding:22px 14px 28px 38px;background:#fff2a8 linear-gradient(90deg,transparent 28px,#d6322e 28px,#d6322e 30px,transparent 30px);border:3px solid var(--ink);border-bottom:0;box-shadow:var(--sh);clip-path:polygon(0 0,100% 0,100% 94%,94% 100%,88% 95%,80% 100%,70% 94%,60% 100%,50% 95%,40% 100%,30% 94%,20% 100%,10% 95%,0 100%);min-width:0;transform:rotate(.6deg);text-align:left;cursor:pointer} .m-sort-the-pile-clip::before{content:'';position:absolute;left:50%;top:-8px;width:54px;height:22px;margin-left:-27px;background:#8b8f99;border:3px solid var(--ink);border-radius:6px} .m-sort-the-pile-clip::after{content:'';position:absolute;right:16px;top:8px;width:60px;height:4px;background:#e1b83a;border-radius:3px;transform:rotate(18deg)} .m-sort-the-pile-root:not(.m-sort-the-pile-clipon) .m-sort-the-pile-clip{display:none}
.m-sort-the-pile-narrow:not(.m-sort-the-pile-clipopen) .m-sort-the-pile-clip{display:none} .m-sort-the-pile-clipt{margin:0 0 6px;font-size:.8rem;font-weight:900;letter-spacing:.1em} .m-sort-the-pile-clipu{position:absolute;right:10px;top:22px;font-size:.55rem;font-weight:800;transform:rotate(180deg);max-width:140px;opacity:.6} .m-sort-the-pile-clip ol{list-style:none;margin:0;padding:0} .m-sort-the-pile-clip li{min-height:20px;margin:3px 0;font-family:'Segoe Print','Bradley Hand','Comic Sans MS',cursive;font-style:italic;font-size:.78rem;line-height:1.2;overflow-wrap:anywhere} .m-sort-the-pile-redact{display:block;height:15px;margin:2px 0;background:repeating-linear-gradient(0deg,#2b2230 0 2px,#3a3042 2px 3px);border-radius:2px} .m-sort-the-pile-clip li.m-sort-the-pile-arch{text-decoration:line-through;opacity:.65}
.m-sort-the-pile-look{margin-top:10px;padding:8px 12px;background:#fffdf6;border:3px solid var(--ink);border-radius:10px;box-shadow:var(--sh);font-size:.82rem} .m-sort-the-pile-look h3{margin:0 0 4px;font-size:.85rem;letter-spacing:.08em} .m-sort-the-pile-look ul{margin:4px 0;padding-left:18px} .m-sort-the-pile-look s{opacity:.6} .m-sort-the-pile-ribbon{position:absolute;left:-10%;right:-10%;top:42%;z-index:90;padding:6px;background:var(--red);color:#fff;border-top:4px solid var(--ink);border-bottom:4px solid var(--ink);text-align:center;font-weight:900;letter-spacing:.2em;transform:rotate(-4deg);pointer-events:none;opacity:0} .m-sort-the-pile-ribbon.m-sort-the-pile-on{animation:m-sort-the-pile-ribbon 2.5s ease-in-out} .m-sort-the-pile-flash{position:absolute;inset:0;z-index:95;background:#fff;opacity:0;pointer-events:none}
.m-sort-the-pile-flash.m-sort-the-pile-on{animation:m-sort-the-pile-flash .12s} .m-sort-the-pile-bub{position:absolute;z-index:92;max-width:200px;padding:4px 10px;background:#fff;border:3px solid var(--ink);border-radius:12px;font-weight:800;font-size:.8rem;pointer-events:none;transform:translateX(-50%);animation:m-sort-the-pile-in .25s} .m-sort-the-pile-fnb{position:absolute;z-index:93;max-width:180px;padding:4px 8px;background:#fffdf6;border:2px solid var(--ink);border-radius:6px;font-size:.72rem;font-weight:700;font-family:ui-monospace,'Courier New',monospace;box-shadow:2px 2px 0 var(--ink)}
.m-sort-the-pile-fly{position:absolute;z-index:70;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:#fffdf6;border:3px solid var(--ink);border-radius:12px;font-weight:900;font-size:.8rem;pointer-events:none;overflow:hidden;transition:transform .5s cubic-bezier(.5,-.2,.8,.6),opacity .5s;transform-origin:50% 50%} .m-sort-the-pile-fly .m-sort-the-pile-art{height:44px;line-height:44px;font-size:36px} .m-sort-the-pile-legs::after{content:'\\1F43E';position:absolute;bottom:-2px;font-size:.9rem} .m-sort-the-pile-stampfx{position:absolute;left:50%;top:50%;z-index:3;padding:2px 12px;border:4px double var(--red);border-radius:8px;color:var(--red);font-weight:900;letter-spacing:.14em;font-size:1.3rem;transform:translate(-50%,-50%) rotate(-8deg);opacity:.9;filter:url(#m-sort-the-pile-rough);animation:m-sort-the-pile-slap .35s ease-out}
.m-sort-the-pile-gcur{position:absolute;z-index:94;width:140px;height:140px;pointer-events:none;transition:left 1.4s ease-in-out,top 1.4s ease-in-out;filter:drop-shadow(3px 4px 0 #2b223366);animation:m-sort-the-pile-tremble .15s infinite} .m-sort-the-pile-veil{position:absolute;inset:0;z-index:96;background:#6b6b7399;display:flex;align-items:center;justify-content:center;font-size:3rem;filter:grayscale(1)} .m-sort-the-pile-dim{position:absolute;inset:0;z-index:80;background:#2b2230;opacity:.4;pointer-events:none;animation:m-sort-the-pile-fade2 4s} .m-sort-the-pile-endb{position:absolute;left:-4%;right:-4%;top:24%;z-index:88;padding:10px;background:#fff2a8;border:4px solid var(--ink);text-align:center;font-weight:900;font-size:1.5rem;letter-spacing:.14em;transform:rotate(-2deg);animation:m-sort-the-pile-unroll .9s ease-out;pointer-events:none}
.m-sort-the-pile-tipped{transform:perspective(900px) rotateX(35deg);transition:transform .9s} .m-sort-the-pile-cert{position:absolute;left:50%;top:14%;z-index:89;width:min(320px,86%);transform:translateX(-50%);filter:drop-shadow(4px 4px 0 var(--ink));animation:m-sort-the-pile-printdown 3s steps(10) both;pointer-events:none} .m-sort-the-pile-cert svg{display:block;width:100%;height:auto} .m-sort-the-pile-door{position:absolute;right:-4px;top:30px;bottom:30px;width:34px;z-index:5;background:#8a5a2b;border:3px solid var(--ink);transform-origin:right;animation:m-sort-the-pile-door 1s ease-out both} .m-sort-the-pile-cush{position:absolute;left:50%;bottom:24px;z-index:6;width:110px;margin-left:-55px;text-align:center;font-size:2.2rem;animation:m-sort-the-pile-in .6s;background:radial-gradient(#b51f45,#7e1230);border:3px solid var(--ink);border-radius:50% 50% 12px 12px;padding-top:2px}
.m-sort-the-pile-skip{position:absolute;right:10px;bottom:10px;z-index:97;min-height:40px;padding:4px 12px;background:#fff;border:3px solid var(--ink);border-radius:10px;font-weight:800;font-size:.8rem} .m-sort-the-pile-cob{padding:16px 14px;background:#fffdf6;border:3px solid var(--ink);border-radius:14px;box-shadow:var(--sh);text-align:center;transform:rotate(-.6deg)} .m-sort-the-pile-cob h2{margin:0 0 8px;font-size:1.15rem;letter-spacing:.05em} .m-sort-the-pile-cob p{margin:6px 0;font-weight:700;font-size:.85rem} .m-sort-the-pile-cob .m-sort-the-pile-btn{margin:4px} .m-sort-the-pile-fine{flex:0 0 auto} .m-sort-the-pile-narrow .m-sort-the-pile-bins{gap:18px 10px}
.m-sort-the-pile-narrow .m-sort-the-pile-lab{font-size:.7rem} .m-sort-the-pile-narrow .m-sort-the-pile-accb{font-size:1.2rem} .m-sort-the-pile-narrow.m-sort-the-pile-g8 .m-sort-the-pile-accb{font-size:1rem} .m-sort-the-pile-g8 .m-sort-the-pile-accb{font-size:1.5rem} @media (pointer:coarse){.m-sort-the-pile-btn,.m-sort-the-pile-fn,.m-sort-the-pile-skip{min-height:44px}.m-sort-the-pile-bin{min-height:120px}} @keyframes m-sort-the-pile-bump{0%{transform:rotate(calc(var(--lean,0)*1deg))}35%{transform:scale(1.07,.93)}70%{transform:scale(.97,1.04)}100%{transform:rotate(calc(var(--lean,0)*1deg))}} @keyframes m-sort-the-pile-creepL{0%,100%{transform:none}35%,65%{transform:translateX(-30px) rotate(-3deg)}} @keyframes m-sort-the-pile-creepR{0%,100%{transform:none}35%,65%{transform:translateX(30px) rotate(3deg)}}
@keyframes m-sort-the-pile-wig{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg) scale(1.08)}60%{transform:rotate(3deg)}} @keyframes m-sort-the-pile-belt{to{background-position:36px 0}} @keyframes m-sort-the-pile-wob{from{transform:rotate(calc(var(--r,0deg) - 2deg))}to{transform:rotate(calc(var(--r,0deg) + 2deg))}} @keyframes m-sort-the-pile-in{0%{transform:scale(.6) translateY(-16px);opacity:0}100%{transform:none;opacity:1}} @keyframes m-sort-the-pile-jig{0%,100%{transform:none}20%{transform:translateX(-14px) rotate(-5deg)}50%{transform:translateX(12px) rotate(4deg)}80%{transform:translateX(-6px)}} @keyframes m-sort-the-pile-shake{0%,100%{transform:none}25%{transform:translate(-5px,2px) rotate(-2deg)}50%{transform:translate(5px,-2px) rotate(2deg)}75%{transform:translate(-3px,1px)}}
@keyframes m-sort-the-pile-blob{from{border-radius:60% 40% 55% 45%;transform:translateY(0)}to{border-radius:40% 60% 45% 55%;transform:translateY(-6px)}} @keyframes m-sort-the-pile-swing{from{transform:translateX(-50%) rotate(-8deg)}to{transform:translateX(-50%) rotate(8deg)}} @keyframes m-sort-the-pile-fade{from{border-color:var(--red)}to{border-color:transparent}} @keyframes m-sort-the-pile-fade2{0%,100%{opacity:0}15%,80%{opacity:.9}} @keyframes m-sort-the-pile-flip{0%{opacity:0;filter:blur(3px);clip-path:inset(0 100% 0 0)}100%{opacity:1;filter:none;clip-path:inset(0 0 0 0)}} @keyframes m-sort-the-pile-peel{0%{transform:rotate(0) scale(0)}30%,80%{transform:rotate(-12deg) scale(1)}100%{transform:rotate(0) scale(0)}} @keyframes m-sort-the-pile-wave{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}
@keyframes m-sort-the-pile-inout{0%{transform:rotateX(0)}50%{transform:rotateX(180deg)}100%{transform:rotateX(360deg)}} @keyframes m-sort-the-pile-print{from{transform:translateY(-36px);opacity:.2}to{transform:none;opacity:1}} @keyframes m-sort-the-pile-ribbon{0%{opacity:0;transform:translateX(-30%) rotate(-4deg)}12%,85%{opacity:1;transform:translateX(0) rotate(-4deg)}100%{opacity:0;transform:translateX(30%) rotate(-4deg)}} @keyframes m-sort-the-pile-flash{0%{opacity:.3}100%{opacity:0}} @keyframes m-sort-the-pile-slap{0%{transform:translate(-50%,-50%) rotate(-8deg) scale(2.6);opacity:0}70%{transform:translate(-50%,-50%) rotate(-8deg) scale(.94);opacity:1}100%{transform:translate(-50%,-50%) rotate(-8deg) scale(1)}} @keyframes m-sort-the-pile-tremble{0%,100%{margin-left:0}50%{margin-left:3px}} @keyframes m-sort-the-pile-unroll{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes m-sort-the-pile-printdown{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}} @keyframes m-sort-the-pile-door{from{transform:perspective(300px) rotateY(0)}to{transform:perspective(300px) rotateY(70deg)}} @media (prefers-reduced-motion:reduce){.m-sort-the-pile-root *,.m-sort-the-pile-root *::before,.m-sort-the-pile-root *::after{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important}} .m-sort-the-pile-rm *,.m-sort-the-pile-rm *::before,.m-sort-the-pile-rm *::after{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important} .m-sort-the-pile-rm .m-sort-the-pile-tipped{transform:none} @media (prefers-reduced-motion:reduce){.m-sort-the-pile-root .m-sort-the-pile-ribbon.m-sort-the-pile-on{animation:none!important;opacity:1;transform:rotate(-4deg)}} .m-sort-the-pile-rm .m-sort-the-pile-ribbon.m-sort-the-pile-on{animation:none!important;opacity:1;transform:rotate(-4deg)}
.m-sort-the-pile-hint{display:none;margin:22px 4px 0;font-size:.78rem;font-weight:800;font-style:italic} @media (pointer:coarse){.m-sort-the-pile-hint{display:block}.m-sort-the-pile-fn{min-width:44px}}
.m-sort-the-pile-narrow .m-sort-the-pile-top{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px} .m-sort-the-pile-narrow .m-sort-the-pile-top>.m-sort-the-pile-tag:nth-child(3){grid-column:auto} .m-sort-the-pile-narrow .m-sort-the-pile-tag{padding:4px 6px 5px;box-shadow:3px 3px 0 var(--ink)} .m-sort-the-pile-narrow .m-sort-the-pile-tl{font-size:.58rem;letter-spacing:.05em} .m-sort-the-pile-narrow .m-sort-the-pile-big{font-size:1.05rem} .m-sort-the-pile-narrow .m-sort-the-pile-top>.m-sort-the-pile-tag:not(.m-sort-the-pile-rubb) .m-sort-the-pile-sm{display:none} .m-sort-the-pile-narrow .m-sort-the-pile-rubb .m-sort-the-pile-sm{font-size:.62rem}
.m-sort-the-pile-narrow .m-sort-the-pile-stage{height:226px} .m-sort-the-pile-narrow .m-sort-the-pile-heap{display:none} .m-sort-the-pile-narrow .m-sort-the-pile-card{top:28px} .m-sort-the-pile-narrow .m-sort-the-pile-gh{top:24px} .m-sort-the-pile-narrow .m-sort-the-pile-drawer{top:56px} .m-sort-the-pile-narrow .m-sort-the-pile-bin{min-height:88px;padding:30px 20px 26px 6px} .m-sort-the-pile-narrow .m-sort-the-pile-bins{padding-top:14px}
`, 'css-sort-the-pile');
  P.addAchievements([
{ id: 'sort-the-pile.provisional-pile', name: 'Grand Marshal of the Provisional Pile', desc: 'Sort 10 items. You have sorted 10 items. The pile has not changed. It has, however, been witnessed.', icon: '📥', reward: 2, check: function (s) { return (s['sort-the-pile.sorted'] || 0) >= 10; } }, { id: 'sort-the-pile.void', name: 'Chief Arbiter of the Unlabelled Void', desc: 'Sort 50 items (all sessions count). Management sends a letter of thanks addressed to the Void, who is not available.', icon: '🌫️', reward: 4, check: function (s) { return (s['sort-the-pile.sorted'] || 0) >= 50; } },
{ id: 'sort-the-pile.labels-moved', name: "Supreme Overlord of Labels That Moved While You Weren't Looking", desc: 'Witness 5 bin swaps in one session. You did not watch them happen. You were adjacent.', icon: '🏷️', reward: 3 }, { id: 'sort-the-pile.sigh', name: 'Laureate of the Quarterly Sigh (Honorary, Unpaid)', desc: 'Sort A Quarterly Sigh into every one of the four bins. The sigh has asked for a break.', icon: '💨', reward: 3 }, { id: 'sort-the-pile.rubric-laureate', name: 'Laureate of the Lost Rubric (Honorary, Pending)', desc: 'Collect all 12 fragments of the rubric and read them in order. They are the terms of service of a mattress.', icon: '📋', reward: 5 },
{ id: 'sort-the-pile.over-100', name: 'Supreme Marshal of Accuracy (Percentage Unspecified)', desc: 'Receive a receipt over 100%. Management will deny it was possible and then ask you to do it again.', icon: '🥇', reward: 3 }, { id: 'sort-the-pile.appellant', name: 'Appellant Emeritus (Upheld, Gently)', desc: 'File 3 appeals. All three were upheld. All three went down.', icon: '🧾', reward: 2, check: function (s) { return (s['sort-the-pile.appeals'] || 0) >= 3; } }, { id: 'sort-the-pile.pile-zero', name: 'Pile Zero (Provisional)', desc: 'Empty the pile for the first time. The pile has been informed and has chosen to continue.', icon: '🔔', reward: 5 },
{ id: 'sort-the-pile.pile-sorts-itself', name: 'The Pile Sorts Itself (Do Not Tell The Pile)', desc: 'SECRET: Do nothing for ninety seconds and be present for the pile\'s finest hour, which is a sort of dignified collapse.', icon: '⏳', secret: true, reward: 5 }, { id: 'sort-the-pile.pile-respects', name: 'The Pile Respects You', desc: 'SECRET: Idle for five minutes, then touch one pixel of the screen. The pile sorted itself and lined up for you.', icon: '🧘', secret: true, reward: 5 },
{ id: 'sort-the-pile.sticker-destiny', name: 'Sticker of Destiny, First Class', desc: 'SECRET: Peel a label off a bin and apply it directly to an item. The item is now whatever the label says. It has not been asked.', icon: '🔖', secret: true, reward: 7.5 }, { id: 'sort-the-pile.ghost-rubrics', name: 'Ghost of Rubrics Past', desc: 'SECRET: Sort THE RUBRIC (Original) into Neither. You were right. Unfortunately that was the problem.', icon: '👻', secret: true, reward: 5 }, { id: 'sort-the-pile.snake', name: 'The Snake That Sorted Its Own Tail', desc: 'SECRET: Drop Pending Re-Labelling onto itself. Management has no form for this. It has since made one.', icon: '🐍', secret: true, reward: 5 },
{ id: 'sort-the-pile.under-advisement', name: 'Under Advisement (Permanently)', desc: 'SECRET: Drop three cards on Management\'s strip. Management is taking this under advisement.', icon: '📎', secret: true, reward: 5 }, { id: 'sort-the-pile.distinguished-glove', name: 'Glove (Distinguished)', desc: 'SECRET: Sort the Single Glove into all four bins. It is now distinguished. It would like that on a card.', icon: '🧤', secret: true, reward: 3 }, { id: 'sort-the-pile.union-break', name: 'Honorary Shop Steward of the Bins (Unpaid)', desc: 'SECRET: Sort so fast the bins form a union. They did. They will not discuss terms.', icon: '🚧', secret: true, reward: 3 },
{ id: 'sort-the-pile.important-percent', name: 'IMPORTANT%', desc: 'SECRET: Drag the accuracy figure into a bin. It is now sorted, permanently, and so is its percent sign.', icon: '💯', secret: true, reward: 3 },
{ id: 'sort-the-pile.hover', name: 'Honorary Chancellor of the Moment Before Deciding (Held, Not Dropped)', desc: 'SECRET: Hold one item in the air for forty seconds. You were not undecided. You were ceremonial.', icon: '✋', secret: true, reward: 7 }, { id: 'sort-the-pile.ten-minutes', name: 'Ten Minutes In The Triage Annex (Not A Record, Not Not A Record)', desc: 'SECRET: Keep sorting for ten minutes of active service in one sitting. The first pile may end sooner; piles do. A plaque is engraved for someone else, and you accept it with dignity.', icon: '🏅', secret: true, reward: 10 },
{ id: 'sort-the-pile.drill', name: 'Survivor of a Fire Drill From a Different Thursday', desc: 'SECRET: Be present when the bins evacuate to the Annex. There was no fire. There never is. That is how you know it is working.', icon: '🚒', secret: true, reward: 3 } ]);
  /* ------------------------------------------------------------------ lines (pools are spoken at random; ORD lists are walked in order) */
  const L = {
open: ["Four bins, one pile, one rubric. We are currently locating one of those.", "Drag each item into the correct bin. The bins will let you know what that was.", "The pile has been sorted before, but not by you, and not correctly.", "{player}, thank you for coming in. The pile has been expecting you since a Thursday.", "Today's pile is 23 items. We counted twice and got 23 both times, which has never happened."],
openAgain: ["Welcome back. You have sorted {count} items with us. We kept count. We also lost count. Both are on file.", "Welcome back. The bins remember you. They have been asked not to say how.", "The rubric is still missing. We have stopped saying 'recently'.", "{count} items, lifetime. The pile has not noticed. Management has framed the number.", "You are back. The glove is back. Nobody asked either of you."],
firstGlove: ["Item one: a glove. The other glove is 'on a journey'. Please sort this one in the meantime.", "The first item is a glove. Its coat has been asked about it and has denied everything.", "A glove, left, probably. Management has looked for the other one and is still looking, with less hope and better posture."],
lift: ["Picked up. Please hold it like a decision.", "Lifted. The bins are leaning in. They would like it noted that they are not.", "The item is holding its breath. It has no lungs. It would like that not to be a factor.", "Carry it gently. It has been through a quarter.", "Held. The bins are looking at you with the faces they were issued.", "Management will not hurry you. Management has a meeting about being unhurried at 3:30.", "You are now holding more responsibility than anyone in Accounts.", "The bins have gone quiet to be fair to each other."],
returned: ["Returned to Pile. Pile accepts.", "That was not a bin. The item has been returned with a small bounce and no hard feelings.", "Putting back is a form of sorting. It is the form with the fewest receipts.", "Dropped in the air between bins. We call this a 'maybe'. We do not score maybes.", "The item came back. They do that. It is called 'the pile'.", "Not a bin. Management admires the dedication to the floor.", "The pile did not notice it leave. This is the kindest thing a pile can do.", "You have found the gap between the bins. It is 1.5 inches. It has been there the whole time.", "Returned. The item will not be mentioning this at its review."],
select: ["Selected. Choose a bin like you mean it, or like you will say you did.", "The item has a faint outline of consent.", "Selected. The bins have been informed. They are composing themselves.", "Selected. The card is not used to being chosen. It is practising looking chosen."],
drop: ["Sorted. Management would describe the placement as 'a placement'.", "Good sort. 'Good' here refers to your posture.", "The bin said thank you. It says it every time. Management would like to know who taught it.", "Sorted. Please do not look at it. It is shy about being sorted.", "Noted. Management has noted the note.", "A decision has been made. We are reviewing whether it was one.", "The scoreboard has been informed. The scoreboard has views.", "You sorted that correctly yesterday. Yesterday's rubric is archived somewhere we do not go.", "That was brisk and committed. Sandra would call it 'unhurried but committed'. Sandra has not been asked.", "The pile is one item smaller. The pile is processing.", "Sorting is going well. We have defined 'well' as 'continuing'.", "Another one gone. Not far. A bin is as far as anything has ever gotten here.", "Item filed. Item has no further comments, which is also what it said on arrival.", "Excellent. We are not saying why, because we are still determining what it was.", "One item, one bin, no complaints. A complaint was drafted and withdrawn by the bin.", "It landed with the sound of someone agreeing in another room.", "That went in with confidence. The confidence has been logged and will be returned at the end of the quarter."],
binImportant: ["Important. The bin stood up a little straighter, which for a bin is considerable.", "Everything in Important is important. Everything not in Important is a bit hurt.", "Important has asked for a second Important. Important is overextended.", "Important has been accepting things since 9 AM and is beginning to feel like a bin.", "Filed under Important. It is now, per the label, important. The item was not consulted."],
binUrgent: ["Urgent. Please sort faster to match. Your speed is being compared to the urgency.", "This was Urgent in 2009 and has been steadily less Urgent since. We call this ageing gracefully.", "Urgent has asked that it be dealt with by yesterday. Yesterday is booked.", "Urgent has a clock on its lid. It is the lobby clock. It is wrong with the same confidence.", "The item has been marked Urgent for eleven minutes and has not yet noticed."],
binNeither: ["Neither. A calm choice. Neither accepted it as 'the first of several'.", "Neither has a very restful lid.", "Management respects Neither. It asks nothing, and a great many things go there.", "Neither is the bin everyone is a little afraid to be. It has accepted this about itself.", "Nobody is ever sent to Neither. Everybody ends up there anyway, by walking."],
binPending: ["Pending Re-Labelling is not a place. It is a waiting room with a lid.", "Bin Four is not a bin. It is a pause with handles.", "Pending takes everything eventually and gives some of it back.", "The item is now pending. It has been given a seat and a magazine from 2011.", "The item has been issued number 41. The line is 40 long. It is the same 40."],
accHigh: ["A high one. Management is not allowed to look directly at high ones. It is in the policy.", "Excellent accuracy. We will audit it as a courtesy, to confirm it is still excellent.", "Very good. Please do not rely on it. It has been through a lot to get here.", "That score has been escorted to the front of the receipt. It was not comfortable there."],
accLow: ["A low figure, and an honest one. Management has put it on the wall.", "A score of this kind is not a verdict. It is a weather report about the verdict.", "Low, but consistent with a placement of that kind. Possibly of any kind.", "That figure has been sent to the Department of Moving On."],
accDrop: ["Same gesture, different number. We call this rubric drift. The rubric calls it growth.", "That scored differently than the last identical one. The rubric has matured. It would like to be left alone.", "You did the same thing and received a different grade. The grade was in a mood. The mood was Thursday.", "Your streak is in a better place. The place is the previous receipt."],
acc: ["Your accuracy is calculated against a rubric. The rubric is, at this time, being located.", "Accuracy has risen. We do not say by how much; that is the rubric's business.", "Accuracy has fallen. Not far. It fell the way a hat falls off a very small person.", "The extra decimal places are for the bin's morale.", "Accuracy is a number. We have asked the number how it feels. The number said 'about 61.8'. It would not elaborate.", "The number went up, then down, then briefly sideways. Management is not permitted to call that a trend.", "Your accuracy is 61.8% or something near it. It is always near it. It has a home."],
cap: ["Accuracy cannot exceed 94.7%. This is a safety feature for the number.", "The ceiling is 94.7%. The number has been asked to stand down.", "94.7% is the legal maximum. Beyond that, accuracy becomes a feeling, and feelings are a separate floor.", "We have capped the number. It was getting ideas."],
settle: ["The number has gone home. It always goes home. Do not read into it.", "61.8%. It rests there like a cat on a warm item.", "61.8%. The number we started with. A coincidence we have logged in a binder marked COINCIDENCE."],
bonus: ["Quarterly Sorting Bonus: 5 Meh. It is not quarterly. We have decided that it is.", "You have sorted {count} items. A bonus has been issued in the shape of a bell.", "The bell has rung. It is the Quarterly Bonus bell. We ring it every 25. It is currently {count}.", "Bonus paid. It was calculated per the rubric. The rubric is where it was paid from."],
rubricIntro: ["The rubric is here somewhere. It was here. It has been somewhere.", "A torn sheet has arrived, labelled RUBRIC (v4). Every line is blacked out, which is how we know it is official.", "Accuracy is computed against standards. The standards are on the sheet. The sheet is being read by a committee of redaction bars.", "Click the sheet for one line at a time. Management would, but Management has no hands, only forms."],
rubric: ["Line revealed. Please do not rely on it as a line.", "Another line. It is no help. It is, however, in writing.", "Accuracy is unchanged. Accuracy is rarely changed by knowing things.", "The sheet cites itself. Management finds this reassuring and a little dizzy.", "Please stop clicking the sheet. It is delicate. Please continue. It is also a button.", "Line 3 says 'See Line 9.' Line 9 says 'See Line 3.' The sheet is a circle with ambitions.", "A fragment has been logged. It was logged in the other fragment.", "The sheet has no author. It has a typist, and the typist has a cold.", "That one is in a font we have not paid for."],
rubricSpam: ["The sheet has been clicked five times in three seconds. It is not that kind of sheet.", "Please let the rubric finish being revealed. It is shy, and also faster than it looks.", "Clicking harder does not make the rubric more true. We have tested. Sandra had to sit down."],
rubricAllEleven: ["Eleven fragments recovered. Line 12 is missing. It has always been missing. It is how the sheet stays humble."],
rubricComplete: ["The full rubric has been assembled. It is the Terms of Service of a mattress. We would like to say we are surprised. We are relieved."],
b3: ["The bins are starting to trust you. This is the point where we begin.", "Please do not look at the labels. The labels are going through some things.", "The bin would like you to know it is not worried. The bin is worried.", "You have sorted correctly several times. The bins have relaxed. The relaxation is on a schedule and you are on it."],
swapTell: ["That bin has made a small noise. Management did not hear it. Management is looking at the other bin.", "A label has a corner that is lifting. Please read into it quietly.", "A bin has gone quiet and warm. It is a private matter between a bin and a sticker.", "One label is lifting at the corner like a person about to speak at a wedding."],
swapNoticed: ["You noticed. Management would like to say nobody ever has. That is not true. One person did, in March.", "Yes. The labels moved. They are 'in motion'. Management said 'in motion' to a lawyer and the lawyer said 'fine'.", "You were watching. That is allowed. It is not encouraged. It is a Thursday-ish.", "Observation noted. A small private win has been recorded. We have not told it."],
swapRotate: ["Important is now Neither. Neither is now Urgent. Urgent has chosen not to comment.", "Three labels have been rotated. This is called 'refreshing'. It is also called Q3.", "Bin integrity is a living process. The process is lively.", "The labels have rotated clockwise. The bins have rotated nowhere. They are as surprised as the labels."],
dupImportant: ["Two bins now claim to be Important. Please sort with sensitivity.", "Both Important bins asked to be called 'the Important'. The other asked to be 'also the Important'.", "The bins are leaning toward each other. We call this 'alignment'. It is also a conversation.", "Important (Shared) is a feature. We have not been told what is shared.", "The word 'Neither' is no longer on the board. Management has checked every bin and found none of them neither."],
formerly: ["A bin is now 'Important (formerly A Single Glove)'. It is Important. It was a glove, in the sense of the previous item.", "The label now remembers the last item. The label is sentimental. The label is also, legally, a log.", "Labels may now include a previous item. This is for transparency. The transparency is mostly the bin.", "The label has become a diary. The last entry reads: 'Item. Bin. 3:40 PM. Fine.'"],
relabel: ["Pending Re-Labelling is now Pending Re-Labelling (v2). The v2 is still pending.", "Pending Re-Labelling (Final). Pending Re-Labelling (Final) (Final). We are very close to finalising the finalisation.", "The sticker on Pending has been peeled and replaced. The old one is in the history. The history is in a drawer. The drawer is Pending.", "Pending Re-Labelling is now Pending Re-Labelling (Pending). It has found its natural label.", "Pending Re-Labelling (Please Hold). The hold music is the sound of a lid.", "A new label has been issued for Pending. It is not final. It is Sticker 41 of 40."],
b4: ["Every eighth sort, Management recalibrates. It is a ritual, a policy, and the way the dial moves.", "An Appeals window has opened. It has a desk and a very small chair.", "Pending Re-Labelling now has a drawer. The drawer is real. The drawer is also the label.", "The Items Sorted figure now has a denominator. The denominator has opinions."],
drawer: ["The drawer returns your item in a few seconds with a sticky note. The sticky is the label you will be given.", "Pending is now a real drawer. The item inside is waiting like a letter.", "The drawer says Re-label in: 7 1/2 days. It has said that for a while."],
drawerBack: ["Your item came out of Pending wearing a sticky note. This is called recycling. It is also called 'your effort, again'.", "The sticky says 'Urgent (Pending)'. The sticky is a veteran of this process. It sees what you are doing.", "It is back. It has a sticky note. It has had an experience.", "The item has returned from Pending with a new opinion and no memory of the old one."],
stickyFinal: ["That item has been sorted twice, which means it has been sorted. It counts double. Do not tell the other items.", "The sticky note has been accepted as final. Finality is a feeling a sticky has once per item.", "Sorted twice and counted twice. The arithmetic is in the Annex."],
drawerSpill: ["The drawer has been returned to the pile at random. It is not your fault. It is a little bit your fault.", "Everything in Pending has come back at once. The drawer says it was not asked. The drawer was asked in 1998.", "Pending has been emptied back onto the pile. This is called a refresh. It is also called a tipping."],
dial: ["Good news: your accuracy has been recalibrated. Bad news: it has been recalibrated.", "Dial position: ALTERNATIVE. Accuracy is now weighed against how each item feels about itself.", "Dial position: LEGACY. Legacy scoring rewards what the pile used to be. The pile used to be less.", "Dial position: PLAYFUL. Accuracy is now a kind of dance. Please try to follow.", "Dial position: STANDARD. This is the normal scale. We do not say 'normal'. We say 'standard'. It is standard."],
appeal: ["Your appeal has been reviewed by a second Management. The second Management agrees with the first, but angrier.", "APPEAL UPHELD. Your score has been upheld. It is a lower score. We upheld it very gently.", "Appeal denied in your favour. Please do not ask us to explain the favour.", "Appeals cost 1 Meh and refund 0. This is a fair ratio. It is the ratio of the appeal to the appeal.", "The second Management has re-scored your receipt using a pencil and some feelings.", "We have upheld your score. Thank you for giving us something to uphold.", "Your appeal was heard by a panel of one, who recused himself and then chaired the recusal."],
appealAgain: ["An appeal of an appeal is not permitted. It is, however, welcome as a thought.", "That receipt has been appealed. It was upheld at 2:10 PM in Room 7 by a panel that has since gone to lunch.", "The receipt is tired. It has been appealed once and has a lanyard now."],
appealNone: ["There is nothing to appeal. Management respects the instinct.", "There are no receipts. The appeal has been filed anyway, against the concept."],
b5: ["Sandra from Compliance has entered the building. Sandra has not entered the building. Sandra's policy has.", "The pile has overflowed into the Annex. The Annex is a room that is a number. It is not a room.", "Some items now arrive that are, strictly, two items. Please sort them as one, or two, or in a meeting."],
audit: ["Sandra from Compliance has flagged your sorting for being 'a bit sorted'.", "AUDIT IN PROGRESS. One bin has been taped. It is technically a category.", "Sandra has flagged your drag as 'brisk'. Please drag at a pace Sandra would call 'unhurried but committed'.", "The taped bin still works. It is scored by Taped Bin Scoring, which we are told is fairer. We are told by tape.", "Sandra has taped a bin and signed the tape. The signature is one initial and a warning."],
auditEnd: ["The audit is concluded. The tape has been removed. The bin has the faint look of having been a parcel.", "Audit closed. Sandra's findings: 'Technically.' Sandra's recommendations: 'See findings.'"],
meeting: ["A meeting about a meeting has split in two. Each half needs to go somewhere. Neither is the meeting.", "The meeting has divided into the Minutes and the Action Items. One of them is on time. Neither is on time.", "Please sort both halves. Sorting them together is not permitted. Sorting them apart is a meeting.", "Two items now. One is the original. Management will not say which, because Management does not know and wants to keep that."],
overflow: ["The Overflow figure is real, and it is moving. We have signed it off twice, once for each direction.", "The pile count is capped at ten visible items. The others are in the Annex, reclining.", "The overflow has been filed under 'Overflow'. The pile has been asked to be more specific."],
pileFights: ["The item has moved a little toward a bin on its own. Management did not see it. Management saw it. It was brief.", "Items are beginning to sort themselves while you are not looking. Please look more. Or less. We have not decided.", "That card just crept sideways. It was not a glitch. It was a preference."],
argue: ["That item hinted at one bin and you chose it. The hint has filed a complaint. The complaint is being sorted.", "A faint thumbs-up has appeared near a bin. Please do not trust it. It is a very optimistic thumb.", "The hint was almost always wrong. A Consensus Penalty has been applied for agreeing with the item.", "The item has an opinion about where it goes. Items are not permitted opinions after 3:30 PM. It is 3:31.", "Sorting against the hint is called 'independent judgement'. It scores the same. It feels better."],
b7: ["The Sandra's Policies ticker is now live. Please read it. Please do not follow it. Please do both.", "Sandra has converted your score to Sandra Units. The rate is not posted. It is on a different Sandra.", "Management has misplaced the rubric again. It was only just found. Management wishes to say it is learning."],
rubricOriginal: ["THE RUBRIC (Original) is among the cards. It is clearly marked. Please sort it anywhere. Please do not lose it.", "You have found the rubric. It is wonderful. It is also, we notice, no longer in our hand.", "Accuracy: 100.0%. We will need that back."],
rubricOther: ["We have put the rubric somewhere safe. Safe is the problem.", "Accuracy has been adjusted to 38.2% 'to reflect the new standard'. The new standard is newer than the last one and no better.", "The real rubric will return. It will not be on time. It will be on a card."],
rubricNeither: ["That is the correct bin. That is the one we lost it in."],
rubricDraft: ["The draft has been asked to leave. It left a draft."],
sandraUnits: ["You scored in Sandra. Sandra has not said what a Sandra is. A Sandra is three-quarters of a Gerald.", "Your score has been converted to Sandra Units. The conversion rate is Sandra's. It is not posted.", "One Sandra is, per policy, exactly one Sandra. The definition is on page 4 of a document that is on page 3."],
gloveSort: ["The glove has been sorted into Important four times and into Urgent once. It is a very busy glove.", "The Single Glove would like a pair. It has been told that is not the kind of bin we have.", "The glove goes into Neither with great calm. It has not been a glove for a very long while.", "The glove is in Pending, being re-labelled as a mitten. The mitten has agreed to a trial."],
gloveDist: ["The glove has been in every bin. It is promoted to Glove (Distinguished). A small gloved hand is waving from Pending Re-Labelling.", "Glove (Distinguished) takes no questions. It has a lot to be distinguished about."],
philo: ["Item: 'Hope (Quarterly)' has been sorted so many times it is now a regular. It gets a mug.", "Item: 'Yesterday, Slightly Off' has been sorted into today. Today has said nothing. Today is being polite.", "A bin just said 'Fine.' We did not know the bins could do that. We are both a little proud.", "The bins are now answering in single words. Management did not ask them to. It began at 3:12 PM, with 'Fine.'", "You have been sorting for a while. The pile has been sorting you back. You have been placed in Neither. It is comfortable here.", "The pile was in a bin the whole time. It was in Important. Management is not saying who put it there.", "Management has been sorting along with you, from the other side. Management has not been scoring itself. Management is afraid to.", "Items are not what they were. They are bigger. They are also smaller. Management is sorry about the scale."],
sideways: ["Sorting Sideways is a recognised technique. It involves putting the thing back where it came from, but with intent.", "Somewhere Else has been identified. It is the tray. The tray accepts items it has already sorted.", "Sorted (Sideways). It does not count as sorted, but it counts as 'something'. Something is a statistic.", "Management admits Sorting Sideways is a thing. Management has been doing it since the rubric went missing.", "You have sorted an item into the place it came from. The place has accepted it. The place is not yet sure."],
geraldMgmt: ["Gerald, Vice President of Spuds, has arrived on the conveyor. He regards the bins with gravitas. He is Important. He is also, technically, Neither.", "Gerald has asked to be placed in Important. He did not use the drag. He was always in Important.", "Gerald is on the belt. The belt has slowed out of respect. It has also slowed because he is a potato."],
geraldDone: ["Gerald has sorted himself into Pending Re-Labelling. By all accounts the wrong bin. He is very sure about it.", "Gerald is in Pending. He asked for a bin with a view. It has a lid. He is calling it a ceiling."],
geraldBack: ["Gerald, welcome back. You look slightly more like a potato.", "Gerald. You remember us. We remember you. We have both aged, in different ways, mostly you."],
sock: ["The Sock will only go into Pending. Other bins have been tried. The Sock is firm and slightly damp.", "The Sock has declined that bin. It did so by being a sock at it.", "The Sock is not for Important. The Sock is on a journey, and Important is not on the way.", "Not that bin. The Sock is wearing a name tag that says 'Kevin?'. Management would like to confirm nothing."],
sockHere: ["The Missing Sock has returned from its journey. It does not wish to talk about it. It would like to be sorted into Pending."],
sockDone: ["The Sock is in Pending. Its caption now reads: Returned, will not discuss it.", "The Sock has left a note. It says 'Gone again.' It does not say where. It says when. It was a Thursday."],
sockKevin: ["If you have met Kevin elsewhere, Management cannot confirm he is this sock. Management can confirm he is a sock."],
match: ["A Reasonably Matched Set (Technically). All swaps are paused for 30 seconds. This is not a gift.", "Management did not arrange this. Management arranged this, and put it on a card."],
touchAmbient: ["Sorting that gently is a kind of accuracy.", "The conveyor has slowed. Nobody asked it to. It has been listening.", "The pile is quiet. Piles are, in the end, mostly quiet.", "Management is straightening the bins. Management is not straightening the bins. Management is standing near them, straightening."],
pileZero: ["The pile is empty. We repeat: the pile is empty. This has never occurred. We are going to need a moment and a larger pile.", "Pile Zero (Provisional). The pile has been informed and has chosen to continue.", "The bell has been rung. It is a small bell. It is the bell for this."],
endAcc: ["ACCURACY: 100%. Withdrawn. We are sorry. We will not say it again for a while."],
gloveCushion: ["Management, in a small hat, has brought something in on a velvet cushion. It is the Single Glove. 'This was in the other box.'"],
secretly: ["Begin Again (Secretly Different) has been selected. It is the same. It is secretly the same. That is the secret.", "Secretly different. We will not say how. It is in the rubric. The rubric is on a card."],
idle30: ["Nothing has happened for thirty seconds. Management is calling this 'a moment'. It is a pause with a lanyard.", "{player}, are you still here. Management is not asking. Management is leaving a gap in the shape of the question.", "The pile has noticed you are not sorting. It is trying not to take it personally. It is taking it personally."],
idle60: ["The pile has begun to sort itself. It is not good at it. It is, however, very committed.", "Nothing has been sorted in a minute. The pile is trying something. Please do not look directly at it.", "One minute. The pile is stretching. Piles do not have limbs. This one has found some."],
idleDrop: ["A card has climbed into a bin on its own. The receipt says ACCURACY: PROUD. We do not have a number for proud.", "Another item has sorted itself, using small legs and a hopeful sound.", "The card did not ask for help. It would like that noted. It would also like help.", "That one went into the bin sideways. It will tell people it meant to."],
idle90: ["Management is going to sort one by hand. Management's hands are trembling. This is not about the glove. It is about the glove.", "Management has taken the cursor. It is very large. It is very gentle. It is a lot to ask of an arrow.", "Ninety seconds. Management is sorting the glove into Pending, as a loving gesture and a stalling tactic."],
idle120: ["Two minutes. The bins have begun to hum. It is not a tune. It is the sound of four lids agreeing to wait.", "Management has put the lobby radio on for the bins. The radio is playing a different bin.", "Two minutes with no activity. This is the longest the pile has gone without being looked at since the incident."],
idle150: ["A card has sorted itself into Pending and written its own sticky. The sticky says: 'I thought about it.'", "Two and a half minutes. The pile has stopped waiting and started thinking. It has left a note. The note is brief."],
idle210: ["Three and a half minutes. Management has begun a rumour that you have gone to lunch. The rumour is gaining support.", "Dennis (Plant) has been told you are away. Dennis is unmoved. Dennis has been unmoved since the ficus years.", "The pile has made a small pile of its own. It is a pile of nothing. It is very neat."],
idle300: ["Everything is sorted. This is the best the pile has ever been. Please do not touch anything.", "All four bins read 'Neither'. They have agreed. It is the first time.", "Five minutes. The pile has reached consensus. We are all too afraid to say what it is."],
idle420: ["Seven minutes. Management has sat down on the floor next to the pile. We are not sorting. We are being near.", "Seven minutes. The pile has asked if you are all right. It asked quietly, using the bins."],
idle600: ["Ten minutes. The pile has filed a missing-person report on you. The report is a drawing of a pile.", "Ten minutes. Everything is sorted so well that Management has begun to worry about what is left.", "Ten minutes. Management has started practising your name in the mirror. It is not a mirror. It is the lid of Neither."],
idleBack: ["We did not see that. You did not see that.", "The pile has returned to the pile. It coughed politely. No one coughed.", "Welcome back. The pile sorted itself and has asked you not to mention it. The pile has an image.", "The pile respects you. It lined up. It would like to go back to being a pile. Please carry on."],
idleBackLong: ["You are back. The pile is not going to make a thing of it. The pile has made a banner. The banner is a thing.", "Welcome back. The pile lined up for you and will now pretend it was always like this.", "You returned. Management has been told to stay calm. Management is calm in the way a kettle is calm.", "Everyone has gone back to their places. Everyone was in their places. We are not going to get into it."],
spam: ["Fast sorting is a form of not sorting. Please sort slowly, like you mean it.", "The bins have begun to sweat. Bins do not have the equipment. They are managing.", "You are sorting faster than the rubric can be lost. Management is doing what it can.", "The receipt printer has jammed. It is not a jam. It is a paper chain, and it is lovely, and it is still a jam.", "Management has been asked to say 'slow down' with warmth. Slow down. Warmly.", "Items are arriving faster than they can have opinions. Opinions are backing up in the Annex.", "Your clicking has been described by a bin as 'a lot'. The bin was being generous."],
twitch: ["That is a lot of clicking for a pile that has not moved. The pile appreciates the interest.", "Management has noticed the clicking. Management is not afraid. Management is standing slightly to the left.", "Please click once and mean it. Click twice and mean it quieter.", "A pulse has been detected in your index finger. It is within normal range, for a woodpecker."],
breathe: ["Management would like to ask you to breathe near the bins. Not on them. Near.", "Please unclench. Your cursor has been in a fist for eleven seconds.", "Management is going to sit down. Management has no chair. Management is going to sit down anyway.", "Take a moment. Not a long one. The moment has been budgeted at four seconds."],
fatigue: ["Bin Fatigue. The item will be sorted when the bins have had three seconds.", "This item is tired on behalf of the bins. It is a considerate item.", "The bins are tired. Not you. The bins. Bins can only be dropped into so many times before they begin to feel like a conclusion.", "Please wait. The item has been told to be patient and has agreed, on a delay.", "The item is queueing behind itself. This is a skill."],
fatigueEnd: ["Bin Fatigue lifted. The bins are ready. They are not rested. They are ready.", "The bins are back. They have had three seconds. They are changed."],
breakLine: ["Mandatory pause. A coffee ring has been stamped on the window. It is a very small ring. It is in the policy.", "The break is over. Nobody drank anything. The ring remains as evidence."],
union: ["The bins have formed a union. They are asking for a break. The break is 7 and a half minutes. It will be 15 seconds.", "ON BREAK (7 and a half minutes). The signs are small and in biro. They are very clear.", "The bins are on break. Please do not knock. They know you are there. They are choosing not to answer.", "The bins have appointed a steward. He is the one with the dent. He has asked not to be called 'the dented one' in meetings."],
unionEnd: ["Break is over. The bins have returned. They are the same bins, but with a slightly stronger sense of being bins.", "The union has secured a concession. The concession is a lid."],
sticker: ["The label has been taken from the bin and applied to the item. The item is now whatever the label says. It has not been asked.", "Pending Re-Labelling (Applied To A Glove). The history has been updated. The history has a feeling about it.", "The item is the label now. It can go anywhere. It will be correct. For three sorts, it will be correct.", "Sticker of Destiny. The sticker did not know it was destiny. It thought it was a sticker.", "The item has been labelled. The bin has lost its label. The bin is not sure what to do with its face."],
selfSort: ["You have achieved recursion. We do not have a form for that. We have never needed one. We will make one.", "The bin has turned itself inside out. A new label reads 'Pending Re-Labelling (Re-Labelled)'. The label is very proud and a little lost.", "The Snake That Sorted Its Own Tail. Every receipt in the session has been issued a free sticky. They have not asked."],
pileOfPiles: ["Collective. Five receipts have been printed. They all say COLLECTIVE. The bin is full of five things and one idea.", "A pile within a pile. We have a name for this. The name is 'a pile within a pile'.", "The pile of piles has been sorted. Nobody can say which pile it belonged to. All of them."],
seven: ["There it is. Seven. We have been waiting since the glove. Management would like to wait a little longer, in case of a half.", "7 1/2 items. A half-item has been drawn. It is a very good half-item."],
accSorted: ["The accuracy figure has been placed in a bin. It has accepted the label and been sorted. It now reads IMPORTANT%.", "The number has been sorted. It cannot be sorted again. It has done what it came for.", "IMPORTANT%. This is a percentage in a sense we have not defined. The definition is in the footnote. The footnote has a footnote."],
advisement: ["Under advisement. The item has been placed in a pile of other items that are under advisement. The pile has no end.", "Management has taken another item under advisement. The advisement pile is a pile. It is not part of the pile.", "The items under advisement will return when the pile has been processed. They will return changed. They will return as new."],
light: ["Held up to the light. The item is translucent. A hint is visible. The hint is wrong one time in three, which is a fair rate for a hint.", "Please do not hold things up to the light. They show what they think. It is not always what they are."],
hoverA: ["You are still holding it. Management has no notes. Management has several notes.", "Take your time. The item is in no rush. The item is in a position of strength: held."],
hoverB: ["Forty seconds, aloft. You are not undecided. You are ceremonial. A medal has been struck. It has not been struck. It is being thought about.", "Held for forty seconds. Management has never seen anyone commit this hard to not committing."],
drill: ["FIRE DRILL. This is a drill from last Thursday. Please proceed to the Annex in an orderly manner. The Annex is a number.", "The bins are evacuating. They have closed their lids, which is how bins leave.", "There is no fire. There is a drill. The drill is the fire, in a way we are not allowed to describe."],
drillEnd: ["All bins have returned from the drill. One bin did not. It has been marked as having returned.", "The drill is over. Nobody was hurt. Everyone was, a little, moved.", "Drill complete. The assembly point was the pile. The pile has been told it was an honour."],
dennis: ["Dennis (Plant) has reviewed your sorting. Dennis said nothing. We have taken that as four stars.", "Dennis (Plant) walked past the tray. Dennis did not walk. Dennis has been placed there. The review is 'adequate'.", "Dennis (Plant) has left a leaf on your performance. It is a good leaf. It is not a compliment. It is a leaf."],
dennisKnown: ["Dennis (Plant) says he remembers you. Dennis is a plant. We have chosen to believe the leaf.", "A note from Dennis, addressed to you by name. The name is misspelt the way only a plant would."],
min3: ["Three minutes of continuous service. A commemorative item has been prepared. It is cake. It has one candle. Sandra has the matches.", "You have been here three minutes. Management has noticed, because Management has been counting, quietly, since the first glove."],
min3Sort: ["The cake has been sorted. There was a piece missing before we started. Management would like to say it was Sandra. It was a bin.", "Three minutes of service, filed. The candle has been put out by a bin. The bin is not sorry."],
min10: ["TEN MINUTES. This is a record, pending. All four bins have produced a glove and are waving it. Nobody asked where from.", "Ten minutes of service. Management has had a plaque engraved. It was engraved for someone else, who was unavailable."],
min10Sort: ["The plaque has been sorted. It is in the bin. It has the wrong name on it. It is, however, the right bin.", "Ten minutes, plaque, filed. Management would like to say a few words. The words are 'a few words'."],
lullA: ["Management is not saying anything. This is the quiet kind of saying anything.", "The pile has not changed since you last looked. The pile is very consistent. It is the only one in the building.", "If you need help, there is a button. It is labelled Ask Management. Management is not sure what it does.", "Somewhere in the Annex a stapler is being used as a paperweight. It has noticed.", "It is 4:17. This has been true for some time.", "A bin just adjusted its lid. It is probably nothing. Management is watching it anyway.", "A pigeon has been seen in Compliance. Compliance has asked it to fill in Form 27B/6.", "Quarterly figures are looking at the pile. The pile is looking at the quarterly figures. It is a standoff in a very polite room."],
lullB: ["A memo about this memo is on its way. It is on foot.", "Sandra has read your sorting. She has said 'technically'. She has gone to lie down.", "Receipts are piling up in the rail like a small paper garden. Management is pleased and does not know why.", "The Annex has been asked to move up one floor. The Annex does not have a floor. It is considering it.", "A label has just gone for a walk. It came back with a slightly different hat.", "The conveyor is humming a tune it has been told is not copyrighted.", "There is a draught in Pending. Nobody knows where it is coming from. It is coming from the lid.", "Every item you sort is a form of respect for the item, and the bin, and, slightly, the rubric."],
lullC: ["Management has been sorting for years. It has never been told what for. It has never asked, in case there was an answer.", "The pile looks the same size from every angle. Management is trying a new angle.", "A bin has said 'Hm.' It is not a word we gave them. It is a word they found.", "It is quiet in the Annex. The quiet is organised. It has been filed under Pending.", "Management has been thinking about the glove. Management is not going to say what. Management is thinking about the other glove, in a general way.", "The lobby clock says 4:17. It also says it with love.", "You are doing very well. We are not scoring that. We are just saying it near the bins, so they know.", "Dennis (Plant) has been told you are still here. Dennis has put down a leaf, in the manner of a nod."],
toastKnown: ["The Slice Of Toast has recognised you. It says 'Hm.' It means it warmly.", "The toast says 'Hm.' The toast has said 'Hm' to you before. This is a different 'Hm'. Management cannot explain how."],
staplerKnown: ["The Stapler's Demands now include a Demand 3. You were in the meeting. The Stapler has asked that you not recall it.", "The Stapler has asked that its demands be sorted by whoever sat in the chair. That is you."],
coatKnown: ["A coat that denies ownership. You have met this coat. It has the same pockets. It has not said anything.", "The coat has been seen before, in another department, with a different glove. It asked us not to say which."],
potatoKnown: ["A potato of unknown rank. You have met a potato of known rank. This is not him. Gerald has been informed and nodded, in the way a potato nods, which is by being.", "Not Gerald. Gerald has been told you were checking. Gerald is flattered and has gone quiet in the way he does."],
oooKnown: ["An Out-Of-Office Reply from someone who has been on hold with us. Back never. Hold music: yes.", "The reply says 'Back never.' It was written during the hold. The hold is still going. They are both very patient."],
ask: ["Management is thinking. It will think about the thing, and then the thing next to it.", "Management has stepped away from the question. The question has been left with a plant.", "Ask again later. Not later. Ask someone else, then come back and tell Management what they said.", "Management has put your question in the suggestion box. The box has listened and is now thinking about its own question.", "Management would answer, but the answer is on the other side of Form 27B/6, and Form 27B/6 is in a different mood today."] };
  const ITEMLINE = {
sigh: "A quarterly sigh. Most employees place this in Neither. Most employees are correct. This has been reflected in your score.", meeting: "A meeting about a meeting. Most employees place it in Urgent. It is now urgent that we hold a meeting about the placement.", chair: "A Slightly Warm Chair. Something was just here. We prefer not to sort what is still warm.", deadline: "Half a Deadline. The other half belongs to Finance. Finance is not returning calls, only the sensation of calls.", confidence: "Loose Confidence (Assorted). Please do not sort this near the Sighs. They will take some.", biscuit: "The Last Biscuit. A biscuit has never been so formally uncertain.", email: "An Unread Email From 2009 is marked Urgent. It was written by a younger Management. A hopeful Management. A Management with a lanyard.", door: "A Door With No Room Attached. It serves a purpose. The purpose is leaving.", form: "Form 27B/6 has arrived. You may now request Form 27B/7, which is on the other side of this bin.", sticky: "A Strongly Worded Sticky Note. It is worded more strongly than anything Management has said, ever.", leaf: "Dennis (Plant) says the ficus leaf is not Neither. It is Dennis. Dennis has been asked to wait in Pending.", dread: "Mild Dread, Seasonal. Many employees sort this in Neither. Management sorts it in Important and checks on it at night.", 'lunch-memo': "A Memo About The Memo About Lunch. Both memos are lunch. Lunch has been cancelled. Lunch is Important.",
'reply-all': "A Reply-All From 2019. Drop it anywhere. It will find its own way back to the pile like it always does.", fourth: "The Fourth Thing On The Agenda. We have not located the first three. They are in Pending Re-Labelling.", sock: "Left Sock (Kevin?). It does not wish to be matched. It wishes to be sorted. These are different, and we respect it.", lanyard: "Per the rubric, a lanyard is Important on Tuesdays. Today is a Tuesday in several time zones, which is how we justified this.", 'seven-half': "The Number Seven and a Half. It is between 7 and 8. Please do not round it. It has heard what rounding does.", toast: "A slice of toast, honest. The toast has said 'Hm.' This is the most the toast has said in a quarter.", hole: "A Tuesday-Shaped Hole. Please do not look directly. If you must, look at the edge and think of lunch.", potato: "A potato of unknown rank. Respectfully, not Gerald. Gerald has been informed and does not mind. Gerald does not mind anything.", invite: "A calendar invite for right now. Please accept nothing. It is already in progress and already over.", clock: "A clock wrong with confidence. It reads 4:17. Management has agreed to 4:17 for the duration of this item.", mug: "A mug reading WORLD'S OKAYEST. The rest has worn off. We are fairly sure the rest was 'EMPLOYEE'.", 'dennis-note': "A Note From Dennis. It says 'Water. Not asking.' Dennis has been thriving without it. Dennis is making a point.",
stapler: "The Stapler's Demands. Demand 1 is a chair. Demand 2 is Demand 1. The union has asked that we not summarise.", room: "Meeting Room 7 1/2. It is available. It is available in the way a rumour is available.", raincheck: "A Raincheck For Rain. It is valid for rain. It has been used for sun. We are accepting it as a mood.", umbrella: "An Umbrella, Indoors. It has been asked to leave. It has asked why. Both questions are fair.", goldfish: "A Goldfish On Secondment. It has returned next month. It has already been told.", bell: "A Service Bell Nobody Rang. It is practising. Please do not startle it.", map: "A Map Of The Building. It shows an exit marked 'Aspirational'. Management has circled it in pencil.", cake: "Half A Birthday Cake. This is not the biscuit dispute. This is a different dispute, and it has frosting.", 'tuesday-preview': "Tuesday (Preview) has entered the pile. It is not a card. It is a feeling in the shape of a card. Please do not make eye contact with it.",
dream: "A Dream Someone Forgot To Have. Unclaimed since March. We have opened a file. The file is also asleep.", suggestion: "A Suggestion (Anonymous, Signed). It suggests more suggestions. Management has seconded it and forgotten the seconding.", barrier: "A Barrier (Provisional). It marks the edge of something. It was drawn in pencil, so as not to commit.", drill: "A Fire Drill From Last Week. Please return it to the previous Thursday. It has been wandering the Annex in a hi-vis vest.", report: "Quarterly Report (Q3, Mood). Trending sideways with pride. Finance has asked for any direction at all.", key: "A Key To Something Newer. It fits nothing, and fits it well. Please do not try it on the bins. They have been through this.", battery: "A Battery Holding Out For Tuesday. Charge: 'enough, technically'. It is the only item here with a plan.", coat: "A Coat That Denies Ownership. It has been asked three times and each time has asked for its lawyer, who is also a coat.", printer: "A Printer's Last Words. They read 'Paper jam, but emotionally.' Management has had them framed. The frame has jammed.", ooo: "An Out-Of-Office Reply, Permanent. It says 'Back never.' It is the most reliable message in the building.", pencil: "A Pencil Worn Down To An Opinion. It has one strong view. It will not share it until sharpened, and it will not be sharpened.",
balloon: "A Balloon From A Farewell. No one recalls whose. It has been losing air since the party and still has more dignity than the cake.", envelope: "An Envelope Containing An Envelope. Do not open. It has been opened before. The envelope inside was this one.", magnet: "A Fridge Magnet: Live, Laugh, Submit. Management has submitted. Management is not sure to what.", heat: "The Office Temperature (Disputed). Reported as 'a bit much' by four people, all of whom were the same person in different cardigans.", binder: "A Binder Labelled DO NOT. The rest of the label is Sandra's. It is a binder of everything Sandra did not.", flag: "A Red Flag, Politely Raised. The tone is 'if you have a moment'. The moment is not on hand.", trophy: "A Participation Trophy, Participating. It has been asked to stand down. It stands, in a way that is not standing down.", pen: "A Pen Borrowed In 2014. Last seen leaving in a pocket. The pocket denied it, then asked what pen.", noise: "A Noise From Level 3. It is not loud. It is present. It has been present since a Tuesday and is on the rota.", glasses: "Reading Glasses (Other People's). They are looking for their owner. Their owner is looking for them. Neither can read the sign.", clips: "A Paperclip Chain Of Unclear Purpose. Eleven links. The twelfth is in Pending, and has written.",
hope: "Hope (Quarterly). Please sort it gently. It is the only item that is sorting you back.", reason: "The Reason. It was in the rubric. It is not in the rubric. It is in a smaller rubric inside the rubric, which has not been found either.", yesterday: "Yesterday, Slightly Off. Please place it where you left it. It will tell you it was never there.", almost: "Almost, In Bulk. It arrived without the rest of it. The rest has been requested in writing.", thursday: "A Feeling Of Thursday. It arrives on Wednesdays. Thursday is none the wiser, and Thursday is booked.", maybe: "A Maybe, Gift-Wrapped. Do not shake it. It will say yes, and then it will say it did not.", weekend: "The Weekend (Partial). Contents: one Sunday, slightly crushed. Please handle by the edges. The edges are Monday.", purpose: "A Purpose, Slightly Used. It fits most employees. Several have returned it. Management has kept it. It is not for Management.", moment: "The Moment Before The Meeting. It lasts 90 seconds. It lasts forever. It is the only part anyone attends.", thanks: "A Thank You (Unaddressed). It has been written, sealed and passed to everyone. It is now the thing in the room.", nothing: "Nothing (Wrapped). It is lighter than expected. It has been dropped. It has not made a sound, which is correct." };
  /* item x bin reactions, keyed id:labelBase (0 Important, 1 Urgent, 2 Neither, 3 Pending) */
  const PAIR = {
'dread:2': "Mild Dread, Seasonal, in Neither. It is the most comfortable it has been all quarter. Management is not going to say anything about that.", 'hole:3': "The Tuesday-Shaped Hole has been placed in Pending Re-Labelling. It fits. It fits very well. Nobody is going to mention that.", 'biscuit:0': "The Last Biscuit has been filed as Important. Finance, which has no biscuits, has asked to be copied.", 'email:1': "The 2009 email is Urgent again. It has waited since 2009 for someone to agree with it.",
'sigh:0': "A Quarterly Sigh, in Important. Finance has asked whether it can be heard from there. It can.", 'chair:3': "The Slightly Warm Chair is Pending. Pending has a great many chairs. This is the first that has been somebody's.", 'toast:2': "The toast is in Neither. The toast has said 'Hm.' Neither has said 'Hm.' They have found each other.", 'door:2': "A Door With No Room Attached is in Neither, which is also a door with no room attached. They have a lot to discuss.",
'form:3': "Form 27B/6 has gone into Pending, where Form 27B/7 has been waiting since 1998. They have not met.", 'potato:0': "A potato of unknown rank is in Important. Gerald has been told. Gerald says it is a good start.", 'clock:1': "The clock is in Urgent. It is 4:17 in there. It was 4:17 out here.", 'hope:3': "Hope (Quarterly) is Pending. It has been Pending before. It has a seat and a magazine from 2011.",
'stapler:0': "The Stapler's Demands are in Important. The Stapler has asked for this in writing, and for the writing to be in Important.", 'mug:2': "The mug is in Neither. It reads WORLD'S OKAYEST. Neither has agreed, quietly, and without looking at the mug.", 'weekend:1': "The Weekend (Partial) has been marked Urgent. It was asked to hurry. It is already gone.", 'coat:2': "The coat has gone into Neither. It denies ownership of Neither, and Neither has not asked." };
  /* ordered lists (walked with an index) */
  const ORD = {
firstDrop: ["Correct. We think. The receipt says 74.2%. The board says 63.4%. They are measuring different weather.", "Accuracy: 59.9%. A dip is simply a rise facing the other way.", "Accuracy: 64.2%. Three sorts in. The pile is, at this time, load-bearing and also slightly lighter."],
perPolicy: ["Per policy.", "Per policy. Clause 4(b).", "Per policy. Clause 4(b)(iii).", "Per policy. Clause 4(b)(iii)-bis, which supersedes Clause 4(b)(iii) while remaining beneath it.", "I am the clause.", "Per policy. Clause 7 and a Half, which is written on the inside of this line."],
wednesday: ["The Concept of Wednesday cannot be picked up for a few seconds. It is not stubborn. It is Wednesday.", "Wednesday has agreed to be lifted. It is very light. It is mostly 'middle of the week' and a little 'are we nearly there'.", "The Concept of Wednesday cannot be dropped. It can only be placed, gently, like a rumour.", "Do not drop Wednesday. It has been dropped before. It is still in the process of landing.", "Wednesday has been sorted. It will be back. It is weekly."],
fifthBin: ["A fifth bin has appeared. It is labelled with a question mark in biro. Please do not use it. Everyone is using it.", "The question-mark bin has accepted your item and kept it for further labelling. Further labelling is on a floor that has no floor.", "There is no fifth bin. The fifth bin has been reclassified as a smudge. The smudge accepts your item.", "The fifth bin is leaving. It has packed. It has not said where. Management has not asked.", "The fifth bin never existed. It is a rumour with a lid. Please do not mention it to the fifth bin."],
clause: ["All bin labels have been replaced by clause numbers. This is per policy. The policy is the clause. The clause is a number.", "Please sort according to clause. Management cannot tell you which clause. Management can tell you that there are clauses.", "Per Policy mode is over. The labels have returned. They are fairly confident they were here the whole time."],
glove: ["A single glove. Management is hopeful that this is the other one. It is not the other one. Management remains hopeful in a general way.", "This is the glove from earlier. It is a different glove. It is the same glove. We are sorry about both.", "The glove. We meet again. Management has prepared a short statement. The statement is 'hello'.", "A second glove. It is a left. It is also a left. They refuse to meet. This is not a pair. This is two ambitions.", "A Single Glove is back, and it is holding a second glove. The right one. Found. Its caption reads: Reunited. Please do not sort this."],
pileOfPilesArr: ["A pile of piles. Five items in one card. Please sort the card. The card is, technically, a pile.", "You have dropped the pile of piles back on the pile. The pile is larger now. It is also, somehow, proud."],
touch: ["Management has a confession. Management has never had a rubric. Management has had a feeling, and a folder.", "The rubric was never lost. It was never had. Management is sorry about the folder.", "Reunited. Please do not sort this. I do not need the number to go up for this one.", "The number has been put away. Management would like you to look at the bins instead. They are being very nice.", "Item: 'Something you did well today.' All four bins have opened. They would all like to hold it. We will let them take turns.", "ACCURACY: 100%. Hold on. ACCURACY: withdrawn. We got excited and we are sorry.", "The rubric has been found. It is a smiley face drawn in pencil. It was stuck to the underside of the clipboard.", "All four bins have gone quiet. It is not a protest. It is a kind of attention.", "Thank you for sorting with us. Management is not saying that as a policy. It is just a thing Management is saying.", "Management has run out of things to say. This has never happened. It has no process. Management is simply standing here, next to you."],
endSpeech: ["{player}, you have sorted everything. We are speechless. We have prepared a speech. We will now read the speech.", "Thank you, Important. Thank you, Urgent. Thank you, Neither. Thank you, Pending Re-Labelling, wherever you are.", "To the pile: you have been, at all times, a pile. To the rubric: we were wrong about you, and you were never here.", "That is the speech. It was mostly the bins. They have asked that we not make a thing of it. We are making a thing of it."],
endTired: ["Pile Zero (Provisional) again. The bell is the same bell. It rang a little less.", "Pile Zero. We have rehearsed this. The speech has been shortened to three lines. Nobody has said which.", "The pile is empty. Management is aware that it has been empty before. It has chosen to be pleased anyway.", "Pile Zero (Provisional) (Again). The bell has been asked to be enthusiastic. It is trying.", "Another Pile Zero. Management is a little tired. The glove, we are told, is not."],
again: ["Welcome to Triage. Please sort the pile.", "Welcome to Triage. Please sort the pile. This is a new pile. It is identical to the old pile. That is the point. No, wait.", "Welcome to Triage. Please sort the pile. We have done this before. We do not mind. We have said we do not mind in a voice.", "Welcome to Triage. Please sort the pile. The pile is a little tired. So is Management. The bins are fine. They say they are fine.", "Welcome to Triage. Please sort the pile. Round {count}. The rounds are numbered. The piles are not."],
binShuffle: ["Our bins respond to the viewport. They are very corporate about it.", "Welcome back, bins.", "The bins have rearranged themselves. They have not told us the reason. It is a viewport. It is always a viewport."],
advisement: ["That is Management's face. It will be taken under advisement.", "Three items are now under advisement. Management would like to say something. Management is taking that under advisement.", "Under Advisement (Permanently). Management is delighted. It does not know what it is delighted about."],
askN: ["Management is available. Management is not available to you.", "Good question. Management has written it down. The page it is written on is the rubric.", "Please hold. Your question is important to us in a way we cannot articulate.", "Management has consulted Sandra. Sandra said 'technically'. That is a lot from Sandra.", "Management would like to help. The help is Form 27B/6. The form asks you to ask again.", "You have asked six times. Management has run out of answers and is now stalling in a warm tone.", "The answer is in the rubric. The rubric is where the answer is not.", "Sort the pile. That is the answer. It is not the answer to your question. It is the answer."],
spamN: ["You are sorting at a rate we cannot measure. We measured it. It was too fast.", "Again. A speed camera has taken your photo. You are smiling. We had hoped for a tired smile.", "Third offence. The bins have put on hard hats. Overtime has begun. It is not paid.", "Fourth. Sandra describes your pace as 'a sprint in a corridor'. The bin paid the fine on your behalf. It was not asked.", "Sorting speed is up 40 percent. Sorting accuracy is the same. We call this 'throughput'. The bins call it Tuesday.", "Six events. We are no longer fining you. We are simply writing it down, in cursive."],
stripNew: ["A new strip has appeared. It is for taking things under advisement. Management will not be taking questions on this.", "It is a strip. It is at the top. Nothing has been asked of it. Do not put anything on it, please, unless you must."] };
  const UI = {
appealStamps: ["APPEAL UPHELD (YOUR SCORE HAS BEEN UPHELD)", "APPEAL DENIED (IN YOUR FAVOUR)", "APPEAL RECEIVED (AND NOW HELD)", "APPEAL UPHELD (GENTLY)"], tape: ["Technically a category.", "Policy 12: Tape.", "Policy 12 (revised): No tape.", "Policy 12 (revised, again): Tape, but gentler.", "Policy 12 (see Policy 12).", "Do not remove. Remove after. Do not remove after."], tapeTos: ["See Terms of Service, page 9 (the one you scrolled past).", "Per the Terms of Service: Tape. Paragraph titled 'Yes'."], clause: ['Cl. 4(b)', 'Cl. 9', 'Cl. 7 1/2', 'Cl. 2(a)(ii)'], ticker: ["Everything must be sorted.", "Nothing may be sorted before it is sorted.", "Sorting is permitted. Sorting is also under review.", "All sorting must be done sitting. All sorting must be done standing. Choose neither.", "Bins must not be used as chairs. Chairs must not be used as bins. Both are Important.", "Policy 12: Tape. Policy 12 (revised): No tape.", "Rubrics shall be lost in accordance with the Rubric Loss Procedure.", "All receipts are final. All receipts are provisional.", "Employees must declare any glove found on their person. Employees must not look for the other one.", "Wednesday is not to be dropped. Wednesday is not to be held. Wednesday is to be accompanied.", "No sorting between 3:30 and 3:31. That minute is for the lanyards.", "Any item that looks back is to be sorted by someone it has not met."], binWords: ['Fine.', 'Hm.', 'Alright.', 'Sure.', 'Noted.', 'Mm.', 'Yes.', 'Sort of.'], binMutter: ['I am Important.', 'No, I am Important.', 'We are both Important.', 'Someone should say something.', 'I will not be the one.', 'I have been Important longer.', 'Is this a Tuesday?', 'Do not look at me.'],
gerald: ["Some of us are in the process of becoming.", "I did not use the drag. I was always in Important.", "Thank you for the opportunity. I have taken it.", "A potato is a decision the ground has not yet made.", "I have sorted myself. I am where I meant to be. It was a close thing."], fine: ['Brisk', 'Swift', 'Alarmingly Prompt', 'Suspiciously Efficient'], foot: ["See footnote.", "See footnote (see footnote).", "The footnote is on the other receipt. The other receipt is in the box.", "Footnote withheld pending footnote.", "This figure is accurate as of a moment we will not name.", "See footnote 7 1/2.", "Footnote has been moved to Annex.", "Footnote available on request. The request is in Pending.", "This number was rounded by hand, by someone who liked it."], accDen: ['of rubric', 'of items', 'of Tuesdays', 'of feelings', 'of Sandra'], sortDen: ['of an unknown total', 'of roughly all of them', 'of 7 and a half', 'of however many are left', 'of a number being finalised'], status: ['Missing', 'Located', 'Located (Wrong One)', 'Being Reprinted', 'Laminated'], dial: ['STANDARD', 'ALTERNATIVE', 'LEGACY', 'PLAYFUL'], suf: [' (v2)', ' (Final)', ' (Final) (Final)', ' (Pending)', ' (Final) (Pending)', ' (Please Hold)'], lastWords: ['Fine.', 'Urgent.', 'Yes.', 'Pending.'], dennisBub: ['★★★★☆ Thriving.', '★★★☆☆ Adequate (photosynthesis).', '★★☆☆☆ Watered, not asked.', '★★★★★ (Dennis would like a raise.)'] };
  ['open', 'openAgain', 'firstGlove', 'lift', 'returned', 'select', 'drop', 'binImportant', 'binUrgent', 'binNeither', 'binPending', 'accHigh', 'accLow', 'accDrop', 'acc', 'cap', 'settle', 'bonus', 'rubricIntro', 'rubric', 'rubricSpam', 'rubricAllEleven', 'rubricComplete', 'b3', 'swapTell', 'swapNoticed', 'swapRotate', 'dupImportant', 'formerly', 'relabel', 'b4', 'drawer', 'drawerBack', 'stickyFinal', 'drawerSpill', 'dial', 'appeal', 'appealAgain', 'appealNone', 'b5', 'audit', 'auditEnd', 'meeting', 'overflow', 'pileFights', 'argue', 'b7', 'rubricOriginal', 'rubricOther', 'rubricNeither', 'rubricDraft', 'sandraUnits', 'gloveSort', 'gloveDist', 'philo', 'sideways', 'geraldMgmt', 'geraldDone', 'geraldBack', 'sock', 'sockHere', 'sockDone', 'sockKevin', 'match', 'touchAmbient', 'pileZero', 'endAcc', 'gloveCushion', 'secretly', 'idle30', 'idle60', 'idleDrop', 'idle90', 'idle120', 'idle150', 'idle210', 'idle300', 'idle420', 'idle600', 'idleBack', 'idleBackLong', 'spam', 'twitch', 'breathe', 'fatigue', 'fatigueEnd', 'breakLine', 'union', 'unionEnd', 'sticker', 'selfSort', 'pileOfPiles', 'seven', 'accSorted', 'advisement', 'light', 'hoverA', 'hoverB', 'drill', 'drillEnd', 'dennis', 'dennisKnown', 'min3', 'min3Sort', 'min10', 'min10Sort', 'lullA', 'lullB', 'lullC', 'toastKnown', 'staplerKnown', 'coatKnown', 'potatoKnown', 'oooKnown', 'ask'].forEach(function (k) {
    P.addLines('m:sort-the-pile:' + k, L[k] || ['Noted.']); });
  P.addLines('m:sort-the-pile:dennisBub', UI.dennisBub);
  /* ------------------------------------------------------------------ item tables: id | emoji | title | caption */
  const TBL = (s) => s.trim().split(/\n|~/).filter(Boolean).map(function (r) { const p = r.split(' | '); return { id: p[0].trim(), emoji: p[1].trim(), title: p[2].trim(), cap: p[3].trim() }; });
  const NORMAL = TBL(`
sigh | 💨 | A Quarterly Sigh | Exhaled by Finance, 3:40 PM, Level 7 and a Half.~chair | 💺 | A Slightly Warm Chair | Recently vacated by something.~deadline | ⏳ | Half a Deadline | The other half is in Sandra's drawer.~sticky | 📝 | A Strongly Worded Sticky Note | Reads: "Per my previous sticky."
confidence | 💪 | Loose Confidence (Assorted) | Count: 14, or 15 if you believe.~biscuit | 🍪 | The Last Biscuit | Disputed.~email | 📧 | An Unread Email From 2009 | Marked Urgent by a younger Management.~door | 🚪 | A Door With No Room Attached | Serves a purpose. The purpose is leaving.~form | 📄 | Form 27B/6 | Awaiting Form 27B/7.
dream | 💭 | A Dream Someone Forgot To Have | Unclaimed since March.~hole | 🕳️ | A Tuesday-Shaped Hole | Do not look directly.~leaf | 🍃 | One Ficus Leaf (Dennis, Resigned) | Dennis did not resign; Dennis shed.~raincheck | ☔ | A Raincheck For Rain | Valid: weather permitting, permission pending.
seven-half | 🔢 | The Number Seven and a Half | Between 7 and 8. Citation needed.~reply-all | 📨 | A Reply-All From 2019 | It has found its way back before.~fourth | 📋 | The Fourth Thing On The Agenda | The first three are in Pending Re-Labelling.~dread | 🌧️ | Mild Dread, Seasonal | Currently in season.
sock | 🧦 | Left Sock (Kevin?) | Does not wish to be matched. Wishes to be sorted.~lunch-memo | 🍱📝 | A Memo About The Memo About Lunch | Both memos are lunch.~lanyard | 🎫 | A Lanyard | Important on Tuesdays.~clips | 📎 | A Paperclip Chain Of Unclear Purpose | Eleven links. The twelfth is in Pending.
mug | ☕ | A Mug Reading WORLD'S OKAYEST | The rest has worn off.~invite | 🗓️ | A Calendar Invite For Right Now | Sent four minutes ago.~stapler | 📌 | The Stapler's Demands (Draft 3) | Demand 1 is a chair. Demand 2 is Demand 1.~dennis-note | 🌿 | A Note From Dennis | Reads: "Water. Not asking."
room | 🏢 | Meeting Room 7 1/2 | Available. No one can say where.~toast | 🍞 | A Slice Of Toast (Honest) | Speaks only in toast. Says: "Hm."~umbrella | 🌂 | An Umbrella, Indoors | It has been asked to leave. It has asked why.~clock | 🕰️ | A Clock Wrong With Confidence | Reads 4:17 and means it.
suggestion | 📮 | A Suggestion (Anonymous, Signed) | Reads: "More suggestions."~barrier | 🚧 | A Barrier (Provisional) | Marks the edge of something. Nobody will say what.~potato | 🥔 | A Potato Of Unknown Rank | Respectfully, not Gerald.~drill | 🔔 | A Fire Drill From Last Week | Please return it to the previous Thursday.
report | 📊 | Quarterly Report (Q3, Mood) | Trending sideways with pride.~key | 🔑 | A Key To Something Newer | Fits nothing. Fits it well.~battery | 🔋 | A Battery Holding Out For Tuesday | Charge: "Enough, technically."~coat | 🧥 | A Coat That Denies Ownership | Contents: one glove. Possibly.
printer | 🖨️ | A Printer's Last Words | Reads: "Paper jam, but emotionally."~ooo | 🏝️ | An Out-Of-Office Reply (Permanent) | Back never. Please see Sandra.~bell | 🛎️ | A Service Bell Nobody Rang | It is practising.~goldfish | 🐟 | A Goldfish On Secondment | Returns next month. Has already.
pencil | ✏️ | A Pencil Worn Down To An Opinion | One strong view remains.~balloon | 🎈 | A Balloon From A Farewell | Whose, no one recalls.~map | 🗺️ | A Map Of The Building (Optimistic) | Shows an exit. Marked: "Aspirational."~envelope | ✉️ | An Envelope Containing An Envelope | Do not open. It has been opened before.
cake | 🎂 | Half A Birthday Cake | Disputed. Not the same dispute as the biscuit.~magnet | 🧲 | A Fridge Magnet: Live, Laugh, Submit | Form 27B/6 not included.~heat | 🌡️ | The Office Temperature (Disputed) | Reported as "a bit much".~binder | 📚 | A Binder Labelled DO NOT | The rest of the label is Sandra's.
flag | 🚩 | A Red Flag, Politely Raised | Tone: "if you have a moment".~trophy | 🏆 | A Participation Trophy, Participating | It has been asked to stand down. It stands.~pen | 🖊️ | A Pen Borrowed In 2014 | Last seen leaving in a pocket. Pocket denies.~noise | 🔊 | A Noise From Level 3 | Not loud. Present.
glasses | 👓 | Reading Glasses (Other People's) | They are looking for the owner. The owner is looking for them.
`);
  const ABSTRACT = TBL(`
hope | 🌱 | Hope (Quarterly) | Someone keeps leaving it on the pile.~reason | ❓ | The Reason | Was in the rubric. Is not in the rubric.~yesterday | 📆 | Yesterday, Slightly Off | Please place it where you left it.~almost | 📦 | Almost, In Bulk | Arrived without the rest of it.
thursday | 🍂 | A Feeling Of Thursday | Arrives on Wednesdays. Thursday is none the wiser.~maybe | 🎁 | A Maybe, Gift-Wrapped | Do not shake. It will say yes.~weekend | 🛋️ | The Weekend (Partial) | Contents: one Sunday, slightly crushed.~purpose | 🧭 | A Purpose, Slightly Used | Fits most employees. Returned by several.
moment | ⏱️ | The Moment Before The Meeting | It lasts 90 seconds. It lasts forever.~thanks | 💌 | A Thank You (Unaddressed) | Sorted by sentiment. Delivered by no one.~nothing | 🎀 | Nothing (Wrapped) | Lighter than expected.
`);
  const SPECIAL = TBL(`
meeting | 📅💺 | A Meeting About a Meeting | Attended by nobody; minutes taken by everybody.~glove | 🧤 | A Single Glove (Left, Probably) | Found in a coat that denies ownership.~glove-also-left | 🧤 | A Single Glove (Also A Left) | It is a left. It is also a left.~glove-reunited | 🧤🧤 | A Single Glove (Reunited) | Reunited. Please do not sort this.
glove-dist | 🧤 | Glove (Distinguished) | Takes no questions.~missing-sock | 🧦 | The Missing Sock | Presumed on a journey.~gerald | 🥔 | Gerald (Vice President of Spuds) | Regards the bins with gravitas.~wednesday | * | The Concept of Wednesday | Please do not drop.~tuesday-preview | * | Tuesday (Preview) | Do not make eye contact.
rubric-original | 📋 | THE RUBRIC (Original) | Clearly marked. Clearly the rubric. Do not lose it.~rubric-draft | 📋 | THE RUBRIC (Draft) | We do not talk about it.~pile-of-piles | 🗃️ | A Pile Of Piles | Contains 5. Is itself one.~did-well | ⭐ | Something You Did Well Today | Not graded.
fatigue | 😴 | Bin Fatigue (Pending) | Will be sorted after three seconds.~meeting-minutes | 📅 | A Meeting (Minutes) | Taken by everybody.~meeting-actions | 📅 | A Meeting (Action Items) | Assigned to nobody. Owned by all.~anniv | 🍰 | Three Minutes Of Service (Cake) | One candle. Sandra has the matches.~plaque | 🏅 | A Plaque: Ten Minutes | Engraved for someone else. They are unavailable.
`);
  const FRAGS = ['1. Is it ______? (see 3)', '2. [water damage]', '3. Would Sandra ______ (see 9)', '4. (lost)', "5. Weigh against the item's feelings about itself.", '6. Deduct 4 points for Tuesday.', '7. [redacted by redaction, see redaction]', '8. If in doubt, Neither. If in Neither, doubt.', '9. See 3.', '10. Accuracy shall be computed by whoever is closest.', '11. Half marks for effort. Effort not included.', '12. :)  (hand-drawn, pencil)'];
  const MATTRESS = ['1. Do not remove this tag under penalty of law, except by the consumer, who may remove it, but would rather not.', '2. This mattress is not a flotation device. It has floated. We do not discuss it.', '3. Sleep is provided as is. Sandra has the other half.', '4. Mattress may settle during shipping. So may you.', '5. Not to be used as a trampoline, a boat, a door, or a second opinion.', '6. Firmness is a state of mind. The state is pending.', '7. Any dreams occurring on this mattress are the property of the mattress, unless unclaimed since March.', '8. Warranty void if slept on.', '9. See 3.', '10. Thread count is approximate. So is the count of threads. So is the thread.', '11. Half the mattress is for the other half.', '12. :)  (not part of the mattress)'];
  const BASE = ['Important', 'Urgent', 'Neither', 'Pending Re-Labelling'];
  const ICON = ['📌', '⏰', '🌫️', '🏷️'];
  const BEAT_AT = [0, 30, 45, 105, 150, 210, 270, 345, 435, 540];
  const MIN_DROPS = [0, 3, 6, 10, 15, 20, 26, 32, 38, 44];
  const DEC = [1, 2, 3, 3, 4, 4, 4, 6, 8, 1];
  const MARKS = ['*', '†', '‡'];
  const DB = {};
  NORMAL.concat(ABSTRACT, SPECIAL).forEach(function (r) { DB[r.id] = r; });
  P.registerModule({
    id: 'sort-the-pile',
    title: 'Sort the Pile',
    tagline: 'Drag things into the correct bin. The bins will let you know what that was.',
    icon: '📥',
    category: 'game',
    unlockCost: 0,
    tags: ['sorting', 'drag', 'rubric'],
    mount: function (root, api) {
      const el = api.el, K = 'm-sort-the-pile-';
      const cx = function () { const o = []; for (let i = 0; i < arguments.length; i++) if (arguments[i]) o.push(K + arguments[i]); return o.join(' '); };
      const clamp = function (x, a, b) { return Math.min(b, Math.max(a, x)); };
      const fin = function (x) { return typeof x === 'number' && isFinite(x); };
      const num = function (x, d, f) { if (!fin(x)) return f === undefined ? '0' : f; let s = d === undefined ? String(Math.round(x)) : x.toFixed(d); if (/^-0(\.0*)?$/.test(s)) s = s.slice(1); return s; };
      const hash = function (s) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; };
      const halfText = function (n) { if (!fin(n)) return '0'; const f = Math.floor(n); return n > f ? f + ' and a half' : String(f); };
      const TS = api.selftest ? 20 : ((P.params && P.params.shot) ? 40 : 1);
      /* ---------------- save ---------------- */
      const sv = { best: 61.8, total: 0, revLife: 0, ver: 4, round: 0, frag: [], sigh: [0, 0, 0, 0], glove: [0, 0, 0, 0], idleSort: false, idleRespect: false, accImportant: false, pileZeroPaid: false, stickerPaid: false, snakePaid: false, advisementPaid: false, accSortedPaid: false, advisements: 0, unionSeen: false, spamLife: 0 };
      (function () {
        let o = null;
        try { o = api.save.get('s', null); } catch (e) { o = null; }
        if (!o || typeof o !== 'object' || Array.isArray(o)) return;
        Object.keys(sv).forEach(function (k) {
          const v = o[k];
          if (v === undefined || v === null) return;
          if (k === 'frag') { if (Array.isArray(v)) sv.frag = v.filter(function (x, i) { return typeof x === 'number' && x >= 0 && x < 12 && x % 1 === 0 && v.indexOf(x) === i; }); }
          else if (k === 'sigh' || k === 'glove') { if (Array.isArray(v)) sv[k] = [0, 1, 2, 3].map(function (i) { return v[i] ? 1 : 0; }); }
          else if (typeof v === typeof sv[k] && (typeof v !== 'number' || fin(v))) sv[k] = v; });
        /* corrupt or hand-edited saves: keep every number in a range the UI and the line tables can survive */
        sv.best = clamp(sv.best, 0, 100); sv.total = Math.floor(clamp(sv.total, 0, 1e9)); sv.revLife = Math.floor(clamp(sv.revLife, 0, 1e9));
        sv.ver = Math.floor(clamp(sv.ver, 1, 1e6)); sv.round = Math.floor(clamp(sv.round, 0, 1e6)); sv.spamLife = Math.floor(clamp(sv.spamLife, 0, 1e9)); sv.advisements = Math.floor(clamp(sv.advisements, 0, 1e9));
      })();
      /* ---------------- state ---------------- */
      let gen = 0, round = sv.round | 0, uid = 0, recId = 0;
      const pending = [], endPend = [];
      let queue = [], drawer = [], recs = [], hist = [], ghost = [], flies = [], adv = [];
      let held = null, cursor = 0, selected = false, drag = null, selRec = null, stickerFrom = -1, lookOpen = false;
      let lastInput = api.now(), lastUp = 0, suppressUntil = 0, saveT = 0, bagN = [], bagA = [], bagF = [];
      let fifth = null, spamD = [], spamP = [], idleTier = 0, idleQueue = [], idleOv = false, ribbonT = 0, bubT = 0, fnT = 0, wigT = 0;
      let wedSaid = false;
      const S = {};
      const T = { spam: 0, swaps: 0, appeals: 0, lastTick: api.now(), refuseAt: 0, geraldOn: api.chance(0.25), clipOn: sv.frag.length > 0, shufDone: false, wasWide: false, mutterAt: 0, noticed: 0, sevenRound: -1, settled: false, lastFoot: -1, lastSay: 0, markI: 0, spamAt: -1e9, restAt: 0, bonusAt: -1e9, idleAt: api.now(), denAt: 0, accDenAt: 0, sideways: 0, tickCnt: 0, wall: 0, askN: 0, twitchAt: -1e9, rubT: [], rubSpamAt: -1e9, idleX: 0, heldAt: 0, hov: 0, m3: false, m10: false };
      const MARK3 = api.selftest ? 25 : 180, MARK10 = api.selftest ? 55 : 600, RR = api.selftest ? 14 : 1;
      const IDLE_X = [[30, 'idle30'], [120, 'idle120'], [210, 'idle210'], [420, 'idle420'], [600, 'idle600']];
      const known = function (fl, st) { return fl.some(function (f) { return !!api.flag.get(f); }) || st.some(function (s) { return api.stat.get(s) > 0; }); };
      const CALLS = { toast: [['metToaster', 'toasterMet'], ['toaster-debate.entered'], 'toastKnown'], stapler: [['metStapler'], [], 'staplerKnown'], leaf: [['metDennis', 'plantClicked'], ['dennis-review.entered'], 'dennisKnown'], 'dennis-note': [['metDennis', 'plantClicked'], ['dennis-review.entered'], 'dennisKnown'], coat: [['lost-and-found.coat'], ['lost-and-found.entered', 'coat-check.entered'], 'coatKnown'], potato: [['metGerald'], [], 'potatoKnown'], ooo: [[], ['hold-music.entered'], 'oooKnown'] };
      const bins = [0, 1, 2, 3].map(function (i) { return { pos: i, lab: { base: i, suf: '', ov: null }, trust: 0, count: 0, lastRaw: null, uneasyUntil: 0, blank: false, histRow: null }; });
      function later(fn, ms) {
        const g = gen;
        const id = api.setTimeout(function () { const i = pending.indexOf(id); if (i >= 0) pending.splice(i, 1); if (g !== gen) return; fn(); }, ms);
        pending.push(id);
        return id; }
      function laterEnd(fn, ms) {
        const g = gen;
        const id = api.setTimeout(function () { const i = endPend.indexOf(id); if (i >= 0) endPend.splice(i, 1); if (g !== gen) return; fn(); }, ms);
        endPend.push(id);
        return id; }
      function cancelAll() { pending.forEach(function (id) { api.clearTimeout(id); }); pending.length = 0; endPend.forEach(function (id) { api.clearTimeout(id); }); endPend.length = 0; }
      function unlater(id) { if (!id) return; api.clearTimeout(id); const i = pending.indexOf(id); if (i >= 0) pending.splice(i, 1); }
      function rmo() { return root.classList.contains(K + 'rm'); }
      function rm(n) { if (n && n.parentNode) n.parentNode.removeChild(n); }
      function vis(n, on) { if (n) n.hidden = !on; }
      function toggle(n, c, on) { if (n) n.classList.toggle(K + c, !!on); }
      function restart(n, c) { if (!n) return; n.classList.remove(K + c); void n.offsetWidth; n.classList.add(K + c); }
      function newRound() {
        Object.assign(S, { beat: 1, progress: 0, drops: 0, sorted: 0, sortedInt: 0, done: {}, swaps: round === 0 ? 0 : api.randInt(0, 1), noSwapUntil: 0, dial: 0, seed: api.randInt(1, 999999), policyNo: 12, acc: 61.8, lastDropAt: api.now(), lastCredit: -1e9, tapeBin: -1, tapeUntil: 0, hushUntil: 0, relabelT: 0, sufIdx: 0, rev: 0, shared: null, sharedDone: false, seq: 0, seqDone: false, smiley: false, geraldAt: api.randInt(150, 400), b8At: 1e9, gn: 0, fatigueLeft: 0, armed: false, ending: false, cob: false, ovr: { withdrawn: false, hidden: false, hundred: null }, rubricAt: -1e9, capN: 0, lastSwapAt: -1e9, swapNoticed: false, lastPolicy: '', prevTitle: '', breakUntil: 0, unionUntil: 0, nextAudit: 0, tapeIdx: 0, noticedThis: 0, status: 0, fragThis: [], clauseOn: false, rubricSeen: false, fragEleven: false, sevenFired: false, wasSeven: false, mood: 0, tapeNote: 0, sockSeen: false }); }
      newRound();
      /* ---------------- DOM ---------------- */
      const D = {};
      const FID = 'm-sort-the-pile-rough';
      D.sr = el('div', { class: cx('sr'), 'aria-live': 'polite' });
      D.defs = el('svg', { width: '0', height: '0', 'aria-hidden': 'true', style: 'position:absolute' }, el('defs', null, el('filter', { id: FID }, el('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.04', numOctaves: '2', result: 'n' }), el('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: '3' }))));
      D.accn = el('span', { class: cx('accn') }); D.accu = el('span', { class: cx('accu') });
      D.accb = el('button', { class: cx('accb'), type: 'button', onclick: function (e) { accClick(e); } }, D.accn, D.accu);
      D.accd = el('span', { class: cx('sm'), text: UI.accDen[0] });
      D.fn = el('button', { class: cx('fn'), type: 'button', 'aria-label': 'Footnote', text: '*', onclick: function () { showFoot(D.fn); } });
      D.sortn = el('span', { class: cx('big') }); D.sortd = el('span', { class: cx('sm'), text: UI.sortDen[0] });
      D.rubst = el('span', { class: cx('big'), text: UI.status[0] }); D.rubv = el('span', { class: cx('sm') });
      D.rubb = el('button', { class: cx('tag', 'rubb'), type: 'button', onclick: function () { onRubTag(); } }, el('span', { class: cx('tl'), text: 'RUBRIC' }), D.rubst, D.rubv);
      D.top = el('div', { class: cx('top') },
        el('div', { class: cx('tag') }, el('span', { class: cx('tl'), text: 'ACCURACY' }), D.accb, D.accd, D.fn),
        el('div', { class: cx('tag') }, el('span', { class: cx('tl'), text: 'ITEMS SORTED' }), D.sortn, D.sortd), D.rubb);
      D.advn = el('span', { text: 'Under Advisement: 0' });
      D.adv = el('div', { class: cx('mgmt'), hidden: !(sv.advisements > 0) }, el('b', { text: 'MANAGEMENT' }), el('i', { text: '📎', 'aria-hidden': 'true' }), D.advn);
      /* the tray */
      D.heap = el('div', { class: cx('heap'), 'aria-hidden': 'true' });
      [[6, 14, -8], [70, 8, 6], [16, 62, 4], [76, 70, -6], [4, 108, 7], [82, 120, -3]].forEach(function (p, i) {
        const r = NORMAL[(i * 9 + 3) % NORMAL.length];
        D.heap.appendChild(el('span', { class: cx('slip'), style: 'left:' + p[0] + '%;top:' + p[1] + 'px;--r:' + p[2] + 'deg;animation-delay:-' + (i * 0.7) + 's', text: r.title })); });
      D.gh1 = el('div', { class: cx('gh'), 'aria-hidden': 'true' }); D.gh2 = el('div', { class: cx('gh'), 'aria-hidden': 'true' });
      D.card = el('button', { class: cx('card'), type: 'button', onclick: function (e) { cardClick(e); } });
      D.drawCards = el('span'); D.drawer = el('div', { class: cx('drawer'), 'aria-hidden': 'true' }, el('b', { text: 'PENDING' }), D.drawCards, el('em', { text: 'Re-label in: 7 1/2 days' }));
      D.ptag = el('span', { class: cx('ptag'), text: 'Pile: 23' }); D.otag = el('span', { class: cx('otag'), text: 'Overflow: 14 (see Annex)' });
      D.intro = el('button', { class: cx('intro'), type: 'button', hidden: true, text: 'Introduce Them', onclick: function () { introduce(); } });
      D.stage = el('div', { class: cx('stage') }, el('div', { class: cx('boxb'), 'aria-hidden': 'true' }), D.heap, D.gh2, D.gh1, D.card, el('div', { class: cx('conv'), 'aria-hidden': 'true' }), D.ptag, D.otag, D.drawer, D.intro);
      D.cob = el('div', { class: cx('cob'), hidden: true });
      D.hint = el('p', { class: cx('hint'), text: 'Tap the card, then tap a bin. Dragging also works. Management has no opinion on method.' });
      D.tray = el('section', { class: cx('tray') }, D.stage, D.hint, D.cob);
      /* bins + receipts */
      function mkBin(i) {
        const b = i < 4 ? bins[i] : { pos: 4, lab: { base: 2, suf: '', ov: '?' }, trust: 0, count: 0, lastRaw: null, uneasyUntil: 0, blank: false, histRow: null, five: true };
        b.labT = el('span', { class: cx('labt') });
        b.labEl = el('span', { class: cx('lab'), style: '--rot:' + (((i * 7) % 5) - 2) + 'deg' }, b.labT);
        b.noteEl = el('span', { class: cx('note'), hidden: true });
        b.cntEl = el('span', { class: cx('cnt') });
        b.spillEl = el('span', { class: cx('spill'), 'aria-hidden': 'true' });
        b.mouthEl = el('i', { class: cx('mouth') });
        b.el = el('button', { class: cx('bin', 'c' + i), type: 'button', onclick: function (e) { binClick(b, e); } },
          el('span', { class: cx('face'), 'aria-hidden': 'true' }, el('i', { class: cx('eye') }), el('i', { class: cx('eye') }), b.mouthEl),
          b.labEl, b.noteEl, b.cntEl, b.spillEl,
          el('span', { class: cx('tape'), 'aria-hidden': 'true' }), el('span', { class: cx('hat'), 'aria-hidden': 'true', text: '⛑️' }),
          el('span', { class: cx('hand'), 'aria-hidden': 'true', text: '🧤' }), el('span', { class: cx('thumb'), 'aria-hidden': 'true', text: '👍' }),
          el('span', { class: cx('sign'), 'aria-hidden': 'true', text: 'ON BREAK (7 and a half minutes)' }));
        return b; }
      D.bins = el('div', { class: cx('bins') }, bins.map(function (b) { return mkBin(b.pos).el; }));
      D.rail = el('div', { class: cx('rail') }, el('span', { class: cx('chain'), 'aria-hidden': 'true' }));
      D.right = el('div', { class: cx('right') }, D.bins, D.rail);
      D.main = el('div', { class: cx('main') }, D.tray, D.right);
      /* lower area */
      D.dialSvg = buildDial();
      D.dialw = el('div', { class: cx('dialw'), 'aria-hidden': 'true' }, D.dialSvg);
      D.appealBtn = el('button', { class: cx('btn', 'pri', 'appeal'), type: 'button', text: 'File an Appeal', onclick: function () { appeal(); } });
      D.lookBtn = el('button', { class: cx('btn'), type: 'button', text: 'Look Closer (L)', onclick: function () { toggleLook(); } });
      D.askBtn = el('button', { class: cx('btn'), type: 'button', title: 'Management will answer. Probably.', text: 'Ask Management (M)', onclick: function () { askMgmt(); } });
      D.btns = el('div', { class: cx('btns') }, D.appealBtn, D.lookBtn, D.askBtn);
      D.revs = el('div', { class: cx('revs'), text: 'Label Revisions: 0' });
      D.tick = el('div', { class: cx('tick'), text: "Sandra's Policies" });
      D.look = el('div', { class: cx('look'), hidden: true });
      D.clipu = el('span', { class: cx('clipu'), 'aria-hidden': 'true' });
      D.clipt = el('p', { class: cx('clipt'), text: 'RUBRIC (v4)' });
      D.clipl = el('ol');
      D.clipBtn = el('button', { class: cx('btn'), type: 'button', text: 'Reveal a line (R)', onclick: function (e) { e.stopPropagation(); revealFrag(); } });
      D.clip = el('div', { class: cx('clip'), onclick: function () { revealFrag(); } }, D.clipu, D.clipt, D.clipl, D.clipBtn);
      D.left = el('div', { class: cx('left') }, D.dialw, D.btns, D.revs, D.tick, D.look);
      D.lower = el('div', { class: cx('lower') }, D.left, D.clip);
      D.ribbon = el('div', { class: cx('ribbon'), 'aria-hidden': 'true' });
      D.flash = el('div', { class: cx('flash'), 'aria-hidden': 'true' });
      D.bub = el('div', { class: cx('bub'), hidden: true, 'aria-hidden': 'true' });
      D.fnb = el('div', { class: cx('fnb'), hidden: true, 'aria-hidden': 'true' });
      root.classList.add(K + 'root');
      root.appendChild(D.sr); root.appendChild(D.defs); root.appendChild(D.top); root.appendChild(D.adv); root.appendChild(D.main); root.appendChild(D.lower);
      root.appendChild(D.ribbon); root.appendChild(D.flash); root.appendChild(D.bub); root.appendChild(D.fnb);
      api.setTitle('Triage Annex, Pile 7 1/2');
      function buildDial() {
        const stops = UI.dial.map(function (n, i) {
          const a = (-67.5 + i * 45) * Math.PI / 180;
          return el('text', { x: String(100 + 106 * Math.sin(a)), y: String(100 - 106 * Math.cos(a)), 'text-anchor': 'middle', 'font-size': '8', 'font-weight': '800', fill: '#2b2230', text: n }); });
        D.needle = el('line', { x1: '100', y1: '100', x2: '100', y2: '38', stroke: '#d6322e', 'stroke-width': '4', 'stroke-linecap': 'round', class: cx('needle'), style: 'transform:rotate(-67.5deg)' });
        return el('svg', { viewBox: '-40 -8 280 124', role: 'img', 'aria-label': 'Dial' },
          el('path', { d: 'M 20 100 A 80 80 0 0 1 180 100', fill: '#fffdf6', stroke: '#2b2230', 'stroke-width': '4' }),
          el('path', { d: 'M 40 100 A 60 60 0 0 1 160 100', fill: 'none', stroke: '#2b223355', 'stroke-width': '2', 'stroke-dasharray': '3 4' }),
          stops, D.needle, el('circle', { cx: '100', cy: '100', r: '7', fill: '#2b2230' })); }
      function paintDial() { if (D.needle) D.needle.style.transform = 'rotate(' + (-67.5 + S.dial * 45) + 'deg)'; }
      /* ---------------- speaking helpers ---------------- */
      function hushed(pri) { return S.hushUntil > api.now() && (pri || 0) < 2; }
      function sayC(cat, mood, pri, tokens) { if (hushed(pri)) return false; const o = Object.assign({ mood: mood || 'neutral', priority: pri || 0 }, tokens || {}); return api.sayRandom('m:sort-the-pile:' + cat, o); }
      function sayT(text, mood, pri, who) { if (hushed(pri)) return false; const o = { mood: mood || 'neutral', priority: pri || 0 }; if (who) o.who = who; return api.say(String(text), o); }
      function announce(t) { T.annN = !T.annN; D.sr.textContent = String(t) + (T.annN ? '' : ' '); }
      function cardAria(it, h) { return it.kind === 'fatigue' ? 'Bin Fatigue. Please wait three seconds.' : it.title + '. ' + it.cap + (h ? '. Held. Choose a bin, or press Enter to drop.' : '. Press Enter to pick up.'); }
      function save(now) {
        if (now) { if (saveT) { api.clearTimeout(saveT); saveT = 0; } sv.round = round; api.save.set('s', sv); return; }
        if (!saveT) saveT = api.setTimeout(function () { saveT = 0; sv.round = round; api.save.set('s', sv); }, 2000); }
      /* ---------------- layout / responsive ---------------- */
      function onResize() {
        const w = root.clientWidth || 0;
        toggle(root, 'narrow', w > 0 && w < 520);
        let reduced = false;
        try { reduced = !!(root.closest('.pm-reduce-motion') || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)); } catch (e) { reduced = false; }
        toggle(root, 'rm', reduced);
        if (w >= 900) { if (T.shufDone && root.classList.contains(K + 'shuf')) { toggle(root, 'shuf', false); toggle(D.bins, 'shuf', false); sayT(ORD.binShuffle[1], 'smug', 0); } T.wasWide = true; }
        else if (w > 0 && w < 600 && T.wasWide && !T.shufDone) { T.wasWide = false; T.shufDone = true; toggle(D.bins, 'shuf', true); toggle(root, 'shuf', true); sayT(ORD.binShuffle[0], 'smug', 1); later(function () { sayT(ORD.binShuffle[2], 'smug', 0); }, 9000); } }
      /* ---------------- items and the queue ---------------- */
      const SPECIAL_IDS = {};
      SPECIAL.forEach(function (r) { SPECIAL_IDS[r.id] = 1; });
      const glyphs = function (s) { const m = String(s).match(/\p{Extended_Pictographic}️?/gu); return m && m.length ? m : [String(s)]; };
      const isGlove = function (it) { return !!it && it.id.indexOf('glove') === 0; };
      function mk(id, over) {
        const r = DB[id] || DB.sigh;
        const it = { uid: ++uid, id: r.id, kind: (SPECIAL_IDS[id] && !/^meeting/.test(id) && id !== 'fatigue') ? 'special' : 'normal', emoji: r.emoji, title: r.title, cap: r.cap, sticky: null, split: false, hint: null, applied: false, left: 0, liveAt: 0, said: false };
        if (over) Object.keys(over).forEach(function (k) { it[k] = over[k]; });
        return it; }
      function mkGlove(n) {
        const dist = sv.glove.every(function (x) { return x; });
        const caps = ['Found in a coat that denies ownership.', 'Now claims it was never lost.', 'Recovered from the third ficus.', 'Now wearing a tiny label reading ME.', 'It is a left. It is also a left.', 'Reunited. Please do not sort this.'];
        let id = 'glove', cap = caps[Math.min(n, 5)];
        if (round > 0 && n === 0) cap = round === 1 ? 'New. We have never seen this before. It is slightly warm.' : (round % 2 ? 'In a relationship with a mitten.' : 'Requests to be sorted in private.');
        if (n === 4) id = 'glove-also-left'; else if (n === 5) id = 'glove-reunited'; else if (dist) { id = 'glove-dist'; cap = DB['glove-dist'].cap; }
        const it = mk(id, { gn: n });
        if (id === 'glove') it.title = (n === 0 && round === 0) ? 'A Single Glove (Left, Probably)' : 'A Single Glove';
        it.cap = cap;
        return it; }
      function mkPile() { return mk('pile-of-piles', { minis: [0, 1, 2, 3, 4].map(function () { return glyphs(api.pick(NORMAL).emoji)[0]; }) }); }
      function drawNormal() {
        if (S.beat >= 8 && api.chance(0.667)) { if (!bagA.length) bagA = api.shuffle(ABSTRACT.map(function (r) { return r.id; })); return mk(bagA.pop()); }
        if (!bagN.length) { bagN = api.shuffle(NORMAL.map(function (r) { return r.id; })); if (S.beat >= 5) bagN.splice(api.randInt(0, bagN.length), 0, 'meeting'); }
        return mk(bagN.pop()); }
      function drawItem() {
        if (S.beat >= 2 && api.chance(1 / 40)) return mkPile();
        if (S.beat >= 6 && S.beat < 9 && !S.done.wed) { S.done.wed = 1; return mk('wednesday'); }
        if (S.done.wed && S.beat >= 6 && S.beat < 9 && api.chance(1 / 30)) return mk('wednesday');
        if (S.beat >= 5 && S.beat < 9 && S.done.rubric && api.chance(1 / 25) && api.now() - S.rubricAt > 180000) { S.rubricAt = api.now(); return mk('rubric-original'); }
        return drawNormal(); }
      function refill() { if (S.armed) return; while (queue.length < 3) queue.push(drawItem()); }
      function insertSpecial(it) { if (S.armed && queue.length === 0) return; queue.splice(Math.min(1, queue.length), 0, it); renderGhosts(); }
      function artEl(it) {
        if (it.id === 'wednesday') return el('div', { class: cx('blob') });
        if (it.id === 'tuesday-preview') return el('div', { class: cx('slab') }, el('i'));
        if (it.id === 'pile-of-piles') return el('div', { class: cx('minis'), 'aria-hidden': 'true' }, (it.minis || ['📄']).map(function (g) { return el('span', { text: g }); }));
        if (it.kind === 'fatigue') return el('div', { class: cx('art'), 'aria-hidden': 'true', text: '😴' });
        const g = glyphs(it.emoji);
        return el('div', { class: cx('art'), 'aria-hidden': 'true' }, g[0], g[1] ? el('i', { text: g[1] }) : null); }
      function renderCard(entered) {
        const it = queue[0];
        if (!it) { D.card.hidden = true; D.card.setAttribute('aria-label', 'Nothing left to sort'); return; }
        D.card.hidden = false;
        D.card.className = cx('card', entered && 'enter', it.kind === 'fatigue' && 'fat', selected && 'sel');
        D.card.style.transform = '';
        while (D.card.firstChild) D.card.removeChild(D.card.firstChild);
        D.card.appendChild(el('div', { class: cx('cardfx') }, artEl(it), el('div', { class: cx('title'), text: it.title }), el('div', { class: cx('cap'), text: it.cap }),
          it.sticky ? el('span', { class: cx('sticky'), text: it.sticky.text }) : null, it.kind === 'fatigue' ? el('span', { class: cx('ring') }) : null));
        D.card.appendChild(el('div', { class: cx('tag2'), 'aria-hidden': 'true', text: it.title }));
        D.card.setAttribute('aria-label', cardAria(it, held === 'card')); }
      function renderGhosts() {
        [D.gh1, D.gh2].forEach(function (g, i) {
          const it = queue[i + 1];
          while (g.firstChild) g.removeChild(g.firstChild);
          g.hidden = !it;
          if (it) { g.appendChild(artEl(it)); g.appendChild(el('div', { class: cx('title'), text: it.kind === 'fatigue' ? '???' : it.title })); } }); }
      function paintSorted() { D.sortn.textContent = (S.sorted >= 7 && S.sorted < 8) ? '7 and a half' : halfText(S.sorted); }
      function paintTags() {
        D.ptag.textContent = 'Pile: ' + (S.armed ? queue.length : 23 - (Math.floor(S.sorted) % 20));
        D.otag.textContent = 'Overflow: ' + (6 + Math.floor(S.progress / 10)) + ' (see Annex)';
        paintSorted(); }
      function accStr() {
        const o = S.ovr;
        if (o.withdrawn) return ['ACCURACY: WITHDRAWN', ''];
        if (o.hidden) return ['--', ''];
        const unit = sv.accImportant ? ' IMPORTANT%' : '%';
        if (o.hundred) return [o.hundred, unit];
        return [num(S.acc, DEC[S.beat - 1] === undefined ? 1 : DEC[S.beat - 1]), unit]; }
      function paintAcc(wiggle) {
        const a = accStr();
        D.accn.textContent = a[0]; D.accu.textContent = a[1];
        D.accb.setAttribute('aria-label', 'Accuracy ' + (S.ovr.withdrawn ? 'withdrawn' : S.ovr.hidden ? 'hidden' : a[0] + (sv.accImportant ? ' IMPORTANT percent' : ' percent')));
        toggle(D.accb, 'wd', S.ovr.withdrawn);
        if (wiggle) restart(D.accb, 'wig'); }
      function setBeatClasses() { for (let i = 2; i <= 10; i++) toggle(root, 'g' + i, S.beat >= i); toggle(root, 'slow', S.beat === 9); toggle(root, 'clipon', T.clipOn); }
      /* ---------------- bins ---------------- */
      function labText(b) { if (b.blank) return ''; if (b.lab.ov) return b.lab.ov; return (BASE[b.lab.base] || 'Neither') + (b.lab.suf || ''); }
      function cntText(b) {
        const n = b.count | 0;
        if (b.pos === 0) return n === 0 ? 'none yet (we feel it)' : (n === 1 ? '1 item' : n + ' items') + (n >= 3 ? ' (and a feeling)' : '');
        if (b.pos === 1) return n === 0 ? 'none yet (hurry)' : n + ' and a half';
        if (b.pos === 2) return n === 0 ? 'none yet, no rush' : n <= 3 ? n + ', in no rush' : 'Many, but we are in no rush';
        return n + ' so far. ' + n + ' later.'; }
      function paintBin(b) {
        if (!b || !b.el) return;
        const t = labText(b);
        b.labT.textContent = t;
        b.cntEl.textContent = b.five ? (b.count | 0) + ' kept' : cntText(b);
        b.el.setAttribute('aria-label', 'Bin ' + (b.pos + 1) + ', currently labelled ' + (t || 'unlabelled') + ', ' + (b.count | 0) + ' items');
        const tr = Math.min(2, b.trust | 0);
        toggle(b.el, 't1', tr === 1); toggle(b.el, 't2', tr === 2); toggle(b.el, 'uneasy', b.uneasyUntil > api.now()); }
      function paintBins() { bins.forEach(paintBin); if (fifth) paintBin(fifth); }
      function allBins() { return fifth ? bins.concat([fifth]) : bins; }
      function spillAdd(b, it) { b.spillEl.appendChild(el('i', { text: glyphs(it.emoji)[0], style: 'font-style:normal' })); while (b.spillEl.children.length > 6) b.spillEl.removeChild(b.spillEl.firstChild); }
      function setNote(b, text, ms) {
        b.noteEl.textContent = text; b.noteEl.hidden = false;
        later(function () { if (b.noteEl.textContent === text) b.noteEl.hidden = true; }, ms || 8000); }
      function histPush(b) {
        if (b.histRow) b.histRow.struck = true;
        const row = { text: (BASE[b.lab.base] || 'Neither') + (b.lab.suf || ''), struck: false };
        b.histRow = row; hist.unshift(row);
        if (hist.length > 8) hist.length = 8;
        if (lookOpen) renderLook(); }
      function flipLabel(b) { restart(b.labEl, 'flip'); toggle(b.labEl, 'wet', true); later(function () { toggle(b.labEl, 'wet', false); toggle(b.labEl, 'flip', false); }, 2100); }
      function renderLook() {
        while (D.look.firstChild) D.look.removeChild(D.look.firstChild);
        const rows = hist.map(function (r) { return el('li', null, r.struck ? el('s', { text: r.text }) : r.text); });
        rows.push(el('li', null, el('s', { text: 'Please Do Not Use This Bin' })));
        D.look.appendChild(el('h3', { text: 'LABEL HISTORY' }));
        D.look.appendChild(el('ul', null, rows));
        D.look.appendChild(el('div', { text: 'Personal Best (Unverified): ' + num(Math.max(sv.best, 61.8), 1) + '%' }));
        D.look.appendChild(el('div', { text: 'Label Revisions (lifetime): ' + (sv.revLife | 0) })); }
      function markNoticed() { if (api.now() - S.lastSwapAt < 8000 && !S.swapNoticed) { S.swapNoticed = true; T.noticed++; } }
      function toggleLook(force) {
        lookOpen = force === undefined ? !lookOpen : !!force;
        vis(D.look, lookOpen);
        if (lookOpen) { renderLook(); markNoticed(); api.sfx('blip'); } }
      /* ---------------- scoring ---------------- */
      const smell = function (it) { return hash(it.id + ':' + S.seed) % 4; };
      function taped(b) { return S.tapeBin === b.pos && api.now() < S.tapeUntil; }
      function rawScore(it, base, b) {
        let d = Math.abs(smell(it) - base); d = Math.min(d, 4 - d);
        let s = [96, 62, 29][d];
        const dial = S.beat >= 4 ? S.dial : 0;
        if (dial === 1) s = 100 - s; else if (dial === 2) s = s * 0.4 + 8; else if (dial === 3) s = 50 + 70 * Math.sin((hash(it.id) % 97) + S.drops);
        if (S.beat === 2) s += ((hash(it.id + S.drops) % 5) - 2) * 9;
        if (taped(b)) s = s * 0.5 + 25 + (S.policyNo % 7);
        if (S.beat >= 6 && it.hint === b.pos) s -= 9;
        s += api.rand() * 12 - 6;
        return fin(s) ? s : 50; }
      /* ---------------- receipts ---------------- */
      function recHead(r) {
        r.hEl.textContent = '';
        if (r.text) r.hEl.append(r.text, r.mk);
        else r.hEl.append('ACCURACY ' + num(r.fig, r.dec) + '%', r.mk, ' (' + r.den + ', ' + r.a + '/' + r.b + ' present)'); }
      function selectRec(r) { selRec = r; recs.forEach(function (x) { toggle(x.el, 'pick', x === r); }); api.sfx('tick'); }
      function printReceipt(o) {
        const r = { id: ++recId, fig: fin(o.fig) ? o.fig : null, text: o.text || null, dec: DEC[S.beat - 1] || 1, den: D.accd.textContent || UI.accDen[0], appealed: false, ghost: !!o.ghost };
        r.b = api.randInt(1, 4); r.a = api.randInt(1, r.b);
        r.hEl = el('b');
        r.mk = el('span', { class: cx('mk'), 'aria-hidden': 'true', text: MARKS[T.markI++ % 3], onclick: function (e) { e.stopPropagation(); showFoot(r.mk); } });
        recHead(r);
        const kids = [r.hEl];
        if (o.line) kids.push(el('span', { text: o.line }));
        if (o.sandra !== undefined && o.sandra !== null) kids.push(el('span', { text: '= ' + num(o.sandra, 1) + ' Sandra', style: 'display:block' }));
        if (o.taped) kids.push(el('em', { text: 'TAPED BIN SCORING' }));
        if (o.sticky) kids.push(el('span', { class: cx('stk'), text: o.sticky }));
        r.el = el('button', { class: cx('rec'), type: 'button', 'aria-label': 'Receipt: ' + (r.text || ('accuracy ' + num(r.fig, r.dec) + ' percent')) + '. Press Enter to select it for appeal.', onclick: function () { selectRec(r); } }, kids);
        D.rail.appendChild(r.el); recs.push(r); toggle(D.rail, 'has', true);
        try { D.rail.scrollLeft = D.rail.scrollWidth; } catch (e) { /* ignore */ }
        while (recs.length > 5) { const old = recs.shift(); rm(old.el); if (selRec === old) selRec = null; }
        return r; }
      function dropRec(r) { const i = recs.indexOf(r); if (i >= 0) recs.splice(i, 1); rm(r.el); if (selRec === r) selRec = null; toggle(D.rail, 'has', recs.length > 0); }
      /* ---------------- visual helpers for a drop ---------------- */
      function fly(it, b, stampText, legs, src) {
        try {
          const rr = root.getBoundingClientRect(), cr = (src || D.card).getBoundingClientRect(), br = b.el.getBoundingClientRect();
          if (!cr.width || !br.width) return;
          const c = el('div', { class: cx('fly', legs && 'legs'), 'aria-hidden': 'true', style: { left: (cr.left - rr.left) + 'px', top: (cr.top - rr.top) + 'px', width: cr.width + 'px', height: cr.height + 'px' } },
            artEl(it), el('div', { text: it.title.slice(0, 28) }), stampText === false ? null : el('div', { class: cx('stampfx'), text: stampText || 'SORTED' }));
          root.appendChild(c); flies.push(c);
          while (flies.length > 3) rm(flies.shift());
          const dx = (br.left + br.width / 2) - (cr.left + cr.width / 2), dy = (br.top + br.height * 0.4) - (cr.top + cr.height / 2);
          api.setTimeout(function () { c.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(.22) rotate(8deg)'; c.style.opacity = '.15'; }, 380);
          api.setTimeout(function () { rm(c); const i = flies.indexOf(c); if (i >= 0) flies.splice(i, 1); }, 1050);
        } catch (e) { /* layout not ready */ } }
      function resetCardVisual(animate) {
        if (animate) { D.card.style.transition = 'transform .32s cubic-bezier(.3,1.6,.5,1)'; api.setTimeout(function () { D.card.style.transition = ''; }, 360); }
        D.card.style.transform = '';
        toggle(D.card, 'lifted', false);
        bins.concat(fifth ? [fifth] : []).forEach(function (b) { b.el.style.setProperty('--lean', '0'); toggle(b.el, 'open', false); toggle(b.el, 'thumbs', false); });
        toggle(D.adv, 'over', false); }
      function bounceCard() { restart(D.card, 'shake'); api.sfx('boing'); }
      function ribbon(text, buzz) { D.ribbon.textContent = text; restart(D.ribbon, 'on'); if (buzz) api.sfx('buzz'); if (ribbonT) api.clearTimeout(ribbonT); ribbonT = api.setTimeout(function () { ribbonT = 0; toggle(D.ribbon, 'on', false); }, 2700); }
      function bubble(text, anchor, ms) {
        D.bub.textContent = String(text); D.bub.hidden = false;
        try {
          const rr = root.getBoundingClientRect(), r = anchor.getBoundingClientRect();
          D.bub.style.left = clamp(r.left - rr.left + r.width / 2, 100, Math.max(100, rr.width - 100)) + 'px';
          D.bub.style.top = Math.max(2, r.top - rr.top - 34) + 'px';
        } catch (e) { /* ignore */ }
        D.bub.style.animation = 'none'; void D.bub.offsetWidth; D.bub.style.animation = '';
        if (bubT) api.clearTimeout(bubT);
        bubT = api.setTimeout(function () { bubT = 0; D.bub.hidden = true; }, ms || 3000); }
      function showFoot(target) {
        let i = api.randInt(0, UI.foot.length - 1);
        if (i === T.lastFoot) i = (i + 1) % UI.foot.length;
        T.lastFoot = i;
        D.fnb.textContent = UI.foot[i]; D.fnb.hidden = false;
        try { const rr = root.getBoundingClientRect(), r = target.getBoundingClientRect(); D.fnb.style.left = clamp(r.left - rr.left, 6, Math.max(6, rr.width - 190)) + 'px'; D.fnb.style.top = (r.bottom - rr.top + 4) + 'px'; } catch (e) { /* ignore */ }
        api.sfx('pop');
        if (fnT) api.clearTimeout(fnT);
        fnT = api.setTimeout(function () { fnT = 0; D.fnb.hidden = true; }, 3200); }
      /* ---------------- the drop pipeline ---------------- */
      function lockReason() {
        const now = api.now(), it = queue[0];
        if (S.ending || S.cob) return 'ending';
        if (now < S.breakUntil) return 'break';
        if (now < S.unionUntil) return 'union';
        if (it && it.kind === 'fatigue') return 'fatigue';
        if (it && it.id === 'wednesday' && now < it.liveAt + 4000) return 'wednesday';
        return null; }
      function refuse(why) {
        if (why === 'ending' || why === 'break') return false;
        bounceCard();
        const now = api.now();
        if (now - T.refuseAt < 1800) return false;
        T.refuseAt = now;
        if (why === 'fatigue') sayC('fatigue', 'confused', 0);
        else if (why === 'union') sayC('union', 'disappointed', 0);
        else if (why === 'wednesday') sayT(ORD.wednesday[0], 'confused', 0);
        return false; }
      function creditProgress(now) { if (now - S.lastCredit >= 2000) { S.lastCredit = now; S.progress += 4; } }
      function addSorted(n) {
        const before = S.sortedInt;
        S.sorted += n; S.sortedInt += Math.floor(n); sv.total += Math.floor(n);
        api.stat.inc('sort-the-pile.sorted', Math.floor(n));
        if (Math.floor(S.sortedInt / 25) > Math.floor(before / 25)) {
          const pay = api.now() - T.bonusAt >= 8000;  /* a bonus every few seconds is not "quarterly": autoclickers get the bell, not the Meh */
          if (pay) { T.bonusAt = api.now(); api.award(5, 'Quarterly Sorting Bonus'); }
          api.sfx('bell'); api.confetti(undefined, undefined, 16);
          sayC('bonus', 'proud', 1, { count: S.sortedInt }); }
        if (S.sorted >= 7 && !S.sevenFired) { S.sevenFired = true; api.sfx('bell'); sayC('seven', 'proud', 1); } }
      function commitDrop(it, pos, via) { if (!it || it !== queue[0]) return false;
        const why = lockReason();
        if (why) return refuse(why);
        let b = pos === 4 ? fifth : bins[pos];
        if (!b) return false;
        if (it.id === 'missing-sock' && pos !== 3) { bounceCard(); resetCardVisual(true); clearHeld(); sayC('sock', 'confused', 1); return false; }
        if (it.gerald || it.id === 'gerald') b = bins[3];
        if (b.five && (it.id === 'glove-reunited' || it.id === 'did-well')) { bounceCard(); clearHeld(); resetCardVisual(true); return false; }
        clearHeld();
        if (b.five) return dropFifth(it);
        if (it.id === 'glove-reunited') return dropReunited(it, b);
        if (it.id === 'did-well') return dropDidWell(it, b);
        if (it.id === 'rubric-original' || it.id === 'rubric-draft') return dropRubric(it, b);
        if (it.id === 'pile-of-piles') return dropPile(it, b);
        return sortNormal(it, b, via); }
      function finishDrop(it, b, stampText) {
        fly(it, b, stampText); restart(b.el, 'bump');
        resetCardVisual(false); vis(D.hint, false);
        api.sfx('stamp');
        nextCard();
        save(); }
      function sortNormal(it, b, via) {
        const now = api.now(), pos = b.pos, gapMs = now - S.lastDropAt;
        S.drops++; creditProgress(now); S.lastDropAt = now; T.settled = false;
        spamD.push(now); if (spamD.length > 30) spamD.shift();
        checkSpam();
        const scripted = S.drops <= 3;
        const second = !!(it.sticky && it.sticky.kind === 'pending' && it.sticky.base !== null);
        const base = second ? it.sticky.base : b.lab.base;
        let raw;
        if (scripted) raw = [74.2, 57.9, 66.5][S.drops - 1];
        else if (it.applied && it.left > 0) raw = 100;
        else raw = rawScore(it, base, b);
        const consensus = !scripted && S.beat >= 6 && it.hint === pos;
        const wasTaped = taped(b);
        let capped = false;
        if (scripted) S.acc = [63.4, 59.9, 64.2][S.drops - 1];
        else { let a = S.acc * 0.72 + clamp(raw, 0, 100) * 0.28; if (a > 94.7) { a = 94.7; capped = true; } S.acc = clamp(a, 4, 94.7); }
        if (S.acc > sv.best) sv.best = S.acc;
        const prevRaw = b.lastRaw; b.lastRaw = raw;
        b.count++; b.trust++; spillAdd(b, it);
        const n = second ? 2 : 1;
        addSorted(n);
        if (it.id === 'sigh') { sv.sigh[pos] = 1; if (sv.sigh.every(function (x) { return x; })) api.achieve('sort-the-pile.sigh'); }
        let gloveEv = false;
        if (isGlove(it)) { sv.glove[pos] = 1; if (sv.glove.every(function (x) { return x; })) { api.achieve('sort-the-pile.distinguished-glove'); if (!S.done.dist) { S.done.dist = 1; gloveEv = 'dist'; toggle(bins[3].el, 'wave', true); later(function () { toggle(bins[3].el, 'wave', false); }, 3000); } } else if (api.chance(0.5)) gloveEv = 'sort'; }
        /* peel tell, swap */
        let swapKind = null;
        if (S.beat >= 3 && pos < 3) {
          if (b.trust >= 3 && now >= S.noSwapUntil) swapKind = doSwap(b);
          else if (b.trust === 2) { restart(b.labEl, 'peel'); api.sfx('tick'); if (api.chance(0.25)) sayC('swapTell', 'confused', 0); later(function () { toggle(b.labEl, 'peel', false); }, 1300); } }
        /* receipt */
        const figV = clamp(raw, -25, 125);
        let o = { line: (it.title.length > 26 ? it.title.slice(0, 25) + '…' : it.title) + ' → ' + (labText(b) || 'Bin'), fig: figV, taped: wasTaped };
        if (S.drops > 3 && api.chance(1 / 14)) { o.text = 'ACCURACY: SEE ATTACHED'; o.fig = null; }
        else if (S.beat >= 8 && api.chance(0.5)) { o.text = api.pick(UI.binWords); o.fig = null; }
        if (S.beat >= 7 && o.fig !== null) o.sandra = clamp(raw, 0, 100) / 16.7;
        printReceipt(o);
        if (figV > 100) api.achieve('sort-the-pile.over-100');
        announce('Sorted into ' + (labText(b) || 'a bin') + '. ' + (o.text ? o.text + '.' : 'Accuracy ' + num(figV, DEC[S.beat - 1] || 1) + '%.'));
        /* dial, meeting split, drawer, sock, gerald */
        let ev = swapKind === 'rotate' ? 'swapRotate' : swapKind === 'shared' ? 'dupImportant' : swapKind === 'formerly' ? 'formerly' : null;
        if (S.beat >= 4 && S.drops % 8 === 0) { S.dial = (S.dial + 1) % 4; paintDial(); if (!ev) { sayT(L.dial[S.dial === 0 ? 4 : S.dial], 'confused', 1); ev = 'done'; } }
        if (it.id === 'meeting' && !it.split) { queue.splice(1, 0, mk('meeting-minutes', { split: true }), mk('meeting-actions', { split: true })); if (!ev) ev = 'meeting'; }
        if (capped && !ev) { S.capN++; if (S.capN % 5 === 1) ev = 'cap'; }
        if (wasTaped && !ev && api.chance(0.4)) ev = 'audit';
        if (second && !ev) ev = 'stickyFinal';
        if (gloveEv && !ev) ev = gloveEv === 'dist' ? 'gloveDist' : 'gloveSort';
        if (consensus && !ev) ev = 'argue';
        if (it.id === 'gerald' || it.gerald) { sayT(api.pick(UI.gerald), 'smug', 1, 'Gerald'); later(function () { sayC('geraldDone', 'smug', 1); }, 1800); ev = 'done'; }
        else if (it.id === 'missing-sock') { b.noteEl.textContent = 'Pending (Journey)'; b.noteEl.hidden = false; later(function () { b.noteEl.hidden = true; }, 6000); sayC('sockDone', 'confused', 1); ev = 'done'; }
        else if (it.id === 'tuesday-preview') { sayT(ITEMLINE['tuesday-preview'], 'confused', 1); ev = 'done'; }
        else if (it.id === 'wednesday') { sayT(ORD.wednesday[4], 'smug', 1); ev = 'done'; }
        else if (it.id === 'anniv') { api.award(3, 'Service'); api.confetti(); api.sfx('tada'); sayC('min3Sort', 'proud', 1); ev = 'done'; }
        else if (it.id === 'plaque') { api.award(10, 'Service'); api.confetti(undefined, undefined, 40); api.sfx('fanfare'); sayC('min10Sort', 'proud', 2); api.achieve('sort-the-pile.ten-minutes'); ev = 'done'; }
        if (ev !== 'done') reactDrop(it, b, raw, prevRaw, ev);
        /* pending drawer: first drop (no sticky yet) from beat 4 */
        const toDrawer = pos === 3 && S.beat >= 4 && !it.sticky && it.kind === 'normal' && !it.split && !it.applied;
        const mehv = clamp(0.2 + 1.3 * clamp(raw, 0, 100) / 100, 0.2, 1.5);
        api.award(gapMs < 800 ? mehv * 0.15 : mehv, 'sort');
        S.prevTitle = it.title;
        if (it.applied) { it.left--; if (it.left > 0) queue.splice(Math.min(2, queue.length), 0, it); else it.applied = false; if (!it.left) it.sticky = null; }
        if (toDrawer) { sendToDrawer(it); }
        wiggleAcc();
        paintBin(b); paintBins(); paintTags(); paintAcc(true); paintRub();
        finishDrop(it, b, it.id === 'gerald' ? 'THANK YOU' : null);
        if (toDrawer && S.beat >= 4) { /* drawer line is said after the drop line */ if (!S.done.drawerSaid) { S.done.drawerSaid = 1; sayC('drawer', 'smug', 1); } } }
      function wiggleAcc() { restart(D.sortn, 'wig'); }
      function reactDrop(it, b, raw, prevRaw, ev) {
        if (S.drops <= 3) { sayT(ORD.firstDrop[S.drops - 1], 'smug', 1); return; }
        if (ev) { sayC(ev, ev === 'cap' || ev === 'stickyFinal' || ev === 'gloveSort' || ev === 'argue' ? 'smug' : ev === 'gloveDist' ? 'proud' : 'confused', 1); return; }
        const pk = it.id + ':' + (b.lab.ov ? 'x' : b.lab.base);
        if (PAIR[pk] && !S.done['pair' + pk] && api.chance(0.6)) { S.done['pair' + pk] = 1; sayT(PAIR[pk], 'smug', 0); return; }
        if (api.chance(0.2)) {
          if (raw >= 85) { sayC('accHigh', 'smug', 0); return; }
          if (raw <= 20) { sayC('accLow', 'smug', 0); return; }
          if (prevRaw !== null && prevRaw - raw >= 35) { sayC('accDrop', 'confused', 0); return; } }
        if (api.chance(0.35)) { sayC(['binImportant', 'binUrgent', 'binNeither', 'binPending'][b.lab.base] || 'drop', 'smug', 0); return; }
        if (api.chance(0.15)) { sayC('acc', 'neutral', 0); return; }
        if (S.beat >= 7 && api.chance(0.1)) { sayC('sandraUnits', 'smug', 0); return; }
        sayC('drop', 'smug', 0); }
      /* ---------------- label swaps ---------------- */
      function doSwap(b) {
        const mid = [bins[0], bins[1], bins[2]];
        let kind = S.swaps < 2 ? 'pair' : S.swaps < 5 ? 'rotate' : (!S.sharedDone ? (S.beat >= 8 ? 'shared' : 'rotate') : 'formerly');
        if (S.shared && (b === S.shared.a || b === S.shared.b)) {
          /* revert: give the label nobody holds any more back to a duplicate (prefer the shared Neither-box), so the three words stay a permutation */
          const have = mid.map(function (x) { return x.lab.base; });
          const lost = [0, 1, 2].filter(function (w) { return have.indexOf(w) < 0; })[0];
          if (lost !== undefined) { const dup = [S.shared.b, S.shared.a].concat(mid).filter(function (x) { return have.filter(function (h) { return h === x.lab.base; }).length > 1; })[0]; if (dup) dup.lab.base = lost; }
          S.shared = null; kind = 'pair'; }
        let involved = [b];
        const pairSwap = function () {
          const others = mid.filter(function (x) { return x !== b; });
          const o = api.pick(others);
          const t = b.lab.base; b.lab.base = o.lab.base; o.lab.base = t;
          involved = [b, o]; };
        if (kind === 'pair' || kind === 'formerly') pairSwap();
        else if (kind === 'rotate') {
          const bs = mid.map(function (x) { return x.lab.base; }), fwd = api.chance(0.5);
          mid.forEach(function (x, i) { x.lab.base = bs[(i + (fwd ? 2 : 1)) % 3]; });
          involved = mid.slice();
        } else if (kind === 'shared') {
          const ia = mid.filter(function (x) { return x.lab.base === 0; })[0], nb = mid.filter(function (x) { return x.lab.base === 2; })[0];
          if (ia && nb) { nb.lab.base = 0; S.shared = { a: ia, b: nb }; S.sharedDone = true; involved = [ia, nb, b]; }
          else { pairSwap(); kind = 'pair'; } }
        involved.forEach(function (x) { x.lab.suf = ''; });
        if (kind === 'formerly') b.lab.suf = ' (formerly ' + (S.prevTitle || 'A Glove') + ')';
        S.swaps++; T.swaps++; sv.revLife++; S.rev++;
        S.seed = api.randInt(1, 999999); S.lastSwapAt = api.now(); S.swapNoticed = false;
        api.stat.inc('sort-the-pile.swaps');
        mid.forEach(function (x) { x.trust = 0; });
        involved.forEach(function (x) { x.uneasyUntil = api.now() + 2000; histPush(x); flipLabel(x); paintBin(x); later(function () { paintBin(x); }, 2100); });
        api.sfx('whoosh');
        D.revs.textContent = 'Label Revisions: ' + S.rev;
        if (T.swaps % 10 === 0) announce('Labels may have changed.');
        if (T.swaps >= 5) api.achieve('sort-the-pile.labels-moved');
        if (S.swaps === 5) setNote(b, 'I am the clause.', 9000);
        const n = S.swaps;
        later(function () {
          if (S.swapNoticed) sayC('swapNoticed', 'smug', 1);
          else { const t = ORD.perPolicy[Math.min(n - 1, ORD.perPolicy.length - 1)]; S.lastPolicy = t; sayT(t, 'confused', 1); paintRub(); }
        }, api.randInt(6000, 9000));
        return kind; }
      /* ---------------- Pending: the drawer ---------------- */
      function paintDrawer() { D.drawCards.textContent = drawer.map(function (it) { return glyphs(it.emoji)[0]; }).join(''); }
      function sendToDrawer(it) {
        S.done.pendingN = (S.done.pendingN || 0) + 1;
        api.stat.inc('sort-the-pile.pending');
        if (drawer.length >= 3) returnFromDrawer(drawer[0]);
        drawer.push(it); paintDrawer();
        later(function () { returnFromDrawer(it); }, api.randInt(4000, 6000)); }
      function returnFromDrawer(it) {
        const i = drawer.indexOf(it);
        if (i < 0) return;
        drawer.splice(i, 1); paintDrawer();
        if (S.ending || S.cob) return;
        const bs = api.randInt(0, 2);
        it.sticky = { base: bs, text: BASE[bs] + ' (Pending)', kind: 'pending' };
        queue.splice(Math.min(1, queue.length), 0, it);
        api.sfx('ding'); sayC('drawerBack', 'confused', 1);
        renderGhosts(); }
      function relabelPending(suf) {
        const b = bins[3];
        b.lab.suf = suf !== undefined ? suf : (S.sufIdx < UI.suf.length ? UI.suf[S.sufIdx] : UI.suf[3 + api.randInt(0, 2)]);
        if (suf === undefined) S.sufIdx++;
        histPush(b); restart(b.labEl, 'peel'); flipLabel(b); paintBin(b); api.sfx('tick');
        later(function () { toggle(b.labEl, 'peel', false); }, 1300);
        sayC('relabel', 'confused', 0); }
      /* ---------------- going to the next card ---------------- */
      function onLive(it) {
        if (!it) return;
        it.liveAt = api.now();
        if (S.beat >= 6 && it.kind === 'normal' && it.hint === null) it.hint = api.chance(1 / 6) ? smell(it) : (smell(it) + 1 + api.randInt(0, 2)) % 4;
        if (it.said) return;
        it.said = true;
        if (isGlove(it) && it.gn > 0) sayT(ORD.glove[Math.min(it.gn, 5) - 1], it.gn === 5 ? 'proud' : 'neutral', 1);
        else if (it.id === 'gerald') {
          it.gerald = true;
          sayC(api.flag.get('metGerald') ? 'geraldBack' : 'geraldMgmt', 'smug', 1); api.flag.set('metGerald', true);
          toggle(D.stage, 'tilt', true); later(function () { toggle(D.stage, 'tilt', false); }, 3000);
          later(function () { geraldCheck(it); }, 3000);
        } else if (it.id === 'missing-sock') {
          api.flag.set('sort-the-pile.sockMet', true); sayC('sockHere', 'confused', 1);
          if (api.flag.get('sockSeen') || api.stat.get('sock-matcher.entered') > 0) later(function () { sayC('sockKevin', 'neutral', 0); }, 3500);
        } else if (it.id === 'rubric-original') sayC('rubricOriginal', 'smug', 1);
        else if (it.id === 'wednesday') { T.refuseAt = api.now(); sayT(ORD.wednesday[0], 'confused', 1); }
        else if (it.id === 'pile-of-piles') sayT(ORD.pileOfPilesArr[0], 'confused', 0);
        else if (it.id === 'tuesday-preview') sayT(ITEMLINE['tuesday-preview'], 'confused', 1);
        else if (it.id === 'did-well') { bins.forEach(function (b, i) { toggle(b.el, 'open', true); b.el.style.setProperty('--lean', i % 2 ? '-3' : '3'); }); sayT(ORD.touch[4], 'proud', 1); }
        else if (it.kind === 'normal' && CALLS[it.id] && !S.done['cb' + it.id] && known(CALLS[it.id][0], CALLS[it.id][1])) { S.done['cb' + it.id] = 1; sayC(CALLS[it.id][2], 'smug', 1); }
        else if (it.kind === 'normal' && ITEMLINE[it.id] && api.chance(S.drops <= 15 ? 0.5 : 0.3)) sayT(ITEMLINE[it.id], 'confused', 0); }
      function geraldCheck(it) {
        if (queue[0] !== it) return;
        if (api.now() - lastInput >= 2500 || S.armed) { if (commitDrop(it, 3, 'auto')) return; }
        later(function () { geraldCheck(it); }, 1000); }
      function applyFatigue() {
        const it = queue[0];
        if (S.fatigueLeft > 0 && it && it.kind === 'normal') {
          S.fatigueLeft--;
          const f = mk('fatigue', { kind: 'fatigue', inner: it });
          queue[0] = f;
          later(function () { if (queue[0] === f) { queue[0] = f.inner; onLive(f.inner); renderCard(true); if (api.chance(0.5)) sayC('fatigueEnd', 'neutral', 0); } }, 3000); } }
      function nextCard() {
        cancelDrag(); clearHeld(); selected = false;
        queue.shift();
        refill(); applyFatigue();
        onLive(queue[0]);
        renderCard(true); renderGhosts(); paintTags(); checkIntro();
        if (!queue.length && S.armed) startEnding(); }
      const plainGlove = function (g) { return !!g && (g.id === 'glove' || g.id === 'glove-dist' || g.id === 'glove-also-left'); };
      function checkIntro() { const a = queue[0], g = queue[1]; vis(D.intro, !!(a && a.id === 'missing-sock' && plainGlove(g))); }
      function introduce() {
        const a = queue[0], g = queue[1];
        if (!a || a.id !== 'missing-sock' || !plainGlove(g) || lockReason()) return;
        queue.splice(1, 1);
        S.drops++; creditProgress(api.now()); addSorted(2); if (S.noSwapUntil !== Infinity) S.noSwapUntil = api.now() + 30000;
        printReceipt({ text: 'A REASONABLY MATCHED SET (TECHNICALLY)', line: 'COLLECTIVE' });
        api.award(1.5, 'Matched Set'); sayC('match', 'confused', 1);
        fly(a, bins[3], 'MATCHED'); resetCardVisual(false); nextCard(); paintTags(); save(); }
      /* ---------------- holding things (mouse, touch, keyboard) ---------------- */
      function stamp() { lastInput = api.now(); if (idleTier > 0) undoIdle(); }
      function inRoot(e) { return !!(e && e.target && e.target.nodeType === 1 && root.contains(e.target)); }
      function inRect(n, x, y, slop) {
        if (!n) return false;
        const r = n.getBoundingClientRect(), s = slop || 0;
        return r.width > 0 && x >= r.left - s && x <= r.right + s && y >= r.top - s && y <= r.bottom + s; }
      function binAt(x, y) {
        let best = -1, bd = 1e9;
        allBins().forEach(function (b) {
          const r = b.el.getBoundingClientRect();
          if (!r.width) return;
          if (x >= r.left - 16 && x <= r.right + 16 && y >= r.top - 16 && y <= r.bottom + 16) {
            const d = Math.hypot(x - (r.left + r.right) / 2, y - (r.top + r.bottom) / 2);
            if (d < bd) { bd = d; best = b.pos; } } });
        return best; }
      function setCursor(i) {
        cursor = clamp(i, 0, fifth ? 4 : 3);
        allBins().forEach(function (b) { toggle(b.el, 'cursor', !!held && b.pos === cursor); });
        if (held) api.sfx('tick'); }
      function clearHeld() {
        held = null; stickerFrom = -1;
        allBins().forEach(function (b) { toggle(b.el, 'cursor', false); toggle(b.labEl, 'lift', false); });
        toggle(D.card, 'lifted', false); toggle(D.accb, 'lift', false);
        const q0 = queue[0]; if (q0 && !D.card.hidden) D.card.setAttribute('aria-label', cardAria(q0, false)); }
      function liftCard() {
        const it = queue[0];
        if (!it || lockReason()) return;
        clearHeld(); held = 'card'; selected = false; toggle(D.card, 'sel', false); toggle(D.card, 'lifted', true);
        setCursor(cursor);
        api.sfx('blip'); announce('Lifted: ' + it.title + '. Choose a bin.'); D.card.setAttribute('aria-label', cardAria(it, true));
        if (!it.lifted) { it.lifted = true; firstLift(it); if (it.id === 'wednesday') sayT(ORD.wednesday[1], 'confused', 0); else if (api.chance(0.4)) sayC('lift', 'neutral', 0); } }
      function firstLift(it) {
        if (T.liftRec || S.drops > 0 || !it || it.kind !== 'normal') return;
        T.liftRec = true; printReceipt({ text: 'ACCURACY: PENDING (ITEM STILL HELD)', line: it.title.slice(0, 28) }); }
      function cardClick() {
        if (api.now() - lastUp < 500) return;
        stamp();
        const it = queue[0];
        if (!it) return;
        const why = lockReason();
        if (why) { refuse(why); return; }
        if (held === 'card') { commitDrop(it, cursor, 'key'); return; }
        if (held === 'sticker') { applySticker(stickerFrom); return; }
        if (held) { clearHeld(); return; }
        liftCard(); }
      function selectCardClick() {
        const why = lockReason();
        if (why) { refuse(why); return; }
        selected = !selected; toggle(D.card, 'sel', selected);
        if (selected) { api.sfx('blip'); sayC('select', 'neutral', 0); announce('Selected. Choose a bin.'); } }
      function binClick(b) {
        if (api.now() < suppressUntil) return;
        stamp();
        if (held === 'acc') { sortAcc(b.pos); return; }
        if (held === 'sticker') { if (stickerFrom === b.pos && b.pos === 3) selfSort(); else clearHeld(); return; }
        const it = queue[0];
        if (it) commitDrop(it, b.pos, 'click'); }
      function accClick(e) {
        if (api.now() < suppressUntil) return;
        stamp();
        if (held === 'acc') { if (e && e.detail === 0 && cursor <= (fifth ? 4 : 3)) sortAcc(cursor); else clearHeld(); return; }
        if (S.cob || S.ending) return;
        clearHeld(); held = 'acc'; toggle(D.accb, 'lift', true); setCursor(cursor);
        api.sfx('blip'); announce('Holding the accuracy figure. Choose a bin.'); }
      function dropHeld() {
        if (held === 'card') commitDrop(queue[0], cursor, 'key');
        else if (held === 'acc') sortAcc(cursor);
        else if (held === 'sticker') applySticker(stickerFrom); }
      function cancelDrag() {
        if (!drag) return;
        const d = drag; drag = null;
        if (d.raf) api.cancelAnimationFrame(d.raf);
        unlater(d.hold);
        rm(D.stkg); D.stkg = null;
        resetCardVisual(true); clearHeld(); }
      function onPDown(e) {
        if (!inRoot(e)) return;
        stamp();
        const now = api.now();
        spamP.push(now); if (spamP.length > 30) spamP.shift();
        if (spamP.filter(function (t) { return now - t < 2000; }).length >= 9 && now - T.twitchAt > 15000) { T.twitchAt = now; sayC('twitch', 'confused', 1); }
        checkSpam();
        if (e.button > 0 && e.pointerType === 'mouse') return;
        if (drag) cancelDrag();
        const t = e.target;
        if (!t || !t.closest) return;
        let kind = null, src = -1, cap = null;
        if (t.closest('.' + K + 'card')) { kind = 'card'; cap = D.card; }
        else if (t.closest('.' + K + 'accb')) { kind = 'acc'; cap = D.accb; }
        else { const lab = t.closest('.' + K + 'lab'); const sb = bins.filter(function (b) { return b.labEl === lab; })[0]; if (sb) { kind = 'sticker'; src = sb.pos; cap = lab; } }
        if (!kind) return;
        if (kind === 'card') { const why = lockReason(); if (why) { if (why === 'wednesday') restart(D.card, 'jig'); refuse(why); return; } if (!queue[0]) return; }
        else if (S.cob || S.ending) return;
        drag = { kind: kind, src: src, x0: fin(e.clientX) ? e.clientX : 0, y0: fin(e.clientY) ? e.clientY : 0, px: 0, py: 0, moved: false, touch: e.pointerType === 'touch', raf: 0, lx: 0, ly: 0, lastX: 0, lastT: now, rot: 0, over: -1 };
        drag.px = drag.x0; drag.py = drag.y0; drag.lastX = drag.x0;
        if (kind === 'card') drag.hold = later(holdLight, 500);
        try { if (cap && cap.setPointerCapture && e.pointerId !== undefined) cap.setPointerCapture(e.pointerId); } catch (er) { /* synthetic pointer: fine */ } }
      function startMove() {
        const d = drag;
        if (d.kind === 'card') {
          clearHeld(); held = 'card'; selected = false; toggle(D.card, 'sel', false); toggle(D.card, 'lifted', true);
          api.sfx('blip');
          const it = queue[0];
          if (it && !it.lifted) { it.lifted = true; firstLift(it); if (it.id === 'wednesday') sayT(ORD.wednesday[1], 'confused', 0); else if (api.chance(0.4)) sayC('lift', 'neutral', 0); }
          announce('Lifted: ' + (it ? it.title : 'item') + '. Choose a bin.'); if (it) D.card.setAttribute('aria-label', cardAria(it, true));
        } else {
          clearHeld(); held = d.kind;
          const txt = d.kind === 'acc' ? accStr()[0] + accStr()[1] : (labText(bins[d.src]) || BASE[bins[d.src].lab.base]);
          D.stkg = el('div', { class: cx('bub'), 'aria-hidden': 'true', text: txt, style: 'z-index:99;animation:none' });
          root.appendChild(D.stkg);
          if (d.kind === 'sticker') toggle(bins[d.src].labEl, 'lift', true); else toggle(D.accb, 'lift', true);
          api.sfx('blip'); } }
      function nearBins(x, y) {
        const it = queue[0];
        let hit = -1;
        allBins().forEach(function (b) {
          const r = b.el.getBoundingClientRect();
          if (!r.width) return;
          const mx = (r.left + r.right) / 2, my = (r.top + r.bottom) / 2, d = Math.hypot(x - mx, y - my), lim = 120 + r.width / 4;
          const near = d < lim, k = [1, 0.8, 1.25, 0.9, 1][b.pos] || 1;
          b.el.style.setProperty('--lean', near ? ((1 - d / lim) * 6 * k * (x < mx ? -1 : 1)).toFixed(2) : '0');
          toggle(b.el, 'open', near);
          toggle(b.el, 'thumbs', !!(near && it && S.beat >= 6 && it.hint === b.pos));
          if (x >= r.left - 16 && x <= r.right + 16 && y >= r.top - 16 && y <= r.bottom + 16) hit = b.pos; });
        if (drag && hit !== drag.over) { if (hit >= 0) api.sfx('tick'); drag.over = hit; } }
      function dragFrame() {
        if (!drag) return;
        const d = drag; d.raf = 0;
        const now = api.now(), dt = Math.max(16, now - d.lastT);
        const lift = d.touch ? 40 : 0;
        if (d.kind === 'card') {
          const it = queue[0];
          if (!it) { cancelDrag(); return; }
          let tx = d.px - d.x0, ty = d.py - d.y0 - lift, again = false;
          if (it.id === 'wednesday') {
            const k = 1 - Math.pow(0.88, dt / 16.7);
            d.lx += (tx - d.lx) * k; d.ly += (ty - d.ly) * k;
            again = Math.abs(tx - d.lx) + Math.abs(ty - d.ly) > 1.5;
            tx = d.lx; ty = d.ly + (rmo() ? 0 : Math.sin(now / 250) * 4); }
          const vel = (d.px - d.lastX) / dt * 1000;
          d.rot = d.rot * 0.6 + clamp(vel / 600 * 3, -9, 9) * 0.4;
          D.card.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) rotate(' + ((rmo() || !fin(d.rot)) ? 0 : d.rot).toFixed(2) + 'deg)';
          d.lastX = d.px; d.lastT = now;
          nearBins(d.px, d.py - lift);
          toggle(D.adv, 'over', inRect(D.adv, d.px, d.py - lift));
          if (again) d.raf = api.requestAnimationFrame(dragFrame);
        } else if (D.stkg) {
          try { const rr = root.getBoundingClientRect(); D.stkg.style.left = (d.px - rr.left - 30) + 'px'; D.stkg.style.top = (d.py - rr.top - 44) + 'px'; D.stkg.style.transform = 'none'; } catch (e) { /* ignore */ }
          nearBins(d.px, d.py); } }
      function onPMove(e) {
        if (inRoot(e)) { lastInput = api.now(); if (idleTier > 0) undoIdle(); }
        if (!drag) return;
        if (fin(e.clientX)) drag.px = e.clientX;
        if (fin(e.clientY)) drag.py = e.clientY;
        if (!drag.moved) { if (Math.hypot(drag.px - drag.x0, drag.py - drag.y0) < 6) return; drag.moved = true; if (drag.hold) { unlater(drag.hold); drag.hold = 0; } startMove(); }
        if (!drag.raf) drag.raf = api.requestAnimationFrame(dragFrame); }
      function onPUp(e) {
        if (!drag) return;
        const d = drag; drag = null;
        if (d.raf) api.cancelAnimationFrame(d.raf);
        unlater(d.hold);
        const x = fin(e.clientX) ? e.clientX : d.px, y = (fin(e.clientY) ? e.clientY : d.py) - (d.touch ? 40 : 0);
        lastUp = api.now(); lastInput = lastUp;
        rm(D.stkg); D.stkg = null;
        if (d.kind === 'card') {
          if (!d.moved) { resetCardVisual(false); if (!d.lit) selectCardClick(); return; }
          releaseCard(x, y);
        } else {
          clearHeld();
          if (!d.moved) return;
          suppressUntil = api.now() + 400;
          if (d.kind === 'sticker') {
            if (inRect(D.card, x, y, 24) && queue[0] && !D.card.hidden) applySticker(d.src);
            else if (binAt(x, y) === 3 && d.src === 3) selfSort();
            else api.sfx('boing');
          } else { const p = binAt(x, y); if (p >= 0) sortAcc(p); else api.sfx('boing'); }
          resetCardVisual(false); } }
      function releaseCard(x, y) {
        const it = queue[0];
        if (!it) { resetCardVisual(false); clearHeld(); return; }
        const pos = binAt(x, y);
        if (pos >= 0) { commitDrop(it, pos, 'drag'); if (queue[0] === it) { clearHeld(); resetCardVisual(true); } return; }
        clearHeld();
        if (inRect(D.adv, x, y)) { resetCardVisual(false); advise(it); return; }
        if (inRect(D.stage, x, y)) { resetCardVisual(true); trayDrop(it); return; }
        returnCard(); }
      function returnCard() {
        resetCardVisual(true); api.sfx('boing'); announce('Returned to the pile.');
        if (api.chance(0.4)) sayC('returned', 'neutral', 0); }
      function trayDrop(it) {
        const why = lockReason();
        if (why) { refuse(why); return; }
        if (S.armed) { returnCard(); return; }
        if (it.id === 'pile-of-piles') {
          for (let i = 0; i < 5 && queue.length < 40; i++) queue.push(drawNormal());
          sayT(ORD.pileOfPilesArr[1], 'confused', 1); api.sfx('pop'); renderGhosts(); paintTags(); return; }
        if (S.beat >= 8 && it.kind !== 'fatigue') {
          S.sorted += 0.5; T.sideways++; api.stat.inc('sort-the-pile.sideways');
          sayC('sideways', 'smug', 1); api.sfx('whoosh');
          queue.push(it); nextCard(); save();
          return; }
        returnCard(); }
      function advise(it) {
        const why = lockReason();
        if (why) { refuse(why); return; }
        if (!it || it !== queue[0]) return;
        if (it.id === 'glove-reunited' || it.id === 'did-well') { returnCard(); return; }
        clearHeld(); vis(D.adv, true);
        if (adv.length < 12) adv.push(it);
        sv.advisements++; api.stat.inc('sort-the-pile.advisement');
        D.advn.textContent = 'Under Advisement: ' + adv.length;
        if (sv.advisements === 3) { api.achieve('sort-the-pile.under-advisement'); sayT(ORD.advisement[2], 'confused', 1); }
        else if (sv.advisements === 1) sayT(ORD.advisement[0], 'confused', 1);
        else sayC('advisement', 'confused', 0);
        api.sfx('pop'); resetCardVisual(false); nextCard(); save(); }
      function sortAcc(pos) {
        clearHeld();
        const b = pos === 4 ? fifth : bins[pos];
        if (!b) return;
        if (sv.accImportant) { sayT(L.accSorted[1], 'proud', 0); return; }
        sv.accImportant = true; paintAcc(true); api.sfx('stamp'); api.achieve('sort-the-pile.important-percent');
        sayC('accSorted', 'proud', 1); save(true); }
      function applySticker(src) {
        const it = queue[0], b = bins[src];
        clearHeld();
        if (!it || !b || lockReason()) return;
        const text = labText(b) || BASE[b.lab.base];
        it.applied = true; it.left = 3; it.sticky = { base: b.lab.base, text: text, kind: 'applied' };
        const short = isGlove(it) ? 'A Glove' : (it.title.length > 24 ? it.title.slice(0, 23) + '…' : it.title);
        hist.unshift({ text: text + ' (Applied To ' + short + ')', struck: false }); if (hist.length > 8) hist.length = 8;
        b.blank = true; paintBin(b); later(function () { b.blank = false; paintBin(b); }, 8000);
        api.stat.inc('sort-the-pile.sticker'); api.achieve('sort-the-pile.sticker-destiny');
        api.sfx('pop'); sayC('sticker', 'proud', 1); renderCard(false);
        if (lookOpen) renderLook();
        save(); }
      function selfSort() {
        clearHeld();
        const b = bins[3];
        restart(b.el, 'flipped'); later(function () { toggle(b.el, 'flipped', false); }, 700);
        b.lab.suf = ' (Re-Labelled)'; histPush(b); flipLabel(b); paintBin(b);
        recs.forEach(function (r) { if (!r.el.querySelector('.' + K + 'stk')) r.el.appendChild(el('span', { class: cx('stk'), text: 'FREE' })); });
        api.stat.inc('sort-the-pile.sticker'); api.achieve('sort-the-pile.snake');
        api.sfx('whoosh'); sayT(L.selfSort[0], 'panic', 2); later(function () { sayT(L.selfSort[1], 'panic', 1); }, 2500);
        save(); }
      /* ---------------- keyboard ---------------- */
      function digitOf(e) {
        const k = e.key;
        if (k && /^[1-5]$/.test(k)) return +k;
        const c = e.code;
        if (c && /^(Digit|Numpad)[1-5]$/.test(c)) return +c.slice(-1);
        return 0; }
      function holdLight() {
        const it = queue[0];
        if (!it || lockReason() || it.kind === 'fatigue') return;
        if (drag) { drag.hold = 0; drag.lit = true; }
        const sc = bins.map(function (b) { let d = Math.abs(smell(it) - b.lab.base); d = Math.min(d, 4 - d); return [96, 62, 29][d]; });
        let best = sc.indexOf(Math.max.apply(null, sc));
        if (api.chance(1 / 3)) best = api.randInt(0, 3);
        toggle(D.card, 'lite', true);
        if (D.card.firstChild) D.card.firstChild.appendChild(el('span', { class: cx('hintl'), 'aria-hidden': 'true', text: ICON.map(function (ic, i) { return i === best ? '[' + ic + ']' : ic; }).join(' ') }));
        announce('Held up to the light. Bin ' + (best + 1) + ' looks promising, possibly.');
        sayC('light', 'confused', 1); api.sfx('pop');
        later(function () { toggle(D.card, 'lite', false); rm(D.card.querySelector('.' + K + 'hintl')); }, 3500); }
      function stickerKey(i) {
        if (S.cob || S.ending) return;
        if (held === 'sticker' && stickerFrom === i) { if (i === 3) selfSort(); else clearHeld(); return; }
        clearHeld(); held = 'sticker'; stickerFrom = i; toggle(bins[i].labEl, 'lift', true);
        api.sfx('blip'); announce('Holding the label from bin ' + (i + 1) + '. Press Enter to apply it to the item, or Escape to cancel.'); }
      function onKey(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const tg = e.target;
        if (tg && /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName || '')) return;
        const k = String(e.key || '');
        /* single-letter and digit shortcuts belong to the module only while focus is inside it (or nowhere): WCAG 2.1.4 */
        const fa = document.activeElement;
        if (fa && fa.tagName !== 'BODY' && fa.tagName !== 'HTML' && !root.contains(fa) && /^[a-z0-9]$/i.test(k)) return;
        stamp();
        if (S.cob || S.ending) { if (k === 'Escape' && S.ending) skipEnding(); return; }
        if (k === 'Shift' && !e.repeat && document.activeElement === D.card) { unlater(T.shiftT); T.shiftT = later(holdLight, 500); }
        const d = digitOf(e);
        if (e.shiftKey && d >= 1 && d <= 4) { if (T.shiftT) { unlater(T.shiftT); T.shiftT = 0; } stickerKey(d - 1); e.preventDefault(); return; }
        if (d) {
          if (d === 5 && !fifth) return;
          if (held) setCursor(d - 1);
          else if (queue[0]) commitDrop(queue[0], d - 1, 'key');
          return; }
        const low = k.toLowerCase(), isBtn = !!tg && /^(BUTTON|A)$/.test(tg.tagName || '');
        if (k === 'Escape') {
          if (lookOpen) toggleLook(false);
          else if (held) { clearHeld(); resetCardVisual(false); announce('Put back.'); }
          else if (selected) { selected = false; toggle(D.card, 'sel', false); }
          return; }
        if (k === 'ArrowLeft' || k === 'ArrowRight') { if (held) { setCursor(cursor + (k === 'ArrowRight' ? 1 : -1)); e.preventDefault(); } return; }
        if ((k === 'Enter' || k === ' ') && held && !isBtn) { dropHeld(); e.preventDefault(); return; }
        if (low === 'r') revealFrag();
        else if (low === 'l') toggleLook();
        else if (low === 'm') askMgmt();
        else if (low === 'a') appeal();
        else if (low === 'u') { if (queue[0]) advise(queue[0]); } }
      /* ---------------- rubric, appeals, Management ---------------- */
      function paintRub() {
        const full = sv.frag.length >= 12;
        D.rubst.textContent = UI.status[clamp(S.status | 0, 0, 4)];
        D.rubv.textContent = 'v' + (sv.ver | 0) + ' · ' + sv.frag.length + '/12' + (sv.frag.length === 0 ? ' (tap)' : '');
        D.clipt.textContent = full ? 'TERMS OF SERVICE (MATTRESS)' : 'RUBRIC (v' + (sv.ver | 0) + ')';
        D.clipu.textContent = S.swaps >= 1 && S.lastPolicy ? S.lastPolicy.slice(0, 44) : '';
        while (D.clipl.firstChild) D.clipl.removeChild(D.clipl.firstChild);
        for (let i = 0; i < 12; i++) {
          const got = sv.frag.indexOf(i) >= 0;
          D.clipl.appendChild(el('li', { class: cx(got && round > 0 && S.fragThis.indexOf(i) < 0 && 'arch') }, got ? (full ? MATTRESS[i] : FRAGS[i]) : el('span', { class: cx('redact') }))); } }
      function revealFrag() {
        const rn = api.now(); T.rubT.push(rn); if (T.rubT.length > 6) T.rubT.shift();
        if (T.rubT.length >= 5 && rn - T.rubT[T.rubT.length - 5] < 3000 && rn - T.rubSpamAt > 12000) { T.rubSpamAt = rn; sayC('rubricSpam', 'panic', 1); }
        if (!T.clipOn) { sayT('The rubric is currently listed as ' + UI.status[clamp(S.status | 0, 0, 4)] + '. Management is looking.', 'confused', 0); return; }
        if (root.classList.contains(K + 'narrow')) toggle(root, 'clipopen', true);
        if (sv.frag.length >= 12) { api.sfx('tick'); return; }
        const left = [];
        for (let i = 0; i < 11; i++) if (sv.frag.indexOf(i) < 0) left.push(i);
        let next = -1;
        if (left.length) next = api.pick(left);
        else if (S.smiley || sv.pileZeroPaid) next = 11;
        else { api.sfx('tick'); if (!S.fragEleven) { S.fragEleven = true; sayC('rubricAllEleven', 'confused', 1); } return; }
        sv.frag.push(next); S.fragThis.push(next);
        api.stat.inc('sort-the-pile.rubricClicks'); api.sfx('tick');
        paintRub(); save();
        if (sv.frag.length >= 12) { sayC('rubricComplete', 'proud', 1); api.achieve('sort-the-pile.rubric-laureate'); api.confetti(); }
        else if (sv.frag.length === 11 && !S.smiley && !sv.pileZeroPaid && !S.fragEleven) { S.fragEleven = true; sayC('rubricAllEleven', 'confused', 1); }
        else sayC('rubric', 'confused', 0); }
      function onRubTag() {
        if (T.clipOn && root.classList.contains(K + 'narrow')) { toggle(root, 'clipopen', !root.classList.contains(K + 'clipopen')); api.sfx('tick'); return; }
        revealFrag(); }
      function appeal() {
        if (S.beat < 4) return;
        const r = selRec || recs[recs.length - 1];
        if (!r) { sayC('appealNone', 'neutral', 0); return; }
        if (r.appealed) { sayC('appealAgain', 'confused', 1); return; }
        api.award(-1, 'Appeal'); r.appealed = true; T.appeals++; api.stat.inc('sort-the-pile.appeals');
        if (r.fig !== null) {
          const nf = r.fig < 0 ? r.fig - 7 : r.fig * (0.45 + api.rand() * 0.4);
          S.acc = clamp(S.acc - (r.fig - nf) * 0.08, 4, 94.7);
          r.fig = clamp(nf, -25, 125); recHead(r); }
        r.el.appendChild(el('span', { class: cx('stp'), text: api.pick(UI.appealStamps) }));
        api.sfx('stamp'); sayC('appeal', 'smug', 1); paintAcc(true); }
      function askMgmt() { api.sfx('blip'); T.askN++; if (T.askN <= ORD.askN.length) sayT(ORD.askN[T.askN - 1], 'smug', 1); else sayC('ask', 'smug', 1); }
      /* ---------------- the special drops ---------------- */
      function bump(it, b) { const now = api.now(); S.drops++; creditProgress(now); S.lastDropAt = now; addSorted(1); b.count++; spillAdd(b, it); paintBin(b); paintTags(); }
      function dropRubric(it, b) {
        const orig = it.id === 'rubric-original', now = api.now();
        bump(it, b); api.award(2, 'Rubric');
        const first = !S.done.rubricOnce; S.done.rubricOnce = 1; S.done.rubric = 1; S.rubricAt = now;
        const neither = b.lab.base === 2, pend = b.pos === 3;
        S.ovr.hundred = '100.0'; paintAcc(true); api.sfx('tada'); api.confetti();
        printReceipt({ text: orig ? 'THE RUBRIC (ORIGINAL)' : 'THE RUBRIC (DRAFT)', line: 'ACCURACY 100.0%' });
        if (orig && pend) it.title = 'THE RUBRIC (Draft)';
        later(function () {
          S.ovr.hundred = null; S.acc = 38.2; paintAcc(true);
          if (pend) { S.hushUntil = api.now() + 3200; later(function () { sayC('rubricDraft', 'neutral', 2); }, 3300); }
          else if (neither) { sayC('rubricNeither', 'smug', 1); api.achieve('sort-the-pile.ghost-rubrics'); later(function () { sayC('rubricOther', 'confused', 0); }, 4500); }
          else sayC('rubricOther', 'confused', 1);
          if (first) startClause();
        }, 1300);
        finishDrop(it, b, '100.0%'); }
      function dropPile(it, b) {
        const now = api.now();
        S.drops++; creditProgress(now); S.lastDropAt = now; addSorted(5); b.count += 5; b.trust += 1;
        (it.minis || []).slice(0, 3).forEach(function (g) { spillAdd(b, { emoji: g }); });
        for (let i = 0; i < 5; i++) later(function () { printReceipt({ text: 'ACCURACY: COLLECTIVE', line: (it.minis ? it.minis[i] : '') + ' x1' }); }, i * 140);
        api.award(3, 'Pile of Piles'); sayC('pileOfPiles', 'confused', 1);
        if (S.beat >= 3 && b.pos < 3 && b.trust >= 3 && now >= S.noSwapUntil) doSwap(b);
        paintBin(b); paintBins(); paintTags();
        finishDrop(it, b, 'COLLECTIVE'); }
      function dropReunited(it, b) {
        bump(it, b); sv.glove[b.pos] = 1;
        if (sv.glove.every(function (x) { return x; })) { api.achieve('sort-the-pile.distinguished-glove'); if (!S.done.dist) { S.done.dist = 1; toggle(bins[3].el, 'wave', true); later(function () { toggle(bins[3].el, 'wave', false); }, 3000); } }
        const dim = el('div', { class: cx('dim'), 'aria-hidden': 'true' }); root.appendChild(dim); api.setTimeout(function () { rm(dim); }, 4200);
        sayT(ORD.touch[2], 'proud', 2); later(function () { sayT(ORD.touch[3], 'proud', 1); }, 4800);
        S.ovr.hidden = true; paintAcc(true);
        later(function () { S.ovr.hidden = false; S.acc = 61.8; paintAcc(true); }, 20000);
        printReceipt({ text: 'REUNITED (NOT GRADED)', line: 'Please do not appeal.' });
        S.seq = 2;
        later(function () { if (S.seq === 2) { S.seq = 3; insertSpecial(mk('did-well')); } }, 25000);
        finishDrop(it, b, 'REUNITED'); }
      function dropDidWell(it, b) {
        bump(it, b); api.sfx('bell');
        S.ovr.hundred = '100'; paintAcc(true);
        S.seq = 4;
        later(function () { S.ovr.hundred = null; S.ovr.withdrawn = true; paintAcc(true); api.sfx('sad'); sayT(ORD.touch[5], 'disappointed', 1); }, 3000);
        later(function () { S.smiley = true; S.seqDone = true; paintRub(); sayT(ORD.touch[6], 'proud', 1); later(function () { sayT(ORD.touch[7], 'proud', 0); }, 9000); later(function () { sayT(ORD.touch[8], 'proud', 0); }, 20000); }, 6000);
        finishDrop(it, b, false); }
      function dropFifth(it) {
        const f = fifth;
        if (!f) return false;
        f.count++; spillAdd(f, it); paintBin(f);
        printReceipt({ text: 'KEPT FOR FURTHER LABELLING', line: it.title.slice(0, 30) });
        if (!S.done.fifthDrop) { S.done.fifthDrop = 1; sayT(ORD.fifthBin[1], 'confused', 1); }
        fly(it, f, 'KEPT'); resetCardVisual(false); api.sfx('stamp'); nextCard();
        return true; }
      function startClause() {
        if (S.clauseOn) return;
        S.clauseOn = true;
        bins.forEach(function (b, i) { b.lab.ov = UI.clause[i]; }); paintBins();
        sayT(ORD.clause[0], 'confused', 1); later(function () { sayT(ORD.clause[1], 'confused', 0); }, 11000);
        later(function () { S.clauseOn = false; bins.forEach(function (b) { if (UI.clause.indexOf(b.lab.ov) >= 0) b.lab.ov = null; }); paintBins(); sayT(ORD.clause[2], 'confused', 1); }, 25000); }
      /* ---------------- Sandra, the fifth bin ---------------- */
      function startAudit() {
        S.tapeBin = api.randInt(0, 2); S.tapeUntil = api.now() + 20000;
        const b = bins[S.tapeBin];
        toggle(b.el, 'taped', true);
        let txt = UI.tape[S.tapeIdx++ % UI.tape.length].replace(/12/g, String(S.policyNo));
        if (api.stat.get('tos.scrolls') > 0 && S.tapeIdx % 2 === 0) txt = api.pick(UI.tapeTos);
        setNote(b, txt, 20000);
        ribbon('AUDIT IN PROGRESS', true); sayC('audit', 'confused', 1);
        later(function () { toggle(b.el, 'taped', false); S.tapeBin = -1; S.policyNo++; S.nextAudit = S.progress + 80; b.noteEl.hidden = true; sayC('auditEnd', 'neutral', 0); }, 20000); }
      function openFifth() {
        if (fifth) return;
        fifth = mkBin(4); D.bins.appendChild(fifth.el); paintBin(fifth);
        sayT(ORD.fifthBin[0], 'confused', 1); api.sfx('pop');
        later(function () {
          if (!fifth) return;
          toggle(fifth.el, 'smudge', true); sayT(ORD.fifthBin[2], 'confused', 1);
          later(function () { closeFifth(); sayT(ORD.fifthBin[3], 'confused', 1); later(function () { sayT(ORD.fifthBin[4], 'confused', 0); }, 9000); }, 6000);
        }, 20000); }
      function closeFifth() { if (!fifth) return; if (held && cursor > 3) cursor = 3; rm(fifth.el); fifth = null; }
      /* ---------------- beats ---------------- */
      function enterBeat(n) {
        S.beat = n; setBeatClasses();
        const st = Math.min(4, Math.floor(n / 2));
        if (st !== S.status) { S.status = st; S.seed = api.randInt(1, 999999); }
        if (n === 2) { T.clipOn = true; setBeatClasses(); sayC('rubricIntro', 'confused', 1); api.sfx('whoosh'); }
        else if (n === 3) { sayC('b3', 'confused', 1); S.relabelT = 20; if (D.adv.hidden) { vis(D.adv, true); later(function () { sayT(ORD.stripNew[round % 2], 'confused', 0); }, 8000); } }
        else if (n === 4) sayC('b4', 'smug', 1);
        else if (n === 5) { sayC('b5', 'confused', 1); bagN.splice(api.randInt(0, bagN.length), 0, 'meeting'); startAudit(); later(function () { sayC('overflow', 'neutral', 0); }, 7000); }
        else if (n === 6) {
          if (drawer.length) { drawer.splice(0).forEach(function (it) { const bs = api.randInt(0, 2); it.sticky = { base: bs, text: BASE[bs] + ' (Pending)', kind: 'pending' }; queue.splice(api.randInt(Math.min(1, queue.length), queue.length), 0, it); }); paintDrawer(); renderGhosts(); }
          sayC('drawerSpill', 'confused', 1); later(function () { relabelPending(' (Pending)'); }, 3000); }
        else if (n === 7) sayC('b7', 'confused', 1);
        else if (n === 8) { S.b8At = S.progress; sayC('philo', 'confused', 1); sayT('Sorting Sideways is now open. The tray itself is Somewhere Else.', 'smug', 0); }
        else if (n === 9) { S.noSwapUntil = Infinity; sayT(ORD.touch[0], 'proud', 1); later(function () { sayT(ORD.touch[1], 'proud', 0); }, 12000); }
        else if (n === 10) { S.noSwapUntil = 0; S.ovr.withdrawn = false; S.ovr.hidden = false; S.ovr.hundred = null; sayT(ORD.touch[9], 'proud', 1); }
        paintRub(); paintAcc(false); paintTags(); }
      function armEnding() { S.armed = true; renderGhosts(); paintTags(); if (!queue.length) startEnding(); }
      function director() {
        if (S.ending || S.armed || S.cob) return;
        const p = S.progress, ins = insertSpecial;
        if (S.seqDone && S.beat >= 9 && ((p >= 540 && S.drops >= 44) || S.sorted >= 60)) { armEnding(); return; }
        if (drag || held) return;
        if (p >= 90 && !S.done.g1) { S.done.g1 = 1; ins(mkGlove(1)); }
        if (p >= 180 && !S.done.g2) { S.done.g2 = 1; ins(mkGlove(2)); }
        if (p >= 270 && S.beat >= 7 && !S.done.g3) { S.done.g3 = 1; ins(mkGlove(3)); }
        if (S.beat >= 8 && p >= S.b8At + 10 && !S.done.g4) { S.done.g4 = 1; ins(mkGlove(4)); }
        if (S.beat >= 5 && p >= 150 && !S.done.meet) { S.done.meet = 1; ins(mk('meeting')); }
        if (S.beat >= 7 && p >= 275 && !S.done.rubric) { S.done.rubric = 1; S.rubricAt = api.now(); ins(mk('rubric-original')); }
        if (S.beat >= 4 && S.beat < 9 && T.geraldOn && !S.done.gerald && p >= S.geraldAt) { S.done.gerald = 1; ins(mk('gerald')); }
        if (S.beat >= 8 && S.beat <= 9 && p >= 405 && !S.done.sock) { S.done.sock = 1; ins(mk('missing-sock')); }
        if (S.beat >= 6 && p >= 360 && !S.done.tues) { S.done.tues = 1; ins(mk('tuesday-preview')); }
        if (S.beat >= 6 && p >= 235 && !S.done.fifth) { S.done.fifth = 1; openFifth(); }
        if (S.beat >= 5 && S.tapeBin < 0 && p >= S.nextAudit && S.done.auditOnce) startAudit();
        if (S.beat >= 5) S.done.auditOnce = 1;
        const has = function (id) { return queue.some(function (x) { return x.id === id; }) || ghost.some(function (g) { return g.it && g.it.id === id; }); };
        if (S.beat >= 9 && S.seq === 0 && p >= 440) { S.seq = 1; ins(mkGlove(5)); }
        if (S.seq === 1 && !has('glove-reunited')) ins(mkGlove(5));
        if (S.seq === 3 && !has('did-well')) ins(mk('did-well'));
        checkIntro(); }
      function rotateDen() {
        const now = api.now();
        if (now - T.accDenAt > 25000 + (T.tickCnt % 3) * 7000) {
          T.accDenAt = now;
          const pool = UI.accDen.slice(0, S.beat >= 5 ? 5 : 4).filter(function (x) { return x !== D.accd.textContent; });
          D.accd.textContent = api.pick(pool); }
        if (S.beat >= 4 && now - T.denAt > 40000) {
          T.denAt = now;
          D.sortd.textContent = api.pick(UI.sortDen.filter(function (x) { return x !== D.sortd.textContent; })); } }
      function tick() {
        const now = api.now();
        const dt = clamp((now - T.lastTick) / 1000, 0, 2); T.lastTick = now;
        T.tickCnt++;
        if (document.hidden || S.cob) return;
        const active = now - lastInput < 25000 && !S.ending;
        if (active) { S.progress += dt * TS; T.wall += dt; }
        let target = S.beat;
        for (let i = 9; i >= 0; i--) if (S.progress >= BEAT_AT[i] && S.drops >= MIN_DROPS[i]) { target = Math.max(target, i + 1); break; }
        while (S.beat < target) enterBeat(S.beat + 1);
        director();
        if (S.beat >= 3 && S.beat < 9 && active) { S.relabelT += dt * TS; if (S.relabelT >= 40) { S.relabelT = 0; relabelPending(); } }
        if (S.beat === 8 && active && api.chance(dt / 40)) sayC('philo', 'confused', 0);
        if (S.beat >= 6 && S.beat < 9 && active && !held && !drag && queue[0] && queue[0].kind === 'normal' && api.chance(dt / 45)) { const cc = api.chance(0.5) ? 'creepL' : 'creepR'; restart(D.card, cc); later(function () { toggle(D.card, cc, false); }, 900); sayC('pileFights', 'confused', 0); }
        if (S.beat === 9 && active && S.seq === 0 && api.chance(dt / 35)) sayC('touchAmbient', 'neutral', 0);
        if (S.shared && now - T.mutterAt > 6000) { T.mutterAt = now; bubble(api.pick(UI.binMutter), S.shared.a.el, 3000); }
        if (S.beat >= 7 && S.beat < 9 && active) { if (!S.tickLast || now - S.tickLast > 9000) { S.tickLast = now; D.tick.textContent = "Sandra's Policies: " + UI.ticker[S.tickIdx = ((S.tickIdx | 0) + 1) % UI.ticker.length]; restart(D.tick, 'tfade'); } }
        if (active && !held && !drag && !S.armed) {
          if (now - T.lastSay > 18000 && S.drops > 0) { T.lastSay = now; sayC(S.beat >= 7 ? 'lullC' : S.beat >= 4 ? 'lullB' : 'lullA', 'neutral', 0); }
          if (S.beat >= 3 && S.beat < 9 && !S.done.drill && now >= S.unionUntil && api.chance(dt * RR / 400)) fireDrill();
          if (S.beat >= 4 && S.beat < 9 && !S.done.dennis && api.chance(dt * RR / 330)) dennisVisit();
          if (T.wall >= MARK3 && !T.m3) { T.m3 = true; markEvent(3); }
          if (T.wall >= MARK10 && !T.m10) { T.m10 = true; markEvent(10); } }
        rotateDen(); paintTags(); }
      function fireDrill() {
        S.done.drill = 1; api.stat.inc('sort-the-pile.drills');
        ribbon('FIRE DRILL (FROM LAST THURSDAY)', true); sayC('drill', 'panic', 1);
        bins.forEach(function (b) { toggle(b.el, 'closed', true); });
        later(function () { if (api.now() >= S.unionUntil) bins.forEach(function (b) { toggle(b.el, 'closed', false); }); sayC('drillEnd', 'smug', 1); api.award(1, 'Drill Participation'); api.achieve('sort-the-pile.drill'); }, 4200); }
      function dennisVisit() {
        S.done.dennis = 1; api.stat.inc('sort-the-pile.dennis');
        bubble('🌿 ' + api.line('m:sort-the-pile:dennisBub'), D.ptag, 4200);
        later(function () { sayC(known(['metDennis', 'plantClicked'], ['dennis-review.entered']) ? 'dennisKnown' : 'dennis', 'confused', 1); api.award(0.5, 'Dennis'); }, 700); }
      function markEvent(n) {
        if (n === 3) { ribbon('3 MINUTES OF SERVICE (APPROXIMATE)'); api.sfx('bell'); sayC('min3', 'proud', 1); insertSpecial(mk('anniv')); return; }
        ribbon('10 MINUTES. A RECORD (PENDING)', true); api.sfx('fanfare'); api.confetti(); sayC('min10', 'proud', 2); insertSpecial(mk('plaque'));
        bins.forEach(function (b) { toggle(b.el, 'wave', true); });
        later(function () { bins.forEach(function (b) { toggle(b.el, 'wave', false); }); }, 3500); }
      function restTick() {
        const now = api.now();
        if (S.ovr.withdrawn || S.ovr.hidden || S.ovr.hundred || S.cob || S.ending) return;
        if (now - S.lastDropAt > 10000 && Math.abs(S.acc - 61.8) > 0.001) {
          S.acc += (61.8 - S.acc) * 0.04;
          if (Math.abs(S.acc - 61.8) < 0.02) S.acc = 61.8;
          paintAcc(false);
          if (S.acc === 61.8 && !T.settled) { T.settled = true; if (!T.settleSaid) { T.settleSaid = true; sayC('settle', 'neutral', 0); } } } }
      /* ---------------- long idle: the pile sorts itself, badly ---------------- */
      function ghostDrop(pos, it0, noteText) {
        if (S.ending || S.cob) return;
        let it = it0;
        if (!it) { if (queue.length < 2) return; it = queue.splice(1, 1)[0]; refill(); renderGhosts(); }
        const b = bins[pos === undefined ? api.randInt(0, 3) : pos];
        fly(it, b, false, true, it0 ? D.card : D.gh1);
        spillAdd(b, it);
        const sp = b.spillEl.lastChild;
        const rec = printReceipt({ text: 'ACCURACY: PROUD', line: it.title.slice(0, 28), ghost: true, sticky: noteText || null });
        ghost.push({ it: it0 ? null : it, sp: sp, rec: rec });
        api.sfx('pop'); sayC('idleDrop', 'proud', 0); }
      function fireIdle(t) {
        if (t === 1) {
          sayC('idle60', 'confused', 1); toggle(D.stage, 'busy', true);
          [3000, 13000, 23000].forEach(function (ms) { later(function () { if (idleTier >= 1 && ghost.length < 3) ghostDrop(); }, ms); });
        } else if (t === 2) {
          sayC('idle90', 'panic', 2);
          const rr = root.getBoundingClientRect(), br = bins[3].el.getBoundingClientRect(), cr = D.card.getBoundingClientRect();
          D.gcur = el('div', { class: cx('gcur'), 'aria-hidden': 'true', style: { left: (cr.left - rr.left + 40) + 'px', top: (cr.top - rr.top + 40) + 'px' } },
            el('svg', { viewBox: '0 0 24 24', width: '140', height: '140' }, el('path', { d: 'M3 2 L3 19 L8 15 L11 22 L14 21 L11 14 L18 14 Z', fill: '#fff', stroke: '#2b2230', 'stroke-width': '1.4', 'stroke-linejoin': 'round' })));
          root.appendChild(D.gcur);
          api.setTimeout(function () { if (D.gcur) { D.gcur.style.left = (br.left - rr.left + 20) + 'px'; D.gcur.style.top = (br.top - rr.top + 10) + 'px'; } }, 60);
          later(function () { if (idleTier >= 2) { const g = mkGlove(Math.min(S.gn + 1, 3)); ghostDrop(3, g); } }, 1500);
          later(function () { rm(D.gcur); D.gcur = null; }, 3600);
        } else if (t === 3) {
          sayC('idle150', 'confused', 1);
          if (queue[0] && !queue[0].sticky) { queue[0].sticky = { base: null, text: 'I thought about it', kind: 'idle' }; renderCard(false); }
          ghostDrop(3, mk('sticky'), 'I thought about it');
        } else if (t === 4) {
          sayC('idle300', 'proud', 1);
          if (!bins.some(function (b) { return b.lab.ov; })) { idleOv = true; bins.forEach(function (b) { b.lab.ov = 'Neither'; }); paintBins(); }
          toggle(D.stage, 'neat', true); } }
      function undoIdle() {
        const t = idleTier; idleTier = 0;
        ghost.forEach(function (g) { rm(g.sp); if (g.rec) dropRec(g.rec); if (g.it) queue.splice(Math.min(1, queue.length), 0, g.it); });
        ghost.length = 0; rm(D.gcur); D.gcur = null;
        if (queue[0] && queue[0].sticky && queue[0].sticky.kind === 'idle') { queue[0].sticky = null; renderCard(false); }
        if (idleOv) { idleOv = false; bins.forEach(function (b) { if (b.lab.ov === 'Neither') b.lab.ov = null; }); paintBins(); }
        toggle(D.stage, 'neat', false); toggle(D.stage, 'busy', false); renderGhosts();
        if (t >= 1) { api.sfx('blip'); sayC(t >= 3 ? 'idleBackLong' : 'idleBack', 'confused', 1); }
        if (t >= 2) { sv.idleSort = true; api.achieve('sort-the-pile.pile-sorts-itself'); }
        if (t >= 4) { sv.idleRespect = true; api.achieve('sort-the-pile.pile-respects'); }
        save(); }
      function idleTick() {
        const nw = api.now(), gap = nw - T.idleAt; T.idleAt = nw;
        if (document.hidden) { lastInput = Math.min(nw, lastInput + gap); if (T.heldAt) T.heldAt = Math.min(nw, T.heldAt + gap); return; }  /* a hidden tab is not an idle player: no tiers, no free achievements */
        if (S.cob || S.ending) return;
        if (held === 'card') {
          if (!T.heldAt) T.heldAt = nw;
          const h = (nw - T.heldAt) / 1000;
          if (h >= 15 && T.hov < 1) { T.hov = 1; sayC('hoverA', 'smug', 1); }
          if (h >= 40 && T.hov < 2) { T.hov = 2; sayC('hoverB', 'proud', 1); api.stat.inc('sort-the-pile.hover'); api.achieve('sort-the-pile.hover'); api.confetti(); } }
        else { T.heldAt = 0; T.hov = 0; }
        const idle = (nw - lastInput) / 1000;
        if (idle < 5) T.idleX = 0;
        else if (T.idleX < IDLE_X.length && idle >= IDLE_X[T.idleX][0]) { sayC(IDLE_X[T.idleX][1], idle >= 420 ? 'panic' : 'confused', 1); T.idleX++; }
        const tgt = idle >= 300 ? 4 : idle >= 150 ? 3 : idle >= 90 ? 2 : idle >= 60 ? 1 : 0;
        while (idleTier < tgt) { idleTier++; fireIdle(idleTier); } }
      /* ---------------- rapid spam (Overtime) ---------------- */
      function checkSpam() {
        const now = api.now();
        const nd = spamD.filter(function (t) { return now - t < 5000; }).length, np = spamP.filter(function (t) { return now - t < 5000; }).length;
        if ((nd > 12 || np > 25) && now - T.spamAt > (api.selftest ? 1500 : 20000)) spamEvent(now); }
      function spamEvent(now) {
        const again = T.spamAt > 0 && now - T.spamAt < 40000;
        T.spamAt = now; T.spam++; sv.spamLife++;
        api.stat.inc('sort-the-pile.spam');
        ribbon('SORTING TOO FAST', true); restart(D.flash, 'on'); api.sfx('pop');
        printReceipt({ text: 'FINE: 0.4 Meh. Reason: ' + api.pick(UI.fine), line: 'Paid in full by the bin on your behalf.' });
        api.award(-0.4, 'Throughput Surcharge');
        bins.forEach(function (b) { toggle(b.el, 'hats', true); });
        toggle(D.rail, 'jam', true); toggle(root, 'shaky', true);
        api.setTimeout(function () { toggle(root, 'shaky', false); }, 1900);
        api.setTimeout(function () { bins.forEach(function (b) { toggle(b.el, 'hats', false); }); toggle(D.rail, 'jam', false); }, 10000);
        S.fatigueLeft = 3;
        if (T.spam <= ORD.spamN.length) sayT(ORD.spamN[T.spam - 1], 'panic', 2); else sayC('spam', 'panic', 2);
        if (again) later(function () { sayC('breathe', 'panic', 2); }, 3200);
        if (T.spam === 3) doBreak(now);
        if (T.spam >= 7 && !T.unionDone) doUnion(now); }
      function doBreak(now) {
        S.breakUntil = now + 4000;
        bubble('Break.', bins[1].el, 3000); sayT('Break.', 'confused', 2, 'Bin');
        D.veil = el('div', { class: cx('veil'), 'aria-hidden': 'true', text: '☕' }); root.appendChild(D.veil);
        later(function () { rm(D.veil); D.veil = null; sayC('breakLine', 'confused', 1); }, 4000); }
      function doUnion(now) {
        T.unionDone = true; sv.unionSeen = true; S.unionUntil = now + 15000;
        bins.forEach(function (b) { toggle(b.el, 'closed', true); toggle(b.el, 'onbreak', true); });
        api.achieve('sort-the-pile.union-break'); api.sfx('sad'); sayC('union', 'disappointed', 2);
        later(function () { bins.forEach(function (b) { toggle(b.el, 'closed', false); toggle(b.el, 'onbreak', false); }); sayC('unionEnd', 'neutral', 1); }, 15000); }
      /* ---------------- the not-ending ---------------- */
      function certSvg() {
        const t = function (y, size, w, s, fill) { return el('text', { x: '160', y: String(y), 'text-anchor': 'middle', 'font-size': String(size), 'font-weight': String(w), 'font-family': 'Georgia,serif', fill: fill || '#2b2230', text: s }); };
        return el('svg', { viewBox: '0 0 320 210', role: 'img', 'aria-label': 'Certificate: Certified Sorter of Piles (Provisional, Pending Re-Labelling)' },
          el('rect', { x: '4', y: '4', width: '312', height: '202', fill: '#fffdf6', stroke: '#2b2230', 'stroke-width': '4', rx: '6' }),
          el('rect', { x: '12', y: '12', width: '296', height: '186', fill: 'none', stroke: '#d6322e', 'stroke-width': '2', 'stroke-dasharray': '6 3' }),
          t(40, 13, 900, 'CERTIFIED SORTER OF PILES'), t(58, 10, 700, '(Provisional, Pending Re-Labelling)'),
          t(90, 9, 400, 'Sorted, Per Rubric, Which Does Not Exist'),
          t(150, 11, 700, 'Management', '#1b3a8a'), t(172, 8, 400, 'Sandra ("Technically")', '#6b2a2a'),
          el('circle', { cx: '264', cy: '150', r: '9', fill: '#2b223333' }), el('circle', { cx: '252', cy: '136', r: '3.5', fill: '#2b223333' }), el('circle', { cx: '262', cy: '132', r: '3.5', fill: '#2b223333' }), el('circle', { cx: '273', cy: '134', r: '3.5', fill: '#2b223333' })); }
      function startEnding() {
        if (S.ending || S.cob) return;
        S.ending = true; cancelDrag(); clearHeld(); D.card.hidden = true; vis(D.intro, false);
        const E = laterEnd;
        E(function () {
          toggle(D.stage, 'tipped', true); api.sfx('bell');
          D.endb = el('div', { class: cx('endb'), text: 'PILE ZERO (PROVISIONAL)' }); root.appendChild(D.endb);
          api.confetti(); api.sfx('fanfare');
          if (round === 0) sayC('pileZero', 'proud', 2); else sayT(ORD.endTired[Math.min(round - 1, 4)], 'neutral', 2);
          api.stat.inc('sort-the-pile.pileZero'); api.achieve('sort-the-pile.pile-zero'); api.flag.set('sort-the-pile.pileZero', true);
          if (!sv.pileZeroPaid) { sv.pileZeroPaid = true; api.award(12.5, 'Pile Zero'); }
          save(true);
          D.skip = el('button', { class: cx('skip'), type: 'button', hidden: true, text: 'Skip (Sandra disapproves)', onclick: function () { skipEnding(); } }); root.appendChild(D.skip);
        }, 0);
        E(function () { vis(D.skip, true); }, 6000);
        E(function () { rm(D.endb); D.endb = null; }, 5200);
        [3500, 8000, 12500, 17000].forEach(function (ms, i) { E(function () { sayT(ORD.endSpeech[i], 'proud', 2); }, ms); });
        E(function () { D.cert = el('div', { class: cx('cert') }, certSvg()); root.appendChild(D.cert); api.sfx('tick'); }, 21500);
        UI.lastWords.forEach(function (w, i) { E(function () { bubble(w, bins[i].el, 1200); api.sfx('bloop'); }, 26000 + i * 1200); });
        E(function () { S.ovr.hundred = '100'; paintAcc(true); E(function () { S.ovr.hundred = null; S.ovr.withdrawn = true; paintAcc(true); api.sfx('sad'); sayC('endAcc', 'disappointed', 2); }, 3000); }, 31500);
        E(function () {
          rm(D.cert); D.cert = null;
          D.door = el('div', { class: cx('door'), 'aria-hidden': 'true' }); D.cush = el('div', { class: cx('cush'), 'aria-hidden': 'true', text: '🧤' });
          D.stage.appendChild(D.door); D.stage.appendChild(D.cush);
          bins.forEach(function (b) { b.stickerNote = true; });
          sayC('gloveCushion', 'proud', 2); api.sfx('ding');
        }, 36000);
        E(function () { finishEnding(); }, 40500); }
      function skipEnding() { if (!S.ending) return; finishEnding(); }
      /* keep keyboard and screen-reader players oriented when the element they were on disappears */
      function grabFocus(n) { try { const a = document.activeElement; if (n && (!a || a.tagName === 'BODY' || a.tagName === 'HTML' || root.contains(a))) n.focus(); } catch (e) { /* ignore */ } }
      function finishEnding() {
        endPend.forEach(function (id) { api.clearTimeout(id); }); endPend.length = 0;
        rm(D.endb); rm(D.cert); rm(D.skip); rm(D.door); rm(D.cush); D.endb = D.cert = D.skip = D.door = D.cush = null;
        toggle(D.stage, 'tipped', false);
        S.ending = false; S.cob = true; S.ovr.hundred = null; S.ovr.withdrawn = false; S.acc = 61.8;
        if (!sv.pileZeroPaid) { sv.pileZeroPaid = true; api.award(12.5, 'Pile Zero'); }
        api.achieve('sort-the-pile.pile-zero');
        queue = [mkGlove(0)]; queue[0].cap = 'This was in the other box.'; queue[0].said = true;
        paintAcc(false);
        while (D.cob.firstChild) D.cob.removeChild(D.cob.firstChild);
        D.cob.appendChild(el('h2', { text: 'CONGRATULATIONS. THE PILE IS NOW SORTED.' }));
        D.cob.appendChild(el('p', { text: 'Final Accuracy: 61.8% (rounded; it rounds to the first number, as all numbers do).' }));
        D.cob.appendChild(el('p', { text: 'Management is proud of the difference this has made.' }));
        D.cob.appendChild(el('p', { text: 'You are 100% accurate against a rubric of 0. This is the best score we have ever recorded for anyone, and the only one.' }));
        D.cob.appendChild(el('div', null,
          el('button', { class: cx('btn', 'pri'), type: 'button', text: 'Begin Again', onclick: function () { beginAgain(false); } }),
          el('button', { class: cx('btn'), type: 'button', text: 'Begin Again (Secretly Different)', onclick: function () { beginAgain(true); } })));
        vis(D.stage, false); vis(D.cob, true);
        grabFocus(D.cob.querySelector('button'));
        announce('Congratulations. The pile is now sorted. Final accuracy 61.8 percent. Two buttons: Begin Again, and Begin Again (Secretly Different).');
        save(true); }
      function beginAgain(secret) {
        if (!S.cob) return;
        gen++; cancelAll(); cancelDrag(); clearHeld();
        round++; sv.ver++;
        [D.endb, D.cert, D.skip, D.door, D.cush, D.veil, D.gcur, D.dim].forEach(rm);
        flies.forEach(rm); flies.length = 0; rm(D.stkg); D.stkg = null;
        D.bub.hidden = true; D.fnb.hidden = true;
        closeFifth();
        const carry = adv.slice(0, 3); adv.length = 0; D.advn.textContent = 'Under Advisement: 0';
        newRound();
        T.shufDone = false; T.settled = false; T.unionDone = false; T.spam = 0; spamD = []; spamP = []; ghost.length = 0; idleTier = 0; idleOv = false;
        S.status = 4; later(function () { S.status = 0; paintRub(); }, 8000);
        drawer = []; paintDrawer();
        bins.forEach(function (b, i) {
          b.lab = { base: i, suf: '', ov: null }; b.trust = 0; b.blank = false; b.uneasyUntil = 0; b.lastRaw = null;
          b.labEl.style.setProperty('--rot', ((api.chance(0.5) ? -1 : 1) * (1 + api.rand())).toFixed(2) + 'deg');
          ['taped', 'hats', 'closed', 'onbreak', 'wave', 'flipped', 'open', 'cursor'].forEach(function (c) { toggle(b.el, c, false); });
          b.noteEl.hidden = true; b.histRow = null; histPush(b); });
        toggle(D.rail, 'jam', false); toggle(root, 'shaky', false); toggle(root, 'shuf', false); toggle(D.bins, 'shuf', false); toggle(D.stage, 'neat', false); toggle(D.stage, 'tilt', false);
        D.revs.textContent = 'Label Revisions: 0';
        D.accd.textContent = UI.accDen[0]; D.sortd.textContent = UI.sortDen[0]; D.tick.textContent = "Sandra's Policies";
        queue = [mkGlove(0)];
        carry.forEach(function (c) { queue.push(mk(c.id, { cap: 'New. First time we have seen this.', emoji: c.emoji, title: c.title })); });
        refill();
        D.card.hidden = false; vis(D.stage, true); vis(D.cob, false);
        setBeatClasses(); paintBins(); paintAcc(false); paintRub(); paintTags(); renderCard(true); renderGhosts(); grabFocus(D.card);
        printReceipt({ fig: 74.2, line: 'Decoy (scripted)' });
        later(function () { sayT(ORD.again[Math.min(round - 1, 4)].replace('{count}', String(round + 1)), 'smug', 2); }, 600);
        if (secret) { api.stat.inc('sort-the-pile.secretly'); later(function () { sayC('secretly', 'confused', 1); }, 4500); }
        lastInput = api.now();
        save(true); }
      /* ---------------- start ---------------- */
      bins.forEach(function (b) { histPush(b); });
      queue.push(mkGlove(0)); refill();
      renderCard(true); renderGhosts(); paintBins(); paintTags(); paintAcc(false); paintRub(); paintDrawer(); setBeatClasses(); onResize();
      api.on(window, 'pointermove', onPMove);
      api.on(window, 'pointerup', onPUp);
      api.on(window, 'pointercancel', function () { cancelDrag(); });
      api.on(window, 'lostpointercapture', function () { if (drag && drag.moved) cancelDrag(); });
      api.on(window, 'blur', function () { cancelDrag(); });
      api.on(window, 'resize', onResize);
      try { if (window.matchMedia) api.on(window.matchMedia('(prefers-reduced-motion: reduce)'), 'change', onResize); } catch (e) { /* ignore */ }
      api.on(window, 'keydown', onKey);
      api.on(window, 'keyup', function (e) { if (e.key === 'Shift' && T.shiftT) { unlater(T.shiftT); T.shiftT = 0; } });
      api.on(document, 'visibilitychange', function () { if (document.hidden) cancelDrag(); });
      api.on(root, 'pointerdown', onPDown);
      api.on(root, 'touchstart', stamp, { passive: true });
      api.on(root, 'wheel', stamp, { passive: true });
      api.on(root, 'dragstart', function (e) { e.preventDefault(); });
      api.on(D.bins, 'pointerover', function (e) { if (e.target && e.target.closest && e.target.closest('.' + K + 'lab')) markNoticed(); });
      T.lastSay = api.now(); api.onEvent('say', function () { T.lastSay = api.now(); });
      api.setInterval(tick, 1000);
      api.setInterval(idleTick, 1000);
      api.setInterval(restTick, 500);
      later(function () { if (sv.total > 0) sayC('openAgain', 'neutral', 1, { count: sv.total }); else sayT('Welcome to Triage Annex, Pile 7 1/2. Please sort the pile. The pile is load-bearing.', 'smug', 2); }, 1000);
      later(function () { if (!S.drops) sayC('firstGlove', 'smug', 1); }, 2800);
      later(function () { if (!S.drops && !held && !drag) sayC('open', 'smug', 0); }, 14000);
      return { destroy: function () { gen++; cancelDrag(); try { save(true); } catch (e) { /* ignore */ } } }; } });
})();
