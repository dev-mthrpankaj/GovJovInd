(function () {
    "use strict";

    const config = window.RANK_PREDICTOR_CONFIG || { exams: [] };
    const API_INVALID_URL_MESSAGE = "Backend URL is not configured correctly.";
    const API_NETWORK_ERROR_MESSAGE = "Unable to connect to server. Please check your internet or try again later.";
    const API_INVALID_RESPONSE_MESSAGE = "Invalid backend response.";
    const state = {
        exam: null,
        mode: "offline",
        activeTab: "submit",
        expectedMarks: 0
    };

    document.addEventListener("DOMContentLoaded", initRankPredictor);

    function initRankPredictor() {
        const app = document.getElementById("rankPredictorApp");
        if (!app) return;

        setSelectedExam((config.exams || []).find((exam) => !exam.disabled) || null);
        bindTabs();
        bindExamSelector();
        bindModeToggle(app);
        bindSubmitForm();
        bindCheckForm();
        applyExamDefaults();
        calculateMarks();
        renderPendingResult();
    }

    function bindTabs() {
        document.querySelectorAll("[data-tab]").forEach((button) => {
            button.addEventListener("click", () => setTab(button.dataset.tab));
        });
    }

    function setTab(tab) {
        state.activeTab = tab === "check" ? "check" : "submit";
        document.querySelectorAll("[data-tab]").forEach((button) => {
            const active = button.dataset.tab === state.activeTab;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", String(active));
        });
        document.querySelectorAll("[data-panel]").forEach((panel) => {
            panel.classList.toggle("is-active", panel.dataset.panel === state.activeTab);
        });
    }

    function bindExamSelector() {
        const select = document.getElementById("globalExamSelect");
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
        populateSelect(document.getElementById("category"), exam.categories || []);
        populateSelect(document.getElementById("state"), exam.states || []);
        document.getElementById("rankPredictorApp")?.classList.toggle("has-shift", Boolean(exam.hasShifts));
        const shift = document.getElementById("shift");
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
        document.querySelectorAll("[data-mode]").forEach((button) => {
            button.addEventListener("click", () => {
                if (!button.disabled) setMode(button.dataset.mode, app);
            });
        });
    }

    function setMode(mode, app = document.getElementById("rankPredictorApp")) {
        const supported = state.exam?.supportedModes || ["offline"];
        state.mode = supported.includes(mode) ? mode : supported[0] || "offline";
        if (app) app.dataset.mode = state.mode;
        document.querySelectorAll("[data-mode]").forEach((button) => {
            const supportedMode = supported.includes(button.dataset.mode);
            const active = button.dataset.mode === state.mode;
            button.disabled = !supportedMode;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        const answerSheetLink = document.getElementById("answerSheetLink");
        if (answerSheetLink) answerSheetLink.required = false;
    }

    function bindSubmitForm() {
        const form = document.getElementById("rankSubmitForm");
        if (!form) return;
        ["totalAttempted", "rightAnswers", "wrongAnswers"].forEach((id) => {
            document.getElementById(id)?.addEventListener("input", calculateMarks);
        });
        form.addEventListener("input", clearFieldError);
        form.addEventListener("submit", handleSubmit);
        document.getElementById("resetPredictorBtn")?.addEventListener("click", () => {
            form.reset();
            applyExamDefaults();
            clearErrors(form);
            showMessage("submitMessage", "");
            renderPendingResult();
        });
    }

    function bindCheckForm() {
        const form = document.getElementById("rankCheckForm");
        if (!form) return;
        form.addEventListener("input", clearFieldError);
        form.addEventListener("submit", handleCheckRank);
    }

    function calculateMarks() {
        const selectedExam = getSelectedExam();
        const total = getExamNumber(selectedExam, "totalQuestions");
        const attempted = readNumber("totalAttempted");
        const right = readNumber("rightAnswers");
        const wrong = readNumber("wrongAnswers");
        const perCorrect = getExamNumber(selectedExam, "marksPerCorrect");
        const negative = getExamNumber(selectedExam, "negativeMarking");
        const unattempted = Math.max(total - attempted, 0);
        const expected = (right * perCorrect) - (wrong * negative);

        state.expectedMarks = round2(expected);
        setValue("unattempted", unattempted);
        setValue("expectedMarks", formatMarks(state.expectedMarks));
        return state.expectedMarks;
    }

    function handleSubmit(event) {
        event.preventDefault();
        calculateMarks();
        const form = event.currentTarget;
        const validation = validateSubmitForm(form);
        if (!validation.ok) {
            showMessage("submitMessage", validation.message, "error");
            validation.field?.focus();
            return;
        }

        const payload = collectSubmitPayload();
        console.log("Submit payload:", payload);
        const payloadValidation = validateBackendPayload(payload);
        if (!payloadValidation.ok) {
            clearResultCard();
            showMessage("submitMessage", payloadValidation.message, "error");
            return;
        }

        requestBackend(payload, "submitDataBtn", "Submitting...")
            .then((data) => {
                if (data.duplicate) {
                    clearResultCard();
                    showMessage("submitMessage", data.message || "Data already exists for this Roll Number and Date of Birth. Please use Check My Rank.", "warning");
                    return;
                }
                if (!data.success) {
                    clearResultCard();
                    showMessage("submitMessage", data.message || "Something went wrong", "error");
                    return;
                }
                const resultData = getResponseData(data);
                showMessage("submitMessage", data.message || "Data submitted successfully.", "success");
                renderResult(resultData, payload);
            })
            .catch((error) => {
                clearResultCard();
                showMessage("submitMessage", getBackendErrorMessage(error), "error");
            });
    }

    function handleCheckRank(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const validation = validateCheckForm(form);
        if (!validation.ok) {
            clearResultCard();
            showMessage("checkMessage", validation.message, "error");
            validation.field?.focus();
            return;
        }

        const payload = collectCheckPayload();
        console.log("Check payload:", payload);
        const payloadValidation = validateBackendPayload(payload);
        if (!payloadValidation.ok) {
            clearResultCard();
            showMessage("checkMessage", payloadValidation.message, "error");
            return;
        }

        requestBackend(payload, "checkRankBtn", "Checking...")
            .then((data) => {
                if (data.found === false) {
                    console.log("Check Rank Debug:", data.debug || data);
                    clearResultCard();
                    showMessage("checkMessage", data.message || "No data found for this Roll Number and Date of Birth. Please submit your data first.", "warning");
                    return;
                }
                if (!data.success) {
                    console.log("Check Rank Debug:", data.debug || data);
                    clearResultCard();
                    showMessage("checkMessage", data.message || "Something went wrong", "error");
                    return;
                }
                const resultData = getResponseData(data);
                showMessage("checkMessage", data.message || "Rank found successfully.", "success");
                renderResult(resultData, payload);
            })
            .catch((error) => {
                clearResultCard();
                showMessage("checkMessage", getBackendErrorMessage(error), "error");
            });
    }

    function requestBackend(payload, buttonId, loadingText) {
        const button = document.getElementById(buttonId);
        const original = button?.textContent || "";
        if (button) {
            button.disabled = true;
            button.textContent = loadingText;
        }

        return callRankApi(payload)
            .finally(() => {
                if (button) {
                    button.disabled = false;
                    button.textContent = original;
                }
            });
    }

    async function callRankApi(payload) {
        const apiUrl = RANK_PREDICTOR_CONFIG.apiUrl;

        console.log("apiUrl:", apiUrl);

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
        console.log("Raw response:", text);

        try {
            const response = JSON.parse(text);
            console.log("Parsed response:", response);
            console.log("API response:", response);
            console.log("Rank API response:", response);
            return response;
        } catch (error) {
            console.error("Invalid backend response:", text);
            throw new Error(API_INVALID_RESPONSE_MESSAGE);
        }
    }

    function validateSubmitForm(form) {
        clearErrors(form);
        const selectedExam = getSelectedExam();
        if (!selectedExam || selectedExam.disabled || !String(selectedExam.sheetName || "").trim()) {
            const field = document.getElementById("globalExamSelect");
            markInvalid(field);
            return { ok: false, field, message: "Please select a valid exam." };
        }
        const required = ["candidateName", "rollNumber", "dob", "examDate", "gender", "category", "state", "totalAttempted", "rightAnswers", "wrongAnswers"];
        if (selectedExam.hasShifts) required.push("shift");

        for (const id of required) {
            const field = document.getElementById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field);
            return { ok: false, field, message: "Please fill all required fields." };
        }

        const total = getExamNumber(selectedExam, "totalQuestions");
        const attempted = readNumber("totalAttempted");
        const right = readNumber("rightAnswers");
        const wrong = readNumber("wrongAnswers");
        if (total <= 0) return invalidNumber("globalExamSelect", "Total questions must be configured for this exam.");
        if (attempted > total) return invalidNumber("totalAttempted", "Total attempted cannot be greater than total questions.");
        if (right + wrong > attempted) return invalidNumber("rightAnswers", "Right and wrong answers cannot exceed total attempted.");
        if (total - attempted < 0) return invalidNumber("totalAttempted", "Unattempted cannot be negative.");
        if (!isValidDateInput("dob")) return invalidNumber("dob", "Please enter a valid Date of Birth.");
        if (!isValidDateInput("examDate")) return invalidNumber("examDate", "Please enter a valid Exam Date.");
        if (selectedExam.hasShifts && !isPositiveIntegerInput("shift")) return invalidNumber("shift", "Shift Number must be a positive number.");
        if (!Number.isFinite(state.expectedMarks)) return invalidNumber("expectedMarks", "Marks could not be calculated. Please check your answers.");
        if (!document.getElementById("dataConsent")?.checked) {
            const field = document.getElementById("dataConsent");
            markInvalid(field);
            return { ok: false, field, message: "Please accept the consent checkbox." };
        }
        return { ok: true };
    }

    function validateCheckForm(form) {
        clearErrors(form);
        const selectedExam = getSelectedExam();
        if (!selectedExam || selectedExam.disabled || !String(selectedExam.sheetName || "").trim()) {
            const field = document.getElementById("globalExamSelect");
            markInvalid(field);
            return { ok: false, field, message: "Please select a valid exam." };
        }
        for (const id of ["checkRollNumber", "checkDob"]) {
            const field = document.getElementById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field);
            return { ok: false, field, message: "Please enter Roll Number and Date of Birth." };
        }
        if (!isValidDateInput("checkDob")) return invalidNumber("checkDob", "Please enter a valid Date of Birth.");
        const checkExamDate = document.getElementById("checkExamDate");
        if (checkExamDate?.value && !isValidDateInput("checkExamDate")) return invalidNumber("checkExamDate", "Please enter a valid Exam Date.");
        const checkShift = document.getElementById("checkShift");
        if (checkShift?.value && !isPositiveIntegerInput("checkShift")) return invalidNumber("checkShift", "Shift Number must be a positive number.");
        return { ok: true };
    }

    function collectSubmitPayload() {
        const selectedExam = getSelectedExam();
        const rollNumberInput = document.getElementById("rollNumber");
        const dobInput = document.getElementById("dob");
        const examDateInput = document.getElementById("examDate");
        const rollNumber = normalizeRoll(rollNumberInput?.value);
        const dob = dobInput?.value || "";
        const totalQuestions = getExamNumber(selectedExam, "totalQuestions");
        const totalAttempted = readNumber("totalAttempted");
        const rightAnswers = readNumber("rightAnswers");
        const wrongAnswers = readNumber("wrongAnswers");
        const marksPerCorrect = getExamNumber(selectedExam, "marksPerCorrect");
        const negativeMarking = getExamNumber(selectedExam, "negativeMarking");
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
            answerKeyLink: state.mode === "online" ? readValue("answerSheetLink") : "",
            userAgent: navigator.userAgent
        };
    }

    function collectCheckPayload() {
        const selectedExam = getSelectedExam();
        const rollNumberInput = document.getElementById("checkRollNumber");
        const dobInput = document.getElementById("checkDob");
        const examDateInput = document.getElementById("checkExamDate");
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

    function renderPendingResult(payload = {}) {
        setText("resultExpectedMarks", "Pending");
        setText("resultPercentile", "Pending");
        setText("overallRank", "Pending");
        setText("categoryRank", "Pending");
        setText("stateRank", "Pending");
        setText("shiftRank", "Pending");
        setText("totalSubmissions", "0");
        setText("accuracyIndicator", "Pending");
        setText("lastUpdated", "Pending");
        setText("resultNote", "Rank prediction accuracy improves as more candidates submit data.");
    }

    function clearResultCard() {
        setText("resultExpectedMarks", "Pending");
        setText("resultPercentile", "Pending");
        setText("overallRank", "Pending");
        setText("categoryRank", "Pending");
        setText("stateRank", "Pending");
        setText("shiftRank", "Pending");
        setText("totalSubmissions", "0");
        setText("accuracyIndicator", "Pending");
        setText("lastUpdated", "Pending");
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
        setText("totalSubmissions", total ? String(total) : "0");
        setText("accuracyIndicator", data.accuracyIndicator || getAccuracyIndicator(total));
        setText("lastUpdated", formatDateTime(data.lastUpdated));
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
        if (error instanceof TypeError) return API_NETWORK_ERROR_MESSAGE;
        if (error?.message) return error.message;
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
                message: `Backend payload missing: ${missing.join(", ")}`
            };
        }
        if (!["submitData", "checkRank"].includes(payload.action)) {
            return {
                ok: false,
                message: "Backend payload action is invalid."
            };
        }
        return { ok: true };
    }

    function isPositiveIntegerInput(id) {
        const value = document.getElementById(id)?.value;
        return /^[1-9]\d*$/.test(String(value || "").trim());
    }

    function isValidDateInput(id) {
        const field = document.getElementById(id);
        if (!field) return false;
        if (field.validity && !field.validity.valid) return false;
        return /^\d{4}-\d{2}-\d{2}$/.test(field.value);
    }

    function invalidNumber(id, message) {
        const field = document.getElementById(id);
        markInvalid(field);
        return { ok: false, field, message };
    }

    function markInvalid(field) {
        if (!field) return;
        field.setAttribute("aria-invalid", "true");
        field.closest(".rp-field, .consent-row")?.classList.add("has-error");
    }

    function clearFieldError(event) {
        const field = event.target.closest(".rp-field, .consent-row");
        field?.classList.remove("has-error");
        event.target.removeAttribute("aria-invalid");
    }

    function clearErrors(root) {
        (root || document).querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
        (root || document).querySelectorAll(".has-error").forEach((field) => field.classList.remove("has-error"));
    }

    function showMessage(id, message, type = "info") {
        const box = document.getElementById(id);
        if (!box) return;
        box.textContent = message;
        box.className = message ? `form-message ${type}` : "form-message hidden";
    }

    function getModeLabel(modes) {
        if (modes.includes("offline") && modes.includes("online")) return "Offline + Online";
        if (modes.includes("online")) return "Online Exam";
        return "Offline Exam";
    }

    function readNumber(id) {
        const value = Number(document.getElementById(id)?.value);
        return Number.isFinite(value) ? value : 0;
    }

    function readValue(id) {
        return String(document.getElementById(id)?.value || "").trim();
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
        const field = document.getElementById(id);
        if (field) field.value = value;
    }

    function setText(id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = value;
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
