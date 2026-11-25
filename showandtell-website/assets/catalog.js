// The product catalogue: every card, design and blank tote or tee, and which
// collections (the menu pages) each one appears in. All pages read from here,
// so a new card or design only needs adding once. Prices are in assets/prices.js.

// ---------- Cards ----------
// One line per card. w and h are the design's pixel size, so each card keeps its own shape.
// for: who the card suits, 'adults' and/or 'junior' (the Adults and Junior filters on the cards page).
// sizes: the sizes it comes in, 'A5' and/or 'A4'. The A4 price is cardA4Extra in assets/prices.js.
var CARDS = [
  { no: '01', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'I love you from my head to-ma-toes', src: 'images/cards/card-13.jpg', w: 1060, h: 1484, patchNo: '05', desc: 'Three shiny tomatoes and one very sincere pun, for the person you love from your head to your toes.' },
  { no: '02', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'Life is butter with you', src: 'images/cards/card-04.jpg', w: 800, h: 1231, desc: 'A golden block of butter on a blue dish, for the person who makes everything better. Perfect for anniversaries, birthdays or a random Tuesday.' },
  { no: '03', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'To the loaf of my life (wheat belong together)', src: 'images/cards/card-05.jpg', w: 1053, h: 1494, desc: 'A loaf in a heart-print bag for the one you can’t live without. Wheat belong together, after all.' },
  { no: '04', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'Love you a brunch', src: 'images/cards/card-06.jpg', w: 1098, h: 1433, desc: 'Pancakes, bacon, eggs and coffee, for the person you’d share your last pancake with.' },
  { no: '05', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'Love you so matcha', src: 'images/cards/card-07.jpg', w: 1086, h: 1448, desc: 'A checkered pink mug of matcha, for the one you love so, so matcha.' },
  { no: '06', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'Love you soy much', src: 'images/cards/card-08.jpg', w: 1122, h: 1402, desc: 'A hand-lettered soy sauce bottle for someone you love soy much.' },
  { no: '07', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'You make my heart go pop!', src: 'images/cards/card-10.jpg', w: 1121, h: 1403, desc: 'A pink toaster popping two iced pastries, for the one who makes your heart go pop.' },
  { no: '08', cat: 'Love', for: ['adults'], sizes: ['A5'], title: "You're hot stuff!", src: 'images/cards/card-11.jpg', w: 1055, h: 1491, desc: 'A bottle of hot sauce for someone who’s simply too hot to handle.' },
  { no: '09', cat: 'Love', for: ['adults'], sizes: ['A5'], title: 'You are the one that I want', src: 'images/cards/card-14.jpg', w: 1122, h: 1402, desc: 'A box of a dozen doughnuts, and only one of them is the one you want.' },
  { no: '38', cat: 'Love', for: ['adults'], sizes: ['A5'], title: "We're mint to be!", src: 'images/cards/card-38.jpg', w: 1060, h: 1502, desc: "Two little mint leaves smiling at each other with a pink heart in between. For the one you were always mint to be with." },
  { no: '49', cat: 'Friendship', for: ['adults'], sizes: ['A5'], title: "Let's toast to friendship", src: 'images/cards/card-49.jpg', w: 1060, h: 1500, desc: "Two slices of toast clinking glasses of red on butter-yellow stripes. For the friend who’s always there with a toast." },
  { no: '50', cat: 'Friendship', for: ['adults'], sizes: ['A5'], title: "This may sound cheesy but I think you're grate", src: 'images/cards/card-50.jpg', w: 1060, h: 1500, desc: "A happy grater and a wedge of cheese, best friends forever. For the friend who makes everything better." },
  { no: '51', cat: 'Friendship', for: ['adults'], sizes: ['A5'], title: "I hope UNO you're the best", src: 'images/cards/card-51.jpg', w: 1060, h: 1500, desc: "Two cheerful number cards side by side, a yellow 5 and a blue 6. For the friend you’d never play a +4 on." }, // Check before selling: uses another brand’s name or look.
  { no: '52', cat: 'Friendship', for: ['adults'], sizes: ['A5'], title: "I totally have your back", src: 'images/cards/card-52.jpg', w: 1060, h: 1500, desc: "A stick figure in shades doing the heavy lifting for their friend. For the one who always holds you up." },
  { no: '53', cat: 'Friendship', for: ['adults'], sizes: ['A5'], title: "You can count on me!", src: 'images/cards/card-53.jpg', w: 1060, h: 1500, desc: "A smiley purple calculator, always ready to add up. For the friend who never lets you down." },
  { no: '56', cat: 'Friendship', for: ['junior'], sizes: ['A5'], title: "You're one in a minion", src: 'images/cards/card-56.jpg', w: 1060, h: 1500, desc: "A big yellow face with goggles and a grin, for the little one who is one in a million." }, // Check before selling: uses another brand’s name or look.
  { no: '15', cat: 'Anniversary', for: ['adults'], sizes: ['A5'], title: "Happy anniversa-tea!", src: 'images/cards/card-15.jpg', w: 1060, h: 1502, desc: "Two tea bags dancing arm in arm on warm orange. For the couple who are still each other’s cup of tea." },
  { no: '16', cat: 'Anniversary', for: ['adults'], sizes: ['A5'], title: "It's bean one year", src: 'images/cards/card-16.jpg', w: 1060, h: 1502, desc: "Two happy beans holding hands and throwing up peace signs. For a first anniversary, or one year of anything worth celebrating." },
  { no: '17', cat: 'Anniversary', for: ['adults'], sizes: ['A5'], title: "We make the perfect pair! Happy anniversary to us", src: 'images/cards/card-17.jpg', w: 1060, h: 1502, desc: "The king and queen of hearts holding hands in a shower of little hearts. For the couple who always deal each other a winning hand." },
  { no: '18', cat: 'Anniversary', for: ['adults'], sizes: ['A5'], title: "You are my sole mate", src: 'images/cards/card-18.jpg', w: 1060, h: 1502, desc: "Two cheeky trainers, sole to sole, on a big pink heart. For the one who walks through everything with you." },
  { no: '19', cat: 'Anniversary', for: ['adults'], sizes: ['A5'], title: "I'll never Lego of you", src: 'images/cards/card-19.jpg', w: 1060, h: 1502, desc: "Two building bricks locked in a hug, one blue and one red. For the person you’re never letting go of." }, // Check before selling: uses another brand’s name or look.
  { no: '62', cat: 'Anniversary', for: ['adults'], sizes: ['A5'], title: "Let's order a takeaway & be in bed by ten. Happy anniversary.", src: 'images/cards/card-62.jpg', w: 1060, h: 1500, desc: "Bold black letters on bright orange, for the couple whose idea of a big night is a takeaway and an early one." },
  { no: '10', cat: 'Wedding', for: ['adults'], sizes: ['A5'], title: 'To the happy couple', src: 'images/cards/card-12.jpg', w: 1051, h: 1496, desc: 'A bold red heart on soft blue stripes, made for weddings, engagements and anniversaries.' },
  { no: '20', cat: 'Wedding', for: ['adults'], sizes: ['A5'], title: "Joined together in holy macaroni", src: 'images/cards/card-20.jpg', w: 1060, h: 1502, desc: "A macaroni elbow with a smiling face at each end, surrounded by hearts. For the newlyweds, and anyone who loves a pasta pun." },
  { no: '21', cat: 'Wedding', for: ['adults'], sizes: ['A5'], title: "You guys are the perfect match", src: 'images/cards/card-21.jpg', w: 1060, h: 1502, desc: "A pink matchbox with a red heart, every match ready to strike, on painted blue. For weddings, engagements and couples who light each other up." },
  { no: '22', cat: 'Wedding', for: ['adults'], sizes: ['A5'], title: "Congratulations on tying the knot", src: 'images/cards/card-22.jpg', w: 1060, h: 1502, desc: "A golden rope tied in a knot with a flutter of pink hearts above it. Simple, sweet and made for the big day." },
  { no: '23', cat: 'Wedding', for: ['adults'], sizes: ['A5'], title: "A toast to the happy couple", src: 'images/cards/card-23.jpg', w: 1060, h: 1502, desc: "Two slices of toast popping out of a peach toaster with hearts on top. Raise a slice to the newlyweds." },
  { no: '44', cat: 'Baby', for: ['adults'], sizes: ['A5'], title: "Shits & giggles are coming your way! Mostly shits though…", src: 'images/cards/card-44.jpg', w: 1060, h: 1500, desc: "A stork delivering a bundle with a tiny surprise inside. For parents-to-be with a sense of humour." },
  { no: '45', cat: 'Baby', for: ['adults'], sizes: ['A5'], title: "A toast to your new baby. Congrats!", src: 'images/cards/card-45.jpg', w: 1060, h: 1500, desc: "Two slices of toast clinking baby bottles over their brand-new little slice." },
  { no: '46', cat: 'Baby', for: ['adults'], sizes: ['A5'], title: "Welcome to parenthood", src: 'images/cards/card-46.jpg', w: 1060, h: 1500, desc: "A bare foot about to land on a toy brick. Every parent knows what comes next." },
  { no: '47', cat: 'Baby', for: ['adults'], sizes: ['A5'], title: "Congrats on the new pea in your pod!", src: 'images/cards/card-47.jpg', w: 1060, h: 1500, desc: "Three smiling peas in a pod on soft green. Gentle and sweet for a new arrival." },
  { no: '48', cat: 'Baby', for: ['adults'], sizes: ['A5'], title: "You're developing something special", src: 'images/cards/card-48.jpg', w: 1060, h: 1500, desc: "A roll of film marked “baby on the way” with scan pictures on the strip. For the parents-to-be." },
  { no: '57', cat: 'Baby', for: ['adults'], sizes: ['A5'], title: "New baby guide", src: 'images/cards/card-57.jpg', w: 1060, h: 1500, desc: "A little baby with arrows showing where to feed, kiss, burp, tickle, squeeze and wipe. The only manual new parents will get." },
  { no: '24', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "Sorry I didn't get you a present. At least you avocardo", src: 'images/cards/card-24.jpg', w: 1060, h: 1502, desc: "An avocado in a party hat, reading its card. For the friend who knows it’s the thought that counts." },
  { no: '25', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "You're old but you doughnut look it!", src: 'images/cards/card-25.jpg', w: 1060, h: 1502, desc: "A pink sprinkle doughnut in a polka-dot party hat. The kindest thing you can say on a birthday." },
  { no: '26', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "Hope your birthday is legen (wait for it) diary", src: 'images/cards/card-26.jpg', w: 1060, h: 1502, desc: "A cool cow in cat-eye sunglasses blowing a kiss. For the legend in your life." },
  { no: '27', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "Mayo birthday wishes come true", src: 'images/cards/card-27.jpg', w: 1060, h: 1502, desc: "A big jar of mayo with a bold label and a birthday wish to match. For anyone who puts mayo on everything." },
  { no: '28', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "I'm not saying you're old, but if you were milk I'd sniff you first", src: 'images/cards/card-28.jpg', w: 1060, h: 1502, desc: "A milk bottle with a cheeky message on sunny yellow check. For birthdays where honesty is the best policy." },
  { no: '58', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "Happy birthday. Oops, your cake fell off.", src: 'images/cards/card-58.jpg', w: 1060, h: 1500, desc: "A party-hat cat pushing the birthday cake off the table, on minty green. Totally an accident." },
  { no: '59', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "This card confirms that I remembered your birthday.", src: 'images/cards/card-59.jpg', w: 1060, h: 1500, desc: "Big black letters on mustard yellow. Official proof that you didn’t forget this year." },
  { no: '60', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "Happy birthday. You're well preserved", src: 'images/cards/card-60.jpg', w: 1060, h: 1500, desc: "A tin of sardines on a red check tablecloth. For the friend who’s ageing like a fine tinned fish." },
  { no: '61', cat: 'Birthday', for: ['adults'], sizes: ['A5'], title: "Another birthday. Yikes", src: 'images/cards/card-61.jpg', w: 1060, h: 1500, desc: "A black cat with its fur on end, horrified at the number of candles. For anyone who’d rather not count." },
  { no: '54', cat: 'Birthday', for: ['junior'], sizes: ['A5'], title: "Let's toast to a great day", src: 'images/cards/card-54.jpg', w: 1060, h: 1500, desc: "A slice of toast in a party hat, in bright watercolour letters. A happy birthday card for little ones." },
  { no: '55', cat: 'Birthday', for: ['junior'], sizes: ['A5'], title: "Have a roarsome day", src: 'images/cards/card-55.jpg', w: 1060, h: 1500, desc: "A fluffy crayon lion with a little gold crown. For the birthday boy or girl who rules the jungle." },
  { no: '29', cat: 'Graduation', for: ['adults'], sizes: ['A5'], title: "A little toast for your graduation", src: 'images/cards/card-29.jpg', w: 1060, h: 1502, desc: "A slice of toast in a mortarboard, raising a glass of bubbly under golden stars. Cheers to the graduate." },
  { no: '30', cat: 'Graduation', for: ['adults'], sizes: ['A5'], title: "Side quest complete. Happy graduation", src: 'images/cards/card-30.jpg', w: 1060, h: 1502, desc: "A frog in a mortarboard leaping for joy with the diploma in hand. For the grad who made it look easy (it wasn’t)." },
  { no: '31', cat: 'Graduation', for: ['adults'], sizes: ['A5'], title: "There is a graduate among us", src: 'images/cards/card-31.jpg', w: 1060, h: 1502, desc: "A little red crewmate in a mortarboard. For the gamer who just graduated." }, // Check before selling: uses another brand’s name or look.
  { no: '32', cat: 'Graduation', for: ['adults'], sizes: ['A5'], title: "Thanks ChatGPT", src: 'images/cards/card-32.jpg', w: 1060, h: 1502, desc: "A deadpan graduate in a mortarboard holding up a thank-you sign. For the grad who knows who helped with that essay." }, // Check before selling: uses another brand’s name or look.
  { no: '33', cat: 'Graduation', for: ['adults'], sizes: ['A5'], title: "The one where they graduate", src: 'images/cards/card-33.jpg', w: 1060, h: 1502, desc: "An orange sofa on a chalkboard, with season 20, episode 20 written above. For the grad who has watched every episode twice." }, // Check before selling: uses another brand’s name or look.
  { no: '34', cat: 'Thank you & congrats', for: ['adults'], sizes: ['A5'], title: "Chip chip hurray!", src: 'images/cards/card-34.jpg', w: 1060, h: 1502, desc: "A tortilla chip and a crisp dancing together. For any win, big or small." },
  { no: '35', cat: 'Thank you & congrats', for: ['adults'], sizes: ['A5'], title: "Thank-a-doodle-you!", src: 'images/cards/card-35.jpg', w: 1060, h: 1502, desc: "A wide-eyed rooster popping in to say thank you, loudly." },
  { no: '36', cat: 'Thank you & congrats', for: ['adults'], sizes: ['A5'], title: "I'm your biggest fan", src: 'images/cards/card-36.jpg', w: 1060, h: 1502, desc: "A pink electric fan blowing at full blast. For the friend you’ll always cheer on." },
  { no: '37', cat: 'Thank you & congrats', for: ['adults'], sizes: ['A5'], title: "Overall, you are amazing", src: 'images/cards/card-37.jpg', w: 1060, h: 1502, desc: "A pair of bright blue dungarees and a compliment to match. For thank yous, well dones and just because." },
  { no: '11', cat: 'Cheeky', for: ['adults'], sizes: ['A5'], title: 'Nice bum', src: 'images/cards/card-09.jpg', w: 1054, h: 1492, desc: 'A goose with no shame and a compliment to match. For partners, best friends and anyone who’ll laugh.' },
  { no: '12', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: 'Fa la la la la', src: 'images/cards/card-01.jpg', w: 1060, h: 1484, desc: 'Colourful hand-lettered fa la las on pink. A cheerful Christmas card for anyone on your list.' },
  { no: '13', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: 'Dear Santa, define nice', src: 'images/cards/card-02.jpg', w: 1052, h: 1495, desc: 'Candy-cane stripes and an important question for Santa. For the friend who’s been mostly nice.' },
  { no: '14', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: 'Dear Santa, pls just leave your credit card under the tree. Thx!', src: 'images/cards/card-03.jpg', w: 1122, h: 1402, desc: 'A Christmas tree, gold stars and one simple request to Santa. For anyone with expensive taste.' },
  { no: '39', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: "Oh Christmas tea, oh Christmas tea!", src: 'images/cards/card-39.jpg', w: 1060, h: 1502, desc: "A little Christmas tree in a teacup, lights, star and all. For the tea lover on your list." },
  { no: '40', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: "The first King size bed", src: 'images/cards/card-40.jpg', w: 1060, h: 1502, desc: "A watercolour manger under the star of Bethlehem. A gentle Christmas card with a smile in it." },
  { no: '41', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: "You know it's my day, right?", src: 'images/cards/card-41.jpg', w: 1060, h: 1502, desc: "Jesus on a donkey reminds Santa on his reindeer whose birthday it really is. Yeah yeah, Santa knows." },
  { no: '42', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: "Peas on earth", src: 'images/cards/card-42.jpg', w: 1060, h: 1502, desc: "A choir of little peas in bobble hats and earmuffs, singing carols in the snow." },
  { no: '43', cat: 'Christmas', for: ['adults'], sizes: ['A5'], title: "He sees you when you're sleeping", src: 'images/cards/card-43.jpg', w: 1060, h: 1502, desc: "Santa peeking through the curtains with a finger to his lips. A little bit creepy, very festive." }
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

// Digital invitations. Each design has a live sample guests would see (live) and a product page:
// digital-invitation.html?design=<id>. The gallery pictures are phone screenshots of the sample.
var INVITATIONS = [
  {
    id: 'luxe-wedding',
    name: 'Luxe Wedding',
    occasion: 'Wedding',
    priceKey: 'digitalInvitation',
    live: 'invitation.html',
    tagline: 'Guests ring a silver doorbell, watch the envelope open, and read your invitation while your song plays.',
    desc: 'A wedding invitation you send by link. It opens with a silver doorbell and an envelope with your photo inside, then everything your guests need on one page: the date and a live countdown, the venue with directions, the order of the day, your story, where to stay, your gift list, the dress code and the RSVP form. Deep wine and ivory, with lace, calla lilies and a spinning record that plays your song.',
    img: 'images/invitations/shop/luxe-wedding-tile.webp',
    gallery: [
      { src: 'images/invitations/shop/luxe-wedding-tile.webp', alt: 'Two phones showing the Luxe Wedding invitation: the doorbell, and the first page with the envelope, oval card and countdown' },
      { src: 'images/invitations/shop/luxe-wedding-1-doorbell.webp', alt: 'A silver doorbell with a lace heart that says Click the Button' },
      { src: 'images/invitations/shop/luxe-wedding-2-envelope.webp', alt: 'The envelope open, with the couple\'s names above it' },
      { src: 'images/invitations/shop/luxe-wedding-3-invitation.webp', alt: 'The first page: the envelope with a record, the oval card and the countdown' },
      { src: 'images/invitations/shop/luxe-wedding-4-details.webp', alt: 'The details: date, ceremony and reception, with Maps and calendar buttons' },
      { src: 'images/invitations/shop/luxe-wedding-5-rsvp.webp', alt: 'The RSVP form on the invitation' }
    ]
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
// filters: true gives the page the search box and left filter rail (assets/collection.js).
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
    intro: 'The latest from Show and Tell, from puzzles and Story Kits to cards, patches and prints.',
    colour: '#E4EE3F',
    filters: true,
    items: ['puzzle-owambe-wahala', 'puzzle-lagos-traffic', 'kit-danfo-days', 'card-47', 'card-50', 'card-55', 'card-42', 'card-15', 'card-30', 'card-39', 'card-34', 'card-21', 'p31', 'p40', 'card-10', 'p24', 'card-11', 'p32', 'card-02', 'p25', 'card-12', 'p41']
  },
  'holiday-gift-guide': {
    // Drawn by assets/gift-guide.js: a banner, then one row per section with a coloured
    // "Selected for ..." panel beside its products, four at a time. Rows swap sides as they go.
    // bg / fg / accent: the panel colours. art: up to three cut-out images on the panel
    // (the first is the big one). shop: where the panel's Shop now link goes.
    title: 'Holiday Gift Guide',
    intro: 'A little something for everyone on your list, including the ones who have everything.',
    colour: '#1A0B45',
    sections: [
      { id: 'for-her', title: 'For her', bg: '#FFC9E8', fg: '#1A0B45', accent: '#5D1AFA',
        art: ['images/brand/hero-tote-patches.webp', 'images/patches/patch-chapman.webp', 'images/patches/patch-las-gidi.webp'],
        shop: 'all-products.html',
        items: ['card-38', 'pocket', 'card-39', 'p25', 'card-36', 'puzzle-owambe-wahala', 'card-25', 'p31'] },
      { id: 'for-him', title: 'For him', bg: '#013A27', fg: '#FDFDFD', accent: '#FEB800',
        art: ['images/puzzles/lagos-traffic-box-cutout.webp', 'images/patches/patch-suya.webp', 'images/patches/print-no-condition.webp'],
        shop: 'all-products.html',
        items: ['puzzle-lagos-traffic', 'card-32', 'classic', 'card-41', 'card-30', 'p19', 'card-28', 'p29'] },
      { id: 'for-the-foodie', title: 'For the foodie', bg: '#E4EE3F', fg: '#1A0B45', accent: '#5D1AFA',
        art: ['images/patches/patch-jollof.webp', 'images/patches/patch-puff-puff.webp', 'images/patches/print-zobo.webp'],
        shop: 'collectibles.html',
        items: ['p42', 'card-34', 'card-42', 'p28', 'card-27', 'p43', 'card-26', 'card-15'] },
      { id: 'for-kids', title: 'For kids', bg: '#C9F0FF', fg: '#1A0B45', accent: '#5D1AFA',
        art: ['images/products/tee-front.png', 'images/patches/print-lagos-taxi.webp', 'images/patches/print-pure-water.webp'],
        shop: 'junior.html',
        items: ['tee', 'kit-danfo-days', 'p28', 'p37', 'p34', 'p30', 'p32', 'p24'] },
      { id: 'bestsellers', title: 'Bestsellers', bg: '#5D1AFA', fg: '#FDFDFD', accent: '#E4EE3F',
        art: ['images/patches/danfo-busy.webp', 'images/patches/wahala.webp', 'images/patches/patch-suya.webp'],
        shop: 'bestsellers.html',
        items: ['card-05', 'classic', 'p19:patch', 'p29', 'card-04', 'puzzle-lagos-traffic', 'kit-danfo-days', 'p05'] }
    ]
  },
  'junior': {
    title: 'ST Junior',
    intro: 'Bright, playful things for little ones: junior cards, patches for school bags, prints and tees, and the snacks and rides they know by heart.',
    colour: '#FFC9E8',
    filters: true,
    items: ['card-55', 'card-54', 'card-56', 'tee', 'p28', 'p37', 'p34', 'p32', 'p30', 'p24', 'p33', 'p25']
  },
  'digital-cards': {
    title: 'Digital cards',
    intro: 'Our pun cards, made to send by WhatsApp, text or email. Perfect for last-minute wishes and friends far away.',
    colour: '#D9F7E8',
    items: [],
    emptyTitle: 'Coming soon',
    emptyText: 'Our first digital cards are on the way. Follow us on Instagram to see them first. In the meantime, here are some of our printed cards.',
    fallback: ['card-25', 'card-07', 'card-39', 'card-24']
  },
  'stationery': {
    title: 'Stationery',
    intro: 'Stickers and sketchbooks with our favourite designs, for your desk, your bag and everything in between.',
    colour: '#FFE3F2',
    items: [],
    emptyTitle: 'Coming soon',
    emptyText: 'Our first stickers and sketchbooks are on the way. Follow us on Instagram to see them first. In the meantime, here are some favourites.',
    fallback: ['p19', 'p05', 'card-11', 'classic']
  },
  'sketchbooks': {
    title: 'Sketchbooks',
    intro: 'Sketchbooks with our designs on the cover, for doodles, plans, lists and big ideas.',
    colour: '#FFF6C9',
    items: [],
    emptyTitle: 'Coming soon',
    emptyText: 'Our first sketchbooks are on the way. Follow us on Instagram to see them first. In the meantime, here are some favourites.',
    fallback: ['p19', 'p05', 'card-11', 'classic']
  },
  'stickers': {
    title: 'Stickers',
    intro: 'Our favourite designs as stickers, for your laptop, water bottle, phone case and everything in between.',
    colour: '#FFE3F2',
    items: [],
    emptyTitle: 'Coming soon',
    emptyText: 'Our first stickers are on the way. Follow us on Instagram to see them first. In the meantime, here are some favourites.',
    fallback: ['p19', 'p05', 'card-11', 'classic']
  },
  'digital-invitations': {
    title: 'Digital invitations',
    intro: 'Invitations you send by link, for every kind of celebration. Guests open them on their phone and RSVP right on the invitation.',
    colour: '#FFE3F2',
    items: ['invite-luxe-wedding'],
    filters: true,
    occasions: ['Wedding', 'Engagement', 'Birthday'],  // the Occasion filter; add one here when it gets a design
    searchHint: 'Try wedding or birthday',
    emptyTitle: 'Coming soon',
    emptyText: 'Our first invitations are on the way. In the meantime, here are some favourites.',
    fallback: ['card-11', 'p19', 'p05', 'classic']
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
    intro: 'Collect the set: embroidered patches and sticker-style prints, with pins on the way. Swap them, stack them, start a collection.',
    colour: '#EFE9FF',
    byCategory: true,
    filters: true,
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
  forHer: ['card-36', 'card-05', 'classic', 'card-25', 'p19:patch', 'card-39'],
  forCouples: ['card-15', 'p29', 'card-21', 'card-30', 'p41', 'card-34'],
  punCard: 'card-24' // the card in the middle of the pun cards banner
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
  if (id.indexOf('invite-') === 0) {
    var v = INVITATIONS.find(function (x) { return 'invite-' + x.id === id; });
    if (!v) return null;
    return { id: id, group: 'Cards', kind: 'Digital invitation', name: v.name, img: v.img, fit: 'contain',
      href: 'digital-invitation.html?design=' + v.id, price: priceFor(v.priceKey), from: false, cat: v.occasion, occasion: v.occasion };
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
