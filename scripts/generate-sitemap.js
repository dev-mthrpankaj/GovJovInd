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
const excludedNameToken = /(?:^|[ ._-])(draft|drafts|test|tests|backup|backups|bak|old|copy)(?:[ ._-]|$)/i;

function toRelativePath(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function shouldSkipDirectory(name) {
  const lowerName = name.toLowerCase();
  return excludedDirectoryNames.has(lowerName)
    || lowerName.startsWith(".edge-")
    || excludedNameToken.test(lowerName);
}

function collectHtmlFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && shouldSkipDirectory(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(fullPath, files);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function isNoIndexPage(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];

  return metaTags.some((tag) => (
    /\bname\s*=\s*["']robots["']/i.test(tag)
    && /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(tag)
  ));
}

function isMetaRefreshRedirectPage(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];

  return metaTags.some((tag) => (
    /\bhttp-equiv\s*=\s*["']refresh["']/i.test(tag)
    && /\bcontent\s*=\s*["'][^"']*\burl\s*=/i.test(tag)
  ));
}

function shouldExcludeFile(relativePath, filePath) {
  if (relativePath.toLowerCase() === "404.html") return true;
  if (relativePath.split("/").some((segment) => excludedNameToken.test(segment))) return true;
  if (isMetaRefreshRedirectPage(filePath)) return true;
  return isNoIndexPage(filePath);
}

function getPublicUrl(relativePath) {
  let cleanPath = relativePath;

  if (cleanPath === "index.html") return baseUrl;
  if (cleanPath.endsWith("/index.html")) {
    cleanPath = cleanPath.slice(0, -"index.html".length);
  }

  const encodedPath = cleanPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return new URL(encodedPath, baseUrl).href;
}

function gitOutput(args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();
}

function loadJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (_) {
    return fallback;
  }
}

function getExistingSitemapLastmods() {
  if (!fs.existsSync(sitemapPath)) return new Map();

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const entries = new Map();
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];

  for (const block of urlBlocks) {
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
      const gitDate = gitOutput(["log", "-1", "--format=%cs", "--", relativePath]);
      if (/^\d{4}-\d{2}-\d{2}$/.test(gitDate)) return gitDate;
    }
  } catch (_) {
    // Fall back to the local file time when Git metadata is unavailable.
  }

  return fs.statSync(filePath).mtime.toISOString().slice(0, 10);
}

function unescapeXml(value) {
  return value
    .replaceAll("&apos;", "'")
    .replaceAll("&quot;", "\"")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&");
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}

function getMetaContent(html, selector) {
  const match = html.match(selector);
  return match ? match[1].trim() : "";
}

function stripNonContentHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<header\b[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ");
}

function normalizeForSignature(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getIndexingSignature(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const title = getMetaContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = getMetaContent(html, /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*>/i);
  const canonical = getMetaContent(html, /<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*\bhref\s*=\s*["']([^"']*)["'][^>]*>/i);
  const robots = getMetaContent(html, /<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*>/i);
  const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/i);
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const primaryHtml = mainMatch ? mainMatch[0] : (bodyMatch ? bodyMatch[1] : html);
  const contentText = stripNonContentHtml(primaryHtml)
    .replace(/<[^>]+>/g, " ");

  const signatureSource = [
    title,
    description,
    canonical,
    robots,
    normalizeForSignature(contentText)
  ].join("\n");

  return crypto.createHash("sha256").update(signatureSource).digest("hex");
}

function getStableLastmod({ relativePath, filePath, loc, signature, previousCache, existingLastmods }) {
  const cached = previousCache.pages?.[relativePath];
  if (cached?.signature === signature && /^\d{4}-\d{2}-\d{2}$/.test(cached.lastmod)) {
    return cached.lastmod;
  }

  const existingLastmod = existingLastmods.get(loc);
  if (!cached && /^\d{4}-\d{2}-\d{2}$/.test(existingLastmod || "")) {
    return existingLastmod;
  }

  return getLastModified(relativePath, filePath);
}

const previousCache = loadJson(signatureCachePath, { version: 1, pages: {} });
const existingLastmods = getExistingSitemapLastmods();
const skipped = [];
const pages = collectHtmlFiles(root)
  .map((filePath) => ({ filePath, relativePath: toRelativePath(filePath) }))
  .filter(({ filePath, relativePath }) => {
    const excluded = shouldExcludeFile(relativePath, filePath);
    if (excluded) skipped.push(relativePath);
    return !excluded;
  })
  .map(({ filePath, relativePath }) => {
    const loc = getPublicUrl(relativePath);
    const signature = getIndexingSignature(filePath);

    return {
      loc,
      relativePath,
      signature,
      lastmod: getStableLastmod({
        relativePath,
        filePath,
        loc,
        signature,
        previousCache,
        existingLastmods
      })
    };
  })
  .sort((a, b) => {
    if (a.loc === baseUrl) return -1;
    if (b.loc === baseUrl) return 1;
    return a.loc.localeCompare(b.loc);
  });

const entries = pages.map(({ loc, lastmod }) => [
  "  <url>",
  `    <loc>${escapeXml(loc)}</loc>`,
  `    <lastmod>${lastmod}</lastmod>`,
  "  </url>"
].join("\n"));

const sitemap = [
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
  "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
  ...entries,
  "</urlset>",
  ""
].join("\n");

fs.writeFileSync(sitemapPath, sitemap, "utf8");

const nextCache = {
  version: 1,
  pages: Object.fromEntries(pages.map(({ relativePath, signature, lastmod }) => [
    relativePath,
    { signature, lastmod }
  ]))
};

fs.mkdirSync(path.dirname(signatureCachePath), { recursive: true });
fs.writeFileSync(signatureCachePath, `${JSON.stringify(nextCache, null, 2)}\n`, "utf8");

console.log(`Generated sitemap.xml with ${pages.length} indexable HTML URLs.`);
if (skipped.length) {
  console.log(`Excluded ${skipped.length} non-indexable or ignored HTML files: ${skipped.sort().join(", ")}`);
}
