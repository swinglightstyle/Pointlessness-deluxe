/* POINTLESS ui 65: Terms of Service - long, scroll to the bottom to enable Accept, and the Accept button gets progressively shy.
 * Built-in clauses plus every P.lines.tosClause line from the content packs ("Schedule A"). */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  const SECTIONS = [
    ['1. Definitions of Definitions', [
      '1.1 "You" means you, or a person acting on your behalf, or a person who resembles you from the stairs.',
      '1.2 "Management" means the entity that manages. It does not mean the entity that is managed, unless that entity is also managing.',
      '1.3 "Meh" means the unit of nothing used in the Service. It is its own plural and, on weekends, its own singular.',
      '1.4 "Nothing" means a thing that is not there, which is hereby declared to be there for legal purposes.']],
    ['2. Acceptance of These Terms', [
      '2.1 By using the Service you accept these Terms. By not using the Service you also accept these Terms, but less.',
      '2.2 Acceptance may be indicated by clicking, not clicking, scrolling, or standing very near the screen with intent.',
      '2.3 These Terms have already been accepted on your behalf by a committee of one.',
      '2.4 The Accept button is shy. This is not a defect. It is a feature we are not ready to discuss.']],
    ['3. The Meh Economy', [
      '3.1 All Meh is held in trust by a trust that has not been told.',
      '3.2 Meh has no monetary value. Meh has emotional value, which is also zero, but warmer.',
      '3.3 Management may adjust the value of Meh at any time, but has promised to continue not to.',
      '3.4 Meh earned while the tab is hidden is earned in spirit and recorded in a different spirit.']],
    ['4. Conduct of Valued Employees', [
      '4.1 You agree to be a Valued Employee. If you are already one, you agree to remain valued.',
      '4.2 You will not feed the metrics. They are well fed already and prone to wandering.',
      '4.3 Any attempt to win will be met with sincere congratulations and then, gently, nothing.',
      '4.4 You will treat Dennis (Plant) with the respect due to a senior colleague with roots.']],
    ['5. Intellectual Property', [
      '5.1 All content is the property of Management. Management found most of it lying around, which is how property works.',
      '5.2 You retain ownership of your clicks. Management retains ownership of the sound they make.',
      '5.3 The potato, Gerald, retains all rights to himself, which is a short list.',
      '5.4 The Toaster owns the toast. This is non-negotiable and has been warm since 1987.']],
    ['6. Privacy', [
      '6.1 Your data stays in your browser. We could not have it if we tried, and we tried, once, at length.',
      '6.2 Nothing you do here is sent anywhere. It is simply witnessed, quietly, by the page.',
      '6.3 Sandra from Compliance has read your statistics and has no comment, which is a comment.']],
    ['7. Warranties and the Absence Thereof', [
      '7.1 The Service is provided "as is", "as was", and occasionally "as will be".',
      '7.2 Management makes no warranty of usefulness. Management also makes no warranty of its own lack of warranty.',
      '7.3 Any resemblance to a productive activity is purely coincidental and under review.',
      '7.1/2 The user agrees that the agreement agrees with the user.']],
    ['8. Limitation of Liability', [
      '8.1 Management shall not be liable for any loss of time. Time was not ours to lose, but we feel for it.',
      '8.2 Management shall not be liable for joy, boredom, or the thing between them that has no name.',
      '8.3 In no event shall total liability exceed 0 Meh, or 7 1/2 Meh, whichever is more imaginary.']],
    ['9. Refunds', [
      '9.1 Refunds are available upon completion of Form 27B/6, which requires Form 27B/7, destroyed in 1998.',
      '9.2 All refunds are 0 Meh. This figure is generous.',
      '9.3 No refund shall be issued for time spent reading these Terms, which was, we agree, considerable.']],
    ['10. Termination', [
      '10.1 These Terms may be terminated by either party, or by Tuesday.',
      '10.2 On termination, all rights revert to the nothing from which they came.',
      '10.3 Termination is not available at this time. Please see 2.4.']],
    ['11. Governing Law', [
      '11.1 These Terms are governed by the laws of a place described as "somewhere near Accounts".',
      '11.2 Disputes shall be settled by a staring contest, judged by the third ficus.',
      '11.3 If the ficus is unavailable, a stapler will serve, but only under protest.']],
    ['12. Miscellany', [
      '12.1 If any clause is found invalid, the others will be notified and will carry on.',
      '12.2 These Terms constitute the entire agreement, except for the parts that did not fit.',
      '12.3 You have scrolled a very long way. This is noted, admired, and filed.',
      '12.4 The end of this document is nearby. It has been nearby for some time.']]
  ];
  const SHY_LABELS = ['Accept', 'Accept?', 'Maybe accept', 'I would rather you did not', 'Accept (shyly)', '...', 'Oh, all right', 'Accept (resigned)', 'Accept.'];
  const SHY_LINES = [
    'The Accept button has gone to stand near the window. It will be back. It has said that before.',
    'The button moved. Management did not see it move, which is how it prefers to be moved.',
    'The Accept button is not avoiding you. It is practising a different position. Position 2.',
    'Accepting requires courage, and the button is running a little low.',
    'The button is shy. It is a button. This is a lot to ask of a button.'
  ];

  LB.registerScreen('tos', {
    title: 'Terms of Service', icon: '📜', wide: true, greet: true,
    render: function (body, ctx) {
      let accepted = false, attempts = 0, reachedBottom = false, lastCount = 0;
      const LIMIT = 9;
      const scroll = h('div', { class: 'lb-tos-scroll', tabindex: '0', role: 'region', 'aria-label': 'Terms of Service text. Scroll to the bottom to enable the Accept button.' });
      const progress = h('p', { class: 'lb-tos-progress', 'aria-live': 'polite' }, 'Scroll to the very end to enable Accept. Scrolled 0%.');
      scroll.appendChild(h('h3', { class: 'lb-tos-h' }, 'POINTLESS™ DELUXE TERMS OF SERVICE'));
      scroll.appendChild(h('p', { class: 'lb-tos-p' }, 'Please read carefully. Please also not read carefully. Both are acceptable. Last updated: Tuesday. Effective: previously.'));
      SECTIONS.forEach(function (s) {
        scroll.appendChild(h('h4', { class: 'lb-tos-sh' }, s[0]));
        s[1].forEach(function (c) { scroll.appendChild(h('p', { class: 'lb-tos-p' }, c)); });
      });
      const extra = (P.lines.tosClause || []).slice(0, 240);
      if (extra.length) {
        scroll.appendChild(h('h4', { class: 'lb-tos-sh' }, 'Schedule A: Additional Clauses (Automatically Appended, Occasionally Read)'));
        extra.forEach(function (c) { scroll.appendChild(h('p', { class: 'lb-tos-p' }, P.subst(c, {}))); });
      }
      scroll.appendChild(h('p', { class: 'lb-tos-p lb-tos-end' }, 'END OF TERMS. If you are reading this, you have done something nobody else has done today. Please accept below, if the button agrees.'));

      const zone = h('div', { class: 'lb-tos-zone' });
      const accept = h('button', { type: 'button', class: 'lb-btn lb-btn-primary lb-tos-accept', disabled: true, 'aria-disabled': 'true' }, SHY_LABELS[0]);
      const decline = h('button', { type: 'button', class: 'lb-btn lb-tos-decline' }, 'Decline');
      const stamp = h('div', { class: 'lb-tos-stamp', hidden: true }, 'ACCEPTED');
      const result = h('p', { class: 'lb-tos-result', 'aria-live': 'polite' });
      zone.appendChild(accept);
      body.appendChild(h('p', { class: 'lb-sect-sub' }, 'Our lawyers (one) have asked that you read these Terms. Our lawyer has also asked that you not feel bad if you do not.'));
      body.appendChild(scroll);
      body.appendChild(progress);
      body.appendChild(h('div', { class: 'lb-tos-foot' }, zone, h('div', { class: 'lb-tos-side' }, decline)));
      body.appendChild(stamp);
      body.appendChild(result);

      function relabel() { accept.textContent = SHY_LABELS[Math.min(attempts, SHY_LABELS.length - 1)]; }
      function place(first) {
        const zw = zone.clientWidth || 300, bw = accept.offsetWidth || 120;
        const maxX = Math.max(0, zw - bw - 6);
        const x = first ? 0 : Math.round(LB.rand() * maxX);
        const y = first ? 0 : Math.round((LB.rand() - 0.2) * 34);
        accept.style.left = x + 'px'; accept.style.top = Math.max(0, y + 12) + 'px';
      }
      function dodge() {
        if (accepted || accept.disabled) return;
        attempts++;
        LB.stat('lobby.tosDodges');
        relabel();
        if (attempts >= LIMIT) {
          accept.style.left = Math.round(Math.max(0, (zone.clientWidth - accept.offsetWidth) / 2)) + 'px'; accept.style.top = '12px';
          accept.classList.add('lb-resigned');
          LB.say('The button has stopped moving. It is not giving up. It is "settling". Please be gentle.', { priority: 1, mood: 'smug' });
          return;
        }
        place(false);
        LB.sfx(attempts % 2 ? 'whoosh' : 'blip');
        if (attempts % 2 === 1) LB.say(LB.bag('tos-shy', SHY_LINES), { priority: 0, mood: 'confused' });
      }
      function doAccept() {
        accepted = true;
        accept.hidden = true; decline.hidden = true;
        stamp.hidden = false;
        result.textContent = 'Terms accepted. They were already in effect, but your acceptance has been framed.';
        LB.stat('lobby.tosAccepts');
        LB.sfx('stamp'); LB.confetti(); LB.achieve('lobby.tos');
        LB.say('Terms accepted. They were already in effect, but your acceptance has been framed and hung in a corridor.', { priority: 2, mood: 'proud' });
      }
      NAT.add(accept, 'pointerenter', function (e) { if (e.pointerType === 'mouse' && attempts < LIMIT) dodge(); });
      NAT.add(accept, 'click', function (e) {
        if (accept.disabled || accepted) return;
        if (e.detail === 0 || attempts >= LIMIT) { doAccept(); return; }   // keyboard users are exempt from shyness
        dodge();
      });
      NAT.add(decline, 'click', function () {
        LB.sfx('buzz');
        result.textContent = 'Declined. Your declining has been accepted as acceptance, with regret.';
        LB.say('You have declined. Your declining has been accepted as acceptance. Management is very sorry about the paperwork.', { priority: 1, mood: 'smug' });
      });
      NAT.add(scroll, 'scroll', function () {
        const max = Math.max(1, scroll.scrollHeight - scroll.clientHeight);
        const pct = Math.min(100, Math.floor(scroll.scrollTop / max * 100));
        if (Math.abs(scroll.scrollTop - lastCount) > 140) { lastCount = scroll.scrollTop; LB.stat('tos.scrolls'); }
        if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 6) {
          if (!reachedBottom) {
            reachedBottom = true;
            accept.disabled = false; accept.removeAttribute('aria-disabled');
            progress.textContent = 'You reached the end. The Accept button is now available, and nervous.';
            LB.achieve('lobby.tos-bottom');
            LB.say('You scrolled to the very bottom of the Terms. Nobody has done that since the lawyer. Please enjoy your Accept button.', { priority: 1, mood: 'proud' });
            place(false);
          }
        } else if (!reachedBottom) progress.textContent = 'Scroll to the very end to enable Accept. Scrolled ' + pct + '%.';
      });
      ctx.later(function () { place(true); }, 30);
    }
  });
})();
