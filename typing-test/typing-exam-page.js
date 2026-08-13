(function () {
  "use strict";

  const EXAMS = {
    "ssc-chsl": {
      title: "SSC CHSL Typing",
      category: "SSC",
      icon: "fas fa-building-columns",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description: "Practice SSC CHSL typing with timed passages, WPM, accuracy, character errors, and target status. This typing test is free forever with no charge."
    },
    "ssc-cgl-dest": {
      title: "SSC CGL DEST",
      category: "SSC",
      icon: "fas fa-file-lines",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english"],
      description: "Practice data-entry speed and accuracy for SSC CGL DEST preparation. This typing test is free forever with no charge."
    },
    "delhi-police-hc-ministerial": {
      title: "Delhi Police Head Constable Ministerial",
      category: "SSC",
      icon: "fas fa-shield-halved",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description: "Practice Delhi Police Head Constable Ministerial typing with English 30 WPM and Hindi 25 WPM targets. This typing test is free forever with no charge."
    },
    "ssc-stenographer": {
      title: "SSC Stenographer Practice",
      category: "SSC",
      icon: "fas fa-microphone-lines",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description: "Practice paragraph typing and transcription rhythm for SSC Stenographer preparation. This typing test is free forever with no charge."
    },
    "ssc-selection-post": {
      title: "SSC Selection Post Skill Practice",
      category: "SSC",
      icon: "fas fa-list-check",
      logoClass: "gju-typing-logo-ssc",
      languages: ["english", "hindi"],
      description: "Practice typing and skill-test preparation for applicable SSC Selection Post categories. This typing test is free forever with no charge."
    },
    "rrb-ntpc": {
      title: "RRB NTPC Typing",
      category: "Railway",
      icon: "fas fa-train",
      logoClass: "gju-typing-logo-railway",
      languages: ["english", "hindi"],
      description: "Practice Railway NTPC typing with timed passages, WPM, accuracy and result tracking. This typing test is free forever with no charge."
    },
    "railway-junior-clerk": {
      title: "Railway Junior Clerk Typing",
      category: "Railway",
      icon: "fas fa-clipboard-list",
      logoClass: "gju-typing-logo-railway",
      languages: ["english", "hindi"],
      description: "Practice typing for Railway Junior Clerk cum Typist preparation. This typing test is free forever with no charge."
    },
    "railway-accounts-clerk": {
      title: "Accounts Clerk Typing",
      category: "Railway",
      icon: "fas fa-calculator",
      logoClass: "gju-typing-logo-railway",
      languages: ["english", "hindi"],
      description: "Practice accounts clerical typing with timed passages and accuracy tracking. This typing test is free forever with no charge."
    },
    "upsssc-junior-assistant": {
      title: "UPSSSC Junior Assistant Typing",
      category: "UP Government",
      icon: "fas fa-landmark",
      logoClass: "gju-typing-logo-up",
      languages: ["hindi", "english"],
      description: "Practice Hindi Unicode and English typing for UPSSSC Junior Assistant preparation. This typing test is free forever with no charge."
    },
    "up-police-computer-operator": {
      title: "UP Police Computer Operator",
      category: "UP Government",
      icon: "fas fa-shield-halved",
      logoClass: "gju-typing-logo-up",
      languages: ["hindi", "english"],
      description: "Practice typing for UP Police Computer Operator preparation with timed passages and accuracy. This typing test is free forever with no charge."
    },
    "up-clerical": {
      title: "UP Government Clerical Typing",
      category: "UP Government",
      icon: "fas fa-briefcase",
      logoClass: "gju-typing-logo-up",
      languages: ["hindi", "english"],
      description: "Practice for UP clerical, junior assistant, secretariat, and court typing preparation. This typing test is free forever with no charge."
    },
    "general-hindi": {
      title: "Hindi Typing Test",
      category: "General",
      icon: "fas fa-language",
      logoClass: "gju-typing-logo-general",
      languages: ["hindi"],
      description: "Practice Hindi Unicode typing with configurable duration, WPM target, accuracy target, and difficulty. This typing test is free forever with no charge."
    },
    "general-english": {
      title: "English Typing Test",
      category: "General",
      icon: "fas fa-font",
      logoClass: "gju-typing-logo-general",
      languages: ["english"],
      description: "Practice English typing speed and accuracy with custom targets and clear results. This typing test is free forever with no charge."
    },
    "banking-language-practice": {
      title: "Banking Language Practice",
      category: "Banking",
      icon: "fas fa-building-columns",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description: "Practice typing and language confidence for banking clerical preparation. This typing test is free forever with no charge."
    },
    "ibps-clerk-csa-practice": {
      title: "IBPS Clerk/CSA Practice",
      category: "Banking",
      icon: "fas fa-user-tie",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description: "Typing and language practice support for IBPS Clerk/CSA preparation. This typing test is free forever with no charge."
    },
    "sbi-clerk-practice": {
      title: "SBI Clerk Practice",
      category: "Banking",
      icon: "fas fa-landmark",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description: "Typing and language practice support for SBI Clerk preparation. This typing test is free forever with no charge."
    },
    "rbi-assistant-language-practice": {
      title: "RBI Assistant Practice",
      category: "Banking",
      icon: "fas fa-indian-rupee-sign",
      logoClass: "gju-typing-logo-banking",
      languages: ["english", "hindi"],
      description: "Practice support for RBI Assistant language proficiency preparation. This typing test is free forever with no charge."
    }
  };

  const difficulties = [
    { id: "easy", label: "Easy Level", count: 6 },
    { id: "medium", label: "Medium Level", count: 6 },
    { id: "hard", label: "Hard Level", count: 6 }
  ];

  const durationByPreset = {
    "ssc-cgl-dest": 15,
    "delhi-police-hc-ministerial": 10,
    "upsssc-junior-assistant": 5,
    "up-police-computer-operator": 15,
    "up-clerical": 5,
    "ssc-stenographer": 40
  };

  function init() {
    const main = document.querySelector("main.typing-test-page");
    const iframe = main?.querySelector('iframe[src*="app.html?preset="]');
    if (!main) return;

    const iframePreset = iframe ? new URL(iframe.getAttribute("src"), window.location.href).searchParams.get("preset") : "";
    const presetId = main.dataset.typingPreset || iframePreset || "";
    const exam = EXAMS[presetId];
    if (!exam) return;

    main.classList.add("gju-typing-exam-detail-page");
    if (main.querySelector(".gju-typing-passage-panel")) {
      bindLanguage(main);
      return;
    }
    main.innerHTML = buildPage(presetId, exam);
    bindLanguage(main);
  }

  function buildPage(presetId, exam) {
    const defaultLanguage = exam.languages[0] || "english";
    return `
      <section class="gju-typing-exam-detail-card">
        <div class="gju-typing-hero-copy">
          <div class="gju-typing-hero-topline">
            <div class="gju-typing-exam-logo ${exam.logoClass}"><i class="${exam.icon}" aria-hidden="true"></i></div>
            <p class="gju-typing-exam-category">${escapeHtml(exam.category)} Typing Practice</p>
          </div>
          <h1>${escapeHtml(exam.title)}</h1>
          <p>${escapeHtml(exam.description)}</p>
          <div class="gju-typing-hero-actions">
            <a class="gju-typing-hero-start" href="#typingPassagesTitle"><i class="fas fa-keyboard" aria-hidden="true"></i> Choose Passage</a>
            <span class="gju-typing-free-note"><i class="fas fa-gift" aria-hidden="true"></i> Free forever. No charge.</span>
          </div>
        </div>
        <div class="gju-typing-hero-summary" aria-label="Typing test highlights">
          <article><span>Timer</span><strong>${getDurationLabel(exam)}</strong></article>
          <article><span>Mode</span><strong>Exam Style</strong></article>
          <article><span>Result</span><strong>WPM + Accuracy</strong></article>
          <article><span>Passages</span><strong>18 Sets</strong></article>
        </div>
      </section>

      <section class="gju-typing-rules-box">
        <strong><i class="fas fa-circle-info" aria-hidden="true"></i> Typing Rules</strong>
        <span>Exam typing/skill-test requirements may vary according to the latest official recruitment notification. Always verify the official notification before relying on these settings.</span>
      </section>

      <div class="gju-typing-exam-info-grid">
        ${buildDescriptionSection(exam)}
        ${buildHowItWorksSection()}
      </div>

      <section class="gju-typing-language-panel" aria-labelledby="typingLanguageTitle">
        <h2 id="typingLanguageTitle">Select Language</h2>
        <div class="gju-typing-language-buttons">
          ${exam.languages.map((language, index) => `<button class="gju-typing-language-btn${index === 0 ? " is-selected" : ""}" type="button" data-language="${language}" aria-pressed="${index === 0 ? "true" : "false"}">${label(language)}</button>`).join("")}
        </div>
        <p>Showing <span id="typingSelectedLanguage">${label(defaultLanguage)}</span> passages.</p>
      </section>

      <section class="gju-typing-passage-panel" aria-labelledby="typingPassagesTitle" data-preset-id="${escapeHtml(presetId)}" data-language="${escapeHtml(defaultLanguage)}">
        <div class="gju-typing-passage-heading">
          <span class="gju-typing-section-label">Practice Sets</span>
          <h2 id="typingPassagesTitle">Choose a Passage</h2>
          <p>Start with Easy, move to Medium, and finish with Hard for a complete typing routine.</p>
        </div>
        ${difficulties.map((difficulty) => buildDifficultyTable(presetId, defaultLanguage, difficulty)).join("")}
      </section>

      ${buildFaqSection(exam.title)}
    `;
  }

  function buildDescriptionSection(exam) {
    return `
      <section class="gju-typing-info-section" aria-labelledby="typingDescriptionTitle">
        <div class="gju-typing-section-label">Description</div>
        <h2 id="typingDescriptionTitle">About ${escapeHtml(exam.title)}</h2>
        <p>${escapeHtml(exam.description)} It is designed for students who want simple, focused typing practice with passage-wise attempts, live accuracy, WPM, typed words and final result tracking.</p>
      </section>
    `;
  }

  function getDurationLabel(exam) {
    const presetId = Object.keys(EXAMS).find((key) => EXAMS[key] === exam);
    const minutes = durationByPreset[presetId] || 10;
    return `${minutes} min`;
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
      </section>
    `;
  }

  function buildFaqSection(title) {
    const safeTitle = escapeHtml(title);
    return `
      <section class="gju-typing-faq-section" aria-labelledby="typingFaqTitle">
        <div class="gju-typing-section-label">Student FAQs</div>
        <h2 id="typingFaqTitle">${safeTitle} FAQs</h2>
        <details open><summary>Is this typing test free?</summary><p>Yes. GovJobUpdates typing tests are free for students and will remain free forever. There is no charge and no hidden fee.</p></details>
        <details><summary>How do I start this typing test?</summary><p>Select a language and passage level, then click Start Practice. The timer starts when you type the first character.</p></details>
        <details><summary>Will this typing test help for government exams?</summary><p>Yes. It is made for exam-style typing practice with timed passages, WPM, accuracy, typed words and error tracking.</p></details>
        <details><summary>Is this an official exam test?</summary><p>No. This is a student practice tool. Always verify the latest official notification for exact typing or skill-test rules.</p></details>
        <details><summary>What result details will I get?</summary><p>The attempt screen shows WPM, accuracy, typed words, character errors, and target status after submission.</p></details>
      </section>
    `;
  }

  function buildDifficultyTable(presetId, language, difficulty) {
    return `
      <section class="gju-typing-passage-level" data-difficulty="${difficulty.id}">
        <h3><i class="fas fa-circle-check" aria-hidden="true"></i> ${difficulty.label}</h3>
        <div class="gju-typing-passage-card-grid">
          ${Array.from({ length: difficulty.count }, (_, index) => buildPassageCard(presetId, language, difficulty.id, index + 1)).join("")}
        </div>
      </section>
    `;
  }

  function buildPassageCard(presetId, language, difficulty, number) {
    const href = `app.html?preset=${encodeURIComponent(presetId)}&language=${encodeURIComponent(language)}&difficulty=${encodeURIComponent(difficulty)}&passage=${number - 1}`;
    return `
      <article class="gju-typing-passage-card">
        <div class="gju-typing-passage-card-head">
          <span class="gju-typing-card-kicker">${label(difficulty)} Passage</span>
          <h4>${labelFromPreset(presetId)} Passage ${number}</h4>
          <p>Start this passage in the attempt screen. Timer begins with the first typed letter.</p>
          <div class="gju-typing-set-meta">
            <span class="gju-typing-meta-pill">${label(language)}</span>
            <span class="gju-typing-meta-pill" data-typing-duration-pill>${durationLabel(presetId)}</span>
            <span class="gju-typing-meta-pill">Passage ${number}</span>
          </div>
        </div>
        <div class="gju-typing-card-foot">
          <a class="gju-typing-start-btn" href="${href}"><i class="fas fa-play" aria-hidden="true"></i> Start Practice</a>
        </div>
      </article>
    `;
  }

  function bindLanguage(main) {
    const buttons = Array.from(main.querySelectorAll(".gju-typing-language-btn"));
    const labelNode = main.querySelector("#typingSelectedLanguage");
    const panel = main.querySelector(".gju-typing-passage-panel");
    const presetId = panel?.dataset.presetId || "";
    syncPassageMeta(main, presetId);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const language = button.dataset.language || "english";
        buttons.forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-selected", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
        if (labelNode) labelNode.textContent = label(language);
        if (panel) {
          panel.dataset.language = language;
          difficulties.forEach((difficulty) => {
            const grid = panel.querySelector(`[data-difficulty="${difficulty.id}"] .gju-typing-passage-card-grid`);
            if (grid) {
              grid.innerHTML = Array.from({ length: difficulty.count }, (_, index) => buildPassageCard(presetId, language, difficulty.id, index + 1)).join("");
            }
          });
          syncPassageMeta(main, presetId);
        }
      });
    });
  }

  function syncPassageMeta(main, presetId) {
    main.querySelectorAll(".gju-typing-passage-card .gju-typing-set-meta").forEach((meta) => {
      const pills = Array.from(meta.querySelectorAll(".gju-typing-meta-pill"));
      const durationPill = meta.querySelector("[data-typing-duration-pill]") || pills[1];
      if (durationPill) {
        durationPill.textContent = durationLabel(presetId);
        durationPill.setAttribute("data-typing-duration-pill", "");
      }
    });
  }

  function durationLabel(presetId) {
    const duration = durationByPreset[presetId] || 10;
    return `${duration} min`;
  }

  function label(value) {
    return String(value || "").replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function labelFromPreset(value) {
    const exam = EXAMS[value];
    return exam ? exam.title : label(value);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  window.GJUTypingExamPage = {
    buildPage,
    exams: EXAMS
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
