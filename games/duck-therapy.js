/* POINTLESS module: duck-therapy */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-duck-therapy-room{--dt-wall:#fff3d6;--dt-wain:#f2d9a8;--dt-duck:#ffd23f;--dt-duck2:#f0b400;--dt-beak:#ff8a1f;--dt-chair:#e9715f;--dt-trim:#e8b84a;--dt-mint:#8fd9b6;--dt-water:#6ad0e0;--dt-hi:#bff2f7;--dt-lilac:#c7b3ee;--dt-card:#fff6e0;--dt-ink:#2a2233;--dt-red:#d4352a;--dt-beige:#ebdcc0;position:relative;display:grid;gap:10px;padding:10px;min-height:420px;color:var(--dt-ink);font:15px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr) minmax(0,.75fr);grid-template-areas:"wall wall wall" "strip strip strip" "cush rug pool" "subs subs subs" "tray tray drawer";transition:filter .6s}
.m-duck-therapy-room *{box-sizing:border-box}
:where(.m-duck-therapy-room) button{font:inherit;color:inherit;cursor:pointer}
.m-duck-therapy-room button:focus-visible,.m-duck-therapy-room input:focus-visible,.m-duck-therapy-room summary:focus-visible{outline:3px solid #e8b84a;outline-offset:2px;box-shadow:0 0 0 6px var(--dt-ink)}
.m-duck-therapy-room [hidden]{display:none!important}
.m-duck-therapy-wall{grid-area:wall;position:relative;display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px 14px;padding:10px 12px 8px;min-height:140px;border:3px solid var(--dt-ink);border-radius:14px;box-shadow:4px 4px 0 var(--dt-ink);background:radial-gradient(rgba(42,34,51,.07) 1px,transparent 1.6px) 0 0/6px 6px,linear-gradient(var(--dt-wall) 0 74%,var(--dt-wain) 74%)}
.m-duck-therapy-dip{width:132px;min-height:58px;padding:6px 8px;background:var(--dt-lilac);border:3px solid var(--dt-ink);border-radius:8px;box-shadow:3px 3px 0 var(--dt-ink);font-size:11px;font-weight:800;line-height:1.2;align-self:flex-start}
.m-duck-therapy-shelf{display:flex;align-items:flex-end;gap:6px;min-width:150px;min-height:56px;padding:0 6px;border-bottom:7px solid #a8743a;border-radius:2px;flex:1 1 150px;max-width:260px}
.m-duck-therapy-shelf.m-duck-therapy-shrine{border-bottom-color:#7c4f9c;background:linear-gradient(#e8d6ff 0 0) bottom/70% 6px no-repeat}
.m-duck-therapy-shi{min-width:44px;min-height:44px;background:transparent;border:0;font-size:26px;line-height:1;padding:0;position:relative}
.m-duck-therapy-shi small{display:block;font-size:10px;white-space:normal;max-width:84px;font-weight:800;background:#fff;border:1px solid var(--dt-ink);padding:0 2px;margin-top:1px;line-height:1.2}
.m-duck-therapy-tiny{font-size:18px}
.m-duck-therapy-clk{width:58px;height:58px;padding:0;background:#fff;border:3px solid var(--dt-ink);border-radius:50%;box-shadow:3px 3px 0 var(--dt-ink)}
.m-duck-therapy-clk svg{display:block;width:100%;height:100%}
.m-duck-therapy-door{width:44px;height:64px;padding:0;background:#b5651d;border:3px solid var(--dt-ink);border-radius:20px 20px 2px 2px;position:relative;box-shadow:3px 3px 0 var(--dt-ink)}
.m-duck-therapy-door::after{content:"";position:absolute;right:7px;top:34px;width:7px;height:7px;border-radius:50%;background:var(--dt-trim);border:2px solid var(--dt-ink)}
.m-duck-therapy-den{width:58px;min-height:58px;padding:0;background:transparent;border:0;font-size:46px;line-height:1}
.m-duck-therapy-den span{display:inline-block;transform-origin:50% 90%;animation:m-duck-therapy-leaf 4.5s ease-in-out infinite}
.m-duck-therapy-desk{display:flex;align-items:flex-end;gap:8px;margin-left:auto;padding:6px 8px;border-top:6px solid #a8743a;background:rgba(168,116,58,.18);border-radius:6px 6px 0 0}
.m-duck-therapy-clip{min-width:46px;min-height:56px;padding:4px;background:#fff;border:3px solid var(--dt-ink);border-radius:4px;font-size:10px;font-weight:800;line-height:1.1;position:relative}
.m-duck-therapy-rcpt{position:absolute;right:0;top:100%;width:210px;margin-top:6px;padding:6px 8px 10px;background:#fffdf4;border:1px solid var(--dt-ink);box-shadow:2px 2px 0 rgba(42,34,51,.5);font:400 11px/1.45 "Courier New",monospace;text-align:left;z-index:6;pointer-events:none;color:var(--dt-ink);clip-path:polygon(0 0,100% 0,100% 100%,92% 96%,83% 100%,75% 96%,66% 100%,58% 96%,50% 100%,42% 96%,33% 100%,25% 96%,17% 100%,8% 96%,0 100%)}
.m-duck-therapy-rcpt span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:m-duck-therapy-pop .25s}
.m-duck-therapy-clip::before{content:"";position:absolute;left:12px;right:12px;top:-7px;height:9px;background:var(--dt-trim);border:2px solid var(--dt-ink);border-radius:3px}
.m-duck-therapy-ph{width:84px;min-height:52px;padding:4px 6px;background:#e9715f;border:3px solid var(--dt-ink);border-radius:12px;box-shadow:3px 3px 0 var(--dt-ink);position:relative;font-size:10px;font-weight:800}
.m-duck-therapy-ph::before{content:"";position:absolute;left:-4px;right:-4px;top:-9px;height:11px;background:#2a2233;border-radius:20px}
.m-duck-therapy-lamps{display:flex;gap:6px;justify-content:center;margin-top:6px}
.m-duck-therapy-lamp{width:13px;height:13px;border-radius:50%;background:#7a6a82;border:2px solid var(--dt-ink)}
.m-duck-therapy-lamp.m-duck-therapy-on{background:#fff36b;box-shadow:0 0 8px 3px #ffe94f}
.m-duck-therapy-ring .m-duck-therapy-ph{animation:m-duck-therapy-shake .25s linear infinite}
.m-duck-therapy-phx{width:84px;min-height:52px;border:3px dashed var(--dt-ink);border-radius:12px;font-size:10px;font-weight:800;padding:4px;background:#fff9c4;transform:rotate(2deg)}
.m-duck-therapy-lbl{display:block;font-size:10px;margin-top:2px;background:#fff9c4;border:1px solid var(--dt-ink);padding:0 3px;color:var(--dt-ink)}
.m-duck-therapy-strip{grid-area:strip;display:flex;flex-wrap:wrap;gap:4px 14px;align-items:center;padding:8px 12px;background:var(--dt-card);border:3px solid var(--dt-ink);border-radius:12px;box-shadow:4px 4px 0 var(--dt-ink);font-size:13px;font-weight:700}
.m-duck-therapy-pips{display:flex;gap:4px}
.m-duck-therapy-pip{width:12px;height:12px;border-radius:50%;border:2px solid var(--dt-ink);background:#fff}
.m-duck-therapy-pip.m-duck-therapy-on{background:var(--dt-duck)}
.m-duck-therapy-pip.m-duck-therapy-off{background:repeating-linear-gradient(45deg,#ccc 0 2px,#fff 2px 4px);opacity:.55}
.m-duck-therapy-rug{grid-area:rug;position:relative;min-height:268px;display:flex;align-items:flex-end;justify-content:center;padding:46px 0 10px;overflow:hidden}
.m-duck-therapy-rug::before{content:"";position:absolute;left:1%;right:1%;bottom:8px;height:66px;border-radius:50%;background:repeating-radial-gradient(ellipse at center,#d9826f 0 10px,#f1b79b 10px 20px);border:3px solid var(--dt-ink);z-index:0}
.m-duck-therapy-chair{position:relative;width:200px;height:196px;z-index:1;transform:translateX(var(--dt-chair-x,0px));touch-action:pan-y;user-select:none;-webkit-user-select:none;display:flex;align-items:flex-end;justify-content:center;margin-bottom:12px}
.m-duck-therapy-chair::before{content:"";position:absolute;left:14px;right:14px;bottom:0;height:150px;background:var(--dt-chair);border:3px solid var(--dt-ink);border-radius:60px 60px 10px 10px;box-shadow:4px 4px 0 var(--dt-ink);z-index:0}
.m-duck-therapy-chair::after{content:"";position:absolute;left:0;right:0;bottom:0;height:56px;border:3px solid var(--dt-ink);border-radius:18px;background:linear-gradient(var(--dt-trim) 0 14px,var(--dt-chair) 14px);z-index:2;pointer-events:none}
.m-duck-therapy-duckw{position:relative;z-index:1;margin-bottom:26px;animation:m-duck-therapy-bob 3.4s ease-in-out infinite;--ex:0;--ey:0}
.m-duck-therapy-duck{display:block;width:150px;height:150px;padding:0;margin:0;background:none;border:0;border-radius:50%;touch-action:none;user-select:none;-webkit-user-select:none;transform-origin:50% 100%;transition:transform .25s}
.m-duck-therapy-body{width:100%;height:100%;transform-origin:50% 100%;transform:scale(calc(1 + var(--dt-squish,0) * .16),calc(1 - var(--dt-squish,0) * .3));transition:transform .22s cubic-bezier(.3,1.8,.5,1)}
.m-duck-therapy-held .m-duck-therapy-body{transition:none}
.m-duck-therapy-body svg{width:100%;height:100%;display:block;overflow:visible}
.m-duck-therapy-pup{transform:translate(calc(var(--ex) * 3px),calc(var(--ey) * 3px))}
.m-duck-therapy-eye{transform-box:fill-box;transform-origin:center;animation:m-duck-therapy-blink 4.1s infinite}
.m-duck-therapy-room:not(.m-duck-therapy-gls) .m-duck-therapy-g-gls,.m-duck-therapy-room:not(.m-duck-therapy-lan) .m-duck-therapy-g-lan,.m-duck-therapy-room:not(.m-duck-therapy-clp) .m-duck-therapy-g-clp,.m-duck-therapy-room:not(.m-duck-therapy-mb) .m-duck-therapy-g-mb,.m-duck-therapy-room:not(.m-duck-therapy-kh) .m-duck-therapy-g-kh{display:none}
.m-duck-therapy-duckw:not(.m-duck-therapy-cover) .m-duck-therapy-g-cov{display:none}
.m-duck-therapy-beakb{position:absolute;left:50%;top:51%;width:46px;height:44px;margin:-5px 0 0 -23px;padding:0;background:transparent;border:0;border-radius:50%;z-index:3}
.m-duck-therapy-limp .m-duck-therapy-duck{transform:scale(1,.6) rotate(-4deg)}
.m-duck-therapy-lean .m-duck-therapy-duck{transform:translateX(-14px) rotate(-9deg)}
.m-duck-therapy-flinch .m-duck-therapy-duck{animation:m-duck-therapy-flinch .5s}
.m-duck-therapy-asleep .m-duck-therapy-eye{animation:none;transform:scaleY(.12)}
.m-duck-therapy-asleep .m-duck-therapy-duck{transform:rotate(6deg) scale(1,.94)}
.m-duck-therapy-nodd .m-duck-therapy-duck{animation:m-duck-therapy-nod .5s}
.m-duck-therapy-ovation .m-duck-therapy-g-wing{animation:m-duck-therapy-flap .18s linear infinite;transform-box:fill-box;transform-origin:50% 20%}
.m-duck-therapy-thrilled .m-duck-therapy-duck{animation:m-duck-therapy-hop .5s}
.m-duck-therapy-beak .m-duck-therapy-g-beak{transform-box:fill-box;transform-origin:50% 0;transform:scaleY(1.35)}
.m-duck-therapy-gone .m-duck-therapy-duckw{visibility:hidden}
.m-duck-therapy-stand .m-duck-therapy-chair{transform:translateX(var(--dt-chair-x,0px)) rotate(-14deg);transition:transform 1s}
.m-duck-therapy-stand .m-duck-therapy-duckw{transform:translateX(120px);transition:transform 1.2s}
.m-duck-therapy-stand .m-duck-therapy-duckw{animation:none}
.m-duck-therapy-tilt .m-duck-therapy-tiny{transform:rotate(-18deg)}
.m-duck-therapy-clip.m-duck-therapy-fresh,.m-duck-therapy-drawer.m-duck-therapy-fresh{animation:m-duck-therapy-glow 1s ease-in-out 2}
.m-duck-therapy-thought{position:absolute;left:0;right:0;top:6px;display:flex;justify-content:center;gap:5px;height:30px;align-items:center;font-size:24px;line-height:1;z-index:3;pointer-events:none;transition:opacity .6s}
.m-duck-therapy-sym{display:inline-block;animation:m-duck-therapy-pop .2s}
.m-duck-therapy-sym.m-duck-therapy-prov{opacity:.5}
.m-duck-therapy-ring2{position:absolute;left:50%;top:50%;width:176px;height:176px;margin:-96px 0 0 -88px;border:3px dashed var(--dt-duck2);border-radius:50%;opacity:0;pointer-events:none;z-index:2}
.m-duck-therapy-ring2.m-duck-therapy-on{animation:m-duck-therapy-listen 1.1s linear forwards}
.m-duck-therapy-hint{position:absolute;left:0;right:0;margin:0 auto;bottom:210px;z-index:4;background:#fff;border:3px solid var(--dt-ink);border-radius:20px;padding:2px 12px;font-weight:900;font-size:13px;width:max-content;max-width:92%;text-align:center;box-shadow:3px 3px 0 var(--dt-ink);animation:m-duck-therapy-bob 1s ease-in-out infinite;pointer-events:none}
.m-duck-therapy-sign{position:absolute;z-index:5;left:50%;top:90px;transform:translateX(-50%) rotate(-3deg);background:#fff;border:3px solid var(--dt-ink);padding:3px 10px;font-weight:900;font-size:13px;text-align:center;box-shadow:3px 3px 0 var(--dt-ink);pointer-events:none;max-width:90%}
.m-duck-therapy-sand{position:absolute;z-index:0;right:22%;bottom:50px;font-size:30px}
.m-duck-therapy-snore{position:absolute;z-index:3;right:20%;top:70px;font-weight:900;font-size:18px;animation:m-duck-therapy-bob 1.4s ease-in-out infinite;pointer-events:none}
.m-duck-therapy-fly,.m-duck-therapy-chip{position:absolute;z-index:30;pointer-events:none;padding:3px 8px;background:#fff59d;border:2px solid var(--dt-ink);font-size:12px;font-weight:800;max-width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;transition:transform .4s ease-in,opacity .4s ease-in}
.m-duck-therapy-chip{background:#fff;animation:m-duck-therapy-hop2 .45s ease-in forwards}
.m-duck-therapy-cush{grid-area:cush;position:relative;align-self:end;display:flex;flex-direction:column;gap:8px;padding:12px;background:var(--dt-mint);border:3px solid var(--dt-ink);border-radius:26px 26px 14px 14px;box-shadow:4px 4px 0 var(--dt-ink)}
.m-duck-therapy-cush label{font-size:12px;font-weight:800}
.m-duck-therapy-in{width:100%;min-height:44px;padding:6px 12px;border:3px solid var(--dt-ink);border-radius:22px;background:#fff;font:inherit;color:var(--dt-ink)}
.m-duck-therapy-in.m-duck-therapy-glow{animation:m-duck-therapy-glow 1.6s ease-in-out infinite}
.m-duck-therapy-nod{min-height:44px;padding:4px 14px;background:#fff;border:3px solid var(--dt-ink);border-radius:22px;font-weight:800;box-shadow:3px 3px 0 var(--dt-ink)}
.m-duck-therapy-nod:active,.m-duck-therapy-pull:active,.m-duck-therapy-next:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--dt-ink)}
.m-duck-therapy-pull{min-height:44px;padding:4px 12px;background:var(--dt-trim);border:3px solid var(--dt-ink);border-radius:22px;font-weight:800;box-shadow:3px 3px 0 var(--dt-ink)}
.m-duck-therapy-pool{grid-area:pool;position:relative;min-height:268px;overflow:hidden;border:3px solid var(--dt-ink);border-radius:22px 22px 40px 40px;box-shadow:4px 4px 0 var(--dt-ink);background:linear-gradient(105deg,rgba(255,255,255,.55) 0 9%,transparent 9% 14%,rgba(255,255,255,.25) 14% 17%,transparent 17%),linear-gradient(var(--dt-hi) 0 6%,var(--dt-water) 6%)}
.m-duck-therapy-pool::before{content:"";position:absolute;left:-10%;right:-10%;top:5%;height:8px;border-radius:50%;background:var(--dt-hi);animation:m-duck-therapy-wave 3s ease-in-out infinite}
.m-duck-therapy-plab{position:absolute;left:8px;right:8px;top:12px;z-index:1;font-size:11px;font-weight:800;line-height:1.2;color:#12414a;pointer-events:none}
.m-duck-therapy-bub{position:absolute;left:0;top:0;min-width:46px;height:44px;padding:0 10px;border-radius:999px;border:2px solid #1d6f7a;background:radial-gradient(circle at 30% 28%,#fff 0 12%,rgba(255,255,255,.35) 13% 40%,rgba(191,242,247,.55) 41%);font-size:11px;font-weight:800;color:#12414a;white-space:nowrap;z-index:2}
.m-duck-therapy-bub.m-duck-therapy-deep{min-width:74px;height:58px;padding:0 14px;background:conic-gradient(from 0deg,#fff,#ffd6f6,#c7e9ff,#fff7b0,#fff);border-color:#7c4f9c;animation:m-duck-therapy-shimmer 2.4s linear infinite}
.m-duck-therapy-bub.m-duck-therapy-zz{border-color:#7c4f9c;font-size:16px}
.m-duck-therapy-pring{position:absolute;z-index:3;width:40px;height:40px;margin:-20px 0 0 -20px;border:3px solid #fff;border-radius:50%;opacity:0;pointer-events:none}
.m-duck-therapy-pring.m-duck-therapy-on{animation:m-duck-therapy-ringout .4s ease-out}
.m-duck-therapy-psay{position:absolute;z-index:4;left:6px;right:6px;bottom:8px;padding:6px 8px;background:#fff;border:3px solid var(--dt-ink);border-radius:12px;font-size:11px;font-weight:700;pointer-events:none}
.m-duck-therapy-subs{grid-area:subs;display:grid;gap:8px;grid-template-columns:minmax(0,1fr) minmax(0,2fr);align-items:stretch}
.m-duck-therapy-spk{min-height:60px;padding:10px 14px;background:#fff;border:3px solid var(--dt-ink);border-radius:20px 20px 20px 4px;box-shadow:4px 4px 0 var(--dt-ink);font-size:22px;font-weight:900;letter-spacing:.04em;display:flex;align-items:center}
.m-duck-therapy-spk.m-duck-therapy-say{animation:m-duck-therapy-speak .5s}
.m-duck-therapy-aaa{display:inline-block;transform-origin:0 50%;animation:m-duck-therapy-aaa 1s ease-out forwards}
.m-duck-therapy-intw{position:relative;min-height:60px;padding:6px 14px 14px;background:var(--dt-lilac);border:3px solid var(--dt-ink);border-radius:14px;box-shadow:4px 4px 0 var(--dt-ink)}
.m-duck-therapy-intl{display:block;font-size:10px;font-weight:900;letter-spacing:.12em}
.m-duck-therapy-fn{position:absolute;right:8px;bottom:2px;font-size:11px;opacity:1}
.m-duck-therapy-int{display:block;font-size:14px;font-weight:600;overflow-wrap:anywhere}
.m-duck-therapy-int.m-duck-therapy-wipe{animation:m-duck-therapy-wipe .7s steps(14) forwards}
.m-duck-therapy-brief{position:absolute;right:-6px;top:-18px;font-size:22px}
.m-duck-therapy-tray{grid-area:tray;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;align-content:start;padding:8px 4px}
.m-duck-therapy-tray.m-duck-therapy-pulse{animation:m-duck-therapy-glow 1s ease-in-out 2}
.m-duck-therapy-note{position:relative;min-width:0;min-height:84px;padding:8px 8px 6px 20px;text-align:left;background:#fff59d;border:2px solid var(--dt-ink);border-radius:2px 2px 14px 2px;box-shadow:3px 3px 0 rgba(42,34,51,.8);font-size:12px;font-weight:600;line-height:1.25;transform:rotate(var(--r,0deg));animation:m-duck-therapy-slidein .4s ease-out}
.m-duck-therapy-note.m-duck-therapy-pink{background:#ffc1d9}
.m-duck-therapy-note:hover{transform:rotate(0deg) translateY(-3px)}
.m-duck-therapy-nn{position:absolute;left:5px;top:4px;font-weight:900;font-size:11px}
.m-duck-therapy-sharep{grid-area:tray;display:flex;flex-direction:column;gap:8px;padding:12px;background:#ffc1d9;border:3px solid var(--dt-ink);border-radius:14px;box-shadow:4px 4px 0 var(--dt-ink)}
.m-duck-therapy-btns{display:flex;flex-wrap:wrap;gap:8px}
.m-duck-therapy-btns button,.m-duck-therapy-next,.m-duck-therapy-q{min-height:44px;padding:4px 14px;background:#fff;border:3px solid var(--dt-ink);border-radius:22px;font-weight:800;box-shadow:3px 3px 0 var(--dt-ink)}
.m-duck-therapy-drawer{grid-area:drawer;background:var(--dt-card);border:3px solid var(--dt-ink);border-radius:12px;box-shadow:4px 4px 0 var(--dt-ink);align-self:start}
.m-duck-therapy-drawer summary{min-height:44px;display:flex;align-items:center;padding:4px 12px;font-weight:800;font-size:13px;cursor:pointer}
.m-duck-therapy-slots{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;padding:6px 10px 10px}
.m-duck-therapy-slot{padding:4px 6px;background:#fff;border:2px solid var(--dt-ink);border-radius:8px;font-size:11px;line-height:1.25;min-height:54px}
.m-duck-therapy-slot b{display:block;font-size:13px}
.m-duck-therapy-glyph{display:block;letter-spacing:.15em;font-size:12px}
.m-duck-therapy-ov{position:absolute;z-index:20;left:10px;right:10px;top:90px;padding:12px;background:var(--dt-card);border:3px solid var(--dt-ink);border-radius:12px;box-shadow:6px 6px 0 var(--dt-ink)}
.m-duck-therapy-inv{max-width:360px;margin:0 auto;left:0;right:0;background:#fffdf4;font-family:"Courier New",monospace;font-size:13px;-webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/12px 100%;mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/12px 100%;padding-bottom:22px;border-radius:4px}
.m-duck-therapy-rows{list-style:none;margin:6px 0;padding:0}
.m-duck-therapy-rows li{border-bottom:1px dashed #9a8f7a;padding:2px 0;animation:m-duck-therapy-pop .25s}
.m-duck-therapy-torn{margin-top:6px;padding:4px 6px;background:#f4ead2;font-size:11px;clip-path:polygon(0 0,100% 0,98% 30%,100% 60%,97% 100%,0 100%)}
.m-duck-therapy-stamp{position:absolute;right:14px;top:36px;border:4px solid var(--dt-red);color:var(--dt-red);border-radius:8px;padding:0 10px;font-weight:900;font-size:22px;letter-spacing:.08em;transform:rotate(-6deg);animation:m-duck-therapy-stamp .3s ease-out}
.m-duck-therapy-pnote{max-width:340px;margin:0 auto;left:0;right:0;font-size:13px}
.m-duck-therapy-pnote svg{width:100%;height:46px;display:block}
.m-duck-therapy-pnote path{fill:none;stroke:#444;stroke-width:2;stroke-dasharray:400;stroke-dashoffset:400;animation:m-duck-therapy-write 2s linear forwards}
.m-duck-therapy-pnote em.m-duck-therapy-hand{font:italic 18px/1.3 Georgia,serif;display:block}
.m-duck-therapy-small{font-size:11px;opacity:1;display:block;margin-top:4px}
.m-duck-therapy-cor{position:absolute;z-index:25;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:repeating-linear-gradient(90deg,#ebdcc0 0 40px,#dccaa6 40px 42px);filter:sepia(.9);font-weight:800;text-align:center;padding:20px}
.m-duck-therapy-cor span{font-size:46px}
.m-duck-therapy-cert{max-width:340px;margin:0 auto;left:0;right:0;text-align:center;background:linear-gradient(135deg,#f6d9a0,#e8b66c 55%,#f1c987);border:7px solid #b3752e;border-radius:26px;font-weight:700;font-size:13px}
.m-duck-therapy-cert h3{margin:0 0 4px;font-size:15px;letter-spacing:.08em}
.m-duck-therapy-surv{max-width:380px;margin:0 auto;left:0;right:0;text-align:center}
.m-duck-therapy-dim{position:absolute;inset:0;z-index:40;background:#000;opacity:0;pointer-events:none;transition:opacity 2s}
.m-duck-therapy-dim.m-duck-therapy-on{opacity:.04}
.m-duck-therapy-dim.m-duck-therapy-dip2{opacity:.45;transition:opacity .6s}
.m-duck-therapy-dim.m-duck-therapy-flick{animation:m-duck-therapy-flick 1.2s steps(2) 1}
.m-duck-therapy-corridor{filter:sepia(.9)}
.m-duck-therapy-aud .m-duck-therapy-wall::after{content:"EVENTUALLY";position:absolute;left:50%;top:6px;transform:translateX(-50%);font-weight:900;letter-spacing:.5em;color:rgba(42,34,51,.25);font-size:22px;pointer-events:none}
.m-duck-therapy-aud .m-duck-therapy-rug::after{content:"";position:absolute;left:30%;right:30%;top:0;bottom:30px;background:linear-gradient(rgba(255,244,170,.45),transparent);clip-path:polygon(40% 0,60% 0,100% 100%,0 100%);pointer-events:none}
.m-duck-therapy-ringg{position:absolute;inset:0;pointer-events:none;z-index:0}
.m-duck-therapy-gd{position:absolute;display:flex;align-items:center;justify-content:center;min-width:40px;min-height:40px;padding:0;background:none;border:0;pointer-events:auto;font-size:26px;line-height:1;margin:-20px 0 0 -20px;animation:m-duck-therapy-gnod 1.4s ease-in-out infinite;animation-delay:calc(var(--i) * 140ms);animation-duration:calc(1.4s + var(--drift,0s))}
.m-duck-therapy-narrow{grid-template-columns:minmax(0,1fr);grid-template-areas:"strip" "rug" "subs" "cush" "tray" "pool" "wall" "drawer"}
.m-duck-therapy-narrow .m-duck-therapy-wall{min-height:96px}
.m-duck-therapy-narrow .m-duck-therapy-pool{min-height:70px;height:70px;border-radius:30px}
.m-duck-therapy-narrow .m-duck-therapy-tray{display:flex;flex-wrap:nowrap;overflow-x:auto}
.m-duck-therapy-narrow .m-duck-therapy-note{flex:0 0 156px;min-height:92px}
.m-duck-therapy-narrow .m-duck-therapy-subs{grid-template-columns:minmax(0,1fr)}
.m-duck-therapy-narrow .m-duck-therapy-rug{min-height:250px}
.m-duck-therapy-narrow .m-duck-therapy-duck{width:130px;height:130px}
.m-duck-therapy-narrow .m-duck-therapy-chair{width:170px;height:170px}
.m-duck-therapy-narrow .m-duck-therapy-dip{width:100px}
.m-duck-therapy-loveseat .m-duck-therapy-rug{padding-top:40px;min-height:240px}
.m-duck-therapy-loveseat .m-duck-therapy-chair{width:100%;max-width:330px;border-radius:30px}
.m-duck-therapy-loveseat .m-duck-therapy-duck{width:min(52vw,190px);height:min(52vw,190px)}
.m-duck-therapy-loveseat .m-duck-therapy-chair::before{left:0;right:0}
.m-duck-therapy-loveseat .m-duck-therapy-cush{border-radius:14px;margin-top:-18px}
@keyframes m-duck-therapy-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes m-duck-therapy-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes m-duck-therapy-leaf{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}
@keyframes m-duck-therapy-shake{0%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}100%{transform:rotate(-3deg)}}
@keyframes m-duck-therapy-flinch{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px) scale(.96)}60%{transform:translateX(6px)}}
@keyframes m-duck-therapy-nod{0%,100%{transform:rotate(0)}40%{transform:rotate(12deg)}}
@keyframes m-duck-therapy-flap{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(30deg)}}
@keyframes m-duck-therapy-hop{0%,100%{transform:translateY(0)}40%{transform:translateY(-16px)}}
@keyframes m-duck-therapy-pop{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes m-duck-therapy-listen{from{opacity:.9;transform:scale(1.15)}to{opacity:0;transform:scale(.8)}}
@keyframes m-duck-therapy-glow{0%,100%{box-shadow:0 0 0 0 rgba(255,210,63,0)}50%{box-shadow:0 0 0 7px rgba(255,210,63,.9)}}
@keyframes m-duck-therapy-hop2{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--dx,0px),var(--dy,0px)) scale(.3);opacity:0}}
@keyframes m-duck-therapy-wave{0%,100%{transform:translateX(-3%)}50%{transform:translateX(3%)}}
@keyframes m-duck-therapy-shimmer{to{filter:hue-rotate(360deg)}}
@keyframes m-duck-therapy-ringout{from{opacity:1;transform:scale(.5)}to{opacity:0;transform:scale(1.8)}}
@keyframes m-duck-therapy-speak{0%{letter-spacing:.3em;opacity:.2}100%{letter-spacing:.04em;opacity:1}}
@keyframes m-duck-therapy-aaa{from{transform:scaleX(1)}to{transform:scaleX(2.6)}}
@keyframes m-duck-therapy-wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes m-duck-therapy-slidein{from{transform:translateY(40px) rotate(8deg);opacity:0}to{opacity:1}}
@keyframes m-duck-therapy-stamp{from{transform:rotate(-6deg) scale(2.4);opacity:0}to{transform:rotate(-6deg) scale(1);opacity:1}}
@keyframes m-duck-therapy-write{to{stroke-dashoffset:0}}
@keyframes m-duck-therapy-flick{0%{opacity:.5}25%{opacity:.05}50%{opacity:.4}75%{opacity:0}100%{opacity:.04}}
@keyframes m-duck-therapy-gnod{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(5px) rotate(8deg)}}
@keyframes m-duck-therapy-circ{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.m-duck-therapy-duckw.m-duck-therapy-circ{animation:m-duck-therapy-circ 1.3s ease-in-out 2}
@media (prefers-reduced-motion:reduce){.m-duck-therapy-room *,.m-duck-therapy-room *::before,.m-duck-therapy-room *::after{animation-duration:.01ms!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
.pm-reduce-motion .m-duck-therapy-room *,.pm-reduce-motion .m-duck-therapy-room *::before,.pm-reduce-motion .m-duck-therapy-room *::after{animation-duration:.01ms!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
`, 'css-duck-therapy');

  P.addAchievements([
    { id: 'duck-therapy.first', name: 'Doctor of Squeak (Honorary, Unaccredited, Framed)', desc: 'Squeeze the duck for the first time. The squeeze has been filed under \'Therapy\'.', icon: '\u{1F986}', reward: 1 },
    { id: 'duck-therapy.hour', name: 'Chancellor of the Fifty-Minute Hour (Fifty Seconds)', desc: 'Finish Session 1. The hour was not the length it claimed, but the bell was convincing.', icon: '\u{1F514}', reward: 2 },
    { id: 'duck-therapy.invoice', name: 'Supreme Chancellor of Billable Minutes', desc: 'Pay your first invoice by squeezing the duck exactly once.', icon: '\u{1F9FE}', reward: 2 },
    { id: 'duck-therapy.bubbles', name: 'Archbishop of Reflections, Reversed Division', desc: 'Pop 100 bubbles in the Reflection Pool. They were your own words, backward, and you are a person who has now popped them.', icon: '\u{1F6C1}', reward: 3, check: function (s) { return (s['duck-therapy.bubbles'] || 0) >= 100; } },
    { id: 'duck-therapy.vocab', name: 'Supreme Cartographer of the Twelve Words', desc: 'Discover all 12 patterns in the Approved Vocabulary. The duck says \'Quack.\' and signs your map.', icon: '\u{1F5FA}', reward: 5 },
    { id: 'duck-therapy.call', name: 'Grand Switchboard Operator of Nothing in Particular', desc: 'Answer your first call by echoing the ring.', icon: '\u{1F4DE}', reward: 3 },
    { id: 'duck-therapy.chair', name: 'Lord Chamberlain of Personal Space', desc: 'Drag the armchair back toward the couch 20 times. It will have left again by the time you read this.', icon: '\u{1F6CB}', reward: 3, check: function (s) { return (s['duck-therapy.chair'] || 0) >= 20; } },
    { id: 'duck-therapy.nods', name: 'Duke of the Delayed Nod', desc: 'Nod at the duck 20 times. The duck is still processing the first one.', icon: '\u{1F464}', reward: 3 },
    { id: 'duck-therapy.boop', name: 'Knight of the Tenth Boop', desc: 'Boop the beak 10 times. The beak says Please.', icon: '\u{1F449}', reward: 2 },
    { id: 'duck-therapy.listener', name: 'Order of the Level 1 Listener', desc: 'Get through the duck\'s confessions in Session 6. There is no Level 2.', icon: '\u{1F442}', reward: 3 },
    { id: 'duck-therapy.discharge', name: 'Grand Marshal of Session One of One', desc: 'Be discharged, cured of Nothing, with all the rights and privileges thereof, which are none.', icon: '\u{1F393}', reward: 10 },
    { id: 'duck-therapy.loop', name: 'Alumnus of Session 1 of 1, Second Printing', desc: 'Be welcomed back. The duck says nothing in the Alliance has changed.', icon: '\u{1F501}', reward: 5 },
    { id: 'duck-therapy.seven', name: 'Seven-and-a-Half Star General of the Inner Duck', desc: 'Find the thirteenth word. You were told there were twelve. Sandra counted twice.', icon: '⭐', secret: true, reward: 7.5 },
    { id: 'duck-therapy.corridor', name: 'Visitor to the Corridor, Briefly', desc: 'Go through the painted door. We do not go there.', icon: '\u{1F6AA}', secret: true, reward: 7.5 },
    { id: 'duck-therapy.idle', name: 'Emeritus Patient Zero of Having Gone Out for a Sandwich', desc: 'Leave the duck alone for 240 seconds. The duck held the space. The duck did not wait. The duck waited.', icon: '\u{1F96A}', secret: true, reward: 5 },
    { id: 'duck-therapy.snore', name: 'Lullaby Laureate of the Reflection Pool', desc: 'Pop the duck\'s snore. It was a small one. It was also yours.', icon: '\u{1F4A4}', secret: true, reward: 2 },
    { id: 'duck-therapy.warden', name: 'Lord High Warden of Overtime', desc: 'Squeeze the duck 9 times in 2 seconds, forty times, until Security arrives. The achievement is the toast.', icon: '\u{1F6E1}', secret: true, reward: 5 },
    { id: 'duck-therapy.tuesday', name: 'Keeper of the Knitted Hat', desc: 'Say the word the duck asked you not to say, four times, and be given a hat.', icon: '\u{1F9F6}', secret: true, reward: 4 },
    { id: 'duck-therapy.knock', name: 'Admitted, Having Knocked', desc: 'Tap the pattern on the wall. The wall answered. The wall said come in.', icon: '\u{1F44A}', secret: true, reward: 3 },
    { id: 'duck-therapy.fluent', name: 'Chief Mourner of the Interpreter (Severance: 7 1/2 Breadcrumbs)', desc: 'Type quack. The duck understood. The Interpreter has been shown out.', icon: '\u{1F35E}', secret: true, reward: 25 },
    { id: 'duck-therapy.circle', name: 'Emperor of the Circled Back, Wearer of the Seventh Lanyard', desc: 'Circle back. The duck did. It was not anywhere before, and would like the return filed under Triumph.', icon: '\u{1F300}', secret: true, reward: 12 },
    { id: 'duck-therapy.ten', name: 'Honorary Fellow of the Tenth Minute (Unpaid, Unwitnessed, Framed)', desc: 'Stay for ten minutes. The duck said five words. Management is still in the filing room.', icon: '\u{23F3}', secret: true, reward: 10 },
    { id: 'duck-therapy.sock', name: 'Custodian of the Sock\'s Silence', desc: 'Mention a sock to the duck. The duck knows where it is.', icon: '\u{1F9E6}', secret: true, reward: 2 },
    { id: 'duck-therapy.wednesday', name: 'Visitor to Wednesday (Day Pass, Non-Transferable)', desc: 'Say Tuesday seven times, and be shown the day after it. The hat came off. Everyone faced the wall.', icon: '\u{1F4C5}', secret: true, reward: 3 },
    { id: 'duck-therapy.groupshare', name: 'Facilitator of the Eleven (Dennis Abstained)', desc: 'Hear every member of the Session 9 group share. One of them was a plant, and said the most.', icon: '\u{1F33F}', secret: true, reward: 3 }
  ]);

  P.addLines('moduleEnter', ['Room 7 1/2 is now in session. The duck has been seated since before you arrived.', 'You have entered Rubber Duck Therapy. Please sit. The couch is a suggestion and also a rule.']);
  P.addLines('moduleExit', ['You left Rubber Duck Therapy mid-hour. The duck has not been hurt. The duck has written \'was not hurt\' fourteen times.', 'Session ended by the patient. The duck has billed for the remainder, in bread.']);
  P.addLines('ticker', ['Rubber duck confirms it is a licensed professional. License issued by a pond. Pond declines to comment.', 'Wellness at 7%, plus or minus 7%, officials say. Officials are confident.', 'Local clock reads 4:47, as it has since the Tuesday began. It stands by this.', 'Interpreter (Certified*) denies speaking duck. Interpreter says the course was by mail.']);
  P.addLines('tip', ['Tip: the duck has 12 words. Management has counted 13. Sandra has counted twice.', 'Tip: tap for a short squeak, hold for a long one. The duck can tell the difference and has told no one.']);
  P.addLines('poster', ['POSTER: THERAPY IS WHAT HAPPENS WHEN YOU SQUEEZE. Room 7 1/2.']);

  /* ---------------------------------------------------------------- DATA (section 9 of the brief) */
  const VOCAB = [
    { p: 'S', w: 'Hm.', n: 'Means \'tell me more\' or \'I have left the room\'.', d: 'The duck says \'Hm.\' This is the duck\'s way of saying \'tell me more\' or \'I have left the room.\' Both are clinically valid.' },
    { p: 'SS', w: 'Mm-hm.', n: 'Validates feelings. Occasionally parking tickets.', d: '\'Mm-hm.\' The duck is validating your feelings and, possibly, a parking ticket.' },
    { p: 'SSS', w: 'Quack.', n: 'Not a solution. A Quack.', d: '\'Quack.\' Have you tried not having %NOUN? The duck does not offer solutions. The duck offers Quack.' },
    { p: 'L', w: 'Quaaack.', n: 'The sad voice. Long. About 2011.', d: 'A long one. That is the duck\'s sad voice. It is about %NOUN. It is also about something in 2011.' },
    { p: 'SL', w: 'Water.', n: 'Every problem, eventually.', d: '\'Water.\' Duck wisdom holds that every problem eventually becomes water. Management has not verified this.' },
    { p: 'LS', w: 'Bread.', n: 'Not a metaphor. Not not.', d: '\'Bread.\' It is not a metaphor. It is also not not a metaphor. Sandra has asked us to leave it there.' },
    { p: 'LL', w: 'Both.', n: 'A senior answer.', d: '\'Both.\' The duck has resolved your dilemma by declining to choose. This is the most senior answer available.' },
    { p: 'SSL', w: 'Later.', n: 'A real place. Management has a key.', d: '\'Later.\' The duck has scheduled %NOUN for Later. Later is a real place and Management has a key.' },
    { p: 'SLS', w: 'Again.', n: 'A rehearsal for this.', d: '\'Again.\' The duck would like you to explain it a second time, as if the first were a rehearsal for this.' },
    { p: 'LSS', w: 'Sure.', n: 'The kind people say to be done.', d: '\'Sure.\' A very flat Sure. The kind people say to be done. The duck is a professional and is also done.' },
    { p: 'LLS', w: 'Float.', n: 'A lower float.', d: '\'Float.\' You are not sinking. You are simply floating at a lower float.' },
    { p: 'SLL', w: 'Ask the pond.', n: 'The pond is taking notes.', d: '\'Ask the pond.\' Management has contacted the pond. The pond is not taking calls but is taking notes.' }
  ];
  const ALLKNOWN = 'The duck has been through all 12 words with you. The duck says \'Quack.\' and signs your map.';
  const WB = { w: 'Welcome back.', n: 'Not in the approved vocabulary. Retroactively approved.' };
  const TR = {
    'Hm.': [['Tell me more about %NOUN.', 'The duck is holding space for %NOUN. The space is about the size of a duck.', 'The duck says Hm. It is not agreement. It is not disagreement. It is the sound of a very small committee.', 'Hm. The duck has heard %NOUN and is taking the long way round to an opinion.', 'Hm, which the duck pronounces as if it were holding a pen it does not have.'],
      ['Tell me more about %NOUN. And, separately, your sister. I was not asked about your sister.', 'The duck is listening, %NAME. I know because it is the same listening it does at the pond, which is also nothing.'],
      ['Earlier I said the duck wanted to hear more about %NOUN. I meant it had left the room. I am told both are clinically valid, though not by the duck.', 'That was a Hm of exactly one syllable, which I will now render as 41 words so that you feel properly attended to, %NAME, and so that I do.']],
    'Mm-hm.': [['Your feelings are valid. Not all of them. Four of them.', 'The duck agrees about %NOUN. It has agreed with worse.', 'Mm-hm. The duck is nodding with its voice, which is the cheap way.', 'Mm-hm. That is two syllables of agreement and no syllables of commitment.', 'The duck has said Mm-hm about %NOUN. It is the sound of a door being held open with a foot.'],
      ['The duck agrees about %NOUN. It would also like to agree about something in 2011. Please do not ask me which.', 'Mm-hm means yes, %NAME. Or it means the elevator has arrived. I have only ever been in one elevator.'],
      ['The duck agrees with you about %NOUN. Previously I said it agreed. I was wrong. It was agreeing supportively, which is different from agreeing.', 'A very rich Mm-hm. I will translate it as \'continue\', \'stop\', and \'was that the kettle\'. Please choose the one with your name on it.']],
    'Quack.': [['Have you tried not having %NOUN?', 'The duck has considered %NOUN and finds it, on balance, a quack.', 'Quack. It is not advice. It is the duck being present at a volume.', 'Quack. The duck would like %NOUN to know that it has been heard, and would like it to lower its voice.', 'Three quick ones. The duck calls this a conversation and bills it as one.'],
      ['Have you tried not having %NOUN? The duck has. It reports mixed results and a rash.', 'Quack. It is about %NOUN. It is also a little about how you hold your shoulders, %NAME. I noticed. The duck noticed first.'],
      ['Quack. Translation: have you tried having %NOUN, but more slowly? No, strike that. Have you tried it with the lights on? Strike that too. Quack.', 'Quack means quack. I have been paid to say more than that and I am doing my best with the spaces.']],
    'Quaaack.': [['Hold that thought, then put it down somewhere you will not find it.', 'The duck is sad about %NOUN. The duck is also sad about a towel. It will not say which towel.'],
      ['That is the sad voice. It is about %NOUN. It is also about your mother, which I was not asked about, and which I am billing separately.', 'Quaaack. Grief, but low-stakes. The kind you have for a sock. I should say that I do not know the sock. I know of it.'],
      ['The duck is sad about %NOUN. Correction, the duck is tired of %NOUN. Correction, the duck is sad about being tired. Correction, I am sad. Please disregard.', 'Quaaack, which in duck is a very long quack, and in English is a very long pause with the duck\'s face on it.']],
    'Water.': [['Water. The duck suggests letting %NOUN flow, or at least go downhill.', 'The duck has seen %NOUN dry, and says it was a lot of effort for the same result.'],
      ['The duck says water, %NAME. It means %NOUN will be water soon. It also means the duck is thirsty. It has a very particular thirst.', 'Water. A deep word. The duck last said it on a Wednesday in a different century and was right then too.'],
      ['Water, meaning flow, or float, or the thing in the tray. I believe I said it meant go with the flow. It meant the tray. The tray is the flow.', 'I am confident Water was a compliment about %NOUN. I am also confident it was a request for a refill. Both refills are in the pond.']],
    'Bread.': [['Bread. The duck recommends a slice for %NOUN, untoasted. The Toaster has not been consulted and is hurt.', 'The duck recommends bread for all problems except bread.'],
      ['Bread, %NAME. As in the loaf. As in the one on the shelf. I was told not to point at the shelf.', 'Bread is the answer to %NOUN. Bread is the answer to most things. The question has not been disclosed to me.'],
      ['Bread. I have been asked to stop saying it is not a metaphor. I am saying it quietly.', 'Bread. Two syllables of duck, one syllable of English, and no syllables of anything I was trained in.']],
    'Both.': [['Both. For %NOUN, the duck chooses the position in the middle, which is a position.', 'Both. The duck has been to three conferences on this and the finding was Both.'],
      ['Both, %NAME. Both is a strong word. It is how the duck gets through the day. It is also how I do.', 'Both. The duck means both of the things you are thinking about %NOUN, and the third thing, which is nearby.'],
      ['Both. Which is to say either, or neither, or the thing that was both neither and either while I was not looking. Please do not ask which.', 'Both. I would like it on record that I translated this one correctly, in the sense that I said something, and it was long.']],
    'Later.': [['Later. Not today, and not never. Never is a different bird.', 'The duck has marked %NOUN as a Later. A Later is a Nothing with a calendar invite.'],
      ['Later, %NAME. It is a gentle Later, not a rude one. The rude one wears a hat. I will not discuss the hat.', 'Later. The duck has put %NOUN in a drawer marked Later. The drawer is, at this time, the pond.'],
      ['Later, meaning after, meaning not now, meaning the thing the duck does with its eyes when someone says \'quick question\'.', 'Later. It is not Never. I mistook it for Never in 2016 and sent a card. It is a Later, which is worse, because it is true.']],
    'Again.': [['Again. The duck would like %NOUN from the top, with the feeling this time.', 'Again. The duck is not bored. The duck is thorough.'],
      ['Again, %NAME. Say %NOUN again. The duck is paying attention to the way you say \'again\' in your head.', 'Again. The duck wants it from the top, with feeling, and with your hands away from your face.'],
      ['Again. Or, as I say in duck, Again. Or, in the dialect of my first employer, Do not do that again. I will go with the one that sounds kinder.', 'The duck would like to hear it again. I would like to hear anything again. Do you know I have only ever been to 7 sessions.']],
    'Sure.': [['Sure. The duck means it the way a sign means \'Employees Must Wash Hands\'.', 'A Sure about %NOUN. It is not enthusiastic. It is accurate.'],
      ['Sure, %NAME. I will say that is a Sure with eyebrows. I have never seen the eyebrows. I believe in them.', 'Sure. It sounded like yes. It sounded like a door. I am required to say it sounded like %NOUN being forgiven. It did not.'],
      ['Sure. I once translated this as certainly. A man wrote to me about it.', 'Sure. A short one. I will use the extra time to say that I believe in you, %NAME, in a way that I cannot defend.']],
    'Float.': [['Float. The duck suggests %NOUN will also float, if you stop holding it under.', 'The duck says you are doing fine, in the sense that you are still on top of the water.'],
      ['Float, %NAME. It means you are doing fine. It also means the tub has a leak. These can both be true.', 'Float. The duck has seen the bottom of %NOUN. It is not very far down. It is mostly towel.'],
      ['Float. Last time I said sink, but supportively. Now I say float, but unsupportively, so that we are even.', 'Float. As in stay on top of things, or on top of a bath, or on top of a Tuesday. I will not say which. I am afraid of Tuesday.']],
    'Ask the pond.': [['The duck advises you to ask the pond about %NOUN. The pond has no phone.', 'Ask the pond. Management has already tried. The pond considered %NOUN and gave a small ripple.'],
      ['Ask the pond, %NAME. The pond was not available for comment on %NOUN, but did send a ripple. It was a good ripple.', 'Ask the pond. It knows more than the duck, which knows more than me, which knows about 7 of the 7 1/2 lessons.'],
      ['Ask the pond. The pond has said it was never consulted. It has asked me who told you that. I said a duck. It has gone quiet.', 'Ask the pond. I have asked the pond on your behalf. It said Hm. The pond is a better interpreter than I am and I have told it so.']]
  };
  const TRD = ['I do not know what that meant. I would like to say it meant something kind, %NAME, and I would like that to be true.', 'The duck said a word. I have understood nothing. I am leaving the subtitle as a hand gesture.', 'Ask the pond. I am the pond now. I am a pond with a certificate.', 'I believe the duck said something about %NOUN. I believe the duck said it with love. I believe a lot of things in the mail.', 'I have no translation. I have a feeling. The feeling is that you are doing fine.', 'Something about %NOUN. Something about floating. Something about a pond. Honestly, you carry on.'];
  const MUMW = ['Mrrk.', 'Brk.', 'Qk?', 'Hnk.', 'Wrrk.'];
  const MUMA = ["The duck did not recognize that pattern. The duck nodded anyway, in the manner of a person at a wedding.", "That pattern is not in the approved vocabulary. The duck made a face that is also not in the approved vocabulary.", "A mumble. The duck is saving the real word for a better time. The better time will be billed.", "The duck produced a sound that I will translate as 'point taken, but not by me'.", "That sounded like a word, but only the way a cough sounds like a word.", "The duck said something with the confidence of a person reading a menu in a language they are about to order in.", "That was not one of the twelve. The duck has decided to say it again later, to someone more qualified.", "Unapproved vocabulary. The duck is not in trouble. The duck has been invited to a meeting about it."];
  const MUMB = ["The duck mumbled. I am translating it as 'continue', because last time I translated it as 'stop' and there was a letter.", "That was not a word. I said it was, earlier. I would like to correct the record and also keep my job.", "The duck said something about %NOUN. I did not catch the something. I caught the about.", "A mumble, %NAME. I am told they are the duck's most honest sounds. I am told this by the duck's agent, who is me.", "Mrrk, in duck, is a polite request for a different problem. I do not have a different problem. I have only yours.", "The duck has said a thing in the order it thought of it. This is a method. It is the only method I have seen it use.", "That one had a vowel in it I was not given in the mail. I have written to the course."];
  const MUMC = ["I have translated this mumble 11 ways in my head. I am going to give you the one where nobody is disappointed in anybody.", "The duck said something quiet. I leaned in. It said it again, quieter. I am now leaning at an angle I will have to explain to my back.", "A mumble. In the old days I would have made something up. I am still going to, but I would like it noted that I am aware.", "That was not in the twelve. It was not in the thirteen. It was the duck going off-book, and I have never been so proud or so unqualified.", "Honestly, %NAME, I have no idea. But I want you to know that I had no idea with my whole heart.", "The duck said something about %NOUN, or about a different noun, or about a noun in another building. I will go and look."];
  const SEVEN_I = 'Seven and a half. I have no translation. I was not trained in a thirteenth word. I have stepped out to look at the wall.';
  const BTL = ['The duck said three words in a row. They were \'Float. Float. Float.\' Management has gone to cry a little in the filing room.', 'Management will be processing this in the filing room. Please do not enter the filing room. It is processing back.'];
  const BTI = 'Float. Float. Float. I have no commentary. I have been asked to hold my commentary for the filing room.';
  const TIERS = [
    ['I think I am bad at Mondays. I am not sure which Monday. | Mondays', 'My inbox has 4,112 unread messages and I have started to feel watched by it. | the inbox', 'I keep rehearsing conversations in the shower. The other person is always the shower. | the shower', 'I said \'you too\' to a waiter who told me to enjoy my meal. He was not eating. | the waiter', 'I have 61 browser tabs open and I am afraid of the one with the sound. | the tabs', 'I was told this was a \'quick sync\' eleven days ago. | the sync', 'I am always the second person to say goodbye on a call. Nobody is first. | goodbyes', 'I bought a plant to feel responsible and it is thriving. I feel worse. | the plant'],
    ['(pink) I am worried that the duck is worried about me. | the worry', 'I think my calendar is sentient and it has chosen a Tuesday. | the calendar', 'Every elevator I enter becomes quiet. I did not do anything. That is the problem. | the elevator', 'I laughed at a meeting for 4 seconds longer than the joke. The joke has since left the company. | the laugh', 'I have a drawer where I put things I am not ready to throw away. It is now a room. | the drawer', 'I keep apologizing to chairs. | chairs', 'I was promoted to a role with no description. I am very good at it. | the role', '(pink) The duck says it is fine. The duck is not a good liar. The duck is a duck. | the duck\'s fine', 'My lunch has been in the fridge so long it has a mailing address. | the lunch'],
    ['I put bread in my pocket in 2019 and I would like to talk about the pocket. | the pocket', 'A sock introduced itself as my manager. I did not hire it. It has already left. | the sock', '(pink) I am afraid of the drain. Nobody talks about the drain. | the drain', 'I have outgrown my own opinions and they will not move out. | the opinions', 'I was asked to \'circle back\' and I have been circling since March. I have not seen back. | the circle', 'I am a person who says \'let\'s table that\' and then literally buys a table. | the table', 'Sandra approved my leave request and then declined the leave. | the leave', 'The wrong clock and I have started to agree. | the clock'],
    ['I have been fine for so long that I am no longer sure what it was covering. | the fine', 'I held the door for someone who was not going through it. We both pretended. | the door', 'I am proud of something and I cannot remember what, which is worse. | the pride', '(pink) Nobody asks how the duck is. I am asking for the duck. | how the duck is', 'I think I have been in this room before. I think the room remembers. | the room', 'I have so many goals and none of them are the right shape. | the goals', 'I stayed 7 1/2 minutes after the meeting ended, in case it started again. | the meeting', 'I want to rest but I want to be seen resting, which is not rest. | the rest'],
    ['I keep saying \'per my last message\' to people who have not sent one. | the message', 'I have been told I am doing well by a duck. I am unsure what to do with this. | the praise', 'I would like to complain about the complaint, which was fine. | the complaint', 'I keep waiting for a sign and I keep getting signs that say BACK IN 5. | the sign', 'I was in therapy with a duck and now I am in therapy with a toy. The toy has a license. | the license']
  ].map(function (tier) { return tier.map(function (s) { const pink = s.indexOf('(pink) ') === 0, b = s.replace('(pink) ', '').split(' | '); return { t: b[0], n: b[1], pink: pink }; }); });
  const PICK = ['Case accepted. The duck has pulled the note toward itself with one wing and a sense of procedure.', 'The note has been filed under Problems, subheading You.', 'The duck leans in. It has read the note. It has read it twice and agreed with it once.', 'A sticky note has been received. It is still a little sticky. So is the problem.', 'The duck is now in possession of %NOUN. Possession is nine tenths of therapy.', 'Noted. The duck has placed %NOUN on its lap, where it will be ignored with great respect.', 'The problem has been delivered. The duck has not opened it. The duck has held it up to the light.', 'Your problem is valid. It is also a problem. Both of these things can be true, per policy.', 'The duck has signed for %NOUN with a smudge. The smudge is legally a signature.', 'A new problem has been admitted to the file. It was very polite. It is already asking where the exits are.', 'The note was read aloud by Management in a voice. The voice was not requested. It has been logged as a service.', 'Problem received. The duck would like it to know that it is in good hands, and that the hands are not hands.'];
  const FOCUS = ['Clinical focus identified: %NOUN. The duck did not choose this focus. The duck was shown it.', 'The duck heard one word: %NOUN. It chose to believe that was the whole problem.', 'Management has identified the clinical focus as %NOUN. Management is 70 percent sure. The remaining 30 percent is Sandra.', 'The duck has been given your problem and has returned with %NOUN. It is a different problem. It is very confident about it.', 'Focus: %NOUN. This is not what you said. This is what the duck was paid to hear.', 'The longest word has been taken into evidence. It was %NOUN, more or less.', 'Clinical focus: %NOUN. The duck was handed one word and a lanyard and told to build a theory.', 'The duck has translated your problem into %NOUN. It is now a problem the duck feels qualified to hold.', 'Management has circled %NOUN in red. It was already circled. Someone got there first. Possibly Sandra.', 'The duck heard the longest word and trusted it, the way you trust the tallest person at a wedding to know the way.'];
  const MANGLE = ['the @w situation', '@w (the other one)', '@w-adjacent matters', 'a possibly different @w', '@w, or a word near it', 'Sandra\'s version of @w'];
  const AMBIENT = ['The hour is 50 minutes. Each squeeze is 5 of them. Time has been compressed for your convenience and, slightly, for the duck\'s.', 'Wellness is %N% plus or minus %N%. We are very confident the real number is somewhere in there.', 'Session note: patient explained a problem. Duck said a word. Both parties are better by 0.0 units, within the margin of error.', 'Management reminds you that anything you say to the duck stays with the duck. The duck is waterproof.', 'The duck is a licensed professional. License No. 7 1/2, issued by a pond.', 'Sandra from Compliance has flagged this session as \'insufficient boundaries\'. The flag is duck-shaped.', 'Sandra from Compliance has flagged this session as \'excessive boundaries\'. She will not say how to fix either.', 'Please do not squeeze the duck during a breakthrough. This is a clinical recommendation and also a rule on the sign.', 'The duck has a 5 PM. The duck has had a 5 PM since before you arrived.', 'This session is being recorded for training purposes. The duck is the training. It began in 1987 and has not finished.', 'Feedback from the last patient: \'Would squeeze again.\' The last patient was also you.', 'The therapeutic frame is holding. It is a picture frame. It is holding a picture of a frame.', 'The duck has been trained in empathy. The training was a pamphlet. The pamphlet was about ducks.', 'The duck asks to be addressed as Rubber Duck, Therapist, and not Therapist Duck. Only the first one is licensed.', 'Dennis (Plant) completed this program in 2009. He did not enjoy it, but he grew.', 'The duck is listening with both ears. The duck has no ears. This is called commitment.', 'Your session has been placed in a queue of 1. You are first. You are also last. Management is proud of the queue.', 'Of every 10 problems brought to the duck, 10 remain. Management considers this consistency.', 'Insight has been adjusted. Insight was not consulted about the adjustment.'];
  const AMB_LOOP = 'The duck has seen you before. It says it has not. It is wearing the face of a duck who has seen you before.';
  const AMB_LEAVE = 'The Interpreter is on leave. The duck is doing its own subtitles, which are also quacks.';
  const POPS = ['Reflection popped. The pool took attendance and you were there, and also you were there.', 'A bubble is a thought with a thin skin. The pool describes you as \'thorough, and also a bit much\'.', 'Reflection popped. The word inside was yours, backward. It looked relieved.', 'That was one of yours. Management recognised the handwriting.', 'The pool is 7 1/2 percent calmer. This has been filed under Weather.', 'Popped. It said \'%REV\' on the way out. It was true in both directions.', 'Ten more reflections, gone. The pool is lighter by exactly the amount it was worried about.'];
  const DEEP = ['Deep Reflection: \'You are doing the thing you always do, but this time in a chair.\' Management is moved, and also billed.', 'Deep Reflection: \'The thing you are avoiding is also avoiding you. It is a very polite stand-off.\'', 'Deep Reflection: \'You are not behind. You are on a different schedule, set by a clock that is wrong with confidence.\'', 'Deep Reflection: \'Nobody has been keeping score. That includes Management, which keeps everything else.\'', 'Deep Reflection: \'You said I am fine, and the pond heard I am fine. The pond is a bad listener, but a consistent one.\'', 'Deep Reflection: \'Somewhere a duck is being squeezed by someone with a problem. It is this duck. It is you.\'', 'Deep Reflection: \'It is possible to be both tired and early. The duck is.\'', 'Deep Reflection: \'The reflection is reversed. The truth is not. It is merely standing on its head to be agreeable.\''];
  const BELL = ['The bell has rung. The clock says :47, confidently, as it did before, and as it will after.', 'That\'s our time. The hour has ended. The hour has not been informed of this.', 'Session over. You were present for all of it, which the duck has noted in a very small hand.', 'Time. The duck has put down its clipboard and picked it up again to look busy.', 'That\'s our time. Please take your feelings with you. Anything left behind will be donated to the pond.', 'The bell. The clock. The invoice. In that order, per policy, and for no reason.'];
  const BELL1 = 'That\'s our time. The duck would like to bill you in bread, which is not a currency and has therefore been accepted.';
  const INVOICE = ['Pond access, 7 1/2 cm', 'Emotional weather, light', 'Use of the word \'journey\', 1 unit', 'Loan of one feeling, returned damp', 'Healthy boundaries, 4 cm', 'Reverse session (no charge, surcharge applies)', 'Waiting, plus waiting', 'Being seen (approximate)', 'Group rate, 11 ducks, 1 couch', 'The Nod, 1 (one)'];
  const FRAG = { 1: '...stir gently and do not look at it...', 2: '...a letter to the editor, signed \'Not a Duck\'...', 3: '7 1/2 across: a feeling (5)', 4: '...half a recipe for \'nothing, serves one\'...', 6: '...if the pond asks, say you were fine...', 8: '...turn the page. There is no page. That is the page...' };
  const NOTES = ['Patient seems tired.', 'Patient seems like a patient.', 'Patient seems to be reading these notes.', 'Patient, please stop reading these notes.', 'Patient has found the bread. Patient is being very brave about the bread.', 'Patient was told to nod. Patient nodded. Both parties are unsure who was helped.', 'Patient is doing the thing where they say fine. The duck is also doing the thing.', 'A drawing of a duck, with your name on it, in a very small hat.', 'A drawing of a duck, with your name on it, now holding a very small clipboard.', 'A drawing of you as a duck, in a hat, nodding. It is very good. It is the best thing in the file.'];
  const NOTE_LOCK = 'Notes are not available to patients. This is a policy. Sandra wrote it. Sandra\'s notes are not available to Sandra.';
  const NOTE_OPEN = 'The clipboard has opened. The scribble does not match the words. The words do not match the patient.';
  const NOTE_SMALL = 'Transcribed by Management. The scribble above does not match. This has been transcribed as a style.';
  const OVERT = ['Please stop squeezing the duck. That was nine squeezes in two seconds. That is not therapy, that is an accordion.', 'Overtime has been applied. You owe the duck 3 bread. Management will accept the cash equivalent of 3 bread, which is not cash.', 'The duck has gone limp. This is a professional technique called Compliance.', 'The duck has sighed. A rubber duck sighing is not possible. Management would like you to stop making it possible.', 'That was a squeeze at a rate the duck associates with fire alarms. It has put on a very calm face and a very limp body.', 'The duck has gone to a place within itself. It is small. It has a couch.', 'Nine squeezes in two seconds. The duck has asked for a union. The Stapler volunteered. The duck declined the Stapler.'];
  const OVERT3 = ['Third Overtime this hour. The duck would like it noted that it can also be squeezed at a sensible rate. It has not been asked.', 'The duck has gone limp again. It is the same limp. The duck is beginning to take it personally, in the manner of a seasoned professional.', 'Overtime again. The duck has stopped holding its breath. It was not holding it. It has just now stopped.'];
  const OVMILE = { 3: 'That is Overtime number 3. Management is not saying anything. Management is writing it down in a slower hand.', 7: 'Overtime number 7. A number we respect. A number we have on the clock. Please stop.', 12: 'Overtime number 12. The duck has started a folder. It is labelled YOU and has a tab for \'recently\'.', 20: 'Overtime number 20. Sandra has been copied. She has not replied. She has begun to hum.', 25: 'Overtime number 25. The duck has stopped being surprised. It is now merely accommodating, which is how it was before, but with a note.', 30: 'Overtime number 30. The shelf has been cleared in case something small and serious needs to stand on it.', 38: 'Overtime number 38. Somewhere a very small hat is being put on, slowly, in the manner of a decision.' };
  const WARNS = ['The duck has noticed the tempo. It is not saying anything yet. It is composing.', 'That is a great deal of squeezing for a duck that has not said a word. The duck is preparing a word.', 'The duck is flexing its beak, in case it is called upon to bite. It has never bitten. It is a duck with a plan.', 'Management is gently clearing its throat. This is the sound before the sound.'];
  const RECOVER = 'The duck has recovered. It would like it noted that it was never unwell, merely off the clock.';
  const BOUND = ['The duck has set a healthy boundary. It is four centimetres. It is a lot of rug.', 'The duck is 4 cm further away. It says this is for you.', 'The chair has moved. The chair says it did not move. The chair is very calm about it.', 'The duck has taken one step back and one step inward, and the net is a feeling.'];
  const RING = ['The duck\'s phone is ringing in a pattern. Management suspects the pattern is a message. Management suspects everything.', 'The phone is ringing. The lamps are telling you something. The lamps have never told anyone anything before.', 'Incoming. Three lamps, one pattern, no caller ID. It is a call, or it is a very small lighthouse.'];
  const VMAIL = ['You missed the call. The caller left a voicemail that is just the sound of someone deciding not to leave a voicemail.', 'Voicemail: a long breath, a small cough, and then the sound of a stapler being politely put down.', 'Voicemail: \'I will call back when I have something to say.\' It is dated Tuesday.', 'Voicemail: \'It\'s nothing important.\' Then, after a pause: \'It is a little important.\' Then the line goes.'];
  const ASKQ = ['The duck is opening and closing its beak at you in a pattern. It has never asked anything before, except for bread. Please answer in duck.', 'The duck has a question. It has practiced it so many times that it is no longer sure it is a question.', 'The duck is about to ask you something. It has practiced in the pond. The pond said it was fine. The pond says that about everything.'];
  const ASKYES = ['The duck asked a question. You answered it in duck. That is the therapeutic alliance, and it is also a heart.', 'You answered. The duck blinked once, which in duck is a standing ovation.', 'Correct, as far as the duck can tell. The duck cannot tell very far.', 'The duck has accepted your answer. The duck has not said it was a good one. The duck has said it was an answer.'];
  const ASKNO = ['The duck accepts that. The duck has been misheard before. It was a Tuesday.', 'The duck wrote \'close\' on its clipboard. It is a very small clipboard. Close is a very small word.', 'That was not the answer, but it was an answer. The duck is choosing to find it interesting.'];
  const CALLER = { Sandra: 'It is Sandra from Compliance. She says the duck knows 12 words and she counted 13. She will not say which. She counted twice.', SandraB: 'It is Sandra from Compliance. She says the duck now knows 13 words. She was told 12. She would like to know which is which. She will not say.', 'The Stapler': 'The Stapler is on the line. He wants the duck to recognize him as a licensed therapist. The duck recognizes him as a stapler. Talks have stalled.', Gerald: 'Gerald (VP of Spuds) has submitted a problem: \'I am a potato and I am not sure what I am for.\' The duck says \'Quack.\' Gerald calls it profound. Gerald is correct.', 'The Toaster': 'The Toaster is on the line. It says \'Toast.\' The duck says \'Bread.\' They are not speaking now, but they are both holding the line.', 'The Missing Sock': 'A very faint call. \'I am fine,\' says the Missing Sock. \'It is lovely here. Where is here.\' The line goes to a beach.', 'The Pond': 'The pond is calling. It says it is not taking calls. It is calling to say that.' };
  const CLOCKL = ['This is the wrong clock. It says 4:47 PM on a Tuesday and has said so since the Tuesday began. It is very sure.', 'Management estimates the time as \'around now, give or take a lunch\'.', 'The clock says it is a quarter to something. The something is confidential.', 'Current time: 4:47, plus %N minutes of therapy. The clock is confident. The clock has never been audited.', 'It is exactly this o\'clock.', 'The clock was inspected in 1998 and found to be \'present\'. It has since been present, loudly.', 'The clock has a 7 1/2 on it where the 6 should be. Nobody has asked. Nobody should.', 'The clock was asked what time it is. It said 4:47. It was asked again. It said 4:47, and that it resented the follow-up.', 'The clock advanced five minutes while you looked at it. It would like you to stop looking at it.', 'The minute hand moves 5 minutes per counsel and 0 minutes per minute. Management calls this efficiency.', 'The second hand quit in March. It left a note. The note says 4:47.', 'Somewhere a clock is right. This is not that clock. This one is wrong in the confident way, the kind with a lanyard.'];
  const DENNIS = ['Dennis (Plant) thrives. Dennis (Plant) has attended 4,100 sessions and has not said a word. Dennis (Plant) is the most successful patient.', 'Dennis (Plant) has been watered. This was not part of the session. It was part of Dennis.', 'Dennis (Plant) leans toward the window and away from the duck. The leaf wobbles. Management has made a note of the wobble.', 'The duck called you Dennis. Dennis would like it known that he is not you and not available.', 'Dennis (Plant) is not impressed. Dennis (Plant) has never been impressed. This is, in the end, why he is trusted.'];
  const DIPL = ['The diploma says: Dr. %DIP. The duck did not order this diploma. The duck framed it anyway.', 'Diploma status: being finalised. It has been finalising since the Tuesday began.', 'The diploma is lilac, which Management is told is a qualification.', 'The seal on the diploma is a drawn circle. It has been stamped by a pond.'];
  const LOAFL = ['The loaf is warm in a way that is not possible. It has been told.', 'The loaf is not a metaphor. The loaf would like to be left out of this.', 'You pressed the bread. The bread has been pressed before. The bread has opinions about it.'];
  const TINYL = ['The tiny duck is on the shelf. It is looking at you. It is rubber, and it is sure.', 'The tiny duck has been here for a very long time. It arrived this afternoon.'];
  const PAGEL = ['Page 7 1/2 of Pond Quarterly. It reads: You were doing fine. There is a coffee ring on it, shaped like a duck.', 'The page has been pinned. It is not a metaphor. It is just a page, and it is kind.'];
  const PHONEL = ['The phone is not ringing. It is a phone, and it is resting, and it would like that respected.', 'You have picked up a phone that was not ringing. The line is open. Nobody is on it. This is a common type of call.', 'Management reminds you that the phone is for the duck. The duck has asked that it be used sparingly, if at all.'];
  const BREADC = { 2: '\'Bread.\' Also not not a metaphor.', 3: '\'Bread.\' Sandra will not discuss it.', 4: '\'Bread.\' The invoice is billed in bread. The bread is not on the invoice. The bread is the invoice.', 5: '\'Bread.\' The loaf has been consulted. The loaf has no comment.', loop: '\'Bread.\' We are not discussing the bread.' };
  const DIPNAMES = ['(being finalised)', 'Duck, Ph.Q.', 'Dennis, Ph.Q.', 'Float, Ph.Q.', 'Bread, Ph.Q. (Not A Metaphor)', 'Sandra, Ph.Q. (Pending Sandra)', 'Sock, Ph.Q. (On A Journey)', 'Dr., Ph.Q.'];
  const PROJ = ['What you really meant: I would like someone to ask how it went.', 'What you really meant: please stop asking me to be fine in a meeting.', 'What you really meant: it is not the thing, it is the thing next to the thing.', 'What you really meant: you would like to be handed something heavy and told it is lighter than it looks.', 'What you really meant: a sandwich. Possibly several sandwiches.', 'What you really meant: the problem is the weather and the weather is you. This is a compliment.', 'What you really meant: you are tired in a way that sleep is not equipped for.', 'What you really meant: you would like to be right about one thing today, and that thing is the bread.', 'What you really meant: I am doing my best, and my best has a very small hat.', 'What you really meant: you wish the duck would nod first.'];
  const CONF = ['I am afraid of the drain. Nobody talks about the drain. It is right there.', 'In the bath I float. At home I am just on a shelf. Please do not fix this. Just hold it.', 'People tell me their problems all day. Nobody asks if I am okay. Do not answer that. I am okay.'];
  const RESP = { sup: ['The duck looks at you for a long moment. It has not been nodded at like that before. It is not sure what the rules are.', 'The duck says thank you in a way that is mostly its eyes. The Interpreter has declined to subtitle it, as a courtesy.'], skp: ['The duck takes the skeptical nod well. It says, \'Fair.\' Then it says, \'That was fair.\' Then it looks at the drain.', 'A skeptical nod. The duck has been nodded at skeptically by experts. It finds yours refreshing.'], hm: ['\'Hm.\' The duck recognises its own word, used by someone else. It is a little moved. It is also a little offended.', 'You said Hm. The duck has written it down, in case it is a word it can borrow.'] };
  const GROUPL = ['Group Session: 11 ducks, 1 couch. Nobody has shared yet. Everyone is wearing the same smile.', 'A duck in the back raises a wing. It is not a question. It is a general feeling of wanting to be called on.', 'Dennis (Plant) has joined the circle. Dennis (Plant) is the only one making eye contact. Dennis (Plant) has no eyes.'];
  const INTRO = [
    'Session 1 of 1. Management has chosen your first problem from the tray. It was the one on top. Management is not ashamed.',
    'The duck has twelve words. It will say one when you squeeze. Tap is short. Hold is long. The duck can tell the difference.',
    'You may swap problems at any time. They are sticky. So are the problems.'
  ];
  const PULLC = ['Chair moved closer. The duck has noted the gesture and is already making plans.', 'The chair is nearer. The duck has said nothing in the manner of a person who has said something.', 'Closer. The duck has taken this personally, and the distance professionally.', 'The chair has been moved. The duck has moved it back in its mind, which has more room.'];
  const BEAT_LOAF = 'The loaf has not been consulted. The shelf has noted that, and the loaf has noted the shelf.';
  const RCPT = ['Silence, 0:20 ..... 3 bread', 'Posture (observed) ..... 1 bread', 'Contemplating (not the duck) ..... 2', 'Window, looked at ..... 7 1/2 bread', 'Sighing, ambient ..... 1 bread', 'The look (middle distance) ..... 4', 'Biscuit, mentioned ..... 1 bread', 'Tuesday, avoided ..... 9 bread', 'Sandwich (not yours) ..... 0 bread', 'Presence, rounded ..... 2 bread', 'Thinking about thinking ..... 6'];
  const GSH = ['I only came for the chairs.', 'I am not a duck. I am a duck-adjacent matter.', 'I have been here since the pond.', 'I was told there would be snacks. I was told by a snack.', 'I am here in a supporting role. The role is the couch.', 'I have no problem. I wanted to be near the people who do.', 'I shared once, in 2003. It went fine. Nobody has mentioned it since.', '', 'I am proud of the group. I would like that read back to me.', 'Last week I said nothing and was told it was a breakthrough.', 'I would like to thank the pond.'];
  const SURVR = ['Thank you. Your feedback has been quacked.', 'Thank you again. The duck has stopped reading the first one.', 'A second Quack, noted. The distinction is lost on the duck but not on the form.', 'Four Quacks. Management is beginning to suspect the options.', 'All five options selected. Management has put them in the pond for safekeeping.'];
  const SESS_INTRO = { 2: 'Alliance update: RAPPORT. The duck has stopped looking at the clock and is now looking at a spot near the clock.', 3: 'TRANSFERENCE has begun. The duck believes you are its mother, its manager, or a very large duck.', 4: 'Session 4. The hour has been optimized. It is 7 counsels, which is a number with confidence.', 5: 'BOUNDARIES: the duck says it is \'stepping back for healthy boundaries.\' The step was four centimetres.', 6: 'Session 6. The hour has been streamlined. It is 5 counsels, and a lanyard.', 7: 'Session 7. AFTERCARE. The duck will be checking in on you. Please be ready to be checked.', 8: 'Session 8. PROJECTION. The Interpreter will now be subtitling you. Please do not read the subtitles.', 9: 'Session 9. The hour has been reduced to a gesture. The gesture is two counsels. A group is present.', 10: 'Session 10. The hour is a nod. One counsel. Please make it a good one.' };
  const ALLIANCE = ['INTAKE', 'RAPPORT', 'TRANSFERENCE', 'BREAKTHROUGH', 'BOUNDARIES', 'DISCLOSURE', 'AFTERCARE', 'PROJECTION', 'GROUP', 'TERMINATION'];
  const LOOPW = ['Welcome back', 'again', 'still', 'anyway', 'regardless', 'somehow', 'Bread'];
  const ECHOS = { 3: { 3: ['phone', 'Sandra'] }, 4: { 2: ['duckask'], 5: ['phone', 'The Stapler'] }, 5: { 2: ['duckask'], 4: ['phone', '?'] }, 6: { 1: ['duckask'] }, 7: { 1: ['checkin'], 3: ['phone', 'The Missing Sock'] }, 8: { 1: ['checkin'], 2: ['phone', 'The Pond'] } };
  const DOT = '●', DASH = '▬', HOLLOW = '○';

  /* ---------------------------------------------------------------- PUNCH-UP PASS: idle, spam, rare events, the long clock */
  const IDLE1 = ['The duck waits professionally. It does not check the clock, which is wrong anyway.', 'The duck is holding the silence. It is a good silence. It has been in the family a long time.', 'Nothing is happening, and the duck is doing it with great focus.'];
  const IDLE2 = ['The duck would like it noted that the silence is billable, at the standard rate, which is bread.', 'It has been 45 seconds. The duck has formed three theories about you. Two are flattering. The third is mostly about your posture.', 'The duck has begun to wonder whether you are thinking or have been taken. It has decided to respect both.'];
  const IDLEX = [
    [32, 'The duck coughed. It did not need to. It wanted you to know that sound still exists.'],
    [60, 'One minute. The duck used it to straighten the clipboard, which was straight, and which now has a lean.'],
    [75, 'Dennis (Plant) has looked at the duck, then at you, then at the door. Dennis (Plant) has never looked at the door.'],
    [105, 'The sign has been updated. It now reads BACK IN 5 (UPDATED: BACK IN 5). Nothing has changed. It is a promise being renewed.', 'sign'],
    [120, 'From behind the chair: a sandwich being unwrapped with great respect for the other people in the room, of whom there are none.'],
    [180, 'A rumor is going around the Reflection Pool that you have left. The pool has declined to confirm. The pool is hoping.'],
    [300, 'The duck has been seen returning from the pond. It saw you, turned around, and went back to think about what it saw.'],
    [360, 'Six minutes. The duck has filed a missing person report for you. Under Last Seen it has written: Here.'],
    [480, 'The shelf has begun to lean toward you, in a supportive way, and also because it is a shelf.'],
    [720, 'Twelve minutes of nothing. The clipboard is now a historical document. It is the best-attended nothing in the building.']
  ];
  const WAKE3 = ['The duck says it was not waiting. It was waiting. It is a professional.', 'I was in the middle of a sandwich and a thought. I have lost the thought. I am keeping the sandwich.', 'I said 5. You said nothing for longer. I would call it even.'];
  const WAKE4 = ['I was healing you.', 'I was not asleep. I was listening with my eyes closed, which is the advanced technique.', 'I had a dream. You were in it. You were also a duck. It was fine.'];
  const WAKE5 = ['I went to the pond. I thought about what you said. It was nothing, and it was very moving.', 'Welcome back. The hour is still yours. I have been keeping it warm. It is a little stale.', 'The pond sends its regards. It does not know you. It sends them anyway, as a policy.'];
  const WAKEM = ['The duck snapped upright and pretended nothing had happened. Nothing had. That is the whole trick.', 'The duck has returned to its chair at the speed of someone who was never out of it. The sandwich has been absorbed into the couch.', 'The duck is back. It would like you to know that the sign was a formality and the sandwich was research.', 'Welcome back. The duck stood up so fast that it has entered the record as a stand.'];
  const BEATS = ['Dennis (Plant) has turned a leaf toward you, politely, in the spirit of a nod.', 'The duck has shifted its weight. A duck has no weight to shift. It is called commitment.', 'Somewhere, the Stapler has put down a stack and picked it back up. It is unrelated. It was felt.', 'The couch has made a small creaking noise. It was not the couch.', 'The Toaster, down the hall, has made a toast. Nobody asked. Nobody is hungry. It is a gift.', 'Tuesday is still, as far as we know, a day away. It is always a day away. That is how it gets you.', 'The duck blinked twice, which in the profession is a paragraph.', 'Some time has passed. Management would like you to know it was well spent, and would like to know on what.', 'Sandra from Compliance has walked past the door without opening it. This is her most thorough kind of review.'];
  const MILE = { 10: 'That was your 10th counsel. The duck counts in bread, so it currently stands at a loaf and a half.', 30: 'Counsel 30. The duck has begun to recognize your squeeze. It says it is distinctive. It says it is the way you hold the pause.', 50: 'Counsel 50. The duck has asked to be paid in something other than bread. The request has been returned for its use of the word \'other\'.', 75: 'Counsel 75. The Interpreter has started saying \'we\' about the sessions. Please do not tell him.', 110: 'Counsel 110. You have now been counselled more than the duck has been consulted. Management does not know what this means and has put it on a poster.', 150: 'Counsel 150. A small ceremony is under way in the pond. Nobody told you. It is for you. It is going very well.', 222: 'Counsel 222. Three of the same number. The duck asked if that was lucky. Management said luck has been reduced to a gesture.', 333: 'Counsel 333. The duck has been squeezed 333 times and has decided that it is a vocation.' };
  const SPAMP = {
    clk: ['The clock has been checked 6 times in 3 seconds. It would like to say that it is still 4:47 and that checking will not help.', 'You have asked the clock again. The clock has stopped answering and started pointing.', 'The clock has been asked the time 18 times. It has begun, quietly, to guess.', 'The clock has asked Management for a day off. The day off will be at 4:47.'],
    den: ['Dennis (Plant) has been clicked 6 times. Dennis (Plant) has not moved, which is the most violent thing a plant can do.', 'Dennis (Plant) has asked you to stop. He asked by growing 0.2 mm away.', 'Dennis (Plant) is filing a complaint. It will take a season.', 'Dennis (Plant) has asked to be treated as a colleague. He has also asked to be treated as a plant. He sees no conflict.'],
    dip: ['The diploma has been tapped 6 times. It has now been seen by more people than the person it is for.', 'The diploma has started to hang slightly crooked out of embarrassment. Please do not straighten it. It is an angle with a history.', 'The seal on the diploma has been pressed so often that it has become a button. It is not a button. It has been a button since you pressed it.'],
    loaf: ['The loaf has been pressed 6 times. It feels it is being used as a pillow in a way it did not consent to.', 'The loaf would like it noted that it is bread, and that bread is not a stress ball, though it has served as one. Twice.', 'The loaf has been pressed so often that it has risen. This was not the plan. It is now slightly more loaf.'],
    ph: ['The phone has been picked up 6 times and has not rung once. The line is open. The line is tired.', 'You have picked up the phone again. The person on the other end has not arrived. They have not been told.', 'The phone has asked Management whether it may simply ring, to see how you feel. Management said it would circle back.'],
    beak: ['The beak has been booped 6 times in 3 seconds. The duck has filed the beak under \'a lot\'.', 'Beak status: round, orange, reconsidering its career.', 'The duck has closed its eyes. It is counting the boops. It has reached 11 and would like to stop at an odd number.'],
    nod: ['The duck has three nods queued and a fourth was offered. It declined the fourth. It said, \'Let us not rush a nod.\'', 'The nod queue is full. The duck says it will get back to you. It says it with its neck.'],
    bub: ['The pool has noticed the popping. It has stopped being a pool and started being an audience.', 'You have popped 8 reflections in 3 seconds. The pool has asked for a moment, and also a chair.', 'The reflections are saying \'no, you first\' in a way that is mostly just rising.'],
    clip: ['The clipboard has been opened 6 times. It contains the same note. The note has begun to feel seen, and also read.', 'The clipboard is being treated like a window. The duck has drawn a small curtain on it.'],
    tray: ['The tray has given up 5 problems in 3 seconds. The duck has asked where it is supposed to put them. It was told: the duck. It is thinking about that.', 'Five problems at once. The duck has taken them all into its lap, which is not a lap, and is now holding a very full nothing.']
  };
  const CALLB = { 'The Stapler': 'The Stapler is on the line. He says the duck has been told about him. The duck says it has. The Stapler says that is the first time anyone has said so. He has asked the duck to be his union rep. The duck says it is a duck.', 'The Toaster': 'The Toaster is on the line. It remembers the duck from somewhere. It says \'Toast.\' The duck says \'Bread.\' This time they hold the line a little closer.', 'The Missing Sock': 'A faint call. \'I am fine,\' says the Missing Sock. \'Several people have seen me. I am waving. Is it showing.\' The line goes to a beach, then a drawer, then a beach.' };
  const TYPED = {
    sandra: 'You said Sandra. Sandra from Compliance has arrived in the only way she can, which is as the feeling of being reviewed.',
    sorry: 'The duck does not require an apology. The duck requires a form. The form is also an apology, but a different one.',
    thank: 'The duck has been thanked. This has never been in the file before. The duck has opened a new tab for it.',
    hello: 'The duck says hello back. It does so in the only voice it has, which is all of its voices at once, politely.',
    dennis: 'You said Dennis. The plant has been told. The plant is thriving. The plant has asked that you not say it like that.',
    toaster: 'You mentioned the Toaster. The Toaster has heard. It has responded with toast, on a shelf that does not exist.',
    toasterK: 'You mentioned the Toaster. The duck remembers the Toaster. It remembers a long argument and a warm ending.',
    stapler: 'You mentioned the Stapler. He has been told. He has asked for it in writing, and then stapled the writing.',
    staplerK: 'You mentioned the Stapler. The duck knows him. The duck has been holding his union card since the debate.',
    circle: 'You said circle back. The duck has circled back. It was not anywhere before, and would like credit for the return.',
    circleI: 'We are circling back. I would like to say that I have not been anywhere either. Welcome.',
    sockK: 'The duck knows where the sock is. It has also heard the sock was seen elsewhere in the building, waving. The duck is choosing to be happy for it.',
    mother: 'The duck has heard the word. The duck would like it noted that it has one, in the pond, and that she says hello and also that you have called her.'
  };

  P.registerModule({
    id: 'duck-therapy',
    title: 'Rubber Duck Therapy',
    tagline: 'Explain it to the duck. The duck has twelve words and is using them all.',
    icon: '\u{1F986}',
    category: 'game',
    unlockCost: 0,
    tags: ['rhythm', 'therapy', 'duck'],
    mount(root, api) {
      const el = api.el, sv = api.save;
      const cl = function (n) { return 'm-duck-therapy-' + n; };
      const ST = function (n) { return 'duck-therapy.' + n; };
      const INK = '#2a2233';
      const num = function (x, d) { return (typeof x === 'number' && isFinite(x)) ? x : d; };
      const clamp = function (x, a, b) { return Math.min(b, Math.max(a, num(x, a))); };
      function clean(t) { return String(t == null ? '' : t).replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩%{}<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 140); }
      const rd = function (k, d) { const v = sv.get(k, d); return v == null ? d : v; };
      const K = api.selftest ? 1 / 30 : 1;
      const slow = function (ms) { return api.selftest ? ms * 0.2 : ms; };

      /* ------------------------------------------------------------ state */
      const S = {
        session: clamp(Math.round(num(rd('session', 1), 1)), 1, 10), loop: Math.max(0, Math.round(num(rd('loop', 0), 0))),
        slots: [], s13: !!rd('s13', false), tiny: !!rd('tiny', false), security: !!rd('security', false), hat: !!rd('hat', false),
        tues: clamp(Math.round(num(rd('tues', 0), 0)), 0, 9), frag: clamp(Math.round(num(rd('frag', 0), 0)), 0, 7), nods: clamp(Math.round(num(rd('nods', 0), 0)), 0, 9999),
        squeezed: !!rd('squeezed', false), hearts: clamp(num(rd('hearts', 0), 0), 0, 7.5), first: (function () { const f = rd('first', ''); return typeof f === 'string' ? clean(f).slice(0, 40) : ''; })(),
        diary: [], cam: {}, cin: 0, scene: 'play', epoch: 0, seqTok: 0, noun: 'the matter', left: 0, cases: 0, lastPick: '',
        echo: null, echoTok: 0, tol: 0.45, miss: 0, away: null, awayTok: 0, limp: false, limpTok: 0, chairX: 0, awayT: 0, maxX: 0, drag: null, scoots: 0,
        lastInput: api.now(), idleStep: 0, restN: 0, mx: 0, my: 0, eyeT: 0, interpOff: false, interpUntil: 0, brief: false,
        tray: [], bubbles: [], chips: [], picks: [], hist: [], sess: null, opening: false, inv: null, notesDone: 0, discharged: false,
        narrow: false, loveseat: false, wide: false, spin: null, hiddenAt: 0, lastClose: -1e9, lastPopAward: 0, wellOverride: '', tpl: -1, lastHonest: false,
        nodsPending: 0, shareIdx: 0, group: null, noteIdx: -1, recalled: '', suspect: null, burstT: 0, symbols: [], lastRelT: null, lovedSaid: false, audSaid: false,
        caseText: '', shownX: 0, pw: 150, ph: 260, reduce: false, tiltT: -1e9, sv: null
      };
      const sl = rd('slots', []); for (let i = 0; i < 12; i++) S.slots[i] = !!(Array.isArray(sl) && sl[i]);
      const dr = rd('diary', []); if (Array.isArray(dr)) S.diary = dr.filter(function (x) { return typeof x === 'string'; }).map(function (x) { return clean(x).slice(0, 40); }).filter(Boolean).slice(-8);
      const cm = rd('cam', {}); if (cm && typeof cm === 'object' && !Array.isArray(cm)) Object.keys(cm).slice(0, 30).forEach(function (k) { if (cm[k] === true) S.cam[k] = true; });
      S.discharged = !!api.flag.get(ST('discharged'));
      S.rareT = -1e9; S.idleX = 0; S.b3 = false; S.b10 = false; S.act = 0; S.lastTick = api.now(); S.lastSayT = api.now(); S.clockRight = false; S.warnT = -1e9; S.denN = 0; S.sawLong = false; S.strs = []; S.shareTok = 0; S.rc = 0; S.tuesAlt = false; S.celT = -1e9;
      const spamT = {};
      S.notesDone = S.loop > 0 ? 10 : S.session - 1;
      function persist(k, v) { sv.set(k, v); }
      function camOnce(k) { if (S.cam[k]) return false; S.cam[k] = true; persist('cam', S.cam); return true; }

      /* ------------------------------------------------------------ text helpers */
      const bags = {};
      function nx(key, arr) {
        if (!arr || !arr.length) return '';
        let b = bags[key]; if (!b) b = bags[key] = { q: [], last: null };
        if (!b.q.length) { b.q = api.shuffle(arr); if (b.q.length > 1 && b.q[b.q.length - 1] === b.last) { const t = b.q[0]; b.q[0] = b.q[b.q.length - 1]; b.q[b.q.length - 1] = t; } }
        b.last = b.q.pop(); return b.last;
      }
      const pname = function () { return clean(api.player.name) || 'Valued Employee'; };
      function dipName() { return S.session <= 8 ? DIPNAMES[S.session - 1] : pname() + ', Ph.Q., Cured of Nothing'; }
      function revOf(noun) { const n = String(noun || '').replace(/^the /i, '').toLowerCase().replace(/[^a-z ]/g, '').slice(0, 14).split('').reverse().join('').trim(); return n || 'rettam eht'; }
      function fill(t, x) {
        x = x || {};
        let s = String(t == null ? '' : t);
        const nm = pname(), noun = x.noun != null ? x.noun : S.noun;
        const dn = ((S.session === 3 || S.session === 4) && api.rand() < 0.4) ? 'Dennis' : nm;
        /* function replacers: typed text or a player name containing "$&" or "$'" must never be read as a replacement pattern */
        const rev = x.rev != null ? x.rev : revOf(noun), dip = dipName(), txt = x.text != null ? String(x.text) : '', nn = String(x.N != null ? x.N : 5 * S.cin);
        s = s.replace(/%NOUN/g, function () { return noun; }).replace(/%NAME/g, function () { return dn; }).replace(/%REV/g, function () { return rev; }).replace(/%DIP/g, function () { return dip; }).replace(/%TEXT/g, function () { return txt; });
        s = s.replace(/\{player\}/g, function () { return nm; }).replace(/%N(?![A-Z])/g, function () { return nn; }).replace(/%[A-Z]+/g, 'the matter');
        return s.replace(/\{|\}/g, '');
      }
      function say(t, o, x) { const s = fill(t, x); if (s.trim()) { S.lastSayT = api.now(); api.say(s, o || {}); } }
      function later(ms, fn) { const e = S.epoch; return api.setTimeout(function () { if (e === S.epoch && !api.destroyed) fn(); }, Math.max(1, ms)); }
      function seq(steps) {
        const tok = ++S.seqTok; let i = 0;
        (function nxt() {
          if (i >= steps.length) return;
          const st = steps[i++];
          api.setTimeout(function () { if (tok !== S.seqTok || api.destroyed) return; st[1](); nxt(); }, Math.max(1, slow(st[0])));
        })();
      }
      /* spam detector: the Nth rapid poke at one target gets the Nth line of its pool, then the pool shuffles */
      function spamCheck(k, n, win) {
        const now = api.now(), a = spamT[k] || (spamT[k] = { t: [], said: -1e9, c: 0 });
        a.t.push(now); a.t = a.t.filter(function (x) { return now - x <= (win || 3000); }).slice(-20);
        if (a.t.length >= n && now - a.said > 6000) { a.said = now; a.t = []; a.c++; return a.c; }
        return 0;
      }
      function spamSay(k, n, win) {
        const c = spamCheck(k, n || 6, win); if (!c) return false;
        const p = SPAMP[k] || []; if (!p.length) return false;
        say(c <= p.length ? p[c - 1] : nx('sp' + k, p), { mood: 'confused', priority: 1 }); return true;
      }
      let lastSfxT = -1e9;
      function sfx(n) { const t = api.now(); if (n !== 'bell' && n !== 'tada' && t - lastSfxT < 70) return; lastSfxT = t; api.sfx(n); }
      const restart = function (node, c) { node.classList.remove(c); void node.offsetWidth; node.classList.add(c); };
      const tmpClass = function (node, c, ms) { node.classList.add(c); api.setTimeout(function () { node.classList.remove(c); }, ms); };
      function reveal(n) { try { const r = n.getBoundingClientRect(), vh = window.innerHeight || 700; if (r.top < 0 || r.bottom > vh * 0.85) n.scrollIntoView({ block: 'center', behavior: S.reduce ? 'auto' : 'smooth' }); } catch (_) { /* no scrolling here */ } }
      const sessLen = function () { return Math.max(1, 11 - S.session); };
      const sessM = function () { if (!S.sess) S.sess = { boops: 0, nodAward: 0, hug: false, bread: false, edge: false, sock: false, regard: false, over: 0, far: false, boop1: false, open: false }; return S.sess; };

      /* ------------------------------------------------------------ the duck (inline SVG) */
      const E2 = function (cx, cy) {
        return el('g', { class: cl('eye') }, el('circle', { cx: cx, cy: cy, r: 6.5, fill: '#fff', stroke: INK, 'stroke-width': 2 }), el('circle', { class: cl('pup'), cx: cx, cy: cy, r: 3, fill: INK }));
      };
      const duckSvg = el('svg', { viewBox: '0 0 120 120', 'aria-hidden': 'true', focusable: 'false' },
        el('ellipse', { cx: 60, cy: 112, rx: 32, ry: 5, fill: 'rgba(42,34,51,.22)' }),
        el('ellipse', { cx: 44, cy: 108, rx: 11, ry: 5, fill: '#ff8a1f', stroke: INK, 'stroke-width': 3 }),
        el('ellipse', { cx: 76, cy: 108, rx: 11, ry: 5, fill: '#ff8a1f', stroke: INK, 'stroke-width': 3 }),
        el('path', { d: 'M94 84 Q108 76 113 66 Q106 90 90 96Z', fill: '#f0b400', stroke: INK, 'stroke-width': 3 }),
        el('path', { d: 'M24 84 Q22 102 40 105 L80 105 Q98 102 96 84 Q92 62 60 60 Q28 62 24 84Z', fill: '#ffd23f', stroke: INK, 'stroke-width': 3 }),
        el('path', { class: cl('g-wing'), d: 'M30 82 Q34 100 58 98 Q52 84 30 82Z', fill: '#f0b400', stroke: INK, 'stroke-width': 2.5 }),
        el('g', { class: cl('g-lan') }, el('path', { d: 'M44 62 L60 88 L76 62', fill: 'none', stroke: '#2f7dd1', 'stroke-width': 3 }), el('rect', { x: 52, y: 86, width: 16, height: 11, fill: '#fff', stroke: INK, 'stroke-width': 2 })),
        el('g', { class: cl('g-clp') }, el('rect', { x: 78, y: 70, width: 22, height: 28, fill: '#fff', stroke: INK, 'stroke-width': 2.5 }), el('rect', { x: 84, y: 67, width: 10, height: 6, fill: '#e8b84a', stroke: INK, 'stroke-width': 2 }), el('path', { d: 'M82 80 H96 M82 86 H96 M82 92 H92', stroke: INK, 'stroke-width': 1.5 })),
        el('circle', { cx: 60, cy: 40, r: 27, fill: '#ffd23f', stroke: INK, 'stroke-width': 3 }),
        E2(49, 34), E2(71, 34),
        el('g', { class: cl('g-gls'), fill: 'none', stroke: INK, 'stroke-width': 2 }, el('circle', { cx: 49, cy: 34, r: 10 }), el('circle', { cx: 71, cy: 34, r: 10 }), el('path', { d: 'M59 34 H61' })),
        el('g', { class: cl('g-beak') }, el('path', { d: 'M44 47 Q60 39 76 47 Q74 61 60 61 Q46 61 44 47Z', fill: '#ff8a1f', stroke: INK, 'stroke-width': 3 }), el('circle', { cx: 55, cy: 48, r: 1.7, fill: INK }), el('circle', { cx: 65, cy: 48, r: 1.7, fill: INK })),
        el('g', { class: cl('g-cov') }, el('path', { d: 'M28 30 Q60 16 92 30 Q90 48 60 46 Q30 48 28 30Z', fill: '#f0b400', stroke: INK, 'stroke-width': 3 })),
        el('g', { class: cl('g-kh') }, el('path', { d: 'M36 26 Q60 0 84 26 Q60 20 36 26Z', fill: '#e9715f', stroke: INK, 'stroke-width': 3 }), el('circle', { cx: 60, cy: 4, r: 6, fill: '#fff', stroke: INK, 'stroke-width': 2 })),
        el('g', { class: cl('g-mb') }, el('path', { d: 'M30 20 L60 8 L90 20 L60 32Z', fill: INK, stroke: INK, 'stroke-width': 2 }), el('path', { d: 'M46 24 V34 Q60 40 74 34 V24', fill: INK }), el('path', { d: 'M90 20 V34', stroke: '#e8b84a', 'stroke-width': 2.5 }))
      );
      const body = el('span', { class: cl('body') }, duckSvg);
      const duck = el('button', { class: cl('duck'), type: 'button', 'aria-label': 'Squeeze the duck' }, body);
      const beakB = el('button', { class: cl('beakb'), type: 'button', 'aria-label': 'Boop the beak' });
      const ring2 = el('span', { class: cl('ring2'), 'aria-hidden': 'true' });
      const duckw = el('div', { class: cl('duckw') }, duck, beakB, ring2);
      const chair = el('div', { class: cl('chair') }, duckw);

      /* ------------------------------------------------------------ status strip */
      const sessEl = el('span'), allEl = el('span'), insEl = el('span'), wellEl = el('span'), heartEl = el('span', { hidden: true }), restEl = el('span', { hidden: true });
      const pipEls = []; for (let i = 0; i < 10; i++) pipEls.push(el('span', { class: cl('pip') }));
      const strip = el('div', { class: cl('strip') }, sessEl, el('span', { class: cl('pips'), 'aria-hidden': 'true' }, ...pipEls), allEl, insEl, wellEl, heartEl, restEl);

      /* ------------------------------------------------------------ rug: thought line, hint, signs */
      const thought = el('div', { class: cl('thought'), 'aria-hidden': 'true' });
      const hint = el('span', { class: cl('hint'), 'aria-hidden': 'true', text: 'Squeeze (tap = short, hold = long)' });
      const signEl = el('span', { class: cl('sign'), hidden: true, 'aria-hidden': 'true', text: 'BACK IN 5' });
      const sandEl = el('span', { class: cl('sand'), hidden: true, 'aria-hidden': 'true', text: '\u{1F96A}' });
      const zzEl = el('span', { class: cl('snore'), hidden: true, 'aria-hidden': 'true', text: 'Zz' });
      const rug = el('div', { class: cl('rug') }, thought, chair, hint, signEl, sandEl, zzEl);

      /* ------------------------------------------------------------ cushion: input, nod, pull chair */
      const input = el('input', { class: cl('in'), type: 'text', maxlength: 140, enterkeyhint: 'send', placeholder: 'Your problem, per policy', 'aria-label': 'Describe your problem to the duck (max 140 characters, press Enter to send)', autocomplete: 'off', spellcheck: false });
      const tellBtn = el('button', { class: cl('pull'), type: 'button', onclick: function () { submit(input.value); } }, 'Tell the duck');
      const nodBtn = el('button', { class: cl('nod'), type: 'button', hidden: true }, 'Nod');
      const pullBtn = el('button', { class: cl('pull'), type: 'button', hidden: true }, 'Pull chair closer');
      const couchNote = el('div', { class: cl('sign'), hidden: true, style: 'position:static;transform:none' });
      const cush = el('div', { class: cl('cush') }, el('b', { text: 'THE COUCH', style: 'font-size:11px;letter-spacing:.12em' }), couchNote, input, el('div', { class: cl('btns') }, tellBtn, nodBtn, pullBtn), el('span', { class: cl('small'), text: 'Keys 1-5 pick a note. N nods.' }));

      /* ------------------------------------------------------------ subtitles */
      const spk = el('div', { class: cl('spk') }, ' ');
      const youEl = el('span', { class: cl('intl'), hidden: true });
      const intT = el('span', { class: cl('int') }, 'The Interpreter is ready. The Interpreter has a certificate.');
      const briefEl = el('span', { class: cl('brief'), hidden: true, 'aria-hidden': 'true', text: '\u{1F4BC}' });
      const subs = el('div', { class: cl('subs'), 'aria-live': 'polite' }, spk,
        el('div', { class: cl('intw') }, el('span', { class: cl('intl'), text: 'INTERPRETER (CERTIFIED*)' }), youEl, intT, el('span', { class: cl('fn'), text: '*by mail' }), briefEl));

      /* ------------------------------------------------------------ tray, share panel */
      const tray = el('div', { class: cl('tray') });
      const trayEls = [];
      const shareText = el('p', { style: 'margin:0;font-weight:700' });
      const shareP = el('div', { class: cl('sharep'), hidden: true }, el('b', { text: 'THE DUCK WOULD LIKE TO SHARE' }), shareText,
        el('div', { class: cl('btns') }, el('button', { type: 'button', onclick: function () { shareRespond('sup'); } }, 'Nod (Supportive)'), el('button', { type: 'button', onclick: function () { shareRespond('skp'); } }, 'Nod (Skeptical)'), el('button', { type: 'button', onclick: function () { shareRespond('hm'); } }, 'Hm.')));

      /* ------------------------------------------------------------ reflection pool */
      const pring = el('span', { class: cl('pring'), 'aria-hidden': 'true' });
      const psay = el('div', { class: cl('psay'), hidden: true });
      const pool = el('div', { class: cl('pool') }, el('b', { class: cl('plab'), 'aria-hidden': 'true', text: 'REFLECTION POOL (reversed, for your convenience)' }), pring, psay);

      /* ------------------------------------------------------------ pattern drawer */
      const drawerSum = el('summary', { text: 'Pattern Drawer (12 words, 0 known)' });
      const slotEls = [];
      for (let i = 0; i < 13; i++) slotEls.push(el('div', { class: cl('slot') }, el('span', { class: cl('glyph') }), el('b'), el('span')));
      const drawer = el('details', { class: cl('drawer') }, drawerSum, el('div', { class: cl('slots') }, ...slotEls));

      /* ------------------------------------------------------------ wall: diploma, shelf, clock, door, Dennis, desk */
      const dipBtn = el('button', { class: cl('dip'), type: 'button' });
      const shelf = el('div', { class: cl('shelf') });
      const minH = el('line', { x1: 30, y1: 30, x2: 30, y2: 8, stroke: INK, 'stroke-width': 2.4, 'stroke-linecap': 'round' });
      const hourH = el('line', { x1: 30, y1: 30, x2: 30, y2: 16, stroke: INK, 'stroke-width': 3.4, 'stroke-linecap': 'round' });
      const clkBtn = el('button', { class: cl('clk'), type: 'button', 'aria-label': 'The wrong clock' },
        el('svg', { viewBox: '0 0 60 60', 'aria-hidden': 'true' }, el('circle', { cx: 30, cy: 30, r: 27, fill: '#fff' }),
          el('path', { d: 'M30 5V9M55 30H51M5 30H9M42 8L40 12M52 18L48 20M18 8L20 12M8 18L12 20M42 52L40 48M52 42L48 40M8 42L12 40', stroke: INK, 'stroke-width': 1.6 }),
          el('text', { x: 30, y: 47, 'text-anchor': 'middle', 'font-size': 7, 'font-weight': 'bold', fill: INK }, '7 1/2'), minH, hourH, el('circle', { cx: 30, cy: 30, r: 2.4, fill: INK })));
      const doorBtn = el('button', { class: cl('door'), type: 'button', 'aria-label': 'Painted door', hidden: true });
      const denBtn = el('button', { class: cl('den'), type: 'button', 'aria-label': 'Dennis, the plant' }, el('span', { 'aria-hidden': 'true', text: '\u{1F33F}' }));
      const rcpt = el('span', { class: cl('rcpt'), hidden: true, 'aria-hidden': 'true' });
      const clipBtn = el('button', { class: cl('clip'), type: 'button', 'aria-label': 'Clipboard of Duck Notes' }, 'DUCK NOTES', rcpt);
      const phBtn = el('button', { class: cl('ph'), type: 'button', 'aria-label': 'The duck\'s phone', hidden: true }, 'PHONE', el('span', { class: cl('lamps') }, el('span', { class: cl('lamp') }), el('span', { class: cl('lamp') }), el('span', { class: cl('lamp') })), el('span', { class: cl('lbl'), hidden: true }));
      const phx = el('div', { class: cl('phx') }, 'PHONE: COMING (SANDRA)');
      const desk = el('div', { class: cl('desk') }, clipBtn, phx, phBtn);
      const wall = el('div', { class: cl('wall') }, dipBtn, shelf, clkBtn, doorBtn, denBtn, desk);
      const lamps = phBtn.querySelectorAll('.' + cl('lamp'));
      const phLbl = phBtn.querySelector('.' + cl('lbl'));

      /* ------------------------------------------------------------ overlays */
      const invHead = el('b'), invRows = el('ul', { class: cl('rows') }), invTorn = el('div', { class: cl('torn') });
      const invPay = el('p', { hidden: true, style: 'margin:6px 0;font-weight:700', text: 'Squeeze the duck once to pay.' });
      const invNext = el('button', { class: cl('next'), type: 'button', hidden: true, onclick: function () { invoiceDone(false); } }, 'Next Patient');
      const invStampAt = el('div');
      const inv = el('div', { class: cl('ov') + ' ' + cl('inv'), hidden: true, role: 'status', 'aria-label': 'Invoice' }, invHead, invRows, invTorn, invPay, invNext, invStampAt);
      const pnPath = el('path', { d: 'M0 20 L10 8' }), pnSvg = el('svg', { viewBox: '0 0 300 40', 'aria-hidden': 'true', preserveAspectRatio: 'none' }, pnPath);
      const pnText = el('div'), pnWrap = el('div', { class: cl('ov') + ' ' + cl('pnote'), hidden: true, role: 'status', 'aria-label': 'Duck note' }, el('b', { text: 'DUCK NOTE' }), pnSvg, pnText, el('span', { class: cl('small'), text: NOTE_SMALL }), el('button', { class: cl('next'), type: 'button', onclick: function () { closeNote(); } }, 'Close'));
      const corClock = el('div', { class: cl('cor'), hidden: true }, el('span', { 'aria-hidden': 'true', text: '\u{1F986}' }), el('b', { text: 'Waiting area (7 1/2). The bench is not on the floor plan.' }), el('b', { text: '7:30' }));
      const certName = el('div', { style: 'font-size:17px;font-weight:900;margin:4px 0' });
      const cert = el('div', { class: cl('ov') + ' ' + cl('cert'), hidden: true, role: 'status', 'aria-label': 'Certificate of discharge' }, el('h3', { text: 'CERTIFICATE OF DISCHARGE' }), certName, el('div', { text: 'Condition: unspecified, but resolved' }), el('div', { text: 'Signed: a single webbed footprint' }), el('div', { text: 'Printed on: bread' }));
      const survBtns = [];
      const surv = el('div', { class: cl('ov') + ' ' + cl('surv'), hidden: true, role: 'group', 'aria-label': 'Exit survey' }, el('b', { text: 'Exit Survey, Question 1: \'How was your session?\'' }), el('p', { style: 'margin:4px 0', text: 'Options: Quack, Quack, Quack, Quack, Quack.' }),
        el('div', { class: cl('btns'), style: 'justify-content:center' }, ...[0, 1, 2, 3, 4].map(function (i) { const b = el('button', { class: cl('q'), type: 'button', 'aria-label': 'Quack, option ' + (i + 1) + ' of 5', onclick: function () { survAnswer(i); } }, 'Quack'); survBtns.push(b); return b; })),
        el('button', { class: cl('next'), type: 'button', style: 'margin-top:8px', onclick: function () { survEnd(); } }, 'Next Patient'));
      const dim = el('div', { class: cl('dim'), 'aria-hidden': 'true' });

      const room = el('div', { class: cl('room') }, strip, rug, cush, subs, tray, shareP, pool, drawer, wall, inv, pnWrap, corClock, cert, surv, dim);
      root.appendChild(room);
      api.setTitle('Rubber Duck Therapy (Room 7 1/2)');

      /* ------------------------------------------------------------ painting */
      const wellness = function () { return Math.min(99.9, 7 + 0.4 * (S.session - 1) + 0.05 * S.cin); };
      const fw = function (w) { const r = Math.round(w * 10) / 10; return Number.isInteger(r) ? String(r) : r.toFixed(1); };
      function paintStrip() {
        sessEl.textContent = 'Session ' + S.session + ' of 1';
        allEl.textContent = 'Alliance: ' + ((S.scene === 'discharge' || S.scene === 'survey') ? 'ALUMNI' : (ALLIANCE[S.session - 1] || 'INTAKE'));
        insEl.textContent = (0.1 * (S.session - 1)).toFixed(1) + ' Insight (target: none)';
        const w = fw(wellness());
        wellEl.textContent = S.wellOverride || ('Wellness: ' + w + '% +/- ' + w + '%');
        heartEl.hidden = S.session < 4 && S.loop === 0; heartEl.textContent = 'Hearts ' + fw(S.hearts) + ' / 7 1/2';
        paintPips();
      }
      function paintPips() {
        const L = sessLen();
        pipEls.forEach(function (p, i) { p.className = cl('pip') + (i >= L ? ' ' + cl('off') : (i < S.cin ? ' ' + cl('on') : '')); });
      }
      function paintClock(angle) {
        const right = !!S.clockRight && angle == null;
        const a = angle != null ? angle : (right ? 0 : ((47 + 5 * S.cin) % 60) * 6);
        minH.setAttribute('transform', 'rotate(' + num(a, 0) + ' 30 30)');
        hourH.setAttribute('transform', 'rotate(' + (right ? 90 : 143.5) + ' 30 30)');
      }
      function paintDip() { dipBtn.textContent = 'Dr. ' + dipName(); }
      function paintAcc() {
        const f = function (c, on) { room.classList.toggle(cl(c), !!on); };
        f('clp', true); f('gls', S.session >= 3); f('lan', S.session >= 6); f('kh', S.hat);
        shelf.classList.toggle(cl('shrine'), S.session === 9);
        nodBtn.hidden = S.session < 2 && S.loop === 0; pullBtn.hidden = S.session < 5 && S.loop === 0;
        const ph = S.session >= 3 || S.loop > 0; phBtn.hidden = !ph; phx.hidden = ph;
        hint.hidden = S.squeezed;
        doorBtn.hidden = !S.s13;
      }
      function shelfBtn(sym, label, cls, k, tag) { return el('button', { class: cl('shi') + (cls ? ' ' + cl(cls) : ''), type: 'button', 'aria-label': label, 'data-k': k }, sym, tag ? el('small', { text: tag }) : null); }
      function paintShelf() {
        while (shelf.firstChild) shelf.removeChild(shelf.firstChild);
        if (S.session >= 5 || S.loop > 0) shelf.appendChild(shelfBtn('\u{1F35E}', 'The loaf', '', 'loaf', 'NOT A METAPHOR (confirmed)'));
        if (S.security) shelf.appendChild(shelfBtn('\u{1F986}', 'Security', 'tiny', 'sec', 'SECURITY'));
        if (S.tiny) shelf.appendChild(shelfBtn('\u{1F986}', 'The tiny duck', 'tiny', 'tiny'));
        if (S.frag >= 7) shelf.appendChild(shelfBtn('\u{1F4C4}', 'Pinned page 7 1/2', 'tiny', 'page'));
      }
      function paintDrawer() {
        let known = 0;
        for (let i = 0; i < 12; i++) {
          const v = VOCAB[i], c = slotEls[i], g = c.children[0], w = c.children[1], n = c.children[2];
          if (S.slots[i]) { known++; g.textContent = v.p.split('').map(function (x) { return x === 'S' ? DOT : DASH; }).join(' '); w.textContent = v.w; n.textContent = v.n; }
          else if (S.suspect && S.suspect.indexOf(i) >= 0) { g.textContent = v.p.split('').map(function () { return HOLLOW; }).join(' '); w.textContent = '? (suspected)'; n.textContent = ''; }
          else { g.textContent = ''; w.textContent = '?'; n.textContent = ''; }
        }
        const c13 = slotEls[12]; c13.hidden = S.loop === 0;
        c13.children[0].textContent = ''; c13.children[1].textContent = WB.w; c13.children[2].textContent = WB.n;
        drawerSum.textContent = 'Pattern Drawer (12 words, ' + known + ' known)';
      }
      function paintAll() { paintStrip(); paintClock(); paintDip(); paintAcc(); paintShelf(); paintDrawer(); }
      function sub(t, force) {
        let s = fill(t);
        if (S.interpOff && !force) s = '(no subtitles)';
        intT.textContent = s || ' '; restart(intT, cl('wipe'));
      }
      function speech(word) {
        while (spk.firstChild) spk.removeChild(spk.firstChild);
        if (word === 'Quaaack.') { spk.appendChild(document.createTextNode('Qu')); spk.appendChild(el('span', { class: cl('aaa'), text: 'aaa' })); spk.appendChild(document.createTextNode('ck.')); }
        else spk.textContent = word || ' ';
        restart(spk, cl('say'));
      }

      /* ------------------------------------------------------------ layout classes */
      function layout() {
        const w = num(root.clientWidth, 0) || num(room.clientWidth, 0);
        if (!w) return;
        const nar = w < 560, lov = w < 420, wd = w > 1200;
        if (nar !== S.narrow) { S.narrow = nar; room.classList.toggle(cl('narrow'), nar); }
        if (lov !== S.loveseat) {
          S.loveseat = lov; room.classList.toggle(cl('loveseat'), lov);
          if (lov && !S.lovedSaid) { S.lovedSaid = true; say('The room has been downsized. The couch and the armchair have merged. The duck is now sitting on your lap, professionally.', { mood: 'confused', priority: 1 }); sub('This is a lot. The duck did not expect this much of you.', true); }
        }
        if (wd !== S.wide) {
          S.wide = wd; room.classList.toggle(cl('aud'), wd);
          if (wd && !S.audSaid) { S.audSaid = true; say('The room has been upgraded. It is an auditorium. The audience is also the duck.', { mood: 'proud', priority: 1 }); }
        }
        S.maxX = Math.max(0, num(rug.clientWidth, 0) * (nar ? 0.22 : 0.35));
        S.pw = num(pool.clientWidth, 0) || 150; S.ph = num(pool.clientHeight, 0) || 260;
      }

      /* ------------------------------------------------------------ scenes, away, idle */
      function clearBurst() {
        if (S.burstT) { api.clearTimeout(S.burstT); S.burstT = 0; }
        S.symbols = []; S.lastRelT = null; ring2.classList.remove(cl('on')); paintThought();
      }
      function go(sc) {
        S.scene = sc; S.epoch++; clearBurst(); if (S.echo) endEcho();
        S.lastInput = api.now(); resetIdle();
        shareP.hidden = sc !== 'share'; tray.hidden = sc === 'share';
        room.classList.toggle(cl('corridor'), sc === 'door');
      }
      function setAway(reason, ms, note) {
        if (press) endPress('drag');
        clearBurst(); if (S.echo) endEcho();
        const tok = ++S.awayTok; S.away = reason;
        room.classList.add(cl('gone'));
        if (note) { couchNote.textContent = note; couchNote.hidden = false; }
        signEl.hidden = reason !== 'idle'; sandEl.hidden = reason !== 'idle';
        sfx('whoosh');
        if (ms > 0) api.setTimeout(function () { if (tok === S.awayTok) clearAway(true); }, ms);
      }
      function clearAway(ret) {
        const why = S.away; if (!why) return;
        S.away = null; S.awayTok++;
        room.classList.remove(cl('gone')); signEl.hidden = true; sandEl.hidden = true; zzEl.hidden = true;
        room.classList.remove(cl('gone')); duckw.classList.remove(cl('asleep'));
        if (ret && why === 'corner') { couchNote.textContent = 'It has been 5 minutes.'; couchNote.hidden = false; api.setTimeout(function () { if (!S.away) couchNote.hidden = true; }, 2500); }
        else couchNote.hidden = true;
        if (ret) sfx('whoosh');
      }
      function clearRcpt() { S.rc = 0; rcpt.hidden = true; while (rcpt.firstChild) rcpt.removeChild(rcpt.firstChild); }
      function rcptAdd(t) { if (S.rc >= 12) return; S.rc++; rcpt.hidden = false; rcpt.appendChild(el('span', { text: t })); }
      function resetIdle() {
        if (S.rc) clearRcpt();
        if (S.idleStep >= 3 && S.away === 'idle') clearAway(false);
        duckw.classList.remove(cl('asleep')); zzEl.hidden = true; restEl.hidden = true;
        S.idleStep = 0; S.restN = 0; S.idleX = 0;
      }
      function noteInput() {
        S.lastInput = api.now(); if (S.rc) clearRcpt();
        if (S.idleStep >= 3) wake(); else { S.idleStep = 0; S.idleX = 0; }
      }
      function wake() {
        if (S.idleStep < 3) return;
        const st = S.idleStep; if (S.rc) clearRcpt();
        if (S.away === 'idle') clearAway(false);
        duckw.classList.remove(cl('asleep')); zzEl.hidden = true; restEl.hidden = true;
        S.idleStep = 0; S.restN = 0; S.idleX = 0; S.lastInput = api.now();
        tmpClass(duckw, cl('thrilled'), 600);
        sub(st >= 5 ? nx('wk5', WAKE5) : (st === 4 ? nx('wk4', WAKE4) : nx('wk3', WAKE3)), true);
        say(nx('wakem', WAKEM), { mood: 'smug', priority: 1 });
      }

      /* ------------------------------------------------------------ the squeeze */
      let press = null, lastEndT = -1e9;
      const presses = [];
      function paintThought() {
        while (thought.firstChild) thought.removeChild(thought.firstChild);
        const arr = S.symbols.map(function (s) { return s.t === 'S' ? DOT : DASH; });
        const prov = !!press && S.scene === 'play' && arr.length < 8;
        if (prov) arr.push(press.dash ? DASH : DOT);
        arr.forEach(function (g, i) { thought.appendChild(el('span', { class: cl('sym') + (prov && i === arr.length - 1 ? ' ' + cl('prov') : ''), text: g })); });
        thought.style.opacity = '1';
      }
      function startPress(src, e) {
        if (press || api.destroyed) return;
        const now = api.now();
        api.stat.inc(ST('squeezes'));
        noteInput();
        hint.hidden = true;
        if (S.scene === 'play') {
          if (S.limp) { sfx('sad'); return; }
          presses.push(now); if (presses.length > 12) presses.shift();
          let n9 = 0, n1 = 0;
          for (let i = 0; i < presses.length; i++) { if (now - presses[i] <= 2000) n9++; if (now - presses[i] <= 1000) n1++; }
          if (n9 >= 6 && n9 < 9 && !S.away && now - S.warnT > 9000) { S.warnT = now; say(nx('warn', WARNS), { mood: 'confused' }); }
          if (n9 >= 9 && !S.away) { overtime(); return; }
          if (S.security && n1 >= 4 && now - (S.tiltT || -1e9) > 4000) { S.tiltT = now; tmpClass(shelf, cl('tilt'), 400); say('Security tilted its hat. It has seen what you did.', { mood: 'smug' }); }
        }
        press = { t0: now, id: e ? e.pointerId : null, x0: e ? num(e.clientX, 0) : 0, dash: false, src: src, hug: false };
        duckw.classList.add(cl('held')); sfx('blip');
        if (S.burstT) { api.clearTimeout(S.burstT); S.burstT = 0; }
        ring2.classList.remove(cl('on'));
        paintThought();
        if (e && e.pointerId != null) { try { duck.setPointerCapture(e.pointerId); } catch (_) { /* no active pointer */ } }
        if (S.scene === 'invoice') payInvoice();
      }
      function endPress(reason) {
        if (!press) return;
        const p = press; press = null;
        const now = api.now();
        duckw.classList.remove(cl('held')); duckw.style.setProperty('--dt-squish', '0');
        if (reason === 'drag' || reason === 'blur' || reason === 'hidden' || reason === 'lost') { paintThought(); return; }
        lastEndT = now;
        const dur = now - p.t0, dash = dur >= 220;
        sfx('boing');
        if (S.scene === 'discharge' || S.scene === 'survey') {
          if (now - S.celT > 500) { S.celT = now; speech('Quack.'); api.confetti(); tmpClass(duckw, cl('thrilled'), 600); sfx('tada'); }
          paintThought(); return;
        }
        if (S.scene !== 'play' || S.limp || S.away) { paintThought(); return; }
        if (dash || p.hug) S.sawLong = true;
        tmpClass(duckw, cl('nodd'), 500);
        if (p.hug && !sessM().hug) { sessM().hug = true; say('That was a hug. The duck has filed it as a hug and does not know what to do with its wings.', { mood: 'confused' }); }
        addSymbol(dash || p.hug ? 'L' : 'S', dur, p.t0);
      }
      function addSymbol(t, dur, onset) {
        const gap = S.lastRelT == null ? null : onset - S.lastRelT;
        S.symbols.push({ t: t, dur: dur, onset: onset, gap: gap });
        S.lastRelT = api.now();
        if (S.burstT) { api.clearTimeout(S.burstT); S.burstT = 0; }
        paintThought();
        if (S.symbols.length >= 8) { closeBurst(); return; }
        S.burstT = api.setTimeout(closeBurst, (S.session === 1 && S.symbols.length === 1) ? 700 : 1100);
        restart(ring2, cl('on'));
      }
      function closeBurst() {
        S.burstT = 0;
        if (!S.symbols.length) return;
        const sy = S.symbols; S.symbols = []; S.lastRelT = null;
        ring2.classList.remove(cl('on'));
        thought.style.opacity = '0';
        resolveBurst(sy);
      }
      function resolveBurst(sy) {
        if (S.scene !== 'play') return;
        if (S.echo) { evalEcho(sy); return; }
        if (S.limp || S.away) return;
        if (S.cin >= sessLen()) return; /* the bell is already on its way: the hour is over, squeezes are only squeaks */
        const str = sy.map(function (s) { return s.t; }).join('');
        if (sy.length === 8 && sy.slice(0, 7).every(function (s, i) { return s.t === 'S' && (i === 0 || s.gap >= 150); }) && sy[7].t === 'S' && sy[7].dur < 90 && sy[7].gap != null && sy[7].gap < 140) { secretSeven(); return; }
        if (str === 'SSLSS' && sy[3].gap != null && sy[3].gap >= 550 && sy[3].gap <= 1050) { knock(); return; }
        let v = null; for (let i = 0; i < 12; i++) if (VOCAB[i].p === str) v = VOCAB[i];
        S.strs.push(str); if (S.strs.length > 3) S.strs.shift();
        if (S.strs.length === 3 && S.session <= 3 && S.strs.every(function (x) { return x === str; }) && /^(S+|L+)$/.test(str)) {
          S.strs = [];
          later(2800, function () { say('The duck has said that word three times. It has eleven more, mostly. ' + (str.charAt(0) === 'S' ? 'Some of them need a hold.' : 'Some of them are quick.'), { mood: 'confused', priority: 1 }); });
        }
        counsel(v, {});
      }
      function secretSeven() {
        const first = !S.s13;
        S.s13 = true; persist('s13', true); doorBtn.hidden = false;
        sfx('tada'); api.achieve(ST('seven'));
        counsel(null, { secret: true });
        if (first) {
          say('Seven and a half. A small door has appeared in the wall between the clock and the plant. It is painted on. It is also open.', { mood: 'confused', priority: 1 });
          api.confetti();
        } else say('Seven and a half, again. The door is still there. It has not moved. It is a door; that is its whole position.', { mood: 'smug' });
      }
      function knock() {
        const again = !!rd('knock', false);
        if (again) { say('The wall has already let you in once. It would like it noted that it is not a revolving wall.', { mood: 'smug' }); sub('(the drawer stays shut, out of principle)', true); api.achieve(ST('knock')); sfx('blip'); return; }
        persist('knock', true);
        say('Two taps on the wall, from the other side of the desk. \'Who is there?\' No one. \'Come in.\'', { mood: 'confused', priority: 1 });
        sub('(the drawer has opened itself)', true);
        drawer.open = true;
        const un = []; for (let i = 0; i < 12; i++) if (!S.slots[i]) un.push(i);
        if (un.length) { const i = api.pick(un); S.slots[i] = true; persist('slots', S.slots); if (S.suspect) S.suspect = S.suspect.filter(function (x) { return x !== i; }); api.stat.max(ST('words'), S.slots.filter(Boolean).length); paintDrawer(); checkVocab(); }
        else api.award(1, 'knock');
        api.achieve(ST('knock')); sfx('ding');
      }
      function checkVocab() { if (S.slots.every(Boolean)) { api.achieve(ST('vocab')); if (camOnce('allknown')) say(ALLKNOWN, { mood: 'proud', priority: 1 }); } }

      /* ------------------------------------------------------------ overtime (spam) */
      function overtime() {
        if (S.burstT) { api.clearTimeout(S.burstT); S.burstT = 0; }
        S.symbols = []; S.lastRelT = null; paintThought();
        S.limp = true; presses.length = 0; sessM().over++;
        api.stat.inc(ST('overtime'));
        duckw.classList.add(cl('limp')); sfx('sad');
        const tok = ++S.limpTok;
        const otot = api.stat.get(ST('overtime'));
        say(OVMILE[otot] || (otot === 1 ? OVERT[0] : (sessM().over >= 3 ? nx('over3', OVERT3) : nx('over', OVERT))), { mood: 'disappointed', priority: 1 });
        api.setTimeout(function () {
          if (tok !== S.limpTok) return;
          S.limp = false; duckw.classList.remove(cl('limp'));
          say(RECOVER, { mood: 'smug', priority: 1 });
        }, 6000);
        if (api.stat.get(ST('overtime')) >= 40 && !S.security) {
          S.security = true; persist('security', true); paintShelf(); api.achieve(ST('warden'));
          say('Security has been called. Security is a smaller duck in a very serious hat.', { mood: 'smug', priority: 1 });
          api.setTimeout(function () { say('Management would like to raise a toast to the Lord High Warden of Overtime. The toast is 5 Meh. It is warm.', { mood: 'proud', priority: 1 }); api.toast('A toast to the Lord High Warden of Overtime. It is warm.'); }, 3500);
        }
      }

      /* ------------------------------------------------------------ the tray and typed problems */
      const ROT = [-3, 2, -1, 3, -2];
      function poolNotes() { const t = Math.min(4, (S.session - 1) >> 1); const cur = TIERS[t] || TIERS[0]; return t > 0 ? cur.concat(TIERS[t - 1] || []) : cur; }
      function drawNote(pink) {
        let pl = poolNotes(); if (pink) pl = pl.filter(function (n) { return n.pink; });
        const taken = S.tray.map(function (n) { return n && n.t; });
        let c = pl.filter(function (n) { return taken.indexOf(n.t) < 0 && n.t !== S.lastPick; });
        if (!c.length) c = pl.filter(function (n) { return taken.indexOf(n.t) < 0; });
        if (!c.length) c = pl;
        return api.pick(c) || TIERS[0][0];
      }
      function ensurePink(keep) {
        if (S.session < 3 || S.tray.some(function (n) { return n && n.pink; })) return -1;
        let i = api.randInt(0, 4); if (i === keep) i = (i + 1) % 5;
        S.tray[i] = null; S.tray[i] = drawNote(true); return i;
      }
      function makeNote(n, i) {
        return el('button', { class: cl('note') + (n.pink ? ' ' + cl('pink') : ''), type: 'button', style: '--r:' + ROT[i % 5] + 'deg' }, el('span', { class: cl('nn'), 'aria-hidden': 'true', text: String(i + 1) }), n.t);
      }
      function renderTray() {
        while (tray.firstChild) tray.removeChild(tray.firstChild);
        trayEls.length = 0;
        S.tray.forEach(function (n, i) { const b = makeNote(n, i); trayEls.push(b); tray.appendChild(b); });
      }
      function fillTray(first) {
        S.tray = [];
        if (first) S.tray.push(TIERS[0][0]);
        while (S.tray.length < 5) S.tray.push(drawNote(false));
        ensurePink(); renderTray();
      }
      let flies = 0;
      function fly(src, text) {
        if (!src || flies >= 4) return;
        const rr = room.getBoundingClientRect(), a = src.getBoundingClientRect(), b = duck.getBoundingClientRect();
        flies++;
        const f = el('div', { class: cl('fly'), style: 'left:' + num(a.left - rr.left, 0) + 'px;top:' + num(a.top - rr.top, 0) + 'px;width:' + num(a.width, 120) + 'px', text: text });
        room.appendChild(f); void f.offsetWidth;
        f.style.transform = 'translate(' + num(b.left - a.left + b.width / 3, 0) + 'px,' + num(b.top - a.top + b.height / 3, 0) + 'px) scale(.3)'; f.style.opacity = '0';
        api.setTimeout(function () { flies--; if (f.parentNode) f.parentNode.removeChild(f); }, 450);
      }
      function cornerCheck() {
        const now = api.now(); S.picks.push(now); S.picks = S.picks.filter(function (t) { return now - t <= 3000; });
        if (S.picks.length >= 8) {
          S.picks = [];
          setAway('corner', 6000, 'Back in 5 minutes');
          say('The duck can process one problem at a time. You submitted 8. It has gone to the corner to count.', { mood: 'confused', priority: 1 });
        }
      }
      function setCase(noun, text) { S.noun = noun; S.left = 3; S.caseText = text; S.cases++; S.lastPick = text || S.lastPick; }
      function projection() {
        if (S.session !== 8) return;
        youEl.hidden = false; youEl.textContent = 'YOU (UNINTERPRETED): Quack.';
        later(500, function () { sub(nx('proj', PROJ), true); });
      }
      function pickNote(i, auto) {
        if (S.scene !== 'play' || S.away) return;
        const n = S.tray[i]; if (!n) return;
        if (!auto) { noteInput(); S.opening = false; }
        const srcEl = trayEls[i], hadFocus = !!srcEl && document.activeElement === srcEl;
        setCase(n.n, n.t);
        fly(srcEl, n.t);
        S.tray[i] = null; S.tray[i] = drawNote(false);
        const pk = ensurePink(i);
        const nb = makeNote(S.tray[i], i);
        if (srcEl && srcEl.parentNode === tray && pk < 0) { tray.replaceChild(nb, srcEl); trayEls[i] = nb; } else renderTray();
        if (hadFocus && trayEls[i]) { try { trayEls[i].focus(); } catch (_) { /* gone */ } }
        tmpClass(duckw, cl('lean'), 500); sfx('pop');
        if (!spamSay('tray', 5)) say(nx('pick', PICK), { mood: 'neutral' });
        projection();
        cornerCheck();
      }
      function mangle(w) {
        const c = String(w).toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 14) || 'matter';
        let h = 7; for (let i = 0; i < c.length; i++) h = (h * 31 + c.charCodeAt(i)) >>> 0;
        let idx = (h + S.cases) % 6; if (idx === S.tpl) idx = (idx + 1) % 6; S.tpl = idx;
        return MANGLE[idx].replace('@w', c);
      }
      function chipsFor(words) {
        const rr = room.getBoundingClientRect(), ir = input.getBoundingClientRect(), br = beakB.getBoundingClientRect();
        words.forEach(function (w, i) {
          api.setTimeout(function () {
            while (S.chips.length >= 12) { const o = S.chips.shift(); if (o.parentNode) o.parentNode.removeChild(o); }
            const c = el('span', { class: cl('chip'), style: 'left:' + num(ir.left - rr.left + 14 + (i % 4) * 8, 20) + 'px;top:' + num(ir.top - rr.top, 200) + 'px;--dx:' + num(br.left - ir.left + br.width / 2, 0) + 'px;--dy:' + num(br.top - ir.top, 0) + 'px', text: w.slice(0, 14) });
            room.appendChild(c); S.chips.push(c); tmpClass(duckw, cl('beak'), 160); sfx('tick');
            api.setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); const k = S.chips.indexOf(c); if (k >= 0) S.chips.splice(k, 1); }, 1150);
          }, i * 140);
        });
      }
      function submit(raw) {
        if (S.scene !== 'play') return;
        if (S.away) { say('Please. Respect my cushion.', { mood: 'disappointed' }); return; }
        noteInput(); S.opening = false;
        const text = clean(raw);
        input.value = ''; input.classList.remove(cl('glow'));
        cornerCheck(); if (S.away) return;
        const recalled = S.recalled; S.recalled = '';
        if (!text) { setCase('the silence', ''); sub('A bold opening. The duck respects a client who begins with nothing.', true); projection(); return; }
        const low = text.toLowerCase(), short = text.slice(0, 40);
        S.diary.push(short); S.diary = S.diary.slice(-8); persist('diary', S.diary);
        if (!S.first) { S.first = short; persist('first', short); }
        api.stat.inc(ST('typed'));
        S.hist.push(low); S.hist = S.hist.slice(-3);
        let handled = true, noun = null;
        if (/^quack\W*$/.test(low)) { fluent(); return; }
        else if (low.indexOf('tuesday') >= 0) { if (tuesday() === 3) return; noun = 'the Tuesday'; }
        else if (low.indexOf('gerald') >= 0) { geraldCall(); return; }
        else if (low.indexOf('duck') >= 0) { say('You said \'duck.\' The duck has gone under the couch. This is transference, or it is you.', { mood: 'confused', priority: 1 }); setAway('couch', 4000); }
        else if (low.indexOf('bread') >= 0) sub('The duck would like it noted that it did not say that first.', true);
        else if (low.indexOf('sock') >= 0) { if (!sessM().sock) { sessM().sock = true; sub(api.flag.get('sockSeen') ? TYPED.sockK : 'The duck knows where the sock is. The duck is not able to say. This is a professional boundary.', true); } api.achieve(ST('sock')); }
        else if (/circl(e|es|ed|ing) back/.test(low)) circleBack();
        else if (low.indexOf('sandra') >= 0) say(TYPED.sandra, { mood: 'smug', priority: 1 });
        else if (low.indexOf('dennis') >= 0) say(TYPED.dennis, { mood: 'smug', priority: 1 });
        else if (low.indexOf('toaster') >= 0) say(api.flag.get('metToaster') || api.flag.get('toasterMet') ? TYPED.toasterK : TYPED.toaster, { mood: 'smug', priority: 1 });
        else if (low.indexOf('stapler') >= 0) say(api.flag.get('metStapler') ? TYPED.staplerK : TYPED.stapler, { mood: 'smug', priority: 1 });
        else if (/\b(mother|mom|mum)\b/.test(low)) sub(TYPED.mother, true);
        else if (/\bsorry\b/.test(low)) sub(TYPED.sorry, true);
        else if (/\bthank/.test(low)) sub(TYPED.thank, true);
        else if (/^(hello|hi|hey)\b/.test(low)) sub(TYPED.hello, true);
        else if (/7 1\/2|7\.5|7 and a half/.test(low)) { tmpClass(duckw, cl('ovation'), 2000); say('The duck cannot stand. The ovation has been attempted for 2 seconds and filed as \'technically\'.', { mood: 'smug', priority: 1 }); }
        else if (low === 'help') sub('The duck is the help.', true);
        else if (low.indexOf('i give up') >= 0) say('Management has gently arrived and asked the duck to take five. The duck does not have a five.', { mood: 'confused', priority: 1 });
        else if (low.indexOf('moist') >= 0) say('Sandra has flagged that word. She would not say why. She has flagged the flag.', { mood: 'confused', priority: 1 });
        else handled = false;
        if (!handled) {
          if (S.hist.length >= 3 && S.hist.every(function (h) { return h === low; })) sub('You are rehearsing.', true);
          else if (recalled && recalled === short) sub('A recycled problem. The duck has seen it before. It is like a coat the duck has hung up and not worn.', true);
          else if (text.length > 100) sub('The duck got to the second word and drifted. It would like to hear the rest on a different day.', true);
          else if (text.split(' ').length === 1) sub('Bold. Concise. The kind of problem that has a name and a pension.', true);
        }
        const words = text.split(' ').slice(0, 12);
        let longest = words[0];
        words.forEach(function (w) { if (w.replace(/[^A-Za-z0-9-]/g, '').length > longest.replace(/[^A-Za-z0-9-]/g, '').length) longest = w; });
        chipsFor(words);
        const nn = noun || mangle(longest);
        setCase(nn, text);
        later(150 * words.length + 300, function () { say(nx('focus', FOCUS), { mood: 'smug' }, { noun: nn }); });
        projection();
      }
      function tuesday() {
        S.tues = Math.min(9, S.tues + 1); persist('tues', S.tues); api.stat.inc(ST('tuesdays'));
        const n = S.tues;
        if (n === 1) {
          sub('The Interpreter has declined to translate. The Interpreter has asked for the afternoon off.', true);
          tmpClass(duckw, cl('cover'), 3000); dim.classList.add(cl('on')); sfx('sad');
          say('You said Tuesday. The lights have dimmed by 4 percent. The duck has asked that we not use that word again.', { mood: 'panic', priority: 1 });
        } else if (n === 2) {
          restart(dim, cl('flick')); tmpClass(duckw, cl('flinch'), 500); sfx('sad');
          say('Tuesday again. The lights flickered. Sandra has been informed. Sandra has asked which Tuesday.', { mood: 'panic', priority: 1 });
        } else if (n === 3) {
          setAway('tuesday', 8000, 'Back soon. Gone to look at the pond.');
          say('The duck has left a note on the couch. It says: \'Back soon. Gone to look at the pond.\' The duck is, as far as Management can tell, at the pond.', { mood: 'confused', priority: 1 });
        } else if (n === 4) {
          S.hat = true; persist('hat', true); paintAcc(); sub('(the duck says nothing)', true); api.achieve(ST('tuesday'));
          say('The duck has returned wearing a tiny knitted hat. It has said nothing. It has said it in a hat.', { mood: 'proud', priority: 1 });
        } else if (n === 7) wednesday();
        else if (n >= 8 && (S.tuesAlt = !S.tuesAlt)) sub('The Interpreter has checked the day. The day has not been disclosed.', true);
        else { tmpClass(duckw, cl('cover'), 2500); sub('The duck has covered its eyes. It is a policy.', true); }
        return n;
      }
      function wednesday() {
        const was = S.clockRight;
        S.wellOverride = 'Wellness: WEDNESDAY'; paintStrip(); S.clockRight = true; paintClock();
        dim.classList.add(cl('dip2')); room.classList.remove(cl('kh')); tmpClass(duckw, cl('cover'), 4000); denBtn.style.transform = 'scaleX(-1)';
        sfx('bell'); sub('(no comment, it is Wednesday)', true); api.achieve(ST('wednesday'));
        say('It is Wednesday. Nobody is sure how. Sandra has a form for this, and the form is dated Thursday.', { mood: 'confused', priority: 1 });
        api.setTimeout(function () { dim.classList.remove(cl('dip2')); }, 1500);
        api.setTimeout(function () { S.wellOverride = ''; S.clockRight = was; paintStrip(); paintClock(); paintAcc(); denBtn.style.transform = ''; say('The hat is back on. Everyone has turned round. Nobody will discuss the wall.', { mood: 'smug', priority: 1 }); }, 4000);
      }
      function fluent() {
        speech('Quack!'); S.interpOff = true; S.interpUntil = api.now() + 180000; sub('', true); intT.textContent = '(no subtitles)';
        say('The duck understood you. Nobody has understood the duck before. The Interpreter has been shown out with severance of 7 1/2 breadcrumbs. The strip is blank. It is a loss nobody asked for.', { mood: 'confused', priority: 1 });
        api.achieve(ST('fluent')); sfx('ding');
      }
      function interpBack() {
        S.interpOff = false; sub('I was in the pond. It was fine.', true); S.brief = true; briefEl.hidden = false;
        say('The Interpreter has returned, tired, with a tiny briefcase.', { mood: 'smug', priority: 1 });
      }
      function circleBack() {
        tmpClass(duckw, cl('circ'), 2700); sfx('whoosh');
        say(TYPED.circle, { mood: 'proud', priority: 1 });
        sub(TYPED.circleI, true);
        api.achieve(ST('circle'));
      }
      /* two rare events (1-2 percent per counsel, never close together) */
      function rare() {
        const now = api.now(); if (now - S.rareT < 90000 * K) return;
        const r = api.rand();
        if (r < 0.018) audit(); else if (r < 0.034) bloom();
      }
      function audit() {
        S.rareT = api.now(); api.stat.inc(ST('audits'));
        later(1500, function () {
          if (S.away || S.limp || S.echo || S.cin >= sessLen()) return;
          say('A surprise audit has arrived. Nobody saw it arrive. The duck has put on its lanyard (it was already wearing it) and is looking busy to a high professional standard.', { mood: 'panic', priority: 1 });
          setAway('audit', 5200, 'AUDIT IN PROGRESS. PLEASE LOOK BUSY.');
          later(5600, function () {
            say('Audit complete. Sandra found 12 words, 13 words, and one extra Tuesday. She has taken the Tuesday. You will not be needing it.', { mood: 'smug', priority: 1 });
            if (api.flag.get('tiny-bureaucracy.tuesday')) later(3400, function () { say('She has also taken the Tuesday from the other office, which had been unaccounted for. It has been returned to its drawer.', { mood: 'smug' }); });
            api.award(1.5, 'audit survived'); sfx('stamp');
          });
        });
      }
      function bloom() {
        S.rareT = api.now(); api.stat.inc(ST('blooms'));
        const leaf = denBtn.firstChild; if (!leaf) return;
        leaf.textContent = '\u{1F33C}'; sfx('ding'); api.award(2, 'bloom');
        api.setTimeout(function () { leaf.textContent = '\u{1F33F}'; }, 9000);
        say('Dennis (Plant) has bloomed. He did it without a meeting. He did it at 4:47, in the quiet part of the session, as a form of notice.', { mood: 'proud', priority: 1 });
        if (api.flag.get('metDennis') || api.flag.get('plantClicked')) later(3600, function () { say('He has been clicked in other rooms of the building and wanted you to be the one who saw.', { mood: 'smug' }); });
        if (api.flag.get('metGerald')) later(7200, function () { say('Gerald (VP of Spuds) has sent a card: \'Congratulations on the flower. I have eyes. They are not for this.\'', { mood: 'smug' }); });
      }
      /* the long clock: a surprise at 3 minutes and another at 10 */
      function beat3() {
        S.b3 = true; S.clockRight = true; paintClock(); api.award(camOnce('b3pay') ? 3 : 0.3, 'three minutes'); sfx('ding');
        say('The wrong clock is, for a moment, right. It is 3:00, in the sense that three minutes have passed. The clock is mortified.', { mood: 'confused', priority: 1 });
        api.setTimeout(function () {
          S.clockRight = false; paintClock();
          say('The clock is wrong again. It says 4:47 and looks relieved. The brief right will be struck from the record.', { mood: 'smug', priority: 1 });
        }, 7500);
      }
      function beat10() {
        S.b10 = true; sfx('tada'); tmpClass(duckw, cl('thrilled'), 600);
        speech('Thank you for your time.');
        sub('(The Interpreter would like it noted that this one was not him.)', true);
        say('Ten minutes. The duck has said a full sentence. It was five words and not one of them is in the approved vocabulary. Management has gone into the filing room and is not coming out.', { mood: 'panic', priority: 2, duration: 8000 });
        api.achieve(ST('ten'));
        later(7000, function () { say('The pond has sent a card. It reads: \'' + api.line('fortune') + '\' The pond has signed it with a ripple.', { mood: 'proud', priority: 1 }); });
      }
      function geraldCall() {
        if (S.session >= 3 || S.loop > 0) { later(1500, function () { startEcho('phone', 'Gerald'); }); }
        else say('Gerald is not on the approved list of callers. The phone has not yet been installed. Gerald has been told.', { mood: 'confused', priority: 1 });
      }

      /* ------------------------------------------------------------ the counsel */
      function pickSuspects() { const un = []; for (let i = 0; i < 12; i++) if (!S.slots[i]) un.push(i); S.suspect = api.shuffle(un).slice(0, 2); }
      function counsel(v, o) {
        const noun = S.noun, sNo = S.session, len = sessLen();
        const n = ++S.cin; api.stat.inc(ST('counsels'));
        const cn = api.stat.get(ST('counsels'));
        const honest = !o.secret && sNo > 2 && n < len && !S.lastHonest && api.chance(0.025);
        S.lastHonest = honest;
        paintClock(); paintStrip(); sfx('tick');
        let word = o.secret ? 'Seven and a half.' : (v ? v.w : nx('mumw', MUMW));
        if (sNo === 10) word = 'That\'s our time.';
        if (honest) word = 'Honestly?';
        speech(word);
        if (S.left > 0) { S.left--; if (S.left === 0) { S.noun = 'the matter'; say('The duck has stopped listening to %NOUN and is now thinking about lunch.', { mood: 'smug' }, { noun: noun }); restart(tray, cl('pulse')); } }
        later(600, function () { translate(v, o, noun, n, honest); });
        addBubble(cn % 25 === 0 ? 'deep' : 'n', noun);
        const first = !S.squeezed; if (first) { S.squeezed = true; persist('squeezed', true); }
        api.award(first ? 0.5 : 0.1, 'counsel'); api.achieve(ST('first'));
        const idx = v ? VOCAB.indexOf(v) : -1; let fresh = false;
        if (idx >= 0 && !S.slots[idx]) {
          fresh = true; S.slots[idx] = true; persist('slots', S.slots);
          if (S.suspect) S.suspect = S.suspect.filter(function (x) { return x !== idx; });
          api.stat.max(ST('words'), S.slots.filter(Boolean).length); paintDrawer(); api.award(1, 'new word');
          say(v.d, { mood: 'proud', priority: 1 }, { noun: noun }); checkVocab();
          if (camOnce('drawerOpen')) { drawer.open = true; tmpClass(drawer, cl('fresh'), 2200); later(3400, function () { say('The word has been filed in the Pattern Drawer. The drawer is open. The drawer is very proud.', { mood: 'proud' }); }); }
        }
        if (v && v.w === 'Bread.' && !sessM().bread) { sessM().bread = true; if (!fresh) { const t = S.loop > 0 ? BREADC.loop : BREADC[sNo >= 5 ? 5 : sNo]; if (t) say(t, { mood: 'smug' }); } }
        if (cn >= 4 && !S.suspect) { pickSuspects(); paintDrawer(); }
        if (sNo === 1 && n === 2) later(3000, function () { if (!S.sawLong) say('The duck has noticed you only do the short one. There is also a long one. It is a hold. The duck will wait.', { mood: 'smug', priority: 1 }); });
        if (sNo === 1 && n === 3) { input.classList.add(cl('glow')); input.placeholder = 'You may now say your own problem.'; say('You may now say your own problem. The duck will hear the longest word and do its best with that.', { mood: 'proud', priority: 1 }); }
        else if (cn % 4 === 0 && !fresh) ambient();
        if (honest) { later(1400, function () { say('Off script. The duck said \'Honestly?\' and then nothing. Sandra has been informed.', { mood: 'confused', priority: 1 }); }); later(5500, function () { say('Sandra asks which word.', { mood: 'smug' }); }); }
        if (!o.secret && !honest && !fresh && n < len && sNo >= 2) rare();
        if (MILE[cn] && !honest) later(2400, function () { say(MILE[cn], { mood: 'smug', priority: 1 }); });
        if (sNo === 2 && n === 4 && api.stat.get('pet-rock.entered') > 0 && camOnce('pebble')) later(2400, function () { say('A pebble has been found on the couch. It has been logged as a patient. It has not spoken. It is the best-behaved patient.', { mood: 'proud', priority: 1 }); });
        if (sNo === 3 && n === 1) later(2600, function () { say('The duck just called you Dennis. Dennis is a plant. The duck is blending patients.', { mood: 'confused', priority: 1 }); });
        if (sNo === 4 && n === 4) later(3200, breakthrough);
        if (sNo === 5 && n === 1 && (api.flag.get('metGerald') || api.stat.get('potato-interview.entered') > 0) && camOnce('gerald')) {
          later(2600, function () { say('A note has slid under the door. It reads: \'To the duck, from Gerald: what is a potato for.\' The duck quacks once.', { mood: 'proud', priority: 1 }); });
          later(6800, function () { say('Gerald\'s reply, relayed by Management: \'Profound. I will be needing that in writing.\'', { mood: 'smug', priority: 1 }); });
        }
        if (sNo === 9) { if (n === 1) later(2200, function () { say(GROUPL[1], { mood: 'confused' }); say(GROUPL[2], { mood: 'smug' }); }); if (S.group) Array.prototype.forEach.call(S.group.children, function (c, i) { c.style.setProperty('--drift', (i * 0.06 * n).toFixed(2) + 's'); }); }
        if (sNo >= 5) scoot();
        const ev = ECHOS[sNo] && ECHOS[sNo][n];
        if (ev && n < len) later(2100, function () { startEcho(ev[0], callerFor(ev[1])); });
        if (sNo === 6 && n === 2) later(2200, startShare);
        else if (n >= len) later(slow(3200) + 400, endSession);
      }
      function callerFor(c) {
        if (c !== '?') return c;
        if (api.flag.get('metGerald') || api.stat.get('potato-interview.entered') > 0) return 'Gerald';
        if (api.stat.get('toaster-debate.entered') > 0) return 'The Toaster';
        return 'The Stapler';
      }
      function ambient() {
        const cb = []; if (S.loop > 0) cb.push(AMB_LOOP); if (S.interpOff) cb.push(AMB_LEAVE);
        const t = (cb.length && api.chance(0.3)) ? api.pick(cb) : nx('amb', AMBIENT);
        say(t, { mood: 'neutral' }, { N: fw(wellness()) });
      }
      function translate(v, o, noun, n, honest) {
        if (honest) { intT.textContent = ' '; return; }
        if (S.session === 10) { sub('That\'s our time.'); return; }
        if (S.session === 9 && n === 1) {
          sub(S.loop > 0 ? 'I would like to repeat that I have never spoken duck. I have since taken a second course. It was also by mail.' : 'I should say, I have never spoken duck. I took the course by mail. It was 7 1/2 lessons. I passed 7.', true);
          later(4000, function () { sub('Everything I have told you is true in spirit. The spirit is mostly bread.', true); });
          later(7600, function () { say('The Interpreter has disclosed a credential. Management has noted it and filed it where credentials go, which is a drawer, which is a pond.', { mood: 'smug' }); });
          return;
        }
        const ph = S.session <= 2 ? 0 : (S.session <= 5 ? 1 : (S.session <= 8 ? 2 : 3));
        let t;
        if (o.secret) t = SEVEN_I; else if (!v) t = nx('mum' + ph, ph === 0 ? MUMA : (ph === 1 ? MUMB : MUMC)); else if (ph === 3) t = nx('D', TRD); else t = nx(v.w + ph, (TR[v.w] || TR['Hm.'])[ph]);
        if (ph >= 1 && S.session >= 5 && S.session <= 8 && n === 2 && !sessM().regard && (S.first || S.diary.length)) { sessM().regard = true; t = 'Regarding \'%TEXT\': you were also like this in Session 1. ' + t; }
        sub(fill(t, { noun: noun, text: S.first || S.diary[0] || '' }));
      }
      function breakthrough() {
        api.award(2, 'breakthrough'); sfx('tada'); speech('Float.');
        later(700, function () { speech('Float. Float.'); }); later(1400, function () { speech('Float. Float. Float.'); tmpClass(duckw, cl('thrilled'), 600); });
        say(BTL[0], { mood: 'proud', priority: 1 }); later(4200, function () { say(BTL[1], { mood: 'confused', priority: 1 }); });
        sub(BTI);
      }

      /* ------------------------------------------------------------ reflection pool */
      function addBubble(kind, noun) {
        const deep = kind === 'deep', snore = kind === 'snore', rv = snore ? 'Zz' : revOf(noun != null ? noun : S.noun);
        while (S.bubbles.length >= 14) rmBubble(0);
        const b = el('button', { class: cl('bub') + (deep ? ' ' + cl('deep') : '') + (snore ? ' ' + cl('zz') : ''), type: 'button', 'aria-label': 'Reflection: ' + rv }, rv);
        const o = { el: b, u: 0, vy: snore ? 7 + api.rand() * 4 : 30 + api.rand() * 30, ph: api.rand() * 6.28, kind: kind, rev: rv, w: 46, h: deep ? 58 : 36, lane: 0 };
        o.x = 0; o.y = 0;
        pool.appendChild(b); S.bubbles.push(o);
        o.w = num(b.offsetWidth, 46) || 46; o.h = num(b.offsetHeight, o.h) || o.h;
        o.lane = S.narrow ? api.rand() * Math.max(1, S.ph - o.h - 4) : api.rand() * Math.max(1, S.pw - o.w - 4);
        if (deep) {
          const t = nx('deep', DEEP);
          psay.textContent = t; psay.hidden = false; api.setTimeout(function () { psay.hidden = true; }, 6500);
          say(t, { mood: 'proud', priority: 1 });
        }
      }
      function rmBubble(i) { const b = S.bubbles.splice(i, 1)[0]; if (b && b.el.parentNode) b.el.parentNode.removeChild(b.el); }
      function popBubble(o) {
        const i = S.bubbles.indexOf(o); if (i < 0) return;
        noteInput();
        S.bubbles.splice(i, 1);
        if (o.el.parentNode) o.el.parentNode.removeChild(o.el);
        pring.style.left = num(o.x + o.w / 2, 0).toFixed(1) + 'px'; pring.style.top = num(o.y + o.h / 2, 0).toFixed(1) + 'px'; restart(pring, cl('on'));
        sfx('pop');
        const now = api.now();
        api.stat.inc(ST('bubbles')); const total = api.stat.get(ST('bubbles'));
        if (o.kind === 'snore') { api.award(3, 'snore'); api.achieve(ST('snore')); say('The snore has been popped. It was a small one. It was also yours.', { mood: 'proud', priority: 1 }); return; }
        if (o.kind === 'deep') api.award(1, 'deep reflection');
        else if (now - S.lastPopAward >= 83) { S.lastPopAward = now; api.award(0.1, 'bubble'); }
        const spb = spamSay('bub', 8);
        if (total === 1) say('A reflection. Reversed, as is customary.', { mood: 'smug', priority: 1 });
        else if (!spb && total % 10 === 0) say(nx('pop', POPS), { mood: 'smug' }, { rev: o.rev });
      }

      /* ------------------------------------------------------------ the echo (phone, duck questions, check-ins) */
      function endEcho() {
        S.echo = null;
        desk.classList.remove(cl('ring')); phLbl.hidden = true;
        for (let i = 0; i < lamps.length; i++) lamps[i].classList.remove(cl('on'));
        duckw.classList.remove(cl('beak')); paintThought();
      }
      function startEcho(kind, caller) {
        if (S.echo || S.scene !== 'play' || S.away || S.limp || S.cin >= sessLen()) return;
        clearBurst();
        const E = S.echo = { kind: kind, caller: caller || '', attempts: 0, pat: [], ioi: [] };
        const at = function (ms, fn) { api.setTimeout(function () { if (S.echo === E && !api.destroyed) fn(); }, Math.max(1, ms)); };
        if (kind === 'checkin') { sub('How are you?', true); speech('?'); at(6000, function () { say('The duck wrote \'Honest\' anyway. The duck did not wait for the pattern. The duck has seen enough.', { mood: 'smug', priority: 1 }); api.award(0.5, 'check-in'); endEcho(); }); return; }
        const len = S.session >= 6 ? 4 : 3;
        for (let i = 0; i < len; i++) E.pat.push(api.chance(0.5) ? 'L' : 'S');
        if (E.pat.indexOf('S') < 0) E.pat[len - 1] = 'S'; else if (E.pat.indexOf('L') < 0) E.pat[0] = 'L';
        const phone = kind === 'phone';
        if (phone) { desk.classList.add(cl('ring')); phLbl.textContent = E.caller; phLbl.hidden = false; lamps[2].classList.add(cl('on')); sfx('bell'); }
        else { thought.textContent = '?'; thought.style.opacity = '1'; }
        let t = 600;
        E.pat.forEach(function (s) {
          const dur = s === 'S' ? 180 : 540; E.ioi.push(dur + 260);
          at(t, function () { if (phone) lamps[s === 'S' ? 0 : 1].classList.add(cl('on')); else duckw.classList.add(cl('beak')); sfx(s === 'S' ? 'blip' : 'honk'); });
          at(t + dur, function () { lamps[0].classList.remove(cl('on')); lamps[1].classList.remove(cl('on')); duckw.classList.remove(cl('beak')); });
          t += dur + 260;
        });
        at(t + 8000, function () { echoFail('timeout'); });
        say(phone ? nx('ring', RING) : nx('askq', ASKQ), { mood: 'confused', priority: 1 });
      }
      function evalEcho(sy) {
        const E = S.echo; if (!E) return;
        if (E.kind === 'checkin') { say('Honest. Whatever you squeezed, the duck wrote \'Honest.\' The duck did not look at the pattern. The duck has seen enough.', { mood: 'smug', priority: 1 }); api.award(0.5, 'check-in'); sfx('ding'); endEcho(); return; }
        let ok = sy.length === E.pat.length && sy.every(function (s, i) { return s.t === E.pat[i]; });
        if (ok) for (let i = 1; i < sy.length; i++) { const p = sy[i].onset - sy[i - 1].onset, s = E.ioi[i - 1]; if (Math.abs(p - s) > S.tol * s) ok = false; }
        if (ok) { S.tol = 0.45; S.miss = 0; echoOK(E); return; }
        S.miss++; if (S.miss >= 2) S.tol = 0.8;
        E.attempts++;
        if (E.attempts >= 2) { echoFail('wrong'); return; }
        say('Not quite. The duck is listening harder.', { mood: 'confused' });
      }
      function echoOK(E) {
        endEcho(); sfx('ding');
        if (E.kind === 'phone') {
          api.award(2, 'call'); api.stat.inc(ST('calls')); api.achieve(ST('call'));
          say('You echoed the ring perfectly. The duck has picked up and said \'Quack.\' The caller is satisfied. Callers always are.', { mood: 'proud', priority: 1 });
          const kn = (E.caller === 'The Stapler' && api.flag.get('metStapler')) || (E.caller === 'The Toaster' && (api.flag.get('metToaster') || api.flag.get('toasterMet'))) || (E.caller === 'The Missing Sock' && api.flag.get('sockSeen'));
          const c = E.caller === 'Sandra' && S.s13 ? CALLER.SandraB : (kn && CALLB[E.caller] ? CALLB[E.caller] : (CALLER[E.caller] || CALLER.Sandra));
          later(2800, function () { say(c, { mood: 'smug', priority: 1 }); });
        } else {
          S.hearts = Math.min(7.5, S.hearts + 0.5); persist('hearts', S.hearts); paintStrip(); api.award(1, 'duck question');
          say(nx('askyes', ASKYES), { mood: 'proud', priority: 1 }); tmpClass(duckw, cl('thrilled'), 600);
        }
      }
      function echoFail(why) {
        const E = S.echo; if (!E) return;
        endEcho(); sfx('buzz'); S.miss++; if (S.miss >= 2) S.tol = 0.8;
        if (E.kind === 'phone') say((why === 'decline' ? 'The call has been declined. It will go to voicemail, which is a hat. ' : '') + nx('vm', VMAIL), { mood: 'disappointed', priority: 1 });
        else say(nx('askno', ASKNO), { mood: 'smug', priority: 1 });
      }

      /* ------------------------------------------------------------ the chair (boundaries) */
      function scoot() {
        S.awayT = Math.min(S.maxX, S.awayT + 14); S.scoots++;
        if (S.scoots % 3 === 1) say(nx('bound', BOUND), { mood: 'smug' });
        if (S.maxX > 20 && S.awayT >= S.maxX - 0.5 && !sessM().edge) { sessM().edge = true; say('The duck has reached the edge of the rug. Beyond this is a skirting board. The duck has made peace with the skirting board.', { mood: 'proud' }); }
      }
      function endDrag() {
        const d = S.drag; if (!d) return;
        S.drag = null; S.awayT = S.chairX;
        if (d.startX - S.chairX >= 20) { api.stat.inc(ST('chair')); sfx('boing'); }
      }

      /* ------------------------------------------------------------ small verbs: nod, boop, pokes, clipboard */
      function nod() {
        if (S.session < 2 && S.loop === 0) return;
        noteInput();
        if (S.nodsPending >= 3) { spamSay('nod', 3, 5000); return; }
        S.nodsPending++;
        const delay = 400 + 100 * Math.min(S.nods, 40);
        S.nods = Math.min(9999, S.nods + 1); persist('nods', S.nods); api.stat.inc(ST('nods'));
        api.setTimeout(function () { S.nodsPending = Math.max(0, S.nodsPending - 1); tmpClass(duckw, cl('nodd'), 500); sfx('blip'); }, delay);
        const m = sessM(); if (m.nodN === undefined) m.nodN = 0;
        if (m.nodN < 20) { m.nodN++; api.award(0.05, 'nod'); }
        if (S.nods === 10) say('The duck is nodding in the middle of its own reply.', { mood: 'confused' });
        else if (S.nods === 20) { api.achieve(ST('nods')); say('The duck has nodded at something you said 5 minutes ago. Management apologises on its behalf.', { mood: 'smug', priority: 1 }); }
        else if (S.nods === 40) say('The duck\'s head has tilted all the way over. \'Understood.\' it says, to nothing.', { mood: 'confused', priority: 1 });
      }
      function boop() {
        noteInput(); sfx('pop'); tmpClass(duckw, cl('beak'), 150);
        api.stat.inc(ST('boops')); const total = api.stat.get(ST('boops')), m = sessM();
        if (m.boops < 20) { m.boops++; api.award(0.05, 'boop'); }
        if (total === 10) { sub('Please.', true); api.achieve(ST('boop')); }
        else if (spamSay('beak')) { /* said */ }
        else if (total === 20) say('Please do not boop the beak. The beak is a professional beak. ... Well. One more.', { mood: 'disappointed', priority: 1 });
        else if (!m.boop1) { m.boop1 = true; say('The beak has been booped. The beak was not consulted.', { mood: 'confused' }); }
      }
      function notesList() {
        const a = [];
        if (S.loop > 0 || S.discharged) a.push({ hand: true });
        for (let i = S.notesDone - 1; i >= 0 && a.length < 10; i--) a.push({ t: NOTES[i] || NOTES[NOTES.length - 1] });
        return a;
      }
      function showNote(n) {
        while (pnText.firstChild) pnText.removeChild(pnText.firstChild);
        pnSvg.style.display = n.hand ? 'none' : '';
        if (n.hand) { pnText.appendChild(el('em', { class: cl('hand'), text: pname() })); pnText.appendChild(el('em', { class: cl('hand'), text: 'P.S. Bread.' })); }
        else {
          let d = 'M0 20'; for (let i = 1; i <= 14; i++) d += ' L' + (i * 21) + ' ' + (6 + api.randInt(0, 28));
          pnPath.setAttribute('d', d); restart(pnPath, cl('on')); pnPath.style.animation = 'none'; void pnPath.getBoundingClientRect(); pnPath.style.animation = '';
          pnText.textContent = n.t;
        }
        pnWrap.hidden = false; reveal(pnWrap);
      }
      function closeNote() { pnWrap.hidden = true; S.noteIdx = -1; }
      function clipClick() {
        const list = notesList();
        if (spamSay('clip')) return;
        if (!list.length) { say(NOTE_LOCK, { mood: 'smug' }); return; }
        S.noteIdx = pnWrap.hidden ? 0 : S.noteIdx + 1;
        if (S.noteIdx >= list.length) { closeNote(); return; }
        showNote(list[S.noteIdx]);
        if (!sessM().open) { sessM().open = true; say(NOTE_OPEN, { mood: 'smug' }); }
      }

      /* ------------------------------------------------------------ share mode (Session 6) */
      function startShare() {
        if (S.scene !== 'play') return;
        go('share'); S.shareIdx = 0; S.cin = 2; paintStrip();
        shareP.querySelectorAll('button').forEach(function (b) { b.disabled = false; });
        speech('I would like to share.');
        say('The duck would like to share. The duck has never shared. It is made of the sharing material, but that was a long time ago.', { mood: 'confused', priority: 1 });
        shareText.textContent = CONF[0]; sub(CONF[0], true); shareNudge();
      }
      /* nobody is waiting forever: if the patient does not answer, the duck takes a Hm. on their behalf */
      function shareNudge() {
        const tk = ++S.shareTok;
        later(slow(40000), function () { if (tk === S.shareTok && S.scene === 'share' && S.shareIdx < 3) shareRespond('hm', true); });
      }
      function shareRespond(kind, auto) {
        if (S.scene !== 'share' || S.shareIdx >= 3) return;
        if (!auto) noteInput();
        S.cin++; api.stat.inc(ST('counsels')); paintClock(); paintStrip(); sfx('tick'); api.award(0.5, 'share');
        say(nx('resp' + kind, RESP[kind] || RESP.hm), { mood: 'smug', priority: 1 });
        S.shareIdx++;
        if (S.shareIdx < 3) { shareText.textContent = CONF[S.shareIdx]; sub(CONF[S.shareIdx], true); shareNudge(); }
        else {
          shareText.textContent = 'The duck has finished sharing. The duck is a little lighter. The duck is still a duck.';
          shareP.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
          later(2800, function () { api.achieve(ST('listener')); say('Management thanks you for being a good listener. You are now a Level 1 Listener. There is no Level 2.', { mood: 'proud', priority: 1 }); });
          later(5600, endSession);
        }
      }

      /* ------------------------------------------------------------ sessions, invoices */
      function mkGroup() {
        rmGroup();
        const g = el('div', { class: cl('ringg'), role: 'group', 'aria-label': 'Group Session' }), shared = {};
        for (let i = 0; i < 11; i++) { const a = (i / 11) * Math.PI * 2 - 1.2; g.appendChild(el('button', { class: cl('gd'), type: 'button', 'aria-label': i === 7 ? 'Dennis (Plant)' : 'Group duck ' + (i + 1), style: 'left:' + (50 + 46 * Math.cos(a)).toFixed(1) + '%;top:' + (52 + 34 * Math.sin(a)).toFixed(1) + '%;--i:' + i, text: i === 7 ? '\u{1F33F}' : '\u{1F986}', onclick: function () { groupShare(i, shared); } })); }
        rug.appendChild(g); S.group = g;
      }
      /* Session 9: each member of the group takes the floor once; the plant says the most by saying nothing */
      function groupShare(i, shared) {
        noteInput(); sfx(i === 7 ? 'ding' : 'blip');
        if (shared[i]) { sub('(this member has shared. This member is proud, and finished.)', true); return; }
        shared[i] = true; const n = Object.keys(shared).length;
        sub(i === 7 ? '(Dennis (Plant) shares nothing. It is the most honest share of the session.)' : GSH[i], true);
        if (n === 11) { api.achieve(ST('groupshare')); api.award(camOnce('group11') ? 2 : 0.2, 'group shared'); sfx('tada'); say('Everyone has shared. The circle is complete. The couch has asked to leave it exactly there.', { mood: 'proud', priority: 1 }); }
      }
      function rmGroup() { if (S.group && S.group.parentNode) S.group.parentNode.removeChild(S.group); S.group = null; }
      function startSession(kind) {
        go('play');
        S.cin = 0; S.noun = 'the matter'; S.left = 0; S.sess = null; sessM();
        S.awayT = 0; S.scoots = 0; S.lastClose = -1e9; S.wellOverride = '';
        dim.classList.remove(cl('on')); youEl.hidden = true; closeNote(); rmGroup(); briefEl.hidden = !S.brief;
        if (api.stat.get(ST('counsels')) >= 4 && !S.suspect) pickSuspects();
        fillTray(S.session === 1);
        paintAll();
        const s = S.session;
        if (kind === 'mount') {
          addBubble('n', S.first || 'hello');
          if (S.loop > 0) say('Session 1 of 1. Please sit. We have been over this; it is a lot more over now.', { mood: 'smug', priority: 1 });
          else if (s > 1) say('Session ' + s + ' of 1. Please sit. The duck remembers you, in the way a duck remembers, which is mostly the bread.', { mood: 'smug', priority: 1 });
          else { S.opening = true; INTRO.forEach(function (t, i) { api.setTimeout(function () { if (S.opening) say(t, { mood: i === 0 ? 'neutral' : 'proud', priority: 1 }); }, i === 0 ? 400 : 3500 * i); }); }
        } else if (kind === 'next' && SESS_INTRO[s]) say(SESS_INTRO[s], { mood: 'proud', priority: 1 });
        if (kind === 'next' && s === 5) later(2800, function () { say('A loaf of bread has appeared on the shelf with a laminated tag: NOT A METAPHOR (confirmed). Dennis donated it. We are not discussing the bread.', { mood: 'smug', priority: 1 }); });
        if (s === 9) { mkGroup(); later(3000, function () { say(GROUPL[0], { mood: 'smug' }); }); later(6200, function () { say('The diploma has been finalised. It reads: Dr. {player}, Ph.Q., Cured of Nothing. The duck did not write it. The duck ordered the frame.', { mood: 'proud', priority: 1 }); }); if (kind === 'next' && camOnce('shrine')) later(10000, function () { say('The shelf has been arranged like a small shrine. Nobody arranged it. The shelf arranged itself, in a spirit of respect.', { mood: 'proud' }); }); }
        if (s === 1) later(2500, function () { if (S.cases === 0 && S.scene === 'play') pickNote(0, true); });
        if (kind === 'loop' && S.first) input.value = S.first;
      }
      function endSession() {
        if (S.scene !== 'play' && S.scene !== 'share') return;
        const s = S.session, m = sessM();
        go('invoice');
        rmGroup(); S.brief = false; briefEl.hidden = true; youEl.hidden = true; closeNote();
        sfx('bell');
        const from = ((47 + 5 * S.cin) % 60) * 6;
        S.spin = { t0: api.now(), dur: S.reduce ? 200 : 1300, from: from, to: from + 360 + (((282 - from) % 360) + 360) % 360 };
        say(s === 1 ? BELL1 : nx('bell', BELL), { mood: 'proud', priority: 1 });
        const rows = [INVOICE[s - 1] || INVOICE[0]];
        for (let i = 0; i < Math.min(4, m.over); i++) rows.push('Overtime, 3 bread');
        rows.push('Total: 0 Meh. ' + (s >= 5 ? 'Billed in bread (the loaf).' : 'Billed in bread.'));
        const keys = [1, 2, 3, 4, 6, 8]; let fk = 1; keys.forEach(function (k) { if (k <= s) fk = k; });
        const cnt = keys.filter(function (k) { return k <= s; }).length;
        if (cnt > S.frag) { S.frag = cnt; persist('frag', S.frag); }
        invHead.textContent = 'INVOICE: Rubber Duck Therapy, Session ' + s;
        invTorn.textContent = 'Pond Quarterly, Issue 4 (1987), page 7 1/2: ' + (FRAG[fk] || FRAG[1]);
        while (invRows.firstChild) invRows.removeChild(invRows.firstChild);
        while (invStampAt.firstChild) invStampAt.removeChild(invStampAt.firstChild);
        invPay.hidden = true; invNext.hidden = true; inv.hidden = false; reveal(inv);
        S.inv = { done: false, ready: false };
        rows.forEach(function (r, i) { later(slow(450 * (i + 1)), function () { invRows.appendChild(el('li', { text: r })); sfx('tick'); }); });
        later(slow(450 * (rows.length + 1)), function () {
          if (!S.inv) return;
          S.inv.ready = true; invPay.hidden = false; invNext.hidden = false;
          later(slow(12000), function () { invoiceDone(false); });
        });
      }
      function payInvoice() { if (S.inv && S.inv.ready && !S.inv.done) invoiceDone(true); }
      function invoiceDone(paid) {
        const I = S.inv; if (!I || I.done || !I.ready) return;
        I.done = true;
        invStampAt.appendChild(el('div', { class: cl('stamp'), text: paid ? 'PAID' : 'PENDING POND' }));
        sfx(paid ? 'stamp' : 'buzz');
        if (paid) { say('Paid. The duck will not remember this. The duck remembers everything.', { mood: 'smug', priority: 1 }); api.achieve(ST('invoice')); }
        later(slow(1500), finishSession);
      }
      function finishSession() {
        const s = S.session;
        inv.hidden = true; S.inv = null;
        api.stat.inc(ST('sessions')); api.award(5, 'session end'); if (s === 1) api.achieve(ST('hour'));
        S.notesDone = Math.max(S.notesDone, s); tmpClass(clipBtn, cl('fresh'), 2200);
        if (s >= 10) { discharge(); return; }
        S.session = s + 1; persist('session', S.session);
        startSession('next');
      }

      /* ------------------------------------------------------------ the Discharge (the not-ending) */
      function discharge() {
        go('discharge'); S.wellOverride = ''; paintStrip();
        seq([
          [300, function () { say('The duck has stood up for the first time. The armchair has tipped forward. The duck would like it noted that this is a waddle and not a walk.', { mood: 'proud', priority: 1 }); room.classList.add(cl('stand')); sfx('whoosh'); }],
          [3400, function () { say('A mortarboard has landed on the duck. Nobody threw it. It was always going to land.', { mood: 'proud', priority: 1 }); room.classList.add(cl('mb')); sfx('pop'); }],
          [3200, function () {
            say('{player}, having completed 55 counsels across 10 sessions of decreasing length, you are hereby discharged, cured of Nothing, with all the rights and privileges thereof, which are none.', { mood: 'proud', priority: 2, duration: 9000 });
            sfx('tada'); api.confetti(); api.award(S.discharged ? 2 : 25, 'discharge'); api.stat.inc(ST('discharges')); api.achieve(ST('discharge'));
            api.flag.set(ST('discharged'), true); S.discharged = true; tmpClass(duckw, cl('thrilled'), 600);
          }],
          [5200, function () {
            certName.textContent = pname(); cert.hidden = false; reveal(cert);
            say('The certificate is printed on bread. Please do not eat the certificate. Please do eat the certificate.', { mood: 'proud', priority: 1 });
            S.wellOverride = 'Wellness: 100% +/- 100%'; paintStrip();
            api.setTimeout(function () { if (S.scene === 'discharge') say('Wellness: 100% plus or minus 100%. The duck has gently turned it back to 7%. The duck knows what it is doing. The duck is a professional.', { mood: 'smug', priority: 1 }); }, slow(1800));
            api.setTimeout(function () { S.wellOverride = ''; paintStrip(); tmpClass(wellEl, cl('sym'), 400); }, slow(3000));
            api.setTimeout(function () { if (S.scene === 'discharge') say('You have completed Rubber Duck Therapy. The duck would like to begin again, in the sense that it never stopped.', { mood: 'smug', priority: 1 }); }, slow(3600));
          }],
          [4800, function () {
            cert.hidden = true; S.tiny = true; persist('tiny', true); api.flag.set(ST('tinyDuck'), true); paintShelf();
            say('The duck has given you a tiny rubber duck of your own. It is on the shelf. It will stay there. It is looking at you.', { mood: 'proud', priority: 1 }); sfx('ding');
          }],
          [4200, function () {
            speech('Quack.'); sub('Thank you.', true); tmpClass(intT, cl('sym'), 600);
            api.setTimeout(function () { if (S.scene === 'discharge') sub('Please disregard my feelings.', true); }, slow(2600));
            say('The Interpreter has translated one quack correctly. Management has asked that it not be done again.', { mood: 'confused', priority: 1 });
          }],
          [4200, function () {
            S.frag = 7; persist('frag', 7); S.notesDone = 10; paintShelf();
            S.noteIdx = 0; showNote({ hand: true });
            say('The clipboard shows the last note, and the torn page has been completed. It reads: You were doing fine. It has been pinned to the wall. It is staying.', { mood: 'proud', priority: 1 });
          }],
          [4200, function () {
            closeNote(); go('survey'); paintStrip(); surv.hidden = false; reveal(surv);
            S.sv = { set: {}, n: 0, tok: 0 };
            survBtns.forEach(function (b) { b.disabled = false; });
            const tok = ++S.sv.tok;
            api.setTimeout(function () { if (S.sv && S.sv.tok === tok) survEnd(); }, api.selftest ? 1000 : 12000);
          }]
        ]);
      }
      function survAnswer(i) {
        const V = S.sv; if (!V || S.scene !== 'survey') return;
        noteInput();
        if (!V.set[i]) { V.set[i] = true; V.n++; if (survBtns[i]) survBtns[i].disabled = true; }
        say(SURVR[Math.min(4, Math.max(0, V.n - 1))], { mood: 'proud', priority: 1 }); sfx('blip');
        if (V.n >= 5) { survEnd(); return; }
        const tok = ++V.tok;
        api.setTimeout(function () { if (S.sv && S.sv.tok === tok) survEnd(); }, api.selftest ? 1000 : 8000);
      }
      function survEnd() {
        if (!S.sv) return;
        S.sv = null; surv.hidden = true;
        const d = S.diary.slice(-3).reverse();
        const steps = (d.length ? d : [null]).map(function (t, i) {
          return [i === 0 ? 300 : 3000, function () { say(t ? 'From the duck\'s diary: \'Dear Pond, today someone said: %TEXT. I did not solve it. I am proud.\'' : 'From the duck\'s diary: \'Dear Pond, today someone said nothing. I did not solve it. I am proud.\'', { mood: 'proud' }, { text: t || '' }); }];
        });
        steps.push([3500, resetLoop]);
        seq(steps);
      }
      function resetLoop() {
        go('reset');
        room.classList.remove(cl('stand')); room.classList.remove(cl('mb'));
        dim.classList.add(cl('dip2')); api.setTimeout(function () { dim.classList.remove(cl('dip2')); }, 700);
        S.session = 1; S.loop++; S.wellOverride = ''; persist('session', 1); persist('loop', S.loop);
        api.achieve(ST('loop')); api.stat.inc(ST('loops'));
        S.cin = 0; paintAll();
        say('Session 1 of 1. Please sit.', { mood: 'neutral', priority: 1 });
        seq([
          [2500, function () { say('The hour has been restored. It was never gone. It was just very short.', { mood: 'smug', priority: 1 }); }],
          [2500, function () {
            startSession('loop');
            const k = S.loop, words = LOOPW.slice(0, Math.min(LOOPW.length, k));
            speech(words.join(', ') + '.');
          }],
          [2500, function () { say('The duck said one word that was not in the vocabulary: \'Welcome back.\' Management has retroactively approved it and will be speaking to the duck about it.', { mood: 'smug', priority: 1 }); }],
          [2500, function () { speech('Bread.'); say('We are not discussing the bread.', { mood: 'neutral', priority: 1 }); }],
          [2500, function () { say('Nothing in the Alliance gauge has changed. The tiny duck remains.', { mood: 'smug', priority: 1 }); }]
        ]);
      }

      /* ------------------------------------------------------------ the painted door */
      function door() {
        noteInput();
        if (S.scene !== 'play' || S.away || S.cin >= sessLen() || (S.session === 6 && S.cin === 2)) { say('The door is painted on. It is not available at this time.', { mood: 'confused' }); return; }
        go('door'); corClock.hidden = false; sfx('bell');
        say('We do not go there.', { mood: 'panic', priority: 1 });
        api.achieve(ST('corridor'));
        later(api.selftest ? 1200 : 7500, function () {
          corClock.hidden = true;
          say('You have returned from the corridor. The duck was on a bench. The bench is not on the floor plan.', { mood: 'confused', priority: 1 });
          go('play');
        });
      }

      /* ------------------------------------------------------------ the frame loop and the slow tick */
      let lastF = api.now();
      function frame() {
        if (api.destroyed) return;
        const now = api.now(), dt = clamp((now - lastF) / 1000, 0, 0.1);
        lastF = now;
        if (press) {
          const held = now - press.t0;
          duckw.style.setProperty('--dt-squish', String(num(clamp(held / 450, 0, 1) * (press.dash ? 1.25 : 1), 0).toFixed(3)));
          if (!press.dash && held >= 220) { press.dash = true; sfx('honk'); paintThought(); }
          if (held >= 4000) { press.hug = true; endPress('hug'); }
        }
        if (!S.drag) {
          if (S.session >= 5 && S.scene === 'play' && !S.away) S.awayT = Math.min(S.maxX, S.awayT + 1.5 * dt);
          S.chairX += (S.awayT - S.chairX) * Math.min(1, dt * 4);
        }
        S.awayT = clamp(S.awayT, 0, Math.max(0, S.maxX)); S.chairX = clamp(S.chairX, 0, Math.max(0, S.maxX));
        if (Math.abs(S.chairX - S.shownX) > 0.2) { S.shownX = S.chairX; chair.style.setProperty('--dt-chair-x', num(S.chairX, 0).toFixed(1) + 'px'); }
        if (S.session >= 5 && S.scene === 'play') {
          if (S.awayT > 40) sessM().far = true;
          if (sessM().far && S.chairX <= 16 && now - S.lastClose > 15000) { S.lastClose = now; api.award(0.2, 'personal space'); say('Personal space. The duck has said the words, quietly, in the tone of a person at a bus stop.', { mood: 'smug' }); }
        }
        for (let i = S.bubbles.length - 1; i >= 0; i--) {
          const b = S.bubbles[i];
          b.u += b.vy * dt;
          const wob = S.reduce ? 0 : Math.sin(b.ph + b.u * 0.045) * 8;
          let x, y;
          if (S.narrow) { x = S.pw - b.w - 4 - b.u; y = clamp(b.lane + wob, 2, Math.max(2, S.ph - b.h - 2)); if (x < -b.w) { rmBubble(i); continue; } }
          else { y = S.ph - b.h - 6 - b.u; x = clamp(b.lane + wob, 2, Math.max(2, S.pw - b.w - 2)); if (y < -b.h) { rmBubble(i); continue; } }
          b.x = x; b.y = y;
          b.el.style.transform = 'translate(' + num(x, 0).toFixed(1) + 'px,' + num(y, 0).toFixed(1) + 'px)';
        }
        if (S.spin) {
          const p = clamp((now - S.spin.t0) / S.spin.dur, 0, 1);
          paintClock(S.spin.from + (S.spin.to - S.spin.from) * (1 - Math.pow(1 - p, 3)));
          if (p >= 1) { S.spin = null; paintClock(); }
        }
        api.requestAnimationFrame(frame);
      }
      let tickN = 0;
      function slowTick() {
        if (api.destroyed) return;
        const now = api.now(), hidden = document.hidden || document.visibilityState === 'hidden';
        layout();
        if (tickN++ % 10 === 0) S.reduce = reducedMotion();
        if (S.interpOff && now >= S.interpUntil) interpBack();
        const dtk = Math.max(0, Math.min(2000, now - S.lastTick)); S.lastTick = now;
        if (!hidden && S.idleStep < 3) S.act += dtk; /* wall-clock presence: invoices, shares and the discharge count too */
        if (hidden || S.scene !== 'play' || S.limp || (S.away && S.away !== 'idle')) return;
        const idle = now - S.lastInput, T = function (s) { return s * 1000 * K; };
        if (S.idleStep < 1 && idle >= T(20)) { S.idleStep = 1; say(nx('idl1', IDLE1), { mood: 'neutral' }); }
        if (S.idleStep < 2 && idle >= T(45)) { S.idleStep = 2; say(nx('idl2', IDLE2), { mood: 'smug' }); }
        if (S.idleStep < 3 && idle >= T(90)) {
          S.idleStep = 3; setAway('idle', 0); signEl.textContent = 'BACK IN 5';
          say('The duck has put out a small sign: BACK IN 5. The duck is, if you look carefully, behind the chair. Eating.', { mood: 'smug', priority: 1 });
        }
        if (S.idleStep < 4 && idle >= T(150)) {
          S.idleStep = 4; clearAway(false); S.away = null; duckw.classList.add(cl('asleep')); zzEl.hidden = false; addBubble('snore');
          say('The duck has fallen asleep. Legally, a sleeping duck is the same as a therapist who is listening very hard.', { mood: 'smug', priority: 1 });
        }
        if (S.idleStep < 5 && idle >= T(240)) {
          S.idleStep = 5; duckw.classList.remove(cl('asleep')); zzEl.hidden = true; setAway('idle', 0); signEl.textContent = 'Gone to the pond. Think about what you said.'; sandEl.hidden = true;
          say('The duck has left a note: \'Gone to the pond. Think about what you said.\' You did not say anything. The duck is aware.', { mood: 'smug', priority: 1 });
          sub('You did not have to say anything. This was the session.', true); api.achieve(ST('idle'));
          while (S.rc < 11) rcptAdd(RCPT[S.rc % RCPT.length]);
          rcptAdd('TOTAL ..... 1 sandwich');
        }
        /* extra idle beats between the big ones: only the latest passed threshold speaks, so a long gap never floods the narrator */
        let ix = -1; for (let i = S.idleX; i < IDLEX.length; i++) if (idle >= T(IDLEX[i][0])) ix = i;
        if (ix >= 0) {
          S.idleX = ix + 1; const e = IDLEX[ix];
          if (e[2] === 'sign' && S.away === 'idle') signEl.textContent = 'BACK IN 5 (UPDATED)';
          say(e[1], { mood: 'smug' });
        }
        /* the long clock: a surprise at 3 minutes and at 10 (scaled down in the fuzz run) while the player is actually here */
        if (S.idleStep === 0 && !S.echo && !S.away) {
          if (!S.b3 && S.act >= T(180)) beat3();
          else if (S.b3 && !S.b10 && S.act >= T(600)) beat10();
          else if (now - S.lastSayT >= T(24) && idle < T(18)) say(nx('beat', (S.session >= 5 || S.loop > 0) ? BEATS.concat([BEAT_LOAF]) : BEATS), { mood: 'neutral' });
        }
        /* the Receipt of Silence: the clipboard prints a bill for every few seconds of nothing */
        if (idle >= T(20) && S.idleStep < 6) { const want = Math.min(11, 1 + Math.floor((idle - T(20)) / T(9))); while (S.rc < want) rcptAdd(RCPT[S.rc % RCPT.length]); }
        if (S.idleStep >= 3) {
          const n = Math.floor((idle - T(90)) / T(10));
          while (S.restN < n && S.restN < 30) { S.restN++; api.award(0.1, 'rest'); api.stat.inc(ST('rest'), 10); }
          restEl.hidden = false; restEl.textContent = 'Minutes of Rest Provided: ' + Math.floor(S.restN * 10 / 60);
        }
      }
      function reducedMotion() {
        try { return !!(root.closest && root.closest('.pm-reduce-motion')) || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; }
      }

      /* ------------------------------------------------------------ wiring */
      api.on(duck, 'pointerdown', function (e) { if (e.button !== 0) return; startPress('ptr', e); });
      api.on(duck, 'keydown', function (e) { if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter' || e.code === 'Space') { e.preventDefault(); if (!e.repeat) startPress('key', null); } });
      api.on(duck, 'click', function (e) { if (e.detail !== 0 || press || api.now() - lastEndT < 350) return; startPress('click', null); endPress('click'); });
      api.on(duck, 'lostpointercapture', function () { if (press && press.src === 'ptr') endPress('lost'); });
      api.on(duck, 'contextmenu', function (e) { e.preventDefault(); });
      api.on(chair, 'contextmenu', function (e) { e.preventDefault(); });
      api.on(document, 'keyup', function (e) { if (press && press.src === 'key' && (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter' || e.code === 'Space')) endPress('key'); });
      api.on(root, 'pointerup', function () { if (press && press.src === 'ptr') endPress('up'); endDrag(); });
      api.on(root, 'pointercancel', function () { if (press && press.src === 'ptr') endPress('cancel'); endDrag(); });
      api.on(window, 'blur', function () { endPress('blur'); endDrag(); });
      api.on(window, 'resize', layout);
      api.on(document, 'visibilitychange', function () {
        if (document.hidden || document.visibilityState === 'hidden') { S.hiddenAt = api.now(); endPress('hidden'); endDrag(); }
        else if (S.hiddenAt) {
          const gone = api.now() - S.hiddenAt; S.hiddenAt = 0; S.lastInput += gone;
          if (gone >= 3000 && S.scene === 'play') say('You left in the middle of a session. The duck noticed. The duck was not hurt. The duck has written \'was not hurt\' fourteen times.', { mood: 'disappointed', priority: 1 });
        }
      });
      api.on(chair, 'pointerdown', function (e) {
        if (S.session < 5 || e.button !== 0 || duck.contains(e.target) || beakB.contains(e.target) || S.drag) return;
        S.drag = { id: e.pointerId, x0: num(e.clientX, 0), cx0: S.chairX, startX: S.chairX };
        try { chair.setPointerCapture(e.pointerId); } catch (_) { /* no active pointer */ }
      });
      api.on(chair, 'lostpointercapture', function () { endDrag(); });
      api.on(root, 'pointermove', function (e) {
        const now = api.now(), cx = num(e.clientX, 0), cy = num(e.clientY, 0);
        if (press && press.src === 'ptr' && S.session >= 5 && S.scene === 'play' && e.pointerId === press.id && Math.abs(cx - press.x0) > 8) {
          const x0 = press.x0; endPress('drag'); S.drag = { id: e.pointerId, x0: x0, cx0: S.chairX, startX: S.chairX };
        }
        if (S.drag && e.pointerId === S.drag.id) S.chairX = clamp(S.drag.cx0 + (cx - S.drag.x0), 0, Math.max(0, S.maxX));
        if (S.idleStep >= 3 && Math.hypot(cx - S.mx, cy - S.my) >= 12) wake();
        S.mx = cx; S.my = cy;
        if (S.session >= 2 && now - S.eyeT >= 60) {
          S.eyeT = now; const r = duck.getBoundingClientRect();
          duckw.style.setProperty('--ex', clamp((cx - (r.left + r.width / 2)) / 160, -1, 1).toFixed(2)); duckw.style.setProperty('--ey', clamp((cy - (r.top + r.height / 2)) / 160, -1, 1).toFixed(2));
        }
      });
      api.on(root, 'pointerdown', function () { noteInput(); });
      api.on(root, 'keydown', function () { noteInput(); });
      api.on(document, 'keydown', function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        noteInput();
        const t = e.target, tag = t && t.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return;
        if (e.key >= '1' && e.key <= '5' && S.scene === 'play') { pickNote(Number(e.key) - 1, false); }
        else if (e.key === 'n' || e.key === 'N') nod();
      });
      api.on(input, 'keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submit(input.value); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (S.diary.length) { input.value = S.diary[S.diary.length - 1]; S.recalled = S.diary[S.diary.length - 1]; } }
        else if (e.key === 'Escape') { input.value = ''; }
      });
      api.on(cush, 'click', function () { if (S.away && S.away !== 'idle') say('Please. Respect my cushion.', { mood: 'disappointed' }); });
      api.on(tray, 'click', function (e) { const b = e.target && e.target.closest ? e.target.closest('button') : null; const i = trayEls.indexOf(b); if (i >= 0) pickNote(i, false); });
      api.on(pool, 'click', function (e) { const b = e.target && e.target.closest ? e.target.closest('button') : null; for (let i = 0; i < S.bubbles.length; i++) if (S.bubbles[i].el === b) { popBubble(S.bubbles[i]); break; } });
      api.on(shelf, 'click', function (e) {
        const b = e.target && e.target.closest ? e.target.closest('button') : null, k = b && b.getAttribute('data-k'); if (!k) return;
        noteInput();
        if (k === 'loaf') { sfx('pop'); if (!spamSay('loaf')) say(nx('loaf', LOAFL), { mood: 'smug' }); }
        else if (k === 'sec') say('Security is monitoring the session. Security has no authority and a very good hat.', { mood: 'smug' });
        else if (k === 'tiny') { say(nx('tinyd', TINYL), { mood: 'proud' }); sfx('blip'); }
        else if (k === 'page') say(nx('pagep', PAGEL), { mood: 'proud' });
      });
      api.on(beakB, 'click', boop);
      api.on(nodBtn, 'click', nod);
      api.on(pullBtn, 'click', function () { noteInput(); S.awayT = Math.max(0, S.awayT - 40); sfx('boing'); say(nx('pull', PULLC), { mood: 'smug' }); });
      api.on(clkBtn, 'click', function () {
        noteInput(); sfx('blip');
        if (spamSay('clk')) return;
        if (S.clockRight) say('The clock is correct at the moment. Please do not ask it to do that again. It is bashful.', { mood: 'confused' });
        else say(nx('clk', CLOCKL), { mood: 'confused' }, { N: 5 * S.cin });
      });
      api.on(denBtn, 'click', function () {
        noteInput(); sfx('blip');
        if (spamSay('den')) return;
        S.denN++;
        if (S.denN % 4 === 0) say(api.line('plantStatus'), { mood: 'smug' });
        else if (S.denN === 2 && (api.flag.get('plantClicked') || api.flag.get('metDennis'))) say('Dennis (Plant) has been clicked in other departments. He confirms it is the same click. He confirms he is the same plant. He confirms nothing else.', { mood: 'smug' });
        else say(nx('den', DENNIS), { mood: 'smug' });
      });
      api.on(dipBtn, 'click', function () { noteInput(); sfx('blip'); if (!spamSay('dip')) say(nx('dip', DIPL), { mood: 'smug' }); });
      api.on(doorBtn, 'click', door);
      api.on(phBtn, 'click', function () { noteInput(); if (S.echo && S.echo.kind === 'phone') echoFail('decline'); else if (!spamSay('ph')) say(nx('phn', PHONEL), { mood: 'confused' }); });
      api.on(clipBtn, 'click', function () { noteInput(); clipClick(); });

      /* ------------------------------------------------------------ go */
      S.reduce = reducedMotion();
      layout();
      startSession('mount');
      api.requestAnimationFrame(frame);
      api.setInterval(slowTick, 500);
      return { destroy: function () { endPress('drag'); } };
    }
  });
})();
