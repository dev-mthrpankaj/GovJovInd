(function () {
    "use strict";

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav && !menuToggle.dataset.latestJobsBound) {
        menuToggle.dataset.latestJobsBound = "true";
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });

        document.querySelectorAll("nav ul li a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    const pageSize = 10;
    let visibleCount = pageSize;
    let currentJobs = [];

    const excludedNonJobIds = new Set(["job-1017"]);

    function filterJobLifecycleRecords(records) {
        return Array.isArray(records)
            ? records.filter((record) => !excludedNonJobIds.has(String(record.id || "")))
            : [];
    }

    let jobs = filterJobLifecycleRecords(window.GovJobUpdatesJobs);
    const elements = {
        search: document.getElementById("jobSearch"),
        department: document.getElementById("departmentFilter"),
        qualification: document.getElementById("qualificationFilter"),
        year: document.getElementById("yearFilter"),
        status: document.getElementById("statusFilter"),
        sort: document.getElementById("sortFilter"),
        reset: document.getElementById("resetFilters"),
        loadMore: document.getElementById("loadMoreJobs"),
        jobCount: document.getElementById("jobCount"),
        listings: document.getElementById("jobListings"),
        emptyState: document.getElementById("emptyState")
    };

    function parseDate(value) {
        if (!value) return null;
        const date = new Date(`${value}T00:00:00`);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    function daysBetween(fromDate, toDate) {
        const day = 24 * 60 * 60 * 1000;
        return Math.ceil((toDate - fromDate) / day);
    }

    function getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    function getJobStatus(job) {
        const today = getToday();
        const lastDate = parseDate(job.lastDate);
        const startDate = parseDate(job.startDate);

        if (lastDate && today > lastDate) return "closed";
        if (startDate && today < startDate) return "upcoming";
        if (job.status === "upcoming") return "upcoming";
        return "active";
    }

    function isNewJob(job) {
        const updatedAt = parseDate(job.updatedAt);
        return updatedAt ? daysBetween(updatedAt, getToday()) <= 3 && daysBetween(updatedAt, getToday()) >= 0 : false;
    }

    function isLastDateSoon(job) {
        const status = getJobStatus(job);
        const lastDate = parseDate(job.lastDate);
        if (status === "closed" || !lastDate) return false;
        const daysLeft = daysBetween(getToday(), lastDate);
        return daysLeft >= 0 && daysLeft <= 7;
    }

    function getText(value, fallback = "Not specified") {
        if (value === undefined || value === null || String(value).trim() === "") return fallback;
        return String(value).trim();
    }

    function normalizeActionUrl(value) {
        const url = getText(value, "");
        if (!url || url === "#") return "";
        if (/^(https?:|mailto:|tel:)/i.test(url) || /^(\/|\.\/|\.\.\/)/.test(url)) return url;
        if (/^[a-z0-9.-]+\.[a-z]{2,}(?:[/:?#].*)?$/i.test(url)) return `https://${url}`;
        return "";
    }

    function normalizeSearchText(value) {
        return getText(value, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
    }

    function matchesSearchText(searchableText, query) {
        if (!query) return true;
        return query.split(" ").every((term) => searchableText.includes(term));
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

    function formatDate(value) {
        const date = parseDate(value);
        if (!date) return "Not specified";
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function getInlineAdFrequency() {
        const configuredFrequency = Number(window.ADS_CONFIG && window.ADS_CONFIG.inlineFrequency);
        return Number.isFinite(configuredFrequency) && configuredFrequency > 0 ? configuredFrequency : 6;
    }

    function shouldRenderAds() {
        const config = window.ADS_CONFIG || {};
        const pageName = decodeURIComponent((window.location.pathname.split("/").pop() || "").toLowerCase());
        const blockedPages = Array.isArray(config.blockedPages) ? config.blockedPages : [];
        return config.enabled === true && !blockedPages.includes(pageName);
    }

    function renderInlineAdSlot(sequence) {
        if (!shouldRenderAds()) return "";
        return `
            <div class="ad-slot ad-slot-inline" data-ad-location="inline" data-ad-placeholder="true" data-ad-sequence="${sequence}">
                <span class="ad-label">Advertisement</span>
                <!-- Replace with Google AdSense ad unit after approval -->
            </div>
        `;
    }

    function renderCardsWithAds(records, renderCard) {
        const frequency = getInlineAdFrequency();
        return records.map((record, index) => {
            const cardHtml = renderCard(record);
            const position = index + 1;
            return position % frequency === 0 ? `${cardHtml}${renderInlineAdSlot(position)}` : cardHtml;
        }).join("");
    }

    function normalizeNumber(value) {
        const number = parseInt(getText(value, "0").replace(/[^0-9]/g, ""), 10);
        return Number.isNaN(number) ? 0 : number;
    }

    function getJobId(job) {
        const raw = getText(job.id || job.jobId || job.ID, "");
        if (!raw) return "";
        return raw.startsWith("job-") ? raw : `job-${raw.replace(/[^0-9]/g, "")}`;
    }

    const detailPageOverrides = {
        "job-1103": "../Job_Details/HTML/1103-Railway-SECR-Nagpur-Apprentice-2026.html",
        "job-2388": "../Job_Details/HTML/2388-Railway-RRB-ALP-Online-Form-2026.html",
        "job-2422": "../Job_Details/HTML/2422-Punjab-and-Sind-Bank-Apprentice-2026.html",
        "job-2427": "../Job_Details/HTML/2427-Punjab-Haryana-High-Court-Clerk-2026.html",
        "job-2430": "../Job_Details/HTML/2430-Railway-RRB-Technician-Online-Form-2026.html"
    };

    function withHtmlExtension(url) {
        const match = String(url || "").match(/^([^?#]+)([?#].*)?$/);
        if (!match) return url;
        const pathPart = match[1];
        if (/\/$/.test(pathPart) || /\.[a-z0-9]+$/i.test(pathPart)) return url;
        return `${pathPart}.html${match[2] || ""}`;
    }

    function normalizeDetailPageUrl(value) {
        let url = getText(value, "").replace(/\\/g, "/");
        if (!url || url === "#" || /job-details-job-/i.test(url)) return "";
        if (/^(https?:|mailto:|tel:|\/)/i.test(url)) return url;
        if (/^\.\.\/Job_Details\/HTML\//i.test(url)) return withHtmlExtension(url);
        url = url.replace(/^\.\//, "");
        if (/^Job_Details\/HTML\//i.test(url)) return withHtmlExtension(`../${url}`);
        if (!url.includes("/")) return withHtmlExtension(`../Job_Details/HTML/${url}`);
        return withHtmlExtension(url);
    }

    function getDetailPage(job) {
        const jobId = getJobId(job);
        if (!jobId) return "";
        if (detailPageOverrides[jobId]) return detailPageOverrides[jobId];
        const explicitDetailPage = normalizeDetailPageUrl(job.detailPage || job.detailsPage || job.detailUrl);
        if (explicitDetailPage) {
            return explicitDetailPage;
        }
        return `../Job_Details/HTML/job-details.html?id=${encodeURIComponent(jobId)}`;
    }

    function populateSelect(select, values) {
        if (!select) return;
        const existingFirstOption = select.options[0] ? select.options[0].outerHTML : "";
        const options = values
            .filter(Boolean)
            .sort((a, b) => String(a).localeCompare(String(b)))
            .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
            .join("");
        select.innerHTML = `${existingFirstOption}${options}`;
    }

    function hydrateFilters() {
        populateSelect(elements.department, [...new Set(jobs.map((job) => job.department || job.category))]);
        populateSelect(elements.qualification, [...new Set(jobs.map((job) => job.qualification))]);
        populateSelect(elements.year, [...new Set(jobs.map((job) => job.year))].sort((a, b) => String(b).localeCompare(String(a))));
    }

    function getInitialSearchQuery() {
        try {
            const params = new URLSearchParams(window.location.search);
            return getText(params.get("q") || params.get("search"), "");
        } catch {
            return "";
        }
    }

    function applyInitialSearchQuery() {
        const query = getInitialSearchQuery();
        if (query && elements.search) elements.search.value = query;
    }

    function clearSearchQueryParams() {
        try {
            const url = new URL(window.location.href);
            if (!url.searchParams.has("q") && !url.searchParams.has("search")) return;
            url.searchParams.delete("q");
            url.searchParams.delete("search");
            window.history.replaceState({}, "", url.toString());
        } catch {}
    }

    function filterJobs() {
        const query = normalizeSearchText(elements.search && elements.search.value);
        const department = elements.department ? elements.department.value : "all";
        const qualification = elements.qualification ? elements.qualification.value : "all";
        const year = elements.year ? elements.year.value : "all";
        const status = elements.status ? elements.status.value : "all";

        return jobs.filter((job) => {
            const searchableText = normalizeSearchText([
                job.title,
                job.organization,
                job.department,
                job.category,
                job.qualification,
                job.year,
                getJobStatus(job),
                isNewJob(job) ? "new" : "",
                isLastDateSoon(job) ? "last date soon" : "",
                ...(Array.isArray(job.tags) ? job.tags : [])
            ].join(" "));
            const computedStatus = getJobStatus(job);

            const searchMatch = matchesSearchText(searchableText, query);
            const departmentMatch = department === "all" || job.department === department || job.category === department;
            const qualificationMatch = qualification === "all" || job.qualification === qualification;
            const yearMatch = year === "all" || job.year === year;
            const statusMatch = status === "all"
                || computedStatus === status
                || (status === "new" && isNewJob(job))
                || (status === "soon" && isLastDateSoon(job));

            return searchMatch && departmentMatch && qualificationMatch && yearMatch && statusMatch;
        });
    }

    function sortJobs(filteredJobs) {
        const sortBy = elements.sort ? elements.sort.value : "latest";
        return [...filteredJobs].sort((first, second) => {
            if (sortBy === "deadline") {
                const firstClosed = getJobStatus(first) === "closed";
                const secondClosed = getJobStatus(second) === "closed";
                if (firstClosed !== secondClosed) return firstClosed ? 1 : -1;
                return (parseDate(first.lastDate) || new Date(8640000000000000)) - (parseDate(second.lastDate) || new Date(8640000000000000));
            }

            if (sortBy === "vacancies") {
                return normalizeNumber(second.totalPosts) - normalizeNumber(first.totalPosts);
            }

            return (parseDate(second.updatedAt) || new Date(0)) - (parseDate(first.updatedAt) || new Date(0));
        });
    }

    function renderBadges(job) {
        const status = getJobStatus(job);
        const badges = [
            `<span class="job-badge badge-${status}">${status.charAt(0).toUpperCase()}${status.slice(1)}</span>`,
            `<span class="job-badge badge-category">${escapeHtml(job.category || job.department)}</span>`
        ];

        if (isNewJob(job)) badges.push('<span class="job-badge badge-new">New</span>');
        if (isLastDateSoon(job)) badges.push('<span class="job-badge badge-soon">Last Date Soon</span>');
        return badges.join("");
    }

    function renderJobCard(job) {
        const applyLink = normalizeActionUrl(job.applyLink);
        const applyAction = applyLink
            ? `<a href="${escapeHtml(applyLink)}" target="_blank" rel="noopener" class="btn btn-primary">Apply Now</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Link Coming Soon</button>';
        const detailPage = getDetailPage(job);
        const detailAction = detailPage
            ? `<a href="${escapeHtml(detailPage)}" class="btn btn-outline">View Details</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Details Coming Soon</button>';

        return `
            <article class="job-card">
                <div class="job-card-header">
                    <div><p class="job-organization">${escapeHtml(job.organization)}</p><h3>${escapeHtml(job.title)}</h3></div>
                    <div class="job-badges">${renderBadges(job)}</div>
                </div>
                <dl class="job-meta">
                    <div><dt>Qualification</dt><dd>${escapeHtml(job.qualification)}</dd></div>
                    <div><dt>Total Posts</dt><dd>${escapeHtml(job.totalPosts)}</dd></div>
                    <div><dt>Start Date</dt><dd>${formatDate(job.startDate)}</dd></div>
                    <div><dt>Last Date</dt><dd>${formatDate(job.lastDate)}</dd></div>
                    <div><dt>Updated</dt><dd>${formatDate(job.updatedAt)}</dd></div>
                </dl>
                <div class="job-actions">${applyAction}${detailAction}</div>
            </article>
        `;
    }

    function renderEmptyState(message) {
        if (!elements.emptyState || !elements.listings) return;
        elements.listings.innerHTML = "";
        elements.emptyState.hidden = false;
        elements.emptyState.innerHTML = `<div class="empty-state-card"><i class="fas fa-briefcase" aria-hidden="true"></i><h3>${escapeHtml(message || "No matching job updates")}</h3><p>Try another keyword or reset filters. Always verify eligibility and dates on the official recruitment website.</p><button class="btn btn-primary" type="button" data-reset-empty>Reset Filters</button></div>`;
        const resetButton = elements.emptyState.querySelector("[data-reset-empty]");
        if (resetButton) resetButton.addEventListener("click", resetFilters);
    }

    function renderJobs() {
        if (!elements.listings || !elements.jobCount) return;
        if (!jobs.length) {
            elements.jobCount.textContent = "Showing 0 of 0 jobs";
            renderEmptyState("Jobs data is currently unavailable");
            if (elements.loadMore) elements.loadMore.hidden = true;
            return;
        }

        currentJobs = sortJobs(filterJobs());
        const visibleJobs = currentJobs.slice(0, visibleCount);
        elements.jobCount.textContent = `Showing ${visibleJobs.length} of ${currentJobs.length} jobs`;
        if (elements.emptyState) {
            elements.emptyState.hidden = true;
            elements.emptyState.innerHTML = "";
        }

        if (!currentJobs.length) renderEmptyState("No matching job updates");
        else elements.listings.innerHTML = renderCardsWithAds(visibleJobs, renderJobCard);

        if (elements.loadMore) elements.loadMore.hidden = visibleJobs.length >= currentJobs.length;
    }

    function resetFilters() {
        if (elements.search) elements.search.value = "";
        if (elements.department) elements.department.value = "all";
        if (elements.qualification) elements.qualification.value = "all";
        if (elements.year) elements.year.value = "all";
        if (elements.status) elements.status.value = "all";
        if (elements.sort) elements.sort.value = "latest";
        visibleCount = pageSize;
        clearSearchQueryParams();
        renderJobs();
    }

    function bindEvents() {
        [elements.search, elements.department, elements.qualification, elements.year, elements.status, elements.sort].forEach((element) => {
            if (!element) return;
            element.addEventListener("input", () => { visibleCount = pageSize; renderJobs(); });
            element.addEventListener("change", () => { visibleCount = pageSize; renderJobs(); });
        });
        if (elements.reset) elements.reset.addEventListener("click", resetFilters);
        if (elements.loadMore) elements.loadMore.addEventListener("click", () => { visibleCount += pageSize; renderJobs(); });
    }

    async function loadJobsFromSheet() {
        if (!window.GovJobUpdatesSheetData) return;
        const sheetJobs = await window.GovJobUpdatesSheetData.load("jobs", jobs);
        if (!Array.isArray(sheetJobs) || !sheetJobs.length || sheetJobs === jobs) return;
        jobs = filterJobLifecycleRecords(sheetJobs);
        visibleCount = pageSize;
        hydrateFilters();
        renderJobs();
    }

    document.addEventListener("DOMContentLoaded", () => {
        applyInitialSearchQuery();
        hydrateFilters();
        bindEvents();
        renderJobs();
        loadJobsFromSheet();
    });

    window.latestJobsPage = { getJobStatus, filterJobs, sortJobs, renderJobs, renderEmptyState, resetFilters };
}());
