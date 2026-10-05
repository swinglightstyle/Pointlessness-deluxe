/* POINTLESS ui 45: the module grid - search, category tabs, Surprise Me, locked/unlock, paging (bounded DOM, fast with 100+ modules).
 * Reads P.modules at render time, so content registered by any file shows up. LB.parts.grid has the controls. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;
  const PAGE = 36;

  LB.enterModule = function (id) {
    const y = window.scrollY || 0;
    const r = P.host.enter(id);
    if (r && r.ok) { LB.savedScroll = y; LB.lastModuleId = id; try { window.scrollTo(0, 0); } catch (e) { /* ignore */ } }
    else if (r && r.reason === 'locked') LB.say(LB.line('lockedTease', { module: LB.moduleTitle(id) }), { priority: 1, mood: 'smug' });
    return r;
  };

  LB.buildGrid = function (container) {
    let filter = 'all', query = '', lastEmptyQuery = '', surprising = false, renderTimer = 0, affTimer = 0;
    const teases = {};
    let lockedCards = [];

    const search = h('input', { type: 'search', class: 'lb-search', id: 'lb-search', placeholder: 'Search departments, games, feelings…', maxlength: '60', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Search the module list' });
    /* the long placeholder is cut off on phones: use a short one there */
    try {
      const mq = window.matchMedia('(max-width: 600px)');
      const paintPh = function () { search.placeholder = mq.matches ? 'Search…' : 'Search departments, games, feelings…'; };
      paintPh();
      if (mq.addEventListener) NAT.add(mq, 'change', paintPh);
    } catch (e) { /* ignore */ }
    const clearBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-small lb-search-clear', hidden: true, 'aria-label': 'Clear search' }, '✕');
    const surpriseBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-primary lb-surprise' }, '🎲 Surprise Me');
    const tabsEl = h('div', { class: 'lb-tabs', role: 'group', 'aria-label': 'Filter by category' });
    const tabBtns = {};
    [['all', 'All'], ['game', 'Games'], ['department', 'Departments'], ['locked', 'Locked']].forEach(function (t) {
      const b = h('button', { type: 'button', class: 'lb-tab', 'aria-pressed': t[0] === 'all' ? 'true' : 'false', 'data-tab': t[0] });
      b.appendChild(h('span', { class: 'lb-tab-name' }, t[1]));
      b.appendChild(h('span', { class: 'lb-tab-n' }, '0'));
      NAT.add(b, 'click', function () { setFilter(t[0]); });
      tabBtns[t[0]] = b; tabsEl.appendChild(b);
    });
    const toolbar = h('div', { class: 'lb-toolbar' },
      h('div', { class: 'lb-searchbox' }, h('span', { class: 'lb-search-ico', 'aria-hidden': 'true' }, '🔎'), search, clearBtn), surpriseBtn);
    const count = h('p', { class: 'lb-count', 'aria-live': 'polite' });
    const grid = h('ul', { class: 'lb-grid', 'aria-label': 'Departments and games' });
    const pager = LB.makePager(function () { render(true); try { toolbar.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ } });
    container.appendChild(h('div', { class: 'lb-modbar' }, toolbar, tabsEl));
    container.appendChild(count);
    container.appendChild(grid);
    container.appendChild(pager.el);

    function hash(s) { return P.util.hashStr(s); }
    function matches(m, terms) {
      if (!terms.length) return true;
      const hay = m._hay || (m._hay = (m.title + ' ' + m.tagline + ' ' + m.tags.join(' ') + ' ' + m.id.replace(/-/g, ' ') + ' ' + (m.category === 'department' ? 'department' : 'game')).toLowerCase());
      for (let i = 0; i < terms.length; i++) if (hay.indexOf(terms[i]) < 0) return false;
      return true;
    }
    function compute() {
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const all = P.modules;
      const counts = { all: 0, game: 0, department: 0, locked: 0 };
      const list = [];
      for (let i = 0; i < all.length; i++) {
        const m = all[i];
        if (!matches(m, terms)) continue;
        const locked = !P.state.isModuleUnlocked(m.id);
        counts.all++; counts[m.category]++; if (locked) counts.locked++;
        if (filter === 'all' || (filter === 'locked' ? locked : m.category === filter)) list.push(m);
      }
      return { list: list, counts: counts };
    }
    function fmtStats(m) {
      const n = P.state.stat.get(m.id + '.entered');
      if (!n) return h('span', { class: 'lb-card-stats' }, 'Not yet visited');
      const sec = P.state.stat.get(m.id + '.seconds');
      return h('span', { class: 'lb-card-stats' }, 'Visited ' + LB.fmt(n) + '× · ' + (sec >= 1 ? LB.fmtDur(sec) : 'under a second'));
    }
    function buildCard(m) {
      const locked = !P.state.isModuleUnlocked(m.id);
      const hs = hash(m.id);
      const price = m.unlockCost;
      const visited = P.state.stat.get(m.id + '.entered') > 0;
      let tag = m.tagline || 'No description. Management trusts you.';
      if (locked) tag = teases[m.id] || (teases[m.id] = LB.line('lockedTease', { module: m.title }));
      const btn = h('button', { type: 'button', class: 'lb-card-btn' },
        h('span', { class: 'lb-card-ico', 'aria-hidden': 'true' }, locked ? '🔒' : m.icon),
        h('span', { class: 'lb-card-body' }, h('span', { class: 'lb-card-title' }, m.title), h('span', { class: 'lb-card-tag' }, tag)));
      btn.setAttribute('aria-label', locked ? 'Unlock ' + m.title + ' for ' + LB.fmt(price) + ' Meh' : 'Open ' + m.title);
      const foot = h('div', { class: 'lb-card-foot' },
        h('span', { class: 'lb-cat lb-cat-' + m.category }, m.category === 'department' ? 'Department' : 'Game'));
      m.tags.slice(0, 2).forEach(function (t) { foot.appendChild(h('span', { class: 'lb-tagchip' }, LB.trunc(t, 14))); });
      if (locked) foot.appendChild(h('span', { class: 'lb-price' }, LB.fmt(price) + ' Meh'));
      else foot.appendChild(fmtStats(m));
      const li = h('li', { class: 'lb-card lb-h' + (hs % 5) + (locked ? ' lb-locked' : '') + (!locked && !visited ? ' lb-fresh' : ''), 'data-id': m.id, style: { '--tilt': (((hs >> 3) % 7) - 3) * 0.2 + 'deg' } },
        !locked && !visited ? h('span', { class: 'lb-new', 'aria-hidden': 'true' }, 'NEW') : null, btn, foot);
      NAT.add(btn, 'click', function () { cardClick(m, li); });
      if (locked) lockedCards.push({ el: li, price: price });
      return li;
    }
    function cardClick(m, li) {
      if (P.state.isModuleUnlocked(m.id)) { LB.sfx('blip'); LB.enterModule(m.id); return; }
      const r = P.state.unlockModule(m.id);
      if (r.ok) {
        LB.sfx('ding');
        const rc = li.getBoundingClientRect();
        LB.confetti(rc.left + rc.width / 2, rc.top + rc.height / 2, 50);
        LB.say(LB.bag('unlockOk', LB.text.unlockOk, { module: m.title }), { priority: 1, mood: 'proud' });
        LB.toast(m.title + ' unlocked', { icon: '🔓', title: 'Door opened' });
        render(true);
      } else {
        LB.sfx('error');
        li.classList.remove('lb-shake'); void li.offsetWidth; li.classList.add('lb-shake');
        LB.say(LB.bag('unlockPoor', LB.text.unlockPoor, { count: r.short }), { priority: 1, mood: 'disappointed' });
        LB.toast('Short by ' + LB.fmt(r.short) + ' Meh', { icon: '🔒', title: m.title });
      }
    }

    function render(keepPage) {
      renderTimer = 0;
      const c = compute();
      Object.keys(tabBtns).forEach(function (k) { tabBtns[k].lastChild.textContent = String(c.counts[k]); });
      pager.setTotal(c.list.length, PAGE, keepPage);
      lockedCards = [];
      LB.clear(grid);
      const from = pager.page * PAGE;
      const frag = document.createDocumentFragment();
      for (let i = from; i < Math.min(c.list.length, from + PAGE); i++) frag.appendChild(buildCard(c.list[i]));
      grid.appendChild(frag);
      const total = P.modules.length;
      if (!total) {
        count.textContent = 'No departments are open.';
        grid.appendChild(h('li', { class: 'lb-grid-empty' }, LB.emptyState('🏢', 'Management is between departments.', LB.line('nothing'))));
      } else if (!c.list.length) {
        count.textContent = 'Showing 0 of ' + total;
        const msg = query ? 'No match for "' + LB.trunc(query, 28) + '". ' + LB.line('error404') : (filter === 'locked' ? 'Nothing is locked. Everything is open, which is its own kind of unsettling.' : LB.line('error404'));
        grid.appendChild(h('li', { class: 'lb-grid-empty' }, LB.emptyState('🔭', msg), query ? h('button', { type: 'button', class: 'lb-btn lb-btn-small', onclick: function () { setQuery('', true); } }, 'Clear search') : null));
        if (query && query !== lastEmptyQuery) { lastEmptyQuery = query; LB.stat('lobby.emptySearches'); }
      } else {
        count.textContent = 'Showing ' + (from + 1) + '–' + Math.min(c.list.length, from + PAGE) + ' of ' + c.list.length + (c.counts.locked ? ' · ' + c.counts.locked + ' locked' : '') + (total !== c.counts.all ? ' (' + total + ' in the building)' : '');
      }
      paintAffordable();
    }
    function schedule() { if (renderTimer) NAT.clearTimeout(renderTimer); renderTimer = NAT.setTimeout(function () { render(false); }, 70); }
    function setFilter(f) {
      filter = f;
      Object.keys(tabBtns).forEach(function (k) { tabBtns[k].setAttribute('aria-pressed', k === f ? 'true' : 'false'); tabBtns[k].classList.toggle('lb-on', k === f); });
      render(false);
    }
    function setQuery(q, fromClear) {
      query = String(q || '').slice(0, 60);
      if (fromClear) search.value = '';
      clearBtn.hidden = !query;
      if (fromClear) render(false); else schedule();
    }
    NAT.add(search, 'input', function () { setQuery(search.value, false); });
    NAT.add(search, 'keydown', function (e) { if (e.key === 'Escape' && search.value) { e.stopPropagation(); setQuery('', true); } });
    NAT.add(clearBtn, 'click', function () { setQuery('', true); try { search.focus(); } catch (e) { /* ignore */ } });
    tabBtns.all.classList.add('lb-on');

    function paintAffordable() {
      affTimer = 0;
      const meh = P.state.getMeh();
      lockedCards.forEach(function (c) { c.el.classList.toggle('lb-afford', meh + 1e-9 >= c.price); });
    }
    const offMeh = P.on('meh', function () { if (!affTimer && lockedCards.length) affTimer = NAT.setTimeout(paintAffordable, 500); });
    const offUnlocked = P.on('unlocked', function () { schedule(); });
    const offReg = P.on('module:registered', function () { schedule(); });

    function go(m) { LB.enterModule(m.id); }
    function surprise() {
      if (surprising) return;
      const pool = P.modules.filter(function (m) { return P.state.isModuleUnlocked(m.id); });
      if (!pool.length) {
        LB.sfx('error');
        LB.say(LB.bag('surpriseNone', LB.text.surpriseNone), { priority: 1, mood: 'confused' });
        return;
      }
      LB.stat('lobby.surprises');
      const target = LB.pick(pool);
      LB.say(LB.line('loading'), { priority: 1, mood: 'smug' });
      if (LB.reduced() || LB.isFuzz() || pool.length === 1) { LB.sfx('tada'); go(target); return; }
      surprising = true;
      surpriseBtn.disabled = true;
      let n = 0;
      (function tick() {
        if (P.host.current) { surprising = false; surpriseBtn.disabled = false; surpriseBtn.textContent = '🎲 Surprise Me'; return; }
        if (n < 9) {
          const m = LB.pick(pool);
          surpriseBtn.textContent = m.icon + ' ' + LB.trunc(m.title, 20) + '…';
          LB.sfx('tick');
          n++;
          NAT.setTimeout(tick, 70 + n * 18);
        } else {
          surprising = false; surpriseBtn.disabled = false; surpriseBtn.textContent = '🎲 Surprise Me';
          LB.sfx('tada');
          go(target);
        }
      })();
    }
    NAT.add(surpriseBtn, 'click', surprise);

    render(false);
    LB.parts.grid = {
      render: function (keep) { render(keep !== false); },
      focusSearch: function () { try { search.focus(); search.select(); } catch (e) { /* ignore */ } },
      surprise: surprise,
      setQuery: function (q) { search.value = q; setQuery(q, false); },
      destroy: function () { offMeh(); offUnlocked(); offReg(); }
    };
    LB.registerRefresh(function () { Object.keys(teases).forEach(function (k) { delete teases[k]; }); render(false); });
    return LB.parts.grid;
  };
})();
