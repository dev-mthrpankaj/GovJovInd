const SPREADSHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";

const HEADERS = [
  "Timestamp",
  "Exam ID",
  "Exam Name",
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
  "Expected Marks",
  "Answer Key Link",
  "Overall Rank",
  "Category Rank",
  "State Rank",
  "User Agent"
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    return sendJson(routeRequest(payload, e));
  } catch (error) {
    return sendJson({ success: false, message: error.message || "Invalid request." });
  }
}

function routeRequest(payload, event) {
  if (!payload || !payload.action) {
    return { success: false, message: "Action is required." };
  }

  if (payload.action === "submitData") {
    validateSubmitPayload(payload);
    payload.expectedMarks = calculateMarks(payload);
    const sheet = getSheetByExam(payload.sheetName);
    setupSheetHeaders(sheet);

    if (findExistingCandidate(sheet, payload.rollNumber, payload.dob, payload.examId)) {
      return {
        success: false,
        duplicate: true,
        message: "Data already exists for this Roll Number and Date of Birth. Please use Check My Rank."
      };
    }

    appendCandidateData(sheet, payload, getUserAgent(event));
    const rankResult = calculateRanks(sheet, payload.rollNumber, payload.dob, payload.examId);
    return Object.assign({
      success: true,
      duplicate: false,
      message: "Data submitted successfully."
    }, rankResult);
  }

  if (payload.action === "checkRank") {
    validateCheckPayload(payload);
    const sheet = getSheetByExam(payload.sheetName);
    setupSheetHeaders(sheet);
    const rankResult = calculateRanks(sheet, payload.rollNumber, payload.dob, payload.examId);
    if (!rankResult.found) {
      return {
        success: false,
        found: false,
        message: "No data found for this Roll Number and Date of Birth. Please submit your data first."
      };
    }
    return Object.assign({ success: true, found: true, message: "Rank found successfully." }, rankResult);
  }

  if (payload.action === "getExamStats") {
    const sheet = getSheetByExam(payload.sheetName);
    setupSheetHeaders(sheet);
    const totalSubmissions = getTotalSubmissions(sheet);
    return { success: true, totalSubmissions, accuracyIndicator: getAccuracyIndicator(totalSubmissions) };
  }

  if (payload.action === "getLeaderboard") {
    const sheet = getSheetByExam(payload.sheetName);
    setupSheetHeaders(sheet);
    return { success: true, leaderboard: getLeaderboard(sheet) };
  }

  return { success: false, message: "Unsupported action." };
}

function getSheetByExam(sheetName) {
  const safeName = String(sheetName || "").trim();
  if (!safeName) throw new Error("Sheet name is required.");
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(safeName) || spreadsheet.insertSheet(safeName);
}

function setupSheetHeaders(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = range.getValues()[0];
  if (current.join("") !== HEADERS.join("")) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function validateSubmitPayload(payload) {
  const required = [
    "examId",
    "examName",
    "sheetName",
    "mode",
    "candidateName",
    "rollNumber",
    "dob",
    "gender",
    "category",
    "state"
  ];
  required.forEach(function (key) {
    if (!String(payload[key] || "").trim()) throw new Error(key + " is required.");
  });

  ["totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "marksPerCorrect", "negativeMarking"].forEach(function (key) {
    if (!isFinite(Number(payload[key]))) throw new Error(key + " must be a number.");
  });

  if (Number(payload.totalAttempted) > Number(payload.totalQuestions)) {
    throw new Error("Total attempted cannot exceed total questions.");
  }
  if (Number(payload.rightAnswers) + Number(payload.wrongAnswers) > Number(payload.totalAttempted)) {
    throw new Error("Right and wrong answers cannot exceed total attempted.");
  }
}

function validateCheckPayload(payload) {
  ["examId", "sheetName", "rollNumber", "dob"].forEach(function (key) {
    if (!String(payload[key] || "").trim()) throw new Error(key + " is required.");
  });
}

function calculateMarks(payload) {
  const right = Number(payload.rightAnswers) || 0;
  const wrong = Number(payload.wrongAnswers) || 0;
  const marksPerCorrect = Number(payload.marksPerCorrect) || 0;
  const negativeMarking = Number(payload.negativeMarking) || 0;
  return round2((right * marksPerCorrect) - (wrong * negativeMarking));
}

function findExistingCandidate(sheet, rollNumber, dob, examId) {
  return findRowIndex(sheet, rollNumber, dob, examId) > -1;
}

function appendCandidateData(sheet, payload, userAgent) {
  const unattempted = Number(payload.unattempted) || Math.max(Number(payload.totalQuestions) - Number(payload.totalAttempted), 0);
  sheet.appendRow([
    new Date(),
    payload.examId,
    payload.examName,
    payload.mode,
    payload.candidateName,
    normalizeKey(payload.rollNumber),
    payload.dob,
    payload.gender,
    payload.category,
    payload.state,
    Number(payload.totalQuestions),
    Number(payload.totalAttempted),
    Number(payload.rightAnswers),
    Number(payload.wrongAnswers),
    unattempted,
    Number(payload.marksPerCorrect),
    Number(payload.negativeMarking),
    Number(payload.expectedMarks),
    payload.answerKeyLink || "",
    "",
    "",
    "",
    userAgent || ""
  ]);
}

function calculateRanks(sheet, rollNumber, dob, examId) {
  const rows = getDataRows(sheet).filter(function (row) {
    return String(row.examId) === String(examId);
  });
  const target = rows.find(function (row) {
    return normalizeKey(row.rollNumber) === normalizeKey(rollNumber) && normalizeDob(row.dob) === normalizeDob(dob);
  });

  if (!target) return { found: false };

  const overallRank = rankWithin(rows, target);
  const categoryRank = rankWithin(rows.filter(function (row) {
    return normalizeKey(row.category) === normalizeKey(target.category);
  }), target);
  const stateRank = rankWithin(rows.filter(function (row) {
    return normalizeKey(row.state) === normalizeKey(target.state);
  }), target);

  writeRanks(sheet, target.rowNumber, overallRank, categoryRank, stateRank);

  const totalSubmissions = rows.length;
  return {
    found: true,
    candidateName: target.candidateName,
    expectedMarks: Number(target.expectedMarks),
    overallRank,
    categoryRank,
    stateRank,
    totalSubmissions,
    accuracyIndicator: getAccuracyIndicator(totalSubmissions),
    lastUpdated: new Date().toISOString()
  };
}

function getDataRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  return values.map(function (row, index) {
    return {
      rowNumber: index + 2,
      timestamp: row[0],
      examId: row[1],
      examName: row[2],
      mode: row[3],
      candidateName: row[4],
      rollNumber: row[5],
      dob: row[6],
      gender: row[7],
      category: row[8],
      state: row[9],
      totalQuestions: row[10],
      totalAttempted: row[11],
      rightAnswers: row[12],
      wrongAnswers: row[13],
      unattempted: row[14],
      marksPerCorrect: row[15],
      negativeMarking: row[16],
      expectedMarks: Number(row[17]) || 0
    };
  });
}

function findRowIndex(sheet, rollNumber, dob, examId) {
  const rows = getDataRows(sheet);
  const found = rows.find(function (row) {
    return String(row.examId) === String(examId) &&
      normalizeKey(row.rollNumber) === normalizeKey(rollNumber) &&
      normalizeDob(row.dob) === normalizeDob(dob);
  });
  return found ? found.rowNumber : -1;
}

function rankWithin(rows, target) {
  const sorted = rows.slice().sort(function (a, b) {
    return Number(b.expectedMarks) - Number(a.expectedMarks);
  });
  let rank = 0;
  let previousMarks = null;
  let previousRank = 0;
  for (let index = 0; index < sorted.length; index += 1) {
    const marks = Number(sorted[index].expectedMarks);
    rank = marks === previousMarks ? previousRank : index + 1;
    previousMarks = marks;
    previousRank = rank;
    if (sorted[index].rowNumber === target.rowNumber) return rank;
  }
  return 0;
}

function writeRanks(sheet, rowNumber, overallRank, categoryRank, stateRank) {
  sheet.getRange(rowNumber, 20, 1, 3).setValues([[overallRank, categoryRank, stateRank]]);
}

function getTotalSubmissions(sheet) {
  return Math.max(sheet.getLastRow() - 1, 0);
}

function getLeaderboard(sheet) {
  return getDataRows(sheet)
    .sort(function (a, b) {
      return Number(b.expectedMarks) - Number(a.expectedMarks);
    })
    .slice(0, 20)
    .map(function (row, index) {
      return {
        rank: index + 1,
        expectedMarks: row.expectedMarks,
        category: row.category,
        state: row.state
      };
    });
}

function sendJson(response) {
  return ContentService
    .createTextOutput(JSON.stringify(response))
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

function normalizeDob(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(value || "").trim();
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
