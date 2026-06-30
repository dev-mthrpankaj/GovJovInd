const CONTENT_SPREADSHEET_ID = "1dRnOLInUsS73ejKj86xh0AHsckqMFoKz6kDRJ4updRo";
const CONTENT_ADMIN_TOKEN = "gju-live-test-20260506-8f4c2b91";

const TELEGRAM_SAFE_FIELDS = [
  ["Telegram Status", "telegramStatus"],
  ["Telegram Ready", "telegramReady"]
];

function withTelegramSafeFields(fields) {
  return (Array.isArray(fields) ? fields : []).concat(TELEGRAM_SAFE_FIELDS);
}

const CONTENT_SHEETS = {
  jobs: {
    sheetName: "Latest Jobs",
    idPrefix: "job-sheet",
    detailPrefix: "../Job_Details/HTML/",
    fields: withTelegramSafeFields([
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
    ])
  },
  admitCards: {
    sheetName: "Admit Cards",
    idPrefix: "admit-sheet",
    detailPrefix: "../AdmitCard_Details/HTML/",
    fields: withTelegramSafeFields([
      ["ID", "id"],
      ["Title", "title"],
      ["Organization", "organization"],
      ["Department", "department"],
      ["Category", "category"],
      ["Year", "year"],
      ["Exam Date", "examDate", "date"],
      ["Exam Day Over", "examEndDate", "date"],
      ["Release Date", "releaseDate", "date"],
      ["Status", "status"],
      ["Tags", "tags", "tags"],
      ["Download Link", "downloadLink", "link"],
      ["Detail Page", "detailPage", "link"],
      ["Updated At", "updatedAt", "date"]
    ])
  },
  results: {
    sheetName: "Results",
    idPrefix: "result-sheet",
    detailPrefix: "../Result_Details/HTML/",
    fields: withTelegramSafeFields([
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
    ])
  },
  answerKeys: {
    sheetName: "Answer Keys",
    idPrefix: "answerkey-sheet",
    detailPrefix: "../AnswerKey_Details/HTML/",
    fields: withTelegramSafeFields([
      ["ID", "id"],
      ["Title", "title"],
      ["Organization", "organization"],
      ["Department", "department"],
      ["Category", "category"],
      ["Year", "year"],
      ["Exam Date", "examDate", "date"],
      ["Exam Day Over", "examEndDate", "date"],
      ["Release Date", "releaseDate", "date"],
      ["Objection Last Date", "objectionLastDate", "date"],
      ["Status", "status"],
      ["Tags", "tags", "tags"],
      ["Download Link", "downloadLink", "link"],
      ["Objection Link", "objectionLink", "link"],
      ["Detail Page", "detailPage", "link"],
      ["Updated At", "updatedAt", "date"]
    ])
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
    return sendContentJson({ success: false, message: error.message });
  }
}

function doPost(e) {
  try {
    const payload = parseContentPostPayload(e);
    const params = Object.assign({}, e && e.parameter ? e.parameter : {}, payload);
    const action = String(params.action || "").trim();
    if (!action) return sendContentJson({ success: false, message: "Missing admin action." });
    return handleContentAdminAction(action, params);
  } catch (error) {
    return sendContentJson({ success: false, message: error.message });
  }
}

function parseContentPostPayload(e) {
  const text = e && e.postData && e.postData.contents ? String(e.postData.contents) : "";
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch (error) {
    return {};
  }
}

function handleContentAdminAction(action, params) {
  if (!isValidContentAdminToken(params.token)) {
    return sendContentJson({ success: false, message: "Unauthorized admin action." });
  }

  if (action === "listContentItems") return sendContentJson(listContentAdminItems(params));
  if (action === "upsertContentItem") return sendContentJson(upsertContentAdminItem(params));
  if (action === "deleteContentItem") return sendContentJson(deleteContentAdminItem(params));
  if (action === "dispatchContentSync") return sendContentJson(dispatchContentAdminSync(params));
  if (action === "addTestRows") return sendContentJson(addContentLiveTestRows());
  if (action === "removeTestRows") return sendContentJson(removeContentLiveTestRows());
  if (action === "setupSheets") {
    setupContentSheets();
    return sendContentJson({ success: true, action: "setupSheets", updatedAt: new Date().toISOString() });
  }

  return sendContentJson({ success: false, message: "Invalid admin action." });
}

function isValidContentAdminToken(token) {
  return String(token || "") === CONTENT_ADMIN_TOKEN;
}

function listContentAdminItems(params) {
  const type = getContentAdminType(params.type);
  const result = getContentAdminResult(type);
  return {
    success: true,
    action: "listContentItems",
    type: type,
    updatedAt: new Date().toISOString(),
    meta: result.meta,
    items: result.items
  };
}

function upsertContentAdminItem(params) {
  return withContentAdminLock(function () {
    const type = getContentAdminType(params.type);
    const config = CONTENT_SHEETS[type];
    const item = parseContentAdminItem(params.item);
    const normalizedItem = normalizeContentAdminItem(type, item);
    const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
    const sheet = getOrCreateContentSheet(spreadsheet, config);
    ensureContentHeaders(sheet, config);

    const headerMap = buildContentHeaderMap(sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]);
    const idIndex = getHeaderIndex(headerMap, "ID");
    if (idIndex === undefined) throw new Error("ID column not found in " + config.sheetName + ".");

    const rowNumber = findContentRowById(sheet, idIndex, normalizedItem.id) || sheet.getLastRow() + 1;
    const action = rowNumber > sheet.getLastRow() ? "created" : "updated";
    if (action === "updated") {
      preserveContentAdminRowState(sheet, headerMap, rowNumber, item, normalizedItem);
    }
    assertNoDuplicateContentAdminItem(sheet, headerMap, config, normalizedItem, rowNumber);
    const row = buildContentAdminRowFromItem(normalizedItem, config, sheet.getLastColumn());
    sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);
    applyContentSheetFormatting(sheet, Math.max(sheet.getLastColumn(), row.length));
    SpreadsheetApp.flush();

    return {
      success: true,
      action: "upsertContentItem",
      result: action,
      type: type,
      id: normalizedItem.id,
      rowNumber: rowNumber,
      updatedAt: new Date().toISOString()
    };
  });
}

function deleteContentAdminItem(params) {
  return withContentAdminLock(function () {
    const type = getContentAdminType(params.type);
    const config = CONTENT_SHEETS[type];
    const id = String(params.id || "").trim();
    if (!id) throw new Error("Missing item id.");

    const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
    const sheet = getOrCreateContentSheet(spreadsheet, config);
    ensureContentHeaders(sheet, config);
    const removed = removeContentRowsById(sheet, id);
    SpreadsheetApp.flush();

    return {
      success: true,
      action: "deleteContentItem",
      type: type,
      id: id,
      removed: removed,
      updatedAt: new Date().toISOString()
    };
  });
}

function dispatchContentAdminSync(params) {
  if (typeof dispatchGjuListingSync_ !== "function") {
    return {
      success: false,
      action: "dispatchContentSync",
      message: "GitHub sync trigger is not installed in this Apps Script project."
    };
  }

  try {
    const reason = "Content Updates admin" + (params.type ? ": " + String(params.type) : "");
    const message = dispatchGjuListingSync_(reason);
    return {
      success: true,
      action: "dispatchContentSync",
      message: message,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      action: "dispatchContentSync",
      message: error.message
    };
  }
}

function withContentAdminLock(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) throw new Error("Content sheet is busy. Please try again.");
  try {
    return callback();
  } finally {
    lock.releaseLock();
  }
}

function getContentAdminType(type) {
  const safeType = String(type || "").trim();
  if (!CONTENT_SHEETS[safeType]) throw new Error("Invalid content type.");
  return safeType;
}

function parseContentAdminItem(item) {
  if (typeof item === "string") {
    try {
      return JSON.parse(item);
    } catch (error) {
      throw new Error("Invalid item JSON.");
    }
  }
  if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error("Invalid content item.");
  return item;
}

function normalizeContentAdminItem(type, item) {
  const config = CONTENT_SHEETS[type];
  const output = {};

  config.fields.forEach(function (fieldConfig) {
    const field = fieldConfig[1];
    output[field] = item[field];
  });

  output.id = String(output.id || buildContentAdminId(config)).trim();
  output.title = String(output.title || "").trim();
  output.detailPage = normalizeContentDetailPage(config, output.detailPage);
  output.updatedAt = String(output.updatedAt || formatContentDate(new Date())).trim();
  output.status = calculateContentStatus(type, output);
  output.telegramStatus = String(output.telegramStatus || "draft").trim().toLowerCase();
  output.telegramReady = String(output.telegramReady || "no").trim().toLowerCase();
  output.published = normalizeContentPublishedValue(item.published);
  output.order = normalizeContentOrderValue(item.order);

  if (!output.title) throw new Error("Title is required.");
  validateContentAdminFields(config, output);
  return output;
}

function buildContentAdminId(config) {
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMddHHmmss");
  const suffix = Utilities.getUuid().slice(0, 8);
  return config.idPrefix + "-" + stamp + "-" + suffix;
}

function normalizeContentPublishedValue(value) {
  const text = String(value === undefined || value === null ? "yes" : value).trim().toLowerCase();
  return ["no", "false", "0", "hidden", "draft"].indexOf(text) === -1 ? "yes" : "no";
}

function normalizeContentOrderValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function normalizeContentDetailPage(config, value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const withHtml = /\.html$/i.test(text) ? text : text + ".html";
  if (/^https?:\/\//i.test(text) || text.indexOf("../") === 0 || text.indexOf("/") === 0) return withHtml;
  return String(config.detailPrefix || "") + text.replace(/\.html$/i, "") + ".html";
}

function calculateContentStatus(type, item) {
  const today = formatContentDate(new Date());
  const isFuture = function (date) {
    const value = String(date || "").trim();
    return value && value > today;
  };
  const isPast = function (date) {
    const value = String(date || "").trim();
    return value && value < today;
  };

  if (type === "jobs") {
    if (isFuture(item.startDate)) return "upcoming";
    if (isPast(item.lastDate)) return "closed";
    return "active";
  }

  if (type === "admitCards") {
    if (isFuture(item.releaseDate)) return "upcoming";
    if (isPast(item.examEndDate || item.examDate)) return "exam-over";
    return "available";
  }

  if (type === "answerKeys") {
    if (isFuture(item.releaseDate)) return "upcoming";
    if (isPast(item.objectionLastDate || item.examEndDate || item.examDate)) return "objection-closed";
    return "available";
  }

  if (type === "results") {
    if (isFuture(item.resultDate)) return "upcoming";
    return "released";
  }

  return "active";
}

function validateContentAdminFields(config, item) {
  config.fields.forEach(function (fieldConfig) {
    const field = fieldConfig[1];
    const type = fieldConfig[2] || "text";
    const value = item[field];
    if (type === "date" && value && !isValidContentAdminDate(value)) {
      throw new Error(field + " must use YYYY-MM-DD format.");
    }
    if (type === "link" && !isSafeContentAdminLink(value)) {
      throw new Error(field + " has an unsafe or unsupported link.");
    }
  });

  if (["draft", "ready", "posted", "skipped"].indexOf(item.telegramStatus) === -1) {
    throw new Error("telegramStatus must be draft, ready, posted, or skipped.");
  }
  if (["yes", "no"].indexOf(item.telegramReady) === -1) {
    throw new Error("telegramReady must be yes or no.");
  }
}

function assertNoDuplicateContentAdminItem(sheet, headerMap, config, item, currentRowNumber) {
  if (sheet.getLastRow() < 2) return;

  const titleIndex = getHeaderIndex(headerMap, "Title");
  const organizationIndex = getHeaderIndex(headerMap, "Organization");
  const yearIndex = getHeaderIndex(headerMap, "Year");
  const detailPageIndex = getHeaderIndex(headerMap, "Detail Page");
  if (titleIndex === undefined) return;

  const incomingTitle = normalizeContentDuplicateText(item.title);
  const incomingOrganization = normalizeContentDuplicateText(item.organization);
  const incomingYear = normalizeContentDuplicateText(item.year);
  const incomingDetailPage = normalizeContentDuplicateLink(item.detailPage);
  if (!incomingTitle && !incomingDetailPage) return;

  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  for (let index = 0; index < values.length; index += 1) {
    const rowNumber = index + 2;
    if (rowNumber === currentRowNumber) continue;

    const row = values[index];
    const existingTitle = normalizeContentDuplicateText(row[titleIndex]);
    const existingOrganization = organizationIndex === undefined ? "" : normalizeContentDuplicateText(row[organizationIndex]);
    const existingYear = yearIndex === undefined ? "" : normalizeContentDuplicateText(row[yearIndex]);
    const existingDetailPage = detailPageIndex === undefined ? "" : normalizeContentDuplicateLink(row[detailPageIndex]);

    const sameDetailPage = incomingDetailPage && existingDetailPage && incomingDetailPage === existingDetailPage;
    const sameIdentity = incomingTitle && existingTitle === incomingTitle
      && existingOrganization === incomingOrganization
      && existingYear === incomingYear;

    if (sameDetailPage || sameIdentity) {
      throw new Error(config.sheetName + " already has this post. Duplicate blocked: " + item.title);
    }
  }
}

function normalizeContentDuplicateText(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function normalizeContentDuplicateLink(value) {
  return String(value || "").toLowerCase().replace(/^https?:\/\/(www\.)?govjobupdates\.com\//, "/").replace(/\s+/g, "").trim();
}

function isValidContentAdminDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());
}

function isSafeContentAdminLink(value) {
  const text = String(value || "").trim();
  if (!text || text === "#") return true;
  if (/[\u0000-\u001f\u007f]/.test(text)) return false;
  if (/^(javascript|data|vbscript|file|mailto|tel|sms):/i.test(text)) return false;
  if (/^https?:\/\//i.test(text)) return true;
  if (/^(\.\.?\/|\/|HTML\/|Job_Details\/|Assets\/)/i.test(text)) return true;
  return false;
}

function buildContentAdminRowFromItem(item, config, columnCount) {
  const values = config.fields.map(function (fieldConfig) {
    const field = fieldConfig[1];
    return normalizeContentCellValue(item[field]);
  });
  const row = [item.published, item.order].concat(values);
  while (row.length < columnCount) row.push("");
  return row;
}

function findContentRowById(sheet, idIndex, id) {
  if (sheet.getLastRow() < 2) return 0;
  const rowCount = sheet.getLastRow() - 1;
  const idValues = sheet.getRange(2, idIndex + 1, rowCount, 1).getValues();
  for (let index = 0; index < idValues.length; index += 1) {
    if (String(idValues[index][0] || "").trim() === id) return index + 2;
  }
  return 0;
}

function preserveContentAdminRowState(sheet, headerMap, rowNumber, rawItem, normalizedItem) {
  const publishedIndex = getHeaderIndex(headerMap, "Published");
  const orderIndex = getHeaderIndex(headerMap, "Order");

  if (rawItem.published === undefined && publishedIndex !== undefined) {
    normalizedItem.published = normalizeContentPublishedValue(sheet.getRange(rowNumber, publishedIndex + 1).getValue());
  }

  if (rawItem.order === undefined && orderIndex !== undefined) {
    normalizedItem.order = normalizeContentOrderValue(sheet.getRange(rowNumber, orderIndex + 1).getValue());
  }
}

function getContentAdminResult(type) {
  const config = CONTENT_SHEETS[type];
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  const sheet = getOrCreateContentSheet(spreadsheet, config);
  ensureContentHeaders(sheet, config);
  const meta = {
    sheetName: config.sheetName,
    totalRows: Math.max(sheet.getLastRow() - 1, 0),
    publishedRows: 0,
    unpublishedRows: 0,
    blankRows: 0
  };
  if (sheet.getLastRow() < 2) return { items: [], meta: meta };

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastColumn);
  const values = range.getValues();
  const headerMap = buildContentHeaderMap(values[0]);
  const items = values.slice(1)
    .map(function (row, index) {
      const item = buildContentItem(row, headerMap, config, index + 2, null, null);
      if (!item || !hasContentItemData(item, config)) {
        meta.blankRows += 1;
        return null;
      }
      if (isPublished(item.__published)) {
        meta.publishedRows += 1;
      } else {
        meta.unpublishedRows += 1;
      }
      item.rowNumber = index + 2;
      item.published = isPublished(item.__published) ? "yes" : "no";
      item.order = item.__order;
      delete item.__published;
      delete item.__order;
      delete item.__hasRowData;
      return item;
    })
    .filter(Boolean);

  return { items: items, meta: meta };
}

function setupContentSheets() {
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  Object.keys(CONTENT_SHEETS).forEach(function (type) {
    const config = CONTENT_SHEETS[type];
    const sheet = getOrCreateContentSheet(spreadsheet, config);
    ensureContentHeaders(sheet, config);
  });
}

function addExamDayOverColumn() {
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  const headerName = "Exam Day Over";
  const oldHeaderName = "Exam Last Date";
  const messages = ["admitCards", "answerKeys"].map(function (type) {
    const config = CONTENT_SHEETS[type];
    const sheetName = config.sheetName;
    const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    let action = "already exists";
    let currentHeaders = sheet.getLastColumn() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];
    let headerMap = buildContentHeaderMap(currentHeaders);
    const hadHeader = getHeaderIndex(headerMap, headerName) !== undefined;
    const oldIndex = getHeaderIndex(headerMap, oldHeaderName);

    if (!hadHeader && oldIndex !== undefined) {
      sheet.getRange(1, oldIndex + 1).setValue(headerName);
      action = "renamed";
    } else if (!hadHeader) {
      action = "added";
    }

    if (!currentHeaders.some(function (header) { return String(header || "").trim(); })) {
      ensureContentHeaders(sheet, config);
    }

    currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    headerMap = buildContentHeaderMap(currentHeaders);
    const examDateIndex = getHeaderIndex(headerMap, "Exam Date");
    let examDayOverIndex = getHeaderIndex(headerMap, headerName);

    if (examDateIndex === undefined) {
      return "Exam Date column not found in " + sheetName + "; Exam Day Over not added.";
    }

    const targetColumn = examDateIndex + 2;
    if (examDayOverIndex === undefined) {
      sheet.insertColumnAfter(examDateIndex + 1);
      sheet.getRange(1, targetColumn).setValue(headerName);
      examDayOverIndex = targetColumn - 1;
    } else if (examDayOverIndex + 1 !== targetColumn) {
      const rowCount = Math.max(sheet.getLastRow(), 1);
      sheet.insertColumnAfter(examDateIndex + 1);
      let sourceColumn = examDayOverIndex + 1;
      if (sourceColumn >= targetColumn) sourceColumn += 1;
      sheet.getRange(1, sourceColumn, rowCount, 1)
        .copyTo(sheet.getRange(1, targetColumn, rowCount, 1));
      sheet.deleteColumn(sourceColumn);
      if (action === "already exists") action = "moved";
    }

    sheet.getRange(1, targetColumn)
      .setBackground("#34a853")
      .setFontColor("#ffffff")
      .setFontWeight("bold");

    if (action === "already exists") {
      return "Exam Day Over is already after Exam Date in " + sheetName + ".";
    }
    if (action === "renamed") {
      return "Exam Last Date renamed and moved after Exam Date in " + sheetName + ".";
    }
    if (action === "moved") {
      return "Exam Day Over moved after Exam Date in " + sheetName + ".";
    }
    return "Exam Day Over column added after Exam Date in " + sheetName + ".";
  });

  const message = messages.join(" ");
  SpreadsheetApp.flush();
  spreadsheet.toast(message, "Column Setup Done", 10);
  Logger.log(message);
  return message;
}

function addExamLastDateColumn() {
  return addExamDayOverColumn();
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

  return { success: true, action: "addTestRows", updatedAt: new Date().toISOString(), summary: summary };
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

  return { success: true, action: "removeTestRows", updatedAt: new Date().toISOString(), summary: summary };
}

function buildContentLiveTestItems(today) {
  const base = {
    telegramStatus: "ready",
    telegramReady: "yes",
    updatedAt: today
  };

  return {
    jobs: Object.assign({}, base, {
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
      detailPage: ""
    }),
    admitCards: Object.assign({}, base, {
      id: "gju-live-test-admitCards",
      title: "TEST LIVE ADMIT CARD FROM GOOGLE SHEET",
      organization: "GovJobUpdates Test",
      department: "Testing",
      category: "Admit Card",
      year: "2026",
      examDate: today,
      examEndDate: today,
      releaseDate: today,
      status: "available",
      tags: ["Live Test", "Google Sheet"],
      downloadLink: "#",
      detailPage: ""
    }),
    results: Object.assign({}, base, {
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
      detailPage: ""
    }),
    answerKeys: Object.assign({}, base, {
      id: "gju-live-test-answerKeys",
      title: "TEST LIVE ANSWER KEY FROM GOOGLE SHEET",
      organization: "GovJobUpdates Test",
      department: "Testing",
      category: "Answer Key",
      year: "2026",
      examDate: today,
      examEndDate: today,
      releaseDate: today,
      objectionLastDate: today,
      status: "available",
      tags: ["Live Test", "Google Sheet"],
      downloadLink: "#",
      objectionLink: "#",
      detailPage: ""
    })
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
  const response = { success: true, updatedAt: new Date().toISOString(), meta: {} };
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
  if (!item.updatedAt) item.updatedAt = "";
  item.status = calculateContentStatus(getContentTypeBySheetName(config.sheetName), item);
  if (!item.telegramStatus) item.telegramStatus = "draft";
  if (!item.telegramReady) item.telegramReady = "no";
  if (!Array.isArray(item.tags)) item.tags = [];

  return item;
}

function getContentTypeBySheetName(sheetName) {
  const target = String(sheetName || "").trim();
  const types = Object.keys(CONTENT_SHEETS);
  for (let index = 0; index < types.length; index += 1) {
    const type = types[index];
    if (CONTENT_SHEETS[type].sheetName === target) return type;
  }
  return "";
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
  } catch (error) {}

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
