#!/usr/bin/env node
'use strict';

/*
 * Student Hub static internal links
 *
 * Why: the hub page (HTML/student-hub.html) renders its article list with JavaScript, and most
 * articles had no static link to any other page. Google therefore saw almost no links to the
 * 79 articles ("Discovered - currently not indexed"). This script writes real <a> links into
 * the HTML so they exist before any JavaScript runs.
 *
 * What it writes (all between marker comments, so it is safe to re-run):
 *   1. HTML/student-hub.html
 *        - the first 18 article cards inside #blogGrid (identical to what JS renders)
 *        - "Showing 18 of N articles" in #blogResultCount
 *        - a plain "All Student Hub articles" index, grouped by category (indexable articles only)
 *   2. HTML/student-hub/*.html
 *        - the "Recommended Reading" section (#articleRelated) with 3 topical article cards
 *        - a small "Related recruitment pages & tools" list (matching /jobs/ pages, rank predictor)
 *
 * Source of truth: JS/blog-data.js (articles), jobs pages' jobData (jobs) and the rank-predictor folders.
 * Output depends only on static data (never on "today"), so repeated runs do not churn files.
 *
 *   node scripts/hydrate-student-hub.js            # dry run (prints what would change)
 *   node scripts/hydrate-student-hub.js --write    # write files
 *   node scripts/hydrate-student-hub.js --report   # also print the chosen links for review
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');
const REPORT = process.argv.includes('--report');

const HUB_FILE = path.join(root, 'HTML', 'student-hub.html');
const ARTICLES_DIR = path.join(root, 'HTML', 'student-hub');
const JOBS_DIR = path.join(root, 'jobs');
const RANK_DIR = path.join(root, 'rank-predictor');

const PAGE_SIZE = 18;            // must match PAGE_SIZE in JS/blog.js
const RELATED_COUNT = 3;         // cards in the existing 3-column grid
const MIN_INLINKS = 3;           // every indexable article should get at least this many article links
const MAX_INLINKS = 7;           // spread links instead of piling them on a few articles
const MAX_JOB_LINKS = 2;
const MAX_TOOL_LINKS = 1;

// These rank-predictor pages are answered with 410 by the Cloudflare Worker. Never link to them.
const EXCLUDED_TOOL_SLUGS = new Set(['ssc-cpo', 'up-police', 'up-home-guard']);

/* ---------------- helpers ---------------- */

const readFile = (file) => fs.readFileSync(file, 'utf8');

const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

// Same output as formatDate() in JS/blog.js
const formatDate = (dateValue) => {
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

const isNoindex = (html) => {
  const m = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  return !!(m && /noindex/i.test(m[1]));
};

function loadBlogs() {
  const sandbox = { window: {}, document: {}, console };
  vm.runInNewContext(readFile(path.join(root, 'JS', 'blog-data.js')), sandbox);
  const blogs = sandbox.window.GOVJOB_BLOGS;
  if (!Array.isArray(blogs) || !blogs.length) throw new Error('JS/blog-data.js did not define GOVJOB_BLOGS');
  return blogs;
}

function replaceBetween(html, start, end, block) {
  const from = html.indexOf(start);
  const to = html.indexOf(end);
  if (from === -1 || to === -1 || to < from) return null;
  return html.slice(0, from) + start + block + end + html.slice(to + end.length);
}

/* ---------------- tokens / similarity ---------------- */

const STOP = new Set(('the and for with from what how why who when which your you are this that will can not out new now all '
  + 'explained explain guide complete download pdf year wise full latest best top tips vs versus 2025 2026 2027 '
  + 'india indian government govt job jobs recruitment online free exam exams notification apply form '
  + 'aspirants students student candidates preparation prepare check list more most very into than then also '
  + 'details update updates news issue case row report review analysis impact effect effects reason reasons '
  + 'question questions paper papers previous number ssc_ post posts vacancy vacancies level officer staff '
  + 'sarkari naukri hindi english state central board commission service services public limited ltd').split(/\s+/));

// Words that are common across many topics: they count for much less when judging similarity.
const WEAK = new Set(('syllabus pattern strategy results result answer current affairs controversy analysis plan '
  + 'preparation schedule date dates admit card important point points update daily weekly monthly').split(/\s+/));

function tokenize(text) {
  const out = new Set();
  for (const word of String(text || '').toLowerCase().split(/[^a-z0-9]+/)) {
    if (word.length < 3 || /^\d+$/.test(word) || STOP.has(word)) continue;
    out.add(word);
  }
  return out;
}

function buildIdf(tokenSets) {
  const df = new Map();
  for (const set of tokenSets) for (const t of set) df.set(t, (df.get(t) || 0) + 1);
  const n = tokenSets.length;
  return { df, idf: (t) => Math.log((n + 1) / ((df.get(t) || 0) + 1)) + 0.1 };
}

/* ---------------- data collection ---------------- */

function collectArticles(blogs) {
  const items = [];
  for (const blog of blogs) {
    if (!blog.url) continue;
    const file = path.join(root, 'HTML', blog.url);
    if (!fs.existsSync(file)) continue;
    const html = readFile(file);
    const slug = path.basename(blog.url, '.html');
    items.push({
      blog,
      file,
      slug,
      noindex: isNoindex(html),
      tokens: tokenize(`${slug.replace(/-/g, ' ')} ${blog.title}`),
      excerptTokens: tokenize(blog.excerpt)
    });
  }
  return items;
}

function collectJobs() {
  const items = [];
  if (!fs.existsSync(JOBS_DIR)) return items;
  for (const f of fs.readdirSync(JOBS_DIR).filter((x) => x.endsWith('.html')).sort()) {
    const html = readFile(path.join(JOBS_DIR, f));
    if (isNoindex(html)) continue;
    const m = html.match(/<script[^>]*id="jobData"[^>]*>([\s\S]*?)<\/script>/);
    if (!m) continue;
    let job;
    try { job = JSON.parse(m[1]); } catch (e) { continue; }
    const slug = f.replace(/\.html$/, '');
    items.push({
      file: f,
      slug,
      label: String(job.shortTitle || job.title || slug).trim(),
      status: String(job.status || '').trim(),
      updated: String(job.updated || '').slice(0, 10),
      key: keyTokens(slug.replace(/-/g, ' ')),
      tokens: tokenize(`${slug.replace(/-/g, ' ')} ${job.shortTitle || ''} ${job.organization || ''}`)
    });
  }
  return items;
}

function collectTools() {
  const items = [];
  if (!fs.existsSync(RANK_DIR)) return items;
  for (const d of fs.readdirSync(RANK_DIR).sort()) {
    const file = path.join(RANK_DIR, d, 'index.html');
    if (!fs.existsSync(file) || EXCLUDED_TOOL_SLUGS.has(d)) continue;
    const html = readFile(file);
    if (isNoindex(html)) continue;
    const title = ((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || d).replace(/\s+/g, ' ').trim();
    items.push({
      slug: d,
      label: title.split('|')[0].trim(),
      tokens: tokenize(`${d.replace(/-/g, ' ')} ${title}`)
    });
  }
  return items;
}

/* ---------------- related article assignment ---------------- */

function assignRelated(articles) {
  const { idf: rawIdf } = buildIdf(articles.map((a) => new Set([...a.tokens, ...a.excerptTokens])));
  const idf = (t) => rawIdf(t) * (WEAK.has(t) ? 0.3 : 1);
  const sim = (a, b) => {
    let s = 0;
    for (const t of a.tokens) if (b.tokens.has(t)) s += idf(t) * 1.0;
    for (const t of a.excerptTokens) if (b.excerptTokens.has(t) || b.tokens.has(t)) s += idf(t) * 0.25;
    if (a.blog.category === b.blog.category) s += 1.5;
    return s;
  };

  const targets = articles.filter((a) => !a.noindex);
  const cmp = (x, y) => y.score - x.score || String(y.t.blog.date).localeCompare(String(x.t.blog.date)) || x.t.slug.localeCompare(y.t.slug);

  const ranked = new Map();
  for (const a of articles) {
    ranked.set(a.slug, targets.filter((t) => t.slug !== a.slug).map((t) => ({ t, score: sim(a, t) })).sort(cmp));
  }

  const chosen = new Map(articles.map((a) => [a.slug, []]));
  const inlinks = new Map(targets.map((t) => [t.slug, 0]));

  // Pass 1: strongest pairs first, respecting the per-article in-link cap.
  const pairs = [];
  for (const a of articles) for (const r of ranked.get(a.slug)) pairs.push({ a, t: r.t, score: r.score });
  pairs.sort((x, y) => y.score - x.score || x.a.slug.localeCompare(y.a.slug) || x.t.slug.localeCompare(y.t.slug));
  for (const { a, t } of pairs) {
    const list = chosen.get(a.slug);
    if (list.length >= RELATED_COUNT) continue;
    if (inlinks.get(t.slug) >= MAX_INLINKS) continue;
    if (list.includes(t.slug)) continue;
    list.push(t.slug);
    inlinks.set(t.slug, inlinks.get(t.slug) + 1);
  }

  // Pass 2: sources still short of 3 take the best remaining targets (ignoring the cap).
  for (const a of articles) {
    const list = chosen.get(a.slug);
    for (const { t } of ranked.get(a.slug)) {
      if (list.length >= RELATED_COUNT) break;
      if (list.includes(t.slug)) continue;
      list.push(t.slug);
      inlinks.set(t.slug, inlinks.get(t.slug) + 1);
    }
  }

  // Pass 3: rescue under-linked articles by swapping out a link to a well-linked article,
  // but only where the new pair is at least loosely related (shares a topic word or category).
  const needy = targets.filter((t) => inlinks.get(t.slug) < MIN_INLINKS)
    .sort((x, y) => inlinks.get(x.slug) - inlinks.get(y.slug) || x.slug.localeCompare(y.slug));
  for (const t of needy) {
    const candidates = articles.filter((a) => a.slug !== t.slug && !chosen.get(a.slug).includes(t.slug))
      .map((a) => ({ a, score: sim(a, t) }))
      .filter((x) => x.score >= 0.5)
      .sort((x, y) => y.score - x.score || x.a.slug.localeCompare(y.a.slug));
    for (const { a } of candidates) {
      if (inlinks.get(t.slug) >= MIN_INLINKS) break;
      const list = chosen.get(a.slug);
      // replace the weakest-scoring pick that points at an article with spare in-links
      let worstIdx = -1; let worstScore = Infinity;
      list.forEach((slug, idx) => {
        const u = targets.find((x) => x.slug === slug);
        if (!u || inlinks.get(slug) <= MIN_INLINKS) return;
        const sc = sim(a, u);
        if (sc < worstScore) { worstScore = sc; worstIdx = idx; }
      });
      if (worstIdx === -1) continue;
      const removed = list[worstIdx];
      list[worstIdx] = t.slug;
      inlinks.set(removed, inlinks.get(removed) - 1);
      inlinks.set(t.slug, inlinks.get(t.slug) + 1);
    }
  }
  return { chosen, inlinks };
}

/* ---------------- job / tool matching ---------------- */

// Words that never identify an exam; dropped when building job "key words" from a slug.
const KEY_STOP = new Set(('online form forms recruitment apply vacancy vacancies notification exam exams various post posts advt '
  + 'new for the and of in jobs job result results admit card answer key syllabus date notice '
  + 'selection level general staff service services department phase pattern strategy guide '
  + 'jan feb mar apr may jun jul aug sep sept oct nov dec january february march april june july august september october november december').split(/\s+/));

function keyTokens(text) {
  const out = [];
  for (const w of String(text || '').toLowerCase().split(/[^a-z0-9]+/)) {
    if (w.length < 2 || /^\d+$/.test(w) || KEY_STOP.has(w) || out.includes(w)) continue;
    out.push(w);
  }
  return out;
}

// A job page matches an article only when the exam's own words (taken from the job's URL slug)
// appear in the article's slug/title. Example: "ssc-cgl-2026" needs both "ssc" and "cgl".
const WEAK_ORG = new Set(['railway', 'indian', 'central', 'state', 'bank', 'national', 'all', 'jharkhand', 'bihar', 'rajasthan', 'delhi', 'haryana', 'punjab', 'uttarakhand']);

function matchResources(article, jobs, keyStats, tools) {
  const idf = (t) => Math.log((keyStats.n + 1) / ((keyStats.df.get(t) || 0) + 1)) + 0.1;
  const aKeys = new Set(keyTokens(`${article.slug.replace(/-/g, ' ')} ${article.blog.title}`));

  const scored = [];
  for (const job of jobs) {
    if (!job.key.length) continue;
    const matched = job.key.filter((t) => aKeys.has(t));
    if (!matched.length) continue;
    // the rarest word of the job's slug must be present (e.g. "cgl", "ibps", "neet")
    const rarest = job.key.slice().sort((a, b) => (keyStats.df.get(a) || 0) - (keyStats.df.get(b) || 0) || a.localeCompare(b))[0];
    if (!aKeys.has(rarest)) continue;
    // issuing body (first word of the slug, shared with 2+ job pages): must appear in the article too
    const first = job.key[0];
    if (!WEAK_ORG.has(first) && (keyStats.firstDf.get(first) || 0) >= 2 && !aKeys.has(first)) continue;
    const coverage = matched.length / job.key.length;
    const ok = job.key.length === 1 ? (keyStats.df.get(job.key[0]) || 0) <= 2 : (matched.length >= 2 && coverage >= 0.6);
    if (!ok) continue;
    scored.push({ job, coverage, matched, score: matched.reduce((sum, t) => sum + idf(t), 0) });
  }
  scored.sort((x, y) => y.coverage - x.coverage || y.matched.length - x.matched.length || y.score - x.score
    || y.job.updated.localeCompare(x.job.updated) || x.job.slug.localeCompare(y.job.slug));
  const jobPicks = scored.slice(0, MAX_JOB_LINKS).map((x) => ({ job: x.job, score: x.score, shared: x.matched }));

  const rankish = /rank|predict/i.test(`${article.blog.category} ${article.slug}`);
  let toolPicks = [];
  if (rankish) {
    toolPicks = tools
      .map((tool) => ({ tool, shared: [...aKeys].filter((t) => tool.tokens.has(t) && !['rank', 'predictor', 'prediction', 'cbt'].includes(t)) }))
      .filter((x) => x.shared.length >= 2)
      .sort((x, y) => y.shared.length - x.shared.length || x.tool.slug.localeCompare(y.tool.slug))
      .slice(0, MAX_TOOL_LINKS);
  }
  return { jobPicks, toolPicks };
}

/* ---------------- markup builders ---------------- */

// Mirrors createBlogCard() in JS/blog.js so the static cards are identical to the rendered ones.
function hubCard(blog, index) {
  const featured = index === 0 ? ' blog-card-featured' : '';
  return `<article class="blog-card${featured}">
      <div class="blog-card-thumb">
        <img src="${escapeHtml(blog.image)}" alt="${escapeHtml(blog.title)}" loading="lazy" decoding="async">
        <span class="blog-card-category">${escapeHtml(blog.category)}</span>
      </div>
      <div class="blog-card-body">
        <span class="blog-card-date">${escapeHtml(formatDate(blog.date))}</span>
        <h3>${escapeHtml(blog.title)}</h3>
        <p>${escapeHtml(blog.excerpt)}</p>
        <a class="btn btn-outline" href="${escapeHtml(blog.url)}">Read More</a>
      </div>
    </article>`;
}

const PREFERRED_CATEGORIES = ['SSC', 'State Exams', 'Current Affairs', 'Career Guidance', 'Education News', 'Technology', 'Rank Predictor', 'Student Safety'];

function hubIndex(articles) {
  const indexable = articles.filter((a) => !a.noindex);
  const cats = Array.from(new Set(indexable.map((a) => a.blog.category).filter(Boolean)));
  const ordered = PREFERRED_CATEGORIES.filter((c) => cats.includes(c))
    .concat(cats.filter((c) => !PREFERRED_CATEGORIES.includes(c)).sort());
  const groups = ordered.map((cat) => {
    const list = indexable.filter((a) => a.blog.category === cat)
      .sort((x, y) => String(y.blog.date).localeCompare(String(x.blog.date)) || x.slug.localeCompare(y.slug));
    return `<div class="student-hub-index-group">
<h3>${escapeHtml(cat)}</h3>
<ul>
${list.map((a) => `<li><a href="${escapeHtml(a.blog.url)}">${escapeHtml(a.blog.title)}</a></li>`).join('\n')}
</ul>
</div>`;
  });
  return `
<h2 id="studentHubIndexTitle">All Student Hub Articles</h2>
<p>Browse every GovJobUpdates Student Hub article by topic: exam preparation, career guidance, current affairs and student services.</p>
<div class="student-hub-index-grid">
${groups.join('\n')}
</div>
`;
}

// Mirrors the card produced by JS/article-modern.js (paths resolved for HTML/student-hub/ pages).
function articleImagePath(value) {
  const v = String(value || '').trim();
  if (!v) return '';
  if (/^https?:\/\//i.test(v) || v.startsWith('data:') || v.startsWith('/')) return v;
  if (v.startsWith('../Assets/')) return v.replace(/^\.\.\//, '../../');
  if (v.startsWith('./Assets/')) return v.replace(/^\.\//, '../');
  if (v.startsWith('Assets/')) return `../../${v}`;
  return v;
}

function relatedCard(blog) {
  const href = String(blog.url).replace(/^student-hub\//, '');
  return `<a class="article-related-card" href="${escapeHtml(href)}">
<div class="article-related-thumb">
<img src="${escapeHtml(articleImagePath(blog.image))}" alt="${escapeHtml(blog.title)}" loading="lazy" decoding="async">
</div>
<div class="article-related-body">
<span>${escapeHtml(blog.category)}</span>
<h3>${escapeHtml(blog.title)}</h3>
</div>
</a>`;
}

function articleBlock(relatedBlogs, jobPicks, toolPicks) {
  const cards = relatedBlogs.map(relatedCard).join('\n');
  let html = `
<section class="article-related" id="articleRelated" aria-label="Related articles">
<h2>Recommended Reading</h2>
<div class="article-related-grid" id="articleRelatedGrid" data-static="true">
${cards}
</div>
</section>`;
  if (jobPicks.length || toolPicks.length) {
    const items = [];
    for (const { job } of jobPicks) {
      const meta = job.status ? ` <span>${escapeHtml(job.status)}</span>` : '';
      items.push(`<li><a href="../../jobs/${encodeURI(job.file)}">${escapeHtml(job.label)}</a>${meta}</li>`);
    }
    for (const { tool } of toolPicks) {
      items.push(`<li><a href="../../rank-predictor/${encodeURI(tool.slug)}/">${escapeHtml(tool.label)}</a> <span>Free tool</span></li>`);
    }
    html += `
<section class="article-resource-links" aria-label="Related recruitment pages and tools">
<h2>Related Recruitment Pages &amp; Tools</h2>
<ul>
${items.join('\n')}
</ul>
</section>`;
  }
  return `${html}\n`;
}

/* ---------------- page writers ---------------- */

const HUB_GRID_START = '<!--hub-static:start-->';
const HUB_GRID_END = '<!--hub-static:end-->';
const HUB_INDEX_START = '<!--hub-index:start-->';
const HUB_INDEX_END = '<!--hub-index:end-->';
const ART_START = '<!--student-hub-links:start-->';
const ART_END = '<!--student-hub-links:end-->';

function hydrateHub(original, articles, blogs) {
  let html = original;

  // 1. cards inside #blogGrid
  const cards = blogs.slice(0, PAGE_SIZE).map(hubCard).join('\n');
  const swapped = replaceBetween(html, HUB_GRID_START, HUB_GRID_END, `\n${cards}\n`);
  if (swapped !== null) {
    html = swapped;
  } else {
    const rx = /(<div class="blog-grid" id="blogGrid">)(\s*)(<\/div>)/;
    if (!rx.test(html)) throw new Error('#blogGrid not found in HTML/student-hub.html');
    html = html.replace(rx, (m, open, ws, close) => `${open}${HUB_GRID_START}\n${cards}\n${HUB_GRID_END}${close}`);
  }

  // 2. result count text (matches what JS prints on first render)
  const total = blogs.length;
  html = html.replace(/(<p id="blogResultCount">)[^<]*(<\/p>)/, `$1Showing ${Math.min(PAGE_SIZE, total)} of ${total} articles$2`);

  // 3. crawlable article index, placed just before </main>
  const indexBlock = hubIndex(articles);
  const swapped2 = replaceBetween(html, HUB_INDEX_START, HUB_INDEX_END, indexBlock);
  if (swapped2 !== null) {
    html = swapped2;
  } else {
    if (!/<\/main>/.test(html)) throw new Error('</main> not found in HTML/student-hub.html');
    const section = `<section class="page-guide student-hub-index" aria-labelledby="studentHubIndexTitle">${HUB_INDEX_START}${indexBlock}${HUB_INDEX_END}</section>`;
    html = html.replace(/<\/main>/, `${section}</main>`);
  }
  return html;
}

function hydrateArticle(original, block) {
  let html = original;
  const swapped = replaceBetween(html, ART_START, ART_END, block);
  if (swapped !== null) return swapped;

  const wrapped = `${ART_START}${block}${ART_END}`;
  // a) article already has a Recommended Reading section: replace it
  const existing = /<section class="article-related"[^>]*id="articleRelated"[^>]*>[\s\S]*?<\/section>/;
  if (existing.test(html)) return html.replace(existing, () => wrapped);
  // b) insert right before the engagement section (attribute order differs between pages)
  const anchorRx = /<section\b[^>]*\bclass="article-interactions"/;
  const anchorMatch = html.match(anchorRx);
  if (anchorMatch) return html.replace(anchorRx, (m) => `${wrapped}\n${m}`);
  // c) fall back to just before </main>
  if (html.includes('</main>')) return html.replace('</main>', () => `${wrapped}\n</main>`);
  throw new Error('no safe insertion point');
}

/* ---------------- main ---------------- */

function main() {
  const blogs = loadBlogs();
  const articles = collectArticles(blogs);
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const jobs = collectJobs();
  const keyStats = { n: jobs.length, df: new Map() };
  keyStats.firstDf = new Map();
  for (const j of jobs) {
    for (const t of j.key) keyStats.df.set(t, (keyStats.df.get(t) || 0) + 1);
    if (j.key[0]) keyStats.firstDf.set(j.key[0], (keyStats.firstDf.get(j.key[0]) || 0) + 1);
  }
  const tools = collectTools();
  const { chosen, inlinks } = assignRelated(articles);

  let changed = 0; let unchanged = 0; let errors = 0;
  const write = (file, next, original) => {
    if (next === original) { unchanged += 1; return; }
    changed += 1;
    console.log(`${WRITE ? 'Updated' : 'Would update'} ${path.relative(root, file).replace(/\\/g, '/')}`);
    if (WRITE) fs.writeFileSync(file, next, 'utf8');
  };

  try {
    const original = readFile(HUB_FILE);
    write(HUB_FILE, hydrateHub(original, articles, blogs), original);
  } catch (e) { errors += 1; console.error(`ERROR hub: ${e.message}`); }

  const report = [];
  for (const a of articles) {
    try {
      const related = chosen.get(a.slug).map((slug) => bySlug.get(slug).blog);
      const { jobPicks, toolPicks } = matchResources(a, jobs, keyStats, tools);
      const original = readFile(a.file);
      write(a.file, hydrateArticle(original, articleBlock(related, jobPicks, toolPicks)), original);
      if (REPORT) {
        report.push(`${a.slug}\n   related: ${chosen.get(a.slug).join(' | ')}\n   jobs: ${jobPicks.map((x) => `${x.job.slug} (${x.score.toFixed(1)}; ${x.shared.join('+')})`).join(' | ') || '-'}\n   tools: ${toolPicks.map((x) => x.tool.slug).join(' | ') || '-'}`);
      }
    } catch (e) { errors += 1; console.error(`ERROR ${a.slug}: ${e.message}`); }
  }

  if (REPORT) console.log(`\n${report.join('\n')}`);
  const counts = [...inlinks.values()].sort((x, y) => x - y);
  if (REPORT) console.log('\nArticles with <3 article inlinks: ' + [...inlinks.entries()].filter(([, c]) => c < MIN_INLINKS).map(([k, c]) => `${k}(${c})`).join(', '));
  console.log(`\nIndexable articles: ${counts.length} | article-to-article inlinks min ${counts[0]} / median ${counts[Math.floor(counts.length / 2)]} / max ${counts[counts.length - 1]}`);
  console.log(`${WRITE ? 'Updated' : 'Preview'}: ${changed} changed, ${unchanged} already current, ${errors} errors.`);
  if (errors) process.exitCode = 1;
}

main();
