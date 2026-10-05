/* POINTLESS module: template */
/*
 * TEMPLATE MODULE. Copy to games/<your-id>.js, then find/replace the id "template" (header comment, CSS prefix
 * "m-template-", achievement/stat/flag prefixes "template.", the 'm:template:*' line categories, registerModule id)
 * and rewrite the premise. This one is deliberately tiny (about 40 lines of jokes); a real module needs >= 80
 * distinct lines, >= 3 callbacks, >= 3 secret events (SPEC section 5). Study the patterns, not the jokes:
 *   - every timer/listener goes through api.* (auto-cleaned), never window.setTimeout & friends
 *   - shuffle bag so the same line never repeats back to back
 *   - escalation by count, spam reaction, long-idle reaction, secrets, callbacks to flags/save
 *   - rewards are tiny and the game says out loud that they mean nothing
 */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-template-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:560px;margin:0 auto;text-align:center}
.m-template-paper{width:100%;min-height:120px;padding:16px 14px;background:#fff;border:3px solid #2b2438;border-radius:12px;
  box-shadow:4px 4px 0 #2b2438;font:inherit;cursor:pointer;position:relative;overflow:hidden}
.m-template-paper:hover{background:#fffdf4}
.m-template-doc{display:block;font-weight:800;font-size:1.1rem;overflow-wrap:anywhere}
.m-template-mark{position:absolute;right:12px;bottom:10px;border:4px solid #d4352a;color:#d4352a;border-radius:8px;
  padding:0 10px;font-weight:900;letter-spacing:.1em;transform:rotate(-12deg);opacity:0}
.m-template-mark.m-template-on{opacity:.85;animation:m-template-thunk .25s ease-out}
@keyframes m-template-thunk{from{transform:rotate(-12deg) scale(2.2);opacity:0}to{transform:rotate(-12deg) scale(1);opacity:.85}}
.m-template-stamp{font-size:1.4rem;font-weight:900;padding:14px 34px;cursor:pointer;background:#ffd166;color:#2b2438;
  border:4px solid #2b2438;border-radius:16px;box-shadow:5px 5px 0 #2b2438}
.m-template-stamp:active{transform:translate(4px,4px);box-shadow:1px 1px 0 #2b2438}
.m-template-count{font-weight:800}
.m-template-log{list-style:none;margin:0;padding:0;font-size:.85rem;opacity:.8;width:100%}
@media (prefers-reduced-motion:reduce){.m-template-mark.m-template-on{animation:none}}
`, 'css-template');

  P.addAchievements([
    { id: 'template.first', name: 'First Stamp', desc: 'Approve one (1) thing.', icon: '🖋️', reward: 1 },
    { id: 'template.stack', name: 'A Stack', desc: 'Approve 10 documents. A pile becomes a stack.', icon: '📚', reward: 2,
      check: function (s) { return (s['template.stamps'] || 0) >= 10; } },
    { id: 'template.senior', name: 'Senior Associate of Stamping', desc: 'Approve 50 documents. There is no junior associate.', icon: '🎖️', reward: 5,
      check: function (s) { return (s['template.stamps'] || 0) >= 50; } },
    { id: 'template.spam', name: 'Overwhelming Approval', desc: 'Stamp faster than paperwork can be paperwork.', icon: '💥', secret: true, reward: 3 },
    { id: 'template.idle', name: 'Patience, Rewarded With Nothing', desc: 'Leave the stamp alone until it notices.', icon: '🕰️', secret: true, reward: 3 },
    { id: 'template.paper', name: 'Hands On', desc: 'Press the paper itself, three times.', icon: '📄', secret: true, reward: 3 },
    { id: 'template.sock', name: 'Sockwatch', desc: 'Receive a status update from the Missing Sock.', icon: '🧦', secret: true, reward: 7.5 }
  ]);

  P.addLines('m:template:approved', [
    'Approved. The document feels seen, which it did not request.',
    'Stamped at 4:17 PM near the third ficus. The ficus has been copied on this.',
    'Approval granted. Approval is non-transferable, non-refundable, and only partly understood.',
    'Another one approved. Sandra from Compliance has noted the stamp but not the document.',
    'That is {count} approvals. The stamp has begun to hum, which is not in its job description.',
    'The document has been approved by a committee of one. The committee is pleased.',
    'Approved, subject to review, which has been approved, subject to approval.',
    'You approved that very quickly. Some would say suspiciously. Those people have been stamped.',
    'The stamp pad is 7 1/2 percent drier. This has been filed under Weather.',
    'Approval issued in triplicate. The other two copies are thinking about it.'
  ]);
  P.addLines('m:template:spam', [
    'A stamping fee of 1 Meh has been applied for stamping faster than paperwork can happen.',
    'Security has been called. Security is the stamp. Security is tired.',
    'Please slow down. The stamp has a family. The family is a smaller stamp.'
  ]);
  P.addLines('m:template:idle', [
    'The stamp waits. It has waited before. This is not new, but it is still something.',
    'Nobody is stamping anything. A single page drifts to the floor, unapproved, and is allowed to.',
    'It is quiet. Management is not lonely. Management has simply noticed the quiet, repeatedly.',
    'The ink pad has closed its eyes. It will not say it is waiting for you.'
  ]);
  const DOCS = [
    'Form 27B/6 (Request for Form 27B/7)',
    'A memo about memos',
    'The memo about the memo about memos',
    'Permission slip for a field trip to the next desk',
    'Invoice for 7 1/2 hours of thinking about lunch',
    'Complaint about the complaint box (the box has responded)',
    'Application to become a Department of One',
    'Receipt for a receipt',
    'Quarterly report on the quarter',
    'Sandra\'s note: "see attached" (nothing is attached)',
    'Request to reschedule Tuesday'
  ];
  const SOCK_DOC = 'Status update from the Missing Sock: "still travelling" (dated tomorrow)';
  const MILESTONES = {
    1: 'First approval of the day. Please enjoy this feeling responsibly. It will not return.',
    10: 'Ten approvals. The pile is now officially a "stack". Stacks have fewer rights than piles.',
    25: 'Sandra asks for "less enthusiasm and more paperwork". She has attached the paperwork. It is a stamp.',
    40: 'Dennis (Plant) saw that. Dennis is not impressed. Dennis has never been impressed.',
    50: 'Fifty approvals. You are now a Senior Associate of Stamping. There was never a junior associate.',
    100: 'One hundred approvals. The stamp wishes to speak with you privately. It has nothing to say. It is enjoying the privacy.'
  };

  P.registerModule({
    id: 'template',
    title: 'Department of Stamping',
    tagline: 'Approve things. Nothing needs approving.',
    icon: '🖋️',
    category: 'game',
    unlockCost: 0,
    tags: ['clicker', 'paperwork'],
    mount(root, api) {
      let count = 0, lifetime = api.save.get('lifetime', 0), lastAct = api.now(), idleFired = false, feeUntil = 0, paperClicks = 0;
      let recent = [], bag = [], lastDoc = '';
      const el = api.el;

      const docEl = el('span', { class: 'm-template-doc', text: 'Document #0: this document. Awaiting approval.' });
      const mark = el('span', { class: 'm-template-mark', 'aria-hidden': 'true', text: 'APPROVED' });
      const paper = el('button', { class: 'm-template-paper', type: 'button', 'aria-live': 'polite', onclick: onPaper }, docEl, mark);
      const counter = el('div', { class: 'm-template-count' });
      const log = el('ul', { class: 'm-template-log' });
      const stampBtn = el('button', { class: 'm-template-stamp', type: 'button', onclick: function () { stamp(); } }, 'STAMP');
      root.appendChild(el('div', { class: 'm-template-wrap' },
        el('p', { text: 'Welcome to the Department of Stamping. Press the button, or press S. Each approval is worth a small, meaningless amount of Meh.' }),
        paper, stampBtn, counter, log));
      api.setTitle('Department of Stamping');
      paintCount();

      function paintCount() { counter.textContent = 'Documents approved: ' + api.fmt(count) + ' (lifetime ' + api.fmt(lifetime + count) + ')'; }
      function nextDoc() {
        if (!bag.length) bag = api.shuffle(DOCS);
        let d = bag.pop();
        if (d === lastDoc && bag.length) d = bag.pop();
        lastDoc = d;
        return d;
      }
      function addLog(text) {
        log.appendChild(el('li', { text: text }));
        while (log.children.length > 6) log.removeChild(log.firstChild);       // cap DOM growth
      }
      function stamp() {
        const now = api.now();
        recent = recent.filter(function (t) { return now - t < 3000; });
        recent.push(now);
        lastAct = now; idleFired = false;
        count++;
        api.stat.inc('template.stamps');
        api.stat.max('template.best', count);
        const sock = api.chance(0.04);
        const doc = sock ? SOCK_DOC : nextDoc();
        docEl.textContent = doc;
        mark.classList.remove('m-template-on');
        void mark.offsetWidth;                                                  // restart the CSS animation
        mark.classList.add('m-template-on');
        addLog('#' + count + ': ' + doc);
        api.award(0.1 + api.rand() * 0.4, 'stamp');
        api.sfx('stamp');
        api.achieve('template.first');
        paintCount();
        if (count % 5 === 0) api.save.set('lifetime', lifetime + count);
        if (sock) { api.achieve('template.sock'); api.say('The Missing Sock has filed an update. It is "still travelling". Management is proud of its commitment.', { mood: 'proud', priority: 1 }); }
        else if (MILESTONES[count]) { api.say(MILESTONES[count], { mood: count >= 50 ? 'proud' : 'smug', priority: 1 }); if (count >= 50) api.confetti(); }
        else if (recent.length >= 12 && now > feeUntil) {
          feeUntil = now + 6000;
          api.award(-1, 'stamping fee');
          api.sfx('buzz');
          api.achieve('template.spam');
          api.sayRandom('m:template:spam', { mood: 'panic', priority: 1 });
        }
        else if (count % 3 === 1) api.sayRandom('m:template:approved', { count: count });
      }
      function onPaper() {
        lastAct = api.now(); idleFired = false;
        paperClicks++;
        api.sfx('pop');
        api.stat.inc('template.paperPresses');
        if (paperClicks === 1) api.say('You have pressed the paper. The paper is not a button, but it has not been told.', { mood: 'confused' });
        else if (paperClicks === 2) api.say('Again? The paper requests that you stop being so familiar.', { mood: 'confused' });
        else if (paperClicks === 3) {
          api.say('The paper has stamped YOU. You are now approved. Retroactively.', { mood: 'proud', priority: 1 });
          api.flag.set('template.stampedPaper', true);
          api.achieve('template.paper'); api.confetti();
        }
      }

      api.on(document, 'keydown', function (e) {
        if ((e.key === 's' || e.key === 'S') && !e.repeat && !/INPUT|TEXTAREA/.test(String(e.target && e.target.tagName))) stamp();
      });
      /* long idle: the stamp notices. api.selftest shortens the wait so fuzz runs can see it */
      api.setInterval(function () {
        const wait = api.selftest ? 3000 : 25000;
        if (!idleFired && api.now() - lastAct > wait) {
          idleFired = true;
          api.sayRandom('m:template:idle', { mood: 'disappointed' });
          api.achieve('template.idle');
        }
      }, 1000);

      /* first joke inside 10 seconds, without the player doing anything clever; callbacks to saves and flags */
      api.setTimeout(function () {
        if (lifetime > 0) api.say('Welcome back. The stamp remembers ' + api.fmt(lifetime) + ' approvals and has chosen not to mention it.', { mood: 'smug' });
        else if (api.flag.get('metGerald')) api.say('Gerald (Potato) once approved a form here. It was a potato form. It was accepted.', { mood: 'smug' });
        else api.say('Welcome to Stamping. Every document here has already been approved. We are simply making it official.', { mood: 'proud' });
      }, 1200);

      return {
        destroy() {                      // optional. api.* timers/listeners are cleared for you
          api.save.set('lifetime', lifetime + count);
        }
      };
    }
  });
})();
