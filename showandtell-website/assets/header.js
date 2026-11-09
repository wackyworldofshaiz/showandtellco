// The site header on every page: logo in the middle, menu underneath.
// Edit NAV to change the menu everywhere. Each page has
// <div id="site-header" data-page="..."></div> followed by this script;
// data-page matches an item's page so it shows as the current one.
var NAV = [
  { page: 'cards', label: 'Cards', href: 'cards.html' },
  { page: 'totes', label: 'Totes', href: 'build-your-tote.html' },
  { page: 'holiday-gift-guide', label: 'Holiday Gift Guide', href: 'holiday-gift-guide.html', children: [
    // These match the sections in COLLECTIONS in assets/catalog.js.
    { label: 'For her', href: 'holiday-gift-guide.html#for-her' },
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
  var regionSwitch = function (cls) {
    return '<div role="group" aria-label="Prices in" class="region-switch ' + cls + '">'
      + '<button type="button" data-set-region="ng" aria-pressed="false">NGN ₦</button>'
      + '<button type="button" data-set-region="eu" aria-pressed="false">EUR €</button></div>';
  };
  var chevron = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

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

  host.className = 'site-nav';
  host.innerHTML =
    '<div class="nav-top">'
    + '<div class="nav-left">'
    + '<button type="button" class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="site-links">'
    + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">'
    + '<path class="menu-bars" d="M4 7h16M4 12h16M4 17h16"/><path class="menu-x" d="M6 6l12 12M18 6L6 18"/></svg></button>'
    + regionSwitch('region-desktop')
    + '</div>'
    + '<a class="nav-logo" href="index.html" aria-label="Show and Tell Co home"><img src="images/brand/wordmark-white.png" alt="Show and Tell Co"></a>'
    + '<div class="nav-right"><a class="nav-cta" href="build-your-tote.html">Build a tote</a></div>'
    + '</div>'
    + '<nav id="site-links" class="site-links" aria-label="Main"><ul>' + items + '</ul>' + regionSwitch('region-mobile') + '</nav>';
})();
