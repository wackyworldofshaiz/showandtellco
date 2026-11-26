// The site header on every page: the scrolling announcement bar, then the
// currency switch, logo and search on one row, and the menu underneath.
// Edit ANNOUNCEMENTS or NAV to change them everywhere. Each page has
// <div id="site-header" data-page="..."></div> followed by this script;
// data-page matches an item's page so it shows as the current one.
// Bestsellers and Collectibles are off the menu for now; their pages still work if linked.

// Prices go in as <span data-price="..."></span> and assets/prices.js fills them in NGN or EUR.
var ANNOUNCEMENTS = [
  'New: Story Kits. Only 10 made',
  'Totes ready in 3 working days',
  'Patch bar in Abuja and Barcelona',
  'Prints from <span data-price="print"></span> · patches <span data-price="patch"></span> · pins from <span data-price="pin"></span>'
];

// ---------- Your WhatsApp number ----------
// The only place it's set. Every page loads this file first, so the help line beside the search icon,
// every "Order on WhatsApp" button and the footer link all use it.
// HELP_PHONE is how it reads on the page; WHATSAPP_NUMBER is the same number, digits only
// (international format, for example 2348012345678), for the chat links.
var HELP_PHONE = '+234 705 777 6753';
var WHATSAPP_NUMBER = '2347057776753';
var HELP_WHATSAPP = WHATSAPP_NUMBER; // older name, kept so nothing breaks

// ---------- Ordering on or off ----------
// While SHOP_OPEN is false, every order button (cards, designs, totes, Story Kits, puzzles)
// shows SOON_LABEL, greyed out. Set it to true to turn ordering back on.
var SHOP_OPEN = false;
var SOON_LABEL = 'Available soon';

// ---------- Smaller images for grids and thumbnails ----------
// imgAt('images/cards/card-07.jpg', 600) gives a copy of the image 600 px wide, made by Netlify's
// image service the first time it's asked for and then kept. Netlify also picks the lightest format
// each browser can show (WebP or AVIF). The original file is untouched, and product pages still use it.
// On a computer preview (localhost) the service isn't there, so the original is used instead.
var IMG_LOCAL = /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname) || location.protocol === 'file:';
function imgAt(src, width) {
  if (!src || IMG_LOCAL || /^(https?:|data:|\/\/)/.test(src)) return src;
  return '/.netlify/images?url=' + encodeURIComponent('/' + src.replace(/^\//, '')) + '&w=' + width;
}

var NAV = [
  { page: 'stationery', label: 'Stationery', href: 'stationery.html', children: [
    { label: 'Stickers', href: 'stickers.html' },
    { label: 'Sketchbooks', href: 'sketchbooks.html' }
  ] },
  { page: 'cards', label: 'Cards', href: 'cards.html', children: [
    { label: 'Physical cards', href: 'cards.html' },
    { label: 'Digital cards', href: 'send-a-card.html' },
    { label: 'Digital invitations', href: 'digital-invitations.html' }
  ] },
  { page: 'totes', label: 'Tote bags', href: 'build-your-tote.html' },
  { page: 'designs', label: 'Accessories', href: 'patches.html', children: [
    // ?type= opens the designs page already filtered to that type.
    { label: 'Prints', href: 'patches.html?type=print' },
    { label: 'Patches', href: 'patches.html?type=patch' },
    { label: 'Pins', href: 'patches.html?type=pin' }
  ] },
  { page: 'games', label: 'Games', href: 'games.html' },
  { page: 'story-kits', label: 'Story Kits', href: 'story-kit.html' },
  { page: 'junior', label: 'ST Junior', href: 'junior.html' },
  { page: 'holiday-gift-guide', label: 'Holiday Gift Guide', href: 'holiday-gift-guide.html', children: [
    // These match the sections in COLLECTIONS in assets/catalog.js.
    { label: 'For her', href: 'holiday-gift-guide.html#for-her' },
    { label: 'For him', href: 'holiday-gift-guide.html#for-him' },
    { label: 'For the foodie', href: 'holiday-gift-guide.html#for-the-foodie' },
    { label: 'For kids', href: 'holiday-gift-guide.html#for-kids' },
    { label: 'Bestsellers', href: 'holiday-gift-guide.html#bestsellers' }
  ] },
  { page: 'all-products', label: 'All products', href: 'all-products.html' }
  // About us and FAQ are in the footer.
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
    + '<div class="nav-right">'
    + '<a class="nav-help" href="https://wa.me/' + esc(HELP_WHATSAPP) + '" target="_blank" rel="noopener" aria-label="Do you need help? Message us on WhatsApp at ' + esc(HELP_PHONE) + '">' + icon('<circle cx="12" cy="12" r="9.5"/><path d="M9.4 9.3a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2.4-2.6 3.9"/><circle cx="12" cy="17.3" r="0.6" fill="currentColor"/>', 22)
    + '<span class="nav-help-text" aria-hidden="true"><span class="nav-help-q">Do you need help?</span><span class="nav-help-num">' + esc(HELP_PHONE) + '</span></span></a>'
    + '<a class="nav-icon" href="all-products.html#search" aria-label="Search products">' + icon('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>', 21) + '</a>'
    // The staff portal (portal.html): an arched doorway. Staff sign in there with the code.
    + '<a class="nav-icon" href="portal.html" aria-label="Staff portal" title="Staff portal">' + icon('<path d="M6 21V9a6 6 0 0 1 12 0v12"/><path d="M3.5 21h17"/><circle cx="14.6" cy="14.2" r="0.7" fill="currentColor"/>', 21) + '</a></div>'
    + '</div>'
    + '<nav id="site-links" class="site-links" aria-label="Main"><ul>' + items + '</ul>' + regionSwitch('region-mobile') + '</nav></div>';
})();
