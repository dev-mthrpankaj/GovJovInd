#!/usr/bin/env node

/*
 * Copies SEO-critical visible text from each page's inline #jobData JSON into
 * the initial HTML. The lifecycle script continues to hydrate the same fields
 * in the browser; this simply gives crawlers and no-JS clients a useful
 * fallback.
 *
 * Pages without #jobData (OTR guides, static helpers, etc.) are safely skipped.
 *
 * Usage:
 *   node scripts/hydrate-job-static-fallbacks.js          # preview changes
 *   node scripts/hydrate-job-static-fallbacks.js --write  # update files
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jobsDir = path.join(root, 'jobs');
const write = process.argv.includes('--write');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateElement(html, id, value) {
  if (value === undefined || value === null || value === '') return html;
  const expression = new RegExp(
    `(<([a-z0-9]+)\\b[^>]*\\bid=["']${id}["'][^>]*>)[\\s\\S]*?(<\\/\\2>)`,
    'i'
  );
  if (!expression.test(html)) return html;
  return html.replace(expression, `$1${escapeHtml(value)}$3`);
}


const EXCLUDED_FILES = new Set([
  'upsssc-otr.html',
  'upessc-otr.html'
]);

function replaceInner(html, id, content) {
  const expression = new RegExp(
    '(<([a-z0-9]+)\\b[^>]*\\bid=["\\']' + id + '["\\'][^>]*>)[\\s\\S]*?(<\\/\\2>)',
    'i'
  );
  return expression.test(html) ? html.replace(expression, (_m, open, _tag, close) => open + content + close) : html;
}

function setAttr(html, id, attr, value) {
  const expression = new RegExp('(<[a-z0-9]+\\b[^>]*\\bid=["\\']' + id + '["\\'][^>]*)(>)', 'i');
  if (!expression.test(html)) return html;
  let out = html.replace(expression, (_m, before, close) => {
    const clean = before.replace(new RegExp('\\s' + attr + '(?:=["\\'][^"\\']*["\\'])?', 'i'), '');
    return clean + (value ? ' ' + attr + '="' + value + '"' : '') + close;
  });
  return out;
}

function formatDate(value, long = false) {
  if (!value) return 'As per official schedule';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-IN', long
    ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
    : { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function safeJsonForScript(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

function renderStaticContent(html, job) {
  const esc = escapeHtml;
  const list = value => Array.isArray(value) ? value : [];
  const lifecycle = list(job.lifecycle);
  const current = (job.currentStage && lifecycle.find(x => x.id === job.currentStage))
    || [...lifecycle].reverse().find(x => x.current || /current|latest|released|declared|open|live/i.test(x.status || ''))
    || lifecycle[lifecycle.length - 1] || null;
  const num = value => typeof value === 'number' ? new Intl.NumberFormat('en-IN').format(value) : (value ?? '—');
  const setText = (id, value, fallback = '—') => { html = updateElement(html, id, value == null ? fallback : value); };
  const setHTML = (id, value) => { html = replaceInner(html, id, value || ''); };
  const iconFor = type => ({
    notification:'fa-bell', application:'fa-paper-plane', correction:'fa-edit', exam_date:'fa-calendar-alt',
    city_intimation:'fa-city', admit_card:'fa-id-card', exam:'fa-pen', answer_key:'fa-key', objection:'fa-exclamation-circle',
    revised_answer_key:'fa-key', result:'fa-poll', scorecard:'fa-chart-bar', cut_off:'fa-chart-line',
    physical:'fa-running', pet:'fa-running', pst:'fa-ruler-combined', skill_test:'fa-keyboard',
    typing_test:'fa-keyboard', dv:'fa-folder-open', document_verification:'fa-folder-open', medical:'fa-heartbeat',
    interview:'fa-user-tie', final_result:'fa-trophy', joining:'fa-briefcase', notice:'fa-bullhorn'
  }[type] || 'fa-circle');
  const toneFor = status => {
    const s = String(status || '').toLowerCase();
    if (/final|selected|declared|released|qualified|completed|active|open|live/.test(s)) return 'success';
    if (/soon|scheduled|upcoming|await|pending|tba|to be/.test(s)) return 'info';
    if (/objection|closing|deadline|attention/.test(s)) return 'warning';
    if (/cancel|postpon|rejected|closed|expired/.test(s)) return 'danger';
    return 'neutral';
  };

  // SEO fields are written to the source HTML, not left for browser-only rendering.
  if (job.seo?.title) {
    html = html.replace(/<title\\b[^>]*>[\\s\\S]*?<\\/title>/i, '<title>' + esc(job.seo.title) + '</title>');
    for (const [selector, value] of [
      ['meta[property="og:title"]', job.seo.title], ['meta[name="twitter:title"]', job.seo.title]
    ]) html = updateMeta(html, selector, value);
  }
  if (job.seo?.description) {
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]'])
      html = updateMeta(html, selector, job.seo.description);
  }
  if (job.seo?.canonical) {
    html = updateLink(html, 'canonical', job.seo.canonical);
    html = updateMeta(html, 'meta[property="og:url"]', job.seo.canonical);
  }
  if (job.seo?.robots) html = updateMeta(html, 'meta[name="robots"]', job.seo.robots);

  setText('jobOrganization', job.organization);
  setText('jobTitle', job.title);
  setText('breadcrumbCurrent', job.shortTitle || job.title);
  setText('jobSummary', job.summary);
  setHTML('jobTags', list(job.tags).map(x => '<span>' + esc(x) + '</span>').join(''));
  setText('latestUpdate', job.latestUpdate || current?.summary || 'Recruitment page updated.');
  setText('updatedAt', job.updated ? 'Updated ' + formatDate(job.updated) : 'Updated recently');
  setText('updatedBy', 'Updated by ' + (job.updatedBy || 'GovJobUpdates'));

  const primary = current?.primaryAction?.url && current.primaryAction.url !== '#' ? current.primaryAction
    : job.primaryAction?.url && job.primaryAction.url !== '#' ? job.primaryAction
    : current?.secondaryAction?.url && current.secondaryAction.url !== '#' ? {
      label: current.secondaryAction.label || 'View Latest Notice', url: current.secondaryAction.url,
      icon: current.secondaryAction.icon || 'fa-file-alt'
    } : job.links?.official ? { label: 'Check Latest Updates', url: job.links.official, icon: 'fa-external-link-alt' }
    : job.links?.notification ? { label: 'View Recruitment Notice', url: job.links.notification, icon: 'fa-file-pdf' }
    : { label: 'Check Latest Updates', url: '#important-links', icon: 'fa-bell' };
  const secondary = current?.secondaryAction?.url && current.secondaryAction.url !== '#' ? current.secondaryAction
    : job.secondaryAction?.url && job.secondaryAction.url !== '#' ? job.secondaryAction
    : job.links?.notification ? { label: 'Official Notification', url: job.links.notification, icon: 'fa-file-pdf' }
    : job.links?.official ? { label: 'Official Website', url: job.links.official, icon: 'fa-landmark' }
    : { label: 'Important Links', url: '#important-links', icon: 'fa-link' };
  for (const id of ['heroPrimaryBtn', 'sidePrimaryBtn', 'mobilePrimaryBtn']) html = staticAction(html, id, primary);
  html = staticAction(html, 'heroSecondaryBtn', secondary);

  const status = current?.status || job.status || 'Latest update available';
  const tone = current?.tone || toneFor(status);
  html = replaceInner(html, 'recruitmentStatus', '<span class="gjd-status-dot"></span>' + esc(status));
  html = setClass(html, 'recruitmentStatus', 'gjd-status is-' + tone);
  setText('mobileStatusLabel', current?.shortLabel || current?.label || 'Latest Stage');
  setText('mobileStageValue', status);
  setText('stageCardLabel', 'Current Recruitment Stage');
  setText('stageHeadline', current?.label || 'Recruitment Update');
  setText('stageDate', current?.date || current?.deadline ? formatDate(current.date || current.deadline, true) : status);
  setText('stageStatusText', status);
  html = setAttr(html, 'stageCountdown', 'hidden', 'hidden');

  const metrics = list(job.metrics).length ? list(job.metrics) : [
    {label:'Total Vacancies', value:num(job.vacancies), icon:'fa-users'},
    {label:'Current Stage', value:current?.shortLabel || current?.label || 'Recruitment', icon:iconFor(current?.type)},
    {label:'Qualification', value:job.qualificationShort || 'See eligibility', icon:'fa-graduation-cap'},
    {label:'Job Location', value:job.location || 'India', icon:'fa-map-marker-alt'}
  ];
  setHTML('metricsGrid', metrics.slice(0,4).map(m => '<article><span class="gjd-metric-icon"><i class="fas ' + esc(m.icon || 'fa-circle') + '"></i></span><div><small>' + esc(m.label) + '</small><strong>' + esc(num(m.value)) + '</strong></div></article>').join(''));
  const facts = list(job.quickFacts);
  setHTML('quickFacts', facts.map(f => '<article><span>' + esc(f.label) + '</span><strong>' + esc(f.value) + '</strong></article>').join(''));
  html = setAttr(html, 'quickFacts', 'hidden', facts.length ? '' : 'hidden');

  setHTML('overviewGrid', list(job.overview).map(pair => '<div class="gjd-info-item"><span>' + esc(pair[0]) + '</span><strong>' + esc(pair[1]) + '</strong></div>').join(''));
  if (job.overviewNote) setText('overviewNote', job.overviewNote);

  const iconTypes = lifecycle;
  const legacyDates = job.dates || {};
  const stages = iconTypes.length ? iconTypes : [
    {label:'Notification Released', type:'notification', date:legacyDates.notification},
    {label:'Application Start', type:'application', date:legacyDates.applicationStart},
    {label:'Last Date to Apply', type:'application', date:legacyDates.applicationEnd},
    {label:'Fee Payment Last Date', type:'application', date:legacyDates.feeEnd},
    {label:'Correction Window', type:'correction', date:legacyDates.correction},
    {label:'Exam Date', type:'exam_date', date:legacyDates.exam}
  ].filter(s => s.date);
  setHTML('lifecycleTimeline', stages.map(stage => {
    const isCurrent = current && stage.id === current.id;
    const meta = [stage.status, stage.note].filter(Boolean).join(' • ');
    return '<div class="gjd-timeline-item ' + (isCurrent ? 'is-primary is-current ' : '') + 'is-' + esc(stage.tone || toneFor(stage.status)) + '" data-stage-id="' + esc(stage.id || '') + '"><div class="gjd-timeline-dot"><i class="fas ' + iconFor(stage.type) + '"></i></div><div><strong>' + esc(stage.label || stage.id || 'Stage') + '</strong><small>' + esc(meta || 'Recruitment lifecycle') + '</small>' + (stage.summary ? '<p class="gjd-stage-summary">' + esc(stage.summary) + '</p>' : '') + '</div><div class="gjd-timeline-date">' + esc(stage.date ? formatDate(stage.date, true) : (stage.dateText || 'As per schedule')) + '</div></div>';
  }).join(''));
  const updates = list(job.updates);
  setHTML('updateHistory', updates.map((u,i) => '<article class="gjd-update-history-item ' + (i===0?'is-latest':'') + '"><time>' + esc(formatDate(u.date)) + '</time><div><strong>' + esc(u.title || 'Recruitment Update') + '</strong><p>' + esc(u.text || '') + '</p></div></article>').join(''));
  html = setAttr(html, 'updateHistory', 'hidden', updates.length ? '' : 'hidden');

  setHTML('vacancyTable', list(job.vacancyRows).map(r => '<tr><td><strong>' + esc(r[0]) + '</strong></td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>').join(''));
  setText('vacancyTotal', num(job.vacancies));
  setText('ageLimit', job.ageLimit);
  setText('ageRelaxation', job.ageRelaxation, 'Age relaxation as per rules.');
  setText('education', job.education);
  setText('educationNote', job.educationNote, 'Refer to the official notification.');
  setText('otherEligibility', job.otherEligibility);
  setHTML('feeGrid', list(job.fees).map(pair => '<div class="gjd-fee-item"><span>' + esc(pair[0]) + '</span><strong>' + esc(pair[1]) + '</strong></div>').join(''));
  setText('paymentMode', job.paymentMode);
  setHTML('selectionFlow', list(job.selection).map((x,i) => '<div class="gjd-selection-step"><b>' + String(i+1).padStart(2,'0') + '</b><span>' + esc(x) + '</span></div>').join(''));
  setHTML('documentsGrid', list(job.documents).map(x => '<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>' + esc(x) + '</span></div>').join(''));

  const guidance = current?.guidance || job.currentGuidance || job.applySteps || [];
  setText('guidanceHeading', current?.guidanceTitle || (current?.type === 'application' ? 'How to Apply' : 'What Candidates Should Do Now'));
  setHTML('guidanceSteps', list(guidance).map(x => '<li>' + esc(x) + '</li>').join(''));
  const archiveSteps = list(job.applySteps);
  html = setAttr(html, 'applicationArchive', 'hidden', current?.type !== 'application' && archiveSteps.length ? '' : 'hidden');
  setHTML('applicationArchiveSteps', archiveSteps.map(x => '<li>' + esc(x) + '</li>').join(''));

  const links = Array.isArray(job.importantLinks) ? job.importantLinks : [
    ...(job.links?.apply ? [{label:'Apply Online',note:'Official application portal',url:job.links.apply,icon:'fa-paper-plane',type:'application'}] : []),
    ...(job.links?.notification ? [{label:'Download Notification',note:'Official PDF / notice',url:job.links.notification,icon:'fa-file-pdf',type:'notification'}] : []),
    ...(job.links?.official ? [{label:'Official Website',note:'Recruitment authority website',url:job.links.official,icon:'fa-landmark',type:'official'}] : [])
  ];
  setHTML('importantLinks', links.map((l,i) => {
    const valid = l.url && l.url !== '#';
    const badge = l.badge || (i===0?'Latest':'');
    const icon = l.icon || iconFor(l.type);
    const iconPrefix = /^fa-(telegram|whatsapp|youtube|instagram|linkedin|facebook|twitter)$/.test(icon) ? 'fab' : 'fas';
    return '<div class="gjd-link-row ' + (l.highlight?'is-highlight':'') + '"><div><i class="' + iconPrefix + ' ' + esc(icon) + '"></i><p><strong>' + esc(l.label) + '</strong><small>' + esc(l.note || '') + '</small>' + (badge?'<em class="gjd-link-badge">' + esc(badge) + '</em>':'') + '</p></div><a href="' + esc(valid?l.url:'#') + '"' + (valid?' target="_blank" rel="noopener noreferrer"':' class="is-disabled" aria-disabled="true"') + '>' + esc(l.buttonLabel || (valid?'Open Link':'Awaited')) + '</a></div>';
  }).join(''));
  setHTML('faqList', list(job.faqs).map((pair,i) => '<div class="gjd-faq-item"><button class="gjd-faq-question" type="button" aria-expanded="' + (i===0?'true':'false') + '"><span>' + esc(pair[0]) + '</span><i class="fas fa-plus"></i></button><div class="gjd-faq-answer"><p>' + esc(pair[1]) + '</p></div></div>').join(''));

  // Keep structured data as valid JSON in the original script nodes.
  const canonical = job.seo?.canonical || '';
  const primarySchema = {
    '@context':'https://schema.org', '@type':'WebPage',
    name:job.seo?.title || job.title, description:job.seo?.description || job.summary,
    url:canonical, dateModified:job.updated,
    about:{'@type':'Thing','name':job.title},
    publisher:{'@type':'Organization','name':'GovJobUpdates','url':'https://govjobupdates.com/'}
  };
  for (const id of ['primarySchema','breadcrumbSchema','faqSchema','jobPostingSchema']) {
    const node = new RegExp('(<script\\b[^>]*\\bid=["\\']' + id + '["\\'][^>]*>)[\\s\\S]*?(<\\/script>)','i');
    if (node.test(html)) {
      let schema = primarySchema;
      if (id === 'breadcrumbSchema') schema = {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
        {'@type':'ListItem','position':1,'name':'Home','item':'https://govjobupdates.com/'},
        {'@type':'ListItem','position':2,'name':'Jobs','item':'https://govjobupdates.com/HTML/latest-jobs.html'},
        {'@type':'ListItem','position':3,'name':job.shortTitle || job.title,'item':canonical}
      ]};
      if (id === 'faqSchema') schema = {'@context':'https://schema.org','@type':'FAQPage','mainEntity':list(job.faqs).map(pair=>({'@type':'Question','name':pair[0],'acceptedAnswer':{'@type':'Answer','text':pair[1]}}))};
      html = html.replace(node, (_m, open, close) => open + safeJsonForScript(schema) + close);
    }
  }
  return html;
}

function updateMeta(html, selector, value) {
  const attrMatch = selector.match(/^(meta)\\[(name|property)=["']([^"']+)["']\\]$/i);
  if (!attrMatch) return html;
  const expression = new RegExp('(<meta\\b(?=[^>]*\\b' + attrMatch[2] + '=["\\']' + attrMatch[3] + '["\\'])[^>]*\\bcontent=["\\'])[^"\\']*(["\\'][^>]*>)','i');
  return expression.test(html) ? html.replace(expression, (_m,a,b)=>a+escapeHtml(value)+b) : html;
}

function updateLink(html, rel, value) {
  const expression = new RegExp('(<link\\b(?=[^>]*\\brel=["\\']' + rel + '["\\'])[^>]*\\bhref=["\\'])[^"\\']*(["\\'][^>]*>)','i');
  return expression.test(html) ? html.replace(expression, (_m,a,b)=>a+escapeHtml(value)+b) : html;
}

function setClass(html, id, value) {
  const expression = new RegExp('(<[a-z0-9]+\\b[^>]*\\bid=["\\']' + id + '["\\'][^>]*\\bclass=["\\'])[^"\\']*(["\\'][^>]*>)','i');
  return expression.test(html) ? html.replace(expression, (_m,a,b)=>a+escapeHtml(value)+b) : html;
}

function staticAction(html, id, action) {
  const expression = new RegExp('(<a\\b[^>]*\\bid=["\\']' + id + '["\\'][^>]*)(>)([\\s\\S]*?)(<\\/a>)','i');
  if (!expression.test(html)) return html;
  return html.replace(expression, (_m, before, open, inner, close) => {
    let attrs = before.replace(/\\s(?:href|target|rel|aria-disabled|class)=["'][^"']*["']/gi, '');
    const url = action.url && action.url !== '#' ? action.url : '#important-links';
    attrs += ' href="' + escAttr(url) + '"';
    if (/^https?:\\/\\//i.test(url)) attrs += ' target="_blank" rel="noopener noreferrer"';
    const disabledClass = action.url && action.url !== '#' ? '' : ' class="is-disabled" aria-disabled="true"';
    attrs += disabledClass;
    const icon = action.icon || 'fa-arrow-right';
    const label = action.label || 'Check Latest Updates';
    const updatedInner = inner.replace(/<i\\b[^>]*><\\/i>/i, '<i class="fas ' + escAttr(icon) + '"></i>')
      .replace(/<span\\b[^>]*>[\\s\\S]*?<\\/span>/i, '<span>' + escapeHtml(label) + '</span>');
    return attrs + open + updatedInner + close;
  });
}
function escAttr(value) { return escapeHtml(value); }

function readJobData(html, file) {
  const match = html.match(
    /<script\b[^>]*\bid=["']jobData["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (!match) return null; // no jobData → skip (not an error)
  try {
    return JSON.parse(match[1].trim());
  } catch (error) {
    throw new Error(`${file}: invalid #jobData JSON (${error.message})`);
  }
}

const files = fs
  .readdirSync(jobsDir)
  .filter((file) => file.endsWith('.html'))
  .sort();

let changed = 0;
let skipped = 0;
const errors = [];

for (const file of files) {
  const filePath = path.join(jobsDir, file);
  const original = fs.readFileSync(filePath, 'utf8');

  try {
    // These two OTR guide pages use their own markup, CSS and JavaScript. Never rewrite them.
    if (EXCLUDED_FILES.has(file)) {
      skipped += 1;
      console.log(`Skipped protected OTR page: jobs/${file}`);
      continue;
    }
    const job = readJobData(original, file);

    // Non-lifecycle pages (OTR guides, static helpers, etc.)
    if (!job) {
      skipped += 1;
      continue;
    }

    let html = original;
    html = updateElement(html, 'jobOrganization', job.organization);
    html = updateElement(html, 'jobTitle', job.title);
    html = updateElement(html, 'jobSummary', job.summary);
    html = updateElement(html, 'breadcrumbCurrent', job.shortTitle || job.title);
    html = updateElement(html, 'latestUpdate', job.latestUpdate);
    html = renderStaticContent(html, job);

    if (html === original) {
      skipped += 1;
      continue;
    }

    changed += 1;
    console.log(`${write ? 'Updated' : 'Would update'} jobs/${file}`);
    if (write) fs.writeFileSync(filePath, html, 'utf8');
  } catch (error) {
    errors.push(error.message);
  }
}

console.log(
  `\n${write ? 'Updated' : 'Preview'}: ${changed} changed, ${skipped} already current / skipped, ${errors.length} errors.`
);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
}