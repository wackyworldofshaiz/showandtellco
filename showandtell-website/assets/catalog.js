// The product catalogue: every card, design and blank tote or tee, and which
// collections (the menu pages) each one appears in. All pages read from here,
// so a new card or design only needs adding once. Prices are in assets/prices.js.

// ---------- Cards ----------
// One line per card. w and h are the design's pixel size, so each card keeps its own shape.
var CARDS = [
  { no: '01', cat: 'Love', title: 'I love you from my head to-ma-toes', src: 'images/cards/card-13.jpg', w: 1060, h: 1484, patchNo: '05', desc: 'Three shiny tomatoes and one very sincere pun, for the person you love from your head to your toes.' },
  { no: '02', cat: 'Love', title: 'Life is butter with you', src: 'images/cards/card-04.jpg', w: 800, h: 1231, desc: 'A golden block of butter on a blue dish, for the person who makes everything better. Perfect for anniversaries, birthdays or a random Tuesday.' },
  { no: '03', cat: 'Love', title: 'To the loaf of my life (wheat belong together)', src: 'images/cards/card-05.jpg', w: 1053, h: 1494, desc: 'A loaf in a heart-print bag for the one you can’t live without. Wheat belong together, after all.' },
  { no: '04', cat: 'Love', title: 'Love you a brunch', src: 'images/cards/card-06.jpg', w: 1098, h: 1433, desc: 'Pancakes, bacon, eggs and coffee, for the person you’d share your last pancake with.' },
  { no: '05', cat: 'Love', title: 'Love you so matcha', src: 'images/cards/card-07.jpg', w: 1086, h: 1448, desc: 'A checkered pink mug of matcha, for the one you love so, so matcha.' },
  { no: '06', cat: 'Love', title: 'Love you soy much', src: 'images/cards/card-08.jpg', w: 1122, h: 1402, desc: 'A hand-lettered soy sauce bottle for someone you love soy much.' },
  { no: '07', cat: 'Love', title: 'You make my heart go pop!', src: 'images/cards/card-10.jpg', w: 1121, h: 1403, desc: 'A pink toaster popping two iced pastries, for the one who makes your heart go pop.' },
  { no: '08', cat: 'Love', title: "You're hot stuff!", src: 'images/cards/card-11.jpg', w: 1055, h: 1491, desc: 'A bottle of hot sauce for someone who’s simply too hot to handle.' },
  { no: '09', cat: 'Love', title: 'You are the one that I want', src: 'images/cards/card-14.jpg', w: 1122, h: 1402, desc: 'A box of a dozen doughnuts, and only one of them is the one you want.' },
  { no: '10', cat: 'Wedding', title: 'To the happy couple', src: 'images/cards/card-12.jpg', w: 1051, h: 1496, desc: 'A bold red heart on soft blue stripes, made for weddings, engagements and anniversaries.' },
  { no: '11', cat: 'Cheeky', title: 'Nice bum', src: 'images/cards/card-09.jpg', w: 1054, h: 1492, desc: 'A goose with no shame and a compliment to match. For partners, best friends and anyone who’ll laugh.' },
  { no: '12', cat: 'Christmas', title: 'Fa la la la la', src: 'images/cards/card-01.jpg', w: 1060, h: 1484, desc: 'Colourful hand-lettered fa la las on pink. A cheerful Christmas card for anyone on your list.' },
  { no: '13', cat: 'Christmas', title: 'Dear Santa, define nice', src: 'images/cards/card-02.jpg', w: 1052, h: 1495, desc: 'Candy-cane stripes and an important question for Santa. For the friend who’s been mostly nice.' },
  { no: '14', cat: 'Christmas', title: 'Dear Santa, pls just leave your credit card under the tree. Thx!', src: 'images/cards/card-03.jpg', w: 1122, h: 1402, desc: 'A Christmas tree, gold stars and one simple request to Santa. For anyone with expensive taste.' }
];

// ---------- Designs (prints, patches and pins) ----------
// types = the kinds it comes in. Optional extras:
// pinSrc: 'images/pins/<file>' switches Pin on for that design.
// prices: { ng: { patch: 12000 }, eu: { patch: 30 } } charges more or less than the usual price for one design.
var PATCHES = [
  { id: 'p01', no: '01', name: 'Abuja City Gate', cat: 'Places', types: ['print', 'patch'], src: 'images/patches/abuja-gate.webp', desc: 'The gate that welcomes you into Abuja, with the green-white-green flying above it and the road stretching ahead.' },
  { id: 'p02', no: '02', name: 'Plantain', cat: 'Food', types: ['print', 'patch'], src: 'images/patches/plantain.webp', desc: 'A ripe bunch of plantain on a green leaf, ready to become dodo.' },
  { id: 'p03', no: '03', name: 'Meat pie', cat: 'Food', types: ['print', 'patch'], src: 'images/patches/meat-pie.webp', desc: 'A golden meat pie, broken open to show the filling. Party-tray essential.' },
  { id: 'p04', no: '04', name: 'Jollof and chicken', cat: 'Food', types: ['print', 'patch'], src: 'images/patches/jollof.webp', desc: 'A green-and-white bowl of jollof with a chicken leg on top. The only correct answer at any party.' },
  { id: 'p05', no: '05', name: 'Danfo, full house', cat: 'Rides', types: ['print', 'patch'], src: 'images/patches/danfo-busy.webp', desc: 'A yellow Lagos danfo packed to the windows, with one arm hanging out for good measure.' },
  { id: 'p06', no: '06', name: 'Danfo', cat: 'Rides', types: ['print', 'patch'], src: 'images/patches/danfo.webp', desc: 'The classic yellow Lagos bus with its door wide open. Enter with your change ready.' },
  { id: 'p07', no: '07', name: 'Keke', cat: 'Rides', types: ['print', 'patch'], src: 'images/patches/keke.webp', desc: 'A yellow-and-black keke, the quickest way through traffic.' },
  { id: 'p08', no: '08', name: 'National Theatre', cat: 'Places', types: ['print', 'patch'], src: 'images/patches/national-theatre.webp', desc: 'The National Theatre in Lagos, its famous curved roof framed by trees.' },
  { id: 'p09', no: '09', name: 'Drums', cat: 'Culture', types: ['print', 'patch'], src: 'images/patches/drums.webp', desc: 'A set of drums with a beater, for anyone who can’t sit still when the music starts.' },
  { id: 'p10', no: '10', name: 'Gala', cat: 'Snacks & drinks', types: ['print', 'patch'], src: 'images/patches/gala.webp', desc: 'The sausage roll in the red-and-yellow wrapper. A traffic snack legend.' },
  { id: 'p11', no: '11', name: 'Green passport', cat: 'Culture', types: ['print', 'patch'], src: 'images/patches/passport.webp', desc: 'The green passport, for the japa crew, the frequent flyers and everyone who carries home with them.' },
  { id: 'p12', no: '12', name: 'Puff-puff', cat: 'Snacks & drinks', types: ['print', 'patch'], src: 'images/patches/puff-puff.webp', desc: 'A striped bowl piled high with golden puff-puff. Nobody stops at one.' },
  { id: 'p13', no: '13', name: 'Pure water', cat: 'Snacks & drinks', types: ['print', 'patch'], src: 'images/patches/pure-water.webp', desc: 'The sachet of pure water, cold and perfect on a hot afternoon.' },
  { id: 'p14', no: '14', name: 'Suya', cat: 'Food', types: ['print', 'patch'], src: 'images/patches/suya.webp', desc: 'Three sticks of suya with onions, tomatoes and plenty of yaji.' },
  { id: 'p15', no: '15', name: 'Palm wine', cat: 'Snacks & drinks', types: ['print', 'patch'], src: 'images/patches/palm-wine.webp', desc: 'A clay pot of fresh palm wine under a palm tree.' },
  { id: 'p16', no: '16', name: 'Show and Tell logo', cat: 'Show & Tell', types: ['print', 'patch'], src: 'images/patches/show-and-tell.webp', desc: 'Our logo in pink and cream, with the lime sparkle.' },
  { id: 'p17', no: '17', name: 'SuperYogo', cat: 'Snacks & drinks', types: ['print', 'patch'], src: 'images/patches/superyogo.webp', desc: 'The pink strawberry yoghurt sachet, a childhood favourite.' },
  { id: 'p18', no: '18', name: 'Zuma Rock', cat: 'Places', types: ['print', 'patch'], src: 'images/patches/zuma-rock.webp', desc: 'Zuma Rock rising over green trees, with the road out of Abuja in front.' },
  { id: 'p19', no: '19', name: 'Wahala', cat: 'Sayings', types: ['print', 'patch'], src: 'images/patches/wahala.webp', desc: 'One word for every kind of trouble, in cream script on red. Wear it as a warning or a lifestyle.' },
  { id: 'p20', no: '20', name: 'Abuja stamp', cat: 'Places', types: ['print', 'patch'], src: 'images/patches/abuja-stamp.webp', desc: 'A green-and-gold postage stamp of Abuja, with the city gate in front of Aso Rock.' },
  { id: 'p21', no: '21', name: 'No gree for anybody', cat: 'Sayings', types: ['print', 'patch'], src: 'images/patches/no-gree.webp', desc: 'A cup of coffee with an attitude. For anyone who stands their ground before breakfast.' },
  { id: 'p22', no: '22', name: 'Lagos stamp', cat: 'Places', types: ['print', 'patch'], src: 'images/patches/lagos-stamp.webp', desc: 'A green-and-gold postage stamp of Lagos, with the Lekki–Ikoyi bridge and the city skyline.' },
  { id: 'p23', no: '23', name: 'Nollywood', cat: 'Culture', types: ['print', 'patch'], src: 'images/patches/nollywood.webp', desc: 'A classic Nollywood VHS tape and its case, “Hit movie!” and all. For everyone who grew up watching Part 1 and Part 2.' }
];

// ---------- Blanks you build on ----------
var BLANKS = [
  { id: 'classic', name: 'Classic tote', kind: 'Tote', priceKey: 'classicTote', img: 'images/products/premium.png' },
  { id: 'pocket', name: 'Premium tote bag', kind: 'Tote', priceKey: 'premiumTote', img: 'images/products/classic.png' },
  { id: 'tee', name: 'T-shirt', kind: 'T-shirt', priceKey: 'tshirt', img: 'images/products/tee-front.png' }
];

// ---------- Collections ----------
// Each menu page shows the products listed here. Refer to products by id:
// cards as 'card-01', designs as 'p04', blanks as 'classic', 'pocket' or 'tee'.
// 'all-cards' and 'all-designs' add every card or design.
// sections split a page into headed groups; the id is the #link the menu uses.
// Text in [square brackets] is a placeholder to replace.
var COLLECTIONS = {
  'holiday-gift-guide': {
    title: 'Holiday Gift Guide',
    intro: 'Cards that say it, totes that show it, and little extras for every stocking. Pick a section or browse the lot.',
    colour: '#E4EE3F',
    sections: [
      { id: 'for-her', title: 'For her', items: ['card-02', 'card-05', 'card-09', 'pocket', 'p04', 'p12'] },
      { id: 'for-him', title: 'For him', items: ['card-08', 'classic', 'p21', 'p19', 'p14', 'p23'] },
      { id: 'for-little-ones', title: 'For little ones', items: ['tee', 'p12', 'p10', 'p17', 'p07'] },
      { id: 'for-the-group', title: 'For the group', note: 'Matching totes for the whole crew. Build one and we\u2019ll make as many as you need.', items: ['classic', 'pocket', 'tee'] },
      { id: 'christmas-cards', title: 'Christmas cards', items: ['card-12', 'card-13', 'card-14'] },
      { id: 'stocking-fillers', title: 'Stocking fillers', items: ['p19', 'p11', 'p22', 'p20', 'p13', 'card-11'] }
    ]
  },
  'junior': {
    title: 'Show and Tell Junior',
    intro: '[Bright, playful designs for little ones: snacks, rides and the sweet stuff. Iron a patch onto a school bag or put a print on a tee.]',
    colour: '#FFC9E8',
    items: ['tee', 'p12', 'p10', 'p17', 'p02', 'p07', 'p06', 'p13', 'p09']
  },
  'games': {
    title: 'Games',
    intro: '[Games are on the way. Check back soon.]',
    colour: '#C9F0FF',
    items: [],
    emptyTitle: 'Coming soon',
    emptyText: 'Our first games are in the works. In the meantime, here are some favourites.',
    fallback: ['card-11', 'p19', 'p05', 'classic']
  },
  'collectibles': {
    title: 'Collectibles',
    intro: 'Collect the set. Every design comes as an embroidered patch, and pins are on the way. Swap them, stack them, start a collection.',
    colour: '#EFE9FF',
    byCategory: true,
    items: ['all-designs']
  },
  'all-products': {
    title: 'All products',
    intro: 'Everything we make, in one place.',
    colour: '#F4F0FF',
    filters: true,
    items: ['classic', 'pocket', 'tee', 'all-cards', 'all-designs']
  }
};

// ---------- Helpers shared by the pages ----------
var TYPE_ORDER = ['print', 'patch', 'pin'];
// A design comes in its listed types, plus Pin as soon as it has a pin image.
function typesOf(d) {
  var t = d.types || ['print', 'patch'];
  return TYPE_ORDER.filter(function (k) { return t.indexOf(k) >= 0 || (k === 'pin' && !!d.pinSrc); });
}
function priceOf(d, type) { var own = d.prices && d.prices[region()]; return own && own[type] != null ? own[type] : priceFor(type); }
function imgOf(d, type) { return type === 'pin' && d.pinSrc ? d.pinSrc : d.src; }
function hasPins() { return PATCHES.some(function (d) { return typesOf(d).indexOf('pin') >= 0; }); }

// Turns an id from COLLECTIONS into what a product tile needs: name, picture, link and price.
function catalogItems(ids) {
  var out = [];
  ids.forEach(function (id) {
    if (id === 'all-cards') { CARDS.forEach(function (c) { out.push(catalogItem('card-' + c.no)); }); return; }
    if (id === 'all-designs') { PATCHES.forEach(function (d) { out.push(catalogItem(d.id)); }); return; }
    var it = catalogItem(id);
    if (it) out.push(it);
  });
  return out;
}
function catalogItem(id) {
  if (id.indexOf('card-') === 0) {
    var c = CARDS.find(function (x) { return 'card-' + x.no === id; });
    if (!c) return null;
    return { id: id, group: 'Cards', kind: 'Card', name: c.title, img: c.src, fit: 'cover', href: 'cards.html?card=' + c.no, price: priceFor('card'), from: false, cat: c.cat };
  }
  var d = PATCHES.find(function (x) { return x.id === id; });
  if (d) {
    var set = typesOf(d).map(function (t) { return priceOf(d, t); }).filter(function (n) { return n != null; });
    var labels = typesOf(d).map(function (t) { return t; });
    return { id: id, group: 'Designs', kind: labels.join(', ').replace(/^./, function (m) { return m.toUpperCase(); }), name: d.name, img: d.src, fit: 'contain', href: 'patches.html?design=' + d.id,
      price: set.length ? Math.min.apply(null, set) : null, from: set.length > 1, cat: d.cat };
  }
  var b = BLANKS.find(function (x) { return x.id === id; });
  if (b) return { id: id, group: 'Totes and tees', kind: b.kind + ', build your own', name: b.name, img: b.img, fit: 'contain', href: 'build-your-tote.html?style=' + b.id, price: priceFor(b.priceKey), from: true, cat: b.kind };
  if (window.console) console.warn('catalog.js: no product with id ' + id);
  return null;
}
