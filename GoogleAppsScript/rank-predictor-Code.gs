const SPREADSHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";

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
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (payload.action === "submitData") return sendJson(submitData(payload, e));
    if (payload.action === "checkRank") return sendJson(checkRank(payload));
    if (payload.action === "getExamStats") return sendJson(getExamStats(payload));
    if (payload.action === "getLeaderboard") return sendJson(getLeaderboard(payload));
    return sendJson({ success: false, message: "Unsupported action." });
  } catch (error) {
    return sendJson({ success: false, message: error.message || "Invalid request." });
  }
}

function submitData(payload, event) {
  validateSubmitPayload(payload);
  payload.rawMarks = calculateRawMarks(payload);
  payload.normalizedMarks = payload.normalizedMarks === "" || payload.normalizedMarks === undefined ? "" : Number(payload.normalizedMarks);

  const sheet = getSheetByExam(payload.sheetName);
  setupHeaders(sheet);

  if (findCandidate(sheet, payload.examId, payload.rollNumber, payload.dob)) {
    return {
      success: false,
      duplicate: true,
      message: "Your data already exists. Use Check My Rank."
    };
  }

  appendCandidateData(sheet, payload, getUserAgent(event));
  const candidateRow = findCandidate(sheet, payload.examId, payload.rollNumber, payload.dob);
  return Object.assign({
    success: true,
    duplicate: false,
    message: "Data submitted successfully."
  }, calculateRanks(sheet, candidateRow));
}

function checkRank(payload) {
  validateCheckPayload(payload);
  const sheet = getSheetByExam(payload.sheetName);
  setupHeaders(sheet);
  const candidateRow = findCandidate(sheet, payload.examId, payload.rollNumber, payload.dob);
  if (!candidateRow) {
    return { success: false, found: false, message: "No data found. Please submit your data first." };
  }
  return Object.assign({ success: true, found: true, message: "Rank found successfully." }, calculateRanks(sheet, candidateRow));
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

function getSheetByExam(sheetName) {
  const safeName = String(sheetName || "").trim();
  if (!safeName) throw new Error("Sheet name is required.");
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(safeName) || spreadsheet.insertSheet(safeName);
}

function setupHeaders(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = range.getValues()[0];
  if (current.join("") !== HEADERS.join("")) {
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
  return getRows(sheet).find(function (row) {
    return String(row.examId) === String(examId) &&
      normalizeKey(row.rollNumber) === normalizeKey(rollNumber) &&
      normalizeDob(row.dob) === normalizeDob(dob);
  }) || null;
}

function appendCandidateData(sheet, payload, userAgent) {
  const unattempted = Number(payload.unattempted) || Math.max(Number(payload.totalQuestions) - Number(payload.totalAttempted), 0);
  sheet.appendRow([
    new Date(),
    payload.examId,
    payload.examName,
    payload.board || "",
    payload.stage || "",
    payload.shift || "",
    payload.mode,
    payload.candidateName || "Private",
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
    Number(payload.rawMarks),
    payload.normalizedMarks,
    payload.answerKeyLink || "",
    "",
    "",
    "",
    "",
    userAgent || ""
  ]);
}

function calculateRanks(sheet, candidateRow) {
  if (!candidateRow) return { found: false };
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

  sheet.getRange(candidateRow.rowNumber, 24, 1, 4).setValues([[overallRank, categoryRank, stateRank, shiftRank]]);

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
  return sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues().map(function (row, index) {
    return {
      rowNumber: index + 2,
      timestamp: row[0],
      examId: row[1],
      examName: row[2],
      board: row[3],
      stage: row[4],
      shift: row[5],
      mode: row[6],
      candidateName: row[7],
      rollNumber: row[8],
      dob: row[9],
      gender: row[10],
      category: row[11],
      state: row[12],
      totalQuestions: row[13],
      totalAttempted: row[14],
      rightAnswers: row[15],
      wrongAnswers: row[16],
      unattempted: row[17],
      marksPerCorrect: row[18],
      negativeMarking: row[19],
      rawMarks: Number(row[20]) || 0,
      normalizedMarks: row[21] === "" ? "" : Number(row[21])
    };
  });
}

function compareByRankMarks(a, b) {
  return getRankMarks(b) - getRankMarks(a);
}

function getRankMarks(row) {
  return row.normalizedMarks !== "" && row.normalizedMarks !== null && row.normalizedMarks !== undefined ? Number(row.normalizedMarks) : Number(row.rawMarks);
}

function sendJson(response) {
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
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
