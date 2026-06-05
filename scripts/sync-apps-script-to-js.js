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

const REPORT_DIR = path.join(ROOT_DIR, "reports");
const SHEET_VALIDATION_REPORT_PATH = path.join(REPORT_DIR, "sheet-validation-report.json");
const PLACEHOLDER_QUALIFICATIONS = new Set([
  "view details for educational qualification",
  "view details",
  "view details for more information",
  "read official notification",
  "read the official notification",
  "check notification",
  "check official notification",
  "n/a",
  "na",
  "nil",
  "none",
  "not available",
  "not specified",
  "*",
  "-",
  "--"
]);
const ACCEPTED_SHORT_QUALIFICATIONS = new Set(["10th pass", "12th pass", "iti", "diploma", "graduate"]);
const QUALIFICATION_SIGNALS = [
  "10th",
  "high school",
  "matric",
  "12th",
  "intermediate",
  "iti",
  "diploma",
  "graduate",
  "graduation",
  "bachelor",
  "degree",
  "b.sc",
  "b.tech",
  "b.e",
  "master",
  "postgraduate",
  "law",
  "nursing",
  "gnm",
  "engineering",
  "agriculture",
  "b.ed",
  "net",
  "tet",
  "pet"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function normalizeQualificationForCheck(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.:-]+$/g, "")
    .trim();
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

function validateQualificationValue(value) {
  const text = normalizeText(value);
  const normalized = normalizeQualificationForCheck(text);
  if (isPlaceholderQualification(value)) {
    return { valid: false, weak: false, reason: normalized ? "placeholder qualification" : "empty qualification" };
  }
  if (normalized.length < 12 && !ACCEPTED_SHORT_QUALIFICATIONS.has(normalized)) {
    return { valid: false, weak: true, reason: "qualification is too short" };
  }
  const hasSignal = QUALIFICATION_SIGNALS.some((signal) => normalized.includes(signal));
  if (!hasSignal) return { valid: false, weak: true, reason: "qualification has no clear education signal" };
  return { valid: true, weak: false, reason: "valid qualification" };
}

function isPlaceholderQualification(value) {
  const normalized = normalizeQualificationForCheck(value);
  if (!normalized || PLACEHOLDER_QUALIFICATIONS.has(normalized)) return true;
  return [
    "view details",
    "read official notification",
    "read the official notification",
    "check notification",
    "check official notification"
  ].some((placeholder) => normalized.includes(placeholder));
}

function inferQualificationFallback(record) {
  const haystack = normalizeQualificationForCheck([
    record.title,
    record.category,
    record.department
  ].filter(Boolean).join(" "));

  if (/\b(police|constable)\b/.test(haystack)) {
    return "Class 10/12 or equivalent eligibility with physical standards as per official notification.";
  }
  if (/\b(ssc cgl|graduate level)\b/.test(haystack)) {
    return "Graduate degree from a recognized university as per official notification.";
  }
  if (/\b(teaching|teacher|lecturer|school|education|b\.ed|tet)\b/.test(haystack)) {
    return "Degree, B.Ed, TET or post-wise teaching qualification as per official notification.";
  }
  if (/\b(technical|technician|engineer|engineering|scientist|science|telecom|laboratory)\b/.test(haystack)) {
    return "Relevant diploma, engineering degree, science degree or technical qualification as per official notification.";
  }
  if (/\b(apprentice|apprenticeship)\b/.test(haystack)) {
    return "ITI, diploma, graduation or trade-wise qualification as per official notification.";
  }
  if (/\b(bank|banking|ibps|sbi|rbi|nabard|financial|finance)\b/.test(haystack)) {
    return "Graduate degree or post-wise banking qualification as per official notification.";
  }
  return "Post-wise educational qualification as specified in the official notification.";
}

function sanitizeJobQualification(record) {
  const qualificationSummary = normalizeText(record.qualificationSummary);
  const qualification = normalizeText(record.qualification);
  const summaryValidation = validateQualificationValue(qualificationSummary);
  if (summaryValidation.valid) {
    return {
      ...record,
      qualification: qualificationSummary,
      needsReview: "no",
      qualificationSource: "qualificationSummary",
      __qualificationValidation: {
        originalQualification: qualification || qualificationSummary,
        publishedQualification: qualificationSummary,
        needsReview: "no",
        reason: "valid qualification summary",
        source: "qualificationSummary",
        usedFallback: false,
        blockedPlaceholder: false
      }
    };
  }

  const qualificationValidation = validateQualificationValue(qualification);
  if (qualificationValidation.valid) {
    return {
      ...record,
      qualification,
      needsReview: "no",
      qualificationSource: "qualification",
      __qualificationValidation: {
        originalQualification: qualification,
        publishedQualification: qualification,
        needsReview: "no",
        reason: "valid qualification",
        source: "qualification",
        usedFallback: false,
        blockedPlaceholder: false
      }
    };
  }

  const fallback = inferQualificationFallback(record);
  const reason = qualificationSummary
    ? `qualificationSummary ${summaryValidation.reason}; qualification ${qualificationValidation.reason}`
    : qualificationValidation.reason;
  return {
    ...record,
    qualification: fallback,
    needsReview: "yes",
    qualificationSource: "fallback",
    __qualificationValidation: {
      originalQualification: qualification || qualificationSummary,
      publishedQualification: fallback,
      needsReview: "yes",
      reason,
      source: "fallback",
      usedFallback: true,
      blockedPlaceholder: !qualification || PLACEHOLDER_QUALIFICATIONS.has(normalizeQualificationForCheck(qualification))
    }
  };
}

function sanitizeJobRecords(records) {
  const rows = [];
  const sanitizedRecords = records.map((record) => {
    const sanitized = sanitizeJobQualification(record);
    rows.push({
      id: sanitized.id,
      title: sanitized.title,
      originalQualification: sanitized.__qualificationValidation.originalQualification,
      publishedQualification: sanitized.__qualificationValidation.publishedQualification,
      needsReview: sanitized.__qualificationValidation.needsReview,
      reason: sanitized.__qualificationValidation.reason,
      source: sanitized.__qualificationValidation.source
    });
    delete sanitized.__qualificationValidation;
    return sanitized;
  });
  return { records: sanitizedRecords, rows };
}

function buildSheetValidationReport(sourceLabel, records, rows) {
  const fallbackRows = rows.filter((row) => row.source === "fallback");
  const blockedRows = rows.filter((row) => isPlaceholderQualification(row.originalQualification));
  return {
    generatedAt: new Date().toISOString(),
    source: sourceLabel,
    totalJobs: records.length,
    validQualifications: rows.filter((row) => row.needsReview === "no").length,
    fallbackQualifications: fallbackRows.length,
    invalidPlaceholdersBlocked: blockedRows.length,
    needsReview: rows.filter((row) => row.needsReview === "yes").length,
    rows
  };
}

function writeSheetValidationReport(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(SHEET_VALIDATION_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Validation report: ${path.relative(ROOT_DIR, SHEET_VALIDATION_REPORT_PATH)}`);
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
  let records = rawItems
    .map((record) => normalizeRecord(record, source.fields))
    .filter((record) => record.id && record.title);

  if (!records.length) {
    console.warn(`${source.label}: No valid records found. Existing file was not overwritten.`);
    return false;
  }

  if (source.apiType === "jobs") {
    const sanitized = sanitizeJobRecords(records);
    records = sanitized.records;
    writeSheetValidationReport(buildSheetValidationReport(source.label, records, sanitized.rows));
  }

  const content = buildJs(source.globalVariable, sortRecords(records), source.label);
  return writeIfChanged(source.outputFile, content);
}

function extractGeneratedJobs(content) {
  const match = content.match(/window\.GovJobUpdatesJobs\s*=\s*(\[[\s\S]*?\]);?\s*$/);
  if (!match) throw new Error("Could not parse JS/jobs-data.js.");
  return JSON.parse(match[1]);
}

function validateGeneratedSheetData() {
  const jobsPath = path.join(ROOT_DIR, "JS", "jobs-data.js");
  if (!fs.existsSync(jobsPath)) throw new Error("JS/jobs-data.js does not exist.");
  if (!fs.existsSync(SHEET_VALIDATION_REPORT_PATH)) throw new Error("reports/sheet-validation-report.json does not exist.");

  const jobs = extractGeneratedJobs(fs.readFileSync(jobsPath, "utf8"));
  const placeholders = jobs.filter((job) => isPlaceholderQualification(job.qualification));
  if (placeholders.length) {
    throw new Error(`Found ${placeholders.length} placeholder or weak qualifications in JS/jobs-data.js.`);
  }

  const report = readJson(SHEET_VALIDATION_REPORT_PATH);
  if (!Array.isArray(report.rows)) throw new Error("Validation report rows array is missing.");
  const fallbackRows = report.rows.filter((row) => row.source === "fallback");
  if (Number(report.fallbackQualifications || 0) !== fallbackRows.length) {
    throw new Error("Validation report fallbackQualifications count does not match rows.");
  }
  const missingReviewFlag = jobs.filter((job) => job.qualificationSource === "fallback" && job.needsReview !== "yes");
  if (missingReviewFlag.length) {
    throw new Error("Fallback qualification rows must include needsReview: yes.");
  }
  console.log(`Sheet data validation passed. Jobs: ${jobs.length}. Fallback rows: ${fallbackRows.length}.`);
}

function buildVersion() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}-${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}`;
}

async function main() {
  if (process.argv.includes("--validate-sheet-data")) {
    validateGeneratedSheetData();
    return;
  }

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
