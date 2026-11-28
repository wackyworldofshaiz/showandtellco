// GET /api/cards/get?id=...&k=... — the card for open-card.html.
// Without the sender key (k) a card only shows once it has been sent, and the first view counts as "opened".
import { store, json, publicView, siteUrl, sendEmail, senderUpdateEmail } from '../lib/cards.mjs';

export default async (req) => {
  const url = new URL(req.url);
  const id = (url.searchParams.get('id') || '').slice(0, 40);
  const k = url.searchParams.get('k') || '';
  if (!/^[A-Za-z0-9]+$/.test(id)) return json({ error: 'not-found' }, 404);

  const s = store();
  const card = await s.get('card/' + id, { type: 'json' });
  if (!card) return json({ error: 'not-found' }, 404);
  const isSender = k && k === card.key;

  if (!isSender) {
    if (card.status === 'cancelled' || card.status === 'failed') return json({ error: 'not-found' }, 404);
    if (card.status !== 'sent') return json({ error: 'not-yet' }, 404);
    if (!card.openedAt) {
      card.openedAt = new Date().toISOString();
      await s.setJSON('card/' + id, card);
      if (card.delivery && (card.delivery.recipient || card.delivery.whatsapp)) await sendEmail(senderUpdateEmail(card, siteUrl(req), 'opened')).catch(() => {});
    }
  }
  return json({ card: publicView(card, isSender, siteUrl(req)), sender: !!isSender });
};

export const config = { path: '/api/cards/get' };
