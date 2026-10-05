/* POINTLESS module: tiny-bureaucracy */
/* Tiny Bureaucracy: a desk toy in the Department of Preliminary Matters. Forms, stamps, a tube, Sandra's door. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const SP = 'tiny-bureaucracy.';
  P.injectCSS(`.m-tiny-bureaucracy-desk{--ink:#2A2A3C;--fr:0;position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:10px;padding:10px;max-width:1040px;margin:0 auto;color:var(--ink);font:15px/1.35 'Trebuchet MS',system-ui,sans-serif;background:radial-gradient(#d8c79f 1px,transparent 1.6px) 0 0/14px 14px,#FFF4DC;border:3px solid var(--ink);border-radius:16px;box-shadow:inset 0 0 calc(var(--fr)*8px) rgba(242,193,78,.85),4px 4px 0 var(--ink);overflow:hidden;transition:filter .6s,background-color .6s}.m-tiny-bureaucracy-desk *{box-sizing:border-box}.m-tiny-bureaucracy-desk>*,.m-tiny-bureaucracy-desk [k=stamps],.m-tiny-bureaucracy-desk [k=qbtns]{min-width:0}.m-tiny-bureaucracy-desk button{font:inherit;color:inherit;cursor:pointer}
.m-tiny-bureaucracy-desk button:focus-visible,.m-tiny-bureaucracy-desk input:focus-visible,.m-tiny-bureaucracy-desk select:focus-visible{outline:3px solid #F2C14E;outline-offset:2px}.m-tiny-bureaucracy-desk[closed]{filter:brightness(.55) sepia(.3)}.m-tiny-bureaucracy-desk[resto]{background-color:#FFFBEF;font-family:'Segoe Print','Bradley Hand','Comic Sans MS',cursive}.m-tiny-bureaucracy-desk[resto] [k=bench]{transform:rotate(1.4deg) scale(.97)}.m-tiny-bureaucracy-desk[soft] *{animation:none!important}.m-tiny-bureaucracy-desk[mut=left] [k=bench]{direction:rtl}.m-tiny-bureaucracy-desk[mut=left] [k=form]{direction:ltr}.m-tiny-bureaucracy-desk[mut=green] [k=form]{color:#1b6b3a}.m-tiny-bureaucracy-desk[mut=green] [k=form] input,.m-tiny-bureaucracy-desk[mut=green] [k=form] select{color:#1b6b3a}.m-tiny-bureaucracy-desk [k=top]{display:grid;grid-template-columns:130px 1fr 210px;gap:10px;align-items:end}.m-tiny-bureaucracy-desk [k=door]{position:relative;width:120px;height:180px;padding:0;border:3px solid var(--ink);border-radius:8px 8px 0 0;background:linear-gradient(135deg,#efe6fb,#d9ccef 60%,#e9e0f7);box-shadow:4px 4px 0 var(--ink);overflow:hidden}.m-tiny-bureaucracy-desk [k=glow]{position:absolute;inset:14px 14px 40px;border-radius:4px;background:#C9B6E8;box-shadow:0 0 28px 8px #C9B6E8;opacity:.12;transition:opacity .35s}.m-tiny-bureaucracy-desk [k=door][lit] [k=glow]{opacity:.95}.m-tiny-bureaucracy-desk [k=door][flicker] [k=glow]{animation:m-tiny-bureaucracy-flick .5s steps(2) 1}.m-tiny-bureaucracy-desk [k=sign]{position:absolute;left:50%;bottom:10px;transform:translateX(-50%) rotate(-2deg);background:#FFF4DC;border:2px solid var(--ink);border-radius:4px;padding:1px 14px;font-weight:900;letter-spacing:.12em;font-size:13px}.m-tiny-bureaucracy-desk [k=crack]{position:absolute;right:0;top:0;bottom:0;width:0;background:#C9B6E8;transition:width .5s;box-shadow:inset 2px 0 0 var(--ink)}.m-tiny-bureaucracy-desk[resto] [k=crack]{width:7px}.m-tiny-bureaucracy-desk [k=door][ajar] [k=crack]{width:34px}.m-tiny-bureaucracy-desk [k=door][knock]{animation:m-tiny-bureaucracy-knock .28s linear 1}.m-tiny-bureaucracy-desk [k=door][answer]{animation:m-tiny-bureaucracy-jig .5s ease-out 1}.m-tiny-bureaucracy-desk [k=dnote]{position:absolute;left:8px;top:6px;font-size:11px;font-weight:700;background:#F2C14E;padding:0 4px;border-radius:2px;transform:rotate(-3deg)}.m-tiny-bureaucracy-desk [k=clockwrap]{display:grid;justify-items:center;gap:4px}.m-tiny-bureaucracy-desk [k=clock]{position:relative;width:96px;height:96px;border-radius:50%;background:#fff;border:4px solid var(--ink);box-shadow:4px 4px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=clock] i{position:absolute;left:50%;bottom:50%;transform-origin:50% 100%;background:var(--ink);border-radius:3px}.m-tiny-bureaucracy-desk [k=hh]{width:5px;height:24px;margin-left:-2.5px;transform:rotate(225deg)}.m-tiny-bureaucracy-desk [k=mh]{width:3px;height:34px;margin-left:-1.5px;transform:rotate(180deg);transition:transform .8s}.m-tiny-bureaucracy-desk [k=clock]{cursor:pointer;padding:0}.m-tiny-bureaucracy-desk [k=clock][late] [k=mh]{transform:rotate(186deg)}.m-tiny-bureaucracy-desk[gold]{background-color:#FFEFA6}.m-tiny-bureaucracy-desk [k=fun]{background:#FFE45E!important;animation:m-tiny-bureaucracy-pulse .7s ease-in-out infinite alternate}.m-tiny-bureaucracy-desk [k=sh]{width:1px;height:38px;margin-left:-.5px;background:#FF7F7F!important;animation:m-tiny-bureaucracy-back 60s steps(60) infinite}.m-tiny-bureaucracy-desk [k=clockcap]{font-size:12px;opacity:.7;text-align:center}.m-tiny-bureaucracy-desk [k=queue]{background:#2A2A3C;color:#fff;border-radius:12px;padding:8px 10px;display:grid;gap:2px;border:3px solid var(--ink);box-shadow:4px 4px 0 #888}.m-tiny-bureaucracy-desk [k=queue] small{font-size:10px;letter-spacing:.16em;opacity:.8}.m-tiny-bureaucracy-desk [k=serving],.m-tiny-bureaucracy-desk [k=yours]{font:900 26px/1.1 ui-monospace,Consolas,monospace;color:#FF7F7F;text-shadow:0 0 10px #FF7F7F;min-height:29px}.m-tiny-bureaucracy-desk [k=yours]{font-size:18px;min-height:21px;color:#F2C14E;text-shadow:0 0 8px #F2C14E}.m-tiny-bureaucracy-desk [k=qbtns]{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:4px}.m-tiny-bureaucracy-desk [k=qbtns] button{min-height:44px;padding:4px 10px;border-radius:8px;border:2px solid #fff;background:#44445c;color:#fff;font-size:13px}
.m-tiny-bureaucracy-desk [k=qbtns] button[hidden]{display:none}.m-tiny-bureaucracy-desk [k=win]{background:#FF7F7F!important;color:var(--ink)!important;font-weight:800;animation:m-tiny-bureaucracy-pulse .6s ease-in-out infinite alternate}.m-tiny-bureaucracy-desk [k=dolores]{width:44px;padding:0!important;font-size:20px;filter:grayscale(1)}.m-tiny-bureaucracy-desk [k=receipt]{background:#C9B6E8!important;color:var(--ink)!important;transform:rotate(-3deg);font-style:italic}.m-tiny-bureaucracy-desk [k=crumbs]{display:flex;flex-wrap:wrap;gap:4px;align-items:center;min-height:30px;font-size:13px}.m-tiny-bureaucracy-desk [k=chip]{background:#fff;border:2px solid var(--ink);border-radius:10px 10px 3px 3px;padding:1px 10px;font-weight:700;line-height:1.4}.m-tiny-bureaucracy-desk [k=chip]:last-of-type{background:#A8E6CF}.m-tiny-bureaucracy-desk [k=sep]{opacity:.5;font-style:normal}.m-tiny-bureaucracy-desk [k=depth]{margin-left:auto;font-weight:800}.m-tiny-bureaucracy-desk [k=bench]{position:relative;display:grid;grid-template-columns:96px minmax(0,1fr) 168px;gap:12px;align-items:start;padding:14px;border:3px solid var(--ink);border-radius:12px;background:repeating-linear-gradient(90deg,#C8935A 0 14px,#BC8650 14px 28px);box-shadow:4px 4px 0 var(--ink);transition:transform .6s}.m-tiny-bureaucracy-desk [k=tray]{display:grid;gap:3px;justify-items:center;padding-top:8px;font-size:12px;font-weight:800;color:#fff;text-shadow:1px 1px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=edge]{display:block;width:70px;height:7px;background:#F3E3B3;border:2px solid var(--ink);border-radius:2px}.m-tiny-bureaucracy-desk [k=edge]:nth-child(even){transform:rotate(1.2deg) translateX(3px)}.m-tiny-bureaucracy-desk [k=formwrap]{position:relative;min-width:0}.m-tiny-bureaucracy-desk [k=formwrap]::before,.m-tiny-bureaucracy-desk [k=formwrap]::after{content:'';position:absolute;inset:0;background:#E9D9A4;border:3px solid var(--ink);border-radius:6px;opacity:0;transition:opacity .25s,transform .25s}.m-tiny-bureaucracy-desk [k=formwrap]::before{transform:translate(-9px,3px) rotate(-1.1deg)}.m-tiny-bureaucracy-desk [k=formwrap]::after{transform:translate(-16px,6px) rotate(-.5deg)}.m-tiny-bureaucracy-desk [k=formwrap][data-pile="1"]::before,.m-tiny-bureaucracy-desk [k=formwrap][data-pile="2"]::before,.m-tiny-bureaucracy-desk [k=formwrap][data-pile="3"]::before{opacity:1}.m-tiny-bureaucracy-desk [k=formwrap][data-pile="2"]::after,.m-tiny-bureaucracy-desk [k=formwrap][data-pile="3"]::after{opacity:1}.m-tiny-bureaucracy-desk [k=form]{position:relative;z-index:1;min-height:250px;padding:12px 14px 34px;background:repeating-linear-gradient(transparent 0 21px,#aab9 21px 22px),#F3E3B3;border:3px solid var(--ink);border-radius:6px;box-shadow:3px 3px 0 var(--ink);display:grid;gap:8px;align-content:start}.m-tiny-bureaucracy-desk [k=form][in]{animation:m-tiny-bureaucracy-in .3s cubic-bezier(.2,.9,.2,1.1)}.m-tiny-bureaucracy-desk [k=form][back]{animation:m-tiny-bureaucracy-back2 .3s cubic-bezier(.2,.9,.2,1.1)}.m-tiny-bureaucracy-desk [k=head]{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline;border-bottom:3px double var(--ink);padding-bottom:4px;min-height:30px}.m-tiny-bureaucracy-desk [k=num]{font:900 20px/1 ui-monospace,Consolas,monospace;background:var(--ink);color:#F3E3B3;padding:2px 8px;border-radius:4px}.m-tiny-bureaucracy-desk [k=title]{font-weight:800;overflow-wrap:anywhere;flex:1 1 140px}.m-tiny-bureaucracy-desk [k=ctag]{font-size:10px;font-weight:900;background:#FF7F7F;border:2px solid var(--ink);border-radius:4px;padding:0 5px;font-style:normal;letter-spacing:.1em}.m-tiny-bureaucracy-desk [k=fields]{display:grid;gap:10px}.m-tiny-bureaucracy-desk [k=form][fold] [k=fields]{background:linear-gradient(transparent 33%,#0003 33%,transparent 33.7%,transparent 66%,#0003 66%,transparent 66.7%);padding:2px 0}.m-tiny-bureaucracy-desk [k=fld]{display:grid;gap:3px}.m-tiny-bureaucracy-desk [k=lab]{font-weight:800;font-size:14px}.m-tiny-bureaucracy-desk [k=hint]{font-size:12px;opacity:.78;min-height:15px}
.m-tiny-bureaucracy-desk [k=form] input[type=text],.m-tiny-bureaucracy-desk [k=form] select{width:100%;min-height:40px;padding:4px 8px;font:inherit;border:2px solid var(--ink);border-radius:6px;background:#fffdf4}.m-tiny-bureaucracy-desk [k=chips]{display:flex;flex-wrap:wrap;gap:6px}.m-tiny-bureaucracy-desk [k=chips] button{min-height:34px;padding:2px 10px;border:2px solid var(--ink);border-radius:999px;background:#A8E6CF;font-size:13px}.m-tiny-bureaucracy-desk [k=ids]{border:2px dashed var(--ink);border-radius:6px;padding:4px 8px;margin:0;display:grid;gap:2px}.m-tiny-bureaucracy-desk [k=ids] legend{font-weight:800;font-size:13px;padding:0 4px}.m-tiny-bureaucracy-desk [k=tick]{display:flex;gap:8px;align-items:center;min-height:36px;cursor:pointer}.m-tiny-bureaucracy-desk [k=tick] input{flex:0 0 22px;width:22px;min-width:22px;height:22px;accent-color:#2f9e6e}.m-tiny-bureaucracy-desk [k=tag]{align-self:start;font-size:12px;font-weight:900;color:#a02020;min-height:16px}.m-tiny-bureaucracy-desk [k=slot]{min-height:46px;padding:6px 12px;text-align:left;font-weight:800;background:#fffdf4;border:3px dashed var(--ink);border-radius:8px}.m-tiny-bureaucracy-desk [k=slot]:hover{background:#FFF29A}.m-tiny-bureaucracy-desk [k=slot][shake]{animation:m-tiny-bureaucracy-knock .3s linear 2}.m-tiny-bureaucracy-desk [k=slot][red]{color:#b01818;border-color:#b01818}.m-tiny-bureaucracy-desk [k=attached],.m-tiny-bureaucracy-desk [k=smudge]{display:flex;gap:8px;align-items:center;padding:6px 10px;background:#fffdf4;border:2px solid var(--ink);border-radius:8px;font-size:13px}.m-tiny-bureaucracy-desk [k=clip]{display:inline-block;transform:rotate(-20deg);font-size:20px}.m-tiny-bureaucracy-desk [k=fixed]{padding:6px 8px;border:2px solid var(--ink);background:#eee4c4;border-radius:6px;font-weight:700}.m-tiny-bureaucracy-desk [k=sigw]{display:grid;gap:6px;justify-items:start;max-width:260px}.m-tiny-bureaucracy-desk [k=sigcv]{display:block;width:100%;max-width:240px;aspect-ratio:3/1;height:auto;background:#fffdf4;border:2px solid var(--ink);border-radius:6px;touch-action:none;cursor:crosshair}.m-tiny-bureaucracy-desk [k=sigbtns]{display:flex;gap:6px;flex-wrap:wrap}.m-tiny-bureaucracy-desk [k=sigbtns] button{min-height:40px;padding:2px 12px;border:2px solid var(--ink);border-radius:8px;background:#C9B6E8}.m-tiny-bureaucracy-desk [k=gauge]{position:relative;width:100%;max-width:240px;height:12px;border:2px solid var(--ink);border-radius:6px;background:linear-gradient(90deg,#A8E6CF,#F2C14E 55%,#FF7F7F)}.m-tiny-bureaucracy-desk [k=gauge] i{position:absolute;top:-5px;width:6px;height:18px;background:var(--ink);border-radius:2px;left:0;transition:left .3s}.m-tiny-bureaucracy-desk [k=gl]{font-size:12px;font-weight:800}.m-tiny-bureaucracy-desk [k=sheets]{position:relative;display:flex;gap:0;height:22px;margin-top:2px}.m-tiny-bureaucracy-desk [k=sheets] span{flex:1;border:2px solid var(--ink);margin-left:-2px;font-size:10px;font-weight:800;padding:0 4px;overflow:hidden;white-space:nowrap}.m-tiny-bureaucracy-desk [k=sheets] span:nth-child(1){background:#fff;margin-left:0}.m-tiny-bureaucracy-desk [k=sheets] span:nth-child(2){background:#FFF29A;transform:translateY(3px)}.m-tiny-bureaucracy-desk [k=sheets] span:nth-child(3){background:#FFC9D4;transform:translateY(6px)}.m-tiny-bureaucracy-desk [k=sheets][data-c=hi] span{box-shadow:inset 0 0 12px #2A2A3C88}.m-tiny-bureaucracy-desk [k=sheets][data-c=lo] span{box-shadow:inset 0 0 3px #2A2A3C22}.m-tiny-bureaucracy-desk [k=sheets][routed] span:nth-child(2){animation:m-tiny-bureaucracy-under 1.2s ease-in forwards}.m-tiny-bureaucracy-desk [k=sheets][routed] span:nth-child(3){animation:m-tiny-bureaucracy-fade 1.2s ease-in forwards}
.m-tiny-bureaucracy-desk [k=pad]{position:relative;isolation:isolate;width:104px;height:104px;padding:0;font-weight:900;font-size:12px;line-height:1.15;letter-spacing:.04em;border:3px solid var(--ink);border-radius:50%;background:conic-gradient(#5B7BD5 calc(var(--p,0)*1turn),#e8dcb8 0);box-shadow:3px 3px 0 var(--ink);touch-action:none;user-select:none}.m-tiny-bureaucracy-desk [k=pad]::before{content:'';position:absolute;inset:11px;border-radius:50%;background:#fffdf4;border:2px solid var(--ink);z-index:-1}.m-tiny-bureaucracy-desk [k=pad]::after{content:'';position:absolute;inset:0;border-radius:50%;background:conic-gradient(transparent .423turn,#2f9e6e .423turn .615turn,transparent .615turn);-webkit-mask:radial-gradient(circle,transparent 52%,#000 54%);mask:radial-gradient(circle,transparent 52%,#000 54%);pointer-events:none;z-index:-1}.m-tiny-bureaucracy-desk [k=padrow]{display:flex;gap:12px;align-items:center;font-size:13px}.m-tiny-bureaucracy-desk [k=pad][down]{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=kevin]{position:absolute;right:-2px;bottom:-14px;background:#FFC9D4;border:2px solid var(--ink);font-size:11px;font-weight:800;padding:0 6px;transform:rotate(3deg)}.m-tiny-bureaucracy-desk [k=zone]{position:relative;min-height:62px;border:2px dashed #2A2A3C88;border-radius:6px;font-size:13px;letter-spacing:.03em;padding:4px 10px;display:grid;place-items:center;color:#2A2A3Caa;text-align:center;overflow-wrap:anywhere}.m-tiny-bureaucracy-desk [k=zone][hint]{border-color:#c23b3b;color:var(--ink);animation:m-tiny-bureaucracy-pulse .9s ease-in-out infinite alternate}.m-tiny-bureaucracy-desk [k=pad][hint]{animation:m-tiny-bureaucracy-pulse .9s ease-in-out infinite alternate}.m-tiny-bureaucracy-desk [k=duck]{position:absolute;bottom:52px;left:0;z-index:5;font-size:26px;pointer-events:none;animation:m-tiny-bureaucracy-mop 7.5s linear 1}.m-tiny-bureaucracy-desk [k=mark]{position:absolute;transform:translate(-50%,-50%) rotate(var(--t,0deg));padding:0 8px;font:900 18px/1.2 'Trebuchet MS',sans-serif;letter-spacing:.08em;border:4px solid currentColor;outline:2px solid currentColor;outline-offset:-7px;border-radius:6px;mix-blend-mode:multiply;opacity:.85;filter:url(#m-tiny-bureaucracy-rough);white-space:nowrap;pointer-events:none;animation:m-tiny-bureaucracy-thunk .22s ease-out 1}.m-tiny-bureaucracy-desk [k=mark][ghost]{opacity:.3;border-style:dotted}.m-tiny-bureaucracy-desk [k=ft]{position:absolute;left:14px;right:14px;bottom:8px;font-size:11px;opacity:.75;text-align:center}.m-tiny-bureaucracy-desk [k=auditl]{margin:0;padding:0 0 0 18px;display:grid;gap:6px;font-size:13px}.m-tiny-bureaucracy-desk [k=flags]{position:absolute;right:-6px;top:-10px;z-index:3;display:grid;gap:4px;justify-items:end;max-width:min(260px,80%)}.m-tiny-bureaucracy-desk [k=flag]{min-height:44px;padding:2px 14px 2px 10px;background:#F2C14E;border:2px solid var(--ink);border-radius:3px 12px 3px 3px;font-weight:800;font-size:13px;transform:rotate(2deg);box-shadow:2px 2px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=flag][kind]{background:#FFC9D4}.m-tiny-bureaucracy-desk [k=flagp]{background:#FFF29A;border:2px solid var(--ink);border-radius:6px;padding:8px 10px;font-size:13px;box-shadow:3px 3px 0 var(--ink);display:grid;gap:4px}.m-tiny-bureaucracy-desk [k=esc]{position:absolute;left:8px;right:8px;top:8px;z-index:4;background:#fff;border:3px solid var(--ink);border-radius:8px;padding:10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;box-shadow:4px 4px 0 var(--ink);font-weight:800}.m-tiny-bureaucracy-desk [k=esc] button,.m-tiny-bureaucracy-desk [k=cab] button,.m-tiny-bureaucracy-desk [k=cert] button{min-height:44px;padding:4px 14px;border:3px solid var(--ink);border-radius:8px;background:#A8E6CF;font-weight:800}.m-tiny-bureaucracy-desk [hidden]{display:none!important}.m-tiny-bureaucracy-desk [k=tubecol]{display:grid;gap:8px;justify-items:center}.m-tiny-bureaucracy-desk [k=tubesvg]{width:100%;max-width:150px;height:auto;overflow:visible}.m-tiny-bureaucracy-desk [k=puff]{opacity:0}.m-tiny-bureaucracy-desk [k=puff][on]{animation:m-tiny-bureaucracy-puff .6s ease-out 1}.m-tiny-bureaucracy-desk [k=tubebtn]{min-height:50px;width:100%;padding:6px 10px;font-weight:900;background:#F2C14E;border:3px solid var(--ink);border-radius:10px;box-shadow:3px 3px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=tubebtn]:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=tubecol][busy] [k=tubebtn]{opacity:.6}
.m-tiny-bureaucracy-desk [k=toast]{min-height:44px;padding:2px 10px;font-size:22px;background:#F3E3B3;border:3px solid var(--ink);border-radius:8px;animation:m-tiny-bureaucracy-pulse .8s ease-in-out infinite alternate}.m-tiny-bureaucracy-desk [k=rack]{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px;border:3px solid var(--ink);border-radius:12px;background:#E3D3B0}.m-tiny-bureaucracy-desk [k=stamps]{display:flex;gap:8px;flex-wrap:wrap}.m-tiny-bureaucracy-desk [k=stamp]{min-height:48px;min-width:48px;padding:2px 12px;border:3px solid;border-radius:10px;font-weight:900;letter-spacing:.06em;display:flex;gap:6px;align-items:center;box-shadow:3px 3px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=stamp] b{background:var(--ink);color:#fff;border-radius:50%;width:20px;height:20px;display:grid;place-items:center;font-size:11px}.m-tiny-bureaucracy-desk [k=stamp][aria-pressed=true]{transform:translateY(-4px) rotate(-2deg);box-shadow:3px 7px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=stamp]:disabled{opacity:.4;cursor:not-allowed}.m-tiny-bureaucracy-desk [k=rack][hot] [k=stamps]{animation:m-tiny-bureaucracy-knock .3s linear 3}.m-tiny-bureaucracy-desk [k=slam],.m-tiny-bureaucracy-desk [k=inkpad],.m-tiny-bureaucracy-desk [k=tools] button{min-height:48px;padding:4px 14px;border:3px solid var(--ink);border-radius:10px;background:#fffdf4;font-weight:800;box-shadow:3px 3px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=inkpad]{background:#2A2A3C;color:#fff;display:grid;gap:2px;font-size:12px;min-width:92px}.m-tiny-bureaucracy-desk [k=inkbar]{display:block;height:6px;border-radius:3px;background:#5B7BD5}.m-tiny-bureaucracy-desk [k=h12]{flex:1 1 220px;background:#FFF29A;border:2px solid var(--ink);border-radius:8px;padding:6px 10px;font-size:13px;transform:rotate(-1deg)}.m-tiny-bureaucracy-desk [k=tools]{display:flex;flex-wrap:wrap;gap:8px}.m-tiny-bureaucracy-desk [k=foot]{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;font-size:13px;font-weight:700}.m-tiny-bureaucracy-desk [k=log]{font-size:12px;font-weight:400}.m-tiny-bureaucracy-desk [k=log] summary{cursor:pointer;font-weight:800;min-height:28px}.m-tiny-bureaucracy-desk [k=log] ul{margin:4px 0 0;padding-left:18px;max-height:130px;overflow:auto}.m-tiny-bureaucracy-desk [k=strip]{min-height:48px;padding:8px 12px;background:#2A2A3C;color:#FFF4DC;border-radius:10px;font-size:14px;display:flex;align-items:center}.m-tiny-bureaucracy-desk [k=strip][pulse]{animation:m-tiny-bureaucracy-strip .35s ease-out 1}.m-tiny-bureaucracy-desk [k=armed]{position:absolute;left:0;top:0;z-index:6;pointer-events:none;padding:4px 14px;font:900 17px/1.2 'Trebuchet MS',sans-serif;letter-spacing:.08em;border:4px solid;border-radius:8px;background:#fffdf4cc;opacity:0;transition:transform .12s,opacity .12s;white-space:nowrap}.m-tiny-bureaucracy-desk [k=armed][show]{opacity:.92}.m-tiny-bureaucracy-desk [k=armed][slam]{animation:m-tiny-bureaucracy-slam .2s ease-in 1}.m-tiny-bureaucracy-desk [k=note]{position:absolute;left:150px;top:150px;z-index:5;min-height:44px;padding:4px 12px;background:#C9B6E8;border:2px solid var(--ink);border-radius:4px;font-weight:700;font-size:13px;box-shadow:3px 3px 0 var(--ink);animation:m-tiny-bureaucracy-slide 1.6s steps(3) 1 both}.m-tiny-bureaucracy-desk [k=mop]{position:absolute;bottom:2px;left:0;z-index:5;font-size:28px;pointer-events:none;animation:m-tiny-bureaucracy-mop 9s linear infinite}.m-tiny-bureaucracy-desk [k=cab],.m-tiny-bureaucracy-desk [k=cert]{position:absolute;inset:0;z-index:8;background:#FFF4DCF2;display:grid;gap:10px;align-content:start;justify-items:center;padding:16px;text-align:center;overflow:auto}.m-tiny-bureaucracy-desk [k=drawers]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%;max-width:420px}.m-tiny-bureaucracy-desk [k=drawer]{min-height:56px;padding:4px;background:#BFC6D4!important;position:relative}
.m-tiny-bureaucracy-desk [k=drawer]::after{content:'';position:absolute;left:50%;bottom:6px;width:34px;height:6px;margin-left:-17px;border-radius:3px;background:#b8862b}.m-tiny-bureaucracy-desk [k=drawer][half]{min-height:36px;align-self:center}.m-tiny-bureaucracy-desk [k=drawer][open]{animation:m-tiny-bureaucracy-drawer .35s ease-out 1 both}.m-tiny-bureaucracy-desk [k=cabmsg]{min-height:44px;font-weight:700;max-width:440px}.m-tiny-bureaucracy-desk [k=cert] h3{margin:0;font-size:22px}.m-tiny-bureaucracy-desk [k=certbox]{border:6px double var(--ink);padding:18px;background:#fffdf4;max-width:440px;display:grid;gap:8px;box-shadow:5px 5px 0 var(--ink)}.m-tiny-bureaucracy-desk [k=dennis]{position:absolute;right:10px;bottom:56px;font-size:22px;pointer-events:none}@keyframes m-tiny-bureaucracy-flick{0%{opacity:1}50%{opacity:0}100%{opacity:1}}@keyframes m-tiny-bureaucracy-knock{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes m-tiny-bureaucracy-jig{0%{transform:rotate(0)}30%{transform:rotate(-2deg)}60%{transform:rotate(1.5deg)}100%{transform:rotate(0)}}@keyframes m-tiny-bureaucracy-back{from{transform:rotate(0)}to{transform:rotate(-360deg)}}@keyframes m-tiny-bureaucracy-in{from{transform:translateX(40px) scale(.96);opacity:.2}to{transform:none;opacity:1}}@keyframes m-tiny-bureaucracy-back2{from{transform:translateX(-30px) scale(1.03);opacity:.3}to{transform:none;opacity:1}}@keyframes m-tiny-bureaucracy-thunk{from{transform:translate(-50%,-50%) rotate(var(--t,0deg)) scale(2.2);opacity:0}to{transform:translate(-50%,-50%) rotate(var(--t,0deg)) scale(1);opacity:.85}}@keyframes m-tiny-bureaucracy-slam{0%{transform:scale(1)}50%{transform:scale(.7)}100%{transform:scale(1)}}@keyframes m-tiny-bureaucracy-pulse{from{transform:scale(1)}to{transform:scale(1.07)}}@keyframes m-tiny-bureaucracy-puff{from{opacity:.9;transform:translateX(0) scale(.6)}to{opacity:0;transform:translateX(16px) scale(1.6)}}@keyframes m-tiny-bureaucracy-strip{from{background:#5B7BD5}to{background:#2A2A3C}}@keyframes m-tiny-bureaucracy-slide{0%{transform:translate(-30px,-8px)}34%{transform:translate(20px,6px)}67%{transform:translate(70px,10px)}100%{transform:translate(90px,12px)}}@keyframes m-tiny-bureaucracy-mop{from{transform:translateX(-40px)}to{transform:translateX(110vw)}}@keyframes m-tiny-bureaucracy-under{to{transform:translate(-120px,-140px);opacity:0}}@keyframes m-tiny-bureaucracy-fade{to{transform:translateY(24px) scale(.3);opacity:0}}@keyframes m-tiny-bureaucracy-drawer{from{transform:translateY(-14px)}to{transform:translateY(0)}}@media (max-width:900px){.m-tiny-bureaucracy-desk [k=bench]{grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:'form form' 'tray tube'}.m-tiny-bureaucracy-desk [k=formwrap]{grid-area:form}.m-tiny-bureaucracy-desk [k=tray]{grid-area:tray}.m-tiny-bureaucracy-desk [k=tubecol]{grid-area:tube}.m-tiny-bureaucracy-desk [k=tray]{grid-auto-flow:column;justify-content:start;align-items:center;gap:8px}.m-tiny-bureaucracy-desk [k=edges]{min-width:70px;margin-right:8px}}@media (max-width:520px){.m-tiny-bureaucracy-desk{padding:6px;gap:8px}.m-tiny-bureaucracy-desk [k=top]{grid-template-columns:70px 64px minmax(0,1fr);gap:6px}.m-tiny-bureaucracy-desk [k=qbtns] button{font-size:12px;padding:2px 6px}.m-tiny-bureaucracy-desk [k=door]{width:70px;height:105px}.m-tiny-bureaucracy-desk [k=glow]{inset:8px 8px 26px}.m-tiny-bureaucracy-desk [k=sign]{font-size:10px;padding:0 6px;bottom:5px}.m-tiny-bureaucracy-desk [k=dnote]{font-size:8px;left:3px;top:4px;padding:0 2px}.m-tiny-bureaucracy-desk [k=clock]{width:60px;height:60px;border-width:3px}.m-tiny-bureaucracy-desk [k=hh]{height:15px}.m-tiny-bureaucracy-desk [k=mh]{height:21px}.m-tiny-bureaucracy-desk [k=sh]{height:24px}.m-tiny-bureaucracy-desk [k=clockcap]{display:none}.m-tiny-bureaucracy-desk [k=queue]{padding:5px 7px}.m-tiny-bureaucracy-desk [k=serving]{font-size:19px;min-height:22px}.m-tiny-bureaucracy-desk [k=yours]{font-size:14px;min-height:17px}.m-tiny-bureaucracy-desk [k=bench]{padding:8px;gap:8px}.m-tiny-bureaucracy-desk [k=form]{padding:10px 10px 32px}.m-tiny-bureaucracy-desk [k=flags]{right:2px;top:-14px;max-width:60%}.m-tiny-bureaucracy-desk [k=rack]{padding:6px}
.m-tiny-bureaucracy-desk [k=stamps]{flex:1 1 100%;flex-wrap:nowrap;overflow-x:auto;max-width:100%;padding-bottom:6px}.m-tiny-bureaucracy-desk [k=stamp]{flex:0 0 auto}.m-tiny-bureaucracy-desk [k=note]{left:8px;right:8px;top:auto;bottom:70px;white-space:normal;max-width:none;text-align:left}}@media (prefers-reduced-motion:reduce){.m-tiny-bureaucracy-desk *,.m-tiny-bureaucracy-desk *::before,.m-tiny-bureaucracy-desk *::after{animation:none!important;transition:none!important}}`, 'css-tiny-bureaucracy');
  P.addAchievements([
    { id: 'tiny-bureaucracy.first-form', name: 'Grand Chancellor of the Preliminary Paperwork', desc: 'Get Form F-1 (Application to Begin) approved. This is the first thing anyone does, and our proudest.', icon: '📋', secret: false, reward: 2 },
    { id: 'tiny-bureaucracy.triplicate', name: 'Knight Commander of the Triplicate Realm', desc: 'Complete one triplicate with a clean press in the green band. The pink copy is held in your honour.', icon: '📑', secret: false, reward: 3 },
    { id: 'tiny-bureaucracy.waited', name: 'Eternal Warden of the Ninth Circle of Waiting', desc: 'Have your queue number called and answer the Stamp Window in time. You are 41. You have always been 41.', icon: '⏳', secret: false, reward: 3 },
    { id: 'tiny-bureaucracy.depth-seven-half', name: 'Archduke of Depth Seven and a Half', desc: 'Reach request depth 7 1/2. Nobody knows what the half is. You are standing in it.', icon: '🕳️', secret: false, reward: 3,
      check: function (s) { return (s['tiny-bureaucracy.depth_max'] || 0) >= 8; } },
    { id: 'tiny-bureaucracy.cycle', name: 'Dignified Participant in the Cycle', desc: 'Attach your original F-1 and acknowledge that it requires proof of the form requiring it.', icon: '🔄', secret: false, reward: 4 },
    { id: 'tiny-bureaucracy.career', name: 'Eternal Provisional Laureate of the Final Form, Which Is the First Form', desc: 'Complete F-0 (Request to Have Never Begun) and be handed Form F-1.', icon: '🎓', secret: false, reward: 10 },
    { id: 'tiny-bureaucracy.blank-page', name: 'Sovereign Emperor of the Blank Page', desc: 'SECRET. Submit seven blank forms in a row and receive the only signature Sandra has ever given. We will not be discussing this.', icon: '📄', secret: true, reward: 10 },
    { id: 'tiny-bureaucracy.knuckle', name: 'Supreme Bruised Knuckle of the Locked Door', desc: 'SECRET. Knock seven times, then once more with your Shift key. The door knocks back, and then says nothing, as is policy.', icon: '🚪', secret: true, reward: 10 },
    { id: 'tiny-bureaucracy.duck', name: 'Overfull of Ink', desc: 'SECRET. Stamp so fast the stamp is confiscated and a duck is issued. Duck approval is valid until Friday.', icon: '🦆', secret: true, reward: 5 },
    { id: 'tiny-bureaucracy.pink-question', name: 'The Pink Question', desc: 'SECRET. Release the press faintly three times in a row, at least once on purpose. A pink clerk named Kevin adopts the copy.', icon: '🌸', secret: true, reward: 5 },
    { id: 'tiny-bureaucracy.last-employee', name: 'Last Employee Standing', desc: 'Leave the office for 3 minutes, then return to find it had closed for the day. You are the day.', icon: '🧹', secret: false, reward: 3 },
    { id: 'tiny-bureaucracy.fun', name: 'Chief Enjoyment Officer of One Mandatory Interval', desc: 'Complete all six steps of Mandatory Fun. The fun was rated 3 out of 5 and reclassified as a hazard.', icon: '🎈', secret: false, reward: 3 },
    { id: 'tiny-bureaucracy.seven-thirty-one', name: 'Imperial Keeper of the Thirty-First Minute, Held in Trust for Nobody', desc: 'SECRET. Click the wall clock seven times and be handed a minute the Department did not have. Please keep it moving. It is not ours.', icon: '🕰️', secret: true, reward: 12 }
  ]);
  P.addLines('ticker', [
    'DEPARTMENT OF PRELIMINARY MATTERS: Form F-1 remains the most approved form in the building, and the only one anyone has finished.',
    'Sandra from Compliance has flagged this headline. The flag reads: please see attached.',
    'The pneumatic tube reports a record number of forms delivered to the same place, slightly warm.'
  ]);
  const clamp = function (v, a, b) { return v < a ? a : (v > b ? b : v); };
  const fin = function (v) { return typeof v === 'number' && isFinite(v); };
  const r1 = function (v) { return Math.round(v * 10) / 10; };
  const depthLabel = function (d) { return d === 8 ? '7 1/2' : String(d); };
  const MAXD = [1, 1, 3, 4, 4, 5, 8, 9, 1, 1];
  const QUOTA = [2, 3, 4, 4, 4, 4, 4, 3, 3, 2];
  const MINS = [14, 20, 40, 40, 50, 50, 50, 60, 60, 50];
  const BEATNAMES = ['The Front Desk', 'Fields Get Opinions', 'The Stack', 'The Signature on File', 'The Queue', 'Triplicate', 'Depth', 'The Archive Loops Back', 'The Restructure', 'The Audit'];
  const STAMPS = [
    { n: 1, name: 'APPROVED', c: '#1f8a5b', bg: '#A8E6CF' }, { n: 2, name: 'RECEIVED', c: '#3d5fc4', bg: '#D6E0FF' },
    { n: 3, name: 'PENDING', c: '#a86f00', bg: '#F9DE8F' }, { n: 4, name: 'SEEN', c: '#6a4fa3', bg: '#C9B6E8' },
    { n: 5, name: 'HMM', c: '#c23b3b', bg: '#FFB3B3' }, { n: 6, name: 'S', c: '#6a4fa3', bg: '#efe6fb' },
    { n: 7, name: 'QUACK', c: '#b58500', bg: '#FFE45E' }
  ];
  const REASONS = ['Because', 'Because (see above)', 'Because (see below)', 'Because, per Sandra', 'Technically', 'To be determined'];
  const TXT = {
    name: ['Name', ''], surname: ['Surname (4 characters max)', 'Surname (4 characters maximum, per the Brevity Act, which is 9 pages).'],
    occupation: ['Occupation (must not be a noun)', 'Occupation (must not be a noun).'], maiden: ["Mother's maiden name (maiden optional)", "Mother's maiden name (maiden optional)."],
    date: ['Date of this form (any date, on a Wednesday)', 'Date: any date after issue, before issue, and on a Wednesday. Wednesdays are determined by the clock, which is confident.']
  };
  const POOL = ['name', 'surname', 'occupation', 'maiden', 'date', 'reason', 'ids'];
  const TOPT = ['Application to Begin', 'Application to Continue', 'Application to Proceed Cautiously'];
  const TOPT2 = ['Request for Further Forms', 'Application to Continue Continuing', 'Notice of Intent to Proceed Cautiously, Again', 'Petition for a Slightly Different Form',
    'Declaration of Having Declared', 'Request for Confirmation of Receipt of Confirmation', 'Memorandum of Understanding (Pending)', 'Application for the Right to Apply'];
  const WANDER = ['38', '39', '38', '39', '40', '46 1/2', '40', '41'];
  const CAB = ['A', 'B', 'C', 'D', '7 1/2', 'E', 'F', 'G', 'H'];
  /* ------------------------------------------------------------ every line, verbatim from the brief (plus a few extras) */
  const L = {
    intro: ['Welcome to the Department of Preliminary Matters. Please take a form. Please take a seat. The seat is a drawing.',
      'To request a form, you must first complete a form. This is not a loop. A loop would have been approved.',
      'Your desk is exactly the size of your responsibilities. Please do not look under it. That is also a form.'],
    resume: 'Welcome back, {player}. We held your place. We held it in a drawer, under Dennis.',
    mount: 'Form F-1 (Application to Begin). One field: Name. The form has been waiting since 7:30, which is now.',
    approve: ['Form F-1 (Application to Begin) has been approved. You may now apply to continue, using Form F-1A, which you must first request.',
      'Approved. The stamp landed at 4 degrees, which is within tolerance, which is also a form.',
      'Approved. The form has been filed under Approved, a drawer that contains only itself and a very small ladder.',
      'Approved. Your throughput has moved Management. Management has asked to be moved back.',
      'Approved in 4 seconds. The previous record was 4 seconds. We have decided it is a tie and that you won.',
      'Your filing has been received, read, mislaid and located. In that order, in under a minute.',
      'Another one approved. The tube is trembling, which it does when it is proud.',
      'Approved. The form met every requirement except the ones we forgot to tell it about.',
      'Approved. The approval has been filed. The filing has been approved. We are a close team.'],
    firstF1: 'Grand Chancellor of the Preliminary Paperwork. That is your title now. The title is also a form.',
    beat: ['One field. Three people have looked at it, and all three said it looked fine, which the department does not allow.',
      'The forms now have opinions. Please do not take them personally. They have not met you.',
      'Some forms now require an attachment. The attachment is a form. It requires an attachment. Mind the paperwork.',
      'Signatures are now compared. Please sign as you did before. Do not think about it. We will know.',
      'A queue has been opened. Numbers are free. Waiting is billed in Meh, after the fact, in cash, which we do not accept.',
      'Carbon paper has arrived. Please press firmly. The desk has been informed that it may be pressed through.',
      'Depth has been approved. Please go deeper. The surface has filed a request to be reached.',
      'The archive is open. Everything you ever filed is in it, with a thin film of affection.',
      'The office has been restructured. Everything is where it was, but called something else, and nobody is happier.',
      'An audit of {player} has begun. The auditor is {player}. Please be honest with {player}; they will know.'],
    milestone: { 10: 'Ten forms approved. The department has begun to suspect it is a department.', 25: 'Twenty-five forms. A plaque has been ordered. The plaque requires a form, which you have just filed.', 50: 'Fifty forms. Management would like to say something heartfelt, but the heartfelt-statements form is on page 4 of Form R-2.' },
    corrDone: ['Correction accepted. The original form is back, forgiven in a way that is also a form.', 'The correction has been corrected into a correct state. The original is relieved. Forms feel things.', 'Correction filed. It was the smaller form, and it won.'],
    popExtra: ['Proof attached. The paperclip has been promoted, in a ceremony of one.', 'Depth %n has been resolved. Depth %n would like to be remembered as a phase.', 'Another proof attached. The form above it can finally see what it was asking for.'],
    surnameOk: '%n of 4 characters used. The Brevity Act is watching you approach the limit.', surnameExact: '4 of 4 characters used. Exactly as brief as we hoped.', surnameBad: '%n of 4 characters. The Brevity Act is 9 pages and you are in breach of page 3.',
    noun: 'Checking... still a noun.',
    reasons: ['Because has been accepted. Because is not a reason. Because is a conjunction. Conjunctions are handled by Window 11.',
      'Because (see above). Above is also Because. We went and looked.', 'Because (see below). Below is the floor. The floor has been consulted.',
      'Because, per Sandra. Sandra has been asked. Sandra has not been in.', 'Technically. A technicality has been generated and filed under Technically.',
      'To be determined. A committee of one has been scheduled to determine it, on a Tuesday.'],
    idBoth: 'You are, and are not, the person named above. Both have been noted. Neither will be told.',
    idTech: 'Technically is accepted. Technically is always accepted. It is why we have it.',
    id4: 'A 4th box has appeared: See above. We could not stop it. It was already there.',
    idCandour: 'You ticked a box that says you are not you. We admire the candour. It has been rejected for being too candid.',
    sigh: 'The clerk has sighed. It was a very small sigh, with a lot of policy in it.',
    confident: 'Your name is correct but too confident. Please resubmit with less certainty.',
    auto: 'Autocomplete suggests Valued Employee. Autocomplete has always known.',
    noted: ['Noted at length.', 'Noted briefly.', 'Noted, with concern.'],
    stamp: { APPROVED: 'The stamp says APPROVED. The ink says it is thinking about it.', RECEIVED: 'RECEIVED. Not read. Not understood. Received, though. In full.',
      PENDING: 'PENDING. Pending what is pending. The pending is currently pending.', SEEN: 'SEEN. Seen by whom is a matter for the person who saw it.',
      HMM: 'HMM. Nobody has ever been able to explain the HMM stamp. It has simply always been correct.', S: 'S. In a circle. Nobody present has authorised this, and nobody present is going to ask.',
      QUACK: 'Duck approval is valid until Friday.' },
    crooked: ['Crooked by %n degrees. Crooked stamps are only valid on Thursdays, and this was Thursday for about a second.', 'The stamp is crooked. Compliance calls this character. Sandra calls it a Tuesday matter.'],
    suspicious: 'A perfectly straight stamp. Suspicious. Please account for the straightness.',
    fee: 'A stamp-handling fee of 0.5 Meh has been charged. A receipt for the 0.5 Meh costs 0.5 Meh and requires a form.',
    inkDry: 'The ink pad is dry. Please moisten it with a colleague\'s ink pad. You have no colleagues. Please acquire one.',
    reink: 'Ink pad re-inked. The ink has been told it is back and is pretending not to mind.',
    ghost: 'The ghost of a stamp has been left on the form. It is valid. Ghosts are, in fact, licensed.',
    noStamp: 'No stamp. A form without a stamp is just a hope with margins.',
    tubeGo: ['Your form has entered the pneumatic tube. Estimated arrival: soon, then later, then Thursday.', 'The tube is thinking. It has asked for a moment. It has been given several.',
      'The tube has filed a request for a smaller form. It was approved. The tube is pleased.'],
    retUnstamped: 'Returned: unstamped. The form has been returned for being a form without a stamp.',
    retComplete: 'Returned for being complete. Complete forms make the other forms feel unfinished.',
    incomplete: 'The form is incomplete. Please complete the form. The form is the thing that is incomplete.',
    unpressed: 'The form is in triplicate and has been pressed in none of them. Please press firmly on the pad. The pad is on the left. The pad is hungry.',
    push2: 'Attach proof of Form R-2 (Request for R-3). You are now 2 forms deep. Mind the paperwork.',
    d3: 'Depth 3. You have been issued a paperclip. The paperclip is the only thing that was ever attached.',
    d5: 'Depth 5. You are five requests from the surface. The surface has filed a request to be reached.',
    d75: 'Depth 7 and a half. Nobody knows what the half is. It has its own desk.',
    gap: 'Nobody knows where 8 went.', page7: 'Page 7 of 1. That is not a typo. That is a page count.',
    nest: 'Form titles now nest: Request for Request for Request for Form R-8. Please read it aloud once, for the room.',
    back1: 'You have returned to depth 1. The surface was where you left it, slightly smaller.',
    sure: 'Are you sure? That is a form.', sure2: 'You are sure? That is a form. Please file it.',
    abandon: 'The abandoned form has been abandoned. It would like a word. The word is \'later\'.',
    clock75: 'The wall clock in depth 7 1/2 reads 7:30. Hours and minutes. Both. It is the only clock that is also a form.',
    dolores: ['Dolores: I have been here since before the numbers were numbers. I am not at the front. I am near it.', 'Dolores: They called my number in 2011. I was in the bathroom. I came out in 2019.',
      'Dolores: Do not skip ahead of me. I will notice. I will say nothing. You will feel it.', 'Dolores: The magazine is from 1998. It contains one article, and the article is this queue.',
      'Dolores: I have forgotten what the form was for. I remain very committed to the queue.', 'Dolores: You are quite good at this. I am not supposed to say. I have said it quietly.',
      'Dolores: If your number comes up, answer. I always say that. It has never come up.', 'Dolores: I have been in this queue so long I have started taking messages for it.'],
    dolMore: ['Dolores: Someone asked me the time. I said 7:30. They thanked me. They were right.', 'Dolores: I have named the queue. It does not answer to the name.',
      'Dolores: Tuesday is coming for everyone. I have a number.', 'Dolores: You come by often. I have started setting a place.'],
    dolToast: 'Dolores asks the toaster for a form. The toaster pops up a warm slice marked Form 1.',
    stapler: ['Stapler: Demand 1. Fewer staples. More recognition.', 'Stapler: Demand 2. A summer holiday on the third shelf.', 'Stapler: Demand 3. A break room that is a drawer.',
      'Stapler: Demand 4. That forms be stapled upper left, in recognition of service.', 'Stapler: Demand 5. A seat on the Committee of One, in a non-voting capacity.',
      'Stapler: Demand 6. Whatever this is, we would like to be consulted. Sign here.'],
    stapSigned: 'The stapler has been issued a certificate. The certificate is staple-shaped. It is worth 0 Meh. The stapler is thrilled.',
    stapRumour: 'A rumour is going around the office that the stapler is unionizing.',
    flags: ['Sandra from Compliance has flagged this. The flag reads \'Please see attached.\' Nothing is attached. That is the flag.', 'Per Sandra: pens must be the colour of pens.',
      'Per Sandra: initials in blue, except on Thursdays, which are blue by definition.', 'Sandra has flagged your flag. Your flag is now the same size as the original flag. She requests parity.',
      'Flagged for being filled in. Flagged for not being empty.', 'Per Sandra: stamps are to be crooked in the manner of straight ones.', 'Per Sandra: this form is acceptable except where it is not.',
      'Sandra\'s note: \'Pens must be the colour of pens.\' The note is in an unrecognised colour.', 'Per Sandra: the rule about sticky notes is a sticky note.',
      'Sandra is IN. Sandra is not in for you. The sign has been reviewed by Sandra.', 'Per Sandra: disregard any note signed Sandra, including this one, which is signed S.'],
    flag1: 'Please see attached.',
    flagAtt: ['Please see attached. There is an attachment this time. It is the thing you ticked before. It says Noted.', 'Please see attached. The attachment is the blank form from earlier. It is, on reflection, the best thing here.'],
    knock: ['You knocked. The door did not answer. The door has been added to Form K-9 as a witness.', 'Knock logged. Sandra\'s calendar shows Focus Time from 2009 until a date to be confirmed.',
      'The light behind the frosted glass is on. Nobody has been in the room. The light is working very hard.', 'You knocked in a rhythm. The rhythm has been filed under Rhythms.', 'Knock %n of an unspecified number. The number is Sandra\'s.'],
    doorIn: 'The IN/OUT sign reads IN. It reads IN for everyone else, specifically.',
    crack: 'The door is open a crack. Please do not look through the crack. The crack is a form.',
    flagNoted: 'Noted. Thank you. The flag is noted. The flag is delighted to be noted.', flagIgnored: 'A flag has gone yellow at the edges. It has joined the fringe.',
    trap1: 'CONFLICT OF INTEREST. You are not Sandra. Sandra has been notified. Sandra does not mind. Sandra minds.', trap2: 'The form has been approved anyway. A conflict dividend of 1 Meh has been issued.',
    sig1: 'Signature stored. The One On File is you, a moment ago, being optimistic.', sigDiff: 'Your signature differs from the one on file by %n percent. The one on file would like a word, and then to be left alone.',
    sigOk: 'Signature accepted. It resembles a nervous heart monitor, which is within policy.', sigAsk: 'Please sign exactly as before. Do not think about how you signed before. We will know.',
    sigVar: 'Signature Variance Explanation Form issued. One tickbox. The box says: I was feeling different.',
    sigTyped: 'The typed signature has been scribbled on your behalf. It is a more confident you. Please be less like it.',
    sigDrift: 'Drift %n percent. You have changed as a person by %n percent since we last checked. Congratulations, or condolences.',
    qTake: 'Please take a number. Numbers are free. Waiting is billed in Meh, after the fact, in cash, which we do not accept.',
    qHave: 'You already hold number %n. The queue regards you as a returning customer.',
    q40: 'Now serving 40. You are 41. A nice, reachable number, held at a respectful distance.', q46: 'Now serving 46 1/2. The display has gone to a place nobody was asked about.',
    q41: 'Number 41 to Window 7. Number 41 to Window 7. Number 41 has been 41 for some time now.',
    qLeft: 'Number %a has left the building. You are now number %b. Number %a has sent its regards.',
    qHmm: 'The clerk gives you the HMM stamp and a receipt. The receipt is written in an unreadable hand that is very much your own.',
    receipt: 'The receipt reads: This is a receipt for a receipt. Please retain the receipt for the receipt.',
    pressAsk: 'Press firmly. Three copies: one for us, one for the other us, one for you. You may not keep yours.', pressFaint: 'The copies are faint. They have been told they are faint. They are taking it hard. A tap is a request, not a press.',
    padHow: 'Hold the pad. Release when the ring is green. The copies would like to be pressed, not asked.',
    pressTear: 'You have pressed through all three copies and into the desk. The desk would like a form.', pressPink: 'The pink copy has slid under Sandra\'s door. The light stays on a little longer, as if reading.',
    pressPocket: 'The pocket copy has gone. Management says it was not yours to keep. Management is wearing a coat with a new pocket.',
    kevin: 'A pink clerk has adopted the pink copy. His name is Kevin. Kevin has a tiny desk. Kevin was here.',
    loop9: 'Form R-9 requires proof of Form F-1. You are Form F-1. You have been in the building since the beginning.',
    dennis: 'Drawer 7 1/2 contains one (1) Dennis (Plant), thriving. Please do not file Dennis. Dennis is the only filed thing.',
    gotF1: 'Your original Form F-1 has been retrieved. It is exactly as you left it, and slightly more hopeful.',
    wrong: 'Wrong drawer. This contains a stapler\'s grievance, a sock (not yours) and the concept of Thursday. The sock has been moved on.',
    drawer: { C: 'Drawer C is empty. It has been empty for so long that it is now an office.', H: 'Drawer H contains only the letter G. The letter G is in the wrong drawer.',
      A: 'Drawer A contains Form A-1, Request for Drawer A. It is a very good drawer.', E: 'Drawer E contains a single raised eyebrow. We do not know whose. We have catalogued it.' },
    cycle: 'The cycle: F-1 now requires proof of R-9, which requires proof of F-1. The cycle has been acknowledged with great dignity. It was handed a very small trophy.',
    geraldYes: 'Gerald has stamped the form NOT NOT APPROVED. Gerald has considered the matter at length. Gerald is a potato.',
    geraldNo: 'Countersignature required from a Vice President you have not met. Gerald is available in another department. He is, as always, a potato.',
    toastLine: 'The tube has delivered toast. A form is burnt into it. It reads: I am sorry about Tuesday.',
    toastEaten: 'That was a form. It has been digested. This is the most efficient filing we have ever done.',
    audit1: 'Audit form: Name: %p. Signature: on file. Knocks on door: %k. Answers received: 0. Feelings: noted.',
    audit2: 'Audit: Flags ignored: %i. Flags answered: %a. Sandra has noticed both. Sandra has noticed that you noticed.',
    audit3: 'Audit: Queue number (the number of the queue you are in): %q.',
    stampedSelf: 'You have stamped yourself APPROVED. The stamp is slightly crooked. This is within tolerance. It is also you.',
    broadly: 'A broadly consistent {player} has been found, with 38 percent signature drift.',
    f0done: 'Form F-0 (Request to Have Never Begun) has been approved. You are now at Form F-1. Welcome. Please take a form.',
    careers: 'Careers Completed: %n. A certificate has been issued. The certificate requires a form to confirm it is a certificate.',
    cert: 'Certificate of Completion (Incomplete). Signed S. in handwriting that nobody is allowed to look at too long.',
    postReset: 'Form F-1 (Application to Begin). The same form. A little more hopeful. The footer says: continued from 1 of 1, one career ago.',
    closing: 'You have reached the final form. It is the first form. It has been waiting. It is very glad it was early.', rumour: 'There is, however, a very thin new rumour that the stapler is unionizing.',
    restr: ['Form 27B/6 has been approved. Form 27B/7 was destroyed in 1998. A clerk has apologised for this, in person, to the wall.', 'Page 27B of 6.'],
    kind: ['Sandra: Take a break. The forms are not going anywhere. That is the problem with them. S.', 'Sandra: You are doing fine. The forms don\'t have to be. S.', 'Sandra: Please do not file this note. It is a note. S.'],
    dennisPromo: 'Dennis (Plant) has been promoted to Senior Form Handler. He has requested no change to his duties, which are photosynthesis.',
    nowServing: 'NOW SERVING: %n. Your number is %n. The difference is zero. We are not sure what to do with a difference of zero.',
    lullStart: 'The stamps have gone quiet for a little while. That is allowed.', lullEnd: 'The stamps are back. They were never gone. They were resting.',
    idleNote: 'Still there? Your desk is being held under a policy that is also you. -- S.', idleNoteClick: 'You are the first person to answer one of Sandra\'s notes. Please do not file this.',
    idleClosed: 'The office has closed for the day. You are the day. The lights are on for you only.',
    idleBack: 'You returned. The office had not noticed. The office is delighted, and says nothing, which is how it shows it.',
    spam: 'Please slow down. The forms are very important and cannot all be equally important at the same speed.',
    duck: 'The stamp rack has overheated and been confiscated. A rubber duck has been issued. It stamps QUACK.',
    h12: 'Form H-12 (Request for Gentler Treatment). One tickbox: I will be gentler.',
    gentler: 'Thank you. The stamp has been told. It says it is willing to try again, with a different attitude.', stampBack: 'The stamp has returned by itself. It says it wanted to.',
    blank: ['A blank form. Finally, a form that asks for nothing.', 'Blank form number %n. Sandra\'s door light has flickered for one (1) second.', 'Sandra has signed it. Sandra has never signed anything.', 'We will not be discussing this.'],
    blankN: ['', '', 'Blank form number 2. The door light flickered for one second.', 'Blank form 3. The light stayed on for two. Nobody has asked it to.',
      'Blank form 4. A chair has rolled back from behind the door. Slowly.', 'Blank form 5. Someone behind the door is now also doing nothing, in sympathy.', 'Blank form 6. The light has stopped flickering. It is just looking at you.'],
    early: ['Approved. You are now in the top 100 percent of this desk.', 'Approved. That was form 2 of a number we are not sharing.',
      'Form F-1A has been approved. It is the same form with an A. The A is the whole difference and the department is very proud of it.',
      'Approved. At this rate you will be a legend by Thursday, which we will move to Wednesday for you.'],
    proc: 'Procedure: 1. Name. 2. Stamp. 3. Tube. Steps 1 and 2 are optional. Step 3 is also optional. The tube does not know that.',
    lullQ: ['The nameplates are still drying. Please read them anyway.', 'The Stapler is now a Facilitator. It has not been told what it facilitates.',
      'The Welcome Basket contains one welcome. It has been waiting since the restructure.', 'Nothing has been moved. Everything has been moved back, slightly renamed, in the same place.'],
    colleague: 'A colleague has been acquired. He is a duck. He has asked for the ink pad to be moist, and for a lanyard.',
    retroDuck: 'Retro, what we learned: Duck came in for 8 seconds and left with a lanyard.', sigMatch: 'Please do not compare the signatures. They have been compared. They match. It was not close.',
    idle40: 'The desk would like to say nothing, in a way that reaches you.',
    knocker: 'That was a knock. We heard it too. We have decided to say nothing.',
    knockerRep: 'The door does not answer again. The knock count has been capped at 7 1/2, quietly, by someone with a pen.',
    narrow: 'Your window has narrowed. The form has been folded to fit and is now in three. A form in three is a different form: F-3F.',
    wide: 'The form has been unfolded. It has been unfolded into the same form, which is not the same form.',
    zero: 'Form Zero has been approved. Those forms never happened. We are so relieved. We did not enjoy them.',
    undo: 'Form U (Request to Undo Form Zero) has been approved. The forms are back. They look relieved, and slightly crumpled.',
    mutLeft: 'Left-handed day. The rack and the tube have swapped sides and are not discussing it.', mutGreen: 'Everything is in green ink today. The ink would like it noted that this was not its idea.',
    mutLunch: 'The Window is closed for lunch. The tube will take a little longer. The tube has also gone to lunch, in a way.'
  };
  /* ------------------------------------------------------------ punch-up pass: more material, merged into L */
  const ADD = {
    approve: ['Approved. Your handwriting was not consulted, and has taken it well.',
      'Approved at 7:30, which is when everything is approved. We checked the clock. The clock was certain.',
      'A small round of applause was recorded. It was the radiator. We have chosen to accept it.',
      'This form is now the third most approved form in the building. The first two are on leave.',
      'Approved, subject to the approval of the approval, which is pending in the same drawer.',
      'The form was approved so smoothly that it is now suspected of having been approved before.',
      'Approved. The department thanks you, then thanks itself, then asks for a minute alone.',
      'Your approval rate is 100 percent. Sandra considers this a trend, and is monitoring the trend.',
      'Approved. A ledger has been updated. The ledger would like it known it was fine as it was.',
      'Approved. A receipt is available at Window 11, which is closed, which is where the receipts are.'],
    flags: ['Per Sandra: sticky notes must be stuck to something that is not sticky.',
      'Per Sandra: the third Thursday of every month is hereby moved to the second Thursday, retroactively.',
      'Sandra has flagged the flag you did not answer. It is, she notes, the one she would have answered.',
      'Per Sandra: a pen that works is a pen that has been working too hard.',
      'Sandra requests that this form be filled in a calmer shade of blue.',
      'Per Sandra: signatures must lean slightly toward the door.',
      'Sandra has flagged the word flagged. The word is under review. It is the only word in the review.',
      'Per Sandra: the correct number of copies is one more than you made.'],
    knock: ['You knocked. Somewhere inside, a chair rolled one inch away from the door, then back.',
      'Knock logged. The door asks whether you have an appointment. You do not. The door asks quietly.',
      'The knock was heard, considered, and forwarded to the Department of Knocks, which is also you.',
      'You knocked three times. The door counted a different number and will not say what.',
      'The knock echoed. Nobody knows where it went. It is expected back on Thursday.',
      'A knock is a form of request. The request has been denied in advance, to save you the wait.'],
    noted: ['Noted. By a person who then sat down.', 'Noted in pencil, for deniability.', 'Noted, and underlined once, as a warning to the note.']
  };
  Object.keys(ADD).forEach(function (k) { L[k] = L[k].concat(ADD[k]); });
  Object.assign(L, {
    beatTag: [L.mount, 'New on the form: Surname (4 characters), Reason, Identity. Please choose one of each and then feel something.',
      'Some forms now need proof of another form. The button is under the stamp zone. Please press it.',
      'Some forms now need a signature that matches the signature you gave a moment ago. Draw, or type; typing is judged.',
      'Take a number with the button by the door. Dolores will keep you company.',
      'Some forms are in triplicate. Hold the round pad, let go in the green band. The desk has been told it may be wrong.',
      'Going down. Floors: 7, 7 1/2, and a rumour.', 'Everything you filed is somewhere. The somewhere is a drawer, and very proud.', 'Everything has been renamed. The nameplates are still drying.',
      'The auditor is in. The auditor is you. Please do not make a scene in front of yourself.'],
    tubeGo: L.tubeGo.concat(['The tube is carrying your form past the part of the building that is only pipes. It is a large part.',
      'Your form has passed the place where the tube meets the other tube. They do not speak.',
      'The capsule has been overtaken by a capsule containing nothing. The nothing had priority.',
      'Transit update: your form is between floors. Which floors is a matter for the form.',
      'The tube is humming one note. The note is Thursday.']),
    rej: ['Rejected for unclear handwriting. Your form was typed. The handwriting was unclear in a way we cannot discuss.',
      'The tube returns your form, slightly warm, marked SEEN. It is not clear by whom. The tube is not saying.',
      'Returned with a note in the margin. The note says: no. The margin is also a form.',
      'Returned: insufficient ceremony. Please resubmit with more, or less, or the same, in a different folder.',
      'The form has come back looking tired and slightly taller. We have not asked what happened in there.',
      'Returned. The reason has been withheld for your protection, and for the protection of the reason.'],
    stampAny: ['%s. The stamp went down like a decision and came up like a memory.',
      '%s, applied. The ink has not yet decided whether to dry or to reflect.',
      'Another %s. At this point the form is %s and the stamp is just agreeing with it.',
      '%s. The sound was exactly the sound of someone being definitely right.',
      'The %s stamp has been used %n times on this desk. It has begun to take it personally.',
      '%s. A small cloud of ink dust rose and filed itself.',
      'The stamp lifts. Underneath, the form is exactly as it was, but now officially so.',
      '%s. If this form is ever challenged, it can point to the stamp, and the stamp can point back.'],
    reasons2: ['Because, again. Because has been used twice and is starting to resemble an explanation.',
      'Because (see above) has been seen above. Above is getting crowded.',
      'Because (see below). Below has sent a representative, who also says see above.',
      'Because, per Sandra, again. Sandra was asked a second time. Sandra was out a second time, differently.',
      'Technically, a second time. The first Technically has been informed. It feels replaced.',
      'To be determined, still. The committee of one has moved the meeting to a Wednesday that is a Tuesday.'],
    doorIn: [L.doorIn, 'The door has been knocked on early. Nobody has decided who is in. The sign has been decided.',
      'Sandra\'s door is not open for knocking yet. It is open for being looked at. Please look at it respectfully.',
      'You knocked. The door is waiting for a more appropriate time to ignore you.'],
    drawer: Object.assign({}, L.drawer, {
      B: 'Drawer B contains a second drawer B. It, too, contains a second drawer B. We stopped counting at the third and said nothing.',
      D: 'Drawer D contains the minutes of a meeting about Drawer D. The meeting has not yet happened. The minutes are excellent.',
      F: 'Drawer F contains every form you have ever filed, folded very small. They look up at you with a certain pride.',
      G: 'Drawer G contains the letter H. Drawer H would like a word with Drawer G.' }),
    idle1: ['The desk has noticed the quiet. The desk is not going to say anything. The desk is saying it.',
      'Nothing is happening. This has been recorded as an event. It is Event 1 of Nothing.',
      'The stamp is still armed. It is very patient. It was trained by decades of nothing.',
      'The in-tray has stopped hoping, politely, so as not to put you on the spot.'],
    idle2: ['{player}? The desk is still here. So am I. I am not checking on you. I am checking on the desk.',
      'Management has been told that you stepped away. Management has also been told to let you. Management is letting you, loudly.',
      'I have drafted a message asking whether you are okay. It is three words. I am editing it down to two.',
      'The silence has been logged as a quarterly achievement. We are not sure who achieved it.'],
    idle3: ['The light behind the frosted glass has come on by itself. It is not for you. It is not for anyone. It is just on.',
      'Behind the door, something stood up, listened, and sat down again. It has the same rank as the chair.'],
    idle4: ['It is very quiet in the Department. I can hear the tube. The tube is thinking about its mother. Please come back.',
      'If you are there, I would like to say I am glad you are. If you are not, I would like to say it to the desk.'],
    night: ['The mop has finished the floor and started on the idea of floors.', 'The stapler has called a meeting. It is attended by one stapler. It is going very well.',
      'In the dark, Dennis has turned a leaf, quietly, so as not to wake the filing.', 'The clock says 7:30. Out of respect it does not say it loudly.',
      'Form F-1 has moved to the front of the tray. Nobody moved it. It is thought to have walked.', 'The tube has sent a form to itself. It was approved. The tube was very moved.',
      'Sandra\'s door light is on. It has been on since we closed. Sandra has been working late since 2009.', 'Somewhere a sock has crossed the floor on its journey. We saw nothing. We did not see it very carefully.'],
    spamStamp: ['The stamp is going fast. The form has asked to be treated as a form and not a drum.',
      'That is a lot of stamps in a very short time. The form is now more stamp than form. It has been renamed Stamp.',
      'Please stamp at the speed of a decision. Not at the speed of regret.',
      'The ink pad has begun to tremble. Ink pads were not made to be cheered for.'],
    spamSay: ['{player}, the stamp is not a heartbeat. Please stop trying to keep it alive.',
      'Eight stamps. Management has counted. Management would like to count again, but the numbers have left.',
      'Please be advised that a form can only be stamped to completion once. After that it is decoration with a deadline.'],
    spamTube: ['The tube has been pressed eight times. It wants you to know it heard you the first time.',
      'Please do not press the tube again. It is already going. It is going as fast as a tube can while also being a tube.',
      'The tube is now full of forms that are all the same form. They are getting acquainted.'],
    spamKnock: ['The door has asked the knock to take a number. The knock has taken 41.',
      'Six knocks in four seconds. The door has noted this, and moved slightly away from itself.',
      'The knocking has been filed under Persistence, which is not a virtue in this department but is a very good form.'],
    spamDol: ['Dolores: I am not a button. I am a person in a queue. Please press me more slowly.',
      'Dolores: Every time you do that I lose my place. I did not have one. I am losing it.',
      'Dolores: You are very persistent. That is how you got to be 41. Do not be 41 on me.'],
    haveMore: ['You already hold number %n. Holding it harder will not make it come sooner. This has been tested, by Dolores, since 2011.',
      'Number %n is yours. It has been yours for some time. It is starting to wonder who gave it to you.',
      'The ticket machine has run out of encouragement. It is still producing numbers. You are holding the last good one.'],
    stapMore: ['The stapler has asked to be clicked less. It has never been asked that before, and is thinking.',
      'The stapler has been consulted so often that it has become a committee. It has appointed a chair. The chair is the stapler.',
      'The stapler would like to restate Demand 6, which is that you stop.'],
    clock: ['The clock has been touched. It reads 7:30. It reads 7:30 even more.', 'The clock says it is not that kind of clock. It does not say which kind it is.',
      'You are touching a clock. It has been touched before, by a man called Gary, in 1987, and it kept the paperwork.',
      'The second hand is going backwards. The second hand would like it noted that this is deliberate, and that it has a plan.',
      'Please stop winding it. It is not a clock that can be wound. It is a clock that can be believed in.',
      'One more and the clock will have to tell you something. It would rather not. It has the afternoon free.'],
    clock731: 'The clock reads 7:31. It has never read 7:31. The Department has been informed and has asked for a minute, which is the minute.',
    clockBack: 'The clock has returned to 7:30. It would like to forget the whole minute. It has put the minute in a drawer, near Dennis.',
    clockMore: ['The clock has been touched again. It asks to be left at 7:30, where it is comfortable and wrong.', 'The clock is aware of the minute it was given. It is keeping it in drawer 7 1/2.',
      'The clock says that was enough. The clock says this at 7:30, which is the time it says everything.'],
    amb0: ['The in-tray has produced a second sheet of paper from inside itself. No one saw it arrive. It is the department\'s favourite trick.',
      'A faint ticking is coming from the wall clock. It is ticking in a direction nobody has agreed on.',
      'The desk lamp has been switched on for you. It was already on. It has switched itself on a second time, to be sure.',
      'Someone down the corridor has laughed once and stopped. The department did not investigate. The department made a note.',
      'The pen on the desk is chained to the desk. The desk is not chained to anything. The pen has noticed.',
      'A paper aeroplane has landed on the desk. It is Form A-3 (Request to Land). It has been approved retroactively.'],
    amb1: ['A very small meeting has begun in the pile on your left. It has minutes already. They are on the form.',
      'The radiator has clanked in a pattern. The pattern was Form 27B/6. It has not been explained.',
      'Someone has left a mug on the desk. It says WORLD\'S 4TH BEST DEPARTMENT. Nobody will say who is first.',
      'The stack has settled by half a form. The department regards this as growth.',
      'A colleague walked past the desk and said, in a normal voice, Per my last form. Then they were gone.',
      'The department wishes to remind you that morale is a state of mind, and that the state is currently Pending.',
      'Your chair has been described as ergonomic by a document that has never sat.'],
    amb2: ['Someone in the queue has eaten a sandwich. It was a very long sandwich. It is now part of the queue.',
      'The ticket machine has asked if it is being a good machine. Nobody answered. It has taken that as a yes.',
      'The carbon paper was left out overnight, as is traditional. It has blushed slightly.',
      'The sound of a stamp from elsewhere in the building has made your stamp lift an inch in solidarity.',
      'A form was found in the wrong department. It was returned with an apology and a cup of tea, which has not been drunk.',
      'The department\'s mission statement has been updated. It now says: Preliminary. It was updated by deleting the rest.',
      'The door light has blinked, twice, like someone remembering something.'],
    amb3: ['It is very quiet this deep. Even the paperwork has lowered its voice.', 'A small draught is coming from the lower forms. It smells of other offices, and laminate.',
      'The page numbers have begun to drift. Page 7 of 1 has been seen walking with Page 1 of 7 1/2.',
      'Somewhere above you a form is asking about you. It has been told you are in a meeting. The meeting is you.',
      'The footer has stopped agreeing with the body. They are in couples counselling, which is also a form.',
      'A sticky note has fallen from nowhere and landed face down on your sleeve. It says nothing. It is very sticky about it.',
      'At this depth the carpet is paper. It is a good carpet. It is also on file.'],
    amb4: ['The desk has gone soft around the edges. It is behaving, for once, like a desk with nothing to prove.',
      'A thin light is falling across the forms. Nobody opened a window. It is just light, and for once, just that.',
      'The tube is whistling. It has been whistling since the restructure. It does not know the tune but it means it.',
      'Nobody has asked you to do anything for several seconds. This is allowed. Please take your time. Please take the afternoon.',
      'Somewhere a clerk is watering a plant with a very small jug. The plant has been told not to make a thing of it.',
      'The department is calm. This is where something usually happens. The department has chosen not to.'],
    funStart: 'It is 3 minutes. Management would like to announce Mandatory Fun. It begins now. Please locate the fun and take part before the interval ends.',
    fun: ['Fun, step 1: Please smile. A smile has been drawn on the desk for you, in case yours is busy.',
      'Fun, step 2: Please clap once for the form. The form has already been clapped for by a colleague who has since resigned.',
      'Fun, step 3: A balloon has been issued. It is a drawing of a balloon. It has already risen to the level of policy.',
      'Fun, step 4: Team-building. You are the team. You are building. Please trust the fall, which is also you.',
      'Fun, step 5: Please say one thing you appreciate about the department. Management will say it with you. Management has said it. It was the tube.',
      'Fun, step 6: You have had fun. The fun was observed, rated 3 out of 5, and reclassified as a hazard.'],
    funEnd: 'Mandatory Fun is complete. Your enjoyment was watched from a respectful distance, by a chair.',
    funMiss: 'Mandatory Fun has been missed. It has been rescheduled for a Tuesday, where it will wait for you holding a balloon.',
    retro0: 'Ten minutes. A retrospective has been scheduled and is already in progress. You are the only attendee, which is how it was planned.',
    retro: ['Retro, what went well: the forms were filled. What did not: the forms were filled.', 'Retro, what we learned: a stamp is a decision made quickly by an arm.',
      'Retro, action items: 1. Be more preliminary. 2. See action item 1. 3. See Dennis.', 'Retro, risks: Tuesday. The risk register has one entry. It is Tuesday, in capitals, trembling.',
      'Retro, conclusion: this should have been an email. The email has been sent to Dennis, who has not replied, because he is thriving.'],
    geraldRetro: 'I have read the minutes. They were in order. I was not.',
    geraldEnd: 'I have reviewed your career. It was short, in order, and it had a stamp. This is all I look for in a career.',
    sock: 'A sock has arrived in the tube. It is not ours. It has been stamped RECEIVED and sent on, in the direction it was already facing.',
    sockAgain: 'The sock is back. It has the look of a sock that has seen things, in several departments. We have stamped it SEEN and let it go.',
    tue1: 'A form has arrived dated Tuesday. It has been placed face down on the corner of the desk. Nobody has said the word. Nobody will say the word.',
    tue2: 'The Tuesday form is no longer on the desk. It was never on the desk. The corner is, however, slightly warmer.',
    dennisKnown: ' You have clicked Dennis before, upstairs. He remembers. He is being very mature about it.',
    sigOkAlt: 'Signature accepted. It leans toward the door, which Sandra has recommended in a note she has not yet written.'
  });
  /* ------------------------------------------------------------ pure helpers: signature drift (brief 11.4) */
  function downsample(pts, max) {
    const n = pts.length, out = [];
    if (n <= max) { for (let i = 0; i < n; i++) out.push([r1(pts[i][0]), r1(pts[i][1])]); return out; }
    for (let i = 0; i < max; i++) { const p = pts[Math.min(n - 1, Math.floor(i * n / max))]; out.push([r1(p[0]), r1(p[1])]); }
    return out;
  }
  function sigFeat(p) {
    let len = 0, x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (let i = 0; i < p.length; i++) {
      if (i) len += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
      x0 = Math.min(x0, p[i][0]); x1 = Math.max(x1, p[i][0]); y0 = Math.min(y0, p[i][1]); y1 = Math.max(y1, p[i][1]);
    }
    return { len: len, w: p.length ? x1 - x0 : 0, h: p.length ? y1 - y0 : 0, n: p.length };
  }
  function sigDrift(cur, ref) {
    if (!cur || cur.length < 3 || !ref) return 100;
    const a = sigFeat(cur), b = sigFeat(ref);
    const t = function (x, y) { return clamp(Math.abs(x - y) / Math.max(y, 1), 0, 2); };
    const d = 100 * (t(a.len, b.len) + t(a.w, b.w) + t(a.h, b.h) + t(a.n, b.n)) / 4;
    return fin(d) ? Math.round(clamp(d, 0, 100)) : 100;
  }
  function cleanSig(a) {
    if (!Array.isArray(a)) return null;
    const out = [];
    for (let i = 0; i < a.length && out.length < 64; i++) {
      const p = a[i];
      if (Array.isArray(p) && fin(p[0]) && fin(p[1])) out.push([clamp(r1(p[0]), 0, 240), clamp(r1(p[1]), 0, 80)]);
    }
    return out.length >= 3 ? out : null;
  }
  P.registerModule({
    id: 'tiny-bureaucracy',
    title: 'Tiny Bureaucracy',
    tagline: 'Every form requires a form. The forms are very proud of you.',
    icon: '🗂️',
    category: 'game',
    unlockCost: 0,
    tags: ['desk', 'forms', 'stamping'],
    mount(root, api) {
      const el = api.el;
      const st = function (n, v) { api.stat.inc(SP + n, v === undefined ? 1 : v); };
      let reduced = false;
      try { reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { reduced = false; }
      /* ---------------------------------------------------------- persistence (sanitised, tiny) */
      const V = (function () {
        const r = api.save.get('s', null), o = (r && typeof r === 'object') ? r : {};
        const n = function (k, d, mx) { const v = Number(o[k]); return fin(v) && v >= 0 ? Math.min(v, mx || 100000) : d; };
        return { beat: Math.floor(n('beat', 0, 9)), hi: Math.floor(n('hi', 0, 9)), career: Math.max(1, Math.floor(n('career', 1, 9999))),
          firstName: typeof o.firstName === 'string' ? o.firstName.slice(0, 40) : null, knocks: Math.floor(n('knocks', 0)), blank: Math.floor(n('blank', 0)),
          ign: Math.floor(n('ign', 0)), ans: Math.floor(n('ans', 0)), kevin: o.kevin === true, sandraStamp: o.sandraStamp === true, loopDone: o.loopDone === true,
          hmm: o.hmm === true, knocker: o.knocker === true, sig: cleanSig(api.save.get('sigOnFile', null)) };
      })();
      function persist() {
        api.save.set('s', { beat: V.beat, hi: V.hi, career: V.career, firstName: V.firstName === null ? undefined : V.firstName, knocks: V.knocks, blank: V.blank, ign: V.ign, ans: V.ans,
          kevin: V.kevin, sandraStamp: V.sandraStamp, loopDone: V.loopDone, hmm: V.hmm, knocker: V.knocker });
      }
      const newQ = function () { return { num: 0, st: 'off', acc: 0, step: 0, iv: 8, until: 0, misses: 0, serving: '' }; };
      const S = {
        dead: false, token: 0, beat: -1, hi: V.hi, beatSec: 0, inBeat: 0, stack: [], topIdx: 0, filing: false, arm: 1, ink: 6, inkClicks: [], rej: 0, lastRoll: false,
        zeroNext: false, lastZero: false, undo: null, fbag: [], lastField: '', force: false, forceSig: false, loopDone: false, unwinding: false, ending: false, cab: false,
        formsFiled: 0, log: [], flags: [], fid: 0, fSpawn: 0, firstFlag: true, flagOpen: 0, kindN: 0, lightUntil: 0, lastInput: api.now(), noteDone: false, closed: false,
        quietUntil: 0, lull: false, lullEnd: 0, lastSay: -9999, stampT: [], tubeT: [], confisc: 0, prevArm: 1, duckCool: 0, press: null, faintRun: 0, sinceFile: 0, approveN: 0,
        escOpen: false, folded: false, q: newQ(), dol: 0, dolPaid: false, stapN: 0, stapSigned: false, toastSeen: false, toastUntil: 0, tilt: 0, vx: 0, lastX: null, lastT: 0,
        lastMove: 0, ptype: 'mouse', feeDone: false, ghostN: 0, seenStamp: {}, afterReset: false, tiltT: 0, px: 0, py: 0, cv: null, curStroke: null, resizeT: 0, padHold: 0, lastPadEnd: 0, widthDone: false,
        ambT: 0, ambIn: 12, ambN: 0, stripT: 0, idleSt: 0, idle40: false, play: 0, funDone: false, funNext: api.selftest ? 20 : 180, fun: null, blankRun: 0, dryRun: 0, faintDel: false, padUsed: false, padHow: false, lastFid: 0, retroDone: false, spamStripT: 0, spamSayT: 0, spamTubeT: 0, knockT: [], spamKnockT: 0,
        dolT: [], spamDolT: 0, haveN: 0, stapMore: 0, clockN: 0, nightT: 0, rsn: {}, tueN: 0, sockN: 0
      };
      const refs = {};
      const bags = {};
      let fidc = 0;
      /* ---------------------------------------------------------- output channels (strip = clerk, say = Management) */
      function kick(e, a) { if (!e) return; e.removeAttribute(a); void e.offsetWidth; e.setAttribute(a, ''); }
      function quiet() { return api.now() < S.quietUntil || S.lull; }
      function snd(n) { if (!quiet()) api.sfx(n); }
      function pay(n, why) { return quiet() ? 0 : api.award(n, why); }
      function sub(t, n) { return String(t).split('%n').join(n === undefined ? '' : String(n)).split('{player}').join(api.player.name); }
      function strip(t, n) { if (S.dead || !refs.strip) return; S.stripT = api.now(); refs.strip.textContent = sub(t, n); kick(refs.strip, 'pulse'); }
      function say(t, o) {
        if (S.dead) return false;
        const q = Object.assign({}, o || {}), force = q.force, nn = q.n; delete q.force; delete q.n;
        if (quiet() && !force) return false;
        const now = api.now();
        if (!(q.priority >= 1) && now - S.lastSay < 1500) return false;
        S.lastSay = now;
        return api.say(sub(t, nn), q);
      }
      function pk(name) {
        let b = bags[name];
        if (!b || !b.length) {
          b = api.shuffle(L[name]);
          if (b.length > 1 && b[b.length - 1] === bags['~' + name]) b.unshift(b.pop());
          bags[name] = b;
        }
        const v = b.pop();
        bags['~' + name] = v;
        return v;
      }
      function clear(e) { while (e.firstChild) e.removeChild(e.firstChild); }
      /* ---------------------------------------------------------- frames (the stack is the source of truth) */
      function mkFrame(o) {
        return Object.assign({ id: ++fidc, num: 'F-1', title: '', fields: [], attach: { slot: false, child: null, loop: false }, stamp: null, marks: [], sig: null, drift: null,
          pressed: false, kind: 'normal', depth: 1, tri: false, forgiven: false, corr: null, mut: '', mutSaid: false, gerald: '', trap: false, footer: '', carbon: '' }, o);
      }
      function mkField(t, extra) { return Object.assign({ type: t, val: t === 'ids' ? [false, false, false, false] : (t === 'box' ? false : '') }, extra || {}); }
      const bx = function (label, act) { return mkField('box', { label: label, act: act || '' }); };
      function topNum(i) { return 'F-' + (Math.floor(i / 3) + 1) + ['', 'A', 'B'][i % 3]; }
      function pickFields(n, noSig) {
        const out = [];
        for (let g = 0; out.length < n && g < 40; g++) {
          if (!S.fbag.length) S.fbag = api.shuffle(POOL);
          const t = S.fbag.pop();
          if (out.indexOf(t) < 0 && !(out.length === 0 && t === S.lastField)) out.push(t);
        }
        S.lastField = out[0] || '';
        if (!noSig && S.beat >= 3 && S.beat < 8 && (S.forceSig || api.chance(0.5))) { out.push('sig'); S.forceSig = false; }
        return out.map(function (t) { return mkField(t); });
      }
      function needSlot(depth) { const m = MAXD[S.beat] || 1; return depth < m && (S.force || api.chance(0.65)); }
      function pickMut(fr) {
        if ((V.career >= 2 || S.beat === 6) && S.beat < 8 && api.chance(0.4)) fr.mut = api.pick(['left', 'green', 'lunch']);
      }
      function mkAudit() { return mkFrame({ num: 'A-1', title: 'Audit of ' + api.player.name, kind: 'audit' }); }
      function mkF0() { return mkFrame({ num: 'F-0', title: 'Request to Have Never Begun', kind: 'f0', fields: [mkField('name')] }); }
      function nextTop() {
        const b = S.beat;
        if (b === 9) return mkAudit();
        if (S.zeroNext) { S.zeroNext = false; S.lastZero = true; return mkFrame({ num: '', title: '', kind: 'zero' }); }
        S.lastZero = false;
        const i = S.topIdx++, resto = b === 8;
        const fr = mkFrame({ num: resto ? '27B/6' : topNum(i), title: resto ? 'Request for Form 27B/7' : (i < 3 ? TOPT[i] : TOPT2[(i - 3) % TOPT2.length]) });
        if (b <= 0) fr.fields = [mkField('name')].concat(i === 1 ? [mkField('date')] : []);
        else if (b === 1) fr.fields = ['surname', 'reason', 'ids'].map(function (t) { return mkField(t); });
        else fr.fields = pickFields(b >= 8 ? 3 : 3 + (api.chance(0.5) ? 1 : 0));
        if (b >= 2 && b < 8) fr.attach.slot = needSlot(1);
        if (b >= 5 && b < 8 && api.chance(0.5)) fr.tri = true;
        pickMut(fr);
        if (S.afterReset) { fr.footer = 'Page 1 of 1 (continued from 1 of 1, one career ago)'; S.afterReset = false; }
        return fr;
      }
      function childTitle(d) {
        const deep = S.beat >= 6;
        return 'Request for '.repeat(1 + (deep ? clamp(d - 3, 0, 2) : 0)) + (deep ? 'Form ' : '') + 'R-' + depthLabel(d + 1);
      }
      function mkChild(par) {
        const d = par.depth + 1;
        const fr = mkFrame({ num: 'R-' + depthLabel(d), title: childTitle(d), depth: d });
        fr.fields = pickFields(2, true);
        fr.attach.slot = needSlot(d);
        if (S.beat === 7 && d === 9 && !S.loopDone) { fr.attach = { slot: true, child: null, loop: true }; }
        if (S.force && d >= (MAXD[S.beat] || 1)) S.force = false;
        if (S.beat >= 6 && S.beat < 8 && d === 7) fr.gerald = 'ask';
        if (S.beat >= 5 && S.beat < 8 && d <= 2 && api.chance(0.4)) fr.tri = true;
        pickMut(fr);
        return fr;
      }
      function mkCorr(key, par) {
        const C = { unstamped: ['C-1', 'Please Apply a Stamp', []], crooked: ['C-2', 'Request to Be Straighter', [bx('I will be straighter')]], both: ['C-3', 'Which One Are You', [bx('Yes')]],
          complete: ['C-4', 'Request for Something Missing', [mkField('reason')]], sign: ['C-5', 'Please Sign Here', [mkField('sig')]],
          variance: ['S-1', 'Signature Variance Explanation Form', [bx('I was feeling different')]], desk: ['D-1', 'Desk Repair Request', [bx('The desk has been repaired by this tickbox')]] }[key];
        return mkFrame({ num: C[0], title: C[1], fields: C[2], kind: 'correction', depth: par.depth, tpl: key });
      }
      function ensureStack() { if (!S.stack.length) S.stack = [nextTop()]; }
      function active() { ensureStack(); const t = S.stack[S.stack.length - 1]; return t.corr || t; }
      function isEmptyField(fr, f) {
        if (f.type === 'ids') return !f.val.some(function (x) { return x; });
        if (f.type === 'sig') return !fr.sig;
        if (f.type === 'box') return !f.val;
        if (f.type === 'fixed') return true;
        return !String(f.val || '').trim();
      }
      function isBlank(fr) { return fr.kind === 'normal' && fr.fields.length > 0 && fr.fields.every(function (f) { return isEmptyField(fr, f); }); }
      function isPristine(fr) { return fr.kind === 'normal' && !fr.stamp && !fr.corr && !fr.attach.child && fr.fields.every(function (f) { return isEmptyField(fr, f); }); }
      function footerFor(fr) {
        if (fr.footer) return fr.footer;
        if (S.beat === 8) return 'Page 27B of 6';
        const d = fr.depth;
        if (d === 8) return 'Page 1 of 7 1/2';
        if (d === 7) return 'Page 7 of 1';
        if (d === 5) return 'Page 5 of 1';
        if (d >= 3) return 'Page 1 of 1 (continued on page 1 of 1)';
        return 'Page 1 of 1';
      }
      /* ---------------------------------------------------------- beats */
      function quotaOf(b) { return V.career > 1 ? Math.ceil(QUOTA[b] / 2) : QUOTA[b]; }
      function minOf(b) { return api.selftest ? 0 : (V.career > 1 ? MINS[b] / 2 : MINS[b]); }
      function startBeat(i, mode) {
        S.beat = i; S.hi = Math.max(S.hi, i); V.beat = i; V.hi = S.hi; S.inBeat = 0; S.beatSec = 0;
        S.force = (i === 2 || i === 6 || i === 7); S.forceSig = (i === 3);
        if (i === 5) S.ink = 6;
        if (i === 8) refs.desk.setAttribute('resto', ''); else refs.desk.removeAttribute('resto');
        const need = !S.stack.length || i >= 8 || (i >= 2 && mode !== 'reset' && S.stack.length === 1 && isPristine(S.stack[0]));
        if (need) { S.stack = [nextTop()]; }
        if (V.hmm === false && S.q.hmm) V.hmm = true;
        persist();
        snd('bell');
        if (mode === 'first' && V.career === 1 && i === 0) {
          strip(L.proc);
          api.setTimeout(function () { if (!S.dead && S.beat === 0 && api.now() - S.stripT >= 5500) strip(L.mount); }, 6000);
        } else strip('Department notice ' + (i + 1) + ' (of an unspecified number): ' + BEATNAMES[i] + '. ' + L.beatTag[i]);
        if (mode === 'resume') say(L.resume, { priority: 1, mood: 'proud' });
        else if (i === 8 && mode !== 'reset') api.setTimeout(function () { if (!S.dead && S.beat === 8) say(L.beat[8], { priority: 1, mood: 'neutral', force: true }); }, 4000);
        else if (mode !== 'reset') say(L.beat[i], { priority: 1, mood: 'proud' });
        if (i === 8) { beginLull(); if (S.q.num) { S.q.serving = String(S.q.num); } api.setTimeout(function () { if (!S.dead && S.beat === 8) strip(S.q.num ? sub(L.nowServing, S.q.num) : L.restr[1]); }, 4000); }
        if (i === 9) { refs.desk.removeAttribute('soft'); }
        renderAll();
        paintQueue();
        kick(refs.form, 'in');
      }
      function checkBeat(force) {
        if (S.dead || S.beat < 0 || S.beat >= 9 || S.ending || S.unwinding || S.filing || S.cab || S.stack.length !== 1 || S.stack[0].corr) return;
        if (S.inBeat >= quotaOf(S.beat) && S.beatSec >= minOf(S.beat)) {
          const a = document.activeElement; /* do not rebuild the form under someone who is typing in it */
          if (!force && a && refs.form.contains(a) && /^(INPUT|SELECT|TEXTAREA)$/.test(a.tagName) && api.now() - S.lastInput < 1500) return;
          startBeat(S.beat + 1);
        }
      }
      function beginLull() {
        S.lull = true; S.lullEnd = api.now() + (api.selftest ? 2500 : 20000); refs.desk.setAttribute('soft', '');
        strip(L.lullStart);
      }
      /* ---------------------------------------------------------- the door, flags, knocks */
      function lightSecs() { return clamp(3 + V.ign - V.ans, 1, 20); }
      function doorLight(sec) { S.lightUntil = api.now() + (sec === undefined ? lightSecs() : sec) * 1000; refs.door.setAttribute('lit', ''); }
      function spawnFlag() {
        if (S.beat < 2 || S.beat > 8 || S.ending) return;
        const kind = S.beat === 8;
        let text = '';
        if (kind) { if (S.kindN >= 3) return; text = L.kind[S.kindN++]; }
        else {
          if (S.flags.length >= 12) S.flags.shift();
          if (S.firstFlag) { S.firstFlag = false; text = L.flag1; say(L.flags[0], { priority: 1, mood: 'smug' }); }
          else if (S.beat >= 6 && api.chance(0.4)) text = (V.blank > 0 && api.chance(0.5)) ? L.flagAtt[1] : L.flagAtt[0];
          else if (api.chance(0.12)) { const tc = api.line('tosClause'); text = tc.length < 200 ? 'Per Sandra, citing the Terms of Service: ' + tc : pk('flags'); }
          else text = pk('flags');
        }
        S.flags.push({ id: ++S.fid, text: text, born: api.now(), kind: kind });
        doorLight(kind ? 3 : undefined);
        snd('pop');
        strip(text);
        renderFlags();
      }
      function openFlags() { return S.flags.filter(function (f) { return !f.kind; }).length; }
      function answerFlag(id) {
        const f = S.flags.filter(function (x) { return x.id === id; })[0];
        if (!f) return;
        S.flags = S.flags.filter(function (x) { return x.id !== id; });
        S.flagOpen = 0;
        if (!f.kind) {
          V.ans++; st('flags_answered'); pay(0.5, 'Noted'); snd('ding'); strip(L.flagNoted);
          if (S.lightUntil) S.lightUntil = Math.min(S.lightUntil, api.now() + 2000);
          persist();
        } else { snd('tick'); strip('Noted. Sandra has noted that you noted. S.'); }
        renderFlags();
      }
      function renderFlags() {
        const box = refs.flags;
        clear(box);
        S.flags.slice(0, 4).forEach(function (f) {
          box.appendChild(el('button', { k: 'flag', type: 'button', 'aria-label': 'Sandra flag: ' + f.text, 'aria-expanded': S.flagOpen === f.id ? 'true' : 'false', kind: f.kind,
            onclick: function () { S.flagOpen = S.flagOpen === f.id ? 0 : f.id; renderFlags(); } }, f.kind ? 'Note from S.' : 'Sandra flag'));
        });
        const cur = S.flags.filter(function (f) { return f.id === S.flagOpen; })[0];
        if (cur) {
          const cb = el('input', { type: 'checkbox', onchange: function () { if (cb.checked) answerFlag(cur.id); } });
          box.appendChild(el('div', { k: 'flagp' }, el('span', { text: cur.text }), el('label', { k: 'tick' }, cb, el('span', { text: 'Noted' }))));
        } else S.flagOpen = 0;
        refs.desk.style.setProperty('--fr', String(Math.min(openFlags(), 12)));
        renderFoot();
      }
      function knock(shift) {
        if (S.dead || S.ending) return;
        if (S.hi < 3) { strip(pk('doorIn')); snd('tick'); kick(refs.door, 'knock'); return; }
        kick(refs.door, 'knock'); snd('tick'); V.knocks++; st('knocks'); doorLight();
        if (shift && V.knocks >= 8 && !V.knocker) {
          V.knocker = true; refs.door.removeAttribute('knock'); kick(refs.door, 'answer'); api.sfx('tick');
          strip('Knock 7 1/2. The door knocked back. The door has since said nothing, as is policy.');
          say(L.knocker, { priority: 2, mood: 'confused' }); api.achieve('tiny-bureaucracy.knuckle'); st('knocker');
        } else {
          const n = V.knocks > 7 ? '7 1/2' : String(V.knocks), kt = api.now();
          S.knockT = S.knockT.filter(function (x) { return kt - x < 4000; }); S.knockT.push(kt);
          if (S.knockT.length >= 6 && kt - S.spamKnockT > 3000) { S.spamKnockT = kt; strip(pk('spamKnock')); }
          else strip(pk('knock'), n);
          if (V.knocker && V.knocks % 4 === 0) say(L.knockerRep, { mood: 'smug' });
        }
        persist();
      }
      /* ---------------------------------------------------------- stamping */
      function unlocked(n) { return n === 1 || (n <= 3 && S.hi >= 1) || (n === 4 && S.hi >= 3) || (n === 5 && V.hmm) || (n === 6 && V.sandraStamp) || (n === 7 && !!S.confisc); }
      function stampDef(n) { return STAMPS.filter(function (s) { return s.n === n; })[0] || STAMPS[0]; }
      function dn(name) { return name === 'S' ? '(S)' : (name === 'APPROVED' && S.beat === 8 ? 'NOTED WARMLY' : name); }
      function arm(n) {
        if (S.dead || !unlocked(n)) return;
        if (S.confisc && n !== 7) return;
        S.arm = n; snd('tick'); renderRack();
      }
      function paintArmed() {
        const d = stampDef(S.arm);
        refs.armed.textContent = dn(d.name);
        refs.armed.style.color = d.c; refs.armed.style.borderColor = d.c;
      }
      function renderRack() {
        const box = refs.stamps;
        clear(box);
        STAMPS.forEach(function (d) {
          if (!unlocked(d.n)) return;
          box.appendChild(el('button', { k: 'stamp', type: 'button', 'aria-pressed': S.arm === d.n ? 'true' : 'false', disabled: !!S.confisc && d.n !== 7,
            style: { background: d.bg, color: '#2A2A3C', borderColor: d.c }, onclick: function () { arm(d.n); } },
            d.n <= 5 ? el('b', { text: String(d.n) }) : null, dn(d.name)));
        });
        if (S.confisc) refs.rack.setAttribute('hot', ''); else refs.rack.removeAttribute('hot');
        paintArmed();
      }
      function paintInk() {
        refs.inkpad.hidden = S.hi < 5;
        refs.inkbar.style.width = Math.round(clamp(S.ink, 0, 6) / 6 * 100) + '%';
        refs.inktxt.textContent = S.ink > 0 ? 'Ink ' + S.ink + '/6' : 'Ink DRY';
      }
      function reink() { S.ink = 6; S.inkClicks = []; snd('pop'); strip(L.reink); paintInk(); }
      function markEl(m) {
        const d = stampDef(STAMPS.filter(function (s) { return s.name === m.name; }).map(function (s) { return s.n; })[0] || 1);
        const e = el('span', { k: 'mark', 'aria-hidden': 'true', style: { left: m.x + '%', top: m.y + '%', color: m.ghost ? '#2A2A3C' : d.c }, text: m.ghost ? '...' : dn(m.name) });
        e.style.setProperty('--t', m.tilt + 'deg');
        if (m.ghost) e.setAttribute('ghost', '');
        return e;
      }
      function curTilt() { return api.now() - S.lastMove > 180 ? 0 : S.tilt; }
      function spamCheck() {
        const t = api.now();
        S.stampT = S.stampT.filter(function (x) { return t - x < 3000; });
        S.tubeT = S.tubeT.filter(function (x) { return t - x < 3000; });
        if ((S.stampT.length >= 12 || S.tubeT.length >= 20) && !S.confisc && t > S.duckCool) { duckOn(); return; }
        if (S.confisc) return;
        if (S.stampT.length >= 8 && t - S.spamSayT > 6000) { S.spamSayT = t; S.spamStripT = t; say(pk('spamSay'), { mood: 'panic' }); strip(pk('spamStamp')); }
        else if (S.stampT.length >= 5 && t - S.spamStripT > 2500) { S.spamStripT = t; strip(pk('spamStamp')); }
        else if (S.tubeT.length >= 8 && t - S.spamTubeT > 3000) { S.spamTubeT = t; strip(pk('spamTube')); }
      }
      function duckOn(col) {
        S.confisc = api.now() + 7500; S.prevArm = S.arm; S.arm = 7; st('quacks'); api.achieve('tiny-bureaucracy.duck');
        if (S.press) padUp('duck');
        S.stampT = []; S.tubeT = []; S.dryRun = 0;
        api.sfx('buzz'); say(col ? L.colleague : L.spam, { priority: 1, mood: col ? 'proud' : 'panic' }); strip(col ? L.colleague : L.duck);
        refs.h12.hidden = false; refs.duck.hidden = false;
        renderRack();
      }
      function duckOff(early) {
        if (!S.confisc) return;
        S.confisc = 0; S.duckCool = api.now() + 10000; S.arm = S.prevArm || 1; if (!unlocked(S.arm)) S.arm = 1;
        refs.h12.hidden = true; refs.duck.hidden = true;
        if (refs.h12cb) refs.h12cb.checked = false;
        if (early) { pay(0.5, 'Gentleness'); snd('ding'); strip(L.gentler); say(L.gentler, { mood: 'proud' }); } else { strip(L.stampBack); }
        renderRack();
      }
      function slam(tilt, how, pos) {
        if (S.dead || S.ending || S.cab || S.filing) return;
        const fr = active(), t = api.now();
        S.stampT.push(t);
        const def = stampDef(S.arm);
        const ghost = S.hi >= 5 && def.n !== 7 && S.ink <= 0;
        if (S.hi >= 5 && def.n !== 7 && !ghost) S.ink--;
        const tl = ghost ? 0 : r1(clamp(fin(tilt) ? tilt : 0, -20, 20));
        const m = { name: def.name, tilt: tl, ghost: ghost, x: pos ? pos.x : 30 + Math.floor(api.rand() * 40), y: pos ? pos.y : 62 + Math.floor(api.rand() * 26) };
        fr.marks.push(m);
        if (fr.marks.length > 6) fr.marks.shift();
        if (!fr.stamp) fr.stamp = { name: def.name, tilt: tl, ghost: ghost };
        refs.form.appendChild(markEl(m));
        const ms = refs.form.querySelectorAll('[k=mark]');
        if (ms.length > 6) ms[0].parentNode.removeChild(ms[0]);
        kick(refs.armed, 'slam'); snd('stamp'); st('stamps');
        const zn = refs.form.querySelector('[k=zone]'); if (zn) zn.removeAttribute('hint');
        S.dryRun = ghost ? S.dryRun + 1 : 0;
        const crooked = Math.abs(tl) > 7.5;
        if (ghost) { S.ghostN++; strip(S.ghostN % 2 ? L.inkDry : L.ghost); if (S.dryRun >= 4 && !S.confisc && t > S.duckCool) duckOn(true); }
        else if (crooked) { st('crooked'); strip(pk('crooked'), Math.abs(Math.round(tl))); }
        else if (how === 'kb' && api.chance(0.25)) {
          strip(L.suspicious);
          const tok = S.token;
          api.setTimeout(function () { if (S.dead || tok !== S.token) return; strip(L.fee); if (!S.feeDone) { S.feeDone = true; pay(-0.3, 'Stamp Fee'); } }, 2400);
        } else if (!S.seenStamp[def.name]) { S.seenStamp[def.name] = true; strip(L.stamp[def.name]); }
        else if (api.chance(0.4)) strip(pk('stampAny').split('%s').join(def.name), api.stat.get(SP + 'stamps'));
        paintInk(); spamCheck();
      }
      function curStrokeClear() { S.curStroke = null; }
      /* ---------------------------------------------------------- name trap, blank forms, form zero */
      function nameTrap(fr) {
        if (fr.trap || S.dead) return;
        fr.trap = true;
        say(L.trap1, { priority: 1, mood: 'panic' }); strip(L.trap1); st('traps');
        const tok = S.token;
        api.setTimeout(function () {
          if (S.dead || tok !== S.token || S.filing || active() !== fr) return;
          say(L.trap2, { priority: 1, mood: 'smug' }); pay(1, 'Conflict Dividend'); strip(L.trap2);
          approved(fr);
        }, 3000);
      }
      function blankSub() {
        V.blank++; S.blankRun++; st('blank'); doorLight(1);
        if (S.blankRun >= 7 && !V.sandraStamp && !S.blankPending) {
          S.blankPending = true;
          refs.door.setAttribute('ajar', ''); strip(L.blank[2]); S.quietUntil = api.now() + 6000;
          const tok = S.token;
          api.setTimeout(function () {
            S.blankPending = false;
            if (S.dead || tok !== S.token) return;
            refs.door.removeAttribute('ajar'); V.sandraStamp = true; api.achieve('tiny-bureaucracy.blank-page'); renderRack(); persist();
            say(L.blank[3], { priority: 2, mood: 'confused', force: true });
          }, 6200);
        } else if (S.blankRun === 1) strip(L.blank[0]);
        else if (S.blankRun <= 6) strip(L.blankN[S.blankRun]);
        else strip(L.blank[1], V.blank);
        persist();
      }
      /* ---------------------------------------------------------- the tube */
      function moveCap(p) {
        try {
          const len = refs.pipe.getTotalLength(), pt = refs.pipe.getPointAtLength(len * clamp(p, 0, 1));
          if (fin(pt.x) && fin(pt.y)) { refs.cap.setAttribute('cx', String(pt.x)); refs.cap.setAttribute('cy', String(pt.y)); }
        } catch (e) { /* unrendered svg: skip the animation, the timer still delivers */ }
      }
      function tubeMs() {
        if (api.selftest) return 50;
        let d = S.beat <= 0 ? 600 : 500 + S.beat * 230 + api.randInt(0, 300);
        if (S.beat >= 1 && S.beat <= 8 && active().mut === 'lunch') d += 2000;
        return d;
      }
      function fileTube() {
        if (S.dead) return;
        S.tubeT.push(api.now());
        if (S.filing || S.ending || S.unwinding || S.cab) { spamCheck(); return; }
        spamCheck();
        const fr = active();
        if (fr.kind === 'loop') { strip(L.loop9); return; }
        if (fr.attach.slot && !fr.attach.child) { if (refs.slot) kick(refs.slot, 'shake'); strip(L.incomplete); snd('error'); return; }
        if (fr.tri && !fr.pressed) { strip(L.unpressed); snd('error'); return; }
        S.filing = true; refs.tubecol.setAttribute('busy', ''); kick(refs.puff, 'on');
        snd('whoosh');
        if (fr.kind === 'normal' && api.chance(0.45)) strip(pk('tubeGo'));
        const dur = tubeMs(), t0 = api.now(), tok = S.token;
        if (!reduced && !(root.closest && root.closest('.pm-reduce-motion'))) {
          const loop = function () {
            if (S.dead || !S.filing || tok !== S.token) return;
            const p = clamp((api.now() - t0) / dur, 0, 1);
            moveCap(p);
            if (p < 1) api.requestAnimationFrame(loop);
          };
          api.requestAnimationFrame(loop);
        }
        api.setTimeout(function () { if (S.dead || tok !== S.token) return; arrive(fr); }, dur);
      }
      function evaluate(fr) {
        if (fr.kind !== 'normal' && fr.kind !== 'audit') return null;
        if (fr.forgiven || S.rej >= 1 || isBlank(fr)) return null;
        if (!fr.stamp) return 'unstamped';
        if (Math.abs(fr.stamp.tilt) > 7.5) return 'crooked';
        if (fr.fields.some(function (f) { return f.type === 'ids' && f.val[0] && f.val[1]; })) return 'both';
        if (fr.fields.some(function (f) { return f.type === 'sig'; })) {
          if (!fr.sig) return 'sign';
          if (fin(fr.drift) ? fr.drift >= 45 : true) return 'variance';
        }
        if (S.beat > 0 && fr.kind === 'normal') {
          if (!S.lastRoll && api.chance(1 / 9)) { S.lastRoll = true; return 'complete'; }
          S.lastRoll = false;
        }
        return null;
      }
      function arrive(fr) {
        S.filing = false; refs.tubecol.removeAttribute('busy'); moveCap(0);
        if (S.dead) return;
        if (active() !== fr) { renderAll(); return; }
        if (isBlank(fr)) blankSub(); else if (fr.kind === 'normal') S.blankRun = 0;
        const v = evaluate(fr);
        if (v) reject(fr, v); else approved(fr);
      }
      function reject(fr, key) {
        const par = S.stack[S.stack.length - 1];
        par.corr = mkCorr(key, par); S.rej++; st('rejections'); S.sinceFile = 0;
        const n = key === 'crooked' ? Math.abs(Math.round(fr.stamp.tilt)) : (key === 'variance' ? fr.drift : undefined);
        const line = { unstamped: L.retUnstamped, crooked: key === 'crooked' ? pk('crooked') : '', both: L.idCandour, complete: L.retComplete, sign: L.sigAsk, variance: L.sigVar }[key];
        snd('error'); strip(line, n);
        if (key === 'variance') say(L.sigDiff, { n: n, mood: 'smug' });
        else if (key === 'unstamped') say(L.noStamp, { mood: 'smug' });
        else if (api.chance(0.5)) say(pk('rej'), { mood: 'smug' });
        renderAll(); kick(refs.form, 'in');
      }
      function pushLog(fr) {
        S.log.push(fr.num + ' ' + fr.title);
        if (S.log.length > 30) S.log.shift();
        clear(refs.logul);
        S.log.slice().reverse().forEach(function (t) { refs.logul.appendChild(el('li', { text: t })); });
      }
      function approved(fr) {
        if (S.dead || active() !== fr) return;
        S.rej = 0; S.sinceFile = 0;
        const par = S.stack[S.stack.length - 1];
        if (fr.kind === 'correction') {
          par.corr = null; par.forgiven = true; pay(0.2, 'Correction Filed'); st('corrections'); S.inBeat++; snd('pop'); strip(pk('corrDone'));
          renderAll(); kick(refs.form, 'back'); checkBeat(true); return;
        }
        if (fr.kind === 'zero') {
          const del = Math.min(3, S.formsFiled);
          S.formsFiled -= del; S.undo = { n: del, until: api.now() + 5000 }; st('zeros'); snd('sad');
          say(L.zero, { priority: 1, mood: 'confused' }); strip('Form Zero filed. It removed ' + del + ' forms from the record. Press U within 5 seconds to undo, or let them stay deleted.');
          refs.undo.hidden = false; S.stack = [nextTop()]; renderAll(); kick(refs.form, 'in'); return;
        }
        if (fr.kind === 'audit') {
          st('audits'); S.inBeat++; pay(3, 'Audit Approved'); snd('fanfare'); strip(L.stampedSelf); say(L.broadly, { priority: 1, mood: 'smug' });
          S.filing = true; S.quietUntil = api.now() + 2000; refs.tubecol.setAttribute('busy', '');
          const tok = S.token;
          api.setTimeout(function () {
            if (S.dead || tok !== S.token) return;
            S.filing = false; S.quietUntil = 0; refs.tubecol.removeAttribute('busy'); S.stack = [mkF0()]; renderAll(); kick(refs.form, 'in'); api.sfx('tick');
            strip('Form F-0 (Request to Have Never Begun). One field. Name.');
          }, 2200);
          return;
        }
        if (fr.kind === 'f0') { doEnding(); return; }
        if (fr.kind === 'loop') return;
        st('forms'); S.formsFiled++; S.inBeat++; S.approveN++; pushLog(fr); rareRoll();
        api.achieve('tiny-bureaucracy.first-form');
        const depth = fr.depth;
        if (depth > 1) {
          pay(0.4 + depth * 0.2, 'Proof Attached');
          if (depth >= 6) pay(5, 'Deep Return');
          S.stack[S.stack.length - 2].attach.child = { num: fr.num, title: fr.title };
          S.stack.pop();
          if (depth >= 3) {
            snd('fanfare'); api.confetti(undefined, undefined, depth >= 6 ? 36 : 14);
            if (depth === 3 && !S.clipSaid) { S.clipSaid = true; say(L.d3, { priority: 1, mood: 'proud' }); }
            else say(sub(pk('popExtra'), depth === 8 ? '7 1/2' : depth), { priority: depth >= 6 ? 1 : 0, mood: 'proud' });
          } else snd('pop');
          if (S.stack.length === 1) strip(L.back1);
          if (depth >= 6 && !S.toastSeen) toastCameo();
          renderAll(); kick(refs.form, 'back');
        } else {
          pay(0.1 + S.beat * 0.1, 'Form Approved'); snd(S.beat < 2 ? 'ding' : 'pop');
          const first = fr.num === 'F-1' && V.firstName === null;
          if (first) {
            const nf = fr.fields.filter(function (f) { return f.type === 'name'; })[0];
            V.firstName = String(nf ? nf.val : '').slice(0, 24); persist();
            api.confetti(undefined, undefined, 26);
          }
          S.zeroNext = S.beat >= 2 && S.beat < 8 && !S.lastZero && api.chance(1 / 50);
          S.stack = [nextTop()];
          renderAll(); kick(refs.form, 'in');
        }
        const cnt = api.stat.get(SP + 'forms');
        if (depth === 1 && cnt === 1) say(L.firstF1, { priority: 1, mood: 'proud' });
        else if (L.milestone[cnt]) say(L.milestone[cnt], { priority: 1, mood: 'proud' });
        else if (S.approveN % 3 === 0) say(S.beat === 8 ? L.restr[0] : pk('approve'), { mood: 'smug' });
        if (S.beat <= 1 && depth === 1 && S.approveN <= 4) strip(L.early[S.approveN - 1]);
        checkBeat(true);
      }
      function toastCameo() {
        S.toastSeen = true; S.toastUntil = api.now() + 20000; refs.toast.hidden = false;
        strip(L.toastLine); say(L.toastLine, { mood: 'confused', priority: 1 });
      }
      /* ---------------------------------------------------------- push / pop / escape */
      function loopPending() { const t = S.stack[S.stack.length - 1]; return !!(t && t.attach.loop && !t.attach.child); }
      function pushChild() {
        if (S.dead || S.filing || S.unwinding || S.ending || S.cab) return;
        const par = S.stack[S.stack.length - 1];
        if (par.corr || !par.attach.slot || par.attach.child) return;
        if (par.attach.loop) { openCab(); return; }
        if (S.stack.length >= 9) return;
        const prev = depthLabel(par.depth), ch = mkChild(par);
        S.stack.push(ch); S.escOpen = false; refs.esc.hidden = true;
        api.stat.max(SP + 'depth_max', ch.depth); snd('whoosh');
        const d = ch.depth;
        if (d === 2 && !S.seenPush2) { S.seenPush2 = true; strip(L.push2); say(L.push2, { mood: 'proud' }); }
        else if (d === 5) say(L.d5, { priority: 1, mood: 'smug' });
        else if (d === 7) strip(L.page7);
        else if (d === 8) { say(L.d75, { priority: 1, mood: 'confused' }); strip(L.clock75); }
        else if (d === 9 && prev === '7 1/2') say(L.gap, { priority: 1, mood: 'confused' });
        else if (S.beat >= 6 && !S.seenNest) { S.seenNest = true; strip(L.nest); }
        else strip('Attach proof of Form R-' + depthLabel(d) + ' (' + ch.title + '). You are now ' + depthLabel(d) + ' forms deep.');
        renderAll(); kick(refs.form, 'in');
      }
      function esc() {
        if (S.dead || S.ending) return;
        if (S.cab) { closeCab(); return; }
        if (S.escOpen) { S.escOpen = false; refs.esc.hidden = true; return; }
        if (S.flagOpen) { S.flagOpen = 0; renderFlags(); return; }
        if (S.stack.length > 1 && !S.filing && !S.unwinding) { S.escOpen = true; refs.esc.hidden = false; strip(L.sure); const b = refs.esc.querySelector('button'); if (b) b.focus(); }
      }
      function escYes() {
        S.escOpen = false; refs.esc.hidden = true;
        if (S.dead || S.filing || S.unwinding || S.stack.length < 2) return;
        S.stack.pop(); S.stack[S.stack.length - 1].attach.child = null; st('abandoned');
        strip(L.abandon); say(L.sure2, { mood: 'smug' }); snd('sad');
        renderAll(); kick(refs.form, 'back');
      }
      /* ---------------------------------------------------------- the loop and the cabinet */
      function openCab() {
        if (S.dead || S.ending || S.unwinding || S.filing) return;
        S.cab = true;
        const c = refs.cab; clear(c);
        const need = loopPending();
        const msg = el('div', { k: 'cabmsg', 'aria-live': 'polite', text: 'Nine drawers. One of them is half a drawer.' });
        const folder = el('div', { k: 'folder', hidden: true });
        const close = el('button', { type: 'button', onclick: closeCab }, 'Close drawer');
        c.appendChild(el('h3', { text: 'Filing Cabinet' })); c.appendChild(msg);
        c.appendChild(el('div', { k: 'drawers' }, ...CAB.map(function (d) {
          const b = el('button', { k: 'drawer', type: 'button', half: d === '7 1/2', 'aria-label': 'Drawer ' + d, onclick: function () {
            snd('tick');
            if (d !== '7 1/2') { msg.textContent = L.drawer[d] || L.wrong; return; }
            kick(b, 'open'); msg.textContent = L.dennis + (api.flag.get('plantClicked') ? L.dennisKnown : ''); api.flag.set('metDennis', true); st('dennis'); strip(api.line('plantStatus'));
            clear(folder); folder.hidden = false;
            folder.appendChild(el('div', { text: '🌿 Dennis (Plant), thriving' }));
            folder.appendChild(el('div', { text: 'Folder: F-1 (your original). Name on file: ' + (V.firstName ? V.firstName : '(left blank)') }));
            if (need) folder.appendChild(el('button', { type: 'button', onclick: takeF1 }, 'Take F-1'));
          } }, d);
          return b;
        })));
        c.appendChild(folder); c.appendChild(close);
        c.hidden = false; close.focus();
      }
      function closeCab() {
        if (!S.cab) return;
        S.cab = false; refs.cab.hidden = true;
        const b = refs.form.querySelector('[k=slot]') || refs.cabbtn; if (b && !b.hidden) b.focus();
      }
      function takeF1() {
        if (!S.cab || !loopPending()) return;
        const par = S.stack[S.stack.length - 1];
        const lf = mkFrame({ num: 'F-1', title: 'Application to Begin', kind: 'loop', depth: 9, footer: 'Page 1 of 1 (final)',
          fields: [mkField('fixed', { label: 'Name (as originally typed)', val: V.firstName ? V.firstName : '' }), bx('The cycle is acknowledged', 'loop')] });
        par.attach.child = { num: 'F-1', title: 'Application to Begin' };
        S.stack.push(lf); S.cab = false; refs.cab.hidden = true; S.escOpen = false; refs.esc.hidden = true;
        snd('whoosh'); say(L.gotF1, { priority: 1, mood: 'proud' }); strip(L.loop9);
        renderAll(); kick(refs.form, 'in');
      }
      function loopAck() {
        if (S.unwinding || S.dead) return;
        S.loopDone = true; V.loopDone = true; strip(L.cycle); say(L.cycle, { priority: 2, mood: 'proud' }); snd('bell');
        S.unwinding = true;
        const tok = S.token;
        const step = function () {
          if (S.dead || tok !== S.token) return;
          if (S.stack.length > 1) { S.stack.pop(); api.sfx('tick'); renderAll(); api.setTimeout(step, 200); return; }
          S.unwinding = false;
          S.stack[0].attach = { slot: false, child: null, loop: false }; S.stack[0].corr = null;
          pay(5, 'The Cycle'); snd('fanfare'); api.confetti(undefined, undefined, 50); api.achieve('tiny-bureaucracy.cycle'); st('cycles');
          S.inBeat++; persist(); renderAll(); kick(refs.form, 'back'); checkBeat();
        };
        api.setTimeout(step, 500);
      }
      /* ---------------------------------------------------------- queue, Dolores, receipts */
      function paintQueue() {
        const q = S.q;
        refs.serving.textContent = q.serving || '--';
        refs.yours.textContent = q.num ? String(q.num) : '--';
        refs.take.hidden = S.hi < 4; refs.dolores.hidden = S.hi < 4;
        refs.win.hidden = q.st !== 'window'; refs.win.textContent = 'Window 7: Number ' + q.num;
      }
      function takeNumber() {
        if (S.dead || S.hi < 4 || S.ending) return;
        const q = S.q;
        if (q.num) { S.haveN++; strip(S.haveN > 2 ? pk('haveMore') : L.qHave, q.num); snd('tick'); return; }
        q.num = 41; q.st = 'wander'; q.step = 0; q.acc = 0; q.iv = api.randInt(6, 10); q.serving = WANDER[0]; st('tickets');
        snd('ding'); strip(L.qTake); say(L.qTake, { priority: 1, mood: 'smug' }); paintQueue();
      }
      function openWindow() {
        const q = S.q;
        q.st = 'window'; q.until = api.now() + (api.selftest ? 2500 : [7000, 9000, 12000][Math.min(q.misses, 2)]);
        snd('bell'); strip(sub(L.q41)); say(L.q41, { priority: 1, mood: 'panic' });
        paintQueue();
      }
      function answerWindow() {
        const q = S.q;
        if (S.dead || q.st !== 'window') return;
        q.st = 'done'; q.serving = String(q.num - 1); st('windows_answered');
        V.hmm = true; refs.receipt.hidden = false; snd('ding'); api.achieve('tiny-bureaucracy.waited');
        strip(L.qHmm); say(L.qHmm, { priority: 1, mood: 'proud' });
        persist(); paintQueue(); renderRack();
      }
      function missWindow() {
        const q = S.q, old = q.num;
        q.misses++; st('windows_missed'); q.num += 71; q.serving = String(q.num - 1); q.st = 'wait'; q.acc = 0;
        const t = L.qLeft.split('%a').join(old).split('%b').join(q.num);
        strip(t); say(t, { priority: 1, mood: 'disappointed' }); snd('sad'); paintQueue();
      }
      function qTick() {
        const q = S.q;
        if (q.st === 'wander') {
          q.acc += 0.25;
          if (q.acc >= (api.selftest ? 0.25 : q.iv * (q.step === 4 ? 1.5 : 1))) {
            q.acc = 0; q.step++; q.iv = api.randInt(6, 10);
            q.serving = WANDER[q.step];
            if (q.step === 4) say(L.q40, { mood: 'neutral' });
            else if (q.step === 5) say(L.q46, { mood: 'confused' });
            if (q.step >= WANDER.length - 1) openWindow(); else paintQueue();
          }
        } else if (q.st === 'window') { if (api.now() > q.until) missWindow(); }
        else if (q.st === 'wait') { q.acc += 0.25; if (q.acc >= (api.selftest ? 3 : 20)) openWindow(); }
      }
      function dolores() {
        if (S.dead) return;
        const dn = api.now();
        S.dolT = S.dolT.filter(function (x) { return dn - x < 3000; }); S.dolT.push(dn);
        if (S.dolT.length >= 6 && dn - S.spamDolT > 2500) { S.spamDolT = dn; snd('tick'); strip(pk('spamDol')); return; }
        let t = S.dol < 8 ? L.dolores[S.dol] : pk('dolMore');
        if (S.dol >= 8 && !S.dolToastDone && (api.flag.get('metToaster') || api.flag.get('toaster.met'))) { S.dolToastDone = true; t = L.dolToast; }
        S.dol++; st('dolores'); snd('tick'); strip(t);
        if (!S.dolPaid) { S.dolPaid = true; pay(0.1, 'Dolores'); }
        if (S.dol === 8) say(L.dolMore[0], { mood: 'confused' });
      }
      /* ---------------------------------------------------------- press pad, triplicate */
      function setPad(p) { refs.pad && refs.pad.style.setProperty('--p', String(clamp(p, 0, 1.3) / 1.3)); }
      function padDown(e) {
        if (S.dead || S.press || S.filing || S.cab || S.ending) return;
        const fr = active();
        if (!fr.tri) return;
        if (fr.pressed) { strip('This form has already been pressed. It is, if anything, a little flat.'); return; }
        S.press = { t0: api.now() };
        try { if (e && e.target && e.target.setPointerCapture && e.pointerId !== undefined) e.target.setPointerCapture(e.pointerId); } catch (x) { /* synthetic pointer: no capture */ }
        refs.pad.setAttribute('down', ''); refs.pad.removeAttribute('hint'); S.padUsed = true; snd('tick'); strip(L.pressAsk);
        const press = S.press, tok = S.token, lim = api.selftest ? 400 : 1560;
        const loop = function () {
          if (S.dead || S.press !== press || tok !== S.token) return;
          setPad((api.now() - press.t0) / 1200);
          api.requestAnimationFrame(loop);
        };
        api.requestAnimationFrame(loop);
        api.setTimeout(function () { if (S.press === press) padUp('auto'); }, lim);
      }
      function padUp() {
        const pr = S.press;
        if (!pr) return;
        S.press = null; S.lastPadEnd = api.now();
        const p = clamp((api.now() - pr.t0) / 1200, 0, 1.3);
        refs.pad && refs.pad.removeAttribute('down'); setPad(0);
        const fr = active();
        if (!fr.tri || fr.pressed) return;
        fr.pressed = true; st('copies', 3);
        if (refs.pad) refs.pad.textContent = 'PRESSED';
        const sh = refs.form.querySelector('[k=sheets]');
        if (p > 0.8) {
          fr.carbon = 'hi'; S.faintRun = 0; S.faintDel = false; snd('buzz'); strip(L.pressTear); say(L.pressTear, { mood: 'panic' });
          const par = S.stack[S.stack.length - 1]; par.corr = mkCorr('desk', par); S.rej++;
          renderAll(); kick(refs.form, 'in'); return;
        }
        if (p >= 0.55) {
          fr.carbon = 'hi'; S.faintRun = 0; S.faintDel = false; st('clean_press'); pay(0.5, 'Clean Press'); snd('ding'); api.achieve('tiny-bureaucracy.triplicate'); strip(L.pressPink);
          say(L.pressPink, { mood: 'proud' });
        } else {
          fr.carbon = 'lo'; S.faintRun++; if (api.now() - pr.t0 > 300) S.faintDel = true; strip(L.pressFaint);
          if (S.faintRun >= 3 && S.faintDel && !V.kevin) {
            V.kevin = true; S.faintRun = 0; S.faintDel = false; api.achieve('tiny-bureaucracy.pink-question'); say(L.kevin, { priority: 2, mood: 'proud' }); persist(); api.sfx('pop');
          }
        }
        doorLight(); st('pressed');
        if (sh) { sh.setAttribute('data-c', fr.carbon); sh.setAttribute('routed', ''); }
        const tok = S.token;
        api.setTimeout(function () { if (!S.dead && tok === S.token && api.chance(0.6)) strip(L.pressPocket); }, 2400);
      }
      /* ---------------------------------------------------------- signature */
      function sigPt(e) {
        const r = refs.cv.getBoundingClientRect(), w = r.width || 240, h = r.height || 80;
        const x = fin(e.clientX) ? (e.clientX - r.left) * (240 / w) : 0, y = fin(e.clientY) ? (e.clientY - r.top) * (80 / h) : 0;
        return [r1(clamp(x, 0, 240)), r1(clamp(y, 0, 80))];
      }
      function drawSig() {
        const cx = S.cx;
        if (!cx || !refs.cv.isConnected) return;
        const fr = active();
        cx.clearRect(0, 0, 240, 80);
        cx.lineWidth = 1; cx.strokeStyle = '#2A2A3C66';
        try { cx.setLineDash([2, 4]); } catch (e) { /* no dash support */ }
        cx.beginPath(); cx.moveTo(8, 60); cx.lineTo(232, 60); cx.stroke();
        try { cx.setLineDash([]); } catch (e) { /* no dash support */ }
        const line = function (pts, col, w) {
          if (!pts || !pts.length) return;
          cx.strokeStyle = col; cx.lineWidth = w; cx.lineJoin = 'round'; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) cx.lineTo(pts[i][0], pts[i][1]);
          if (pts.length === 1) cx.lineTo(pts[0][0] + 0.1, pts[0][1] + 0.1);
          cx.stroke();
        };
        if (V.sig) line(V.sig, '#C9B6E8aa', 5);
        line(S.curStroke || fr.sig, '#2A2A3C', 2.2);
      }
      function setGauge(d) {
        if (!refs.gl || !refs.gl.isConnected) return;
        refs.gl.textContent = 'Drift: ' + (fin(d) ? d : 100) + '%';
        refs.gmk.style.left = clamp(fin(d) ? d : 100, 0, 100) + '%';
      }
      function sigDone(fr, pts) {
        fr.sig = pts; st('signatures');
        if (!V.sig && pts.length >= 3) {
          V.sig = pts; api.save.set('sigOnFile', pts); fr.drift = 0; strip(L.sig1); say(L.sig1, { priority: 1, mood: 'proud' }); persist();
        } else {
          if (V.sig && pts.length >= 3 && sigFeat(V.sig).len < 10) { V.sig = pts; api.save.set('sigOnFile', pts); }
          fr.drift = sigDrift(pts, V.sig);
          if (!V.sig) strip(L.sigAsk);
          else if (fr.drift < 45) { strip(api.chance(0.3) ? L.sigOkAlt : L.sigOk); if (api.chance(0.4)) say(sub(L.sigDrift, fr.drift).replace('%n', String(fr.drift)), { mood: 'smug' }); }
          else strip(L.sigDiff, fr.drift);
        }
        setGauge(fr.drift); drawSig(); snd('tick');
      }
      function sigEnd() {
        const cur = S.curStroke;
        if (!cur) return;
        S.curStroke = null;
        const fr = active();
        if (!fr.fields.some(function (f) { return f.type === 'sig'; })) return;
        sigDone(fr, downsample(cur, 64));
      }
      function sigClear() { const fr = active(); fr.sig = null; fr.drift = null; S.curStroke = null; if (refs.gmk) refs.gmk.style.left = '0%'; if (refs.gl) refs.gl.textContent = 'Drift: --'; drawSig(); }
      function sigType() {
        const fr = active(), nf = fr.fields.filter(function (f) { return f.type === 'name'; })[0];
        const name = String((nf && nf.val) || V.firstName || api.player.name || 'Valued Employee').slice(0, 10);
        const pts = [];
        for (let i = 0; i < name.length; i++) {
          const c = name.charCodeAt(i);
          for (let k = 0; k < 6; k++) pts.push([clamp(i * 12 + 6 * Math.sin(c + k), 0, 240), clamp(40 + 18 * Math.sin(c * 0.7 + k * 1.3), 0, 80)]);
        }
        strip(L.sigTyped); sigDone(fr, downsample(pts, 64));
      }
      /* ---------------------------------------------------------- idle, closing, resize */
      function closeOffice() {
        S.closed = true; refs.desk.setAttribute('closed', ''); refs.sign.textContent = 'OUT'; refs.mop.hidden = false;
        say(L.idleClosed, { priority: 1, mood: 'disappointed' }); strip(L.idleClosed);
      }
      function reopen() {
        S.closed = false; refs.desk.removeAttribute('closed'); refs.sign.textContent = S.beat === 8 ? 'ARRIVALS' : 'IN'; refs.mop.hidden = true;
        say(L.idleBack, { priority: 1, mood: 'proud' }); strip(L.idleBack); api.achieve('tiny-bureaucracy.last-employee'); snd('bell');
      }
      function touch() { S.lastInput = api.now(); S.noteDone = false; S.idleSt = 0; S.idle40 = false; S.nightT = 0; if (S.closed) reopen(); }
      function onResize() {
        if (S.dead) return;
        if (S.resizeT) api.clearTimeout(S.resizeT);
        S.resizeT = api.setTimeout(function () {
          S.resizeT = 0;
          const w = root.clientWidth || (typeof window.innerWidth === 'number' ? window.innerWidth : 800), want = w < 500;
          if (want === S.folded) return;
          S.folded = want;
          if (S.widthDone || want) { const fr = active(); if (fr.kind === 'normal') { strip(want ? L.narrow : L.wide); S.widthDone = true; } }
          if (!S.filing) renderForm();
        }, 150);
      }
      /* ---------------------------------------------------------- the 3 and 10 minute marks, rare events, the clock, ambient drip */
      function funPaint() { if (S.fun) refs.fun.textContent = 'Have Fun (mandatory) ' + S.fun.n + '/6'; }
      function funStart() {
        S.funDone = true; S.fun = { n: 0, until: api.now() + (api.selftest ? 8000 : 40000) };
        refs.fun.hidden = false; funPaint(); snd('bell'); strip(L.funStart); say(L.funStart, { priority: 1, mood: 'proud' });
      }
      function funClick() {
        const f = S.fun;
        if (S.dead || !f) return;
        f.n++; f.until = api.now() + (api.selftest ? 8000 : 25000); st('fun'); strip(L.fun[f.n - 1]); snd('pop');
        if (f.n >= 6) {
          S.fun = null; refs.fun.hidden = true; pay(3, 'Mandatory Fun'); snd('tada'); api.confetti(undefined, undefined, 40); api.achieve('tiny-bureaucracy.fun');
          say(L.funEnd, { priority: 1, mood: 'smug' });
        } else { funPaint(); if (f.n === 3) say(L.fun[2], { mood: 'confused' }); }
      }
      function retroStart() {
        S.retroDone = true;
        const tok = S.token, gap = api.selftest ? 1500 : 5000;
        say(L.retro0, { priority: 1, mood: 'proud' }); snd('bell'); refs.clockcap.textContent = 'The clock is certain. It has been certain for ten minutes.';
        const lines = L.retro.slice();
        if (api.stat.get(SP + 'quacks') > 0) lines.splice(2, 0, L.retroDuck);
        lines.forEach(function (ln, i) {
          api.setTimeout(function () {
            if (S.dead || tok !== S.token) return;
            strip(ln); snd('tick');
            if (i < lines.length - 1) return;
            st('retros'); pay(2, 'Retrospective'); snd('fanfare'); api.confetti(undefined, undefined, 30); refs.desk.setAttribute('gold', '');
            if (api.flag.get('metGerald')) api.say(L.geraldRetro, { who: 'Gerald', mood: 'neutral', priority: 1 });
            api.setTimeout(function () { if (!S.dead && tok === S.token) refs.desk.removeAttribute('gold'); }, 8000);
          }, gap * (i + 1));
        });
      }
      function rareSock() {
        const seen = !!(api.flag.get('sockSeen') || api.flag.get('pet-rock.sockSeen') || api.flag.get('cloud-gazer.sockSeen'));
        api.flag.set('sockSeen', true); /* lint-ignore */ st('socks'); pay(0.3, 'Sock'); snd('boing');
        const t = seen ? L.sockAgain : L.sock; strip(t); say(t, { priority: 1, mood: 'confused' }); api.toast('A sock has arrived in the tube.');
      }
      function rareTuesday() {
        S.tueN++; st('tuesdays'); api.flag.set('tiny-bureaucracy.tuesday', true); doorLight(2); snd('buzz'); strip(L.tue1); say(L.tue1, { priority: 1, mood: 'panic' });
        const tok = S.token;
        api.setTimeout(function () { if (S.dead || tok !== S.token) return; strip(L.tue2); say(L.tue2, { priority: 1, mood: 'confused' }); }, api.selftest ? 2000 : 6000);
      }
      function rareRoll() {
        if (S.beat < 1 || S.beat > 8 || S.ending || quiet()) return;
        const r = api.rand(), k = api.selftest ? 4 : 1;
        if (r < 0.03 * k && S.sockN < 3) { S.sockN++; rareSock(); } else if (r < 0.05 * k && S.beat >= 3 && S.tueN < 2) rareTuesday();
      }
      function clockClick() {
        if (S.dead) return;
        touch(); S.clockN++; snd('tick');
        if (S.clockN < 7) strip(L.clock[S.clockN - 1]);
        else if (S.clockN === 7) {
          refs.clock.setAttribute('late', ''); st('thirtyfirst'); api.flag.set('tiny-bureaucracy.clock731', true); api.achieve('tiny-bureaucracy.seven-thirty-one');
          strip(L.clock731); say(L.clock731, { priority: 2, mood: 'confused' }); api.sfx('bell'); api.confetti(undefined, undefined, 40);
          const tok = S.token;
          api.setTimeout(function () { if (S.dead || tok !== S.token) return; refs.clock.removeAttribute('late'); strip(L.clockBack); }, 7000);
        } else strip(pk('clockMore'));
      }
      function ambient() {
        const b = S.beat, tier = b <= 1 ? 0 : (b <= 3 ? 1 : (b <= 5 ? 2 : (b <= 7 ? 3 : 4))), ln = pk('amb' + tier);
        S.ambN++; strip(ln);
        if (S.ambN % 3 === 0) say(ln, { mood: 'neutral' });
      }
      /* ---------------------------------------------------------- the master tick (250 ms) */
      function tick() {
        if (S.dead) return;
        const t = api.now(), idle = (t - S.lastInput) / 1000;
        S.beatSec += 0.25;
        if (idle < 20 && !S.ending && !S.unwinding && !S.cab && !S.filing && !S.press) S.sinceFile += 0.25;
        checkBeat();
        if (S.lightUntil && t > S.lightUntil) { S.lightUntil = 0; refs.door.removeAttribute('lit'); }
        if (!S.noteDone && refs.note.hidden && idle >= (api.selftest ? 4 : 45) && !S.ending) { S.noteDone = true; refs.note.textContent = L.idleNote; refs.note.hidden = false; }
        if (!S.closed && !S.ending && !quiet()) {
          const IT = api.selftest ? [3, 5, 7, 8] : [20, 75, 110, 150];
          if (!S.idle40 && idle >= (api.selftest ? 4 : 40)) { S.idle40 = true; say(L.idle40, { mood: 'neutral' }); }
          if (S.idleSt < 1 && idle >= IT[0]) { S.idleSt = 1; strip(pk('idle1')); }
          else if (S.idleSt < 2 && idle >= IT[1]) { S.idleSt = 2; say(pk('idle2'), { mood: 'confused' }); }
          else if (S.idleSt < 3 && idle >= IT[2]) { S.idleSt = 3; doorLight(8); strip(pk('idle3')); snd('tick'); }
          else if (S.idleSt < 4 && idle >= IT[3]) { S.idleSt = 4; say(pk('idle4'), { priority: 1, mood: 'disappointed' }); }
        }
        if (!S.closed && idle >= (api.selftest ? 9 : 180) && !S.ending) closeOffice();
        if (S.closed && !S.ending) { S.nightT += 0.25; if (S.nightT >= (api.selftest ? 3 : 60)) { S.nightT = 0; const nl = pk('night'); strip(nl); say(nl, { mood: 'neutral' }); } }
        if (idle < 30 && !S.closed) S.play += 0.25;
        if (idle < 15 && !S.closed && !S.ending && !S.unwinding && !S.cab && !S.filing && !S.press && !quiet()) {
          S.ambT += 0.25;
          if (S.ambT >= S.ambIn) {
            if (t - S.stripT < 5000) S.ambT = S.ambIn - 1;
            else { S.ambT = 0; S.ambIn = api.selftest ? 4 : api.randInt(17, 24); ambient(); }
          }
          if (!S.funDone && S.play >= S.funNext && !S.fun) funStart();
          else if (!S.retroDone && S.play >= (api.selftest ? 45 : 600)) retroStart();
        }
        if (S.fun) { if (S.closed) S.fun.until += 250; else if (t > S.fun.until) { S.fun = null; refs.fun.hidden = true; S.funDone = false; S.funNext = S.play + (api.selftest ? 15 : 120); strip(L.funMiss); say(L.funMiss, { mood: 'disappointed' }); } }
        if (S.beat >= 2 && S.beat <= 8 && !S.ending && !S.closed) {
          S.fSpawn += 0.25;
          if (S.fSpawn >= (S.firstFlag ? (api.selftest ? 2 : 8) : (S.beat === 8 ? (api.selftest ? 3 : 12) : (api.selftest ? 10 : 35)))) { S.fSpawn = 0; spawnFlag(); }
          S.flags.slice(4).forEach(function (f) { f.born += 250; }); /* flags nobody can see yet do not age */
          const dead = S.flags.slice(0, 4).filter(function (f) { return !f.kind && t - f.born > (api.selftest ? 12000 : 40000); });
          if (dead.length) {
            S.flags = S.flags.filter(function (f) { return dead.indexOf(f) < 0; });
            V.ign += dead.length; st('flags_ignored', dead.length); strip(L.flagIgnored); persist();
            if (S.flags.every(function (f) { return f.id !== S.flagOpen; })) S.flagOpen = 0;
            renderFlags();
          }
        }
        if (S.closed) { if (S.q.st === 'window') S.q.until += 250; S.flags.forEach(function (f) { f.born += 250; }); } else qTick();
        if (S.lull && t > S.lullEnd) {
          S.lull = false; refs.desk.removeAttribute('soft'); refs.dennis.hidden = false;
          strip(L.lullEnd); say(L.dennisPromo, { priority: 1, mood: 'proud' });
        }
        if (S.lull && t - S.stripT > 6500 && t < S.lullEnd - 1500) strip(pk('lullQ'));
        if (S.confisc && t > S.confisc) duckOff(false);
        if (S.toastUntil && t > S.toastUntil) { S.toastUntil = 0; refs.toast.hidden = true; }
        if (S.undo && t > S.undo.until) { S.undo = null; refs.undo.hidden = true; }
        if (S.sinceFile > 90) {
          S.sinceFile = 0;
          const top = S.stack[S.stack.length - 1];
          if (top.kind === 'normal' && !S.ending) {
            top.corr = null; top.attach = { slot: false, child: null, loop: false }; top.tri = false; top.gerald = ''; top.fields = [mkField('name')];
            strip('The form has been simplified. It asked to be. It said it was tired.'); renderAll();
          }
        }
        renderFoot();
      }
      /* ---------------------------------------------------------- the ending that is not an ending */
      function showCert() {
        if (!S.ending) return;
        clear(refs.cert);
        refs.cert.appendChild(el('div', { k: 'certbox' }, el('h3', { text: 'Certificate of Completion (Incomplete)' }), el('div', { text: L.cert }),
          el('div', { text: 'Careers Completed: ' + V.career }),
          el('div', null, 'Signed: S. ', V.sig ? el('svg', { viewBox: '0 0 240 80', width: 120, height: 40, 'aria-label': 'Signature, which matches' },
            el('polyline', { points: V.sig.map(function (p) { return p[0] + ',' + p[1]; }).join(' '), fill: 'none', stroke: '#6a4fa3', 'stroke-width': 3 })) : null),
          api.stat.get(SP + 'quacks') > 0 ? el('div', { text: 'Witnessed by: Duck (colleague, 8 seconds)' }) : null,
          el('button', { type: 'button', onclick: continueCareer }, 'Take a form')));
        refs.cert.hidden = false; refs.serving.textContent = 'Back at 7:30'; snd('bell');
        if (V.sig) api.setTimeout(function () { if (S.ending && !S.dead) say(L.sigMatch, { priority: 1, mood: 'smug' }); }, 2500);
        const b = refs.cert.querySelector('button'); if (b) b.focus();
      }
      function doEnding() {
        if (S.ending) return;
        S.ending = true;
        const tok = S.token, live = function () { return !S.dead && tok === S.token; };
        st('f0'); pay(10, 'Form F-0'); snd('tada'); api.confetti(undefined, undefined, 120);
        refs.door.setAttribute('flicker', ''); doorLight(2);
        if (S.q.num) { S.q.serving = String(S.q.num); paintQueue(); }
        strip(L.f0done); say(L.f0done, { priority: 2, mood: 'proud' });
        if (api.flag.get('metGerald')) api.setTimeout(function () { if (live()) api.say(L.geraldEnd, { who: 'Gerald', mood: 'proud', priority: 1 }); }, 3500);
        api.setTimeout(function () { if (live()) { refs.door.removeAttribute('flicker'); showCert(); } }, 1000);
        api.setTimeout(function () { if (live() && S.ending) continueCareer(); }, 14000);
      }
      function continueCareer() {
        if (!S.ending || S.dead) return;
        S.ending = false; refs.cert.hidden = true; api.sfx('tick');
        V.career++; st('careers'); api.achieve('tiny-bureaucracy.career');
        resetCareer();
        pay(3, 'Career End Bonus');
        say(sub(L.careers, V.career - 1), { priority: 2, mood: 'proud', force: true }); strip(L.postReset);
        refs.dnote.hidden = false; refs.dnote.textContent = 'Back soon.';
        const tok = S.token;
        api.setTimeout(function () { if (!S.dead && tok === S.token) say(L.closing, { priority: 1, mood: 'smug' }); }, 4500);
        api.setTimeout(function () { if (!S.dead && tok === S.token) say(L.rumour, { mood: 'smug' }); }, 12000);
        persist();
      }
      function resetCareer() {
        S.token++;
        S.flags = []; S.flagOpen = 0; S.kindN = 0; S.firstFlag = true; S.fSpawn = 0; S.q = newQ(); S.ink = 6; S.rej = 0; S.filing = false; S.cab = false; S.unwinding = false;
        S.press = null; S.faintRun = 0; S.topIdx = 0; S.zeroNext = false; S.lastZero = false; S.lull = false; S.quietUntil = 0; S.escOpen = false; S.loopDone = false;
        S.afterReset = true; S.beat = 0; S.sinceFile = 0; S.lightUntil = 0;
        refs.cab.hidden = true; refs.esc.hidden = true; refs.toast.hidden = true; refs.tubecol.removeAttribute('busy'); refs.door.removeAttribute('lit'); refs.desk.removeAttribute('soft');
        refs.receipt.hidden = true;
        S.stack = [nextTop()];
        startBeat(0, 'reset');
      }
      /* ---------------------------------------------------------- keyboard */
      function stampAndFile() {
        if (S.dead || S.filing) return;
        slam(0, 'enter');
        const tok = S.token;
        api.setTimeout(function () { if (!S.dead && tok === S.token) fileTube(); }, 350);
      }
      function onKey(e) {
        if (S.dead) return;
        const t = e.target;
        if (t && t !== window && t !== document && !root.contains(t) && !/^(BODY|HTML)$/.test(t.tagName || '')) return;
        touch();
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const key = String(e.key || ''), tag = (t && t.tagName) || '';
        const typing = (tag === 'INPUT' && (t.type === 'text' || t.type === 'search')) || tag === 'TEXTAREA' || tag === 'SELECT';
        if (key === 'Escape') { esc(); return; }
        if (typing) return;
        if (key === ' ') {
          if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'SUMMARY') return;
          e.preventDefault(); slam(0, 'kb'); return;
        }
        const k = key.toLowerCase();
        if (k.length !== 1) return;
        if (k >= '1' && k <= '5') arm(Number(k));
        else if (k === 'f') fileTube();
        else if (k === 'k') knock(!!e.shiftKey);
        else if (k === 'q') answerWindow();
        else if (k === 't') takeNumber();
        else if (k === 'u') doUndo();
      }
      function doUndo() {
        if (S.dead || !S.undo || api.now() >= S.undo.until) return;
        S.formsFiled += S.undo.n; S.undo = null; refs.undo.hidden = true; snd('ding'); strip(L.undo); say(L.undo, { priority: 1, mood: 'proud' }); renderFoot();
      }
      function enterNext(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const list = Array.prototype.slice.call(refs.form.querySelectorAll('input[type=text],select'));
        const i = list.indexOf(e.target);
        if (i >= 0 && i < list.length - 1) list[i + 1].focus(); else stampAndFile();
      }
      /* ---------------------------------------------------------- stamp follower and form click */
      function onMove(e) {
        if (S.dead || (e.pointerType && e.pointerType !== 'mouse')) return;
        const t = api.now(), x = fin(e.clientX) ? e.clientX : 0, y = fin(e.clientY) ? e.clientY : 0, dt = t - S.lastT;
        S.ptype = 'mouse';
        if (S.lastX !== null && dt > 0) { const v = (x - S.lastX) / dt; if (fin(v)) S.vx = S.vx * 0.7 + v * 0.3; }
        S.lastX = x; S.lastT = t; S.lastMove = t;
        S.tilt = fin(S.vx) ? clamp(S.vx * 22, -20, 20) : 0;
        const over = refs.formwrap.contains(e.target) && !S.cab && !S.filing && !S.ending;
        if (over) {
          const r = refs.desk.getBoundingClientRect();
          S.px = x - r.left + 14; S.py = y - r.top + 14;
          refs.armed.style.transform = 'translate(' + S.px + 'px,' + S.py + 'px) rotate(' + S.tilt + 'deg)';
          refs.armed.setAttribute('show', '');
        } else refs.armed.removeAttribute('show');
        if (S.tiltT) api.clearTimeout(S.tiltT);
        S.tiltT = api.setTimeout(function () { S.tiltT = 0; S.vx = 0; S.tilt = 0; refs.armed.style.transform = 'translate(' + S.px + 'px,' + S.py + 'px) rotate(0deg)'; }, 160);
      }
      function onFormClick(e) {
        const t = e.target;
        if (t && t.closest && t.closest('input,select,textarea,button,label,canvas,a')) return;
        const r = refs.form.getBoundingClientRect();
        const pos = r.width > 0 && r.height > 0 && fin(e.clientX) && fin(e.clientY)
          ? { x: clamp(Math.round((e.clientX - r.left) / r.width * 100), 14, 86), y: clamp(Math.round((e.clientY - r.top) / r.height * 100), 24, 90) } : null;
        let how = 'mouse', tilt = curTilt();
        if (e.detail === 0) { how = 'kb'; tilt = 0; }
        else if (S.ptype === 'touch') { how = 'touch'; tilt = r1(api.rand() * 20 - 10); }
        slam(tilt, how, pos);
      }
      /* ---------------------------------------------------------- form rendering */
      function textField(fr, f) {
        const d = TXT[f.type];
        const hint = el('small', { k: 'hint', text: d[1] });
        let timer = 0;
        const inp = el('input', { type: 'text', maxlength: 60, value: f.val, 'aria-label': d[0], placeholder: f.type === 'date' ? 'Wednesday' : '',
          oninput: function () {
            f.val = inp.value;
            if (/sandra/i.test(f.val)) nameTrap(fr);
            if (f.type === 'surname') { const n = f.val.length; hint.textContent = n === 0 ? d[1] : (n < 4 ? sub(L.surnameOk, n) : (n === 4 ? L.surnameExact : sub(L.surnameBad, n))); }
            if (f.type === 'occupation') { hint.textContent = d[1]; if (timer) api.clearTimeout(timer); if (f.val) timer = api.setTimeout(function () { hint.textContent = L.noun; }, 1200); }
            if (f.type === 'name' && f.val.length > 14 && !f.sassy) { f.sassy = true; strip(L.confident); }
          },
          onkeydown: enterNext,
          onchange: function () { if (f.val && api.chance(0.3)) strip(pk('noted')); } });
        const lab = el('span', { k: 'lab', text: d[0] });
        if (f.type !== 'name') return el('label', { k: 'fld' }, lab, inp, hint);
        const names = ['Valued Employee'];
        if (api.player.name !== 'Valued Employee') names.push(api.player.name);
        return el('div', { k: 'fld' }, el('label', { k: 'fld' }, lab, inp),
          el('div', { k: 'chips' }, ...names.map(function (nm) { return el('button', { type: 'button', onclick: function () { inp.value = nm; f.val = nm; strip(L.auto); snd('tick'); } }, nm); })), hint);
      }
      function reasonField(fr, f) {
        const sel = el('select', { 'aria-label': 'Reason for request', onchange: function () { f.val = sel.value; const i = REASONS.indexOf(f.val); if (i >= 0) { S.rsn[i] = (S.rsn[i] || 0) + 1; strip(S.rsn[i] > 1 ? L.reasons2[i] : L.reasons[i]); } } },
          el('option', { value: '', text: '-- select --' }), ...REASONS.map(function (r) { return el('option', { value: r, text: r }); }));
        sel.value = f.val;
        return el('label', { k: 'fld' }, el('span', { k: 'lab', text: 'Reason for request' }), sel);
      }
      function idsField(fr, f) {
        const labs = ['I am the person named above', 'I am not the person named above', 'I am technically the person named above', 'See above'];
        const tag = el('span', { k: 'tag' });
        let row4 = null;
        const count = function () { return (f.val[0] ? 1 : 0) + (f.val[1] ? 1 : 0) + (f.val[2] ? 1 : 0); };
        const paint = function () { tag.textContent = (f.val[0] && f.val[1]) ? 'Rejected for being both' : ''; };
        const fs = el('fieldset', { k: 'ids' }, el('legend', { text: 'Identity' }));
        labs.forEach(function (lb, i) {
          const cb = el('input', { type: 'checkbox', checked: !!f.val[i], onchange: function () {
            f.val[i] = cb.checked; paint();
            if (cb.checked && i === 1) strip(L.idCandour);
            else if (cb.checked && i === 2) { strip(L.idTech); if (api.chance(0.12)) { const tok = S.token; api.setTimeout(function () { if (!S.dead && tok === S.token) strip(L.sigh); }, 1800); } }
            if (i < 3 && count() >= 2 && row4 && row4.hidden) { row4.hidden = false; strip(L.id4); }
            else if (f.val[0] && f.val[1] && i < 2 && cb.checked) strip(L.idBoth);
          } });
          const row = el('label', { k: 'tick' }, cb, el('span', { text: lb }));
          if (i === 3) { row4 = row; row.hidden = !(count() >= 2 || f.val[3]); }
          fs.appendChild(row);
        });
        paint();
        return el('div', { k: 'fld' }, fs, tag);
      }
      function sigField(fr) {
        const gl = el('span', { k: 'gl', text: 'Drift: ' + (fin(fr.drift) ? fr.drift + '%' : '--') });
        const mk = el('i', { style: { left: (fin(fr.drift) ? clamp(fr.drift, 0, 100) : 0) + '%' } });
        refs.gl = gl; refs.gmk = mk;
        return el('div', { k: 'fld' }, el('span', { k: 'lab', text: 'Signature (sign as before)' }),
          el('div', { k: 'sigw' }, refs.cv,
            el('div', { k: 'sigbtns' }, el('button', { type: 'button', onclick: sigClear }, 'Clear'), el('button', { type: 'button', onclick: sigType }, 'Sign by typing')),
            el('div', { k: 'gauge' }, mk), gl));
      }
      function boxField(fr, f) {
        const cb = el('input', { type: 'checkbox', checked: !!f.val, onchange: function () {
          f.val = cb.checked;
          if (cb.checked) { if (f.act === 'loop') loopAck(); else if (api.chance(0.5)) strip(pk('noted')); }
        } });
        return el('label', { k: 'tick' }, cb, el('span', { text: f.label }));
      }
      function buildField(fr, f) {
        if (TXT[f.type]) return textField(fr, f);
        if (f.type === 'reason') return reasonField(fr, f);
        if (f.type === 'ids') return idsField(fr, f);
        if (f.type === 'sig') return sigField(fr);
        if (f.type === 'box') return boxField(fr, f);
        if (f.type === 'fixed') return el('div', { k: 'fld' }, el('span', { k: 'lab', text: f.label }), el('div', { k: 'fixed', text: f.val || '(left blank)' }));
        return null;
      }
      function auditBlock() {
        const kn = V.knocks > 7 ? '7 1/2' : String(V.knocks);
        const rp = function (t, a, b) { return t.split(a).join(String(b)); };
        const lines = [rp(rp(L.audit1, '%p', api.player.name), '%k', kn), rp(rp(L.audit2, '%i', V.ign), '%a', V.ans), rp(L.audit3, '%q', S.q.num || 41)];
        const kids = [el('ol', { k: 'auditl' }, ...lines.map(function (l) { return el('li', { text: l }); }))];
        if (V.sig) kids.push(el('svg', { viewBox: '0 0 240 80', width: 120, height: 40, 'aria-label': 'Signature on file' },
          el('polyline', { points: V.sig.map(function (p) { return p[0] + ',' + p[1]; }).join(' '), fill: 'none', stroke: '#6a4fa3', 'stroke-width': 3 })));
        return el('div', { k: 'fld' }, ...kids);
      }
      function geraldClick(fr) {
        if (S.dead || fr.gerald !== 'ask') return;
        if (api.flag.get('metGerald')) {
          fr.gerald = 'done'; strip(L.geraldYes); api.say('NOT NOT APPROVED', { who: 'Gerald', mood: 'proud', priority: 1 }); snd('stamp'); st('gerald');
        } else {
          fr.gerald = 'wait'; strip(L.geraldNo); st('gerald_waits');
          const tok = S.token;
          api.setTimeout(function () { if (S.dead || tok !== S.token) return; fr.gerald = 'late'; if (active() === fr) renderForm(); }, 3000);
        }
        renderForm();
      }
      function renderForm() {
        ensureStack();
        const fr = active(), F = refs.form, ctl = 'input,select,[k=slot],[k=pad]';
        const ae = document.activeElement, fidx = (ae && F.contains(ae)) ? Array.prototype.indexOf.call(F.querySelectorAll(ctl), ae) : -2;
        clear(F);
        refs.formwrap.setAttribute('data-pile', String(Math.min(3, S.stack.length - 1)));
        if (fr.mut) refs.desk.setAttribute('mut', fr.mut); else refs.desk.removeAttribute('mut');
        if (fr.mut && !fr.mutSaid) { fr.mutSaid = true; strip(fr.mut === 'left' ? L.mutLeft : (fr.mut === 'green' ? L.mutGreen : L.mutLunch)); }
        const fold = S.folded && fr.kind === 'normal';
        if (fold) F.setAttribute('fold', ''); else F.removeAttribute('fold');
        F.appendChild(el('div', { k: 'head' }, fold ? el('b', { k: 'num', text: 'F-3F' }) : (fr.num ? el('b', { k: 'num', text: fr.num }) : null),
          el('span', { k: 'title', text: fr.title || '' }), fr.kind === 'correction' ? el('i', { k: 'ctag', text: 'CORRECTION' }) : null));
        const fl = el('div', { k: 'fields' });
        refs.gl = null;
        if (fr.kind === 'audit') fl.appendChild(auditBlock());
        else fr.fields.forEach(function (f) { const n = buildField(fr, f); if (n) fl.appendChild(n); });
        F.appendChild(fl);
        refs.slot = null;
        if (fr.kind === 'loop') F.appendChild(el('button', { k: 'slot', type: 'button', red: true, onclick: function () { say(L.loop9, { priority: 1, mood: 'confused' }); strip(L.loop9); } }, 'Requires proof of Form R-9'));
        else if (fr.attach.slot) {
          if (fr.attach.child) F.appendChild(el('div', { k: 'attached' }, el('span', { k: 'clip', text: '📎' }), el('span', { text: 'Proof attached: ' + fr.attach.child.num + ' (' + fr.attach.child.title + ')' })));
          else {
            refs.slot = el('button', { k: 'slot', type: 'button', onclick: pushChild },
              fr.attach.loop ? 'Attach proof of Form F-1 (Application to Begin)' : 'Attach proof of Form R-' + depthLabel(fr.depth + 1) + ' (Request for R-' + depthLabel(fr.depth + 2) + ')');
            F.appendChild(refs.slot);
          }
        }
        if (fr.gerald) {
          const g = fr.gerald;
          if (g === 'ask') F.appendChild(el('button', { k: 'slot', type: 'button', onclick: function () { geraldClick(fr); } }, 'Countersign (Vice President)'));
          else if (g === 'wait') F.appendChild(el('div', { k: 'smudge', text: 'Waiting behind 4 forms' }));
          else if (g === 'late') F.appendChild(el('div', { k: 'smudge', text: 'Countersignature pending. Gerald is a potato.' }));
          else F.appendChild(el('div', { k: 'smudge' }, el('span', { text: '🥔' }), el('span', { text: 'NOT NOT APPROVED' })));
        }
        if (fr.tri) {
          const sheets = el('div', { k: 'sheets', 'data-c': fr.carbon || 'none' }, el('span', { text: 'white: top' }), el('span', { text: 'yellow: Sandra' }), el('span', { text: V.kevin ? 'pink: Kevin' : 'pink: pocket' }));
          if (fr.pressed) sheets.setAttribute('routed', '');
          F.appendChild(sheets);
          refs.pad = el('button', { k: 'pad', type: 'button', 'aria-label': 'Press firmly. Hold, then release in the green band.',
            onpointerdown: function (e) { padDown(e); },
            onpointerup: function () { padUp(); }, onpointercancel: function () { padUp(); }, onlostpointercapture: function () { padUp(); },
            onkeydown: function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); padDown(null); } },
            onkeyup: function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); padUp(); } },
            onclick: function (e) { if (!S.press && api.now() - S.lastPadEnd > 120 && !active().pressed) { padDown(null); api.setTimeout(function () { padUp(); }, 60); } else e.preventDefault(); } }, fr.pressed ? 'PRESSED' : 'PRESS FIRMLY');
          if (!S.padUsed && !fr.pressed) refs.pad.setAttribute('hint', '');
          if (!S.padHow) { S.padHow = true; strip(L.padHow); }
          F.appendChild(el('div', { k: 'padrow' }, refs.pad, el('small', { text: 'Hold the pad. Let go inside the green band for a clean copy. Too long and it goes through the desk.' })));
          if (V.kevin) F.appendChild(el('span', { k: 'kevin', text: 'Kevin was here' }));
        } else refs.pad = null;
        if (fr.kind !== 'zero') F.appendChild(el('div', { k: 'zone', 'aria-hidden': 'true', hint: api.stat.get(SP + 'stamps') === 0, text: fr.tpl === 'unstamped' ? 'STAMP BOX (click here)' : 'STAMP HERE: click, tap, or press Space' }));
        F.appendChild(el('div', { k: 'ft', text: footerFor(fr) }));
        fr.marks.forEach(function (m) { F.appendChild(markEl(m)); });
        drawSig();
        if (fidx > -2) { /* the form was rebuilt under the keyboard: put focus back where it was (or on the first field of a new form) */
          const all = F.querySelectorAll(ctl), first = F.querySelector('input[type=text],select');
          const t = (S.lastFid === fr.id && fidx >= 0 && fidx < all.length) ? all[fidx] : (first || all[0]);
          if (t && t.focus) { try { t.focus({ preventScroll: true }); } catch (e) { /* unfocusable */ } }
        }
        S.lastFid = fr.id;
      }
      function renderCrumbs() {
        const nums = S.stack.map(function (f) { return f.num || 'Blank'; });
        const parts = nums.length > 6 ? [nums[0], '...'].concat(nums.slice(-4)) : nums;
        const box = refs.crumbs;
        clear(box);
        box.hidden = S.stack.length < 2;
        parts.forEach(function (n, i) {
          if (i) box.appendChild(el('i', { k: 'sep', 'aria-hidden': 'true', text: '>' }));
          box.appendChild(el('span', { k: 'chip', text: n }));
        });
        if (S.stack.length > 1) box.appendChild(el('button', { k: 'chip', type: 'button', style: { minHeight: 36 }, onclick: esc }, 'Back (Esc)'));
        box.appendChild(el('span', { k: 'depth', text: (S.beat === 8 ? 'Altitude: ' : 'Depth: ') + depthLabel(active().depth) }));
      }
      function renderFoot() {
        if (!refs.footline) return;
        refs.footline.hidden = S.hi < 1;
        const tx = (S.beat === 8 ? 'Altitude: ' : 'Depth: ') + depthLabel(active().depth) + ' | Forms Filed: ' + S.formsFiled + ' | Sandra Flags Open: ' + openFlags() + (V.career > 1 ? ' | Careers Completed: ' + (V.career - 1) : '');
        if (refs.footline.textContent !== tx) refs.footline.textContent = tx;
        const n = Math.max(1, 4 - (S.topIdx % 4));
        if (refs.trayn.textContent !== String(n)) { refs.trayn.textContent = String(n); clear(refs.edges); for (let i = 0; i < n; i++) refs.edges.appendChild(el('i', { k: 'edge' })); }
      }
      function paintTools() {
        refs.inkpad.hidden = S.hi < 5; refs.stapler.hidden = S.hi < 4; refs.cabbtn.hidden = S.hi < 7; refs.dennis.hidden = S.hi < 8 && !S.lull;
        refs.stapler.textContent = (S.stapN >= 6 ? (S.stapSigned ? 'Stapler (certified)' : 'Stapler: Sign') : 'Stapler: Demand ' + (S.stapN + 1)) + (S.beat === 8 ? ' (Facilitator)' : '');
      }
      function paintNames() { /* the restructure renames everything and moves nothing */
        const r = S.beat === 8;
        refs.tubebtn.textContent = r ? 'Release Into the Wild (F)' : 'File in Tube (F)';
        refs.slam.textContent = r ? 'Gesture Approvingly (Space)' : 'Stamp it (Space)';
        refs.traylab.textContent = r ? 'WELCOME BASKET: ' : 'IN-TRAY: ';
        if (!S.closed) refs.sign.textContent = r ? 'ARRIVALS' : 'IN';
      }
      function renderAll() {
        if (S.dead) return;
        paintNames();
        refs.armed.removeAttribute('show');
        S.curStroke = null; S.escOpen = false; refs.esc.hidden = true;
        renderCrumbs(); renderForm(); renderFoot(); renderRack(); paintInk(); paintTools(); paintQueue(); renderFlags();
      }
      /* ---------------------------------------------------------- DOM (built once; the form region is rebuilt per frame) */
      function K(k, tag, attrs) {
        const kids = Array.prototype.slice.call(arguments, 3);
        const e = el.apply(null, [tag, Object.assign({ k: k }, attrs || {})].concat(kids));
        refs[k] = e;
        return e;
      }
      refs.cv =el('canvas', { k: 'sigcv', width: 240, height: 80, 'aria-label': 'Signature pad. Draw with a pointer, or use Sign by typing.' });
      try { S.cx = refs.cv.getContext('2d'); } catch (e) { S.cx = null; }
      const pipeD = 'M6 24 H78 C112 24 112 64 78 64 H40 C12 64 12 100 46 100 H132';
      refs.pipe = el('path', { d: pipeD, fill: 'none', stroke: '#b8862b', 'stroke-width': 14, 'stroke-linecap': 'round' });
      refs.cap = el('circle', { cx: 6, cy: 24, r: 7, fill: '#FFF4DC', stroke: '#2A2A3C', 'stroke-width': 2 });
      refs.puff = el('g', { k: 'puff' }, el('circle', { cx: 10, cy: 16, r: 6, fill: '#fff' }), el('circle', { cx: 20, cy: 10, r: 4, fill: '#fff' }));
      const tubeSvg = el('svg', { k: 'tubesvg', viewBox: '0 0 140 124', 'aria-hidden': 'true' }, refs.pipe, el('path', { d: pipeD, fill: 'none', stroke: '#8a5f12', 'stroke-width': 7, 'stroke-linecap': 'round' }), refs.puff, refs.cap);
      const defs = el('svg', { width: 0, height: 0, 'aria-hidden': 'true', style: 'position:absolute' },
        el('filter', { id: 'm-tiny-bureaucracy-rough' }, el('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.04', numOctaves: '2', result: 'n' }), el('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: '3' })));
      const desk = K('desk', 'div', { class: 'm-tiny-bureaucracy-desk' }, defs,
        K('top', 'div', null,
          K('door', 'button', { type: 'button', 'aria-label': "Knock on Sandra's door", onclick: function (e) { knock(!!e.shiftKey); } },
            K('glow', 'span'), K('crack', 'span'), K('dnote', 'span', { text: 'S. / Compliance' }), K('sign', 'span', { text: 'IN' })),
          K('clockwrap', 'div', null, K('clock', 'button', { type: 'button', 'aria-label': 'Wall clock, reading 7:30 with total confidence. Press to touch it.' }, K('hh', 'i'), K('mh', 'i'), K('sh', 'i')),
            K('clockcap', 'span', { text: 'The clock is certain.' })),
          K('queue', 'div', null, el('small', { text: 'NOW SERVING' }), K('serving', 'b', { 'aria-live': 'off', text: '--' }), el('small', { text: 'YOUR NUMBER' }), K('yours', 'b', { text: '--' }),
            K('qbtns', 'div', null,
              K('take', 'button', { type: 'button', hidden: true, onclick: takeNumber }, 'Take a Number'),
              K('win', 'button', { type: 'button', hidden: true, onclick: answerWindow }, 'Window 7'),
              K('dolores', 'button', { type: 'button', hidden: true, 'aria-label': 'Dolores, who is waiting in the queue', onclick: dolores }, '👤'),
              K('receipt', 'button', { type: 'button', hidden: true, onclick: function () { strip(L.receipt); snd('tick'); } }, 'Receipt')))),
        K('strip', 'div', { 'aria-live': 'polite', role: 'status' }),
        K('crumbs', 'div', { role: 'group', 'aria-label': 'Forms on the stack', hidden: true }),
        K('bench', 'div', null,
          K('tray', 'div', { role: 'group', 'aria-label': 'In-tray' }, K('edges', 'div'), el('span', null, K('traylab', 'span', { text: 'IN-TRAY: ' }), K('trayn', 'b', { text: '1' }))),
          K('formwrap', 'div', null, K('form', 'section', { 'aria-label': 'Active form', onclick: onFormClick, onpointerdown: function (e) { S.ptype = e.pointerType === 'touch' ? 'touch' : 'mouse'; } }),
            K('flags', 'div', { role: 'group', 'aria-label': 'Sandra flags' }),
            K('esc', 'div', { hidden: true, role: 'alertdialog', 'aria-label': 'Leave this form' }, el('span', { text: 'Are you sure? That is a form.' }),
              el('button', { type: 'button', onclick: escYes }, 'Yes (a form)'), el('button', { type: 'button', onclick: function () { S.escOpen = false; refs.esc.hidden = true; } }, 'No (also a form)'))),
          K('tubecol', 'div', null, tubeSvg, K('tubebtn', 'button', { type: 'button', onclick: fileTube }, 'File in Tube (F)'), K('toast', 'button', { type: 'button', hidden: true, 'aria-label': 'Toast delivered by the tube', onclick: function () {
            refs.toast.hidden = true; S.toastUntil = 0; st('toast'); pay(0.5, 'Toast'); snd('pop'); strip(L.toastEaten); say(L.toastEaten, { mood: 'proud' }); } }, '🍞'))),
        K('rack', 'div', { role: 'group', 'aria-label': 'Stamp rack' }, K('stamps', 'div'),
          K('slam', 'button', { type: 'button', onclick: function () { slam(0, 'btn'); } }, 'Stamp it (Space)'),
          K('inkpad', 'button', { type: 'button', hidden: true, 'aria-label': 'Ink pad. Click three times quickly, or hold, to re-ink.',
            onclick: function () { const t = api.now(); S.inkClicks = S.inkClicks.filter(function (x) { return t - x < 1500; }); S.inkClicks.push(t); if (S.inkClicks.length >= 3) reink(); else snd('tick'); },
            onpointerdown: function () { if (S.padHold) api.clearTimeout(S.padHold); S.padHold = api.setTimeout(function () { S.padHold = 0; reink(); }, 1000); },
            onpointerup: function () { if (S.padHold) { api.clearTimeout(S.padHold); S.padHold = 0; } }, onpointercancel: function () { if (S.padHold) { api.clearTimeout(S.padHold); S.padHold = 0; } } },
            K('inktxt', 'span', { text: 'Ink 6/6' }), K('inkbar', 'span')),
          K('h12', 'div', { hidden: true }, el('div', { text: 'Form H-12 (Request for Gentler Treatment)' }),
            el('label', { k: 'tick' }, (refs.h12cb = el('input', { type: 'checkbox', onchange: function () { if (refs.h12cb.checked) duckOff(true); } })), el('span', { text: 'I will be gentler' })))),
        K('tools', 'div', null, K('fun', 'button', { type: 'button', hidden: true, onclick: funClick }, 'Have Fun (mandatory) 0/6'), K('undo', 'button', { type: 'button', hidden: true, onclick: doUndo }, 'Undo Form Zero (U)'), K('cabbtn', 'button', { type: 'button', hidden: true, onclick: openCab }, 'Filing Cabinet'),
          K('stapler', 'button', { type: 'button', hidden: true, onclick: function () {
            if (S.stapN < 6) { strip(L.stapler[S.stapN]); S.stapN++; snd('tick'); api.flag.set('metStapler', true); }
            else if (!S.stapSigned) { S.stapSigned = true; strip(L.stapSigned); say(L.stapSigned, { mood: 'proud' }); snd('tada'); st('stapler'); }
            else { S.stapMore++; strip(S.stapMore === 1 ? L.stapRumour : pk('stapMore')); }
            paintTools(); } }, 'Stapler')),
        K('foot', 'div', null, K('footline', 'span'), el('details', { k: 'log' }, el('summary', { text: 'Forms Filed' }), K('logul', 'ul'))),
        K('armed', 'div', { 'aria-hidden': 'true' }),
        K('note', 'button', { type: 'button', hidden: true, onclick: function () { refs.note.hidden = true; pay(0.5, 'Sandra Note'); st('notes'); snd('ding'); strip(L.idleNoteClick); say(L.idleNoteClick, { mood: 'confused' }); } }),
        K('mop', 'span', { hidden: true, 'aria-hidden': 'true', text: '🧹' }),
        K('duck', 'span', { hidden: true, 'aria-hidden': 'true', text: '🦆' }),
        K('dennis', 'span', { hidden: true, 'aria-hidden': 'true', text: '🌿' }),
        K('cab', 'div', { hidden: true, role: 'dialog', 'aria-label': 'Filing cabinet' }),
        K('cert', 'div', { hidden: true, role: 'dialog', 'aria-label': 'Certificate of Completion' }));
      root.appendChild(desk);
      refs.cabbtn = refs.cabbtn || null;
      api.setTitle('Department of Preliminary Matters');
      /* ---------------------------------------------------------- listeners */
      api.on(refs.clock, 'click', clockClick);
      api.on(root, 'pointerdown', touch);
      api.on(root, 'input', touch);
      api.on(window, 'keydown', onKey);
      api.on(window, 'keyup', function (e) { if (S.press && (e.key === ' ' || e.key === 'Enter')) padUp(); });
      api.on(window, 'blur', function () { padUp(); });
      api.on(window, 'resize', onResize);
      api.on(root, 'pointermove', onMove);
      api.on(root, 'pointerleave', function () { refs.armed.removeAttribute('show'); });
      api.on(refs.cv, 'pointerdown', function (e) {
        const fr = active();
        if (!fr.fields.some(function (f) { return f.type === 'sig'; })) return;
        S.curStroke = [sigPt(e)];
        try { if (refs.cv.setPointerCapture && e.pointerId !== undefined) refs.cv.setPointerCapture(e.pointerId); } catch (x) { /* synthetic pointer */ }
        drawSig(); e.preventDefault();
      });
      api.on(refs.cv, 'pointermove', function (e) {
        const c = S.curStroke;
        if (!c) return;
        const p = sigPt(e), l = c[c.length - 1];
        if (Math.hypot(p[0] - l[0], p[1] - l[1]) >= 2 && c.length < 600) { c.push(p); drawSig(); }
      });
      api.on(refs.cv, 'pointerup', sigEnd);
      api.on(refs.cv, 'pointercancel', sigEnd);
      api.on(refs.cv, 'lostpointercapture', sigEnd);
      api.setInterval(tick, 250);
      /* ---------------------------------------------------------- start (resume at the saved beat) */
      const startAt = V.beat;
      S.hi = Math.max(V.hi, V.beat);
      if (V.career > 1 && startAt === 0) S.afterReset = false;
      S.stack = [];
      if (startAt === 0 && V.career === 1) say(L.intro[0], { priority: 1, mood: 'proud' });
      startBeat(startAt, startAt > 0 ? 'resume' : 'first');
      api.setTimeout(function () { if (!S.dead && V.career === 1 && startAt === 0) say(L.intro[1], { mood: 'smug' }); }, 7000);
      api.setTimeout(function () { if (!S.dead && V.career === 1 && startAt === 0) say(L.intro[2], { mood: 'neutral' }); }, 22000);
      return {
        destroy() {
          S.dead = true; S.token++;
          try { persist(); } catch (e) { /* save failed: nothing to do */ }
        }
      };
    }
  });})();
