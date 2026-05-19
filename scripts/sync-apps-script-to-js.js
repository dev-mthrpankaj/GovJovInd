/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(__dirname, "sync-apps-script-config.json");

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
  if (!Array.isArray(items)) return [];
  return items;
}

function buildJs(globalVariable, records, label) {
  return `// Auto-generated from Google Sheet through Apps Script.\n// Source: ${label}\n// Generated at: ${new Date().toISOString()}\n// Do not edit manually when sync is enabled.\n\nwindow.${globalVariable} = ${JSON.stringify(records, null, 4)};\n`;
}

function writeIfValid(filePath, content) {
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
  return writeIfValid(source.outputFile, content);
}

async function main() {
  const config = readJson(CONFIG_PATH);
  if (!config.apiUrl) throw new Error("Missing apiUrl in sync-apps-script-config.json");

  let changed = false;
  let failed = false;

  for (const source of config.sources) {
    try {
      const didChange = await syncOne(config.apiUrl, source);
      changed = changed || didChange;
    } catch (error) {
      failed = true;
      console.error(`Failed: ${source.label}: ${error.message}`);
    }
  }

  if (failed) process.exitCode = 1;
  console.log(changed ? "Sync completed with file updates." : "Sync completed with no file changes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
