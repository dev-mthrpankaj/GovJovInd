"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const baseUrl = "https://govjobupdates.com/";
const sitemapPath = path.join(root, "sitemap.xml");
const signatureCachePath = path.join(root, "data", "sitemap-content-signatures.json");
const excludedDirectoryNames = new Set([".git", ".github", "node_modules", "android-webview-app"]);
const excludedNameToken = /(?:^|[ ._-])(draft|drafts|tests|backup|backups|bak|old|copy)(?:[ ._-]|$)/i;
const excludedExactNames = new Set(["test", "test-page", "test-pages"]);

const sitemapGroups = [
  { name: "jobs", file: "sitemap-jobs.xml", match: p => /^Job_Details\//i.test(p) },
  { name: "admit-cards", file: "sitemap-admit-cards.xml", match: p => /^AdmitCard_Details\//i.test(p) },
  { name: "results", file: "sitemap-results.xml", match: p => /^Result_Details\//i.test(p) },
  { name: "answer-keys", file: "sitemap-answer-keys.xml", match: p => /^AnswerKey_Details\//i.test(p) },
  { name: "student-hub", file: "sitemap-student-hub.xml", match: p => /^HTML\/student-hub\//i.test(p) },
  { name: "rank-predictors", file: "sitemap-rank-predictors.xml", match: p => /^rank-predictor\//i.test(p) },
  { name: "typing-tests", file: "sitemap-typing-tests.xml", match: p => /typing/i.test(p) },
  { name: "pages", file: "sitemap-pages.xml", match: () => true }
];

function toRelativePath(filePath) { return path.relative(root, filePath).split(path.sep).join("/"); }
function shouldSkipDirectory(name) {
  const lower = name.toLowerCase();
  return excludedDirectoryNames.has(lower) || excludedExactNames.has(lower) || lower.startsWith(".edge-") || excludedNameToken.test(lower);
}
function collectHtmlFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && shouldSkipDirectory(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(full, files);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(full);
  }
  return files;
}
function isNoIndexPage(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  return (html.match(/<meta\b[^>]*>/gi) || []).some(tag => /\bname\s*=\s*["']robots["']/i.test(tag) && /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(tag));
}
function isMetaRefreshRedirectPage(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  return (html.match(/<meta\b[^>]*>/gi) || []).some(tag => /\bhttp-equiv\s*=\s*["']refresh["']/i.test(tag) && /\bcontent\s*=\s*["'][^"']*\burl\s*=/i.test(tag));
}
function isIndexableHtmlDocument(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  return /<html\b/i.test(html) && /<body\b/i.test(html) && /<title\b[\s\S]*?<\/title>/i.test(html);
}
function shouldExcludeFile(relativePath, filePath) {
  if (relativePath.toLowerCase() === "404.html") return true;
  if (relativePath.split("/").some(segment => {
    const lower = segment.toLowerCase().replace(/\.html$/i, "");
    return excludedExactNames.has(lower) || excludedNameToken.test(segment);
  })) return true;
  if (!isIndexableHtmlDocument(filePath)) return true;
  if (isMetaRefreshRedirectPage(filePath)) return true;
  return isNoIndexPage(filePath);
}
function getPublicUrl(relativePath) {
  let clean = relativePath;
  if (clean === "index.html") return baseUrl;
  if (clean.endsWith("/index.html")) clean = clean.slice(0, -"index.html".length);
  return new URL(clean.split("/").map(encodeURIComponent).join("/"), baseUrl).href;
}
function gitOutput(args) { return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); }
function loadJson(filePath, fallback) { try { return JSON.parse(fs.readFileSync(filePath, "utf8")); } catch (_) { return fallback; } }
function unescapeXml(value) { return value.replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&"); }
function escapeXml(value) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;"); }
function getExistingSitemapLastmods() {
  if (!fs.existsSync(sitemapPath)) return new Map();
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const entries = new Map();
  for (const block of (xml.match(/<url>[\s\S]*?<\/url>/g) || [])) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/)?.[1];
    if (loc && lastmod) entries.set(unescapeXml(loc), lastmod);
  }
  return entries;
}
function getLastModified(relativePath, filePath) {
  try {
    const status = gitOutput(["status", "--porcelain", "--untracked-files=all", "--", relativePath]);
    if (!status) {
      const date = gitOutput(["log", "-1", "--format=%cs", "--", relativePath]);
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    }
  } catch (_) {}
  return fs.statSync(filePath).mtime.toISOString().slice(0, 10);
}
function getMetaContent(html, selector) { const match = html.match(selector); return match ? match[1].trim() : ""; }
function stripNonContentHtml(html) {
  return html.replace(/<!--[\s\S]*?-->/g, " ").replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ").replace(/<header\b[\s\S]*?<\/header>/gi, " ").replace(/<footer\b[\s\S]*?<\/footer>/gi, " ").replace(/<nav\b[\s\S]*?<\/nav>/gi, " ");
}
function normalizeForSignature(value) { return value.replace(/&nbsp;/gi, " ").replace(/&#160;/g, " ").replace(/\s+/g, " ").trim(); }
function getIndexingSignature(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const title = getMetaContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = getMetaContent(html, /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*>/i);
  const canonical = getMetaContent(html, /<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*\bhref\s*=\s*["']([^"']*)["'][^>]*>/i);
  const robots = getMetaContent(html, /<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*>/i);
  const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/i);
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const primary = mainMatch ? mainMatch[0] : (bodyMatch ? bodyMatch[1] : html);
  const text = stripNonContentHtml(primary).replace(/<[^>]+>/g, " ");
  return crypto.createHash("sha256").update([title, description, canonical, robots, normalizeForSignature(text)].join("\n")).digest("hex");
}
function getStableLastmod({ relativePath, filePath, loc, signature, previousCache, existingLastmods }) {
  const cached = previousCache.pages?.[relativePath];
  if (cached?.signature === signature && /^\d{4}-\d{2}-\d{2}$/.test(cached.lastmod)) return cached.lastmod;
  const old = existingLastmods.get(loc);
  if (!cached && /^\d{4}-\d{2}-\d{2}$/.test(old || "")) return old;
  return getLastModified(relativePath, filePath);
}
function renderUrlset(pages) {
  const entries = pages.map(({ loc, lastmod }) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`);
  return ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">", ...entries, "</urlset>", ""].join("\n");
}

const previousCache = loadJson(signatureCachePath, { version: 1, pages: {} });
const existingLastmods = getExistingSitemapLastmods();
const skipped = [];
const pages = collectHtmlFiles(root).map(filePath => ({ filePath, relativePath: toRelativePath(filePath) })).filter(({ filePath, relativePath }) => {
  const excluded = shouldExcludeFile(relativePath, filePath); if (excluded) skipped.push(relativePath); return !excluded;
}).map(({ filePath, relativePath }) => {
  const loc = getPublicUrl(relativePath); const signature = getIndexingSignature(filePath);
  return { loc, relativePath, signature, lastmod: getStableLastmod({ relativePath, filePath, loc, signature, previousCache, existingLastmods }) };
}).sort((a, b) => a.loc === baseUrl ? -1 : b.loc === baseUrl ? 1 : a.loc.localeCompare(b.loc));

const grouped = new Map(sitemapGroups.map(g => [g.file, []]));
for (const page of pages) {
  const group = sitemapGroups.find(g => g.match(page.relativePath));
  grouped.get(group.file).push(page);
}
for (const group of sitemapGroups) fs.writeFileSync(path.join(root, group.file), renderUrlset(grouped.get(group.file)), "utf8");

const sitemapIndex = [
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
  "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
  ...sitemapGroups.filter(g => grouped.get(g.file).length > 0).map(g => `  <sitemap>\n    <loc>${escapeXml(new URL(g.file, baseUrl).href)}</loc>\n  </sitemap>`),
  "</sitemapindex>", ""
].join("\n");
fs.writeFileSync(sitemapPath, sitemapIndex, "utf8");

const nextCache = { version: 1, pages: Object.fromEntries(pages.map(({ relativePath, signature, lastmod }) => [relativePath, { signature, lastmod }])) };
fs.mkdirSync(path.dirname(signatureCachePath), { recursive: true });
fs.writeFileSync(signatureCachePath, `${JSON.stringify(nextCache, null, 2)}\n`, "utf8");

console.log(`Generated sitemap index with ${pages.length} indexable HTML URLs.`);
for (const group of sitemapGroups) console.log(`${group.file}: ${grouped.get(group.file).length} URLs`);
if (skipped.length) console.log(`Excluded ${skipped.length} non-indexable or ignored HTML files.`);
