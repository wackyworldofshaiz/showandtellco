// The staff portal's receipts. Every request needs the staff code (header x-portal-code).
// GET  /api/portal/receipts               — the latest receipts, newest first
// POST /api/portal/receipts {action:'create', ...receipt}  — save a receipt and email it to the customer
// POST /api/portal/receipts {action:'resend', number}       — email a saved receipt again
import { store, checkCode, json, validateReceipt, nextNumber, receiptEmail, sendEmail } from '../lib/portal.mjs';

const INDEX = 'index/receipts';

function summary(r) {
  return { number: r.number, name: r.name, email: r.email, total: r.total, currency: r.currency, payment: r.payment, createdAt: r.createdAt, emailedAt: r.emailedAt || null, emailError: r.emailError || null };
}
async function saveIndex(s, r) {
  const list = (await s.get(INDEX, { type: 'json' })) || [];
  const at = list.findIndex((x) => x.number === r.number);
  if (at >= 0) list[at] = summary(r); else list.unshift(summary(r));
  await s.setJSON(INDEX, list.slice(0, 500));
}
async function email(s, r) {
  const sent = await sendEmail(receiptEmail(r));
  if (sent.id) { r.emailedAt = new Date().toISOString(); r.emailError = null; }
  else r.emailError = sent.error || sent.note || 'Email not sent';
  await s.setJSON('receipt/' + r.number, r);
  await saveIndex(s, r);
  return sent;
}

export default async (req) => {
  const wrong = await checkCode(req);
  if (wrong) return wrong;
  const s = store();

  if (req.method === 'GET') {
    const url = new URL(req.url);
    const number = url.searchParams.get('number');
    if (number) {
      const r = await s.get('receipt/' + number.replace(/[^A-Z0-9-]/gi, ''), { type: 'json' });
      return r ? json({ receipt: r }) : json({ error: 'not-found' }, 404);
    }
    return json({ receipts: ((await s.get(INDEX, { type: 'json' })) || []).slice(0, 100) });
  }
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  const body = await req.json().catch(() => ({}));
  if (body.action === 'resend') {
    const r = await s.get('receipt/' + String(body.number || '').replace(/[^A-Z0-9-]/gi, ''), { type: 'json' });
    if (!r) return json({ error: 'not-found', message: 'That receipt was not found.' }, 404);
    const sent = await email(s, r);
    return json({ receipt: r, sent: !!sent.id, message: sent.id ? null : r.emailError });
  }

  const v = validateReceipt(body);
  if (v.error) return json({ error: 'invalid', message: v.error }, 400);
  const r = v.receipt;
  r.number = await nextNumber(s);
  r.createdAt = new Date().toISOString();
  await s.setJSON('receipt/' + r.number, r);
  const sent = body.send === false ? {} : await email(s, r);
  if (body.send === false) await saveIndex(s, r);
  return json({ receipt: r, sent: !!sent.id, message: sent.id || body.send === false ? null : r.emailError });
};

export const config = { path: '/api/portal/receipts' };
