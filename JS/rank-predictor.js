(function () {
    "use strict";

    const config = window.RANK_PREDICTOR_CONFIG || { exams: [] };
    const API_TIMEOUT_MS = 10000;
    const API_INVALID_URL_MESSAGE = "Backend URL is not configured correctly.";
    const API_NETWORK_ERROR_MESSAGE = "Unable to connect to server. Please check your internet or try again later.";
    const API_DOPOST_NOT_REACHED_MESSAGE = "Backend doPost was not reached. Check the Apps Script /exec deployment and browser console.";
    const API_INVALID_RESPONSE_MESSAGE = "Backend did not return JSON. Apps Script doPost may not be deployed or reachable.";
    const API_TIMEOUT_MESSAGE = "Server timeout. Please try again.";
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
        populateSelect(document.getElementById("category"), exam.categories || []);
        populateSelect(document.getElementById("state"), exam.states || []);
        populateSelect(document.getElementById("stage"), exam.stages || [], "Select Stage");
        populateSelect(document.getElementById("shift"), getShiftOptions(exam), "Select Shift");
        populateSelect(document.getElementById("checkShift"), getShiftOptions(exam), "Any Shift");
        document.getElementById("rankPredictorApp")?.classList.toggle("has-stage", (exam.stages || []).length > 0);
        document.getElementById("rankPredictorApp")?.classList.toggle("has-shift", getShiftOptions(exam).length > 0);
        if ((exam.stages || []).length === 1) setValue("stage", exam.stages[0]);
        if (getShiftOptions(exam).length === 1) {
            setValue("shift", getShiftOptions(exam)[0]);
            setValue("checkShift", getShiftOptions(exam)[0]);
        }
        setValue("totalQuestions", exam.totalQuestions || 0);
        setValue("marksPerCorrect", exam.marksPerCorrect ?? 1);
        setValue("negativeMarking", exam.negativeMarking ?? 0);
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

    function getShiftOptions(exam) {
        if (!exam) return [];
        if (Array.isArray(exam.shifts) && exam.shifts.length) return exam.shifts;
        return exam.examType === "online" ? [] : ["Single Shift"];
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
        ["totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "marksPerCorrect", "negativeMarking"].forEach((id) => {
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
        const total = readNumber("totalQuestions");
        const attempted = readNumber("totalAttempted");
        const right = readNumber("rightAnswers");
        const wrong = readNumber("wrongAnswers");
        const perCorrect = readNumber("marksPerCorrect");
        const negative = readNumber("negativeMarking");
        const unattempted = Math.max(total - attempted, 0);
        const expected = (right * perCorrect) - (wrong * negative);

        state.expectedMarks = round2(expected);
        setValue("unattempted", unattempted);
        setValue("expectedMarks", formatMarks(state.expectedMarks));
        setText("resultExpectedMarks", formatMarks(state.expectedMarks));
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
        const payloadValidation = validateBackendPayload(payload);
        if (!payloadValidation.ok) {
            showMessage("submitMessage", payloadValidation.message, "error");
            return;
        }
        const apiValidation = validateApiUrl();
        if (!apiValidation.ok) {
            showMessage("submitMessage", apiValidation.message, "warning");
            renderPendingResult(payload);
            return;
        }

        requestBackend(payload, "submitDataBtn", "Submitting...")
            .then((data) => {
                if (data.duplicate) {
                    showMessage("submitMessage", data.message || "Data already exists for this Roll Number and Date of Birth. Please use Check My Rank.", "warning");
                    return;
                }
                if (!data.success) {
                    showMessage("submitMessage", data.message || "Something went wrong", "error");
                    return;
                }
                const resultData = getResponseData(data);
                showMessage("submitMessage", data.message || "Data submitted successfully.", "success");
                renderResult(resultData, payload);
            })
            .catch((error) => showMessage("submitMessage", getBackendErrorMessage(error), "error"));
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
        const payloadValidation = validateBackendPayload(payload);
        if (!payloadValidation.ok) {
            clearResultCard();
            showMessage("checkMessage", payloadValidation.message, "error");
            return;
        }
        const apiValidation = validateApiUrl();
        if (!apiValidation.ok) {
            clearResultCard();
            showMessage("checkMessage", apiValidation.message, "warning");
            return;
        }

        requestBackend(payload, "checkRankBtn", "Checking...")
            .then((data) => {
                if (data.found === false) {
                    clearResultCard();
                    showMessage("checkMessage", data.message || "No data found for this Roll Number and Date of Birth. Please submit your data first.", "warning");
                    return;
                }
                if (!data.success) {
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
        if (button) {
            button.disabled = true;
            button.textContent = loadingText;
        }

        const apiUrl = getApiUrl();
        console.log("apiUrl:", apiUrl);
        console.log("Rank API URL:", window.RANK_PREDICTOR_CONFIG?.apiUrl || config.apiUrl);
        console.log("Payload:", payload);

        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload),
            redirect: "follow",
            signal: controller.signal
        })
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                console.log("Raw response:", text);
                const data = parseApiResponse(text);
                console.log("Parsed response:", data);
                return data;
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                throw error;
            })
            .finally(() => {
                clearTimeout(timeoutId);
                if (button) {
                    button.disabled = false;
                    button.textContent = original;
                }
            });
    }

    function validateSubmitForm(form) {
        clearErrors(form);
        const required = ["candidateName", "rollNumber", "dob", "gender", "category", "state", "totalQuestions", "totalAttempted", "rightAnswers", "wrongAnswers", "marksPerCorrect", "negativeMarking"];
        const selectedExam = getSelectedExam();
        if ((selectedExam?.stages || []).length) required.push("stage");
        if (state.mode === "online" && getShiftOptions(selectedExam).length) required.push("shift");

        for (const id of required) {
            const field = document.getElementById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field);
            return { ok: false, field, message: "Please fill all required fields." };
        }

        const total = readNumber("totalQuestions");
        const attempted = readNumber("totalAttempted");
        const right = readNumber("rightAnswers");
        const wrong = readNumber("wrongAnswers");
        if (total <= 0) return invalidNumber("totalQuestions", "Total questions must be greater than zero.");
        if (attempted > total) return invalidNumber("totalAttempted", "Total attempted cannot be greater than total questions.");
        if (right + wrong > attempted) return invalidNumber("rightAnswers", "Right and wrong answers cannot exceed total attempted.");
        if (!isValidDateInput("dob")) return invalidNumber("dob", "Please enter a valid Date of Birth.");
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
        for (const id of ["checkRollNumber", "checkDob"]) {
            const field = document.getElementById(id);
            if (field && String(field.value).trim()) continue;
            markInvalid(field);
            return { ok: false, field, message: "Please enter Roll Number and Date of Birth." };
        }
        if (!isValidDateInput("checkDob")) return invalidNumber("checkDob", "Please enter a valid Date of Birth.");
        return { ok: true };
    }

    function collectSubmitPayload() {
        const selectedExam = getSelectedExam();
        return {
            action: "submitData",
            examId: selectedExam.examId,
            examName: selectedExam.examName,
            board: selectedExam.board || "",
            sheetName: selectedExam.sheetName,
            stage: readValue("stage"),
            shift: readValue("shift"),
            mode: state.mode,
            candidateName: readValue("candidateName"),
            rollNumber: normalizeRollInput(readValue("rollNumber")),
            dob: readValue("dob"),
            gender: readValue("gender"),
            category: readValue("category"),
            state: readValue("state"),
            totalQuestions: readNumber("totalQuestions"),
            totalAttempted: readNumber("totalAttempted"),
            rightAnswers: readNumber("rightAnswers"),
            wrongAnswers: readNumber("wrongAnswers"),
            unattempted: readNumber("unattempted"),
            marksPerCorrect: readNumber("marksPerCorrect"),
            negativeMarking: readNumber("negativeMarking"),
            rawMarks: state.expectedMarks,
            expectedMarks: state.expectedMarks,
            normalizedMarks: "",
            normalization: Boolean(selectedExam.normalization),
            answerKeyLink: state.mode === "online" ? readValue("answerSheetLink") : ""
        };
    }

    function collectCheckPayload() {
        const selectedExam = getSelectedExam();
        return {
            action: "checkRank",
            examId: selectedExam.examId,
            examName: selectedExam.examName,
            sheetName: selectedExam.sheetName,
            shift: readValue("checkShift"),
            rollNumber: normalizeRollInput(readValue("checkRollNumber")),
            dob: readValue("checkDob")
        };
    }

    function renderPendingResult(payload = {}) {
        setText("resultExpectedMarks", formatMarks(payload.expectedMarks ?? state.expectedMarks));
        setText("normalizedMarks", "Pending");
        setText("resultCandidateName", "Private");
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
        setText("normalizedMarks", "Pending");
        setText("resultCandidateName", "Private");
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
        setText("resultExpectedMarks", formatMarks(data.rawMarks ?? data.expectedMarks ?? payload.expectedMarks ?? state.expectedMarks));
        setText("normalizedMarks", data.normalizedMarks !== undefined && data.normalizedMarks !== "" && data.normalizedMarks !== null ? formatMarks(data.normalizedMarks) : "Pending");
        setText("resultCandidateName", data.candidateName || "Private");
        setText("overallRank", formatRank(data.overallRank));
        setText("categoryRank", formatRank(data.categoryRank));
        setText("stateRank", formatRank(data.stateRank));
        setText("shiftRank", formatRank(data.shiftRank));
        setText("totalSubmissions", total ? String(total) : "0");
        setText("accuracyIndicator", data.accuracyIndicator || getAccuracyIndicator(total));
        setText("lastUpdated", formatDateTime(data.lastUpdated));
        setText("resultNote", data.rankBasis === "normalized" ? "Rank is based on normalized marks." : "Rank based on raw marks. Normalized rank will improve when normalized marks are available.");
    }

    function getAccuracyIndicator(totalSubmissions) {
        if (totalSubmissions >= 1000) return "High";
        if (totalSubmissions >= 100) return "Medium";
        return "Low";
    }

    function formatRank(value) {
        return value ? `#${value}` : "Pending";
    }

    function formatDateTime(value) {
        if (!value) return "Just now";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    }

    function getApiUrl() {
        const apiUrl = String(config.apiUrl || "").trim();
        return apiUrl;
    }

    function setSelectedExam(exam) {
        state.exam = exam;
        window.RANK_PREDICTOR_SELECTED_EXAM = exam;
    }

    function getSelectedExam() {
        return window.RANK_PREDICTOR_SELECTED_EXAM || state.exam;
    }

    function validateApiUrl() {
        const apiUrl = getApiUrl();
        if (!apiUrl || apiUrl === "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
            return { ok: false, message: API_INVALID_URL_MESSAGE };
        }
        if (!apiUrl.startsWith("https://") || !apiUrl.endsWith("/exec") || apiUrl.includes("/dev")) {
            return { ok: false, message: API_INVALID_URL_MESSAGE };
        }
        return { ok: true };
    }

    function getResponseData(data) {
        if (data && typeof data.data === "object" && data.data !== null) {
            return Object.assign({}, data, data.data);
        }
        return data || {};
    }

    function parseApiResponse(text) {
        try {
            return JSON.parse(text);
        } catch (error) {
            console.error("JSON parse error:", error);
            const invalidResponseError = new Error(API_INVALID_RESPONSE_MESSAGE);
            invalidResponseError.code = "INVALID_JSON_RESPONSE";
            throw invalidResponseError;
        }
    }

    function getBackendErrorMessage(error) {
        if (error?.name === "AbortError") return API_TIMEOUT_MESSAGE;
        if (error?.code === "INVALID_JSON_RESPONSE") return API_INVALID_RESPONSE_MESSAGE;
        if (error instanceof TypeError) return API_DOPOST_NOT_REACHED_MESSAGE;
        return API_NETWORK_ERROR_MESSAGE;
    }

    function validateBackendPayload(payload) {
        const required = ["action", "sheetName", "examId", "rollNumber", "dob"];
        const missing = required.filter((key) => !String(payload[key] || "").trim());
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

    function isValidDateInput(id) {
        const field = document.getElementById(id);
        if (!field) return false;
        if (field.validity && !field.validity.valid) return false;
        return !Number.isNaN(new Date(field.value).getTime());
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

    function normalizeRollInput(value) {
        return String(value || "").trim().toUpperCase();
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
