/* POINTLESS ui 61: Trophy Cabinet - every achievement, locked/secret states ("???"), progress, filters, paging. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;
  const PAGE = 30;

  function source(d) {
    if (d.module && P.moduleMap[d.module]) return P.moduleMap[d.module].title;
    if (d.module === 'lobby') return 'Lobby';
    return d.module ? LB.prettify(d.module) : 'General';
  }

  LB.registerScreen('trophies', {
    title: 'Trophy Cabinet', icon: '🏆', wide: true,
    render: function (body, ctx) {
      let state = 'all', group = '__all';
      const prog = h('p', { class: 'lb-trophy-count' });
      const bar = h('span', { class: 'lb-bar' }, h('i', { class: 'lb-bar-fill' }));
      const note = h('p', { class: 'lb-trophy-note' });
      const chips = LB.chipGroup('Trophy filter', [{ value: 'all', label: 'All' }, { value: 'unlocked', label: 'Unlocked' }, { value: 'locked', label: 'Locked' }, { value: 'secret', label: 'Secret' }], 'all', function (v) { state = v; build(false); });
      const sel = h('select', { class: 'lb-input lb-trophy-group', 'aria-label': 'Show trophies from' });
      const grid = h('ul', { class: 'lb-trophy-grid', 'aria-label': 'Trophies' });
      const pager = LB.makePager(function () { build(true); });
      body.appendChild(h('div', { class: 'lb-trophy-top' }, h('div', { class: 'lb-trophy-sum' }, prog, bar, note), h('div', { class: 'lb-trophy-filters' }, chips.el, sel)));
      body.appendChild(grid);
      body.appendChild(pager.el);

      function groups() {
        const seen = {}, out = [];
        P.achievementOrder.forEach(function (id) { const s = source(P.achievementMap[id]); if (!seen[s]) { seen[s] = 1; out.push(s); } });
        return out.sort();
      }
      function fillGroups() {
        LB.clear(sel);
        sel.appendChild(h('option', { value: '__all' }, 'From everywhere'));
        groups().forEach(function (g) { sel.appendChild(h('option', { value: g }, g)); });
        sel.value = group;
        if (sel.value !== group) { group = '__all'; sel.value = '__all'; }
      }
      NAT.add(sel, 'change', function () { group = sel.value || '__all'; build(false); });

      function sorted() {
        const all = P.achievementOrder.map(function (id) { return P.achievementMap[id]; }).filter(Boolean);
        const un = all.filter(function (d) { return P.state.ach.isUnlocked(d.id); }).sort(function (a, b) { return P.state.ach.unlockedAt(b.id) - P.state.ach.unlockedAt(a.id); });
        const lk = all.filter(function (d) { return !P.state.ach.isUnlocked(d.id) && !d.secret; });
        const sc = all.filter(function (d) { return !P.state.ach.isUnlocked(d.id) && d.secret; });
        return un.concat(lk, sc);
      }
      function tile(d) {
        const got = P.state.ach.isUnlocked(d.id);
        const hidden = !got && d.secret;
        const li = h('li', { class: 'lb-trophy' + (got ? ' lb-got' : ' lb-lockedtrophy') + (hidden ? ' lb-secret' : ''), 'data-id': d.id },
          h('div', { class: 'lb-trophy-ico', 'aria-hidden': 'true' }, hidden ? '❓' : d.icon),
          h('div', { class: 'lb-trophy-body' },
            h('h4', { class: 'lb-trophy-name' }, hidden ? '???' : d.name),
            h('p', { class: 'lb-trophy-desc' }, hidden ? 'A secret trophy. Management refuses to explain, on principle.' : d.desc),
            h('div', { class: 'lb-trophy-meta' },
              h('span', { class: 'lb-tagchip' }, source(d)),
              got ? h('span', { class: 'lb-trophy-date' }, 'Unlocked ' + LB.dateStr(P.state.ach.unlockedAt(d.id)))
                : (hidden ? h('span', { class: 'lb-trophy-date' }, 'Locked, mysteriously') : h('span', { class: 'lb-trophy-date' }, 'Locked')),
              d.reward > 0 && !hidden ? h('span', { class: 'lb-trophy-reward' }, '+' + LB.fmt(d.reward) + ' Meh') : null)));
        return li;
      }
      function build(keep) {
        const total = P.achievementOrder.length, n = P.state.ach.count();
        prog.textContent = n + ' of ' + total + ' ' + LB.plural(total, 'trophy', 'trophies') + (total ? ' (' + Math.min(100, Math.floor(n / total * 100)) + '%)' : '');
        bar.firstChild.style.width = (total ? Math.min(100, Math.round(n / total * 100)) : 0) + '%';
        note.textContent = !total ? 'The cabinet is empty. It has been polished anyway.' : n === 0 ? 'No trophies yet. The cabinet is patient, and has glass.' : n >= total ? 'Complete. The cabinet is full, which is impossible, and has been noted.' : 'Completion: technically in progress.';
        const list = sorted().filter(function (d) {
          const got = P.state.ach.isUnlocked(d.id);
          if (state === 'unlocked' && !got) return false;
          if (state === 'locked' && got) return false;
          if (state === 'secret' && !d.secret) return false;
          if (group !== '__all' && source(d) !== group) return false;
          return true;
        });
        pager.setTotal(list.length, PAGE, keep);
        LB.clear(grid);
        const from = pager.page * PAGE;
        const frag = document.createDocumentFragment();
        for (let i = from; i < Math.min(list.length, from + PAGE); i++) frag.appendChild(tile(list[i]));
        grid.appendChild(frag);
        if (!list.length) grid.appendChild(h('li', { class: 'lb-grid-empty' }, LB.emptyState('🏆', 'Nothing here.', LB.line('nothing'))));
      }
      fillGroups();
      build(false);
      LB.flag('lobby.trophiesSeen', P.state.ach.count());
      if (LB.parts.header) LB.parts.header.paintBadge();
      ctx.on('achievement', function () {
        LB.flag('lobby.trophiesSeen', P.state.ach.count());
        if (LB.parts.header) LB.parts.header.paintBadge();
        fillGroups(); build(true);
      });
      ctx.on('reset', function () { fillGroups(); build(false); });
      ctx.on('import', function () { fillGroups(); build(false); });
    }
  });
})();
