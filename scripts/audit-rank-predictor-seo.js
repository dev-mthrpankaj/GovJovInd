"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const baseUrl = "https://govjobupdates.com/";
const mainPage = "HTML/rank-predictor.html";
const resultPage = "HTML/rank-result.html";
const sitemapPath = "sitemap.xml";
const reportPath = path.join(root, "reports", "rank-predictor-seo-audit.json");

const requiredPages = [
  {
    path: mainPage,
    url: "https://govjobupdates.com/HTML/rank-predictor.html",
    titleIncludes: ["Rank Predictor"],
    requiredText: [
      "id=\"examSearchInput\"",
      "id=\"examQuickPicks\"",
      "id=\"rankPredictorSeoSupport\"",
      "SSC CGL Rank Predictor",
      "UP Police Rank Predictor"
    ],
    requiredSchemaTypes: ["WebPage", "WebApplication", "FAQPage", "BreadcrumbList", "HowTo"]
  },
  {
    path: "rank-predictor/ssc-cgl/index.html",
    url: "https://govjobupdates.com/rank-predictor/ssc-cgl/",
    titleIncludes: ["SSC CGL", "Rank Predictor"],
    requiredText: ["Open Rank Predictor", "official answer key"],
    requiredSchemaTypes: ["WebPage", "FAQPage", "BreadcrumbList"]
  },
  {
    path: "rank-predictor/ssc-cpo/index.html",
    url: "https://govjobupdates.com/rank-predictor/ssc-cpo/",
    titleIncludes: ["SSC CPO", "Rank Predictor"],
    requiredText: ["Open Rank Predictor", "physical"],
    requiredSchemaTypes: ["WebPage", "FAQPage", "BreadcrumbList"]
  },
  {
    path: "rank-predictor/up-police/index.html",
    url: "https://govjobupdates.com/rank-predictor/up-police/",
    titleIncludes: ["UP Police", "Rank Predictor"],
    requiredText: ["Open Rank Predictor", "official UP Police"],
    requiredSchemaTypes: ["WebPage", "FAQPage", "BreadcrumbList"]
  },
  {
    path: "rank-predictor/railway/index.html",
    url: "https://govjobupdates.com/rank-predictor/railway/",
    titleIncludes: ["Railway", "Rank Predictor"],
    requiredText: ["Open Rank Predictor", "Railway Recruitment Boards"],
    requiredSchemaTypes: ["WebPage", "FAQPage", "BreadcrumbList"]
  },
  {
    path: "rank-predictor/up-home-guard/index.html",
    url: "https://govjobupdates.com/rank-predictor/up-home-guard/",
    titleIncludes: ["UP Home Guard", "Rank Predictor"],
    requiredText: ["Open Rank Predictor", "official authority"],
    requiredSchemaTypes: ["WebPage", "FAQPage", "BreadcrumbList"]
  }
];

const failures = [];
const checks = [];

function read(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(relativePath, "file exists", "Missing file");
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function pass(scope, check, detail = "") {
  checks.push({ ok: true, scope, check, detail });
}

function fail(scope, check, detail) {
  checks.push({ ok: false, scope, check, detail });
  failures.push(`${scope}: ${check} - ${detail}`);
}

function expect(scope, check, condition, detail) {
  if (condition) pass(scope, check, detail);
  else fail(scope, check, detail);
}

function getTagContent(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? cleanText(match[1]) : "";
}

function getMetaContent(html, name) {
  const pattern = new RegExp(`<meta\\b(?=[^>]*(?:name|property)=["']${escapeRegExp(name)}["'])[^>]*content=["']([^"']*)["'][^>]*>`, "i");
  const match = html.match(pattern);
  return match ? cleanText(match[1]) : "";
}

function getCanonical(html) {
  const match = html.match(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*href=["']([^"']*)["'][^>]*>/i);
  return match ? cleanText(match[1]) : "";
}

function getRobots(html) {
  return getMetaContent(html, "robots").toLowerCase();
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractJsonLd(html, scope) {
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return scripts.map((match, index) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      fail(scope, `JSON-LD #${index + 1}`, error.message);
      return null;
    }
  }).filter(Boolean);
}

function collectSchemaTypes(node, types = new Set()) {
  if (!node || typeof node !== "object") return types;
  if (Array.isArray(node)) {
    node.forEach((item) => collectSchemaTypes(item, types));
    return types;
  }
  const type = node["@type"];
  if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
  else if (type) types.add(String(type));
  if (Array.isArray(node["@graph"])) collectSchemaTypes(node["@graph"], types);
  return types;
}

function publicUrlFor(relativePath) {
  let cleanPath = relativePath.replaceAll("\\", "/");
  if (cleanPath.endsWith("/index.html")) cleanPath = cleanPath.slice(0, -"index.html".length);
  return new URL(cleanPath, baseUrl).href;
}

function auditPage(page) {
  const html = read(page.path);
  if (!html) return;

  const title = getTagContent(html, "title");
  const description = getMetaContent(html, "description");
  const canonical = getCanonical(html);
  const schemas = extractJsonLd(html, page.path);
  const schemaTypes = [...schemas.reduce((set, schema) => collectSchemaTypes(schema, set), new Set())];

  expect(page.path, "canonical URL", canonical === page.url, `expected ${page.url}, found ${canonical || "missing"}`);
  expect(page.path, "title present", Boolean(title), title);
  page.titleIncludes.forEach((term) => {
    expect(page.path, `title includes ${term}`, title.toLowerCase().includes(term.toLowerCase()), title);
  });
  expect(page.path, "meta description present", Boolean(description), description);
  expect(page.path, "meta description length", description.length >= 80 && description.length <= 165, `${description.length} chars`);
  page.requiredText.forEach((text) => {
    expect(page.path, `contains text: ${text}`, html.includes(text), text);
  });
  expect(page.path, "schema parses", schemas.length > 0, `${schemas.length} blocks`);
  page.requiredSchemaTypes.forEach((type) => {
    expect(page.path, `schema has ${type}`, schemaTypes.includes(type), schemaTypes.join(", "));
  });
}

function auditSitemap() {
  const sitemap = read(sitemapPath);
  if (!sitemap) return;
  requiredPages.forEach((page) => {
    expect(sitemapPath, `includes ${page.url}`, sitemap.includes(`<loc>${page.url}</loc>`), page.url);
  });
  expect(sitemapPath, "excludes rank result page", !sitemap.includes("https://govjobupdates.com/HTML/rank-result.html"), "rank result should remain noindex");
  expect(sitemapPath, "excludes redirect alias", !sitemap.includes("https://govjobupdates.com/rank-predictor/</loc>"), "redirect alias should not be indexed");
  expect(sitemapPath, "excludes build reports", !sitemap.includes("android-webview-app"), "build reports should not be indexed");
}

function auditResultPage() {
  const html = read(resultPage);
  if (!html) return;
  const robots = getRobots(html);
  expect(resultPage, "robots noindex", robots.includes("noindex"), robots || "missing");
  expect(resultPage, "robots nofollow", robots.includes("nofollow"), robots || "missing");
  expect(resultPage, "result storage JS present", html.includes("../JS/rank-result.js"), "rank-result.js script");
}

function auditLandingLinks() {
  requiredPages.filter((page) => page.path !== mainPage).forEach((page) => {
    const html = read(page.path);
    expect(page.path, "links to main predictor", html.includes("../../HTML/rank-predictor.html"), "main predictor link");
    expect(page.path, "public URL matches path", publicUrlFor(page.path) === page.url, `${publicUrlFor(page.path)} vs ${page.url}`);
  });
}

requiredPages.forEach(auditPage);
auditSitemap();
auditResultPage();
auditLandingLinks();

const report = {
  generatedAt: new Date().toISOString(),
  success: failures.length === 0,
  summary: {
    checks: checks.length,
    passed: checks.filter((check) => check.ok).length,
    failed: failures.length
  },
  failures,
  checks
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

if (failures.length) {
  console.error("Rank Predictor SEO audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error(`Report written to ${path.relative(root, reportPath)}`);
  process.exit(1);
}

console.log(`OK: Rank Predictor SEO audit passed (${report.summary.passed}/${report.summary.checks} checks).`);
console.log(`Report written to ${path.relative(root, reportPath)}`);
