"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const baseUrl = "https://govjobupdates.com/";
const sitemapPath = path.join(root, "sitemap.xml");
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

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}

const skipped = [];
const pages = collectHtmlFiles(root)
  .map((filePath) => ({ filePath, relativePath: toRelativePath(filePath) }))
  .filter(({ filePath, relativePath }) => {
    const excluded = shouldExcludeFile(relativePath, filePath);
    if (excluded) skipped.push(relativePath);
    return !excluded;
  })
  .map(({ filePath, relativePath }) => ({
    loc: getPublicUrl(relativePath),
    lastmod: getLastModified(relativePath, filePath)
  }))
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

console.log(`Generated sitemap.xml with ${pages.length} indexable HTML URLs.`);
if (skipped.length) {
  console.log(`Excluded ${skipped.length} non-indexable or ignored HTML files: ${skipped.sort().join(", ")}`);
}
