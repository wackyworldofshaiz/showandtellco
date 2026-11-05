// Opens and closes the phone header menu. It listens on the whole page so it keeps
// working when the interactive pages redraw their header.
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
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.menu-btn');
    if (btn) {
      var header = btn.closest('header');
      setOpen(header, !header.hasAttribute('data-menu-open'));
      return;
    }
    // Tapping a menu link (for example an #anchor on the home page) closes the menu.
    var link = e.target.closest('.site-links a');
    if (link) setOpen(link.closest('header'), false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var header = document.querySelector('header[data-menu-open]');
    if (header) { setOpen(header, false); header.querySelector('.menu-btn').focus(); }
  });
})();
