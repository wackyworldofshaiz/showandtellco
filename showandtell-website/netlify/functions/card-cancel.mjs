// POST /api/cards/cancel { id, k } — the sender cancels a scheduled card before it goes.
import { store, json, dueKey } from '../lib/cards.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Use POST.' }, 405);
  let input = {};
  try { input = await req.json(); } catch (e) {}
  const id = String(input.id || '');
  if (!/^[A-Za-z0-9]+$/.test(id)) return json({ error: 'not-found' }, 404);

  const s = store();
  const card = await s.get('card/' + id, { type: 'json' });
  if (!card || !input.k || input.k !== card.key) return json({ error: 'not-found' }, 404);
  if (card.status !== 'scheduled') return json({ error: card.status === 'sent' ? 'This card has already been sent.' : 'This card can no longer be cancelled.' }, 409);

  card.status = 'cancelled';
  card.cancelledAt = new Date().toISOString();
  await s.setJSON('card/' + id, card);
  await s.delete(dueKey(card));
  return json({ ok: true, status: 'cancelled' });
};

export const config = { path: '/api/cards/cancel' };
