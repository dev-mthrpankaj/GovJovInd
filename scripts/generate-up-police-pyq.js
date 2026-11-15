"use strict";
/*
 * Generates the UP Police previous-year-papers collection (hub + exam pages)
 * from data/up-police-pyq.json.
 *
 *   npm run generate:up-police-pyq
 *
 * To add a paper: add one object to "papers" in data/up-police-pyq.json and
 * run the command above. See docs/UP_POLICE_PYQ.md.
 *
 * Site chrome (header, footer, scripts, share bars, comments) is copied from
 * HTML/student-hub/upsssc-previous-year-question-papers.html so these pages
 * always match the rest of the Student Hub.
 */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "data", "up-police-pyq.json");
const shellSourcePath = path.join(root, "HTML", "student-hub", "upsssc-previous-year-question-papers.html");

const HINDI = {
  constable: "कांस्टेबल",
  si: "सब इंस्पेक्टर (एसआई)",
  asi: "एएसआई (क्लर्क व अकाउंट्स)",
  "home-guard": "होमगार्ड",
  other: "फायरमैन व अन्य परीक्षाओं"
};

function fail(message) { console.error("ERROR: " + message); process.exit(1); }
function esc(value) {
  return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function jsonLd(obj) { return "  <script type=\"application/ld+json\">\n" + JSON.stringify(obj, null, 2).replace(/</g, "\\u003c") + "\n  </script>"; }
function formatDate(iso) { const [y, m, d] = iso.split("-"); return `${d}-${m}-${y}`; }
function longDate(iso) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`;
}
function plural(n, word) { return `${n} ${word}${n === 1 ? "" : "s"}`; }

/* ---------- load and validate data ---------- */
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const S = data.settings;
const exams = data.exams;
const examBySlug = new Map(exams.map(e => [e.slug, e]));
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

for (const e of exams) {
  if (!e.slug || !e.file || !e.short || !e.name) fail(`exam "${e.slug}" is missing slug, file, short or name`);
}
const papers = data.papers.map((p, i) => {
  const label = `papers[${i}]`;
  if (!examBySlug.has(p.exam)) fail(`${label}: unknown exam "${p.exam}". Valid: ${[...examBySlug.keys()].join(", ")}`);
  if (!isoDate.test(p.date || "")) fail(`${label}: date must be YYYY-MM-DD`);
  if (!p.file && !p.url) fail(`${label}: give either "file" (name inside pdfBase) or "url"`);
  if (p.added && !isoDate.test(p.added)) fail(`${label}: "added" must be YYYY-MM-DD`);
  const url = p.url || S.pdfBase + p.file;
  if (!/^https:\/\//.test(url)) fail(`${label}: download link must start with https://`);
  return Object.assign({}, p, { url });
}).sort((a, b) => b.date.localeCompare(a.date) || (a.shift || "").localeCompare(b.shift || ""));

const latestAdded = papers.map(p => p.added).filter(Boolean).sort().pop();
const modified = latestAdded && latestAdded > S.published ? latestAdded : S.published;
const papersOf = slug => papers.filter(p => p.exam === slug);
const yearsOf = list => [...new Set(list.map(p => p.date.slice(0, 4)))].sort((a, b) => b - a);

/* ---------- site chrome copied from the UPSSSC reference page ---------- */
if (!fs.existsSync(shellSourcePath)) fail("reference page not found: " + shellSourcePath);
const shellLines = fs.readFileSync(shellSourcePath, "utf8").split(/\r?\n/);
const pickLine = (needle, startsWith) => {
  const line = shellLines.find(l => startsWith ? l.trimStart().startsWith(needle) : l.includes(needle));
  if (!line) fail("could not find site chrome piece in reference page: " + needle);
  return line.trim();
};
const chrome = {
  header: pickLine("<header>", true),
  progress: pickLine("reading-progress-track"),
  mobileShare: pickLine("class=\"article-mobile-share\""),
  shareCard: pickLine("class=\"article-share-card\""),
  related: pickLine("id=\"articleRelated\""),
  interactions: pickLine("<section class=\"article-interactions\"", true),
  backToTop: pickLine("id=\"articleBackToTop\""),
  bottomNav: pickLine("<nav class=\"candidate-bottom-nav\"", true),
  footer: pickLine("<footer>", true),
  scripts: pickLine("<script src=\"../../JS/script.js\"", true)
};

/* ---------- shared content blocks ---------- */
function downloadTables(list, { showExam }) {
  if (!list.length) {
    return `<div class="blog-article-note"><p><strong>Papers are being added.</strong> We add a paper only when we have a clean, readable copy with its answer key. Join our <a href="https://t.me/GovJobUpdates_official" target="_blank" rel="noopener noreferrer">Telegram channel</a> to know the moment new papers go live, and bookmark this page, because the URL will not change.</p></div>`;
  }
  return yearsOf(list).map(year => {
    const rows = list.filter(p => p.date.startsWith(year)).map(p => {
      const ex = examBySlug.get(p.exam);
      const name = p.title || (showExam ? ex.tableLabel : ex.short) + (p.shift ? " " + p.shift : "");
      const details = p.details || "Question paper with answer key";
      return `              <tr><td>${esc(name)}</td><td>${formatDate(p.date)}</td><td>${esc(details)}</td><td><a class="btn" href="${esc(p.url)}" rel="noopener">Download</a></td></tr>`;
    }).join("\n");
    return `        <h3 id="year-${year}">Question Papers of ${year}</h3>
        <div class="table-responsive">
          <table class="article-data-table">
            <caption>${showExam ? "UP Police" : esc(examBySlug.get(list[0].exam).short)} Papers, ${year}</caption>
            <thead><tr><th scope="col">Exam Name</th><th scope="col">Date</th><th scope="col">Paper / Details</th><th scope="col">Download</th></tr></thead>
            <tbody>
${rows}
            </tbody>
          </table>
        </div>`;
  }).join("\n");
}

function whySection(label) {
  return `      <section id="why-pyqs">
        <h2>Why Solve ${esc(label)} Previous Year Question Papers?</h2>
        <p>A syllabus tells you the topics. An old paper shows you how those topics turn into questions, and that gap is where many candidates lose marks.</p>
        <ul>
          <li><strong>See the real question style:</strong> You notice how many questions are straight facts, how many need a little thinking, and how the options are framed.</li>
          <li><strong>Feel the time pressure:</strong> Sitting through a full paper with a running clock is the only way to learn how tight the time really is.</li>
          <li><strong>Learn when to guess:</strong> Old papers show you which questions to leave and which to attempt, once you know the marking scheme of that cycle.</li>
          <li><strong>Spot repeating areas:</strong> Put two or three papers side by side and the topics that keep coming back become obvious. Do not expect the same question word for word, but the same concepts do return.</li>
          <li><strong>Find your weak subjects:</strong> A mistake in a real paper shows exactly which chapter needs another round of revision.</li>
        </ul>
      </section>`;
}
function howSection(label) {
  return `      <section id="how-to-use">
        <h2>How to Solve ${esc(label)} PYQs for Best Results</h2>
        <p>Downloading ten papers and never opening them does nothing for your score. This routine works better.</p>
        <ol>
          <li><strong>Solve in one sitting:</strong> Set a timer equal to the real exam duration, put the phone away and do not look anything up.</li>
          <li><strong>Mark your doubts:</strong> Tick the questions where you were only guessing, so you can separate lucky answers from known ones later.</li>
          <li><strong>Check and sort your mistakes:</strong> Put each wrong answer in one of three groups: did not know, knew but slipped, or guessed wrong.</li>
          <li><strong>Calculate your score the official way:</strong> Use the marking scheme of that paper's own cycle, including any negative marking, so your score is realistic.</li>
          <li><strong>Keep a mistake notebook:</strong> Write the concept behind each error in one line. Reading this list before the exam is worth more than reading a new chapter.</li>
          <li><strong>Move to the next paper:</strong> After three or four papers, compare your scores and topics to see what is really improving.</li>
        </ol>
        <p>UP Police exams also have a physical stage. Keep running and fitness practice going alongside paper practice, because a high written score still needs a clear PET and PST.</p>
      </section>`;
}
function mistakesSection() {
  return `      <section id="common-mistakes">
        <h2>Common Mistakes Candidates Make with PYQs</h2>
        <ul>
          <li><strong>Only reading, never solving:</strong> Going through the questions with the answers marked feels productive, but it does not train speed or accuracy.</li>
          <li><strong>Memorising answers:</strong> Learn the concept behind a question instead. The exact question rarely returns in the same form.</li>
          <li><strong>Using one pattern for every year:</strong> The UP Police pattern and marking scheme have changed between cycles. Read the instructions printed on each paper.</li>
          <li><strong>Solving too many papers without review:</strong> One paper checked properly teaches more than three papers solved and forgotten.</li>
          <li><strong>Trusting unverified answer keys:</strong> If an answer looks wrong, cross-check it with a standard book or the official key.</li>
        </ul>
      </section>`;
}
function faqSection(faqs) {
  const items = faqs.map(f => `          <details class="article-faq-item"><summary>${esc(f.q)}</summary><div class="article-faq-answer"><p>${esc(f.a)}</p></div></details>`).join("\n");
  return `      <section id="faq">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div class="article-faq-list">
${items}
        </div>
      </section>`;
}
function sourcesSection(extraLines) {
  const lines = [
    `The exam details above come from UPPRPB notices and news reports about them. Before applying, confirm the latest pattern, vacancies and dates in the official notification on <a href="${esc(S.officialSiteUrl)}" target="_blank" rel="noopener noreferrer">${esc(S.officialSite)}</a>.`,
    "GovJobUpdates is not the official UPPRPB website. The papers here are shared for practice only."
  ].concat(extraLines || []);
  return `      <section class="blog-source-box" aria-labelledby="sourceTitle"><h2 id="sourceTitle">Sources &amp; Verification</h2><ul>${lines.map(l => `<li><i class="fas fa-circle-check" aria-hidden="true"></i>${l}</li>`).join("")}</ul></section>`;
}
function hindiSection(exam) {
  const hi = exam ? HINDI[exam.slug] || exam.short : "सभी परीक्षाओं";
  return `      <section id="hindi-summary">
        <h2>हिंदी में सारांश</h2>
        <p lang="hi">यूपी पुलिस ${esc(hi)} के पिछले वर्ष के प्रश्न पत्र (PDF) इस पेज पर वर्ष-वार उपलब्ध कराए जाते हैं। इनसे आप परीक्षा का असली पैटर्न समझ सकते हैं, समय प्रबंधन का अभ्यास कर सकते हैं और अपने कमजोर विषय पहचान सकते हैं। परीक्षा का पैटर्न और अंकन योजना हर भर्ती में बदल सकती है, इसलिए आवेदन से पहले उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड की आधिकारिक अधिसूचना (${esc(S.officialSite)}) ज़रूर देखें।</p>
      </section>`;
}
function patternTables(exam) {
  if (!exam.patterns || !exam.patterns.length) return "";
  const blocks = exam.patterns.map(p => `        <h3>${esc(p.cycle)}</h3>
        <div class="table-responsive">
          <table class="article-data-table">
            <caption>${esc(p.cycle)}</caption>
            <thead><tr><th scope="col">Detail</th><th scope="col">Information</th></tr></thead>
            <tbody>
${p.rows.map(r => `              <tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("\n")}
            </tbody>
          </table>
        </div>${p.note ? `\n        <p class="blog-article-note"><strong>Note:</strong> ${esc(p.note)}</p>` : ""}`).join("\n");
  return `      <section id="exam-pattern">
        <h2>${esc(exam.short)} Exam Pattern, Cycle by Cycle</h2>
        <p>The UP Police pattern has not stayed the same across recruitments, so details are given cycle by cycle instead of as one fixed pattern. Only details we could verify are listed. For anything else, use the official notification.</p>
${blocks}
      </section>`;
}

/* ---------- page shell ---------- */
function renderPage({ file, id, title, h1, description, keywords, ogTitle, twitterDesc, tags, dek, stats, takeaways, sections, tocItems, breadcrumbTrail, faqs, extraSchemas, noindex, articleSection }) {
  const url = `${S.baseUrl}/${S.folder}/${file}`;
  const image = `${S.baseUrl}/${S.image}`;
  const robots = noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const keywordText = keywords.join(", ");
  const crumbs = [{ name: "Home", item: S.baseUrl + "/" }, { name: "Student Hub", item: S.baseUrl + "/HTML/student-hub.html" }].concat(breadcrumbTrail.map(c => ({ name: c.name, item: `${S.baseUrl}/${S.folder}/${c.file}` })));
  const schemas = [
    { "@context": "https://schema.org", "@type": "BlogPosting", headline: h1, description, datePublished: S.published, dateModified: modified, author: { "@type": "Organization", name: "GovJobUpdates" }, publisher: { "@type": "Organization", name: "GovJobUpdates", logo: { "@type": "ImageObject", url: S.baseUrl + "/Assets/Home%20Page/favicon-96x96.png" } }, mainEntityOfPage: url, image, inLanguage: "en-IN", articleSection, keywords: keywords.slice(0, 3).join(", ") },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
  ].concat(extraSchemas || []);
  const breadcrumbHtml = ["<a href=\"../../index.html\">Home</a>", "<a href=\"../student-hub.html\">Student Hub</a>"]
    .concat(breadcrumbTrail.map((c, i) => i === breadcrumbTrail.length - 1 ? `<span>${esc(c.short || c.name)}</span>` : `<a href="${c.file}">${esc(c.short || c.name)}</a>`)).join("<span>/</span>");
  const statsHtml = stats.map(s => `<article><span>${esc(s[0])}</span><strong>${esc(s[1])}</strong></article>`).join("");
  const takeawayHtml = takeaways.map(t => `      <li><i class="fas fa-check" aria-hidden="true"></i> <span><strong>${esc(t[0])}</strong> ${esc(t[1])}</span></li>`).join("\n");
  const jump = tocItems.slice(0, 6).map(t => `<a href="#${t[0]}">${esc(t[1])}</a>`).join("");
  const toc = tocItems.map(t => `<li><a href="#${t[0]}">${esc(t[1])}</a></li>`).join("");
  const tagLinks = tags.map(t => `<a href="../student-hub.html?category=UP%20Police">#${esc(t)}</a>`).join("");

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywordText)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  <meta name="author" content="GovJobUpdates">
  <meta property="og:site_name" content="GovJobUpdates">
  <meta property="og:title" content="${esc(ogTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:alt" content="${esc(h1)}">
  <meta property="article:published_time" content="${S.published}">
  <meta property="article:modified_time" content="${modified}">
  <meta property="article:section" content="UP Police">
${tags.slice(0, 3).map(t => `  <meta property="article:tag" content="${esc(t)}">`).join("\n")}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(ogTitle)}">
  <meta name="twitter:description" content="${esc(twitterDesc)}">
  <meta name="twitter:image" content="${image}">

${schemas.map(jsonLd).join("\n")}

  <link rel="icon" type="image/png" sizes="32x32" href="../../Assets/Home%20Page/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../../Assets/Home%20Page/favicon-16x16.png">
  <link rel="shortcut icon" href="../../Assets/Home%20Page/favicon.ico">
  <link rel="apple-touch-icon" href="../../Assets/Home%20Page/apple-icon.png">
  <link rel="stylesheet" href="../../CSS/style.css">
  <link rel="stylesheet" href="../../CSS/blog.css">
  <link rel="stylesheet" href="../../CSS/article-interactions.css">
  <link rel="stylesheet" href="../../Assets/vendor/fontawesome/css/all.min.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8757376209468788" crossorigin="anonymous"></script>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to main content</a>
${chrome.header}

${chrome.progress}

<main class="blog-article-page" id="main-content">
<article data-blog-id="${esc(id)}" data-blog-category="UP Police" data-related-mode="previous" data-blog-date="${S.published}">
  <div class="blog-article-hero">
    <div class="blog-breadcrumb" aria-label="Breadcrumb">${breadcrumbHtml}</div>
    <div class="article-hero-topline">
      <span class="article-chip article-chip--category">UP Police</span>
      <span class="article-chip article-chip--time"><i class="fas fa-clock" aria-hidden="true"></i><span id="articleReadTime">7 min read</span></span>
      <span class="article-chip article-chip--live"><i class="fas fa-circle-check" aria-hidden="true"></i>Updated Regularly</span>
    </div>
    <h1>${esc(h1)}</h1>
    <p class="blog-article-dek">${esc(dek)}</p>
    <div class="article-trust-strip"><div class="article-trust-avatar" aria-hidden="true">GJ</div><div class="article-trust-text"><strong>GovJobUpdates Editorial Team</strong><span>Student Resources &middot; Updated: <time datetime="${modified}">${longDate(modified)}</time></span></div><span class="article-verified"><i class="fas fa-shield-halved" aria-hidden="true"></i> Free to Download</span></div>
    <div class="article-hero-stats" aria-label="Article highlights">${statsHtml}</div>
  </div>

  <figure class="blog-article-cover"><img src="../../${S.image}" alt="${esc(h1)}" loading="eager" decoding="async" width="1200" height="380"><figcaption>${esc(h1)}</figcaption></figure>

  <div class="article-key-takeaways" aria-label="Key takeaways">
    <h2><i class="fas fa-bolt" aria-hidden="true"></i> Key Takeaways</h2>
    <ul>
${takeawayHtml}
    </ul>
  </div>

  <nav class="article-mobile-jump" aria-label="Quick article navigation">
    ${jump}
  </nav>
  ${chrome.mobileShare}

  <div class="article-layout">
    <div class="blog-article-content">
${sections.join("\n\n")}

      <section aria-label="Tags"><div class="article-tags">${tagLinks}</div></section>
    </div>

    <aside class="article-sidebar">
      <details class="article-toc-card" open><summary>In This Article (Quick Jump)</summary><ul class="article-toc-list" id="articleTocList">${toc}</ul></details>
      ${chrome.shareCard}
    </aside>
  </div>
</article>

${chrome.related}

${chrome.interactions}
</main>

${chrome.backToTop}
${chrome.bottomNav}
${chrome.footer}
${chrome.scripts}
</body>
</html>
`;
}

/* ---------- page builders ---------- */
function buildExamPage(exam) {
  const list = papersOf(exam.slug);
  const years = yearsOf(list);
  const siblings = exams.filter(e => e.slug !== exam.slug);
  const id = exam.file.replace(/\.html$/, "");
  const faqs = exam.faq.concat([
    { q: `Will new ${exam.short} papers be added to this page?`, a: `Yes. New papers are added to the same table whenever we get a clean, readable copy, so the page URL does not change.` },
    { q: "Are these papers official?", a: `No. GovJobUpdates is not the official UPPRPB website. The papers are shared for practice only, and official notices should be checked on ${S.officialSite}.` }
  ]);
  const relatedLinks = siblings.map(e => `          <li><a href="${e.file}"><strong>${esc(e.short)} Previous Year Papers</strong></a> &ndash; ${esc(e.name)}</li>`).join("\n");

  const sections = [
    `      <section id="download-papers">
        <h2>${esc(exam.short)} Previous Year Question Papers PDF (Year-wise)</h2>
        <p>${esc(exam.short)} papers are listed below year by year, newest first. ${list.length ? `This page currently has ${plural(list.length, "paper")}.` : "The first papers are being prepared."} Papers of every other UP Police exam are on the <a href="${S.hubFile}">UP Police previous year question papers</a> page.</p>
${downloadTables(list, { showExam: false })}
        <p class="blog-article-note"><strong>Note:</strong> These papers are shared for practice only. If a year has more than one set or shift, try all of them. For official notices and answer keys, always check the UPPRPB website (${esc(S.officialSite)}).</p>
      </section>`,
    `      <section id="about-exam">
        <h2>About the ${esc(exam.short)} Exam</h2>
${exam.about.map(p => `        <p>${esc(p)}</p>`).join("\n")}
        <h3>Selection Stages</h3>
        <ol>
${exam.stages.map(s => `          <li>${esc(s)}</li>`).join("\n")}
        </ol>
        <p>Vacancies, qualification, age limits and physical standards are different in every notification, so read the official notice of the recruitment you are applying for.</p>
      </section>`
  ];
  if (exam.patterns && exam.patterns.length) sections.push(patternTables(exam));
  sections.push(whySection(exam.short), howSection(exam.short), mistakesSection(),
    `      <section id="related-exams">
        <h2>More UP Police Previous Year Papers</h2>
        <p>Preparing for more than one UPPRPB exam? These pages cover the other UP Police papers.</p>
        <ul>
${relatedLinks}
        </ul>
        <p>You can also practise with <a href="../police-quizzes.html">free Police exam quizzes</a> and find more in the <a href="../student-hub.html?category=UP%20Police">UP Police section of the Student Hub</a>.</p>
      </section>`,
    hindiSection(exam),
    faqSection(faqs),
    sourcesSection());

  const toc = [["download-papers", "Download Papers"], ["about-exam", "About the Exam"]];
  if (exam.patterns && exam.patterns.length) toc.push(["exam-pattern", "Exam Pattern"]);
  toc.push(["why-pyqs", "Why Solve PYQs?"], ["how-to-use", "How to Use PYQs"], ["common-mistakes", "Common Mistakes"], ["related-exams", "More UP Police Papers"], ["hindi-summary", "हिंदी सारांश"], ["faq", "FAQs"]);

  return renderPage({
    file: exam.file, id,
    title: `${exam.short} Previous Year Question Papers PDF | GovJobUpdates`,
    h1: `${exam.short} Previous Year Question Papers PDF: Year-wise Download`,
    description: exam.metaDescription,
    keywords: exam.keywords,
    ogTitle: `${exam.short} Previous Year Question Papers PDF: Year-wise Download`,
    twitterDesc: `${exam.short} previous year question papers PDF, listed year-wise, with exam pattern and practice tips.`,
    tags: [`${exam.short.replace(/\s+/g, "")}PYQ`, "UPPoliceQuestionPapers", "PreviousYearPapers", "UPPRPB"],
    dek: exam.dek,
    stats: [["Conducted By", "UPPRPB"], ["Arrangement", "Year-wise"], [list.length ? "Papers Listed" : "Status", list.length ? String(list.length) : "Being Added"]],
    takeaways: [
      ["Year-wise papers:", list.length ? `${plural(list.length, "paper")} listed${years.length ? ", covering " + years.slice().reverse().join(", ") : ""}.` : "Papers are added here as clean copies become available."],
      ["Know the pattern:", "UP Police patterns and marking schemes change between cycles, so details are given cycle by cycle."],
      ["Practise like the exam:", "Full papers, a running timer and honest checking matter more than the number of PDFs you download."],
      ["Same page, more papers:", "New papers are added to the same table, so you can bookmark this URL."]
    ],
    sections, tocItems: toc,
    breadcrumbTrail: [{ name: "UP Police Previous Year Question Papers", short: "UP Police", file: S.hubFile }, { name: `${exam.short} Previous Year Question Papers`, short: exam.short, file: exam.file }],
    faqs, noindex: S.noindexUntilPapers && list.length === 0, articleSection: "UP Police"
  });
}

function buildHub() {
  const id = S.hubFile.replace(/\.html$/, "");
  const examCards = exams.map(e => {
    const list = papersOf(e.slug);
    const ys = yearsOf(list);
    const status = list.length ? `${plural(list.length, "paper")} available (${ys[ys.length - 1] === ys[0] ? ys[0] : ys[ys.length - 1] + " to " + ys[0]}).` : "Papers are being added.";
    return `          <li><a href="${e.file}"><strong>${esc(e.short)} Previous Year Question Papers</strong></a> &ndash; ${esc(e.name)}. ${status} <a href="${e.file}#download-papers">Go to downloads</a></li>`;
  }).join("\n");
  const patternHighlights = exams.filter(e => e.patterns && e.patterns.length).map(e => {
    const p = e.patterns[0];
    return `          <li><strong>${esc(e.short)}:</strong> ${esc(p.cycle)}. ${esc(p.rows.slice(0, 3).map(r => `${r[0]}: ${r[1]}`).join("; "))}. <a href="${e.file}#exam-pattern">Full pattern</a></li>`;
  }).join("\n");
  const faqs = [
    { q: "Where can I download UP Police previous year question papers?", a: "Open the page of your exam from this page: Constable, SI, ASI or Home Guard. Each page has year-wise download tables. Papers are added whenever we get a clean, readable copy." },
    { q: "Which UP Police exams are covered?", a: "UP Police Constable (including Jail Warder), Sub Inspector, ASI (Clerk and Accounts), and Home Guard. ASI also covers SI (Confidential) and Computer Operator Grade A." },
    { q: "Who conducts the UP Police exams?", a: "The Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) conducts these recruitments. Its official website is " + S.officialSite + "." },
    { q: "Is the UP Police exam pattern the same every year?", a: "No. The question count, marks and marking scheme have differed between recruitment cycles, so check the pattern in the notification of the cycle you are preparing for." },
    { q: "How many previous year papers should I solve?", a: "There is no fixed number. Try to solve every available paper of your exam at least once as a full timed test, and re-attempt the latest ones after revising your weak subjects." },
    { q: "Will papers of future UP Police vacancies be added?", a: "Yes. New UPPRPB recruitments are added to the exam pages as their papers become available, so the URLs do not change." },
    { q: "Are these papers official?", a: `No. GovJobUpdates is not the official UPPRPB website. The papers are shared for practice only, and official notices should be checked on ${S.officialSite}.` }
  ];

  const sections = [
    `      <section id="exams-covered">
        <h2>UP Police Previous Year Question Papers: Choose Your Exam</h2>
        <p>This is the home of UP Police previous year papers, from the ${S.collectionStartYear} recruitment cycles onward. Every exam has its own page with year-wise download tables, the exam pattern and the selection stages. ${papers.length ? `The collection currently has ${plural(papers.length, "paper")}.` : "The first papers are being prepared."} Pick your exam below.</p>
        <ul>
${examCards}
        </ul>
        <p class="blog-article-note"><strong>Note:</strong> These papers are shared for practice only. For official notices and answer keys, always check the UPPRPB website (${esc(S.officialSite)}).</p>
      </section>`,
    `      <section id="exam-pattern">
        <h2>UP Police Exam Pattern at a Glance</h2>
        <p>The pattern is not fixed across recruitments, so each line below names the cycle it belongs to. Only details we could verify are listed.</p>
        <ul>
${patternHighlights}
        </ul>
        <p>For the exact pattern of the exam you are applying for, always read the latest official notification on ${esc(S.officialSite)}.</p>
      </section>`,
    whySection("UP Police"), howSection("UP Police"), mistakesSection(),
    `      <section id="building-resource">
        <h2>Bookmark This Page</h2>
        <p>Instead of publishing a new post for every paper, we add papers to these pages in stages. The URLs stay the same, so you can bookmark them and check back whenever a new UP Police exam is held.</p>
        <p>If a paper you need is missing, tell us in the discussion section below or on our Telegram channel, and we will try to add it. To see which UP Police recruitments are running right now, visit <a href="../latest-jobs.html">Latest Government Jobs</a>.</p>
      </section>`,
    hindiSection(null),
    faqSection(faqs),
    sourcesSection()
  ];
  const toc = [["exams-covered", "Choose Your Exam"], ["exam-pattern", "Exam Pattern"], ["why-pyqs", "Why Solve PYQs?"], ["how-to-use", "How to Use PYQs"], ["common-mistakes", "Common Mistakes"], ["building-resource", "Bookmark This Page"], ["hindi-summary", "हिंदी सारांश"], ["faq", "FAQs"]];
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", name: "UP Police previous year question papers by exam", itemListElement: exams.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: `${e.short} Previous Year Question Papers`, url: `${S.baseUrl}/${S.folder}/${e.file}` })) };

  return renderPage({
    file: S.hubFile, id,
    title: "UP Police Previous Year Question Papers PDF (All Exams) | GovJobUpdates",
    h1: "UP Police Previous Year Question Papers PDF: SI, Constable, ASI, Home Guard",
    description: "Year-wise UP Police previous year question papers PDF for SI, Constable, ASI and Home Guard, with answer keys, exam pattern and practice tips.",
    keywords: ["UP Police Previous Year Question Papers", "UP Police Previous Year Papers PDF", "UP Police PYQ", "UPPRPB Previous Year Question Papers", "UP Police Question Paper PDF", "UP Police SI Previous Year Paper", "UP Police Constable Previous Year Paper", "UP Police ASI Previous Year Paper", "UP Home Guard Previous Year Paper", "यूपी पुलिस पिछले वर्ष के प्रश्न पत्र"],
    ogTitle: "UP Police Previous Year Question Papers PDF: Year-wise Download",
    twitterDesc: "UP Police previous year papers for SI, Constable, ASI, Home Guard and more, year-wise, with exam pattern and practice tips.",
    tags: ["UPPolicePYQ", "UPPoliceQuestionPapers", "PreviousYearPapers", "UPPRPB", "GovernmentExams"],
    dek: "Preparing for UP Police? Solving old papers is one of the best uses of your study time. This page is the home of UP Police previous year question papers for SI, Constable, ASI and Home Guard, listed year by year, with the exam pattern explained cycle by cycle and a simple way to turn every paper into marks.",
    stats: [["Conducted By", "UPPRPB"], ["Exams Covered", String(exams.length)], [papers.length ? "Papers Listed" : "Status", papers.length ? String(papers.length) : "Being Added"]],
    takeaways: [
      ["All UP Police exams:", "Constable, SI, ASI and Home Guard, each with its own page."],
      ["Year-wise downloads:", `Each exam page groups papers by year, newest first, starting from the ${S.collectionStartYear} recruitment cycles.`],
      ["Know the pattern:", "UP Police patterns and marking schemes change between cycles, so details are given cycle by cycle."],
      ["Practise like the exam:", "Full papers, a running timer and honest checking matter more than the number of PDFs you download."],
      ["Future vacancies:", "Papers of every new UPPRPB recruitment go into the exam pages, so the URLs never change."]
    ],
    sections, tocItems: toc,
    breadcrumbTrail: [{ name: "UP Police Previous Year Question Papers", short: "UP Police", file: S.hubFile }],
    faqs, extraSchemas: [itemList], noindex: S.noindexUntilPapers && papers.length === 0, articleSection: "UP Police"
  });
}

/* ---------- write ---------- */
const outDir = path.join(root, S.folder);
const written = [];
fs.writeFileSync(path.join(outDir, S.hubFile), buildHub(), "utf8");
written.push([S.hubFile, papers.length]);
for (const exam of exams) {
  fs.writeFileSync(path.join(outDir, exam.file), buildExamPage(exam), "utf8");
  written.push([exam.file, papersOf(exam.slug).length]);
}

console.log(`Generated ${written.length} UP Police PYQ pages (${papers.length} papers in total).`);
for (const [file, count] of written) {
  const noindex = S.noindexUntilPapers && count === 0;
  console.log(`  ${file}: ${count} papers${noindex ? "  [noindex until a paper is added]" : "  [indexable]"}`);
}
if (S.noindexUntilPapers && written.some(([, c]) => c === 0)) {
  console.log("Pages with 0 papers are noindex and stay out of the sitemap. Add papers to data/up-police-pyq.json and run this script again.");
}
