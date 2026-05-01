(function () {
    const config = window.RANK_PREDICTOR_CONFIG || {};
    const state = {
        mode: "offline",
        expectedMarks: 0
    };

    document.addEventListener("DOMContentLoaded", initRankPredictor);

    function initRankPredictor() {
        const app = document.getElementById("rankPredictorApp");
        const form = document.getElementById("rankPredictorForm");
        if (!app || !form) return;

        populateSelect(document.getElementById("category"), config.categories || []);
        populateSelect(document.getElementById("state"), config.states || []);
        applyConfigDefaults();
        bindModeToggle(app);
        bindForm(form);
        setMode("offline", app);
        calculateMarks();
    }

    function populateSelect(select, values) {
        if (!select) return;
        const placeholder = select.querySelector("option[value='']")?.outerHTML || "";
        select.innerHTML = `${placeholder}${values.map(value => `<option value="${escapeAttr(value)}">${escapeHtml(value)}</option>`).join("")}`;
    }

    function applyConfigDefaults() {
        const marks = config.marks || {};
        setValue("examName", config.activeExam || "");
        setText("activeExamLabel", config.activeExam || "Not configured");
        setValue("totalQuestions", marks.totalQuestions ?? 100);
        setValue("marksPerCorrect", marks.perCorrect ?? 1);
        setValue("negativeMarking", marks.negative ?? 0);
        setValue("totalAttempted", 0);
        setValue("rightAnswers", 0);
        setValue("wrongAnswers", 0);
    }

    function bindModeToggle(app) {
        document.querySelectorAll("[data-mode]").forEach(button => {
            button.addEventListener("click", () => setMode(button.dataset.mode, app));
        });
    }

    function setMode(mode, app = document.getElementById("rankPredictorApp")) {
        state.mode = mode === "online" ? "online" : "offline";
        if (app) app.dataset.mode = state.mode;
        document.querySelectorAll("[data-mode]").forEach(button => {
            const isActive = button.dataset.mode === state.mode;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        const answerSheetLink = document.getElementById("answerSheetLink");
        if (answerSheetLink) answerSheetLink.required = state.mode === "online";
        setText("activeModeLabel", state.mode === "online" ? "Online Exam" : "Offline Exam");
    }

    function bindForm(form) {
        [
            "totalQuestions",
            "totalAttempted",
            "rightAnswers",
            "wrongAnswers",
            "marksPerCorrect",
            "negativeMarking"
        ].forEach(id => document.getElementById(id)?.addEventListener("input", calculateMarks));

        form.addEventListener("input", event => {
            const field = event.target.closest(".rp-field, .consent-row");
            field?.classList.remove("has-error");
            event.target.removeAttribute("aria-invalid");
        });

        form.addEventListener("submit", handleSubmit);
        document.getElementById("resetPredictorBtn")?.addEventListener("click", () => {
            form.reset();
            applyConfigDefaults();
            setMode("offline");
            clearErrors();
            showMessage("");
            renderPendingResult();
            calculateMarks();
        });
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
        setText("accuracyIndicator", buildAccuracyLabel(right, attempted));
        return state.expectedMarks;
    }

    function handleSubmit(event) {
        event.preventDefault();
        calculateMarks();
        const form = event.currentTarget;
        const validation = validateForm(form);
        if (!validation.ok) {
            showMessage(validation.message, "error");
            validation.field?.focus();
            return;
        }

        const payload = collectPayload();
        setLoading(true);

        if (!String(config.apiUrl || "").trim()) {
            window.setTimeout(() => {
                setLoading(false);
                showMessage("Rank predictor backend is not connected yet.", "warning");
                renderPendingResult(payload);
            }, 650);
            return;
        }

        fetch(config.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) throw new Error("Unable to submit rank predictor data.");
                return response.json();
            })
            .then(data => {
                setLoading(false);
                showMessage("Rank prediction updated successfully.", "info");
                renderBackendResult(data, payload);
            })
            .catch(error => {
                setLoading(false);
                showMessage(error.message || "Rank predictor submission failed.", "error");
            });
    }

    function validateForm(form) {
        clearErrors();
        const requiredIds = [
            "examName",
            "candidateName",
            "gender",
            "rollNumber",
            "category",
            "state",
            "totalQuestions",
            "totalAttempted",
            "rightAnswers",
            "wrongAnswers",
            "marksPerCorrect",
            "negativeMarking"
        ];
        if (state.mode === "online") requiredIds.push("answerSheetLink");

        for (const id of requiredIds) {
            const field = document.getElementById(id);
            if (!field || String(field.value).trim()) continue;
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
        if (!document.getElementById("dataConsent")?.checked) {
            const field = document.getElementById("dataConsent");
            markInvalid(field);
            return { ok: false, field, message: "Please accept the consent checkbox." };
        }

        return { ok: true };
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

    function clearErrors() {
        document.querySelectorAll("[aria-invalid='true']").forEach(field => field.removeAttribute("aria-invalid"));
        document.querySelectorAll(".has-error").forEach(field => field.classList.remove("has-error"));
    }

    function collectPayload() {
        return {
            mode: state.mode,
            examName: readValue("examName"),
            candidateName: readValue("candidateName"),
            gender: readValue("gender"),
            rollNumber: readValue("rollNumber"),
            category: readValue("category"),
            state: readValue("state"),
            totalQuestions: readNumber("totalQuestions"),
            totalAttempted: readNumber("totalAttempted"),
            rightAnswers: readNumber("rightAnswers"),
            wrongAnswers: readNumber("wrongAnswers"),
            unattempted: readNumber("unattempted"),
            marksPerCorrect: readNumber("marksPerCorrect"),
            negativeMarking: readNumber("negativeMarking"),
            expectedMarks: state.expectedMarks,
            answerSheetLink: readValue("answerSheetLink"),
            submittedAt: new Date().toISOString()
        };
    }

    function renderPendingResult(payload = collectPayload()) {
        const accuracy = payload.totalAttempted ? Math.round((payload.rightAnswers / payload.totalAttempted) * 100) : 0;
        setText("resultExpectedMarks", formatMarks(payload.expectedMarks ?? state.expectedMarks));
        setText("overallRankEstimate", "Pending");
        setText("categoryRankEstimate", "Pending");
        setText("stateRankEstimate", "Pending");
        setText("totalSubmissions", "0");
        setText("accuracyIndicator", `${accuracy}% input accuracy`);
        setText("resultNote", "Rank predictor backend is not connected yet.");
    }

    function renderBackendResult(data, payload) {
        setText("resultExpectedMarks", formatMarks(data.expectedMarks ?? payload.expectedMarks));
        setText("overallRankEstimate", data.overallRankEstimate ?? "Pending");
        setText("categoryRankEstimate", data.categoryRankEstimate ?? "Pending");
        setText("stateRankEstimate", data.stateRankEstimate ?? "Pending");
        setText("totalSubmissions", data.totalSubmissions ?? "0");
        setText("accuracyIndicator", data.accuracyIndicator ?? buildAccuracyLabel(payload.rightAnswers, payload.totalAttempted));
        setText("resultNote", data.message || "Rank estimate is based on submitted candidate data.");
    }

    function setLoading(isLoading) {
        const button = document.getElementById("predictRankBtn");
        if (!button) return;
        button.disabled = isLoading;
        button.textContent = isLoading ? "Estimating..." : "Predict Rank";
    }

    function showMessage(message, type = "info") {
        const box = document.getElementById("formMessage");
        if (!box) return;
        box.textContent = message;
        box.className = message ? `form-message ${type}` : "form-message hidden";
    }

    function buildAccuracyLabel(right, attempted) {
        if (!attempted) return "Pending";
        const accuracy = Math.round((right / attempted) * 100);
        if (accuracy >= 80) return `${accuracy}% High`;
        if (accuracy >= 55) return `${accuracy}% Moderate`;
        return `${accuracy}% Low`;
    }

    function readNumber(id) {
        const value = Number(document.getElementById(id)?.value);
        return Number.isFinite(value) ? value : 0;
    }

    function readValue(id) {
        return String(document.getElementById(id)?.value || "").trim();
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
        return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }
})();
