// Sticker packs page (stickers.html): the "What's inside" tabs, sticker grid and sticker details,
// the "See what's inside" buttons on each pack, and the WhatsApp order button.

// ---------- Your stickers ----------
// Each sticker's name and what it means. The picture is images/stickers/<key>.webp.
var STICKERS = {
  "danfo": { name: "Danfo", story: "The yellow Lagos minibus, roof piled high with everybody’s luggage. If you know, you know." },
  "lagos-taxi": { name: "Lagos taxi", story: "The classic yellow cab, with a driver who knows a shortcut for every go-slow." },
  "okada": { name: "Okada", story: "The motorbike taxi. Two on the back, holding on tight, somehow still on time." },
  "brt": { name: "BRT bus", story: "The big blue Lagos BRT, gliding past the traffic in its own lane." },
  "street": { name: "Lagos Island street", story: "A whole Lagos Island street in one sticker: danfos, umbrellas, signs and all." },
  "las-gidi": { name: "Las Gidi", story: "Lagos, the way Lagosians say it." },
  "generator": { name: "Generator", story: "When the light goes, the gen comes on. The soundtrack of every Nigerian evening." },
  "gmg": { name: "Ghana-Must-Go", story: "The checked bag that has moved every Nigerian house, hostel and holiday." },
  "cowry": { name: "Cowry card", story: "Tap in for the bus. A little piece of the Lagos commute." },
  "vendor": { name: "Fruit and snack seller", story: "Oranges, groundnuts and snacks on a tray, sold right to your window." },
  "japa": { name: "Japa", story: "To leave for a new life abroad. Suitcase packed, plane booked." },
  "lagos-stamp": { name: "Lagos stamp", story: "Lagos as a postage stamp: the bridge, the water and the skyline." },
  "abuja-stamp": { name: "Abuja stamp", story: "Abuja as a postage stamp, for home in the capital." },
  "zuma": { name: "Zuma Rock", story: "The giant rock you pass on the road into Abuja. You always look." },
  "city-gate": { name: "Abuja City Gate", story: "The arch that welcomes you into the capital." },
  "theatre": { name: "National Theatre", story: "Lagos’s National Theatre in Iganmu, the one shaped like a cap." },
  "not-yelling": { name: "I’m not yelling", story: "I’m not yelling, I’m Nigerian. Enough said." },
  "eko-o-ni-baje": { name: "Eko o ni baje", story: "Yoruba for “Lagos will not spoil”. A promise and a prayer." },
  "no-condition": { name: "No condition is permanent", story: "The words painted on buses all over Nigeria. Good days are coming." },
  "no-wahala": { name: "No wahala", story: "No problem, no stress, we move." },
  "jollof": { name: "Jollof pot", story: "Party jollof with chicken and plantain. The pot everybody gathers round." },
  "suya": { name: "Suya", story: "Spicy grilled beef on a stick, with onions and tomato on the side." },
  "meat-pie": { name: "Meat pie", story: "The small chops favourite. Golden, flaky and never enough." },
  "vhs": { name: "Nollywood VHS", story: "Old-school Nollywood on tape, for the movie nights that ran past midnight." },
  "detty": { name: "Detty December", story: "December at home: weddings, owambes and no sleep." },
  "money-spray": { name: "Money spray", story: "Naira notes raining on the dance floor. Spray them well." },
  "wahala": { name: "Wahala", story: "Trouble, in one word. Handle with care." },
  "stargirl": { name: "Stargirl", story: "For the star of every room you walk into." }
};

// The packs, in the order they show on the page. items are sticker keys from STICKERS above.
// The pack cards themselves (name, line, picture) are in stickers.html.
var PACKS = [
  { id: 'lagos-life', name: "Lagos Life", bg: '#FFC531', fg: '#1A0B45',
    items: ["danfo", "lagos-taxi", "okada", "brt", "street", "las-gidi", "generator", "gmg", "cowry", "vendor"] },
  { id: 'japa-1', name: "Japa Edition 1", bg: '#0A4C35', fg: '#F6F1E7',
    items: ["japa", "lagos-stamp", "abuja-stamp", "zuma", "city-gate", "theatre", "not-yelling", "eko-o-ni-baje", "no-condition", "no-wahala"] },
  { id: 'japa-2', name: "Japa Edition 2", bg: '#FF8FCF', fg: '#1A0B45',
    items: ["danfo", "las-gidi", "jollof", "suya", "meat-pie", "vhs", "detty", "money-spray", "wahala", "stargirl"] }
];
// ---------- End of stickers ----------

(function () {
  var IMG = 'images/stickers/';
  var tabsEl = document.querySelector('[data-tabs]');
  var gridEl = document.querySelector('[data-grid]');
  var detail = document.querySelector('[data-detail]');
  var orderBtn = document.querySelector('[data-order]');
  if (!tabsEl || !gridEl || !detail) return;

  // While ordering is paused (SHOP_OPEN in assets/header.js), the order button says SOON_LABEL,
  // greyed out, with SOON_NOTE underneath, like every other order button on the site.
  if (orderBtn && typeof SHOP_OPEN !== 'undefined' && !SHOP_OPEN) {
    var soon = document.createElement('div');
    soon.className = 'sk-soon';
    orderBtn.parentNode.replaceChild(soon, orderBtn);
    orderBtn.removeAttribute('href');
    orderBtn.removeAttribute('target');
    orderBtn.setAttribute('aria-disabled', 'true');
    orderBtn.textContent = SOON_LABEL;
    var note = document.createElement('p');
    note.textContent = SOON_NOTE;
    soon.appendChild(orderBtn);
    soon.appendChild(note);
    orderBtn = null;
  }

  var state = { pack: PACKS[0].id, sticker: PACKS[0].items[0] };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function packById(id) {
    for (var i = 0; i < PACKS.length; i++) if (PACKS[i].id === id) return PACKS[i];
    return PACKS[0];
  }
  function packsWith(key) {
    return PACKS.filter(function (p) { return p.items.indexOf(key) >= 0; }).map(function (p) { return p.name; });
  }

  function draw() {
    var pack = packById(state.pack);
    var key = pack.items.indexOf(state.sticker) >= 0 ? state.sticker : pack.items[0];
    var s = STICKERS[key];

    tabsEl.innerHTML = PACKS.map(function (p) {
      var on = p.id === pack.id;
      return '<li><button type="button" class="sk-tab' + (on ? ' is-on' : '') + '" aria-pressed="' + on + '" data-pick="' + p.id + '">'
        + '<span class="sk-tab-dot" style="background: ' + p.bg + '"></span>' + esc(p.name) + '</button></li>';
    }).join('');

    gridEl.setAttribute('aria-label', pack.name + ' stickers');
    gridEl.innerHTML = pack.items.map(function (k) {
      var on = k === key;
      return '<li><button type="button" class="sk-tile' + (on ? ' is-on' : '') + '" aria-pressed="' + on + '" data-sticker="' + k + '">'
        + '<img src="' + IMG + k + '.webp" alt=""><span>' + esc(STICKERS[k].name) + '</span></button></li>';
    }).join('');

    detail.style.background = pack.bg;
    detail.style.color = pack.fg;
    var img = detail.querySelector('[data-detail-img]');
    img.src = IMG + key + '.webp';
    img.alt = s.name + ' sticker';
    detail.querySelector('[data-detail-name]').textContent = s.name;
    detail.querySelector('[data-detail-story]').textContent = s.story;
    detail.querySelector('[data-detail-packs]').innerHTML = '<span>In</span>' + packsWith(key).map(function (n) {
      return '<span class="sk-pill">' + esc(n) + '</span>';
    }).join('');

    if (orderBtn) {
      var text = "Hi Show and Tell! I'd like to order the " + pack.name + ' sticker pack.';
      orderBtn.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text + regionNote());
    }
  }

  document.addEventListener('click', function (e) {
    var pick = e.target.closest('[data-pick]');
    if (pick) {
      var p = packById(pick.getAttribute('data-pick'));
      state.pack = p.id;
      state.sticker = p.items[0];
      draw();
      return; // the pack cards' links still scroll down to "What's inside"
    }
    var tile = e.target.closest('[data-sticker]');
    if (tile) {
      state.sticker = tile.getAttribute('data-sticker');
      draw();
      // On phones the details sit under the grid, so bring them into view
      if (window.matchMedia('(max-width: 1000px)').matches) detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
  window.addEventListener('regionchange', draw);
  draw();
})();
