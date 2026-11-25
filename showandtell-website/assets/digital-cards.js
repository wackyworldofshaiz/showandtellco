// Digital cards: shared by send-a-card.html (writing a card) and open-card.html (opening one).
// The handwriting fonts and ink colours are listed here. Keep the keys in step with FONTS and
// INKS in netlify/lib/cards.mjs, which checks them when a card is saved.
// To add a handwriting font: add it to the Google Fonts link in both pages, then add a line here.
// scale evens out fonts that run big or small, so a message fills the card about the same.

var DC_FONTS = [
  { key: 'neat', label: 'Neat', family: "'Caveat', cursive", scale: 1.15 },
  { key: 'loopy', label: 'Loopy', family: "'Homemade Apple', cursive", scale: 0.7 },
  { key: 'marker', label: 'Marker', family: "'Gochi Hand', cursive", scale: 0.95 },
  { key: 'scribble', label: 'Scribble', family: "'Reenie Beanie', cursive", scale: 1.3 },
  { key: 'biro', label: 'Biro', family: "'Nothing You Could Do', cursive", scale: 0.78 },
  { key: 'fancy', label: 'Fancy', family: "'Pinyon Script', cursive", scale: 1.05 }
];
var DC_INKS = [
  { key: 'ink', label: 'Ink', color: '#1A0B45' },
  { key: 'violet', label: 'Violet', color: '#5D1AFA' },
  { key: 'berry', label: 'Berry', color: '#C2306F' },
  { key: 'forest', label: 'Forest', color: '#1F6B4A' },
  { key: 'black', label: 'Black', color: '#1F1F1F' }
];
var DC_MESSAGE_MAX = 600;

function dcFont(key) { return DC_FONTS.find(function (f) { return f.key === key; }) || DC_FONTS[0]; }
function dcInk(key) { return DC_INKS.find(function (i) { return i.key === key; }) || DC_INKS[0]; }
function dcCard(no) { return (typeof CARDS !== 'undefined' && CARDS.find(function (c) { return c.no === String(no); })) || null; }
function dcEsc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// The inside of the card: a cream page with the message written on it.
// ratio is the card's width / height, so the inside matches the front.
function dcInsideHTML(ratio) {
  return '<div class="dc-page dc-inside" style="aspect-ratio:' + ratio + '">'
    + '<div class="dc-msg"></div>'
    + '<div class="dc-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 0c.7 6.6 4.9 10.9 12 12-7.1 1.1-11.3 5.4-12 12-.7-6.6-4.9-10.9-12-12C7.1 10.9 11.3 6.6 12 0z"/></svg>Show and Tell Co</div>'
    + '</div>';
}

// Writes the message into an inside page and shrinks it until it fits.
function dcWrite(page, text, fontKey, inkKey, placeholder) {
  var msg = page.querySelector('.dc-msg');
  var f = dcFont(fontKey);
  msg.style.fontFamily = f.family;
  msg.style.color = dcInk(inkKey).color;
  msg.classList.toggle('is-placeholder', !text);
  msg.textContent = text || placeholder || '';
  dcFit(msg, f.scale);
}
function dcFit(msg, scale) {
  // Sizes are in cqw (a share of the page's width), so the fit is the same at any size.
  var size = 7.4 * (scale || 1);
  msg.style.fontSize = size + 'cqw';
  var guard = 0;
  while (msg.scrollHeight > msg.clientHeight + 1 && size > 2.4 && guard++ < 60) {
    size *= 0.94;
    msg.style.fontSize = size + 'cqw';
  }
}
// Fonts arrive after the page draws, so fit again once they're in.
function dcRefitWhenFontsLoad(redraw) {
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', redraw);
  window.addEventListener('resize', redraw);
}

// ---------- Time zones ----------
// Turns a date and time in a time zone (for example 2026-12-19, 09:00, Africa/Lagos) into the exact moment.
function dcOffset(ms, tz) {
  var parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ms));
  var v = {};
  parts.forEach(function (p) { v[p.type] = +p.value; });
  return Date.UTC(v.year, v.month - 1, v.day, v.hour % 24, v.minute, v.second) - Math.floor(ms / 1000) * 1000;
}
function dcZonedToDate(dateStr, timeStr, tz) {
  var d = dateStr.split('-').map(Number), t = timeStr.split(':').map(Number);
  var guess = Date.UTC(d[0], d[1] - 1, d[2], t[0], t[1]);
  var first = guess - dcOffset(guess, tz);
  return new Date(guess - dcOffset(first, tz));
}
function dcPlace(tz) { return tz.split('/').pop().replace(/_/g, ' '); }
function dcWhenLabel(date, tz) {
  var s = new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  return s.replace(' at ', ', ') + ' (' + dcPlace(tz) + ' time)';
}
function dcMyZone() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; } }
