window.gjuMyDeskModuleStarted = true;

(function () {
  "use strict";

  let initializeApp;
  let getApps;
  let getAuth;
  let onAuthStateChanged;
  let setPersistence;
  let browserLocalPersistence;
  let getDatabase;
  let ref;
  let get;
  let set;
  let push;
  let update;
  let remove;
  let runTransaction;
  let serverTimestamp;

  const isApp = /GovJobUpdatesApp/i.test(navigator.userAgent || "") || Boolean(window.GovJobUpdatesAndroid);
  const config = window.GJU_FIREBASE_CONFIG;
  const timerDraftPrefix = "gju:my-desk:timer:";
  const offlineQueuePrefix = "gju:my-desk:offline-queue:";
  const subjects = ["Hindi", "English", "GK/GS", "Maths", "Reasoning", "Other"];
  const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const dayLabels = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  };
  const prioritySet = new Set(["Low", "Medium", "High"]);
  const mistakeReasons = new Set(["Concept weak", "Calculation mistake", "Silly mistake", "Time pressure", "Guessing", "Other"]);
  const questionStatuses = new Set(["Pending", "Revised", "Mastered"]);
  const allowedCategories = new Set(["", "SSC", "Police", "Railway", "Banking", "Teaching", "State Exams", "Defence", "Other"]);
  const allowedSubjects = new Set(subjects);

  let state = {
    auth: null,
    db: null,
    user: null,
    settings: null,
    todaySummary: null,
    streak: null,
    weeklyPlanner: {},
    revisionReminders: [],
    wrongQuestions: [],
    quickNotes: [],
    notificationPrefs: null,
    quizStats: null,
    reportSummaries: [],
    saving: false,
    studySaving: false,
    plannerSaving: false,
    reminderSaving: false,
    wrongQuestionSaving: false,
    quickNoteSaving: false,
    notificationPrefsSaving: false,
    offlineSyncing: false,
    timer: {
      subject: "",
      startedAt: null,
      lastRunStartedAt: null,
      elapsedMs: 0,
      running: false,
      active: false,
      intervalId: null
    }
  };

  const nodes = {
    loading: document.getElementById("myDeskLoading"),
    appOnly: document.getElementById("myDeskAppOnly"),
    loginRequired: document.getElementById("myDeskLoginRequired"),
    dashboard: document.getElementById("myDeskDashboard"),
    loginMessage: document.getElementById("myDeskLoginMessage"),
    userName: document.getElementById("myDeskUserName"),
    userEmail: document.getElementById("myDeskUserEmail"),
    targetStatus: document.getElementById("targetStatus"),
    targetForm: document.getElementById("myTargetForm"),
    targetExam: document.getElementById("targetExam"),
    targetCategory: document.getElementById("targetCategory"),
    dailyStudyHours: document.getElementById("dailyStudyHours"),
    dailyQuizQuestions: document.getElementById("dailyQuizQuestions"),
    targetExamDate: document.getElementById("targetExamDate"),
    saveTargetBtn: document.getElementById("saveTargetBtn"),
    clearTargetBtn: document.getElementById("clearTargetBtn"),
    missionStudyTarget: document.getElementById("missionStudyTarget"),
    missionQuizTarget: document.getElementById("missionQuizTarget"),
    missionFocusSubject: document.getElementById("missionFocusSubject"),
    missionStreak: document.getElementById("missionStreak"),
    missionFocusScore: document.getElementById("missionFocusScore"),
    missionDayStatus: document.getElementById("missionDayStatus"),
    missionExamCountdown: document.getElementById("missionExamCountdown"),
    missionNextSteps: document.getElementById("missionNextSteps"),
    studyStatus: document.getElementById("studyStatus"),
    todayTotalStudy: document.getElementById("todayTotalStudy"),
    todayStudyProgress: document.getElementById("todayStudyProgress"),
    subjectProgressList: document.getElementById("subjectProgressList"),
    studyTimerForm: document.getElementById("studyTimerForm"),
    timerSubject: document.getElementById("timerSubject"),
    studyTimerDisplay: document.getElementById("studyTimerDisplay"),
    startTimerBtn: document.getElementById("startTimerBtn"),
    pauseTimerBtn: document.getElementById("pauseTimerBtn"),
    resumeTimerBtn: document.getElementById("resumeTimerBtn"),
    finishTimerBtn: document.getElementById("finishTimerBtn"),
    cancelTimerBtn: document.getElementById("cancelTimerBtn"),
    manualStudyForm: document.getElementById("manualStudyForm"),
    manualSubject: document.getElementById("manualSubject"),
    manualMinutes: document.getElementById("manualMinutes"),
    manualTopic: document.getElementById("manualTopic"),
    saveManualTimeBtn: document.getElementById("saveManualTimeBtn"),
    currentStreakValue: document.getElementById("currentStreakValue"),
    bestStreakValue: document.getElementById("bestStreakValue"),
    lastCompletedDateValue: document.getElementById("lastCompletedDateValue"),
    streakMessage: document.getElementById("streakMessage"),
    focusScoreValue: document.getElementById("focusScoreValue"),
    focusScoreMessage: document.getElementById("focusScoreMessage"),
    studyScoreBreakdown: document.getElementById("studyScoreBreakdown"),
    quizScoreBreakdown: document.getElementById("quizScoreBreakdown"),
    streakScoreBreakdown: document.getElementById("streakScoreBreakdown")
    ,
    missionPlannedSessions: document.getElementById("missionPlannedSessions"),
    missionRevisionDue: document.getElementById("missionRevisionDue"),
    plannerStatus: document.getElementById("plannerStatus"),
    plannerSlotForm: document.getElementById("plannerSlotForm"),
    plannerDay: document.getElementById("plannerDay"),
    plannerTime: document.getElementById("plannerTime"),
    plannerSubject: document.getElementById("plannerSubject"),
    plannerTopic: document.getElementById("plannerTopic"),
    plannerDuration: document.getElementById("plannerDuration"),
    savePlannerSlotBtn: document.getElementById("savePlannerSlotBtn"),
    weeklyPlannerList: document.getElementById("weeklyPlannerList"),
    revisionStatus: document.getElementById("revisionStatus"),
    revisionReminderForm: document.getElementById("revisionReminderForm"),
    revisionSubject: document.getElementById("revisionSubject"),
    revisionTopic: document.getElementById("revisionTopic"),
    revisionDate: document.getElementById("revisionDate"),
    revisionPriority: document.getElementById("revisionPriority"),
    saveRevisionBtn: document.getElementById("saveRevisionBtn"),
    revisionReminderList: document.getElementById("revisionReminderList"),
    reportStatus: document.getElementById("reportStatus"),
    reportTotalStudy: document.getElementById("reportTotalStudy"),
    reportBestDay: document.getElementById("reportBestDay"),
    reportAverageStudy: document.getElementById("reportAverageStudy"),
    reportTopSubject: document.getElementById("reportTopSubject"),
    studyReportBars: document.getElementById("studyReportBars"),
    wrongQuestionStatus: document.getElementById("wrongQuestionStatus"),
    wrongQuestionForm: document.getElementById("wrongQuestionForm"),
    wrongQuestionSubject: document.getElementById("wrongQuestionSubject"),
    wrongQuestionTopic: document.getElementById("wrongQuestionTopic"),
    wrongQuestionText: document.getElementById("wrongQuestionText"),
    wrongQuestionReason: document.getElementById("wrongQuestionReason"),
    wrongQuestionReattemptDate: document.getElementById("wrongQuestionReattemptDate"),
    wrongQuestionStatusSelect: document.getElementById("wrongQuestionStatusSelect"),
    saveWrongQuestionBtn: document.getElementById("saveWrongQuestionBtn"),
    wrongQuestionList: document.getElementById("wrongQuestionList"),
    wrongQuestionFilterSubject: document.getElementById("wrongQuestionFilterSubject"),
    wrongQuestionFilterStatus: document.getElementById("wrongQuestionFilterStatus"),
    wrongQuestionDueOnly: document.getElementById("wrongQuestionDueOnly"),
    quickNoteStatus: document.getElementById("quickNoteStatus"),
    quickNoteForm: document.getElementById("quickNoteForm"),
    quickNoteTitle: document.getElementById("quickNoteTitle"),
    quickNoteBody: document.getElementById("quickNoteBody"),
    quickNoteTag: document.getElementById("quickNoteTag"),
    saveQuickNoteBtn: document.getElementById("saveQuickNoteBtn"),
    quickNoteList: document.getElementById("quickNoteList"),
    notificationPrefsStatus: document.getElementById("notificationPrefsStatus"),
    notificationPrefsForm: document.getElementById("notificationPrefsForm"),
    notificationEnabled: document.getElementById("notificationEnabled"),
    morningReminder: document.getElementById("morningReminder"),
    morningTime: document.getElementById("morningTime"),
    eveningReminder: document.getElementById("eveningReminder"),
    eveningTime: document.getElementById("eveningTime"),
    nightReport: document.getElementById("nightReport"),
    nightTime: document.getElementById("nightTime"),
    saveNotificationPrefsBtn: document.getElementById("saveNotificationPrefsBtn"),
    dataControlsStatus: document.getElementById("dataControlsStatus"),
    exportMyDeskBtn: document.getElementById("exportMyDeskBtn"),
    syncOfflineQueueBtn: document.getElementById("syncOfflineQueueBtn"),
    resetMyDeskBtn: document.getElementById("resetMyDeskBtn")
  };

  function show(viewName) {
    Object.entries({
      loading: nodes.loading,
      appOnly: nodes.appOnly,
      loginRequired: nodes.loginRequired,
      dashboard: nodes.dashboard
    }).forEach(([name, node]) => {
      if (node) node.hidden = name !== viewName;
    });
  }

  function markReady() {
    document.body.classList.remove("gju-auth-pending");
    document.body.classList.add("gju-auth-ready");
    window.gjuMyDeskLoadingFallback = null;
  }

  function setStatus(message, type = "info") {
    if (!nodes.targetStatus) return;
    nodes.targetStatus.textContent = message || "";
    nodes.targetStatus.dataset.state = type;
  }

  function setStudyStatus(message, type = "info") {
    if (!nodes.studyStatus) return;
    nodes.studyStatus.textContent = message || "";
    nodes.studyStatus.dataset.state = type;
  }

  function setPlannerStatus(message, type = "info") {
    if (!nodes.plannerStatus) return;
    nodes.plannerStatus.textContent = message || "";
    nodes.plannerStatus.dataset.state = type;
  }

  function setRevisionStatus(message, type = "info") {
    if (!nodes.revisionStatus) return;
    nodes.revisionStatus.textContent = message || "";
    nodes.revisionStatus.dataset.state = type;
  }

  function setReportStatus(message, type = "info") {
    if (!nodes.reportStatus) return;
    nodes.reportStatus.textContent = message || "";
    nodes.reportStatus.dataset.state = type;
  }

  function setWrongQuestionStatus(message, type = "info") {
    if (!nodes.wrongQuestionStatus) return;
    nodes.wrongQuestionStatus.textContent = message || "";
    nodes.wrongQuestionStatus.dataset.state = type;
  }

  function setQuickNoteStatus(message, type = "info") {
    if (!nodes.quickNoteStatus) return;
    nodes.quickNoteStatus.textContent = message || "";
    nodes.quickNoteStatus.dataset.state = type;
  }

  function setNotificationPrefsStatus(message, type = "info") {
    if (!nodes.notificationPrefsStatus) return;
    nodes.notificationPrefsStatus.textContent = message || "";
    nodes.notificationPrefsStatus.dataset.state = type;
  }

  function setDataControlsStatus(message, type = "info") {
    if (!nodes.dataControlsStatus) return;
    nodes.dataControlsStatus.textContent = message || "";
    nodes.dataControlsStatus.dataset.state = type;
  }

  function localSessionSummary() {
    try {
      const raw = localStorage.getItem("gju:candidate-session");
      if (!raw) return "localSession=no";
      const parsed = JSON.parse(raw);
      return `localSession=yes email=${parsed.email ? "yes" : "no"} uid=${parsed.userId ? "yes" : "no"}`;
    } catch {
      return "localSession=blocked";
    }
  }

  function isOffline() {
    return navigator.onLine === false;
  }

  function offlineQueueKey() {
    return `${offlineQueuePrefix}${state.user?.uid || "anonymous"}`;
  }

  function readOfflineQueue() {
    try {
      const raw = localStorage.getItem(offlineQueueKey());
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeOfflineQueue(queue) {
    try {
      localStorage.setItem(offlineQueueKey(), JSON.stringify(queue.slice(0, 80)));
      return true;
    } catch {
      return false;
    }
  }

  function enqueueOfflineAction(type, payload, statusSetter, message) {
    const queue = readOfflineQueue();
    queue.push({
      id: `offline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      payload,
      createdAt: Date.now()
    });
    const saved = writeOfflineQueue(queue);
    if (typeof statusSetter === "function") {
      statusSetter(saved ? `${message} Internet wapas aate hi sync ho jayega.` : "Offline draft save nahi ho paaya. Please internet connect karke dobara try karein.", saved ? "info" : "error");
    }
    return saved;
  }

  function setAuthDebug(message) {
    if (!new URLSearchParams(window.location.search).has("debugMyDesk")) return;
    console.debug(`[MyDesk] ${message} | app=${isApp ? "yes" : "no"} | config=${config?.apiKey ? "yes" : "no"} | ${localSessionSummary()}`);
  }

  setAuthDebug("module-started");
  window.addEventListener("error", (event) => {
    setAuthDebug(`runtime-error=${String(event.message || "unknown").slice(0, 90)}`);
  });
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason || {};
    setAuthDebug(`promise-error=${String(reason.message || reason || "unknown").slice(0, 90)}`);
  });

  async function loadFirebaseModules() {
    if (initializeApp && getAuth && getDatabase) return;
    setAuthDebug("firebase-import-started");
    const [appModule, authModule, databaseModule] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js")
    ]);
    initializeApp = appModule.initializeApp;
    getApps = appModule.getApps;
    getAuth = authModule.getAuth;
    onAuthStateChanged = authModule.onAuthStateChanged;
    setPersistence = authModule.setPersistence;
    browserLocalPersistence = authModule.browserLocalPersistence;
    getDatabase = databaseModule.getDatabase;
    ref = databaseModule.ref;
    get = databaseModule.get;
    set = databaseModule.set;
    push = databaseModule.push;
    update = databaseModule.update;
    remove = databaseModule.remove;
    runTransaction = databaseModule.runTransaction;
    serverTimestamp = databaseModule.serverTimestamp;
    setAuthDebug("firebase-import-ready");
  }

  function setSaving(isSaving) {
    state.saving = isSaving;
    if (nodes.saveTargetBtn) {
      nodes.saveTargetBtn.disabled = isSaving;
      nodes.saveTargetBtn.textContent = isSaving ? "Saving..." : "Save Target";
    }
    if (nodes.clearTargetBtn) nodes.clearTargetBtn.disabled = isSaving;
  }

  function setStudySaving(isSaving) {
    state.studySaving = isSaving;
    if (nodes.saveManualTimeBtn) {
      nodes.saveManualTimeBtn.disabled = isSaving;
      nodes.saveManualTimeBtn.textContent = isSaving ? "Saving..." : "Save Manual Time";
    }
    updateTimerButtons();
  }

  function setPlannerSaving(isSaving) {
    state.plannerSaving = isSaving;
    if (nodes.savePlannerSlotBtn) {
      nodes.savePlannerSlotBtn.disabled = isSaving;
      nodes.savePlannerSlotBtn.textContent = isSaving ? "Saving..." : "Save Slot";
    }
  }

  function setReminderSaving(isSaving) {
    state.reminderSaving = isSaving;
    if (nodes.saveRevisionBtn) {
      nodes.saveRevisionBtn.disabled = isSaving;
      nodes.saveRevisionBtn.textContent = isSaving ? "Saving..." : "Save Reminder";
    }
  }

  function setWrongQuestionSaving(isSaving) {
    state.wrongQuestionSaving = isSaving;
    if (nodes.saveWrongQuestionBtn) {
      nodes.saveWrongQuestionBtn.disabled = isSaving;
      nodes.saveWrongQuestionBtn.textContent = isSaving ? "Saving..." : "Save Wrong Question";
    }
  }

  function setQuickNoteSaving(isSaving) {
    state.quickNoteSaving = isSaving;
    if (nodes.saveQuickNoteBtn) {
      nodes.saveQuickNoteBtn.disabled = isSaving;
      nodes.saveQuickNoteBtn.textContent = isSaving ? "Saving..." : "Save Note";
    }
  }

  function setNotificationPrefsSaving(isSaving) {
    state.notificationPrefsSaving = isSaving;
    if (nodes.saveNotificationPrefsBtn) {
      nodes.saveNotificationPrefsBtn.disabled = isSaving;
      nodes.saveNotificationPrefsBtn.textContent = isSaving ? "Saving..." : "Save Reminder Preferences";
    }
  }

  function userDisplayName(user) {
    return user?.displayName || user?.email?.split("@")[0] || "GovJobUpdates User";
  }

  function renderUser(user) {
    if (nodes.userName) nodes.userName.textContent = userDisplayName(user);
    if (nodes.userEmail) nodes.userEmail.textContent = user?.email || "Account active";
  }

  function todayKey() {
    return dateKey(new Date());
  }

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addDays(dateValue, days) {
    const base = dateValue ? new Date(`${dateValue}T00:00:00`) : new Date();
    base.setDate(base.getDate() + days);
    return dateKey(base);
  }

  function lastSevenDateKeys() {
    return Array.from({ length: 7 }, (_, index) => addDays(todayKey(), index - 6));
  }

  function yesterdayKey() {
    return addDays(todayKey(), -1);
  }

  function todayDayKey() {
    const index = new Date().getDay();
    return dayKeys[(index + 6) % 7];
  }

  function emptySubjectMinutes() {
    return subjects.reduce((acc, subject) => {
      acc[subject] = 0;
      return acc;
    }, {});
  }

  function normalizeSummary(summary) {
    const base = {
      date: todayKey(),
      totalStudyMinutes: 0,
      subjectMinutes: emptySubjectMinutes(),
      studyTargetMet: false,
      dayCompleted: false,
      focusScore: 0,
      updatedAt: Date.now()
    };
    if (!summary || typeof summary !== "object") return base;
    const subjectMinutes = emptySubjectMinutes();
    subjects.forEach((subject) => {
      const value = Number(summary.subjectMinutes?.[subject]);
      subjectMinutes[subject] = Number.isFinite(value) && value > 0 ? Math.round(value) : 0;
    });
    return {
      ...base,
      ...summary,
      date: summary.date || todayKey(),
      totalStudyMinutes: Number(summary.totalStudyMinutes) || 0,
      subjectMinutes,
      studyTargetMet: Boolean(summary.studyTargetMet),
      dayCompleted: Boolean(summary.dayCompleted),
      focusScore: Math.max(0, Math.min(100, Math.round(Number(summary.focusScore) || 0)))
    };
  }

  function normalizeStreak(streak) {
    const lastCompletedDate = parseDateKey(streak?.lastCompletedDate);
    const lastCheckedDate = parseDateKey(streak?.lastCheckedDate);
    const lastMissedDate = parseDateKey(streak?.lastMissedDate);
    return {
      currentStreak: Math.max(0, Math.round(Number(streak?.currentStreak) || 0)),
      bestStreak: Math.max(0, Math.round(Number(streak?.bestStreak) || 0)),
      lastCompletedDate,
      lastCheckedDate,
      lastMissedDate: lastMissedDate || null,
      updatedAt: streak?.updatedAt || Date.now()
    };
  }

  function getSelectedWeakSubjects() {
    if (!nodes.targetForm) return [];
    return Array.from(nodes.targetForm.querySelectorAll('input[name="weakSubjects"]:checked'))
      .map((input) => input.value)
      .filter((value) => allowedSubjects.has(value))
      .slice(0, 6);
  }

  function setSelectedWeakSubjects(subjectList) {
    const selected = new Set(Array.isArray(subjectList) ? subjectList : []);
    if (!nodes.targetForm) return;
    nodes.targetForm.querySelectorAll('input[name="weakSubjects"]').forEach((input) => {
      input.checked = selected.has(input.value);
    });
  }

  function parseDateKey(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";

    let year;
    let month;
    let day;
    const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const indianMatch = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

    if (isoMatch) {
      year = Number(isoMatch[1]);
      month = Number(isoMatch[2]);
      day = Number(isoMatch[3]);
    } else if (indianMatch) {
      day = Number(indianMatch[1]);
      month = Number(indianMatch[2]);
      year = Number(indianMatch[3]);
    } else {
      return "";
    }

    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return "";
    if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) return "";

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return "";

    return dateKey(date);
  }

  function dateIsValid(value) {
    if (!value) return true;
    return Boolean(parseDateKey(value));
  }

  function collectSettings() {
    const targetExam = (nodes.targetExam?.value || "").trim();
    const targetCategory = nodes.targetCategory?.value || "";
    const studyHoursRaw = Number(nodes.dailyStudyHours?.value);
    const quizTargetRaw = Number(nodes.dailyQuizQuestions?.value);
    const weakSubjects = getSelectedWeakSubjects();
    const targetExamDate = parseDateKey(nodes.targetExamDate?.value || "");

    if (targetExam.length > 80) throw new Error("Target exam 80 characters se zyada nahi hona chahiye.");
    if (!allowedCategories.has(targetCategory)) throw new Error("Please select a valid target category.");
    if (!Number.isFinite(studyHoursRaw) || studyHoursRaw < 0.5 || studyHoursRaw > 16) throw new Error("Daily study hours 0.5 se 16 hours ke beech rakhein.");
    if (!Number.isFinite(quizTargetRaw) || quizTargetRaw < 0 || quizTargetRaw > 500) throw new Error("Daily quiz target 0 se 500 questions ke beech rakhein.");
    if (weakSubjects.length > 6) throw new Error("Weak subjects maximum 6 select kar sakte hain.");
    if ((nodes.targetExamDate?.value || "").trim() && !targetExamDate) throw new Error("Please select a valid exam date. Calendar se date choose karein.");

    return {
      targetExam,
      targetCategory,
      dailyStudyMinutesTarget: Math.round(studyHoursRaw * 60),
      dailyQuizQuestionsTarget: Math.round(quizTargetRaw),
      weakSubjects,
      targetExamDate,
      updatedAt: serverTimestamp()
    };
  }

  function settingsPath(uid) {
    return `users/${uid}/myDesk/settings`;
  }

  function myDeskRootPath(uid) {
    return `users/${uid}/myDesk`;
  }

  function sessionsPath(uid) {
    return `users/${uid}/myDesk/studySessions`;
  }

  function todaySummaryPath(uid) {
    return `users/${uid}/myDesk/dailySummaries/${todayKey()}`;
  }

  function streakPath(uid) {
    return `users/${uid}/myDesk/streak`;
  }

  function weeklyPlannerPath(uid) {
    return `users/${uid}/myDesk/weeklyPlanner`;
  }

  function plannerDayPath(uid, dayKey) {
    return `users/${uid}/myDesk/weeklyPlanner/${dayKey}`;
  }

  function revisionRemindersPath(uid) {
    return `users/${uid}/myDesk/revisionReminders`;
  }

  function wrongQuestionsPath(uid) {
    return `users/${uid}/myDesk/wrongQuestions`;
  }

  function quickNotesPath(uid) {
    return `users/${uid}/myDesk/quickNotes`;
  }

  function notificationPrefsPath(uid) {
    return `users/${uid}/myDesk/notificationPrefs`;
  }

  function dailySummaryPath(uid, dateValue) {
    return `users/${uid}/myDesk/dailySummaries/${dateValue}`;
  }

  function quizAttemptsPath(uid) {
    return `user_quiz_attempts/${uid}`;
  }

  function formatDuration(minutes) {
    const value = Math.max(0, Math.round(Number(minutes) || 0));
    const hours = Math.floor(value / 60);
    const mins = value % 60;
    if (hours && mins) return `${hours}h ${mins}m`;
    if (hours) return `${hours}h`;
    return `${mins}m`;
  }

  function formatQuizTarget(count) {
    const value = Number(count);
    if (!Number.isFinite(value) || value < 0) return "Not set";
    return `${Math.round(value)} Questions`;
  }

  function mapQuizSubject(subject) {
    const value = String(subject || "").trim();
    const lower = value.toLowerCase();
    if (lower.includes("math")) return "Maths";
    if (lower.includes("general") || lower.includes("gk")) return "GK/GS";
    if (lower.includes("reason")) return "Reasoning";
    if (lower.includes("english")) return "English";
    if (lower.includes("hindi")) return "Hindi";
    if (lower.includes("computer")) return "Other";
    return allowedSubjects.has(value) ? value : "Other";
  }

  function emptyQuizStats() {
    return {
      todayQuestions: 0,
      todayAttempts: 0,
      todayCorrect: 0,
      todayWrong: 0,
      averageAccuracy: 0,
      weakSubject: "",
      recentAttemptTitle: "",
      firebaseAttemptCount: 0,
      localAttemptCount: 0
    };
  }

  function normalizeQuizAttempt(attempt) {
    if (!attempt || typeof attempt !== "object") return null;
    const completedAt = String(attempt.completedAt || attempt.timestamp || attempt.lastAttemptedAt || "");
    return {
      quizId: String(attempt.quizId || attempt.id || ""),
      quizTitle: String(attempt.quizTitle || attempt.title || "Quiz Attempt").slice(0, 120),
      subject: mapQuizSubject(attempt.subject || attempt.quizSubject || attempt.category),
      totalQuestions: Math.max(0, Math.round(Number(attempt.totalQuestions || attempt.total || attempt.questionCount) || 0)),
      attempted: Math.max(0, Math.round(Number(attempt.attempted) || 0)),
      correct: Math.max(0, Math.round(Number(attempt.correct) || 0)),
      wrong: Math.max(0, Math.round(Number(attempt.wrong) || 0)),
      accuracy: Math.max(0, Math.min(100, Math.round(Number(attempt.accuracy || attempt.percentage) || 0))),
      completedAt
    };
  }

  function readLocalQuizAttempts() {
    try {
      const raw = localStorage.getItem("GovJobUpdatesQuiz.attempts");
      const attempts = raw ? JSON.parse(raw) : [];
      return Array.isArray(attempts) ? attempts.map(normalizeQuizAttempt).filter(Boolean) : [];
    } catch {
      return [];
    }
  }

  function buildQuizStats(localAttempts = [], firebaseAttempts = []) {
    const today = todayKey();
    const stats = emptyQuizStats();
    const todayAttempts = localAttempts.filter((attempt) => parseDateKey(attempt.completedAt.slice(0, 10)) === today);
    const allAttempts = localAttempts.concat(firebaseAttempts);
    stats.localAttemptCount = localAttempts.length;
    stats.firebaseAttemptCount = firebaseAttempts.length;
    stats.todayAttempts = todayAttempts.length;
    stats.todayQuestions = todayAttempts.reduce((sum, attempt) => sum + Math.max(attempt.attempted || attempt.totalQuestions || 0, 0), 0);
    stats.todayCorrect = todayAttempts.reduce((sum, attempt) => sum + attempt.correct, 0);
    stats.todayWrong = todayAttempts.reduce((sum, attempt) => sum + attempt.wrong, 0);
    stats.recentAttemptTitle = localAttempts[0]?.quizTitle || "";
    const accuracyAttempts = allAttempts.filter((attempt) => Number.isFinite(attempt.accuracy) && attempt.accuracy > 0);
    stats.averageAccuracy = accuracyAttempts.length
      ? Math.round(accuracyAttempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) / accuracyAttempts.length)
      : 0;

    const subjectBuckets = {};
    allAttempts.forEach((attempt) => {
      const subject = mapQuizSubject(attempt.subject);
      if (!subjectBuckets[subject]) subjectBuckets[subject] = { attempted: 0, correct: 0 };
      subjectBuckets[subject].attempted += Math.max(attempt.attempted || attempt.totalQuestions || 0, 0);
      subjectBuckets[subject].correct += attempt.correct || 0;
    });
    stats.weakSubject = Object.keys(subjectBuckets)
      .filter((subject) => subjectBuckets[subject].attempted >= 5)
      .sort((a, b) => {
        const accA = subjectBuckets[a].correct / Math.max(subjectBuckets[a].attempted, 1);
        const accB = subjectBuckets[b].correct / Math.max(subjectBuckets[b].attempted, 1);
        return accA - accB;
      })[0] || "";
    return stats;
  }

  function currentStudyProgressText() {
    const summary = normalizeSummary(state.todaySummary);
    const target = Number(state.settings?.dailyStudyMinutesTarget) || 0;
    return `${formatDuration(summary.totalStudyMinutes)} / ${target > 0 ? formatDuration(target) : "Not set"}`;
  }

  function effectiveCurrentStreak(streak = state.streak) {
    const safe = normalizeStreak(streak);
    if (!safe.lastCompletedDate) return 0;
    if (safe.lastCompletedDate === todayKey() || safe.lastCompletedDate === yesterdayKey()) {
      return safe.currentStreak;
    }
    return 0;
  }

  function dayStatusText(summary = state.todaySummary) {
    const target = Number(state.settings?.dailyStudyMinutesTarget) || 0;
    if (target <= 0) return "Target Not Set";
    return normalizeSummary(summary).dayCompleted ? "Target Complete" : "In Progress";
  }

  function streakMessage(summary = state.todaySummary) {
    const target = Number(state.settings?.dailyStudyMinutesTarget) || 0;
    if (target <= 0) return "Set your target to start your first streak.";
    if (normalizeSummary(summary).dayCompleted) return "Great! Today's mission complete.";
    return "Aaj ka target complete karo, streak tootne mat do.";
  }

  function calculateFocusScore(summary = state.todaySummary, streak = state.streak) {
    const safeSummary = normalizeSummary(summary);
    const target = Number(state.settings?.dailyStudyMinutesTarget) || 0;
    if (target <= 0) {
      return {
        total: 0,
        studyScore: 0,
        quizScore: 0,
        streakScore: 0,
        message: "Set your daily study target to start focus tracking."
      };
    }
    const studyScore = Math.min(safeSummary.totalStudyMinutes / target, 1) * 70;
    const quizTarget = Number(state.settings?.dailyQuizQuestionsTarget);
    const quizStats = state.quizStats || emptyQuizStats();
    const quizScore = Number.isFinite(quizTarget) && quizTarget > 0
      ? Math.min(quizStats.todayQuestions / quizTarget, 1) * 20
      : 10;
    const streakScore = Math.min(effectiveCurrentStreak(streak), 7) / 7 * 10;
    const total = Math.round(studyScore + quizScore + streakScore);
    const message = safeSummary.dayCompleted
      ? "Great! Today's mission complete."
      : "Complete today's study target to improve your focus score.";
    return {
      total,
      studyScore: Math.round(studyScore),
      quizScore: Math.round(quizScore),
      streakScore: Math.round(streakScore),
      message
    };
  }

  function countdownText(dateValue) {
    const cleanDate = parseDateKey(dateValue);
    if (!cleanDate) return "Set target exam";
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const target = new Date(`${cleanDate}T00:00:00`).getTime();
    const days = Math.ceil((target - start) / 86400000);
    if (days > 1) return `${days} days left`;
    if (days === 1) return "1 day left";
    if (days === 0) return "Exam today";
    return "Exam date passed";
  }

  function renderMission() {
    const settings = state.settings;
    const summary = normalizeSummary(state.todaySummary);
    const focus = calculateFocusScore(summary, state.streak);
    const todaySlots = todayPlannerSlots();
    const pendingTodaySlots = todaySlots.filter((slot) => !isPlannerSlotDoneToday(slot));
    const quizStats = state.quizStats || emptyQuizStats();
    if (nodes.missionStudyTarget) nodes.missionStudyTarget.textContent = currentStudyProgressText();
    if (nodes.missionQuizTarget) {
      const quizTarget = Number(settings?.dailyQuizQuestionsTarget);
      nodes.missionQuizTarget.textContent = settings && Number.isFinite(quizTarget) && quizTarget > 0
        ? `${quizStats.todayQuestions}/${Math.round(quizTarget)} Questions`
        : (settings ? formatQuizTarget(settings?.dailyQuizQuestionsTarget) : "Not set");
    }
    if (nodes.missionFocusSubject) {
      const weakSubjects = Array.isArray(settings?.weakSubjects) ? settings.weakSubjects : [];
      nodes.missionFocusSubject.textContent = weakSubjects.length ? weakSubjects.join(", ") : (quizStats.weakSubject || (settings ? "Balanced" : "Not set"));
    }
    if (nodes.missionStreak) nodes.missionStreak.textContent = `${effectiveCurrentStreak()} days`;
    if (nodes.missionFocusScore) nodes.missionFocusScore.textContent = `${focus.total}/100`;
    if (nodes.missionDayStatus) nodes.missionDayStatus.textContent = dayStatusText(summary);
    if (nodes.missionPlannedSessions) nodes.missionPlannedSessions.textContent = `${todaySlots.length - pendingTodaySlots.length}/${todaySlots.length} done`;
    if (nodes.missionRevisionDue) nodes.missionRevisionDue.textContent = `${todayDueReminders().length} due`;
    if (nodes.missionExamCountdown) nodes.missionExamCountdown.textContent = settings ? countdownText(settings.targetExamDate) : "Set target exam";
    renderMissionNextSteps(summary, pendingTodaySlots);
  }

  function renderMissionNextSteps(summary, pendingTodaySlots) {
    if (!nodes.missionNextSteps) return;
    const target = Number(state.settings?.dailyStudyMinutesTarget) || 0;
    const quizTarget = Number(state.settings?.dailyQuizQuestionsTarget) || 0;
    const quizStats = state.quizStats || emptyQuizStats();
    const remainingStudy = Math.max(0, target - normalizeSummary(summary).totalStudyMinutes);
    const remainingQuiz = Math.max(0, quizTarget - quizStats.todayQuestions);
    const dueReminder = todayDueReminders()[0];
    const dueWrong = dueWrongQuestions()[0];
    const steps = [];

    if (remainingStudy > 0) {
      steps.push({
        icon: "fa-hourglass-half",
        title: `${formatDuration(remainingStudy)} study remaining`,
        text: "Start timer ya manual study time add karein.",
        target: "#studyTimerForm"
      });
    } else if (target > 0) {
      steps.push({
        icon: "fa-circle-check",
        title: "Study target complete",
        text: "Aaj revision ya wrong questions polish karein.",
        target: "#revisionReminderForm"
      });
    } else {
      steps.push({
        icon: "fa-bullseye",
        title: "Daily target set karein",
        text: "Study hours set karne se streak aur focus score meaningful banenge.",
        target: "#myTargetForm"
      });
    }

    if (dueReminder) {
      steps.push({
        icon: "fa-bell",
        title: `${dueReminder.subject} revision due`,
        text: dueReminder.topic || "Pending revision",
        target: "#revisionReminderForm"
      });
    } else if (pendingTodaySlots[0]) {
      steps.push({
        icon: "fa-calendar-check",
        title: `${formatTimeLabel(pendingTodaySlots[0].time)} planner slot`,
        text: `${pendingTodaySlots[0].subject} - ${pendingTodaySlots[0].topic || "Study session"}`,
        target: "#plannerSlotForm"
      });
    } else {
      steps.push({
        icon: "fa-calendar-days",
        title: "Planner clear for now",
        text: "Next study slot add karke day structured rakhein.",
        target: "#plannerSlotForm"
      });
    }

    if (remainingQuiz > 0) {
      steps.push({
        icon: "fa-circle-question",
        title: `${remainingQuiz} quiz questions pending`,
        text: quizStats.recentAttemptTitle ? `Last: ${quizStats.recentAttemptTitle}` : "Practice quiz complete karke focus score improve karein.",
        target: "quiz.html"
      });
    } else if (dueWrong) {
      steps.push({
        icon: "fa-clipboard-question",
        title: `${dueWrong.subject} wrong question due`,
        text: dueWrong.topic || dueWrong.mistakeReason,
        target: "#wrongQuestionForm"
      });
    } else {
      steps.push({
        icon: "fa-pen-to-square",
        title: "Mistake notebook update",
        text: "Aaj ka ek weak question save ya revise karein.",
        target: "#wrongQuestionForm"
      });
    }

    nodes.missionNextSteps.innerHTML = steps.slice(0, 3).map((step) => `
      <button type="button" ${step.target.endsWith(".html") ? `data-open-url="${escapeHtml(step.target)}"` : `data-scroll-target="${escapeHtml(step.target)}"`}>
        <i class="fas ${escapeHtml(step.icon)}" aria-hidden="true"></i>
        <span><strong>${escapeHtml(step.title)}</strong><small>${escapeHtml(step.text)}</small></span>
      </button>
    `).join("");
    cleanRenderedText(nodes.missionNextSteps);
  }

  function renderStreakAndFocus() {
    const streak = normalizeStreak(state.streak);
    const focus = calculateFocusScore();
    if (nodes.currentStreakValue) nodes.currentStreakValue.textContent = `${effectiveCurrentStreak(streak)} days`;
    if (nodes.bestStreakValue) nodes.bestStreakValue.textContent = `${streak.bestStreak} days`;
    if (nodes.lastCompletedDateValue) nodes.lastCompletedDateValue.textContent = streak.lastCompletedDate || "Not yet";
    if (nodes.streakMessage) nodes.streakMessage.textContent = streakMessage();
    if (nodes.focusScoreValue) nodes.focusScoreValue.textContent = `${focus.total}/100`;
    if (nodes.focusScoreMessage) nodes.focusScoreMessage.textContent = focus.message;
    if (nodes.studyScoreBreakdown) nodes.studyScoreBreakdown.textContent = `${focus.studyScore}/70`;
    if (nodes.quizScoreBreakdown) nodes.quizScoreBreakdown.textContent = `${focus.quizScore}/20`;
    if (nodes.streakScoreBreakdown) nodes.streakScoreBreakdown.textContent = `${focus.streakScore}/10`;
    renderMission();
  }

  function todayPlannerSlots() {
    const slots = state.weeklyPlanner?.[todayDayKey()] || [];
    return Array.isArray(slots) ? slots : [];
  }

  function isPlannerSlotDoneToday(slot) {
    return Boolean(slot?.completedDates?.[todayKey()]);
  }

  function todayDueReminders() {
    const today = todayKey();
    return state.revisionReminders.filter((reminder) => reminder.status !== "completed" && reminder.revisionDate <= today);
  }

  function dueWrongQuestions() {
    const today = todayKey();
    return state.wrongQuestions.filter((item) => item.status !== "Mastered" && item.reattemptDate && item.reattemptDate <= today);
  }

  function filteredWrongQuestions() {
    const subject = nodes.wrongQuestionFilterSubject?.value || "";
    const status = nodes.wrongQuestionFilterStatus?.value || "";
    const dueOnly = Boolean(nodes.wrongQuestionDueOnly?.checked);
    const today = todayKey();
    return state.wrongQuestions.filter((item) => {
      if (subject && item.subject !== subject) return false;
      if (status && item.status !== status) return false;
      if (dueOnly && !(item.status !== "Mastered" && item.reattemptDate && item.reattemptDate <= today)) return false;
      return true;
    });
  }

  function normalizePlanner(value) {
    const planner = {};
    dayKeys.forEach((dayKey) => {
      const daySlots = value?.[dayKey] || {};
      planner[dayKey] = Object.keys(daySlots).map((slotId) => ({
        id: slotId,
        dayKey,
        time: String(daySlots[slotId]?.time || ""),
        subject: allowedSubjects.has(daySlots[slotId]?.subject) ? daySlots[slotId].subject : "Other",
        topic: String(daySlots[slotId]?.topic || "").slice(0, 100),
        durationMinutes: Math.max(10, Math.min(720, Math.round(Number(daySlots[slotId]?.durationMinutes) || 10))),
        completedDates: daySlots[slotId]?.completedDates && typeof daySlots[slotId].completedDates === "object" ? daySlots[slotId].completedDates : {},
        createdAt: daySlots[slotId]?.createdAt || 0,
        updatedAt: daySlots[slotId]?.updatedAt || 0
      })).sort((a, b) => a.time.localeCompare(b.time));
    });
    return planner;
  }

  function normalizeReminders(value) {
    if (!value || typeof value !== "object") return [];
    return Object.keys(value).map((id) => {
      const reminder = value[id] || {};
      return {
        id,
        subject: allowedSubjects.has(reminder.subject) ? reminder.subject : "Other",
        topic: String(reminder.topic || "").slice(0, 100),
        revisionDate: parseDateKey(reminder.revisionDate) || todayKey(),
        priority: prioritySet.has(reminder.priority) ? reminder.priority : "Medium",
        status: reminder.status === "completed" ? "completed" : "pending",
        createdAt: reminder.createdAt || 0,
        completedAt: reminder.completedAt || null,
        updatedAt: reminder.updatedAt || 0
      };
    }).sort((a, b) => {
      if (a.status !== b.status) return a.status === "pending" ? -1 : 1;
      return a.revisionDate.localeCompare(b.revisionDate);
    });
  }

  function normalizeWrongQuestions(value) {
    if (!value || typeof value !== "object") return [];
    return Object.keys(value).map((id) => {
      const item = value[id] || {};
      return {
        id,
        subject: allowedSubjects.has(item.subject) ? item.subject : "Other",
        topic: String(item.topic || "").slice(0, 100),
        questionText: String(item.questionText || "").slice(0, 500),
        mistakeReason: mistakeReasons.has(item.mistakeReason) ? item.mistakeReason : "Other",
        reattemptDate: parseDateKey(item.reattemptDate),
        status: questionStatuses.has(item.status) ? item.status : "Pending",
        createdAt: item.createdAt || 0,
        updatedAt: item.updatedAt || 0
      };
    }).sort((a, b) => Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0));
  }

  function normalizeQuickNotes(value) {
    if (!value || typeof value !== "object") return [];
    return Object.keys(value).map((id) => {
      const note = value[id] || {};
      return {
        id,
        title: String(note.title || "").slice(0, 80),
        body: String(note.body || "").slice(0, 700),
        tag: allowedSubjects.has(note.tag) ? note.tag : "Other",
        createdAt: note.createdAt || 0,
        updatedAt: note.updatedAt || 0
      };
    }).sort((a, b) => Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0));
  }

  function normalizeNotificationPrefs(value) {
    const safe = value && typeof value === "object" ? value : {};
    return {
      enabled: Boolean(safe.enabled),
      morningReminder: Boolean(safe.morningReminder),
      morningTime: timeIsValid(safe.morningTime) ? safe.morningTime : "07:00",
      eveningReminder: Boolean(safe.eveningReminder),
      eveningTime: timeIsValid(safe.eveningTime) ? safe.eveningTime : "19:00",
      nightReport: Boolean(safe.nightReport),
      nightTime: timeIsValid(safe.nightTime) ? safe.nightTime : "21:30",
      timezone: safe.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
      updatedAt: safe.updatedAt || Date.now()
    };
  }

  function timeIsValid(value) {
    if (!/^\d{2}:\d{2}$/.test(value || "")) return false;
    const [hour, minute] = value.split(":").map(Number);
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  }

  function formatTimeLabel(value) {
    if (!/^\d{2}:\d{2}$/.test(value || "")) return "Time not set";
    const [hourText, minuteText] = value.split(":");
    let hour = Number(hourText);
    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minuteText} ${suffix}`;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function cleanRenderedText(root) {
    if (!root) return;
    root.querySelectorAll("strong, span, p, label").forEach((node) => {
      node.textContent = node.textContent.replace(/\u00c2\u00b7|\u00b7/g, " - ");
    });
  }

  function lockMyDeskViewport() {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    window.requestAnimationFrame(() => {
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
    });
  }

  function renderPlanner() {
    if (!nodes.weeklyPlannerList) return;
    const total = dayKeys.reduce((sum, dayKey) => sum + (state.weeklyPlanner?.[dayKey]?.length || 0), 0);
    if (!total) {
      nodes.weeklyPlannerList.innerHTML = `<div class="my-desk-empty">No study plan added yet.</div>`;
      renderMission();
      return;
    }
    nodes.weeklyPlannerList.innerHTML = dayKeys.map((dayKey) => {
      const slots = state.weeklyPlanner[dayKey] || [];
      return `
        <section class="my-desk-day-card">
          <h3>${dayLabels[dayKey]}</h3>
          ${slots.length ? slots.map((slot) => `
            <article class="my-desk-plan-item ${isPlannerSlotDoneToday(slot) ? "is-done" : ""}">
              <div>
                <strong>${formatTimeLabel(slot.time)} · ${escapeHtml(slot.subject)}</strong>
                <span>${escapeHtml(slot.topic || "Study session")} · ${formatDuration(slot.durationMinutes)}</span>
              </div>
              <div class="my-desk-row-actions">
                ${slot.dayKey === todayDayKey() ? `<button type="button" data-toggle-planner="${escapeHtml(slot.dayKey)}:${escapeHtml(slot.id)}">${isPlannerSlotDoneToday(slot) ? "Undo" : "Done Today"}</button>` : ""}
                <button type="button" data-delete-planner="${escapeHtml(slot.dayKey)}:${escapeHtml(slot.id)}">Delete</button>
              </div>
            </article>
          `).join("") : `<p>No study plan added yet.</p>`}
        </section>
      `;
    }).join("");
    cleanRenderedText(nodes.weeklyPlannerList);
    renderMission();
  }

  function renderReminders() {
    if (!nodes.revisionReminderList) return;
    const today = todayKey();
    if (!state.revisionReminders.length) {
      nodes.revisionReminderList.innerHTML = `<div class="my-desk-empty">No revision reminders yet.</div>`;
      renderMission();
      return;
    }
    nodes.revisionReminderList.innerHTML = state.revisionReminders.map((reminder) => {
      const overdue = reminder.status !== "completed" && reminder.revisionDate < today;
      return `
        <article class="my-desk-reminder-item ${overdue ? "is-overdue" : ""}">
          <div>
            <strong>${escapeHtml(reminder.subject)} · ${escapeHtml(reminder.topic || "Revision")}</strong>
            <span>${escapeHtml(reminder.revisionDate)} · ${escapeHtml(reminder.priority)} · ${overdue ? "Overdue" : escapeHtml(reminder.status)}</span>
          </div>
          <div class="my-desk-row-actions">
            ${reminder.status === "completed" ? "" : `<button type="button" data-complete-reminder="${escapeHtml(reminder.id)}">Done</button>`}
            ${reminder.status === "completed" ? "" : `<button type="button" data-reschedule-reminder="${escapeHtml(reminder.id)}:1">Tomorrow</button>`}
            ${reminder.status === "completed" ? "" : `<button type="button" data-reschedule-reminder="${escapeHtml(reminder.id)}:3">+3 Days</button>`}
            ${reminder.status === "completed" ? "" : `<button type="button" data-reschedule-reminder="${escapeHtml(reminder.id)}:7">+7 Days</button>`}
            <button type="button" data-delete-reminder="${escapeHtml(reminder.id)}">Delete</button>
          </div>
        </article>
      `;
    }).join("");
    cleanRenderedText(nodes.revisionReminderList);
    renderMission();
  }

  function renderStudyReport() {
    const summaries = Array.isArray(state.reportSummaries) ? state.reportSummaries : [];
    const total = summaries.reduce((sum, summary) => sum + normalizeSummary(summary).totalStudyMinutes, 0);
    const average = summaries.length ? Math.round(total / summaries.length) : 0;
    const best = summaries.reduce((bestDay, summary) => {
      const safe = normalizeSummary(summary);
      return safe.totalStudyMinutes > bestDay.totalStudyMinutes ? safe : bestDay;
    }, { date: "", totalStudyMinutes: 0 });
    const subjectTotals = emptySubjectMinutes();
    summaries.forEach((summary) => {
      const safe = normalizeSummary(summary);
      subjects.forEach((subject) => {
        subjectTotals[subject] += safe.subjectMinutes[subject] || 0;
      });
    });
    const topSubject = subjects.reduce((top, subject) => (
      subjectTotals[subject] > subjectTotals[top] ? subject : top
    ), subjects[0]);
    const topSubjectText = subjectTotals[topSubject] > 0 ? `${topSubject} - ${formatDuration(subjectTotals[topSubject])}` : "No data";

    if (nodes.reportTotalStudy) nodes.reportTotalStudy.textContent = formatDuration(total);
    if (nodes.reportBestDay) nodes.reportBestDay.textContent = best.totalStudyMinutes > 0 ? `${best.date} - ${formatDuration(best.totalStudyMinutes)}` : "No data";
    if (nodes.reportAverageStudy) nodes.reportAverageStudy.textContent = formatDuration(average);
    if (nodes.reportTopSubject) nodes.reportTopSubject.textContent = topSubjectText;
    if (!nodes.studyReportBars) return;

    if (!total) {
      nodes.studyReportBars.innerHTML = `<div class="my-desk-empty">No study data in the last 7 days yet.</div>`;
      return;
    }

    const maxMinutes = Math.max(...summaries.map((summary) => normalizeSummary(summary).totalStudyMinutes), 1);
    nodes.studyReportBars.innerHTML = summaries.map((summary) => {
      const safe = normalizeSummary(summary);
      const width = Math.min(100, Math.round((safe.totalStudyMinutes / maxMinutes) * 100));
      return `
        <div class="my-desk-report-row">
          <label><span>${escapeHtml(safe.date)}</span><strong>${formatDuration(safe.totalStudyMinutes)}</strong></label>
          <div class="my-desk-subject-track"><i style="width:${width}%"></i></div>
        </div>
      `;
    }).join("");
    cleanRenderedText(nodes.studyReportBars);
  }

  function renderWrongQuestions() {
    if (!nodes.wrongQuestionList) return;
    const list = filteredWrongQuestions();
    const today = todayKey();
    if (!state.wrongQuestions.length) {
      nodes.wrongQuestionList.innerHTML = `<div class="my-desk-empty">No wrong questions saved yet.</div>`;
      renderMission();
      return;
    }
    if (!list.length) {
      nodes.wrongQuestionList.innerHTML = `<div class="my-desk-empty">No wrong questions match these filters.</div>`;
      renderMission();
      return;
    }
    nodes.wrongQuestionList.innerHTML = list.slice(0, 20).map((item) => {
      const due = item.status !== "Mastered" && item.reattemptDate && item.reattemptDate <= today;
      return `
        <article class="my-desk-reminder-item my-desk-note-item ${due ? "is-overdue" : ""}">
          <div>
            <strong>${escapeHtml(item.subject)} - ${escapeHtml(item.topic || "Untitled topic")}</strong>
            <span>${escapeHtml(item.mistakeReason)} - ${escapeHtml(item.status)}${item.reattemptDate ? ` - Reattempt: ${escapeHtml(item.reattemptDate)}${due ? " - Due" : ""}` : ""}</span>
            <p>${escapeHtml(item.questionText)}</p>
          </div>
          <div class="my-desk-row-actions">
            <select aria-label="Update wrong question status" data-wrong-status="${escapeHtml(item.id)}">
              ${Array.from(questionStatuses).map((status) => `<option value="${escapeHtml(status)}"${status === item.status ? " selected" : ""}>${escapeHtml(status)}</option>`).join("")}
            </select>
            ${item.status !== "Mastered" ? `<button type="button" data-wrong-status-btn="${escapeHtml(item.id)}:Revised">Revised</button>` : ""}
            ${item.status !== "Mastered" ? `<button type="button" data-wrong-reattempt="${escapeHtml(item.id)}:1">Tomorrow</button>` : ""}
            ${item.status !== "Mastered" ? `<button type="button" data-wrong-status-btn="${escapeHtml(item.id)}:Mastered">Mastered</button>` : ""}
            <button type="button" data-delete-wrong="${escapeHtml(item.id)}">Delete</button>
          </div>
        </article>
      `;
    }).join("");
    cleanRenderedText(nodes.wrongQuestionList);
    renderMission();
  }

  function renderQuickNotes() {
    if (!nodes.quickNoteList) return;
    if (!state.quickNotes.length) {
      nodes.quickNoteList.innerHTML = `<div class="my-desk-empty">No quick notes saved yet.</div>`;
      return;
    }
    nodes.quickNoteList.innerHTML = state.quickNotes.slice(0, 20).map((note) => `
      <article class="my-desk-reminder-item my-desk-note-item">
        <div>
          <strong>${escapeHtml(note.title)}</strong>
          <span>${escapeHtml(note.tag)}</span>
          <p>${escapeHtml(note.body)}</p>
        </div>
        <div class="my-desk-row-actions">
          <button type="button" data-delete-note="${escapeHtml(note.id)}">Delete</button>
        </div>
      </article>
    `).join("");
    cleanRenderedText(nodes.quickNoteList);
  }

  function populateNotificationPrefs(prefs) {
    const safe = normalizeNotificationPrefs(prefs);
    if (nodes.notificationEnabled) nodes.notificationEnabled.checked = safe.enabled;
    if (nodes.morningReminder) nodes.morningReminder.checked = safe.morningReminder;
    if (nodes.morningTime) nodes.morningTime.value = safe.morningTime;
    if (nodes.eveningReminder) nodes.eveningReminder.checked = safe.eveningReminder;
    if (nodes.eveningTime) nodes.eveningTime.value = safe.eveningTime;
    if (nodes.nightReport) nodes.nightReport.checked = safe.nightReport;
    if (nodes.nightTime) nodes.nightTime.value = safe.nightTime;
  }

  function renderTodaySummary() {
    const summary = normalizeSummary(state.todaySummary);
    const target = Number(state.settings?.dailyStudyMinutesTarget) || 0;
    if (nodes.todayTotalStudy) nodes.todayTotalStudy.textContent = formatDuration(summary.totalStudyMinutes);
    if (nodes.todayStudyProgress) nodes.todayStudyProgress.textContent = `${formatDuration(summary.totalStudyMinutes)} / ${target > 0 ? formatDuration(target) : "Not set"}`;
    if (nodes.subjectProgressList) {
      const maxValue = Math.max(target, ...subjects.map((subject) => summary.subjectMinutes[subject] || 0), 1);
      nodes.subjectProgressList.innerHTML = subjects.map((subject) => {
        const minutes = summary.subjectMinutes[subject] || 0;
        const width = Math.min(100, Math.round((minutes / maxValue) * 100));
        return `
          <div class="my-desk-subject-row">
            <label><span>${subject}</span><strong>${formatDuration(minutes)}</strong></label>
            <div class="my-desk-subject-track"><i style="width:${width}%"></i></div>
          </div>
        `;
      }).join("");
      cleanRenderedText(nodes.subjectProgressList);
    }
    renderStreakAndFocus();
    renderMission();
  }

  function populateForm(settings) {
    const safe = settings || {};
    if (nodes.targetExam) nodes.targetExam.value = safe.targetExam || "";
    if (nodes.targetCategory) nodes.targetCategory.value = allowedCategories.has(safe.targetCategory) ? safe.targetCategory : "";
    if (nodes.dailyStudyHours) {
      const minutes = Number(safe.dailyStudyMinutesTarget);
      nodes.dailyStudyHours.value = Number.isFinite(minutes) && minutes > 0 ? String(minutes / 60) : "";
    }
    if (nodes.dailyQuizQuestions) {
      const count = Number(safe.dailyQuizQuestionsTarget);
      nodes.dailyQuizQuestions.value = Number.isFinite(count) && count >= 0 ? String(Math.round(count)) : "";
    }
    setSelectedWeakSubjects(safe.weakSubjects);
    if (nodes.targetExamDate) nodes.targetExamDate.value = parseDateKey(safe.targetExamDate) || "";
  }

  async function loadSettings() {
    if (!state.user || !state.db) return;
    setStatus("Loading target settings...", "info");
    try {
      const snapshot = await get(ref(state.db, settingsPath(state.user.uid)));
      state.settings = snapshot.exists() ? snapshot.val() : null;
      populateForm(state.settings);
      renderMission();
      setStatus(state.settings ? "Target settings loaded." : "No target set yet. Setup your first mission.", state.settings ? "success" : "info");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk settings load failed:", error.message);
      state.settings = null;
      populateForm(null);
      renderMission();
      setStatus("Target settings load nahi ho paayi. Please connection check karke retry karein.", "error");
    }
  }

  async function loadTodaySummary() {
    if (!state.user || !state.db) return;
    setStudyStatus("Loading today's study summary...", "info");
    try {
      const snapshot = await get(ref(state.db, todaySummaryPath(state.user.uid)));
      state.todaySummary = normalizeSummary(snapshot.exists() ? snapshot.val() : null);
      renderTodaySummary();
      setStudyStatus("Today's study summary ready.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk summary load failed:", error.message);
      state.todaySummary = normalizeSummary(null);
      renderTodaySummary();
      setStudyStatus("Study summary load nahi ho paayi. Please connection check karke retry karein.", "error");
    }
  }

  async function loadStreak() {
    if (!state.user || !state.db) return;
    try {
      const snapshot = await get(ref(state.db, streakPath(state.user.uid)));
      state.streak = normalizeStreak(snapshot.exists() ? snapshot.val() : null);
      renderStreakAndFocus();
      await syncCompletionAndFocus({ writeIfNeeded: true });
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk streak load failed:", error.message);
      state.streak = normalizeStreak(null);
      renderStreakAndFocus();
      setStudyStatus("Streak load nahi ho paayi. Study summary phir bhi available hai.", "error");
    }
  }

  async function loadPlanner() {
    if (!state.user || !state.db) return;
    setPlannerStatus("Loading weekly planner...", "info");
    try {
      const snapshot = await get(ref(state.db, weeklyPlannerPath(state.user.uid)));
      state.weeklyPlanner = normalizePlanner(snapshot.exists() ? snapshot.val() : null);
      renderPlanner();
      setPlannerStatus("Weekly planner ready.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk planner load failed:", error.message);
      state.weeklyPlanner = normalizePlanner(null);
      renderPlanner();
      setPlannerStatus("Weekly planner load nahi ho paaya. Please connection check karke retry karein.", "error");
    }
  }

  async function loadReminders() {
    if (!state.user || !state.db) return;
    setRevisionStatus("Loading revision reminders...", "info");
    try {
      const snapshot = await get(ref(state.db, revisionRemindersPath(state.user.uid)));
      state.revisionReminders = normalizeReminders(snapshot.exists() ? snapshot.val() : null);
      renderReminders();
      setRevisionStatus("Revision reminders ready.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk reminders load failed:", error.message);
      state.revisionReminders = [];
      renderReminders();
      setRevisionStatus("Revision reminders load nahi ho paaye. Please connection check karke retry karein.", "error");
    }
  }

  async function loadStudyReport() {
    if (!state.user || !state.db) return;
    setReportStatus("Loading 7-day report...", "info");
    try {
      const keys = lastSevenDateKeys();
      const snapshots = await Promise.all(keys.map((key) => get(ref(state.db, dailySummaryPath(state.user.uid, key)))));
      state.reportSummaries = snapshots.map((snapshot, index) => {
        const summary = normalizeSummary(snapshot.exists() ? snapshot.val() : null);
        summary.date = keys[index];
        return summary;
      });
      renderStudyReport();
      const total = state.reportSummaries.reduce((sum, summary) => sum + normalizeSummary(summary).totalStudyMinutes, 0);
      setReportStatus(total ? "7-day study report ready." : "No study data in the last 7 days yet.", total ? "success" : "info");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk report load failed:", error.message);
      state.reportSummaries = [];
      renderStudyReport();
      setReportStatus("7-day report load nahi ho paaya. Please connection check karke retry karein.", "error");
    }
  }

  async function loadWrongQuestions() {
    if (!state.user || !state.db) return;
    setWrongQuestionStatus("Loading wrong questions...", "info");
    try {
      const snapshot = await get(ref(state.db, wrongQuestionsPath(state.user.uid)));
      state.wrongQuestions = normalizeWrongQuestions(snapshot.exists() ? snapshot.val() : null);
      renderWrongQuestions();
      setWrongQuestionStatus(state.wrongQuestions.length ? "Wrong questions ready." : "No wrong questions saved yet.", state.wrongQuestions.length ? "success" : "info");
    } catch (error) {
      console.warn("[GovJobUpdates] Wrong questions load failed:", error.message);
      state.wrongQuestions = [];
      renderWrongQuestions();
      setWrongQuestionStatus("Wrong questions load nahi ho paaye. Please connection check karke retry karein.", "error");
    }
  }

  async function loadQuickNotes() {
    if (!state.user || !state.db) return;
    setQuickNoteStatus("Loading quick notes...", "info");
    try {
      const snapshot = await get(ref(state.db, quickNotesPath(state.user.uid)));
      state.quickNotes = normalizeQuickNotes(snapshot.exists() ? snapshot.val() : null);
      renderQuickNotes();
      setQuickNoteStatus(state.quickNotes.length ? "Quick notes ready." : "No quick notes saved yet.", state.quickNotes.length ? "success" : "info");
    } catch (error) {
      console.warn("[GovJobUpdates] Quick notes load failed:", error.message);
      state.quickNotes = [];
      renderQuickNotes();
      setQuickNoteStatus("Quick notes load nahi ho paaye. Please connection check karke retry karein.", "error");
    }
  }

  async function loadNotificationPrefs() {
    if (!state.user || !state.db) return;
    setNotificationPrefsStatus("Loading reminder preferences...", "info");
    try {
      const snapshot = await get(ref(state.db, notificationPrefsPath(state.user.uid)));
      state.notificationPrefs = normalizeNotificationPrefs(snapshot.exists() ? snapshot.val() : null);
      populateNotificationPrefs(state.notificationPrefs);
      setNotificationPrefsStatus(snapshot.exists() ? "Reminder preferences loaded." : "Reminder preferences not set yet.", snapshot.exists() ? "success" : "info");
    } catch (error) {
      console.warn("[GovJobUpdates] Notification preferences load failed:", error.message);
      state.notificationPrefs = normalizeNotificationPrefs(null);
      populateNotificationPrefs(state.notificationPrefs);
      setNotificationPrefsStatus("Reminder preferences load nahi ho paayi. Please connection check karke retry karein.", "error");
    }
  }

  async function loadQuizProgress() {
    const localAttempts = readLocalQuizAttempts();
    let firebaseAttempts = [];
    if (state.user && state.db) {
      try {
        const snapshot = await get(ref(state.db, quizAttemptsPath(state.user.uid)));
        if (snapshot.exists()) {
          const value = snapshot.val() || {};
          firebaseAttempts = Object.keys(value).map((quizId) => {
            const item = value[quizId] || {};
            return normalizeQuizAttempt({
              quizId,
              quizTitle: item.quizTitle,
              subject: item.subject,
              totalQuestions: item.totalQuestions || (Number(item.correct) + Number(item.wrong)),
              attempted: Number(item.correct) + Number(item.wrong),
              correct: item.correct,
              wrong: item.wrong,
              percentage: item.totalQuestions ? (Number(item.correct) / Math.max(Number(item.totalQuestions), 1)) * 100 : 0
            });
          }).filter(Boolean);
        }
      } catch (error) {
        console.warn("[GovJobUpdates] My Desk quiz progress load skipped:", error.message);
      }
    }
    state.quizStats = buildQuizStats(localAttempts, firebaseAttempts);
    renderMission();
    renderStreakAndFocus();
  }

  function buildMyDeskExport() {
    return {
      exportedAt: new Date().toISOString(),
      app: "GovJobUpdates My Desk",
      user: {
        uid: state.user?.uid || "",
        email: state.user?.email || "",
        displayName: userDisplayName(state.user)
      },
      settings: state.settings || null,
      todaySummary: normalizeSummary(state.todaySummary),
      streak: normalizeStreak(state.streak),
      weeklyPlanner: state.weeklyPlanner || {},
      revisionReminders: state.revisionReminders || [],
      wrongQuestions: state.wrongQuestions || [],
      quickNotes: state.quickNotes || [],
      notificationPrefs: normalizeNotificationPrefs(state.notificationPrefs),
      quizStats: state.quizStats || emptyQuizStats(),
      reportSummaries: state.reportSummaries || [],
      localDrafts: {
        offlineQueue: readOfflineQueue(),
        activeTimer: (() => {
          try {
            const raw = localStorage.getItem(timerDraftKey());
            return raw ? JSON.parse(raw) : null;
          } catch {
            return null;
          }
        })()
      }
    };
  }

  function exportMyDeskData() {
    if (!state.user) {
      setDataControlsStatus("Login ke baad hi My Desk data export ho sakta hai.", "error");
      return;
    }
    try {
      const payload = JSON.stringify(buildMyDeskExport(), null, 2);
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `govjobupdates-my-desk-${todayKey()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDataControlsStatus("My Desk data export ready.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk export failed:", error.message);
      setDataControlsStatus("Export create nahi ho paaya. Please dobara try karein.", "error");
    }
  }

  function resetLocalMyDeskDrafts() {
    clearTimerDraft();
    writeOfflineQueue([]);
  }

  async function resetMyDeskData() {
    if (!state.user || !state.db) return;
    const firstConfirm = window.confirm("Reset My Desk data? This will delete targets, study logs, planner, reminders, wrong questions and notes for this account.");
    if (!firstConfirm) return;
    const typed = window.prompt("Type RESET to confirm My Desk reset.");
    if (typed !== "RESET") {
      setDataControlsStatus("Reset cancelled.", "info");
      return;
    }
    setDataControlsStatus("Resetting My Desk data...", "info");
    try {
      await remove(ref(state.db, myDeskRootPath(state.user.uid)));
      resetLocalMyDeskDrafts();
      state.settings = null;
      state.todaySummary = normalizeSummary(null);
      state.streak = normalizeStreak(null);
      state.weeklyPlanner = normalizePlanner(null);
      state.revisionReminders = [];
      state.wrongQuestions = [];
      state.quickNotes = [];
      state.notificationPrefs = normalizeNotificationPrefs(null);
      state.reportSummaries = [];
      resetTimer();
      populateForm(null);
      populateNotificationPrefs(state.notificationPrefs);
      renderMission();
      renderTodaySummary();
      renderPlanner();
      renderReminders();
      renderStudyReport();
      renderWrongQuestions();
      renderQuickNotes();
      renderStreakAndFocus();
      setStatus("No target set yet. Setup your first mission.", "info");
      setStudyStatus("My Desk study data reset.", "success");
      setDataControlsStatus("My Desk data reset complete.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk reset failed:", error.message);
      setDataControlsStatus("My Desk reset nahi ho paaya. Please internet/login check karein.", "error");
    }
  }

  async function executeQueuedAction(action) {
    const payload = action?.payload || {};
    if (!state.user || !state.db || !action?.type) throw new Error("Queue not ready.");

    if (action.type === "plannerAdd") {
      const slotRef = push(ref(state.db, plannerDayPath(state.user.uid, payload.dayKey)));
      await set(slotRef, {
        id: slotRef.key,
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return;
    }

    if (action.type === "revisionAdd") {
      const reminderRef = push(ref(state.db, revisionRemindersPath(state.user.uid)));
      await set(reminderRef, {
        id: reminderRef.key,
        ...payload,
        status: "pending",
        createdAt: serverTimestamp(),
        completedAt: null,
        updatedAt: serverTimestamp()
      });
      return;
    }

    if (action.type === "wrongQuestionAdd") {
      const questionRef = push(ref(state.db, wrongQuestionsPath(state.user.uid)));
      await set(questionRef, {
        id: questionRef.key,
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return;
    }

    if (action.type === "quickNoteAdd") {
      const noteRef = push(ref(state.db, quickNotesPath(state.user.uid)));
      await set(noteRef, {
        id: noteRef.key,
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return;
    }

    if (action.type === "studySessionAdd") {
      const saved = await saveStudySession(payload, { fromOfflineQueue: true });
      if (!saved) throw new Error("Queued study session save failed.");
    }
  }

  async function flushOfflineQueue() {
    if (!state.user || !state.db || state.offlineSyncing || isOffline()) return;
    const queue = readOfflineQueue();
    if (!queue.length) return;
    state.offlineSyncing = true;
    let remaining = queue.slice();
    try {
      while (remaining.length) {
        const action = remaining[0];
        await executeQueuedAction(action);
        remaining = remaining.slice(1);
        writeOfflineQueue(remaining);
      }
      await Promise.allSettled([
        loadPlanner(),
        loadReminders(),
        loadWrongQuestions(),
        loadQuickNotes(),
        loadTodaySummary(),
        loadStudyReport()
      ]);
      setStudyStatus("Offline My Desk entries synced.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk offline queue sync failed:", error.message);
      writeOfflineQueue(remaining);
      setStudyStatus("Offline entries abhi sync nahi ho paayi. Internet stable hone par dobara try hoga.", "error");
    } finally {
      state.offlineSyncing = false;
    }
  }

  function collectPlannerSlot() {
    const dayKey = nodes.plannerDay?.value || "";
    const time = nodes.plannerTime?.value || "";
    const subject = nodes.plannerSubject?.value || "";
    const topic = (nodes.plannerTopic?.value || "").trim();
    const durationMinutes = Number(nodes.plannerDuration?.value);
    if (!dayKeys.includes(dayKey)) throw new Error("Please select a valid day.");
    if (!/^\d{2}:\d{2}$/.test(time)) throw new Error("Please select a valid time.");
    const [hour, minute] = time.split(":").map(Number);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) throw new Error("Please select a valid time.");
    if (!allowedSubjects.has(subject)) throw new Error("Please select a subject.");
    if (topic.length > 100) throw new Error("Topic 100 characters se zyada nahi hona chahiye.");
    if (!Number.isFinite(durationMinutes) || durationMinutes < 10 || durationMinutes > 720) throw new Error("Duration 10 se 720 minutes ke beech rakhein.");
    return { dayKey, time, subject, topic, durationMinutes: Math.round(durationMinutes) };
  }

  async function savePlannerSlot(event) {
    event.preventDefault();
    if (!state.user || !state.db || state.plannerSaving) return;
    let data;
    try {
      data = collectPlannerSlot();
    } catch (error) {
      setPlannerStatus(error.message, "error");
      return;
    }
    if (isOffline()) {
      if (enqueueOfflineAction("plannerAdd", data, setPlannerStatus, "Planner slot offline saved.")) {
        if (nodes.plannerTopic) nodes.plannerTopic.value = "";
        if (nodes.plannerDuration) nodes.plannerDuration.value = "";
      }
      return;
    }
    setPlannerSaving(true);
    setPlannerStatus("Saving planner slot...", "info");
    try {
      const slotRef = push(ref(state.db, plannerDayPath(state.user.uid, data.dayKey)));
      await set(slotRef, {
        id: slotRef.key,
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      if (nodes.plannerTopic) nodes.plannerTopic.value = "";
      if (nodes.plannerDuration) nodes.plannerDuration.value = "";
      await loadPlanner();
      setPlannerStatus("Planner slot saved.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Planner slot save failed:", error.message);
      setPlannerStatus("Planner slot save nahi ho paaya. Please dobara try karein.", "error");
    } finally {
      setPlannerSaving(false);
    }
  }

  async function deletePlannerSlot(dayKey, slotId) {
    if (!state.user || !state.db || !dayKeys.includes(dayKey) || !slotId) return;
    if (!window.confirm("Delete this planner slot?")) return;
    setPlannerStatus("Deleting planner slot...", "info");
    try {
      await remove(ref(state.db, `${plannerDayPath(state.user.uid, dayKey)}/${slotId}`));
      await loadPlanner();
      setPlannerStatus("Planner slot deleted.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Planner slot delete failed:", error.message);
      setPlannerStatus("Planner slot delete nahi ho paaya.", "error");
    }
  }

  async function togglePlannerSlotToday(dayKey, slotId) {
    if (!state.user || !state.db || !dayKeys.includes(dayKey) || !slotId) return;
    const slot = (state.weeklyPlanner?.[dayKey] || []).find((item) => item.id === slotId);
    const isDone = isPlannerSlotDoneToday(slot);
    setPlannerStatus(isDone ? "Marking slot pending..." : "Marking slot done...", "info");
    try {
      await update(ref(state.db, `${plannerDayPath(state.user.uid, dayKey)}/${slotId}`), {
        [`completedDates/${todayKey()}`]: isDone ? null : true,
        updatedAt: serverTimestamp()
      });
      await loadPlanner();
      setPlannerStatus(isDone ? "Planner slot marked pending for today." : "Planner slot marked done for today.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Planner slot status update failed:", error.message);
      setPlannerStatus("Planner slot status update nahi ho paaya.", "error");
    }
  }

  function collectReminder() {
    const subject = nodes.revisionSubject?.value || "";
    const topic = (nodes.revisionTopic?.value || "").trim();
    const revisionDate = parseDateKey(nodes.revisionDate?.value || "");
    const priority = nodes.revisionPriority?.value || "Medium";
    if (!allowedSubjects.has(subject)) throw new Error("Please select a subject.");
    if (!topic) throw new Error("Please enter a revision topic.");
    if (topic.length > 100) throw new Error("Topic 100 characters se zyada nahi hona chahiye.");
    if (!(nodes.revisionDate?.value || "").trim() || !revisionDate) throw new Error("Please select a valid revision date. Calendar se date choose karein.");
    if (!prioritySet.has(priority)) throw new Error("Please select a valid priority.");
    return { subject, topic, revisionDate, priority };
  }

  async function saveReminder(event) {
    event.preventDefault();
    if (!state.user || !state.db || state.reminderSaving) return;
    let data;
    try {
      data = collectReminder();
    } catch (error) {
      setRevisionStatus(error.message, "error");
      return;
    }
    if (isOffline()) {
      if (enqueueOfflineAction("revisionAdd", data, setRevisionStatus, "Revision reminder offline saved.")) {
        if (nodes.revisionTopic) nodes.revisionTopic.value = "";
        if (nodes.revisionDate) nodes.revisionDate.value = "";
      }
      return;
    }
    setReminderSaving(true);
    setRevisionStatus("Saving revision reminder...", "info");
    try {
      const reminderRef = push(ref(state.db, revisionRemindersPath(state.user.uid)));
      await set(reminderRef, {
        id: reminderRef.key,
        ...data,
        status: "pending",
        createdAt: serverTimestamp(),
        completedAt: null,
        updatedAt: serverTimestamp()
      });
      if (nodes.revisionTopic) nodes.revisionTopic.value = "";
      if (nodes.revisionDate) nodes.revisionDate.value = "";
      await loadReminders();
      setRevisionStatus("Revision reminder saved.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Revision reminder save failed:", error.message);
      setRevisionStatus("Revision reminder save nahi ho paaya. Please dobara try karein.", "error");
    } finally {
      setReminderSaving(false);
    }
  }

  async function completeReminder(reminderId) {
    if (!state.user || !state.db || !reminderId) return;
    setRevisionStatus("Marking reminder completed...", "info");
    try {
      await update(ref(state.db, `${revisionRemindersPath(state.user.uid)}/${reminderId}`), {
        status: "completed",
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      await loadReminders();
      setRevisionStatus("Revision reminder completed.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Revision reminder complete failed:", error.message);
      setRevisionStatus("Reminder complete nahi ho paaya.", "error");
    }
  }

  async function rescheduleReminder(reminderId, days) {
    const offset = Number(days);
    if (!state.user || !state.db || !reminderId || !Number.isFinite(offset)) return;
    setRevisionStatus("Rescheduling revision reminder...", "info");
    try {
      await update(ref(state.db, `${revisionRemindersPath(state.user.uid)}/${reminderId}`), {
        revisionDate: addDays(todayKey(), offset),
        status: "pending",
        completedAt: null,
        updatedAt: serverTimestamp()
      });
      await loadReminders();
      setRevisionStatus("Revision reminder rescheduled.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Revision reminder reschedule failed:", error.message);
      setRevisionStatus("Reminder reschedule nahi ho paaya.", "error");
    }
  }

  async function deleteReminder(reminderId) {
    if (!state.user || !state.db || !reminderId) return;
    if (!window.confirm("Delete this revision reminder?")) return;
    setRevisionStatus("Deleting revision reminder...", "info");
    try {
      await remove(ref(state.db, `${revisionRemindersPath(state.user.uid)}/${reminderId}`));
      await loadReminders();
      setRevisionStatus("Revision reminder deleted.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Revision reminder delete failed:", error.message);
      setRevisionStatus("Reminder delete nahi ho paaya.", "error");
    }
  }

  function collectWrongQuestion() {
    const subject = nodes.wrongQuestionSubject?.value || "";
    const topic = (nodes.wrongQuestionTopic?.value || "").trim();
    const questionText = (nodes.wrongQuestionText?.value || "").trim();
    const mistakeReason = nodes.wrongQuestionReason?.value || "";
    const reattemptDate = parseDateKey(nodes.wrongQuestionReattemptDate?.value || "");
    const status = nodes.wrongQuestionStatusSelect?.value || "Pending";
    if (!allowedSubjects.has(subject)) throw new Error("Please select a subject.");
    if (!topic) throw new Error("Please enter topic.");
    if (topic.length > 100) throw new Error("Topic 100 characters se zyada nahi hona chahiye.");
    if (!questionText) throw new Error("Please enter question/problem.");
    if (questionText.length > 500) throw new Error("Question/problem 500 characters se zyada nahi hona chahiye.");
    if (!mistakeReasons.has(mistakeReason)) throw new Error("Please select a valid mistake reason.");
    if ((nodes.wrongQuestionReattemptDate?.value || "").trim() && !reattemptDate) throw new Error("Please select a valid reattempt date. Calendar se date choose karein.");
    if (!questionStatuses.has(status)) throw new Error("Please select a valid status.");
    return { subject, topic, questionText, mistakeReason, reattemptDate, status };
  }

  async function saveWrongQuestion(event) {
    event.preventDefault();
    if (!state.user || !state.db || state.wrongQuestionSaving) return;
    let data;
    try {
      data = collectWrongQuestion();
    } catch (error) {
      setWrongQuestionStatus(error.message, "error");
      return;
    }
    if (isOffline()) {
      if (enqueueOfflineAction("wrongQuestionAdd", data, setWrongQuestionStatus, "Wrong question offline saved.")) {
        nodes.wrongQuestionForm?.reset();
      }
      return;
    }
    setWrongQuestionSaving(true);
    setWrongQuestionStatus("Saving wrong question...", "info");
    try {
      const questionRef = push(ref(state.db, wrongQuestionsPath(state.user.uid)));
      await set(questionRef, {
        id: questionRef.key,
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      nodes.wrongQuestionForm?.reset();
      await loadWrongQuestions();
      setWrongQuestionStatus("Wrong question saved.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Wrong question save failed:", error.message);
      setWrongQuestionStatus("Wrong question save nahi ho paaya. Please dobara try karein.", "error");
    } finally {
      setWrongQuestionSaving(false);
    }
  }

  async function updateWrongQuestionStatus(questionId, status) {
    if (!state.user || !state.db || !questionId || !questionStatuses.has(status)) return;
    setWrongQuestionStatus("Updating wrong question status...", "info");
    try {
      await update(ref(state.db, `${wrongQuestionsPath(state.user.uid)}/${questionId}`), {
        status,
        updatedAt: serverTimestamp()
      });
      await loadWrongQuestions();
      setWrongQuestionStatus("Wrong question status updated.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Wrong question status update failed:", error.message);
      setWrongQuestionStatus("Status update nahi ho paaya. Please dobara try karein.", "error");
    }
  }

  async function updateWrongQuestionReattempt(questionId, days) {
    const offset = Number(days);
    if (!state.user || !state.db || !questionId || !Number.isFinite(offset)) return;
    setWrongQuestionStatus("Updating reattempt date...", "info");
    try {
      await update(ref(state.db, `${wrongQuestionsPath(state.user.uid)}/${questionId}`), {
        reattemptDate: addDays(todayKey(), offset),
        updatedAt: serverTimestamp()
      });
      await loadWrongQuestions();
      setWrongQuestionStatus("Wrong question reattempt date updated.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Wrong question reattempt update failed:", error.message);
      setWrongQuestionStatus("Reattempt date update nahi ho paayi.", "error");
    }
  }

  async function deleteWrongQuestion(questionId) {
    if (!state.user || !state.db || !questionId) return;
    if (!window.confirm("Delete this wrong question?")) return;
    setWrongQuestionStatus("Deleting wrong question...", "info");
    try {
      await remove(ref(state.db, `${wrongQuestionsPath(state.user.uid)}/${questionId}`));
      await loadWrongQuestions();
      setWrongQuestionStatus("Wrong question deleted.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Wrong question delete failed:", error.message);
      setWrongQuestionStatus("Wrong question delete nahi ho paaya.", "error");
    }
  }

  function collectQuickNote() {
    const title = (nodes.quickNoteTitle?.value || "").trim();
    const body = (nodes.quickNoteBody?.value || "").trim();
    const tag = nodes.quickNoteTag?.value || "";
    if (!title) throw new Error("Please enter note title.");
    if (title.length > 80) throw new Error("Title 80 characters se zyada nahi hona chahiye.");
    if (!body) throw new Error("Please enter note.");
    if (body.length > 700) throw new Error("Note 700 characters se zyada nahi hona chahiye.");
    if (!allowedSubjects.has(tag)) throw new Error("Please select a valid tag/subject.");
    return { title, body, tag };
  }

  async function saveQuickNote(event) {
    event.preventDefault();
    if (!state.user || !state.db || state.quickNoteSaving) return;
    let data;
    try {
      data = collectQuickNote();
    } catch (error) {
      setQuickNoteStatus(error.message, "error");
      return;
    }
    if (isOffline()) {
      if (enqueueOfflineAction("quickNoteAdd", data, setQuickNoteStatus, "Quick note offline saved.")) {
        nodes.quickNoteForm?.reset();
      }
      return;
    }
    setQuickNoteSaving(true);
    setQuickNoteStatus("Saving quick note...", "info");
    try {
      const noteRef = push(ref(state.db, quickNotesPath(state.user.uid)));
      await set(noteRef, {
        id: noteRef.key,
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      nodes.quickNoteForm?.reset();
      await loadQuickNotes();
      setQuickNoteStatus("Quick note saved.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Quick note save failed:", error.message);
      setQuickNoteStatus("Quick note save nahi ho paaya. Please dobara try karein.", "error");
    } finally {
      setQuickNoteSaving(false);
    }
  }

  async function deleteQuickNote(noteId) {
    if (!state.user || !state.db || !noteId) return;
    if (!window.confirm("Delete this quick note?")) return;
    setQuickNoteStatus("Deleting quick note...", "info");
    try {
      await remove(ref(state.db, `${quickNotesPath(state.user.uid)}/${noteId}`));
      await loadQuickNotes();
      setQuickNoteStatus("Quick note deleted.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Quick note delete failed:", error.message);
      setQuickNoteStatus("Quick note delete nahi ho paaya.", "error");
    }
  }

  function collectNotificationPrefs() {
    const morningTime = nodes.morningTime?.value || "";
    const eveningTime = nodes.eveningTime?.value || "";
    const nightTime = nodes.nightTime?.value || "";
    if (!timeIsValid(morningTime)) throw new Error("Please select valid morning time.");
    if (!timeIsValid(eveningTime)) throw new Error("Please select valid evening time.");
    if (!timeIsValid(nightTime)) throw new Error("Please select valid night report time.");
    return {
      enabled: Boolean(nodes.notificationEnabled?.checked),
      morningReminder: Boolean(nodes.morningReminder?.checked),
      morningTime,
      eveningReminder: Boolean(nodes.eveningReminder?.checked),
      eveningTime,
      nightReport: Boolean(nodes.nightReport?.checked),
      nightTime,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
      updatedAt: serverTimestamp()
    };
  }

  async function saveNotificationPrefs(event) {
    event.preventDefault();
    if (!state.user || !state.db || state.notificationPrefsSaving) return;
    let prefs;
    try {
      prefs = collectNotificationPrefs();
    } catch (error) {
      setNotificationPrefsStatus(error.message, "error");
      return;
    }
    setNotificationPrefsSaving(true);
    setNotificationPrefsStatus("Saving reminder preferences...", "info");
    try {
      await set(ref(state.db, notificationPrefsPath(state.user.uid)), prefs);
      state.notificationPrefs = normalizeNotificationPrefs({ ...prefs, updatedAt: Date.now() });
      populateNotificationPrefs(state.notificationPrefs);
      syncNativeReminderPrefs(state.notificationPrefs);
      setNotificationPrefsStatus("Reminder preferences saved. Android local reminders are scheduled in the app.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] Notification preferences save failed:", error.message);
      setNotificationPrefsStatus("Reminder preferences save nahi ho paayi. Please dobara try karein.", "error");
    } finally {
      setNotificationPrefsSaving(false);
    }
  }

  function syncNativeReminderPrefs(prefs) {
    const bridge = window.GovJobUpdatesAndroid;
    if (!bridge) return;
    try {
      const safe = normalizeNotificationPrefs(prefs);
      if (safe.enabled && typeof bridge.scheduleMyDeskReminders === "function") {
        bridge.scheduleMyDeskReminders(JSON.stringify(safe));
      } else if (!safe.enabled && typeof bridge.cancelMyDeskReminders === "function") {
        bridge.cancelMyDeskReminders();
      }
    } catch (error) {
      console.warn("[GovJobUpdates] Native reminder sync failed:", error.message);
    }
  }

  function applyCompletionAndFocus(summary = state.todaySummary, streak = state.streak) {
    const target = Number(state.settings?.dailyStudyMinutesTarget) || 0;
    const safeSummary = normalizeSummary(summary);
    safeSummary.studyTargetMet = Boolean(target > 0 && safeSummary.totalStudyMinutes >= target);
    safeSummary.dayCompleted = safeSummary.studyTargetMet;
    safeSummary.focusScore = calculateFocusScore(safeSummary, streak).total;
    return safeSummary;
  }

  function nextCompletedStreak(current = state.streak) {
    const today = todayKey();
    const yesterday = yesterdayKey();
    const safe = normalizeStreak(current);
    let currentStreak = safe.currentStreak;
    if (safe.lastCompletedDate === today) {
      currentStreak = Math.max(1, currentStreak);
    } else if (safe.lastCompletedDate === yesterday) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
    return {
      currentStreak,
      bestStreak: Math.max(safe.bestStreak, currentStreak),
      lastCompletedDate: today,
      lastCheckedDate: today,
      lastMissedDate: null,
      updatedAt: serverTimestamp()
    };
  }

  async function syncCompletionAndFocus({ writeIfNeeded = false, allowSummaryOnlyWrite = false } = {}) {
    if (!state.user || !state.db) return;
    let summary = applyCompletionAndFocus(state.todaySummary, state.streak);
    let streak = normalizeStreak(state.streak);
    let shouldWriteStreak = false;

    if (summary.dayCompleted && streak.lastCompletedDate !== todayKey()) {
      streak = nextCompletedStreak(streak);
      shouldWriteStreak = true;
    }

    summary = applyCompletionAndFocus(summary, streak);
    const summaryChanged = summary.dayCompleted !== normalizeSummary(state.todaySummary).dayCompleted
      || summary.focusScore !== normalizeSummary(state.todaySummary).focusScore
      || summary.studyTargetMet !== normalizeSummary(state.todaySummary).studyTargetMet;

    state.todaySummary = summary;
    state.streak = streak;
    renderTodaySummary();
    renderStreakAndFocus();

    if (!writeIfNeeded || (!shouldWriteStreak && (!allowSummaryOnlyWrite || !summaryChanged))) return;

    const writes = [];
    if (shouldWriteStreak || (allowSummaryOnlyWrite && summaryChanged)) {
      writes.push(set(ref(state.db, todaySummaryPath(state.user.uid)), { ...summary, updatedAt: serverTimestamp() }));
    }
    if (shouldWriteStreak) writes.push(set(ref(state.db, streakPath(state.user.uid)), streak));
    await Promise.all(writes);
  }

  async function saveSettings(event) {
    event.preventDefault();
    if (!state.user || !state.db || state.saving) return;
    let settings;
    try {
      settings = collectSettings();
    } catch (error) {
      setStatus(error.message, "error");
      return;
    }

    setSaving(true);
    setStatus("Saving target settings...", "info");
    try {
      await set(ref(state.db, settingsPath(state.user.uid)), settings);
      state.settings = { ...settings, updatedAt: Date.now() };
      state.todaySummary = normalizeSummary(state.todaySummary);
      await syncCompletionAndFocus({ writeIfNeeded: true, allowSummaryOnlyWrite: true });
      setStatus("Target saved successfully.", "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk settings save failed:", error.message);
      setStatus("Target save nahi ho paaya. Please internet/login check karke dobara try karein.", "error");
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    populateForm(state.settings);
    renderMission();
    setStatus(state.settings ? "Unsaved changes reset." : "No saved target yet.", "info");
  }

  function elapsedTimerMs() {
    const timer = state.timer;
    return timer.elapsedMs + (timer.running && timer.lastRunStartedAt ? Date.now() - timer.lastRunStartedAt : 0);
  }

  function timerDraftKey() {
    return `${timerDraftPrefix}${state.user?.uid || "anonymous"}`;
  }

  function clearTimerDraft() {
    try {
      localStorage.removeItem(timerDraftKey());
    } catch {
      // Storage can be blocked in some WebView/privacy modes.
    }
  }

  function persistTimerDraft(force = false) {
    if (!state.timer.active) {
      clearTimerDraft();
      return;
    }
    const now = Date.now();
    if (!force && state.timer.lastPersistedAt && now - state.timer.lastPersistedAt < 15000) return;
    state.timer.lastPersistedAt = now;
    try {
      localStorage.setItem(timerDraftKey(), JSON.stringify({
        subject: state.timer.subject,
        startedAt: state.timer.startedAt,
        elapsedMs: elapsedTimerMs(),
        running: state.timer.running,
        savedAt: now,
        date: todayKey()
      }));
    } catch {
      // Best-effort draft only; timer still works without localStorage.
    }
  }

  function restoreTimerDraft() {
    if (!state.user || state.timer.active) return false;
    let draft;
    try {
      const raw = localStorage.getItem(timerDraftKey());
      draft = raw ? JSON.parse(raw) : null;
    } catch {
      return false;
    }
    if (!draft || typeof draft !== "object") return false;
    const subject = String(draft.subject || "");
    const elapsedMs = Math.max(0, Math.round(Number(draft.elapsedMs) || 0));
    const startedAt = Number(draft.startedAt) || Date.now();
    const savedAt = Number(draft.savedAt) || 0;
    const isFresh = draft.date === todayKey() && savedAt && Date.now() - savedAt < 12 * 60 * 60 * 1000;
    if (!allowedSubjects.has(subject) || elapsedMs < 1000 || !isFresh) {
      clearTimerDraft();
      return false;
    }
    state.timer = {
      subject,
      startedAt,
      lastRunStartedAt: null,
      elapsedMs,
      running: false,
      active: true,
      intervalId: null,
      lastPersistedAt: Date.now()
    };
    if (nodes.timerSubject) nodes.timerSubject.value = subject;
    renderTimer();
    updateTimerButtons();
    setStudyStatus("Previous study timer restored in paused state. Continue, Finish & Save, or Cancel.", "info");
    return true;
  }

  function formatClock(ms) {
    const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function renderTimer() {
    if (nodes.studyTimerDisplay) nodes.studyTimerDisplay.textContent = formatClock(elapsedTimerMs());
    persistTimerDraft(false);
  }

  function clearTimerInterval() {
    if (state.timer.intervalId) {
      window.clearInterval(state.timer.intervalId);
      state.timer.intervalId = null;
    }
  }

  function updateTimerButtons() {
    const timer = state.timer;
    const busy = state.studySaving;
    if (nodes.startTimerBtn) nodes.startTimerBtn.disabled = busy || timer.active;
    if (nodes.pauseTimerBtn) nodes.pauseTimerBtn.disabled = busy || !timer.active || !timer.running;
    if (nodes.resumeTimerBtn) nodes.resumeTimerBtn.disabled = busy || !timer.active || timer.running;
    if (nodes.finishTimerBtn) nodes.finishTimerBtn.disabled = busy || !timer.active;
    if (nodes.cancelTimerBtn) nodes.cancelTimerBtn.disabled = busy || !timer.active;
    if (nodes.timerSubject) nodes.timerSubject.disabled = busy || timer.active;
  }

  function resetTimer({ clearDraft = true } = {}) {
    clearTimerInterval();
    state.timer = {
      subject: "",
      startedAt: null,
      lastRunStartedAt: null,
      elapsedMs: 0,
      running: false,
      active: false,
      intervalId: null,
      lastPersistedAt: 0
    };
    if (clearDraft) clearTimerDraft();
    renderTimer();
    updateTimerButtons();
  }

  function startTimer() {
    const subject = nodes.timerSubject?.value || "";
    if (!allowedSubjects.has(subject)) {
      setStudyStatus("Please select a subject before starting timer.", "error");
      return;
    }
    if (state.timer.active) {
      setStudyStatus("A study timer is already active.", "error");
      return;
    }
    const now = Date.now();
    state.timer = {
      subject,
      startedAt: now,
      lastRunStartedAt: now,
      elapsedMs: 0,
      running: true,
      active: true,
      intervalId: window.setInterval(renderTimer, 1000),
      lastPersistedAt: 0
    };
    renderTimer();
    persistTimerDraft(true);
    updateTimerButtons();
    setStudyStatus("Study timer started.", "info");
  }

  function pauseTimer() {
    if (!state.timer.active || !state.timer.running) return;
    state.timer.elapsedMs = elapsedTimerMs();
    state.timer.lastRunStartedAt = null;
    state.timer.running = false;
    clearTimerInterval();
    renderTimer();
    persistTimerDraft(true);
    updateTimerButtons();
    setStudyStatus("Timer paused.", "info");
  }

  function resumeTimer() {
    if (!state.timer.active || state.timer.running) return;
    state.timer.lastRunStartedAt = Date.now();
    state.timer.running = true;
    state.timer.intervalId = window.setInterval(renderTimer, 1000);
    renderTimer();
    persistTimerDraft(true);
    updateTimerButtons();
    setStudyStatus("Timer resumed.", "info");
  }

  function cancelTimer() {
    if (!state.timer.active) return;
    if (!window.confirm("Cancel current study timer? This session will not be saved.")) return;
    resetTimer();
    setStudyStatus("Timer cancelled. No study time was saved.", "info");
  }

  function sessionRecord({ subject, topic = "", durationMinutes, source, startedAt = null, endedAt = null }) {
    return {
      id: "",
      date: todayKey(),
      subject,
      topic,
      startedAt,
      endedAt,
      durationMinutes,
      status: "finished",
      source,
      createdAt: serverTimestamp()
    };
  }

  async function saveStudySession(record, options = {}) {
    if (!state.user || !state.db || state.studySaving) return false;
    if (!options.fromOfflineQueue && isOffline()) {
      return enqueueOfflineAction("studySessionAdd", record, setStudyStatus, "Study time offline saved.");
    }
    setStudySaving(true);
    setStudyStatus("Saving study time...", "info");
    let sessionRef = null;
    let sessionWritten = false;
    try {
      sessionRef = push(ref(state.db, sessionsPath(state.user.uid)));
      const session = { ...record, id: sessionRef.key };
      await set(sessionRef, session);
      sessionWritten = true;
      const summaryResult = await runTransaction(ref(state.db, todaySummaryPath(state.user.uid)), (currentValue) => {
        const summary = normalizeSummary(currentValue || state.todaySummary);
        summary.date = todayKey();
        summary.totalStudyMinutes = Math.max(0, Math.round((summary.totalStudyMinutes || 0) + session.durationMinutes));
        summary.subjectMinutes[session.subject] = Math.max(0, Math.round((summary.subjectMinutes[session.subject] || 0) + session.durationMinutes));
        return { ...applyCompletionAndFocus(summary, state.streak), updatedAt: Date.now() };
      });
      const savedSummary = summaryResult?.snapshot?.val ? summaryResult.snapshot.val() : null;
      state.todaySummary = normalizeSummary(savedSummary || state.todaySummary);
      await syncCompletionAndFocus({ writeIfNeeded: true, allowSummaryOnlyWrite: true });
      await loadStudyReport();
      setStudyStatus(`${formatDuration(session.durationMinutes)} ${session.subject} study time saved.`, "success");
      return true;
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk study save failed:", error.message);
      if (sessionWritten && sessionRef) {
        remove(sessionRef).catch((cleanupError) => {
          console.warn("[GovJobUpdates] My Desk failed study session cleanup failed:", cleanupError.message);
        });
      }
      setStudyStatus("Study time save nahi ho paaya. Please internet/login check karke dobara try karein.", "error");
      return false;
    } finally {
      setStudySaving(false);
    }
  }

  async function finishTimer() {
    if (!state.timer.active) return;
    const endedAt = Date.now();
    const durationMinutes = Math.max(1, Math.round(elapsedTimerMs() / 60000));
    state.timer.elapsedMs = elapsedTimerMs();
    state.timer.lastRunStartedAt = null;
    state.timer.running = false;
    clearTimerInterval();
    renderTimer();
    persistTimerDraft(true);
    updateTimerButtons();
    const record = sessionRecord({
      subject: state.timer.subject,
      durationMinutes,
      source: "timer",
      startedAt: state.timer.startedAt,
      endedAt
    });
    const saved = await saveStudySession(record);
    if (saved) resetTimer();
  }

  async function saveManualTime(event) {
    event.preventDefault();
    if (state.studySaving) return;
    const subject = nodes.manualSubject?.value || "";
    const minutes = Number(nodes.manualMinutes?.value);
    const topic = (nodes.manualTopic?.value || "").trim();
    if (!allowedSubjects.has(subject)) {
      setStudyStatus("Please select a subject for manual study time.", "error");
      return;
    }
    if (!Number.isFinite(minutes) || minutes < 1 || minutes > 720) {
      setStudyStatus("Manual study minutes 1 se 720 ke beech rakhein.", "error");
      return;
    }
    if (topic.length > 100) {
      setStudyStatus("Topic 100 characters se zyada nahi hona chahiye.", "error");
      return;
    }
    const saved = await saveStudySession(sessionRecord({
      subject,
      topic,
      durationMinutes: Math.round(minutes),
      source: "manual",
      startedAt: null,
      endedAt: null
    }));
    if (saved) {
      if (nodes.manualMinutes) nodes.manualMinutes.value = "";
      if (nodes.manualTopic) nodes.manualTopic.value = "";
    }
  }

  function bindForms() {
    nodes.targetForm?.addEventListener("submit", saveSettings);
    nodes.clearTargetBtn?.addEventListener("click", resetForm);
    nodes.startTimerBtn?.addEventListener("click", startTimer);
    nodes.pauseTimerBtn?.addEventListener("click", pauseTimer);
    nodes.resumeTimerBtn?.addEventListener("click", resumeTimer);
    nodes.finishTimerBtn?.addEventListener("click", finishTimer);
    nodes.cancelTimerBtn?.addEventListener("click", cancelTimer);
    nodes.manualStudyForm?.addEventListener("submit", saveManualTime);
    nodes.plannerSlotForm?.addEventListener("submit", savePlannerSlot);
    nodes.revisionReminderForm?.addEventListener("submit", saveReminder);
    nodes.wrongQuestionForm?.addEventListener("submit", saveWrongQuestion);
    nodes.quickNoteForm?.addEventListener("submit", saveQuickNote);
    nodes.notificationPrefsForm?.addEventListener("submit", saveNotificationPrefs);
    nodes.exportMyDeskBtn?.addEventListener("click", exportMyDeskData);
    nodes.syncOfflineQueueBtn?.addEventListener("click", () => {
      if (isOffline()) {
        setDataControlsStatus("Internet offline hai. Pending entries online hote hi sync hongi.", "info");
        return;
      }
      setDataControlsStatus("Checking pending offline entries...", "info");
      flushOfflineQueue();
      window.setTimeout(() => {
        const pending = readOfflineQueue().length;
        setDataControlsStatus(pending ? `${pending} pending entries abhi sync nahi ho paayi.` : "No pending offline entries.", pending ? "error" : "success");
      }, 900);
    });
    nodes.resetMyDeskBtn?.addEventListener("click", resetMyDeskData);
    nodes.weeklyPlannerList?.addEventListener("click", (event) => {
      const deleteButton = event.target.closest("[data-delete-planner]");
      const toggleButton = event.target.closest("[data-toggle-planner]");
      if (toggleButton) {
        const [dayKey, slotId] = String(toggleButton.dataset.togglePlanner || "").split(":");
        togglePlannerSlotToday(dayKey, slotId);
        return;
      }
      if (deleteButton) {
        const [dayKey, slotId] = String(deleteButton.dataset.deletePlanner || "").split(":");
        deletePlannerSlot(dayKey, slotId);
      }
    });
    nodes.revisionReminderList?.addEventListener("click", (event) => {
      const completeButton = event.target.closest("[data-complete-reminder]");
      const deleteButton = event.target.closest("[data-delete-reminder]");
      const rescheduleButton = event.target.closest("[data-reschedule-reminder]");
      if (completeButton) completeReminder(completeButton.dataset.completeReminder);
      if (rescheduleButton) {
        const [reminderId, days] = String(rescheduleButton.dataset.rescheduleReminder || "").split(":");
        rescheduleReminder(reminderId, days);
      }
      if (deleteButton) deleteReminder(deleteButton.dataset.deleteReminder);
    });
    nodes.missionNextSteps?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-scroll-target]");
      const urlButton = event.target.closest("[data-open-url]");
      if (urlButton) {
        window.location.href = urlButton.dataset.openUrl || "quiz.html";
        return;
      }
      if (!button) return;
      const target = document.querySelector(button.dataset.scrollTarget || "");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    nodes.wrongQuestionList?.addEventListener("change", (event) => {
      const select = event.target.closest("[data-wrong-status]");
      if (!select) return;
      updateWrongQuestionStatus(select.dataset.wrongStatus, select.value);
    });
    nodes.wrongQuestionList?.addEventListener("click", (event) => {
      const deleteButton = event.target.closest("[data-delete-wrong]");
      const statusButton = event.target.closest("[data-wrong-status-btn]");
      const reattemptButton = event.target.closest("[data-wrong-reattempt]");
      if (statusButton) {
        const [questionId, status] = String(statusButton.dataset.wrongStatusBtn || "").split(":");
        updateWrongQuestionStatus(questionId, status);
        return;
      }
      if (reattemptButton) {
        const [questionId, days] = String(reattemptButton.dataset.wrongReattempt || "").split(":");
        updateWrongQuestionReattempt(questionId, days);
        return;
      }
      if (deleteButton) deleteWrongQuestion(deleteButton.dataset.deleteWrong);
    });
    nodes.wrongQuestionFilterSubject?.addEventListener("change", renderWrongQuestions);
    nodes.wrongQuestionFilterStatus?.addEventListener("change", renderWrongQuestions);
    nodes.wrongQuestionDueOnly?.addEventListener("change", renderWrongQuestions);
    nodes.quickNoteList?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-delete-note]");
      if (!button) return;
      deleteQuickNote(button.dataset.deleteNote);
    });
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.scrollTarget || "");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    window.addEventListener("beforeunload", (event) => {
      if (!state.timer.active) return;
      event.preventDefault();
      event.returnValue = "";
    });
    window.addEventListener("online", () => {
      flushOfflineQueue();
    });
    window.addEventListener("storage", (event) => {
      if (event.key === "GovJobUpdatesQuiz.attempts") loadQuizProgress();
    });
    window.addEventListener("gju:quiz-attempt-synced", () => {
      loadQuizProgress();
    });
  }

  async function initAuthGate() {
    if (!config || !config.apiKey) {
      if (nodes.loginMessage) nodes.loginMessage.textContent = "Firebase setup load nahi ho paaya. Please app ko refresh karke dobara try karein.";
      setAuthDebug("config-missing");
      show("loginRequired");
      markReady();
      return;
    }

    try {
      await loadFirebaseModules();
      const app = getApps().length ? getApps()[0] : initializeApp(config);
      state.auth = getAuth(app);
      await setPersistence(state.auth, browserLocalPersistence);
      state.db = getDatabase(app);
      setAuthDebug("auth-listener-started");
      let authSettled = false;
      const authTimeoutId = window.setTimeout(() => {
        if (authSettled) return;
        authSettled = true;
        if (nodes.loginMessage) {
          nodes.loginMessage.textContent = "Login status check hone me zyada time lag raha hai. Please internet check karein, Retry karein, ya dobara login karein.";
        }
        setAuthDebug("auth-timeout");
        show("loginRequired");
        markReady();
      }, 10000);
      onAuthStateChanged(state.auth, async (user) => {
        if (authSettled && !user) return;
        authSettled = true;
        window.clearTimeout(authTimeoutId);
        markReady();
        state.user = user;
        if (!user) {
          setAuthDebug("auth-user-null");
          if (nodes.loginMessage) {
            nodes.loginMessage.textContent = "Your My Desk dashboard is connected with your GovJobUpdates account, so your study setup can stay linked with your profile.";
          }
          show("loginRequired");
          state.settings = null;
          state.todaySummary = normalizeSummary(null);
          state.streak = normalizeStreak(null);
          state.weeklyPlanner = normalizePlanner(null);
          state.revisionReminders = [];
          state.wrongQuestions = [];
          state.quickNotes = [];
          state.notificationPrefs = normalizeNotificationPrefs(null);
          state.quizStats = emptyQuizStats();
          state.reportSummaries = [];
          renderMission();
          renderTodaySummary();
          renderPlanner();
          renderReminders();
          renderStudyReport();
          renderWrongQuestions();
          renderQuickNotes();
          populateNotificationPrefs(state.notificationPrefs);
          return;
        }
        setAuthDebug("auth-user-found");
        renderUser(user);
        show("dashboard");
        await loadSettings();
        await loadTodaySummary();
        await loadStreak();
        await loadPlanner();
        await loadReminders();
        await loadStudyReport();
        await loadWrongQuestions();
        await loadQuickNotes();
        await loadNotificationPrefs();
        await loadQuizProgress();
        restoreTimerDraft();
        flushOfflineQueue();
      });
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk auth check failed:", error.message);
      if (nodes.loginMessage) nodes.loginMessage.textContent = "My Desk login check fail ho gaya. Please Retry karein ya dobara login karein.";
      setAuthDebug(`auth-error=${error.code || error.name || "unknown"} message=${String(error.message || "").slice(0, 80)}`);
      show("loginRequired");
      markReady();
    }
  }

  try {
    setAuthDebug("bootstrap-started");
    lockMyDeskViewport();
    window.addEventListener("resize", lockMyDeskViewport, { passive: true });
    window.addEventListener("orientationchange", lockMyDeskViewport);
    if (!nodes.loading) {
      setAuthDebug("bootstrap-error=loading-node-missing");
      return;
    }
    bindForms();
    resetTimer();
    state.todaySummary = normalizeSummary(null);
    state.streak = normalizeStreak(null);
    state.weeklyPlanner = normalizePlanner(null);
    state.revisionReminders = [];
    state.wrongQuestions = [];
    state.quickNotes = [];
    state.notificationPrefs = normalizeNotificationPrefs(null);
    state.quizStats = emptyQuizStats();
    state.reportSummaries = [];
    renderTodaySummary();
    renderPlanner();
    renderReminders();
    renderStudyReport();
    renderWrongQuestions();
    renderQuickNotes();
    populateNotificationPrefs(state.notificationPrefs);
    setAuthDebug("bootstrap-rendered");

    if (!isApp) {
      show("appOnly");
      markReady();
      return;
    }

    show("loading");
    setAuthDebug("bootstrap-before-auth");
    initAuthGate();
  } catch (error) {
    console.warn("[GovJobUpdates] My Desk bootstrap failed:", error.message);
    if (nodes.loginMessage) nodes.loginMessage.textContent = "My Desk setup me error aa raha hai. Please debug line share karein.";
    setAuthDebug(`bootstrap-error=${String(error.message || error.name || "unknown").slice(0, 90)}`);
    show("loginRequired");
    markReady();
  }
})();
