/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(__dirname, "sync-apps-script-config.json");
const PUBLIC_SHEET_CONFIG_PATH = path.join(ROOT_DIR, "JS", "google-sheet-updates-config.js");

const HTML_CACHE_TARGETS = [
  {
    file: "HTML/latest-jobs.html",
    scripts: ["jobs-data", "latest-jobs"]
  },
  {
    file: "HTML/admitcard.html",
    scripts: ["admitcard-data", "admit-cards"]
  },
  {
    file: "HTML/answer-key.html",
    scripts: ["answerkey-data", "answer-key"]
  },
  {
    file: "HTML/results.html",
    scripts: ["results-data", "results"]
  }
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function normalizeTags(value) {
  if (Array.isArray(value)) return value.map(normalizeText).filter(Boolean);
  return normalizeText(value).split(",").map((tag) => tag.trim()).filter(Boolean);
}

function normalizeRecord(record, fields) {
  const output = {};
  fields.forEach((field) => {
    output[field] = field === "tags" ? normalizeTags(record[field]) : normalizeText(record[field]);
  });
  return output;
}

function getSortDate(record) {
  return Date.parse(record.updatedAt || record.releaseDate || record.startDate || record.resultDate || record.examDate || "");
}

function sortRecords(records) {
  return [...records].sort((a, b) => {
    const da = getSortDate(a);
    const db = getSortDate(b);
    if (Number.isNaN(da) && Number.isNaN(db)) return 0;
    if (Number.isNaN(da)) return 1;
    if (Number.isNaN(db)) return -1;
    return db - da;
  });
}

function isUsableUrl(value) {
  const text = normalizeText(value);
  if (!text || text.includes("PASTE_")) return false;
  try {
    const url = new URL(text);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function readApiUrlFromPublicConfig() {
  if (!fs.existsSync(PUBLIC_SHEET_CONFIG_PATH)) return "";
  const configText = fs.readFileSync(PUBLIC_SHEET_CONFIG_PATH, "utf8");
  const match = configText.match(/apiUrl:\s*["']([^"']+)["']/);
  return match ? match[1].trim() : "";
}

function resolveApiUrl(config) {
  const candidates = [process.env.GJU_SHEET_API_URL, config.apiUrl, readApiUrlFromPublicConfig()];
  return normalizeText(candidates.find(isUsableUrl) || "");
}

function buildApiUrl(baseUrl, type) {
  const url = new URL(baseUrl);
  url.searchParams.set("type", type);
  url.searchParams.set("_sync", String(Date.now()));
  return url.toString();
}

async function fetchItems(baseUrl, type, payloadKey) {
  const response = await fetch(buildApiUrl(baseUrl, type), {
    method: "GET",
    redirect: "follow",
    headers: { "Accept": "application/json" }
  });

  if (!response.ok) throw new Error(`${type}: request failed with HTTP ${response.status}`);

  const text = await response.text();
  if (/<!doctype html|<html/i.test(text)) {
    throw new Error(`${type}: Apps Script returned HTML instead of JSON. Check deployment access.`);
  }

  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    throw new Error(`${type}: response is not valid JSON.`);
  }

  const items = Array.isArray(payload?.[payloadKey]) ? payload[payloadKey] : Array.isArray(payload?.items) ? payload.items : [];
  return Array.isArray(items) ? items : [];
}

function buildJs(globalVariable, records, label) {
  return `// Auto-generated from Google Sheet through Apps Script.\n// Source: ${label}\n// Do not edit manually when sync is enabled.\n\nwindow.${globalVariable} = ${JSON.stringify(records, null, 4)};\n`;
}

function writeIfChanged(filePath, content) {
  const absolutePath = path.join(ROOT_DIR, filePath);
  const oldContent = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : "";
  if (oldContent === content) {
    console.log(`No changes: ${filePath}`);
    return false;
  }
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log(`Updated: ${filePath}`);
  return true;
}

function removeLiveSheetScripts(html) {
  return html
    .replace(/^\s*<script\s+src=["']\.\.\/JS\/google-sheet-updates-config\.js(?:\?[^"']*)?["']><\/script>\s*\r?\n?/gim, "")
    .replace(/^\s*<script\s+src=["']\.\.\/JS\/google-sheet-updates\.js(?:\?[^"']*)?["']><\/script>\s*\r?\n?/gim, "");
}

function updateScriptVersion(html, scriptName, version) {
  const pattern = new RegExp(`(<script\\s+src=["']\\.\\.\\/JS\\/${scriptName}\\.js)(?:\\?v=[^"']*)?(["']><\\/script>)`, "gi");
  return html.replace(pattern, `$1?v=${version}$2`);
}

function updatePublicHtmlCacheVersions(version) {
  let changed = false;

  HTML_CACHE_TARGETS.forEach((target) => {
    const relativeFile = target.file;
    const absoluteFile = path.join(ROOT_DIR, relativeFile);

    if (!fs.existsSync(absoluteFile)) {
      console.warn(`Skipped missing HTML file: ${relativeFile}`);
      return;
    }

    let html = fs.readFileSync(absoluteFile, "utf8");
    html = removeLiveSheetScripts(html);
    target.scripts.forEach((scriptName) => {
      html = updateScriptVersion(html, scriptName, version);
    });

    changed = writeIfChanged(relativeFile, html) || changed;
  });

  return changed;
}

async function syncOne(apiUrl, source) {
  console.log(`Fetching ${source.label}...`);
  const rawItems = await fetchItems(apiUrl, source.apiType, source.payloadKey);
  const records = rawItems
    .map((record) => normalizeRecord(record, source.fields))
    .filter((record) => record.id && record.title);

  if (!records.length) {
    console.warn(`${source.label}: No valid records found. Existing file was not overwritten.`);
    return false;
  }

  const content = buildJs(source.globalVariable, sortRecords(records), source.label);
  return writeIfChanged(source.outputFile, content);
}

function buildVersion() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}-${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}`;
}

async function main() {
  const config = readJson(CONFIG_PATH);
  const apiUrl = resolveApiUrl(config);
  if (!apiUrl) throw new Error("Missing Apps Script API URL. Set GJU_SHEET_API_URL, config.apiUrl, or JS/google-sheet-updates-config.js apiUrl.");

  let dataChanged = false;
  let failed = false;

  for (const source of config.sources) {
    try {
      const didChange = await syncOne(apiUrl, source);
      dataChanged = dataChanged || didChange;
    } catch (error) {
      failed = true;
      console.error(`Failed: ${source.label}: ${error.message}`);
    }
  }

  let htmlChanged = false;
  if (dataChanged) {
    const version = buildVersion();
    console.log(`Updating public HTML cache version: ${version}`);
    htmlChanged = updatePublicHtmlCacheVersions(version);
  }

  if (failed) process.exitCode = 1;
  const changed = dataChanged || htmlChanged;
  console.log(changed ? "Sync completed with file updates." : "Sync completed with no file changes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
