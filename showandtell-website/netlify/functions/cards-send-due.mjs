// Runs every 10 minutes and sends every scheduled card whose time has come.
// Scheduled functions only run on the live site (or with "netlify functions:invoke" when testing).
import { store, env, deliver } from '../lib/cards.mjs';

export default async () => {
  const s = store();
  const site = (env('SITE_URL') || env('URL') || 'https://showandtellco.shop').replace(/\/$/, '');
  const now = new Date().toISOString();
  const { blobs } = await s.list({ prefix: 'due/' });
  let sent = 0, waiting = 0;
  for (const b of blobs) {
    const sendAt = b.key.slice(4).split('__')[0];
    if (sendAt > now) { waiting++; continue; }
    const id = b.key.split('__')[1];
    const card = await s.get('card/' + id, { type: 'json' });
    if (!card || card.status !== 'scheduled') { await s.delete(b.key); continue; }
    const done = await deliver(s, card, site, { notifySender: true });
    if (done.status === 'sent') sent++;
  }
  console.log('Digital cards: sent ' + sent + ', still waiting ' + waiting);
  return new Response('ok');
};

export const config = { schedule: '*/10 * * * *' };
