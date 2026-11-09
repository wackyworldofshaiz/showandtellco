// Opens and closes the phone header menu and the dropdowns in the header menu.
(function () {
  function setOpen(header, open) {
    if (open) header.setAttribute('data-menu-open', '');
    else header.removeAttribute('data-menu-open');
    var btn = header.querySelector('.menu-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    }
  }
  function setDrop(drop, open) {
    if (open) drop.setAttribute('data-open', '');
    else drop.removeAttribute('data-open');
    drop.querySelector('.drop-btn').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeDrops(except) {
    var open = document.querySelectorAll('.nav-drop[data-open]');
    for (var i = 0; i < open.length; i++) if (open[i] !== except) setDrop(open[i], false);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.menu-btn');
    if (btn) {
      var header = btn.closest('header');
      setOpen(header, !header.hasAttribute('data-menu-open'));
      return;
    }
    var dropBtn = e.target.closest('.drop-btn');
    if (dropBtn) {
      var drop = dropBtn.closest('.nav-drop');
      closeDrops(drop);
      setDrop(drop, !drop.hasAttribute('data-open'));
      return;
    }
    if (!e.target.closest('.nav-drop')) closeDrops(null);
    // Tapping a menu link (for example a #section on the same page) closes the menu.
    var link = e.target.closest('.site-links a');
    if (link) { closeDrops(null); setOpen(link.closest('header'), false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var drop = document.querySelector('.nav-drop[data-open]') || (document.activeElement && document.activeElement.closest && document.activeElement.closest('.nav-drop'));
    if (drop) { setDrop(drop, false); drop.querySelector('.drop-btn').focus(); drop.classList.add('nav-drop-shut'); return; }
    var header = document.querySelector('header[data-menu-open]');
    if (header) { setOpen(header, false); header.querySelector('.menu-btn').focus(); }
  });
  // Escape hides a dropdown that keyboard focus opened until focus leaves it.
  document.addEventListener('focusout', function (e) {
    var drop = e.target.closest && e.target.closest('.nav-drop');
    if (drop && !drop.contains(e.relatedTarget)) drop.classList.remove('nav-drop-shut');
  });
})();
