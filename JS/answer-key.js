(function () {
    "use strict";

    const RANK_CHECK_WINDOW_DAYS = 45;
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav && !menuToggle.dataset.listingBound) {
        menuToggle.dataset.listingBound = "true";
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
    let currentItems = [];
    const excludedNonJobIds = new Set(["2032"]);

    function filterJobLifecycleRecords(records) {
        return Array.isArray(records)
            ? records.filter((record) => !excludedNonJobIds.has(String(record.id || "")))
            : [];
    }

    let items = filterJobLifecycleRecords(window.GovJobUpdatesAnswerKeys);

    const elements = {
        search: document.getElementById("answerKeySearch"),
        department: document.getElementById("answerKeyDepartment"),
        year: document.getElementById("answerKeyYear"),
        status: document.getElementById("answerKeyStatus"),
        sort: document.getElementById("answerKeySort"),
        reset: document.getElementById("answerKeyResetFilters"),
        loadMoreButton: document.getElementById("answerKeyLoadMore"),
        count: document.getElementById("answerKeyCount"),
        listings: document.getElementById("answerKeyListings"),
        emptyState: document.getElementById("answerKeyEmptyState")
    };

    function parseDate(value) {
        if (!value) return null;
        const date = new Date(`${value}T00:00:00`);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    function today() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    function dayDiff(fromDate, toDate) {
        return Math.ceil((toDate - fromDate) / 86400000);
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

    function normalizeJobDetailPage(value) {
        let url = normalizeActionUrl(value).replace(/\\/g, "/");
        if (!url) return "";
        url = url.replace(/^\.\/Job_Details\/HTML\//i, "../Job_Details/HTML/");
        if (/^(?:\.\.\/|\/)Job_Details\/HTML\/[^?#]+\.html(?:[?#].*)?$/i.test(url)) return url;
        if (/^https?:\/\/(?:www\.)?govjobupdates\.com\/Job_Details\/HTML\/[^?#]+\.html(?:[?#].*)?$/i.test(url)) return url;
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
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function getExamStartDate(item) {
        return parseDate(item.examDate);
    }

    function getExamEndDate(item) {
        return parseDate(item.examEndDate) || getExamStartDate(item);
    }

    function formatExamDates(item) {
        const startDate = getExamStartDate(item);
        const endDate = getExamEndDate(item);
        if (!startDate) return "Not specified";
        if (!endDate || endDate.getTime() === startDate.getTime()) return formatDate(item.examDate);
        return `${formatDate(item.examDate)} - ${formatDate(item.examEndDate)}`;
    }

    function getInlineAdFrequency() {
        const configuredFrequency = Number(window.ADS_CONFIG && window.ADS_CONFIG.inlineFrequency);
        return Number.isFinite(configuredFrequency) && configuredFrequency > 0 ? configuredFrequency : 6;
    }

    function shouldRenderAds() {
        const config = window.ADS_CONFIG || {};
        const pageName = decodeURIComponent((window.location.pathname.split("/").pop() || "").toLowerCase());
        const blockedPages = Array.isArray(config.blockedPages) ? config.blockedPages : [];
        return config.enabled !== false && !blockedPages.includes(pageName);
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

    function getStatus(item) {
        const current = today();
        const releaseDate = parseDate(item.releaseDate);
        const objectionLastDate = parseDate(item.objectionLastDate);
        const hasLink = Boolean(normalizeActionUrl(item.downloadLink));

        if (objectionLastDate && current > objectionLastDate) return "objection-closed";
        if (releaseDate && releaseDate > current) return "upcoming";
        if (hasLink && releaseDate && releaseDate <= current) return "available";
        if (item.status === "available" || item.status === "upcoming" || item.status === "objection-closed") return item.status;
        return "upcoming";
    }

    function isNew(item) {
        const updatedAt = parseDate(item.updatedAt);
        if (!updatedAt) return false;
        const diff = dayDiff(updatedAt, today());
        return diff >= 0 && diff <= 3;
    }

    function getRankCheckAvailability(item) {
        const releaseDate = parseDate(item.releaseDate);
        const current = today();
        if (!releaseDate || releaseDate > current) {
            return {
                enabled: false,
                message: "Available after the answer key is released."
            };
        }

        const expiresAt = new Date(releaseDate);
        expiresAt.setDate(expiresAt.getDate() + RANK_CHECK_WINDOW_DAYS);
        if (current > expiresAt) {
            return {
                enabled: false,
                message: `Closed ${RANK_CHECK_WINDOW_DAYS} days after answer key release.`
            };
        }

        return {
            enabled: true,
            message: `Available until ${formatDateValue(expiresAt)}.`
        };
    }

    function formatDateValue(date) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "Not specified";
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function statusLabel(status) {
        return {
            "available": "Available",
            "upcoming": "Upcoming",
            "objection-closed": "Objection Closed"
        }[status] || "Available";
    }

    function populateSelect(select, values) {
        if (!select) return;
        const firstOption = select.options[0] ? select.options[0].outerHTML : "";
        const options = values
            .filter(Boolean)
            .sort((a, b) => String(a).localeCompare(String(b)))
            .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
            .join("");
        select.innerHTML = `${firstOption}${options}`;
    }

    function hydrateFilters() {
        populateSelect(elements.department, [...new Set(items.map((item) => item.department || item.category))]);
        populateSelect(elements.year, [...new Set(items.map((item) => item.year))].sort((a, b) => String(b).localeCompare(String(a))));
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
        } catch {
            // URL cleanup is optional; filtering already works without it.
        }
    }

    function filterItems() {
        const query = normalizeSearchText(elements.search && elements.search.value);
        const department = elements.department ? elements.department.value : "all";
        const year = elements.year ? elements.year.value : "all";
        const status = elements.status ? elements.status.value : "all";

        return items.filter((item) => {
            const computedStatus = getStatus(item);
            const searchable = normalizeSearchText([
                item.title,
                item.organization,
                item.department,
                item.category,
                item.year,
                computedStatus,
                isNew(item) ? "new" : "",
                ...(Array.isArray(item.tags) ? item.tags : [])
            ].join(" "));
            return matchesSearchText(searchable, query)
                && (department === "all" || item.department === department || item.category === department)
                && (year === "all" || item.year === year)
                && (status === "all" || computedStatus === status || (status === "new" && isNew(item)));
        });
    }

    function sortItems(filteredItems) {
        const sortBy = elements.sort ? elements.sort.value : "latest";
        return [...filteredItems].sort((first, second) => {
            if (sortBy === "exam") {
                return (getExamStartDate(first) || new Date(8640000000000000)) - (getExamStartDate(second) || new Date(8640000000000000));
            }
            if (sortBy === "objection") {
                const firstDate = parseDate(first.objectionLastDate);
                const secondDate = parseDate(second.objectionLastDate);
                const firstClosed = firstDate ? today() > firstDate : true;
                const secondClosed = secondDate ? today() > secondDate : true;
                if (firstClosed !== secondClosed) return firstClosed ? 1 : -1;
                return (parseDate(first.objectionLastDate) || new Date(8640000000000000)) - (parseDate(second.objectionLastDate) || new Date(8640000000000000));
            }
            return (parseDate(second.updatedAt) || new Date(0)) - (parseDate(first.updatedAt) || new Date(0));
        });
    }

    const detailPageOverrides = {
        "2031": "../Job_Details/HTML/1004-UPSSSC-Lekhpal-job-detail.html"
    };

    function getDetailPage(item) {
        if (!item || !item.id) return "";
        return detailPageOverrides[item.id] || normalizeJobDetailPage(item.detailPage);
    }

    function renderBadges(item) {
        const status = getStatus(item);
        const badges = [
            `<span class="record-badge badge-${status}">${statusLabel(status)}</span>`,
            `<span class="record-badge badge-category">${escapeHtml(item.department || item.category)}</span>`
        ];
        if (isNew(item)) badges.push('<span class="record-badge badge-new">New</span>');
        return badges.join("");
    }

    function renderCard(item) {
        const downloadLink = normalizeActionUrl(item.downloadLink);
        const objectionLink = normalizeActionUrl(item.objectionLink);
        const downloadAction = downloadLink
            ? `<a href="${escapeHtml(downloadLink)}" target="_blank" rel="noopener" class="btn btn-primary">Download Answer Key</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Link Coming Soon</button>';
        const objectionAction = objectionLink
            ? `<a href="${escapeHtml(objectionLink)}" target="_blank" rel="noopener" class="btn btn-outline">Raise Objection</a>`
            : "";
        const detailPage = getDetailPage(item);
        const detailAction = detailPage
            ? `<a href="${escapeHtml(detailPage)}" class="btn btn-outline">View Details</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Details Coming Soon</button>';
        const rankCheck = getRankCheckAvailability(item);
        const rankCheckAction = rankCheck.enabled
            ? `<a href="rank-predictor.html" class="btn rank-check-btn is-active" title="${escapeHtml(rankCheck.message)}">Check Your Rank</a>`
            : `<button class="btn rank-check-btn is-disabled" type="button" title="${escapeHtml(rankCheck.message)}" disabled>Check Your Rank</button>`;

        return `
            <article class="record-card">
                <div class="record-card-header">
                    <div>
                        <p class="record-organization">${escapeHtml(item.organization)}</p>
                        <h3>${escapeHtml(item.title)}</h3>
                    </div>
                    <div class="record-badges">${renderBadges(item)}</div>
                </div>
                <dl class="record-meta">
                    <div><dt>Exam Dates</dt><dd>${formatExamDates(item)}</dd></div>
                    <div><dt>Release Date</dt><dd>${formatDate(item.releaseDate)}</dd></div>
                    <div><dt>Objection Last Date</dt><dd>${formatDate(item.objectionLastDate)}</dd></div>
                    <div><dt>Updated</dt><dd>${formatDate(item.updatedAt)}</dd></div>
                </dl>
                <div class="record-actions">
                    ${downloadAction}
                    ${objectionAction}
                    ${detailAction}
                    ${rankCheckAction}
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
                <i class="fas fa-key" aria-hidden="true"></i>
                <h3>${escapeHtml(message || "No records found")}</h3>
                <p>Try changing filters or search keyword.</p>
                <button class="btn btn-primary" type="button" data-reset-empty>Reset Filters</button>
            </div>
        `;
        const resetButton = elements.emptyState.querySelector("[data-reset-empty]");
        if (resetButton) resetButton.addEventListener("click", resetFilters);
    }

    function renderItems() {
        if (!elements.listings || !elements.count) return;

        if (!items.length) {
            elements.count.textContent = "Showing 0 of 0 answer keys";
            renderEmptyState("Answer key data is currently unavailable");
            if (elements.loadMoreButton) elements.loadMoreButton.hidden = true;
            return;
        }

        currentItems = sortItems(filterItems());
        const visibleItems = currentItems.slice(0, visibleCount);
        elements.count.textContent = `Showing ${visibleItems.length} of ${currentItems.length} answer keys`;

        if (elements.emptyState) {
            elements.emptyState.hidden = true;
            elements.emptyState.innerHTML = "";
        }

        if (!currentItems.length) {
            renderEmptyState("No records found");
        } else {
            elements.listings.innerHTML = renderCardsWithAds(visibleItems, renderCard);
        }

        if (elements.loadMoreButton) {
            elements.loadMoreButton.hidden = visibleItems.length >= currentItems.length;
        }
    }

    function resetFilters() {
        if (elements.search) elements.search.value = "";
        if (elements.department) elements.department.value = "all";
        if (elements.year) elements.year.value = "all";
        if (elements.status) elements.status.value = "all";
        if (elements.sort) elements.sort.value = "latest";
        visibleCount = pageSize;
        clearSearchQueryParams();
        renderItems();
    }

    function loadMore() {
        visibleCount += pageSize;
        renderItems();
    }

    function bindEvents() {
        [elements.search, elements.department, elements.year, elements.status, elements.sort].forEach((element) => {
            if (!element) return;
            element.addEventListener("input", () => {
                visibleCount = pageSize;
                renderItems();
            });
            element.addEventListener("change", () => {
                visibleCount = pageSize;
                renderItems();
            });
        });
        if (elements.reset) elements.reset.addEventListener("click", resetFilters);
        if (elements.loadMoreButton) elements.loadMoreButton.addEventListener("click", loadMore);
    }

    async function loadItemsFromSheet() {
        if (!window.GovJobUpdatesSheetData) return;
        const sheetItems = await window.GovJobUpdatesSheetData.load("answerKeys", items);
        if (!Array.isArray(sheetItems) || !sheetItems.length || sheetItems === items) return;
        items = filterJobLifecycleRecords(sheetItems);
        visibleCount = pageSize;
        hydrateFilters();
        renderItems();
    }

    document.addEventListener("DOMContentLoaded", () => {
        applyInitialSearchQuery();
        hydrateFilters();
        bindEvents();
        renderItems();
        loadItemsFromSheet();
    });

    window.answerKeysPage = { getStatus, isNew, getRankCheckAvailability, formatExamDates, filterItems, sortItems, renderItems, renderEmptyState, resetFilters, loadMore };
}());
