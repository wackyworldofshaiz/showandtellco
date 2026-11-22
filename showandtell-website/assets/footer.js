// The site footer, drawn on every page from this one file. Each page has an empty
// <footer class="home-footer" id="site-footer"></footer> with this script straight after it.
// To add, remove or rename a footer link, change FOOTER_LINKS below. The look is in
// assets/footer.css (and the same rules in assets/home.css for the homepage-style pages).
// The newsletter form posts to Netlify Forms (Forms > newsletter). Netlify finds the form from
// the hidden copy at the bottom of index.html, so keep that copy if the fields here change.

// ---------- Footer links ----------
// A column per group. whatsapp: true makes the link open a WhatsApp chat with WHATSAPP_NUMBER
// from assets/header.js.
var FOOTER_LINKS = [
  { label: 'Shop', links: [
    ['Story Kits', 'story-kit.html'],
    ['Stationery', 'stationery.html'],
    ['Cards', 'cards.html'],
    ['Totes', 'build-your-tote.html'],
    ['Games and puzzles', 'games.html'],
    ['Prints, patches and pins', 'patches.html'],
    ['Holiday Gift Guide', 'holiday-gift-guide.html'],
    ['All products', 'all-products.html']
  ] },
  { label: 'Show and Tell', links: [
    ['About us', 'about.html'],
    ['Patch bar pop-ups', 'popup.html'],
    ['Corporate gifting', 'corporate-gifting.html']
  ] },
  { label: 'Help', links: [
    ['FAQ', 'faq.html'],
    ['Care for your tote', 'faq.html#care'],
    ['Order on WhatsApp', '', { whatsapp: true }],
    ['Group orders', 'faq.html#groups']
  ] },
  { label: 'Follow', links: [
    ['Instagram', 'https://www.instagram.com/showandtell.co/']
  ] }
];
var FOOTER_TAGLINE = 'Cards that tell it. Totes that show it.';
// ---------- End of footer links ----------

(function () {
  var root = document.getElementById('site-footer');
  if (!root) return;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var here = location.pathname.split('/').pop() || 'index.html';
  var waHref = 'https://wa.me/' + (typeof WHATSAPP_NUMBER !== 'undefined' ? WHATSAPP_NUMBER : '')
    + '?text=' + encodeURIComponent("Hi Show and Tell! I'd like to place an order.");

  function link(l) {
    var opts = l[2] || {};
    if (opts.whatsapp) return '<a href="' + esc(waHref) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>';
    return '<a href="' + esc(l[1]) + '"' + (l[1] === here ? ' aria-current="page"' : '') + '>' + esc(l[0]) + '</a>';
  }

  root.innerHTML =
    '<div class="footer-cols">'
    + '<div class="footer-news">'
    + '<h2 class="wide footer-news-title">Hear about new drops <span class="script">first</span></h2>'
    + '<form class="footer-form" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field">'
    + '<input type="hidden" name="form-name" value="newsletter">'
    + '<p hidden><label>Leave this empty <input name="bot-field"></label></p>'
    + '<label class="visually-hidden" for="f-email">Email address</label>'
    + '<input id="f-email" name="email" type="email" autocomplete="email" placeholder="Your email address" required>'
    + '<button type="submit">Sign up</button>'
    + '<p class="form-status" role="status"></p>'
    + '</form></div>'
    + FOOTER_LINKS.map(function (g) {
        return '<nav class="footer-links" aria-label="' + esc(g.label) + '"><h2 class="label">' + esc(g.label) + '</h2>' + g.links.map(link).join('') + '</nav>';
      }).join('')
    + '</div>'
    + '<div class="footer-base">'
    + '<img src="images/brand/logo-stacked-violet.png" alt="Show and Tell Co" width="43" height="34" loading="lazy">'
    + '<span>© ' + new Date().getFullYear() + ' Show and Tell Co · ' + esc(FOOTER_TAGLINE) + '</span>'
    + '</div>';

  // Newsletter sign-up, sent to Netlify Forms without leaving the page.
  var form = root.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = form.querySelector('.form-status'), btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = 'Thanks, you’re on the list.';
    }).catch(function () {
      status.textContent = 'Sorry, that didn’t go through. Please try again in a moment.';
    }).then(function () { btn.disabled = false; });
  });
})();
