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

Images are in `images/`. The interactive pages share `assets/dc-lite.js` and `assets/morphdom.min.js`, and `assets/site.css` holds the phone tweaks.

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

**Prices still to set** (they show as [PRICE] or [TOTAL] until then):
- Premium tote bag and T-shirt: `price: null` in `STYLES` in `build-your-tote.html`.
- Print and pin prices: `price: null` for `print` and `pin` in `TYPES`. Set them in **both** `build-your-tote.html` and `patches.html`, then replace the `[PRICE]` text for prints and pins on `index.html` (the totes card and the "Print, patch or pin?" section).
- Textured premium paper surcharge: `extra: null` in `PAPERS` in `cards.html`.

**Text placeholders in square brackets:**
- Home page, step 01: [YOUR TOTE COLOURS]
- Cards page: card size, envelope colour, ready-in days, delivery areas and pickup city
- Design menu: the size of each type

**Home page "Order" and "Plan a gift" buttons.** These point to an `#order` section that isn't on the page yet. Either add an order section or point them at WhatsApp or `build-your-tote.html`.

## Prints, patches and pins

Every design can come as a **print** (a heat transfer pressed flat on), a **patch** (embroidered, iron-on) or a **pin** (enamel, locking back). The settings live near the top of the script in **both** `build-your-tote.html` and `patches.html`; keep the two copies the same.

- **`TYPES`**: one entry per type, with its `label`, default `price` (`null` shows [PRICE]), `soldAlone` (whether people can buy it without a tote or tee) and a short `note` shown to customers.
- **`types`** on each design in `PATCHES`: the types it comes in, for example `['print', 'patch']`.
- **`pinSrc`** (optional) on a design: its pin image. Setting it switches Pin on for that design; you don't need to add `'pin'` to `types`.
- **`prices`** (optional) on a design: a different price for that design only, for example `prices: { patch: 12000 }`. Anything not listed uses the `TYPES` price.

**To switch pins on for a design:** add the pin photo to `images/pins/`, then add `pinSrc: 'images/pins/<file>'` to that design in both files. The Pin option appears in the builder and the Pins filter on the design menu as soon as one design has a pin.

## Adding a design or a card

- **New design:** add the image to `images/patches/`. Then add a line to the `PATCHES` list in **both** `build-your-tote.html` and `patches.html`, with the next id, a name, a category, `types: ['print', 'patch']` and `src: 'images/patches/<file>'`.
- **New card:** add the image to `images/cards/` and a line to the `CARDS` list in `cards.html`. `w` and `h` are the image's width and height in pixels.
