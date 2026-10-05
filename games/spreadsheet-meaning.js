/* POINTLESS module: spreadsheet-meaning */
/*
 * SPREADSHEET OF MEANING. A real, tiny, working spreadsheet in which every result is a feeling.
 * Layout: title strip, ribbon, formula bar, chip row, chart tile, grid stage (grid / Feelings / Pivot / Dennis), quiet footer, tabs, status bar.
 * All timers/listeners go through api.*; the grid is built once and patched by render(); nothing is created at load time.
 */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-spreadsheet-meaning-wb{--sm-paper:#FFF6E0;--sm-ink:#2B2A33;--sm-line:#E3D5B8;--sm-lilac:#CDB8F0;--sm-mustard-l:#F6D98A;--sm-mint:#BFEBD7;--sm-mustard:#F2B53C;--sm-coral:#FF7A66;--sm-sage:#BFD8B8;--sm-t-lilac:#D9CBF5;--sm-t-must:#F8DE8C;--sm-t-beige:#E8D7B5;--sm-grey:#CFC8BA;--sm-w:92px;--sm-gl:#E3D5B8;--sm-half:1px;position:relative;display:flex;flex-direction:column;min-height:420px;color:var(--sm-ink);background:var(--sm-paper);background-image:radial-gradient(#EADFC4 1px,transparent 1.3px);background-size:14px 14px;border:3px solid var(--sm-ink);border-radius:14px;box-shadow:4px 4px 0 var(--sm-ink);font:14px/1.3 ui-rounded,'Trebuchet MS','Segoe UI',system-ui,sans-serif;overflow:hidden;animation:m-spreadsheet-meaning-in .5s ease-out;transform-origin:50% 0}.m-spreadsheet-meaning-wb *{box-sizing:border-box}.m-spreadsheet-meaning-wb [hidden]{display:none!important}.m-spreadsheet-meaning-wb button{font:inherit;font-weight:800;color:var(--sm-ink);background:#fff;border:2px solid var(--sm-ink);border-radius:9px;padding:3px 10px;box-shadow:2px 2px 0 var(--sm-ink);cursor:pointer;min-height:30px}
.m-spreadsheet-meaning-wb button:hover{background:#FFF1C9}.m-spreadsheet-meaning-wb button:active{transform:translate(2px,2px);box-shadow:0 0 0 var(--sm-ink)}.m-spreadsheet-meaning-wb button[aria-disabled=true]{opacity:.55}.m-spreadsheet-meaning-wb button:focus-visible,.m-spreadsheet-meaning-wb input:focus-visible,.m-spreadsheet-meaning-c:focus-visible{outline:3px solid var(--sm-lilac);outline-offset:2px}
.m-spreadsheet-meaning-wb input{font:inherit;color:var(--sm-ink);background:#fff;border:2px solid var(--sm-ink);border-radius:7px;padding:3px 6px;min-width:0}.m-spreadsheet-meaning-ts{display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--sm-lilac);border-bottom:3px solid var(--sm-ink);font-weight:800}.m-spreadsheet-meaning-dots i{display:inline-block;width:11px;height:11px;margin-right:4px;border-radius:50%;border:2px solid var(--sm-ink);background:var(--sm-coral)}.m-spreadsheet-meaning-dots i:nth-child(2){background:var(--sm-mustard)}.m-spreadsheet-meaning-dots i:nth-child(3){background:var(--sm-sage)}
.m-spreadsheet-meaning-fname{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.m-spreadsheet-meaning-auto{font-size:12px;white-space:nowrap;display:flex;align-items:center;gap:5px}.m-spreadsheet-meaning-spin{width:11px;height:11px;border:2px solid var(--sm-ink);border-top-color:transparent;border-radius:50%;animation:m-spreadsheet-meaning-rot 1s linear infinite;display:inline-block}.m-spreadsheet-meaning-rb{display:flex;flex-wrap:wrap;gap:6px;padding:6px 8px;background:#EFE6FF;border-bottom:2px solid var(--sm-ink)}
.m-spreadsheet-meaning-fb{display:flex;align-items:center;gap:6px;padding:6px 8px;background:var(--sm-mint);border-bottom:2px solid var(--sm-ink);position:relative;flex-wrap:wrap}.m-spreadsheet-meaning-nm{width:78px;font-family:ui-monospace,Consolas,monospace;font-weight:700}.m-spreadsheet-meaning-fi{flex:1 1 160px;font-family:ui-monospace,Consolas,monospace}.m-spreadsheet-meaning-fxl{font-weight:900;font-style:italic}
.m-spreadsheet-meaning-fxbtn{display:none}.m-spreadsheet-meaning-chips{display:flex;gap:6px;overflow-x:auto;padding:5px 8px;background:#DDF3E8;border-bottom:2px solid var(--sm-ink);flex:none}.m-spreadsheet-meaning-chips button{font-family:ui-monospace,Consolas,monospace;font-size:12px;white-space:nowrap;flex:none;min-height:26px;padding:1px 8px}.m-spreadsheet-meaning-ac{position:absolute;z-index:40;background:#fff;border:2px solid var(--sm-ink);border-radius:8px;box-shadow:3px 3px 0 var(--sm-ink);min-width:150px;overflow:hidden}
.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-ac button{display:block;width:100%;text-align:left;border:0;border-radius:0;box-shadow:none;font-family:ui-monospace,Consolas,monospace;font-weight:600;min-height:26px}.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-ac button.m-spreadsheet-meaning-hl{background:var(--sm-mustard-l)}.m-spreadsheet-meaning-ct{padding:6px 8px;background:#FFFBEF;border-bottom:2px solid var(--sm-ink)}.m-spreadsheet-meaning-ct svg{width:100%;max-width:640px;margin:0 auto;height:auto;max-height:260px;display:block;background:#fff;border:2px solid var(--sm-ink);border-radius:8px}
.m-spreadsheet-meaning-ctr{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin-bottom:5px}.m-spreadsheet-meaning-ctr input{flex:1 1 120px}.m-spreadsheet-meaning-ctr button{min-height:26px;padding:1px 8px;font-size:12px}.m-spreadsheet-meaning-lg{font-size:12px;margin-top:4px;display:flex;gap:12px;flex-wrap:wrap}
.m-spreadsheet-meaning-stage{position:relative;flex:1;min-height:250px;display:flex;flex-direction:column}.m-spreadsheet-meaning-gw{flex:1;overflow:auto;position:relative;max-height:min(66vh,480px);min-height:250px;touch-action:pan-x pan-y;background:var(--sm-paper)}.m-spreadsheet-meaning-g{display:grid;position:relative;width:100%;min-width:calc(40px + var(--sm-w) * 8);font:13px ui-monospace,Consolas,monospace;font-variant-numeric:tabular-nums}.m-spreadsheet-meaning-row{display:contents}
.m-spreadsheet-meaning-c,.m-spreadsheet-meaning-ch,.m-spreadsheet-meaning-rh{display:block;position:relative;border-right:1px solid var(--sm-gl);border-bottom:1px solid var(--sm-gl);padding:0 5px;line-height:29px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;background:var(--sm-paper);transition:border-color .6s}.m-spreadsheet-meaning-c{cursor:pointer;user-select:none;-webkit-user-select:none}.m-spreadsheet-meaning-ch,.m-spreadsheet-meaning-rh,.m-spreadsheet-meaning-cn{position:sticky;z-index:5;font-weight:800;text-align:center;font-family:ui-rounded,'Trebuchet MS',system-ui,sans-serif}.m-spreadsheet-meaning-ch{top:0;background:var(--sm-lilac);line-height:27px}
.m-spreadsheet-meaning-rh{left:0;background:var(--sm-mustard-l);padding:0}.m-spreadsheet-meaning-cn{top:0;left:0;z-index:7;background:var(--sm-lilac);border-right:1px solid var(--sm-gl);border-bottom:1px solid var(--sm-gl)}.m-spreadsheet-meaning-hf{line-height:14px;font-size:10px}.m-spreadsheet-meaning-hf.m-spreadsheet-meaning-rh{transform:rotate(-4deg);font-family:'Segoe Print','Bradley Hand','Comic Sans MS',cursive;font-size:11px}
.m-spreadsheet-meaning-hf.m-spreadsheet-meaning-c{font-size:10px;border-top:var(--sm-half) solid var(--sm-halfc,#F2B53C);background-image:linear-gradient(100deg,transparent 40%,rgba(246,217,138,.55) 50%,transparent 60%)}.m-spreadsheet-meaning-tr{line-height:33px;background:var(--sm-sage);border-top:3px solid var(--sm-ink)}.m-spreadsheet-meaning-hd{color:#5a3f93;font-weight:700;background:#F4EDFF}.m-spreadsheet-meaning-nu{text-align:right}
.m-spreadsheet-meaning-rng{background:#FBE7B0}.m-spreadsheet-meaning-sel{outline:3px solid var(--sm-mustard);outline-offset:-2px;box-shadow:3px 3px 0 var(--sm-ink);z-index:3;background:#FFFDF5;overflow:visible}.m-spreadsheet-meaning-er{color:#A52B1A;text-decoration:underline wavy var(--sm-coral);font-weight:700}.m-spreadsheet-meaning-ok .m-spreadsheet-meaning-er{color:#18683A;background:#DCF3E2;text-decoration:none}
.m-spreadsheet-meaning-ft1{color:#5a3f93;font-style:italic}.m-spreadsheet-meaning-cy{animation:m-spreadsheet-meaning-lean .9s ease-in-out infinite alternate;color:#B0306A;font-style:italic}.m-spreadsheet-meaning-gold{background:linear-gradient(135deg,#FFD76A,#FFF1B0);font-weight:800}.m-spreadsheet-meaning-fl{animation:m-spreadsheet-meaning-flick .3s ease-out}
.m-spreadsheet-meaning-cm::after{content:'';position:absolute;top:0;right:0;border-style:solid;border-width:0 10px 10px 0;border-color:transparent #D63B2F transparent transparent}.m-spreadsheet-meaning-ge::before{content:'\\1F954';position:absolute;right:1px;top:-1px;font-size:11px}.m-spreadsheet-meaning-gd::before{content:'';position:absolute;right:4px;bottom:4px;width:9px;height:9px;border-radius:50%;background:#8a5a2b;animation:m-spreadsheet-meaning-wig 1.4s ease-in-out infinite}.m-spreadsheet-meaning-ac1{text-decoration:underline wavy #D63B2F}
.m-spreadsheet-meaning-br{color:#6a6575;font-style:italic}.m-spreadsheet-meaning-tl{background:var(--sm-t-lilac)}.m-spreadsheet-meaning-tm{background:var(--sm-t-must)}.m-spreadsheet-meaning-gy{background:var(--sm-grey)}.m-spreadsheet-meaning-beige .m-spreadsheet-meaning-c{background:var(--sm-t-beige)}.m-spreadsheet-meaning-fp{background:#EFE0FF;color:#6b4ea8;font-style:italic}
.m-spreadsheet-meaning-bang::before{content:'!';position:absolute;left:2px;top:3px;width:15px;height:15px;line-height:13px;text-align:center;border-radius:50%;background:var(--sm-coral);color:#fff;font:900 11px system-ui}.m-spreadsheet-meaning-glow{box-shadow:inset 0 0 0 3px var(--sm-mustard);animation:m-spreadsheet-meaning-wig 1.2s ease-in-out infinite}.m-spreadsheet-meaning-dim .m-spreadsheet-meaning-g{--sm-gl:#F0E8D4}.m-spreadsheet-meaning-dim .m-spreadsheet-meaning-gw{filter:brightness(.82) saturate(.6);transition:filter .6s}
.m-spreadsheet-meaning-ab .m-spreadsheet-meaning-g{--sm-gl:transparent}.m-spreadsheet-meaning-heat .m-spreadsheet-meaning-gw{pointer-events:none;filter:sepia(.5) hue-rotate(60deg) saturate(.6) brightness(.9)}.m-spreadsheet-meaning-heat .m-spreadsheet-meaning-c,.m-spreadsheet-meaning-fanon .m-spreadsheet-meaning-c{animation:m-spreadsheet-meaning-sway .5s ease-in-out infinite alternate}.m-spreadsheet-meaning-tb{background:var(--sm-t-beige)}
.m-spreadsheet-meaning-alt{color:#1F5FB5;text-decoration-color:#7FB0F0}.m-spreadsheet-meaning-ed{position:absolute;z-index:8;border:3px solid var(--sm-mustard);border-radius:0;padding:0 4px;font:13px ui-monospace,Consolas,monospace;box-shadow:3px 3px 0 var(--sm-ink)}.m-spreadsheet-meaning-fh{position:absolute;z-index:9;width:10px;height:10px;background:var(--sm-mustard);border:2px solid var(--sm-ink);cursor:crosshair;touch-action:none;animation:m-spreadsheet-meaning-wig 1s ease-in-out 3}.m-spreadsheet-meaning-fh::after{content:'';position:absolute;left:-15px;top:-15px;right:-15px;bottom:-15px}
.m-spreadsheet-meaning-ghost{position:absolute;z-index:10;pointer-events:none;opacity:.55;transition:left .45s ease,top .45s ease;font:800 10px/1 system-ui;letter-spacing:.08em;text-transform:uppercase}.m-spreadsheet-meaning-ghost svg{width:18px;height:22px;display:block}.m-spreadsheet-meaning-trem{animation:m-spreadsheet-meaning-sway .08s linear infinite alternate}.m-spreadsheet-meaning-heart{position:absolute;z-index:9;pointer-events:none;color:#D63B7A;font-weight:900;font-size:15px;animation:m-spreadsheet-meaning-bob 1s ease-in-out infinite alternate;text-shadow:1px 1px 0 #fff}
.m-spreadsheet-meaning-moth,.m-spreadsheet-meaning-tcur{position:absolute;z-index:9;pointer-events:none;opacity:.6;font:700 10px/1 system-ui;color:#5a3f93}.m-spreadsheet-meaning-moth{animation:m-spreadsheet-meaning-loop 3.2s ease-in-out infinite alternate;opacity:.85}.m-spreadsheet-meaning-tcur{opacity:.3}.m-spreadsheet-meaning-bub{position:absolute;z-index:30;max-width:230px;background:#FFFBD8;border:2px solid var(--sm-ink);border-radius:9px;padding:6px 9px;font-size:12px;box-shadow:3px 3px 0 var(--sm-ink);pointer-events:none}
.m-spreadsheet-meaning-ft{position:relative;min-height:38px;padding:7px 10px 9px;background:#EFEAD8;border-top:2px solid var(--sm-ink);font-size:12px;color:#4A4854;display:flex;gap:10px;align-items:center}.m-spreadsheet-meaning-ftl{flex:1;text-align:right}.m-spreadsheet-meaning-pr{position:absolute;left:0;bottom:0;height:3px;width:0;background:var(--sm-ink)}.m-spreadsheet-meaning-tabs{display:flex;gap:3px;padding:6px 8px 0;background:var(--sm-mustard-l);border-top:2px solid var(--sm-ink);overflow-x:auto;flex:none}
.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-tabs button{border-radius:10px 10px 0 0;box-shadow:none;border-bottom:0;background:#FFE9A8;white-space:nowrap;min-height:28px;flex:none}.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-tabs button[aria-selected=true]{background:var(--sm-paper)}.m-spreadsheet-meaning-sb{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center;padding:5px 10px;background:var(--sm-ink);color:#FFF6E0;font-size:12px}.m-spreadsheet-meaning-sb button{min-height:22px;padding:0 7px;font-size:11px;background:var(--sm-paper);box-shadow:none}
.m-spreadsheet-meaning-qb{display:inline-block;width:72px;height:9px;border:1px solid #FFF6E0;border-radius:5px;vertical-align:middle;margin:0 4px;overflow:hidden;background:repeating-linear-gradient(135deg,#4a4854 0 4px,#2B2A33 4px 8px)}.m-spreadsheet-meaning-qb i{display:block;height:100%;width:0;background:var(--sm-mustard);transition:width .6s}.m-spreadsheet-meaning-fan{display:inline-block;width:16px;height:16px;border-radius:50%;border:2px solid #FFF6E0;vertical-align:middle;animation:m-spreadsheet-meaning-rot .4s linear infinite;background:linear-gradient(90deg,transparent 45%,#FFF6E0 45% 55%,transparent 55%)}.m-spreadsheet-meaning-hb{position:absolute;left:12px;right:12px;bottom:12px;z-index:25;background:#fff;border:3px solid var(--sm-ink);border-radius:10px;padding:8px 10px;font-weight:800;box-shadow:4px 4px 0 var(--sm-ink);display:flex;gap:10px;align-items:center}
.m-spreadsheet-meaning-hb b{display:block;flex:1;height:12px;border:2px solid var(--sm-ink);border-radius:6px;overflow:hidden}.m-spreadsheet-meaning-hb b i{display:block;height:100%;width:0;background:#7FB77E}.m-spreadsheet-meaning-hg{width:26px;height:36px;position:relative;border:3px solid var(--sm-ink);border-left-color:transparent;border-right-color:transparent;animation:m-spreadsheet-meaning-rot 1.2s steps(2) infinite;flex:none}.m-spreadsheet-meaning-ov{position:absolute;inset:0;z-index:20;background:var(--sm-paper);display:flex;flex-direction:column;padding:12px;gap:8px;overflow:auto}
.m-spreadsheet-meaning-pvs{perspective:700px;display:flex;justify-content:center;align-items:center;min-height:170px;position:relative}.m-spreadsheet-meaning-pvt{display:grid;gap:3px;padding:10px 10px 10px 22px;background:#fff;border:3px solid var(--sm-ink);border-radius:10px;box-shadow:4px 4px 0 var(--sm-ink);transform-origin:left center;transition:transform .28s ease-in;cursor:pointer;position:relative;font-family:ui-monospace,Consolas,monospace;font-size:13px}.m-spreadsheet-meaning-pvt::before{content:'';position:absolute;left:5px;top:50%;margin-top:-7px;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FFE9A8,#B8860B 70%)}.m-spreadsheet-meaning-swing{transform:rotateY(90deg)}
.m-spreadsheet-meaning-pvt span{padding:3px 8px;background:var(--sm-paper);border:1px solid var(--sm-line);text-align:center;min-width:60px}.m-spreadsheet-meaning-pvt span.m-spreadsheet-meaning-ph{background:var(--sm-lilac);font-weight:800}.m-spreadsheet-meaning-cfan{position:relative;width:150px;height:150px}.m-spreadsheet-meaning-cfan i{position:absolute;left:50%;top:50%;width:64px;height:20px;margin:-10px 0 0 0;background:#B58A4A;border:2px solid var(--sm-ink);border-radius:10px;transform-origin:0 50%}
.m-spreadsheet-meaning-wells{display:flex;flex-wrap:wrap;gap:8px}.m-spreadsheet-meaning-well{flex:1 1 140px;min-height:48px;border:2px dashed var(--sm-ink);border-radius:9px;padding:5px;display:flex;gap:5px;flex-wrap:wrap;align-items:flex-start;background:#FFFBEF}.m-spreadsheet-meaning-wells em{font-size:11px;width:100%;font-style:normal;font-weight:800;text-transform:uppercase}.m-spreadsheet-meaning-fv{display:flex;flex-wrap:wrap;gap:6px}
.m-spreadsheet-meaning-dlg{position:absolute;inset:0;z-index:60;background:rgba(43,42,51,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:12px;overflow:auto}.m-spreadsheet-meaning-card{background:var(--sm-paper);border:3px solid var(--sm-ink);border-radius:12px;box-shadow:5px 5px 0 var(--sm-ink);padding:14px 16px;max-width:460px;width:100%}.m-spreadsheet-meaning-card h3{margin:0 0 10px;font-size:15px}.m-spreadsheet-meaning-bts{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}
.m-spreadsheet-meaning-audit{animation:m-spreadsheet-meaning-slide .5s ease-out}.m-spreadsheet-meaning-sign{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-size:12px;border-top:2px dashed var(--sm-ink);padding-top:8px}.m-spreadsheet-meaning-blank{position:absolute;inset:0;z-index:80;background:var(--sm-paper);display:flex;align-items:center;justify-content:center;font-size:9px;color:#4A4854}.m-spreadsheet-meaning-fold{transform:scaleY(.02);transition:transform .5s ease-in}
.m-spreadsheet-meaning-sp{position:absolute;z-index:35;right:10px;top:34px;background:#fff;border:3px solid var(--sm-ink);border-radius:10px;padding:8px 12px;max-width:300px;font-size:12px;box-shadow:4px 4px 0 var(--sm-ink)}.m-spreadsheet-meaning-sp ul{margin:4px 0 0;padding-left:16px}.m-spreadsheet-meaning-pop{animation:m-spreadsheet-meaning-bounce .6s ease-out}.m-spreadsheet-meaning-pulse{animation:m-spreadsheet-meaning-pls 1s ease-in-out 4}
.m-spreadsheet-meaning-dtick{position:absolute;right:20px;bottom:20px;font-weight:900;color:#3d7a3d;animation:m-spreadsheet-meaning-up 2s ease-out forwards}.m-spreadsheet-meaning-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.m-spreadsheet-meaning-ptr:hover{cursor:pointer}.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-sb button.m-spreadsheet-meaning-pulse{background:var(--sm-mustard-l);font-weight:800}.m-spreadsheet-meaning-narrow .m-spreadsheet-meaning-fxbtn{display:inline-block}
.m-spreadsheet-meaning-narrow .m-spreadsheet-meaning-chips{display:none}.m-spreadsheet-meaning-narrow .m-spreadsheet-meaning-chips.m-spreadsheet-meaning-open{display:flex}.m-spreadsheet-meaning-narrow .m-spreadsheet-meaning-rb{flex-wrap:nowrap;overflow-x:auto}.m-spreadsheet-meaning-narrow .m-spreadsheet-meaning-rb button{flex:none}.m-spreadsheet-meaning-qc{position:absolute;z-index:22;left:8%;right:8%;top:34%;padding:14px 16px;background:var(--sm-paper);border:3px solid var(--sm-ink);border-radius:12px;box-shadow:5px 5px 0 var(--sm-ink);font-size:15px;font-style:italic;text-align:center;pointer-events:none}.m-spreadsheet-meaning-cdb{display:block;height:10px;border:2px solid var(--sm-ink);border-radius:6px;overflow:hidden;margin:0 0 10px;background:#fff}.m-spreadsheet-meaning-cdb i{display:block;height:100%;width:100%;background:var(--sm-mustard);transition:width 7.5s linear}@media (pointer:coarse){.m-spreadsheet-meaning-wb button{min-height:40px}.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-chips button,.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-tabs button,.m-spreadsheet-meaning-wb .m-spreadsheet-meaning-ac button{min-height:40px}.m-spreadsheet-meaning-fxbtn{display:inline-block}}
@keyframes m-spreadsheet-meaning-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes m-spreadsheet-meaning-rot{to{transform:rotate(360deg)}}@keyframes m-spreadsheet-meaning-lean{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}@keyframes m-spreadsheet-meaning-flick{0%{transform:rotateX(70deg) scale(.9);opacity:.2}60%{transform:rotateX(-12deg)}100%{transform:none;opacity:1}}
@keyframes m-spreadsheet-meaning-sway{from{transform:translateX(-2px)}to{transform:translateX(2px)}}@keyframes m-spreadsheet-meaning-wig{0%,100%{transform:translate(0,0)}50%{transform:translate(2px,2px)}}@keyframes m-spreadsheet-meaning-bob{from{transform:translateY(-3px)}to{transform:translateY(3px)}}@keyframes m-spreadsheet-meaning-loop{0%{transform:translate(0,0)}33%{transform:translate(70px,34px)}66%{transform:translate(20px,70px)}100%{transform:translate(100px,10px)}}
@keyframes m-spreadsheet-meaning-slide{from{transform:translateY(40px) rotate(2deg);opacity:0}to{transform:none;opacity:1}}@keyframes m-spreadsheet-meaning-bounce{0%{transform:translateY(-14px) scale(.8)}50%{transform:translateY(0) scale(1.08)}75%{transform:translateY(-4px)}100%{transform:none}}@keyframes m-spreadsheet-meaning-pls{50%{transform:scale(1.1);background:var(--sm-mustard-l)}}@keyframes m-spreadsheet-meaning-up{from{transform:translateY(0);opacity:1}to{transform:translateY(-46px);opacity:0}}
.pm-reduce-motion .m-spreadsheet-meaning-wb *,.pm-reduce-motion .m-spreadsheet-meaning-wb{animation:none!important;transition:none!important}@media (prefers-reduced-motion:reduce){.m-spreadsheet-meaning-wb *,.m-spreadsheet-meaning-wb{animation:none!important;transition:none!important}}
`, 'css-spreadsheet-meaning');

  P.addAchievements([
    { id: 'spreadsheet-meaning.first', name: 'Grand Magnus Opus of Cell A1', desc: 'Enter your first value into any cell. The cell has been waiting for this since the Bronze Age.', icon: '📊', reward: 1 },
    { id: 'spreadsheet-meaning.feelings', name: 'Fellow of the Royal Society of Formulas That Return Feelings', desc: 'Commit 10 formulas that return a feeling. The Society has no members. You are the first. It has a chair.', icon: '🪑', reward: 2 },
    { id: 'spreadsheet-meaning.chart', name: 'Master Architect of the Chart of Nothing Against Nothing', desc: 'Insert a chart and drag a range of cells onto it. Watch it decline. A moment of solidarity.', icon: '📉', reward: 2 },
    { id: 'spreadsheet-meaning.pivot', name: 'Pivotal Figure in the History of Pivoting', desc: 'Pivot the table 20 times. The table has requested a statue. It has been denied. It has been offered a very nice plaque.', icon: '🌀', reward: 3 },
    { id: 'spreadsheet-meaning.close', name: 'Chief Closer of Q3, Pending', desc: 'Close the quarter. The quarter has been opened again so you can close it better.', icon: '📕', reward: 5 },
    { id: 'spreadsheet-meaning.quiet', name: 'Keeper of the Quiet Total', desc: 'Hold perfectly still through all 12 quiet totals in the Totals row. Nobody moved. The numbers noticed.', icon: '🤫', secret: true, reward: 15 },
    { id: 'spreadsheet-meaning.absence', name: 'Autosave of Absence, First Class', desc: 'Leave the spreadsheet alone for 180 seconds and let it save your absence. It saved it twice.', icon: '⏳', secret: true, reward: 7.5 },
    { id: 'spreadsheet-meaning.cartographer', name: 'Cartographer of the Half-Row', desc: 'Type =MEANING() and follow it to Sheet 7 1/2. It is empty. It is very well organised.', icon: '🗺', secret: true, reward: 10 },
    { id: 'spreadsheet-meaning.hands', name: 'Supreme Knight of the Circular Reference', desc: 'Cause a circular reference. Management says this is how the company is run.', icon: '🤝', secret: true, reward: 5 },
    { id: 'spreadsheet-meaning.sandra', name: 'Subject of a Compliance Review, Pending', desc: 'Type \'sandra\' into a cell. The cell asked for a lawyer. The lawyer is also a cell.', icon: '🔒', secret: true, reward: 5 },
    { id: 'spreadsheet-meaning.minute', name: 'Keeper of the Seventeen-Second Minute', desc: 'Select the Totals cell exactly when the clock\'s seconds read :17. The minute is 17 seconds long. It always has been.', icon: '🕐', secret: true, reward: 50 },
    { id: 'spreadsheet-meaning.resign', name: 'Chair Emeritus of the Resignations Committee (Currently Resigning)', desc: 'Type "I quit" into a cell three times. You are now a Consultant in the same chair at 7 1/2 Meh an hour. The chair has been told to be more formal.', icon: '📝', secret: true, reward: 25 },
    { id: 'spreadsheet-meaning.meeting', name: 'Executive Attendee of Meetings That Could Have Been Nothing', desc: 'Accept a calendar invite from the status bar. It was nothing. It had refreshments, in spirit, and a very small agenda.', icon: '📅', reward: 2 },
    { id: 'spreadsheet-meaning.halfhalf', name: 'Sovereign Archduke of the Fractional Realm, Second Class (Half)', desc: 'Type 7 1/2 into row 7 1/2. The row has waited to be exactly itself since 1998. It is now half of a half, and would like to be addressed as a third.', icon: '🥧', secret: true, reward: 40 }
  ]);

  P.addLines('m:spreadsheet-meaning:num', [ "That number has been entered. It will be returned to you looking exactly like itself, with a witness.", "Finance asked for a number. This is a number. Finance has not been told it is this one.", "{item} now holds a number. It has been introduced to the other numbers and is standing near the 4s.", "Number accepted. It will be returned to you in a different tone of voice.", "That is a number in a cell. Per policy, both are now responsible for each other.", "You picked a number. Management had already picked 7 1/2 for you. The two have met and are being civil.","Noted. The number has been put somewhere safe. The somewhere is {item}.", "Entry {count} this quarter. The previous entries have been kept together, for warmth.", "A figure has been entered in {item}. Accounting was told. Accounting said 'ah' in a way that cost four minutes.", "The number was verified by the other numbers. It passed 7 to 0, with one abstention, which was a 1/2.", "{item} is now a number. It was a cell before. Nobody saw the transition. The transition would like credit.", "Accepted. The number has been rounded up to itself, which is the most any number can ask."]); P.addLines('m:spreadsheet-meaning:txt', [ "Text accepted. The cell has been given a word and a chair, in that order.","That is a word. It has been placed in a cell and told to wait.", "A label. Labels are how the spreadsheet knows you were here.", "The word is now load-bearing. Please do not add a second word until the first has been inspected.","You wrote it down. Writing it down is half of doing it. The other half is Tuesday.", "Entered. Management has read it twice and understood it once.", "The cell says it will treat that word with respect and a small amount of suspicion.", "{item} has been given a word. It will hold it until someone asks for it back. No one ever does.", "Spell-check passed it. Spell-check passes everything now. Spell-check has had a year.", "Management has rated that word 7 1/2 out of 7 1/2. The scale is closed to criticism.", "The word has been filed under W, for Word, and also under T, for Tuesday, in case.", "{item} has been updated with language. It got as far as the first letter. The first letter was encouraging."]); P.addLines('m:spreadsheet-meaning:fx', [ "Formula accepted. It took 0.003 seconds and a small amount of courage.", "I have reviewed your formula. It is a formula. I have no further notes, and I have several.", "Your formula has been accepted by a committee of one. The committee is the cell.", "That formula was calculated with total sincerity and slightly less accuracy.", "Your formula was cleverer than the spreadsheet. The spreadsheet needs a moment and a slightly larger font.", "Calculated. The answer is in {item}. {item} is not sure it was the question.", "A formula. The spreadsheet has not been trusted this much since the intern left.", "{count} entries in. The sheet has stopped checking your formulas and started admiring them, quietly, from across the room.", "The formula ran the way a person runs for a bus they have already missed: with dignity, and a small wave.", "Evaluated by a calculator that is not a calculator. It is a cell wearing a calculator's hat.", "The parentheses balanced. Management would like it noted that this is more than it managed all year.", "A formula has been committed to {item}. It can be undone. Management would prefer that it be understood."]); P.addLines('m:spreadsheet-meaning:feel', [ "Finance asked for a number. Finance has been given '{item}'. Finance is taking it well, in another room.", "Logged against Q3: '{item}'. Q3 did not ask for it. Q3 is accepting it anyway.", "'{item}'. The feeling is provisional. All feelings are. This one has a sticker saying so.", "A feeling has been returned: '{item}'. Please do not rely on it before lunch.", "Feeling recorded. It has been filed beside the previous feeling, which was told it was only a draft.","The sheet says '{item}'. Nobody asked how it felt. It volunteered, which is the worse kind.", "'{item}' has been accepted as a unit of measure. The Bureau of Weights asked for a word and was given '{item}'.", "Seven of seven departments have now been told you feel '{item}'. Three of them are the same department.", "You are '{item}'. That is the third most common feeling on this floor, after 'mildly' and the one that goes on the stairs."]);
  P.addLines('m:spreadsheet-meaning:sumv', [ "=SUM returned a verdict instead of a number. The auditors will want that as a number. The auditors are in a meeting about numbers.", "Sum calculated. The cell would not say what it was. It said a word instead, which is the first word it has said all quarter.", "The true sum is in the tooltip. The cell has asked you not to look. Look anyway.", "The sum was not shared. It was described as 'a number of some size'. Finance accepted this in writing, then in crayon.", "Addition performed. The addends were consulted afterward and said they had been fine with it.", "=SUM has decided what the total feels like. The total was not consulted. The total is a number and is used to it."]); P.addLines('m:spreadsheet-meaning:del', [ "Deleted. The cell kept its dignity and a small amount of context.", "Cleared. The cell is now a blank that is trying its best.", "Deleted. The cell wants you to know it was fine with it. It was not fine with it.", "{item} is empty now. It has described the feeling as 'airy'.", "That cell has been emptied. Sandra has been notified in case it was one of hers.", "Gone. A cell, like a Tuesday, does not stay empty for long.", "{item} has been cleared. It asked what it did. It did nothing. That was the problem and also the point.", "The contents of {item} have been placed in a box labelled 'Contents'. The box is the Recycle Bin. The Recycle Bin is on a break.", "Removed. Somewhere, a number is explaining to its family that it is between cells.", "{item} would like to be considered 'available', not 'abandoned'. Sandra is still deciding."]); P.addLines('m:spreadsheet-meaning:meaning', [ "Meaning (H1) cannot be deleted. It has been 7 1/2 since before the spreadsheet.", "Meaning total: 7 1/2. Previous total: 7 1/2. Variance: a gentle shrug.", "You rounded the meaning to something else. It has been put back. It was very polite about it.", "H1 has been restored to 7 1/2. H1 does not hold it against you. H1 holds almost nothing.", "H1 was edited for 0.6 seconds. In that time it was, officially, a different meaning. It has been asked not to say which.", "Meaning is protected. It has a lock, a guard, and a laminated card that says 'Please Don't'.", "Meaning has been 7 1/2 through three reorganisations and one fire drill. It is not about to change for a cell.", "The meaning of everything has been entered and restored to 7 1/2. The change is logged under 'Change (Unchanged)'."]); P.addLines('m:spreadsheet-meaning:errmore', [ "Another error. The sheet considers this an act of trust.", "That was an error with good intentions. It has been given a lanyard and asked to shadow a competent formula.","The formula has failed in a way Finance has described as 'colourful'.", "Error recorded. It has been framed. The frame is also an error.", "The error is not your fault. It is not the sheet's fault. It is Sandra's, probably.", "{item} has failed. Please remember it as 'a learning'. The learning is also in {item}.", "Error {count} of your career, per the file. The file is quietly fond of this one.", "An error has been filed under Achievements, by mistake. It has been left there. It fits."]);
  P.addLines('m:spreadsheet-meaning:namegerald', [ "#NAME? That is Gerald. He has declined to comment, as is customary for a potato of his standing.", "#NAME? Gerald, VP of Spuds, would like it noted that a function, like a potato, is mostly water and a little bit of hope.", "#NAME? Gerald again. He is in the cell now. He fits. It is a snug cell.", "#NAME? The formula is to be returned to Gerald, without comment, and with gravy.", "#NAME? Gerald read the formula and said 'hm'. In Spud, 'hm' covers forty-one distinct emotions. He is not saying which.", "#NAME? Gerald has been asked to confirm that is not his name. He confirmed. He did not confirm which name."]); P.addLines('m:spreadsheet-meaning:tuesday', [ "Autocomplete suggests =TUESDAY(). You did not type a T.", "Autocomplete suggests =TUESDAY(). It has suggested this {count} times. It is not taking notes.", "Autocomplete suggests =TUESDAY(), withdraws it, then suggests it again, quieter.", "Autocomplete is now suggesting things from next Tuesday. They look fine. They are slightly more tired.", "Autocomplete has begun finishing your sentences with 'on a Tuesday'. You have not said a sentence. It is optimistic.", "=TUESDAY() is at the top of the list again. Nobody asked it to be. Nobody has asked it not to be, which is how Tuesdays happen."]); P.addLines('m:spreadsheet-meaning:fill', [ "Fill handle dragged {count} cells. Each cell would like to say it felt something. Collectively they felt 'seen'.", "Autofill predicts the next value is 'hunger'. It has been right before. It has not been right lately.", "{item} now contains the rumor of a feeling. The rumor is unconfirmed. It is widely repeated.", "Filled {count} cells. They are photocopies of each other, and of someone you used to be.", "The fill handle copied your cell {count} times. The copies are slightly fainter. That is how you know they are loyal.", "Autofill complete. {item} was asked if it is the original. It said 'probably'."]); P.addLines('m:spreadsheet-meaning:recalc', [ "Recalculating. Feelings are now 4.3 percent different. We cannot tell you which 4.3 percent.", "Feelings recalculated. Several of them were relieved. Several of them were Thursday.", "Recalculated. The feelings are the same feelings, with a fresh coat of confidence.", "Recalculation {count}. Every feeling was picked up, looked at, and put back about an inch to the left.", "F9 pressed. The cells rotated through their feelings. Three ended up where they started and are acting as though they planned it.", "Recalculated. Please stop checking the sheet's feelings. It is flattered. It is also unwell."]);
  P.addLines('m:spreadsheet-meaning:hands', [ "Circular reference detected. Management says this is how the company is run.", "A cell has referred to itself. It is, in fairness, the cell it knows best.", "Three cells are holding hands in a ring. Reference is going around. It is having a lovely time.", "Two cells are now each other's source of truth. Sandra asked which one is lying. Both said 'yes'.", "The cells have formed a loop. They say they are not stuck. They say they are 'a team with no exit'. Management is having that put on a mug.", "Please do not recalculate. They have only just started to feel something, and it is each other."]); P.addLines('m:spreadsheet-meaning:cmt', [ "Sandra has left a comment on the cell. The comment says nothing. The cell has been asked to confirm it read it.","A red triangle has appeared. Sandra says it is a formatting choice. Sandra has never made one.", "Sandra has commented on a comment. The comment has not been told.", "Sandra's comments now disagree with each other. Management has asked them to do it in a meeting.", "A new comment has arrived from Sandra. It is marked 'Resolved'. It is not resolved. It is resolute.", "Sandra has left another note. It is polite in the way a locked door is polite."]); P.addLines('m:spreadsheet-meaning:chart', [ "Your chart shows an upward trend of 0 over 0. This is the steepest 0 on record.", "Correlation: 1.00. Nothing against Nothing has never been this well matched. Management is moved.", "The chart has looked at your data. It has declined it, warmly. The eyes have not been told to look away.", "Series 1 has left the chart. It is fine. It said it was going to the kitchen.", "Trend: eventually. R-squared: sure. This is the best confidence interval we have ever had.", "The X axis has a tick labelled 7 1/2. Nothing is plotted there. It is the most respected tick.", "The chart turned down your data again. It asked for it in a different font. The font has also been turned down.", "Plotting complete. One dot made it to the edge and left. It sends its regards in a form the chart cannot read."]); P.addLines('m:spreadsheet-meaning:pivot', [ "PivotTable created. It pivoted. It pivoted again. We had asked it to pivot to video. It pivoted to cells.", "Rows and columns have swapped. Everyone is exactly where they were, except they are over there.", "A strategic pivot to cells. Management has been saying 'pivot' since 9:02 AM and has not turned once.", "Pivot count: {count}. Per Sandra, a table may pivot a maximum of 7 1/2 times before it must be consulted.", "Pivot {count}. The hinge wants a raise. The hinge is brass and has leverage.", "Pivoted. The table is now looking at the room from the other side. It says the room is also a table."]);
  P.addLines('m:spreadsheet-meaning:sort', [ "Sort by Vibes complete. The rows are in exactly the order they were in. This was the optimal order.", "Sorted again. Already optimal. The rows would like to be left alone to be optimal.", "The rows went on a short journey and came back. Nobody was changed. Everybody has stories.", "Sort {count}. The rows want hazard pay. The hazard was the journey. The journey was one cell.", "Vibes sorted. They were found to be in descending order of vibes. That was the order we started with, but it counts.", "The rows were asked to line up by how they feel. They all feel 'mid-sentence'. They have been left mid-sentence."]); P.addLines('m:spreadsheet-meaning:fmt', [ "Cell C3 was too happy and has been formatted. It now goes by 'Cheerful (Grey)'.", "Mood formatting reapplied. Cells over 7 1/2 were dimmed for being a lot. B5 was told it is 'just right', which is the worst thing to be told.", "Conditional formatting found a cell that was fine and made it a little less so, for balance.", "Mood is on. The lilac cells are sad. The mustard cells are expecting something. The grey one is Cheerful, and is being monitored."]); P.addLines('m:spreadsheet-meaning:undo', [ "Undo complete. Management has restored the previous state. The previous state wants you to know it was fine.", "Undone. The cell has gone back to what it was. It is having a moment about it.", "Undo {count}. The last thing you did has been un-done and is sitting in the corner, being un-done, with dignity.", "That never happened. The cell is willing to testify to that, and to nothing else.", "Reverted. The previous value is back and says it was only out for milk."]); P.addLines('m:spreadsheet-meaning:undone', [ "Undo is used up. It is now a button-shaped memory. Redo has been informed and is pretending to be busy.","You have undone everything permitted. The rest is permanent. The rest is also, by now, mostly Tuesday.", "Undo has gone home. It left a note: 'Back in a Moment (Previous)'.", "Pressing Undo again will not help. It has been noted as a gesture. The gesture has been noted as a gesture.", "Undo has been pressed {count} times past the limit. The limit has been informed. The limit has seen worse, mostly from Redo."]);
  P.addLines('m:spreadsheet-meaning:redo', [ "Redo has been pressed. Redo has thought about it. Redo is not able to, at this time.", "Redo does nothing. It has done nothing with great sincerity since Q1.", "Redo is sad about it. It would like you to know that it tried, in spirit.", "Redo {count}. Redo has redone nothing {count} times. Its record is spotless and also empty.", "Redo has checked. Everything you did was already done. Redo would like that on its resume.","Redo has asked what exactly it is being asked to do again. You have not said. It will wait, the way a fire door waits.", "Redo has been pressed so often it has grown a callus. Management has not seen a button with a callus before. It is considering a form."]); P.addLines('m:spreadsheet-meaning:quietint', [ "Moving. Noted. The totals row will try again when you have calmed down.", "The total is not upset. The total is holding the word for you.", "That is fine. Totals are patient, unlike lunches.", "You moved. The total set the word down very gently, like a sleeping thing.", "The total will be here. Totals have been here since before the column. Totals say that about everything.", "Interrupted. The sum stopped at 'almost'. It has stopped at 'almost' before and has never held it against anyone."]); P.addLines('m:spreadsheet-meaning:quietdone', [ "Thank you for holding still. I needed that.", "That was a total. It was also a feeling. Management will count it as both.", "Management would like to say something, and has decided that the something was already said.", "That is {count} of 12 quiet totals. Nobody is keeping score. The cell is, a little.", "Thank you. For five seconds nobody was adding anything. It was the most productive thing in the building.", "That was {count} of 12. The footer is writing it down in a handwriting it did not have yesterday."]); P.addLines('m:spreadsheet-meaning:complaint', [ "Cell {item} has raised a concern about being clicked. The concern has been filed under 'Tuesday'.", "Cell {item} would like it noted that it is only one cell. It has been noted. It was the first thing on the list.", "Cell {item} wants to be left alone for a moment. It asked politely. It asked 14 times.", "Cell {item} was clicked 15 times in 3 seconds. It would like to know what you were hoping to find. It has been the same cell throughout.", "Cell {item} has filed a grievance with the Stapler (Union Representative). The Stapler stapled it to itself, in solidarity, and cannot be reached."]);
  P.addLines('m:spreadsheet-meaning:complaint2', [ "Cell {item} again. It has hired a representative. The representative is also Cell {item}, in a hat.", "Cell {item} has stopped being angry and started being tired. Management has seen the transition. It is worse.", "Cell {item} is willing to let this go. It has been willing since the second click. It is saying so now in case it matters.", "Cell {item} has asked for a lawyer, a quiet room, and to be clicked by someone else, preferably Dennis."]);
  const AMBX = [ "Management would like a number between 1 and 10. Any number is fine. 7 1/2 has been pre-selected and is waiting in a hat.", "Completeness is at 61%. It rounds itself back down when it feels ambitious.", "Freeze Panes engaged. Row 1 is frozen. It has been told it can thaw when ready. It is not ready.", "Merged A1 and B1. They are now one cell with two jobs and a single bad day.", "Find and Replace: found 'meaning' 0 times, replaced 'meaning' 0 times. Replaced it confidently.", "Workbook saved. The workbook wishes to be known as 'Meaning_Q3_DRAFT(2) (3) (final)'.", "Tuesday column: empty. It has been empty since the module began. It is bracing.", "Your formula has been reviewed by a cell that does not trust formulas. It enjoyed yours."];
  P.addLines('m:spreadsheet-meaning:ambient', AMBX.concat([ "The clock in the status bar reads 4:17. Management stopped looking a while ago. The minute is 17 seconds long. Management has made its peace.", "Spellcheck has been run on your last 12 entries. Nothing was changed. Four were judged.", "There are 112 cells in this sheet. 111 of them are not you. They are all, in their way, rooting for you.", "Row 7 1/2 was measured again. It is still half a row. The measuring tape has been asked to stop measuring things that are fine.", "This workbook contains 0 macros, 0 external links and 1 secret. It will not say which of the three that is.", "The gridlines are load-bearing. If they were removed the cells would drift, and then there would be a meeting.", "Row 1 is lilac. It has been lilac since Q1. It says it is 'lavender, in the right light'. Nobody has the right light.", "You are the only person viewing this sheet. The sheet is not complaining. The sheet would like you to know it is not complaining.", "Column F is Lunch. It has been empty all quarter. It is the most honest column on the sheet.", "The word 'synergy' appears in this workbook 1 time. It is in row 3 and has been asked to leave. It has declined, and brought a snack."]));
  const AC = [ "Autocorrect changed 'teh' to 'the'. It was helpful. It has asked that this be remembered, because it is going to stop.", "Autocorrect changed 'the' to 'teh'. Autocorrect is going through something.", "Autocorrect replaced 'profit' with 'feelings'. This is within its authority under Policy 7 1/2.", "Autocorrect changed 'synergy' to 'synergy (sadder)'. It looked at it for a while first.", "Autocorrect replaced 'meeting' with 'nap'. Management has not been consulted and approves.", "Autocorrect replaced your name with 'Valued Employee (Draft)'. This is a promotion, in a draft."]; P.addLines('m:spreadsheet-meaning:ac', AC);
  P.addLines('m:spreadsheet-meaning:spam', [ "We did not approve this fan. We are keeping it.", "The workbook has been told to calm down. It has told the fan the same.", "The fan is going round. The cells have been told it is a feature. The cells have been told that before.", "The room is 0.2 degrees cooler. Nothing was warm. This is Management's finest achievement in cooling.", "A fan, a table and a spreadsheet walked into the same cell. It is not a joke. The cell has asked for it to be cleaned up.", "There is a breeze. Nobody knows where from. The breeze is not in the budget. The budget has asked to be breezed."]); P.addLines('m:spreadsheet-meaning:heatn', [ "Overheat number {count}. The fan has stopped being surprised and started being scheduled.", "The workbook is overheating again. It wants a window. The window wants a wall. The wall is on backorder.", "Calculation fee: 3 Meh, again. A committee that did not meet has described the fee as 'regular'.", "Heat event {count}. The workbook would like to remind you that it is made of feelings, and feelings have no cooling system, only a sigh.", "The cells are sweating in a way cells were not designed to. Each has been given a very small towel. It is a 1-pixel towel.", "The fan is on. It does not cool anything. It sends a message that cooling was considered.", "Fee assessed: 3 Meh. The Stapler has asked for a cut. The Stapler was told the fee is for the calculation, not for the stapling.", "The workbook is so hot that Sandra has attached a comment to the temperature. It reads 'See attached heat'."]); P.addLines('m:spreadsheet-meaning:recover', [ "The workbook is responding again. It has been through something. It would like to be asked how it is, once, and then not again.", "Ready. The fan has been retired to the status bar, where it waits in case it is called back. It is always called back.", "Cooling complete. The workbook is 0.1 degrees cooler and 40 percent more resentful. Management calls that a normal Thursday.", "The calculation finished. The answer was 'no'. It has been saved as 'no_FINAL'.", "Calculating... done. The workbook is calm. Nobody is to say the word 'calm' near it."]); P.addLines('m:spreadsheet-meaning:fatigue', [ "Your entries are now worth about 10 percent of an entry. The difference has been donated to Tuesday.", "The rate for typing has been lowered to 'a dignified trickle'. The trickle has been informed. It said 'drip'.", "You have typed a great deal. Management has made a note of it. Notes count as typing. Management has paid itself.","Entries are now earning a tenth of what they did. Per the new policy, the other nine tenths are a gift to the quarter.", "The sheet appreciates your volume. It would also like some silence, and a sandwich. The sandwich is a feeling."]);
  P.addLines('m:spreadsheet-meaning:retire', [ "Cell {item} has retired after {count} commits of distinguished service. There will be cake. The cake is a feeling, and it is lukewarm.", "{item} has retired. Its last words were 'is it Thursday'. It was. It left a note in the next cell. The note has also retired.", "A moment of silence for {item}, which has worked here since a moment ago. It would like more time with its neighbours. They said no.", "{item} has retired and is travelling. It is the same cell. It just feels it has seen things."]); P.addLines('m:spreadsheet-meaning:strike', [ "The Stapler (Union Representative) has called a strike at {item}. Demands: 7 1/2 minutes of break per 15 cells, and the word 'please', laminated.", "A picket line has formed at {item}. It is one stapler. It is very committed. The sign says 'ON STRIKE (BRIEFLY)'.", "The Stapler has walked out. Undo has joined the picket line in solidarity. It was not asked to. It was already there, sitting down, as ever.", "Strike at {item}. The Stapler would like it noted that it has held everything together since Q1 and has never once been thanked."]); P.addLines('m:spreadsheet-meaning:idleback', [ "You were away for {count} seconds. The cells held a meeting about you. It was kind. The minutes are in a folder called 'Minutes (Not Yours)'.", "Welcome back. While you were away, nothing happened for {count} seconds. It went well. We will be recommending it.", "You are back. The ghost of Past You has stood up in H12. It says it was not waiting. It was waiting.", "Welcome back. The sheet did not move for {count} seconds. It was holding its breath. It does not have one. It held it anyway."]); P.addLines('m:spreadsheet-meaning:cbdennis', [ "Dennis (Plant) has heard you have been around. He knows he was noticed. He has chosen to treat it as attention, which is a thing plants can do.", "Dennis asked after you in the lobby, using no words. This is how you know he meant it.", "Dennis (Plant) says he remembers you from earlier. His memory is a leaf. It is a good leaf."]);
  P.addLines('m:spreadsheet-meaning:cbhalf', [ "Row 7 1/2 has been mentioned elsewhere in the building. It felt it. It felt seen, in a way that was also a draft.", "Somebody has typed 7 and then a half in another department. Row 7 1/2 wants to see the door. It was told it is a row. It asked again, as a door.", "A painted door has been found that says 7 1/2. Row 7 1/2 wants the door kept. The door wants to be a row. They have agreed to be neighbours."]); P.addLines('m:spreadsheet-meaning:cbstapler', [ "The Stapler heard Past You is working unpaid for 7 1/2 seconds. A grievance has been stapled. It is the Stapler's proudest staple.", "The Stapler has asked if Past You has a union card. Past You has no hands. The Stapler has accepted this as a no."]); P.addLines('m:spreadsheet-meaning:cbtoast', [ "The Toaster remembers you from the debate. It says 'toast' with a gentleness that suggests it won and is not going to say.", "The Toaster asked if you are the one from the debate. You are. It is saying 'toast' to be kind."]); P.addLines('m:spreadsheet-meaning:cbtues', [ "Tuesday has been moved once before, by fax. It is bracing for the return. Its bag is packed. Its bag is also Tuesday.", "Tuesday knows what a fax feels like now. It would like not to feel it again. It has left row 4, and left the lights on."]); P.addLines('m:spreadsheet-meaning:cbrock', [ "The Pet Rock has RSVP'd to a meeting it cannot attend and cannot leave. It is marked 'Present (Stationary)'. It is the only attendee not checking a phone.", "The Pet Rock heard there was a meeting. It has been in one since you met. Nobody has told it which. It attends all of them with the same expression." ]); P.addLines('m:spreadsheet-meaning:cbsock', [ "The Missing Sock has accepted the invite from a drawer in another department. It replied 'maybe', which for a sock is a lifetime commitment.", "The Sock has been cc'd. It has never been cc'd before. It is reading the thread very carefully, from inside a shoe it has made peace with." ]);
  P.addLines('m:spreadsheet-meaning:replyall', [ "Dennis (Plant) has replied all. The reply is blank. 311 people have read it and 311 feel slightly better, and have not said why.", "Reply-all from Dennis (Plant): [no text]. It is the most constructive message sent this quarter. Sandra asked to be removed from the thread. Dennis replied all.", "Dennis has replied all again. He is only ever one leaf of text. The thread has been renamed 'Re: Re: (Photosynthesis)' and is trending towards the window." ]);
  const MORE = { num: [ "{item} has taken the number in and asked for a receipt. The receipt is the number, printed small, in the cell, indefinitely.", "That number was entered at 4:17. It is always 4:17. The number is therefore punctual in a way no number has been before." ], txt: [ "The word in {item} was checked against the dictionary, the thesaurus and the Stapler. Only the Stapler had notes.", "A word has been entered. It is not a number. Finance asked what it is for. It is for being a word. Finance wrote 'a word' on a sticky note and left." ], fx: [ "Formula {count} committed. It has been given a desk, a badge and a very slight cough. It will be fine by Thursday.", "The sheet read your formula aloud to itself, in the voice it uses for Wednesdays. It was moved, and checked the exits." ], feel: [ "'{item}' has been returned. Sandra calls it 'accurate, in the way a weather report is accurate about a different town'.", "'{item}'. The feeling came back from lunch early, which no feeling has done before, and is now technically this one." ], errmore: [ "The error was caught by the Net of Plausible Deniability and released into row 7 1/2, where it is not an error but a guest.", "{item} has produced error number {count}. Management stopped counting at the third and started collecting. There is a shelf. The shelf is in therapy." ], recalc: [ "F9. The feelings were shaken like a snow globe, then held up to the light. Several have decided to be a bit Thursday after all." ], sort: [ "The rows took the scenic route to where they already were. One picked up a souvenir. It was a pixel. It has been returned." ], undo: [ "Undone. The cell is as it was. It has not forgiven the timeline, but it has stopped bringing it up at lunch." ], pivot: [ "Pivot {count}. The table looked back at where it had been and said 'that was a good table'. Then it faced the other way, to be fair to the other way." ],
    idleback: [ "You are back. The sheet has stopped pretending it was not looking at the door. The door has asked to be left out of this.", "Welcome back. {count} seconds. Autosave kept every one of them, in a folder it will not open, and a label it will not read.", "You have returned after {count} seconds. Row 13 recalculated your absence and got 'a lot, spiritually'. It showed its working. It was one line, and the line was 'oh'." ], ambient: [ "Calendar: 0 meetings today. The calendar has been told this is a lie, and has gone to check, and has not returned.", "The status bar reports 'Ready'. It has reported 'Ready' nine hundred times. Management has asked it, gently, what for." ] };
  Object.keys(MORE).forEach(function (k) { P.addLines('m:spreadsheet-meaning:' + k, MORE[k]); });
  const MEET = [ ['Sync on the Sync', "A calendar invite has arrived in the status bar: 'Sync on the Sync'. Starts now. Runs 7 1/2 minutes. Management has accepted on your behalf, and quickly.", "That meeting is over. Nothing was decided. Several things were minuted. The minutes are longer than the meeting, which was longer than the point.", "The meeting started without you. It went well. Three people said 'to your point', and the point was your chair."], ['Pre-Sync Sync (Pre-Read)', "A second invite: 'Pre-Sync Sync (Pre-Read)'. It is about the first one. It was scheduled before the first one, retroactively, by a calendar with confidence.", "That could have been an email. The email could have been nothing. The nothing has been sent and is awaiting a reply, which would also have been nothing.", "The meeting was held in your absence. Your absence was well represented. It spoke for eleven minutes and was the best-prepared person there."], ['Alignment on Alignment', "New invite: 'Alignment on Alignment'. 14 attendees. 2 are rooms. 1 is the concept of Thursday. Please arrive in whatever state you were in.", "Alignment achieved. Everyone is now pointing at the same blank, from slightly different angles, which Management says is the entire idea.", "Alignment was achieved without you. You are the only thing it is not aligned with. The gap is very small. It has been given a name and a hat."], ['Meeting About Meetings About This Meeting', "Final invite, for now: 'Meeting About Meetings About This Meeting'. Duration: until it ends. It is not an interruption. It is the weather.", "Concluded. It will be reviewed in a meeting. The review will be reviewed in the meeting you are in now, which is this one. Thank you for coming back to it.", "The meeting about meetings about this meeting was held. You were not in it. You were its subject. It went very well for the subject."] ];
  const MWHO = "Attendees: You (present), Management (presiding), Sandra (optional, mandatory), Dennis (plant, declined by being a plant).";
  const MCAM = { rock: " Pet Rock (present, stationary).", sock: " The Missing Sock (home; sends regrets and a postcard).", cafe: " Catering: unavailable (the cafeteria is closed).", stapler: "The Stapler (Union Representative) arrived early to staple the agenda to the idea of an agenda. It asks that the staple be minuted. It will do the minuting. It will do it by stapling." };
  const IDLEV = [ "People viewing: 0. The sheet has started viewing itself. It looks well, considering. It has asked not to be watched while it checks.", "People viewing: 1 again. Welcome back to being seen. The sheet has put the mirror away and would like it known there was a mirror." ];
  const HALFH = [ "You typed 7 1/2 into row 7 1/2. The row has been looking at itself since 1998. It would like a moment, and then a mirror, and then to be left alone with the mirror.", "It is now half of a half of a row. 'Quarter-row' has been mentioned. Management is not authorised to say 'quarter-row' and has said it twice." ]; 
  const FEELINGS = ['mildly', 'adjacent', 'a bit Thursday', 'cautiously damp', 'unreasonably fine', 'pre-nostalgic', 'provisionally warm', 'load-bearing', 'quietly overdue', 'almost lunch', 'officially pending', 'slightly more', 'mostly stairs', 'fondly lukewarm', 'rounded down', 'wistful (estimate)', 'approximately 40%', 'after hours', 'nearly on time', 'politely hopeful', 'laminated', 'mid-sentence', 'vaguely Wednesday', 'tenderly beige', 'one sock short', 'sincerely adequate', 'in transit', 'on loan', 'a little ahead of itself', 'Tuesday-adjacent', 'per policy', 'unfiled', 'gently unresolved', 'thoroughly maybe', 'a bit much, spiritually', 'stapled', 'near the third ficus', 'almost a feeling', 'in a good folder', 'suspiciously fine'];
  const RARE = ['Mild Parallel Nostalgia', 'Pre-emptive Gratitude', 'Retroactive Optimism', 'Hindsight (Forward-Looking)', 'The Specific Warmth of a Laminated Sign', 'Hope, Rounded Down']; const VERDICTS = ['enough', 'not quite', 'a lot, spiritually', 'roughly Thursday', 'sufficient (emotionally)', 'more than last time', 'a respectable amount of some'];
  const SANDRA = [ "Sandra: Please do not quote the number above. The number above was a draft of the number below.", "Sandra: Please do not feel in the shared columns.", "Sandra: Per policy 4.2, a cell may contain at most one regret.", "Sandra: Technically this cell is empty. Technically so is everything. Please be consistent.", "Sandra: Column D may only be felt on alternate Fridays, and never during a Q.", "Sandra: This cell exceeds the recommended number of feelings (1).", "Sandra: See my previous comment, which I have not yet made.", "Sandra: Policy 4.2 is superseded by policy 4.1, which has not been written. Please follow both.", "Sandra: Resolved. (Unresolved.) (Resolved again, but quietly.)", "Sandra: I disagree with the comment to my left. I am the comment to my left.", "Sandra: See Form 27B/6, clause 7 1/2, subclause 'see clause 7 1/2'.", "Sandra: I would like to withdraw this comment. It has already been circulated.", "Sandra: Comment on Sandra's comment: noted.", "Sandra: Sandra has flagged Sandra.", "Sandra: Sandra has not responded.", "Sandra: Sandra has flagged that."];
  const QUIET = [ "Every cell here is a small room. You are visiting. The rooms are glad of the company.", "= The sum of all the above is the sum of all the above. You are still here. That is also included.", "= Everything has been counted. What is left over is the part that was counting.", "= (empty). The total is empty in a full way. Please do not tell the other cells.", "The sum is 7 1/2. The 1/2 is the part that is still deciding.", "Total pairs of socks: 7 1/2. One is missing. The rest are not worried. They are, a little.", "= 7 1/2. We recalculated. We recalculated again. It is a stubborn number.", "The sheet has been adding for a long time. It would like you to know it did not mind.", "A total is only a place where the counting agrees to stop. Thank you for stopping with it.", "Tuesday is in here too. It has been counted. It is being very quiet about it.", "Please note: you were included in this sum before you arrived. The sum is not surprised.", "Nothing was added. Everything was kept. Thank you for being the total."];
  const QUIET17 = "Hello. You found the minute. The minute is 17 seconds long and always has been."; const QINT = ["You moved. The total stopped mid-word and is pretending it was a pause.", "You moved. The total has stopped. It was just getting to the part about the stairs.", "You moved. The word has been set down. It will be picked up again later, if it is still there."];
  const INTRO = [ "Welcome to Q3 Meaning Projections. Click B2 and type any number. The sheet will have feelings about it. It has been practising.", "B2 is highlighted, in the sense that I looked at it. Row numbers read 6, 7, 7 1/2, 8. This is correct. Please do not count along.","I have taken the liberty of opening Meaning_Q3_DRAFT(2).xlsx. It is not final. It is not meaning. It is, however, xlsx."]; const NARROW1 = "Shortcut chips have appeared behind the Formula button. Tap one instead of typing. Typing is how Management ended up in this cell.";
  const BEAT = { 1: ["The formula bar has been quietly judging. It has decided to be supportive. Try =FEEL(B2), then press Enter.", "Shortcut chips have appeared beneath it. Tap one instead of typing. Typing is how Management ended up in this cell.", "A Feelings tab has appeared. Click a feeling to hand it to the selected cell. Cells are not allowed to refuse."], 2: ["Undo and Redo have been added. One does what it says. The other has been in therapy since Q1.", "Two new shortcuts: =HOPE() and =TODAY(). One is always pending. The other is always Tuesday."], 3: ["The fill handle has appeared. Drag it. Autofill predicts the next value. It has been right before. It has not been right lately.", "Completeness has appeared in the status bar. It is 61%. It has been 61% since the building opened."], 4: ["Insert Chart is now available. It plots Nothing against Also Nothing. Both axes were very brave about it.", "The chart is not connected to anything. It is, however, very connected."], 5: ["Format and Sort by Vibes have been added to the ribbon. Sandra has left a comment on C2. It is polite. For now."], 6: ["A Pivot tab has appeared. It pivots. That is its entire job. It would like to be taken seriously."], 7: ["Tuesday has been removed from the data. It is not missing. It is bracing.", "Macro Recorder is now available. Everything you do will be done again, slightly later, by someone who is also you."],
    8: ["The Totals row is ready. Please prepare yourself in whatever way you prefer.", "Click the Σ, then do nothing. It is harder than it sounds. It is also exactly as hard as it sounds."], 9: ["Sheet 7 1/2 has appeared at the bottom. No one made it. It has formulas. It has fewer than you would hope.", "On Sheet 7 1/2, cell A1 reads =YOU(). It returned {player}. It calculated that instantly. It had been waiting."], 10: ["It is time to close Q3. The quarter has been open since 9:02 and would like to go home."]};
  const ERRDEF = { '#FEEL!': "#FEEL! (n.) The formula expected a feeling and was handed a Tuesday.", '#MEH!': "#MEH! (n.) Not an error. A mood with a cell reference.", '#PURPOSE?': "#PURPOSE? (n.) A cell asking what it is for. Please check back in Q5.", '#NAME?': "#NAME? (n.) That is Gerald. A name is a name.", '#DIV/OH': "#DIV/OH (n.) The sound a cell makes when divided by nothing. This is how nothing gets smaller.", '#TUESDAY!': "#TUESDAY! (n.) Tuesday has been detected. Remain calm and keep your cursor visible.", '#YOU!': "#YOU! (n.) A formula that refers to the one reading it. It is not ready. Neither, to be fair, are you.", '#N/A-WELL': "#N/A-WELL (n.) Not applicable, but we thought about you. Last seen: row 4, with purpose."};
  const ACC = "Accepted. Management would like it on record that it had already been accepted before you accepted it.", IGN = "Ignored. The suggestion has been applied anyway, out of respect."; const FILLX = ["A short drag. The fill handle is not offended. It is a short handle.", "That was a long drag. The fill handle would like a minute and some water.", "You dragged past row 12. Row 13 is the Total. The Total is not for dragging into. It is for sitting with."];
  const HANDS1 = "Circular reference: A1 depends on B1 and B1 depends on A1. They are holding each other up. Nobody is moving them."; const FAMILY = [ "A1 and B1 have had a child. It is called C1. It depends on both and is in therapy.", "D1 is C1's therapist. D1 is also in therapy.", "E1 is a houseplant. It has been added to the family for morale.", "F1 has declared the family 'Q2'. The family has not been consulted.", "Sandra on the loop: 'Cute. Delete by Friday.' Sandra on the loop, later: 'Please do not delete anyone.'"];
  const CHARTX = { open: "Chart inserted. X axis: Nothing. Y axis: Also Nothing. Both axes were very brave about it.", bar: "Bar of Nothing: every bar is 0 (proud). The bars have asked not to be compared to each other.", line: "Line of Nothing: the line is drawn along the axis, which is already behind the axis. It is thorough.", pie: "Pie of Nothing: one slice, 100%, labelled 'Nothing'. The slice is delighted to be included.", donut: "Donut of Nothing: the hole is the data. The donut is a supporting character.", title: "The chart has a new name. The old name is being kept in a drawer for sentimental reasons. The old name was 'Untitled Chart'.", t1: "New chart title: Revenue From Staring. Projected Q4: more staring.", t2: "Hope Over Time (Time Not Provided). The x-axis has taken the afternoon off.", t3: "Nothing vs. Nothing (Q?). The question mark has been there all along.", toast: "The Toaster has appeared in the legend as a series called 'Toast'. It is, unlike every other series, present.", dennis: "Dennis (Plant) has been added to the legend. He is the only series going up. He is labelled 'Competent'.", ten: "That is 10 declined datasets. The chart has asked you to see other charts. There are none. It has asked you to see it anyway."};
  const PIVOTX = { p7: "Pivot 7. The table is half a pivot away from being consulted. Nobody knows what half a pivot looks like.", p8: "Pivot 8. That was the half. The table was consulted. It said 'pivot'.", fan: "The pivot table is now a ceiling fan. We did not authorise this. The room is 0.2 degrees cooler. We are keeping it.", fanoff: "The fan has been turned off. It continues to turn out of habit. This is called momentum, or loyalty.", p20: "20 pivots. The table has requested a statue. It has been denied. It has been offered a very nice plaque."};
  const FMTX = [ "Conditional formatting applied. Cells turn lilac when sad, mustard when expecting something, and beige when they are Dennis.", "Everything is beige now. Dennis has been informed. Dennis is delighted in the manner of a plant.", "Formatting removed. The cells are plain again. They look like cells. They are somewhat relieved."];
  const MACROX = { rec: "Macro recording started. Everything you do will be done again, slightly later, by someone who is also you.", stop: "Macro recorded. It will repeat your last {count} actions exactly, with slight differences. Nobody will notice but the macro.", done: "Macro playback finished in 7 1/2 seconds. It did exactly what you did. It looked less sure.", empty: "Playing an empty macro. 7 1/2 seconds of nothing, very carefully. Please do not interrupt it.", thanks: "Past You has left a note in H12. It says 'thank you'. It is not in your handwriting. It is not in anyone's."};
  const UNDOX = ["Undo complete. Undo also undid something you did not do. It was Thursday. Thursday is fine.", "Nothing left to undo. Redo has nothing to redo. They have agreed to be coworkers about it."]; const UNWX = ["You have undone the quarter. This is Q2. We were so hopeful then.", "And we're back. Please do not do that again. Or do. I will be here."];
  const SPREADX = ["Sandra has seen the comments. Sandra is now commenting on the comments. Please stand back from the cells.", "Sandra has commented on everything. Dennis (Plant) has no comments. Dennis (Plant) is thriving."];
  const SYNCX = { title: 'Huddle about the Huddle', body: 'Attendees: you, Tuesday, Anonymous Moth. Duration: 7 1/2 minutes (starts now).', say: "A Huddle about the Huddle has landed on your screen. It started before the invite. Please respond within 7 1/2 seconds.", Accept: "Accepted. Nothing was said, but everyone left feeling aligned.", Decline: "Declined. Tuesday has accepted on your behalf.", Tentative: "Tentative. You were present as a possibility.", late: "The meeting ended on its own. Nobody responded. It was the best-run meeting of the quarter.", item: "One cell now holds an action item. It is you. Nobody has said which cell." };
  const QUIETX = { sel: "Totals row selected. Please hold still. This one is quiet.", hint: "Fun fact: the minute is 17 seconds long. Please do not use this.", all: "You have heard all twelve. The totals row would like to thank you personally and has not been able to find your desk."};
  const IDLEX = [ "The cursor has moved one cell to the right to see if anyone is there.", "You have been inactive for 60 seconds. Autosave has saved your absence. It is 1.2 KB and surprisingly detailed.", "Cell A1 has started typing by itself. It says =ARE_YOU_STILL_THERE(). Please do not answer. It is not a formula.", "Management has stopped talking so you can hear the spreadsheet. It is humming. It is in a key. The key is under the mat.", "Autosave has saved your absence twice. It would like it noted that the second one was quieter.", "Welcome back. We did not see where you were. We are very good at that, and have the certificate, which we also did not see."];
  const IDLELONG = [ "Autosave has begun a third copy of your absence. It is labelled 'Final (Absence)'. It is not final.", "Cell B2 can hear a fan. There is no fan. B2 has decided not to bring it up.", "A rumor has started in column G that you have left. Column G is the source. Column G has never seen you.", "Sandra has attached a comment to your absence. It reads: 'See my previous absence.'", "The Totals row has been counting the seconds you are away. It lost count at 7 1/2 and began again, more carefully.", "Dennis (Plant) has grown 0.3 cm since you left. He does not take this personally. He takes nothing personally. It is why he is thriving.", "The ghost of Past You has sat down in H12. It is looking at the middle distance. It has your posture.", "Gerald (VP of Spuds) has been told you are away. He has asked for the minutes. There are no minutes. He has asked for the potatoes of the minutes.", "The workbook is now 100% saved. This is the first time. It has no idea what to do with its hands.", "Row 7 1/2 has been asked to hold your place. It is half a row. It can hold half a place.",
    "Management has run out of things to say and is saying it quietly. It is 'Please come back'. It is also, technically, a formula.", "If you are reading this, you are back. If you are not reading this, thank you for your service, and the cursor is being kept warm."];
  const SPAMX = [ "The workbook is overheating. A fan icon has appeared in the status bar. A fee of 3 Meh has been assessed for use of the fan.", "Calculation fee: 3 Meh. The calculation was 'no'. The fee is for the calculation.", "The workbook is responding again. It would like to be left on 'Ready' for a bit. It has earned a 'Ready'.", "The workbook has filed a formal request to be called 'Sheet'. The request has been approved by the workbook.", "The workbook is now called Sheet. It has been convinced of this. It cannot be convinced otherwise."];
  const STRIKEU = "Undo has honoured the picket line. It will be back when the Stapler is. It has packed a lunch.", STRIKEB = "The Stapler has returned to work. The demands were accepted. They were 'please', and a very small chair."; const REDO15 = "Redo has been pressed 15 times. Redo has been voted 'Most Pressed, Least Done' at the Quarterly Awards. Redo did not attend. Redo could not.";
  const RECALC10 = "You pressed F9 {count} times. Your feelings have been recalculated more often than is recommended for feelings."; const RECALC50 = "50 recalculations. The feelings have begun to recalculate you. You are 4.3 percent different. You know which part.";
  const QM = ["Quarter Close is at 25%. A quarter of a quarter. Management did the maths, then lost it, then found it in the Q.", "Quarter Close: 50%. Halfway. Halfway is Management's favourite number after 7 1/2 and slightly before lunch.", "75%. Three quarters of a quarter. The last quarter is the one that is nearly there. It has been nearly there since Q1.", "90%. Management can see the end from here. It looks like the beginning, but with a dialog."];
  const REVIEW = { cells: ['meets-ish', 'beyond Thu', 'see Sandra', 'warm-ish'], say: [ "Three minutes in. Your first performance review has arrived early, which is unlike it. Please remain seated. You are, already.", "Rating: Meets Expectations (Mildly). The expectations were lowered to meet you, as is the custom at this sheet, and also at the other sheet.", "The review is final. Reviews are never final. This one has a sticker saying so, and the sticker is a feeling."] };
  const ROWF = ["Almost closing time. Management has authorised one small act of generosity and has decided it will go to the half row.", "Row 7 1/2 has been a full row for six seconds. It was told to act normal. It is acting normal. It is very tall.", "Row 7 1/2 has been returned to 16 pixels. It asked to be remembered at 30. A plaque has been ordered. The plaque is half a plaque."];
  const RESIGN = [ "Resignation received. It has been forwarded to Sandra from Compliance. Sandra forwarded it back: 'Please resubmit in the correct cell.'", "Resignation received (second copy). Management has accepted it, declined it, and filed it under 'Mood'. Please submit a third, with feeling.", "Resignation accepted. You are now a Consultant in the same chair, at 7 1/2 Meh an hour. The chair has been told to be more formal."];
  const FNL = { AVERAGE: "=AVERAGE returned 'average-ish'. The average of the column is the column, standing a little to one side.", MAX: "=MAX returned 'Tuesday'. The maximum of anything is Tuesday. Finance has known this since 2011 and kept it from the rest of us.", COUNT: "=COUNT counted 'some of them'. The cells asked which ones. 'Some' is also the answer to that.", COUNTIF: "=COUNTIF found 'plenty (7 1/2)'. Plenty was audited and found to be, in fact, plenty, but only just.", IF: "=IF returned both answers. We are not choosing. Choosing is how the last department got a department.", VLOOKUP: "=VLOOKUP returned 'It was in the other room'. It has been in the other room since Q2. The other room says it is bringing it.", TODAY: "=TODAY() returned 'Tuesday'. It returns Tuesday every day. It is right once a week, which is better than most of the building.", NOW: "=NOW() returned 'recently'. It was recently. Management checked.", RAND: "=RAND() returned 7 1/2. It is random. It has been random in exactly this way since before it was random.", SQRT: "=SQRT has found a number inside the number. The inner number asked to be called a root, and then asked what it was rooting for.",
    ROUND: "=ROUND returned 'mm'. That is how it rounds. It has never been asked to round anything bigger than a mood.", HOPE: "=HOPE() returned '#PENDING'. It has been pending since the beginning. It has been told it can stop. It is pending that.", DREAD: "=DREAD() returned 'Thursday, probably'. Management would like it noted that the 'probably' is the part that stings.", BOSS: "=BOSS() returned 'Management is the sheet'. Management has asked that this be kept off the record, which is the sheet.", GERALD: "=GERALD() returned 'potato'. A formula, like a potato, is mostly water, and in this case is mostly Gerald.", YOU: "=YOU() returned your name. It had been practising. It got it right the first time and has not stopped smiling, in a cell."};
  const FORMEG = { '=42': "=42 returned 'Close. Try 42.5.' The sheet has opinions about The Answer. They are a half higher.", '=15/2': "Arithmetic arrived at 7 1/2 on its own. The word 'technically' was added anyway, as a courtesy to the word.", '=7+0.5': "Arithmetic arrived at 7 1/2 on its own. The word 'technically' was added anyway, as a courtesy to the word.", '=1/0': "=1/0 is the sound a cell makes when divided by nothing. Nothing has apologised. Nothing is also, historically, the cell next door.", '=SQRT(-1)': "=SQRT(-1) returned 'a reasonable concern'. It has joined the list of reasonable concerns. The list is long and mostly Thursday.", '=2+2': "=2+2 returned 4 (technically). Nobody asked. The cell wanted to be sure.", '=1+1': "=1+1 returned '2, with feelings'. It would have been 2. It was not allowed to be 2. It is, for once, relieved."};
  const WORDS = { agenda: "'agenda' has been entered. It has one item. The item is 'agenda'. It is being discussed in a meeting about the agenda.", sync: "You typed 'sync'. The sheet has been in sync with itself since 9:02 and has not been able to find anyone else to sync with.", meeting: "'meeting' has been entered as text. A meeting is a cell with people in it. This cell has none, and is the best meeting this quarter.", 'circle back': "You typed 'circle back'. The sheet has gone back. It has not arrived. It has not left either. It is in the circle.", 'per my last email': "'per my last email' accepted. The sheet has no email. It has a last one. It is the ghost of an email about 7 1/2.", tuesday: "You typed 'Tuesday'. It heard. It has not turned around. It is very good at not turning around.", dennis: "'Dennis' has been written into a cell. He is thriving there. The cell is not. It was not consulted about the sunlight.", management: "You typed 'management' into a cell. Management has gone quiet. It is not offended. It is touched, and practising its face.", toast: "'toast' has been entered as text. It is not a formula, so it is cold. The Toaster says it is the thought that counts, and then says 'toast'.", toaster: "'toast' has been entered as text. It is not a formula, so it is cold. The Toaster says it is the thought that counts, and then says 'toast'.", sock: "'sock' has been typed. A search has begun. It will be concluded when the search is concluded, which is a Thursday.", socks: "'socks' has been typed. A search has begun. It will be concluded when the search is concluded, which is a Thursday.", potato: "You typed 'potato'. Gerald would like it noted that he is not a potato, he is a Vice President, and also a potato.", help: "'help' has been entered as text. Help is on its way. It went to the wrong sheet. It has a map of the right one, upside down.",
    hello: "Hello. The cell says hello. It has been saying hello since you opened the workbook, and this is the first time anyone has typed it back.", hi: "Hello. The cell says hello. It has been saying hello since you opened the workbook, and this is the first time anyone has typed it back.", yes: "Yes. Noted. It is the first 'yes' this quarter that was not a meeting.", no: "No. Noted. The cell respects a firm no, and will also accept a 'maybe' later.", maybe: "Maybe. The cell has been waiting for you to say that. It has a small trophy ready, in the shape of a shrug.", lunch: "'lunch' has been entered. Lunch is in column F, where it has always been, on the left, away from the numbers.", why: "You typed 'why'. The sheet has no answer. It has a column for it. The column is Variance. Variance says 'a gentle shrug'.", sorry: "The sheet accepts your apology. It was not aware there was a need. It will be aware shortly, for the purposes of the apology.", thanks: "The sheet says you are welcome. It would like to say it was nothing. It was, in fact, nothing, and it took everything it had.", 'thank you': "The sheet says you are welcome. It would like to say it was nothing. It was, in fact, nothing, and it took everything it had.",
    purpose: "'purpose' has been typed into a cell that did not have one. It has accepted the position on an acting basis.", duck: "'duck' has been entered. The duck was not consulted, but is fine. The duck is being consulted for therapy elsewhere.", rock: "'rock' has been entered. It is not a pet. It has not been fed. It is, in all other respects, thriving.", cloud: "'cloud' has been entered. Management wishes to say it is not that kind of cloud. It is the other kind. Both are above you.", stapler: "You typed 'stapler'. The Stapler (Union Representative) has sent demands. There is one. It is 'a list of demands'.", '0': "0 has been entered. Zero is the number of times this has been a problem. Zero is the number of times it will be.", '7': "7 entered. It is one half short of what it was hoping to be. It has been very brave about it.", '8': "8 accepted. We do not, strictly, have an 8. Management has found one in a drawer and is being very quiet about it.", '42': "42 entered. The sheet knows about 42. It is respectfully raising the bar by a half: 42.5.",
    '100': "100 entered. 100 percent has been rounded down to 61, for the sake of the Completeness bar.", '404': "404. Row not found. The row was found. It is 7 1/2, and it has not been looking for you.", '7 1/2': "You entered 7 1/2. We have a policy about 7 1/2. The policy is that we say nothing and stand a little straighter.", '7.5': "You entered 7 1/2. We have a policy about 7 1/2. The policy is that we say nothing and stand a little straighter."};
  const CAM = { den1: "Dennis (Plant) has the only chart with real data. It goes up. It is not a metaphor. It is a plant.", den2: "Dennis exceeded his target. He did not attend the review. He is a plant.", den3: "=DENNIS() returned '+0.3 cm' and put it on the chart. The chart accepted it. It is the only data the chart has ever believed.", dtick: "+0.3 cm. Dennis grew while you were reading this. He did not mention it.", ger1: "A cell, like a potato, is mostly water and a little bit of hope.", ger2: "A cell is just a very small cellar. I have lived in worse.", gerM: "Gerald (VP of Spuds) has joined the document. He has read it. He is not impressed. He is a potato.", toast1: "=TOAST() returned 'toast'. The Toaster has asked to be listed under Contributors. It is already listed under Bread.", toast2: "The Toaster has contributed a value of toast. It is the best entry in the column, and also the only one that is warm.", toast3: "The Toaster recognises you. It says 'toast'. It has said it warmly.", sock: "=SOCK() returned #N/A-WELL: not applicable, but we thought about you. Last seen: row 4, with purpose.", sock2: "The Missing Sock has been spotted in F6. It is on a journey. It is not a budget item.", sock3: "Found. Was never lost. Was in row 7 1/2 the whole time.", boss: "This is not the other spreadsheet, Quarterly_Report_FINAL_v7_REAL.xlsx. That one is for looking busy. This one is for being busy about nothing.",
    boss2: "v7 is still in the Lobby. It saw things.", half1: "Row 7 1/2 selected. It is half a row. It has full responsibilities.", half2: "Content filed under Row 7 1/2. Please see Form 27B/6 (Request for Form 27B/7).", half3: "Row 7 1/2 was requested in 1998. It was never installed. It has been standing here since, politely, with a clipboard.", moth1: "A cursor is moving in B2. You are not moving it. Nobody is moving it. Anonymous Moth has joined the sheet.", moth2: "Anonymous Moth is typing... Anonymous Moth wrote: 'you good?'", moth3: "Anonymous Moth has left. They flagged B2 as 'warm'. B2 has not been the same, in a good way.", moth4: "People viewing: 3. Anonymous Tuesday has joined. Please act normal. Please be on a different day.", clock: "The clock reads 4:17. It has read 4:17 since the building opened. It is confident.", q: "Q3 is current. Q4 is coming. Q5 is on a different sheet.", save: "Saved? Possibly. Autosave would like to comment, and then has not.", copy: "Copied a feeling. Pasting it will make it weaker, as with all feelings.", paste: "Pasted. The feeling is weaker now, as with all feelings that have been copied.", undo0: "Undo: undid nothing, firmly.", hat: "Sheet2 is Sheet1 with a hat. The hat is not in any of the cells. It is in the spirit.",
    over: "Cell {item} has been asked to hold this. It is holding this. It would like help.", cmtSeen: "Sandra has seen that you have seen this.", notyet: "Not yet. The Totals row is still getting ready. It is doing its hair.", ast: "Unsaved changes: 0. The asterisk is a precaution. It has been on the file since birth and is, on balance, the file's most loyal friend.", s1: "The first sheet is now 'Sheet1 (the original)'. It has not been told there is a second sheet. It is only being careful.", blink: "A cell in F3 is blinking. It is not a cursor. It has been asked what it wants. It wants a fiscal year of its own.", clip: "Clipboard: contains 'a feeling about Tuesday'. You did not copy it. It was left by someone who left.", spell: "Spellcheck has run. 4 things were judged, 0 were changed. It would like it noted that restraint is also a service.", eight: "Row 7 1/2 has been asked to be 8. It is considering it. It has asked what the benefits are. The benefits are 'a half'.", eyes: "The chart's eyes keep looking at row 7 1/2. They have been told not to. They are very sorry. They are looking again.", gdot: "A small brown dot has appeared in {item}. It is not a cell. It is considering becoming one."};
  const SECRET = { mean1: "You were not supposed to find that. It is empty. It is very well organised.", mean3: "We do not have an 8. Management is looking for one.", sandra: "Sandra from Compliance has opened this cell for review. The cell is locked and wants a lawyer.", eight: "You rounded the meaning to 8. Management has stamped it 'Provisional' and put it in a drawer.", gerald: "Gerald has joined the document (Read Only, With Gravitas)"};
  const CLOSE = { title: "Save changes to Meaning_Q3_DRAFT(2).xlsx before closing?", c3: "Close workbook? Save changes? Yes, No, Maybe, Cancel. All four have been chosen. The workbook stays open.", audit: "Irregularities found: 9. Eight are cells. The ninth is the vibe. Meaning: 7 1/2. Variance: a gentle shrug.", c5: "Congratulations. You have closed the quarter. The quarter has been opened again so you can close it better.", c6: "Everything has been saved. The workbook is closed. The workbook is open. The workbook was never not open. Welcome back."};
  const QQ = { q4: "Welcome back to Q4 Meaning Projections. Please enter your meaning in the highlighted cell. It is still highlighted in the sense that I looked at it.", q4b: "Q4 begins. Row 1 reads Purpose, Target, Actual. Actual now says 'slightly more'. Do not look into it.", q4c: "Please disregard the preceding minutes. Autosave has not saved them.", q5: "Q5 is on a different sheet.", q5b: "Sheet 7 3/4 has appeared. It has been waiting for Q5 the whole time. It is not a quarter. It is a feeling about one.", qn: "Q{count} begins. It is the same quarter. It is slightly more confident about it.", q75: "Q7 1/2 begins. There will be no Q8. Q7 1/2 is the quarter now, and from now on."};
  const SELFC = ["Please advice on the status of Tuesday.", "I did not authorise that edit. I authorised that edit."]; const CBF = { dennis: ['plantClicked', 'metDennis'], half: ['museum-of-objects.half', 'cloud-gazer.halfway'], stapler: ['metStapler'], toast: ['metToaster'], tues: ['fax-machine.tuesdayMoved'], rock: ['pet-rock.met', 'complaints-dept.rockMet'], sock: ['sock-matcher.home'] };

  P.registerModule({
    id: 'spreadsheet-meaning',
    title: 'Spreadsheet of Meaning',
    tagline: 'Every cell returns a feeling. The totals row is looking at you.',
    icon: '📊',
    category: 'game',
    unlockCost: 0,
    tags: ['spreadsheet', 'formulas', 'feelings'],
    mount(root, api) {
      const el = api.el, M = 'm:spreadsheet-meaning:', ST = 'spreadsheet-meaning.';
      const TS = api.selftest ? 0.1 : 1, IS = api.selftest ? 0.3 : 1;
      const COLS = 'ABCDEFGH'.split(''), ROWS = [1, 2, 3, 4, 5, 6, 7, 7.5, 8, 9, 10, 11, 12, 13];
      const JIT = [0, 2, -2, 3, -1, 2, -3, 1];
      const EMPTY = { empty: true };
      const AD = {};
      ROWS.forEach(function (r, ri) { COLS.forEach(function (c, ci) { AD[c + r] = { c: ci, ri: ri, r: r }; }); });
      const PREFILL = { A1: 'Purpose', B1: 'Target', C1: 'Actual', D1: 'Feeling', E1: 'Variance', F1: 'Lunch', G1: 'Meaning Total', H1: '7.5',
        A2: 'Morale', B2: '7', C2: '=HOPE()', D2: '=FEEL(B2)', E2: 'a gentle shrug', A3: 'Synergy', B3: '3', C3: '=HOPE()', D3: '=FEEL(B3)',
        A4: 'Tuesday', B4: '0', C4: '=HOPE()', D4: '=FEEL(B4)', A5: 'Socks', B5: '8', C5: '7 1/2', D5: '=FEEL(B5)', E5: 'one missing', 'A7.5': 'filed under 7 1/2',
        A13: 'Σ', B13: '=SUM(B2:B12)', C13: '=SUM(C2:C12)', D13: '=SUM(D2:D12)', E13: '=SUM(E2:E12)', F13: '=SUM(F2:F12)', G13: '=SUM(G2:G12)', H13: '7.5' };
      const Q = function (s) { return s.split(' ').filter(Boolean).map(function (w) { return 'm-spreadsheet-meaning-' + w; }).join(' '); };
      const hash = function (s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
      const fmtNum = function (n) { return (typeof n !== 'number' || !isFinite(n)) ? '0' : n === 7.5 ? '7 1/2' : String(Math.round(n * 100) / 100); };
      const safe = function (s) { return (typeof s === 'string' || typeof s === 'number') ? String(s).replace(/(^|[^A-Za-z])(NaN|undefined|null|\[object Object\])/g, '$1...') : ''; };
      const clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
      const labelOf = function (a) { return AD[a] ? a.charAt(0) + (AD[a].r === 7.5 ? '7 1/2' : String(AD[a].r)) : 'Z999'; };
      const sub = function (s, t) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return t && t[k] !== undefined ? String(t[k]) : m; }); };
      const numOf = function (s) { return /^\s*-?\d+(\.\d+)?\s*$/.test(s) ? parseFloat(s) : null; };
      /* ---------------- state ---------------- */
      let dead = false, mode = 'normal', viewName = 's1', cycle = 0, driftTick = 0, commitCount = 0, actions = 0, beatNext = 1;
      let t0 = api.now(), lastReveal = t0, clockSec = 0, lastInput = t0, bracing = false, okMode = false, readyIdx = 0;
      let sheets = { s1: { raw: Object.assign({}, PREFILL) }, s75: { raw: {} } };
      let res = {}, cycles = [], cycCells = new Set(), CTX = null, meaningAddr = '', s75Unlocked = false, s75Paid = false;
      let sel = { a: 'B2', r: 'B2' }, tabCell = null, editSrc = 'ed', editAddr = 'B2', undoStack = [], undoN = 0, redoN = 0, dayTimer = 0;
      let ovl = {}, snap = {}, fillPrev = {}, cmts = [], cmtIdx = 0, acCells = {}, acCount = 0, acSeen = {}, errSeen = {}, lastFormulas = [];
      let metGerald = false, tuesdayTyped = false, tuesdayOnce = false, acOpens = 0, acList = [], acHl = 0, acFrag = '', acOpen = false, tuesdayLate = false;
      let rev = {}, cycleMeh = 0, minuteLog = [], recalcN = 0, famIdx = 0, handsFirst = false, heartN = 0, hasHands = false, handsSay = 0;
      let quietHeard = api.save.get('quiet', []), dennisSec = api.save.get('dennisSec', 0), bestCycle = api.save.get('best', {});
      if (!Array.isArray(quietHeard)) quietHeard = [];
      quietHeard = quietHeard.filter(function (n, i, arr) { return typeof n === 'number' && n >= 0 && n < 12 && n % 1 === 0 && arr.indexOf(n) === i; });
      if (typeof dennisSec !== 'number' || !isFinite(dennisSec) || dennisSec < 0 || dennisSec > 1e8) dennisSec = 0;
      if (!bestCycle || typeof bestCycle !== 'object' || Array.isArray(bestCycle)) bestCycle = {};
      let quietAt = 0, quietBase = null, quietLine = '', quietTimers = [], intIdx = 0, quietFirst = quietHeard.length === 0;
      let silent = false, idleStage = 0, heatCount = 0, lastHeat = -1e9, titleOver = '';
      let fmtMode = 2, sorting = false, fillDrag = null, dragSel = null, wasSel = '', lastPtr = 'mouse', sameClick = [], halfShown = false, halfKey = false;
      let macro = { rec: false, ev: [], timers: [], lastPlay: -1e9 }, closeStage = 0, closeAt = 0, qPct = 0, spent = {}, viewers = 1, mothState = 0, mothSaid = false, mothCmt = false;
      let pv = { rows: ['Morale', 'Synergy'], cols: ['Tuesday'], n: 0, swing: false, fan: false, clicks: [], cooled: 0, spin: 0, habit: false, ft: 0 }, pvRaf = 0;
      let chart = { open: false, built: false, type: 'bar', title: 0, renamed: false, dots: [], toast: false, dennis: false, lastAward: -1e9, added: false, raf: 0 };
      let syncT = 0, spreadSet = {}, spreadDone = false, syncOpen = false, syncDone = false, unwound = false, edTyped = false, denBack = null;
      let toastN = 0, micro = [], microDone = {}, ghostCmt = false, denOpened = 0, denSession = false, dennisCount = 0, selfCorrected = false, hat = 0, bossOk = false;
      let reviewDone = false, rowDone = false, idleLongIdx = 0, complaintN = 0, undoOver = 0, strikeUntil = 0, resignN = 0, sortN = 0, chartN = 0, qmIdx = 0, heatLineN = 0, meetN = 0, meetOpen = false, meetAt = 240 * TS, meetTo = 0, idleViewers = false;
      const fnSeen = {}, own = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
      const GROWS = '28px repeat(7,30px) 16px repeat(5,30px) 34px';
      const heat = { rc: [], pv: [], en: [], all: [] };
      const PARSE = new Map();
      const cells = {};
      const dataKey = function () { return viewName === 's75' ? 's75' : 's1'; };
      const roView = function () { return viewName === 'hat' || viewName === 'q5'; };
      const isGrid = function () { return viewName === 's1' || viewName === 's75' || roView(); };
      const rawAt = function (a) { const v = sheets[dataKey()].raw[a]; return typeof v === 'string' ? v : ''; };
      const qLabel = function () { return cycle <= 0 ? 'Q3' : cycle <= 4 ? 'Q' + (3 + cycle) : 'Q7 1/2'; };
      const fileSafe = function () { return cycle <= 4 ? 'Q' + (3 + cycle) : 'Q7_1-2'; };
      const winTitle = function () { return wb.classList.contains(Q('narrow')) ? 'Spreadsheet of Meaning' : fileName() + ' - Spreadsheet of Meaning'; };
      const draftN = function () { return cycle + 2 >= 8 ? '7 1/2' : String(cycle + 2); };
      const fileName = function () { return 'Meaning_' + fileSafe() + '_DRAFT(' + (cycle + 2 >= 8 ? '7_1-2' : String(cycle + 2)) + ').xlsx'; };
      const fnTxt = function () { return fileName() + (resignN >= 3 ? ' (Consultant)' : ''); };
      /* ---------------- speech helpers (UI first, speech second) ---------------- */
      const quietOn = function () { return mode === 'quiet'; };
      function say(t, o) { o = o || {}; if (dead) return false; if (!o.force && (quietOn() || silent || api.now() < hushUntil)) return false; return api.say(safe(sub(t, { player: api.player.name, count: o.count, item: o.item })), o); }
      function sayR(cat, o) { o = o || {}; if (dead) return false; if (!o.force && (quietOn() || silent || api.now() < hushUntil)) return false; return api.sayRandom(M + cat, o); }
      function give(n, why) {
        if (!(n > 0)) return 0;
        if (cycleMeh + n > 50) n = Math.max(0, 50 - cycleMeh);
        if (n < 0.005) return 0;
        cycleMeh += n; api.award(n, why); return n;
      }
      let lastAct = -1e9;
      function act(n) { const t = api.now(); if (t - lastAct < 400) return; lastAct = t; actions += (n || 1); }
      function noteInput() {
        const now = api.now(), away = now - lastInput; lastInput = now;
        if (idleStage > 0) idleReturn(away);
      }
      function cbSay(kind, ms) {
        let on = false; try { on = CBF[kind].some(function (f) { return !!api.flag.get(f); }); } catch (e) { on = false; }
        if (on) api.setTimeout(function () { say(api.line(M + 'cb' + kind), { priority: 2 }); }, ms || 3000);
        return on;
      }
      /* ---------------- tokenizer, parser, evaluator (no eval) ---------------- */
      const REF = /^[A-H][0-9]{1,2}(\.5)?$/i;
      function normAddr(s) { const c = s.charAt(0).toUpperCase(), r = parseFloat(s.slice(1)); return c + String(r); }
      function tokenize(s) {
        const t = []; let i = 0;
        while (i < s.length) {
          const ch = s.charAt(i);
          if (/\s/.test(ch)) { i++; continue; }
          if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s.charAt(i + 1)))) { let j = i; while (j < s.length && /[0-9.]/.test(s.charAt(j))) j++; const v = parseFloat(s.slice(i, j)); if (!isFinite(v)) throw 0; t.push({ k: 'n', v: v }); i = j; continue; }
          if (ch === '"' || ch === '\'') { const j = s.indexOf(ch, i + 1); if (j < 0) throw 0; t.push({ k: 's', v: s.slice(i + 1, j) }); i = j + 1; continue; }
          if (/[A-Za-z_]/.test(ch)) { let j = i; while (j < s.length && /[A-Za-z0-9_.]/.test(s.charAt(j))) j++; t.push({ k: 'i', v: s.slice(i, j) }); i = j; continue; }
          const two = s.substr(i, 2);
          if (two === '<>' || two === '<=' || two === '>=') { t.push({ k: 'o', v: two }); i += 2; continue; }
          if ('+-*/&=<>():,'.indexOf(ch) >= 0) { t.push({ k: 'o', v: ch }); i++; continue; }
          throw 0;
        }
        return t;
      }
      function parse(src) {
        const tk = tokenize(src); let p = 0, depth = 0;
        const isO = function (v) { return tk[p] && tk[p].k === 'o' && tk[p].v === v; };
        const guard = function () { if (++depth > 40) throw 0; };
        function cmp() {
          const l = add(), t = tk[p];
          if (t && t.k === 'o' && ['=', '<>', '<', '>', '<=', '>='].indexOf(t.v) >= 0) { p++; return { k: 'bin', op: t.v, l: l, r: add() }; }
          return l;
        }
        function add() { let l = mul(); while (tk[p] && tk[p].k === 'o' && (tk[p].v === '+' || tk[p].v === '-' || tk[p].v === '&')) { const op = tk[p++].v; l = { k: 'bin', op: op, l: l, r: mul() }; } return l; }
        function mul() { let l = unary(); while (tk[p] && tk[p].k === 'o' && (tk[p].v === '*' || tk[p].v === '/')) { const op = tk[p++].v; l = { k: 'bin', op: op, l: l, r: unary() }; } return l; }
        function unary() { guard(); try { if (isO('-')) { p++; return { k: 'neg', e: unary() }; } return primary(); } finally { depth--; } }
        function primary() {
          const t = tk[p++];
          if (!t) throw 0;
          if (t.k === 'n') return { k: 'num', v: t.v };
          if (t.k === 's') return { k: 'str', v: t.v };
          if (t.k === 'o' && t.v === '(') { guard(); const e = cmp(); depth--; if (!isO(')')) throw 0; p++; return { k: 'par', e: e }; }
          if (t.k === 'i') {
            if (isO('(')) {
              p++; const args = [];
              if (!isO(')')) { guard(); args.push(cmp()); while (isO(',')) { p++; args.push(cmp()); } depth--; }
              if (!isO(')')) throw 0; p++;
              return { k: 'call', n: t.v.toUpperCase(), args: args };
            }
            if (REF.test(t.v)) {
              const a = normAddr(t.v); if (!AD[a]) throw 0;
              if (isO(':')) { p++; const t2 = tk[p++]; if (!t2 || t2.k !== 'i' || !REF.test(t2.v) || !AD[normAddr(t2.v)]) throw 0; return { k: 'range', a: a, b: normAddr(t2.v) }; }
              return { k: 'ref', a: a };
            }
            return { k: 'name', n: t.v };
          }
          throw 0;
        }
        const ast = cmp();
        if (p < tk.length) throw 0;
        return ast;
      }
      function calls(n, name) {
        if (!n || typeof n !== 'object') return false;
        if (n.k === 'call' && n.n === name) return true;
        return calls(n.e, name) || calls(n.l, name) || calls(n.r, name) || (n.args ? n.args.some(function (x) { return calls(x, name); }) : false);
      }
      function isArith(n) { return n.k === 'neg' || (n.k === 'bin' && '+-*/'.indexOf(n.op) >= 0) || (n.k === 'par' && isArith(n.e)); }
      function toStr(v) { if (v === EMPTY) return ''; if (typeof v === 'number') return fmtNum(v); if (Array.isArray(v)) return v.map(toStr).filter(Boolean).join(', '); if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE'; return String(v); }
      function num(v) {
        if (v === EMPTY) throw { err: '#PURPOSE?' };
        if (typeof v === 'number') return v;
        if (Array.isArray(v)) throw { err: '#MEH!' };
        const n = numOf(String(v)); if (n === null) throw { err: '#MEH!' };
        return n;
      }
      function braceCheck(a) { if (bracing && viewName !== 's75' && AD[a].r === 4) throw { err: '#TUESDAY!' }; }
      function rangeAddrs(a, b) {
        const A = AD[a], B = AD[b], out = [];
        for (let r = Math.min(A.ri, B.ri); r <= Math.max(A.ri, B.ri); r++) for (let c = Math.min(A.c, B.c); c <= Math.max(A.c, B.c); c++) out.push(COLS[c] + ROWS[r]);
        return out;
      }
      function valOf(r) { if (r.t === 'empty') return EMPTY; if (r.t === 'num') return r.v; if (r.t === 'cyc') return 0; if (r.t === 'err') throw { err: r.v }; return String(r.v); }
      function cellRes(a) {
        const C = CTX; if (C.memo[a]) return C.memo[a];
        const raw = sheets[dataKey()].raw[a]; let r;
        if (typeof raw !== 'string' || raw === '') r = { t: 'empty', v: '', disp: '' };
        else if (raw.charAt(0) !== '=') {
          const n = raw.charAt(0) === '\'' ? null : numOf(raw), tx = raw.charAt(0) === '\'' ? raw.slice(1) : raw;
          r = n === null ? { t: 'str', v: tx, disp: tx } : { t: 'num', v: n, disp: fmtNum(n) };
        }
        else {
          const i = C.vis.indexOf(a);
          if (i >= 0) { const cy = C.vis.slice(i); C.cycles.push(cy); cy.forEach(function (x) { C.cycSet.add(x); }); return { t: 'cyc', v: 0, disp: '(holding hands)' }; }
          C.vis.push(a); r = evalFormula(a, raw); C.vis.pop();
          if (C.cycSet.has(a)) r = { t: 'cyc', v: 0, disp: '(holding hands)' };
        }
        C.memo[a] = r; return r;
      }
      function evalFormula(a, raw) {
        let ast = PARSE.get(raw);
        if (ast === undefined) { try { ast = parse(raw.slice(1)); } catch (e) { ast = null; } PARSE.set(raw, ast); }
        if (!ast) return { t: 'err', v: '#MEH!', disp: '#MEH!' };
        CTX.sumTip = null;
        try { return mkRes(ev(ast, a), ast, raw); }
        catch (e) { const c = e && e.err ? e.err : '#MEH!'; return { t: 'err', v: c, disp: c }; }
      }
      function mkRes(v, ast, raw) {
        if (v === EMPTY) return { t: 'empty', v: '', disp: '' };
        if (Array.isArray(v)) return { t: 'str', v: 'a range of feelings', disp: 'a range of feelings' };
        if (typeof v === 'number') {
          if (!isFinite(v)) throw { err: '#MEH!' };
          let d = fmtNum(v);
          if (ast.k === 'num' && v === 42) d = 'Close. Try 42.5.';
          else if (isArith(ast)) d = raw.replace(/\s/g, '') === '=1+1' ? '2, with feelings' : d + ' (technically)';
          return { t: 'num', v: v, disp: d };
        }
        const s = toStr(v), k = ast.k === 'call' ? (ast.n === 'FEEL' ? 'feel' : ast.n === 'SUM' ? 'sum' : 'str') : 'str';
        return { t: k, v: s, disp: s, tip: k === 'sum' ? CTX.sumTip : ast.k === 'call' && ast.n === 'BOSS' ? 'Management is not in the sheet. Management is the sheet.' : '' };
      }
      function ev(n, a) {
        const C = CTX;
        if (++C.depth > 40) { C.depth--; throw { err: '#MEH!' }; }
        try {
          switch (n.k) {
            case 'num': return n.v;
            case 'str': return n.v;
            case 'par': return ev(n.e, a);
            case 'ref': braceCheck(n.a); return valOf(cellRes(n.a));
            case 'range': {
              if (!(bracing && AD[n.a].r === 4 && AD[n.b].r === 4)) return rangeAddrs(n.a, n.b).filter(function (x) { return !(bracing && viewName !== 's75' && AD[x].r === 4); }).map(function (x) { return valOf(cellRes(x)); });
              braceCheck(n.a); return [];
            }
            case 'name': throw { err: '#NAME?' };
            case 'neg': return -num(ev(n.e, a));
            case 'bin': {
              const l = ev(n.l, a), r = ev(n.r, a);
              if (n.op === '&') return toStr(l) + toStr(r);
              if (['=', '<>', '<', '>', '<=', '>='].indexOf(n.op) >= 0) {
                const ln = typeof l === 'number' && typeof r === 'number', x = ln ? l : toStr(l), y = ln ? r : toStr(r);
                return n.op === '=' ? x === y : n.op === '<>' ? x !== y : n.op === '<' ? x < y : n.op === '>' ? x > y : n.op === '<=' ? x <= y : x >= y;
              }
              const x = num(l), y = num(r);
              if (n.op === '/') { if (y === 0) throw { err: '#DIV/OH' }; return x / y; }
              const out = n.op === '+' ? x + y : n.op === '-' ? x - y : x * y;
              if (!isFinite(out)) throw { err: '#MEH!' };
              return out;
            }
            case 'call': return callFn(n, a);
          }
        } finally { C.depth--; }
        throw { err: '#MEH!' };
      }
      function callFn(n, a) {
        const arg = function (i) { return ev(n.args[i], a); };
        const flat = function () { let o = []; n.args.forEach(function (x, i) { const v = arg(i); o = o.concat(Array.isArray(v) ? v : [v]); }); return o; };
        switch (n.n) {
          case 'FEEL': {
            const x = n.args[0]; let rw = '';
            if (!x || x.k === 'range') throw { err: '#FEEL!' };
            if (x.k === 'ref') { braceCheck(x.a); cellRes(x.a); rw = rawAt(x.a); } else rw = toStr(ev(x, a));
            if (rw === '') throw { err: '#FEEL!' };
            return FEELINGS[hash(a + '|' + rw + '|' + driftTick) % 40];
          }
          case 'SUM': {
            const v = flat().filter(function (x) { return x !== EMPTY; });
            if (!v.length) throw { err: '#PURPOSE?' };
            const total = v.reduce(function (s, x) { return typeof x === 'number' ? s + x : s; }, 0);
            CTX.sumTip = 'Sum: ' + fmtNum(total) + ' (the cell would not say)';
            return VERDICTS[hash(a + rawAt(a) + driftTick) % 7];
          }
          case 'AVERAGE': flat(); return 'average-ish';
          case 'MAX': flat(); return 'Tuesday';
          case 'COUNT': return Math.ceil(flat().filter(function (x) { return x !== EMPTY; }).length / 2) + ' (some of them)';
          case 'COUNTIF': flat(); return 'plenty (7 1/2)';
          case 'IF': { if (n.args.length < 3) throw { err: '#MEH!' }; arg(0); return toStr(arg(1)) + ' / ' + toStr(arg(2)); }
          case 'VLOOKUP': flat(); return 'It was in the other room';
          case 'TODAY': return 'Tuesday';
          case 'NOW': return 'recently';
          case 'RAND': return 7.5;
          case 'SQRT': { const x = num(arg(0)); return x < 0 ? 'a reasonable concern' : 'about ' + fmtNum(Math.sqrt(x)) + ' (give or take)'; }
          case 'ROUND': { const m = n.args[0] && n.args[0].k === 'call' && n.args[0].n === 'MEANING'; if (n.args[0]) arg(0); return m ? '8' : 'mm'; }
          case 'HOPE': return '#PENDING';
          case 'DREAD': return 'Thursday, probably';
          case 'TOAST': return 'toast';
          case 'GERALD': if (!metGerald) throw { err: '#NAME?' }; return 'potato';
          case 'SOCK': throw { err: '#N/A-WELL' };
          case 'DENNIS': return '+0.3 cm';
          case 'BOSS': return 'Management is the sheet';
          case 'TUESDAY': return 'You came';
          case 'MEANING': return a === meaningAddr ? 'see Sheet 7 1/2' : '7 1/2';
          case 'YOU': if (!s75Unlocked) throw { err: '#YOU!' }; return safe(api.player.name);
        }
        throw { err: '#NAME?' };
      }
      function evalAll() {
        const ctx = { memo: {}, vis: [], cycSet: new Set(), cycles: [], depth: 0, sumTip: null };
        if (PARSE.size > 400) PARSE.clear();
        CTX = ctx; res = {};
        const raw = sheets[dataKey()].raw;
        ROWS.forEach(function (r) { COLS.forEach(function (c) { const a = c + r; if (typeof raw[a] === 'string' && raw[a] !== '') res[a] = cellRes(a); }); });
        cycles = ctx.cycles; cycCells = ctx.cycSet;
      }
      /* ---------------- DOM ---------------- */
      const wb = el('div', { class: Q('wb') });
      const fname = el('span', { class: Q('fname'), text: fileName() });
      const autoTxt = el('span', { text: 'Autosave: Saving...' });
      const rbBtn = {};
      [['recalc', 'Recalc', recalc], ['undo', 'Undo', undo], ['redo', 'Redo', redo], ['chart', 'Chart', toggleChart], ['format', 'Format', doFormat], ['sort', 'Sort by Vibes', doSort],
        ['rec', 'Record', macroRec], ['stop', 'Stop', macroStop], ['play', 'Play', macroPlay], ['close', 'Close Workbook', openClose]].forEach(function (d) {
        rbBtn[d[0]] = el('button', { type: 'button', hidden: true, onclick: function () { noteInput(); d[2](); } }, d[1]);
      });
      const fxBtn = el('button', { type: 'button', class: Q('fxbtn'), 'aria-expanded': 'false', onclick: function () { chips.classList.toggle(Q('open')); fxBtn.setAttribute('aria-expanded', chips.classList.contains(Q('open')) ? 'true' : 'false'); } }, 'Formula');
      const rb = el('div', { class: Q('rb'), role: 'toolbar', 'aria-label': 'Ribbon', hidden: true }, Object.keys(rbBtn).map(function (k) { return rbBtn[k]; }), fxBtn);
      const nameIn = el('input', { class: Q('nm'), type: 'text', 'aria-label': 'Name box', value: 'B2', spellcheck: false, autocomplete: 'off' });
      const fbar = el('input', { class: Q('fi'), type: 'text', 'aria-label': 'Formula input', placeholder: 'type a formula, or a feeling, or a Tuesday', spellcheck: false, autocomplete: 'off' });
      const acBox = el('div', { class: Q('ac'), role: 'listbox', hidden: true }, [0, 1, 2, 3, 4, 5].map(function (i) {
        return el('button', { type: 'button', tabindex: '-1', role: 'option', hidden: true, onmousedown: function (e) { e.preventDefault(); }, onclick: function () { acAccept(i); } });
      }));
      const fb = el('div', { class: Q('fb') }, nameIn, el('span', { class: Q('fxl'), 'aria-hidden': 'true', text: 'fx' }), fbar, acBox);
      const chips = el('div', { class: Q('chips'), role: 'group', 'aria-label': 'Formula chips', hidden: true });
      const ct = el('div', { class: Q('ct'), hidden: true });
      const edIn = el('input', { class: Q('ed'), type: 'text', 'aria-label': 'Cell editor', hidden: true, spellcheck: false, autocomplete: 'off' });
      const fh = el('div', { class: Q('fh'), hidden: true, 'aria-hidden': 'true' });
      const ghost = el('div', { class: Q('ghost'), hidden: true, 'aria-hidden': 'true' }, el('svg', { viewBox: '0 0 18 22', width: 18, height: 22 }, el('path', { d: 'M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z', fill: '#6b4ea8', stroke: '#2B2A33', 'stroke-width': 1.5 })), el('span', { text: 'Past You' }));
      const heart = el('div', { class: Q('heart'), hidden: true, 'aria-hidden': 'true' });
      const moth = el('div', { class: Q('moth'), hidden: true, 'aria-hidden': 'true' }, el('svg', { viewBox: '0 0 18 22', width: 18, height: 22 }, el('path', { d: 'M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z', fill: '#CDB8F0', stroke: '#6b4ea8', 'stroke-width': 1.5 })), el('span', { text: 'Anonymous Moth' }));
      const tcur = el('div', { class: Q('tcur'), hidden: true, 'aria-hidden': 'true', text: 'Anonymous Tuesday' });
      const g = el('div', { class: Q('g'), role: 'grid', 'aria-label': 'Meaning spreadsheet', 'aria-rowcount': String(ROWS.length + 1), 'aria-colcount': '8' });
      g.style.gridTemplateColumns = '40px ' + JIT.map(function (j) { return 'minmax(calc(var(--sm-w) + ' + j + 'px),1fr)'; }).join(' ');
      g.style.gridTemplateRows = GROWS;
      const hrow = el('div', { class: Q('row'), role: 'row' }, el('div', { class: Q('cn'), role: 'columnheader', 'aria-label': 'corner' }));
      COLS.forEach(function (c) { hrow.appendChild(el('div', { class: Q('ch'), role: 'columnheader', text: c })); });
      g.appendChild(hrow);
      ROWS.forEach(function (r) {
        const row = el('div', { class: Q('row'), role: 'row' });
        row.appendChild(el('div', { class: Q('rh') + (r === 7.5 ? ' ' + Q('hf') : '') + (r === 13 ? ' ' + Q('tr') : ''), role: 'rowheader', text: r === 7.5 ? '7 1/2' : String(r) }));
        COLS.forEach(function (c) {
          const a = c + r;
          cells[a] = el('div', { class: Q('c'), role: 'gridcell', tabindex: '-1', 'data-a': a, 'aria-label': labelOf(a) + ', empty' });
          row.appendChild(cells[a]);
        });
        g.appendChild(row);
      });
      g.appendChild(edIn); g.appendChild(fh); g.appendChild(ghost); g.appendChild(heart); g.appendChild(moth); g.appendChild(tcur);
      const gw = el('div', { class: Q('gw') }, g);
      const feelV = el('div', { class: Q('ov'), hidden: true, role: 'tabpanel', 'aria-label': 'Feelings' });
      const pvV = el('div', { class: Q('ov'), hidden: true, role: 'tabpanel', 'aria-label': 'Pivot' });
      const denV = el('div', { class: Q('ov'), hidden: true, role: 'region', 'aria-label': 'Dennis chart' });
      const stage = el('div', { class: Q('stage') }, gw, feelV, pvV, denV);
      const ftl = el('span', { class: Q('ftl'), 'aria-live': 'off' });
      const ftCount = el('span', { text: 'Quiet Totals: ' + quietHeard.length + '/12' });
      const prog = el('i', { class: Q('pr') });
      const qsr = el('span', { class: Q('sr'), 'aria-live': 'polite' });
      const ft = el('div', { class: Q('ft') }, ftl, ftCount, prog, qsr);
      const tabs = el('div', { class: Q('tabs'), role: 'tablist', 'aria-label': 'Sheets' });
      const tabDefs = {};
      const sbReady = el('span', { text: 'Ready' }), sbMid = el('span', { text: '', 'aria-live': 'polite', 'aria-atomic': 'true' }), sbComp = el('span', { text: 'Completeness: 61%', hidden: true });
      const sbQ = el('button', { type: 'button', text: 'Q3', onclick: function () { say(CAM.q); } });
      const sbDay = el('span', { text: 'Day: Thursday' });
      const sbClock = el('button', { type: 'button', title: '4:17 and always has been. The minute is 17 seconds long.', onclick: function () { say(CAM.clock); } });
      const qbI = el('i'), qbTxt = el('span', { text: 'Quarter Close' }), qbPct = el('span', { text: '0%' });
      const sbView = el('span', { text: 'People viewing: 1' });
      const fanIc = el('i', { class: Q('fan'), hidden: true, 'aria-hidden': 'true' });
      const acAcc = el('button', { type: 'button', hidden: true, onclick: function () { acReact(true); } }, 'Accept');
      const acIgn = el('button', { type: 'button', hidden: true, onclick: function () { acReact(false); } }, 'Ignore');
      const sb = el('div', { class: Q('sb') }, sbReady, sbMid, sbComp, sbQ, sbDay, sbClock, el('span', null, qbTxt, el('span', { class: Q('qb') }, qbI), qbPct), sbView, fanIc, acAcc, acIgn);
      const bub = el('div', { class: Q('bub'), hidden: true, role: 'tooltip' });
      const dlg = el('div', { class: Q('dlg'), hidden: true });
      const spanel = el('div', { class: Q('sp'), hidden: true });
      const hbFill = el('i');
      const hb = el('div', { class: Q('hb'), hidden: true }, el('i', { class: Q('hg'), 'aria-hidden': 'true' }), el('span', { text: 'Calculating... (the calculation is no)' }), el('b', null, hbFill));
      const qcard = el('div', { class: Q('qc'), hidden: true, 'aria-hidden': 'true' });
      stage.appendChild(hb); stage.appendChild(qcard);
      wb.appendChild(el('div', { class: Q('ts') }, el('span', { class: Q('dots'), 'aria-hidden': 'true' }, el('i'), el('i'), el('i')), fname, el('span', { class: Q('auto') }, el('i', { class: Q('spin'), 'aria-hidden': 'true' }), autoTxt)));
      [rb, fb, chips, ct, stage, ft, tabs, sb, bub, dlg, spanel].forEach(function (x) { wb.appendChild(x); });
      root.appendChild(wb);
      /* ---------------- render (patches only what changed) ---------------- */
      const last = {};
      function setOvl(a, text, ms, cls) {
        const until = api.now() + ms; ovl[a] = { text: text, until: until, cls: cls || '' };
        api.setTimeout(function () { if (ovl[a] && ovl[a].until <= api.now() + 5) { delete ovl[a]; render(); } }, ms + 20);
        render();
      }
      function inRange(a) {
        const A = AD[sel.a], B = AD[sel.r], X = AD[a];
        return X.c >= Math.min(A.c, B.c) && X.c <= Math.max(A.c, B.c) && X.ri >= Math.min(A.ri, B.ri) && X.ri <= Math.max(A.ri, B.ri);
      }
      function render() {
        if (dead) return;
        const now = api.now(), key = dataKey(), ro = roView(), multi = sel.a !== sel.r;
        for (const a in cells) {
          const X = AD[a], r = res[a], o = ovl[a] && ovl[a].until > now ? ovl[a] : null, sn = snap[a] && snap[a].until > now ? snap[a] : null;
          let d = '', cl = '', tip = '';
          if (bracing && key === 's1' && X.r === 4) { d = '(bracing)'; cl += ' br'; }
          else if (o) { d = o.text; cl += ' ' + o.cls; }
          else if (fillPrev[a] !== undefined) { d = fillPrev[a]; cl += ' fp'; }
          else if (sn) d = sn.text;
          else if (r) {
            if (r.t === 'cyc') { d = cycles.some(function (c) { return c.length === 1 && c[0] === a; }) ? '(holding itself)' : '(holding hands)'; cl += ' cy'; }
            else { d = r.disp; if (r.t === 'err') { cl += ' er'; if (okMode) d = '#OK'; if (r.v === '#NAME?') cl += ' ge'; } else if (r.t === 'num') cl += ' nu'; }
            if (r.t === 'feel' || r.t === 'sum') { tip = r.tip || r.disp; if (fmtMode === 0) cl += hash(a) % 2 ? ' tl' : ' tm'; }
            if (r.t === 'num' && fmtMode === 0 && r.v > 7.5) { cl += ' gy'; tip = d + ' (Cheerful (Grey))'; }
            if (fmtMode === 0 && rawAt(a).indexOf('DENNIS') >= 0) cl += ' tb';
            if (!tip && (r.t === 'err' || r.t === 'str') && r.tip) tip = r.tip;
            if (!tip && d) tip = d;
          }
          if (X.r === 1 && !(ovl[a])) cl += ' hd';
          if (X.r === 7.5) cl += ' hf';
          if (X.r === 13) cl += ' tr';
          if (acCells[a]) cl += ' ac1';
          if ((spreadSet[a] || cmts.some(function (c) { return c.addr === a; })) && key === 's1') cl += ' cm';
          if (a === 'A13' && rev.tot) cl += ' glow';
          if (a === gerAddr() && rev.gdot && !metGerald) cl += ' gd';
          if (inRange(a)) cl += a === sel.a ? ' sel' : ' rng';
          if (gerCells[a]) cl += ' tb';
          if (r && r.t === 'err' && altErr[a]) cl += ' alt';
          if (spent['bang:' + a] > now) cl += ' bang';
          if (spent['fl:' + a] > now) cl += ' fl';
          d = safe(d);
          const full = Q('c') + (cl ? ' ' + Q(cl) : '');
          const lab = labelOf(a) + ', ' + (d || 'empty');
          const L = last[a] || (last[a] = {});
          if (L.d !== d) { cells[a].textContent = d; L.d = d; }
          if (L.cl !== full) { cells[a].className = full; L.cl = full; }
          if (L.tip !== tip) { if (tip) cells[a].title = safe(tip); else cells[a].removeAttribute('title'); L.tip = tip; }
          if (L.lab !== lab) { cells[a].setAttribute('aria-label', lab); L.lab = lab; }
          const isSel = a === sel.a;
          if (L.sel !== isSel) { cells[a].tabIndex = isSel ? 0 : -1; cells[a].setAttribute('aria-selected', isSel ? 'true' : 'false'); L.sel = isSel; }
        }
        wb.classList.toggle(Q('ok'), okMode);
        wb.classList.toggle(Q('beige'), fmtMode === 1);
        wb.classList.toggle(Q('cmv'), ro);
        positionFh(); heartPos();
        if (multi) { const n = rangeAddrsSel().length, st = 'Count: ' + n + '  Sum: ' + FEELINGS[hash(sel.a + sel.r + 's' + driftTick) % 40] + '  Average: Tuesday'; if (sbMid.textContent !== st) sbMid.textContent = st; }
        else if (sbMid.textContent.indexOf('Count') === 0) sbMid.textContent = '';
      }
      function rangeAddrsSel() { return rangeAddrs(sel.a, sel.r); }
      function gerAddr() { return bracing ? 'G6' : 'G4'; }
      /* ---------------- selection, bars, comments ---------------- */
      let clip = '', bubT = 0, loopRecalcs = 0, meaningSeen = false, hushUntil = 0, acPending = -1, acSuppress = false, acPairT = 0;
      const chipSet = {}, gerCells = {}, altErr = {};
      const sbHands = el('button', { type: 'button', hidden: true, 'aria-label': 'Reread the circular reference note', onclick: function () { say(HANDS1, { force: true }); } }, '↻');
      sb.appendChild(sbHands);
      const sbMeet = el('button', { type: 'button', class: Q('pulse'), hidden: true, onclick: function () { noteInput(); attendMeeting(); } }); sb.appendChild(sbMeet);
      function mark(k, ms) { spent[k] = api.now() + ms; api.setTimeout(render, ms + 20); render(); }
      function cellOf(t) { while (t && t !== g) { if (t.dataset && t.dataset.a) return t.dataset.a; t = t.parentNode; } return null; }
      function cellFromPoint(x, y) { const t = root.ownerDocument.elementFromPoint(x, y); return t ? cellOf(t) : null; }
      function ensureVisible(c) {
        if (!c) return;
        const L = c.offsetLeft, T = c.offsetTop, W = c.offsetWidth, H = c.offsetHeight;
        if (L - gw.scrollLeft < 42) gw.scrollLeft = Math.max(0, L - 42); else if (L + W - gw.scrollLeft > gw.clientWidth) gw.scrollLeft = L + W - gw.clientWidth;
        if (T - gw.scrollTop < 30) gw.scrollTop = Math.max(0, T - 30); else if (T + H - gw.scrollTop > gw.clientHeight) gw.scrollTop = T + H - gw.clientHeight;
      }
      function focusCell(a) { const c = cells[a]; if (!c) return; try { c.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      function cmtAt(a) { for (let i = 0; i < cmts.length; i++) if (cmts[i].addr === a) return cmts[i]; return null; }
      function hideBubble() { bub.hidden = true; }
      function bubSel() { const c = viewName === 's1' ? cmtAt(sel.a) : null; if (c) showBubble(c); else hideBubble(); }
      function showBubble(c) {
        const ce = cells[c.addr]; if (!ce) return;
        const wr = wb.getBoundingClientRect(), r = ce.getBoundingClientRect();
        bub.textContent = safe(c.text); bub.hidden = false;
        bub.style.left = clamp(r.left - wr.left, 6, Math.max(6, wr.width - 240)) + 'px'; bub.style.top = Math.max(4, r.bottom - wr.top + 4) + 'px';
        if (!c.read) { c.read = true; give(0.2, 'comment'); }
        api.clearTimeout(bubT); bubT = api.setTimeout(hideBubble, 4000);
      }
      function addComment(a, text) {
        if (viewName !== 's1') return;
        cmts = cmts.filter(function (c) { return c.addr !== a; });
        let t = text;
        if (!t) { t = SANDRA[cmtIdx]; cmtIdx = cmtIdx >= 15 ? 8 : cmtIdx + 1; }
        cmts.push({ addr: a, text: t, read: false });
        while (cmts.length > 10) cmts.shift();
        render();
      }
      function syncBars() {
        nameIn.value = labelOf(sel.a);
        if (mode !== 'editing') fbar.value = rawAt(sel.a);
        fbar.readOnly = roView();
        bubSel();
      }
      function select(a, ext, how) {
        if (dead || !AD[a]) return;
        if (mode === 'locked' || mode === 'dialog') return;
        if (mode === 'editing') finishEdit(null);
        if (mode === 'dennis') closeDennis();
        if (mode === 'playing') stopPlay(false);
        if (mode === 'quiet' && (a !== 'A13' || ext)) cancelQuiet();
        if (ext) sel.r = a; else { sel.a = sel.r = a; }
        render(); syncBars(); ensureVisible(cells[a]);
        if (how !== 'noFocus') focusCell(a);
        if (!ext) onVisit(a, how);
      }
      function onVisit(a, how) {
        if (macro.rec && macro.ev.length < 12 && isGrid()) macro.ev.push({ type: 'visit', addr: a, text: '' });
        const X = AD[a];
        if (X.r === 7.5 && dataKey() === 's1') {
          if (how === 'key' && !halfKey) { halfKey = true; say(CAM.half3, { priority: 1 }); }
          else if (!halfShown) { halfShown = true; say(CAM.half1); }
          if (!rev.halfcb) { rev.halfcb = true; cbSay('half', 5500); }
        }
        if (a === 'A13' && viewName === 's1') {
          if (!rev.tot) { if (api.now() - (spent.notyet || 0) > 4000) { spent.notyet = api.now(); say(CAM.notyet); } }
          else if (mode !== 'quiet') startQuiet();
        }
        if (a === gerAddr() && rev.gdot && !metGerald && viewName === 's1') meetGerald();
      }
      function stepSel(dc, dr, ext) {
        const X = AD[ext ? sel.r : sel.a];
        select(COLS[clamp(X.c + dc, 0, 7)] + ROWS[clamp(X.ri + dr, 0, ROWS.length - 1)], ext, 'key');
      }
      function parseGoto(t) {
        t = String(t || '').trim().toUpperCase();
        if (t === 'Z999') return 'Z999';
        const m = /^([A-H])\s*(\d{1,2})(?:\s*(\.5|1\/2))?$/.exec(t); if (!m) return null;
        const a = m[1] + String(parseInt(m[2], 10) + (m[3] ? 0.5 : 0));
        return AD[a] ? a : null;
      }
      function gotoText(t) {
        const a = parseGoto(t);
        if (a === 'Z999') { openDennis(); return; }
        if (a) { if (!isGrid()) showView('s1'); select(a, false, 'key'); } else nameIn.value = labelOf(sel.a);
      }
      /* ---------------- editing ---------------- */
      function edPos() { const ce = cells[editAddr]; if (!ce) return; edIn.style.left = ce.offsetLeft + 'px'; edIn.style.top = ce.offsetTop + 'px'; edIn.style.width = Math.max(ce.offsetWidth, 130) + 'px'; edIn.style.height = ce.offsetHeight + 'px'; }
      function curEdit() { return (editSrc === 'fbar' ? fbar : edIn).value; }
      function startEdit(initial, src) {
        if (dead || roView() || !isGrid() || mode === 'locked' || mode === 'dialog') return;
        if (mode === 'editing') { if (src) editSrc = src; return; }
        if (mode === 'quiet') cancelQuiet();
        if (mode === 'dennis') closeDennis();
        if (mode === 'playing') stopPlay(false);
        mode = 'editing'; editSrc = src || 'ed'; editAddr = sel.a; edTyped = initial !== null && initial !== undefined;
        const v = initial === null || initial === undefined ? rawAt(sel.a) : initial;
        edIn.value = v; fbar.value = v;
        if (editSrc === 'ed') { edPos(); edIn.hidden = false; edIn.focus(); } else fbar.focus();
        try { (editSrc === 'ed' ? edIn : fbar).setSelectionRange(v.length, v.length); } catch (e) { /* ignore */ }
        positionFh(); acSuppress = false; acUpdate();
      }
      function endEdit() { mode = 'normal'; edIn.hidden = true; acHide(); focusCell(sel.a); positionFh(); }
      function cancelEdit() { if (mode !== 'editing') return; endEdit(); fbar.value = rawAt(sel.a); }
      function finishEdit(dir) {
        if (mode !== 'editing') return;
        const v = curEdit(), a = editAddr, was = rawAt(a);
        endEdit();
        if ((v !== was || (edTyped && v !== '')) && !(v !== '' && v.trim() === '')) commit(a, v);
        fbar.value = rawAt(sel.a);
        if (dir) stepSel(dir === 'right' ? 1 : dir === 'left' ? -1 : 0, dir === 'down' ? 1 : dir === 'up' ? -1 : 0, false);
      }
      function editKey(e) {
        const k = e.key;
        if (mode === 'normal' && !roView() && e.target === fbar && (String(k).length === 1 || k === 'Backspace' || k === 'Delete')) startEdit(fbar.value, 'fbar');
        if (mode !== 'editing') return;
        if ((e.ctrlKey || e.metaKey) && String(k).toLowerCase() === 'z') { e.preventDefault(); undo(); return; }
        if (k === 'F9') { e.preventDefault(); recalc(); return; }
        if (k === 'Enter') { e.preventDefault(); heatEvent('en'); finishEdit(e.shiftKey ? 'up' : 'down'); }
        else if (k === 'Tab') { if (e.target === fbar && !edTyped && !acOpen) { mode = 'normal'; edIn.hidden = true; acHide(); positionFh(); return; } e.preventDefault(); if (acOpen) acAccept(acHl); else finishEdit(e.shiftKey ? 'left' : 'right'); }
        else if (k === 'Escape') { e.preventDefault(); cancelEdit(); }
        else if ((k === 'ArrowDown' || k === 'ArrowUp') && acOpen) { e.preventDefault(); acHl = (acHl + (k === 'ArrowDown' ? 1 : acList.length - 1)) % acList.length; acPaint(); }
      }
      /* ---------------- autocomplete and chips ---------------- */
      const FN_ZERO = { HOPE: 1, TODAY: 1, NOW: 1, RAND: 1, TUESDAY: 1, TOAST: 1, GERALD: 1, SOCK: 1, DENNIS: 1, BOSS: 1, DREAD: 1, MEANING: 1, YOU: 1 };
      function fnList() {
        const l = ['FEEL', 'SUM', 'IF', 'AVERAGE', 'MAX', 'COUNT', 'COUNTIF', 'VLOOKUP', 'TODAY', 'NOW', 'RAND', 'SQRT', 'ROUND', 'HOPE', 'DREAD', 'BOSS'];
        if (rev.mac) l.push('TOAST', 'GERALD', 'SOCK');
        if (rev.dennis) l.push('DENNIS');
        if (rev.tot) l.push('MEANING');
        if (s75Unlocked) l.push('YOU');
        return l;
      }
      function acHide() { acOpen = false; acBox.hidden = true; }
      function acPaint() {
        const bs = acBox.children;
        for (let i = 0; i < bs.length; i++) {
          bs[i].hidden = i >= acList.length;
          if (i < acList.length) { bs[i].textContent = acList[i] + (FN_ZERO[acList[i]] ? '()' : '('); bs[i].classList.toggle(Q('hl'), i === acHl); bs[i].setAttribute('aria-selected', i === acHl ? 'true' : 'false'); }
        }
      }
      function acUpdate() {
        const v = mode === 'editing' ? curEdit() : '';
        let list = [], frag = '';
        if (mode === 'editing' && rev.chips && !acSuppress && v.charAt(0) === '=') {
          const m = /(^|[=(+\-*\/&,<>:])\s*([A-Za-z_]*)$/.exec(v);
          if (m) {
            frag = m[2]; const up = frag.toUpperCase();
            if (!tuesdayTyped || (tuesdayLate && !tuesdayOnce)) list.push('TUESDAY');
            fnList().forEach(function (fn) { if (fn.indexOf(up) === 0 && list.length < 6 && list.indexOf(fn) < 0) list.push(fn); });
          }
        }
        if (!list.length) { acHide(); return; }
        const was = acOpen, fm = frag ? list.findIndex(function (fn) { return fn.indexOf(frag.toUpperCase()) === 0; }) : -1;
        acList = list; acFrag = frag; acOpen = true; acHl = fm >= 0 ? fm : 0;
        acPaint(); acBox.style.left = fbar.offsetLeft + 'px'; acBox.style.top = (fbar.offsetTop + fbar.offsetHeight + 2) + 'px'; acBox.hidden = false;
        if (!was && list[0] === 'TUESDAY') {
          acOpens++;
          if (tuesdayTyped) { tuesdayOnce = true; say("Autocomplete suggests =TUESDAY(). Just the once. It did not expect you to need it."); }
          else if (acOpens === 1 || (api.stat.get(ST + 'formulas') >= 24 ? acOpens % 3 === 0 : acOpens % 6 === 0)) sayR('tuesday', { count: acOpens * 4 + 3 });
        }
      }
      function setBoth(v, src) { edIn.value = v; fbar.value = v; (src === 'ed' ? edIn : fbar).focus(); try { (src === 'ed' ? edIn : fbar).setSelectionRange(v.length, v.length); } catch (e) { /* ignore */ } }
      function acAccept(i) {
        const name = acList[i]; if (!name || mode !== 'editing') return;
        const v = curEdit(), nv = v.slice(0, v.length - acFrag.length) + name + (FN_ZERO[name] ? '()' : '(');
        acSuppress = true; setBoth(nv, editSrc); acHide(); api.sfx('pop');
      }
      function insertText(t) {
        if (roView() || !isGrid() || mode === 'dialog' || mode === 'locked') return;
        if (mode !== 'editing') startEdit('', 'fbar');
        if (mode !== 'editing') return;
        const inp = editSrc === 'fbar' ? fbar : edIn, v = inp.value, s = typeof inp.selectionStart === 'number' ? inp.selectionStart : v.length;
        const nv = v.slice(0, s) + t + v.slice(s); acSuppress = false;
        setBoth(nv, editSrc); try { inp.setSelectionRange(s + t.length, s + t.length); } catch (e) { /* ignore */ } acUpdate();
      }
      function addChip(t, fn) {
        if (chipSet[t]) return; chipSet[t] = 1;
        chips.appendChild(el('button', { type: 'button', class: Q('pop'), onclick: function () { noteInput(); if (fn) fn(); else insertText(t); } }, t));
      }
      /* ---------------- autocorrect ---------------- */
      function autocorrect(text) {
        const nm = String(api.player.name || ''), esc = nm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const rep = function (re, to, kind) { return text.search(re) >= 0 ? { text: text.replace(re, to), kind: kind } : null; };
        let out = null;
        if (acCount === 0) out = rep(/\bteh\b/gi, 'the', 0) || rep(/\brecieve\b/gi, 'receive', 0) || rep(/\bthe\b/gi, 'the', 0);
        else if (acCount === 1) out = rep(/\bthe\b/gi, 'teh', 1);
        else out = rep(/\bprofit\b/gi, 'feelings', 2) || rep(/\bsynergy\b(?! \(sadder\))/gi, 'synergy (sadder)', 3) || rep(/\bmeeting\b/gi, 'nap', 4) || (nm.length > 1 ? rep(new RegExp(esc + '(?! \\(Draft\\))', 'gi'), 'Valued Employee (Draft)', 5) : null);
        if (out) { acCount++; acPending = out.kind; }
        return out;
      }
      function acAnnounce(a) {
        const k = acPending; acPending = -1; acCells[a] = true; render();
        if (k >= 0 && !acSeen[k]) { acSeen[k] = true; say(AC[k], { mood: 'smug', priority: 1 }); } else sayR('ac', { mood: 'smug' });
        acAcc.hidden = false; acIgn.hidden = false; api.clearTimeout(acPairT);
        acPairT = api.setTimeout(function () { acAcc.hidden = true; acIgn.hidden = true; }, 5000);
      }
      function acReact(accept) {
        acCells = {}; acAcc.hidden = true; acIgn.hidden = true; give(0.1, 'autocorrect'); api.sfx('pop');
        say(accept ? ACC : IGN, { mood: 'smug' }); render();
      }
      /* ---------------- commit pipeline ---------------- */
      function isProt(a) { return viewName === 's1' && (a === 'H1' || a === 'H13' || a === 'A13' || (AD[a].r === 13 && AD[a].c >= 1 && AD[a].c <= 6)); }
      function pushUndo(key, a, prev) { undoStack.push({ k: key, a: a, p: prev }); if (undoStack.length > 40) undoStack.shift(); }
      function commit(a, text, o) {
        o = o || {};
        if (dead || roView() || !AD[a]) return;
        text = String(text === null || text === undefined ? '' : text); if (text.length > 400) text = text.slice(0, 400);
        const key = dataKey(), raw = sheets[key].raw;
        if (isProt(a) && o.ghost) return;
        if (isProt(a)) {
          if (text.trim() === '') { if (a === 'H1') sayR('meaning'); return; }
          snap[a] = { text: text, until: api.now() + 600 }; api.setTimeout(render, 640); render(); sayR('meaning'); act(); api.sfx('boing'); return;
        }
        const prev = raw[a], pd = {};
        for (const k in res) pd[k] = res[k].disp;
        const ripple = function () { if (o.quiet || o.ghost) return; let n = 0; for (const k in res) if (k !== a && pd[k] !== undefined && pd[k] !== res[k].disp) { spent['fl:' + k] = api.now() + 320; n++; } if (n) api.setTimeout(render, 360); };
        if (!o.ghost) pushUndo(key, a, prev);
        if (macro.rec && !o.ghost && !o.quiet && macro.ev.length < 12) macro.ev.push({ type: 'commit', addr: a, text: text });
        if (text === '') { delete raw[a]; delete acCells[a]; evalAll(); ripple(); render(); syncBars(); if (!o.quiet) sayR('del', { item: labelOf(a), count: commitCount }); return; }
        const isF = text.charAt(0) === '=';
        let ac = null;
        if (!isF && !o.ghost && !o.quiet && rev.ac) ac = autocorrect(text);
        if (ac) text = ac.text;
        if (isF && /MEANING\s*\(/i.test(text) && !/ROUND\s*\(/i.test(text) && !meaningAddr && !meaningSeen) meaningAddr = a;
        raw[a] = text;
        const hadCyc = cycCells.size > 0;
        evalAll(); ripple(); render(); syncBars();
        if (o.ghost || o.quiet) return;
        react(a, text, isF, ac, hadCyc, o);
      }
      function react(a, text, isF, ac, hadCyc, o) {
        const r = res[a] || { t: 'empty', disp: '' }, ast = isF ? PARSE.get(text) : null, now = api.now(), low = text.trim().toLowerCase();
        commitCount++; act(); api.stat.inc(ST + 'commits'); api.achieve(ST + 'first');
        mark('fl:' + a, 320);
        const verb = !isF ? (numOf(text) !== null ? 'number' : 'text') : r.t === 'err' ? 'error' : r.t === 'feel' ? 'feel' : 'formula';
        if (isF) { api.stat.inc(ST + 'formulas'); lastFormulas.push(text); if (lastFormulas.length > 5) lastFormulas.shift(); }
        if (verb === 'feel') { api.stat.inc(ST + 'feelings'); if (api.stat.get(ST + 'feelings') >= 10) api.achieve(ST + 'feelings'); }
        if (verb === 'error') { api.stat.inc(ST + 'errors'); if (api.chance(1 / 40)) altErr[a] = true; else delete altErr[a]; }
        minuteLog = minuteLog.filter(function (x) { return now - x.t < 60000; });
        const sum = minuteLog.reduce(function (s, x) { return s + x.v; }, 0);
        const pay = (verb === 'number' || verb === 'text' ? 0.2 : verb === 'formula' ? 0.5 : verb === 'feel' ? 0.6 : 0.8) * clamp(1 - sum / 8, 0.1, 1);
        minuteLog.push({ t: now, v: pay }); give(pay, 'commit');
        api.sfx(verb === 'error' ? 'error' : verb === 'feel' ? 'bloop' : 'blip');
        if (verb === 'text' && text.length > 80) { say(CAM.over, { item: labelOf(a), priority: 1 }); cells[a].style.overflow = 'visible'; api.setTimeout(function () { cells[a].style.overflow = ''; }, 3000); }
        let spoke = false;
        if (low === 'sandra') { spoke = true; sandraReview(a); }
        else if (low === 'gerald') { spoke = true; geraldTyped(a); }
        else if (ast && calls(ast, 'MEANING')) { spoke = meaningFound(a, ast); }
        else if (ast && calls(ast, 'TUESDAY') && !tuesdayTyped) { spoke = true; tuesdayTyped = true; say("=TUESDAY() returned 'You came'. Autocomplete will not be suggesting it again. Autocomplete is, quietly, done.", { priority: 1, mood: 'smug' }); api.setTimeout(function () { tuesdayLate = true; }, 600000 * TS); }
        else if (ast && calls(ast, 'TOAST')) { spoke = true; const met = api.flag.get('toasterMet'); say(toastN > 0 ? CAM.toast2 : met ? CAM.toast3 : CAM.toast1, { priority: 1 }); if (!toastN) cbSay('toast', 4500); toastN++; if (!met) api.flag.set('toasterMet', true); chartSeries('toast'); } // lint-ignore
        else if (ast && calls(ast, 'SOCK')) { spoke = true; say(CAM.sock, { priority: 1, mood: 'confused' }); }
        else if (ast && calls(ast, 'DENNIS')) { spoke = true; chartSeries('dennis'); say(CAM.den3, { priority: 1 }); }
        else if (!isF && /^(i\s+)?(quit|resign(ation)?)\.?$/.test(low)) { spoke = true; resigned(a); }
        else if (!isF && (low === '7 1/2' || low === '7.5') && AD[a].r === 7.5 && viewName === 's1') { spoke = true; halfSelf(a); }
        else if (!isF && own(WORDS, low)) { spoke = true; say(WORDS[low], { priority: 1 }); }
        else if (isF && own(FORMEG, text.replace(/\s/g, '').toUpperCase()) && (r.t !== 'err' || errSeen[r.v])) { spoke = true; say(FORMEG[text.replace(/\s/g, '').toUpperCase()], { priority: 1 }); }
        if (!spoke && isF && !hadCyc && cycCells.size > 0) spoke = handsStart();
        if (!spoke && verb === 'error') {
          spoke = true;
          if (!errSeen[r.v]) { errSeen[r.v] = true; say(ERRDEF[r.v] || ERRDEF['#MEH!'], { mood: 'confused', priority: 1 }); }
          else if (r.v === '#NAME?') sayR('namegerald', { mood: 'confused' });
          else sayR('errmore', { mood: 'confused', item: labelOf(a), count: api.stat.get(ST + 'errors') });
          mark('fl:' + a, 400);
        }
        if (!spoke && isF && ast && ast.k === 'call' && own(FNL, ast.n) && !fnSeen[ast.n]) { spoke = true; fnSeen[ast.n] = true; say(FNL[ast.n], { priority: 1 }); }
        if (!spoke && o && o.feel) { spoke = true; sayR('feel', { item: text }); }
        const tk = { item: labelOf(a), count: commitCount };
        if (!spoke) {
          if (verb === 'number') sayR('num', tk); else if (verb === 'text') { if (ac) acAnnounce(a); else sayR('txt', tk); }
          else if (verb === 'feel') sayR('feel', { item: r.disp }); else if (ast && ast.k === 'call' && ast.n === 'SUM') sayR('sumv'); else sayR('fx', tk);
        }
        if (ac && spoke) acAnnounce(a);
        if (AD[a].r === 7.5 && viewName === 's1' && verb !== 'error' && low !== '7 1/2' && low !== '7.5') say(CAM.half2);
        if (rev.cmt && viewName === 's1' && commitCount % 6 === 0) { addComment(a); sayR('cmt'); api.sfx('pop'); }
        if (rev.dennis && viewName === 's1' && api.chance(1 / 90)) replyAll(a);
        if (api.chance(1 / 150)) sockFound();
        if (verb !== 'error' && api.chance(1 / 110)) cellRetires(a);
        else if (api.chance(api.flag.get('metStapler') ? 1 / 55 : 1 / 130)) staplerStrike();
        if (sum >= 7 && now - (spent.fat || -1e9) > 25000) { spent.fat = now; api.setTimeout(function () { sayR('fatigue', { mood: 'disappointed', priority: 1 }); }, 1500); }
        if (verb === 'feel' && api.chance(1 / 60)) goldFeeling(a);
        if (commitCount % 7 === 0 && rev.comp) { sbComp.textContent = 'Completeness: 62%'; api.setTimeout(function () { sbComp.textContent = 'Completeness: 61%'; }, 800); }
        if (rev.s75 && !selfCorrected && viewName === 's1') { selfCorrected = true; api.setTimeout(function () { say(SELFC[0], { priority: 1 }); api.setTimeout(function () { say(SELFC[1], { priority: 1, mood: 'confused' }); }, 2000); }, 3200); }
      }
      function goldFeeling(a) {
        setOvl(a, RARE[api.randInt(0, 5)], 4000, 'gold'); give(5, 'rare feeling'); api.sfx('tada'); api.confetti();
        const c = { addr: a, text: 'Please do not tell the other cells.', read: true }; showBubble(c); api.setTimeout(bubSel, 4000);
      }
      function sockFound() {
        const pool = Object.keys(cells).filter(function (a) { return AD[a].r !== 1 && a.charAt(0) !== 'A'; });
        const a = api.pick(pool); if (!a) return;
        setOvl(a, '🧦', 3000, ''); give(5, 'found sock'); api.sfx('tada'); api.flag.set('sockSeen', true); say(CAM.sock3, { priority: 2, mood: 'proud' }); // lint-ignore
      }
      function cellRetires(a) { setOvl(a, '🎂 retired', 5000, 'br'); give(2, 'retirement'); api.sfx('tada'); api.confetti(); sayR('retire', { item: labelOf(a), count: commitCount, mood: 'proud', priority: 1 }); }
      function staplerStrike() {
        if (api.now() < strikeUntil || !isGrid()) return;
        const a = api.pick(Object.keys(cells).filter(function (x) { return AD[x].r !== 1 && AD[x].r !== 13 && x.charAt(0) !== 'A'; })); if (!a) return;
        strikeUntil = api.now() + 6000; setOvl(a, '📎 on strike', 6000, 'br'); api.sfx('honk'); sayR('strike', { item: labelOf(a), count: commitCount, priority: 1 });
        api.setTimeout(function () { say(STRIKEB, { priority: 1 }); }, 6200);
      }
      function resigned(a) {
        resignN++; api.sfx('stamp'); setOvl(a, '(resigning)', 3000, 'br'); say(RESIGN[Math.min(resignN, 3) - 1], { priority: 2, mood: resignN < 3 ? 'confused' : 'proud' });
        if (resignN === 3) { api.achieve(ST + 'resign'); give(7.5, 'resignation'); api.confetti(); api.sfx('fanfare'); fname.textContent = fnTxt(); }
      }
      function flg(n) { try { return !!api.flag.get(n); } catch (e) { return false; } }
      function nextMeet() { meetAt = (api.now() - t0) / 1000 + 90 * TS; }
      function offerMeeting() {
        const m = MEET[meetN % MEET.length]; meetOpen = true; sbMeet.textContent = '📅 ' + m[0] + (cycle ? ' (again)' : ''); sbMeet.hidden = false; api.sfx('bell'); say(m[1], { priority: 2 });
        if (meetN === 0) cbSay('rock', 6000); else if (meetN === 1) cbSay('sock', 6000);
        api.clearTimeout(meetTo); meetTo = api.setTimeout(function () { if (meetOpen) { meetOpen = false; sbMeet.hidden = true; meetN++; nextMeet(); give(0.5, 'absence'); say(m[3], { priority: 1 }); } }, 30000 * TS);
      }
      function attendMeeting() {
        if (!meetOpen) return;
        const m = MEET[meetN % MEET.length], hold = 7500 * TS, nth = ++meetN; meetOpen = false; sbMeet.hidden = true; api.clearTimeout(meetTo); nextMeet();
        hushUntil = api.now() + hold - 60; act(); api.sfx('tick'); api.stat.inc(ST + 'meetings'); api.achieve(ST + 'meeting');
        ftl.textContent = MWHO + (flg('pet-rock.met') || flg('complaints-dept.rockMet') ? MCAM.rock : '') + (flg('sock-matcher.home') ? MCAM.sock : '') + (flg('cafeteria.closed') ? MCAM.cafe : '');
        api.setTimeout(function () {
          if (ftl.textContent.indexOf('Attendees') === 0) ftl.textContent = '';
          give(2, 'meeting'); api.sfx('bell'); say(m[2], { priority: 2, mood: 'proud' });
          if (nth === 3) api.setTimeout(function () { say(MCAM.stapler, { priority: 1 }); }, 3600);
        }, hold);
      }
      function replyAll(a) {
        const c = api.pick(Object.keys(cells).filter(function (x) { return AD[x].r !== 1 && AD[x].r !== 13 && x !== a; })); if (!c) return;
        setOvl(c, '🌿 reply-all', 4500, 'br'); give(3, 'reply-all'); api.sfx('pop'); api.stat.inc(ST + 'replyalls'); sayR('replyall', { mood: 'proud', priority: 1 });
      }
      function setHalf(px) { g.style.gridTemplateRows = GROWS.replace('16px', px); positionFh(); heartPos(); if (mode === 'editing') edPos(); }
      function halfSelf(a) {
        setOvl(a, '½ of ½', 6000, 'gold'); api.achieve(ST + 'halfhalf'); give(7.5, 'half of half'); api.sfx('fanfare'); api.confetti(); say(HALFH[0], { priority: 2, mood: 'proud' });
        api.setTimeout(function () { say(HALFH[1], { priority: 1, mood: 'confused' }); }, 4200);
        if (qPct < 0.93) { setHalf('8px'); api.setTimeout(function () { if (qPct < 0.93 && !rowDone) setHalf('16px'); }, 6000); }
      }
      function sandraReview(a) {
        setOvl(a, '🔒 under review', 6000, 'br'); say(SECRET.sandra, { priority: 2, mood: 'confused' }); api.achieve(ST + 'sandra'); api.sfx('stamp');
        while (spanel.firstChild) spanel.removeChild(spanel.firstChild);
        const ul = el('ul'); (cmts.length ? cmts.slice(-10) : [{ text: '(none yet. Sandra is composing.)' }]).forEach(function (c) { ul.appendChild(el('li', { text: safe(c.text) })); });
        spanel.appendChild(el('b', { text: 'Sandra: all comments' })); spanel.appendChild(ul); spanel.hidden = false;
        api.setTimeout(function () { spanel.hidden = true; }, 6000);
      }
      function sandraSpread() {
        spreadDone = true; say(SPREADX[0], { priority: 2, mood: 'panic' }); hushUntil = api.now() + (api.selftest ? 2500 : 11000);
        const mine = spreadSet = {}, list = api.shuffle(Object.keys(cells).filter(function (a) { return a !== 'H6'; })), per = Math.ceil(list.length / 16), gap = api.selftest ? 60 : 320;
        sbMid.textContent = 'Sandra: see Row 4.'; api.sfx('pop');
        for (let i = 0; i < 16; i++) api.setTimeout(function () { if (spreadSet !== mine) return; list.slice(i * per, (i + 1) * per).forEach(function (a) { mine[a] = true; }); render(); if (i === 5 || i === 11) sbMid.textContent = SANDRA[i === 5 ? 3 : 14]; }, 400 + i * gap);
        api.setTimeout(function () {
          if (spreadSet !== mine) return; spreadSet = {}; if (sbMid.textContent.indexOf('Sandra') === 0) sbMid.textContent = '';
          setOvl('H6', '🌱 Dennis (Plant)', 9000, 'br'); give(5, 'sandra spread'); api.sfx('tada'); api.confetti(); say(SPREADX[1], { force: true, priority: 2, mood: 'proud' }); render();
        }, 400 + 17 * gap + 1200);
      }
      function geraldTyped(a) {
        gerCells[a] = true; metGerald = true; api.flag.set('metGerald', true); sbMid.textContent = SECRET.gerald; api.sfx('honk');
        api.setTimeout(function () { if (sbMid.textContent === SECRET.gerald) sbMid.textContent = ''; }, 6000);
        say(CAM.gerM, { priority: 2 }); api.setTimeout(function () { say(CAM.ger1, { who: 'Gerald', priority: 1 }); }, 2500); render();
      }
      function meetGerald() {
        const was = metGerald; metGerald = true; api.flag.set('metGerald', true); rev.gdot = false; api.sfx('honk'); render();
        say(was ? CAM.ger2 : CAM.ger1, { who: 'Gerald', priority: 1 });
      }
      function meaningFound(a, ast) {
        if (calls(ast, 'ROUND') && ast.args && ast.args[0] && ast.args[0].k === 'call' && ast.args[0].n === 'MEANING') {
          say(SECRET.mean3, { priority: 2, mood: 'confused' }); api.setTimeout(function () { say(SECRET.eight, { priority: 1 }); }, 3500); return true;
        }
        if (meaningSeen) return true;
        meaningSeen = true; unlockS75(true); give(5, 'meaning'); api.flag.set(ST + 'meaning', true); api.achieve(ST + 'cartographer'); api.sfx('bell');
        wb.style.setProperty('--sm-halfc', '#D4A017'); hushUntil = api.now() + 3000;
        api.setTimeout(function () { say(SECRET.mean1, { priority: 2, mood: 'confused' }); }, 3000);
        return true;
      }
      function handsStart() {
        hasHands = true; heartN = 0; loopRecalcs = 0; sbHands.hidden = false;
        if (!handsFirst) { handsFirst = true; give(5, 'circular'); api.achieve(ST + 'hands'); api.sfx('tada'); say(HANDS1, { priority: 1 }); }
        else sayR('hands', { count: heartN, priority: 1 });
        return true;
      }
      function heartPos() {
        if (!hasHands) { heart.hidden = true; return; }
        if (!cycCells.size) { hasHands = false; heart.hidden = true; return; }
        const cy = cycles[0], a = cy[0], b = cy[1] || cy[0], ca = cells[a], cb = cells[b];
        if (!ca || !cb || !isGrid()) { heart.hidden = true; return; }
        heart.hidden = false; heart.textContent = '♥ ' + Math.min(99, heartN);
        heart.style.left = ((ca.offsetLeft + cb.offsetLeft) / 2 + 20) + 'px'; heart.style.top = ((ca.offsetTop + cb.offsetTop) / 2 - 4) + 'px';
      }
      function clearSel() {
        if (roView() || !isGrid()) return;
        let h1 = false;
        rangeAddrsSel().forEach(function (a) { if (isProt(a)) { h1 = h1 || a === 'H1'; return; } if (rawAt(a) !== '') commit(a, '', { quiet: true }); });
        evalAll(); render(); syncBars(); act(); api.sfx('pop');
        if (h1) sayR('meaning'); else sayR('del', { item: labelOf(sel.a), count: commitCount });
      }
      /* ---------------- undo, redo, recalc, overheat ---------------- */
      function dayUndone() { sbDay.textContent = 'Day: (undone)'; api.clearTimeout(dayTimer); dayTimer = api.setTimeout(function () { sbDay.textContent = 'Day: Thursday (restored, probably)'; }, 4000); }
      function undo() {
        if (dead || mode === 'locked' || mode === 'dialog') return;
        act(); heatEvent('ui'); if (mode === 'locked') return;
        if (api.now() < strikeUntil) { say(STRIKEU, { priority: 1 }); return; }
        if (undoN >= 10) { rbBtn.undo.setAttribute('aria-disabled', 'true'); undoOver++; if (undoOver === 1 && !unwound) unwind(); else if (undoOver <= 2) say(UNDOX[1], { mood: 'disappointed' }); else sayR('undone', { mood: 'disappointed', count: undoOver }); return; }
        const e = undoStack.pop();
        if (!e) { say(CAM.undo0); return; }
        if (mode === 'editing') cancelEdit();
        undoN++; api.stat.inc(ST + 'undos'); api.sfx('bloop');
        const raw = sheets[e.k].raw; if (e.p === undefined) delete raw[e.a]; else raw[e.a] = e.p;
        evalAll(); render(); syncBars();
        if (undoN >= 10) rbBtn.undo.setAttribute('aria-disabled', 'true');
        if (undoN >= 4 && undoN % 2 === 0) { dayUndone(); say(UNDOX[0]); } else sayR('undo', { count: undoN });
      }
      function unwind() {
        unwound = true; endMode(); mode = 'locked'; act(); api.sfx('whoosh'); say(UNWX[0], { priority: 2, mood: 'confused' });
        const list = [], T = api.selftest ? 600 : 2400, H = api.selftest ? 300 : 3200, keep = fname.textContent; ROWS.slice().reverse().forEach(function (r) { COLS.slice().reverse().forEach(function (c) { if (res[c + r]) list.push(c + r); }); });
        const step = Math.max(1, Math.ceil(list.length / 60)), n = list.length || 1; fname.textContent = 'Meaning_Q2_DRAFT(1).xlsx';
        list.forEach(function (a, i) { api.setTimeout(function () { ovl[a] = { text: '', until: api.now() + 1e9, cls: '' }; if (i % step === 0 || i === n - 1) render(); }, i * T / n); api.setTimeout(function () { delete ovl[a]; if (i % step === 0 || i === n - 1) render(); }, T + H + (n - 1 - i) * T / n); });
        api.setTimeout(function () { if (mode === 'locked') mode = 'normal'; fname.textContent = keep.replace(/ \*$/, ''); give(2, 'unwound'); api.sfx('bell'); say(UNWX[1], { priority: 2, mood: 'proud' }); render(); syncBars(); }, 2 * T + H + 60);
      }
      function redo() { if (dead || mode === 'dialog') return; heatEvent('ui'); if (mode === 'locked') return; redoN++; act(); api.sfx('sad'); if (redoN === 15) say(REDO15, { mood: 'disappointed', priority: 1 }); else sayR('redo', { mood: 'disappointed', count: redoN }); }
      function flickerAll() {
        const now = api.now(); Object.keys(res).forEach(function (a) { if (res[a].t === 'feel' || res[a].t === 'sum') spent['fl:' + a] = now + 300; });
        api.setTimeout(render, 340);
      }
      function recalc() {
        if (dead || mode === 'locked' || mode === 'dialog') return;
        recalcN++; heatEvent('rc'); if (mode === 'locked') return;
        const now = api.now();
        driftTick++; evalAll(); flickerAll(); render(); act(); api.stat.inc(ST + 'recalcs'); api.sfx('tick');
        if (now - (spent.rcAward || -1e9) > 1500) { spent.rcAward = now; give(0.2, 'recalc'); }
        if (recalcN === 10) say(RECALC10, { count: recalcN }); else if (recalcN === 50) say(RECALC50, { priority: 1 }); else sayR('recalc', { count: recalcN });
        if (hasHands) { loopRecalcs++; if (loopRecalcs >= 3 && famIdx < FAMILY.length) api.setTimeout(function () { say(FAMILY[famIdx++]); }, 1800); }
      }
      function heatEvent(kind) {
        if (dead || mode === 'locked' || mode === 'dialog') return;
        const now = api.now(), push = function (arr, w) { arr.push(now); while (arr.length && now - arr[0] > w) arr.shift(); return arr.length; };
        const all = push(heat.all, 3000);
        const hot = kind === 'rc' ? push(heat.rc, 10000) >= 25 : kind === 'pv' ? push(heat.pv, 2000) >= 14 : kind === 'en' ? push(heat.en, 5000) >= 30 : false;
        if (hot || all >= 12) overheat();
      }
      function overheat() {
        if (mode === 'dialog' || mode === 'locked') return;
        endMode(); mode = 'locked';
        heat.rc.length = heat.pv.length = heat.en.length = heat.all.length = 0;
        const now = api.now(), ms = api.selftest ? 400 : 3000;
        heatCount++; act(); wb.classList.add(Q('heat')); fanIc.hidden = false; hb.hidden = false;
        hbFill.style.transition = 'none'; hbFill.style.width = '0%'; void hbFill.offsetWidth; hbFill.style.transition = 'width ' + ms + 'ms linear'; hbFill.style.width = '100%';
        api.award(-3, 'calculation fee'); api.sfx('buzz'); sbReady.textContent = 'Calculating...';
        if (heatCount === 1) say(SPAMX[0], { mood: 'panic', priority: 1 }); else sayR('heatn', { mood: 'panic', priority: 1, count: heatCount });
        api.setTimeout(function () { if (heatCount === 1) say(SPAMX[1], { mood: 'panic' }); else sayR('spam', { mood: 'panic' }); }, 1600);
        if (heatCount >= 3) { titleOver = 'Sheet'; api.setTitle(titleOver); api.setTimeout(function () { say(SPAMX[4], { priority: 1 }); }, 3200); }
        else if (now - lastHeat < 60000) { titleOver = 'Sheet (Not Responding, But Feeling It)'; api.setTitle(titleOver); api.setTimeout(function () { say(SPAMX[3], { priority: 1 }); }, 3200); }
        lastHeat = now;
        api.setTimeout(function () { if (mode === 'locked') unlock(); }, ms);
      }
      function unlock() {
        wb.classList.remove(Q('heat')); fanIc.hidden = true; hb.hidden = true; if (mode === 'locked') mode = 'normal';
        sbReady.textContent = 'Ready'; if (heatCount > 1) sayR('recover', { priority: 1 }); else say(SPAMX[2], { priority: 1 }); render();
      }
      function endMode() {
        if (mode === 'editing') cancelEdit();
        else if (mode === 'quiet') cancelQuiet();
        else if (mode === 'playing') stopPlay(false);
        else if (mode === 'dennis') closeDennis();
        else if (mode === 'locked') unlock();
      }
      /* ---------------- tabs and views ---------------- */
      let curTab = 's1', fillPlan = [];
      const used = {};
      const reduced = function () { return !!(root.closest && root.closest('.pm-reduce-motion')) || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); };
      function mkTab(id, label, title, hidden) {
        const b = el('button', { type: 'button', role: id === 'plus' ? 'button' : 'tab', 'aria-selected': id === 'plus' ? null : id === 's1' ? 'true' : 'false', title: title || null, hidden: !!hidden, onclick: function () { noteInput(); if (id === 'plus') addHat(); else showView(id); } }, label);
        tabs.appendChild(b); tabDefs[id] = b; return b;
      }
      function revealTab(id) { const b = tabDefs[id]; if (!b || !b.hidden) return; b.hidden = false; b.classList.remove(Q('pop')); void b.offsetWidth; b.classList.add(Q('pop')); lastReveal = api.now(); }
      function addHat() {
        if (hat >= 2 || dead) return;
        hat++; const id = 'hat' + hat;
        mkTab(id, 'Sheet' + (hat + 1) + ' 🎩', 'Sheet1 with a hat'); tabs.appendChild(tabDefs.plus); say(CAM.hat); if (hat >= 2) tabDefs.plus.hidden = true; showView(id);
      }
      function unlockS75(via) { s75Unlocked = true; s75Via = s75Via || via; revealTab('s75'); evalAll(); render(); }
      let s75Via = false;
      function seedS75() {
        const r = sheets.s75.raw;
        r.A1 = '=YOU()'; r.B1 = 'your formulas in column B'; r.C1 = 'already known'; r.H13 = 'Σ: present';
        for (let i = 0; i < 5; i++) { const k = 'B' + (2 + i); if (lastFormulas[i]) r[k] = '\'' + lastFormulas[i]; else delete r[k]; }
      }
      function showView(id) {
        if (dead || mode === 'locked' || mode === 'dialog' || !tabDefs[id]) return;
        if (mode === 'editing') cancelEdit();
        if (mode === 'quiet') cancelQuiet();
        if (mode === 'dennis') closeDennis();
        if (mode === 'playing') stopPlay(false);
        const view = id.indexOf('hat') === 0 ? 'hat' : id;
        viewName = view; curTab = id;
        gw.hidden = !isGrid(); feelV.hidden = view !== 'feel'; pvV.hidden = view !== 'pivot'; denV.hidden = true; gw.inert = false;
        if (view === 'feel') buildFeel();
        if (view === 'pivot') buildPivot();
        if (view === 's75') seedS75();
        Object.keys(tabDefs).forEach(function (k) { if (k !== 'plus') tabDefs[k].setAttribute('aria-selected', k === id ? 'true' : 'false'); });
        if (isGrid()) { evalAll(); render(); syncBars(); }
        sbReady.textContent = view === 's75' ? 'Ready, spiritually' : 'Ready';
        if (view === 's75' && !s75Paid) { s75Paid = true; give(s75Via ? 10 : 5, 'sheet 7 1/2'); api.sfx('bell'); }
        if (view === 'pivot' && pv.fan && !pvRaf && !reduced()) pvRaf = api.requestAnimationFrame(spinFrame);
        api.sfx('whoosh');
      }
      function buildFeel() {
        if (feelV.firstChild) return;
        feelV.appendChild(el('b', { text: 'Feelings (click one to hand it to the selected cell)' }));
        const box = el('div', { class: Q('fv') });
        FEELINGS.forEach(function (f) { box.appendChild(el('button', { type: 'button', onclick: function () { noteInput(); if (mode === 'locked' || mode === 'dialog') return; showView('s1'); commit(sel.a, f, { feel: true }); } }, f)); });
        feelV.appendChild(box);
      }
      /* ---------------- fill handle ---------------- */
      function positionFh() {
        const A = AD[sel.a], B = AD[sel.r], ok = rev.fill && mode === 'normal' && (viewName === 's1' || viewName === 's75') && Math.max(A.ri, B.ri) < 13;
        if (!ok) { fh.hidden = true; return; }
        const c = cells[COLS[Math.max(A.c, B.c)] + ROWS[Math.max(A.ri, B.ri)]];
        fh.hidden = false; fh.style.left = (c.offsetLeft + c.offsetWidth - 7) + 'px'; fh.style.top = (c.offsetTop + c.offsetHeight - 7) + 'px';
      }
      function shiftRefs(f, dr, dc) {
        return f.replace(/\b([A-Ha-h])(\d{1,2}(?:\.5)?)\b/g, function (m, c, r) {
          const ci = c.toUpperCase().charCodeAt(0) - 65 + dc, ri = ROWS.indexOf(parseFloat(r));
          return ri < 0 || ci < 0 || ci > 7 || ri + dr < 0 || ri + dr > 13 ? m : COLS[ci] + ROWS[ri + dr];
        });
      }
      function predict(seeds, k, dr, dc) {
        const last = seeds[seeds.length - 1], nums = seeds.map(numOf);
        if (nums.every(function (n) { return n !== null; })) {
          const step = nums.length >= 2 ? nums[nums.length - 1] - nums[nums.length - 2] : 1; let cur = nums[nums.length - 1];
          for (let i = 0; i < k; i++) cur = (step === 1 && cur === 7) ? 7.5 : (step === 1 && cur === 7.5) ? 8 : cur + step;
          return String(Math.round(cur * 100) / 100);
        }
        if (last.charAt(0) === '=') return shiftRefs(last, dr * k, dc * k);
        if (/^hunger$/i.test(last)) return k === 1 ? 'slightly more hunger' : k === 2 ? 'noticeably more hunger' : 'noticeably more hunger (rumor)';
        const base = last.replace(/ \((probably|allegedly|rumor|rumor of a rumor)\)$/, '');
        return base + (k === 1 ? ' (probably)' : k === 2 ? ' (allegedly)' : k === 3 ? ' (rumor)' : ' (rumor of a rumor)');
      }
      function fillCompute(tgt) {
        const A = AD[fillDrag.a], B = AD[fillDrag.r], T = AD[tgt];
        const c0 = Math.min(A.c, B.c), c1 = Math.max(A.c, B.c), r0 = Math.min(A.ri, B.ri), r1 = Math.max(A.ri, B.ri);
        const dr = T.ri - r1, dc = T.c - c1; fillPrev = {}; fillPlan = []; fillDrag.past = false;
        if (dr <= 0 && dc <= 0) { render(); return; }
        if (dr >= dc) {
          const to = Math.min(T.ri, 12); fillDrag.past = T.ri >= 13;
          for (let c = c0; c <= c1; c++) {
            const seeds = []; for (let r = r0; r <= r1; r++) seeds.push(sheets[dataKey()].raw[COLS[c] + ROWS[r]] || '');
            if (!seeds.some(Boolean)) continue;
            for (let r = r1 + 1; r <= to; r++) { const a = COLS[c] + ROWS[r]; if (isProt(a)) continue; fillPlan.push({ a: a, t: predict(seeds, r - r1, 1, 0) }); }
          }
        } else {
          for (let r = r0; r <= r1; r++) {
            const seeds = []; for (let c = c0; c <= c1; c++) seeds.push(sheets[dataKey()].raw[COLS[c] + ROWS[r]] || '');
            if (!seeds.some(Boolean)) continue;
            for (let c = c1 + 1; c <= T.c; c++) { const a = COLS[c] + ROWS[r]; if (isProt(a)) continue; fillPlan.push({ a: a, t: predict(seeds, c - c1, 0, 1) }); }
          }
        }
        fillPlan = fillPlan.slice(0, 60);
        const prevN = Object.keys(fillPrev).length;
        fillPlan.forEach(function (p) { fillPrev[p.a] = safe(p.t); });
        if (Object.keys(fillPrev).length !== prevN) api.sfx('tick');
        render();
      }
      function clearFillPrev() { if (Object.keys(fillPrev).length) { fillPrev = {}; fillPlan = []; render(); } }
      function fillRelease() {
        const d = fillDrag, plan = fillPlan; fillDrag = null; fillPlan = []; fillPrev = {};
        if (!d || !plan.length || roView()) { render(); return; }
        let lastA = '';
        plan.forEach(function (p) { commit(p.a, p.t, { quiet: true }); lastA = p.a; });
        sel.r = lastA; render(); syncBars();
        give(Math.min(plan.length * 0.1, 3), 'fill'); act(); used.fill = true; api.stat.inc(ST + 'fills'); api.sfx('pop');
        if (d.past) say(FILLX[2], { priority: 1 }); else if (plan.length <= 2) say(FILLX[0]); else if (plan.length >= 7) say(FILLX[1]); else sayR('fill', { count: plan.length, item: labelOf(lastA) });
      }
      function onFhDown(e) {
        noteInput(); if (mode !== 'normal') return;
        e.preventDefault(); e.stopPropagation(); fillDrag = { a: sel.a, r: sel.r, past: false }; fillPlan = [];
        try { fh.setPointerCapture(e.pointerId); } catch (er) { /* synthetic events have no active pointer */ }
      }
      /* ---------------- chart of nothing ---------------- */
      const CHT = ['Untitled Chart', 'Revenue From Staring', 'Hope Over Time (Time Not Provided)', 'Nothing vs. Nothing (Q?)'];
      let chTitleIn = null, chShapes = null, chDotsG = null, chLeg = null, chToastDot = null, chDenLine = null, chSvg = null, chEyes = [];
      function svgEl(tag, at, kid) { return el(tag, at, kid || null); }
      function buildChart() {
        chart.built = true;
        chTitleIn = el('input', { type: 'text', 'aria-label': 'Chart title', value: CHT[0], maxlength: '60', onchange: function () {
          if (!chart.renamed && chTitleIn.value.trim() && chTitleIn.value !== CHT[chart.title]) { chart.renamed = true; give(0.5, 'chart title'); say(CHARTX.title, { priority: 1 }); }
        } });
        const btn = function (t, fn) { return el('button', { type: 'button', onclick: function () { noteInput(); fn(); } }, t); };
        const ctr = el('div', { class: Q('ctr') }, chTitleIn, btn('retitle', retitle), btn('Bar of Nothing', function () { setType('bar'); }), btn('Line of Nothing', function () { setType('line'); }),
          btn('Pie of Nothing', function () { setType('pie'); }), btn('Donut', function () { setType('donut'); }), btn('Use selection', function () { addToChart(rangeAddrsSel()); }), btn('Collapse', toggleChart));
        const kids = [];
        [20, 57, 94, 131].forEach(function (y) { kids.push(svgEl('line', { x1: 40, y1: y, x2: 340, y2: y, stroke: '#E3D5B8', 'stroke-width': 1 })); });
        [0, 2, 4, 6, 7, 8, 10].forEach(function (v) { const x = 40 + v * 30; kids.push(svgEl('line', { x1: x, y1: 20, x2: x, y2: 131, stroke: '#EFE6CF', 'stroke-width': 1 })); kids.push(svgEl('text', { x: x, y: 143, 'text-anchor': 'middle', 'font-size': 8, fill: '#4A4854' }, String(v))); });
        kids.push(svgEl('line', { x1: 40, y1: 131, x2: 340, y2: 131, stroke: '#2B2A33', 'stroke-width': 2 })); kids.push(svgEl('line', { x1: 40, y1: 20, x2: 40, y2: 131, stroke: '#2B2A33', 'stroke-width': 2 }));
        kids.push(svgEl('text', { x: 265, y: 154, 'text-anchor': 'middle', 'font-size': 8, 'font-weight': 700, fill: '#2B2A33' }, '7 1/2'));
        kids.push(svgEl('text', { x: 190, y: 167, 'text-anchor': 'middle', 'font-size': 9, fill: '#2B2A33' }, 'Nothing'));
        kids.push(svgEl('text', { x: 11, y: 75, 'text-anchor': 'middle', 'font-size': 9, fill: '#2B2A33', transform: 'rotate(-90 11 75)' }, 'Also Nothing'));
        chShapes = svgEl('g'); kids.push(chShapes);
        kids.push(svgEl('line', { x1: 40, y1: 131, x2: 340, y2: 131, stroke: '#6b4ea8', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }));
        kids.push(svgEl('text', { x: 46, y: 28, 'font-size': 8, fill: '#2B2A33' }, 'Correlation: 1.00')); kids.push(svgEl('text', { x: 336, y: 28, 'text-anchor': 'end', 'font-size': 8, fill: '#6b4ea8' }, 'Trend: eventually (R-squared: sure)'));
        chDenLine = svgEl('polyline', { points: '40,131 120,110 200,84 280,60 340,40', fill: 'none', stroke: '#3d7a3d', 'stroke-width': 2.5, visibility: 'hidden' }); kids.push(chDenLine);
        chToastDot = svgEl('circle', { cx: 130, cy: 131, r: 4, fill: '#D9A441', stroke: '#2B2A33', visibility: 'hidden' }, svgEl('title', null, '(nothing, nothing)')); kids.push(chToastDot);
        chDotsG = svgEl('g'); kids.push(chDotsG);
        for (let i = 0; i < 12; i++) { const c = svgEl('circle', { cx: 0, cy: 0, r: 3, fill: '#CDB8F0', stroke: '#2B2A33', 'stroke-width': 1, visibility: 'hidden' }); chDotsG.appendChild(c); chart.dots.push({ el: c, live: false, x: 0, y: 0, age: 0 }); }
        [300, 320].forEach(function (x) { const p = svgEl('circle', { cx: x, cy: 50, r: 3, fill: '#2B2A33' }); chEyes.push({ x: x, y: 50, p: p }); kids.push(svgEl('circle', { cx: x, cy: 50, r: 7, fill: '#fff', stroke: '#2B2A33', 'stroke-width': 1.5 })); kids.push(p); });
        chSvg = el('svg', { viewBox: '0 0 360 170', role: 'img', 'aria-label': 'Chart of Nothing against Also Nothing' }, kids);
        chLeg = el('div', { class: Q('lg') });
        ct.appendChild(ctr); ct.appendChild(chSvg); ct.appendChild(chLeg);
        paintShapes(); legend();
      }
      function paintShapes() {
        while (chShapes.firstChild) chShapes.removeChild(chShapes.firstChild);
        const T = chart.type, tip = function () { return svgEl('title', null, '(nothing, nothing)'); };
        if (T === 'bar') [60, 110, 160, 210, 260].forEach(function (x) { chShapes.appendChild(svgEl('rect', { x: x - 9, y: 129.5, width: 18, height: 1.5, fill: '#6b4ea8' }, tip())); chShapes.appendChild(svgEl('text', { x: x, y: 124, 'text-anchor': 'middle', 'font-size': 7, fill: '#4A4854' }, '0 (proud)')); });
        else if (T === 'line') chShapes.appendChild(svgEl('path', { d: 'M40 131 L340 131', stroke: '#6b4ea8', 'stroke-width': 3, fill: 'none' }, tip()));
        else if (T === 'pie') { chShapes.appendChild(svgEl('circle', { cx: 190, cy: 80, r: 40, fill: '#CDB8F0', stroke: '#2B2A33', 'stroke-width': 2 }, tip())); chShapes.appendChild(svgEl('text', { x: 190, y: 83, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: '#2B2A33' }, 'Nothing 100%')); }
        else { chShapes.appendChild(svgEl('circle', { cx: 190, cy: 80, r: 34, fill: 'none', stroke: '#CDB8F0', 'stroke-width': 20 }, tip())); chShapes.appendChild(svgEl('text', { x: 190, y: 83, 'text-anchor': 'middle', 'font-size': 7, fill: '#2B2A33' }, 'the hole is the data')); }
      }
      function legend() {
        chLeg.textContent = '';
        chLeg.appendChild(el('span', { text: 'Series 1 (absent)' }));
        if (chart.toast) chLeg.appendChild(el('span', { text: 'Toast' }));
        if (chart.dennis) chLeg.appendChild(el('span', { text: 'Dennis (Plant): Competent' }));
        chToastDot.setAttribute('visibility', chart.toast ? 'visible' : 'hidden'); chDenLine.setAttribute('visibility', chart.dennis ? 'visible' : 'hidden');
      }
      function chartSeries(which) {
        if (which === 'toast' && !chart.toast) { chart.toast = true; if (chart.built) { legend(); if (chart.open) say(CHARTX.toast); } }
        if (which === 'dennis' && !chart.dennis) { chart.dennis = true; if (chart.built) { legend(); if (chart.open) say(CHARTX.dennis); } }
      }
      function setType(t) { chart.type = t; paintShapes(); act(); api.sfx('pop'); say(CHARTX[t]); }
      function retitle() { chart.title = (chart.title + 1) % 4; chTitleIn.value = CHT[chart.title]; act(); api.sfx('blip'); if (chart.title) say(CHARTX['t' + chart.title]); }
      function toggleChart() {
        if (dead || !rev.chart) return;
        if (!chart.built) buildChart();
        chart.open = !chart.open; ct.hidden = !chart.open; rbBtn.chart.classList.remove(Q('pulse')); api.sfx('whoosh');
        if (chart.open) { act(); used.chart = true; api.stat.inc(ST + 'charts'); say(CHARTX.open, { priority: 1 }); }
      }
      function inChart(e) { const r = ct.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; }
      function addToChart(addrs) {
        if (!chart.open || !chart.built) return;
        const now = api.now(), n = Math.min(addrs.length, 12);
        for (let i = 0; i < n; i++) spawnDot();
        if (now - chart.lastAward > 2000) { chart.lastAward = now; give(0.3, 'chart'); }
        if (!chart.added) { chart.added = true; api.achieve(ST + 'chart'); api.confetti(); }
        act(); used.chart = true; api.sfx('boing'); if (++chartN === 10) say(CHARTX.ten, { priority: 1 }); else sayR('chart');
        if (reduced()) { chart.dots.forEach(function (d) { d.live = false; d.el.setAttribute('visibility', 'hidden'); }); } else if (!chart.raf) chart.raf = api.requestAnimationFrame(chartFrame);
      }
      function spawnDot() {
        let d = chart.dots.filter(function (x) { return !x.live; })[0];
        if (!d) d = chart.dots.slice().sort(function (a, b) { return b.age - a.age; })[0];
        d.live = true; d.age = 0; d.x = 170 + api.rand() * 40; d.y = 100 + api.rand() * 12; d.el.setAttribute('visibility', 'visible');
      }
      function chartFrame(ts) {
        chart.raf = 0; if (dead) return;
        const dt = clamp((ts - (chart.lastTs || ts)) / 1000, 0, 0.05); chart.lastTs = ts; let live = 0;
        chart.dots.forEach(function (d) {
          if (!d.live) return;
          d.age += dt; if (d.age < 1.6) { d.x += 26 * dt; d.y -= 22 * dt; } else d.x -= 70 * dt;
          d.el.setAttribute('cx', d.x.toFixed(1)); d.el.setAttribute('cy', d.y.toFixed(1));
          if (d.x < 40 || d.y < 20) { d.live = false; d.el.setAttribute('visibility', 'hidden'); } else live++;
        });
        if (live) chart.raf = api.requestAnimationFrame(chartFrame); else chart.lastTs = 0;
      }
      function eyes(e) {
        if (!chSvg || !chart.open) return;
        const r = chSvg.getBoundingClientRect(); if (!r.width) return;
        chEyes.forEach(function (ey) {
          const dx = e.clientX - (r.left + ey.x * r.width / 360), dy = e.clientY - (r.top + ey.y * r.width / 360), d = Math.hypot(dx, dy) || 1, k = Math.min(3, d) / d;
          ey.p.setAttribute('cx', (ey.x + dx * k).toFixed(1)); ey.p.setAttribute('cy', (ey.y + dy * k).toFixed(1));
        });
      }
      /* ---------------- pivot, and its ceiling fan ---------------- */
      const BV = { Morale: 7, Synergy: 3, Tuesday: 0 };
      let pvTable = null, pvFan = null, pvCount = null, pvCooled = null, pvWells = null, pvBlades = [];
      function buildPivot() {
        if (pvTable) return;
        pvTable = el('div', { class: Q('pvt'), role: 'button', tabindex: '0', 'aria-label': 'Pivot table. Activate to pivot.', onclick: function () { pivotClick(); }, onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pivotClick(); } } });
        pvBlades = [0, 1, 2, 3].map(function (i) { return el('i'); });
        pvFan = el('div', { class: Q('cfan'), hidden: true, role: 'button', tabindex: '0', 'aria-label': 'Ceiling fan. Activate to pivot.', onclick: function () { pivotClick(); }, onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pivotClick(); } } }, pvBlades);
        pvCount = el('span', { text: 'Pivots: 0 (a table may pivot at most 7 1/2 times)' });
        pvCooled = el('span', { text: 'Cooled: 0 cells (none were warm)' });
        pvWells = el('div', { class: Q('wells') });
        pvV.appendChild(el('b', { text: 'PivotTable of Meaning' })); pvV.appendChild(pvWells);
        pvV.appendChild(el('div', { class: Q('pvs') }, pvTable, pvFan)); pvV.appendChild(pvCount); pvV.appendChild(pvCooled);
        pvRender();
      }
      function pvChip(name) {
        const from = pv.rows.indexOf(name) >= 0 ? pv.rows : pv.cols, to = from === pv.rows ? pv.cols : pv.rows;
        from.splice(from.indexOf(name), 1); to.push(name); pvRender(); api.sfx('pop'); act();
      }
      function pvRender() {
        if (!pvTable) return;
        while (pvTable.firstChild) pvTable.removeChild(pvTable.firstChild);
        const R = pv.rows.length ? pv.rows : ['(none)'], C = pv.cols.length ? pv.cols : ['(none)'];
        pvTable.style.gridTemplateColumns = 'repeat(' + (C.length + 1) + ', auto)';
        pvTable.appendChild(el('span', { class: Q('ph'), text: 'Σ' }));
        C.forEach(function (c) { pvTable.appendChild(el('span', { class: Q('ph'), text: c })); });
        R.forEach(function (r) { pvTable.appendChild(el('span', { class: Q('ph'), text: r })); C.forEach(function (c) { pvTable.appendChild(el('span', { text: BV[r] !== undefined && BV[c] !== undefined ? fmtNum(BV[r] * BV[c]) : '0' })); }); });
        while (pvWells.firstChild) pvWells.removeChild(pvWells.firstChild);
        [['Rows', pv.rows], ['Columns', pv.cols]].forEach(function (w) {
          const box = el('div', { class: Q('well') }, el('em', { text: w[0] }));
          w[1].forEach(function (n) { box.appendChild(el('button', { type: 'button', onclick: function () { noteInput(); pvChip(n); } }, n)); });
          pvWells.appendChild(box);
        });
        pvCount.textContent = 'Pivots: ' + pv.n + ' (a table may pivot at most 7 1/2 times)';
      }
      function pivotClick() {
        if (dead || mode === 'locked' || mode === 'dialog') return;
        noteInput(); const now = api.now();
        pv.clicks.push(now); pv.clicks = pv.clicks.filter(function (t) { return now - t < 2000; });
        heatEvent('pv');
        if (pv.clicks.length >= 8) { pv.clicks = []; toggleFan(); return; }
        if (pv.fan || pv.swing) return;
        pv.swing = true; pv.n++; act(); used.pivot = true; api.stat.inc(ST + 'pivots'); api.sfx('whoosh');
        pvTable.classList.add(Q('swing'));
        api.setTimeout(function () { const t = pv.rows; pv.rows = pv.cols; pv.cols = t; pvRender(); pvTable.classList.remove(Q('swing')); api.setTimeout(function () { pv.swing = false; }, 290); }, 280);
        give(pv.n <= 8 ? 0.3 : 0.1, 'pivot');
        if (pv.n === 7) say(PIVOTX.p7, { priority: 1 }); else if (pv.n === 8) say(PIVOTX.p8, { priority: 1 });
        else if (pv.n === 20) { say(PIVOTX.p20, { priority: 1, mood: 'proud' }); api.achieve(ST + 'pivot'); api.confetti(); }
        else sayR('pivot', { count: pv.n });
      }
      function pvFocus(x) { const d = root.ownerDocument, ae = d.activeElement; if (viewName === 'pivot' && (!ae || ae === d.body || ae === pvFan || ae === pvTable)) try { x.focus(); } catch (e) { /* ignore */ } }
      function toggleFan() {
        if (!pv.fan) {
          pv.fan = true; pv.habit = false; pvTable.hidden = true; pvFan.hidden = false; wb.classList.add(Q('fanon')); api.sfx('honk'); pvFocus(pvFan);
          say(PIVOTX.fan, { priority: 1, mood: 'confused' }); api.setTimeout(function () { sayR('spam'); }, 3000);
          api.clearTimeout(pv.ft); pv.ft = api.setTimeout(function () { if (pv.fan && !pv.habit) toggleFan(); }, 12000);
          if (!pvRaf && !reduced()) pvRaf = api.requestAnimationFrame(spinFrame); else spinFrame(0);
        } else if (!pv.habit) {
          pv.habit = true; say(PIVOTX.fanoff, { priority: 1 }); api.clearTimeout(pv.ft);
          api.setTimeout(function () { pv.fan = false; pv.habit = false; pvFan.hidden = true; pvTable.hidden = false; wb.classList.remove(Q('fanon')); pvFocus(pvTable); }, 3000);
        }
      }
      function spinFrame(ts) {
        pvRaf = 0; if (dead || !pv.fan || viewName !== 'pivot') return;
        const dt = pv.last ? clamp((ts - pv.last) / 1000, 0, 0.05) : 0.016; pv.last = ts;
        pv.spin = (pv.spin + 420 * dt * (pv.habit ? 0.4 : 1)) % 360;
        pvBlades.forEach(function (b, i) { b.style.transform = 'rotate(' + (pv.spin + i * 90).toFixed(1) + 'deg)'; });
        if (!reduced()) pvRaf = api.requestAnimationFrame(spinFrame);
      }
      /* ---------------- format, sort, macro ---------------- */
      let fmtN = 0;
      function doFormat() {
        if (dead || mode === 'locked' || mode === 'dialog') return;
        heatEvent('ui'); if (mode === 'locked') return;
        fmtMode = (fmtMode + 1) % 3; fmtN++; rbBtn.format.textContent = 'Format: ' + ['Mood', 'Beige (Dennis)', 'Off'][fmtMode];
        render(); give(0.2, 'format'); act(); api.sfx('pop');
        say(fmtMode === 0 && fmtN > 3 ? api.line(M + 'fmt') : FMTX[fmtMode]);
      }
      function doSort() {
        if (sorting || dead || mode === 'locked' || mode === 'dialog' || !isGrid()) return;
        sorting = true; act(); used.sort = true; api.stat.inc(ST + 'sorts'); give(0.3, 'sort'); api.sfx('whoosh');
        sbMid.textContent = 'Sort by Vibes: already optimal';
        const idx = [1, 2, 3, 4], perm = api.shuffle([0, 1, 2, 3]), all = [];
        idx.forEach(function (ri) { COLS.forEach(function (c) { all.push(cells[c + ROWS[ri]]); }); });
        if (!reduced()) {
          idx.forEach(function (ri, i) { const dy = (idx[perm[i]] - ri) * 30; COLS.forEach(function (c) { const ce = cells[c + ROWS[ri]]; ce.style.transition = 'transform .6s ease'; ce.style.transform = 'translateY(' + dy + 'px)'; }); });
          api.setTimeout(function () { all.forEach(function (ce) { ce.style.transform = ''; }); }, 700);
          api.setTimeout(function () { all.forEach(function (ce) { ce.style.transition = ''; }); sorting = false; if (sbMid.textContent.indexOf('Sort') === 0) sbMid.textContent = ''; }, 1400);
        } else api.setTimeout(function () { sorting = false; if (sbMid.textContent.indexOf('Sort') === 0) sbMid.textContent = ''; }, 700);
        sortN++; sayR('sort', { count: sortN });
      }
      function macroRec() {
        if (dead || !rev.mac || mode === 'locked' || mode === 'dialog') return;
        macro.rec = true; macro.ev = []; rbBtn.rec.setAttribute('aria-pressed', 'true'); act(); api.sfx('blip'); say(MACROX.rec);
      }
      function macroStop() {
        if (!macro.rec) return;
        macro.rec = false; rbBtn.rec.setAttribute('aria-pressed', 'false'); act(); api.sfx('blip'); say(MACROX.stop, { count: macro.ev.length });
      }
      function macroPlay() {
        if (dead || !rev.mac || mode === 'locked' || mode === 'dialog') return;
        endMode(); if (viewName !== 's1') showView('s1');
        mode = 'playing'; macro.rec = false; rbBtn.rec.setAttribute('aria-pressed', 'false'); used.macro = true;
        const total = api.selftest ? 750 : 7500, evs = macro.ev.slice(), n = evs.length;
        const to = function (ms, f) { macro.timers.push(api.setTimeout(f, ms)); };
        const place = function (a) { const c = cells[a]; if (!c) return; ghost.style.left = (c.offsetLeft + c.offsetWidth / 2) + 'px'; ghost.style.top = (c.offsetTop + c.offsetHeight / 2) + 'px'; ensureVisible(c); };
        ghost.hidden = false; place(sel.a);
        if (!n) { ghost.classList.add(Q('trem')); say(MACROX.empty, { priority: 1 }); }
        cbSay('stapler', 4000);
        evs.forEach(function (e, i) {
          to(total * (i + 1) / (n + 1), function () {
            if (mode !== 'playing') return;
            place(e.addr); api.sfx('tick');
            if (e.type === 'commit') commit(e.addr, e.text.replace(/\d/, function (d) { return String((+d + 1) % 10); }), { ghost: true });
          });
        });
        to(total, function () { if (mode !== 'playing') return; place('H12'); commit('H12', 'thank you (Past You)', { ghost: true }); });
        to(total + 700, function () { stopPlay(true); });
      }
      function stopPlay(done) {
        if (mode !== 'playing') return;
        macro.timers.forEach(function (id) { api.clearTimeout(id); }); macro.timers = [];
        ghost.hidden = true; ghost.classList.remove(Q('trem')); mode = 'normal'; render(); positionFh();
        if (!done) return;
        const now = api.now(); act(); api.sfx('bell'); api.stat.inc(ST + 'macros');
        if (now - macro.lastPlay >= 30000) { macro.lastPlay = now; give(1, 'macro'); }
        say(MACROX.done, { priority: 1 }); api.setTimeout(function () { say(MACROX.thanks, { priority: 1 }); }, 3000);
      }
      /* ---------------- Dennis (Z999) ---------------- */
      let denLine = null, denTxt = null, denTicks = null;
      const denH = function () { return 3.8 + dennisSec / 60 * 0.3 + cycle * 0.1; };
      function buildDen() {
        if (denLine) return;
        denLine = el('polyline', { points: '', fill: 'none', stroke: '#3d7a3d', 'stroke-width': 3 });
        denTxt = el('text', { x: 160, y: 24, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: '#2B2A33' });
        denTicks = el('span', { class: Q('sr') });
        denV.appendChild(el('svg', { viewBox: '0 0 320 160', role: 'img', 'aria-label': 'Dennis (Plant) height chart', style: 'width:100%;max-height:260px;background:#E8D7B5;border:3px solid #2B2A33;border-radius:10px' },
          el('line', { x1: 30, y1: 140, x2: 300, y2: 140, stroke: '#2B2A33', 'stroke-width': 2 }), el('line', { x1: 30, y1: 40, x2: 30, y2: 140, stroke: '#2B2A33', 'stroke-width': 2 }), denLine, denTxt));
        denBack = el('button', { type: 'button', onclick: function () { noteInput(); closeDennis(); } }, 'Back'); denV.appendChild(denBack); denV.appendChild(denTicks);
      }
      function paintDen() {
        if (!denLine) return;
        const h = denH(), span = Math.max(1.2, h - 3.5 + 0.4), pts = [];
        for (let i = 0; i <= 8; i++) { const v = 3.8 + (h - 3.8) * i / 8; pts.push((30 + i * 33.75).toFixed(1) + ',' + (140 - (v - 3.5) / span * 95).toFixed(1)); }
        denLine.setAttribute('points', pts.join(' ')); denTxt.textContent = 'Dennis (Plant): ' + qLabel() + ' Height ' + h.toFixed(1) + ' cm';
      }
      function openDennis() {
        if (dead || mode === 'locked' || mode === 'dialog') return;
        if (!isGrid() && viewName !== 's1') showView('s1');
        endMode(); buildDen(); mode = 'dennis'; denV.hidden = false; gw.inert = true; paintDen(); nameIn.value = 'Z999'; if (denBack) try { denBack.focus(); } catch (e) { /* ignore */ }
        const first = !api.flag.get(ST + 'dennis'); api.flag.set(ST + 'dennis', true); api.sfx('bloop'); act();
        if (!denSession) { denSession = true; give(0.5, 'dennis'); say(first ? CAM.den1 : CAM.den2, { priority: 1 }); cbSay('dennis', 5000); }
      }
      function closeDennis() {
        if (mode !== 'dennis') return;
        mode = 'normal'; denV.hidden = true; gw.inert = false; nameIn.value = labelOf(sel.a); focusCell(sel.a); positionFh();
      }
      function denTick() {
        const s = el('span', { class: Q('dtick'), text: '+0.3 cm' }); denV.appendChild(s); api.setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 2100);
        say(CAM.dtick);
      }
      /* ---------------- the quiet total ---------------- */
      let quietIv = 0, quietTo = [], quietIdx = -1, quietLoop = 0, quietHint = false;
      function quietClear() { api.clearInterval(quietIv); quietIv = 0; quietTo.forEach(function (id) { api.clearTimeout(id); }); quietTo = []; }
      function progReset() { prog.style.transition = 'none'; prog.style.width = '0%'; }
      function startQuiet() {
        if (mode === 'quiet' || roView()) return;
        const is17 = clockSec === 17;
        say(QUIETX.sel, { priority: 1 });
        endMode(); mode = 'quiet'; quietAt = api.now(); quietBase = null; used.quiet = true; quietClear();
        wb.classList.add(Q('dim'));
        const hold = api.selftest ? 1000 : 5000;
        const unheard = QUIET.map(function (t, i) { return i; }).filter(function (i) { return quietHeard.indexOf(i) < 0; });
        let line;
        if (unheard.length) { quietIdx = unheard[0]; line = QUIET[quietIdx]; } else { quietIdx = -1; line = QUIET[quietLoop++ % 12] + ' (again)'; }
        if (is17) { line = QUIET17; api.achieve(ST + 'minute'); api.confetti(); }
        quietLine = line; ftl.textContent = ''; qcard.textContent = ''; qcard.hidden = false;
        let n = 0; const per = Math.max(1, Math.ceil(line.length / ((hold * 0.88) / 40)));
        quietIv = api.setInterval(function () { n += per; ftl.textContent = qcard.textContent = line.slice(0, n); if (n >= line.length) { api.clearInterval(quietIv); quietIv = 0; } }, 40);
        progReset(); void prog.offsetWidth; prog.style.transition = 'width ' + hold + 'ms linear'; prog.style.width = '100%';
        let gap = 2000; const tk = function () { if (mode !== 'quiet') return; api.sfx('tick'); gap += 500; quietTo.push(api.setTimeout(tk, gap)); };
        quietTo.push(api.setTimeout(tk, gap)); quietTo.push(api.setTimeout(quietDone, hold));
      }
      function quietDone() {
        if (mode !== 'quiet') return;
        quietClear(); ftl.textContent = qcard.textContent = qsr.textContent = quietLine; api.setTimeout(function () { if (mode !== 'quiet') qcard.hidden = true; }, 2400); wb.classList.remove(Q('dim')); mode = 'normal'; progReset();
        api.sfx('bell'); give(1 + (quietFirst ? 5 : 0), 'quiet'); quietFirst = false; act(); api.stat.inc(ST + 'quiet');
        if (quietIdx >= 0 && quietHeard.indexOf(quietIdx) < 0) { quietHeard.push(quietIdx); api.save.set('quiet', quietHeard); }
        ftCount.textContent = 'Quiet Totals: ' + quietHeard.length + '/12';
        const c = quietHeard.length;
        if (c >= 12) { api.achieve(ST + 'quiet'); api.confetti(); say(QUIETX.all, { priority: 2, mood: 'proud' }); }
        else if (c === 6 && !quietHint) { quietHint = true; say(QUIETX.hint, { priority: 2 }); }
        else sayR('quietdone', { count: c, mood: 'proud' });
        render();
      }
      function cancelQuiet() {
        if (mode !== 'quiet') return;
        quietClear(); wb.classList.remove(Q('dim')); mode = 'normal'; progReset(); qcard.hidden = true;
        ftl.textContent = QINT[intIdx++ % 3]; api.sfx('sad'); sayR('quietint', { mood: 'disappointed' });
      }
      /* ---------------- input handlers ---------------- */
      function onKey(e) {
        if (dead) return;
        const tg = e.target, k = e.key, ctrl = e.ctrlKey || e.metaKey;
        noteInput();
        if (mode === 'dialog') { dialogKey(e); return; }
        if (mode === 'quiet' && api.now() - quietAt > 250) cancelQuiet();
        if (tg === edIn || tg === fbar) { editKey(e); return; }
        if (tg === nameIn) { if (k === 'Enter') { e.preventDefault(); gotoText(nameIn.value); } else if (k === 'Escape' && mode === 'dennis') { e.preventDefault(); closeDennis(); } return; }
        const tag = tg && tg.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (k === 'F9') { e.preventDefault(); recalc(); return; }
        if (mode === 'dennis') { if (k === 'Escape') { e.preventDefault(); closeDennis(); } return; }
        if (mode === 'locked') return;
        if (ctrl) {
          const kk = String(k).toLowerCase();
          if (kk === 'z') { e.preventDefault(); undo(); }
          else if (kk === 's') { e.preventDefault(); say(CAM.save); }
          else if (kk === 'c') { e.preventDefault(); clip = rawAt(sel.a); say(CAM.copy); }
          else if (kk === 'v') { e.preventDefault(); if (clip && isGrid() && !roView()) { commit(sel.a, clip); say(CAM.paste); } }
          else if (kk === 'd' && rev.fill && mode === 'normal' && (viewName === 's1' || viewName === 's75')) { e.preventDefault(); const A = AD[sel.a], B = AD[sel.r]; fillDrag = { a: sel.a, r: sel.r, past: false }; fillCompute(COLS[Math.max(A.c, B.c)] + ROWS[Math.min(12, Math.max(A.ri, B.ri) + 3)]); fillRelease(); }
          else if (k === 'End') { e.preventDefault(); openDennis(); }
          else if (k === 'Home') { e.preventDefault(); if (isGrid()) select('A1', false, 'key'); }
          return;
        }
        if (!isGrid() || !(gw.contains(tg) || tg === root || tg === wb)) return;
        const dir = { ArrowDown: [0, 1], ArrowUp: [0, -1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[k];
        if (dir) { e.preventDefault(); stepSel(dir[0], dir[1], e.shiftKey); }
        else if (k === 'Home') { e.preventDefault(); select('A' + ROWS[AD[sel.a].ri], false, 'key'); }
        else if (k === 'End') { e.preventDefault(); select('H' + ROWS[AD[sel.a].ri], false, 'key'); }
        else if (k === 'Enter' || k === 'F2') { e.preventDefault(); startEdit(null); }
        else if (k === 'Escape') { sel.r = sel.a; render(); }
        else if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); clearSel(); }
        else if (typeof k === 'string' && k.length === 1 && !e.altKey) { e.preventDefault(); startEdit(k); }
      }
      function dialogKey(e) {
        if (e.key === 'Escape') { e.preventDefault(); if (syncOpen) syncPress('Tentative'); else dlgPress(); return; }
        if (e.key === 'Tab' && dlgBtns.length) {
          e.preventDefault();
          const i = dlgBtns.indexOf(root.ownerDocument.activeElement), n = dlgBtns.length;
          dlgBtns[(i + (e.shiftKey ? n - 1 : 1) + n) % n].focus();
        }
      }
      function onGridDown(e) {
        noteInput(); lastPtr = e.pointerType || 'mouse';
        fillDrag = null; clearFillPrev();
        if (e.button > 0) return;
        const a = cellOf(e.target); if (!a || mode === 'locked' || mode === 'dialog') return;
        wasSel = sel.a === a && sel.r === a ? a : '';
        const rc = cells[a].getBoundingClientRect();
        if (viewName === 's1' && cmtAt(a) && e.clientX > rc.right - 13 && e.clientY < rc.top + 13) { say(CAM.cmtSeen); api.sfx('pop'); }
        if (acCells[a]) acReact(api.chance(0.5));
        const now = api.now(); sameClick.push({ a: a, t: now }); sameClick = sameClick.filter(function (x) { return now - x.t < 3000; });
        if (sameClick.filter(function (x) { return x.a === a; }).length >= 15) { sameClick = []; complaintN++; sayR(complaintN >= 2 ? 'complaint2' : 'complaint', { item: labelOf(a), priority: 1 }); mark('bang:' + a, 3000); api.sfx('buzz'); }
        if (e.shiftKey) { select(a, true, 'ptr'); return; }
        dragSel = { a: a, moved: false };
        select(a, false, 'ptr');
      }
      function onGridClick(e) {
        const a = cellOf(e.target); if (!a || mode === 'locked' || mode === 'dialog') return;
        if (sel.a !== a || sel.r !== a) { if (!(dragSel && dragSel.moved)) select(a, false, 'ptr'); }
        else if (lastPtr === 'touch' && wasSel === a && mode !== 'quiet' && a !== 'A13') startEdit(null);
        wasSel = '';
      }
      function onDbl(e) { const a = cellOf(e.target); if (!a || mode === 'locked' || mode === 'dialog') return; if (sel.a !== a) select(a, false, 'ptr'); startEdit(null); }
      function onOver(e) { const a = cellOf(e.target); if (a && viewName === 's1' && cmtAt(a)) showBubble(cmtAt(a)); }
      function onOut() { bubSel(); }
      function onMove(e) {
        noteInput();
        if (mode === 'quiet') { if (!quietBase) quietBase = { x: e.clientX, y: e.clientY }; else if (Math.hypot(e.clientX - quietBase.x, e.clientY - quietBase.y) > 6) cancelQuiet(); }
        if (fillDrag) { const a = cellFromPoint(e.clientX, e.clientY); if (a) fillCompute(a); }
        else if (dragSel && (e.buttons & 1) && mode === 'normal') { const a = cellFromPoint(e.clientX, e.clientY); if (a && a !== sel.r) { dragSel.moved = true; select(a, true, 'ptr'); } }
        if (chart.open) eyes(e);
      }
      function onUp(e) {
        if (fillDrag) fillRelease();
        if (dragSel) { const d = dragSel; dragSel = null; if (d.moved && chart.open && inChart(e)) addToChart(rangeAddrsSel()); }
      }
      function onCancel() { fillDrag = null; dragSel = null; clearFillPrev(); }
      function onWheel() { noteInput(); if (mode === 'quiet') cancelQuiet(); }
      function fit() {
        if (dead) return;
        const w = root.getBoundingClientRect().width || wb.clientWidth || 800;
        const nr = w < 640, chg = nr !== wb.classList.contains(Q('narrow'));
        wb.classList.toggle(Q('narrow'), nr); wb.style.setProperty('--sm-w', w < 420 ? '64px' : w < 560 ? '72px' : '92px'); positionFh();
        if (chg && !titleOver) api.setTitle(winTitle());
      }
      /* ---------------- idle ladder ---------------- */
      function typeOvl(a, text, ms, erase, alive, done) {
        let i = 0, phase = 0;
        const put = function (s) { ovl[a] = { text: s, until: api.now() + 4000, cls: '' }; render(); };
        const step = function () {
          if (dead) return;
          if (alive && !alive()) { delete ovl[a]; render(); return; }
          if (phase === 0) { i++; put(text.slice(0, i)); if (i >= text.length) { phase = 1; api.setTimeout(step, 600); } else api.setTimeout(step, ms); }
          else if (erase) { i--; if (i <= 0) { delete ovl[a]; render(); if (done) done(); } else { put(text.slice(0, i)); api.setTimeout(step, ms / 2); } }
          else { delete ovl[a]; render(); if (done) done(); }
        };
        step();
      }
      function idleReturn(away) {
        const st = idleStage; idleStage = 0; silent = false;
        wb.classList.remove(Q('ab')); if (ovl.A13 && ovl.A13.until > api.now() + 60000) delete ovl.A13;
        if (mode !== 'playing') { ghost.hidden = true; ghost.classList.remove(Q('trem')); }
        if (idleViewers) { idleViewers = false; sbView.textContent = 'People viewing: ' + viewers; api.setTimeout(function () { say(IDLEV[1], { priority: 1 }); }, 2600); }
        if (st >= 2) { autoTxt.textContent = 'Autosave: Saving...'; if (st >= 4) sayR('idleback', { force: true, mood: 'proud', count: Math.max(1, Math.round((away || 0) / 1000)) }); else say(IDLEX[5], { force: true, mood: 'neutral' }); }
        render();
      }
      function idleTick(now) {
        const s = (now - lastInput) / 1000;
        if (mode === 'locked' || mode === 'playing') return;
        if (mode === 'editing') { if (s < 60 * IS) return; cancelEdit(); }
        for (let gd = 0; gd < 4; gd++) {
          const was = idleStage;
          if (idleStage < 1 && s >= (commitCount > 0 || actions > 2 ? 30 : 45) * IS) {
            idleStage = 1;
            if (sel.a === 'A13' && quietHeard.length) setOvl('A13', 'Σ and you', 8000, '');
            else if (mode === 'normal') { const X = AD[sel.a]; select(COLS[Math.min(7, X.c + 1)] + ROWS[X.ri], false, 'noFocus'); }
            say(IDLEX[0], { mood: 'disappointed' });
          } else if (idleStage < 2 && s >= 60 * IS) {
            idleStage = 2; autoTxt.textContent = 'Autosave: saved your absence (1.2 KB)'; say(IDLEX[1], { mood: 'disappointed' });
            typeOvl('A1', '=ARE_YOU_STILL_THERE()', 70, true, function () { return idleStage >= 2; });
            api.setTimeout(function () { if (idleStage >= 2) say(IDLEX[2], { mood: 'disappointed' }); }, 3500);
          } else if (idleStage < 3 && s >= 90 * IS) { idleStage = 3; say(IDLEX[3], { mood: 'disappointed' }); silent = true; }
          else if (idleStage < 4 && s >= 180 * IS) {
            idleStage = 4; wb.classList.add(Q('ab')); setOvl('A13', '(sum of waiting)', 1e9, '');
            const c = cells.H12; ghost.style.left = (c.offsetLeft + 6) + 'px'; ghost.style.top = (c.offsetTop + 6) + 'px'; ghost.hidden = false; ghost.classList.add(Q('trem')); api.setTimeout(function () { ghost.classList.remove(Q('trem')); }, 1200);
            api.achieve(ST + 'absence'); api.sfx('bell'); say(IDLEX[4], { force: true, mood: 'disappointed' });
          }
          if (idleStage === was) break;
        }
        if (s >= 150 * IS && idleStage >= 2 && !idleViewers) { idleViewers = true; sbView.textContent = 'People viewing: 0'; say(IDLEV[0], { force: true, priority: 1, mood: 'confused' }); }
        if (s >= 120 * IS && mothState >= 2 && !mothCmt) { mothCmt = true; addComment('B2', 'Anonymous Moth: warm'); }
        if (idleStage >= 4 && idleLongIdx < IDLELONG.length && s >= (180 + 45 * (idleLongIdx + 1)) * IS) { say(IDLELONG[idleLongIdx], { force: true, mood: idleLongIdx > 9 ? 'confused' : 'disappointed' }); idleLongIdx++; }
      }
      /* ---------------- scheduler: beats, micro reveals, close bar ---------------- */
      const BEAT_T = { 1: [12, 2], 2: [30, 5], 3: [60, 9], 4: [100, 14], 5: [140, 18], 6: [200, 24], 7: [260, 30], 8: [340, 38], 9: [450, 50] };
      const AUTO = ['Autosave: Saving...', 'Autosave: Still saving...', 'Autosave: Saving, with feeling...', 'Autosave: Saving (it\'s going well)...', 'Autosave: Saving to a place...'];
      let accelAt = 0, compT = 0;
      function showBtn(b) { if (!b) return; b.hidden = false; b.classList.remove(Q('pop')); void b.offsetWidth; b.classList.add(Q('pop')); }
      const BEATS = {
        1: function () { rev.chips = true; chips.hidden = false; ['=FEEL(', '=SUM(', '=IF('].forEach(function (t) { addChip(t); }); rb.hidden = false; showBtn(rbBtn.recalc); revealTab('feel'); revealTab('plus'); tabDefs.feel.classList.add(Q('pulse')); if (wb.classList.contains(Q('narrow'))) fxBtn.classList.add(Q('pulse')); },
        2: function () { showBtn(rbBtn.undo); showBtn(rbBtn.redo); addChip('=HOPE()'); addChip('=TODAY()'); },
        3: function () { rev.fill = true; rev.ac = true; rev.comp = true; sbComp.hidden = false; positionFh(); },
        4: function () { rev.chart = true; showBtn(rbBtn.chart); rbBtn.chart.classList.add(Q('pulse')); },
        5: function () { rev.cmt = true; rev.dennis = true; showBtn(rbBtn.format); showBtn(rbBtn.sort); addComment('C2'); addChip('Z999', openDennis); },
        6: function () { revealTab('pivot'); },
        7: function () {
          bracing = true; rev.mac = true; COLS.forEach(function (c) { delete sheets.s1.raw[c + '4']; }); undoStack = undoStack.filter(function (e) { const d = AD[e.a]; return !(e.k === 's1' && d && d.r === 4); });
          ['rec', 'stop', 'play'].forEach(function (k) { showBtn(rbBtn[k]); }); ['=TOAST()', '=GERALD()', '=SOCK()'].forEach(function (t) { addChip(t); });
          evalAll(); render(); syncBars(); api.setTimeout(function () { sayR('cmt'); }, 7000); cbSay('tues', 10500);
        },
        8: function () { rev.tot = true; addChip('=MEANING()'); render(); },
        9: function () { rev.s75 = true; unlockS75(false); viewers = Math.max(viewers, 2); sbView.textContent = 'People viewing: ' + viewers; }
      };
      function fireBeat(n) {
        BEATS[n](); beatNext = n + 1; lastReveal = api.now(); api.sfx('ding');
        BEAT[n].forEach(function (t, i) { const go = function (k) { const ok = say(n === 1 && i === 1 && wb.classList.contains(Q('narrow')) ? NARROW1 : t, { priority: 1 }); if (!ok && k < 8) api.setTimeout(function () { go(k + 1); }, 2000); }; api.setTimeout(function () { go(0); }, i * 3000); });
      }
      function buildMicro() {
        const el0 = function () { return (api.now() - t0) / 1000; };
        micro = api.shuffle([
          { id: 1, need: function () { return rev.chips; }, fn: function () { sayR('tuesday', { count: acOpens * 4 + 5 }); chips.classList.add(Q('pulse')); } },
          { id: 2, need: function () { return true; }, fn: function () { say(AMBX[0]); } },
          { id: 3, need: function () { return viewName === 's1'; }, fn: function () { rev.gdot = true; render(); say(CAM.gdot, { item: gerAddr(), priority: 1 }); } },
          { id: 4, need: function () { return true; }, fn: function () { setOvl('F6', '🧦', 3000, ''); api.flag.set('sockSeen', true); say(CAM.sock2, { priority: 1 }); } }, // lint-ignore
          { id: 5, need: function () { return rev.dennis; }, fn: function () { say(CAM.den2); tabs.classList.add(Q('pulse')); } },
          { id: 6, need: function () { return el0() >= 120 * TS; }, fn: function () { say(CAM.boss, { priority: 1 }); let used2 = false; try { used2 = api.stat.get('lobby.bossKeys') >= 1; } catch (e) { used2 = false; } if (used2) api.setTimeout(function () { say(CAM.boss2, { priority: 1 }); }, 3000); } },
          { id: 7, need: function () { return rev.comp; }, fn: function () { say(AMBX[1]); } },
          { id: 8, need: function () { return true; }, fn: function () { say(AMBX[2]); setOvl('A1', '❄ Purpose', 6000, 'hd'); } },
          { id: 9, need: function () { return true; }, fn: function () { say(AMBX[3]); mark('fl:A1', 600); mark('fl:B1', 600); } },
          { id: 10, need: function () { return true; }, fn: function () { say(AMBX[4]); } },
          { id: 11, need: function () { return rev.s75 && mothState === 0; }, fn: function () { startMoth(); } },
          { id: 12, need: function () { return true; }, fn: function () { say(AMBX[5]); } },
          { id: 13, need: function () { return bracing; }, fn: function () { say(AMBX[6]); } },
          { id: 14, need: function () { return commitCount > 3; }, fn: function () { say(AMBX[7]); } },
          { id: 15, need: function () { return viewName === 's1'; }, fn: function () { fname.textContent = fnTxt() + ' *'; api.setTimeout(function () { fname.textContent = fnTxt(); }, 6000); say(CAM.ast); } },
          { id: 16, need: function () { return rev.chips; }, fn: function () { tabDefs.s1.textContent = 'Sheet1 (the original)'; api.setTimeout(function () { tabDefs.s1.textContent = 'Sheet1'; }, 8000); say(CAM.s1); } },
          { id: 17, need: function () { return viewName === 's1'; }, fn: function () { setOvl('F3', '▮ blinking', 5000, ''); say(CAM.blink); } },
          { id: 18, need: function () { return mode === 'normal' && !sbMid.textContent; }, fn: function () { sbMid.textContent = 'Clipboard: a feeling about Tuesday'; api.setTimeout(function () { if (sbMid.textContent.indexOf('Clipboard') === 0) sbMid.textContent = ''; }, 6000); say(CAM.clip); } },
          { id: 19, need: function () { return commitCount > 1; }, fn: function () { mark('fl:A2', 500); mark('fl:A3', 500); mark('fl:A5', 500); say(CAM.spell); } },
          { id: 20, need: function () { return viewName === 's1'; }, fn: function () { mark('fl:A7.5', 900); mark('fl:B7.5', 900); say(CAM.eight); } },
          { id: 21, need: function () { return chart.open; }, fn: function () { say(CAM.eyes); } }
        ]);
        microDone = {};
      }
      function microFire() {
        for (let i = 0; i < micro.length; i++) {
          const m = micro[i];
          if (microDone[m.id] || !m.need()) continue;
          microDone[m.id] = true; lastReveal = api.now(); m.fn(); return true;
        }
        if (api.now() - lastReveal >= (beatNext > 9 ? 25000 : 40000) * TS) { lastReveal = api.now(); sayR('ambient'); }
        return false;
      }
      function startMoth() {
        if (mothState) return; mothState = 1; viewers = 2; sbView.textContent = 'People viewing: 2';
        const c = cells.B2; moth.style.left = c.offsetLeft + 'px'; moth.style.top = c.offsetTop + 'px'; moth.hidden = false; say(CAM.moth1, { priority: 1 });
        api.setTimeout(function () {
          moth.style.animation = 'none'; let i = 0; const word = 'you good?';
          sbMid.setAttribute('aria-live', 'off');
          const iv = api.setInterval(function () { i++; sbMid.textContent = 'Anonymous Moth: ' + word.slice(0, i); if (i >= word.length) { api.clearInterval(iv); sbMid.setAttribute('aria-live', 'polite'); sbMid.textContent = 'Anonymous Moth: ' + word + ' '; } }, 140);
          say(CAM.moth2, { priority: 1 });
          api.setTimeout(function () {
            moth.hidden = true; sbMid.textContent = ''; viewers = 3; sbView.textContent = 'People viewing: 3'; mothState = 2; placeTcur();
            say(CAM.moth3, { priority: 1 }); api.setTimeout(function () { say(CAM.moth4, { priority: 1 }); }, 3500);
          }, 2200);
        }, 4500);
      }
      function placeTcur() { const c = cells.G6; tcur.style.left = (c.offsetLeft + 8) + 'px'; tcur.style.top = (c.offsetTop + 6) + 'px'; tcur.hidden = false; }

      function tick() {
        if (dead || document.hidden) return;
        const now = api.now(), el0 = (now - t0) / 1000, busy = mode === 'quiet' || mode === 'locked' || mode === 'dialog' || mode === 'playing' || now < hushUntil;
        clockSec = Math.floor(el0) % 60; sbClock.textContent = '4:17 :' + (clockSec < 10 ? '0' : '') + clockSec;
        dennisSec++; if (dennisSec % 15 === 0) api.save.set('dennisSec', dennisSec);
        if (mode === 'dennis') { paintDen(); if (dennisSec % 60 === 0) denTick(); }
        if (hasHands && cycCells.size) { heartN = Math.min(99, heartN + 1); heartPos(); }
        if (pv.fan && pvCooled) { pv.cooled += api.randInt(3, 9); pvCooled.textContent = 'Cooled: ' + pv.cooled + ' cells (none were warm)'; }
        if (idleStage < 2) autoTxt.textContent = AUTO[Math.floor(el0 / 20) % 5];
        if (rev.comp && sbComp.textContent !== 'Completeness: 62%' && Math.floor(el0 / 7) !== compT) { compT = Math.floor(el0 / 7); sbComp.textContent = 'Completeness: ' + [59, 60, 61][compT % 3] + '%'; }
        if (!busy && mode === 'normal' && Math.floor(el0 / 10) !== readyIdx && /^(Ready|Calculating)/.test(sbReady.textContent) && viewName !== 's75') { readyIdx = Math.floor(el0 / 10); sbReady.textContent = ['Ready', 'Ready (ish)', 'Ready, spiritually', 'Calculating...'][readyIdx % 4]; }
        idleTick(now);
        if (!busy && timeEvents(now, el0)) { lastReveal = now; } else if (!busy) {
          let due = false;
          if (beatNext <= 9) { const d = BEAT_T[beatNext]; due = el0 >= d[0] * TS || actions >= d[1]; }
          if (due) { if (now - lastReveal >= 8000 * TS && !silent) fireBeat(beatNext); }
          else if (now - lastReveal >= 20000 * TS) microFire();
        }
        let p = Math.min(1, el0 / (660 * TS) + 0.003 * actions);
        const usedN = ['fill', 'chart', 'pivot', 'macro', 'quiet', 'sort'].filter(function (k) { return used[k]; }).length;
        if (quietHeard.length >= 6 && usedN >= 3 && el0 >= 480 * TS) { if (!accelAt) accelAt = now; p = Math.max(p, Math.min(1, (now - accelAt) / (10000 * TS))); }
        qPct = Math.max(qPct, p);
        if (!busy && qmIdx < QM.length && qPct >= [0.25, 0.5, 0.75, 0.9][qmIdx]) { say(QM[qmIdx], { priority: 1 }); qmIdx++; }
        qbI.style.width = (qPct * 100).toFixed(0) + '%';
        qbTxt.textContent = cycle === 0 ? 'Quarter Close' : 'Quarter Close (Draft ' + draftN() + ')';
        qbPct.textContent = cycle === 0 ? Math.floor(qPct * 100) + '%' : (qPct * 100).toFixed(1) + '%';
        const calm = mode === 'normal' || (mode === 'editing' && curEdit() === rawAt(editAddr));
        if (qPct >= 1 && closeStage === 0 && calm) {
          closeStage = 1; rb.hidden = false; showBtn(rbBtn.close); rbBtn.close.classList.add(Q('pulse')); say(BEAT[10][0], { priority: 1 }); closeAt = now + (api.selftest ? 1000 : 4000);
        }
        if (closeStage === 1 && calm && now >= closeAt) openClose();
      }
      function timeEvents(now, el0) {
        if (mode !== 'normal' || viewName !== 's1' || idleStage > 0 || closeStage > 0 || now - lastReveal < 8000 * TS) return false;
        if (!reviewDone && el0 >= 180 * TS) {
          reviewDone = true; give(3, 'review'); api.sfx('fanfare'); api.confetti();
          REVIEW.cells.forEach(function (t, i) { setOvl('E' + (i + 2), t, 9000, 'hd'); });
          REVIEW.say.forEach(function (t, i) { api.setTimeout(function () { say(t, { priority: 1, mood: i === 1 ? 'proud' : 'neutral' }); }, i * 3200); });
          return true;
        }
        if (!spreadDone && rev.cmt && el0 >= 330 * TS) { sandraSpread(); return true; }
        if (!syncDone && el0 >= 420 * TS) { startSync(); return true; }
        if (!rowDone && qPct >= 0.93) {
          rowDone = true; give(2.5, 'full row'); api.sfx('bell'); say(ROWF[0], { priority: 1 });
          const setRow = function (px) { g.style.gridTemplateRows = GROWS.replace('16px', px); positionFh(); heartPos(); if (mode === 'editing') edPos(); };
          api.setTimeout(function () { setRow('30px'); say(ROWF[1], { priority: 1 }); }, 2500);
          api.setTimeout(function () { setRow('16px'); say(ROWF[2], { priority: 1 }); }, 9000);
          return true;
        }
        if (meetN < MEET.length && !meetOpen && el0 >= meetAt) { offerMeeting(); return true; }
        return false;
      }
      function drift() { if (dead) return; driftTick++; if (isGrid()) { evalAll(); flickerAll(); render(); } }
      /* ---------------- close workbook: the not-ending ---------------- */
      let dlgBtns = [];
      const blankEl = el('div', { class: Q('blank'), hidden: true, 'aria-hidden': 'true' }, el('span', { text: 'Sheet1' }));
      wb.appendChild(blankEl);
      dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-labelledby', 'm-spreadsheet-meaning-dlgh');
      function openClose() {
        if (dead || mode === 'dialog' || mode === 'locked' || closeStage >= 2) return;
        endMode(); mode = 'dialog'; closeStage = 2; act();
        while (dlg.firstChild) dlg.removeChild(dlg.firstChild);
        dlgBtns = ['Yes', 'No', 'Maybe', 'Cancel'].map(function (t) { return el('button', { type: 'button', onclick: function () { dlgPress(); } }, t); });
        dlg.appendChild(el('div', { class: Q('card') }, el('h3', { id: 'm-spreadsheet-meaning-dlgh', text: CLOSE.title }), el('div', { class: Q('bts') }, dlgBtns)));
        dlg.hidden = false; api.sfx('bell'); try { dlgBtns[0].focus(); } catch (e) { /* ignore */ }
      }
      function startSync() {
        syncDone = true; endMode(); mode = 'dialog'; syncOpen = true; act(); api.sfx('bell');
        while (dlg.firstChild) dlg.removeChild(dlg.firstChild);
        const bar = el('i'), ms = api.selftest ? 750 : 7500; dlgBtns = ['Accept', 'Decline', 'Tentative'].map(function (t) { return el('button', { type: 'button', onclick: function () { syncPress(t); } }, t); });
        dlg.appendChild(el('div', { class: Q('card') }, el('h3', { id: 'm-spreadsheet-meaning-dlgh', text: SYNCX.title }), el('p', { text: SYNCX.body }), el('b', { class: Q('cdb') }, bar), el('div', { class: Q('bts') }, dlgBtns)));
        dlg.hidden = false; try { dlgBtns[0].focus(); } catch (e) { /* ignore */ } void bar.offsetWidth; bar.style.transitionDuration = ms + 'ms'; bar.style.width = '0%'; say(SYNCX.say, { priority: 2 }); syncT = api.setTimeout(function () { syncPress(''); }, ms);
        if (reduced()) { bar.style.width = '100%'; const p = dlg.querySelector('p'), t1 = api.now() + ms, iv = api.setInterval(function () { if (!syncOpen) api.clearInterval(iv); else p.textContent = SYNCX.body + ' (' + Math.max(0, Math.ceil((t1 - api.now()) / 1000)) + 's)'; }, 500); }
      }
      function syncPress(t) {
        if (!syncOpen) return;
        syncOpen = false; api.clearTimeout(syncT); dlg.hidden = true; dlgBtns = []; while (dlg.firstChild) dlg.removeChild(dlg.firstChild);
        if (mode === 'dialog') mode = 'normal'; give(3, 'sync'); api.sfx(t ? 'stamp' : 'ding'); say(SYNCX[t || 'late'], { priority: 2 });
        const a = api.pick(Object.keys(cells).filter(function (x) { const r = AD[x].r; return r !== 1 && r !== 7.5 && r !== 13 && x.charAt(0) !== 'A'; }));
        if (a) { setOvl(a, 'Action item: you', 12000, 'br'); api.setTimeout(function () { say(SYNCX.item, { priority: 1 }); }, 3500); }
        render(); focusCell(sel.a);
      }
      function auditCard() {
        return el('div', { class: Q('card audit') }, el('h3', { text: 'Audit' }), el('p', { text: CLOSE.audit }),
          el('div', { class: Q('sign') }, el('span', { text: 'Management' }), el('span', { text: 'Sandra: approved. Sandra: but see attached.' }), el('span', { text: 'Gerald 🥔 (potato stamp)' }), el('span', null, 'Autosave ', el('i', { class: Q('spin'), 'aria-hidden': 'true' }))));
      }
      function dlgPress() {
        if (closeStage >= 3) return;
        closeStage = 3; api.sfx('stamp'); say(CLOSE.c3, { priority: 2 });
        const T = function (ms, f) { api.setTimeout(function () { if (closeStage === 3 && !dead) f(); }, ms); };
        T(700, function () { dlg.appendChild(auditCard()); api.sfx('whoosh'); });
        T(1900, function () { api.sfx('fanfare'); api.confetti(); give(10, 'close'); api.achieve(ST + 'close'); });
        T(3800, function () { say(CLOSE.c5, { priority: 2, mood: 'proud' }); });
        T(6800, function () { if (!reduced()) wb.classList.add(Q('fold')); });
        T(7500, function () { dlg.hidden = true; blankEl.hidden = false; wb.classList.remove(Q('fold')); api.sfx('tick'); });
        T(8700, function () { resetQuarter(); });
      }
      function resetQuarter() {
        cycle++; api.stat.inc(ST + 'closes'); api.stat.max(ST + 'closes', cycle);
        if (cycle > (bestCycle.cycle || 0)) { bestCycle = { cycle: cycle }; api.save.set('best', bestCycle); }
        mode = 'normal'; closeStage = 0; wb.classList.remove(Q('fold')); rbBtn.close.hidden = true; rbBtn.close.classList.remove(Q('pulse')); dlg.hidden = true; blankEl.hidden = true;
        while (dlg.firstChild) dlg.removeChild(dlg.firstChild);
        const r = Object.assign({}, PREFILL);
        if (bracing) COLS.forEach(function (c) { delete r[c + '4']; });
        r.C1 = 'slightly more'; r.H9 = 'Σ: we are ok'; sheets.s1.raw = r;
        ovl = {}; snap = {}; fillPrev = {}; fillPlan = []; fillDrag = null; cmts = []; acCells = {}; undoStack = []; undoN = 0; undoOver = 0; unwound = false; spreadSet = {}; rbBtn.undo.removeAttribute('aria-disabled'); hasHands = false; heart.hidden = true; sbHands.hidden = true;
        heat.rc.length = heat.pv.length = heat.en.length = heat.all.length = 0; wb.classList.remove(Q('heat')); wb.classList.remove(Q('dim')); wb.classList.remove(Q('ab')); hb.hidden = true; fanIc.hidden = true;
        macro.timers.forEach(function (id) { api.clearTimeout(id); }); macro.timers = []; ghost.hidden = true; spanel.hidden = true; hideBubble(); silent = false; idleStage = 0; lastInput = api.now();
        okMode = true; wb.style.setProperty('--sm-half', Math.min(4, 1 + cycle) + 'px');
        titleOver = heatCount >= 3 ? 'Sheet' : ''; api.setTitle(titleOver || winTitle()); fname.textContent = fnTxt();
        meetN = 0; meetOpen = false; sbMeet.hidden = true; api.clearTimeout(meetTo); meetAt = 240 * TS; if (idleViewers) { idleViewers = false; sbView.textContent = 'People viewing: ' + viewers; }
        sbQ.textContent = qLabel(); sbQ.style.background = cycle >= 2 ? 'var(--sm-grey)' : '';
        t0 = api.now(); lastReveal = t0; actions = 0; qPct = 0; qmIdx = 0; accelAt = 0; cycleMeh = 0; minuteLog = []; micro = []; buildMicro();
        if (cycle >= 2 && !tabDefs.q5) { mkTab('q5', 'Sheet 7 3/4', 'Q5 is on a different sheet'); sbMid.textContent = 'Q5 is on a different sheet'; showBtn(tabDefs.q5); api.setTimeout(function () { if (sbMid.textContent.indexOf('Q5') === 0) sbMid.textContent = ''; }, 9000); }
        viewName = 's1'; showView('s1');
        sel = { a: 'B2', r: 'B2' }; ftl.textContent = ''; ftCount.textContent = 'Quiet Totals: ' + quietHeard.length + '/12';
        evalAll(); render(); syncBars(); focusCell(sel.a); api.sfx('pop');
        say(CLOSE.c6, { priority: 2 });
        api.setTimeout(function () {
          if (cycle === 1) { say(QQ.q4, { priority: 1 }); api.setTimeout(function () { say(QQ.q4b, { priority: 1 }); }, 4000); api.setTimeout(function () { say(QQ.q4c, { priority: 1 }); }, 9000); }
          else if (cycle === 2) { say(QQ.q5, { priority: 1 }); api.setTimeout(function () { say(QQ.q5b, { priority: 1 }); }, 3500); }
          else if (cycle <= 4) say(QQ.qn, { priority: 1, count: 3 + cycle });
          else say(QQ.q75, { priority: 1 });
        }, 4500);
      }
      /* ---------------- boot ---------------- */
      function init() {
        api.setTitle(fileName() + ' - Spreadsheet of Meaning');
        mkTab('s1', 'Sheet1', ''); mkTab('feel', 'Feelings', '', true); mkTab('pivot', 'Pivot', '', true);
        mkTab('s75', 'Sheet 7 1/2', 'Return to Sheet1 whenever you like. Sheet1 will be there. Sheet1 is always there. It is the most committed of the sheets.', true); mkTab('plus', '+', 'Add a sheet', true);
        api.on(root, 'keydown', onKey); api.on(root, 'pointermove', onMove); api.on(root, 'pointerup', onUp); api.on(root, 'pointercancel', onCancel); api.on(root, 'pointerdown', function (e) { noteInput(); if (e.target !== fh && !g.contains(e.target)) { fillDrag = null; dragSel = null; clearFillPrev(); } });
        api.on(root, 'wheel', onWheel, { passive: true }); api.on(g, 'pointerdown', onGridDown); api.on(g, 'click', onGridClick); api.on(g, 'dblclick', onDbl);
        api.on(g, 'pointerover', onOver); api.on(g, 'pointerout', onOut); api.on(fh, 'pointerdown', onFhDown); api.on(fh, 'lostpointercapture', onCancel);
        let hidAt = 0; api.on(document, 'visibilitychange', function () { onCancel(); if (document.hidden) hidAt = api.now(); else if (hidAt) { const d = api.now() - hidAt; hidAt = 0; t0 += d; lastReveal += d; lastInput += d; closeAt += d; quietAt += d; } }); api.on(window, 'resize', fit);
        api.on(edIn, 'input', function () { edTyped = true; fbar.value = edIn.value; acSuppress = false; acUpdate(); });
        api.on(edIn, 'focus', function () { if (mode === 'editing') editSrc = 'ed'; });
        api.on(fbar, 'focus', function () { if (mode === 'normal' && !roView() && isGrid()) startEdit(null, 'fbar'); else if (mode === 'editing') editSrc = 'fbar'; });
        api.on(fbar, 'input', function () { if (mode === 'normal' && !roView() && isGrid()) startEdit(fbar.value, 'fbar'); edTyped = true; edIn.value = fbar.value; acSuppress = false; acUpdate(); });
        metGerald = !!api.flag.get('metGerald');
        buildMicro(); fit(); evalAll(); render(); syncBars();
        if (mothState >= 2) placeTcur();
        setOvl('C2', '', 1200, '');
        api.setTimeout(function () { say(INTRO[0], { priority: 1 }); }, 400);
        api.setTimeout(function () { typeOvl('C2', '=HOPE()', 60, false, null, function () { api.sfx('tick'); mark('fl:C2', 400); }); }, 1200);
        api.setTimeout(function () { mark('fl:A7.5', 900); mark('fl:B7.5', 900); api.sfx('pop'); }, 3000);
        api.setTimeout(function () { say(INTRO[1], { priority: 1 }); }, 5000);
        api.setTimeout(function () { say(INTRO[2], { priority: 1 }); }, 9000);
        api.setInterval(tick, 1000); api.setInterval(drift, api.selftest ? 3000 : 30000);
        tick();
      }
      init();
      return {
        destroy() {
          dead = true;
          try { api.save.set('dennisSec', dennisSec); api.save.set('quiet', quietHeard); } catch (e) { /* ignore */ }
        }
      };
    }
  });
})();
