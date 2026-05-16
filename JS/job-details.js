(function () {
  "use strict";

  const root = document.getElementById("jobDetailRoot");
  if (!root) return;

  const fallbackJobs = Array.isArray(window.GovJobUpdatesJobs) ? window.GovJobUpdatesJobs : [];

  function getText(value, fallback = "Not specified") {
    if (value === undefined || value === null || String(value).trim() === "") return fallback;
    return String(value).trim();
  }

  function escapeHtml(value) {
    return getText(value, "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character]));
  }

  function normalizeActionUrl(value) {
    const url = getText(value, "");
    if (!url || url === "#") return "";
    if (/^(https?:|mailto:|tel:)/i.test(url) || /^(\/|\.\/|\.\.\/)/.test(url)) return url;
    if (/^[a-z0-9.-]+\.[a-z]{2,}(?:[/:?#].*)?$/i.test(url)) return `https://${url}`;
    return "";
  }

  function parseDate(value) {
    if (!value) return null;
    const normalized = String(value).trim();
    const iso = /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? `${normalized}T00:00:00` : normalized;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(value) {
    const date = parseDate(value);
    if (!date) return "Not specified";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  function getStatus(job) {
    const today = getToday();
    const start = parseDate(job.startDate);
    const last = parseDate(job.lastDate || job.endDate);
    const status = getText(job.status, "").toLowerCase();
    if (last && today > last) return "Closed";
    if (start && today < start) return "Upcoming";
    if (status === "closed") return "Closed";
    if (status === "upcoming") return "Upcoming";
    return "Active";
  }

  function getRequestedId() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("id") || params.get("job") || "";
    if (raw) return raw.startsWith("job-") ? raw : `job-${raw.replace(/[^0-9]/g, "")}`;
    const file = window.location.pathname.split("/").pop() || "";
    const match = file.match(/(job-\d{4}|\d{4})/);
    if (!match) return "";
    return match[1].startsWith("job-") ? match[1] : `job-${match[1]}`;
  }

  function normalizeJob(job) {
    const id = getText(job.id || job.jobId || job.ID, "");
    return {
      ...job,
      id: id.startsWith("job-") ? id : id ? `job-${String(id).replace(/[^0-9]/g, "")}` : "",
      title: getText(job.title || job.jobTitle || job.name, "Government Job Update"),
      organization: getText(job.organization || job.org || job.board, "Official Recruitment Board"),
      department: getText(job.department || job.category, "Government"),
      category: getText(job.category || job.department, "Government"),
      year: getText(job.year, "2026"),
      qualification: getText(job.qualification || job.eligibility, "Read official notification"),
      totalPosts: getText(job.totalPosts || job.posts || job.vacancy || job.vacancies, "Not specified"),
      startDate: getText(job.startDate || job.applicationStart || job.beginDate, ""),
      lastDate: getText(job.lastDate || job.endDate || job.applicationEnd, ""),
      updatedAt: getText(job.updatedAt || job.updated || job.updateDate, ""),
      applyLink: getText(job.applyLink || job.apply || job.applyUrl, "#"),
      officialNotification: getText(job.officialNotification || job.notification || job.notificationLink, "#"),
      tags: Array.isArray(job.tags) ? job.tags : String(job.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean)
    };
  }

  async function loadJobs() {
    let jobs = fallbackJobs.map(normalizeJob).filter((job) => job.id);
    if (window.GovJobUpdatesSheetData && typeof window.GovJobUpdatesSheetData.load === "function") {
      try {
        const sheetJobs = await window.GovJobUpdatesSheetData.load("jobs", jobs);
        if (Array.isArray(sheetJobs) && sheetJobs.length) jobs = sheetJobs.map(normalizeJob).filter((job) => job.id);
      } catch {
        // Keep fallback data if sheet loading fails.
      }
    }
    return jobs;
  }

  function setMeta(name, content) {
    let node = document.querySelector(`meta[name="${name}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute("name", name);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  }

  function setProperty(property, content) {
    let node = document.querySelector(`meta[property="${property}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute("property", property);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  }

  function updateSeo(job) {
    const title = `${job.title} | GovJobUpdates`;
    const description = `${job.title} details, important dates, eligibility, vacancy, apply link and official notification verification note.`;
    document.title = title;
    setMeta("description", description);
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:type", "article");
    setProperty("og:url", window.location.href.split("#")[0]);
    setProperty("og:site_name", "GovJobUpdates");
  }

  function linkButton(url, label, primary) {
    const safe = normalizeActionUrl(url);
    if (!safe) return `<button class="btn btn-disabled" type="button" disabled>${escapeHtml(label)} Coming Soon</button>`;
    return `<a class="btn ${primary ? "btn-primary" : "btn-outline"}" href="${escapeHtml(safe)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
  }

  function row(label, value) {
    return `<div class="job-detail-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
  }

  function renderNotFound(id) {
    document.title = "Job Not Found | GovJobUpdates";
    root.innerHTML = `
      <section class="job-detail-hero">
        <span class="job-detail-kicker">Job Not Found</span>
        <h1>Job detail is unavailable</h1>
        <p class="job-detail-org">No matching job was found for <strong>${escapeHtml(id || "this URL")}</strong>.</p>
        <div class="job-detail-actions"><a class="btn btn-primary" href="../../HTML/latest-jobs.html">Back to Latest Jobs</a></div>
      </section>
    `;
  }

  function renderJob(job) {
    const status = getStatus(job);
    updateSeo(job);
    root.innerHTML = `
      <section class="job-detail-hero">
        <span class="job-detail-kicker">${escapeHtml(status)} Recruitment Update</span>
        <h1>${escapeHtml(job.title)}</h1>
        <p class="job-detail-org"><strong>Organization:</strong> ${escapeHtml(job.organization)}</p>
        <div class="job-detail-tags">
          <span>${escapeHtml(job.category)}</span>
          <span>${escapeHtml(job.year)}</span>
          <span>${escapeHtml(job.totalPosts)} Posts</span>
        </div>
        <div class="job-detail-actions">
          ${linkButton(job.applyLink, "Apply / Official Website", true)}
          ${linkButton(job.officialNotification, "Official Notification", false)}
          <a class="btn btn-outline" href="../../HTML/latest-jobs.html">Back to Jobs</a>
        </div>
      </section>

      <section class="job-alert-box">
        <strong>Important:</strong> GovJobUpdates is not a government website. Always verify dates, eligibility, fees, vacancies and instructions from the official notification or official recruitment portal before applying.
      </section>

      <section class="job-detail-grid">
        <article class="job-detail-card"><h2>Important Details</h2><dl class="job-detail-list">
          ${row("Job ID", job.id)}${row("Department", job.department)}${row("Category", job.category)}${row("Qualification", job.qualification)}${row("Total Posts", job.totalPosts)}${row("Status", status)}
        </dl></article>
        <article class="job-detail-card"><h2>Important Dates</h2><dl class="job-detail-list">
          ${row("Start Date", formatDate(job.startDate))}${row("Last Date", formatDate(job.lastDate))}${row("Updated On", formatDate(job.updatedAt))}
        </dl></article>
        <article class="job-detail-card"><h2>Eligibility Overview</h2><p>Available qualification summary: <strong>${escapeHtml(job.qualification)}</strong>.</p><p class="job-meta-note">For post-wise qualification, age limit, reservation, fee, experience, physical standards and document requirements, read the official notification.</p></article>
        <article class="job-detail-card"><h2>How to Apply</h2><ol class="job-step-list"><li>Open the official apply link / official website.</li><li>Read the official notification carefully.</li><li>Check eligibility, age limit, fees and documents.</li><li>Fill the form with correct details.</li><li>Submit and save the final printout / PDF.</li></ol></article>
        <article class="job-detail-card"><h2>Selection Process</h2><p>The selection process may include written exam, skill test, physical test, interview, document verification or medical examination depending on the recruitment. Check the official notification for exact stages.</p></article>
        <article class="job-detail-card"><h2>Tags</h2><div class="job-detail-tags">${job.tags.length ? job.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("") : "<span>Government Job</span>"}</div></article>
      </section>
    `;
  }

  function initMenu() {
    const toggle = document.querySelector("[data-job-menu-toggle]");
    const nav = document.querySelector("[data-job-nav]");
    if (!toggle || !nav) return;
    const icon = toggle.querySelector("i");
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      if (icon) {
        icon.classList.toggle("fa-bars", !open);
        icon.classList.toggle("fa-times", open);
      }
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) setOpen(false);
    });
  }

  function initLogoFallback() {
    document.querySelectorAll(".job-detail-logo-mark img").forEach((img) => {
      img.addEventListener("error", () => {
        img.style.display = "none";
      }, { once: true });
      if (img.complete && img.naturalWidth === 0) img.style.display = "none";
    });
  }

  async function init() {
    initMenu();
    initLogoFallback();
    root.innerHTML = `<section class="job-detail-card"><h2>Loading job details...</h2><p>Please wait while we fetch the latest job data.</p></section>`;
    const id = getRequestedId();
    const jobs = await loadJobs();
    const job = jobs.find((item) => item.id === id);
    if (!job) renderNotFound(id);
    else renderJob(job);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
