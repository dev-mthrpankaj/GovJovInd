(function () {
    "use strict";

    const config = window.RANK_PREDICTOR_CONFIG || { exams: [] };
    const API_INVALID_URL_MESSAGE = "Backend URL is not configured correctly.";
    const API_NETWORK_ERROR_MESSAGE = "Server connection failed. Please try again.";
    const API_INVALID_RESPONSE_MESSAGE = "Invalid backend response.";
    const PROCESSING_TEXT = "Processing...";
    const SHARE_BUTTON_IDLE_HTML = '<i class="fas fa-share-alt" aria-hidden="true"></i> Share / Copy';
    const RESULT_STORAGE_KEY = "gju_rank_predictor_latest_result";
    const RESULT_PAGE_URL = "rank-result.html";
    const EXAM_LOAD_TIMEOUT_MS = Number(config.examLoadTimeoutMs) > 0 ? Number(config.examLoadTimeoutMs) : 8000;
    const MOBILE_LAYOUT_QUERY = "(max-width: 767px)";
    const DEFAULT_CATEGORY_OPTIONS = ["UR", "OBC", "EWS", "SC", "ST", "PwD", "Ex-Serviceman"];
    const DEFAULT_HORIZONTAL_CATEGORY_OPTIONS = ["None", "PwD", "Ex-Serviceman", "Female", "Freedom Fighter Dependent", "Departmental Candidate", "Other"];
    const state = {
        exam: null,
        mode: "offline",
        activeTab: "submit",
        expectedMarks: 0,
        marksFrame: 0,
        marksDirty: false,
        mobileMarksMode: false
    };
    const dom = {
        byId: Object.create(null),
        tabButtons: [],
        panels: [],
        modeButtons: [],
        formAccordions: [],
        subjectControls: [],
        invalidFields: new Set(),
        errorContainers: new Set()
    };
    const debouncedTotalCalculation = debounce(runMarksCalculation, 120);
    const debouncedSubjectCalculation = debounce(runMarksCalculation, 120);
    const debouncedMobileCalculation = debounce(runMobileMarksCalculation, 120);

    document.addEventListener("DOMContentLoaded", initRankPredictor);

    function debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    function cacheStaticDom() {
        dom.tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
        dom.panels = Array.from(document.querySelectorAll("[data-panel]"));
        dom.modeButtons = Array.from(document.querySelectorAll("button[data-mode]"));
        dom.formAccordions = Array.from(document.querySelectorAll(".form-accordion"));
    }

    function cacheSubjectControls(grid = getById("subjectEntryGrid")) {
        dom.subjectControls = Array.from(grid?.querySelectorAll("[data-subject-index]") || []).map((card) => ({
            card,
            correct: card.querySelector('[data-subject-field="correct"]'),
            wrong: card.querySelector('[data-subject-field="wrong"]'),
            attempted: card.querySelector('[data-subject-derived="attempted"]'),
            unattempted: card.querySelector('[data-subject-derived="unattempted"]'),
            summaryAttempted: card.querySelector('[data-subject-summary="attempted"]')
        }));
    }

    function getById(id) {
        const cached = dom.byId[id];
        if (cached && document.documentElement.contains(cached)) return cached;
        const node = document.getElementById(id);
        dom.byId[id] = node;
        return node;
    }

    function isSubjectInput(target) {
        return Boolean(target?.classList?.contains("subject-input"));
    }

    function isMarksInput(target) {
        return isSubjectInput(target) || ["totalAttempted", "rightAnswers", "wrongAnswers"].includes(target?.id);
    }

    function detectMobileMarksMode() {
        return Boolean(window.matchMedia?.(`(pointer: coarse), ${MOBILE_LAYOUT_QUERY}`)?.matches || window.innerWidth <= 767);
    }

    function isMobileLayout() {
        return Boolean(window.matchMedia?.(MOBILE_LAYOUT_QUERY)?.matches || window.innerWidth <= 767);
    }

    async function initRankPredictor() {
        const app = getById("rankPredictorApp");
        if (!app) return;

        cacheStaticDom();
        state.mobileMarksMode = detectMobileMarksMode();
        const hasStaticExamConfig = loadStaticExamConfig();
        if (!hasStaticExamConfig) await loadSheetExamConfig();
        setSelectedExam((config.exams || []).find((exam) => !exam.disabled) || null);
        bindTabs();
        bindExamSelector();
        bindCategoryOptions();
        bindHorizontalCategoryOptions();
        bindModeToggle(app);
        bindSubmitForm();
        bindCheckForm();
        bindFormAccordions();
        bindStepperNavigation();
        bindKeyboardFocusHandling(app);
        bindShareCard();
        applyExamDefaults();
        hydrateCandidateSession();
        renderPendingResult();
        window.addEventListener("resize", debounce(() => {
            state.mobileMarksMode = detectMobileMarksMode();
            applyAccordionDefaults();
        }, 160), { passive: true });
    }

    function loadStaticExamConfig() {
        const staticExams = Array.isArray(window.GovJobUpdatesRankPredictorExams)
            ? normalizeSheetExams(window.GovJobUpdatesRankPredictorExams).filter((exam) => !exam.disabled)
            : [];
        if (!staticExams.length) return false;

        config.exams = staticExams;
        window.RANK_PREDICTOR_CONFIG = config;
        return true;
    }

    async function loadSheetExamConfig() {
        try {
            const sheetExams = await fetchSheetExamConfig();
            if (sheetExams.length) {
                config.exams = sheetExams;
                window.RANK_PREDICTOR_CONFIG = config;
            }
        } catch {
            // Fallback exams in rank-predictor-config.js keep the form usable.
        }
    }

    async function fetchSheetExamConfig() {
        const apiUrl = String(config.apiUrl || "").trim();
        if (!apiUrl || !apiUrl.startsWith("https://") || !apiUrl.endsWith("/exec") || apiUrl.includes("/dev")) return [];

        const url = new URL(apiUrl, window.location.href);
        url.searchParams.set("type", "exams");
        url.searchParams.set("_ts", String(Date.now()));

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), EXAM_LOAD_TIMEOUT_MS);
        try {
            const response = await fetch(url.toString(), {
                method: "GET",
                cache: "no-store",
                redirect: "follow",
                signal: controller.signal
            });
            if (!response.ok) return [];
            const payload = await response.json();
            if (!payload?.success || !Array.isArray(payload.exams)) return [];
            return normalizeSheetExams(payload.exams);
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function normalizeSheetExams(exams) {
        return exams.map(normalizeSheetExam).filter((exam) => exam.examId && exam.examName);
    }

    function normalizeSheetExam(exam) {
        const normalized = {
            examId: getString(exam.examId),
            examName: getString(exam.examName),
            board: getString(exam.board, "GovJobUpdates"),
            examType: getString(exam.examType, "offline"),
            sheetName: getString(exam.sheetName),
            totalQuestions: getFiniteNumber(exam.totalQuestions, 0),
            marksPerCorrect: getFiniteNumber(exam.marksPerCorrect, 0),
            negativeMarking: getFiniteNumber(exam.negativeMarking, 0),
            hasShifts: Boolean(exam.hasShifts),
            normalization: Boolean(exam.normalization),
            supportedModes: normalizeStringList(exam.supportedModes, true).filter((mode) => ["online", "offline"].includes(mode)),
            subjectPassingCriteria: normalizeSubjectPassingCriteriaList(exam.subjectPassingCriteria),
            overallPassingCriteria: normalizeOverallPassingCriteria(exam.overallPassingCriteria),
            subjects: [],
            categories: normalizeStringList(exam.categories),
            horizontalCategories: normalizeStringList(exam.horizontalCategories),
            states: normalizeStringList(exam.states),
            disabled: Boolean(exam.disabled)
        };
        normalized.subjects = normalizeSheetSubjects(exam.subjects, normalized.subjectPassingCriteria);
        if (!normalized.supportedModes.length && !normalized.disabled) {
            normalized.supportedModes = [normalized.examType === "online" ? "online" : "offline"];
        }
        return normalized;
    }

    function normalizeSheetSubjects(subjects, criteriaList = []) {
        if (!Array.isArray(subjects)) return [];
        return subjects.map((subject) => {
            const name = getString(subject.name);
            const criteria = normalizeSubjectPassingCriteria(subject.passingCriteria || subject.criteria) || getPassingCriteriaForSubject(name, criteriaList);
            const normalizedSubject = {
                name,
                questions: getFiniteNumber(subject.questions, 0)
            };
            if (criteria) normalizedSubject.passingCriteria = criteria;
            return normalizedSubject;
        }).filter((subject) => subject.name && subject.questions > 0);
    }

    function normalizeSubjectPassingCriteriaList(criteriaList) {
        if (!Array.isArray(criteriaList)) return [];
        return criteriaList.map(normalizeSubjectPassingCriteria).filter(Boolean);
    }

    function normalizeSubjectPassingCriteria(criteria) {
        if (!criteria || typeof criteria !== "object") return null;
        const categoryRules = normalizePassingCriteriaRuleMap(criteria.categoryRules || criteria.categoryCriteria || criteria.categories);
        const horizontalCategoryRules = normalizePassingCriteriaRuleMap(criteria.horizontalCategoryRules || criteria.horizontalCriteria || criteria.horizontalCategories);
        const implicitRules = !hasPassingCriteriaThreshold(criteria) && !hasPassingCriteriaRuleMap(categoryRules) && !hasPassingCriteriaRuleMap(horizontalCategoryRules)
            ? normalizePassingCriteriaRuleMap(criteria)
            : {};
        const normalized = {
            name: getString(criteria.name || criteria.subject || criteria.subjectName),
            minMarks: getOptionalNumber(criteria.minMarks ?? criteria.minimumMarks ?? criteria.marks ?? criteria.min),
            minPercentage: getOptionalNumber(criteria.minPercentage ?? criteria.minimumPercentage ?? criteria.percentage ?? criteria.percent),
            minCorrect: getOptionalNumber(criteria.minCorrect ?? criteria.minimumCorrect ?? criteria.correct),
            categoryRules: hasPassingCriteriaRuleMap(categoryRules) ? categoryRules : implicitRules,
            horizontalCategoryRules
        };
        return normalized.name && (hasPassingCriteriaThreshold(normalized) || hasPassingCriteriaRuleMap(normalized.categoryRules) || hasPassingCriteriaRuleMap(normalized.horizontalCategoryRules))
            ? normalized
            : null;
    }

    function normalizeOverallPassingCriteria(criteria) {
        if (!criteria || typeof criteria !== "object") return null;
        const directRules = normalizePassingCriteriaRuleMap(criteria);
        const explicitCategoryRules = normalizePassingCriteriaRuleMap(criteria.categoryRules || criteria.categoryCriteria || criteria.categories);
        const horizontalCategoryRules = normalizePassingCriteriaRuleMap(criteria.horizontalCategoryRules || criteria.horizontalCriteria || criteria.horizontalCategories);
        const normalized = {
            minMarks: getOptionalNumber(criteria.minMarks ?? criteria.minimumMarks ?? criteria.marks ?? criteria.min),
            minPercentage: getOptionalNumber(criteria.minPercentage ?? criteria.minimumPercentage ?? criteria.percentage ?? criteria.percent),
            minCorrect: getOptionalNumber(criteria.minCorrect ?? criteria.minimumCorrect ?? criteria.correct),
            categoryRules: { ...directRules, ...explicitCategoryRules },
            horizontalCategoryRules
        };
        return hasPassingCriteriaThreshold(normalized) || hasPassingCriteriaRuleMap(normalized.categoryRules) || hasPassingCriteriaRuleMap(normalized.horizontalCategoryRules)
            ? normalized
            : null;
    }

    function normalizePassingCriteriaRuleMap(value) {
        if (!value || typeof value !== "object" || Array.isArray(value)) return {};
        const ignoredKeys = new Set(["name", "subject", "subjectname", "minmarks", "minimummarks", "marks", "min", "minpercentage", "minimumpercentage", "percentage", "percent", "mincorrect", "minimumcorrect", "correct", "categoryrules", "categorycriteria", "categories", "horizontalcategoryrules", "horizontalcriteria", "horizontalcategories"]);
        return Object.entries(value).reduce((rules, [key, source]) => {
            if (!getString(key) || ignoredKeys.has(normalizeKey(key))) return rules;
            const rule = source && typeof source === "object"
                ? normalizePassingCriteriaThreshold(source)
                : normalizePassingCriteriaThreshold({ minMarks: source });
            if (hasPassingCriteriaThreshold(rule)) rules[getString(key)] = rule;
            return rules;
        }, {});
    }

    function normalizePassingCriteriaThreshold(criteria) {
        if (!criteria || typeof criteria !== "object") return null;
        return {
            minMarks: getOptionalNumber(criteria.minMarks ?? criteria.minimumMarks ?? criteria.marks ?? criteria.min),
            minPercentage: getOptionalNumber(criteria.minPercentage ?? criteria.minimumPercentage ?? criteria.percentage ?? criteria.percent),
            minCorrect: getOptionalNumber(criteria.minCorrect ?? criteria.minimumCorrect ?? criteria.correct)
        };
    }

    function hasPassingCriteriaThreshold(criteria) {
        return Boolean(criteria && (criteria.minMarks !== null || criteria.minPercentage !== null || criteria.minCorrect !== null));
    }

    function hasPassingCriteriaRuleMap(rules) {
        return Boolean(rules && Object.values(rules).some(hasPassingCriteriaThreshold));
    }

    function getPassingCriteriaForSubject(name, criteriaList) {
        const key = normalizeKey(name);
        return (criteriaList || []).find((criteria) => normalizeKey(criteria.name) === key) || null;
    }

    function normalizeStringList(value, lowerCase = false) {
        const normalizeItem = (item) => {
            const text = getString(item);
            return lowerCase ? text.toLowerCase() : text;
        };
        if (Array.isArray(value)) return value.map(normalizeItem).filter(Boolean);
        return getString(value).split(/[,|;]/).map((item) => normalizeItem(item.trim())).filter(Boolean);
    }

    function getString(value, fallback = "") {
        const text = String(value === undefined || value === null ? "" : value).trim();
        return text || fallback;
    }

    function normalizeKey(value) {
        return getString(value).toLowerCase().replace(/\s+/g, " ");
    }

    function getFiniteNumber(value, fallback) {
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    }

    function getOptionalNumber(value) {
        if (value === undefined || value === null || value === "") return null;
        const number = Number(String(value).replace(/%$/, "").trim());
        return Number.isFinite(number) ? number : null;
    }

    function bindTabs() {
        dom.tabButtons.forEach((button) => {
            button.addEventListener("click", () => setTab(button.dataset.tab));
        });
        setTab(state.activeTab);
    }

    function setTab(tab) {
        state.activeTab = tab === "check" ? "check" : "submit";
        dom.tabButtons.forEach((button) => {
            const active = button.dataset.tab === state.activeTab;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", String(active));
        });
        dom.panels.forEach((panel) => {
            const active = panel.dataset.panel === state.activeTab;
            panel.classList.toggle("is-active", active);
            panel.toggleAttribute("hidden", !active);
        });
    }

    function bindExamSelector() {
        const select = getById("globalExamSelect");
        if (!select) return;
        renderExamOptions();
        renderExamQuickPicks();
        bindExamSearch();
        select.addEventListener("change", () => {
            clearFieldError({ target: select });
            let selectedExam = (config.exams || []).find((exam) => exam.examId === select.value) || null;
            if (selectedExam?.disabled) selectedExam = (config.exams || []).find((exam) => !exam.disabled) || null;
            setSelectedExam(selectedExam, { syncSearch: false });
            applyExamDefaults();
            renderPendingResult();
        });
    }

    function bindExamSearch() {
        const input = getById("examSearchInput");
        if (!input || input.dataset.bound === "true") return;
        input.dataset.bound = "true";
        input.addEventListener("input", () => {
            renderExamOptions(getSelectedExam()?.examId || "", input.value);
            updateExamQuickPickState();
        });
        input.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            const firstVisible = getVisibleExamOptions()[0];
            if (!firstVisible) return;
            event.preventDefault();
            chooseExam(firstVisible.examId, { syncSearch: true, focusSelect: true });
        });
    }

    function renderExamOptions(selectedId = getSelectedExam()?.examId || "", query = getById("examSearchInput")?.value || "") {
        const select = getById("globalExamSelect");
        if (!select) return;

        const exams = Array.isArray(config.exams) ? config.exams : [];
        const visibleExams = filterExamOptions(exams, query);
        const selectedExam = exams.find((exam) => exam.examId === selectedId);
        const optionExams = selectedExam && !visibleExams.some((exam) => exam.examId === selectedExam.examId)
            ? [selectedExam].concat(visibleExams)
            : visibleExams;

        select.innerHTML = optionExams.length
            ? optionExams.map((exam) => `<option value="${escapeAttr(exam.examId)}" ${exam.disabled ? "disabled" : ""}>${escapeHtml(exam.examName)}</option>`).join("")
            : '<option value="">No matching exams found</option>';
        if (selectedId && optionExams.some((exam) => exam.examId === selectedId)) select.value = selectedId;
        updateExamSearchStatus(visibleExams.length, exams.filter((exam) => !exam.disabled).length, query);
    }

    function filterExamOptions(exams, query = "") {
        const search = normalizeKey(query);
        return exams.filter((exam) => {
            if (!exam || exam.disabled) return false;
            if (!search) return true;
            const haystack = [
                exam.examName,
                exam.examId,
                exam.board,
                exam.examType,
                exam.sheetName,
                ...(exam.categories || []),
                ...(exam.states || [])
            ].join(" ");
            return normalizeKey(haystack).includes(search);
        });
    }

    function getVisibleExamOptions() {
        return filterExamOptions(config.exams || [], getById("examSearchInput")?.value || "");
    }

    function updateExamSearchStatus(count, total, query = "") {
        const status = getById("examSearchStatus");
        if (!status) return;
        if (!total) {
            setNodeText(status, "No Rank Predictor exams are configured yet.");
            return;
        }
        if (!String(query || "").trim()) {
            setNodeText(status, `${total} exam setup${total === 1 ? "" : "s"} available. Search by exam name, board, state, or year.`);
            return;
        }
        setNodeText(status, count ? `${count} matching exam setup${count === 1 ? "" : "s"} found.` : "No matching exam found. Clear search or use the full exam list.");
    }

    function renderExamQuickPicks() {
        const host = getById("examQuickPicks");
        if (!host) return;
        const exams = (config.exams || []).filter((exam) => !exam.disabled).slice(0, 6);
        if (!exams.length) {
            host.hidden = true;
            host.innerHTML = "";
            return;
        }
        host.hidden = false;
        host.innerHTML = exams.map((exam) => `
            <button class="exam-quick-chip" type="button" data-exam-id="${escapeAttr(exam.examId)}">
                ${escapeHtml(getShortExamLabel(exam.examName))}
            </button>`).join("");
        if (host.dataset.bound !== "true") {
            host.dataset.bound = "true";
            host.addEventListener("click", (event) => {
                const button = event.target?.closest?.("[data-exam-id]");
                if (!button || !host.contains(button)) return;
                chooseExam(button.dataset.examId, { syncSearch: true, focusSelect: false });
            });
        }
        updateExamQuickPickState();
    }

    function updateExamQuickPickState() {
        const host = getById("examQuickPicks");
        const selectedId = getSelectedExam()?.examId || "";
        if (!host) return;
        host.querySelectorAll("[data-exam-id]").forEach((button) => {
            const active = button.dataset.examId === selectedId;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    function getShortExamLabel(name) {
        return getString(name).replace(/\s+/g, " ").slice(0, 34);
    }

    function chooseExam(examId, options = {}) {
        const exam = (config.exams || []).find((item) => item.examId === examId && !item.disabled) || null;
        if (!exam) return;
        setSelectedExam(exam, options);
        renderExamOptions(exam.examId, options.syncSearch ? exam.examName : getById("examSearchInput")?.value || "");
        applyExamDefaults();
        renderPendingResult();
        if (options.focusSelect) getById("globalExamSelect")?.focus({ preventScroll: true });
    }

    function applyExamDefaults() {
        const exam = getSelectedExam();
        if (!exam) {
            setText("activeExamLabel", "Not configured");
            setText("activeModeLabel", "No exam");
            showMessage("submitMessage", "No Rank Predictor exams are configured.", "error");
            return;
        }

        setValue("globalExamSelect", exam.examId);
        updateExamQuickPickState();
        setValue("submitExamName", exam.examName);
        setValue("checkExamName", exam.examName);
        setText("activeExamLabel", exam.examName);
        setText("activeModeLabel", getModeLabel(exam.supportedModes || []));
        setText("normalizationLabel", exam.normalization ? "Yes" : "No");
        setFixedExamInfo(exam);
        renderSubjectInputs(exam);
        syncAttemptEntrySections(exam);
        setAggregateAttemptFieldsReadonly(exam);
        populateCategoryOptions(exam.categories || []);
        populateHorizontalCategoryOptions(exam.horizontalCategories || []);
        populateSelect(getById("state"), exam.states || []);
        getById("rankPredictorApp")?.classList.toggle("has-shift", Boolean(exam.hasShifts));
        const shift = getById("shift");
        if (shift) {
            shift.required = Boolean(exam.hasShifts);
            shift.value = "";
        }
        setValue("checkShift", "");
        setValue("totalAttempted", 0);
        setValue("rightAnswers", 0);
        setValue("wrongAnswers", 0);
        setMode((exam.supportedModes || [])[0] || "offline");
        calculateMarks();
        applyAccordionDefaults();
    }

    function populateSelect(select, values, placeholder = "Select") {
        if (!select) return;
        select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${values.map((value) => `<option value="${escapeAttr(value)}">${escapeHtml(value)}</option>`).join("")}`;
    }

    function bindCategoryOptions() {
        const group = getById("categoryOptions");
        if (!group) return;

        group.addEventListener("click", (event) => {
            const button = event.target?.closest?.("[data-category-value]");
            if (!button || !group.contains(button)) return;
            setCategoryOption(button.dataset.categoryValue, { focus: true });
        });

        group.addEventListener("keydown", (event) => {
            const button = event.target?.closest?.("[data-category-value]");
            if (!button || !group.contains(button)) return;

            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                setCategoryOption(button.dataset.categoryValue, { focus: true });
                return;
            }

            const buttons = Array.from(group.querySelectorAll("[data-category-value]"));
            if (!buttons.length || !["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
            event.preventDefault();

            const currentIndex = Math.max(buttons.indexOf(button), 0);
            let nextIndex = currentIndex;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % buttons.length;
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = buttons.length - 1;
            setCategoryOption(buttons[nextIndex].dataset.categoryValue, { focus: true });
        });
    }

    function populateCategoryOptions(values) {
        const group = getById("categoryOptions");
        const hiddenInput = getById("category");
        if (!group || !hiddenInput) return;

        const options = normalizeCategoryOptions(values);
        group.innerHTML = options.map((value, index) => `
            <button class="category-chip" type="button" role="radio" aria-checked="false" tabindex="${index === 0 ? "0" : "-1"}" data-category-value="${escapeAttr(value)}">
                ${escapeHtml(value)}
            </button>`).join("");
        setCategoryOption("");
    }

    function normalizeCategoryOptions(values) {
        const options = normalizeStringList(values);
        const source = options.length ? options : DEFAULT_CATEGORY_OPTIONS;
        return source.filter((value, index, list) => list.indexOf(value) === index);
    }

    function setCategoryOption(value, options = {}) {
        const group = getById("categoryOptions");
        const hiddenInput = getById("category");
        if (!group || !hiddenInput) return;

        const selectedValue = String(value || "").trim();
        hiddenInput.value = selectedValue;
        syncCategoryOptionState(selectedValue);

        hiddenInput.dispatchEvent(new Event("input", { bubbles: true }));
        hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));

        if (options.focus) {
            const selectedButton = getCategoryButton(selectedValue) || group.querySelector("[data-category-value]");
            selectedButton?.focus({ preventScroll: true });
        }
    }

    function syncCategoryOptionState(selectedValue) {
        const group = getById("categoryOptions");
        if (!group) return;
        const buttons = Array.from(group.querySelectorAll("[data-category-value]"));
        buttons.forEach((button, index) => {
            const selected = button.dataset.categoryValue === selectedValue;
            button.classList.toggle("is-selected", selected);
            button.setAttribute("aria-checked", String(selected));
            button.tabIndex = selected || (!selectedValue && index === 0) ? 0 : -1;
        });
    }

    function getCategoryButton(value) {
        const group = getById("categoryOptions");
        if (!group) return null;
        return Array.from(group.querySelectorAll("[data-category-value]")).find((button) => button.dataset.categoryValue === value) || null;
    }

    function bindHorizontalCategoryOptions() {
        const group = getById("horizontalCategoryOptions");
        if (!group) return;

        group.addEventListener("click", (event) => {
            const button = event.target?.closest?.("[data-horizontal-category-value]");
            if (!button || !group.contains(button)) return;
            setHorizontalCategoryOption(button.dataset.horizontalCategoryValue, { focus: true });
        });

        group.addEventListener("keydown", (event) => {
            const button = event.target?.closest?.("[data-horizontal-category-value]");
            if (!button || !group.contains(button)) return;

            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                setHorizontalCategoryOption(button.dataset.horizontalCategoryValue, { focus: true });
                return;
            }

            const buttons = Array.from(group.querySelectorAll("[data-horizontal-category-value]"));
            if (!buttons.length || !["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
            event.preventDefault();

            const currentIndex = Math.max(buttons.indexOf(button), 0);
            let nextIndex = currentIndex;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % buttons.length;
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = buttons.length - 1;
            setHorizontalCategoryOption(buttons[nextIndex].dataset.horizontalCategoryValue, { focus: true });
        });
    }

    function populateHorizontalCategoryOptions(values) {
        const group = getById("horizontalCategoryOptions");
        const hiddenInput = getById("horizontalCategory");
        if (!group || !hiddenInput) return;

        const options = normalizeHorizontalCategoryOptions(values);
        group.innerHTML = options.map((value, index) => `
            <button class="category-chip" type="button" role="radio" aria-checked="false" tabindex="${index === 0 ? "0" : "-1"}" data-horizontal-category-value="${escapeAttr(value)}">
                ${escapeHtml(value)}
            </button>`).join("");
        setHorizontalCategoryOption(options[0] || "");
    }

    function normalizeHorizontalCategoryOptions(values) {
        const options = normalizeStringList(values);
        const source = options.length ? options : DEFAULT_HORIZONTAL_CATEGORY_OPTIONS;
        const withNone = source.some((value) => normalizeKey(value) === "none") ? source : ["None"].concat(source);
        return withNone.filter((value, index, list) => list.indexOf(value) === index);
    }

    function setHorizontalCategoryOption(value, options = {}) {
        const group = getById("horizontalCategoryOptions");
        const hiddenInput = getById("horizontalCategory");
        if (!group || !hiddenInput) return;

        const selectedValue = String(value || "").trim();
        hiddenInput.value = selectedValue;
        syncHorizontalCategoryOptionState(selectedValue);

        hiddenInput.dispatchEvent(new Event("input", { bubbles: true }));
        hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));

        if (options.focus) {
            const selectedButton = getHorizontalCategoryButton(selectedValue) || group.querySelector("[data-horizontal-category-value]");
            selectedButton?.focus({ preventScroll: true });
        }
    }

    function syncHorizontalCategoryOptionState(selectedValue) {
        const group = getById("horizontalCategoryOptions");
        if (!group) return;
        const buttons = Array.from(group.querySelectorAll("[data-horizontal-category-value]"));
        buttons.forEach((button, index) => {
            const selected = button.dataset.horizontalCategoryValue === selectedValue;
            button.classList.toggle("is-selected", selected);
            button.setAttribute("aria-checked", String(selected));
            button.tabIndex = selected || (!selectedValue && index === 0) ? 0 : -1;
        });
    }

    function getHorizontalCategoryButton(value) {
        const group = getById("horizontalCategoryOptions");
        if (!group) return null;
        return Array.from(group.querySelectorAll("[data-horizontal-category-value]")).find((button) => button.dataset.horizontalCategoryValue === value) || null;
    }

    function bindModeToggle(app) {
        dom.modeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (!button.disabled) setMode(button.dataset.mode, app);
            });
        });
    }

    function setMode(mode, app = getById("rankPredictorApp")) {
        const supported = state.exam?.supportedModes || ["offline"];
        state.mode = supported.includes(mode) ? mode : supported[0] || "offline";
        if (app) app.dataset.mode = state.mode;
        dom.modeButtons.forEach((button) => {
            const supportedMode = supported.includes(button.dataset.mode);
            const active = button.dataset.mode === state.mode;
            button.disabled = !supportedMode;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        const answerSheetLink = getById("answerSheetLink");
        if (answerSheetLink) answerSheetLink.required = false;
    }

    function bindSubmitForm() {
        const form = getById("rankSubmitForm");
        if (!form) return;
        ["totalAttempted", "rightAnswers", "wrongAnswers"].forEach((id) => {
            const field = getById(id);
            if (!field) return;
            field.addEventListener("input", handleTotalMarksInput);
            field.addEventListener("blur", handleMarksBlur);
        });
        const subjectGrid = getById("subjectEntryGrid");
        subjectGrid?.addEventListener("input", handleSubjectMarksInput);
        subjectGrid?.addEventListener("focusin", handleSubjectMarksFocus);
        subjectGrid?.addEventListener("blur", handleMarksBlur, true);
        subjectGrid?.addEventListener("focusout", handleMarksBlur);
        ["mobileNumber", "checkMobileNumber"].forEach((id) => {
            getById(id)?.addEventListener("input", sanitizeMobileInput);
        });
        form.addEventListener("input", (event) => {
            clearFieldError(event);
            updateStepIndicators(getActiveStepTarget());
        });
        form.addEventListener("submit", handleSubmit);
        getById("resetPredictorBtn")?.addEventListener("click", () => {
            form.reset();
            applyExamDefaults();
            hydrateCandidateSession();
            clearErrors(form);
            showMessage("submitMessage", "");
            renderPendingResult();
        });
    }

    function bindCheckForm() {
        const form = getById("rankCheckForm");
        if (!form) return;
        form.addEventListener("input", clearFieldError);
        form.addEventListener("submit", handleCheckRank);
    }

    function bindFormAccordions() {
        dom.formAccordions.forEach((section) => {
            if (isStaticAccordion(section)) {
                bindStaticAccordion(section);
                return;
            }
            section.addEventListener("toggle", () => {
                if (section.dataset.applyingDefault === "true") return;
                section.dataset.userToggled = "true";
                if (section.open) {
                    if (isMobileLayout()) {
                        dom.formAccordions.forEach((otherSection) => {
                            if (otherSection !== section && !isStaticAccordion(otherSection)) otherSection.open = false;
                        });
                    }
                    updateStepIndicators(section.id);
                }
            });
        });
    }

    function bindStaticAccordion(section) {
        setDetailsOpenSilently(section, true);
        const summary = section.querySelector("summary");
        if (summary) {
            summary.setAttribute("aria-disabled", "true");
            summary.tabIndex = -1;
            summary.addEventListener("click", preventStaticDetailsToggle);
            summary.addEventListener("keydown", preventStaticDetailsToggle);
        }
        section.addEventListener("toggle", () => {
            if (section.dataset.applyingDefault === "true") return;
            if (!section.hidden && !section.open) setDetailsOpenSilently(section, true);
        });
    }

    function preventStaticDetailsToggle(event) {
        if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
    }

    function isStaticAccordion(section) {
        return Boolean(section?.hasAttribute?.("data-static-section"));
    }

    function bindStepperNavigation() {
        document.querySelectorAll(".form-stepper [data-step-for]").forEach((item) => {
            item.setAttribute("role", "button");
            item.setAttribute("tabindex", "0");
            item.setAttribute("aria-label", `${item.textContent.trim()} step`);
            item.addEventListener("click", () => goToStep(item.getAttribute("data-step-for")));
            item.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                goToStep(item.getAttribute("data-step-for"));
            });
        });
    }

    function goToStep(stepFor) {
        const target = normalizeStepTarget(stepFor);
        if (target === "dataConsent") {
            if (isMobileLayout()) {
                dom.formAccordions.forEach((section) => {
                    if (!isStaticAccordion(section)) setDetailsOpenSilently(section, false);
                });
            }
            updateStepIndicators(target);
            focusField(getById("dataConsent"));
            return;
        }

        const section = getById(target);
        if (!section || section.tagName !== "DETAILS") return;
        if (isMobileLayout()) {
            dom.formAccordions.forEach((otherSection) => {
                if (otherSection !== section && !isStaticAccordion(otherSection)) setDetailsOpenSilently(otherSection, false);
            });
        }
        setDetailsOpenSilently(section, true);
        updateStepIndicators(target);
        window.setTimeout(() => scrollToSectionTop(section), 40);
    }

    function setDetailsOpenSilently(section, open) {
        if (!section || section.tagName !== "DETAILS") return;
        section.dataset.applyingDefault = "true";
        section.open = Boolean(open);
        window.setTimeout(() => {
            delete section.dataset.applyingDefault;
        }, 0);
    }

    function getHeaderOffset() {
        const header = document.querySelector("header");
        const height = header ? Math.ceil(header.getBoundingClientRect().height) : 72;
        return Math.max(height + 14, 86);
    }

    function scrollToSectionTop(section) {
        if (!section || !document.documentElement.contains(section)) return;
        window.requestAnimationFrame(() => {
            const targetTop = Math.max(0, window.scrollY + section.getBoundingClientRect().top - getHeaderOffset());
            window.scrollTo({ top: targetTop, behavior: "smooth" });
        });
    }

    function bindShareCard() {
        const button = getById("shareResultBtn");
        if (!button) return;
        button.addEventListener("click", async () => {
            const text = getById("shareResultText")?.textContent || "My GovJobUpdates rank prediction is ready.";
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: "GovJobUpdates Rank Prediction",
                        text,
                        url: window.location.href
                    });
                    return;
                }
                await navigator.clipboard?.writeText(`${text} ${window.location.href}`.trim());
                button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copied';
                window.setTimeout(() => {
                    button.innerHTML = SHARE_BUTTON_IDLE_HTML;
                }, 1400);
            } catch {
                button.innerHTML = SHARE_BUTTON_IDLE_HTML;
            }
        });
    }

    function updateStepIndicators(activeTarget) {
        const target = normalizeStepTarget(activeTarget || "candidateDetailsSection");
        document.querySelectorAll(".form-stepper [data-step-for]").forEach((item) => {
            const stepFor = normalizeStepTarget(item.getAttribute("data-step-for"));
            item.classList.toggle("is-active", stepFor === target);
            item.classList.toggle("is-complete", isStepComplete(stepFor));
            if (stepFor === target) {
                item.setAttribute("aria-current", "step");
            } else {
                item.removeAttribute("aria-current");
            }
        });
    }

    function normalizeStepTarget(stepFor) {
        return stepFor || "candidateDetailsSection";
    }

    function getActiveStepTarget() {
        const focusedSection = document.activeElement?.closest?.(".form-accordion");
        if (focusedSection) return focusedSection.id;
        if (document.activeElement?.closest?.(".consent-section")) return "dataConsent";
        const openSection = dom.formAccordions.find((section) => section.open);
        if (openSection) return openSection.id;
        return "candidateDetailsSection";
    }

    function isStepComplete(stepFor) {
        if (stepFor === "candidateDetailsSection") {
            return ["candidateName", "rollNumber", "mobileNumber", "dob", "gender", "category", "state"].every((id) => String(getById(id)?.value || "").trim());
        }
        if (stepFor === "examDetailsSection") {
            return ["submitExamName", "examDate"].every((id) => String(getById(id)?.value || "").trim());
        }
        if (stepFor === "attemptDetailsSection" || stepFor === "subjectScorecardDetails") {
            return readNumber("totalAttempted") > 0 || readNumber("rightAnswers") > 0 || readNumber("wrongAnswers") > 0;
        }
        if (stepFor === "dataConsent") return Boolean(getById("dataConsent")?.checked);
        return false;
    }

    function applyAccordionDefaults() {
        const mobile = isMobileLayout();
        dom.formAccordions.forEach((section) => {
            if (section.hidden) {
                setDetailsOpenSilently(section, false);
                return;
            }
            if (isStaticAccordion(section)) {
                setDetailsOpenSilently(section, true);
                return;
            }
            if (mobile && section.dataset.userToggled === "true") return;
            section.dataset.applyingDefault = "true";
            section.open = !mobile || section.id === "candidateDetailsSection";
            window.setTimeout(() => {
                delete section.dataset.applyingDefault;
            }, 0);
        });

        dom.subjectControls.forEach(({ card }) => {
            if (!card || card.dataset.userToggled === "true") return;
            if (isStaticSubjectCard(card)) {
                setDetailsOpenSilently(card, true);
                return;
            }
            card.dataset.applyingDefault = "true";
            card.open = !mobile;
            window.setTimeout(() => {
                delete card.dataset.applyingDefault;
            }, 0);
        });
        updateStepIndicators("candidateDetailsSection");
    }

    function bindKeyboardFocusHandling(app) {
        const focusableSelector = "input, select, textarea";
        app.addEventListener("focusin", (event) => {
            const field = event.target?.closest?.(focusableSelector);
            if (!field || !app.contains(field)) return;
            openContainingDetails(field);
            if (field.id === "dataConsent" || field.closest(".consent-section")) updateStepIndicators("dataConsent");
            window.setTimeout(() => scrollFieldIntoView(field), 80);
            window.setTimeout(() => scrollFieldIntoView(field), 280);
        });

        const updateViewport = () => {
            updateKeyboardOffset(app);
            const active = document.activeElement;
            if (active?.matches?.(focusableSelector) && app.contains(active)) {
                window.setTimeout(() => scrollFieldIntoView(active), 80);
            }
        };

        updateViewport();
        window.addEventListener("resize", updateViewport, { passive: true });
        window.visualViewport?.addEventListener("resize", updateViewport, { passive: true });
        window.visualViewport?.addEventListener("scroll", updateViewport, { passive: true });
    }

    function updateKeyboardOffset(app) {
        const viewport = window.visualViewport;
        const keyboardOffset = viewport ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0;
        const roundedOffset = Math.round(keyboardOffset);
        document.documentElement.style.setProperty("--rp-keyboard-offset", `${roundedOffset}px`);
        app.classList.toggle("is-keyboard-open", roundedOffset > 120);
    }

    function scrollFieldIntoView(field) {
        if (!field || !document.documentElement.contains(field)) return;
        const rect = field.getBoundingClientRect();
        const viewport = window.visualViewport;
        const visibleTop = viewport ? viewport.offsetTop : 0;
        const visibleBottom = visibleTop + (viewport ? viewport.height : window.innerHeight);
        const topPadding = 96;
        const bottomPadding = 132;
        let delta = 0;

        if (rect.bottom > visibleBottom - bottomPadding) {
            delta = rect.bottom - (visibleBottom - bottomPadding);
        } else if (rect.top < visibleTop + topPadding) {
            delta = rect.top - (visibleTop + topPadding);
        }

        if (Math.abs(delta) > 2) {
            window.scrollBy({ top: delta, behavior: "smooth" });
        }
    }

    function openContainingDetails(field) {
        let node = field?.parentElement || null;
        while (node && node !== document.documentElement) {
            if (node.tagName === "DETAILS") {
                node.open = true;
                if (node.classList.contains("form-accordion")) updateStepIndicators(node.id);
            }
            node = node.parentElement;
        }
    }

    function focusField(field) {
        if (!field) return;
        openContainingDetails(field);
        const focusTarget = getVisibleFocusTarget(field);
        window.setTimeout(() => {
            focusTarget?.focus?.({ preventScroll: true });
            scrollFieldIntoView(focusTarget || field);
        }, 0);
    }

    function getVisibleFocusTarget(field) {
        if (field?.id === "category" && field.type === "hidden") {
            return getCategoryButton(field.value) || getById("categoryOptions")?.querySelector("[data-category-value]") || field.closest(".category-field");
        }
        if (field?.id === "horizontalCategory" && field.type === "hidden") {
            return getHorizontalCategoryButton(field.value) || getById("horizontalCategoryOptions")?.querySelector("[data-horizontal-category-value]") || field.closest(".category-field");
        }
        return field;
    }

    function handleTotalMarksInput() {
        state.marksDirty = true;
        if (state.mobileMarksMode) {
            debouncedMobileCalculation();
            return;
        }
        debouncedTotalCalculation();
    }

    function handleSubjectMarksInput(event) {
        if (!isSubjectInput(event.target)) return;
        sanitizeWholeNumberInput(event.target);
        state.marksDirty = true;
        if (state.mobileMarksMode) {
            debouncedMobileCalculation();
            return;
        }
        debouncedSubjectCalculation();
    }

    function handleSubjectMarksFocus(event) {
        if (!isSubjectInput(event.target) || event.target.value !== "0") return;
        event.target.value = "";
    }

    function handleMarksBlur(event) {
        if (!isMarksInput(event.target)) return;
        if (isSubjectInput(event.target) && event.target.value.trim() === "") {
            event.target.value = "0";
        }
        runMarksCalculation();
    }

    function sanitizeMobileInput(event) {
        const nextValue = normalizeMobile(event.target.value).slice(0, 10);
        if (event.target.value !== nextValue) event.target.value = nextValue;
    }

    function sanitizeWholeNumberInput(field) {
        const nextValue = String(field.value || "").replace(/\D/g, "");
        if (field.value !== nextValue) field.value = nextValue;
    }

    function runMarksCalculation() {
        state.marksDirty = false;
        calculateMarks();
    }

    function runMobileMarksCalculation() {
        if (!state.marksDirty) return;
        runMarksCalculation();
    }

    function calculateMarks() {
        state.marksFrame = 0;
        const selectedExam = getSelectedExam();
        const subjectData = collectSubjectData(selectedExam);
        if (subjectData.length) {
            syncSubjectTotals(subjectData);
            syncSubjectDerivedOutputs(subjectData);
        }
        const total = getExamNumber(selectedExam, "totalQuestions");
        const perCorrect = getExamNumber(selectedExam, "marksPerCorrect");
        const negative = getExamNumber(selectedExam, "negativeMarking");
        const attempted = subjectData.length ? sumBy(subjectData, "attempted") : readNumber("totalAttempted");
        const right = subjectData.length ? sumBy(subjectData, "correct") : readNumber("rightAnswers");
        const wrong = subjectData.length ? sumBy(subjectData, "wrong") : readNumber("wrongAnswers");
        const unattempted = Math.max(total - attempted, 0);
        const expected = (right * perCorrect) - (wrong * negative);

        state.expectedMarks = round2(expected);
        setValue("unattempted", unattempted);
        setValue("expectedMarks", formatMarks(state.expectedMarks));
        syncLiveSummary(attempted, right, wrong, state.expectedMarks);
        syncAttemptRuleState(selectedExam, subjectData, attempted, right, wrong, total);
        return state.expectedMarks;
    }

    function syncLiveSummary(attempted, right, wrong, expectedMarks) {
        setText("summaryAttempted", String(attempted));
        setText("summaryCorrect", String(right));
        setText("summaryWrong", String(wrong));
        setText("summaryExpectedMarks", formatMarks(expectedMarks));
        setText("reviewAttempted", String(attempted));
        setText("reviewCorrect", String(right));
        setText("reviewWrong", String(wrong));
        setText("reviewExpectedMarks", formatMarks(expectedMarks));
    }

    function syncAttemptRuleState(exam, subjectData, attempted, right, wrong, total) {
        const box = getById("attemptRuleMessage");
        const liveSummary = document.querySelector(".live-summary-card");
        if (!box) return;

        dom.subjectControls.forEach(({ card }, index) => {
            const subject = subjectData[index];
            card?.classList.toggle("has-rule-warning", Boolean(subject && subject.attempted > subject.questions));
        });

        const subjectOverflow = subjectData.find((subject) => subject.attempted > subject.questions);
        let message = "";
        let warning = false;

        if (!exam) {
            message = "Select an exam to load attempt rules.";
        } else if (total <= 0) {
            message = "Total questions are not configured for this exam.";
            warning = true;
        } else if (subjectOverflow) {
            message = `${subjectOverflow.name} exceeds ${subjectOverflow.questions} questions. Reduce correct or wrong answers.`;
            warning = true;
        } else if (attempted > total) {
            message = `Attempted answers cannot be greater than ${total} total questions.`;
            warning = true;
        } else if (right + wrong > attempted) {
            message = "Right and wrong answers cannot exceed total attempted.";
            warning = true;
        } else if (!subjectData.length && right + wrong < attempted) {
            message = "Right + wrong is lower than attempted. Check totals before submitting.";
            warning = true;
        } else if (attempted === 0) {
            message = subjectData.length
                ? "Enter subject correct and wrong answers to see expected marks."
                : "Enter attempt totals to see expected marks.";
        } else {
            message = subjectData.length
                ? `Subject totals are within ${total}-question exam rules.`
                : `Manual totals are within ${total}-question exam rules.`;
        }

        setNodeText(box, message);
        box.classList.toggle("is-warning", warning);
        box.classList.toggle("is-ok", !warning);
        liveSummary?.classList.toggle("is-warning", warning);
    }

    function scheduleMarksCalculation() {
        if (state.marksFrame && window.cancelAnimationFrame) window.cancelAnimationFrame(state.marksFrame);
        if (!window.requestAnimationFrame) {
            calculateMarks();
            return;
        }
        state.marksFrame = window.requestAnimationFrame(calculateMarks);
    }

    function handleSubmit(event) {
        event.preventDefault();
        calculateMarks();
        const form = event.currentTarget;
        if (form.dataset.busy === "true") return;
        const validation = validateSubmitForm(form);
        if (!validation.ok) {
            showMessage("submitMessage", validation.message, "error");
            focusField(validation.field);
            return;
        }

        const payload = collectSubmitPayload();
        const payloadValidation = validateBackendPayload(payload);
        if (!payloadValidation.ok) {
            clearResultCard();
            showMessage("submitMessage", payloadValidation.message, "error");
            return;
        }

        requestBackend(payload, "submitDataBtn")
            .then((data) => {
                if (data.duplicate) {
                    clearResultCard();
                    showMessage("submitMessage", data.message || "Data already exists for this exam. Please use Check My Rank.", "warning");
                    return;
                }
                if (!data.success) {
                    clearResultCard();
                    showMessage("submitMessage", API_NETWORK_ERROR_MESSAGE, "error");
                    return;
                }
                const resultData = getResponseData(data);
                showMessage("submitMessage", data.message || "Data submitted successfully.", "success");
                openRankResultPage(resultData, payload);
            })
            .catch(() => {
                clearResultCard();
                showMessage("submitMessage", getBackendErrorMessage(), "error");
            });
    }

    function handleCheckRank(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.dataset.busy === "true") return;
        const validation = validateCheckForm(form);
        if (!validation.ok) {
            clearResultCard();
            showMessage("checkMessage", validation.message, "error");
            focusField(validation.field);
            return;
        }

        const payload = collectCheckPayload();
        const payloadValidation = validateBackendPayload(payload);
        if (!payloadValidation.ok) {
            clearResultCard();
            showMessage("checkMessage", payloadValidation.message, "error");
            return;
        }

        requestBackend(payload, "checkRankBtn")
            .then((data) => {
                if (data.found === false || /no data found/i.test(String(data.message || ""))) {
                    clearResultCard();
                    showMessage("checkMessage", "No data found for this mobile number, roll number, and DOB.", "warning");
                    return;
                }
                if (!data.success) {
                    clearResultCard();
                    showMessage("checkMessage", API_NETWORK_ERROR_MESSAGE, "error");
                    return;
                }
                const resultData = getResponseData(data);
                showMessage("checkMessage", data.message || "Rank found successfully.", "success");
                openRankResultPage(resultData, payload);
            })
            .catch(() => {
                clearResultCard();
                showMessage("checkMessage", getBackendErrorMessage(), "error");
            });
    }

    function openRankResultPage(resultData, payload) {
        const stored = storeLatestRankResult(resultData, payload);
        if (!stored) {
            const messageId = payload?.action === "checkRank" ? "checkMessage" : "submitMessage";
            showMessage(messageId, "Result is ready, but your browser blocked local result storage. Please try again.", "error");
            return;
        }
        window.location.href = RESULT_PAGE_URL;
    }

    function storeLatestRankResult(resultData, payload) {
        try {
            const safeResultData = sanitizeForResultStorage(resultData || {});
            const safePayload = buildSafePayloadContext(payload || {});
            const marks = safeResultData.rawMarks ?? safeResultData.marks ?? safePayload.rawMarks;
            const normalizedMarks = calculateNormalizedMarks(safeResultData, safePayload, marks);
            const snapshot = {
                resultData: safeResultData,
                payload: safePayload,
                examName: safePayload.examName || getSelectedExam()?.examName || "",
                exam: buildSafeExamContext(getSelectedExam()),
                derived: {
                    normalizedMarks
                },
                savedAt: new Date().toISOString()
            };
            sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(snapshot));
            return true;
        } catch {
            return false;
        }
    }

    function buildSafePayloadContext(payload) {
        return {
            action: payload.action || "",
            examId: payload.examId || "",
            examName: payload.examName || "",
            sheetName: payload.sheetName || "",
            mode: payload.mode || "",
            rollNumber: payload.rollNumber || "",
            gender: payload.gender || "",
            category: payload.category || "",
            horizontalCategory: payload.horizontalCategory || "",
            state: payload.state || "",
            examDate: payload.examDate || "",
            shift: payload.shift || "",
            totalQuestions: payload.totalQuestions,
            totalAttempted: payload.totalAttempted,
            rightAnswers: payload.rightAnswers,
            wrongAnswers: payload.wrongAnswers,
            unattempted: payload.unattempted,
            marksPerCorrect: payload.marksPerCorrect,
            negativeMarking: payload.negativeMarking,
            rawMarks: payload.rawMarks,
            subjectData: sanitizeForResultStorage(payload.subjectData || [])
        };
    }

    function buildSafeExamContext(exam) {
        if (!exam) return null;
        return {
            examId: exam.examId || "",
            examName: exam.examName || "",
            totalQuestions: exam.totalQuestions,
            marksPerCorrect: exam.marksPerCorrect,
            negativeMarking: exam.negativeMarking,
            normalization: Boolean(exam.normalization),
            hasShifts: Boolean(exam.hasShifts),
            subjects: sanitizeForResultStorage(exam.subjects || [])
        };
    }

    function sanitizeForResultStorage(value) {
        const sensitiveKeys = new Set([
            "candidatename",
            "mobile",
            "mobilenumber",
            "phone",
            "phonenumber",
            "contactnumber",
            "dob",
            "dateofbirth",
            "birthdate",
            "useragent",
            "userid",
            "email"
        ]);
        if (Array.isArray(value)) return value.map(sanitizeForResultStorage);
        if (!value || typeof value !== "object") return value;
        return Object.entries(value).reduce((safe, [key, entryValue]) => {
            if (sensitiveKeys.has(String(key).toLowerCase())) return safe;
            safe[key] = sanitizeForResultStorage(entryValue);
            return safe;
        }, {});
    }

    function requestBackend(payload, buttonId) {
        const button = getById(buttonId);
        const form = button?.closest("form") || null;
        const original = button?.innerHTML || "";
        if (button) {
            button.disabled = true;
            button.setAttribute("aria-busy", "true");
            button.innerHTML = `<span class="loading-spinner" aria-hidden="true"></span><span>${PROCESSING_TEXT}</span>`;
        }
        if (form) {
            form.dataset.busy = "true";
            form.setAttribute("aria-busy", "true");
        }

        return callRankApi(payload)
            .finally(() => {
                if (button) {
                    button.disabled = false;
                    button.removeAttribute("aria-busy");
                    button.innerHTML = original;
                }
                if (form) {
                    form.dataset.busy = "false";
                    form.setAttribute("aria-busy", "false");
                }
            });
    }

    async function callRankApi(payload) {
        const apiUrl = RANK_PREDICTOR_CONFIG.apiUrl;

        if (!apiUrl || !apiUrl.startsWith("https://") || !apiUrl.endsWith("/exec") || apiUrl.includes("/dev")) {
            throw new Error(API_INVALID_URL_MESSAGE);
        }

        const res = await fetch(apiUrl, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });

        const text = await res.text();

        try {
            return JSON.parse(text);
        } catch {
            throw new Error(API_INVALID_RESPONSE_MESSAGE);
        }
    }

    function validateSubmitForm(form) {
        clearErrors(form);
        const selectedExam = getSelectedExam();
        if (!selectedExam || selectedExam.disabled || !String(selectedExam.sheetName || "").trim()) {
            const field = getById("globalExamSelect");
            markInvalid(field, "Please select a valid exam.");
            return { ok: false, field, message: "Please select a valid exam." };
        }
        const required = ["candidateName", "rollNumber", "mobileNumber", "dob", "examDate", "gender", "category", "horizontalCategory", "state", "totalAttempted", "rightAnswers", "wrongAnswers"];
        if (selectedExam.hasShifts) required.push("shift");

        for (const id of required) {
            const field = getById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field, "This field is required.");
            return { ok: false, field, message: "Please fill all required fields." };
        }

        const total = getExamNumber(selectedExam, "totalQuestions");
        const attempted = readNumber("totalAttempted");
        const right = readNumber("rightAnswers");
        const wrong = readNumber("wrongAnswers");
        const subjectValidation = validateSubjectInputs(selectedExam, attempted, right, wrong);
        if (!subjectValidation.ok) return subjectValidation;
        if (total <= 0) return invalidNumber("globalExamSelect", "Total questions must be configured for this exam.");
        if (attempted <= 0) return invalidNumber("totalAttempted", "Total attempted must be greater than 0.");
        if (attempted > total) return invalidNumber("totalAttempted", "Total attempted cannot be greater than total questions.");
        if (right + wrong > attempted) return invalidNumber("rightAnswers", "Right and wrong answers cannot exceed total attempted.");
        if (right + wrong !== attempted) return invalidNumber("rightAnswers", "Right and wrong answers must equal total attempted.");
        if (total - attempted < 0) return invalidNumber("totalAttempted", "Unattempted cannot be negative.");
        if (!isValidMobileInput("mobileNumber")) return invalidNumber("mobileNumber", "Please enter a valid 10-digit mobile number.");
        if (!isValidDateInput("dob")) return invalidNumber("dob", "Please enter a valid Date of Birth.");
        if (!isValidDateInput("examDate")) return invalidNumber("examDate", "Please enter a valid Exam Date.");
        if (selectedExam.hasShifts && !isPositiveIntegerInput("shift")) return invalidNumber("shift", "Shift Number must be a positive number.");
        if (!Number.isFinite(state.expectedMarks)) return invalidNumber("expectedMarks", "Marks could not be calculated. Please check your answers.");
        if (!getById("dataConsent")?.checked) {
            const field = getById("dataConsent");
            markInvalid(field, "Please confirm consent before submitting.");
            return { ok: false, field, message: "Please confirm consent before submitting." };
        }
        return { ok: true };
    }

    function validateCheckForm(form) {
        clearErrors(form);
        const selectedExam = getSelectedExam();
        if (!selectedExam || selectedExam.disabled || !String(selectedExam.sheetName || "").trim()) {
            const field = getById("globalExamSelect");
            markInvalid(field, "Please select a valid exam.");
            return { ok: false, field, message: "Please select a valid exam." };
        }
        for (const id of ["checkRollNumber", "checkMobileNumber", "checkDob"]) {
            const field = getById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field, "This field is required.");
            return { ok: false, field, message: "Please fill all required fields." };
        }
        if (!isValidMobileInput("checkMobileNumber")) return invalidNumber("checkMobileNumber", "Please enter a valid 10-digit mobile number.");
        if (!isValidDateInput("checkDob")) return invalidNumber("checkDob", "Please enter a valid Date of Birth.");
        const checkExamDate = getById("checkExamDate");
        if (checkExamDate?.value && !isValidDateInput("checkExamDate")) return invalidNumber("checkExamDate", "Please enter a valid Exam Date.");
        const checkShift = getById("checkShift");
        if (checkShift?.value && !isPositiveIntegerInput("checkShift")) return invalidNumber("checkShift", "Shift Number must be a positive number.");
        return { ok: true };
    }

    function collectSubmitPayload() {
        const selectedExam = getSelectedExam();
        const candidateSession = getCandidateSession();
        const rollNumberInput = getById("rollNumber");
        const mobileInput = getById("mobileNumber");
        const dobInput = getById("dob");
        const examDateInput = getById("examDate");
        const rollNumber = normalizeRoll(rollNumberInput?.value);
        const mobileNumber = normalizeMobile(mobileInput?.value);
        const dob = dobInput?.value || "";
        const totalQuestions = getExamNumber(selectedExam, "totalQuestions");
        const marksPerCorrect = getExamNumber(selectedExam, "marksPerCorrect");
        const negativeMarking = getExamNumber(selectedExam, "negativeMarking");
        const subjectData = collectSubjectData(selectedExam);
        const totalAttempted = subjectData.length ? sumBy(subjectData, "attempted") : readNumber("totalAttempted");
        const rightAnswers = subjectData.length ? sumBy(subjectData, "correct") : readNumber("rightAnswers");
        const wrongAnswers = subjectData.length ? sumBy(subjectData, "wrong") : readNumber("wrongAnswers");
        const unattempted = Math.max(totalQuestions - totalAttempted, 0);
        const rawMarks = round2((rightAnswers * marksPerCorrect) - (wrongAnswers * negativeMarking));
        return {
            action: "submitData",
            userId: candidateSession?.userId || "",
            examId: selectedExam.examId,
            examName: selectedExam.examName,
            sheetName: selectedExam.sheetName,
            mode: state.mode,
            candidateName: readValue("candidateName"),
            rollNumber,
            mobileNumber,
            dob,
            gender: readValue("gender"),
            category: readValue("category"),
            horizontalCategory: readValue("horizontalCategory"),
            state: readValue("state"),
            examDate: examDateInput?.value || "",
            shift: readValue("shift"),
            totalQuestions,
            totalAttempted,
            rightAnswers,
            wrongAnswers,
            unattempted,
            marksPerCorrect,
            negativeMarking,
            rawMarks,
            subjectData,
            answerKeyLink: state.mode === "online" ? readValue("answerSheetLink") : "",
            userAgent: navigator.userAgent
        };
    }

    function collectCheckPayload() {
        const selectedExam = getSelectedExam();
        const candidateSession = getCandidateSession();
        const rollNumberInput = getById("checkRollNumber");
        const mobileInput = getById("checkMobileNumber");
        const dobInput = getById("checkDob");
        const examDateInput = getById("checkExamDate");
        const rollNumber = normalizeRoll(rollNumberInput?.value);
        const mobileNumber = normalizeMobile(mobileInput?.value);
        const dob = dobInput?.value || "";
        return {
            action: "checkRank",
            userId: candidateSession?.userId || "",
            examId: selectedExam.examId,
            examName: selectedExam.examName,
            sheetName: selectedExam.sheetName,
            rollNumber,
            mobileNumber,
            dob,
            examDate: examDateInput?.value || "",
            shift: readValue("checkShift")
        };
    }

    function renderSubjectInputs(exam) {
        const grid = getById("subjectEntryGrid");
        if (!grid) return;

        const subjects = Array.isArray(exam?.subjects) ? exam.subjects : [];
        if (!subjects.length) {
            grid.innerHTML = "";
            dom.subjectControls = [];
            return;
        }

        grid.innerHTML = subjects.map((subject, index) => {
            const name = String(subject.name || `Subject ${index + 1}`);
            const questions = Number(subject.questions) || 0;
            const criteriaText = formatPassingCriteria(subject.passingCriteria);
            const maxLength = Math.max(String(questions).length, 1);
            const correctId = `subject-${index}-correct`;
            const wrongId = `subject-${index}-wrong`;
            const openAttr = " open";
            return `
                <details class="subject-card" data-subject-index="${index}" data-static-subject${openAttr}>
                    <summary class="subject-card-heading">
                        <span class="subject-title">
                            <strong>${escapeHtml(name)}</strong>
                            <small>${escapeHtml([`${questions} questions`, criteriaText].filter(Boolean).join(" | "))}</small>
                        </span>
                        <span class="subject-card-total"><small>Attempted</small><strong data-subject-summary="attempted">0/${questions}</strong></span>
                        <i class="fas fa-chevron-down" aria-hidden="true"></i>
                    </summary>
                    <div class="subject-card-body">
                        <div class="subject-input-grid">
                            <label for="${correctId}">Correct
                                <input id="${correctId}" class="subject-input" data-subject-field="correct" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="${maxLength}" autocomplete="off" enterkeyhint="next" value="0">
                            </label>
                            <label for="${wrongId}">Wrong
                                <input id="${wrongId}" class="subject-input" data-subject-field="wrong" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="${maxLength}" autocomplete="off" enterkeyhint="next" value="0">
                            </label>
                        </div>
                        <div class="subject-derived-row" aria-label="${escapeAttr(name)} calculated totals">
                            <span><small>Attempted</small><strong data-subject-derived="attempted">0</strong></span>
                            <span><small>Unattempted</small><strong data-subject-derived="unattempted">${questions}</strong></span>
                        </div>
                    </div>
                </details>`;
        }).join("");
        cacheSubjectControls(grid);
        dom.subjectControls.forEach(({ card }) => {
            if (isStaticSubjectCard(card)) {
                bindStaticSubjectCard(card);
                return;
            }
            card.addEventListener("toggle", () => {
                if (card.dataset.applyingDefault === "true") return;
                card.dataset.userToggled = "true";
                if (card.open && isMobileLayout()) {
                    dom.subjectControls.forEach(({ card: otherCard }) => {
                        if (otherCard && otherCard !== card) otherCard.open = false;
                    });
                }
            });
        });
    }

    function bindStaticSubjectCard(card) {
        setDetailsOpenSilently(card, true);
        const summary = card.querySelector("summary");
        if (summary) {
            summary.setAttribute("aria-disabled", "true");
            summary.tabIndex = -1;
            summary.addEventListener("click", preventStaticDetailsToggle);
            summary.addEventListener("keydown", preventStaticDetailsToggle);
        }
        card.addEventListener("toggle", () => {
            if (card.dataset.applyingDefault === "true") return;
            if (!card.open) setDetailsOpenSilently(card, true);
        });
    }

    function isStaticSubjectCard(card) {
        return Boolean(card?.hasAttribute?.("data-static-subject"));
    }

    function syncAttemptEntrySections(exam) {
        const hasSubjects = Array.isArray(exam?.subjects) && exam.subjects.length > 0;
        const manualSection = getById("attemptDetailsSection");
        const subjectSection = getById("subjectScorecardDetails");
        const step = document.querySelector("[data-attempt-step]");

        manualSection?.toggleAttribute("hidden", hasSubjects);
        subjectSection?.toggleAttribute("hidden", !hasSubjects);
        if (manualSection?.hidden) setDetailsOpenSilently(manualSection, false);
        if (subjectSection?.hidden) setDetailsOpenSilently(subjectSection, false);

        if (step) {
            step.setAttribute("data-step-for", hasSubjects ? "subjectScorecardDetails" : "attemptDetailsSection");
            const label = step.querySelector("strong");
            if (label) label.textContent = hasSubjects ? "Subjects" : "Attempts";
        }
    }

    function collectSubjectData(exam) {
        const subjects = Array.isArray(exam?.subjects) ? exam.subjects : [];
        if (!subjects.length) return [];

        const marksPerCorrect = getExamNumber(exam, "marksPerCorrect");
        const negativeMarking = getExamNumber(exam, "negativeMarking");

        return subjects.map((subject, index) => {
            const control = dom.subjectControls[index];
            const correct = readSubjectNumber(control, "correct");
            const wrong = readSubjectNumber(control, "wrong");
            const attempted = correct + wrong;
            const maxMarks = round2((Number(subject.questions) || 0) * marksPerCorrect);
            return {
                name: String(subject.name || `Subject ${index + 1}`),
                questions: Number(subject.questions) || 0,
                attempted,
                correct,
                wrong,
                marks: round2((correct * marksPerCorrect) - (wrong * negativeMarking)),
                maxMarks,
                passingCriteria: subject.passingCriteria || null
            };
        });
    }

    function formatPassingCriteria(criteria) {
        if (!criteria) return "";
        const parts = [];
        if (criteria.minMarks !== null && criteria.minMarks !== undefined && criteria.minMarks !== "") parts.push(`Min ${criteria.minMarks} marks`);
        if (criteria.minPercentage !== null && criteria.minPercentage !== undefined && criteria.minPercentage !== "") parts.push(`Min ${criteria.minPercentage}%`);
        if (criteria.minCorrect !== null && criteria.minCorrect !== undefined && criteria.minCorrect !== "") parts.push(`Min ${criteria.minCorrect} correct`);
        if (!parts.length && hasPassingCriteriaRuleMap(criteria.categoryRules)) parts.push("Category-wise qualifying criteria");
        if (!parts.length && hasPassingCriteriaRuleMap(criteria.horizontalCategoryRules)) parts.push("Horizontal category qualifying criteria");
        return parts.join(", ");
    }

    function readSubjectNumber(control, field) {
        const value = parseWholeNumber(control?.[field]?.value);
        return Number.isFinite(value) ? value : 0;
    }

    function parseWholeNumber(value) {
        const digits = String(value ?? "").replace(/[^\d]/g, "");
        if (!digits) return 0;
        const number = Number(digits);
        return Number.isFinite(number) ? number : 0;
    }

    function syncSubjectTotals(subjectData = collectSubjectData(getSelectedExam())) {
        if (!subjectData.length) return;
        setValue("totalAttempted", sumBy(subjectData, "attempted"));
        setValue("rightAnswers", sumBy(subjectData, "correct"));
        setValue("wrongAnswers", sumBy(subjectData, "wrong"));
    }

    function syncSubjectDerivedOutputs(subjectData = collectSubjectData(getSelectedExam())) {
        subjectData.forEach((subject, index) => {
            const control = dom.subjectControls[index];
            const unattempted = Math.max((Number(subject.questions) || 0) - (Number(subject.attempted) || 0), 0);
            setNodeText(control?.attempted, String(subject.attempted));
            setNodeText(control?.unattempted, String(unattempted));
            setNodeText(control?.summaryAttempted, `${subject.attempted}/${subject.questions}`);
        });
    }

    function setAggregateAttemptFieldsReadonly(exam) {
        const hasSubjects = Array.isArray(exam?.subjects) && exam.subjects.length > 0;
        ["totalAttempted", "rightAnswers", "wrongAnswers"].forEach((id) => {
            const field = getById(id);
            if (!field) return;
            field.readOnly = hasSubjects;
            field.setAttribute("aria-readonly", String(hasSubjects));
        });
    }

    function validateSubjectInputs(exam, attempted, right, wrong) {
        const subjectData = collectSubjectData(exam);
        if (!subjectData.length) return { ok: true };

        for (let index = 0; index < subjectData.length; index += 1) {
            const subject = subjectData[index];
            if (subject.attempted > subject.questions) {
                return invalidSubject(index, "correct", `${subject.name} correct and wrong answers cannot exceed ${subject.questions}.`);
            }
        }

        if (sumBy(subjectData, "attempted") !== attempted) return invalidNumber("totalAttempted", "Sum of subject attempted must match Total Attempted.");
        if (sumBy(subjectData, "correct") !== right) return invalidNumber("rightAnswers", "Sum of subject correct answers must match Right Answers.");
        if (sumBy(subjectData, "wrong") !== wrong) return invalidNumber("wrongAnswers", "Sum of subject wrong answers must match Wrong Answers.");

        return { ok: true };
    }

    function invalidSubject(index, field, message) {
        const input = dom.subjectControls[index]?.[field];
        markInvalid(input, message);
        return { ok: false, field: input, message };
    }

    function renderPendingResult(payload = {}) {
        setText("resultExpectedMarks", "Pending");
        setText("resultNormalizedMarks", "Pending");
        setText("resultPercentile", "Pending");
        setText("overallRank", "Pending");
        setText("categoryRank", "Pending");
        setText("stateRank", "Pending");
        setText("shiftRank", "Pending");
        setText("genderRank", "Pending");
        setText("genderCategoryRank", "Pending");
        setText("genderStateRank", "Pending");
        setText("genderShiftRank", "Pending");
        setText("averageMarks", "Pending");
        setText("averageShiftMarks", "Pending");
        setText("categoryAverageMarks", "Pending");
        setText("totalSubmissions", "0");
        setText("accuracyIndicator", "Pending");
        setText("lastUpdated", "Pending");
        renderSubjectAnalysis([]);
        updateShareResult();
        setText("resultNote", "Rank prediction accuracy improves as more candidates submit data.");
    }

    function clearResultCard() {
        setText("resultExpectedMarks", "Pending");
        setText("resultNormalizedMarks", "Pending");
        setText("resultPercentile", "Pending");
        setText("overallRank", "Pending");
        setText("categoryRank", "Pending");
        setText("stateRank", "Pending");
        setText("shiftRank", "Pending");
        setText("genderRank", "Pending");
        setText("genderCategoryRank", "Pending");
        setText("genderStateRank", "Pending");
        setText("genderShiftRank", "Pending");
        setText("averageMarks", "Pending");
        setText("averageShiftMarks", "Pending");
        setText("categoryAverageMarks", "Pending");
        setText("totalSubmissions", "0");
        setText("accuracyIndicator", "Pending");
        setText("lastUpdated", "Pending");
        renderSubjectAnalysis([]);
        updateShareResult();
        setText("resultNote", "No matching record found for the selected exam, roll number, and DOB.");
    }

    function renderResult(data, payload) {
        const total = Number(data.totalSubmissions || data.total || 0);
        const marks = data.rawMarks ?? data.marks;
        const normalizedMarks = calculateNormalizedMarks(data, payload, marks);
        setText("resultExpectedMarks", marks !== undefined && marks !== null && marks !== "" ? formatMarks(marks) : "Pending");
        setText("resultNormalizedMarks", normalizedMarks !== null ? formatMarks(normalizedMarks) : "Pending");
        setText("resultPercentile", formatPercentile(data.percentile));
        setText("overallRank", formatRank(data.overallRank));
        setText("categoryRank", formatRank(data.categoryRank));
        setText("stateRank", formatRank(data.stateRank));
        setText("shiftRank", formatRank(data.shiftRank));
        setText("genderRank", formatRank(data.genderRank));
        setText("genderCategoryRank", formatRank(data.genderCategoryRank));
        setText("genderStateRank", formatRank(data.genderStateRank));
        setText("genderShiftRank", formatRank(data.genderShiftRank));
        setText("averageMarks", formatOptionalMarks(data.averageMarks));
        setText("averageShiftMarks", formatOptionalMarks(data.averageShiftMarks));
        setText("categoryAverageMarks", formatOptionalMarks(data.categoryAverageMarks));
        setText("totalSubmissions", total ? String(total) : "0");
        setText("accuracyIndicator", data.accuracyIndicator || getAccuracyIndicator(total));
        setText("lastUpdated", formatDateTime(data.lastUpdated));
        renderSubjectAnalysis(data.subjectAnalysis || []);
        updateShareResult(data, payload, normalizedMarks);
        setText("resultNote", data.rankBasis === "normalized"
            ? "Rank and percentile are based on normalised marks for the selected exam."
            : "Rank and percentile are based on submitted raw marks for the selected exam.");
    }

    function updateShareResult(data = null, payload = null, normalizedMarks = null) {
        const percentile = data ? formatPercentile(data.percentile) : "pending";
        const examName = payload?.examName || getSelectedExam()?.examName || "my exam";
        const rank = data?.overallRank ? ` | Rank #${data.overallRank}` : "";
        const marks = normalizedMarks !== null && normalizedMarks !== undefined ? ` | Marks ${formatMarks(normalizedMarks)}` : "";
        const text = data
            ? `My ${examName} percentile: ${percentile}${rank}${marks} on GovJobUpdates.`
            : "My GovJobUpdates percentile is pending.";
        setText("shareResultText", text);
    }

    function calculateNormalizedMarks(data, payload, rawMarksValue) {
        const backendValue = data.normalizedMarks ?? data.normalisedMarks ?? data.normalizedScore ?? data.normalisedScore;
        const backendNumber = Number(backendValue);
        if (Number.isFinite(backendNumber)) return backendNumber;

        const rawMarks = Number(rawMarksValue);
        if (!Number.isFinite(rawMarks)) return null;

        const exam = getSelectedExam();
        if (!exam?.normalization) return rawMarks;

        return calculatePlaceholderNormalizedMarks(exam, data, payload, rawMarks);
    }

    function calculatePlaceholderNormalizedMarks(exam, data, payload, rawMarks) {
        const allShiftAverage = Number(data.averageMarks);
        const candidateShiftAverage = Number(data.averageShiftMarks);
        const shiftAdjustment = Number.isFinite(allShiftAverage) && Number.isFinite(candidateShiftAverage)
            ? allShiftAverage - candidateShiftAverage
            : 0;
        const normalized = rawMarks + shiftAdjustment;
        const maxMarks = getExamNumber(exam, "totalQuestions") * getExamNumber(exam, "marksPerCorrect");
        if (maxMarks > 0) return round2(Math.min(Math.max(normalized, 0), maxMarks));
        return round2(Math.max(normalized, 0));
    }

    function getAccuracyIndicator(totalSubmissions) {
        if (totalSubmissions >= 1000) return "High";
        if (totalSubmissions >= 100) return "Medium";
        return "Low";
    }

    function formatRank(value) {
        return value ? `#${value}` : "Pending";
    }

    function formatPercentile(value) {
        if (value === undefined || value === null || value === "") return "Pending";
        const number = Number(value);
        return Number.isFinite(number) ? `${number.toFixed(2)}%` : "Pending";
    }

    function formatOptionalMarks(value) {
        if (value === undefined || value === null || value === "") return "Pending";
        const number = Number(value);
        return Number.isFinite(number) ? formatMarks(number) : "Pending";
    }

    function renderSubjectAnalysis(subjectAnalysis) {
        const body = getById("subjectAnalysisBody");
        if (!body) return;
        if (!Array.isArray(subjectAnalysis) || !subjectAnalysis.length) {
            body.innerHTML = `<tr class="subject-empty-row"><td colspan="4" data-label="Status">Pending</td></tr>`;
            return;
        }
        body.innerHTML = subjectAnalysis.map((subject) => `
            <tr>
                <td data-label="Subject">${escapeHtml(subject.name || "Subject")}</td>
                <td data-label="Your Score">${formatOptionalMarks(subject.score)}</td>
                <td data-label="Average Score">${formatOptionalMarks(subject.avgScore)}</td>
                <td data-label="Accuracy">${formatPercentile(subject.accuracy)}</td>
            </tr>
        `).join("");
    }

    function formatDateTime(value) {
        if (!value) return "Just now";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    }

    function setSelectedExam(exam, options = {}) {
        state.exam = exam;
        window.RANK_PREDICTOR_SELECTED_EXAM = exam;
        if (options.syncSearch && exam?.examName) setValue("examSearchInput", exam.examName);
    }

    function getCandidateSession() {
        return window.CandidateAuth?.getSession?.() || null;
    }

    function hydrateCandidateSession() {
        const session = getCandidateSession();
        if (!session) return;

        const candidateName = getById("candidateName");
        const mobileNumber = getById("mobileNumber");
        const checkMobileNumber = getById("checkMobileNumber");

        if (candidateName && !candidateName.value && session.name) candidateName.value = session.name;
        if (mobileNumber && !mobileNumber.value && session.mobile) mobileNumber.value = session.mobile;
        if (checkMobileNumber && !checkMobileNumber.value && session.mobile) checkMobileNumber.value = session.mobile;
    }

    function getSelectedExam() {
        return window.RANK_PREDICTOR_SELECTED_EXAM || state.exam;
    }

    function getResponseData(data) {
        if (data && typeof data.data === "object" && data.data !== null) {
            return Object.assign({}, data, data.data);
        }
        return data || {};
    }

    function getBackendErrorMessage(error) {
        if (error?.message === API_INVALID_URL_MESSAGE || error?.message === API_INVALID_RESPONSE_MESSAGE) {
            return API_NETWORK_ERROR_MESSAGE;
        }
        return API_NETWORK_ERROR_MESSAGE;
    }

    function validateBackendPayload(payload) {
        const required = payload.action === "submitData"
            ? ["action", "sheetName", "examId", "examName", "candidateName", "rollNumber", "mobileNumber", "dob", "examDate", "gender", "category", "horizontalCategory", "state", "totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "unattempted", "marksPerCorrect", "negativeMarking", "rawMarks"]
            : ["action", "sheetName", "examId", "examName", "rollNumber", "mobileNumber", "dob"];
        if (payload.action === "submitData" && getSelectedExam()?.hasShifts) required.push("shift");
        const missing = required.filter((key) => isBlank(payload[key]));
        if (missing.length) {
            return {
                ok: false,
                message: "Please fill all required fields.",
                debug: `Backend payload missing: ${missing.join(", ")}`
            };
        }
        if (!["submitData", "checkRank"].includes(payload.action)) {
            return {
                ok: false,
                message: API_NETWORK_ERROR_MESSAGE,
                debug: "Backend payload action is invalid."
            };
        }
        return { ok: true };
    }

    function isPositiveIntegerInput(id) {
        const value = getById(id)?.value;
        return /^[1-9]\d*$/.test(String(value || "").trim());
    }

    function isValidDateInput(id) {
        const field = getById(id);
        if (!field) return false;
        if (field.validity && !field.validity.valid) return false;
        return /^\d{4}-\d{2}-\d{2}$/.test(field.value);
    }

    function isValidMobileInput(id) {
        return /^\d{10}$/.test(normalizeMobile(getById(id)?.value));
    }

    function invalidNumber(id, message) {
        const field = getById(id);
        markInvalid(field, message);
        return { ok: false, field, message };
    }

    function markInvalid(field, message = "Please check this field.") {
        if (!field) return;
        openContainingDetails(field);
        field.setAttribute("aria-invalid", "true");
        dom.invalidFields.add(field);
        const container = field.closest(".rp-field, .consent-row, .subject-card");
        container?.classList.add("has-error");
        if (container) ensureInlineError(container, message);
        if (container) dom.errorContainers.add(container);
    }

    function ensureInlineError(container, message) {
        const target = getErrorMessageTarget(container);
        if (!target || !message) return;
        let error = target.querySelector(".field-error-message");
        if (!error) {
            error = document.createElement("div");
            error.className = "field-error-message";
            error.setAttribute("role", "alert");
            target.appendChild(error);
        }
        error.textContent = message;
    }

    function removeInlineError(container) {
        const target = getErrorMessageTarget(container);
        target?.querySelector(".field-error-message")?.remove();
    }

    function getErrorMessageTarget(container) {
        if (!container) return null;
        if (container.classList.contains("subject-card")) return container.querySelector(".subject-card-body") || container;
        return container;
    }

    function clearFieldError(event) {
        const hasInvalidFlag = event.target.hasAttribute("aria-invalid");
        if (!hasInvalidFlag && !dom.errorContainers.size) return;
        const field = hasInvalidFlag
            ? event.target.closest(".rp-field, .consent-row, .subject-card")
            : event.target.closest(".has-error");
        if (!hasInvalidFlag && !field) return;
        field?.classList.remove("has-error");
        removeInlineError(field);
        event.target.removeAttribute("aria-invalid");
        dom.invalidFields.delete(event.target);
        if (field) dom.errorContainers.delete(field);
    }

    function clearErrors(root) {
        const scope = root || document;
        dom.invalidFields.forEach((field) => {
            if (!document.documentElement.contains(field)) {
                dom.invalidFields.delete(field);
                return;
            }
            if (!scope.contains(field)) return;
            field.removeAttribute("aria-invalid");
            dom.invalidFields.delete(field);
        });
        dom.errorContainers.forEach((container) => {
            if (!document.documentElement.contains(container)) {
                dom.errorContainers.delete(container);
                return;
            }
            if (!scope.contains(container)) return;
            container.classList.remove("has-error");
            removeInlineError(container);
            dom.errorContainers.delete(container);
        });
    }

    function showMessage(id, message, type = "info") {
        const box = getById(id);
        if (!box) return;
        const nextText = String(message || "");
        const nextClass = message ? `form-message ${type}` : "form-message hidden";
        if (box.textContent !== nextText) box.textContent = nextText;
        if (box.className !== nextClass) box.className = nextClass;
    }

    function getModeLabel(modes) {
        if (modes.includes("offline") && modes.includes("online")) return "Offline + Online";
        if (modes.includes("online")) return "Online Exam";
        return "Offline Exam";
    }

    function readNumber(id) {
        const value = Number(getById(id)?.value);
        return Number.isFinite(value) ? value : 0;
    }

    function readValue(id) {
        return String(getById(id)?.value || "").trim();
    }

    function sumBy(items, key) {
        return (items || []).reduce((total, item) => total + (Number(item?.[key]) || 0), 0);
    }

    function isBlank(value) {
        return value === undefined || value === null || String(value).trim() === "";
    }

    function setFixedExamInfo(exam) {
        setText("fixedTotalQuestions", String(getExamNumber(exam, "totalQuestions")));
        setText("fixedMarksPerCorrect", formatConfigNumber(getExamNumber(exam, "marksPerCorrect")));
        setText("fixedNegativeMarking", formatConfigNumber(getExamNumber(exam, "negativeMarking")));
        setText("fixedExamMode", getModeLabel(exam.supportedModes || []));
        setText("fixedNormalization", exam.normalization ? "Yes" : "No");
    }

    function getExamNumber(exam, key) {
        const value = Number(exam?.[key]);
        return Number.isFinite(value) ? value : 0;
    }

    function formatConfigNumber(value) {
        return Number(value) % 1 === 0 ? String(Number(value)) : String(Number(value).toFixed(2));
    }

    function normalizeRoll(value) {
        return String(value || "").trim();
    }

    function normalizeMobile(value) {
        const digits = String(value || "").replace(/\D/g, "");
        if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
        return digits;
    }

    function normalizeDob(value) {
        return String(value || "").trim();
    }

    function setValue(id, value) {
        const field = getById(id);
        const nextValue = String(value);
        if (field && field.value !== nextValue) field.value = nextValue;
    }

    function setText(id, value) {
        const node = getById(id);
        setNodeText(node, value);
    }

    function setNodeText(node, value) {
        const nextText = String(value);
        if (node && node.textContent !== nextText) node.textContent = nextText;
    }

    function round2(value) {
        return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    }

    function formatMarks(value) {
        return Number(value || 0).toFixed(2);
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }
}());
