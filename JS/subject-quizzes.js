(function () {
  "use strict";

  const page = document.querySelector("[data-subject-quiz-page]");
  if (!page) return;

  const list = document.querySelector("[data-subject-quiz-list]");
  const count = document.querySelector("[data-subject-quiz-count]");
  const countLabel = document.querySelector("[data-subject-count-label]");
  const empty = document.querySelector("[data-subject-quiz-empty]");
  const topicSelect = document.querySelector("[data-subject-topic-select]");
  const search = document.querySelector("[data-subject-search]");
  const activeTopicLabel = document.querySelector("[data-active-topic-label]");

  const PAGE_SIZE = 12;
  const PROGRESS_API = "https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
  const LOCAL_ATTEMPTS_KEY = "GovJobUpdatesQuiz.attempts";

  function slugify(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const examSlug = slugify(page.dataset.examSlug || page.dataset.subjectSlug || "");
  const subjectName = String(page.dataset.subjectName || "Subject").trim();
  if (!examSlug || !list) return;

  let activeTopic = "all";
  let allItems = [];
  let publishedTopics = [];
  let loaded = false;
  let currentPage = 1;
  let pagination = null;
  let progressByQuiz = new Map();
  let firebaseImportPromise = null;

  /* ---------------------------------------------------------------- data */

  function number(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function percent(value) {
    return Math.max(0, Math.min(100, Math.round(number(value))));
  }

  function formatDate(value) {
    const d = new Date(value);
    return Number.isNaN(d.getTime())
      ? "Recent"
      : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function sourcePayload() {
    for (const source of [window.GJU_QUIZ_INDEX, window.GJU_ADMIN_QUIZ_INDEX, window.GJU_PUBLISHED_QUIZ_INDEX]) {
      if (Array.isArray(source)) return { quizzes: source };
      if (source && typeof source === "object") {
        const quizzes = Array.isArray(source.quizzes)
          ? source.quizzes
          : Array.isArray(source.items)
          ? source.items
          : Array.isArray(source.data)
          ? source.data
          : null;
        if (quizzes) return { quizzes };
      }
    }
    return null;
  }

  function getSubjectSlug(item) {
    return slugify(item.subjectSlug || item.subject_slug || (item.subject && item.subject.slug) || item.subject || "");
  }

  function getFamily(item) {
    return slugify(
      item.examFamilySlug ||
        item.exam_family_slug ||
        (item.examFamily && item.examFamily.slug) ||
        (item.exam_family && item.exam_family.slug) ||
        ""
    );
  }

  function getExamSlug(item) {
    return slugify(item.examSlug || item.exam_slug || (item.exam && item.exam.slug) || "");
  }

  function getTopics(item) {
    const raw = Array.isArray(item.topics) ? item.topics : [];
    const seen = new Set();
    return raw
      .map((topic) =>
        typeof topic === "string"
          ? { slug: slugify(topic), name: String(topic) }
          : { slug: slugify(topic && topic.slug), name: String((topic && topic.name) || (topic && topic.slug) || "") }
      )
      .filter((topic) => topic.slug && !seen.has(topic.slug) && (seen.add(topic.slug), true));
  }

  function dateValue(item, index) {
    for (const value of [item.publishedAt, item.published_at, item.updatedAt, item.updated_at, item.createdAt, item.created_at]) {
      if (value == null || value === "") continue;
      const numeric = Number(value);
      if (Number.isFinite(numeric) && numeric > 0) return numeric;
      const parsed = Date.parse(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return index;
  }

  function normalize(item, index) {
    const subjectSlug = getSubjectSlug(item);
    const quizSlug = slugify(item.quizSlug || item.quiz_slug || item.slug || item.id || item.title || "quiz") || "quiz";
    return {
      // Must match the family pages so saved attempts and ranks resolve to the same quiz key.
      id: `admin-${subjectSlug}-${quizSlug}`.replace(/-+/g, "-"),
      title: String(item.title || item.quizTitle || item.quiz_title || quizSlug).trim(),
      subjectSlug,
      family: getFamily(item),
      examSlug: getExamSlug(item),
      topics: getTopics(item),
      duration: Number(item.durationMinutes || item.duration_minutes) || 30,
      questions: Number(item.totalQuestions || item.total_questions || item.activeQuestions || item.active_questions) || 0,
      marks: Number(item.marksPerQuestion || item.marks_per_question) || 1,
      negative: Number(item.negativeMarks || item.negative_marks) || 0.25,
      order: dateValue(item, index),
    };
  }

  function topicName(slug) {
    const found = publishedTopics.find((topic) => topic.slug === slug);
    return found ? found.name : "All Topics";
  }

  /* ------------------------------------------------------------ progress */

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
      const best = number(a.bestPercentage, a.percentage);
      const current = map.get(id);
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

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.GJU_FIREBASE_CONFIG && window.GJU_FIREBASE_CONFIG.apiKey) {
        resolve();
        return;
      }
      const existing = document.querySelector('script[src="' + src + '"]');
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
    if (loaded) render();
  }

  async function loadProgress() {
    progressByQuiz = readLocalProgress();
    if (loaded) render();
    const token = await getIdToken();
    if (!token) return;
    try {
      const response = await fetch(PROGRESS_API, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        headers: { Accept: "application/json", Authorization: "Bearer " + token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || data.success !== true) return;
      applyProgress(data.progress);
    } catch (_e) {}
  }

  /* -------------------------------------------------------------- markup */

  function rankText(p) {
    const rank = number(p && p.rank, 0);
    const total = number(p && p.rankedUsers, 0);
    return rank > 0 && total > 0 ? "#" + rank + " / " + total : "—";
  }

  function progressMarkup(item) {
    const p = progressByQuiz.get(item.id);
    if (!p) {
      return (
        '<div class="subject-user-progress is-empty">' +
        '<span><i class="far fa-calendar" aria-hidden="true"></i><b>Last Attempt</b><em>Not attempted</em></span>' +
        '<span><i class="fas fa-trophy" aria-hidden="true"></i><b>Best Score</b><em>—</em></span>' +
        '<span><i class="fas fa-medal" aria-hidden="true"></i><b>Rank</b><em>—</em></span>' +
        "</div>"
      );
    }
    const best = percent(p.bestPercentage);
    return (
      '<div class="subject-user-progress">' +
      '<span><i class="far fa-calendar" aria-hidden="true"></i><b>Last Attempt</b><em>' + esc(formatDate(p.completedAt)) + "</em></span>" +
      '<span><i class="fas fa-trophy" aria-hidden="true"></i><b>Best Score</b><em>' + best + "%</em></span>" +
      '<span><i class="fas fa-medal" aria-hidden="true"></i><b>Rank</b><em>' + esc(rankText(p)) + "</em></span>" +
      "</div>" +
      '<div class="subject-score-bar" role="img" aria-label="Best score ' + best + ' percent"><i style="width:' + best + '%"></i></div>'
    );
  }

  function card(item) {
    const p = progressByQuiz.get(item.id);
    const attempts = number(p && p.attemptCount, 0);
    const reattempt = attempts > 0;
    const href =
      "quiz-attempt.html?quiz=" + encodeURIComponent(item.id) + "&family=topic-wise&subject=" + encodeURIComponent(examSlug);
    const topicText = item.topics.length ? item.topics.slice(0, 2).map((topic) => topic.name).join(" · ") : "Mixed Practice";
    const label = reattempt ? "Reattempt Quiz" : "Start Quiz";
    const icon = reattempt ? "fas fa-rotate-right" : "fas fa-arrow-right";
    const status = reattempt
      ? '<span class="subject-quiz-status is-done"><i class="fas fa-circle-check" aria-hidden="true"></i> Attempted' +
        (attempts > 1 ? " &times;" + attempts : "") +
        "</span>"
      : '<span class="subject-quiz-status"><i class="fas fa-unlock-keyhole" aria-hidden="true"></i> Free</span>';

    return (
      '<article class="subject-quiz-card' + (reattempt ? " is-attempted" : "") + '">' +
      '<div class="subject-quiz-card-top">' +
      '<span class="subject-quiz-family">Topic Wise</span>' +
      status +
      "</div>" +
      '<span class="subject-quiz-exam">' + esc(topicText) + "</span>" +
      "<h3>" + esc(item.title) + "</h3>" +
      '<div class="subject-quiz-meta" aria-label="Quiz details">' +
      '<span><i class="far fa-circle-question" aria-hidden="true"></i><small>Questions</small><strong>' + (item.questions || "—") + "</strong></span>" +
      '<span><i class="far fa-clock" aria-hidden="true"></i><small>Duration</small><strong>' + item.duration + " min</strong></span>" +
      '<span><i class="fas fa-scale-balanced" aria-hidden="true"></i><small>Marking</small><strong>+' + item.marks + " / -" + item.negative + "</strong></span>" +
      "</div>" +
      progressMarkup(item) +
      '<div class="subject-card-actions">' +
      '<a class="subject-quiz-start' + (reattempt ? " is-reattempt" : "") + '" href="' + href + '" aria-label="' + label + ": " + esc(item.title) + '"><span>' + label + '</span><i class="' + icon + '" aria-hidden="true"></i></a>' +
      "</div>" +
      "</article>"
    );
  }

  /* ---------------------------------------------------------- pagination */

  function ensurePagination() {
    if (pagination) return pagination;
    pagination = document.querySelector("[data-subject-pagination]");
    if (!pagination && list && list.parentNode) {
      list.insertAdjacentHTML(
        "afterend",
        '<nav class="subject-pagination" data-subject-pagination aria-label="Quiz pages" hidden></nav>'
      );
      pagination = document.querySelector("[data-subject-pagination]");
    }
    if (pagination && !pagination.dataset.bound) {
      pagination.dataset.bound = "1";
      pagination.addEventListener("click", (event) => {
        const button = event.target.closest("[data-page]");
        if (!button || button.disabled) return;
        currentPage = Math.max(1, Number(button.dataset.page) || 1);
        render();
        const anchor = document.getElementById("subject-sets") || list;
        if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    return pagination;
  }

  function renderPagination(total) {
    const nav = ensurePagination();
    if (!nav) return;
    const pages = Math.ceil(total / PAGE_SIZE);
    if (pages <= 1) {
      nav.innerHTML = "";
      nav.hidden = true;
      return;
    }
    nav.hidden = false;
    currentPage = Math.min(Math.max(1, currentPage), pages);
    const start = (currentPage - 1) * PAGE_SIZE + 1;
    const end = Math.min(currentPage * PAGE_SIZE, total);
    let html =
      '<button class="subject-page-btn" type="button" data-page="' + (currentPage - 1) + '" ' +
      (currentPage === 1 ? "disabled" : "") +
      ' aria-label="Previous page"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>';
    for (let p = 1; p <= pages; p += 1) {
      html +=
        '<button class="subject-page-btn" type="button" data-page="' + p + '" ' +
        (p === currentPage ? 'aria-current="page"' : "") +
        ">" + p + "</button>";
    }
    html +=
      '<button class="subject-page-btn" type="button" data-page="' + (currentPage + 1) + '" ' +
      (currentPage === pages ? "disabled" : "") +
      ' aria-label="Next page"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>';
    html += '<span class="subject-page-summary">Showing ' + start + "–" + end + " of " + total + " quizzes</span>";
    nav.innerHTML = html;
  }

  /* -------------------------------------------------------------- render */

  function render() {
    const query = String((search && search.value) || "").trim().toLocaleLowerCase();
    const visible = allItems.filter(
      (item) =>
        (activeTopic === "all" || item.topics.some((topic) => topic.slug === activeTopic)) &&
        (!query || [item.title, ...item.topics.map((topic) => topic.name)].join(" ").toLocaleLowerCase().includes(query))
    );

    const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = visible.slice(startIndex, startIndex + PAGE_SIZE);

    list.innerHTML = pageItems.map(card).join("");
    list.setAttribute("aria-busy", "false");
    list.hidden = visible.length === 0;

    if (count) count.textContent = String(visible.length);
    if (countLabel) {
      countLabel.textContent = (visible.length === 1 ? "quiz" : "quizzes") + " available" + (query ? " matching your search" : "");
    }
    if (activeTopicLabel) activeTopicLabel.textContent = activeTopic === "all" ? "All Topics" : topicName(activeTopic);

    if (empty) {
      empty.hidden = visible.length !== 0;
      empty.innerHTML = allItems.length
        ? '<h3>No matching quizzes</h3><p>Try another title or topic, or clear your filters to see every available set.</p><button type="button" data-clear-subject-filters>Clear filters</button>'
        : "<h3>" + esc(subjectName) + ' practice is growing</h3><p>No topic-wise sets are published here yet. Explore exam-based practice in the meantime.</p><a href="quiz.html#examQuizFamilies">Explore exam quizzes →</a>';
    }

    renderPagination(visible.length);
  }

  function resetPageAndRender() {
    currentPage = 1;
    render();
  }

  function setTopic(slug) {
    activeTopic = slug || "all";
    if (topicSelect) topicSelect.value = activeTopic;
    resetPageAndRender();
  }

  function buildPublishedTopics() {
    const map = new Map();
    allItems.forEach((item) =>
      item.topics.forEach((topic) => {
        const current = map.get(topic.slug) || { slug: topic.slug, name: topic.name, count: 0 };
        current.count += 1;
        if (!current.name && topic.name) current.name = topic.name;
        map.set(topic.slug, current);
      })
    );
    publishedTopics = [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  function renderTopicControls() {
    if (topicSelect) {
      topicSelect.innerHTML =
        '<option value="all">All Topics (' + allItems.length + ")</option>" +
        publishedTopics
          .map((topic) => '<option value="' + esc(topic.slug) + '">' + esc(topic.name) + " (" + topic.count + ")</option>")
          .join("");
      topicSelect.value = activeTopic;
      topicSelect.disabled = publishedTopics.length === 0;
    }
  }

  function load() {
    const source = sourcePayload();
    if (!source) return false;
    allItems = source.quizzes
      .filter((item) => item && typeof item === "object")
      .map(normalize)
      .filter((item) => item.family === "topic-wise" && item.examSlug === examSlug)
      .sort((a, b) => b.order - a.order);
    buildPublishedTopics();
    if (activeTopic !== "all" && !publishedTopics.some((topic) => topic.slug === activeTopic)) activeTopic = "all";
    renderTopicControls();
    loaded = true;
    render();
    return true;
  }

  function showLoadError() {
    if (loaded) return;
    list.hidden = true;
    list.setAttribute("aria-busy", "false");
    if (topicSelect) {
      topicSelect.innerHTML = '<option value="all">Topics unavailable</option>';
      topicSelect.disabled = true;
    }
    if (count) count.textContent = "";
    if (countLabel) countLabel.textContent = "Practice sets could not be loaded";
    if (pagination) pagination.hidden = true;
    if (empty) {
      empty.hidden = false;
      empty.innerHTML =
        '<h3>We could not load the quizzes</h3><p>Please refresh this page to try again. You can still read the study guide below.</p><button type="button" data-retry-subject>Try again</button>';
    }
  }

  /* ---------------------------------------------------------------- wire */

  if (topicSelect) topicSelect.addEventListener("change", () => setTopic(topicSelect.value));
  if (search) {
    search.addEventListener("input", () => {
      if (loaded) resetPageAndRender();
    });
  }
  if (empty) {
    empty.addEventListener("click", (event) => {
      if (event.target.closest("[data-clear-subject-filters]")) {
        if (search) search.value = "";
        setTopic("all");
        if (search) search.focus();
      }
      if (event.target.closest("[data-retry-subject]")) window.location.reload();
    });
  }
  document.addEventListener("gju:admin-quiz-index-ready", () => load());

  ensurePagination();
  load();
  loadProgress();
  window.setTimeout(() => {
    if (!loaded) load();
  }, 900);
  window.setTimeout(() => {
    if (!loaded && !load()) showLoadError();
  }, 8000);
})();