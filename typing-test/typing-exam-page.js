(function () {
  "use strict";

  const EXAMS = {
    "ssc-chsl": {
      title: "SSC CHSL Typing",
      category: "SSC",
      icon: "fas fa-building-columns",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description:
        "Practice SSC CHSL typing with timed passages, WPM, accuracy, character errors, and target status. This typing test is free forever with no charge."
    },
    "ssc-cgl-dest": {
      title: "SSC CGL DEST",
      category: "SSC",
      icon: "fas fa-file-lines",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english"],
      description:
        "Practice data-entry speed and accuracy for SSC CGL DEST preparation. This typing test is free forever with no charge."
    },
    "delhi-police-hc-ministerial": {
      title: "Delhi Police Head Constable Ministerial",
      category: "SSC",
      icon: "fas fa-shield-halved",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description:
        "Practice Delhi Police Head Constable Ministerial typing with English 30 WPM and Hindi 25 WPM targets. This typing test is free forever with no charge."
    },
    "ssc-stenographer": {
      title: "SSC Stenographer Transcription Practice",
      category: "SSC",
      icon: "fas fa-microphone-lines",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description:
        "Practice paragraph typing and transcription rhythm for SSC Stenographer preparation. This typing test is free forever with no charge."
    },
    "ssc-selection-post": {
      title: "SSC Selection Post Skill Practice",
      category: "SSC",
      icon: "fas fa-list-check",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description:
        "Practice typing and skill-test preparation for applicable SSC Selection Post categories. This typing test is free forever with no charge."
    },
    "rrb-ntpc": {
      title: "RRB NTPC Typing",
      category: "Railway",
      icon: "fas fa-train",
      logoClass: "gju-typing-logo-railway",
      languages: ["english", "hindi"],
      description:
        "Practice Railway NTPC typing with timed passages, WPM, accuracy and result tracking. This typing test is free forever with no charge."
    },
    "railway-junior-clerk": {
      title: "Railway Junior Clerk Typing",
      category: "Railway",
      icon: "fas fa-clipboard-list",
      logoClass: "gju-typing-logo-railway",
      languages: ["english", "hindi"],
      description:
        "Practice typing for Railway Junior Clerk cum Typist preparation. This typing test is free forever with no charge."
    },
    "railway-accounts-clerk": {
      title: "Accounts Clerk Typing",
      category: "Railway",
      icon: "fas fa-calculator",
      logoClass: "gju-typing-logo-railway",
      languages: ["english", "hindi"],
      description:
        "Practice accounts clerical typing with timed passages and accuracy tracking. This typing test is free forever with no charge."
    },
    "upsssc-junior-assistant": {
      title: "UPSSSC Junior Assistant Typing",
      category: "UP Government",
      icon: "fas fa-landmark",
      logoClass: "gju-typing-logo-up",
      languages: ["hindi", "english"],
      description:
        "Practice Hindi Unicode and English typing for UPSSSC Junior Assistant preparation. This typing test is free forever with no charge."
    },
    "up-police-computer-operator": {
      title: "UP Police Computer Operator",
      category: "UP Government",
      icon: "fas fa-shield-halved",
      logoClass: "gju-typing-logo-up",
      languages: ["hindi", "english"],
      description:
        "Practice typing for UP Police Computer Operator preparation with timed passages and accuracy. This typing test is free forever with no charge."
    },
    "up-clerical": {
      title: "UP Government Clerical Typing",
      category: "UP Government",
      icon: "fas fa-briefcase",
      logoClass: "gju-typing-logo-up",
      languages: ["hindi", "english"],
      description:
        "Practice for UP clerical, junior assistant, secretariat, and court typing preparation. This typing test is free forever with no charge."
    },
    "general-hindi": {
      title: "Hindi Typing Test",
      category: "General",
      icon: "fas fa-language",
      logoClass: "gju-typing-logo-general",
      languages: ["hindi"],
      description:
        "Practice Hindi Unicode typing with configurable duration, WPM target, accuracy target, and difficulty. This typing test is free forever with no charge."
    },
    "general-english": {
      title: "English Typing Test",
      category: "General",
      icon: "fas fa-font",
      logoClass: "gju-typing-logo-general",
      languages: ["english"],
      description:
        "Practice English typing speed and accuracy with custom targets and clear results. This typing test is free forever with no charge."
    },
    "banking-language-practice": {
      title: "Banking Language Practice",
      category: "Banking",
      icon: "fas fa-building-columns",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description:
        "Practice typing and language confidence for banking clerical preparation. This typing test is free forever with no charge."
    },
    "ibps-clerk-csa-practice": {
      title: "IBPS Clerk/CSA Practice",
      category: "Banking",
      icon: "fas fa-user-tie",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description:
        "Typing and language practice support for IBPS Clerk/CSA preparation. This typing test is free forever with no charge."
    },
    "sbi-clerk-practice": {
      title: "SBI Clerk Practice",
      category: "Banking",
      icon: "fas fa-landmark",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description:
        "Typing and language practice support for SBI Clerk preparation. This typing test is free forever with no charge."
    },
    "rbi-assistant-language-practice": {
      title: "RBI Assistant Practice",
      category: "Banking",
      icon: "fas fa-indian-rupee-sign",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description:
        "Practice support for RBI Assistant language proficiency preparation. This typing test is free forever with no charge."
    }
  };

  // Short-set counts before long catalog excerpts are appended.
  const difficultyCountsByLanguage = {
    english: { easy: 18, medium: 12, hard: 12 },
    hindi: { easy: 18, medium: 12, hard: 12 }
  };

  const difficulties = [
    { id: "easy", label: "Easy Level" },
    { id: "medium", label: "Medium Level" },
    { id: "hard", label: "Hard Level" }
  ];

  const durationByPreset = {
    "ssc-cgl-dest": 15,
    "delhi-police-hc-ministerial": 10,
    "upsssc-junior-assistant": 5,
    "up-police-computer-operator": 15,
    "up-clerical": 5,
    "ssc-stenographer": 40
  };

  // Friendly titles for short practice sets (cycled when index exceeds list).
  const SHORT_TITLES = {
    english: {
      easy: [
        "Focus & Steady Routine",
        "Official Sources First",
        "Type Exactly as Shown",
        "Speed with Control",
        "Forms & Notices Practice",
        "Spacing & Punctuation",
        "Calm Timed Attempt",
        "Clean Keyboard Habits",
        "Accuracy Before Speed",
        "Line Break Discipline",
        "Daily Practice Rhythm",
        "Error Review Habit",
        "Passage Reading First",
        "Steady Finger Flow",
        "No Extra Spaces",
        "Capital Letters Care",
        "Paragraph Continuity",
        "Finish Strong"
      ],
      medium: [
        "Balance Speed & Accuracy",
        "Clerical Work Language",
        "Official Style Typing",
        "Timed Medium Passage",
        "Careful Word Groups",
        "Recruitment Text Practice",
        "Consistent Rhythm Set",
        "Punctuation Control",
        "Medium Difficulty Drill",
        "Screen Exact Copy",
        "Work-Order Style Text",
        "Medium Endurance Set"
      ],
      hard: [
        "Disciplined Revision Focus",
        "Posture & Group Reading",
        "Every Character Counts",
        "Hard Timed Challenge",
        "Mistake Pattern Review",
        "Long Attention Span",
        "High Accuracy Pressure",
        "Complex Sentence Flow",
        "Hard Endurance Drill",
        "Exact Copy Under Time",
        "Advanced Rhythm Set",
        "Final Hard Practice"
      ]
    },
    hindi: {
      easy: [
        "नियमित अभ्यास सेट",
        "शुद्धता के साथ गति",
        "आधिकारिक जानकारी",
        "मात्रा और अक्षर",
        "शांत टाइपिंग अभ्यास",
        "स्पेस और विराम",
        "दैनिक हिंदी अभ्यास",
        "गलती सुधार आदत",
        "पंक्ति अनुशासन",
        "आसान समयबद्ध सेट",
        "यूनिकोड आदत",
        "शुद्ध वाक्य लेखन",
        "आसान अभ्यास 13",
        "आसान अभ्यास 14",
        "आसान अभ्यास 15",
        "आसान अभ्यास 16",
        "आसान अभ्यास 17",
        "आसान अभ्यास 18"
      ],
      medium: [
        "मध्यम गति अभ्यास",
        "कौशल परीक्षा तैयारी",
        "शुद्ध शब्द चयन",
        "मध्यम समयबद्ध सेट",
        "विराम चिह्न नियंत्रण",
        "नियमित सुधार सेट",
        "मध्यम कठिनाई अभ्यास",
        "सटीक प्रतिलिपि",
        "मध्यम सहनशीलता",
        "कार्यालय शैली पाठ",
        "मध्यम अभ्यास 11",
        "मध्यम अभ्यास 12"
      ],
      hard: [
        "कठिन शुद्धता अभ्यास",
        "संयुक्त अक्षर ध्यान",
        "कठिन समयबद्ध सेट",
        "उच्च एकाग्रता",
        "कठिन सहनशीलता",
        "विस्तृत वाक्य प्रवाह",
        "कठिन अंतिम अभ्यास",
        "सटीक यूनिकोड सेट",
        "कठिन अभ्यास 9",
        "कठिन अभ्यास 10",
        "कठिन अभ्यास 11",
        "कठिन अभ्यास 12"
      ]
    }
  };

  function init() {
    const main = document.querySelector("main.typing-test-page");
    if (!main) return;

    const iframe = main.querySelector('iframe[src*="app.html?preset="]');
    const iframePreset = iframe
      ? new URL(iframe.getAttribute("src"), window.location.href).searchParams.get("preset")
      : "";
    const presetId = main.dataset.typingPreset || iframePreset || "";
    const exam = EXAMS[presetId];
    if (!exam) return;

    main.classList.add("gju-typing-exam-detail-page");

    if (!main.querySelector(".gju-typing-passage-panel")) {
      main.innerHTML = buildPage(presetId, exam);
    }

    bindLanguage(main);
  }

  function buildPage(presetId, exam) {
    const defaultLanguage = exam.languages[0] || "english";
    const ruleNote =
      window.GJU_TYPING_CONFIG?.getPreset(presetId)?.officialRuleNote ||
      "Practice benchmarks only. Verify the selected recruitment’s official instructions.";

    return `
<nav class="typing-breadcrumb" aria-label="Breadcrumb">
  <a href="index.html">All typing tests</a>
  <span aria-hidden="true">/</span>
  <span>${escapeHtml(exam.title)}</span>
</nav>

<section class="gju-typing-exam-detail-card">
  <div class="gju-typing-hero-copy">
    <div class="gju-typing-hero-topline">
      <div class="gju-typing-exam-logo ${exam.logoClass}">
        <i class="${exam.icon}" aria-hidden="true"></i>
      </div>
      <p class="gju-typing-exam-category">${escapeHtml(exam.category)} Typing Practice</p>
    </div>
    <h1>${escapeHtml(exam.title)}</h1>
    <p>${escapeHtml(exam.description)}</p>
    <div class="gju-typing-hero-actions">
      <a class="gju-typing-hero-start" href="#typingLanguageTitle">
        <i class="fas fa-keyboard" aria-hidden="true"></i> Choose your practice
      </a>
      <span class="gju-typing-free-note">
        <i class="fas fa-gift" aria-hidden="true"></i> Free forever. No charge.
      </span>
    </div>
  </div>
  <div class="gju-typing-hero-summary" aria-label="Typing test highlights">
    <article><span>Timer</span><strong>${getDurationLabel(exam)}</strong></article>
    <article><span>Mode</span><strong>Typing practice</strong></article>
    <article><span>Result</span><strong>WPM + Accuracy</strong></article>
    <article><span>Passages</span><strong data-typing-total-sets>${getTotalSetCount(defaultLanguage)} Sets</strong></article>
  </div>
</section>

<section class="gju-typing-rules-box">
  <strong><i class="fas fa-circle-info" aria-hidden="true"></i> Typing Rules</strong>
  <span>${escapeHtml(ruleNote)}</span>
</section>

<section class="gju-typing-language-panel" aria-labelledby="typingLanguageTitle">
  <h2 id="typingLanguageTitle">1. Choose language</h2>
  <div class="gju-typing-language-buttons">
    ${exam.languages
      .map(
        (language, index) =>
          `<button class="gju-typing-language-btn${index === 0 ? " is-selected" : ""}" type="button" data-language="${language}" aria-pressed="${index === 0 ? "true" : "false"}">${label(language)}</button>`
      )
      .join("")}
  </div>
  <p>Showing <span id="typingSelectedLanguage">${label(defaultLanguage)}</span> passages.</p>
</section>

<section class="gju-typing-passage-panel" aria-labelledby="typingPassagesTitle" data-preset-id="${escapeHtml(presetId)}" data-language="${escapeHtml(defaultLanguage)}">
  <div class="gju-typing-passage-heading">
    <span class="gju-typing-section-label">Practice Sets</span>
    <h2 id="typingPassagesTitle">2. Pick your practice level</h2>
    <p>Start with Easy, move to Medium, and finish with Hard for a complete typing routine.</p>
  </div>
  <div class="typing-level-filters" aria-label="Passage difficulty">
    ${difficulties
      .map(
        (level, index) =>
          `<button type="button" data-level-filter="${level.id}" aria-pressed="${index === 0}">${label(level.id)}</button>`
      )
      .join("")}
  </div>
  <p class="typing-selection-summary" id="typingSelectionSummary" role="status"></p>
  <aside class="typing-rank-invite" aria-label="Optional ranked attempts">
    <div>
      <strong data-rank-invite-title>Want to see your rank?</strong>
      <p data-rank-invite-copy>Sign in before starting to compare your eligible result with other students on this passage. Complete the full timer for ranking.</p>
    </div>
    <a data-typing-rank-login href="../HTML/login.html?redirect=typing-return.html">Sign in for ranked attempt</a>
  </aside>
  <div class="typing-quick-start">
    <p>Start practising without login. Sign in before starting only if you want a ranked attempt. Use a physical keyboard for practice.</p>
    <a id="typingQuickStart" href="app.html?preset=${encodeURIComponent(presetId)}&language=${defaultLanguage}&difficulty=easy&passage=0">Start Easy practice</a>
  </div>
  <div id="typingPassageLevels"></div>
  <button class="typing-show-more" id="typingShowMore" type="button" hidden>Show more passages</button>
</section>

<div class="gju-typing-exam-info-grid">
  ${buildDescriptionSection(exam)}
  ${buildHowItWorksSection()}
</div>
${buildFaqSection(exam.title)}
`;
  }

  function buildDescriptionSection(exam) {
    return `
<section class="gju-typing-info-section" aria-labelledby="typingDescriptionTitle">
  <div class="gju-typing-section-label">Description</div>
  <h2 id="typingDescriptionTitle">About ${escapeHtml(exam.title)}</h2>
  <p>${escapeHtml(exam.description)} It is designed for students who want simple, focused typing practice with passage-wise attempts, live accuracy, WPM, typed words and final result tracking.</p>
</section>`;
  }

  function getDurationLabel(exam) {
    const presetId = Object.keys(EXAMS).find((key) => EXAMS[key] === exam);
    return `${window.GJU_TYPING_CONFIG?.getPreset(presetId)?.duration || durationByPreset[presetId] || 10} min`;
  }

  function getDifficulties(language) {
    const counts = difficultyCountsByLanguage[language] || difficultyCountsByLanguage.english;
    return difficulties.map((difficulty) => ({
      ...difficulty,
      count:
        (counts[difficulty.id] || 0) +
        (window.GJU_TYPING_LONG_CATALOG?.[language]?.[difficulty.id]?.length || 0)
    }));
  }

  function getTotalSetCount(language) {
    return getDifficulties(language).reduce((total, difficulty) => total + difficulty.count, 0);
  }

  function buildHowItWorksSection() {
    return `
<section class="gju-typing-how-section" aria-labelledby="typingHowTitle">
  <div class="gju-typing-section-label">How it works</div>
  <h2 id="typingHowTitle">How to use this typing test</h2>
  <div class="gju-typing-how-grid">
    <div><strong>1. Select language</strong><span>Choose Hindi or English when both options are available.</span></div>
    <div><strong>2. Pick a passage</strong><span>Select Easy, Medium or Hard practice according to your level.</span></div>
    <div><strong>3. Start typing</strong><span>The timer starts automatically when you type the first character.</span></div>
    <div><strong>4. Check result</strong><span>Submit to review WPM, accuracy, typed words, errors and target status.</span></div>
  </div>
</section>`;
  }

  function buildFaqSection(title) {
    const safeTitle = escapeHtml(title);
    return `
<section class="gju-typing-faq-section" aria-labelledby="typingFaqTitle">
  <div class="gju-typing-section-label">Student FAQs</div>
  <h2 id="typingFaqTitle">${safeTitle} FAQs</h2>
  <details open>
    <summary>Is this typing test free?</summary>
    <p>Yes. GovJobUpdates typing tests are free for students and will remain free forever. There is no charge and no hidden fee.</p>
  </details>
  <details>
    <summary>How do I start this typing test?</summary>
    <p>Select a language and passage level, then click Start Practice. The timer starts when you type the first character.</p>
  </details>
  <details>
    <summary>Will this typing test help for government exams?</summary>
    <p>Yes. It is made for exam-style typing practice with timed passages, WPM, accuracy, typed words and error tracking.</p>
  </details>
  <details>
    <summary>Is this an official exam test?</summary>
    <p>No. This is a student practice tool. Always verify the latest official notification for exact typing or skill-test rules.</p>
  </details>
  <details>
    <summary>What result details will I get?</summary>
    <p>The attempt screen shows WPM, accuracy, typed words, character errors, and target status after submission.</p>
  </details>
</section>`;
  }

  function buildDifficultyTable(presetId, language, difficulty) {
    return `
<section class="gju-typing-passage-level" data-difficulty="${difficulty.id}">
  <h3><i class="fas fa-circle-check" aria-hidden="true"></i> ${difficulty.label}</h3>
  <div class="gju-typing-passage-card-grid">
    ${Array.from({ length: difficulty.count }, (_, index) =>
      buildPassageCard(presetId, language, difficulty.id, index + 1)
    ).join("")}
  </div>
</section>`;
  }

  function getShortTitle(language, difficulty, number) {
    const list = SHORT_TITLES[language]?.[difficulty] || SHORT_TITLES.english[difficulty] || [];
    if (!list.length) return `Practice Set ${String(number).padStart(2, "0")}`;
    return list[(number - 1) % list.length];
  }

  function buildPassageCard(presetId, language, difficulty, number) {
    const href = `app.html?preset=${encodeURIComponent(presetId)}&language=${encodeURIComponent(language)}&difficulty=${encodeURIComponent(difficulty)}&passage=${number - 1}`;
    const originalCount = difficultyCountsByLanguage[language]?.[difficulty] || 0;
    const longIndex = number - originalCount - 1;
    const extra =
      longIndex >= 0
        ? window.GJU_TYPING_LONG_CATALOG?.[language]?.[difficulty]?.[longIndex]
        : null;

    let title;
    let description;
    let sizePill;
    let typePill;

    if (extra) {
      title = extra.title;
      description = `${extra.author}${extra.year ? ` · ${extra.year}` : ""}. Classic literature excerpt for endurance practice.`;
      sizePill = `~${Number(extra.words).toLocaleString("en-IN")} words`;
      typePill = "Long excerpt";
    } else {
      title = getShortTitle(language, difficulty, number);
      description =
        language === "hindi"
          ? "छोटा समयबद्ध अभ्यास सेट। पहला अक्षर टाइप करते ही टाइमर शुरू होगा। पहले शुद्धता, फिर गति।"
          : "Short timed practice set. Timer starts on the first keystroke. Focus on accuracy first, then speed.";
      sizePill = "Short set";
      typePill = label(difficulty);
    }

    return `
<article class="gju-typing-passage-card">
  <div class="gju-typing-passage-card-head">
    <span class="gju-typing-card-kicker">${escapeHtml(typePill)}</span>
    <h4>${escapeHtml(title)}</h4>
    <p>${escapeHtml(description)}</p>
    <div class="gju-typing-set-meta">
      <span class="gju-typing-meta-pill">${label(language)}</span>
      <span class="gju-typing-meta-pill" data-typing-duration-pill>${durationLabel(presetId)}</span>
      <span class="gju-typing-meta-pill">${escapeHtml(sizePill)}</span>
      <span class="gju-typing-meta-pill">#${number}</span>
    </div>
  </div>
  <div class="gju-typing-card-foot">
    <a class="gju-typing-start-btn" href="${href}">
      <i class="fas fa-play" aria-hidden="true"></i> Start Practice
    </a>
  </div>
</article>`;
  }

  function renderPassageLevels(panel, presetId, language) {
    let levelsHost = panel.querySelector("#typingPassageLevels");
    if (!levelsHost) {
      levelsHost = document.createElement("div");
      levelsHost.id = "typingPassageLevels";
      const more = panel.querySelector("#typingShowMore");
      if (more) panel.insertBefore(levelsHost, more);
      else panel.appendChild(levelsHost);
    }

    // Remove any legacy static level sections outside the host.
    panel.querySelectorAll(".gju-typing-passage-level").forEach((section) => {
      if (!levelsHost.contains(section)) section.remove();
    });

    levelsHost.innerHTML = getDifficulties(language)
      .map((difficulty) => buildDifficultyTable(presetId, language, difficulty))
      .join("");
  }

  function bindLanguage(main) {
    const buttons = Array.from(main.querySelectorAll(".gju-typing-language-btn"));
    const labelNode = main.querySelector("#typingSelectedLanguage");
    const totalSetsNode = main.querySelector("[data-typing-total-sets]");
    const panel = main.querySelector(".gju-typing-passage-panel");
    const presetId = panel?.dataset.presetId || main.dataset.typingPreset || "";
    let activeLevel = "easy";
    let visibleLimit = 6;
    const levelButtons = Array.from(main.querySelectorAll("[data-level-filter]"));
    const more = main.querySelector("#typingShowMore");

    function updateSelection() {
      let total = 0;
      panel?.querySelectorAll(".gju-typing-passage-level").forEach((section) => {
        const selected = section.dataset.difficulty === activeLevel;
        section.hidden = !selected;
        const cards = Array.from(section.querySelectorAll(".gju-typing-passage-card"));
        cards.forEach((card, index) => {
          card.hidden = index >= visibleLimit;
        });
        if (selected) total = cards.length;
      });

      levelButtons.forEach((button) =>
        button.setAttribute("aria-pressed", String(button.dataset.levelFilter === activeLevel))
      );

      if (more) more.hidden = visibleLimit >= total;

      const language = panel?.dataset.language || "english";
      const summary = main.querySelector("#typingSelectionSummary");
      if (summary) {
        summary.textContent = `${label(language)} · ${label(activeLevel)} · Showing ${Math.min(visibleLimit, total)} of ${total} passages · ${durationLabel(presetId)} per attempt`;
      }

      const quick = main.querySelector("#typingQuickStart");
      if (quick) {
        quick.href = `app.html?preset=${encodeURIComponent(presetId)}&language=${language}&difficulty=${activeLevel}&passage=0`;
        quick.textContent = `Start ${label(activeLevel)} practice`;
      }
    }

    function applyLanguage(language) {
      if (labelNode) labelNode.textContent = label(language);
      if (totalSetsNode) totalSetsNode.textContent = `${getTotalSetCount(language)} Sets`;
      if (panel) {
        panel.dataset.language = language;
        renderPassageLevels(panel, presetId, language);
      }
      visibleLimit = 6;
      syncPassageMeta(main, presetId);
      updateSelection();
    }

    // Initial render: always build cards in JS (no static HTML bloat).
    const initialLanguage = panel?.dataset.language || buttons.find((b) => b.classList.contains("is-selected"))?.dataset.language || "english";
    applyLanguage(initialLanguage);

    levelButtons.forEach((button) =>
      button.addEventListener("click", () => {
        activeLevel = button.dataset.levelFilter;
        visibleLimit = 6;
        updateSelection();
      })
    );

    more?.addEventListener("click", () => {
      visibleLimit += 6;
      updateSelection();
    });

    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        const language = button.dataset.language || "english";
        buttons.forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-selected", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
        applyLanguage(language);
      })
    );
  }

  function syncPassageMeta(main, presetId) {
    main.querySelectorAll(".gju-typing-passage-card .gju-typing-set-meta").forEach((meta) => {
      const durationPill =
        meta.querySelector("[data-typing-duration-pill]") ||
        Array.from(meta.querySelectorAll(".gju-typing-meta-pill"))[1];
      if (durationPill) {
        durationPill.textContent = durationLabel(presetId);
        durationPill.setAttribute("data-typing-duration-pill", "");
      }
    });
  }

  function durationLabel(presetId) {
    return `${window.GJU_TYPING_CONFIG?.getPreset(presetId)?.duration || durationByPreset[presetId] || 10} min`;
  }

  function label(value) {
    return String(value || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[char]
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();