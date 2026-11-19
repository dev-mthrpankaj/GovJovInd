/* Live Test Rules page: prize calculator (mirrors backend: fee x valid registrations, capped at seat limit; 40/20/10 default) */
(function () {
  'use strict';
  var form = document.getElementById('ltiCalc');
  if (!form) return;
  var fee = document.getElementById('ltiFee');
  var regs = document.getElementById('ltiRegs');
  var regsRange = document.getElementById('ltiRegsRange');
  var limit = document.getElementById('ltiLimit');
  var RATES = [40, 20, 10];

  function num(el) {
    var v = parseFloat(el.value);
    return isFinite(v) && v > 0 ? v : 0;
  }
  function inr(n) {
    return '\u20B9' + Math.floor(n).toLocaleString('en-IN');
  }
  function set(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function render() {
    var f = num(fee);
    var r = Math.floor(num(regs));
    var l = Math.floor(num(limit));
    var counted = l > 0 ? Math.min(r, l) : r;
    var base = f * counted;
    set('ltiBase', inr(base));
    set('ltiCounted', counted.toLocaleString('en-IN') + ' valid registrations \u00D7 ' + inr(f));
    for (var i = 0; i < 3; i++) {
      set('ltiP' + (i + 1), f > 0 ? inr(base * RATES[i] / 100) : '\u20B90');
    }
    set('ltiNote', f > 0
      ? 'Example only. Final amounts are fixed after result verification, eligibility check and admin approval. TDS may apply as per law.'
      : 'Free tests have no prize money. Enter a paid entry fee to see the Top 3 split.');
    if (l > 0 && r > l) set('ltiCounted', l.toLocaleString('en-IN') + ' seats (limit reached) \u00D7 ' + inr(f));
  }
  regsRange.addEventListener('input', function () { regs.value = regsRange.value; render(); });
  regs.addEventListener('input', function () { regsRange.value = Math.min(regs.value || 0, regsRange.max); render(); });
  [fee, limit].forEach(function (el) { el.addEventListener('input', render); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  render();
})();

/* Upcoming tests: live public feed from the portal, grouped Free first, then Paid.
   Falls back to a portal link if the feed is unavailable. */
(function () {
  'use strict';
  var root = document.getElementById('ltiUpcoming');
  if (!root) return;
  var BASE = 'https://test.govjobupdates.com/live-test/';
  var FEED = BASE + 'upcoming-tests.php';
  var TZ = 'Asia/Kolkata';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function icon(name) { var i = el('i', 'fas ' + name); i.setAttribute('aria-hidden', 'true'); return i; }
  function inr(n) { return '\u20B9' + Math.floor(n).toLocaleString('en-IN'); }
  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleString('en-IN', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true });
    } catch (e) { return ''; }
  }
  function link(cls, text, href) {
    var a = el('a', cls, text);
    a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
    return a;
  }
  function state(msg, withLink) {
    root.textContent = '';
    var box = el('div', 'lti-up__state');
    box.appendChild(el('p', '', msg));
    if (withLink) {
      var a = link('lti-btn lti-btn--blue lti-btn--sm', 'Open Live Test Portal', BASE);
      a.style.maxWidth = '280px'; a.style.margin = '1rem auto 0';
      box.appendChild(a);
    }
    root.appendChild(box);
  }

  function prizeBlock(t) {
    var full = t.prize_if_full, now = t.prize_now;
    var p = el('div', 'lti-test__prize');
    p.appendChild(el('strong', '', (full ? 'Rank 1 up to ' : 'Rank 1: ') + inr((full || now)[0])));
    var text = 'Rank 2: ' + inr((full || now)[1]) + ' \u00B7 Rank 3: ' + inr((full || now)[2]);
    p.appendChild(document.createTextNode(text + (full ? ' if all seats fill. Grows with every registration.' : '')));
    return p;
  }

  function card(t) {
    var free = !!t.is_free;
    var c = el('article', 'lti-test ' + (free ? 'lti-test--free' : 'lti-test--paid'));
    var top = el('div', 'lti-test__top');
    top.appendChild(el('span', 'lti-badge ' + (free ? 'lti-badge--free' : 'lti-badge--paid'), free ? 'FREE ENTRY' : 'Entry ' + inr(t.fee_rupees)));
    top.appendChild(el('span', 'lti-badge' + (t.status === 'live' ? ' lti-badge--live' : ''), t.status_label));
    c.appendChild(top);

    // Paid: prize leads. Free: honest "no prize" note (backend gives no prize on free tests).
    if (!free && t.has_prize && t.prize_now) c.appendChild(prizeBlock(t));
    c.appendChild(el('h3', '', t.title));
    if (free) c.appendChild(el('p', 'lti-test__freenote', 'Free practice with a real leaderboard. No prize money in free tests.'));

    var meta = el('div', 'lti-test__meta');
    var r1 = el('span'); r1.appendChild(icon('fa-calendar-days')); r1.appendChild(document.createTextNode(' ' + fmtDate(t.start_iso)));
    var r2 = el('span'); r2.appendChild(icon('fa-stopwatch')); r2.appendChild(document.createTextNode(' ' + t.duration_minutes + ' min \u00B7 +' + t.marks_per_correct + ' / \u2212' + t.negative_marks));
    meta.appendChild(r1); meta.appendChild(r2);
    if (t.registration_open) {
      var r3 = el('span'); r3.appendChild(icon('fa-hourglass-half')); r3.appendChild(document.createTextNode(' Registration closes ' + fmtDate(t.registration_end_iso)));
      meta.appendChild(r3);
    }
    c.appendChild(meta);

    if (t.seats_total > 0) {
      var pct = Math.min(100, Math.round((t.seats_filled / t.seats_total) * 100));
      var low = t.seats_left !== null && t.seats_left <= Math.max(5, Math.ceil(t.seats_total * 0.2));
      var bar = el('div', 'lti-seatbar' + (low ? ' is-low' : ''));
      var fill = el('span'); fill.style.width = pct + '%'; bar.appendChild(fill);
      bar.setAttribute('role', 'img'); bar.setAttribute('aria-label', pct + ' percent seats filled');
      var seats = el('div', 'lti-seats');
      seats.appendChild(el('span', '', t.seats_filled + '/' + t.seats_total + ' seats filled'));
      seats.appendChild(el('span', low ? 'is-low' : '', t.seats_left === 0 ? 'Seats full' : (low ? 'Only ' + t.seats_left + ' left' : t.seats_left + ' left')));
      c.appendChild(bar); c.appendChild(seats);
    }

    var btn;
    if (t.registration_open) {
      btn = link('lti-btn lti-btn--sm ' + (free ? 'lti-btn--green' : 'lti-btn--gold'), free ? 'Register Free' : 'Register Now', BASE + t.register_path);
    } else if (t.status === 'live') {
      btn = link('lti-btn lti-btn--blue lti-btn--sm', 'Open Portal', BASE);
    } else {
      var label = { not_started: 'Registration opens ' + fmtDate(t.registration_start_iso), full: 'All seats filled', ended: 'Registration closed' }[t.registration_reason] || 'Not open yet';
      btn = el('span', 'lti-btn lti-btn--off lti-btn--sm', label);
    }
    c.appendChild(btn);
    return c;
  }

  function group(kind, tests, hasOther) {
    var free = kind === 'free';
    var g = el('div', 'lti-group lti-group--' + kind);
    g.id = free ? 'free-tests' : 'paid-tests';
    var head = el('div', 'lti-group__head');
    var h = el('h3', '', free ? 'Free Live Tests: join at \u20B90' : 'Paid Live Tests: win prize money');
    var sub = el('p', '', free
      ? 'No fee. Same paper, same timer, real rank on the leaderboard. The best way to try a Live Test.'
      : 'Top 3 ranks share prize money from the registration value. The more people join, the bigger the prize.');
    head.appendChild(h); head.appendChild(sub);
    g.appendChild(head);
    var grid = el('div', 'lti-up__grid');
    tests.forEach(function (t) { grid.appendChild(card(t)); });
    g.appendChild(grid);
    if (free && hasOther) {
      var nudge = el('p', 'lti-group__next');
      nudge.appendChild(icon('fa-trophy'));
      nudge.appendChild(document.createTextNode(' Ready for the real game? '));
      var a = el('a', '', 'See paid tests with prize money');
      a.href = '#paid-tests';
      nudge.appendChild(a);
      g.appendChild(nudge);
    }
    return g;
  }

  var ctrl = ('AbortController' in window) ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 7000);
  fetch(FEED, { headers: { Accept: 'application/json' }, signal: ctrl ? ctrl.signal : undefined })
    .then(function (r) { if (!r.ok) throw new Error('bad status'); return r.json(); })
    .then(function (d) {
      clearTimeout(timer);
      if (!d || !d.ok || !Array.isArray(d.tests)) throw new Error('bad data');
      if (!d.tests.length) { state('No upcoming test is announced right now. Check back soon, or follow our channels for the next Live Test.', true); return; }
      var freeTests = d.tests.filter(function (t) { return t.is_free; });
      var paidTests = d.tests.filter(function (t) { return !t.is_free; });
      root.textContent = '';
      root.classList.add('is-grouped');
      if (freeTests.length) root.appendChild(group('free', freeTests, paidTests.length > 0));
      if (paidTests.length) root.appendChild(group('paid', paidTests, false));
    })
    .catch(function () {
      clearTimeout(timer);
      state('Could not load the test list right now. Open the portal to see current tests, fees and seats.', true);
    });
})();
