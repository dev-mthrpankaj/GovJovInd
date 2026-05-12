/*
Paste this patch at the bottom of GoogleAppsScript/rank-predictor-Code.gs in Apps Script editor.
Then add one route in doPost:

if (data.action === "getFirebaseRankDashboard") return getFirebaseRankDashboard(data);

After saving, Deploy > Manage deployments > Edit > New version > Deploy.
*/

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
Paste this patch at the bottom of GoogleAppsScript/rank-predictor-Code.gs in Apps Script editor.
Then add one route in doPost:

if (data.action === "getFirebaseRankDashboard") return getFirebaseRankDashboard(data);

After saving, Deploy > Manage deployments > Edit > New version > Deploy.
*/

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
