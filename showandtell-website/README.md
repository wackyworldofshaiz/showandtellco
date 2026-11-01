# Show and Tell Co website

Printed pun cards, pick-your-patch totes and tees, and iron-on patches.

This is a plain static website: HTML, CSS, JavaScript and images. It doesn't need a build step or a server, so it runs on GitHub Pages, Netlify or any web host.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home page |
| `build-your-tote.html` | Build your tote (Classic tote, Premium tote bag, T-shirt) |
| `cards.html` | Card list and card product pages |
| `patches.html` | Patch menu and patch product pages |

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
- Textured premium paper surcharge: `extra: null` in `PAPERS` in `cards.html`.

**Text placeholders in square brackets:**
- Home page, step 01: [YOUR TOTE COLOURS]
- Cards page: card size, envelope colour, ready-in days, delivery areas and pickup city
- Patches page: patch type and size

**Home page "Order" and "Plan a gift" buttons.** These point to an `#order` section that isn't on the page yet. Either add an order section or point them at WhatsApp or `build-your-tote.html`.

## Adding a patch or a card

- **New patch:** add the image to `images/patches/`. Then add a line to the `PATCHES` list in **both** `build-your-tote.html` and `patches.html`, with the next id, a name, a category and `src: 'images/patches/<file>'`.
- **New card:** add the image to `images/cards/` and a line to the `CARDS` list in `cards.html`. `w` and `h` are the image's width and height in pixels.
