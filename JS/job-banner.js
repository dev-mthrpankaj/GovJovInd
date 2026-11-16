/*!
 * GovJobUpdates — "Download Jobs Banner"
 * ---------------------------------------------------------------------------
 * Adds a "Download Jobs Banner" button to every /jobs/*.html page (inside the
 * "Share This Job" section) and renders a share-ready 1080x1350 PNG banner
 * from the page's own #jobData JSON. No HTML changes are needed: this file is
 * loaded by JS/job-detail-lifecycle.js.
 *
 * Banner headline is derived from the current stage:
 *   notification / application  -> NOTIFICATION OUT
 *   admit card                  -> ADMIT CARD OUT
 *   answer key                  -> ANSWER KEY OUT
 *   result / final result ...   -> RESULT OUT / FINAL RESULT OUT
 *   exam date, exam city, scorecard, cut off, correction, objection, ...
 */
(() => {
  'use strict';

  if (window.__gjuBannerInit) return;
  window.__gjuBannerInit = true;

  const dataNode = document.getElementById('jobData');
  if (!dataNode) return;

  let job;
  try { job = JSON.parse(dataNode.textContent); } catch (e) { return; }
  if (!job || typeof job !== 'object') return;

  /* ------------------------------------------------------------------ *
   * Config
   * ------------------------------------------------------------------ */
  const W = 1080;
  const H = 1350;
  const SITE = 'govjobupdates.com';
  const SANS = 'Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  const SERIF = 'Georgia, "Times New Roman", Times, serif';
  const C = {
    navy: '#0a1f4d',
    navy2: '#102a63',
    gold: '#c9a227',
    goldLight: '#f0d27a',
    goldDark: '#8a6d1f',
    paper: '#fbf7ee',
    ink: '#0f1b3d',
    muted: '#5b6575',
    saffron: '#ff9933',
    green: '#138808',
    line: '#e4dcc6'
  };

  // Logo is embedded so the banner works from any origin (file://, localhost, CDN) without CORS/canvas-taint issues.
  const LOGO_DATA = 'data:image/png;base64,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';

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */
  const clean = v => String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
  const isEmptyish = v => {
    const s = clean(v).toLowerCase();
    return !s || /^[-—–.]+$/.test(s) || /^(n\/?a|na|nil|tba|tbd)$/.test(s) ||
      /not (applicable|mentioned|available|specified)|no post|as per (requirement|counselling|official|notification)/.test(s);
  };
  const parseDate = v => {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
  };
  const fmtDate = v => {
    const d = parseDate(v);
    if (!d) return clean(v);
    return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(d);
  };
  const fmtRange = (a, b) => {
    const da = parseDate(a), db = parseDate(b);
    if (!da || !db) return fmtDate(a);
    const f = d => new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata' }).format(d);
    const y = new Intl.DateTimeFormat('en-IN', { year: 'numeric', timeZone: 'Asia/Kolkata' }).format(db);
    return f(da) === f(db) ? `${f(da)} ${y}` : `${f(da)} - ${f(db)} ${y}`;
  };
  const slug = (location.pathname.split('/').pop() || 'job').replace(/\.html?$/i, '') || 'job';
  const pageUrl = job.seo && job.seo.canonical ? job.seo.canonical : `https://${SITE}${location.pathname}`;

  /* ------------------------------------------------------------------ *
   * Stage / headline detection
   * ------------------------------------------------------------------ */
  const lifecycle = Array.isArray(job.lifecycle) ? job.lifecycle : [];
  const stage = (() => {
    if (!lifecycle.length) return null;
    if (job.currentStage) {
      const exact = lifecycle.find(x => x && x.id === job.currentStage);
      if (exact) return exact;
      // currentStage is not a lifecycle id: trust currentStage + status text instead of guessing a stage.
      return { id: job.currentStage, label: clean(job.status), status: clean(job.status) };
    }
    return [...lifecycle].reverse().find(x => x && (x.current || /current|latest|released|declared|open|live/i.test(x.status || ''))) ||
      lifecycle[lifecycle.length - 1];
  })() || {};

  const norm = (...parts) => parts.map(clean).join(' ').toLowerCase().replace(/[_\-/]+/g, ' ');

  const KINDS = [
    // [key, test, headline word(s), palette]
    ['answer',     /answer ?key/,                                   'ANSWER KEY'],
    ['omr',        /omr/,                                           'OMR SHEET'],
    ['objection',  /objection|scrutiny/,                            'OBJECTION WINDOW', 'open'],
    ['admit',      /admit ?card|call ?letter|hall ?ticket/,         'ADMIT CARD'],
    ['city',       /exam ?city|city ?intimation|intimation|city ?slip|exam ?slip|city details/, 'EXAM CITY'],
    ['scorecard',  /score ?card/,                                   'SCORECARD'],
    ['cutoff',     /cut ?off/,                                      'CUT OFF'],
    ['finalresult',/final ?result/,                                 'FINAL RESULT'],
    ['allotment',  /allotment/,                                     'ALLOTMENT'],
    ['result',     /result|merit/,                                  'RESULT'],
    ['examdate',   /exam ?date|exam ?schedule|schedule/,            'EXAM DATE'],
    ['correction', /correction|edit window/,                        'CORRECTION WINDOW', 'open'],
    ['typing',     /typing|skill ?test/,                            'SKILL TEST', 'update'],
    ['physical',   /\bpet\b|\bpst\b|physical|\bpe\b|\bmt\b/,        'PHYSICAL TEST', 'update'],
    ['dv',         /\bdv\b|document verification/,                  'DV', 'update'],
    ['interview',  /interview/,                                     'INTERVIEW', 'update'],
    ['medical',    /medical/,                                       'MEDICAL', 'update'],
    ['exam',       /\bexam\b/,                                      'EXAM', 'update'],
    ['notification', /notification|application|apply|recruitment|registration|advertisement|advt/, 'NOTIFICATION']
  ];

  const detect = text => KINDS.find(k => k[1].test(text));

  function resolveKind() {
    const stageText = norm(stage.id, stage.type, stage.label, stage.shortLabel, job.currentStage);
    const hit = detect(stageText) || detect(norm(job.status)) || detect(norm(job.title));
    const full = norm(stageText, job.status);
    const awaited = /await|soon|upcoming|expected|to be (announced|released)|tba/.test(norm(stage.status, job.status, stage.label)) &&
                    !/released|declared|out\b|open/.test(norm(stage.status));
    const closed = /closed|expired/.test(norm(stage.status, stage.label)) && /application|notification/.test(stageText);
    const extended = /extend/.test(full);

    if (!hit) return { key: 'update', headline: 'LATEST UPDATE', tone: 'blue' };
    const [key, , word, mode] = hit;

    let prefix = '';
    if (/mains?\b/.test(stageText) && (key === 'admit' || key === 'result' || key === 'answer' || key === 'city')) prefix = 'MAINS ';
    else if (/prelim|pre exam|\bpre\b/.test(stageText) && (key === 'admit' || key === 'result' || key === 'answer' || key === 'city')) prefix = 'PRELIMS ';
    if (key === 'answer' || key === 'admit') {
      if (/revised/.test(stageText)) prefix = 'REVISED ' + prefix;
      else if (/final/.test(stageText)) prefix = 'FINAL ' + prefix;
    }
    if (key === 'result' && /final/.test(stageText)) prefix = 'FINAL ';

    let headline;
    if (key === 'notification') {
      headline = closed ? 'APPLICATION CLOSED' : extended ? 'LAST DATE EXTENDED' : 'NOTIFICATION OUT';
    } else if (mode === 'open') {
      headline = `${prefix}${word} OPEN`;
    } else if (mode === 'update') {
      headline = `${prefix}${word} ${awaited ? 'SOON' : 'UPDATE'}`;
    } else {
      headline = `${prefix}${word} ${awaited ? 'COMING SOON' : 'OUT'}`;
    }
    headline = headline.replace(/FINAL FINAL/, 'FINAL').replace(/\s+/g, ' ').trim();

    const tone = ({
      notification: 'green', correction: 'green', answer: 'purple', omr: 'purple', objection: 'orange',
      admit: 'blue', city: 'blue', examdate: 'blue', result: 'gold', finalresult: 'gold', scorecard: 'gold',
      cutoff: 'gold', allotment: 'gold'
    })[key] || 'teal';
    return { key, headline, tone: closed ? 'red' : awaited ? 'slate' : tone };
  }

  const TONES = {
    green:  ['#15803d', '#0e5a2a', '#22a95a'],
    blue:   ['#1d4ed8', '#14349a', '#3b82f6'],
    purple: ['#6d28d9', '#4c1d95', '#8b5cf6'],
    gold:   ['#b45309', '#7c3a06', '#d97706'],
    orange: ['#c2410c', '#8a2d08', '#ea580c'],
    teal:   ['#0f766e', '#0a524c', '#14b8a6'],
    red:    ['#b91c1c', '#7f1313', '#ef4444'],
    slate:  ['#475569', '#2f3a4a', '#64748b']
  };

  /* ------------------------------------------------------------------ *
   * Content selection
   * ------------------------------------------------------------------ */
  function vacancyInfo() {
    const v = job.vacancies;
    if (typeof v === 'number' && v > 0) return { value: new Intl.NumberFormat('en-IN').format(v), label: 'TOTAL VACANCIES', sub: v === 1 ? 'Post' : 'Posts' };
    if (typeof v === 'string' && !isEmptyish(v) && clean(v).length <= 22) {
      return { value: clean(v), label: 'VACANCIES', sub: '', small: true };
    }
    return null;
  }

  function dateChips(kind) {
    const d = job.dates || {};
    const chips = [];
    const push = (label, value) => { value = clean(value); if (value && chips.length < 3 && !chips.some(c => c.label === label)) chips.push({ label, value }); };
    const get = (...keys) => { for (const k of keys) if (d[k]) return d[k]; return ''; };

    if (kind.key === 'notification') {
      push('Notification Date', fmtDate(get('notification')));
      push('Start Date', fmtDate(get('applicationStart') || stage.date));
      push('Last Date to Apply', fmtDate(get('applicationEnd') || stage.deadline));
      if (chips.length < 3) push('Fee Last Date', fmtDate(get('feeEnd')));
    } else {
      const own = ({
        admit: ['Admit Card Date', get('mainsAdmitCard', 'cbtAdmitCard', 'admitCard')],
        answer: ['Answer Key Date', get('finalAnswerKey', 'revisedAnswerKey', 'answerKey', 'answerKeyDate')],
        result: ['Result Date', get('finalResult', 'mainsResult', 'prelimsResult', 'result', 'preResult')],
        finalresult: ['Result Date', get('finalResult', 'result')],
        city: ['City Slip Date', get('examCity')],
        examdate: ['Exam Date', get('examDate', 'exam', 'examStart')],
        correction: ['Correction Start', get('correctionStart')],
        objection: ['Objection Last Date', get('objectionEnd')]
      })[kind.key];
      push(own && own[0] ? own[0] : 'Update Date', fmtDate((own && own[1]) || stage.date || job.updated));
      if (stage.deadline) push('Last Date', fmtDate(stage.deadline));
      if (kind.key === 'correction') push('Correction Last Date', fmtDate(get('correctionEnd')));
      if (kind.key === 'answer') push('Objection Last Date', fmtDate(get('objectionEnd')));
      if (!['examdate', 'result', 'finalresult', 'scorecard', 'cutoff', 'allotment'].includes(kind.key)) {
        const ex = get('examDate', 'exam', 'examStart', 'mainsExam', 'prelimsExam', 'cbt1Exam');
        if (ex) push('Exam Date', get('examEnd') && get('examStart') ? fmtRange(get('examStart'), get('examEnd')) : fmtDate(ex));
      }
    }
    return chips.filter(c => c.value && c.value !== 'Invalid Date');
  }

  function detailItems() {
    const items = [];
    const add = (label, value) => { value = clean(value); if (!isEmptyish(value) && value.length <= 140 && items.length < 4) items.push({ label, value }); };
    add('QUALIFICATION', job.qualificationShort);
    add('LOCATION', job.location);
    add('PAY SCALE', job.salary);
    add('ADVT / NOTIFICATION NO.', job.notificationNo);
    return items;
  }

  /* ------------------------------------------------------------------ *
   * Canvas utilities
   * ------------------------------------------------------------------ */
  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function wrap(ctx, text, maxW, maxLines) {
    const words = clean(text).split(' ');
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width <= maxW || !line) line = test;
      else { lines.push(line); line = w; }
    }
    if (line) lines.push(line);
    if (maxLines && lines.length > maxLines) {
      const kept = lines.slice(0, maxLines);
      let last = kept[maxLines - 1];
      while (last.length > 1 && ctx.measureText(`${last}…`).width > maxW) last = last.slice(0, -1);
      kept[maxLines - 1] = `${last.replace(/[\s,.;:-]+$/, '')}…`;
      return kept;
    }
    return lines;
  }

  function ellipsis(ctx, text, maxW) {
    text = clean(text);
    if (ctx.measureText(text).width <= maxW) return text;
    while (text.length > 1 && ctx.measureText(`${text}…`).width > maxW) text = text.slice(0, -1);
    return `${text.replace(/[\s,.;:-]+$/, '')}…`;
  }

  function spaced(ctx, text, x, y, sp, align) {
    const chars = [...text];
    const widths = chars.map(ch => ctx.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0) + sp * (chars.length - 1);
    let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
    const prev = ctx.textAlign;
    ctx.textAlign = 'left';
    chars.forEach((ch, i) => { ctx.fillText(ch, cx, y); cx += widths[i] + sp; });
    ctx.textAlign = prev;
    return total;
  }

  function fitFont(ctx, text, weight, family, startSize, minSize, maxW) {
    let size = startSize;
    do {
      ctx.font = `${weight} ${size}px ${family}`;
      if (ctx.measureText(text).width <= maxW) break;
      size -= 2;
    } while (size > minSize);
    return size;
  }

  function loadLogo() {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = LOGO_DATA;
    });
  }

  function loadFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    const tasks = ['600', '700', '800', '900'].map(w => document.fonts.load(`${w} 24px Inter`).catch(() => null));
    return Promise.race([Promise.all(tasks), new Promise(r => setTimeout(r, 1500))]);
  }

  /* ------------------------------------------------------------------ *
   * Banner painter
   * ------------------------------------------------------------------ */
  function tricolor(ctx, x, y, w, h) {
    const t = w / 3;
    ctx.fillStyle = C.saffron; ctx.fillRect(x, y, t, h);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(x + t, y, t, h);
    ctx.fillStyle = C.green; ctx.fillRect(x + 2 * t, y, t, h);
  }

  function drawBanner(canvas, logo) {
    const ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    ctx.textBaseline = 'alphabetic';

    const kind = resolveKind();
    const tone = TONES[kind.tone] || TONES.blue;
    const vac = vacancyInfo();
    const chips = dateChips(kind);
    const details = detailItems();
    const title = clean(job.title || job.shortTitle || document.title);

    /* paper background + subtle diagonal pattern */
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.strokeStyle = 'rgba(10,31,77,0.035)'; ctx.lineWidth = 2;
    for (let i = -H; i < W + H; i += 30) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke(); }
    ctx.restore();

    /* ---------- header ---------- */
    const hg = ctx.createLinearGradient(0, 0, W, 168);
    hg.addColorStop(0, C.navy); hg.addColorStop(1, C.navy2);
    ctx.fillStyle = hg; ctx.fillRect(0, 0, W, 168);
    tricolor(ctx, 0, 168, W, 10);

    // logo medallion
    ctx.save();
    ctx.beginPath(); ctx.arc(104, 84, 56, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.gold; ctx.stroke();
    ctx.restore();
    if (logo) {
      ctx.drawImage(logo, 104 - 40, 84 - 40, 80, 80);
    } else {
      ctx.fillStyle = C.navy; ctx.font = `800 34px ${SANS}`; ctx.textAlign = 'center';
      ctx.fillText('GJ', 104, 96); ctx.textAlign = 'left';
    }

    ctx.textAlign = 'left';
    ctx.font = `800 54px ${SANS}`;
    ctx.fillStyle = '#ffffff'; ctx.fillText('GovJob', 184, 92);
    const gw = ctx.measureText('GovJob').width;
    ctx.fillStyle = C.goldLight; ctx.fillText('Updates', 184 + gw, 92);
    ctx.font = `600 19px ${SANS}`; ctx.fillStyle = '#c9d4ee';
    spaced(ctx, "INDIA'S TRUSTED GOVERNMENT JOB PORTAL", 186, 128, 2.2, 'left');

    // site pill (right)
    ctx.font = `700 22px ${SANS}`;
    const pillText = `www.${SITE}`;
    const pw = ctx.measureText(pillText).width + 44;
    rr(ctx, W - 48 - pw, 56, pw, 46, 23);
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = C.goldLight; ctx.textAlign = 'center';
    ctx.fillText(pillText, W - 48 - pw / 2, 87);
    ctx.textAlign = 'left';

    /* ---------- ribbon headline ---------- */
    const rx = 110, rw = W - 220, ry = 226, rh = 104;
    // tails
    ctx.fillStyle = tone[1];
    ctx.beginPath();
    ctx.moveTo(54, ry + 26); ctx.lineTo(rx + 40, ry + 26); ctx.lineTo(rx + 40, ry + rh + 26); ctx.lineTo(54, ry + rh + 26);
    ctx.lineTo(84, ry + rh / 2 + 26); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(W - 54, ry + 26); ctx.lineTo(W - rx - 40, ry + 26); ctx.lineTo(W - rx - 40, ry + rh + 26); ctx.lineTo(W - 54, ry + rh + 26);
    ctx.lineTo(W - 84, ry + rh / 2 + 26); ctx.closePath(); ctx.fill();
    // folds
    ctx.fillStyle = '#00000055';
    ctx.beginPath(); ctx.moveTo(rx, ry + rh); ctx.lineTo(rx + 40, ry + rh); ctx.lineTo(rx + 40, ry + rh + 26); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(W - rx, ry + rh); ctx.lineTo(W - rx - 40, ry + rh); ctx.lineTo(W - rx - 40, ry + rh + 26); ctx.closePath(); ctx.fill();
    // main ribbon
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8;
    const rg = ctx.createLinearGradient(0, ry, 0, ry + rh);
    rg.addColorStop(0, tone[2]); rg.addColorStop(0.5, tone[0]); rg.addColorStop(1, tone[1]);
    ctx.fillStyle = rg; ctx.fillRect(rx, ry, rw, rh);
    ctx.restore();
    ctx.strokeStyle = C.goldLight; ctx.lineWidth = 3;
    ctx.strokeRect(rx + 10, ry + 10, rw - 20, rh - 20);

    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center';
    const hs = fitFont(ctx, kind.headline, 900, SANS, 64, 34, rw - 90);
    ctx.font = `900 ${hs}px ${SANS}`;
    ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 3;
    ctx.fillText(kind.headline, W / 2, ry + rh / 2 + hs * 0.35);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

    /* ---------- stage label ---------- */
    const stageLabel = clean(stage.label || job.status || '');
    if (stageLabel) {
      ctx.fillStyle = C.muted; ctx.font = `italic 600 26px ${SERIF}`; ctx.textAlign = 'center';
      ctx.fillText(ellipsis(ctx, stageLabel, W - 160), W / 2, 408);
    }

    /* ---------- organization ---------- */
    const org = clean(job.organization || '').toUpperCase();
    if (org) {
      ctx.fillStyle = C.goldDark;
      const orgMax = W - 120;
      let osz = 22, sp = 2.4, o = org;
      const owidth = () => { ctx.font = `800 ${osz}px ${SANS}`; return ctx.measureText(o).width + (o.length - 1) * sp; };
      while (owidth() > orgMax && osz > 16) { osz -= 1; sp = Math.max(1, sp - 0.1); }
      if (owidth() > orgMax) {
        const words = o.split(' ');
        while (words.length > 2 && owidth() > orgMax) { words.pop(); o = `${words.join(' ')} …`; }
      }
      ctx.font = `800 ${osz}px ${SANS}`;
      spaced(ctx, o, W / 2, 452, sp, 'center');
    }

    // divider with diamond
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(150, 482); ctx.lineTo(W / 2 - 24, 482); ctx.moveTo(W / 2 + 24, 482); ctx.lineTo(W - 150, 482); ctx.stroke();
    ctx.fillStyle = C.gold;
    ctx.beginPath(); ctx.moveTo(W / 2, 470); ctx.lineTo(W / 2 + 12, 482); ctx.lineTo(W / 2, 494); ctx.lineTo(W / 2 - 12, 482); ctx.closePath(); ctx.fill();

    /* ---------- title ---------- */
    const tMaxW = W - 150;
    let tSize = 68, tLines;
    for (; tSize >= 40; tSize -= 2) {
      ctx.font = `700 ${tSize}px ${SERIF}`;
      tLines = wrap(ctx, title, tMaxW, 0);
      if (tLines.length <= 3) break;
    }
    ctx.font = `700 ${tSize}px ${SERIF}`;
    tLines = wrap(ctx, title, tMaxW, 3);
    const tLH = Math.round(tSize * 1.2);
    const tBoxTop = 506, tBoxH = 226;
    const tStart = tBoxTop + (tBoxH - tLH * tLines.length) / 2 + tSize * 0.86;
    ctx.fillStyle = C.ink; ctx.textAlign = 'center';
    tLines.forEach((l, i) => ctx.fillText(l, W / 2, tStart + i * tLH));

    /* ---------- hero row: vacancies + dates ---------- */
    const rowY = 756, rowH = 186;
    if (vac) {
      const bx = 60, bw = 330;
      ctx.save();
      ctx.shadowColor = 'rgba(10,31,77,.28)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8;
      const bg = ctx.createLinearGradient(bx, rowY, bx, rowY + rowH);
      bg.addColorStop(0, C.navy2); bg.addColorStop(1, C.navy);
      rr(ctx, bx, rowY, bw, rowH, 22); ctx.fillStyle = bg; ctx.fill();
      ctx.restore();
      rr(ctx, bx + 8, rowY + 8, bw - 16, rowH - 16, 16); ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = C.goldLight; ctx.font = `800 19px ${SANS}`;
      spaced(ctx, vac.label, bx + bw / 2, rowY + 46, 2.6, 'center');
      const vs = fitFont(ctx, vac.value, 900, SANS, vac.small ? 44 : 84, 28, bw - 56);
      ctx.fillStyle = '#ffffff'; ctx.font = `900 ${vs}px ${SANS}`;
      ctx.fillText(vac.value, bx + bw / 2, rowY + 46 + (vac.small ? 62 : 76));
      if (vac.sub) {
        ctx.fillStyle = '#c9d4ee'; ctx.font = `600 24px ${SANS}`;
        ctx.fillText(vac.sub, bx + bw / 2, rowY + rowH - 18);
      }

      // date rows
      const dx = bx + bw + 28, dw = W - 60 - dx;
      const n = Math.max(chips.length, 1);
      const gap = 12, ch = (rowH - gap * (n - 1)) / n;
      chips.forEach((c, i) => {
        const y = rowY + i * (ch + gap);
        rr(ctx, dx, y, dw, ch, 16); ctx.fillStyle = '#ffffff'; ctx.fill();
        ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = tone[0]; rr(ctx, dx, y, 8, ch, 4); ctx.fill();
        ctx.textAlign = 'left'; ctx.fillStyle = C.muted; ctx.font = `700 ${n > 2 ? 19 : 21}px ${SANS}`;
        ctx.fillText(ellipsis(ctx, c.label.toUpperCase(), dw * 0.5), dx + 26, y + ch / 2 + 7);
        ctx.textAlign = 'right'; ctx.fillStyle = C.ink;
        const fs = fitFont(ctx, c.value, 800, SANS, n > 2 ? 28 : 32, 18, dw * 0.52);
        ctx.font = `800 ${fs}px ${SANS}`;
        ctx.fillText(c.value, dx + dw - 22, y + ch / 2 + fs * 0.35);
      });
      if (!chips.length) {
        rr(ctx, dx, rowY, dw, rowH, 18); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.strokeStyle = C.line; ctx.stroke();
        ctx.textAlign = 'center'; ctx.fillStyle = C.muted; ctx.font = `700 24px ${SANS}`;
        ctx.fillText('Check official notice for dates', dx + dw / 2, rowY + rowH / 2 + 8);
      }
    } else if (chips.length) {
      const n = chips.length, gap = 16, cw = (W - 120 - gap * (n - 1)) / n;
      chips.forEach((c, i) => {
        const x = 60 + i * (cw + gap);
        rr(ctx, x, rowY, cw, rowH - 30, 18); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = tone[0]; rr(ctx, x, rowY, cw, 8, 4); ctx.fill();
        ctx.textAlign = 'center'; ctx.fillStyle = C.muted; ctx.font = `700 19px ${SANS}`;
        spaced(ctx, ellipsis(ctx, c.label.toUpperCase(), cw - 24), x + cw / 2, rowY + 52, 1.4, 'center');
        const fs = fitFont(ctx, c.value, 800, SANS, 36, 20, cw - 30);
        ctx.fillStyle = C.ink; ctx.font = `800 ${fs}px ${SANS}`;
        ctx.fillText(c.value, x + cw / 2, rowY + 112);
      });
    }

    /* ---------- detail grid ---------- */
    const gTop = 964, cellH = 84, gGap = 12;
    const cols = details.length === 1 ? 1 : 2;
    const cellW = (W - 120 - gGap * (cols - 1)) / cols;
    details.forEach((it, i) => {
      const lastOdd = details.length % 2 === 1 && i === details.length - 1 && cols === 2;
      const col = lastOdd ? 0 : i % cols, row = Math.floor(i / cols);
      const w = lastOdd ? W - 120 : cellW;
      const x = 60 + col * (cellW + gGap), y = gTop + row * (cellH + gGap);
      rr(ctx, x, y, w, cellH, 16); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = C.gold; rr(ctx, x, y + 14, 6, cellH - 28, 3); ctx.fill();
      ctx.textAlign = 'left'; ctx.fillStyle = C.goldDark; ctx.font = `800 15px ${SANS}`;
      spaced(ctx, it.label, x + 24, y + 28, 1.8, 'left');
      ctx.fillStyle = C.ink; ctx.font = `700 23px ${SANS}`;
      const lines = wrap(ctx, it.value, w - 48, 2);
      if (lines.length === 1) ctx.fillText(lines[0], x + 24, y + 62);
      else lines.forEach((l, li) => { ctx.font = `700 20px ${SANS}`; ctx.fillText(l, x + 24, y + 54 + li * 22); });
    });

    // updated stamp
    const upd = fmtDate(job.updated);
    if (upd) {
      ctx.textAlign = 'center'; ctx.fillStyle = C.muted; ctx.font = `600 17px ${SANS}`;
      ctx.fillText(`Last updated: ${upd}`, W / 2, 1170);
    }

    /* ---------- footer ---------- */
    const fy = 1186;
    const fg = ctx.createLinearGradient(0, fy, W, H);
    fg.addColorStop(0, C.navy); fg.addColorStop(1, C.navy2);
    ctx.fillStyle = fg; ctx.fillRect(0, fy, W, H - fy);
    tricolor(ctx, 0, fy, W, 6);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff'; ctx.font = `800 27px ${SANS}`;
    ctx.fillText('Full details, eligibility & official links on', W / 2, fy + 48);
    const urlText = `${SITE}/jobs/${slug}.html`;
    const us = fitFont(ctx, urlText, 800, SANS, 27, 16, W - 150);
    ctx.fillStyle = C.goldLight; ctx.font = `800 ${us}px ${SANS}`;
    ctx.fillText(urlText, W / 2, fy + 84);

    ctx.fillStyle = '#c9d4ee'; ctx.font = `600 19px ${SANS}`;
    ctx.fillText('Telegram  •  Instagram  •  YouTube: @GovJobUpdates_official     |     X: @GovJobUpdatesIN', W / 2, fy + 118);
    ctx.fillStyle = '#8fa0c8'; ctx.font = `500 15px ${SANS}`;
    ctx.fillText('GovJobUpdates is not a government website. Please verify details on the official website before applying.', W / 2, fy + 142);

    /* ---------- outer gold frame ---------- */
    ctx.strokeStyle = C.gold; ctx.lineWidth = 4; ctx.strokeRect(6, 6, W - 12, H - 12);
    ctx.strokeStyle = 'rgba(201,162,39,.45)'; ctx.lineWidth = 1.5; ctx.strokeRect(14, 14, W - 28, H - 28);

    return kind;
  }

  /* ------------------------------------------------------------------ *
   * Download flow
   * ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg) {
    let el = document.getElementById('gjuBannerToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'gjuBannerToast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:99999;background:#0a1f4d;color:#fff;padding:12px 18px;border-radius:12px;font:700 14px/1.3 Inter,system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.25);max-width:90vw;text-align:center';
      document.body.appendChild(el);
    }
    el.textContent = msg; el.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.style.display = 'none'; }, 3200);
  }

  async function downloadBanner(btn) {
    if (btn.dataset.busy === '1') return;
    btn.dataset.busy = '1';
    const label = btn.querySelector('.gju-bn-label');
    const original = label ? label.textContent : '';
    if (label) label.textContent = 'Preparing banner…';
    btn.setAttribute('aria-busy', 'true');
    try {
      await loadFonts();
      const logo = await loadLogo();
      const canvas = document.createElement('canvas');
      drawBanner(canvas, logo);
      const blob = await new Promise((res, rej) => canvas.toBlob(b => (b ? res(b) : rej(new Error('toBlob failed'))), 'image/png'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `govjobupdates-${slug}-banner.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      toast('Banner downloaded. Share it on WhatsApp, Telegram or Instagram!');
    } catch (err) {
      console.error('Banner generation failed', err);
      toast('Could not create the banner. Please try again.');
    } finally {
      btn.dataset.busy = '0';
      btn.removeAttribute('aria-busy');
      if (label) label.textContent = original;
    }
  }

  /* ------------------------------------------------------------------ *
   * Button injection (no HTML edits required)
   * ------------------------------------------------------------------ */
  function injectStyles() {
    if (document.getElementById('gjuBannerStyles')) return;
    const s = document.createElement('style');
    s.id = 'gjuBannerStyles';
    s.textContent = `
      .gju-banner-btn{grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:12px 18px;border:0;border-radius:12px;cursor:pointer;
        font-family:inherit;font-weight:800;font-size:.95rem;line-height:1.2;letter-spacing:.2px;color:#fff;background:linear-gradient(135deg,#0a1f4d 0%,#1d4ed8 100%);
        box-shadow:0 8px 20px rgba(29,78,216,.28);transition:transform .15s ease,box-shadow .15s ease,filter .15s ease}
      .gju-banner-btn:hover{transform:translateY(-1px);filter:brightness(1.08);box-shadow:0 12px 26px rgba(29,78,216,.34)}
      .gju-banner-btn:focus-visible{outline:3px solid #f0d27a;outline-offset:2px}
      .gju-banner-btn[aria-busy="true"]{opacity:.8;cursor:progress}
      .gju-banner-btn i{font-size:1rem}
      .gju-banner-btn-hero{grid-column:auto;min-height:44px;padding:10px 16px;font-size:.82rem;box-shadow:none}
    `;
    document.head.appendChild(s);
  }

  function makeButton(extraClass) {
    const b = document.createElement('button');
    b.type = 'button';
    b.id = 'downloadBannerBtn';
    b.className = `gju-banner-btn ${extraClass || ''}`.trim();
    b.setAttribute('aria-label', 'Download Jobs Banner');
    b.dataset.gjuBanner = '1';
    b.innerHTML = '<i class="fas fa-download" aria-hidden="true"></i><span class="gju-bn-label">Download Jobs Banner</span>';
    b.addEventListener('click', () => downloadBanner(b));
    return b;
  }

  function inject() {
    if (document.getElementById('downloadBannerBtn')) return;
    injectStyles();
    const grid = document.querySelector('#share-this-job .gjd-share-grid');
    if (grid) { grid.appendChild(makeButton()); return; }
    // Fallback for pages without a Share section: place it in the hero actions.
    const hero = document.querySelector('.gjd-hero-actions');
    if (hero) hero.appendChild(makeButton('gju-banner-btn-hero'));
  }

  inject();

  // Handy for debugging / future use: window.GJUBanner.render(canvas)
  window.GJUBanner = { render: async canvas => { await loadFonts(); return drawBanner(canvas, await loadLogo()); } };
})();
