# Show and Tell Co website

Printed pun cards, pick-your-design totes and tees, and iron-on patches and pins.

This is a plain static website: HTML, CSS, JavaScript and images. It doesn't need a build step or a server, so it runs on GitHub Pages, Netlify or any web host.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home page |
| `story-kit.html` | Story Kits: a printed tee plus iron-on pieces, with limited stock per size |
| `puzzle.html` | Puzzle sets (Owambe Wahala, Lagos Traffic Chronicles): two 120-piece puzzles per box. Open one with `puzzle.html?puzzle=owambe-wahala` or `?puzzle=lagos-traffic`. Stock, text and photos are in `PUZZLES` in `assets/catalog.js` (change `stock` as boxes sell); the price is `puzzle` in `assets/prices.js`. |
| `stickers.html` | Sticker packs (Lagos Life, Japa Edition 1, Japa Edition 2): the packs hanging on a rail, a card per pack, then "What's inside", where tapping a sticker shows its picture and what it means. Sticker names and meanings and which stickers are in each pack are `STICKERS` and `PACKS` at the top of `assets/stickers.js`; the pictures are `images/stickers/<key>.webp`. The pack cards' words are in `stickers.html`. Styles in `assets/stickers.css`. The price is `stickerPack` in `assets/prices.js` (it shows [PRICE] until you set it). The "Order on WhatsApp" button sends the pack chosen in "What's inside". |
| `build-your-tote.html` | Build your tote (Classic tote, Premium tote bag, T-shirt) |
| `cards.html` | Card list and card product pages. The list has a search box and a left rail of filters: who it's for (Adults, Junior), category and size (A5, A4). Each card's `for` and `sizes` are in `CARDS` in `assets/catalog.js`; the rail's groups are `GROUPS` in `cards.html`. Links like `cards.html?for=junior`, `?cat=Love`, `?size=A4` or `?q=santa` open the list filtered. The A4 price is `cardA4Extra` in `assets/prices.js`, added to the A5 price. |
| `patches.html` | The design menu and design product pages (prints, patches and pins) |
| `holiday-gift-guide.html` | Holiday Gift Guide: a banner, then a row per section (For her, For him, For the foodie, For kids, Bestsellers). Each row has a coloured "Selected for…" panel beside its products, four at a time. Drawn by `assets/gift-guide.js` from `COLLECTIONS['holiday-gift-guide']` in `assets/catalog.js`; the menu dropdown links to each section. |
| `junior.html` | Show and Tell Junior |
| `games.html` | Games (coming soon, with a few favourites meanwhile) |
| `collectibles.html` | Collectibles: every design, grouped by category |
| `all-products.html` | All products, with search, filters and sorting (the header's search icon opens it) |
| `bestsellers.html` | Bestsellers |
| `new-arrivals.html` | New arrivals |
| `about.html` | About us: who we are, show and tell, give / wear / play / keep, how we make things, a note from the team, the patch bar. Styles in `assets/about.css`. |
| `special-orders.html` | Custom card request form, opened only from the "Contact us for special orders" button at the bottom of the cards page (it isn't in the menu). Requests arrive in Netlify under **Forms › special-orders**, with any uploaded inspiration file attached. |
| `popup.html` | Patch bar pop-up sign-up (linked from every footer, the FAQ and About). Edit `POPUP` near the bottom of the file for each event: city, date, time, venue, entry, `spots` (35) and `taken`. Raise `taken` as you confirm people; when it reaches `spots` the page switches to a waitlist. Sign-ups arrive in Netlify under **Forms › popup** (the `list` field says spot or waitlist). |
| `corporate-gifting.html` | Corporate gifting: how it works, an enquiry form and FAQs. Linked from the footer. Enquiries arrive in Netlify under **Forms › corporate-gifting**, with any uploaded logo attached. |
| `send-a-card.html` | Digital cards: choose a card, write inside it, send now or schedule. Testing only for now; see **Digital cards** below. |
| `digital-invitations.html` | Digital invitations (Cards › Digital invitations in the menu): a collection page of invitation designs. See **Digital invitations** below. |
| `digital-invitation.html` | One invitation design's product page, e.g. `digital-invitation.html?design=luxe-wedding`. |
| `invitation.html` | The live sample invitation guests would receive (Luxe Wedding). Hidden from search engines. |
| `invitation-black.html` | The live sample for Black Luxe Wedding: the same invitation in black, silver and ivory, opening with a photo booth. Hidden from search engines. |
| `open-card.html` | A digital card as the recipient sees it (the link in their email). |
| `faq.html` | Frequently asked questions: tote care, cards, prints vs patches vs pins, group orders, ordering and delivery, patch bar. Answers in [square brackets] are placeholders to fill in. |

Images are in `images/`. Shared files in `assets/`:
- `filters.css`: the left search and filter rail shared by the cards page and the collection pages that have `filters: true` in `assets/catalog.js` (All products, New arrivals, Show and Tell Junior, Collectibles). The filters are `FACETS` in `assets/collection.js`: product type, category, and whether a design comes as a print or a patch. A filter with only one choice is hidden. With nothing filtered, a page keeps its usual sections. Links like `all-products.html?type=Cards`, `?cat=Food` or `?q=suya` open a page filtered. Bestsellers and Games are short, so they don't have the rail; add `filters: true` to give it to them.
- `footer.js`: the footer on every page, drawn from one list. To add, remove or rename a footer link, edit `FOOTER_LINKS` at the top. Each page just has an empty `<footer id="site-footer">` with the script after it. It also sends the newsletter sign-up. `footer.css` is the footer's look on pages that don't load `home.css`.
- `catalog.js`: every card, design and blank, and which collection pages they appear on.
- `prices.js`: all prices, in naira and euros.
- `header.js`: the header on every page: the scrolling announcement bar, then the currency switch, logo and search, with the menu underneath. Edit `ANNOUNCEMENTS` or `NAV` in it to change them. Bestsellers and Collectibles are off the menu for now; their pages still exist.
- `home.js` and `home.css`: the homepage's product rows, sign-up forms and layout.
- `fonts/`: the three self-hosted fonts and `fonts.css`.
- `collection.js`: draws the collection pages from `catalog.js`.
- `gift-guide.js`: draws the Holiday Gift Guide from `catalog.js`.
- `menu.js`: the phone menu and the header dropdown.
- `site.css`: the header, phone tweaks and the currency switch.
- `dc-lite.js` and `morphdom.min.js`: the engine behind the builder, cards and design pages.


## Digital cards (testing, payments off)

People pick a card, write inside it in a handwriting style and ink colour, and we email it to someone now or at a date and time they choose (up to a year ahead, in the recipient's time zone). The recipient gets an email with an **Open your card** button. On the card page the envelope opens, then the card opens like a book to show the message.

**Pages (Cards › Digital cards in the menu opens `send-a-card.html`; both are hidden from search engines):**
- `send-a-card.html`: the four steps (choose, write, who and when, check and send). `send-a-card.html?card=58` opens with that card chosen.
- `open-card.html?id=…`: the card as the recipient sees it. The sender's link adds `&k=…`, which shows the card before it sends and has a **Cancel card** button while it's still scheduled.
- Handwriting fonts and ink colours are `DC_FONTS` and `DC_INKS` in `assets/digital-cards.js`; styles are in `assets/digital-cards.css`. Every card in `CARDS` in `assets/catalog.js` can be sent. The inside is one shared cream page.

**Behind the scenes (`netlify/`):** this is the first part of the site that needs Netlify Functions. `package.json` and `netlify.toml` are only for these; the pages still need no build.
- `functions/card-create.mjs` saves a card and sends it straight away or queues it. `card-get.mjs` serves a card to `open-card.html`. `card-cancel.mjs` cancels a scheduled card.
- `functions/cards-send-due.mjs` runs every 10 minutes and sends any scheduled card whose time has come. A card is sent up to 10 minutes after the time picked.
- Cards are kept in Netlify Blobs (store `digital-cards`), so you don't need a database. Shared code and the email designs are in `lib/cards.mjs`.
- The recipient gets "Tolu sent you a card". The sender gets a receipt with their private link, then "delivered" (for scheduled cards) and "opened" emails.

**Settings** (Netlify › Site configuration › Environment variables):
- `CARDS_TEST_CODE`: needed. While payments are off, a card only sends with this code, so strangers can't use the site to send free emails. Until it's set, sending is switched off.
- `RESEND_API_KEY`: turns real emails on (resend.com). Without it, cards are still saved and "sent", but no email goes out. Use **See the card** after sending to check what they'd get.
- `CARDS_FROM`: who the emails come from, for example `Show and Tell Co <cards@showandtellco.shop>`. To send from your own domain, add the domain in Resend and the DNS records it gives you. Until then, Resend's test sender only delivers to your own Resend account email.

**Netlify's Base directory** has to be this folder, or Netlify won't find `netlify.toml` and the functions (Site configuration › Build & deploy › Build settings).

**Trying it on your computer:** run `npm install` once, then `CARDS_TEST_CODE=letmein npx netlify dev` in this folder and open http://localhost:8888/send-a-card.html. To send scheduled cards that are due, run `npx netlify functions:invoke cards-send-due` in a second terminal; scheduled functions don't run on their own locally.

**When payments go in:** `card-create.mjs` is the step that will wait for a confirmed Paystack (NGN) or Stripe (EUR) payment in place of the test code. Then remove the test code box in step 4 of `send-a-card.html` and add a price for digital cards to `assets/prices.js`.

## Digital invitations

Invitations sent by link, starting with **Luxe Wedding**.

- **Shop pages:** `digital-invitations.html` lists the designs (COLLECTIONS `'digital-invitations'` in `assets/catalog.js`), and each one opens `digital-invitation.html?design=<id>`. The designs' names, text and pictures are in `INVITATIONS` in `assets/catalog.js`. Set the price as `digitalInvitation` in `assets/prices.js`. Ordering works like the other products: a WhatsApp message, or "Available soon" while `SHOP_OPEN` is false.
- **The sample guests see:** `invitation.html`, drawn by `assets/invitations.js` and `assets/invitations.css` from the `SAMPLE` details in the page. The art is in `images/invitations/luxe/`, trimmed web copies of the purchased art. The originals stay in `images/invitations/new-art/` and are never committed. The sample song is a music-box Pachelbel's Canon made for it.
- **Black Luxe Wedding:** `invitation-black.html` uses the same code with `template: 'luxe-black'` (the body class `lx-black` switches the colours in `assets/invitations.css`). Its own art is in `images/invitations/luxe-black/`: the silver doorbell, the ivory lace heart (swapped in with `art: { heart: ... }`), the photo booth plate and strip, and the sample couple photos (made with ChatGPT for the sample). A photo booth prints a strip of three photos with the date written underneath (`lxBoothStrip` in `assets/invitations.js`), in place of the envelope opening.
- **The doorbell opening is switched off.** Its markup is still in `invitation.html` and `invitation-black.html`, inside an HTML comment. Remove the comment around it to bring it back; `invOpen` plays the doorbell first when it's there, and otherwise starts the envelope or photo booth as soon as the page opens.
- **Not built yet:** saving RSVPs, a host's private guest list, and hosts making their own invitation. For now, each invitation is set up by hand.
- **Shop pictures:** `images/invitations/shop/` holds phone screenshots of the sample. Make new ones if the design changes.

## Share previews

When a page link is shared on WhatsApp, Instagram, Facebook, X or iMessage, it shows a picture, the page title and its description. The tags are near the top of each page's `<head>` (`og:` and `twitter:`), and the pictures are in `images/share/` (1200 × 630 JPEGs, under 150 KB each). The description in a preview is the page's `<meta name="description">`, copied into `og:description`; change both together.

Each tag uses the site's full address, `https://showandtellco.shop` (the Netlify address and `www.` both lead there). If the domain ever changes, replace that address on every page. WhatsApp and Facebook remember a preview for a while, so a change can take a few days to show; Facebook's Sharing Debugger can refresh it sooner.

## Homepage

The homepage uses three fonts, one job each: **Archivo** (class `wide`) for headings, **Pinyon Script** (class `script`) for one accent word next to a heading, and **Jost** for everything else.

Its product rows come from `assets/catalog.js`:
- **Hero:** the big Story Kits panel shows the first kit in `STORY_KITS` (name, how many were made, link, and "See the kit" once it sells out). To feature something else, edit the `hero2` section at the top of `index.html`.
- **Category circles** under "Some things you show and some things you tell" are plain links in `index.html` (the `cats` list). Add or swap a circle there; Games uses a drawn pair of dice until there's a product photo.
- **Selected for you** and **Selected for the group:** the six products in `HOME.forHer` and `HOME.forCouples` (the names are older; both panels link to the Holiday Gift Guide).
- **New arrivals:** the `'new-arrivals'` list in `COLLECTIONS`. The row scrolls four at a time.
- **Pun cards banner:** the card in `HOME.punCard`.

**NEW and BESTSELLER badges** come from the `'new-arrivals'` and `'bestsellers'` lists: a product shows the badge while it's on the list. The lists start with the products the design used as examples, so check them.

**Club and newsletter sign-ups** use Netlify Forms: no extra service, and the sign-ups appear under **Forms** in the Netlify dashboard. The footer's newsletter form is drawn by `assets/footer.js`, so a hidden copy at the bottom of `index.html` lets Netlify find it; keep the two in step if you change its fields. If the forms don't appear there after the first deploy, turn on **Form detection** in the site's Netlify settings and deploy again.

## Collections (the menu pages)

Like a shop's collections, each menu page lists products from `assets/catalog.js`. In `COLLECTIONS` there, each page has a title, an intro, a background colour and a list of product ids: cards as `'card-01'`, designs as `'p24'`, blanks as `'classic'`, `'pocket'` or `'tee'`. `'all-cards'` and `'all-designs'` add every card or design. To put a product on a page, add its id to that page's list.

The Holiday Gift Guide is split into `sections`. Each has an `id` (the #link), a `title`, panel colours (`bg`, `fg`, `accent`), up to three cut-out images for the panel (`art`, the first is the big one), where its Shop now link goes (`shop`) and eight product ids (`items`). If you add or rename a section, update the dropdown under Holiday Gift Guide in `NAV` in `assets/header.js` to match. Intros in [square brackets] are placeholders to replace.

Add a type to a design id to show it as one kind only, with that kind's price: `'p22:print'` or `'p19:patch'`.

Product links open the product directly: `cards.html?card=03`, `patches.html?design=p19` (add `&type=print` to open it as a print) or `build-your-tote.html?style=tee`.

## Put it online with GitHub Pages

1. Create a new repository on GitHub, for example `showandtell-site`.
2. Upload everything in this folder to the repository, keeping the folders as they are, so that `index.html` sits at the top level. Commit.
3. In the repository, go to **Settings › Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

To use your own domain (for example showandtell.co), add it under **Settings › Pages › Custom domain** and follow GitHub's DNS steps.

## Things to fill in before launch

**WhatsApp number.** Orders open WhatsApp with the order already written. The number (+234 705 777 6753) is set once, at the top of `assets/header.js`: `HELP_PHONE` is how it reads in the header's "Do you need help?" line, and `WHATSAPP_NUMBER` is the same number, digits only in international format, used by every order button, the footer and the FAQ. Every page loads `header.js` first, so changing it there changes it everywhere.

**Ordering on or off.** `SHOP_OPEN` at the top of `assets/header.js` turns every order button on or off. While it's `false`, the buttons on cards, designs, totes, Story Kits and puzzles say "Available soon" (greyed out, `SOON_LABEL`). Set it to `true` after the pop-up to start taking orders again.

**Prices to check.** Every price in `assets/prices.js` has a placeholder so the site shows real numbers. Confirmed so far: classic tote ₦10,000 / €10, premium tote bag ₦20,000 / €40, T-shirt ₦15,000 / €15, patch ₦9,500 and card ₦3,500; replace the rest with your own. A price set to `null` shows as [PRICE], and totals that include it show [TOTAL].

**Text placeholders in square brackets:**
- Design menu: the size of each type

## Prices for Nigeria and Europe

All prices live in one file, `assets/prices.js`, with one list for Nigeria (`ng`, in naira) and one for Europe (`eu`, in euros). Each euro price is set by hand, not converted from naira. Put a number in place of `null`, for example `25` or `24.50`. The home page prices update from the same file.

**Which prices a visitor sees:**
- **First visit:** visitors whose computer or phone is set to a European time zone see euros, and everyone else sees naira.
- **Switching:** the NGN ₦ / EUR € switch in the header (inside the menu on phones) changes it, and the browser remembers the choice.
- **Links:** a link ending in `?region=eu` or `?region=ng` (for example `build-your-tote.html?region=eu`) opens with those prices, which is handy for ads.

WhatsApp orders from the euro prices end with "(Prices in euros, ordering from Europe.)" so you can tell them apart. Both regions use the same WhatsApp number, and there's no delivery charge.

## Story Kits (limited stock)

A Story Kit is a white tee printed with a line-drawn scene, plus a set of iron-on pieces the customer places and irons on themselves. The page is `story-kit.html` (`story-kit.html?kit=danfo-days` opens a specific kit). Kits live in `STORY_KITS` in `assets/catalog.js`, and the price is `storyKit` in `assets/prices.js`.

**Stock is counted by hand.** Orders come in on WhatsApp, so the site can't know when a kit is sold. Each kit has a `stock` line with how many are left in each size, for example `stock: { M: 2, L: 4, XL: 2, '2XL': 2 }`:
1. When you confirm an order, lower that size's number (for example `L: 4` to `L: 3`).
2. Upload `assets/catalog.js` again.

The page shows "Only N left", each size shows its own count, and the quantity can't go above what's left in the chosen size. A size at 0 is crossed out, and when every size is 0 the kit shows **Sold out** with a link to Instagram. Sizes not listed in `stock` don't appear. The kit's tile on All products, New arrivals and the Holiday Gift Guide shows the count too.

**Photos:** `images/story-kits/`. The gallery shows the model shot (`danfo-days-model.webp`), the flat lay of everything in the kit (`danfo-days-flatlay.webp`, also used on product tiles), opening the box, cutting, ironing and peeling (`danfo-days-open-box.webp`, `-cutting`, `-ironing`, `-peeling`), the finished tee being unboxed (`danfo-days-unboxing.webp`), the finished scene (`danfo-days-scene.webp`), then the size chart (`danfo-days-size-chart.webp`). Square photos fit best. The homepage Story Kits band uses the first two gallery photos. To change them, edit `img` and `gallery` in `STORY_KITS`.

**To add the next scene:** copy the Danfo Days entry in `STORY_KITS`, give it a new `id`, and add `'kit-<id>'` to any collection.

## Prints, patches and pins

Every design can come as a **print** (a heat transfer pressed flat on), a **patch** (embroidered, iron-on) or a **pin** (enamel, locking back). `TYPES` is near the top of the script in both `build-your-tote.html` and `patches.html` (keep the two the same); the designs themselves are in `assets/catalog.js`.

- **`TYPES`**: one entry per type, with its `label`, `soldAlone` (whether people can buy it without a tote or tee) and a short `note` shown to customers. Their prices are `print`, `patch` and `pin` in `assets/prices.js`.
- **`types`** on each design in `PATCHES`: the types it comes in, for example `['print', 'patch']`.
- **`pinSrc`** (optional) on a design: its pin image. Setting it switches Pin on for that design; you don't need to add `'pin'` to `types`.
- **Images**: designs live in `images/patches/` as transparent cut-outs. The embroidered ones are named `patch-…` and come as patches only; the flat sticker-style ones are named `print-…` and come as prints only. Danfo full house, Wahala, Abuja stamp and Lagos stamp still come as both.
- **`prices`** (optional) on a design: a different price for that design only, per region, for example `prices: { ng: { patch: 12000 }, eu: { patch: 30 } }`. Anything not listed uses the usual price from `assets/prices.js`.

**To switch pins on for a design:** add the pin photo to `images/pins/`, then add `pinSrc: 'images/pins/<file>'` to that design in `assets/catalog.js`. The Pin option appears in the builder and the Pins filter on the design menu as soon as one design has a pin.

## Adding a design or a card

- **New design:** add the image to `images/patches/`. Then add a line to the `PATCHES` list in `assets/catalog.js`, with the next id and number, a name, a category, `types: ['print', 'patch']`, `src: 'images/patches/<file>'` and a short `desc`.
- **New card:** add the image to `images/cards/` and a line to the `CARDS` list in `assets/catalog.js`. `w` and `h` are the image's width and height in pixels.
- Either one then shows on All products automatically. Add its id to any other collection you want it on.
