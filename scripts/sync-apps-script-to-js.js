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
  },
  {
    file: "HTML/rank-predictor.html",
    scripts: ["rank-predictor-exams-data", "rank-predictor-config", "rank-predictor"]
  }
];

const REPORT_DIR = path.join(ROOT_DIR, "reports");
const SHEET_PREFLIGHT_REPORT_PATH = path.join(REPORT_DIR, "sheet-preflight-report.json");
const SHEET_VALIDATION_REPORT_PATH = path.join(REPORT_DIR, "sheet-validation-report.json");
const SHEET_LINK_VALIDATION_REPORT_PATH = path.join(REPORT_DIR, "sheet-link-validation-report.json");
const GENERATED_DATA_FILES = {
  jobs: { file: path.join(ROOT_DIR, "JS", "jobs-data.js"), globalVariable: "GovJobUpdatesJobs" },
  admitCards: { file: path.join(ROOT_DIR, "JS", "admitcard-data.js"), globalVariable: "GovJobUpdatesAdmitCards" },
  answerKeys: { file: path.join(ROOT_DIR, "JS", "answerkey-data.js"), globalVariable: "GovJobUpdatesAnswerKeys" },
  results: { file: path.join(ROOT_DIR, "JS", "results-data.js"), globalVariable: "GovJobUpdatesResults" }
};
const DETAIL_PAGE_FALLBACKS = {
  jobs: (record) => `../Job_Details/HTML/job-details.html?id=${encodeURIComponent(String(record.id || "").replace(/^job-/, ""))}`,
  admitCards: () => "../HTML/admitcard.html",
  answerKeys: () => "../HTML/answer-key.html",
  results: () => "../HTML/results.html"
};
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
const DATE_FIELDS = new Set([
  "startDate",
  "lastDate",
  "examDate",
  "examEndDate",
  "releaseDate",
  "objectionLastDate",
  "resultDate",
  "updatedAt"
]);
const OFFICIAL_LINK_FIELDS = new Set([
  "applyLink",
  "officialNotification",
  "downloadLink",
  "objectionLink",
  "resultLink"
]);
const TELEGRAM_READY_VALUES = new Set(["yes", "no"]);
const TELEGRAM_STATUS_VALUES = new Set(["draft", "ready", "posted", "skipped"]);
const REQUIRED_FIELD_RULES = {
  jobs: [
    ["id"],
    ["title"],
    ["organization"],
    ["category"],
    ["status"],
    ["updatedAt"]
  ],
  admitCards: [
    ["id"],
    ["title"],
    ["organization"],
    ["examDate", "releaseDate"],
    ["status"],
    ["updatedAt"]
  ],
  answerKeys: [
    ["id"],
    ["title"],
    ["organization"],
    ["examDate", "releaseDate"],
    ["status"],
    ["updatedAt"]
  ],
  results: [
    ["id"],
    ["title"],
    ["organization"],
    ["resultDate"],
    ["status"],
    ["updatedAt"]
  ]
};

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

function sanitizeOfficialLinkValue(value) {
  const text = normalizeText(value);
  return getDangerousLinkReason(text) ? "" : text;
}

function normalizeRecord(record, fields) {
  const output = {};
  fields.forEach((field) => {
    if (field === "tags") {
      output[field] = normalizeTags(record[field]);
    } else if (OFFICIAL_LINK_FIELDS.has(field)) {
      output[field] = sanitizeOfficialLinkValue(record[field]);
    } else {
      output[field] = normalizeText(record[field]);
    }
  });
  return output;
}

function getRecordLabel(record, index) {
  const id = normalizeText(record.id);
  return id || `row ${index + 2}`;
}

function formatRequiredFieldLabel(fields) {
  return fields.length === 1 ? fields[0] : fields.join(" or ");
}

function isValidIsoDate(value) {
  const text = normalizeText(value);
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day;
}

function normalizeTelegramFields(record) {
  const output = { ...record };
  ["telegramReady", "telegramStatus"].forEach((field) => {
    if (normalizeText(output[field])) output[field] = normalizeText(output[field]).toLowerCase();
  });
  return output;
}

function getDangerousLinkReason(value) {
  const text = normalizeText(value);
  if (!text || text === "#") return "";
  if (/[\u0000-\u001f\u007f]/.test(text)) return "contains control characters";
  if (/^(javascript|data|mailto|tel|sms):/i.test(text)) return "uses a blocked protocol";
  if (/^https?:\/\//i.test(text)) return "";
  return "must be empty, #, http://, or https://";
}

function buildEmptyPreflightReport() {
  return {
    generatedAt: new Date().toISOString(),
    totals: {},
    warnings: [],
    errors: [],
    duplicateIds: [],
    missingRequiredFields: [],
    invalidDates: [],
    invalidTelegramValues: [],
    dangerousLinks: []
  };
}

function addPreflightError(report, bucket, entry, message) {
  report[bucket].push(entry);
  report.errors.push(message);
}

function collectPreflightIssues(source, records, report) {
  const type = source.apiType;
  report.totals[type] = records.length;

  const ids = new Map();
  records.forEach((record, index) => {
    const id = normalizeText(record.id);
    if (!id) return;
    if (!ids.has(id)) ids.set(id, []);
    ids.get(id).push(index);
  });

  ids.forEach((indexes, id) => {
    if (indexes.length < 2) return;
    const entry = {
      type,
      label: source.label,
      id,
      rows: indexes.map((index) => index + 2)
    };
    addPreflightError(
      report,
      "duplicateIds",
      entry,
      `${source.label}: duplicate id "${id}" found in rows ${entry.rows.join(", ")}.`
    );
  });

  const requiredRules = REQUIRED_FIELD_RULES[type] || [];
  records.forEach((record, index) => {
    const missingFields = requiredRules
      .filter((fields) => !fields.some((field) => normalizeText(record[field])))
      .map(formatRequiredFieldLabel);

    if (missingFields.length) {
      const entry = {
        type,
        label: source.label,
        id: normalizeText(record.id),
        row: index + 2,
        item: getRecordLabel(record, index),
        missingFields
      };
      addPreflightError(
        report,
        "missingRequiredFields",
        entry,
        `${source.label}: ${entry.item} is missing required field(s): ${missingFields.join(", ")}.`
      );
    }

    Object.entries(record).forEach(([field, value]) => {
      const text = normalizeText(value);
      if (DATE_FIELDS.has(field) && text && !isValidIsoDate(text)) {
        const entry = {
          type,
          label: source.label,
          id: normalizeText(record.id),
          row: index + 2,
          field,
          value: text
        };
        addPreflightError(
          report,
          "invalidDates",
          entry,
          `${source.label}: ${getRecordLabel(record, index)} has invalid ${field} "${text}". Use YYYY-MM-DD.`
        );
      }

      if (OFFICIAL_LINK_FIELDS.has(field)) {
        const reason = getDangerousLinkReason(value);
        if (reason) {
          const entry = {
            type,
            label: source.label,
            id: normalizeText(record.id),
            row: index + 2,
            field,
            value: text,
            reason
          };
          addPreflightError(
            report,
            "dangerousLinks",
            entry,
            `${source.label}: ${getRecordLabel(record, index)} has blocked ${field} "${text}" (${reason}).`
          );
        }
      }
    });

    const telegramReady = normalizeText(record.telegramReady);
    if (telegramReady && !TELEGRAM_READY_VALUES.has(telegramReady)) {
      const entry = {
        type,
        label: source.label,
        id: normalizeText(record.id),
        row: index + 2,
        field: "telegramReady",
        value: telegramReady
      };
      addPreflightError(
        report,
        "invalidTelegramValues",
        entry,
        `${source.label}: ${getRecordLabel(record, index)} has invalid telegramReady "${telegramReady}".`
      );
    }

    const telegramStatus = normalizeText(record.telegramStatus);
    if (telegramStatus && !TELEGRAM_STATUS_VALUES.has(telegramStatus)) {
      const entry = {
        type,
        label: source.label,
        id: normalizeText(record.id),
        row: index + 2,
        field: "telegramStatus",
        value: telegramStatus
      };
      addPreflightError(
        report,
        "invalidTelegramValues",
        entry,
        `${source.label}: ${getRecordLabel(record, index)} has invalid telegramStatus "${telegramStatus}".`
      );
    }
  });
}

function writeSheetPreflightReport(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(SHEET_PREFLIGHT_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Preflight report: ${path.relative(ROOT_DIR, SHEET_PREFLIGHT_REPORT_PATH)}`);
}

function printPreflightErrors(report) {
  const printBlock = (entry, lines) => {
    const label = entry.label || entry.type || "Sheet";
    console.error(`ERROR [${label}] Row ID: ${entry.id || entry.item || "missing"}`);
    lines.filter(Boolean).forEach((line) => console.error(line));
  };

  report.duplicateIds.forEach((entry) => {
    printBlock(entry, [
      `Field: id`,
      `Value: ${entry.id}`,
      `Rows: ${entry.rows.join(", ")}`,
      "Reason: Duplicate ID"
    ]);
  });

  report.missingRequiredFields.forEach((entry) => {
    printBlock(entry, [
      `Row: ${entry.row}`,
      `Field: ${entry.missingFields.join(", ")}`,
      "Value: ",
      "Reason: Missing required field"
    ]);
  });

  report.invalidDates.forEach((entry) => {
    printBlock(entry, [
      `Row: ${entry.row}`,
      `Field: ${entry.field}`,
      `Value: ${entry.value}`,
      "Reason: Invalid date format. Expected YYYY-MM-DD"
    ]);
  });

  report.invalidTelegramValues.forEach((entry) => {
    printBlock(entry, [
      `Row: ${entry.row}`,
      `Field: ${entry.field}`,
      `Value: ${entry.value}`,
      "Reason: Invalid Telegram value"
    ]);
  });

  report.dangerousLinks.forEach((entry) => {
    printBlock(entry, [
      `Row: ${entry.row}`,
      `Field: ${entry.field}`,
      `Value: ${entry.value}`,
      `Reason: ${entry.reason}`
    ]);
  });
}

function validateSheetPreflight() {
  if (!fs.existsSync(SHEET_PREFLIGHT_REPORT_PATH)) {
    console.log("Sheet preflight validation passed. No preflight report exists yet; live sync creates it before writing generated data.");
    return;
  }
  const report = readJson(SHEET_PREFLIGHT_REPORT_PATH);
  if (!report || !Array.isArray(report.errors)) throw new Error("Preflight report errors array is missing.");
  if (report.errors.length) {
    printPreflightErrors(report);
    throw new Error(`Sheet preflight failed with ${report.errors.length} error(s):\n${report.errors.join("\n")}`);
  }
  console.log("Sheet preflight validation passed.");
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

function stripUrlFragmentAndQuery(value) {
  return String(value || "").split("#")[0].split("?")[0].trim();
}

function decodeLocalPath(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function isExternalLink(value) {
  return /^(https?:)?\/\//i.test(value);
}

function isMalformedDetailPage(value) {
  if (!value) return true;
  if (/[\u0000-\u001f]/.test(value)) return true;
  if (/\.html\.html(?:$|[?#])/i.test(value)) return true;
  if (/^(mailto:|tel:|sms:|javascript:|data:)/i.test(value)) return true;
  return false;
}

function localDetailPageExists(rawTarget) {
  const clean = stripUrlFragmentAndQuery(rawTarget);
  if (!clean || isExternalLink(clean)) return false;
  const decoded = decodeLocalPath(clean);
  const absolute = decoded.startsWith("/")
    ? path.join(ROOT_DIR, decoded.slice(1))
    : path.resolve(ROOT_DIR, "JS", decoded);
  return fs.existsSync(absolute)
    || fs.existsSync(`${absolute}.html`)
    || fs.existsSync(path.join(absolute, "index.html"));
}

function getDetailPageFallback(record, contentType) {
  const fallback = DETAIL_PAGE_FALLBACKS[contentType];
  return fallback ? fallback(record) : "";
}

function getDetailPageValidationReason(detailPage) {
  const value = normalizeText(detailPage);
  if (!value) return "empty detailPage";
  if (/\.html\.html(?:$|[?#])/i.test(value)) return ".html.html detailPage";
  if (isMalformedDetailPage(value)) return "malformed detailPage";
  if (isExternalLink(value)) return "external detailPage is not allowed for listing detail pages";
  if (!localDetailPageExists(value)) return "missing local detailPage target";
  return "valid detailPage";
}

function sanitizeDetailPage(record, contentType) {
  const originalDetailPage = normalizeText(record.detailPage);
  const reason = getDetailPageValidationReason(originalDetailPage);
  if (reason === "valid detailPage") {
    return {
      ...record,
      detailPage: originalDetailPage,
      detailPageSource: "sheet",
      detailPageNeedsReview: "no",
      __detailPageValidation: {
        originalDetailPage,
        publishedDetailPage: originalDetailPage,
        reason,
        detailPageNeedsReview: "no",
        source: "sheet"
      }
    };
  }

  const fallback = getDetailPageFallback(record, contentType);
  return {
    ...record,
    detailPage: fallback,
    detailPageSource: "fallback",
    detailPageNeedsReview: "yes",
    __detailPageValidation: {
      originalDetailPage,
      publishedDetailPage: fallback,
      reason,
      detailPageNeedsReview: "yes",
      source: "fallback"
    }
  };
}

function sanitizeDetailPageRecords(records, contentType) {
  const rows = [];
  const sanitizedRecords = records.map((record) => {
    const sanitized = sanitizeDetailPage(record, contentType);
    rows.push({
      type: contentType,
      id: sanitized.id,
      title: sanitized.title,
      originalDetailPage: sanitized.__detailPageValidation.originalDetailPage,
      publishedDetailPage: sanitized.__detailPageValidation.publishedDetailPage,
      reason: sanitized.__detailPageValidation.reason,
      detailPageNeedsReview: sanitized.__detailPageValidation.detailPageNeedsReview
    });
    delete sanitized.__detailPageValidation;
    return sanitized;
  });
  return { records: sanitizedRecords, rows };
}

function buildSheetLinkValidationReport(rows) {
  const fallbackRows = rows.filter((row) => row.detailPageNeedsReview === "yes");
  return {
    generatedAt: new Date().toISOString(),
    totalRecords: rows.length,
    validDetailPages: rows.filter((row) => row.detailPageNeedsReview === "no").length,
    fallbackDetailPages: fallbackRows.length,
    brokenLinksBlocked: fallbackRows.length,
    rows
  };
}

function writeSheetLinkValidationReport(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(SHEET_LINK_VALIDATION_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Link validation report: ${path.relative(ROOT_DIR, SHEET_LINK_VALIDATION_REPORT_PATH)}`);
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
  const pattern = new RegExp(`(<script\\s+src=["']\\.\\.\\/JS\\/${scriptName}\\.js)(?:\\?v=[^"']*)?(["'][^>]*><\\/script>)`, "gi");
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

async function fetchNormalizedRecords(apiUrl, source) {
  console.log(`Fetching ${source.label}...`);
  const sourceApiUrl = normalizeText(source.apiUrl) || apiUrl;
  const rawItems = await fetchItems(sourceApiUrl, source.apiType, source.payloadKey);
  const records = source.preserveFields
    ? rawItems.map((record) => (record && typeof record === "object" ? record : {}))
    : rawItems
      .map((record) => normalizeRecord(record, source.fields))
      .map(normalizeTelegramFields);

  return { source, records };
}

function prepareSyncOutput(source, records) {
  if (!records.length) {
    console.warn(`${source.label}: No valid records found. Existing file was not overwritten.`);
    return { source, content: "", qualificationReport: null, detailPageRows: [] };
  }

  if (source.preserveFields) {
    records = records.filter((record) => normalizeText(record.examId) && normalizeText(record.examName));
    if (!records.length) {
      console.warn(`${source.label}: No valid exam records found. Existing file was not overwritten.`);
      return { source, content: "", qualificationReport: null, detailPageRows: [] };
    }
    return {
      source,
      content: buildJs(source.globalVariable, records, source.label),
      qualificationReport: null,
      detailPageRows: []
    };
  }

  records = records.filter((record) => record.id && record.title);

  if (source.apiType === "jobs") {
    const sanitized = sanitizeJobRecords(records);
    records = sanitized.records;
    const detailPages = sanitizeDetailPageRecords(records, source.apiType);
    records = detailPages.records;
    return {
      source,
      content: buildJs(source.globalVariable, sortRecords(records), source.label),
      qualificationReport: buildSheetValidationReport(source.label, records, sanitized.rows),
      detailPageRows: detailPages.rows
    };
  }

  const detailPages = sanitizeDetailPageRecords(records, source.apiType);
  records = detailPages.records;

  return {
    source,
    content: buildJs(source.globalVariable, sortRecords(records), source.label),
    qualificationReport: null,
    detailPageRows: detailPages.rows
  };
}

function extractGeneratedJobs(content) {
  const match = content.match(/window\.GovJobUpdatesJobs\s*=\s*(\[[\s\S]*?\]);?\s*$/);
  if (!match) throw new Error("Could not parse JS/jobs-data.js.");
  return JSON.parse(match[1]);
}

function extractGeneratedRecords(content, globalVariable) {
  const pattern = new RegExp(`window\\.${globalVariable}\\s*=\\s*(\\[[\\s\\S]*?\\]);?\\s*$`);
  const match = content.match(pattern);
  if (!match) throw new Error(`Could not parse generated data for ${globalVariable}.`);
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

function validateGeneratedSheetLinks() {
  if (!fs.existsSync(SHEET_LINK_VALIDATION_REPORT_PATH)) {
    throw new Error("reports/sheet-link-validation-report.json does not exist.");
  }

  const report = readJson(SHEET_LINK_VALIDATION_REPORT_PATH);
  if (!Array.isArray(report.rows)) throw new Error("Link validation report rows array is missing.");
  const fallbackRows = report.rows.filter((row) => row.detailPageNeedsReview === "yes");
  if (Number(report.fallbackDetailPages || 0) !== fallbackRows.length) {
    throw new Error("Link validation report fallbackDetailPages count does not match rows.");
  }

  Object.entries(GENERATED_DATA_FILES).forEach(([type, config]) => {
    if (!fs.existsSync(config.file)) throw new Error(`${path.relative(ROOT_DIR, config.file)} does not exist.`);
    const records = extractGeneratedRecords(fs.readFileSync(config.file, "utf8"), config.globalVariable);
    const broken = records.filter((record) => getDetailPageValidationReason(record.detailPage) !== "valid detailPage");
    if (broken.length) throw new Error(`${type}: found ${broken.length} invalid generated detailPage values.`);
    const missingReviewFlag = records.filter((record) => record.detailPageSource === "fallback" && record.detailPageNeedsReview !== "yes");
    if (missingReviewFlag.length) throw new Error(`${type}: fallback detailPage rows must include detailPageNeedsReview: yes.`);
  });

  console.log(`Sheet link validation passed. Records: ${report.totalRecords}. Fallback detailPages: ${fallbackRows.length}.`);
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
  if (process.argv.includes("--validate-sheet-links")) {
    validateGeneratedSheetLinks();
    return;
  }
  if (process.argv.includes("--validate-sheet-preflight")) {
    validateSheetPreflight();
    return;
  }

  const config = readJson(CONFIG_PATH);
  const apiUrl = resolveApiUrl(config);
  if (!apiUrl) throw new Error("Missing Apps Script API URL. Set GJU_SHEET_API_URL, config.apiUrl, or JS/google-sheet-updates-config.js apiUrl.");

  let dataChanged = false;
  let failed = false;
  const preflightReport = buildEmptyPreflightReport();
  const fetchedSources = [];
  const detailPageRows = [];

  for (const source of config.sources) {
    try {
      const result = await fetchNormalizedRecords(apiUrl, source);
      fetchedSources.push(result);
      collectPreflightIssues(source, result.records, preflightReport);
    } catch (error) {
      failed = true;
      console.error(`Failed: ${source.label}: ${error.message}`);
    }
  }

  writeSheetPreflightReport(preflightReport);

  if (preflightReport.errors.length) {
    failed = true;
    printPreflightErrors(preflightReport);
    console.error(`Sheet preflight failed with ${preflightReport.errors.length} error(s). Generated JS files were not written.`);
  }

  if (!failed) {
    const preparedSources = fetchedSources.map(({ source, records }) => prepareSyncOutput(source, records));
    preparedSources.forEach((prepared) => {
      if (prepared.qualificationReport) writeSheetValidationReport(prepared.qualificationReport);
      if (prepared.content) {
        dataChanged = writeIfChanged(prepared.source.outputFile, prepared.content) || dataChanged;
      }
      detailPageRows.push(...prepared.detailPageRows);
    });

    if (detailPageRows.length) {
      writeSheetLinkValidationReport(buildSheetLinkValidationReport(detailPageRows));
    }
  }

  let htmlChanged = false;
  if (!failed && dataChanged) {
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
