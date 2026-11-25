// POST /api/cards/create — saves a card from send-a-card.html, then sends it now or queues it.
// While payments are off, it needs the test code (CARDS_TEST_CODE). When payments go in,
// this is the step that will wait for the payment to be confirmed instead.
import { store, validate, newId, json, env, siteUrl, dueKey, deliver, sendEmail, senderReceiptEmail } from '../lib/cards.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Use POST.' }, 405);
  let input;
  try { input = await req.json(); } catch (e) { return json({ error: 'Something went wrong. Please try again.' }, 400); }

  const testCode = env('CARDS_TEST_CODE');
  if (!testCode) return json({ error: 'Sending is switched off: CARDS_TEST_CODE is not set in Netlify yet.' }, 503);
  if (String(input.testCode || '').trim() !== testCode) return json({ error: 'That test code is not right.', field: 'testCode' }, 403);

  const { card, error } = validate(input);
  if (error) return json({ error }, 400);

  const s = store();
  card.id = newId(14);
  card.key = newId(24);
  card.createdAt = new Date().toISOString();
  card.paid = 'test';
  const now = Date.now();
  const sendNow = Date.parse(card.sendAt) <= now + 60 * 1000;
  card.status = 'scheduled';
  await s.setJSON('card/' + card.id, card);
  await s.set(dueKey(card), card.id);

  const site = siteUrl(req);
  let result = card;
  if (sendNow) result = await deliver(s, card, site, { notifySender: false });
  // The sender's receipt, with their private link to see (and, if scheduled, cancel) the card.
  const receipt = await sendEmail(senderReceiptEmail(result, site)).catch((e) => ({ error: String(e) }));

  return json({
    id: result.id, key: result.key, status: result.status, sendAt: result.sendAt, sendAtLabel: result.sendAtLabel || '',
    emailed: !!(result.delivery && result.delivery.recipient),
    emailNote: (result.delivery && (result.delivery.note || result.delivery.error)) || '',
    receipt: receipt.id ? 'sent' : (receipt.note || receipt.error || '')
  });
};

export const config = { path: '/api/cards/create' };
