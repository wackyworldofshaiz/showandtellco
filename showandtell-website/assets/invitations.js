// Digital invitations: draws an invitation from its details, with the envelope to tap open first.
// invitation.html passes in the details. Everything a host types goes through invEsc before it
// reaches the page, so their words show as plain text.

function invEsc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

var INV_STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c.7 6.6 4.9 10.9 12 12-7.1 1.1-11.3 5.4-12 12-.7-6.6-4.9-10.9-12-12C7.1 10.9 11.3 6.6 12 0z"/></svg>';

// A little leafy sprig, drawn rather than an image so it takes the template's colour.
function invSprig(cls) {
  var leaves = '';
  // Leaves grow out from the middle towards both ends, getting smaller as they go.
  // They take turns above and below the stem, like a real sprig.
  var leaf = 'd="M0 0C4-4.5 11-5 17 0 11 5 4 4.5 0 0Z"';
  [64, 55, 46, 37, 28, 20].forEach(function (x, i) {
    var s = 1 - i * 0.11, up = i % 2 === 0 ? -1 : 1;
    leaves += '<path transform="translate(' + x + ' 18) rotate(' + (180 - up * 38) + ') scale(' + s + ')" ' + leaf + '/>'
      + '<path transform="translate(' + (150 - x) + ' 18) rotate(' + (up * 38) + ') scale(' + s + ')" ' + leaf + '/>';
  });
  return '<svg class="inv-sprig ' + (cls || '') + '" viewBox="0 0 150 40" aria-hidden="true">'
    + '<path d="M14 18H136" fill="none" stroke="currentColor" stroke-width="1.1"/>'
    + '<g fill="currentColor" opacity="0.85">' + leaves + '</g>'
    + '<path d="M75 11l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z" fill="currentColor"/></svg>';
}
var INV_RULE = '<svg class="inv-rule" viewBox="0 0 120 18" aria-hidden="true"><path d="M0 9h48M72 9h48" stroke="currentColor" stroke-width="1"/><path d="M60 3l6 6-6 6-6-6z" fill="currentColor"/></svg>';
var INV_ICON = {
  cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 12h18M12 8C10 4 6 4 6 6.5S10 8 12 8zM12 8c2-4 6-4 6-1.5S14 8 12 8z"/></svg>'
};

// ---------- Dates ----------
// The moment a date and time happens in a place's time zone (for example 2027-06-12, 14:00, Africa/Lagos).
function invOffset(ms, tz) {
  var v = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .formatToParts(new Date(ms)).forEach(function (p) { v[p.type] = +p.value; });
  return Date.UTC(v.year, v.month - 1, v.day, v.hour % 24, v.minute, v.second) - Math.floor(ms / 1000) * 1000;
}
function invMoment(dateStr, timeStr, tz) {
  var d = dateStr.split('-').map(Number), t = (timeStr || '00:00').split(':').map(Number);
  var guess = Date.UTC(d[0], d[1] - 1, d[2], t[0], t[1]);
  return new Date(guess - invOffset(guess - invOffset(guess, tz), tz));
}
function invFmt(date, tz, opts) { return new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: tz }, opts)).format(date); }
function invStamp(date) { return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }

function invCalendar(inv) {
  var start = invMoment(inv.date, inv.time, inv.tz);
  var end = inv.endTime ? invMoment(inv.date, inv.endTime, inv.tz) : new Date(start.getTime() + 6 * 3600e3);
  if (end <= start) end = new Date(end.getTime() + 24 * 3600e3); // a party that runs past midnight
  var title = inv.calendarTitle || (inv.names.join(' & ') + "'s wedding");
  var where = [inv.venue.name, inv.venue.address].filter(Boolean).join(', ');
  var google = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(title)
    + '&dates=' + invStamp(start) + '/' + invStamp(end)
    + '&location=' + encodeURIComponent(where)
    + '&details=' + encodeURIComponent('Your invitation: ' + location.href);
  var icsText = function (s) { return String(s).replace(/[\\;,]/g, function (c) { return '\\' + c; }).replace(/\n/g, '\\n'); };
  var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Show and Tell Co//Invitations//EN', 'BEGIN:VEVENT',
    'UID:' + invStamp(start) + '-' + Math.random().toString(36).slice(2) + '@showandtellco.shop',
    'DTSTAMP:' + invStamp(new Date()), 'DTSTART:' + invStamp(start), 'DTEND:' + invStamp(end),
    'SUMMARY:' + icsText(title), 'LOCATION:' + icsText(where), 'DESCRIPTION:' + icsText('Your invitation: ' + location.href),
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return { start: start, google: google, ics: ics };
}

// ---------- Drawing ----------
function invDraw(inv, root) {
  var tz = inv.tz;
  var cal = invCalendar(inv);
  var start = cal.start;
  var daysLeft = Math.ceil((start - Date.now()) / 86400e3);
  var mapsUrl = inv.venue.maps || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([inv.venue.name, inv.venue.address].filter(Boolean).join(', ')));
  var replyBy = inv.rsvp.by ? invFmt(invMoment(inv.rsvp.by, '12:00', tz), tz, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  var lines = function (s) { return invEsc(s).replace(/\n/g, '<br>'); };

  var html = '';
  // Cover
  html += '<section class="inv-card inv-cover inv-reveal">' + invSprig()
    + '<p class="inv-lead">' + lines(inv.lead) + '</p>'
    + '<h1 class="inv-names">' + invEsc(inv.names[0]) + '<span class="amp">&amp;</span>' + invEsc(inv.names[1]) + '</h1>'
    + '<p class="inv-what">' + lines(inv.what) + '</p>'
    + (inv.photo ? '<div class="inv-photo"><img src="' + invEsc(inv.photo) + '" alt="' + invEsc(inv.names.join(' and ')) + '"></div>' : '')
    + invSprig('flip') + '</section>';

  // Date
  html += '<section class="inv-card inv-reveal" aria-label="Date">'
    + '<p class="inv-eyebrow">Save the date</p>'
    + '<div class="inv-date"><span class="side">' + invFmt(start, tz, { weekday: 'long' }) + '</span>'
    + '<span class="day">' + invFmt(start, tz, { day: 'numeric' }) + '</span>'
    + '<span class="side">' + invFmt(start, tz, { month: 'long' }) + '</span></div>'
    + '<p class="inv-date-year">' + invFmt(start, tz, { year: 'numeric' }) + '</p>'
    + '<p class="inv-body">' + invFmt(start, tz, { hour: 'numeric', minute: '2-digit', hour12: true }).replace(':00', '').replace(' ', '') + ' onwards</p>'
    + (daysLeft > 1 ? '<span class="inv-count">' + daysLeft + ' days to go</span>' : daysLeft === 1 ? '<span class="inv-count">Tomorrow!</span>' : '')
    + '<div class="inv-btns"><a class="inv-btn" href="' + invEsc(cal.google) + '" target="_blank" rel="noopener">' + INV_ICON.cal + 'Google Calendar</a>'
    + '<button class="inv-btn line" type="button" data-ics>' + INV_ICON.cal + 'Apple / Outlook</button></div>'
    + '</section>';

  // Order of the day
  if (inv.schedule && inv.schedule.length) {
    html += '<section class="inv-card inv-reveal" aria-label="Order of the day"><p class="inv-eyebrow">On the day</p><h2>The order of things</h2><ul class="inv-times">'
      + inv.schedule.map(function (s) { return '<li><span class="t">' + invEsc(s.time) + '</span><span class="w">' + invEsc(s.what) + '</span></li>'; }).join('')
      + '</ul></section>';
  }

  // Venue
  html += '<section class="inv-card inv-reveal" aria-label="Venue"><p class="inv-eyebrow">Where</p><h2>' + invEsc(inv.venue.name) + '</h2>'
    + '<p class="inv-body">' + lines(inv.venue.address) + '</p>'
    + (inv.venue.note ? '<p class="inv-small">' + lines(inv.venue.note) + '</p>' : '')
    + '<div class="inv-btns"><a class="inv-btn line" href="' + invEsc(mapsUrl) + '" target="_blank" rel="noopener">' + INV_ICON.map + 'Open in Maps</a></div></section>';

  // Dress code
  if (inv.dress) {
    html += '<section class="inv-card inv-reveal" aria-label="Dress code"><p class="inv-eyebrow">What to wear</p><h2>' + invEsc(inv.dress.title || 'Dress code') + '</h2>'
      + '<p class="inv-body">' + lines(inv.dress.text) + '</p>'
      + (inv.dress.colours && inv.dress.colours.length ? '<div class="inv-swatches">' + inv.dress.colours.map(function (c) { return /^#[0-9a-f]{3,8}$/i.test(c) ? '<span style="background:' + c + '"></span>' : ''; }).join('') + '</div>' : '')
      + '</section>';
  }

  // A note from the couple
  if (inv.note) {
    html += '<section class="inv-card inv-reveal" aria-label="A note from us"><p class="inv-eyebrow">' + invEsc(inv.note.eyebrow || 'A note from us') + '</p>'
      + '<h2>' + invEsc(inv.note.title) + '</h2><p class="inv-body">' + lines(inv.note.text) + '</p>' + INV_RULE + '</section>';
  }

  // RSVP
  var seats = Math.max(1, Math.min(10, +inv.rsvp.seats || 1));
  var seatOpts = '';
  for (var i = 1; i <= seats; i++) seatOpts += '<option value="' + i + '">' + i + (i === 1 ? ' (just me)' : '') + '</option>';
  html += '<section class="inv-card inv-reveal" id="rsvp" aria-label="RSVP"><p class="inv-eyebrow">Kindly reply</p><h2>Will you join us?</h2>'
    + (replyBy ? '<p class="inv-small">Please let us know by ' + replyBy + '.</p>' : '')
    + '<form class="inv-form" novalidate>'
    + '<div class="inv-field"><label for="inv-name">Your name</label><input id="inv-name" name="name" type="text" autocomplete="name" maxlength="80" required></div>'
    + '<div class="inv-field"><fieldset><legend>Will you be there?</legend><div class="inv-choice">'
    + '<label><input type="radio" name="coming" value="yes"><span>Joyfully yes</span><small>Can\'t wait</small></label>'
    + '<label><input type="radio" name="coming" value="no"><span>Sadly no</span><small>Celebrating from afar</small></label>'
    + '</div></fieldset></div>'
    + '<div class="inv-if-yes" hidden>'
    + (seats > 1 ? '<div class="inv-field"><label for="inv-seats">How many of you? <span style="text-transform:none;letter-spacing:0">(we\'ve saved ' + seats + ' seats)</span></label><select id="inv-seats" name="seats">' + seatOpts + '</select></div>' : '')
    + '<div class="inv-field"><label for="inv-diet">Anything we should know about food?</label><input id="inv-diet" name="diet" type="text" maxlength="200" placeholder="Allergies, vegetarian…"></div>'
    + (inv.rsvp.question ? '<div class="inv-field"><label for="inv-q">' + invEsc(inv.rsvp.question) + '</label><input id="inv-q" name="answer" type="text" maxlength="200"></div>' : '')
    + '</div>'
    + '<div class="inv-field"><label for="inv-msg">A note for ' + invEsc(inv.names.join(' & ')) + ' (optional)</label><textarea id="inv-msg" name="message" maxlength="500"></textarea></div>'
    + '<p class="inv-error" role="alert"></p>'
    + '<button class="inv-btn" type="submit">Send my reply</button>'
    + '</form>'
    + '<div class="inv-thanks" hidden aria-live="polite"></div>'
    + '</section>';

  // Gifts
  if (inv.gifts) {
    html += '<section class="inv-card inv-reveal" aria-label="Gifts"><p class="inv-eyebrow">Gifts</p><h2>' + invEsc(inv.gifts.title || 'With thanks') + '</h2>'
      + '<p class="inv-body">' + lines(inv.gifts.text) + '</p>'
      + (inv.gifts.link ? '<div class="inv-btns"><a class="inv-btn line" href="' + invEsc(inv.gifts.link) + '" target="_blank" rel="noopener">' + INV_ICON.gift + invEsc(inv.gifts.label || 'See our gift list') + '</a></div>' : '')
      + '</section>';
  }

  // Sign-off
  html += '<section class="inv-card inv-reveal" aria-label="Sign-off">' + invSprig()
    + '<p class="inv-body">' + lines(inv.signoff.text) + '</p>'
    + '<p class="inv-sign">' + invEsc(inv.signoff.from) + '</p></section>';

  html += '<p class="inv-foot">' + INV_STAR + 'Invitation by <a href="index.html">Show and Tell Co</a></p>';
  root.innerHTML = html;

  // Apple / Outlook: hand over a calendar file.
  root.querySelector('[data-ics]').addEventListener('click', function () {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([cal.ics], { type: 'text/calendar' }));
    a.download = 'wedding.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  });

  invRsvp(inv, root);
}

// ---------- RSVP ----------
// send(reply, done) saves the reply. Without one (the sample), the reply only shows on screen.
function invRsvp(inv, root) {
  var form = root.querySelector('.inv-form');
  var yesBits = form.querySelector('.inv-if-yes');
  var err = form.querySelector('.inv-error');
  var thanks = root.querySelector('.inv-thanks');
  var btn = form.querySelector('button[type="submit"]');

  form.addEventListener('change', function (e) {
    if (e.target.name === 'coming') yesBits.hidden = e.target.value !== 'yes';
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var reply = { name: (data.get('name') || '').trim(), coming: data.get('coming'), seats: +(data.get('seats') || 1),
      diet: (data.get('diet') || '').trim(), answer: (data.get('answer') || '').trim(), message: (data.get('message') || '').trim() };
    if (!reply.name) { err.textContent = 'Please add your name.'; form.querySelector('#inv-name').focus(); return; }
    if (!reply.coming) { err.textContent = 'Please choose yes or no.'; return; }
    err.textContent = '';
    btn.disabled = true; btn.textContent = 'Sending…';
    var send = inv.sendReply || function (r, done) { setTimeout(function () { done(null); }, 500); };
    send(reply, function (problem) {
      btn.disabled = false; btn.textContent = 'Send my reply';
      if (problem) { err.textContent = problem; return; }
      var first = invEsc(reply.name.split(' ')[0]);
      thanks.innerHTML = reply.coming === 'yes'
        ? '<p class="inv-big">See you there, ' + first + '!</p><p class="inv-body">' + (reply.seats > 1 ? 'We\'ve got you down for ' + reply.seats + '. ' : '') + 'Your reply is on its way to ' + invEsc(inv.names.join(' & ')) + '.</p>'
        : '<p class="inv-big">You\'ll be missed, ' + first + '</p><p class="inv-body">Thank you for letting ' + invEsc(inv.names.join(' & ')) + ' know.</p>';
      thanks.innerHTML += '<button class="inv-link" type="button">Change my reply</button>';
      form.hidden = true; thanks.hidden = false;
      thanks.querySelector('.inv-link').addEventListener('click', function () { thanks.hidden = true; form.hidden = false; });
    });
  });
}

// ---------- Opening the envelope ----------
function invOpen(opener, main, after) {
  var env = opener.querySelector('.inv-env');
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var opened = false;
  function open() {
    if (opened) return; opened = true;
    opener.classList.add('opening');
    var t = still ? [0, 0, 0] : [600, 950, 1900];
    setTimeout(function () { opener.classList.add('flap-down'); }, t[0]);
    setTimeout(function () { opener.classList.add('letter-up'); }, t[1]);
    setTimeout(function () {
      main.hidden = false;
      window.scrollTo(0, 0);
      opener.classList.add('gone');
      document.body.style.overflow = '';
      after();
      setTimeout(function () { opener.remove(); }, 800);
    }, t[2]);
  }
  document.body.style.overflow = 'hidden';
  env.addEventListener('click', open);
}

// Sections fade up as they scroll into view; the RSVP pill hides once the form is on screen.
function invReveal(root, floatBtn) {
  var cards = root.querySelectorAll('.inv-reveal');
  if (!('IntersectionObserver' in window)) { cards.forEach(function (c) { c.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  cards.forEach(function (c) { io.observe(c); });
  var rsvp = root.querySelector('#rsvp');
  if (floatBtn && rsvp) {
    floatBtn.hidden = false;
    new IntersectionObserver(function (entries) {
      floatBtn.classList.toggle('away', entries[0].isIntersecting);
    }, { threshold: 0.05 }).observe(rsvp);
    floatBtn.addEventListener('click', function () { rsvp.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }
}
