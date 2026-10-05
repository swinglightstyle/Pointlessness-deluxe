/* POINTLESS module: seven-and-half */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const ID = 'seven-and-half';
  const CAT = 'm:seven-and-half:';
  P.injectCSS(`
.m-seven-and-half-root{--ink:#2B2A33;--cream:#FFF6E0;--felt:#8FD9B6;--rim:#5FB890;--coral:#FF8A7A;--mus:#F2C14E;--lil:#B8A1E3;--card:#FFFDF5;--cw:clamp(50px,9.5vw,74px);--vg:0;--lay:0 0 0 transparent;position:relative;min-height:420px;padding:10px 12px 110px;color:var(--ink);background:radial-gradient(#2B2A3322 1.2px,transparent 1.6px) 0 0/14px 14px,var(--cream);font:700 .9rem/1.35 ui-rounded,system-ui,"Segoe UI",sans-serif;overflow:hidden}
.m-seven-and-half-root *{box-sizing:border-box}.m-seven-and-half-root [hidden]{display:none!important}.m-seven-and-half-root button{font:inherit;color:var(--ink);cursor:pointer;-webkit-tap-highlight-color:transparent}
.m-seven-and-half-root button:focus-visible{outline:3px dashed var(--ink);outline-offset:2px}.m-seven-and-half-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.m-seven-and-half-wall{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;margin-bottom:2px}
.m-seven-and-half-poster{max-width:150px;padding:8px 10px;background:var(--mus);border:3px solid var(--ink);box-shadow:4px 4px 0 var(--ink);transform:rotate(-2.5deg);font-weight:900;font-size:.78rem;letter-spacing:.04em;text-align:center;position:relative;margin-top:8px}
.m-seven-and-half-root .m-seven-and-half-poster{font-weight:900;font-size:.78rem;line-height:1.35}
.m-seven-and-half-poster::before{content:'';position:absolute;top:-12px;left:calc(50% - 22px);width:44px;height:14px;background:#fff9;border:2px solid #2B2A3355;transform:rotate(3deg)}
.m-seven-and-half-clk{display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:0;padding:0;width:84px}.m-seven-and-half-clk svg{width:46px;height:46px}
.m-seven-and-half-clk.m-seven-and-half-jump svg{animation:m-seven-and-half-wob .15s 6}.m-seven-and-half-plq{font-size:.66rem;font-weight:800;line-height:1.1;text-align:center;background:#fff;border:2px solid var(--ink);padding:0 3px;border-radius:4px}
.m-seven-and-half-meter{width:132px;text-align:center;transition:transform .7s}.m-seven-and-half-meter.m-seven-and-half-flip{transform:rotate(180deg)}.m-seven-and-half-meter svg{width:100%;height:auto;display:block}
.m-seven-and-half-needle{transform-origin:50px 50px;transform:rotate(-84deg);transition:transform .6s}.m-seven-and-half-needle.m-seven-and-half-tick{transform:rotate(-70deg)}.m-seven-and-half-mlbl{font-size:.66rem;font-weight:900;line-height:1.1}
.m-seven-and-half-certs{display:flex;gap:6px;flex-wrap:wrap;align-items:flex-start}
.m-seven-and-half-cert{position:relative;background:#fff;border:2px solid var(--ink);padding:3px 6px 3px 18px;font-size:.66rem;line-height:1.15;max-width:132px;transform:rotate(-1deg)}
.m-seven-and-half-cert::before{content:'📌';position:absolute;left:1px;top:-3px;font-size:.8rem}.m-seven-and-half-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:flex-end;margin-left:auto;max-width:400px;align-self:center}
.m-seven-and-half-chip{border:3px solid var(--ink);border-radius:99px;padding:1px 10px;background:#fff;color:var(--ink);text-shadow:none;font-weight:800;font-size:.76rem}
.m-seven-and-half-strip{margin:6px 0;padding:6px 10px;background:#fff;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);min-height:2.6em;font-size:.85rem;overflow-wrap:anywhere}
.m-seven-and-half-strip b{display:inline-block;margin-right:6px;padding:0 7px;border-radius:99px;background:var(--lil);border:2px solid var(--ink);font-size:.68rem}
.m-seven-and-half-cols{display:grid;grid-template-columns:minmax(176px,214px) minmax(0,1fr);gap:10px;align-items:start}
.m-seven-and-half-led{background:var(--mus);border:3px solid var(--ink);box-shadow:4px 4px 0 var(--ink);border-radius:6px;padding:6px 8px;position:relative}
.m-seven-and-half-led::before{content:'';position:absolute;top:-9px;left:calc(50% - 20px);width:40px;height:12px;background:#9a9aa6;border:3px solid var(--ink);border-radius:5px}
.m-seven-and-half-ledh{display:block;width:100%;background:none;border:0;padding:4px 0 0;text-align:left;font-weight:900;font-size:.72rem}
.m-seven-and-half-ledl{margin:4px 0 0;padding:0;list-style:none;font:700 .68rem/18px ui-monospace,Consolas,monospace;background:repeating-linear-gradient(transparent 0 17px,#2B2A3333 17px 18px);overflow-wrap:anywhere}.m-seven-and-half-ledl li{min-height:18px}
.m-seven-and-half-tbl{position:relative;display:flex;flex-direction:column;gap:6px;padding:10px 12px;min-height:280px;border:3px solid var(--ink);border-radius:24px;background:repeating-radial-gradient(circle at 20% 10%,#8FD9B6 0 3px,#88d4b0 3px 6px);box-shadow:inset 0 0 0 6px var(--rim),4px 4px 0 var(--ink);color:var(--cream);text-shadow:1px 1px 0 var(--ink),-1px 1px 0 var(--ink)}
.m-seven-and-half-tbl.m-seven-and-half-swap{flex-direction:column-reverse}.m-seven-and-half-tbl.m-seven-and-half-spin{animation:m-seven-and-half-spin .7s ease-in-out}.m-seven-and-half-tbl.m-seven-and-half-dim{filter:brightness(.92)}
.m-seven-and-half-tbl.m-seven-and-half-wind::after{content:'~ ~ ~';position:absolute;left:30%;top:42%;font-size:1.6rem;letter-spacing:.3em;animation:m-seven-and-half-wind 1.2s ease-in-out}
.m-seven-and-half-dz{display:flex;align-items:flex-end;justify-content:center;gap:14px;flex-wrap:wrap;min-height:122px;position:relative}
.m-seven-and-half-fan{display:flex;align-items:flex-end;justify-content:center;min-width:0;height:96px;padding-left:14px;position:relative}
.m-seven-and-half-fanw{position:relative}.m-seven-and-half-fanx{position:absolute;right:-6px;top:-4px;background:#fff;color:var(--ink);border:2px solid var(--ink);border-radius:99px;font-size:.62rem;padding:0 5px;text-shadow:none}
.m-seven-and-half-mc{position:relative;flex:none;width:34px;height:48px;margin-left:-14px;background:var(--coral);border:2px solid var(--ink);border-radius:5px;transform:rotate(var(--r,0deg));box-shadow:1px 1px 0 var(--ink);background-image:repeating-linear-gradient(45deg,#fff3 0 4px,transparent 4px 8px);color:var(--ink);text-shadow:none;display:grid;place-items:center;font-weight:900;transition:transform .3s}
.m-seven-and-half-mc::after{content:'';position:absolute;top:-6px;left:8px;width:14px;height:8px;background:#4aa85f;border:2px solid var(--ink);border-radius:3px 3px 0 0}.m-seven-and-half-mc.m-seven-and-half-up{background:var(--card);font-size:1rem}
.m-seven-and-half-mc.m-seven-and-half-flipin{animation:m-seven-and-half-flipn .3s}.m-seven-and-half-dwrap{position:relative;width:132px;display:flex;flex-direction:column;align-items:center}
.m-seven-and-half-dennis{position:relative;width:120px;height:124px;background:none;border:0;padding:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;text-shadow:none}
.m-seven-and-half-leaf{display:block;font-size:3.4rem;line-height:1;filter:drop-shadow(3px 4px 0 #2B2A3366);transform-origin:50% 100%;animation:m-seven-and-half-sway 4s ease-in-out infinite alternate;margin-bottom:-12px;z-index:1}
.m-seven-and-half-dennis.m-seven-and-half-wig .m-seven-and-half-leaf{animation:m-seven-and-half-wig .45s}.m-seven-and-half-dennis.m-seven-and-half-rot{transform:rotate(1deg)}
.m-seven-and-half-dennis.m-seven-and-half-stare .m-seven-and-half-leaf{filter:drop-shadow(16px 6px 3px #2B2A3366)}
.m-seven-and-half-pot{position:relative;width:84px;height:52px;background:linear-gradient(#e0795a,#bd5a3b);border:3px solid var(--ink);border-radius:2px 2px 16px 16px}
.m-seven-and-half-pot::before{content:'';position:absolute;left:-7px;right:-7px;top:-9px;height:14px;background:#e0795a;border:3px solid var(--ink);border-radius:6px}
.m-seven-and-half-crown{position:absolute;top:30px;left:calc(50% - 15px);width:0;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-bottom:20px solid var(--mus);filter:drop-shadow(1px 1px 0 var(--ink));z-index:4;pointer-events:none}
.m-seven-and-half-badge{position:absolute;right:-14px;bottom:34px;width:84px;height:52px;perspective:300px;background:none;border:0;padding:0;z-index:3;text-shadow:none;color:var(--ink);transition:width .5s,height .5s,transform .5s;transform-origin:100% 100%}
.m-seven-and-half-badge.m-seven-and-half-flipped{width:150px;height:62px;z-index:6;transform:translateX(30px)}.m-seven-and-half-bin{position:relative;display:block;width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s}
.m-seven-and-half-badge.m-seven-and-half-flipped .m-seven-and-half-bin{transform:rotateY(180deg)}
.m-seven-and-half-bf,.m-seven-and-half-bb{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:2px solid var(--ink);border-radius:5px;background:#fff;font-size:.62rem;line-height:1.1;padding:3px;overflow:hidden;text-align:left}
.m-seven-and-half-bb{transform:rotateY(180deg);background:var(--mus);font-size:.68rem}.m-seven-and-half-sil{width:96px;height:10px;margin-top:6px;border:2px solid var(--ink);border-radius:6px;background:#fff;overflow:hidden;position:relative}
.m-seven-and-half-sil b{display:block;height:100%;width:0;background:var(--lil)}.m-seven-and-half-sil.m-seven-and-half-ok b{background:#3fae6a;width:100%!important}.m-seven-and-half-clipw{display:flex;flex-direction:column;align-items:center;gap:3px}
.m-seven-and-half-half{position:relative;display:block;background:none;border:0;padding:8px 0 0;touch-action:none;text-shadow:none;user-select:none;-webkit-user-select:none}
.m-seven-and-half-peg{position:absolute;top:0;left:calc(50% - 21px);width:42px;height:16px;z-index:3;display:flex;pointer-events:none}.m-seven-and-half-peg i{display:block;width:21px;height:16px;background:#d9a35f;border:2px solid var(--ink)}
.m-seven-and-half-peg b{position:absolute;left:calc(50% - 4px);top:4px;width:8px;height:8px;border-radius:50%;background:#9a9aa6;border:2px solid var(--ink)}
.m-seven-and-half-hc{position:relative;width:var(--cw);height:calc(var(--cw)*.72);background:var(--card);border:3px solid var(--ink);border-bottom-style:dashed;border-radius:10px 10px 0 0;display:grid;place-items:center;font-size:calc(var(--cw)*.5);font-weight:900;box-shadow:2px 2px 0 var(--ink);transform:rotate(-3deg);transition:transform .3s;color:var(--ink)}
.m-seven-and-half-half.m-seven-and-half-straight .m-seven-and-half-hc{transform:rotate(0)}.m-seven-and-half-half.m-seven-and-half-away .m-seven-and-half-hc{visibility:hidden}
.m-seven-and-half-half.m-seven-and-half-down .m-seven-and-half-hc{background:var(--coral);color:transparent}
.m-seven-and-half-hnote{position:absolute;left:-6px;right:-6px;bottom:14px;text-align:center;font-size:.6rem;color:#c0392b;border:2px solid #c0392b;background:#fffd;border-radius:4px;transform:rotate(-8deg);text-shadow:none;z-index:2;pointer-events:none}
.m-seven-and-half-plate{font-size:.56rem;font-weight:900;background:#fff;color:var(--ink);border:2px solid var(--ink);padding:0 4px;border-radius:3px;letter-spacing:.05em;text-shadow:none}
.m-seven-and-half-cactus{font-size:2rem;align-self:flex-end;filter:drop-shadow(2px 3px 0 #2B2A3355)}.m-seven-and-half-mid{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:60px;text-align:center;position:relative}
.m-seven-and-half-read{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:center;gap:2px 10px;background:var(--card);color:var(--ink);border:3px solid var(--ink);border-radius:12px;padding:4px 14px;box-shadow:3px 3px 0 var(--ink);text-shadow:none}
.m-seven-and-half-readn{display:inline-block;font-size:1.5rem;font-weight:900}.m-seven-and-half-readn.m-seven-and-half-flipn{animation:m-seven-and-half-flipn .28s}.m-seven-and-half-read.m-seven-and-half-gold{background:#fff0b3;border-color:#a66b00}
.m-seven-and-half-read.m-seven-and-half-gold .m-seven-and-half-readn{color:#8a5600;text-shadow:0 0 8px var(--mus)}.m-seven-and-half-rsub{font-size:.7rem;font-weight:700}
.m-seven-and-half-bust{background:var(--coral);border:2px solid var(--ink);padding:0 8px;border-radius:6px;font-weight:900;letter-spacing:.1em;font-size:.8rem}.m-seven-and-half-slips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%}
.m-seven-and-half-slip{position:relative;flex:1 1 230px;max-width:360px;background:var(--mus);color:var(--ink);text-shadow:none;border:3px solid var(--ink);border-radius:6px;box-shadow:4px 4px 0 var(--ink);padding:8px 10px;text-align:left;animation:m-seven-and-half-slide .5s ease-out}
.m-seven-and-half-slip.m-seven-and-half-s1{transform:rotate(-1.5deg);border-radius:3px}.m-seven-and-half-slip.m-seven-and-half-s2{background:#fff5c8;border-style:dashed}
.m-seven-and-half-slip.m-seven-and-half-s3{background:#ffe9a8;background-image:linear-gradient(225deg,transparent 14px,#ffe9a8 14px),linear-gradient(225deg,#d9b24a 14px,transparent 14px)}
.m-seven-and-half-slip.m-seven-and-half-s4{background:var(--lil);border-left-width:14px;border-left-style:dotted}.m-seven-and-half-slip.m-seven-and-half-rider{background:#fff;flex-basis:180px;font-size:.8rem}
.m-seven-and-half-stx{position:absolute;right:6px;top:-12px;border:3px solid #c0392b;color:#c0392b;background:#fffd;padding:0 8px;border-radius:6px;font-weight:900;font-size:.8rem;letter-spacing:.1em;transform:rotate(7deg);animation:m-seven-and-half-thunk .4s ease-out}
.m-seven-and-half-slipt{margin:4px 0 6px;font-size:.8rem;line-height:1.3;overflow-wrap:anywhere}.m-seven-and-half-padw{position:relative}
.m-seven-and-half-pad{display:block;width:100%;height:54px;padding:0;background:#fff;border:2px dashed var(--ink);border-radius:6px;touch-action:none;position:relative;overflow:hidden}.m-seven-and-half-pad svg{display:block;width:100%;height:100%}
.m-seven-and-half-pad::before{content:'scribble your initials here';position:absolute;left:10px;top:5px;font-size:.7rem;font-weight:800;color:#2B2A33AA;pointer-events:none;z-index:1}.m-seven-and-half-pad.m-seven-and-half-inked::before{content:none}
.m-seven-and-half-padp{position:absolute;left:0;bottom:0;height:5px;width:0;background:#3fae6a;pointer-events:none}
.m-seven-and-half-sc{position:absolute;right:8px;top:4px;font-size:1.5rem;font-weight:900;color:#c0392b;transform:rotate(-8deg);pointer-events:none;opacity:.85;animation:m-seven-and-half-thunk .4s ease-out}
.m-seven-and-half-dots{display:flex;gap:4px;flex-wrap:wrap;margin:4px 0}.m-seven-and-half-dots i{width:10px;height:10px;border-radius:50%;border:2px solid var(--ink);background:#fff}.m-seven-and-half-dots i.m-seven-and-half-dn{background:#3fae6a}
.m-seven-and-half-slipb{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.m-seven-and-half-btn{min-height:40px;padding:2px 14px;background:#fff;color:var(--ink);text-shadow:none;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);font-weight:800;font-size:.8rem}
.m-seven-and-half-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-seven-and-half-rrow{display:flex;flex-wrap:wrap;gap:12px 6px;justify-content:center;padding-left:14px;min-height:56px}
.m-seven-and-half-rev{display:flex;flex-wrap:wrap;gap:14px 8px;justify-content:center;align-items:flex-end;background:none;border:0;padding:6px 0 0}.m-seven-and-half-rev .m-seven-and-half-mc{margin-left:0}
.m-seven-and-half-stamp{display:inline-block;border:5px solid #c0392b;color:#c0392b;background:#fffd;border-radius:10px;padding:2px 14px;font-weight:900;font-size:1.25rem;letter-spacing:.08em;text-shadow:none;transform:rotate(var(--rot,-4deg));animation:m-seven-and-half-slam .4s ease-out}
.m-seven-and-half-banner{position:relative;font-weight:900;font-size:1.25rem;letter-spacing:.1em;background:var(--mus);color:var(--ink);text-shadow:none;border:3px solid var(--ink);padding:4px 16px;border-radius:8px;box-shadow:4px 4px 0 var(--ink);animation:m-seven-and-half-thunk .4s ease-out}
.m-seven-and-half-banner.m-seven-and-half-struck::after{content:'NON-BINDING';position:absolute;inset:-6px -10px;display:grid;place-items:center;color:#c0392b;border:4px solid #c0392b;background:#fffd;border-radius:8px;transform:rotate(-5deg);font-size:1.1rem;animation:m-seven-and-half-slam .35s ease-out}
.m-seven-and-half-bubble{background:#fff;color:var(--ink);text-shadow:none;border:3px solid var(--ink);border-radius:14px;padding:4px 12px;font-size:.8rem;max-width:300px}
.m-seven-and-half-pz{display:flex;align-items:flex-end;gap:10px 28px;flex-wrap:wrap;justify-content:center}.m-seven-and-half-dcol{display:flex;flex-direction:column;align-items:center;gap:5px;position:relative}
.m-seven-and-half-deck{position:relative;display:grid;place-items:center;width:var(--cw);aspect-ratio:5/7;padding:0;background:var(--coral);background-image:repeating-linear-gradient(45deg,#fff4 0 6px,transparent 6px 12px);border:3px solid var(--ink);border-radius:10px;box-shadow:var(--stk,2px 2px 0 var(--ink));font-weight:900;touch-action:pan-y;text-shadow:none;color:var(--ink);margin:0 7px 7px 0;transition:transform .12s}
.m-seven-and-half-dn2{display:block;text-align:center}.m-seven-and-half-dn2::after{content:'left';display:block;font-size:calc(var(--cw)*.17);font-weight:800;letter-spacing:.04em}.m-seven-and-half-pls .m-seven-and-half-dn2::after{content:none}
.m-seven-and-half-deck:active{transform:translate(1px,1px)}.m-seven-and-half-deck.m-seven-and-half-pls{background:var(--card);background-image:none;font-size:calc(var(--cw)*.22)}
.m-seven-and-half-deck .m-seven-and-half-dn2{font-size:calc(var(--cw)*.4);line-height:1}.m-seven-and-half-cl{display:block;color:var(--ink);font-size:.68rem;background:var(--card);border:2px solid var(--ink);border-radius:6px;padding:0 5px;margin-top:2px;text-shadow:none}
.m-seven-and-half-cutme{position:absolute;top:-10px;right:-16px;background:var(--mus);border:2px solid var(--ink);padding:1px 5px;font-size:.6rem;transform:rotate(8deg);z-index:2;text-shadow:none;color:var(--ink)}
.m-seven-and-half-frown{position:absolute;top:-8px;left:-8px;font-size:1.4rem;z-index:2}.m-seven-and-half-ring{position:absolute;left:-6px;top:-6px;width:calc(100% + 12px);height:calc(100% + 12px);pointer-events:none;overflow:visible;z-index:2}
.m-seven-and-half-ring rect{fill:none;stroke:#fff;stroke-width:5;stroke-dasharray:100;stroke-dashoffset:100;vector-effect:non-scaling-stroke}.m-seven-and-half-ring.m-seven-and-half-still rect{stroke:var(--lil)}
.m-seven-and-half-rsv{width:var(--cw);height:calc(var(--cw)*.72);border:3px dashed var(--ink);border-radius:8px;display:grid;place-items:center;text-align:center;font-size:.54rem;line-height:1.1;font-weight:900;background:#ffffff66;color:var(--ink);text-shadow:none;padding:2px}
.m-seven-and-half-btns{display:flex;gap:6px;align-items:center}.m-seven-and-half-hz{flex:1 1 200px;max-width:420px;min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px}
.m-seven-and-half-hgh{width:calc(var(--cw)*1.5);height:calc(var(--cw)*.5);border:3px dashed var(--ink);border-radius:8px;display:grid;place-items:center;font-size:.6rem;font-weight:900;text-align:center;background:#ffffff66;color:var(--ink);text-shadow:none;padding:2px}
.m-seven-and-half-hand{display:flex;justify-content:center;align-items:flex-end;min-height:calc(var(--cw)*1.4 + 10px);padding:6px 8px;max-width:100%;overflow:hidden}
.m-seven-and-half-hand.m-seven-and-half-shr{animation:m-seven-and-half-shrink .5s ease-in forwards}
.m-seven-and-half-card{position:relative;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:var(--cw);aspect-ratio:5/7;padding:0;background:var(--card);border:3px solid var(--ink);border-radius:10px;box-shadow:2px 2px 0 var(--ink);color:var(--ink);font-weight:900;text-shadow:none;animation:m-seven-and-half-wob 3s ease-in-out infinite alternate;touch-action:none;user-select:none;-webkit-user-select:none}
.m-seven-and-half-hand .m-seven-and-half-card+.m-seven-and-half-card{margin-left:calc(var(--cw)*-.35)}.m-seven-and-half-num{font-size:calc(var(--cw)*.46);line-height:1}
.m-seven-and-half-wd{font-size:calc(var(--cw)*.13);text-transform:uppercase;letter-spacing:.03em;line-height:1}.m-seven-and-half-pips{display:grid;grid-template-columns:repeat(4,auto);gap:calc(var(--cw)*.04)}
.m-seven-and-half-pips i{width:calc(var(--cw)*.09);height:calc(var(--cw)*.09);border-radius:50%;background:var(--ink)}
.m-seven-and-half-card.m-seven-and-half-cpy{filter:grayscale(1) blur(var(--bl,.5px));background:repeating-linear-gradient(135deg,#f2f2f2 0 8px,#ddd 8px 9px)}
.m-seven-and-half-card.m-seven-and-half-cpy::after{content:'COPY';position:absolute;inset:0;display:grid;place-items:center;transform:rotate(-30deg);opacity:.35;font-size:calc(var(--cw)*.24)}.m-seven-and-half-card.m-seven-and-half-e8{background:#fff}
.m-seven-and-half-card.m-seven-and-half-e8::before{content:'RUMOUR';position:absolute;left:0;right:0;top:6px;background:#c0392b;color:#fff;font-size:calc(var(--cw)*.12);text-align:center;letter-spacing:.08em}
.m-seven-and-half-q{animation:m-seven-and-half-pulse 1s ease-in-out infinite alternate;display:inline-block}.m-seven-and-half-card.m-seven-and-half-sk{background:repeating-linear-gradient(0deg,#d6ebff 0 6px,#fff 6px 12px)}
.m-seven-and-half-lv{position:absolute;left:50%;top:14px;width:104px;margin-left:-52px;padding:2px 4px;background:#fff;color:var(--ink);border:2px solid var(--ink);font-size:.58rem;line-height:1.1;text-align:center;text-shadow:none;transform:rotate(-4deg);z-index:3;pointer-events:none}
.m-seven-and-half-card.m-seven-and-half-po::after{content:'';position:absolute;bottom:8%;left:calc(50% - 5px);width:10px;height:14px;background:#c0392b;clip-path:polygon(50% 0,100% 30%,70% 100%,30% 100%,0 30%)}
.m-seven-and-half-card.m-seven-and-half-ts{background:linear-gradient(135deg,var(--card) 55%,#d9a45f);box-shadow:3px 3px 0 #7a4a1f}.m-seven-and-half-card.m-seven-and-half-in{z-index:3}.m-seven-and-half-tray{display:none;align-items:center;gap:6px}
.m-seven-and-half-tray.m-seven-and-half-on{display:flex}.m-seven-and-half-sign{font-size:.62rem;background:#fff;color:var(--ink);border:2px solid var(--ink);padding:1px 6px;border-radius:4px;text-shadow:none;transform:rotate(-3deg)}
.m-seven-and-half-bellc{display:flex;flex-direction:column;align-items:center;gap:4px}
.m-seven-and-half-bell{position:relative;display:grid;place-items:center;width:56px;height:56px;padding:0;border-radius:50%;background:var(--coral);border:3px solid var(--ink);box-shadow:3px 3px 0 var(--ink);font-size:1.6rem;text-shadow:none;color:var(--ink);touch-action:pan-y}
.m-seven-and-half-bell:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-seven-and-half-bell.m-seven-and-half-flash{animation:m-seven-and-half-flash .5s 4}.m-seven-and-half-bell .m-seven-and-half-ring{border-radius:50%}
.m-seven-and-half-btn2{min-height:44px;padding:2px 12px;background:var(--mus);color:var(--ink);text-shadow:none;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);font-weight:900}
.m-seven-and-half-btn2:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
.m-seven-and-half-btab{position:absolute;right:0;top:150px;z-index:10;writing-mode:vertical-rl;background:var(--lil);border:3px solid var(--ink);border-right:0;border-radius:10px 0 0 10px;padding:10px 6px;font-weight:900;letter-spacing:.06em;box-shadow:var(--lay)}
.m-seven-and-half-bpanel{position:absolute;right:10px;top:70px;z-index:30;width:min(340px,calc(100% - 20px));background:var(--lil);border:3px solid var(--ink);box-shadow:5px 5px 0 var(--ink);border-radius:10px;padding:10px;color:var(--ink)}
.m-seven-and-half-pg{position:relative;background:#fff;border:2px solid var(--ink);padding:10px;min-height:110px;font-size:.82rem;overflow:hidden}.m-seven-and-half-pg.m-seven-and-half-rep .m-seven-and-half-pgt{text-decoration:line-through;opacity:.7}
.m-seven-and-half-pgs{margin-top:6px;font-size:.7rem;font-weight:900}.m-seven-and-half-repst{position:absolute;right:6px;bottom:8px;border:3px solid #c0392b;color:#c0392b;padding:0 6px;font-weight:900;transform:rotate(-8deg);background:#fffd}
.m-seven-and-half-bnav{display:flex;gap:6px;align-items:center;justify-content:space-between;margin-top:8px}.m-seven-and-half-fls,.m-seven-and-half-wl,.m-seven-and-half-gl{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:25}
.m-seven-and-half-fl{position:absolute;max-width:190px;padding:5px 8px;background:var(--card);color:var(--ink);border:2px solid var(--ink);border-radius:6px;font-size:.7rem;font-weight:800;box-shadow:2px 2px 0 var(--ink);animation:m-seven-and-half-fl 3.8s ease-out forwards;transform:rotate(var(--r,-3deg));text-shadow:none}
.m-seven-and-half-fl.m-seven-and-half-ud{transform:rotate(180deg)}
.m-seven-and-half-fl.m-seven-and-half-cop::after{content:'';display:block;height:4px;margin-top:4px;background:linear-gradient(90deg,transparent,var(--ink),transparent);background-size:50% 100%;background-repeat:no-repeat;animation:m-seven-and-half-bar 1s linear infinite}
.m-seven-and-half-walker{position:absolute;width:var(--cw);margin:calc(var(--cw)*-.36) 0 0 calc(var(--cw)*-.5);z-index:26;transition-property:left,top;transition-timing-function:ease-in-out}
.m-seven-and-half-wc{height:calc(var(--cw)*.72);background:var(--card);border:3px solid var(--ink);border-bottom-style:dashed;border-radius:10px 10px 0 0;display:grid;place-items:center;font-size:calc(var(--cw)*.5);color:var(--ink);text-shadow:none;font-weight:900}
.m-seven-and-half-walker i{position:absolute;bottom:-10px;width:6px;height:12px;background:var(--ink);animation:m-seven-and-half-step .25s steps(2) infinite}
.m-seven-and-half-walker i:nth-of-type(1){left:22%}.m-seven-and-half-walker i:nth-of-type(2){right:22%;animation-delay:.12s}
.m-seven-and-half-ghost{position:absolute;z-index:27;margin:calc(var(--cw)*-.35) 0 0 calc(var(--cw)*-.25);opacity:.9;transform:rotate(6deg)}.m-seven-and-half-ghost .m-seven-and-half-card{animation:none}
.m-seven-and-half-warm{position:absolute;inset:0;pointer-events:none;background:rgba(255,170,90,.12);mix-blend-mode:multiply;opacity:0;transition:opacity 20s linear;z-index:5}.m-seven-and-half-warm.m-seven-and-half-on{opacity:1}
.m-seven-and-half-vig{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 140px rgba(20,10,30,var(--vg));z-index:4}
.m-seven-and-half-ribbon{position:absolute;left:0;right:0;top:4px;height:22px;overflow:hidden;background:#fff;color:var(--ink);border-block:2px solid var(--ink);font-size:.68rem;line-height:18px;z-index:3;text-shadow:none;white-space:nowrap}
.m-seven-and-half-ribbon span{display:inline-block;animation:m-seven-and-half-marq 8s linear forwards}
.m-seven-and-half-cd{position:absolute;right:8px;top:8px;background:var(--coral);color:var(--ink);text-shadow:none;border:2px solid var(--ink);border-radius:99px;padding:0 10px;font-weight:900;z-index:3}
.m-seven-and-half-shake{animation:m-seven-and-half-shk .35s}.m-seven-and-half-sigh{animation:m-seven-and-half-sigh .6s}@keyframes m-seven-and-half-wob{from{transform:rotate(-1.5deg)}to{transform:rotate(1.5deg)}}
@keyframes m-seven-and-half-sway{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}@keyframes m-seven-and-half-wig{0%,100%{transform:rotate(0)}25%{transform:rotate(-7deg)}75%{transform:rotate(7deg)}}
@keyframes m-seven-and-half-spin{from{transform:rotate(180deg)}to{transform:rotate(0)}}@keyframes m-seven-and-half-fade{from{opacity:.2}to{opacity:1}}
@keyframes m-seven-and-half-wind{0%{opacity:0;translate:-30px 0}40%{opacity:1}100%{opacity:0;translate:90px -20px}}@keyframes m-seven-and-half-flipn{from{transform:rotateY(70deg)}to{transform:rotateY(0)}}
@keyframes m-seven-and-half-slide{from{transform:translateX(60px) rotate(8deg);opacity:0}to{opacity:1}}@keyframes m-seven-and-half-thunk{from{transform:scale(2.2) rotate(7deg);opacity:0}to{transform:scale(1) rotate(7deg);opacity:1}}
@keyframes m-seven-and-half-slam{0%{transform:scale(2.4) rotate(var(--rot,-4deg));opacity:0}60%{transform:scale(.95) rotate(var(--rot,-4deg));opacity:1}80%{transform:translate(3px,2px) rotate(var(--rot,-4deg))}100%{transform:scale(1) rotate(var(--rot,-4deg))}}
@keyframes m-seven-and-half-shk{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
@keyframes m-seven-and-half-sigh{0%,100%{transform:translateY(0)}50%{transform:translateY(1px) scale(.99)}}@keyframes m-seven-and-half-shrink{to{transform:scale(.3) translateY(40px);opacity:0}}
@keyframes m-seven-and-half-pulse{from{transform:scale(.9)}to{transform:scale(1.2)}}@keyframes m-seven-and-half-flash{0%,100%{background:var(--coral)}50%{background:#fff}}
@keyframes m-seven-and-half-fl{0%{opacity:0;translate:0 14px}12%{opacity:1;translate:0 0}80%{opacity:1}100%{opacity:0;translate:0 -26px}}@keyframes m-seven-and-half-bar{from{background-position:-50% 0}to{background-position:150% 0}}
@keyframes m-seven-and-half-step{from{height:12px}to{height:7px}}@keyframes m-seven-and-half-marq{from{transform:translateX(100%)}to{transform:translateX(-100%)}}@media (min-width:561px){.m-seven-and-half-root{padding-right:36px}}
@media (max-width:560px){.m-seven-and-half-cols{grid-template-columns:minmax(0,1fr)}.m-seven-and-half-side{order:2}.m-seven-and-half-btab{position:static;writing-mode:horizontal-tb;border:3px solid var(--ink);border-radius:12px;padding:1px 12px;margin-left:auto}.m-seven-and-half-hand .m-seven-and-half-card+.m-seven-and-half-card{margin-left:calc(var(--cw)*-.4)}.m-seven-and-half-tbl{padding:10px 8px}.m-seven-and-half-wall{gap:8px}.m-seven-and-half-root .m-seven-and-half-poster{max-width:96px;font-size:.62rem;padding:5px 6px;margin-top:4px}.m-seven-and-half-clk{width:76px}.m-seven-and-half-meter{width:90px}.m-seven-and-half-chips{flex:1 1 100%;max-width:none;margin-left:0;justify-content:flex-start}.m-seven-and-half-strip{min-height:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin:2px 0 6px;padding:3px 8px}.m-seven-and-half-bpanel{top:40px}.m-seven-and-half-dz{gap:6px}.m-seven-and-half-btn,.m-seven-and-half-btn2{min-height:44px}}
@media (prefers-reduced-motion:reduce){.m-seven-and-half-root *,.m-seven-and-half-root *::before,.m-seven-and-half-root *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.m-seven-and-half-tbl.m-seven-and-half-dim{filter:brightness(.88)}}
.pm-reduce-motion .m-seven-and-half-root *,.pm-reduce-motion .m-seven-and-half-root *::before,.pm-reduce-motion .m-seven-and-half-root *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
@media (prefers-reduced-motion:reduce){.m-seven-and-half-root .m-seven-and-half-fl{animation:none!important;opacity:1}.m-seven-and-half-root .m-seven-and-half-ribbon span{animation:none!important;transform:none}.m-seven-and-half-root .m-seven-and-half-ribbon{white-space:normal;height:auto;min-height:22px}}
.pm-reduce-motion .m-seven-and-half-root .m-seven-and-half-fl{animation:none!important;opacity:1}.pm-reduce-motion .m-seven-and-half-root .m-seven-and-half-ribbon span{animation:none!important;transform:none}.pm-reduce-motion .m-seven-and-half-root .m-seven-and-half-ribbon{white-space:normal;height:auto;min-height:22px}
.m-seven-and-half-dennis:hover .m-seven-and-half-leaf{animation:m-seven-and-half-wig .45s}.m-seven-and-half-half:hover .m-seven-and-half-hc{transform:rotate(-7deg)}
.m-seven-and-half-half.m-seven-and-half-rel .m-seven-and-half-hc{transform:translateY(22px) rotate(5deg)}.m-seven-and-half-half.m-seven-and-half-rel .m-seven-and-half-peg i:first-child{transform:rotate(-16deg);transform-origin:0 100%}
.m-seven-and-half-hand.m-seven-and-half-drill{transform:translateX(-120%) scale(.4);opacity:.15;transition:transform 1s ease-in,opacity 1s}
`, 'css-seven-and-half');
  P.addAchievements([ { id: 'seven-and-half.first', name: 'Grand Exalted Participant of the Seven and a Half Accord', desc: 'File your first hand. Dennis did not notice. You are enrolled regardless.', icon: '🃏', reward: 3 },
    { id: 'seven-and-half.almost', name: 'Grand Marshal of the Order of the Almost', desc: 'Stand on exactly 7. The half is not available. Reward: a dotted outline.', icon: '🔔', reward: 5 },
    { id: 'seven-and-half.laureate', name: 'Esteemed Laureate of the Seventh and Final Half', desc: 'Witness the half revealed in Dennis\'s hand 10 times. The ceremony remains hopeful.', icon: '🌿', reward: 5,
      check: function (s) { return (s['seven-and-half.halves'] || 0) >= 10; } },
    { id: 'seven-and-half.archivist', name: 'Supreme Archivist of Amendments', desc: 'Initial 12 amendments, or open the Rules Binder to page 12. Sandra\'s initials are always larger than yours.', icon: '🧾', reward: 5,
      check: function (s) { return (s['seven-and-half.initials'] || 0) >= 12; } },
    { id: 'seven-and-half.gentle', name: 'Chancellor of Cards Placed Gently', desc: 'Place 20 cards gently under Gentle Placement. Slams are noted but not counted against you. The cards have written a very short letter of thanks.', icon: '📌', reward: 4,
      check: function (s) { return (s['seven-and-half.gentle'] || 0) >= 20; } },
    { id: 'seven-and-half.request', name: 'Knight Commander of the Request for Half (Form 7 1/2-H)', desc: 'Request the half 21 times. The half has been informed that it is wanted. It declined.', icon: '📎', reward: 4,
      check: function (s) { return (s['seven-and-half.tugs'] || 0) >= 21; } },
    { id: 'seven-and-half.gifts', name: 'Plenipotentiary to the Court of Dennis', desc: 'Offer 7 cards to Dennis. He accepted all 7 and did not say thank you, in the traditional way.', icon: '🌱', reward: 4, check: function (s) { return (s['seven-and-half.gifts'] || 0) >= 7; } },
    { id: 'seven-and-half.keeper', name: 'Hereditary Keeper of the Half (Non-Binding)', desc: 'SECRET. Complete Form 7/2 and hold 7 1/2 for the full 3 seconds before it is voided.', icon: '🔔', secret: true, reward: 10 },
    { id: 'seven-and-half.stillness', name: 'Archduke of Absolute Stillness', desc: 'SECRET. Remain perfectly still and let the half sit beside your hand. You did nothing, and the half noticed.', icon: '🌿', secret: true, reward: 15 },
    { id: 'seven-and-half.clerical', name: 'The Clerical Error of the Century', desc: 'SECRET. Receive the half by mistake and hold exactly 7 1/2 for three full seconds. Then give it back.', icon: '🃏', secret: true, reward: 7.5 },
    { id: 'seven-and-half.leaf', name: 'The Leaf Has Spoken', desc: 'SECRET. Witness the meter tick to 0.1. It has been filed under \'draft\'.', icon: '🌱', secret: true, reward: 5 },
    { id: 'seven-and-half.convention', name: 'Grand Marshal of the Hitting Convention', desc: 'SECRET. Make the deck run out. The deck was only holding 7 cards. It has filed a grievance.', icon: '🧾', secret: true, reward: 5 },
    { id: 'seven-and-half.please', name: 'Most Courteous Petitioner', desc: 'SECRET. Say please. It was detected. It has been given no further consideration.', icon: '🌿', secret: true, reward: 3 },
    { id: 'seven-and-half.sock', name: 'Grand Cordon of the Order of the Sock (Unaccounted For)', desc: 'SECRET. Be dealt a card worth nothing that has been places. It did not stay for the photographs.', icon: '🃏', secret: true, reward: 4 },
    { id: 'seven-and-half.tenure', name: 'Laureate of the Long Service Pin (Provisional, Revocable, Reissued Hourly)', desc: 'SECRET. Stay at the table for 10 minutes. The pin is recalled at the end of the quarter, which is nearer than it sounds.', icon: '📌', secret: true, reward: 10 }
  ]);
  /* ---------- the lines (shuffle bags; S: = Sandra, G: = Gerald) ---------- */
  const L = {
    welcome: [`Welcome to Seven and a Half. Reach exactly 7 1/2 without going over. The 1/2 is with Dennis. Dennis is aware of nothing.`, `The deck holds 1 through 7. The half is a number too, but it is not in the deck. It is on Dennis, in a clothes peg.`,
    `Dennis (Plant) will be your opponent. Dennis has been in the building longer than the building has.`], firstHit: [`First card: a {count}. It will be remembered as the first one, which is the only thing it has going for it.`],
    hitV: [`A 1. The smallest whole number. It asked to be introduced as 'a start'.`, `A 2. A tidy 2. It has its coat and everything.`, `A 3. Three. Per policy, and also per arithmetic, which was copied in late.`, `A 4. Management has no notes on this 4. This is the highest praise it issues.`,
    `A 5. It sat very still as you drew it, like a card that has been told there will be photographs.`, `A 6. Bold. It has been circled on a chart that does not exist, and the circle is lovely.`, `A 7. The top of the deck reached for you, as promised. Nobody has mentioned the half. It is being very good about it.`],
    hit: [`You hit. Dennis did not. Dennis has the half and therefore no need to.`, `Another card. The deck says nothing, which is how decks consent.`, `The card has been dealt. Management circled back to it and it was still there. Management is moved.`],
    bustMore: [`You are busting further. Management respects the commitment.`, `More cards have joined the bust. It is now a gathering.`, `That card went nowhere useful. It has been given a lanyard.`], read: [`You are {count} short of 7 1/2. Management has checked the table for a whole number that fits. There isn't one.`,
    `Nobody has ever held 7 1/2. We checked twice and once with a ruler.`, `Every total available to you is whole. Management is not saying anything. Management is saying it quietly, near the plant.`], stand: [`You have stood. Standing is a legitimate strategy and the only thing the chairs have ever asked of anyone.`,
    `Standing on {count}. Dennis will now take all remaining cards, as is his right and his only move.`, `The bell has been rung. The bell is pleased. The bell would like you to know it had no choice.`, `You stand on {count}. The table appreciates the posture.`], standZero: [`You have stood on nothing. Confident. Wrong. Confident.`],
    close: [`You have 7. Please admire the dotted outline of the missing half. It is very tasteful.`, `Standing on 7. This is the closest anyone can be, officially. Sandra is drafting the void.`, `Seven. One half short of the only number that matters. Confetti has been authorised and will be revoked.`],
    bust: [`Bust. You went over 7 1/2 by {count}. A bust is simply a hand that has outgrown its container.`, `Your cards have been asked to leave the table in an orderly fashion. They are outside, chatting.`, `You busted. Dennis did not gloat. Dennis cannot gloat, and has not since he was a seed.`,
    `Bust. Sandra has classified this as 'a lot of 1/2'.`, `Over by {count}. The overage has been rounded down to a feeling.`], halfSlot: [`The last slot is RESERVED. The card bounced off it. The slot has been told it was not personal.`,
    `The deck has one slot left. The slot is for the half. The half is with Dennis. The slot is for show.`, `There are no more cards. There is a dashed rectangle. It has opinions about being asked.`, `HALF GOES HERE. That is a 5. It is not the half. The slot has noticed.`,
    `The slot has rejected your card with courtesy and without reading it.`], reveal: [`Dennis has turned his cards. He has done this without moving. Management cannot explain how.`, `Dennis has {count} and a half. Dennis does not react. Dennis is, to be fair, a plant.`,
    `Dennis Reaction Meter: 0.0. Sandra has asked for it to be recalibrated. It has been. It now says 0.0 with pride.`], revealT1: [`And there it is. The half. Last card, in Dennis's hand, as is customary.`], revealT2: [`The half. Again. Management is moved in a limited and scheduled way.`,
    `The half. Last, in Dennis's hand. A tiny fanfare has been played by someone who would rather not be named.`], revealT3: [`The half has been revealed. A parade was held. It was two pieces of confetti and a yes.`, `Two confetti. One yes. The parade has dispersed.`],
    revealT4: [`(The half is with Dennis.)`, `(The half is with Dennis. This has been a station announcement.)`, `(Half: Dennis.)`], ruling: [`Ruling: filed. Under 'Hands, Played, Outcome Unrelated To'.`, `Ruling: carried forward to Tuesday. Tuesday has been notified and is looming.`,
    `Ruling: adjourned. Nobody present has the authority to un-adjourn it.`, `Ruling: void, retroactively and with warmth.`, `Ruling: non-binding. The hand has been asked to consider itself a suggestion.`, `Ruling: furniture. Plants are not eligible. Neither are chairs. The chairs have not complained.`,
    `Ruling: both parties are present. Present is as high as the scale goes.`, `Ruling: no contest. Dennis has been asked to contest. Dennis has been asked for 11 years.`, `Ruling: inconclusive, with a lean toward 'sure'.`, `Ruling: pending since 2:14 PM. Please enjoy the pending.`,
    `Ruling: under review by a committee of one. The committee is leaning back in its chair.`, `Ruling: noted. The ruling is a sticky note. The sticky note has slid behind the desk, where rulings go to be thorough.`, `Ruling: you were closer. 'Closer' is not a word Sandra has been issued.`, `Ruling: smudge. Sandra has declared the whole table a smudge and asked everyone to step back from it.`],
    rulingInv: [`Ruling: investigation. A card that does not exist has been asked to attend.`], rulingZero: [`Ruling: zero hands played. Sandra has stamped nothing with total confidence.`],
    nobody: [`Nobody won. Nobody lost. The result is a perfectly round zero.`, `The result has been filed. It has been filed under 'Result'. There is no other folder.`, `Won 0. Lost 0. Pending is having a very good time.`],
    ledger: [`Ledger: Won 0, Lost 0, Pending {count}. Pending is having its best quarter.`, `Pending {count}. Pending has been promoted to a role it was not interviewed for.`, `The ledger has run out of lines. The oldest hand has been asked to retire. It has taken a pen.`],
    tug: [`You pulled the half. The half pulled back. It is on a leaf clip rated for 'a lot'.`, `The half has snapped back to Dennis with a tiny ruler sound. Dennis did not react. One leaf did, a bit. That is not a reaction.`,
    `Please do not touch the half. It has not been told about you.`, `Request for half denied. Reason on file: the half is with the other player.`, `You asked again. The answer is the same size.`, `Request {count} has been placed on top of requests 1 through 5. The stack is leaning toward Dennis.`,
    `Form 7 1/2-H (Request for Half) has been stamped, filed, and handed to Dennis, who is holding the half.`, `Request {count}. The beach is not available. The half is not available. Management is working on which of these it can be sincere about.`, `The half has been described to us as 'thriving'. Management has no further detail and has asked for none.`,
    `Management has asked Dennis on your behalf. Dennis said nothing. This is how Dennis says no.`, `Request {count}. A commemorative rope has been placed around the half. The rope is for show. Dennis has the half.`, `You have asked {count} times. The half has been told. It is on sabbatical, in a clip, in a pot.`,
    `The half has unionised. It has one demand, and the demand is to stay.`, `A marching band was rented for the half. It arrived at the wrong pot. It is playing for a ficus, who is touched.`, `Sandra has stamped your request with a stamp that says 'we hear you', which is a different stamp from 'yes'.`,
    `The half is on leave from its own leave. HR calls this 'a loop'. HR is not in the building.`, `Request {count}. Dennis has been asked to look up. He looked up in the way a plant looks up, which is always.`, `Please stop tugging. The clip has begun to write a statement.`,
    `The half has been tugged {count} times and has asked for a moment. It was granted a moment. It was Dennis's.`, `Twenty requests. The half is with Dennis. Management would like to say this is the last time it will say so. It will not be.`],
    post20: [`Request {count}. The answer is on file. The file is in Dennis.`, `Still Dennis.`, `Request {count} acknowledged. A rope has been added to the commemorative rope.`], staple: [`The half has been stapled. It did not consent. It did not object. It is a half.`, `A staple is a very serious kind of clip.`,
    `Tugging a stapled half is, technically, a form of filing.`], safety: [`The staple has been presented as 'a safety measure', following your {count} tugs. Management thanks you for informing the policy.`], callbackTugs: [`You have asked 7 times. The half is still with Dennis, who is still a plant.`],
    poke: [`You touched Dennis's leaf. Dennis has been touched. He is thriving. The leaf has been logged as 'a leaf'.`, `Dennis was poked. The Reaction Meter was checked. It reads 0.0 and looks well rested.`, `You told Dennis 'good hand'. Dennis heard it with leaves.`,
    `A leaf moved. Management investigated. It was the air conditioning, which has given its side of the story.`, `Dennis has been addressed {count} times. Dennis has been counted. Dennis has noted nothing.`], pokeTalk: [`Dennis, we should talk. Dennis has no response, as before.`],
    gift: [`You have offered Dennis a {count}. Dennis accepts the {count}. He did not look up. He cannot look up. It is a quality.`, `Dennis has been dealt another card. His hand grows. His posture does not.`], giftBribe: [`Dennis has been bribed. Dennis accepted. Dennis is not a changed plant.`],
    giftCrown: [`Dennis has been given a very small paper crown. He neither accepted it nor declined it. It stayed.`], giftSeven: [`Seven cards offered. Seven cards accepted. No thanks were given, in the traditional way.`], cut: [`The deck has been cut. The half-slot slid back underneath with a small schloop. It does that.`,
    `Cut. The top half lifted and re-stacked. Management felt something, briefly, in the region of its stapler.`], cutFidget: [`A fidget, officially filed as a cut. The deck has asked that it not be called a fidget.`], cutMe: [`The deck wants to be cut before it will talk to you.`],
    amend: [`AMENDMENT 1: Cards must be asked for sincerely. Hold the deck until it believes you.`, `AMENDMENT 2: The deck shall be cut before each hand, by hand, by an adult. The deck has been informed.`, `AMENDMENT 3: Silence is consent. Request permission from Dennis before each card. His silence is on file as a yes.`,
    `AMENDMENT 4: Any unauthorised movement counts as a hit. This is an amendment about you.`, `AMENDMENT 5: The deck is now alphabetised. The half is filed under Z, for zero point five, the only Z.`, `AMENDMENT 6: Cards must be placed gently. A slam is a noise, a noise is a complaint, a complaint is a form.`,
    `AMENDMENT 7: Seats are swapped. You are Dennis. Dennis is you. The half, per rule, is with the other player.`, `AMENDMENT 8: HIT and STAND shall exchange labels after each use, in the interest of fairness to the buttons.`,
    `AMENDMENT 9: Totals are rounded to the nearest 10 for clarity. Your 7 is now a 10. Congratulations on the promotion.`, `AMENDMENT 10: Hits are accepted from the left only. From the right is a different game.`, `AMENDMENT 11: Amendments 1 through 10 are repealed except one, which Sandra is fond of.`,
    `AMENDMENT 12: All amendments are repealed, including this one. Please re-read in a month.`], intro: [`A slip has arrived. It says AMENDED. It is not the first thing to say AMENDED today.`, `Sandra has amended the rules between hands. There was no between. There is now.`,
    `Please initial each amendment. Unsigned amendments are still enforced, but with a certain tone.`, `A new amendment has been served. It arrived faster than the last one. It will arrive faster next time.`], intro9: [`Two slips. Sandra is working ahead.`],
    initials: [`Sandra has initialled your initials. Sandra has initialled over your initials. Hers are bigger.`, `Initialled. Your initials look like a cardiogram that has made peace.`, `Initials accepted. They have been filed in a drawer labelled 'Initials, Miscellaneous'.`],
    uninitialled: [`You have proceeded uninitialled. Noted. Noted, in a font.`, `Uninitialled. The amendment is enforced anyway, with a certain tone. The tone is 'sure'.`, `Sandra has noted the lack of initials and has initialled the lack.`],
    repeal: [`Amendment {count} has been repealed. It is going to spend more time with its clauses.`, `Amendment {count} dropped off the list. It left a small stain in the shape of a paragraph.`,
    `Amendment {count} has retired. A cake was ordered. The cake was an amendment.`, `Amendment {count} is repealed, retroactively and in spirit. The spirit is Dennis.`, `Amendment {count} has been repealed by a vote of one. The one is Sandra and she is not available for comment.`],
    conflict: [`Amendment 1 says hold. Amendment 4 says movement is a hit. Sandra rules you must do both, politely.`, `Amendments conflict. Sandra rules that both apply, and that the conflict is a feature of the amendments.`, `Two amendments disagree. Sandra has asked them to see the binder.`,
    `Left-handed dealing and rounded totals are now in force. Sandra says it is a lifestyle.`], interim: [`Interim amendment: the word 'card' is now pronounced 'carp'. This is not enforced. It is recorded.`,
    `Interim amendment: the table may be looked at, but not appreciated, until further notice.`, `Interim amendment: nobody may say '7 1/2' out loud. Too late. It has been said.`, `Interim amendment: cards held at an angle of 7 1/2 degrees. The angle is not enforced. The angle is recorded.`,
    `Interim amendment: Amendment 10 never happened. Please do not look for it. It is in a drawer.`, `Interim amendment: the colour yellow has been reclassified as a mood.`],
    rider: [`RIDER: The dealer must be thanked. The dealer is the deck. The deck is pleased.`, `RIDER: Sandra may be cited, but not seen. This has always been the case.`, `RIDER: Rule 7 1/2(b)(iii) does not apply to Rule 7 1/2(b)(iii).`, `RIDER: Amendments 1 through 6 are hereby 'noted'.`],
    waive: [`Sandra has waived the amendments for this hand. She has done so in a tone that will be remembered.`], sincerityNo: [`Released early. The deck does not believe you. The deck has been lied to by experts.`, `The card refused. It wants more eye contact with the ring.`,
    `Sincerity not detected. Please try again, but with feeling.`], sincerityYes: [`The deck believes you. It does not know why.`], silenceWait: [`Waiting for Dennis's silence. 1... 2... still silence. Management has not seen silence this strong since the all-hands.`],
    silenceInterrupt: [`You interrupted his consent. Dennis is non-committal in a way that now needs to start from the top.`], silenceYes: [`Consent obtained. Dennis was silent throughout. It is the best silence on file.`],
    silenceNeedConsent: [`The deck has asked whether Dennis agrees. Dennis has not been asked. Please ask Dennis.`], moveDeal: [`Unauthorised movement detected. A card has been dealt to you for your trouble.`, `You moved. The deck counted that as a yes.`],
    stillness: [`Hold still. Hold still. This is the hardest move in the game and you are the only person in the world who is doing it.`], stillnessDone: [`You have stood still. Management has never been so moved, and has not moved.`],
    alpha: [`The deck is now alphabetised. The next card is five. Management feels in control, and has written it down in case it passes.`, `You know the next card. It is a rare feeling. Sandra has noticed the feeling and will comment.`], alphaSandra: [`S: Control detected. Control has been scheduled for a review.`],
    slam: [`That was a slam. A noise complaint has been filed against a card. The card is unable to respond.`], gentleYes: [`Placed gently. The card has written a short letter of thanks. It is one line. It says 'thanks'.`],
    seats: [`You are now the plant. Dennis is now you. Management can tell the difference and is checking.`], seatsHalf: [`The half has hopped across the table on tiny paper legs. It did not look back. It has no back.`],
    labels: [`Labels exchanged. HIT is now STAND. STAND is now HIT. The buttons have never been so well informed.`, `Labels swapped. The H key and the S key have also swapped. They were not consulted.`], rounded: [`Your total is rounded to the nearest 10. The 1 is now 0. The 7 is now 10. The bust is still real.`],
    leftFlop: [`From the right is a different game. The card has flopped back, hurt.`], leftFrown: [`A tap. Frowned upon. The deck has made a face.`], repealOne: [`Everything but one has been repealed. The binder has been stamped REPEALED. One page has been spared and is trying not to look smug.`],
    allRepealed: [`All amendments are repealed, including the one that repealed them. Management has a feeling about this and it is not on the agenda.`], finalAnnounce: [`THE FINAL HAND, scheduled for Tuesday. It is not Tuesday. It is never currently Tuesday.`],
    deckOfTwo: [`The deck has shrunk to 2 for stakeholder alignment: a 7 and the reserved slot. The room has gone soft.`], lonely: [`Management would like to say it misses the good old amendments. Management has said it. Management will now stand there.`],
    meter3: [`The meter was recalibrated at hand 3. The calibration was a small sticker. The sticker says 0.0, but newer.`], meter6: [`The meter is now PREMIUM. It reads 0.00. The second zero is a subscription.`],
    meter7: [`The meter is upside down. It reads 0.0 upside down. It is the same number from every side, which is the point of Dennis.`], meterDraft: [`The needle ticked to 0.1 and back. Sandra has filed it under 'draft'.`],
    stapler: [`The Stapler has been retained by Dennis to staple the half to his hand. The fee is 2 Meh and 'acknowledgement'.`, `STAPLER, UNION REP: one clack. One staple. The half has not moved. The staple has opinions.`],
    gerald: [`Gerald has been dealt in. Gerald did not ask to be.`, `G: A potato does not hit. A potato is hit. I hold that this is the whole game.`], geraldCard: [`G. (VP SPUDS) is worth a considerable amount, in a way Management would rather not quantify.`],
    potato: [`Potato Card (Unidentified). It is worth 3. Management does not know the potato. The potato knows Management.`], toast: [`The 4 has returned from the toaster, lightly toasted. It is a warmer 4. It speaks only in toast.`],
    loanOffer: [`S: Half-Card Lending Policy: Dennis may lend the half upon completion of Form 7/2, which has seven signatures and a half.`], loanProgress: [`Signature {count} of 7. The half-signature is last, and it is a signature that stopped early on purpose.`],
    loanDecline: [`The loan has been declined. Dennis has taken it well. Dennis takes everything well. It is his whole thing.`], loanLend: [`7 AND A HALF. You have 7 1/2. This has never happened. Please hold the moment. Please do not move.`],
    loanVoid: [`S: NON-BINDING. The loan has been recalled. The half returns to Dennis. It walks away in what has been described as a brisk manner.`, `You have won, technically, under Rule 4(b). Rule 4(b) has been repealed. By you. Just now. By winning.`,
    `Ruling: void, retroactively and with warmth. You may request the form again. You may. It will not help.`], finalSlide: [`Final hand. You have 7. Dennis slides you the half. You have 7 1/2.`], finalWin: [`You have won. Winning has been removed from the game as of this sentence.`],
    finalCert: [`S: Certificate of Victory: pending counter-signature of S. from Compliance, who is on a break. The break began in 2011.`], finalAuto: [`The 7 has been dealt on your behalf. You have stood on it. Management does this in the interest of the ending.`],
    finalLoneliness: [`This has been the best hand of a long career. Management would consider it a privilege to do it again.`, `Dennis did not move the entire time. A single leaf drifted. Sandra says it was a draft. Sandra has filed the draft under 'draft'.`],
    match2: [`We will now begin Match 2. It is identical to Match 1, except that you know things, and this is considered worse.`], match3: [`Match {count}. Management will skip the explanations. Nobody has ever missed them.`], smug1: [`S: Amendment 1 returns, dusted and slightly smug. It missed you.`],
    seasoned: [`Welcome back, {player}. Management remembers you. Management has a folder.`, `Welcome back, {player}. The half is with Dennis. This is the only update.`, `Dennis has been here the whole time. He did not ask for credit.`, `Match {count}. The deck has been rehearsing. It is no better.`],
    micro: [`The clock has jumped to 7:30. It was 7:30. It has jumped back to 7:30 with the same confidence.`, `A draft has rustled Dennis's leaf. This is explicitly not a reaction.`,
    `The deck has sighed. It is not a complaint. It is a deck being a deck near a person.`, `The Rules Binder has grown a tab. Nobody asked it to. It looks pleased.`, `FUN FACT: A 7 and a 1/2 is a 7 and a 1/2. Dennis has the 1/2. This has been a fun fact.`,
    `FUN FACT: The longest hand ever played here lasted 14 minutes. It was a hand of waiting for a hand.`, `FUN FACT: Dennis has never lost a hand. Dennis has never been in one.`, `Ten-second warning. For a deadline that does not exist. Management finds it gives everyone a sense of purpose.`,
    `Sandra has stamped something upside down. It was already filed. It is now filed upside down.`, `A postcard has arrived from the Missing Sock. It says 'Wish you were here'. It is not clear who is meant.`, `The Toaster has offered the table a half-slice. Sandra declined on a technicality: the half is warm.`],
    idle45: [`Nothing has happened for 45 seconds. Dennis has been in this state for years and is flourishing. Learn from Dennis.`], idleDeal: [`The deck has taken the initiative and dealt you a {count}. It has been waiting a long time and wanted to help.`],
    stillHalf: [`The half has stepped onto your side of the table. Please do not move. Please do not breathe in a way that moves.`], stillHold: [`The half is sitting next to your cards. You hold 7 1/2. It is trembling. Management is trembling. Please remain a statue.`],
    stillWin: [`You have been still for 20 seconds. The half has stayed. It is the most that has ever been asked of anyone.`], stillFlee: [`You moved. The half has fled. It tripped on the felt. It will say it did not.`],
    welcomeBack: [`Welcome back. While you were away, Dennis was dealt nothing. He is as he was. Everyone is pleased to be where they were.`], spamHit: [`That is a lot of cards. The deck is out. Sandra is photocopying more. Please do not look at the copier.`],
    spamCopy: [`Here is a copy of a {count}. It is worth approximately {count} and a bit blurry around the edges.`], spamFee: [`Deck Exhaustion Fee: 1 Meh per card. Management is sorry and also invoicing.`], spamFast: [`{count} cards in 3 seconds. Dennis has been dealt a smaller hand than this in his whole life as a flower.`],
    spamJam: [`The copier has jammed. OUT OF TONER (7 1/2). Management apologises to the toner.`], spamPlease: [`Please. The deck is not a bell and you are not a hotel.`], spamGrievance: [`The Stapler has filed a grievance. HIT is now 'Hit (Pending Review)'. It still works. This is for the record.`],
    spamOther: [`Please slow down. The bell is not a doorbell, and Management is not home.`, `Over-Enthusiasm Surcharge: 0.5 Meh. The deck has taken it as a tip.`], please: [`The word 'please' has been detected. The half has straightened. Nothing has been done about it. This is the compliment.`],
    pleaseHit: [`One sincere hit has been granted, on account of manners. The deck has asked that this not become a habit.`], please3: [`Politeness has been detected three times. The half has turned face-down out of modesty. The Reaction Meter does not move.`],
    eighth: [`There is no 8. It has been reported.`, `8 (RUMOUR). It is worth whatever you need. You need to stop. It has stopped you.`], eighthTalk: [`S: Interviewing the 8. 'It was not me. I was in the other deck.'`], eighthGone: [`The 8 has dissolved. A ghost outline remains in the ledger, as a courtesy.`],
    badge: [`It is a very good badge. He wears it well. He has never been seen to wear anything else.`], stare: [`Dennis is considering. He was considering a different player. Nobody knows which.`],
    clerical: [`CLERICAL ERROR. The half has been dealt to you. You hold exactly 7 1/2. Management has no procedure for this.`, `Everyone remain calm. Nobody say '7 1/2' out loud. Too late.`, `Correction: the half has been returned to Dennis, who was not told it had left. Everyone is pleased to be where they were.`],
    resizeNarrow: [`The table is not that wide. The table has never been that wide.`], resizeWide: [`A second seat has been unfolded. It holds a very small cactus labelled 'Reserve'. It will not be playing.`], clock: [`The clock says 7:30. It has said 7:30 since the clock was hung. It is very sure.`],
    poster: [`THE HALF IS WITH DENNIS.`]
  };
  /* ---------- punch-up pass: extra lines appended to the bags (order matters only for welcome, ruling and micro) ---------- */
  const MORE = {
    welcome: [`Nobody has touched the deck yet. Management is not worried. Management pre-worried last Thursday, to save time.`],
    firstHit: [`First card: a {count}. Management has put it in the minutes. The minutes are a napkin. The napkin is holding up.`],
    hit: [`A card has left the deck. The deck is taking it well. The deck has seen things leave.`, `Hit. The sound was a pop. Management has logged the pop and has no further plans for it.`, `Dennis quietly took a card of his own, face down, with a leaf. It went under the clip like a coin into a very small bank.`,
      `Sandra has noted that you hit. She would have noted anything. It is a gift.`, `Hits are recorded in a ledger that cannot add. It tries, and that is the policy.`, `The deck is shorter by one. Its feelings about this have been forwarded to the deck.`, `Card dealt. The next one is also a number. Management mentions it for reassurance.`],
    hitW: [`A 1. It arrived alone and would like it noted that it was not late.`, `A 2. Two of whatever a 2 is of. Management has sent a form asking.`, `A 3. Right on time, if the time was a 3.`, `A 4. Two 2s that stopped meeting separately.`, `A 5. Five. Management does not have fingers and so is the neutral party.`, `A 6. Half a dozen, and the dozen is not returning calls.`,
      `A 7. Seven. Management had to sit down, and has no chair, and sat on the idea of one.`],
    bustMore: [`That is a further card on a busted hand. Management has started a second bust beside the first, for scale.`, `Busting continues. Sandra has stopped keeping count and is now keeping approximately.`, `The hand is over 7 1/2 and still receiving. This is called hospitality.`],
    read: [`{count} to go. The gap has been measured and measures exactly what it says it does.`, `You are {count} short. The half would close that gap and has declined to be closed.`],
    stand: [`Stand on {count}. The deck has been surrendered to Dennis, who will not notice until he has to count it.`, `{count}. Decided. Management thanks you for deciding, and thanks the {count}, which did not ask to be thanked.`, `The bell rang once. In this building that is a lot.`,
      `A stand on {count}. The other kind of stand is a plant stand. Dennis does not have one. Dennis would not use it.`],
    standZero: [`You have stood without a hand. Sandra says this is permitted. Sandra said it like a person finding a clause.`],
    close: [`You are on 7. The half is one peg away, in the custody of a pot. It is further than it looks.`, `Seven. Management has had worse days at 7 and better ones at 7 1/2, which it has never had.`],
    bust: [`Bust. You have reached 8 or more, a region of the number line that Sandra has fenced.`, `Over by {count}. Management is not disappointed. Management is 'adjusting expectations in your direction'.`, `Bust. Dennis did not win. Dennis cannot win. This is simply what a bust looks like from outside the pot.`],
    halfSlot: [`The slot is full of nothing, reserved. Nothing is a very busy tenant.`, `No cards. The RESERVED slot was asked to step in, and then to step back out.`, `You pressed the deck. The deck is empty. The deck has its hands in its pockets.`],
    reveal: [`Dennis's cards are face up. They are as dull as cards. Management finds it restful.`, `Dennis has {count} and a half, gained by taking whatever was left. Management calls this a strategy because the form has a box for it.`, `The reveal has been performed. Everyone present has pretended to be present.`],
    revealT2: [`The half. Again. It was where it was. Management has applauded in a way that does not count as applause.`], revealT3: [`The parade was two confetti. One of them went under the radiator, where parades go to be thorough.`],
    revealT4: [`(As previously stated: Dennis.)`, `(Dennis, 2:14 PM, same as before.)`],
    ruling: [`Ruling: recused. Sandra has recused herself from a hand she was never in, in advance, as a precaution.`, `Ruling: overtaken by events. The events have been asked to slow down and be overtaken by something.`, `Ruling: see attached. Nothing is attached. Sandra considers the absence thorough.`,
      `Ruling: returned to sender. The sender is also the recipient, and accepted delivery with visible reluctance.`],
    nobody: [`Nobody won. Nobody lost. Somewhere, a very small trophy has been told to wait.`, `The hand has concluded. It has been given a certificate that says it concluded.`, `Result: 0 to 0, with feeling.`],
    ledger: [`Pending {count}. Pending now has a parking space.`, `The ledger has been updated. It said thank you in a font nobody has seen before.`],
    tugMile: [`Fifty requests. A plaque has been installed. It says 'Requested'. The half is in the clip, and the clip is in the other room.`, `One hundred requests. A cake has been ordered for the clip. The clip was unable to attend. The cake attended.`],
    tugSpam: [`Six tugs in three seconds. The clip has asked for a union rep. The union rep is the Stapler, who has been informed.`, `That is a lot of tugging. The half has begun to look slightly longer, out of reflex.`, `The half is being tugged at such speed that it has become, briefly, a rumour of a half.`],
    post20: [`{count}. The clip is now a landmark. It has a plaque. The plaque reads 'Clip'.`, `Request {count} has been entered in the Book of Requests, which is the Book of Answers, only thinner.`, `Request {count}. The half has been replaced by a photograph of the half. The photograph is equally unavailable.`,
      `Request {count}. Dennis has framed requests 1 through 20 and hung them behind himself. You cannot see them. They are doing fine.`],
    staple: [`The staple is holding. The staple has never held anything this seriously.`, `The half has been stapled to a leaf. Dennis felt nothing, which is how he feels everything.`],
    museumTug: [`A door elsewhere in the building is marked 7 1/2. Management has been asked if the half is in there. The half is with Dennis. The door is a coincidence.`],
    poke: [`You poked Dennis. He did not poke back. This is considered a strong opening.`, `A leaf was touched. It was returned to the plant. The plant was asked if anything was missing and said nothing, again.`, `Dennis was poked at 4:17 PM, near the third ficus. The ficus has asked not to be named.`,
      `You nudged Dennis. The pot absorbed it. The pot is rated for a nudge and a nudge only.`, `Dennis sat through the poke. There were no witnesses except everybody.`],
    pokeCb: [`Dennis was transferred from the Lobby for the evening. You have now poked him in both locations. HR calls this continuity.`],
    pokeSpam: [`Six pokes in three seconds. Dennis has been moved from 'thriving' to 'thriving, under observation'.`, `That is a lot of poking. Dennis has a legal obligation to feel something and has taken it under advisement.`, `Poking at speed. The leaf has requested hazard pay. HR has noted that Dennis has no HR.`],
    gift: [`Offered: a {count}. Dennis took it. He keeps all gifts in a drawer that is also a root system.`, `You gave Dennis a {count}. Your total is lower by {count}. His is higher by {count}. Nobody is richer.`, `Card given. Dennis has not said thank you. It is not that kind of pot.`],
    cut: [`Cut. The deck now has a top it did not have before and a bottom it has always had.`, `The deck was cut by hand. The hand was yours. The deck has been told which hand.`],
    cutFidget: [`Another cut. The deck is now as cut as it has ever been, which is a lot.`, `Cut again. The deck has stopped feeling it and started feeling observed.`],
    cutSpam: [`Eight cuts in three seconds. The deck is as cut as a deck can be, and a little more, as a courtesy.`, `The deck has been cut so often it has begun to resemble a very small stack of resignations.`, `Cut, cut, cut. The half-slot is going back under so fast it has started to say 'schloop' on its own.`],
    cutMe: [`CUT ME. The sticky note has been very patient. The sticky note is getting less sticky.`],
    clockSpam: [`Six clicks on the clock. It was 7:30 for all six. The clock is not impressed, and would like you to know it is 7:30.`, `The clock has been touched a lot. It said 7:30 each time. It is the most consistent employee in the building. Dennis is second.`,
      `Stop checking. It is 7:30. It was 7:30 when you started checking. Checking has not changed it, and Dennis is a witness.`],
    clock: [`You touched the clock. It is 7:30. It has been informed.`, `Clock inspected. It is a clock. It has the time. The time is 7:30. They have been introduced.`, `The clock was asked what time it is. It said 7:30, then asked you the same question, politely, out of form.`],
    intro: [`Another amendment. Sandra has had it laminated, which is how Management knew it was serious.`, `A slip. Hand-delivered by a hand nobody saw, which is Sandra's usual hand.`, `Per Sandra: the rules have been improved. They are now the same rules with a new cost.`],
    intro9: [`Two slips this time. One is the amendment. The other is a rider, which is the amendment wearing a hat.`],
    initials: [`Initials on file. They look like a signature that got off the bus one stop early.`, `Initialled. Your initials have been stored with the others, in a box labelled 'Others'.`],
    uninitialled: [`Proceeding uninitialled. A tiny alarm went off in Compliance. It is a bell the size of a thimble.`],
    repeal: [`Amendment {count} has been repealed. It was not consulted, but it was kept informed, which is worse.`],
    conflict: [`Two amendments in force disagree about the same hand. Sandra has asked the hand to hold both opinions politely.`, `Sandra has resolved the conflict by adding a third rule that disagrees with both. She is calling it consensus.`],
    interim: [`Interim amendment: Tuesday may not be mentioned before Tuesday. This has been mentioned.`, `Interim amendment: chairs must not be sat on with intent. Sitting may continue without intent.`, `Interim amendment: the number 4 has been asked to be 'more present'. The 4 says it will try.`,
      `Interim amendment: all elbows on the table are to be counted. Dennis has no elbows. Dennis is excused and thanked.`],
    rider: [`RIDER: This rider is attached to the amendment, which is attached to the binder, which is attached to a wall, which is attached to Tuesday.`, `RIDER: The word 'rider' is not a rider. Please do not ride it.`],
    waive: [`Sandra has waived the amendments for this hand, with a sigh that went into the minutes.`, `Waived. The rules have stepped out. They left a note that says 'back at 7:30'.`],
    slipIdle: [`S: I am still holding the pen. The pen is not mine. I would like it back, with your initials on it.`, `S: Unsigned amendments age badly. This one is aging in front of you.`, `S: Take your time. Take it. It is on the slip, under 'Time, Yours'.`],
    sincerityNo: [`The ring emptied. The deck did not feel it. Please hold for the full 0.8 seconds, which is about the length of a good look.`, `Not sincere enough. The deck can tell. It has been fooled by better and has not forgiven them.`],
    sincerityYes: [`The deck was moved. It dealt a card on the spot and then stood a little taller.`],
    silenceWait: [`Dennis is not responding. Analysts say this is a yes. The analysts are Sandra.`, `A long silence from Dennis. Experts are calling it 'continued'.`],
    silenceInterrupt: [`You interrupted his consent. It has started over, in the manner of a person re-entering a revolving door.`],
    silenceYes: [`Silence confirmed. Dennis consented the way he does everything: with the full weight of a houseplant.`],
    silenceNeedConsent: [`Permission is required from Dennis. Please poke him. He will not respond, and that is the correct answer.`],
    moveDeal: [`Your cursor went somewhere quickly. The deck has taken that to mean 'more'.`, `A twitch has been logged as a request. The twitch did not read the form.`, `Movement. The deck dealt you a card the way one hands a toddler a spoon.`],
    stillness: [`Stillness in progress. Management is holding still too, out of solidarity, and has stopped blinking in a way the budget did not cover.`, `Keep very still. Even the ring is trying not to move. It cannot help it. It is a ring.`],
    stillnessDone: [`Stillness achieved. Please be advised that nothing happened, expertly.`],
    slam: [`Slam detected. Form 12-S is on its way. It is being carried by another form.`, `The card arrived loudly. The neighbours are a plant and a potato, and they have both written in.`],
    gentleYes: [`Gentle. Sandra has awarded a small grey tick which does not count and is much loved.`, `That was soft. The felt would like to say it felt nothing, which is the compliment.`],
    labels: [`HIT is now where STAND was. STAND is where HIT was. Management lost track, then found it again, somewhere worse.`, `The labels have exchanged places. The buttons did not move. The buttons are not the ones being asked to adapt.`],
    rounded: [`Totals are rounded to the nearest 10. Your 7 is a 10. Your 3 is a 0. Everybody is better off, and nobody is happier.`, `Rounded for clarity. Sandra is unclear on the difference between clarity and rounding.`],
    leftFlop: [`The card was dropped from the wrong side. It returned to the deck and has put in for a transfer.`, `Wrong side. The card landed, thought about it, and went home.`],
    leftFrown: [`A click was received from the right-handed region of the building. The deck has frowned on the click and also on the building.`, `Frown logged. It looks like a small face being let down by an even smaller face.`],
    staplerMet: [`The Stapler recognises you from elsewhere. It did not nod. It does not have a nod. It clacked once, in the way a nod would.`],
    loanProgress: [`Signature {count} of 7. Your handwriting is now an official handwriting.`, `Signature {count}. Sandra has compared it to the last one and found them to be related.`],
    loanDecline: [`You have declined the half. It has gone back to its clip without ever leaving it, which is an achievement of timing.`],
    finalLoneliness: [`The table will be there tomorrow. So will Dennis. So will the half. It is that kind of building.`],
    seasoned: [`Welcome back, {player}. Dennis has not moved. This is a compliment to both of you.`, `Welcome back, {player}. The deck has been told you were coming. It has not slept.`],
    micro: [`The Missing Sock has been spotted near the deck. It was a shadow. It is on a journey and has asked not to be followed.`, `Sandra has stamped the clock. The clock is still 7:30. It has been stamped as proof.`, `Dennis has been in the building for 6,205 days. Management circled back to count them and found they were consecutive.`,
      `FUN FACT: The deck has 7 cards. The 8th was a rumour. The 9th is a rumour about the 8th.`, `FUN FACT: A full run of 1 through 7 adds up to 28. Dennis has known this since he was a seed.`, `FUN FACT: 7 1/2 is the only number with a bouncer. The bouncer is a clothes peg.`,
      `A paper plane has landed on the table. It says 'Per my previous message.' Nobody has seen the previous message. It is considered very thorough.`, `Somewhere, a stapler clacked. Everyone here has pretended it was not for them.`, `A very small meeting has been called in the pot. Dennis is chairing. Minutes will not be taken, as Dennis has none.`,
      `The lights flickered and returned at 7:30. They were gone for 0 seconds, by the clock.`, `Management would like to remind you that Tuesday exists, that it is a long way away, and that it is on its way.`],
    idle45: [`Forty-five seconds without a card. Management has stopped checking the deck and started checking you.`, `Hello? The game is not paused. It has simply started to wait for you. This is called engagement.`, `You have not done anything for 45 seconds. Sandra has put it in a file called 'Anything'.`],
    idleDeal: [`The deck has dealt you a {count}, unprompted. It could not take the quiet. It is not a quiet deck.`, `Management hit for you. It hit a {count}. It would like this kept out of the minutes.`],
    idle65: [`Sandra has opened an Inactivity Report. It is one line long, and the line is you.`, `A minute of nothing. The Reaction Meter was checked and is, if anything, more active than you.`, `Dennis has watched you do nothing before. He did not mention it then either.`],
    idleLong: [`You have been still for a long time. Management has stopped pretending to be busy and has sat down on the memory of a chair. Dennis nodded. Probably the air.`],
    spamFast: [`{count} presses in 3 seconds. The deck has asked whether this is love or a fire drill.`, `{count} presses. The deck felt every one of them and would now like to sit down.`],
    spamCopy: [`A copy of a {count}. It is worth approximately {count}, and slightly less each time it is copied.`, `Copy of a copy of a {count}. The {count} has been through a lot and has come out the other side as a smudge.`, `Another {count}, warm from the machine. It is the warmest thing in the building.`,
      `A {count}, duplicated. The original {count} has been asked to carry on as if nothing happened.`, `Copy. {count}. Its edges have gone soft, like a card remembering a better card.`, `Draw: {count}. Sandra has initialled the copy. The initials are also a copy.`],
    spamMile: [`Seven copies in. Management would say the copier is warming up, but the copier has been warm since 2011.`, `Thirteen copies. The toner light has come on. It is the colour of a small alarm that has given up on being one.`, `Eighteen. The copier has begun to make a sound like a tired kettle. Sandra has stopped watching it directly.`],
    spamJam: [`The copier has jammed on a 7 1/2 it could not print. The sign it printed instead is the sign.`],
    spamGrievance: [`The Stapler has filed a grievance on behalf of the HIT button, which was struck 25 times in 2 seconds. The button is under review.`],
    spamOther: [`That was 14 presses on things that are not the deck. A surcharge of 0.5 Meh has been applied. The surcharge was surprised too.`, `Sandra has noticed the pace. The pace has been noted, then billed.`, `Over-Enthusiasm Surcharge: 0.5 Meh. Enthusiasm has been filed under 'Enthusiasm (Over-)'.`],
    please: [`Please received. Management felt the manners as a small draught. The half sat up.`, `Politeness registered. It has been entered in a ledger with only one column, and the column is 'nice'.`],
    stare: [`Dennis has been looked at for 7 1/2 seconds. He has noted it, in the way a rock notes weather.`, `The leaf has cast a slow shadow toward you. It is not meant. Probably.`],
    welcomeBack: [`Welcome back. Dennis has been in the same place. You may resume resuming.`],
    away: [`Dennis has stepped out. A sign says BACK IN 5 MINUTES. The sign is dated 2009.`, `The half is currently held by a sign. The sign has accepted the responsibility and asked for a title.`, `Dennis is away from his pot. The pot is in. The pot has been asked to take messages, and has not said a word, which is also a message.`],
    awayPoke: [`You poked a pot with a sign on it. The pot has no comment. The sign says 5 minutes. It has said 5 minutes before.`, `The pot has been touched. The pot would like it known that Dennis is not in, and that it is being brave.`],
    awayBack: [`Dennis is back. He was here the whole time, in the sense that he has nowhere else.`],
    sock: [`A sock. It is worth 0 and has been to places. Management did not ask where, out of respect.`, `The Missing Sock has been dealt in. It does not add. It subtracts nothing. It carries a faint smell of somewhere else.`, `A card worth 0 has joined your hand. It has the expression of a sock, which is complete indifference with a heel.`],
    sockKnown: [`The Sock has been seen in other departments. This is a different appearance and an unrelated one. Sandra has insisted.`],
    sockGone: [`The sock has left. It took nothing. It left a small, sock-shaped amount of room.`, `The sock has moved on. It said it had a lot on, and then it had a lot on.`],
    m3a: [`The clock says 7:31. Everyone please remain seated. This has not happened before.`, `The clock says 7:31. It has said this before, somewhere else. Management does not discuss somewhere else.`],
    m3b: [`The clock is back to 7:30. It would like it noted that it was right both times.`], m3c: [`Dennis moved a leaf during the 7:31. It was not a reaction. It was a timestamp.`],
    t10: [`You have been here 10 minutes. Management would like to present the Long Service Pin (Provisional). Please do not wear it near anything.`, `Dennis has turned toward you by 1 degree. Sandra says it is the building settling. Management has chosen the other version.`,
      `The pin will be recalled at the end of the quarter. Management wanted you to have it first, and for a while, and to be seen with it.`],
    sevenAgain: [`Seven again. Confetti is on the list. The list is somewhere.`], sevenSmall: [`A 7. The confetti has delegated this to a smaller confetti.`],
    hintSlip: [`Initial the slip by dragging on the dotted line. Management will wait. Management has waited longer.`], hintOffer: [`Cards may be offered to Dennis. Dennis has not asked. Dennis never asks.`],
    hurry: [`The reveal has been shortened, per the reveal. Nobody objected. Nobody was invited to.`],
    denOver: [`Dennis is over by {count}. Dennis may not be over.`], denAmend: [`S: AMENDMENT 0: Dennis may be over. Pre-initialled, in large letters, in the traditional way.`], denRetro: [`The amendment is retroactive to the seed.`],
    relGasp: [`Management is not prepared for this. Management is prepared for Tuesday.`], relClack: [`STAPLER, UNION REP: one clack. The half is back in the clip. The clip has been told what happened and has chosen not to comment.`],
    drill: [`FIRE DRILL. Please proceed to the assembly point, which is the ledger. Dennis is Fire Warden and will remain where he is.`], drillEnd: [`Nobody was in danger. This was practice for the day there is a reason.`]
  };
  Object.keys(MORE).forEach(function (k) { L[k] = (L[k] || []).concat(MORE[k]); });
  Object.keys(L).forEach(function (k) { P.addLines(CAT + k, L[k]); });
  P.registerModule({ id: ID, title: 'Seven and a Half', tagline: 'Exactly 7 1/2. The half is with the other player.', icon: '🃏', category: 'game', unlockCost: 0, tags: ['cards', 'rules', 'dennis'], mount(root, api) { const el = api.el;
      const K = api.selftest ? 0.2 : 1;
      const ST = 'seven-and-half.';
      const R = {};
      const F = {};
      const STAMPS = ['FILED', 'CARRIED TO TUESDAY', 'ADJOURNED', 'VOID', 'NON-BINDING', 'FURNITURE', 'PRESENT', 'NO CONTEST', 'INCONCLUSIVE', 'PENDING SINCE 2:14 PM', 'UNDER REVIEW', 'NOTED', 'CLOSER (UNOFFICIAL)', 'SMUDGE', 'RECUSED', 'OVERTAKEN BY EVENTS', 'SEE ATTACHED', 'RETURNED TO SENDER'];
      const WORDS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];
      const ALPHA = [5, 4, 1, 7, 6, 3, 2];
      const ORDER = [1, 2, 4, 7, 3, 8, 5, 6, 9, 10, 11]; /* amendment served at hands 2..12: the seat swap now lands at hand 5, not 8 */
      const METERS = ['DENNIS REACTION (CALIBRATED 2009)', 'DENNIS REACTION (RECALIBRATED)', 'DENNIS REACTION (PREMIUM)'];
      /* ---------- state (everything lives in this closure so a remount is clean) ---------- */
      let matchNo = Math.min(9999, Math.max(0, Math.floor(Number(api.save.get('matches', 0))) || 0)) + 1;
      let crown = api.save.get('crown', false) === true;
      let sevenN = 0, denBustDone = false, ev6 = false, drillOn = false;
      let giftsLife = Math.min(1e6, Math.max(0, Math.floor(Number(api.save.get('gifts', 0))) || 0));
      let matchId = 0, hand = 1, phase = 'INIT', pid = 0, timers = [], uid = 0;
      let deck = [], mine = [], den = [], inForce = [], hitsUnder = {}, bind = [], ledger = [], filed = 0;
      let cutDone = false, cutPaid = false, consent = false, lblSwap = false, seatOn = false, waived = false, pleaseFree = false;
      let loanUsed = false, busy = false, silent = false, override = '', meterStage = 0, extraTabs = 0, conflictSeen = false;
      let tugs = 0, badgeN = 0, gifts = 0, pleaseN = 0, sessHits = 0, handHits = 0, eighthDone = false, stapled = false, staplerDone = false;
      let alphaSaid = false, firstHitSaid = false, readSaid = false, ghostEight = false, bustedHand = false, fromFinale = false;
      let lastInput = api.now(), lastProg = api.now(), lastMicro = api.now(), acted = false, hiddenAt = 0;
      let ring = null, still = null, sil = null, pd = null, cd = null, walk = null, swallowUntil = 0, lastTugPtr = 0;
      let lastMoveDeal = 0, lastMoveEval = 0, mv = null, hitTimes = [], otherTimes = [], lastSurcharge = -99999, grievance = false;
      let copier = null, halfOut = false, idleDealt = false, halfOutDone = false, stillWon = false, bustT = 0, bPage = 0, binderOpen = false, ledOpen = true;
      let keyBuf = '', hoverT = 0, narrowSaid = false, wideSaid = false, revealFast = false, lastTot = 0, lastDen = 0, forceRuling = '';
      let recentV = [], lastRoll = '', hitCount = 0, roundedSaid = false;
      let repDone = false, longDone = false, slipNag = false, away = false, sockDone = false, ev3 = false, ev10 = false, pokeCb = false;
      const t0 = api.now(), streaks = {}, cool = {};
      const bags = {};
      const openSlips = [];
      const sp = { x: 0, y: 0, vx: 0, vy: 0, on: false, drag: false, last: 0, sx: 0, sy: 0 };
      /* ---------- small helpers ---------- */
      function fmtN(x) { x = Number(x);
        if (!Number.isFinite(x) || x < 0) return '0';
        const w = Math.floor(x);
        return x - w >= 0.25 ? (w ? w + ' 1/2' : '1/2') : String(w);
      }
      function bagPick(key, arr) { let b = bags[key];
        if (!b || !b.q.length) { const q = api.shuffle(arr.map(function (_, i) { return i; }));
          if (b && q.length > 1 && q[q.length - 1] === b.last) q.unshift(q.pop());
          b = bags[key] = { q: q, last: b ? b.last : -1 };
        }
        const i = b.q.pop();
        b.last = i;
        return i;
      }
      function sfx(n) { if (!silent) api.sfx(n); }
      function aw(n, why) { return api.award(n, why); }
      function st(n, v) { api.stat.inc(ST + n, v === undefined ? 1 : v); }
      function restart(node, cls) { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); }
      function shake(node) { if (node) restart(node, 'm-seven-and-half-shake'); }
      function flash(node, cls, ms) { restart(node, cls); api.setTimeout(function () { node.classList.remove(cls); }, ms * K + 50); }
      function sayT(text, o) { o = o || {};
        let who = o.who || 'Management';
        const m = /^([SG]): /.exec(text);
        if (m) { text = text.slice(3); who = m[1] === 'S' ? 'Sandra' : 'Gerald'; }
        const opt = { mood: o.mood || 'neutral', who: who, priority: o.priority || 0 };
        if (o.duration) opt.duration = o.duration;
        return api.say(text, opt);
      }
      function pickLine(key) { const arr = L[key];
        return arr[bagPick(key, arr)];
      }
      function say(key, o) { o = o || {};
        const t = pickLine(key).split('{count}').join(o.count === undefined ? '' : String(o.count)).split('{player}').join(api.player.name);
        return sayT(t, o);
      }
      function setPhase(p) { endPhase(); phase = p; pid++; return pid; }
      function endPhase() { timers.forEach(function (t) { api.clearTimeout(t); });
        timers = [];
        if (bustT) { api.clearTimeout(bustT); bustT = 0; }
        cancelRing();
        resetStill();
        sil = null; consent = false; copier = null;
        paintSil();
        if (halfOut) { halfOut = false; override = ''; halfHome(); }
      }
      function later(fn, ms) { const id = pid;
        const t = api.setTimeout(function () { if (id === pid) fn(); }, Math.max(1, ms * K));
        timers.push(t);
        return t;
      }
      function laterM(fn, ms) { const m = matchId;
        return api.setTimeout(function () { if (m === matchId) fn(); }, Math.max(1, ms * K));
      }
      const isHit = function (w) { return w === hitCtl(); };
      function hitCtl() { return F.labels && lblSwap ? 'bell' : 'deck'; }
      function standCtl() { return hitCtl() === 'deck' ? 'bell' : 'deck'; }
      function canAct() { return (phase === 'PLAY' || phase === 'FINALE') && !busy; }
      function total() { let t = 0; for (let i = 0; i < mine.length; i++) t += mine[i].v; return t; }
      function denTotal() { let t = 0.5; for (let i = 0; i < den.length; i++) t += den[i].v; return t; }
      function holdMs() { return api.selftest ? 100 : 800; }
      function mkCard(v, kind) { return { v: v, kind: kind || 'n', id: ++uid }; }
      function buildDeck() { const d = [];
        const order = F.alpha ? ALPHA.slice().reverse() : api.shuffle([1, 2, 3, 4, 5, 6, 7]);
        order.forEach(function (v) { d.push(mkCard(v)); });
        return d;
      }
      /* ---------- DOM ---------- */
      function ringEl() { return el('svg', { class: 'm-seven-and-half-ring', viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' }, el('rect', { x: 2, y: 2, width: 96, height: 96, rx: 10, pathLength: 100 }));
      }
      function build() { R.live = el('div', { class: 'm-seven-and-half-sr', 'aria-live': 'polite' });
        R.poster = el('button', { class: 'm-seven-and-half-poster', type: 'button', title: L.poster[0], text: 'THE HALF IS WITH DENNIS', onclick: function () { sfx('tick'); if (streak('poster', 3, 3000, 1000)) doPlease(); } });
        R.clock = el('button', { class: 'm-seven-and-half-clk', type: 'button', 'aria-label': 'Wall clock, 7:30', onclick: onClock },
          el('svg', { viewBox: '0 0 40 40', 'aria-hidden': 'true' }, el('circle', { cx: 20, cy: 20, r: 17, fill: '#fff', stroke: '#2B2A33', 'stroke-width': 3 }), el('line', { x1: 20, y1: 20, x2: 14, y2: 26, stroke: '#2B2A33', 'stroke-width': 3, 'stroke-linecap': 'round' }),
            el('line', { x1: 20, y1: 20, x2: 20, y2: 32, stroke: '#2B2A33', 'stroke-width': 2, 'stroke-linecap': 'round' })), (R.plq = el('span', { class: 'm-seven-and-half-plq', text: '7:30 (states this with confidence)' })));
        R.needle = el('line', { class: 'm-seven-and-half-needle', x1: 50, y1: 50, x2: 50, y2: 16, stroke: '#c0392b', 'stroke-width': 3, 'stroke-linecap': 'round' });
        const ticks = [];
        for (let i = 0; i <= 6; i++) { const a = Math.PI - i * Math.PI / 6;
          ticks.push(el('line', { x1: 50 + 33 * Math.cos(a), y1: 52 - 33 * Math.sin(a), x2: 50 + 39 * Math.cos(a), y2: 52 - 39 * Math.sin(a), stroke: '#2B2A33', 'stroke-width': 2 }));
        }
        R.mlbl = el('div', { class: 'm-seven-and-half-mlbl', text: METERS[0] });
        R.meter = el('div', { class: 'm-seven-and-half-meter', title: 'Dennis Reaction Meter' },
          el('svg', { viewBox: '0 0 100 58', 'aria-hidden': 'true' }, el('path', { d: 'M10 52 A40 40 0 0 1 90 52 Z', fill: '#fff' }), el('path', { d: 'M10 52 A40 40 0 0 1 90 52', fill: 'none', stroke: '#2B2A33', 'stroke-width': 3 }), ...ticks, R.needle, el('circle', { cx: 50, cy: 52, r: 4, fill: '#2B2A33' })), R.mlbl);
        R.certs = el('div', { class: 'm-seven-and-half-certs' });
        R.chHand = el('span', { class: 'm-seven-and-half-chip' });
        R.chRules = el('span', { class: 'm-seven-and-half-chip' });
        R.chReq = el('span', { class: 'm-seven-and-half-chip' });
        R.btab = el('button', { class: 'm-seven-and-half-btab', type: 'button', 'aria-label': 'Rules Binder (R)', 'aria-expanded': 'false', onclick: function () { toggleBinder(); } }, 'Rules Binder');
        const chips = el('div', { class: 'm-seven-and-half-chips' }, R.chHand, R.chRules, R.chReq, R.btab);
        R.stripWho = el('b', { text: 'Management' });
        R.stripTxt = el('span', { text: 'Management is preparing a statement. The statement is a table.' });
        R.strip = el('div', { class: 'm-seven-and-half-strip', 'aria-live': 'off' },R.stripWho, R.stripTxt);

        R.ledh = el('button', { class: 'm-seven-and-half-ledh', type: 'button', 'aria-expanded': 'true', onclick: function () { ledOpen = !ledOpen; renderLedger(); } });
        R.ledl = el('ol', { class: 'm-seven-and-half-ledl' });
        const side = el('div', { class: 'm-seven-and-half-side' }, el('div', { class: 'm-seven-and-half-led' }, R.ledh, R.ledl));

        /* Dennis */
        R.fan = el('div', { class: 'm-seven-and-half-fan', 'aria-hidden': 'true' });
        R.fanx = el('span', { class: 'm-seven-and-half-fanx', hidden: true });
        R.leaf = el('span', { class: 'm-seven-and-half-leaf', 'aria-hidden': 'true', text: '🌿' });
        R.dennis = el('button', { class: 'm-seven-and-half-dennis', type: 'button', 'aria-label': 'Poke Dennis the plant (D)', title: 'Dennis (Plant)', onclick: onPoke, onpointerenter: onHover, onpointerleave: onLeave }, R.leaf, el('span', { class: 'm-seven-and-half-pot' }));
        R.crown = el('div', { class: 'm-seven-and-half-crown', hidden: !crown, 'aria-hidden': 'true' });
        R.badge = el('button', { class: 'm-seven-and-half-badge', type: 'button', 'aria-label': 'Dennis\'s lanyard badge', onclick: onBadge },
          el('span', { class: 'm-seven-and-half-bin' }, el('span', { class: 'm-seven-and-half-bf', text: 'D. PLANT, LOBBY. Reaction: 0.0' }), el('span', { class: 'm-seven-and-half-bb', text: 'Employee of the Month: every month since 2011. Reaction Level: none (approved)' })));
        R.silb = el('b');
        R.sil = el('div', { class: 'm-seven-and-half-sil', hidden: true, title: 'Silence', 'aria-hidden': 'true' }, R.silb);
        R.lv = el('div', { class: 'm-seven-and-half-lv', hidden: true, 'aria-hidden': 'true', text: 'BACK IN 5 MINUTES (since 2009)' });
        const dwrap = el('div', { class: 'm-seven-and-half-dwrap' }, R.crown, R.dennis, R.badge, R.sil, R.lv);
        R.hc = el('span', { class: 'm-seven-and-half-hc', text: '½' });
        R.hnote = el('span', { class: 'm-seven-and-half-hnote', hidden: true });
        R.half = el('button', { class: 'm-seven-and-half-half', type: 'button', 'aria-label': 'The half, held by D. Plant. Drag it to request it (T)', onpointerdown: tugDown, onclick: tugClick },
          el('span', { class: 'm-seven-and-half-peg', 'aria-hidden': 'true' }, el('i'), el('i'), el('b')), R.hc, R.hnote);
        R.cactus = el('div', { class: 'm-seven-and-half-cactus', hidden: true, 'aria-hidden': 'true', title: 'Reserve', text: '🌵' });
        const dz = el('div', { class: 'm-seven-and-half-dz' }, el('div', { class: 'm-seven-and-half-fanw' }, R.fan, R.fanx), dwrap, el('div', { class: 'm-seven-and-half-clipw' }, R.half, el('span', { class: 'm-seven-and-half-plate', text: 'HELD BY D. PLANT' })), R.cactus);

        /* middle */
        R.readn = el('span', { class: 'm-seven-and-half-readn', text: '0' });
        R.rbust = el('span', { class: 'm-seven-and-half-bust', hidden: true, text: 'BUST' });
        R.read = el('div', { class: 'm-seven-and-half-read' }, el('span', { text: 'YOU:' }), R.readn, R.rbust, el('span', { class: 'm-seven-and-half-rsub', text: '(7 1/2 requires a 1/2. See Dennis.)' }));
        R.slips = el('div', { class: 'm-seven-and-half-slips' });
        R.rev = el('button', { class: 'm-seven-and-half-rev', type: 'button', hidden: true, 'aria-label': 'Dennis\'s cards. Press to hurry the reveal', onclick: function () { revealFast = true; } });
        R.sbox = el('div', { class: 'm-seven-and-half-mid', style: { minHeight: '0' } });
        const mid = el('div', { class: 'm-seven-and-half-mid' }, R.read, R.slips, R.rev, R.sbox);

        /* you */
        R.dnum = el('span', { class: 'm-seven-and-half-dn2', text: '7' });
        R.deckRing = ringEl();
        R.deck = el('button', { class: 'm-seven-and-half-deck', type: 'button', 'aria-label': 'Deck. HIT (H)', onpointerdown: function (e) { ctlDown('deck', e); }, onclick: function (e) { ctlClick('deck', e); } }, R.dnum, R.deckRing);
        R.dlbl = el('span', { class: 'm-seven-and-half-cl', text: 'HIT' });
        R.cutme = el('span', { class: 'm-seven-and-half-cutme', hidden: true, text: 'CUT ME' });
        R.frown = el('span', { class: 'm-seven-and-half-frown', hidden: true, 'aria-hidden': 'true', text: '😞' });
        R.cut = el('button', { class: 'm-seven-and-half-btn2', type: 'button', 'aria-label': 'Cut the deck (C)', onclick: function () { doCut(); } }, 'CUT');
        R.rsv = el('div', { class: 'm-seven-and-half-rsv', text: 'LAST CARD: RESERVED' });
        R.sign = el('div', { class: 'm-seven-and-half-sign', hidden: true, text: 'OUT OF TONER (7 1/2)' });
        const dcol = el('div', { class: 'm-seven-and-half-dcol' }, R.deck, R.cutme, R.frown, R.dlbl, R.rsv, R.cut, R.sign);
        R.hgh = el('div', { class: 'm-seven-and-half-hgh', text: 'HALF GOES HERE' });
        R.hand = el('div', { class: 'm-seven-and-half-hand', role: 'group', 'aria-label': 'Your hand' });
        R.trayHc = el('span', { class: 'm-seven-and-half-hc', text: '½' });
        R.traySign = el('span', { class: 'm-seven-and-half-sign', hidden: true, text: 'DO NOT MOVE' });
        R.tray = el('div', { class: 'm-seven-and-half-tray' }, R.trayHc, R.traySign);
        const hz = el('div', { class: 'm-seven-and-half-hz' }, R.hgh, R.hand, R.tray);
        R.bell = el('button', { class: 'm-seven-and-half-bell', type: 'button', 'aria-label': 'Bell. STAND (S)', onpointerdown: function (e) { ctlDown('bell', e); }, onclick: function (e) { ctlClick('bell', e); } }, '🔔', ringEl());
        R.bellLbl = el('span', { class: 'm-seven-and-half-cl', text: 'STAND' });
        const pz = el('div', { class: 'm-seven-and-half-pz' }, dcol, hz, el('div', { class: 'm-seven-and-half-bellc' }, R.bell, R.bellLbl));
        R.deckRect = R.deckRing.firstChild;
        R.bellRect = R.bell.lastChild.firstChild;
        R.tbl = el('div', { class: 'm-seven-and-half-tbl' }, dz, mid, pz);
        R.dz = dz;

        R.pgbox = el('div');
        R.bnum = el('span', { text: '' });
        R.bprev = el('button', { class: 'm-seven-and-half-btn', type: 'button', 'aria-label': 'Previous page', onclick: function () { flipPage(-1); } }, '<');
        R.bnext = el('button', { class: 'm-seven-and-half-btn', type: 'button', 'aria-label': 'Next page', onclick: function () { flipPage(1); } }, '>');
        R.bpanel = el('div', { class: 'm-seven-and-half-bpanel', hidden: true, role: 'dialog', 'aria-label': 'Rules Binder' }, el('b', { text: 'THE RULES BINDER' }), R.pgbox,
          el('div', { class: 'm-seven-and-half-bnav' }, R.bprev, R.bnum, R.bnext, el('button', { class: 'm-seven-and-half-btn', type: 'button', onclick: function () { toggleBinder(false); } }, 'Close')));
        R.fls = el('div', { class: 'm-seven-and-half-fls', 'aria-hidden': 'true' });
        R.wl = el('div', { class: 'm-seven-and-half-wl', 'aria-hidden': 'true' });
        R.gl = el('div', { class: 'm-seven-and-half-gl', 'aria-hidden': 'true' });
        R.warm = el('div', { class: 'm-seven-and-half-warm', 'aria-hidden': 'true' });
        R.vig = el('div', { class: 'm-seven-and-half-vig', 'aria-hidden': 'true' });
        R.root = el('div', { class: 'm-seven-and-half-root' }, R.live, el('div', { class: 'm-seven-and-half-wall' }, R.poster, R.clock, R.meter, R.certs, chips), R.strip, el('div', { class: 'm-seven-and-half-cols' }, side, R.tbl), R.bpanel, R.vig, R.warm, R.fls, R.wl, R.gl);
        root.appendChild(R.root);
        api.setTitle('Seven and a Half');
      }
      /* ---------- rendering ---------- */
      function cardEl(c, isBtn) { const kids = [];
        if (c.kind === 'eighth') kids.push(el('span', { class: 'm-seven-and-half-num', text: '8' }), el('span', { class: 'm-seven-and-half-q', text: '?' }));
        else if (c.kind === 'sock') kids.push(el('span', { class: 'm-seven-and-half-num', text: '0' }), el('span', { class: 'm-seven-and-half-wd', text: 'sock' }));
        else if (c.kind === 'potato') kids.push(el('span', { class: 'm-seven-and-half-num', text: '🥔' }), el('span', { class: 'm-seven-and-half-wd', text: api.flag.get('metGerald') ? 'G. VP SPUDS' : 'POTATO' }));
        else { kids.push(el('span', { class: 'm-seven-and-half-num', text: String(c.v) }));
          if (F.alpha && c.kind === 'n' && WORDS[c.v]) kids.push(el('span', { class: 'm-seven-and-half-wd', text: WORDS[c.v] }));
          else kids.push(el('span', { class: 'm-seven-and-half-pips' }, ...Array.from({ length: Math.max(0, Math.min(7, c.v)) }, function () { return el('i'); })));
          if (c.kind === 'copy') kids.push(el('span', { class: 'm-seven-and-half-wd', text: 'copy' }));
        }
        const cls = 'm-seven-and-half-card' + (c.kind === 'copy' ? ' m-seven-and-half-cpy' : c.kind === 'eighth' ? ' m-seven-and-half-e8' : c.kind === 'potato' ? ' m-seven-and-half-po' : c.kind === 'sock' ? ' m-seven-and-half-sk' : c.kind === 'toast' ? ' m-seven-and-half-ts' : '');
        const at = { class: cls, 'aria-label': 'Card ' + (c.kind === 'eighth' ? 8 : c.v) + (c.kind === 'n' ? '' : ', ' + c.kind), dataset: { id: String(c.id) } };
        if (isBtn) { at.type = 'button'; at.onpointerdown = function (e) { cardDown(c, e); }; at.onclick = function () { sfx('tick'); }; }
        const node = el(isBtn ? 'button' : 'div', at, ...kids);
        if (c.bl) node.style.setProperty('--bl', c.bl.toFixed(1) + 'px');
        return node;
      }
      function keepFocus(box, then) { const had = box.contains(document.activeElement);
        then();
        if (had) { try { R.deck.focus({ preventScroll: true }); } catch (x) { /* no focus */ } }
      }
      function clearSlips() { keepFocus(R.slips, function () { R.slips.textContent = ''; }); }
      function renderHand(fresh) { const hadFocus = R.hand.contains(document.activeElement);
        R.hand.textContent = '';
        if (hadFocus) { try { R.deck.focus({ preventScroll: true }); } catch (x) { /* no focus */ } }
        const list = mine.slice(-10);
        if (mine.length > 10) R.hand.appendChild(el('span', { class: 'm-seven-and-half-sign', text: '+' + (mine.length - 10) }));
        let node = null;
        list.forEach(function (c) { const n = cardEl(c, true); if (c === fresh) node = n; R.hand.appendChild(n); });
        if (!list.length) R.hand.appendChild(el('span', { class: 'm-seven-and-half-sign', text: 'no cards held' }));
        if (node && !reduced()) { const a = R.deck.getBoundingClientRect(), b = node.getBoundingClientRect();
          const dx = a.left - b.left, dy = a.top - b.top;
          if (Number.isFinite(dx) && Number.isFinite(dy)) { node.style.transition = 'none';
            node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
            void node.offsetWidth;
            node.style.transition = 'transform 220ms ease-out';
            node.style.transform = '';
          }
        }
      }
      function renderDeck() { const n = Math.min(7, deck.length);
        const sh = [];
        for (let i = 1; i <= n; i++) sh.push(i + 'px ' + i + 'px 0 #2B2A33');
        R.deck.style.setProperty('--stk', sh.length ? sh.join(',') : '0 0 0 transparent');
        const pls = copier && copier.stage === 'please';
        R.deck.classList.toggle('m-seven-and-half-pls', !!pls);
        R.dnum.textContent = pls ? 'Please' : String(deck.length);
        R.deck.style.opacity = deck.length || pls ? '' : '.5';
        R.sign.hidden = !(copier && copier.jam);
        R.cutme.hidden = !(F.cut && !cutDone && !waived && phase === 'PLAY');
        renderLabels();
      }
      function renderLabels() { const hit = 'HIT' + (grievance ? ' (Pending Review)' : '');
        R.dlbl.textContent = isHit('deck') ? hit : 'STAND';
        R.bellLbl.textContent = isHit('bell') ? hit : 'STAND';
        R.deck.setAttribute('aria-label', 'Deck. ' + R.dlbl.textContent + (isHit('deck') ? ' (H)' : ' (S)'));
        R.bell.setAttribute('aria-label', 'Bell. ' + R.bellLbl.textContent + (isHit('bell') ? ' (H)' : ' (S)'));
      }
      function renderFan() { R.fan.textContent = '';
        const n = Math.min(4, den.length);
        for (let i = 0; i < n; i++) { const c = el('span', { class: 'm-seven-and-half-mc' }); c.style.setProperty('--r', (i * 9 - 14) + 'deg'); R.fan.appendChild(c); }
        R.fanx.hidden = den.length <= 4;
        R.fanx.textContent = '+' + Math.max(0, den.length - 4);
      }
      function renderLedger() { R.ledh.textContent = (ledOpen ? '▾ ' : '▸ ') + 'Won 0, Lost 0, Pending ' + filed;
        R.ledh.setAttribute('aria-expanded', ledOpen ? 'true' : 'false');
        R.ledl.hidden = !ledOpen;
        R.ledl.textContent = '';
        ledger.forEach(function (t) { R.ledl.appendChild(el('li', { text: t })); });
      }
      function renderBinderTab() { const sh = [];
        const n = Math.min(12, bind.length + extraTabs);
        for (let i = 1; i <= n; i++) sh.push((-i * 3) + 'px 0 0 ' + (i % 2 ? '#9b86cc' : '#2B2A33'));
        R.btab.style.setProperty('--lay', sh.length ? sh.join(',') : '0 0 0 transparent');
      }
      function shownTotal() { if (override) return override;
        const t = total();
        return F.rounded ? String(Math.round(t / 10) * 10) : fmtN(t);
      }
      function render() { const t = total();
        const s = shownTotal();
        if (R.readn.textContent !== s) restart(R.readn, 'm-seven-and-half-flipn');
        R.readn.textContent = s;
        R.read.classList.toggle('m-seven-and-half-gold', !!override);
        R.rbust.hidden = !(t >= 8 && !override);
        R.chHand.textContent = 'Hand ' + (hand === 13 ? '7 1/2' : hand);
        R.chRules.textContent = 'Rules in force: ' + inForce.length;
        R.chReq.textContent = 'Requests for Half: ' + tugs;
        R.mlbl.textContent = METERS[Math.min(2, meterStage)];
      }
      function renderAll() { render(); renderHand(); renderDeck(); renderFan(); renderLedger(); renderBinderTab(); if (binderOpen) renderBinder(); }
      function paintSil() { R.sil.hidden = !F.silence;
        R.sil.classList.toggle('m-seven-and-half-ok', !!(sil && sil.ok));
        R.silb.style.transition = 'none';
        R.silb.style.width = sil && sil.ok ? '100%' : '0';
      }
      function floater(text, cls) { const f = el('div', { class: 'm-seven-and-half-fl ' + (cls ? 'm-seven-and-half-' + cls : ''), text: text, style: { left: (4 + api.randInt(0, 55)) + '%', top: (22 + api.randInt(0, 40)) + '%' } });
        f.style.setProperty('--r', (api.randInt(-5, 5)) + 'deg');
        R.fls.appendChild(f);
        while (R.fls.children.length > 8) R.fls.removeChild(R.fls.firstChild);
        api.setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); }, 3900);
      }
      function stampEl(text) { const s = el('span', { class: 'm-seven-and-half-stamp', text: text });
        s.style.setProperty('--rot', api.randInt(-6, 6) + 'deg');
        return s;
      }
      /* ---------- the half: spring, walking, hiding ---------- */
      function springStart() { if (sp.on) return;
        sp.on = true; sp.last = 0;
        api.requestAnimationFrame(springStep);
      }
      function springStep(ts) { if (!sp.on) return;
        ts = Number.isFinite(ts) ? ts : api.now();
        if (!sp.last) sp.last = ts;
        const dt = Math.min(64, Math.max(0, ts - sp.last));
        sp.last = ts;
        if (!sp.drag) { const n = Math.max(1, Math.round(dt / 16.67));
          for (let i = 0; i < n; i++) { sp.vx = (sp.vx - sp.x * 0.2) * 0.82; sp.vy = (sp.vy - sp.y * 0.2) * 0.82;
            sp.x += sp.vx; sp.y += sp.vy;
          }
        }
        R.half.style.transform = 'translate(' + sp.x.toFixed(1) + 'px,' + sp.y.toFixed(1) + 'px)';
        if (!sp.drag && Math.abs(sp.x) + Math.abs(sp.y) + Math.abs(sp.vx) + Math.abs(sp.vy) < 0.4) { sp.on = false; sp.x = sp.y = sp.vx = sp.vy = 0;
          R.half.style.transform = '';
          return;
        }
        api.requestAnimationFrame(springStep);
      }
      function cancelWalk(callCb) { if (!walk) return;
        const w = walk; walk = null;
        api.clearTimeout(w.t);
        if (w.node.parentNode) w.node.parentNode.removeChild(w.node);
        if (callCb && w.cb) w.cb();
      }
      function walkHalf(from, to, ms, cb) { cancelWalk(true);
        const rr = R.root.getBoundingClientRect();
        const a = from.getBoundingClientRect ? from.getBoundingClientRect() : from;
        const b = to.getBoundingClientRect ? to.getBoundingClientRect() : to;
        const cx = function (r) { return (r.left + r.width / 2 - rr.left); };
        const cy = function (r) { return (r.top + r.height / 2 - rr.top); };
        const node = el('div', { class: 'm-seven-and-half-walker', style: { left: cx(a) + 'px', top: cy(a) + 'px' } }, el('div', { class: 'm-seven-and-half-wc', text: '½' }), el('i'), el('i'));
        R.wl.appendChild(node);
        void node.offsetWidth;
        const dur = Math.max(60, ms * K);
        node.style.transitionDuration = dur + 'ms';
        node.style.left = cx(b) + 'px'; node.style.top = cy(b) + 'px';
        const w = { node: node, cb: cb, t: 0 };
        w.t = api.setTimeout(function () { if (walk === w) { walk = null; if (node.parentNode) node.parentNode.removeChild(node); if (cb) cb(); } }, dur + 40);
        walk = w;
        sfx('whoosh');
      }
      function sendHalf(toYou, ms, cb) { cancelWalk(true);
        const a =(toYou ? R.half : R.trayHc).getBoundingClientRect();
        R.tray.classList.add('m-seven-and-half-on');
        R.trayHc.style.visibility = 'hidden';
        if (toYou) R.half.classList.add('m-seven-and-half-away');
        walkHalf(a, toYou ? R.trayHc : R.half, ms, function () { if (toYou) R.trayHc.style.visibility = '';
          else halfHome();
          if (cb) cb();
        });
      }
      function halfHome() { cancelWalk(false);
        R.half.classList.remove('m-seven-and-half-away');
        R.tray.classList.remove('m-seven-and-half-on');
        R.trayHc.style.visibility = '';
        R.traySign.hidden = true;
      }
      /* ---------- the Scribbler (amendment slips, riders, Form 7/2) ---------- */
      function makeSlip(o) { const sl = { cur: 0, line: 0, done: false, pts: 0, pen: false, d: '', last: null };
        const path = el('path', { d: '', fill: 'none', stroke: '#2B2A33', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
        const svg = el('svg', { viewBox: '0 0 200 54', preserveAspectRatio: 'none', 'aria-hidden': 'true' }, el('line', { x1: 8, y1: 42, x2: 192, y2: 42, stroke: '#2B2A33', 'stroke-width': 1, 'stroke-dasharray': '4 4' }), path);
        const bar = el('span', { class: 'm-seven-and-half-padp' });
        const dots = el('span', { class: 'm-seven-and-half-dots', 'aria-hidden': 'true' }, ...o.lines.map(function () { return el('i'); }));
        const pt = function (e) { const r = svg.getBoundingClientRect();
          const sx = r.width > 0 ? 200 / r.width : 1, sy = r.height > 0 ? 54 / r.height : 1;
          const x = Number.isFinite(e.clientX) ? (e.clientX - r.left) * sx : 100, y = Number.isFinite(e.clientY) ? (e.clientY - r.top) * sy : 30;
          return { x: Math.max(0, Math.min(200, x)), y: Math.max(0, Math.min(54, y)) };
        };
        const pad = el('button', { class: 'm-seven-and-half-pad', type: 'button', 'aria-label': 'Initial here (or press I)', onpointerdown: function (e) { if (sl.done) return;
            sl.pen = true; pad.classList.add('m-seven-and-half-inked');
            try { pad.setPointerCapture(e.pointerId); } catch (x) { /* no active pointer */ }
            const p = pt(e);
            sl.last = p; sl.d += ' M' + p.x.toFixed(1) + ' ' + p.y.toFixed(1); sl.pts++;
            path.setAttribute('d', sl.d);
            add(12);
          }, onpointermove: function (e) { if (!sl.pen || sl.done) return;
            const p = pt(e);
            const len = sl.last ? Math.hypot(p.x - sl.last.x, p.y - sl.last.y) : 0;
            sl.last = p;
            if (sl.pts < 300) { sl.d += ' L' + p.x.toFixed(1) + ' ' + p.y.toFixed(1); sl.pts++; path.setAttribute('d', sl.d); }
            add(len);
          }, onpointerup: function () { sl.pen = false; }, onpointercancel: function () { sl.pen = false; }, onclick: function (e) { if (e.detail === 0) { pad.classList.add('m-seven-and-half-inked'); add(45); } }
        }, svg, bar);
        const kids = [];
        if (o.skip) kids.push(el('button', { class: 'm-seven-and-half-btn', type: 'button', onclick: function () { finish(true); } }, o.skip));
        const node = el('div', { class: 'm-seven-and-half-slip ' + (o.cls || ''), role: 'group', 'aria-label': o.stamp || 'Amendment slip' }, el('span', { class: 'm-seven-and-half-stx', text: o.stamp || 'AMENDED' }), el('div', { class: 'm-seven-and-half-slipt', text: o.text }),
          el('div', { class: 'm-seven-and-half-padw' }, pad), dots, el('div', { class: 'm-seven-and-half-slipb' }, ...kids));
        const need = function () { return o.lines[Math.min(sl.line, o.lines.length - 1)]; };
        function add(u) { if (sl.done || !Number.isFinite(u) || u <= 0) return;
          sl.cur += u;
          if (sl.cur >= need()) { dots.children[sl.line].classList.add('m-seven-and-half-dn');
            sl.line++; sl.cur = 0; sl.d = ''; sl.pts = 0; sl.last = null;
            path.setAttribute('d', '');
            bar.style.width = '0';
            sfx('tick');
            if (o.onLine) o.onLine(sl.line);
            if (sl.line >= o.lines.length) finish(false);
          } else bar.style.width = Math.min(100, 100 * sl.cur / need()) + '%';
        }
        function finish(skipped) { if (sl.done) return;
          sl.done = true; sl.pen = false;
          pad.disabled = true;
          const i = openSlips.indexOf(sl);
          if (i >= 0) openSlips.splice(i, 1);
          if (!skipped) { node.querySelector('.m-seven-and-half-padw').appendChild(el('span', { class: 'm-seven-and-half-sc', text: 'S.C.' })); sfx('stamp'); }
          Array.from(node.querySelectorAll('.m-seven-and-half-slipb button')).forEach(function (b) { b.disabled = true; });
          if (o.onDone) o.onDone(skipped);
        }
        sl.node = node; sl.add = add; sl.finish = finish;
        openSlips.push(sl);
        return sl;
      }
      /* ---------- amendments and the binder ---------- */
      function has(id) { return inForce.indexOf(id) >= 0; }
      function flags() { F.sincere = has(1); F.cut = has(2); F.silence = has(3); F.movement = has(4); F.alpha = has(5);
        F.gentle = has(6); F.seat = has(7); F.labels = has(8); F.rounded = has(9); F.left = has(10);
        if (!F.labels && lblSwap) { lblSwap = false; renderLabels(); }
        if (!F.movement) resetStill();
        if (!F.silence) { sil = null; consent = false; }
        paintSil();
        if (F.seat !== seatOn) setSeat(F.seat);
        if (!F.cut) R.cutme.hidden = true;
      }
      function addAmendment(n) { if (n === 11) { let best = 3, bh = -1;
          [3, 7, 1, 2, 4, 5, 6, 8, 9, 10].forEach(function (id) { const h = hitsUnder[id] || 0; if (h > bh) { bh = h; best = id; } });
          inForce = [best];
          say('repealOne', { priority: 1, mood: 'smug' });
        } else if (n === 12) { inForce = [];
          say('allRepealed', { priority: 1, mood: 'confused' });
        } else { inForce.push(n);
          while (inForce.length > 3) { const d = inForce.shift(); say('repeal', { count: d, priority: 1 }); }
          if (n === 4 && (has(1) || has(3)) && !conflictSeen) { conflictSeen = true; sayT(has(1) ? L.conflict[0] : L.conflict[1], { who: 'Sandra', priority: 1 }); }
          else if (n === 10 && has(9)) sayT(L.conflict[3], { who: 'Sandra', priority: 1 });
          else if (inForce.length >= 3 && api.chance(0.4)) say('conflict', { who: 'Sandra' });
        }
        bind.push(n);
        if (bind.length > 13) bind.shift();
        flags();
        renderBinderTab();
        if (binderOpen) renderBinder();
      }
      function renderBinder() { R.pgbox.textContent = '';
        if (!bind.length) { R.pgbox.appendChild(el('div', { class: 'm-seven-and-half-pg', text: 'No amendments yet. Sandra is considering some.' })); R.bnum.textContent = '0 / 0'; return; }
        bPage = Math.max(0, Math.min(bind.length - 1, bPage));
        const n = bind[bPage];
        const inf = has(n);
        const rep = !inf;
        const see = n === 4 && bind.indexOf(1) >= 0 ? 'see also Amendment 1' : n === 4 && bind.indexOf(3) >= 0 ? 'see also Amendment 3' : n === 10 && bind.indexOf(9) >= 0 ? 'see also Amendment 9' : '';
        R.pgbox.appendChild(el('div', { class: 'm-seven-and-half-pg' + (rep ? ' m-seven-and-half-rep' : '') }, el('div', { class: 'm-seven-and-half-pgt', text: L.amend[n - 1] }),
          el('div', { class: 'm-seven-and-half-pgs', text: (inf ? 'IN FORCE' : 'NOT IN FORCE') + (see ? ' (' + see + ')' : '') }), rep && (hand >= 12 || n === 12) ? el('span', { class: 'm-seven-and-half-repst', text: 'REPEALED' }) : null));
        R.bnum.textContent = (bPage + 1) + ' / ' + bind.length;
        if (bPage === 11) api.achieve(ST + 'archivist');
      }
      function toggleBinder(on) { binderOpen = on === undefined ? !binderOpen : !!on;
        R.bpanel.hidden = !binderOpen;
        R.btab.setAttribute('aria-expanded', binderOpen ? 'true' : 'false');
        if (binderOpen) { bPage = Math.max(0, bind.length - 1); renderBinder(); sfx('tick'); try { R.bprev.focus({ preventScroll: true }); } catch (x) { /* no focus */ } }
        else if (R.bpanel.contains(document.activeElement)) { try { R.btab.focus({ preventScroll: true }); } catch (x) { /* no focus */ } }
      }
      function flipPage(d) { bPage += d; renderBinder(); sfx('tick'); }
      function setSeat(on) { seatOn = on;
        const rect = R.half.getBoundingClientRect();
        R.tbl.classList.toggle('m-seven-and-half-swap', on);
        R.meter.classList.toggle('m-seven-and-half-flip', on);
        restart(R.tbl, 'm-seven-and-half-spin');
        if (on) { say('seats', { priority: 1 }); laterM(function () { say('seatsHalf'); }, 1200); laterM(function () { say('meter7'); }, 3200); }
        laterM(function () { R.tbl.classList.remove('m-seven-and-half-spin'); }, 760);
        laterM(function () { if (R.half.classList.contains('m-seven-and-half-away') || !phase) return;
          R.half.classList.add('m-seven-and-half-away');
          walkHalf(rect, R.half, 700, function () { R.half.classList.remove('m-seven-and-half-away'); });
        }, 700);
      }
      /* ---------- hands ---------- */
      function startHand() { setPhase('INIT');
        mine = []; den = []; cutDone = false; cutPaid = false; consent = false; waived = false; pleaseFree = false; eighthDone = false;
        handHits = 0; ghostEight = false; readSaid = false; bustedHand = false; hitTimes = []; grievance = false; stillWon = false; halfOutDone = false;
        idleDealt = false; override = ''; forceRuling = ''; sil = null; busy = false; silent = false;
        R.hand.classList.remove('m-seven-and-half-shr', 'm-seven-and-half-drill');
        R.sbox.textContent = ''; R.slips.textContent = ''; R.rev.textContent = ''; R.rev.hidden = true;
        R.hnote.hidden = true; R.cutme.hidden = true; R.half.classList.remove('m-seven-and-half-down', 'm-seven-and-half-straight'); R.frown.hidden = true;
        openSlips.length = 0;
        halfHome();
        longDone = false; repDone = false;
        away = hand > 1 && api.chance(1 / 35);
        R.lv.hidden = !away; R.leaf.style.visibility = away ? 'hidden' : '';
        if (away) { st('away'); laterM(function () { if (away) say('away', { priority: 1, mood: 'smug' }); }, 2600); }
        if (hand === 1) enterPlay();
        else if (hand <= 12) startAmend(ORDER[hand - 2]);
        else startFinale();
      }
      function startAmend(n) { setPhase('AMEND');
        slipNag = false; lastInput = api.now();
        deck = buildDeck();
        addAmendment(n);
        renderAll();
        say('intro', { priority: 1 });
        if (hand >= 9) later(function () { say('intro9'); }, 1800);
        if (matchNo >= 2 && n === 1) later(function () { sayT(L.smug1[0], { priority: 1 }); }, 3600);
        const clause = L.amend[n - 1];
        later(function () { sayT(clause, { who: 'Sandra', mood: 'smug', priority: 1 }); }, 2400);
        const per = api.selftest || matchNo >= 3 ? 1 : (hand <= 5 ? 1 : 2);
        if (hand === 2 && matchNo === 1 && !fromFinale) later(function () { say('hintSlip', { priority: 1 }); }, 5200);
        const units = api.selftest ? 40 : 220;
        const lines = [];
        for (let i = 0; i < per; i++) lines.push(units);
        const short = matchNo >= 3 ? clause.replace(/(\.)\s[\s\S]*$/, '$1') : clause;
        const cls = hand <= 3 ? 'm-seven-and-half-s1' : hand <= 6 ? 'm-seven-and-half-s2' : hand <= 9 ? 'm-seven-and-half-s3' : 'm-seven-and-half-s4';
        let pending = hand >= 9 ? 2 : 1;
        const done = function () { pending--; if (pending <= 0) later(enterPlay, 700); };
        const main = makeSlip({ lines: lines, text: short, cls: cls, skip: 'Proceed Uninitialled', onDone: function (skipped) { if (skipped) { aw(-0.2, 'proceeded uninitialled'); say('uninitialled', { mood: 'disappointed' }); }
            else { aw(0.2, 'initialled'); st('initials'); say('initials', { mood: 'proud' }); }
            done();
          }
        });
        R.slips.appendChild(main.node);
        if (hand >= 9) { const rider = makeSlip({ lines: [units], text: pickLine('rider'), cls: 'm-seven-and-half-rider', stamp: 'RIDER', skip: 'Proceed Uninitialled', onDone: function (skipped) { if (!skipped) aw(0.1, 'rider'); done(); }
          });
          R.slips.appendChild(rider.node);
        }
        sfx('whoosh');
      }
      function enterPlay() { setPhase('PLAY');
        deck = buildDeck();
        lastProg = lastInput = api.now();
        clearSlips();
        openSlips.length = 0;
        renderAll();
        if (hand === 3 && matchNo === 1) later(function () { if (!gifts) say('hintOffer', { priority: 1 }); }, 4000);
        if (hand === 9 && !stapled && !staplerDone) { stapled = true; staplerDone = true;
          floater('📎 STAPLER, UNION REP: one clack');
          sfx('buzz'); aw(-2, 'Stapler fee');
          say('stapler', { priority: 1, mood: 'smug' });
          if (api.flag.get('metStapler')) later(function () { say('staplerMet', { priority: 1 }); }, 2100);
          api.flag.set('metStapler', true); /* lint-ignore shared cast flag */
          if (tugs >= 10) later(function () { say('safety', { count: tugs, priority: 1 }); }, 2500);
        }
        if (hand === 1 && matchNo === 1 && !fromFinale) { sayT(L.welcome[0], { priority: 1, mood: 'proud' });
          later(function () { if (!acted) sayT(L.welcome[1], { priority: 1 }); }, 6000);
          later(function () { if (!acted) sayT(L.welcome[2], { priority: 1 }); }, 12000);
          later(function () { if (!acted) sayT(L.welcome[3], { priority: 1, mood: 'confused' }); }, 18000);
        } else if (hand === 1 && !fromFinale) { say('seasoned', { count: matchNo, priority: 1, mood: 'smug' });
        } else if (hand === 1) { if (matchNo === 2) say('match2', { priority: 1, mood: 'smug' });
          else say('match3', { count: matchNo, priority: 1, mood: 'smug' });
          fromFinale = false;
        }
      }
      function drawCard(safe) { const top = deck[deck.length - 1];
        if (!safe && top.kind === 'n' && phase === 'PLAY' && hand > 1) { if (!eighthDone && api.chance(1 / 30)) { eighthDone = true; st('eighths'); return mkCard(Math.max(1, 8 - total()), 'eighth'); }
          if (hand > 4 && api.chance(0.02)) return mkCard(3, 'potato');
          if (!sockDone && api.chance(1 / 45)) { sockDone = true; return mkCard(0, 'sock'); }
        }
        const c = deck.pop();
        if (c.kind === 'n' && c.v === 4 && (api.stat.get('toaster-debate.slices') > 0 || api.stat.get('toaster-debate.arguments') > 0) && api.chance(0.3)) c.kind = 'toast';
        return c;
      }
      function sincerityRefuse() { shake(R.deck); shake(R.bell); sfx('buzz');
        say('sincerityNo', { mood: 'disappointed' });
      }
      function halfSlotBounce(src) { shake(R.rsv); sfx('buzz');
        if (src !== 'idle') say('halfSlot', { mood: 'confused' });
      }
      function requestHit(src, m) { m = m || {};
        if (!canAct()) return false;
        if (!deck.length) { halfSlotBounce(src); return false; }
        const g = !waived, human = src !== 'movement' && src !== 'idle';
        if (g && F.cut && !cutDone) { R.cutme.hidden = false; shake(R.deck); sfx('buzz'); say('cutMe'); return false; }
        if (human) { if (g && F.silence && !consent) { shake(R.deck); sfx('buzz'); say('silenceNeedConsent'); return false; }
          if (g && F.sincere && !m.held) { sincerityRefuse(); return false; }
        }
        if (g && F.left && src === 'drag') { const dir = seatOn ? 1 : -1;
          if ((m.dx || 0) * dir < 10) { shake(R.hand); sfx('sad'); say('leftFlop', { mood: 'disappointed' }); return false; }
        }
        const frown = g && F.left && (src === 'click' || src === 'key' || src === 'hold');
        const prev = total();
        const card = drawCard(src === 'idle');
        mine.push(card);
        handHits++; sessHits++; hitCount++;
        lastProg = api.now();
        if (deck.length && deck[0].kind === 'n' && phase === 'PLAY') den.push(deck.shift());
        inForce.forEach(function (id) { hitsUnder[id] = (hitsUnder[id] || 0) + 1; });
        if (F.silence && human) { consent = false; sil = null; paintSil(); }
        st('hits');
        aw(0.3, 'hit');
        sfx('pop');
        if (frown) { aw(-0.2, 'frowned upon'); R.frown.hidden = false;
          api.setTimeout(function () { R.frown.hidden = true; }, 1200);
          say('leftFrown', { mood: 'disappointed' });
        }
        renderHand(card); renderDeck(); renderFan(); render();
        const t = total();
        if (card.kind === 'copy') copyDrawn(card);
        else if (card.kind === 'eighth') { say('eighth', { priority: 1, mood: 'confused' }); sfx('error'); }
        else if (card.kind === 'potato') { if (api.flag.get('metGerald')) { say('geraldCard', { priority: 1 }); if (api.chance(0.5)) say('gerald', { priority: 1 }); }
          else say('potato', { priority: 1, mood: 'confused' });
        } else if (card.kind === 'toast') say('toast', { priority: 1, mood: 'smug' });
        else if (card.kind === 'sock') sockEvent(card);
        else if (t >= 8 && prev >= 8) say('bustMore', { mood: 'confused' });
        else if (t >= 8) { /* the bust is spoken below */ }
        else if (!firstHitSaid) { firstHitSaid = true; say('firstHit', { count: card.v, priority: 1 }); }
        else if (recentV.indexOf(card.v) < 0 && api.chance(0.6)) sayT((api.chance(0.5) ? L.hitW : L.hitV)[card.v - 1]);
        else say('hit');
        recentV.push(card.v); if (recentV.length > 3) recentV.shift();
        if (t >= 8 && prev < 8 && !bustedHand) { bustedHand = true; st('busts'); sfx('sad');
          say('bust', { count: fmtN(t - 7.5), mood: 'disappointed', priority: 1 });
          restart(R.bell, 'm-seven-and-half-flash');
        }
        if (t >= 8 && phase === 'PLAY') armBust();
        if (!readSaid && t >= 5 && t < 8) { readSaid = true; later(function () { if (total() < 8) say('read', { count: fmtN(7.5 - total()) }); }, 1800); }
        if (F.alpha && handHits === 2 && !alphaSaid) { alphaSaid = true; say('alpha', { priority: 1 }); later(function () { sayT(L.alphaSandra[0], { who: 'Sandra' }); }, 3000); }
        if (src === 'drag' && F.gentle && !waived) { if ((m.speed || 0) > 900) { st('slams'); aw(-0.5, 'slam'); sfx('buzz'); floater('NOISE COMPLAINT, FORM 12-S', 'ud'); say('slam', { mood: 'disappointed', priority: 1 });
          } else { st('gentle'); aw(0.4, 'placed gently'); if (api.chance(0.3)) say('gentleYes', { mood: 'proud' }); }
        }
        if (F.rounded && !roundedSaid && phase === 'PLAY') { roundedSaid = true; later(function () { say('rounded', { mood: 'smug' }); }, 1500); }
        advanceLabels();
        if (phase === 'PLAY' && sessHits >= 7 && api.chance(1 / 300)) clerical();
        return true;
      }
      function armBust() { if (bustT) api.clearTimeout(bustT);
        bustT = api.setTimeout(function () { bustT = 0;
          if (phase !== 'PLAY' || total() < 8) return;
          if (busy) { armBust(); return; }
          doStand('auto');
        }, 3000 * K);
      }
      function advanceLabels() { if (!F.labels || waived || (phase !== 'PLAY' && phase !== 'FINALE')) return;
        lblSwap = !lblSwap;
        renderLabels();
        R.live.textContent = 'Labels exchanged. HIT is now ' + (lblSwap ? 'the bell' : 'the deck') + ', STAND is now ' + (lblSwap ? 'the deck' : 'the bell') + '.';
        if (api.chance(0.4)) say('labels', { mood: 'confused' });
      }
      function copyDrawn(card) { if (!copier) return;
        copier.drawn = (copier.drawn || 0) + 1;
        if (copier.paid < 10) { copier.paid++; aw(-1, 'Deck Exhaustion Fee'); }
        if (copier.drawn === 3) say('spamFee', { priority: 1 });
        else if (copier.drawn === 7 || copier.drawn === 13 || copier.drawn === 18) sayT(L.spamMile[copier.drawn === 7 ? 0 : copier.drawn === 13 ? 1 : 2], { priority: 1, mood: 'confused' });
        else say('spamCopy', { count: card.v });
        if (copier.drawn >= 20) { copier.jam = true; sfx('error'); say('spamJam', { priority: 1, mood: 'panic' });
          deck.forEach(function (c) { if (c.kind === 'n') den.push(c); });
          deck = [];
          renderFan(); renderDeck();
        }
      }
      function startCopier() { copier = { stage: 'please', paid: 0, drawn: 0, said: false, hand: hand };
        st('photocopies'); api.achieve(ST + 'convention');
        sfx('whoosh'); say('spamHit', { priority: 2, mood: 'panic' });
        const nHits = Math.max(9, hitTimes.length);
        later(function () { say('spamFast', { count: nHits, priority: 1 }); }, 2600);
        floater('PHOTOCOPIER (please wait)', 'cop');
        renderDeck();
        later(function () { if (!copier || copier.stage !== 'please') return;
          for (let i = 0; i < 20; i++) { const c = mkCard(api.randInt(1, 7), 'copy'); c.bl = Math.min(2, 0.5 + i * 0.08); deck.push(c); }
          copier.stage = 'copies';
          renderDeck();
        }, 4000);
      }
      function countSpam() { const now = api.now();
        hitTimes.push(now);
        hitTimes = hitTimes.filter(function (t) { return now - t < 3000; });
        if (hitTimes.length >= 9 && !copier && phase === 'PLAY' && !(deck.length && deck[deck.length - 1].kind === 'copy')) { startCopier(); hitTimes = []; return; }
        const fast = hitTimes.filter(function (t) { return now - t < 2000; }).length;
        if (fast >= 25 && !grievance) { grievance = true; sfx('buzz'); say('spamGrievance', { priority: 1, mood: 'panic' }); renderLabels(); }
      }
      function countOther() { const now = api.now();
        otherTimes.push(now);
        otherTimes = otherTimes.filter(function (t) { return now - t < 3000; });
        if (otherTimes.length >= 14 && now - lastSurcharge > 10000) { lastSurcharge = now; otherTimes = [];
          aw(-0.5, 'Over-Enthusiasm Surcharge'); sfx('buzz'); say('spamOther', { priority: 1, mood: 'disappointed' });
        }
      }
      function streak(key, n, ms, gap) { const now = api.now();
        const a = (streaks[key] || []).filter(function (t) { return now - t < ms; });
        a.push(now); streaks[key] = a;
        if (a.length >= n && now - (cool[key] || -99999) > gap) { cool[key] = now; streaks[key] = []; return true; }
        return false;
      }
      function sockEvent(card) { api.achieve(ST + 'sock'); st('socks'); sfx('boing');
        const known = !!api.flag.get('sockSeen');
        api.flag.set('sockSeen', true); /* lint-ignore shared cast flag */
        say('sock', { priority: 1, mood: 'confused' });
        if (known) later(function () { say('sockKnown', { priority: 1, mood: 'smug' }); }, 3200);
        api.setTimeout(function () { const i = mine.indexOf(card);
          if (i < 0 || phase !== 'PLAY') return;
          mine.splice(i, 1); renderHand(); render(); say('sockGone');
        }, 7000 * K);
      }
      /* the 3 minute and 10 minute marks (once per visit) */
      function threeMin() { st('clock731'); sfx('error');
        R.plq.textContent = '7:31 (states this with confidence)'; R.clock.setAttribute('aria-label', 'Wall clock, 7:31');
        flash(R.clock, 'm-seven-and-half-jump', 900);
        sayT(api.flag.get('tiny-bureaucracy.clock731') ? L.m3a[1] : L.m3a[0], { priority: 2, mood: 'panic' }); /* lint-ignore reading another module's flag */
        api.setTimeout(function () { flash(R.dennis, 'm-seven-and-half-wig', 500); sayT(L.m3c[0], { priority: 1 }); }, 2800 * K);
        api.setTimeout(function () { R.plq.textContent = '7:30 (states this with confidence)'; R.clock.setAttribute('aria-label', 'Wall clock, 7:30');
          sfx('ding'); aw(1, 'witnessed 7:31'); sayT(L.m3b[0], { priority: 1, mood: 'smug' });
        }, 5800 * K);
      }
      function tenMin() { st('tenure'); api.achieve(ST + 'tenure'); sfx('tada'); api.confetti(undefined, undefined, 24);
        floater('LONG SERVICE PIN (PROVISIONAL)');
        R.certs.appendChild(el('div', { class: 'm-seven-and-half-cert', text: 'LONG SERVICE PIN (PROVISIONAL). Recalled at end of quarter.' }));
        while (R.certs.children.length > 3) R.certs.removeChild(R.certs.firstChild);
        sayT(L.t10[0], { priority: 2, mood: 'proud' });
        api.setTimeout(function () { R.dennis.classList.add('m-seven-and-half-rot'); sayT(L.t10[1], { priority: 1, mood: 'confused' });
          api.setTimeout(function () { R.dennis.classList.remove('m-seven-and-half-rot'); }, 5000 * K);
        }, 5500 * K);
        api.setTimeout(function () { sayT(L.t10[2], { priority: 1, mood: 'disappointed' }); }, 12500 * K);
      }
      /* ---------- stand, reveal, ruling, file ---------- */
      function doStand() { if (!canAct()) return;
        if (phase === 'FINALE') { finaleStand(false); return; }
        lastProg = api.now(); st('stands'); sfx('bell'); aw(1, 'stand');
        advanceLabels();
        const t = total();
        lastTot = t;
        if (!mine.length) { say('standZero', { mood: 'confused', priority: 1 }); forceRuling = 'ZERO'; }
        else if (t === 7) { st('sevens'); sevenN++; api.achieve(ST + 'almost'); aw(3, 'so close'); sfx('ding');
          if (sevenN <= 3) api.confetti(undefined, undefined, 24 - 6 * sevenN);
          say(sevenN >= 8 ? 'sevenSmall' : sevenN >= 4 ? 'sevenAgain' : 'close', { mood: 'proud', priority: 1 });
        }
        else if (t < 8) say('stand', { count: fmtN(t), priority: 1 });
        if (mine.some(function (c) { return c.kind === 'eighth'; })) forceRuling = 'INV';
        if (t === 7 && hand >= 8 && hand <= 12 && !loanUsed) enterLoan(); else toReveal();
      }
      function toReveal() { setPhase('REVEAL');
        while (deck.length) { const c = deck.shift(); if (c.kind === 'n') den.push(c); }
        lastDen = denTotal();
        R.slips.textContent = ''; R.sbox.textContent = '';
        renderFan(); render();
        revealFast = false;
        if (hand >= 2 && hand <= 6) R.sbox.appendChild(el('span', { class: 'm-seven-and-half-sign', text: 'click anywhere to hurry' }));
        if (hand === 5) later(function () { say('hurry', { priority: 1, mood: 'smug' }); }, 1200);
        say('reveal', { count: Math.floor(lastDen) });
        R.rev.textContent = ''; R.rev.hidden = false;
        const row = den.map(function (c) { const n = el('span', { class: 'm-seven-and-half-mc' }); n.style.setProperty('--r', '0deg'); R.rev.appendChild(n); return n; });
        let i = 0;
        const step = function () { if (i < row.length) { row[i].classList.add('m-seven-and-half-up', 'm-seven-and-half-flipin');
            row[i].textContent = String(den[i].v);
            i++; sfx('tick');
            later(step, revealFast ? 80 : hand >= 5 ? 180 : 350);
          } else halfReveal();
        };
        later(step, 600);
      }
      function halfReveal() { const tier = hand === 1 ? 1 : hand <= 4 ? 2 : hand <= 8 ? 3 : 4;
        let n = 0;
        const roll = function () { if (n < 3) { n++; sfx('tick'); later(roll, revealFast ? 60 : 160); return; }
          if (tier === 1) sfx('tada'); else if (tier === 2) sfx('fanfare'); else if (tier === 3) { sfx('blip'); api.confetti(undefined, undefined, 2); }
          if (tier >= 2) { R.hnote.hidden = false; R.hnote.textContent = tier === 2 ? 'AS FORETOLD' : 'yes'; }
          say('revealT' + tier, { priority: 1, mood: tier < 3 ? 'proud' : 'neutral' });
          R.rev.appendChild(el('span', { class: 'm-seven-and-half-chip', text: 'DENNIS: ' + fmtN(lastDen) }));
          st('halves');
          if (hand >= 5 && !denBustDone && lastDen >= 8) { denBustDone = true; denOver(); later(toRuling, 6800); }
          else later(toRuling, hand >= 5 ? 900 : 1500);
        };
        roll();
      }
      /* the payoff the premise built: Dennis has been over every single hand, and now someone notices */
      function denOver() { st('denbust');
        later(function () { say('denOver', { count: fmtN(lastDen - 7.5), priority: 2, mood: 'panic' }); R.sbox.textContent = ''; R.sbox.appendChild(stampEl('DENNIS: BUST (WAIVED, PLANT)')); sfx('stamp'); }, 1600);
        later(function () { sayT(L.denAmend[0], { priority: 1, mood: 'smug' });
          const sl = el('div', { class: 'm-seven-and-half-slip m-seven-and-half-s2' }, el('div', { class: 'm-seven-and-half-slipt', text: 'AMENDMENT 0: Dennis may be over.' }), el('span', { class: 'm-seven-and-half-sc', style: { fontSize: '2.6rem' }, text: 'S.C.' }));
          R.slips.textContent = ''; R.slips.appendChild(sl); sfx('whoosh');
        }, 3400);
        later(function () { sayT(L.denRetro[0], { priority: 1, mood: 'smug' }); aw(0.5, 'witnessed Dennis over'); }, 5600);
      }
      function toRuling() { setPhase('RULING');
        R.slips.textContent = '';
        let stamp, text;
        if (forceRuling === 'ZERO') { stamp = 'ZERO HANDS PLAYED'; text = L.rulingZero[0]; }
        else if (forceRuling === 'INV') { stamp = 'INVESTIGATION'; text = L.rulingInv[0]; }
        else if (forceRuling === 'VOID') { stamp = 'VOID'; text = L.ruling[3]; }
        else { const i = bagPick('ruling', STAMPS); stamp = STAMPS[i]; text = L.ruling[i]; }
        const inv = forceRuling === 'INV';
        forceRuling = '';
        R.sbox.textContent = '';
        R.sbox.appendChild(stampEl(stamp));
        sfx('stamp');
        sayT(text, { priority: 1 });
        if (inv) { later(function () { R.sbox.appendChild(el('div', { class: 'm-seven-and-half-bubble', text: L.eighthTalk[0].slice(3) })); sayT(L.eighthTalk[0], { priority: 1 }); }, 1500);
          later(function () { ghostEight = true; mine = mine.filter(function (c) { return c.kind !== 'eighth'; }); renderHand(); render(); say('eighthGone', { priority: 1 }); }, 3800);
        } else if (api.chance(0.5)) later(function () { say('nobody'); }, 2300);
        later(toFile, inv ? 5600 : hand >= 5 ? 1500 : 2400);
      }
      function toFile() { setPhase('FILE');
        st('hands'); filed++;
        api.achieve(ST + 'first');
        aw(2, 'hand filed');
        ledger.push('H' + hand + '  YOU ' + fmtN(lastTot) + '  DENNIS ' + fmtN(lastDen) + '  FILED' + (ghostEight ? ' (8: ghost)' : ''));
        if (ledger.length > 12) { ledger.shift(); if (api.chance(0.5)) say('ledger', { count: filed }); }
        R.hand.classList.add('m-seven-and-half-shr'); sfx('whoosh');
        if (hand === 3) { meterStage = 1; say('meter3', { mood: 'proud' }); }
        else if (hand === 6) { meterStage = 2; say('meter6', { mood: 'proud' }); }
        else if (filed % 3 === 0 && api.chance(0.7)) say('ledger', { count: filed });
        R.vig.style.setProperty('--vg', String(Math.min(0.12, Math.floor(filed / 5) * 0.04)));
        R.sbox.textContent = '';
        render(); renderLedger();
        if (away) later(function () { say('awayBack', { mood: 'smug' }); }, 500);
        else if (api.now() - lastMicro > 45000 && hand % 2 === 0) later(microEvent, 600);
        later(function () { hand++; startHand(); }, 1200);
      }
      /* ---------- the Half Loan ---------- */
      function enterLoan() { setPhase('LOAN');
        loanUsed = true;
        R.sbox.textContent = '';
        sayT(L.loanOffer[0], { priority: 2 });
        const units = api.selftest ? [40, 40, 20] : [220, 220, 220, 220, 220, 220, 220, 110];
        const slip = makeSlip({ lines: units, text: 'FORM 7/2: Half-Card Lending Policy. Seven signatures and a half. Please sign on the line, seven times, and then half.', cls: 'm-seven-and-half-s3', stamp: 'FORM 7/2',
          onLine: function (n) { if (n < units.length) say('loanProgress', { count: n, priority: 1 }); }, onDone: function (skipped) { if (!skipped) later(lend, 400); }
        });
        slip.node.appendChild(el('div', { class: 'm-seven-and-half-slipb' }, el('button', { class: 'm-seven-and-half-btn', type: 'button', onclick: function () { if (slip.done) return;
          slip.finish(true); R.slips.textContent = '';
          say('loanDecline', { priority: 1 });
          later(toReveal, 1600);
        } }, 'Decline the Half')));
        R.slips.textContent = '';
        R.slips.appendChild(slip.node);
      }
      function lend() { clearSlips();
        sendHalf(true, 900, function () { override = '7 1/2'; render();
          sfx('fanfare'); api.confetti(undefined, undefined, 40);
          aw(20, 'Half Loan'); st('loans');
          R.sbox.textContent = '';
          R.sbox.appendChild(el('div', { class: 'm-seven-and-half-banner', text: 'VICTORY CONFIRMED' }));
          say('loanLend', { priority: 2, mood: 'panic' });
          later(function () { api.achieve(ST + 'keeper');
            const b = R.sbox.firstChild;
            if (b) b.classList.add('m-seven-and-half-struck');
            sfx('stamp');
            sayT(L.loanVoid[0], { priority: 2 });
            later(function () { sayT(L.loanVoid[1], { priority: 1 }); }, 1800);
            later(function () { override = ''; render();
              sendHalf(false, 800, function () { sayT(L.loanVoid[2], { priority: 1 }); forceRuling = 'VOID'; later(toReveal, 1600); });
            }, 1400);
          }, 3000);
        });
      }
      /* ---------- the finale and matches ---------- */
      function startFinale() { setPhase('FINALE');
        addAmendment(12);
        deck = [mkCard(7)];
        lastProg = lastInput = api.now();
        R.warm.classList.add('m-seven-and-half-on');
        renderAll();
        say('finalAnnounce', { priority: 2, mood: 'smug' });
        later(function () { say('deckOfTwo', { priority: 1 }); }, 3500);
        later(function () { say('lonely', { priority: 1, mood: 'disappointed' }); }, 9000);
      }
      function finaleStand(auto) { if (busy) return;
        busy = true;
        setPhase('FIN2');
        if (total() !== 7) { mine = [deck.length ? deck.pop() : mkCard(7)];
          say('finalAuto', { priority: 1 });
        }
        deck = [];
        lastTot = 7; lastDen = denTotal();
        st('stands'); sfx('bell');
        renderHand(); renderDeck(); render();
        later(function () { say('finalSlide', { priority: 1 });
          restart(R.tbl, 'm-seven-and-half-wind');
          sendHalf(true, 1100);
        }, 500);
        later(function () { restart(R.needle, 'm-seven-and-half-tick'); sfx('bloop'); say('meterDraft', { priority: 1 });
          api.achieve(ST + 'leaf');
          later(function () { R.needle.classList.remove('m-seven-and-half-tick'); }, 800);
        }, 2300);
        later(function () { override = '7 1/2'; render();
          sfx('fanfare'); sfx('tada'); api.confetti(undefined, undefined, 90);
          aw(20, 'finale');
          R.sbox.textContent = '';
          R.sbox.appendChild(el('div', { class: 'm-seven-and-half-banner', text: 'VICTORY CONFIRMED' }));
          say('finalWin', { priority: 2, mood: 'proud' });
        }, 3200);
        later(function () { const b = R.sbox.firstChild; if (b) b.classList.add('m-seven-and-half-struck');
          sfx('stamp');
          const c = el('div', { class: 'm-seven-and-half-cert', text: 'CERTIFICATE OF VICTORY. Signature: ______. Counter-signature: pending (S., on a break since 2011).' });
          R.certs.appendChild(c);
          while (R.certs.children.length > 3) R.certs.removeChild(R.certs.firstChild);
          sayT(L.finalCert[0], { priority: 2 });
        }, 6600);
        later(function () { override = ''; render(); sendHalf(false, 1000); }, 9000);
        later(function () { st('hands'); filed++;
          ledger.push('H13  YOU 7 1/2  DENNIS ' + fmtN(lastDen) + '  FILED (NON-BINDING)');
          if (ledger.length > 12) ledger.shift();
          renderLedger(); aw(2, 'hand filed');
          say('finalLoneliness', { priority: 2, mood: 'disappointed' });
        }, 10600);
        later(newMatch, 15500);
      }
      function newMatch() { matchId++; matchNo++;
        api.save.set('matches', matchNo); st('matches');
        hand = 1; inForce = []; hitsUnder = {}; bind = []; ledger = []; filed = 0; loanUsed = false; gifts = 0; pleaseN = 0;
        stapled = false; staplerDone = false; conflictSeen = false; alphaSaid = false; firstHitSaid = false; meterStage = 0; busy = false; silent = false; override = '';
        lblSwap = false; extraTabs = 0; recentV = []; roundedSaid = false;
        R.vig.style.setProperty('--vg', '0');
        halfHome();
        R.warm.classList.remove('m-seven-and-half-on'); R.sbox.textContent = '';
        fromFinale = true;
        flags();
        renderAll();
        startHand();
      }
      function clerical() { if (busy || phase !== 'PLAY') return;
        busy = true; silent = true;
        if (bustT) { api.clearTimeout(bustT); bustT = 0; }
        st('clerical');
        sendHalf(true, 800, function () { override = '7 1/2'; render();
          silent = false; sfx('fanfare'); silent = true;
          api.confetti(undefined, undefined, 40);
          sayT(L.clerical[0], { priority: 2, mood: 'panic' });
          later(function () { sayT(L.clerical[1], { priority: 2, mood: 'panic' }); }, 1500);
          later(function () { silent = false;
            api.achieve(ST + 'clerical');
            R.sbox.textContent = ''; R.sbox.appendChild(stampEl('CORRECTION')); sfx('stamp');
            override = ''; render();
            sendHalf(false, 800, function () { sayT(L.clerical[2], { priority: 2 });
              busy = false;
              if (total() >= 8 && phase === 'PLAY') armBust();
              later(function () { R.sbox.textContent = ''; }, 2500);
            });
          }, 3000);
        });
      }
      /* ---------- Dennis, the half, the cut, the badge ---------- */
      function doPoke() { countOther();
        st('pokes');
        const n = api.stat.get(ST + 'pokes');
        sfx('pop');
        flash(R.dennis, 'm-seven-and-half-wig', 450);
        if (!pokeCb) { pokeCb = true;
          if (api.flag.get('plantClicked') || api.flag.get('metDennis')) laterM(function () { say('pokeCb', { priority: 1, mood: 'smug' }); }, 2600);
          api.flag.set('metDennis', true); /* lint-ignore shared cast flag */
        }
        if (streak('poke', 6, 3000, 9000)) { sfx('boing'); say('pokeSpam', { priority: 1, mood: 'confused' }); }
        else if (n === 77) sayT(L.pokeTalk[0], { priority: 1, mood: 'disappointed' });
        else if (away) say('awayPoke');
        else say('poke', { count: api.fmt(n) });
        if (F.silence && !waived && canAct()) startSilence();
      }
      function startSilence() { if (sil && sil.ok) return;
        if (sil) say('silenceInterrupt', { mood: 'disappointed' });
        const dur = api.selftest ? 300 : 1500;
        sil = { t0: api.now(), dur: dur, said: false, ok: false };
        R.sil.classList.remove('m-seven-and-half-ok');
        R.silb.style.transition = 'none'; R.silb.style.width = '0';
        void R.silb.offsetWidth;
        R.silb.style.transition = 'width ' + dur + 'ms linear'; R.silb.style.width = '100%';
      }
      function tugDone() { lastTugPtr = api.now();
        tugs++; st('tugs'); countOther(); sfx('bloop');
        let txt;
        if (tugs === 9 && api.flag.get('museumHalf')) laterM(function () { sayT(L.museumTug[0], { priority: 1, mood: 'confused' }); }, 5500);
        const spam = streak('tug', 6, 3000, 9000);
        if (tugs === 50 || tugs === 100) txt = L.tugMile[tugs === 50 ? 0 : 1];
        else if (spam && tugs > 20) txt = L.tugSpam[bagPick('tugSpam', L.tugSpam)];
        else if (stapled && tugs > 20) txt = L.staple[bagPick('staple', L.staple)];
        else if (tugs <= 20) txt = L.tug[tugs - 1].split('{count}').join(String(tugs));
        else txt = L.post20[bagPick('post20', L.post20)].split('{count}').join(String(tugs));
        sayT(txt, { priority: tugs <= 20 ? 1 : 0, mood: 'smug' });
        if (spam && tugs <= 20) laterM(function () { sayT(L.tugSpam[bagPick('tugSpam', L.tugSpam)], { priority: 0, mood: 'confused' }); }, 2600);
        if (tugs === 21) laterM(release, 900);
        if (tugs === 7) laterM(function () { sayT(L.callbackTugs[0]); }, 6000);
        render();
      }
      function tugDown(e) { if (e.button > 0) return;
        sp.drag = true; sp.t0 = api.now(); sp.sx = Number.isFinite(e.clientX) ? e.clientX : 0; sp.sy = Number.isFinite(e.clientY) ? e.clientY : 0;
        try { R.half.setPointerCapture(e.pointerId); } catch (x) { /* no active pointer */ }
        springStart();
      }
      function tugNow() { sp.x = 0; sp.y = -70; sp.vx = 0; sp.vy = 0;
        springStart();
        tugDone();
      }
      function tugClick() { if (api.now() - lastTugPtr < 500) return;
        tugNow();
      }
      function onPoke() { doPoke(); }
      function onHover() { if (hoverT) api.clearTimeout(hoverT); hoverT = api.setTimeout(function () { hoverT = 0; R.dennis.classList.add('m-seven-and-half-stare'); R.tbl.classList.add('m-seven-and-half-dim'); say('stare', { mood: 'confused' }); api.setTimeout(function () { R.dennis.classList.remove('m-seven-and-half-stare'); R.tbl.classList.remove('m-seven-and-half-dim'); }, 2400); }, 7500); }
      function onLeave() { if (hoverT) { api.clearTimeout(hoverT); hoverT = 0; } }
      function onBadge() { badgeN++; sfx('tick');
        if (badgeN === 7) { R.badge.classList.add('m-seven-and-half-flipped'); sfx('ding'); say('badge', { priority: 1, mood: 'smug' }); }
        else if (badgeN > 7) R.badge.classList.toggle('m-seven-and-half-flipped');
      }
      function onClock() { sfx('tick'); flash(R.clock, 'm-seven-and-half-jump', 900); say(streak('clock', 6, 3000, 9000) ? 'clockSpam' : 'clock'); }
      function doCut() { if (!canAct()) return;
        countOther(); st('cuts'); sfx('whoosh');
        if (!F.alpha) deck = api.shuffle(deck);
        cutDone = true; R.cutme.hidden = true;
        flash(R.deck, 'm-seven-and-half-sigh', 600);
        if (!cutPaid) { cutPaid = true; aw(0.5, 'cut'); say('cut', { mood: 'proud' }); streak('cut', 8, 3000, 9000); }
        else if (streak('cut', 8, 3000, 9000)) say('cutSpam', { priority: 1, mood: 'panic' });
        else say('cutFidget');
        renderDeck();
      }
      function doOffer(card) { if (!canAct()) return false;
        const i = mine.indexOf(card);
        if (i < 0) return false;
        mine.splice(i, 1); den.push(card);
        gifts++; giftsLife++;
        api.save.set('gifts', giftsLife);
        st('gifts'); sfx('pop');
        flash(R.dennis, 'm-seven-and-half-wig', 450);
        renderHand(); renderFan(); render();
        if (giftsLife >= 10 && !crown) { crown = true; api.save.set('crown', true); R.crown.hidden = false; say('giftCrown', { priority: 1, mood: 'proud' }); }
        else if (gifts === 5) say('giftBribe', { priority: 1 });
        else if (api.stat.get(ST + 'gifts') === 7) say('giftSeven', { priority: 1, mood: 'proud' });
        else say('gift', { count: card.v });
        return true;
      }
      function doPlease() { api.achieve(ST + 'please'); sfx('ding');
        say('please', { priority: 1, mood: 'smug' });
        R.half.classList.add('m-seven-and-half-straight'); R.dennis.classList.add('m-seven-and-half-rot');
        api.setTimeout(function () { R.half.classList.remove('m-seven-and-half-straight'); R.dennis.classList.remove('m-seven-and-half-rot'); }, 3000);
        pleaseN++;
        if (F.sincere) pleaseFree = true;
        if (pleaseN === 3) { R.half.classList.add('m-seven-and-half-down'); say('please3', { priority: 1 }); }
      }
      /* request 21: the peg opens a crack, the Stapler re-clips it */
      function release() { R.half.classList.add('m-seven-and-half-rel'); R.dennis.classList.add('m-seven-and-half-rot'); sfx('boing');
        say('relGasp', { priority: 2, mood: 'panic' });
        const s = stampEl('REQUEST GRANTED (IN PRINCIPLE)');
        if (phase === 'PLAY') R.sbox.appendChild(s);
        api.setTimeout(function () { sfx('buzz'); floater('📎 STAPLER, UNION REP: one clack');
          say('relClack', { priority: 1, mood: 'smug' });
          R.half.classList.remove('m-seven-and-half-rel'); R.dennis.classList.remove('m-seven-and-half-rot');
          if (s.parentNode) s.parentNode.removeChild(s);
        }, 3000 * K);
      }
      /* the fire drill (about minute 6): the hand goes to the ledger, Dennis stays put */
      function drill() { drillOn = true; busy = true; cancelRing(); resetStill();
        R.hand.classList.add('m-seven-and-half-drill'); sfx('bell');
        say('drill', { priority: 2, mood: 'panic' });
        const s = stampEl('DENNIS: FIRE WARDEN (STAYING)');
        R.sbox.appendChild(s);
        floater('ASSEMBLY POINT: THE LEDGER');
        laterM(function () { if (!drillOn) return;
          drillOn = false; busy = false;
          R.hand.classList.remove('m-seven-and-half-drill');
          if (s.parentNode) s.parentNode.removeChild(s);
          sfx('ding'); say('drillEnd', { priority: 1, mood: 'smug' });
          if (total() >= 8 && phase === 'PLAY') armBust();
        }, 8000);
      }
      function ribbon(text) { const old = R.tbl.querySelector('.m-seven-and-half-ribbon');
        if (old) old.remove();
        const r = el('div', { class: 'm-seven-and-half-ribbon', 'aria-hidden': 'true' }, el('span', { text: text }));
        R.tbl.appendChild(r);
        api.setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, 8200 * K + 200);
      }
      function countdown() { const chip = el('div', { class: 'm-seven-and-half-cd', 'aria-hidden': 'true', text: '10' });
        R.tbl.appendChild(chip);
        let n = 10;
        const tickDown = function () { n--; if (n <= 0 || !chip.parentNode) { if (chip.parentNode) chip.parentNode.removeChild(chip); return; } chip.textContent = String(n); sfx('tick'); api.setTimeout(tickDown, 1000 * K); };
        api.setTimeout(tickDown, 1000 * K);
      }
      function microEvent() { lastMicro = api.now();
        if (api.chance(0.3)) { say('interim', { who: 'Sandra' }); floater('INTERIM AMENDMENT (recorded)'); return; }
        const i = bagPick('micro', L.micro), t = L.micro[i];
        sayT(t, { priority: 0 });
        if (i === 0) flash(R.clock, 'm-seven-and-half-jump', 1000);
        else if (i === 1) flash(R.dennis, 'm-seven-and-half-wig', 600);
        else if (i === 2) flash(R.deck, 'm-seven-and-half-sigh', 700);
        else if (i === 3) { extraTabs = Math.min(12, extraTabs + 1); renderBinderTab(); }
        else if (/^FUN FACT/.test(t)) ribbon(t);
        else if (i === 7) countdown();
        else if (i === 8) floater('FILED (upside down)', 'ud');
        else if (i === 9) floater('✉️ Wish you were here. The Missing Sock');
        else if (i === 10) floater('🍞 A half-slice, offered. Declined.');
        else if (/paper plane/.test(t)) floater('Per my previous message.');
        else if (/Sock/.test(t)) floater('?? (a sock-shaped shadow)');
      }
      /* ---------- input: deck, bell, hold ring, still ring ---------- */
      function reduced() { try { return R.root.matches('.pm-reduce-motion .m-seven-and-half-root') || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (x) { return false; }
      }
      function paintRing(which, on, ms, kind) { const rc = which === 'deck' ? R.deckRect : R.bellRect;
        rc.parentNode.classList.toggle('m-seven-and-half-still', kind === 'still');
        rc.style.transition = 'none';
        rc.style.strokeDashoffset = '100';
        if (on) { void rc.getBoundingClientRect();
          rc.style.transition = 'stroke-dashoffset ' + ms + 'ms linear';
          rc.style.strokeDashoffset = '0';
        }
      }
      function startRing(which, src) { if (ring) return;
        const ms = holdMs();
        ring = { which: which, src: src, t0: api.now(), t: 0 };
        ring.t = api.setTimeout(function () { const r = ring;
          ring = null;
          if (!r) return;
          paintRing(which, false);
          if (pd && pd.which === which) { pd.swallow = true;
            const ls = pd.s[pd.s.length - 1];
            if (pd.drag && ls && Math.hypot(ls.x - pd.x, ls.y - pd.y) >= 40) { swallowUntil = api.now() + 250; return; }
          }
          swallowUntil = api.now() + 250;
          if (canAct() && isHit(which) && requestHit('hold', { held: true }) && api.chance(0.25)) say('sincerityYes', { mood: 'smug' });
        }, ms);
        paintRing(which, true, ms);
      }
      function cancelRing() { if (!ring) return;
        api.clearTimeout(ring.t);
        paintRing(ring.which, false);
        ring = null;
      }
      function releaseRing() { if (!ring || ring.src !== 'hold') return false;
        if (api.now() - ring.t0 < 20) { ring.src = 'auto'; return false; }
        cancelRing();
        sincerityRefuse();
        return true;
      }
      function startStill() { const ms = api.selftest ? 400 : 2000;
        still = { t0: api.now(), ms: ms, which: standCtl() };
        paintRing(still.which, true, ms, 'still');
        say('stillness', { priority: 1, mood: 'panic' });
      }
      function resetStill() { if (!still) return;
        paintRing(still.which, false);
        still = null;
      }
      function hitPress(src) { countSpam();
        if (copier && copier.stage === 'please') { if (!copier.said) { copier.said = true; aw(-0.5, 'Please fee'); say('spamPlease', { priority: 1 }); }
          shake(R.deck);
          return;
        }
        if (F.sincere && !waived) { if (pleaseFree) { pleaseFree = false; say('pleaseHit', { priority: 1 }); requestHit(src, { held: true }); }
          else startRing(hitCtl(), 'auto');
          return;
        }
        requestHit(src, {});
      }
      function standPress(src) { countOther();
        if (F.movement && !waived) { if (!still) startStill(); return; }
        doStand(src);
      }
      function pressCtl(which, src) { if (!canAct()) return;
        if (isHit(which)) hitPress(src); else standPress(src);
      }
      function ctlDown(which, e) { if (e.button > 0 || !canAct()) return;
        const now = api.now();
        pd = { which: which, t: now, x: Number.isFinite(e.clientX) ? e.clientX : 0, y: Number.isFinite(e.clientY) ? e.clientY : 0, s: [], moved: false, swallow: false, drag: which === 'deck' && isHit('deck') };
        if (isHit(which) && F.sincere && !waived && !pleaseFree && !(copier && copier.stage === 'please')) { countSpam(); startRing(which, 'hold'); }
      }
      function ctlClick(which) { if (api.now() < swallowUntil) return;
        if (ring && ring.which === which) return;
        pressCtl(which, 'click');
      }
      function ctlKeyDown(which) { if (!canAct()) return;
        swallowUntil = api.now() + 250;
        if (isHit(which) && F.sincere && !waived && !pleaseFree && !(copier && copier.stage === 'please')) { countSpam(); startRing(which, 'hold'); return; }
        pressCtl(which, 'key');
      }
      function cardDown(c, e) { if (e.button > 0 || !canAct()) return;
        cd = { c: c, x: Number.isFinite(e.clientX) ? e.clientX : 0, y: Number.isFinite(e.clientY) ? e.clientY : 0, moved: false, ghost: null };
      }
      function ghostAt(g, x, y) { const rr = R.root.getBoundingClientRect();
        g.style.left = (x - rr.left) + 'px'; g.style.top = (y - rr.top) + 'px';
      }
      function speedOf(s) { if (s.length < 2) return 0;
        const last = s[s.length - 1];
        let first = s[0];
        for (let i = s.length - 2; i >= 0; i--) { if (last.t - s[i].t > 100) break; first = s[i]; }
        return Math.hypot(last.x - first.x, last.y - first.y) / Math.max(last.t - first.t, 8) * 1000;
      }
      function inRect(r, x, y, pad) { return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad; }
      function touchInput() { lastInput = api.now(); idleDealt = false; halfOutDone = false; repDone = false;
        if (halfOut) flee();
      }
      function moved() { if (!F.movement || waived) return;
        resetStill();
        if (!canAct() || phase !== 'PLAY') return;
        const now = api.now();
        if (now - lastMoveEval < 150 || now - lastMoveDeal < 1000) return;
        lastMoveEval = now;
        if (openSlips.length || binderOpen || (sil && !sil.ok)) return;
        lastMoveDeal = now;
        if (!deck.length) { halfSlotBounce('movement'); return; }
        if (requestHit('movement')) { if (api.chance(0.5)) say('moveDeal', { mood: 'smug' }); }
      }
      function onMove(e) { touchInput();
        const x = e.clientX, y = e.clientY;
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        const now = api.now();
        if (sp.drag) { let dx = x - sp.sx, dy = y - sp.sy;
          const r = Math.hypot(dx, dy);
          if (r > 90) { dx *= 90 / r; dy *= 90 / r; }
          sp.x = dx; sp.y = dy; sp.vx = 0; sp.vy = 0;
        }
        if (pd) { pd.s.push({ x: x, y: y, t: now });
          if (pd.s.length > 8) pd.s.shift();
          if (!pd.moved && Math.hypot(x - pd.x, y - pd.y) > 6) { pd.moved = true;
            if (pd.drag && !pd.ghost) { pd.ghost = el('div', { class: 'm-seven-and-half-ghost' }, el('div', { class: 'm-seven-and-half-card', style: { background: 'var(--coral)' } })); R.gl.appendChild(pd.ghost); }
          }
          if (pd.ghost) ghostAt(pd.ghost, x, y);
        }
        if (cd) { if (!cd.moved && Math.hypot(x - cd.x, y - cd.y) > 6) { cd.moved = true; cd.ghost = el('div', { class: 'm-seven-and-half-ghost' }, cardEl(cd.c, false)); R.gl.appendChild(cd.ghost); }
          if (cd.ghost) ghostAt(cd.ghost, x, y);
        }
        if (F.movement && R.root.contains(e.target) && !(pd && pd.drag && pd.moved)) { const p = mv;
          mv = { x: x, y: y, t: now };
          if (p && Math.hypot(x - p.x, y - p.y) / Math.max(now - p.t, 8) * 1000 > 700) moved();
        }
      }
      function onUp(e) { const now = api.now();
        const x = e.clientX, y = e.clientY;
        if (sp.drag) { sp.drag = false;
          if (Math.abs(sp.x) + Math.abs(sp.y) < 1) sp.y = -50;
          try { R.half.releasePointerCapture(e.pointerId); } catch (z) { /* not captured */ }
          springStart();
          tugDone();
        }
        if (pd) { const d = pd;
          pd = null;
          if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost);
          const far = d.drag && d.moved && Number.isFinite(x) && Number.isFinite(y) && Math.hypot(x - d.x, y - d.y) >= 40;
          const cutIt = far && inRect(R.deck.getBoundingClientRect(), x, y, 6) && Math.abs(x - d.x) >= 60 && Math.abs(x - d.x) > Math.abs(y - d.y) * 2;
          let refused = false;
          if (cutIt) cancelRing(); else if (releaseRing()) { d.swallow = true; refused = true; }
          if (far) { d.swallow = true;
            const held = now - d.t >= holdMs();
            cancelRing();
            if (cutIt) doCut();
            else if (isHit('deck') && canAct() && !refused) pressDrop(x - d.x, speedOf(d.s), held);
          }
          if (d.swallow) swallowUntil = now + 400;
        }
        if (cd) { const c = cd;
          cd = null;
          if (c.ghost && c.ghost.parentNode) c.ghost.parentNode.removeChild(c.ghost);
          if (c.moved && Number.isFinite(x) && Number.isFinite(y)) { if (inRect(R.dennis.getBoundingClientRect(), x, y, 24) || inRect(R.fan.getBoundingClientRect(), x, y, 10)) doOffer(c.c);
            else if (inRect(R.hgh.getBoundingClientRect(), x, y, 8)) { shake(R.hgh); sfx('buzz'); say('halfSlot', { mood: 'confused' }); }
          }
        }
      }
      function pressDrop(dx, speed, held) { countSpam();
        if (copier && copier.stage === 'please') return;
        requestHit('drag', { dx: dx, speed: speed, held: held });
      }
      function onCancel() { if (pd && pd.ghost && pd.ghost.parentNode) pd.ghost.parentNode.removeChild(pd.ghost);
        if (cd && cd.ghost && cd.ghost.parentNode) cd.ghost.parentNode.removeChild(cd.ghost);
        pd = null; cd = null; sp.drag = false;
        if (ring && ring.src === 'hold') cancelRing();
      }
      /* ---------- the stillness secret ---------- */
      let stillReady = false;
      function halfOutNow() { halfOut = true; stillReady = false; R.traySign.hidden = false;
        say('stillHalf', { priority: 1, mood: 'panic' });
        sendHalf(true, 1100, function () { if (!halfOut) return;
          override = '7 1/2'; render(); stillReady = true;
          say('stillHold', { priority: 1, mood: 'panic' });
        });
      }
      function flee() { halfOut = false; stillReady = false; override = ''; render();
        say('stillFlee', { priority: 1, mood: 'confused' }); sfx('boing');
        sendHalf(false, 700);
      }
      /* ---------- the clock tick: waiver, silence, still ring, idle ladder, pacing ---------- */
      function tick() { const now = api.now();
        if (document.hidden) { lastInput = lastProg = lastMicro = now; return; } /* a hidden tab is not idle time */
        if (sp.on && sp.drag && now - sp.t0 > 15000) sp.drag = false;
        if (still && now - still.t0 >= still.ms) { const s = still;
          still = null;
          paintRing(s.which, false);
          say('stillnessDone', { mood: 'proud', priority: 1 });
          doStand('still');
        }
        if (sil && !sil.ok) { const e = now - sil.t0;
          if (!sil.said && e >= Math.min(500, sil.dur * 0.5)) { sil.said = true; say('silenceWait'); }
          if (e >= sil.dur) { sil.ok = true; consent = true; R.sil.classList.add('m-seven-and-half-ok'); sfx('ding'); say('silenceYes', { mood: 'proud' }); }
        }
        if (phase === 'PLAY' && !busy) { if (!waived && (has(1) || has(2) || has(3) || has(4) || has(10)) && now - lastProg > (api.selftest ? 8000 : 40000)) { waived = true; resetStill(); cancelRing(); R.cutme.hidden = true;
            sfx('ding'); say('waive', { priority: 1, mood: 'smug' });
          }
          const idle = now - lastInput;
          const tIdle = api.selftest ? 4000 : 45000, tHalf = api.selftest ? 8000 : 90000, tWin = api.selftest ? 2000 : 20000, tRep = api.selftest ? 6000 : 65000, tLong = tHalf + tWin + (api.selftest ? 4000 : 60000);
          if (!halfOut) { if (idle >= tIdle && !idleDealt) { idleDealt = true;
              if (deck.length && total() < 8 && !copier) { say('idle45', { priority: 1, mood: 'disappointed' });
                if (total() + deck[deck.length - 1].v < 8 && requestHit('idle')) say('idleDeal', { count: mine[mine.length - 1].v, priority: 1, mood: 'smug' });
              }
            }
            if (idle >= tRep && !repDone) { repDone = true; floater('INACTIVITY REPORT #1 (you)'); say('idle65', { priority: 1, mood: 'smug' }); }
            if (idle >= tHalf && !halfOutDone && !copier) { halfOutDone = true; halfOutNow(); }
          } else if (stillReady && !stillWon && idle >= tHalf + tWin) { stillWon = true; api.achieve(ST + 'stillness');
            say('stillWin', { priority: 2, mood: 'proud' });
          } else if (stillWon && !longDone && idle >= tLong) { longDone = true; say('idleLong', { priority: 1, mood: 'disappointed' }); }
        }
        if (phase === 'AMEND' && openSlips.length && !slipNag && now - lastInput > (api.selftest ? 3000 : 25000)) { slipNag = true; say('slipIdle', { who: 'Sandra', priority: 1, mood: 'smug' }); }
        if (!ev3 && now - t0 >= (api.selftest ? 14000 : 180000)) { ev3 = true; threeMin(); }
        if (!ev6 && phase === 'PLAY' && !busy && now - t0 >= (api.selftest ? 20000 : 360000)) { ev6 = true; drill(); }
        if (!ev10 && now - t0 >= (api.selftest ? 27000 : 600000)) { ev10 = true; tenMin(); }
        if (phase === 'FINALE' && !busy && now - lastInput > (api.selftest ? 5000 : 25000)) finaleStand(true);
        if (phase !== 'REVEAL' && phase !== 'INIT' && phase !== 'FIN2' && !busy && now - Math.max(lastInput, lastMicro) > (api.selftest ? 4000 : matchNo >= 3 ? 18000 : 20000)) microEvent();
      }
      /* ---------- keyboard, visibility, resize ---------- */
      function pleaseProg() { for (let n = Math.min(5, keyBuf.length); n >= 1; n--) if ('please'.indexOf(keyBuf.slice(-n)) === 0) return n; return 0; }
      function onKey(e) { if (e.ctrlKey || e.metaKey || e.altKey) return;
        const tg = e.target, tn = tg && tg.tagName ? String(tg.tagName).toLowerCase() : '';
        if (tn === 'input' || tn === 'textarea' || tn === 'select' || (tg && tg.isContentEditable)) return;
        const k = String(e.key || ''), lk = k.toLowerCase();
        acted = true;
        touchInput();
        if (k.length === 1 && /[a-z]/i.test(k)) { keyBuf = (keyBuf + lk).slice(-6);
          if (keyBuf === 'please') { keyBuf = ''; doPlease(); return; }
        }
        /* typing p-l-e-a-s-e must not stand the hand (the s) or count as movement */
        if (k.length === 1 && /[a-z]/i.test(k) && pleaseProg() >= 2) return;
        const ctl = tg === R.deck ? 'deck' : tg === R.bell ? 'bell' : '';
        if ((k === ' ' || k === 'Enter') && ctl) { e.preventDefault(); if (!e.repeat) ctlKeyDown(ctl); return; }
        if (phase === 'REVEAL' && (k === ' ' || k === 'Enter')) revealFast = true;
        if (k === 'Escape') { if (binderOpen) toggleBinder(false); return; }
        if (binderOpen && (k === 'ArrowLeft' || k === 'ArrowRight')) { flipPage(k === 'ArrowLeft' ? -1 : 1); return; }
        const rep = !!e.repeat;
        if (lk === 'h') { if (!rep) ctlKeyDown(hitCtl()); }
        else if (lk === 's') { if (!rep) ctlKeyDown(standCtl()); }
        else if (lk === 'c') { if (!rep) doCut(); }
        else if (lk === 'd') { if (!rep) doPoke(); }
        else if (lk === 't') { if (!rep) tugNow(); }
        else if (lk === 'i') { if (openSlips.length) openSlips[0].add(45); }
        else if (lk === 'r') { if (!rep) toggleBinder(); }
        else if (lk === 'o') { if (rep || !canAct()) return;
          const ae = document.activeElement;
          const id = ae && root.contains(ae) && ae.dataset ? ae.dataset.id : '';
          let c = id ? mine.find(function (x) { return String(x.id) === id; }) : null;
          if (!c) c = mine[mine.length - 1];
          if (c) doOffer(c);
        } else if (k === ' ') { if (!/^(button|a)$/.test(tn) && canAct()) e.preventDefault(); }
        else if (k.length === 1 || k.indexOf('Arrow') === 0) moved();
      }
      function onKeyUp(e) { const k = String(e.key || ''), lk = k.toLowerCase();
        const tg = e.target;
        if ((k === ' ' || k === 'Enter') && (tg === R.deck || tg === R.bell)) { e.preventDefault(); swallowUntil = api.now() + 250; releaseRing(); return; }
        if (lk === 'h' || lk === 's') releaseRing();
      }
      function onVis() { if (document.hidden) { hiddenAt = api.now(); return; }
        if (hiddenAt && api.now() - hiddenAt >= 30000) say('welcomeBack', { priority: 1, mood: 'smug' });
        hiddenAt = 0;
      }
      function onResize() { const w = Math.min(window.innerWidth || 9999, root.clientWidth || 9999);
        if (w < 560 && !narrowSaid && phase === 'PLAY') { narrowSaid = true; say('resizeNarrow', { mood: 'confused' }); }
        const wide = (window.innerWidth || 0) > 1200;
        R.cactus.hidden = !wide;
        if (wide && !wideSaid && phase === 'PLAY') { wideSaid = true; say('resizeWide', { mood: 'smug' }); }
      }
      /* ---------- go ---------- */
      build();
      flags();
      api.save.set('matches', matchNo);
      st('matches');
      api.on(document, 'pointerdown', function () { acted = true; touchInput(); if (phase === 'REVEAL') revealFast = true; });
      api.on(document, 'pointermove', onMove);
      api.on(document, 'pointerup', onUp);
      api.on(document, 'pointercancel', onCancel);
      api.on(document, 'keydown', onKey);
      api.on(document, 'keyup', onKeyUp);
      api.on(document, 'visibilitychange', onVis);
      api.on(window, 'resize', onResize);
      api.onEvent('say', function (e) { if (!e || typeof e.text !== 'string') return;
        R.stripWho.textContent = String(e.who || 'Management');
        R.stripTxt.textContent = e.text;
      });
      api.setInterval(tick, 200);
      R.cactus.hidden = !((window.innerWidth || 0) > 1200);
      startHand();
      return { destroy: function () { /* every timer and listener above is managed by api.* */ } };
    }
  });
})();
