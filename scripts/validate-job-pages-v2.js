#!/usr/bin/env node
'use strict';
/*
 * validate-job-pages-v2.js  (READ-ONLY: never edits files)
 * Checks jobs/*.html pages that carry <meta name="gjd-format" content="v2">.
 *
 *   node scripts/validate-job-pages-v2.js                 # all v2 pages in jobs/
 *   node scripts/validate-job-pages-v2.js jobs/x.html     # specific file(s)
 *   node scripts/validate-job-pages-v2.js --strict        # warnings also fail
 *
 * Exit code 1 when any ERROR is found (or any WARN with --strict).
 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const strict = args.includes('--strict');
const given = args.filter((a) => !a.startsWith('--'));
const SITE = 'https://govjobupdates.com/';

const files = given.length
  ? given.map((f) => path.resolve(f))
  : fs.readdirSync(path.join(root, 'jobs')).filter((f) => f.endsWith('.html')).map((f) => path.join(root, 'jobs', f));

const un = (s) => String(s || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
const strip = (s) => un(String(s).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const norm = (s) => strip(s).toLowerCase();
const meta = (h, attr, name) => {
  for (const m of h.match(/<meta\b[^>]*>/gi) || []) {
    if (new RegExp(`\\b${attr}\\s*=\\s*["']${name}["']`, 'i').test(m)) {
      const c = m.match(/\bcontent\s*=\s*"([^"]*)"/i) || m.match(/\bcontent\s*=\s*'([^']*)'/i);
      return c ? un(c[1]) : '';
    }
  }
  return null;
};

let errors = 0, warns = 0, checked = 0;

for (const file of files) {
  if (!fs.existsSync(file)) { console.log(`MISSING ${file}`); errors++; continue; }
  const h = fs.readFileSync(file, 'utf8');
  if (meta(h, 'name', 'gjd-format') !== 'v2') continue;
  checked++;
  const rel = path.relative(root, file).split(path.sep).join('/');
  const E = [], W = [];
  const err = (m) => E.push(m), warn = (m) => W.push(m);

  // ---- head ----
  const title = un((h.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
  const desc = meta(h, 'name', 'description');
  const canonical = (h.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1];
  if (!title) err('missing <title>'); else if (title.length > 65) err(`title ${title.length} chars (max 65, ideal 50-60)`); else if (title.length > 60) warn(`title ${title.length} chars (ideal <= 60)`);
  if (/\|\s*GovJobUpdates\s*$/.test(title) && title.length > 60) warn('brand suffix pushes title past 60');
  if (!desc) err('missing meta description'); else if (desc.length > 160 || desc.length < 120) err(`meta description ${desc.length} chars (need 120-160, ideal 150-160)`); else if (desc.length < 150) warn(`meta description ${desc.length} chars (ideal 150-160)`);
  if (!canonical) err('missing canonical');
  else {
    if (!canonical.startsWith(SITE + 'jobs/')) err(`canonical not under ${SITE}jobs/`);
    if (path.basename(path.dirname(file)) === 'jobs' && path.basename(canonical) !== path.basename(file)) err(`canonical filename ${path.basename(canonical)} != file ${path.basename(file)}`);
  }
  const ogt = meta(h, 'property', 'og:title'), ogd = meta(h, 'property', 'og:description'), ogu = meta(h, 'property', 'og:url'), ogi = meta(h, 'property', 'og:image');
  const twt = meta(h, 'name', 'twitter:title'), twd = meta(h, 'name', 'twitter:description');
  if (!ogt) err('missing og:title'); else if (ogt.length > 65) err(`og:title ${ogt.length} chars (max 65)`);
  if (!ogd) err('missing og:description'); else if (ogd.length > 160) err(`og:description ${ogd.length} chars (max 160)`); else if (ogd.length < 60) warn(`og:description ${ogd.length} chars (too short)`);
  if (ogu !== canonical) err('og:url must equal canonical');
  if (!ogi) err('missing og:image');
  if (!twt) err('missing twitter:title');
  if (!twd) err('missing twitter:description'); else if (twd.length > 200) err(`twitter:description ${twd.length} chars (max 200)`);
  if (meta(h, 'name', 'robots') === null) err('missing meta robots');

  // ---- placeholders / leftovers ----
  if (/\[\[[^\]]+\]\]/.test(h)) err('unfilled [[PLACEHOLDER]] found');
  if (/<!--\s*AI\b/i.test(h)) err('AI instruction comment left in HTML');
  if (/\bTODO\b|lorem ipsum/i.test(h)) err('TODO / lorem ipsum left in HTML');
  if (/id=["']jobData["']/.test(h)) err('v2 pages must not use id="jobData" (hydrate script would overwrite them); use id="gjdData"');
  if (/job-detail-lifecycle\.js/.test(h)) err('v2 pages must load job-page-v2.js, not job-detail-lifecycle.js');
  if (!/job-page-v2\.css/.test(h) || !/job-page-v2\.js/.test(h)) err('job-page-v2.css / job-page-v2.js not linked');
  if (/Checking latest stage|Checking status|Latest Action<\/span>/.test(h)) err('placeholder loading text left in HTML');
  if (/href=["']#["']/.test(h)) err('href="#" dead link found');
  for (const m of h.matchAll(/<img\b[^>]*>/gi)) if (!/\balt\s*=/.test(m[0])) { err('<img> without alt'); break; }

  // ---- headings ----
  const h1s = h.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1s.length !== 1) err(`need exactly one H1, found ${h1s.length}`); else { const l = strip(h1s[0]).length; if (l > 70) warn(`H1 ${l} chars (max 70)`); }
  for (const m of h.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)) { const l = strip(m[1]).length; if (l > 80) warn(`H2 over 80 chars: "${strip(m[1]).slice(0, 40)}..."`); }
  for (const id of ['about', 'overview', 'important-dates', 'vacancy-details', 'eligibility', 'important-links', 'faq', 'related-jobs']) {
    if (!new RegExp(`id=["']${id}["']`).test(h)) err(`missing section id="${id}"`);
  }
  if (!/class=["'][^"']*gjv2-answer/.test(h)) err('missing .gjv2-answer Quick Answer block');
  if ((h.match(/<table\b/gi) || []).length < 3) warn('fewer than 3 <table> blocks (dates, overview, vacancy/fee expected)');

  // ---- JSON-LD ----
  const ld = [...h.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  let nodes = [];
  if (!ld.length) err('no JSON-LD found');
  for (const m of ld) {
    try { const j = JSON.parse(m[1]); nodes = nodes.concat(j['@graph'] || [j]); } catch (x) { err(`JSON-LD parse error: ${x.message}`); }
  }
  const T = (t) => nodes.filter((n) => [].concat(n['@type']).includes(t));
  for (const t of ['Organization', 'WebSite', 'WebPage', 'Article', 'BreadcrumbList', 'FAQPage']) if (!T(t).length) err(`JSON-LD missing ${t}`);
  if (T('WebPage').length > 1) err('duplicate WebPage node');
  const art = T('Article')[0];
  if (art) {
    for (const k of ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'image']) if (!art[k]) err(`Article missing ${k}`);
    if (art.headline && art.headline.length > 110) err('Article headline over 110 chars');
    for (const k of ['datePublished', 'dateModified']) if (art[k] && isNaN(Date.parse(art[k]))) err(`Article ${k} is not a valid date`);
    if (art.datePublished && art.dateModified && Date.parse(art.dateModified) < Date.parse(art.datePublished)) err('dateModified earlier than datePublished');
  }
  const wp = T('WebPage')[0];
  if (wp && !wp.speakable) warn('WebPage missing speakable');
  if (wp && canonical && wp.url !== canonical) err('WebPage.url != canonical');

  const jp = T('JobPosting');
  if (jp.length) {
    const j = jp[0];
    for (const k of ['title', 'description', 'datePosted', 'validThrough', 'hiringOrganization', 'jobLocation']) if (!j[k]) err(`JobPosting missing ${k}`);
    if (j.validThrough && Date.parse(j.validThrough) < Date.now()) err(`JobPosting validThrough ${j.validThrough} has passed: remove the JobPosting node (application window closed)`);
    if (!j.baseSalary) warn('JobPosting has no baseSalary');
  }

  // Breadcrumb vs visible
  const bc = T('BreadcrumbList')[0];
  if (bc && (bc.itemListElement || []).length < 3) err('BreadcrumbList needs at least 3 items');

  // ---- FAQ: schema must equal visible ----
  const vis = [...h.matchAll(/<details\b[^>]*class=["'][^"']*gjv2-faq[^"']*["'][^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<div[^>]*>([\s\S]*?)<\/div>\s*<\/details>/gi)]
    .map((m) => [strip(m[1]), strip(m[2])]);
  const sch = ((T('FAQPage')[0] || {}).mainEntity || []).map((q) => [String(q.name || '').trim(), String((q.acceptedAnswer || {}).text || '').trim()]);
  if (vis.length < 8 || vis.length > 15) err(`FAQ count ${vis.length} (need 8-15)`);
  if (vis.length !== sch.length) err(`visible FAQs (${vis.length}) != FAQPage schema (${sch.length})`);
  else vis.forEach((v, i) => { if (norm(v[0]) !== norm(sch[i][0]) || norm(v[1]) !== norm(sch[i][1])) err(`FAQ #${i + 1} text differs between page and schema`); });
  vis.forEach((v, i) => {
    if (v[0].length < 30 || v[0].length > 90) warn(`FAQ #${i + 1} question ${v[0].length} chars (aim 40-80)`);
    if (v[1].length < 120 || v[1].length > 320) warn(`FAQ #${i + 1} answer ${v[1].length} chars (aim 150-300)`);
  });

  // ---- gjdData consistency ----
  const gd = h.match(/<script[^>]*id=["']gjdData["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!gd) err('missing <script id="gjdData"> (app/data block)');
  else {
    try {
      const d = JSON.parse(gd[1]);
      for (const k of ['slug', 'title', 'organization', 'status', 'currentStage', 'updated', 'published', 'vacancies', 'lifecycle', 'importantLinks']) if (d[k] === undefined) err(`gjdData missing ${k}`);
      if (canonical && d.slug && path.basename(canonical, '.html') !== d.slug) err('gjdData.slug != canonical slug');
      if (art && d.updated && art.dateModified && d.updated !== art.dateModified) err('gjdData.updated != Article.dateModified');
      if (d.vacancies !== undefined && d.vacancies !== '' && !h.replace(/<script[\s\S]*?<\/script>/gi, '').includes(String(d.vacancies))) err(`vacancies ${d.vacancies} not visible on page`);
      if (d.lifecycle && !d.lifecycle.some((s) => s.id === d.currentStage)) err('gjdData.currentStage not found in lifecycle');
    } catch (x) { err(`gjdData parse error: ${x.message}`); }
  }

  // ---- dates ----
  for (const m of h.matchAll(/<time\b[^>]*datetime=["']([^"']+)["']/gi)) if (isNaN(Date.parse(m[1]))) { err(`invalid <time datetime="${m[1]}">`); break; }

  // ---- links ----
  const bodyOnly = h.replace(/<script[\s\S]*?<\/script>/gi, '');
  for (const m of bodyOnly.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) continue;
    const target = path.resolve(path.dirname(file), href.split('#')[0].split('?')[0]);
    if (href.split('#')[0] && !fs.existsSync(target)) { err(`broken internal link: ${href}`); }
  }
  for (const m of bodyOnly.matchAll(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi)) {
    if (!/rel=["'][^"']*noopener/.test(m[0]) && !m[1].startsWith(SITE)) { warn('external link without rel="noopener"'); break; }
    if (/sarkariresult|sarkari-result|freejobalert/i.test(m[1])) err(`third-party job-portal link (use official source): ${m[1].slice(0, 60)}`);
  }
  const related = (bodyOnly.match(/class=["']gjv2-related["'][\s\S]*?<\/ul>/i) || [''])[0];
  if ((related.match(/<a\b/gi) || []).length < 3) warn('fewer than 3 static related-job links');

  // ---- words / stale ----
  const words = strip(bodyOnly).split(' ').length;
  if (words < 800) warn(`only ${words} visible words (aim 800-1500+)`);
  const closed = !jp.length;
  if (closed && /apply online now|last date to apply is (today|tomorrow)|applications? (are|is) open/i.test(strip(bodyOnly))) warn('present-tense "apply now" wording but no JobPosting (stale CTA?)');

  const status = E.length ? 'FAIL' : W.length ? 'WARN' : 'OK  ';
  console.log(`${status} ${rel}`);
  E.forEach((m) => console.log(`   ERROR ${m}`));
  W.forEach((m) => console.log(`   warn  ${m}`));
  errors += E.length; warns += W.length;
}
console.log(`\nChecked ${checked} v2 page(s): ${errors} error(s), ${warns} warning(s).` + (checked === 0 ? ' (no pages with gjd-format=v2 found)' : ''));
process.exit(errors || (strict && warns) ? 1 : 0);
