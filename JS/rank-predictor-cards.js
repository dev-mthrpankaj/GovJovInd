(function () {
    "use strict";

    const config = window.RANK_PREDICTOR_CONFIG || { exams: [] };
    const EXAM_LOAD_TIMEOUT_MS = Number(config.examLoadTimeoutMs) > 0 ? Number(config.examLoadTimeoutMs) : 8000;
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
        query: ""
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
        bindSearch();
        bindSearchShortcut();
        syncSearchInput();
        renderCards();
    }

    async function loadActiveExams() {
        const staticExams = normalizeExams(window.GovJobUpdatesRankPredictorExams || []);
        if (staticExams.length) return staticExams;

        const sheetExams = await fetchSheetExams();
        if (sheetExams.length) return sheetExams;

        return normalizeExams(config.exams || []);
    }

    async function fetchSheetExams() {
        const apiUrl = String(config.apiUrl || "").trim();
        if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/i.test(apiUrl)) return [];

        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), EXAM_LOAD_TIMEOUT_MS);
        try {
            const url = new URL(apiUrl);
            url.searchParams.set("type", "exams");
            url.searchParams.set("_ts", String(Date.now()));
            const response = await fetch(url.toString(), {
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
                disabled: Boolean(exam.disabled)
            }))
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

    function bindSearchShortcut() {
        const link = document.querySelector(".rank-cards-all-btn");
        const input = document.getElementById("rankExamSearch");
        if (!link || !input) return;

        link.addEventListener("click", (event) => {
            event.preventDefault();
            input.scrollIntoView({ behavior: "smooth", block: "center" });
            input.focus({ preventScroll: true });
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
        const active = getFilteredExams(query);
        const total = state.exams.length;
        const activeText = active.length === 1 ? "exam" : "exams";
        if (subtitle) {
            subtitle.textContent = query
                ? `${active.length} of ${total} active ${activeText} matched`
                : `${total} active exam${total === 1 ? "" : "s"} available for rank check`;
        }
        if (meta) {
            meta.textContent = query
                ? active.length
                    ? `Showing ${active.length} matching rank predictor ${activeText}.`
                    : "No matching rank predictor found. Try exam name, board, short form, paper, category, or district."
                : "Search active rank predictor exams by name, board, mode, subject, category, or district.";
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
        const rankType = exam.normalization ? "Normalized" : "Raw Rank";
        const shiftLabel = exam.hasShifts ? "Shift-wise" : "Single shift";
        return `
            <article class="rank-exam-card">
                <div class="rank-card-accent" aria-hidden="true"></div>
                <div class="rank-card-top">
                    <span class="rank-board-chip">${escapeHtml(getBoardLabel(exam.board))}</span>
                    <span class="rank-live-chip"><i class="fas fa-circle" aria-hidden="true"></i> Active</span>
                </div>
                <div class="rank-card-title">
                    <h2>${escapeHtml(exam.examName)}</h2>
                    <p>Check your expected rank using answer key details.</p>
                </div>
                <div class="rank-card-details">
                    <span><i class="fas fa-file-lines" aria-hidden="true"></i>${escapeHtml(exam.sheetName || "Exam sheet")}</span>
                    <span><i class="fas fa-layer-group" aria-hidden="true"></i>${escapeHtml(shiftLabel)}</span>
                    <span><i class="fas fa-chart-simple" aria-hidden="true"></i>${escapeHtml(rankType)}</span>
                </div>
                <div class="rank-card-footer">
                    <div>
                        <span>Dedicated Page</span>
                        <strong>Exam form connected</strong>
                    </div>
                    <a href="${escapeAttribute(href)}">Check Your Rank <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                </div>
            </article>
        `;
    }

    function getFilteredExams(query) {
        if (!query) return state.exams;
        const tokens = getSearchTokens(query);
        if (!tokens.length) return state.exams;
        return state.exams.filter((exam) => {
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

    function updateSearchUrl(query) {
        try {
            const url = new URL(window.location.href);
            const value = text(query);
            if (value) {
                url.searchParams.set("q", value);
                url.searchParams.delete("search");
            } else {
                url.searchParams.delete("q");
                url.searchParams.delete("search");
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
