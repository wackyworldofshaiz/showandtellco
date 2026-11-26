// The staff portal (portal.html). Staff sign in with one shared code, PORTAL_CODE, set in
// Netlify under Site configuration > Environment variables. Every request checks it here on the
// server, so the page itself holds nothing private.
// Receipts are kept in Netlify Blobs (store "portal") and emailed with Resend, like digital cards.
import { getStore } from '@netlify/blobs';
import { createHash, timingSafeEqual } from 'node:crypto';
import { env, json, sendEmail } from './cards.mjs';

export { json };

export function store() {
  return getStore({ name: 'portal', consistency: 'strong' });
}

// Returns null when the code is right, or the response to send back when it isn't.
export async function checkCode(req) {
  const want = env('PORTAL_CODE');
  if (!want) return json({ error: 'not-set-up', message: 'The portal code has not been set yet. Add PORTAL_CODE in Netlify.' }, 503);
  const got = req.headers.get('x-portal-code') || '';
  const a = createHash('sha256').update(String(got)).digest();
  const b = createHash('sha256').update(String(want)).digest();
  if (got && timingSafeEqual(a, b)) return null;
  await new Promise((r) => setTimeout(r, 900)); // slows down guessing
  return json({ error: 'wrong-code', message: 'That code is not right.' }, 401);
}

// ---------- Receipts ----------
export const CURRENCIES = { NGN: { symbol: '₦', decimals: 0 }, EUR: { symbol: '€', decimals: 2 } };
export const PAYMENT = ['Paid', 'Part paid', 'Not paid yet'];
export const METHODS = ['Bank transfer', 'Cash', 'Card', 'Paystack', 'Stripe', 'Other'];
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;

function clean(s, max) { return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max); }
function amount(v) { const n = Number(String(v == null ? '' : v).replace(/,/g, '')); return Number.isFinite(n) && n >= 0 && n <= 1e9 ? Math.round(n * 100) / 100 : NaN; }

export function money(n, currency) {
  const c = CURRENCIES[currency] || CURRENCIES.NGN;
  return c.symbol + Number(n).toLocaleString('en-GB', { minimumFractionDigits: c.decimals, maximumFractionDigits: c.decimals });
}

// Checks a receipt from the form and works out its totals. Returns { receipt } or { error }.
export function validateReceipt(input) {
  const i = input || {};
  const currency = CURRENCIES[i.currency] ? i.currency : null;
  if (!currency) return { error: 'Choose naira or euros.' };
  const name = clean(i.name, 80);
  const email = clean(i.email, 200).toLowerCase();
  if (!name) return { error: 'Add the customer’s name.' };
  if (!EMAIL_RE.test(email)) return { error: 'That email address doesn’t look right.' };
  const rows = Array.isArray(i.items) ? i.items.slice(0, 40) : [];
  const items = [];
  for (const r of rows) {
    const product = clean(r && r.product, 120);
    if (!product) continue;
    const qty = Math.floor(Number(r.qty));
    const price = amount(r.price);
    if (!(qty >= 1 && qty <= 9999)) return { error: 'Check the quantity for “' + product + '”.' };
    if (Number.isNaN(price)) return { error: 'Check the price for “' + product + '”.' };
    items.push({ product, qty, price, total: Math.round(qty * price * 100) / 100 });
  }
  if (!items.length) return { error: 'Add at least one product.' };
  const delivery = amount(i.delivery || 0), discount = amount(i.discount || 0);
  if (Number.isNaN(delivery)) return { error: 'Check the delivery amount.' };
  if (Number.isNaN(discount)) return { error: 'Check the discount.' };
  const subtotal = Math.round(items.reduce((s, x) => s + x.total, 0) * 100) / 100;
  const total = Math.round((subtotal + delivery - discount) * 100) / 100;
  if (total < 0) return { error: 'The discount is bigger than the total.' };
  const payment = PAYMENT.includes(i.payment) ? i.payment : PAYMENT[0];
  const method = METHODS.includes(i.method) ? i.method : '';
  const paidAmount = payment === 'Part paid' ? amount(i.paidAmount) : null;
  if (payment === 'Part paid' && (Number.isNaN(paidAmount) || paidAmount <= 0 || paidAmount >= total)) return { error: 'For part paid, add how much they have paid (less than the total).' };
  return {
    receipt: {
      currency, name, email, phone: clean(i.phone, 40), items, subtotal, delivery, discount, total,
      payment, method, paidAmount, note: clean(i.note, 600), staff: clean(i.staff, 60)
    }
  };
}

// The next receipt number, for example STC-2026-0007. Counts up per year.
export async function nextNumber(s) {
  const year = new Date().getFullYear();
  const key = 'counter/' + year;
  const n = ((await s.get(key, { type: 'json' })) || 0) + 1;
  await s.setJSON(key, n);
  return 'STC-' + year + '-' + String(n).padStart(4, '0');
}

function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// The receipt email. Plain tables so it looks right in every email app.
export function receiptEmail(r) {
  const m = (n) => esc(money(n, r.currency));
  const date = new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const cell = 'padding:10px 0;border-bottom:1px solid #EEEAF6;font:15px/1.4 Helvetica,Arial,sans-serif;color:#1A0B45;';
  const rows = r.items.map((x) => '<tr><td style="' + cell + '">' + esc(x.product) + '<br><span style="color:#6B6B68;font-size:13px;">' + x.qty + ' × ' + m(x.price) + '</span></td>'
    + '<td align="right" style="' + cell + 'white-space:nowrap;">' + m(x.total) + '</td></tr>').join('');
  const line = (label, value, strong) => '<tr><td style="padding:6px 0;font:' + (strong ? '700 17px' : '15px') + '/1.4 Helvetica,Arial,sans-serif;color:#1A0B45;">' + label + '</td>'
    + '<td align="right" style="padding:6px 0;font:' + (strong ? '700 17px' : '15px') + '/1.4 Helvetica,Arial,sans-serif;color:#1A0B45;white-space:nowrap;">' + value + '</td></tr>';
  const status = r.payment === 'Paid' ? 'Paid' + (r.method ? ' · ' + esc(r.method) : '')
    : r.payment === 'Part paid' ? 'Part paid: ' + m(r.paidAmount) + (r.method ? ' by ' + esc(r.method) : '') + '. Balance due: ' + m(r.total - r.paidAmount)
    : 'Not paid yet';
  const html = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>'
    + '<body style="margin:0;padding:0;background:#F6F1E7;">'
    + '<div style="display:none;max-height:0;overflow:hidden;">Your receipt ' + esc(r.number) + ' from Show and Tell Co</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1E7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:18px;">'
    + '<tr><td style="padding:30px 32px 10px;background:#5D1AFA;border-radius:18px 18px 0 0;">'
    + '<p style="margin:0;font:700 13px/1 Helvetica,Arial,sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:#E4EE3F;">Receipt</p>'
    + '<p style="margin:10px 0 20px;font:800 26px/1.1 Helvetica,Arial,sans-serif;color:#FFFFFF;">Show and Tell Co</p></td></tr>'
    + '<tr><td style="padding:24px 32px 6px;">'
    + '<p style="margin:0 0 4px;font:15px/1.5 Helvetica,Arial,sans-serif;color:#1A0B45;">Hi ' + esc(r.name.split(' ')[0]) + ', thank you for your order! Here is your receipt.</p>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0 8px;"><tr>'
    + '<td style="font:13px/1.5 Helvetica,Arial,sans-serif;color:#6B6B68;">Receipt number<br><b style="color:#1A0B45;font-size:15px;">' + esc(r.number) + '</b></td>'
    + '<td align="right" style="font:13px/1.5 Helvetica,Arial,sans-serif;color:#6B6B68;">Date<br><b style="color:#1A0B45;font-size:15px;">' + esc(date) + '</b></td></tr></table>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">' + rows + '</table>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">'
    + line('Subtotal', m(r.subtotal))
    + (r.delivery ? line('Delivery', m(r.delivery)) : '')
    + (r.discount ? line('Discount', '−' + m(r.discount)) : '')
    + line('Total', m(r.total), true)
    + '</table>'
    + '<p style="margin:16px 0 0;padding:12px 14px;border-radius:10px;background:#F4F0FF;font:14px/1.5 Helvetica,Arial,sans-serif;color:#1A0B45;">' + status + '</p>'
    + (r.note ? '<p style="margin:16px 0 0;font:14px/1.6 Helvetica,Arial,sans-serif;color:#3B2E6B;">' + esc(r.note).replace(/\n/g, '<br>') + '</p>' : '')
    + '</td></tr>'
    + '<tr><td style="padding:22px 32px 30px;font:13px/1.6 Helvetica,Arial,sans-serif;color:#6B6B68;">Questions about your order? Just reply to this email.</td></tr>'
    + '</table>'
    + '<p style="margin:20px 0 0;font:13px/1.5 Helvetica,Arial,sans-serif;color:#6B6B68;">Show and Tell Co · showandtellco.shop</p>'
    + '</td></tr></table></body></html>';
  const text = 'Receipt ' + r.number + ' from Show and Tell Co (' + date + ')\n\n'
    + r.items.map((x) => x.product + ' — ' + x.qty + ' × ' + money(x.price, r.currency) + ' = ' + money(x.total, r.currency)).join('\n')
    + '\n\nSubtotal: ' + money(r.subtotal, r.currency)
    + (r.delivery ? '\nDelivery: ' + money(r.delivery, r.currency) : '')
    + (r.discount ? '\nDiscount: −' + money(r.discount, r.currency) : '')
    + '\nTotal: ' + money(r.total, r.currency) + '\n' + status.replace(/<[^>]+>/g, '')
    + (r.note ? '\n\n' + r.note : '') + '\n\nQuestions? Just reply to this email.';
  return { to: r.email, subject: 'Your Show and Tell Co receipt ' + r.number, html, text, replyTo: env('RECEIPTS_REPLY_TO') };
}

export { sendEmail };
