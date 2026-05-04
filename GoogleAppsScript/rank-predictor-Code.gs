const SPREADSHEET_ID = "1IIDP7Slon3zRDlOH0hxzOnAZd4fzYi5nZHphVCW2_wE";

const HEADERS = [
  "Timestamp",
  "Exam ID",
  "Exam Name",
  "Mode",
  "Roll Number",
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

function doGet() {
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

    Logger.log("Incoming payload: " + JSON.stringify(data));

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
  Logger.log("Submit Data: " + JSON.stringify(data));

  data.rollNumber = normalizeRoll(data.rollNumber);
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
  const columnMap = ensureSheetSchema(sheet);
  const rows = getRowsByHeaders(sheet, columnMap);

  const existing = findCandidateRow(rows, data);
  if (existing) {
    return sendJSON({
      success: false,
      duplicate: true,
      message: "Your data already exists. Use Check My Rank."
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

  const rankData = calculateAnalytics(refreshedRows, targetRow);
  writeAnalytics(sheet, refreshedMap, targetRow.rowNumber, rankData);

  return sendJSON({
    success: true,
    duplicate: false,
    message: "Data submitted successfully",
    data: rankData
  });
}

function checkRank(data) {
  Logger.log("Check Rank Request: " + JSON.stringify(data));

  data.rollNumber = normalizeRoll(data.rollNumber);
  data.dob = normalizeDob(data.dob);
  data.examDate = normalizeDob(data.examDate);
  data.shift = normalizeShift(data.shift);

  validateCheckPayload(data);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(String(data.sheetName).trim());

  if (!sheet) {
    return sendJSON({
      success: false,
      found: false,
      message: "No data found",
      debug: {
        sheetName: data.sheetName,
        searchedRoll: data.rollNumber,
        searchedDob: data.dob,
        totalRows: 0,
        firstFiveRows: []
      }
    });
  }

  const columnMap = ensureSheetSchema(sheet);
  const rows = getRowsByHeaders(sheet, columnMap);

  Logger.log("Check Rank Lookup: " + JSON.stringify({
    sheetName: data.sheetName,
    rollNumber: data.rollNumber,
    dob: data.dob,
    examDate: data.examDate,
    shift: data.shift,
    totalRows: sheet.getLastRow()
  }));

  const targetRow = findCandidateRow(rows, data);

  if (!targetRow) {
    return sendJSON({
      success: false,
      found: false,
      message: "No data found",
      debug: buildNotFoundDebug(sheet, data, rows)
    });
  }

  const rankData = calculateAnalytics(rows, targetRow);
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
  setHeaderValue(row, columnMap, "Percentile", "");
  setHeaderValue(row, columnMap, "Subject Data (JSON)", JSON.stringify(data.subjectData || []));
  setHeaderValue(row, columnMap, "Answer Key Link", data.answerKeyLink || "");
  setHeaderValue(row, columnMap, "User Agent", data.userAgent || "");

  const nextRow = sheet.getLastRow() + 1;
  ["Roll Number", "DOB", "Exam Date", "Shift", "Subject Data (JSON)"].forEach(function (header) {
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
      dob: normalizeDob(getHeaderValue(row, columnMap, "DOB")),
      candidateName: getHeaderValue(row, columnMap, "Candidate Name"),
      gender: normalizeText(getHeaderValue(row, columnMap, "Gender")),
      category: normalizeText(getHeaderValue(row, columnMap, "Category")),
      state: normalizeText(getHeaderValue(row, columnMap, "State")),
      examDate: normalizeDob(getHeaderValue(row, columnMap, "Exam Date")),
      shift: normalizeShift(getHeaderValue(row, columnMap, "Shift")),
      rawMarks: Number(getHeaderValue(row, columnMap, "Raw Marks")) || 0,
      percentile: Number(getHeaderValue(row, columnMap, "Percentile")) || 0,
      subjectData: parseSubjectData(getHeaderValue(row, columnMap, "Subject Data (JSON)"))
    };
  });
}

function findCandidateRow(rows, data) {
  const searchedRoll = normalizeRoll(data.rollNumber);
  const searchedDob = normalizeDob(data.dob);
  const searchedExamId = normalizeText(data.examId);

  return rows.find(function (row) {
    const sameExam = !row.examId || !searchedExamId || row.examId === searchedExamId;
    return sameExam && row.rollNumber === searchedRoll && row.dob === searchedDob;
  }) || null;
}

function calculateAnalytics(rows, targetRow) {
  const rowsForExam = rows.filter(function (row) {
    const sameExam = !targetRow.examId || !row.examId || row.examId === targetRow.examId;
    return sameExam && row.rollNumber && row.dob;
  });

  const overallRank = calculateTieAwareRank(rowsForExam, targetRow);
  const totalSubmissions = rowsForExam.length;
  const percentile = calculatePercentile(totalSubmissions, overallRank);
  const sameShiftRows = rowsForExam.filter(function (row) {
    return normalizeKey(row.shift) === normalizeKey(targetRow.shift);
  });
  const sameCategoryRows = rowsForExam.filter(function (row) {
    return normalizeKey(row.category) === normalizeKey(targetRow.category);
  });

  return {
    found: true,
    rawMarks: Number(targetRow.rawMarks),
    marks: Number(targetRow.rawMarks),
    percentile: percentile,
    overallRank: overallRank,
    categoryRank: calculateTieAwareRank(sameCategoryRows, targetRow),
    stateRank: calculateTieAwareRank(rowsForExam.filter(function (row) {
      return normalizeKey(row.state) === normalizeKey(targetRow.state);
    }), targetRow),
    shiftRank: calculateTieAwareRank(sameShiftRows, targetRow),
    genderRank: countAtLeast(rowsForExam.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(targetRow.gender);
    }), targetRow.rawMarks),
    genderCategoryRank: countAtLeast(rowsForExam.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(targetRow.gender) &&
        normalizeKey(row.category) === normalizeKey(targetRow.category);
    }), targetRow.rawMarks),
    genderStateRank: countAtLeast(rowsForExam.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(targetRow.gender) &&
        normalizeKey(row.state) === normalizeKey(targetRow.state);
    }), targetRow.rawMarks),
    genderShiftRank: countAtLeast(rowsForExam.filter(function (row) {
      return normalizeKey(row.gender) === normalizeKey(targetRow.gender) &&
        normalizeKey(row.shift) === normalizeKey(targetRow.shift);
    }), targetRow.rawMarks),
    averageMarks: averageMarks(rowsForExam),
    averageShiftMarks: averageMarks(sameShiftRows),
    categoryAverageMarks: averageMarks(sameCategoryRows),
    subjectAnalysis: buildSubjectAnalysis(rowsForExam, targetRow),
    totalSubmissions: totalSubmissions,
    accuracyIndicator: getAccuracyIndicator(totalSubmissions),
    rankBasis: "raw",
    lastUpdated: new Date().toISOString()
  };
}

function calculateTieAwareRank(rows, targetRow) {
  const sorted = rows.slice().sort(function (a, b) {
    return Number(b.rawMarks || 0) - Number(a.rawMarks || 0);
  });

  let previousMarks = null;
  let previousRank = 0;

  for (let index = 0; index < sorted.length; index += 1) {
    const marks = Number(sorted[index].rawMarks || 0);
    const rank = marks === previousMarks ? previousRank : index + 1;
    previousMarks = marks;
    previousRank = rank;
    if (sorted[index].rowNumber === targetRow.rowNumber) return rank;
  }

  return 0;
}

function countAtLeast(rows, targetMarks) {
  const marks = Number(targetMarks) || 0;
  return rows.filter(function (row) {
    return Number(row.rawMarks || 0) >= marks;
  }).length || 0;
}

function averageMarks(rows) {
  if (!rows.length) return 0;
  return round2(rows.reduce(function (total, row) {
    return total + (Number(row.rawMarks) || 0);
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
    searchedDob: normalizeDob(data.dob),
    searchedExamDate: normalizeDob(data.examDate),
    searchedShift: normalizeShift(data.shift),
    totalRows: sheet.getLastRow(),
    firstFiveRows: rows.slice(0, 5).map(function (row) {
      return {
        roll: row.rollNumber,
        dob: row.dob,
        examDate: row.examDate,
        shift: row.shift
      };
    })
  };
}

function validateSubmitPayload(data) {
  ["examId", "examName", "sheetName", "mode", "rollNumber", "dob", "category", "state", "examDate"].forEach(function (key) {
    if (!String(data[key] || "").trim()) throw new Error(key + " is required.");
  });

  ["totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "unattempted", "marksPerCorrect", "negativeMarking", "rawMarks"].forEach(function (key) {
    if (!isFinite(Number(data[key]))) throw new Error(key + " must be a number.");
  });

  if (Number(data.totalQuestions) <= 0) throw new Error("Total questions must be configured.");
  if (Number(data.totalAttempted) > Number(data.totalQuestions)) throw new Error("Total attempted cannot exceed total questions.");
  if (Number(data.rightAnswers) + Number(data.wrongAnswers) > Number(data.totalAttempted)) throw new Error("Right and wrong answers cannot exceed total attempted.");
  if (Number(data.unattempted) < 0) throw new Error("Unattempted cannot be negative.");
}

function validateCheckPayload(data) {
  ["examId", "examName", "sheetName", "rollNumber", "dob"].forEach(function (key) {
    if (!String(data[key] || "").trim()) throw new Error(key + " is required.");
  });
}

function calculateRawMarks(data) {
  return round2(
    (Number(data.rightAnswers) || 0) * (Number(data.marksPerCorrect) || 0) -
    (Number(data.wrongAnswers) || 0) * (Number(data.negativeMarking) || 0)
  );
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
