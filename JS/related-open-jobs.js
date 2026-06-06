(function () {
  "use strict";

  const DEFAULT_MAX_JOBS = 6;
  const LATEST_JOBS_PATH = "../../HTML/latest-jobs.html";
  const DAY_MS = 24 * 60 * 60 * 1000;

  function text(value) {
    return String(value ?? "").trim();
  }

  function escapeHtml(value) {
    return text(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character]));
  }

  function normalizeId(value) {
    const raw = text(value);
    if (!raw) return "";
    const digits = raw.replace(/^job-/i, "").replace(/[^0-9]/g, "");
    return digits || raw.toLowerCase();
  }

  function asList(value) {
    if (Array.isArray(value)) return value.map(text).filter(Boolean);
    return text(value).split(/[,|;]/).map((item) => item.trim()).filter(Boolean);
  }

  function parseDate(value) {
    const raw = text(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
    const date = new Date(`${raw}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function todayStart() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  function formatDate(value) {
    const date = parseDate(value);
    if (!date) return "Not specified";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function normalizeUrl(value) {
    let url = text(value);
    if (!url || url === "#") return "";
    if (/^(javascript|data|mailto|tel|sms):/i.test(url)) return "";
    url = url.replace(/^\.\.\/Job_Details\/HTML\//, "./");
    url = url.replace(/^\/?Job_Details\/HTML\//, "../../Job_Details/HTML/");
    if (/^(https?:|\/|\.\/|\.\.\/)/i.test(url)) return url;
    return "";
  }

  function normalizeJob(job) {
    const id = normalizeId(job.id || job.jobId || job.ID);
    return {
      ...job,
      normalizedId: id,
      title: text(job.title || job.jobTitle || job.name),
      organization: text(job.organization || job.org || job.board),
      category: text(job.category || job.department),
      qualification: text(job.qualification || job.eligibility || "Read official notification for post-wise qualification."),
      status: text(job.status).toLowerCase(),
      lastDate: text(job.lastDate || job.endDate || job.applicationEnd),
      detailPage: normalizeUrl(job.detailPage),
      tags: asList(job.tags)
    };
  }

  function classifyJob(job, today) {
    const status = job.status;
    const lastDate = parseDate(job.lastDate);
    const hasFutureDate = lastDate && lastDate >= today;
    if (status === "closed" || (lastDate && lastDate < today)) return "";
    if (status === "upcoming") return "upcoming";
    if (status === "active" || hasFutureDate) return "active";
    return "";
  }

  function relevanceScore(job, currentTerms) {
    const haystack = [
      job.title,
      job.organization,
      job.category,
      ...(Array.isArray(job.tags) ? job.tags : [])
    ].join(" ").toLowerCase();
    return currentTerms.reduce((score, term) => score + (term && haystack.includes(term) ? 1 : 0), 0);
  }

  function getCurrentTerms(mount) {
    return asList(mount.dataset.currentTags)
      .concat(asList(mount.dataset.currentOrganization))
      .concat(asList(mount.dataset.currentCategory))
      .map((item) => item.toLowerCase())
      .filter(Boolean);
  }

  function getDetailUrl(job) {
    return job.detailPage || LATEST_JOBS_PATH;
  }

  function renderLink(job, type) {
    return `
      <a class="related-open-job-link" href="${escapeHtml(getDetailUrl(job))}">
        <span class="related-open-job-name">${escapeHtml(job.title || "Government Job Update")}</span>
        <span class="related-open-job-meta">${escapeHtml(type === "upcoming" ? "Upcoming" : "Active")} • Last Date: ${escapeHtml(formatDate(job.lastDate))}</span>
      </a>`;
  }

  function selectJobs(mount) {
    const jobs = (Array.isArray(window.GovJobUpdatesJobs) ? window.GovJobUpdatesJobs : []).map(normalizeJob);
    const currentId = normalizeId(mount.dataset.currentJobId);
    const maxJobs = Math.max(1, Number.parseInt(mount.dataset.maxJobs || DEFAULT_MAX_JOBS, 10) || DEFAULT_MAX_JOBS);
    const terms = getCurrentTerms(mount);
    const today = todayStart();

    const candidates = jobs
      .filter((job) => job.normalizedId && job.normalizedId !== currentId)
      .map((job) => ({ job, type: classifyJob(job, today) }))
      .filter((item) => item.type);

    const sortItems = (items) => items.sort((first, second) => {
      const firstTime = parseDate(first.job.lastDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const secondTime = parseDate(second.job.lastDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      if (firstTime !== secondTime) return firstTime - secondTime;
      const firstScore = relevanceScore(first.job, terms);
      const secondScore = relevanceScore(second.job, terms);
      if (firstScore !== secondScore) return secondScore - firstScore;
      return firstTime - secondTime;
    });

    const active = sortItems(candidates.filter((item) => item.type === "active"));
    const upcoming = sortItems(candidates.filter((item) => item.type === "upcoming"));
    return active.concat(upcoming).slice(0, maxJobs);
  }

  function renderMount(mount) {
    if (!mount || mount.dataset.relatedOpenJobsRendered === "true") return;
    const selected = selectJobs(mount);
    if (!selected.length) return;
    mount.dataset.relatedOpenJobsRendered = "true";
    mount.innerHTML = `
      <div class="related-open-jobs-list">
        ${selected.map((item) => renderLink(item.job, item.type)).join("")}
      </div>`;
  }

  function renderAll() {
    document.querySelectorAll("[data-related-open-jobs]").forEach(renderMount);
  }

  window.GovJobUpdatesRelatedOpenJobs = { renderAll };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderAll);
  else renderAll();
  document.addEventListener("govjobupdates:job-detail-rendered", renderAll);
}());
