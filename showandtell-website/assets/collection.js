// Draws a collection page (Holiday Gift Guide, Junior, Games, Collectibles, All products, ...)
// from COLLECTIONS in assets/catalog.js. The page has <main id="collection" data-collection="...">.
(function () {
  var root = document.getElementById('collection');
  if (!root) return;
  var key = root.getAttribute('data-collection');
  var col = COLLECTIONS[key];
  if (!col) { root.textContent = 'Unknown collection: ' + key; return; }

  var GROUPS = ['All', 'Story kits', 'Games', 'Cards', 'Designs', 'Totes and tees'];
  var SORTS = [['featured', 'Featured'], ['low', 'Price, low to high'], ['high', 'Price, high to low'], ['az', 'Name, A to Z']];
  var CAT_ORDER = ['Places', 'Food', 'Snacks & drinks', 'Rides', 'Culture', 'Sayings', 'Show & Tell'];
  var state = { sort: 'featured', q: '', picked: {}, closed: {}, railOpen: false };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function priceLabel(it) { return it.price == null ? '[PRICE]' : (it.from ? 'from ' : '') + money(it.price); }

  function tile(it) {
    var cover = it.fit === 'cover';
    return '<li style="list-style: none; min-width: 0">'
      + '<a class="product-tile" href="' + esc(it.href) + '" style="display: flex; flex-direction: column; gap: 10px; color: #1A0B45; text-decoration: none">'
      + '<span style="position: relative; display: block; aspect-ratio: 4 / 5; border-radius: 20px; overflow: hidden; background: ' + (cover ? '#EFE9FF' : '#F4F0FF') + '">'
      + (badgesOf(it.id).length ? '<span style="position: absolute; z-index: 1; top: 12px; left: 12px; padding: 4px 10px; border-radius: 999px; background: #1A0B45; color: #FDFDFD; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase">' + esc(badgesOf(it.id).join(' · ')) + '</span>' : '')
      + '<img src="' + esc(imgAt(it.img, 600)) + '" alt="" loading="lazy" style="width: 100%; height: 100%; display: block; object-fit: ' + (cover ? 'cover' : 'contain') + '; box-sizing: border-box; padding: ' + (cover ? '0' : '14%') + '">'
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

  // Every product on the page once. On a page with sections, a product in more than one section
  // appears once here and remembers which sections it's in (SECTIONS_OF), for the rail.
  var SECTIONS_OF = {};
  function allItems() {
    if (!col.sections) return catalogItems(col.items || []);
    var out = [], seen = {};
    col.sections.forEach(function (s) {
      catalogItems(s.items).forEach(function (it) {
        if (!seen[it.id]) { seen[it.id] = true; out.push(it); }
        (SECTIONS_OF[it.id] = SECTIONS_OF[it.id] || []).indexOf(s.title) < 0 && SECTIONS_OF[it.id].push(s.title);
      });
    });
    return out;
  }
  // The page's usual layout: its headed sections, its categories, or one grid.
  function grouped(items) {
    if (col.sections) return col.sections.map(function (s) { return section(s.id, s.title, s.note, catalogItems(s.items)); }).join('');
    if (col.byCategory) {
      return CAT_ORDER.map(function (c) {
        var inCat = items.filter(function (it) { return it.cat === c; });
        return inCat.length ? section(c.toLowerCase().replace(/[^a-z]+/g, '-'), c, '', inCat) : '';
      }).join('');
    }
    return grid(items);
  }

  function body() {
    if (col.filters) { var all = allItems(); if (all.length) return railBody(all); }
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
    if (col.filters) return railBody(items);
    return grid(items);
  }

  // ----- Search + left filter rail (the same rail as the cards page; styles in assets/filters.css) -----
  // Each facet filters on one thing about a product. Ticking more than one option in a facet shows
  // products matching any of them. Options and counts come from the products themselves.
  var FACETS = [
    { key: 'type', label: 'Product type', order: GROUPS.slice(1), of: function (it) { return [it.group]; } },
    { key: 'cat', label: 'Category', order: ['Love', 'Friendship', 'Anniversary', 'Wedding', 'Baby', 'Birthday', 'Graduation', 'Thank you & congrats', 'Christmas', 'Cheeky'].concat(CAT_ORDER),
      of: function (it) { return it.group === 'Cards' || it.group === 'Designs' ? [it.cat] : []; } },
    { key: 'as', label: 'Designs come as', order: ['print', 'patch', 'pin'], names: { print: 'Print', patch: 'Patch', pin: 'Pin' },
      of: function (it) {
        if (it.group !== 'Designs') return [];
        var parts = it.id.split(':'), d = PATCHES.find(function (x) { return x.id === parts[0]; });
        return parts[1] ? [parts[1]] : (d ? typesOf(d) : []);
      } }
  ];
  // A collection can list its occasions (COLLECTIONS[...].occasions). They always show in the rail,
  // even before there's a product for each, so visitors can see what's coming.
  if (col.occasions) {
    FACETS.unshift({ key: 'occasion', label: 'Occasion', order: col.occasions, always: true,
      of: function (it) { return it.occasion ? [it.occasion] : []; } });
  }
  if (col.sections) {
    allItems();
    FACETS.unshift({ key: 'section', label: col.sectionsLabel || 'Shop by', order: col.sections.map(function (s) { return s.title; }),
      of: function (it) { return SECTIONS_OF[it.id] || []; } });
  }
  FACETS.forEach(function (f) { state.picked[f.key] = []; });
  (function () { // links like all-products.html?type=Cards, ?cat=Food or ?q=suya open with that filter on
    var p = new URLSearchParams(location.search);
    FACETS.forEach(function (f) {
      var v = p.get(f.key); if (!v) return;
      var hit = f.order.find(function (o) { return o.toLowerCase() === v.toLowerCase(); });
      if (hit) state.picked[f.key] = [hit];
    });
    if (p.get('q')) state.q = p.get('q');
  })();

  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ''); }
  var CHECK = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FDFDFD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; transition: transform 0.2s"><path d="M6 9 L12 15 L18 9" fill="none" stroke="#1A0B45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  function railBody(items) {
    var words = norm(state.q).split(/\s+/).filter(Boolean);
    function hitsSearch(it) {
      if (!words.length) return true;
      var hay = norm([it.name, it.cat, it.kind, it.group].join(' '));
      return words.every(function (w) { return hay.indexOf(w) >= 0; });
    }
    function hitsFacet(it, f) {
      var want = state.picked[f.key];
      if (!want.length) return true;
      var have = f.of(it);
      return want.some(function (v) { return have.indexOf(v) >= 0; });
    }
    function allBut(it, skip) { return hitsSearch(it) && FACETS.every(function (f) { return f === skip || hitsFacet(it, f); }); }

    var rail = FACETS.map(function (f) {
      var present = {};
      items.forEach(function (it) { f.of(it).forEach(function (v) { present[v] = true; }); });
      var opts = f.always ? f.order : f.order.filter(function (o) { return present[o]; });
      if (!f.always && opts.length < 2 && !state.picked[f.key].length) return ''; // a filter with one choice doesn't help
      return '<details class="cl-group" data-facet="' + f.key + '"' + (state.closed[f.key] ? '' : ' open') + '><summary>' + esc(f.label) + CHEV + '</summary>'
        + '<div class="cl-opts" role="group" aria-label="' + esc(f.label) + '">'
        + opts.map(function (o) {
          var on = state.picked[f.key].indexOf(o) >= 0;
          var n = items.filter(function (it) { return allBut(it, f) && f.of(it).indexOf(o) >= 0; }).length;
          return '<button class="cl-opt" type="button" role="checkbox" aria-checked="' + on + '" data-opt="' + f.key + '|' + esc(o) + '"' + (!on && !n ? ' disabled' : '') + '>'
            + '<span class="cl-box" aria-hidden="true">' + CHECK + '</span>' + esc((f.names && f.names[o]) || o) + '<span class="cl-n">' + n + '</span></button>';
        }).join('') + '</div></details>';
    }).join('');

    var shown = items.filter(function (it) { return allBut(it, null); });
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

    var chips = [], nPicked = 0;
    FACETS.forEach(function (f) {
      state.picked[f.key].forEach(function (v) {
        nPicked++;
        chips.push('<button class="cl-chip" type="button" data-chip="' + f.key + '|' + esc(v) + '" aria-label="Remove filter: ' + esc((f.names && f.names[v]) || v) + '">' + esc((f.names && f.names[v]) || v) + ' <span aria-hidden="true">\u00d7</span></button>');
      });
    });
    if (state.q.trim()) chips.push('<button class="cl-chip" type="button" data-chip="q" aria-label="Clear search">\u201c' + esc(state.q.trim()) + '\u201d <span aria-hidden="true">\u00d7</span></button>');
    var any = nPicked > 0 || !!state.q.trim();

    return '<div class="cl">'
      + '<aside class="cl-rail" aria-label="Search and filter products">'
      + '<div class="cl-search"><label for="search" class="cl-sr">Search products</label>'
      + '<input id="search" type="search" data-search value="' + esc(state.q) + '" placeholder="' + esc(col.searchHint || 'Try jollof, Lagos or love') + '" autocomplete="off">'
      + '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="#3B2E6B" stroke-width="2"></circle><path d="M16 16l5 5" stroke="#3B2E6B" stroke-width="2" stroke-linecap="round"></path></svg></div>'
      + '<button class="cl-toggle" type="button" data-rail aria-expanded="' + state.railOpen + '" aria-controls="product-filters">' + (state.railOpen ? 'Hide filters' : 'Filters') + (nPicked ? ' (' + nPicked + ')' : '') + '</button>'
      + '<div class="cl-panel" id="product-filters" data-open="' + state.railOpen + '">'
      + '<div class="cl-head"><h2 style="margin: 0; font-size: 18px; font-weight: 800">Filters</h2>' + (any ? '<button class="cl-btn" type="button" data-clear>Clear all</button>' : '') + '</div>'
      + rail + '</div></aside>'
      + '<section aria-label="Products" style="min-width: 0">'
      + '<div class="cl-top"><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px">'
      + '<p role="status" style="margin: 0; font-size: 15px; font-weight: 700; color: #3B2E6B">' + shown.length + (shown.length === 1 ? ' product' : ' products') + '</p>'
      + '<div class="cl-chips">' + chips.join('') + '</div></div>'
      + '<label class="cl-sort">Sort by<select data-sort>'
      + SORTS.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === state.sort ? ' selected' : '') + '>' + s[1] + '</option>'; }).join('')
      + '</select></label></div>'
      + (shown.length ? (!any && state.sort === 'featured' ? '<div style="display: flex; flex-direction: column; gap: 56px">' + grouped(shown) + '</div>' : grid(shown))
        : '<div style="padding: 48px 24px; border-radius: 20px; background: #F4F0FF; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px">'
          + '<p class="disp" style="margin: 0; font-size: 26px; font-weight: 800">Nothing matches</p>'
          + '<p style="margin: 0; font-size: 16px; color: #3B2E6B">Try another word, or clear the filters to see everything.</p>'
          + '<button type="button" data-clear style="min-height: 44px; padding: 0 22px; border-radius: 999px; border: 2px solid #5D1AFA; background: #5D1AFA; color: #FDFDFD; font: inherit; font-size: 15px; font-weight: 700; cursor: pointer">Show everything</button></div>')
      + '</section></div>';
  }

  function render() {
    var jump = col.sections && !col.filters
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

  function refocus(sel) { var el = root.querySelector(sel); if (el) el.focus(); }
  root.addEventListener('click', function (e) {
    var t = e.target.closest('[data-opt], [data-chip], [data-clear], [data-rail]');
    if (!t || t.disabled) return;
    if (t.hasAttribute('data-opt')) {
      var kv = t.getAttribute('data-opt').split('|'), list = state.picked[kv[0]], i = list.indexOf(kv[1]);
      if (i >= 0) list.splice(i, 1); else list.push(kv[1]);
      render(); refocus('[data-opt="' + CSS.escape(t.getAttribute('data-opt')) + '"]');
    } else if (t.hasAttribute('data-chip')) {
      var c = t.getAttribute('data-chip');
      if (c === 'q') state.q = ''; else { var p = c.split('|'); state.picked[p[0]] = state.picked[p[0]].filter(function (x) { return x !== p[1]; }); }
      render(); refocus('#search');
    } else if (t.hasAttribute('data-clear')) {
      Object.keys(state.picked).forEach(function (k) { state.picked[k] = []; }); state.q = '';
      render(); refocus('#search');
    } else {
      state.railOpen = !state.railOpen; render(); refocus('[data-rail]');
    }
  });
  // Remember which filter groups the visitor folded away, since the page redraws on every change.
  root.addEventListener('toggle', function (e) {
    var d = e.target; if (d.matches && d.matches('[data-facet]')) state.closed[d.getAttribute('data-facet')] = !d.open;
  }, true);
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
  // A link to a section (for example the menu's Holiday Gift Guide › For him) scrolls to it.
  window.addEventListener('hashchange', function () { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); });
  render();
  // The section in the link (for example #for-her) only exists once the page is drawn.
  if (location.hash) {
    var t = document.getElementById(location.hash.slice(1));
    if (t) { t.scrollIntoView(); if (t.matches('input')) t.focus(); } // #search opens with the search box ready
  }
})();
