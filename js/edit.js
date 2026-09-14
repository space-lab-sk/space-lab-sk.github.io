/* ============================================================
   SPACE::LAB — inline content editing (redesign build)
   Click "Edit content", then click any text to change it.
   Edits live in the visitor's own localStorage and never leave
   the browser. "Export content (JSON)" hands the copy back.

   Unlike the previous version this does not need data-edit
   attributes: every text-bearing element gets a stable key
   derived from its position in the document. Elements that do
   carry data-edit keep using that key.
   ============================================================ */
(function () {
  'use strict';

  /* Review mode is opt-in: the editor only loads at ?edit=1. The flag is kept
     for the tab so it survives clicking through to other pages; ?edit=0 exits. */
  var FLAG = 'spacelab-edit-mode';
  try {
    if (/[?&]edit=1(&|$)/.test(location.search)) sessionStorage.setItem(FLAG, '1');
    if (/[?&]edit=0(&|$)/.test(location.search)) sessionStorage.removeItem(FLAG);
    if (sessionStorage.getItem(FLAG) !== '1') return;
  } catch (e) { return; }

  var STORE_KEY = 'spacelab-content-v1';
  var pageKey = location.pathname.split('/').pop() || 'index.html';

  var TEXT_TAGS = 'h1,h2,h3,h4,h5,h6,p,li,dt,dd,td,th,figcaption,blockquote,summary,label';
  var INLINE = { A:1, B:1, I:1, EM:1, STRONG:1, SPAN:1, BR:1, SUP:1, SUB:1, CODE:1,
                 SMALL:1, ABBR:1, TIME:1, U:1, S:1, MARK:1, WBR:1, VAR:1, KBD:1 };
  var SKIP = '.edit-tools,.edit-fab,.edit-toast,script,style,noscript';
  /* navigation labels stay fixed — they are structure, not copy */
  var SKIP_NAV = '.nav,.nav-links,.mobile-menu,.hamburger';

  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveStore(store) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
  }

  /* Stable key from the element's position: body>main>section:2>p:1 */
  function pathKey(el) {
    var parts = [];
    while (el && el !== document.body) {
      var tag = el.tagName.toLowerCase(), i = 1, sib = el;
      while ((sib = sib.previousElementSibling)) if (sib.tagName === el.tagName) i++;
      parts.unshift(i > 1 ? tag + ':' + i : tag);
      el = el.parentElement;
    }
    return parts.join('>');
  }

  /* A block is editable only if every DESCENDANT is inline, so a wrapper
     like div.teasers (three <a> cards, each with its own h4 + p) is rejected
     while an <a> that really wraps only text stays inline. */
  function isLeafText(el) {
    if (!el.textContent.trim()) return false;
    var all = el.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (!INLINE[all[i].tagName]) return false;
    }
    return true;
  }

  var store = loadStore();
  var seen = {};
  var editables = [];

  function collect(el) {
    if (el.closest(SKIP)) return;
    if (el.parentElement && el.parentElement.closest('[data-edit]')) return;
    var key = el.getAttribute('data-edit') || pathKey(el);
    if (seen[key]) return;
    seen[key] = 1;
    el.setAttribute('data-edit', key);
    editables.push(el);
  }

  /* One pass, in document order, so the "already inside an editable" guard
     in collect() always sees the ancestor first. div/span picks up the
     class-based copy: .eyebrow, .stat__val, .badge, .note, .cred … */
  Array.prototype.forEach.call(
    document.querySelectorAll(TEXT_TAGS + ',div,span,[data-edit]'),
    function (el) {
      if (el.closest(SKIP_NAV)) return;
      if (el.hasAttribute('data-edit') || isLeafText(el)) collect(el);
    }
  );

  /* ---- Restore saved content ---- */
  editables.forEach(function (el) {
    var saved = store[pageKey] && store[pageKey][el.getAttribute('data-edit')];
    if (typeof saved === 'string') el.innerHTML = saved;
  });

  /* ---- Chrome ---- */
  var fab = document.createElement('button');
  fab.className = 'edit-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Toggle edit mode');
  fab.innerHTML = '<span class="dot"></span><span class="edit-fab-label">Edit content</span>';

  var tools = document.createElement('div');
  tools.className = 'edit-tools';
  tools.innerHTML =
    '<button type="button" data-act="reset">Reset this page</button>' +
    '<button type="button" data-act="export">Export content (JSON)</button>' +
    '<button type="button" data-act="done">Done editing</button>';

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

  /* ---- Edit mode ---- */
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
    if (on) showToast(editables.length + ' editable blocks — click any text');
  }
  fab.addEventListener('click', function () { setEditing(!editing); });

  /* ---- Persist ---- */
  var saveTimer;
  function persist(el) {
    store[pageKey] = store[pageKey] || {};
    store[pageKey][el.getAttribute('data-edit')] = el.innerHTML;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { saveStore(store); showToast('Saved'); }, 500);
  }

  editables.forEach(function (el) {
    el.addEventListener('input', function () { persist(el); });
    el.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text);
    });
    el.addEventListener('click', function (e) {
      if (editing) { e.preventDefault(); e.stopPropagation(); }
    });
  });

  /* ---- Tools ---- */
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
      var blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'spacelab-content.json';
      a.click();
      URL.revokeObjectURL(a.href);
      showToast('Exported content as JSON');
    }
  });
})();
