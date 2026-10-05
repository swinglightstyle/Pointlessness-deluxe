/* POINTLESS module: sheep-counter */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`
.m-sheep-counter-wrap{--ink:#1d1a2e;--cream:#fff4dc;max-width:1000px;margin:0 auto;display:grid;gap:10px;padding-bottom:150px;grid-template-columns:minmax(0,1fr);font-family:ui-rounded,'Trebuchet MS',system-ui,sans-serif;color:#1d1a2e}.m-sheep-counter-wrap [hidden]{display:none!important} .m-sheep-counter-wrap button{font-family:inherit;color:#1d1a2e} @media (min-width:860px){.m-sheep-counter-wrap{grid-template-columns:minmax(0,1fr) 270px}.m-sheep-counter-hd,.m-sheep-counter-sleep{grid-column:1/-1}} .m-sheep-counter-main,.m-sheep-counter-side{display:grid;gap:10px;min-width:0;align-content:start}.m-sheep-counter-hd{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between;background:#fff4dc;border:3px solid #1d1a2e;border-radius:14px;box-shadow:4px 4px 0 #1d1a2e;padding:8px 12px} .m-sheep-counter-night{font-weight:900;font-size:.9rem;line-height:1.25}.m-sheep-counter-night small{display:block;font-weight:700;opacity:.8;font-size:.72rem} .m-sheep-counter-odowrap{display:flex;flex-direction:column;align-items:center;gap:2px}.m-sheep-counter-odowrap b{font-size:.62rem;letter-spacing:.14em} .m-sheep-counter-odo{display:flex;align-items:center;gap:3px;background:#1d1a2e;padding:6px 8px;border-radius:10px;font:900 1.9rem/1 ui-monospace,Consolas,monospace;min-height:1.9rem}.m-sheep-counter-sgn{width:.55em;text-align:center;color:#e0594a;height:1em} .m-sheep-counter-dg{width:.78em;height:1em;overflow:hidden;background:#fff4dc;color:#1d1a2e;border-radius:4px}.m-sheep-counter-rl{display:flex;flex-direction:column;transition:transform .2s steps(6)} .m-sheep-counter-rl span{height:1em;line-height:1em;text-align:center;display:block}.m-sheep-counter-neg .m-sheep-counter-dg{color:#e0594a}
.m-sheep-counter-half{font-size:.62em;width:1.7em;text-align:center;border-radius:4px;background:#3a3558;color:#6f6a94;padding:2px 0}.m-sheep-counter-half.m-sheep-counter-on{background:#e5b83b;color:#1d1a2e} .m-sheep-counter-otx{color:#fff4dc;font-size:1.1rem;padding:0 6px;white-space:nowrap}.m-sheep-counter-odo2{font-size:.66rem;font-weight:800;letter-spacing:.04em} .m-sheep-counter-right{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.m-sheep-counter-tc{border:3px solid #1d1a2e;border-radius:10px;padding:3px 10px;background:#fff;text-align:center;line-height:1.2} .m-sheep-counter-tc b{display:block;font-size:.6rem;letter-spacing:.12em}.m-sheep-counter-tc span{font:900 1.15rem ui-monospace,Consolas,monospace} .m-sheep-counter-tc.m-sheep-counter-red span{filter:blur(4px);user-select:none}.m-sheep-counter-vs{position:relative;background:transparent;border:4px solid #c4352a;color:#c4352a!important;transform:rotate(-4deg);border-radius:8px;padding:1px 12px 3px;mix-blend-mode:multiply;cursor:pointer;font:900 1.1rem 'Segoe Script','Bradley Hand','Comic Sans MS',cursive;line-height:1.1;text-align:center;min-width:92px} .m-sheep-counter-vs small{display:block;font:900 .56rem system-ui,sans-serif;letter-spacing:.2em}.m-sheep-counter-vs.m-sheep-counter-slam{animation:m-sheep-counter-slam .28s ease-out} .m-sheep-counter-vs.m-sheep-counter-live{box-shadow:0 0 0 3px #fff4dc,0 0 0 6px #c4352a} @keyframes m-sheep-counter-slam{0%{transform:rotate(-14deg) scale(1.9);opacity:.2}60%{transform:rotate(-4deg) scale(.88)}100%{transform:rotate(-4deg) scale(1);opacity:1}} .m-sheep-counter-vsw{position:relative;display:inline-block}.m-sheep-counter-vsw.m-sheep-counter-haspet{margin-right:14px} .m-sheep-counter-pet{position:absolute;right:-24px;top:-28px;width:40px;height:40px;background:none;border:0;padding:0;cursor:pointer;z-index:2}.m-sheep-counter-petb{position:absolute;left:8px;top:10px;width:24px;height:20px;background:#1d1a2e;border-radius:55% 45% 60% 40%/50% 60% 40% 50%;animation:m-sheep-counter-wob 2.4s ease-in-out infinite;transform:rotate(4deg)}.m-sheep-counter-petb::before,.m-sheep-counter-petb::after{content:'';position:absolute;top:6px;width:4px;height:4px;border-radius:50%;background:#fff4dc;left:6px}
.m-sheep-counter-petb::after{left:14px} @keyframes m-sheep-counter-wob{50%{border-radius:40% 60% 45% 55%/60% 40% 60% 40%;transform:rotate(-6deg) scale(1.1)}} .m-sheep-counter-sleep{display:flex;align-items:center;gap:8px;background:#fff4dc;border:3px solid #1d1a2e;border-radius:12px;padding:5px 10px;font-weight:800;font-size:.76rem;cursor:pointer;text-align:left;width:100%} .m-sheep-counter-sleep span{white-space:nowrap} .m-sheep-counter-trk{flex:1;height:12px;border:2px solid #1d1a2e;border-radius:8px;background:#fff;overflow:hidden} .m-sheep-counter-trk i{display:block;height:100%;width:0;background:#8e7be0;transition:width .3s} .m-sheep-counter-field{position:relative;max-width:max(260px,min(620px,calc((100vh - 430px)*1.6)));width:100%;margin:0 auto} @media (min-width:860px){.m-sheep-counter-field{max-width:560px}} .m-sheep-counter-cv{display:block;width:100%;height:auto;border:3px solid #1d1a2e;border-radius:14px;box-shadow:4px 4px 0 #1d1a2e;background:#1b2150;touch-action:manipulation}
.m-sheep-counter-sign{position:absolute;left:8px;top:8px;max-width:44%;background:#e8b86d;border:3px solid #8a5a2b;border-radius:6px;padding:3px 7px;font-size:.66rem;font-weight:900;line-height:1.25;box-shadow:2px 2px 0 #1d1a2e;transform-origin:top left;animation:m-sheep-counter-unfurl .5s ease-out} .m-sheep-counter-sign b{display:block;font-size:.58rem;letter-spacing:.14em} @keyframes m-sheep-counter-unfurl{from{transform:scaleY(0)}to{transform:scaleY(1)}} .m-sheep-counter-banner{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);background:#fff4dc;border:4px solid #1d1a2e;border-radius:10px;padding:6px 16px;font-weight:900;font-size:1.6rem;letter-spacing:.06em;box-shadow:5px 5px 0 #1d1a2e;white-space:nowrap;animation:m-sheep-counter-drop .5s cubic-bezier(.3,1.6,.5,1)} @keyframes m-sheep-counter-drop{from{transform:translate(-50%,-250%)}to{transform:translate(-50%,-50%)}} .m-sheep-counter-local{position:absolute;right:8px;bottom:8px;background:#a78bfa;border:3px solid #1d1a2e;border-radius:999px;padding:1px 10px;font-weight:900;font-size:.62rem;letter-spacing:.06em;box-shadow:2px 2px 0 #1d1a2e} .m-sheep-counter-motion{position:absolute;left:8px;right:8px;bottom:8px;background:#fff9e8;border:3px solid #1d1a2e;border-radius:10px;padding:6px 8px;display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;font-size:.76rem;font-weight:800;box-shadow:3px 3px 0 #1d1a2e} .m-sheep-counter-motion span{flex:1 1 180px} .m-sheep-counter-jam{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-3deg);background:#e0594a;color:#fff;border:4px solid #1d1a2e;border-radius:10px;padding:8px 14px;font-weight:900;text-align:center;box-shadow:5px 5px 0 #1d1a2e;max-width:88%}
.m-sheep-counter-fstamp{position:absolute;left:50%;top:22%;transform:translateX(-50%) rotate(-8deg);border:4px solid #1d1a2e;border-radius:8px;padding:2px 12px;font-weight:900;font-size:1.15rem;letter-spacing:.08em;background:rgba(255,255,255,.88);pointer-events:none;white-space:nowrap;animation:m-sheep-counter-slam2 .2s ease-out} @keyframes m-sheep-counter-slam2{from{transform:translateX(-50%) rotate(-8deg) scale(3);opacity:0}to{transform:translateX(-50%) rotate(-8deg) scale(1);opacity:1}} .m-sheep-counter-mint{color:#1f7a4c;border-color:#55c58a}.m-sheep-counter-mus{color:#7a5b00;border-color:#e5b83b} .m-sheep-counter-lil{color:#5b3fc4;border-color:#a78bfa}.m-sheep-counter-cor{color:#b4352a;border-color:#e0594a} .m-sheep-counter-dim{position:absolute;inset:0;background:#000;opacity:0;border-radius:14px;pointer-events:none;transition:opacity 4s} .m-sheep-counter-dim.m-sheep-counter-on{opacity:.72} .m-sheep-counter-arrow{position:absolute;left:50%;top:-30px;margin-left:-.6em;font-size:1.3rem;z-index:2;animation:m-sheep-counter-bob .6s ease-in-out infinite alternate;pointer-events:none} @keyframes m-sheep-counter-bob{to{transform:translateY(6px)}} .m-sheep-counter-padtop{display:grid;gap:5px;position:relative} .m-sheep-counter-hint{font-size:.7rem;font-weight:800;text-align:center;opacity:.85;line-height:1.2} .m-sheep-counter-ov{position:absolute;left:8px;right:8px;top:8px;display:none;background:#fff9e8;border:2px solid #1d1a2e;border-radius:8px;padding:3px 8px;font:11px/15px ui-monospace,Consolas,monospace;box-shadow:2px 2px 0 #1d1a2e;pointer-events:none;overflow-wrap:anywhere} .m-sheep-counter-ov b{color:#b4352a;margin-left:6px;letter-spacing:.06em} .m-sheep-counter-ov div:first-child{font-weight:900} .m-sheep-counter-empty{font:11px/1.5 ui-monospace,Consolas,monospace;opacity:.7;padding:2px 2px 6px}
.m-sheep-counter-count{position:relative;width:100%;min-height:80px;border:4px solid #1d1a2e;border-radius:48px;background:radial-gradient(circle at 50% 28%,#f5d778 0,#d4a73a 48%,#8f6b17 100%);box-shadow:0 6px 0 #5b430c,0 8px 0 #1d1a2e,inset 0 4px 8px rgba(255,255,255,.55);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px;font-weight:900;font-size:1.3rem;letter-spacing:.2em;transition:transform .06s,box-shadow .06s;overflow:hidden;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;touch-action:manipulation}.m-sheep-counter-count kbd{font:800 .7rem ui-monospace,monospace;background:#1d1a2e;color:#fff4dc;border-radius:4px;padding:1px 6px;letter-spacing:0} @media (max-width:520px),(pointer:coarse){.m-sheep-counter-count kbd{display:none}} .m-sheep-counter-count:active,.m-sheep-counter-count.m-sheep-counter-dn{transform:translateY(4px);box-shadow:0 2px 0 #5b430c,0 4px 0 #1d1a2e,inset 0 4px 8px rgba(255,255,255,.4)} .m-sheep-counter-count.m-sheep-counter-shake{animation:m-sheep-counter-shk .12s linear infinite} @keyframes m-sheep-counter-shk{25%{transform:translate(-3px,1px) rotate(-1deg)}75%{transform:translate(3px,-1px) rotate(1deg)}} .m-sheep-counter-dome{font-size:2.1rem;letter-spacing:0} .m-sheep-counter-hope{position:absolute;left:0;bottom:0;height:7px;width:0;background:#8e7be0;z-index:1}.m-sheep-counter-hopetrk{position:absolute;left:0;right:0;bottom:0;height:7px;background:rgba(142,123,224,.3)} .m-sheep-counter-brk{min-height:80px;display:flex;align-items:center;justify-content:center;text-align:center;border:4px dashed #1d1a2e;border-radius:48px;background:#fff9e8;font-weight:900;padding:6px 14px} .m-sheep-counter-row{display:flex;flex-wrap:wrap;gap:8px} .m-sheep-counter-btn{position:relative;min-height:48px;padding:4px 14px;border:3px solid #1d1a2e;border-radius:12px;background:#fff4dc;box-shadow:3px 3px 0 #1d1a2e;font-weight:900;font-size:.82rem;cursor:pointer;display:inline-flex;gap:8px;align-items:center;justify-content:center;flex:1 1 90px}
.m-sheep-counter-btn kbd{font:800 .66rem ui-monospace,monospace;background:#1d1a2e;color:#fff4dc;border-radius:4px;padding:0 5px} .m-sheep-counter-btn:active:not(:disabled):not([aria-disabled=true]){transform:translate(2px,2px);box-shadow:1px 1px 0 #1d1a2e} .m-sheep-counter-btn:disabled,.m-sheep-counter-btn[aria-disabled=true]{opacity:.55;cursor:default} .m-sheep-counter-btn.m-sheep-counter-pop{animation:m-sheep-counter-pop .5s cubic-bezier(.3,1.7,.5,1)} @keyframes m-sheep-counter-pop{from{transform:scale(0)}to{transform:scale(1)}} .m-sheep-counter-btn i{position:absolute;left:3px;right:3px;bottom:2px;height:4px;background:#e0594a;border-radius:3px;transform-origin:left;transform:scaleX(0)} .m-sheep-counter-ram{position:absolute;right:12px;top:-24px;font-size:1.7rem;pointer-events:none;z-index:2} .m-sheep-counter-st{background:#fff4dc;border:3px solid #1d1a2e;border-radius:12px;padding:6px 10px;font-size:.72rem;font-weight:800;line-height:1.5;font-variant-numeric:tabular-nums} .m-sheep-counter-cap{min-height:1.4em;font-size:.82rem;font-weight:800;white-space:normal;line-height:1.3;max-height:2.7em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;padding:0 4px}.m-sheep-counter-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.m-sheep-counter-keys{font-size:.62rem;font-weight:700;opacity:.7;text-align:center;line-height:1.3;padding:0 4px} @media (pointer:coarse){.m-sheep-counter-keys{display:none}}
.m-sheep-counter-cap b{color:#b4352a;margin-right:6px} .m-sheep-counter-side h3{margin:0;font-size:.72rem;letter-spacing:.16em} .m-sheep-counter-slips{display:grid;gap:8px;max-height:240px;overflow:auto;padding:2px 2px 10px} @media (min-width:860px){.m-sheep-counter-slips{max-height:420px}} .m-sheep-counter-slip{position:relative;background:#fff9e8 repeating-linear-gradient(transparent 0 17px,rgba(80,50,20,.1) 17px 18px);border:2px solid rgba(29,26,46,.35);border-bottom:0;padding:8px 10px 20px;font:12px/18px ui-monospace,Consolas,monospace;color:#1d1a2e;-webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/14px 100%;mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/14px 100%} .m-sheep-counter-sl{overflow-wrap:anywhere} .m-sheep-counter-sl.m-sheep-counter-h{font-weight:900;border-bottom:1px dashed #1d1a2e} .m-sheep-counter-sl.m-sheep-counter-v{font-weight:900;color:#b4352a} .m-sheep-counter-sl.m-sheep-counter-tiny{font-size:8px;line-height:12px}
.m-sheep-counter-stamp{display:inline-block;margin-top:4px;border:3px solid;border-radius:6px;padding:0 8px;font-weight:900;transform:rotate(-8deg);animation:m-sheep-counter-slam2b .15s ease-out;letter-spacing:.08em} @keyframes m-sheep-counter-slam2b{from{transform:rotate(-8deg) scale(3);opacity:0}to{transform:rotate(-8deg) scale(1);opacity:1}} .m-sheep-counter-seal{display:inline-block;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle,#f5d778,#d4a73a);border:2px solid #8f6b17;vertical-align:middle;margin-left:6px} .m-sheep-counter-vlog{list-style:none;margin:0;padding:0;font:11px/1.5 ui-monospace,Consolas,monospace} .m-sheep-counter-obj{background:#fff;border:3px solid #1d1a2e;border-radius:10px;padding:8px;font-size:.74rem;font-weight:800;box-shadow:3px 3px 0 #1d1a2e} .m-sheep-counter-obj label{display:flex;gap:6px;align-items:center;cursor:pointer;margin-bottom:6px} .m-sheep-counter-bar{height:12px;border:2px solid #1d1a2e;border-radius:6px;overflow:hidden;background:#eee} .m-sheep-counter-bar i{display:block;height:100%;width:0;background:#55c58a} .m-sheep-counter-inv{background:#fff9e8;border:3px solid #1d1a2e;border-radius:8px;padding:8px;font:11px/1.55 ui-monospace,Consolas,monospace;box-shadow:3px 3px 0 #1d1a2e}
.m-sheep-counter-inv h4{margin:0 0 4px;font-size:.7rem;letter-spacing:.14em} .m-sheep-counter-inv ul{list-style:none;margin:0 0 6px;padding:0} .m-sheep-counter-inv li:last-child{font-weight:900} .m-sheep-counter-inv button{min-height:40px;width:100%;border:2px solid #1d1a2e;border-radius:8px;background:#e5b83b;font-weight:900;cursor:pointer} @media (max-width:859px){.m-sheep-counter-main,.m-sheep-counter-side{display:contents}.m-sheep-counter-side>*{order:9}.m-sheep-counter-hd{order:1}.m-sheep-counter-sleep{order:2}.m-sheep-counter-padtop{order:3}.m-sheep-counter-field{order:4}.m-sheep-counter-row{order:5}.m-sheep-counter-obj{order:6}.m-sheep-counter-h3a,.m-sheep-counter-slips{order:6}.m-sheep-counter-slips{min-height:90px}.m-sheep-counter-st{order:7}.m-sheep-counter-cap{order:8}.m-sheep-counter-keys{order:8}.m-sheep-counter-ov{display:block}.m-sheep-counter-ov:not([hidden])~.m-sheep-counter-sign{visibility:hidden}} @media (max-width:520px){.m-sheep-counter-motion{position:static;margin:8px 0 0}.m-sheep-counter-odo{font-size:1.45rem;padding:4px 6px;min-height:1.5rem}.m-sheep-counter-banner{font-size:1.15rem}.m-sheep-counter-sign{font-size:.58rem;max-width:50%}.m-sheep-counter-fstamp{font-size:.9rem}.m-sheep-counter-hd{padding:4px 8px;gap:2px 8px;border-radius:12px}.m-sheep-counter-night{flex:1 1 100%;display:flex;gap:8px;align-items:baseline;font-size:.78rem}.m-sheep-counter-night small{display:inline}.m-sheep-counter-right{gap:8px;flex-wrap:nowrap}.m-sheep-counter-tc{padding:1px 6px}.m-sheep-counter-tc span{font-size:.9rem}.m-sheep-counter-vs{font-size:.9rem;min-width:70px;border-width:3px;padding:0 6px 2px}.m-sheep-counter-sleep{padding:2px 8px;font-size:.68rem;border-width:2px}.m-sheep-counter-btn{min-height:40px;padding:2px 4px;font-size:.7rem;gap:4px}.m-sheep-counter-btn kbd{display:none}.m-sheep-counter-row .m-sheep-counter-btn{flex:1 1 0;min-width:0}.m-sheep-counter-count{min-height:68px;font-size:1.15rem}.m-sheep-counter-brk{min-height:68px}.m-sheep-counter-cap{white-space:normal;max-height:3.2em;line-height:1.2}} @media (prefers-reduced-motion:reduce){.m-sheep-counter-wrap *{animation:none!important;transition:none!important}} .m-sheep-counter-rm *{animation:none!important;transition:none!important}
`, 'css-sheep-counter');
  P.addAchievements([
    { id: 'sheep-counter.order-third', name: 'The Grand Order of the Accurate Tally, Third Class', desc: 'Count 10 sheep. Accuracy was not required, it was just noted.', icon: '🏅', reward: 1,
      check: function (s) { return (s['sheep-counter.counted'] || 0) >= 10; } },
    { id: 'sheep-counter.doctor', name: 'Doctor of Ovine Arithmetic (Honorary, Non-Transferable)', desc: 'Survive 7 audits. Your variance has been carried forward as a family heirloom.', icon: '🎓', reward: 3,
      check: function (s) { return (s['sheep-counter.audits'] || 0) >= 7; } },
    { id: 'sheep-counter.break', name: 'Grand Marshal of Mid-Air Break Time', desc: 'Count a sheep during its 15-minute break without interrupting its tea.', icon: '☕', reward: 2,
      check: function (s) { return (s['sheep-counter.breaks-counted'] || 0) >= 1; } },
    { id: 'sheep-counter.brenda', name: 'Knight Commander of the Order of Brenda', desc: 'Correctly ear-tag Brenda 3 times. She has been verified, and is also someone else.', icon: '🐑', reward: 7.5,
      check: function (s) { return (s['sheep-counter.brenda-tags'] || 0) >= 3; } },
    { id: 'sheep-counter.counsel', name: "Supreme Champion of the Fence's Legal Interests", desc: "Sustain or overrule 10 of Mr. Palisade's motions. He bills you for it.", icon: '⚖️', reward: 3,
      check: function (s) { return (s['sheep-counter.motions'] || 0) >= 10; } },
    { id: 'sheep-counter.goats', name: 'Goat Recognised in a Court of Technically', desc: 'Correctly flag 5 goats and wrongly flag 3 sheep. Both sides feel validated.', icon: '🐐', reward: 2,
      check: function (s) { return (s['sheep-counter.goats-right'] || 0) >= 5 && (s['sheep-counter.goats-wrong'] || 0) >= 3; } },
    { id: 'sheep-counter.local', name: 'Honorary Local 7 1/2 Shop Steward Emeritus', desc: "Reach the fence's lawyer with the Stapler representing the flock. You join a list titled Colleagues.", icon: '📎', reward: 2 },
    { id: 'sheep-counter.objector', name: 'Professional Objector, Upheld In Part', desc: 'File 10 objections. Each was received by a committee of one.', icon: '📋', reward: 2,
      check: function (s) { return (s['sheep-counter.objections'] || 0) >= 10; } },
    { id: 'sheep-counter.hundred', name: 'Order of the Unblinking Tally, First Class', desc: "Count 100 sheep. Management's count is 100 1/2. The 1/2 is in a frame.", icon: '🏅', reward: 10 },
    { id: 'sheep-counter.counted', name: 'The Counted', desc: 'Idle for 90 seconds while a sheep counts you instead.', icon: '💤', secret: true, reward: 2 },
    { id: 'sheep-counter.asylum', name: 'Ovine Overnight Asylum', desc: 'Do nothing for 150 seconds. The meadow dims and the golden ram sits by the button.', icon: '🐏', secret: true, reward: 5 },
    { id: 'sheep-counter.river', name: 'Woolen Hydrology Laureate of the Eastern Pasture', desc: 'Count so fast the flock becomes a single wool river.', icon: '🐑', secret: true, reward: 3 },
    { id: 'sheep-counter.deficit', name: 'The Immaculate Deficit', desc: 'Achieve a perfect, illegal count of -1. The fence faints.', icon: '🌙', secret: true, reward: 7.5 },
    { id: 'sheep-counter.fluent', name: 'Fluent in Flock', desc: "Type 'baa' in the meadow. A whole flock answers, in order.", icon: '🐑', secret: true, reward: 1 },
    { id: 'sheep-counter.gate', name: 'A Painting of a Gate', desc: 'Ask the fence the same question three times. It would like a gate.', icon: '🔔', secret: true, reward: 3 },
    { id: 'sheep-counter.empty', name: 'The One Who Counted Nothing', desc: 'Press nothing for 30 seconds. The sheep waited with you. This is the whole achievement.', icon: '🌿', secret: true, reward: 2 },
    { id: 'sheep-counter.auditor', name: 'The Auditor Is A Sheep', desc: 'Meet Sheep 404, who counted the counter. Correct.', icon: '📋', secret: true, reward: 3 },
    { id: 'sheep-counter.principled', name: 'Principled Non-Counter', desc: 'Decline to count the golden sheep. Management has written this down.', icon: '🐏', secret: true, reward: 3 },
    { id: 'sheep-counter.tuesday', name: 'Grand Chancellor of the Day Before the Day After the Day Before', desc: 'Say the word. Tuesday did not appear. It noticed. Management went for a long walk to the same chair.', icon: '📣', secret: true, reward: 7.5 },
    { id: 'sheep-counter.plaque', name: 'Employee of the Month (of a Month That Has Not Started)', desc: 'Stay in the meadow for 10 minutes. The plaque says VALUED. The engraver sneezed.', icon: '🏅', secret: true, reward: 5 },
    { id: 'sheep-counter.fun', name: 'Attendee of Record, Mandatory Fun (Enjoyment Pending)', desc: 'Get through the Mandatory Fun Hour. Satisfaction was 7 1/2, as reported by the fun.', icon: '🏅', reward: 2,
      check: function (s) { return (s['sheep-counter.fun-hours'] || 0) >= 1; } },
    { id: 'sheep-counter.held', name: 'Lord Warden of the Held Count, Hereditary and Also Not', desc: 'Hold COUNT for 7 1/2 seconds. It is counted on release, with a small ceremony.', icon: '🔔', secret: true, reward: 3 },
    { id: 'sheep-counter.clock', name: 'Chief Horologist of the Wrong Hour, Retired Before Appointment', desc: 'Tap the moon while it is a clock. It is 4:17. It is also 9:15.', icon: '🔔', secret: true, reward: 3 }
  ]);
  const L = {};
  P.addLines('m:sheep-counter:welcome', L.welcome = [ `Welcome, {player}. Press COUNT when a sheep is at the top of its jump. That is the whole job. Accuracy will be audited.`, `Welcome back, {player}. The sheep were counted in your absence. They disagree with that count and have attached their own.`, `Your role is to count sheep accurately. Accuracy will be assessed by someone who has not seen a sheep and has asked to be told what one is.`]); P.addLines('m:sheep-counter:night', L.night = [ `Night {count}. All sheep are now wearing ties. This is not a promotion. It is a dress code.`, `Welcome back, {player}. Please count the sheep accurately. The sheep have been briefed on your methods.`, `Night {count}. Your inherited variance has been carried forward as heirloom debt. It has been in the family for 8 minutes.`, `Fence, the Sequel has been installed. It is the same fence with a ribbon on it. Cousin Dave says the ribbon is structural.`, `Brenda is back. Ear tag #4, a hat, and the First Sheep's tag on top of that. She says she is new, with great warmth.`, `The field has been reset. Official Count: 1. Your Count: 0. Variance: 1. Please begin disagreeing. Management has been told this is a loop. Management has asked that it be called a reset.`]); P.addLines('m:sheep-counter:clean', L.clean = [ `Clean count. The sheep felt that. It has not said anything, but the fence has noted it.`, `Sheep {count} has jumped. Per policy, it has stopped being a sheep and become a statistic.`, `Counted at the apex. The apex has been informed. The apex asks to be left out of this.`, `Stamped at 4:17 PM near the third ficus. The ficus has been copied on this.`, `That was within 120 milliseconds of the apex. We do not know why we measure that. We are very good at it.`, `Accurate. The sheep has been counted exactly once, which is unusual and is being looked into.`, `Clean. A very small ledger, somewhere, has sat up straight.`, `Clean count. Please do not let it go to your head. The head has not been audited and will be, in Q3.`, `Counted on the apex. The apex has had a lot of visitors tonight and remembers none of them.`, `A clean count has been logged and then mislaid. We are looking in both places.`, `Clean. The sheep would like to thank its mother, the fence, and a person it cannot see.`, `Clean count. Sandra from Compliance has asked to see it. Sandra has seen it. Sandra has asked to see it again.`, `Clean count at sheep {count}. The first three clean counts were an accident and have been retired, with a small party.`]); P.addLines('m:sheep-counter:early', L.early = [ `Premature. You counted a sheep that had not yet technically jumped. It is currently thinking about it.`, `Counted early. The sheep is still on the left, and legally a rumor.`, `Premature, noted, and filed under Anticipation (see also: Tuesday).`, `That sheep has not decided yet. You have decided for it. It is flattered, and a little pressured.`, `Early. The sheep was still deciding between jumping and a career in logistics.`, `Premature. The sheep has been counted before it was introduced. It would like a chance to make a first impression.`, `Counted early. The sheep is carrying a number it has not yet earned. It is carrying it well.`, `You counted the run-up. Run-ups are covered by a different policy, which is also this one.`]); P.addLines('m:sheep-counter:late', L.late = [ `Retroactive. The sheep was already on the other side. Legally, it is a different sheep now.`, `Counted late. The sheep has moved on and is now somebody else's responsibility.`, `Retroactive count accepted. Retroactive acceptance has been retroactively approved.`, `That sheep has landed. It would like to be referred to in the past tense.`, `Late. The sheep has landed, shaken itself off and gone on with its life. Thank you for your interest in its past.`, `Retroactive. The count has been backdated to Thursday, which is when the sheep would have preferred it.`, `Counted after landing. The sheep is in the next field now and has been counted there as well, by someone else, wrongly.`, `Late count. The apex is in the past. It sends its regards and an invoice for the memory.`]); P.addLines('m:sheep-counter:none', L.none = [ `You counted a sheep that was not there. The sheep appreciates the confidence. The sheep is on its way.`, `Speculative count logged. Management files speculation under Hope, which is a different department.`, `A count with no sheep in it. It is the purest kind. It is also not allowed.`, `You counted a sheep that was not there. It has been added to the flock as a precaution. It is a very quiet sheep.`, `Speculative count. Management has gone to look for the sheep. Management reports a field.`, `Counted in advance. This is called forecasting, and it is how weather happens.`, `Nothing was there, and you counted it. The nothing has been very good about it.`]);
  P.addLines('m:sheep-counter:recount', L.recount = [ `Recount. Sheep subtracted: 1. The sheep did not leave. It was never fully there. Closure is difficult.`, `You un-counted a sheep. It is now in a legal grey area, at the edge of the field, loitering.`, `Subtracted. The clicker ratchets backwards. It sounds like a tiny mind being changed.`, `Subtracted. The sheep is not gone. It is simply no longer yours, which is a different sheep problem.`, `The recount has been recounted and found to be the same size as the original, but sadder.`, `You took one back. The sheep has been told it was given to you in error and then taken back in error.`, `Minus one. The sheep stepped out for a moment and its count was spirited away. It will return as a feeling.`]); L.below = `Your count is below zero. Management has no floor for this and has sent for floor 7 1/2.`; P.addLines('m:sheep-counter:lamb', L.lamb = [ `Lamb recorded: 0.5 sheep. The other 0.5 is still in the lamb. We are trying to be supportive.`, `Half a sheep logged. Half a sheep is more than half a sheep in a coat, but not by much.`, `Lamb. 1/2 of a sheep, and 100% of a lamb. The Audit has chosen the first number. The lamb was not asked.`, `Half a sheep, counted. The other half is on its way, in a smaller, later lamb.`, `Lamb logged at 1/2. The lamb is in the room and would like to be rounded up.`]); P.addLines('m:sheep-counter:goat', L.goat = [ `Sheep 14 is a goat. Please do not make a thing of it. The goat is making a thing of it.`, `Goats are not sheep. Sheep are not goats. This has never come up before and we are not prepared.`, `The goat has submitted a counter-count. The counter-count is 'goat'. Management has noted the confidence.`, `A goat in a waistcoat has requested that you refer to it as 'a very tall sheep'. The request has been under review since 1998.`, `The goat has been informed it is not a sheep. It took this in the spirit of a goat, and began eating the memo.`, `A goat in a waistcoat has asked who is in charge. Management said the fence. The fence said Mr. Palisade. The goat asked who that is.`, `A goat has jumped the fence with the confidence of a much older sheep. Nobody has said anything. Everybody has written it down.`]); L.goatTag = `A goat has handed you a tag. The tag says G. You may now flag goats. The goat looks disappointed in its own cleverness.`; P.addLines('m:sheep-counter:goatright', L.goatRight = [ `Goat marked correctly. Goat tag reads: NOT TODAY. The goat has accepted this the way goats accept things.`, `That was a goat. Goats are, per Section 9, 'sheep-adjacent, but louder'.`, `Flagged. The goat says it is 'a very tall sheep and also a goat'. Both have been filed. Neither has been read.`, `Goat, correctly. A small cheer has gone up from the goat bench, which is a bench.`]);
  P.addLines('m:sheep-counter:goatwrong', L.goatWrong = [ `You marked a sheep as a goat. The sheep has filed Form 27B/6. The sheep does not have hands. The form arrived anyway.`, `That sheep is now Technically a Goat. The goat across the field is now Technically a Sheep. Both are offended.`, `That was a sheep. It has gone quiet and is thinking about its family tree, which is a hill.`, `You flagged a sheep as a goat. The sheep asked what it did. It was told 'jumped'. It says that is the job.`]); P.addLines('m:sheep-counter:auditopen', L.auditOpen = [ `Reconciliation Interval reached. Please remain calm and in the field. The field is not a metaphor. It is a field.`, `The auditor has arrived. The auditor is a clipboard. The clipboard has a lanyard. Nobody has asked who is wearing it.`, `A sheep is in the air. Per policy, it is technically on both sides. It has been asked not to land until we finish.`, `Audit time. Please do not count during an audit. Counting during an audit counts as an audit.`, `Reconciliation Interval. Please put down anything that is not a clipboard. The clipboard will tell you if that is a clipboard.`, `The audit is starting. The sheep in the air has been asked to wait. It has the face of a sheep who has been asked before.`, `Audit. Please remain where you are. This applies to the field and, in a lighter sense, to everything.`, `Interval reached. The numbers are being brought out. They are shy and must be handled one at a time.`]); P.addLines('m:sheep-counter:auditresult', L.auditResult = [ `The True Count includes one sheep you could not see. It was there. It was shy.`, `A variance of [v] has been recorded. It is the largest we have framed together. The frame was not ready and has been called in.`, `Your count is within 4% of ours, which is the margin of error for this department, and also for love.`, `Close. Off by exactly the amount you feared.`, `Audit complete. Results are final and pending. Please recount, as results are final and pending.`, `Your accuracy is [acc]. The rest is classified. It went Tuesday.`, `Ruling: the sheep in the air was technically on both sides. It has been informed. It would like to land.`, `Audit note: your count and ours were compared by hand, then by foot, then by a sheep. The sheep was the most accurate and has asked not to be named.`, `The True Count and your count have met. It went the way these things go.`, `You are off by an amount. The amount has been put in a smaller box inside a larger box marked Amount.`, `Your count has been reviewed by the Committee of One. It said 'hm' and left for a long lunch. The lunch is going well.`, `Accuracy has been measured with a ruler. The ruler is not for this. The ruler is, however, very sure.`, `The audit found nothing wrong with the sheep. It found something wrong with the number and is not saying which.`, `The True Count has been signed in three places. One of the signatures is a hoof. We have decided to allow the hoof.`]); P.addLines('m:sheep-counter:auditexact', L.auditExact = [ `You counted exactly right. Variance: +1. Exactness is a red flag. Please explain yourself in writing.`, `Your count and the True Count are the same. We have corrected the True Count. Please do not do that again.`, `Exact. The sheep are uncomfortable. The fence has asked for a lawyer, which it does not have yet.`, `You counted exactly right. We are not saying you cheated. We are saying the number cheated, and you were nearby.`, `Exactly right. A sheep has been sent back out to be wrong, so that things can return to normal.`]); P.addLines('m:sheep-counter:auditclose', L.auditClose = [ `Your count and the True Count are now [v] apart. Please do not do that. It makes the sheep uncomfortable.`, `Management would like to confirm that your count is, at this time, within the range of the True Count's feelings.`, `Within [v] of the True Count. This is the closest anyone has been to us. Please do not make it a habit. We are not ready.`, `The gap between your count and ours is now small enough to be a sheep. We are keeping an eye on it. It has one on us.`]); P.addLines('m:sheep-counter:audit7half', L.audit7 = [ `Variance: 7 1/2. Management notes that 7 1/2 is the correct number. Management also notes that this is the problem.`, `The variance is 7 1/2. It is always 7 1/2. We would like to thank you for your patience with the number.`, `Variance: 7 1/2. We have no further comment. We have all the comments, but they are 7 1/2 of them.`, `Legal Review: Mr. Palisade has read the audit. Mr. Palisade has billed for reading the audit.`, `Variance: 7 1/2. We checked it against itself and it agrees. This is the worst news so far.`, `Variance: 7 1/2. A smaller variance has been requested from the Variance Department. The Variance Department is also 7 1/2.`, `Variance: 7 1/2. This number has been on the field longer than the sheep and has the lanyard to prove it.`, `The variance is 7 1/2. It was 7 1/2 yesterday, which was Tuesday, which is when we measure it.`]);
  P.addLines('m:sheep-counter:clauses', L.clauses = [ `CLAUSE 3(a): sheep that jumped backwards count -1.`, `CLAUSE 7(b): a sheep that stood near the fence and thought about it counts 0.25.`, `CLAUSE 9: goats count 0 (sheep-adjacent).`, `CLAUSE 11: a sheep wearing another sheep's tag counts as that sheep, and also as itself.`, `CLAUSE 14.3: Brenda is governed by this sentence.`, `CLAUSE 22: ceremonial sheep are not included in the True Count but are included in your guilt.`, `CLAUSE 31: a sheep with a sheep face is flagged. Ruling by Sandra.`, `CLAUSE 40: half a sheep in a coat is 3/4 of a sheep in a coat, by ruling.`, `CLAUSE 2: a sheep counted in a dream counts only in the dream, which is not a jurisdiction.`, `CLAUSE 5(c): a sheep that jumps while the fence is billing is a different sheep for tax purposes.`, `CLAUSE 12: no sheep may be counted twice, except by the Audit, which counts them as often as it likes.`, `CLAUSE 17: wool is a form of weather and must be reported to the weather.`, `CLAUSE 19.9: a clipboard may not be asked to remember a sheep.`, `CLAUSE 28: in the event of a tie, the sheep wins, and the tie is a tie.`, `CLAUSE 33: all sheep are equal before the fence. The fence is not equal before the sheep.`, `CLAUSE 41: the moon may not be counted, but may be thanked.`, `CLAUSE 57(f): see CLAUSE 57(e). CLAUSE 57(e) has been eaten.`]); P.addLines('m:sheep-counter:objection', L.objection = [ `Objection filed. Please enjoy this progress bar. It is 99% complete. It has been 99% complete since 2011.`, `Your objection was received by a committee of one. The committee is out of the office, and is also the fence.`, `Objection filed. The committee has asked you to describe the sheep. You have not described the sheep. This is also being counted.`, `Objection to the objection: denied. Objection to the denial: also denied, and billed.`, `The fence has been billed 1 hour for your objection. It did not ask to be involved. It is a fence.`, `Objection received. A form has been created to acknowledge the form that acknowledges your objection. It is coming on foot.`, `Your objection has been given the number 7 1/2. Please do not look for it under that number. It is in the number.`, `Objection filed in triplicate. One copy went to the fence, one to the sheep, and one to a drawer sealed for the drawer's protection.`]); P.addLines('m:sheep-counter:upheld', L.upheld = [ `Objection upheld in part. The part that was upheld is the part that was not the point.`, `Upheld in part. The part has been put somewhere safe. We have forgotten where, which is the safest place.`, `Your objection has been upheld in the following part: the first word. The other words have been invited to try again.`, `Upheld in part. The part is the comma. It was a very good comma.`, `Upheld in part, by the part of the committee that is the fence. The other part is not in.`]); L.upheld7 = `Upheld in part. The part is 7 1/2.`; L.objCount = `You have filed {count} objections. Management admires the stamina. The committee of one has requested a second committee.`; P.addLines('m:sheep-counter:half', L.half = [ `Sheep 7 has been counted. Sheep 8 is coming. Something jumped between them. We are calling it 7 1/2.`, `Sheep 7 1/2 has returned. It waved. We have no policy on waving.`, `Sheep 7 1/2 now has a tiny name tag. It reads '7 1/2'. It is very proud of the 1/2.`, `Sheep 7 1/2 has been promoted to Associate Half. The promotion is a smaller lanyard.`, `Sheep 7 1/2 is on the picket line, carrying half a sign. The half that is showing says A LITTLE MO.`, `Sheep 7 1/2, seen: yes. The slip says so. The slip has always said so.`, `Sheep 7 1/2 has retired, on a half pension. It is receiving the other half in spirit.`]); P.addLines('m:sheep-counter:signs', L.signs = [ `Jump at 40 degrees.`, `No jumping on Tuesday.`, `Sheep must declare intent.`, `Please do not name the sheep. They will answer.`, `Fence Code 4(b) applies to the fence.`, `Landing is not a right. It is a privilege.`, `Rule 7 is only half in force.`, `Sandra has seen this sign.`, `A sheep is a sheep until the Audit says otherwise.`, `Do not feed the sheep. Do not count the sheep you have fed.`, `The fence has the right to remain a fence.`, `Tuesday has not been informed.`, `Hats are a form of opinion.`, `No counting before the first sheep.`, `The apex is for staff.`, `Wool is not a personality.`, `Please queue in the order you were counted.`, `Anything not a sheep is a sheep until proven a goat.`, `This sign is also a fence.`, `Tuesday may not be jumped.`, `Sheep may not outnumber their count.`]);
  P.addLines('m:sheep-counter:sandra', L.sandra = [ `Sandra from Compliance has flagged the whole flock. The flock has flagged Sandra back.`, `Sandra has used the word 'fluffy' in a way that has caused concern.`, `The signboard has been updated. The sheep are jumping very upright, which is the intended effect.`, `Sandra has added a footnote to the True Count. The footnote is also a count.`, `Sandra is thrilled and asks that this not be used as a precedent.`, `Sandra from Compliance has reviewed the sheep and approved of the sheep. She has not reviewed the field. The field is waiting.`, `Sandra has asked that the word 'fence' be replaced with 'a boundary experience'. The fence has asked that Sandra be replaced.`, `Sandra has flagged that the flag has not been flagged. The flag has been flagged. Sandra is calm.`, `Sandra from Compliance would like a word. She has used it. The word was 'ovine', and it has been taken from her.`]); L.sandra31 = `Sandra has flagged sheep #33 for having a sheep face. The sheep has been asked to change its face. It has asked which one.`; P.addLines('m:sheep-counter:union', L.union = [ `SHEEP LOCAL 7 1/2 has been formed. They have demands. The demands are written in grass.`, `The Stapler has arrived. It says the sheep are 'not asking for much, just 11 percent and a stapler of their own'.`, `WHAT DO WE WANT? Clearly defined fences. WHEN DO WE WANT THEM? After the next jump, but only if it is convenient.`, `Per the collective agreement, sheep may only jump at the apex on alternate Thursdays. Today is Tuesday. They are jumping anyway.`, `Counting is now 'tallying', and tallying may only occur between 9:15 and 9:15.`, `The sheep have elected a shop steward. It is the same sheep as last time. The election was a formality, and also a sheep.`, `Local 7 1/2 wants a cafeteria. The field is already all grass. The sheep say that is a buffet, and a buffet is not a cafeteria, and they have a form.`, `The Stapler has called a meeting of the flock. The meeting has no agenda. It has a stapler.`, `The union has asked for a codeword to be used in emergencies. Management has offered 'Tuesday'. The union has called that an emergency.`]); L.stapler = `The Stapler recognises you from another department. It says the demands are the same, and nods, once, with a clunk.`; P.addLines('m:sheep-counter:demand', L.demand = [ `Demand 1: shade. Demand 2: more shade. Demands 3 through 7: the same, but louder, and with a bit of shade.`, `Demand 7 1/2: a little more fence. Management would like to understand how much more fence it is possible to want.`, `Demand 9: a sheep named Gerald in a leadership role. Gerald is a potato. The sheep are aware.`, `Strike pay has been set at 3 hay per sheep. We do not have hay. We have forms that say hay.`, `Demand 12: a sheep-sized chair. Demand 13: a chair-sized sheep. The Stapler has explained they are different.`, `Demand 22: that Tuesday be consulted. Demand 23: that Tuesday be told what it is being consulted about.`, `Demand 7 1/2(a): a tea urn. Demand 7 1/2(b): a second tea urn, for emergencies, which is tea.`, `Demand 40: the right to jump at an angle of the sheep's own choosing. Demand 41: the angle.`]); L.breakLine = `Break time. The sheep in mid-air has paused for 15 minutes. Please do not count it until it has finished its tea.`; L.breakLine2 = `Another break. The sheep are on a rota. The rota is also on a break, and has left a note that says 'ask Sandra'.`; L.breakCounted = `You counted the sheep on its break. It has been told it was counted. It continued with its tea.`;
  P.addLines('m:sheep-counter:palisade', L.palisade = [ `Mr. Palisade: 'Objection. My client has been jumped over 212 times without consent.'`, `Mr. Palisade: 'My client is a person for legal purposes.' The fence was asked to confirm this and did not move, which is its answer.`, `Fence, Esq. objects. On what grounds? 'On the grounds that I am a fence,' says the fence. It is a strong argument.`, `Counting without representation. You have been stamped. The stamp is decorative. It looks very serious.`, `Plaintiff (Fence) versus You (Counting). The judge is a moon. The moon has not agreed to this.`, `Mr. Palisade has billed the fence 0.4 hours for this sentence. The fence has paid in splinters.`, `The fence is billing you 0.1 hours per sheep. The fence has asked that you not take it personally. It is entirely personal.`, `Mr. Palisade has requested that sheep jump at a respectful angle.`, `Mr. Palisade has called a recess. Nobody knows where it is. He has gone to find it with a small torch.`, `Mr. Palisade has objected to the word 'jump'. He prefers 'unauthorised vertical visit'.`, `Mr. Palisade has submitted Exhibit A. It is a splinter. The splinter has been sworn in.`, `Mr. Palisade has been seen speaking to the moon. The moon has been seen not speaking back. Both parties have billed.`, `Mr. Palisade's tie has changed colour. The fence is upset. The two are not connected, and are connected.`]); L.palIntro = `The fence has retained counsel. His name is Mr. Palisade, Esq. He has only ever represented the fence, and he is very good.`; P.addLines('m:sheep-counter:sustained', [ `Sustained. The fence has been billed 0.3 sheep for the inconvenience of being sustained. The fence did not ask for this.`, `Sustained. The fence has asked for that in writing and received it in splinters.`, `Sustained. Mr. Palisade has billed for the word Sustained.`, `Sustained, to the extent that anything here stands.`, `Sustained. A gavel has been found. It is a clothes peg. It will do, and has been billed.`, `Sustained. The fence bowed. It has no waist, so the bow was a leaning.`]); P.addLines('m:sheep-counter:overruled', [ `Overruled. The fence has been billed 0.3 sheep for the inconvenience of being overruled. The fence is beginning to see a pattern.`, `Overruled. The fence took it well, in the way a fence takes things.`, `Overruled. Mr. Palisade has asked what the other option was. You have not said.`, `Overruled. The moon has noted it, which is not the same as agreeing.`, `Overruled. The ruling is in the record. The record is one page and is mostly rulings against the fence.`, `Overruled. The fence flinched. It has been told this is not a precedent, only a flinch.`]); P.addLines('m:sheep-counter:noruling', [ `No ruling was made. The court rules this as a ruling. It is noted that nobody was in the room.`, `The motion timed out. It has been granted a new one, which has also timed out. They have become friends.`, `No ruling. The motion has gone home with a note saying it will try again Thursday.`]); P.addLines('m:sheep-counter:tagwrong', [ `You tagged a sheep that was not Brenda. It is now Brenda (apparently). It has accepted the name.`, `That was not Brenda. It has been Brenda for three seconds and already has opinions about the job.`, `Wrong sheep. The real Brenda has been informed that someone else is doing her. She is relieved.`]);
  P.addLines('m:sheep-counter:goatcount', [ `You counted a goat. It is now a sheep for the purposes of this meeting and a goat for the purposes of lunch.`, `A goat has been counted as a sheep. It did not correct you. It is saving that for the review.`, `The goat has been added to your count and subtracted from its own. Both are fine with it. It is a goat.`]); P.addLines('m:sheep-counter:strike2', L.strike2 = [ `The strike has been rescheduled. The sheep are sitting again, but on cushions they brought themselves.`, `Strike over, again. The cushions have been left behind. Nobody will claim them, so the fence has been asked to hold them.`, `You counted a sheep on a cushion. The cushion has asked to be counted too, and then the other way round.` ]); L.firstClean = `Clean. That is the entire method: the top of the jump, once. Management has waited a whole career for someone to do that.`; L.believed = `Management would like to point out that Sheep Believed is a separate column. It has always been a separate column.`; L.youOne = `The sheep would like to confirm your count. It is 1. It has been 1 since you arrived.`; L.officialCount = `Official Count: 1. Your Count: 0. Variance: 1. Please begin disagreeing.`; L.firstGone = `Sheep 1 has cleared the fence uncounted. It asked whether that counts. It does not.`;
  L.hint = `The moon is available for tapping. Management has not said that. Management has said nothing.`; P.addLines('m:sheep-counter:motions', L.motions = [ `Objection: the fence was jumped without consideration.`, `Objection: the defendant is counting in a tone.`, `Objection: that sheep was leading the witness over the fence.`, `Objection: my client would like it noted that he is a fence.`, `Objection: relevance. Of the sheep. To anything.`, `Objection: the moon is a biased notary.`, `Objection to this objection (it is mine, and it is sustained).`, `Motion to dismiss the field. The field has not been served.`, `Motion for a gate.`, `Motion to be addressed as 'Fence, Esq., Esq.'`, `Objection: the witness is wool.`, `Objection: this field has been used for sheep without a permit for sheep.`, `Motion to adjourn until the fence has finished having feelings.`, `Motion for a short recess, to be taken in the long grass.`, `Objection: my client did not consent to being an obstacle.`, `Motion to strike the word 'strike' from the record, in light of recent events.`]); P.addLines('m:sheep-counter:settle', L.settle = [ `Payment deferred. Deferral is a form of payment in some jurisdictions, none of which are this one.`, `The bill has been settled later. Later is a place. It is the same place as Tuesday.`, `Settled later. A receipt for later has been issued. The receipt is also for later.`, `Later has been informed. Later says it has a lot on and can fit you in after the thing.`, `Payment deferred to a date that has not been invented. The calendar department has been contacted and has said it will think.`, `The bill has been paid in good faith. Good faith has been billed.`]); L.settleN = `Settle Later has been pressed {count} times. Later is getting crowded.`; P.addLines('m:sheep-counter:brenda', L.brenda = [ `A sheep with ear tag #4 has entered from the right and jumped the fence backwards. Management has no category for this. It is Brenda.`, `Brenda has been counted as -1, and also as a new sheep, Brenda (2). The Audit sees no conflict.`, `The Audit has decided to count 'Brenda (all)' as a single recurring sheep. Brenda has not been consulted. Brenda does not mind.`, `The sheep chorus asks you to stop making this about Brenda. The sheep chorus is making this about Brenda.`, `Brenda has asked whether she has been here before. Management said no. The Audit said -1. Brenda said she will take that.`, `Brenda was counted twice and has asked to be paid twice. The Audit has paid her once, backwards.`]); L.disguise = [null, `Brenda has returned wearing a hat. Management cannot confirm that it is the same Brenda. Management would like to confirm that it is the same Brenda.`, `Brenda is back with a beard. It is not the goat's. We checked.`, `Brenda has returned as a goat. Brenda is not a goat. The Audit has counted her as Brenda (all).`, `Brenda has returned as a lamb. She is the same height. This has been ruled irrelevant.`, `Brenda has returned wearing the fence. She is the fence for the purposes of the jump. The fence has not been consulted.`, `Two sheep under one sheet. One of them is Brenda. We have not been told which one is the other one.`]; L.tagRight = `Brenda tagged, correctly. She has been recognised. She says she is new.`;
  L.verified = `BRENDA VERIFIED. The tag has been verified. The Audit now reports that she is someone else.`; L.juror = `Brenda has been seated on the jury. She has recused herself, from herself.`; L.mentor = `Brenda has been appointed mentor to the last lamb. The lamb has not been told that Brenda is also its cousin.`; P.addLines('m:sheep-counter:sleep', L.sleep = [ `Sleep Progress is 99%. It was 0% a minute ago. It has been corrected for morale.`, `Sleep Progress has dropped to 7 1/2%. This is not a penalty. This is just math, as it relates to the fence.`, `Please do not check your Sleep Progress. Checking uses up 1 pixel of it.`, `Sleep Progress: See Tuesday.`]); P.addLines('m:sheep-counter:pokesleep', L.pokeSleep = [ `Please stop checking. It is trying.`, `Sleep Progress has been moved, for its own safety, to an undisclosed percent.`, `It went down 1 pixel. We have it on a graph. The graph is also awake.`, `Sleep Progress would like some privacy. It has asked for a curtain. The curtain is a percent sign.`, `Hovering over Sleep Progress does not help it. It does show interest, which has been noted as a kind of sleep.`, `Sleep Progress was checked 4 times in a minute. It has been advised to see someone, and it is the someone.`, `You are being very thorough about your own sleep. Management finds this admirable and a little loud.`, `The bar has been poked. It has not been hurt. It would like it noted that it is a bar and has no feelings, and that this is a lot.`]); P.addLines('m:sheep-counter:jury', L.jury = [ `The Audit is now auditing you. Under-clicking by 0.7 sheep per minute. We are concerned. Not for you. For the number.`, `Times You Counted: {count}. Times We Counted You: {count}. The second number is not smaller. We checked.`, `Your pressing rhythm has been audited as 'declared effort'. The effort was declared. It was not seconded.`, `Your pressing rhythm has been compared to a metronome. The metronome has asked for the day off.`, `Your clicking has been described, by a sheep, as 'fine, but with a lot of energy at the end'.`, `We have observed that you press the button when sheep are near it. This is being called Correlation. A department is being formed.`]); L.verdict = `The jury of 12 sheep has returned a verdict. The verdict was 'baa'. We are calling it Technically Counting.`; L.technically = `You have been found Technically Counting. This is not a conviction. It is a condition.`;
  L.overClick = `Over-clicking by 0.7 sheep per minute. This is the same number. We have simply reversed the sign.`; P.addLines('m:sheep-counter:strike', L.strike = [ `The sheep are on strike. They are sitting down. The ledger is counting them anyway.`, `Official Count is rising by itself. It is counting the absence of sheep. It is very accurate about the absence.`, `You counted a sitting sheep. The audit accepts this as a creative interpretation of the word 'jump'.`, `Strike over. The sheep have agreed to return. They have not agreed to jump, only to return.`, `The sheep are working to rule. They are jumping slowly, politely, and at exactly 40 degrees.`, `A sitting sheep has asked for a pillow. A second has asked for a smaller pillow, for the first pillow's feelings.`, `The sheep have started to hum. It is one note. It is the note a fence would sing, if a fence could, and it can't.`]); P.addLines('m:sheep-counter:cameos', L.cameos = [ `A leaf has drifted into the meadow. It is Dennis (Lobby Plant). Dennis has asked to be counted.`, `Dennis counted: 0 sheep, 1 colleague. Variance: 0.0. This is the first and only time. The Audit finds it very suspicious.`, `Dennis is thriving. The numbers do not know what to do with him.`, `A sock has jumped the fence, left to right. It was not on the list. It appeared to be heading somewhere.`, `The sock did not stop. The sock did not look back. The sock has places to be. Management says nothing.`, `You counted the sock. The Audit has no unit for sock. The Audit has made one. It is also sock.`, `A sheep has been promoted to Senior Sheep. The promotion is a tiny lanyard. The lanyard is a blade of grass.`, `I just want us all to be on the same number. Is that so much to ask. That was off the record.`, `Each sheep is a potato that learned to jump. I was not taught to jump. I was taught to wait.`, `Gerald (Vice President of Spuds) has observed that counting sheep is 'just potatoes with extra steps'. Gerald is wrong, and also somewhat right.`]); L.dennisKnown = `A leaf has drifted in. It is Dennis (Lobby Plant), whom you have met. He nods, in a leafy way, and asks to be counted.`; L.sockKnown = `The sock is back. You have seen it elsewhere. It has been to more places than you and has not mentioned it.`; P.addLines('m:sheep-counter:rare', L.rare = [ `A golden sheep has entered with a drumroll. It is a ceremonial sheep. It is not a sheep. It is worth 7 1/2 Meh.`, `The golden sheep is not included in the True Count, but is included in your guilt.`, `You did not count the golden sheep. This is a principled position. Management does not understand it and will be writing it down.`, `The golden sheep has been counted. It has been counted warmly. It was a ceremonial count, and it was binding.`, `Sheep 404 (Auditor) has jumped. It scanned the odometer, counted you, and filed one line: 'Counted the counter: correct.'`, `A sheep has jumped the fence from right to left. Management has no category for this. Management has made one. It is Sheepback.`, `Sheepback logged. Your Meh for the reversal has been cancelled, and then credited back, with interest of 0.01 Meh.`, `A sheep stands at the fence and does not jump. It says it is 'conceptually across'. The Audit has counted it as 0.25.`, `A sheep is wearing a sheet, and another sheep is under it. Two sheep, one jump. We are counting this as 1.5 and an apology.`]); P.addLines('m:sheep-counter:lament', L.lament = [ `The meadow has gone quiet. A single lamb stands at the far left. It will not jump.`, `It is nervous. Management is not suggesting that someone hold the button. Management is merely saying where the button is.`, `Management waits. Management is good at waiting. Management has had a lot of practice, at the fence.`, `The lamb has jumped. The meadow is silent. Then the meadow is not silent. Then it is billing.`, `You waited. You gave it the time. Management has not been given that much time since a Tuesday it would rather not name.`, `You counted it anyway. It jumped, out of politeness. We will not be discussing this in the review.`, `Audit: True Count: 1. One of them was Brenda.`, `Hope logged. Hope is not a unit. Hope is a feeling. The feeling is Philippa.`]);
  P.addLines('m:sheep-counter:finale', L.finale = [ `COUNT 100`, `Sheep 100. The sheep are holding up a sign that reads 'AGAIN?'. We have no counter-sign.`, `The fence has been awarded a gold watch. The fence has no wrist. The fence has accepted the watch in principle.`, `The fence is retiring. It is walking off the field on stick legs. Mr. Palisade follows. He is billing the walk.`, `Balance: still owed`, `THIS CERTIFIES THAT YOU COUNTED 100 SHEEP (APPROXIMATELY, IN SOME JURISDICTIONS). VARIANCE: 7 1/2. SLEEP: PENDING.`, `You have done it. You have counted to the end of the sheep. Thank you for your service. Please remain for the next shift.`, `Your final count is 100 (approximately, in some jurisdictions). Night 2 begins in 3, 2, 1.`, `Congratulations. You have counted every sheep. There are more sheep. There were always more sheep. The fence is very tired.`, `See you Tuesday.`, `Fence, the Sequel has been installed by Cousin Dave. It has a ribbon on it. Dave has no comment.`, `Brenda counts too.`]); P.addLines('m:sheep-counter:chatter', L.chatter = [ `You are doing a wonderful job. The job is counting. The counting is wonderful. Please hold this thought; it is on a lanyard.`, `Counting is a form of care. Miscounting is a form of care with extra steps.`, `A sheep has asked whether you need to count them or whether you simply wish to be near them.`, `The sheep would like to remind you that they are not, technically, jumping. They are 'clearing'. It is a different department.`, `Please do not count aloud. The sheep can hear you and are beginning to feel like numbers.`, `The True Count has been updated. It is a different number now. It was not consulted, and neither were you, and you have both taken it well.`, `Overnight, the meadow has been rezoned. The sheep are now 'residents'. The fence is now 'infrastructure'. You are now 'staff'.`, `The fence has been asked to step down. It declined. It said it has 'no legs but lots of standing'.`, `A sheep was counted twice. The sheep has accepted a small gift basket and a formal apology. The basket contains grass.`, `The sheep are not real. The sheep would like to remind Management that neither is Management's count.`, `The Audit Desk would like to thank you for your count and apologise for its own. It has been wrong since 9:15.`, `Management has counted the sheep independently. Management got 7 1/2. Management would like to be left alone about it.`, `You have earned a sum of Meh for counting. The sheep have earned no Meh for being counted. The sheep have filed this.`, `The meadow has asked to be called the pasture. Management agreed. Nobody else was told, and the sheep are still saying meadow.`, `A sheep near the back would like it noted that it can see the fence perfectly well. It has been noted. It has been noted twice, as is policy for sheep who can see.`, `Management has been staring at the counter for 11 minutes. It is not on a break. It is staring in a professional capacity.`, `The grass has been counted. There was a lot of it. The count is being kept from the sheep, who would eat it.`, `A sheep has asked whether the fence can be moved six inches left. The fence said no. The sheep said it will jump at where it was.`, `The wind has been counted. It declined to be a sheep. It is wind. It has not been asked since.`, `Management was asked to say something encouraging. Management said 'sheep'. It was meant kindly.`, `We have run out of the word 'accurately'. A new shipment is due Tuesday. Please count approximately until then.`, `A sheep asked how many sheep there are. It was told 'enough'. It has left in tears, and returned, and is counting itself.`, `Your count is being kept in a drawer marked COUNT. The drawer is a very good listener. It is also a drawer.`, `Please keep your count in view at all times. If you cannot see it, tell it. It will know.`]); P.addLines('m:sheep-counter:memo1', L.memo1 = [ `Management would like to note that the sheep are not in a hurry. Management would also like to note that Management is.`, `The meadow is open between 9:15 and 9:15. Please do not arrive before the sheep. They are already here, and they are touchy.`, `A sheep has been counted by two employees at once. The employees have been separated and are being very civil about it.`, `The fence has been in service for 31 years and has not been thanked once. It has not asked to be. The thanking is what would be awkward.`, `Tonight's weather: night. A second opinion has been requested from the moon. The moon is awake and has not been asked in a while.`, `The sheep jump from the left of the sky to the right of it. We are told this is called 'across', and we are reading up.`, `Please keep count of the sheep. Please also keep count of the number you are keeping. If the two disagree, keep both.`, `A sheep has been waiting at the left edge of the meadow for 40 minutes. It is not nervous. It is early, on principle.`, `Please do not count the same sheep from both sides. This is how the second sheep gets invented.`, `The clicker is brass. It was cast from a trophy that was never awarded. It remembers wanting to be one.`, `Management has bought a small flag for the field. The flag is the field. The field has not been told.`, `The sheep outnumber the fence by a number we cannot say. It is not 7 1/2. It lives near 7 1/2.`]); P.addLines('m:sheep-counter:memo2', L.memo2 = [ `The signboard has asked to be read less like an instruction and more like a weather report.`, `Local 7 1/2 reminds members that jumping is voluntary, counting is voluntary, and the fence is, in a limited sense, also voluntary.`, `Mr. Palisade has asked the sheep not to go over his client's head. They have said they go over its middle. He has billed for 'the middle'.`, `A sheep has been issued a lanyard and a title: Associate Sheep (Acting). It is not clear what it is acting as. It is acting very well.`, `The Stapler would like to remind you that tonight it is not a stapler. It is a steward. It has been asked to staple nothing, and is.`, `Sandra from Compliance has noticed that the sheep are in a line. She has asked who permitted the line. The line has asked who permitted Sandra.`, `The invoice has been sent to the field. The field has sent it back with a note: 'not ours'. The note is on the fence's letterhead.`, `Management would like to clarify that no sheep has been fired. Several have been 'moved to jumping', which is a role.`, `A sheep has filed a grievance about the quality of the apex. The apex has been given a performance review. It was fine. It was mostly apex.`, `The goat has asked to be considered for a leadership role in the flock. The flock has asked what flock. The goat has asked what goat.`, `It is now against policy to count in the dark. This is a problem, and has been forwarded to the dark.`, `A new rule has been added to the rules. It states that the rules are the rules. Rule 7 is still only half in force.`]); P.addLines('m:sheep-counter:memo3', L.memo3 = [ `Management has been up for 11 hours and would like to say it is not tired. It is a number that is tired.`, `The meadow has stopped pretending to be anywhere. It is now just the sheep, and the fence, and the light being in a specific place.`, `Brenda has been seen speaking to the moon. They appear to be on first-name terms. Neither will say the name.`, `A very small sheep has asked what happens when all the sheep have been counted. It was told 'we count them again'. It has asked for a moment.`, `If you are tired, you may stop. Management would not know what to do with a stopped thing, but it would try.`, `Management has realised it has not asked how you are. How are you. Please answer in numbers. They are easier to file.`, `The audit has been audited. It was found to be a sheep. It has been put back where it was found, which is the field.`, `Management would like to thank the sheep, the fence, the moon, Dennis (Plant) and you, in that order, as a joke, and then in reverse, not as a joke.`, `It is later than it was. The light has noticed. It is thinking about being a different light.`, `A sheep has stood at the edge of the field and looked at you for 6 seconds. It has not said what it thinks. It has just let you have it.`, `Management was told, by a sheep, that this is the best count it has been involved in. Management has decided that this is true.`, `Management would like to remind you that none of this is for anything. It would also like to remind you that it has been very nice.`]); P.addLines('m:sheep-counter:idle', L.idle = [ `Finally. Someone is asleep. It is not you.`, `Do not wake them. Your count is 0 and so is mine, for the first time.`, `Still there? The sheep have stopped jumping. They are watching you not count. It is a lot of pressure for a sheep.`, `The sheep have fallen asleep. One of them is counting you. You are at 1. Please do not move; it will lose its place.`, `It is very quiet. The fence has taken off its tie.`, `A sheep has begun counting you. Management would like to say it is proud. Management is proud.`, `The golden ram has taken a seat beside the COUNT button. He is not counting you. He is merely present.`, `A sheep woke up and lost its place. It has paid you 0.5 Meh as an apology. The slip says: recount, at the sheep's request.`]);
  P.addLines('m:sheep-counter:idleearly', L.idleEarly = [ `Management has noticed that you have stopped. Management is not worried. Management has put on a coat, in case it is.`, `You have paused. The sheep have paused too, out of solidarity, and are holding their jumps in their mouths.`, `Nothing is wrong. You are simply not counting. Management would like to be clear that it has never once thought of this as a threat.`, `A sheep has noticed you are not counting and has gone to check whether the sheep is still a sheep.`]); P.addLines('m:sheep-counter:idlelong', L.idleLong = [ `It is now 4 minutes since your last count. The sheep have formed a committee to discuss this. It is a quiet committee. It is lying down.`, `The Golden Ram has brought a folding chair. It is not for the Golden Ram. It is for you, in case you come back and would like to sit.`, `The fence has been left in charge of itself. It has put up a small sign that says BACK SOON and, underneath, in a smaller hand, 'maybe'.`, `Management has read the last 40 slips again, slowly. They are not good, and they are the only ones it has.`, `The moon has stopped yawning. It is simply looking at the button, with the expression of a moon waiting for a bus.`, `Nothing has happened for 9 minutes. This is the most that has ever happened, in terms of nothing. Management would like to frame it.`, `Whenever you are ready. We are not going anywhere. We are a field.`, `The sheep are asleep. The fence is asleep. The button is the only thing awake, and it can be no more than a button. Goodnight.`]); P.addLines('m:sheep-counter:wake1', L.wake1 = [ `You are back. Sleep Progress has been reset to 0%. It was never above 0%. We said otherwise to keep you calm.`, `You are back. The sheep were not asleep. They were pretending, in the way sheep do, with their eyes open.`, `Welcome back. We did not touch anything. It is a lot of responsibility, a button.`]); P.addLines('m:sheep-counter:wake2', L.wake2 = [ `You are awake. The sheep that was counting you has lost its place at 2. It would like to start again, and has been told that is the same as stopping.`, `You are back. The sheep that was counting you reports your count as 2, and would like it returned to the field.`, `You moved. The sheep counting you has lost track and is now counting the fence, which has not noticed.`]); P.addLines('m:sheep-counter:wake3', L.wake3 = [ `You are back. The Golden Ram has left a note. It says 'ram'. It is the whole note.`, `The meadow brightens. The Golden Ram stands, nods, and leaves, as one does at the end of a very small meeting.`, `You are back. The sheep have been asked to act normal. They are acting very normal, in a way that is not.`]); P.addLines('m:sheep-counter:wake4', L.wake4 = [ `You are back. The sheep held a vigil. It was not for you. It was for the time. The time says thank you.`, `You are back. The fence has taken down the sign. It has not taken down the 'maybe'. The maybe stays.`, `Oh. You came back. Management had prepared a speech and has used the speech to prop open a door. Welcome.`]);
  P.addLines('m:sheep-counter:spam', L.spam = [ `Counting this fast is a recognised condition. Please see Form 27B/6, which is itself a count.`, `An Excessive Enthusiasm Surcharge of 1 Meh has been applied. It is payable to the sheep, who have no pockets. It is held in trust, by a sheep.`, `Security has been called. Security is a very tired sheep in a hat. Security Sheep: Brenda.`, `A noise complaint has been filed by the sheep. The noise was the counting. The counting is also the complaint.`, `Rapid counting is not accuracy. It is a different quantity, of unclear value, which we have named Speed.`, `Management has begun counting your presses and has lost its place at 31. It would like you to stop so that it can resume, and not be 31.`, `The button has been given a short talk by a longer button. It is going to be fine.`, `You are now counting faster than the sheep can be. The sheep have been asked to hurry. They are not made for it. They are made for this.`, `A medical sheep has arrived with a small bag and taken your pulse. It was a number. It has been taken for further audit.`]); P.addLines('m:sheep-counter:spamsoft', L.spamSoft = [ `Management has noticed the pace. Management is not saying anything. Management is writing it down quickly.`, `The counter has begun to warm. It is not a threat. It is a counter doing what it was built for, a little too much.`, `The sheep can hear the clicking. It has begun to feel like rain. They are not sure they enjoy rain.`, `The brass dome has asked for a minute. It has not asked for much. A minute, and a window.`, `Please be advised that the sheep are not getting faster. It is only your thumb, which has been entered into the record.`]); P.addLines('m:sheep-counter:breaksign', L.breakSign = [ `The button has gone on its break. It is taking its break very seriously. It has a magazine.`, `Back in 7 1/2 seconds. This is not a promise. It is a number that was available.`, `The counter is on a break, in the staff room, with a small coffee. It will come out when the number is over.`]); L.river = `The sheep are jumping so fast they have become a single wool river. Count: 1 river. The Audit accepts it, sadly.`; L.riverEnd = `The sheep return, one by one. A faint cheer is heard from a place where cheers are kept.`; L.instrument = `Third offence. The counter has been reclassified as an instrument. Instruments are not asked how they feel.`; P.addLines('m:sheep-counter:misc', L.misc = [ `The fence has been relocated 40 pixels. The sheep were not told. They are now jumping at where it was.`, `Mr. Palisade bills for 'unauthorized positional drift'. The fence says it did not move. The fence is correct, and billed.`, `The sheep waited in mid-air while you were away. They would like it noted. They did not note it themselves.`, `The moon has been tapped 14 times and has agreed to notarise this, on condition that it is then left alone. It has not been left alone.`, `You do not have to count. Nobody has to count. The sheep will be here either way, and they will be very good at it.`, `Zero presses in 30 seconds. The sheep are patient. They are used to being unnoticed. It is a skill.`, `The next audit has been cancelled due to scheduling.`, `The fence has fainted. The sheep are silent. A slip has been printed that says Perfect, Illegal Count.`]);
  L.moon = [`The moon has been tapped 5 times. It has not asked you to stop. It has not asked you to continue. It has asked for a blanket.`, `The moon has been tapped 9 times and has filed a note that says 'a bit much, but kind'.`, `The moon has been tapped 25 times. It has stopped being a moon and become an appointment. Nobody is sure what for.`]; L.fence = [ `I did not ask to be jumped. I did not ask for a lawyer. I would like a gate.`, `The lawyer has resigned. The lawyer has been rehired. The resignation was, per policy, a lunch.`, `The fence has said it again. Mr. Palisade bills for the repetition. The repetition was also a gate request.`, `A gate has been installed. It is a painting of a gate. The sheep are walking through it with great dignity.`, `Thank you. It is a very good painting.`]; L.toast = [`A slice of toast has jumped the fence, right to left. It was not on the list. It is warm. The Toaster has said something. It was 'toast'.`, `A slice of toast has crossed the fence, right to left. You know where it is from. It does not say. It is very warm about it.`, `You counted the toast. The toast has been counted as 'toast', which is a unit. It is the correct unit.`, `The toast has landed on the far side, butter side up. Nobody has asked how. A small round of applause has been withheld.`]; L.lunch = [`A sheep has jumped carrying its own lunch. The Audit has counted two. The lunch has asked to be counted as a sheep, and then as lunch, in that order.`, `Lunch sheep counted. Both have been counted. The lunch has been told it is a sheep and is taking it in its stride, which is a sandwich's stride.`]; L.tue = [`Tuesday has been mentioned. Please remain where you are. Tuesday is not here. It is only close to here.`, `The sky has gone a little pink. It is only checking. It will go back. It has not been asked to, but it will.`, `Tuesday has been informed that you meant nothing by it. It has gone back to being a day. It took the long way, via Wednesday.`, `Tuesday was moved once already, by fax. It is aware of this. It has asked that nobody say it again, in that tone.`]; P.addLines('m:sheep-counter:tuesday2', L.tue2 = [ `Please. It heard you the first time.`, `Tuesday has put the kettle on. It does not drink tea. It wants you to know it is ready.`, `You have said it again. Management has stood up from its chair and then sat down, in the same chair, quickly.`]); L.photo = [`Everyone stay where you are. This is for the company photo. The photographer is the moon. The moon has had a long day.`, `The photo has been framed and hung somewhere you cannot see, which is where framed things go. It looks lovely.`]; L.plaque = [`You have been here 10 minutes. Management has checked the file. This is the longest anyone has stayed. The record was Dennis, who is a plant and was never leaving.`, `The plaque is on the fence. The fence has asked what it is for. It was told 'being a fence'. It has accepted this. It is the nicest thing anyone has said to it.`, `The moon is wearing a party hat. Nobody gave it one. Nobody is going to ask.`]; P.addLines('m:sheep-counter:pet', L.pet = [ `The variance is a pet now. It does not need feeding. It needs a number, and the number is always 1/2.`, `The variance has been scratched behind the decimal. It made a noise that was also a number.`, `You have petted the variance. It was 1/2. It is now 1/2, but pleased about it.`, `The variance has brought you a small number as a gift. It is 4. It has been left on the stamp.`]);
  L.bubbles = ['counted', 'noted', 'I was already a number', 'baa', 'per policy', 'technically', 'I have a lanyard', 'is it Tuesday', 'again?', 'witnessed', 'filed', 'I consent', 'see Gerald', '7 1/2', 'no comment', 'my agent will call', 'unionised', 'I saw that', 'Brenda knows', 'excuse me', 'what is a Tuesday', 'I have a pension', 'oh no, a number', 'I am not a goat', 'is this the fence', 'we are a field', 'mind the wool', 'I was not ready', 'nice count', 'I read the clause', 'I have questions', 'who is Sandra', 'ahem', 'I am on my break', 'dark in here', 'not my sheep', 'hi, Dennis', 'is it fun yet', 'I was told to smile', 'the hat is structural'];
  /* season 2: Mandatory Fun Hour, the Wrong Clock, the Held Count, a marathon snail, a sock that naps */
  P.addLines('m:sheep-counter:fun', L.fun = [ `Mandatory Fun has begun. Attendance is mandatory. Enjoyment is optional, but will be measured.`, `Mandatory Fun has been renamed Voluntary Fun. It is still mandatory. The new name is the fun.`, `The sheep have been issued party hats. They did not ask for the hats. They are enjoying themselves under protest.`, `Fun recorded. It has now been counted once, which is the most anyone has ever counted it.`, `Mandatory Fun has concluded. Satisfaction was 7 1/2, self-reported by the fun.`, `The hats have been collected. Four sheep kept theirs. They have been reported to the Fun Department, which is the sheep.`, `You declined the fun. Declining has been logged as fun. Sandra calls this a loophole. Sandra has closed the loophole. Sandra is in it.`, `Sandra from Compliance has been invited to the fun. She attended by memo. The memo was fun, and has been flagged.`, `This was not in the collective agreement. I would like fun added to it, so that I may object to it properly.`, `The Toaster has sent one slice of toast to the fun. It is warm. The sheep are sharing it, and somehow it is enough.`, `Gerald has sent his regards, a potato's worth. The sheep are not sure how much that is. It is large, and slightly wrong.`]); P.addLines('m:sheep-counter:funsurvey', [ `Q1. How much fun was this? A. Yes.`, `Q2. Did you feel included? A. In a pie chart.`, `Q3. Please rate the hat. A. Structural.`, `Q4. Would you have preferred not to? A. This question has been withdrawn, for fun reasons.`, `Q5. Comments: 'The fence was not asked.' (the fence)`, `Q6. Will you be having fun again? A. Per policy, at 3:00, in a cupboard.`]); P.addLines('m:sheep-counter:funsigns', [ `Fun is mandatory.`, `Smile at 40 degrees.`, `Fun may be declined, but only by attending.`, `The hat is not optional. The head is.`]); P.addLines('m:sheep-counter:eclipse', L.eclipse = [ `The moon has been replaced by a clock. The clock says 4:17. The clock is always wrong, with confidence.`, `The moon has filed a leave request. The clock is covering. It has not been trained on the moon's duties, only on being wrong.`, `The clock has been tapped. It says it is 4:17, and also 9:15. It would like both on the record.`, `The clock has been tapped three times. It has agreed to be right once, at a time to be confirmed. We are all very moved.`, `The moon is back from leave. It would like to know who counted in its absence. The answer is the clock, wrongly, with confidence.`, `The clock has been identified as the one from the Lobby wall. It is on secondment. It was not told for how long. It was told it was early.`]); P.addLines('m:sheep-counter:hold', L.hold = [ `You have been holding the COUNT button for 3 seconds. Nothing has been counted. Management is trying not to read into it.`, `Still holding. The sheep have gathered at the fence to see what happens. Nothing is happening. They are not leaving.`, `7 1/2 seconds. You have held a count for exactly as long as it takes. Nothing has been counted. Everything has been noted.`, `Released. The count has been counted. It is a count of 1. It sat very still the whole time and would like that on record.`]); P.addLines('m:sheep-counter:snail', L.snail = [ `A snail has entered at the bottom of the field. It has a number pinned to it. The number is 1. It is not racing. It is early.`, `The snail has been identified. It is the one that finished the marathon. It has been asked to leave a gap and is already in the gap.`, `You counted the snail. A snail is worth one marathon. The Audit has rounded this down to a snail.`, `The snail has reached the far side. It did not jump the fence. It went under, by a policy nobody wrote.`, `The snail has been counted and has left the field. It would like to be counted at the next marathon. It will be late, in the best way.`]);
  P.addLines('m:sheep-counter:idle2', L.idle2 = [ `The Missing Sock has lain down among the sleeping sheep. It was on its way somewhere. It has decided somewhere can wait, as you have.`, `The sock has gone. It left a note on the grass that says 'thanks for the nap'. The grass has not been asked to keep it.`]); P.addLines('m:sheep-counter:chatter', [ `A sheep has asked for a window seat on the next jump. There are no seats. It has been given a window, in the sense of a gap.`, `Management has begun to dream in sheep. In the dream the sheep are counting Management. Management got 7 1/2.`, `The grass has been audited. The grass is 'green, approximately, in some jurisdictions'. The grass is aware of this.`, `A sheep counted backwards is still a sheep. It is also, per Sandra, a clerical error with a pulse.`]);
  const ONCE_KEEP = ['b5', 'b6', 'b8', 'b9', 'b10', 'strike', 'strike2', 'lament', 'fun', 'snail', 'clock', 'dennis', 'crack', 'gerald', 'senior', 'below', 'sl76', 'sl84', 'photo', 'plaque'];
  const BEATS = [0, 10, 14, 22, 32, 44, 56, 68, 84, 94];
  const BDIS = [31, 43, 55, 67, 79, 91];
  const UNIT7 = ['7 1/2 sheep', '7 1/2 sheep-hours', '7 1/2%', '7 1/2 splinters', '7 1/2 (units withheld)'];
  const LADDER = ['', ', 3 hooves and a rumor', ', 3 hooves and a feeling (Philippa)', ', 3 hooves, a feeling (Philippa) and a tuft of wool in transit',
    ", 3 hooves, a feeling (Philippa), wool in transit and a sheep's reasonable doubt", ', 3 hooves, a feeling (Philippa), wool in transit, reasonable doubt and the concept of between'];
  const ACC7 = ['6.0 BILLION%', '99.9%', '7 1/2%', '-4% (approximately)', '100.0% (INVALID)'];
  const WEIGHT = { sheep: 1, lamb: 0.5, goat: 0, concept: 0.25, back: -1, pair: 1.5, golden: 0, sock: 0, brenda: 0, a404: 0, half: 0.5, toast: 0, lunch: 2 };
  const SPAM_ORDER = [2, 1, 0, 5, 3, 7, 4, 6, 8];
  const JAMS = ['COUNTER OVERHEATED - PLEASE CALL A SHEEP', 'COUNTER OVERHEATED - SHEEP HAVE BEEN CALLED', 'COUNTER ON FIRE (FIGURATIVELY, AT THIS TIME)', 'PLEASE REMAIN CALM. THE COUNTER IS NOT.'];
  const FX = 320, GY = 300, RAIL = 238;
  P.registerModule({
    id: 'sheep-counter',
    title: 'Counting Sheep (Accurately)',
    tagline: 'Count the sheep. Management counts them too. You will not agree.',
    icon: '🐑',
    category: 'game',
    unlockCost: 0,
    tags: ['counting', 'audit', 'sheep', 'pastoral-compliance'],
    mount(root, api) {
      const el = api.el, K = 'm-sheep-counter-';
      const SPEED = api.selftest ? 6 : 1;
      const IDLE = api.selftest ? [8000, 16000, 22000, 28000, 36000, 4000, 12000] : [45000, 90000, 120000, 150000, 240000, 20000, 70000];
      const PHOTO_AT = api.selftest ? 40000 : 180000, PLAQUE_AT = api.selftest ? 110000 : 600000;
      const n0 = function (x) { return Number.isFinite(x) ? x : 0; };
      const r5 = function (x) { return Math.round(n0(x) * 2) / 2; };
      const clamp = function (x, a, b) { return Math.max(a, Math.min(b, n0(x))); };
      const lerp = function (a, b, t) { return a + (b - a) * clamp(t, 0, 1); };
      function fmtHalf(x, signed) {
        x = r5(x); const a = Math.abs(x), w = Math.floor(a), h = a - w >= 0.5;
        let s = h ? (w ? w + ' 1/2' : '1/2') : String(w);
        if (x < 0) s = '-' + s; else if (signed && a > 0) s = '+' + s;
        return s;
      }
      const ln = function (name, tok) { return api.line('m:sheep-counter:' + name, tok || {}); }; // lint-ignore
      const pickOf = function (arr) { return arr[api.randInt(0, arr.length - 1)]; };
      const sv = api.save.get('s', null) || {};
      const night = clamp(Math.floor(n0(sv.night)) || 1, 1, 9999);
      const S = {
        dead: false, night: night, crossed: night >= 2 ? 21 : 0, spawned: night >= 2 ? 21 : 0, yourCount: 0, pdBase: 0, W: 0, presses: 0, nonRecount: 0, recounts: 0,
        mode: 'PLAY', modeUntil: 0, clock: 0, last: 0, beat: 1, nextAudit: 10, audits: 0, auditing: false, owed: clamp(sv.owed, 0, 9999), splinters: clamp(sv.splinters, 0, 1e6), union: clamp(sv.union, 0, 100), total: clamp(sv.total, 0, 1e9), endings: clamp(sv.endings, 0, 1e6),
        goldenLast: false, sockDone: false, sockAt: api.randInt(50, 70), v: 1, tc: 0, tcShown: false, reversed: false, pet: 0, jams: 0, objections: 0, halfN: 0, bv: !!sv.bv,
        spawnIn: 800, queue: [], lastSpecial: false, stiffLeft: 0, loud: night >= 2, later: [], bubbles: [], sleepers: [], sitters: [], once: {}, intro: { goat: night >= 2, lamb: night >= 2, tag: night >= 2, obj: night >= 2 },
        lastInput: api.now(), idleStage: 0, hidden: false, ring: [], ring60: [], lastSay0: -1e9, lastSayAny: '', sleep: 0, sleepPin: '', sleepPoke: 0, dawn: 0, dawnT: 0, moon: 0, moonTaps: 0, fenceClicks: 0, fenceClickAt: 0, fenceSpeaks: 0, gate: false,
        gateThanked: false, nudge: 0, nudgeN: 0, shift: 0, oldFx: 0, oldLeft: 0, resizeAt: -1e9, baaBuf: '', baaAt: 0, blink: 0, hit: 0, zeroOdo: 0, odoText: '', fenceRot: 0, silentUntil: 0, skipNext: false,
        objOpen: false, objUntil: 0, objBusy: false, objT: 0, type: null, motion: null, motionIn: 0, signAt: 0, signN: 0, breaksCounted: 0, jamUntil: 0, breakUntil: 0, river: false, riverLast: 0, holding: false, holdMs: 0,
        lam: null, strike: null, jury: null, fin: null, leaf: null, dennisArmed: false, secu: null, goldAt: api.selftest ? 12 : 0, sockForce: api.selftest ? 26 : 0, brendaSeen: false, beatFired: {}, seenExtra: 0, fstampUntil: 0, auditNoteT: 0,
        idleHold: 0, errs: 0, breakSays: 0, workRule: false, backUntil: 0, hear: null, fenceN: 0, invRows: 0, settleN: 0, noPressMs: 0, quiet0: api.now(), reduced: false, tcText: '', petNamed: false, sleepWake: 0, wokeAt: 0
      };
      S.beat = beatOf(S.crossed);
      S.nextAudit = S.crossed + interval(S.beat);
      if (S.night >= 2) { S.once.b3 = true; S.once.goat = S.once.lamb = S.once.brenda = true; S.queue.push({ t: 'brenda', dir: -1, disg: 1, tag2: true }); S.spawned = 21; if (sv.once && typeof sv.once === 'object') ONCE_KEEP.forEach(function (k) { if (sv.once[k] === true) S.once[k] = true; }); }
      S.dawn = S.dawnT = 0;
      Object.assign(S, { memoAt: night === 1 ? 9000 : 16000, playMs: 0, meadowMs: 0, pokeSaid: 0, brkWas: false, brkFocus: false, resizeW: window.innerWidth, hideAt: 0, stampSrAt: -1e9, rl: {}, softAt: -1e9, idleN: 0, idleNext: 0, idle20: false, flash: 0, hat: false, plaqueOn: false, typed: '', typedAt: 0, tueN: 0, toastAt: api.selftest ? 17 : 0, lunchAt: api.selftest ? 20 : 0, tueAt: api.selftest ? 40 : 0 });
      Object.assign(S, { fun: null, funN: 0, eclipse: null, clockAt: api.selftest ? 33 : 0, snailAt: api.selftest ? 36 : 50, snail: null, heldAt: 0, heldStage: 0, heldDone: false, sockSleep: false });
      /* ---------- scheduler (game clock: honours hidden tabs, selftest speed, teardown) ---------- */
      function later(ms, fn, tag) { S.later.push({ at: S.clock + ms, fn: fn, tag: tag || '' }); }
      function clearLater(tag) { S.later = S.later.filter(function (x) { return x.tag !== tag; }); }
      function runLater() {
        for (let i = 0; i < S.later.length; i++) {
          const x = S.later[i];
          if (x && S.clock >= x.at) { S.later.splice(i, 1); i--; try { x.fn(); } catch (e) { api.setTimeout(function () { throw e; }, 1); } }
        }
      }
      function beatOf(c) { let b = 1; for (let i = 0; i < BEATS.length; i++) if (c >= BEATS[i]) b = i + 1; return b; }
      function interval(b) { return b <= 4 ? 10 : b <= 6 ? 7 : (S.audits % 2 ? 8 : 7); }
      /* ---------- narration ---------- */
      /* Management is paced by this module as well: priority-1 lines wait their turn (max 3, stale ones are dropped) so jokes stay in sync with the field instead of arriving 20 s late. */
      const sayQ = []; let sayFreeAt = 0;
      function sayNow(who, text, o) {
        const opt = { mood: o.mood || 'neutral', priority: o.priority || 0 };
        if (who && who !== 'Management') opt.who = who;
        if (o.duration) opt.duration = o.duration;
        const ok = api.say(text, opt);
        if (ok) { S.lastSayAny = text; capTxt.textContent = text; sayFreeAt = api.now() + clamp(1600 + 55 * text.length, 2600, 9000) * 0.85; }
        return ok;
      }
      function say(who, text, o) {
        o = o || {}; text = String(text || ''); if (!text) return false;
        const pri = o.priority || 0, now = api.now();
        if (S.mode === 'FINALE' && pri < 2 && !o.fin) return false;
        if (pri === 0) { if (now - S.lastSay0 < 3500 || now < sayFreeAt || sayQ.length) return false; S.lastSay0 = now; return sayNow(who, text, o); }
        if (pri >= 2 || (now >= sayFreeAt && !sayQ.length)) return sayNow(who, text, o);
        const nk = function (q) { return !q.o.keep; }, ent = { who: who, text: text, o: o, t: now };
        if (o.keep) {                                    /* must-land setup lines: go ahead of ordinary chatter, never pushed out by it, up to 6 deep */
          const di = sayQ.findIndex(nk);
          if (sayQ.length >= 6) sayQ.splice(di >= 0 ? di : 0, 1); else if (sayQ.length >= 3 && di >= 0) sayQ.splice(di, 1);
          const at = sayQ.findIndex(nk); sayQ.splice(at >= 0 ? at : sayQ.length, 0, ent);
        } else {
          if (sayQ.length >= 3) { const di = sayQ.findIndex(nk); if (di < 0) return false; sayQ.splice(di, 1); }
          sayQ.push(ent);
        }
        return true;
      }
      function pumpSay() {
        const n = api.now(); if (!sayQ.length || n < sayFreeAt) return;
        for (let i = 0; i < sayQ.length; i++) {
          const q = sayQ[i];
          if (n - q.t > (q.o.keep ? 60000 : 20000) || (S.mode === 'FINALE' && (q.o.priority || 0) < 2 && !q.o.fin)) { sayQ.splice(i, 1); i--; continue; }
          if (q.hold && n < q.hold) continue;
          sayQ.splice(i, 1);
          if (!sayNow(q.who, q.text, q.o) && q.o.keep && (q.tries = (q.tries || 0) + 1) <= 4) { q.hold = n + 1500; sayQ.splice(i, 0, q); }
          break;
        }
      }
      function setStamp(text) { capStamp.textContent = text ? text : ''; const n = api.now(); if (text && n - S.stampSrAt >= 1500) { S.stampSrAt = n; stampSr.textContent = text; } }
      /* ---------- DOM ---------- */
      const cv = el('canvas', { class: K + 'cv', width: 640, height: 400, role: 'img', 'aria-label': 'A night meadow with a fence. Sheep jump it, one at a time.' });
      const g = cv.getContext ? cv.getContext('2d') : null;
      const nightEl = el('div', { class: K + 'night' });
      const reels = [], digs = [];
      for (let i = 0; i < 4; i++) {
        const rl = el('div', { class: K + 'rl' }); for (let d = 0; d < 10; d++) rl.appendChild(el('span', { text: String(d) }));
        reels.push(rl); digs.push(el('div', { class: K + 'dg' }, rl));
      }
      const sgn = el('span', { class: K + 'sgn' });
      const halfEl = el('span', { class: K + 'half', text: '1/2', 'aria-hidden': 'true' });
      const odoD = el('div', { class: K + 'odo', role: 'img' }, sgn, digs, halfEl);
      const odoT = el('div', { class: K + 'odo', hidden: true }, el('span', { class: K + 'otx' }));
      const odo2 = el('div', { class: K + 'odo2', hidden: true });
      const odoWrap = el('div', { class: K + 'odowrap' }, el('b', { text: 'YOUR COUNT' }), odoD, odoT, odo2);
      const tcVal = el('span', { text: '[REDACTED]' });
      const tcBox = el('div', { class: K + 'tc ' + K + 'red' }, el('b', { text: 'TRUE COUNT' }), tcVal);
      const vsVal = el('span', { text: '-' });
      const petEl = el('button', { class: K + 'pet', type: 'button', 'aria-label': 'Variance, the pet', hidden: true, onclick: function (ev) { ev.stopPropagation(); onPet(); } }, el('span', { class: K + 'petb', 'aria-hidden': 'true' }));
      const vsBtn = el('button', { class: K + 'vs', type: 'button', 'aria-label': 'Variance stamp', onclick: function () { tryObject('stamp'); } }, el('small', { text: 'VARIANCE' }), vsVal);
      const vsWrap = el('span', { class: K + 'vsw' }, vsBtn, petEl);
      const hd = el('div', { class: K + 'hd' }, nightEl, odoWrap, el('div', { class: K + 'right' }, tcBox, vsWrap));
      const slpVal = el('span', { text: '0%' });
      const slpFill = el('i');
      const slpBar = el('button', { class: K + 'sleep', type: 'button', 'aria-label': 'Sleep Progress', onclick: function () { pokeSleep(); }, onpointerenter: function () { pokeSleep(); }, onfocus: function () { pokeSleep(); } },
        el('span', { text: 'Sleep Progress' }), el('div', { class: K + 'trk' }, slpFill), slpVal);
      const signTxt = el('span'), signNo = el('b', { text: 'RULE 1' });
      const signEl = el('div', { class: K + 'sign', hidden: true, 'aria-hidden': 'true' }, signNo, signTxt);
      const bannerEl = el('div', { class: K + 'banner', hidden: true, role: 'presentation' });
      const localEl = el('div', { class: K + 'local', hidden: true, text: 'SHEEP LOCAL 7 1/2' });
      const motTxt = el('span');
      const susBtn = el('button', { class: K + 'btn', type: 'button', onclick: function () { rule('S'); } }, 'SUSTAIN', el('kbd', { text: 'S' }));
      const ovrBtn = el('button', { class: K + 'btn', type: 'button', onclick: function () { rule('O'); } }, 'OVERRULE', el('kbd', { text: 'O' }));
      const motEl = el('div', { class: K + 'motion', hidden: true }, motTxt, susBtn, ovrBtn);
      const jamEl = el('div', { class: K + 'jam', hidden: true, role: 'presentation' });
      const fstamp = el('div', { class: K + 'fstamp', hidden: true, 'aria-hidden': 'true' });
      const dimEl = el('div', { class: K + 'dim', 'aria-hidden': 'true' });
      const ovEl = el('div', { class: K + 'ov', hidden: true, 'aria-hidden': 'true' });
      const field = el('div', { class: K + 'field' }, cv, ovEl, signEl, localEl, bannerEl, motEl, jamEl, fstamp, dimEl);
      const domeEl = el('span', { class: K + 'dome', text: '🐑', 'aria-hidden': 'true' });
      const hopeEl = el('i', { class: K + 'hope' });
      const hopeTrk = el('i', { class: K + 'hopetrk', hidden: true });
      const countLbl = el('span', { text: 'COUNT' });
      const countBtn = el('button', { class: K + 'count', type: 'button', 'aria-label': 'Count (C)', onclick: function () { doCount('button'); } }, domeEl, countLbl, el('kbd', { text: 'C' }), hopeTrk, hopeEl);
      const brkEl = el('div', { class: K + 'brk', hidden: true, role: 'status', text: 'ON BREAK. BACK IN 7 1/2 SECONDS.' });
      const ramEl = el('div', { class: K + 'ram', hidden: true, 'aria-hidden': 'true', text: '🐏' });
      function mkBtn(label, key, fn, hid) { return el('button', { class: K + 'btn', type: 'button', onclick: fn, hidden: !!hid, 'aria-label': label + ' (' + key + ')' }, el('span', { text: label }), el('kbd', { text: key })); }
      const recBtn = mkBtn('RECOUNT', 'R', function () { doRecount(); });
      const goatBtn = mkBtn('GOAT', 'G', function () { doGoat(); }, !S.intro.goat);
      const lambBtn = mkBtn('LAMB', 'L', function () { doLamb(); }, !S.intro.lamb);
      const tagBtn = mkBtn('TAG EAR', 'T', function () { doTag(); }, !S.intro.tag);
      const drain = el('i');
      const objBtn = el('button', { class: K + 'btn', type: 'button', 'aria-disabled': 'true', hidden: !S.intro.obj, 'aria-label': 'Object (F)', onclick: function () { tryObject('button'); } }, el('span', { text: 'OBJECT' }), el('kbd', { text: 'F' }), drain);
      const arrowEl = el('div', { class: K + 'arrow', hidden: true, 'aria-hidden': 'true', text: '👇' });
      objBtn.appendChild(arrowEl);
      const padRow = el('div', { class: K + 'row' }, recBtn, goatBtn, lambBtn, tagBtn, objBtn);
      const hintEl = el('div', { class: K + 'hint', text: 'tap a sheep, press COUNT, or hit C or Space' });
      const padTop = el('div', { class: K + 'padtop' }, ramEl, countBtn, brkEl, hintEl);
      const st1 = el('div'), st2 = el('div');
      const stEl = el('div', { class: K + 'st' }, st1, st2);
      const capStamp = el('b', { 'aria-hidden': 'true' }), capTxt = el('span', { text: 'Press COUNT when a sheep is at the very top.' });
      const stampSr = el('span', { class: K + 'sr', role: 'status' });
      const capEl = el('div', { class: K + 'cap', 'aria-live': 'off' }, capStamp, capTxt, stampSr);
      const keysEl = el('div', { class: K + 'keys', text: 'Keys: C count, G goat, L lamb, T tag, F object, S or O rule, M moon, W fence, N snail' });
      const slipEmpty = el('div', { class: K + 'empty', text: 'No slips yet. The printer is warming up its opinions.' });
      const slipsEl = el('div', { class: K + 'slips' }, slipEmpty);
      const vEmpty = el('li', { class: K + 'empty', text: 'No variance yet. Management is optimistic.' });
      const vlog = el('ul', { class: K + 'vlog' }, vEmpty);
      const objForm = el('div', { class: K + 'obj', hidden: true });
      const invList = el('ul');
      const invBtn = el('button', { type: 'button', onclick: function () { settle(); } }, 'Settle Later');
      const invEl = el('div', { class: K + 'inv', hidden: true }, el('h4', { text: 'FENCE INVOICE' }), invList, invBtn);
      const side = el('div', { class: K + 'side' }, padTop, padRow, el('h3', { class: K + 'h3a', text: 'AUDIT SLIP' }), slipsEl, objForm, el('h3', { text: 'VARIANCE REPORT' }), vlog, invEl);
      const wrap = el('div', { class: K + 'wrap' }, hd, slpBar, el('div', { class: K + 'main' }, field, stEl, capEl, keysEl), side);
      root.appendChild(wrap);
      root.tabIndex = -1;
      api.setTitle('Counting Sheep (Accurately)');
      /* ---------- paint helpers ---------- */
      let odoKey = '';
      function paintOdo() {
        if (S.odoText) { odoT.firstChild.textContent = S.odoText; odoT.hidden = false; odoD.hidden = true; odoKey = 't' + S.odoText; return; }
        odoT.hidden = true; odoD.hidden = false;
        const v = clamp(S.zeroOdo > S.clock ? 0 : S.yourCount, -9999.5, 9999.5);
        const key = String(v); if (key === odoKey) return; odoKey = key;
        const a = Math.abs(v), w = Math.floor(a) % 10000;
        for (let i = 0; i < 4; i++) reels[i].style.transform = 'translateY(-' + (Math.floor(w / Math.pow(10, 3 - i)) % 10) + 'em)';
        sgn.textContent = v < 0 ? '-' : '';
        halfEl.classList.toggle(K + 'on', a - Math.floor(a) >= 0.5);
        odoD.classList.toggle(K + 'neg', v < 0);
        odoD.setAttribute('aria-label', 'Your count: ' + fmtHalf(v));
      }
      function paintStatus() {
        const seen = S.crossed + S.seenExtra;
        st1.textContent = 'Sheep seen ' + seen + ' / Sheep counted ' + fmtHalf(S.yourCount) + ' / Sheep believed ' + Math.floor(seen * 0.75);
        st2.textContent = 'Variance Owed ' + fmtHalf(Math.min(S.owed, 9999)) + ' sheep (heirloom) · Fence Retainer ' + (Math.round(n0(S.splinters) * 10) / 10) + ' splinters · Local 7 1/2: ' + Math.round(clamp(S.union, 0, 100)) + '%';
        slpBar.hidden = !(S.night >= 2 || S.crossed >= 8);
        nightEl.textContent = '';
        nightEl.appendChild(document.createTextNode('Night ' + S.night));
        nightEl.appendChild(el('small', { text: 'Shift ' + S.beat + (funOn() ? ' · FUN (mandatory)' : S.beat >= 6 ? ' · legal' : S.beat >= 5 ? ' · unionized' : S.beat >= 4 ? ' · regulated' : '') }));
        if (S.beat >= 8) { odo2.hidden = false; odo2.textContent = 'Times You Counted ' + S.presses; }
        if (!S.once.believed && S.night === 1 && S.mode === 'PLAY' && seen >= 3 && Math.floor(seen * 0.75) !== r5(S.yourCount)) { S.once.believed = true; later(1800, function () { say('Management', L.believed, { priority: 1, mood: 'smug' }); }); }
      }
      function paintSleep() {
        const v = clamp(S.sleep, 0, 0.995);
        slpFill.style.width = Math.round(v * 100) + '%';
        slpVal.textContent = S.sleepPin || Math.round(v * 100) + '%';
      }
      function paintVariance(text, special) {
        vsVal.textContent = text;
        vsBtn.classList.remove(K + 'slam'); void vsBtn.offsetWidth;
        if (!S.reduced) vsBtn.classList.add(K + 'slam');
        petEl.hidden = S.pet < 3; vsWrap.classList.toggle(K + 'haspet', S.pet >= 3);
      }
      function paintButtons() {
        goatBtn.hidden = !S.intro.goat; lambBtn.hidden = !S.intro.lamb; tagBtn.hidden = !S.intro.tag; objBtn.hidden = !S.intro.obj;
        objBtn.setAttribute('aria-disabled', S.objOpen ? 'false' : 'true'); hintEl.hidden = !(S.night === 1 && S.presses < 3 && n0(sv.total) === 0);
        vsBtn.classList.toggle(K + 'live', S.objOpen);
        const brk = S.breakUntil > S.clock;
        if (brk && !S.brkWas) { try { S.brkFocus = document.activeElement === countBtn; } catch (e) { S.brkFocus = false; } }
        countBtn.hidden = brk; brkEl.hidden = !brk;
        if (!brk && S.brkWas && S.brkFocus) { S.brkFocus = false; try { countBtn.focus({ preventScroll: true }); } catch (e) { /* no focus */ } }
        S.brkWas = brk;
        const lamHold = S.mode === 'LAMENT' && !!S.lam && !S.lam.done;
        hopeTrk.hidden = !lamHold; if (countLbl.textContent !== (lamHold ? 'HOLD' : 'COUNT')) countLbl.textContent = lamHold ? 'HOLD' : 'COUNT';
        countBtn.classList.toggle(K + 'shake', S.jamUntil > S.clock && !S.reduced);
        arrowEl.hidden = !(S.objOpen && S.objections === 0);
        wrap.classList.toggle(K + 'rm', S.reduced);
      }
      function paintInvoice() {
        if (S.beat < 6 && !S.fin) { invEl.hidden = true; return; }
        invEl.hidden = false;
        const hours = Math.round(S.crossed * 1) / 10;
        const rows = ['Retainer: 0.7 Meh', 'Hourly: ' + hours + ' hours (0.1 per sheep)', 'Objection fees: ' + S.objections + ' Meh', 'Notary (the moon): 0 Meh, 1 favour',
          'Overnight surcharge: ' + Math.round(n0(S.splinters) * 10) / 10 + ' splinters', 'Surcharge for referring to the surcharge: 7 1/2 splinters', 'Reading this bill: 0.1 splinters'];
        if (S.night >= 2) rows.push('Brenda (all), prorated');
        if (S.fin && S.fin.stage >= 3) rows.push('Services rendered: a fence');
        rows.push('TOTAL: 7 1/2 splinters (carried)');
        const shown = Math.min(rows.length - 1, S.invRows);
        const vis = rows.slice(0, shown).concat(rows[rows.length - 1]);
        while (invList.children.length > 12) invList.removeChild(invList.firstChild);
        invList.textContent = '';
        vis.slice(-12).forEach(function (r) { invList.appendChild(el('li', { text: r })); });
      }
      function capture() { S.reduced = readReduced(); }
      function readReduced() { return !!((root.closest && root.closest('.pm-reduce-motion')) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)); }
      function stampField(text, cls, ms) {
        fstamp.textContent = text; fstamp.className = K + 'fstamp ' + K + cls; fstamp.hidden = false;
        S.fstampUntil = S.clock + (ms || 1100); setStamp(text);
      }
      function showBanner(text, ms) { bannerEl.textContent = text; bannerEl.hidden = false; later(ms || 4000, function () { bannerEl.hidden = true; }, 'banner'); }
      /* ---------- sheep ---------- */
      const POOL = 12, pool = [];
      for (let i = 0; i < POOL; i++) pool.push({ on: false, px: 0, py: 0 });
      const TMP = { x: 0, y: 0, sx: 1, sy: 1, rot: 0, air: 0 };
      function durFor() { return Math.max(900, lerp(1600, 1000, (S.beat - 1) / 7)); }
      function spawn(type, o) {
        o = o || {};
        let sh = null; for (let i = 0; i < POOL; i++) if (!pool[i].on) { sh = pool[i]; break; }
        if (!sh) return null;
        const stiff = S.stiffLeft > 0 && type !== 'sock';
        if (stiff && type === 'sheep') S.stiffLeft--;
        if (S.stiffLeft <= 0) S.workRule = false;
        let dur = durFor() + (stiff ? 100 : 0) + (S.workRule ? 200 : 0);
        let amp = 120;
        if (type === 'half') amp = 62; else if (type === 'concept') { amp = 0; dur = 2400; } else if (o.gate) amp = 0;
        sh.on = true; sh.type = type; sh.dir = o.dir || 1; sh.u = 0; sh.A = o.A || 1400; sh.dur = dur; sh.amp = S.reduced ? Math.min(amp, 14) : amp;
        sh.fx = S.oldLeft > 0 ? S.oldFx : FX + S.shift + S.nudge; if (S.oldLeft > 0) { S.oldLeft--; sh.late = true; } else sh.late = false;
        sh.takeoffU = sh.A + 250; sh.apexU = sh.takeoffU + dur / 2; sh.landU = sh.takeoffU + dur; sh.endU = sh.landU + 1200;
        sh.k1 = false; sh.apexed = false; sh.landed = false; sh.counted = false; sh.frozen = false; sh.holdLeft = 0; sh.holdMs = 0; sh.breakFlag = false; sh.flagged = false; sh.tagged = false; sh.brkDone = false;
        sh.stiff = stiff; sh.scale = type === 'lamb' ? 0.6 : type === 'half' ? 0.75 : 1; sh.tie = S.night >= 2; sh.tag = type === 'brenda' ? '4' : ''; sh.tag2 = !!o.tag2;
        sh.disg = o.disg || 0; if (sh.disg === 4) sh.scale = 0.6; sh.vest = !!o.vest; sh.lab = ''; sh.labUntil = 0; sh.gate = !!o.gate; sh.sign = o.sign || ''; sh.first = !!o.first;
        sh.lanyard = !!o.lanyard; sh.last = !!o.last; sh.sandra = false; sh.ghost = false; sh.xs = o.xs; sh.px = -99; sh.py = GY; sh.hatted = type === 'secu';
        return sh;
      }
      function place(sh) {
        const u = sh.u, d = sh.dir, fx = sh.fx, t = TMP;
        const xS = sh.xs !== undefined ? sh.xs : (d > 0 ? -40 : 680), xA = fx - d * 90, xB = fx + d * 90, xE = d > 0 ? 700 : -60;
        t.sx = 1; t.sy = 1; t.rot = 0; t.air = 0; t.y = GY;
        if (u < sh.A) { t.x = xS + (xA - xS) * u / sh.A; t.y = GY - Math.abs(Math.sin(u / 110)) * 3; }
        else if (u < sh.takeoffU) { const p = (u - sh.A) / 250; t.x = xA; t.sy = 1 - 0.2 * p; t.sx = 1 + 0.15 * p; }
        else if (u <= sh.landU) {
          const p = (u - sh.takeoffU) / sh.dur, e = u - sh.takeoffU;
          t.x = xA + (xB - xA) * p; t.air = sh.amp * 4 * p * (1 - p); t.y = GY - t.air;
          if (sh.type === 'lamb') t.y -= Math.sin(p * 18) * 6 * (1 - Math.abs(p - 0.5));
          if (e < 120) { t.sy = 1.2 - 0.2 * e / 120; t.sx = 0.92 + 0.08 * e / 120; }
          t.rot = sh.stiff ? 0.7 : (p - 0.5) * 0.6;
        } else {
          const e = u - sh.landU; t.x = xB + (xE - xB) * Math.min(1, e / (sh.endU - sh.landU));
          t.y = GY - Math.abs(Math.sin(u / 110)) * 3;
          if (e < 120) t.sy = 0.85 + 0.15 * e / 120;
        }
        sh.px = t.x; sh.py = t.y;
        return t;
      }
      function weightOf(sh) { const w = WEIGHT[sh.type]; return w === undefined ? 1 : w; }
      function bubble(who, text, life) {
        if (!text) return;
        if (S.bubbles.length >= 3) S.bubbles.shift();
        S.bubbles.push({ sh: who && who.on !== undefined ? who : null, x: who && who.on === undefined ? who.x : 0, y: who && who.on === undefined ? who.y : 0, text: String(text).slice(0, 22), life: life || 900 });
      }
      function bubbleAt(x, y, text) { bubble({ x: x, y: y }, text); }
      function pickType(k) {
        if (k === 14) return { t: 'goat', first: true };
        if (k === 17) return { t: 'lamb', first: true };
        if (k === 25 && !S.intro.tag) return { t: 'brenda', dir: -1, first: true };
        const bi = BDIS.indexOf(k); if (bi >= 0) return { t: 'brenda', dir: -1, disg: bi + 1 };
        if (S.queue.length) return S.queue.shift();
        if (k % 15 === 8) return { t: 'half' };
        if (S.sockForce && k >= S.sockForce) { S.sockForce = 0; S.sockDone = true; return { t: 'sock' }; }
        if (!S.sockDone && !api.selftest && S.crossed >= S.sockAt) { S.sockDone = true; return { t: 'sock' }; }
        if (S.goldAt && k >= S.goldAt && S.beat >= 2) { S.goldAt = 0; return { t: 'golden' }; }
        if (S.toastAt && k >= S.toastAt && S.beat >= 2) { S.toastAt = 0; return { t: 'toast', dir: -1 }; }
        if (S.lunchAt && k >= S.lunchAt && S.beat >= 3) { S.lunchAt = 0; return { t: 'lunch' }; }
        if (S.lastSpecial) return { t: 'sheep' };
        const r = api.rand();
        if (S.beat >= 2 && !S.goldenLast && api.chance(1 / 77)) return { t: 'golden' };
        if (api.chance(1 / 300)) return { t: 'a404' };
        if (S.beat >= 2 && api.chance(1 / 110)) return { t: 'toast', dir: -1 };
        if (S.beat >= 3 && api.chance(1 / 85)) return { t: 'lunch' };
        if (S.beat >= 3 && api.chance(1 / 60)) return { t: 'back', dir: -1 };
        if (S.beat >= 3 && r < 0.09) return { t: 'concept' };
        if (S.beat >= 7 && r < 0.2) return { t: 'pair', sign: pickOf(['ONE OF US', 'ONE OF THEM', 'I AM TWO SHEEP IN A COAT']) };
        if (S.beat >= 3 && api.chance(0.14)) return { t: 'goat', vest: true };
        if (k > 17 && api.chance(0.1)) return { t: 'lamb' };
        if (S.gate && api.chance(0.2)) return { t: 'sheep', gate: true };
        return { t: 'sheep' };
      }
      function spawnNext() {
        const k = S.spawned + 1, pt = pickType(k);
        const o = { dir: pt.dir, first: pt.first, disg: pt.disg, sign: pt.sign, vest: pt.vest || (pt.t === 'goat' && k > 14), tag2: pt.tag2, gate: pt.gate };
        if (pt.t === 'goat' && !pt.first) o.vest = true;
        const sh = spawn(pt.t, o);
        if (!sh) return;
        S.spawned = k;
        S.lastSpecial = ['golden', 'a404', 'back', 'concept', 'pair', 'sock', 'half', 'brenda', 'toast', 'lunch'].indexOf(pt.t) >= 0;
        if (S.beat >= 5 && k % 3 === 0 && pt.t !== 'half') sh.breakFlag = true;
        if (pt.t === 'golden') { S.goldenLast = true; say('Management', L.rare[0], { priority: 1, mood: 'proud' }); api.sfx('bell'); later(250, function () { api.sfx('bell'); }); later(500, function () { api.sfx('bell'); }); later(5000, function () { say('Management', L.rare[1], { priority: 1 }); }); }
        else S.goldenLast = false;
        if (pt.t === 'sock') say('Management', api.flag.get('sockSeen') ? L.sockKnown : L.cameos[3], { priority: 1, mood: 'confused' });
        if (pt.t === 'a404') sh.scale = 0.9;
        if (pt.gate) bubble(sh, 'with dignity');
        if (k === 1 && pt.t === 'sheep' && S.night === 1) { sh.k1 = true; later(1500, function () { if (sh.on && sh.k1) bubble(sh, 'count me at the top', 1800); }); }
        if (pt.t === 'back') { S.backUntil = S.clock + 4000; }
        if (pt.t === 'brenda' && !pt.first && !pt.tag2) { const dg = L.disguise[pt.disg]; if (dg) say('Management', dg, { priority: 1, mood: 'confused' }); }
        if (pt.t === 'sheep' && S.beat >= 7 && !S.once.senior && api.chance(0.15)) { S.once.senior = true; sh.lanyard = true; say('Management', L.cameos[6], { priority: 1 }); }
        if (S.beat >= 3 && k === 33) { sh.sandra = true; }
        s2Spawn(k);
      }
      /* ---------- crossing / audit ---------- */
      const XI = { 4: 0, 5: 0, 6: 0 };
      function extraLine() { const k = S.beat >= 6 ? 6 : S.beat, src = k === 6 ? L.palisade : k === 5 ? L.union.slice(2) : [L.sandra[1], L.sandra[5], L.sandra[4], L.sandra[6], L.sandra[7], L.sandra[8]]; return src[XI[k]++ % src.length]; }
      function onApex(sh) {
        S.crossed++; S.W += weightOf(sh);
        const c = S.crossed, nb = beatOf(c);
        if (nb > S.beat) { S.beat = nb; onBeat(nb); }
        if (sh.type === 'half') { say('Management', L.half[Math.min(S.halfN, L.half.length - 1)], { priority: 1, mood: 'confused' }); S.halfN++; sh.holdMs = 4000; sh.lab = '7 1/2'; sh.labUntil = 1e9; }
        else if (sh.type === 'goat') {
          if (sh.first && !S.intro.goat) { S.intro.goat = true; paintButtons(); goatBtn.classList.add(K + 'pop'); say('Management', L.goat[0], { priority: 1, keep: true, mood: 'panic' }); later(2500, function () { say('Management', L.goatTag, { priority: 1, keep: true, mood: 'smug' }); }); }
          else if (api.chance(0.4)) say('Management', L.goat[1 + api.randInt(0, L.goat.length - 2)], { mood: 'confused' });
        } else if (sh.type === 'lamb' && !S.intro.lamb) { S.intro.lamb = true; paintButtons(); lambBtn.classList.add(K + 'pop'); }
        else if (sh.type === 'brenda') {
          S.brendaSeen = true;
          if (sh.first && !S.intro.tag) { S.intro.tag = true; paintButtons(); tagBtn.classList.add(K + 'pop'); say('Management', L.brenda[0], { priority: 1, keep: true, mood: 'confused' }); S.sleepPoke++; }
          else if (!sh.first && api.chance(0.3)) say('Management', L.brenda[api.randInt(1, L.brenda.length - 1)], { mood: 'smug' });
        } else if (sh.type === 'a404') { S.zeroOdo = S.clock + 3000; say('Management', L.rare[4], { priority: 1, mood: 'smug' }); api.achieve('sheep-counter.auditor'); later(3500, function () { say('Management', L.sandra[4], { priority: 1 }); }); }
        else if (sh.type === 'concept') say('Management', L.rare[7], { priority: 1, mood: 'confused' });
        else if (sh.type === 'pair') say('Management', L.rare[8], { priority: 1 });
        else if (sh.type === 'back') say('Management', L.rare[5], { priority: 1, mood: 'confused' });
        else if (sh.type === 'toast') { bubble(sh, 'toast'); say('The Toaster', 'Toast.', { priority: 1 }); later(2300, function () { say('Management', (api.flag.get('metToaster') || api.flag.get('toasterMet')) ? L.toast[1] : L.toast[0], { priority: 1, mood: 'confused' }); }); }
        else if (sh.type === 'lunch') say('Management', L.lunch[0], { priority: 1, mood: 'confused' });
        if (c === 1 && S.night === 1 && !S.once.firstGone) { S.once.firstGone = true; later(1500, function () { if (S.presses === 0 && S.mode === 'PLAY') say('Management', L.firstGone, { priority: 1, keep: true, mood: 'smug' }); }); }
        if (S.tueAt && c === S.tueAt && !S.tueN) tuesday();
        if (sh.sandra) say('Management', L.sandra31, { priority: 1, keep: true });
        if (c === 76 && S.beat >= 8 && !S.once.sl76) { S.once.sl76 = true; S.sleepPin = '7 1/2%'; say('Management', L.sleep[1], { priority: 1 }); }
        if (c === 84 && !S.once.sl84) { S.once.sl84 = true; S.sleepPin = 'See Tuesday'; say('Management', L.sleep[3], { priority: 0 }); }
        if (sh.breakFlag && S.mode === 'PLAY') { sh.holdMs = S.breakSays < 2 ? 3500 : 1500; sh.lab = 'break'; if (S.breakSays < 2 && say('Management', S.breakSays ? L.breakLine2 : L.breakLine, { priority: S.breakSays ? 1 : 2, keep: true, mood: 'smug' })) S.breakSays++; }
        if (c === 74 && !S.once.dennis) startDennis();
        if (S.beat >= 4 && S.beat <= 9 && c % 6 === 3 && S.mode === 'PLAY' && !sh.sandra) say('Management', extraLine(), { priority: 1, mood: S.beat >= 6 ? 'smug' : 'neutral' });
        if (c === 60 && !S.once.crack) { S.once.crack = true; say('Management', L.cameos[7], { priority: 1, mood: 'panic' }); }
        if (c >= 94 && c % 2 === 0) { if (api.flag.get('metGerald') && !S.once.gerald) { S.once.gerald = true; say('Gerald', L.cameos[8], { priority: 1 }); } }
        if (S.mode === 'PLAY' && !S.auditing && c >= S.nextAudit) {
          if (S.skipNext) { S.skipNext = false; S.nextAudit += interval(S.beat); say('Management', L.misc[6], { priority: 1 }); }
          else startAudit(sh);
        }
        s2Apex(sh, c); paintStatus(); if (S.invRows < 12 && c % 2 === 0) { S.invRows++; paintInvoice(); }
      }
      function onLand(sh) {
        if (sh.type === 'golden' && !sh.counted) {
          api.toast('Principled Non-Counter'); api.achieve('sheep-counter.principled'); say('Management', L.rare[2], { priority: 1, mood: 'confused' }); api.stat.inc('sheep-counter.principled');
        }
        if (sh.type === 'sock' && !sh.counted) say('Management', L.cameos[4], { priority: 1 });
        if (sh.type === 'toast' && !sh.counted) say('Management', L.toast[3], { priority: 1 });
        if (sh.late) bubble(sh, 'not my fault');
        if (!sh.counted && S.presses === 0 && S.night === 1 && sh.type === 'sheep' && !S.once.fine) { S.once.fine = true; bubble(sh, 'that is fine', 1400); }
        if (sh.last) lamentLanded(sh);
      }
      function onBeat(b) {
        S.reduced = readReduced();
        api.flag.set('sheep-counter.reachedBeat', b);
        if (b === 4 && !S.once.b4) { S.once.b4 = true; signEl.hidden = false; S.signAt = S.clock; nextSign(); S.stiffLeft = 8; say('Management', L.sandra[0], { priority: 1, mood: 'smug' }); later(4500, function () { say('Management', L.sandra[2], { priority: 1 }); }); }
        if (b === 5 && !S.once.b5) { S.once.b5 = true; localEl.hidden = false; showBanner('SHEEP LOCAL 7 1/2', 4500); bannerEl.className = K + 'banner'; S.union = 7.5; say('Management', L.union[0], { priority: 1, mood: 'panic' }); later(4200, function () { say('Management', api.flag.get('metStapler') ? L.stapler : L.union[1], { priority: 1 }); }); }
        if (b === 6 && !S.once.b6) { S.once.b6 = true; S.invRows = 4; paintInvoice(); say('Management', L.palIntro, { priority: 2, mood: 'panic' }); api.achieve('sheep-counter.local'); S.motionIn = S.clock + 6000; }
        if (b === 8 && !S.once.b8) { S.once.b8 = true; S.sleepPin = '99%'; say('Management', L.sleep[0], { priority: 1 }); later(3000, function () { say('Management', L.jury[0], { priority: 1, mood: 'smug' }); }); }
        if (b === 9) { S.once.b9 = true; S.dawnT = 1; }
        if (b === 5 && S.once.b5 && localEl.hidden) { localEl.hidden = false; S.union = Math.max(S.union, 7.5); }
        if (b === 6 && S.once.b6 && !S.motionIn) { S.motionIn = S.clock + 6000; S.invRows = Math.max(S.invRows, 4); }
        if (b === 10 && !S.once.b10) { S.once.b10 = true; S.loud = true; say('Management', L.sandra[3], { priority: 1 }); }
        paintStatus(); paintInvoice();
      }
      /* from shift 6, and on every later night (the heirloom debt), the variance is always 7 1/2 */
      function hi(beat) { return beat >= 6 || S.night >= 2; }
      function makeVariance(diff, beat, special) {
        let v;
        if (special === 'deficit' || special === 'dennis') v = 0;
        else if (hi(beat)) v = 7.5;
        else if (diff === 0) v = 1;
        else v = diff;
        if (v !== 0 && Math.abs(v) < 0.5) v = 0.5;
        return v;
      }
      function varText(v, r, beat, special) {
        if (special === 'deficit' || special === 'dennis') return '0.0';
        if (r >= 7) return 'variance of the variance: ' + (hi(beat) ? '7 1/2' : fmtHalf(v)) + ' (also off)';
        const base = hi(beat) ? UNIT7[S.audits % UNIT7.length] : fmtHalf(v, true) + ' sheep';
        return base + (LADDER[Math.min(5, r - 1)] || '');
      }
      function accuracy(k, diff, beat, exact) {
        if (exact) return '100.0% (INVALID)';
        if (hi(beat)) return ACC7[k % ACC7.length];
        if (k === 1) return '94.1%';
        return Math.max(6, 99.9 - Math.abs(diff) * 2.4).toFixed(1) + '%';
      }
      function startAudit(sh) {
        S.auditing = true; setMode('AUDIT', 16000); sh.frozen = true; S.audSheep = sh; finishType();
        const beat = S.beat, yc = S.yourCount, Pd = yc - S.pdBase, Wt = S.W;
        S.pdBase = yc; S.W = 0;
        const diff = clamp(r5(Wt - Pd), -3, 3);
        const k = ++S.audits, r = Math.min(7, k);
        let special = '';
        if (k === 1 && S.nonRecount === 0 && yc === -1) special = 'deficit';
        else if (S.dennisArmed) { special = 'dennis'; S.dennisArmed = false; }
        const exact = special === '' && !hi(beat) && diff === 0;
        const v = makeVariance(diff, beat, special);
        S.v = v; S.tc = r5(yc + v); S.tcShown = true; S.owed = Math.min(9999, r5(S.owed + Math.abs(v)));
        S.nextAudit += interval(beat);
        if (Math.abs(v) === 0.5) S.pet++;
        const vt = varText(v, r, beat, special);
        say('Management', ln('auditopen'), { priority: 1, mood: 'neutral' });
        api.sfx('bell');
        const ls = [{ t: 'AUDIT SLIP No. ' + k, c: 'h' }, { t: 'SHEEP CROSSED: ' + S.crossed }, { t: 'YOUR COUNT: ' + fmtHalf(yc) }];
        let flav;
        if (special === 'deficit') {
          ls.push({ t: 'YOUR COUNT: -1. TRUE COUNT: -1. VARIANCE: 0.0. THIS IS NOT ALLOWED.', c: 'v' });
          flav = L.misc[7]; S.skipNext = true; S.fenceRot = 1; S.silentUntil = S.clock + 3000; api.achieve('sheep-counter.deficit'); api.stat.inc('sheep-counter.deficits');
        } else {
          ls.push({ t: (S.reversed ? 'OFFICIAL COUNT (REVERSED): ' : 'TRUE COUNT: ') + fmtHalf(S.tc) });
          let vline = 'VARIANCE: ' + vt;
          if (k === 1 && v > 0 && !hi(beat)) vline += ' (sheep ' + Math.max(1, Math.round(S.tc)) + ' was shy)';
          ls.push({ t: vline, c: 'v' });
          const accStr = accuracy(k, diff, beat, exact);
          ls.push({ t: 'ACCURACY INDEX: ' + accStr + ' ★★★☆☆ (stars are advisory)' });
          flav = exact ? ln('auditexact') : hi(beat) ? ln('audit7half') : Math.abs(v) <= 1 && v !== 0 ? ln('auditclose') : ln('auditresult');
          flav = flav.replace(/\[v\]/g, fmtHalf(Math.abs(v))).replace(/\[acc\]/g, accStr);
          if (special === 'dennis') flav = L.cameos[1];
        }
        S.reversed = false;
        if (beat >= 2 && beat <= 4 && special !== 'deficit' && k > 1) ls.push({ t: 'FENCE (counted as 1/2): included' });
        if (special !== 'deficit') { ls.push({ t: ln('clauses') }); if (k > 1) ls.push({ t: ln('clauses') }); }
        if (S.brendaSeen) { ls.push({ t: 'BRENDA: -1 and +1, net 0' }); S.brendaSeen = false; }
        if (beat >= 6) ls.push({ t: 'LEGAL REVIEW: Mr. Palisade has billed this slip.' });
        if (beat >= 5 && api.chance(0.6)) ls.push({ t: 'STEWARD: ' + ln('demand') });
        if (special === 'dennis') ls.push({ t: 'NOTE: the most suspicious event of the night.' });
        later(3300, function () { say('Management', flav, { priority: 1, mood: Math.abs(v) <= 1 ? 'proud' : 'smug' }); }, 'flav');
        const mint = special === 'dennis' || Math.abs(v) <= 1 || special === 'deficit';
        const stamp = special === 'deficit' ? { t: 'PERFECT, ILLEGAL COUNT', k: 'lil' } : mint ? { t: 'NOTED', k: 'mint' } : { t: 'UPHELD IN PART', k: 'cor' };
        if (beat >= 8 && k % 2 === 0) later(2500, function () { say('Management', api.chance(0.6) ? L.jury[api.randInt(2, L.jury.length - 1)] : (rate() > 40 ? L.overClick : L.jury[0]), { priority: 1 }); }, 'mode');
        if (S.pet >= 3 && Math.abs(v) === 0.5) ls.splice(5, 0, { t: ['Variance: 0.5, a historic low, noted and filed.', 'Variance: 0.5, again, historic.', 'Variance: 0.5, now a tradition.', 'Variance: 0.5. It has become a pet.'][Math.min(3, S.pet - 3)] });
        printSlip(ls.slice(0, 14), stamp, function () {
          if (!S.auditing) return;
          S.objOpen = true; S.objUntil = S.clock + 5000; S.intro.obj = true; paintButtons();
          later(5000, endAudit, 'mode');
        });
        paintVariance(special === 'deficit' || special === 'dennis' ? '0.0' : hi(beat) ? '7 1/2' : fmtHalf(v, true), special);
        tcVal.textContent = fmtHalf(S.tc); tcBox.classList.remove(K + 'red');
        addVlog(k, yc, S.tc, v);
        if (special === 'dennis') { api.award(1, 'dennis'); api.stat.inc('sheep-counter.dennis'); }
        S.blink = S.clock + 500;
        paintStatus(); paintOdo();
      }
      function rate() { const n = api.now(); S.ring60 = S.ring60.filter(function (t) { return n - t < 60000; }); return S.ring60.length; }
      function addVlog(k, yc, tc, v) {
        if (vEmpty.parentNode) vlog.removeChild(vEmpty);
        vlog.appendChild(el('li', { text: '#' + k + ' you ' + fmtHalf(yc) + ' / true ' + fmtHalf(tc) + ' / var ' + (v === 0 ? '0.0' : fmtHalf(v, true)) }));
        while (vlog.children.length > 6) vlog.removeChild(vlog.firstChild);
      }
      function endAudit() {
        if (!S.auditing) return;
        S.auditing = false; S.objOpen = false; S.objBusy = false; objForm.hidden = true; clearLater('mode'); S.audSheep = null;
        setMode('PLAY'); finishType();
        api.award(2, 'audit'); api.stat.inc('sheep-counter.audits'); persist(); paintButtons();
        S.signAt = Math.min(S.signAt, S.clock);
      }
      function tryObject(src) {
        if (!S.objOpen || S.objBusy || !S.auditing) { if (src === 'stamp') { stampField('NOTED', 'mus', 700); bubbleAt(300, 120, 'no active audit'); } else if (src === 'button' && S.intro.obj) bubbleAt(300, 120, 'nothing to object to'); return; }
        S.objBusy = true; S.objOpen = false; S.objT = 0; setMode('HEARING', 6000);
        if (S.audSheep && S.audSheep.on) S.audSheep.frozen = true;
        clearLater('mode'); finishType();
        S.objections++; api.stat.inc('sheep-counter.objections'); S.splinters = Math.round((S.splinters + 0.4) * 10) / 10;
        say('Management', S.objections % 5 === 0 ? L.objCount.replace('{count}', String(S.objections)) : ln('objection'), { priority: 1 });
        const cb = el('input', { type: 'checkbox', checked: true, disabled: true, id: K + 'cb' });
        const lbl = el('label', { onclick: function () { bubbleAt(300, 150, 'it cannot be unchecked'); } }, cb, el('span', { text: 'I understand this is final' }));
        const fill = el('i'), ptxt = el('div', { text: 'Processing: 0%' });
        objForm.textContent = ''; objForm.appendChild(lbl); objForm.appendChild(el('div', { class: K + 'bar' }, fill)); objForm.appendChild(ptxt); objForm.hidden = false;
        S.hear = { fill: fill, ptxt: ptxt, t: 0 }; paintButtons();
      }
      function hearingStep(dt) {
        const h = S.hear; if (!h) return;
        h.t += dt; const t = h.t;
        if (t < 1200) { const p = Math.round(99 * t / 1200); h.fill.style.width = p + '%'; h.ptxt.textContent = 'Processing: ' + p + '%'; }
        else if (t < 2400) { h.fill.style.width = '99%'; h.ptxt.textContent = 'Processing: 7 1/2%'; }
        else if (t < 3000) { h.fill.style.width = '100%'; h.ptxt.textContent = 'PROCESSING COMPLETE'; }
        else {
          S.hear = null;
          let v = S.v;
          if (!hi(S.beat)) { v = r5(v + (api.chance(0.5) ? 1 : -1)); if (v === 0) v = 0.5; v = clamp(v, -4, 4); }
          else v = 7.5;
          S.v = v; S.tc = r5(S.yourCount + v);
          paintVariance(hi(S.beat) ? '7 1/2' : fmtHalf(v, true), '');
          tcVal.textContent = fmtHalf(S.tc);
          stampField('UPHELD IN PART', 'cor', 1400); api.sfx('stamp');
          say('Management', hi(S.beat) ? L.upheld7 : ln('upheld'), { priority: 1 });
          api.award(S.objections <= 3 ? 2 : 0.2, 'objection');
          S.splinters = Math.round((S.splinters + 0.1) * 10) / 10; S.invRows = Math.max(S.invRows, 4); paintInvoice();
          S.auditing = true; later(600, endAudit, 'mode'); objForm.hidden = true; paintStatus();
        }
      }
      /* ---------- slip printing ---------- */
      function printSlip(lines, stamp, done) {
        finishType();
        const card = el('div', { class: K + 'slip' });
        if (slipEmpty.parentNode) slipsEl.removeChild(slipEmpty);
        slipsEl.appendChild(card);
        while (slipsEl.children.length > 3) slipsEl.removeChild(slipsEl.firstChild);
        let total = 0; lines.forEach(function (l) { total += String(l.t).length; });
        S.type = { card: card, lines: lines.slice(0, 14), idx: 0, ch: 0, per: clamp(3500 / Math.max(10, total), 3, 55), acc: 0, cur: null, stamp: stamp, done: done };
      }
      function typeStep(dt) {
        const T = S.type; if (!T) return;
        T.acc += dt;
        let guard = 0;
        while (T.acc >= T.per && guard++ < 400) {
          T.acc -= T.per;
          if (!T.cur) {
            if (T.idx >= T.lines.length) { finishType(); return; }
            const l = T.lines[T.idx]; T.cur = el('div', { class: K + 'sl' + (l.c === 'h' ? ' ' + K + 'h' : l.c === 'v' ? ' ' + K + 'v' : l.c === 'tiny' ? ' ' + K + 'tiny' : '') });
            T.card.appendChild(T.cur); T.ch = 0;
          }
          const txt = String(T.lines[T.idx].t); T.ch++;
          T.cur.textContent = txt.slice(0, T.ch);
          if (T.ch >= txt.length) { T.cur = null; T.idx++; }
        }
        slipsEl.scrollTop = slipsEl.scrollHeight; ovSync(T.card);
      }
      function ovSync(card, st) {
        const rows = [], ch = card.children;
        for (let i = 0; i < ch.length; i++) if (ch[i].classList.contains(K + 'h') || ch[i].classList.contains(K + 'v')) rows.push(ch[i].textContent);
        for (let i = 0; i < ch.length && !rows.length && i < 2; i++) if (ch[i].classList.contains(K + 'sl')) rows.push(ch[i].textContent);
        ovEl.textContent = '';
        rows.slice(0, 3).forEach(function (r) { if (r) ovEl.appendChild(el('div', { text: r })); });
        if (st) ovEl.appendChild(el('b', { text: st }));
        ovEl.hidden = !ovEl.firstChild || !!S.motion; S.ovUntil = S.clock + 7000;
      }
      function finishType() {
        const T = S.type; if (!T) return; S.type = null;
        for (let i = T.idx; i < T.lines.length; i++) {
          const l = T.lines[i];
          let d = (i === T.idx && T.cur) ? T.cur : el('div', { class: K + 'sl' + (l.c === 'h' ? ' ' + K + 'h' : l.c === 'v' ? ' ' + K + 'v' : l.c === 'tiny' ? ' ' + K + 'tiny' : '') });
          d.textContent = String(l.t); if (!d.parentNode) T.card.appendChild(d);
        }
        if (T.stamp) { T.card.appendChild(el('div', { class: K + 'stamp ' + K + T.stamp.k, text: T.stamp.t })); api.sfx('stamp'); }
        slipsEl.scrollTop = slipsEl.scrollHeight; ovSync(T.card, T.stamp && T.stamp.t);
        if (T.done) T.done();
      }
      /* ---------- modes ---------- */
      function setMode(m, maxMs) {
        S.mode = m; clearLater('mode'); S.modeUntil = maxMs ? S.clock + maxMs * 1.5 : 0;
        for (let i = 0; i < POOL; i++) pool[i].frozen = false;
      }
      function forcePlay() {
        S.auditing = false; S.objOpen = false; S.objBusy = false; S.hear = null; objForm.hidden = true; S.lam = null; S.strike = null; S.jury = null; S.sitters.length = 0; S.fin = null; if (S.odoText === 'YOU: 1' && S.idleStage < 2) { S.odoText = ''; paintOdo(); }
        for (let i = 0; i < POOL; i++) if (pool[i].on && pool[i].last) pool[i].on = false;
        setMode('PLAY'); paintButtons();
      }
      function keepOnce() { const o = {}; ONCE_KEEP.forEach(function (k) { if (S.once[k]) o[k] = true; }); return o; }
      function persist() {
        api.save.set('s', { once: keepOnce(), night: S.night, owed: r5(Math.min(S.owed, 9999)), splinters: Math.round(n0(S.splinters) * 10) / 10, union: Math.round(n0(S.union)), total: Math.min(S.total, 1e9), endings: S.endings, goldenLast: !!S.goldenLast, metSockNight: !!S.sockDone, bv: !!S.bv });
      }
      /* ---------- counting ---------- */
      function touchInput() {
        S.lastInput = api.now(); S.quiet0 = S.lastInput; S.idle20 = false;
        if (S.mode === 'SLEEP' || S.idleStage > 0) wake();
      }
      function classify(target) {
        let best = target || null, bd = 1e9;
        if (!best) {
          for (let i = 0; i < POOL; i++) {
            const sh = pool[i];
            if (!sh.on || sh.counted || sh.last) continue;
            if (sh.u < sh.takeoffU - 700 || sh.u > sh.landU + 700) continue;
            const d = Math.abs(sh.u - sh.apexU); if (d < bd) { bd = d; best = sh; }
          }
        }
        if (!best) return { cls: 'none', sh: null };
        const delta = best.u - best.apexU;
        return { cls: Math.abs(delta) <= 120 ? 'clean' : delta < 0 ? 'early' : 'late', sh: best };
      }
      function doCount(src, target) {
        if (S.dead) return;
        touchInput();
        const now = api.now();
        S.ring.push(now); S.ring = S.ring.filter(function (t) { return now - t < 8000; });
        const n3 = S.ring.filter(function (t) { return now - t < 3000; }).length;
        if (S.river) S.riverLast = S.clock;
        if (S.breakUntil > S.clock) return;
        if (S.jamUntil > S.clock) { api.sfx('buzz'); if (S.ring.length >= 41) onBreakSign(); return; }
        if (S.ring.length >= 41) { onBreakSign(); return; }
        if (n3 >= 8 && n3 < 15 && now - S.softAt > 14000) { S.softAt = now; say('Management', ln('spamsoft'), { priority: 1, mood: 'smug' }); }
        if (n3 >= 15) { startJam(); return; }
        if (S.hidden) return;
        const pm = S.mode;
        if (pm === 'STRIKE') { strikeCount(); return; }
        if (pm === 'PLAY') { for (let bi = 0; bi < POOL; bi++) { const b = pool[bi]; if (b.on && b.breakFlag && b.holdLeft > 0 && !b.brkDone) { b.brkDone = true; S.breaksCounted++; api.stat.inc('sheep-counter.breaks-counted'); if (S.breaksCounted <= 2 || S.breaksCounted % 6 === 0) say('Management', L.breakCounted, { priority: 1, keep: S.breaksCounted === 1, mood: 'smug' }); break; } } }
        S.yourCount += 1; S.presses++; S.nonRecount++; S.total++; S.ring60.push(now);
        while (S.ring60.length > 400 || (S.ring60.length && now - S.ring60[0] > 60000)) S.ring60.shift();
        api.stat.inc('sheep-counter.counted');
        let cls = 'none', sh = null;
        if (pm === 'AUDIT' || pm === 'HEARING' || pm === 'JURY' || pm === 'FINALE') { cls = 'audit'; }
        else if (pm === 'LAMENT' && S.lam && !S.lam.done) { cls = 'lament'; }
        else { const c = classify(target); cls = c.cls; sh = c.sh; }
        let stamp = 'SPECULATIVE', skin = 'cor', award = 0.1, sfx = 'blip';
        if (cls === 'clean') { stamp = 'CLEAN COUNT'; skin = 'mint'; award = 0.2; sfx = 'stamp'; }
        else if (cls === 'early') { stamp = 'PREMATURE'; skin = 'mus'; sfx = 'tick'; }
        else if (cls === 'late') { stamp = 'RETROACTIVE'; skin = 'lil'; sfx = 'tick'; }
        else if (cls === 'audit' || cls === 'lament') { stamp = 'NOTED'; skin = 'mus'; sfx = 'tick'; }
        if (sh) {
          sh.counted = true; bubble(sh, pickOf(L.bubbles));
          if (sh.type === 'golden') { api.award(7.5, 'golden'); api.sfx('tada'); api.confetti(); api.stat.inc('sheep-counter.golden'); say('Management', L.rare[3], { priority: 1, mood: 'proud' }); award = 0; }
          else if (sh.type === 'sock') { api.award(1, 'sock'); api.stat.inc('sheep-counter.socks'); say('Management', L.cameos[5], { priority: 1 }); award = 0; }
          else if (sh.type === 'toast') { api.award(1, 'toast'); api.stat.inc('sheep-counter.toasts'); say('The Toaster', 'Toast, toast.', { priority: 1 }); later(2000, function () { say('Management', L.toast[2], { priority: 1, mood: 'proud' }); }); award = 0; }
          else if (sh.type === 'lunch') { api.stat.inc('sheep-counter.lunches'); say('Management', L.lunch[1], { priority: 1, mood: 'confused' }); }
          else if (sh.type === 'goat') say('Management', ln('goatcount'), { mood: 'confused' });
          else if (sh.type === 'back' && S.clock < (S.backUntil || 0) + 2000) { S.reversed = true; api.stat.inc('sheep-counter.backwards'); say('Management', L.rare[6], { priority: 1 }); api.award(0.01, 'interest'); }
          if (sh.type === 'brenda') bubble(sh, 'I am new');
        } else if (cls === 'none') bubbleAt(150 + api.randInt(0, 200), 190, 'baa');
        if (funOn() && cls !== 'audit' && cls !== 'lament' && award > 0) { stamp = cls === 'clean' ? 'CLEAN FUN' : 'FUN RECORDED'; skin = 'lil'; award += 0.3; S.fun.got++; api.stat.inc('sheep-counter.fun'); if (S.fun.got === 1) say('Management', L.fun[3], { priority: 1, mood: 'proud' }); }
        if (award) api.award(award, 'count');
        api.sfx(sfx); stampField(stamp, skin, 900);
        S.sleep = clamp(S.sleep + (cls === 'clean' ? 0.012 : 0.004), 0, 0.995);
        countBtn.classList.add(K + 'dn'); later(90, function () { countBtn.classList.remove(K + 'dn'); });
        if (cls === 'lament') lamentResolve('count');
        if (cls === 'clean' && !S.once.firstClean && S.night === 1) { S.once.firstClean = true; say('Management', L.firstClean, { priority: 1, mood: 'proud' }); }
        else if (S.presses % 4 === 0 && cls !== 'audit') {
          if (api.chance(0.6) && L[cls === 'clean' ? 'clean' : cls === 'early' ? 'early' : cls === 'late' ? 'late' : 'none']) { say('Management', ln(cls === 'clean' ? 'clean' : cls === 'early' ? 'early' : cls === 'late' ? 'late' : 'none', { count: S.crossed }), { mood: cls === 'clean' ? 'proud' : 'neutral' }); }
          else say('Management', ln('chatter'), { mood: 'smug' });
        }
        if (S.total % 20 === 0) persist();
        paintOdo(); paintStatus(); paintSleep();
      }
      function rateOk(tag, ms) { const n = api.now(), r = S.rl; if (n - (r[tag] === undefined ? -1e9 : r[tag]) < ms) return false; r[tag] = n; return true; }
      function doRecount() {
        if (S.dead) return; touchInput();
        if (S.hidden || S.breakUntil > S.clock || S.jamUntil > S.clock) return;
        S.yourCount -= 1; S.recounts++; S.total++; S.ring60.push(api.now()); if (S.ring60.length > 400) S.ring60.shift();
        api.stat.inc('sheep-counter.recounts'); api.sfx('sad'); stampField('RECOUNT', 'mus', 800);
        domeEl.style.transform = 'rotate(-40deg)'; later(300, function () { domeEl.style.transform = ''; });
        S.sleep = clamp(S.sleep - 0.003, 0, 0.995);
        if (rateOk('rec', 400)) api.award(0.05, 'recount');
        say('Management', S.yourCount < 0 && !S.once.below ? (S.once.below = true, L.below) : ln('recount'), { mood: 'confused' });
        paintOdo(); paintStatus(); paintSleep();
      }
      function doLamb() {
        if (S.dead || !S.intro.lamb) return; touchInput();
        if (S.mode === 'STRIKE' || S.hidden || S.breakUntil > S.clock || S.jamUntil > S.clock) return;
        S.yourCount += 0.5; S.nonRecount++; S.total++; S.ring60.push(api.now()); if (S.ring60.length > 400) S.ring60.shift();
        api.stat.inc('sheep-counter.lambs'); api.sfx('blip'); if (rateOk('lamb', 400)) api.award(0.1, 'lamb'); stampField('1/2', 'lil', 700);
        say('Management', ln('lamb'), { mood: 'proud' });
        paintOdo(); paintStatus();
      }
      function inFlight(sh, pad) { return sh.on && sh.u >= sh.takeoffU - pad && sh.u <= sh.landU + pad; }
      function doGoat() {
        if (S.dead || !S.intro.goat) return; touchInput();
        let best = null, bd = 1e9;
        for (let i = 0; i < POOL; i++) { const sh = pool[i]; if (inFlight(sh, 300) && !sh.last) { const d = Math.abs(sh.u - sh.apexU); if (d < bd) { bd = d; best = sh; } } }
        S.nonRecount++;
        if (!best) { bubbleAt(300, 150, 'not me'); api.sfx('blip'); return; }
        if (best.flagged) { bubbleAt(300, 150, 'already flagged'); api.sfx('blip'); return; }
        best.flagged = true;
        if (best.type === 'goat') {
          best.lab = 'NOT TODAY'; best.labUntil = S.clock + 3000; api.stat.inc('sheep-counter.goats-right'); if (rateOk('goat', 400)) api.award(0.2, 'goat'); api.sfx('ding');
          say('Management', ln('goatright'), { mood: 'proud' }); stampField('GOAT FLAGGED', 'mus', 800);
        } else {
          best.lab = 'TECHNICALLY A GOAT'; best.labUntil = S.clock + 3000; api.stat.inc('sheep-counter.goats-wrong'); api.sfx('sad');
          for (let i = 0; i < POOL; i++) if (pool[i].on && pool[i].type === 'goat') { pool[i].lab = 'TECHNICALLY A SHEEP'; pool[i].labUntil = S.clock + 3000; }
          say('Management', ln('goatwrong'), { mood: 'confused' });
        }
      }
      function doTag() {
        if (S.dead || !S.intro.tag) return; touchInput();
        let best = null, bd = 1e9;
        for (let i = 0; i < POOL; i++) { const sh = pool[i]; if (inFlight(sh, 0) && !sh.last) { const d = Math.abs(sh.u - sh.apexU) - (sh.type === 'brenda' ? 5000 : 0); if (d < bd) { bd = d; best = sh; } } }
        if (!best) { bubbleAt(300, 150, 'no comment'); api.sfx('blip'); return; }
        if (best.tagged) { bubbleAt(300, 150, 'already tagged'); api.sfx('blip'); return; }
        best.tagged = true;
        if (best.type === 'brenda') {
          api.stat.inc('sheep-counter.brenda-tags'); bubble(best, 'new'); api.sfx('ding'); best.lab = 'VERIFIED'; best.labUntil = S.clock + 2500;
          const n = api.stat.get('sheep-counter.brenda-tags');
          if (n === 1) say('Management', L.tagRight, { priority: 1, mood: 'proud' });
          if (n >= 3 && !S.bv) { S.bv = true; stampField('BRENDA VERIFIED', 'mint', 1500); say('Management', L.verified, { priority: 1, mood: 'proud' }); api.award(7.5, 'brenda'); api.confetti(); api.sfx('tada'); persist(); }
        } else {
          best.lab = 'Brenda (apparently)'; best.labUntil = S.clock + 3000; api.sfx('sad'); say('Management', ln('tagwrong'), { priority: 1, mood: 'confused' });
        }
      }
      /* ---------- spam ---------- */
      function startJam() {
        if (S.jamUntil > S.clock) return;
        S.jams++; S.jamUntil = S.clock + 3000; jamEl.textContent = JAMS[(S.jams - 1) % JAMS.length]; jamEl.hidden = false;
        later(3000, function () { jamEl.hidden = true; paintButtons(); }, 'jam');
        api.sfx('buzz'); api.award(-1, 'Excessive Enthusiasm Surcharge'); api.stat.inc('sheep-counter.spam-fees');
        S.secu = { x: -60, t: 0 };
        say('Management', L.spam[SPAM_ORDER[(S.jams - 1) % SPAM_ORDER.length]], { priority: 1, mood: 'panic' });
        if (S.jams >= 3) { S.river = true; S.riverLast = S.clock; stampField('1 RIVER', 'lil', 1500); say('Management', L.river, { priority: 1, mood: 'confused' }); api.achieve('sheep-counter.river'); S.odoText = '1 river'; paintOdo(); if (S.jams === 3) later(4000, function () { say('Management', L.instrument, { priority: 1 }); }, 'river'); }
        paintButtons();
      }
      function onBreakSign() {
        if (S.breakUntil > S.clock) return;
        S.breakUntil = S.clock + 7500; api.sfx('sad'); S.ring.length = 0; api.stat.inc('sheep-counter.break-signs');
        say('Management', ln('breaksign'), { priority: 1, mood: 'smug' });
        later(7500, function () { paintButtons(); }, 'brk');
        paintButtons();
      }
      /* ---------- secondary interactions ---------- */
      function nextSign() {
        const t = ln(funOn() ? 'funsigns' : 'signs'); S.signN++;
        signNo.textContent = 'RULE ' + S.signN + ':'; signTxt.textContent = S.loud ? t.toUpperCase() : t;
        S.signAt = S.clock + (S.loud ? 10000 : 20000);
      }
      function pokeSleep() {
        const n = api.now(); if (n - S.sleepPoke < 600) return; S.sleepPoke = n;
        S.sleep = clamp(S.sleep - 0.01, 0, 0.995); paintSleep();
        if (api.chance(0.35)) say('Management', S.pokeSaid++ === 0 ? L.sleep[2] : ln('pokesleep'), { priority: 0, mood: 'smug' });
      }
      function onPet() {
        if (rateOk('pet', 400)) api.award(0.1, 'pet'); api.sfx('pop'); bubbleAt(300, 80, 'hello'); api.stat.inc('sheep-counter.pets');
        say('Management', S.petNamed ? 'Variance (E-7 1/2) has been clicked. It is thriving, in a way the numbers do not recognise.' : ln('pet'), { mood: 'smug' });
      }
      function rule(which) {
        if (!S.motion) return;
        S.motion = null; motEl.hidden = true; api.award(0.2, 'motion'); api.stat.inc('sheep-counter.motions'); S.splinters = Math.round((S.splinters + 0.3) * 10) / 10;
        api.sfx(which === 'S' ? 'ding' : 'bloop'); say('Management', ln(which === 'S' ? 'sustained' : 'overruled'), { priority: 1, mood: 'smug' }); S.blink = S.clock + 500; S.fenceAct = { k: which, until: S.clock + 800 }; paintStatus();
      }
      function settle() {
        S.settleN++; api.sfx('stamp'); S.splinters = Math.round((S.splinters + 0.1) * 10) / 10;
        say('Management', S.settleN % 4 === 0 ? L.settleN.replace('{count}', String(S.settleN)) : ln('settle'), { priority: 1, mood: 'smug' });
        paintStatus();
      }
      function nudge(d) {
        S.nudge = clamp(S.nudge + d, -40, 40); S.nudgeN++;
        if (S.nudgeN === 15) say('Management', L.misc[1], { priority: 1, mood: 'smug' });
        if (S.nudgeN % 10 === 0) { for (let i = 0; i < POOL; i++) if (pool[i].on) { bubble(pool[i], 'thanks for the nudge'); break; } }
      }
      function baaFeed(k) {
        const n = api.now();
        if (n - S.baaAt > 1500) S.baaBuf = '';
        S.baaAt = n; S.baaBuf = (S.baaBuf + k).slice(-3);
        if (S.baaBuf === 'baa') { S.baaBuf = ''; baa(); }
      }
      function baa() {
        api.award(1, 'baa'); api.stat.inc('sheep-counter.baa'); api.achieve('sheep-counter.fluent'); api.sfx('honk');
        const words = ['baa', 'baaa', 'baaaa'];
        words.forEach(function (w, i) {
          later(i * 700, function () {
            let any = false;
            for (let j = 0; j < POOL; j++) if (pool[j].on && pool[j].px > 0 && pool[j].px < 640) { bubble(pool[j], w); any = true; }
            if (!any) bubbleAt(S.shift + FX + S.nudge, 200, w);
          });
        });
      }
      function fenceClick() {
        const n = api.now();
        if (S.gate && S.fenceSpeaks >= 3 && !S.gateThanked) { S.gateThanked = true; say('Fence', L.fence[4], { priority: 1, keep: true }); return; }
        let air = false; for (let i = 0; i < POOL; i++) if (pool[i].on && pool[i].u > pool[i].takeoffU && pool[i].u < pool[i].landU) air = true;
        if (air) return;
        if (n - S.fenceClickAt > 3000) S.fenceClicks = 0;
        S.fenceClickAt = n;
        S.fenceClicks++; api.sfx('tick'); S.blink = S.clock + 300;
        if (S.fenceClicks >= 7) {
          S.fenceClicks = 0; S.fenceSpeaks++;
          if (S.fenceSpeaks === 1) { say('Fence', L.fence[0], { priority: 2, mood: 'neutral' }); bubbleAt(S.shift + FX, 215, 'a gate...'); later(2500, function () { say('Management', L.fence[1], { priority: 1, keep: true }); }); }
          else if (S.fenceSpeaks === 2) { say('Fence', L.fence[0], { priority: 2 }); later(2500, function () { say('Management', L.fence[2], { priority: 1, keep: true }); }); }
          else if (S.fenceSpeaks === 3) { S.gate = true; say('Management', L.fence[3], { priority: 2, mood: 'proud' }); api.achieve('sheep-counter.gate'); api.stat.inc('sheep-counter.gates'); api.sfx('ding'); }
        }
      }
      function moonTap() {
        S.moon = (S.moon + 1) % 3; S.moonTaps++; api.sfx('pop'); bubbleAt(540, 110, ['mm', 'yawn', 'hm'][S.moon]);
        if (S.moonTaps === 14) { say('Management', L.misc[3], { priority: 1, mood: 'smug' }); stampField('NOTARY', 'mus', 1400); }
        else if (S.moonTaps === 5 || S.moonTaps === 9 || S.moonTaps === 25) say('Management', L.moon[S.moonTaps === 5 ? 0 : S.moonTaps === 9 ? 1 : 2], { priority: 1, mood: 'confused' });
      }
      let pend = null;
      function onPointer(ev) {
        if (S.dead) return;
        if (ev.isPrimary === false) return;
        if (ev.button !== undefined && ev.button > 0) return;
        if (ev.pointerType === 'touch') { touchInput(); pend = { x: ev.clientX, y: ev.clientY, id: ev.pointerId }; return; }
        canvasAt(ev.clientX, ev.clientY);
      }
      function onPointerUp(ev) { const p = pend; pend = null; if (!p || S.dead || ev.pointerId !== p.id) return; if (Math.hypot(ev.clientX - p.x, ev.clientY - p.y) < 8) canvasAt(p.x, p.y); }
      function canvasAt(cx, cy) {
        const r = cv.getBoundingClientRect(); if (!r || r.width <= 0) return;
        const x = (cx - r.left) * 640 / r.width, y = (cy - r.top) * 400 / r.height;
        touchInput();
        let hit = null, bd = 1e9;
        for (let i = 0; i < POOL; i++) { const sh = pool[i]; if (!sh.on || sh.last) continue; const d = Math.hypot(sh.px - x, sh.py - 26 * sh.scale - y); if (d < 36 && d < bd) { bd = d; hit = sh; } }
        if (hit && !hit.counted) { doCount('canvas', hit); return; }
        if (S.mode === 'STRIKE') { for (let i = 0; i < S.sitters.length; i++) { const s = S.sitters[i]; if (!s.counted && Math.hypot(s.x - x, s.y - 20 - y) < 40) { strikeCount(s); return; } } }
        if (S.mode === 'LAMENT' && S.lam && S.lam.sh && Math.hypot(S.lam.sh.px - x, S.lam.sh.py - 14 - y) < 40) { doCount('canvas'); return; }
        if (S.eclipse && Math.hypot(540 - x, 70 - y) < 42) { clockTap(); return; }
        if (S.snail && Math.hypot(S.snail.x - x, 382 - y) < 34) { snailTap(); return; }
        if (Math.hypot(540 - x, 70 - y) < 40) { moonTap(); return; }
        const fx = FX + S.shift + S.nudge;
        if (x > fx - 80 && x < fx + 80 && y > 215 && y < 305) fenceClick();
      }
      /* ---------- keyboard ---------- */
      function onKey(ev) {
        if (S.dead || ev.repeat || ev.ctrlKey || ev.metaKey || ev.altKey) return;
        const tg = ev.target, tn = tg && tg.tagName ? String(tg.tagName).toLowerCase() : '';
        if (tn === 'input' || tn === 'textarea' || tn === 'select' || (tg && tg.isContentEditable)) return;
        const k = ev.key; if (!k) return;
        touchInput();
        const lk = k.length === 1 ? k.toLowerCase() : k;
        if (lk === 'b' || lk === 'a') baaFeed(lk); else S.baaBuf = '';
        if (lk.length === 1 && lk >= 'a' && lk <= 'z') typedFeed(lk);
        if (S.typed.length >= 2 && S.typed === 'tuesday'.slice(0, S.typed.length)) { ev.preventDefault(); return; }
        let handled = true;
        switch (lk) {
          case 'c': doCount('key'); break;
          case 'm': if (S.eclipse) clockTap(); else moonTap(); break;
          case 'w': fenceClick(); break;
          case 'n': snailTap(); break;
          case 'g': doGoat(); break;
          case 'l': doLamb(); break;
          case 'r': case 'Backspace': doRecount(); break;
          case 't': doTag(); break;
          case 'f': tryObject('key'); break;
          case 's': rule('S'); break;
          case 'o': rule('O'); break;
          case 'ArrowLeft': nudge(-1); break;
          case 'ArrowRight': nudge(1); break;
          case ' ': case 'Spacebar': case 'Enter':
            if (tn === 'button' || tn === 'a' || tn === 'summary') { handled = false; break; }
            doCount('key'); break;
          default: handled = false;
        }
        if (handled) ev.preventDefault();
      }
      /* ---------- the clock-driven beats: memos every ~20 s, the 3:00 photo, the 10:00 plaque, and the word that must not be said ---------- */
      function typedFeed(k) {
        const n = api.now(); if (n - S.typedAt > 2000) S.typed = '';
        S.typedAt = n; S.typed = (S.typed + k).slice(-7);
        if (S.typed === 'tuesday') { S.typed = ''; tuesday(); }
      }
      function tuesday() {
        S.tueN++; api.stat.inc('sheep-counter.tuesdays');
        if (S.tueN > 1) { say('Management', ln('tuesday2'), { priority: 2, mood: 'panic' }); return; }
        api.achieve('sheep-counter.tuesday'); api.sfx('whoosh'); api.award(2, 'tuesday');
        say('Management', L.tue[0], { priority: 2, mood: 'panic' });
        later(3000, function () { S.dawnT = 0.85; say('Management', L.tue[1], { priority: 1, mood: 'confused' }); });
        later(8000, function () { S.dawnT = S.once.b9 ? 1 : 0; say('Management', L.tue[2], { priority: 1, mood: 'smug' }); if (api.flag.get('fax-machine.tuesdayMoved')) later(3500, function () { say('Management', L.tue[3], { priority: 1 }); }); });
        if (S.mode === 'PLAY' && !S.auditing) printSlip([{ t: 'INCIDENT REPORT No. 7 1/2', c: 'h' }, { t: 'THE WORD WAS SAID.' }, { t: 'NOTHING HAPPENED.' }, { t: 'THIS IS BEING TREATED AS THE WORST THING THAT HAS HAPPENED.', c: 'v' }], { t: 'NOTED', k: 'cor' });
      }
      function companyPhoto() {
        S.once.photo = true; api.sfx('pop');
        say('Management', L.photo[0], { priority: 2, mood: 'proud' });
        later(1800, function () {
          S.flash = 1; api.sfx('stamp'); let on = 0;
          for (let i = 0; i < POOL; i++) if (pool[i].on) { on++; bubble(pool[i], 'sheeese'); }
          if (S.mode === 'PLAY' && !S.auditing) printSlip([{ t: 'COMPANY PHOTO No. 1 (of 1)', c: 'h' }, { t: 'PRESENT: ' + on + ' sheep, 1 fence' }, { t: 'BLINKING: sheep ' + (1 + S.crossed % 9) }, { t: 'SMILING: the fence (professionally)' },
            { t: 'NOT IN PHOTO: you. You took it, so technically you are the camera.' }, { t: 'RETAKES: none. The sheep blinked. This is the photo.' }], { t: 'FRAMED', k: 'mint' });
          api.award(1, 'photo'); api.stat.inc('sheep-counter.photos');
        });
        later(5200, function () { say('Management', L.photo[1], { priority: 1, mood: 'smug' }); });
      }
      function plaquePresented() {
        S.once.plaque = true; S.hat = true; S.plaqueOn = true;
        say('Management', L.plaque[0], { priority: 2, mood: 'proud' }); api.sfx('fanfare'); api.confetti(undefined, undefined, 50);
        api.achieve('sheep-counter.plaque'); api.award(2.5, 'plaque'); api.stat.inc('sheep-counter.plaques');
        if (!S.auditing) printSlip([{ t: 'EMPLOYEE OF THE MONTH', c: 'h' }, { t: '(of a month that has not started)' }, { t: 'PRESENTED: 10:00, in a cupboard, by Management' }, { t: 'PLAQUE READS: VALUED' }, { t: 'It was meant to be longer. The engraver sneezed.', c: 'tiny' }], { t: 'GOLD SEAL', k: 'mus' });
        later(6500, function () { say('Management', L.plaque[1], { priority: 1, mood: 'proud' }); });
        later(12500, function () { say('Management', L.plaque[2], { priority: 1 }); });
      }
      function timeBeats() {
        if (S.fin) return;
        if (!S.once.plaque && S.meadowMs >= PLAQUE_AT && !S.auditing) { plaquePresented(); return; }
        if (S.crossed >= 99) return;
        if (!S.once.photo && S.playMs >= PHOTO_AT && !S.auditing) companyPhoto();
        else if (!S.once.hint && S.playMs >= (api.selftest ? 14000 : 60000) && S.moonTaps === 0 && S.fenceSpeaks === 0 && S.fenceClicks === 0 && S.night === 1 && api.now() >= sayFreeAt && !sayQ.length) { S.once.hint = true; say('Management', L.hint, { priority: 1, mood: 'smug' }); }
        else if (S.clock >= S.memoAt) {
          if (api.now() < sayFreeAt + 3000 || sayQ.length) { S.memoAt = S.clock + 2500; return; }
          S.memoAt = S.clock + 17000 + api.rand() * 8000;
          say('Management', ln(S.beat <= 3 ? 'memo1' : S.beat <= 6 ? 'memo2' : 'memo3'), { priority: 1, mood: S.beat >= 8 ? 'proud' : 'neutral' });
        }
      }
      /* ---------- special modes ---------- */
      function startDennis() {
        S.once.dennis = true; S.leaf = { x: -20, t: 0 }; S.dennisArmed = true; say('Management', api.flag.get('metDennis') ? L.dennisKnown : L.cameos[0], { priority: 1, keep: true, mood: 'smug' }); later(5000, function () { say('Management', L.cameos[2], { priority: 1 }); });
      }
      function startStrike() {
        S.once.strike = true; if (S.night >= 2) S.once.strike2 = true; setMode('STRIKE', 22000); S.strike = { t: 0, tick: 0, counted: 0, built: false };
        say('Management', S.night >= 2 ? L.strike2[0] : L.strike[0], { priority: 2, mood: 'panic' }); api.sfx('whoosh');
      }
      function strikeStep(dt) {
        const T = S.strike; if (!T) return;
        T.t += dt;
        let air = false; for (let i = 0; i < POOL; i++) if (pool[i].on) air = true;
        if (!T.built && !air) {
          T.built = true; for (let i = 0; i < 5; i++) S.sitters.push({ x: 90 + i * 115, y: 322 + (i % 2) * 18, dir: i % 2 ? -1 : 1, type: 'sheep', sit: true, counted: false, scale: 0.95 });
          if (S.night < 2) later(2500, function () { say('Management', L.strike[1], { priority: 1 }); }, 'mode');
        }
        if (T.built) { T.tick += dt; if (T.tick >= 1300) { T.tick = 0; S.seenExtra++; paintStatus(); } }
        if (T.counted >= 5 || T.t >= 22000) endStrike();
      }
      function strikeCount(s) {
        const T = S.strike; if (!T || !T.built) { bubbleAt(300, 150, 'not yet'); return; }
        let t = s; if (!t) for (let i = 0; i < S.sitters.length; i++) if (!S.sitters[i].counted) { t = S.sitters[i]; break; }
        if (!t) return;
        t.counted = true; T.counted++; S.yourCount += 1; S.presses++; S.nonRecount++; S.total++; S.ring60.push(api.now()); if (S.ring60.length > 400) S.ring60.shift();
        api.stat.inc('sheep-counter.counted'); api.award(0.1, 'count'); api.sfx('tick'); api.stat.inc('sheep-counter.sat-counted'); stampField('SITTING COUNT', 'mus', 800);
        if (T.counted === 1) say('Management', S.night >= 2 ? L.strike2[2] : L.strike[2], { priority: 1, mood: 'confused' });
        else if (T.counted === 3 && S.night < 2) say('Management', L.strike[5], { priority: 1 });
        else if (T.counted === 5 && S.night < 2) say('Management', L.strike[6], { priority: 1, mood: 'smug' });
        paintOdo(); paintStatus();
      }
      function endStrike() {
        S.strike = null; S.sitters.length = 0;
        if (S.night >= 2) { setMode('PLAY'); S.workRule = true; S.stiffLeft = 6; say('Management', L.strike2[1], { priority: 1, mood: 'smug' }); return; }
        say('Management', L.strike[3], { priority: 1, mood: 'smug' });
        setMode('JURY', 8000); S.jury = { t: 0, n: 0 };
        later(4000, function () { say('Management', L.verdict, { priority: 1, mood: 'smug' }); }, 'mode');
        later(5500, function () { say('Management', L.technically, { priority: 1 }); stampField('TECHNICALLY COUNTING', 'lil', 1800); }, 'mode');
        later(7000, function () { say('Management', L.juror, { priority: 1 }); }, 'mode');
        later(8000, function () { S.jury = null; setMode('PLAY'); S.workRule = true; S.stiffLeft = 10; say('Management', L.strike[4], { priority: 1 }); later(3500, function () { say('Management', L.jury[1].replace(/\{count\}/g, String(S.presses)), { priority: 1, mood: 'smug' }); }); }, 'mode');
      }
      function juryStep(dt) {
        const J = S.jury; if (!J) return;
        J.t += dt; const n = Math.min(12, Math.floor(J.t / 450));
        if (n > J.n) { J.n = n; api.sfx('honk'); S.baaBub = n; bubbleAt(100 + (n - 1) * 36, 345, 'baa'); }
      }
      function startLament() {
        S.once.lament = true; setMode('LAMENT', 14000); S.dawnT = 1;
        const sh = spawn('lamb', { last: true, xs: 60, A: 700 }); if (sh) { sh.u = 0; sh.frozen = true; }
        S.lam = { sh: sh, t: 0, done: false };
        say('Management', L.lament[0], { priority: 2, mood: 'proud' });
        later(3500, function () { say('Management', L.lament[1], { priority: 1 }); }, 'mode');
        later(7000, function () { say('Management', L.lament[2], { priority: 1 }); }, 'mode');
        later(10000, function () { lamentResolve('wait'); }, 'mode');
      }
      function lamentResolve(kind) {
        const m = S.lam; if (!m || m.done) return; m.done = true;
        if (m.sh) m.sh.frozen = false;
        say('Management', kind === 'wait' ? L.lament[4] : kind === 'hope' ? L.lament[7] : L.lament[5], { priority: 2, mood: 'proud' });
        api.sfx('pop');
      }
      function lamentLanded(sh) {
        if (!S.lam) return;
        api.award(2, 'last lamb'); api.confetti(undefined, undefined, 40); api.sfx('tada'); api.stat.inc('sheep-counter.last-lamb');
        printSlip([{ t: L.lament[6], c: 'v' }, { t: 'HOPE: logged' }], { t: 'NOTED', k: 'mint' });
        later(1800, function () { say('Management', L.lament[3], { priority: 1, mood: 'smug' }); say('Management', L.mentor, { priority: 1 }); });
        S.lam = null; S.holding = false; hopeEl.style.width = '0'; setMode('PLAY'); S.spawnIn = 2500;
      }
      function startFinale() {
        S.fin = { stage: 0, t: 0, signs: false, walk: 0, dave: 0, rib: 0, line: 0, roll: false };
        const short = S.night >= 3;
        setMode('FINALE', 30000);
        showBanner(L.finale[0], 6000); api.sfx('bell'); say('Management', L.finale[1], { priority: 2, mood: 'proud' });
        later(2000, function () { if (S.fin) S.fin.signs = true; api.sfx('pop'); }, 'mode');
        later(3600, function () { if (!S.fin || S.odoText) return; S.odoText = 'YOU: 1'; paintOdo(); api.sfx('tick'); bubbleAt(128, 300, 'you: 1'); say('Management', L.youOne, { priority: 1, mood: 'smug', fin: true }); }, 'mode');
        if (short) later(2800, function () { say('Management', L.finale[8], { priority: 1, fin: true }); }, 'mode');
        if (!short) {
          later(5000, function () { if (S.fin) S.fin.stage = 1; say('Management', L.finale[2], { priority: 2, mood: 'proud' }); api.sfx('fanfare'); api.confetti(); later(2500, function () { say('Management', L.finale[3], { priority: 1, fin: true }); }, 'mode'); }, 'mode');
          later(7500, function () { if (S.fin) S.fin.stage = 3; paintInvoice(); }, 'mode');
          later(8500, function () { if (S.fin) S.fin.stage = 3; printSlip([{ t: 'Services rendered: a fence' }, { t: L.finale[4] }], null); }, 'mode');
        }
        later(short ? 5000 : 9000, function () {
          const ls = [{ t: 'CERTIFICATE OF ACCURACY', c: 'h' }];
          if (api.flag.get('metGerald')) ls.push({ t: 'Gerald: ' + L.cameos[8] });
          ls.push({ t: L.finale[5] }, { t: 'Fence · Fence, Esq. · The Stapler · Brenda' }, { t: L.finale[11], c: 'tiny' });
          printSlip(ls, { t: 'GOLD SEAL', k: 'mus' });
          say('Management', L.finale[6], { priority: 2, mood: 'proud' }); if (api.flag.get('metGerald')) later(3500, function () { say('Management', L.cameos[9], { priority: 1, fin: true }); }, 'mode');
          api.achieve('sheep-counter.hundred'); api.award(25, 'ending'); api.confetti(undefined, undefined, 60); S.endings++; api.stat.inc('sheep-counter.endings'); persist();
        }, 'mode');
        later(short ? 11000 : 15000, function () {
          if (S.fin) S.fin.roll = true; api.sfx('tick'); later(400, function () { api.sfx('tick'); }, 'mode'); later(800, function () { api.sfx('tick'); }, 'mode');
          S.yourCount = 0; if (S.odoText === 'YOU: 1') S.odoText = ''; paintOdo(); say('Management', L.finale[7].replace('Night 2', 'Night ' + (S.night + 1)), { priority: 2, mood: 'smug' });
        }, 'mode');
        if (!short) later(20000, function () { if (S.fin) { S.fin.dave = 1; S.fin.walk = 0; S.fin.rib = 1; } later(1500, function () { if (S.fin) S.fin.rib = 2; api.sfx('pop'); }, 'mode'); say('Management', L.finale[10], { priority: 2, mood: 'smug' }); }, 'mode');
        later(short ? 14000 : 24000, function () { nextNight(); }, 'mode');
      }
      function nextNight() {
        S.night++; S.endings = Math.max(S.endings, 1); persist();
        S.crossed = 21; S.spawned = 21; S.yourCount = 0; S.pdBase = 0; S.W = 0; S.loud = true; S.beat = beatOf(21); S.nextAudit = 21 + interval(S.beat);
        S.once = Object.assign(keepOnce(), { b3: true, b4: true, goat: true, lamb: true, brenda: true }); if (S.odoText === 'YOU: 1') S.odoText = ''; S.intro = { goat: true, lamb: true, tag: true, obj: true };
        S.sockDone = false; S.sockAt = api.randInt(50, 70); S.fin = null; S.fenceRot = 0; S.dawn = 0; S.dawnT = 0; S.sleepPin = ''; S.stiffLeft = 0; S.workRule = false; S.seenExtra = 0; S.invRows = 4;
        S.queue.push({ t: 'brenda', dir: -1, disg: 1, tag2: true }); S.bubbles.length = 0;
        signEl.hidden = false; nextSign(); odo2.hidden = true; S.petNamed = S.pet >= 3;
        printSlip([{ t: 'VARIANCE: reconciled with itself, pending', c: 'v' }, { t: L.finale[9], c: 'tiny' }].concat(S.petNamed ? [{ t: 'Variance (pet): Employee ID E-7 1/2', c: 'tiny' }] : []), null);
        setMode('PLAY'); S.spawnIn = 2000;
        for (let i = 0; i < 6; i++) { const idx = i; later(idx * 12000, function () { say('Management', L.night[idx].replace(/\{count\}/g, String(S.night)).replace('{player}', function () { return api.player.name; }), { priority: 1, mood: 'smug' }); }); }
        paintOdo(); paintStatus(); paintButtons(); paintInvoice();
      }
      /* ---------- season 2: Mandatory Fun Hour (62-69), the Wrong Clock (rare), a marathon snail (50), the Held Count (secret), a sock that naps (idle) ---------- */
      const HOLD = api.selftest ? [500, 900, 1300] : [3000, 5500, 7500];
      function slipSoon(ls, st, n) { if ((S.auditing || S.type || S.mode === 'HEARING') && (n || 0) < 10) { later(1500, function () { slipSoon(ls, st, (n || 0) + 1); }, 's2'); return; } printSlip(ls, st); }
      function funOn() { return !!(S.fun && !S.fun.over); }
      function startFun() {
        S.once.fun = true; S.fun = { seen: 0, got: 0, over: false }; S.funN++; showBanner('MANDATORY FUN', 4200); bannerEl.className = K + 'banner'; api.sfx('fanfare'); if (!signEl.hidden) S.signAt = S.clock;
        say('Management', S.funN > 1 ? L.fun[1] : L.fun[0], { priority: 2, mood: 'proud' }); later(4500, function () { say('Management', L.fun[2], { priority: 1, mood: 'smug' }); }, 's2'); later(60000, endFun, 's2');
      }
      function endFun() {
        const F = S.fun; if (!F || F.over) return; F.over = true; api.stat.inc('sheep-counter.fun-hours'); if (!signEl.hidden) S.signAt = S.clock; paintStatus();
        say('Management', F.got ? L.fun[4] : L.fun[6], { priority: 1, mood: F.got ? 'proud' : 'confused' }); api.award(F.got ? 1.5 : 0.5, 'fun'); if (F.got) api.sfx('tada');
        slipSoon([{ t: 'FUN SATISFACTION SURVEY', c: 'h' }, { t: 'ATTENDANCE: ' + F.got + ' presses of fun, ' + F.seen + ' sheep in hats' }, { t: 'ENJOYMENT: 7 1/2 (self-reported by the fun)' }, { t: ln('funsurvey') }, { t: ln('funsurvey') }], F.got ? { t: 'FUN LOGGED', k: 'lil' } : { t: 'FUN DECLINED', k: 'mus' });
        later(4500, function () { say('Management', L.fun[5], { priority: 1 }); }, 's2');
        if (api.flag.get('metToaster') || api.flag.get('toasterMet')) later(9000, function () { say('Management', L.fun[9], { priority: 1, mood: 'proud' }); }, 's2');
        if (api.flag.get('metGerald')) later(14000, function () { say('Management', L.fun[10], { priority: 1 }); }, 's2');
      }
      function s2Apex(sh, c) {
        if (c >= 62 && c < 68 && !S.once.fun && S.mode === 'PLAY') startFun();
        const F = S.fun;
        if (F && !F.over) { F.seen++; if (F.seen === 3) say('Management', L.fun[7], { priority: 1 }); else if (F.seen === 5) say('The Stapler', L.fun[8], { priority: 1 }); if (F.seen >= 7 || c >= 69) endFun(); }
        if (!S.once.snail && c >= S.snailAt && c < S.snailAt + 6 && S.mode === 'PLAY') startSnail();
      }
      function s2Spawn(k) {
        if (!S.once.clock && S.beat >= 3 && S.mode === 'PLAY' && !S.eclipse && !funOn() && ((S.clockAt && k >= S.clockAt) || api.chance(1 / 90))) { S.clockAt = 0; startClock(); }
      }
      function startClock() {
        S.once.clock = true; S.eclipse = { taps: 0 }; api.sfx('bell'); api.stat.inc('sheep-counter.eclipses'); say('Management', L.eclipse[0], { priority: 1, keep: true, mood: 'confused' });
        later(5500, function () { if (S.eclipse) say('Management', L.eclipse[5], { priority: 1 }); }, 's2');
        later(12000, function () { S.eclipse = null; say('Management', L.eclipse[4], { priority: 1, mood: 'smug' }); }, 's2');
      }
      function clockTap() {
        const E = S.eclipse; E.taps++; api.sfx('tick'); api.stat.inc('sheep-counter.clock-taps'); bubbleAt(540, 118, ['also 9:15', 'confidently', 'always', '4:17'][E.taps % 4]);
        if (E.taps === 1) { say('Management', L.eclipse[2], { priority: 1, mood: 'smug' }); api.award(0.5, 'a wrong time'); }
        if (E.taps === 3) { say('Management', L.eclipse[3], { priority: 1, mood: 'proud' }); api.achieve('sheep-counter.clock'); stampField('4:17 (APPROX.)', 'lil', 1400); api.award(1, 'right, once'); }
      }
      function startSnail() {
        S.once.snail = true; S.snail = { x: -30, tapped: false }; say('Management', L.snail[0], { priority: 1, mood: 'confused' });
        if (api.flag.get('snail-marathon.crossed')) later(5000, function () { say('Management', L.snail[1], { priority: 1, mood: 'proud' }); }, 's2');
      }
      function snailTap() {
        const s = S.snail; if (!s || s.tapped) return; s.tapped = true; api.award(1, 'a snail'); api.stat.inc('sheep-counter.snails'); api.sfx('ding'); bubbleAt(s.x, 352, 'marathon'); say('Management', L.snail[2], { priority: 1, mood: 'proud' });
      }
      function s2Sky(ts) {
        if (funOn()) { const cols = ['#e0594a', '#e5b83b', '#55c58a', '#a78bfa']; g.strokeStyle = '#1d1a2e'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 8); for (let x = 0; x <= 640; x += 40) g.lineTo(x, 8 + Math.sin(x / 640 * 3.1416) * 26); g.stroke(); for (let i = 0; i < 16; i++) { const x = 20 + i * 40, y = 8 + Math.sin(x / 640 * 3.1416) * 26; g.fillStyle = cols[i % 4]; g.beginPath(); g.moveTo(x - 9, y); g.lineTo(x + 9, y); g.lineTo(x, y + 18 + (S.reduced ? 0 : Math.sin(ts / 300 + i) * 2)); g.closePath(); g.fill(); g.stroke(); } }
        if (!S.eclipse) return;
        g.fillStyle = 'rgba(70,20,90,.2)'; g.fillRect(0, 0, 640, 300); g.fillStyle = '#fff8e6'; g.strokeStyle = '#1d1a2e'; g.lineWidth = 4; g.beginPath(); g.arc(540, 70, 33, 0, 6.283); g.fill(); g.stroke(); g.lineWidth = 2;
        for (let i = 0; i < 12; i++) { const a = i * 0.5236; g.beginPath(); g.moveTo(540 + Math.cos(a) * 27, 70 + Math.sin(a) * 27); g.lineTo(540 + Math.cos(a) * 31, 70 + Math.sin(a) * 31); g.stroke(); }
        const ha = 4.28 / 12 * 6.2832 - 1.5708, ma = 17 / 60 * 6.2832 - 1.5708, sa = S.reduced ? 0 : -ts / 330;
        g.lineWidth = 3; g.beginPath(); g.moveTo(540, 70); g.lineTo(540 + Math.cos(ha) * 15, 70 + Math.sin(ha) * 15); g.moveTo(540, 70); g.lineTo(540 + Math.cos(ma) * 24, 70 + Math.sin(ma) * 24); g.stroke();
        g.lineWidth = 1.5; g.strokeStyle = '#c4352a'; g.beginPath(); g.moveTo(540, 70); g.lineTo(540 + Math.cos(sa) * 28, 70 + Math.sin(sa) * 28); g.stroke();
      }
      function s2Over(ts, dt) {
        const s = S.snail;
        if (s) { s.x += dt * 0.026; g.font = '24px system-ui,sans-serif'; g.textAlign = 'center'; g.fillStyle = '#fff'; g.fillText('🐌', s.x, 392); if (s.x > 690) { S.snail = null; say('Management', L.snail[s.tapped ? 4 : 3], { priority: 1, mood: 'smug' }); } }
        if (S.sockSleep && S.idleStage >= 1) { g.font = '24px system-ui,sans-serif'; g.textAlign = 'center'; g.fillStyle = '#fff'; g.fillText('🧦', 592, 366); g.font = 'bold 14px system-ui,sans-serif'; g.fillText('z', 608, 342 - (ts / 45) % 22); }
      }
      function s2Update() {
        if (!S.heldAt || S.hidden || S.mode !== 'PLAY') return;
        const h = api.now() - S.heldAt;
        if (S.heldStage < 1 && h >= HOLD[0]) { S.heldStage = 1; say('Management', L.hold[0], { priority: 1, mood: 'confused' }); }
        if (S.heldStage < 2 && h >= HOLD[1]) { S.heldStage = 2; say('Management', L.hold[1], { priority: 1, mood: 'smug' }); }
        if (S.heldStage < 3 && h >= HOLD[2]) { S.heldStage = 3; S.heldDone = true; api.achieve('sheep-counter.held'); api.stat.inc('sheep-counter.held'); api.award(2, 'a held count'); api.sfx('tada'); api.confetti(); stampField('HELD', 'mint', 1400); say('Management', L.hold[2], { priority: 2, mood: 'proud' }); }
      }
      /* ---------- idle / wake ---------- */
      function idleStep() {
        if (S.hidden) { S.lastInput = api.now() - S.idleHold; return; }
        if (S.mode === 'FINALE' || S.mode === 'HEARING') { S.lastInput = api.now(); return; }
        S.idleHold = api.now() - S.lastInput;
        const idle = api.now() - S.lastInput;
        if (idle >= IDLE[5] && !S.idle20 && S.idleStage === 0 && S.mode === 'PLAY') { S.idle20 = true; say('Management', ln('idleearly'), { priority: 1, mood: 'confused' }); }
        if (idle >= IDLE[0] && S.idleStage < 1 && S.mode === 'PLAY') {
          S.idleStage = 1; setMode('SLEEP'); S.sleepers = []; S.moon = 1;
          say('Management', L.idle[0], { priority: 1, mood: 'smug' }); later(4000, function () { say('Management', L.idle[1], { priority: 1 }); }, 'idle'); later(9000, function () { say('Management', L.idle[4], { priority: 1 }); }, 'idle');
          later(1500, function () { for (let i = S.sleepers.length; i < 4; i++) S.sleepers.push({ x: 80 + i * 90, y: 350, dir: 1, type: 'sheep', lie: true, scale: 1, a: 0 }); }, 'idle');
        }
        if (idle >= IDLE[1] && S.idleStage < 2 && S.idleStage >= 1) {
          S.idleStage = 2; S.odoText = 'YOU: 1'; paintOdo(); api.achieve('sheep-counter.counted'); api.stat.inc('sheep-counter.counted-by-sheep');
          say('Management', L.idle[2], { priority: 1, mood: 'smug' }); later(4500, function () { say('Management', L.idle[3], { priority: 1 }); }, 'idle'); later(9000, function () { say('Management', L.idle[5], { priority: 1, mood: 'proud' }); }, 'idle');
          printSlip([{ t: 'Valued Employees present: 1. Variance: 0.' }], { t: 'NOTED', k: 'mint' });
          if (S.sleepers.length) { S.sleepers[0].lie = false; S.sleepers[0].stand = true; bubbleAt(S.sleepers[0].x, S.sleepers[0].y - 40, 'you: 1'); }
        }
        if (idle >= IDLE[6] && S.idleStage >= 1 && !S.sockSleep) { S.sockSleep = true; api.stat.inc('sheep-counter.sock-naps'); say('Management', L.idle2[0], { priority: 1, mood: 'smug' }); }
        if (idle >= IDLE[2] && S.idleStage === 2 && S.odoText !== 'YOU: 2') { S.odoText = 'YOU: 2'; paintOdo(); }
        if (idle >= IDLE[3] && S.idleStage < 3 && S.idleStage >= 2) {
          S.idleStage = 3; dimEl.classList.add(K + 'on'); ramEl.hidden = false; api.achieve('sheep-counter.asylum');
          say('Management', L.idle[6], { priority: 1, mood: 'smug' });
        }
        if (idle >= IDLE[4] && S.idleStage >= 3) {
          if (S.idleStage < 4) { S.idleStage = 4; S.idleN = 0; S.idleNext = idle; }
          if (idle >= S.idleNext && S.idleN < L.idleLong.length) { say('Management', L.idleLong[S.idleN++], { priority: 1, mood: S.idleN > 5 ? 'proud' : 'smug' }); S.idleNext = idle + (api.selftest ? 4000 : 40000); }
        }
        if (S.idleStage >= 1 && S.mode === 'SLEEP' && S.clock - S.sleepWake > 3000) {
          S.sleepWake = S.clock; S.fenceN = ((S.fenceN || 0) % 7) + 1; bubbleAt(FX + S.shift + S.nudge, 205, String(S.fenceN));
        }
      }
      function wake() {
        if (S.idleStage === 0 && S.mode !== 'SLEEP') return;
        const st = S.idleStage; S.idleN = 0;
        S.idleStage = 0; S.sleepers = []; dimEl.classList.remove(K + 'on'); ramEl.hidden = true; S.odoText = ''; S.moon = 0; S.sleep = 0; clearLater('idle');
        S.idleHold = 0;
        api.sfx('honk'); paintOdo(); paintSleep();
        if (S.sockSleep) { S.sockSleep = false; later(2600, function () { say('Management', L.idle2[1], { priority: 1, mood: 'smug' }); }, 's2'); }
        if (S.mode === 'SLEEP') setMode('PLAY');
        say('Management', ln(st >= 4 ? 'wake4' : st === 3 ? 'wake3' : st === 2 ? 'wake2' : 'wake1'), { priority: 2, mood: 'confused' });
        later(1200, function () { say('Management', L.idle[7], { priority: 1, mood: 'smug' }); api.award(0.5, 'sheep woke you'); });
        S.spawnIn = 1500;
      }
      /* ---------- drawing ---------- */
      const stars = [];
      for (let i = 0; i < 40; i++) stars.push({ x: (i * 97 + 31) % 640, y: (i * 53 + 17) % 190, ph: i * 1.7 });
      let skyKey = -1, skyGrad = null, fsk = 1, dpr = 1, fsN = 0;
      /* canvas text is scaled by how much CSS shrinks the 640x400 canvas, so bubbles stay readable on phones; the backing store follows devicePixelRatio */
      function measureFs() {
        const cw = cv.clientWidth || 560; fsk = clamp(560 / Math.max(240, cw), 1, 2.3);
        const d = clamp(window.devicePixelRatio || 1, 1, 2), want = Math.round(640 * d);
        if (cv.width !== want) { cv.width = want; cv.height = Math.round(400 * d); dpr = d; skyKey = -1; }
      }
      const F = function (px, bold) { return (bold ? 'bold ' : '') + Math.round(px * fsk) + 'px system-ui,sans-serif'; };
      measureFs(); api.on(window, 'resize', measureFs);
      function rr(x, y, w, h, r) { g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); }
      function mix(a, b, t) {
        const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
        const rr_ = Math.round(lerp(pa >> 16, pb >> 16, t)), gg = Math.round(lerp((pa >> 8) & 255, (pb >> 8) & 255, t)), bb = Math.round(lerp(pa & 255, pb & 255, t));
        return 'rgb(' + rr_ + ',' + gg + ',' + bb + ')';
      }
      function drawSky(ts) {
        const dk = Math.round(S.dawn * 50);
        if (dk !== skyKey || !skyGrad) {
          skyKey = dk; skyGrad = g.createLinearGradient(0, 0, 0, 280);
          skyGrad.addColorStop(0, mix('#1b2150', '#9a86d6', S.dawn)); skyGrad.addColorStop(1, mix('#3b3f8f', '#ffd2b0', S.dawn));
        }
        g.fillStyle = skyGrad; g.fillRect(0, 0, 640, 300);
        const fade = 1 - S.dawn;
        if (fade > 0.05) {
          g.fillStyle = '#fff';
          for (let i = 0; i < stars.length; i++) { const s = stars[i]; g.globalAlpha = fade * (S.reduced ? 0.8 : 0.45 + 0.4 * Math.sin(ts / 600 + s.ph)); g.fillRect(s.x, s.y, 2, 2); }
          g.globalAlpha = 1;
        }
        // moon
        g.fillStyle = '#fff3b0'; g.strokeStyle = '#ffe27a'; g.lineWidth = 3; g.beginPath(); g.arc(540, 70, 30, 0, 6.283); g.fill(); g.stroke();
        g.fillStyle = '#6b5d2a';
        const ex = S.moon === 2 ? -4 : 0;
        g.fillRect(528 + ex, 62, 4, 5); g.fillRect(546 + ex, 62, 4, 5);
        if (S.hat) { g.fillStyle = '#e0594a'; g.strokeStyle = '#1d1a2e'; g.lineWidth = 2; g.beginPath(); g.moveTo(522, 50); g.lineTo(554, 44); g.lineTo(540, 14); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#fff'; g.beginPath(); g.arc(540, 14, 5, 0, 6.283); g.fill(); g.stroke(); g.fillStyle = '#6b5d2a'; }
        g.beginPath(); if (S.moon === 1) { g.ellipse(540, 84, 5, 7, 0, 0, 6.283); g.fill(); } else { g.lineWidth = 2; g.strokeStyle = '#6b5d2a'; g.moveTo(532, 82); g.quadraticCurveTo(540, 87, 548, 82); g.stroke(); }
        // hills
        g.fillStyle = '#26543f'; g.beginPath(); g.moveTo(0, 300); for (let x = 0; x <= 640; x += 20) g.lineTo(x, 238 + Math.sin(x / 90) * 14); g.lineTo(640, 300); g.fill();
        g.fillStyle = '#2f6b4f'; g.beginPath(); g.moveTo(0, 300); for (let x = 0; x <= 640; x += 20) g.lineTo(x, 262 + Math.sin(x / 60 + 2) * 10); g.lineTo(640, 300); g.fill();
        for (let i = 0; i < 7; i++) { g.fillStyle = i % 2 ? '#2f6b4f' : '#3f8b63'; g.fillRect(0, 290 + i * 16, 640, 16); }
      }
      function drawFence(ts) {
        const fx = FX + S.shift + S.nudge, fin = S.fin;
        const gone = !!(fin && fin.stage >= 1 && !fin.dave);
        let ox = 0;
        if (gone) { fin.walk = Math.min(520, fin.walk + 2.2); ox = -fin.walk; }
        g.save(); g.translate(fx + ox, GY);
        if (S.fenceRot) { g.rotate(Math.min(1.5708, S.fenceRot * 1.5708)); }
        const fa = S.fenceAct; if (fa && S.clock < fa.until && !S.reduced && !gone) { const fp = 1 - (fa.until - S.clock) / 800; if (fa.k === 'S') g.rotate(Math.sin(fp * 3.1416) * 0.1); else g.translate(Math.sin(fp * 37) * (1 - fp) * 5, 0); }
        const blink = S.blink > S.clock;
        // palisade
        if (S.beat >= 6 && !gone) { g.font = '30px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('🤵', 100, -30); }
        if (gone) { g.font = '30px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('🤵', 90, -6); }
        g.lineWidth = 3; g.strokeStyle = '#1d1a2e'; g.fillStyle = '#e8b86d';
        if (gone) { g.beginPath(); g.moveTo(-30, 0); g.lineTo(-30 + Math.sin(ts / 90) * 10, 28); g.moveTo(30, 0); g.lineTo(30 - Math.sin(ts / 90) * 10, 28); g.stroke(); }
        for (let i = 0; i < 5; i++) { rr(-50 + i * 21, -78, 17, 80, 5); g.fill(); g.stroke(); }
        g.fillStyle = '#8a5a2b'; rr(-70, -66, 140, 12, 4); g.fill(); g.stroke(); rr(-70, -34, 140, 12, 4); g.fill(); g.stroke();
        g.fillStyle = '#d6a45a'; rr(-76, -92, 16, 104, 5); g.fill(); g.stroke(); rr(60, -92, 16, 104, 5); g.fill(); g.stroke();
        if (S.night >= 2 || (fin && fin.dave)) { g.fillStyle = '#e0594a'; rr(-72, -69, 148, 7, 3); g.fill(); if (fin && fin.rib === 2) { g.fillStyle = '#fff4dc'; g.fillRect(-4, -72, 8, 14); } }
        g.fillStyle = '#fff';
        if (blink) { g.fillRect(-73, -80, 10, 2); g.fillRect(-73, -70, 10, 2); } else { g.beginPath(); g.arc(-68, -80, 2.8, 0, 6.283); g.arc(-68, -72, 2.8, 0, 6.283); g.fill(); }
        if (S.beat >= 6 && !(fin && fin.stage >= 1)) {
          g.fillStyle = '#5a3a1a'; rr(-112, -22, 26, 20, 3); g.fill(); g.stroke(); g.fillRect(-102, -26, 6, 4);
          g.font = F(9, true); const fbw = Math.max(68, g.measureText('FENCE, Esq.').width + 10), fbh = Math.round(9 * fsk);
          g.fillStyle = '#fff4dc'; rr(-fbw / 2, -6 - fbh - 7, fbw, fbh + 7, 3); g.fill(); g.stroke(); g.fillStyle = '#1d1a2e'; g.textAlign = 'center'; g.fillText('FENCE, Esq.', 0, -10);
        }
        if (S.plaqueOn && !gone) { g.fillStyle = '#d4a73a'; g.strokeStyle = '#1d1a2e'; g.lineWidth = 2; g.font = F(8, true); const vw = Math.max(34, g.measureText('VALUED').width + 8), vh = Math.max(17, Math.round(8 * fsk) + 8); rr(-vw / 2, -36 - vh, vw, vh, 3); g.fill(); g.stroke(); g.fillStyle = '#1d1a2e'; g.textAlign = 'center'; g.fillText('VALUED', 0, -36 - Math.round(vh * 0.28)); }
        if (S.gate) { g.fillStyle = '#b3d9f2'; rr(-24, -60, 48, 62, 4); g.fill(); g.strokeStyle = '#1d1a2e'; g.stroke(); g.fillStyle = '#fff'; g.fillRect(-16, -52, 6, 3); g.fillStyle = '#d4a73a'; g.fillRect(14, -26, 6, 6); }
        g.restore();
        if (fin && fin.dave) { g.save(); g.translate(60, GY + 6); g.scale(0.55, 0.55); g.fillStyle = '#c9a36a'; g.strokeStyle = '#1d1a2e'; g.lineWidth = 4; for (let i = 0; i < 3; i++) { rr(-30 + i * 22, -60, 18, 64, 5); g.fill(); g.stroke(); } g.restore(); }
      }
      function drawBody(o, x, y, sx, sy, rot, air) {
        const gold = o.type === 'golden', goat = o.type === 'goat' || o.disg === 3, d = o.dir || 1, sc = o.scale || 1;
        g.save(); g.translate(x, y); g.scale(d * sc * sx, sc * sy);
        if (rot) { g.translate(0, -24); g.rotate(rot); g.translate(0, 24); }
        if (o.ghost) g.globalAlpha = 0.55;
        if (o.lie) {
          g.fillStyle = '#d9d2c2'; g.beginPath(); g.ellipse(0, -8, 26, 14, 0, 0, 6.283); g.fill(); g.fillStyle = '#fffaf0'; g.beginPath(); g.ellipse(0, -11, 24, 13, 0, 0, 6.283); g.fill();
          g.fillStyle = '#3b2f2f'; rr(18, -16, 16, 14, 4); g.fill(); g.restore(); return;
        }
        const tuck = o.stiff || o.sit ? 0 : Math.min(1, air / 24);
        g.strokeStyle = '#3b2f2f'; g.lineWidth = 4; g.lineCap = 'round';
        if (!o.sit) { g.beginPath(); [-12, -5, 8, 15].forEach(function (lx) { g.moveTo(lx, -14); g.lineTo(lx + tuck * 5, -2 - tuck * 10); }); g.stroke(); }
        const oy = o.sit ? 8 : 0;
        if (goat) {
          g.fillStyle = '#e9dfc9'; g.beginPath(); g.ellipse(0, -24 + oy, 22, 13, 0, 0, 6.283); g.fill(); g.strokeStyle = '#1d1a2e'; g.lineWidth = 1.5; g.stroke();
          if (o.vest || o.disg === 3) { g.fillStyle = '#e5b83b'; g.fillRect(-9, -33 + oy, 18, 17); g.fillStyle = '#b8891b'; g.fillRect(-1, -33 + oy, 3, 17); }
        } else {
          const wc = gold ? '#ffd34d' : '#fffaf0', sh = gold ? '#c9962a' : '#d9d2c2', cs = [[-15, -24, 12], [-4, -33, 14], [10, -30, 13], [18, -21, 11], [0, -20, 15], [-8, -18, 12]];
          g.fillStyle = sh; for (let i = 0; i < cs.length; i++) { g.beginPath(); g.arc(cs[i][0], cs[i][1] + 2 + oy, cs[i][2], 0, 6.283); g.fill(); }
          g.fillStyle = wc; for (let i = 0; i < cs.length; i++) { g.beginPath(); g.arc(cs[i][0], cs[i][1] + oy, cs[i][2] - 1, 0, 6.283); g.fill(); }
        }
        g.fillStyle = '#3b2f2f'; rr(18, -38 + oy, 19, 19, 5); g.fill();
        g.fillStyle = '#fff'; g.beginPath(); if (goat) { g.fillRect(27, -31 + oy, 6, 2); g.fillRect(22, -31 + oy, 4, 2); } else { g.arc(31, -30 + oy, 2.6, 0, 6.283); g.arc(24, -30 + oy, 2.2, 0, 6.283); g.fill(); }
        g.fillStyle = '#3b2f2f'; g.beginPath(); g.ellipse(17, -34 + oy, 5, 3, -0.5, 0, 6.283); g.fill();
        if (goat) { g.beginPath(); g.moveTo(30, -20 + oy); g.lineTo(37, -20 + oy); g.lineTo(34, -9 + oy); g.fill(); g.beginPath(); g.moveTo(22, -37 + oy); g.lineTo(26, -46 + oy); g.lineTo(29, -37 + oy); g.moveTo(31, -37 + oy); g.lineTo(34, -46 + oy); g.lineTo(37, -37 + oy); g.fill(); }
        if (o.tag) { g.fillStyle = '#e0594a'; g.fillRect(14, -32 + oy, 8, 9); g.fillStyle = '#fff'; g.font = 'bold 7px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('4', 18, -25 + oy); }
        if (o.tag2) { g.fillStyle = '#e5b83b'; g.fillRect(24, -22 + oy, 6, 6); }
        if (o.tie) { g.fillStyle = '#e0594a'; g.beginPath(); g.moveTo(15, -20 + oy); g.lineTo(22, -20 + oy); g.lineTo(18.5, -14 + oy); g.fill(); g.beginPath(); g.moveTo(18.5, -14 + oy); g.lineTo(15, -6 + oy); g.lineTo(22, -6 + oy); g.fill(); }
        if (o.lanyard) { g.strokeStyle = '#55c58a'; g.lineWidth = 2; g.beginPath(); g.moveTo(14, -36); g.lineTo(18, -14); g.lineTo(23, -36); g.stroke(); }
        if (o.disg === 1 || o.hatted) { g.fillStyle = '#1d1a2e'; g.fillRect(19, -47 + oy, 18, 4); g.fillRect(23, -57 + oy, 11, 11); }
        if (o.disg === 2) { g.fillStyle = '#8a5a2b'; g.beginPath(); g.moveTo(30, -20 + oy); g.lineTo(38, -20 + oy); g.lineTo(34, -6 + oy); g.fill(); }
        if (o.type === 'lunch') { g.fillStyle = '#8a5a2b'; g.strokeStyle = '#1d1a2e'; g.lineWidth = 1.5; rr(36, -22 + oy, 14, 11, 2); g.fill(); g.stroke(); g.beginPath(); g.arc(43, -22 + oy, 4, Math.PI, 0); g.stroke(); }
        if (o.on && funOn()) { g.fillStyle = ['#a78bfa', '#e0594a', '#55c58a'][Math.floor(n0(o.dur) / 100) % 3]; g.strokeStyle = '#1d1a2e'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(22, -37 + oy); g.lineTo(34, -37 + oy); g.lineTo(28, -57 + oy); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#e5b83b'; g.beginPath(); g.arc(28, -58 + oy, 3, 0, 6.283); g.fill(); }
        if (o.type === 'a404') { g.fillStyle = '#1d1a2e'; g.beginPath(); g.moveTo(15, -20); g.lineTo(22, -20); g.lineTo(18, -8); g.fill(); g.fillStyle = '#fff'; g.fillRect(-4, -22, 11, 14); g.strokeStyle = '#1d1a2e'; g.lineWidth = 1; g.strokeRect(-4, -22, 11, 14); }
        if (gold) { g.fillStyle = '#fff'; g.save(); g.translate(-6, -52); g.rotate(ts_ / 400); g.fillRect(-1, -9, 2, 18); g.fillRect(-9, -1, 18, 2); g.restore(); }
        g.restore();
      }
      let ts_ = 0;
      function drawSheep(sh, blur) {
        const t = place(sh);
        if (sh.type === 'sock' || sh.type === 'toast') {
          g.font = '26px system-ui,sans-serif'; g.textAlign = 'center'; g.fillStyle = '#fff'; g.fillText(sh.type === 'sock' ? '🧦' : '🍞', t.x, t.y - 14 + Math.sin(sh.u / 120) * 2); return;
        }
        // shadow
        g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(t.x, GY + 6, 22 * (1 - 0.5 * t.air / 120) * sh.scale, 5 * (1 - 0.5 * t.air / 120), 0, 0, 6.283); g.fill();
        if (sh.type === 'concept') sh.ghost = true;
        if (sh.type === 'half') {
          g.save(); if (t.air > 30) { g.beginPath(); g.rect(0, 0, 640, t.y - 12); g.clip(); }
          drawBody(sh, t.x, t.y, t.sx, t.sy, t.rot, t.air); g.restore();
        } else if (blur) {
          for (let i = 0; i < 4; i++) { g.globalAlpha = 0.22; drawBody(sh, t.x - 40 * i * sh.dir * 0.5, t.y, t.sx, t.sy, 0, t.air); }
          g.globalAlpha = 1;
        } else if (sh.type === 'pair') {
          drawBody(sh, t.x - 14, t.y, t.sx, t.sy, t.rot, t.air); drawBody(sh, t.x + 14, t.y + 2, t.sx, t.sy, t.rot, t.air);
          g.fillStyle = 'rgba(216,195,154,.95)'; rr(t.x - 36, t.y - 46, 74, 34, 6); g.fill(); g.strokeStyle = '#8a7a52'; g.lineWidth = 2; g.stroke();
          g.font = F(8, true); const pbw = Math.max(80, g.measureText(sh.sign).width + 10), pbh = Math.round(8 * fsk), pbx = clamp(t.x, pbw / 2 + 2, 638 - pbw / 2);
          g.fillStyle = '#fff'; rr(pbx - pbw / 2, t.y - 64 - pbh - 8, pbw, pbh + 8, 3); g.fill(); g.fillStyle = '#1d1a2e'; g.textAlign = 'center'; g.fillText(sh.sign, pbx, t.y - 69);
        } else drawBody(sh, t.x, t.y, t.sx, t.sy, t.rot, t.air);
        if (sh.disg === 5) { g.fillStyle = '#e8b86d'; g.strokeStyle = '#1d1a2e'; g.lineWidth = 2; for (let i = 0; i < 3; i++) { rr(t.x - 24 + i * 16, t.y - 46, 12, 40, 4); g.fill(); g.stroke(); } }
        if (sh.disg === 6) { g.fillStyle = 'rgba(216,195,154,.95)'; rr(t.x - 30, t.y - 44, 60, 36, 6); g.fill(); }
        if (sh.type === 'concept') { g.fillStyle = '#fff'; g.beginPath(); g.arc(t.x + 30, t.y - 60, 10, 0, 6.283); g.fill(); g.fillStyle = '#1d1a2e'; g.font = 'bold 11px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('...', t.x + 30, t.y - 56); }
        if (sh.holdLeft > 0 && sh.breakFlag) { g.font = '20px system-ui,sans-serif'; g.textAlign = 'center'; g.fillStyle = '#fff'; g.fillText('☕', t.x + 14, t.y - 62); }
        if (sh.lab && S.clock < sh.labUntil) { drawLabel(t.x, t.y - 70 * sh.scale - 10, sh.lab, sh.lab === 'NOT TODAY' ? '#e5b83b' : sh.lab === 'VERIFIED' ? '#55c58a' : '#fff'); }
      }
      function drawLabel(x, y, text, bg) {
        g.font = F(9, true); const w = g.measureText(text).width + 10, lfh = Math.round(9 * fsk); x = clamp(x, w / 2 + 2, 638 - w / 2);
        g.fillStyle = bg; g.strokeStyle = '#1d1a2e'; g.lineWidth = 2; rr(x - w / 2, y - lfh - 1, w, lfh + 5, 3); g.fill(); g.stroke(); g.fillStyle = '#1d1a2e'; g.textAlign = 'center'; g.fillText(text, x, y);
      }
      function drawBubbles(dt) {
        for (let i = S.bubbles.length - 1; i >= 0; i--) {
          const b = S.bubbles[i]; b.life -= dt / SPEED * 1; if (b.life <= 0) { S.bubbles.splice(i, 1); continue; }
          const bx = b.sh ? b.sh.px : b.x, by = b.sh ? b.sh.py - 62 * (b.sh.scale || 1) - 14 : b.y;
          g.globalAlpha = Math.min(1, b.life / 300); g.font = F(11); const w = g.measureText(b.text).width + 12, bfh = Math.round(11 * fsk);
          const x = clamp(bx, w / 2 + 2, 638 - w / 2);
          g.fillStyle = '#fff'; g.strokeStyle = '#1d1a2e'; g.lineWidth = 2; rr(x - w / 2, by - bfh - 1, w, bfh + 7, 6); g.fill(); g.stroke();
          g.fillStyle = '#1d1a2e'; g.textAlign = 'center'; g.fillText(b.text, x, by + 1); g.globalAlpha = 1;
        }
      }
      function draw(ts, dt) {
        if (!g) return;
        if ((fsN++ & 63) === 0) measureFs();
        if (g.setTransform) g.setTransform(dpr, 0, 0, dpr, 0, 0);
        ts_ = ts; drawSky(ts); drawFence(ts); s2Sky(ts);
        // halo
        if (S.mode === 'PLAY') {
          let nx = null, nb = 1e9; for (let i = 0; i < POOL; i++) { const sh = pool[i]; if (sh.on && !sh.apexed && !sh.last && sh.apexU - sh.u < nb) { nb = sh.apexU - sh.u; nx = sh; } }
          if (nx && nb < 1500) { g.strokeStyle = 'rgba(255,243,176,.35)'; g.lineWidth = 4; g.beginPath(); g.ellipse(nx.fx, GY - nx.amp - 26, 20 + Math.min(30, nb / 60), 14, 0, 0, 6.283); g.stroke(); }
        }
        const rv = S.river && !S.reduced;
        for (let i = 0; i < POOL; i++) if (pool[i].on) drawSheep(pool[i], rv);
        for (let i = 0; i < S.sleepers.length; i++) {
          const s = S.sleepers[i]; s.a = Math.min(1, s.a + dt / 600); g.globalAlpha = s.a; drawBody(s, s.x, s.y, 1, 1, 0, 0); g.globalAlpha = 1;
          if (s.lie) { g.fillStyle = '#fff'; g.font = 'bold 14px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('z', s.x + 28, s.y - 30 - (ts / 40 + i * 13) % 24); }
        }
        for (let i = 0; i < S.sitters.length; i++) { const s = S.sitters[i]; drawBody(s, s.x, s.y, 1, 1, 0, 0); if (s.counted) { g.fillStyle = '#55c58a'; g.font = 'bold 18px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('✓', s.x, s.y - 52); } }
        if (S.fin && S.fin.signs) { g.font = F(8, true); const aw = Math.max(34, g.measureText('AGAIN?').width + 8), afh = Math.round(8 * fsk); for (let i = 0; i < 8; i++) { const x = 50 + i * 78, y = 352; drawBody({ dir: -1, type: 'sheep', scale: 0.7, tie: S.night >= 2 }, x, y, 1, 1, 0, 0); g.fillStyle = '#8a5a2b'; g.fillRect(x - 1, y - 62, 3, 30); g.fillStyle = '#fff'; g.fillRect(x - aw / 2, y - 62 - afh - 6, aw, afh + 7); g.fillStyle = '#1d1a2e'; g.font = F(8, true); g.textAlign = 'center'; g.fillText('AGAIN?', x, y - 65); } }
        if (S.jury) { const n = S.jury.n; for (let i = 0; i < 12; i++) { const jx = 100 + i * 36, hop = (i + 1 === n) ? -6 : 0; drawBody({ dir: 1, type: 'sheep', scale: 0.42, tag: i === 6 ? '4' : '' }, jx, 372 + hop, 1, 1, 0, 0); } }
        if (S.secu) { const sc = S.secu; sc.x += dt * 0.25 / Math.max(1, SPEED) * SPEED; drawBody({ dir: 1, type: 'secu', hatted: true, tag: '4', scale: 0.8 }, sc.x, 390, 1, 1, 0, 0); if (sc.x > 720) S.secu = null; }
        if (S.leaf) { const lf = S.leaf; lf.t += dt; lf.x = -20 + lf.t / 8000 * 700; g.font = '22px system-ui,sans-serif'; g.textAlign = 'center'; g.fillStyle = '#fff'; g.fillText('🌿', lf.x, 120 + Math.sin(lf.t / 500) * 18); if (lf.x > 680) S.leaf = null; }
        s2Over(ts, dt); drawBubbles(dt);
        if (S.flash > 0) { if (!S.reduced) { g.globalAlpha = Math.min(1, S.flash * 0.9); g.fillStyle = '#fff'; g.fillRect(0, 0, 640, 400); g.globalAlpha = 1; } S.flash = Math.max(0, S.flash - dt / 450); }
        // dawn lilac wash and sparks
        if (S.jamUntil > S.clock && !S.reduced) { g.fillStyle = '#ffe27a'; g.font = 'bold 16px system-ui,sans-serif'; g.textAlign = 'center'; for (let i = 0; i < 6; i++) g.fillText(i % 2 ? '*' : '+', 320 + Math.sin(ts / 40 + i * 2) * 120, 330 + Math.cos(ts / 55 + i) * 30); }
      }
      /* ---------- main step ---------- */
      function update(dt, raw) {
        S.clock += dt; runLater(); pumpSay(); s2Update();
        if (S.mode !== 'PLAY' && S.mode !== 'SLEEP' && S.modeUntil && S.clock > S.modeUntil) forcePlay();
        S.dawn += clamp(S.dawnT - S.dawn, -dt / 6000, dt / 6000);
        S.sleep = clamp(S.sleep - 0.0015 * dt / 1000, 0, 0.995);
        if (S.fstampUntil && S.clock > S.fstampUntil) { fstamp.hidden = true; S.fstampUntil = 0; }
        if (S.ovUntil && S.clock > S.ovUntil && !S.type) { ovEl.hidden = true; S.ovUntil = 0; }
        idleStep();
        if (!S.hidden) S.meadowMs += dt;
        if (S.mode === 'PLAY' && S.idleStage === 0 && !S.hidden) { S.playMs += dt; timeBeats(); }
        if (S.mode === 'PLAY') {
          if (S.beat <= 2 && S.presses === 0 && S.recounts === 0 && S.night === 1 && !S.once.empty) { if (!S.hidden && api.now() - S.quiet0 >= (api.selftest ? 5000 : 30000)) { S.once.empty = true; say('Management', L.misc[4], { priority: 1 }); later(4000, function () { say('Management', L.misc[5], { priority: 1 }); }); api.achieve('sheep-counter.empty'); } }
          if ((!S.once.strike || (S.night >= 2 && !S.once.strike2)) && S.crossed >= 70 && S.crossed < S.nextAudit) startStrike();
          else if (!S.once.lament && S.crossed >= 84 && S.crossed < S.nextAudit) startLament();
          else if (S.crossed >= 100 && !S.fin && !S.auditing) { let air = false; for (let i = 0; i < POOL; i++) if (pool[i].on && pool[i].u < pool[i].landU) air = true; if (!air) startFinale(); }
        }
        if (S.mode === 'PLAY' && S.clock > S.silentUntil && S.crossed < 100) {
          S.spawnIn -= dt;
          if (S.spawnIn <= 0) {
            let n = 0; for (let i = 0; i < POOL; i++) if (pool[i].on) n++;
            if (n < POOL - 2) { spawnNext(); S.spawnIn = Math.max(durFor() + 600, S.night === 1 && S.spawned < 8 ? 2800 : lerp(3400, 2300, (S.beat - 1) / 7)) * (0.92 + api.rand() * 0.16); }
            else S.spawnIn = 500;
          }
        }
        if (S.fenceRot && S.clock > S.silentUntil && S.fenceRot > 0) { S.fenceRot = Math.max(0, S.fenceRot - dt / 2500); }
        for (let i = 0; i < POOL; i++) {
          const sh = pool[i]; if (!sh.on) continue;
          if (sh.frozen) { /* held */ }
          else if (sh.holdLeft > 0) sh.holdLeft -= dt;
          else {
            if (sh.holdMs > 0) { sh.holdLeft = sh.holdMs; sh.holdMs = 0; }
            else {
              sh.u += dt;
              if (!sh.apexed && sh.u >= sh.apexU) { sh.u = sh.apexU; sh.apexed = true; onApex(sh); }
              else if (sh.apexed && !sh.landed && sh.u >= sh.landU) { sh.landed = true; onLand(sh); }
              if (S.mode === 'SLEEP' && sh.landed && S.sleepers.length < 6) { S.sleepers.push({ x: 80 + S.sleepers.length * 90, y: 350, dir: 1, type: 'sheep', lie: true, scale: 1, a: 0 }); sh.on = false; continue; }
              if (sh.u >= sh.endU) sh.on = false;
            }
          }
          if (sh.holdLeft < 0) sh.holdLeft = 0;
        }
        typeStep(dt);
        if (S.hear) hearingStep(dt);
        if (S.objOpen) { const f = clamp((S.objUntil - S.clock) / 5000, 0, 1); drain.style.transform = 'scaleX(' + f + ')'; }
        if (S.strike) strikeStep(dt);
        if (S.jury) juryStep(dt);
        if (S.signAt && S.clock >= S.signAt && !signEl.hidden && S.mode === 'PLAY') nextSign();
        if (S.motion && (S.clock > S.motion.until || S.fin)) { S.motion = null; motEl.hidden = true; if (!S.fin) say('Management', ln('noruling'), { priority: 1 }); S.motionIn = S.clock + 12000 + api.rand() * 8000; }
        if (S.beat >= 6 && S.mode === 'PLAY') {
          if (!S.motion && S.clock > S.motionIn && S.motionIn > 0) { const t = ln('motions'); S.motion = { until: S.clock + 8000 }; motTxt.textContent = 'Mr. Palisade: ' + t; motEl.hidden = false; ovEl.hidden = true; S.motionIn = S.clock + 20000; api.sfx('blip'); }
        }
        if (S.river && api.now() - (S.ring.length ? S.ring[S.ring.length - 1] : 0) > 3000 && S.clock - S.riverLast > 3000) { S.river = false; S.odoText = S.idleStage >= 2 ? S.odoText : ''; paintOdo(); say('Management', L.riverEnd, { priority: 1 }); api.sfx('pop'); }
        if (S.holding) { S.holdMs += raw; hopeEl.style.width = clamp(S.holdMs / 10, 0, 100) + '%'; if (S.holdMs >= 1000) { S.holding = false; hopeEl.style.width = '0'; lamentResolve('hope'); } }
        if (S.zeroOdo && S.clock > S.zeroOdo) { S.zeroOdo = 0; odoKey = ''; paintOdo(); } else if (S.zeroOdo) { odoKey = ''; paintOdo(); }
        if (S.mode === 'LAMENT' && S.lam && S.lam.sh && !S.lam.done) { S.lam.sh.frozen = true; }
      }
      let lastTs = 0;
      function frame(ts) {
        if (S.dead) return;
        const t = typeof ts === 'number' && Number.isFinite(ts) ? ts : api.now();
        let raw = lastTs ? t - lastTs : 16; lastTs = t;
        raw = clamp(raw, 0, 100); if (S.hidden) raw = 0;
        try { update(raw * SPEED, raw); draw(t, raw * SPEED); paintButtons(); } catch (e) { if (S.errs++ < 3) api.setTimeout(function () { throw e; }, 1); }
        api.requestAnimationFrame(frame);
      }
      /* ---------- events ---------- */
      api.on(document, 'keydown', onKey);
      api.on(cv, 'pointerdown', onPointer);
      api.on(cv, 'pointerup', onPointerUp);
      api.on(cv, 'pointercancel', function () { pend = null; });
      api.on(countBtn, 'contextmenu', function (e) { e.preventDefault(); });
      api.on(root, 'pointerdown', function () { touchInput(); });
      api.on(root, 'touchstart', function () { touchInput(); }, { passive: true });
      api.on(countBtn, 'pointerdown', function () { if (S.mode === 'LAMENT' && S.lam && !S.lam.done) { S.holding = true; S.holdMs = 0; } });
      const endHold = function () { S.holding = false; hopeEl.style.width = '0'; };
      api.on(countBtn, 'pointerup', endHold); api.on(countBtn, 'pointercancel', endHold); api.on(countBtn, 'pointerleave', endHold);
      api.on(countBtn, 'pointerdown', function () { S.heldAt = api.now(); S.heldStage = 0; S.heldDone = false; });
      const endHeld = function () { if (S.heldDone) { S.heldDone = false; later(500, function () { say('Management', L.hold[3], { priority: 1, mood: 'smug' }); }, 's2'); } S.heldAt = 0; };
      api.on(countBtn, 'pointerup', endHeld); api.on(countBtn, 'pointercancel', endHeld); api.on(countBtn, 'pointerleave', endHeld);
      api.on(countBtn, 'keydown', function (ev) { if (ev.key === 'Enter' && ev.repeat) { ev.preventDefault(); return; } if ((ev.key === ' ' || ev.key === 'Spacebar') && !ev.repeat) { S.heldAt = api.now(); S.heldStage = 0; S.heldDone = false; } });
      api.on(countBtn, 'keyup', function (ev) { if (ev.key === ' ' || ev.key === 'Spacebar') endHeld(); });
      api.on(countBtn, 'blur', endHeld);
      api.on(document, 'visibilitychange', function () {
        if (document.hidden) { S.hidden = true; S.hideAt = api.now(); return; }
        S.hidden = false; S.lastInput = S.quiet0 = api.now(); S.idleHold = 0;
        if (api.now() - S.hideAt > 4000 && S.presses + S.audits > 0) { say('Management', L.misc[2], { priority: 1, mood: 'smug' }); stampField('ON BREAK', 'mus', 1200); }
      });
      api.on(window, 'resize', function () {
        const w = window.innerWidth; if (Math.abs(w - S.resizeW) < 40) return; S.resizeW = w;
        const n = api.now(); if (n - S.resizeAt < 20000) return; S.resizeAt = n;
        S.oldFx = FX + S.shift + S.nudge; S.shift = (S.shift + 40) % 120; S.oldLeft = 3;
        S.splinters = Math.round((S.splinters + 0.4) * 10) / 10;
        say('Management', L.misc[0], { priority: 1, mood: 'confused' }); later(4000, function () { say('Management', L.misc[1], { priority: 1 }); });
        paintStatus();
      });
      /* ---------- opening beats ---------- */
      capture(); paintOdo(); paintStatus(); paintSleep(); paintButtons(); paintInvoice();
      if (S.night >= 2) { signEl.hidden = false; S.signAt = S.clock; nextSign(); if (S.beat >= 5) localEl.hidden = false; say('Management', L.night[0].replace('{count}', String(S.night)), { priority: 1, mood: 'smug' }); }
      else {
        later(1500, function () { printSlip([{ t: L.officialCount }], null); });
        later(700, function () { say('Management', L.welcome[n0(sv.total) > 0 ? 1 + api.randInt(0, 1) : 0].replace('{player}', function () { return api.player.name; }), { priority: n0(sv.total) > 0 ? 1 : 2, keep: true, mood: 'proud' }); });
        if (n0(sv.total) === 0) later(2500, function () { say('Management', L.officialCount, { priority: 1, mood: 'smug' }); });
      }
      if (sv.endings > 0) later(9000, function () { say('Management', 'Welcome back. Your ' + api.fmt(n0(sv.total)) + ' presses are on file. They have been audited and are, per policy, 7 1/2 short.', { priority: 0 }); });
      api.requestAnimationFrame(frame);
      try { countBtn.focus({ preventScroll: true }); } catch (e) { /* no focus */ }
      return { destroy() { S.dead = true; persist(); } };
    }
  });
})();
