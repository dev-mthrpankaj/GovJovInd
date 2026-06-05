const fs = require("fs");
const path = require("path");

const root = process.cwd();
const errors = [];
const ignoredPrefixes = [
  "#",
  "data:",
  "mailto:",
  "tel:",
  "sms:",
  "javascript:"
];

const scannedExtensions = new Set([".html", ".js", ".xml", ".txt"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (scannedExtensions.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function cleanTarget(value) {
  return String(value || "").trim();
}

function stripQuery(value) {
  return String(value || "").split("#")[0].split("?")[0].trim();
}

function shouldIgnore(value) {
  const lower = value.toLowerCase();
  return !value || ignoredPrefixes.some((prefix) => lower.startsWith(prefix));
}

function isExternal(value) {
  return /^(https?:)?\/\//i.test(value);
}

function isValidExternalUrl(value) {
  try {
    const url = value.startsWith("//") ? new URL(`https:${value}`) : new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function decodePath(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function localTargetExists(fromFile, rawTarget) {
  const clean = stripQuery(rawTarget);
  if (shouldIgnore(clean) || isExternal(clean)) return true;

  const decoded = decodePath(clean);
  const abs = decoded.startsWith("/")
    ? path.join(root, decoded.slice(1))
    : path.resolve(path.dirname(fromFile), decoded);

  return fs.existsSync(abs)
    || fs.existsSync(`${abs}.html`)
    || fs.existsSync(path.join(abs, "index.html"));
}

function extractHtmlTargets(content) {
  const targets = [];
  const attrPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  let match;
  while ((match = attrPattern.exec(content))) targets.push(match[1]);
  return targets;
}

function extractJsTargets(content) {
  const targets = [];
  const propertyPattern = /\b(?:detailPage|applyLink|officialNotification|resultLink|downloadLink|objectionLink)\s*:\s*["']([^"']*)["']/g;
  const jsonPropertyPattern = /"(?:detailPage|applyLink|officialNotification|resultLink|downloadLink|objectionLink)"\s*:\s*"([^"]*)"/g;
  let match;
  while ((match = propertyPattern.exec(content))) targets.push(match[1]);
  while ((match = jsonPropertyPattern.exec(content))) targets.push(match[1]);
  return targets;
}

function extractXmlTargets(content) {
  const targets = [];
  const locPattern = /<loc>([^<]+)<\/loc>/gi;
  let match;
  while ((match = locPattern.exec(content))) targets.push(match[1]);
  return targets;
}

function getTargets(file, content) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".html") return extractHtmlTargets(content);
  if (ext === ".js") return extractJsTargets(content);
  if (ext === ".xml") return extractXmlTargets(content);
  if (path.basename(file).toLowerCase() === "robots.txt") {
    return content.split(/\r?\n/).map((line) => line.replace(/^Sitemap:\s*/i, "").trim()).filter((line) => /^https?:\/\//i.test(line));
  }
  return [];
}

function validateTarget(file, target) {
  const value = cleanTarget(target);
  if (shouldIgnore(value)) return;

  if (isExternal(value)) {
    if (!isValidExternalUrl(value)) errors.push(`${relative(file)} -> invalid URL: ${value}`);
    return;
  }

  if (!localTargetExists(file, value)) errors.push(`${relative(file)} -> missing local target: ${value}`);
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

for (const file of walk(root)) {
  const content = fs.readFileSync(file, "utf8");
  for (const target of getTargets(file, content)) validateTarget(file, target);
}

if (errors.length) {
  console.error("Site link validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("OK: site links, local file references, and URL syntax validated.");
