(function () {
  "use strict";

  const MAX_PER_TYPE = 4;
  const WELCOME_DELAY_MS = 1200;
  const SWAP_FADE_MS = 250;
  const RETRY_DELAY_MS = 250;
  const MAX_RETRIES = 24;

  const SOURCES = [
    {
      label: "Latest Job",
      items: () => window.GovJobUpdatesJobs,
      mode: "nearestFuture",
      dateFields: ["lastDate"],
      fallbackDateFields: ["updatedAt", "startDate"],
      fallbackHref: "HTML/latest-jobs.html"
    },
    {
      label: "Admit Card",
      items: () => window.GovJobUpdatesAdmitCards,
      mode: "nearestFuture",
      dateFields: ["examDate", "examEndDate"],
      fallbackDateFields: ["updatedAt", "releaseDate"],
      fallbackHref: "HTML/admitcard.html"
    },
    {
      label: "Answer Key",
      items: () => window.GovJobUpdatesAnswerKeys,
      mode: "latest",
      dateFields: ["updatedAt", "releaseDate", "examDate"],
      skipStatuses: ["upcoming", "not available", "closed", "expired", "inactive"],
      fallbackHref: "HTML/answer-key.html"
    },
    {
      label: "Result",
      items: () => window.GovJobUpdatesResults,
      mode: "latest",
      dateFields: ["updatedAt", "resultDate", "releaseDate"],
      skipStatuses: ["upcoming", "not available", "closed", "expired", "inactive"],
      fallbackHref: "HTML/results.html"
    }
  ];

  const CLOSED_STATUSES = new Set(["closed", "expired", "ended", "inactive"]);

  function clean(value) {
    return String(value ?? "").trim();
  }

  function parseDate(value) {
    const text = clean(value);
    if (!text || text === "#") return 0;
    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(text) ? `${text}T00:00:00` : text;
    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
  }

  function todayTime() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  function getSortTime(item, fields) {
    return fields.reduce((best, field) => Math.max(best, parseDate(item[field])), 0);
  }

  function getNearestFutureTime(item, fields, today) {
    const futureTimes = fields
      .map((field) => parseDate(item[field]))
      .filter((time) => time && time >= today);
    return futureTimes.length ? Math.min(...futureTimes) : 0;
  }

  function normalizeHref(value, fallbackHref) {
    let href = clean(value);
    if (!href || href === "#") return fallbackHref;
    if (/^(javascript|data|mailto|tel|sms):/i.test(href)) return fallbackHref;
    href = href.replace(/^\.\.\/Job_Details\/HTML\//, "Job_Details/HTML/");
    href = href.replace(/^\.\.\/HTML\//, "HTML/");
    href = href.replace(/^\/+/, "");
    if (/^(https?:|\.\/|\/)/i.test(href)) return href;
    if (/^(Job_Details|HTML)\//i.test(href)) return href;
    return fallbackHref;
  }

  function rankNearestItems(records) {
    const activeItems = records.filter(({ status }) => !CLOSED_STATUSES.has(status));
    const futureItems = activeItems
      .filter(({ nearestTime }) => nearestTime)
      .sort((a, b) => a.nearestTime - b.nearestTime || b.latestTime - a.latestTime);
    const fallbackItems = activeItems
      .filter(({ nearestTime }) => !nearestTime)
      .sort((a, b) => b.latestTime - a.latestTime);
    const closedFallback = records
      .filter(({ status }) => CLOSED_STATUSES.has(status))
      .sort((a, b) => b.latestTime - a.latestTime);

    return futureItems.concat(fallbackItems, closedFallback).slice(0, MAX_PER_TYPE);
  }

  function filterByStatus(records, source) {
    if (!source.skipStatuses?.length) return records;
    const skipped = new Set(source.skipStatuses);
    const filtered = records.filter(({ status }) => !skipped.has(status));
    return filtered.length ? filtered : records;
  }

  function buildItems(source) {
    const records = source.items();
    if (!Array.isArray(records)) return [];
    const today = todayTime();
    const withTiming = filterByStatus(records
      .filter((item) => clean(item.title))
      .map((item) => {
        const status = clean(item.status).toLowerCase();
        const nearestTime = getNearestFutureTime(item, source.dateFields, today);
        const latestTime = getSortTime(item, source.fallbackDateFields || source.dateFields);
        return { item, status, nearestTime, latestTime };
      }), source);

    const sorted = source.mode === "latest"
      ? withTiming.sort((a, b) => b.latestTime - a.latestTime)
      : rankNearestItems(withTiming);

    return sorted
      .slice(0, MAX_PER_TYPE)
      .map(({ item }) => ({
        href: normalizeHref(item.detailPage || item.applyLink || item.downloadLink || item.resultLink, source.fallbackHref),
        text: `${source.label}: ${clean(item.title)}`
      }));
  }

  function getTickerItems() {
    return SOURCES.flatMap(buildItems);
  }

  function renderTicker(ticker) {
    const track = ticker.querySelector(".ticker-track");
    if (!track || track.dataset.dynamicTicker === "true") return true;
    const items = getTickerItems();
    if (!items.length) return false;

    const links = items.concat(items).map((item, index) => {
      const link = document.createElement("a");
      link.className = "ticker-item";
      link.href = item.href;
      link.textContent = item.text;
      if (index >= items.length) {
        link.setAttribute("aria-hidden", "true");
        link.setAttribute("tabindex", "-1");
      }
      return link;
    });

    window.setTimeout(() => {
      track.classList.add("ticker-is-swapping");
      window.setTimeout(() => {
        track.replaceChildren(...links);
        track.classList.remove("ticker-track-welcome");
        ticker.classList.remove("ticker-welcome-active");
        track.dataset.dynamicTicker = "true";
        const viewportWidth = ticker.querySelector(".ticker-viewport")?.clientWidth || window.innerWidth;
        track.style.setProperty("--ticker-start", `${viewportWidth}px`);
        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        const duration = isMobile ? Math.max(140, items.length * 8.75) : Math.max(90, items.length * 6.875);
        track.style.setProperty("--ticker-duration", `${duration}s`);
        window.requestAnimationFrame(() => track.classList.remove("ticker-is-swapping"));
      }, SWAP_FADE_MS);
    }, WELCOME_DELAY_MS);

    return true;
  }

  function init(attempt = 0) {
    const tickers = Array.from(document.querySelectorAll(".ticker-wrap"));
    if (!tickers.length) return;
    const rendered = tickers.map(renderTicker).some(Boolean);
    if (!rendered && attempt < MAX_RETRIES) {
      window.setTimeout(() => init(attempt + 1), RETRY_DELAY_MS);
    }
  }

  window.GovJobHomeTicker = { refresh: init };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init());
  else init();
}());