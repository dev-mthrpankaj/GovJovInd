/*
  article-modern.js
  Powers the redesigned article body: reading progress, TOC scroll-spy,
  live reading time, share links, back-to-top and related-articles.
  Depends on (optional, degrades gracefully if missing):
    - window.GOVJOB_BLOGS from blog-data.js  -> related articles
  Safe to include on every article page as-is.
*/
(function () {
  const article = document.querySelector("[data-blog-id]");
  const content = document.querySelector(".blog-article-content");
  const sidebar = document.querySelector(".article-sidebar");
  const relatedSectionForSidebar = document.getElementById("articleRelated");

  const getHeaderHeight = () => {
    const header = document.querySelector("header");
    return header ? Math.ceil(header.getBoundingClientRect().height) : 72;
  };

  const syncSidebarPosition = () => {
    if (!sidebar) return;

    const stickyTop = getHeaderHeight() + 16;
    document.documentElement.style.setProperty("--article-sidebar-sticky-top", `${stickyTop}px`);

    if (!relatedSectionForSidebar) return;
    const relatedTop = relatedSectionForSidebar.getBoundingClientRect().top;
    sidebar.classList.toggle("is-near-related", relatedTop <= stickyTop + 8);
  };

  /* ---------- Reading progress bar ---------- */
  const progressBar = document.getElementById("readingProgressBar");
  const updateProgress = () => {
    if (!progressBar) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    const pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
    progressBar.style.width = pct + "%";
  };

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById("articleBackToTop");
  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  };
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateProgress();
      toggleBackToTop();
      syncSidebarPosition();
      ticking = false;
    });
  });
  updateProgress();
  toggleBackToTop();
  syncSidebarPosition();
  window.addEventListener("resize", syncSidebarPosition);

  /* ---------- Estimated reading time ---------- */
  const readTimeEl = document.getElementById("articleReadTime");
  if (readTimeEl && content) {
    const words = content.textContent.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    readTimeEl.textContent = minutes + " मिनट रीड";
  }

  /* ---------- Table of contents (auto scroll-spy) ---------- */
  const tocList = document.getElementById("articleTocList");
  if (tocList && content) {
    const headings = Array.from(content.querySelectorAll(":scope > section > h2[id]"));
    const links = Array.from(tocList.querySelectorAll("a[href^='#']"));

    if (headings.length && links.length && "IntersectionObserver" in window) {
      const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = byId.get(entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
              links.forEach((a) => a.classList.remove("is-active"));
              link.classList.add("is-active");
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      headings.forEach((h) => observer.observe(h));
    }
  }

  /* ---------- Share buttons ---------- */
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  const shareTargets = {
    whatsappShare: `https://wa.me/?text=${pageTitle}%20${pageUrl}`,
    telegramShare: `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`,
    twitterShare: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
    linkedinShare: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
  };

  Object.keys(shareTargets).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", shareTargets[id]);
  });

  const copyBtn = document.getElementById("copyShareLink");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        copyBtn.classList.add("is-copied");
        window.setTimeout(() => copyBtn.classList.remove("is-copied"), 1500);
      } catch (err) {
        /* clipboard unavailable — fail silently */
      }
    });
  }

  /* ---------- Related articles (reads window.GOVJOB_BLOGS) ---------- */
  const relatedGrid = document.getElementById("articleRelatedGrid");
  const relatedSection = document.getElementById("articleRelated");
  if (relatedGrid && relatedSection && article && Array.isArray(window.GOVJOB_BLOGS)) {
    const currentId = article.dataset.blogId;
    const currentCategory = article.dataset.blogCategory;
    const relatedMode = article.dataset.relatedMode;

    const resolveRelativePath = (value) => {
      if (!value) return "#";
      const trimmed = String(value).trim();
      if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:") || trimmed.startsWith("/")) {
        return trimmed;
      }

      if (trimmed.startsWith("../Assets/")) {
        return trimmed.replace(/^\.\.\//, "../../");
      }
      if (trimmed.startsWith("./Assets/")) {
        return trimmed.replace(/^\.\//, "../");
      }
      if (trimmed.startsWith("Assets/")) {
        return `../../${trimmed}`;
      }
      if (trimmed.startsWith("student-hub/")) {
        return trimmed.replace(/^student-hub\//, "");
      }
      if (trimmed.startsWith("HTML/")) {
        return trimmed.replace(/^HTML\//, "../");
      }
      return trimmed;
    };

    const getPreviousArticles = () => {
      const currentIndex = window.GOVJOB_BLOGS.findIndex((b) => b.id === currentId);
      if (currentIndex >= 0) {
        return window.GOVJOB_BLOGS.slice(currentIndex + 1, currentIndex + 4);
      }

      const currentDate = article.dataset.blogDate;
      if (!currentDate) return [];

      const currentTime = Date.parse(currentDate);
      if (Number.isNaN(currentTime)) return [];

      return window.GOVJOB_BLOGS
        .filter((b) => b.id !== currentId && Date.parse(b.date) < currentTime)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .slice(0, 3);
    };

    const sameCategory = window.GOVJOB_BLOGS.filter(
      (b) => b.id !== currentId && b.category === currentCategory
    );
    const others = window.GOVJOB_BLOGS.filter(
      (b) => b.id !== currentId && b.category !== currentCategory
    );
    const picks = relatedMode === "previous"
      ? getPreviousArticles()
      : sameCategory.concat(others).slice(0, 3);

    if (picks.length) {
      relatedGrid.innerHTML = picks
        .map(
          (b) => `
        <a class="article-related-card" href="${resolveRelativePath(b.url)}">
          <div class="article-related-thumb">
            <img src="${resolveRelativePath(b.image)}" alt="${b.title}" loading="lazy" decoding="async">
          </div>
          <div class="article-related-body">
            <span>${b.category}</span>
            <h3>${b.title}</h3>
          </div>
        </a>`
        )
        .join("");
      relatedSection.hidden = false;
    }
  }
})();
