#!/usr/bin/env node
'use strict';

/*
 * Full static SEO hydrate for jobs/*.html lifecycle pages.
 * Balanced tag matching (no nested-tag truncation).
 * Dates always Asia/Kolkata → same output local + CI.
 *
 * Usage:
 *   node scripts/hydrate-job-static-fallbacks.js
 *   node scripts/hydrate-job-static-fallbacks.js --write
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jobsDir = path.join(root, 'jobs');
const write = process.argv.includes('--write');
const TZ = 'Asia/Kolkata';

function esc(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])
  );
}

function isUrl(url) {
  return Boolean(url && url !== '#');
}

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtDate(value, withYear = true) {
  const d = parseDate(value);
  if (!d) return value || 'As per official schedule';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
    timeZone: TZ,
  }).format(d);
}

function fmtDateLong(value) {
  const d = parseDate(value);
  if (!d) return value || 'As per official schedule';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: TZ,
  }).format(d);
}

function num(value) {
  return typeof value === 'number'
    ? new Intl.NumberFormat('en-IN').format(value)
    : value;
}

function toneFor(status) {
  const s = String(status || '').toLowerCase();
  if (/final|selected|declared|released|qualified|completed|active|open|live/.test(s))
    return 'success';
  if (/soon|scheduled|upcoming|await|pending|tba|to be/.test(s)) return 'info';
  if (/objection|closing|deadline|attention/.test(s)) return 'warning';
  if (/cancel|postpon|rejected|closed|expired/.test(s)) return 'danger';
  return 'neutral';
}

const TYPE_ICONS = {
  notification: 'fa-bell', application: 'fa-paper-plane', correction: 'fa-edit',
  exam_date: 'fa-calendar-alt', city_intimation: 'fa-city', admit_card: 'fa-id-card',
  exam: 'fa-pen', answer_key: 'fa-key', objection: 'fa-exclamation-circle',
  revised_answer_key: 'fa-key', result: 'fa-poll', scorecard: 'fa-chart-bar',
  cut_off: 'fa-chart-line', physical: 'fa-running', pet: 'fa-running',
  pst: 'fa-ruler-combined', skill_test: 'fa-keyboard', typing_test: 'fa-keyboard',
  dv: 'fa-folder-open', document_verification: 'fa-folder-open', medical: 'fa-heartbeat',
  interview: 'fa-user-tie', final_result: 'fa-trophy', joining: 'fa-briefcase',
  notice: 'fa-bullhorn',
};

function iconForType(type) {
  return TYPE_ICONS[type] || 'fa-circle';
}

function linkIconClass(icon) {
  const brand = new Set([
    'fa-telegram', 'fa-whatsapp', 'fa-youtube', 'fa-instagram',
    'fa-linkedin', 'fa-facebook', 'fa-twitter',
  ]);
  return `${brand.has(icon) ? 'fab' : 'fas'} ${icon}`;
}

/** Balanced tag replace: finds OUTER closing tag for element with id. */
function setInner(html, id, inner) {
  const idRe = new RegExp(`\\bid=["']${id}["']`, 'i');
  const idx = html.search(idRe);
  if (idx === -1) return html;

  const openAngle = html.lastIndexOf('<', idx);
  if (openAngle === -1) return html;

  const tagMatch = html.slice(openAngle).match(/^<([a-z0-9]+)\b[^>]*>/i);
  if (!tagMatch) return html;
  const tag = tagMatch[1].toLowerCase();
  const openEnd = openAngle + tagMatch[0].length;

  const openRe = new RegExp(`<${tag}\\b[^>]*>`, 'gi');
  const closeRe = new RegExp(`</${tag}\\s*>`, 'gi');
  let depth = 1;
  let pos = openEnd;
  let end = -1;

  while (pos < html.length && depth > 0) {
    openRe.lastIndex = pos;
    closeRe.lastIndex = pos;
    const nextOpen = openRe.exec(html);
    const nextClose = closeRe.exec(html);
    if (!nextClose) break;

    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1;
      pos = nextOpen.index + nextOpen[0].length;
    } else {
      depth -= 1;
      if (depth === 0) {
        end = nextClose.index + nextClose[0].length;
        break;
      }
      pos = nextClose.index + nextClose[0].length;
    }
  }

  if (end === -1) return html;
  return html.slice(0, openEnd) + inner + html.slice(end - `</${tag}>`.length);
}

function setText(html, id, value, fallback) {
  if (value === undefined || value === null) {
    if (fallback === undefined) return html;
    value = fallback;
  }
  if (value === '') return html;
  return setInner(html, id, esc(value));
}

function setRecruitmentStatus(html, label, tone) {
  const idRe = /id=["']recruitmentStatus["']/i;
  const idx = html.search(idRe);
  if (idx === -1) return html;

  const openStart = html.lastIndexOf('<span', idx);
  if (openStart === -1) return html;

  let depth = 0;
  let end = -1;
  const tagRe = /<\/?span\b[^>]*>/gi;
  tagRe.lastIndex = openStart;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    if (m[0].startsWith('</')) {
      depth -= 1;
      if (depth === 0) {
        end = m.index + m[0].length;
        break;
      }
    } else if (!/\/>$/.test(m[0])) {
      depth += 1;
    }
  }
  if (end === -1) return html;

  const tail = html.slice(end);
  const orphan = /^\s*Checking latest stage\s*<\/span>/i.exec(tail);
  if (orphan) end += orphan[0].length;

  const replacement =
    `<span class="gjd-status is-${esc(tone)}" id="recruitmentStatus">` +
    `<span class="gjd-status-dot"></span>${esc(label)}</span>`;
  return html.slice(0, openStart) + replacement + html.slice(end);
}

function setLink(html, id, url, label, icon) {
  const re = new RegExp(
    `<a\\b([^>]*\\bid=["']${id}["'][^>]*)>([\\s\\S]*?)<\\/a>`,
    'i'
  );
  const m = html.match(re);
  if (!m) return html;

  let attrs = m[1];
  let body = m[2];
  const targetUrl = isUrl(url) ? url : '#important-links';

  if (/\bhref\s*=/.test(attrs)) {
    attrs = attrs.replace(/\bhref\s*=\s*(["']).*?\1/i, `href="${esc(targetUrl)}"`);
  } else {
    attrs += ` href="${esc(targetUrl)}"`;
  }

  if (/^https?:\/\//i.test(targetUrl)) {
    if (/\btarget\s*=/.test(attrs)) {
      attrs = attrs.replace(/\btarget\s*=\s*(["']).*?\1/i, 'target="_blank"');
    } else {
      attrs += ' target="_blank"';
    }
    if (/\brel\s*=/.test(attrs)) {
      attrs = attrs.replace(/\brel\s*=\s*(["']).*?\1/i, 'rel="noopener noreferrer"');
    } else {
      attrs += ' rel="noopener noreferrer"';
    }
  } else {
    attrs = attrs.replace(/\s*\btarget\s*=\s*(["']).*?\1/gi, '');
    attrs = attrs.replace(/\s*\brel\s*=\s*(["']).*?\1/gi, '');
  }

  attrs = attrs.replace(/\s*\bclass="([^"]*)"/i, (full, cls) => {
    const cleaned = cls.split(/\s+/).filter((c) => c && c !== 'is-disabled').join(' ');
    return ` class="${cleaned}"`;
  });
  attrs = attrs.replace(/\s*\baria-disabled\s*=\s*(["']).*?\1/gi, '');

  if (label && /<span\b/i.test(body)) {
    body = body.replace(/(<span\b[^>]*>)([\s\S]*?)(<\/span>)/i, `$1${esc(label)}$3`);
  }

  if (icon && /<i\b/i.test(body)) {
    if (/\bclass\s*=/.test(body.match(/<i\b[^>]*>/i)?.[0] || '')) {
      body = body.replace(
        /(<i\b[^>]*\bclass\s*=\s*["'])[^"']*(["'][^>]*>)/i,
        `$1fas ${esc(icon)}$2`
      );
    } else {
      body = body.replace(/<i\b([^>]*)>/i, `<i class="fas ${esc(icon)}"$1>`);
    }
  }

  return html.replace(re, `<a${attrs}>${body}</a>`);
}

function setScriptJson(html, id, obj) {
  const re = new RegExp(
    `(<script\\b[^>]*\\bid=["']${id}["'][^>]*>)([\\s\\S]*?)(<\\/script>)`,
    'i'
  );
  if (!re.test(html)) return html;
  return html.replace(re, `$1${JSON.stringify(obj)}$3`);
}

function setHidden(html, id, hidden) {
  const re = new RegExp(
    `(<([a-z0-9]+)\\b)([^>]*\\bid=["']${id}["'][^>]*)(>)`,
    'i'
  );
  const m = html.match(re);
  if (!m) return html;
  let attrs = m[3];
  if (hidden) {
    if (!/\bhidden\b/i.test(attrs)) attrs += ' hidden';
  } else {
    attrs = attrs.replace(/\s*\bhidden\b/gi, '');
  }
  return html.replace(re, `${m[1]}${attrs}${m[4]}`);
}

function buildSchemaJobLocation(location) {
  const raw = String(location || '').trim();
  const parts = raw
    ? raw.split(/\s*(?:&|,|\/|\band\b)\s*/i).map((x) => x.trim()).filter(Boolean)
    : ['India'];
  const places = parts.map((name) => {
    const address = { '@type': 'PostalAddress', addressCountry: 'IN' };
    if (name && !/^india$/i.test(name)) address.addressRegion = name;
    return { '@type': 'Place', address };
  });
  return places.length === 1 ? places[0] : places;
}

function buildSchemaBaseSalary(salary) {
  const text = String(salary || '');
  const matches = [...text.matchAll(/\d[\d,]*/g)]
    .map((m) => Number(m[0].replace(/,/g, '')))
    .filter(Number.isFinite);
  if (!matches.length) return undefined;
  const value = {
    '@type': 'QuantitativeValue',
    unitText: /year|annual|annum|p\.a\./i.test(text) ? 'YEAR' : 'MONTH',
  };
  if (matches.length >= 2) {
    value.minValue = Math.min(matches[0], matches[1]);
    value.maxValue = Math.max(matches[0], matches[1]);
  } else {
    value.value = matches[0];
  }
  return { '@type': 'MonetaryAmount', currency: 'INR', value };
}

function resolveCurrentStage(job) {
  const lifecycle = Array.isArray(job.lifecycle) ? job.lifecycle : [];
  if (!lifecycle.length) return null;
  if (job.currentStage) {
    const exact = lifecycle.find((x) => x.id === job.currentStage);
    if (exact) return exact;
  }
  return (
    [...lifecycle]
      .reverse()
      .find(
        (x) =>
          x.current ||
          /current|latest|released|declared|open|live/i.test(x.status || '')
      ) || lifecycle[lifecycle.length - 1]
  );
}

function getPrimaryAction(job, currentStage) {
  if (isUrl(currentStage?.primaryAction?.url)) return currentStage.primaryAction;
  if (isUrl(job.primaryAction?.url)) return job.primaryAction;
  if (isUrl(currentStage?.secondaryAction?.url)) {
    return {
      label: currentStage.secondaryAction.label || 'View Latest Notice',
      url: currentStage.secondaryAction.url,
      icon: currentStage.secondaryAction.icon || 'fa-file-alt',
    };
  }
  if (isUrl(job.links?.official)) {
    return { label: 'Check Latest Updates', url: job.links.official, icon: 'fa-external-link-alt' };
  }
  if (isUrl(job.links?.notification)) {
    return { label: 'View Recruitment Notice', url: job.links.notification, icon: 'fa-file-pdf' };
  }
  return { label: 'Check Latest Updates', url: '#important-links', icon: 'fa-bell' };
}

function getSecondaryAction(job, currentStage) {
  if (isUrl(currentStage?.secondaryAction?.url)) return currentStage.secondaryAction;
  if (isUrl(job.secondaryAction?.url)) return job.secondaryAction;
  if (isUrl(job.links?.notification)) {
    return { label: 'Official Notification', url: job.links.notification, icon: 'fa-file-pdf' };
  }
  if (isUrl(job.links?.official)) {
    return { label: 'Official Website', url: job.links.official, icon: 'fa-landmark' };
  }
  return { label: 'Important Links', url: '#important-links', icon: 'fa-link' };
}

function normalizeLinks(job) {
  if (Array.isArray(job.importantLinks)) return job.importantLinks;
  const legacy = [];
  if (job.links?.apply) {
    legacy.push({ label: 'Apply Online', note: 'Official application portal', url: job.links.apply, icon: 'fa-paper-plane', type: 'application' });
  }
  if (job.links?.notification) {
    legacy.push({ label: 'Download Notification', note: 'Official PDF / notice', url: job.links.notification, icon: 'fa-file-pdf', type: 'notification' });
  }
  if (job.links?.official) {
    legacy.push({ label: 'Official Website', note: 'Recruitment authority website', url: job.links.official, icon: 'fa-landmark', type: 'official' });
  }
  return legacy;
}

function buildTags(job) {
  return (job.tags || []).map((x) => `<span>${esc(x)}</span>`).join('');
}

function buildMetrics(job, currentStage) {
  const metrics =
    Array.isArray(job.metrics) && job.metrics.length
      ? job.metrics
      : [
          { label: 'Total Vacancies', value: num(job.vacancies), icon: 'fa-users' },
          { label: 'Current Stage', value: currentStage?.shortLabel || currentStage?.label || 'Recruitment', icon: iconForType(currentStage?.type) },
          { label: 'Qualification', value: job.qualificationShort || 'See eligibility', icon: 'fa-graduation-cap' },
          { label: 'Job Location', value: job.location || 'India', icon: 'fa-map-marker-alt' },
        ];
  return metrics
    .slice(0, 4)
    .map(
      (m) =>
        `<article><span class="gjd-metric-icon"><i class="fas ${esc(m.icon || 'fa-circle')}"></i></span><div><small>${esc(m.label)}</small><strong>${esc(num(m.value) ?? '—')}</strong></div></article>`
    )
    .join('');
}

function buildQuickFacts(job) {
  const facts = Array.isArray(job.quickFacts) ? job.quickFacts : [];
  if (!facts.length) return { html: '', hasData: false };
  return {
    hasData: true,
    html: facts
      .map((f) => `<article><span>${esc(f.label)}</span><strong>${esc(f.value)}</strong></article>`)
      .join(''),
  };
}

function buildOverview(job) {
  return (job.overview || [])
    .map(([a, b]) => `<div class="gjd-info-item"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`)
    .join('');
}

function buildLifecycle(job, currentStage) {
  const lifecycle = Array.isArray(job.lifecycle) ? job.lifecycle : [];
  if (!lifecycle.length) {
    const legacy = job.dates || {};
    const defs = [
      ['Notification Released', 'notification', 'notification'],
      ['Application Start', 'applicationStart', 'application'],
      ['Last Date to Apply', 'applicationEnd', 'application'],
      ['Fee Payment Last Date', 'feeEnd', 'application'],
      ['Correction Window', 'correction', 'correction'],
      ['Exam Date', 'exam', 'exam_date'],
    ];
    return defs
      .filter(([, key]) => legacy[key])
      .map(
        ([label, key, type]) =>
          `<div class="gjd-timeline-item"><div class="gjd-timeline-dot"><i class="fas ${iconForType(type)}"></i></div><div><strong>${esc(label)}</strong><small>Recruitment schedule</small></div><div class="gjd-timeline-date">${esc(fmtDateLong(legacy[key]))}</div></div>`
      )
      .join('');
  }
  return lifecycle
    .map((stage) => {
      const isCurrent = currentStage && stage.id === currentStage.id;
      const tone = stage.tone || toneFor(stage.status);
      const meta = [stage.status, stage.note].filter(Boolean).join(' • ');
      return `<div class="gjd-timeline-item ${isCurrent ? 'is-primary is-current' : ''} is-${esc(tone)}" data-stage-id="${esc(stage.id || '')}"><div class="gjd-timeline-dot"><i class="fas ${iconForType(stage.type)}"></i></div><div><strong>${esc(stage.label || stage.id || 'Stage')}</strong><small>${esc(meta || 'Recruitment lifecycle')}</small>${stage.summary ? `<p class="gjd-stage-summary">${esc(stage.summary)}</p>` : ''}</div><div class="gjd-timeline-date">${esc(stage.date ? fmtDateLong(stage.date) : stage.dateText || 'As per schedule')}</div></div>`;
    })
    .join('');
}

function buildUpdateHistory(job) {
  const updates = Array.isArray(job.updates) ? job.updates : [];
  if (!updates.length) return { html: '', hasData: false };
  return {
    hasData: true,
    html: updates
      .map(
        (u, i) =>
          `<article class="gjd-update-history-item ${i === 0 ? 'is-latest' : ''}"><time>${esc(fmtDate(u.date))}</time><div><strong>${esc(u.title || 'Recruitment Update')}</strong><p>${esc(u.text || '')}</p></div></article>`
      )
      .join(''),
  };
}

function buildVacancyRows(job) {
  return (job.vacancyRows || [])
    .map((r) => `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`)
    .join('');
}

function buildFees(job) {
  return (job.fees || [])
    .map(([a, b]) => `<div class="gjd-fee-item"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`)
    .join('');
}

function buildSelection(job) {
  return (job.selection || [])
    .map((x, i) => `<div class="gjd-selection-step"><b>${String(i + 1).padStart(2, '0')}</b><span>${esc(x)}</span></div>`)
    .join('');
}

function buildDocuments(job) {
  return (job.documents || [])
    .map((x) => `<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>${esc(x)}</span></div>`)
    .join('');
}

function buildGuidanceSteps(items) {
  return (items || []).map((x) => `<li>${esc(x)}</li>`).join('');
}

function buildLinks(job) {
  const links = normalizeLinks(job);
  return links
    .map((l, i) => {
      const disabled = !isUrl(l.url);
      const badge = l.badge || (i === 0 ? 'Latest' : '');
      const icon = l.icon || iconForType(l.type);
      return `<div class="gjd-link-row ${l.highlight ? 'is-highlight' : ''}"><div><i class="${linkIconClass(icon)}"></i><p><strong>${esc(l.label)}</strong><small>${esc(l.note || '')}</small>${badge ? `<em class="gjd-link-badge">${esc(badge)}</em>` : ''}</p></div><a href="${esc(l.url || '#')}" ${disabled ? 'class="is-disabled" aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'}>${esc(l.buttonLabel || (disabled ? 'Awaited' : 'Open Link'))}</a></div>`;
    })
    .join('');
}

function buildFaq(job) {
  return (job.faqs || [])
    .map(
      ([q, a], i) =>
        `<div class="gjd-faq-item"><button class="gjd-faq-question" type="button" aria-expanded="${i === 0 ? 'true' : 'false'}"><span>${esc(q)}</span><i class="fas fa-plus"></i></button><div class="gjd-faq-answer"><p>${esc(a)}</p></div></div>`
    )
    .join('');
}

function buildSchemas(job) {
  const lifecycle = Array.isArray(job.lifecycle) ? job.lifecycle : [];
  const canonical = job.seo?.canonical || '';
  const applicationEnd =
    job.dates?.applicationEnd ||
    lifecycle.find((x) => x.type === 'application' && x.deadline)?.deadline;
  const applicationEndDate = parseDate(applicationEnd);
  const notificationDate =
    job.dates?.notification ||
    lifecycle.find((x) => x.type === 'notification')?.date;
  const jobPostingActive =
    applicationEndDate && applicationEndDate.getTime() >= Date.now();

  let primary;
  if (jobPostingActive) {
    primary = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.summary,
      datePosted: notificationDate,
      validThrough: applicationEnd,
      employmentType: job.employmentType || 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: job.organization,
        sameAs: job.links?.official || canonical,
      },
      jobLocation: buildSchemaJobLocation(job.location),
      applicantLocationRequirements: { '@type': 'Country', name: 'India' },
      baseSalary: buildSchemaBaseSalary(job.salary),
      url: canonical,
    };
  } else {
    primary = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: job.seo?.title || job.title,
      description: job.seo?.description || job.summary,
      url: canonical,
      dateModified: job.updated,
      about: { '@type': 'Thing', name: job.title },
      publisher: {
        '@type': 'Organization',
        name: 'GovJobUpdates',
        url: 'https://govjobupdates.com/',
      },
    };
  }
  Object.keys(primary).forEach((k) => {
    if (primary[k] === undefined) delete primary[k];
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://govjobupdates.com/' },
      { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://govjobupdates.com/HTML/latest-jobs.html' },
      { '@type': 'ListItem', position: 3, name: job.shortTitle || job.title, item: canonical },
    ],
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (job.faqs || []).map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return { primary, breadcrumb, faq };
}

function syncHeadMeta(html, job) {
  if (!job.seo) return html;
  if (job.seo.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(job.seo.title)}</title>`);
    html = html.replace(/(<meta\s+property=["']og:title["']\s+content=["'])[^"']*(["'])/i, `$1${esc(job.seo.title)}$2`);
    html = html.replace(/(<meta\s+name=["']twitter:title["']\s+content=["'])[^"']*(["'])/i, `$1${esc(job.seo.title)}$2`);
  }
  if (job.seo.description) {
    html = html.replace(/(<meta\s+name=["']description["']\s+content=["'])[^"']*(["'])/i, `$1${esc(job.seo.description)}$2`);
    html = html.replace(/(<meta\s+property=["']og:description["']\s+content=["'])[^"']*(["'])/i, `$1${esc(job.seo.description)}$2`);
    html = html.replace(/(<meta\s+name=["']twitter:description["']\s+content=["'])[^"']*(["'])/i, `$1${esc(job.seo.description)}$2`);
  }
  if (job.seo.canonical) {
    html = html.replace(/(<link\s+rel=["']canonical["']\s+href=["'])[^"']*(["'])/i, `$1${esc(job.seo.canonical)}$2`);
    html = html.replace(/(<meta\s+property=["']og:url["']\s+content=["'])[^"']*(["'])/i, `$1${esc(job.seo.canonical)}$2`);
  }
  if (job.seo.robots) {
    html = html.replace(/(<meta\s+name=["']robots["']\s+content=["'])[^"']*(["'])/i, `$1${esc(job.seo.robots)}$2`);
  }
  return html;
}

function readJobData(html, file) {
  const match = html.match(
    /<script\b[^>]*\bid=["']jobData["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch (error) {
    throw new Error(`${file}: invalid #jobData JSON (${error.message})`);
  }
}

function hydratePage(original, job) {
  const currentStage = resolveCurrentStage(job);
  let html = original;

  html = syncHeadMeta(html, job);
  html = setText(html, 'jobOrganization', job.organization);
  html = setText(html, 'jobTitle', job.title);
  html = setText(html, 'breadcrumbCurrent', job.shortTitle || job.title);
  html = setText(html, 'jobSummary', job.summary);
  html = setInner(html, 'jobTags', buildTags(job));
  html = setText(html, 'latestUpdate', job.latestUpdate || currentStage?.summary || 'Recruitment page updated.');
  html = setText(html, 'updatedAt', job.updated ? `Updated ${fmtDate(job.updated)}` : 'Updated recently');
  html = setText(html, 'updatedBy', `Updated by ${job.updatedBy || 'GovJobUpdates'}`);

  const statusLabel = currentStage?.status || job.status || 'Latest update available';
  const tone = currentStage?.tone || toneFor(statusLabel);
  html = setRecruitmentStatus(html, statusLabel, tone);
  html = setText(html, 'mobileStatusLabel', currentStage?.shortLabel || currentStage?.label || 'Latest Stage');
  html = setText(html, 'mobileStageValue', statusLabel);

  const stageLabel = currentStage?.label || 'Recruitment Update';
  const stageDate = currentStage?.date || currentStage?.deadline || null;
  html = setText(html, 'stageCardLabel', 'Current Recruitment Stage');
  html = setText(html, 'stageHeadline', stageLabel);
  html = setText(html, 'stageDate', stageDate ? fmtDateLong(stageDate) : statusLabel);
  html = setText(html, 'stageStatusText', statusLabel);

  const primary = getPrimaryAction(job, currentStage);
  const secondary = getSecondaryAction(job, currentStage);
  html = setLink(html, 'heroPrimaryBtn', primary.url, primary.label, primary.icon || 'fa-arrow-right');
  html = setLink(html, 'sidePrimaryBtn', primary.url, primary.label, primary.icon || 'fa-arrow-right');
  html = setLink(html, 'mobilePrimaryBtn', primary.url, primary.label, primary.icon || 'fa-arrow-right');
  html = setLink(html, 'heroSecondaryBtn', secondary.url, secondary.label, secondary.icon || 'fa-file-alt');

  html = setInner(html, 'metricsGrid', buildMetrics(job, currentStage));
  const qf = buildQuickFacts(job);
  if (qf.hasData) {
    html = setInner(html, 'quickFacts', qf.html);
    html = setHidden(html, 'quickFacts', false);
  }

  html = setInner(html, 'overviewGrid', buildOverview(job));
  if (job.overviewNote) html = setText(html, 'overviewNote', job.overviewNote);

  html = setInner(html, 'lifecycleTimeline', buildLifecycle(job, currentStage));

  const uh = buildUpdateHistory(job);
  if (uh.hasData) {
    html = setInner(html, 'updateHistory', uh.html);
    html = setHidden(html, 'updateHistory', false);
  }

  html = setInner(html, 'vacancyTable', buildVacancyRows(job));
  if (job.vacancies !== undefined && job.vacancies !== null && job.vacancies !== '') {
    html = setText(html, 'vacancyTotal', num(job.vacancies));
  }

  html = setText(html, 'ageLimit', job.ageLimit);
  html = setText(html, 'ageRelaxation', job.ageRelaxation, 'Age relaxation as per rules.');
  html = setText(html, 'education', job.education);
  html = setText(html, 'educationNote', job.educationNote, 'Refer to the official notification.');
  html = setText(html, 'otherEligibility', job.otherEligibility);

  html = setInner(html, 'feeGrid', buildFees(job));
  html = setText(html, 'paymentMode', job.paymentMode);

  html = setInner(html, 'selectionFlow', buildSelection(job));
  html = setInner(html, 'documentsGrid', buildDocuments(job));

  const guidance = currentStage?.guidance || job.currentGuidance || job.applySteps || [];
  const guidanceHeading =
    currentStage?.guidanceTitle ||
    (currentStage?.type === 'application' ? 'How to Apply' : 'What Candidates Should Do Now');
  html = setText(html, 'guidanceHeading', guidanceHeading);
  html = setInner(html, 'guidanceSteps', buildGuidanceSteps(guidance));

  const applySteps = job.applySteps || [];
  const showArchive = currentStage?.type !== 'application' && applySteps.length > 0;
  if (showArchive) {
    html = setHidden(html, 'applicationArchive', false);
    html = setInner(html, 'applicationArchiveSteps', buildGuidanceSteps(applySteps));
  }

  html = setInner(html, 'importantLinks', buildLinks(job));
  html = setInner(html, 'faqList', buildFaq(job));

  const schemas = buildSchemas(job);
  html = setScriptJson(html, 'primarySchema', schemas.primary);
  html = setScriptJson(html, 'jobPostingSchema', schemas.primary);
  html = setScriptJson(html, 'breadcrumbSchema', schemas.breadcrumb);
  html = setScriptJson(html, 'faqSchema', schemas.faq);

  return html;
}

if (!fs.existsSync(jobsDir)) {
  console.error(`jobs/ directory not found at ${jobsDir}`);
  process.exit(1);
}

const files = fs.readdirSync(jobsDir).filter((f) => f.endsWith('.html')).sort();

let changed = 0;
let skipped = 0;
const errors = [];

for (const file of files) {
  const filePath = path.join(jobsDir, file);
  const original = fs.readFileSync(filePath, 'utf8');

  try {
    const job = readJobData(original, file);
    if (!job) {
      skipped += 1;
      continue;
    }

    const html = hydratePage(original, job);

    if (html === original) {
      skipped += 1;
      continue;
    }

    changed += 1;
    console.log(`${write ? 'Updated' : 'Would update'} jobs/${file}`);
    if (write) fs.writeFileSync(filePath, html, 'utf8');
  } catch (error) {
    errors.push(error.message || String(error));
  }
}

console.log(
  `\n${write ? 'Updated' : 'Preview'}: ${changed} changed, ${skipped} already current / skipped, ${errors.length} errors.`
);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
}