/* POINTLESS ui 63: Settings (Decorative) + Save Tools.
 * Real: player name, mute, reduce motion, Management panel, export/import, 5-step hard reset (all in-page, no confirm()).
 * Decorative: built-ins plus every P.addSettings entry; touching one only makes Management react. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  LB.switchEl = function (o) {
    const input = h('input', { type: 'checkbox', class: 'lb-switch-input', role: 'switch', checked: !!o.checked });
    if (o.id) input.id = o.id;
    const label = h('label', { class: 'lb-switch' }, input, h('span', { class: 'lb-switch-ui', 'aria-hidden': 'true' }, h('i')), h('span', { class: 'lb-switch-label' }, o.label));
    NAT.add(input, 'change', function () { if (o.onChange) o.onChange(input.checked, input); });
    return { el: label, input: input };
  };

  const DECOR = [
    { id: 'lobby.d.difficulty', label: 'Difficulty', type: 'select', options: ['Yes', 'No', 'Maybe', 'Per policy', 'Tuesday'], default: 'Yes',
      responses: ['Difficulty set to {value}. Management has chosen "{value}" as the answer to a question nobody asked.', 'Difficulty is now "{value}". There was nothing to be difficult about. We are keeping it that way.', '"{value}". An interesting choice. It has been noted by someone who is no longer here.'] },
    { id: 'lobby.d.meaning', label: 'Meaning of Life', type: 'slider', min: 0, max: 100, default: 42,
      responses: ['Meaning of Life set to {count}. Management feels clarified, in a way that cannot be described.', 'At {count}, the meaning of life is "mostly fine". Please do not tell the others.', 'Meaning set to {count}. The previous meaning has been recycled into a smaller meaning.'] },
    { id: 'lobby.d.fun', label: 'Mandatory Fun', type: 'toggle', default: true, sticky: true,
      responses: ['Mandatory Fun cannot be disabled. It has been re-enabled for your convenience.', 'You may not turn off Mandatory Fun. It is not a setting. It is a mood with a policy number.'] },
    { id: 'lobby.d.graphics', label: 'Graphics Quality', type: 'select', options: ['Technically graphical', 'Squint', 'Imaginary', 'Surprisingly crisp'], default: 'Technically graphical',
      responses: ['Graphics now "{value}". Nothing changed. The graphics were consulted.', '"{value}" applied. You may notice a difference. You will not, but you may.'] },
    { id: 'lobby.d.notif', label: 'Notifications about notifications', type: 'toggle', default: true,
      responses: ['You will now be notified when you are notified. A notification about this has been sent.', 'Notification preference saved. Management has been notified of the saving.'] },
    { id: 'lobby.d.tuesday', label: 'Tuesday Protection', type: 'toggle', default: false,
      responses: ['Tuesday Protection toggled. Tuesday has been informed, and does not respect it.', 'Protection against Tuesday is now a feeling. It is a good feeling. It will not help.'] },
    { id: 'lobby.d.humidity', label: 'Lobby Humidity', type: 'slider', min: 0, max: 100, default: 55,
      responses: ['Humidity set to {count} percent. Dennis (Plant) leans in, then pretends he did not.', 'Humidity is {count}%. The ficus has opinions and has submitted them in leaf form.'] },
    { id: 'lobby.d.circle', label: 'Allow Management to circle back', type: 'toggle', default: true,
      responses: ['Management will circle back. It has been circling since before you asked.', 'Circling back has been permitted. Management will do so to a place it has never been.'] },
    { id: 'lobby.d.font', label: 'Sandra\'s preferred font', type: 'select', options: ['Serif (disapproved)', 'Sans-serif (approved on Tuesdays)', 'Handwriting (reviewed)', 'Wingdings (frightening)'], default: 'Sans-serif (approved on Tuesdays)',
      responses: ['Sandra from Compliance has noted your font preference. She has flagged it. She has also flagged the flag.', '"{value}" selected. Sandra has said nothing, loudly.'] }
  ];

  function optLabel(o) { return typeof o === 'string' ? o : (o && o.label != null ? String(o.label) : ''); }
  function optValue(o) { return typeof o === 'string' ? o : (o && o.value != null ? String(o.value) : ''); }

  function react(def, value) {
    const resp = def.responses && def.responses.length ? LB.bag('set-' + def.id, def.responses) : 'Setting changed. Management has felt it, faintly.';
    const shown = def.type === 'select' ? optLabel((def.options || []).filter(function (o) { return optValue(o) === String(value); })[0] || value) : value;
    LB.say(resp.replace(/\{value\}/g, String(shown)), { priority: 1, mood: 'smug', count: Number(value) || 0 });
    LB.stat('lobby.settingsTouched');
    LB.achieve('lobby.settings');
  }

  function buildDecorRow(def, ctx) {
    const cur = P.state.setting.get(def.id, def.default);
    const id = 'lb-set-' + def.id.replace(/[^a-z0-9]/gi, '-');
    if (def.type === 'slider') {
      const val = h('output', { class: 'lb-slider-val', for: id }, String(cur));
      const input = h('input', { type: 'range', class: 'lb-range', id: id, min: String(def.min), max: String(def.max), value: String(Number(cur) || 0) });
      let t = 0;
      NAT.add(input, 'input', function () { val.textContent = input.value; });
      NAT.add(input, 'change', function () { P.state.setting.set(def.id, Number(input.value)); react(def, Number(input.value)); LB.sfx('tick'); });
      void t;
      return h('div', { class: 'lb-set-row' }, h('label', { class: 'lb-label', for: id }, def.label), h('div', { class: 'lb-set-ctl' }, input, val));
    }
    if (def.type === 'select') {
      const sel = h('select', { class: 'lb-input', id: id }, (def.options || []).map(function (o) { return h('option', { value: optValue(o) }, optLabel(o)); }));
      sel.value = String(cur);
      const paintTitle = function () { const o = sel.options[sel.selectedIndex]; sel.title = o ? o.textContent : ''; };     // long options are clipped: the full text is the tooltip
      paintTitle();
      NAT.add(sel, 'change', function () { paintTitle(); P.state.setting.set(def.id, sel.value); react(def, sel.value); LB.sfx('blip'); });
      return h('div', { class: 'lb-set-row' }, h('label', { class: 'lb-label', for: id }, def.label), h('div', { class: 'lb-set-ctl' }, sel));
    }
    const sw = LB.switchEl({ id: id, label: def.label, checked: !!cur, onChange: function (on, input) {
      P.state.setting.set(def.id, on);
      react(def, on);
      LB.sfx(on ? 'ding' : 'bloop');
      if (def.sticky && !on) ctx.later(function () { input.checked = true; P.state.setting.set(def.id, true); LB.sfx('buzz'); }, 450);
    } });
    return h('div', { class: 'lb-set-row lb-set-row-toggle' }, sw.el);
  }

  /* ---------------- save tools: export / import / hard reset ---------------- */
  LB.afterImport = function () {
    LB.refreshAll();
    LB.toast('Save imported. Welcome back, ' + LB.player() + '.', { icon: '💾', title: 'Import complete' });
    LB.say('Your save has been imported. Everything is where you left it, plus a faint smell of paperwork.', { priority: 2, mood: 'proud' });
  };
  LB.afterReset = function () {
    LB.stat('lobby.resets');
    LB.closeScreen('reset');
    LB.refreshAll();
    LB.achieve('lobby.reset');
    LB.sfx('whoosh');
    LB.toast('Everything has been erased. Thoroughly.', { icon: '🧼', title: 'Fresh start' });
    LB.say('Everything has been erased. The lobby is exactly as new as it was. Please begin again, with feeling.', { priority: 2, mood: 'confused' });
    LB.later(function () { LB.openScreen('welcome', { quiet: true }); }, 350);
  };

  const RESET_STEPS = [
    { title: 'Are you sure?', text: 'This erases your Meh, trophies, purchases, statistics and name. Dennis (Plant) will be fine. Dennis is always fine.', yes: 'Yes, erase it', no: 'No, keep it' },
    { title: 'Are you really sure?', text: 'Management has put the kettle on for the occasion. It will have to take it off again, and it is not happy about the lid.', yes: 'I am really sure', no: 'Back out gracefully' },
    { title: 'Please type RESET', text: 'Type the word RESET below. Capital letters are encouraged. A tone of quiet resolve is assumed.', input: true, yes: 'Continue', no: 'Never mind' },
    { title: 'A few acknowledgements', text: 'Please tick each box. Each box has been waiting a long time to be ticked.', checks: ['I have considered the consequences', 'I have informed Dennis (Plant)', 'I understand that Tuesday is coming regardless'], yes: 'Continue', no: 'Retreat' },
    { title: 'Last chance', text: 'This is the real button. It looks like the other buttons, because buttons do. After this, there is nothing, and then a welcome screen.', yes: 'Erase everything, thoroughly', no: 'Keep my nothing', danger: true }
  ];

  LB.buildSaveTools = function (container, ctx) {
    /* export */
    const exportArea = h('textarea', { class: 'lb-textarea', rows: '3', readOnly: true, placeholder: 'Press "Generate save text" and your progress appears here as one confident line.', 'aria-label': 'Exported save text' });
    const exportMsg = h('p', { class: 'lb-note-line', 'aria-live': 'polite' });
    const genBtn = h('button', { type: 'button', class: 'lb-btn' }, '📤 Generate save text');
    const copyBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, 'Copy');
    NAT.add(genBtn, 'click', function () {
      exportArea.value = P.state.exportSave();
      exportMsg.textContent = 'Generated. ' + exportArea.value.length + ' characters of you. Keep them somewhere safe.';
      LB.sfx('pop');
    });
    NAT.add(copyBtn, 'click', function () {
      if (!exportArea.value) exportArea.value = P.state.exportSave();
      try { exportArea.focus(); exportArea.select(); } catch (e) { /* ignore */ }
      let done = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(exportArea.value).then(function () { exportMsg.textContent = 'Copied to the clipboard. It is now in two places, which is twice as safe.'; }, function () { exportMsg.textContent = 'The clipboard declined. The text is selected: press Ctrl+C.'; });
          done = true;
        }
      } catch (e) { /* ignore */ }
      if (!done) exportMsg.textContent = 'The text is selected. Press Ctrl+C to copy it.';
    });
    /* import */
    const importArea = h('textarea', { class: 'lb-textarea', rows: '3', placeholder: 'Paste save text here (starts with PMDX1:)', 'aria-label': 'Save text to import', spellcheck: 'false' });
    const importMsg = h('p', { class: 'lb-note-line', role: 'status', 'aria-live': 'polite' });
    const importBtn = h('button', { type: 'button', class: 'lb-btn' }, '📥 Import save');
    NAT.add(importBtn, 'click', function () {
      const r = P.state.importSave(importArea.value);
      if (r.ok) { importMsg.textContent = 'Imported. You are now whoever the save says you are.' + (r.warning ? ' ' + r.warning : ''); importArea.value = ''; LB.afterImport(); }
      else { importMsg.textContent = r.error || 'The import was declined.'; LB.sfx('error'); }
    });
    /* hard reset */
    const resetBox = h('div', { class: 'lb-reset' });
    let step = -1;
    function resetPaint() {
      LB.clear(resetBox);
      if (step < 0) {
        const start = h('button', { type: 'button', class: 'lb-btn lb-btn-danger' }, '🧨 Begin hard reset (5 steps)');
        NAT.add(start, 'click', function () { step = 0; LB.sfx('blip'); resetPaint(); });
        resetBox.appendChild(h('p', { class: 'lb-note-line' }, 'Erases everything, with five opportunities to change your mind. There is no undo. Export first if in doubt.'));
        resetBox.appendChild(start);
        return;
      }
      const s = RESET_STEPS[step];
      const dots = h('div', { class: 'lb-steps', role: 'img', 'aria-label': 'Step ' + (step + 1) + ' of 5' });
      for (let i = 0; i < 5; i++) dots.appendChild(h('i', { class: i < step ? 'lb-done' : (i === step ? 'lb-now' : '') }));
      resetBox.appendChild(dots);
      resetBox.appendChild(h('h4', { class: 'lb-reset-title' }, 'Step ' + (step + 1) + ' of 5: ' + s.title));
      resetBox.appendChild(h('p', {}, s.text));
      let input = null, boxes = [];
      const err = h('p', { class: 'lb-refund-err', role: 'alert' });
      if (s.input) { input = h('input', { type: 'text', class: 'lb-input', maxlength: '12', placeholder: 'RESET', autocomplete: 'off', 'aria-label': 'Type RESET' }); resetBox.appendChild(input); }
      if (s.checks) s.checks.forEach(function (c, i) {
        const b = h('input', { type: 'checkbox', class: 'lb-checkbox', id: 'lb-rs-' + i });
        boxes.push(b);
        resetBox.appendChild(h('label', { class: 'lb-check-row', for: 'lb-rs-' + i }, b, ' ' + c));
      });
      resetBox.appendChild(err);
      const yes = h('button', { type: 'button', class: 'lb-btn ' + (s.danger ? 'lb-btn-danger' : 'lb-btn-primary') }, s.yes);
      const no = h('button', { type: 'button', class: 'lb-btn' }, s.no);
      resetBox.appendChild(h('div', { class: 'lb-actions' }, yes, no));
      NAT.add(yes, 'click', function () {
        if (input && String(input.value).trim().toUpperCase() !== 'RESET') { err.textContent = 'That is not RESET. It is close to RESET, but Management needs RESET.'; LB.sfx('buzz'); return; }
        if (boxes.length && !boxes.every(function (b) { return b.checked; })) { err.textContent = 'There are unticked boxes. They have noticed.'; LB.sfx('buzz'); return; }
        if (step >= RESET_STEPS.length - 1) { step = -1; P.state.reset(); LB.afterReset(); return; }
        step++; LB.sfx('blip'); resetPaint();
        const nx = resetBox.querySelector('button, input'); void nx;
      });
      NAT.add(no, 'click', function () {
        step = -1; LB.sfx('ding'); resetPaint();
        LB.say('Reset cancelled. Everything you have is still yours. Management exhales, in text.', { priority: 1, mood: 'proud' });
      });
    }
    resetPaint();
    const reload = function () { resetPaint(); };
    if (ctx) { ctx.on('reset', reload); }

    container.appendChild(h('section', { class: 'lb-panel' }, LB.sectionTitle('Export', 'Your save is a single line of text. It contains you, minus the parts that are Meh.'),
      exportArea, h('div', { class: 'lb-actions' }, genBtn, copyBtn), exportMsg));
    /* the unreadable save that was set aside at load (if any): it can be copied out and kept, instead of living in a drawer nobody can open */
    const backupText = (function () { try { return P.state.corruptBackup(); } catch (e) { return ''; } })();
    if (backupText) {
      const bArea = h('textarea', { class: 'lb-textarea', rows: '3', readOnly: true, 'aria-label': 'The unreadable save that was set aside', spellcheck: 'false' });
      bArea.value = backupText.length > 200000 ? backupText.slice(0, 200000) : backupText;
      const bMsg = h('p', { class: 'lb-note-line', 'aria-live': 'polite' }, backupText.length + ' characters, exactly as they were found.');
      const bCopy = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, 'Select and copy');
      NAT.add(bCopy, 'click', function () {
        try { bArea.focus(); bArea.select(); } catch (e) { /* ignore */ }
        try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(bArea.value).then(function () { bMsg.textContent = 'Copied. Keep it somewhere safe; a person who knows JSON may be able to repair it.'; }, function () { bMsg.textContent = 'The text is selected: press Ctrl+C.'; }); else bMsg.textContent = 'The text is selected: press Ctrl+C.'; }
        catch (e) { bMsg.textContent = 'The text is selected: press Ctrl+C.'; }
      });
      container.appendChild(h('section', { class: 'lb-panel' }, LB.sectionTitle('The unreadable save', 'Set aside when the game could not read it. It is still here, in its drawer.'), bArea, h('div', { class: 'lb-actions' }, bCopy), bMsg));
    }
    container.appendChild(h('section', { class: 'lb-panel' }, LB.sectionTitle('Import', 'Paste a save from another place, tab or time. The current progress will be replaced.'),
      importArea, h('div', { class: 'lb-actions' }, importBtn), importMsg));
    container.appendChild(h('section', { class: 'lb-panel lb-panel-danger' }, LB.sectionTitle('Danger Zone', 'Hard reset: erases everything.'), resetBox));
  };

  /* ---------------- screens ---------------- */
  LB.registerScreen('savetools', {
    title: 'Save Tools', icon: '💾',
    render: function (body, ctx) { LB.buildSaveTools(body, ctx); }
  });

  LB.registerScreen('settings', {
    title: 'Settings (Decorative)', icon: '🎛️', wide: true,
    render: function (body, ctx) {
      /* real settings */
      const nameInput = h('input', { type: 'text', class: 'lb-input', id: 'lb-set-name', maxlength: '24', value: P.state.player.hasName() ? P.state.player.getName() : '', placeholder: 'Valued Employee', autocomplete: 'off' });
      const nameMsg = h('p', { class: 'lb-note-line', 'aria-live': 'polite' }, 'Currently filed as: ' + LB.player());
      const saveName = h('button', { type: 'button', class: 'lb-btn lb-btn-primary' }, 'Save name');
      function applyName() {
        const before = P.state.player.getName();
        const had = P.state.player.hasName();
        const n = P.state.player.setName(nameInput.value);
        nameMsg.textContent = 'Currently filed as: ' + n;
        if (n !== before || had !== P.state.player.hasName()) {
          if (P.state.player.hasName()) { LB.achieve('lobby.name'); LB.say(LB.bag('settingsName', LB.text.settingsName, { player: n }), { priority: 1, mood: 'proud' }); LB.sfx('ding'); }
          else LB.say('You have returned to being Valued Employee. It is a title, and it has been waiting.', { priority: 1, mood: 'smug' });
        }
      }
      NAT.add(saveName, 'click', applyName);
      NAT.add(nameInput, 'keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); applyName(); } });
      const mute = LB.switchEl({ id: 'lb-set-mute', label: 'Mute sound (everything goes quiet)', checked: P.sfx.isMuted(), onChange: function (on) {
        P.sfx.setMuted(on);
        LB.say(on ? 'Muted. The silence has been informed, and is delighted.' : 'Sound restored. Management apologizes to your ears in advance.', { priority: 1, mood: 'neutral' });
      } });
      const motion = LB.switchEl({ id: 'lb-set-motion', label: 'Reduce motion (calmer animations, no scrolling ticker)', checked: LB.reduced(), onChange: function (on) {
        P.state.setting.set('reduceMotion', on);
        LB.say(on ? 'Motion reduced. Things will now hold still and mean it.' : 'Motion restored. Everything may move again, in its own time.', { priority: 1, mood: 'neutral' });
      } });
      const narr = LB.switchEl({ id: 'lb-set-narr', label: 'Collapse the Management panel', checked: P.state.setting.get('narratorCollapsed', false) === true, onChange: function (on) {
        if (LB.parts.narrator) LB.parts.narrator.setCollapsed(on);
        else P.state.setting.set('narratorCollapsed', on);
      } });
      ctx.on('setting', function (e) {
        if (!e) return;
        if (e.id === 'mute') mute.input.checked = !!e.value;
        if (e.id === 'reduceMotion') motion.input.checked = !!e.value;
        if (e.id === 'narratorCollapsed') narr.input.checked = e.value === true;
      });
      body.appendChild(h('div', { class: 'lb-set-cols' },
        h('section', { class: 'lb-panel' }, LB.sectionTitle('Real Settings', 'These actually do something. Management checked.'),
          h('div', { class: 'lb-field' }, h('label', { class: 'lb-label', for: 'lb-set-name' }, 'Your name (up to 24 characters)'), h('div', { class: 'lb-inline' }, nameInput, saveName)), nameMsg,
          h('div', { class: 'lb-set-switches' }, mute.el, motion.el, narr.el)),
        h('section', { class: 'lb-panel' }, LB.sectionTitle('Decorative Settings', 'These do nothing. Management will react as though they matter, which is the setting.'),
          h('div', { class: 'lb-set-list' }, DECOR.concat(P.settingDefs).map(function (d) { return buildDecorRow(d, ctx); })))));
      /* save tools live here too */
      const saveWrap = h('div', { class: 'lb-set-save' });
      LB.buildSaveTools(saveWrap, ctx);
      body.appendChild(h('details', { class: 'lb-details' }, h('summary', {}, '💾 Save tools and Danger Zone (export, import, hard reset)'), saveWrap));
    }
  });
})();
