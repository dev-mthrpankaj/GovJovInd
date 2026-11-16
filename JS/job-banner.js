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

  const scriptEl = document.currentScript;
  const logoUrl = (() => {
    try { return new URL('../Assets/govjobupdates-logo.png', (scriptEl && scriptEl.src) || location.href).href; }
    catch (e) { return '../Assets/govjobupdates-logo.png'; }
  })();

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
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = logoUrl;
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
      const vs = fitFont(ctx, vac.value, 900, SANS, vac.small ? 44 : 92, 28, bw - 50);
      ctx.fillStyle = '#ffffff'; ctx.font = `900 ${vs}px ${SANS}`;
      ctx.fillText(vac.value, bx + bw / 2, rowY + 46 + (vac.small ? 62 : 86));
      if (vac.sub) {
        ctx.fillStyle = '#c9d4ee'; ctx.font = `600 24px ${SANS}`;
        ctx.fillText(vac.sub, bx + bw / 2, rowY + rowH - 24);
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
