// Digital invitations: draws the "Luxe" wedding invitation from one set of details.
// invitation.html passes the details in. Everything a host types goes through invEsc before it
// reaches the page, so their words always show as plain text.
// Screens: the doorbell → the envelope opening → the collage. The collage opens three pages:
// #details, #story and #rsvp.

var LX_ART = 'images/invitations/luxe/';

function invEsc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function invLines(s) { return invEsc(s).replace(/\n/g, '<br>'); }

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
  var title = inv.names.join(' & ') + "'s wedding";
  var where = [inv.venue.name, inv.venue.address].filter(Boolean).join(', ').replace(/\n/g, ', ');
  var google = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(title) + '&dates=' + invStamp(start) + '/' + invStamp(end)
    + '&location=' + encodeURIComponent(where) + '&details=' + encodeURIComponent('Your invitation: ' + location.href.split('#')[0]);
  var esc = function (s) { return String(s).replace(/[\\;,]/g, function (c) { return '\\' + c; }).replace(/\n/g, '\\n'); };
  var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Show and Tell Co//Invitations//EN', 'BEGIN:VEVENT',
    'UID:' + invStamp(start) + '-' + Math.random().toString(36).slice(2) + '@showandtellco.shop',
    'DTSTAMP:' + invStamp(new Date()), 'DTSTART:' + invStamp(start), 'DTEND:' + invStamp(end),
    'SUMMARY:' + esc(title), 'LOCATION:' + esc(where), 'DESCRIPTION:' + esc('Your invitation: ' + location.href.split('#')[0]),
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return { start: start, google: google, ics: ics };
}

// ---------- Small pieces ----------
function lxImg(name, cls, alt) { return '<img class="' + (cls || '') + '" src="' + LX_ART + name + '.webp" alt="' + (alt || '') + '" draggable="false">'; }
// A photo slot. box is where it sits inside its frame, in %: [left, top, width, height, turn].
function lxPhoto(inv, src, box) {
  var style = box ? 'left:' + box[0] + '%;top:' + box[1] + '%;width:' + box[2] + '%;height:' + box[3] + '%;' + (box[4] ? 'transform:rotate(' + box[4] + 'deg)' : '') : '';
  var inner = src ? '<img src="' + invEsc(src) + '" alt="">' : '<span class="mono">' + invEsc(inv.monogram) + '</span>';
  return '<span class="lx-photo" style="' + style + '">' + inner + '</span>';
}
// Where the see-through windows are in each frame.
var LX_HOLES = {
  locket: [[58, 40, 39, 40, 8], [27, 61, 36, 36, -6]],
  strip: [[29, 3, 67.1, 29.9, 7.4], [21.6, 30.2, 67.1, 30, 7.4], [13.9, 57.6, 67.3, 29.9, 7.4]],
  polaroid: [[9, 5.8, 80.9, 74.7, -17]]
};
function lxFramed(inv, frame, photos, cls, extra) {
  var holes = LX_HOLES[frame === 'photo-strip' ? 'strip' : frame];
  // The photos sit behind the frame, cut to the shape of its windows so nothing peeks out round the edges.
  var mask = 'url(' + LX_ART + frame + '-holes.png) center / 100% 100% no-repeat';
  return '<div class="' + cls + '"><span class="lx-holes" style="-webkit-mask:' + mask + ';mask:' + mask + '">'
    + holes.map(function (b, i) { return lxPhoto(inv, (photos || [])[i], b); }).join('') + '</span>' + lxImg(frame) + (extra || '') + '</div>';
}
var LX_ICONS = { church: 'icon-church', rings: 'icon-rings', drinks: 'icon-champagne', dinner: 'icon-dinner', party: 'icon-disco', cake: 'icon-cake', car: 'icon-car' };

// ---------- Screen 3: the collage ----------
function lxCollage(inv) {
  var p = inv.photos || {};
  var start = invMoment(inv.date, inv.time, inv.tz);
  var dateLine = invFmt(start, inv.tz, { day: 'numeric', month: 'long', year: 'numeric' });
  return '<div class="lx-stage">'
    + '<div class="lx-piece lx-p-env">' + lxImg('env-back') + lxImg('env-flap-up') + lxPhoto(inv, p.cover) + lxImg('env-pocket') + '</div>'
    + '<div class="lx-piece lx-p-lilies">' + lxImg('lilies') + '</div>'
    + '<button class="lx-piece lx-p-oval" type="button" data-go="details" aria-label="The details">' + lxImg('card-oval')
    + '<span class="lx-on"><span class="lx-caps">Join us for<br>the wedding of</span><span class="lx-script">' + invEsc(inv.names[0]) + '<br>&amp; ' + invEsc(inv.names[1]) + '</span>'
    + '<span class="lx-caps">' + dateLine + '<br>' + invEsc(inv.place) + '</span></span></button>'
    + lxFramed(inv, 'locket', p.locket, 'lx-piece lx-p-locket')
    + '<button class="lx-piece lx-p-heart" type="button" data-go="details">' + lxImg('heart')
    + '<span class="lx-on"><span class="lx-script">The Details</span><span class="lx-caps lx-click">Click here</span></span></button>'
    + '<div class="lx-piece lx-p-moss1">' + lxImg('moss-a') + '</div>'
    + lxFramed(inv, 'photo-strip', p.strip, 'lx-piece lx-p-strip')
    + '<div class="lx-piece lx-p-tray">' + lxImg('tray') + '</div>'
    + '<button class="lx-piece lx-p-rsvp" type="button" data-go="rsvp">' + lxImg('envelope-closed')
    + '<span class="lx-on"><span class="lx-script">Kindly<br>Rsvp</span><span class="lx-caps lx-click">Click here</span></span></button>'
    + '<div class="lx-piece lx-p-lily">' + lxImg('lily') + '</div>'
    + '<div class="lx-piece lx-p-seal">' + lxImg('seal') + '</div>'
    + '<div class="lx-piece lx-p-moss2">' + lxImg('moss-b') + '</div>'
    + lxFramed(inv, 'polaroid', p.polaroid ? [p.polaroid] : null, 'lx-piece lx-p-polaroid')
    + '<button class="lx-piece lx-p-flower" type="button" data-go="story">' + lxImg('flower')
    + '<span class="lx-on"><span class="lx-script">Our<br>Love Story</span><span class="lx-caps lx-click">Click here</span></span></button>'
    + '</div>'
    + '<div class="lx-after">'
    + '<p class="lx-caps" style="font-size:15px">The countdown is on!</p>'
    + '<div class="lx-countdown" aria-live="off" data-countdown></div>'
    + (inv.contact ? '<p class="lx-contact">For any questions, please contact us at:<br><a href="mailto:' + invEsc(inv.contact) + '">' + invEsc(inv.contact) + '</a></p>' : '')
    + '<p class="lx-caps lx-love">With love</p>'
    + '<p class="lx-script lx-sign">' + invEsc(inv.names.join(' & ')) + '</p>'
    + '</div>';
}

// ---------- The inner pages ----------
function lxBand(inv, title, photo) {
  return '<div class="lx-band">' + lxPhoto(inv, photo) + '<div class="lx-band-card">' + lxImg('tray', 'lx-tray') + lxImg('envelope-closed', 'lx-card')
    + '<span class="lx-on"><span class="lx-script">' + title + '</span></span></div></div>';
}
function lxSignoff(inv) {
  return '<p class="lx-script lx-mono">' + invEsc(inv.monogram) + '</p>'
    + (inv.contact ? '<p class="lx-contact">For any questions, please contact us at:<br><a href="mailto:' + invEsc(inv.contact) + '">' + invEsc(inv.contact) + '</a></p>' : '')
    + '<p class="lx-caps lx-love">With love</p><p class="lx-script lx-sign">' + invEsc(inv.names.join(' & ')) + '</p>'
    + '<button class="lx-back" type="button" data-go="">Go back</button>';
}

function lxDetails(inv, cal) {
  var tz = inv.tz, start = cal.start;
  var mapsUrl = inv.venue.maps || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([inv.venue.name, inv.venue.address].join(', ').replace(/\n/g, ', ')));
  var html = lxBand(inv, 'The<br>Details', (inv.photos || {}).band);
  html += '<section class="lx-sec"><h2>Date and Location</h2>'
    + '<p class="lx-caps">Date</p><p class="lx-txt">' + invFmt(start, tz, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '</p>'
    + (inv.parts || []).map(function (pt) { return '<p class="lx-caps">' + invEsc(pt.label) + '</p><p class="lx-txt">' + invLines(pt.text) + '</p>'; }).join('')
    + '<div><a class="lx-btn-line" href="' + invEsc(mapsUrl) + '" target="_blank" rel="noopener">Open in Maps</a></div>'
    + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">'
    + '<a class="lx-btn-line" href="' + invEsc(cal.google) + '" target="_blank" rel="noopener">Google Calendar</a>'
    + '<button class="lx-btn-line" type="button" data-ics>Apple / Outlook</button></div></section>';
  if (inv.schedule && inv.schedule.length) {
    html += '<section class="lx-sec"><h2>Our Timeline</h2><div class="lx-timeline">'
      + '<svg class="wave" viewBox="0 0 28 400" preserveAspectRatio="none" aria-hidden="true"><path d="M14 0' + (function () { var d = ''; for (var i = 0; i < 8; i++) d += ' Q' + (i % 2 ? 2 : 26) + ' ' + (i * 50 + 25) + ' 14 ' + (i * 50 + 50); return d; })() + '" fill="none" stroke="#F3EDE4" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg><ol>'
      + inv.schedule.map(function (s) { return '<li>' + (LX_ICONS[s.icon] ? lxImg(LX_ICONS[s.icon]) : '') + '<p class="lx-caps t">' + invEsc(s.time) + '</p><p class="w">' + invEsc(s.what) + '</p></li>'; }).join('')
      + '</ol></div></section>';
  }
  if (inv.stay && inv.stay.length) {
    html += '<section class="lx-sec"><h2>Where To Stay</h2>' + (inv.stayNote ? '<p class="lx-txt">' + invLines(inv.stayNote) + '</p>' : '')
      + inv.stay.map(function (h) {
        return '<p class="lx-caps">' + invEsc(h.name) + '</p><p class="lx-txt">' + invLines(h.text) + '</p>'
          + (h.link ? '<a class="lx-btn-line" href="' + invEsc(h.link) + '" target="_blank" rel="noopener">Visit website</a>' : '');
      }).join('') + '</section>';
  }
  if (inv.gifts) {
    html += '<div class="lx-gift">' + lxImg('card-in-envelope')
      + '<span class="lx-on"><span class="lx-script">Gifts</span><span class="lx-txt">' + invLines(inv.gifts.text) + '</span></span>'
      + (inv.gifts.link ? '<a href="' + invEsc(inv.gifts.link) + '" target="_blank" rel="noopener"><span class="lx-script">' + invEsc(inv.gifts.label || 'Shop Our Registry') + '</span><span class="lx-caps">Click here</span></a>' : '')
      + '</div>';
  }
  if (inv.other && inv.other.length) {
    html += '<section class="lx-sec"><h2>Other Details</h2>' + inv.other.map(function (o) {
      return '<p class="lx-caps">' + invEsc(o.label) + '</p><p class="lx-txt">' + invLines(o.text) + '</p>'
        + (o.colours ? '<div class="lx-swatches">' + o.colours.map(function (c) { return /^#[0-9a-f]{3,8}$/i.test(c) ? '<span style="background:' + c + '"></span>' : ''; }).join('') + '</div>' : '');
    }).join('') + '</section>';
  }
  return '<div class="lx-page">' + html + '<section class="lx-sec" style="padding-top:0">' + lxSignoff(inv) + '</section></div>';
}

function lxStory(inv) {
  var s = inv.story || {}, ph = (inv.photos || {}).story || [];
  var pol = function (src) { return lxFramed(inv, 'polaroid', [src], 'lx-pol'); };
  return '<div class="lx-page"><section class="lx-sec"><h2>' + invEsc(s.title || 'Our Love Story') + '</h2>'
    + '<div class="lx-pair">' + pol(ph[0]) + pol(ph[1]) + '</div>'
    + '<p class="lx-txt" style="margin-top:20px">' + invLines(s.text) + '</p>'
    + '<p class="lx-caps lx-love">With love</p><p class="lx-script lx-sign">' + invEsc(inv.names.join(' & ')) + '</p>'
    + '<button class="lx-back" type="button" data-go="">Go back</button></section></div>';
}

function lxRsvp(inv) {
  var r = inv.rsvp, tz = inv.tz;
  var replyBy = r.by ? invFmt(invMoment(r.by, '12:00', tz), tz, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  var seats = Math.max(1, Math.min(10, +r.seats || 1)), seatOpts = '';
  for (var i = 1; i <= seats; i++) seatOpts += '<option value="' + i + '">' + i + (i === 1 ? ' (just me)' : '') + '</option>';
  var opt = function (name, value, label) { return '<label><input type="radio" name="' + name + '" value="' + invEsc(value) + '">' + invEsc(label) + '</label>'; };
  return '<div class="lx-page"><section class="lx-sec">'
    + lxFramed(inv, 'locket', (inv.photos || {}).locket, 'lx-locket-big')
    + '<h2 style="margin-top:24px">Kindly Rsvp</h2>'
    + '<p class="lx-txt">We\'d love for you to be part of our celebration! Let us know below if you can make it.</p>'
    + (replyBy ? '<p class="lx-caps" style="margin-top:16px">Please reply by ' + replyBy + '</p>' : '')
    + '<form class="lx-form" novalidate>'
    + '<div class="lx-field"><label for="lx-name">Your name</label><input id="lx-name" name="name" type="text" autocomplete="name" maxlength="80"></div>'
    + '<div class="lx-field"><fieldset><legend>Will you be attending our wedding?</legend><div class="lx-opts">'
    + opt('coming', 'yes', 'Joyfully accepts') + opt('coming', 'no', 'Regretfully declines') + '</div></fieldset></div>'
    + '<div class="lx-yes" hidden>'
    + (seats > 1 ? '<div class="lx-field"><label for="lx-seats">How many of you are coming? We\'ve saved ' + seats + ' seats.</label><select id="lx-seats" name="seats">' + seatOpts + '</select></div>' : '')
    + (r.meals && r.meals.length ? '<div class="lx-field"><fieldset><legend>Choice of meal</legend><div class="lx-opts">' + r.meals.map(function (m) { return opt('meal', m, m); }).join('') + '</div></fieldset></div>' : '')
    + '<div class="lx-field"><label for="lx-diet">Any allergies we should know about?</label><input id="lx-diet" name="diet" type="text" maxlength="200"></div>'
    + (r.question ? '<div class="lx-field"><label for="lx-q">' + invEsc(r.question) + '</label><input id="lx-q" name="answer" type="text" maxlength="200"></div>' : '')
    + '</div>'
    + '<div class="lx-field"><label for="lx-msg">A note for the couple (optional)</label><textarea id="lx-msg" name="message" maxlength="500"></textarea></div>'
    + '<p class="lx-error" role="alert"></p>'
    + '<button class="lx-send" type="submit">Rsvp</button></form>'
    + '<div class="lx-thanks" hidden aria-live="polite"></div>'
    + '<button class="lx-back" type="button" data-go="">Go back</button></section></div>';
}

// ---------- RSVP ----------
// inv.sendReply(reply, done) saves a reply. Without one (the sample), the reply only shows on screen.
function lxRsvpWire(inv, root) {
  var form = root.querySelector('.lx-form'); if (!form) return;
  var yes = form.querySelector('.lx-yes'), err = form.querySelector('.lx-error'), btn = form.querySelector('.lx-send');
  var thanks = root.querySelector('.lx-thanks');
  form.addEventListener('change', function (e) { if (e.target.name === 'coming') yes.hidden = e.target.value !== 'yes'; });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var reply = { name: String(d.get('name') || '').trim(), coming: d.get('coming'), seats: +(d.get('seats') || 1), meal: d.get('meal') || '',
      diet: String(d.get('diet') || '').trim(), answer: String(d.get('answer') || '').trim(), message: String(d.get('message') || '').trim() };
    if (!reply.name) { err.textContent = 'Please add your name.'; form.querySelector('#lx-name').focus(); return; }
    if (!reply.coming) { err.textContent = 'Please let us know if you can come.'; return; }
    err.textContent = ''; btn.disabled = true; btn.textContent = 'Sending…';
    var send = inv.sendReply || function (r, done) { setTimeout(function () { done(null); }, 500); };
    send(reply, function (problem) {
      btn.disabled = false; btn.textContent = 'Rsvp';
      if (problem) { err.textContent = problem; return; }
      var first = invEsc(reply.name.split(' ')[0]), couple = invEsc(inv.names.join(' & '));
      thanks.innerHTML = (reply.coming === 'yes'
        ? '<p class="lx-script">See you there, ' + first + '!</p><p>' + (reply.seats > 1 ? 'We\'ve saved ' + reply.seats + ' seats for you. ' : '') + 'Your reply is on its way to ' + couple + '.</p>'
        : '<p class="lx-script">You\'ll be missed, ' + first + '</p><p>Thank you for letting ' + couple + ' know.</p>')
        + '<button class="lx-link" type="button">Change my reply</button>';
      form.hidden = true; thanks.hidden = false;
      thanks.querySelector('.lx-link').addEventListener('click', function () { thanks.hidden = true; form.hidden = false; });
    });
  });
}

function lxCountdown(el, start) {
  function draw() {
    var s = Math.max(0, Math.floor((start - Date.now()) / 1000));
    var parts = [[Math.floor(s / 86400), 'Days'], [Math.floor(s / 3600) % 24, 'Hours'], [Math.floor(s / 60) % 60, 'Minutes'], [s % 60, 'Seconds']];
    el.innerHTML = parts.map(function (p) { return '<div><b>' + (p[0] < 10 ? '0' : '') + p[0] + '</b><span>' + p[1] + '</span></div>'; }).join('<i>:</i>');
  }
  draw(); setInterval(draw, 1000);
}

// ---------- Putting it together ----------
function invDraw(inv, root) {
  var cal = invCalendar(inv);
  var views = { '': lxCollage(inv), details: lxDetails(inv, cal), story: lxStory(inv), rsvp: lxRsvp(inv) };
  root.innerHTML = Object.keys(views).map(function (k) { return '<div data-view="' + k + '"' + (k ? ' hidden' : '') + '>' + views[k] + '</div>'; }).join('')
    + '<p class="lx-mark">Invitation by <a href="index.html">Show and Tell Co</a></p>';

  lxCountdown(root.querySelector('[data-countdown]'), cal.start);
  lxRsvpWire(inv, root);

  function show() {
    var want = location.hash.replace('#', '');
    if (!views.hasOwnProperty(want)) want = '';
    root.querySelectorAll('[data-view]').forEach(function (v) { v.hidden = v.getAttribute('data-view') !== want; });
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show);
  root.addEventListener('click', function (e) {
    var go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); var to = go.getAttribute('data-go'); if (to) location.hash = to; else history.replaceState(null, '', location.pathname + location.search), show(); }
    if (e.target.closest('[data-ics]')) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([cal.ics], { type: 'text/calendar' }));
      a.download = 'wedding.ics'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    }
  });
  return show;
}

// The doorbell, then the envelope. after() runs once the guest taps "Open invitation".
function invOpen(inv, bellScreen, welcome, after) {
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bell = bellScreen.querySelector('.lx-bell'), env = welcome.querySelector('.lx-env');
  document.body.style.overflow = 'hidden';
  bell.addEventListener('click', function () {
    if (bell.classList.contains('pressed')) return;
    bell.classList.add('pressed');
    setTimeout(function () {
      bellScreen.classList.add('gone');
      setTimeout(function () { env.classList.add('open'); }, still ? 0 : 700);
      setTimeout(function () { env.classList.add('out'); }, still ? 0 : 1600);
      setTimeout(function () { welcome.classList.add('ready'); }, still ? 0 : 2500);
    }, still ? 0 : 650);
  }, { once: false });
  welcome.querySelector('[data-open]').addEventListener('click', function () {
    document.body.style.overflow = '';
    welcome.classList.add('gone');
    after();
  });
}
