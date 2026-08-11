(function () {
  "use strict";

  const searchInput = document.getElementById("typingExamSearch");
  const cards = Array.from(document.querySelectorAll(".gju-typing-exam-card"));
  const filters = Array.from(document.querySelectorAll("[data-typing-filter]"));
  const empty = document.getElementById("typingExamEmpty");
  let activeFilter = "all";

  const categoryLabels = {
    ssc: "SSC",
    railway: "Railway",
    up: "UP Govt",
    banking: "Banking",
    general: "General"
  };

  const categoryDescriptions = {
    ssc: "Exam-specific typing practice with timed passages and accuracy tracking.",
    railway: "Railway typing practice sets with passage-wise attempt screens.",
    up: "Hindi and English typing practice for UP government skill tests.",
    banking: "Language and typing practice support for banking preparation.",
    general: "Flexible typing practice for speed, accuracy, and consistency."
  };

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function enhanceCards() {
    cards.forEach((card) => {
      if (card.dataset.typingEnhanced === "true") return;
      const category = card.dataset.typingCategory || "general";
      const title = card.querySelector("h2")?.textContent?.trim() || "Typing Test";
      const link = card.querySelector("a");
      const logo = card.querySelector(".gju-typing-exam-logo");
      const href = link?.getAttribute("href") || "#";
      const iconClass = logo?.querySelector("i")?.className || "fas fa-keyboard";
      const logoClass = Array.from(logo?.classList || []).filter((className) => className !== "gju-typing-exam-logo").join(" ");
      const language = getLanguageMeta(title, category);
      const label = categoryLabels[category] || "Typing";
      const description = categoryDescriptions[category] || categoryDescriptions.general;

      card.dataset.typingEnhanced = "true";
      card.innerHTML = `
        <div class="gju-typing-quiz-card-head">
          <span class="gju-typing-card-kicker">${escapeHtml(label)}</span>
          <div class="gju-typing-card-title-row">
            <div class="gju-typing-exam-logo ${escapeHtml(logoClass)}"><i class="${escapeHtml(iconClass)}" aria-hidden="true"></i></div>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <p>${escapeHtml(description)}</p>
          <div class="gju-typing-set-meta">
            <span class="gju-typing-meta-pill">${escapeHtml(language)}</span>
            <span class="gju-typing-meta-pill">Passage wise</span>
            <span class="gju-typing-meta-pill">Timed test</span>
          </div>
        </div>
        <div class="gju-typing-card-foot">
          <a href="${escapeHtml(href)}"><i class="fas fa-play" aria-hidden="true"></i> Start Practice</a>
        </div>
      `;
    });
  }

  function getLanguageMeta(title, category) {
    const value = normalize(title);
    if (value.includes("hindi")) return "Hindi";
    if (value.includes("english") || value.includes("dest")) return "English";
    return category === "general" ? "Typing" : "Hindi + English";
  }

  function syncCards() {
    const query = normalize(searchInput?.value);
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.typingCategory || "";
      const name = card.dataset.typingName || "";
      const matchesCategory = activeFilter === "all" || category === activeFilter;
      const matchesQuery = !query || name.includes(query);
      const visible = matchesCategory && matchesQuery;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (empty) empty.hidden = visibleCount > 0;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.typingFilter || "all";
      filters.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      syncCards();
    });
    button.setAttribute("aria-pressed", String(button.classList.contains("is-selected")));
  });

  searchInput?.addEventListener("input", syncCards);
  enhanceCards();
  syncCards();

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }
})();
