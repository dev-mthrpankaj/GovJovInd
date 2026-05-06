(function () {
    "use strict";

    const config = window.RANK_PREDICTOR_CONFIG || { exams: [] };
    const API_INVALID_URL_MESSAGE = "Backend URL is not configured correctly.";
    const API_NETWORK_ERROR_MESSAGE = "Server connection failed. Please try again.";
    const API_INVALID_RESPONSE_MESSAGE = "Invalid backend response.";
    const PROCESSING_TEXT = "Processing...";
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
        subjectControls: [],
        invalidFields: new Set(),
        errorContainers: new Set()
    };
    const debouncedTotalCalculation = debounce(runMarksCalculation, 300);
    const debouncedSubjectCalculation = debounce(runMarksCalculation, 300);
    const debouncedMobileCalculation = debounce(runMobileMarksCalculation, 900);

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
    }

    function cacheSubjectControls(grid = getById("subjectEntryGrid")) {
        dom.subjectControls = Array.from(grid?.querySelectorAll("[data-subject-index]") || []).map((card) => ({
            card,
            correct: card.querySelector('[data-subject-field="correct"]'),
            wrong: card.querySelector('[data-subject-field="wrong"]'),
            attempted: card.querySelector('[data-subject-derived="attempted"]'),
            unattempted: card.querySelector('[data-subject-derived="unattempted"]')
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
        return Boolean(window.matchMedia?.("(pointer: coarse), (max-width: 767px)")?.matches || window.innerWidth <= 767);
    }

    function initRankPredictor() {
        const app = getById("rankPredictorApp");
        if (!app) return;

        cacheStaticDom();
        state.mobileMarksMode = detectMobileMarksMode();
        setSelectedExam((config.exams || []).find((exam) => !exam.disabled) || null);
        bindTabs();
        bindExamSelector();
        bindModeToggle(app);
        bindSubmitForm();
        bindCheckForm();
        applyExamDefaults();
        renderPendingResult();
        window.addEventListener("resize", () => {
            state.mobileMarksMode = detectMobileMarksMode();
        }, { passive: true });
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
        select.innerHTML = (config.exams || []).map((exam) => `<option value="${escapeAttr(exam.examId)}" ${exam.disabled ? "disabled" : ""}>${escapeHtml(exam.examName)}</option>`).join("");
        select.addEventListener("change", () => {
            let selectedExam = (config.exams || []).find((exam) => exam.examId === select.value) || null;
            if (selectedExam?.disabled) selectedExam = (config.exams || []).find((exam) => !exam.disabled) || null;
            setSelectedExam(selectedExam);
            applyExamDefaults();
            renderPendingResult();
        });
    }

    function applyExamDefaults() {
        const exam = getSelectedExam();
        if (!exam) {
            setText("activeExamLabel", "Not configured");
            setText("activeModeLabel", "No exam");
            showMessage("submitMessage", "No exams configured in rank-predictor-config.js.", "error");
            return;
        }

        setValue("globalExamSelect", exam.examId);
        setValue("submitExamName", exam.examName);
        setValue("checkExamName", exam.examName);
        setText("activeExamLabel", exam.examName);
        setText("activeModeLabel", getModeLabel(exam.supportedModes || []));
        setText("normalizationLabel", exam.normalization ? "Yes" : "No");
        setFixedExamInfo(exam);
        renderSubjectInputs(exam);
        setAggregateAttemptFieldsReadonly(exam);
        populateSelect(getById("category"), exam.categories || []);
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
    }

    function populateSelect(select, values, placeholder = "Select") {
        if (!select) return;
        select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${values.map((value) => `<option value="${escapeAttr(value)}">${escapeHtml(value)}</option>`).join("")}`;
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
        form.addEventListener("input", clearFieldError);
        form.addEventListener("submit", handleSubmit);
        getById("resetPredictorBtn")?.addEventListener("click", () => {
            form.reset();
            applyExamDefaults();
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
        state.marksDirty = true;
        if (state.mobileMarksMode) {
            debouncedMobileCalculation();
            return;
        }
        debouncedSubjectCalculation();
    }

    function handleSubjectMarksFocus(event) {
        if (!isSubjectInput(event.target) || event.target.value !== "0") return;
        event.target.select();
    }

    function handleMarksBlur(event) {
        if (!isMarksInput(event.target)) return;
        runMarksCalculation();
    }

    function runMarksCalculation() {
        state.marksDirty = false;
        scheduleMarksCalculation();
    }

    function runMobileMarksCalculation() {
        if (!state.marksDirty || isMarksInput(document.activeElement)) return;
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
        return state.expectedMarks;
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
            validation.field?.focus();
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
                    showMessage("submitMessage", "Data already exists for this Roll Number and DOB. Please use Check My Rank.", "warning");
                    return;
                }
                if (!data.success) {
                    clearResultCard();
                    showMessage("submitMessage", API_NETWORK_ERROR_MESSAGE, "error");
                    return;
                }
                const resultData = getResponseData(data);
                showMessage("submitMessage", data.message || "Data submitted successfully.", "success");
                renderResult(resultData, payload);
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
            validation.field?.focus();
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
                    showMessage("checkMessage", "No data found for this Roll Number and DOB.", "warning");
                    return;
                }
                if (!data.success) {
                    clearResultCard();
                    showMessage("checkMessage", API_NETWORK_ERROR_MESSAGE, "error");
                    return;
                }
                const resultData = getResponseData(data);
                showMessage("checkMessage", data.message || "Rank found successfully.", "success");
                renderResult(resultData, payload);
            })
            .catch(() => {
                clearResultCard();
                showMessage("checkMessage", getBackendErrorMessage(), "error");
            });
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
            markInvalid(field);
            return { ok: false, field, message: "Please select a valid exam." };
        }
        const required = ["candidateName", "rollNumber", "dob", "examDate", "gender", "category", "state", "totalAttempted", "rightAnswers", "wrongAnswers"];
        if (selectedExam.hasShifts) required.push("shift");

        for (const id of required) {
            const field = getById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field);
            return { ok: false, field, message: "Please fill all required fields." };
        }

        const total = getExamNumber(selectedExam, "totalQuestions");
        const attempted = readNumber("totalAttempted");
        const right = readNumber("rightAnswers");
        const wrong = readNumber("wrongAnswers");
        const subjectValidation = validateSubjectInputs(selectedExam, attempted, right, wrong);
        if (!subjectValidation.ok) return subjectValidation;
        if (total <= 0) return invalidNumber("globalExamSelect", "Total questions must be configured for this exam.");
        if (attempted > total) return invalidNumber("totalAttempted", "Total attempted cannot be greater than total questions.");
        if (right + wrong > attempted) return invalidNumber("rightAnswers", "Right and wrong answers cannot exceed total attempted.");
        if (total - attempted < 0) return invalidNumber("totalAttempted", "Unattempted cannot be negative.");
        if (!isValidDateInput("dob")) return invalidNumber("dob", "Please enter a valid Date of Birth.");
        if (!isValidDateInput("examDate")) return invalidNumber("examDate", "Please enter a valid Exam Date.");
        if (selectedExam.hasShifts && !isPositiveIntegerInput("shift")) return invalidNumber("shift", "Shift Number must be a positive number.");
        if (!Number.isFinite(state.expectedMarks)) return invalidNumber("expectedMarks", "Marks could not be calculated. Please check your answers.");
        if (!getById("dataConsent")?.checked) {
            const field = getById("dataConsent");
            markInvalid(field);
            return { ok: false, field, message: "Please fill all required fields." };
        }
        return { ok: true };
    }

    function validateCheckForm(form) {
        clearErrors(form);
        const selectedExam = getSelectedExam();
        if (!selectedExam || selectedExam.disabled || !String(selectedExam.sheetName || "").trim()) {
            const field = getById("globalExamSelect");
            markInvalid(field);
            return { ok: false, field, message: "Please select a valid exam." };
        }
        for (const id of ["checkRollNumber", "checkDob"]) {
            const field = getById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field);
            return { ok: false, field, message: "Please fill all required fields." };
        }
        if (!isValidDateInput("checkDob")) return invalidNumber("checkDob", "Please enter a valid Date of Birth.");
        const checkExamDate = getById("checkExamDate");
        if (checkExamDate?.value && !isValidDateInput("checkExamDate")) return invalidNumber("checkExamDate", "Please enter a valid Exam Date.");
        const checkShift = getById("checkShift");
        if (checkShift?.value && !isPositiveIntegerInput("checkShift")) return invalidNumber("checkShift", "Shift Number must be a positive number.");
        return { ok: true };
    }

    function collectSubmitPayload() {
        const selectedExam = getSelectedExam();
        const rollNumberInput = getById("rollNumber");
        const dobInput = getById("dob");
        const examDateInput = getById("examDate");
        const rollNumber = normalizeRoll(rollNumberInput?.value);
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
            examId: selectedExam.examId,
            examName: selectedExam.examName,
            sheetName: selectedExam.sheetName,
            mode: state.mode,
            candidateName: readValue("candidateName"),
            rollNumber,
            dob,
            gender: readValue("gender"),
            category: readValue("category"),
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
        const rollNumberInput = getById("checkRollNumber");
        const dobInput = getById("checkDob");
        const examDateInput = getById("checkExamDate");
        const rollNumber = normalizeRoll(rollNumberInput?.value);
        const dob = dobInput?.value || "";
        return {
            action: "checkRank",
            examId: selectedExam.examId,
            examName: selectedExam.examName,
            sheetName: selectedExam.sheetName,
            rollNumber,
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
            const maxLength = Math.max(String(questions).length, 1);
            const correctId = `subject-${index}-correct`;
            const wrongId = `subject-${index}-wrong`;
            return `
                <article class="subject-card" data-subject-index="${index}">
                    <div class="subject-card-heading">
                        <strong>${escapeHtml(name)}</strong>
                        <small>${questions} questions</small>
                    </div>
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
                </article>`;
        }).join("");
        cacheSubjectControls(grid);
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
            return {
                name: String(subject.name || `Subject ${index + 1}`),
                questions: Number(subject.questions) || 0,
                attempted,
                correct,
                wrong,
                marks: round2((correct * marksPerCorrect) - (wrong * negativeMarking))
            };
        });
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
        markInvalid(input);
        return { ok: false, field: input, message };
    }

    function renderPendingResult(payload = {}) {
        setText("resultExpectedMarks", "Pending");
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
        setText("resultNote", "Rank prediction accuracy improves as more candidates submit data.");
    }

    function clearResultCard() {
        setText("resultExpectedMarks", "Pending");
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
        setText("resultNote", "No matching record found for the selected exam, roll number, and DOB.");
    }

    function renderResult(data, payload) {
        const total = Number(data.totalSubmissions || data.total || 0);
        const marks = data.rawMarks ?? data.marks;
        setText("resultExpectedMarks", marks !== undefined && marks !== null && marks !== "" ? formatMarks(marks) : "Pending");
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
        setText("resultNote", "Rank and percentile are based on submitted raw marks for the selected exam.");
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

    function setSelectedExam(exam) {
        state.exam = exam;
        window.RANK_PREDICTOR_SELECTED_EXAM = exam;
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
            ? ["action", "sheetName", "examId", "examName", "rollNumber", "dob", "examDate", "totalQuestions", "marksPerCorrect", "rawMarks"]
            : ["action", "sheetName", "examId", "examName", "rollNumber", "dob"];
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

    function invalidNumber(id, message) {
        const field = getById(id);
        markInvalid(field);
        return { ok: false, field, message };
    }

    function markInvalid(field) {
        if (!field) return;
        field.setAttribute("aria-invalid", "true");
        dom.invalidFields.add(field);
        const container = field.closest(".rp-field, .consent-row, .subject-card");
        container?.classList.add("has-error");
        if (container) dom.errorContainers.add(container);
    }

    function clearFieldError(event) {
        const hasInvalidFlag = event.target.hasAttribute("aria-invalid");
        if (!hasInvalidFlag && !dom.errorContainers.size) return;
        const field = hasInvalidFlag
            ? event.target.closest(".rp-field, .consent-row, .subject-card")
            : event.target.closest(".has-error");
        if (!hasInvalidFlag && !field) return;
        field?.classList.remove("has-error");
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
        dom.errorContainers.forEach((field) => {
            if (!document.documentElement.contains(field)) {
                dom.errorContainers.delete(field);
                return;
            }
            if (!scope.contains(field)) return;
            field.classList.remove("has-error");
            dom.errorContainers.delete(field);
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
