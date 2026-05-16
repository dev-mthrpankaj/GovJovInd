const CONTENT_SPREADSHEET_ID = "1dRnOLInUsS73ejKj86xh0AHsckqMFoKz6kDRJ4updRo";
const CONTENT_ADMIN_TOKEN = "gju-live-test-20260506-8f4c2b91";

const CONTENT_SHEETS = {
  jobs: {
    sheetName: "Latest Jobs",
    idPrefix: "job-sheet",
    fields: [
      ["ID", "id"],
      ["Title", "title"],
      ["Organization", "organization"],
      ["Department", "department"],
      ["Category", "category"],
      ["Year", "year"],
      ["Qualification", "qualification"],
      ["Total Posts", "totalPosts"],
      ["Start Date", "startDate", "date"],
      ["Last Date", "lastDate", "date"],
      ["Status", "status"],
      ["Tags", "tags", "tags"],
      ["Apply Link", "applyLink", "link"],
      ["Official Notification", "officialNotification", "link"],
      ["Detail Page", "detailPage", "link"],
      ["Updated At", "updatedAt", "date"]
    ]
  },
  admitCards: {
    sheetName: "Admit Cards",
    idPrefix: "admit-sheet",
    fields: [
      ["ID", "id"],
      ["Title", "title"],
      ["Organization", "organization"],
      ["Department", "department"],
      ["Category", "category"],
      ["Year", "year"],
      ["Exam Date", "examDate", "date"],
      ["Release Date", "releaseDate", "date"],
      ["Status", "status"],
      ["Tags", "tags", "tags"],
      ["Download Link", "downloadLink", "link"],
      ["Detail Page", "detailPage", "link"],
      ["Updated At", "updatedAt", "date"]
    ]
  },
  results: {
    sheetName: "Results",
    idPrefix: "result-sheet",
    fields: [
      ["ID", "id"],
      ["Title", "title"],
      ["Organization", "organization"],
      ["Department", "department"],
      ["Category", "category"],
      ["Year", "year"],
      ["Result Date", "resultDate", "date"],
      ["Status", "status"],
      ["Tags", "tags", "tags"],
      ["Result Link", "resultLink", "link"],
      ["Detail Page", "detailPage", "link"],
      ["Updated At", "updatedAt", "date"]
    ]
  },
  answerKeys: {
    sheetName: "Answer Keys",
    idPrefix: "answerkey-sheet",
    fields: [
      ["ID", "id"],
      ["Title", "title"],
      ["Organization", "organization"],
      ["Department", "department"],
      ["Category", "category"],
      ["Year", "year"],
      ["Exam Date", "examDate", "date"],
      ["Release Date", "releaseDate", "date"],
      ["Objection Last Date", "objectionLastDate", "date"],
      ["Status", "status"],
      ["Tags", "tags", "tags"],
      ["Download Link", "downloadLink", "link"],
      ["Objection Link", "objectionLink", "link"],
      ["Detail Page", "detailPage", "link"],
      ["Updated At", "updatedAt", "date"]
    ]
  }
};

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const action = String(params.action || "").trim();
    if (action) return handleContentAdminAction(action, params);

    const type = String(e && e.parameter && e.parameter.type || "all").trim();
    if (type === "all") return sendContentJson(buildAllContent());
    if (!CONTENT_SHEETS[type]) return sendContentJson({ success: false, message: "Invalid content type." });

    const result = getContentResult(type);
    const response = {
      success: true,
      updatedAt: new Date().toISOString(),
      meta: result.meta
    };
    response[type] = result.items;
    return sendContentJson(response);
  } catch (error) {
    return sendContentJson({
      success: false,
      message: error.message
    });
  }
}

function handleContentAdminAction(action, params) {
  if (!isValidContentAdminToken(params.token)) {
    return sendContentJson({
      success: false,
      message: "Unauthorized admin action."
    });
  }

  if (action === "addTestRows") {
    return sendContentJson(addContentLiveTestRows());
  }

  if (action === "removeTestRows") {
    return sendContentJson(removeContentLiveTestRows());
  }

  return sendContentJson({
    success: false,
    message: "Invalid admin action."
  });
}

function isValidContentAdminToken(token) {
  return String(token || "") === CONTENT_ADMIN_TOKEN;
}

function setupContentSheets() {
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  Object.keys(CONTENT_SHEETS).forEach(function (type) {
    const config = CONTENT_SHEETS[type];
    const sheet = getOrCreateContentSheet(spreadsheet, config);
    ensureContentHeaders(sheet, config);
  });
}

function addContentLiveTestRows() {
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  const today = formatContentDate(new Date());
  const testItems = buildContentLiveTestItems(today);
  const summary = {};

  Object.keys(testItems).forEach(function (type) {
    const config = CONTENT_SHEETS[type];
    const sheet = getOrCreateContentSheet(spreadsheet, config);
    ensureContentHeaders(sheet, config);
    removeContentRowsById(sheet, "gju-live-test-" + type);
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, getContentHeaders(config).length)
      .setValues([buildContentRowFromItem(testItems[type], config, 1)]);
    applyContentSheetFormatting(sheet, getContentHeaders(config).length);

    summary[type] = {
      inserted: 1,
      id: testItems[type].id,
      title: testItems[type].title,
      totalRows: Math.max(sheet.getLastRow() - 1, 0)
    };
  });

  return {
    success: true,
    action: "addTestRows",
    updatedAt: new Date().toISOString(),
    summary: summary
  };
}

function removeContentLiveTestRows() {
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  const summary = {};

  Object.keys(CONTENT_SHEETS).forEach(function (type) {
    const config = CONTENT_SHEETS[type];
    const sheet = getOrCreateContentSheet(spreadsheet, config);
    ensureContentHeaders(sheet, config);
    summary[type] = {
      removed: removeContentRowsById(sheet, "gju-live-test-" + type),
      totalRows: Math.max(sheet.getLastRow() - 1, 0)
    };
  });

  return {
    success: true,
    action: "removeTestRows",
    updatedAt: new Date().toISOString(),
    summary: summary
  };
}

function buildContentLiveTestItems(today) {
  return {
    jobs: {
      id: "gju-live-test-jobs",
      title: "TEST LIVE JOB FROM GOOGLE SHEET",
      organization: "GovJobUpdates Test",
      department: "Testing",
      category: "Testing",
      year: "2026",
      qualification: "Not specified",
      totalPosts: "1",
      startDate: today,
      lastDate: today,
      status: "active",
      tags: ["Live Test", "Google Sheet"],
      applyLink: "#",
      officialNotification: "#",
      detailPage: "",
      updatedAt: today
    },
    admitCards: {
      id: "gju-live-test-admitCards",
      title: "TEST LIVE ADMIT CARD FROM GOOGLE SHEET",
      organization: "GovJobUpdates Test",
      department: "Testing",
      category: "Admit Card",
      year: "2026",
      examDate: today,
      releaseDate: today,
      status: "available",
      tags: ["Live Test", "Google Sheet"],
      downloadLink: "#",
      detailPage: "",
      updatedAt: today
    },
    results: {
      id: "gju-live-test-results",
      title: "TEST LIVE RESULT FROM GOOGLE SHEET",
      organization: "GovJobUpdates Test",
      department: "Testing",
      category: "Result",
      year: "2026",
      resultDate: today,
      status: "released",
      tags: ["Live Test", "Google Sheet"],
      resultLink: "#",
      detailPage: "",
      updatedAt: today
    },
    answerKeys: {
      id: "gju-live-test-answerKeys",
      title: "TEST LIVE ANSWER KEY FROM GOOGLE SHEET",
      organization: "GovJobUpdates Test",
      department: "Testing",
      category: "Answer Key",
      year: "2026",
      examDate: today,
      releaseDate: today,
      objectionLastDate: today,
      status: "available",
      tags: ["Live Test", "Google Sheet"],
      downloadLink: "#",
      objectionLink: "#",
      detailPage: "",
      updatedAt: today
    }
  };
}

function buildContentRowFromItem(item, config, order) {
  const values = config.fields.map(function (fieldConfig) {
    return normalizeContentCellValue(item[fieldConfig[1]]);
  });
  return ["yes", order].concat(values);
}

function normalizeContentCellValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value === undefined || value === null ? "" : String(value);
}

function buildAllContent() {
  const response = {
    success: true,
    updatedAt: new Date().toISOString(),
    meta: {}
  };
  Object.keys(CONTENT_SHEETS).forEach(function (type) {
    const result = getContentResult(type);
    response[type] = result.items;
    response.meta[type] = result.meta;
  });
  return response;
}

function getContentItems(type) {
  return getContentResult(type).items;
}

function getContentResult(type) {
  const config = CONTENT_SHEETS[type];
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  const sheet = getOrCreateContentSheet(spreadsheet, config);
  ensureContentHeaders(sheet, config);
  const meta = {
    sheetName: config.sheetName,
    totalRows: Math.max(sheet.getLastRow() - 1, 0),
    publishedRows: 0,
    unpublishedRows: 0,
    missingTitleRows: 0,
    blankRows: 0
  };
  if (sheet.getLastRow() < 2) return { items: [], meta: meta };

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastColumn);
  const values = range.getValues();
  const richTextValues = range.getRichTextValues();
  const formulas = range.getFormulas();
  const headerMap = buildContentHeaderMap(values[0]);

  const items = values.slice(1)
    .map(function (row, index) {
      return buildContentItem(row, headerMap, config, index + 2, richTextValues[index + 1], formulas[index + 1]);
    })
    .filter(function (item) {
      if (!item || !hasContentItemData(item, config)) {
        meta.blankRows += 1;
        return false;
      }
      if (!isPublished(item.__published)) {
        meta.unpublishedRows += 1;
        return false;
      }
      if (!item.title) {
        meta.missingTitleRows += 1;
        return false;
      }
      meta.publishedRows += 1;
      return true;
    })
    .map(function (item) {
      delete item.__published;
      delete item.__order;
      delete item.__hasRowData;
      return item;
    })
    .sort(sortContentItems);

  return { items: items, meta: meta };
}

function getOrCreateContentSheet(spreadsheet, config) {
  const sheet = spreadsheet.getSheetByName(config.sheetName) || spreadsheet.insertSheet(config.sheetName);
  const headers = getContentHeaders(config);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  applyContentSheetFormatting(sheet, headers.length);
  return sheet;
}

function ensureContentHeaders(sheet, config) {
  const requiredHeaders = getContentHeaders(config);
  const currentHeaders = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    : [];
  const hasAnyHeader = currentHeaders.some(function (header) {
    return String(header || "").trim();
  });
  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, requiredHeaders.length).setValues([requiredHeaders]);
    applyContentSheetFormatting(sheet, requiredHeaders.length);
    return;
  }

  const currentMap = buildContentHeaderMap(currentHeaders);
  const missingHeaders = requiredHeaders.filter(function (header) {
    return currentMap[normalizeContentHeader(header)] === undefined;
  });

  if (!missingHeaders.length) return;

  const startColumn = sheet.getLastColumn() + 1;
  sheet.insertColumnsAfter(sheet.getLastColumn(), missingHeaders.length);
  sheet.getRange(1, startColumn, 1, missingHeaders.length).setValues([missingHeaders]);
  applyContentSheetFormatting(sheet, sheet.getLastColumn());
}

function applyContentSheetFormatting(sheet, columnCount) {
  sheet.setFrozenRows(1);
  if (columnCount > 0) sheet.autoResizeColumns(1, columnCount);
}

function removeContentRowsById(sheet, id) {
  const headerMap = buildContentHeaderMap(sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]);
  const idIndex = headerMap[normalizeContentHeader("ID")];
  if (idIndex === undefined || sheet.getLastRow() < 2) return 0;

  const rowCount = sheet.getLastRow() - 1;
  const idValues = sheet.getRange(2, idIndex + 1, rowCount, 1).getValues();
  let removed = 0;

  for (let index = idValues.length - 1; index >= 0; index -= 1) {
    if (String(idValues[index][0] || "").trim() === id) {
      sheet.deleteRow(index + 2);
      removed += 1;
    }
  }

  return removed;
}

function getContentHeaders(config) {
  return ["Published", "Order"].concat(config.fields.map(function (field) {
    return field[0];
  }));
}

function buildContentItem(row, headerMap, config, rowNumber, richTextRow, formulaRow) {
  const item = {
    __published: getCellByHeader(row, headerMap, "Published"),
    __order: toNumber(getCellByHeader(row, headerMap, "Order")),
    __hasRowData: false
  };

  config.fields.forEach(function (fieldConfig) {
    const header = fieldConfig[0];
    const field = fieldConfig[1];
    const type = fieldConfig[2] || "text";
    const columnIndex = getHeaderIndex(headerMap, header);
    const value = getCellByHeader(row, headerMap, header);
    const richTextValue = columnIndex === undefined || !richTextRow ? null : richTextRow[columnIndex];
    const formula = columnIndex === undefined || !formulaRow ? "" : formulaRow[columnIndex];
    const normalizedValue = normalizeContentValue(value, type, richTextValue, formula);
    item[field] = normalizedValue;
    if (hasEnteredContentValue(normalizedValue)) item.__hasRowData = true;
  });

  if (!item.id) item.id = config.idPrefix + "-" + rowNumber;
  if (!item.updatedAt) item.updatedAt = formatContentDate(new Date());
  if (!item.status) item.status = "active";
  if (!Array.isArray(item.tags)) item.tags = [];

  return item;
}

function hasContentItemData(item, config) {
  return Boolean(item.__hasRowData);
}

function hasEnteredContentValue(value) {
  return Array.isArray(value) ? value.length > 0 : Boolean(String(value || "").trim());
}

function getCellByHeader(row, headerMap, header) {
  const index = getHeaderIndex(headerMap, header);
  return index === undefined ? "" : row[index];
}

function getHeaderIndex(headerMap, header) {
  return headerMap[normalizeContentHeader(header)];
}

function normalizeContentValue(value, type, richTextValue, formula) {
  if (type === "date") return formatContentDate(value);
  if (type === "tags") return splitContentTags(value);
  if (type === "link") return normalizeContentLinkValue(value, richTextValue, formula);
  return String(value === undefined || value === null ? "" : value).trim();
}

function normalizeContentLinkValue(value, richTextValue, formula) {
  return getRichTextLinkUrl(richTextValue)
    || getHyperlinkFormulaUrl(formula)
    || String(value === undefined || value === null ? "" : value).trim();
}

function getRichTextLinkUrl(richTextValue) {
  if (!richTextValue || typeof richTextValue.getLinkUrl !== "function") return "";

  try {
    const cellLink = richTextValue.getLinkUrl();
    if (cellLink) return String(cellLink).trim();
  } catch (error) {
    // Rich text without a single whole-cell link can still contain linked runs.
  }

  if (typeof richTextValue.getRuns !== "function") return "";

  try {
    const runs = richTextValue.getRuns();
    for (let index = 0; index < runs.length; index += 1) {
      const run = runs[index];
      const runLink = run && typeof run.getLinkUrl === "function" ? run.getLinkUrl() : "";
      if (runLink) return String(runLink).trim();
    }
  } catch (error) {
    return "";
  }

  return "";
}

function getHyperlinkFormulaUrl(formula) {
  const text = String(formula || "").trim();
  if (!text) return "";

  const doubleQuotedMatch = text.match(/^=\s*HYPERLINK\s*\(\s*"((?:[^"]|"")*)"/i);
  if (doubleQuotedMatch) return doubleQuotedMatch[1].replace(/""/g, '"').trim();

  const singleQuotedMatch = text.match(/^=\s*HYPERLINK\s*\(\s*'((?:[^']|'')*)'/i);
  if (singleQuotedMatch) return singleQuotedMatch[1].replace(/''/g, "'").trim();

  return "";
}

function formatContentDate(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(value).trim();
}

function splitContentTags(value) {
  if (Array.isArray(value)) return value.map(String).map(trimContentText).filter(Boolean);
  return String(value || "")
    .split(/[,|]/)
    .map(trimContentText)
    .filter(Boolean);
}

function trimContentText(value) {
  return String(value || "").trim();
}

function isPublished(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return !["no", "false", "0", "hidden", "draft"].includes(normalized);
}

function sortContentItems(first, second) {
  const firstOrder = Number(first.__order);
  const secondOrder = Number(second.__order);
  if (Number.isFinite(firstOrder) && Number.isFinite(secondOrder) && firstOrder !== secondOrder) {
    return firstOrder - secondOrder;
  }
  if (Number.isFinite(firstOrder)) return -1;
  if (Number.isFinite(secondOrder)) return 1;
  return parseContentDate(second.updatedAt) - parseContentDate(first.updatedAt);
}

function parseContentDate(value) {
  const date = new Date(String(value || "") + "T00:00:00");
  const time = date.getTime();
  return Number.isNaN(time) ? 0 : time;
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function buildContentHeaderMap(headers) {
  const map = {};
  headers.forEach(function (header, index) {
    const key = normalizeContentHeader(header);
    if (key) map[key] = index;
  });
  return map;
}

function normalizeContentHeader(value) {
  return String(value || "").trim().toLowerCase();
}

function sendContentJson(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
