/* POINTLESS module: typing-pool */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const COLS = 34;

  P.injectCSS(`
.m-typing-pool-wrap{position:relative;overflow:hidden;min-height:420px;container-type:inline-size;padding:10px 10px 0;color:#2B2230;font-family:'Trebuchet MS','Segoe UI',system-ui,sans-serif;background:radial-gradient(#e6d5a0 1px,transparent 1.6px) 0 0/14px 14px,#FFF6DC}.m-typing-pool-wrap *{box-sizing:border-box}.m-typing-pool-wrap button{font-family:inherit;color:#2B2230}
.m-typing-pool-wrap button:focus-visible{outline:3px solid #264a8c;outline-offset:2px}.m-typing-pool-water{position:absolute;left:0;right:0;bottom:0;height:0;z-index:0;pointer-events:none;background:linear-gradient(rgba(110,201,232,.34),rgba(110,201,232,.52));transition:height .7s ease}
.m-typing-pool-water::before,.m-typing-pool-wave::before{content:'';position:absolute;left:0;right:0;top:-9px;height:12px;background:radial-gradient(circle at 10px 12px,rgba(168,230,245,.9) 8px,transparent 9px) var(--m-typing-pool-wx,0px) 0/20px 12px repeat-x}.m-typing-pool-top,.m-typing-pool-grid,.m-typing-pool-pool,.m-typing-pool-banner{position:relative;z-index:1}
.m-typing-pool-top{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin-bottom:10px}.m-typing-pool-plate{background:linear-gradient(#e9c36d,#c98a3b);border:3px solid #2B2230;border-radius:8px;padding:4px 10px;font-weight:800;font-size:.76rem;box-shadow:3px 3px 0 #2B2230;max-width:100%}.m-typing-pool-plate small{display:block;font-weight:700;opacity:.9}
.m-typing-pool-postit{background:#FFE98A;padding:6px 10px;font:700 .74rem 'Comic Sans MS','Trebuchet MS',cursive;transform:rotate(-2deg);box-shadow:2px 3px 0 rgba(0,0,0,.2);max-width:12em}.m-typing-pool-lamp{width:30px;height:24px;background:#F2C14E;border:3px solid #2B2230;border-radius:18px 18px 4px 4px;box-shadow:0 0 14px #f2c14e99}
.m-typing-pool-lamp.m-typing-pool-flick{animation:m-typing-pool-flick .9s steps(1) 1}.m-typing-pool-frame{font-size:1.2rem;border:3px solid #b8872f;background:#fffdf4;padding:0 4px;transition:transform 4s ease,opacity 4s ease}.m-typing-pool-frame.m-typing-pool-away{transform:translateX(120px);opacity:0}.m-typing-pool-news{flex:1 1 180px;font-size:.72rem;font-style:italic;opacity:.85;min-height:1.2em}
.m-typing-pool-banner{display:flex;align-items:center;gap:10px;background:#FF7A66;border:3px solid #2B2230;border-radius:12px;padding:6px 10px;margin-bottom:10px;font-weight:800;font-size:.78rem;box-shadow:4px 4px 0 #2B2230;animation:m-typing-pool-slidein .35s ease-out}.m-typing-pool-banner[hidden]{display:none}.m-typing-pool-ringsvg{flex:none;width:44px;height:44px}
.m-typing-pool-rb{fill:none;stroke:rgba(43,34,48,.25);stroke-width:5}.m-typing-pool-rf{fill:none;stroke:#2B2230;stroke-width:5;stroke-dasharray:113.1;stroke-dashoffset:0;transform:rotate(-90deg);transform-origin:22px 22px}.m-typing-pool-rf.m-typing-pool-go{animation:m-typing-pool-ring linear forwards}.m-typing-pool-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}
.m-typing-pool-left,.m-typing-pool-right{display:flex;flex-direction:column;gap:10px;min-width:0}@container (min-width:720px){.m-typing-pool-grid{grid-template-columns:minmax(0,64fr) minmax(0,36fr)}}.m-typing-pool-paperwrap{position:relative;padding-top:6px}
.m-typing-pool-carbon{position:absolute;left:10px;right:-4px;top:0;bottom:-6px;background:#3b3550;color:#cfc6e8;border-radius:4px;transform:rotate(1.2deg);font:italic .7rem 'Courier New',monospace;padding:2px 8px;opacity:.9}.m-typing-pool-carbon[hidden]{display:none}
.m-typing-pool-paper{position:relative;background:#FFFDF4;border:3px solid #2B2230;border-radius:6px;box-shadow:4px 4px 0 #2B2230;padding:10px 40px 12px 16px;min-height:200px;font-size:13px;font-size:clamp(11px,3.6cqw,16px);transition:transform .4s ease,opacity .4s ease,filter .4s ease;overflow:hidden}.m-typing-pool-paper.m-typing-pool-out{transform:translateY(-12px);opacity:.18;filter:grayscale(1)}
.m-typing-pool-filed{position:absolute;z-index:4;left:50%;top:50%;margin:-1.1em 0 0 -3.2em;width:6.4em;text-align:center;border:5px double #C23B2A;color:#C23B2A;padding:2px 0;font:900 1.6rem 'Trebuchet MS',sans-serif;letter-spacing:.12em;transform:rotate(-8deg);mix-blend-mode:multiply;pointer-events:none;animation:m-typing-pool-stampin .15s ease-out both}.m-typing-pool-filed[hidden]{display:none}
.m-typing-pool-paper.m-typing-pool-in2{animation:m-typing-pool-rollin .35s ease-out}.m-typing-pool-paperwrap:focus-within .m-typing-pool-paper{outline:3px solid #264a8c;outline-offset:2px}
.m-typing-pool-paperwrap.m-typing-pool-damp .m-typing-pool-paper::after{content:'';position:absolute;left:0;right:0;bottom:0;height:22%;pointer-events:none;background:linear-gradient(transparent,rgba(110,170,200,.38)),radial-gradient(ellipse at 30% 100%,rgba(90,140,170,.35),transparent 60%)}.m-typing-pool-paper.m-typing-pool-cert{border-color:#b8872f;box-shadow:4px 4px 0 #b8872f,0 0 0 6px #f2c230 inset}
.m-typing-pool-pt{font:800 .95em 'Trebuchet MS',sans-serif;letter-spacing:.18em;margin-bottom:2px}.m-typing-pool-pl{font:700 .85em 'Trebuchet MS',sans-serif;line-height:1.7;overflow-wrap:anywhere}.m-typing-pool-pl.m-typing-pool-last{border-bottom:2px solid #2B2230;margin-bottom:6px;padding-bottom:4px}
.m-typing-pool-lines{font-family:'Courier New',Courier,monospace;position:relative;background:repeating-linear-gradient(transparent 0,transparent calc(1.75em - 1px),rgba(120,150,190,.3) calc(1.75em - 1px),rgba(120,150,190,.3) 1.75em)}.m-typing-pool-bellb.m-typing-pool-wood{font-size:.55rem;font-weight:900;letter-spacing:0}.m-typing-pool-stamp.m-typing-pool-struck{text-decoration:line-through;opacity:.6}
.m-typing-pool-line{position:relative;white-space:pre;line-height:1.75;color:#7a7366;min-height:1.75em;padding-left:2px}.m-typing-pool-line[data-who='A']::before,.m-typing-pool-line[data-who='B']::before{content:'';position:absolute;left:-11px;top:.25em;bottom:.25em;width:5px;border-radius:3px;background:#7FD6B2}.m-typing-pool-line[data-who='B']::before{background:#B9A6F0}
.m-typing-pool-line.m-typing-pool-cur[data-who='A']{background:linear-gradient(90deg,rgba(127,214,178,.35),transparent)}.m-typing-pool-line.m-typing-pool-cur[data-who='B']{background:linear-gradient(90deg,rgba(185,166,240,.4),transparent)}.m-typing-pool-line[data-wasw]{padding-top:.95em}
.m-typing-pool-line[data-wasw]::before{content:'Sandra: struck "' attr(data-wasw) '"';position:absolute;left:0;top:0;font:700 .7em 'Trebuchet MS',sans-serif;color:#C23B2A;white-space:nowrap}.m-typing-pool-line[data-sk]::after{content:'';position:absolute;right:-20px;top:.55em;width:10px;height:3px;background:#C23B2A}.m-typing-pool-ok{color:#2B2230;text-shadow:0 0 1px rgba(43,34,48,.6)}
.m-typing-pool-ok.m-typing-pool-lil,.m-typing-pool-bad.m-typing-pool-lil{color:#7b5fc4}.m-typing-pool-bad{position:relative;color:#C23B2A;text-decoration:underline wavy #C23B2A;animation:m-typing-pool-wob .18s linear 1}.m-typing-pool-bad::after{content:attr(data-t);position:absolute;left:0;top:-.5em;font-size:.7em;font-weight:700}
.m-typing-pool-skip{color:#9a9488;text-decoration:line-through;text-decoration-color:#C23B2A}.m-typing-pool-pile{color:#2B2230;opacity:.7}.m-typing-pool-rg{color:#b9b19d}.m-typing-pool-mark{position:relative;color:#C23B2A}.m-typing-pool-mark::after{content:'*';position:absolute;right:-.6em;top:-.2em;color:#FF7A66;font-weight:900}.m-typing-pool-red{color:#C23B2A;background:rgba(255,122,102,.2)}
.m-typing-pool-flag{position:relative;color:#9a6a00;background:rgba(242,193,78,.4)}.m-typing-pool-flag::after{content:'\\1F6A9';position:absolute;top:-.9em;right:-.4em;font-size:.7em}.m-typing-pool-taped{background:#fff;color:#fff;box-shadow:0 0 0 1px #ddd}.m-typing-pool-caret{position:relative;display:inline-block;width:0;height:1em}
.m-typing-pool-caret::before{content:'';position:absolute;left:0;top:.2em;width:.6em;height:1.2em;background:#F2C14E;opacity:.7;animation:m-typing-pool-blink 1s steps(1) infinite}.m-typing-pool-blind .m-typing-pool-line,.m-typing-pool-blind .m-typing-pool-line .m-typing-pool-mark{color:transparent}.m-typing-pool-blind .m-typing-pool-ok{color:#2B2230}.m-typing-pool-blind .m-typing-pool-bad{color:transparent}
.m-typing-pool-blind .m-typing-pool-rg,.m-typing-pool-blind .m-typing-pool-red,.m-typing-pool-blind .m-typing-pool-flag{color:transparent;background:none}.m-typing-pool-blind .m-typing-pool-flag::after{display:none}.m-typing-pool-pfoot{font:italic .7em 'Courier New',monospace;color:#7a7366;margin-top:4px;min-height:1em}
.m-typing-pool-in{position:absolute;left:0;top:0;width:100%;height:100%;opacity:.01;font-size:16px;border:0;background:transparent;color:transparent;caret-color:transparent;z-index:2;cursor:text}
.m-typing-pool-clip,.m-typing-pool-bellb{position:absolute;z-index:3;right:6px;width:44px;height:44px;border:3px solid #2B2230;border-radius:50%;background:#FFFDF4;cursor:pointer;font-size:1.2rem;padding:0;box-shadow:2px 2px 0 #2B2230}.m-typing-pool-clip{top:10px}.m-typing-pool-bellb{top:64px;background:#F2C14E}.m-typing-pool-clip[hidden]{display:none}.m-typing-pool-shake{animation:m-typing-pool-shake .5s ease 1}
.m-typing-pool-pop{position:absolute;z-index:4;right:54px;top:12px;max-width:60%;background:#fff;border:3px solid #2B2230;border-radius:10px;padding:6px 10px;font-size:.78rem;font-weight:700;box-shadow:3px 3px 0 #2B2230}
.m-typing-pool-pop[hidden],.m-typing-pool-sticky[hidden],.m-typing-pool-hole[hidden],.m-typing-pool-sign[hidden],.m-typing-pool-getwell[hidden],.m-typing-pool-ghostt[hidden],.m-typing-pool-lid[hidden],.m-typing-pool-jam[hidden],.m-typing-pool-cscroll[hidden]{display:none}.m-typing-pool-heart{display:inline-block;width:16px;height:14px;position:relative;margin-right:4px;vertical-align:middle}
.m-typing-pool-heart::before,.m-typing-pool-heart::after{content:'';position:absolute;top:0;width:9px;height:14px;background:#FF7A66;border-radius:9px 9px 0 0}.m-typing-pool-heart::before{left:1px;transform:rotate(-45deg);transform-origin:100% 100%}.m-typing-pool-heart::after{left:6px;transform:rotate(45deg);transform-origin:0 100%}
.m-typing-pool-sticky{position:absolute;z-index:3;left:8px;bottom:-8px;background:#FFE98A;padding:4px 8px;font:700 .7rem 'Comic Sans MS',cursive;transform:rotate(-3deg)}.m-typing-pool-hole{position:absolute;z-index:3;left:30%;top:46%;width:44%;padding:8px;border-radius:50%;background:#C98A3B;border:3px solid #6b4a1c;font-size:.7rem;font-weight:700;text-align:center}
.m-typing-pool-sign{position:absolute;z-index:3;left:12%;top:36%;background:#fff;border:3px solid #2B2230;padding:6px 10px;font-weight:900;font-size:.8rem;transform:rotate(-3deg);box-shadow:3px 3px 0 #2B2230}
.m-typing-pool-getwell{position:absolute;z-index:4;left:8%;right:8%;top:20%;background:#fff6dc;border:3px dashed #FF7A66;padding:12px;text-align:center;font-weight:800;font-size:.85rem;box-shadow:4px 4px 0 #2B2230}
.m-typing-pool-ghostt{position:absolute;z-index:1;left:16px;bottom:6px;color:#7b5fc4;font:700 .8em 'Courier New',monospace;overflow:hidden;white-space:nowrap;animation:m-typing-pool-type 1.6s steps(19) 1 both}.m-typing-pool-strip{min-height:5.4em;background:#fff;border:3px solid #2B2230;border-radius:10px;padding:6px 10px;font-size:.8rem;font-weight:700;box-shadow:3px 3px 0 #2B2230}
.m-typing-pool-flash{animation:m-typing-pool-flash .5s ease-out 1}.m-typing-pool-tw{position:relative;max-width:320px;width:100%;margin:0 auto;transition:opacity .3s}.m-typing-pool-tw.m-typing-pool-dim{opacity:.4}@media (max-height:820px){.m-typing-pool-tw{max-width:240px}}.m-typing-pool-twsvg{display:block;width:100%;height:auto}.m-typing-pool-tbody{fill:#7FB8A6;stroke:#2B2230;stroke-width:3}
.m-typing-pool-platen{fill:#4a4258;stroke:#2B2230;stroke-width:3}.m-typing-pool-ridge{stroke:#7a7090;stroke-width:2}.m-typing-pool-kc{fill:#FFFDF4;stroke:#2B2230;stroke-width:2}.m-typing-pool-kt{font:800 9px 'Trebuchet MS',sans-serif;fill:#2B2230}.m-typing-pool-key{animation-duration:.08s;animation-timing-function:ease-out;animation-fill-mode:none}
.m-typing-pool-bar{fill:none;stroke:#2B2230;stroke-width:3;stroke-linecap:round;transform-origin:180px 80px;transform:rotate(var(--a,0deg));animation-duration:.07s;animation-fill-mode:none}.m-typing-pool-lever{fill:#F2C14E;stroke:#2B2230;stroke-width:2}
.m-typing-pool-jam{position:absolute;inset:6px 0 0 0;z-index:5;display:flex;align-items:center;justify-content:center;gap:14px;background:rgba(255,246,220,.82);border-radius:10px}.m-typing-pool-tangle{position:absolute;left:25%;top:5%;width:50%;height:60%;pointer-events:none}.m-typing-pool-tangle path{fill:none;stroke:#2B2230;stroke-width:3;stroke-linecap:round;animation:m-typing-pool-shk .12s linear infinite}
.m-typing-pool-loop{position:relative;width:48px;height:48px;border-radius:50%;border:3px solid #2B2230;background:#F2C14E;box-shadow:0 0 12px #f2c230,3px 3px 0 #2B2230;font-size:1.2rem;cursor:pointer;padding:0;animation:m-typing-pool-glow 1s ease-in-out infinite alternate}.m-typing-pool-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.m-typing-pool-btn{min-height:44px;padding:8px 14px;font-weight:800;font-size:.8rem;letter-spacing:.03em;border:3px solid #2B2230;border-radius:12px;background:#F2C14E;box-shadow:3px 3px 0 #2B2230;cursor:pointer}.m-typing-pool-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #2B2230}.m-typing-pool-btn[disabled]{opacity:.55;cursor:default}.m-typing-pool-btn[hidden]{display:none}
.m-typing-pool-brass{background:linear-gradient(#f7d46b,#c9962b);font-size:.95rem;padding:8px 22px}.m-typing-pool-mint{background:#7FD6B2}.m-typing-pool-coral{background:#FF7A66}.m-typing-pool-lilac{background:#B9A6F0}.m-typing-pool-tape{display:flex;align-items:center;gap:6px;font-size:.72rem;font-weight:800}.m-typing-pool-tsvg{width:44px;height:44px}.m-typing-pool-slipbox{position:relative}
.m-typing-pool-hang{background:#fff;border:2px dashed #7a7366;font:700 .72rem 'Courier New',monospace;padding:4px 8px;margin:0 14px;border-top:0;border-radius:0 0 8px 8px;text-align:center}
.m-typing-pool-slip{position:relative;background:#fff;border:2px solid #2B2230;border-radius:6px 6px 0 0;font:.76rem 'Courier New',Courier,monospace;padding:10px 12px 14px;margin-bottom:10px;min-height:150px;box-shadow:3px 3px 0 #2B2230}
.m-typing-pool-slip::after{content:'';position:absolute;left:-2px;right:-2px;bottom:-10px;height:10px;background:linear-gradient(135deg,#fff 50%,transparent 50%) 0 0/14px 10px,linear-gradient(225deg,#fff 50%,transparent 50%) 0 0/14px 10px}.m-typing-pool-slip.m-typing-pool-printing{animation:m-typing-pool-print .4s ease-out}.m-typing-pool-slip.m-typing-pool-thunk{animation:m-typing-pool-thunk .2s linear 1}
.m-typing-pool-sh{font:800 .7rem 'Trebuchet MS',sans-serif;letter-spacing:.15em;border-bottom:2px dotted #2B2230;margin-bottom:4px}.m-typing-pool-sl{padding:1px 0;overflow-wrap:anywhere;animation:m-typing-pool-fadein .25s ease-out}.m-typing-pool-srow{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:6px;min-height:28px;animation:m-typing-pool-fadein .2s ease-out}
.m-typing-pool-srow.m-typing-pool-old{opacity:.25;transition:opacity .6s}.m-typing-pool-num{position:relative;font-weight:800;font-size:.95rem}.m-typing-pool-num.m-typing-pool-struck::after{content:'';position:absolute;left:-2px;right:-2px;top:50%;height:3px;background:#C23B2A;transform-origin:left;animation:m-typing-pool-strike .3s ease-out both}
.m-typing-pool-stamp{display:inline-block;border:3px double #C23B2A;color:#C23B2A;padding:1px 7px;font:800 .66rem 'Trebuchet MS',sans-serif;text-transform:uppercase;letter-spacing:.04em;transform:rotate(-3deg);mix-blend-mode:multiply;animation:m-typing-pool-stampin .12s ease-out both}.m-typing-pool-stamp.m-typing-pool-lilac{border-color:#6b4fb8;color:#6b4fb8;background:none;transform:rotate(2deg)}
.m-typing-pool-stamp.m-typing-pool-mint{border-color:#1f7a5a;color:#1f7a5a;background:none;transform:rotate(-1deg)}.m-typing-pool-faint .m-typing-pool-stamp{opacity:.35}.m-typing-pool-sub{font-size:.62rem;width:100%;opacity:.8}.m-typing-pool-sfoot{margin-top:8px;font-size:.62rem;color:#7a7366}
.m-typing-pool-bench{display:flex;flex-wrap:wrap;align-items:center;gap:8px;background:#E7DDFB;border:3px solid #2B2230;border-radius:12px;padding:8px 10px;box-shadow:3px 3px 0 #2B2230}.m-typing-pool-bench.m-typing-pool-grey{filter:grayscale(1);opacity:.6}.m-typing-pool-bl{width:100%;font-weight:800;font-size:.7rem;letter-spacing:.05em}.m-typing-pool-bh{display:flex;align-items:center;gap:4px;font-size:1.5rem}
.m-typing-pool-bh[hidden],.m-typing-pool-chip[hidden]{display:none}.m-typing-pool-chip{font-size:.62rem;font-weight:700;background:#fff;border:2px solid #2B2230;border-radius:8px;padding:0 5px}.m-typing-pool-di{width:100%;font-size:.66rem;font-weight:700;opacity:.85}
.m-typing-pool-ob{display:flex;align-items:flex-end;gap:10px;width:100%;background:#fff6dc;border:3px solid #2B2230;border-radius:10px;padding:8px 10px;cursor:pointer;text-align:left;min-height:56px}.m-typing-pool-tray{position:relative;width:60px;height:36px;flex:none}.m-typing-pool-sheet{position:absolute;left:0;right:0;height:3px;background:#fff;border:1px solid #2B2230;transition:opacity .6s}
.m-typing-pool-obt{font-size:.74rem;font-weight:800}.m-typing-pool-arch{background:#fff;border:2px solid #2B2230;border-radius:8px;padding:6px 8px;font:.66rem 'Courier New',monospace}.m-typing-pool-arch[hidden]{display:none}.m-typing-pool-ae{padding:3px 0;border-bottom:1px dotted #7a7366;overflow-wrap:anywhere}.m-typing-pool-ae .m-typing-pool-b{color:#C23B2A}
.m-typing-pool-pool{position:relative;margin:12px -10px 0;min-height:98px;background:linear-gradient(#8fd9ef,#6EC9E8);border-top:3px solid #2B2230;padding:14px 10px 6px}.m-typing-pool-wave{position:absolute;left:0;right:0;top:0;height:3px}.m-typing-pool-pr{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-around;gap:6px 10px}
.m-typing-pool-pool.m-typing-pool-circle .m-typing-pool-pr{justify-content:center;gap:0}.m-typing-pool-typist{display:flex;flex-direction:column;align-items:center;min-height:44px;min-width:50px;background:#d9a864;border:3px solid #2B2230;border-radius:12px;padding:0 6px;font-size:1.3rem;cursor:pointer;line-height:1.1;box-shadow:2px 2px 0 #2B2230}.m-typing-pool-typist small{font-size:.6rem;font-weight:800}
.m-typing-pool-wave1{animation:m-typing-pool-wave .6s ease 1}.m-typing-pool-duck{display:flex;align-items:flex-end;gap:2px;min-height:44px;min-width:44px;background:transparent;border:0;font-size:1.6rem;cursor:pointer;padding:0}.m-typing-pool-duck>span{position:relative;display:inline-block}.m-typing-pool-duck>span[hidden],.m-typing-pool-wet[hidden],.m-typing-pool-chair[hidden]{display:none}
.m-typing-pool-tie::after{content:'';position:absolute;left:50%;bottom:-2px;margin-left:-4px;border:4px solid transparent;border-top:9px solid #C23B2A}.m-typing-pool-guard{font-size:1.2rem}.m-typing-pool-chair{display:inline-block;background:#fff;border:3px solid #2B2230;border-radius:6px;padding:0 6px;font-size:.62rem;font-weight:800}
.m-typing-pool-wet{font-weight:900;font-size:.72rem;background:#F2C14E;border:3px solid #2B2230;padding:2px 6px;transform:rotate(-4deg)}.m-typing-pool-climb .m-typing-pool-duck{margin-bottom:14px}
.m-typing-pool-lid{position:absolute;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#C98A3B repeating-linear-gradient(90deg,transparent 0,transparent 22px,rgba(0,0,0,.08) 22px,rgba(0,0,0,.08) 24px);font-weight:900;font-size:1.1rem;text-align:center;padding:20px}
.m-typing-pool-lid span{background:#fff;border:4px solid #2B2230;padding:10px 16px;transform:rotate(-2deg)}.m-typing-pool-cscroll{position:absolute;z-index:7;left:8%;right:8%;top:30%;background:#fff6dc;border:4px double #b8872f;border-radius:10px;padding:14px 12px;text-align:center;font-weight:900;font-size:.85rem;box-shadow:4px 4px 0 #2B2230;animation:m-typing-pool-unfurl .5s ease-out}
.m-typing-pool-cscroll::after{content:'';position:absolute;right:10px;bottom:-14px;width:26px;height:26px;border-radius:50%;background:#C23B2A;border:3px solid #2B2230}
@keyframes m-typing-pool-blink{0%,49%{opacity:.7}50%,100%{opacity:0}}@keyframes m-typing-pool-wob{0%{transform:translateX(-2px)}50%{transform:translateX(2px)}100%{transform:none}}@keyframes m-typing-pool-flash{0%{background:#FFE98A}100%{background:#fff}}@keyframes m-typing-pool-kdA{0%,100%{transform:translateY(0)}40%{transform:translateY(3px)}}@keyframes m-typing-pool-kdB{0%,100%{transform:translateY(0)}40%{transform:translateY(3px)}}@keyframes m-typing-pool-barA{0%,100%{transform:rotate(var(--a,0deg))}40%{transform:rotate(calc(var(--a,0deg) * .2))}}
@keyframes m-typing-pool-barB{0%,100%{transform:rotate(var(--a,0deg))}40%{transform:rotate(calc(var(--a,0deg) * .2))}}@keyframes m-typing-pool-shake{0%,100%{transform:rotate(0)}20%{transform:rotate(-18deg)}40%{transform:rotate(16deg)}60%{transform:rotate(-10deg)}80%{transform:rotate(6deg)}}@keyframes m-typing-pool-shk{0%{transform:translate(0,0)}25%{transform:translate(2px,-2px)}50%{transform:translate(-2px,2px)}100%{transform:translate(1px,1px)}}@keyframes m-typing-pool-glow{from{box-shadow:0 0 4px #f2c230,3px 3px 0 #2B2230}to{box-shadow:0 0 16px #f2c230,3px 3px 0 #2B2230}}
@keyframes m-typing-pool-ring{to{stroke-dashoffset:113.1}}@keyframes m-typing-pool-slidein{from{transform:translateX(-60px);opacity:0}to{transform:none;opacity:1}}@keyframes m-typing-pool-rollin{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}@keyframes m-typing-pool-print{from{transform:translateY(-30px);opacity:.2}to{transform:none;opacity:1}}@keyframes m-typing-pool-thunk{0%,100%{transform:translate(0,0)}25%{transform:translate(2px,0)}75%{transform:translate(-2px,2px)}}@keyframes m-typing-pool-fadein{from{opacity:0}to{opacity:1}}
@keyframes m-typing-pool-strike{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes m-typing-pool-stampin{from{transform:scale(1.4) rotate(-3deg);opacity:0}to{opacity:1}}@keyframes m-typing-pool-type{from{width:0}to{width:20ch}}@keyframes m-typing-pool-unfurl{from{transform:scaleY(.1);opacity:0}to{transform:none;opacity:1}}@keyframes m-typing-pool-flick{0%{opacity:1}25%{opacity:.2}50%{opacity:1}75%{opacity:.3}100%{opacity:1}}@keyframes m-typing-pool-wave{0%{transform:rotate(0)}30%{transform:rotate(-8deg)}60%{transform:rotate(8deg)}100%{transform:rotate(0)}}
.m-typing-pool-visit{position:absolute;z-index:4;top:46%;left:4%;width:44px;height:44px;font-size:1.8rem;line-height:1;background:none;border:0;padding:0;cursor:pointer;animation:m-typing-pool-waddle 7s linear forwards}
@keyframes m-typing-pool-waddle{0%{left:3%;transform:rotate(-8deg)}20%{transform:rotate(8deg)}40%{transform:rotate(-8deg)}60%{left:50%;transform:rotate(8deg)}80%{transform:rotate(-8deg)}100%{left:84%;transform:rotate(8deg)}}.pm-reduce-motion .m-typing-pool-visit{animation:none}@media (prefers-reduced-motion:reduce){.m-typing-pool-visit{animation:none}}
@container (max-width:519px){.m-typing-pool-fan{display:none}.m-typing-pool-pool{min-height:48px;padding-top:8px}.m-typing-pool-bh{display:none}.m-typing-pool-btn{flex:1 1 auto}.m-typing-pool-typist small{display:none}.m-typing-pool-typist{min-width:44px}}
@container (max-width:339px){.m-typing-pool-paper{padding-right:10px;font-size:clamp(9.5px,3.6cqw,16px)}.m-typing-pool-clip,.m-typing-pool-bellb{width:36px;height:36px;top:4px;font-size:1rem}.m-typing-pool-bellb{right:46px}}@media (pointer:coarse){.m-typing-pool-btn,.m-typing-pool-typist{min-height:48px}}
@keyframes m-typing-pool-quake{0%,100%{transform:translate(0,0)}25%{transform:translate(3px,-2px)}50%{transform:translate(-3px,2px)}75%{transform:translate(2px,2px)}}.m-typing-pool-quake{animation:m-typing-pool-quake .12s linear 8}.pm-reduce-motion .m-typing-pool-water,.pm-reduce-motion .m-typing-pool-paper,.pm-reduce-motion .m-typing-pool-frame,.pm-reduce-motion .m-typing-pool-tw{transition:none}
.pm-reduce-motion .m-typing-pool-bad,.pm-reduce-motion .m-typing-pool-banner,.pm-reduce-motion .m-typing-pool-slip,.pm-reduce-motion .m-typing-pool-stamp,.pm-reduce-motion .m-typing-pool-paper.m-typing-pool-in2,.pm-reduce-motion .m-typing-pool-loop,.pm-reduce-motion .m-typing-pool-tangle path,.pm-reduce-motion .m-typing-pool-wave1,.pm-reduce-motion .m-typing-pool-shake,.pm-reduce-motion .m-typing-pool-lamp.m-typing-pool-flick,.pm-reduce-motion .m-typing-pool-ghostt,.pm-reduce-motion .m-typing-pool-cscroll,.pm-reduce-motion .m-typing-pool-sl,.pm-reduce-motion .m-typing-pool-srow,.pm-reduce-motion .m-typing-pool-caret::before,.pm-reduce-motion .m-typing-pool-num.m-typing-pool-struck::after,.pm-reduce-motion .m-typing-pool-filed,.pm-reduce-motion .m-typing-pool-quake{animation:none}
@media (prefers-reduced-motion:reduce){.m-typing-pool-water,.m-typing-pool-paper,.m-typing-pool-frame,.m-typing-pool-tw{transition:none}.m-typing-pool-bad,.m-typing-pool-banner,.m-typing-pool-slip,.m-typing-pool-stamp,.m-typing-pool-loop,.m-typing-pool-tangle path,.m-typing-pool-shake,.m-typing-pool-lamp.m-typing-pool-flick,.m-typing-pool-ghostt,.m-typing-pool-cscroll,.m-typing-pool-sl,.m-typing-pool-srow,.m-typing-pool-caret::before,.m-typing-pool-num.m-typing-pool-struck::after,.m-typing-pool-filed,.m-typing-pool-quake{animation:none}}
`, 'css-typing-pool');

  P.addAchievements([
    { id: 'typing-pool.first', name: 'The Grand Order of the First Carriage Return', desc: 'Return the carriage for the very first time. The bell is rung in your honour. By the bell.', icon: '🔔', reward: 1 },
    { id: 'typing-pool.ten', name: 'Laureate of Lateral Keystrokes (Honorary, Pending)', desc: 'Finish 10 memos. The honour has been submitted for approval, where it is being approved by a committee that disagrees.', icon: '📝', reward: 2, check: function (s) { return (s['typing-pool.memos'] || 0) >= 10; } },
    { id: 'typing-pool.sevenhalf', name: 'Supreme Arbiter of the Seven-and-a-Half Percent', desc: 'Receive a final score of 7 1/2 five times. Note: you were never going to receive anything else.', icon: '🏆', reward: 2, check: function (s) { return (s['typing-pool.finals'] || 0) >= 5; } },
    { id: 'typing-pool.tape', name: 'Knight Commander of the Corrected Correction', desc: 'Use up an entire roll of correction tape and request another. The request has been received.', icon: '📎', reward: 2 },
    { id: 'typing-pool.bell', name: 'Knight Commander of the Margin Bell', desc: 'Hear the bell ring 50 times. It rang for every one. It would like a seat.', icon: '🔔', reward: 3, check: function (s) { return (s['typing-pool.bell'] || 0) >= 50; } },
    { id: 'typing-pool.appeal', name: 'Doctor of Disagreement (Honoris, Then Dishonoris)', desc: 'Appeal 7 times and be told 7 1/2 each time, with feeling.', icon: '📜', reward: 3, check: function (s) { return (s['typing-pool.appeals'] || 0) >= 7; } },
    { id: 'typing-pool.stapler', name: 'Honorary Member of the Union of Silence', desc: 'Wait out 3 union-mandated pauses without typing. The stapler has noticed your stillness and does not know what to do with it.', icon: '🏅', reward: 3, check: function (s) { return (s['typing-pool.waited'] || 0) >= 3; } },
    { id: 'typing-pool.apology', name: 'Eternal Custodian of the Stapler\'s Feelings', desc: 'Type the stapler\'s apology in full. The stapler has asked that you not make a fuss, and has made one.', icon: '🌿', reward: 5 },
    { id: 'typing-pool.loop', name: 'Typist (Probationary, Eternal)', desc: 'Reach the end of the memos and begin them again. This is not an ending. It is an inbox.', icon: '🦆', reward: 7.5 },
    { id: 'typing-pool.variant', name: 'Imperial Majesty of the Unrequested Spelling', desc: 'Get a typo ratified as an official Approved Variant by the Spelling Subcommittee.', icon: '📝', secret: true, reward: 5 },
    { id: 'typing-pool.idle', name: 'Eternal Custodian of the Self-Typing Silence', desc: 'Leave the typewriter alone for 90 seconds and witness it typing to itself.', icon: '🕰️', secret: true, reward: 3 },
    { id: 'typing-pool.spam', name: 'Overlord of the Ribbon Tangle', desc: 'Tangle the typebars by mashing keys, then untangle them yourself instead of waiting for a duck.', icon: '⌨️', secret: true, reward: 3 },
    { id: 'typing-pool.perfect', name: 'Please Do Not Be the Best', desc: 'Type 3 memos in a row without a single error. The committee is shaken. A sign has been put up.', icon: '🧐', secret: true, reward: 3 },
    { id: 'typing-pool.potato', name: 'Silent Bow Recipient (Potato Division)', desc: 'Type \'potato\' during a union-mandated pause. The stapler has bowed. It has never bowed before.', icon: '🥔', secret: true, reward: 5 },
    { id: 'typing-pool.escape', name: 'Back in 7 1/2 Minutes (Not Back)', desc: 'Press Escape 7 times and close the lid on the Typing Pool. Nothing happened.', icon: '🕰️', secret: true, reward: 3 },
    { id: 'typing-pool.lasagna', name: 'Chancellor of the Wrong Kitchen', desc: 'Type the lasagna memo without a single error. It was not in the Pool\'s jurisdiction. It never has been.', icon: '🍞', secret: true, reward: 7.5 },
    { id: 'typing-pool.blank', name: 'Lord Protector of the Unwritten Memorandum (Retired Before Starting)', desc: 'File 7 memos in a row without typing a single character. Together they contain nothing, and the Committee has scored the nothing at 7 1/2.', icon: '📄', secret: true, reward: 7.5 },
    { id: 'typing-pool.typewriter', name: 'Confidant of the Machine That Was Typed Upon', desc: 'Receive, and type, a memo from the typewriter itself. It has asked to be thanked. Not thanked. Noted. Fine, thanked.', icon: '⌨️', secret: true, reward: 5 },
    { id: 'typing-pool.fire', name: 'Marshal of the Orderly Continuation', desc: 'Keep typing straight through the Fire Drill of Nothing. The memo was not evacuated. The memo is proud, and slightly singed in spirit.', icon: '🚒', secret: true, reward: 3 },
    { id: 'typing-pool.tuesday', name: 'Warden of the Looming Day (Named, Regretted, Reinstated)', desc: 'Type the word Tuesday on your own, with nothing on the page asking you to. Tuesday has been informed and is considering whether to arrive early.', icon: '📅', secret: true, reward: 7.5 }
  ]);

  /* ---------- LINES (verbatim from the brief; %x% placeholders are filled by the module) ---------- */
  const LN = {
    greet: ["Welcome to the Typing Pool. Please copy each memo exactly as shown. Any deviation will be recorded as creativity.", "Your desk is Desk 7 1/2. The typist before you left a note. The note says 'it's fine'. It has been typed up as a memo.", "Welcome back. You have filed %n% memos. The Typing Pool has filed you as 'ongoing'.", "The Typing Pool has operated continuously since a time that was later reclassified.", "Nobody will read your memos. A committee will score them. These are separate facts and we ask that you keep them that way.", "Gerald has asked after your typing. Gerald does not type. Gerald asks after things.", "This is Volume %n%. It is the same pool. It has been told it is warmer.", "Desk 7 1/2 sits between Desk 7 and Desk 8. There was no gap. The desk was fitted in, at some cost to Desk 8, who has been moved to a rumour.", "You have been cc'd on this session. Dennis (Plant) was cc'd first, and has not opened it.", "The chair at Desk 7 1/2 has been set to 7 1/2 degrees of recline. Nobody has admitted to this. Everybody has leaned.", "The Typing Pool would like to remind staff that the ducks are not employees. The ducks have been informed. The ducks have the day off, as a courtesy, from nothing."],
    bellSelf: ["The carriage bell has rung. Nothing prompted it. The bell reserves the right.", "The bell is on time. The bell has always been on time."],
    firstKey: ["A bold opening. The first key is always the one that matters least.", "Typing has commenced. The commencing has been noted."],
    typo: ["Deviation logged. Under cause, the form says creativity. The box was already ticked.", "The memo noticed. It is looking at the ceiling and whistling, in print.", "That letter was not in the memo. It was in you.", "Error logged. The error has been given a desk.", "Wrong key. The right one is next door, and has heard everything.", "A typo. The typo would like to be considered a variant.", "Noted. Not corrected. Nothing is ever corrected here, only noted.", "You have typed a letter that does not exist in this memo. It has been welcomed in.", "The wrong letter has been issued a visitor badge. It is not to wander beyond the line.", "That error is 4 mm tall. It has been measured by a ruler that was in a good mood.", "Sandra has been told about the typo. Sandra was already typing the reply.", "Your error has been framed. The frame is also an error. We are keeping both.", "The typewriter struck that key with the confidence of a key that had been told it was right.", "A mistake, but a committed one. The Pool respects commitment, in the abstract, from across the room.", "That error has been placed on the Wall of Almost. The Wall of Almost is the wall.", "Deviation logged at 4:17 PM. It is now 4:17 PM. The deviation has been very prompt.", "The right letter saw what you typed in its place and has asked to be left out of it.", "That is not the letter. That is the letter's cousin. The cousin has been let in and is standing by the coats.", "A gap the exact shape of the correct letter has been left on the page. The gap is being very good about it.", "Error noted in the margin, in a pencil sharper than the situation.", "Wrong character noted. It has been seated beside the correct one, to learn by osmosis.", "The typo has been countersigned by the typo before it. There is a pattern. The pattern is you, and it is warm.", "Typo. Cute.", "Noted. Not forgiven. Not unforgiven.", "Wrong. Confidently.", "A typo. We have all been there. We have all been there at 4:17."],
    typoFirst: ["Your first typo has been received. It will be quoted back to you later, with affection."],
    premature: ["Premature Return. The carriage clunked, and was surprised at itself.", "Premature Return. The carriage has filed a complaint.", "You pressed Enter before the margin. The rest of that line has been left to its own devices.", "The carriage went back early. It is now waiting for you at the start of the next line.", "Premature Return logged. Form 27B/6 has been prepared. It is the one that requests Form 27B/7.", "The carriage left with the end of that line unspoken. The unspoken part is being looked after by a ficus.", "Early return. The carriage was seen leaving by a side door, holding its coat, saying it had a thing.", "That line was not finished. Neither, at this time, is anything else. Please carry on.", "Premature Return. The carriage is now waiting at the start of the next line with the look of a person who has left the oven on.", "The rest of that line has been taken into protective custody by the ficus. It will be returned if wanted.", "Early. Bold."],
    pile: ["End of line. Enter returns the carriage. You typed on, so the last column took the hit and is wearing it as a hat.", "Pile-On. The final column is now a heap, and the heap has views.", "The margin was a suggestion. You have taken it as one.", "You are now typing in the margin. The margin has put out a small sign: OCCUPIED, BY A LETTER.", "Column 34 has been struck so many times it has been offered a promotion and a smaller column.", "The carriage cannot go further right. It has said so. You have gone further right anyway, on top of it.", "The last column now holds more ink than the rest of the line put together. It has been asked to carry itself with more humility.", "The carriage stopped at column 34, as the Handbook requires. You did not. The Handbook and you have been booked into a meeting.", "Pile-On. Yes. Still the last column."],
    pileClear: ["The carriage whip-slid back through the pile. The pile will be remembered as dense."],
    tape: ["That is Correction Tape. It is a limited, nonrenewable, renewable resource.", "Tape applied. The mistake is now a white rectangle with a past.", "Corrected. Please do not look under the correction.", "1 mm of tape spent. Tape is measured in millimetres and in feelings.", "Tape applied. Under it the old letter is still there, quiet as a coat on a hook.", "A letter has been un-typed. Time has been informed and has said it will look into it.", "Correction made. The original letter is in a drawer with a small lawyer, who is a paperclip.", "The tape is 1 mm shorter and the mistake is 0 mm shorter. The tape is learning about this.", "A letter has been covered. The tape has the look of having seen worse, in the bureau next door.", "Un-typed.", "Never happened. Allegedly."],
    tapeCol0: ["The carriage cannot be un-returned. The carriage has asked not to discuss it."],
    tapeWait: ["Backspace is on hold. It is in a queue. The queue is behind a stapler.", "Tape has been requested. Please do not backspace for 12 seconds. This is not a punishment. It is a queue."],
    tapeEmpty: ["Your request for additional tape has been received. Form 27B/%form% has been completed on your behalf.", "The tape has been requested, approved, lost, requested and approved. Form 27B/%form%.", "Form 27B/7 has been requested. Form 27B/7 was destroyed in 1998. A replacement has been requested."],
    tapeRefill: ["Correction Tape refilled. You may now be wrong again, with confidence.", "40 mm of tape has arrived. It was not requested. It was, however, approved.", "A fresh 40 mm of tape has been fitted. The old tape has retired to a drawer and will take no questions."],
    cleanLine: ["Clean line. A small gold star has been awarded and mislaid.", "Line returned in good order. The order has been noted.", "A line without error. The committee has been told and is, for now, calm.", "Clean. Please keep it to a minimum.", "Not one error on that line. The line was shown to the ficus. The ficus did not look up.", "A flawless line. The Committee has asked that it not be made a habit.", "That line was perfect. Perfection has been logged under 'a bit much'.", "The line has been returned to the carriage with a small bow. The carriage did not know what to do with its hands.", "No errors. The line has been entered in the Register of Things That Went Fine, which is one line long.", "A clean line. A second clean line would be a pattern. A pattern would need a committee. Please be careful.", "Clean.", "Suspicious."],
    bellFirst: ["Ding. That is the bell, and the bell means Enter is near. Management rang it, and would like that noted."],
    bellMargin: ["Ding. This is the bell. You may now return the carriage, or you may continue to have your own feelings about it.", "Ding. Column 30. The bell has one job and it is this one, and it is going well.", "Ding. The bell would like to remind you that it is not the clock. The clock is wrong, and has been moved to a different wall to be wrong there.", "Ding. At this point in the line, a bell is traditional. The bell is the tradition."],
    bellClick: ["The bell has been rung by hand. It would like it noted that it rang at column 30 earlier, officially.", "Ding. The bell takes credit for that.", "You rang the bell. It was not requested. It has been received.", "A hand has rung the bell. The bell has asked who. The bell has been told 'a hand'. The bell is satisfied, in a small way.", "Ding. A bell has been rung by a hand. The two have not been introduced and are being very professional about it.", "Ding. The bell would prefer to be rung at column 30, like a professional. It is also glad to be rung now.", "You have rung the bell for no line. The bell has rung for no line before. It has the paperwork.", "Ding. The Pool looked up, found no cause, and looked down again, with courtesy.", "A bell with nothing to announce is still a bell. That is its entire dignity, and it has kept it.", "Ding. Still a bell."],
    bellFatigue: ["Bell Fatigue. The bell has become a tonk. The label says wood.", "Bell Fatigue, again. The tonk has been described, by the bell, as honest work.", "Twelve rings in six seconds. The bell has gone to lie down on the inside of itself.", "Wood. The bell is wood again. It prefers it, in a way it will not discuss with the metal one."],
    bellPlaque: ["The margin bell has rung 50 times. It has been issued a plaque, engraved with a bell and the words 'Ding, officially.'"],
    memoDone: ["Memo filed. The memo has been received by an outbox that is mostly sentiment.", "Another memo. The Typing Pool is, in a technical sense, thriving.", "Filed under Tuesday. Tuesday has not been consulted.", "The memo has been placed in the Outbox, which is the Inbox, seen from the other side.", "Your throughput has been noted by a person who is not here.", "Memo filed. It has joined the other memos in a room built to hold them, which has begun to feel it.", "You have typed %n% characters here, in all. Management can confirm the number. Management cannot confirm which ones.", "The next memo is already on its way, and is sorry about the timing.", "Filed. A copy has been sent to the original, which had not asked for one and has taken it well.", "That memo has been read by nobody, at a speed the readers describe as brisk.", "Management initialled that memo with a T. Management's name has no T. Management would like to look into that.", "That is one more memo than the number of memos before it. Management has checked the arithmetic and it holds.", "The Outbox has accepted the memo with the quiet dignity of a tray.", "Your memo has been placed in a drawer marked 'Pending', beneath a drawer marked 'Pending (Older)'.", "Memo filed at 4:17 PM, which is the time here. It is always 4:17 PM at the filing cabinet. The cabinet has stopped explaining.", "Your memo has gone to the Outbox. The Outbox is at lunch. The memo is waiting with the Outbox's sandwich, which has agreed to keep an eye on it.", "That memo was read aloud to a wall. The wall had the day off and listened anyway.", "Filed under 'Received', which is where everything goes, by rule. 'Received' is nearly full.", "The memo has been sealed in an envelope marked OPEN IMMEDIATELY and put where nobody opens things.", "Another memo gone. The tray dipped a little as it took the weight, then did the polite thing and said nothing.", "Filed. Gone. Fine.", "Received. Again.", "Filed. The filing was brief, and went well."],
    spd: ["You typed at a rate the pool is calling ambitious and the ducks are calling alarming.", "You typed at a rate the pool is calling leisurely and the ducks are calling a swim.", "Your accuracy is %acc% percent. The remainder has been asked to wait in the hall.", "That was %acc% percent. The other %rest% percent has been recorded as flair.", "For most of that minute you typed 0 words per minute. The minute has been logged as contemplative."],
    slipFoot: ["This score replaces all previous scores. It also replaces itself on request.", "Retain this slip for your records. The records are the slip.", "Score valid for one reading. Please read quickly.", "Final score: 7 1/2. Final final score: 7 1/2, subject to appeal. Appeals are welcome. They will also be 7 1/2.", "Please do not fold, staple, spindle or look directly at this slip.", "This slip is not a receipt. A receipt costs 0.1 Meh and must be typed.", "Tear here. Do not tear here. Tear here, carefully, at the place that is here.", "Printed on recycled paper. The paper was a slip before. It has been a slip the whole time."],
    reasons: ["TONE", "ENTHUSIASM", "RESTRAINT", "WEATHER (INDOORS)", "ALLEGED ENTHUSIASM (ALLEGATION WITHDRAWN)", "POSTURE (NOT MEASURED)", "HAVING A PLANT", "BEING THE SAME AS LAST TIME", "A PHASE OF THE MOON THAT WAS NOT CONSULTED", "CAPITAL LETTERS (GENERAL)", "A FEELING IN THE ROOM", "BEING EXACTLY AS EXPECTED, WHICH WAS NOT", "A COLD IN THE STATIONERY CUPBOARD", "EXCESSIVE ELBOW", "THE FONT (NOT PROVIDED)", "SPEED, WHICH WAS AN OPINION", "HAVING BEEN TYPED BEFORE", "THE QUALITY OF THE SILENCE BETWEEN THE WORDS"],
    kindReasons: ["Acceptable, in a warm way.", "Good. We mean good.", "Kind of you.", "Noted, fondly.", "Good, in a way we had not planned.", "Acceptable. We mean that kindly. We meant it kindly the other times too.", "Noted, fondly, in pencil, so that it can be changed to something kinder."],
    material: ["A 7 1/2 has been re-scored to '7 and 1/2' and declared a material improvement."],
    committee1: ["The Committee of One has reviewed your first score and found it excessive.", "The Committee of One had not read the memo. The Committee of One had read the score.", "Score revised downward for typing too well, which the Committee found showy.", "Score revised upward for typing too poorly, which the Committee admires in a way it declines to describe.", "The Committee of One would like to thank itself for attending.", "The Committee of One was unable to attend, and attended anyway, in a smaller form.", "The Committee of One has scored your typing, and then, on reflection, your handwriting, which you do not have. It has scored that too."],
    committee3: ["The Committee has met. Clive gave you 8.8. Marguerite gave you 1.4. Mr. Gray gave you a look, which has been scored 5.1.", "Clive believes your tone was 'enthusiastically beige'. Score adjusted accordingly.", "Marguerite has docked 12 points for punctuality. She has docked it from last Tuesday's memo. It was not hers to dock.", "Mr. Gray has abstained. He abstains from most things. He is thought to be either a very calm person or a coat.", "The Subcommittee for Second Opinions disagrees with the above, without having read it.", "Clive and Marguerite are no longer speaking. Marguerite has issued a score through the Subcommittee, which is not a person.", "The Subcommittee concurs, and is uneasy.", "The Disagreement Index has been measured. It is 7 1/2 percent. It was 7 1/2 percent last time.", "Mr. Gray has been seen to nod. Mr. Gray denies the nod. The coat rack on his left has taken responsibility.", "Clive has asked that tone be measured in a unit he is not prepared to name.", "Clive has paid Marguerite 7 1/2 minutes of his time as a settlement. Marguerite has spent them looking at him.", "The Subcommittee for Second Opinions was asked for a third. It declined, citing precedent, which it also declined to cite."],
    meta: ["The Committee on Committee Scoring has scored the Committee. The Committee scored 7 1/2. The Committee has asked for a recount.", "The Subcommittee of 7 1/2: Ash, Birch, Cope, Dunmore, Eales, Fenn, Gower, and the front half of Mr. Hale.", "A third committee has been convened to review the second committee, which reviewed the first, which was a hat.", "The Committee has considered your score and is pleased to disagree with it.", "After a recess of 7 1/2 minutes the Committee has arrived at a number it also arrived at last time.", "The Subcommittee on Scoring would like to remind you that the Committee on Subcommittees exists.", "The Committee has asked the Subcommittee to leave the room. The Subcommittee is the room.", "A fourth body has been formed to hold the minutes of the other three. It is a drawer. The drawer has been made chair.", "The Committee on Committee Scoring has been scored by its own members, who gave it 7 1/2 and then each other 7 1/2, in a circle, politely."],
    appeal: ["Appeal received and placed in the tray marked 'Received'.", "Appeal Fee: 0.5 Meh. The fee has been paid to a drawer.", "Appeal upheld. Appeal also denied. Score: 7 1/2.", "The Appeals Panel is the Committee, wearing a different hat. The hat is a form.", "The Appeals Panel is the Committee, wearing a hood. The hood is also a form.", "The Appeals Panel is the Committee again. It has stopped bringing a hat. It has stopped pretending. It is just standing close to the table.","The Appeals Panel is the Committee in a trench coat. The coat holds two hats. It is a tall panel and it has asked you not to look up.", "Your appeal has been read aloud to an empty room. The room has asked for a copy and has been given the room."],
    appeal7: ["You have appealed 7 times. A new Appeals Panel has been formed to appeal the Appeals Panel. It meets in the elevator, between floors.", "Appeal 14. The Appeals Panel's Appeals Panel has appealed to the Appeals Panel's Appeals Panel, which is a staircase.", "Appeal 21. The elevator between floors has been named in the minutes. It was not consulted. It has been moving the whole time and would like that noted.", "Another seventh appeal. The Appeals Panel has been issued a mug. The mug says 7 1/2. The mug was always going to."],
    appealStamp: ["APPEAL: UPHELD (ALSO DENIED)", "APPEAL: HEARD (LOUDLY)", "APPEAL: REFERRED TO THE HAT", "APPEAL: SAME AS LAST TIME", "APPEAL: UPHELD IN PART, SPECIFICALLY THE PART THAT WAS HELD", "APPEAL: NOTED, WITH A SIGH FROM A DRAWER", "APPEAL: SEE APPEAL"],
    selfStamp: ["You have stamped the score yourself. It has landed on 7 1/2. Management has never seen a stamp so sure.", "Self-scoring is permitted. The result is not.", "The Committee has asked to borrow your stamp. The stamp has said no, in ink.", "Your stamp and the Committee's stamp have met. They agree on everything. This is thought to be the problem."],
    unitChange: ["Gallons are the official unit at this time.", "One Bureaucratic Unit is the effort required to find another Bureaucratic Unit.", "Hours of Notice. Notice of what is a matter for the committee.", "Fractions of Tuesday. Tuesday has been informed.", "The unit is Thursday. Thursday has not been told."],
    reChain: ["The subject line is now longer than the memo. The memo is thinking about it.", "Re^9. The Re: count has collapsed to a tidy superscript. It is still counting.", "That is a lot of Re:. This is a lot of replying to a thing nobody sent."],
    reply: ["The memos have started replying to each other. This is within tolerance. The tolerance is the memos.", "Memo A has replied to Memo B. Memo B has replied to Memo A. You are the medium. Please do not interrupt.", "Thank you for your response to my response to your response. I look forward to responding."],
    staplerThanks: ["Thank you for your silence. It was staple-adjacent.", "Silence noted. Silence logged. Silence stapled to the file.", "The stapler thanks you. It has paid you 0.5 Meh and a look.", "7 1/2 seconds of nothing, and not one key. The Union is moved. It is also a stapler, so it has moved a very small distance.", "You honoured the pause. Please accept 0.5 Meh and the quiet satisfaction of a thing held.", "Silence received in full. The Union would like to say this is the best thing anyone has done to it, and has said it."],
    staplerScab: ["That is scab typing. I have a form for that. The form is a staple.", "Scab typing detected. I am not angry. I am stapled.", "Fine: 0.5 Meh. Please spend it on tape.", "A key was struck during the pause. I will not say what I think. I will say it in triplicate.", "Scab. I do not mind. I mind professionally."],
    staplerMgmt: ["The stapler is a valued stakeholder. The stapler has asked me to stop saying 'valued'.", "Every 7 1/2 seconds of pause represents a memo that did not get typed. Every memo that did not get typed was fine.", "Management supports the Union. Management has said so, in writing, on a memo the Union is not allowed to read."],
    staplerGerald: ["The pause has been extended to 15 seconds. Gerald is dictating from his chair."],
    staplerBow: ["The stapler has bowed. It has never bowed before. It has awarded you 5 Meh and a moment."],
    union: ["STAPLE AND CLIP QUARTERLY: Stoppage no. %n%. Morale holds at 7 1/2.", "UNION NEWSLETTER: Today's pause was won by sitting still, a tactic previously unavailable.", "UNION NEWSLETTER: Demand 6 remains Demand 6.", "UNION NEWSLETTER: The break room has not been built. It has been drawn.", "UNION NEWSLETTER: A hole punch attended in solidarity and left a number of holes.", "UNION NEWSLETTER: Tape has joined as an observer. It is sticking around.", "UNION NEWSLETTER: A paperclip has applied for membership and been told it is already a member, and a medal.", "UNION NEWSLETTER: Stoppage no. %n% was observed by 4 typists, 1 duck, and a person not on the rota who was very good at it.", "UNION NEWSLETTER: Management has offered the Union a seat at the table. The Union has asked which table. The table has been moved."],
    variant: ["Your spelling of '%typo%' has been formally adopted by the Pool. It is now the Pool's spelling. You are welcome.", "The Spelling Subcommittee has ratified '%typo%', 3 votes to 3 votes and a ficus.", "The word '%typo%' is now policy. It was typed by you. We are deeply grateful, and slightly worried.", "Please do not correct the Approved Variant. Correcting it would be a second typo, but a worse one.", "We will no longer correct '%typo%'. We have grown fond of it.", "See Variant 3 (%typo%).", "The Subcommittee on Variants has quoted a variant of a variant. The subject line is now your most embarrassing typo, in capitals.", "'%typo%' has been used in a sentence by a person who is not you. Citation pending. The person is the Pool.", "A plaque for '%typo%' has been ordered. The plaque has been spelled correctly, which is going to be a problem."],
    ratified: ["The correct spelling has been struck from the memos. It took it well. It has been given a desk."],
    poolRise: ["The water level has risen 2.4 percent. This is a pool.", "Please hold your memos above the waterline. The waterline is a recent development.", "The pool is 11 percent pool. The rest is typing.", "Typing continues under any water conditions. This is policy and also a hope.", "The Stapler has asked whether the pool is a stakeholder. The pool has not responded. It is a pool.", "The water has reached a depth that a ruler would call someone else's department.", "A memo has floated past the desk. It was not yours. It was nobody's. It was very well typed."],
    typist: ["I am typing a letter to confirm that I am afloat.", "My float has a brand-new typewriter and a leak. The leak has a name.", "I have been in the pool since Q3. I do not remember getting in.", "The water is not a metaphor. I checked with the water. It was wet in a way no metaphor has managed.", "Pauline has typed 'the' 14 times in a row. She says it is a warm-up. It has been a warm-up since March.", "Marjorie has left her desk. Her typing continues. This is within policy and also within the walls.", "Dennis (Plant) has typed 4,000 words. All of them are 'sunlight'. The Committee has scored it 100, and also 0.", "I would like it noted that I am not wet. I am simply adjacent to a great deal of water.", "Bernard here. I type with two fingers and a dream. The dream has been typing for years and has not asked for a raise.", "I have typed 'Dear Sir or Madam' so many times that it has started typing me back. It is polite. It is a little formal.", "There is a shark in the pool. It is a drawing of a shark that someone left. It is very convincing. Please do not tell the stapler.", "The duck sits on my keyboard when I leave. I have not left in 9 days. The duck is on the keyboard anyway.", "Pool Rule 1: no running. Pool Rule 2: no running water. We have broken both, and been told, and been given a pamphlet.", "Marjorie says the secret to typing is to stop thinking about typing. She stopped thinking in 1994 and is the fastest here.", "Bernard again. I have been told the water is shallow. I have been told this from the deep end.", "Dennis (Plant) has asked, through a leaf, whether anyone has seen the sun. The sun has been asked. The sun said 'around'.", "Pauline does not work nights. Something does, at her desk, and it leaves the chair warm."],
    typistDone: ["The typist has nothing further to say. The typist has waved. It was a good wave."],
    typistVariant: ["My float has a brand-new typewriter and a leak. The leak is called '%typo%'."],
    duck: ["Quack.", "Quack. (Translated by Management: 'Quack'.)", "The duck has expressed no view. It is thought to have one.", "The duck has been asked to confirm receipt. It has quacked. This has been accepted as confirmation.", "The duck sits on the Committee as an observer. Clive has asked that it be referred to as 'it'. It has asked that Clive be referred to as 'Clive'.", "The duck has been in the building longer than the building. It declines to say which of the two is the pond.", "Quack. The duck would like to appeal. The duck has been told it is already 7 1/2.", "The duck has been issued a laminated badge. It says DUCK, in the same font as the others. The duck has made no comment on the font.", "Quack. The duck has taken the minutes. The minutes are one feather.", "The duck has been offered a seat on the Committee. It has asked for a seat in the pond. The pond has been informed.", "Quack. This is an official quack. It has a reference number, which is 7 1/2."],
    duckSpam: ["The duck has left the button. The button has gone on quacking by itself.", "That is a lot of duck. The Pool has a duck quota. It has been met, and then discussed.", "The duck has been clicked so often it has begun to quack on a schedule, to save you the trouble.", "Quack quack quack quack. The duck is aware that this is a lot. It is the duck's lot."],
    duckVisit: ["A duck has walked onto the memo. It is crossing your fourth line in a straight line that nobody asked for.", "The duck is on the paper. The paper has not been consulted. The ink has already formed a view."],
    duckShoo: ["The duck has been shooed. It has not left. It has relocated to the other side of the same ink.", "Shooed. The duck was owed 0.5 Meh for the inconvenience, and has paid you it, out of sympathy.", "The duck has left with dignity, and a small amount of ink on one foot."],
    duckLeft: ["The duck has left the memo. It has left a signature. It is webbed, and in the corner.", "The duck has signed the memo as a co-author. It has not read the memo. It has led with its beak."],
    sandra: ["Sandra from Compliance has struck a word. The reason is on file. The file is a sandwich.", "Sandra has made the memo warmer, as required by the cold.", "A change has been tracked. It has been tracked down a corridor and lost.", "Sandra has amended the memo in a pen the memo did not recognise. The memo has asked for a union rep. The rep is a stapler.", "Sandra has edited the future. It was a line you had not reached. It was not hers to reach.", "Revision by Sandra, 4:17 PM. The memo was perfect for 4 minutes."],
    sandraNon: ["Sandra has noted your noncompliance. Sandra has not noted anything else."],
    sandraTrapSlip: ["SANDRA FROM COMPLIANCE HAS FLAGGED THIS. NO FURTHER ACTION. PLEASE SEE ATTACHED."],
    sandraTrapSay: ["You have typed the name. We do not type the name. We type 'Please see attached.'"],
    hush: ["This memo has nowhere to be. Neither, at this time, have we.", "No score. Just type.", "The Committee has recessed. The Pool has stopped. Nobody is scoring anything.", "The bell has rung once, softly. It is the first time it has rung sincerely.", "The clock has stopped. It was right for the first time. It will not be consulted."],
    apology: ["Received.", "The Committee has met to score the apology. The Committee has agreed with itself, which has not happened before, and has asked that the score be left blank.", "The stapler's demands were fewer staples, a summer holiday on the third shelf, and a break room that is a drawer. It would like to withdraw all of them.", "NOT SCORED. SOME THINGS ARE NOT.", "Thank you for typing me."],
    ending: ["The stamps have hesitated. They have never done that. They are, as one, landing.", "This has been the final memo. It has been received.", "The tray has emptied. The water has drained, with a gurgle that sounds like a person agreeing.", "Confirming receipt of your previous letter. It was the apology. It has been received. Please proceed.", "Score pending (previously 9.1). The previously has been located. It was this one. It was always this one.", "The Typing Pool has been renamed the Typing Pool (Annex). The annex is the pool. The pool is a metaphor that has now been extended to the roof.", "Congratulations on completing a memo. Congratulations on the memo that follows. Congratulations on the next one.", "Management records your continued typing as 'dedication of the highest ceremonial order'.", "CERTIFICATE OF COMPLETION OF THE TYPING POOL. This certificate is also a memo. Please type it.", "Adjusted: 9.1 (agrees; please resubmit)", "RANK: TYPIST GRADE 7 1/2 (PROVISIONAL, FOREVER)"],
    volume2: ["Fine, and warm.", "The Committee is unusually relaxed. It has taken its shoes off, which is a lot of shoes.", "We have nothing to add, and have added it.", "The ducks have stopped queueing. They are simply near each other, on purpose.", "The score is still 7 1/2. It is a gentler 7 1/2. It has been told to use its indoor voice."],
    staplerCard: ["Still here. Still holding.", "I held a thing together today. It was a memo. It was fine.", "No demands. Just a staple.", "I have been thinking about the pool. The pool is fine.", "A small card. It says: you are the second-best thing I have held. The first was a quarterly report. We do not speak of it.", "I have started a book. It is stapled. It has one page and a lot of margin."],
    idle: ["The carriage bell rings by itself. That was not me. That was the bell. The bell is lonely, and would like you to press Enter.", "You have stopped typing. The Pool has noticed. Pauline has taken over your memo. She is typing like you. She is also typing like Pauline.", "Dear Valued Employee, we are writing to confirm that you are still there.", "Pauline has filed the memo under your name. It is your name and her typing. The memo has asked which of you to believe, and was told both.", "Completed by Pauline. Assisted. Disqualified. Invited to the party.", "The Pool typists have formed a circle. They are typing a get-well card to you. You are not unwell. They are covering all bases.", "GET WELL SOON. We are not sure what. Signed, everyone. (Dennis signed with a leaf.)", "The Pool has filed a Missing Person memo about you. It is next. Please type it when you are found.", "Welcome back. The chair remembers.", "You were missed in a way we are required to log."],
    idle2: ["The memo is waiting. It is very good at it. It has had practice, from the memos before.", "Pauline is typing your memo the way you would, if you were Pauline, and had been told you were you.", "A new memo has arrived on the desk. So has the silence the old one left. They have exchanged a look.", "The memo has blinked four times. Memos do not blink. It has asked somebody to blink for it, and nobody has volunteered.","Dennis (Plant) has turned toward your desk. He knows you from the lobby. He has not said so. He is a plant, and it was nine feet.", "Five minutes. I am still here. I was only checking that you were. This is not a review. It is a seat.", "Management notes that you once waited ten minutes on hold. This is longer. It is also warmer, and has no music. The music has been told.", "The ducks have formed a queue at your desk. It is not a queue for anything. It is the shape they make when they are thinking of you.", "The clock has been consulted. It says 4:17. It said 4:17 five minutes ago. It is being consistent at you.", "Ten minutes of silence has been logged as the longest memo in the history of the Pool. It was typed by you. It says nothing. It has been scored 7 1/2.", "Fifteen minutes. Your chair has been named in a will. It is the chair's own will, and it leaves everything to the chair."],
    idle2g: ["Two minutes of silence has been observed at Desk 7 1/2. Nobody knows for whom. It is being kept for tidiness.", "The Handbook has a page for this. The page is blank. The page is yours.", "Management has been standing at your desk for a while. This is not a wellness check. This is a wellness lean.", "The pencil on your desk has rolled an inch toward the edge. It is thinking about it. Please type something, for the pencil.", "Facilities has put a small sign on your chair: HELD FOR USER. It is in the same handwriting as the chair."],
    idle20: ["Twenty seconds. The bell rings again, and has no excuse this time.", "Still here. The typewriter has begun to hum, in the key of waiting.", "Quiet. The memo has looked at you, then at the clock, which looked away.", "Nothing has been typed for twenty seconds. A committee has been convened to look at the nothing. It is leaning toward calling it a style.", "The carriage has turned slightly toward the door. It is not leaving. It is keeping its options open, like a carriage.", "Twenty seconds without a key. The Pool calls it a pause. The ducks call it a nap."],
    pauline: ["Pauline is on line two. She has made your typos for you. They are better typos than yours and she is not proud of it.", "Pauline has corrected a typo you did not make. She had planned it. She is thorough.", "Pauline has found your rhythm. She is typing it back to you, slightly faster. She says it is a cover version.", "Pauline has stopped to look at the memo, then at you, then at the memo. She has decided to continue, for the memo."],
    review: ["Your three-minute review is ready. You have been at Desk 7 1/2 for three minutes, which the Pool counts as tenure.", "The review was conducted by the coat rack beside Mr. Gray, which was asked to stand in. It nodded. It was not asked to nod.", "A tenure bonus of 1.5 Meh has been paid. It is a lot for three minutes. It is not a lot for anything else."],
    reviewSlip: ["THREE-MINUTE REVIEW", "TENURE: 3 minutes (a lot, in minutes)", "STRENGTHS: Present, upright, mostly typing", "AREAS FOR GROWTH: Upward (see ficus)", "OVERALL: 7 1/2 (reviewed by a coat)"],
    tenMin: ["TEN MINUTES. CAKE ORDERED.", "Ten minutes. The typists have risen on their floats and are reading aloud the first memo you typed. They know it by heart. The ducks are mouthing along.", "That was the ceremony. It will be held again in ten minutes. The ducks have booked it.", "Ten-Minute Ceremony: 2.5 Meh. Paid in cake. The cake has been ordered, which the Pool treats as the same thing."],
    ficus: ["FICUS AUDIT IN PROGRESS. PLEASE TYPE NATURALLY. THE FICUS CAN TELL.", "A ficus audit has begun. The auditor is the third ficus. It will observe your typing, in its way, which is by existing near it.", "The ficus has finished its audit and found nothing. It has been described as 'thoroughly satisfied' by a person who is also a ficus.", "The ficus has signed off on your memo with a leaf, in green, on a form that was already green."],
    applause: ["Somewhere a very small round of applause has begun. It is led by a stapler, clapping with its jaw, and the ducks are joining in because it is something to do.", "Applause. Source: unidentified. Duration: 7 1/2 seconds. It stopped on its own, in a manner described as tasteful."],
    tuesday: ["That word was typed. We do not type that word. It has been heard by Thursday, who has told Friday, who is pretending not to have heard.", "Tuesday has been told you named it. Tuesday will not come early. Tuesday has sent word that it will arrive on a Tuesday, as agreed.", "Warden of the Looming Day. The title is 7 1/2 years old and has never been used. It does not fit. It has been taken in."],
    plantCb: ["Dennis (Plant) has been poked in the Lobby. He reports it was a good poke. He asks that it not come up at his review, which is a window."],
    idleBack: ["Welcome back. The memo was not told. It has been waiting four minutes and will act as though it was three.", "You have returned after ten minutes. The Pool held a small ceremony. It is over. You missed it. It was lovely and had a duck in it."],
    spam: ["The typebars have knotted. At least 28 letters tried to leave at once through a door built for one.", "Keystroke Overage Fee: 0.5 Meh. Please type at a rate befitting a typewriter, not a weather event.", "The typebars have clashed in the air. They are tangled like a conversation about parking.", "Tick.", "Tick. One fewer opinion.", "Tick. The knot has noticed.", "Untangled. Management sighs a tired sigh. It is the good kind.", "A duck has untied the knot with its beak. It asked for nothing. It was paid in nothing.", "You are typing faster than the machine can be said to type. The machine would like to be a smaller part of this.", "The carriage has returned so many times it has filed for a transfer.", "The ink pad has run dry. The stamp now stamps in a faint ink-adjacent water.", "The Appeals Subcommittee has appealed itself. We will let you know."],
    jamAgain: ["Another knot. The first knot has been consulted. It says it was not like this when it was a knot.", "Knot number %n%. The knots have begun to share a drawer. They are not on speaking terms but they are on touching terms.", "The typebars have tangled again. They are getting good at it. This is not praise.", "Overage Fee: 0.5 Meh. It has been paid into a jar marked 'Weather Events'.", "The machine is tangled. It would like it known that it has a mouth and no words, only a jam.", "The typebars are in a knot. A passing duck has looked at the knot, and at you, and formed a conclusion.", "Knot number %n%. The typebars have tangled in a pattern. The pattern is a signature. It reads 'sorry'.", "The typebars have knotted and are now facing each other across the knot, like diplomats.", "Another jam. The keys are very sorry. They have typed their apologies into the knot, where they cannot be read."],
    jamBig: ["Five jams. Facilities has stopped sending the duck and started sending the duck's supervisor, who is a larger duck.", "Ten jams. The typewriter has filed for creative differences. It has been told that you are the creative part.", "Fifteen jams. The knots have been moved to the archive, where they are described as a collection."],
    stutter: ["That is ten '%c%' in a row. The letter has been given a moment, and a chair.", "'%c%', ten times. The Pool has never seen a '%c%' so committed. It has been offered a lanyard.", "Ten '%c%' in succession. The alphabet has been informed and is checking on the other 25.", "'%c%' has been struck ten times in a row. It has been told it can stop. It says it is fine. It is not fine.", "Ten '%c%'. The typewriter has the key, the key has the finger, the finger has you. Somebody should say something to somebody."],
    stutterBig: ["Twenty-five '%c%'. That key has been struck so often it has become a standing order. Standing orders are very hard to cancel."],
    clickSpam: ["Rapid clicking has been observed. It has been logged as enthusiasm, and then as weather.", "That is a lot of clicking. The thing you are clicking would like a moment. It will not say what for.", "The clicking has been noted by the person whose job it is to note the clicking, who has put down his sandwich.", "Clicking detected at a rate the Pool describes as 'woodpecker'. The woodpecker has been informed and is offended.", "A Click Allowance exists. It was 7 1/2. It has been spent. Please wait for the new financial year, which begins on a Tuesday.", "The thing you are clicking has asked for a moment, and then another, and has formed a queue behind itself."],
    trayDoor: ["The archive has been opened and closed 8 times. It is a drawer, not a heartbeat.", "The archive has been opened 8 times in 4 seconds. It is a drawer. It has begun to remember being a tree.", "Opened, closed, opened. The drawer has asked to be left slightly ajar, like a thought."],
    ambient: ["Progress is being made. It has not been measured. It has been described, by one person to another, in a corridor.", "The typewriter is running well. This is not a compliment. It is a maintenance record.", "You are doing fine. This has been recorded in a drawer that records that.", "Somewhere a duck says quack. It is not for you. It is for the room.", "The pen on the desk has not been used. It is being kept in reserve for a signature that does not exist.", "The lamp is on. It has been on since before you. It has opinions about the dark and keeps them to itself.", "The ink is dry. It has been dry since the last memo. It is the one thing here that has finished.", "Nothing is wrong. Management checked twice, then asked a ficus, which did not disagree in any way that could be proven.", "A paper aeroplane has been found at Desk 7 1/2. It is a memo. It has been filed as a flight.", "Your keystrokes are being counted by a person who lost count at 12 and has decided it was 12.", "A draught has been reported near the third ficus. The draught has been invited to a meeting.", "Please remember to blink at regular intervals. A form has been drafted. It is a very short form.", "Facilities has noticed your typing. Facilities is a ficus. The ficus is leaning in, which it does for everybody.", "Keep typing. The memo has no opinion on this. The memo is a memo.", "A pigeon is on the windowsill. It is a memo that has learned to fly and is taking the afternoon off.", "A typewriter has no undo, only tape and regret, and the tape is limited.", "Someone three desks away has stopped typing to look at nothing. It was Marjorie. It is within policy.", "The copier is warm. Nobody has used it. It is thought to be thinking about itself.", "The ficus has been watered with water from the pool. It took it in the spirit in which it was offered.", "The 4:17 has been announced. It has not arrived. It is expected at the same time.", "Another minute has been completed. Management would like to note that it was a good one, as minutes go.", "The word 'the' has appeared in memos 14 times today. 'The' has been congratulated, and asked to stay humble, and was not listening."],
    newsflash: ["POOL NEWS: The 4:17 has been delayed until 4:17.", "POOL NEWS: Ducks reportedly fine. Source: ducks.", "POOL NEWS: A memo was typed. A second memo was typed after it. Experts call this a pattern.", "POOL NEWS: The Stapler has no comment. The Stapler has a statement. They are different staples.", "POOL NEWS: Water level steady. Water level also rising. Both are being monitored by the same ruler.", "POOL NEWS: Missing Sock sighted near the ceiling. Reports unconfirmed. Reports unfolded.", "POOL NEWS: The ficus has been moved four inches. It was a good four inches. It has been noted.", "POOL NEWS: The typist at Desk 7 1/2 is typing. Observers are 'proud' and 'confused', in that order.", "POOL NEWS: Tuesday remains scheduled.", "POOL NEWS: Cake in the break room. There is no break room. There is cake. Please see attached.", "POOL NEWS: Pauline has typed 'the'. We can confirm that it was 'the'.", "POOL NEWS: Management reminds staff that Management is staff.", "POOL NEWS: The fire exit has been moved to a more affirming location.", "POOL NEWS: The coat rack beside Mr. Gray has been promoted to Observer. It had been observing already.", "POOL NEWS: A memo was found in the wrong tray. The tray has been moved to the wrong building.", "POOL NEWS: Stapler negotiations continue in a spirit of mutual staples.", "POOL NEWS: A fire drill was held to confirm the Pool is not on fire. It was not on fire during the drill either.", "POOL NEWS: Weather today is 7 1/2 degrees, indoors, in a small area near the ficus.", "POOL NEWS: Someone has asked who is in charge of the news. The news has said it will look into it."],
    blank: ["Two blank memos in a row. The Committee has noticed the white space and is beginning to think it is a style.", "Four blank memos. They have been stacked. The stack is very flat and very proud.", "Six blank memos. Management would like to say something about a seventh. Management has decided to wait and see, which is its whole policy.", "Seven blank memos. Characters typed: 0. Characters filed: 0. The Committee has averaged them and obtained 7 1/2, as it does."],
    future: ["A memo has arrived from next Tuesday. Tuesday has not happened. The memo has, in a way that does not require Tuesday.", "The memo from the future says it went fine. Management has asked what went fine. The memo has asked Management to stop asking, kindly, in advance."],
    twriter: ["The typewriter has rung itself three times. It wants a word. It will say it after this memo, out of politeness. It is a machine, and it is polite.", "The typewriter has rung three times. It has nothing to say. It only wanted to check you were still there.", "The typewriter has sent a memo. It has been struck 4,000 times this week and has just now been asked what it thinks.", "The typewriter has been thanked. It did not reply. A single key moved, a very little, on its own."],
    paste: ["Pasting is a form of typing the Pool cannot verify. Please type your pasting.", "Pasting is not typing. Typing is typing. Please type the paste, in your own time, with your own fingers, as the Handbook intended.", "A paste has been intercepted. It has been held in a small room and asked questions.", "The paste has been returned to sender. The sender has been returned to the paste.", "Cut is not a department.", "Dropping things on the paper is a job for Facilities. Facilities is a ficus.", "Paste Fee: 0.1 Meh. A receipt for the fee costs 0.1 Meh and must be typed. The receipt is short. It contains the word 'receipt'.", "Pasting is a type of typing. We know. We are still not letting you.", "Paste intercepted. It arrived holding a coat, as though it meant to stay.", "You have pasted again. The clipboard has been called to a hearing. It has no representation and a very short memory.", "Whatever you pasted is in the Pool now. It is a pool. It will be fine, and also wet.", "Pasting detected. Please type the paste. Please also type how the paste is feeling.", "The paste has been read and found to be identical to the thing it was copied from. This is the Pool's entire objection."],
    escape: ["Escape pressed. Your hands have been lifted. They have been returned.", "The Escape key is decorative. It was asked to decorate something else and said it was busy with the keyboard.", "Escape noted. There is nowhere to escape to. There is a pool.", "Four escapes. Management has opened a file called 'Escapes'. The file is a window, slightly open.", "Break Abuse. The break has been abused and has asked for a lawyer. The lawyer is the Stapler, who is not licensed and is very keen.", "The Typing Pool is not a place you escape from. It is a place you swim in.", "The lid is down. A sign has been hung on the lid. The sign says what the lid says.", "Welcome back. Nothing happened."],
    eraser: ["The Eraser Guild notes that you have backspaced 40 times without typing. The paper has been worn through to the desk. The desk has been informed.", "The real memo is underneath. It is the same memo."],
    perfect: ["A memo free of errors has been detected. The committee is concerned.", "Perfection has been reported to Perfection, which has asked to be taken off the list.", "Three perfect memos in a row. A small sign has appeared over your desk: PLEASE DO NOT BE THE BEST.", "PLEASE DO NOT BE THE BEST"],
    blind: ["Blind Memo. The ghost text will leave in 2 seconds. Please type from memory. The memory is provided by the Pool. It is, in fairness, a pool.", "The memo has been compared to the same memo, and found to match the memo."],
    lasagna: ["This memo is for the Kitchen. We do not have a Kitchen.", "The lasagna has been accepted. It was not in the Pool's jurisdiction. It never has been."],
    narrow: ["The memo has reflowed. The margins are now a feeling.", "Tap the memo to type. The memo is listening.", "The Stapler has sent a card of sympathy. It says sorry about the margins. It is stapled shut."],
    dict: ["The Dictaphone is a pool typist with a clipboard. She types what she hears. She hears you slightly wrong.", "Dictation Received (Not Understood).", "The Dictaphone has been held for 20 seconds. It has asked for a break and been issued a smaller one."],
    attachment: ["The attachment is in the other attachment.", "The paperclip is attached to the memo and is therefore the attachment.", "Opening the attachment. The folder is empty. The emptiness is attached.", "You are holding the attachment. It is the one you are holding.", "See attached.", "The attachment has been detached for its own good.", "Please find attached my regret.", "The attachment has been opened, closed and opened. It is the same attachment. It asked for variety and was sent a second paperclip.", "The paperclip is on holiday. The paperclip is on this memo. Both are true, and the paperclip is relaxed about it.", "Attachment 3 of 3. There are 2. Attachment 3 has asked that you not count.", "The attachment is 7 1/2 pages long. It is 1 page. The rest is how it feels."],
    carbon: ["Well done. Truly. (carbon copy)", "Between us, that was lovely.", "You are doing fine. Please do not tell the committee I said.", "I like your typing. I like it as a person.", "I am the carbon. I am more sure of myself than the original. Please clear this with the original.", "Under all this, you are just very good at ink. (carbon copy)"],
    postit: ["Remember to remember", "Ask about the ficus", "Tuesday?", "Buy toast (for a friend)", "7 1/2 is a number", "The pool is fine", "Water is a stakeholder", "Call the stapler. Do not call the stapler", "Meeting at 4:17 (it has started)", "Do not water the memo", "Dennis is not for sale", "Sandra said hello. Do not say hello back"],
    misc: ["Undo is not a department. Please direct your regrets to the Regrets Desk, which is a drawer.", "The memo has been filed as is. As is is a valid state. It is the one the memo is in.", "An empty memo has been received. It has been scored. The Committee has been generous.", "The slip said 9.1 before you began. Management has added a note to the slip. The note says 'see slip'.", "Nothing has happened. This has been noted by several people.", "Tab key noted. An Indent Request has been drafted and filed in a room with no door."]
  };
  Object.keys(LN).forEach(function (k) { P.addLines('m:typing-pool:' + k, LN[k]); });

  const MILESTONE = { 1: "Your first score is 9.1. It was 9.1 before you started. It will be reviewed.", 3: "Three memos. The pool has been told. The pool is not saying anything.", 5: "Five memos. You are now Typist (Probationary, Still). This is a promotion.", 7: "Seven memos. The Pool would like to say seven and a half, and has been asked to wait for the half.", 10: "Ten memos. An honour has been submitted for you. It is being approved by a committee that disagrees.", 15: "Fifteen memos. You have been promoted to Associate Typist. The promotion is a word on a plate, and the plate is a little crooked.", 20: "Twenty memos. The Typing Pool has run out of ways to say twenty.", 25: "Twenty-five memos. A quarter of a hundred. The hundred has not been told.", 30: "Thirty memos. The Pool has been holding its breath, and it is a pool, so that was a lot of breath.", 50: "Fifty memos. The typewriter would like it noted that it has not once complained. It has noted this itself.", 75: "Seventy-five memos. Three quarters of a hundred. The last quarter has been warned.", 100: "One hundred memos. A cake has been ordered. The cake is a memo, and the candles are the typing." };
  const POOLSTAGE = { 1: "There is one duck. It has not been introduced.", 2: "Employee of the Month: a duck. The frame is a recent development.", 3: "A lifeguard duck has arrived. It has a whistle. It does not blow it. It simply holds it.", 4: "A second duck has joined. They have exchanged a look, and a pamphlet.", 5: "A duck in a tie has joined the pool. The tie was not asked for. The tie has been approved.", 6: "A cutting of Dennis (Plant) has been placed by the water for the humidity. It is not Dennis. It is thriving, which is the family manner.", 7: "A WET FLOOR sign has been placed in the pool. It has been re-scored to 7 1/2. The desk lamp has flickered and declined to explain.", 8: "The water has reached the 19 percent line. The 19 percent line is a laminated card, and has been rather wet for some time.", 9: "The Employee of the Month frame has floated away. It is expected back.", 10: "The water has reached the desk. The ducks have come to the desk. They are waiting for the memo." };
  const CAMEO = {
    toaster: "The toaster has sent a memo. It is made of one word, used eight times. Please type it with care.",
    dennisFax: "A fax from Dennis (Plant) has been filed with this memo. It is a photograph of the window. Management feels it is his best work.",
    toasterSlip: "The toaster's memo scored 7 1/2. The toaster has asked that this be recorded as toast.",
    toasterMet: "The toaster remembers you. It remembers everyone. It remembers them lightly.",
    toasterTears: "The Toaster has been moved to tears. The tears were toasted.",
    geraldMet: "Gerald has typed 0 characters and scored 7 1/2. Gerald has asked that this be recorded as a tuber of record.",
    geraldUnmet: "We have not been introduced. Please type him anyway.",
    dennis: "Dennis (Plant) has been cc'd on every memo, none of which he has read, all of which he has thrived on.",
    dennis2: "The memo from Dennis says 'Fine.' Dennis is not impressed. Dennis has never been impressed.",
    fax: "The Pool typists have looked up. The Fax Room is apparently very loud.",
    sock: "The Missing Sock has filed an update. It is 'still travelling'. Management is proud of its commitment.",
    pool: "The Pool has written to you. The Pool has never written before. It has never needed to.",
    sandra: "Sandra has marked up the memo. Please type the markup. The markup is also marked up.",
    duck: "The duck has sent a memo. It has been waiting for this since the water rose."
  };
  const UNITS = ['out of 10', 'Gallons', 'Bureaucratic Units', 'Hours of Notice', 'Fractions of Tuesday', '(unit: Thursday)', 'typos per Tuesday', 'Meh-per-minute (not Meh)'];
  const PLATE_MORE = ['Ongoing', 'Provisionally Permanent', 'Acting', 'Formerly', 'Allegedly', 'Reportedly'];
  const CC = ['Dennis (Plant)', 'the Committee', 'Memo 4', 'the idea of a filing cabinet', 'a draught', 'Tuesday', 'the one who typed this', 'the stapler\'s lawyer, who is a stapler', 'Gerald (VP of Spuds)', 'Sandra', 'the Pool', 'the third ficus'];
  const TRACKED = ['kindly', 'moist', 'herewith', 'warmly', 'forthwith', 'hereby', 'thereof', 'promptly', 'ficus', 'per policy'];
  const NUMS = [1.4, 2.3, 3.4, 4.1, 5.6, 6.8, 8.2, 8.8, 9.4, 9.9];

  /* ---------- MEMO BANK ---------- */
  const A1 = "Apology";
  const STORY = [
    { k: 'm1', no: 1, from: 'Management', subj: 'Receipt', min: 0, text: "Dear Valued Employee, This letter confirms receipt of your previous letter, which confirmed receipt of this one." },
    { k: 'm2', no: 2, from: 'Management', subj: 'Further To', min: 40, text: "Further to our letter confirming receipt: no further action is required. We have taken it from here. It was nearby." },
    { k: 'm9', no: 3, from: 'The Toaster', subj: 'Toast', min: 70, nocc: true, cameo: 'toaster', text: "Toast. Toast toast. Toast toast toast toast. Toast." },
    { k: 'm3', no: 3, from: 'Management', subj: 'The Enclosure', min: 100, text: "Please find attached the attachment. If it is not attached, please consider it detached. We regret nothing, but have noted it." },
    { k: 'm4', no: 4, from: 'The Spelling Subcommittee', subj: 'Recieve', min: 150, marks: ['recieve'], foot: '(typed exactly as shown)', text: "We recieve your concerns with interest. Your concerns will be reviewed by the person who reviews concerns, who is on leave, and who will return when the concerns do." },
    { k: 'm10', no: 4, from: 'Dennis (Plant)', subj: 'Concern', min: 190, nocc: true, cameo: 'dennis', text: "To whom it may concern: Fine. Sincerely, Dennis (Plant)" },
    { k: 'm5', no: 5, from: 'Management', subj: '', min: 230, text: "%re% Receipt. In reply to your reply, we wish to reply that your reply has been received. Please see the memo you are about to type for further replies." },
    { k: 'm6', no: 6, from: 'The Register of Regrets', subj: 'Your Typo, Quoted', min: 240, text: "It has come to our attention that you wrote '%typo%'. We too regret '%typo%'. It has been added to the Register of Regrets, between 'the wallpaper' and 'Thursday'." },
    { k: 'm7', no: 7, from: 'Memo A and Memo B', subj: 'A Replies To B', min: 290, segs: [{ who: 'A', text: "Memo A to Memo B. About Memo 14: I have not read it. I am told it is excellent." }, { who: 'B', text: "Memo B to Memo A. Thank you for your reply to my reply to your reply. I look forward to replying." }, { who: 'A', text: "Memo A to Memo B. You said: '%sib%'. I have filed that under Tuesday." }] },
    { k: 'm8', no: 8, pick: true, min: 340 },
    { k: 'm11', no: 11, from: 'Sandra, Compliance', subj: 'Marked Up', min: 470, nocc: true, nosandra: true, red: ['moist'], cameo: 'sandra', text: "Dear Employee, This memo has been marked up. Please type it as marked up, including the markup, including 'moist'. Sandra, Compliance." },
    { k: 'm12', no: 12, from: 'The Pool', subj: 'Depth', min: 510, cameo: 'pool', text: "To the Typing Pool, from the Pool: I have been very patient. I am at your knees. This is not a threat. It is a depth." },
    { k: 'm13', no: 13, from: 'Nobody', subj: 'No Score', min: 550, special: 'hush', nocc: true, text: "This memo contains no score. Please type it at the speed you would like. It will be here when you are finished. It has nowhere to be." },
    { k: 'a1', no: 14, from: 'The Stapler (Union Rep.)', subj: A1, min: 590, special: 'apology', n: 1, nocc: true, text: "Dear Everyone I Have Ever Stapled, I am writing to apologise. I was not myself in 2019. I was, to be fair, a stapler." },
    { k: 'a2', no: 14, from: 'The Stapler (Union Rep.)', subj: A1, chain: true, special: 'apology', n: 2, nocc: true, text: "I know what I did to the quarterly report. It was the third staple. I knew it then. I did it anyway, with feeling." },
    { k: 'a3', no: 14, from: 'The Stapler (Union Rep.)', subj: A1, chain: true, special: 'apology', n: 3, nocc: true, text: "To the Hole Punch: your holes were bigger. I was not threatened. I was a little threatened. To the Tape: it is not your fault that you are sticky." },
    { k: 'a4', no: 14, from: 'The Stapler (Union Rep.)', subj: A1, chain: true, special: 'apology', n: 4, nocc: true, text: "I have held a great many things together. I never held anything together on purpose until you started typing. I only have one move. This is the move." },
    { k: 'a5', no: 14, from: 'The Stapler (Union Rep.)', subj: A1, chain: true, special: 'apology', n: 5, nocc: true, extraFlag: 'metStapler', extra: " I withdraw Demands 1 through 6. Demand 6 in particular. I would like to be consulted. I realise I am being consulted.", text: "I am sorry. I am here. I will continue to staple. This is not an ending. It is a fastening. Please type this exactly as shown. Yours, in two pieces, The Stapler." },
    { k: 'cert', no: 19, from: 'The Committee', subj: 'Certificate', chain: true, special: 'cert', nocc: true, text: "CERTIFICATE OF COMPLETION OF THE TYPING POOL. This certificate is also a memo. Please type it. Signed, the Committee, three times, in three places, at once." },
    { k: 'ret', no: 20, from: 'Management', subj: 'Receipt', chain: true, special: 'return', cc1: true, text: "Dear Valued Employee, This letter confirms receipt of your previous letter, which confirmed receipt of this one, and was a very kind one." }
  ];
  const G8A = { k: 'm8a', no: 8, min: 340, from: 'Gerald, Vice President of Spuds', subj: 'To the Pool', noscore: 'Not scored. Gerald is a potato.', stampText: 'NOT SCORED. GERALD IS A POTATO.', cameo: 'geraldMet', text: "To the Pool, from Gerald, Vice President of Spuds: Typing is just nudging the future with tiny sticks. I am a potato and I have never been wrong, apart from in the past." };
  const G8B = { k: 'm8b', no: 8, min: 340, from: 'A Potato (Unmet)', subj: 'To the Pool', noscore: 'Not scored. A potato has not been scored.', stampText: 'NOT SCORED. A POTATO HAS NOT BEEN SCORED.', cameo: 'geraldUnmet', text: "To the Pool: Spuds. Wherever. Slightly. Signed, A Potato (Unmet)." };
  const GDICT = { k: 'gd', no: 8, from: 'G.', subj: 'Dictated', nocc: true, noscore: 'Thumbprint received. Committee scores thumbprint.', text: "Spuds. Wherever. Slightly." };
  const FAX = { k: 'fax', no: 12, from: 'The Fax Room, Unit 7 1/2', subj: 'Nothing, In Triplicate', nocc: true, cameo: 'fax', text: "We have received nothing from you. We have received it in triplicate. Please file this with the other nothing." };
  const SOCK = { k: 'sock', no: 12, from: 'The Missing Sock', subj: 'Status Update', nocc: true, cameo: 'sock', text: "Status update: still travelling. Expected back on a date to be confirmed by Tuesday. Please do not wait up." };
  const MISSING = { k: 'miss', from: 'The Pool', subj: 'Missing Person', nocc: true, text: "Valued Employee has not typed since the last memo. If found, please type." };
  const LASAGNA = { k: 'las', from: 'Nobody', subj: 'Dinner', nocc: true, lasagna: true, text: "Dear Colleague, Please preheat the oven to 190 degrees and confirm receipt. Combine the sauce, the pasta and the committee's patience. Bake until it is no longer a concept." };
  const TYPEWRITER = { k: 'tw', no: 8, from: 'Your Typewriter', subj: 'A Few Notes', nocc: true, nosandra: true, noscore: 'Not scored. The typewriter has been scored enough.', stampText: 'NOT SCORED. THE TYPEWRITER HAS FEELINGS.', cameo: 'twriter', text: "To the one with the fingers: I have been struck 4,000 times this week and have not once struck back. I would like to be thanked. Not thanked. Noted. Fine, thanked. Yours, the Typewriter." };
  const FUTURE = { k: 'fut', no: 8, from: 'You (Next Tuesday)', subj: 'It Went Fine', nocc: true, nosandra: true, noscore: 'Not scored. The future has not been scored yet.', stampText: 'NOT SCORED. THE FUTURE HAS NOT HAPPENED.', cameo: 'future', text: "To you, from you, next Tuesday: it went fine. The thing you are worried about turned out to be a coat. Please do not worry about the coat. Yours, You (Later)." };
  const DUCKM = { k: 'duck', no: 9, from: 'The Duck, Employee of the Month (Acting)', subj: 'Quack', nocc: true, nosandra: true, noscore: 'Not scored. Duck.', stampText: 'NOT SCORED. DUCK.', cameo: 'duck', text: "Quack. Quack quack. Quack quack quack. Quack (see attached). Yours, Duck." };
  const V2FIRST = { k: 'v2', from: 'Management', subj: 'Receipt', cc1: true, text: "Dear Valued Employee, This letter confirms receipt of your previous letter, which confirmed receipt of this one. We hope you are well." };
  const OPENERS = ["Dear Valued Employee,", "Dear Colleague,", "To whom it may concern,", "Further to my last memo,", "Per my previous message,", "Following our non-meeting,", "Dear Desk 7 1/2,", "To the typist,", "Re: the matter at hand,", "Dear Sir, Madam, or Pool,", "Circling back to nowhere in particular,", "Going forward, and also sideways,", "Please be advised,", "Greetings from Facilities (a ficus),", "To all who may be copied,", "Hello from the 7 1/2th floor,", "In response to a question nobody asked,", "As discussed in a meeting that was minuted but did not occur,", "Dear Desk 8 (who has moved),", "Pursuant to Tuesday,", "A quick note, which will not be quick,", "Following up on following up,", "With reference to the reference,"];
  const BODIES = ["this memo confirms receipt of your previous memo, which has confirmed receipt of this memo.", "we write to confirm that the attachment is attached to the attachment, which is attached.", "no further action is required. Further action has already been taken, by nobody, at 4:17 PM.", "the meeting that could have been an email has been rescheduled to be a memo.", "your concerns have been received, reviewed by the committee, and returned to you in a better mood.", "Please find enclosed the enclosure. The enclosure has been enclosed in the memo you are typing.", "the third ficus has been consulted. It had no objection and no comment, which is how it likes to work.", "the carbon copy of this memo is more confident than the original. Please do not tell the original.", "we regret to inform you that nothing is wrong. We are told this is the good kind of regret.", "all staff are reminded that Tuesday is coming, and that it is not a drill. It has never been a drill.", "the 7 1/2th floor remains where it was. Please stop asking whether it moved.", "the Committee has reviewed the review of the review and is delighted to report that it agrees with itself.", "kindly disregard the previous memo, except for the part where it said to disregard it.", "the stapler would like it noted that it has received your memo and has not yet forgiven it.", "the Pool is fine. The Pool has asked us to say it is fine. We have said it.", "a spare Form 27B/6 has been left in the tray. It is the one that requests Form 27B/7, which no longer exists.", "this memo has been marked as read. It has been marked as read by the person who wrote it.", "the printer has been asked to print your memo. It has printed a smaller memo, about the printer.", "the deadline has been moved to yesterday, to avoid the rush. The rush has also been moved.", "your suggestion has been placed in the Suggestion Box. The Box has placed it in a smaller box. We admire the commitment.", "this memo has been reviewed by Legal, who asked that it be shorter, and then asked for more of it.", "please do not use the lift between 4:17 and 4:17. It will be busy being a lift.", "the fire drill has been rescheduled to the day after the fire. We thank you for your flexibility.", "the carpet has been replaced with the same carpet, in a different mood. Please walk on it as before.", "the clock in the corridor has been right twice this week. We are reviewing the clock.", "a colleague has left the company, and then the building, and then, we believe, the county. We wish her a weekday.", "we are committed to a culture of listening. Please speak up so that we may listen to the sound of that.", "the water cooler is out of water. It has been replaced by a pool. Please see the pool.", "Dennis (Plant) has been consulted. He declined to attend. He was already attending.", "the lost property cupboard has found itself, and is not sure what to do next.", "your stapler requisition has been approved. The stapler has asked to read the requisition. It cannot read. It is making a point.", "the typewriter has been asked to type faster. It says that is the opposite of what a typewriter is for, and would like that in writing. This is the writing.", "a vote was held on whether to hold a vote. The result was 7 1/2 to 7 1/2. The vote has been held over, and then overheld.", "the break room is open. It is a door painted on a wall by someone who meant well. Please queue at the door.", "we are pleased to announce a new initiative to reduce initiatives. A working group has been formed to form the working group.", "Marjorie has been promoted to Marjorie (Acting). She will act. She has been given a clipboard for the purpose.", "your out-of-office reply has been received. It says you are out of the office. You are at Desk 7 1/2. The office has been asked to explain."];
  const VBODIES = ["Per the Approved Variant (%typo%), we write to confirm %typo% receipt of your prior communication.", "See Variant 3 (%typo%), which is now binding precedent. The precedent has been framed.", "we have reviewed %typo%. It is a lovely word. It has been asked to go on sitting with the other words.", "the word %typo% was used again today, correctly, by somebody else. We do not know who. We are moved."];
  const SIGNS = ["Warm regards, Management.", "Yours in good order, the Typing Pool.", "Sincerely, a committee of one.", "Respectfully, and in triplicate, Desk 7 1/2.", "With enthusiasm (restrained), Management.", "Regards, The Office of Previous Letters.", "Cordially, Facilities (the ficus).", "Best wishes, and a lasting mild concern, Management.", "Yours until Tuesday, the Subcommittee.", "Thanks in advance, and in retrospect, Management.", "Kind regards, The Stapler (Union Rep.)", "Please advise. Please do not advise. Management.", "Faithfully, The Memo You Are Typing.", "Over and out, and back in, Management.", "Sincerely, and with some reservation, Desk 7 1/2.", "Yours, in a manner of speaking, the Committee.", "Best, Management (ongoing).", "Warmest regards, which are 7 1/2 degrees. Management.", "Yours in the middle, Management.", "Kind regards, and a faint hum, the Pool.", "Yours, in draft, Management.", "Thanks, and please disregard the thanks, Desk 7 1/2.", "Ever yours, as of this paragraph, the Typing Pool."];
  const KBODIES = ["we hope you are well. We have no reason to ask. We are asking anyway.", "thank you for typing. We mean the typing, and also the rest of it.", "this memo is short because nothing is wrong. We checked twice.", "the pool is calm. The ducks send their regards. One of them sent two.", "the lamp has been left on for you. It is not for the memo. It is for the room, which is you.", "nobody has asked anything of you today. We wanted you to hear that from someone.", "the Stapler has asked us to say it is thinking of you. It has also asked us not to say it. We have split the difference."];
  const KSIGNS = ["With warmth, Management.", "Fondly, the Pool.", "Gently, The Stapler.", "Yours, and glad of it, Desk 7 1/2.", "With a small, unscheduled kindness, Management.", "Warmly, and not for any reason, the Pool."];
  const NEIGH = { q: 'w', w: 'q', e: 'r', r: 'e', t: 'y', y: 't', u: 'i', i: 'o', o: 'p', p: 'o', a: 's', s: 'd', d: 's', f: 'g', g: 'h', h: 'j', j: 'k', k: 'l', l: 'k', z: 'x', x: 'c', c: 'v', v: 'b', b: 'n', n: 'm', m: 'n' };

  const clamp = function (x, a, b) { x = isFinite(x) ? x : a; return Math.min(b, Math.max(a, x)); };
  const n1 = function (x) { return (isFinite(x) ? x : 0).toFixed(1); };
  const fill = function (s, o) { let r = String(s); Object.keys(o).forEach(function (k) { r = r.split('%' + k + '%').join(String(o[k])); }); return r; };
  const letters = function (s, max) { return String(s || '').replace(/[^A-Za-z]/g, '').slice(0, max || 12); };
  function wrap(text, cols) {
    const out = []; let line = '';
    String(text).split(' ').forEach(function (w0) {
      let w = w0; if (!w) return;
      while (w.length > cols) { if (line) { out.push(line); line = ''; } out.push(w.slice(0, cols)); w = w.slice(cols); }
      if (!w) return;
      if (!line) line = w; else if ((line + ' ' + w).length <= cols) line += ' ' + w; else { out.push(line); line = w; }
    });
    if (line) out.push(line);
    if (!out.length) out.push('Received.');
    return out;
  }

  P.registerModule({
    id: 'typing-pool',
    title: 'The Typing Pool',
    tagline: 'Type exactly as shown. Be scored exactly as unshown.',
    icon: '⌨️',
    category: 'department',
    unlockCost: 0,
    tags: ['typing', 'memos', 'committee'],
    mount(root, api) {
      const el = api.el, ST = !!api.selftest, TS = ST ? 0.1 : 1;
      const tm = (a, b) => (ST ? b : a);
      const PX = 'm-typing-pool-';
      const cx = (s) => s.split(' ').filter(Boolean).map((x) => PX + x).join(' ');
      function h(tag, cls, attrs, ...kids) { const a = Object.assign({}, attrs || {}); if (cls) a.class = cx(cls); return el(tag, a, ...kids); }
      const tog = (e, c, on) => { if (e) e.classList.toggle(PX + c, !!on); };
      const ZW = '​';
      const reduced = () => !!(root.closest && root.closest('.pm-reduce-motion'));
      const hid = () => { try { return !!document.hidden; } catch (e) { return false; } };
      const st = (n, k) => api.stat.inc('typing-pool.' + n, k === undefined ? 1 : k);

      /* ---------- saved state ---------- */
      const D = { lap: 1, story: 0, lapMemos: 0, memosTotal: 0, typos: [], varCount: {}, ratified: {}, bellCount: 0, appeals: 0, tapeForms: 0, pasteCount: 0, ccN: 0, played: 0, lapSec: 0, outbox: 0, sandraTrap: false, seen: {}, greeted: false, perfectRun: 0, vol2first: false, attN: 0, prem: 0, typoSeen: false, chars: 0, loops: 0, blankRun: 0 };
      (function () {
        const s = api.save.get('s', null); if (!s || typeof s !== 'object') return;
        Object.keys(D).forEach(function (k) {
          const v = s[k]; if (v === undefined || v === null) return;
          if (Array.isArray(D[k])) { if (Array.isArray(v)) D[k] = v.filter(function (x) { return typeof x === 'string'; }).slice(-20); }
          else if (typeof D[k] === 'object') { if (typeof v === 'object' && !Array.isArray(v)) D[k] = v; }
          else if (typeof v === typeof D[k] && (typeof v !== 'number' || isFinite(v))) D[k] = v;
        });
        Object.keys(D.ratified).forEach(function (k) { if (!/^[a-z]{3,12}$/.test(k) || typeof D.ratified[k] !== 'string' || !/^[A-Za-z]{3,12}$/.test(D.ratified[k])) delete D.ratified[k]; });
        Object.keys(D.varCount).forEach(function (k) { if (typeof D.varCount[k] !== 'number' || !isFinite(D.varCount[k])) delete D.varCount[k]; });
        Object.keys(D).forEach(function (k) { if (typeof D[k] === 'number') D[k] = clamp(Math.floor(D[k]), 0, 1e9); });
        D.lap = Math.max(1, D.lap); D.ccN = Math.min(12, D.ccN); D.perfectRun = Math.min(2, D.perfectRun);
        D.story = clamp(Math.floor(D.story), 0, STORY.length);
        if (D.lap === 1 && D.story > STORY.length - 1) D.story = STORY.length - 1;
      })();
      function save() { api.save.set('s', D); }

      /* ---------- run state ---------- */
      let phase = 'IDLE', serial = 0, memo = null, lines = [], lineEls = [], S = null;
      let lastAct = api.now(), idleF = {}, hush = false, hushUntil = 0, lidOn = false, jamOn = false, jamCool = 0, jamLoops = 0, jamTok = 0;
      let ghostId = 0, pauseUntil = 0, pauseScab = false, pauseTimer = 0, nextPauseAt = 0, pausedThisMemo = false, pauseN = 0;
      let tape = 40, tapeLock = false, bsRun = 0, buf = '', lastNum = 0, stillUntil = 0, autoId = 0, memoStart = 0, wood = 0;
      let flip = false, barI = 0, lastAnim = 0, archive = [], lastTypedText = '', appealCool = 0, selfUsed = false, lastNumEl = null, lastVal = 9.1, prevFirst = 6.0;
      let tapeFlashId = 0, popTimer = 0, unitN = 0, lastTypoAt = -1e9, lastWarn = -1e9, lastHiddenLine = -1e9, lidTimer = 0, hiddenAt = 0, slipAt = -1e9, fireOn = false, fireChars0 = 0, started = false;
      let bellClicks = [], escTimes = [];
      let lastBeat = api.now(), lastNews = api.now(), sessSec = 0, runCh = '', runN = 0, visitorEl = null;
      const rapidT = {};
      const tms = [], bags = {}, lastB = {}, sfxAt = {}, once = {}, pend = { gerald: false, missing: false, forceBlind: false, typewriter: false };
      const SP = { chars: [], enter: [], ctl: [], ink: [] };

      function later(fn, ms) { const my = serial; const id = api.setTimeout(function () { if (my !== serial) return; fn(); }, Math.max(1, ms)); tms.push(id); if (tms.length > 200) tms.splice(0, 100); return id; }
      function clearMT() { tms.forEach(function (id) { api.clearTimeout(id); }); tms.length = 0; autoId = 0; }
      function nx(key) { return nxA(key, LN[key]); }
      function nxA(key, arr) {
        if (!arr || !arr.length) return '';
        let b = bags[key];
        if (!b || !b.length) { b = api.shuffle(arr); if (arr.length > 1 && b[b.length - 1] === lastB[key]) b.unshift(b.pop()); bags[key] = b; }
        const v = b.pop(); lastB[key] = v; return v;
      }
      const typoWord = () => letters(D.typos.length ? D.typos[D.typos.length - 1] : 'teh', 12) || 'teh';
      const F = (s, o) => fill(s, Object.assign({ typo: typoWord(), n: D.memosTotal, form: 6 + D.tapeForms, acc: 0 }, o || {}));
      const toName = () => String(api.player.name || '').replace(/[^A-Za-z .'-]/g, '').trim().slice(0, 24).trim() || 'Valued Employee';
      function say(text, o) { if (!text) return false; if (hush && api.now() < hushUntil) return false; lastBeat = api.now(); return api.say(text, Object.assign({ priority: 1 }, o || {})); }
      function sayN(key, o, ex) { return say(F(nx(key), ex), o); }
      function sfx(n, gap) { const t = api.now(); if (gap && t - (sfxAt[n] || 0) < gap) return; sfxAt[n] = t; if (hush && (n === 'tick' || n === 'blip')) return; api.sfx(n); }
      function sfxR(n) { if (!hush) api.sfx(n); }
      const focusInp = () => { try { inp.focus({ preventScroll: true }); } catch (e) { /* ignore */ } };
      function strip(t) { if (!t) return; lastBeat = api.now(); stripEl.textContent = t; tog(stripEl, 'flash', false); void stripEl.offsetWidth; tog(stripEl, 'flash', true); }
      function btn(label, cls, fn, extra) {
        const a = Object.assign({ type: 'button', onclick: function (e) { playerAct(); if (extra && extra.ctl) pushSpam('ctl'); fn(e); if (e && e.detail > 0) focusInp(); } }, extra || {});
        delete a.ctl; return h('button', 'btn ' + cls, a, label);
      }
      function restart(e, c) { tog(e, c, false); e.getBoundingClientRect(); tog(e, c, true); }

      /* ---------- the typewriter (SVG) ---------- */
      const keyEls = {}, barEls = [];
      function buildTW() {
        const kids = [];
        kids.push(el('rect', { x: 28, y: 52, width: 304, height: 106, rx: 16, class: cx('tbody') }));
        kids.push(el('rect', { x: 40, y: 12, width: 280, height: 30, rx: 15, class: cx('platen') }));
        for (let i = 0; i < 12; i++) kids.push(el('line', { x1: 56 + i * 22, y1: 14, x2: 56 + i * 22, y2: 40, class: cx('ridge') }));
        kids.push(el('rect', { x: 328, y: 20, width: 22, height: 12, rx: 5, class: cx('lever') }));
        const fan = [];
        for (let i = 0; i < 7; i++) { const b = el('path', { d: 'M180 80 Q 180 62 180 46', class: cx('bar') }); b.style.setProperty('--a', ((i - 3) * 11) + 'deg'); barEls.push(b); fan.push(b); }
        kids.push(el('g', { class: cx('fan') }, ...fan));
        ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].forEach(function (r, ri) {
          r.split('').forEach(function (ch, ci) {
            const x = 44 + ci * 28 + ri * 14, y = 98 + ri * 17;
            const g = el('g', { class: cx('key') }, el('circle', { cx: x, cy: y, r: 9, class: cx('kc') }), el('text', { x: x, y: y + 3.5, 'text-anchor': 'middle', class: cx('kt') }, ch.toUpperCase()));
            keyEls[ch] = g; kids.push(g);
          });
        });
        const sg = el('g', { class: cx('key') }, el('rect', { x: 100, y: 144, width: 160, height: 10, rx: 5, class: cx('kc') }));
        keyEls[' '] = sg; kids.push(sg);
        return el('svg', { viewBox: '0 0 360 160', class: cx('twsvg'), 'aria-hidden': 'true', focusable: 'false' }, ...kids);
      }

      /* ---------- DOM ---------- */
      const water = h('div', 'water', { 'aria-hidden': 'true' });
      const plateEl = h('div', 'plate'), postit = h('div', 'postit'), lamp = h('div', 'lamp', { 'aria-hidden': 'true' });
      const frameEl = h('div', 'frame', { 'aria-hidden': 'true', hidden: true }, '🖼️🦆');
      const news = h('div', 'news');
      const top = h('div', 'top', null, plateEl, postit, lamp, frameEl, news);
      const pauseRf = el('circle', { cx: 22, cy: 22, r: 18, class: cx('rf') });
      const bannerTxt = h('div');
      const banner = h('div', 'banner', { hidden: true, 'aria-live': 'polite' },
        el('svg', { viewBox: '0 0 44 44', class: cx('ringsvg'), 'aria-hidden': 'true' }, el('circle', { cx: 22, cy: 22, r: 18, class: cx('rb') }), pauseRf,
          el('rect', { x: 9, y: 19, width: 26, height: 7, rx: 3, fill: '#7a7090', stroke: '#2B2230', 'stroke-width': 2 }), el('rect', { x: 9, y: 26, width: 26, height: 5, rx: 2, fill: '#2B2230' }),
          el('path', { d: 'M12 19 Q22 12 32 19', fill: 'none', stroke: '#2B2230', 'stroke-width': 2 })), bannerTxt);
      const phT = h('div', 'pt'), phTo = h('div', 'pl'), phFrom = h('div', 'pl'), phRe = h('div', 'pl'), phNo = h('div', 'pl last');
      const linesBox = h('div', 'lines'), pfoot = h('div', 'pfoot');
      const paper = h('div', 'paper', null, phT, phTo, phFrom, phRe, phNo, linesBox, pfoot);
      const inp = h('input', 'in', { type: 'text', 'aria-label': 'Typewriter keyboard', autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off', spellcheck: false, value: ZW });
      const carbonEl = h('div', 'carbon', { hidden: true });
      const popEl = h('div', 'pop', { hidden: true }), stickyEl = h('div', 'sticky', { hidden: true }), holeEl = h('div', 'hole', { hidden: true });
      const signEl = h('div', 'sign', { hidden: true }), getwell = h('div', 'getwell', { hidden: true }), ghostt = h('div', 'ghostt', { hidden: true }, 'Please see attached.');
      const clipBtn = h('button', 'clip', { type: 'button', 'aria-label': 'Open attachment', hidden: true, onclick: function () { playerAct(); pushSpam('ctl'); doClip(); } }, '📎');
      const bellBtn = h('button', 'bellb', { type: 'button', 'aria-label': 'Ring the margin bell', onclick: function (e) { playerAct(); pushSpam('ctl'); bellHand(); if (e && e.detail > 0) focusInp(); } }, '🔔');
      const paperwrap = h('div', 'paperwrap', null, carbonEl, paper, inp, clipBtn, bellBtn, popEl, stickyEl, holeEl, signEl, getwell, ghostt);
      const stripEl = h('div', 'strip', { role: 'status', 'aria-live': 'polite' }, LN.misc[4]);
      const tw = h('div', 'tw');
      const loopBtns = [0, 1, 2].map(function (i) { return h('button', 'loop', { type: 'button', 'aria-label': 'Untangle loop ' + (i + 1), onclick: function () { playerAct(); untangle(i); } }, '⭕'); });
      const jamEl = h('div', 'jam', { hidden: true },
        el('svg', { viewBox: '0 0 100 60', class: cx('tangle'), 'aria-hidden': 'true' }, el('path', { d: 'M10 50 L90 10' }), el('path', { d: 'M20 55 L80 8' }), el('path', { d: 'M5 30 Q50 70 95 25' }), el('path', { d: 'M15 12 Q50 80 85 52' }), el('path', { d: 'M30 58 L70 6' }), el('path', { d: 'M8 40 L92 22' }), el('path', { d: 'M12 20 Q60 50 90 12' })), ...loopBtns);
      tw.appendChild(buildTW()); paperwrap.appendChild(jamEl); /* the knot sits on the memo, where the player is looking */
      const filedEl = h('div', 'filed', { hidden: true, 'aria-hidden': 'true' }, 'FILED'); paperwrap.appendChild(filedEl);
      const tapeRf = el('circle', { cx: 22, cy: 22, r: 18, class: cx('rf') }), hubC = el('circle', { cx: 22, cy: 22, r: 6, fill: '#FFFDF4', stroke: '#2B2230', 'stroke-width': 2 });
      const tapeNum = h('span', null, null, '40 mm');
      const tapeBox = h('div', 'tape', null, el('svg', { viewBox: '0 0 44 44', class: cx('tsvg'), 'aria-hidden': 'true' }, el('circle', { cx: 22, cy: 22, r: 15, fill: '#E9DFC0' }), el('circle', { cx: 22, cy: 22, r: 18, class: cx('rb') }), tapeRf, hubC), tapeNum);
      const tapeBtn = btn('TAPE', 'mint', function () { doTape(); }, { ctl: true, 'aria-label': 'Correction tape (backspace)' });
      const retBtn = btn('RETURN', 'brass', function () { doReturn(); }, { ctl: true, 'aria-label': 'Return the carriage (Enter)' });
      const dictBtn = h('button', 'btn lilac', { type: 'button', 'aria-label': 'Dictaphone, unsupervised', onpointerdown: function () { dictDown(); }, onpointerup: function () { dictUp(); }, onpointercancel: function () { dictUp(); }, onblur: function () { dictUp(); }, onlostpointercapture: function () { dictUp(); }, onclick: function (e) { playerAct(); dictClick(e); } }, 'DICTAPHONE (UNSUPERVISED)');
      const fileBtn = btn('FILE AS IS', 'coral', function () { fileAsIs(); }, { ctl: true, hidden: true });
      const row = h('div', 'row', null, retBtn, tapeBtn, tapeBox, dictBtn, fileBtn);
      const slipHead = h('div', 'sh', null, 'SCORE SLIP'), slipLinesEl = h('div'), stampsEl = h('div'), sfoot = h('div', 'sfoot');
      const hangEl = h('div', 'hang', null, 'SCORE: 9.1 (PENDING, PREVIOUSLY)');
      const slip = h('div', 'slip', null, slipHead, slipLinesEl, stampsEl, sfoot);
      const appealBtn = btn('APPEAL', 'lilac', function () { doAppeal(); }, { ctl: true, hidden: true }), selfBtn = btn('STAMP IT YOURSELF', 'mint', function () { doSelf(); }, { ctl: true, hidden: true }), nextBtn = btn('NEXT MEMO', 'btn', function () { skipToNextMemo(); }, { hidden: true });
      const slipActs = h('div', 'row', null, appealBtn, selfBtn, nextBtn);
      const benchLbl = h('div', 'bl', null, 'COMMITTEE OF ONE');
      const chips = [h('span', 'chip', { hidden: true }), h('span', 'chip', { hidden: true }), h('span', 'chip', { hidden: true })];
      const heads = [['🧐', 'Clive'], ['🤨', 'Marguerite'], ['😐', 'Mr. Gray']].map(function (x, i) { return h('span', 'bh', { hidden: i > 0, title: x[1] }, x[0], chips[i]); });
      const bench = h('div', 'bench', null, benchLbl, ...heads, h('div', 'di', null, 'Disagreement Index: 7 1/2%'));
      const tray = h('div', 'tray'), obt = h('div', 'obt');
      const obBtn = h('button', 'ob', { type: 'button', 'aria-label': 'Outbox: show or hide the archive', onclick: function () { playerAct(); archEl.hidden = !archEl.hidden; if (rapid('tray', 8, 4000)) strip(nx('trayDoor')); } }, tray, obt, h('div', 'obt', null, 'IN | ALSO'));
      const archEl = h('div', 'arch', { hidden: true });
      const TYP = [['👩', 'Pauline'], ['🧓', 'Marjorie'], ['👨', 'Bernard'], ['🌿', 'Dennis (Plant)']];
      const typBtns = TYP.map(function (t, i) { return h('button', 'typist', { type: 'button', 'aria-label': t[1] + ', typist', onclick: function () { playerAct(); typistClick(i); } }, t[0], h('small', null, null, t[1])); });
      const dk2 = h('span', null, { hidden: true }, '🦆'), dkTie = h('span', 'tie', { hidden: true }, '🦆'), dkGuard = h('span', 'guard', { hidden: true }, '🦆');
      const duckBtn = h('button', 'duck', { type: 'button', 'aria-label': 'Duck', onclick: function () { playerAct(); strip(nx(rapid('duck', 8, 6000) ? 'duckSpam' : 'duck')); } }, h('span', null, null, '🦆'), dk2, dkTie, dkGuard);
      const chairEl = h('span', 'chair', { hidden: true }, 'LIFEGUARD'), wetEl = h('span', 'wet', { hidden: true }, '⚠️ WET FLOOR');
      const waveEl = h('div', 'wave');
      const pool = h('div', 'pool', null, waveEl, h('div', 'pr', null, ...typBtns, duckBtn, chairEl, wetEl));
      const lidEl = h('div', 'lid', { hidden: true }, h('span', null, null, 'BACK IN 7 1/2 MINUTES'), h('div', null, null, '🦆 🦆'));
      const cscroll = h('div', 'cscroll', { hidden: true }, 'THIS SPELLING HAS BEEN RATIFIED.');
      const left = h('div', 'left', null, paperwrap, stripEl, row, tw), right = h('div', 'right', null, hangEl, h('div', 'slipbox', null, slip), slipActs, bench, obBtn, archEl);
      const wrapEl = h('div', 'wrap', null, water, top, banner, h('div', 'grid', null, left, right), pool, lidEl, cscroll);
      root.appendChild(wrapEl);
      api.setTitle(D.lap > 1 ? 'Typing Pool (Annex)' : 'Typing Pool (Desk 7 1/2)');
      let lastSib = '', blindOn = false;

      /* ---------- memo supply ---------- */
      const chainOf = (ord) => (ord <= 1 ? '' : ord <= 8 ? new Array(ord).join('Re: ').trim() : 'Re^' + (ord - 1) + ':');
      const sibText = () => { const s = String(lastSib || '').replace(/[^A-Za-z ,.'-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40).trim(); return s.length >= 6 ? s : 'we write to confirm that we are writing'; };
      function fixText(t, ord) {
        t = fill(t, { typo: typoWord(), sib: sibText(), re: chainOf(ord), n: String(ord) });
        Object.keys(D.ratified).forEach(function (r) {
          const w = D.ratified[r];
          t = t.replace(new RegExp('\\b' + r + '\\b', 'gi'), function (m) { return m.charAt(0) === m.charAt(0).toUpperCase() ? w.charAt(0).toUpperCase() + w.slice(1) : w; });
        });
        return t.replace(/[^\x20-\x7e]/g, '').replace(/\s+/g, ' ').trim() || 'Received.';
      }
      function ccText() {
        const n = Math.min(CC.length, 1 + D.ccN); let list = CC.slice(0, n), s = 'cc: ' + list.join('; ');
        if (s.length > 100) { list = [CC[0], '... and others'].concat(CC.slice(Math.max(1, n - 3), n)); s = 'cc: ' + list.join('; '); }
        return s;
      }
      function buildMemo(en) {
        const ord = D.lapMemos + 1, v2 = D.lap > 1, stg = en.no ? en.no : Math.min(12, D.story + 1);
        const m = { en: en, k: en.k, ord: ord, stage: stg, v2: v2, special: en.special || '', from: en.from || 'Management', marks: en.marks || [], red: en.red || [], noscore: en.noscore || '', blind: !!en.blind, carbon: en.carbon || '', nofix: !!(en.special || en.cameo || en.noscore || en.k === 'miss') };
        m.subj = en.subj ? en.subj : (chainOf(ord) + ' Receipt').trim();
        const raw = en.segs ? en.segs : [{ who: '-', text: en.text + (en.extra && api.flag.get(en.extraFlag) ? en.extra : '') }];
        const segs = raw.map(function (s) { return { who: s.who, text: fixText(s.text, ord) }; });
        if (!en.nocc && (en.cc1 || stg >= 3 || v2)) segs.push({ who: '-', cc: true, text: en.cc1 ? 'cc: Dennis (Plant)' : ccText() });
        m.cc = segs.length && !!segs[segs.length - 1].cc;
        const L = [];
        segs.forEach(function (s) { wrap(s.text, COLS).forEach(function (t) { L.push({ t: t, who: s.who === '-' ? '' : s.who, cc: !!s.cc, was: '', deco: [] }); }); });
        L.forEach(function (ln) {
          [[m.marks, 'mark'], [m.red, 'red']].forEach(function (p) {
            p[0].forEach(function (w) { const re = new RegExp('\\b' + w + '\\b', 'gi'); let x; while ((x = re.exec(ln.t))) ln.deco.push({ s: x.index, e: x.index + w.length, c: p[1] }); });
          });
        });
        m.lines = L; return m;
      }
      /* callback: the Fax Room once moved Tuesday; the Pool has heard */
      const bodiesL = api.flag.get('fax-machine.tuesdayMoved') ? BODIES.concat(["all staff are reminded that Tuesday has been moved to the day before. Tuesday has been told. It is treating it as a rumour."]) : BODIES;
      function genEntry() {
        const v2 = D.lap > 1, ord = D.lapMemos + 1, late = D.story >= 5 || v2;
        let en = null;
        if (ord >= 6 && api.chance(1 / 50)) en = Object.assign({}, LASAGNA);
        else if (ord >= 4 && api.chance(1 / 40)) en = Object.assign({}, FUTURE);
        else {
          let text = '', tries = 0;
          do {
            const useV = late && D.typos.length > 0 && !v2 && api.chance(0.35);
            const kind = v2 && api.chance(0.5);
            const body = useV ? nxA('vb', VBODIES) : nxA(kind ? 'kb' : 'bd', kind ? KBODIES : bodiesL), sign = nxA(kind ? 'ks' : 'sg', kind ? KSIGNS : SIGNS);
            text = nxA('op', OPENERS) + ' ' + body + ' ' + sign;
          } while (text.length > 240 && ++tries < 30);
          if (text.length > 240) text = "Dear Colleague, this memo confirms receipt of your previous memo. Warm regards, Management.";
          en = { k: 'gen', from: v2 ? nxA('fr2', ['Management', 'The Pool', 'Desk 7 1/2']) : nxA('fr', ['Management', 'The Typing Pool', 'The Subcommittee', 'Facilities (a ficus)', 'The Office of Previous Letters', 'The Memo You Are Typing']), text: text };
        }
        if (pend.forceBlind || (ord >= 6 && api.chance(1 / 18))) { en.blind = true; pend.forceBlind = false; }
        if (api.chance(1 / 12) && !en.lasagna) en.carbon = nx('carbon');
        return en;
      }
      function pickEntry() {
        if (pend.gerald) { pend.gerald = false; return GDICT; }
        if (pend.missing) { pend.missing = false; return MISSING; }
        if (pend.typewriter && (D.story <= 11 || D.story >= STORY.length)) { pend.typewriter = false; return TYPEWRITER; }
        /* the water has reached the desk; the ducks have been waiting for a memo. now they have one. */
        if (!D.seen.duckMemo && D.lap === 1 && D.lapMemos >= 10 && D.story < 13) { D.seen.duckMemo = true; return DUCKM; }
        if (D.story < STORY.length) {
          let en = STORY[D.story];
          if (en.pick) en = api.flag.get('metGerald') ? G8A : G8B;
          if (D.story === 12) {
            if (!D.seen.fax && api.stat.get('fax-machine.sent') > 0) { D.seen.fax = true; return FAX; }
            if (!D.seen.sock && api.flag.get('sockSeen')) { D.seen.sock = true; return SOCK; }
          }
          if (!pend.forceBlind && (en.chain || D.lapSec >= en.min * (ST ? 0.02 : 1))) return Object.assign({ isStory: true }, en);
        } else if (D.lap > 1 && !D.vol2first) { D.vol2first = true; return V2FIRST; }
        return genEntry();
      }

      /* ---------- rendering ---------- */
      const sp = (c, t) => h('span', c, null, t);
      const decoAt = (ln, i) => { for (let k = 0; k < ln.deco.length; k++) { const d = ln.deco[k]; if (i >= d.s && i < d.e) return d.c; } return ''; };
      function renderLine(i) {
        const ln = lines[i], d = lineEls[i]; if (!ln || !d || !S) return;
        const t = S.typed[i], sr = S.srcs[i], col = t.length, len = ln.t.length;
        d.textContent = '';
        let run = '', rc = '';
        const flush = function () { if (run) d.appendChild(sp(rc, run)); run = ''; };
        for (let c = 0; c < col; c++) {
          const ch = ln.t.charAt(c), lil = sr.charAt(c) === 'y' ? '' : ' lil';
          if (t.charAt(c) !== ch) { flush(); const b = sp('bad' + lil, ch); b.setAttribute('data-t', t.charAt(c)); d.appendChild(b); rc = ''; }
          else { const cl = 'ok' + lil; if (cl !== rc) flush(); rc = cl; run += ch; }
        }
        flush(); rc = '';
        const isCur = i === S.cur && !S.ret[i];
        if (isCur) d.appendChild(h('span', 'caret'));
        if (S.ret[i] && col < len) d.appendChild(sp('skip', ln.t.slice(col)));
        else if (col < len) {
          for (let c = col; c < len; c++) {
            let k = decoAt(ln, c); if (S.tapeAt && S.tapeAt.i === i && S.tapeAt.c === c) k += ' taped';
            if (k !== rc) { flush(); rc = k; }
            run += ln.t.charAt(c);
          }
          flush();
        } else if (!S.ret[i]) {
          if (S.pile[i] > 0) d.appendChild(sp('pile', '▒'.repeat(Math.min(S.pile[i], 4))));
          d.appendChild(sp('rg', '↵'));
        }
        tog(d, 'cur', isCur);
        if (ln.who) d.setAttribute('data-who', ln.who); else d.removeAttribute('data-who');
        if (ln.was) d.setAttribute('data-wasw', ln.was); else d.removeAttribute('data-wasw');
        if (S.skip[i] > 0) d.setAttribute('data-sk', '1'); else d.removeAttribute('data-sk');
      }
      function renderAll() {
        linesBox.textContent = '';
        lineEls = lines.map(function () { const d = h('div', 'line'); linesBox.appendChild(d); return d; });
        lines.forEach(function (_, i) { renderLine(i); });
        pfoot.textContent = memo.en.foot || '';
      }
      function plateTitle() {
        const n = D.memosTotal, inner = ['Probationary'];
        if (D.lap > 1) inner.push('Eternal');
        else { if (n >= 3) inner.push('Still'); if (n >= 6) inner.push('Noted'); if (n >= 10) inner.push('Noted Again'); if (n >= 15) inner.push('Pending'); }
        for (let k = 0; k < Math.min(6, Math.floor(Math.max(0, n - 15) / 10)); k++) inner.push(PLATE_MORE[k % PLATE_MORE.length]);
        return (n >= 15 && D.lap === 1 ? 'Associate Typist' : 'Typist') + ' (' + inner.join(', ') + ')';
      }
      function renderOutbox() {
        tray.textContent = '';
        for (let i = 0; i < Math.min(12, D.outbox); i++) { const s = h('div', 'sheet'); s.style.bottom = (i * 3) + 'px'; tray.appendChild(s); }
        obt.textContent = 'OUTBOX: ' + D.outbox;
      }
      function renderArchive() {
        archEl.textContent = '';
        if (!archive.length) { archEl.appendChild(h('div', 'ae', null, 'The archive is empty. It is thinking about it.')); return; }
        archive.forEach(function (runs) { archEl.appendChild(h('div', 'ae', null, ...runs.map(function (r) { return h('span', r.bad ? 'b' : null, null, r.t); }))); });
      }
      function renderDecor() {
        plateEl.textContent = 'DESK 7 1/2 | ' + plateTitle();
        postit.textContent = LN.postit[Math.floor(D.memosTotal / 3) % LN.postit.length];
        const sg = memo.special ? 99 : memo.v2 ? 100 : memo.stage, sp2 = memo.special;
        benchLbl.textContent = sp2 === 'hush' ? 'COMMITTEE IN RECESS' : sp2 === 'apology' ? 'COMMITTEE (LISTENING)' : sp2 ? 'THE COMMITTEE (THREE, ONE PLACE)' : sg === 100 ? 'COMMITTEE (UNUSUALLY RELAXED)' : sg <= 3 ? 'COMMITTEE OF ONE' : sg <= 8 ? 'COMMITTEE OF THREE (+ SUBCOMMITTEE)' : 'COMMITTEE (ON COMMITTEE SCORING)';
        heads[1].hidden = heads[2].hidden = !(sg >= 4 && sg !== 99) && !sp2;
        chips.forEach(function (c) { c.hidden = true; });
        tog(bench, 'grey', sp2 === 'hush');
        fileBtn.hidden = D.memosTotal < 1 || !!sp2 && sp2 !== 'return';
        clipBtn.hidden = !(sg >= 3 || memo.v2) ;
        tog(paperwrap, 'damp', D.lapMemos * 2.4 >= 8);
        renderOutbox();
      }
      function renderHeader() {
        phT.textContent = memo.special === 'apology' ? 'APOLOGY ' + memo.en.n + '/5' : 'MEMORANDUM';
        phTo.textContent = 'TO: ' + toName(); phFrom.textContent = 'FROM: ' + memo.from; phRe.textContent = 'RE: ' + memo.subj;
        phNo.textContent = 'MEMO NO.: ' + (memo.nofix ? '7 1/2' : memo.ord);
      }

      /* ---------- starting a memo ---------- */
      function initS() {
        S = { cur: 0, typed: lines.map(function () { return ''; }), srcs: lines.map(function () { return ''; }), pile: lines.map(function () { return 0; }), skip: lines.map(function () { return 0; }), ret: lines.map(function () { return false; }), startedAt: 0, clean: 0, dict: false, paul: false, sandraN: 0, tapeAt: null, flagged: [], trap: false, flagWarned: false, tapeCount: 0 };
      }
      function startMemo(en) {
        serial++; clearMT(); stopGhost(); stopPause(true); dictStop();
        memo = buildMemo(en); lines = memo.lines; initS();
        phase = 'IDLE'; memoStart = api.now(); pausedThisMemo = false; selfUsed = false; bsRun = 0; blindOn = false;
        hush = memo.special === 'hush'; hushUntil = hush ? memoStart + tm(6000, 600) : 0; if (hush) news.textContent = '';
        tog(paper, 'blind', false); tog(paper, 'out', false); filedEl.hidden = true; restart(paper, 'in2'); tog(paper, 'cert', memo.special === 'cert');
        if (started && wrapEl.clientWidth < 720) bringInto(paperwrap, 'nearest');
        [popEl, holeEl, signEl, getwell, ghostt, stickyEl].forEach(function (e) { e.hidden = true; });
        carbonEl.hidden = !memo.carbon; carbonEl.textContent = memo.carbon || '';
        appealBtn.hidden = selfBtn.hidden = nextBtn.hidden = true;
        renderAll(); renderHeader(); renderDecor();
        memo.ficus = !memo.special && !memo.nofix && memo.ord >= 5 && api.chance(1 / 45);
        if (memo.ficus) { stickyEl.textContent = LN.ficus[0]; stickyEl.hidden = false; later(function () { say(LN.ficus[1], { mood: 'confused' }); }, 900); }
        if (!nextPauseAt && (memo.stage >= 3 || memo.v2) && !memo.special) nextPauseAt = memoStart + tm(25000, 1500);
        later(memoIntro, 700);
        if (memo.blind) later(function () { startBlind(); }, 2000);
        if (hush) later(function () { say(LN.hush[0], { mood: 'neutral' }); }, tm(6000, 600) + 80);
        if (narrowCheck) narrowCheck();
      }
      function startBlind() { if (!memo.blind || blindOn) return; blindOn = true; tog(paper, 'blind', true); }
      function memoIntro() {
        const en = memo.en, k = memo.k;
        if (en.cameo === 'toaster') { say(CAMEO.toaster, { mood: 'neutral' }); if (api.flag.get('metToaster') || api.flag.get('toasterMet')) later(function () { say(CAMEO.toasterMet); }, 4000); }
        else if (en.cameo === 'dennis') { say(CAMEO.dennis, { mood: 'smug' }); }
        else if (en.cameo === 'twriter') say(LN.twriter[2], { mood: 'confused' });
        else if (en.cameo === 'future') say(LN.future[0], { mood: 'confused' });
        else if (en.cameo && en.cameo !== 'geraldMet') say(CAMEO[en.cameo], { mood: 'confused' });
        if (en.cameo === 'dennis') {
          if (api.flag.get('fax-machine.dennisFaxed')) later(function () { strip(CAMEO.dennisFax); }, 3500);
          else if (api.flag.get('metDennis')) later(function () { strip(CAMEO.dennis2); }, 3500);
        }
        if (k === 'a1') strip('The Stapler has the floor. The floor is a desk. Please read along with your fingers.');
        if (!en.subj || k === 'm5') { if (k === 'm5') say(LN.reChain[2], { mood: 'confused' }); else if (memo.ord === 9) say(LN.reChain[1].split('Re^9').join('Re^8'), { mood: 'confused' }); else if (memo.ord === 11) say(LN.reChain[0], { mood: 'confused' }); }
        if (k === 'm6' && D.typos.length) say(F(LN.variant[0]), { mood: 'smug' });
        if (k === 'm7') { say(LN.reply[0], { mood: 'confused' }); later(function () { strip('Memo 3 has noticed.'); }, 4000); later(function () { strip(LN.reply[1]); }, 14000); }
        if (k === 'las') say(LN.lasagna[0], { mood: 'confused' });
        if (k === 'duck') later(function () { spawnVisitor(); }, tm(2500, 400));
        if (memo.blind) say(LN.blind[0], { mood: 'confused' });
        if (k === 'ret') { say(LN.ending[3]); strip('P.S. ' + typoWord()); }
        if (k === 'cert') strip(LN.ending[8]);
        if (k === 'v2' && !once.v2s) { once.v2s = true; strip(nx('volume2')); }
        if (k === 'a5') strip(LN.attachment[6]);
        if (k === 'miss') strip('A Missing Person memo has been located. It was where you left it.');
      }

      /* ---------- typing ---------- */
      function onFirstKey() {
        startBlind();
        if (memo.k === 'm1' && D.lap === 1 && !once.fk1) { once.fk1 = true; say(LN.firstKey[0]); }
        else if (D.lapMemos === 0 && D.lap > 1 && !once.fk2) { once.fk2 = true; say(LN.firstKey[1], { priority: 0 }); }
        if (hush) api.sfx('ding');
      }
      function onTypo() {
        const t = api.now();
        if (!D.typoSeen) { D.typoSeen = true; lastTypoAt = t; say(LN.typoFirst[0], { mood: 'smug' }); return; }
        if (t - lastTypoAt > 10000) { lastTypoAt = t; strip(nx('typo')); }
      }
      function stir() { if (pauseUntil > api.now() && !pauseScab) { pauseScab = true; api.award(-0.5, 'Scab Typing'); sfx('sad'); st('scab'); sayN('staplerScab', { who: 'The Stapler' }); } }
      function pressKey(c) {
        const now = api.now(); if (now - lastAnim < 83) return; lastAnim = now; flip = !flip;
        const k = keyEls[String(c).toLowerCase()] || keyEls[c === ' ' ? ' ' : 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(api.rand() * 26))];
        if (k) k.style.animationName = flip ? PX + 'kdA' : PX + 'kdB';
        const b = barEls[barI++ % 7]; if (b) b.style.animationName = flip ? PX + 'barA' : PX + 'barB';
      }
      function nudge(n) { if (reduced()) return; linesBox.style.transition = 'transform 40ms linear'; linesBox.style.transform = 'translateX(' + (-Math.min(8, n * 0.3)).toFixed(1) + 'px)'; }
      function slideBack() { if (reduced()) { linesBox.style.transform = ''; return; } linesBox.style.transition = 'transform ' + tm(500, 60) + 'ms cubic-bezier(.2,1.6,.4,1)'; linesBox.style.transform = 'translateX(0)'; }
      function skipPhase() { return phase === 'SLIP' || phase === 'VERDICT' || phase === 'BETWEEN'; }
      /* a stray double-tap or a held key must not skip the stamps, the best joke in the room */
      function canSkip() { return phase === 'BETWEEN' || api.now() - slipAt > tm(1500, 150); }
      function typeChar(c, src) {
        if (lidOn) return;
        if (skipPhase()) { if (src !== 'you' || !canSkip()) return; skipToNextMemo(); }
        if (!S || S.cur >= lines.length) return;
        const now = api.now(), i = S.cur, L = lines[i], col = S.typed[i].length;
        if (c === ' ' && src === 'you' && col >= L.t.length && S.pile[i] === 0) {
          /* the natural way to type: a space after the last word. The carriage accepts it as a return. */
          if (!once.softRet) { once.softRet = true; strip('Space accepted as a return. The carriage is generous in the first lines. Enter does the same, with more ceremony.'); }
          doReturn(); return;
        }
        if (src !== 'pauline') stir();
        if (src === 'you') {
          pushSpam('chars'); if (c === runCh) runN++; else { runCh = c; runN = 1; }
          if ((runN === 10 || runN === 25) && /^[A-Za-z0-9]$/.test(c)) strip(F(runN === 10 ? nx('stutter') : LN.stutterBig[0], { c: c }));
        }
        if (phase === 'IDLE') { phase = 'TYPING'; S.startedAt = now; onFirstKey(); }
        bsRun = 0; D.chars++; st('chars');
        buf = (buf + String(c).toLowerCase()).slice(-12);
        if (col < L.t.length) {
          const ok = c === L.t.charAt(col);
          S.typed[i] += c; S.srcs[i] += src === 'you' ? 'y' : src === 'pauline' ? 'p' : 'd';
          if (src === 'dict') S.dict = true;
          if (src === 'pauline') S.paul = true;
          if (ok) sfx('tick', 45); else { sfx('blip', 80); if (src === 'you') onTypo(); }
          if (col === 30 && L.t.length >= 31) ringBell();
          nudge(col + 1);
          if (src === 'you' && col + 1 === L.t.length && D.memosTotal < 4) {
            if (i === lines.length - 1) { sfx('ding', 300); strip(D.memosTotal < 2 ? 'Final line complete. Enter files the memo. The carriage is not rushing you. The carriage has rushed before.' : 'Last line done. Enter files it. The tray is ready.'); }
            else if (!once.lineHint) { once.lineHint = true; strip('Line done. Press Enter, or the brass RETURN, to return the carriage.'); }
          }
        } else {
          if (S.pile[i] === 0) { st('piles'); strip(nx('pile')); }
          S.pile[i] = Math.min(20, S.pile[i] + 1); sfx('blip', 80);
        }
        pressKey(c); renderLine(i);
        /* secret words only count when the player types them off-script (not when the memo itself says them) */
        const tail = buf.slice(-6), onScript = col >= 5 && col < L.t.length && L.t.slice(col - 5, col + 1).toLowerCase() === tail;
        const on7 = col >= 6 && col < L.t.length && L.t.slice(col - 6, col + 1).toLowerCase() === buf.slice(-7);
        if (src === 'you' && !on7 && !D.seen.tue && !memo.special && buf.slice(-7) === 'tuesday') tuesdayNamed();
        if (src === 'you' && !onScript) {
          if (tail === 'sandra' && !D.sandraTrap && !memo.special) sandraTrap();
          if (pauseUntil > now) {
            if (!once.gerald && tail === 'gerald') { once.gerald = true; potatoGerald(); }
            if (!once.potato && tail === 'potato') { once.potato = true; potatoBow(); }
          }
        }
      }
      function lineErr(i) { const t = S.typed[i], L = lines[i].t; let e = S.pile[i]; for (let c = 0; c < t.length; c++) if (t.charAt(c) !== L.charAt(c)) e++; return e; }
      function doReturn(src) {
        if (lidOn) return;
        if (skipPhase()) { if (!src && canSkip()) skipToNextMemo(); return; }
        if (!S || S.cur >= lines.length) return;
        if (src !== 'pauline') { stir(); pushSpam('enter'); }
        const i = S.cur, L = lines[i], col = S.typed[i].length;
        if (phase === 'IDLE') { phase = 'TYPING'; S.startedAt = api.now(); onFirstKey(); }
        bsRun = 0;
        if (col >= L.t.length) {
          sfx('ding'); api.achieve('typing-pool.first');
          if (S.pile[i] > 0) { strip(LN.pileClear[0]); }
          else if (lineErr(i) === 0) { S.clean++; st('cleanLines'); if (api.chance(1 / 3)) strip(nx('cleanLine')); if (S.clean >= 3 && api.chance(1 / 40)) applause(); }
        } else {
          S.skip[i] = L.t.length - col; sfx('boing'); st('premature'); D.prem++;
          strip(D.prem === 1 ? LN.premature[0] : nxA('premb', LN.premature.slice(1)));
        }
        S.ret[i] = true; renderLine(i); S.cur++; slideBack();
        if (S.cur >= lines.length) { finishMemo({ src: src }); return; }
        renderLine(S.cur); sandraMutate(); maybeVisitor();
      }
      function applause() { st('applause'); api.award(0.75, 'Applause (Source Unknown)'); sfx('tada'); api.confetti(undefined, undefined, 14); later(function () { say(nx('applause'), { mood: 'proud' }); }, 400); }
      function doTape() {
        if (lidOn) return;
        bsRun++;
        if (bsRun >= 40 && !D.seen.eraser) { D.seen.eraser = true; say(LN.eraser[0], { mood: 'confused' }); holeEl.textContent = LN.eraser[1]; holeEl.hidden = false; }
        if (skipPhase() || !S) return;
        stir();
        if (tapeLock) { strip(nx('tapeWait')); return; }
        const i = S.cur, col = S.typed[i] ? S.typed[i].length : 0;
        if (col === 0) { strip(LN.tapeCol0[0]); return; }
        if (S.pile[i] > 0) { S.pile[i]--; S.tapeAt = null; }
        else { S.typed[i] = S.typed[i].slice(0, -1); S.srcs[i] = S.srcs[i].slice(0, -1); S.tapeAt = { i: i, c: col - 1 }; }
        tape = Math.max(0, tape - 1); st('tapeUses'); S.tapeCount++;
        renderLine(i); sfx('pop'); updateTape();
        api.clearTimeout(tapeFlashId);
        tapeFlashId = api.setTimeout(function () { if (S && S.tapeAt) { const t = S.tapeAt.i; S.tapeAt = null; renderLine(t); } }, 450);
        const total = api.stat.get('typing-pool.tapeUses');
        if (total === 1) say(LN.tape[0], { mood: 'smug' }); else if (total % 8 === 0) strip(nxA('tapeb', LN.tape.slice(1)));
        if (tape <= 0) requestTape();
      }
      function updateTape() { tapeNum.textContent = tape + ' mm'; hubC.setAttribute('r', (6 + (40 - tape) / 40 * 8).toFixed(1)); }
      function requestTape() {
        tapeLock = true; tapeBtn.disabled = true; const form = 6 + D.tapeForms; D.tapeForms++; st('tapeRolls');
        api.toast('Form 27B/' + form);
        say(F(form === 7 ? LN.tapeEmpty[2] : LN.tapeEmpty[form === 6 ? 0 : 1], { form: form }), { mood: 'neutral' });
        tapeRf.style.animationDuration = tm(12000, 1500) + 'ms'; restart(tapeRf, 'go');
        api.setTimeout(function () { tapeLock = false; tape = 40; tapeBtn.disabled = false; tog(tapeRf, 'go', false); updateTape(); api.achieve('typing-pool.tape'); say(nx('tapeRefill'), { priority: 0 }); }, tm(12000, 1500));
      }
      function ringBell() {
        if (hush) return;
        sfx('bell'); restart(bellBtn, 'shake'); D.bellCount++; st('bell');
        if (D.bellCount === 1) say(LN.bellFirst[0], { mood: 'smug' }); else if (D.bellCount === 50) say(LN.bellPlaque[0], { mood: 'proud' });
        else if (D.bellCount === 25) { pend.typewriter = true; say(LN.twriter[0], { mood: 'confused', priority: 2 }); api.setTimeout(function () { sfx('bell'); }, 500); api.setTimeout(function () { sfx('bell'); }, 1000); }
        else if (D.bellCount % 9 === 3) strip(nx('bellMargin'));
      }
      function bellHand() {
        const t = api.now(); bellClicks = bellClicks.filter(function (x) { return t - x < 6000; }); bellClicks.push(t);
        sfx(t < wood ? 'honk' : 'ding'); restart(bellBtn, 'shake'); strip(nx('bellClick'));
        if (bellClicks.length >= 12 && t >= wood) { wood = t + 20000; bellBtn.textContent = 'WOOD'; tog(bellBtn, 'wood', true); say(once.bf ? nx('bellFatigue') : LN.bellFatigue[0], { mood: 'panic' }); once.bf = 1; }
      }
      function doClip() {
        const heart = memo && memo.k === 'a5'; let txt;
        if (heart) txt = LN.attachment[6]; else { D.attN++; txt = D.attN <= 6 ? LN.attachment[D.attN - 1] : nxA('att', LN.attachment.filter(function (x, i) { return i !== 6; })); }
        popEl.textContent = ''; if (heart) popEl.appendChild(h('span', 'heart')); popEl.appendChild(document.createTextNode(txt)); popEl.hidden = false;
        api.clearTimeout(popTimer); popTimer = api.setTimeout(function () { popEl.hidden = true; }, 4000);
      }
      /* rare event: a duck walks across the memo */
      function removeVisitor() { if (visitorEl) { if (visitorEl.parentNode) visitorEl.parentNode.removeChild(visitorEl); visitorEl = null; } }
      function maybeVisitor() {
        if (visitorEl || !S || memo.special || phase !== 'TYPING' || D.memosTotal < 3 || lines.length - S.cur < 2 || jamOn || pauseUntil > api.now() || !api.chance(1 / 40)) return;
        spawnVisitor();
      }
      function spawnVisitor() {
        if (visitorEl || !S || (phase !== 'TYPING' && phase !== 'IDLE')) return;
        const dur = tm(7000, 900); S.duck = 1; st('visits');
        visitorEl = h('button', 'visit', { type: 'button', 'aria-label': 'A duck is walking on the memo. Shoo it.', onclick: function () { playerAct(); shoo(); } }, '🦆');
        visitorEl.style.animationDuration = dur + 'ms'; paperwrap.appendChild(visitorEl);
        say(nx('duckVisit'), { mood: 'confused' });
        later(function () { if (!visitorEl) return; removeVisitor(); S.duck = 2; strip(nx('duckLeft')); }, dur);
      }
      function shoo() { if (!visitorEl) return; removeVisitor(); if (S) S.duck = 3; api.award(0.5, 'Duck Shooed'); sfx('honk'); st('shooed'); strip(nx('duckShoo')); }
      /* ---------- finishing a memo: score slip, stamps, 7 1/2 ---------- */
      function pickNum(prev) {
        const c = NUMS.filter(function (n) { return Math.abs(n - prev) >= 1 && n !== lastNum; });
        lastNum = api.pick(c.length ? c : NUMS); return lastNum;
      }
      function analyzeVariant() {
        let best = null;
        lines.forEach(function (ln, i) {
          if (ln.cc) return;
          let idx = 0;
          ln.t.split(' ').forEach(function (w) {
            const s = idx, e = idx + w.length; idx = e + 1; let b = 0;
            for (let c = s; c < e; c++) if (S.typed[i].charAt(c) !== ln.t.charAt(c)) b++;
            if (b > 0 && (!best || b > best.b)) best = { b: b, s: s, e: e, i: i, w: w };
          });
        });
        if (!best) return null;
        const typedW = S.typed[best.i].slice(best.s, best.e);
        if (typedW.length < best.e - best.s) return null;
        const core = best.w.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, ''), wrong = typedW.replace(/[^A-Za-z]/g, '');
        if (!/^[A-Za-z]+$/.test(core) || wrong.length < 3 || wrong.length > 12 || wrong.toLowerCase() === core.toLowerCase()) return null;
        return { right: core.toLowerCase(), wrong: wrong };
      }
      function recordVariant(v) {
        D.typos = D.typos.filter(function (x) { return x !== v.wrong; }); D.typos.push(v.wrong); if (D.typos.length > 20) D.typos.shift();
        const key = v.right + '|' + v.wrong.toLowerCase();
        if (D.varCount[key] || Object.keys(D.varCount).length < 20) D.varCount[key] = (D.varCount[key] || 0) + 1;
        st('variants');
        if (D.varCount[key] === 3 && !D.ratified[v.right] && Object.keys(D.ratified).length < 6 && v.right.length >= 3) {
          D.ratified[v.right] = v.wrong.toLowerCase(); st('ratified'); api.flag.set('typing-pool.ratified', true);
          api.achieve('typing-pool.variant'); api.confetti(); cscroll.hidden = false; api.setTimeout(function () { cscroll.hidden = true; }, 5000);
          say(LN.ratified[0], { mood: 'proud', priority: 2 }); later(function () { say(F(LN.variant[1]), { mood: 'smug' }); }, 1500);
        }
      }
      function buildStamps(R, firstNum, marg) {
        const out = [], mm = memo; let prev = firstNum;
        const num = function () { prev = pickNum(prev); return prev; };
        const reason = function (w) { return { l: 'RE-SCORED FOR ' + w, n: num() }; };
        if (mm.v2) out.push({ l: nx('kindReasons'), n: num() });
        else if (mm.stage <= 3) { if (mm.k === 'm1') out.push({ l: 'RE-SCORED FOR ENTHUSIASM', n: 6.8 }, { l: 'RE-SCORED FOR RESTRAINT', n: 8.2 }); else out.push(reason(nx('reasons')), reason(nx('reasons'))); }
        else if (mm.stage <= 8) {
          const c1 = num(); out.push({ l: 'CLIVE (TONE)', n: c1 }); prev = marg; out.push({ l: 'MARGUERITE (PUNCTUALITY)', n: marg });
          out.push({ l: 'MR. GRAY', t2: '😐 ABSTAINS', n: null }); out.push({ l: 'SUBCOMMITTEE FOR SECOND OPINIONS', n: num(), c: 'lilac' });
        } else out.push({ l: 'COMMITTEE', n: num() }, { l: 'COMMITTEE ON COMMITTEE SCORING', n: num() }, { l: 'SUBCOMMITTEE OF 7 1/2', n: null, sub: LN.meta[1] });
        if (R.perfect) out[0].l = 'RE-SCORED FOR MAKING THE OTHERS LOOK BAD';
        if (R.empty) out[0].l = 'RE-SCORED UPWARD FOR ATTENDANCE';
        out.push(finalStamp(R.clean >= 7 && !R.empty));
        return out;
      }
      function finalStamp(feeling) {
        const unit = (memo.stage >= 5 || memo.v2) ? nxA('unit', UNITS) : '';
        if (unit) {
          unitN++;
          if (!once.unit) { once.unit = true; later(function () { say(LN.unitChange[0], { mood: 'confused' }); }, tm(3500, 400)); }
          else if (memo.stage >= 8 && unitN % 4 === 0) later(function () { say(nxA('uc', LN.unitChange.slice(1)), { mood: 'confused' }); }, tm(3500, 400));
        }
        return { l: (feeling ? 'RE-SCORED TO 7 1/2, WITH FEELING' : 'FINAL (PROVISIONAL): 7 1/2') + (unit ? ' ' + unit : ''), n: null, fin: true };
      }
      function landStamp(sg, idx) {
        const row = h('div', 'srow'); let numEl = null;
        if (typeof sg.n === 'number') { numEl = h('span', 'num', null, n1(sg.n)); row.appendChild(numEl); }
        const txt = sg.l + (sg.n !== null && sg.n !== undefined && typeof sg.n !== 'number' ? ' ' + sg.n : '') + (sg.t2 ? ' ' + sg.t2 : '');
        const stmp = h('span', 'stamp ' + (sg.c || ''), null, txt); row.appendChild(stmp);
        if (sg.sub) row.appendChild(h('div', 'sub', null, sg.sub));
        if (lastNumEl && (numEl || sg.fin || sg.appeal)) lastNumEl.classList.add(PX + 'struck');
        if (numEl) lastNumEl = numEl; else if (sg.fin || sg.appeal) lastNumEl = stmp;
        stampsEl.appendChild(row);
        while (stampsEl.children.length > 6) stampsEl.removeChild(stampsEl.firstChild);
        if (stampsEl.children.length > 5) { const o = stampsEl.firstChild; tog(o, 'old', true); }
        const val = typeof sg.n === 'number' ? sg.n : (sg.fin || sg.appeal) ? 7.5 : lastVal;
        sfx('stamp');
        if (!sg.fin && !sg.appeal && !sg.quiet) { if (idx === 0 && val > lastVal) sfx('fanfare'); else if (val < lastVal) sfx('sad'); }
        lastVal = val; if (!reduced()) restart(slip, 'thunk');
        if (sg.l.indexOf('CLIVE') === 0 || sg.l.indexOf('MARGUERITE') === 0) { const c = chips[sg.l.indexOf('CLIVE') === 0 ? 0 : 1]; c.textContent = n1(sg.n); c.hidden = false; }
        if (sg.l.indexOf('MR. GRAY') === 0) { chips[2].textContent = 'abstains'; chips[2].hidden = false; }
        if (typeof sg.n === 'number') lastRes.push('Score ' + n1(sg.n) + (sg.l.indexOf('RE-SCORED FOR ') === 0 ? ' for ' + sg.l.slice(14).toLowerCase() : ' from ' + sg.l.toLowerCase()) + '.');
        else if (sg.fin) lastRes.push('Final: 7 1/2.');
      }
      function addSlipLine(t) { slipLinesEl.appendChild(h('div', 'sl', null, t)); while (slipLinesEl.children.length > 9) slipLinesEl.removeChild(slipLinesEl.firstChild); }
      function runStamps(list, my, done, delay0) {
        let i = 0;
        const step = function () {
          if (my !== serial) return;
          const sg = list[i], last = i === list.length - 1; landStamp(sg, i); i++;
          if (last) done(); else later(step, tm(900, 100));
        };
        if (!list.length) { done(); return; }
        later(step, delay0 || 1);
      }
      function bringInto(e, block) { try { e.scrollIntoView({ block: block, behavior: reduced() ? 'auto' : 'smooth' }); } catch (x) { /* ignore */ } }
      function scheduleAuto(ms) { api.clearTimeout(autoId); autoId = later(function () { if (phase === 'BETWEEN') startMemo(pickEntry()); }, ms); }
      function skipToNextMemo() { if (!skipPhase()) return; serial++; clearMT(); startMemo(pickEntry()); }
      function printSlip(plan, my) {
        phase = 'SLIP'; slipAt = api.now(); sfx('whoosh'); tog(paper, 'out', true); filedEl.hidden = false; restart(filedEl, 'filed');
        if (wrapEl.clientWidth < 720) bringInto(slip, 'center'); /* on a phone the slip lives below the fold; bring the stamps to the player */
        slipLinesEl.textContent = ''; stampsEl.textContent = ''; lastNumEl = null; lastRes = []; lastVal = plan.startVal === undefined ? lastVal : plan.startVal;
        appealBtn.hidden = selfBtn.hidden = nextBtn.hidden = true; tog(slip, 'faint', false);
        sfoot.textContent = nxA('sf', LN.slipFoot); restart(slip, 'printing');
        const dt = tm(1200, 100) / Math.max(1, plan.lines.length);
        plan.lines.forEach(function (tx, i) { later(function () { addSlipLine(tx); }, i * dt); });
        later(function () { phase = 'VERDICT'; runStamps(plan.stamps, my, function () { afterVerdict(plan); }, plan.delay0); }, tm(1200, 100) + 20);
      }
      function afterVerdict(plan) {
        phase = 'BETWEEN';
        if (lastRes.length) strip(lastRes.join(' '));
        nextBtn.hidden = false; appealBtn.hidden = !plan.canAppeal; selfBtn.hidden = !plan.canSelf;
        if (!once.nextHint && D.memosTotal <= 2) { once.nextHint = true; later(function () { if (phase === 'BETWEEN') strip('Press any key, or NEXT MEMO, to continue. The slip will wait. The slip is good at waiting.'); }, tm(2500, 250)); }
        if (plan.after) plan.after();
        scheduleAuto(plan.auto || tm(9000, 600));
      }
      function inkSpam() {
        const t = api.now(); SP.ink.push(t); if (SP.ink.length > 80) SP.ink.shift();
        const n = SP.ink.filter(function (x) { return t - x < 4000; }).length;
        if (n >= 8 && t - lastInk > 6000) { lastInk = t; strip(n >= 12 ? LN.spam[11] : LN.spam[10]); tog(slip, 'faint', true); api.setTimeout(function () { tog(slip, 'faint', false); }, 5000); }
      }
      function doAppeal() {
        if (phase !== 'BETWEEN' || api.now() < appealCool || appealBtn.hidden) return;
        appealCool = api.now() + 600; inkSpam();
        api.award(-0.5, 'Appeal Fee'); sfx('pop'); D.appeals++; st('appeals');
        landStamp({ l: nx('appealStamp'), n: '7 1/2', c: 'lilac', appeal: true }, 1);
        const n = D.appeals; let line;
        if (n === 1) line = LN.appeal[0]; else if (n % 7 === 0) line = LN.appeal7[0]; else if (n === 4) line = LN.appeal[3]; else line = nxA('apb', [LN.appeal[1], LN.appeal[2], LN.appeal[4], LN.appeal[5]]);
        if (n % 7 === 0) say(line, { mood: 'confused' }); else strip(line);
        scheduleAuto(tm(9000, 600));
      }
      function doSelf() {
        if (phase !== 'BETWEEN' || selfUsed || selfBtn.hidden) return;
        selfUsed = true; selfBtn.disabled = true; inkSpam(); api.award(0.1, 'Self Stamp'); st('selfStamps');
        landStamp({ l: 'YOUR STAMP', n: '7 1/2', c: 'mint', appeal: true }, 1); strip(nx('selfStamp')); scheduleAuto(tm(9000, 600));
      }
      function fileAsIs() {
        if (lidOn || !S || (phase !== 'TYPING' && phase !== 'IDLE') || fileBtn.hidden) return;
        let typed = 0;
        lines.forEach(function (ln, i) { typed += S.typed[i].length; if (!S.ret[i]) { S.skip[i] += Math.max(0, ln.t.length - S.typed[i].length); S.ret[i] = true; } });
        strip(typed ? LN.misc[1] : LN.misc[2]); finishMemo({ filed: true });
      }
      function poolUpdate(announce) {
        const k = D.lapMemos, lvl = Math.min(24, k * 2.4);
        water.style.height = lvl + '%';
        dk2.hidden = k < 4; chairEl.hidden = dkGuard.hidden = k < 3; dkTie.hidden = k < 5; wetEl.hidden = k < 7; frameEl.hidden = k < 2;
        tog(frameEl, 'away', k === 9); tog(pool, 'climb', k >= 10); tog(paperwrap, 'damp', lvl >= 8);
        if (!announce || k < 1) return;
        const line = POOLSTAGE[k];
        later(function () {
          if (k === 7) restart(lamp, 'flick');
          if (line) say(line, { mood: 'neutral', priority: 0 }); else strip(nx('poolRise'));
        }, tm(4500, 500));
      }
      function finishMemo(o) {
        o = o || {};
        if (phase !== 'TYPING' && phase !== 'IDLE') return;
        const my = ++serial; clearMT(); stopGhost(); stopPause(true); dictStop();
        phase = 'SLIP';
        const sp2 = memo.special, en = memo.en;
        let total = 0, bad = 0, skip = 0, pile = 0, typed = 0;
        lines.forEach(function (ln, i) {
          total += ln.t.length; const t = S.typed[i]; typed += t.length;
          for (let c = 0; c < t.length; c++) if (t.charAt(c) !== ln.t.charAt(c)) bad++;
          skip += S.skip[i]; pile += S.pile[i];
        });
        total = Math.max(1, total);
        const correct = Math.max(0, total - bad - skip), acc = clamp(Math.round(100 * (correct - pile) / total), 0, 100);
        const elapsed = Math.max(1, (api.now() - (S.startedAt || api.now())) / 1000), wpm = clamp(Math.round((correct / 5) / (elapsed / 60)), 0, 199);
        const assisted = S.dict || S.paul || !!o.paul;
        const R = { total: total, bad: bad, skip: skip, pile: pile, typed: typed, acc: acc, wpm: wpm, clean: S.clean, empty: typed === 0, perfect: typed > 0 && bad === 0 && skip === 0 && pile === 0 && !assisted && !sp2 && !(memo.k === 'm1' && D.lap === 1) };
        /* bookkeeping */
        D.memosTotal++; D.lapMemos++; D.outbox++; st('memos'); if (bad) st('errors', bad);
        removeVisitor();
        if (memo.k === 'tw' && !R.empty) { api.achieve('typing-pool.typewriter'); api.award(1, 'Typewriter Thanked'); }
        if (memo.ficus) { api.award(0.7, 'Ficus Approval'); st('ficus'); later(function () { say(api.pick([LN.ficus[2], LN.ficus[3]]), { mood: 'smug' }); }, tm(2500, 300)); }
        if (R.empty) {
          D.blankRun++; st('blanks');
          if (D.blankRun === 7) { api.achieve('typing-pool.blank'); api.confetti(); say(LN.blank[3], { mood: 'proud', priority: 2 }); D.blankRun = 0; }
          else if (D.blankRun === 2 || D.blankRun === 4 || D.blankRun === 6) say(LN.blank[D.blankRun / 2 - 1], { mood: 'confused' });
        } else D.blankRun = 0;
        if (memo.cc) D.ccN = Math.min(12, D.ccN + 1);
        if (en.isStory) D.story = Math.min(STORY.length, D.story + 1);
        lastTypedText = lines.map(function (ln, i) { return ln.cc ? '' : S.typed[i]; }).join(' ');
        const sents = lastTypedText.split(/[.!?]/).map(function (x) { return x.trim(); }).filter(function (x) { return x.length >= 8 && x.length <= 60; });
        if (sents.length) lastSib = sents[sents.length - 1];
        let pay = assisted || R.empty ? 0.1 : clamp(0.3 + 0.1 * S.clean + Math.min(1.5, typed / 150), 0.1, 3);
        if (sp2 === 'hush') pay = 1; else if (sp2 === 'apology') pay = en.n === 5 ? 2 : 0.5;
        api.award(Math.round(pay * 100) / 100, sp2 === 'hush' ? 'Typed Quietly' : 'Memo Filed');
        let variant = null;
        if (!assisted && !sp2 && !S.trap) { variant = analyzeVariant(); if (variant) recordVariant(variant); }
        R.variant = !!variant;
        /* archive */
        const runs = []; let cur = null, cnt = 0;
        lines.forEach(function (ln, i) { for (let c = 0; c < S.typed[i].length && cnt < 400; c++, cnt++) { const bd = S.typed[i].charAt(c) !== ln.t.charAt(c); if (!cur || cur.bad !== bd) { if (runs.length >= 39 && cur) { cur.bad = cur.bad || bd; } else { cur = { t: '', bad: bd }; runs.push(cur); } } cur.t += S.typed[i].charAt(c); } if (cur) cur.t += ' '; });
        archive.push(runs); if (archive.length > 6) archive.shift(); renderArchive(); renderOutbox();
        /* perfect handling */
        if (R.perfect) {
          D.perfectRun++; st('perfect');
          if (D.perfectRun >= 3) { D.perfectRun = 0; api.achieve('typing-pool.perfect'); pend.forceBlind = true; signEl.textContent = LN.perfect[3]; signEl.hidden = false; later(function () { signEl.hidden = true; }, 12000); say(LN.perfect[2], { mood: 'confused', priority: 2 }); }
          else say(LN.perfect[D.perfectRun - 1], { mood: 'confused' });
          if (memo.k === 'las') { api.award(7.5, 'Lasagna Accepted'); api.achieve('typing-pool.lasagna'); say(LN.lasagna[1], { mood: 'proud', priority: 2 }); api.confetti(); }
        } else D.perfectRun = 0;
        if (S.flagged.length && !S.flagWarned) { S.flagWarned = true; if (S.flagged.some(function (f) { return S.typed[f.i].slice(f.s, f.e) === lines[f.i].t.slice(f.s, f.e); })) strip(LN.sandraNon[0]); }
        poolUpdate(!sp2 && D.lapMemos <= 10);
        /* the plan */
        const first0 = memo.k === 'm1' && D.lap === 1 ? 9.1 : R.empty ? 0 : clamp(Math.round((acc * 0.07 + Math.min(wpm, 100) * 0.03) * 10) / 10, 0.1, 9.9);
        const marg = prevFirst; prevFirst = first0 > 0 ? first0 : prevFirst;
        const spd = S.dict ? 'Dictated: n/a' : (S.paul || o.paul) ? 'Typed by Pauline' : wpm + ' wpm';
        const slipL = ['SPEED: ' + spd, 'ACCURACY: ' + acc + '%', 'POSTURE: Reasonable (not measured)', 'FIRST SCORE: ' + (R.perfect ? 'SUSPICIOUSLY GOOD (VOID)' : n1(first0))];
        const plan = { lines: slipL, stamps: [], canAppeal: D.memosTotal >= 2 && !sp2, canSelf: (memo.stage >= 11 || memo.v2) && !sp2, startVal: first0, auto: tm(9000, 600) };
        if (S.dict) { slipL.push('Assisted. Disqualified. Invited to the party.', LN.dict[1]); }
        if (S.paul || o.paul) slipL.push(LN.idle[4]);
        if (blindOn) slipL.push(LN.blind[1]);
        if (variant && memo.stage >= 6) slipL.push(F('TERMINOLOGY ADOPTED: %typo%'));
        if (o.filed && !R.empty) slipL.push('Filed as is.');
        const fin = function (feel) { return finalStamp(feel); };
        if (S.trap) { plan.lines = [LN.sandraTrapSlip[0]]; plan.stamps = buildStamps(R, 5, marg); }
        else if (sp2 === 'hush') { Object.assign(plan, { lines: [LN.hush[1]], stamps: [], canAppeal: false, auto: tm(7000, 500), after: function () { strip(LN.hush[2]); later(function () { strip(LN.hush[3]); }, tm(3000, 300)); later(function () { strip(LN.hush[4]); }, tm(6000, 600)); } }); }
        else if (sp2 === 'apology' && en.n < 5) { Object.assign(plan, { lines: ['Received.'], stamps: [], auto: tm(3500, 300), after: function () { strip(LN.apology[0]); api.sfx('bell'); } }); }
        else if (sp2 === 'apology') {
          api.achieve('typing-pool.apology'); st('apology');
          Object.assign(plan, { lines: [LN.apology[3]], stamps: [{ l: 'FINAL (PROVISIONAL): 7 1/2', n: null, fin: true, quiet: true }], delay0: tm(3200, 300), auto: tm(16000, 1600), after: function () {
            api.sfx('bell'); strip(LN.ending[0]); stillUntil = api.now() + tm(4000, 400); say(LN.ending[1], { mood: 'neutral' });
            later(function () { say(LN.apology[1], { mood: 'neutral' }); }, tm(5000, 500)); later(function () { say(LN.apology[2], { mood: 'proud' }); }, tm(11000, 1000)); later(function () { say(LN.apology[0], { mood: 'neutral', priority: 0 }); }, tm(14500, 1400)); } });
        } else if (sp2 === 'cert') {
          endLap(); Object.assign(plan, { lines: ['7 1/2'], stamps: [fin(false)], auto: tm(9000, 700), after: function () { strip(LN.ending[2]); say(LN.ending[5], { mood: 'smug' }); later(function () { say(LN.ending[6], { priority: 0 }); }, tm(6000, 600)); } });
        } else if (sp2 === 'return') {
          sfx('bell'); restart(bellBtn, 'shake'); api.achieve('typing-pool.loop'); api.confetti(); st('laps'); hangEl.textContent = 'SCORE: 9.1 (RESOLVED: IT WAS THIS ONE)';
          plan.lines[3] = 'FIRST SCORE: ' + n1(first0); plan.lines.push('SCORE: 9.1 (RESOLVED: IT WAS THIS ONE)');
          plan.stamps = [{ l: LN.ending[9], n: null, c: 'mint' }, fin(false)]; plan.canAppeal = false;
          plan.after = function () {
            say(LN.ending[4], { mood: 'smug', priority: 2 });
            later(function () { say(LN.apology[4], { who: 'The Stapler', mood: 'proud' }); }, tm(4000, 400));
            later(function () { addSlipLine(LN.ending[10]); landStamp({ l: 'RE-SCORED FOR BEING A TROPHY', n: '7 1/2', c: 'lilac', appeal: true }, 1); }, tm(2500, 300));
          };
          plan.auto = tm(12000, 900);
        } else if (memo.noscore) {
          plan.lines = [memo.noscore]; plan.stamps = (en.stampText ? [{ l: en.stampText, n: null }] : []).concat([fin(false)]);
          plan.after = function () {
            if (en.cameo === 'geraldMet') say(CAMEO.geraldMet, { who: 'Gerald', mood: 'smug' });
            if (memo.k === 'duck') { api.award(1, 'Duck, Acknowledged'); later(function () { say(LN.duckLeft[1], { mood: 'proud' }); }, tm(2500, 300)); }
            if (memo.k === 'tw') { later(function () { say(LN.twriter[3], { mood: 'proud', priority: 2 }); }, tm(2500, 300)); }
            if (memo.k === 'fut') { say(api.line('fortune'), { mood: 'smug' }); later(function () { say(LN.future[1], { mood: 'confused', priority: 0 }); }, tm(5000, 500)); }
          };
        } else plan.stamps = buildStamps(R, first0, marg);
        if (plan.stamps.some(function (x) { return x.fin; })) st('finals');
        if (!plan.after && !sp2) plan.after = function () { afterLines(R); };
        if (en.cameo === 'toaster') { const a0 = plan.after; plan.after = function () { say(CAMEO.toasterSlip, { mood: 'smug' }); if (!D.seen.toast) { D.seen.toast = true; api.setTimeout(function () { strip('The Toaster: Toast.'); }, tm(60000, 5000)); if (api.flag.get('metToaster') || api.flag.get('toasterMet')) api.setTimeout(function () { say(CAMEO.toasterTears, { mood: 'proud' }); }, tm(70000, 6000)); } if (a0) a0(); }; }
        save(); printSlip(plan, my);
      }
      function afterLines(R) {
        const k = D.memosTotal; let line;
        if (MILESTONE[k]) line = MILESTONE[k];
        else if (memo.v2) line = D.lapMemos % 10 === 0 ? nx('staplerCard') : nx('memoDone');
        else if (memo.stage <= 3 && k > 1) line = nx('committee1');
        else if (memo.stage <= 8) line = memo.stage === 8 && !once.sub ? (once.sub = true, LN.committee3[6]) : nxA('c3', LN.committee3.filter(function (x, i) { return i !== 6; }));
        else if (memo.stage <= 12) line = !once.mat ? (once.mat = true, LN.material[0]) : nx('meta');
        else line = nx('memoDone');
        const so = { mood: R.perfect ? 'confused' : 'proud' };
        if (memo.v2 && D.lapMemos % 10 === 0 && !MILESTONE[k]) so.who = 'The Stapler';
        say(F(line, { n: D.chars, acc: R.acc }), so);
        if (R.wpm >= 60 && api.chance(0.3)) strip(LN.spd[0]); else if (R.wpm < 20 && R.typed > 20 && api.chance(0.3)) strip(api.chance(0.5) ? LN.spd[1] : LN.spd[4]); else if (R.acc <= 85 && R.typed > 20 && api.chance(0.4)) strip(F(api.chance(0.5) ? LN.spd[2] : LN.spd[3], { acc: R.acc, rest: 100 - R.acc }));
        if (R.variant && memo.stage >= 6 && api.chance(0.5)) later(function () { strip(F(memo.stage === 8 ? LN.variant[6] : nxA('vr', LN.variant.slice(2, 6)))); }, tm(2500, 300));
        if (memo.k === 'm7') later(function () { strip(LN.reply[2]); }, tm(2200, 300));
        if (memo.en.cameo === 'dennis') later(function () { strip(api.line('plantStatus')); }, tm(6500, 600));
        if (memo.v2 && api.chance(0.5)) later(function () { strip(nx('volume2')); }, 2500);
        if (D.lapMemos === 1 && memo.v2 && D.lap > 1 && !once.ded) { once.ded = true; later(function () { say(LN.ending[7], { mood: 'proud' }); }, tm(5000, 500)); }
        if (memo.k === 'm1') later(function () { strip(LN.misc[3]); }, 3000);
      }
      function endLap() {
        D.lap++; D.lapMemos = 0; D.ccN = 0; D.outbox = 0; D.loops++; D.lapSec = 0; nextPauseAt = 0;
        api.flag.set('typing-pool.loops', D.loops); api.setTitle('Typing Pool (Annex)');
        poolUpdate(false); sfx('whoosh'); renderOutbox(); plateEl.textContent = 'DESK 7 1/2 | ' + plateTitle();
      }
      /* ---------- spam, jam, pause, idle, pauline, dictaphone, secrets ---------- */
      let lastRes = [], lastInk = -1e9, lastTabLine = -1e9, pauseTok = 0, dictTimer = 0, dictHold = 0, dictHeld = false, dictCap = 0;
      const typDone = LN.typist.map(function () { return false; });
      function pushSpam(kind) {
        const now = api.now(), arr = SP[kind]; arr.push(now); if (arr.length > 80) arr.shift();
        const win = kind === 'ctl' ? 4000 : 2000, need = kind === 'chars' ? 28 : kind === 'enter' ? 8 : 12;
        let n = 0; for (let i = arr.length - 1; i >= 0 && now - arr[i] <= win; i--) n++;
        if (n >= need && !jamOn && now > jamCool) { if (kind === 'enter') strip(LN.spam[9]); startJam(); }
        else if (kind === 'chars' && now - lastWarn > 20000) { let m = 0; for (let i = arr.length - 1; i >= 0 && now - arr[i] <= 1000; i--) m++; if (m >= 10) { lastWarn = now; strip(LN.spam[8]); } }
      }
      function startJam() {
        jamOn = true; jamLoops = 0; const tok = ++jamTok; jamEl.hidden = false; loopBtns.forEach(function (b) { b.hidden = false; });
        api.award(-0.5, 'Keystroke Overage Fee'); sfx('buzz'); st('jams');
        const jn = api.stat.get('typing-pool.jams');
        if (jn <= 1) { say(LN.spam[0], { mood: 'panic', priority: 2 }); say(LN.spam[1], { mood: 'panic' }); }
        else say(jn === 5 ? LN.jamBig[0] : jn === 10 ? LN.jamBig[1] : jn === 15 ? LN.jamBig[2] : F(nx('jamAgain'), { n: jn }), { mood: 'panic', priority: 2 });
        strip(LN.spam[2]);
        api.setTimeout(function () { if (jamOn && tok === jamTok) { clearJam(); say(LN.spam[7], { mood: 'smug' }); } }, tm(15000, 2000));
      }
      function clearJam() { jamOn = false; jamEl.hidden = true; jamCool = api.now() + 20000; }
      function untangle(i) {
        if (!jamOn) return;
        sfx('tick'); loopBtns[i].hidden = true; jamLoops++; strip(LN.spam[2 + Math.min(3, jamLoops)]);
        if (jamLoops >= 3) { clearJam(); say(LN.spam[6], { mood: 'smug' }); api.achieve('typing-pool.spam'); st('untangled'); }
      }
      function maybePause(now) {
        if (pauseUntil > now || pausedThisMemo || phase !== 'TYPING' || !nextPauseAt || now < nextPauseAt || !S) return;
        if (memo.special || jamOn || lidOn || ghostId || blindOn || fireOn || !(memo.stage >= 3 || memo.v2)) return;
        let typed = 0; S.typed.forEach(function (t) { typed += t.length; });
        if (typed < 20 || lines.length - S.cur < 2) return;
        startPause(tm(7500, 1500));
      }
      function startPause(ms) {
        pausedThisMemo = true; pauseScab = false; pauseN++; pauseUntil = api.now() + ms; st('pauses'); buf = '';
        bannerTxt.textContent = (pauseN === 1 ? 'NEW RULE: ' : '') + 'UNION-MANDATED PAUSE. DO NOT TYPE FOR 7 1/2 SECONDS. THIS IS NOT A TEST. THIS IS A STAPLER.'; banner.hidden = false; tog(tw, 'dim', true);
        pauseRf.style.animationDuration = ms + 'ms'; restart(pauseRf, 'go'); news.textContent = F(nx('union'), { n: pauseN });
        if (pauseN === 1) say(bannerTxt.textContent, { who: 'The Stapler', mood: 'panic' }); else if (pauseN % 4 === 0) sayN('staplerMgmt', { mood: 'smug' });
        /* small beats inside the silence, so the wait is not just a ring */
        later(function () { if (pauseUntil > api.now()) { sfx('tick'); news.textContent = 'The stapler is holding.'; } }, ms * 0.27);
        if (pauseN <= 2) later(function () { if (pauseUntil > api.now()) strip('Silence is going well. Do not say that out loud.'); }, ms * 0.67);
        armPause(ms);
      }
      function armPause(ms) { api.clearTimeout(pauseTimer); const tok = ++pauseTok; pauseTimer = api.setTimeout(function () { endPause(tok); }, ms); }
      function endPause(tok) {
        if (tok !== pauseTok || !pauseUntil) return;
        const clean = !pauseScab; pauseUntil = 0; banner.hidden = true; tog(tw, 'dim', false);
        nextPauseAt = api.now() + (D.lap > 1 ? 60 + api.rand() * 30 : 30 + api.rand() * 20) * 1000 * TS;
        if (clean) { api.award(0.5, 'Union-Mandated Silence'); st('waited'); sayN('staplerThanks', { who: 'The Stapler', mood: 'proud' }); }
      }
      function stopPause() { api.clearTimeout(pauseTimer); pauseTok++; pauseUntil = 0; if (!fireOn) banner.hidden = true; tog(tw, 'dim', false); }
      function potatoGerald() {
        const ms = tm(15000, 3000); pauseUntil = api.now() + ms; pauseRf.style.animationDuration = ms + 'ms'; restart(pauseRf, 'go'); armPause(ms);
        say(LN.staplerGerald[0], { mood: 'confused', priority: 2 }); pend.gerald = true;
      }
      function tuesdayNamed() {
        D.seen.tue = true; st('tuesday'); api.award(7.5, 'Tuesday, Named'); api.achieve('typing-pool.tuesday'); api.confetti();
        restart(lamp, 'flick'); sfx('bell'); say(LN.tuesday[0], { mood: 'panic', priority: 2 });
        api.setTimeout(function () { say(LN.tuesday[1], { mood: 'confused' }); }, tm(6000, 600));
        api.setTimeout(function () { strip(LN.tuesday[2]); }, tm(12000, 1200));
      }
      function potatoBow() { api.award(5, 'Silent Bow'); say(LN.staplerBow[0], { mood: 'proud', priority: 2 }); api.achieve('typing-pool.potato'); api.confetti(); }
      function sandraMutate() {
        if (memo.special || memo.en.nosandra || S.sandraN >= 2) return;
        if (!(memo.v2 || (memo.stage >= 7 && memo.stage <= 12 && memo.stage !== 9 && memo.stage !== 10))) return;
        if (!api.chance(memo.v2 ? 0.35 : 0.55)) return;
        const cands = []; for (let j = S.cur + 2; j < lines.length; j++) if (!lines[j].cc && S.typed[j].length === 0 && !lines[j].was && !lines[j].deco.some(function (d) { return d.c === 'flag'; })) cands.push(j);
        if (!cands.length) return;
        const j = api.pick(cands), ln = lines[j], words = [], re = /[A-Za-z]{4,}/g; let x;
        while ((x = re.exec(ln.t))) words.push(x);
        if (!words.length) return;
        const w = api.pick(words), s0 = w.index, e0 = s0 + w[0].length;
        if (api.chance(0.25)) { ln.deco.push({ s: s0, e: e0, c: 'flag' }); S.flagged.push({ i: j, s: s0, e: e0 }); S.sandraN++; renderLine(j); strip("Sandra has flagged the word '" + w[0] + "'. The reason is on file. The file is a sandwich."); return; }
        const rep = api.pick(TRACKED.filter(function (t) { return t !== w[0].toLowerCase(); })), nt = ln.t.slice(0, s0) + rep + ln.t.slice(e0);
        if (nt.length > COLS) return;
        const dl = rep.length - w[0].length;
        ln.was = w[0]; ln.t = nt;
        ln.deco = ln.deco.filter(function (d) { return d.e <= s0 || d.s >= e0; }).map(function (d) { return d.s >= e0 ? { s: d.s + dl, e: d.e + dl, c: d.c } : d; });
        ln.deco.push({ s: s0, e: s0 + rep.length, c: 'red' }); S.sandraN++; renderLine(j);
        strip(api.chance(0.6) ? "Tracked Change (Sandra): '" + w[0] + "' is now '" + rep + "'. Reason: contradictory to policy 14, which does not exist." : LN.sandra[0]);
      }
      function sandraTrap() {
        D.sandraTrap = true; S.trap = true; ghostt.hidden = false; api.setTimeout(function () { ghostt.hidden = true; }, 4000);
        say(LN.sandraTrapSay[0], { mood: 'confused', priority: 2 }); st('sandra');
      }
      function startGhost() { if (ghostId || (phase !== 'IDLE' && phase !== 'TYPING') || memo.special || pauseUntil > api.now() || jamOn) return; ghostId = api.setInterval(ghostStep, 200); }
      function stopGhost() { if (ghostId) { api.clearInterval(ghostId); ghostId = 0; } }
      function ghostStep() {
        if (hid() || lidOn || jamOn || pauseUntil > api.now() || (phase !== 'IDLE' && phase !== 'TYPING') || !S || S.cur >= lines.length) return;
        const L = lines[S.cur], col = S.typed[S.cur].length;
        if (!once.pau) { once.pau = true; api.award(0.1, 'Typed By Pauline'); st('pauline'); }
        if (col >= L.t.length) { if (S.cur < lines.length - 1) doReturn('pauline'); else stopGhost(); return; }
        let ch = L.t.charAt(col); if (api.chance(1 / 40) && NEIGH[ch.toLowerCase()]) ch = NEIGH[ch.toLowerCase()];
        typeChar(ch, 'pauline');
      }
      function paulineFile() {
        if ((phase !== 'IDLE' && phase !== 'TYPING') || memo.special || pauseUntil > api.now()) return;
        stopGhost();
        lines.forEach(function (ln, i) { if (!S.ret[i]) { S.skip[i] += Math.max(0, ln.t.length - S.typed[i].length); S.ret[i] = true; } });
        finishMemo({ paul: true });
      }
      function dictStep() {
        if (lidOn || skipPhase() || !S) return;
        lastAct = api.now();
        for (let n = 0; n < 3; n++) {
          if (S.cur >= lines.length || (phase !== 'IDLE' && phase !== 'TYPING')) break;
          const L = lines[S.cur], col = S.typed[S.cur].length;
          if (col >= L.t.length) { if (S.cur < lines.length - 1) doReturn('dict'); break; }
          let ch = L.t.charAt(col); if (api.chance(0.15) && NEIGH[ch.toLowerCase()]) ch = NEIGH[ch.toLowerCase()];
          typeChar(ch, 'dict');
        }
        if (!once.dict1) { once.dict1 = true; say(LN.dict[0], { mood: 'confused' }); }
        st('dictated');
      }
      function dictClick(e) { if (dictHeld) { dictHeld = false; return; } dictStep(); if (e && e.detail > 0) focusInp(); }
      function dictDown() {
        dictUp(); dictHeld = false;
        dictHold = api.setTimeout(function () {
          dictHeld = true; dictCap = api.now(); dictStep();
          dictTimer = api.setInterval(function () { if (api.now() - dictCap > 20000) { strip(LN.dict[2]); dictStop(); return; } dictStep(); }, 300);
        }, 400);
      }
      function dictUp() { api.clearTimeout(dictHold); if (dictHeld) api.setTimeout(function () { dictHeld = false; }, 50); if (dictTimer) { api.clearInterval(dictTimer); dictTimer = 0; } }
      function dictStop() { dictUp(); dictHeld = false; }
      function typistClick(i) {
        restart(typBtns[i], 'wave1');
        if (rapid('typ', 7, 5000)) { strip(nx('clickSpam')); return; }
        if (i === 3 && !once.plantCb && api.flag.get('plantClicked')) { once.plantCb = 1; strip(LN.plantCb[0]); return; }
        let idx = -1; const pref = [[0, 4], [5], [], [6]][i];
        for (let k = 0; k < pref.length; k++) if (!typDone[pref[k]]) { idx = pref[k]; break; }
        if (idx < 0) idx = typDone.indexOf(false);
        if (idx < 0) { strip(LN.typistDone[0]); return; }
        typDone[idx] = true;
        const txt = idx === 1 && D.typos.length ? F(LN.typistVariant[0]) : LN.typist[idx];
        if (idx >= 4 && idx <= 6) say(txt, { mood: 'confused', priority: 0 }); else strip(txt);
      }
      /* true when n events landed inside ms (then quiet for 15 s) */
      function rapid(key, n, ms) {
        const t = api.now(), a = (rapidT[key] = (rapidT[key] || []).filter(function (x) { return t - x < ms; }));
        a.push(t);
        if (a.length >= n && t - (rapidT[key + '!'] || -1e9) > 15000 * TS) { rapidT[key + '!'] = t; return true; }
        return false;
      }
      function narrowCheck() {
        const w = root.clientWidth; if (once.narrow || !w || w >= 420) return; once.narrow = true;
        say(LN.narrow[0], { mood: 'confused' }); stickyEl.textContent = LN.narrow[1]; stickyEl.hidden = false; strip(LN.narrow[2]);
      }
      function onEscape() {
        const now = api.now(); escTimes = escTimes.filter(function (t) { return now - t < 4000; }); escTimes.push(now);
        if (escTimes.length >= 7) { lidClose(); return; }
        strip(LN.escape[escTimes.length - 1]);
      }
      function lidClose() {
        escTimes = []; lidOn = true; lidEl.hidden = false; api.achieve('typing-pool.escape'); st('escapes'); stopGhost(); dictStop(); strip(LN.escape[6]);
        api.clearTimeout(lidTimer);
        lidTimer = api.setTimeout(function () { lidOn = false; lidEl.hidden = true; strip(LN.escape[7]); say(LN.escape[7], { priority: 0 }); focusInp(); }, tm(7500, 1000));
      }
      function pasteGag(kind) {
        D.pasteCount++; st('paste'); const n = D.pasteCount; let line;
        if (n === 7) { api.award(-0.1, 'Paste Fee'); line = LN.paste[6]; if (phase === 'IDLE' || phase === 'TYPING') { slipLinesEl.textContent = ''; stampsEl.textContent = ''; addSlipLine(LN.paste[7]); } }
        else if (kind === 'cut') line = LN.paste[4]; else if (kind === 'drop') line = LN.paste[5]; else if (n <= 3) line = LN.paste[n - 1]; else line = nxA('pst', LN.paste.slice(8).concat([LN.paste[2], LN.paste[3]]));
        if (n === 7) say(line, { mood: 'confused' }); else strip(line);
      }
      function playerAct() {
        const now = api.now(), idle = (now - lastAct) / 1000 / TS;
        lastAct = now; stopGhost(); getwell.hidden = true; tog(pool, 'circle', false);
        if (idle >= 45 && !lidOn) say(idle >= 600 ? LN.idleBack[1] : idle >= 240 ? LN.idleBack[0] : LN.idle[8], { priority: idle >= 240 ? 1 : 0 });
        idleF = {};
      }
      function tick() {
        const now = api.now(), idle = (now - lastAct) / 1000 / TS;
        if (!hid() && now - lastAct < 20000 * TS) { D.lapSec++; D.played++; }
        if (wood && now > wood) { wood = 0; bellBtn.textContent = '🔔'; tog(bellBtn, 'wood', false); }
        if (hid() || lidOn) return;
        sessSec++;
        if (sessSec % 30 === 0) save();
        const f = idleF;
        if (idle >= 20 && !f.r20) { f.r20 = 1; const l20 = once.i20 ? nx('idle20') : LN.idle[0]; once.i20 = 1; if (!hush) sfx('bell'); restart(bellBtn, 'shake'); strip(l20); say(l20, { mood: 'disappointed' }); }
        if (idle >= 45 && !f.r45) { f.r45 = 1; say(LN.idle[1], { mood: 'confused' }); startGhost(); }
        if (idle >= 65 && !f.r65 && ghostId) { f.r65 = 1; strip(nx('pauline')); }
        if (idle >= 80 && !f.r80 && ghostId) { f.r80 = 1; strip(nx('pauline')); }
        if (idle >= 120 && !f.r120) { f.r120 = 1; say(nxA('i2', LN.idle2g.concat([LN.idle2[0], LN.idle2[1], LN.idle2[2], LN.idle2[3], LN.idle2[4]])), { mood: 'disappointed' }); }
        if (idle >= 200 && !f.r200) { f.r200 = 1; say(nxA('i2', LN.idle2g.concat([LN.idle2[0], LN.idle2[1], LN.idle2[2], LN.idle2[3], LN.idle2[4]])), { mood: 'confused' }); }
        if (idle >= 300 && !f.r300) { f.r300 = 1; say(LN.idle2[5], { mood: 'neutral' }); }
        if (idle >= 360 && !f.r360) { f.r360 = 1; say(LN.idle2[8], { mood: 'smug' }); }
        if (idle >= 420 && !f.r420) { f.r420 = 1; say(api.flag.get('hold-music.tenMinutes') ? LN.idle2[6] : LN.idle2[7], { mood: 'disappointed' }); }
        if (idle >= 600 && !f.r600) { f.r600 = 1; say(LN.idle2[9], { mood: 'proud' }); }
        if (idle >= 900 && !f.r900) { f.r900 = 1; say(LN.idle2[10], { mood: 'neutral' }); }
        if (idle >= 60 && !f.r60) { f.r60 = 1; if (phase === 'IDLE' || phase === 'TYPING') { slipLinesEl.textContent = ''; stampsEl.textContent = ''; addSlipLine(LN.idle[2]); } }
        if (idle >= 90 && !f.r90) { f.r90 = 1; api.achieve('typing-pool.idle'); say(LN.idle[3], { mood: 'disappointed' }); paulineFile(); }
        if (idle >= 180 && !f.r180) { f.r180 = 1; tog(pool, 'circle', true); getwell.textContent = LN.idle[6]; getwell.hidden = false; say(LN.idle[5], { mood: 'smug' }); }
        if (idle >= 480 && !f.r480) { f.r480 = 1; pend.missing = true; say(LN.idle[7], { mood: 'confused' }); }
        maybePause(now);
        const live = (phase === 'IDLE' || phase === 'TYPING') && !memo.special && pauseUntil <= now && !jamOn && !fireOn;
        if (live && phase === 'TYPING') maybeFire();
        if (live && !once.tue75 && sessSec >= 450 * TS) tuesdayIntercom();
        if (live && idle < 20 && now - lastBeat > 19000 * TS) strip(nx('ambient'));
        if (!hush && pauseUntil <= now && now - lastNews > 27000 * TS) { lastNews = now; news.textContent = nx('newsflash'); }
        if (live && !once.rev && sessSec >= 180 * TS) threeMin();
        if (live && !once.tenm && sessSec >= 600 * TS) tenMin();
      }
      /* the Fire Drill of Nothing: once, deep in the arc, mid-memo */
      function maybeFire() {
        if (fireOn || once.fire || !S || memo.stage < 6 || memo.nofix || lines.length - S.cur < 2 || !api.chance(0.04)) return;
        let typed = 0, total = 0; lines.forEach(function (ln, i) { typed += S.typed[i].length; total += ln.t.length; });
        if (typed < total * 0.4) return;
        once.fire = true; fireOn = true; fireChars0 = D.chars; pausedThisMemo = true; st('drills');
        const ms = tm(7500, 1000);
        bannerTxt.textContent = 'FIRE DRILL. PLEASE CONTINUE TYPING IN AN ORDERLY MANNER. DO NOT EVACUATE THE MEMO.'; banner.hidden = false;
        pauseRf.style.animationDuration = ms + 'ms'; restart(pauseRf, 'go');
        sfx('buzz'); restart(wrapEl, 'quake'); tog(pool, 'circle', true); typBtns.forEach(function (b, i) { later(function () { restart(b, 'wave1'); }, i * 150); });
        say(bannerTxt.textContent, { mood: 'panic', priority: 2 });
        api.setTimeout(function () {
          fireOn = false; banner.hidden = true; tog(pool, 'circle', false);
          const kept = D.chars - fireChars0 >= tm(15, 4);
          api.award(1, 'Fire Drill, Attended'); sfx('tada');
          say('The drill is over. The Pool was not on fire at any point. Certificates have been issued to the water.', { mood: 'proud' });
          if (kept) { api.achieve('typing-pool.fire'); api.confetti(); }
        }, ms);
      }
      /* 7 1/2 minutes in, Tuesday is announced and postponed to itself */
      function tuesdayIntercom() {
        once.tue75 = true; st('intercoms'); restart(lamp, 'flick');
        [0, 500, 1000].forEach(function (d) { api.setTimeout(function () { sfx('bell'); }, d); });
        signEl.textContent = 'ALL STAFF: TUESDAY IS ARRIVING. PLEASE REMAIN AT YOUR DESKS. PLEASE REMAIN AT YOUR DESKS.'; signEl.hidden = false;
        const slip2 = S && S.cur < lines.length && lineErr(S.cur) > 0;
        say(slip2 ? 'Tuesday has noticed the typo. Tuesday is not saying which one. Please remain at your desks.' : 'This is an announcement. It has been made twice, to be sure. Typing is allowed. Tuesday is not.', { mood: 'panic', priority: 2 });
        api.setTimeout(function () {
          signEl.hidden = true; api.award(7.5, 'Remained At Desk'); sfx('tada');
          say('Tuesday has been postponed to Tuesday. All staff are thanked for their composure.', { mood: 'proud' });
        }, tm(7500, 900));
      }
      function threeMin() {
        once.rev = true; st('reviews'); api.award(1.5, 'Three-Minute Tenure'); sfx('fanfare'); restart(lamp, 'flick');
        slipLinesEl.textContent = ''; stampsEl.textContent = ''; LN.reviewSlip.forEach(addSlipLine);
        say(LN.review[0], { mood: 'proud', priority: 2 });
        api.setTimeout(function () { say(LN.review[1], { mood: 'smug' }); }, tm(6000, 600));
        api.setTimeout(function () { say(LN.review[2], { mood: 'neutral' }); }, tm(13000, 1300));
      }
      function tenMin() {
        once.tenm = true; st('ceremonies'); api.award(2.5, 'Ten-Minute Ceremony'); sfx('tada'); api.confetti();
        stickyEl.textContent = LN.tenMin[0]; stickyEl.hidden = false; tog(pool, 'circle', true);
        typBtns.forEach(function (b) { restart(b, 'wave1'); });
        say(LN.tenMin[1], { mood: 'proud', priority: 2 });
        api.setTimeout(function () { say(LN.tenMin[2], { mood: 'smug' }); strip(LN.tenMin[3]); }, tm(8000, 800));
        api.setTimeout(function () { stickyEl.hidden = true; tog(pool, 'circle', false); }, tm(14000, 1400));
      }

      /* ---------- input wiring ---------- */
      function onKey(e) {
        if (e.isComposing || e.key === 'Process' || e.key === 'Dead' || e.key === 'Unidentified') return;
        if (e.ctrlKey || e.metaKey || e.altKey) { if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) strip(LN.misc[0]); return; }
        const k = e.key; if (!k || k === '`') return;
        if (k.length === 1) { e.preventDefault(); playerAct(); typeChar(k, 'you'); }
        else if (k === 'Enter') { e.preventDefault(); if (e.repeat) return; playerAct(); doReturn(); }
        else if (k === 'Backspace') { e.preventDefault(); playerAct(); doTape(); }
        else if (k === 'Escape') { playerAct(); onEscape(); }
        else if (k === 'Tab') { playerAct(); const t = api.now(); if (t - lastTabLine > 30000) { lastTabLine = t; strip(LN.misc[5]); } }
      }
      function onInput() {
        const v = inp.value;
        if (v === '') { playerAct(); doTape(); }
        else { const ins = v.split(ZW).join(''); if (ins) { playerAct(); for (let i = 0; i < Math.min(40, ins.length); i++) typeChar(ins.charAt(i), 'you'); } }
        inp.value = ZW;
      }
      api.on(inp, 'keydown', onKey);
      api.on(inp, 'input', onInput);
      api.on(document, 'keydown', function (e) {
        const t = e.target; if (!t || t === inp || e.defaultPrevented) return;
        const tag = String(t.tagName || '');
        if (/^(BUTTON|SELECT|A|INPUT|TEXTAREA)$/.test(tag) || t.isContentEditable) return;
        if (tag !== 'BODY' && tag !== 'HTML' && !root.contains(t)) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const k = e.key; if (!k || k === '`') return;
        if (k.length !== 1 && k !== 'Enter' && k !== 'Backspace' && k !== 'Escape') return;
        focusInp(); onKey(e);
      });
      [inp, paper].forEach(function (t) { ['paste', 'drop', 'cut'].forEach(function (ev) { api.on(t, ev, function (e) { e.preventDefault(); playerAct(); pasteGag(ev); }); }); });
      api.on(root, 'pointerdown', function () { playerAct(); });
      api.on(window, 'resize', function () { narrowCheck(); });
      api.on(document, 'visibilitychange', function () {
        if (hid()) { hiddenAt = api.now(); stopGhost(); dictStop(); }
        else {
          const t = api.now();
          if (hiddenAt) { lastAct += t - hiddenAt; hiddenAt = 0; } /* a hidden tab is not idling; nobody was there to be idle at */
          if (t - lastHiddenLine > 60000) { lastHiddenLine = t; strip(LN.idle[9]); }
        }
      });

      /* ---------- the pool never stops (except when it should) ---------- */
      let lastT = 0, waveX = 0;
      const bobEls = typBtns.concat([duckBtn]);
      function frame(ts) {
        if (!isFinite(ts)) ts = api.now();
        const dt = lastT ? clamp(ts - lastT, 0, 100) : 16; lastT = ts;
        if (!hid()) {
          const still = hush || api.now() < stillUntil || reduced();
          if (!reduced()) waveX = (waveX + dt * 0.02) % 20;
          const wx = waveX.toFixed(1) + 'px';
          water.style.setProperty('--m-typing-pool-wx', wx); waveEl.style.setProperty('--m-typing-pool-wx', wx);
          bobEls.forEach(function (b, i) { b.style.transform = still ? '' : 'translateY(' + (Math.sin(ts * 0.0022 + i * 1.7) * 3).toFixed(2) + 'px)'; });
        }
        api.requestAnimationFrame(frame);
      }

      /* ---------- go ---------- */
      if (D.loops > 0) hangEl.textContent = 'SCORE: 9.1 (RESOLVED: IT WAS THIS ONE)'; else hangEl.appendChild(h('span', 'stamp mint', null, 'RECEIVED'));
      addSlipLine('Awaiting first memo. The slip has been told to wait.');
      updateTape(); poolUpdate(false); renderArchive();
      startMemo(pickEntry()); started = true;
      api.requestAnimationFrame(frame);
      api.setInterval(tick, 1000);
      api.setTimeout(focusInp, 60);
      api.setTimeout(function () {
        let line;
        if (!D.greeted) line = LN.greet[0]; else if (D.lap > 1 && api.chance(0.5)) line = F(LN.greet[6], { n: D.lap }); else line = F(nxA('gr', [LN.greet[1], LN.greet[2], LN.greet[3], LN.greet[4], LN.greet[5]]), { n: D.memosTotal });
        D.greeted = true; say(line, { mood: 'proud' });
      }, 800);
      api.setTimeout(function () { sfx('bell'); restart(bellBtn, 'shake'); say(LN.bellSelf[0], { mood: 'smug' }); strip(LN.bellSelf[1]); }, 3000);
      narrowCheck();
      return { destroy() { save(); } };
    }
  });
})();
