#!/usr/bin/env node

/*
 * Hydrates the visible job page from inline #jobData JSON.
 * The browser lifecycle script remains the interactive layer; this script
 * makes the same important content available in the initial HTML for
 * crawlers and no-JS clients.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jobsDir = path.join(root, 'jobs');
const write = process.argv.includes('--write');

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(value) {
  return esc(value).replace(/'/g, '&#39;');
}

function updateElement(html, id, value, options = {}) {
  if (value === undefined || value === null) return html;
  const str = String(value);
  if (!str && !options.allowEmpty) return html;
  const expression = new RegExp(
    `(<[a-z0-9]+\\b[^>]*\\bid=["']${id}["'][^>]*>)[\\s\\S]*?(</[a-z0-9]+>)`,
    'i'
  );
  const match = html.match(expression);
  if (!match) return html;
  return html.replace(expression, `$1${options.html ? str : esc(str)}$2`);
}

function setAttr(html, id, attr, value) {
  if (value === undefined || value === null || value === '') return html;
  const expression = new RegExp(
    `(<[a-z0-9]+\\b[^>]*\\bid=["']${id}["'][^>]*\\b${attr}=["'])[^"']*(["'])`,
    'i'
  );
  if (!expression.test(html)) return html;
  return html.replace(expression, `$1${escAttr(value)}$2`);
}

function updateMeta(html, selector, value) {
  if (value === undefined || value === null || value === '') return html;
  const expression = new RegExp(
    `(<meta[^>]*(?:name|property)=["']${selector}["'][^>]*content=["'])[^"']*(["'])`,
    'i'
  );
  if (!expression.test(html)) return html;
  return html.replace(expression, `$1${escAttr(value)}$2`);
}

function replaceScriptJson(html, id, value) {
  const expression = new RegExp(
    `(<script[^>]*\\bid=["']${id}["'][^>]*>)[\\s\\S]*?(</script>)`,
    'i'
  );
  if (!expression.test(html)) return html;
  return html.replace(expression, `$1${JSON.stringify(value)}$2`);
}

function readJobData(html, file) {
  const matches = html.match(/<script\b[^>]*\bid=["']jobData["'][^>]*>[\s\S]*?<\/script>/ig) || [];
  if (matches.length !== 1) {
    throw new Error(`${file}: expected exactly one #jobData block, found ${matches.length}`);
  }
  const body = matches[0].replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '');
  try {
    return JSON.parse(body.trim());
  } catch (error) {
    throw new Error(`${file}: invalid #jobData JSON (${error.message})`);
  }
}
function fmtDate(value, long = false) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: long ? 'long' : 'short',
    year: 'numeric'
  }).format(d);
}

function iconForType(type) {
  const map = {
    notification: 'fa-bullhorn',
    application: 'fa-file-signature',
    exam: 'fa-pen',
    admit_card: 'fa-id-card',
    answer_key: 'fa-key',
    result: 'fa-poll',
    notice: 'fa-bell',
    final_result: 'fa-trophy',
    correction: 'fa-pen-to-square'
  };
  return map[type] || 'fa-circle';
}

function toneFor(status) {
  const s = String(status || '').toLowerCase();
  if (s.includes('released') || s.includes('completed')) return 'success';
  if (s.includes('closed') || s.includes('awaited')) return 'muted';
  if (s.includes('active') || s.includes('open')) return 'primary';
  return 'neutral';
}

function resolveCurrentStage(job, lifecycle) {
  if (job.currentStage && typeof job.currentStage === 'object') return job.currentStage;
  if (typeof job.currentStage === 'string') {
    return lifecycle.find(s => s && (s.id === job.currentStage || s.type === job.currentStage || s.shortLabel === job.currentStage || s.label === job.currentStage)) || null;
  }
  return lifecycle.find(s => s && s.current) || null;
}

function normalizeLinks(job) {
  if (Array.isArray(job.importantLinks)) return job.importantLinks;
  const links = [];
  if (job.links && job.links.apply) links.push({label:'Apply Online', note:'Official application portal', url:job.links.apply, icon:'fa-paper-plane', type:'application'});
  if (job.links && job.links.notification) links.push({label:'Download Notification', note:'Official PDF / notice', url:job.links.notification, icon:'fa-file-pdf', type:'notification'});
  if (job.links && job.links.official) links.push({label:'Official Website', note:'Recruitment authority website', url:job.links.official, icon:'fa-landmark', type:'official'});
  return links;
}

function isUrl(value) {
  return /^https?:\\/\\//i.test(String(value || ''));
}

function hydrate(html, job) {
  const lifecycle = Array.isArray(job.lifecycle) ? job.lifecycle : [];
  const currentStage = resolveCurrentStage(job, lifecycle);

  // Head / SEO metadata.
  html = updateMeta(html, 'description', job.seo && job.seo.description || job.summary);
  html = updateMeta(html, 'robots', job.seo && job.seo.robots);
  html = updateMeta(html, 'og:title', job.seo && job.seo.title || job.title);
  html = updateMeta(html, 'og:description', job.seo && job.seo.description || job.summary);
  html = updateMeta(html, 'og:url', job.seo && job.seo.canonical);
  html = updateMeta(html, 'twitter:title', job.seo && job.seo.title || job.title);
  html = updateMeta(html, 'twitter:description', job.seo && job.seo.description || job.summary);
  html = setAttr(html, 'jobCanonical', 'href', job.seo && job.seo.canonical);
  html = html.replace(/(<link[^>]*rel=["']canonical["'][^>]*href=["'])[^"']*(["'])/i,
    (m,a,b) => a + escAttr(job.seo && job.seo.canonical || '') + b);

  if (job.seo && job.seo.title) html = html.replace(/<title>[\\s\\S]*?<\\/title>/i, '<title>' + esc(job.seo.title) + '</title>');
  else if (job.title) html = html.replace(/<title>[\\s\\S]*?<\\/title>/i, '<title>' + esc(job.title) + '</title>');

  // Hero.
  html = updateElement(html, 'jobOrganization', job.organization);
  html = updateElement(html, 'jobTitle', job.title);
  html = updateElement(html, 'jobSummary', job.summary);
  html = updateElement(html, 'breadcrumbCurrent', job.shortTitle || job.title);
  html = updateElement(html, 'latestUpdate', job.latestUpdate);
  html = updateElement(html, 'updatedAt', fmtDate(job.updated, true) || 'Updated recently');
  html = updateElement(html, 'updatedBy', job.updatedBy || 'Updated by GovJobUpdates');

  if (job.tags && Array.isArray(job.tags)) {
    html = updateElement(html, 'jobTags', job.tags.map(t => '<span>' + esc(t) + '</span>').join(''), {html:true, allowEmpty:true});
  }

  const status = currentStage && currentStage.status || job.status || 'Updated';
  const stageLabel = currentStage && (currentStage.label || currentStage.shortLabel) || 'Recruitment Update';
  const stageDate = currentStage && (currentStage.date || currentStage.deadline);
  const primary = currentStage && currentStage.primaryAction || job.primaryAction;
  const secondary = currentStage && currentStage.secondaryAction || job.secondaryAction;

  html = updateElement(html, 'recruitmentStatus', '<span class="gjd-status-dot"></span>' + esc(status), {html:true});
  html = updateElement(html, 'stageHeadline', stageLabel);
  html = updateElement(html, 'stageDate', stageDate ? fmtDate(stageDate, true) : status);
  html = updateElement(html, 'stageStatusText', status);
  html = updateElement(html, 'mobileStatusLabel', currentStage && (currentStage.shortLabel || currentStage.label) || 'Latest Stage');
  html = updateElement(html, 'mobileStageValue', status);

  function actionButton(id, action, fallbackLabel) {
    if (!action || !action.url) return;
    const label = action.label || fallbackLabel;
    const icon = action.icon || 'fa-arrow-right';
    html = setAttr(html, id, 'href', action.url);
    html = updateElement(html, id, '<i class="fas ' + esc(icon) + '"></i><span>' + esc(label) + '</span>', {html:true});
  }
  actionButton('heroPrimaryBtn', primary, 'Latest Action');
  actionButton('sidePrimaryBtn', primary, 'Latest Action');
  actionButton('mobilePrimaryBtn', primary, 'Latest Action');
  actionButton('heroSecondaryBtn', secondary, 'Official Notification');

  // Metrics.
  const metrics = Array.isArray(job.metrics) && job.metrics.length ? job.metrics : [
    {label:'Total Vacancies', value:job.vacancies, icon:'fa-users'},
    {label:'Current Stage', value:stageLabel, icon:iconForType(currentStage && currentStage.type)},
    {label:'Qualification', value:job.qualificationShort || 'See eligibility', icon:'fa-graduation-cap'},
    {label:'Job Location', value:job.location || 'India', icon:'fa-map-marker-alt'}
  ];
  html = updateElement(html, 'metricsGrid', metrics.slice(0,4).map(m =>
    '<article><span class="gjd-metric-icon"><i class="fas ' + esc(m.icon || 'fa-circle') + '"></i></span><div><small>' +
    esc(m.label) + '</small><strong>' + esc(m.value) + '</strong></div></article>'
  ).join(''), {html:true, allowEmpty:true});

  // Quick facts.
  if (Array.isArray(job.quickFacts) && job.quickFacts.length) {
    html = updateElement(html, 'quickFacts', job.quickFacts.map(f =>
      '<article><span>' + esc(f.label) + '</span><strong>' + esc(f.value) + '</strong></article>'
    ).join(''), {html:true, allowEmpty:true});
    html = html.replace(/(<[^>]*\bid=["']quickFacts["'][^>]*?)\bhidden(?=[ >])/i, '$1');
  } else {
    html = html.replace(/(<[^>]*\bid=["']quickFacts["'][^>]*)(\s+hidden)/i, '$1');
  }

  // Overview.
  if (Array.isArray(job.overview)) {
    html = updateElement(html, 'overviewGrid', job.overview.map(row =>
      Array.isArray(row) ? '<div class="gjd-info-item"><span>' + esc(row[0]) + '</span><strong>' + esc(row[1]) + '</strong></div>' : ''
    ).join(''), {html:true, allowEmpty:true});
  }
  html = updateElement(html, 'overviewNote', job.overviewNote);

  // Lifecycle timeline.
  let timeline = '';
  if (lifecycle.length) {
    timeline = lifecycle.map(stage => {
      const current = currentStage && stage.id === currentStage.id;
      const meta = [stage.status, stage.note].filter(Boolean).join(' • ') || 'Recruitment lifecycle';
      const date = stage.date ? fmtDate(stage.date, true) : (stage.dateText || 'As per schedule');
      return '<div class="gjd-timeline-item ' + (current ? 'is-primary is-current ' : '') + 'is-' + esc(toneFor(stage.status)) + '" data-stage-id="' + esc(stage.id || '') + '">' +
        '<div class="gjd-timeline-dot"><i class="fas ' + esc(iconForType(stage.type)) + '"></i></div><div><strong>' +
        esc(stage.label || stage.id || 'Stage') + '</strong><small>' + esc(meta) + '</small>' +
        (stage.summary ? '<p class="gjd-stage-summary">' + esc(stage.summary) + '</p>' : '') +
        '</div><div class="gjd-timeline-date">' + esc(date) + '</div></div>';
    }).join('');
  } else {
    const dates = job.dates || {};
    const defs = [
      ['Notification Released','notification','notification'],
      ['Application Start','applicationStart','application'],
      ['Last Date to Apply','applicationEnd','application'],
      ['Fee Payment Last Date','feeEnd','application'],
      ['Correction Window','correction','correction'],
      ['Exam Date','exam','exam_date']
    ];
    timeline = defs.filter(x => dates[x[1]]).map(x =>
      '<div class="gjd-timeline-item"><div class="gjd-timeline-dot"><i class="fas ' + iconForType(x[2]) +
      '"></i></div><div><strong>' + esc(x[0]) + '</strong><small>Recruitment schedule</small></div><div class="gjd-timeline-date">' +
      esc(fmtDate(dates[x[1]], true)) + '</div></div>'
    ).join('');
  }
  html = updateElement(html, 'lifecycleTimeline', timeline, {html:true, allowEmpty:true});

  // Update history.
  const updates = Array.isArray(job.updates) ? job.updates : [];
  html = updateElement(html, 'updateHistory', updates.map((u,i) =>
    '<article class="gjd-update-history-item ' + (i === 0 ? 'is-latest' : '') + '"><time>' +
    esc(fmtDate(u.date)) + '</time><div><strong>' + esc(u.title || 'Recruitment Update') +
    '</strong><p>' + esc(u.text || '') + '</p></div></article>'
  ).join(''), {html:true, allowEmpty:true});
  if (updates.length) html = html.replace(/(<[^>]*\bid=["']updateHistory["'][^>]*?)\bhidden(?=[ >])/i, '$1');
  else html = html.replace(/(<[^>]*\bid=["']updateHistory["'][^>]*)(\s+hidden)/i, '$1');

  // Vacancy / eligibility / fee / selection / documents.
  html = updateElement(html, 'vacancyTable', (job.vacancyRows || []).map(r =>
    '<tr><td><strong>' + esc(r[0]) + '</strong></td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>'
  ).join(''), {html:true, allowEmpty:true});
  html = updateElement(html, 'vacancyTotal', job.vacancies);
  html = updateElement(html, 'ageLimit', job.ageLimit);
  html = updateElement(html, 'ageRelaxation', job.ageRelaxation || 'Age relaxation as per rules.');
  html = updateElement(html, 'education', job.education);
  html = updateElement(html, 'educationNote', job.educationNote || 'Refer to the official notification.');
  html = updateElement(html, 'otherEligibility', job.otherEligibility);
  html = updateElement(html, 'feeGrid', (job.fees || []).map(r =>
    '<div class="gjd-fee-item"><span>' + esc(r[0]) + '</span><strong>' + esc(r[1]) + '</strong></div>'
  ).join(''), {html:true, allowEmpty:true});
  html = updateElement(html, 'paymentMode', job.paymentMode);
  html = updateElement(html, 'selectionFlow', (job.selection || []).map((x,i) =>
    '<div class="gjd-selection-step"><b>' + String(i+1).padStart(2,'0') + '</b><span>' + esc(x) + '</span></div>'
  ).join(''), {html:true, allowEmpty:true});
  html = updateElement(html, 'documentsGrid', (job.documents || []).map(x =>
    '<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>' + esc(x) + '</span></div>'
  ).join(''), {html:true, allowEmpty:true});

  // Guidance + archived application steps.
  const guidance = currentStage && currentStage.guidance || job.currentGuidance || job.applySteps || [];
  const guidanceTitle = currentStage && currentStage.guidanceTitle || (currentStage && currentStage.type === 'application' ? 'How to Apply' : 'What Candidates Should Do Now');
  html = updateElement(html, 'guidanceHeading', guidanceTitle);
  html = updateElement(html, 'guidanceSteps', guidance.map(x => '<li>' + esc(x) + '</li>').join(''), {html:true, allowEmpty:true});
  const archiveSteps = job.applySteps || [];
  if (archiveSteps.length && (!currentStage || currentStage.type !== 'application')) {
    html = updateElement(html, 'applicationArchiveSteps', archiveSteps.map(x => '<li>' + esc(x) + '</li>').join(''), {html:true, allowEmpty:true});
    html = html.replace(/(<[^>]*\bid=["']applicationArchive["'][^>]*?)\bhidden(?=[ >])/i, '$1');
  }

  // Important links.
  const links = normalizeLinks(job);
  html = updateElement(html, 'importantLinks', links.map((l,i) => {
    const disabled = !isUrl(l.url);
    const badge = l.badge || (i === 0 ? 'Latest' : '');
    return '<div class="gjd-link-row ' + (l.highlight ? 'is-highlight' : '') + '"><div><i class="fas ' +
      esc(l.icon || iconForType(l.type)) + '"></i><p><strong>' + esc(l.label) + '</strong><small>' +
      esc(l.note || '') + '</small>' + (badge ? '<em class="gjd-link-badge">' + esc(badge) + '</em>' : '') +
      '</p></div><a href="' + escAttr(l.url || '#') + '"' + (disabled ? ' class="is-disabled" aria-disabled="true"' : ' target="_blank" rel="noopener noreferrer"') +
      '>' + esc(l.buttonLabel || (disabled ? 'Awaited' : 'Open Link')) + '</a></div>';
  }).join(''), {html:true, allowEmpty:true});

  // FAQ.
  html = updateElement(html, 'faqList', (job.faqs || []).map((row,i) =>
    '<div class="gjd-faq-item"><button class="gjd-faq-question" type="button" aria-expanded="' +
    (i === 0 ? 'true' : 'false') + '"><span>' + esc(row[0]) + '</span><i class="fas fa-plus"></i></button>' +
    '<div class="gjd-faq-answer"><p>' + esc(row[1]) + '</p></div></div>'
  ).join(''), {html:true, allowEmpty:true});

  // JSON-LD.
  const canonical = job.seo && job.seo.canonical || '';
  const applicationEnd = job.dates && job.dates.applicationEnd || lifecycle.find(x => x.type === 'application' && x.deadline) && lifecycle.find(x => x.type === 'application' && x.deadline).deadline;
  const endDate = applicationEnd ? new Date(applicationEnd) : null;
  const activeApplication = endDate && !Number.isNaN(endDate.getTime()) && endDate.getTime() >= Date.now();
  const notificationDate = job.dates && job.dates.notification || lifecycle.find(x => x.type === 'notification') && lifecycle.find(x => x.type === 'notification').date;
  const primarySchema = activeApplication ? {
    '@context':'https://schema.org',
    '@type':'JobPosting',
    title:job.title,
    description:job.summary,
    datePosted:notificationDate,
    validThrough:applicationEnd,
    employmentType:job.employmentType || 'FULL_TIME',
    hiringOrganization:{'@type':'Organization',name:job.organization,sameAs:job.links && job.links.official || canonical},
    applicantLocationRequirements:{'@type':'Country',name:'India'},
    url:canonical
  } : {
    '@context':'https://schema.org',
    '@type':'WebPage',
    name:job.seo && job.seo.title || job.title,
    description:job.seo && job.seo.description || job.summary,
    url:canonical,
    dateModified:job.updated,
    about:{'@type':'Thing',name:job.title},
    publisher:{'@type':'Organization',name:'GovJobUpdates',url:'https://govjobupdates.com/'}
  };
  html = replaceScriptJson(html, 'primarySchema', primarySchema);
  html = replaceScriptJson(html, 'jobPostingSchema', primarySchema);
  html = replaceScriptJson(html, 'breadcrumbSchema', {
    '@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      {'@type':'ListItem',position:1,name:'Home',item:'https://govjobupdates.com/'},
      {'@type':'ListItem',position:2,name:'Jobs',item:'https://govjobupdates.com/HTML/latest-jobs.html'},
      {'@type':'ListItem',position:3,name:job.shortTitle || job.title,item:canonical}
    ]
  });
  html = replaceScriptJson(html, 'faqSchema', {
    '@context':'https://schema.org','@type':'FAQPage',
    mainEntity:(job.faqs || []).map(row => ({
      '@type':'Question',name:row[0],
      acceptedAnswer:{'@type':'Answer',text:row[1]}
    }))
  });

  return html;
}

const files = fs.readdirSync(jobsDir).filter(file => file.endsWith('.html')).sort();
let changed = 0;
let skipped = 0;
const errors = [];

for (const file of files) {
  const filePath = path.join(jobsDir, file);
  const original = fs.readFileSync(filePath, 'utf8');
  try {
    const job = readJobData(original, file);
    let html = hydrate(original, job);
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

console.log(`\n${write ? 'Updated' : 'Preview'}: ${changed} changed, ${skipped} already current, ${errors.length} errors.`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
}
