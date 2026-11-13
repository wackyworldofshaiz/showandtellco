// The homepage: fills the product rows from assets/catalog.js (HOME and the
// 'new-arrivals' list) with live NGN/EUR prices, runs the New arrivals pager,
// and sends the club and newsletter forms to Netlify Forms.

// ---------- Your settings ----------
// WhatsApp number in international format, digits only (for example 2348012345678).
// TODO: set it here and in build-your-tote.html, cards.html and patches.html.
var WHATSAPP_NUMBER = '';
// ---------- End of settings ----------

(function () {
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function tile(it) {
    var shape = it.group === 'Cards' ? 'is-card' : (it.group === 'Designs' ? 'is-design' : 'is-blank');
    var kind = it.group === 'Totes and tees' ? it.cat : it.kind;
    var badges = badgesOf(it.id);
    return '<li><a class="ptile" href="' + esc(it.href) + '">'
      + '<span class="ptile-img ' + shape + '">'
      + (badges.length ? '<span class="ptile-badge">' + esc(badges.join(' | ')) + '</span>' : '')
      + '<img src="' + esc(it.img) + '" alt="" loading="lazy"></span>'
      + '<span class="ptile-info"><span class="ptile-text"><span class="ptile-kind">' + esc(kind) + '</span>'
      + '<span class="ptile-name">' + esc(it.name) + '</span></span>'
      + '<span class="ptile-price">' + esc(it.price == null ? '[PRICE]' : money(it.price)) + '</span></span>'
      + '</a></li>';
  }

  var LISTS = {
    forHer: function () { return HOME.forHer; },
    forCouples: function () { return HOME.forCouples; },
    newArrivals: function () { return COLLECTIONS['new-arrivals'].items; }
  };

  function render() {
    var els = document.querySelectorAll('[data-list]');
    for (var i = 0; i < els.length; i++) {
      els[i].innerHTML = catalogItems(LISTS[els[i].getAttribute('data-list')]()).map(tile).join('');
    }
    var pun = catalogItem(HOME.punCard);
    var card = document.querySelector('[data-pun-card]');
    if (pun && card) {
      card.href = pun.href;
      card.querySelector('img').src = pun.img;
      card.querySelector('[data-pun-name]').textContent = pun.name;
      card.querySelector('[data-pun-price]').textContent = pun.price == null ? '[PRICE]' : money(pun.price);
    }
    pager();
  }

  // New arrivals: one bar per screenful of products; tap a bar to scroll there.
  var row = document.querySelector('.product-row');
  var bars = document.querySelector('[data-pager]');
  function pages() { return row ? Math.max(1, Math.round(row.scrollWidth / row.clientWidth)) : 1; }
  function current() { return Math.round(row.scrollLeft / row.clientWidth); }
  function pager() {
    if (!row || !bars) return;
    var n = pages();
    if (n < 2) { bars.innerHTML = ''; return; }
    var html = '';
    for (var i = 0; i < n; i++) html += '<button type="button" data-page="' + i + '" aria-label="New arrivals, page ' + (i + 1) + ' of ' + n + '"></button>';
    bars.innerHTML = html;
    mark();
  }
  function mark() {
    var b = bars.querySelectorAll('button'), c = current();
    for (var i = 0; i < b.length; i++) b[i].setAttribute('aria-current', i === c ? 'true' : 'false');
  }
  if (row && bars) {
    bars.addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]');
      if (b) row.scrollTo({ left: Number(b.getAttribute('data-page')) * row.clientWidth, behavior: 'smooth' });
    });
    row.addEventListener('scroll', function () { window.requestAnimationFrame(mark); }, { passive: true });
    window.addEventListener('resize', pager);
  }

  // WhatsApp link in the footer.
  var wa = document.querySelectorAll('[data-whatsapp]');
  for (var w = 0; w < wa.length; w++) {
    wa[w].href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent("Hi Show and Tell! I'd like to place an order.");
  }

  // Club and newsletter sign-ups go to Netlify Forms (see them under Forms in the Netlify dashboard).
  // Without JavaScript the forms still post, and Netlify shows its own thank-you page.
  var forms = document.querySelectorAll('form[data-signup]');
  for (var f = 0; f < forms.length; f++) {
    forms[f].addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.currentTarget, status = form.querySelector('.form-status'), btn = form.querySelector('[type=submit]');
      btn.disabled = true;
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = form.getAttribute('name') === 'club' ? 'Welcome to the club! Look out for our first email.' : 'Thanks, you’re on the list.';
      }).catch(function () {
        status.textContent = 'Sorry, that didn’t go through. Please try again in a moment.';
      }).then(function () { btn.disabled = false; });
    });
  }

  window.addEventListener('regionchange', render);
  render();
})();
