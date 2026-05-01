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
    const items = Array.isArray(window.govJobIndAdmitCards) ? window.govJobIndAdmitCards : [];

    const elements = {
        search: document.getElementById("admitSearch"),
        department: document.getElementById("admitDepartment"),
        year: document.getElementById("admitYear"),
        status: document.getElementById("admitStatus"),
        sort: document.getElementById("admitSort"),
        reset: document.getElementById("admitResetFilters"),
        loadMoreButton: document.getElementById("admitLoadMore"),
        count: document.getElementById("admitCount"),
        listings: document.getElementById("admitcardListings"),
        emptyState: document.getElementById("admitEmptyState")
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

    function getStatus(item) {
        const current = today();
        const examDate = parseDate(item.examDate);
        const releaseDate = parseDate(item.releaseDate);
        const hasLink = getText(item.downloadLink, "#") !== "#";

        if (examDate && examDate < current) return "exam-over";
        if (releaseDate && releaseDate > current) return "upcoming";
        if (hasLink && releaseDate && releaseDate <= current) return "available";
        if (item.status === "available" || item.status === "upcoming") return item.status;
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
            "available": "Available",
            "upcoming": "Upcoming",
            "exam-over": "Exam Over"
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
            if (sortBy === "exam") {
                const firstPast = getStatus(first) === "exam-over";
                const secondPast = getStatus(second) === "exam-over";
                if (firstPast !== secondPast) return firstPast ? 1 : -1;
                return (parseDate(first.examDate) || new Date(8640000000000000)) - (parseDate(second.examDate) || new Date(8640000000000000));
            }
            if (sortBy === "release") {
                return (parseDate(second.releaseDate) || new Date(0)) - (parseDate(first.releaseDate) || new Date(0));
            }
            return (parseDate(second.updatedAt) || new Date(0)) - (parseDate(first.updatedAt) || new Date(0));
        });
    }

    function getDetailPage(item) {
        if (!item || !item.id) return "";
        return getText(item.detailPage, `../AdmitCard_Details/HTML/admitcard-details-${item.id}.html`);
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
        const downloadLink = getText(item.downloadLink, "#");
        const downloadAction = downloadLink !== "#"
            ? `<a href="${escapeHtml(downloadLink)}" target="_blank" rel="noopener" class="btn btn-primary">Download Admit Card</a>`
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
                    <div><dt>Exam Date</dt><dd>${formatDate(item.examDate)}</dd></div>
                    <div><dt>Release Date</dt><dd>${formatDate(item.releaseDate)}</dd></div>
                    <div><dt>Updated</dt><dd>${formatDate(item.updatedAt)}</dd></div>
                </dl>
                <div class="record-actions">
                    ${downloadAction}
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
            elements.count.textContent = "Showing 0 of 0 admit cards";
            renderEmptyState("Admit card data is currently unavailable");
            if (elements.loadMoreButton) elements.loadMoreButton.hidden = true;
            return;
        }

        currentItems = sortItems(filterItems());
        const visibleItems = currentItems.slice(0, visibleCount);
        elements.count.textContent = `Showing ${visibleItems.length} of ${currentItems.length} admit cards`;

        if (elements.emptyState) {
            elements.emptyState.hidden = true;
            elements.emptyState.innerHTML = "";
        }

        if (!currentItems.length) {
            renderEmptyState("No records found");
        } else {
            elements.listings.innerHTML = visibleItems.map(renderCard).join("");
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

    window.admitCardsPage = { getStatus, isNew, filterItems, sortItems, renderItems, renderEmptyState, resetFilters, loadMore };
}());
