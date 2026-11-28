// Shared code for digital cards: saving them, sending the emails, and the email designs.
// Cards are kept in Netlify Blobs (store "digital-cards"):
//   card/<id>                 the card itself (JSON)
// A card goes by email (we send it) or by WhatsApp (the sender sends our link from their own phone;
// for a scheduled one we email them a reminder with the button at the time). Card links shared on
// WhatsApp use /c/<id> (functions/card-link.mjs), which shows the card in the link preview.
//   due/<send time>__<id>     one entry per scheduled card, removed once it is sent or cancelled
// Settings are environment variables in Netlify (Site configuration › Environment variables):
//   CARDS_TEST_CODE   the code that sends a card without paying, while payments are off
//   RESEND_API_KEY    turns real emails on (resend.com). Without it, cards are saved and "sent"
//                     but no email goes out, so you can test with the card link instead
//   CARDS_FROM        who the emails come from, for example: Show and Tell Co <cards@showandtellco.shop>
//   SITE_URL          optional; the site address used in emails (Netlify fills in URL by itself)
import { getStore } from '@netlify/blobs';
import { randomBytes } from 'node:crypto';

export const FONTS = {
  neat: { name: 'Caveat', label: 'Neat' },
  loopy: { name: 'Homemade Apple', label: 'Loopy' },
  marker: { name: 'Gochi Hand', label: 'Marker' },
  scribble: { name: 'Reenie Beanie', label: 'Scribble' },
  biro: { name: 'Nothing You Could Do', label: 'Biro' },
  fancy: { name: 'Pinyon Script', label: 'Fancy' }
};
export const INKS = { ink: '#1A0B45', violet: '#5D1AFA', berry: '#C2306F', forest: '#1F6B4A', black: '#1F1F1F' };
export const LIMITS = { message: 600, name: 60, email: 200 };
const MAX_AHEAD_DAYS = 366;

export function store() {
  return getStore({ name: 'digital-cards', consistency: 'strong' });
}

export function env(name, fallback) {
  const v = (typeof Netlify !== 'undefined' && Netlify.env && Netlify.env.get(name)) || process.env[name];
  return v == null || v === '' ? fallback : v;
}

export function siteUrl(req) {
  const fromEnv = env('SITE_URL') || env('URL');
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  try { return new URL(req.url).origin; } catch (e) { return 'https://showandtellco.shop'; }
}

// A random id of the given length, letters and digits only (hard to guess, safe in links).
export function newId(length) {
  return randomBytes(length * 2).toString('base64url').replace(/[-_]/g, '').slice(0, length);
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;
function clean(s, max) { return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max); }

// Checks what the card writer sent. Returns { card } or { error }.
export function validate(input) {
  const card = {
    cardNo: clean(input.cardNo, 6),
    cardSrc: clean(input.cardSrc, 120),
    cardTitle: clean(input.cardTitle, 160),
    message: clean(input.message, LIMITS.message),
    font: clean(input.font, 20),
    ink: clean(input.ink, 20),
    toName: clean(input.toName, LIMITS.name),
    toEmail: clean(input.toEmail, LIMITS.email).toLowerCase(),
    fromName: clean(input.fromName, LIMITS.name),
    fromEmail: clean(input.fromEmail, LIMITS.email).toLowerCase(),
    tz: clean(input.tz, 60) || 'UTC',
    via: input.via === 'whatsapp' ? 'whatsapp' : 'email',
    toPhone: ''
  };
  if (!/^\d{1,4}$/.test(card.cardNo) || !/^images\/cards\/card-\d+\.(jpg|jpeg|png|webp)$/.test(card.cardSrc)) return { error: 'Please choose a card.' };
  if (!card.message) return { error: 'Please write a message in your card.' };
  if (!FONTS[card.font]) card.font = 'neat';
  if (!INKS[card.ink]) card.ink = 'ink';
  if (!card.toName) return { error: 'Who is the card for? Add their name.' };
  if (card.via === 'whatsapp') {
    card.toEmail = '';
    // Their WhatsApp number is optional: with it, WhatsApp opens their chat straight away.
    const digits = String(input.toPhone || '').replace(/[^\d]/g, '').replace(/^00/, '');
    if (digits && (digits.length < 8 || digits.length > 15)) return { error: 'Please check their WhatsApp number, with the country code (for example +234).' };
    card.toPhone = digits;
  } else if (!EMAIL_RE.test(card.toEmail)) return { error: "Please check the recipient's email address." };
  if (!card.fromName) return { error: 'Add your name so they know who it is from.' };
  if (!EMAIL_RE.test(card.fromEmail)) return { error: 'Please check your email address. We send your receipt there.' };

  const now = Date.now();
  if (input.when === 'later') {
    const t = Date.parse(input.sendAt);
    if (!Number.isFinite(t)) return { error: 'Please pick a date and time to send it.' };
    if (t < now - 60 * 1000) return { error: 'That time has already passed. Pick a later time, or send it now.' };
    if (t > now + MAX_AHEAD_DAYS * 864e5) return { error: 'Cards can be scheduled up to a year ahead.' };
    card.sendAt = new Date(Math.max(t, now)).toISOString();
    card.sendAtLabel = clean(input.sendAtLabel, 120);
  } else {
    card.sendAt = new Date(now).toISOString();
  }
  return { card };
}

// ---------- WhatsApp ----------
// The link the sender shares: /c/<id> shows the card's picture in WhatsApp's preview, then opens the card.
export function shareLink(card, site) { return site + '/c/' + encodeURIComponent(card.id); }
export function whatsappText(card, site) {
  return 'Hi ' + card.toName + '! I sent you a card 💌 Open it here: ' + shareLink(card, site);
}
// Opens WhatsApp with the message written: in their chat if we have their number, otherwise the sender picks.
export function whatsappUrl(card, site) {
  return 'https://wa.me/' + (card.toPhone || '') + '?text=' + encodeURIComponent(whatsappText(card, site));
}

// What anyone with the card link may see. With the sender key, a little more.
export function publicView(card, withKey, site) {
  const out = {
    id: card.id, cardNo: card.cardNo, cardSrc: card.cardSrc, cardTitle: card.cardTitle,
    message: card.message, font: card.font, ink: card.ink,
    toName: card.toName, fromName: card.fromName, status: card.status,
    sendAt: card.sendAt, sendAtLabel: card.sendAtLabel || '', sentAt: card.sentAt || null
  };
  if (withKey) {
    out.toEmail = card.toEmail; out.fromEmail = card.fromEmail; out.openedAt = card.openedAt || null;
    out.emailed = !!(card.delivery && card.delivery.recipient);
    out.emailNote = (card.delivery && card.delivery.note) || '';
    out.via = card.via || 'email';
    if (out.via === 'whatsapp' && site) { out.whatsappUrl = whatsappUrl(card, site); out.shareLink = shareLink(card, site); }
  }
  return out;
}

export function dueKey(card) { return 'due/' + card.sendAt + '__' + card.id; }

// ---------- Email ----------
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// Who an email is from. With personName, it reads like a person sent it
// ("Tolu via Show and Tell Co"), which helps Gmail put it in Primary rather than Promotions.
function fromLine(personName) {
  const from = env('CARDS_FROM', 'Show and Tell Co <onboarding@resend.dev>');
  const name = String(personName || '').replace(/[<>"\r\n,;]/g, '').trim().slice(0, 60);
  if (!name) return from;
  const m = from.match(/<([^>]+)>/);
  const address = m ? m[1] : from.trim();
  return '"' + name + ' via Show and Tell Co" <' + address + '>';
}

export async function sendEmail({ to, subject, html, text, replyTo, fromName }) {
  const key = env('RESEND_API_KEY');
  if (!key) return { skipped: true, note: 'No email sent: RESEND_API_KEY is not set yet.' };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: 'Bearer ' + key, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: fromLine(fromName),
      to: [to], subject, html, text, reply_to: replyTo || undefined
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: (data && (data.message || data.name)) || 'Email failed (' + res.status + ')' };
  return { id: data.id };
}

function shell(inner, preheader) {
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>'
    + '<body style="margin:0;padding:0;background:#F6F1E7;">'
    + '<div style="display:none;max-height:0;overflow:hidden;">' + esc(preheader) + '</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1E7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border-radius:18px;">'
    + inner
    + '</table>'
    + '<p style="margin:20px 0 0;font:13px/1.5 Helvetica,Arial,sans-serif;color:#6B6B68;">Show and Tell Co · Everyday joy, printed to keep</p>'
    + '</td></tr></table></body></html>';
}
function button(href, label, bg) {
  return '<a href="' + esc(href) + '" style="display:inline-block;padding:16px 30px;border-radius:10px;background:' + (bg || '#5D1AFA') + ';color:#FFFFFF;font:700 14px/1 Helvetica,Arial,sans-serif;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;">' + esc(label) + '</a>';
}

export function recipientEmail(card, site) {
  const link = site + '/open-card.html?id=' + encodeURIComponent(card.id);
  const img = site + '/' + card.cardSrc;
  const subject = card.fromName + ' sent you a card';
  // Kept plain and personal on purpose: a short note, one picture and one link. Heavy,
  // branded layouts are what Gmail files under Promotions.
  const p = 'margin:0 0 16px;font:16px/1.55 Helvetica,Arial,sans-serif;color:#1F1F1F;';
  const html = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>'
    + '<body style="margin:0;padding:24px 16px;background:#FFFFFF;"><div style="max-width:520px;">'
    + '<p style="' + p + '">Hi ' + esc(card.toName) + ',</p>'
    + '<p style="' + p + '">' + esc(card.fromName) + ' sent you a card, with a message written inside.</p>'
    + '<p style="' + p + '"><a href="' + esc(link) + '"><img src="' + esc(img) + '" width="160" alt="' + esc(card.cardTitle || 'Your card') + '" style="display:block;width:160px;max-width:100%;height:auto;border-radius:6px;border:0;"></a></p>'
    + '<p style="' + p + '"><a href="' + esc(link) + '" style="color:#5D1AFA;font-weight:bold;">Open your card</a></p>'
    + '<p style="margin:24px 0 0;font:13px/1.5 Helvetica,Arial,sans-serif;color:#6B6B68;">Sent with Show and Tell Co. Reply to this email to answer ' + esc(card.fromName) + '.</p>'
    + '</div></body></html>';
  const text = 'Hi ' + card.toName + ',\n\n' + card.fromName + ' sent you a card, with a message written inside. Open it here:\n' + link
    + '\n\nSent with Show and Tell Co. Reply to this email to answer ' + card.fromName + '.';
  return { to: card.toEmail, subject, html, text };
}

const WA_GREEN = '#128C4A';
function smallLink(href, label) {
  return '<tr><td style="padding:0 32px 40px;font:14px/1.5 Helvetica,Arial,sans-serif;"><a href="' + esc(href) + '" style="color:#5D1AFA;">' + esc(label) + '</a></td></tr>';
}

// WhatsApp cards: the sender's email, with the button that opens WhatsApp with the message written.
function whatsappSenderEmail(card, site, kind) {
  const view = site + '/open-card.html?id=' + encodeURIComponent(card.id) + '&k=' + encodeURIComponent(card.key);
  const scheduled = kind === 'receipt' && card.status === 'scheduled';
  const when = card.sendAtLabel || new Date(card.sendAt).toUTCString();
  const subject = scheduled ? 'Your card for ' + card.toName + ' is scheduled'
    : kind === 'due' ? 'It’s time to send your card to ' + card.toName
    : 'Your card for ' + card.toName + ' is ready to send';
  const body = scheduled
    ? 'On <b>' + esc(when) + '</b> we’ll email you a reminder with a button to send it to ' + esc(card.toName) + ' on WhatsApp. Until then, the card won’t open. You can see it, or cancel it, from your private link.'
    : 'Tap the button to send it to ' + esc(card.toName) + ' on WhatsApp. The message and the link are already written; just press send. We’ll email you when they open it.';
  const html = shell(
    '<tr><td style="padding:36px 32px 0;font:800 26px/1.15 Helvetica,Arial,sans-serif;color:#1A0B45;">' + esc(subject) + '</td></tr>'
    + '<tr><td style="padding:14px 32px 0;font:16px/1.55 Helvetica,Arial,sans-serif;color:#3A3A38;">' + body + '</td></tr>'
    + '<tr><td style="padding:26px 32px 22px;">' + (scheduled ? button(view, 'See or cancel your card') : button(whatsappUrl(card, site), 'Send on WhatsApp', WA_GREEN)) + '</td></tr>'
    + (scheduled ? '<tr><td style="padding:0 0 18px;"></td></tr>' : smallLink(view, 'See your card') ),
    subject
  );
  const text = subject + '.\n\n' + (scheduled ? 'See or cancel your card: ' + view : 'Send it on WhatsApp: ' + whatsappUrl(card, site) + '\n\nOr copy this link into any chat: ' + shareLink(card, site) + '\n\nSee your card: ' + view) + '\n\nShow and Tell Co';
  return { to: card.fromEmail, subject, html, text };
}

export function senderReceiptEmail(card, site) {
  if (card.via === 'whatsapp') return whatsappSenderEmail(card, site, 'receipt');
  const view = site + '/open-card.html?id=' + encodeURIComponent(card.id) + '&k=' + encodeURIComponent(card.key);
  const scheduled = card.status === 'scheduled';
  const when = scheduled ? (card.sendAtLabel || new Date(card.sendAt).toUTCString()) : 'now';
  const subject = scheduled ? 'Your card to ' + card.toName + ' is scheduled' : 'Your card to ' + card.toName + ' is on its way';
  const html = shell(
    '<tr><td style="padding:36px 32px 0;font:800 26px/1.15 Helvetica,Arial,sans-serif;color:#1A0B45;">' + esc(subject) + '</td></tr>'
    + '<tr><td style="padding:14px 32px 0;font:16px/1.55 Helvetica,Arial,sans-serif;color:#3A3A38;">'
    + (scheduled ? 'We will email it to ' + esc(card.toName) + ' (' + esc(card.toEmail) + ') on <b>' + esc(when) + '</b>.' : 'We have emailed it to ' + esc(card.toName) + ' (' + esc(card.toEmail) + ').')
    + '</td></tr>'
    + '<tr><td style="padding:14px 32px 0;font:16px/1.55 Helvetica,Arial,sans-serif;color:#3A3A38;">'
    + (scheduled ? 'You can see the card, or cancel it before it sends, from this link. Keep it to yourself: it lets anyone cancel the card.' : 'You can see the card from this link.')
    + '</td></tr>'
    + '<tr><td style="padding:26px 32px 40px;">' + button(view, scheduled ? 'See or cancel your card' : 'See your card') + '</td></tr>',
    scheduled ? 'Scheduled for ' + when : 'Sent to ' + card.toName
  );
  const text = subject + '.\n\nSee your card: ' + view + '\n\nShow and Tell Co';
  return { to: card.fromEmail, subject, html, text };
}

export function senderUpdateEmail(card, site, kind) {
  const view = site + '/open-card.html?id=' + encodeURIComponent(card.id) + '&k=' + encodeURIComponent(card.key);
  const subject = kind === 'opened' ? card.toName + ' opened your card' : 'Your card to ' + card.toName + ' has been delivered';
  const body = kind === 'opened' ? card.toName + ' just opened the card you sent. ✦' : 'Your scheduled card has just gone out to ' + esc(card.toName) + ' (' + esc(card.toEmail) + ').';
  const html = shell(
    '<tr><td style="padding:36px 32px 0;font:800 26px/1.15 Helvetica,Arial,sans-serif;color:#1A0B45;">' + esc(subject) + '</td></tr>'
    + '<tr><td style="padding:14px 32px 0;font:16px/1.55 Helvetica,Arial,sans-serif;color:#3A3A38;">' + body + '</td></tr>'
    + '<tr><td style="padding:26px 32px 40px;">' + button(view, 'See your card') + '</td></tr>',
    subject
  );
  return { to: card.fromEmail, subject, html, text: subject + '.\n\n' + view };
}

// Sends a card that is due: the recipient's email first, then a note to the sender.
// Saves the result on the card and removes it from the queue.
export async function deliver(s, card, site, { notifySender }) {
  if (card.via === 'whatsapp') {
    // The sender sends it themselves: the card can now be opened, and (if it was scheduled) we
    // email them the reminder with the WhatsApp button.
    card.status = 'sent';
    card.sentAt = new Date().toISOString();
    card.delivery = { whatsapp: true, note: '' };
    if (notifySender) {
      const r = await sendEmail(whatsappSenderEmail(card, site, 'due')).catch((e) => ({ error: String(e) }));
      card.delivery.note = r.id ? '' : (r.note || r.error || '');
    }
    await s.setJSON('card/' + card.id, card);
    await s.delete(dueKey(card));
    return card;
  }
  const r = await sendEmail({ ...recipientEmail(card, site), replyTo: card.fromEmail, fromName: card.fromName });
  if (r.error) {
    card.delivery = { ...(card.delivery || {}), error: r.error, tries: ((card.delivery && card.delivery.tries) || 0) + 1, lastTry: new Date().toISOString() };
    // Give up after 5 tries (about 50 minutes), so a bad address doesn't retry for ever.
    if (card.delivery.tries >= 5) { card.status = 'failed'; await s.delete(dueKey(card)); }
    await s.setJSON('card/' + card.id, card);
    return card;
  }
  card.status = 'sent';
  card.sentAt = new Date().toISOString();
  card.delivery = { recipient: r.id || null, note: r.note || '' };
  await s.setJSON('card/' + card.id, card);
  await s.delete(dueKey(card));
  if (notifySender && !r.skipped) await sendEmail(senderUpdateEmail(card, site, 'delivered')).catch(() => {});
  return card;
}
