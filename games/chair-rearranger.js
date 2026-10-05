/* POINTLESS module: chair-rearranger */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const C = function (n) { return 'm-chair-rearranger-' + n; };

  P.injectCSS(`
.m-chair-rearranger-card{--ink:#2B2A33;--cream:#FFF6E0;--mint:#8FD9B6;--coral:#FF8A7A;--mustard:#F2C14E;--lilac:#B8A1E3;--u:6px;position:relative;padding:10px 10px 12px;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);color:var(--ink);overflow:hidden;font-family:ui-rounded,"Nunito","Trebuchet MS","Segoe UI",system-ui,sans-serif;background:radial-gradient(rgba(43,42,51,.13) 1px,transparent 1.6px) 0 0/14px 14px,var(--cream)}.m-chair-rearranger-card [hidden]{display:none!important}.m-chair-rearranger-card button{font-family:inherit;color:inherit}.m-chair-rearranger-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.m-chair-rearranger-hd{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:0 0 8px}.m-chair-rearranger-ttl{margin:0;font-size:1.2rem;font-weight:900}
.m-chair-rearranger-pill{background:#fff;border:2.5px solid var(--ink);border-radius:999px;padding:1px 10px;font-weight:800;font-size:.82rem;box-shadow:2px 2px 0 var(--ink)}.m-chair-rearranger-leg{margin-left:auto;font-size:1.05rem;letter-spacing:.08em}.m-chair-rearranger-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}@media (min-width:860px){.m-chair-rearranger-grid{grid-template-columns:minmax(0,1fr) 290px}}.m-chair-rearranger-stage{position:relative;width:100%;max-width:720px;margin:0 auto;transform-origin:50% 50%;transition:transform 3s ease}.m-chair-rearranger-stage.m-chair-rearranger-zoom{transform:scale(.62)}
.m-chair-rearranger-dec{position:absolute;inset:-25% -20%;pointer-events:none;opacity:0;transition:opacity 1.4s ease .5s;border-radius:14px;background:linear-gradient(#EADDC4 0 80%,#8A5A2B 80%);box-shadow:inset 0 0 0 4px var(--ink)}.m-chair-rearranger-zoom .m-chair-rearranger-dec{opacity:1}.m-chair-rearranger-lampst{position:absolute;left:11%;top:22%;width:1.2%;height:46%;background:#555;border-radius:2px}.m-chair-rearranger-lampsh{position:absolute;left:6%;top:11%;width:11%;height:11%;background:var(--mustard);border:3px solid var(--ink);border-radius:50% 50% 8px 8px/70% 70% 8px 8px}.m-chair-rearranger-cone{position:absolute;left:2%;top:22%;width:20%;height:48%;background:linear-gradient(rgba(255,230,140,.5),transparent);clip-path:polygon(32% 0,68% 0,100% 100%,0 100%)}.m-chair-rearranger-mug{position:absolute;left:5%;top:72%;width:5%;height:8%;background:var(--coral);border:3px solid var(--ink);border-radius:3px 3px 10px 10px}
.m-chair-rearranger-mug i{position:absolute;right:-60%;top:20%;width:50%;height:45%;border:3px solid var(--ink);border-radius:50%}.m-chair-rearranger-far{position:absolute;right:4%;top:6%;width:17%;height:34%;border:3px solid var(--ink);background:linear-gradient(#a9dcff,#e6f6ff);border-radius:4px;overflow:hidden}.m-chair-rearranger-cloud{position:absolute;left:20%;top:40%;width:60%;height:16%;border-radius:20px;background:#fff;font-size:calc(var(--u)*1.3);font-weight:800;text-align:center;line-height:1.5}.m-chair-rearranger-big{position:absolute;line-height:1;font-size:calc(var(--u)*13)}.m-chair-rearranger-gi{right:5%;top:46%}.m-chair-rearranger-gp{left:4%;top:40%}
.m-chair-rearranger-gb{position:absolute;right:3%;top:38%;background:#fff;border:3px solid var(--ink);border-radius:12px;padding:2px 10px;font-weight:900;font-size:calc(var(--u)*2.6)}.m-chair-rearranger-room{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border:3px solid var(--ink);border-radius:10px;user-select:none;-webkit-user-select:none;background:repeating-linear-gradient(90deg,rgba(90,60,20,.1) 0 2px,transparent 2px calc(var(--u)*9)),#DDBB82;box-shadow:inset 0 0 0 calc(var(--u)*1.1) #A9814E,4px 4px 0 var(--ink)}.m-chair-rearranger-rug{position:absolute;left:24%;top:26%;width:52%;height:50%;border-radius:14px;background:rgba(143,217,182,.38);border:2px dashed rgba(43,42,51,.25)}.m-chair-rearranger-cv{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.m-chair-rearranger-shade{position:absolute;pointer-events:none;background:rgba(184,161,227,.18)}.m-chair-rearranger-beam{position:absolute;inset:0;pointer-events:none;background:rgba(255,244,200,.45);transition:background .8s}
.m-chair-rearranger-beam.m-chair-rearranger-gold{background:rgba(255,214,102,.55)}.m-chair-rearranger-band{position:absolute;inset:3%;border:2px dashed rgba(200,40,40,.55);border-radius:4px;pointer-events:none}.m-chair-rearranger-band2{inset:0;border-color:rgba(43,42,51,.6)}.m-chair-rearranger-bagua{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity 3s}.m-chair-rearranger-bagua.m-chair-rearranger-on{opacity:.26}.m-chair-rearranger-bagua text{font-weight:800}.m-chair-rearranger-k-flash{animation:m-chair-rearranger-flash 2.2s ease-out}@keyframes m-chair-rearranger-flash{0%,55%{opacity:.9}100%{opacity:.26}}.m-chair-rearranger-win{position:absolute;z-index:6;width:calc(var(--u)*22);height:calc(var(--u)*5.2);min-height:24px;margin-left:calc(var(--u)*-11);padding:0;transform-origin:50% 0;cursor:pointer;border:3px solid var(--ink);border-radius:4px;background:linear-gradient(#bfe6ff,#e8f6ff)}
.m-chair-rearranger-win:focus-visible{outline:3px solid #5b2fe0;outline-offset:3px}.m-chair-rearranger-win.m-chair-rearranger-glow{box-shadow:0 0 0 3px #FFE9A0,0 0 18px 8px rgba(255,214,102,.8)}.m-chair-rearranger-win.m-chair-rearranger-dim{filter:brightness(.7)}.m-chair-rearranger-wb{position:absolute;left:50%;top:0;bottom:0;width:3px;margin-left:-1.5px;background:var(--ink)}.m-chair-rearranger-wb2{position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1.5px;background:var(--ink)}.m-chair-rearranger-wc{position:absolute;top:-3px;bottom:-3px;width:16%;background:var(--lilac);border:3px solid var(--ink)}
.m-chair-rearranger-wcar{position:absolute;bottom:8%;width:12%;height:22%;border-radius:2px;background:#e86b5a}.m-chair-rearranger-wtree{position:absolute;left:44%;top:-8%;font-size:calc(var(--u)*3)}.m-chair-rearranger-door{position:absolute;left:10%;bottom:0;width:max(36px,calc(var(--u)*8));height:max(30px,calc(var(--u)*4.2));transform:translateX(-50%);background:#8A5A2B;border:3px solid var(--ink);border-bottom:0;border-radius:6px 6px 0 0;z-index:3;cursor:pointer}button.m-chair-rearranger-door{padding:0;margin:0;cursor:pointer}.m-chair-rearranger-door:focus-visible{outline:3px solid #5b2fe0;outline-offset:3px}.m-chair-rearranger-door::after{content:"";position:absolute;right:12%;top:50%;width:7px;height:7px;border-radius:50%;background:var(--mustard);border:2px solid var(--ink)}.m-chair-rearranger-sandra{position:absolute;left:1.5%;top:34%;width:max(calc(var(--u)*12),84px);min-height:calc(var(--u)*8);padding:4px 4px 2px;background:#FFE97A;border:2px solid var(--ink);font-size:max(9px,calc(var(--u)*1.9));overflow:hidden;line-height:1.15;font-weight:700;transform:rotate(-3deg);z-index:7;pointer-events:none;clip-path:polygon(0 0,100% 0,100% 82%,86% 100%,0 100%)}.m-chair-rearranger-dennis{position:absolute;left:93%;top:88%;transform:translate(-50%,-62%);z-index:5;pointer-events:none;text-align:center;line-height:1}
.m-chair-rearranger-leaf{display:block;font-size:calc(var(--u)*6.5);margin-bottom:calc(var(--u)*-1.2)}.m-chair-rearranger-pot{display:block;width:calc(var(--u)*5);height:calc(var(--u)*3.4);margin:0 auto;background:#C2603F;border:3px solid var(--ink);border-radius:2px 2px 9px 9px}.m-chair-rearranger-coaster{position:absolute;z-index:130;width:calc(var(--u)*3.2);height:calc(var(--u)*3.2);margin:calc(var(--u)*-1.6) 0 0 calc(var(--u)*-1.6);background:#D9A066;border:2px solid var(--ink);border-radius:4px;transform:rotate(8deg);cursor:grab;touch-action:none}.m-chair-rearranger-ch{position:absolute;width:max(44px,calc(var(--u)*11));height:max(44px,calc(var(--u)*11));padding:0;margin:0;border:0;background:none;cursor:grab;touch-action:none;transform:translate(-50%,-50%) scale(var(--sc,1));transition:transform .12s,opacity .5s;-webkit-tap-highlight-color:transparent}.m-chair-rearranger-ch.m-chair-rearranger-held{cursor:grabbing}.m-chair-rearranger-ch:focus-visible{outline:3px solid #5b2fe0;outline-offset:3px;border-radius:12px}
.m-chair-rearranger-ch.m-chair-rearranger-sel .m-chair-rearranger-seat{outline:3px dashed #5b2fe0;outline-offset:2px}.m-chair-rearranger-bd{position:absolute;inset:0;transition:transform .18s}.m-chair-rearranger-seat{position:absolute;inset:8% 8% 14% 8%;border:3px solid var(--ink);border-radius:22%;background:var(--t)}.m-chair-rearranger-bd::before{content:"";position:absolute;left:50%;top:-5%;margin-left:-6px;border:6px solid transparent;border-bottom-color:var(--ink);border-top:0;z-index:2}.m-chair-rearranger-bk{position:absolute;left:6%;right:6%;bottom:2%;height:26%;border:3px solid var(--ink);border-radius:8px;background:var(--d)}.m-chair-rearranger-lg{position:absolute;width:12%;height:12%;border-radius:50%;background:var(--ink)}.m-chair-rearranger-round .m-chair-rearranger-seat{border-radius:50%;inset:6%}
.m-chair-rearranger-round .m-chair-rearranger-bk,.m-chair-rearranger-round .m-chair-rearranger-lg{display:none}.m-chair-rearranger-fc{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);font-size:calc(var(--u)*5);line-height:1;pointer-events:none}.m-chair-rearranger-sh{position:absolute;left:10%;right:10%;bottom:-6%;height:16%;border-radius:50%;background:rgba(0,0,0,.25);transition:transform .15s;pointer-events:none}.m-chair-rearranger-held .m-chair-rearranger-sh{transform:translate(6px,8px) scale(1.12)}.m-chair-rearranger-nm{position:absolute;left:50%;top:92%;transform:translateX(-50%);font-size:max(9px,calc(var(--u)*1.7));font-weight:800;background:rgba(255,246,224,.9);border:1.5px solid var(--ink);border-radius:6px;padding:0 4px;white-space:nowrap;pointer-events:none}.m-chair-rearranger-wr{position:absolute;right:-6%;top:-6%;font-size:max(10px,calc(var(--u)*2.2));display:none;pointer-events:none}
.m-chair-rearranger-wn .m-chair-rearranger-wr{display:block}.m-chair-rearranger-hm{position:absolute;right:2%;top:-14%;font-size:calc(var(--u)*3);opacity:0;pointer-events:none}.m-chair-rearranger-k-hum .m-chair-rearranger-hm{animation:m-chair-rearranger-hum 1.4s ease-out}.m-chair-rearranger-out{transform:translate(-50%,-190%) scale(.15)!important;opacity:0;transition:transform .9s ease-in,opacity .9s;pointer-events:none}.m-chair-rearranger-tw .m-chair-rearranger-bd{animation:m-chair-rearranger-wob .5s infinite alternate}.m-chair-rearranger-tanb{position:absolute;left:20%;top:-2%;font-size:calc(var(--u)*2.6);display:none;pointer-events:none}
.m-chair-rearranger-tan .m-chair-rearranger-tanb{display:block}.m-chair-rearranger-dz .m-chair-rearranger-fc{animation:m-chair-rearranger-wob .25s infinite alternate}.m-chair-rearranger-drop{animation:m-chair-rearranger-fall .9s cubic-bezier(.3,1.4,.6,1)}.m-chair-rearranger-k-squash{animation:m-chair-rearranger-squash .18s ease-out}.m-chair-rearranger-k-fold{animation:m-chair-rearranger-fold .3s ease-out}.m-chair-rearranger-k-vib{animation:m-chair-rearranger-vib .1s linear 12}
.m-chair-rearranger-k-pat{animation:m-chair-rearranger-pat .35s ease-out}.m-chair-rearranger-k-shake{animation:m-chair-rearranger-shake .18s linear}.m-chair-rearranger-k-wig{animation:m-chair-rearranger-wig .6s ease-in-out}.m-chair-rearranger-k-tilt{animation:m-chair-rearranger-tilt .9s ease-in-out}.m-chair-rearranger-k-twitch{animation:m-chair-rearranger-twitch .6s ease-in-out}.m-chair-rearranger-k-peel{animation:m-chair-rearranger-peel 1.2s ease-in-out}
.m-chair-rearranger-k-slam{animation:m-chair-rearranger-slam var(--sd,.38s) cubic-bezier(.2,.9,.3,1.2)}@keyframes m-chair-rearranger-hum{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(-14px)}}@keyframes m-chair-rearranger-wob{from{rotate:-1.5deg}to{rotate:1.5deg}}@keyframes m-chair-rearranger-fall{from{translate:0 -300%}to{translate:0 0}}@keyframes m-chair-rearranger-squash{0%{scale:1.14 .82}55%{scale:.94 1.07}100%{scale:1}}@keyframes m-chair-rearranger-fold{0%{scale:1 .85;rotate:-4deg}100%{scale:1;rotate:0deg}}
@keyframes m-chair-rearranger-vib{0%{translate:-2px 1px}50%{translate:2px -1px}100%{translate:-2px 1px}}@keyframes m-chair-rearranger-pat{0%{scale:1}40%{scale:1.1 .92}100%{scale:1}}@keyframes m-chair-rearranger-shake{0%{translate:0 0}25%{translate:2px 1px}50%{translate:-2px -1px}75%{translate:1px 2px}100%{translate:0 0}}@keyframes m-chair-rearranger-wig{0%,100%{rotate:-3deg}25%{rotate:7deg}50%{rotate:-9deg}75%{rotate:5deg}}@keyframes m-chair-rearranger-tilt{0%,100%{rotate:0deg}30%{rotate:-22deg}60%{rotate:14deg}}@keyframes m-chair-rearranger-twitch{0%,100%{translate:0 0}40%{translate:1px -1px}}
@keyframes m-chair-rearranger-peel{0%,100%{rotate:0deg}40%,70%{rotate:-26deg}}@keyframes m-chair-rearranger-slam{0%{scale:3;opacity:0}60%{scale:.92;opacity:1}100%{scale:1;opacity:1}}@keyframes m-chair-rearranger-bub{from{opacity:0;translate:0 6px}to{opacity:1;translate:0 0}}@keyframes m-chair-rearranger-puff{from{opacity:1;scale:.6}to{opacity:0;scale:2.2}}.m-chair-rearranger-half{position:absolute;z-index:18;width:max(24px,calc(var(--u)*5.5));height:max(24px,calc(var(--u)*5.5));padding:0;border:0;background:none;cursor:pointer;transform:translate(-50%,-50%) scale(var(--sc,.5))}.m-chair-rearranger-half::after{content:"";position:absolute;inset:-70%}.m-chair-rearranger-half:focus-visible{outline:3px solid #5b2fe0;outline-offset:3px}
.m-chair-rearranger-half i{position:absolute;inset:10% 10% 22% 10%;background:#E2B27A;border:3px solid var(--ink);border-radius:30%}.m-chair-rearranger-half b{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-size:calc(var(--u)*5);line-height:1}.m-chair-rearranger-flag{position:absolute;z-index:150;font-size:calc(var(--u)*4);transform:translate(-50%,-100%);pointer-events:none}.m-chair-rearranger-picket{position:absolute;z-index:150;max-width:calc(var(--u)*17);padding:2px 4px;background:#fff;border:2px solid var(--ink);font-size:max(8px,calc(var(--u)*1.5));font-weight:900;line-height:1.1;transform:translate(-20%,-120%) rotate(-5deg);pointer-events:none}.m-chair-rearranger-pawn{position:absolute;z-index:160;font-size:calc(var(--u)*4.6);line-height:1;transform:translate(-50%,-50%);pointer-events:none}.m-chair-rearranger-insp{position:absolute;z-index:165;transform:translate(-50%,-60%);pointer-events:none;font-size:calc(var(--u)*6);line-height:1;white-space:nowrap}
.m-chair-rearranger-clipb{position:absolute;left:62%;top:44%;width:calc(var(--u)*3.6);height:calc(var(--u)*4.6);background:#fff repeating-linear-gradient(transparent 0 3px,#9bb 3px 4px);border:2px solid var(--ink);transform:rotate(14deg)}.m-chair-rearranger-ring{position:absolute;z-index:170;width:calc(var(--u)*15);height:calc(var(--u)*15);transform:translate(-50%,-50%) rotate(-90deg);pointer-events:none}.m-chair-rearranger-knob{position:absolute;z-index:190;width:max(40px,calc(var(--u)*5.5));height:max(40px,calc(var(--u)*5.5));margin:0;padding:0;transform:translate(-50%,-50%);border:3px solid var(--ink);border-radius:50%;background:var(--mustard);box-shadow:2px 2px 0 var(--ink);cursor:pointer;font-size:calc(var(--u)*3);line-height:1}.m-chair-rearranger-knob:focus-visible{outline:3px solid #5b2fe0;outline-offset:2px}.m-chair-rearranger-pknob{background:var(--mint)}.m-chair-rearranger-bub{position:absolute;z-index:200;max-width:46%;transform:translate(-50%,-100%);padding:4px 9px;background:#fff;border:2.5px solid var(--ink);border-radius:12px;font-size:max(10px,calc(var(--u)*2));font-weight:700;line-height:1.2;pointer-events:none;animation:m-chair-rearranger-bub .2s ease-out;transition:opacity .4s}.m-chair-rearranger-bub::after{content:"";position:absolute;left:50%;bottom:-9px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}
.m-chair-rearranger-bub.m-chair-rearranger-fade{opacity:0}.m-chair-rearranger-stamp{position:absolute;z-index:210;left:50%;top:42%;margin:0;padding:4px 16px;text-align:center;pointer-events:none;border:calc(var(--u)*.9) solid #C62F2F;border-radius:10px;color:#C62F2F;font-weight:900;font-size:calc(var(--u)*4.2);letter-spacing:.06em;line-height:1.1;white-space:normal;box-sizing:border-box;max-width:88%;width:max-content;text-shadow:1px 1px 0 rgba(255,255,255,.6);rotate:-8deg;translate:-50% -50%;background:rgba(255,246,224,.55);-webkit-mask-image:repeating-radial-gradient(circle at 30% 40%,#000 0 3px,rgba(0,0,0,.82) 3px 4px);mask-image:repeating-radial-gradient(circle at 30% 40%,#000 0 3px,rgba(0,0,0,.82) 3px 4px)}.m-chair-rearranger-stamp small{display:block;font-size:.3em;letter-spacing:.2em;font-weight:700}.m-chair-rearranger-sfont{font-family:Georgia,serif;font-style:italic;letter-spacing:.15em}.m-chair-rearranger-sign{position:absolute;z-index:215;left:50%;top:66%;transform:translateX(-50%);max-width:78%;padding:3px 10px;background:#FFE97A;border:3px solid var(--ink);font-weight:900;font-size:max(10px,calc(var(--u)*2.1));text-align:center;pointer-events:none}.m-chair-rearranger-cert{position:absolute;z-index:180;left:50%;top:50%;width:34%;transform:translate(-50%,-50%);pointer-events:none;transition:left 1.6s,top 1.6s,width 1.6s,transform 1.6s;filter:drop-shadow(3px 3px 0 var(--ink))}
.m-chair-rearranger-cert svg{display:block;width:100%;height:auto}.m-chair-rearranger-cert.m-chair-rearranger-hung{width:15%;z-index:7}.m-chair-rearranger-frame2{position:absolute;z-index:8;left:21%;top:7%;padding:2px 4px;background:#D9A066;border:3px solid var(--ink);font-size:max(7px,calc(var(--u)*1.2));font-weight:800;text-align:center;line-height:1.1;pointer-events:none}.m-chair-rearranger-card2{position:absolute;z-index:205;padding:3px 8px;background:#fff;border:2px solid var(--ink);font-size:max(9px,calc(var(--u)*1.7));font-weight:700;max-width:34%;transform:translate(-50%,-130%) rotate(3deg);pointer-events:none}.m-chair-rearranger-cap{position:absolute;z-index:210;left:50%;bottom:4%;transform:translateX(-50%);padding:2px 12px;background:rgba(255,246,224,.9);border-radius:999px;border:2px solid var(--ink);font-weight:800;font-size:max(10px,calc(var(--u)*2));pointer-events:none}.m-chair-rearranger-fade2{position:absolute;inset:0;z-index:300;background:var(--cream);opacity:0;pointer-events:none;transition:opacity 1s}
.m-chair-rearranger-fade2.m-chair-rearranger-on{opacity:1}.m-chair-rearranger-side{display:flex;flex-direction:column;gap:10px;min-width:0}.m-chair-rearranger-box{background:#fff;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);padding:8px}.m-chair-rearranger-box h3{margin:0 0 4px;font-size:.85rem;text-transform:uppercase;letter-spacing:.05em}.m-chair-rearranger-dial svg{display:block;width:100%;max-width:250px;margin:0 auto;height:auto}.m-chair-rearranger-needle{transition:transform .25s ease-out;transform-origin:100px 100px}
.m-chair-rearranger-sub{text-align:center;font-weight:800;font-size:.8rem;min-height:1.2em}.m-chair-rearranger-rds{display:grid;grid-template-columns:1fr 1fr;gap:6px}.m-chair-rearranger-rd{background:var(--cream);border:2px solid var(--ink);border-radius:8px;padding:2px 6px;font-size:.7rem;font-weight:700}.m-chair-rearranger-rd b{display:block;font-size:.95rem}.m-chair-rearranger-clip{background:#fffdf0 repeating-linear-gradient(transparent 0 19px,rgba(91,47,224,.18) 19px 20px)}.m-chair-rearranger-clip ul{list-style:none;margin:4px 0 0;padding:0;font-size:.76rem;line-height:20px;max-height:250px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end}
.m-chair-rearranger-hint{margin:0 0 8px;font-size:.78rem;font-weight:700;line-height:1.3;opacity:.88}.m-chair-rearranger-bar{display:flex;gap:10px;align-items:center;margin:0 0 10px;flex-wrap:wrap}.m-chair-rearranger-ibtn{min-height:48px;padding:6px 22px;font-size:1.15rem;font-weight:900;letter-spacing:.08em;background:var(--coral);border:4px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink);cursor:pointer}.m-chair-rearranger-ibtn:active{transform:translate(4px,4px);box-shadow:1px 1px 0 var(--ink)}.m-chair-rearranger-ibtn:focus-visible,.m-chair-rearranger-chip:focus-visible{outline:3px solid #5b2fe0;outline-offset:3px}.m-chair-rearranger-ibtn.m-chair-rearranger-off{opacity:.5;cursor:not-allowed;box-shadow:2px 2px 0 var(--ink)}.m-chair-rearranger-rost{display:flex;gap:6px;overflow-x:auto;padding:4px 4px 8px;flex:1;min-width:0}
.m-chair-rearranger-chip{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:1px;min-width:78px;min-height:44px;background:#fff;border:2.5px solid var(--ink);border-radius:10px;padding:3px 6px;font-weight:800;font-size:.72rem;cursor:pointer;box-shadow:2px 2px 0 var(--ink)}.m-chair-rearranger-fcx{font-size:1.4rem;line-height:1.1}.m-chair-rearranger-roll .m-chair-rearranger-fcx{animation:m-chair-rearranger-pat .5s}.m-chair-rearranger-mb{width:100%;height:5px;border-radius:3px;background:rgba(0,0,0,.14);overflow:hidden}.m-chair-rearranger-mb i{display:block;height:100%;width:0;background:var(--mint);transition:width .3s}@media (max-width:700px){.m-chair-rearranger-rost{flex:1 1 100%}.m-chair-rearranger-card{padding:8px 8px 10px}.m-chair-rearranger-leg{margin-left:0}.m-chair-rearranger-clip ul{max-height:none}}
@media (max-width:700px){.m-chair-rearranger-card{display:flex;flex-direction:column;gap:10px}.m-chair-rearranger-grid{display:contents}.m-chair-rearranger-stage{order:1;width:100%}.m-chair-rearranger-bar{order:2;margin:0}.m-chair-rearranger-side{order:3}.m-chair-rearranger-ttl{display:none}.m-chair-rearranger-dial svg{max-width:150px}.m-chair-rearranger-bub{max-width:58%}}
@media (prefers-reduced-motion:reduce){.m-chair-rearranger-card *{animation:none!important;transition:none!important}}
.pm-reduce-motion .m-chair-rearranger-card *{animation:none!important;transition:none!important}
`, 'css-chair-rearranger');

  P.addAchievements([
    { id: 'chair-rearranger.first-move', name: 'Grand Marshal of the Slight Repositioning', desc: 'Move a chair for the first time. It was already almost fine.', icon: '🪑', reward: 1 },
    { id: 'chair-rearranger.unvarying', name: 'Laureate of the Unvarying Verdict', desc: 'Receive the verdict Fine 10 times. Every person who has ever played has also done this.', icon: '🧐', reward: 3 },
    { id: 'chair-rearranger.facing', name: 'Archduke of Facing the Window', desc: 'Get every chair to face the window at once, for exactly as long as it takes them to change their minds.', icon: '🌞', reward: 5 },
    { id: 'chair-rearranger.pats', name: 'Sovereign Listener of Furniture', desc: 'Pat chairs 20 times. They noticed. They are not saying.', icon: '🖐️', reward: 3 },
    { id: 'chair-rearranger.meeting', name: 'Keeper of the Quiet Chair Meeting', desc: 'Idle for 90 seconds and overhear the chairs holding a meeting without you. Minutes: none.', icon: '🪑', secret: true, reward: 4 },
    { id: 'chair-rearranger.defenestrated', name: 'Defenestrator Emeritus of Seating, No Harm Done', desc: 'Send a chair through the window. It came back with a tan and has not been the same since, in a good way.', icon: '🕶️', secret: true, reward: 6 },
    { id: 'chair-rearranger.tower', name: 'Master Builder of the Sculpture That Is Not an Arrangement', desc: 'Stack five chairs in one place. The Inspector looked up.', icon: '🚩', secret: true, reward: 4 },
    { id: 'chair-rearranger.half', name: 'Fellow of the Royal Institute of Almost Counting Chairs', desc: 'Attempt to drag the half chair 8 times. It was unmoved, in the manner of a chair.', icon: '½', secret: true, reward: 4 },
    { id: 'chair-rearranger.stable', name: 'Warden of Stable Discontent', desc: 'Place Clive exactly halfway between window and door and leave him there.', icon: '😐', secret: true, reward: 3 },
    { id: 'chair-rearranger.rush', name: 'Tolerated Customer of the Rush Inspection', desc: 'Press INSPECT until the stamp sticks. A man was sent. The man is a sign.', icon: '🛠️', secret: true, reward: 2 },
    { id: 'chair-rearranger.thanks', name: 'Honorary Friend of Windows', desc: 'Face a chair at the window. It said something. It will not say it twice.', icon: '🌤️', secret: true, reward: 3 },
    { id: 'chair-rearranger.sock', name: 'Honorary Liaison to the Missing Sock', desc: 'Find the sock beneath a chair. It is on a journey. You are not invited.', icon: '🧦', secret: true, reward: 3 },
    { id: 'chair-rearranger.exit', name: 'Grand Admiral of the Departure Lounge', desc: 'Try the decorative door 8 times. It opened. It was never open.', icon: '🚪', secret: true, reward: 8 }
  ]);

  P.addLines('moduleEnter', ['Entering {module}. It is arranged. It would like you to know that it is arranged.', 'You have entered {module}. Whatever is in it has already begun to disagree with whatever else is in it.']);
  P.addLines('moduleExit', ['You have left {module}. It says it was arranged. It always says that.', 'You have left {module}. Everything in it has pulled into a circle and is not discussing it.']);
  /* module tips are spoken in order by the timeline (not through the global tip pool) */
  const TIPS = [
    'Tip: right-click, or press P, to pat a chair. It will not say it liked it.',
    'Tip: press I to summon the Inspector. He is already on his way. He has always been on his way.',
    'Tip: there is no correct arrangement, only the one you are in. Sandra says the one you are in is incorrect.',
    'Tip: when in doubt, face the window. When not in doubt, face the window. Sandra says no.'
  ];
  P.addLines('ticker', [
    "BREAKING: Chair near window 'would prefer to be near door', sources confirm.",
    'Inspector issues score of Fine. Sources: Fine.',
    "Chair rearranged 40 times 'for reasons it did not share'. Facilities declines to comment.",
    "Chairs hold meeting, adjourn 'mostly sideways'. Minutes: none, per sources.",
    "Pigeon on window sill 'not scored', say sources close to pigeon.",
    'Inspector: Fine. Window: closed. Dennis: thriving. Update at six, which will be Fine.'
  ]);

  /* All module lines. Bags are arrays; single lines are strings. [chair] [n] [want] [mk] are filled locally. */
  const L = {
    /* premise and the early beats */
    intro1: 'Welcome. Please drag the chairs until each one is content. Click a chair to ask what it wants. It will tell you. It will mean it.',
    marguerite: 'Marguerite has requested the middle of the room, with an audience. We are honoring her process. The audience is Dennis.',
    intro2: 'Optimal is defined by the Inspector, afterwards, in one word. He has not arrived. He has, however, finished.',
    please: 'A laminated copy of this request has been placed in a drawer that does not open.',
    afterglance: 'You have not touched anything and have already been scored. We call this efficiency.',
    firstmove: 'A chair has been moved. It was already almost fine. It is now almost fine somewhere else.',
    nothingstays: 'Please note that no arrangement stays solved. Management considers this job security, and has asked the chairs to as well.',
    nudgeflip: 'Management notes that no chair has changed its mind yet. This is considered a staffing risk.',
    back: 'You have returned. The Inspector remembers [n] inspections, all of them Fine. He has not been told he is allowed to forget.',
    'fac.walls': 'Facilities reminds you that a chair can be asked what it wants by clicking it. Facilities has never asked. Facilities is afraid of the answer.',
    'fac.ceiling': 'A note from Facilities: the room has four walls, one floor and what the last audit called "some ceiling". Please do not ask for more.',
    'pay.memo': 'Payroll confirms you are not being paid for this. You are being paid for something else, which is also this.',
    'fac.label': 'Facilities has labelled the floor. The label says FLOOR. Facilities has not yet labelled the label.',
    'bday.mgmt': 'It has been 3 minutes. By long tradition the Inspector is now 7 1/2 years old. A cake has arrived. Nobody brought it. It was simply present, in the manner of cakes.',
    'bday.chairs': ['I will not sing. I have no mouth. I am congratulating him with posture.', 'Many happy returns. Of what, we have not specified.', 'I have attended both of his birthdays. This is the second. The first was very similar.', 'I would like a slice, cut at an angle I approve of.', 'I would like to be near the cake. I cannot hold cake. I would like to be near someone who can.'],
    'bday.insp': 'A cake. For me. It is Fine. (It is a 6. I did not know I owned a 6.)',
    'bday.after': 'The cake has been removed. Nobody recorded who removed it. One crumb remains, and it is Fine.',
    'tue.forecast': 'The forecast for Tuesday has been issued. It says "Tuesday". Management has stopped reading forecasts and started reading the backs of them.',
    /* the Inspector */
    'inspector.first': 'I have assessed the room in 0.4 seconds. Fine. I will now look up, briefly, to confirm that I did not need to.',
    'inspector.verdict': [
      "The energy in this room flows in a manner I would describe as 'present'. Fine.",
      'I score on a scale of one to ten. I have never needed the other nine.',
      'Fine is not a compliment. Fine is not an insult. Fine is a load-bearing word.',
      'I have consulted my instruments. My instruments have consulted each other. Fine.',
      'Chi was detected. Chi was asked to leave. Chi has left. Fine.',
      'I note a chair facing a wall. I note it with respect. Fine.',
      "The room has a certain something. I have written 'something'. Fine.",
      "Sunlight, 7. Door, 4. Window, 'yes'. Overall: Fine.",
      'I would like it on record that I tried to find fault. The fault is in my instruments. Fine.',
      'I walked the room twice. The second time was to confirm that the first had happened. Fine.',
      'I keep the other nine in a drawer. I have never opened the drawer. Fine.',
      'I stood in the doorway. A doorway is a transitional space. I did not transition. Fine.',
      "I asked a chair how it felt. It said 'nearer'. I wrote 'nearer'. Then I wrote 'Fine'.",
      'There is a draught from the window. I have marked it with a small flag. Fine.',
      'The rug is Fine. The floor under the rug is Fine. The thing under that is a rumour. Fine.',
      'I have assessed the chairs individually. They have assessed me back. I am under review. Fine.',
      'Everything is exactly as I found it. This is the highest compliment I have. It is also my only one. Fine.'
    ],
    'inspector.late': ['Inspection [n]. I have now said Fine more often than my own name, and my name is long. Fine.', 'At this point the word is no longer a word. It is a posture. I hold it. Fine.', 'I am asked whether I ever tire of it. I have tired of it since inspection 3. It remains Fine.', "Inspection [n]. A plaque is being made. It says 'Fine'. It was cheaper than the other word."],
    'inspector.n20': 'Twenty inspections. A plaque has been ordered. It says "Fine", and was cheaper than the alternatives. Fine.',
    'inspector.n50': 'Fifty. I have retired in my mind, to a small flat with a view of a different room. I am still here. Fine.',
    'inspector.reshuffle': 'A bold rearrangement. Chi has been redistributed from nowhere to nowhere in equal measure. Fine.',
    'inspector.nochange': 'You have changed nothing. The room appreciates the stability. Fine.',
    'inspector.chaos': 'Every chair faces a different wall and the room is somehow still Fine. I checked twice. I checked once more.',
    'inspector.tower': 'A tower. The same rating. Fine. I would like it noted that I looked up.',
    'inspector.gerald': 'Fine. (I paused. I would like it noted that nobody saw me pause.)',
    'inspector.nine': "The 'Not Fine' sticker has lifted at one corner. He presses it back down. 'I have never needed the other nine.'",
    'inspector.arrive': 'The Inspector has arrived. He was not asked. He was, however, expected.',
    subs: ['5/10', '5/10, no notes', '5.000/10, to three places, all of them five', '5/10 (rounded up from 5)'],
    'sandra.review': "Sandra says 'Fine is under review'. The review came back Fine.",
    notes: ['Note: chair.', 'Note: another chair.', 'Note: floor (scuffed, but with character).', 'Note: nobody has asked me how I am.', 'Note: lunch is at 12:07. I have never seen 12:07.', "Note: Sandra's note moved. Did not see it move.", "Note: I have written 'fine' 5 times. No further notes.", 'Note: a chair looked at me. Neither of us blinked. One of us has no eyes.', 'Note: the rug has seen better rooms.', 'Note: Facilities has labelled the room "room".', 'Note: this is a 0.4 second job. I am 40 minutes in.', 'Note: Tuesday. Not today. Not looking.', 'Note: door says EXIT (DECORATIVE). I have a pension. I am not decorative.', 'Note: Dennis looked at me. Dennis is not on the form.'],
    'note.window': 'Note: the window (present).',
    'note.clive': 'Note: Clive. See previous note about Clive.',
    'note.desmond': 'Note: Desmond. Stool? Chair? Fine.',
    'note.colin': 'Note: pigeon. Out of scope. Fine.',
    'note.sock': 'Note: a sock. Not mine.',
    'note.eyebrows': 'Note: eyebrows, deployed.',
    'note.dennis': 'Note: Dennis (Plant). Not scored. Thriving.',
    'insp.lunch': 'It is 12:07. I have waited my whole career for 12:07. The clock says 4:40. I will wait.',
    /* Sandra */
    'sandra.p1': 'Sandra from Compliance has flagged the room. Policy 1: chairs must stand 7 1/2 centimetres from the wall.',
    'sandra.p1.note': 'POLICY 1: chairs 7 1/2 cm FROM wall. -S.',
    'sandra.p2': 'Sandra reminds you that chairs must also touch the wall. Policy 1 stands. Both are enforced.',
    'sandra.p2.note': 'POLICY 2: chairs must TOUCH wall. (see Policy 1) -S.',
    'sandra.both': 'Both policies are enforced and both are ignored by the score. The score is Fine. The score is under review.',
    'sandra.p3': 'Sandra has issued Policy 3: chairs may not face the window except in emergencies, which are defined as when they do.',
    'sandra.p3.note': 'POLICY 3: do not face window (unless emergency). -S.',
    'sandra.p4': "Sandra has issued Policy 4, quoting the Terms of Service: '[clause]'. She says the chairs are bound by it. The chairs have not been shown the Terms. Nobody has.",
    'sandra.p4.note': 'POLICY 4: see Terms of Service. (Terms unavailable.) -S.',
    'sandra.p0.note': 'NO POLICIES YET. This is the policy. -S.',
    'sandra.contra': 'Per Sandra: chairs must face the window. Also per Sandra: chairs must not face the window. Both are enforced.',
    'sandra.flag': "Sandra from Compliance has flagged Chair 3 for 'sitting-adjacent behaviour'. She did not elaborate. She never elaborates.",
    'sandra.warn': 'Warning: Policy 1. Also Policy 2.',
    'sandra.union': 'Sandra from Compliance has joined the union, left the union and filed a grievance against both. She is waiting between them, per policy.',
    /* generic chair speech */
    'drop.generic': ['Thunk. That was my whole emotion.', 'I have sat in many spots. This one has a view of another spot.', 'Creak. That was the floor. I will take the credit.', 'A bold place to put me. I will not say it was wrong.', 'Excuse me. I had that square. I had it for several minutes.', 'Floor confirmed. I had assumed. It is good to hear it said.', 'I am now eleven centimetres from where I was. I would like it on the form.', 'You put me down gently. I will not mention it to the others. They would want it.', 'That square is warm. Somebody was sitting here. It was me, earlier.', "I would describe this location as 'adjacent to a decision'.", 'I am scoring my own landing. I will not share the number. The number is Fine.', 'This is almost the spot I was dreaming of on Thursday. The one next to it. You were close.'],
    'pickup.generic': ['Unannounced, but fine.', 'I was just getting comfortable with the floor.', 'Weightless. Briefly. Do not drop me.', 'Is this a promotion.', 'Lifted. My legs have never been this far from a decision.', 'I did not volunteer. I also did not decline. Please note both.', 'Oh. We are doing this. I will hold very still, which is all I know how to do.', 'Up. I can see the whole room from here. It is the same room, with worse news.'],
    'rotate.generic': ['I can see the wall. It has a nice texture.', 'Now I face the corner. This is somehow worse and exactly right.', 'A new angle. The old angle did not mind. I do.', 'Facing the window now. No pressure. Some pressure.', 'I have turned. The room has not. That is the difference between us.', 'Facing north. I am told there is nothing there. I am looking carefully.', 'A quarter turn, and I have seen things. Dust, mostly. A bold sample of dust.', 'I am facing where I used to face. It has changed. It has a different quality of nothing.'],
    'rotate.mgmt': ['Rotated 45 degrees. The chair now faces the filing cabinet, which has not faced anything since 2011.', 'Rotated 45 degrees. The chair now faces the whiteboard, which has said "Q3" in one corner for four years and has not elaborated.', 'Rotated 45 degrees. The chair now faces a patch of wall Facilities describes as "load-bearing, emotionally".'],
    /* Clive */
    'clive.pickup': ['Nearer the window. No further. Nearer than that.', 'Where I am now is fine. Nearer.', 'Yes. Go on. I will tell you when. I will not tell you when.', 'Careful. The window is that way. I can feel it the way you feel a draught, which is also the window.'],
    'clive.near': ['I can see the car park. A man is walking to it. This is everything I hoped for.', 'The window is exactly as advertised. I had not prepared for that.', 'Do not move me. Do not leave me. Do not look at me.', 'A woman is parking in three goes. I am moved. I will say no more.'],
    'clive.flip': ['Having it is not what I imagined. I would now like to be by the door.', 'I have had the window. The window has had me. I would like to be by the door.', 'I have studied the car park and it has studied me back. The door, please.'],
    'clive.third': 'This is the third time I have been here. It is always the same car park.',
    'clive.door': 'The door. Of course. It was always the door. Do you have the window?',
    'clive.drop': ["Placed. I was hoping for 'placed nearer'.", "A chair is a statement. Mine is 'nearer'.", 'Is this nearer? Do not answer. Nearer is a feeling and I am keeping it.'],
    'clive.pat': ['That was nice. Could it have been nearer the window.', 'Thank you. Could you do it again, from the window side.'],
    'clive.stable': 'This is the worst and I cannot leave it.',
    'clive.tired': ['Nearer. (I have said this before. I have said this in a previous version.)', 'I remember nothing and I am tired anyway.', 'Nearer. I mean it slightly less than last time.'],
    'clive.ask': 'I want the window. I will tell you when I have it. I will not tell you what I want after that.',
    'flip.clive': "Clive has achieved window proximity and is now experiencing 'having it'. This is going poorly.",
    /* Brenda */
    'brenda.pickup': ['The sun has been on my left arm since March. I have not complained. I am complaining now.', 'Lift me gently. I have a warm side and a warmer side and I will not say which is which.'],
    'brenda.beam': 'Is that a beam. That is a beam. It is on me. I am saying nothing at volume.',
    'brenda.near': ['Shade. Lovely. I could weep. I will not. I am upholstery, we do not.', 'Shade. I have no further requests. I will invent one.'],
    'brenda.flip': 'I have acclimatised to shade and I find I miss the sun. Please do not tell the sun.',
    'brenda.drop': ['Placed. Away from the glare, I hope. Ahead of schedule, I fear.', 'I am down. There is a draught. It is the nicest thing anyone has done for me today.'],
    'brenda.pat': ['Careful. Left arm.', 'Right arm, if you must. The left has had enough.'],
    'brenda.ask': 'I would like to be out of the sun. The sun has been informed. The sun does not read.',
    'flip.brenda': 'Brenda has acclimatised to shade and now wants sun. Please remember her as she was, which was last Tuesday.',
    /* Pip */
    'pip.pickup': ['I was not built for glare. I was built for a dim, supportive corner and a person with a long meeting.', 'Up. Everything is so bright up here. I can see the whole room and it can see me.'],
    'pip.near': ['A corner. Thank you. I will be so quiet about how happy I am.', 'A corner. The two walls understand me. They do not say so. That is why.'],
    'pip.drop': ['Down. In a dim place, I hope. Slightly damp would also be acceptable.', 'Thank you. I will be over to the side, being a small shape.'],
    'pip.flip': 'I have been in this corner for a while and I have started to want to be near Clive. It is not a decision. It is geography.',
    'pip.crush': 'I am only near Clive because it is on the way to somewhere. Where is not specified.',
    'pip.bird': 'Is that a bird. It is a bird. I was not built for birds either.',
    'pip.pat': ['I have not been patted since the warranty period. Please do not stop. Please do not mention it.', 'That was a pat. I will think about it later, in the dark, fondly.'],
    'pip.ask': 'A dim corner, please. Dim. Supportive. Only slightly damp.',
    'pat.pip': "You patted Pip. Pip has not been patted since the warranty period. Pip's confidence is up 3 percent.",
    'flip.pip': 'Pip has moved from wanting a corner to wanting Clive. Management considers this progress. Pip considers it weather.',
    /* Marguerite */
    'marg.pickup': ['I fold under pressure. This is not pressure. I am folding on principle.', 'Careful. I fold for drama and I fold for real, and the line between them is thin.'],
    'marg.ask': 'The centre of the room, please. I will be fine at the edge. I will be dramatically fine.',
    'marg.near': 'Yes. This. Look at me. No, not like that. Yes, like that.',
    'marg.flip': 'I have had the centre and I find it very exposed. I would like a wall to lean on. Dramatically.',
    'marg.drop': ['I am down. I am on the floor, spiritually. Physically I am here.', 'And scene. I will take my applause as a draught.'],
    'marg.pat': ['I accept this. I accept it for the record.', 'A pat. In public. I am scandalised and I would like another.'],
    /* Chair 3 */
    'c3.pickup': ['I am level in spirit.', 'Careful with the leg. The short one. We do not discuss the short one.'],
    'c3.ask': 'A wall. Something to lean on. I have been leaning on a coaster since 2019 and it is not a wall.',
    'c3.coaster': 'Do not look at the coaster. The coaster has been through a lot.',
    'c3.near': 'A wall. It does not judge. It is exactly as flat as me.',
    'c3.flip': 'I have leaned on the wall and the wall has started leaning on me. I would like to be near Brenda.',
    'c3.drop': ['Level for a second. I would like it noted. Twice.', 'Down. The floor has a slope I find personally encouraging.'],
    'c3.pat': ['I rocked. It was a good rock. I was level for a second.', 'Thank you. Do not pat the coaster. The coaster has not asked.'],
    'c3.wobble': 'Chair 3 has a wobble. A folded coaster has been under it since 2019. The coaster is exhausted.',
    'coaster.drag': 'The coaster has been moved. Chair 3 is teetering. Please put it back. Everyone is relying on it.',
    'coaster.back': 'The coaster has been returned. Chair 3 exhales. It is still crooked.',
    /* Desmond */
    'desmond.arrive': 'A stool has dropped in from the ceiling and is claiming to be a chair. He has paperwork.',
    'desmond.probation': 'Desmond has been admitted as a chair on a probationary basis. The probation is a stool-shaped formality.',
    'desmond.papers': "Desmond's paperwork lists 'height: adjustable, spiritually'. Sandra has initialled it from a distance.",
    'desmond.pickup': 'I am a chair. The paperwork says stool. The paperwork has been wrong before.',
    'desmond.ask': 'I have no back. I have a great deal of posture. I would like the window.',
    'desmond.flip': 'I have been admitted and I find I want to leave. This is how probation feels.',
    'desmond.near': 'A stool at a window. I have waited for this. I have no back and I do not need one.',
    'desmond.drop': 'I am down. I am a stool, this way up. I am a chair, any other way up.',
    'desmond.pat': 'Thank you. Nobody has patted a stool before. I will assume it is a rite of admission.',
    /* flips, contentment, milestones, pats */
    flip: ["[chair] has achieved the thing it wanted and is now experiencing 'having it'. This is going poorly.", '[chair] has acclimatised to being right. It is looking for a wrong to move into.', "Staffing update: [chair] has changed its mind. HR has been told. HR said 'noted' and then 'oh'.", '[chair] now wants the opposite. The opposite was available the whole time.', '[chair] has submitted a change of preference in the form of a sigh. The sigh has been filed.', 'Management notes that [chair] was happy for exactly 4 seconds. It was a good 4 seconds.', '[chair] enjoyed a full cycle of satisfaction, from first feeling to "actually". Its next want has already been shipped.', "The change of heart for [chair] has been entered on Form 27B/6. The form asks for a reason. The reason is 'four seconds'.", '[chair] has reached satisfaction and returned it. No questions were asked. Several were implied.', "HR has been told that [chair] has changed its mind. HR is writing 'yes' on something and will not say what."],
    'content.say': ['No. I am fine. I have checked. I am as surprised as you.', 'I looked for something else to want. There is nothing. It is very loud.', 'I will stay. Please do not make it a thing. It is a thing.'],
    content: ['[chair] has declined to change its mind. HR has no form for this and has begun drawing one.', '[chair] is content. This was not in the plan. The plan has been amended so that it is.', 'A chair has stayed. Management would like to say a few words and has none.'],
    moves25: 'You have moved a chair 25 times. Each move was recorded by someone, somewhere, in pencil.',
    moves100: '100 moves. The pencil has been replaced. The new pencil has been briefed.',
    eleven: ['You have been awarded 0.3 Meh for moving a chair eleven pixels. The Meh was not consulted.', 'Meh awarded for a chair placed 11 centimetres from where it wanted to be. The chair has called it a draw.'],
    scuff40: "The floor now bears 40 scuff marks. Facilities has called them 'a signature' and asked that it stop.",
    scuff120: 'The floor now bears 120 scuff marks. Facilities has stopped asking and started framing.',
    pat: ['You have patted [chair]. [chair] pretends not to notice. [chair] noticed.', "Patted. [chair]'s confidence is up 3 percent. It is not a measured number. It is a felt one.", '[chair] accepts the pat. It is the first pat of its career and it will remember.', 'Pat recorded. [chair] has asked that it be recorded twice.', '[chair] has been patted. One leg did a small thing. We will not be asking about the small thing.', '[chair] says thank you. [chair] has no mouth. The thank-you was in the legs.'],
    'pat.spam': 'That is 8 pats in 4 seconds. [chair] has not been handled this quickly since it was manufactured, which was, to be fair, quick.',
    facing: 'Every chair is facing the window. Please hold this arrangement. It will last as long as it lasts.',
    stand: ['Optimal arrangement achieved for 0.3 seconds. Please stand by, as a figure of speech.', 'Optimal arrangement lost. Management took a screenshot. The screenshot is also lost.', 'Optimal arrangement achieved again, in a different shape. Management is considering framing the previous one.'],
    esc: 'Cancelled. The chair is relieved to be where it was, and also disappointed in you.',
    /* Colin, half chair, Gerald */
    'colin.land': 'A pigeon named Colin has landed on the sill. Colin has an opinion. Colin keeps it.',
    colin: ['Colin has tilted his head by 4 degrees. Management does not know what that means. Management has written it down.', "Pigeon Colin's opinion is not scored. It is, however, logged. Per Colin.", 'Colin has looked at the chairs. Colin has looked at the window. Colin has looked at you. The order was deliberate.', 'Colin has looked at the Inspector. The Inspector has looked at Colin. Neither has scored the other, on principle.'],
    colin20: 'Colin watches you move the chairs the way one watches weather arrange itself.',
    'colin.move': 'Colin has moved with the window. Colin has always been where the window is. This is not loyalty. It is rent.',
    'colin.lanyard': 'Colin has been issued a lanyard. He is now Window Compliance. He has not been briefed. He has been pigeon.',
    'half.up': 'A small chair has appeared at the bottom edge. It is half a chair tall and cannot be moved. We will not be discussing it.',
    'half.count': 'Please do not count the chairs. We have counted. It has always been a number and a half.',
    half: ['I was here before the room. I will be here after the window.', 'I am not for moving. I am for noticing.', 'Seven. Eight. You are almost at seven and a half.', 'I have been pulled by experts. I am still here. I am also still half.'],
    half7: 'That is 7 attempts. The chair would like you to know it felt all 7. And a half.',
    'half.slide': 'The half chair has moved 7 1/2 pixels. Nobody saw it. That is how it is done.',
    'half.secret': 'You have attempted a chair 7 and a half times. The chair has not been moved. The attempts have been noted.',
    'gerald.arrive': 'Gerald, Vice President of Spuds, has requested a seat. Gerald is a potato. The seat has gone very quiet out of respect.',
    'gerald.intro': 'I am Gerald. I am a potato. I am here about the seating.',
    'gerald.again': 'We meet again, in a chair this time.',
    'gerald.ask': 'May I have the chair that is not a chair?',
    'gerald.seated': 'This is the correct size for governance.',
    'gerald.profound': 'A chair is only a floor that has decided to rise. Sit with that. I cannot. I am a potato.',
    'gerald.leave': 'Gerald has left in a puff of respect.',
    /* the window moves, zoom */
    winmove1: 'The window has relocated to the east wall. It did not announce this. It simply preferred it there.',
    winmove2: 'Management would like to clarify that windows do not usually move. This one is going through something.',
    winmove3: 'The window has continued to the south wall. The chairs have been asked to adjust. The chairs have asked the window to stop.',
    'winmove.sorry': "Management apologises on the window's behalf. The window did not authorise this apology.",
    'winmove.settle': 'The window has settled on the south wall. It says this is where it was always going. It was not.',
    'window.never': 'The window has never been faced directly. It says it does not mind. It minds a little.',
    'window.thanks': 'Thank you for looking.',
    'window.thanks2': 'Thank you for looking. I know it is only a chair. It is the best chair I have ever been looked at by.',
    'window.early': 'Not yet. Ask me again when the day is further along.',
    'window.say': ['I am not a button. I am, technically, a button. Please stop reminding me.', 'I have been looked through for years and nobody has once poked me. Please continue not to.'],
    'zoom.diorama': 'The room has been zoomed out. It is a diorama. It sits inside a larger room. That room is also Fine.',
    'zoom.award': 'A first zoom-out has been recorded. 5 Meh has been awarded for perspective, which is not available in stores.',
    'zoom.giant': "The larger room has a larger Inspector. He has said 'Fine' in a bigger voice.",
    'zoom.giantsay': 'FINE.',
    'zoom.lonely': 'The giant window beyond the diorama window is lonely. It has asked nobody anything.',
    'zoom.gold': 'Every chair is facing the window. The sunbeam has gone gold. Management is not scoring this. Management would like a moment.',
    'zoom.goldend': 'Management has had the moment. We are scoring again. It is Fine.',
    'zoom.tuesday': 'Through the far window, a cloud shaped like a Tuesday has been noted. Please do not make eye contact.',
    'zoom.wed': 'The Tuesday cloud has gone. In its place is a smaller cloud labelled "Wed". Management is relieved and does not trust it.',
    'zoom.caption': '(the room hums, but softer)',
    'dennis.report': 'Management has asked Dennis for a status report. Dennis has attached it. It is a plant.',
    'touch.noticed': 'You have been here nearly 9 minutes. The chairs have noticed. They have not said so. A chair noticing is like a floor noticing: mostly it holds you up.',
    /* the union, tug of war, Dennis, Stapler */
    union1: "The chairs have formed a union. Demands: lumbar respect, a view, and to be called 'seating professionals'.",
    union2: 'Chairs now require consultation before relocation. Please hold the chair for 1.5 seconds and say nothing, which is how consultation works.',
    'union.hint': 'Hold. Then move. That is the whole union.',
    'union.break': 'The union has asked for a break. The break has been granted. It lasted 0.4 seconds and was taken before it was requested.',
    'consult.refuse': ['You did not wait. Consultation is the waiting.', 'That was a squeeze. I need a hold.', 'I felt that. It does not count.', 'You moved. Consultation is also stillness. Please be so still I forget you are a person.'],
    'consult.consent': ['Fine. Note that I said it.', 'Consulted. Proceed. Gently.', 'Consulted. Nobody has done that since the coaster.', 'Granted. I would like the minutes to say I was thoughtful.'],
    'consult.rotate': 'Rotation requires a second consent. Please hold again. The chair has been told you will be gentle.',
    'consult.fatigue': 'Management notes grip fatigue. The chair notes it too, with a sigh that has seniority.',
    'consult.silent': 'Consultation conducted silently, as is traditional.',
    picket: "A tiny picket sign has appeared beside Chair 3. It reads 'FIX CHAIR 3 (NOT THE COASTER)'. The coaster has asked to be left out of this.",
    'picket.text': 'FIX CHAIR 3 (NOT THE COASTER)',
    'union.stapler': "The Stapler has been asked to mediate. The Stapler said 'not my union' and then 'but I see them'.",
    'union.stapler2': "The Stapler has been asked to mediate. You and the Stapler have met. He says 'not my union', then 'but I see you', and looks at you the whole time.",
    tug1: 'The Inspector has begun moving chairs himself. His arrangement is also Fine. He is quiet about it, mostly with his eyebrows.',
    'tug.say': 'Kindly release [chair]. We are conducting a fine arrangement here.',
    'tug.mgmt': 'Both parties are holding [chair]. [chair] is being held by two parties and is, as a result, vibrating.',
    'tug.end': 'Nobody won [chair]. [chair] has noted this.',
    'tug.smug': "The Inspector's eyebrows say 'Fine'. They said it first.",
    'dennis.glance': 'Dennis (Plant) has watched the arrangement from the corner. One leaf has moved by a centimetre. This is critique.',
    'dennis.known': 'Dennis (Plant) has watched the arrangement from the corner. He knows you from another department. He has said nothing, which is how he says it.',
    'dennis.space': 'Dennis has asked for space. Dennis is a plant. Dennis has not moved. Dennis asks again by not moving.',
    'stapler.arrive': 'The Stapler has arrived to represent the staples. There are no staples, so he has sent a paperclip, on a technicality. The paperclip is very serious.',
    'stapler.known': 'The Stapler has returned, again by paperclip. You have met. He is treating you as a known quantity, which is slightly under quota.',
    'stapler.demand': ['We represent the staples. We have demands. The first is a floor of our own.', 'Item one: no chair may sit within 7 1/2 centimetres of a staple. Item two: there are no staples. Item two stands.', 'We would like a lunch break. We have not eaten. We are a stapler. It is a matter of principle.', 'I am here on behalf of the paperwork that holds the paperwork. We would like, for once, to be held.'],
    'stapler.after': 'The Stapler has made his demands. They have been stapled to a previous set of demands. The previous set was the same. Nobody has read either.',
    /* the bagua */
    bagua: ['Wealth. The chair has entered Wealth. It has not been enriched. The zone is noting this.', 'Fame. Nobody has noticed. That is also a kind of Fame.', 'Marriage. I will not comment. I will only say the chairs are very close and have not discussed it.', 'Family. The chair is now family. The family has not been told.', 'Health. The chair is well. I checked. It is wood.', 'Helpful People. None present. The zone considers this honest.', 'Wealth (Again). Same zone, second attempt. It has not improved.', 'Knowledge. The chair now knows nothing in a more informed way.', 'Career. The chair has been placed in Career. It has no questions. It has many opinions about the window.'],
    'bagua.misc': 'Misc. A zone for things that did not fit. I felt this one was for me.',
    'bagua.up': "A bagua has been laid on the floor. It has nine zones and a tenth labelled 'Misc'. Please do not ask which is which.",
    /* idle */
    meeting: [['c1', 'Item one: the window.'], ['c2', 'Item two: also the window.'], ['c3', 'Item three: Clive.'], ['c4', 'I move that we be dramatic.'], ['c5', 'Seconded. I wobble in favour.'], ['c1', 'All in favour of the window?'], ['c2', 'Opposed. And in favour. Both.'], ['c3', 'Point of order: has anyone seen the human?'], ['c4', 'The human has gone. I will be dramatic on their behalf.'], ['c5', 'Minutes will be taken by whoever has a floor.'], ['c1', 'I would like to table a motion to be nearer.'], ['c2', 'Tabled. It is a table now. It faces the window.'], ['c3', 'Any other business? I have a small business. It is near Clive.'], ['c4', 'All in favour of being fine? Unanimous. It was always unanimous.'], ['c5', 'Meeting adjourned. Mostly sideways.'], ['c6', 'I would like it minuted that I attended.']],
    'idle.20': 'Management has noticed a pause. Pauses are normally scheduled. This one was not on the calendar and has been invited anyway.',
    'idle.45': 'Hello? The chairs are wondering whether you have left. They have never been left before. They have been sat on, which is different.',
    'idle.65': ['Is the human gone? Is it just us? Everyone act natural. Natural is facing the wrong way.', 'Quiet. They are thinking. Or they have left. Both look the same from down here.'],
    'idle.65b': ['I have a quiet announcement. It is that I am here.', 'Do not look at the door. It is decorative. It will know.'],
    'idle.minutes': "The chairs held a meeting while you were away. Minutes: none. Attendance: all. Outcome: 'We are fine.'",
    'idle.135': 'The meeting has run over. The chairs have booked the room for a follow-up meeting about the meeting. You are not invited. You are the room.',
    'idle.180': 'A motion to elect a chair of the chairs has been tabled. It was seconded by itself. All chairs abstained, which they do well.',
    'idle.5min': 'You have been absent for 5 minutes. The Inspector has sat down in Pip and is quietly enjoying the angle. Please do not tell Pip.',
    'idle.420': 'It has been 7 minutes. The Inspector has begun trying the other chairs in turn. He is scoring the seats. They are all Fine. He has not told them.',
    'idle.600': 'It has been 10 minutes. The room has arranged itself around your absence and found it Fine. Come back whenever. We are chairs. Not going anywhere is the whole job.',
    'idle.back': 'The chairs have returned to their positions with no sound. There was no meeting. It went very well.',
    'idle.back.300': 'Welcome back. The Inspector has left Pip. Pip is fine. Pip would like it noted that Pip is not fine, but is fine, in the way of a chair.',
    'idle.back.600': 'You are back after more than 10 minutes. The chairs held three meetings and a small ceremony. You missed it. It was attended, and also Fine.',
    /* spam */
    'spam.inspect': 'That is [n] inspections in 6 seconds. A re-inspection fee of 0.5 Meh has been applied and the Inspector has been informed he is popular.',
    'spam.i4': 'I am already here. I am looking at it. Please stop summoning me to where I am.',
    'spam.i7': 'I can hear the button from inside the paperwork. Fine. Fine. Fine. I am saying it to myself now.',
    'spam.rush': 'Fine (Rush).',
    'spam.stuck': 'The stamp has stuck. A man has been sent. The man is a sign.',
    'spam.sign': 'STAMP UNDER MAINTENANCE. BACK IN 5 (APPROX.)',
    'spam.stampfree': 'The stamp has been freed. It says Fine. It has always said Fine. It was just stuck saying it.',
    'spam.stuckpress': ['The button is disabled. The button has strong feelings about it.', 'The man who is a sign has asked you to stop pressing the button he is standing on.', 'Pressing a disabled button is a form of hope. Management has logged it as hope.'],
    'spam.lift': 'Eight pick-ups in 3 seconds. The chair has asked to be put down for a minute and then picked up for a second, and cannot say which it wants.',
    'spam.rotate': '[chair] has been turned 8 times in 3 seconds. It now faces every direction a chair can face, and one it invented.',
    'spam.chip': 'You have selected the roster 8 times in 4 seconds. The roster has never been read this closely. It would like a moment alone with the attention.',
    'spam.window': 'The window has been pressed 6 times in 4 seconds. It would like to be looked through, as is traditional. It has not been looked through since the car park happened.',
    dizzy: ['[chair] was shaken at speed and now requires a moment, a glass of water, and a very flat floor.', 'Shaking is not a form of arrangement. It is a form of weather.'],
    'dizzy.say': 'Water. Please. Flat floor. Water.',
    'dizzy.refuse': 'No. Water first.',
    'door.spam': 'Please do not rattle the decorative door. The decoration is under review. The review is also decorative.',
    doors: ['That is the door. It is decorative. It says so in a tooltip, which is where all the important truths live.', 'The door has been tried. It was not locked. It was not unlocked. It was not, in the end, a lock matter.', 'Three attempts. The chairs have stopped to watch. They have never watched anyone try to leave. They are taking notes in their legs.', 'The handle has been turned. The handle is painted on. The paint is very convincing and has been asked to calm down.', 'Five. Sandra says exits are a state of mind. She also says this door is a state of mind. Both are on the form.', 'Six attempts. Clive has asked what is out there. He has been told: the car park. He has asked for it nearer.', 'Seven. The door says it has never been tried this much. It would like a day off, and is already off.'],
    'door.open': 'The door has opened. Behind it is the same room, one size down, with its own door, which is also decorative. A tiny Inspector looks up and stamps FINE. The door has closed. It was never open.',
    'door.after': ['The door is decorative again. It has asked everyone to forget the thing.', 'The door has been opened before. It remembers nothing. It is a door.'],
    /* defenestration, sock, tower */
    'def.out': '[chair] has gone out of the window. The window was closed. Management cannot explain this and has stopped trying.',
    'def.full': 'The window is at capacity. It has never been at capacity before. It is thrilled.',
    'def.back': "[chair] has returned from outside with a tan and a postcard. It will not say where it has been. It says 'around'.",
    'def.count': "Defenestrations: [n]. The window has been asked how it feels. It has said 'closed'.",
    postcards: ['Wish you were nearer.', 'Wish you were here. I am here. It was fine.', 'Weather: car park. Food: none. Chairs: few.', 'Having a lovely time. The car park is smaller than it looks.', 'Do not worry. I have met a bench. He has views.', 'Day 20. Still outside. Still fine. Please send a cushion.'],
    'sock.found': 'A single sock was found beneath [chair]. It is looking for something. It will not say what.',
    'sock.again': 'A single sock was found beneath [chair]. You have seen this sock elsewhere. It is further along now. It does not wave.',
    'sock.go': 'The sock has set off toward the window. It has a long way to go and no shoes.',
    'tower.up': 'Five chairs have been stacked in one place. This is not an arrangement. It is a sculpture. It is Fine.',
    'tower.toaster': 'The Toaster has been told about the tower. The Toaster said "toast" in a tone. The tone was one of support.',
    'tower.down': 'The tower has come down. Please observe a moment of silence. It will last 3 seconds. It has begun.',
    select: 'Selected: [chair]. [chair] wants [want]. [chair] will not say why.',
    /* the not-ending */
    'end.ceremony': 'Closing Ceremony. Please stand. The chairs cannot. We will count it.',
    'end.thanks': 'Thank you to Clive, Brenda, Pip, Marguerite, Chair 3 and Desmond for their service. Colin has been thanked separately.',
    'end.score': 'Final score: Fine.',
    'end.read1': 'I, the undersigned, certify that this room has been arranged. In what manner is not specified. The arrangement is FINE.',
    'end.read2': 'Signed, Inspector Pemberton-Oyelaran, Bureau of Auspicious Arrangement. Witnessed by a plant.',
    'end.hung': 'Certificate of Fine Arrangement issued. It has been framed and hung where the window was. The window is not upset. It is behind the frame, being fine.',
    'end.coaster': 'The coaster has been framed separately. It is Employee of the Month. It does not know.',
    'end.slip1': 'Between us. This one was not Fine. I do not have the word. I have only ever had the one word.',
    'end.slip2': 'I have not said that. Please confirm that I have not said that.',
    'end.slip3': 'Management confirms that nothing was said. Management has the minutes. The minutes are blank and warm.',
    'end.noach': 'There is no achievement for finishing. There was a form to apply for one. It was Form 27B/6, and you may recall how that went.',
    'end.reset': 'The room has been returned to its original arrangement. We have no record of anything that occurred. Welcome. Please begin.',
    'end.mk': 'All numbers have been updated to [mk]. This is a coincidence.',
    'end.clive': 'Nearer.'
  };

  const DEFS = [
    { id: 'c1', name: 'Clive', pre: 'clive', want: { k: 'window' }, x: 0.30, y: 0.50, a: 0, tint: '#8FD9B6', dark: '#4FA27B' },
    { id: 'c2', name: 'Brenda', pre: 'brenda', want: { k: 'shade' }, x: 0.62, y: 0.30, a: 45, tint: '#B8A1E3', dark: '#8468C4' },
    { id: 'c3', name: 'Pip', pre: 'pip', want: { k: 'corner' }, x: 0.78, y: 0.74, a: 90, tint: '#9FB4D9', dark: '#6C86B8' },
    { id: 'c4', name: 'Marguerite', pre: 'marg', want: { k: 'center' }, x: 0.20, y: 0.82, a: 225, tint: '#FF8A7A', dark: '#D4604F' },
    { id: 'c5', name: 'Chair 3', pre: 'c3', want: { k: 'wall' }, x: 0.55, y: 0.70, a: 0, tint: '#F2C14E', dark: '#C9962B' },
    { id: 'c6', name: 'Desmond', pre: 'desmond', want: { k: 'window' }, x: 0.50, y: 0.45, a: 0, tint: '#E8D5A3', dark: '#B9A26B', stool: true }
  ];
  const DOOR = { x: 0.10, y: 1.0 }, CENTER = { x: 0.5, y: 0.5 }, WINW = { k: 'window' };
  const CORNERS = [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
  const WN = [[0, 1], [-1, 0], [0, -1]];
  const ROT = ['window', 'door', 'center', 'wall', 'shade', 'corner'];
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const STAMPS = ['FINE', 'FINE (certified)', 'Fine, with feeling', 'Fine (a gentle Fine, as requested)', 'FINE (laminated)', 'Fine', 'FINE (notarized by a duck)', 'FINE (triple-checked, confidence 4%)', 'FINE (in cursive)', 'FINE (fine)', 'FINE (laminated, again)', 'FINE (fine, per policy)'];
  const NUMS = ['8.9', '3.1', '11.0', '7.5', '0.0', '14'];
  const BEAT_T = [0, 10, 40, 90, 150, 210, 300, 390, 480, 570];
  const clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  const clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  const dd = function (a, b) { return Math.hypot(a.x - b.x, (a.y - b.y) * 0.75); };
  const mkOf = function (cy) { return cy <= 1 ? '' : ' Mk ' + (cy <= 10 ? ROMAN[cy - 1] : String(cy)); };
  const fill = function (s, v) { return String(s).replace(/\[(\w+)\]/g, function (m, k) { return v && v[k] !== undefined && v[k] !== null ? String(v[k]) : ''; }); };
  const wallDist = function (p) { return Math.min(p.x, 1 - p.x, p.y * 0.75, (1 - p.y) * 0.75); };
  const faceDiff = function (a, b) { let d = ((a - b) % 360 + 540) % 360 - 180; return Math.abs(d); };

  P.registerModule({
    id: 'chair-rearranger',
    title: 'Chair Rearranger Pro',
    tagline: 'Arrange the chairs. They will want something else in four seconds.',
    icon: '🪑',
    category: 'game',
    unlockCost: 0,
    tags: ['rearranging', 'furniture', 'bureaucracy'],
    mount(root, api) {
      const el = api.el, SC = api.selftest ? 10 : 1, IK = api.selftest ? 0.05 : 1, NS = 'chair-rearranger.';
      const ST = function (n, v) { api.stat.inc(NS + n, v === undefined ? 1 : v); };
      function cyNew() {
        return { fired: {}, policy: 0, colin: false, desmond: false, bagua: false, half: false, halfN: 0, halfT: 0, halfX: 0.5, halfY: 0.97, halfSaid: false, gerald: null, union: false, picket: false, zoom: false, nextVisit: 35, nextTug: 396, flips: 0, moves: 0, scuffs: 0, cliveWV: 0, cliveFast: false, outChair: null, defBusy: 0, tower: null, towerV: false, sock: null, coasterUsed: false, det: false, detT: 0, stand: 0, thanked: 0, goldUntil: 0, goldAt: -99, winGo: false, winStart: 0, winDone: false, hold: 0, closing: false, stableDone: false, said: {}, close: null, hung: false, stap: null, stapDone: false };
      }
      const S = { T: 0, tR: 0, cycle: 1, phase: 'play', cy: cyNew(), gates: {}, bags: {}, sp: {}, cakeUntil: 0, quiet: 0, annAt: -1e9, chairs: [], byId: {}, win: { x: 0.5, y: 0, wall: 0 }, wp: 0, corner: { x: 1, y: 1 }, quad: null, drag: null, kb: null, sel: null, hov: null, hovOff: 0, visit: null, tug: null, cer: null, I: { x: 0.1, y: 0.97, bob: 0, on: false, sit: false }, n: 0, moved: 0, presses: [], stuck: 0, idle: 0, idleF: {}, meeting: null, bubs: [], sched: [], scuffs: [], scuffN: 0, pendScuff: 0, leak: 0, reduced: false, rw: 600, beamPh: 0, beamAcc: 0, last: api.now(), totalMoves: 0, tinyN: 0, rotN: 0, patT: [], fatigue: [], zoomAwarded: false, gPause: false, stampUntil: 0, signUntil: 0, capUntil: 0, cardUntil: 0, secAcc: 0, layAcc: 0, facingAt: -99, dennisAt: -99, fadeT: 0, hoverNote: 0, arriveSaid: false, facedEver: false, savedN: (function () { const v = Math.floor(Number(api.save.get('n', 0))); return Number.isFinite(v) && v > 0 ? Math.min(v, 1e9) : 0; })(), notes: 0, geraldWas: false, geraldSat: false, errs: 0 };

      /* ---------- small helpers ---------- */
      const sf = function (fn) { return function () { try { return fn.apply(this, arguments); } catch (err) { S.errs++; if (api.selftest) throw err; } }; };
      const hid = function (e) { e.hidden = true; e._on = false; return e; };
      const show = function (e, on) { on = !!on; if (e._on !== on) { e._on = on; e.hidden = !on; } };
      const setTxt = function (e, t) { if (e._t !== t) { e._t = t; e.textContent = t; } };
      const kick = function (e, n) { const c = C(n); e.classList.remove(c); void (e.offsetWidth !== undefined ? e.offsetWidth : e.getBoundingClientRect()); e.classList.add(c); };
      const gate = function (k, ms) { const n = api.now(); if (S.gates[k] !== undefined && n - S.gates[k] < ms) return false; S.gates[k] = n; return true; };
      const inRoom = function (c) { return c.present && !c.out; };
      const live = function () { return S.chairs.filter(inRoom); };
      const ln = function (name) { const v = L[name]; return Array.isArray(v) ? bag(name) : (v || ''); };
      function bag(name) {
        const src = L[name]; if (!src || !src.length) return '';
        const b = S.bags[name] || (S.bags[name] = { q: [], last: '' });
        if (!b.q.length) { b.q = api.shuffle(src); const n = b.q.length; if (n > 1 && b.q[n - 1] === b.last) { const t = b.q[0]; b.q[0] = b.q[n - 1]; b.q[n - 1] = t; } }
        const s = b.q.pop(); b.last = s; return s;
      }
      const mg = function (key, v, mood, pri) { const t = fill(ln(key), v); return t ? api.say(t, { mood: mood || 'neutral', priority: pri === undefined ? 1 : pri }) : false; };
      const ins = function (key, v) { const t = fill(typeof key === 'string' && L[key] !== undefined ? ln(key) : key, v); return t ? api.say(t, { who: 'Inspector Pemberton-Oyelaran', mood: 'smug', priority: 1 }) : false; };
      const sfx = function (n) { if (S.quiet <= 0) api.sfx(n); };
      function spam(k, secs, n) { const a = (S.sp[k] || []).filter(function (t) { return S.tR - t < secs; }); a.push(S.tR); if (a.length >= n) { S.sp[k] = []; return true; } S.sp[k] = a; return false; }
      function announce(t, force) { const n = api.now(); if (!force && n - S.annAt < 1500) return; S.annAt = n; lv.textContent = t; }
      function later(sec, fn) { S.sched.push({ at: S.tR + sec, fn: fn, ep: S.cycle }); }
      const mkTxt = function () { return mkOf(S.cycle); };
      const roomRect = function () { const r = room.getBoundingClientRect(); if (r.width > 0) S.rw = r.width; return r; };
      const chairOf = function (t) { const n = t && t.closest ? t.closest('[data-cid]') : null; return n ? S.byId[n.getAttribute('data-cid')] : null; };

      /* ---------- DOM ---------- */
      const lv = el('div', { class: C('sr'), 'aria-live': 'polite' });
      const cv = el('canvas', { class: C('cv'), 'aria-hidden': 'true' });
      const shadeEl = el('div', { class: C('shade'), 'aria-hidden': 'true' });
      const beamEl = el('div', { class: C('beam'), 'aria-hidden': 'true' });
      const band1 = hid(el('div', { class: C('band'), 'aria-hidden': 'true' })), band2 = hid(el('div', { class: C('band') + ' ' + C('band2'), 'aria-hidden': 'true' }));
      const S2 = function (tag, a, ...k) { return el(tag, a, ...k); };
      const baguaEl = (function () {
        const names = ['Wealth', 'Fame', 'Marriage', 'Family', 'Health', 'Helpful People', 'Wealth (Again)', 'Knowledge', 'Career'], kids = [];
        for (let i = 0; i < 9; i++) {
          const x = (i % 3) * 100, y = Math.floor(i / 3) * 75;
          kids.push(S2('rect', { x: x + 2, y: y + 2, width: 96, height: 71, fill: 'none', stroke: '#2B2A33', 'stroke-width': 1.5 }), S2('text', { x: x + 50, y: y + 42, 'text-anchor': 'middle', 'font-size': 11, fill: '#2B2A33' }, names[i]));
        }
        kids.push(S2('rect', { x: 262, y: 190, width: 34, height: 30, fill: 'none', stroke: '#2B2A33' }), S2('text', { x: 279, y: 209, 'text-anchor': 'middle', 'font-size': 9 }, 'Misc'));
        return S2('svg', { class: C('bagua'), viewBox: '0 0 300 225', preserveAspectRatio: 'none', 'aria-hidden': 'true' }, ...kids);
      })();
      const colinEl = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true' }, '🐦'));
      const colinBrow = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true' }, '🤨'));
      const colinTag = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true' }, '🎫'));
      const winEl = el('button', { class: C('win'), type: 'button', 'aria-label': 'Window', onclick: sf(onWindow) }, el('span', { class: C('wcar'), style: 'left:14%' }), el('span', { class: C('wcar'), style: 'left:60%;background:#5a8fd6' }), el('span', { class: C('wtree'), 'aria-hidden': 'true' }, '🌳'), el('span', { class: C('wb') }), el('span', { class: C('wb2') }), el('span', { class: C('wc'), style: 'left:-3px' }), el('span', { class: C('wc'), style: 'right:-3px' }));
      const doorEl = el('button', { class: C('door'), type: 'button', title: 'EXIT (DECORATIVE)', 'aria-label': 'Exit (decorative)', onpointerdown: sf(doorTry), onclick: sf(function (e) { if (e.detail === 0) doorTry(e); }) });
      const sandraEl = el('div', { class: C('sandra'), 'aria-hidden': 'true' });
      const leafEl = el('span', { class: C('leaf') }, '🌿');
      const dennisEl = el('div', { class: C('dennis'), 'aria-hidden': 'true', title: 'Dennis (Plant)' }, leafEl, el('span', { class: C('pot') }));
      const coasterEl = el('div', { class: C('coaster'), title: 'A folded coaster', onpointerdown: sf(onCoasterDown) });
      const halfEl = hid(el('button', { class: C('half'), type: 'button', 'aria-label': 'Half chair (cannot be moved)', onpointerdown: sf(function () { halfTry(); }), onclick: sf(function (e) { if (e.detail === 0) halfTry(); }) }, el('i'), el('b', { 'aria-hidden': 'true' }, '')));
      const flagEl = hid(el('span', { class: C('flag'), 'aria-hidden': 'true' }, '🚩'));
      const picketEl = hid(el('div', { class: C('picket'), 'aria-hidden': 'true' }, ln('picket.text')));
      const sockEl = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true' }, '🧦'));
      const gerEl = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true' }, '🥔'));
      const cakeEl = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true', style: 'left:50%;top:50%;font-size:calc(var(--u)*8)' }, '🎂'));
      const stapEl = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true', title: 'The Stapler (represented by a paperclip, on a technicality)' }, '📎'));
      const gripEl = hid(el('span', { class: C('pawn'), 'aria-hidden': 'true' }, '✋'));
      const inspTxt = el('span', { 'aria-hidden': 'true' }, '🧐'), inspEl = hid(el('div', { class: C('insp'), 'aria-hidden': 'true' }, inspTxt, el('span', { class: C('clipb') })));
      const ringC = S2('circle', { cx: 50, cy: 50, r: 44, fill: 'none', stroke: '#5b2fe0', 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-dasharray': '276.5', 'stroke-dashoffset': '276.5' });
      const ringEl = hid(S2('svg', { class: C('ring'), viewBox: '0 0 100 100', 'aria-hidden': 'true' }, ringC));
      const knobEl = hid(el('button', { class: C('knob'), type: 'button', 'aria-label': 'Turn chair 45 degrees', title: 'Turn 45 degrees', onclick: sf(function (e) { const c = S.hov || S.sel; if (c) rotate(c, 45, e && e.detail === 0 ? 'kb' : 'knob'); }), onpointerenter: function () { S.hovOff = 0; }, onpointerleave: function () { S.hovOff = S.tR + 0.6; } }, '↻'));
      const patKnob = hid(el('button', { class: C('knob') + ' ' + C('pknob'), type: 'button', 'aria-label': 'Pat chair', title: 'Pat chair', onclick: sf(function () { const c = S.hov || S.sel; if (c) pat(c); }), onpointerenter: function () { S.hovOff = 0; }, onpointerleave: function () { S.hovOff = S.tR + 0.6; } }, '🖐️'));
      const bubLayer = el('div', { 'aria-hidden': 'true' });
      const stampMain = el('span'), stampCap = el('small');
      const stampEl = hid(el('div', { class: C('stamp'), 'aria-hidden': 'true' }, stampMain, stampCap));
      const signEl = hid(el('div', { class: C('sign') }, ln('spam.sign')));
      const certSvg = S2('svg', { viewBox: '0 0 220 150' }, S2('rect', { x: 3, y: 3, width: 214, height: 144, rx: 6, fill: '#FFF3D0', stroke: '#2B2A33', 'stroke-width': 4 }), S2('rect', { x: 12, y: 12, width: 196, height: 126, fill: 'none', stroke: '#C9962B', 'stroke-width': 2, 'stroke-dasharray': '5 3' }), S2('text', { x: 110, y: 32, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: '#2B2A33' }, 'CERTIFICATE OF FINE ARRANGEMENT'), S2('text', { x: 112, y: 86, 'text-anchor': 'middle', 'font-size': 46, 'font-weight': 900, fill: '#7a5a1a' }, 'FINE'), S2('text', { x: 110, y: 84, 'text-anchor': 'middle', 'font-size': 46, 'font-weight': 900, fill: '#FFE9A0' }, 'FINE'), S2('circle', { cx: 176, cy: 112, r: 17, fill: '#E3B23C', stroke: '#2B2A33', 'stroke-width': 2 }), S2('circle', { cx: 176, cy: 112, r: 11, fill: 'none', stroke: '#2B2A33', 'stroke-width': 2 }), S2('circle', { cx: 176, cy: 112, r: 5, fill: '#C9962B' }), S2('text', { x: 90, y: 118, 'text-anchor': 'middle', 'font-size': 8, fill: '#2B2A33' }, 'This certifies that a room was arranged.'), S2('text', { x: 90, y: 130, 'text-anchor': 'middle', 'font-size': 7, fill: '#555' }, 'Bureau of Auspicious Arrangement'));
      const certEl = hid(el('div', { class: C('cert'), 'aria-hidden': 'true' }, certSvg));
      const frame2 = hid(el('div', { class: C('frame2'), 'aria-hidden': 'true' }, 'Employee of the Month'));
      const cardEl = hid(el('div', { class: C('card2'), 'aria-hidden': 'true' }));
      const capEl = hid(el('div', { class: C('cap') }, ln('zoom.caption')));
      const fadeEl = el('div', { class: C('fade2'), 'aria-hidden': 'true' });

      function makeChair(d) {
        const c = { id: d.id, name: d.name, pre: d.pre, d: d, f: {}, present: d.id !== 'c6', out: false, outT: 0, tan: false, held: false, slide: null, tw: null, insp: false, dizzy: false, dizzyT: 0, s: 0.2, inBeam: false, content: false, contentT: 0, grace: 0, consentUntil: 0, touched: false, stableT: 0, warn: false, sqAt: 0, humAt: -99, nearAt: -99, trips: 0 };
        c.faceEl = el('span', { class: C('fc'), 'aria-hidden': 'true' }, '😐');
        c.bodyEl = el('span', { class: C('bd') }, el('span', { class: C('seat') }), el('span', { class: C('bk') }), el('span', { class: C('lg'), style: 'left:4%;top:6%' }), el('span', { class: C('lg'), style: 'right:4%;top:6%' }), el('span', { class: C('lg'), style: 'left:4%;bottom:10%' }), el('span', { class: C('lg'), style: 'right:4%;bottom:10%' }));
        c.warnEl = el('span', { class: C('wr'), title: ln('sandra.warn'), 'aria-hidden': 'true' }, '⚠️');
        c.el = el('button', {
          class: C('ch') + (d.stool ? ' ' + C('round') : ''), type: 'button', 'data-cid': d.id, style: '--t:' + d.tint + ';--d:' + d.dark, 'aria-label': d.name + ', chair',
          onpointerdown: sf(function (e) { onChairDown(c, e); }), onfocus: sf(function () { S.sel = c; }),
          onblur: sf(function () { if (S.kb && S.kb.c === c) kbPlace(); }),
          onpointerenter: function () { S.hov = c; S.hovOff = 0; }, onpointerleave: function () { if (S.hov === c) S.hovOff = S.tR + 0.6; },
          onlostpointercapture: sf(function () { if (S.drag && S.drag.c === c && S.drag.mode !== 'coaster') releaseDrag(true); })
        }, el('span', { class: C('sh') }), c.bodyEl, c.faceEl, c.warnEl, el('span', { class: C('hm'), 'aria-hidden': 'true' }, '♪'), el('span', { class: C('tanb'), 'aria-hidden': 'true' }, '🕶️'), el('span', { class: C('nm') }, d.name));
        c.humEl = c.el.querySelector('.' + C('hm'));
        c.x = d.x; c.y = d.y; c.a = d.a; c.want = d.want;
        return c;
      }
      DEFS.forEach(function (d) { const c = makeChair(d); S.chairs.push(c); S.byId[c.id] = c; });
      S.chairs[5].el.hidden = true; S.chairs[5].f.vis = false;

      const cntEl = el('span', { class: C('pill') }, 'Chairs: 5');
      const ttlEl = el('h3', { class: C('ttl'), style: 'font-size:1.2rem;text-transform:none;letter-spacing:0' }, 'Chair Rearranger Pro');
      const header = el('div', { class: C('hd') }, ttlEl, cntEl, el('span', { class: C('leg'), role: 'img', 'aria-label': 'Mood legend, from miserable to adored', title: 'Mood legend' }, 'Mood: 😣 😕 😐 🙂 😊 🥰'));
      const hint = el('p', { class: C('hint') }, 'Drag a chair (or Enter, then arrows). Click one to ask what it wants. Double-click or Q/E turns it. Right-click, P or the hand pats it. I calls the Inspector.');
      const decor = el('div', { class: C('dec'), 'aria-hidden': 'true' }, el('div', { class: C('lampst') }), el('div', { class: C('cone') }), el('div', { class: C('lampsh') }), el('div', { class: C('mug') }, el('i')),
        el('div', { class: C('far') }, el('div', { class: C('cloud') }, 'Tue')), el('div', { class: C('big') + ' ' + C('gi') }, '🧐'), el('div', { class: C('big') + ' ' + C('gp') }, '🌿'));
      const giantB = hid(el('div', { class: C('gb') }, ln('zoom.giantsay')));
      decor.appendChild(giantB);
      const room = el('div', { class: C('room') }, el('div', { class: C('rug') }), cv, shadeEl, baguaEl, band1, band2, beamEl, doorEl, sandraEl, dennisEl, coasterEl, colinEl, colinBrow, colinTag, sockEl, cakeEl, stapEl, flagEl, picketEl,
        ...S.chairs.map(function (c) { return c.el; }), winEl, halfEl, gerEl, gripEl, inspEl, ringEl, knobEl, patKnob, bubLayer, stampEl, signEl, certEl, frame2, cardEl, capEl, fadeEl);
      const stage = el('div', { class: C('stage') }, decor, room);

      /* sidebar: dial, readouts, clipboard */
      const needle = S2('g', { class: C('needle') }, S2('line', { x1: 100, y1: 100, x2: 100, y2: 30, stroke: '#2B2A33', 'stroke-width': 3, 'stroke-linecap': 'round' }), S2('circle', { cx: 100, cy: 100, r: 6, fill: '#2B2A33' }));
      const dialLabels = [-66, -33, 0, 33].map(function (a) { const r = a * Math.PI / 180; return S2('text', { x: 100 + 58 * Math.sin(r), y: 100 - 58 * Math.cos(r) + 3, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 800, fill: '#2B2A33' }, 'FINE'); });
      const sticker = S2('g', { style: 'transform-origin:182px 70px' }, S2('rect', { x: 150, y: 52, width: 40, height: 22, rx: 3, fill: '#F2C14E', stroke: '#2B2A33', 'stroke-width': 1.5, transform: 'rotate(-10 170 63)' }), S2('text', { x: 170, y: 62, 'text-anchor': 'middle', 'font-size': 5.2, 'font-weight': 800, transform: 'rotate(-10 170 63)' }, 'Not available'), S2('text', { x: 170, y: 69, 'text-anchor': 'middle', 'font-size': 5.2, 'font-weight': 800, transform: 'rotate(-10 170 63)' }, 'in your region'));
      const dialSvg = S2('svg', { viewBox: '0 0 200 112', role: 'img', 'aria-label': 'Chi dial, reading Fine' },
        S2('path', { d: 'M20 100 A80 80 0 0 1 180 100 Z', fill: '#8FD9B6', stroke: '#2B2A33', 'stroke-width': 3 }),
        S2('path', { d: 'M100 100 L172.1 65.2 A80 80 0 0 1 180 100 Z', fill: '#FF8A7A', stroke: '#2B2A33', 'stroke-width': 2 }),
        S2('text', { x: 164, y: 90, 'text-anchor': 'middle', 'font-size': 6, 'font-weight': 800 }, 'NOT FINE'), ...dialLabels, sticker, needle);
      const subEl = el('div', { class: C('sub') }, '5/10');
      const reels = ['Chi Flow', 'Conversational Geometry', 'Sunlight Fairness', 'Door Respect'].map(function (n) { const v = el('b', {}, 'Fine'); return { v: v, box: el('div', { class: C('rd') }, n, v) }; });
      const clipUl = el('ul'), clipH = el('h3', {}, "Inspector's clipboard");
      const side = el('div', { class: C('side') }, el('div', { class: C('box') + ' ' + C('dial') }, el('h3', {}, 'Chi dial'), dialSvg, subEl),
        el('div', { class: C('rds') }, ...reels.map(function (r) { return r.box; })), el('div', { class: C('box') + ' ' + C('clip') }, clipH, clipUl));
      const ibtn = el('button', { class: C('ibtn'), type: 'button', 'aria-disabled': 'false', onclick: sf(onInspect) }, 'INSPECT');
      const roster = el('div', { class: C('rost'), role: 'group', 'aria-label': 'Chairs' });
      const card = el('div', { class: C('card') }, header, hint, el('div', { class: C('bar') }, ibtn, roster), el('div', { class: C('grid') }, stage, side), lv);
      root.appendChild(card);
      api.setTitle('Chair Rearranger Pro');

      function makeChip(c) {
        const face = el('span', { class: C('fcx'), 'aria-hidden': 'true' }, '😐'), bar = el('i'), nm = el('span', {}, c.name);
        const b = el('button', { class: C('chip'), type: 'button', onclick: sf(function () { onChip(c); }) }, face, nm, el('span', { class: C('mb') }, bar));
        c.chip = { el: b, face: face, bar: bar, nm: nm, w: -1, fs: '' };
      }
      S.chairs.forEach(function (c) { makeChip(c); if (c.present) roster.appendChild(c.chip.el); });

      /* ---------- geometry and model ---------- */
      function winAt(wp) { wp = clamp(wp, 0, 1.75); if (wp <= 0.5) return { x: 0.5 + wp, y: 0, wall: 0 }; if (wp <= 1.25) return { x: 1, y: (wp - 0.5) / 0.75, wall: 1 }; return { x: 1 - (wp - 1.25), y: 1, wall: 2 }; }
      function setWin(wp) {
        S.wp = wp; S.win = winAt(wp);
        let best = -1, bc = CORNERS[0];
        for (let i = 0; i < 4; i++) { const d = dd(S.win, CORNERS[i]); if (d > best + 1e-9) { best = d; bc = CORNERS[i]; } }
        S.corner = bc;
        const w = S.win, wl = w.wall;
        const ph = wl === 0 ? 'left:0;top:50%;width:100%;height:50%' : wl === 1 ? 'left:0;top:0;width:50%;height:100%' : 'left:0;top:0;width:100%;height:50%';
        if (shadeEl._p !== ph) { shadeEl._p = ph; shadeEl.style.cssText = ph; }
        winEl.style.left = (w.x * 100).toFixed(2) + '%'; winEl.style.top = (w.y * 100).toFixed(2) + '%';
        winEl.style.transform = 'rotate(' + [0, 90, 180][wl] + 'deg)';
      }
      function eff(c) { const w = c.want; if (w.k === 'near') { const o = S.byId[w.ref]; if (!o || o === c || !inRoom(o)) return WINW; } return w; }
      function satOf(c, w) {
        const k = w.k; let s;
        if (k === 'window') s = clamp01(clamp01(1 - dd(c, S.win) / 0.55) + (c.inBeam ? 0.1 : 0));
        else if (k === 'shade') s = clamp01(clamp01(dd(c, S.win) / 0.7) - (c.inBeam ? 0.2 : 0));
        else if (k === 'door') s = 1 - dd(c, DOOR) / 0.5;
        else if (k === 'corner') s = 1 - dd(c, S.corner) / 0.45;
        else if (k === 'near') s = 1 - dd(c, S.byId[w.ref]) / 0.35;
        else if (k === 'center') s = 1 - dd(c, CENTER) / 0.4;
        else s = 1 - wallDist(c) / 0.12;
        return clamp01(s);
      }
      const sat = function (c) { return satOf(c, eff(c)); };
      function targetOf(c) {
        const w = eff(c), k = w.k;
        if (k === 'window') return S.win;
        if (k === 'shade') return { x: 1 - S.win.x, y: 1 - S.win.y };
        if (k === 'door') return DOOR;
        if (k === 'corner') return S.corner;
        if (k === 'near') { const o = S.byId[w.ref]; return { x: o.x, y: o.y, stop: 0.12 }; }
        if (k === 'center') return CENTER;
        const ds = [c.x, 1 - c.x, c.y * 0.75, (1 - c.y) * 0.75]; let m = 0;
        for (let i = 1; i < 4; i++) if (ds[i] < ds[m]) m = i;
        return m === 0 ? { x: 0, y: c.y } : m === 1 ? { x: 1, y: c.y } : m === 2 ? { x: c.x, y: 0 } : { x: c.x, y: 1 };
      }
      function wantPhrase(c) {
        const w = eff(c), k = w.k;
        if (k === 'near') return 'to be near ' + S.byId[w.ref].name;
        return { window: 'the window', shade: 'to be out of the sun', door: 'the door', corner: 'a dim corner', center: 'the middle of the room, with an audience', wall: 'a wall to lean on' }[k];
      }
      function wantAria(c) { const w = eff(c), k = w.k; return k === 'near' ? 'to be near ' + S.byId[w.ref].name : { window: 'the window', shade: 'the shade', door: 'the door', corner: 'a dim corner', center: 'centre stage', wall: 'a wall' }[k]; }
      function faceOf(c) {
        if (c.dizzy) return '🤢';
        const s = c.s; return s < 0.1 ? '😣' : s < 0.3 ? '😕' : s < 0.55 ? '😐' : s < 0.75 ? '🙂' : s < 0.9 ? '😊' : '🥰';
      }
      function facing(c, p) { const vx = p.x - c.x, vy = (p.y - c.y) * 0.75, m = Math.hypot(vx, vy); if (m < 1e-3) return true; const r = c.a * Math.PI / 180; return Math.acos(clamp((Math.sin(r) * vx - Math.cos(r) * vy) / m, -1, 1)) * 180 / Math.PI < 25; }
      function pip(px, py, q) { let inside = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { if ((q[i][1] > py) !== (q[j][1] > py) && px < (q[j][0] - q[i][0]) * (py - q[i][1]) / (q[j][1] - q[i][1]) + q[i][0]) inside = !inside; } return inside; }
      function beamStep() {
        const w = S.win, ang = 22 * Math.sin(S.beamPh) * Math.PI / 180, n = WN[w.wall];
        const dx = n[0] * Math.cos(ang) - n[1] * Math.sin(ang), dy = n[0] * Math.sin(ang) + n[1] * Math.cos(ang), tx = -dy, ty = dx, ox = w.x, oy = w.y * 0.75;
        const A = [ox - tx * 0.11, oy - ty * 0.11], B = [ox + tx * 0.11, oy + ty * 0.11];
        const Cc = [B[0] + dx * 0.9 + tx * 0.14, B[1] + dy * 0.9 + ty * 0.14], D = [A[0] + dx * 0.9 - tx * 0.14, A[1] + dy * 0.9 - ty * 0.14];
        S.quad = [A, B, Cc, D];
        const pts = S.quad.map(function (p) { return (p[0] * 100).toFixed(1) + '% ' + (p[1] / 0.75 * 100).toFixed(1) + '%'; }).join(',');
        const cp = 'polygon(' + pts + ')'; if (beamEl._p !== cp) { beamEl._p = cp; beamEl.style.clipPath = cp; beamEl.style.webkitClipPath = cp; }
        S.chairs.forEach(function (c) { c.inBeam = inRoom(c) && pip(c.x, c.y * 0.75, S.quad); });
      }

      /* ---------- speech: bubbles, say gates ---------- */
      function bubble(c, text, ms) {
        if (!text || S.quiet > 0 || !c) return;
        announce(c.name ? c.name + ' says: ' + text : text);
        const b = el('div', { class: C('bub') }, String(text));
        bubLayer.appendChild(b);
        S.bubs.push({ e: b, c: c, exp: S.tR + (ms || Math.min(8, Math.max(2.8, 1.4 + 0.055 * String(text).length))) });
        while (S.bubs.length > 4) { const o = S.bubs.shift(); if (o.e.parentNode) o.e.parentNode.removeChild(o.e); }
        placeBub(S.bubs[S.bubs.length - 1]);
      }
      function placeBub(b) { const c = b.c; b.e.style.left = clamp(c.x * 100, 29, 71).toFixed(1) + '%'; b.e.style.top = Math.max(c.y * 100 - 8, 24).toFixed(1) + '%'; }
      function cline(c, kind) {
        if (c.id === 'c1' && S.cycle >= 2 && kind !== 'ask' && api.rand() < Math.min(1, (S.cycle - 1) * 0.35)) return ln('clive.tired');
        const k = c.pre + '.' + kind; if (L[k] !== undefined) return ln(k);
        return L[kind + '.generic'] ? ln(kind + '.generic') : '';
      }
      const talk = function (c, kind, p) { if (S.T >= 3 &&(p === undefined || api.rand() < p)) bubble(c, cline(c, kind)); };

      /* ---------- actions on chairs ---------- */
      function activity() {
        const was = S.idle; S.idle = 0; S.idleF = {}; if (S.phase === 'meeting' || S.I.sit) actNow(was);
      }
      function actNow(was) {
        if (S.I.sit) { S.I.sit = false; if (!S.visit && !S.tug) showI(false); }
        if (S.phase === 'meeting') endMeeting(was);
      }
      function select(c) { S.sel = c; }
      function moveChair(c, x, y) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) return 0;
        const nx = clamp(x, 0.05, 0.95), ny = clamp(y, 0.07, 0.93), dist = Math.hypot(nx - c.x, (ny - c.y) * 0.75);
        c.x = nx; c.y = ny; return dist;
      }
      function addScuff(x, y) {
        if (S.scuffs.length < 600) S.scuffs.push([x, y]); else S.scuffs[S.scuffN % 600] = [x, y];
        S.scuffN++; S.cy.scuffs++; S.pendScuff++; drawScuff(x, y, S.scuffN);
        if (S.cy.scuffs === 40) mg('scuff40', null, 'neutral', 0); else if (S.cy.scuffs === 120) mg('scuff120', null, 'neutral', 0);
      }
      let ctx2 = null;
      function drawScuff(x, y, i) {
        try {
          if (!ctx2) ctx2 = cv.getContext('2d'); if (!ctx2 || !cv.width) return;
          const w = cv.width, h = cv.height, a = (i * 2.399) % 3.14159, l = Math.max(3, w * 0.012);
          ctx2.strokeStyle = 'rgba(80,52,24,.35)'; ctx2.lineWidth = Math.max(1, w * 0.004); ctx2.beginPath();
          ctx2.moveTo(x * w - Math.cos(a) * l, y * h - Math.sin(a) * l); ctx2.lineTo(x * w + Math.cos(a) * l, y * h + Math.sin(a) * l); ctx2.stroke();
        } catch (e) { /* canvas unavailable */ }
      }
      function redrawScuffs() { try { if (!ctx2) ctx2 = cv.getContext('2d'); if (ctx2) ctx2.clearRect(0, 0, cv.width, cv.height); } catch (e) { return; } S.scuffs.forEach(function (p, i) { drawScuff(p[0], p[1], i); }); }
      function layout() {
        const w = room.clientWidth; if (w > 0) { card.style.setProperty('--u', (w / 100).toFixed(3) + 'px'); S.rw = w; }
        const cw = cv.clientWidth, ch = cv.clientHeight;
        if (cw > 0 && ch > 0 && (cv.width !== cw || cv.height !== ch)) { cv.width = cw; cv.height = ch; redrawScuffs(); }
      }

      function onChairDown(c, e) {
        activity();
        if (e.button && e.button !== 0) return;
        if (!inRoom(c) || S.phase === 'fading' || S.phase === 'resetting') return;
        if (S.drag) releaseDrag(true);
        if (S.kb) kbPlace();
        try { c.el.focus({ preventScroll: true }); } catch (x) { /* ignore */ }
        select(c);
        if (c.dizzy) { bubble(c, ln('dizzy.refuse')); return; }
        const r = roomRect(), ex = Number.isFinite(e.clientX) ? e.clientX : r.left + c.x * r.width, ey = Number.isFinite(e.clientY) ? e.clientY : r.top + c.y * r.height;
        const px = r.width > 0 ? (ex - r.left) / r.width : c.x, py = r.height > 0 ? (ey - r.top) / r.height : c.y;
        const D = S.drag = { c: c, pid: e.pointerId, cx: ex, cy: ey, px: ex, py: ey, sx: c.x, sy: c.y, gx: c.x - px, gy: c.y - py, moved: 0, path: 0, t0: S.tR, lastEv: S.tR, mode: 'drag', dragging: false, asked: false, samples: [{ t: api.now(), x: px, y: py }], acc: 0, revs: [], sgn: 0, zone: -1, ct: 0 };
        try { c.el.setPointerCapture(e.pointerId); } catch (x) { /* synthetic pointer */ }
        if (S.tug && S.tug.c === c && S.tug.stage === 'drag') { D.mode = 'tug'; D.tx = c.x; D.ty = c.y; S.tug.stage = 'tug'; S.tug.tugT = 0; kick(c.el, 'k-vib'); ins('tug.say', { chair: c.name }); if (gate('tugm', 5000)) mg('tug.mgmt', { chair: c.name }, 'panic', 0); note(ln('note.eyebrows')); return; }
        if (S.cy.union && S.phase === 'play') { D.mode = 'consult'; showRing(c, 0); return; }
        lift(c);
      }
      function lift(c) {
        c.held = true; c.slide = null; c.tw = null; sfx('blip');
        if (c.id === 'c4') kick(c.el, 'k-fold');
        if (spam('lift', 3, 8) && gate('liftspam', 15000)) mg('spam.lift', null, 'panic', 0);
      }
      function dragStart(c) {
        talk(c, 'pickup', 0.8);
        if (c.id === 'c2' && c.inBeam && gate('beam', 15000)) bubble(c, ln('brenda.beam'));
        if (!S.cy.sock && api.chance(1 / 40)) spawnSock(c);
        if (S.T >= 60 && !S.cy.stapDone && !S.cy.closing && api.chance(api.selftest ? 1 / 8 : 1 / 45)) startStapler();
      }
      function onMove(e) {
        const D = S.drag; activity();
        if (!D || (D.pid !== undefined && e.pointerId !== undefined && e.pointerId !== D.pid)) return;
        const r = roomRect(); if (!(r.width > 0) || !Number.isFinite(e.clientX) || !Number.isFinite(e.clientY)) return;
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height, dx = e.clientX - D.px;
        D.lastEv = S.tR; D.moved = Math.hypot(e.clientX - D.cx, e.clientY - D.cy); D.path += Math.hypot(dx, e.clientY - D.py); D.px = e.clientX; D.py = e.clientY;
        const c = D.c;
        if (D.mode === 'consult') { if (D.moved > 6) consultFail(D); return; }
        if (D.mode === 'tug') { D.tx = px + D.gx; D.ty = py + D.gy; return; }
        if (D.mode === 'coaster') { S.cy.coasterPos = { x: clamp(px, 0.02, 0.98), y: clamp(py, 0.04, 0.96) }; return; }
        if (!D.dragging && D.moved < 4) return;
        if (!D.dragging) { D.dragging = true; dragStart(c); }
        if (Math.abs(dx) >= 5) { const sg = dx > 0 ? 1 : -1; if (D.sgn && sg !== D.sgn) D.revs.push(S.tR); D.sgn = sg; D.revs = D.revs.filter(function (t) { return S.tR - t < 1.2; }); }
        const dist = moveChair(c, px + D.gx, py + D.gy);
        D.acc += dist * S.rw; while (D.acc >= 6) { D.acc -= 6; addScuff(c.x, c.y); }
        S.moved += dist; c.touched = true;
        D.samples.push({ t: api.now(), x: px, y: py }); if (D.samples.length > 64) D.samples.shift(); const t0 = api.now() - 80; while (D.samples.length > 2 && D.samples[0].t < t0) D.samples.shift();
        zoneCheck(c, D);
        if (D.revs.length >= 7) { D.revs = []; makeDizzy(c); releaseDrag(false); }
      }
      function makeDizzy(c) { c.dizzy = true; c.dizzyT = 3; mg('dizzy', { chair: c.name }, 'confused', 0); bubble(c, ln('dizzy.say')); sfx('bloop'); }
      function zoneCheck(c, D) {
        if (!S.cy.bagua) return;
        const z = c.x > 0.88 && c.y > 0.86 ? 9 : Math.min(2, Math.floor(c.x * 3)) + 3 * Math.min(2, Math.floor(c.y * 3));
        if (D.zone !== z) { if (D.zone >= 0 && gate('bagua', 8000)) ins(z === 9 ? ln('bagua.misc') : L.bagua[z]); D.zone = z; }
      }
      function onUp(e) {
        const D = S.drag; if (!D || (D.pid !== undefined && e && e.pointerId !== undefined && e.pointerId !== D.pid)) return;
        releaseDrag(false);
      }
      function releaseDrag(cancelled) {
        const D = S.drag; S.drag = null; if (!D) return;
        const c = D.c; showRing(null);
        if (D.mode === 'consult') { if (!cancelled && D.ct < 1.5) consultFail(D, true); return; }
        if (D.mode === 'tug') { c.insp = !!(S.tug && S.tug.c === c && S.tug.stage === 'tug'); if (S.tug && S.tug.stage === 'tug') S.tug.stage = 'release'; return; }
        if (D.mode === 'coaster') { coasterBack(); return; }
        c.held = false;
        if (!D.dragging) {
          /* a slow second tap on the same chair pats it (touch players have no right-click) */
          const lt = S.lastTap;
          if (!cancelled && !D.asked && D.moved < 6 && lt && lt.c === c && S.tR - lt.t > 0.5 && S.tR - lt.t < 8 && !c.dizzy) { S.lastTap = null; pat(c); return; }
          if (!cancelled && D.moved < 6) S.lastTap = { c: c, t: S.tR };
          if (!D.asked && !cancelled && gate('ask' + c.id, 4000)) bubble(c, cline(c, 'ask'));
          return;
        }
        dropEffects(c, D.path);
        if (!cancelled && api.now() - D.samples[D.samples.length - 1].t < 120 && D.samples.length > 1) {
          const a = D.samples[0], b = D.samples[D.samples.length - 1], dt = (b.t - a.t) / 1000;
          if (dt > 0.005) { const vx = (b.x - a.x) / dt, vy = (b.y - a.y) / dt, sp = Math.hypot(vx, vy * 0.75); if (sp > 0.5 && !S.reduced && c.present && !c.out) { const k = Math.min(1, 3 / sp); c.slide = { vx: vx * k, vy: vy * k }; } }
        }
      }
      function dropEffects(c, pathPx) {
        sfx('tick'); kick(c.el, 'k-squash');
        S.cy.moves++; S.totalMoves++; ST('moves');
        const tiny = pathPx < 12;
        if (S.totalMoves === 1) { api.achieve(NS + 'first-move'); mg('firstmove', null, 'confused'); }
        if (tiny) { S.tinyN++; api.award(0.3, 'tiny move'); if (S.tinyN % 5 === 1) mg('eleven', null, 'smug', 0); }
        else if (S.leak + 0.1 <= 1) { S.leak += 0.1; api.award(0.1, 'placing'); }
        if (S.totalMoves % 25 === 0) mg(S.totalMoves === 100 ? 'moves100' : 'moves25', null, 'proud', 0);
        talk(c, 'drop', S.totalMoves === 1 ? 1 : 0.55);
        if (c.id === 'c5') kick(c.el, 'k-fold');
        if (S.cy.colin) { kick(colinEl, 'k-tilt'); if (S.totalMoves >= 20 && !S.c20) { S.c20 = true; mg('colin20', null, 'smug', 0); } else if (S.cy.moves % 9 === 0 && gate('colin', 20000)) mg('colin', null, 'confused', 0); }
        if (c.id === 'c1') c.touched = true;
        if (dd(c, { x: 0.93, y: 0.88 }) < 0.1 && S.tR - S.dennisAt > 30) { S.dennisAt = S.tR; mg('dennis.space', null, 'smug', 0); kick(leafEl, 'k-twitch'); }
        if (dd(c, S.win) < 0.08) defenestrate(c);
      }
      function consultFail(D, early) {
        const c = D.c; if (S.drag === D) S.drag = null; showRing(null);
        if (!S.cy.said.unionhint) { S.cy.said.unionhint = true; bubble(c, ln('union.hint')); } else bubble(c, ln('consult.refuse'));
        sfx('bloop');
        S.fatigue.push(S.tR); S.fatigue = S.fatigue.filter(function (t) { return S.tR - t < 8; });
        if (S.fatigue.length >= 6 && gate('fatigue', 30000)) { S.fatigue = []; mg('consult.fatigue', null, 'disappointed', 0); }
      }
      function showRing(c, p) {
        if (!c) { show(ringEl, false); return; }
        show(ringEl, true); ringEl.style.left = (c.x * 100).toFixed(2) + '%'; ringEl.style.top = (c.y * 100).toFixed(2) + '%';
        ringC.setAttribute('stroke-dashoffset', String(276.5 * (1 - clamp01(p))));
      }
      function rotate(c, deg, src) {
        if (!inRoom(c)) return false;
        if (S.cy.union && S.phase === 'play' && src !== 'kb' && !(c.consentUntil > S.tR)) { if (gate('crot', 4000)) mg('consult.rotate', null, 'confused', 0); return false; }
        c.a += deg; if (Math.abs(c.a) > 3600) c.a %= 360;
        sfx('tick'); S.rotN++; S.idle = 0;
        talk(c, 'rotate', 0.5);
        if (spam('rot', 3, 8)) { c.dizzy = true; c.dizzyT = 3; mg('spam.rotate', { chair: c.name }, 'confused', 0); bubble(c, ln('dizzy.say')); sfx('bloop'); }
        else if (S.rotN % 4 === 0) mg('rotate.mgmt', null, 'smug', 0);
        return true;
      }
      function pat(c) {
        if (!c || !inRoom(c)) return; activity();
        ST('pats'); kick(c.el, 'k-pat'); sfx('pop'); c.humEl.textContent = '💗'; kick(c.el, 'k-hum');
        S.patT.push(S.tR); S.patT = S.patT.filter(function (t) { return S.tR - t < 4; });
        talk(c, 'pat', 0.8);
        if (S.patT.length >= 8) { S.patT = []; mg('pat.spam', { chair: c.name }, 'confused', 0); }
        else if (c.id === 'c3' && gate('patpip', 20000)) mg('pat.pip', null, 'proud', 0);
        else if (gate('pat', 6000)) mg('pat', { chair: c.name }, 'proud', 0);
        if (api.stat.get(NS + 'pats') >= 20) api.achieve(NS + 'pats');
      }
      function onChip(c) {
        activity(); if (spam('chip', 4, 8)) { mg('spam.chip', null, 'confused', 0); sfx('blip'); return; }
        if (inRoom(c)) { select(c); try { c.el.focus({ preventScroll: true }); } catch (e) { /* ignore */ } bubble(c, cline(c, 'ask')); }
        if (gate('select', 2500)) mg('select', { chair: c.name, want: wantPhrase(c) }, 'neutral', 0);
        sfx('blip');
      }
      function onWindow() { activity(); sfx('pop'); if (spam('win', 4, 6)) { mg('spam.window', null, 'confused', 0); bubble(S.win, ln('window.say')); kick(winEl, 'k-wig'); return; } if (!S.facedEver && gate('wnever', 12000)) mg('window.never', null, 'confused', 0); kick(winEl, 'k-twitch'); }

      /* keyboard */
      function kbToggle(c) {
        if (!inRoom(c)) return;
        if (S.kb && S.kb.c === c) { kbPlace(); return; }
        if (S.kb) kbPlace();
        if (S.drag) releaseDrag(true);
        if (S.phase === 'fading' || S.phase === 'resetting') return;
        if (c.dizzy) { bubble(c, ln('dizzy.refuse')); return; }
        S.kb = { c: c, x0: c.x, y0: c.y, path: 0, acc: 0 }; lift(c); select(c);
        announce(c.name + ' lifted', true); if (S.cy.union) announce(ln('consult.silent'), true);
        dragStart(c);
      }
      function kbPlace() {
        const K = S.kb; S.kb = null; if (!K) return; const c = K.c; c.held = false;
        announce(c.name + ' placed', true);
        if (K.path > 0) dropEffects(c, K.path * S.rw);
      }
      function kbMove(c, key, shift) {
        const r = roomRect(); if (!(r.width > 0)) return; const px = (shift ? 50 : 10);
        let dx = key === 'ArrowLeft' ? -1 : key === 'ArrowRight' ? 1 : 0, dy = key === 'ArrowUp' ? -1 : key === 'ArrowDown' ? 1 : 0;
        let jx = 0, jy = 0; if (S.tug && S.tug.c === c) { jx = (api.rand() - 0.5) * 0.006; jy = (api.rand() - 0.5) * 0.006; }
        const dist = moveChair(c, c.x + dx * px / r.width + jx, c.y + dy * px / r.height + jy);
        S.kb.path += dist; S.kb.acc += dist * S.rw; S.moved += dist; c.touched = true;
        while (S.kb.acc >= 6) { S.kb.acc -= 6; addScuff(c.x, c.y); }
        zoneCheck(c, S.kb);
        if (dd(c, S.win) < 0.08) { const K = S.kb; S.kb = null; c.held = false; dropEffects(c, K.path * S.rw); }
      }
      function onKey(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const tg = e.target; if (tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName))) return;
        const k = e.key; if (!k) return; S.idle = 0; activity();
        const tc = chairOf(e.target);
        if (tc && (k === ' ' || k === 'Enter')) { e.preventDefault(); if (!e.repeat) kbToggle(tc); return; }
        if (S.kb) {
          if (k.indexOf('Arrow') === 0) { e.preventDefault(); kbMove(S.kb.c, k, e.shiftKey); return; }
          if (k === 'Escape') { e.preventDefault(); const K = S.kb; S.kb = null; K.c.held = false; K.c.x = K.x0; K.c.y = K.y0; announce(ln('esc'), true); bubble(K.c, ln('esc')); return; }
        }
        const lk = k.length === 1 ? k.toLowerCase() : k;
        const tgt = (S.kb && S.kb.c) || tc || S.sel;
        if (lk === 'i') { if (!e.repeat) onInspect(); return; }
        if (lk === 'p' && tgt) { pat(tgt); return; }
        if ((lk === 'q' || lk === 'e') && tgt) rotate(tgt, lk === 'q' ? -15 : 15, 'kb');
      }
      function onWheel(e) {
        const c = (S.drag && S.drag.c) || (S.kb && S.kb.c) || (e.shiftKey ? (S.hov || S.sel) : null); if (!c || c.dizzy) return;
        if (S.drag || S.kb) e.preventDefault();
        if (e.deltaY) rotate(c, e.deltaY < 0 ? -15 : 15, 'wheel');
      }

      /* ---------- coaster, half chair, sock ---------- */
      function onCoasterDown(e) {
        activity(); if (e.button && e.button !== 0) return;
        const c3 = S.byId.c5;
        if (S.cy.coasterUsed || S.phase === 'fading' || S.phase === 'resetting') { if (inRoom(c3) && gate('c3co', 6000)) bubble(c3, ln('c3.coaster')); return; }
        if (S.drag) releaseDrag(true);
        S.cy.coasterUsed = true; S.cy.det = true; S.cy.detT = 0; S.cy.coasterPos = { x: c3.x, y: c3.y };
        S.drag = { c: c3, pid: e.pointerId, mode: 'coaster', cx: e.clientX, cy: e.clientY, px: e.clientX, py: e.clientY, moved: 0, path: 0, samples: [], lastEv: S.tR, t0: S.tR };
        try { coasterEl.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ }
        kick(c3.el, 'k-vib'); mg('coaster.drag', null, 'panic');
      }
      function coasterBack() {
        if (!S.cy.det) return; S.cy.det = false; S.cy.coasterPos = null; sfx('pop'); mg('coaster.back', null, 'proud', 0);
      }
      function halfTry() {
        activity(); if (!S.cy.half) return;
        ST('halfattempts'); sfx('pop'); kick(halfEl, 'k-twitch');
        const n = api.stat.get(NS + 'halfattempts');
        if (n === 7) mg('half7', null, 'confused'); else if (n === 8) { api.achieve(NS + 'half'); mg('half.secret', null, 'proud'); api.confetti(); }
        else if (n > 8) { api.achieve(NS + 'half'); bubble({ x: S.cy.halfX, y: S.cy.halfY, name: '' }, ln('half')); }
        else bubble({ x: S.cy.halfX, y: S.cy.halfY, name: '' }, ln('half'));
      }
      function spawnSock(c) { S.cy.sock = { x: c.x, y: c.y, said: false, t: 0, bob: 0 }; ST('socks'); api.achieve(NS + 'sock'); const known = api.flag.get('sockSeen') || api.flag.get('pet-rock.sockSeen'); api.flag.set('sockSeen', true); mg(known ? 'sock.again' : 'sock.found', { chair: c.name }, 'confused'); note(ln('note.sock')); } // lint-ignore shared cast flag
      function doorTry(e) {
        activity(); if (e && e.button) return; kick(doorEl, 'k-twitch'); sfx('pop'); ST('doortries'); const n = api.stat.get(NS + 'doortries');
        if (n === 8) { api.achieve(NS + 'exit'); api.award(7.5, 'departure'); api.confetti(); sfx('fanfare'); mg('door.open', null, 'panic'); kick(doorEl, 'k-wig'); }
        else if (n > 8) { if (!spam('door', 2, 5)) mg('door.after', null, 'smug', 0); else mg('door.spam', null, 'confused', 0); }
        else if (spam('door', 2, 5)) { if (gate('doorspam', 6000)) mg('door.spam', null, 'confused', 0); }
        else api.say(L.doors[Math.max(0, n - 1)], { mood: n === 7 ? 'confused' : 'smug', priority: 1 });
      }
      function startStapler() {
        const known = !!api.flag.get('metStapler'); api.flag.set('metStapler', true); ST('staplers');
        S.cy.stapDone = true; S.cy.stap = { x: 0.97, y: 0.95, t: 0, bob: 0, stage: 'walk', n: 0 }; show(stapEl, true); mg(known ? 'stapler.known' : 'stapler.arrive', null, 'confused');
      }
      function updateStapler(dt) {
        const sp = S.cy.stap; if (!sp) return; sp.t += dt;
        if (sp.stage === 'walk') { if (stepTo(sp, 0.3, 0.95, 0.12, dt)) { sp.stage = 'demand'; sp.t = 0; } }
        else if (sp.stage === 'demand') {
          if (sp.n < 3 && sp.t >= 1 + sp.n * 5) { sp.n++; api.say(ln('stapler.demand'), { who: 'The Stapler', mood: 'neutral', priority: 1 }); }
          if (sp.t >= 15) { sp.stage = 'leave'; mg('stapler.after', null, 'smug', 0); }
        } else if (stepTo(sp, 0.99, 0.95, 0.2, dt)) { S.cy.stap = null; show(stapEl, false); return; }
        stapEl.style.left = (sp.x * 100).toFixed(2) + '%'; stapEl.style.top = (sp.y * 100).toFixed(2) + '%';
      }
      function startBirthday() {
        cakeEl.style.top = '50%'; show(cakeEl, true); S.cakeUntil = S.tR + 10; sfx('tada'); api.confetti(); mg('bday.mgmt', null, 'proud');
        for (let i = 0; i < 3; i++) later(3 + i * 1.6, function () { const lc = live(), c = lc[(i * 2 + S.cycle) % Math.max(1, lc.length)]; if (c) bubble(c, ln('bday.chairs')); });
        later(8.5, function () { ins('bday.insp'); }); later(11, function () { mg('bday.after', null, 'smug', 0); });
      }

      /* ---------- defenestration ---------- */
      function defenestrate(c) {
        if (S.cy.outChair) {
          c.x = clamp(S.win.x + WN[S.win.wall][0] * 0.2, 0.08, 0.92); c.y = clamp(S.win.y + WN[S.win.wall][1] * 0.2 / 0.75, 0.1, 0.9); c.slide = null;
          if (gate('defful', 4000)) mg('def.full', null, 'proud'); return;
        }
        c.out = true; c.outT = 0; c.slide = null; c.held = false; c.x = S.win.x; c.y = S.win.y; S.cy.outChair = c; S.cy.defBusy = 1.5;
        sfx('whoosh'); later(0.5, function () { sfx('pop'); });
        ST('defenestrations'); api.achieve(NS + 'defenestrated');
        mg('def.out', { chair: c.name }, 'confused');
        if (S.drag && S.drag.c === c) { S.drag = null; showRing(null); }
        if (S.kb && S.kb.c === c) S.kb = null;
      }
      function comeBack(c) {
        c.out = false; c.tan = true; c.slide = null; c.tw = null; c.trips++; c.x = 0.1; c.y = 0.92; c.want = { k: 'window' }; c.contentT = 0; c.grace = 2; S.cy.outChair = null;
        ST('windowtrips'); const n = api.stat.get(NS + 'defenestrations'), pc = L.postcards[Math.max(0, n - 1) % L.postcards.length];
        mg('def.back', { chair: c.name }, 'smug'); sfx('ding'); note('Postcard: ' + pc);
        cardEl.textContent = pc; cardEl.style.left = '10%'; cardEl.style.top = '86%'; show(cardEl, true); S.cardUntil = S.tR + 6; S.lastCard = pc;
        if (gate('defcount', 20000)) later(2, function () { mg('def.count', { n: n }, 'neutral', 0); });
        if (c.id === 'c1') S.cy.cliveWV = 0;
      }

      /* ---------- chair simulation ---------- */
      function nextWant(c) {
        const k = c.want.k, c1 = S.byId.c1, c2 = S.byId.c2; let nw;
        if (k === 'window') nw = { k: 'door' }; else if (k === 'door' || k === 'shade') nw = { k: 'window' };
        else if (k === 'corner') nw = inRoom(c1) && c !== c1 ? { k: 'near', ref: 'c1' } : { k: 'window' };
        else if (k === 'near') nw = { k: 'corner' }; else if (k === 'center') nw = { k: 'wall' };
        else nw = inRoom(c2) && c !== c2 ? { k: 'near', ref: 'c2' } : { k: 'center' };
        if (satOf(c, nw) >= 0.55) { for (let i = 0; i < ROT.length; i++) { const t = { k: ROT[i] }; if (ROT[i] !== k && satOf(c, t) < 0.55) { nw = t; break; } } }
        return nw;
      }
      function flip(c) {
        if (S.T >= 20 && api.chance(api.selftest ? 1 / 6 : 1 / 18)) {
          c.contentT = 0; c.grace = 14; ST('contented'); bubble(c, ln('content.say')); sfx('ding'); c.humEl.textContent = '💛'; kick(c.el, 'k-hum');
          if (gate('contentm', 8000)) mg('content', { chair: c.name }, 'confused'); api.award(3, 'contentment'); return;
        }
        const from = c.want.k; c.want = nextWant(c); c.contentT = 0; c.grace = 2; c.content = false; S.cy.flips++; ST('flips');
        if (c.id === 'c1' && from === 'window') S.cy.cliveWV++;
        let line = c.id === 'c1' && from === 'window' && S.cy.cliveWV === 3 ? ln('clive.third') : cline(c, 'flip');
        if (c.id === 'c3' && c.want.k === 'near') line = ln('pip.flip');
        bubble(c, line); sfx('bloop');
        if (gate('flip', 6000)) {
          const sp = { c1: 'flip.clive', c2: 'flip.brenda', c3: 'flip.pip' }[c.id];
          if (sp && !S.cy.said[sp]) { S.cy.said[sp] = true; mg(sp, null, 'smug', 0); } else mg('flip', { chair: c.name }, 'smug', 0);
        }
        if (gate('flipaward', 3000)) api.award(1, 'staffing change');
        kick(leafEl, 'k-twitch'); if (S.cy.colin) kick(colinEl, 'k-tilt'); c.chip.el.classList.remove(C('roll')); void c.chip.el.offsetWidth; c.chip.el.classList.add(C('roll'));
      }
      function slideStep(c, dt) {
        const v = c.slide; let x = c.x + v.vx * dt, y = c.y + v.vy * dt;
        if (x < 0.05 || x > 0.95) v.vx = 0; if (y < 0.07 || y > 0.93) v.vy = 0;
        c.x = clamp(x, 0.05, 0.95); c.y = clamp(y, 0.07, 0.93);
        const f = Math.exp(-4 * dt); v.vx *= f; v.vy *= f;
        if (dd(c, S.win) < 0.08) { c.slide = null; defenestrate(c); return; }
        if (Math.hypot(v.vx, v.vy * 0.75) < 0.02) c.slide = null;
      }
      function tweenStep(c, dt) {
        const t = c.tw; t.t += dt; const k = clamp01(t.t / t.d), e = k * k * (3 - 2 * k);
        c.x = t.x0 + (t.x1 - t.x0) * e; c.y = t.y0 + (t.y1 - t.y0) * e; c.a = t.a0 + (t.a1 - t.a0) * e;
        if (k >= 1) c.tw = null;
      }
      function sidle(c, gdt) {
        const t = targetOf(c), dx = t.x - c.x, dy = t.y - c.y, dist = Math.hypot(dx, dy * 0.75);
        if (!(dist > 1e-4) || (t.stop && dist <= t.stop)) return;
        const step = Math.min(0.01 * gdt, dist), ox = c.x, oy = c.y;
        c.x = clamp(c.x + dx / dist * step, 0.05, 0.95); c.y = clamp(c.y + dy / dist * step, 0.07, 0.93);
        c.sq = (c.sq || 0) + Math.hypot(c.x - ox, (c.y - oy) * 0.75);
        if (c.sq > 0.02 && !S.reduced && gate('squeak', 2500)) { c.sq = 0; sfx('boing'); }
      }
      function updateChairs(dt, gdt) {
        const play = S.phase === 'play', active = play && S.T >= 10; let happy = 0;
        for (let i = 0; i < S.chairs.length; i++) {
          const c = S.chairs[i]; if (!c.present) continue;
          if (c.out) { c.outT += gdt; if (c.outT >= 20) comeBack(c); continue; }
          if (c.dizzy) { c.dizzyT -= dt; if (c.dizzyT <= 0) c.dizzy = false; }
          if (c.tw) tweenStep(c, dt); else if (c.slide) slideStep(c, dt);
          if (c.out) continue;
          c.s = sat(c);
          const content = c.s >= 0.55, free = play && !c.held && !c.slide && !c.tw && !c.insp && !c.dizzy;
          if (content && !c.content && S.T >= 10 && S.tR - c.nearAt > 8) {
            c.nearAt = S.tR; const w = eff(c).k;
            if (c.id === 'c3' && w === 'near') bubble(c, ln('pip.crush')); else bubble(c, c.id === 'c1' && w === 'door' ? ln('clive.door') : cline(c, 'near'));
          }
          c.content = content;
          if (c.grace > 0) c.grace -= gdt;
          if (content) {
            happy++;
            if (free && active) { c.contentT += gdt; if (c.contentT >= (c.id === 'c1' && S.cy.cliveFast ? 2 : 4) && c.grace <= 0) flip(c); }
            if (S.tR - c.humAt > 5 && !c.held && gate('hum' + c.id, 5000)) { c.humAt = S.tR; c.humEl.textContent = '♪'; kick(c.el, 'k-hum'); }
          } else c.contentT = 0;
          if (free && active && !content && !(c.id === 'c1' && c.stableT > 0 && !S.cy.stableDone)) sidle(c, gdt);
        }
        if (happy >= 3 && play && S.cy.stand < 3 && gate('stand', 25000)) { say3(S.cy.stand++); }
      }
      function say3(i) { api.say(L.stand[i], { mood: 'smug', priority: 0 }); }

      /* ---------- once-per-second specials ---------- */
      function updateSpecials() {
        const lc = live(), mid = { x: (S.win.x + DOOR.x) / 2, y: (S.win.y + DOOR.y) / 2 };
        S.chairs.forEach(function (c) {
          const wd = wallDist(c); c.warn = inRoom(c) && ((S.cy.policy >= 1 && wd < 0.03) || (S.cy.policy >= 2 && wd > 0.005));
          const t = c.name + ', chair, wants ' + wantAria(c); if (c.f.al !== t) { c.f.al = t; c.el.setAttribute('aria-label', t); }
        });
        const c1 = S.byId.c1;
        if (inRoom(c1) && !c1.held && c1.touched && dd(c1, mid) < 0.05) {
          c1.stableT++; if (c1.stableT >= 3 && !S.cy.stableDone) { S.cy.stableDone = true; bubble(c1, ln('clive.stable')); api.achieve(NS + 'stable'); sfx('ding'); }
        } else c1.stableT = 0;
        /* tower */
        const free = lc.filter(function (c) { return !c.held; });
        if (!S.cy.tower) {
          for (let i = 0; i < free.length; i++) {
            const grp = free.filter(function (o) { return dd(o, free[i]) < 0.04; });
            if (grp.length >= 5) { const cx = grp.reduce(function (s, o) { return s + o.x; }, 0) / grp.length, cy = grp.reduce(function (s, o) { return s + o.y; }, 0) / grp.length; S.cy.tower = { x: cx, y: cy }; S.cy.towerV = true; ST('towers'); api.achieve(NS + 'tower'); mg('tower.up', null, 'proud'); sfx('fanfare'); if (api.flag.get('metToaster')) later(5, function () { mg('tower.toaster', null, 'smug', 0); }); break; }
          }
        } else {
          const tw = S.cy.tower, n = lc.filter(function (o) { return dd(o, tw) < 0.06; }).length;
          if (n < 5) { S.cy.tower = null; S.quiet = 3; mg('tower.down', null, 'disappointed'); }
        }
        /* gaze */
        const faceN = lc.filter(function (c) { return facing(c, S.win); }).length;
        if (faceN > 0) S.facedEver = true;
        winEl.classList.toggle(C('glow'), faceN > 0 && S.T >= 10);
        const b9 = S.T >= 480 && S.T < 570 && S.phase === 'play';
        if (!b9 && S.T >= 10 && S.T < 480 && faceN > 0 && !S.cy.said.winearly && S.phase === 'play') { S.cy.said.winearly = true; bubble(S.win, ln('window.early')); }
        if (b9 && faceN > 0 && !S.cy.thanked) { S.cy.thanked = 1; bubble(S.win, ln(S.cycle >= 2 ? 'window.thanks2' : 'window.thanks')); ST('thankyous'); api.achieve(NS + 'thanks'); }
        if (lc.length && faceN === lc.length && S.tR - S.cy.goldAt > 20) {
          S.cy.goldAt = S.tR; api.achieve(NS + 'facing');
          if (b9) { S.cy.goldUntil = S.tR + 6; sfx('bell'); mg('zoom.gold', null, 'proud'); show(capEl, true); S.capUntil = S.tR + 6; later(6, function () { mg('zoom.goldend', null, 'neutral'); }); }
          else mg('facing', null, 'proud', 0);
        }
        if (S.pendScuff > 0) { ST('scuffs', S.pendScuff); S.pendScuff = 0; }
        setTxt(cntEl, 'Chairs: ' + (S.cy.desmond ? '6' : '5') + (S.cy.half ? ' (+1/2, disputed)' : ''));
      }

      /* ---------- Inspector: visits, ceremony, verdict ---------- */
      function showI(on) { show(inspEl, on); S.I.on = on; }
      function stepTo(I, tx, ty, sp, dt) {
        const d = dd(I, { x: tx, y: ty }); I.bob += dt * 10;
        if (d <= sp * dt || d < 1e-5) { I.x = tx; I.y = ty; return true; }
        const f = sp * dt / d; I.x += (tx - I.x) * f; I.y += (ty - I.y) * f; return false;
      }
      function canVisit() { return !S.visit && !S.tug && !S.cer && S.phase === 'play' && S.cy.defBusy <= 0 && S.cy.hold <= 0 && !S.cy.closing; }
      function chairNote(c) { return c.id === 'c1' ? ln('note.clive') : c.id === 'c6' ? ln('note.desmond') : ln('notes'); }
      function note(t) {
        clipUl.appendChild(el('li', {}, t)); while (clipUl.children.length > 12) clipUl.removeChild(clipUl.firstChild);
      }
      function startVisit(kind) {
        if (!canVisit()) return false;
        const I = S.I; I.x = DOOR.x; I.y = 0.97; I.sit = false; const path = [];
        if (kind === 'walk') {
          let cur = { x: DOOR.x, y: DOOR.y }; const rest = live();
          while (rest.length) { let bi = 0, bd = 9; rest.forEach(function (c, i) { const d = dd(cur, c); if (d < bd) { bd = d; bi = i; } }); const c = rest.splice(bi, 1)[0]; path.push({ x: clamp(c.x + 0.07, 0.08, 0.92), y: clamp(c.y + 0.1, 0.1, 0.95), c: c }); cur = c; }
          if (!S.arriveSaid) { S.arriveSaid = true; mg('inspector.arrive', null, 'smug', 0); }
        } else path.push({ x: 0.3, y: 0.86 });
        S.visit = { kind: kind, stage: 'walk', i: 0, t: 0, path: path }; showI(true); return true;
      }
      function updateVisit(dt) {
        const V = S.visit; if (!V) return; const I = S.I;
        if (V.stage === 'walk') {
          const p = V.path[V.i]; if (!p) { V.stage = 'cer'; startCer(V.kind); return; }
          if (stepTo(I, p.x, p.y, 0.28, dt)) { V.stage = 'pause'; V.t = 0; if (p.c) { note(chairNote(p.c)); if (p.c.id === 'c1') kick(p.c.el, 'k-pat'); } }
        } else if (V.stage === 'pause') {
          V.t += dt; if (V.t >= (V.kind === 'walk' ? 0.5 : V.kind === 'glance' ? 0.4 : 0.6)) { V.i++; V.stage = 'walk'; }
        } else if (V.stage === 'cer') { if (!S.cer) V.stage = 'leave'; }
        else if (stepTo(I, DOOR.x, 0.97, 0.45, dt)) { S.visit = null; showI(false); }
      }
      function startCer(kind) {
        S.cer = { t: 0, dur: kind === 'walk' ? 3.5 : kind === 'glance' ? 1.6 : 2.4, kind: kind, landed: 0, roll: 0, stamped: false, ang: 0 };
        sfx('tick');
      }
      function setNeedle(a) { a = Math.round(a * 10) / 10; if (needle._a !== a) { needle._a = a; needle.style.transform = 'rotate(' + a + 'deg)'; } }
      function updateCer(dt) {
        const Cr = S.cer; if (!Cr) return; Cr.t += dt; const p = Cr.t / Cr.dur;
        Cr.roll += dt;
        if (Cr.roll >= 0.07) { Cr.roll = 0; for (let i = Cr.landed; i < 4; i++) setTxt(reels[i].v, api.pick(NUMS)); if (Cr.landed < 4 && api.chance(0.3)) sfx('tick'); }
        const marks = [0.3, 0.42, 0.54, 0.66];
        while (Cr.landed < 4 && p >= marks[Cr.landed]) { setTxt(reels[Cr.landed].v, 'Fine'); Cr.landed++; sfx('tick'); }
        setNeedle(p < 0.7 ? (p < 0.35 ? Math.sin(Cr.t * 7) * 80 : Math.sin(Cr.t * 31) * 5 + 28 * Math.sin(Cr.t * 3.1)) : 0);
        if (!Cr.stamped && p >= 0.78) { Cr.stamped = true; finishInspection(Cr.kind); }
        if (p >= 1) { for (let i = 0; i < 4; i++) setTxt(reels[i].v, 'Fine'); setNeedle(0); S.cer = null; }
      }
      function stampOf(n) { return STAMPS[n <= 12 ? n - 1 : 6 + ((n - 7) % 6)]; }
      function slam(text, cap, font, dur) {
        stampMain.textContent = text + mkTxt(); stampCap.textContent = cap || ''; stampEl.classList.toggle(C('sfont'), !!font);
        stampEl.style.setProperty('--sd', (dur || 0.38) + 's'); show(stampEl, true); kick(stampEl, 'k-slam');
        if (!S.reduced) kick(room, 'k-shake'); sfx('stamp'); S.stampUntil = S.tR + 2.6;
      }
      function allApart(lc) {
        if (lc.length < 2) return false;
        for (let i = 0; i < lc.length; i++) for (let j = i + 1; j < lc.length; j++) if (faceDiff(lc[i].a, lc[j].a) <= 40) return false;
        return true;
      }
      function finishInspection(kind) {
        S.n++; const n = S.n, lc = live(); ST('inspections'); ST('fines'); api.award(0.5, 'inspection'); api.save.set('n', S.savedN + S.n);
        let key;
        if (n === 1 && kind === 'glance') key = 'inspector.first'; else if (S.cy.towerV) { key = 'inspector.tower'; S.cy.towerV = false; }
        else if (n + S.savedN === 20 || n + S.savedN === 50) key = 'inspector.n' + (n + S.savedN);
        else if (S.moved < 1e-6) key = 'inspector.nochange'; else if (S.moved > 1.5) key = 'inspector.reshuffle'; else if (allApart(lc)) key = 'inspector.chaos'; else key = n >= 12 && api.chance(0.5) ? 'inspector.late' : 'inspector.verdict';
        S.moved = 0; let text = fill(ln(key), { n: n + S.savedN });
        if (S.gPause) { S.gPause = false; text = ln('inspector.gerald') + ' ' + text; }
        ins(text);
        slam(stampOf(n), n === 6 ? 'typeface commissioned' : '', n === 6,S.presses.length > 1 ? Math.max(0.12, 0.38 - 0.03 * S.presses.length) : 0.38);
        setTxt(subEl, L.subs[(n - 1) % L.subs.length]); kick(sandraEl, 'k-wig');
        if (n % 7 === 0) { kick(sticker, 'k-peel'); later(1.3, function () { mg('inspector.nine', null, 'smug', 0); }); }
        if (n % 4 === 0 && gate('sreview', 20000)) later(2, function () { api.say(ln('sandra.review'), { who: 'Sandra (Compliance)', mood: 'smug', priority: 0 }); });
        if (kind === 'walk' && api.chance(0.5)) note(ln('notes'));
        if (api.stat.get(NS + 'fines') >= 10) api.achieve(NS + 'unvarying');
      }
      function onInspect() {
        activity();
        if (S.stuck > 0) { sfx('buzz'); if (gate('stuckp', 2500)) mg('spam.stuckpress', null, 'confused', 0); return; }
        S.presses.push(S.tR); S.presses = S.presses.filter(function (t) { return S.tR - t < 6; });
        if (S.presses.length === 4) ins('spam.i4'); else if (S.presses.length === 7) ins('spam.i7');
        if (S.phase !== 'play' || S.cy.closing) { S.presses = []; sfx('tick'); return; }
        if (S.presses.length > 10) { rushJam(); return; }
        if (!canVisit()) { sfx('tick'); return; }
        startVisit(S.presses.length > 1 ? 'quick' : 'walk');
      }
      function rushJam() {
        const n = S.presses.length; S.presses = []; S.stuck = 5; api.award(-0.5, 're-inspection fee'); ST('rush');
        mg('spam.inspect', { n: n }, 'panic'); ins('spam.rush'); slam('FINE (Rush)', '', false, 0.12);
        later(0.8, function () { mg('spam.stuck', null, 'confused'); show(signEl, true); S.signUntil = S.tR + 5; });
        api.achieve(NS + 'rush'); sfx('buzz');
        ibtn.setAttribute('aria-disabled', 'true'); ibtn.classList.add(C('off'));
      }

      /* ---------- tug of war ---------- */
      function tryTug() {
        if (!canVisit()) return false;
        const cand = live().filter(function (c) { return !c.held && !c.dizzy && !c.slide && !c.tw; });
        if (!cand.length) return false;
        const c = api.pick(cand); S.I.x = DOOR.x; S.I.y = 0.97;
        S.tug = { c: c, stage: 'walk', t: 0, tugT: 0, awarded: false, from: null, to: null }; showI(true); return true;
      }
      function updateTug(dt) {
        const T = S.tug; if (!T) return; const c = T.c, I = S.I;
        if (!inRoom(c) || (T.stage !== 'tug' && S.drag && S.drag.c === c && S.drag.mode !== 'tug')) { T.stage = 'leave'; }
        if (T.stage === 'walk') {
          if (stepTo(I, clamp(c.x + 0.05, 0.05, 0.95), clamp(c.y + 0.07, 0.05, 0.95), 0.35, dt)) {
            let to = { x: 0.5, y: 0.5 };
            for (let i = 0; i < 8; i++) { to = { x: 0.1 + api.rand() * 0.8, y: 0.14 + api.rand() * 0.72 }; if (dd(c, to) >= 0.2) break; }
            T.from = { x: c.x, y: c.y }; T.to = to; T.stage = 'drag'; T.t = 0; c.insp = true; show(gripEl, true); note(ln('note.eyebrows'));
          }
        } else if (T.stage === 'drag' || T.stage === 'tug') {
          T.t += dt; const k = clamp01(T.t / 4), e = k * k * (3 - 2 * k), kb = S.kb && S.kb.c === c;
          const ix = T.from.x + (T.to.x - T.from.x) * e, iy = T.from.y + (T.to.y - T.from.y) * e;
          if (T.stage === 'tug' || kb) {
            T.tugT += dt; if (kb && T.stage === 'drag') T.stage = 'tug';
            if (!kb) { const D = S.drag; const tx = D && D.mode === 'tug' ? D.tx : c.x, ty = D && D.mode === 'tug' ? D.ty : c.y; T.jit = (T.jit || 0) + dt; if (T.jit > 0.05) { T.jit = 0; T.jx = (api.rand() - 0.5) * 0.012; T.jy = (api.rand() - 0.5) * 0.012; } moveChair(c, (tx + ix) / 2 + (T.jx || 0), (ty + iy) / 2 + (T.jy || 0)); }
            if (T.tugT >= 3) T.stage = 'release';
          } else moveChair(c, ix, iy);
          I.x = clamp(c.x + 0.05, 0, 1); I.y = clamp(c.y + 0.07, 0, 1); I.bob += dt * 6;
          gripEl.style.left = (c.x * 100).toFixed(2) + '%'; gripEl.style.top = (c.y * 100 - 4).toFixed(2) + '%';
          if (T.stage === 'drag' && k >= 1) T.stage = 'release';
        } else if (T.stage === 'release') {
          const wasTug = T.tugT > 0; c.insp = false; show(gripEl, false);
          if (S.drag && S.drag.mode === 'tug') { S.drag = null; c.held = false; }
          if (wasTug && !T.awarded) { T.awarded = true; api.award(0.5, 'tug of war'); mg('tug.end', { chair: c.name }, 'confused', 0); if (api.chance(0.5)) later(2, function () { mg('tug.smug', null, 'smug', 0); }); }
          T.stage = 'leave';
        } else if (stepTo(I, DOOR.x, 0.97, 0.45, dt)) { c.insp = false; S.tug = null; show(gripEl, false); if (!S.I.sit && !S.visit && !S.cy.close) showI(false); }
      }

      /* ---------- idle, meeting ---------- */
      function updateIdle(dt) {
        S.idle += dt; const I = S.idle, F = S.idleF, ph = S.phase, q = function (k, t, key, mood) { if (I >= t * IK && !F[k] && ph === 'meeting') { F[k] = true; mg(key, null, mood, 0); } };
        if (I >= 20 * IK && !F.i20 && ph === 'play') { F.i20 = true; mg('idle.20', null, 'confused', 0); }
        if (I >= 45 * IK && !F.i45) { F.i45 = true; mg('idle.45', null, 'disappointed'); }
        if (I >= 65 * IK && !F.i65 && ph === 'play') { F.i65 = true; const a = S.byId.c4, b = S.byId.c3; if (inRoom(a)) bubble(a, ln('idle.65')); if (inRoom(b)) bubble(b, ln('idle.65b')); }
        if (I >= 90 * IK && !F.i90 && ph === 'play' && !S.cy.closing) { F.i90 = true; startMeeting(); }
        q('i135', 135, 'idle.135', 'smug'); q('i180', 180, 'idle.180', 'confused'); q('i420', 420, 'idle.420', 'smug'); q('i600', 600, 'idle.600', 'proud');
        if (I >= 300 * IK && !F.i300 && ph === 'meeting') { F.i300 = true; S.I.sit = true; showI(true); mg('idle.5min', null, 'smug'); }
        if (S.meeting) {
          const M = S.meeting; M.t += dt;
          if (M.stage === 'talk' && M.t >= M.next) {
            const row = L.meeting[M.i]; M.i++; M.next = M.t + 1.5;
            if (row) { const c = S.byId[row[0]]; if (c && inRoom(c)) bubble(c, row[1], 3.4); }
            if (M.i >= L.meeting.length) { M.stage = 'end'; M.next = M.t + 1.2; }
          } else if (M.stage === 'gather' && M.t >= 1.6) { M.stage = 'talk'; M.next = M.t + 0.4; }
          else if (M.stage === 'end' && M.t >= M.next) { M.stage = 'done'; ST('meetings'); api.achieve(NS + 'meeting'); mg('idle.minutes', null, 'smug'); }
        }
      }
      function startMeeting() {
        if (S.drag) releaseDrag(true); if (S.kb) kbPlace();
        if (S.tug) S.tug.stage = 'leave';
        S.phase = 'meeting'; const lc = live(), n = lc.length;
        S.meeting = { saved: [], t: 0, stage: 'gather', i: 0, next: 0 };
        lc.forEach(function (c, i) {
          S.meeting.saved.push({ c: c, x: c.x, y: c.y, a: c.a });
          const ang = i * 2 * Math.PI / n - Math.PI / 2, x = 0.5 + 0.18 * Math.cos(ang), y = 0.5 + 0.18 * Math.sin(ang) / 0.75;
          const a1 = Math.atan2(0.5 - x, -(0.5 - y)) * 180 / Math.PI; c.slide = null; c.held = false;
          c.tw = { x0: c.x, y0: c.y, a0: c.a, x1: x, y1: y, a1: c.a + (((a1 - c.a) % 360 + 540) % 360 - 180), t: 0, d: 1.5 };
        });
      }
      function endMeeting(was) {
        const M = S.meeting; S.phase = 'play'; S.meeting = null; if (!M) return;
        M.saved.forEach(function (o) { if (inRoom(o.c)) o.c.tw = { x0: o.c.x, y0: o.c.y, a0: o.c.a, x1: o.x, y1: o.y, a1: o.c.a + (((o.a - o.c.a) % 360 + 540) % 360 - 180), t: 0, d: 0.6 }; });
        S.quiet = 0.9; S.bubs.forEach(function (b) { b.exp = 0; });
        if (M.stage !== 'gather' || M.t > 0.1) mg(was >= 600 * IK ? 'idle.back.600' : was >= 300 * IK ? 'idle.back.300' : 'idle.back', null, 'proud');
      }

      /* ---------- the escalation timeline ---------- */
      function addColin() { S.cy.colin = true; show(colinEl, true); mg('colin.land', null, 'smug'); sfx('pop'); const pp = S.byId.c3; if (inRoom(pp)) { bubble(pp, ln('pip.bird')); kick(pp.el, 'k-shake'); } if (S.cycle >= 2) { S.cy.lanyard = true; show(colinTag, true); later(3, function () { mg('colin.lanyard', null, 'smug', 0); }); } }
      function addDesmond() {
        const d = S.byId.c6; S.cy.desmond = true; d.present = true; d.f.vis = true; d.el.hidden = false; d.el.classList.add(C('drop'));
        api.setTimeout(function () { d.el.classList.remove(C('drop')); }, 950);
        roster.appendChild(d.chip.el); sfx('honk'); mg('desmond.arrive', null, 'confused'); mg('desmond.probation', null, 'smug', 0); later(5, function () { mg('desmond.papers', null, 'neutral', 0); });
      }
      function policy(n) {
        S.cy.policy = n; sandraEl.textContent = '🚩 ' + ln('sandra.p' + n + '.note'); kick(sandraEl, 'k-wig');
        if (n >= 1) show(band1, true); if (n >= 2) show(band2, true); sfx('stamp');
      }
      function startZoom() { S.cy.zoom = true; stage.classList.add(C('zoom')); if (!S.zoomAwarded) { S.zoomAwarded = true; api.award(5, 'perspective'); ST('zoomouts'); later(3, function () { mg('zoom.award', null, 'proud'); }); } }
      function startGerald() {
        S.geraldWas = !!api.flag.get('metGerald');
        S.cy.gerald = { stage: 'walk', t: 0, i: 0, x: DOOR.x, y: 0.93, bob: 0 }; show(gerEl, true); mg('gerald.arrive', null, 'smug');
      }
      function updateGerald(gdt, dt) {
        const G = S.cy.gerald; if (!G) return;
        if (G.stage === 'walk') {
          const hy = S.cy.halfY, hx = S.cy.halfX, d = dd(G, { x: hx, y: hy }); G.t += dt;
          if (d < 0.02 || G.t > 12) { G.stage = 'sit'; G.t = 0; show(gerEl, false); halfEl.querySelector('b').textContent = '🥔'; api.flag.set('metGerald', true); }
          else stepTo(G, hx, hy - 0.02, 0.2, dt);
          gerEl.style.left = (G.x * 100).toFixed(2) + '%'; gerEl.style.top = (G.y * 100).toFixed(2) + '%';
        } else if (G.stage === 'sit') {
          const t0 = G.t; G.t += gdt;
          const cues = [[0.5, S.geraldWas ? 'gerald.again' : 'gerald.intro'], [6, 'gerald.ask'], [11, 'gerald.seated'], [16, 'gerald.profound']];
          cues.forEach(function (q) { if (t0 < q[0] && G.t >= q[0]) api.say(ln(q[1]), { who: 'Gerald', mood: 'neutral', priority: 1 }); });
          if (G.t >= 25) { G.stage = 'leave'; G.t = 0; halfEl.querySelector('b').textContent = ''; gerEl.textContent = '💨'; show(gerEl, true); gerEl.style.left = (S.cy.halfX * 100).toFixed(2) + '%'; gerEl.style.top = (S.cy.halfY * 100).toFixed(2) + '%'; kick(gerEl, 'k-peel'); mg('gerald.leave', null, 'smug'); S.gPause = true; }
        } else if (G.stage === 'leave') { G.t += dt; if (G.t > 1.2) { show(gerEl, false); gerEl.textContent = '🥔'; S.cy.gerald = null; } }
      }
      function closeStart() {
        S.cy.closing = true; S.cy.union = false; S.cy.zoom = false; stage.classList.remove(C('zoom')); show(giantB, false);
        S.phase = 'closing'; if (S.tug) S.tug.stage = 'leave'; if (S.drag && S.drag.mode === 'consult') { showRing(null); S.drag = null; }
      }
      function ceremonyStart() {
        mg('end.ceremony', null, 'proud'); sfx('fanfare'); api.confetti();
        S.I.x = DOOR.x; S.I.y = 0.97; S.cy.close = { stage: 'walk' }; showI(true); S.visit = null;
        certEl.style.left = '50%'; certEl.style.top = '38%'; show(certEl, true);
      }
      function hang() {
        S.cy.hung = true; certEl.style.left = (S.win.x * 100).toFixed(1) + '%'; certEl.style.top = (S.win.y * 100 + (S.win.wall === 0 ? 8 : S.win.wall === 2 ? -8 : 0)).toFixed(1) + '%'; certEl.classList.add(C('hung'));
        winEl.classList.add(C('dim')); show(frame2, true); mg('end.hung', null, 'proud'); later(2.2, function () { api.say(ln('end.slip1'), { who: 'Inspector Pemberton-Oyelaran', mood: 'proud', priority: 1 }); }); later(3.2, function () { mg('end.coaster', null, 'smug', 0); }); later(4.8, function () { ins('end.slip2'); }); later(6.3, function () { mg('end.slip3', null, 'neutral', 0); });
        if (S.lastCard) { cardEl.textContent = S.lastCard; cardEl.style.left = (S.win.x * 100).toFixed(1) + '%'; cardEl.style.top = (S.win.y * 100 + 14).toFixed(1) + '%'; show(cardEl, true); S.cardUntil = S.tR + 9; }
        S.cy.hold = api.selftest ? 0.75 : 7.5; api.award(7.5, 'closing ceremony'); sfx('tada');
      }
      const BEATS = [
        [0.4, function () { mg('intro1', null, 'proud'); }],
        [3, function () { bubble(S.byId.c1, ln('clive.ask')); }],
        [4.5, function () { bubble(S.byId.c4, ln('marg.ask')); }],
        [6, function () { startVisit('glance'); }],
        [10, function () { mg('intro2', null, 'neutral'); }],
        [13, function () { if (!S.cy.moves && S.cycle === 1) mg('afterglance', null, 'smug', 0); }],
        [15, function () { if (S.savedN > 0 && S.cycle === 1) mg('back', { n: S.savedN }, 'smug', 0); }],
        [16, function () { mg('please', null, 'neutral', 0); }],
        [18, function () { mg('fac.walls', null, 'neutral', 0); }],
        [22, function () { mg('marguerite', null, 'smug', 0); }],
        [30, function () { kick(S.byId.c5.el, 'k-tilt'); kick(coasterEl, 'k-twitch'); mg('c3.wobble', null, 'confused', 0); }],
        [40, function () { mg('nothingstays', null, 'neutral'); }],
        [45, addColin],
        [55, function () { mg('pay.memo', null, 'smug', 0); }],
        [60, function () { api.say(TIPS[0], { mood: 'neutral', priority: 0 }); }],
        [70, function () { policy(1); mg('sandra.p1', null, 'confused'); }],
        [75, function () { if (!S.cy.flips) { mg('nudgeflip', null, 'confused'); S.cy.cliveFast = true; } }],
        [100, function () { mg('fac.ceiling', null, 'neutral', 0); }],
        [110, function () { policy(2); mg('sandra.p2', null, 'confused'); }],
        [118, function () { mg('sandra.both', null, 'smug', 0); }],
        [130, function () { mg('sandra.flag', null, 'confused', 0); }],
        [135, function () { api.say(TIPS[1], { mood: 'neutral', priority: 0 }); }],
        [140, function () { mg('fac.label', null, 'neutral', 0); }],
        [150, addDesmond],
        [165, function () { S.cy.bagua = true; baguaEl.classList.add(C('on')); if (!S.reduced) kick(baguaEl, 'k-flash'); mg('bagua.up', null, 'confused', 0); }],
        [180, startBirthday],
        [195, function () { mg('tue.forecast', null, 'panic', 0); }],
        [210, function () { S.cy.winGo = true; S.cy.winStart = 210; if (S.cy.colin) later(4, function () { mg('colin.move', null, 'smug', 0); }); if (S.reduced) setWin(1.75); }],
        [212, function () { mg('winmove1', null, 'confused'); }],
        [216, function () { mg('winmove.sorry', null, 'smug', 0); }],
        [222, function () { mg('winmove2', null, 'confused'); }],
        [232, function () { mg('winmove3', null, 'panic'); }],
        [240, function () { S.cy.half = true; S.cy.halfT = 240; show(halfEl, true); mg('half.up', null, 'confused'); later(5, function () { mg('half.count', null, 'smug', 0); }); }],
        [250, function () { api.say(TIPS[2], { mood: 'neutral', priority: 0 }); }],
        [262, startGerald],
        [300, function () { mg('union1', null, 'smug'); }],
        [305, function () { S.cy.union = true; mg('union2', null, 'proud', 2); }],
        [310, function () { S.cy.picket = true; show(picketEl, true); mg('picket', null, 'confused'); later(5, function () { mg(api.flag.get('metStapler') ? 'union.stapler2' : 'union.stapler', null, 'confused', 0); }); }],
        [340, function () { api.say(TIPS[3], { mood: 'neutral', priority: 0 }); }],
        [345, function () { mg('union.break', null, 'smug', 0); }],
        [360, function () { api.say(ln('sandra.union'), { who: 'Sandra (Compliance)', mood: 'smug', priority: 0 }); }],
        [390, function () { mg('tug1', null, 'smug'); }],
        [400, function () { policy(3); mg('sandra.p3', null, 'confused'); later(6, function () { api.say(ln('sandra.contra'), { who: 'Sandra (Compliance)', mood: 'smug', priority: 0 }); }); }],
        [420, function () { kick(leafEl, 'k-twitch'); mg(api.flag.get('metDennis') ? 'dennis.known' : 'dennis.glance', null, 'smug'); note(ln('note.dennis')); }],
        [436, function () { api.say(ln('insp.lunch'), { who: 'Inspector Pemberton-Oyelaran', mood: 'smug', priority: 0 }); }],
        [456, function () { policy(4); mg('sandra.p4', { clause: api.line('tosClause') }, 'confused'); }],
        [480, startZoom],
        [483, function () { mg('zoom.diorama', null, 'proud'); }],
        [500, function () { show(giantB, true); kick(giantB, 'k-slam'); mg('zoom.giant', null, 'smug'); }],
        [506, function () { mg('zoom.lonely', null, 'neutral', 0); }],
        [510, function () { mg('zoom.tuesday', null, 'panic'); }],
        [525, function () { kick(leafEl, 'k-twitch'); mg('dennis.report', null, 'neutral', 0); later(4, function () { api.say(api.line('plantStatus'), { mood: 'smug', priority: 0 }); }); }],
        [545, function () { mg('touch.noticed', null, 'proud', 0); }],
        [560, function () { mg('zoom.wed', null, 'confused', 0); }],
        [570, closeStart],
        [575, ceremonyStart],
        [577, function () { ins('end.read1'); }],
        [580, function () { ins('end.read2'); }],
        [583, function () { mg('end.thanks', null, 'proud'); }],
        [586, function () { mg('end.score', null, 'proud'); }],
        [590, hang]
      ];
      function advanceClock(gdt) {
        if (S.phase !== 'play' && S.phase !== 'closing') return;
        if (S.cy.hold > 0) return;
        S.T += gdt;
        for (let i = 0; i < BEATS.length; i++) {
          if (BEATS[i][0] > S.T) break;
          if (!S.cy.fired[i]) { S.cy.fired[i] = true; BEATS[i][1](); }
        }
        if (S.phase === 'play' && !S.cy.closing && S.T >= 10) {
          if (S.T >= S.cy.nextVisit) { if (canVisit()) { startVisit('walk'); S.cy.nextVisit = S.T + api.randInt(25, 40); } else S.cy.nextVisit = S.T + 3; }
          if (S.T >= S.cy.nextTug && S.T < 560) { if (tryTug()) S.cy.nextTug = S.T + api.randInt(18, 30); else S.cy.nextTug = S.T + 3; }
        }
      }
      function updateClosing(dt) {
        const cl = S.cy.close;
        if (cl && cl.stage === 'walk') { if (stepTo(S.I, 0.5, 0.6, 0.35, dt)) { cl.stage = 'stand'; } }
        if (S.cy.hold > 0) {
          S.cy.hold -= dt;
          if (S.cy.hold <= 0) { S.cy.hold = 0; S.phase = 'fading'; S.fadeT = 0; fadeEl.classList.add(C('on')); }
        } else if (S.phase === 'fading') {
          S.fadeT += dt; if (S.fadeT >= (S.reduced ? 0.1 : 1.1)) { S.phase = 'resetting'; resetAll(); }
        } else if (S.phase === 'resetting') { S.phase = 'play'; }
      }
      function resetAll() {
        S.cycle++; ST('cycles'); S.T = 0; S.cy = cyNew(); S.sched = []; S.drag = null; S.kb = null; S.visit = null; S.tug = null; S.cer = null; S.meeting = null; S.sel = null; S.hov = null;
        S.stuck = 0; S.presses = []; S.moved = 0; S.stampUntil = S.signUntil = S.capUntil = S.cardUntil = 0; S.gPause = false; S.rotN = 0; S.leak = 0; S.idle = 0; S.idleF = {}; S.lastCard = null; S.lastTap = null;
        S.chairs.forEach(function (c) {
          c.x = c.d.x; c.y = c.d.y; c.a = c.d.a; c.want = c.d.want; c.s = 0.2; c.content = false; c.contentT = 0; c.grace = 0; c.out = false; c.outT = 0; c.tan = false; c.held = false; c.slide = null; c.tw = null; c.insp = false; c.dizzy = false; c.consentUntil = 0; c.touched = false; c.stableT = 0; c.warn = false;
          if (c.id === 'c6') { c.present = false; c.f.vis = false; c.el.hidden = true; if (c.chip.el.parentNode) c.chip.el.parentNode.removeChild(c.chip.el); }
        });
        S.bubs.forEach(function (b) { if (b.e.parentNode) b.e.parentNode.removeChild(b.e); }); S.bubs = [];
        while (clipUl.firstChild) clipUl.removeChild(clipUl.firstChild);
        note('Note: (none yet. Inspector is on his way.)');
        S.scuffs = []; S.scuffN = 0; S.pendScuff = 0; redrawScuffs();
        setWin(0); S.beamPh = 0;
        [band1, band2, picketEl, colinEl, colinBrow, colinTag, halfEl, gerEl, gripEl, inspEl, ringEl, knobEl, patKnob, stampEl, signEl, certEl, frame2, cardEl, capEl, sockEl, flagEl, giantB, cakeEl, stapEl].forEach(function (e) { show(e, false); }); S.cakeUntil = 0; S.sp = {};
        certEl.classList.remove(C('hung')); winEl.classList.remove(C('dim')); stage.classList.remove(C('zoom')); baguaEl.classList.remove(C('on')); beamEl.classList.remove(C('gold'));
        gerEl.textContent = '🥔'; halfEl.querySelector('b').textContent = ''; S.I.on = false; S.I.sit = false;
        sandraEl.textContent = '🚩 ' + ln('sandra.p0.note'); ibtn.setAttribute('aria-disabled', 'false'); ibtn.classList.remove(C('off'));
        setNeedle(0); reels.forEach(function (r) { setTxt(r.v, 'Fine'); });
        ttlEl.textContent = 'Chair Rearranger Pro' + mkTxt(); clipH.textContent = "Inspector's clipboard" + mkTxt(); api.setTitle('Chair Rearranger Pro' + mkTxt());
        fadeEl.classList.remove(C('on')); updateSpecials();
        later(0.2, function () { mg('end.reset', null, 'proud'); }); later(1, function () { const c1 = S.byId.c1; bubble(c1, ln('end.clive')); });
        later(2.2, function () { mg('end.mk', { mk: mkTxt().trim() }, 'smug'); }); later(6, function () { mg('end.noach', null, 'smug', 0); });
      }

      /* ---------- window, beam, actors ---------- */
      function updateWindow(gdt) {
        const cy = S.cy; if (!cy.winGo || cy.winDone) return;
        const k = S.reduced ? 1 : clamp01((S.T - cy.winStart) / 20), e = k * k * (3 - 2 * k); setWin(1.75 * (S.reduced ? 1 : e));
        if (k >= 1) { cy.winDone = true; mg('winmove.settle', null, 'smug', 0); }
      }
      function updateActors(dt, gdt) {
        const cy = S.cy;
        if (cy.half) {
          cy.halfT += gdt; if (cy.halfT >= 285 + 45 * cy.halfN) {
            cy.halfN++; const w = S.win, dx = w.x - cy.halfX, dy = (w.y - cy.halfY) * 0.75, m = Math.hypot(dx, dy) || 1;
            cy.halfX += dx / m * 0.0075; cy.halfY += dy / m * 0.0075 / 0.75;
            if (!cy.halfSaid) { cy.halfSaid = true; mg('half.slide', null, 'smug', 0); }
          }
          halfEl.style.left = (cy.halfX * 100).toFixed(2) + '%'; halfEl.style.top = (cy.halfY * 100).toFixed(2) + '%';
          halfEl.style.setProperty('--sc', Math.min(1.1, 0.5 * Math.pow(1.075, S.cycle - 1)).toFixed(3));
        }
        if (cy.colin) {
          const w = S.win, n = WN[w.wall], x = w.x + n[0] * 0.035, y = w.y + n[1] * 0.035 / 0.75;
          colinEl.style.left = (x * 100).toFixed(2) + '%'; colinEl.style.top = (y * 100).toFixed(2) + '%';
          colinBrow.style.left = (x * 100 + 3.5).toFixed(2) + '%'; colinBrow.style.top = (y * 100 - 3).toFixed(2) + '%'; show(colinBrow, S.tR % 9 < 0.8 && S.tR > 2);
          colinTag.style.left = (x * 100 - 2.2).toFixed(2) + '%'; colinTag.style.top = (y * 100 + 2.5).toFixed(2) + '%'; colinTag.style.fontSize = 'calc(var(--u)*2.6)';
        }
        if (cy.picket) { const c = S.byId.c5; picketEl.style.left = (c.x * 100).toFixed(2) + '%'; picketEl.style.top = (c.y * 100).toFixed(2) + '%'; }
        if (cy.tower) { show(flagEl, true); flagEl.style.left = (cy.tower.x * 100).toFixed(2) + '%'; flagEl.style.top = (cy.tower.y * 100).toFixed(2) + '%'; } else show(flagEl, false);
        const sk = cy.sock;
        if (sk) {
          sk.t += gdt; show(sockEl, true);
          if (sk.t > 4 && !sk.said) { sk.said = true; mg('sock.go', null, 'confused', 0); }
          if (sk.t > 4 && stepTo(sk, S.win.x, S.win.y, 0.025 * 1, gdt)) { cy.sock = null; show(sockEl, false); }
          sockEl.style.left = (sk.x * 100).toFixed(2) + '%'; sockEl.style.top = (sk.y * 100).toFixed(2) + '%';
        }
        const co = S.byId.c5;
        if (cy.det) {
          cy.detT += dt; if (cy.detT > 3 && S.drag && S.drag.mode === 'coaster') { S.drag = null; coasterBack(); } else if (cy.detT > 3) coasterBack();
        }
        const cp = cy.det && cy.coasterPos ? cy.coasterPos : { x: co.x - 0.035, y: co.y + 0.045 };
        coasterEl.style.left = (cp.x * 100).toFixed(2) + '%'; coasterEl.style.top = (cp.y * 100).toFixed(2) + '%';
        co.el.classList.toggle(C('tw'), cy.det || !!cy.tower);
        S.chairs.forEach(function (c) { if (c.id !== 'c5') c.el.classList.toggle(C('tw'), !!cy.tower && inRoom(c)); });
        const I = S.I;
        if (I.on) {
          if (I.sit) { const pp = S.byId.c3; I.x = pp.x; I.y = pp.y - 0.02; }
          inspEl.style.left = (I.x * 100).toFixed(2) + '%'; inspEl.style.top = (I.y * 100).toFixed(2) + '%';
          const rt = I.sit ? 12 : Math.round(Math.sin(I.bob) * 7); if (inspEl._r !== rt) { inspEl._r = rt; inspEl.style.rotate = rt + 'deg'; }
        }
        if (S.stampUntil && S.tR > S.stampUntil) { S.stampUntil = 0; show(stampEl, false); }
        if (S.signUntil && S.tR > S.signUntil) { S.signUntil = 0; show(signEl, false); }
        if (S.capUntil && S.tR > S.capUntil) { S.capUntil = 0; show(capEl, false); }
        if (S.cardUntil && S.tR > S.cardUntil) { S.cardUntil = 0; show(cardEl, false); }
        if (S.cakeUntil && S.tR > S.cakeUntil) { S.cakeUntil = 0; show(cakeEl, false); }
        if (S.stuck > 0) { S.stuck -= dt; if (S.stuck <= 0) { S.stuck = 0; ibtn.setAttribute('aria-disabled', 'false'); ibtn.classList.remove(C('off')); mg('spam.stampfree', null, 'proud', 0); } }
        if (cy.defBusy > 0) cy.defBusy -= dt;
        const gold = cy.goldUntil > S.tR; if (beamEl._g !== gold) { beamEl._g = gold; beamEl.classList.toggle(C('gold'), gold); }
      }
      function updateBubbles() {
        for (let i = S.bubs.length - 1; i >= 0; i--) {
          const b = S.bubs[i];
          if (S.tR >= b.exp) { if (b.e.parentNode) b.e.parentNode.removeChild(b.e); S.bubs.splice(i, 1); continue; }
          if (S.tR >= b.exp - 0.4) b.e.classList.add(C('fade'));
          placeBub(b);
        }
      }
      function updateConsult(dt) {
        const D = S.drag; if (!D) return;
        if (D.mode === 'consult') {
          D.ct += dt; showRing(D.c, D.ct / 1.5);
          if (D.ct >= 1.5) { D.mode = 'drag'; D.c.consentUntil = S.tR + 6; showRing(null); lift(D.c); bubble(D.c, ln('consult.consent')); sfx('ding'); }
        } else if (D.mode === 'drag' && !D.dragging && !D.asked && S.tR - D.t0 >= 1.5 && D.moved < 6 && !S.cy.union) { D.asked = true; bubble(D.c, cline(D.c, 'ask')); }
        if (S.tR - D.lastEv > 25 && D.mode !== 'coaster') releaseDrag(true);
      }

      /* ---------- render ---------- */
      function cls(c, n, on) { on = !!on; const k = 'c_' + n; if (c.f[k] !== on) { c.f[k] = on; c.el.classList.toggle(C(n), on); } }
      function renderChair(c) {
        const e = c.el, f = c.f;
        if (f.vis !== c.present) { f.vis = c.present; e.hidden = !c.present; }
        if (!c.present) return;
        const l = (c.x * 100).toFixed(2) + '%', t = (c.y * 100).toFixed(2) + '%';
        if (f.l !== l) { f.l = l; e.style.left = l; }
        if (f.t !== t) { f.t = t; e.style.top = t; e.style.zIndex = String(20 + Math.round(c.y * 100)); }
        const a = Math.round(c.a * 10) / 10; if (f.a !== a) { f.a = a; c.bodyEl.style.transform = 'rotate(' + a + 'deg)'; }
        const sc = c.held ? 1.08 : 1; if (f.sc !== sc) { f.sc = sc; e.style.setProperty('--sc', String(sc)); }
        const face = c.out ? '' : faceOf(c); if (f.face !== face) { f.face = face; c.faceEl.textContent = face; }
        cls(c, 'held', c.held); cls(c, 'out', c.out); cls(c, 'sel', S.sel === c); cls(c, 'dz', c.dizzy); cls(c, 'wn', c.warn); cls(c, 'tan', c.tan);
        const ch = c.chip; if (ch) {
          const w = Math.round(c.s * 100); if (ch.w !== w) { ch.w = w; ch.bar.style.width = w + '%'; }
          if (ch.fs !== face) { ch.fs = face; ch.face.textContent = face || '🕶️'; }
          const nm = c.out ? c.name + ' (outside)' : c.name; if (ch.nm.textContent !== nm) ch.nm.textContent = nm;
        }
      }
      function render() {
        S.chairs.forEach(renderChair);
        const kc = S.drag || S.kb ? null : (S.hov || S.sel);
        if (kc && inRoom(kc) && (S.phase === 'play' || S.phase === 'meeting' || S.phase === 'closing')) { show(knobEl, true); knobEl.style.left = clamp(kc.x * 100 + 8, 6, 94).toFixed(1) + '%'; knobEl.style.top = clamp(kc.y * 100 - 8, 8, 94).toFixed(1) + '%'; show(patKnob, true); patKnob.style.left = clamp(kc.x * 100 - 8, 6, 94).toFixed(1) + '%'; patKnob.style.top = clamp(kc.y * 100 - 8, 8, 94).toFixed(1) + '%'; } else { show(knobEl, false); show(patKnob, false); }
        if (S.hov && S.hovOff && S.tR > S.hovOff) { S.hov = null; S.hovOff = 0; }
      }

      /* ---------- main loop ---------- */
      function tick(dt) {
        S.tR += dt; const gdt = dt * SC;
        S.leak = Math.max(0, S.leak - dt * 0.1); if (S.quiet > 0) S.quiet -= dt;
        for (let i = S.sched.length - 1; i >= 0; i--) { const s = S.sched[i]; if (S.tR >= s.at) { S.sched.splice(i, 1); if (s.ep === S.cycle) { try { s.fn(); } catch (err) { S.errs++; if (api.selftest) throw err; } } } }
        S.layAcc += dt; if (S.layAcc > 0.5) { S.layAcc = 0; layout(); S.reduced = rm(); }
        updateIdle(dt); advanceClock(gdt); updateWindow(gdt);
        S.beamPh += dt * 2 * Math.PI / (S.T >= 150 && !api.selftest ? 30 : 90); S.beamAcc += dt;
        if (S.beamAcc >= 0.1 || !S.quad) { S.beamAcc = 0; beamStep(); }
        updateChairs(dt, gdt); updateConsult(dt); updateVisit(dt); updateCer(dt); updateTug(dt); updateGerald(gdt, dt); updateStapler(dt);
        if (!S.cer) { let sa = 0, sn = 0; S.chairs.forEach(function (c) { if (inRoom(c)) { sa += c.s; sn++; } }); setNeedle(Math.round((Math.sin(S.tR * 0.9) * 4 + ((sn ? sa / sn : 0.5) - 0.5) * 40) * 2) / 2); }
        if (S.phase === 'closing' || S.phase === 'fading' || S.phase === 'resetting' || S.cy.hold > 0) updateClosing(dt);
        updateActors(dt, gdt); updateBubbles();
        S.secAcc += dt; if (S.secAcc >= 1) { S.secAcc = 0; updateSpecials(); }
        render();
      }
      function frame() {
        const now = api.now(); let dt = (now - S.last) / 1000; S.last = now; if (!(dt > 0)) dt = 0.016; dt = Math.min(dt, 0.1);
        api.requestAnimationFrame(frame);
        tickSafe(dt);
      }
      const tickSafe = sf(function (dt) { tick(dt); });

      /* ---------- events ---------- */
      api.on(document, 'pointermove', sf(onMove));
      api.on(document, 'pointerup', sf(onUp));
      api.on(document, 'pointercancel', sf(function () { releaseDrag(true); }));
      api.on(document, 'pointerdown', sf(function () { activity(); }));
      api.on(document, 'keydown', sf(onKey));
      api.on(window, 'blur', sf(function () { releaseDrag(true); if (S.kb) kbPlace(); }));
      api.on(document, 'visibilitychange', sf(function () { if (document.hidden) { releaseDrag(true); if (S.kb) kbPlace(); } }));
      api.on(window, 'resize', sf(layout));
      api.on(room, 'wheel', sf(onWheel), { passive: false });
      api.on(room, 'dblclick', sf(function (e) { const c = chairOf(e.target); if (c) rotate(c, 45, 'dbl'); }));
      api.on(room, 'contextmenu', sf(function (e) { const c = chairOf(e.target); if (c) { e.preventDefault(); pat(c); } }));
      api.on(room, 'animationend', function (e) {
        for (let n = e.target; n && n !== card; n = n.parentNode) { if (n.classList) { const rm = []; n.classList.forEach(function (k) { if (k.indexOf(C('k-')) === 0) rm.push(k); }); rm.forEach(function (k) { n.classList.remove(k); }); } }
      });
      let mq = null;
      try { mq = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { mq = null; }
      function rm() { let r = false; try { r = !!(mq && mq.matches) || !!(root.closest && root.closest('.pm-reduce-motion')); } catch (e) { r = false; } return r; }
      S.reduced = rm();
      if (mq) api.on(mq, 'change', function () { S.reduced = rm(); });

      /* ---------- go ---------- */
      sandraEl.textContent = '🚩 ' + ln('sandra.p0.note'); note('Note: (none yet. Inspector is on his way.)');
      setWin(0); layout(); beamStep(); updateSpecials(); render();
      api.requestAnimationFrame(frame);

      return { destroy: function () { try { api.save.set('n', S.savedN + S.n); } catch (e) { /* ignore */ } } };
    }
  });
})();
