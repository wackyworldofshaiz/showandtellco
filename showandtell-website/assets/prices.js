// ---------- Your prices ----------
// One list per region. Put numbers in place of null (for example 25 or 24.50).
// null shows [PRICE] on the site, and totals show [TOTAL] until every price in them is set.
var PRICES = {
  ng: {
    card: 4500,           // each card
    cardBulk: { 5: 4200, 10: 4000, 25: 3700, 50: 3500 }, // price per card at that quantity (null = the normal card price)
    texturedPaper: 1000,  // added to each card on textured premium paper
    classicTote: 80000,
    premiumTote: 95000,
    tshirt: 45000,
    print: 5000,
    patch: 9500,
    pin: 6500
  },
  eu: {
    card: 6,
    cardBulk: { 5: 5.5, 10: 5, 25: 4.5, 50: 4 },
    texturedPaper: 1.5,
    classicTote: 45,
    premiumTote: 55,
    tshirt: 35,
    print: 5,
    patch: 9,
    pin: 7
  }
};
// ---------- End of prices ----------

// Which region's prices a visitor sees. The first visit guesses from the time zone
// (Europe/... = euros, anything else = naira), the switch in the header changes it,
// and the browser remembers the choice. A link ending in ?region=eu or ?region=ng sets it too.
var REGIONS = {
  ng: { name: 'Nigeria', currency: 'naira', code: 'NGN', symbol: '₦' },
  eu: { name: 'Europe', currency: 'euros', code: 'EUR', symbol: '€' }
};
var REGION_ORDER = ['ng', 'eu'];

var currentRegion = (function () {
  var r = null;
  try { r = new URLSearchParams(location.search).get('region'); } catch (e) {}
  if (REGIONS[r]) { try { localStorage.setItem('stc-region', r); } catch (e) {} return r; }
  try { r = localStorage.getItem('stc-region'); } catch (e) {}
  if (REGIONS[r]) return r;
  try { r = /^Europe\//.test(Intl.DateTimeFormat().resolvedOptions().timeZone) ? 'eu' : 'ng'; } catch (e) { r = 'ng'; }
  return r;
})();

function region() { return currentRegion; }
// A price from the list above for the current region, or null if it isn't set.
function priceFor(key) {
  var v = PRICES[currentRegion][key];
  return v == null ? null : v;
}
function money(n) {
  if (n == null) return '[PRICE]';
  return REGIONS[currentRegion].symbol + Number(n).toLocaleString('en-GB', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}
// Added to WhatsApp orders so you can tell which prices the customer saw.
function regionNote() {
  return currentRegion === 'ng' ? '' : ' (Prices in ' + REGIONS[currentRegion].currency + ', ordering from ' + REGIONS[currentRegion].name + '.)';
}
// For the switch in the interactive pages' templates.
function regionOptions() {
  return REGION_ORDER.map(function (k) { return { code: k, label: REGIONS[k].code + ' ' + REGIONS[k].symbol, on: k === currentRegion ? 'true' : 'false' }; });
}

(function () {
  // Static pages mark prices with data-price="<key>" and fill them in here.
  function fillStatic() {
    var els = document.querySelectorAll('[data-price]');
    for (var i = 0; i < els.length; i++) els[i].textContent = money(priceFor(els[i].getAttribute('data-price')));
    var btns = document.querySelectorAll('[data-set-region]');
    for (var j = 0; j < btns.length; j++) btns[j].setAttribute('aria-pressed', btns[j].getAttribute('data-set-region') === currentRegion ? 'true' : 'false');
  }
  function setRegion(r) {
    if (!REGIONS[r] || r === currentRegion) return;
    currentRegion = r;
    try { localStorage.setItem('stc-region', r); } catch (e) {}
    fillStatic();
    window.dispatchEvent(new Event('regionchange')); // the interactive pages redraw on this
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-set-region]');
    if (btn) setRegion(btn.getAttribute('data-set-region'));
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fillStatic);
  else fillStatic();
})();
