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
  const toolbar = root.querySelector(".family-toolbar");

  const PAGE_SIZE = 12;
  const PROGRESS_API = "https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
  const LOCAL_ATTEMPTS_KEY = "GovJobUpdatesQuiz.attempts";

  let resetButton = null;
  let pagination = null;
  let quizzes = [];
  let progressByQuiz = new Map();
  let firebaseImportPromise = null;
  let currentPage = 1;

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
    return String(item.examFamilySlug || item.exam_family_slug || (item.examFamily && item.examFamily.slug) || (item.exam_family && item.exam_family.slug) || "").trim().toLowerCase();
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

  function percent(v) { return Math.max(0, Math.min(100, Math.round(number(v)))); }

  function formatDate(v) {
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? "Recent" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
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
        map.set(id, { quizKey: id, completedAt: a.completedAt || a.timestamp, bestPercentage: best, percentage: number(a.percentage), attemptCount: 1, rank: null, rankedUsers: null, hasRankedAttempt: false, _time: when });
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

  function installUiStyles() {
    if (document.getElementById("gju-family-filter-v4")) return;
    const style = document.createElement("style");
    style.id = "gju-family-filter-v4";
    style.textContent = `
      .family-toolbar.family-filter-v4{grid-template-columns:minmax(0,1fr) 260px;align-items:center;gap:10px 12px;padding:12px 14px;border-radius:16px;box-shadow:0 8px 24px rgba(15,23,42,.065)}
      .family-filter-v4 .family-filter-heading{grid-column:1/-1;min-height:28px}
      .family-filter-v4 .family-filter-copy{display:flex;align-items:baseline;flex-wrap:wrap;gap:5px 9px}
      .family-filter-v4 .family-filter-copy strong{font-size:14px}.family-filter-v4 .family-filter-copy small{font-size:11px}
      .family-filter-v4 .family-search,.family-filter-v4 .family-select{min-height:48px;padding-top:20px;padding-bottom:7px}
      .family-pagination{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px;margin:22px 0 4px}
      .family-page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:38px;min-height:38px;padding:7px 11px;border:1px solid var(--fq-border);border-radius:10px;background:#fff;color:#475569;cursor:pointer;font:inherit;font-size:12px;font-weight:800}
      .family-page-btn:hover,.family-page-btn:focus-visible{border-color:var(--fq-accent);color:var(--fq-accent-strong)}
      .family-page-btn[aria-current="page"]{border-color:var(--fq-accent);background:var(--fq-accent);color:#fff;box-shadow:0 6px 14px var(--fq-accent-glow)}
      .family-page-btn:disabled{opacity:.42;cursor:not-allowed}
      .family-page-summary{width:100%;margin-top:2px;color:var(--fq-muted);font-size:11px;text-align:center}
      @media(max-width:760px){.family-toolbar.family-filter-v4{grid-template-columns:1fr;gap:9px;padding:11px}.family-filter-v4 .family-filter-heading,.family-filter-v4 .family-search,.family-filter-v4 .family-select{grid-column:1}.family-filter-v4 .family-filter-copy{display:grid;gap:1px}.family-filter-v4 .family-search,.family-filter-v4 .family-select{min-height:52px}.family-pagination{margin-top:16px}}
    `;
    document.head.appendChild(style);
  }

  function enhanceFilterUi() {
    if (!toolbar) return;
    installUiStyles();
    toolbar.classList.remove("family-filter-v2", "family-filter-v3");
    toolbar.classList.add("family-filter-v4");

    const oldChips = toolbar.querySelector(".family-subject-chips");
    if (oldChips) oldChips.remove();

    if (!toolbar.querySelector(".family-filter-heading")) {
      toolbar.insertAdjacentHTML("afterbegin", '<div class="family-filter-heading"><div class="family-filter-copy"><span class="family-filter-eyebrow">Filter Practice Sets</span><strong>Find the right quiz quickly</strong><small>Search by quiz name or choose a subject.</small></div><button class="family-filter-reset" type="button" data-family-filter-reset hidden><i class="fas fa-rotate-left" aria-hidden="true"></i><span>Clear filters</span></button></div>');
    }
    const search = toolbar.querySelector(".family-search");
    if (search && !search.querySelector(".family-control-caption")) search.insertAdjacentHTML("afterbegin", '<span class="family-control-caption">Search quizzes</span>');
    const select = toolbar.querySelector(".family-select");
    if (select && !select.querySelector(".family-control-caption")) select.insertAdjacentHTML("afterbegin", '<span class="family-control-caption">Choose subject</span>');
    resetButton = toolbar.querySelector("[data-family-filter-reset]");

    if (list && !document.getElementById("familyQuizPagination")) {
      list.insertAdjacentHTML("afterend", '<nav class="family-pagination" id="familyQuizPagination" aria-label="Quiz pages"></nav>');
    }
    pagination = document.getElementById("familyQuizPagination");
  }

  function subjects() {
    if (!subjectSelect) return;
    const values = Array.from(new Set(quizzes.map((q) => q.subject))).sort();
    const current = subjectSelect.value;
    subjectSelect.innerHTML = '<option value="">All Subjects</option>' + values.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join("");
    if (values.includes(current)) subjectSelect.value = current;
  }

  function syncFilterUi(query, subject) {
    if (resetButton) resetButton.hidden = !query && !subject;
    root.classList.toggle("has-active-filters", !!query || !!subject);
  }

  function rankText(p) {
    const rank = number(p && p.rank, 0), total = number(p && p.rankedUsers, 0);
    return rank > 0 && total > 0 ? `#${rank} / ${total}` : "—";
  }

  function progressMarkup(q) {
    const p = progressByQuiz.get(q.id);
    if (!p) return '<div class="family-user-progress is-empty"><span><i class="far fa-calendar"></i><b>Last Attempt</b><em>Not attempted</em></span><span><i class="fas fa-trophy"></i><b>Best Score</b><em>—</em></span><span><i class="fas fa-medal"></i><b>Rank</b><em>—</em></span></div>';
    return `<div class="family-user-progress"><span><i class="far fa-calendar"></i><b>Last Attempt</b><em>${esc(formatDate(p.completedAt))}</em></span><span><i class="fas fa-trophy"></i><b>Best Score</b><em>${percent(p.bestPercentage)}%</em></span><span><i class="fas fa-medal"></i><b>Rank</b><em>${esc(rankText(p))}</em></span></div>`;
  }

  function actionMarkup(q) {
    const p = progressByQuiz.get(q.id);
    const reattempt = !!(p && number(p.attemptCount, 0) > 0);
    const label = reattempt ? "Reattempt Quiz" : "Start Quiz";
    const icon = reattempt ? "fas fa-rotate-right" : "fas fa-arrow-right";
    return `<a class="family-start-btn${reattempt ? " is-reattempt" : ""}" href="quiz-attempt.html?quiz=${encodeURIComponent(q.id)}&family=${encodeURIComponent(familySlug)}" aria-label="${label}: ${esc(q.title)}"><span>${label}</span><i class="${icon}" aria-hidden="true"></i></a>`;
  }

  function renderPagination(total) {
    if (!pagination) return;
    const pages = Math.ceil(total / PAGE_SIZE);
    if (pages <= 1) { pagination.innerHTML = ""; pagination.hidden = true; return; }
    pagination.hidden = false;
    currentPage = Math.min(Math.max(1, currentPage), pages);
    const start = (currentPage - 1) * PAGE_SIZE + 1;
    const end = Math.min(currentPage * PAGE_SIZE, total);
    let html = `<button class="family-page-btn" type="button" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""} aria-label="Previous page"><i class="fas fa-chevron-left" aria-hidden="true"></i><span class="sr-only">Previous</span></button>`;
    for (let p = 1; p <= pages; p += 1) html += `<button class="family-page-btn" type="button" data-page="${p}" ${p === currentPage ? 'aria-current="page"' : ""}>${p}</button>`;
    html += `<button class="family-page-btn" type="button" data-page="${currentPage + 1}" ${currentPage === pages ? "disabled" : ""} aria-label="Next page"><span class="sr-only">Next</span><i class="fas fa-chevron-right" aria-hidden="true"></i></button><span class="family-page-summary">Showing ${start}–${end} of ${total} quizzes</span>`;
    pagination.innerHTML = html;
  }

  function render() {
    if (!list) return;
    const query = String((searchInput && searchInput.value) || "").trim().toLowerCase();
    const subject = String((subjectSelect && subjectSelect.value) || "").trim();
    const filtered = quizzes.filter((q) => (!subject || q.subject === subject) && (!query || `${q.title} ${q.description} ${q.subject}`.toLowerCase().includes(query)));
    syncFilterUi(query, subject);
    if (count) count.textContent = String(quizzes.length);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (meta) {
      if (!filtered.length) meta.textContent = "No quizzes match your filters";
      else if (filtered.length <= PAGE_SIZE) meta.textContent = filtered.length === quizzes.length ? `Showing all ${quizzes.length} published quiz${quizzes.length === 1 ? "" : "zes"}` : `Showing ${filtered.length} of ${quizzes.length} quizzes`;
      else meta.textContent = `Showing ${startIndex + 1}–${Math.min(startIndex + PAGE_SIZE, filtered.length)} of ${filtered.length} quizzes`;
    }

    if (!filtered.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      renderPagination(0);
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = pageItems.map((q) => `<article class="family-quiz-card"><div class="family-card-top"><span class="family-subject-badge">${esc(q.subject)}</span><span class="family-access-badge"><i class="fas fa-unlock-keyhole" aria-hidden="true"></i> Free</span></div><div class="family-quiz-card-main"><h2>${esc(q.title)}</h2><p>${esc(q.description)}</p><div class="family-quiz-meta" aria-label="Quiz details"><span><i class="far fa-circle-question" aria-hidden="true"></i><small>Questions</small><strong>${q.questions || "—"}</strong></span><span><i class="far fa-clock" aria-hidden="true"></i><small>Duration</small><strong>${q.duration} min</strong></span><span><i class="fas fa-scale-balanced" aria-hidden="true"></i><small>Marking</small><strong>+${q.marks} / -${q.negative}</strong></span></div>${progressMarkup(q)}</div><div class="family-card-actions">${actionMarkup(q)}</div></article>`).join("");
    renderPagination(filtered.length);
  }

  function resetPageAndRender() { currentPage = 1; render(); }

  function load() {
    quizzes = items().filter((i) => i && family(i) === familySlug).map(normalize);
    subjects();
    currentPage = 1;
    render();
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.GJU_FIREBASE_CONFIG && window.GJU_FIREBASE_CONFIG.apiKey) { resolve(); return; }
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) { existing.addEventListener("load", resolve, { once: true }); existing.addEventListener("error", reject, { once: true }); return; }
      const s = document.createElement("script"); s.src = src; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
  }

  async function getFirebaseModules() {
    if (firebaseImportPromise) return firebaseImportPromise;
    firebaseImportPromise = Promise.all([import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"), import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js")]).then(([appMod, authMod]) => ({ appMod, authMod }));
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
      if (!user) user = await new Promise((resolve) => {
        let done = false, unsub = function () {};
        const timer = setTimeout(() => { if (done) return; done = true; unsub(); resolve(auth.currentUser || null); }, 2500);
        unsub = authMod.onAuthStateChanged(auth, (next) => { if (done) return; done = true; clearTimeout(timer); unsub(); resolve(next || null); });
      });
      return user ? user.getIdToken() : "";
    } catch (_e) { return ""; }
  }

  function applyProgress(rows) {
    const map = new Map();
    (Array.isArray(rows) ? rows : []).forEach((row) => {
      const id = String(row.quizKey || row.quizId || "").trim();
      if (!id) return;
      map.set(id, { quizKey: id, completedAt: row.completedAt, bestPercentage: number(row.bestPercentage, row.percentage), percentage: number(row.percentage), attemptCount: Math.max(1, number(row.attemptCount, 1)), rank: row.rank == null ? null : number(row.rank, 0), rankedUsers: row.rankedUsers == null ? null : number(row.rankedUsers, 0), hasRankedAttempt: row.hasRankedAttempt === true });
    });
    progressByQuiz = map.size ? map : readLocalProgress();
    render();
  }

  async function loadProgress() {
    progressByQuiz = readLocalProgress(); render();
    const token = await getIdToken(); if (!token) return;
    try {
      const response = await fetch(PROGRESS_API, { method: "GET", mode: "cors", cache: "no-store", headers: { Accept: "application/json", Authorization: `Bearer ${token}` } });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || data.success !== true) return;
      applyProgress(data.progress);
    } catch (_e) {}
  }

  enhanceFilterUi();
  if (subjectSelect) subjectSelect.addEventListener("change", resetPageAndRender);
  if (searchInput) searchInput.addEventListener("input", resetPageAndRender);
  if (resetButton) resetButton.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (subjectSelect) subjectSelect.value = "";
    resetPageAndRender();
  });
  if (pagination) pagination.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;
    currentPage = Math.max(1, Number(button.dataset.page) || 1);
    render();
    const head = root.querySelector(".family-list-head");
    if (head) head.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.addEventListener("gju:admin-quiz-index-ready", load);

  load();
  loadProgress();
}());