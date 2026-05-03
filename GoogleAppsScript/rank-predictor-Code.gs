const SPREADSHEET_ID = "1IIDP7Slon3zRDlOH0hxzOnAZd4fzYi5nZHphVCW2_wE";

const HEADERS = [
  "Candidate Key",
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
  "Stage",
  "Shift",
  "Total Questions",
  "Total Attempted",
  "Right Answers",
  "Wrong Answers",
  "Unattempted",
  "Marks Per Correct",
  "Negative Marking",
  "Raw Marks",
  "Answer Key Link",
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
  data.candidateKey = data.candidateKey || makeCandidateKey(data.examId, data.rollNumber, data.dob);
  validateSubmitPayload(data);
  data.rawMarks = calculateRawMarks(data);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getSheetByExam(data.sheetName, spreadsheet);
  setupHeaders(sheet);

  if (findCandidateByKey(sheet, data.candidateKey)) {
    return sendJSON({
      success: false,
      duplicate: true,
      message: "Your data already exists. Use Check My Rank."
    });
  }

  appendCandidateData(sheet, data, "");
  SpreadsheetApp.flush();

  const targetRow = findCandidateByKey(sheet, data.candidateKey);
  if (!targetRow) {
    return sendJSON({
      success: false,
      message: "Data saved, but rank calculation failed",
      debug: buildNotFoundDebug(sheet, data.sheetName, data.candidateKey)
    });
  }

  return sendJSON({
    success: true,
    duplicate: false,
    message: "Data submitted successfully",
    data: calculateRanks(sheet, data.candidateKey)
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
  data.candidateKey = data.candidateKey || makeCandidateKey(data.examId, data.rollNumber, data.dob);
  validateCheckPayload(data);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getSheetByExam(data.sheetName, spreadsheet);
  setupHeaders(sheet);

  Logger.log("Check Rank Lookup: " + JSON.stringify({
    sheetName: data.sheetName,
    candidateKey: data.candidateKey,
    totalRows: sheet.getLastRow()
  }));

  const targetRow = findCandidateByKey(sheet, data.candidateKey);
  if (!targetRow) {
    if (findLegacyCandidate(sheet, data.examId, data.rollNumber, data.dob)) {
      return sendJSON({
        success: false,
        found: false,
        message: "Old records need to be resubmitted after rank system update.",
        debug: Object.assign(buildNotFoundDebug(sheet, data.sheetName, data.candidateKey), {
          oldRecordFound: true
        })
      });
    }

    return sendJSON({
      success: false,
      found: false,
      message: "No data found",
      debug: buildNotFoundDebug(sheet, data.sheetName, data.candidateKey)
    });
  }

  return sendJSON({
    success: true,
    found: true,
    message: "Rank found successfully.",
    data: calculateRanks(sheet, data.candidateKey)
  });
}

function getSheetByExam(sheetName, spreadsheet) {
  const safeName = String(sheetName || "").trim();
  if (!safeName) throw new Error("Sheet name is required.");
  const activeSpreadsheet = spreadsheet || SpreadsheetApp.openById(SPREADSHEET_ID);
  return activeSpreadsheet.getSheetByName(safeName) || activeSpreadsheet.insertSheet(safeName);
}

function setupHeaders(sheet) {
  const current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsCandidateKeySchema = String(current[0] || "").trim() !== "Candidate Key";

  if (current.join("") === "" || needsCandidateKeySchema) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function validateSubmitPayload(data) {
  ["candidateKey", "examId", "examName", "sheetName", "mode", "rollNumber", "dob", "gender", "category", "state"].forEach(function (key) {
    if (!String(data[key] || "").trim()) throw new Error(key + " is required.");
  });
  ["totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "marksPerCorrect", "negativeMarking"].forEach(function (key) {
    if (!isFinite(Number(data[key]))) throw new Error(key + " must be a number.");
  });
  if (Number(data.totalAttempted) > Number(data.totalQuestions)) throw new Error("Total attempted cannot exceed total questions.");
  if (Number(data.rightAnswers) + Number(data.wrongAnswers) > Number(data.totalAttempted)) throw new Error("Right and wrong answers cannot exceed total attempted.");
}

function validateCheckPayload(data) {
  ["candidateKey", "examId", "sheetName", "rollNumber", "dob"].forEach(function (key) {
    if (!String(data[key] || "").trim()) throw new Error(key + " is required.");
  });
}

function appendCandidateData(sheet, data, userAgent) {
  const unattempted = Number(data.unattempted) || Math.max(Number(data.totalQuestions) - Number(data.totalAttempted), 0);
  const row = [
    data.candidateKey,
    new Date(),
    data.examId,
    data.examName,
    data.mode,
    normalizeRoll(data.rollNumber),
    normalizeDob(data.dob),
    data.candidateName || "Private",
    data.gender,
    data.category,
    data.state,
    data.stage || "",
    data.shift || "",
    Number(data.totalQuestions),
    Number(data.totalAttempted),
    Number(data.rightAnswers),
    Number(data.wrongAnswers),
    unattempted,
    Number(data.marksPerCorrect),
    Number(data.negativeMarking),
    Number(data.rawMarks),
    data.answerKeyLink || "",
    userAgent || ""
  ];

  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, 1).setNumberFormat("@");
  sheet.getRange(nextRow, 6, 1, 2).setNumberFormat("@");
  sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([row]);
  return nextRow;
}

function findCandidateByKey(sheet, candidateKey) {
  const key = String(candidateKey || "").trim();
  if (!key) return null;
  return getRows(sheet).find(function (row) {
    return row.candidateKey === key;
  }) || null;
}

function findLegacyCandidate(sheet, examId, rollNumber, dob) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  const searchRoll = normalizeRoll(rollNumber);
  const searchDob = normalizeDob(dob);

  return values.find(function (row) {
    const currentLayoutMatch = String(row[2]) === String(examId) &&
      normalizeRoll(row[5]) === searchRoll &&
      normalizeDob(row[6]) === searchDob;
    const previousRepoLayoutMatch = String(row[1]) === String(examId) &&
      normalizeRoll(row[8]) === searchRoll &&
      normalizeDob(row[9]) === searchDob;
    const requestedLegacyLayoutMatch = String(row[1]) === String(examId) &&
      normalizeRoll(row[4]) === searchRoll &&
      normalizeDob(row[5]) === searchDob;

    return !String(row[0] || "").includes("|") &&
      (currentLayoutMatch || previousRepoLayoutMatch || requestedLegacyLayoutMatch);
  }) || null;
}

function calculateRanks(sheet, candidateKey) {
  const targetRow = findCandidateByKey(sheet, candidateKey);
  if (!targetRow) {
    return {
      found: false,
      marks: 0,
      overallRank: 0,
      categoryRank: 0,
      stateRank: 0,
      shiftRank: 0,
      totalSubmissions: 0
    };
  }

  const rows = getRows(sheet).filter(function (row) {
    return row.candidateKey && String(row.examId) === String(targetRow.examId);
  });
  const overallRank = calculateTieAwareRank(rows, targetRow);
  const categoryRank = calculateTieAwareRank(rows.filter(function (row) {
    return normalizeKey(row.category) === normalizeKey(targetRow.category);
  }), targetRow);
  const stateRank = calculateTieAwareRank(rows.filter(function (row) {
    return normalizeKey(row.state) === normalizeKey(targetRow.state);
  }), targetRow);
  const shiftRank = calculateTieAwareRank(rows.filter(function (row) {
    return normalizeKey(row.shift) === normalizeKey(targetRow.shift);
  }), targetRow);

  return {
    found: true,
    candidateName: "Private",
    rawMarks: Number(targetRow.rawMarks),
    expectedMarks: Number(targetRow.rawMarks),
    normalizedMarks: "",
    overallRank,
    categoryRank,
    stateRank,
    shiftRank,
    totalSubmissions: rows.length,
    accuracyIndicator: getAccuracyIndicator(rows.length),
    rankBasis: "raw",
    lastUpdated: new Date().toISOString()
  };
}

function calculateTieAwareRank(rows, targetRow) {
  const sorted = rows.slice().sort(compareByRankMarks);
  let previousMarks = null;
  let previousRank = 0;

  for (let index = 0; index < sorted.length; index += 1) {
    const marks = getRankMarks(sorted[index]);
    const rank = marks === previousMarks ? previousRank : index + 1;
    previousMarks = marks;
    previousRank = rank;
    if (sorted[index].candidateKey === targetRow.candidateKey) return rank;
  }

  return 0;
}

function getRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues().map(function (row, index) {
    return {
      rowNumber: index + 2,
      candidateKey: String(row[0] || "").trim(),
      timestamp: row[1],
      examId: row[2],
      examName: row[3],
      mode: row[4],
      rollNumber: normalizeRoll(row[5]),
      dob: normalizeDob(row[6]),
      candidateName: row[7],
      gender: row[8],
      category: row[9],
      state: row[10],
      stage: row[11],
      shift: row[12],
      totalQuestions: row[13],
      totalAttempted: row[14],
      rightAnswers: row[15],
      wrongAnswers: row[16],
      unattempted: row[17],
      marksPerCorrect: row[18],
      negativeMarking: row[19],
      rawMarks: Number(row[20]) || 0,
      answerKeyLink: row[21],
      userAgent: row[22]
    };
  });
}

function buildNotFoundDebug(sheet, sheetName, candidateKey) {
  return {
    searchedCandidateKey: String(candidateKey || "").trim(),
    sheetName,
    totalRows: sheet.getLastRow(),
    firstFiveKeys: getRows(sheet).slice(0, 5).map(function (row) {
      return row.candidateKey;
    })
  };
}

function calculateRawMarks(data) {
  return round2((Number(data.rightAnswers) || 0) * (Number(data.marksPerCorrect) || 0) - (Number(data.wrongAnswers) || 0) * (Number(data.negativeMarking) || 0));
}

function compareByRankMarks(a, b) {
  return getRankMarks(b) - getRankMarks(a);
}

function getRankMarks(row) {
  return Number(row.rawMarks) || 0;
}

function makeCandidateKey(examId, rollNumber, dob) {
  return [
    String(examId || "").trim().toLowerCase(),
    String(rollNumber || "").trim().toUpperCase(),
    normalizeDob(dob)
  ].join("|");
}

function normalizeDob(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(value).trim();
}

function normalizeRoll(value) {
  return String(value || "").trim().toUpperCase();
}

function normalizeKey(value) {
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
