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

// These pages are standalone OTR guides with their own CSS/JS architecture.
// Keep them completely outside the lifecycle hydration pipeline.
const EXCLUDED_FILES = new Set([
  'upsssc-otr.html',
  'upessc-otr.html'
]);


function replaceInner(html, id, content) {
  const openingPattern = /<([a-z0-9]+)\b[^>]*\bid=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = openingPattern.exec(html))) {
    if (match[2] !== id) continue;
    const tagName = match[1];
    const innerStart = match.index + match[0].length;
    const tokenPattern = new RegExp('</?' + tagName + '\\b[^>]*>', 'gi');
    tokenPattern.lastIndex = innerStart;
    let depth = 1;
    let token;
    while ((token = tokenPattern.exec(html))) {
      if (/^<\//.test(token[0])) depth -= 1;
      else if (!/\/\s*>$/.test(token[0])) depth += 1;
      if (depth === 0) return html.slice(0, innerStart) + content + html.slice(token.index);
    }
    return html;
  }
  return html;
}
function updateMetaContent(html, selector, value) {
  return html.replace(selector, tag => tag.replace(/\bcontent=["'][^"']*["']/i, 'content="' + escapeHtml(value) + '"'));
}
function hideElement(html, id, shouldHide) {
  return html.replace(/<([a-z0-9]+)\b([^>]*\bid=["']([^"']+)["'][^>]*)>/gi, (whole, tag, attrs, foundId) => {
    if (foundId !== id) return whole;
    const clean = attrs.replace(/\shidden(?:=["'][^"']*["'])?/i, '');
    return '<' + tag + clean + (shouldHide ? ' hidden' : '') + '>';
  });
}
function setAction(html, id, action) {
  return html.replace(/<a\b([^>]*\bid=["']([^"']+)["'][^>]*)>([\s\S]*?)<\/a>/gi, (whole, attrs, foundId, inner) => {
    if (foundId !== id) return whole;
    const url = action && action.url && action.url !== '#' ? action.url : '#important-links';
    attrs = attrs.replace(/\s(?:href|target|rel|aria-disabled)=["'][^"']*["']/gi, '');
    attrs = attrs.replace(/\sclass=["']([^"']*)["']/i, (match, classes) => {
      const updated = classes.split(/\s+/).filter(name => name && name !== 'is-disabled').join(' ');
      return updated ? ' class="' + updated + '"' : '';
    });
    attrs += ' href="' + escapeHtml(url) + '"';
    if (/^https?:\/\//i.test(url)) attrs += ' target="_blank" rel="noopener noreferrer"';
    else if (!(action && action.url && action.url !== '#')) attrs += ' aria-disabled="true"';
    const iconName = (action && action.icon) || 'fa-arrow-right';
    const label = (action && action.label) || 'Check Latest Updates';
    inner = inner.replace(/<i\b[^>]*>/i, '<i class="fas ' + escapeHtml(iconName) + '">');
    inner = inner.replace(/<span\b[^>]*>[\s\S]*?<\/span>/i, '<span>' + escapeHtml(label) + '</span>');
    return '<a' + attrs + '>' + inner + '</a>';
  });
}
function updateCanonical(html, value) {
  return html.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, tag =>
    tag.replace(/\bhref=["'][^"']*["']/i, 'href="' + escapeHtml(value) + '"'));
}
function fmtDate(value, longFormat) {
  if (!value) return 'As per official schedule';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-IN', longFormat
    ? {day:'numeric', month:'long', year:'numeric', timeZone:'UTC'}
    : {day:'2-digit', month:'short', year:'numeric', timeZone:'UTC'}).format(date);
}
function renderStaticContent(html, job, file) {
  const arr = value => Array.isArray(value) ? value : [];
  const esc = escapeHtml;
  const setText = (id, value, fallback) => {
    html = updateElement(html, id, value == null || value === '' ? (fallback == null ? '—' : fallback) : value);
  };
  const setHTML = (id, value) => { html = replaceInner(html, id, value || ''); };
  const stages = arr(job.lifecycle);
  const current = (job.currentStage && stages.find(x => x.id === job.currentStage))
    || [...stages].reverse().find(x => x.current || /current|latest|released|declared|open|live/i.test(x.status || ''))
    || stages[stages.length - 1] || null;
  const icon = type => ({
    notification:'fa-bell', application:'fa-paper-plane', correction:'fa-edit', exam_date:'fa-calendar-alt',
    city_intimation:'fa-city', admit_card:'fa-id-card', exam:'fa-pen', answer_key:'fa-key',
    objection:'fa-exclamation-circle', revised_answer_key:'fa-key', result:'fa-poll', scorecard:'fa-chart-bar',
    cut_off:'fa-chart-line', physical:'fa-running', pet:'fa-running', pst:'fa-ruler-combined',
    skill_test:'fa-keyboard', typing_test:'fa-keyboard', dv:'fa-folder-open', document_verification:'fa-folder-open',
    medical:'fa-heartbeat', interview:'fa-user-tie', final_result:'fa-trophy', joining:'fa-briefcase', notice:'fa-bullhorn'
  }[type] || 'fa-circle');
  const tone = status => /final|selected|declared|released|qualified|completed|active|open|live/i.test(status || '') ? 'success'
    : /soon|scheduled|upcoming|await|pending|tba|to be/i.test(status || '') ? 'info'
    : /objection|closing|deadline|attention/i.test(status || '') ? 'warning'
    : /cancel|postpon|rejected|closed|expired/i.test(status || '') ? 'danger' : 'neutral';

  if (job.seo && job.seo.title) {
    html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, '<title>' + esc(job.seo.title) + '</title>');
    html = updateMetaContent(html, /<meta\b(?=[^>]*\bproperty=["']og:title["'])[^>]*>/i, job.seo.title);
    html = updateMetaContent(html, /<meta\b(?=[^>]*\bname=["']twitter:title["'])[^>]*>/i, job.seo.title);
  }
  if (job.seo && job.seo.description) {
    html = updateMetaContent(html, /<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i, job.seo.description);
    html = updateMetaContent(html, /<meta\b(?=[^>]*\bproperty=["']og:description["'])[^>]*>/i, job.seo.description);
    html = updateMetaContent(html, /<meta\b(?=[^>]*\bname=["']twitter:description["'])[^>]*>/i, job.seo.description);
  }

  setText('jobOrganization', job.organization);
  setText('jobTitle', job.title);
  setText('breadcrumbCurrent', job.shortTitle || job.title);
  setText('jobSummary', job.summary);
  setHTML('jobTags', arr(job.tags).map(x => '<span>' + esc(x) + '</span>').join(''));
  setText('latestUpdate', job.latestUpdate || (current && current.summary) || 'Recruitment page updated.');
  setText('updatedAt', job.updated ? 'Updated ' + fmtDate(job.updated, false) : 'Updated recently');
  setText('updatedBy', 'Updated by ' + (job.updatedBy || 'GovJobUpdates'));

  if (job.seo && job.seo.canonical) {
    html = updateCanonical(html, job.seo.canonical);
    html = updateMetaContent(html, /<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/i, job.seo.canonical);
  }
  if (job.seo && job.seo.robots) {
    html = updateMetaContent(html, /<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i, job.seo.robots);
  }
  const primaryAction = (current && current.primaryAction && current.primaryAction.url && current.primaryAction.url !== '#') ? current.primaryAction
    : (job.primaryAction && job.primaryAction.url && job.primaryAction.url !== '#') ? job.primaryAction
    : (current && current.secondaryAction && current.secondaryAction.url && current.secondaryAction.url !== '#')
      ? {label:current.secondaryAction.label || 'View Latest Notice',url:current.secondaryAction.url,icon:current.secondaryAction.icon || 'fa-file-alt'}
    : (job.links && job.links.official) ? {label:'Check Latest Updates',url:job.links.official,icon:'fa-external-link-alt'}
    : (job.links && job.links.notification) ? {label:'View Recruitment Notice',url:job.links.notification,icon:'fa-file-pdf'}
    : {label:'Check Latest Updates',url:'#important-links',icon:'fa-bell'};
  const secondaryAction = (current && current.secondaryAction && current.secondaryAction.url && current.secondaryAction.url !== '#') ? current.secondaryAction
    : (job.secondaryAction && job.secondaryAction.url && job.secondaryAction.url !== '#') ? job.secondaryAction
    : (job.links && job.links.notification) ? {label:'Official Notification',url:job.links.notification,icon:'fa-file-pdf'}
    : (job.links && job.links.official) ? {label:'Official Website',url:job.links.official,icon:'fa-landmark'}
    : {label:'Important Links',url:'#important-links',icon:'fa-link'};
  ['heroPrimaryBtn','sidePrimaryBtn','mobilePrimaryBtn'].forEach(id => { html = setAction(html, id, primaryAction); });
  html = setAction(html, 'heroSecondaryBtn', secondaryAction);

  const status = (current && current.status) || job.status || 'Latest update available';
  setHTML('recruitmentStatus', '<span class="gjd-status-dot"></span>' + esc(status));
  html = html.replace(/(<[^>]*\bid=["']recruitmentStatus["'][^>]*\bclass=["'])[^"']*(["'][^>]*>)/i,
    '$1gjd-status is-' + ((current && current.tone) || tone(status)) + '$2');
  setText('mobileStatusLabel', (current && (current.shortLabel || current.label)) || 'Latest Stage');
  setText('mobileStageValue', status);
  setText('stageCardLabel', 'Current Recruitment Stage');
  setText('stageHeadline', (current && current.label) || 'Recruitment Update');
  setText('stageDate', current && (current.date || current.deadline) ? fmtDate(current.date || current.deadline, true) : status);
  setText('stageStatusText', status);
  html = hideElement(html, 'stageCountdown', true);

  const metrics = arr(job.metrics).length ? arr(job.metrics) : [
    {label:'Total Vacancies', value:job.vacancies == null ? '—' : job.vacancies, icon:'fa-users'},
    {label:'Current Stage', value:(current && (current.shortLabel || current.label)) || 'Recruitment', icon:icon(current && current.type)},
    {label:'Qualification', value:job.qualificationShort || 'See eligibility', icon:'fa-graduation-cap'},
    {label:'Job Location', value:job.location || 'India', icon:'fa-map-marker-alt'}
  ];
  setHTML('metricsGrid', metrics.slice(0,4).map(m => '<article><span class="gjd-metric-icon"><i class="fas ' + esc(m.icon || 'fa-circle') +
    '"></i></span><div><small>' + esc(m.label) + '</small><strong>' + esc(m.value == null ? '—' : m.value) + '</strong></div></article>').join(''));
  const facts = arr(job.quickFacts);
  setHTML('quickFacts', facts.map(f => '<article><span>' + esc(f.label) + '</span><strong>' + esc(f.value) + '</strong></article>').join(''));
  html = hideElement(html, 'quickFacts', !facts.length);
  setHTML('overviewGrid', arr(job.overview).map(p => '<div class="gjd-info-item"><span>' + esc(p[0]) + '</span><strong>' + esc(p[1]) + '</strong></div>').join(''));
  if (job.overviewNote) setText('overviewNote', job.overviewNote);

  const dates = job.dates || {};
  const timeline = stages.length ? stages : [
    {label:'Notification Released',type:'notification',date:dates.notification},
    {label:'Application Start',type:'application',date:dates.applicationStart},
    {label:'Last Date to Apply',type:'application',date:dates.applicationEnd},
    {label:'Fee Payment Last Date',type:'application',date:dates.feeEnd},
    {label:'Correction Window',type:'correction',date:dates.correction},
    {label:'Exam Date',type:'exam_date',date:dates.exam}
  ].filter(x => x.date);
  setHTML('lifecycleTimeline', timeline.map(stage => {
    const active = current && current.id === stage.id;
    const meta = [stage.status, stage.note].filter(Boolean).join(' • ');
    return '<div class="gjd-timeline-item ' + (active ? 'is-primary is-current ' : '') + 'is-' + esc(stage.tone || tone(stage.status)) +
      '" data-stage-id="' + esc(stage.id || '') + '"><div class="gjd-timeline-dot"><i class="fas ' + icon(stage.type) +
      '"></i></div><div><strong>' + esc(stage.label || stage.id || 'Stage') + '</strong><small>' + esc(meta || 'Recruitment lifecycle') +
      '</small>' + (stage.summary ? '<p class="gjd-stage-summary">' + esc(stage.summary) + '</p>' : '') +
      '</div><div class="gjd-timeline-date">' + esc(stage.date ? fmtDate(stage.date, true) : (stage.dateText || 'As per schedule')) + '</div></div>';
  }).join(''));

  const updates = arr(job.updates);
  setHTML('updateHistory', updates.map((u,i) => '<article class="gjd-update-history-item ' + (i === 0 ? 'is-latest' : '') +
    '"><time>' + esc(fmtDate(u.date, false)) + '</time><div><strong>' + esc(u.title || 'Recruitment Update') +
    '</strong><p>' + esc(u.text || '') + '</p></div></article>').join(''));
  html = hideElement(html, 'updateHistory', !updates.length);

  setHTML('vacancyTable', arr(job.vacancyRows).map(r => '<tr><td><strong>' + esc(r[0]) + '</strong></td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>').join(''));
  setText('vacancyTotal', job.vacancies);
  setText('ageLimit', job.ageLimit);
  setText('ageRelaxation', job.ageRelaxation, 'Age relaxation as per rules.');
  setText('education', job.education);
  setText('educationNote', job.educationNote, 'Refer to the official notification.');
  setText('otherEligibility', job.otherEligibility);
  setHTML('feeGrid', arr(job.fees).map(p => '<div class="gjd-fee-item"><span>' + esc(p[0]) + '</span><strong>' + esc(p[1]) + '</strong></div>').join(''));
  setText('paymentMode', job.paymentMode);
  setHTML('selectionFlow', arr(job.selection).map((x,i) => '<div class="gjd-selection-step"><b>' + String(i+1).padStart(2,'0') + '</b><span>' + esc(x) + '</span></div>').join(''));
  setHTML('documentsGrid', arr(job.documents).map(x => '<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>' + esc(x) + '</span></div>').join(''));

  const guidance = (current && current.guidance) || job.currentGuidance || job.applySteps || [];
  setText('guidanceHeading', (current && current.guidanceTitle) || ((current && current.type === 'application') ? 'How to Apply' : 'What Candidates Should Do Now'));
  setHTML('guidanceSteps', arr(guidance).map(x => '<li>' + esc(x) + '</li>').join(''));
  const applySteps = arr(job.applySteps);
  html = hideElement(html, 'applicationArchive', !((!current || current.type !== 'application') && applySteps.length));
  setHTML('applicationArchiveSteps', applySteps.map(x => '<li>' + esc(x) + '</li>').join(''));

  const links = Array.isArray(job.importantLinks) ? job.importantLinks : [
    ...(job.links && job.links.apply ? [{label:'Apply Online',note:'Official application portal',url:job.links.apply,icon:'fa-paper-plane',type:'application'}] : []),
    ...(job.links && job.links.notification ? [{label:'Download Notification',note:'Official PDF / notice',url:job.links.notification,icon:'fa-file-pdf',type:'notification'}] : []),
    ...(job.links && job.links.official ? [{label:'Official Website',note:'Recruitment authority website',url:job.links.official,icon:'fa-landmark',type:'official'}] : [])
  ];
  setHTML('importantLinks', links.map((l,i) => {
    const valid = l.url && l.url !== '#';
    const iconName = l.icon || icon(l.type);
    const prefix = /^fa-(telegram|whatsapp|youtube|instagram|linkedin|facebook|twitter)$/.test(iconName) ? 'fab' : 'fas';
    const badge = l.badge || (i === 0 ? 'Latest' : '');
    return '<div class="gjd-link-row ' + (l.highlight ? 'is-highlight' : '') + '"><div><i class="' + prefix + ' ' + esc(iconName) +
      '"></i><p><strong>' + esc(l.label) + '</strong><small>' + esc(l.note || '') + '</small>' +
      (badge ? '<em class="gjd-link-badge">' + esc(badge) + '</em>' : '') + '</p></div><a href="' + esc(valid ? l.url : '#') +
      '"' + (valid ? ' target="_blank" rel="noopener noreferrer"' : ' class="is-disabled" aria-disabled="true"') + '>' +
      esc(l.buttonLabel || (valid ? 'Open Link' : 'Awaited')) + '</a></div>';
  }).join(''));
  setHTML('faqList', arr(job.faqs).map((p,i) => '<div class="gjd-faq-item"><button class="gjd-faq-question" type="button" aria-expanded="' +
    (i === 0 ? 'true' : 'false') + '"><span>' + esc(p[0]) + '</span><i class="fas fa-plus"></i></button><div class="gjd-faq-answer"><p>' +
    esc(p[1]) + '</p></div></div>').join(''));
  // Static JSON-LD mirrors the lifecycle renderer so schema is present before JavaScript runs.
  const canonical = (job.seo && job.seo.canonical) || ('https://govjobupdates.com/jobs/' + file);
  const applicationEnd = (job.dates && job.dates.applicationEnd) ||
    (stages.find(x => x.type === 'application' && x.deadline) || {}).deadline;
  const endDate = applicationEnd ? new Date(applicationEnd) : null;
  const notificationDate = (job.dates && job.dates.notification) ||
    ((stages.find(x => x.type === 'notification') || {}).date);
  const jobPostingActive = endDate && !Number.isNaN(endDate.getTime()) && endDate.getTime() >= Date.now();
  const buildLocation = value => {
    const raw = String(value || '').trim();
    const parts = raw ? raw.split(/\s*(?:&|,|\/|\band\b)\s*/i).map(x => x.trim()).filter(Boolean) : ['India'];
    const places = parts.map(name => {
      const address = {'@type':'PostalAddress','addressCountry':'IN'};
      if (name && !/^india$/i.test(name)) address.addressRegion = name;
      return {'@type':'Place',address:address};
    });
    return places.length === 1 ? places[0] : places;
  };
  const buildSalary = value => {
    const raw = String(value || '');
    const matches = Array.from(raw.matchAll(/\d[\d,]*/g)).map(m => Number(m[0].replace(/,/g,''))).filter(Number.isFinite);
    if (!matches.length) return undefined;
    const quantity = {'@type':'QuantitativeValue','unitText':/year|annual|annum|p\.a\./i.test(raw) ? 'YEAR' : 'MONTH'};
    if (matches.length >= 2) {
      quantity.minValue = Math.min(matches[0], matches[1]);
      quantity.maxValue = Math.max(matches[0], matches[1]);
    } else quantity.value = matches[0];
    return {'@type':'MonetaryAmount','currency':'INR',value:quantity};
  };
  const primarySchema = jobPostingActive ? {
    '@context':'https://schema.org','@type':'JobPosting',title:job.title,description:job.summary,
    datePosted:notificationDate,validThrough:applicationEnd,employmentType:job.employmentType || 'FULL_TIME',
    hiringOrganization:{'@type':'Organization',name:job.organization,sameAs:(job.links && job.links.official) || canonical},
    jobLocation:buildLocation(job.location),applicantLocationRequirements:{'@type':'Country','name':'India'},
    baseSalary:buildSalary(job.salary),url:canonical
  } : {
    '@context':'https://schema.org','@type':'WebPage',name:(job.seo && job.seo.title) || job.title,
    description:(job.seo && job.seo.description) || job.summary,url:canonical,dateModified:job.updated,
    about:{'@type':'Thing','name':job.title},
    publisher:{'@type':'Organization','name':'GovJobUpdates','url':'https://govjobupdates.com/'}
  };
  Object.keys(primarySchema).forEach(key => primarySchema[key] === undefined && delete primarySchema[key]);
  const breadcrumbSchema = {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
    {'@type':'ListItem','position':1,'name':'Home','item':'https://govjobupdates.com/'},
    {'@type':'ListItem','position':2,'name':'Jobs','item':'https://govjobupdates.com/HTML/latest-jobs.html'},
    {'@type':'ListItem','position':3,'name':job.shortTitle || job.title,'item':canonical}
  ]};
  const faqSchema = {'@context':'https://schema.org','@type':'FAQPage','mainEntity':arr(job.faqs).map(pair => ({
    '@type':'Question','name':pair[0],'acceptedAnswer':{'@type':'Answer','text':pair[1]}
  }))};
  const scriptJson = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  html = replaceInner(html, 'primarySchema', scriptJson(primarySchema));
  html = replaceInner(html, 'jobPostingSchema', scriptJson(primarySchema));
  html = replaceInner(html, 'breadcrumbSchema', scriptJson(breadcrumbSchema));
  html = replaceInner(html, 'faqSchema', scriptJson(faqSchema));

  return html;
}

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
    // Explicit exclusions are intentional: do not read, rewrite, or normalize OTR pages.
    if (EXCLUDED_FILES.has(file)) {
      skipped += 1;
      console.log('Skipped protected OTR page: jobs/' + file);
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
    html = renderStaticContent(html, job, file);

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