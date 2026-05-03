const SPREADSHEET_ID = "1IIDP7Slon3zRDlOH0hxzOnAZd4fzYi5nZHphVCW2_wE";

const HEADERS = [
  "Timestamp",
  "Exam ID",
  "Exam Name",
  "Board",
  "Stage",
  "Shift",
  "Mode",
  "Candidate Name",
  "Roll Number",
  "DOB",
  "Gender",
  "Category",
  "State",
  "Total Questions",
  "Total Attempted",
  "Right Answers",
  "Wrong Answers",
  "Unattempted",
  "Marks Per Correct",
  "Negative Marking",
  "Raw Marks",
  "Normalized Marks",
  "Answer Key Link",
  "Overall Rank",
  "Category Rank",
  "State Rank",
  "Shift Rank",
  "User Agent"
];

function doPost(e) {
  try {
    let raw = e && e.postData && e.postData.contents;

    if (!raw) {
      return sendJSON({
        success: false,
        message: "No data received"
      });
    }

    let data;

    try {
      data = JSON.parse(raw);
    } catch (err) {
      return sendJSON({
        success: false,
        message: "Invalid JSON format"
      });
    }

    Logger.log(JSON.stringify(data));

    if (!data.action) {
      return sendJSON({
        success: false,
        message: "Missing action"
      });
    }

    if (data.action === "submitData") {
      return submitData(data);
    }

    if (data.action === "checkRank") {
      return checkRank(data);
    }

    return sendJSON({
      success: false,
      message: "Invalid action"
    });

  } catch (error) {
    return sendJSON({
      success: false,
      message: "Server error: " + error.message
    });
  }
}

function doGet() {
  return sendJSON({
    success: true,
    message: "API working"
  });
}

function submitData(data) {
  Logger.log("Incoming Data: " + JSON.stringify(data));

  if (!data.sheetName) {
    return sendJSON({
      success: false,
      message: "Sheet name missing"
    });
  }

  data.rollNumber = normalizeRoll(data.rollNumber);
  data.dob = normalizeDob(data.dob);
  validateSubmitPayload(data);
  data.rawMarks = calculateRawMarks(data);
  data.normalizedMarks = data.normalizedMarks === "" || data.normalizedMarks === undefined ? "" : Number(data.normalizedMarks);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getSheetByExam(data.sheetName, spreadsheet);
  setupHeaders(sheet);

  if (findCandidate(sheet, data.examId, data.rollNumber, data.dob)) {
    return sendJSON({
      success: false,
      duplicate: true,
      message: "Your data already exists. Use Check My Rank."
    });
  }

  const appendedRowNumber = appendCandidateData(sheet, data, "");
  SpreadsheetApp.flush();
  const candidateRow = findCandidate(sheet, data.examId, data.rollNumber, data.dob) || getRows(sheet).find(function (row) {
    return row.rowNumber === appendedRowNumber;
  });

  if (!candidateRow) {
    return sendJSON({
      success: false,
      message: "Data saved, but rank calculation failed",
      debug: {
        sheetName: data.sheetName,
        searchedRoll: normalizeRoll(data.rollNumber),
        searchedDob: normalizeDob(data.dob),
        totalRows: sheet.getLastRow(),
        sampleRows: getDebugSampleRows(sheet)
      }
    });
  }

  return sendJSON({
    success: true,
    duplicate: false,
    message: "Data submitted successfully",
    data: calculateRanks(sheet, candidateRow)
  });
}

function checkRank(data) {
  Logger.log("Check Rank Request: " + JSON.stringify(data));

  if (!data.sheetName) {
    return sendJSON({
      success: false,
      message: "Sheet name missing"
    });
  }

  data.rollNumber = normalizeRoll(data.rollNumber);
  data.dob = normalizeDob(data.dob);
  validateCheckPayload(data);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getSheetByExam(data.sheetName, spreadsheet);
  setupHeaders(sheet);
  const rows = getRows(sheet);

  Logger.log("Check Rank Lookup: " + JSON.stringify({
    sheetName: data.sheetName,
    rollNumber: data.rollNumber,
    dob: data.dob,
    totalRows: sheet.getLastRow()
  }));

  const candidateRow = findCandidate(sheet, data.examId, data.rollNumber, data.dob);
  if (!candidateRow) {
    return sendJSON({
      success: false,
      found: false,
      message: `No record found in ${data.sheetName} for this Roll Number and DOB.`,
      debug: {
        sheetName: data.sheetName,
        searchedRoll: normalizeRoll(data.rollNumber),
        searchedDob: normalizeDob(data.dob),
        totalRows: sheet.getLastRow(),
        sampleRows: rows.slice(0, 3).map(function (row) {
          return {
            roll: normalizeRoll(row.rollNumber),
            dob: normalizeDob(row.dob)
          };
        })
      }
    });
  }

  return sendJSON({
    success: true,
    found: true,
    message: "Rank found successfully.",
    data: calculateRanks(sheet, candidateRow)
  });
}

function getExamStats(payload) {
  const sheet = getSheetByExam(payload.sheetName);
  setupHeaders(sheet);
  const totalSubmissions = getRows(sheet).filter(function (row) {
    return String(row.examId) === String(payload.examId || row.examId);
  }).length;
  return { success: true, totalSubmissions, accuracyIndicator: getAccuracyIndicator(totalSubmissions) };
}

function getLeaderboard(payload) {
  const sheet = getSheetByExam(payload.sheetName);
  setupHeaders(sheet);
  const rows = getRows(sheet).filter(function (row) {
    return String(row.examId) === String(payload.examId || row.examId);
  });
  return {
    success: true,
    leaderboard: rows.sort(compareByRankMarks).slice(0, 50).map(function (row, index) {
      return {
        rank: index + 1,
        marks: getRankMarks(row),
        category: row.category,
        state: row.state,
        shift: row.shift
      };
    })
  };
}

function getSheetByExam(sheetName, spreadsheet) {
  const safeName = String(sheetName || "").trim();
  if (!safeName) throw new Error("Sheet name is required.");
  const activeSpreadsheet = spreadsheet || SpreadsheetApp.openById(SPREADSHEET_ID);
  return activeSpreadsheet.getSheetByName(safeName) || activeSpreadsheet.insertSheet(safeName);
}

function setupHeaders(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = range.getValues()[0];
  const indexes = getHeaderIndexes(current);
  const hasCandidateHeaders = indexes["exam id"] !== undefined &&
    indexes["roll number"] !== undefined &&
    indexes["dob"] !== undefined;

  if (current.join("") === "" || !hasCandidateHeaders) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function validateSubmitPayload(payload) {
  ["examId", "examName", "sheetName", "mode", "rollNumber", "dob", "gender", "category", "state"].forEach(function (key) {
    if (!String(payload[key] || "").trim()) throw new Error(key + " is required.");
  });
  ["totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "marksPerCorrect", "negativeMarking"].forEach(function (key) {
    if (!isFinite(Number(payload[key]))) throw new Error(key + " must be a number.");
  });
  if (Number(payload.totalAttempted) > Number(payload.totalQuestions)) throw new Error("Total attempted cannot exceed total questions.");
  if (Number(payload.rightAnswers) + Number(payload.wrongAnswers) > Number(payload.totalAttempted)) throw new Error("Right and wrong answers cannot exceed total attempted.");
}

function validateCheckPayload(payload) {
  ["examId", "sheetName", "rollNumber", "dob"].forEach(function (key) {
    if (!String(payload[key] || "").trim()) throw new Error(key + " is required.");
  });
}

function calculateRawMarks(payload) {
  return round2((Number(payload.rightAnswers) || 0) * (Number(payload.marksPerCorrect) || 0) - (Number(payload.wrongAnswers) || 0) * (Number(payload.negativeMarking) || 0));
}

function findCandidate(sheet, examId, rollNumber, dob) {
  const rows = getRows(sheet);
  const searchRoll = normalizeRoll(rollNumber);
  const searchDob = normalizeDob(dob);
  return rows.find(function (row) {
    const rowRoll = normalizeRoll(row.rollNumber);
    const rowDob = normalizeDob(row.dob);
    return String(row.examId) === String(examId) &&
      rowRoll === searchRoll &&
      rowDob === searchDob;
  }) || null;
}

function appendCandidateData(sheet, payload, userAgent) {
  const columns = getColumnMap(sheet);
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const nextRow = sheet.getLastRow() + 1;
  const row = new Array(lastColumn).fill("");
  const unattempted = Number(payload.unattempted) || Math.max(Number(payload.totalQuestions) - Number(payload.totalAttempted), 0);

  setCell(row, columns.timestamp, new Date());
  setCell(row, columns.examId, payload.examId);
  setCell(row, columns.examName, payload.examName);
  setCell(row, columns.board, payload.board || "");
  setCell(row, columns.stage, payload.stage || "");
  setCell(row, columns.shift, payload.shift || "");
  setCell(row, columns.mode, payload.mode);
  setCell(row, columns.candidateName, payload.candidateName || "Private");
  setCell(row, columns.rollNumber, normalizeRoll(payload.rollNumber));
  setCell(row, columns.dob, normalizeDob(payload.dob));
  setCell(row, columns.gender, payload.gender);
  setCell(row, columns.category, payload.category);
  setCell(row, columns.state, payload.state);
  setCell(row, columns.totalQuestions, Number(payload.totalQuestions));
  setCell(row, columns.totalAttempted, Number(payload.totalAttempted));
  setCell(row, columns.rightAnswers, Number(payload.rightAnswers));
  setCell(row, columns.wrongAnswers, Number(payload.wrongAnswers));
  setCell(row, columns.unattempted, unattempted);
  setCell(row, columns.marksPerCorrect, Number(payload.marksPerCorrect));
  setCell(row, columns.negativeMarking, Number(payload.negativeMarking));
  setCell(row, columns.rawMarks, Number(payload.rawMarks));
  setCell(row, columns.normalizedMarks, payload.normalizedMarks);
  setCell(row, columns.answerKeyLink, payload.answerKeyLink || "");
  setCell(row, columns.userAgent, userAgent || "");

  if (columns.rollNumber !== null) sheet.getRange(nextRow, columns.rollNumber + 1).setNumberFormat("@");
  if (columns.dob !== null) sheet.getRange(nextRow, columns.dob + 1).setNumberFormat("@");
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  return nextRow;
}

function calculateRanks(sheet, candidateRow) {
  if (!candidateRow) {
    return {
      found: false,
      marks: 0,
      overallRank: 0,
      categoryRank: 0,
      stateRank: 0,
      totalSubmissions: 0
    };
  }
  const rows = getRows(sheet).filter(function (row) {
    return String(row.examId) === String(candidateRow.examId);
  });
  const overallRank = calculateTieAwareRank(rows, candidateRow);
  const categoryRank = calculateTieAwareRank(rows.filter(function (row) {
    return normalizeKey(row.category) === normalizeKey(candidateRow.category);
  }), candidateRow);
  const stateRank = calculateTieAwareRank(rows.filter(function (row) {
    return normalizeKey(row.state) === normalizeKey(candidateRow.state);
  }), candidateRow);
  const shiftRank = calculateTieAwareRank(rows.filter(function (row) {
    return normalizeKey(row.shift) === normalizeKey(candidateRow.shift);
  }), candidateRow);
  const columns = getColumnMap(sheet);

  if (columns.overallRank !== null) sheet.getRange(candidateRow.rowNumber, columns.overallRank + 1).setValue(overallRank);
  if (columns.categoryRank !== null) sheet.getRange(candidateRow.rowNumber, columns.categoryRank + 1).setValue(categoryRank);
  if (columns.stateRank !== null) sheet.getRange(candidateRow.rowNumber, columns.stateRank + 1).setValue(stateRank);
  if (columns.shiftRank !== null) sheet.getRange(candidateRow.rowNumber, columns.shiftRank + 1).setValue(shiftRank);

  const rankBasis = candidateRow.normalizedMarks !== "" && candidateRow.normalizedMarks !== null && candidateRow.normalizedMarks !== undefined ? "normalized" : "raw";
  return {
    found: true,
    candidateName: "Private",
    rawMarks: Number(candidateRow.rawMarks),
    expectedMarks: Number(candidateRow.rawMarks),
    normalizedMarks: candidateRow.normalizedMarks,
    overallRank,
    categoryRank,
    stateRank,
    shiftRank,
    totalSubmissions: rows.length,
    accuracyIndicator: getAccuracyIndicator(rows.length),
    rankBasis,
    lastUpdated: new Date().toISOString()
  };
}

function calculateTieAwareRank(rows, candidateRow) {
  const sorted = rows.slice().sort(compareByRankMarks);
  let previousMarks = null;
  let previousRank = 0;
  for (let index = 0; index < sorted.length; index += 1) {
    const marks = getRankMarks(sorted[index]);
    const rank = marks === previousMarks ? previousRank : index + 1;
    previousMarks = marks;
    previousRank = rank;
    if (sorted[index].rowNumber === candidateRow.rowNumber) return rank;
  }
  return 0;
}

function getRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const values = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  const columns = getColumnMapFromHeader(values[0]);

  return values.slice(1).map(function (row, index) {
    const normalizedMarks = getCell(row, columns.normalizedMarks);
    return {
      rowNumber: index + 2,
      timestamp: getCell(row, columns.timestamp),
      examId: getCell(row, columns.examId),
      examName: getCell(row, columns.examName),
      board: getCell(row, columns.board),
      stage: getCell(row, columns.stage),
      shift: getCell(row, columns.shift),
      mode: getCell(row, columns.mode),
      candidateName: getCell(row, columns.candidateName),
      rollNumber: normalizeRoll(getCell(row, columns.rollNumber)),
      dob: normalizeDob(getCell(row, columns.dob)),
      gender: getCell(row, columns.gender),
      category: getCell(row, columns.category),
      state: getCell(row, columns.state),
      totalQuestions: getCell(row, columns.totalQuestions),
      totalAttempted: getCell(row, columns.totalAttempted),
      rightAnswers: getCell(row, columns.rightAnswers),
      wrongAnswers: getCell(row, columns.wrongAnswers),
      unattempted: getCell(row, columns.unattempted),
      marksPerCorrect: getCell(row, columns.marksPerCorrect),
      negativeMarking: getCell(row, columns.negativeMarking),
      rawMarks: Number(getCell(row, columns.rawMarks)) || 0,
      normalizedMarks: normalizedMarks === "" ? "" : Number(normalizedMarks)
    };
  });
}

function getDebugSampleRows(sheet) {
  return getRows(sheet).slice(0, 3).map(function (row) {
    return {
      roll: normalizeRoll(row.rollNumber),
      dob: normalizeDob(row.dob)
    };
  });
}

function getColumnMap(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const header = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  return getColumnMapFromHeader(header);
}

function getColumnMapFromHeader(header) {
  const indexes = getHeaderIndexes(header || []);
  return {
    timestamp: getHeaderIndex(indexes, "Timestamp", 0),
    examId: getHeaderIndex(indexes, "Exam ID", 1),
    examName: getHeaderIndex(indexes, "Exam Name", 2),
    board: getHeaderIndex(indexes, "Board", null),
    stage: getHeaderIndex(indexes, "Stage", 4),
    shift: getHeaderIndex(indexes, "Shift", 5),
    mode: getHeaderIndex(indexes, "Mode", 6),
    candidateName: getHeaderIndex(indexes, "Candidate Name", 7),
    rollNumber: getHeaderIndex(indexes, "Roll Number", 8),
    dob: getHeaderIndex(indexes, "DOB", 9),
    gender: getHeaderIndex(indexes, "Gender", 10),
    category: getHeaderIndex(indexes, "Category", 11),
    state: getHeaderIndex(indexes, "State", 12),
    totalQuestions: getHeaderIndex(indexes, "Total Questions", 13),
    totalAttempted: getHeaderIndex(indexes, "Total Attempted", 14),
    rightAnswers: getHeaderIndex(indexes, "Right Answers", 15),
    wrongAnswers: getHeaderIndex(indexes, "Wrong Answers", 16),
    unattempted: getHeaderIndex(indexes, "Unattempted", 17),
    marksPerCorrect: getHeaderIndex(indexes, "Marks Per Correct", 18),
    negativeMarking: getHeaderIndex(indexes, "Negative Marking", 19),
    rawMarks: getHeaderIndex(indexes, "Raw Marks", 20),
    normalizedMarks: getHeaderIndex(indexes, "Normalized Marks", null),
    answerKeyLink: getHeaderIndex(indexes, "Answer Key Link", 22),
    overallRank: getHeaderIndex(indexes, "Overall Rank", null),
    categoryRank: getHeaderIndex(indexes, "Category Rank", null),
    stateRank: getHeaderIndex(indexes, "State Rank", null),
    shiftRank: getHeaderIndex(indexes, "Shift Rank", null),
    userAgent: getHeaderIndex(indexes, "User Agent", 27)
  };
}

function getHeaderIndexes(header) {
  return (header || []).reduce(function (indexes, value, index) {
    const key = normalizeHeader(value);
    if (key) indexes[key] = index;
    return indexes;
  }, {});
}

function getHeaderIndex(indexes, label, fallback) {
  const key = normalizeHeader(label);
  return indexes[key] === undefined ? fallback : indexes[key];
}

function normalizeHeader(value) {
  return String(value || "").trim().toLowerCase();
}

function getCell(row, index) {
  return index === null || index === undefined ? "" : row[index];
}

function setCell(row, index, value) {
  if (index !== null && index !== undefined) row[index] = value;
}

function compareByRankMarks(a, b) {
  return getRankMarks(b) - getRankMarks(a);
}

function getRankMarks(row) {
  return row.normalizedMarks !== "" && row.normalizedMarks !== null && row.normalizedMarks !== undefined ? Number(row.normalizedMarks) : Number(row.rawMarks);
}

function sendJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAccuracyIndicator(totalSubmissions) {
  if (totalSubmissions >= 1000) return "High";
  if (totalSubmissions >= 100) return "Medium";
  return "Low";
}

function normalizeKey(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeRoll(value) {
  return String(value || "").trim().toUpperCase();
}

function normalizeDob(value) {
  if (!value) return "";

  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }

  let str = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
    const parts = str.split("/");
    const a = parts[0].padStart(2, "0");
    const b = parts[1].padStart(2, "0");
    const y = parts[2];

    return `${y}-${a}-${b}`;
  }

  return str;
}

function round2(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function getUserAgent(event) {
  try {
    return (event && event.parameter && event.parameter.userAgent) || "";
  } catch (error) {
    return "";
  }
}
