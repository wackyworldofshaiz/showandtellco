// GET /c/<id> — the short card link people share on WhatsApp (or any chat).
// Chat apps read this page's preview tags, so the preview shows the card itself and "Tolu sent you a card".
// People are sent straight on to open-card.html. Opening this link doesn't count as "opened";
// that happens when the card page loads the card.
import { store, siteUrl } from '../lib/cards.mjs';

function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

export default async (req, context) => {
  const id = String((context && context.params && context.params.id) || '').slice(0, 40);
  const site = siteUrl(req);
  const ok = /^[A-Za-z0-9]+$/.test(id);
  const card = ok ? await store().get('card/' + id, { type: 'json' }) : null;
  const open = site + '/open-card.html' + (ok ? '?id=' + encodeURIComponent(id) : '');
  // Only a card that can be opened shows who it's from and its picture.
  const ready = card && card.status === 'sent';
  const title = ready ? card.fromName + ' sent you a card' : 'You have a card';
  const image = ready ? site + '/' + card.cardSrc : site + '/images/share/share-cards.jpg';
  const desc = 'Open it to read the message inside. From Show and Tell Co.';
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width, initial-scale=1">'
    + '<title>' + esc(title) + '</title><meta name="robots" content="noindex">'
    + '<meta name="description" content="' + esc(desc) + '">'
    + '<meta property="og:type" content="website"><meta property="og:site_name" content="Show and Tell Co">'
    + '<meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '">'
    + '<meta property="og:image" content="' + esc(image) + '"><meta property="og:url" content="' + esc(site + '/c/' + id) + '">'
    + '<meta name="twitter:card" content="summary"><meta name="twitter:title" content="' + esc(title) + '"><meta name="twitter:image" content="' + esc(image) + '">'
    + '<meta http-equiv="refresh" content="0;url=' + esc(open) + '">'
    + '<script>location.replace(' + JSON.stringify(open).replace(/</g, '\\u003c') + ')</script>'
    + '</head><body style="font-family:sans-serif;padding:40px;text-align:center;"><a href="' + esc(open) + '">Open your card</a></body></html>';
  return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
};

export const config = { path: '/c/:id' };
