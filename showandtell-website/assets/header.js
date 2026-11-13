// The site header on every page: the scrolling announcement bar, then the
// currency switch, logo and search on one row, and the menu underneath.
// Edit ANNOUNCEMENTS or NAV to change them everywhere. Each page has
// <div id="site-header" data-page="..."></div> followed by this script;
// data-page matches an item's page so it shows as the current one.

// Prices go in as <span data-price="..."></span> and assets/prices.js fills them in NGN or EUR.
var ANNOUNCEMENTS = [
  'Hand-lettered message inside any card',
  'Totes ready in 3 working days',
  'Patch bar in Abuja and Barcelona',
  'Prints from <span data-price="print"></span> · patches <span data-price="patch"></span> · pins from <span data-price="pin"></span>'
];

var NAV = [
  { page: 'bestsellers', label: 'Bestsellers', href: 'bestsellers.html' },
  { page: 'new-arrivals', label: 'New arrivals', href: 'new-arrivals.html' },
  { page: 'cards', label: 'Cards', href: 'cards.html' },
  { page: 'totes', label: 'Totes', href: 'build-your-tote.html' },
  { page: 'holiday-gift-guide', label: 'Holiday Gift Guide', href: 'holiday-gift-guide.html', children: [
    // These match the sections in COLLECTIONS in assets/catalog.js.
    { label: 'For her', href: 'holiday-gift-guide.html#for-her' },
    { label: 'For couples', href: 'holiday-gift-guide.html#for-couples' },
    { label: 'For him', href: 'holiday-gift-guide.html#for-him' },
    { label: 'For little ones', href: 'holiday-gift-guide.html#for-little-ones' },
    { label: 'For the group', href: 'holiday-gift-guide.html#for-the-group' },
    { label: 'Christmas cards', href: 'holiday-gift-guide.html#christmas-cards' },
    { label: 'Stocking fillers', href: 'holiday-gift-guide.html#stocking-fillers' }
  ] },
  { page: 'junior', label: 'Show and Tell Junior', href: 'junior.html' },
  { page: 'games', label: 'Games', href: 'games.html' },
  { page: 'collectibles', label: 'Collectibles', href: 'collectibles.html' },
  { page: 'all-products', label: 'All products', href: 'all-products.html' }
];

(function () {
  var host = document.getElementById('site-header');
  if (!host) return;
  var current = host.getAttribute('data-page');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function regionSwitch(cls) {
    return '<div role="group" aria-label="Prices in" class="region-switch ' + cls + '">'
      + '<button type="button" data-set-region="ng" aria-pressed="false">NG (₦)</button><span aria-hidden="true">/</span>'
      + '<button type="button" data-set-region="eu" aria-pressed="false">EU (€)</button></div>';
  }
  var icon = function (paths, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  };
  var chevron = icon('<path d="M6 9l6 6 6-6"/>', 14);

  // The messages appear twice so the scroll can loop without a gap; the copy is hidden from screen readers.
  var msgs = ANNOUNCEMENTS.map(function (m) { return '<span>' + m + '</span><span aria-hidden="true">✦</span>'; }).join('');
  var announce = '<div class="announce"><div class="announce-track">'
    + '<div class="announce-set">' + msgs + '</div><div class="announce-set" aria-hidden="true">' + msgs + '</div>'
    + '</div></div>';

  var items = NAV.map(function (n, i) {
    var cur = n.page === current ? ' aria-current="page"' : '';
    var link = '<a href="' + esc(n.href) + '"' + cur + '>' + esc(n.label) + '</a>';
    if (!n.children) return '<li>' + link + '</li>';
    var panelId = 'nav-drop-' + i;
    return '<li class="nav-drop">' + link
      + '<button type="button" class="drop-btn" aria-expanded="false" aria-controls="' + panelId + '" aria-label="' + esc(n.label) + ' sections">' + chevron + '</button>'
      + '<ul class="drop-panel" id="' + panelId + '">'
      + n.children.map(function (c) { return '<li><a href="' + esc(c.href) + '">' + esc(c.label) + '</a></li>'; }).join('')
      + '</ul></li>';
  }).join('');

  host.className = 'site-bar';
  host.innerHTML = announce
    + '<div class="site-nav"><div class="nav-top">'
    + '<div class="nav-left">'
    + '<button type="button" class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="site-links">'
    + icon('<path class="menu-bars" d="M4 7h16M4 12h16M4 17h16"/><path class="menu-x" d="M6 6l12 12M18 6L6 18"/>', 22) + '</button>'
    + regionSwitch('region-desktop')
    + '</div>'
    + '<a class="nav-logo" href="index.html" aria-label="Show and Tell Co home"><img src="images/brand/logo-horizontal-violet.png" alt="Show and Tell Co" width="299" height="42"></a>'
    + '<div class="nav-right"><a class="nav-icon" href="all-products.html#search" aria-label="Search products">' + icon('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>', 21) + '</a></div>'
    + '</div>'
    + '<nav id="site-links" class="site-links" aria-label="Main"><ul>' + items + '</ul>' + regionSwitch('region-mobile') + '</nav></div>';
})();
