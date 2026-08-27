"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const jobsDataPath = path.join(root, "JS", "jobs-data.js");
const today = "2026-08-27";

function loadJobs() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(jobsDataPath, "utf8"), context);
  return context.window.GovJobUpdatesJobs || [];
}

function text(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function escapeAttr(value) {
  return text(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function stripOnlineForm(title) {
  return text(title)
    .replace(/\s+Online Form\b/i, "")
    .replace(/\s+for\s+\d+\s+Post\b/i, "")
    .replace(/\s+\|\s+Salary.*$/i, "")
    .trim();
}

function buildDescription(job) {
  const title = stripOnlineForm(job.title);
  const posts = text(job.totalPosts);
  const postText = posts && !/^na$/i.test(posts) ? ` for ${posts} posts` : "";
  const suffix = "Check dates, eligibility, fee, official notification and apply link.";
  let description = `${title} Recruitment 2026${postText}. ${suffix}`;
  if (description.length > 165) {
    description = `${title}${postText}. ${suffix}`;
  }
  if (description.length > 165) {
    description = `${title}. Check dates, eligibility, fee and official links.`;
  }
  if (description.length > 165) {
    description = `${title.slice(0, 104).replace(/\s+\S*$/, "")}. Check dates, eligibility, fee and official links.`;
  }
  return description;
}

function buildJobPosting(job, pageUrl) {
  const organization = text(job.organization) || text(job.department) || "GovJobUpdates";
  const datePosted = text(job.updatedAt) || text(job.startDate) || today;
  const validThrough = text(job.lastDate)
    ? `${text(job.lastDate)}T23:59:00+05:30`
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: stripOnlineForm(job.title),
    description: buildDescription(job),
    identifier: {
      "@type": "PropertyValue",
      name: organization,
      value: text(job.id) || stripOnlineForm(job.title)
    },
    datePosted,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: organization
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India"
    },
    url: pageUrl
  };

  if (validThrough) data.validThrough = validThrough;
  if (text(job.qualification)) data.educationRequirements = text(job.qualification);
  return data;
}

const cp1252Map = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f]
]);

function decodeCp1252Run(value) {
  const bytes = [];
  for (const char of value) {
    const code = char.codePointAt(0);
    if (code <= 0xff) bytes.push(code);
    else if (cp1252Map.has(code)) bytes.push(cp1252Map.get(code));
    else return value;
  }
  const decoded = Buffer.from(bytes).toString("utf8");
  return decoded.includes("\uFFFD") ? value : decoded;
}

function repairMojibake(html) {
  return html
    .replace(/\u00C2\u00B7/g, "-")
    .replace(/\u00E2\u20AC\u00A6/g, "...")
    .replace(/\u00E2\u20AC\u00A2/g, "-")
    .replace(/\u00E2\u201A\u00B9/g, "Rs.")
    .replace(/\u00E2\u20AC\u201C/g, "-")
    .replace(/\u00E2\u20AC\u201D/g, "-")
    .replace(/\u00E2\u20AC\u2122/g, "'")
    .replace(/\u00E2\u20AC\u02DC/g, "'")
    .replace(/\u00E2\u20AC\u0153/g, "\"")
    .replace(/\u00E2\u20AC\u009D/g, "\"")
    .replaceAll("Â·", "-")
    .replaceAll("â€¦", "...")
    .replaceAll("â€¢", "-")
    .replaceAll("â‚¹", "Rs.")
    .replaceAll("â€“", "-")
    .replaceAll("â€”", "-")
    .replaceAll("â€™", "'")
    .replaceAll("â€˜", "'")
    .replaceAll("â€œ", "\"")
    .replaceAll("â€", "\"")
    .replace(/[À-ÿ€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]{3,}/g, (run) => decodeCp1252Run(run))
    .replaceAll("’", "'")
    .replaceAll("‘", "'")
    .replaceAll("“", "\"")
    .replaceAll("”", "\"")
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("…", "...")
    .replaceAll("\u00A0", " ");
}

function setMeta(html, selector, replacement) {
  return selector.test(html) ? html.replace(selector, replacement) : html;
}

function addModifiedTime(html, date) {
  if (/property=["']article:modified_time["']/i.test(html)) return html;
  const tag = `  <meta property="article:modified_time" content="${date}">\n`;
  return html.replace(/(<meta property=["']og:url["'][^>]*>\s*)/i, `$1${tag}`);
}

function addJobPosting(html, job, pageUrl) {
  if (/data-schema=["']jobposting["']|["@]type"\s*:\s*"JobPosting"/i.test(html)) return html;
  const json = JSON.stringify(buildJobPosting(job, pageUrl)).replace(/</g, "\\u003c");
  const block = `  <script type="application/ld+json" data-schema="jobposting">${json}</script>\n`;
  if (/<\/script>\s*<link rel=["']icon["']/i.test(html)) {
    return html.replace(/(<\/script>\s*)(<link rel=["']icon["'])/i, `$1${block}$2`);
  }
  return html.replace(/(<link rel=["']icon["'])/i, `${block}$1`);
}

function addRelatedJobs(html, job) {
  if (/data-related-open-jobs/i.test(html)) return html;
  const tags = [job.department, job.category, job.organization]
    .map(text)
    .filter(Boolean)
    .slice(0, 4)
    .join(",");
  const currentId = path.basename(text(job.detailPage), ".html");
  const block = `\n      <section class="related-block">\n        <h2>Related Jobs</h2>\n        <div\n          class="related-open-jobs-mount"\n          data-related-open-jobs\n          data-current-job-id="${escapeAttr(currentId)}"\n          data-current-tags="${escapeAttr(tags)}"\n          data-max-jobs="10">\n        </div>\n      </section>\n`;
  if (/<section class=["']section-card["']>\s*<h2>Frequently Asked Questions<\/h2>/i.test(html)) {
    return html.replace(/(<section class=["']section-card["']>\s*<h2>Frequently Asked Questions<\/h2>)/i, `${block}\n      $1`);
  }
  return html;
}

function updatePage(job) {
  const relative = text(job.detailPage).replace(/^\.\.\//, "");
  const filePath = path.join(root, relative);
  if (!fs.existsSync(filePath)) return { file: relative, changed: false, missing: true };

  const before = fs.readFileSync(filePath, "utf8");
  const pageUrl = `https://govjobupdates.com/${relative.replace(/\\/g, "/").replace(/ /g, "%20")}`;
  const description = buildDescription(job);
  let html = before;

  html = repairMojibake(html);
  html = setMeta(
    html,
    /<meta name=["']description["'] content=["'][^"']*["']>/i,
    `<meta name="description" content="${escapeAttr(description)}">`
  );
  html = setMeta(
    html,
    /<meta property=["']og:description["'] content=["'][^"']*["']>/i,
    `<meta property="og:description" content="${escapeAttr(description)}">`
  );
  html = setMeta(
    html,
    /<meta name=["']twitter:description["'] content=["'][^"']*["']>/i,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`
  );
  html = addModifiedTime(html, text(job.updatedAt) || today);
  html = addJobPosting(html, job, pageUrl);
  html = addRelatedJobs(html, job);

  if (html !== before) {
    fs.writeFileSync(filePath, html, "utf8");
  }
  return { file: relative, changed: html !== before, missing: false };
}

const jobs = loadJobs()
  .filter((job) => ["active", "upcoming"].includes(text(job.status)))
  .slice(0, 80);

const results = jobs.map(updatePage);
const changed = results.filter((result) => result.changed);
const missing = results.filter((result) => result.missing);

console.log(`Checked ${results.length} active/upcoming latest job detail pages.`);
console.log(`Updated ${changed.length} pages.`);
console.log(`Missing ${missing.length} pages.`);
changed.forEach((result) => console.log(result.file));
