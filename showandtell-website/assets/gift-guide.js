// Draws the Holiday Gift Guide from COLLECTIONS['holiday-gift-guide'] in assets/catalog.js:
// a banner with links to each section, then one row per section. Each row has a coloured
// "Selected for ..." panel beside its products, shown four at a time (swipe, or use the dots).
// Rows swap sides as they go down the page. The styles are in holiday-gift-guide.html.
(function () {
  var root = document.getElementById('gift-guide');
  if (!root) return;
  var col = COLLECTIONS['holiday-gift-guide'];
  var PER_PAGE = 4;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function priceLabel(it) { return it.price == null ? '[PRICE]' : (it.from ? 'from ' : '') + money(it.price); }

  function tile(it) {
    var cover = it.fit === 'cover' && it.group !== 'Cards', badges = badgesOf(it.id); // cards sit whole on the tile, like the homepage
    return '<li><a class="gg-tile" href="' + esc(it.href) + '">'
      + '<span class="gg-tile-img' + (cover ? ' is-cover' : '') + (it.group === 'Cards' ? ' is-card' : '') + '"' + (it.bg ? ' style="background:' + esc(it.bg) + '"' : '') + '>'
      + (badges.length ? '<span class="gg-badge">' + esc(badges.join(' · ')) + '</span>' : '')
      + '<img src="' + esc(it.img) + '" alt="" loading="lazy"></span>'
      + '<span class="gg-kind">' + esc(it.kind) + '</span>'
      + '<span class="gg-name">' + esc(it.name) + '</span>'
      + '<span class="gg-price">' + esc(priceLabel(it)) + '</span>'
      + '</a></li>';
  }

  function row(s, i) {
    var items = catalogItems(s.items), pages = [];
    for (var n = 0; n < items.length; n += PER_PAGE) pages.push(items.slice(n, n + PER_PAGE));
    var art = (s.art || []).map(function (src, k) { return '<img class="gg-art-' + k + '" src="' + esc(src) + '" alt="" loading="lazy">'; }).join('');
    return '<section class="gg-row' + (i % 2 ? ' is-flip' : '') + '" id="' + esc(s.id) + '" aria-labelledby="' + esc(s.id) + '-h">'
      + '<a class="gg-panel" href="' + esc(s.shop || 'all-products.html') + '" style="background:' + esc(s.bg) + ';color:' + esc(s.fg) + '">'
      + '<span class="gg-panel-text"><span class="gg-script" style="color:' + esc(s.accent) + '">Selected</span>'
      + '<h2 class="gg-wide" id="' + esc(s.id) + '-h">' + esc(s.title) + '</h2></span>'
      + '<span class="gg-art" aria-hidden="true">' + art + '</span>'
      + '<span class="gg-shop">Shop now <span aria-hidden="true">→</span></span>'
      + '</a>'
      + '<div class="gg-products">'
      + '<div class="gg-track" tabindex="0" aria-label="' + esc(s.title) + ' gifts">'
      + pages.map(function (p, k) { return '<ul class="gg-page" aria-label="Page ' + (k + 1) + ' of ' + pages.length + '">' + p.map(tile).join('') + '</ul>'; }).join('')
      + '</div>'
      + (pages.length > 1 ? '<div class="gg-dots">' + pages.map(function (p, k) {
          return '<button type="button" data-page="' + k + '" aria-label="' + esc(s.title) + ', page ' + (k + 1) + '"' + (k ? '' : ' aria-current="true"') + '></button>';
        }).join('') + '</div>' : '')
      + '</div></section>';
  }

  function render() {
    root.innerHTML =
      '<section class="gg-hero" aria-labelledby="gg-h">'
      + '<p class="gg-script gg-hero-kicker">Holiday</p>'
      + '<h1 class="gg-wide" id="gg-h">Gift guide</h1>'
      + '<p class="gg-hero-intro">' + esc(col.intro) + '</p>'
      + '<nav class="gg-jump" aria-label="Gift guide sections">'
      + col.sections.map(function (s) { return '<a href="#' + esc(s.id) + '" style="background:' + esc(s.bg) + ';color:' + esc(s.fg) + '">' + esc(s.title) + '</a>'; }).join('')
      + '</nav></section>'
      + '<div class="gg-rows">' + col.sections.map(row).join('') + '</div>'
      + '<div class="gg-all"><a href="all-products.html">Discover all gifts</a></div>';
    root.querySelectorAll('.gg-track').forEach(watch);
  }

  // Keeps each row's dots in step with the page the visitor has swiped to.
  function watch(track) {
    var dots = track.parentNode.querySelectorAll('[data-page]');
    if (!dots.length) return;
    track.addEventListener('scroll', function () {
      var k = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach(function (d, n) { if (n === k) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }, { passive: true });
  }
  root.addEventListener('click', function (e) {
    var dot = e.target.closest('[data-page]');
    if (!dot) return;
    var track = dot.closest('.gg-products').querySelector('.gg-track');
    track.scrollTo({ left: track.clientWidth * +dot.getAttribute('data-page') });
  });

  window.addEventListener('regionchange', render);
  render();
  // A link to a section (for example the menu's Holiday Gift Guide › For him) scrolls to it.
  function jump() { var t = location.hash && document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  window.addEventListener('hashchange', jump);
  jump();
})();
