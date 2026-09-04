(function () {
  "use strict";

  const root = document.getElementById("familyQuizPage");
  if (!root) return;

  const familySlug = String(root.dataset.examFamily || "").trim().toLowerCase();
  const familyName = String(root.dataset.examFamilyName || familySlug.toUpperCase()).trim();
  const list = document.getElementById("familyQuizList");
  const subjectSelect = document.getElementById("familySubjectSelect");
  const searchInput = document.getElementById("familyQuizSearch");
  const meta = document.getElementById("familyQuizMeta");
  const count = document.getElementById("familyQuizCount");
  const empty = document.getElementById("familyQuizEmpty");

  const PROGRESS_API = "https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
  const LOCAL_ATTEMPTS_KEY = "GovJobUpdatesQuiz.attempts";

  let quizzes = [];
  let progressByQuiz = new Map();
  let firebaseImportPromise = null;

  function slugify(v) {
    return String(v || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "quiz";
  }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function items() {
    for (const p of [window.GJU_QUIZ_INDEX, window.GJU_ADMIN_QUIZ_INDEX, window.GJU_PUBLISHED_QUIZ_INDEX]) {
      if (Array.isArray(p)) return p;
      if (p && Array.isArray(p.quizzes)) return p.quizzes;
      if (p && Array.isArray(p.items)) return p.items;
      if (p && Array.isArray(p.data)) return p.data;
    }
    return [];
  }

  function family(item) {
    return String(
      item.examFamilySlug ||
      item.exam_family_slug ||
      (item.examFamily && item.examFamily.slug) ||
      (item.exam_family && item.exam_family.slug) ||
      ""
    ).trim().toLowerCase();
  }

  function normalize(item) {
    const ss = slugify(item.subjectSlug || item.subject_slug || (item.subject && item.subject.slug) || item.subject || "practice");
    const sn = String(item.subjectName || item.subject_name || (item.subject && item.subject.name) || item.subject || ss).trim();
    const qs = slugify(item.quizSlug || item.quiz_slug || item.slug || item.id || item.title || "quiz");
    return {
      id: `admin-${ss}-${qs}`.replace(/-+/g, "-"),
      title: String(item.title || item.quizTitle || item.quiz_title || qs).trim(),
      description: String(item.description || item.summary || `${familyName} practice quiz on GovJobUpdates.`).trim(),
      subject: sn,
      duration: Number(item.durationMinutes || item.duration_minutes) || 30,
      questions: Number(item.totalQuestions || item.total_questions || item.activeQuestions || item.active_questions) || 0,
      marks: Number(item.marksPerQuestion || item.marks_per_question) || 1,
      negative: Number(item.negativeMarks || item.negative_marks) || 0.25,
    };
  }

  function number(v, fallback = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function percent(v) {
    return Math.max(0, Math.min(100, Math.round(number(v))));
  }

  function formatDate(v) {
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? "Recent" : d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function readLocalProgress() {
    let rows = [];
    try {
      const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      rows = Array.isArray(parsed) ? parsed : [];
    } catch (_e) {}

    const map = new Map();
    rows.forEach((a) => {
      const id = String(a.quizId || a.quizKey || "").trim();
      if (!id) return;

      const when = new Date(a.completedAt || a.timestamp || 0).getTime() || 0;
      const current = map.get(id);
      const best = number(a.bestPercentage, a.percentage);

      if (!current) {
        map.set(id, {
          quizKey: id,
          completedAt: a.completedAt || a.timestamp,
          bestPercentage: best,
          percentage: number(a.percentage),
          attemptCount: 1,
          rank: null,
          rankedUsers: null,
          hasRankedAttempt: false,
          _time: when,
        });
        return;
      }

      current.attemptCount += 1;
      current.bestPercentage = Math.max(current.bestPercentage, best);
      if (when > current._time) {
        current.completedAt = a.completedAt || a.timestamp;
        current.percentage = number(a.percentage);
        current._time = when;
      }
    });
    return map;
  }

  function load() {
    quizzes = items().filter((i) => i && family(i) === familySlug).map(normalize);
    subjects();
    render();
  }

  function subjects() {
    if (!subjectSelect) return;
    const values = Array.from(new Set(quizzes.map((q) => q.subject))).sort();
    const current = subjectSelect.value;
    subjectSelect.innerHTML = '<option value="">All Subjects</option>' + values.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join("");
    if (values.includes(current)) subjectSelect.value = current;
  }

  function rankText(p) {
    const rank = number(p && p.rank, 0);
    const total = number(p && p.rankedUsers, 0);
    return rank > 0 && total > 0 ? `#${rank} / ${total}` : "—";
  }

  function progressMarkup(q) {
    const p = progressByQuiz.get(q.id);
    if (!p) {
      return '<div class="family-user-progress is-empty"><span><i class="far fa-calendar"></i><b>Last Attempt</b><em>Not attempted</em></span><span><i class="fas fa-trophy"></i><b>Best Score</b><em>—</em></span><span><i class="fas fa-medal"></i><b>Rank</b><em>—</em></span></div>';
    }

    return `<div class="family-user-progress"><span><i class="far fa-calendar"></i><b>Last Attempt</b><em>${esc(formatDate(p.completedAt))}</em></span><span><i class="fas fa-trophy"></i><b>Best Score</b><em>${percent(p.bestPercentage)}%</em></span><span><i class="fas fa-medal"></i><b>Rank</b><em>${esc(rankText(p))}</em></span></div>`;
  }

  function actionMarkup(q) {
    const p = progressByQuiz.get(q.id);
    const reattempt = !!(p && number(p.attemptCount, 0) > 0);
    const label = reattempt ? "Reattempt Quiz" : "Start Quiz";
    const icon = reattempt ? "fas fa-rotate-right" : "fas fa-arrow-right";
    return `<a class="family-start-btn${reattempt ? " is-reattempt" : ""}" href="quiz-attempt.html?quiz=${encodeURIComponent(q.id)}&family=${encodeURIComponent(familySlug)}">${label} <i class="${icon}"></i></a>`;
  }

  function render() {
    if (!list) return;

    const query = String((searchInput && searchInput.value) || "").trim().toLowerCase();
    const subject = String((subjectSelect && subjectSelect.value) || "").trim();
    const filtered = quizzes.filter((q) =>
      (!subject || q.subject === subject) &&
      (!query || `${q.title} ${q.description} ${q.subject}`.toLowerCase().includes(query))
    );

    if (count) count.textContent = String(quizzes.length);
    if (meta) {
      meta.textContent = filtered.length === quizzes.length
        ? `${quizzes.length} published ${familyName} quiz${quizzes.length === 1 ? "" : "zes"}`
        : `${filtered.length} of ${quizzes.length} quizzes`;
    }

    if (!filtered.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    list.innerHTML = filtered.map((q) =>
      `<article class="family-quiz-card"><div class="family-quiz-card-main"><span class="family-subject-badge">${esc(q.subject)}</span><h2>${esc(q.title)}</h2><p>${esc(q.description)}</p><div class="family-quiz-meta"><span><i class="far fa-circle-question"></i>${q.questions ? q.questions + " Questions" : "Questions"}</span><span><i class="far fa-clock"></i>${q.duration} Minutes</span><span><i class="fas fa-plus"></i>${q.marks}</span><span><i class="fas fa-minus"></i>${q.negative}</span></div>${progressMarkup(q)}</div>${actionMarkup(q)}</article>`
    ).join("");
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.GJU_FIREBASE_CONFIG && window.GJU_FIREBASE_CONFIG.apiKey) {
        resolve();
        return;
      }
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function getFirebaseModules() {
    if (firebaseImportPromise) return firebaseImportPromise;
    firebaseImportPromise = Promise.all([
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"),
    ]).then(([appMod, authMod]) => ({ appMod, authMod }));
    return firebaseImportPromise;
  }

  async function getIdToken() {
    try {
      await loadScript("../JS/firebase-config.js");
      if (!window.GJU_FIREBASE_CONFIG || !window.GJU_FIREBASE_CONFIG.apiKey) return "";

      const { appMod, authMod } = await getFirebaseModules();
      const app = appMod.getApps().length ? appMod.getApps()[0] : appMod.initializeApp(window.GJU_FIREBASE_CONFIG);
      const auth = authMod.getAuth(app);
      let user = auth.currentUser;

      if (!user) {
        user = await new Promise((resolve) => {
          let done = false;
          let unsub = function () {};
          const timer = setTimeout(() => {
            if (done) return;
            done = true;
            unsub();
            resolve(auth.currentUser || null);
          }, 2500);
          unsub = authMod.onAuthStateChanged(auth, (next) => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            unsub();
            resolve(next || null);
          });
        });
      }

      return user ? user.getIdToken() : "";
    } catch (_e) {
      return "";
    }
  }

  function applyProgress(rows) {
    const map = new Map();
    (Array.isArray(rows) ? rows : []).forEach((row) => {
      const id = String(row.quizKey || row.quizId || "").trim();
      if (!id) return;
      map.set(id, {
        quizKey: id,
        completedAt: row.completedAt,
        bestPercentage: number(row.bestPercentage, row.percentage),
        percentage: number(row.percentage),
        attemptCount: Math.max(1, number(row.attemptCount, 1)),
        rank: row.rank == null ? null : number(row.rank, 0),
        rankedUsers: row.rankedUsers == null ? null : number(row.rankedUsers, 0),
        hasRankedAttempt: row.hasRankedAttempt === true,
      });
    });
    progressByQuiz = map.size ? map : readLocalProgress();
    render();
  }

  async function loadProgress() {
    progressByQuiz = readLocalProgress();
    render();
    const token = await getIdToken();
    if (!token) return;

    try {
      const response = await fetch(PROGRESS_API, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || data.success !== true) return;
      applyProgress(data.progress);
    } catch (_e) {}
  }

  if (subjectSelect) subjectSelect.addEventListener("change", render);
  if (searchInput) searchInput.addEventListener("input", render);
  document.addEventListener("gju:admin-quiz-index-ready", load);

  load();
  loadProgress();
}());
