const SPREADSHEET_ID = "1IIDP7Slon3zRDlOH0hxzOnAZd4fzYi5nZHphVCW2_wE";
const RANK_EXAMS_SHEET_NAME = "Rank Predictor Exams";
const USERS_SHEET_NAME = "Users";
const VISITOR_SESSIONS_SHEET_NAME = "Visitor Sessions";
const VISITOR_ACTIVE_WINDOW_MS = 3 * 60 * 1000;

const USER_HEADERS = [
  "User ID",
  "Name",
  "Mobile",
  "Email",
  "Date of Birth",
  "Gender",
  "Password",
  "Created At"
];

const VISITOR_SESSION_HEADERS = [
  "Visitor ID",
  "First Seen",
  "Last Seen",
  "Page",
  "Referrer",
  "User Agent"
];

const HEADERS = [
  "Timestamp",
  "User ID",
  "Exam ID",
  "Exam Name",
  "Mode",
  "Roll Number",
  "Mobile Number",
  "DOB",
  "Candidate Name",
  "Gender",
  "Category",
  "Horizontal Category",
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
  "Subject Passing Criteria",
  "Categories",
  "Horizontal Categories",
  "States",
  "Disabled"
];

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || "").trim();
  const type = String(params.type || "").trim();

  if (action === "sendContactRequest") {
    return sendJSON({
      success: false,
      message: "Use POST for contact requests."
    });
  }

  if (type === "exams") return sendJSON(getRankPredictorExamConfigResponse());

  return sendJSON({
    success: true,
    message: "GovJobUpdates Rank Predictor API working"
  });
}

/*
Contact form deployment:
1. Deploy as Web App.
2. Execute as: Me.
3. Who has access: Anyone.
4. Copy the /exec URL into the frontend contact API URL constant in JS/contact-widget.js.
*/
function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents;

    let data = null;
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch (err) {
        // If a normal HTML form posts to the web app, Apps Script may provide
        // fields in e.parameter instead of a JSON body. Keep this as fallback.
        data = e && e.parameter ? e.parameter : null;
      }
    } else {
      data = e && e.parameter ? e.parameter : null;
    }

    if (!data) return sendJSON({ success: false, message: "No data received" });

    if (!data.action) return sendJSON({ success: false, message: "Missing action" });
    if (data.action === "registerCandidate") return registerCandidate(data);
    if (data.action === "loginCandidate") return loginCandidate(data);
    if (data.action === "resetCandidatePassword") return resetCandidatePassword(data);
    if (data.action === "changeCandidatePassword") return changeCandidatePassword(data);
    if (data.action === "getCandidateDashboard") return getCandidateDashboard(data);
    if (data.action === "getCandidateAttempts") return getCandidateAttempts(data);
    if (data.action === "sendContactRequest") return sendContactRequest(data);
    if (data.action === "trackVisitor") return trackVisitor(data);
    if (data.action === "submitData") return submitData(data);
    if (data.action === "checkRank") return checkRank(data);
    if (data.action === "getFirebaseRankDashboard") return getFirebaseRankDashboard(data);

    return sendJSON({ success: false, message: "Invalid action" });
  } catch (error) {
    return sendJSON({
      success: false,
      message: "Server error: " + error.message
    });
  }
}

function registerCandidate(data) {
  const name = normalizeText(data.name);
  const mobile = normalizeMobile(data.mobile);
  const email = normalizeEmail(data.email);
  const dob = normalizeDob(data.dob);
  const gender = normalizeText(data.gender);
  const password = String(data.password || "");

  if (!name) return sendJSON({ success: false, message: "Name is required." });
  if (!mobile) return sendJSON({ success: false, message: "Mobile number is required." });
  if (!email) return sendJSON({ success: false, message: "Email address is required." });
  if (!dob) return sendJSON({ success: false, message: "Date of birth is required." });
  if (!gender) return sendJSON({ success: false, message: "Gender is required." });
  if (!isValidMobile(mobile)) return sendJSON({ success: false, message: "Mobile number must be 10 digits." });
  if (!isValidEmail(email)) return sendJSON({ success: false, message: "Email address is invalid." });
  if (!isValidPassword(password)) return sendJSON({ success: false, message: "Password must be alphanumeric with at least one letter and one number." });

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getUsersSheet(spreadsheet);
  const columnMap = ensureUsersSheetSchema(sheet);
  const users = getUserRows(sheet, columnMap);

  const duplicate = users.find(function (user) {
    return (mobile && user.mobile === mobile) || (email && user.email === email);
  });

  if (duplicate) {
    return sendJSON({
      success: false,
      message: "Account already exists. Please login."
    });
  }

  const user = {
    userId: generateUserId(users),
    name: name,
    mobile: mobile,
    email: email,
    dob: dob,
    gender: gender,
    password: hashPassword(password),
    createdAt: new Date()
  };

  appendUser(sheet, columnMap, user);

  return sendJSON({
    success: true,
    message: "Account created successfully.",
    user: sanitizeUser(user)
  });
}

function loginCandidate(data) {
  const identifier = normalizeLoginIdentifier(data.identifier || data.mobile || data.email);
  const password = String(data.password || "");
  if (!identifier || !password) return sendJSON({ success: false, message: "Mobile/email and password are required." });

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getUsersSheet(spreadsheet);
  const columnMap = ensureUsersSheetSchema(sheet);
  const users = getUserRows(sheet, columnMap);
  const passwordHash = hashPassword(password);
  const user = users.find(function (candidate) {
    const identifierMatches = candidate.mobile === identifier || candidate.email === identifier;
    const passwordMatches = candidate.password === passwordHash || candidate.password === password;
    return identifierMatches && passwordMatches;
  });

  if (!user) return sendJSON({ success: false, message: "Invalid login details." });

  return sendJSON({
    success: true,
    message: "Login successful.",
    user: sanitizeUser(user)
  });
}

function resetCandidatePassword(data) {
  const mobile = normalizeMobile(data.mobile);
  const email = normalizeEmail(data.email);
  const dob = normalizeDob(data.dob);
  const password = String(data.password || "");

  if (!mobile) return sendJSON({ success: false, message: "Mobile number is required." });
  if (!email) return sendJSON({ success: false, message: "Email address is required." });
  if (!dob) return sendJSON({ success: false, message: "Date of birth is required." });
  if (!isValidMobile(mobile)) return sendJSON({ success: false, message: "Mobile number must be 10 digits." });
  if (!isValidEmail(email)) return sendJSON({ success: false, message: "Email address is invalid." });
  if (!isValidPassword(password)) return sendJSON({ success: false, message: "New password must be alphanumeric with at least one letter and one number." });

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getUsersSheet(spreadsheet);
  const columnMap = ensureUsersSheetSchema(sheet);
  const users = getUserRows(sheet, columnMap);
  const user = users.find(function (candidate) {
    return candidate.mobile === mobile && candidate.email === email && candidate.dob === dob;
  });

  if (!user) {
    return sendJSON({
      success: false,
      message: "No account found with this mobile number, email, and date of birth."
    });
  }

  const passwordColumn = columnMap[normalizeHeader("Password")];
  if (passwordColumn === undefined) throw new Error("Password column missing.");
  setTextFormat(sheet, columnMap, user.rowNumber, "Password");
  sheet.getRange(user.rowNumber, passwordColumn + 1).setValue(hashPassword(password));
  SpreadsheetApp.flush();

  return sendJSON({
    success: true,
    message: "Password reset successfully."
  });
}

function changeCandidatePassword(data) {
  const userId = normalizeText(data.userId);
  const currentPassword = String(data.currentPassword || "");
  const newPassword = String(data.newPassword || "");

  if (!userId) return sendJSON({ success: false, message: "Candidate ID is required." });
  if (!currentPassword) return sendJSON({ success: false, message: "Current password is required." });
  if (!isValidPassword(newPassword)) return sendJSON({ success: false, message: "New password must be alphanumeric with at least one letter and one number." });

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getUsersSheet(spreadsheet);
  const columnMap = ensureUsersSheetSchema(sheet);
  const users = getUserRows(sheet, columnMap);
  const user = users.find(function (candidate) {
    return candidate.userId === userId;
  });

  if (!user) return sendJSON({ success: false, message: "Candidate account not found." });

  const currentHash = hashPassword(currentPassword);
  if (user.password !== currentHash && user.password !== currentPassword) {
    return sendJSON({ success: false, message: "Current password is incorrect." });
  }

  const passwordColumn = columnMap[normalizeHeader("Password")];
  if (passwordColumn === undefined) throw new Error("Password column missing.");
  setTextFormat(sheet, columnMap, user.rowNumber, "Password");
  sheet.getRange(user.rowNumber, passwordColumn + 1).setValue(hashPassword(newPassword));
  SpreadsheetApp.flush();

  return sendJSON({
    success: true,
    message: "Password updated successfully."
  });
}

function getCandidateDashboard(data) {
  const dashboard = buildCandidateDashboard(data);
  return sendJSON(Object.assign({
    success: true,
    message: "Dashboard loaded successfully."
  }, dashboard));
}

function getCandidateAttempts(data) {
  const dashboard = buildCandidateDashboard(data);
  return sendJSON({
    success: true,
    message: "Attempts loaded successfully.",
    user: dashboard.user,
    attempts: dashboard.attempts
  });
}

function submitData(data) {
  data.userId = normalizeText(data.userId);
  data.rollNumber = normalizeRoll(data.rollNumber);
  data.mobileNumber = normalizeMobile(data.mobileNumber);
  data.dob = normalizeDob(data.dob);
  data.examDate = normalizeDob(data.examDate);
  data.shift = normalizeShift(data.shift);
  data.gender = normalizeText(data.gender);
  data.category = normalizeText(data.category);
  data.horizontalCategory = normalizeText(data.horizontalCategory);
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

  const refreshedAnalytics = recalculateStoredAnalytics(sheet, refreshedMap, refreshedRows, examConfig);
  const rankData = getAnalyticsForRow(refreshedAnalytics, targetRow.rowNumber) || calculateAnalytics(refreshedRows, targetRow, examConfig);

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

function getUsersSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(USERS_SHEET_NAME) || spreadsheet.insertSheet(USERS_SHEET_NAME);
  ensureUsersSheetSchema(sheet);
  return sheet;
}

function getVisitorSessionsSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(VISITOR_SESSIONS_SHEET_NAME) || spreadsheet.insertSheet(VISITOR_SESSIONS_SHEET_NAME);
  ensureVisitorSessionsSheetSchema(sheet);
  return sheet;
}

function trackVisitor(data) {
  const visitorId = normalizeVisitorId(data.visitorId);
  if (!visitorId) return sendJSON({ success: false, message: "Visitor ID is required." });

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getVisitorSessionsSheet(spreadsheet);
    const columnMap = ensureVisitorSessionsSheetSchema(sheet);
    const now = new Date();
    const session = {
      visitorId: visitorId,
      page: truncateText(data.page, 240),
      referrer: truncateText(data.referrer, 240),
      userAgent: truncateText(data.userAgent, 360),
      now: now
    };

    upsertVisitorSession(sheet, columnMap, session);
    SpreadsheetApp.flush();

    return sendJSON({
      success: true,
      activeVisitors: countActiveVisitors(sheet, columnMap, now),
      activeWindowSeconds: Math.round(VISITOR_ACTIVE_WINDOW_MS / 1000),
      updatedAt: now.toISOString()
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      // The lock may not have been acquired if Apps Script timed out while waiting.
    }
  }
}

function ensureUsersSheetSchema(sheet) {
  if (sheet.getMaxColumns() < USER_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), USER_HEADERS.length - sheet.getMaxColumns());
  }

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 1 || lastColumn < 1) {
    sheet.getRange(1, 1, 1, USER_HEADERS.length).setValues([USER_HEADERS]);
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const hasAnyHeader = currentHeaders.some(function (header) {
    return String(header || "").trim();
  });
  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, USER_HEADERS.length).setValues([USER_HEADERS]);
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const currentMap = buildColumnMapFromHeaders(currentHeaders);
  const missingHeaders = USER_HEADERS.filter(function (header) {
    return currentMap[normalizeHeader(header)] === undefined;
  });

  if (missingHeaders.length) {
    const startColumn = sheet.getLastColumn() + 1;
    sheet.insertColumnsAfter(sheet.getLastColumn(), missingHeaders.length);
    sheet.getRange(1, startColumn, 1, missingHeaders.length).setValues([missingHeaders]);
  }

  sheet.setFrozenRows(1);
  return getColumnMap(sheet);
}

function ensureVisitorSessionsSheetSchema(sheet) {
  if (sheet.getMaxColumns() < VISITOR_SESSION_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), VISITOR_SESSION_HEADERS.length - sheet.getMaxColumns());
  }

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 1 || lastColumn < 1) {
    sheet.getRange(1, 1, 1, VISITOR_SESSION_HEADERS.length).setValues([VISITOR_SESSION_HEADERS]);
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const hasAnyHeader = currentHeaders.some(function (header) {
    return String(header || "").trim();
  });
  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, VISITOR_SESSION_HEADERS.length).setValues([VISITOR_SESSION_HEADERS]);
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const currentMap = buildColumnMapFromHeaders(currentHeaders);
  const missingHeaders = VISITOR_SESSION_HEADERS.filter(function (header) {
    return currentMap[normalizeHeader(header)] === undefined;
  });

  if (missingHeaders.length) {
    const startColumn = sheet.getLastColumn() + 1;
    sheet.insertColumnsAfter(sheet.getLastColumn(), missingHeaders.length);
    sheet.getRange(1, startColumn, 1, missingHeaders.length).setValues([missingHeaders]);
  }

  sheet.setFrozenRows(1);
  return getColumnMap(sheet);
}

function setupCandidateLoginSheets() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  ensureUsersSheetSchema(getUsersSheet(spreadsheet));
  ensureVisitorSessionsSheetSchema(getVisitorSessionsSheet(spreadsheet));
  getRankPredictorExamConfigs(spreadsheet).exams.forEach(function (exam) {
    if (!exam.sheetName || exam.disabled) return;
    ensureSheetSchema(getSheetByExam(exam.sheetName, spreadsheet));
  });
}

function recalculateAllRankPredictorAnalytics() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const summary = [];

  getRankPredictorExamConfigs(spreadsheet).exams.forEach(function (examConfig) {
    if (!examConfig.sheetName || examConfig.disabled) return;
    const sheet = spreadsheet.getSheetByName(examConfig.sheetName);
    if (!sheet) return;

    const columnMap = ensureSheetSchema(sheet);
    const rows = getRowsByHeaders(sheet, columnMap);
    const recalculated = recalculateStoredAnalytics(sheet, columnMap, rows, examConfig);
    summary.push({
      examName: examConfig.examName,
      sheetName: examConfig.sheetName,
      updatedRows: recalculated.length
    });
  });

  return summary;
}

function getUserRows(sheet, columnMap) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) return [];

  return sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues().map(function (row, index) {
    return {
      rowNumber: index + 2,
      userId: normalizeText(getHeaderValue(row, columnMap, "User ID")),
      name: normalizeText(getHeaderValue(row, columnMap, "Name")),
      mobile: normalizeMobile(getHeaderValue(row, columnMap, "Mobile")),
      email: normalizeEmail(getHeaderValue(row, columnMap, "Email")),
      dob: normalizeDob(getHeaderValue(row, columnMap, "Date of Birth")),
      gender: normalizeText(getHeaderValue(row, columnMap, "Gender")),
      password: normalizeText(getHeaderValue(row, columnMap, "Password")),
      createdAt: getHeaderValue(row, columnMap, "Created At")
    };
  }).filter(function (user) {
    return user.userId;
  });
}

function appendUser(sheet, columnMap, user) {
  const row = new Array(Math.max(sheet.getLastColumn(), USER_HEADERS.length)).fill("");
  setHeaderValue(row, columnMap, "User ID", user.userId);
  setHeaderValue(row, columnMap, "Name", user.name);
  setHeaderValue(row, columnMap, "Mobile", user.mobile);
  setHeaderValue(row, columnMap, "Email", user.email);
  setHeaderValue(row, columnMap, "Date of Birth", user.dob);
  setHeaderValue(row, columnMap, "Gender", user.gender);
  setHeaderValue(row, columnMap, "Password", user.password);
  setHeaderValue(row, columnMap, "Created At", user.createdAt);

  const nextRow = sheet.getLastRow() + 1;
  ["User ID", "Mobile", "Email", "Date of Birth", "Password"].forEach(function (header) {
    setTextFormat(sheet, columnMap, nextRow, header);
  });
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
}

function upsertVisitorSession(sheet, columnMap, session) {
  const lastRow = sheet.getLastRow();
  const lastColumn = Math.max(sheet.getLastColumn(), VISITOR_SESSION_HEADERS.length);
  const visitorColumn = columnMap[normalizeHeader("Visitor ID")];
  let targetRow = 0;

  if (lastRow >= 2 && visitorColumn !== undefined) {
    const ids = sheet.getRange(2, visitorColumn + 1, lastRow - 1, 1).getValues();
    for (let index = 0; index < ids.length; index += 1) {
      if (normalizeVisitorId(ids[index][0]) === session.visitorId) {
        targetRow = index + 2;
        break;
      }
    }
  }

  if (!targetRow) {
    targetRow = lastRow + 1;
    const row = new Array(lastColumn).fill("");
    setHeaderValue(row, columnMap, "Visitor ID", session.visitorId);
    setHeaderValue(row, columnMap, "First Seen", session.now);
    setHeaderValue(row, columnMap, "Last Seen", session.now);
    setHeaderValue(row, columnMap, "Page", session.page);
    setHeaderValue(row, columnMap, "Referrer", session.referrer);
    setHeaderValue(row, columnMap, "User Agent", session.userAgent);
    setTextFormat(sheet, columnMap, targetRow, "Visitor ID");
    sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
    return;
  }

  setVisitorCellValue(sheet, columnMap, targetRow, "Last Seen", session.now);
  setVisitorCellValue(sheet, columnMap, targetRow, "Page", session.page);
  setVisitorCellValue(sheet, columnMap, targetRow, "Referrer", session.referrer);
  setVisitorCellValue(sheet, columnMap, targetRow, "User Agent", session.userAgent);
}

function setVisitorCellValue(sheet, columnMap, rowNumber, header, value) {
  const index = columnMap[normalizeHeader(header)];
  if (index !== undefined) sheet.getRange(rowNumber, index + 1).setValue(value);
}

function countActiveVisitors(sheet, columnMap, now) {
  const lastSeenColumn = columnMap[normalizeHeader("Last Seen")];
  const lastRow = sheet.getLastRow();
  if (lastSeenColumn === undefined || lastRow < 2) return 0;

  const cutoff = now.getTime() - VISITOR_ACTIVE_WINDOW_MS;
  const values = sheet.getRange(2, lastSeenColumn + 1, lastRow - 1, 1).getValues();
  return values.filter(function (row) {
    const seenAt = getTimestampMs(row[0]);
    return seenAt >= cutoff;
  }).length;
}

function sanitizeUser(user) {
  return {
    userId: user.userId,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    dob: user.dob,
    gender: user.gender || "",
    createdAt: toIsoString(user.createdAt)
  };
}

function generateUserId(existingUsers) {
  const known = {};
  (existingUsers || []).forEach(function (user) {
    if (user.userId) known[user.userId] = true;
  });

  let userId = "";
  do {
    userId = "GJU-" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMddHHmmss") + "-" + Math.floor(Math.random() * 9000 + 1000);
  } while (known[userId]);
  return userId;
}

function hashPassword(password) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(password || ""), Utilities.Charset.UTF_8);
  return digest.map(function (byte) {
    const value = byte < 0 ? byte + 256 : byte;
    return ("0" + value.toString(16)).slice(-2);
  }).join("");
}

function buildCandidateDashboard(data) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const usersSheet = getUsersSheet(spreadsheet);
  const userMap = ensureUsersSheetSchema(usersSheet);
  const users = getUserRows(usersSheet, userMap);
  const user = findDashboardUser(users, data);

  if (!user) throw new Error("Candidate account not found.");

  const attempts = getCandidateRankAttemptRows(spreadsheet, user);
  const subjectAnalytics = buildDashboardSubjectAnalytics(attempts);
  return {
    user: sanitizeUser(user),
    summary: buildDashboardSummary(attempts, subjectAnalytics),
    attempts: attempts,
    rankAttempts: attempts,
    subjectAnalytics: subjectAnalytics
  };
}

function findDashboardUser(users, data) {
  const userId = normalizeText(data.userId);
  const mobile = normalizeMobile(data.mobile);
  const email = normalizeEmail(data.email);
  return users.find(function (user) {
    return (userId && user.userId === userId) ||
      (mobile && user.mobile === mobile) ||
      (email && user.email === email);
  }) || null;
}

function getCandidateAttemptRows(spreadsheet, user) {
  return getCandidateRankAttemptRows(spreadsheet, user).sort(sortDashboardAttempts);
}

function getCandidateRankAttemptRows(spreadsheet, user) {
  const examConfigs = getRankPredictorExamConfigs(spreadsheet).exams.filter(function (exam) {
    return exam.sheetName && !exam.disabled;
  });
  const attempts = [];
  const seen = {};

  examConfigs.forEach(function (examConfig) {
    const sheet = spreadsheet.getSheetByName(examConfig.sheetName);
    if (!sheet) return;
    const columnMap = ensureSheetSchema(sheet);
    const rows = getRowsByHeaders(sheet, columnMap);
    rows.forEach(function (row) {
      const matchesUser = row.userId && row.userId === user.userId;
      const matchesLegacyMobile = !row.userId && user.mobile && row.mobileNumber === user.mobile;
      if (!matchesUser && !matchesLegacyMobile) return;

      const key = examConfig.sheetName + ":" + row.rowNumber;
      if (seen[key]) return;
      seen[key] = true;
      const analytics = calculateAnalytics(rows, row, examConfig);
      attempts.push(buildDashboardAttempt(row, analytics, examConfig));
    });
  });

  return attempts.sort(sortDashboardAttempts);
}

function sortDashboardAttempts(first, second) {
  return getSortableDate(second.completedAt || second.timestamp || second.examDate) - getSortableDate(first.completedAt || first.timestamp || first.examDate);
}

function buildDashboardAttempt(row, analytics, examConfig) {
  const attempted = Number(row.totalAttempted) || 0;
  const right = Number(row.rightAnswers) || 0;
  return {
    source: "rank",
    attemptType: "Rank Predictor",
    timestamp: toIsoString(row.timestamp),
    completedAt: toIsoString(row.timestamp),
    userId: row.userId,
    examId: row.examId || examConfig.examId,
    examName: row.examName || examConfig.examName,
    mode: row.mode,
    examDate: row.examDate,
    shift: row.shift,
    category: row.category,
    horizontalCategory: row.horizontalCategory,
    state: row.state,
    totalQuestions: row.totalQuestions,
    totalAttempted: row.totalAttempted,
    rightAnswers: row.rightAnswers,
    wrongAnswers: row.wrongAnswers,
    unattempted: row.unattempted,
    rawMarks: round2(row.rawMarks),
    marks: round2(row.rawMarks),
    normalizedMarks: round2(analytics.normalizedMarks),
    percentile: round2(analytics.percentile),
    overallRank: analytics.overallRank,
    categoryRank: analytics.categoryRank,
    stateRank: analytics.stateRank,
    shiftRank: analytics.shiftRank,
    accuracy: attempted ? round2((right / attempted) * 100) : 0,
    subjectData: row.subjectData || [],
    subjectAnalysis: analytics.subjectAnalysis || [],
    totalSubmissions: analytics.totalSubmissions,
    rankBasis: analytics.rankBasis
  };
}

function buildDashboardSummary(attempts, subjectAnalytics) {
  const total = attempts.length;
  const percentileValues = attempts.map(function (attempt) {
    return Number(attempt.percentile);
  }).filter(function (value) {
    return Number.isFinite(value);
  });
  const rankedAttempts = attempts.filter(function (attempt) {
    return Number(attempt.overallRank) > 0;
  }).sort(function (first, second) {
    return Number(first.overallRank) - Number(second.overallRank);
  });
  const bestSubject = subjectAnalytics.length ? subjectAnalytics[0] : null;
  const weakSubject = subjectAnalytics.length ? subjectAnalytics[subjectAnalytics.length - 1] : null;

  return {
    totalExamsAttempted: total,
    totalRankPredictorAttempts: attempts.length,
    averagePercentile: percentileValues.length ? round2(percentileValues.reduce(function (sum, value) {
      return sum + value;
    }, 0) / percentileValues.length) : 0,
    bestRank: rankedAttempts.length ? rankedAttempts[0].overallRank : "",
    bestRankExam: rankedAttempts.length ? rankedAttempts[0].examName : "",
    bestSubject: bestSubject ? bestSubject.name : "",
    bestSubjectAccuracy: bestSubject ? bestSubject.accuracy : "",
    weakSubject: weakSubject ? weakSubject.name : "",
    weakSubjectAccuracy: weakSubject ? weakSubject.accuracy : "",
    recentExams: attempts.slice(0, 5).map(function (attempt) {
      return {
        examName: attempt.examName,
        examDate: attempt.examDate,
        percentile: attempt.percentile,
        overallRank: attempt.overallRank,
        rawMarks: attempt.rawMarks
      };
    })
  };
}

function buildDashboardSubjectAnalytics(attempts) {
  const buckets = {};
  attempts.forEach(function (attempt) {
    const subjectSource = Array.isArray(attempt.subjectData) && attempt.subjectData.length
      ? attempt.subjectData
      : attempt.subjectAnalysis || [];
    subjectSource.forEach(function (subject) {
      const name = normalizeText(subject.name);
      if (!name) return;
      if (!buckets[name]) {
        buckets[name] = {
          name: name,
          scores: [],
          totalCorrect: 0,
          totalAttempted: 0,
          accuracyTotal: 0,
          accuracyCount: 0
        };
      }
      const score = Number(subject.marks || subject.score || 0);
      const attempted = Number(subject.attempted) || 0;
      const correct = Number(subject.correct) || 0;
      const accuracy = Number(subject.accuracy);
      buckets[name].scores.push(score);
      buckets[name].totalAttempted += attempted;
      buckets[name].totalCorrect += correct;
      if (Number.isFinite(accuracy)) {
        buckets[name].accuracyTotal += accuracy;
        buckets[name].accuracyCount += 1;
      }
    });
  });

  return Object.keys(buckets).map(function (name) {
    const bucket = buckets[name];
    const scores = bucket.scores.length ? bucket.scores : [0];
    const averageScore = scores.reduce(function (sum, value) {
      return sum + value;
    }, 0) / scores.length;
    const accuracy = bucket.totalAttempted
      ? (bucket.totalCorrect / bucket.totalAttempted) * 100
      : bucket.accuracyCount ? bucket.accuracyTotal / bucket.accuracyCount : 0;
    return {
      name: name,
      averageScore: round2(averageScore),
      bestScore: round2(Math.max.apply(null, scores)),
      weakestScore: round2(Math.min.apply(null, scores)),
      accuracy: round2(accuracy),
      attempts: scores.length
    };
  }).sort(function (first, second) {
    return Number(second.accuracy) - Number(first.accuracy);
  });
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
  const lastColumn = sheet.getLastColumn();
  const currentHeaders = lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0] : [];
  const hasAnyHeader = currentHeaders.some(function (header) {
    return String(header || "").trim();
  });

  if (!hasAnyHeader) {
    if (sheet.getMaxColumns() < RANK_EXAM_HEADERS.length) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), RANK_EXAM_HEADERS.length - sheet.getMaxColumns());
    }
    sheet.getRange(1, 1, 1, RANK_EXAM_HEADERS.length).setValues([RANK_EXAM_HEADERS]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, RANK_EXAM_HEADERS.length);
    return;
  }

  const rankHeadersInOrder = RANK_EXAM_HEADERS.every(function (header, index) {
    return normalizeHeader(currentHeaders[index]) === normalizeHeader(header);
  });

  if (rankHeadersInOrder) {
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    return;
  }

  const currentMap = buildColumnMapFromHeaders(currentHeaders);
  const knownHeaderKeys = {};
  RANK_EXAM_HEADERS.forEach(function (header) {
    knownHeaderKeys[normalizeHeader(header)] = true;
  });

  const extraHeaders = [];
  const extraHeaderKeys = {};
  currentHeaders.forEach(function (header) {
    const text = normalizeText(header);
    const key = normalizeHeader(text);
    if (!key || knownHeaderKeys[key] || extraHeaderKeys[key]) return;
    extraHeaders.push(text);
    extraHeaderKeys[key] = true;
  });

  const nextHeaders = RANK_EXAM_HEADERS.concat(extraHeaders);
  const oldRows = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, lastColumn).getValues() : [];
  const migratedRows = oldRows.map(function (row) {
    return nextHeaders.map(function (header) {
      return getHeaderValue(row, currentMap, header);
    });
  });

  if (sheet.getMaxColumns() < nextHeaders.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), nextHeaders.length - sheet.getMaxColumns());
  }

  sheet.clearContents();
  sheet.getRange(1, 1, 1, nextHeaders.length).setValues([nextHeaders]);
  if (migratedRows.length) {
    sheet.getRange(2, 1, migratedRows.length, nextHeaders.length).setValues(migratedRows);
  }

  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, nextHeaders.length);
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
  exam.subjectPassingCriteria = parseSubjectPassingCriteria(getHeaderValue(row, headerMap, "Subject Passing Criteria"));
  exam.subjects = applySubjectPassingCriteriaToSubjects(exam.subjects, exam.subjectPassingCriteria);
  exam.categories = parseRankExamList(getHeaderValue(row, headerMap, "Categories"));
  exam.horizontalCategories = parseRankExamList(getHeaderValue(row, headerMap, "Horizontal Categories"));
  exam.states = parseRankExamList(getHeaderValue(row, headerMap, "States"));
  exam.disabled = toRankExamBoolean(getHeaderValue(row, headerMap, "Disabled"));

  if (hasEnteredRankExamValue(exam.totalQuestions)) exam.__hasRowData = true;
  if (hasEnteredRankExamValue(exam.marksPerCorrect)) exam.__hasRowData = true;
  if (hasEnteredRankExamValue(exam.negativeMarking)) exam.__hasRowData = true;
  if (exam.supportedModes.length || exam.subjects.length || exam.subjectPassingCriteria.length || exam.categories.length || exam.horizontalCategories.length || exam.states.length) exam.__hasRowData = true;

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
        const criteria = normalizeSubjectPassingCriteria(subject.passingCriteria || subject.criteria || subject);
        return {
          name: normalizeText(subject.name),
          questions: toRankExamNumber(subject.questions),
          passingCriteria: criteria && hasSubjectPassingCriteria(criteria) ? criteria : null
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

function parseSubjectPassingCriteria(value) {
  const text = String(value || "").trim();
  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map(normalizeSubjectPassingCriteria).filter(hasSubjectPassingCriteria);
    }
    if (parsed && typeof parsed === "object") {
      return Object.keys(parsed).map(function (name) {
        const criteria = parsed[name];
        if (criteria && typeof criteria === "object") {
          return normalizeSubjectPassingCriteria(Object.assign({ name: name }, criteria));
        }
        return normalizeSubjectPassingCriteria({ name: name, minMarks: criteria });
      }).filter(hasSubjectPassingCriteria);
    }
  } catch (error) {
    // Plain text criteria are supported below.
  }

  return text.split(/[,|;]/).map(function (part) {
    const piece = normalizeText(part);
    const match = piece.match(/^(.+?)(?:\s*[:=-]\s*)(\d+(?:\.\d+)?)(?:\s*(%|marks?|correct))?$/i);
    if (!match) return null;
    const valueText = normalizeText(match[2]);
    const unit = normalizeKey(match[3]);
    const criteria = { name: normalizeText(match[1]) };
    if (unit === "%") {
      criteria.minPercentage = toRankExamNumber(valueText);
    } else if (unit === "correct") {
      criteria.minCorrect = toRankExamNumber(valueText);
    } else {
      criteria.minMarks = toRankExamNumber(valueText);
    }
    return normalizeSubjectPassingCriteria(criteria);
  }).filter(hasSubjectPassingCriteria);
}

function normalizeSubjectPassingCriteria(criteria) {
  if (!criteria || typeof criteria !== "object") return null;
  const categoryRules = normalizePassingCriteriaRuleMap(criteria.categoryRules || criteria.categoryCriteria || criteria.categories);
  const horizontalCategoryRules = normalizePassingCriteriaRuleMap(criteria.horizontalCategoryRules || criteria.horizontalCriteria || criteria.horizontalCategories);
  const implicitRules = !hasPassingCriteriaThreshold(criteria) && !hasRuleMap(categoryRules) && !hasRuleMap(horizontalCategoryRules)
    ? normalizePassingCriteriaRuleMap(criteria)
    : {};
  const normalized = {
    name: normalizeText(criteria.name || criteria.subject || criteria.subjectName),
    minMarks: firstRankExamNumber(criteria.minMarks, criteria.minimumMarks, criteria.marks, criteria.min),
    minPercentage: firstRankExamNumber(criteria.minPercentage, criteria.minimumPercentage, criteria.percentage, criteria.percent),
    minCorrect: firstRankExamNumber(criteria.minCorrect, criteria.minimumCorrect, criteria.correct),
    categoryRules: hasRuleMap(categoryRules) ? categoryRules : implicitRules,
    horizontalCategoryRules: horizontalCategoryRules
  };
  return normalized;
}

function normalizePassingCriteriaRuleMap(value) {
  const rules = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return rules;

  Object.keys(value).forEach(function (key) {
    const normalizedKey = normalizeText(key);
    const normalizedRuleKey = normalizeKey(key);
    if (!normalizedKey || ["name", "subject", "subjectname", "minmarks", "minimummarks", "marks", "min", "minpercentage", "minimumpercentage", "percentage", "percent", "mincorrect", "minimumcorrect", "correct"].includes(normalizedRuleKey)) return;

    const source = value[key];
    const rule = source && typeof source === "object"
      ? normalizePassingCriteriaThreshold(source)
      : normalizePassingCriteriaThreshold({ minMarks: source });
    if (hasPassingCriteriaThreshold(rule)) rules[normalizedKey] = rule;
  });

  return rules;
}

function normalizePassingCriteriaThreshold(criteria) {
  if (!criteria || typeof criteria !== "object") return null;
  return {
    minMarks: firstRankExamNumber(criteria.minMarks, criteria.minimumMarks, criteria.marks, criteria.min),
    minPercentage: firstRankExamNumber(criteria.minPercentage, criteria.minimumPercentage, criteria.percentage, criteria.percent),
    minCorrect: firstRankExamNumber(criteria.minCorrect, criteria.minimumCorrect, criteria.correct)
  };
}

function hasPassingCriteriaThreshold(criteria) {
  return Boolean(criteria && (
    hasEnteredRankExamValue(criteria.minMarks) ||
    hasEnteredRankExamValue(criteria.minPercentage) ||
    hasEnteredRankExamValue(criteria.minCorrect)
  ));
}

function hasRuleMap(rules) {
  return Boolean(rules && Object.keys(rules).some(function (key) {
    return hasPassingCriteriaThreshold(rules[key]);
  }));
}

function firstRankExamNumber() {
  for (let index = 0; index < arguments.length; index += 1) {
    const value = toRankExamNumber(arguments[index]);
    if (hasEnteredRankExamValue(value)) return value;
  }
  return "";
}

function hasSubjectPassingCriteria(criteria) {
  return Boolean(criteria && criteria.name && (
    hasPassingCriteriaThreshold(criteria) ||
    hasRuleMap(criteria.categoryRules) ||
    hasRuleMap(criteria.horizontalCategoryRules)
  ));
}

function applySubjectPassingCriteriaToSubjects(subjects, criteriaList) {
  if (!Array.isArray(subjects) || !subjects.length) return [];
  const criteriaByName = {};
  (criteriaList || []).forEach(function (criteria) {
    criteriaByName[normalizeKey(criteria.name)] = criteria;
  });
  return subjects.map(function (subject) {
    const ownCriteria = subject.passingCriteria && hasSubjectPassingCriteria(subject.passingCriteria)
      ? subject.passingCriteria
      : criteriaByName[normalizeKey(subject.name)] || null;
    const nextSubject = {
      name: subject.name,
      questions: subject.questions
    };
    if (ownCriteria) nextSubject.passingCriteria = ownCriteria;
    return nextSubject;
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
  const text = String(value === undefined || value === null ? "" : value).replace(/%$/, "").trim();
  if (!text) return "";
  const number = Number(text);
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
  setHeaderValue(row, columnMap, "User ID", data.userId || "");
  setHeaderValue(row, columnMap, "Exam ID", data.examId);
  setHeaderValue(row, columnMap, "Exam Name", data.examName);
  setHeaderValue(row, columnMap, "Mode", data.mode);
  setHeaderValue(row, columnMap, "Roll Number", data.rollNumber);
  setHeaderValue(row, columnMap, "Mobile Number", data.mobileNumber);
  setHeaderValue(row, columnMap, "DOB", data.dob);
  setHeaderValue(row, columnMap, "Candidate Name", data.candidateName || "Private");
  setHeaderValue(row, columnMap, "Gender", data.gender || "");
  setHeaderValue(row, columnMap, "Category", data.category || "");
  setHeaderValue(row, columnMap, "Horizontal Category", data.horizontalCategory || "");
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
      userId: normalizeText(getHeaderValue(row, columnMap, "User ID")),
      examId: normalizeText(getHeaderValue(row, columnMap, "Exam ID")),
      examName: normalizeText(getHeaderValue(row, columnMap, "Exam Name")),
      mode: normalizeText(getHeaderValue(row, columnMap, "Mode")),
      rollNumber: normalizeRoll(getHeaderValue(row, columnMap, "Roll Number")),
      mobileNumber: normalizeMobile(getHeaderValue(row, columnMap, "Mobile Number")),
      dob: normalizeDob(getHeaderValue(row, columnMap, "DOB")),
      candidateName: getHeaderValue(row, columnMap, "Candidate Name"),
      gender: normalizeText(getHeaderValue(row, columnMap, "Gender")),
      category: normalizeText(getHeaderValue(row, columnMap, "Category")),
      horizontalCategory: normalizeText(getHeaderValue(row, columnMap, "Horizontal Category")),
      state: normalizeText(getHeaderValue(row, columnMap, "State")),
      examDate: normalizeDob(getHeaderValue(row, columnMap, "Exam Date")),
      shift: normalizeShift(getHeaderValue(row, columnMap, "Shift")),
      totalQuestions: Number(getHeaderValue(row, columnMap, "Total Questions")) || 0,
      totalAttempted: Number(getHeaderValue(row, columnMap, "Total Attempted")) || 0,
      rightAnswers: Number(getHeaderValue(row, columnMap, "Right Answers")) || 0,
      wrongAnswers: Number(getHeaderValue(row, columnMap, "Wrong Answers")) || 0,
      unattempted: Number(getHeaderValue(row, columnMap, "Unattempted")) || 0,
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
  const hasShifts = Boolean(examConfig && examConfig.hasShifts);
  const scoredRows = applyNormalizedMarks(rowsForExam, examConfig, normalizationEnabled);
  const hasQualificationRules = examHasSubjectPassingCriteria(examConfig);
  const scoredRowsWithQualification = scoredRows.map(function (row) {
    const subjectAnalysis = buildSubjectAnalysis(rowsForExam, row, examConfig);
    const qualification = buildQualificationSummary(subjectAnalysis);
    return Object.assign({}, row, {
      __subjectAnalysis: subjectAnalysis,
      __qualification: qualification
    });
  });
  const fallbackSubjectAnalysis = buildSubjectAnalysis(rowsForExam, targetRow, examConfig);
  const fallbackQualification = buildQualificationSummary(fallbackSubjectAnalysis);
  const scoredTargetRow = scoredRowsWithQualification.find(function (row) {
    return row.rowNumber === targetRow.rowNumber;
  }) || Object.assign({}, targetRow, {
    normalizedMarks: normalizationEnabled ? Number(targetRow.rawMarks) || 0 : Number(targetRow.rawMarks) || 0,
    __subjectAnalysis: fallbackSubjectAnalysis,
    __qualification: fallbackQualification
  });
  const targetQualification = scoredTargetRow.__qualification || fallbackQualification;
  const rankingRows = hasQualificationRules
    ? scoredRowsWithQualification.filter(function (row) {
      return row.__qualification && row.__qualification.qualified;
    })
    : scoredRowsWithQualification;
  const targetCanRank = !hasQualificationRules || Boolean(targetQualification.qualified);
  const rowsForRanking = targetCanRank ? rankingRows : [];
  const rankScoreField = normalizationEnabled ? "normalizedMarks" : "rawMarks";
  const rawRanks = targetCanRank ? buildRankSet(rowsForRanking, scoredTargetRow, "rawMarks", hasShifts) : buildEmptyRankSet(hasShifts);
  const normalizedRanks = targetCanRank ? buildRankSet(rowsForRanking, scoredTargetRow, "normalizedMarks", hasShifts) : buildEmptyRankSet(hasShifts);
  const activeRanks = normalizationEnabled ? normalizedRanks : rawRanks;
  const totalSubmissions = rowsForExam.length;
  const percentile = targetCanRank ? calculatePercentile(rowsForRanking, scoredTargetRow, rankScoreField) : "";
  const sameShiftRows = hasShifts ? rankingRows.filter(function (row) {
    return normalizeKey(row.shift) === normalizeKey(scoredTargetRow.shift);
  }) : [];
  const sameCategoryRows = rankingRows.filter(function (row) {
    return normalizeKey(row.category) === normalizeKey(scoredTargetRow.category);
  });

  return {
    found: true,
    rawMarks: Number(scoredTargetRow.rawMarks),
    marks: Number(scoredTargetRow.rawMarks),
    normalizedMarks: Number(scoredTargetRow.normalizedMarks),
    normalisedMarks: Number(scoredTargetRow.normalizedMarks),
    percentile: percentile,
    overallRank: activeRanks.overallRank,
    categoryRank: activeRanks.categoryRank,
    stateRank: activeRanks.stateRank,
    shiftRank: activeRanks.shiftRank,
    genderRank: activeRanks.genderRank,
    genderCategoryRank: activeRanks.genderCategoryRank,
    genderStateRank: activeRanks.genderStateRank,
    genderShiftRank: activeRanks.genderShiftRank,
    rawRanks: rawRanks,
    normalizedRanks: normalizedRanks,
    normalisedRanks: normalizedRanks,
    averageMarks: averageMarks(rankingRows, "rawMarks"),
    averageShiftMarks: hasShifts ? averageMarks(sameShiftRows, "rawMarks") : "",
    categoryAverageMarks: averageMarks(sameCategoryRows, "rawMarks"),
    subjectAnalysis: scoredTargetRow.__subjectAnalysis || [],
    isQualified: targetQualification.qualified,
    qualificationStatus: targetQualification.status,
    qualificationMessage: targetQualification.message,
    failedSubjects: targetQualification.failedSubjects,
    qualifiedSubmissions: rankingRows.length,
    totalSubmissions: totalSubmissions,
    accuracyIndicator: getAccuracyIndicator(totalSubmissions),
    rankBasis: normalizationEnabled ? "normalized" : "raw",
    hasShifts: hasShifts,
    lastUpdated: new Date().toISOString()
  };
}

function buildRankSet(scoredRows, scoredTargetRow, scoreField, hasShifts) {
  const field = scoreField || "rawMarks";
  const targetRankMarks = Number(scoredTargetRow[field]) || 0;
  const sameShiftRows = scoredRows.filter(function (row) {
    return normalizeKey(row.shift) === normalizeKey(scoredTargetRow.shift);
  });
  const sameCategoryRows = scoredRows.filter(function (row) {
    return normalizeKey(row.category) === normalizeKey(scoredTargetRow.category);
  });
  const sameStateRows = scoredRows.filter(function (row) {
    return normalizeKey(row.state) === normalizeKey(scoredTargetRow.state);
  });
  const sameGenderRows = scoredRows.filter(function (row) {
    return normalizeKey(row.gender) === normalizeKey(scoredTargetRow.gender);
  });

  return {
    overallRank: calculateTieAwareRank(scoredRows, scoredTargetRow, field),
    categoryRank: calculateTieAwareRank(sameCategoryRows, scoredTargetRow, field),
    stateRank: calculateTieAwareRank(sameStateRows, scoredTargetRow, field),
    shiftRank: hasShifts ? calculateTieAwareRank(sameShiftRows, scoredTargetRow, field) : "",
    genderRank: countAtLeast(sameGenderRows, targetRankMarks, field),
    genderCategoryRank: countAtLeast(sameGenderRows.filter(function (row) {
      return normalizeKey(row.category) === normalizeKey(scoredTargetRow.category);
    }), targetRankMarks, field),
    genderStateRank: countAtLeast(sameGenderRows.filter(function (row) {
      return normalizeKey(row.state) === normalizeKey(scoredTargetRow.state);
    }), targetRankMarks, field),
    genderShiftRank: hasShifts ? countAtLeast(sameGenderRows.filter(function (row) {
      return normalizeKey(row.shift) === normalizeKey(scoredTargetRow.shift);
    }), targetRankMarks, field) : ""
  };
}

function buildEmptyRankSet(hasShifts) {
  return {
    overallRank: "",
    categoryRank: "",
    stateRank: "",
    shiftRank: hasShifts ? "" : "",
    genderRank: "",
    genderCategoryRank: "",
    genderStateRank: "",
    genderShiftRank: hasShifts ? "" : ""
  };
}

function examHasSubjectPassingCriteria(examConfig) {
  if (!examConfig) return false;
  if (Array.isArray(examConfig.subjectPassingCriteria) && examConfig.subjectPassingCriteria.some(hasSubjectPassingCriteria)) return true;
  return Array.isArray(examConfig.subjects) && examConfig.subjects.some(function (subject) {
    return hasSubjectPassingCriteria(subject && subject.passingCriteria);
  });
}

function buildQualificationSummary(subjectAnalysis) {
  const evaluatedSubjects = (subjectAnalysis || []).filter(function (subject) {
    return subject.passingStatus === "Pass" || subject.passingStatus === "Fail";
  });
  const failedSubjects = evaluatedSubjects.filter(function (subject) {
    return subject.passingStatus === "Fail";
  }).map(function (subject) {
    return {
      name: subject.name,
      score: subject.score,
      obtainedPercentage: subject.obtainedPercentage,
      passingCriteria: subject.passingCriteria,
      passingMessage: subject.passingMessage
    };
  });

  if (!evaluatedSubjects.length) {
    return {
      qualified: true,
      status: "No Criteria",
      message: "No subject qualifying criteria is configured for this exam.",
      failedSubjects: []
    };
  }

  if (failedSubjects.length) {
    return {
      qualified: false,
      status: "Not Qualified",
      message: "Not eligible for merit/rank consideration because qualifying criteria was not met in " + failedSubjects.map(function (subject) {
        return subject.name;
      }).join(", ") + ". Marks and subject analysis are still shown for reference.",
      failedSubjects: failedSubjects
    };
  }

  return {
    qualified: true,
    status: "Qualified",
    message: "Subject qualifying criteria met. Rank is calculated among qualified submissions.",
    failedSubjects: []
  };
}

function applyNormalizedMarks(rowsForExam, examConfig, normalizationEnabled) {
  const shiftDistributions = normalizationEnabled
    ? buildShiftPercentileDistributions(rowsForExam)
    : [];

  return rowsForExam.map(function (row) {
    const rawMarks = Number(row.rawMarks) || 0;
    const normalizedMarks = normalizationEnabled
      ? calculateExamNormalizedMarks(row, examConfig, shiftDistributions)
      : rawMarks;
    const nextRow = Object.assign({}, row);
    nextRow.normalizedMarks = round2(normalizedMarks);
    return nextRow;
  });
}

function buildShiftPercentileDistributions(rows) {
  const grouped = {};
  rows.forEach(function (row) {
    const key = normalizeKey(row.shift) || "__no_shift__";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  });

  return Object.keys(grouped).map(function (key) {
    return buildShiftPercentileDistribution(key, grouped[key]);
  }).filter(function (distribution) {
    return distribution.total > 0 && distribution.points.length;
  });
}

function buildShiftPercentileDistribution(key, rows) {
  const total = rows.length;
  const counts = {};
  rows.forEach(function (row) {
    const marks = Number(row.rawMarks) || 0;
    const markKey = String(marks);
    counts[markKey] = (counts[markKey] || 0) + 1;
  });

  const marksList = Object.keys(counts).map(function (mark) {
    return Number(mark);
  }).sort(function (a, b) {
    return a - b;
  });

  let cumulative = 0;
  const points = marksList.map(function (marks) {
    cumulative += counts[String(marks)] || 0;
    return {
      marks: marks,
      percentile: total ? cumulative / total : 0
    };
  });

  return {
    key: key,
    total: total,
    points: points
  };
}

function calculateExamNormalizedMarks(row, examConfig, shiftDistributions) {
  return calculatePercentileInterpolatedMarks(row, examConfig, shiftDistributions);
}

function calculatePercentileInterpolatedMarks(row, examConfig, shiftDistributions) {
  const rawMarks = Number(row.rawMarks) || 0;
  if (!Array.isArray(shiftDistributions) || shiftDistributions.length <= 1) {
    return clampMarks(rawMarks, examConfig);
  }

  const shiftKey = normalizeKey(row.shift) || "__no_shift__";
  const sourceDistribution = shiftDistributions.find(function (distribution) {
    return distribution.key === shiftKey;
  });
  if (!sourceDistribution) return clampMarks(rawMarks, examConfig);

  const percentile = getPercentileForMarks(sourceDistribution, rawMarks);
  // SSC June 2025 method: map the candidate's shift percentile onto every
  // shift's marks scale by interpolation, then average those corresponding marks.
  const correspondingMarks = shiftDistributions.map(function (distribution) {
    return interpolateMarksAtPercentile(distribution, percentile);
  }).filter(function (marks) {
    return Number.isFinite(Number(marks));
  });

  if (!correspondingMarks.length) return clampMarks(rawMarks, examConfig);
  const average = correspondingMarks.reduce(function (sum, marks) {
    return sum + Number(marks);
  }, 0) / correspondingMarks.length;
  return clampMarks(average, examConfig);
}

function getPercentileForMarks(distribution, marks) {
  const targetMarks = Number(marks) || 0;
  if (!distribution || !distribution.points || !distribution.points.length) return 0;

  let percentile = 0;
  distribution.points.forEach(function (point) {
    if (Number(point.marks) <= targetMarks) percentile = Number(point.percentile) || 0;
  });
  return percentile;
}

function interpolateMarksAtPercentile(distribution, percentile) {
  const points = distribution && distribution.points ? distribution.points : [];
  const targetPercentile = Number(percentile) || 0;
  if (!points.length) return 0;
  if (targetPercentile <= Number(points[0].percentile)) return Number(points[0].marks) || 0;
  if (targetPercentile >= Number(points[points.length - 1].percentile)) return Number(points[points.length - 1].marks) || 0;

  for (let index = 1; index < points.length; index += 1) {
    const lower = points[index - 1];
    const upper = points[index];
    const lowerPercentile = Number(lower.percentile) || 0;
    const upperPercentile = Number(upper.percentile) || 0;
    if (targetPercentile > upperPercentile) continue;
    if (upperPercentile === lowerPercentile) return Number(upper.marks) || 0;
    return Number(lower.marks) + ((Number(upper.marks) - Number(lower.marks)) / (upperPercentile - lowerPercentile)) * (targetPercentile - lowerPercentile);
  }

  return Number(points[points.length - 1].marks) || 0;
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

function buildSubjectAnalysis(rowsForExam, targetRow, examConfig) {
  if (!Array.isArray(targetRow.subjectData) || !targetRow.subjectData.length) return [];

  return targetRow.subjectData.map(function (subject) {
    const name = normalizeText(subject.name);
    const passingCriteria = getSubjectPassingCriteria(name, subject, examConfig, targetRow);
    const matchingSubjectRows = rowsForExam.map(function (row) {
      const match = (row.subjectData || []).find(function (item) {
        return normalizeKey(item.name) === normalizeKey(name);
      });
      return match ? {
        rowNumber: row.rowNumber,
        marks: Number(match.marks || match.score || 0)
      } : null;
    }).filter(function (value) {
      return value !== null;
    });
    const matchingScores = matchingSubjectRows.map(function (row) {
      return Number(row.marks) || 0;
    });

    const attempted = Number(subject.attempted) || 0;
    const correct = Number(subject.correct) || 0;
    const score = Number(subject.marks || subject.score || 0);
    const passingEvaluation = evaluateSubjectPassing(subject, passingCriteria);

    return {
      name: name,
      score: round2(score),
      subjectRank: calculateSubjectRank(matchingSubjectRows, targetRow.rowNumber, score),
      subjectTotalSubmissions: matchingSubjectRows.length,
      passingCriteria: passingCriteria || null,
      passingStatus: passingEvaluation.status,
      passingMessage: passingEvaluation.message,
      obtainedPercentage: passingEvaluation.obtainedPercentage,
      avgScore: matchingScores.length ? round2(matchingScores.reduce(function (total, value) {
        return total + value;
      }, 0) / matchingScores.length) : 0,
      accuracy: attempted ? round2((correct / attempted) * 100) : 0
    };
  });
}

function calculateSubjectRank(subjectRows, targetRowNumber, targetScore) {
  if (!Array.isArray(subjectRows) || !subjectRows.length) return "";
  const targetMarks = Number(targetScore) || 0;
  const targetRow = subjectRows.find(function (row) {
    return row.rowNumber === targetRowNumber;
  });
  if (!targetRow) return "";
  return subjectRows.filter(function (row) {
    return Number(row.marks) >= targetMarks;
  }).length || "";
}

function getSubjectPassingCriteria(name, subject, examConfig, candidateRow) {
  if (subject && subject.passingCriteria && hasSubjectPassingCriteria(subject.passingCriteria)) {
    return resolveSubjectPassingCriteria(subject.passingCriteria, candidateRow);
  }
  const subjectConfig = (examConfig && Array.isArray(examConfig.subjects) ? examConfig.subjects : []).find(function (item) {
    return normalizeKey(item.name) === normalizeKey(name);
  });
  if (subjectConfig && subjectConfig.passingCriteria && hasSubjectPassingCriteria(subjectConfig.passingCriteria)) {
    return resolveSubjectPassingCriteria(subjectConfig.passingCriteria, candidateRow);
  }
  const criteria = (examConfig && Array.isArray(examConfig.subjectPassingCriteria) ? examConfig.subjectPassingCriteria : []).find(function (item) {
    return normalizeKey(item.name) === normalizeKey(name);
  }) || null;
  return resolveSubjectPassingCriteria(criteria, candidateRow);
}

function resolveSubjectPassingCriteria(criteria, candidateRow) {
  if (!criteria || !hasSubjectPassingCriteria(criteria)) return null;
  const horizontalCategory = normalizeText(candidateRow && candidateRow.horizontalCategory);
  const category = normalizeText(candidateRow && candidateRow.category);
  const horizontalRule = getPassingRuleForKey(criteria.horizontalCategoryRules, horizontalCategory);
  const categoryRule = getPassingRuleForKey(criteria.categoryRules, category);
  const commonRule = hasPassingCriteriaThreshold(criteria)
    ? normalizePassingCriteriaThreshold(criteria)
    : null;
  let selectedRule = horizontalRule || categoryRule || commonRule;
  if (!hasPassingCriteriaThreshold(selectedRule)) return null;

  selectedRule = Object.assign({
    name: criteria.name,
    ruleBasis: horizontalRule ? "Horizontal Category" : categoryRule ? "Category" : "Common",
    ruleCategory: horizontalRule ? horizontalCategory : categoryRule ? category : ""
  }, selectedRule);
  return selectedRule;
}

function getPassingRuleForKey(rules, value) {
  const key = normalizeKey(value);
  if (!key || key === "none" || !rules) return null;
  const matchedKey = Object.keys(rules).find(function (ruleKey) {
    return normalizeKey(ruleKey) === key;
  });
  return matchedKey ? rules[matchedKey] : null;
}

function evaluateSubjectPassing(subject, criteria) {
  if (!criteria) {
    return {
      status: "",
      message: "",
      obtainedPercentage: ""
    };
  }

  const marks = Number(subject.marks || subject.score || 0);
  const correct = Number(subject.correct) || 0;
  const maxMarks = Number(subject.maxMarks) || 0;
  const percentage = maxMarks > 0 ? (marks / maxMarks) * 100 : Number(subject.accuracy) || 0;
  const failures = [];

  if (hasEnteredRankExamValue(criteria.minMarks) && marks < Number(criteria.minMarks)) {
    failures.push("required " + criteria.minMarks + " marks");
  }
  if (hasEnteredRankExamValue(criteria.minCorrect) && correct < Number(criteria.minCorrect)) {
    failures.push("required " + criteria.minCorrect + " correct answers");
  }
  if (hasEnteredRankExamValue(criteria.minPercentage) && percentage < Number(criteria.minPercentage)) {
    failures.push("required " + criteria.minPercentage + "%");
  }

  return {
    status: failures.length ? "Fail" : "Pass",
    message: failures.length ? "Failed: " + failures.join(", ") : "Qualified",
    obtainedPercentage: round2(percentage)
  };
}

function calculatePercentile(rows, targetRow, scoreField) {
  const total = Array.isArray(rows) ? rows.length : 0;
  if (total <= 0 || !targetRow) return 0;
  const field = scoreField || "rawMarks";
  const targetMarks = Number(targetRow[field]) || 0;
  const atOrBelow = rows.filter(function (row) {
    return Number(row[field] || 0) <= targetMarks;
  }).length;
  return round2((atOrBelow / total) * 100);
}

function writeAnalytics(sheet, columnMap, rowNumber, analytics) {
  const values = getStoredAnalyticsValues(analytics);

  Object.keys(values).forEach(function (header) {
    const index = columnMap[normalizeHeader(header)];
    if (index !== undefined) sheet.getRange(rowNumber, index + 1).setValue(values[header]);
  });
}

function getStoredAnalyticsValues(analytics) {
  return {
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
}

function recalculateStoredAnalytics(sheet, columnMap, rows, examConfig) {
  const recalculated = rows.filter(function (row) {
    return row.rollNumber && row.dob;
  }).map(function (row) {
    return {
      rowNumber: row.rowNumber,
      analytics: calculateAnalytics(rows, row, examConfig)
    };
  });

  writeAnalyticsBatch(sheet, columnMap, recalculated);
  return recalculated;
}

function getAnalyticsForRow(recalculated, rowNumber) {
  const match = recalculated.find(function (item) {
    return item.rowNumber === rowNumber;
  });
  return match ? match.analytics : null;
}

function writeAnalyticsBatch(sheet, columnMap, recalculated) {
  if (!recalculated.length) return;

  const firstRow = recalculated.reduce(function (lowest, item) {
    return Math.min(lowest, item.rowNumber);
  }, recalculated[0].rowNumber);
  const lastRow = recalculated.reduce(function (highest, item) {
    return Math.max(highest, item.rowNumber);
  }, recalculated[0].rowNumber);
  const rowCount = lastRow - firstRow + 1;
  const writableRows = recalculated.map(function (item) {
    return {
      rowNumber: item.rowNumber,
      values: getStoredAnalyticsValues(item.analytics)
    };
  });

  Object.keys(writableRows[0].values).forEach(function (header) {
    const index = columnMap[normalizeHeader(header)];
    if (index === undefined) return;

    const range = sheet.getRange(firstRow, index + 1, rowCount, 1);
    const values = range.getValues();
    writableRows.forEach(function (item) {
      values[item.rowNumber - firstRow][0] = item.values[header];
    });
    range.setValues(values);
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
    const maxMarks = isFinite(Number(subject.maxMarks)) ? Number(subject.maxMarks) : "";
    const passingCriteria = normalizeSubjectPassingCriteria(subject.passingCriteria);
    const marks = isFinite(Number(subject.marks))
      ? Number(subject.marks)
      : round2((correct * (Number(data.marksPerCorrect) || 0)) - (wrong * (Number(data.negativeMarking) || 0)));
    const accuracy = isFinite(Number(subject.accuracy))
      ? Number(subject.accuracy)
      : attempted ? (correct / attempted) * 100 : 0;
    return {
      name: normalizeText(subject.name),
      attempted: attempted,
      correct: correct,
      wrong: wrong,
      marks: round2(marks),
      maxMarks: maxMarks === "" ? "" : round2(maxMarks),
      passingCriteria: passingCriteria && hasSubjectPassingCriteria(passingCriteria) ? passingCriteria : null,
      accuracy: round2(accuracy)
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

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeVisitorId(value) {
  return String(value || "")
    .trim()
    .replace(/[^A-Za-z0-9:_-]/g, "")
    .slice(0, 80);
}

function truncateText(value, maxLength) {
  return normalizeText(value).slice(0, maxLength || 240);
}

function normalizeLoginIdentifier(value) {
  const text = String(value || "").trim();
  return text.indexOf("@") >= 0 ? normalizeEmail(text) : normalizeMobile(text);
}

function isValidMobile(value) {
  return /^\d{10}$/.test(normalizeMobile(value));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

function isValidPassword(value) {
  const password = String(value || "");
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(password);
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

function toIsoString(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return value.toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

function getSortableDate(value) {
  if (!value) return 0;
  if (Object.prototype.toString.call(value) === "[object Date]") return value.getTime();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function getTimestampMs(value) {
  return getSortableDate(value);
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


function getFirebaseRankDashboard(data) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const mobile = normalizeMobile(data.mobile || data.mobileNumber);
  const email = normalizeEmail(data.email);
  const firebaseUid = normalizeText(data.firebaseUid || data.userId);

  if (!mobile && !email && !firebaseUid) {
    return sendJSON({
      success: false,
      message: "Mobile/email is required to load dashboard history.",
      summary: buildDashboardSummary([], []),
      attempts: [],
      rankAttempts: []
    });
  }

  const user = {
    userId: firebaseUid,
    name: normalizeText(data.name),
    mobile: mobile,
    email: email,
    dob: "",
    gender: "",
    createdAt: ""
  };

  const attempts = getFirebaseRankAttemptRows(spreadsheet, user);
  const subjectAnalytics = buildDashboardSubjectAnalytics(attempts);

  return sendJSON({
    success: true,
    message: attempts.length ? "Rank dashboard loaded successfully." : "No rank predictor records found for this profile.",
    user: sanitizeUser(user),
    summary: buildDashboardSummary(attempts, subjectAnalytics),
    attempts: attempts,
    rankAttempts: attempts,
    subjectAnalytics: subjectAnalytics
  });
}

function getFirebaseRankAttemptRows(spreadsheet, user) {
  const examConfigs = getRankPredictorExamConfigs(spreadsheet).exams.filter(function (exam) {
    return exam.sheetName && !exam.disabled;
  });
  const attempts = [];
  const seen = {};

  examConfigs.forEach(function (examConfig) {
    const sheet = spreadsheet.getSheetByName(examConfig.sheetName);
    if (!sheet) return;
    const columnMap = ensureSheetSchema(sheet);
    const rows = getRowsByHeaders(sheet, columnMap);

    rows.forEach(function (row) {
      const matchesUid = user.userId && row.userId && row.userId === user.userId;
      const matchesMobile = user.mobile && row.mobileNumber && row.mobileNumber === user.mobile;
      const rowEmail = normalizeEmail(row.email || row.Email || "");
      const matchesEmail = user.email && rowEmail && rowEmail === user.email;
      if (!matchesUid && !matchesMobile && !matchesEmail) return;

      const key = examConfig.sheetName + ":" + row.rowNumber;
      if (seen[key]) return;
      seen[key] = true;

      const analytics = calculateAnalytics(rows, row, examConfig);
      attempts.push(buildDashboardAttempt(row, analytics, examConfig));
    });
  });

  return attempts.sort(sortDashboardAttempts);
}
function sendContactRequest(data) {
  const name = normalizeContactText(data.name || "Website Visitor", 80);
  const contact = normalizeContactText(data.contact || "Not provided", 120);
  const subject = normalizeContactText(data.subject, 120);
  const description = normalizeContactText(data.description, 1500);
  const page = normalizeContactText(data.page || "", 160);
  const pageUrl = String(data.pageUrl || "").slice(0, 500);
  const userAgent = String(data.userAgent || "").slice(0, 500);
  const submittedAt = normalizeContactText(data.submittedAt || new Date().toISOString(), 80);

  if (!subject) {
    return sendJSON({
      success: false,
      message: "Subject is required."
    });
  }

  if (!description) {
    return sendJSON({
      success: false,
      message: "Description is required."
    });
  }

  const to = "dmagstudio2023@outlook.com";
  const mailSubject = "GovJobUpdates Contact: " + subject;

  const body =
    "New contact request from GovJobUpdates website\n\n" +
    "Name: " + name + "\n" +
    "Contact: " + contact + "\n" +
    "Subject: " + subject + "\n\n" +
    "Description:\n" + description + "\n\n" +
    "Page: " + page + "\n" +
    "Page URL: " + pageUrl + "\n" +
    "Submitted At: " + submittedAt + "\n" +
    "User Agent: " + userAgent + "\n";

  try {
    MailApp.sendEmail({
      to: to,
      subject: mailSubject,
      body: body,
      name: "GovJobUpdates Contact"
    });

    return sendJSON({
      success: true,
      message: "Email sent"
    });
  } catch (error) {
    console.error("Contact email failed", error);
    return sendJSON({
      success: false,
      message: "Email could not be sent."
    });
  }
}

function normalizeContactText(value, maxLength) {
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/[{}\[\]`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength || 500);
}

function testSendContactRequest() {
  return sendContactRequest({
    name: "Test User",
    contact: "test@example.com",
    subject: "Test Contact Mail",
    description: "This is a test message from Apps Script editor.",
    page: "Apps Script Test",
    pageUrl: "Manual test",
    userAgent: "Apps Script"
  });
}

function authorizeContactEmail() {
  MailApp.sendEmail({
    to: "dmagstudio2023@outlook.com",
    subject: "GovJobUpdates Contact Mail Authorization Test",
    body: "MailApp authorization is working for GovJobUpdates contact feedback.",
    name: "GovJobUpdates Contact"
  });
}

function getContactTestUrl() {
  const url = ScriptApp.getService().getUrl();
  Logger.log("Use POST with JSON to test the contact route: " + url);
  return url;
}
