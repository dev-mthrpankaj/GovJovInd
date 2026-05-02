(function () {
    "use strict";

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
    const items = Array.isArray(window.GovJobUpdatesResults) ? window.GovJobUpdatesResults : [];

    const elements = {
        search: document.getElementById("resultSearch"),
        department: document.getElementById("resultDepartment"),
        year: document.getElementById("resultYear"),
        status: document.getElementById("resultStatus"),
        sort: document.getElementById("resultSort"),
        reset: document.getElementById("resultResetFilters"),
        loadMoreButton: document.getElementById("resultLoadMore"),
        count: document.getElementById("resultCount"),
        listings: document.getElementById("resultListings"),
        emptyState: document.getElementById("resultEmptyState")
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
        const resultDate = parseDate(item.resultDate);
        const hasLink = getText(item.resultLink, "#") !== "#";
        if (resultDate && resultDate > today()) return "upcoming";
        if (hasLink && resultDate && resultDate <= today()) return "released";
        if (item.status === "released" || item.status === "upcoming") return item.status;
        return "upcoming";
    }

    function isNew(item) {
        const updatedAt = parseDate(item.updatedAt);
        if (!updatedAt) return false;
        const diff = dayDiff(updatedAt, today());
        return diff >= 0 && diff <= 3;
    }

    function statusLabel(status) {
        return {
            "released": "Released",
            "upcoming": "Upcoming"
        }[status] || "Released";
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

    function filterItems() {
        const query = getText(elements.search && elements.search.value, "").toLowerCase();
        const department = elements.department ? elements.department.value : "all";
        const year = elements.year ? elements.year.value : "all";
        const status = elements.status ? elements.status.value : "all";

        return items.filter((item) => {
            const searchable = [item.title, item.organization, item.department, item.category, ...(Array.isArray(item.tags) ? item.tags : [])].join(" ").toLowerCase();
            const computedStatus = getStatus(item);
            return (!query || searchable.includes(query))
                && (department === "all" || item.department === department || item.category === department)
                && (year === "all" || item.year === year)
                && (status === "all" || computedStatus === status || (status === "new" && isNew(item)));
        });
    }

    function sortItems(filteredItems) {
        const sortBy = elements.sort ? elements.sort.value : "latest";
        return [...filteredItems].sort((first, second) => {
            if (sortBy === "result") {
                return (parseDate(second.resultDate) || new Date(0)) - (parseDate(first.resultDate) || new Date(0));
            }
            if (sortBy === "department") {
                return getText(first.department, "").localeCompare(getText(second.department, ""));
            }
            return (parseDate(second.updatedAt) || new Date(0)) - (parseDate(first.updatedAt) || new Date(0));
        });
    }

    function getDetailPage(item) {
        if (!item || !item.id) return "";
        return getText(item.detailPage, `../Result_Details/HTML/result-details-${item.id}.html`);
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
        const resultLink = getText(item.resultLink, "#");
        const resultAction = resultLink !== "#"
            ? `<a href="${escapeHtml(resultLink)}" target="_blank" rel="noopener" class="btn btn-primary">Check Result</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Link Coming Soon</button>';
        const detailPage = getDetailPage(item);
        const detailAction = detailPage
            ? `<a href="${escapeHtml(detailPage)}" class="btn btn-outline">View Details</a>`
            : '<button class="btn btn-disabled" type="button" disabled>Details Coming Soon</button>';

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
                    <div><dt>Result Date</dt><dd>${formatDate(item.resultDate)}</dd></div>
                    <div><dt>Updated</dt><dd>${formatDate(item.updatedAt)}</dd></div>
                </dl>
                <div class="record-actions">
                    ${resultAction}
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
                <i class="fas fa-file-alt" aria-hidden="true"></i>
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
            elements.count.textContent = "Showing 0 of 0 results";
            renderEmptyState("Result data is currently unavailable");
            if (elements.loadMoreButton) elements.loadMoreButton.hidden = true;
            return;
        }

        currentItems = sortItems(filterItems());
        const visibleItems = currentItems.slice(0, visibleCount);
        elements.count.textContent = `Showing ${visibleItems.length} of ${currentItems.length} results`;

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

    document.addEventListener("DOMContentLoaded", () => {
        hydrateFilters();
        bindEvents();
        renderItems();
    });

    window.resultsPage = { getStatus, isNew, filterItems, sortItems, renderItems, renderEmptyState, resetFilters, loadMore };
}());
