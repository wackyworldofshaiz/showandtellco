// Draws a collection page (Holiday Gift Guide, Junior, Games, Collectibles, All products)
// from COLLECTIONS in assets/catalog.js. The page has <main id="collection" data-collection="...">.
(function () {
  var root = document.getElementById('collection');
  if (!root) return;
  var key = root.getAttribute('data-collection');
  var col = COLLECTIONS[key];
  if (!col) { root.textContent = 'Unknown collection: ' + key; return; }

  var GROUPS = ['All', 'Cards', 'Designs', 'Totes and tees'];
  var SORTS = [['featured', 'Featured'], ['low', 'Price, low to high'], ['high', 'Price, high to low'], ['az', 'Name, A to Z']];
  var CAT_ORDER = ['Places', 'Food', 'Snacks & drinks', 'Rides', 'Culture', 'Sayings', 'Show & Tell'];
  var state = { group: 'All', sort: 'featured', q: '' };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function priceLabel(it) { return it.price == null ? '[PRICE]' : (it.from ? 'from ' : '') + money(it.price); }

  function tile(it) {
    var cover = it.fit === 'cover';
    return '<li style="list-style: none; min-width: 0">'
      + '<a class="product-tile" href="' + esc(it.href) + '" style="display: flex; flex-direction: column; gap: 10px; color: #1A0B45; text-decoration: none">'
      + '<span style="position: relative; display: block; aspect-ratio: 4 / 5; border-radius: 20px; overflow: hidden; background: ' + (cover ? '#EFE9FF' : '#F4F0FF') + '">'
      + (badgesOf(it.id).length ? '<span style="position: absolute; z-index: 1; top: 12px; left: 12px; padding: 4px 10px; border-radius: 999px; background: #1A0B45; color: #FDFDFD; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase">' + esc(badgesOf(it.id).join(' · ')) + '</span>' : '')
      + '<img src="' + esc(it.img) + '" alt="" loading="lazy" style="width: 100%; height: 100%; display: block; object-fit: ' + (cover ? 'cover' : 'contain') + '; box-sizing: border-box; padding: ' + (cover ? '0' : '14%') + '">'
      + '</span>'
      + '<span style="font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5D1AFA">' + esc(it.kind) + '</span>'
      + '<span style="font-size: 17px; font-weight: 700; line-height: 1.3">' + esc(it.name) + '</span>'
      + '<span style="font-size: 16px; color: #3B2E6B">' + esc(priceLabel(it)) + '</span>'
      + '</a></li>';
  }
  function grid(items) {
    return '<ul style="margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(200px, 42vw), 1fr)); gap: 32px 20px">'
      + items.map(tile).join('') + '</ul>';
  }
  function section(id, title, note, items) {
    return '<section' + (id ? ' id="' + esc(id) + '"' : '') + ' style="display: flex; flex-direction: column; gap: 20px; scroll-margin-top: 24px">'
      + '<div style="display: flex; flex-direction: column; gap: 6px"><h2 class="disp" style="margin: 0; font-size: 36px; line-height: 1.1; font-weight: 800">' + esc(title) + '</h2>'
      + (note ? '<p style="margin: 0; font-size: 17px; color: #3B2E6B">' + esc(note) + '</p>' : '') + '</div>'
      + grid(items) + '</section>';
  }
  function chip(label, on, attr) {
    return '<button type="button" ' + attr + ' aria-pressed="' + (on ? 'true' : 'false') + '" style="min-height: 40px; padding: 0 16px; border-radius: 999px; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; '
      + (on ? 'background: #1A0B45; color: #FDFDFD; border: 2px solid #1A0B45' : 'background: #FDFDFD; color: #1A0B45; border: 2px solid #CFC6F2') + '">' + esc(label) + '</button>';
  }

  function body() {
    if (col.sections) {
      return col.sections.map(function (s) { return section(s.id, s.title, s.note, catalogItems(s.items)); }).join('');
    }
    var items = catalogItems(col.items || []);
    if (col.byCategory) {
      return CAT_ORDER.map(function (c) {
        var inCat = items.filter(function (it) { return it.cat === c; });
        return inCat.length ? section(c.toLowerCase().replace(/[^a-z]+/g, '-'), c, '', inCat) : '';
      }).join('');
    }
    if (!items.length) {
      return '<div style="display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding: 36px; border-radius: 28px; background: #EFE9FF">'
        + '<h2 class="disp" style="margin: 0; font-size: 36px; font-weight: 800">' + esc(col.emptyTitle || 'Coming soon') + '</h2>'
        + '<p style="margin: 0; font-size: 17px; color: #3B2E6B">' + esc(col.emptyText || '') + '</p>'
        + '<a href="https://www.instagram.com/showandtell.co/" style="display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; border-radius: 999px; background: #5D1AFA; color: #FDFDFD; font-weight: 700; text-decoration: none">Follow along on Instagram</a>'
        + '</div>'
        + (col.fallback ? section('', 'While you wait', '', catalogItems(col.fallback)) : '');
    }
    if (col.filters) {
      var q = state.q.trim().toLowerCase();
      var shown = items.filter(function (it) {
        return (state.group === 'All' || it.group === state.group) && (!q || it.name.toLowerCase().indexOf(q) >= 0 || it.cat.toLowerCase().indexOf(q) >= 0);
      });
      var order = shown.map(function (it, i) { return { it: it, i: i }; });
      order.sort(function (a, b) {
        var pa = a.it.price, pb = b.it.price;
        if (state.sort === 'az') return a.it.name.localeCompare(b.it.name);
        if (state.sort === 'low' || state.sort === 'high') {
          if (pa == null || pb == null) return (pa == null) - (pb == null) || a.i - b.i; // unpriced last
          return (state.sort === 'low' ? pa - pb : pb - pa) || a.i - b.i;
        }
        return a.i - b.i;
      });
      shown = order.map(function (o) { return o.it; });
      return '<div style="display: flex; flex-direction: column; gap: 20px">'
        + '<label style="display: flex; flex-direction: column; gap: 8px; max-width: 520px; font-size: 15px; font-weight: 600">Search products'
        + '<input id="search" type="search" data-search value="' + esc(state.q) + '" placeholder="Try jollof, Lagos or love" autocomplete="off" style="min-height: 48px; padding: 0 16px; border-radius: 12px; border: 2px solid #CFC6F2; background: #FDFDFD; color: #1A0B45; font: inherit; font-size: 16px; font-weight: 400"></label>'
        + '<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">'
        + '<div role="group" aria-label="Show" style="display: flex; flex-wrap: wrap; gap: 8px">'
        + GROUPS.map(function (g) { return chip(g, g === state.group, 'data-group="' + esc(g) + '"'); }).join('') + '</div>'
        + '<label style="display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600">Sort by'
        + '<select data-sort style="min-height: 40px; padding: 0 12px; border-radius: 12px; border: 2px solid #CFC6F2; background: #FDFDFD; color: #1A0B45; font: inherit; font-size: 15px">'
        + SORTS.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === state.sort ? ' selected' : '') + '>' + s[1] + '</option>'; }).join('')
        + '</select></label></div>'
        + '<p style="margin: 0; font-size: 15px; color: #3B2E6B" aria-live="polite">' + shown.length + (shown.length === 1 ? ' product' : ' products') + (q ? ' matching \u201c' + esc(state.q.trim()) + '\u201d' : '') + '</p>' + '</div>'
        + grid(shown);
    }
    return grid(items);
  }

  function render() {
    var jump = col.sections
      ? '<nav aria-label="Sections" style="display: flex; flex-wrap: wrap; gap: 8px; padding-top: 4px">'
        + col.sections.map(function (s) { return '<a href="#' + esc(s.id) + '" style="display: inline-flex; align-items: center; min-height: 40px; padding: 0 16px; border-radius: 999px; background: #FDFDFD; color: #1A0B45; font-size: 15px; font-weight: 600; text-decoration: none">' + esc(s.title) + '</a>'; }).join('')
        + '</nav>'
      : '';
    root.innerHTML =
      '<div style="background: ' + col.colour + '">'
      + '<div style="max-width: 1240px; margin: 0 auto; padding: 20px 5% 48px; box-sizing: border-box; display: flex; flex-direction: column; gap: 18px">'
      + '<nav aria-label="Breadcrumb" style="font-size: 14px; color: #3B2E6B"><a href="index.html" style="color: #3B2E6B">Home</a> / <span aria-current="page">' + esc(col.title) + '</span></nav>'
      + '<h1 class="disp" style="margin: 0; font-size: 60px; line-height: 1; font-weight: 900; letter-spacing: -0.02em">' + esc(col.title) + '</h1>'
      + '<p style="margin: 0; max-width: 640px; font-size: 19px; line-height: 1.5; color: #1A0B45">' + esc(col.intro) + '</p>'
      + jump
      + '</div></div>'
      + '<div style="max-width: 1240px; margin: 0 auto; padding: 48px 5% 96px; box-sizing: border-box; display: flex; flex-direction: column; gap: 56px">'
      + body() + '</div>';
  }

  root.addEventListener('click', function (e) {
    var g = e.target.closest('[data-group]');
    if (g) { state.group = g.getAttribute('data-group'); render(); root.querySelector('[data-group="' + state.group + '"]').focus(); }
  });
  root.addEventListener('input', function (e) {
    if (!e.target.matches('[data-search]')) return;
    var pos = e.target.selectionStart;
    state.q = e.target.value; render();
    var box = root.querySelector('[data-search]'); box.focus(); box.setSelectionRange(pos, pos);
  });
  root.addEventListener('change', function (e) {
    if (e.target.matches('[data-sort]')) { state.sort = e.target.value; render(); root.querySelector('[data-sort]').focus(); }
  });
  window.addEventListener('regionchange', render);
  render();
  // The section in the link (for example #for-her) only exists once the page is drawn.
  if (location.hash) {
    var t = document.getElementById(location.hash.slice(1));
    if (t) { t.scrollIntoView(); if (t.matches('input')) t.focus(); } // #search opens with the search box ready
  }
})();
