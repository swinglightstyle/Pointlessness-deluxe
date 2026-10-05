/* POINTLESS ui 60: Gift Shop of Nothing - item grid (buy / equip / repeatable), the receipt, and the Refund Wizard
 * (an escalating series of forms that refunds 0 Meh). Items come from P.addShopItems (P.shopOrder/shopMap). */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;
  const PAGE = 24;
  const CATS = [['all', 'Everything'], ['cosmetic', 'Cosmetic'], ['consumable', 'Consumable'], ['upgrade', 'Upgrade'], ['junk', 'Junk']];
  const CAT_NAME = { cosmetic: 'Cosmetic', consumable: 'Consumable', upgrade: 'Upgrade', junk: 'Junk' };
  LB.receipts = LB.receipts || [];
  P.on('reset', function () { LB.receipts.length = 0; });
  P.on('import', function () { LB.receipts.length = 0; });

  /* ---------------- refund wizard ---------------- */
  const FORMS = [
    { form: 'Form 27B/6', name: 'Request for Refund', intro: 'Please state your reason for requesting a refund. Reasons are read aloud, once, in an empty room.', field: { type: 'text', label: 'Reason', max: 80, ph: 'I would like a refund because...' }, empty: 'The reason box is blank. Management respects the silence but needs it in writing.', resp: 'Your reason has been read aloud. The room had no comment, which is customary.' },
    { form: 'Form 27B/7', name: 'Request for Form 27B/7', intro: 'To proceed you will need Form 27B/7. Form 27B/7 was destroyed in 1998. Please describe it from memory.', field: { type: 'text', label: 'Description of Form 27B/7', max: 120, ph: 'It was beige, I think.' }, empty: 'A form cannot be reconstructed from nothing. Nothing has been tried before and does not count.', resp: 'Your description has been accepted as the form. This is called "reconstruction" and is billed at 0 Meh.' },
    { form: 'Form 14', name: 'Statement of Disappointment', intro: 'Disappointment must be measured before it can be refunded. Please select your level.', field: { type: 'select', label: 'How disappointed are you?', options: ['Mildly (per policy)', 'Moderately (7 1/2 out of 10)', 'Profoundly, but quietly', 'Not disappointed, only curious'] }, resp: 'Disappointment recorded as "{v}". A copy has been given to the disappointment.' },
    { form: 'Form 9', name: 'Witness Statement', intro: 'A witness must confirm the purchase took place. The only available witness is on the windowsill.', field: { type: 'check', label: 'Dennis (Plant) witnessed the purchase and has no objection' }, empty: 'Dennis (Plant) has not been asked. Dennis is a plant. The box may be ticked on his behalf, and usually is.', resp: 'Dennis (Plant) has been informed. He leaned slightly to the left, which is acceptance.' },
    { form: 'Form 31', name: 'Authorization from Sandra from Compliance', intro: 'All refunds require authorization. Please enter the name of the authorizing person (hint: it starts with S, and has policies).', field: { type: 'text', label: 'Authorizer', max: 40, ph: 'S...' }, empty: 'The authorizer field is empty. Sandra has noticed and has added a note to a different form.', resp: 'Sandra from Compliance is out of the office. Her out-of-office reply has been accepted as the authorization.' },
    { form: 'Form 7 1/2', name: 'Signature', intro: 'Sign below. A drawing of a signature is acceptable. A drawing of a drawing is under review.', field: { type: 'text', label: 'Signature', max: 40, ph: 'Sign here' }, empty: 'The signature line is empty. It looks the same as it did, which is not a signature.', resp: 'Signature accepted. It looks like a signature, or a drawing of one, or a small bird.' },
    { form: 'Form 27B/6 (again)', name: 'Request for Form 27B/6', intro: 'You have been returned to Form 27B/6 as part of a circular reference. You are, however, one step further along. This is not possible and has been noted.', field: null, cta: 'Continue (circularly)', resp: 'The circle has been closed. You are on the inside, which is where the next form is.' },
    { form: 'Refund Approval Meeting', name: 'A committee of one convenes', intro: 'Your refund will now be reviewed by a committee of one, in a room with a chair in it. Please wait. Please also not wait.', field: null, cta: 'Attend the meeting', resp: null, final: true }
  ];

  function buildRefund(ctx) {
    let step = Math.max(0, Math.min(FORMS.length - 1, Math.floor(Number(LB.flag('lobby.refundStep')) || 0)));
    const toggleBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-small', 'aria-expanded': 'false' }, '↩ Request a Refund');
    const panel = h('div', { class: 'lb-refund-panel', hidden: true });
    const wrap = h('div', { class: 'lb-refund' }, toggleBtn, panel);
    NAT.add(toggleBtn, 'click', function () {
      panel.hidden = !panel.hidden;
      toggleBtn.setAttribute('aria-expanded', panel.hidden ? 'false' : 'true');
      if (!panel.hidden) { LB.stat('lobby.refundOpens'); paint(); LB.say(step === 0 ? 'Refunds are available. They are also not. The forms will explain.' : 'Welcome back to your refund. Your place in the process has been kept, in a drawer.', { priority: 0, mood: 'neutral' }); }
    });
    function setStep(n) { step = n; LB.flag('lobby.refundStep', n); }
    function paint() {
      LB.clear(panel);
      const f = FORMS[step];
      let input = null;
      const err = h('p', { class: 'lb-refund-err', role: 'alert' });
      const resp = h('p', { class: 'lb-refund-resp', 'aria-live': 'polite' });
      const submit = h('button', { type: 'button', class: 'lb-btn lb-btn-primary' }, f.cta || 'Submit form');
      const next = h('button', { type: 'button', class: 'lb-btn', hidden: true }, step === FORMS.length - 1 ? 'Collect refund' : 'Next form');
      panel.appendChild(h('div', { class: 'lb-refund-head' }, h('span', { class: 'lb-refund-form' }, f.form), h('span', { class: 'lb-refund-step' }, 'Step ' + (step + 1) + ' of ' + FORMS.length)));
      panel.appendChild(h('h4', { class: 'lb-refund-title' }, f.name));
      panel.appendChild(h('p', { class: 'lb-refund-intro' }, f.intro));
      if (f.field) {
        const id = 'lb-rf-' + step;
        if (f.field.type === 'text') input = h('input', { type: 'text', id: id, class: 'lb-input', maxlength: String(f.field.max || 60), placeholder: f.field.ph || '', autocomplete: 'off' });
        else if (f.field.type === 'select') input = h('select', { id: id, class: 'lb-input' }, f.field.options.map(function (o) { return h('option', { value: o }, o); }));
        else input = h('input', { type: 'checkbox', id: id, class: 'lb-checkbox' });
        const row = f.field.type === 'check'
          ? h('label', { class: 'lb-check-row', for: id }, input, ' ' + f.field.label)
          : h('div', { class: 'lb-field' }, h('label', { for: id, class: 'lb-label' }, f.field.label), input);
        panel.appendChild(row);
      }
      panel.appendChild(err);
      panel.appendChild(h('div', { class: 'lb-actions' }, submit, next));
      panel.appendChild(resp);
      NAT.add(submit, 'click', function () {
        let v = '';
        if (f.field) {
          if (f.field.type === 'check') { if (!input.checked) { err.textContent = f.empty; LB.sfx('buzz'); return; } v = 'yes'; }
          else { v = String(input.value || '').trim(); if (!v) { err.textContent = f.empty; LB.sfx('buzz'); return; } }
        }
        err.textContent = '';
        LB.stat('lobby.refundForms');
        submit.disabled = true; if (input) input.disabled = true;
        LB.sfx('stamp');
        if (f.final) {
          resp.textContent = 'Refund approved: 0 Meh. Processing fee: 0 Meh. Net refund: 0 Meh. The item remains yours, as it always was.';
          LB.say('Your refund of 0 Meh has been approved by a committee of one. The committee is pleased, and is also the chair.', { priority: 1, mood: 'proud' });
        } else {
          resp.textContent = f.resp.replace('{v}', LB.trunc(v, 40));
          LB.say(resp.textContent, { priority: 0, mood: 'smug' });
        }
        next.hidden = false;
        try { next.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      });
      NAT.add(next, 'click', function () {
        if (f.final) {
          P.state.addMeh(0, { reason: 'refund' });
          LB.stat('lobby.refundsCompleted');
          LB.achieve('lobby.refund');
          LB.confetti();
          LB.sfx('tada');
          LB.toast('Refund issued: 0 Meh', { icon: '🧾', title: 'Refund processed' });
          setStep(0);
          paint();
        } else { setStep(step + 1); paint(); }
      });
    }
    return { el: wrap };
  }

  /* ---------------- shop screen ---------------- */
  LB.registerScreen('shop', {
    title: 'Gift Shop of Nothing', icon: '🛍️', wide: true,
    render: function (body, ctx) {
      let cat = 'all', rows = [];
      const mehEl = h('b', { class: 'lb-shop-meh' });
      const unbind = P.ui.bindMeh(mehEl, { suffix: ' Meh' });
      ctx.onDispose(unbind);
      const flavor = h('p', { class: 'lb-shop-flavor', 'aria-live': 'polite' }, 'The cashier waves you in. The cashier is a laminated card of a cashier.');
      const info = h('span', { class: 'lb-shop-info' });
      const chips = LB.chipGroup('Shop category', CATS.map(function (c) { return { value: c[0], label: c[1] }; }), 'all', function (v) { cat = v; build(false); });
      const grid = h('ul', { class: 'lb-shop-grid', 'aria-label': 'Items for sale' });
      const pager = LB.makePager(function () { build(true); });
      const receiptEl = h('div', { class: 'lb-receipt', 'aria-label': 'Receipt' });
      const refund = buildRefund(ctx);

      body.appendChild(h('div', { class: 'lb-shop-top' }, h('div', { class: 'lb-shop-purse' }, h('span', {}, 'You have '), mehEl), info, chips.el));
      body.appendChild(flavor);
      body.appendChild(h('div', { class: 'lb-shop-cols' },
        h('div', { class: 'lb-shop-main' }, grid, pager.el),
        h('aside', { class: 'lb-shop-side' }, receiptEl, refund.el)));

      function visible() {
        return P.shopOrder.map(function (id) { return P.shopMap[id]; }).filter(function (d) { return d && (cat === 'all' || d.category === cat); });
      }
      function paintRow(r) {
        const d = r.def, id = d.id, owned = P.state.item.count(id), meh = P.state.getMeh();
        const price = P.state.item.price(id);
        const can = meh + 1e-9 >= price;
        r.li.classList.toggle('lb-owned', owned > 0);
        r.owned.textContent = owned > 0 ? (d.repeatable ? 'Owned ×' + LB.fmt(owned) : 'Owned') : '';
        r.price.textContent = LB.fmt(price) + ' Meh';
        const soldOut = owned > 0 && !d.repeatable;
        r.buy.disabled = soldOut;
        r.buy.classList.toggle('lb-poor', !soldOut && !can);
        r.buy.classList.toggle('lb-sold', soldOut);
        r.buy.textContent = soldOut ? 'Owned ✓' : (owned > 0 ? 'Buy another' : 'Buy') + (can ? '' : ' (short ' + LB.fmt(price - meh) + ')');
        r.buy.setAttribute('aria-label', soldOut ? d.name + ': owned' : (can ? 'Buy ' : 'Cannot yet afford ') + d.name + ' for ' + LB.fmt(price) + ' Meh');
        const tog = owned > 0 && P.state.item.isToggleable(id);
        r.toggle.hidden = !tog;
        if (tog) {
          const on = P.state.item.isEquipped(id);
          r.toggle.textContent = on ? '● Equipped' : '○ Not equipped';
          r.toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
          r.toggle.setAttribute('aria-label', d.name + ': ' + (on ? 'equipped, click to remove' : 'not equipped, click to equip'));
        }
      }
      function buy(r) {
        const d = r.def;
        const res = P.state.item.buy(d.id);
        if (res.ok) {
          LB.sfx(d.price >= 50 ? 'tada' : 'ding');
          const text = res.flavor || LB.line('buy', { item: d.name });
          flavor.textContent = text;
          LB.say(text, { priority: 1, mood: 'proud' });
          LB.receipts.unshift({ name: d.name, price: res.price });
          if (LB.receipts.length > 5) LB.receipts.length = 5;
          if (res.price >= 50) { const rc = r.li.getBoundingClientRect(); LB.confetti(rc.left + rc.width / 2, rc.top + 20, 40); }
          paintReceipt();
          paintAll();
        } else if (res.reason === 'poor') {
          LB.sfx('error');
          const text = LB.bag('shopPoor', LB.text.shopPoor, { count: res.short, item: d.name });
          flavor.textContent = text;
          LB.say(text, { priority: 1, mood: 'disappointed' });
          r.li.classList.remove('lb-shake'); void r.li.offsetWidth; r.li.classList.add('lb-shake');
        } else if (res.reason === 'owned') {
          LB.sfx('buzz'); flavor.textContent = d.name + ' is already yours. It cannot be bought twice. It has been tried.';
        }
      }
      function buildRow(d) {
        const r = { def: d };
        r.owned = h('span', { class: 'lb-item-owned' });
        r.price = h('span', { class: 'lb-item-price' });
        r.buy = h('button', { type: 'button', class: 'lb-btn lb-btn-primary lb-item-buy' });
        r.toggle = h('button', { type: 'button', class: 'lb-btn lb-btn-small lb-item-toggle', hidden: true, 'aria-pressed': 'false' });
        r.li = h('li', { class: 'lb-item lb-cat-' + d.category, 'data-id': d.id },
          h('div', { class: 'lb-item-ico', 'aria-hidden': 'true' }, d.icon),
          h('div', { class: 'lb-item-main' },
            h('h4', { class: 'lb-item-name' }, d.name),
            h('p', { class: 'lb-item-desc' }, d.desc || 'No description. It speaks for itself, quietly.'),
            h('div', { class: 'lb-item-meta' }, h('span', { class: 'lb-tagchip' }, CAT_NAME[d.category] || 'Junk'), r.owned)),
          h('div', { class: 'lb-item-act' }, r.price, r.buy, r.toggle));
        NAT.add(r.buy, 'click', function () { buy(r); });
        NAT.add(r.toggle, 'click', function () {
          const on = P.state.item.toggle(d.id);
          LB.sfx(on ? 'ding' : 'bloop');
          LB.toast(d.name + (on ? ' equipped' : ' put away'), { icon: d.icon });
          paintRow(r);
        });
        paintRow(r);
        return r;
      }
      function build(keepPage) {
        const list = visible();
        pager.setTotal(list.length, PAGE, keepPage);
        LB.clear(grid);
        rows = [];
        const from = pager.page * PAGE;
        for (let i = from; i < Math.min(list.length, from + PAGE); i++) { const r = buildRow(list[i]); rows.push(r); grid.appendChild(r.li); }
        if (!list.length) grid.appendChild(h('li', { class: 'lb-grid-empty' }, LB.emptyState('🛒', P.shopOrder.length ? 'Nothing in this aisle. The aisle is proud of that.' : 'The shelves are bare. This is the brand.', LB.line('nothing'))));
        const owned = P.shopOrder.filter(function (id) { return P.state.item.has(id); }).length;
        info.textContent = P.shopOrder.length + ' items in stock · ' + owned + ' owned';
      }
      function paintAll() { rows.forEach(paintRow); const owned = P.shopOrder.filter(function (id) { return P.state.item.has(id); }).length; info.textContent = P.shopOrder.length + ' items in stock · ' + owned + ' owned'; }
      function paintReceipt() {
        LB.clear(receiptEl);
        receiptEl.appendChild(h('div', { class: 'lb-rc-head' }, 'GIFT SHOP OF NOTHING', h('br'), h('small', {}, 'Store #7½ · Cashier: Gerald (Potato)')));
        if (!LB.receipts.length) receiptEl.appendChild(h('p', { class: 'lb-rc-empty' }, 'No purchases yet. This receipt is a receipt for nothing, and is already complete.'));
        let total = 0;
        LB.receipts.forEach(function (r) { total += r.price; receiptEl.appendChild(h('div', { class: 'lb-rc-line' }, h('span', {}, '1 × ' + LB.trunc(r.name, 26)), h('i', {}), h('b', {}, LB.fmt(r.price)))); });
        receiptEl.appendChild(h('div', { class: 'lb-rc-line lb-rc-total' }, h('span', {}, 'TAX (IMAGINARY)'), h('i', {}), h('b', {}, '0')));
        receiptEl.appendChild(h('div', { class: 'lb-rc-line lb-rc-total' }, h('span', {}, 'TOTAL'), h('i', {}), h('b', {}, LB.fmt(total))));
        receiptEl.appendChild(h('p', { class: 'lb-rc-foot' }, 'THANK YOU FOR SHOPPING AT NOTHING. PLEASE RETAIN THIS RECEIPT FOR ITS OWN PROTECTION.'));
      }
      build(false);
      paintReceipt();
      let t = 0;
      ctx.on('meh', function () { if (t) return; t = NAT.setTimeout(function () { t = 0; if (ctx.isOpen()) paintAll(); }, 600); });
      ctx.on('ascend', function () { build(true); });
      ctx.on('reset', function () { build(false); paintReceipt(); });
      ctx.on('import', function () { build(false); paintReceipt(); });
      ctx.onDispose(function () { if (t) NAT.clearTimeout(t); });
    }
  });
})();
