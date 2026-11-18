// The footer's newsletter sign-up and "Order on WhatsApp" link, for pages that don't load
// assets/home.js (the card, design, tote and collection pages). home.js does the same on the others.
(function () {
  // The page's own WhatsApp number if it sets one, otherwise the help number in assets/header.js.
  var number = typeof WHATSAPP_NUMBER !== 'undefined' && WHATSAPP_NUMBER ? WHATSAPP_NUMBER
    : (typeof HELP_WHATSAPP !== 'undefined' ? HELP_WHATSAPP : '');
  document.querySelectorAll('.home-footer [data-whatsapp]').forEach(function (a) {
    a.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent("Hi Show and Tell! I'd like to place an order.");
  });

  // Sign-ups go to Netlify Forms (Forms > newsletter). Without JavaScript the form still posts.
  document.querySelectorAll('.home-footer form[data-signup]').forEach(function (form) {
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
  });
})();
