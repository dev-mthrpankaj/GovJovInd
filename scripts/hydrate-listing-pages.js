#!/usr/bin/env node
/*
 * Static hydration for listing pages (latest jobs, results, answer keys, admit cards).
 * Reads the Google-Sheet-generated JS data files and writes crawlable cards
 * between STATIC-LISTING markers. Re-running regenerates the block, so new
 * records appear and removed records disappear. The page JS still replaces
 * the container on load (live filters/status), so there is no duplication.
 *
 * Usage: node scripts/hydrate-listing-pages.js [--write] [--limit=100]
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const WRITE = process.argv.includes("--write");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : 100;
const START = "<!-- STATIC-LISTING:START (auto-generated, do not edit) -->";
const END = "<!-- STATIC-LISTING:END -->";

const todayIST = (() => {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
})();
const parseDate = (v) => {
  if (!v || !/^\d{4}-\d{2}-\d{2}/.test(v)) return null;
  const [y, m, d] = String(v).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmt = (v) => {
  const d = parseDate(v);
  return d ? `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}` : "Not specified";
};
const text = (v, f = "") => (v === undefined || v === null || String(v).trim() === "" ? f : String(v).trim());
const esc = (v) => text(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const dayDiff = (a, b) => Math.ceil((b - a) / 86400000);
const isNew = (r) => { const u = parseDate(r.updatedAt); if (!u) return false; const n = dayDiff(u, todayIST); return n >= 0 && n <= 3; };
const hasUrl = (v) => /^https?:\/\//i.test(text(v));

function loadData(file, globalName) {
  const code = fs.readFileSync(path.join(ROOT, "JS", file), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { timeout: 5000 });
  return Array.isArray(sandbox.window[globalName]) ? sandbox.window[globalName] : [];
}

function normalizeDetail(value) {
  let url = text(value).replace(/\\/g, "/");
  if (!url || url === "#") return "";
  if (/^https?:\/\/(www\.)?govjobupdates\.com\//i.test(url)) return url;
  url = url.replace(/^\.\//, "../");
  if (/^(\.\.\/)?(jobs|Job_Details\/HTML|Result_Details\/HTML|AnswerKey_Details\/HTML|AdmitCard_Details\/HTML)\/[^?#]+$/i.test(url)) {
    url = url.startsWith("../") ? url : `../${url}`;
    return /\.html$/i.test(url) ? url : `${url}.html`;
  }
  return "";
}

const dateOf = (r) => parseDate(r.updatedAt) || new Date(0);
const examStart = (r) => parseDate(r.examDate);
const examEnd = (r) => parseDate(r.examEndDate) || examStart(r);
const examDates = (r) => {
  const s = examStart(r), e = examEnd(r);
  if (!s) return "Not specified";
  return !e || e.getTime() === s.getTime() ? fmt(r.examDate) : `${fmt(r.examDate)} - ${fmt(r.examEndDate)}`;
};

const card = (cls, org, title, badges, meta, foot, href, btnCls) => `
<article class="${cls}-card">
  <div class="${cls}-card-accent" aria-hidden="true"></div>
  <div class="${cls}-card-header">
    <div class="${cls}-title-block"><p class="${cls}-organization">${esc(org)}</p><h3>${esc(title)}</h3></div>
    <div class="${cls}-badges">${badges}</div>
  </div>
  <dl class="${cls}-meta">${meta}</dl>
  <div class="${cls}-card-footer">
    <span class="${cls}-footnote">${foot}</span>
    <div class="${cls}-actions">${href ? `<a href="${esc(href)}" class="btn btn-primary ${btnCls}">View Details</a>` : ""}</div>
  </div>
</article>`;
const m = (cls, label, val, extra = "") => `<div class="${cls}-meta-item${extra}"><dt>${label}</dt><dd>${esc(val)}</dd></div>`;

const PAGES = [
  {
    html: "HTML/latest-jobs.html", id: "jobListings",
    intro: "Latest government job notifications from SSC, UPSC, Railway, Banking, Defence and state commissions. Each card links to a permanent detail page with vacancy, eligibility, fee, dates and official links. Always verify details on the official notification before applying.", file: "jobs-data.js", global: "GovJobUpdatesJobs",
    filter: (r) => !["job-1017"].includes(text(r.id)),
    status(r) {
      const last = parseDate(r.lastDate), start = parseDate(r.startDate);
      if (last && todayIST > last) return "closed";
      if (start && todayIST < start) return "upcoming";
      return r.status === "upcoming" ? "upcoming" : "active";
    },
    label: (s) => cap(s),
    // open jobs first, then newest; closed ones last
    sort: (a, b, st) => (st(a) === "closed") - (st(b) === "closed") || dateOf(b) - dateOf(a),
    render(r, st) {
      const s = st(r);
      const badges = `<span class="job-badge badge-${s}">${cap(s)}</span><span class="job-badge badge-category">${esc(r.category || r.department)}</span>${isNew(r) ? '<span class="job-badge badge-new">New</span>' : ""}`;
      const meta = m("job", "Total Posts", text(r.totalPosts, "Not specified"), " job-meta-posts") + m("job", "Start Date", fmt(r.startDate)) + m("job", "Last Date", fmt(r.lastDate), " job-meta-deadline") + m("job", "Updated", fmt(r.updatedAt));
      return card("job", r.organization, r.title, badges, meta, `${cap(s)} listing. Apply link is available on the detail page.`, normalizeDetail(r.detailPage), "job-detail-btn");
    },
  },
  {
    html: "HTML/results.html", id: "resultListings",
    intro: "Latest government exam results, merit lists and cutoff updates. Each card links to a detail page with the official result link and next steps. Always confirm final results on the official website.", file: "results-data.js", global: "GovJobUpdatesResults",
    status(r) {
      const d = parseDate(r.resultDate);
      if (d && d > todayIST) return "upcoming";
      if (hasUrl(r.resultLink) && d && d <= todayIST) return "released";
      return r.status === "released" ? "released" : "upcoming";
    },
    label: (s) => ({ released: "Released", upcoming: "Upcoming" }[s] || "Released"),
    sort: (a, b) => dateOf(b) - dateOf(a),
    render(r, st, label) {
      const s = st(r);
      const badges = `<span class="record-badge badge-${s}">${label(s)}</span><span class="record-badge badge-category">${esc(r.department || r.category)}</span>${isNew(r) ? '<span class="record-badge badge-new">New</span>' : ""}`;
      const meta = m("record", "Result Date", fmt(r.resultDate), " record-meta-release") + m("record", "Updated", fmt(r.updatedAt));
      return card("record", r.organization, r.title, badges, meta, `${label(s)} update. Official result and cutoff links are on the detail page.`, normalizeDetail(r.detailPage), "record-detail-btn");
    },
  },
  {
    html: "HTML/answer-key.html", id: "answerKeyListings",
    intro: "Latest provisional and final answer keys with objection dates. Each card links to a detail page with the official answer key and objection links. Always verify on the official examination website.", file: "answerkey-data.js", global: "GovJobUpdatesAnswerKeys",
    status(r) {
      const obj = parseDate(r.objectionLastDate), rel = parseDate(r.releaseDate);
      if (obj && todayIST > obj) return "objection-closed";
      if (rel && rel > todayIST) return "upcoming";
      if (hasUrl(r.downloadLink) && rel && rel <= todayIST) return "available";
      return ["available", "upcoming", "objection-closed"].includes(r.status) ? r.status : "upcoming";
    },
    label: (s) => ({ available: "Available", upcoming: "Upcoming", "objection-closed": "Objection Closed" }[s] || "Available"),
    sort: (a, b) => dateOf(b) - dateOf(a),
    render(r, st, label) {
      const s = st(r);
      const badges = `<span class="record-badge badge-${s}">${label(s)}</span><span class="record-badge badge-category">${esc(r.department || r.category)}</span>${isNew(r) ? '<span class="record-badge badge-new">New</span>' : ""}`;
      const meta = m("record", "Exam Dates", examDates(r), " record-meta-exam") + m("record", "Release Date", fmt(r.releaseDate), " record-meta-release") + m("record", "Objection Last Date", fmt(r.objectionLastDate)) + m("record", "Updated", fmt(r.updatedAt));
      return card("record", r.organization, r.title, badges, meta, `${label(s)} update. Official links and rank-check options are on the detail page.`, normalizeDetail(r.detailPage), "record-detail-btn");
    },
  },
  {
    html: "HTML/admitcard.html", id: "admitcardListings",
    intro: "Latest admit cards, hall tickets and exam city slips. Each card links to a detail page with the official download link and exam dates. Always download from the official website.", file: "admitcard-data.js", global: "GovJobUpdatesAdmitCards",
    status(r) {
      const end = examEnd(r), rel = parseDate(r.releaseDate);
      if (end && end < todayIST) return "exam-over";
      if (rel && rel > todayIST) return "upcoming";
      if (hasUrl(r.downloadLink) && rel && rel <= todayIST) return "available";
      return ["available", "upcoming"].includes(r.status) ? r.status : "upcoming";
    },
    label: (s) => ({ available: "Available", upcoming: "Upcoming", "exam-over": "Exam Over" }[s] || "Available"),
    sort: (a, b) => dateOf(b) - dateOf(a),
    render(r, st, label) {
      const s = st(r);
      const badges = `<span class="record-badge badge-${s}">${label(s)}</span><span class="record-badge badge-category">${esc(r.department || r.category)}</span>${isNew(r) ? '<span class="record-badge badge-new">New</span>' : ""}`;
      const meta = m("record", "Exam Dates", examDates(r), " record-meta-exam") + m("record", "Release Date", fmt(r.releaseDate), " record-meta-release") + m("record", "Updated", fmt(r.updatedAt));
      return card("record", r.organization, r.title, badges, meta, `${label(s)} update. Official download link is on the detail page.`, normalizeDetail(r.detailPage), "record-detail-btn");
    },
  },
];

// One-time cleanup: drop the old hand-written <article class="... content-fallback">
// (long paragraph + "crawlable examples" list pointing at legacy pages) that sits
// directly after the generated block. The generated block replaces its job.
function stripLegacyFallback(rest) {
  const m = /^\s*<article[^>]*\bcontent-fallback\b[^>]*>[\s\S]*?<\/article>/.exec(rest);
  return m ? rest.slice(m[0].length) : rest;
}

// Insert/replace the marker block as the first child of the container div.
function inject(html, id, block) {
  const open = new RegExp(`(<div[^>]*\\bid="${id}"[^>]*>)`);
  const mo = open.exec(html);
  if (!mo) return null;
  const startIdx = html.indexOf(START, mo.index);
  const containerStart = mo.index + mo[0].length;
  if (startIdx !== -1 && startIdx >= containerStart) {
    const endIdx = html.indexOf(END, startIdx);
    if (endIdx === -1) return null;
    let rest = html.slice(endIdx + END.length);
    rest = stripLegacyFallback(rest);
    return html.slice(0, startIdx) + block + rest;
  }
  return html.slice(0, containerStart) + "\n" + block + stripLegacyFallback(html.slice(containerStart));
}

let changed = 0;
for (const p of PAGES) {
  const records = loadData(p.file, p.global).filter(p.filter || (() => true));
  const st = p.status;
  const sorted = [...records].sort((a, b) => p.sort(a, b, st));
  // keep only records that have a valid internal detail page, so every card is a real crawlable link
  const linked = sorted.filter((r) => normalizeDetail(r.detailPage)).slice(0, LIMIT);
  const cards = linked.map((r) => p.render(r, st, p.label)).join("\n");
  const nav = `<nav class="related-links" aria-label="Related sections"><a href="latest-jobs.html">Latest Jobs</a> <a href="admitcard.html">Admit Card</a> <a href="answer-key.html">Answer Key</a> <a href="results.html">Results</a> <a href="rank-predictor.html">Rank Predictor</a> <a href="student-hub.html">Student Hub</a></nav>`;
  const block = `${START}\n<p class="static-listing-intro">${esc(p.intro)}</p>${nav}\n<div class="static-listing" data-static-count="${linked.length}">${cards}\n</div>\n${END}`;
  const file = path.join(ROOT, p.html);
  const before = fs.readFileSync(file, "utf8");
  const after = inject(before, p.id, block);
  if (after === null) { console.log(`! ${p.html}: container #${p.id} not found`); continue; }
  const dead = linked.filter((r) => /\/(AnswerKey_Details|Result_Details|AdmitCard_Details)\//i.test(r.detailPage)).length;
  console.log(`${p.html}: ${records.length} records, ${linked.length} static cards${dead ? `, ${dead} point to legacy folders` : ""}${after === before ? " (unchanged)" : ""}`);
  if (after !== before) { changed++; if (WRITE) fs.writeFileSync(file, after); }
}
console.log(WRITE ? `Wrote ${changed} file(s).` : `Dry run: ${changed} file(s) would change. Use --write.`);
