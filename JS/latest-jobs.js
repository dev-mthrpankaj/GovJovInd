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

    const jobs = Array.isArray(window.GovJobUpdatesJobs) ? window.GovJobUpdatesJobs : [];
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

    function normalizeNumber(value) {
        const number = parseInt(getText(value, "0").replace(/[^0-9]/g, ""), 10);
        return Number.isNaN(number) ? 0 : number;
    }

    function getDetailPage(job) {
        if (!job || !job.id) return "";
        const expectedPath = `../Job_Details/HTML/job-details-${job.id}.html`;
        return getText(job.detailPage, expectedPath);
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

    function filterJobs() {
        const query = getText(elements.search && elements.search.value, "").toLowerCase();
        const department = elements.department ? elements.department.value : "all";
        const qualification = elements.qualification ? elements.qualification.value : "all";
        const year = elements.year ? elements.year.value : "all";
        const status = elements.status ? elements.status.value : "all";

        return jobs.filter((job) => {
            const searchableText = [
                job.title,
                job.organization,
                job.department,
                job.category,
                ...(Array.isArray(job.tags) ? job.tags : [])
            ].join(" ").toLowerCase();
            const computedStatus = getJobStatus(job);

            const searchMatch = !query || searchableText.includes(query);
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

        if (isNewJob(job)) {
            badges.push('<span class="job-badge badge-new">New</span>');
        }

        if (isLastDateSoon(job)) {
            badges.push('<span class="job-badge badge-soon">Last Date Soon</span>');
        }

        return badges.join("");
    }

    function renderJobCard(job) {
        const applyLink = getText(job.applyLink, "#");
        const canApply = applyLink !== "#";
        const applyAction = canApply
            ? `<a href="${escapeHtml(applyLink)}" target="_blank" rel="noopener" class="btn btn-primary">Apply Now</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Link Coming Soon</button>';
        const detailPage = getDetailPage(job);
        const detailAction = detailPage
            ? `<a href="${escapeHtml(detailPage)}" class="btn btn-outline">View Details</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Details Coming Soon</button>';

        return `
            <article class="job-card">
                <div class="job-card-header">
                    <div>
                        <p class="job-organization">${escapeHtml(job.organization)}</p>
                        <h3>${escapeHtml(job.title)}</h3>
                    </div>
                    <div class="job-badges">${renderBadges(job)}</div>
                </div>
                <dl class="job-meta">
                    <div><dt>Qualification</dt><dd>${escapeHtml(job.qualification)}</dd></div>
                    <div><dt>Total Posts</dt><dd>${escapeHtml(job.totalPosts)}</dd></div>
                    <div><dt>Start Date</dt><dd>${formatDate(job.startDate)}</dd></div>
                    <div><dt>Last Date</dt><dd>${formatDate(job.lastDate)}</dd></div>
                    <div><dt>Updated</dt><dd>${formatDate(job.updatedAt)}</dd></div>
                </dl>
                <div class="job-actions">
                    ${applyAction}
                    ${detailAction}
                </div>
            </article>
        `;
    }

    function renderEmptyState(message) {
        if (!elements.emptyState || !elements.listings) return;
        elements.listings.innerHTML = "";
        elements.emptyState.hidden = false;
        elements.emptyState.innerHTML = `
            <div class="empty-state-card">
                <i class="fas fa-briefcase" aria-hidden="true"></i>
                <h3>${escapeHtml(message || "No jobs found")}</h3>
                <p>Try changing filters or search keyword.</p>
                <button class="btn btn-primary" type="button" data-reset-empty>Reset Filters</button>
            </div>
        `;
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

        if (!currentJobs.length) {
            renderEmptyState("No jobs found");
        } else {
            elements.listings.innerHTML = visibleJobs.map(renderJobCard).join("");
        }

        if (elements.loadMore) {
            elements.loadMore.hidden = visibleJobs.length >= currentJobs.length;
        }
    }

    function resetFilters() {
        if (elements.search) elements.search.value = "";
        if (elements.department) elements.department.value = "all";
        if (elements.qualification) elements.qualification.value = "all";
        if (elements.year) elements.year.value = "all";
        if (elements.status) elements.status.value = "all";
        if (elements.sort) elements.sort.value = "latest";
        visibleCount = pageSize;
        renderJobs();
    }

    function bindEvents() {
        [elements.search, elements.department, elements.qualification, elements.year, elements.status, elements.sort].forEach((element) => {
            if (!element) return;
            element.addEventListener("input", () => {
                visibleCount = pageSize;
                renderJobs();
            });
            element.addEventListener("change", () => {
                visibleCount = pageSize;
                renderJobs();
            });
        });

        if (elements.reset) {
            elements.reset.addEventListener("click", resetFilters);
        }

        if (elements.loadMore) {
            elements.loadMore.addEventListener("click", () => {
                visibleCount += pageSize;
                renderJobs();
            });
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        hydrateFilters();
        bindEvents();
        renderJobs();
    });

    window.latestJobsPage = {
        getJobStatus,
        filterJobs,
        sortJobs,
        renderJobs,
        renderEmptyState,
        resetFilters
    };
}());
