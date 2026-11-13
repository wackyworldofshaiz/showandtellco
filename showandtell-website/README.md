# Show and Tell Co website

Printed pun cards, pick-your-design totes and tees, and iron-on patches and pins.

This is a plain static website: HTML, CSS, JavaScript and images. It doesn't need a build step or a server, so it runs on GitHub Pages, Netlify or any web host.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home page |
| `build-your-tote.html` | Build your tote (Classic tote, Premium tote bag, T-shirt) |
| `cards.html` | Card list and card product pages |
| `patches.html` | The design menu and design product pages (prints, patches and pins) |
| `holiday-gift-guide.html` | Holiday Gift Guide, in sections (the menu dropdown links to each one) |
| `junior.html` | Show and Tell Junior |
| `games.html` | Games (coming soon, with a few favourites meanwhile) |
| `collectibles.html` | Collectibles: every design, grouped by category |
| `all-products.html` | All products, with search, filters and sorting (the header's search icon opens it) |
| `bestsellers.html` | Bestsellers |
| `new-arrivals.html` | New arrivals |

Images are in `images/`. Shared files in `assets/`:
- `catalog.js`: every card, design and blank, and which collection pages they appear on.
- `prices.js`: all prices, in naira and euros.
- `header.js`: the header on every page: the scrolling announcement bar, then the currency switch, logo and search, with the menu underneath. Edit `ANNOUNCEMENTS` or `NAV` in it to change them.
- `home.js` and `home.css`: the homepage's product rows, sign-up forms and layout.
- `fonts/`: the three self-hosted fonts and `fonts.css`.
- `collection.js`: draws the collection pages from `catalog.js`.
- `menu.js`: the phone menu and the header dropdown.
- `site.css`: the header, phone tweaks and the currency switch.
- `dc-lite.js` and `morphdom.min.js`: the engine behind the builder, cards and design pages.

## Homepage

The homepage uses three fonts, one job each: **Archivo** (class `wide`) for headings, **Pinyon Script** (class `script`) for one accent word next to a heading, and **Jost** for everything else.

Its product rows come from `assets/catalog.js`:
- **Selected for her** and **Selected for the couple:** the six products in `HOME.forHer` and `HOME.forCouples`.
- **New arrivals:** the `'new-arrivals'` list in `COLLECTIONS`. The row scrolls four at a time.
- **Pun cards banner:** the card in `HOME.punCard`.

**NEW and BESTSELLER badges** come from the `'new-arrivals'` and `'bestsellers'` lists: a product shows the badge while it's on the list. The lists start with the products the design used as examples, so check them.

**Club and newsletter sign-ups** use Netlify Forms: no extra service, and the sign-ups appear under **Forms** in the Netlify dashboard. If the forms don't appear there after the first deploy, turn on **Form detection** in the site's Netlify settings and deploy again.

## Collections (the menu pages)

Like a shop's collections, each menu page lists products from `assets/catalog.js`. In `COLLECTIONS` there, each page has a title, an intro, a background colour and a list of product ids: cards as `'card-01'`, designs as `'p04'`, blanks as `'classic'`, `'pocket'` or `'tee'`. `'all-cards'` and `'all-designs'` add every card or design. To put a product on a page, add its id to that page's list.

The Holiday Gift Guide is split into `sections`. If you add or rename a section, update the dropdown under Holiday Gift Guide in `NAV` in `assets/header.js` to match. Intros in [square brackets] are placeholders to replace.

Add a type to a design id to show it as one kind only, with that kind's price: `'p22:print'` or `'p19:patch'`.

Product links open the product directly: `cards.html?card=03`, `patches.html?design=p19` (add `&type=print` to open it as a print) or `build-your-tote.html?style=tee`.

## Put it online with GitHub Pages

1. Create a new repository on GitHub, for example `showandtell-site`.
2. Upload everything in this folder to the repository, keeping the folders as they are, so that `index.html` sits at the top level. Commit.
3. In the repository, go to **Settings › Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

To use your own domain (for example showandtell.co), add it under **Settings › Pages › Custom domain** and follow GitHub's DNS steps.

## Things to fill in before launch

**WhatsApp number.** Orders open WhatsApp with the order already written. Near the bottom of each of these three files, set `var WHATSAPP_NUMBER = '';` to your number, digits only in international format (for example `'2348012345678'`):
- `build-your-tote.html`
- `cards.html`
- `patches.html`
- `assets/home.js` (the homepage footer's "Order on WhatsApp" link)

**Prices to check.** Every price in `assets/prices.js` has a placeholder so the site shows real numbers. Only the classic tote (₦80,000), patch (₦9,500) and card (₦4,500) prices are confirmed; replace the rest with your own. A price set to `null` shows as [PRICE], and totals that include it show [TOTAL].

**Text placeholders in square brackets:**
- Cards page: card size, envelope colour, ready-in days, delivery areas and pickup city
- Design menu: the size of each type

## Prices for Nigeria and Europe

All prices live in one file, `assets/prices.js`, with one list for Nigeria (`ng`, in naira) and one for Europe (`eu`, in euros). Each euro price is set by hand, not converted from naira. Put a number in place of `null`, for example `25` or `24.50`. The home page prices update from the same file.

**Which prices a visitor sees:**
- **First visit:** visitors whose computer or phone is set to a European time zone see euros, and everyone else sees naira.
- **Switching:** the NGN ₦ / EUR € switch in the header (inside the menu on phones) changes it, and the browser remembers the choice.
- **Links:** a link ending in `?region=eu` or `?region=ng` (for example `build-your-tote.html?region=eu`) opens with those prices, which is handy for ads.

WhatsApp orders from the euro prices end with "(Prices in euros, ordering from Europe.)" so you can tell them apart. Both regions use the same WhatsApp number, and there's no delivery charge.

## Prints, patches and pins

Every design can come as a **print** (a heat transfer pressed flat on), a **patch** (embroidered, iron-on) or a **pin** (enamel, locking back). `TYPES` is near the top of the script in both `build-your-tote.html` and `patches.html` (keep the two the same); the designs themselves are in `assets/catalog.js`.

- **`TYPES`**: one entry per type, with its `label`, `soldAlone` (whether people can buy it without a tote or tee) and a short `note` shown to customers. Their prices are `print`, `patch` and `pin` in `assets/prices.js`.
- **`types`** on each design in `PATCHES`: the types it comes in, for example `['print', 'patch']`.
- **`pinSrc`** (optional) on a design: its pin image. Setting it switches Pin on for that design; you don't need to add `'pin'` to `types`.
- **`prices`** (optional) on a design: a different price for that design only, per region, for example `prices: { ng: { patch: 12000 }, eu: { patch: 30 } }`. Anything not listed uses the usual price from `assets/prices.js`.

**To switch pins on for a design:** add the pin photo to `images/pins/`, then add `pinSrc: 'images/pins/<file>'` to that design in `assets/catalog.js`. The Pin option appears in the builder and the Pins filter on the design menu as soon as one design has a pin.

## Adding a design or a card

- **New design:** add the image to `images/patches/`. Then add a line to the `PATCHES` list in `assets/catalog.js`, with the next id and number, a name, a category, `types: ['print', 'patch']`, `src: 'images/patches/<file>'` and a short `desc`.
- **New card:** add the image to `images/cards/` and a line to the `CARDS` list in `assets/catalog.js`. `w` and `h` are the image's width and height in pixels.
- Either one then shows on All products automatically. Add its id to any other collection you want it on.
