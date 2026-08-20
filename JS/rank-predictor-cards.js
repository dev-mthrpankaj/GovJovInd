(function () {
    "use strict";

    const config = window.RANK_PREDICTOR_CONFIG || { exams: [] };
    const EXAM_LOAD_TIMEOUT_MS = Number(config.examLoadTimeoutMs) > 0 ? Number(config.examLoadTimeoutMs) : 8000;
    const RANK_PREDICTOR_ARCHIVE_AFTER_DAYS = 30;
    const PAGE_BY_EXAM_ID = {
        "rssb-ldc-jra-bb6-2026": "../rank-predictor/rssb-ldc/index.html",
        "rrb-je-cbt-2-2026": "../rank-predictor/rrb-je/index.html"
    };
    const SEARCH_ALIASES = {
        "rssb": ["rsmssb", "rajasthan staff selection board"],
        "rsmssb": ["rssb", "rajasthan staff selection board"],
        "rrb": ["railway", "railway recruitment board"],
        "railway": ["rrb", "railway recruitment board"],
        "ldc": ["lower division clerk", "clerk grade ii", "clerk grade 2"],
        "jra": ["junior assistant", "jr assistant"],
        "jr": ["junior"],
        "je": ["junior engineer"],
        "alp": ["assistant loco pilot"],
        "omr": ["offline", "written"],
        "offline": ["omr", "written"],
        "online": ["cbt", "computer based test"],
        "cbt": ["online", "computer based test"],
        "normalised": ["normalized"],
        "normalized": ["normalised"],
        "district": ["state"],
        "state": ["district"]
    };
    const state = {
        exams: [],
        query: "",
        status: "active"
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRankCards, { once: true });
    } else {
        initRankCards();
    }

    async function initRankCards() {
        const grid = document.getElementById("rankCardGrid");
        if (!grid) return;
        const exams = await loadActiveExams();
        state.exams = exams;
        state.query = getInitialSearchQuery();
        state.status = getInitialStatusFilter();
        bindSearch();
        bindStatusTabs();
        syncSearchInput();
        syncStatusTabs();
        renderCards();
    }

    async function loadActiveExams() {
        const backendExams = await fetchBackendExams();
        if (backendExams.length) return backendExams;

        const staticExams = normalizeExams(window.GovJobUpdatesRankPredictorExams || []);
        if (staticExams.length) return staticExams;

        return normalizeExams(config.exams || []);
    }

    async function fetchBackendExams() {
        const phpBase = String(config.apiBaseUrl || "").trim().replace(/\/+$/, "");
        if (/^https:\/\/[^?#]+\/rank-api$/i.test(phpBase)) {
            const exams = await fetchExamUrl(`${phpBase}/exams.php`);
            if (exams.length) return exams;
        }

        const apiUrl = String(config.apiUrl || "").trim();
        if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/i.test(apiUrl)) return [];

        const url = new URL(apiUrl);
        url.searchParams.set("type", "exams");
        url.searchParams.set("_ts", String(Date.now()));
        return fetchExamUrl(url.toString());
    }

    async function fetchExamUrl(url) {
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), EXAM_LOAD_TIMEOUT_MS);
        try {
            const response = await fetch(url, {
                method: "GET",
                cache: "no-store",
                signal: controller.signal
            });
            if (!response.ok) return [];
            const payload = await response.json();
            return normalizeExams(payload && payload.success ? payload.exams : []);
        } catch {
            return [];
        } finally {
            window.clearTimeout(timer);
        }
    }

    function normalizeExams(source) {
        return (Array.isArray(source) ? source : [])
            .map((exam) => ({
                examId: text(exam.examId),
                examName: text(exam.examName),
                board: text(exam.board || "GJU"),
                examType: text(exam.examType),
                sheetName: text(exam.sheetName),
                hasShifts: Boolean(exam.hasShifts),
                normalization: Boolean(exam.normalization),
                supportedModes: normalizeList(exam.supportedModes),
                subjects: normalizeSubjectNames(exam.subjects),
                categories: normalizeList(exam.categories),
                horizontalCategories: normalizeList(exam.horizontalCategories),
                states: normalizeList(exam.states),
                disabled: Boolean(exam.disabled),
                status: normalizeRankExamStatus(exam.status),
                activeDate: normalizeRankExamDate(exam.activeDate),
                archiveAfterDays: RANK_PREDICTOR_ARCHIVE_AFTER_DAYS
            }))
            .map((exam) => {
                const effectiveStatus = getRankExamEffectiveStatus(exam);
                return Object.assign(exam, {
                    effectiveStatus: effectiveStatus,
                    canSubmit: effectiveStatus === "active",
                    canCheckRank: effectiveStatus === "active" || effectiveStatus === "archived"
                });
            })
            .filter((exam) => exam.examId && exam.examName && !exam.disabled);
    }

    function bindSearch() {
        const input = document.getElementById("rankExamSearch");
        const clear = document.getElementById("rankSearchClear");
        if (input) {
            input.addEventListener("input", () => {
                state.query = input.value;
                updateSearchUrl(state.query);
                renderCards();
            });
        }
        if (clear) {
            clear.addEventListener("click", () => {
                state.query = "";
                if (input) {
                    input.value = "";
                    input.focus();
                }
                updateSearchUrl("");
                renderCards();
            });
        }
    }

    function bindStatusTabs() {
        document.querySelectorAll("[data-rank-status]").forEach((button) => {
            button.addEventListener("click", () => {
                state.status = normalizeStatusFilter(button.dataset.rankStatus);
                updateSearchUrl(state.query, state.status);
                syncStatusTabs();
                renderCards();
            });
        });
    }

    function syncSearchInput() {
        const input = document.getElementById("rankExamSearch");
        if (input) input.value = state.query;
    }

    function renderCards() {
        const grid = document.getElementById("rankCardGrid");
        const subtitle = document.getElementById("rankCardsSubtitle");
        const meta = document.getElementById("rankSearchMeta");
        const clear = document.getElementById("rankSearchClear");
        if (!grid) return;

        const query = normalizeSearchText(state.query);
        const status = normalizeStatusFilter(state.status);
        const counts = getStatusCounts();
        const active = getFilteredExams(query, status);
        updateStatusCounts(counts);
        updateHeading(status);
        const total = state.exams.length;
        const statusTotal = counts[status] || 0;
        const statusLabel = getStatusLabel(status).toLowerCase();
        const activeText = active.length === 1 ? "exam" : "exams";
        if (subtitle) {
            subtitle.textContent = query
                ? `${active.length} of ${statusTotal} ${statusLabel} ${activeText} matched`
                : `${statusTotal} ${statusLabel} exam${statusTotal === 1 ? "" : "s"} available`;
        }
        if (meta) {
            meta.textContent = query
                ? active.length
                    ? `Showing ${active.length} matching rank predictor ${activeText}.`
                    : "No matching rank predictor found. Try exam name, board, short form, paper, category, or district."
                : `Search ${statusLabel} rank predictor exams by name, board, mode, subject, category, or district.`;
        }
        if (clear) clear.hidden = !query;
        if (!active.length) {
            grid.innerHTML = renderEmptyState(query);
            return;
        }

        grid.innerHTML = active.map(renderCard).join("");
    }

    function renderCard(exam) {
        const href = getPageUrl(exam);
        const status = getStatusMeta(exam);
        const rankType = exam.normalization ? "Normalized" : "Raw Rank";
        const shiftLabel = exam.hasShifts ? "Shift-wise" : "Single shift";
        return `
            <article class="rank-exam-card">
                <div class="rank-card-accent" aria-hidden="true"></div>
                <div class="rank-card-top">
                    <span class="rank-board-chip">${escapeHtml(getBoardLabel(exam.board))}</span>
                    <span class="rank-live-chip ${escapeAttribute(status.className)}"><i class="${escapeAttribute(status.icon)}" aria-hidden="true"></i> ${escapeHtml(status.label)}</span>
                </div>
                <div class="rank-card-title">
                    <h2>${escapeHtml(exam.examName)}</h2>
                    <p>${escapeHtml(getCardDescription(exam))}</p>
                </div>
                <div class="rank-card-details">
                    <span><i class="fas fa-file-lines" aria-hidden="true"></i>${escapeHtml(exam.sheetName || "Exam sheet")}</span>
                    <span><i class="fas fa-layer-group" aria-hidden="true"></i>${escapeHtml(shiftLabel)}</span>
                    <span><i class="fas fa-chart-simple" aria-hidden="true"></i>${escapeHtml(rankType)}</span>
                </div>
                <div class="rank-card-footer">
                    <div>
                        <span>Dedicated Page</span>
                        <strong>${escapeHtml(getCardFooterText(exam))}</strong>
                    </div>
                    <a href="${escapeAttribute(href)}">${escapeHtml(getCardCta(exam))} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                </div>
            </article>
        `;
    }

    function getFilteredExams(query, status = state.status) {
        const statusFiltered = state.exams.filter((exam) => normalizeStatusFilter(exam.effectiveStatus) === normalizeStatusFilter(status));
        if (!query) return statusFiltered;
        const tokens = getSearchTokens(query);
        if (!tokens.length) return statusFiltered;
        return statusFiltered.filter((exam) => {
            const searchable = buildSearchText(exam);
            return tokens.every((token) => searchable.includes(token));
        });
    }

    function renderEmptyState(query) {
        const suffix = query ? ` for "${escapeHtml(state.query.trim())}"` : "";
        return `
            <article class="rank-exam-card is-loading rank-search-empty">
                <i class="fas fa-search" aria-hidden="true"></i>
                <strong>No rank predictor found${suffix}</strong>
                <span>Try a board short form like RSSB, RRB, SSC, exam name, mode, paper name, category, district, or year.</span>
                <button type="button" data-rank-search-reset>Clear Search</button>
            </article>
        `;
    }

    function buildSearchText(exam) {
        const modeText = exam.supportedModes.length ? exam.supportedModes.join(" ") : exam.hasShifts ? "shift wise" : "";
        const rankText = [
            "overall rank category rank state rank district rank gender rank",
            exam.hasShifts ? "shift shiftwise shift-wise multiple shifts" : "single shift",
            exam.normalization ? "normalized normalised normalization" : "raw rank no normalization",
            exam.examType,
            modeText,
            exam.supportedModes.includes("offline") || exam.examType === "offline" ? "offline omr written paper answer key" : "",
            exam.supportedModes.includes("online") || exam.examType === "online" ? "online cbt computer based test response sheet" : ""
        ];
        return normalizeSearchText([
            exam.examId,
            exam.examName,
            exam.board,
            exam.sheetName,
            ...rankText,
            ...exam.supportedModes,
            ...exam.subjects,
            ...exam.categories,
            ...exam.horizontalCategories,
            ...exam.states,
            ...getAliasText(exam)
        ].join(" "));
    }

    function getAliasText(exam) {
        const base = normalizeSearchText([exam.examId, exam.examName, exam.board, exam.sheetName].join(" "));
        const aliases = [];
        Object.keys(SEARCH_ALIASES).forEach((key) => {
            if (base.includes(key)) aliases.push(...SEARCH_ALIASES[key]);
        });
        return aliases;
    }

    function getSearchTokens(query) {
        const normalized = normalizeSearchText(query);
        if (!normalized) return [];
        const directTokens = normalized.split(" ").filter(Boolean);
        const expanded = [];
        directTokens.forEach((token) => {
            expanded.push(token);
            (SEARCH_ALIASES[token] || []).forEach((alias) => {
                normalizeSearchText(alias).split(" ").filter(Boolean).forEach((part) => expanded.push(part));
            });
        });
        return [...new Set(expanded)].slice(0, 12);
    }

    function getInitialSearchQuery() {
        try {
            const params = new URLSearchParams(window.location.search);
            return text(params.get("q") || params.get("search"));
        } catch {
            return "";
        }
    }

    function getInitialStatusFilter() {
        try {
            return normalizeStatusFilter(new URLSearchParams(window.location.search).get("status"));
        } catch {
            return "active";
        }
    }

    function updateSearchUrl(query, status = state.status) {
        try {
            const url = new URL(window.location.href);
            const value = text(query);
            const statusValue = normalizeStatusFilter(status);
            if (value) {
                url.searchParams.set("q", value);
                url.searchParams.delete("search");
            } else {
                url.searchParams.delete("q");
                url.searchParams.delete("search");
            }
            if (statusValue === "active") {
                url.searchParams.delete("status");
            } else {
                url.searchParams.set("status", statusValue);
            }
            window.history.replaceState({}, "", url.toString());
        } catch {}
    }

    function getPageUrl(exam) {
        return PAGE_BY_EXAM_ID[exam.examId] || `../rank-predictor/${slugify(exam.examId)}/index.html`;
    }

    function getBoardLabel(board) {
        return text(board).split(/\s+/).slice(0, 2).join(" ").toUpperCase() || "EXAM";
    }

    function slugify(value) {
        return text(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "exam";
    }

    function normalizeList(value) {
        if (Array.isArray(value)) return value.map(text).filter(Boolean);
        return text(value).split(/[,|;]/).map(text).filter(Boolean);
    }

    function normalizeSubjectNames(value) {
        if (!Array.isArray(value)) return normalizeList(value);
        return value.map((subject) => text(subject && typeof subject === "object" ? subject.name : subject)).filter(Boolean);
    }

    function normalizeRankExamStatus(value) {
        const normalized = text(value).toLowerCase().replace(/\s+/g, " ");
        if (["upcoming", "coming soon", "coming-soon", "future"].includes(normalized)) return "upcoming";
        if (["archived", "archive", "closed", "close"].includes(normalized)) return "archived";
        return "active";
    }

    function normalizeRankExamDate(value) {
        const source = text(value);
        if (!source) return "";
        const match = source.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (match) return `${match[1]}-${match[2]}-${match[3]}`;
        const date = new Date(source);
        return Number.isNaN(date.getTime()) ? "" : getLocalDateString(date);
    }

    function getRankExamEffectiveStatus(exam) {
        if (!exam || exam.disabled) return "disabled";
        const status = normalizeRankExamStatus(exam.status);
        if (status === "archived") return "archived";

        const activeMs = getRankExamDateStartMs(exam.activeDate);
        const todayMs = getRankExamDateStartMs(getLocalDateString(new Date()));
        if (status === "upcoming" && (!activeMs || todayMs < activeMs)) return "upcoming";
        if (activeMs && todayMs > activeMs + (RANK_PREDICTOR_ARCHIVE_AFTER_DAYS * 24 * 60 * 60 * 1000)) return "archived";
        return "active";
    }

    function getRankExamDateStartMs(value) {
        const dateText = normalizeRankExamDate(value);
        if (!dateText) return 0;
        const date = new Date(`${dateText}T00:00:00`);
        return Number.isNaN(date.getTime()) ? 0 : date.getTime();
    }

    function getLocalDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function getStatusMeta(exam) {
        const status = exam.effectiveStatus || getRankExamEffectiveStatus(exam);
        if (status === "upcoming") return { label: "Upcoming", icon: "fas fa-clock", className: "is-upcoming" };
        if (status === "archived") return { label: "Archived", icon: "fas fa-box-archive", className: "is-archived" };
        return { label: "Active", icon: "fas fa-circle", className: "is-active-status" };
    }

    function syncStatusTabs() {
        const selected = normalizeStatusFilter(state.status);
        document.querySelectorAll("[data-rank-status]").forEach((button) => {
            const active = normalizeStatusFilter(button.dataset.rankStatus) === selected;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", String(active));
        });
    }

    function updateStatusCounts(counts) {
        setText("rankStatusCountActive", counts.active || 0);
        setText("rankStatusCountUpcoming", counts.upcoming || 0);
        setText("rankStatusCountArchived", counts.archived || 0);
    }

    function updateHeading(status) {
        const title = document.getElementById("rankCardsTitle");
        if (!title) return;
        title.textContent = `${getStatusLabel(status)} Exam Rank Predictors`;
    }

    function getStatusCounts() {
        return state.exams.reduce((counts, exam) => {
            const status = normalizeStatusFilter(exam.effectiveStatus);
            counts[status] = (counts[status] || 0) + 1;
            return counts;
        }, { active: 0, upcoming: 0, archived: 0 });
    }

    function normalizeStatusFilter(value) {
        const status = text(value).toLowerCase();
        return ["upcoming", "archived"].includes(status) ? status : "active";
    }

    function getStatusLabel(status) {
        if (status === "upcoming") return "Upcoming";
        if (status === "archived") return "Archived";
        return "Active";
    }

    function getCardDescription(exam) {
        const status = normalizeStatusFilter(exam.effectiveStatus);
        if (status === "upcoming") return "Rank predictor page is ready. Data entry opens when this exam becomes active.";
        if (status === "archived") return "New entries are closed. Previously submitted candidates can still check rank.";
        return "Check your expected rank using answer key details.";
    }

    function getCardFooterText(exam) {
        const status = normalizeStatusFilter(exam.effectiveStatus);
        if (status === "upcoming") return exam.activeDate ? `Opens ${exam.activeDate}` : "Waiting for active date";
        if (status === "archived") return "Only rank lookup";
        return "Exam form connected";
    }

    function getCardCta(exam) {
        const status = normalizeStatusFilter(exam.effectiveStatus);
        if (status === "upcoming") return "View Page";
        if (status === "archived") return "Check Rank";
        return "Check Your Rank";
    }

    function setText(id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = String(value);
    }

    function normalizeSearchText(value) {
        return text(value).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
    }

    function text(value) {
        return String(value || "").trim();
    }

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/`/g, "&#96;");
    }

    document.addEventListener("click", (event) => {
        if (!event.target.closest("[data-rank-search-reset]")) return;
        state.query = "";
        syncSearchInput();
        updateSearchUrl("");
        renderCards();
    });
})();
