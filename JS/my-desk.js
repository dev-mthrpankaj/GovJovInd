import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, get, set, push, update, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function () {
  "use strict";

  const isApp = /GovJobUpdatesApp/i.test(navigator.userAgent || "");
  const config = window.GJU_FIREBASE_CONFIG;
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
    saving: false,
    studySaving: false,
    plannerSaving: false,
    reminderSaving: false,
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
    revisionReminderList: document.getElementById("revisionReminderList")
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
    return {
      currentStreak: Math.max(0, Math.round(Number(streak?.currentStreak) || 0)),
      bestStreak: Math.max(0, Math.round(Number(streak?.bestStreak) || 0)),
      lastCompletedDate: dateIsValid(streak?.lastCompletedDate) ? streak.lastCompletedDate : "",
      lastCheckedDate: dateIsValid(streak?.lastCheckedDate) ? streak.lastCheckedDate : "",
      lastMissedDate: dateIsValid(streak?.lastMissedDate) ? streak.lastMissedDate : null,
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

  function dateIsValid(value) {
    if (!value) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function collectSettings() {
    const targetExam = (nodes.targetExam?.value || "").trim();
    const targetCategory = nodes.targetCategory?.value || "";
    const studyHoursRaw = Number(nodes.dailyStudyHours?.value);
    const quizTargetRaw = Number(nodes.dailyQuizQuestions?.value);
    const weakSubjects = getSelectedWeakSubjects();
    const targetExamDate = nodes.targetExamDate?.value || "";

    if (targetExam.length > 80) throw new Error("Target exam 80 characters se zyada nahi hona chahiye.");
    if (!allowedCategories.has(targetCategory)) throw new Error("Please select a valid target category.");
    if (!Number.isFinite(studyHoursRaw) || studyHoursRaw < 0.5 || studyHoursRaw > 16) throw new Error("Daily study hours 0.5 se 16 hours ke beech rakhein.");
    if (!Number.isFinite(quizTargetRaw) || quizTargetRaw < 0 || quizTargetRaw > 500) throw new Error("Daily quiz target 0 se 500 questions ke beech rakhein.");
    if (weakSubjects.length > 6) throw new Error("Weak subjects maximum 6 select kar sakte hain.");
    if (!dateIsValid(targetExamDate)) throw new Error("Please select a valid exam date.");

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
    const quizScore = Number.isFinite(quizTarget) && quizTarget > 0 ? 0 : 10;
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
    if (!dateValue || !dateIsValid(dateValue)) return "Set target exam";
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const target = new Date(`${dateValue}T00:00:00`).getTime();
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
    if (nodes.missionStudyTarget) nodes.missionStudyTarget.textContent = currentStudyProgressText();
    if (nodes.missionQuizTarget) nodes.missionQuizTarget.textContent = settings ? formatQuizTarget(settings.dailyQuizQuestionsTarget) : "Not set";
    if (nodes.missionFocusSubject) {
      const weakSubjects = Array.isArray(settings?.weakSubjects) ? settings.weakSubjects : [];
      nodes.missionFocusSubject.textContent = weakSubjects.length ? weakSubjects.join(", ") : (settings ? "Balanced" : "Not set");
    }
    if (nodes.missionStreak) nodes.missionStreak.textContent = `${effectiveCurrentStreak()} days`;
    if (nodes.missionFocusScore) nodes.missionFocusScore.textContent = `${focus.total}/100`;
    if (nodes.missionDayStatus) nodes.missionDayStatus.textContent = dayStatusText(summary);
    if (nodes.missionPlannedSessions) nodes.missionPlannedSessions.textContent = `${todayPlannerSlots().length} sessions`;
    if (nodes.missionRevisionDue) nodes.missionRevisionDue.textContent = `${todayDueReminders().length} due`;
    if (nodes.missionExamCountdown) nodes.missionExamCountdown.textContent = settings ? countdownText(settings.targetExamDate) : "Set target exam";
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

  function todayDueReminders() {
    const today = todayKey();
    return state.revisionReminders.filter((reminder) => reminder.status !== "completed" && reminder.revisionDate <= today);
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
        revisionDate: dateIsValid(reminder.revisionDate) ? reminder.revisionDate : todayKey(),
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
            <article class="my-desk-plan-item">
              <div>
                <strong>${formatTimeLabel(slot.time)} · ${escapeHtml(slot.subject)}</strong>
                <span>${escapeHtml(slot.topic || "Study session")} · ${formatDuration(slot.durationMinutes)}</span>
              </div>
              <button type="button" data-delete-planner="${escapeHtml(slot.dayKey)}:${escapeHtml(slot.id)}">Delete</button>
            </article>
          `).join("") : `<p>No study plan added yet.</p>`}
        </section>
      `;
    }).join("");
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
            <button type="button" data-delete-reminder="${escapeHtml(reminder.id)}">Delete</button>
          </div>
        </article>
      `;
    }).join("");
    renderMission();
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
    if (nodes.targetExamDate) nodes.targetExamDate.value = dateIsValid(safe.targetExamDate) ? safe.targetExamDate : "";
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

  function collectReminder() {
    const subject = nodes.revisionSubject?.value || "";
    const topic = (nodes.revisionTopic?.value || "").trim();
    const revisionDate = nodes.revisionDate?.value || "";
    const priority = nodes.revisionPriority?.value || "Medium";
    if (!allowedSubjects.has(subject)) throw new Error("Please select a subject.");
    if (!topic) throw new Error("Please enter a revision topic.");
    if (topic.length > 100) throw new Error("Topic 100 characters se zyada nahi hona chahiye.");
    if (!revisionDate || !dateIsValid(revisionDate)) throw new Error("Please select a valid revision date.");
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

  async function deleteReminder(reminderId) {
    if (!state.user || !state.db || !reminderId) return;
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

  function formatClock(ms) {
    const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function renderTimer() {
    if (nodes.studyTimerDisplay) nodes.studyTimerDisplay.textContent = formatClock(elapsedTimerMs());
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

  function resetTimer() {
    clearTimerInterval();
    state.timer = {
      subject: "",
      startedAt: null,
      lastRunStartedAt: null,
      elapsedMs: 0,
      running: false,
      active: false,
      intervalId: null
    };
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
      intervalId: window.setInterval(renderTimer, 1000)
    };
    renderTimer();
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
    updateTimerButtons();
    setStudyStatus("Timer paused.", "info");
  }

  function resumeTimer() {
    if (!state.timer.active || state.timer.running) return;
    state.timer.lastRunStartedAt = Date.now();
    state.timer.running = true;
    state.timer.intervalId = window.setInterval(renderTimer, 1000);
    renderTimer();
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

  async function saveStudySession(record) {
    if (!state.user || !state.db || state.studySaving) return;
    setStudySaving(true);
    setStudyStatus("Saving study time...", "info");
    try {
      const sessionRef = push(ref(state.db, sessionsPath(state.user.uid)));
      const session = { ...record, id: sessionRef.key };
      const currentSummarySnapshot = await get(ref(state.db, todaySummaryPath(state.user.uid)));
      const summary = normalizeSummary(currentSummarySnapshot.exists() ? currentSummarySnapshot.val() : state.todaySummary);
      summary.date = todayKey();
      summary.totalStudyMinutes = Math.max(0, Math.round((summary.totalStudyMinutes || 0) + session.durationMinutes));
      summary.subjectMinutes[session.subject] = Math.max(0, Math.round((summary.subjectMinutes[session.subject] || 0) + session.durationMinutes));
      const preparedSummary = applyCompletionAndFocus(summary, state.streak);
      summary.updatedAt = serverTimestamp();
      await Promise.all([
        set(sessionRef, session),
        set(ref(state.db, todaySummaryPath(state.user.uid)), { ...preparedSummary, updatedAt: serverTimestamp() })
      ]);
      state.todaySummary = { ...preparedSummary, updatedAt: Date.now() };
      await syncCompletionAndFocus({ writeIfNeeded: true, allowSummaryOnlyWrite: true });
      setStudyStatus(`${formatDuration(session.durationMinutes)} ${session.subject} study time saved.`, "success");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk study save failed:", error.message);
      setStudyStatus("Study time save nahi ho paaya. Please internet/login check karke dobara try karein.", "error");
    } finally {
      setStudySaving(false);
    }
  }

  async function finishTimer() {
    if (!state.timer.active) return;
    const endedAt = Date.now();
    const durationMinutes = Math.max(1, Math.round(elapsedTimerMs() / 60000));
    const record = sessionRecord({
      subject: state.timer.subject,
      durationMinutes,
      source: "timer",
      startedAt: state.timer.startedAt,
      endedAt
    });
    resetTimer();
    await saveStudySession(record);
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
    await saveStudySession(sessionRecord({
      subject,
      topic,
      durationMinutes: Math.round(minutes),
      source: "manual",
      startedAt: null,
      endedAt: null
    }));
    if (nodes.manualMinutes) nodes.manualMinutes.value = "";
    if (nodes.manualTopic) nodes.manualTopic.value = "";
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
    nodes.weeklyPlannerList?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-delete-planner]");
      if (!button) return;
      const [dayKey, slotId] = String(button.dataset.deletePlanner || "").split(":");
      deletePlannerSlot(dayKey, slotId);
    });
    nodes.revisionReminderList?.addEventListener("click", (event) => {
      const completeButton = event.target.closest("[data-complete-reminder]");
      const deleteButton = event.target.closest("[data-delete-reminder]");
      if (completeButton) completeReminder(completeButton.dataset.completeReminder);
      if (deleteButton) deleteReminder(deleteButton.dataset.deleteReminder);
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
  }

  function initAuthGate() {
    if (!config || !config.apiKey) {
      show("loginRequired");
      markReady();
      return;
    }

    try {
      const app = getApps().length ? getApps()[0] : initializeApp(config);
      state.auth = getAuth(app);
      state.db = getDatabase(app);
      onAuthStateChanged(state.auth, async (user) => {
        markReady();
        state.user = user;
        if (!user) {
          show("loginRequired");
          state.settings = null;
          state.todaySummary = normalizeSummary(null);
          state.streak = normalizeStreak(null);
          state.weeklyPlanner = normalizePlanner(null);
          state.revisionReminders = [];
          renderMission();
          renderTodaySummary();
          renderPlanner();
          renderReminders();
          return;
        }
        renderUser(user);
        show("dashboard");
        await loadSettings();
        await loadTodaySummary();
        await loadStreak();
        await loadPlanner();
        await loadReminders();
      });
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk auth check failed:", error.message);
      show("loginRequired");
      markReady();
    }
  }

  if (!nodes.loading) return;
  bindForms();
  resetTimer();
  state.todaySummary = normalizeSummary(null);
  state.streak = normalizeStreak(null);
  state.weeklyPlanner = normalizePlanner(null);
  state.revisionReminders = [];
  renderTodaySummary();
  renderPlanner();
  renderReminders();

  if (!isApp) {
    show("appOnly");
    markReady();
    return;
  }

  show("loading");
  initAuthGate();
})();
