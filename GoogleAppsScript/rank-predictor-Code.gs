const SPREADSHEET_ID = "1IIDP7Slon3zRDlOH0hxzOnAZd4fzYi5nZHphVCW2_wE";
const RANK_EXAMS_SHEET_NAME = "Rank Predictor Exams";
const USERS_SHEET_NAME = "Users";
const QUIZ_ATTEMPTS_SHEET_NAME = "Quiz Attempts";

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

const QUIZ_ATTEMPT_HEADERS = [
  "Timestamp",
  "User ID",
  "Name",
  "Mobile",
  "Email",
  "Gender",
  "Quiz Attempt ID",
  "Quiz ID",
  "Quiz Title",
  "Subject",
  "Difficulty",
  "Completed At",
  "Submit Reason",
  "Total Questions",
  "Attempted",
  "Correct",
  "Wrong",
  "Unattempted",
  "Score",
  "Max Score",
  "Percentage",
  "Accuracy",
  "Time Taken Seconds",
  "Duration Minutes",
  "Subject Data (JSON)",
  "Answers (JSON)",
  "Statuses (JSON)",
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
    if (data.action === "registerCandidate") return registerCandidate(data);
    if (data.action === "loginCandidate") return loginCandidate(data);
    if (data.action === "resetCandidatePassword") return resetCandidatePassword(data);
    if (data.action === "changeCandidatePassword") return changeCandidatePassword(data);
    if (data.action === "getCandidateDashboard") return getCandidateDashboard(data);
    if (data.action === "getCandidateAttempts") return getCandidateAttempts(data);
    if (data.action === "submitQuizAttempt") return submitQuizAttempt(data);
    if (data.action === "getCandidateQuizAttempts") return getCandidateQuizAttempts(data);
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

function submitQuizAttempt(data) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const usersSheet = getUsersSheet(spreadsheet);
  const userMap = ensureUsersSheetSchema(usersSheet);
  const users = getUserRows(usersSheet, userMap);
  const user = findDashboardUser(users, data);

  if (!user) return sendJSON({ success: false, message: "Please login again before saving quiz attempts." });

  const attempt = normalizeQuizAttemptPayload(data, user);
  validateQuizAttemptPayload(attempt);

  const sheet = getQuizAttemptsSheet(spreadsheet);
  const columnMap = ensureQuizAttemptsSheetSchema(sheet);
  appendQuizAttempt(sheet, columnMap, attempt);
  SpreadsheetApp.flush();

  return sendJSON({
    success: true,
    message: "Quiz attempt saved to dashboard.",
    attempt: buildDashboardQuizAttempt(attempt)
  });
}

function getCandidateQuizAttempts(data) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const usersSheet = getUsersSheet(spreadsheet);
  const userMap = ensureUsersSheetSchema(usersSheet);
  const users = getUserRows(usersSheet, userMap);
  const user = findDashboardUser(users, data);

  if (!user) return sendJSON({ success: false, message: "Candidate account not found." });

  return sendJSON({
    success: true,
    message: "Quiz attempts loaded successfully.",
    user: sanitizeUser(user),
    quizAttempts: getCandidateQuizAttemptRows(spreadsheet, user)
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

function getUsersSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(USERS_SHEET_NAME) || spreadsheet.insertSheet(USERS_SHEET_NAME);
  ensureUsersSheetSchema(sheet);
  return sheet;
}

function getQuizAttemptsSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(QUIZ_ATTEMPTS_SHEET_NAME) || spreadsheet.insertSheet(QUIZ_ATTEMPTS_SHEET_NAME);
  ensureQuizAttemptsSheetSchema(sheet);
  return sheet;
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

function ensureQuizAttemptsSheetSchema(sheet) {
  if (sheet.getMaxColumns() < QUIZ_ATTEMPT_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), QUIZ_ATTEMPT_HEADERS.length - sheet.getMaxColumns());
  }

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 1 || lastColumn < 1) {
    sheet.getRange(1, 1, 1, QUIZ_ATTEMPT_HEADERS.length).setValues([QUIZ_ATTEMPT_HEADERS]);
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const hasAnyHeader = currentHeaders.some(function (header) {
    return String(header || "").trim();
  });
  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, QUIZ_ATTEMPT_HEADERS.length).setValues([QUIZ_ATTEMPT_HEADERS]);
    sheet.setFrozenRows(1);
    return getColumnMap(sheet);
  }

  const currentMap = buildColumnMapFromHeaders(currentHeaders);
  const missingHeaders = QUIZ_ATTEMPT_HEADERS.filter(function (header) {
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
  ensureQuizAttemptsSheetSchema(getQuizAttemptsSheet(spreadsheet));
  getRankPredictorExamConfigs(spreadsheet).exams.forEach(function (exam) {
    if (!exam.sheetName || exam.disabled) return;
    ensureSheetSchema(getSheetByExam(exam.sheetName, spreadsheet));
  });
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

  const rankAttempts = getCandidateRankAttemptRows(spreadsheet, user);
  const quizAttempts = getCandidateQuizAttemptRows(spreadsheet, user);
  const attempts = rankAttempts.concat(quizAttempts).sort(sortDashboardAttempts);
  const subjectAnalytics = buildDashboardSubjectAnalytics(attempts);
  return {
    user: sanitizeUser(user),
    summary: buildDashboardSummary(attempts, subjectAnalytics),
    attempts: attempts,
    rankAttempts: rankAttempts,
    quizAttempts: quizAttempts,
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
  return getCandidateRankAttemptRows(spreadsheet, user)
    .concat(getCandidateQuizAttemptRows(spreadsheet, user))
    .sort(sortDashboardAttempts);
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

function getCandidateQuizAttemptRows(spreadsheet, user) {
  const sheet = spreadsheet.getSheetByName(QUIZ_ATTEMPTS_SHEET_NAME);
  if (!sheet) return [];
  const columnMap = ensureQuizAttemptsSheetSchema(sheet);
  const rows = getQuizAttemptRowsByHeaders(sheet, columnMap);
  return rows.filter(function (row) {
    return row.userId === user.userId;
  }).map(buildDashboardQuizAttempt).sort(sortDashboardAttempts);
}

function getQuizAttemptRowsByHeaders(sheet, columnMap) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) return [];

  return sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues().map(function (row, index) {
    return {
      rowNumber: index + 2,
      timestamp: getHeaderValue(row, columnMap, "Timestamp"),
      userId: normalizeText(getHeaderValue(row, columnMap, "User ID")),
      name: normalizeText(getHeaderValue(row, columnMap, "Name")),
      mobile: normalizeMobile(getHeaderValue(row, columnMap, "Mobile")),
      email: normalizeEmail(getHeaderValue(row, columnMap, "Email")),
      gender: normalizeText(getHeaderValue(row, columnMap, "Gender")),
      quizAttemptId: normalizeText(getHeaderValue(row, columnMap, "Quiz Attempt ID")),
      quizId: normalizeText(getHeaderValue(row, columnMap, "Quiz ID")),
      quizTitle: normalizeText(getHeaderValue(row, columnMap, "Quiz Title")),
      subject: normalizeText(getHeaderValue(row, columnMap, "Subject")),
      difficulty: normalizeText(getHeaderValue(row, columnMap, "Difficulty")),
      completedAt: getHeaderValue(row, columnMap, "Completed At"),
      submitReason: normalizeText(getHeaderValue(row, columnMap, "Submit Reason")),
      totalQuestions: Number(getHeaderValue(row, columnMap, "Total Questions")) || 0,
      attempted: Number(getHeaderValue(row, columnMap, "Attempted")) || 0,
      correct: Number(getHeaderValue(row, columnMap, "Correct")) || 0,
      wrong: Number(getHeaderValue(row, columnMap, "Wrong")) || 0,
      unattempted: Number(getHeaderValue(row, columnMap, "Unattempted")) || 0,
      score: Number(getHeaderValue(row, columnMap, "Score")) || 0,
      maxScore: Number(getHeaderValue(row, columnMap, "Max Score")) || 0,
      percentage: Number(getHeaderValue(row, columnMap, "Percentage")) || 0,
      accuracy: Number(getHeaderValue(row, columnMap, "Accuracy")) || 0,
      timeTaken: Number(getHeaderValue(row, columnMap, "Time Taken Seconds")) || 0,
      durationMinutes: Number(getHeaderValue(row, columnMap, "Duration Minutes")) || 0,
      subjectData: parseSubjectData(getHeaderValue(row, columnMap, "Subject Data (JSON)")),
      answers: parseJsonArray(getHeaderValue(row, columnMap, "Answers (JSON)")),
      statuses: parseJsonArray(getHeaderValue(row, columnMap, "Statuses (JSON)"))
    };
  });
}

function buildDashboardQuizAttempt(row) {
  const subjectData = Array.isArray(row.subjectData) && row.subjectData.length
    ? row.subjectData
    : [{
      name: row.subject || "Quiz",
      attempted: row.attempted,
      correct: row.correct,
      wrong: row.wrong,
      marks: row.score,
      maxMarks: row.maxScore,
      accuracy: row.accuracy
    }];
  return {
    source: "quiz",
    attemptType: "Quiz",
    timestamp: toIsoString(row.timestamp),
    completedAt: toIsoString(row.completedAt || row.timestamp),
    userId: row.userId,
    gender: row.gender || "",
    examId: row.quizId,
    quizAttemptId: row.quizAttemptId,
    examName: row.quizTitle || "Quiz Attempt",
    quizTitle: row.quizTitle || "Quiz Attempt",
    subject: row.subject,
    difficulty: row.difficulty,
    mode: "Quiz",
    examDate: toIsoString(row.completedAt || row.timestamp),
    shift: "",
    category: "",
    state: "",
    totalQuestions: row.totalQuestions,
    totalAttempted: row.attempted,
    rightAnswers: row.correct,
    wrongAnswers: row.wrong,
    unattempted: row.unattempted,
    rawMarks: round2(row.score),
    marks: round2(row.score),
    maxMarks: round2(row.maxScore),
    normalizedMarks: "",
    percentile: "",
    percentage: round2(row.percentage),
    scorePercent: round2(row.percentage),
    overallRank: "",
    categoryRank: "",
    stateRank: "",
    shiftRank: "",
    accuracy: round2(row.accuracy),
    timeTaken: row.timeTaken,
    durationMinutes: row.durationMinutes,
    submitReason: row.submitReason,
    subjectData: subjectData,
    subjectAnalysis: subjectData,
    answers: row.answers || [],
    statuses: row.statuses || [],
    totalSubmissions: "",
    rankBasis: "quiz-score"
  };
}

function normalizeQuizAttemptPayload(data, user) {
  const totalQuestions = Number(data.totalQuestions || data.total || 0);
  const attempted = Number(data.attempted || data.totalAttempted || 0);
  const correct = Number(data.correct || data.rightAnswers || 0);
  const wrong = Number(data.wrong || data.wrongAnswers || 0);
  const unattempted = isFinite(Number(data.unattempted)) ? Number(data.unattempted) : Math.max(totalQuestions - attempted, 0);
  const score = Number(data.score || data.rawMarks || 0);
  const maxScore = Number(data.maxScore || totalQuestions || 0);
  const percentage = isFinite(Number(data.percentage))
    ? Number(data.percentage)
    : maxScore ? (score / maxScore) * 100 : 0;
  const accuracy = isFinite(Number(data.accuracy))
    ? Number(data.accuracy)
    : attempted ? (correct / attempted) * 100 : 0;

  return {
    timestamp: new Date(),
    userId: user.userId,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    gender: user.gender || "",
    quizAttemptId: normalizeText(data.quizAttemptId) || "quiz-" + new Date().getTime(),
    quizId: normalizeText(data.quizId),
    quizTitle: normalizeText(data.quizTitle),
    subject: normalizeText(data.subject),
    difficulty: normalizeText(data.difficulty || "Mixed"),
    completedAt: toDateOrNow(data.completedAt),
    submitReason: normalizeText(data.submitReason || data.reason || "manual"),
    totalQuestions: totalQuestions,
    attempted: attempted,
    correct: correct,
    wrong: wrong,
    unattempted: unattempted,
    score: round2(score),
    maxScore: round2(maxScore),
    percentage: round2(Math.max(0, percentage)),
    accuracy: round2(Math.max(0, accuracy)),
    timeTaken: Number(data.timeTaken || 0),
    durationMinutes: Number(data.durationMinutes || 0),
    subjectData: normalizeSubjectData(data.subjectData || [], {
      marksPerCorrect: 1,
      negativeMarking: 0
    }),
    answers: Array.isArray(data.answers) ? data.answers : [],
    statuses: Array.isArray(data.statuses) ? data.statuses : [],
    userAgent: normalizeText(data.userAgent)
  };
}

function validateQuizAttemptPayload(attempt) {
  if (!attempt.userId) throw new Error("Candidate ID is required.");
  if (!attempt.quizId) throw new Error("Quiz ID is required.");
  if (!attempt.quizTitle) throw new Error("Quiz title is required.");
  if (!attempt.subject) throw new Error("Quiz subject is required.");
  if (!isFinite(Number(attempt.totalQuestions)) || Number(attempt.totalQuestions) <= 0) throw new Error("Total questions must be a number.");
  if (Number(attempt.attempted) > Number(attempt.totalQuestions)) throw new Error("Attempted questions cannot exceed total questions.");
  if (Number(attempt.correct) + Number(attempt.wrong) > Number(attempt.attempted)) throw new Error("Correct and wrong answers cannot exceed attempted questions.");
}

function appendQuizAttempt(sheet, columnMap, attempt) {
  const row = new Array(Math.max(sheet.getLastColumn(), QUIZ_ATTEMPT_HEADERS.length)).fill("");
  setHeaderValue(row, columnMap, "Timestamp", attempt.timestamp);
  setHeaderValue(row, columnMap, "User ID", attempt.userId);
  setHeaderValue(row, columnMap, "Name", attempt.name);
  setHeaderValue(row, columnMap, "Mobile", attempt.mobile);
  setHeaderValue(row, columnMap, "Email", attempt.email);
  setHeaderValue(row, columnMap, "Gender", attempt.gender);
  setHeaderValue(row, columnMap, "Quiz Attempt ID", attempt.quizAttemptId);
  setHeaderValue(row, columnMap, "Quiz ID", attempt.quizId);
  setHeaderValue(row, columnMap, "Quiz Title", attempt.quizTitle);
  setHeaderValue(row, columnMap, "Subject", attempt.subject);
  setHeaderValue(row, columnMap, "Difficulty", attempt.difficulty);
  setHeaderValue(row, columnMap, "Completed At", attempt.completedAt);
  setHeaderValue(row, columnMap, "Submit Reason", attempt.submitReason);
  setHeaderValue(row, columnMap, "Total Questions", attempt.totalQuestions);
  setHeaderValue(row, columnMap, "Attempted", attempt.attempted);
  setHeaderValue(row, columnMap, "Correct", attempt.correct);
  setHeaderValue(row, columnMap, "Wrong", attempt.wrong);
  setHeaderValue(row, columnMap, "Unattempted", attempt.unattempted);
  setHeaderValue(row, columnMap, "Score", attempt.score);
  setHeaderValue(row, columnMap, "Max Score", attempt.maxScore);
  setHeaderValue(row, columnMap, "Percentage", attempt.percentage);
  setHeaderValue(row, columnMap, "Accuracy", attempt.accuracy);
  setHeaderValue(row, columnMap, "Time Taken Seconds", attempt.timeTaken);
  setHeaderValue(row, columnMap, "Duration Minutes", attempt.durationMinutes);
  setHeaderValue(row, columnMap, "Subject Data (JSON)", JSON.stringify(attempt.subjectData || []));
  setHeaderValue(row, columnMap, "Answers (JSON)", JSON.stringify(attempt.answers || []));
  setHeaderValue(row, columnMap, "Statuses (JSON)", JSON.stringify(attempt.statuses || []));
  setHeaderValue(row, columnMap, "User Agent", attempt.userAgent || "");

  const nextRow = sheet.getLastRow() + 1;
  ["User ID", "Mobile", "Email", "Quiz Attempt ID", "Quiz ID", "Subject Data (JSON)", "Answers (JSON)", "Statuses (JSON)"].forEach(function (header) {
    setTextFormat(sheet, columnMap, nextRow, header);
  });
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
}

function buildDashboardSummary(attempts, subjectAnalytics) {
  const total = attempts.length;
  const rankAttempts = attempts.filter(function (attempt) {
    return attempt.source !== "quiz";
  });
  const quizAttempts = attempts.filter(function (attempt) {
    return attempt.source === "quiz";
  });
  const percentileValues = rankAttempts.map(function (attempt) {
    return Number(attempt.percentile);
  }).filter(function (value) {
    return Number.isFinite(value);
  });
  const quizScoreValues = quizAttempts.map(function (attempt) {
    return Number(attempt.scorePercent || attempt.percentage);
  }).filter(function (value) {
    return Number.isFinite(value);
  });
  const rankedAttempts = rankAttempts.filter(function (attempt) {
    return Number(attempt.overallRank) > 0;
  }).sort(function (first, second) {
    return Number(first.overallRank) - Number(second.overallRank);
  });
  const bestSubject = subjectAnalytics.length ? subjectAnalytics[0] : null;
  const weakSubject = subjectAnalytics.length ? subjectAnalytics[subjectAnalytics.length - 1] : null;

  return {
    totalExamsAttempted: total,
    totalRankPredictorAttempts: rankAttempts.length,
    totalQuizzesAttempted: quizAttempts.length,
    averagePercentile: percentileValues.length ? round2(percentileValues.reduce(function (sum, value) {
      return sum + value;
    }, 0) / percentileValues.length) : 0,
    averageQuizScore: quizScoreValues.length ? round2(quizScoreValues.reduce(function (sum, value) {
      return sum + value;
    }, 0) / quizScoreValues.length) : 0,
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
  const percentile = calculatePercentile(scoredRows, scoredTargetRow, rankScoreField);
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
    const maxMarks = isFinite(Number(subject.maxMarks)) ? Number(subject.maxMarks) : "";
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

function parseJsonArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function toDateOrNow(value) {
  if (!value) return new Date();
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
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
