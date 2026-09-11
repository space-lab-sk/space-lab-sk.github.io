/* ============================================================
   SPACE::LAB — inline content editing
   Toggle edit mode, click any [data-edit] element to edit in
   place; changes persist in the browser (localStorage).
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'spacelab-content-v1';
  var pageKey = location.pathname.split('/').pop() || 'index.html';

  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveStore(store) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
  }

  var store = loadStore();
  var editables = Array.prototype.slice.call(document.querySelectorAll('[data-edit]'));

  /* ---- Restore saved content ---- */
  editables.forEach(function (el) {
    var key = el.getAttribute('data-edit');
    if (store[pageKey] && typeof store[pageKey][key] === 'string') {
      el.innerHTML = store[pageKey][key];
    }
  });

  /* ---- Build chrome ---- */
  var fab = document.createElement('button');
  fab.className = 'edit-fab';
  fab.setAttribute('aria-label', 'Toggle edit mode');
  fab.innerHTML = '<span class="dot"></span><span class="edit-fab-label">Edit content</span>';

  var tools = document.createElement('div');
  tools.className = 'edit-tools';
  tools.innerHTML =
    '<button data-act="reset">Reset this page</button>' +
    '<button data-act="export">Export content (JSON)</button>' +
    '<button data-act="done">Done editing</button>';

  var toast = document.createElement('div');
  toast.className = 'edit-toast';
  document.body.appendChild(fab);
  document.body.appendChild(tools);
  document.body.appendChild(toast);

  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1600);
  }

  /* ---- Edit mode toggling ---- */
  var editing = false;
  function setEditing(on) {
    editing = on;
    document.body.classList.toggle('editing', on);
    fab.querySelector('.edit-fab-label').textContent = on ? 'Editing — click text' : 'Edit content';
    editables.forEach(function (el) {
      if (on) {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('spellcheck', 'false');
      } else {
        el.removeAttribute('contenteditable');
      }
    });
    if (on) showToast('Edit mode on — click any text to change it');
  }

  fab.addEventListener('click', function () { setEditing(!editing); });

  /* ---- Persist on input ---- */
  var saveTimer;
  function persist(el) {
    var key = el.getAttribute('data-edit');
    store[pageKey] = store[pageKey] || {};
    store[pageKey][key] = el.innerHTML;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { saveStore(store); showToast('Saved'); }, 500);
  }

  editables.forEach(function (el) {
    el.addEventListener('input', function () { persist(el); });
    // Paste as plain text to keep markup clean
    el.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text);
    });
    // Prevent navigation when editing links/cards
    el.addEventListener('click', function (e) {
      if (editing) { e.preventDefault(); e.stopPropagation(); }
    });
  });

  /* ---- Tool actions ---- */
  tools.addEventListener('click', function (e) {
    var act = e.target.getAttribute && e.target.getAttribute('data-act');
    if (!act) return;
    if (act === 'done') {
      setEditing(false);
    } else if (act === 'reset') {
      if (confirm('Reset all edits on this page back to the original content?')) {
        if (store[pageKey]) { delete store[pageKey]; saveStore(store); }
        location.reload();
      }
    } else if (act === 'export') {
      var data = JSON.stringify(store, null, 2);
      var blob = new Blob([data], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'spacelab-content.json';
      a.click();
      URL.revokeObjectURL(a.href);
      showToast('Exported content as JSON');
    }
  });
})();
