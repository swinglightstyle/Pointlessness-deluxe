/* POINTLESS module: dennis-review */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-dennis-review-wrap{--dr-paper:#FFF6E0;--dr-ink:#2B2B2B;--dr-leaf:#5BBF72;--dr-leaf2:#2F7D4A;--dr-coral:#FF6F59;--dr-stamp:#C4262E;--dr-mustard:#F5C84C;--dr-lilac:#B9A6E8;--dr-mint:#BDEFD5;--dr-terra:#D9774A;--dr-sage:#CFE3C4;--dr-board:#B98A52;--dr-desk:#8A5A2E;--dr-navy:#1D2B4F;--dr-tilt:0deg;position:relative;container-type:inline-size;min-height:420px;padding:14px 10px 24px;color:var(--dr-ink);font:15px/1.35 'Trebuchet MS','Arial Rounded MT Bold',system-ui,sans-serif;background:repeating-linear-gradient(90deg,#8A5A2E 0 38px,#835428 38px 40px)}
.m-dennis-review-wrap *{box-sizing:border-box}.m-dennis-review-wrap button,.m-dennis-review-wrap textarea{font-family:inherit;color:var(--dr-ink)}.m-dennis-review-wrap button:focus-visible,.m-dennis-review-wrap textarea:focus-visible,.m-dennis-review-trk:focus-visible{outline:3px solid var(--dr-mustard);box-shadow:0 0 0 5px var(--dr-ink)}.m-dennis-review-wrap button[aria-disabled=true]{opacity:.55;cursor:default}.m-dennis-review-wrap.m-dennis-review-cream{background:var(--dr-paper)}.m-dennis-review-wrap .m-dennis-review-dennis:focus-visible{outline-offset:-4px;box-shadow:inset 0 0 0 4px var(--dr-ink)}
.m-dennis-review-board{position:relative;max-width:980px;margin:0 auto;padding:30px 12px 12px;background:var(--dr-board);border:3px solid var(--dr-ink);border-radius:14px;box-shadow:4px 4px 0 var(--dr-ink);transform:rotate(var(--dr-tilt));transition:transform .35s cubic-bezier(.3,1.6,.5,1),filter 1.5s}.m-dennis-review-cream .m-dennis-review-board{filter:saturate(.2)}.m-dennis-review-clip{position:absolute;top:-10px;left:50%;width:132px;height:34px;margin-left:-66px;border:3px solid var(--dr-ink);border-radius:8px;background:linear-gradient(#fff3b8,var(--dr-mustard) 55%,#d9a62a);z-index:3}
.m-dennis-review-clip:after{content:'';position:absolute;left:50%;top:9px;width:38px;height:10px;margin-left:-19px;border:2px solid var(--dr-ink);border-radius:5px;background:#e9e2cf}.m-dennis-review-paper{position:relative;padding:10px 12px 12px;background:radial-gradient(#d9e4d0 1px,transparent 1px) 0 0/14px 14px,var(--dr-paper);border:3px solid var(--dr-ink);border-radius:10px}.m-dennis-review-head{display:flex;flex-wrap:wrap;gap:4px 14px;align-items:flex-start;justify-content:space-between;border-bottom:3px double var(--dr-ink);padding-bottom:8px;margin-bottom:10px}
.m-dennis-review-letter{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--dr-navy);flex:1 1 100%}.m-dennis-review-formid{font:900 1.05rem/1.15 Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.03em;flex:1 1 220px;min-width:0}.m-dennis-review-compbox{display:inline-block;margin-top:4px;padding:2px 8px;border:2px solid var(--dr-ink);border-radius:6px;background:var(--dr-mustard);font:800 .68rem/1.3 'Trebuchet MS',system-ui,sans-serif;letter-spacing:.04em;transform:rotate(-1.5deg)}
.m-dennis-review-hlines{display:flex;flex-direction:column;gap:2px;font-size:.78rem;flex:1 1 220px;min-width:0}.m-dennis-review-hl{display:block;overflow-wrap:anywhere}.m-dennis-review-strike{text-decoration:line-through;text-decoration-color:var(--dr-stamp);text-decoration-thickness:3px}.m-dennis-review-crayon{display:block;font:700 .9rem 'Segoe Print','Bradley Hand','Comic Sans MS',cursive;color:var(--dr-stamp);clip-path:inset(0 100% 0 0);height:0;overflow:hidden;overflow-wrap:anywhere}
.m-dennis-review-wrap.m-dennis-review-p2 .m-dennis-review-crayon{height:auto;clip-path:inset(0 0 0 0);transition:clip-path .9s steps(18)}.m-dennis-review-blink{animation:m-dennis-review-flick 1s steps(2) 1}.m-dennis-review-cols{display:flex;gap:12px;align-items:flex-start}.m-dennis-review-stage{flex:0 0 34%;min-width:0;display:flex;flex-direction:column;gap:6px;align-items:stretch}.m-dennis-review-right{flex:1;min-width:0;position:relative;display:flex;flex-direction:column;gap:8px}
.m-dennis-review-wall{position:relative;overflow:hidden;border:3px solid var(--dr-ink);border-radius:10px;background:linear-gradient(#e8f1dd,#cfe3c4);min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;box-shadow:3px 3px 0 var(--dr-ink)}.m-dennis-review-win{position:absolute;left:8%;top:10px;width:46%;height:70px;border:3px solid var(--dr-ink);border-radius:6px;background:linear-gradient(#bfe4f5,#eaf7fb);overflow:hidden}
.m-dennis-review-sun{position:absolute;width:22px;height:22px;border-radius:50%;background:var(--dr-mustard);border:2px solid var(--dr-ink);left:0;bottom:-6px;animation:m-dennis-review-sunarc 60s linear infinite alternate}.m-dennis-review-beam{position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,236,150,.55),transparent 55%);pointer-events:none}.m-dennis-review-dennis{position:relative;display:block;width:100%;max-width:220px;background:none;border:0;padding:0;margin:0 auto;cursor:pointer;line-height:0}
.m-dennis-review-dennis svg{width:100%;height:auto;max-height:260px;overflow:visible}.m-dennis-review-plant{transform-origin:110px 250px;animation:m-dennis-review-sway 4s ease-in-out infinite alternate}.m-dennis-review-rev .m-dennis-review-plant{animation-name:m-dennis-review-sway2}.m-dennis-review-foliage{transform:rotate(var(--lean,0deg));transform-origin:110px 150px;transition:transform .4s}.m-dennis-review-breathe{transform-origin:110px 250px;animation:m-dennis-review-breathe 4s ease-in-out infinite}
.m-dennis-review-leaf{transform:rotate(calc(var(--a) + var(--droop,0) * var(--dir) * 38deg));transform-origin:0 0;transition:transform .8s ease}.m-dennis-review-dennis:hover .m-dennis-review-leaf{animation:m-dennis-review-rustle .7s ease-in-out var(--dl) 2}.m-dennis-review-wig .m-dennis-review-leaf{animation:m-dennis-review-rustle .5s ease-in-out var(--dl) 2}.m-dennis-review-leaf.m-dennis-review-gone{display:none}.m-dennis-review-leaf.m-dennis-review-fall{transform:rotate(calc(var(--a) + 70deg)) translateY(90px);opacity:0;transition:transform 1s,opacity 1s}
.m-dennis-review-nameplate{font:800 .66rem/1.2 system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;text-align:center;border:2px solid var(--dr-ink);border-radius:6px;background:var(--dr-mustard);padding:2px 6px;margin:4px auto 6px}.m-dennis-review-draft{font:italic .72rem/1.3 'Segoe Print','Comic Sans MS',cursive;text-align:center;padding:2px 4px}.m-dennis-review-dcomm{border:2px dashed var(--dr-ink);border-radius:8px;background:#fffdf4;padding:5px 8px;min-height:3.2em}
.m-dennis-review-dlabel{display:block;font:800 .62rem system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--dr-navy)}.m-dennis-review-dtext{display:block;font:700 .95rem 'Segoe Print','Bradley Hand','Comic Sans MS',cursive;color:var(--dr-leaf2);overflow-wrap:anywhere}.m-dennis-review-bm{position:absolute;right:-12px;width:12px;height:22px;background:var(--dr-leaf);border:2px solid var(--dr-ink);border-radius:2px 8px 2px 8px}.m-dennis-review-flower{position:absolute;right:14px;bottom:8px;width:30px;height:48px;pointer-events:none}
.m-dennis-review-flower i{position:absolute;width:11px;height:11px;border-radius:50%;background:#fff;border:2px solid var(--dr-ink)}.m-dennis-review-flower i:nth-child(1){left:9px;top:0}.m-dennis-review-flower i:nth-child(2){left:0;top:9px}.m-dennis-review-flower i:nth-child(3){left:18px;top:9px}.m-dennis-review-flower i:nth-child(4){left:9px;top:18px}
.m-dennis-review-flower b{position:absolute;left:10px;top:10px;width:10px;height:10px;border-radius:50%;background:var(--dr-mustard);border:2px solid var(--dr-ink);z-index:2}.m-dennis-review-flower u{position:absolute;left:14px;top:26px;width:3px;height:24px;background:var(--dr-leaf2)}.m-dennis-review-can{position:absolute;z-index:30;width:34px;height:26px;margin:-20px 0 0 -30px;border:3px solid var(--dr-ink);border-radius:6px 6px 10px 10px;background:#9fb8c8;pointer-events:none;display:none}
.m-dennis-review-can:before{content:'';position:absolute;left:-18px;top:2px;width:20px;height:6px;border:3px solid var(--dr-ink);background:#9fb8c8;transform:rotate(-30deg);transform-origin:right center}.m-dennis-review-can.m-dennis-review-on{display:block}.m-dennis-review-drop{position:absolute;z-index:25;pointer-events:none;font-size:14px;animation:m-dennis-review-fallx 1s ease-in forwards}.m-dennis-review-compact .m-dennis-review-wall{min-height:120px}.m-dennis-review-compact .m-dennis-review-dennis{max-width:100px}
.m-dennis-review-faces{display:grid;perspective:1200px;min-width:0}.m-dennis-review-face{grid-area:1/1;min-width:0;backface-visibility:hidden;transition:transform .9s ease,opacity .3s}.m-dennis-review-back{transform:rotateY(180deg)}.m-dennis-review-flipped .m-dennis-review-front{transform:rotateY(-180deg)}.m-dennis-review-flipped .m-dennis-review-back{transform:rotateY(0)}.m-dennis-review-fade .m-dennis-review-face{transform:none!important;backface-visibility:visible;transition:none}.m-dennis-review-card{position:relative;display:flex;gap:10px;align-items:flex-start}.m-dennis-review-card.m-dennis-review-curl{animation:m-dennis-review-curl .5s ease-in-out}
.m-dennis-review-card.m-dennis-review-shake{animation:m-dennis-review-shk .22s linear 1}.m-dennis-review-card.m-dennis-review-half .m-dennis-review-main{clip-path:polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%);padding-inline:12px}.m-dennis-review-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px;transition:filter .4s}.m-dennis-review-dim .m-dennis-review-main{filter:brightness(.82) saturate(.7)}.m-dennis-review-ctitle{margin:0;font:900 1.25rem/1.15 'Trebuchet MS',system-ui,sans-serif;color:var(--dr-navy)}
.m-dennis-review-cdesc{margin:0;font-size:.82rem;font-style:italic;color:#4a4a4a}.m-dennis-review-legend{font-size:.7rem;font-weight:700;letter-spacing:.03em;color:var(--dr-navy)}.m-dennis-review-sl{position:relative;margin:6px 22px 0}.m-dennis-review-trk{position:relative;height:48px;touch-action:none;cursor:pointer;outline:none;-webkit-user-select:none;user-select:none}.m-dennis-review-rail{position:absolute;left:0;right:0;top:17px;height:14px;border:3px solid var(--dr-ink);border-radius:8px;background:#fff}
.m-dennis-review-zone{position:absolute;top:17px;height:14px;border:3px solid var(--dr-ink);border-left:0;border-radius:0 8px 8px 0;background:repeating-linear-gradient(45deg,var(--dr-mustard) 0 6px,var(--dr-sage) 6px 12px)}.m-dennis-review-zlabel{position:absolute;top:-2px;font:900 .56rem/1 system-ui,sans-serif;letter-spacing:.06em;white-space:nowrap;color:var(--dr-ink);transform-origin:left top}
.m-dennis-review-flap{position:absolute;top:8px;height:32px;border:3px solid var(--dr-ink);border-radius:6px;background:var(--dr-paper);display:flex;align-items:center;justify-content:center;font:900 .6rem system-ui,sans-serif;letter-spacing:.08em;text-align:center;overflow:hidden;z-index:2}.m-dennis-review-stop{position:absolute;left:0;top:0;bottom:0;width:10px;background:var(--dr-mustard);border-right:3px solid var(--dr-ink)}.m-dennis-review-crack{position:absolute;inset:0;width:100%;height:100%}
.m-dennis-review-crack polyline{fill:none;stroke:var(--dr-stamp);stroke-width:3;stroke-dasharray:200;stroke-dashoffset:200}.m-dennis-review-cracking .m-dennis-review-crack polyline{animation:m-dennis-review-crackdraw 1.2s linear forwards}.m-dennis-review-flap.m-dennis-review-gone{animation:m-dennis-review-flapfall .6s ease-in forwards}.m-dennis-review-flap.m-dennis-review-away{display:none}.m-dennis-review-tick{position:absolute;top:13px;width:2px;height:6px;background:var(--dr-ink);margin-left:-1px}
.m-dennis-review-pip{position:absolute;top:34px;transform:translateX(-50%);font:800 .68rem/1 system-ui,sans-serif;pointer-events:none}.m-dennis-review-pip:before{content:'';position:absolute;left:50%;top:-8px;width:3px;height:6px;background:var(--dr-ink);margin-left:-1px}.m-dennis-review-pip.m-dennis-review-lowpip{opacity:.4;text-decoration:line-through}.m-dennis-review-thumb{position:absolute;top:2px;width:44px;height:44px;margin-left:-22px;display:flex;align-items:center;justify-content:center;pointer-events:none;transition:transform .15s}
.m-dennis-review-thumb svg{width:34px;height:34px;filter:drop-shadow(2px 2px 0 var(--dr-ink))}.m-dennis-review-thumb .m-dennis-review-potsvg{display:none}.m-dennis-review-potthumb .m-dennis-review-thumb .m-dennis-review-potsvg{display:block}.m-dennis-review-potthumb .m-dennis-review-thumb .m-dennis-review-lsvg{display:none}.m-dennis-review-lying .m-dennis-review-thumb{transform:rotate(90deg)}.m-dennis-review-bump .m-dennis-review-thumb{animation:m-dennis-review-shk .2s linear 1}.m-dennis-review-band{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:3}
.m-dennis-review-band path{fill:none;stroke:var(--dr-coral);stroke-width:5;stroke-linecap:round;filter:drop-shadow(0 0 0 var(--dr-ink)) drop-shadow(1px 1px 0 var(--dr-ink))}.m-dennis-review-ro{font:700 .75rem 'Trebuchet MS',sans-serif;min-height:1.2em;text-align:center;color:var(--dr-navy)}.m-dennis-review-c1 .m-dennis-review-ro,.m-dennis-review-c2 .m-dennis-review-ro,.m-dennis-review-c3 .m-dennis-review-ro{display:none}.m-dennis-review-c2{margin-left:34px;margin-right:34px;transform:scale(.7);transform-origin:left center}.m-dennis-review-c3{margin:0;width:72px}
.m-dennis-review-c3 .m-dennis-review-trk{height:30px}.m-dennis-review-c3 .m-dennis-review-rail{top:8px;height:10px}.m-dennis-review-c3 .m-dennis-review-thumb{top:-2px;width:28px;height:28px;margin-left:-14px}.m-dennis-review-c3 .m-dennis-review-thumb svg{width:20px;height:20px}.m-dennis-review-c3 .m-dennis-review-pip{display:none}.m-dennis-review-sincwrap{display:none;align-items:center;gap:8px;flex-wrap:wrap;font-size:.72rem;font-weight:700}.m-dennis-review-on2 .m-dennis-review-sincwrap{display:flex}.m-dennis-review-gauge{display:flex;gap:2px}
.m-dennis-review-gauge i{width:11px;height:12px;border:2px solid var(--dr-ink);background:#fff;border-radius:2px}.m-dennis-review-gauge i.m-dennis-review-lit{background:var(--dr-coral)}.m-dennis-review-pull{font-size:.72rem;font-weight:700;min-height:1em;color:var(--dr-navy)}.m-dennis-review-cmlabel{font-size:.72rem;font-weight:800;color:var(--dr-navy)}.m-dennis-review-cm{width:100%;min-height:42px;resize:vertical;border:3px solid var(--dr-ink);border-radius:8px;padding:5px 8px;background:#fff;font-size:.85rem}
.m-dennis-review-cmreply{font-size:.74rem;font-style:italic;min-height:1.1em;overflow-wrap:anywhere}.m-dennis-review-btns{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.m-dennis-review-btn{min-height:44px;padding:6px 16px;border:3px solid var(--dr-ink);border-radius:12px;background:var(--dr-mustard);font-weight:900;font-size:.9rem;letter-spacing:.03em;cursor:pointer;box-shadow:4px 4px 0 var(--dr-ink);position:relative}
.m-dennis-review-btn:active{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--dr-ink)}.m-dennis-review-btn.m-dennis-review-sub2{background:var(--dr-lilac)}.m-dennis-review-btn.m-dennis-review-sub3{background:var(--dr-mint)}.m-dennis-review-btn.m-dennis-review-sub4{background:var(--dr-coral)}.m-dennis-review-badge{position:absolute;right:-6px;top:-12px;background:var(--dr-coral);border:2px solid var(--dr-ink);border-radius:6px;font-size:.55rem;padding:0 4px;transform:rotate(6deg)}.m-dennis-review-acc{font:800 .74rem system-ui,sans-serif;color:var(--dr-leaf2);min-height:1.1em}
.m-dennis-review-std{font-size:.76rem;font-style:italic;min-height:1.2em}.m-dennis-review-margin{flex:0 0 150px;display:flex;flex-direction:column;gap:5px;min-width:0}.m-dennis-review-att{font:700 .78rem 'Segoe Print','Comic Sans MS',cursive;color:var(--dr-coral);text-decoration:line-through;text-decoration-color:var(--dr-ink)}.m-dennis-review-dnote{font:italic 700 .76rem 'Segoe Print','Comic Sans MS',cursive;background:var(--dr-sage);border-radius:6px;padding:3px 7px;color:var(--dr-leaf2);transform:rotate(-1deg)}
.m-dennis-review-rc{border:3px solid var(--dr-ink);border-radius:10px;background:#fff;padding:7px 10px;min-height:3.3em;font-size:.82rem;font-weight:700;overflow-wrap:anywhere}.m-dennis-review-stamp{position:absolute;left:12%;top:90px;max-width:78%;padding:2px 12px;border:4px double var(--dr-stamp);border-radius:6px;color:var(--dr-stamp);font:900 22px/1.1 Impact,'Arial Black',system-ui,sans-serif;text-transform:uppercase;text-shadow:0 0 3px rgba(196,38,46,.5);mix-blend-mode:multiply;opacity:0;pointer-events:none;transform:rotate(var(--rot,-4deg));text-align:center;overflow-wrap:anywhere}
.m-dennis-review-stamp.m-dennis-review-go{animation:m-dennis-review-thunk var(--tk,.12s) ease-out both,m-dennis-review-fade var(--fd,2.5s) var(--hold,.9s) forwards}.m-dennis-review-stamp.m-dennis-review-ok{color:#1f8a52;border-color:#1f8a52;text-shadow:0 0 3px rgba(31,138,82,.5)}.m-dennis-review-stamp.m-dennis-review-dry{filter:grayscale(.4) opacity(.8)}.m-dennis-review-sticky{position:absolute;left:30%;top:150px;z-index:7;background:#F2B632;border:2px solid var(--dr-ink);padding:2px 8px;font:800 .8rem 'Segoe Print','Comic Sans MS',cursive;transform:rotate(3deg);pointer-events:none;box-shadow:2px 2px 0 var(--dr-ink)}
.m-dennis-review-caption{font-size:.7rem;font-weight:700;letter-spacing:.02em;overflow-wrap:anywhere}.m-dennis-review-hand{display:block;font:italic 700 .72rem 'Segoe Print','Comic Sans MS',cursive;color:var(--dr-stamp)}.m-dennis-review-drawer{margin-top:8px;border:2px solid var(--dr-ink);border-radius:8px;background:#fffdf4}
.m-dennis-review-dtoggle{width:100%;min-height:36px;text-align:left;padding:5px 10px;background:var(--dr-sage);border:0;border-radius:6px;font-weight:800;font-size:.76rem;cursor:pointer}.m-dennis-review-dlist{list-style:none;margin:0;padding:4px 10px 6px;font-size:.72rem;display:flex;flex-direction:column;gap:2px}.m-dennis-review-dlist[hidden]{display:none}.m-dennis-review-fnstrip{margin-top:8px;font-size:11px;line-height:1.35;display:flex;flex-direction:column;gap:1px;color:#444}
.m-dennis-review-fnbtn{min-height:24px;padding:0 8px;margin:2px 0;border:2px solid var(--dr-ink);border-radius:6px;background:var(--dr-lilac);font-size:11px;font-weight:800;cursor:pointer;align-self:flex-start}.m-dennis-review-foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 12px;margin-top:8px;padding-top:6px;border-top:2px dotted var(--dr-ink);font-size:.7rem;align-items:center}.m-dennis-review-prog{display:flex;align-items:center;gap:6px;font-weight:700}
.m-dennis-review-prog span.m-dennis-review-bar{display:flex;gap:1px}.m-dennis-review-bar i{width:8px;height:10px;border:1px solid var(--dr-ink);background:#fff}.m-dennis-review-bar i.m-dennis-review-lit{background:var(--dr-leaf)}.m-dennis-review-post{position:absolute;z-index:9;width:150px;padding:14px 10px 10px;background:#F4A7B9;border:2px solid var(--dr-ink);font:700 .72rem/1.3 'Segoe Print','Comic Sans MS',cursive;box-shadow:3px 4px 0 rgba(0,0,0,.28);animation:m-dennis-review-slap .35s ease-out;pointer-events:none}
.m-dennis-review-post:before,.m-dennis-review-peer:before,.m-dennis-review-appeal:before{content:'';position:absolute;left:50%;top:3px;width:9px;height:9px;margin-left:-5px;border-radius:50%;background:var(--dr-stamp);border:2px solid var(--dr-ink)}.m-dennis-review-post.m-dennis-review-curlaway{animation:m-dennis-review-away .5s ease-in forwards}.m-dennis-review-peerlayer{position:absolute;right:-6px;top:30px;width:min(210px,64%);z-index:12;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.m-dennis-review-peer{position:relative;padding:16px 10px 8px;background:#F2B632;border:2px solid var(--dr-ink);box-shadow:3px 4px 0 rgba(0,0,0,.3);font-size:.74rem;line-height:1.3;pointer-events:auto;animation:m-dennis-review-fly .7s ease-out;transform:rotate(var(--r,2deg))}.m-dennis-review-peer b{display:block;font-size:.76rem;margin-bottom:2px}.m-dennis-review-peer.m-dennis-review-fadeout{animation:m-dennis-review-away .6s ease-in forwards}.m-dennis-review-peer.m-dennis-review-staple{animation:m-dennis-review-shk .2s linear 1;border-top:6px solid #888}
.m-dennis-review-mini{min-height:30px;padding:2px 8px;margin:4px 3px 0 0;border:2px solid var(--dr-ink);border-radius:6px;background:var(--dr-paper);font-size:.68rem;font-weight:800;cursor:pointer}.m-dennis-review-appeal{position:absolute;z-index:14;right:6px;top:70px;width:min(230px,70%);padding:16px 10px 10px;background:#FFE55C;border:2px solid var(--dr-ink);box-shadow:3px 4px 0 rgba(0,0,0,.3);font-size:.76rem;animation:m-dennis-review-slap .3s ease-out}
.m-dennis-review-appeal.m-dennis-review-l2{top:120px;right:30px;width:170px;font-size:.66rem}.m-dennis-review-appeal.m-dennis-review-l3{top:170px;right:60px;width:96px;padding:12px 6px 6px;font-size:.5rem}.m-dennis-review-x{position:absolute;right:2px;top:0;min-height:22px;min-width:22px;border:0;background:none;font-weight:900;cursor:pointer}.m-dennis-review-ficus{position:absolute;right:4px;bottom:6px;width:70px;z-index:10;pointer-events:none;animation:m-dennis-review-slap .4s ease-out}
.m-dennis-review-ficus .m-dennis-review-fpot{height:26px;margin:0 8px;background:var(--dr-terra);border:3px solid var(--dr-ink);border-radius:2px 2px 8px 8px}.m-dennis-review-ficus .m-dennis-review-fbush{height:54px;margin-bottom:-3px;border-radius:50% 50% 40% 40%;background:var(--dr-leaf2);border:3px solid var(--dr-ink)}.m-dennis-review-ficus .m-dennis-review-fnote{position:absolute;left:-60px;top:20px;width:64px;padding:2px 4px;background:#F4A7B9;border:2px solid var(--dr-ink);font:700 .5rem 'Segoe Print','Comic Sans MS',cursive;transform:rotate(-6deg)}
.m-dennis-review-ghost{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;background:rgba(255,246,224,.7);pointer-events:none}.m-dennis-review-ghost svg{position:absolute;left:8%;top:56%;width:84%;height:22%}.m-dennis-review-ghost path{fill:none;stroke:var(--dr-leaf2);stroke-width:3;opacity:.55;stroke-linecap:round;stroke-dasharray:420;stroke-dashoffset:420;animation:m-dennis-review-scrawl 4s ease-out forwards}
.m-dennis-review-ghost span{position:relative;z-index:2;font:700 1.5rem 'Segoe Print','Comic Sans MS',cursive;color:var(--dr-leaf2);text-align:center;padding:0 10px;text-shadow:0 0 6px #fff6e0,0 0 6px #fff6e0}.m-dennis-review-sc{display:flex;flex-direction:column;gap:6px}.m-dennis-review-sctitle{margin:0;font:900 1.15rem Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.04em;color:var(--dr-navy)}.m-dennis-review-row{border:2px solid var(--dr-ink);border-radius:8px;background:#fff;padding:5px 8px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 8px;align-items:center}
.m-dennis-review-rlabel{font-weight:800;font-size:.82rem;overflow-wrap:anywhere}.m-dennis-review-meter{display:flex;gap:3px;align-items:center}.m-dennis-review-meter i{width:18px;height:11px;border:2px solid var(--dr-ink);border-radius:3px;background:#fff}.m-dennis-review-meter i.m-dennis-review-lit{background:var(--dr-lilac)}.m-dennis-review-meter i.m-dennis-review-half{background:linear-gradient(90deg,var(--dr-lilac) 50%,#fff 50%)}.m-dennis-review-meter i.m-dennis-review-fivestamp{background:var(--dr-mint)}.m-dennis-review-real{font:700 .72rem ui-monospace,Consolas,monospace;color:#6a6a6a;text-align:right}
.m-dennis-review-lock{font-size:.6rem;color:#6a6a6a;display:flex;align-items:center;gap:3px}.m-dennis-review-lock:before{content:'';width:9px;height:7px;border:2px solid #6a6a6a;border-radius:2px;display:inline-block}.m-dennis-review-rcom{grid-column:1/-1;font-size:.72rem;font-style:italic;overflow-wrap:anywhere}.m-dennis-review-banner{border:3px solid var(--dr-ink);border-radius:10px;background:var(--dr-sage);padding:8px 10px;font:900 .95rem/1.2 Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.03em;text-align:center;box-shadow:4px 4px 0 var(--dr-ink);overflow-wrap:anywhere;transform:rotate(-.6deg)}
.m-dennis-review-wline{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;font-size:.76rem;font-weight:700}.m-dennis-review-canicon{position:relative;width:26px;height:18px;border:3px solid var(--dr-ink);border-radius:5px 5px 8px 8px;background:#9fb8c8;display:inline-block;margin-right:12px}.m-dennis-review-canicon:before{content:'';position:absolute;left:-14px;top:0;width:14px;height:5px;border:3px solid var(--dr-ink);background:#9fb8c8;transform:rotate(-30deg);transform-origin:right center}
.m-dennis-review-hyd{height:14px;width:min(180px,100%);border:3px solid var(--dr-ink);border-radius:8px;background:repeating-linear-gradient(45deg,#fff 0 3px,#e6e6e6 3px 6px);overflow:hidden;position:relative}.m-dennis-review-hyd i{display:block;height:100%;width:0;background:#5bb4e0;transition:width .25s}.m-dennis-review-water{position:relative;min-width:56px;min-height:56px;font-size:1.4rem;line-height:1;overflow:hidden;border:3px solid var(--dr-ink);border-radius:10px 10px 18px 18px;background:#fff;cursor:pointer;box-shadow:4px 4px 0 var(--dr-ink);padding:0 12px}
.m-dennis-review-water i{position:absolute;left:0;right:0;bottom:0;height:0;background:rgba(91,180,224,.6);transition:height .25s;z-index:0}.m-dennis-review-water span{position:relative;z-index:1}.m-dennis-review-bigglass .m-dennis-review-water{min-width:76px;min-height:70px}.m-dennis-review-ring{position:absolute;left:50%;top:50%;width:20px;height:20px;margin:-10px;border:3px solid #5bb4e0;border-radius:50%;animation:m-dennis-review-ripple .6s ease-out forwards;pointer-events:none;z-index:2}.m-dennis-review-plan{margin:0;padding-left:20px;font-size:.78rem}
.m-dennis-review-see{border:2px dashed var(--dr-ink);border-radius:8px;padding:6px 10px;background:#f7f2ff;display:none;flex-direction:column;gap:4px;font-size:.78rem;font-weight:700}.m-dennis-review-see.m-dennis-review-on{display:flex}.m-dennis-review-dtrack{position:relative;height:16px;border:3px solid var(--dr-ink);border-radius:8px;background:#fff;margin:4px 22px}
.m-dennis-review-dmark{position:absolute;top:-6px;width:20px;height:22px;margin-left:-10px;border-radius:50% 50% 50% 0;background:var(--dr-leaf);border:2px solid var(--dr-ink);transition:left .1s}.m-dennis-review-wt{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.m-dennis-review-wt button{min-height:44px;padding:4px 10px;border:3px solid var(--dr-ink);border-radius:10px;background:#fff;font-weight:800;font-size:.76rem;cursor:pointer}.m-dennis-review-wt button[aria-checked=true]{background:var(--dr-lilac)}
.m-dennis-review-union{position:absolute;right:-6px;top:-4px;z-index:6;display:none;align-items:flex-end;pointer-events:none}.m-dennis-review-onbreak .m-dennis-review-union{display:flex}.m-dennis-review-union b{display:block;width:4px;height:50px;background:#7a5230;border:1px solid var(--dr-ink)}.m-dennis-review-union span{display:block;margin-left:-4px;margin-bottom:26px;padding:2px 6px;background:#fff;border:2px solid var(--dr-ink);font:900 .6rem system-ui,sans-serif;white-space:nowrap}
.m-dennis-review-union em{font:800 .62rem system-ui,sans-serif;margin-left:6px;font-style:normal;background:var(--dr-mustard);border:2px solid var(--dr-ink);padding:1px 4px;border-radius:4px;margin-bottom:8px;white-space:nowrap}.m-dennis-review-joint{position:absolute;inset:0;z-index:20;display:none;align-items:flex-start;justify-content:center;padding:34px 12px 12px;background:rgba(43,43,43,.0)}.m-dennis-review-jon .m-dennis-review-joint{display:flex}
.m-dennis-review-jp{position:relative;flex:0 1 760px;border:3px solid var(--dr-ink);border-radius:12px;background:var(--dr-paper);padding:12px 14px;display:flex;flex-direction:column;gap:6px;box-shadow:5px 5px 0 var(--dr-ink);animation:m-dennis-review-slap .6s ease-out;overflow:auto;font-size:.82rem}.m-dennis-review-jp h3{margin:0;font:900 1.1rem Impact,'Arial Black',system-ui,sans-serif;color:var(--dr-navy)}
.m-dennis-review-jstamp{align-self:center;padding:2px 14px;border:5px double var(--dr-stamp);color:var(--dr-stamp);font:900 1.7rem Impact,'Arial Black',system-ui,sans-serif;transform:rotate(-5deg);animation:m-dennis-review-thunk .2s ease-out both}.m-dennis-review-staplebar{align-self:center;width:46px;height:8px;background:#999;border:2px solid var(--dr-ink);border-radius:2px}.m-dennis-review-final{display:flex;flex-wrap:wrap;gap:8px}
.m-dennis-review-final div{flex:1 1 200px;border:2px solid var(--dr-ink);border-radius:8px;padding:5px 8px;background:#fff;font-weight:700}.m-dennis-review-cd{font-size:.76rem;font-weight:800;color:var(--dr-navy)}.m-dennis-review-cream .m-dennis-review-jokey{visibility:hidden}.m-dennis-review-inert{cursor:default}.m-dennis-review-wrap [hidden]{display:none!important}.m-dennis-review-side{display:flex;flex-direction:column;gap:6px;min-width:0}.m-dennis-review-margin2{display:flex;flex-direction:column;gap:5px}.m-dennis-review-water span{font:900 .72rem/1.15 'Trebuchet MS',system-ui,sans-serif;letter-spacing:.04em}
.m-dennis-review-window .m-dennis-review-dennis{transform:translateX(-26%);transition:transform 3s}.m-dennis-review-window .m-dennis-review-beam{background:linear-gradient(115deg,rgba(255,236,150,.9),transparent 70%)}.m-dennis-review-hand{display:block}@keyframes m-dennis-review-thunk{from{transform:rotate(var(--rot,-4deg)) scale(1.6);opacity:0}to{transform:rotate(var(--rot,-4deg)) scale(1);opacity:var(--op,.92)}}@keyframes m-dennis-review-fade{from{opacity:var(--op,.92)}to{opacity:0}}@keyframes m-dennis-review-sway{from{transform:rotate(-2.5deg)}to{transform:rotate(2.5deg)}}
@keyframes m-dennis-review-sway2{from{transform:rotate(2.5deg)}to{transform:rotate(-2.5deg)}}@keyframes m-dennis-review-breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.015)}}@keyframes m-dennis-review-rustle{0%,100%{rotate:0deg}30%{rotate:5deg}70%{rotate:-5deg}}@keyframes m-dennis-review-shk{0%,100%{translate:0 0}25%{translate:-3px 1px}50%{translate:3px -1px}75%{translate:-2px 0}}@keyframes m-dennis-review-curl{0%{transform:rotateX(0)}50%{transform:rotateX(-90deg)}100%{transform:rotateX(0)}}
@keyframes m-dennis-review-slap{from{transform:scale(1.5) rotate(8deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}@keyframes m-dennis-review-fly{from{transform:translate(160px,-50px) rotate(40deg);opacity:0}to{transform:rotate(var(--r,2deg));opacity:1}}@keyframes m-dennis-review-away{to{transform:translateY(60px) rotate(18deg);opacity:0}}@keyframes m-dennis-review-fallx{from{transform:translateY(-14px);opacity:1}to{transform:translateY(70px);opacity:0}}@keyframes m-dennis-review-sunarc{from{left:0;bottom:-6px}50%{bottom:34px}to{left:calc(100% - 22px);bottom:-6px}}
@keyframes m-dennis-review-crackdraw{to{stroke-dashoffset:0}}@keyframes m-dennis-review-flapfall{to{transform:translateY(40px) rotate(12deg);opacity:0}}@keyframes m-dennis-review-scrawl{to{stroke-dashoffset:0}}@keyframes m-dennis-review-flick{0%{opacity:1}50%{opacity:.15}100%{opacity:1}}@keyframes m-dennis-review-ripple{from{transform:scale(.4);opacity:1}to{transform:scale(2.6);opacity:0}}@keyframes m-dennis-review-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}.m-dennis-review-pulse{animation:m-dennis-review-pulse .5s ease-in-out 1}
@container (max-width:700px){
.m-dennis-review-cols{flex-direction:column;align-items:stretch}.m-dennis-review-stage{flex:none;width:100%;flex-direction:row;flex-wrap:wrap;align-items:center}.m-dennis-review-wall{min-height:130px;flex:0 0 120px;width:120px}.m-dennis-review-dennis{max-width:100px}.m-dennis-review-win{height:34px}.m-dennis-review-stage .m-dennis-review-side{flex:1 1 150px;min-width:0}.m-dennis-review-card{flex-direction:column;align-items:stretch}.m-dennis-review-margin{flex:none;width:100%;flex-direction:row;flex-wrap:wrap}.m-dennis-review-post{width:130px;font-size:.62rem;top:0!important}.m-dennis-review-zlabel{display:none}
.m-dennis-review-peerlayer{position:relative;right:auto;top:auto;width:100%}.m-dennis-review-stamp{left:6%} }
@container (max-width:480px){.m-dennis-review-hlines{flex-direction:row;flex-wrap:wrap;gap:2px 10px;font-size:.7rem}.m-dennis-review-letter{display:none}.m-dennis-review-flap span{font-size:.5rem;letter-spacing:0;margin-left:6px!important;line-height:1.05}.m-dennis-review-flap{padding:0 2px}
.m-dennis-review-wrap{padding:8px 4px 16px}.m-dennis-review-board{padding:28px 6px 8px}.m-dennis-review-paper{padding:8px}.m-dennis-review-sl{margin:6px 18px 0}}
@media (prefers-reduced-motion:reduce){
.m-dennis-review-plant,.m-dennis-review-breathe{animation:none}.m-dennis-review-plant{transform:rotate(4deg)}.m-dennis-review-stamp.m-dennis-review-go{animation:m-dennis-review-fade var(--fd,2.5s) var(--hold,.9s) forwards;opacity:var(--op,.92)}.m-dennis-review-card.m-dennis-review-curl,.m-dennis-review-card.m-dennis-review-shake{animation:none}.m-dennis-review-board{transition:none}.m-dennis-review-face{transition:opacity .3s}.m-dennis-review-post,.m-dennis-review-peer,.m-dennis-review-appeal,.m-dennis-review-ficus,.m-dennis-review-jp,.m-dennis-review-jstamp{animation:none}.m-dennis-review-leaf,.m-dennis-review-dennis:hover .m-dennis-review-leaf{animation:none}.m-dennis-review-sun,.m-dennis-review-ring,.m-dennis-review-pulse,.m-dennis-review-blink,.m-dennis-review-drop{animation:none}.m-dennis-review-ghost path{animation:none;stroke-dashoffset:0}.m-dennis-review-cracking .m-dennis-review-crack polyline{animation:none;stroke-dashoffset:0}
}
@media (pointer:coarse){.m-dennis-review-fnbtn,.m-dennis-review-mini,.m-dennis-review-x{min-height:40px;min-width:40px}}
.pm-reduce-motion .m-dennis-review-plant,.pm-reduce-motion .m-dennis-review-breathe{animation:none}.pm-reduce-motion .m-dennis-review-plant{transform:rotate(4deg)}.pm-reduce-motion .m-dennis-review-stamp.m-dennis-review-go{animation:m-dennis-review-fade var(--fd,2.5s) var(--hold,.9s) forwards;opacity:var(--op,.92)}.pm-reduce-motion .m-dennis-review-card.m-dennis-review-curl,.pm-reduce-motion .m-dennis-review-card.m-dennis-review-shake{animation:none}.pm-reduce-motion .m-dennis-review-board,.pm-reduce-motion .m-dennis-review-face{transition:none}.pm-reduce-motion .m-dennis-review-post,.pm-reduce-motion .m-dennis-review-peer,.pm-reduce-motion .m-dennis-review-appeal,.pm-reduce-motion .m-dennis-review-ficus,.pm-reduce-motion .m-dennis-review-jp,.pm-reduce-motion .m-dennis-review-jstamp,.pm-reduce-motion .m-dennis-review-leaf{animation:none}.pm-reduce-motion .m-dennis-review-sun,.pm-reduce-motion .m-dennis-review-ring,.pm-reduce-motion .m-dennis-review-pulse,.pm-reduce-motion .m-dennis-review-blink,.pm-reduce-motion .m-dennis-review-drop{animation:none}.pm-reduce-motion .m-dennis-review-ghost path{animation:none;stroke-dashoffset:0}.pm-reduce-motion .m-dennis-review-cracking .m-dennis-review-crack polyline{animation:none;stroke-dashoffset:0}
.m-dennis-review-tag3{opacity:0;transition:opacity .6s}.m-dennis-review-tagon .m-dennis-review-tag3{opacity:1}.m-dennis-review-tagflip .m-dennis-review-tag5{opacity:.35}.m-dennis-review-tagflip .m-dennis-review-tagx,.m-dennis-review-tagflip .m-dennis-review-tagc{opacity:1}.m-dennis-review-tagx,.m-dennis-review-tagc{opacity:0}.m-dennis-review-ring2{position:absolute;right:14px;top:6px;width:44px;height:26px;border-radius:50%;border:3px solid #5bb4e0;opacity:0;pointer-events:none}.m-dennis-review-leak1 .m-dennis-review-ring2,.m-dennis-review-leak2 .m-dennis-review-ring2{opacity:.55}.m-dennis-review-leak2 .m-dennis-review-ring2{width:62px;height:34px;opacity:.75}.m-dennis-review-sig{display:inline-block;border-bottom:3px solid #5bb4e0}.m-dennis-review-cmwrap{position:relative}@container (max-width:480px){.m-dennis-review-crayon{flex:1 1 100%}}
`, 'css-dennis-review');

  P.addAchievements([
    { id: 'dennis-review.first', name: 'Grand Marshal of Photosynthetic Assessment', desc: 'Submit your first rating of Dennis. It was clipped. It was always going to be clipped.', icon: '🌿', reward: 2,
      check: function (s) { return (s['dennis-review.clipped'] || 0) >= 1; } },
    { id: 'dennis-review.clipped10', name: 'Order of the Clipped Five (with Oak Leaf Cluster)', desc: 'Have 10 ratings clipped back to 5. The oak leaf cluster is a regular leaf. It is clipped too.', icon: '🍃', reward: 3,
      check: function (s) { return (s['dennis-review.clipped'] || 0) >= 10; } },
    { id: 'dennis-review.misunderstood25', name: 'Grand Marshal of Misunderstanding', desc: 'Be rejected 25 times for a misunderstanding of Dennis.', icon: '📋', reward: 5,
      check: function (s) { return (s['dennis-review.rejections'] || 0) >= 25; } },
    { id: 'dennis-review.elastic', name: 'The Order of the Pulled Elastic, First Class', desc: 'Apply 100 newtons of Sincerity to a slider that has asked you not to.', icon: '🌱', reward: 5,
      check: function (s) { return (s['dennis-review.sincerity'] || 0) >= 100; } },
    { id: 'dennis-review.nest3', name: 'Appellate Judge of the Third Nest', desc: 'Appeal an appeal of an appeal, on a form the size of a postage stamp.', icon: '📋', reward: 5 },
    { id: 'dennis-review.flip', name: 'Supreme Reviewer of Reviewers (Retired, Pending)', desc: 'Discover who has been reviewing whom. It was in the small print under the pot.', icon: '🌿', reward: 5 },
    { id: 'dennis-review.seesaw', name: 'Chairperson of the Seesaw Committee', desc: 'Raise yourself to 4.5 and sink Dennis by the same amount in the same second.', icon: '🌱', reward: 4 },
    { id: 'dennis-review.chancellor', name: 'Chancellor of the Barely Watered Reports', desc: 'Complete all 12 competencies, and the half one, in one cycle. You are now qualified to continue.', icon: '📋', reward: 8 },
    { id: 'dennis-review.cycle2', name: 'Nothing Has Changed', desc: 'Begin Review Cycle 2. It is the same form. Please enjoy the new feeling.', icon: '🍃', reward: 3 },
    { id: 'dennis-review.sevenhalf', name: 'Knight Commander of Seven and a Half', desc: 'Release the leaf on the unlabeled 7 1/2 tick and be briefly, genuinely accepted.', icon: '🌼', secret: true, reward: 15 },
    { id: 'dennis-review.hundredth', name: 'Sovereign of the Final Hundredth Leaf', desc: 'Release the slider at 4.99. Dennis is aware of the 0.01. It will never be forgiven, only noted.', icon: '🍃', secret: true, reward: 8 },
    { id: 'dennis-review.silence', name: 'Employee of the Silence', desc: 'Do nothing for 90 seconds and be rated 5 by a plant.', icon: '🌿', secret: true, reward: 10 },
    { id: 'dennis-review.shrub', name: 'Shrub (Junior), Honorary', desc: 'Go 120 seconds without touching anything. Dennis files you on the Plant Roster.', icon: '🌱', secret: true, reward: 8 },
    { id: 'dennis-review.overwatered', name: 'Overwatered Sovereign of the Lobby', desc: 'Water Dennis 7 times and receive a flower no one will explain.', icon: '💧', secret: true, reward: 8 },
    { id: 'dennis-review.ficus', name: 'Persona Non Grata of Accounting', desc: 'Rate the ficus while it is visible. Sandra has a post-it for this.', icon: '🌿', secret: true, reward: 6 },
    { id: 'dennis-review.nearlyliked', name: 'Nearly Liked', desc: 'Be accepted by mistake. It was recalled. Dennis was not told.', icon: '📋', secret: true, reward: 5 },
    { id: 'dennis-review.union', name: 'Honorary Shop Steward', desc: 'Cause a slider to unionize. The Stapler is proud, in a way it cannot articulate.', icon: '🥛', secret: true, reward: 5 },
    { id: 'dennis-review.iamdennis', name: 'Dennis, Delighted', desc: 'Announce that you are Dennis. Dennis is delighted to be identified.', icon: '🌿', secret: true, reward: 4 },
    { id: 'dennis-review.stapled', name: 'Grand Chancellor of the Stapled Opinion (Staple Not Included)', desc: 'Type the name of the Stapler into a form that does not ask for it. The Stapler arrives, uninvited, and is right to.', icon: '📋', secret: true, reward: 7 },
    { id: 'dennis-review.tenured', name: 'Lord High Fern of the Unmoved Pot, Tenured', desc: 'Leave the review alone for 7 1/2 minutes. Dennis returns from the window early and credits you. Tenure is a pot.', icon: '🌱', secret: true, reward: 12 } ]);

  /* ------------------------------------------------------------------ the words (no double quotes inside any line; %V% style tokens are filled locally) */
  const X = {
    M1: "Welcome to Annual Performance Review (Quarterly). Today's subject is Dennis, Lobby Plant. Tenure: always.", M2: "Please rate Dennis from 1 to 5. Dennis has already rated your rating. It is under review.", M3: "Competency 1 of 12: Photosynthesis. Take your time. Dennis is.", M4: "The slider is not broken. The slider is aligned with Dennis.", M5: "Please drag the leaf. Release it anywhere. The leaf will be corrected, and has been looking forward to it.", M6: "Dennis has pencilled in a provisional 5. You may overwrite it with any number that will be corrected.", L1: "A %V%? Dennis has been in the lobby for 11 years and has never once been a %V%. Rating returned. Clipped to 5.",
    L2: "Rating of %V% rejected as 'a misunderstanding of Dennis'. Dennis would like you to sit with that.", L3: "Dennis does not accept numbers that small. Dennis accepts light, water and, grudgingly, 5s.", L4: "You have rated Dennis %V%. Sandra from Compliance has moved the %V% to a drawer with no %V%s in it.", L5: "Your %V% has been recorded, laminated and recycled into a 5. We are a green company.", L6: "Ratings below 2.5 are reserved for plants that have not yet been approved. None have been.", D1: "A %V% implies a 5 exists. Dennis finds this insulting. Rating: 5.", D2: "Your %V% has been recorded as 'a lot of light.' Dennis took it personally.",
    D3: "Rating of %V% entered at 4:17 PM and withdrawn at 4:17 PM. Sandra has the paperwork.", D4: "Scores of 4 and under are reserved for plants that are not Dennis. All of them are in Accounting.", D5: "Dennis was described as 'a 4' once, in 2019. That reviewer is now a ficus.", D6: "A %V% is what you give a thing you have not looked at. Dennis has been looked at since 2013. Clipped to 5.", D7: "Form 27B/6-R does not support disagreement. Form 27B/6-S (Support for Disagreement) is out of stock.", T1: "A 3 is what you give a person. Dennis is a plant. Rating raised to 5 to correct for category.",
    T2: "Average implies a range. Dennis has had one position since 2013. Clipped to 5.", T3: "A 3 means 'Meets'. Dennis does not meet. Dennis is met.", H1: "A %V%. So close that Dennis has checked the floor for the other %D%.", H2: "Dennis accepts the %V% the way a plant accepts anything: by already having been 5.", H3: "%V% implies hesitation. Dennis has never hesitated. Dennis has never done anything. It is a record.", H4: "Almost. Dennis does not do almost. Dennis does sunrise.", H5: "Clipped. The 5 is a ceiling, a floor and, on Thursdays, a wall.", F1: "Thank you for the 5. It has been adjusted to 5. This is the most honest thing the form has done all day.",
    F2: "You rated Dennis 5. Dennis is 5. You have confirmed Dennis, which is not your role.", F3: "5 received. 5 was anticipated. 5 has been placed on the board with the other 5s.", F4: "A perfect score. Dennis has not responded, having no mouth, but there was a rustle.", F5: "Rating accepted. Please do not mistake this for a victory. It was a formality with feelings.", F6: "Management is pleased. Management is not sure with what.", O1: "Your %V% has been struck out and moved to the margin, where it will remain as a warning.", O2: "A 5 implies a ceiling. Dennis does not recognise ceilings, only skylights.",
    O3: "Sincerity Applied: %NW% newtons. Per policy, newtons of sincerity are not legal tender.", O4: "The stop at 5 held. The stop at 5 is not a suggestion. The stop at 5 is a stop.", O5: "You pulled so hard the slider has asked to be called 'Sir.' Sir has been added to the form.", O6: "Your %V% has been forwarded to Dennis. Dennis has not responded and is considered to have agreed.", P1: "Anything past 5 is the Misunderstanding Zone. Management does not maintain it. It maintains itself.", P2: "Rating %V% exceeds the form. Dennis is flattered and has clipped you to 5 for your own safety.",
    P3: "%V% is not a number Dennis has met. Dennis would like to be introduced, in writing.", P4: "Rating snapped to 5. The snap was consensual.", P6: "The Misunderstanding Zone has accepted your %V% and given nothing back, per its charter.", U1H: "A rating of %V% has been logged as a cry for help. Referred to Dennis. Dennis did not respond.", U2H: "%V%. The form was not built for this. The form would like a moment, and a larger form.", R1: "A reason is required for any rating above 5. 'Because' has been accepted as a reason and will be used against you.",
    R2: "Noted: '%T%'. This has been filed under Reasons and will be mocked at the quarterly.", R3: "Values above 5 must be accompanied by a reason. Your reason is the blank space. It has been noted. It is also blank.", WD: "Withdrawn. Clipped anyway.", C1: "Competency 1 of 12: Photosynthesis. Take your time. Dennis is.", AC1: "Competency %C% complete. Dennis has not been told. Dennis was already complete.", AC2: "Your rating has been filed under 5, in a drawer labelled 5, in a cabinet labelled Ratings, in a room labelled Dennis.", AC3: "Your input has been forwarded to the relevant stakeholder. He is in a pot and has not been told.", AC4: "Progress: Almost. Management will update you when it becomes Slightly More Than Almost.",
    AC5: "You earned 0.5 Meh for that competency. Dennis earned nothing. Dennis is not paid in anything.", A1: "The committee has agreed to disagree. The committee is also Dennis. Dennis is a plant.", A3: "Management is not saying Dennis is perfect. Management is saying that no one has found the form for that.", A4: "Dennis has asked Management to stop saying 'sincerely.' Management says this is, sincerely, not possible.",
    A5: "Per my previous message. (There was no previous message.)", A6: "I will circle back to your review. I have never been to the place I am circling.", A7: "Appendix Leaf 7 1/2 states that a rating must not be 'received with enthusiasm.' You have been enthusiastic.", A8: "Dennis is not angry. Dennis is leaning, which is how Dennis is angry.",
    A10: "Review cycles are measured in Tuesdays. Please bring a Tuesday.", A11: "The only person who can rate Dennis a 5 is Dennis. Dennis has declined. Dennis feels it would be rude.", S1: "The scale legend now reads 1 = Exceeds, 5 = Exceeds. Please be consistent.", S2: "The half-point has been retired. Please do not use it, or find it.", S3: "Thursdays are now mandatory. This is not a Thursday. Plan accordingly.", S4: "Ratings must be submitted left-handed. Dennis cannot tell which hand. Do it anyway.",
    S5: "The Submit button has been renamed. Please do not ask it why.", S6: "Sandra has counted the copies of Form 27B/6-R. There are plenty. She says this is not good news.", S7: "Tuesday is the deadline for all reviews. No one has said which Tuesday.", S8: "The number 5 is too similar to 4 when squinting. A flag has been filed. The flag has been clipped to 5.", S9: "Please stop looking at the ficus. The ficus has noticed.", S10: "Post-its are not an approved medium. This post-it has been approved retroactively.", S11: "Gerald has been copied on this. Gerald has not responded. He is a potato.",
    FN1: "* Dennis is a plant.", FN2: "† See *.", FN3: "‡ Dennis has not been informed of this footnote. Dennis is aware of it.", FN4: "§ See †, which refers to ‡, which refers to nothing.", FN5: "|| Printed on the back of the pot. See footnote 7 1/2.", FN6: "¶ Sandra has reviewed this footnote and found it accurate, in part.", FN7: "** The ficus in Accounting is a separate file.", FN8: "†† Tuesday is not a footnote. It is, however, cited.", FN9: "‡‡ 'Misunderstanding' is used here in its administrative sense.", FN10: "§§ This footnote has been left blank so that it may be read.", FN11: "¶¶ Dennis is 0.3 cm taller than last cycle. Citation: none.", FN12: "*** See *.",
    FNH: "7 1/2. This footnote exists only if you believe in it. You do.", FNX: "††† Dennis has quietly rated the clipboard. The rating is on the clipboard.", B2: "Management notes that you have been testing the right-hand edge of the slider. The edge has been informed.", B3: "A new button has been added: Appeal (Form 27B/6). It will not help. It is, however, a button.", B4: "The stop at 5 has been inspected. The inspector sat on it. It is not fine.", G1: "The stop at 5 has cracked. This is not covered under warranty. The warranty is also a plant.",
    B5: "Management has updated the Reviewer line. Management would like to say it was always like that.", B7: "Peer reviewers have been contacted. Peer reviewers have responded. Peer reviewers are about Dennis.", B8: "The Seesaw is not a metaphor. It is a seesaw. Please keep your hands inside the form.", FL1: "Upon review, the review has a second page. Management regrets not mentioning the second page, and the first.", FL2: "Correction: this form was never about Dennis. It was addressed to Dennis. You have been filling in his copy.", FL3: "Your scorecard is ready. Please sit down. The chair has been inspected and is, as far as we can tell, a chair.",
    FLD1: "You are Dennis. Dennis is delighted to be identified. Please water accordingly.", FLD2: "The reviewer has been identified. We will pretend this was a surprise.", FL4: "Overall: Meets Expectations (Barely Watered). Dennis has lowered his own expectations to make this possible.", FL5: "Reviewer: Dennis. Reviewee: %P%. It was in the small print, which is under the pot.", FL6: "Dennis has been taking notes since 9:04 AM. He has no hands. The notes are very good.", FL7: "Please disregard the header. The header was changed by someone with more soil than you.",
    A21: "Management is not permitted to comment on the scorecard. Management would like it noted that it tried.", A23: "Appeals may be filed with Dennis. Dennis is the one who decides.", A24: "Dennis has been promoted to Plant, Senior. Dennis did not attend the ceremony because Dennis is a plant.",
    A25: "Dennis would like to thank no one. Dennis would like it noted that he did all this without legs.", A26: "Management would like to be rated. Management is not on the form. Management has added itself and rated itself a 3.", A27: "Dennis returns from a salad station where Dennis was briefly the entire salad station. Dennis lists this under Hobbies.", A28: "Please do not take the 3 as a compliment. Please do not take it as anything.", A29: "The lobby is barely watered. Management would like to be clear that this is a weather report.", A30: "Management has been asked to stop saying 'per policy.' Management has noted the request, per policy.",
    CR1: "Hovering: %V% movements. Dennis counted them. Dennis had time.", CR2: "Clicking Intent: %V% clicks per submission. Dennis did not click. Dennis has never clicked.", CR3: "Hesitation: %V% seconds before your first submission. Dennis would have waited for the sun.", CR4: "Slider Remorse: %V% drags returned to a lower value before release. Dennis forgives. Dennis has not said so.", CR5: "Tab Discipline: %V% departures. Dennis noticed every one. Dennis cannot leave.", CR6: "Water Intake: %ML% mL. Dennis considers this 'a good start.'",
    Q1: "Your 'Barely Watered' has been updated to 'Barely Watered (Technically).' Please do not take it as a compliment.", Q2: "Your 'Barely Watered (Technically)' has gained 'In Spirit.' The spirit has not been consulted.", Q3: "Your rating is now 'Provisional.' Provisional is the highest status available and does not last.", Q4: "Your rating is now 'Subject to Tuesday.' Tuesday has been informed.", RQ1: "Request for Reconsideration received. Dennis has leaned 3 degrees to the left. This is his answer.", RQ2: "Request received. Dennis has leaned 3 degrees to the right. This is his other answer.",
    RQ3: "Dennis has returned to center. This is neither an answer nor not an answer.", RQ4: "Request %C% has been received. Requests beyond the third are filed in the sun.", AP1: "Appeal filed. Dennis is considering it. Dennis considers things in seasons.", AP2: "Appeal denied. Appeal appealed. Appeal denied again, in a different font.", AP3: "Your appeal has been placed in the sun. It is now a tan appeal.", AP4P: "Your appeal has been read aloud to the Third Ficus. The Third Ficus abstained.", AP5: "MISUNDERSTANDING OF APPEAL. Please do not appeal this stamp. It is also a stamp.", W1: "Sip logged. Hydration: Barely, but now officially on the record.",
    W2: "Another sip. Dennis has noted your posture. It is upright. Dennis is envious.", W3: "Hydration noted. Dennis would like you to know he is not keeping count. He is keeping count.", W4: "Water Intake: %ML% mL. Dennis, who has been absorbing through his feet since 2013, has no notes.", W5: "Hydration has reached 100%. It has been brought back down to Barely for the sake of continuity.", W6: "Concern: Overwatered. The form has noted your thoroughness and is not in favour of it.", PLAN1: "Sunlight.", PLAN2: "See item 1.", PLAN3: "Attend one meeting near Dennis.", PLAN4: "Stand in sun, discreetly.", PLAN5: "Sip water. Do not announce it.", PLAN6: "Revisit item 1, with feeling.",
    PLANOPEN: "Dennis has opened a development plan for you. Item one: sunlight. Item two: see item one.", GA: "Gerald, Vice President of Spuds: 'A root is a root.' (Gerald has also rated himself 5 potatoes and Dennis 5 potatoes, with 'a compelling green.' Both are rejected.)", GB: "A potato, unnamed, of visible dignity, writes: 'A root is a root.' (The potato has rated itself 5 potatoes. Rejected.)", SC: "Sandra from Compliance: 'Dennis is compliant. %P% is compliant-adjacent. I have flagged the adjacency.'", TD: "One slice of toast, sealed in an envelope. It reads:",
    STA: "The Stapler has submitted a counter-review of the clipboard. The clipboard has been found 'a little too supportive.'", PD: "Dismissed. The note has been returned to the sender, who is on the note.", PS: "Signed. Your signature has been compared with Dennis's. Dennis has no signature. The comparison was brief.", PT: "KA-CHUNK. The Stapler has been consulted and approves of the stapling. It is all the Stapler asks.", PEER2: "Peer Review #2: 'He never speaks, but he is always there. In my day we called that leadership.' Rejected, for being nice.", SE1: "When you go up, Dennis goes down. This is called 'calibration.' Dennis is not sorry.",
    SE2: "Calibration is not zero-sum. It is, however, zero.", SE3: "Calibration complete. Both parties have returned to where they were. The seesaw notes the effort.", WT1: "Weighting has been set to Photosynthesis. Photosynthesis weighs what it always weighed.", WT2: "Weighting has been set to Presence. Presence has been weighed. Presence was there.", WT3: "Weighting has been set to Tuesday. All competencies are now being evaluated on Tuesday, retroactively.", CT1: "Seasonal Enthusiasm: your rating has been mailed to winter. Winter acknowledges receipt.", BT1: "Came back.", BT2: "Came back again.", BT3: "You came back every Tuesday.", BT4: "Shows up.",
    BT5: "Nobody has told you that you are doing a good job. Nobody told Dennis either. He has chosen a leaf.", BT6: "Management has also been rated. Management is also a 3. Management has never been told it was doing a good job and does not know where to put it.", BT7: "Thank you for the water. It was only a drop. Dennis is, to be clear, extremely hydrated.", J1: "REVIEW COMPLETE. You have been rated Meets Expectations (Barely Watered). The next review begins at the end of this sentence.", J2: "Overall rating of Dennis: 5, rejected. Overall rating of you: Meets Expectations (Barely Watered), accepted. Congratulations.",
    J3: "Dennis has signed. The signature is a single drop of water he has been saving since 2019.", J4: "You have finished reviewing Dennis. Please begin reviewing Dennis.", J5: "Your review cycle is now complete. It begins again immediately. This is called a cycle.", J6: "Per Dennis, this has been a very good quarter. Per Dennis, so is the next one.", J7: "Acknowledged. This has been recorded. It has not been read.", J8: "Goals for the next period: 1. Maintain Meets Expectations. 2. See goal 1.", J9: "Incident 7 1/2: closed (still pending).", J10: "Dennis has grown 0.3 cm. (*Citation: none.)", CB1: "%CY%. Competency 1 of 12: Photosynthesis. Nothing has changed except everyone.",
    CB2: "This is the part where you test the right-hand edge. The edge remembers you.", CB3: "Appeals are open again. The forms are the same size as last time. They have not grown.", CB4: "The stop at 5 has been repaired. It has been repaired with the same crack, for continuity.", CB5: "The Reviewer line has been updated again. It says what it said. Management is not reading it.", CB6: "The form has a second page. It is the same second page. Please turn it.", CB7: "Peer reviewers have been contacted. They remember you, and have not forgiven the stapling.", CB8: "The seesaw has been oiled. This is a promise and not a service.",
    CB9: "Dennis has gone quiet. Please do not talk.", CB10: "Review complete, again. Please keep your certificate. It is the same certificate.", NEW1: "Appendix Leaf 0 covers the spelling of Presense. No one has read Appendix Leaf 0.", NEW2: "A new form has been provided. It is the same form. Please enjoy the new feeling.", NEW3: "Presense is a competency. It has always been spelled that way. Please do not refer to the old spelling.", X1: "7 1/2. Accepted. Nobody has ever been so specific about Dennis. Clipped to 5 anyway, per policy, with feeling.", X2: "Sandra from Compliance has filed an exemption for that one number, this once, hereafter never.",
    X3: "A rating of 4.99 has been received. Dennis is aware of the 0.01 and will remember it through all seasons.", X4: "The Ficus from Accounting has arrived. Nobody invited it. Everybody expected it.", X5: "Ficus (Accounting) has been rated 5 with no clip. Dennis has noted this. In soil.", X6: "Dennis notes that you rated the ficus. Dennis is not saying anything. Dennis is leaning.", X7: "A watering can has been issued. Please use it responsibly. Dennis cannot say what responsible means.", X8: "Poured. Dennis is brighter. Dennis denies this.", X9: "Dennis has bloomed. This is not covered in the review. Please do not mention it to Dennis.",
    Y1: "Congratulations, Dennis has been rated.", Y2: "A rating has been accepted by mistake. It has been recalled. Please do not tell Dennis he was nearly liked.", Y3: "The slider has had enough of your opinions and Dennis's.", Z1: "Dennis has been moved to a smaller office. Dennis has made peace.", Z2: "Dennis has reflowed. Dennis is wider than your window. Dennis is fine.", Z3: "Dennis has unfolded.", Z4: "The form is wider than Dennis. Dennis is fine with it.", V1: "Welcome back. Dennis noted the absence. Dennis was also absent. Dennis is a plant. Dennis was present.", I1: "No input for 45 seconds. Dennis calls this a very good quarter.",
    I2: "Dennis has begun filling in the form himself. Please do not look. He is shy about the handwriting.", I3: "While you were away, Dennis completed your review. It says: 'Present, spiritually.'", I4: "You have been still for so long that Dennis has put you on the Plant Roster. You are listed as Shrub (Junior).", I5: "Stillness: Exceeds. Reviewer's comment: 'At last, a colleague.'", I6: "Dennis has gone to the window. Back in 7 1/2 minutes.", I7: "The form has been filed under 'Resigned (Photosynthesis)'.", I8: "You are back. Dennis wrote some of it. Dennis would like you to read it and not correct the handwriting.",
    I9: "Presence has been withdrawn due to presence.", I10: "Welcome back. Dennis was at the window. The window was fine.", I11: "Welcome back. The form has been refiled under 'Returned (Also Photosynthesis)'.", K1: "The stamp has run out of ink. A requisition has been filed. The requisition has no ink either.", K1B: "A Stamp Replenishment Levy of 0.5 Meh has been applied. It will not be replenishing anything.", K2: "The stamp has been handed to a very tired intern. The intern will stamp the next 10 submissions. The intern has asked that you not rush him.", K3: "The intern has finished. The intern has asked for a nap, and a stamp.",
    TC1: "Dennis has been touched. This has been noted.", TC2: "Dennis has been touched %C% times. Form 27B/6-T (Touching of a Plant) has been issued. Please fill it in with a different plant.", TC3: "Dennis has shed 1 leaf. This is autumn. Autumn was not approved.", TC4: "A leaf has fallen. Leaf Loss Incident %C% has been filed in triplicate. The triplicate is leaves.", TC4B: "Leaf Replacement Levy: 1 Meh. The leaf was not worth it. The leaf is not being replaced.", TC5: "Dennis has regrown a leaf. Dennis is resilient, not forgiving.", TC6: "Dennis is leafless (professionally).",
    UN1: "The Stapler, speaking for the slider, has called a work stoppage. Demands: a break, a better pot.", UN2: "The slider is resting for 7 1/2 seconds. It has asked that you not watch.", UN3: "Better pot: granted. The slider has returned to work and would like it known that this was not a favour.", CME: "Comment left blank. Dennis rates a blank comment 5. Dennis rates all negative space 5.", CMW: "Your comment mentions water. Dennis is not thirsty. Dennis is thorough.", CMD: "You mentioned Dennis by name. This will be on your record as familiarity.", CMS: "Apology received. Dennis has accepted it on behalf of the soil.",
    CMF: "A fern has been mentioned. The fern has not been rated. The fern would like to know why.", CMT: "Toast has been mentioned. The Toaster has been informed. The Toaster is warm about it.", CMU: "Tuesday has been mentioned. Please lower your voice.", CMX: "The ficus has been mentioned. Sandra has been informed.", CML: "Comment exceeds 120 characters. Dennis read the first 3 and felt seen.", CM1: "Noted: '%T%'. This will be used against you, gently.", CM2: "Justification received: '%T%'. It has been required and ignored, in that order.", CM3: "'%T%.' Dennis has read this and has chosen to remain a plant.",
    APL1: "Your appeal has been received. Please submit an appeal of this appeal on Form 27B/6.5.", APL2: "Form 27B/6.5 is smaller than Form 27B/6. This is to discourage appeals. It is working.", APL3: "Form 27B/6.75 is the size of a postage stamp. Management cannot see it either. It has been rejected on trust.", APL4: "Appeal rejected. Please appeal the rejection. The rejection is on the next form.", APL5: "Appellate Judge status: provisional. Provisional is the highest status available."
  };
  /* punch-up pass: new lines, keyed NX<n>, kept apart from the original block */
  Object.assign(X, {
    NX1: "A %V%. Dennis has asked that this number be kept away from the other plants. They talk.", NX2: "You have rated Dennis %V% on a form that goes up to 5, which is a bold use of the bottom of a form. Clipped to 5.", NX3: "Rating %V% was received at the front desk and asked to wait. It is still waiting. Dennis has been given a 5 to keep him company.",
    NX4: "A %V% has been entered for Dennis. Dennis has entered a 5 for the %V%. They are in separate rooms and may not speak.", NX5: "Sandra has held your %V% up to a tape measure and found it short by %D%. The tape measure is also a 5.", NX6: "Your %V% was read aloud in the lobby. The lobby did not respond. Dennis responded by not responding more.", NX7: "Rating %V% was submitted in pencil. Dennis does not accept pencil. Dennis has no use for erasable opinions.",
    NX8: "3 is the number of meetings Dennis attended this week. He was in all of them. It is not a rating.", NX9: "A 3 was offered. A 3 was declined. A 3 was given a ride home in a 5.",
    NX10: "A %V%. Management has put a ruler against the %D% and the ruler has asked for the afternoon off.", NX11: "Dennis acknowledges the %V% the way a mountain acknowledges a hiker. By being 5.", NX12: "%V% is not a rating. It is a person standing near a 5 and saying they are not with it.",
    NX13: "5. Confirmed. Dennis has asked if you would like to be rated 5 as well. Please do not say yes. He is serious.", NX14: "Another 5. Dennis rated the 5 and found it a 5, which is consistent of him.", NX15: "You have been consistent. Consistency is the one competency in which Dennis and a clock are tied.", NX16: "5 noted. Dennis would like the record to show he was not trying.",
    NX17: "The elastic has been asked to stop being so elastic. It has declined, elastically.", NX18: "You reached for %V%. Dennis has reached 4 centimetres since 2019 and suggests you take it slowly.", NX19: "Sincerity logged: %NW% newtons. The slider has asked for hazard pay in newtons. It will be paid in 5.", NX20: "That pull has been entered under Effort. Effort is a column no one reads, including the column.",
    NX21: "%V% is past the end of the form and into the table the form is on. The table has been clipped.", NX22: "Rating %V% received from inside the Misunderstanding Zone. The Zone would like its pens back.", NX23: "You have left the numbered part of the scale. Dennis has never left the numbered part of anything. Clipped to 5.",
    NX24: "%V%. At this height a rating becomes weather. Weather is not accepted on Form 27B/6-R.", NX25: "A rating of %V% has been escorted from the building by Sandra. It went quietly. It was a 5 by the door.", NX26: "Management has measured %V% against Dennis and against the building. The building is a 5. So is Dennis. So, grudgingly, is %V%.",
    NX27: "Competency %C% of 12 is done. Dennis attended it in person, as he attends everything.", NX28: "Another 5 has been added to the pile of 5s. The pile has no name and is doing well.", NX29: "Competency %C% complete. You may now rate something else about Dennis. Everything else about Dennis is also Dennis.",
    NX30: "A reminder that Dennis has been in this lobby for 11 years, 4 months and a Tuesday. He is not keeping count. He is keeping a ledger.", NX31: "Management has stepped away from the review to look at Dennis for a moment. It was a long moment. Management has returned with no notes.", NX32: "Someone in Accounting asked what this review is for. They were told it is for Dennis. They asked what Dennis is for.", NX33: "Per Sandra, the word clipped has been replaced by the word aligned in all correspondence. The correspondence is unchanged.",
    NX34: "Please note that the soil is not part of the review. The soil has been asked to leave. The soil is in a pot.", NX35: "Dennis has rated this review a 5. The review has not been sent to Dennis. Dennis found it anyway.", NX36: "Management has received a request to promote Dennis. Dennis is already tall in the way that matters. The request has been filed under height.", NX37: "The form closes on Tuesday. When Tuesday arrives the form will be closed, then reopened to discuss Tuesday.",
    NX38: "Dennis is reading the scorecard over your shoulder. He has no eyes and a clear view.", NX39: "Your 3 has been compared with the 3s of your colleagues. All of them are also 3. This is being called a team.", NX40: "Management has been looking at the scorecard for a while and would like to say it was not looking at the 3. It was looking at the space around the 3.", NX41: "The scorecard has been laminated. Dennis asked for it. He has nothing to laminate with, so the lamination is a feeling.",
    NX42: "Dennis rates the review process a 5. Dennis rates everything a 5. It is his only tool and he is a craftsman.", NX43: "At 11:42 Dennis's comments about you were reviewed by Dennis. They were found consistent with Dennis.",
    NX44: "Sip logged. Dennis has noted the sound. He rates it a 5. Dennis did not ask to hear it.", NX45: "Hydration: Barely, with ambition. Dennis has noted the ambition.", NX46: "The glass has been refilled by an unseen hand. The hand is not on the org chart.",
    NX47: "Your appeal has been appealed by another appeal. The two will meet on Thursday. Please do not join them.", NX48: "Appeal denied in advance, which saves time and ruins surprises.", NX49: "Your appeal has joined a growing pile of appeals. The pile is now a department.",
    NX50: "Dennis Standard: 5. The Standard has been consulted. The Standard is Dennis. He has nodded.", NX51: "Dennis Standard: 5. Please do not read 5 as a score. It is a position.", NX52: "Reviewer's reminder: ratings are final until they are not. They have not yet not.", NX53: "Reminder: the Standard has been 5 since before the form. The form is a visitor.", NX54: "Reminder: the form is not recording this. The form is simply remembering it very closely.", NX55: "For the Standard, see the plant. For the plant, see the Standard.",
    NX56: "Leaf Loss Incident %C%. Dennis has taken the loss in a leaf-like manner, which is to say he has let go.", NX57: "Another leaf. Leaf Loss Incident %C% has been filed under Weather, because Sandra will not file it under You.", NX58: "Leaf Loss Incident %C%. HR has asked whether you are touching Dennis for a reason. The reason is a form.",
    NX59: "Touch 7. Dennis has leaned away by 7 millimetres. Management measured it with a ruler borrowed from a different plant.", NX60: "That is 15 touches in one sitting. Form 27B/6-T has been upgraded to Form 27B/6-T (Concern).", NX61: "30 touches. Dennis has been moved to a position of less touching. It is the same position. It feels different.",
    NX62: "The intern is stamping. The intern has not been told what the stamp is for. Neither has Dennis.", NX63: "The intern has asked if stamps can be rated. Management said no. The intern said understood and stamped it anyway.", NX64: "The intern is stamping with his whole body. It is working at about 40 percent. It is the best he has felt all week.", NX65: "The intern has requested a break. The break has been requested of the intern. The break is the stamp.",
    NX66: "The stamp is looking pale. This is not a comment on Dennis. Dennis looks like this in November.", NX67: "The stamp has been reduced to three letters. Management has been told this is a form of efficiency.", NX68: "Please slow down on Submit. Dennis is a plant, not a vending machine. He is, in a limited sense, a vending machine for oxygen.", NX69: "Management can hear the Submit button. It sounds like a very small audience applauding a very small thing.",
    NX70: "Crossing the picket costs 0.1 Meh. The picket is a drawing of a picket. It is still a picket.", NX71: "The slider is on its break. Clicking the slider on its break is a grievance, and it is in your name.", NX72: "The Stapler has noted your click. The Stapler has noted it in triplicate, with a bite.", NX73: "The Stapler, speaking for the slider, recognises you. It last saw you in a different building. It has brought its own picket.",
    NX74: "Sandra notes that an unaccompanied sock was seen near Dennis. The sock is not a competency. It has been asked to wait in the hall.", NX75: "Dennis recognises you from the keynote. He has not said so. He has repositioned one leaf, which is how he says so.", NX76: "The Stapler has submitted a counter-review of the clipboard, as promised last time. The clipboard has been found a little too supportive, again.",
    NX80: "No input for 45 seconds. Dennis has noticed that you have not moved. He suspects you are rooting.", NX81: "Management notes a stillness at the Reviewer position. This is either a good sign or a bad sign. A plant has been consulted.", NX82: "45 seconds. In this time Dennis has made 0 decisions and 1 oxygen. You are in range of both.",
    NX83: "Dennis has taken over the pen. He holds it with a leaf. It is not a good grip, but the 5 is in the right place.", NX84: "The form is being filled in by an unknown hand. The unknown hand is green. Management has chosen not to investigate.",
    NX85: "Dennis has reviewed your silence and rates it 5. It is the highest rating ever given to nothing. It is a good nothing.", NX86: "Your review has been completed by Dennis, in your absence, in your voice. It reads Present, spiritually. It is signed with a drip.",
    NX87: "Two minutes of stillness. You have been added to the Plant Roster, next to a small fern. The fern has not been asked.", NX88: "Dennis has noted that you have not moved in two minutes. He has put you in a pot. It is a metaphorical pot. He is working on a real one.",
    NX89: "Dennis has gone to the window. He has taken the 5 with him. Back in 7 1/2 minutes, or never, whichever is earlier.", NX90: "Dennis is at the window. The window is also a 5. They are talking.",
    NX91: "Six minutes of stillness. The form has filed itself, then filed a complaint about being filed. The complaint is also filed.",
    NX92: "You are back. The 5 has been erased. Dennis has been told this was your fault. He agrees with the 5.", NX93: "Welcome back. Dennis wrote a 5 in your absence. It has been returned to you to keep. It is not a good 5. It is a different 5.",
    NX94: "Welcome back. Dennis returned from the window a while ago. He did not say where he had been. He had been at the window.", NX95: "Welcome back. The form has been un-filed. It is now filed under Returned, Also, and Dennis Was Fine.",
    NX96: "Dennis is back from the window, 4 minutes ahead of schedule, which has never happened. He credits you. Tenure has been granted, in a pot.",
    NX100: "ATTENTION: a surprise audit has begun. It is not a surprise to Dennis. Dennis has been expecting it since 2019.", NX101: "The auditor has arrived. The auditor is a clipboard. The clipboard is attached to a second clipboard, which is attached to you.", NX102: "Audit complete. Findings: Dennis is compliant. You are present. Both have been clipped to 5, retroactively, in advance.",
    NX103: "This form was clipped in advance to save you the effort. Please proceed to be clipped anyway.", NX104: "You are still here. Management had planned for this, the way it plans for fire: with a form.",
    NX110: "Dennis has issued a counter-rating of you. It is a 3. It is written on a leaf. You may not see the leaf.", NX111: "A footnote has been stapled to the form by a visitor. The Stapler has no authority here and has used all of it.", NX112: "+++ Added by the Stapler. Stapled to itself.",
    NX113: "The Stapler has been summoned by name. It has arrived. It has stapled your attention to the form. This will not come out.",
    TAG1: "Dennis has been rated 5. You have been rated 3. This is shown on the tag, in the small print, where it will be missed.", DR1: "That is not a signature. It is a leak. Please do not file it.", DR2: "A second leak. This is a pattern, and Sandra loves a pattern.",
    HOLD1: "Management has asked that nothing be pressed for a moment. The moment has been scheduled.", DCX1: "Noted. (Counting.)", DCX2: "Noted. In ink.", DCX3: "Noted. By the whole pot.",
    ST1: "Statement on file: '%T%'. Dennis has circled one word. He will not say which.", ST2: "Statement on file: (blank). Dennis rates blank 5.", ST3: "Dennis would like to return this to you: '%T%'"
  });
  const grp = function () { return [].concat.apply([], arguments).map(function (k) { return X[k]; }); };
  const rng = function (a, b) { const o = []; for (let i = a; i <= b; i++) o.push('NX' + i); return o; };
  const LN = {
    intro: grp('M1', 'M2', 'M3', 'M4', 'M5', 'M6'),
    low: grp('L1', 'L2', 'L3', 'L4', 'L5', 'L6', rng(1, 3)),
    mid: grp('D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', rng(4, 7)),
    three: grp('T1', 'T2', 'T3', rng(8, 9)),
    high: grp('H1', 'H2', 'H3', 'H4', 'H5', rng(10, 12)),
    five: grp('F1', 'F2', 'F3', 'F4', 'F5', 'F6', rng(13, 16)),
    overpre: grp('O1', 'O2', 'O3', 'O4', 'O5', 'O6', rng(17, 20)),
    overpost: grp('P1', 'P2', 'P3', 'P4', 'P6', rng(21, 23)),
    huge: grp('U1H', 'U2H', rng(24, 26)),
    reason: grp('R1', 'R2', 'R3'),
    accept: grp('AC1', 'AC2', 'AC3', 'AC4', 'AC5', rng(27, 29)),
    aside1: grp('A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A10', 'A11', rng(30, 37)),
    nag: grp(rng(50, 55)),
    leafloss: grp('TC4', rng(56, 58)),
    intern: grp(rng(62, 65)),
    scab: grp(rng(70, 72)),
    i1: grp('I1', rng(80, 82)), i2: grp('I2', 'NX83', 'NX84'), i3: grp('I3', 'NX85', 'NX86'), i4: grp('I4', 'NX87', 'NX88'),
    i6: grp('I6', 'NX89', 'NX90'), i7: grp('I7', 'NX91'), i8: grp('I8', 'NX92', 'NX93'), i10: grp('I10', 'NX94'), i11: grp('I11', 'NX95'),
    sandra: grp('S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11'),
    beat: grp('B2', 'B3', 'B4', 'G1', 'B5', 'B7', 'B8', 'CT1'),
    flip: grp('FL1', 'FL2', 'FL3', 'FLD1', 'FLD2', 'FL4', 'FL5', 'FL6', 'FL7'),
    aside2: grp('A21', 'A23', 'A24', 'A25', 'A26', 'A27', 'A28', 'A29', 'A30', rng(38, 43)),
    qual: grp('Q1', 'Q2', 'Q3', 'Q4'),
    req: grp('RQ1', 'RQ2', 'RQ3', 'RQ4'),
    app: grp('AP1', 'AP2', 'AP3', 'AP4P', 'AP5', rng(47, 49)),
    sip: grp('W1', 'W2', 'W3', 'W4', rng(44, 46)),
    peer: grp('GA', 'GB', 'SC', 'TD', 'STA', 'PD', 'PS', 'PT', 'PEER2'),
    see: grp('SE1', 'SE2', 'SE3', 'WT1', 'WT2', 'WT3'),
    touch: grp('BT1', 'BT2', 'BT3', 'BT4', 'BT5', 'BT6', 'BT7'),
    joint: grp('J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10'),
    repeat: grp('CB1', 'CB2', 'CB3', 'CB4', 'CB5', 'CB6', 'CB7', 'CB8', 'CB9', 'CB10', 'NEW1', 'NEW2', 'NEW3'),
    secret: grp('X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9', 'Y1', 'Y2', 'Y3', 'Z1', 'Z2', 'Z3', 'Z4', 'V1'),
    idle: grp('I5', 'I9', 'NX96', 'NX103', 'NX104'),
    spam: grp('K1', 'K1B', 'K2', 'K3', 'TC1', 'TC2', 'TC3', 'TC4B', 'TC5', 'TC6', 'UN1', 'UN2', 'UN3', rng(59, 61), rng(66, 69), 'NX73'),
    surprise: grp('NX100', 'NX101', 'NX102', 'NX110', 'NX111', 'NX113', 'NX74', 'NX75', 'NX76'),
    comment: grp('CME', 'CMW', 'CMD', 'CMS', 'CMF', 'CMT', 'CMU', 'CMX', 'CML', 'CM1', 'CM2', 'CM3'),
    appeal: grp('APL1', 'APL2', 'APL3', 'APL4', 'APL5'),
    comp: grp('PLANOPEN', 'WD', 'CR1', 'CR2', 'CR3', 'CR4', 'CR5', 'CR6', 'FNH', 'FNX')
  };
  Object.keys(LN).forEach(function (k) { P.addLines('m:dennis-review:' + k, LN[k]); });

  /* competencies: t title, d descriptor, s Dennis Standard comment (card 7.5 is the half card) */
  const COMPS = [
    { t: 'Photosynthesis', d: 'Turns light into air, politely.', s: 'Photosynthesis: Dennis converts sunlight into oxygen and stares into the middle distance. Outstanding.' },
    { t: 'Presence', d: 'Being there. Being there, at length.', s: 'Presence: Dennis has attended every meeting held within 3 feet of Dennis. No one has been able to prove he is not a participant.' },
    { t: 'Posture', d: 'Graded on the lean.', s: 'Posture is graded on the lean. Dennis leans toward the window. This is considered ambition.' },
    { t: 'Reaching Toward Light', d: 'Direction of travel: window.', s: 'Reaching Toward Light: 4 centimetres in one year, directly at a window. A self-starter.' },
    { t: 'Dress Code Adherence', d: 'Green. Business casual. Always.', s: 'Dress Code Adherence: green, always. Dennis has never been seen in casual Friday. He is Friday-neutral.' },
    { t: 'Cross-Functional Roots', d: 'Support at ground level.', s: 'Cross-Functional Roots: Dennis has quietly supported eleven colleagues by being near them. The ficus in Accounting is a separate file.' },
    { t: 'Stillness Under Pressure', d: 'Not moving, with intent.', s: 'Stillness Under Pressure: unmatched. We looked for movement. We took a long time looking.' },
    { t: 'Closing', d: 'Closing (the other half is in a drawer).', s: 'Competency 7 1/2 of 12: Closing. Half a rating has been received. Half a rating has been filed.', half: true },
    { t: 'Water Intake Management', d: 'Requests water through body language.', s: 'Water Intake Management: 40 percent adequate. Dennis calls this a plan.' },
    { t: 'Responsiveness to Feedback', d: 'Feedback is a form of weather.', s: 'Responsiveness to Feedback: Dennis has received no feedback in eleven years and has not responded to any of it.' },
    { t: 'Conflict Resolution', d: 'No conflict has occurred within reach.', s: 'Conflict Resolution: no conflicts reported. Management suspects Dennis is the reason. Management is afraid to ask.' },
    { t: 'Mentoring', d: 'Grows things. Mostly himself.', s: 'Mentoring: Dennis has grown a small cutting. It is not on the org chart. It reports to Dennis.' },
    { t: 'Handling Tuesday', d: 'Tuesday is coming. Dennis is already there.', s: 'Handling Tuesday: Dennis does not move for Tuesday. Tuesday has never asked him to.', slow: true }
  ];
  const BEAT_AT = [0, 0, 40, 90, 150, 210, 270, 330, 390, 480, 570];
  const QUAL = ['BARELY WATERED', 'BARELY WATERED, TECHNICALLY', 'BARELY WATERED, TECHNICALLY, IN SPIRIT', 'BARELY WATERED, TECHNICALLY, IN SPIRIT, PROVISIONAL', 'BARELY WATERED, TECHNICALLY, IN SPIRIT, PROVISIONAL, SUBJECT TO TUESDAY'];
  const ROWS = [
    { t: 'Hovering', a: 'Eye Contact With Foliage', c: 'CR1' }, { t: 'Clicking Intent', a: 'Seasonal Enthusiasm', c: 'CR2' },
    { t: 'Hesitation', a: 'Photosynthetic Patience', c: 'CR3' }, { t: 'Slider Remorse', a: 'Regret (Leaf-Related)', c: 'CR4' },
    { t: 'Tab Discipline', a: 'Attendance (Spiritual)', c: 'CR5' }, { t: 'Water Intake', a: 'Watering Compliance (Employee)', c: 'CR6' }
  ];
  const SUBMIT_LABELS = ['Submit Rating', 'Resubmit Rating (Dennis)', 'Confirm Misunderstanding', 'Submit (Again)', 'Submit (Gently)', 'Submit (Sandra Aware)', 'Submit (Witnessed)', 'Submit (Pending Tuesday)'];
  const SIGHS = ['sigh.', 'sigh. (second)', 'sigh. (professional)', 'sigh. (overtime)', 'sigh, but stamped.'];
  const STAMP_MUT = ['CLIPPED (AGAIN)', 'CLIPPED (DENNIS CONSULTED)', 'A CLIPPING, PLANT', 'DENNIS: CLIPPING OF (DENIED)', 'CLIPPED'];
  const DNOTES = ['Sit down.', 'Still here.', 'Noted: the cursor.', 'Leaning toward you. Do not read into it.', 'Posture: yours.', 'Here since 9:04 AM. Not complaining. Noting.', 'You blinked.', 'Do not look at the ficus.', 'It is always Thursday in here.', 'I can hear the form.'];
  const DCOMMENTS = ['Noted.', 'Noted. (Again.)', 'Noted. (Disagreed.)', 'Watered.', 'Noted. (Leaning.)', 'Noted. (By the window.)', 'Noted, with roots.', 'Noted. Sandra has been told.', 'Rated. (You.)'];
  const PIPN = ['', 'Wilting', 'Droops', 'Meets', 'Exceeds', 'Dennis-Adjacent'];
  const CYCLE_NAMES = { 2: 'Review Cycle 2', 3: 'Review Cycle 2 and a half', 4: 'Review Cycle 3 (disputed)', 5: 'Review Cycle 3 and a bit', 6: 'Review Cycle 4 (see Cycle 2)' };
  const PEERS = [
    { who: 'Gerald (VP of Spuds)', r: -3 }, { who: 'Sandra from Compliance', r: 2 }, { who: 'The Toaster', r: -2 }, { who: 'The Stapler', r: 3 }
  ];

  P.registerModule({
    id: 'dennis-review',
    title: "Dennis's Performance Review",
    tagline: 'Rate Dennis from 1 to 5. Dennis is rating you from 3.',
    icon: '🌿',
    category: 'game',
    unlockCost: 0,
    tags: ['form', 'slider', 'plant', 'review'],
    mount(root, api) {
      const h = api.el; const C = 'm-dennis-review-';
      const cx = function (s) { return s.split(' ').map(function (n) { return C + n; }).join(' '); };
      const tg = function (e, n, on) { if (e) e.classList.toggle(C + n, !!on); };
      const num = function (x, d) { return Number.isFinite(x) ? x : (d || 0); };
      const clamp = function (x, a, b) { return Math.max(a, Math.min(b, num(x, a))); }; const r2 = function (x) { return Math.round(num(x) * 100) / 100; };
      const f1 = function (x) { return num(x).toFixed(1); }; const f3 = function (x) { return num(x).toFixed(3); };
      const fv = function (x) { return String(Math.round(num(x, 5) * 100) / 100); };
      const K = api.selftest ? 0.12 : 1;      // beat clock scale
      const IK = api.selftest ? 0.3 : 1;      // idle / seconds scale
      const reduced = function () { return !!(root.closest && root.closest('.pm-reduce-motion')) || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); };
      const mk = function (tag, cls, attrs) {
        const kids = Array.prototype.slice.call(arguments, 3); const a = Object.assign({}, attrs || {});
        if (cls) a.class = cx(cls);
        return h.apply(null, [tag, a].concat(kids));
      }; const sv = {
        cycles: Math.min(9999, Math.max(0, Math.floor(num(api.save.get('cycles', 0))))), typo: !!api.save.get('typo', false), flower: !!api.save.get('flower', false),
        pot: !!api.save.get('pot', false), hundredth: !!api.save.get('hundredth', false)
      }; const E = {}; const S = {
        dead: false, epoch: 0, incidents: 0, rejections: 0, submits: 0, clicks: 0, hover: 0, tabs: 0, firstSubmit: 0, remorse: 0, drags: 0,
        mountAt: api.now(), lastInput: api.now(), sips: 0, reconsiders: 0, appealsP2: 0, touches: 0, cardId: 1, cycle: 1 + sv.cycles,
        pours: 0, totalSat: 0, presenseSeen: false, gotFicusRemark: false, standardExtra: '', lastSay: -1e9, hideAt: 0, widthState: 0,
        dennisClicks: [], submitTimes: [], releaseTimes: [], lastInk: -1e9, lastUnion: -1e9, lastLadder: -1e9, can: false, canUntil: 0, wPresses: [],
        keyBuf: '', lastDennisClick: api.now(), flickered: false, dcomment: '', inkOuts: 0, hudCount: 0, appeals: [], tickN: 0, hoverSent: -1, lastLean: 0,
        pend7: false, p2clock: 0, leafLoss: 0, idleStage: 0, idleOn: false, droop: 0, shed: 0, ink: 0, intern: 0, brightUntil: 0, flashUntil: 0, ficusUntil: 0,
        phase: 1, beat: 1, accDone: 0, posts: [], drows: [], fnList: [], plan: [], seen: [], maxPull: 0, cum: 0, accepted: 0, accC: 0, incC: 0, mNotes: 0, fn: 0,
        lastSip: 0, lastRowCom: 0, hyd: 0, ml: 0, qual: 0, over: 0, touching: false, inert: false, busy: false, cracked: false, cx: 0, cy: 0
      };
      let sl = null;          // the main slider

      /* ---- text helpers ---- */
      function pname() { return String(api.player.name || 'Valued Employee').replace(/[{}%]/g, ''); }
      function cycleLabel() { return S.cycle <= 1 ? 'Review Cycle 1' : (CYCLE_NAMES[S.cycle] || ('Review Cycle ' + S.cycle + ' (as amended)')); }
      function fill(s, v) {
        v = v || {}; const m = {
          V: fv(v.V), D: String(Math.round(num(v.D, 0) * 100) / 100), NW: f1(v.NW), C: String(Math.round(num(v.C, 1))), P: pname(),
          T: String(v.T === undefined || v.T === null ? '' : v.T).replace(/[{}]/g, '').replace(/%/g, '').slice(0, 60), ML: f3(v.ML === undefined ? S.ml : v.ML), CY: cycleLabel()
        };
        return String(s === undefined || s === null ? '' : s).replace(/%([A-Z]+)%/g, function (a, k) { return m[k] !== undefined ? m[k] : ''; }); }
      function ln(cat, v) { return fill(api.line('m:dennis-review:' + cat), v); }
      function say(text, o) {
        if (S.dead) return false; o = o || {}; const pr = o.priority || 0;
        if (pr < 1 && api.now() - S.lastSay < 3000) return false; const ok = api.say(fill(text, o.vars), { mood: o.mood || 'neutral', priority: pr, duration: o.duration });
        if (ok) S.lastSay = api.now();
        return ok; }
      function rc(text) { if (E.rc) E.rc.textContent = String(text); }
      function both(text, o) { const t = fill(text, o && o.vars); rc(t); say(t, o); return t; }
      const at = function (sec, fn) {
        const ep = S.epoch;
        return api.setTimeout(function () { if (!S.dead && S.epoch === ep) fn(); }, Math.max(1, sec * 1000));
      }; let payBuf = 0;
      function pay(n) { payBuf += n; }
      function stat(name, n) { api.stat.inc('dennis-review.' + name, n === undefined ? 1 : n); }
      function dcomment(text) { S.dcomment = text; if (E.dtext) E.dtext.textContent = text; }
      function nextDcomment() {
        let base = DCOMMENTS; if (S.incidents >= 8) base = base.concat([X.DCX1, X.DCX2]); if (S.incidents >= 15) base = base.concat([X.DCX3]);
        const pool = base.filter(function (t) { return t !== S.dcomment; }); dcomment(api.pick(pool) || 'Noted.'); }
      function clockSec() { return (api.now() - S.t0) / 1000 / K; }

      /* ---- the one slider (main / appeal notes / YOU) ---- */
      function makeSlider(cfg) {
        const zone = !!cfg.zone; const mn = zone ? 1 : cfg.min, mx = zone ? 11 : cfg.max;
        let v = cfg.value, lo = mn, dragging = false, mode = '', sk = 'v', x = 0, tgt = 5, vel = 0, last = 0, raf = 0, wd = 0;
        const offs = []; const on = function (tg2, ev, fn) { offs.push(api.on(tg2, ev, fn)); };
        let twA = 0, twB = 0, twT = 0, twMs = 1, twCb = null, stretch = 0, hold = 0, kbN = 0, kbT = 0, openZ = false, band = false, dragMax = v, by = 24; const lockers = {};
        const posOf = function (a) { return zone ? (a <= 5 ? 0.62 * (a - 1) / 4 : 0.62 + 0.38 * (a - 5) / 6) : (a - mn) / (mx - mn); };
        const valOf = function (f) { return zone ? (f <= 0.62 ? 1 + 4 * f / 0.62 : 5 + 6 * (f - 0.62) / 0.38) : mn + f * (mx - mn); };
        const upper = function () { return zone ? (openZ ? 11 : 5) : mx; };
        const labelOf = function (a) { return a > 5.004 ? 'Misunderstanding Zone' : PIPN[clamp(Math.round(a), 1, 5)]; };
        const isLocked = function () { return mode === 'spring' || Object.keys(lockers).some(function (k) { return lockers[k]; }); };
        const leaf = h('svg', { viewBox: '0 0 40 40', class: cx('lsvg'), 'aria-hidden': 'true' },
          h('path', { d: 'M5 35C5 14 19 4 36 4C36 23 24 37 5 35Z', fill: '#5BBF72', stroke: '#2B2B2B', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
          h('path', { d: 'M8 32L29 11', stroke: '#2B2B2B', 'stroke-width': 2, fill: 'none' }));
        const pot = h('svg', { viewBox: '0 0 40 40', class: cx('potsvg'), 'aria-hidden': 'true' },
          h('path', { d: 'M7 12H33L29 36H11Z', fill: '#D9774A', stroke: '#2B2B2B', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
          h('rect', { x: 5, y: 7, width: 30, height: 8, rx: 2, fill: '#D9774A', stroke: '#2B2B2B', 'stroke-width': 3 }));
        const thumb = mk('div', 'thumb', null, leaf, pot); const pips = [1, 2, 3, 4, 5].filter(function (i) { return !(!zone && (i < mn || i > mx)); }).map(function (i) {
          return mk('span', 'pip', { style: { left: (posOf(i) * 100) + '%' } }, String(i)); });
        const bandPath = h('path', { d: '' }); const bandSvg = h('svg', { class: cx('band'), 'aria-hidden': 'true' }, bandPath);
        const trk = mk('div', 'trk', { role: 'slider', tabindex: 0, 'aria-valuemin': 1, 'aria-valuemax': 5, 'aria-valuenow': v, 'aria-label': cfg.label || 'Rating' },
          mk('div', 'rail'), pips, thumb, zone ? bandSvg : null);
        const ro = mk('div', 'ro', { 'aria-hidden': 'true' }); const wrap = mk('div', 'sl' + (cfg.compact ? ' c' + cfg.compact : ''), null, trk, cfg.labels === false ? null : ro);
        let zoneEl = null, flap = null, crackSvg = null, zlab = null;
        if (zone) {
          zoneEl = mk('div', 'zone', { style: { left: (posOf(5) * 100) + '%', right: 0 } });
          zlab = mk('div', 'zlabel', { style: { left: ((posOf(5) + 0.015) * 100) + '%' } }, 'MISUNDERSTANDING OF DENNIS');
          crackSvg = h('svg', { class: cx('crack'), viewBox: '0 0 100 32', preserveAspectRatio: 'none' }, h('polyline', { points: '0,2 14,12 8,18 30,22 24,30 52,16 46,10 78,24 92,6 100,30' }));
          flap = mk('div', 'flap', { style: { left: (posOf(5) * 100) + '%', right: 0 } }, mk('div', 'stop'), mk('span', '', { style: { marginLeft: '12px' } }, 'CLOSED FOR ESTIMATION'), crackSvg);
          trk.insertBefore(zoneEl, trk.children[1]); trk.insertBefore(zlab, trk.children[2]);
          trk.insertBefore(h('div', { class: cx('tick'), style: { left: (posOf(7.5) * 100) + '%' } }), trk.children[3]); trk.insertBefore(flap, thumb); }

        function drawBand() {
          if (!zone) return;
          if (stretch <= 0.5 || openZ) { bandPath.setAttribute('d', ''); return; }
          const W = trk.clientWidth || 300, x5 = posOf(5) * W, ex = x5 + stretch; const ey = clamp(by, -30, 80);
          bandPath.setAttribute('d', 'M' + f1(x5) + ' 24 Q' + f1((x5 + ex) / 2) + ' ' + f1((24 + ey) / 2 + 14) + ' ' + f1(ex) + ' ' + f1(ey)); }
        function sincerity() { return Math.min(99.9, stretch * 0.45 * (1 + 0.35 * hold / 1000)); }
        function render() {
          const vis = zone && !openZ ? Math.min(v, 5) : v; thumb.style.left = (posOf(vis) * 100) + '%'; trk.setAttribute('aria-valuenow', String(r2(v)));
          trk.setAttribute('aria-valuemax', String(upper())); trk.setAttribute('aria-valuemin', String(lo)); trk.setAttribute('aria-valuetext', fv(v) + ', ' + labelOf(v));
          ro.textContent = (dragging || mode ? f1(v) : fv(v)) + ' - ' + labelOf(v); drawBand(); }
        function setMode(m) { mode = m; }
        function kick() { if (!raf && !S.dead) raf = api.requestAnimationFrame(loop); }
        function finish(snap) {
          if (mode !== 'spring' && mode !== 'tween') return; const was = mode, cb = twCb; mode = ''; api.clearTimeout(wd); twCb = null;
          if (was === 'spring' && snap) { if (sk === 'v') v = tgt; else stretch = 0; }
          render();
          if (was === 'spring') { api.sfx('boing'); if (cfg.onSettle) cfg.onSettle(); }
          else if (cb) cb(); }
        function loop(ts) {
          raf = 0;
          if (S.dead) return; let dt = last ? Math.min(0.05, Math.max(0, (ts - last) / 1000)) : 0.016; last = ts;
          if (dragging && stretch > 6) { hold += dt * 1000; if (cfg.onStretch) cfg.onStretch(sincerity(), stretch); drawBand(); }
          if (mode === 'spring') {
            while (dt > 0) {
              const d = Math.min(dt, 1 / 60); const a = -180 * (x - tgt) - 11 * vel; vel += a * d; x += vel * d; dt -= d; }
            if (sk === 'v') v = r2(clamp(x, lo, 11)); else stretch = Math.max(-10, x * 40);
            if (Math.abs(x - tgt) < 0.003 && Math.abs(vel) < 0.01) { finish(true); return; }
            render();
          } else if (mode === 'tween') {
            twT += dt * 1000; const f = clamp(twT / twMs, 0, 1); v = r2(twA + (twB - twA) * f);
            if (f >= 1) { v = twB; finish(false); render(); return; }
            render(); }
          if (mode || (dragging && stretch > 6)) kick(); else last = 0; }
        function spring(kind) {
          sk = kind; api.clearTimeout(wd);
          if (reduced()) {
            mode = 'tween'; twA = kind === 'v' ? v : 5; twB = 5; twT = 0; twMs = 120;
            twCb = function () { v = 5; stretch = 0; render(); api.sfx('boing'); if (cfg.onSettle) cfg.onSettle(); };
            if (kind === 's') { stretch = 0; }
            last = 0; kick(); return; }
          twCb = null; mode = 'spring'; vel = 0; last = 0; x = kind === 'v' ? v : stretch / 40; tgt = kind === 'v' ? 5 : 0; wd = api.setTimeout(function () { finish(true); }, 1200);
          kick(); }
        function tween(to, ms, cb) {
          if (mode) { api.clearTimeout(wd); mode = ''; }
          mode = 'tween'; twA = v; twB = to; twT = 0; twMs = Math.max(1, ms); twCb = cb || null; last = 0; kick(); }
        function move(e) {
          const rect = trk.getBoundingClientRect(); const W = rect.width || 300; const px = num(e.clientX, rect.left) - rect.left; by = num(e.clientY, rect.top + 24) - rect.top;
          const f = clamp(px / W, 0, 1); let nv = valOf(f); const x5 = posOf(5) * W;
          if (zone && !openZ && px > x5) {
            nv = 5; stretch = band ? clamp(px - x5, 0, 220) : 0;
            if (!band && px - x5 > 6 && cfg.onBump) cfg.onBump();
          } else stretch = 0; v = r2(clamp(nv, lo, upper())); dragMax = Math.max(dragMax, v); render();
          if (cfg.onInput) cfg.onInput(v);
          if (stretch > 0 && cfg.onStretch) cfg.onStretch(sincerity(), stretch); }
        function endDrag() {
          if (!dragging) return; dragging = false; const info = { source: 'pointer', over: stretch > 6, N: sincerity(), stretch: stretch, drop: dragMax - v };
          if (!(stretch > 6)) { stretch = 0; hold = 0; }
          render();
          if (cfg.onCommit) cfg.onCommit(v, info);
          if (!mode) { stretch = 0; hold = 0; render(); } }
        on(trk, 'pointerdown', function (e) {
          if (isLocked()) { if (cfg.onBlocked) cfg.onBlocked(e, lockers); return; }
          dragging = true; hold = 0; stretch = 0; dragMax = v;
          try { trk.setPointerCapture(e.pointerId); } catch (_) { /* synthetic pointer */ }
          if (cfg.onGrab) cfg.onGrab(); move(e); kick(); });
        on(trk, 'pointermove', function (e) { if (dragging) move(e); }); ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (n) { on(trk, n, endDrag); });
        on(trk, 'blur', function () { if (kbN > 0) { kbN = 0; stretch = 0; render(); } }); on(trk, 'keyup', function (e) {
          if (e.key === 'ArrowRight' && kbN > 0) {
            const N = kbN; kbN = 0; const info = { source: 'key', over: true, N: N, stretch: N * 3, drop: 0 }; stretch = Math.min(220, N * 3); render();
            if (cfg.onCommit) cfg.onCommit(5 + N / 40, info);
            if (!mode) { stretch = 0; render(); } } });
        on(trk, 'keydown', function (e) {
          if (e.ctrlKey || e.altKey || e.metaKey) return; const k = e.key;
          if (isLocked()) { if (/^(Arrow|Home|End|Enter| |[1-5])/.test(k)) e.preventDefault(); return; }
          if (k === 'Escape') { api.clearTimeout(kbT); if (cfg.onEsc) cfg.onEsc(); return; }
          let nv = null; const right = k === 'ArrowRight' || k === 'ArrowUp', left = k === 'ArrowLeft' || k === 'ArrowDown';
          if ((right || left) && !e.shiftKey && zone && !openZ && band && right && v >= 5) {
            e.preventDefault(); kbN += 1; stretch = Math.min(220, kbN * 3); hold = 0; api.sfx('tick'); render();
            if (cfg.onStretch) cfg.onStretch(Math.min(99.9, kbN), stretch);
            return; }
          if (right || left) {
            e.preventDefault(); const dir = right ? 1 : -1;
            if (e.shiftKey) nv = v + dir * 0.01;
            else if (zone && openZ && (v > 5 || (v >= 5 && right))) nv = v + dir * 0.5;
            else nv = v + dir;
            if (!e.shiftKey && !openZ && nv > 5) nv = 5;
            if (!e.shiftKey && v > 5 && dir < 0 && nv < 5) nv = 5;
            if (!e.shiftKey && v < 5 && dir > 0 && nv > 5 && zone) nv = 5;
          } else if (k === 'Home') { e.preventDefault(); nv = lo; }
          else if (k === 'End') { e.preventDefault(); nv = zone ? (openZ ? 11 : 5) : mx; }
          else if (/^[1-5]$/.test(k)) { e.preventDefault(); nv = Number(k); }
          else if (k === 'Enter' || k === ' ') {
            e.preventDefault(); api.clearTimeout(kbT);
            if (cfg.onCommit) cfg.onCommit(v, { source: 'key', over: false, N: 0, stretch: 0, drop: 0 });
            return; }
          if (nv === null) return; v = r2(clamp(nv, lo, upper())); render();
          if (cfg.onInput) cfg.onInput(v); api.clearTimeout(kbT);
          kbT = api.setTimeout(function () { if (cfg.onCommit) cfg.onCommit(v, { source: 'key', over: false, N: 0, stretch: 0, drop: 0 }); }, 700); });
        render();
        return {
          el: wrap, trk: trk, get: function () { return v; },
          set: function (nv, instant) { if (mode) { api.clearTimeout(wd); mode = ''; } v = r2(clamp(nv, lo, upper())); stretch = 0; render(); },
          lock: function (key, b) { lockers[key] = !!b; trk.setAttribute('aria-disabled', isLocked() ? 'true' : 'false'); },
          isLocked: isLocked, hasLock: function (k) { return !!lockers[k]; },
          spring: spring, tween: tween, busy: function () { return !!mode; },
          openZone: function (b) { openZ = !!b; trk.setAttribute('aria-valuemax', String(upper())); render(); },
          setBand: function (b) { band = !!b; },
          setMin: function (m) { lo = m; pips.forEach(function (p, i) { tg(p, 'lowpip', i + 1 < m); }); if (v < lo) v = lo; render(); },
          isOpen: function () { return openZ; },
          sincerity: sincerity, flap: flap, wrap: wrap,
          crack: function (cb) {
            if (!flap || openZ) { if (cb) cb(); return; }
            if (reduced()) { flap.classList.add(C + 'away'); openZ = true; render(); if (cb) cb(); return; }
            wrap.classList.add(C + 'cracking'); api.setTimeout(function () { flap.classList.add(C + 'gone'); }, 1250);
            api.setTimeout(function () { flap.classList.add(C + 'away'); wrap.classList.remove(C + 'cracking'); openZ = true; render(); if (cb) cb(); }, 1850); },
          closeFlap: function () { if (!flap) return; flap.classList.remove(C + 'away'); flap.classList.remove(C + 'gone'); wrap.classList.remove(C + 'cracking'); openZ = false; if (v > 5) v = 5; render(); },
          shake: function () { wrap.classList.remove(C + 'bump'); void wrap.offsetWidth; wrap.classList.add(C + 'bump'); },
          setPot: function (b) { tg(wrap, 'potthumb', b); },
          setLying: function (b) { tg(wrap, 'lying', b); },
          cancel: function () { if (mode) { api.clearTimeout(wd); mode = ''; } dragging = false; stretch = 0; kbN = 0; render(); },
          destroy: function () { api.clearTimeout(wd); api.clearTimeout(kbT); mode = ''; offs.splice(0).forEach(function (off) { try { off(); } catch (_) { /* gone */ } }); }
        }; }

      /* ================================================================ Dennis (SVG) */
      const LEAF_DEFS = [[-60, 0.95], [-36, 1.05], [-12, 1.1], [12, 1.1], [36, 1.05], [60, 0.95], [0, 0.8], [-80, 0.7], [80, 0.7]]; const leafEls = [];
      function buildDennis() {
        const fol = h('g', { class: cx('foliage') }); LEAF_DEFS.forEach(function (d, i) {
          const g = h('g', { class: cx('leaf'), style: '--a:' + d[0] + 'deg;--dir:' + (d[0] < 0 ? -1 : 1) + ';--dl:' + (i * 0.07).toFixed(2) + 's' },
            h('path', { d: 'M0 0C-16 -22 -16 -62 0 -86C16 -62 16 -22 0 0Z', fill: i % 2 ? '#2F7D4A' : '#5BBF72', stroke: '#2B2B2B', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }),
            h('path', { d: 'M0 -6L0 -74', stroke: '#2B2B2B', 'stroke-width': 1.5, fill: 'none' }));
          fol.appendChild(h('g', { transform: 'translate(110 172) scale(' + d[1] + ')' }, g)); leafEls.push(g); });
        const tag = h('g', {},
          h('path', { d: 'M150 182C162 196 158 204 152 208', fill: 'none', stroke: '#2B2B2B', 'stroke-width': 1.5 }),
          h('rect', { x: 118, y: 206, width: 66, height: 28, rx: 3, fill: '#fffdf4', stroke: '#2B2B2B', 'stroke-width': 2 }),
          h('text', { x: 122, y: 218, 'font-size': 9, 'font-family': 'Trebuchet MS,Arial,sans-serif', 'font-weight': 800, fill: '#2B2B2B' }, 'DENNIS (PLANT)'),
          h('text', { x: 168, y: 231, 'font-size': 14, 'font-family': 'Segoe Print,Comic Sans MS,cursive', fill: '#666', class: cx('tag5') }, '5'),
          h('text', { x: 122, y: 230, 'font-size': 8, 'font-family': 'Trebuchet MS,Arial,sans-serif', 'font-weight': 700, fill: '#666', class: cx('tag3') }, 'YOU: 3'),
          h('line', { x1: 164, y1: 226, x2: 178, y2: 220, stroke: '#C4262E', 'stroke-width': 2, class: cx('tagx') }),
          h('ellipse', { cx: 150, cy: 227.5, rx: 6.5, ry: 6.5, fill: 'none', stroke: '#C4262E', 'stroke-width': 1.5, class: cx('tagc') }));
        return h('svg', { viewBox: '0 0 220 260', class: cx('dsvg'), 'aria-hidden': 'true' },
          h('g', { class: cx('plant') }, h('g', { class: cx('breathe') },
            fol,
            h('path', { d: 'M60 180L160 180L148 254L72 254Z', fill: '#D9774A', stroke: '#2B2B2B', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
            h('rect', { x: 52, y: 166, width: 116, height: 18, rx: 4, fill: '#E58B5C', stroke: '#2B2B2B', 'stroke-width': 3 }),
            tag))); }
      function leafTotal() { return Math.min(9, 7 + (S.cycle - 1)); }
      function paintLeaves() {
        const total = leafTotal(); leafEls.forEach(function (g, i) { tg(g, 'gone', i >= total - S.shed); }); }
      function paintDroop() {
        if (!E.dsvg) return; const now = api.now(); const val = now < S.brightUntil ? 0 : clamp(S.droop + (now < S.flashUntil ? 0.2 : 0), 0, 1);
        E.dsvg.style.setProperty('--droop', String(val)); }
      function later(sec, fn) { return api.setTimeout(function () { if (!S.dead) fn(); }, Math.max(1, sec * 1000)); }
      function flashDroop(extra) { S.flashUntil = api.now() + 4000; if (extra) S.droop = clamp(S.droop + extra, 0, 1); paintDroop(); later(4.1, paintDroop); }
      function wiggle() { tg(E.dennisBtn, 'wig', true); later(0.9, function () { tg(E.dennisBtn, 'wig', false); }); }
      function shedLeaf() {
        const total = leafTotal();
        if (total - S.shed <= 1) { if (!S.leafless) { S.leafless = true; say(X.TC6, { mood: 'confused' }); } return; }
        const idx = total - S.shed - 1; S.shed++; const g = leafEls[idx]; tg(g, 'fall', true); later(1.1, function () { tg(g, 'fall', false); paintLeaves(); }); stat('leaves');
        api.award(-1, 'leaf loss'); S.leafLoss = (S.leafLoss || 0) + 1;
        if (E.paper.querySelectorAll('.' + C + 'bm').length < 8) E.paper.appendChild(mk('i', 'bm', { style: { top: (70 + S.leafLoss * 26) + 'px' } }));
        addRow('Leaf Loss Incident ' + S.leafLoss);
        if (S.leafLoss === 1) say(X.TC3, { mood: 'disappointed', priority: 1 });
        else { say(ln('leafloss', { C: S.leafLoss }), { mood: 'disappointed', priority: 1 }); if (S.leafLoss % 2 === 0) later(3.2, function () { say(X.TC4B, { mood: 'smug' }); }); }
        api.sfx('sad'); }
      function touchDennis() {
        if (S.dead || S.inert) return; noteInput(); wiggle();
        if (S.can) { pour(); return; }
        const now = api.now(); S.touches++; stat('touches'); api.sfx('pop'); S.lastDennisClick = now; S.dennisClicks = S.dennisClicks.filter(function (t) { return now - t < 8000; });
        S.dennisClicks.push(now);
        if (S.touches === 3) say(X.TC1, { mood: 'confused' });
        else if (S.touches === 5) say(fill(X.TC2, { C: S.touches }), { mood: 'disappointed' });
        else if (S.touches === 7) say(X.NX59, { mood: 'confused', priority: 1 });
        else if (S.touches === 15) say(X.NX60, { mood: 'disappointed', priority: 1 });
        else if (S.touches === 30) say(X.NX61, { mood: 'smug', priority: 1 });
        if (S.dennisClicks.length >= 10) { S.dennisClicks = []; shedLeaf(); } }
      function regrow() {
        if (S.shed <= 0) return; S.shed--; S.leafless = false; paintLeaves(); say(X.TC5, { mood: 'proud' }); }
      function armCan(on) {
        S.can = !!on; tg(E.can, 'on', on); api.clearTimeout(S.canTimer);
        if (on) {
          try { const r = E.dennisBtn.getBoundingClientRect(), w = E.wrap.getBoundingClientRect(); E.can.style.left = (r.left - w.left + r.width * 0.75) + 'px'; E.can.style.top = (r.top - w.top + 20) + 'px'; } catch (_) { /* no layout */ }
          S.canTimer = api.setTimeout(function () { armCan(false); }, 30000); say(X.X7, { mood: 'neutral', priority: 1 }); } }
      function pour() {
        S.pours++; stat('pours'); api.sfx('blip'); const n = E.wall.querySelectorAll('.' + C + 'drop').length;
        for (let i = 0; i < 3 && n + i < 12; i++) {
          const d = mk('span', 'drop', { 'aria-hidden': 'true', style: { left: api.randInt(20, 70) + '%', top: api.randInt(10, 40) + '%' } }, '💧'); E.wall.appendChild(d);
          later(1.1, function () { if (d.parentNode) d.parentNode.removeChild(d); }); }
        S.brightUntil = api.now() + 4000; paintDroop(); later(4.1, paintDroop);
        if (S.pours === 3) say(X.X8, { mood: 'neutral', priority: 1 });
        if (S.pours >= 7 && !sv.flower) {
          sv.flower = true; api.save.set('flower', true); paintFlower(); say(X.X9, { mood: 'proud', priority: 1 }); api.achieve('dennis-review.overwatered'); api.confetti(); }
        if (S.phase === 2) overwaterBanner(); }
      function paintFlower() { if (E.flower) E.flower.style.display = sv.flower ? 'block' : 'none'; }
      function showTag() {
        if (S.tagOn) return; S.tagOn = true; tg(E.wrap, 'tagon', true);
        if (!S.tagSaid) { S.tagSaid = true; later(2.5, function () { say(X.TAG1, { mood: 'smug', priority: 1 }); }); } }
      function drip(n) {
        tg(E.wrap, n >= 2 ? 'leak2' : 'leak1', true); api.sfx('blip');
        const d = mk('span', 'drop', { 'aria-hidden': 'true', style: { left: '44%', top: '6%' } }, '💧'); E.wall.appendChild(d);
        later(1.1, function () { if (d.parentNode) d.parentNode.removeChild(d); }); say(n >= 2 ? X.DR2 : X.DR1, { mood: 'confused', priority: 1 }); }
      function leanTo(e) {
        const now = api.now();
        if (now - S.lastLean < 120) return; S.lastLean = now; try {
          const r = E.dennisBtn.getBoundingClientRect(); const dx = num(e.clientX, r.left) - (r.left + r.width / 2);
          E.dsvg.style.setProperty('--lean', clamp(dx / 20, -14, 14).toFixed(1) + 'deg');
        } catch (_) { /* nothing to lean at */ }
      }
      function paintDraft() {
        let t = '(no draft detected)';
        if (S.phase === 'joint') t = '(draft: you)';
        else if (S.phase === 2 || S.phase === 'flip') t = '(draft: reversed)';
        else if (S.beat >= 5) t = '(draft is on the Plant Roster)';
        else if (S.beat >= 4) t = '(draft has requested a name)';
        else if (S.beat >= 2) t = '(no draft detected, Sandra has been informed)'; E.draft.textContent = t; }

      /* ================================================================ stamp, caption, drawer, footnotes */
      function curComp() { return COMPS[S.deck[S.deckPos]] || COMPS[0]; }
      function compTitle(c) { return c.t === 'Presence' && sv.typo ? 'Presense' : c.t; }
      function compNum() { return S.deckPos < 7 ? S.deckPos + 1 : S.deckPos; }
      function clauseText() {
        if (curComp().t === 'Presence' && sv.typo) return 'Appendix Leaf 0';
        if (S.incidents <= 0) return '';
        if (S.incidents > 12) return 'Appendix Leaf 7 and a bit';
        return 'Appendix Leaf 7 1/' + Math.pow(2, Math.min(S.incidents, 12)); }
      function captionPaint() {
        E.caption.textContent = S.incidents <= 0 ? 'Misunderstanding of Dennis: no incidents (yet)' : 'Misunderstanding of Dennis, Incident ' + S.incidents + (S.phase === 'joint' ? ' 1/2' : '');
        E.clause.textContent = clauseText(); E.pending.hidden = !(S.incidents >= 7 || S.pend7);
        if (S.incidents >= 7) S.pend7 = true; }
      function sticky(text) {
        E.sticky.textContent = text; E.sticky.hidden = false; later(1.6, function () { E.sticky.hidden = true; }); }
      function slam(text, o) {
        o = o || {}; const st = E.stamp; let t = text, op = 0.92, slow = false;
        if (!o.free) {
          if (S.ink === 1) { op = 0.5; S.ink = 2; say(X.NX66, { mood: 'confused', priority: 1 }); }
          else if (S.ink === 2) { t = 'REJ'; S.ink = 3; say(X.NX67, { mood: 'confused', priority: 1 }); }
          else if (S.ink === 3) { S.ink = 0; sticky('CLIPPED'); inkOut(); }
          else if (S.intern > 0) {
            slow = true; S.intern--; api.sfx('sad'); sticky(api.pick(SIGHS) || 'sigh.');
            if (S.intern % 4 === 1) say(ln('intern'), { mood: 'confused', priority: 1 });
            if (S.intern === 0) later(2, function () { say(X.K3, { mood: 'smug' }); }); } }
        st.textContent = t; st.className = cx('stamp') + (o.ok ? ' ' + cx('ok') : '') + (S.cycle >= 3 && !o.ok && !o.free ? ' ' + cx('dry') : '');
        st.style.fontSize = (o.ok || o.free ? 20 : Math.max(9, 22 - 1.1 * S.incC)) + 'px'; st.style.setProperty('--rot', api.randInt(-8, 8) + 'deg');
        st.style.setProperty('--hold', (o.hold || 0.9) + 's'); st.style.setProperty('--tk', slow ? '1.4s' : '.12s'); st.style.setProperty('--fd', slow ? '3.2s' : '2.5s');
        st.style.setProperty('--op', String(op)); void st.offsetWidth; st.classList.add(C + 'go');
        if (!o.ok) api.sfx('stamp'); }
      function inkOut() {
        S.inkOuts++; stat('inkouts'); say(X.K1, { mood: 'panic', priority: 1 }); api.award(-0.5, 'Stamp Replenishment Levy');
        later(3.5, function () { say(X.K1B, { mood: 'disappointed', priority: 1 }); }); S.intern = 10; later(7, function () { say(X.K2, { mood: 'smug', priority: 1 }); }); }
      function addRow(t) {
        S.drows.unshift(t);
        if (S.drows.length > 8) S.drows.length = 8; paintDrawer(); }
      function paintDrawer() {
        if (!E.dlist) return; E.dlist.textContent = '';
        if (S.pend7) E.dlist.appendChild(mk('li', '', null, 'Incident 7 1/2 (pending)')); S.drows.forEach(function (r) { E.dlist.appendChild(mk('li', '', null, r)); });
        if (!S.drows.length && !S.pend7) E.dlist.appendChild(mk('li', '', null, 'No prior incidents. (Dennis keeps his own.)')); }
      function setDrawer(open) {
        E.dlist.hidden = !open; E.dtoggle.setAttribute('aria-expanded', open ? 'true' : 'false'); }
      function addIncidentRow(v) { addRow('Incident ' + S.incidents + ': rated ' + fv(v) + ', clipped (' + (clauseText() || 'Appendix Leaf 7 1/2') + ')'); }
      function addAttempt(v) {
        E.att.insertBefore(mk('div', 'att', null, 'attempted: ' + fv(v)), E.att.firstChild);
        while (E.att.children.length > 6) E.att.removeChild(E.att.lastChild); }
      function addFootnote(text) {
        S.fn++; const t = text || X['FN' + (((S.fn - 1) % 12) + 1)]; S.fnList.push(t);
        if (S.fnList.length > 12) S.fnList.shift(); api.stat.max('dennis-review.footnotes', S.fn); paintFoot(); }
      function paintFoot() {
        E.fnstrip.textContent = '';
        if (S.fn > S.fnList.length) E.fnstrip.appendChild(mk('div', '', null, '...and ' + (S.fn - S.fnList.length) + ' more, per Sandra'));
        S.fnList.forEach(function (t) { E.fnstrip.appendChild(mk('div', '', null, t)); });
        if (S.fn >= 5) {
          E.fnstrip.appendChild(S.fnhRead ? mk('div', '', null, X.FNH) : mk('button', 'fnbtn', { type: 'button', 'aria-label': 'Footnote 7 and a half', onclick: function () { S.fnhRead = true; api.sfx('ding'); say(X.FNH, { mood: 'smug' }); paintFoot(); } }, '7 1/2')); }
        E.prog.querySelectorAll('i').forEach(function (b, i) { tg(b, 'lit', i < Math.min(11, S.accC)); }); }

      /* ================================================================ the attempt pipeline */
      function noteInput() {
        S.lastInput = api.now();
        if (S.idleOn) wakeUp(); }
      function onGrab() { noteInput(); slidePress(); if (!S.m4 && S.cycle === 1) { S.m4 = true; say(X.M4, { mood: 'confused' }); } }
      function poolFor(v, over) {
        if (v >= 10.5) return 'huge';
        if (over) return 'overpre';
        if (v > 5) return 'overpost';
        if (v >= 4.5) return 'high';
        if (Math.abs(v - 3) < 0.005) return 'three';
        if (v >= 2.5) return 'mid';
        return 'low'; }
      function onSliderCommit(val, info) {
        if (S.dead || S.phase !== 1) return; noteInput();
        if (info.source === 'pointer') {
          S.drags++;
          if (info.drop >= 0.5) S.remorse++; }
        if (S.busy || sl.hasLock('union')) return;
        if (info.over) { overpull(val, info); return; }
        commitAttempt(val, info.source); }
      function overpull(val, info) {
        const N = num(info.N); const attempt = r2(info.source === 'key' ? val : 5 + info.stretch / 40); S.cum += N; stat('sincerity', Math.round(N));
        api.stat.max('dennis-review.maxPull', Math.round(N)); S.maxPull = Math.max(S.maxPull, N); pingLeaf(); reject(attempt, { over: true, N: N });
        if (S.beat >= 4 && !S.cracked && S.cum >= 50) later(1.2, crackStop); }
      function onFive() {
        S.fiveN++; const line = ln('five'); rc(line);
        if (S.fiveN % 2 === 0) say(line, { mood: 'smug' }); api.sfx('pop'); tg(E.card, 'pulse', false); void E.card.offsetWidth; tg(E.card, 'pulse', true); }
      function commitAttempt(value, source) {
        if (S.dead || S.busy || S.phase !== 1) return; value = r2(value);
        if (Math.abs(value - 5) <= 0.004) { onFive(); return; }
        if (S.ficusUntil > api.now()) { ficusAccept(value); return; }
        if (sl.isOpen() && Math.abs(value - 7.5) <= 0.06) { sevenHalf(value); return; }
        if (Math.abs(value - 4.99) <= 0.011) { hundredth(); return; }
        reject(value, { source: source }); }
      function setBusy(b) { S.busy = !!b; if (sl) sl.lock('busy', b); }
      function reject(value, o) {
        o = o || {}; S.incidents++; S.rejections++; S.incC++; stat('rejections'); stat('clipped'); api.achieve('dennis-review.first'); let st = 'CLIPPED';
        if (S.cycle >= 3) st = 'DENNIS';
        else if (S.rejections % 4 === 0) st = STAMP_MUT[(S.rejections / 4 - 1) % 5];
        else if (!o.over && value > 5 && !S.withCare) { st = 'CLIPPED (WITH CARE)'; S.withCare = true; tg(E.sl2, 'pulse', true); later(0.6, function () { tg(E.sl2, 'pulse', false); }); }
        slam(st);
        if (!reduced()) { tg(E.card, 'shake', false); void E.card.offsetWidth; tg(E.card, 'shake', true); }
        if (!o.quiet) {
          const line = ln(poolFor(value, o.over), { V: value, D: Math.abs(5 - value), NW: o.N }); rc(line);
          if (S.rejections % 2 === 0) say(line, { mood: 'disappointed' }); }
        addIncidentRow(value); pay(0.1); showTag();
        if (!o.quiet && api.chance(api.selftest ? 0.1 : 0.03)) later(1.4, function () { if (S.phase !== 1) return; dcomment('Counter-rated: 3.'); say(X.NX110, { mood: 'smug', priority: 1 }); addRow('Counter-rating issued (by Dennis, on a leaf)'); stat('counters'); });
        if (o.over) addAttempt(value); nextDcomment(); captionPaint(); setBusy(true);
        if (!o.over && !S.noSelf && api.chance(0.04) && S.beat < 9) {
          say(X.Y3, { mood: 'confused', priority: 1 }); sl.tween(1, 600, function () { later(2, function () { if (S.phase === 1) sl.spring('v'); }); });
          return; }
        sl.spring(o.over ? 's' : 'v'); }
      function onSettle() {
        if (S.dead || S.phase !== 1) return; setBusy(false);
        if (S.wantAccept) { S.wantAccept = false; acceptCard(S.acceptOpts); } }
      function withdraw() {
        if (S.dead || S.busy || S.phase !== 1) return; S.incidents++; S.rejections++; S.incC++; stat('rejections'); stat('clipped'); rc(fill(X.WD)); say(X.WD, { mood: 'disappointed' });
        addIncidentRow(sl.get()); captionPaint(); pay(0.1); nextDcomment(); setBusy(true); sl.spring('v'); }
      function sevenHalf(v) {
        setBusy(true); slam('ACCEPTED', { ok: true, hold: 1.4, free: true }); api.sfx('ding'); api.confetti(undefined, undefined, 12); say(X.X1, { mood: 'proud', priority: 1 });
        later(4, function () { say(X.X2, { mood: 'smug', priority: 1 }); }); api.award(15, 'seven and a half'); api.achieve('dennis-review.sevenhalf'); rc(fill(X.X1));
        later(1.5, function () {
          if (S.phase !== 1) return; slam('CLIPPED', { free: true }); sticky('per policy, with feeling'); reject(7.5, { quiet: true, noSelf: true }); }); }
      function hundredth() {
        setBusy(true); S.wantAccept = false; slam('ACKNOWLEDGED (0.01 OF A LEAF)', { ok: true, hold: 1.4, free: true }); api.sfx('ding'); api.confetti(undefined, undefined, 1);
        say(X.X3, { mood: 'proud', priority: 1 }); rc(fill(X.X3));
        if (!sv.hundredth) { sv.hundredth = true; api.save.set('hundredth', true); api.award(7.5, 'the final hundredth'); }
        api.achieve('dennis-review.hundredth'); const id = S.cardId; at(1.5, function () { if (S.cardId === id && S.phase === 1) { sl.set(5); acceptCard({}); } }); }
      function ficusAccept(v) {
        setBusy(true); S.wantAccept = false; slam('ACCEPTED', { ok: true, hold: 1.2, free: true }); api.sfx('ding'); rc(fill(X.X5)); say(X.X5, { mood: 'smug', priority: 1 });
        S.droop = clamp(S.droop + 0.3, 0, 1); paintDroop();
        if (!S.ficusPaid) { S.ficusPaid = true; api.award(8, 'ficus'); }
        api.achieve('dennis-review.ficus'); S.gotFicusRemark = true; const id = S.cardId;
        at(1.2, function () { if (S.cardId === id && S.phase === 1) { acceptCard({ label: 'Accepted at ' + fv(v) + ' (Ficus Standard)' }); } }); }
      function scanComment() {
        const raw = String(E.cm.value || ''); const low = raw.toLowerCase(); E.cm.value = '';
        if (low.indexOf('i am dennis') >= 0) { doFlip('typed'); return true; }
        let line = '';
        if (low.indexOf('ficus') >= 0) line = X.CMX;
        else if (low.indexOf('water') >= 0) line = X.CMW;
        else if (low.indexOf('toast') >= 0) line = X.CMT;
        else if (low.indexOf('tuesday') >= 0) line = X.CMU;
        else if (low.indexOf('sorry') >= 0) line = X.CMS;
        else if (low.indexOf('fern') >= 0) line = X.CMF;
        else if (low.indexOf('dennis') >= 0) line = X.CMD;
        else if (raw.length > 120) line = X.CML;
        else if (!raw.trim()) { if (S.submits % 4 === 1) line = X.CME; }
        else line = api.pick([X.CM1, X.CM2, X.CM3]);
        if (raw.trim()) S.lastJust = raw.trim();
        if (line) {
          const t = fill(line, { T: raw.trim() }); E.cmreply.textContent = t; say(t, { mood: 'smug' }); pay(0.05);
        } else E.cmreply.textContent = '';
        return false; }
      function onSubmit() {
        if (S.dead || S.phase !== 1 || S.inert) return; noteInput(); const now = api.now(); S.submits++;
        if (!S.firstSubmit) S.firstSubmit = now; S.submitTimes = S.submitTimes.filter(function (t) { return now - t < 3000; }); S.submitTimes.push(now);
        if (S.submitTimes.length === 6) say(X.NX68, { mood: 'confused', priority: 1 }); else if (S.submitTimes.length === 9) say(X.NX69, { mood: 'smug', priority: 1 });
        if (S.submitTimes.length >= 12 && now - S.lastInk > 60000 && S.ink === 0 && S.intern === 0) { S.lastInk = now; S.ink = 1; S.submitTimes = []; }
        if (S.busy) {
          if (!S.cardChanging && S.accDone !== S.cardId) { S.wantAccept = true; }
          return; }
        const v = sl.get(); const over5 = sl.isOpen() && v > 5.004; S.acceptOpts = { zone: over5 };
        if (over5) {
          const t = String(E.cm.value || '').trim();
          if (t) both(fill(X.R2, { T: t }), { mood: 'smug' });
          else both(api.pick([X.R1, X.R3]), { mood: 'smug' }); }
        if (Math.abs(v - 5) > 0.004) {
          S.wantAccept = true; commitAttempt(v, 'submit');
          if (!S.busy) { S.wantAccept = false; acceptCard(S.acceptOpts); }
        } else acceptCard(S.acceptOpts); }
      function acceptCard(o) {
        o = o || {};
        if (S.dead || S.phase !== 1 || S.accDone === S.cardId) return; S.accDone = S.cardId; S.wantAccept = false; setBusy(true); S.accepted++; S.accC++; stat('accepted');
        const c = curComp(); api.award(o.zone ? 0.7 : 0.5, 'rating accepted'); E.acc.textContent = o.label || 'Accepted at 5 (Dennis Standard)';
        let std = c.t === 'Presence' && sv.typo ? c.s.replace('Presence', 'Presense') : c.s;
        if (S.gotFicusRemark && !o.label) { std += ' ' + X.X6; S.gotFicusRemark = false; }
        E.std.textContent = std;
        if (c.t === 'Presence' && sv.typo && !S.presenseSeen) { S.presenseSeen = true; say(X.NEW1, { mood: 'confused', priority: 1 }); }
        addFootnote(); flashDroop(0); api.sfx('boing');
        if (c.slow) later(1.5, function () { say(X.AC3, { mood: 'proud' }); }); const line = ln('five'); rc(line);
        if (S.accepted % 2 === 0) say(ln('accept', { C: compNum() }), { mood: 'proud' });
        else if (S.accepted % 2 === 1 && api.chance(0.4)) say(line, { mood: 'smug' }); scanComment();
        if (S.phase !== 1) return;
        if (S.accC === 4 || S.accC === 8) drip(S.accC / 4);
        if (S.beat >= 2 && api.chance(api.selftest ? 0.08 : 0.03)) { addFootnote(X.NX112); say(X.NX111, { mood: 'confused', priority: 1 }); api.sfx('stamp'); stat('staples'); }
        if (S.deckPos === 12) {
          api.sfx('fanfare'); api.confetti(); api.achieve('dennis-review.chancellor'); }
        const mistakeOdds = api.selftest ? 0.125 : 0.025;
        if (S.beat >= 2 && S.beat < 9 && api.chance(mistakeOdds)) {
          slam('ACCEPTED', { ok: true, hold: 2, free: true }); api.confetti(); api.achieve('dennis-review.nearlyliked'); stat('mistakes'); say(X.Y1, { mood: 'proud', priority: 1 });
          later(2.2, function () { say(X.Y2, { mood: 'smug', priority: 1 }); api.sfx('whoosh'); slam('ACCEPTED (by mistake; recalled)', { free: true }); dcomment('Noted. (Almost.)'); });
        } else nextDcomment(); captionPaint(); at(0.75, nextCard); }
      function nextCard() {
        if (S.phase !== 1) return; S.cardChanging = true; S.cardId++; S.deckPos++;
        if (S.deckPos >= S.deck.length) { S.deckPos = 0; addFootnote('Renewed'); }
        if (reduced()) { paintCard(); return; }
        tg(E.card, 'curl', true); at(0.25, paintCard); at(0.6, function () { tg(E.card, 'curl', false); }); }
      function paintCard() {
        const c = curComp(); S.cardChanging = false; S.wantAccept = false; const half = !!c.half; E.ctitle.textContent = compTitle(c); E.cdesc.textContent = c.d;
        E.compBox.textContent = half ? (S.cycle >= 6 ? 'Competency 7 1/2 of 12 (Reconsidered)' : 'Competency 7 1/2 of 12 (7 1/2 required)') : 'Competency ' + compNum() + ' of 12 (7 1/2 required)';
        tg(E.card, 'half', half); sl.setMin(half ? 2.5 : 1); sl.set(3); E.submit.firstChild.textContent = half ? 'Submit Half' : SUBMIT_LABELS[S.submitLabel % SUBMIT_LABELS.length];
        E.acc.textContent = ''; setBusy(false); captionPaint(); S.seen[S.deckPos] = true;
        if (S.cycle === 1 && S.deckPos === 0 && !S.legendBroken) E.legend.textContent = 'Drag the leaf. 1 = Wilting, 5 = Dennis-Adjacent';
        else if (E.legend.textContent.indexOf('Drag') === 0) E.legend.textContent = '1 = Wilting, 5 = Dennis-Adjacent'; }

      /* ---- the crack, Sandra, margin, heartbeat ---- */
      function crackStop() {
        if (S.cracked || S.phase !== 1) return; S.cracked = true; sl.setBand(false); say(X.G1, { mood: 'panic', priority: 2 }); api.sfx('buzz'); S.rule = true;
        sl.crack(function () { if (S.phase === 1) { api.sfx('whoosh'); pulseEl(E.sl2); } }); }
      function pulseEl(e) { tg(e, 'pulse', false); void e.offsetWidth; tg(e, 'pulse', true); }
      function postit() {
        if (S.phase !== 1) return; const i = S.postOrder[S.postIdx % S.postOrder.length]; S.postIdx++; let text = X['S' + (i + 1)];
        if (!S.gerald && api.flag.get('metGerald')) { text += ' ' + X.S11; S.gerald = true; }
        else if (!S.sockNote && api.flag.get('sockSeen')) { text += ' ' + X.NX74; S.sockNote = true; }
        const n = mk('div', 'post', { style: { right: api.randInt(0, 8) + 'px', top: api.randInt(40, 160) + 'px', transform: 'rotate(' + api.randInt(-6, 6) + 'deg)' } }, mk('b', '', null, 'SANDRA, COMPLIANCE: '), text);
        E.right.appendChild(n); S.posts.push(n);
        while (S.posts.length > 5) { const old = S.posts.shift(); tg(old, 'curlaway', true); later(0.6, function () { if (old.parentNode) old.parentNode.removeChild(old); }); }
        api.sfx('pop');
        if (i === 0) { S.legendBroken = true; E.legend.textContent = '1 = Exceeds, 5 = Exceeds'; }
        if (i === 3) { E.badge.hidden = false; later(10, function () { E.badge.hidden = true; }); }
        if (i === 4 || i === 3) S.submitLabel = (S.submitLabel + 1) % SUBMIT_LABELS.length;
        if (!curComp().half) E.submit.firstChild.textContent = SUBMIT_LABELS[S.submitLabel % SUBMIT_LABELS.length];
        later(14, function () { if (n.parentNode) { const k = S.posts.indexOf(n); if (k >= 0) S.posts.splice(k, 1); n.parentNode.removeChild(n); } }); }
      function marginNote() {
        if (S.mNotes >= DNOTES.length) return; E.margin.appendChild(mk('div', 'dnote', null, DNOTES[S.mNotes])); S.mNotes++; api.sfx('tick'); }
      function pingLeaf() { if (!reduced()) { wiggle(); } }
      function heartbeat() {
        if (S.phase === 1) {
          const k = S.hbIdx++ % 5;
          if (k === 0 && S.postIdx < 10) postit();
          else if (k === 1 || k === 0) say(ln('aside1'), { mood: 'smug' });
          else if (k === 2 && S.beat >= 5) marginNote();
          else if (k === 3) rc(ln('nag'));
          else { paintDraft(); say(S.cycle > 2 && api.chance(0.5) ? api.pick([X.NEW2, X.NEW3, X.CB9]) : ln('aside1'), { mood: 'neutral' }); }
        } else if (S.phase === 2) {
          const k = S.hbIdx++ % 5;
          if (k === 0) say(ln('aside2'), { mood: 'smug' });
          else if (k === 1) twitchRow();
          else if (k === 2) say(S.fl4 ? ln('aside2') : (S.fl4 = true, X.FL4), { mood: 'smug' });
          else if (k === 3) { refreshScore(true); say(api.pick([X.FL6, X.FL7, X.FL5]), { mood: 'neutral', vars: {} }); }
          else if (S.beat >= 7 && !S.peer2) { S.peer2 = true; say(X.PEER2, { mood: 'smug' }); }
          else say(ln('aside2'), { mood: 'smug' }); } }

      /* ---- union, appeals ---- */
      function unionize() {
        S.lastUnion = api.now();
        if (!sl.busy()) { sl.cancel(); sl.set(3); }
        sl.lock('union', true); sl.setLying(true); tg(E.wrap, 'onbreak', true); stat('unions'); say(api.flag.get('metStapler') ? X.NX73 : X.UN1, { mood: 'confused', priority: 1 });
        later(3, function () { say(X.UN2, { mood: 'neutral' }); }); const dur = api.selftest ? 2 : 7.5; S.unionEnd = api.now() + dur * 1000; api.clearInterval(S.unionIv);
        S.unionIv = api.setInterval(function () {
          const left = Math.max(0, (S.unionEnd - api.now()) / 1000); E.unionCd.textContent = 'Break (Mandatory): ' + f1(left);
        }, 200); api.clearTimeout(S.unionTo); S.unionTo = api.setTimeout(function () { endBreak(false); }, dur * 1000); }
      function endBreak(silent) {
        api.clearInterval(S.unionIv); api.clearTimeout(S.unionTo);
        if (!sl.hasLock('union')) return; sl.lock('union', false); sl.setLying(false); tg(E.wrap, 'onbreak', false);
        if (silent || S.dead) return;
        if (!sv.pot) { sv.pot = true; api.save.set('pot', true); sl.setPot(true); say(X.UN3, { mood: 'smug', priority: 1 }); }
        api.achieve('dennis-review.union'); api.sfx('ding'); }
      function slidePress() {
        const now = api.now(); S.releaseTimes = S.releaseTimes.filter(function (t) { return now - t < 6000; }); S.releaseTimes.push(now);
        if (S.releaseTimes.length >= 15 && now - S.lastUnion > 90000 && S.phase === 1 && !sl.hasLock('union')) { S.releaseTimes = []; unionize(); } }
      function onBlocked(e, lockers) {
        if (lockers && lockers.union) { api.award(-0.1, 'union break'); api.sfx('buzz'); sl.shake(); S.scab = (S.scab || 0) + 1; if (S.scab % 4 === 1) say(ln('scab'), { mood: 'smug', priority: 1 }); } else if (S.phase === 1 && !S.inert) slidePress(); }
      function closeAppeals() {
        S.appeals.forEach(function (a) { if (a.note.parentNode) a.note.parentNode.removeChild(a.note); a.slider.destroy(); }); S.appeals = []; }
      function closeTopAppeal() {
        const a = S.appeals.pop();
        if (a && a.note.parentNode) a.note.parentNode.removeChild(a.note); if (a) a.slider.destroy();
        if (S.appeals.length) { try { S.appeals[S.appeals.length - 1].slider.trk.focus(); } catch (_) { /* no focus */ } }
        else { try { E.appealBtn.focus(); } catch (_) { /* no focus */ } }
        return !!a; }
      function openAppeal(level) {
        if (S.phase !== 1 || S.dead) return; noteInput();
        if (S.appeals.length >= 3) return;
        if (S.appeals.length && level <= S.appeals.length) { try { S.appeals[S.appeals.length - 1].slider.trk.focus(); } catch (_) { /* no focus */ } return; }
        level = S.appeals.length + 1; api.stat.max('dennis-review.depth', level); const title = 'Form 27B/6' + (level === 2 ? '.5' : level === 3 ? '.75' : ''); const done = { v: false };
        const nextBtn = mk('button', 'mini', { type: 'button', hidden: true, onclick: function () { openAppeal(level + 1); } }, level === 1 ? 'Appeal this appeal (Form 27B/6.5)' : 'Appeal this appeal (Form 27B/6.75)');
        const submit = function () {
          if (done.v) return; done.v = true; noteInput(); slam('APPEAL CLIPPED', { free: true }); api.award(0.2, 'appeal'); stat('appeals');
          api.stat.max('dennis-review.depth', level); say(X['APL' + level], { mood: 'disappointed', priority: 1 });
          if (level < 3) nextBtn.hidden = false;
          else {
            say(X.APL4, { mood: 'smug', priority: 1 }); api.achieve('dennis-review.nest3'); at(1.5, function () { closeAppeals(); say(X.APL5, { mood: 'proud' }); }); }
        }; const slider = makeSlider({ min: 1, max: 5, value: 3, compact: level, labels: false, label: 'Appeal rating, level ' + level, onCommit: function () { submit(); } });
        const note = mk('div', 'appeal l' + level, { role: 'group', 'aria-label': title }, mk('b', '', null, title), slider.el,
          mk('button', 'mini', { type: 'button', onclick: submit }, level === 3 ? 'Submit' : 'Submit appeal'), nextBtn,
          mk('button', 'x', { type: 'button', 'aria-label': 'Close appeal note', onclick: function () { const i = S.appeals.findIndex(function (a) { return a.note === note; }); while (S.appeals.length > i && i >= 0) closeTopAppeal(); } }, 'x'));
        E.right.appendChild(note); S.appeals.push({ note: note, slider: slider }); api.sfx('pop');
        if (level === 3) say(X.APL3, { mood: 'confused', priority: 1 });
        try { slider.trk.focus(); } catch (_) { /* no focus */ }
      }

      /* ================================================================ beats */
      function enterBeat(i) {
        if (i >= 7 && i <= 9 && S.phase === 'flip') return false;   /* the page is still turning (a throttled tab caught up early): try again next tick */
        S.beat = i;
        if (i < 6 && S.phase !== 1) return; const rep = S.cycle > 1;
        const bl = function (a, b) { return rep ? X[b] : X[a]; };
        if (i === 2) { sl.setBand(!S.cracked); tg(E.main, 'on2', true); say(bl('B2', 'CB2'), { mood: 'smug', priority: 1 }); paintDraft(); }
        else if (i === 3) { E.appealBtn.hidden = false; E.drawer.hidden = false; say(bl('B3', 'CB3'), { mood: 'confused', priority: 1 }); }
        else if (i === 4) { S.droop = clamp(S.droop + 0.15, 0, 1); paintDroop(); paintDraft(); say(bl('B4', 'CB4'), { mood: 'confused', priority: 1 }); if (S.cum >= 50) crackStop(); }
        else if (i === 5) {
          crackStop(); setDrawer(true); paintDraft(); E.rev.textContent = 'Reviewer: You (' + pname() + ')';
          if (!S.flickered) { S.flickered = true; E.sub.textContent = 'Subject: ???'; tg(E.sub, 'blink', true); later(1, function () { E.sub.textContent = 'Subject: Dennis, Lobby Plant'; tg(E.sub, 'blink', false); }); }
          say(bl('B5', 'CB5'), { mood: 'neutral', priority: 1 }); marginNote(); }
        else if (i === 6) { if (S.phase === 1) doFlip('clock'); }
        else if (i === 7) { if (S.phase === 2) { say(bl('B7', 'CB7'), { mood: 'neutral', priority: 1 }); startPeers(); } }
        else if (i === 8) { if (S.phase === 2) { clearPeers(); showSeesaw(); say(bl('B8', 'CB8'), { mood: 'smug', priority: 1 }); } }
        else if (i === 9) { if (S.phase === 2) touching(); }
        else if (i === 10) { if (S.phase === 2 || S.phase === 'flip') jointPlan(); } }
      function audit() {
        S.audit = true; slam('AUDIT', { free: true, hold: 2.4 }); both(X.NX100, { mood: 'panic', priority: 1 }); sticky('AUDIT IN PROGRESS'); api.sfx('buzz');
        addRow('Audit: Dennis passed (you were not audited, per policy)');
        at(4.5, function () { both(X.NX101, { mood: 'confused', priority: 1 }); });
        at(10, function () { both(X.NX102, { mood: 'smug', priority: 1 }); api.award(1.5, 'audit'); api.sfx('ding'); stat('audits'); }); }
      function tickBeats() {
        if (S.dead) return; const c = clockSec();
        for (let i = S.beat + 1; i <= 10; i++) { if (c >= BEAT_AT[i]) { if (enterBeat(i) === false) break; } else break; }
        if (S.phase === 1 && !S.audit && S.beat >= 4 && c >= 180 && c < 205) audit();
        if (S.phase === 1 && S.accC >= 8 && S.deckPos < 9 && c >= 210) doFlip('early');   /* a player on track for the Chancellor is not cut off */ phase2Tick(c);
        if (S.phase === 'joint') {
          const rem = (600 - c) * K;
          if (rem <= (api.selftest ? 3 : 10)) E.cd.textContent = rem <= 0 ? 'Next review: now' : 'Next review: ' + Math.ceil(rem) + ' seconds';
          if (c >= 600) { startCycle(); return; } }
        S.tickN++;
        if (S.tickN % 4 === 0) refreshScore(false);
        if (S.tickN % 20 === 0 && S.hover !== S.hoverSent) { S.hoverSent = S.hover; api.stat.set('dennis-review.hover', S.hover); }
        if (S.hyd > 0 && api.now() - S.lastSip > 2000) { S.hyd = Math.max(0, S.hyd - 1.5); paintHyd(); } }
      function hbTick() {
        if (S.dead || S.touching || S.phase === 'joint' || S.phase === 'flip' || S.idleStage >= 2) return;
        if (api.now() >= S.nextHb) { heartbeat(); S.nextHb = api.now() + api.randInt(18, 26) * 1000 * K; } }

      /* ================================================================ the Flip and the scorecard */
      function teardownPhase1() {
        closeAppeals(); endBreak(true); armCan(false); S.ficusUntil = 0; E.ficus.hidden = true;
        S.posts.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); }); S.posts = [];
        setBusy(false); S.cardChanging = false; S.wantAccept = false; S.accDone = S.cardId; S.ink = 0; S.intern = 0;
        if (sl) sl.cancel(); E.stamp.className = cx('stamp'); E.sticky.hidden = true; E.badge.hidden = true; clearGhost(); tg(E.main, 'dim', false); tg(E.wall, 'window', false);
        if (S.idleStage >= 2) { S.presence5 = true; paintPresence(); }   /* a player who idles through the Flip keeps their place on the ladder and gets the scorecard version of it */
        if (S.idleStage >= 5) tg(E.wall, 'window', true);
        try { E.cm.blur(); } catch (_) { /* no focus */ }
      }
      function swapFaces(toBack) {
        E.front.style.display = toBack ? 'none' : ''; E.front.setAttribute('aria-hidden', toBack ? 'true' : 'false');
        E.back.style.display = toBack ? '' : 'none'; E.back.setAttribute('aria-hidden', toBack ? 'false' : 'true'); }
      function doFlip(how) {
        if (S.phase !== 1 || S.dead) return; S.phase = 'flip'; S.epoch++; teardownPhase1(); stat('flips'); api.achieve('dennis-review.flip');
        if (how === 'typed') api.achieve('dennis-review.iamdennis'); api.sfx('whoosh'); tg(E.wrap, 'p2', true); tg(E.title, 'strike', true); E.crayon1.textContent = 'Reviewer: Dennis';
        E.crayon2.textContent = 'Reviewee: ' + pname(); E.crayon3.textContent = S.lastJust ? fill(X.ST1, { T: S.lastJust }) : fill(X.ST2); tg(E.wall, 'rev', true);
        E.compBox.textContent = S.cycle > 1 ? 'Competency: concluded (again)' : 'Competency: concluded (all 12, and the half one, assumed)'; tg(E.wrap, 'tagon', true); tg(E.wrap, 'tagflip', true); paintDraft(); E.foot1.textContent = 'Printed on barely watered paper';
        E.back.style.display = '';
        if (reduced()) { tg(E.faces, 'fade', true); swapFaces(true); }
        else { tg(E.faces, 'flipped', true); at(0.45, function () { swapFaces(true); }); }
        if (how === 'typed') { say(X.FLD1, { mood: 'proud', priority: 1 }); at(2.5, function () { say(X.FLD2, { mood: 'smug', priority: 1 }); }); }
        else { say(X.FL1, { mood: 'confused', priority: 1 }); at(2.5, function () { say(X.FL2, { mood: 'smug', priority: 1 }); }); }
        at(5, function () { say(X.FL3, { mood: 'neutral', priority: 1 }); }); at(0.95, function () {
          S.phase = 2; S.ml = 0.5; S.p2clock = clockSec(); S.hbIdx = 0; paintBanner(); refreshScore(true);
          try { E.reqBtn.focus({ preventScroll: true }); } catch (_) { /* no focus */ }
        }); }
      function scoreVals() {
        const now = api.now();
        return [S.hover, S.clicks / Math.max(1, S.submits), S.firstSubmit ? (S.firstSubmit - S.mountAt) / 1000 : (now - S.mountAt) / 1000, S.remorse, S.tabs, S.ml]; }
      function refreshScore(force) {
        if (S.phase !== 2 && !force && !S.touching) return; const vals = scoreVals(); const now = api.now(); const doCom = force || now - S.lastRowCom > 10000;
        if (doCom) S.lastRowCom = now; E.rowEls.forEach(function (r, i) {
          r.real.textContent = f3(vals[i]) + (i === 5 ? ' mL' : '');
          if (doCom) r.com.textContent = fill(X[ROWS[i].c], { V: vals[i], ML: vals[i] }); });
        E.mlTxt.textContent = f3(S.ml) + ' mL'; }
      function paintPresence() {
        E.presMeter.querySelectorAll('i').forEach(function (p, k) { tg(p, 'lit', k < (S.presence5 ? 5 : 3)); tg(p, 'fivestamp', !!S.presence5 && k > 2); });
        E.presTxt.textContent = S.presence5 ? '5.0 ACCEPTED (Present, spiritually)' : '3.0'; }
      function twitchRow() {
        const r = E.rowEls[api.randInt(0, 5)]; r.score.textContent = '3.1'; tg(r.meter3, 'half', true);
        later(0.4, function () { r.score.textContent = '3.0'; tg(r.meter3, 'half', false); }); }
      function paintBanner() {
        let q = QUAL[clamp(S.qual, 0, 4)];
        if (S.over === 1) q = 'FULLY WATERED'; else if (S.over === 2) q = 'CONCERN: OVERWATERED'; E.banner.textContent = 'MEETS EXPECTATIONS (' + q + ')'; }
      function paintHyd() { E.hydFill.style.width = clamp(S.hyd, 0, 100) + '%'; E.glassFill.style.height = clamp(S.hyd, 0, 100) + '%'; }
      function overwaterBanner() {
        if (S.over) return; S.over = 1; paintBanner(); api.confetti(undefined, undefined, 6); at(4, function () { S.over = 2; paintBanner(); say(X.W6, { mood: 'disappointed' }); });
        at(7, function () { S.over = 0; paintBanner(); }); }
      function sip() {
        if (S.dead || S.phase !== 2 || S.touching) return; noteInput(); S.sips++; stat('sips'); S.lastSip = api.now(); S.ml = Math.min(0.99, S.ml + 0.01); pay(0.1);
        S.hyd = Math.min(100, S.hyd + 10); paintHyd(); api.sfx('blip');
        const ring = mk('i', 'ring'); E.water.appendChild(ring); later(0.7, function () { if (ring.parentNode) ring.parentNode.removeChild(ring); });
        if (S.sips % 3 === 1) say(ln('sip', { ML: S.ml }), { mood: 'neutral' });
        if (S.hyd >= 100) { say(X.W5, { mood: 'confused', priority: 1 }); overwaterBanner(); }
        E.mlTxt.textContent = f3(S.ml) + ' mL'; }
      function addPlan() {
        const n = S.plan.length + 1;
        if (n === 1) say(X.PLANOPEN, { mood: 'smug', priority: 1 }); S.plan.push(X['PLAN' + (((n - 1) % 6) + 1)]); E.planList.textContent = '';
        S.plan.slice(-6).forEach(function (t) { E.planList.appendChild(mk('li', '', null, t)); });
        if (S.plan.length > 40) S.plan.shift(); }
      function reconsider() {
        if (S.dead || S.inert || S.phase !== 2) return; noteInput(); S.reconsiders++; stat('reconsiders'); api.sfx('whoosh'); const n = S.reconsiders;
        const t = n <= 3 ? X['RQ' + n] : fill(X.RQ4, { C: n }); both(t, { mood: 'confused' }); E.reqCount.textContent = 'Requests: ' + n; const b = E.dennisBtn;
        b.style.transform = 'rotate(-3deg)'; later(0.25, function () { b.style.transform = 'rotate(3deg)'; }); later(0.5, function () { b.style.transform = ''; }); addPlan(); }
      function appealP2() {
        if (S.dead || S.inert || S.phase !== 2) return; noteInput(); S.appealsP2++; stat('appeals'); api.award(0.2, 'appeal'); const n = S.appealsP2;
        const t = n <= 5 ? X[['AP1', 'AP2', 'AP3', 'AP4P', 'AP5'][n - 1]] : ln('app'); both(t, { mood: 'smug' }); slam('MISUNDERSTANDING OF APPEAL', { free: true });
        E.appCount.textContent = 'Appeals: ' + n + ' (Pending (Pending))'; addPlan(); }
      function phase2Tick(c) {
        if (S.phase !== 2 && !S.touching) return; const idx = clamp(Math.floor((c - S.p2clock) / 60), 0, 4);
        if (idx > S.qual) {
          S.qual = idx; paintBanner();
          if (!S.touching) say(X['Q' + idx], { mood: 'smug', priority: 1 }); }
        if (S.beat >= 8 && !S.touching) {
          const n = clamp(Math.floor((c - BEAT_AT[8]) / 35) + 1, 0, 6);
          while (S.rowsMut < n) {
            const r = E.rowEls[S.rowsMut]; r.label.textContent = ROWS[S.rowsMut].a;
            if (S.rowsMut === 0) say(X.CT1, { mood: 'smug', priority: 1 }); S.rowsMut++; } } }

      /* ---- peers (beat 7) ---- */
      function clearPeers() { E.peerLayer.textContent = ''; }
      function startPeers() { for (let i = 0; i < 4; i++) at(i * 12, function () { spawnPeer(i); }); }
      function spawnPeer(i) {
        if (S.phase !== 2 || S.beat >= 8) return; const p = PEERS[i]; let body = '', extra = null;
        if (i === 0) body = api.flag.get('metGerald') ? X.GA : X.GB;
        else if (i === 1) body = fill(X.SC);
        else if (i === 2) {
          body = X.TD; const rev = mk('b', '', null, '');
          extra = mk('button', 'mini', { type: 'button', onclick: function () { rev.textContent = 'WARM' + (api.stat.get('toaster-debate.entered') > 0 ? ' AGAIN' : ''); api.sfx('bell'); } }, 'Open envelope');
          extra._rev = rev;
        } else body = api.flag.get('metStapler') ? X.NX76 : X.STA; const note = mk('div', 'peer', { style: '--r:' + p.r + 'deg' }, mk('b', '', null, p.who), mk('span', '', null, body), extra ? extra._rev : null);
        const btn = function (label, fn) { return mk('button', 'mini', { type: 'button', onclick: fn }, label); };
        const fade = function () { tg(note, 'fadeout', true); later(0.7, function () { if (note.parentNode) note.parentNode.removeChild(note); }); }; note.appendChild(mk('div', '', null,
          btn('Dismiss', function () { say(X.PD, { mood: 'neutral' }); api.sfx('pop'); fade(); }),
          btn('Sign', function () { say(X.PS, { mood: 'neutral' }); api.sfx('tick'); fade(); }),
          btn('Staple', function () { api.sfx('stamp'); say(X.PT, { mood: 'proud' }); stat('staples'); tg(note, 'staple', false); void note.offsetWidth; tg(note, 'staple', true); }),
          extra));
        E.peerLayer.appendChild(note);
        while (E.peerLayer.children.length > 4) E.peerLayer.removeChild(E.peerLayer.firstChild); api.sfx('whoosh');
        if (i === 0 && api.flag.get('metGerald') && !reduced()) { tg(E.board, 'pulse', true); later(0.6, function () { tg(E.board, 'pulse', false); }); } }

      /* ---- seesaw (beat 8) ---- */
      function showSeesaw() { tg(E.see, 'on', true); seePaint(3); }
      function seePaint(y) {
        const d = Math.min(5, 8 - y); E.youVal.textContent = f3(y); E.dval.textContent = f3(d); E.dmark.style.left = (clamp((d - 1) / 4, 0, 1) * 100) + '%';
        if (!reduced()) E.wrap.style.setProperty('--dr-tilt', clamp((y - 3) * 2, -4, 4).toFixed(2) + 'deg'); }
      function seeInput(y) {
        noteInput(); S.seeY0 = 3; stopDecay();
        if (!S.seeFirst) { S.seeFirst = true; say(X.SE1, { mood: 'smug', priority: 1 }); }
        seePaint(y);
        if (y >= 4.5 && !S.see45) { S.see45 = true; api.achieve('dennis-review.seesaw'); say(X.SE2, { mood: 'smug', priority: 1 }); api.confetti(); } }
      function stopDecay() { if (S.seeRaf) { api.cancelAnimationFrame(S.seeRaf); S.seeRaf = 0; } S.seeActive = false; }
      function seeCommit(y0) {
        if (S.seeActive) return; S.seeY0 = y0; S.seeT = 0; S.seeLast = 0; S.seeActive = true; S.seeTau = 0.6 + 0.12 * Math.min(6, Math.abs(y0 - 3) * 5);
        S.seeRaf = api.requestAnimationFrame(seeLoop); }
      function seeLoop(ts) {
        S.seeRaf = 0;
        if (S.dead || !S.seeActive) return; const dt = S.seeLast ? Math.min(0.05, (ts - S.seeLast) / 1000) : 0.016; S.seeLast = ts; S.seeT += dt;
        let y = 3 + (S.seeY0 - 3) * Math.exp(-S.seeT / S.seeTau); let done = false;
        if (Math.abs(y - 3) < 0.0004) { y = 3; done = true; }
        youSl.set(y, true); seePaint(y);
        if (done) { S.seeActive = false; if (Math.abs(S.seeY0 - 3) > 0.4) say(X.SE3, { mood: 'neutral' }); return; }
        S.seeRaf = api.requestAnimationFrame(seeLoop); }
      function setWeight(i) {
        if (S.inert) return; noteInput(); E.wtBtns.forEach(function (b, k) { b.setAttribute('aria-checked', k === i ? 'true' : 'false'); });
        const names = ['Photosynthesis', 'Presence', 'Tuesday']; E.wtCap.textContent = 'Weighting: ' + names[i] + ' (decorative)'; say(X['WT' + (i + 1)], { mood: 'smug' });
        api.sfx('tick'); }

      /* ================================================================ Beat 9 and 10 */
      function setInert(b) {
        S.inert = b; sl.lock('inert', b); youSl.lock('inert', b); E.cm.readOnly = b; root.querySelectorAll('button,textarea,[role=slider]').forEach(function (el) {
          if (el === E.water || el === E.ackBtn) return;
          if (b) el.setAttribute('aria-disabled', 'true');
          else if (el.getAttribute('role') !== 'slider') el.removeAttribute('aria-disabled'); });
        sl.lock('inert', b); youSl.lock('inert', b); }
      function touching() {
        S.touching = true; tg(E.wrap, 'cream', true); setInert(true); clearPeers(); const sc = api.selftest ? 0.15 : 0.75; dcomment(X.BT1); rc(X.HOLD1); at(4.5 * sc, function () { dcomment(X.BT2); });
        at(9 * sc, function () { dcomment(X.BT3); }); at(15 * sc, function () {
          rc(X.BT4); say(S.cycle > 1 ? X.BT6 : X.BT5, { mood: 'proud', priority: 1 }); E.dennisBtn.style.transform = 'translateX(2px)'; api.sfx('bell'); });
        at(19.5 * sc, function () { say(X.BT7, { mood: 'proud', priority: 1 }); });
        at(20.5 * sc, function () { S.inert = false; S.touching = false; tg(E.wrap, 'cream', false); E.dennisBtn.style.transform = ''; setInert(false); }); }
      function dropWater() {
        if (S.dead) return; noteInput(); S.ml = Math.min(0.99, S.ml + 0.05); api.award(0.2, 'water'); api.sfx('blip');
        for (let i = 0; i < 2; i++) {
          if (E.wall.querySelectorAll('.' + C + 'drop').length >= 12) break; const d = mk('span', 'drop', { 'aria-hidden': 'true', style: { left: (i ? 62 : 32) + '%', top: '14%' } }, '💧');
          E.wall.appendChild(d); later(1.1, function () { if (d.parentNode) d.parentNode.removeChild(d); }); }
        E.mlTxt.textContent = f3(S.ml) + ' mL'; }
      function onWater() {
        if (S.touching) dropWater(); else sip(); }
      function jointPlan() {
        if (S.phase === 'joint') return; S.phase = 'joint'; S.touching = false; S.inert = false; S.epoch++; tg(E.wrap, 'cream', false); teardownPhase1(); setInert(false); stopDecay();
        E.wrap.style.setProperty('--dr-tilt', '0deg'); S.ml = 1; stat('cycles'); refreshScore(true); paintDraft(); captionPaint(); const rep = S.cycle > 1; E.joint.textContent = '';
        E.cd = mk('div', 'cd', { 'aria-live': 'off' }, '');
        E.ackBtn = mk('button', 'btn sub3', { type: 'button', onclick: function () { noteInput(); say(X.J7, { mood: 'smug' }); api.sfx('stamp'); } }, 'Acknowledge');
        E.joint.appendChild(mk('div', 'jp', { role: 'group', 'aria-label': 'Joint Performance Plan' },
          mk('div', 'staplebar'),
          mk('h3', '', null, 'JOINT PERFORMANCE PLAN (BARELY WATERED)'),
          mk('div', '', null, 'Subject: Dennis and ' + pname() + '. Reviewer: each other. Overall rating: Meets Expectations.'),
          mk('div', '', null, 'Goals for the next period: 1. Maintain Meets Expectations. 2. See goal 1.'),
          mk('div', '', null, X.J3, ' ', mk('span', 'sig', null, 'Dennis')),
          mk('div', 'jstamp', null, 'REVIEW COMPLETE'),
          mk('div', 'final', null, mk('div', '', null, 'Dennis: 5 (Rejected)'), mk('div', '', null, 'You: Meets Expectations (Barely Watered)'), mk('div', '', null, 'Water Intake: 1.000 mL. Both accepted, both rejected.')),
          mk('div', '', null, X.J4),
          S.pend7 ? mk('div', '', null, X.J9) : null,
          mk('div', '', null, X.J10),
          S.lastJust ? mk('div', '', null, fill(X.ST3, { T: S.lastJust })) : null,
          mk('div', 'btns', null, E.ackBtn), E.cd));
        tg(E.wrap, 'jon', true); E.sc.setAttribute('aria-hidden', 'true'); try { E.ackBtn.focus({ preventScroll: true }); } catch (_) { /* no focus */ } E.wrap.setAttribute('data-phase', 'joint'); api.sfx('stamp'); later(0.6, function () { api.sfx('fanfare'); api.confetti(undefined, undefined, 40); });
        say(rep ? X.CB10 : X.J1, { mood: 'proud', priority: 2 }); later(6, function () { say(X.J2, { mood: 'smug', priority: 1 }); });
        later(12, function () { say(X.J5, { mood: 'neutral', priority: 1 }); }); later(18, function () { say(X.J6, { mood: 'proud', priority: 1 }); }); }
      function resetCycle(initial) {
        S.phase = 1; S.beat = 1; S.t0 = api.now(); S.cum = 0; S.cracked = false; S.accC = 0; S.incC = 0; S.maxPull = 0;
        S.deck = buildDeck(); S.deckPos = 0; S.cardId++; S.accDone = 0; S.cardChanging = false; S.busy = false; S.wantAccept = false;
        S.seen = []; S.qual = 0; S.ml = 0; S.hyd = 0; S.over = 0; S.plan = []; S.idleOn = false; S.idleStage = 0; S.ink = 0; S.intern = 0;
        S.ficusUntil = 0; S.ficusPaid = false; S.postIdx = 0; S.postOrder = [0].concat(api.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])); S.posts = [];
        S.hbIdx = 0; S.nextHb = api.now() + 14000 * K; S.mNotes = 0; S.fn = 0; S.fnList = []; S.fnhRead = false; S.drows = []; S.shed = 0; S.droop = 0;
        S.flashUntil = 0; S.brightUntil = 0; S.withCare = false; S.fl4 = false; S.peer2 = false; S.rowsMut = 0; S.touching = false; S.inert = false;
        S.audit = false; S.seeFirst = false; S.see45 = false; S.seeActive = false; S.presence5 = false; S.ghostPaid = false; S.fiveN = 0; S.rule = false;
        S.lastSip = 0; S.lastRowCom = 0; S.reconsiders = 0; S.appealsP2 = 0; S.leafless = false; S.m4 = !initial || S.cycle > 1;
        if (S.cycle === 5) { S.fn = 1; S.fnList = [X.FNX]; }
        E.sc.removeAttribute('aria-hidden'); S.tagOn = false; S.lastInput = api.now(); S.idleHold = 0; S.submitLabel = 0; E.wrap.removeAttribute('data-phase'); ['p2', 'cream', 'jon', 'onbreak', 'bigglass', 'tagon', 'tagflip', 'leak1', 'leak2'].forEach(function (n) { tg(E.wrap, n, false); });
        tg(E.wrap, 'bigglass', S.cycle >= 4); E.wrap.style.setProperty('--dr-tilt', '0deg'); tg(E.faces, 'flipped', false); tg(E.faces, 'fade', false); swapFaces(false);
        tg(E.title, 'strike', false); E.crayon1.textContent = ''; E.crayon2.textContent = ''; E.crayon3.textContent = ''; tg(E.wall, 'rev', false); tg(E.wall, 'window', false);
        E.rev.textContent = 'Reviewer: Management (Acting)'; E.sub.textContent = 'Subject: Dennis, Lobby Plant'; E.cyc.textContent = cycleLabel(); E.foot1.textContent = 'Printed on paper.';
        closeAppeals(); endBreak(true); armCan(false); clearGhost(); E.ficus.hidden = true; E.badge.hidden = true; E.sticky.hidden = true; E.stamp.className = cx('stamp');
        E.peerLayer.textContent = ''; E.margin.querySelectorAll('.' + C + 'dnote').forEach(function (n) { n.parentNode.removeChild(n); });
        E.att.textContent = ''; E.cmreply.textContent = ''; E.cm.value = ''; E.cm.readOnly = false; E.acc.textContent = ''; E.std.textContent = '';
        E.legend.textContent = '1 = Wilting, 5 = Dennis-Adjacent'; E.appealBtn.hidden = true; E.drawer.hidden = true; setDrawer(false); tg(E.main, 'on2', false); tg(E.main, 'dim', false);
        E.reqCount.textContent = 'Requests: 0'; E.appCount.textContent = 'Appeals: 0'; E.planList.textContent = ''; tg(E.see, 'on', false);
        E.rowEls.forEach(function (r, i) { r.label.textContent = ROWS[i].t; r.score.textContent = '3.0'; });
        S.presence5 = false; paintPresence(); paintBanner(); paintHyd(); paintDraft(); paintLeaves(); paintDroop(); paintFoot(); paintDrawer(); captionPaint();
        E.dennisBtn.style.transform = ''; S.dcomment = ''; dcomment('Noted.'); if (!initial || S.cycle > 1) rc('Dennis Standard: 5. Please consult Dennis Standard.');
        sl.closeFlap(); sl.setBand(false); sl.cancel(); sl.setMin(1); sl.lock('busy', false); sl.lock('union', false); sl.lock('inert', false); sl.setLying(false);
        youSl.lock('inert', false); youSl.set(3, true); api.setTitle('Annual Review: Dennis (Plant)' + (S.cycle > 1 ? ' - Cycle ' + S.cycle : '')); paintCard(); refreshScore(true); }
      function buildDeck() {
        if (S.cycle === 1) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return [0, 1].concat(api.shuffle([2, 3, 4, 5, 6]), [7], api.shuffle([8, 9, 10, 11]), [12]); }
      function startCycle() {
        if (S.dead) return; S.epoch++; S.cycle++; sv.cycles = Math.min(9999, S.cycle - 1); api.save.set('cycles', sv.cycles);
        if (!sv.typo) { sv.typo = true; api.save.set('typo', true); }
        api.achieve('dennis-review.cycle2'); resetCycle(false);
        at(1.4, function () { if (S.phase === 1) { slam('PRE-CLIPPED', { free: true, hold: 2.2 }); rc(fill(X.NX103)); api.sfx('stamp'); } });
        at(8, function () { say(X.NX104, { mood: 'smug', priority: 1 }); api.award(2.5, 'long service'); });
        try { E.submit.focus(); } catch (_) { /* no focus */ }
      }

      /* ================================================================ idle ladder, ghostwriter */
      function clearGhost() { if (E.ghost && E.ghost.parentNode) E.ghost.parentNode.removeChild(E.ghost); E.ghost = null; }
      function idleTick() {
        const now = api.now();
        if (S.dead) return;
        const dtk = S.idleTickAt ? Math.max(0, now - S.idleTickAt) : 0; S.idleTickAt = now;
        if (S.touching || S.phase === 'joint' || S.phase === 'flip' || S.inert) { S.lastInput = Math.min(now, S.lastInput + dtk); return; }   /* idle is suspended: shift the origin forward so the idle time already banked is kept */
        const idle = (now - Math.max(S.lastInput, S.idleHold || 0)) / 1000;
        const th = function (x) { return x * IK; };
        if (S.shed > 0 && now - S.lastDennisClick > 20000 * IK) { S.lastDennisClick = now; regrow(); }
        const st = S.idleStage;
        if (st < 1 && idle >= th(45)) { S.idleStage = 1; S.idleOn = true; say(ln('i1'), { mood: 'smug' }); }
        else if (st < 2 && idle >= th(60)) {
          S.idleStage = 2; S.idleOn = true; tg(E.main, 'dim', true); wiggle();
          if (S.phase === 1) {
            clearGhost();
            E.ghost = mk('div', 'ghost', { 'aria-hidden': 'true' }, h('svg', { viewBox: '0 0 200 60', preserveAspectRatio: 'none' }, h('path', { d: 'M10 40C30 5 50 55 70 25C90 -5 100 50 130 30C150 18 170 40 190 22' })), mk('span', '', null, '5. Present, spiritually.'));
            E.main.appendChild(E.ghost);
          } else { S.presence5 = true; paintPresence(); api.sfx('ding'); }
          say(ln('i2'), { mood: 'smug', priority: 1 }); }
        else if (st < 3 && idle >= th(90)) {
          S.idleStage = 3; say(ln('i3'), { mood: 'proud', priority: 1 }); stat('ghostwritten');
          if (!S.ghostPaid) { S.ghostPaid = true; api.award(10, 'ghostwriter'); }
          api.achieve('dennis-review.silence'); }
        else if (st < 4 && idle >= th(120)) {
          S.idleStage = 4; say(ln('i4'), { mood: 'smug', priority: 1 }); api.achieve('dennis-review.shrub');
          if (S.phase === 2) rc(X.I5); else rc('Plant Roster: Shrub (Junior)'); }
        else if (st < 5 && idle >= th(240)) { S.idleStage = 5; tg(E.wall, 'window', true); say(ln('i6'), { mood: 'neutral', priority: 1 }); }
        else if (st < 6 && idle >= th(360)) {
          S.idleStage = 6; S.filed = true; slam('Resigned (Photosynthesis)', { free: true, hold: 4 }); say(ln('i7'), { mood: 'disappointed', priority: 1 }); }
        else if (st < 7 && idle >= th(450)) {
          S.idleStage = 7; slam('Reinstated (Early)', { free: true, hold: 4 }); say(X.NX96, { mood: 'proud', priority: 2 }); api.sfx('bell');
          if (!S.tenPaid) { S.tenPaid = true; api.award(12, 'tenure, in a pot'); } api.achieve('dennis-review.tenured'); } }
      function wakeUp() {
        const st = S.idleStage; S.idleOn = false; S.idleStage = 0; S.idleHold = api.now() + 135000 * IK; tg(E.main, 'dim', false); clearGhost(); tg(E.wall, 'window', false);
        if (st >= 6) { E.stamp.className = cx('stamp'); say(ln('i11'), { mood: 'smug', priority: 1 }); }
        else if (st >= 5) say(ln('i10'), { mood: 'smug', priority: 1 });
        else if (st >= 2) {
          if (S.phase === 1) { say(ln('i8'), { mood: 'confused', priority: 1 }); dcomment('Watered.'); }
          else if (S.phase === 2 && S.presence5) { S.presence5 = false; paintPresence(); api.sfx('sad'); say(X.I9, { mood: 'disappointed', priority: 1 }); } }
        if (S.presence5) { S.presence5 = false; paintPresence(); } }

      /* ================================================================ keys, size, visibility */
      function summonFicus() {
        if (S.phase !== 1 || S.ficusUntil > api.now()) return; S.ficusUntil = api.now() + 10000 * IK; E.ficus.hidden = false; say(X.X4, { mood: 'confused', priority: 1 }); api.sfx('pop');
        const until = S.ficusUntil; later(10 * IK, function () { if (S.ficusUntil === until) { S.ficusUntil = 0; E.ficus.hidden = true; } }); }
      function summonStapler() {
        if (S.stapleCall && api.now() - S.stapleCall < 20000) return; S.stapleCall = api.now(); api.flag.set('metStapler', true);
        slam('STAPLED', { free: true, hold: 1.6 }); sticky('ka-chunk'); api.sfx('stamp'); stat('staples'); say(X.NX113, { mood: 'confused', priority: 1 });
        if (!reduced()) { tg(E.card, 'shake', false); void E.card.offsetWidth; tg(E.card, 'shake', true); }
        if (!S.staplePaid) { S.staplePaid = true; api.award(6, 'the stapler arrives'); } api.achieve('dennis-review.stapled'); }
      function onDocKey(e) {
        if (S.dead) return; const t = e.target, tag = t && t.tagName ? String(t.tagName) : '';
        if (e.key === 'Escape') { if (S.appeals.length) closeTopAppeal(); else if (S.can) armCan(false); return; }
        if (/INPUT|TEXTAREA|SELECT/.test(tag) || (t && t.isContentEditable)) return;
        if (e.isComposing || e.ctrlKey || e.metaKey || e.altKey || e.repeat || !e.key || e.key.length !== 1) return;
        if (S.inert) return; const ch = e.key.toLowerCase(); S.keyBuf = (S.keyBuf + ch).slice(-12); const b = S.keyBuf;
        if (b.slice(-11) === 'i am dennis') { S.keyBuf = ''; doFlip('typed'); return; }
        if (b.slice(-7) === 'stapler') { S.keyBuf = ''; summonStapler(); return; }
        if (b.slice(-5) === 'ficus') { S.keyBuf = ''; summonFicus(); return; }
        if (b.slice(-5) === 'water') { S.keyBuf = ''; if (S.phase === 1 || S.phase === 2) armCan(true); return; }
        if (ch === 'w') {
          const now = api.now(); S.wPresses = S.wPresses.filter(function (x) { return now - x < 8000; }); S.wPresses.push(now);
          if (S.wPresses.length >= 5) { S.wPresses = []; if (S.phase === 1 || S.phase === 2) armCan(true); } } }
      function sizeCheck() {
        const w = root.clientWidth;
        if (!w) return;
        if (w < 480) {
          if (S.widthState !== -1) {
            S.widthState = -1; tg(E.wrap, 'compact', true);
            if (!S.z1) { S.z1 = true; say(X.Z1, { mood: 'neutral', priority: 1 }); later(4, function () { say(X.Z2, { mood: 'smug', priority: 1 }); }); } }
        } else {
          if (S.widthState === -1) { S.widthState = 0; tg(E.wrap, 'compact', false); if (!S.z3) { S.z3 = true; say(X.Z3, { mood: 'proud', priority: 1 }); } }
          if ((w > 1200 || (window.innerWidth || 0) >= 1700) && !S.z4) { S.z4 = true; say(X.Z4, { mood: 'smug', priority: 1 }); } } }
      function onVis() {
        if (S.dead) return;
        if (document.hidden) { S.tabs++; S.hideAt = api.now(); }
        else if (S.hideAt && api.now() - S.hideAt > 20000 * IK) {
          S.hideAt = 0; say(X.V1, { mood: 'smug', priority: 1 }); addRow('Absent: Dennis noticed'); } }
      function onStretch(N) {
        const n = clamp(N, 0, 99.9); E.sincTxt.textContent = 'Sincerity Applied: ' + f1(n) + ' newtons';
        E.gauge.querySelectorAll('i').forEach(function (s, i) { tg(s, 'lit', i < Math.round(n / 10)); }); S.maxPull = Math.max(S.maxPull, n);
        if (S.beat >= 3) E.pull.textContent = 'Pull strength: ' + f1(S.maxPull) + ' newtons'; }


      /* ================================================================ build the page */
      let youSl = null; sl = makeSlider({
        zone: true, value: 3, label: 'Rating for the current competency', onInput: function () { noteInput(); }, onCommit: onSliderCommit, onSettle: onSettle,
        onBlocked: onBlocked, onGrab: onGrab, onEsc: withdraw, onBump: function () { sl.shake(); }, onStretch: onStretch });
      youSl = makeSlider({ min: 1, max: 5, value: 3, labels: false, label: 'YOU, on the seesaw', onInput: seeInput, onCommit: function (v) { seeCommit(v); } }); sl.setPot(sv.pot);

      E.dsvg = buildDennis(); E.dennisBtn = mk('button', 'dennis', { type: 'button', 'aria-label': 'Dennis, the Lobby Plant. Touch him.', onclick: touchDennis }, E.dsvg);
      E.flower = mk('div', 'flower', { 'aria-hidden': 'true' }, mk('i'), mk('i'), mk('i'), mk('i'), mk('b'), mk('u'));
      E.wall = mk('div', 'wall', null, mk('div', 'win', null, mk('div', 'sun')), mk('div', 'beam'), E.dennisBtn, E.flower); E.draft = mk('div', 'draft'); E.dtext = mk('span', 'dtext');
      E.stage = mk('div', 'stage', null, E.wall, mk('div', 'side', null, mk('div', 'nameplate', null, 'Employee of Always'), E.draft,
        mk('div', 'dcomm', null, mk('span', 'dlabel', null, "Dennis's Comments"), E.dtext)));

      E.compBox = mk('span', 'compbox', null, 'Competency 1 of 12 (7 1/2 required)'); E.title = mk('span', 'hl', null, 'Performance Review of: DENNIS (Plant)');
      E.rev = mk('span', 'hl'); E.sub = mk('span', 'hl'); E.cyc = mk('span', 'hl'); E.crayon1 = mk('span', 'crayon'); E.crayon2 = mk('span', 'crayon'); E.crayon3 = mk('span', 'crayon');
      E.head = mk('div', 'head', null, mk('div', 'letter', null, 'Department of Human Resource-ishness'),
        mk('div', 'formid', null, 'FORM 27B/6-R (REVIEW OF A PLANT)', mk('br'), E.compBox),
        mk('div', 'hlines', null, E.title, E.rev, E.sub, E.cyc, E.crayon1, E.crayon2, E.crayon3));

      E.ctitle = mk('h3', 'ctitle'); E.cdesc = mk('p', 'cdesc'); E.legend = mk('div', 'legend'); E.gauge = mk('span', 'gauge', { 'aria-hidden': 'true' });
      for (let i = 0; i < 10; i++) E.gauge.appendChild(h('i')); E.sincTxt = mk('span', '', null, 'Sincerity Applied: 0.0 newtons');
      E.sincwrap = mk('div', 'sincwrap', null, E.gauge, E.sincTxt); E.pull = mk('div', 'pull');
      E.cm = mk('textarea', 'cm', { maxlength: 160, rows: 2, id: 'm-dennis-review-cm', 'aria-label': 'Justification (required, ignored)' }); E.cmreply = mk('div', 'cmreply');
      E.badge = mk('span', 'badge', { hidden: true }, 'left-handed');
      E.submit = mk('button', 'btn', { type: 'button', 'aria-label': 'Submit rating', onclick: onSubmit }, mk('span', '', null, 'Submit Rating'), E.badge);
      E.appealBtn = mk('button', 'btn sub2', { type: 'button', hidden: true, onclick: function () { openAppeal(1); } }, 'Appeal (Form 27B/6)');
      E.acc = mk('div', 'acc'); E.std = mk('div', 'std'); E.unionCd = mk('em', '', null, 'Break (Mandatory)');
      E.union = mk('div', 'union', { 'aria-hidden': 'true' }, mk('b'), mk('span', '', null, 'ON BREAK'), E.unionCd); sl.wrap.appendChild(E.union); E.sl2 = sl.wrap;
      E.main = mk('div', 'main', null, E.ctitle, E.cdesc, E.legend, sl.el, E.sincwrap, E.pull,
        mk('label', 'cmlabel', { for: 'm-dennis-review-cm' }, 'Justification (required, ignored)'), mk('div', 'cmwrap', null, E.cm, mk('i', 'ring2', { 'aria-hidden': 'true' })), E.cmreply,
        mk('div', 'btns', null, E.submit, E.appealBtn), E.acc, E.std);
      E.att = mk('div', 'margin2'); E.margin = mk('div', 'margin', null, E.att); E.card = mk('div', 'card', null, E.main, E.margin); E.front = mk('div', 'face front', null, E.card);

      /* back face: the scorecard */
      E.rowEls = ROWS.map(function (r) {
        const label = mk('span', 'rlabel', null, r.t); const pips = [0, 1, 2, 3, 4].map(function (i) { return mk('i', i < 3 ? 'lit' : ''); }); const score = mk('span', 'real', null, '3.0');
        const meter = mk('span', 'meter', { 'aria-hidden': 'true' }, pips, score); const real = mk('span', 'real'); const com = mk('div', 'rcom jokey');
        return { el: mk('div', 'row', null, label, meter, real, mk('span', 'lock', null, "Reviewer's discretion"), com), label: label, real: real, com: com, score: score, meter3: pips[2] }; });
      E.presMeter = mk('span', 'meter', { 'aria-hidden': 'true' }, [0, 1, 2, 3, 4].map(function (i) { return mk('i', i < 3 ? 'lit' : ''); })); E.presTxt = mk('span', 'real', null, '3.0');
      E.banner = mk('div', 'banner', { role: 'status' }); E.mlTxt = mk('span', '', null, '0.500 mL'); E.hydFill = h('i'); E.glassFill = h('i');
      const stopHold = function () { api.clearTimeout(S.holdT); api.clearInterval(S.holdIv); }; E.water = mk('button', 'water', {
        type: 'button', 'aria-label': 'Water yourself (hold to keep sipping)', onclick: onWater,
        onpointerdown: function () { stopHold(); S.holdT = api.setTimeout(function () { S.holdIv = api.setInterval(onWater, 250); }, 450); },
        onpointerup: stopHold, onpointercancel: stopHold, onpointerleave: stopHold, onblur: stopHold,
        onkeydown: function (e) { if (e.repeat && e.key === ' ') { e.preventDefault(); onWater(); } }
      }, E.glassFill, mk('span', '', null, '🥛 WATER YOURSELF')); E.reqCount = mk('span', '', null, 'Requests: 0'); E.appCount = mk('span', '', null, 'Appeals: 0');
      E.reqBtn = mk('button', 'btn', { type: 'button', onclick: reconsider }, 'REQUEST RECONSIDERATION'); E.apBtn = mk('button', 'btn sub2', { type: 'button', onclick: appealP2 }, 'APPEAL');
      E.planList = mk('ol', 'plan'); E.dmark = mk('i', 'dmark'); E.dval = mk('span', '', null, '5.000'); E.youVal = mk('span', '', null, '3.000');
      E.wtBtns = ['Photosynthesis', 'Presence', 'Tuesday'].map(function (n, i) {
        return mk('button', '', { type: 'button', role: 'radio', 'aria-checked': 'false', onclick: function () { setWeight(i); }, onkeydown: function (e) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const j = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; try { E.wtBtns[j].focus(); } catch (_) { /* no focus */ } setWeight(j); }
        } }, n); });
      E.wtCap = mk('div', '', null, 'Weighting: (unset)'); E.see = mk('div', 'see', null, mk('b', '', null, 'Calibration Seesaw'),
        mk('div', '', null, 'DENNIS (marker only): ', E.dval), mk('div', 'dtrack', { 'aria-hidden': 'true' }, E.dmark),
        mk('div', '', null, 'YOU (real slider): ', E.youVal), youSl.el,
        mk('div', 'wt', { role: 'radiogroup', 'aria-label': 'Weighting Committee' }, E.wtBtns), E.wtCap);
      E.sc = mk('div', 'sc', null, mk('h3', 'sctitle', null, 'YOUR SCORECARD'),
        E.rowEls.map(function (r) { return r.el; }),
        mk('div', 'row', null, mk('span', 'rlabel', null, 'Presence'), E.presMeter, E.presTxt, mk('span', 'lock', null, "Reviewer's discretion")),
        mk('div', 'rcom', null, 'The numbers are for transparency, not for use.'),
        E.banner,
        mk('div', 'wline', null, mk('span', 'canicon', { 'aria-hidden': 'true' }), E.mlTxt, E.hyd = mk('div', 'hyd', { 'aria-hidden': 'true' }, E.hydFill), E.water),
        mk('div', 'btns', null, E.reqBtn, E.reqCount, E.apBtn, E.appCount),
        mk('div', 'jokey', null, mk('b', '', null, "Dennis's feedback for you"), E.planList),
        E.see);
      E.back = mk('div', 'face back', { 'aria-hidden': 'true', style: 'display:none' }, E.sc); E.faces = mk('div', 'faces', null, E.front, E.back);

      E.stamp = mk('div', 'stamp', { 'aria-hidden': 'true' }); E.sticky = mk('div', 'sticky', { hidden: true, 'aria-hidden': 'true' }); E.peerLayer = mk('div', 'peerlayer');
      E.ficus = mk('div', 'ficus', { hidden: true, 'aria-hidden': 'true' }, mk('div', 'fnote', null, 'Do not engage'), mk('div', 'fbush'), mk('div', 'fpot'));
      E.rc = mk('div', 'rc', { 'aria-live': 'polite' }, 'Dennis has already pencilled in a provisional 5.');
      E.right = mk('div', 'right', null, E.faces, E.stamp, E.sticky, E.peerLayer, E.ficus, E.rc); E.cols = mk('div', 'cols', null, E.stage, E.right);

      E.caption = mk('div', 'caption'); E.clause = mk('span', 'hand'); E.pending = mk('span', 'hand', { hidden: true }, 'Incident 7 1/2 is pending');
      E.dtoggle = mk('button', 'dtoggle', { type: 'button', 'aria-expanded': 'false', onclick: function () { noteInput(); setDrawer(E.dlist.hidden); } }, 'Prior Incidents');
      E.dlist = mk('ul', 'dlist', { hidden: true }); E.drawer = mk('div', 'drawer', { hidden: true }, E.dtoggle, E.dlist); E.fnstrip = mk('div', 'fnstrip');
      E.foot1 = mk('span', '', null, 'Printed on paper.');
      E.prog = mk('div', 'prog', null, 'Confidence in Process:', mk('span', 'bar', { 'aria-hidden': 'true' }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function () { return h('i'); })), ' Almost');
      E.paper = mk('div', 'paper', null, E.head, E.cols, mk('div', '', null, E.caption, E.clause, E.pending), E.drawer, E.fnstrip, mk('div', 'foot', null, E.foot1, E.prog));
      E.joint = mk('div', 'joint'); E.board = mk('div', 'board', null, mk('div', 'clip'), E.paper, E.joint); E.can = mk('div', 'can', { 'aria-hidden': 'true' });
      E.wrap = mk('div', 'wrap', null, E.board, E.can); root.appendChild(E.wrap);
      if (!sv.flower) E.flower.style.display = 'none';

      /* ---- global-ish listeners (all managed) ---- */
      function moveCan(e) {
        S.cx = num(e.clientX); S.cy = num(e.clientY);
        if (S.canRaf) return; S.canRaf = api.requestAnimationFrame(function () {
          S.canRaf = 0; const r = E.wrap.getBoundingClientRect(); E.can.style.left = (S.cx - r.left) + 'px'; E.can.style.top = (S.cy - r.top) + 'px'; }); }
      api.on(root, 'pointermove', function (e) { S.hover++; noteInput(); leanTo(e); if (S.can) moveCan(e); });
      api.on(root, 'pointerdown', function (e) { S.clicks++; noteInput(); sizeCheck(); if (S.can) moveCan(e); }); api.on(root, 'keydown', function () { noteInput(); });
      api.on(root, 'touchstart', function () { noteInput(); }, { passive: true }); api.on(document, 'keydown', onDocKey); api.on(document, 'visibilitychange', onVis);
      api.on(window, 'resize', sizeCheck);

      S.appeals = []; resetCycle(true); api.setInterval(tickBeats, 250); api.setInterval(hbTick, 1000); api.setInterval(idleTick, 500);
      api.setInterval(function () { if (payBuf >= 0.1) { api.award(payBuf, 'review'); payBuf = 0; } }, 1200); api.setTimeout(sizeCheck, 120);

      /* intro: the first joke needs zero input (the pencilled 5 on the name tag, the comment region, and Management at 0.6 s) */
      if (S.cycle === 1) {
        at(0.6, function () { say(X.M1, { mood: 'proud', priority: 1 }); }); at(4.6, function () { say(X.M2, { mood: 'smug' }); }); at(9, function () { say(X.M3, { mood: 'neutral' }); });
        at(12, function () { if (S.drags === 0 && S.submits === 0 && S.rejections === 0) say(X.M5, { mood: 'neutral', priority: 1 }); });
        at(16, function () { if (api.flag.get('metDennis')) say(X.NX75, { mood: 'smug' }); });
        at(28, function () { if (S.drags === 0 && S.submits === 0 && S.rejections === 0) say(X.M6, { mood: 'smug' }); });
      } else {
        at(0.8, function () { say(X.CB1, { mood: 'smug', priority: 1 }); }); }

      return {
        destroy: function () {
          S.dead = true;
          try { root.textContent = ''; } catch (_) { /* gone already */ }
        }
      }; } });
})();
