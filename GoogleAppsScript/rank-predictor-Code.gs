const SPREADSHEET_ID = "1IIDP7Slon3zRDlOH0hxzOnAZd4fzYi5nZHphVCW2_wE";
const RANK_EXAMS_SHEET_NAME = "Rank Predictor Exams";

const HEADERS = [
  "Timestamp",
  "Exam ID",
  "Exam Name",
  "Mode",
  "Roll Number",
  "Mobile Number",
  "DOB",
  "Candidate Name",
  "Gender",
  "Category",
  "State",
  "Exam Date",
  "Shift",
  "Total Questions",
  "Total Attempted",
  "Right Answers",
  "Wrong Answers",
  "Unattempted",
  "Marks Per Correct",
  "Negative Marking",
  "Raw Marks",
  "Normalized Marks",
  "Percentile",
  "Subject Data (JSON)",
  "Gender Rank",
  "Gender Category Rank",
  "Gender State Rank",
  "Gender Shift Rank",
  "Average Marks",
  "Average Shift Marks",
  "Category Average Marks",
  "Answer Key Link",
  "User Agent"
];

const RANK_EXAM_HEADERS = [
  "Published",
  "Order",
  "Exam ID",
  "Exam Name",
  "Board",
  "Exam Type",
  "Sheet Name",
  "Total Questions",
  "Marks Per Correct",
  "Negative Marking",
  "Has Shifts",
  "Normalization",
  "Supported Modes",
  "Subjects",
  "Categories",
  "States",
  "Disabled"
];

function doGet(e) {
  const type = String(e && e.parameter && e.parameter.type || "").trim();
  if (type === "exams") return sendJSON(getRankPredictorExamConfigResponse());

  return sendJSON({
    success: true,
    message: "GovJobUpdates Rank Predictor API working"
  });
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents;

    if (!raw) return sendJSON({ success: false, message: "No data received" });

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      return sendJSON({ success: false, message: "Invalid JSON format" });
    }

    if (!data.action) return sendJSON({ success: false, message: "Missing action" });
    if (data.action === "submitData") return submitData(data);
    if (data.action === "checkRank") return checkRank(data);

    return sendJSON({ success: false, message: "Invalid action" });
  } catch (error) {
    return sendJSON({
      success: false,
      message: "Server error: " + error.message
    });
  }
}

function submitData(data) {
  data.rollNumber = normalizeRoll(data.rollNumber);
  data.mobileNumber = normalizeMobile(data.mobileNumber);
  data.dob = normalizeDob(data.dob);
  data.examDate = normalizeDob(data.examDate);
  data.shift = normalizeShift(data.shift);
  data.gender = normalizeText(data.gender);
  data.category = normalizeText(data.category);
  data.state = normalizeText(data.state);
  data.subjectData = normalizeSubjectData(data.subjectData, data);
  data.rawMarks = isFinite(Number(data.rawMarks)) ? Number(data.rawMarks) : calculateRawMarks(data);

  validateSubmitPayload(data);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getSheetByExam(data.sheetName, spreadsheet);
  const examConfig = getRankExamConfigForData(spreadsheet, data);
  const columnMap = ensureSheetSchema(sheet);
  const rows = getRowsByHeaders(sheet, columnMap);

  const duplicate = findDuplicateCandidate(rows, data);
  if (duplicate) {
    return sendJSON({
      success: false,
      duplicate: true,
      duplicateType: duplicate.type,
      message: duplicate.message
    });
  }

  appendCandidateData(sheet, columnMap, data);
  SpreadsheetApp.flush();

  const refreshedMap = getColumnMap(sheet);
  const refreshedRows = getRowsByHeaders(sheet, refreshedMap);
  const targetRow = findCandidateRow(refreshedRows, data);

  if (!targetRow) {
    return sendJSON({
      success: false,
      message: "Data saved, but rank lookup failed",
      debug: buildNotFoundDebug(sheet, data, refreshedRows)
    });
  }

  const rankData = calculateAnalytics(refreshedRows, targetRow, examConfig);
  writeAnalytics(sheet, refreshedMap, targetRow.rowNumber, rankData);

  return sendJSON({
    success: true,
    duplicate: false,
    message: "Data submitted successfully",
    data: rankData
  });
}

function checkRank(data) {
  data.rollNumber = normalizeRoll(data.rollNumber);
  data.mobileNumber = normalizeMobile(data.mobileNumber);
  data.dob = normalizeDob(data.dob);
  data.examDate = normalizeDob(data.examDate);
  data.shift = normalizeShift(data.shift);

  validateCheckPayload(data);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(String(data.sheetName).trim());
  const examConfig = getRankExamConfigForData(spreadsheet, data);

  if (!sheet) {
    return sendJSON({
      success: false,
      found: false,
      message: "No data found",
      debug: {
        sheetName: data.sheetName,
        searchedRoll: data.rollNumber,
        searchedMobile: maskMobile(data.mobileNumber),
        searchedDob: data.dob,
        totalRows: 0,
        firstFiveRows: []
      }
    });
  }

  const columnMap = ensureSheetSchema(sheet);
  const rows = getRowsByHeaders(sheet, columnMap);

  const targetRow = findCandidateRow(rows, data);

  if (!targetRow) {
    return sendJSON({
      success: false,
      found: false,
      message: "No data found",
      debug: buildNotFoundDebug(sheet, data, rows)
    });
  }

  const rankData = calculateAnalytics(rows, targetRow, examConfig);
  writeAnalytics(sheet, columnMap, targetRow.rowNumber, rankData);

  return sendJSON({
    success: true,
    found: true,
    message: "Rank found successfully",
    data: rankData
  });
}

function getSheetByExam(sheetName, spreadsheet) {
  const safeName = String(sheetName || "").trim();
  if (!safeName) throw new Error("Sheet name is required.");
  return spreadsheet.getSheetByName(safeName) || spreadsheet.insertSheet(safeName);
}

function setupRankPredictorExamSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getRankExamSheet(spreadsheet);
  ensureRankExamSheetSchema(sheet);
}

function getRankPredictorExamConfigResponse() {
  const result = getRankPredictorExamConfigs();
  return {
    success: true,
    updatedAt: new Date().toISOString(),
    exams: result.exams,
    meta: result.meta
  };
}

function getRankPredictorExamConfigs(spreadsheet) {
  spreadsheet = spreadsheet || SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getRankExamSheet(spreadsheet);
  ensureRankExamSheetSchema(sheet);

  const meta = {
    sheetName: RANK_EXAMS_SHEET_NAME,
    totalRows: Math.max(sheet.getLastRow() - 1, 0),
    publishedRows: 0,
    unpublishedRows: 0,
    missingRequiredRows: 0,
    blankRows: 0
  };

  if (sheet.getLastRow() < 2) return { exams: [], meta: meta };

  const values = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  const headerMap = buildColumnMapFromHeaders(values[0]);
  const exams = values.slice(1)
    .map(function (row, index) {
      return buildRankExamConfig(row, headerMap, index + 2);
    })
    .filter(function (exam) {
      if (!exam || !exam.__hasRowData) {
        meta.blankRows += 1;
        return false;
      }
      if (!isRankExamPublished(exam.__published)) {
        meta.unpublishedRows += 1;
        return false;
      }
      if (!isValidRankExamConfig(exam)) {
        meta.missingRequiredRows += 1;
        return false;
      }
      meta.publishedRows += 1;
      return true;
    })
    .sort(sortRankExamConfigs)
    .map(function (exam) {
      delete exam.__published;
      delete exam.__order;
      delete exam.__rowNumber;
      delete exam.__hasRowData;
      return exam;
    });

  return { exams: exams, meta: meta };
}

function getRankExamConfigForData(spreadsheet, data) {
  const result = getRankPredictorExamConfigs(spreadsheet);
  const examId = normalizeText(data.examId);
  const sheetName = normalizeText(data.sheetName);
  const examName = normalizeText(data.examName);
  const config = result.exams.find(function (exam) {
    return (examId && normalizeText(exam.examId) === examId) ||
      (sheetName && normalizeText(exam.sheetName) === sheetName) ||
      (examName && normalizeText(exam.examName) === examName);
  });

  if (config) return config;

  return {
    examId: examId,
    examName: examName,
    sheetName: sheetName,
    totalQuestions: Number(data.totalQuestions) || 0,
    marksPerCorrect: Number(data.marksPerCorrect) || 0,
    negativeMarking: Number(data.negativeMarking) || 0,
    hasShifts: Boolean(data.shift),
    normalization: false
  };
}

function getRankExamSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(RANK_EXAMS_SHEET_NAME) || spreadsheet.insertSheet(RANK_EXAMS_SHEET_NAME);
  ensureRankExamSheetSchema(sheet);
  return sheet;
}

function ensureRankExamSheetSchema(sheet) {
  if (sheet.getMaxColumns() < RANK_EXAM_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), RANK_EXAM_HEADERS.length - sheet.getMaxColumns());
  }

  const lastColumn = sheet.getLastColumn();
  const currentHeaders = lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0] : [];
  const hasAnyHeader = currentHeaders.some(function (header) {
    return String(header || "").trim();
  });

  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, RANK_EXAM_HEADERS.length).setValues([RANK_EXAM_HEADERS]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, RANK_EXAM_HEADERS.length);
    return;
  }

  const currentMap = buildColumnMapFromHeaders(currentHeaders);
  const missingHeaders = RANK_EXAM_HEADERS.filter(function (header) {
    return currentMap[normalizeHeader(header)] === undefined;
  });

  if (missingHeaders.length) {
    const startColumn = sheet.getLastColumn() + 1;
    sheet.insertColumnsAfter(sheet.getLastColumn(), missingHeaders.length);
    sheet.getRange(1, startColumn, 1, missingHeaders.length).setValues([missingHeaders]);
  }

  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, sheet.getLastColumn());
}

function buildRankExamConfig(row, headerMap, rowNumber) {
  const exam = {
    __published: getHeaderValue(row, headerMap, "Published"),
    __order: toRankExamNumber(getHeaderValue(row, headerMap, "Order")),
    __rowNumber: rowNumber,
    __hasRowData: false
  };

  const textFields = {
    examId: "Exam ID",
    examName: "Exam Name",
    board: "Board",
    examType: "Exam Type",
    sheetName: "Sheet Name"
  };

  Object.keys(textFields).forEach(function (field) {
    exam[field] = normalizeText(getHeaderValue(row, headerMap, textFields[field]));
    if (exam[field]) exam.__hasRowData = true;
  });

  exam.totalQuestions = toRankExamNumber(getHeaderValue(row, headerMap, "Total Questions"));
  exam.marksPerCorrect = toRankExamNumber(getHeaderValue(row, headerMap, "Marks Per Correct"));
  exam.negativeMarking = toRankExamNumber(getHeaderValue(row, headerMap, "Negative Marking"));
  exam.hasShifts = toRankExamBoolean(getHeaderValue(row, headerMap, "Has Shifts"));
  exam.normalization = toRankExamBoolean(getHeaderValue(row, headerMap, "Normalization"));
  exam.supportedModes = parseRankExamList(getHeaderValue(row, headerMap, "Supported Modes")).map(function (mode) {
    return String(mode).toLowerCase();
  }).filter(function (mode) {
    return mode === "online" || mode === "offline";
  });
  exam.subjects = parseRankExamSubjects(getHeaderValue(row, headerMap, "Subjects"));
  exam.categories = parseRankExamList(getHeaderValue(row, headerMap, "Categories"));
  exam.states = parseRankExamList(getHeaderValue(row, headerMap, "States"));
  exam.disabled = toRankExamBoolean(getHeaderValue(row, headerMap, "Disabled"));

  if (hasEnteredRankExamValue(exam.totalQuestions)) exam.__hasRowData = true;
  if (hasEnteredRankExamValue(exam.marksPerCorrect)) exam.__hasRowData = true;
  if (hasEnteredRankExamValue(exam.negativeMarking)) exam.__hasRowData = true;
  if (exam.supportedModes.length || exam.subjects.length || exam.categories.length || exam.states.length) exam.__hasRowData = true;

  if (!exam.examId && exam.examName) exam.examId = slugifyRankExamId(exam.examName) + "-" + rowNumber;
  if (!exam.sheetName && exam.examName && !exam.disabled) exam.sheetName = exam.examName;
  if (!exam.supportedModes.length && !exam.disabled) exam.supportedModes = [exam.examType === "online" ? "online" : "offline"];
  if (!exam.board) exam.board = "GovJobUpdates";
  if (!exam.examType) exam.examType = "offline";
  if (!Number.isFinite(exam.negativeMarking)) exam.negativeMarking = 0;

  return exam;
}

function isValidRankExamConfig(exam) {
  if (!exam.examId || !exam.examName) return false;
  if (exam.disabled) return true;
  return Boolean(exam.sheetName)
    && Number(exam.totalQuestions) > 0
    && Number(exam.marksPerCorrect) > 0
    && Array.isArray(exam.supportedModes)
    && exam.supportedModes.length > 0;
}

function parseRankExamSubjects(value) {
  const text = String(value || "").trim();
  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map(function (subject) {
        return {
          name: normalizeText(subject.name),
          questions: toRankExamNumber(subject.questions)
        };
      }).filter(function (subject) {
        return subject.name && Number(subject.questions) > 0;
      });
    }
  } catch (error) {
    // Plain text subjects are supported below.
  }

  return text.split(/[,|;]/).map(function (part) {
    const piece = normalizeText(part);
    const match = piece.match(/^(.+?)(?:\s*[:=-]\s*)(\d+(?:\.\d+)?)$/);
    if (!match) return null;
    return {
      name: normalizeText(match[1]),
      questions: toRankExamNumber(match[2])
    };
  }).filter(function (subject) {
    return subject && subject.name && Number(subject.questions) > 0;
  });
}

function parseRankExamList(value) {
  return String(value || "")
    .split(/[,|;]/)
    .map(normalizeText)
    .filter(Boolean);
}

function sortRankExamConfigs(first, second) {
  const firstOrder = Number(first.__order);
  const secondOrder = Number(second.__order);
  if (Number.isFinite(firstOrder) && Number.isFinite(secondOrder) && firstOrder !== secondOrder) return firstOrder - secondOrder;
  if (Number.isFinite(firstOrder)) return -1;
  if (Number.isFinite(secondOrder)) return 1;
  return Number(first.__rowNumber) - Number(second.__rowNumber);
}

function isRankExamPublished(value) {
  const normalized = normalizeKey(value);
  return !["no", "false", "0", "hidden", "draft"].includes(normalized);
}

function toRankExamBoolean(value) {
  const normalized = normalizeKey(value);
  return ["yes", "true", "1", "y", "enabled"].includes(normalized);
}

function toRankExamNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function hasEnteredRankExamValue(value) {
  return value !== "" && value !== undefined && value !== null;
}

function slugifyRankExamId(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "rank-exam";
}

function ensureSheetSchema(sheet) {
  if (sheet.getMaxColumns() < HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), HEADERS.length - sheet.getMaxColumns());
  }

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow < 1 || lastColumn < 1) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  if (headersMatch(currentHeaders)) {
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const oldMap = buildColumnMapFromHeaders(currentHeaders);
  const oldRows = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues() : [];
  const migratedRows = oldRows.map(function (row) {
    return HEADERS.map(function (header) {
      return getHeaderValue(row, oldMap, header);
    });
  });

  sheet.clearContents();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  if (migratedRows.length) {
    sheet.getRange(2, 1, migratedRows.length, HEADERS.length).setValues(migratedRows);
  }
  sheet.setFrozenRows(1);
  return getColumnMap(sheet);
}

function headersMatch(headers) {
  return HEADERS.every(function (header, index) {
    return normalizeHeader(headers[index]) === normalizeHeader(header);
  });
}

function buildColumnMapFromHeaders(headers) {
  const map = {};
  headers.forEach(function (h, i) {
    const key = normalizeHeader(h);
    if (key) map[key] = i;
  });
  return map;
}

function getColumnMap(sheet) {
  const lastColumn = sheet.getLastColumn();
  if (lastColumn < 1) return {};
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  return buildColumnMapFromHeaders(headers);
}

function appendCandidateData(sheet, columnMap, data) {
  const row = new Array(HEADERS.length).fill("");
  const unattempted = isFinite(Number(data.unattempted)) ? Number(data.unattempted) : Math.max(Number(data.totalQuestions) - Number(data.totalAttempted), 0);

  setHeaderValue(row, columnMap, "Timestamp", new Date());
  setHeaderValue(row, columnMap, "Exam ID", data.examId);
  setHeaderValue(row, columnMap, "Exam Name", data.examName);
  setHeaderValue(row, columnMap, "Mode", data.mode);
  setHeaderValue(row, columnMap, "Roll Number", data.rollNumber);
  setHeaderValue(row, columnMap, "Mobile Number", data.mobileNumber);
  setHeaderValue(row, columnMap, "DOB", data.dob);
  setHeaderValue(row, columnMap, "Candidate Name", data.candidateName || "Private");
  setHeaderValue(row, columnMap, "Gender", data.gender || "");
  setHeaderValue(row, columnMap, "Category", data.category || "");
  setHeaderValue(row, columnMap, "State", data.state || "");
  setHeaderValue(row, columnMap, "Exam Date", data.examDate);
  setHeaderValue(row, columnMap, "Shift", data.shift);
  setHeaderValue(row, columnMap, "Total Questions", Number(data.totalQuestions));
  setHeaderValue(row, columnMap, "Total Attempted", Number(data.totalAttempted));
  setHeaderValue(row, columnMap, "Right Answers", Number(data.rightAnswers));
  setHeaderValue(row, columnMap, "Wrong Answers", Number(data.wrongAnswers));
  setHeaderValue(row, columnMap, "Unattempted", unattempted);
  setHeaderValue(row, columnMap, "Marks Per Correct", Number(data.marksPerCorrect));
  setHeaderValue(row, columnMap, "Negative Marking", Number(data.negativeMarking));
  setHeaderValue(row, columnMap, "Raw Marks", Number(data.rawMarks));
  setHeaderValue(row, columnMap, "Normalized Marks", isFinite(Number(data.normalizedMarks)) ? Number(data.normalizedMarks) : "");
  setHeaderValue(row, columnMap, "Percentile", "");
  setHeaderValue(row, columnMap, "Subject Data (JSON)", JSON.stringify(data.subjectData || []));
  setHeaderValue(row, columnMap, "Answer Key Link", data.answerKeyLink || "");
  setHeaderValue(row, columnMap, "User Agent", data.userAgent || "");

  const nextRow = sheet.getLastRow() + 1;
  ["Roll Number", "Mobile Number", "DOB", "Exam Date", "Shift", "Subject Data (JSON)"].forEach(function (header) {
    setTextFormat(sheet, columnMap, nextRow, header);
  });

  sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([row]);
}

function getRowsByHeaders(sheet, columnMap) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) return [];

  return sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues().map(function (row, index) {
    return {
      rowNumber: index + 2,
      timestamp: getHeaderValue(row, columnMap, "Timestamp"),
      examId: normalizeText(getHeaderValue(row, columnMap, "Exam ID")),
      examName: normalizeText(getHeaderValue(row, columnMap, "Exam Name")),
      mode: normalizeText(getHeaderValue(row, columnMap, "Mode")),
      rollNumber: normalizeRoll(getHeaderValue(row, columnMap, "Roll Number")),
      mobileNumber: normalizeMobile(getHeaderValue(row, columnMap, "Mobile Number")),
      dob: normalizeDob(getHeaderValue(row, columnMap, "DOB")),
      candidateName: getHeaderValue(row, columnMap, "Candidate Name"),
      gender: normalizeText(getHeaderValue(row, columnMap, "Gender")),
      category: normalizeText(getHeaderValue(row, columnMap, "Category")),
      state: normalizeText(getHeaderValue(row, columnMap, "State")),
      examDate: normalizeDob(getHeaderValue(row, columnMap, "Exam Date")),
      shift: normalizeShift(getHeaderValue(row, columnMap, "Shift")),
      rawMarks: Number(getHeaderValue(row, columnMap, "Raw Marks")) || 0,
      normalizedMarks: readOptionalNumber(getHeaderValue(row, columnMap, "Normalized Marks")),
      percentile: Number(getHeaderValue(row, columnMap, "Percentile")) || 0,
      subjectData: parseSubjectData(getHeaderValue(row, columnMap, "Subject Data (JSON)"))
    };
  });
}

function findCandidateRow(rows, data) {
  const searchedRoll = normalizeRoll(data.rollNumber);
  const searchedMobile = normalizeMobile(data.mobileNumber);
  const searchedDob = normalizeDob(data.dob);
  const searchedExamId = normalizeText(data.examId);

  return rows.find(function (row) {
    const sameExam = !row.examId || !searchedExamId || row.examId === searchedExamId;
    return sameExam && row.rollNumber === searchedRoll && row.mobileNumber === searchedMobile && row.dob === searchedDob;
  }) || null;
}

function findDuplicateCandidate(rows, data) {
  const searchedRoll = normalizeRoll(data.rollNumber);
  const searchedMobile = normalizeMobile(data.mobileNumber);
  const searchedDob = normalizeDob(data.dob);
  const searchedExamId = normalizeText(data.examId);

  const exact = rows.find(function (row) {
    const sameExam = !row.examId || !searchedExamId || row.examId === searchedExamId;
    return sameExam && row.rollNumber === searchedRoll && row.mobileNumber === searchedMobile && row.dob === searchedDob;
  });
  if (exact) {
    return {
      type: "identity",
      message: "Your data already exists. Use Check My Rank."
    };
  }

  const sameRoll = rows.find(function (row) {
    const sameExam = !row.examId || !searchedExamId || row.examId === searchedExamId;
    return sameExam && row.rollNumber === searchedRoll;
  });
  if (sameRoll) {
    return {
      type: "rollNumber",
      message: "This Roll Number is already submitted for this exam. Please use Check My Rank."
    };
  }

  const sameMobile = rows.find(function (row) {
    const sameExam = !row.examId || !searchedExamId || row.examId === searchedExamId;
    return sameExam && row.mobileNumber && row.mobileNumber === searchedMobile;
  });
  if (sameMobile) {
    return {
      type: "mobileNumber",
      message: "This Mobile Number is already submitted for this exam. Please use Check My Rank."
    };
  }

  return null;
}

function calculateAnalytics(rows, targetRow, examConfig) {
  const rowsForExam = rows.filter(function (row) {
    const sameExam = !targetRow.examId || !row.examId || row.examId === targetRow.examId;
    return sameExam && row.rollNumber && row.dob;
  });

  const normalizationEnabled = Boolean(examConfig && examConfig.normalization);
  const scoredRows = applyNormalizedMarks(rowsForExam, examConfig, normalizationEnabled);
  const scoredTargetRow = scoredRows.find(function (row) {
    return row.rowNumber === targetRow.rowNumber;
  }) || Object.assign({}, targetRow, {
    normalizedMarks: normalizationEnabled ? Number(targetRow.rawMarks) || 0 : Number(targetRow.rawMarks) || 0
  });
  const rankScoreField = normalizationEnabled ? "normalizedMarks" : "rawMarks";
  const targetRankMarks = Number(scoredTargetRow[rankScoreField]) || 0;

  const overallRank = calculateTieAwareRank(scoredRows, scoredTargetRow, rankScoreField);
  const totalSubmissions = rowsForExam.length;
  const percentile = calculatePercentile(totalSubmissions, overallRank);
  const sameShiftRows = scoredRows.filter(function (row) {
    return normalizeKey(row.shift) === normalizeKey(scoredTargetRow.shift);
  });
  const sameCategoryRows = scoredRows.filter(function (row) {
    return normalizeKey(row.category) === normalizeKey(scoredTargetRow.category);
  });

  return {
    found: true,
    rawMarks: Number(scoredTargetRow.rawMarks),
    marks: Number(scoredTargetRow.rawMarks),
    normalizedMarks: Number(scoredTargetRow.normalizedMarks),
    normalisedMarks: Number(scoredTargetRow.normalizedMarks),
    percentile: percentile,
    overallRank: overallRank,
    categoryRank: calculateTieAwareRank(sameCategoryRows, scoredTargetRow, rankScoreField),
    stateRank: calculateTieAwareRank(scoredRows.filter(function (row) {
      return normalizeKey(row.state) === normalizeKey(scoredTargetRow.state);
    }), scoredTargetRow, rankScoreField),
    shiftRank: calculateTieAwareRank(sameShiftRows, scoredTargetRow, rankScoreField),
    genderRank: countAtLeast(scoredRows.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(scoredTargetRow.gender);
    }), targetRankMarks, rankScoreField),
    genderCategoryRank: countAtLeast(scoredRows.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(scoredTargetRow.gender) &&
        normalizeKey(row.category) === normalizeKey(scoredTargetRow.category);
    }), targetRankMarks, rankScoreField),
    genderStateRank: countAtLeast(scoredRows.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(scoredTargetRow.gender) &&
        normalizeKey(row.state) === normalizeKey(scoredTargetRow.state);
    }), targetRankMarks, rankScoreField),
    genderShiftRank: countAtLeast(scoredRows.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(scoredTargetRow.gender) &&
        normalizeKey(row.shift) === normalizeKey(scoredTargetRow.shift);
    }), targetRankMarks, rankScoreField),
    averageMarks: averageMarks(scoredRows, "rawMarks"),
    averageShiftMarks: averageMarks(sameShiftRows, "rawMarks"),
    categoryAverageMarks: averageMarks(sameCategoryRows, "rawMarks"),
    subjectAnalysis: buildSubjectAnalysis(rowsForExam, targetRow),
    totalSubmissions: totalSubmissions,
    accuracyIndicator: getAccuracyIndicator(totalSubmissions),
    rankBasis: normalizationEnabled ? "normalized" : "raw",
    lastUpdated: new Date().toISOString()
  };
}

function applyNormalizedMarks(rowsForExam, examConfig, normalizationEnabled) {
  const allShiftAverage = averageMarks(rowsForExam, "rawMarks");
  const shiftAverageMap = buildShiftAverageMap(rowsForExam);

  return rowsForExam.map(function (row) {
    const rawMarks = Number(row.rawMarks) || 0;
    const normalizedMarks = normalizationEnabled
      ? calculateExamNormalizedMarks(row, examConfig, allShiftAverage, shiftAverageMap)
      : rawMarks;
    const nextRow = Object.assign({}, row);
    nextRow.normalizedMarks = round2(normalizedMarks);
    return nextRow;
  });
}

function buildShiftAverageMap(rows) {
  const grouped = {};
  rows.forEach(function (row) {
    const key = normalizeKey(row.shift) || "__no_shift__";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  });

  const averages = {};
  Object.keys(grouped).forEach(function (key) {
    averages[key] = averageMarks(grouped[key], "rawMarks");
  });
  return averages;
}

function calculateExamNormalizedMarks(row, examConfig, allShiftAverage, shiftAverageMap) {
  const examId = normalizeKey((examConfig && examConfig.examId) || row.examId);

  switch (examId) {
    case "up-homeguard-2026":
    case "ssc-cpo-2025-paper-1":
    case "ssc-cgl-2025-tier-1":
    case "up-police-si-2025":
    default:
      return calculateAverageShiftAdjustedMarks(row, examConfig, allShiftAverage, shiftAverageMap);
  }
}

function calculateAverageShiftAdjustedMarks(row, examConfig, allShiftAverage, shiftAverageMap) {
  const rawMarks = Number(row.rawMarks) || 0;
  const shiftKey = normalizeKey(row.shift) || "__no_shift__";
  const shiftAverage = Number(shiftAverageMap[shiftKey]);
  const adjustment = Number.isFinite(allShiftAverage) && Number.isFinite(shiftAverage)
    ? allShiftAverage - shiftAverage
    : 0;
  return clampMarks(rawMarks + adjustment, examConfig);
}

function clampMarks(value, examConfig) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) return 0;
  const maxMarks = Number(examConfig && examConfig.totalQuestions) * Number(examConfig && examConfig.marksPerCorrect);
  if (Number.isFinite(maxMarks) && maxMarks > 0) return round2(Math.min(Math.max(normalized, 0), maxMarks));
  return round2(Math.max(normalized, 0));
}

function calculateTieAwareRank(rows, targetRow, scoreField) {
  const field = scoreField || "rawMarks";
  const sorted = rows.slice().sort(function (a, b) {
    return Number(b[field] || 0) - Number(a[field] || 0);
  });

  let previousMarks = null;
  let previousRank = 0;

  for (let index = 0; index < sorted.length; index += 1) {
    const marks = Number(sorted[index][field] || 0);
    const rank = marks === previousMarks ? previousRank : index + 1;
    previousMarks = marks;
    previousRank = rank;
    if (sorted[index].rowNumber === targetRow.rowNumber) return rank;
  }

  return 0;
}

function countAtLeast(rows, targetMarks, scoreField) {
  const field = scoreField || "rawMarks";
  const marks = Number(targetMarks) || 0;
  return rows.filter(function (row) {
    return Number(row[field] || 0) >= marks;
  }).length || 0;
}

function averageMarks(rows, scoreField) {
  if (!rows.length) return 0;
  const field = scoreField || "rawMarks";
  return round2(rows.reduce(function (total, row) {
    return total + (Number(row[field]) || 0);
  }, 0) / rows.length);
}

function buildSubjectAnalysis(rowsForExam, targetRow) {
  if (!Array.isArray(targetRow.subjectData) || !targetRow.subjectData.length) return [];

  return targetRow.subjectData.map(function (subject) {
    const name = normalizeText(subject.name);
    const matchingScores = rowsForExam.map(function (row) {
      const match = (row.subjectData || []).find(function (item) {
        return normalizeKey(item.name) === normalizeKey(name);
      });
      return match ? Number(match.marks || match.score || 0) : null;
    }).filter(function (value) {
      return value !== null;
    });

    const attempted = Number(subject.attempted) || 0;
    const correct = Number(subject.correct) || 0;
    const score = Number(subject.marks || subject.score || 0);

    return {
      name: name,
      score: round2(score),
      avgScore: matchingScores.length ? round2(matchingScores.reduce(function (total, value) {
        return total + value;
      }, 0) / matchingScores.length) : 0,
      accuracy: attempted ? round2((correct / attempted) * 100) : 0
    };
  });
}

function calculatePercentile(totalSubmissions, overallRank) {
  const total = Number(totalSubmissions) || 0;
  const rank = Number(overallRank) || 0;
  if (total <= 0 || rank <= 0) return 0;
  if (total === 1) return 100;
  return round2(((total - rank) / total) * 100);
}

function writeAnalytics(sheet, columnMap, rowNumber, analytics) {
  const values = {
    "Normalized Marks": analytics.normalizedMarks,
    "Percentile": analytics.percentile,
    "Gender Rank": analytics.genderRank,
    "Gender Category Rank": analytics.genderCategoryRank,
    "Gender State Rank": analytics.genderStateRank,
    "Gender Shift Rank": analytics.genderShiftRank,
    "Average Marks": analytics.averageMarks,
    "Average Shift Marks": analytics.averageShiftMarks,
    "Category Average Marks": analytics.categoryAverageMarks
  };

  Object.keys(values).forEach(function (header) {
    const index = columnMap[normalizeHeader(header)];
    if (index !== undefined) sheet.getRange(rowNumber, index + 1).setValue(values[header]);
  });
}

function buildNotFoundDebug(sheet, data, rows) {
  return {
    sheetName: data.sheetName,
    searchedRoll: normalizeRoll(data.rollNumber),
    searchedMobile: maskMobile(data.mobileNumber),
    searchedDob: normalizeDob(data.dob),
    searchedExamDate: normalizeDob(data.examDate),
    searchedShift: normalizeShift(data.shift),
    totalRows: sheet.getLastRow(),
    firstFiveRows: rows.slice(0, 5).map(function (row) {
      return {
        roll: row.rollNumber,
        mobile: maskMobile(row.mobileNumber),
        dob: row.dob,
        examDate: row.examDate,
        shift: row.shift
      };
    })
  };
}

function validateSubmitPayload(data) {
  ["examId", "examName", "sheetName", "mode", "rollNumber", "mobileNumber", "dob", "category", "state", "examDate"].forEach(function (key) {
    if (!String(data[key] || "").trim()) throw new Error(key + " is required.");
  });

  ["totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "unattempted", "marksPerCorrect", "negativeMarking", "rawMarks"].forEach(function (key) {
    if (!isFinite(Number(data[key]))) throw new Error(key + " must be a number.");
  });

  if (Number(data.totalQuestions) <= 0) throw new Error("Total questions must be configured.");
  if (Number(data.totalAttempted) > Number(data.totalQuestions)) throw new Error("Total attempted cannot exceed total questions.");
  if (Number(data.rightAnswers) + Number(data.wrongAnswers) > Number(data.totalAttempted)) throw new Error("Right and wrong answers cannot exceed total attempted.");
  if (Number(data.unattempted) < 0) throw new Error("Unattempted cannot be negative.");
  if (!isValidMobile(data.mobileNumber)) throw new Error("Mobile number must be 10 digits.");
}

function validateCheckPayload(data) {
  ["examId", "examName", "sheetName", "rollNumber", "mobileNumber", "dob"].forEach(function (key) {
    if (!String(data[key] || "").trim()) throw new Error(key + " is required.");
  });
  if (!isValidMobile(data.mobileNumber)) throw new Error("Mobile number must be 10 digits.");
}

function calculateRawMarks(data) {
  return round2(
    (Number(data.rightAnswers) || 0) * (Number(data.marksPerCorrect) || 0) -
    (Number(data.wrongAnswers) || 0) * (Number(data.negativeMarking) || 0)
  );
}

function readOptionalNumber(value) {
  if (value === "" || value === undefined || value === null) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeSubjectData(subjectData, data) {
  if (!Array.isArray(subjectData)) return [];
  return subjectData.map(function (subject) {
    const attempted = Number(subject.attempted) || 0;
    const correct = Number(subject.correct) || 0;
    const wrong = Number(subject.wrong) || 0;
    const marks = isFinite(Number(subject.marks))
      ? Number(subject.marks)
      : round2((correct * (Number(data.marksPerCorrect) || 0)) - (wrong * (Number(data.negativeMarking) || 0)));
    return {
      name: normalizeText(subject.name),
      attempted: attempted,
      correct: correct,
      wrong: wrong,
      marks: round2(marks)
    };
  }).filter(function (subject) {
    return subject.name;
  });
}

function parseSubjectData(value) {
  if (!value) return [];
  if (Array.isArray(value)) return normalizeSubjectData(value, {});
  try {
    const parsed = JSON.parse(String(value));
    return normalizeSubjectData(parsed, {});
  } catch (error) {
    return [];
  }
}

function getHeaderValue(row, columnMap, header) {
  const index = columnMap[normalizeHeader(header)];
  return index === undefined ? "" : row[index];
}

function setHeaderValue(row, columnMap, header, value) {
  const index = columnMap[normalizeHeader(header)];
  if (index !== undefined) row[index] = value;
}

function setTextFormat(sheet, columnMap, rowNumber, header) {
  const index = columnMap[normalizeHeader(header)];
  if (index !== undefined) sheet.getRange(rowNumber, index + 1).setNumberFormat("@");
}

function normalizeDob(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(value).trim();
}

function normalizeRoll(value) {
  return String(value || "").trim();
}

function normalizeMobile(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.indexOf("91") === 0) return digits.slice(2);
  return digits;
}

function isValidMobile(value) {
  return /^\d{10}$/.test(normalizeMobile(value));
}

function maskMobile(value) {
  const mobile = normalizeMobile(value);
  if (mobile.length < 4) return mobile;
  return "******" + mobile.slice(-4);
}

function normalizeShift(value) {
  return String(value || "").trim();
}

function normalizeText(value) {
  return String(value || "").trim();
}

function normalizeKey(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeHeader(value) {
  return String(value || "").trim().toLowerCase();
}

function getAccuracyIndicator(totalSubmissions) {
  if (totalSubmissions >= 1000) return "High";
  if (totalSubmissions >= 100) return "Medium";
  return "Low";
}

function sendJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function round2(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}
