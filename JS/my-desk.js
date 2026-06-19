import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, get, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function () {
  "use strict";

  const isApp = /GovJobUpdatesApp/i.test(navigator.userAgent || "");
  const config = window.GJU_FIREBASE_CONFIG;
  const allowedCategories = new Set(["", "SSC", "Police", "Railway", "Banking", "Teaching", "State Exams", "Defence", "Other"]);
  const allowedSubjects = new Set(["Hindi", "English", "GK/GS", "Maths", "Reasoning", "Other"]);

  let state = {
    auth: null,
    db: null,
    user: null,
    settings: null,
    saving: false
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
    missionExamCountdown: document.getElementById("missionExamCountdown")
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

  function setSaving(isSaving) {
    state.saving = isSaving;
    if (nodes.saveTargetBtn) {
      nodes.saveTargetBtn.disabled = isSaving;
      nodes.saveTargetBtn.textContent = isSaving ? "Saving..." : "Save Target";
    }
    if (nodes.clearTargetBtn) nodes.clearTargetBtn.disabled = isSaving;
  }

  function userDisplayName(user) {
    return user?.displayName || user?.email?.split("@")[0] || "GovJobUpdates User";
  }

  function renderUser(user) {
    if (nodes.userName) nodes.userName.textContent = userDisplayName(user);
    if (nodes.userEmail) nodes.userEmail.textContent = user?.email || "Account active";
  }

  function getSelectedWeakSubjects() {
    if (!nodes.targetForm) return [];
    return Array.from(nodes.targetForm.querySelectorAll('input[name="weakSubjects"]:checked'))
      .map((input) => input.value)
      .filter((value) => allowedSubjects.has(value))
      .slice(0, 6);
  }

  function setSelectedWeakSubjects(subjects) {
    const selected = new Set(Array.isArray(subjects) ? subjects : []);
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

    if (targetExam.length > 80) {
      throw new Error("Target exam 80 characters se zyada nahi hona chahiye.");
    }
    if (!allowedCategories.has(targetCategory)) {
      throw new Error("Please select a valid target category.");
    }
    if (!Number.isFinite(studyHoursRaw) || studyHoursRaw < 0.5 || studyHoursRaw > 16) {
      throw new Error("Daily study hours 0.5 se 16 hours ke beech rakhein.");
    }
    if (!Number.isFinite(quizTargetRaw) || quizTargetRaw < 0 || quizTargetRaw > 500) {
      throw new Error("Daily quiz target 0 se 500 questions ke beech rakhein.");
    }
    if (weakSubjects.length > 6) {
      throw new Error("Weak subjects maximum 6 select kar sakte hain.");
    }
    if (!dateIsValid(targetExamDate)) {
      throw new Error("Please select a valid exam date.");
    }

    return {
      targetExam,
      targetCategory,
      dailyStudyMinutesTarget: Math.round(studyHoursRaw * 60),
      dailyQuizQuestionsTarget: Math.round(quizTargetRaw),
      weakSubjects,
      targetExamDate,
      updatedAt: serverTimestamp ? serverTimestamp() : Date.now()
    };
  }

  function settingsPath(uid) {
    return `users/${uid}/myDesk/settings`;
  }

  function formatStudyTarget(minutes) {
    const value = Number(minutes);
    if (!Number.isFinite(value) || value <= 0) return "Not set";
    const hours = value / 60;
    return `${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`;
  }

  function formatQuizTarget(count) {
    const value = Number(count);
    if (!Number.isFinite(value) || value < 0) return "Not set";
    return `${Math.round(value)} Questions`;
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

  function renderMission(settings) {
    if (nodes.missionStudyTarget) nodes.missionStudyTarget.textContent = settings ? formatStudyTarget(settings.dailyStudyMinutesTarget) : "Not set";
    if (nodes.missionQuizTarget) nodes.missionQuizTarget.textContent = settings ? formatQuizTarget(settings.dailyQuizQuestionsTarget) : "Not set";
    if (nodes.missionFocusSubject) {
      const weakSubjects = Array.isArray(settings?.weakSubjects) ? settings.weakSubjects : [];
      nodes.missionFocusSubject.textContent = weakSubjects.length ? weakSubjects.join(", ") : (settings ? "Balanced" : "Not set");
    }
    if (nodes.missionExamCountdown) nodes.missionExamCountdown.textContent = settings ? countdownText(settings.targetExamDate) : "Set target exam";
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
      const settings = snapshot.exists() ? snapshot.val() : null;
      state.settings = settings;
      populateForm(settings);
      renderMission(settings);
      setStatus(settings ? "Target settings loaded." : "No target set yet. Setup your first mission.", settings ? "success" : "info");
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk settings load failed:", error.message);
      populateForm(null);
      renderMission(null);
      setStatus("Target settings load nahi ho paayi. Please connection check karke retry karein.", "error");
    }
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
      state.settings = {
        ...settings,
        updatedAt: Date.now()
      };
      renderMission(state.settings);
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
    renderMission(state.settings);
    setStatus(state.settings ? "Unsaved changes reset." : "No saved target yet.", "info");
  }

  function bindTargetForm() {
    nodes.targetForm?.addEventListener("submit", saveSettings);
    nodes.clearTargetBtn?.addEventListener("click", resetForm);
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.scrollTarget || "");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
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
      onAuthStateChanged(state.auth, (user) => {
        markReady();
        state.user = user;
        if (!user) {
          show("loginRequired");
          renderMission(null);
          return;
        }
        renderUser(user);
        show("dashboard");
        loadSettings();
      });
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk auth check failed:", error.message);
      show("loginRequired");
      markReady();
    }
  }

  if (!nodes.loading) return;
  bindTargetForm();

  if (!isApp) {
    show("appOnly");
    markReady();
    return;
  }

  show("loading");
  initAuthGate();
})();
