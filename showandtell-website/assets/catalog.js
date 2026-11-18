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
  { id: 'p24', no: '24', name: 'Danfo, loaded', cat: 'Rides', types: ['patch'], src: 'images/patches/patch-danfo-loaded.webp', desc: 'A yellow danfo with the roof rack piled high and the conductor waving from the door. Everybody is going somewhere.' },
  { id: 'p25', no: '25', name: 'Chapman', cat: 'Snacks & drinks', types: ['patch'], src: 'images/patches/patch-chapman.webp', desc: 'A tall glass of Chapman with cucumber, orange, a striped straw and a pink bow. The drink of every party.' },
  { id: 'p26', no: '26', name: 'Abuja taxi', cat: 'Rides', types: ['patch'], src: 'images/patches/patch-abuja-taxi.webp', desc: 'The green-and-white Abuja taxi, ready for the next drop.' },
  { id: 'p27', no: '27', name: 'Peace and danfo', cat: 'Rides', types: ['patch'], src: 'images/patches/patch-danfo-peace.webp', desc: 'A danfo cruising through a peace sign wrapped in bougainvillea and frangipani.' },
  { id: 'p28', no: '28', name: 'Puff-puff', cat: 'Snacks & drinks', types: ['patch'], src: 'images/patches/patch-puff-puff.webp', desc: 'A paper bag spilling golden, sugar-dusted puff-puff. Nobody stops at one.' },
  { id: 'p29', no: '29', name: 'Suya', cat: 'Food', types: ['patch'], src: 'images/patches/patch-suya.webp', desc: 'A stick of suya with onion and tomato, covered in yaji.' },
  { id: 'p30', no: '30', name: 'Keke', cat: 'Rides', types: ['patch'], src: 'images/patches/patch-keke.webp', desc: 'A yellow keke with a happy driver and a passenger in her best ankara.' },
  { id: 'p31', no: '31', name: 'Las Gidi', cat: 'Sayings', types: ['patch'], src: 'images/patches/patch-las-gidi.webp', desc: 'Lagos, the way Lagosians say it, in bubbly pink letters with gold sparkles.' },
  { id: 'p32', no: '32', name: 'Lagos BRT', cat: 'Rides', types: ['print'], src: 'images/patches/print-lagos-brt.webp', desc: 'The blue BRT bus, full of passengers, gliding down its own lane.' },
  { id: 'p33', no: '33', name: 'Cowry card', cat: 'Culture', types: ['print'], src: 'images/patches/print-cowry-card.webp', desc: 'The Lagos Cowry card, tapped on every bus ride.' },
  { id: 'p34', no: '34', name: 'Lagos taxi', cat: 'Rides', types: ['print'], src: 'images/patches/print-lagos-taxi.webp', desc: 'A yellow Lagos taxi with a cheerful driver leaning out of the window.' },
  { id: 'p35', no: '35', name: 'Las Gidi', cat: 'Sayings', types: ['print'], src: 'images/patches/print-las-gidi.webp', desc: 'Lagos, the way Lagosians say it, in glossy pink letters with gold sparkles.' },
  { id: 'p36', no: '36', name: 'Ghana Must Go', cat: 'Culture', types: ['print'], src: 'images/patches/print-ghana-must-go.webp', desc: 'The checked Ghana Must Go bag, zipped as far as it will go.' },
  { id: 'p37', no: '37', name: 'Pure water', cat: 'Snacks & drinks', types: ['print'], src: 'images/patches/print-pure-water.webp', desc: 'The sachet of pure water, bitten open and cold on a hot afternoon.' },
  { id: 'p38', no: '38', name: 'Suya', cat: 'Food', types: ['print'], src: 'images/patches/print-suya.webp', desc: 'A stick of suya with onion and tomato, covered in yaji.' },
  { id: 'p39', no: '39', name: 'Abuja City Gate', cat: 'Places', types: ['print'], src: 'images/patches/print-abuja-gate.webp', desc: 'The gate that welcomes you into Abuja, with the green-white-green flying above it.' },
  { id: 'p40', no: '40', name: 'Japa', cat: 'Sayings', types: ['print'], src: 'images/patches/print-japa.webp', desc: 'A pink suitcase covered in stickers and a paper plane on its way. For everyone who has packed up and gone.' },
  { id: 'p41', no: '41', name: 'No condition is permanent', cat: 'Sayings', types: ['print'], src: 'images/patches/print-no-condition.webp', desc: 'The saying that keeps everybody going, in red on sunshine yellow.' },
  { id: 'p42', no: '42', name: 'Jollof', cat: 'Food', types: ['patch'], src: 'images/patches/patch-jollof.webp', desc: 'A steaming pot of party jollof with a chicken leg, fried plantain and the spoon still in it.' },
  { id: 'p43', no: '43', name: 'Zobo', cat: 'Snacks & drinks', types: ['print'], src: 'images/patches/print-zobo.webp', desc: 'A bottle of cold zobo with hibiscus and ginger, tied with a pink bow.' },
  { id: 'p44', no: '44', name: 'Gen', cat: 'Culture', types: ['print'], src: 'images/patches/print-generator.webp', desc: 'The trusty generator, smoking away with the extension plugged in. For when NEPA takes light.' },
  { id: 'p45', no: '45', name: 'Okada', cat: 'Rides', types: ['print'], src: 'images/patches/print-okada.webp', desc: 'An okada rider in his yellow helmet with a passenger holding on at the back.' },
  { id: 'p46', no: '46', name: 'Child of God', cat: 'Sayings', types: ['print'], src: 'images/patches/print-child-of-god.webp', desc: 'Child of God with a shooting star, in bold black on red and blue. Say it with your chest.' },
  { id: 'p47', no: '47', name: '+4', cat: 'Culture', types: ['patch'], src: 'images/patches/patch-plus-four.webp', desc: 'The +4 card, for anyone who has ever ended a friendship over a card game.' },
  { id: 'p48', no: '48', name: 'Stargirl', cat: 'Sayings', types: ['patch'], src: 'images/patches/patch-stargirl.webp', desc: 'Stargirl in sunny yellow script on a red-and-blue oval. For the main character.' },
  { id: 'p49', no: '49', name: 'Wahala on fire', cat: 'Sayings', types: ['print'], src: 'images/patches/print-wahala-flames.webp', desc: 'Wahala in a racing oval with the flames turned all the way up.' },
  { id: 'p05', no: '05', name: 'Danfo, full house', cat: 'Rides', types: ['print', 'patch'], src: 'images/patches/danfo-busy.webp', desc: 'A yellow Lagos danfo packed to the windows, with one arm hanging out for good measure.' },
  { id: 'p19', no: '19', name: 'Wahala', cat: 'Sayings', types: ['print', 'patch'], src: 'images/patches/wahala.webp', desc: 'One word for every kind of trouble, in cream script on red. Wear it as a warning or a lifestyle.' },
  { id: 'p20', no: '20', name: 'Abuja stamp', cat: 'Places', types: ['print', 'patch'], src: 'images/patches/abuja-stamp.webp', desc: 'A green-and-gold postage stamp of Abuja, with the city gate in front of Aso Rock.' },
  { id: 'p22', no: '22', name: 'Lagos stamp', cat: 'Places', types: ['print', 'patch'], src: 'images/patches/lagos-stamp.webp', desc: 'A green-and-gold postage stamp of Lagos, with the Lekki–Ikoyi bridge and the city skyline.' }
];

// ---------- Blanks you build on ----------
var BLANKS = [
  { id: 'classic', name: 'Classic tote', kind: 'Tote', priceKey: 'classicTote', img: 'images/products/premium.png' },
  { id: 'pocket', name: 'Premium tote bag', kind: 'Tote', priceKey: 'premiumTote', img: 'images/products/classic.png' },
  { id: 'tee', name: 'T-shirt', kind: 'T-shirt', priceKey: 'tshirt', img: 'images/products/tee-front.png' }
];

// ---------- Story Kits (limited stock) ----------
// A tee printed with a line-drawn scene, plus iron-on pieces the customer adds themselves.
// STOCK: how many are left in each size. When an order is confirmed on WhatsApp,
// lower the number and upload the file again. A size at 0 shows as sold out,
// and the kit shows 'Sold out' when every size is 0.
var STORY_KITS = [
  {
    id: 'danfo-days',
    name: 'Danfo Days',
    tagline: 'A Lagos bus stop at night, waiting for its story.',
    desc: 'A white tee printed with a hand-drawn Lagos bus stop: a danfo with its door open, a bench, a stool and a palm tree. Inside the box are 16 full-colour iron-on pieces (the market woman, the conductor, a sleeping goat, a stretching dog and more) for you to place wherever the story goes, then iron on at home.',
    img: 'images/story-kits/danfo-days-flatlay.webp',
    gallery: [
      { src: 'images/story-kits/danfo-days-model.webp', alt: 'A smiling woman wearing the Danfo Days tee, a black line drawing of a Lagos bus stop, holding up the Story Kit box' },
      { src: 'images/story-kits/danfo-days-flatlay.webp', alt: 'Everything in the kit: the printed white tee, two sheets of colour iron-on pieces and the Danfo Days box' },
      { src: 'images/story-kits/danfo-days-open-box.webp', alt: 'Holding up both sheets of iron-on pieces over the folded tee in its open box' },
      { src: 'images/story-kits/danfo-days-cutting.webp', alt: 'Cutting the iron-on pieces from the sheet with red scissors, next to the tee and the kit box' },
      { src: 'images/story-kits/danfo-days-ironing.webp', alt: 'Ironing pieces onto the tee through baking paper, with the open sheets of pieces beside it' },
      { src: 'images/story-kits/danfo-days-peeling.webp', alt: 'Peeling the backing off a stool piece, with the woman, the luggage, the boy, the goat and the dog already ironed onto the tee' },
      { src: 'images/story-kits/danfo-days-unboxing.webp', alt: 'A smiling woman holding up the finished Danfo Days tee, with every iron-on piece in place, above the open kit box' },
      { src: 'images/story-kits/danfo-days-scene.webp', alt: 'The Danfo Days scene filled in with every piece' },
      { src: 'images/story-kits/danfo-days-size-chart.webp', alt: 'T-shirt size chart in centimetres, measured flat. Chest: M 53, L 58, XL 62, 2XL 67. Between sizes? Take the bigger one.' }
    ],
    edition: 10,                                 // how many were made
    stock: { M: 2, L: 4, XL: 2, '2XL': 2 },      // left in each size
    priceKey: 'storyKit'
  }
];
var KIT_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
function kitLeft(k) { return Object.keys(k.stock).reduce(function (n, s) { return n + Math.max(0, k.stock[s] || 0); }, 0); }

// ---------- Puzzles ----------
// Coffee-table jigsaw sets. Each set is two 120-piece puzzles in one book-style box.
// stock: how many boxes are left. Change it as you sell; 0 shows "Sold out".
// Product page: puzzle.html?puzzle=<id>. Price: 'puzzle' in assets/prices.js.
// In a gallery, bg: '#F1EFEE' sets the photo frame to the photo's own background colour;
// fill: true crops a full-bleed photo to fill the square frame.
var PUZZLES = [
  {
    id: 'owambe-wahala',
    name: 'Owambe Wahala',
    tagline: 'The couple danced in, the money flew, and then somebody touched the cake. Two puzzles, one very eventful owambe.',
    desc: 'Build the party first, then the wahala. The same guests turn up in both scenes: the aunty in the purple gele, the man in the blue agbada and sunglasses, the waiter who saw everything. It all comes in a book-style box that looks good on the coffee table between sessions.',
    img: 'images/puzzles/owambe-wahala-box-standing.webp',
    imgBg: '#F1EFEE',                 // img is a photo with its own backdrop: tiles fill with it and use this colour
    scenes: [
      { no: 1, title: 'The Party', src: 'images/puzzles/owambe-party.webp', alt: 'Puzzle 1, The Party: the bride and groom dance in as guests spray money, with the cake still standing behind them', text: 'The couple dance in, the money flies and the cake is still standing.' },
      { no: 2, title: 'The Wahala', src: 'images/puzzles/owambe-wahala.webp', alt: 'Puzzle 2, The Wahala: the wedding cake has collapsed on the table and the bride, groom and guests react in horror', text: 'Somebody touched the cake. Same guests, very different moment.' }
    ],
    gallery: [
      { src: 'images/puzzles/owambe-wahala-box-pieces.webp', bg: '#F1EFEE', alt: 'The Owambe Wahala box lying flat next to loose puzzle pieces' },
      { src: 'images/puzzles/owambe-wahala-box-standing.webp', bg: '#F1EFEE', alt: 'The Owambe Wahala box standing up: a dark blue book-style box with the cake disaster on the front' },
      { src: 'images/puzzles/owambe-wahala-finished.webp', bg: '#F1EFEE', alt: 'The Wahala puzzle almost finished, with a few loose pieces beside it' },
      { src: 'images/puzzles/owambe-wahala-coffee-table.webp', fill: true, alt: 'The Owambe Wahala box on a coffee table beside flowers, books and a pile of pieces' }
    ],
    colour: '#1A0B45',
    accent: '#E4EE3F',
    stock: 5,
    priceKey: 'puzzle'
  },
  {
    id: 'lagos-traffic',
    name: 'Lagos Traffic Chronicles',
    tagline: 'Afternoon turns to night and the traffic still has not moved. Two puzzles, one very long go-slow.',
    desc: 'Buy puff-puff through the window, then stay for suya and roasted corn as the lights come on. The same danfo, sellers and LASTMA officer appear in both scenes, from the afternoon go-slow to the night feast under the bridge. It all comes in a book-style box that looks good on the coffee table between sessions.',
    img: 'images/puzzles/lagos-traffic-box-standing.webp',
    imgBg: '#F1EFEE',
    scenes: [
      { no: 1, title: 'The Go-Slow', src: 'images/puzzles/lagos-go-slow.webp', alt: 'Puzzle 1, The Go-Slow: a yellow danfo in afternoon Lagos traffic with street sellers, a LASTMA officer and the Lekki-Ikoyi bridge', text: 'Afternoon traffic: danfos, coconut carts and a LASTMA officer doing his best.' },
      { no: 2, title: 'The Night Feast', src: 'images/puzzles/lagos-night-feast.webp', alt: 'Puzzle 2, The Night Feast: the same street at night with suya, roasted corn and the bridge lit up', text: 'Same street after dark: suya, roasted corn and the bridge lit up.' }
    ],
    gallery: [
      { src: 'images/puzzles/lagos-traffic-box-pieces.webp', bg: '#F0EEED', alt: 'The Lagos Traffic Chronicles box lying flat next to loose puzzle pieces' },
      { src: 'images/puzzles/lagos-traffic-box-standing.webp', bg: '#F1EFEE', alt: 'The Lagos Traffic Chronicles box standing up: a deep green book-style box with the go-slow scene on the front' },
      { src: 'images/puzzles/lagos-traffic-finished.webp', bg: '#F2F0EF', alt: 'The Go-Slow puzzle almost finished, with a few loose pieces beside it' },
      { src: 'images/puzzles/lagos-night-feast-full.webp', alt: 'Puzzle 2, The Night Feast: the same street after dark, with suya, roasted corn, cold drinks and the Lekki-Ikoyi bridge lit up' },
      { src: 'images/puzzles/lagos-traffic-coffee-table.webp', fill: true, alt: 'The Lagos Traffic Chronicles box on a coffee table beside flowers, books and a pile of pieces' }
    ],
    colour: '#013A27',
    accent: '#FEB800',
    stock: 5,
    priceKey: 'puzzle'
  }
];

// ---------- Collections ----------
// Each menu page shows the products listed here. Refer to products by id:
// cards as 'card-01', designs as 'p24', blanks as 'classic', 'pocket' or 'tee',
// Story Kits as 'kit-danfo-days', puzzles as 'puzzle-owambe-wahala'.
// Add a type to show a design as one kind only, with that kind's price: 'p22:print', 'p19:patch'.
// 'all-cards' and 'all-designs' add every card or design.
// 'bestsellers' and 'new-arrivals' also decide the BESTSELLER and NEW badges:
// a product gets the badge only while it's on that list.
// sections split a page into headed groups; the id is the #link the menu uses.
// Text in [square brackets] is a placeholder to replace.
var COLLECTIONS = {
  'bestsellers': {
    title: 'Bestsellers',
    intro: 'The ones everyone keeps coming back for.',
    colour: '#F6F1E7',
    items: ['card-05', 'classic', 'p19:patch', 'p29', 'card-04']
  },
  'new-arrivals': {
    title: 'New arrivals',
    intro: 'Fresh cards and designs, just in.',
    colour: '#E4EE3F',
    items: ['puzzle-owambe-wahala', 'puzzle-lagos-traffic', 'kit-danfo-days', 'p31', 'p40', 'card-10', 'p24', 'card-11', 'p32', 'card-02', 'p25', 'card-12', 'p41']
  },
  'holiday-gift-guide': {
    title: 'Holiday Gift Guide',
    intro: 'Cards that say it, totes that show it, and little extras for every stocking. Pick a section or browse the lot.',
    colour: '#E4EE3F',
    sections: [
      { id: 'for-her', title: 'For her', items: ['card-02', 'card-05', 'card-09', 'pocket', 'p25', 'p31'] },
      { id: 'for-couples', title: 'For couples', items: ['card-10', 'card-03', 'card-04', 'card-07', 'classic', 'p27'] },
      { id: 'for-him', title: 'For him', items: ['card-08', 'classic', 'p41', 'p19', 'p29', 'p26'] },
      { id: 'for-little-ones', title: 'For little ones', items: ['tee', 'p28', 'p37', 'p34', 'p30'] },
      { id: 'story-kits', title: 'Story Kits', note: 'A tee that shows the scene, and pieces so they can tell the story. Only 10 made.', items: ['kit-danfo-days'] },
      { id: 'for-the-group', title: 'For the group', note: 'Matching totes for the whole crew. Build one and we\u2019ll make as many as you need.', items: ['classic', 'pocket', 'tee'] },
      { id: 'christmas-cards', title: 'Christmas cards', items: ['card-12', 'card-13', 'card-14'] },
      { id: 'stocking-fillers', title: 'Stocking fillers', items: ['p19', 'p40', 'p22', 'p20', 'p37', 'card-11'] }
    ]
  },
  'junior': {
    title: 'Show and Tell Junior',
    intro: '[Bright, playful designs for little ones: snacks, rides and the sweet stuff. Iron a patch onto a school bag or put a print on a tee.]',
    colour: '#FFC9E8',
    items: ['tee', 'p28', 'p37', 'p34', 'p32', 'p30', 'p24', 'p33', 'p25']
  },
  'games': {
    title: 'Games',
    intro: 'Coffee-table puzzles and games for the table. Our first jigsaw sets are here, with more games on the way.',
    colour: '#C9F0FF',
    items: ['puzzle-owambe-wahala', 'puzzle-lagos-traffic'],
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
    items: ['puzzle-owambe-wahala', 'puzzle-lagos-traffic', 'kit-danfo-days', 'classic', 'pocket', 'tee', 'all-cards', 'all-designs']
  }
};

// ---------- Homepage picks ----------
// The products on the homepage feature rows. Same ids as in COLLECTIONS.
// The New arrivals row shows the first four from 'new-arrivals' above.
var HOME = {
  forHer: ['card-05', 'card-02', 'classic', 'p19:patch', 'card-08', 'p25'],
  forCouples: ['card-04', 'p29', 'card-12', 'p41', 'card-03', 'p28'],
  punCard: 'card-05' // the card in the middle of the pun cards banner
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
  if (id.indexOf('kit-') === 0) {
    var k = STORY_KITS.find(function (x) { return 'kit-' + x.id === id; });
    if (!k) return null;
    return { id: id, group: 'Story kits', kind: kitLeft(k) ? 'Story kit · ' + kitLeft(k) + ' left' : 'Story kit · sold out', name: k.name, img: k.img, fit: 'contain',
      href: 'story-kit.html?kit=' + k.id, price: priceFor(k.priceKey), from: false, cat: 'Story kit' };
  }
  if (id.indexOf('puzzle-') === 0) {
    var z = PUZZLES.find(function (x) { return 'puzzle-' + x.id === id; });
    if (!z) return null;
    return { id: id, group: 'Games', kind: z.stock > 0 ? 'Puzzle · ' + z.stock + ' left' : 'Puzzle · sold out', name: z.name, img: z.img, fit: z.imgBg ? 'cover' : 'contain', bg: z.imgBg,
      href: 'puzzle.html?puzzle=' + z.id, price: priceFor(z.priceKey), from: false, cat: 'Puzzle' };
  }
  var parts = id.split(':');
  var d = PATCHES.find(function (x) { return x.id === parts[0]; });
  if (d && parts[1] && typesOf(d).indexOf(parts[1]) >= 0) {
    var t = parts[1];
    return { id: id, base: d.id, group: 'Designs', kind: t.charAt(0).toUpperCase() + t.slice(1), name: d.name, img: imgOf(d, t), fit: 'contain',
      href: 'patches.html?design=' + d.id + '&type=' + t, price: priceOf(d, t), from: false, cat: d.cat };
  }
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
// 'New' and 'Bestseller' for a product id, from the two lists above.
function badgesOf(id) {
  var base = id.split(':')[0];
  function on(list) { return COLLECTIONS[list].items.some(function (x) { return x.split(':')[0] === base; }); }
  var out = [];
  if (on('new-arrivals')) out.push('New');
  if (on('bestsellers')) out.push('Bestseller');
  return out;
}
