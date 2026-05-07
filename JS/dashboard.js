(function () {
    "use strict";

    const state = {
        session: null,
        attempts: [],
        subjects: [],
        summary: {}
    };

    document.addEventListener("DOMContentLoaded", initDashboard);

    function initDashboard() {
        const auth = window.CandidateAuth;
        if (!auth) return;

        const session = auth.requireAuth();
        if (!session) return;
        state.session = session;
        auth.bindLogout();
        renderSession(session);
        bindModal();
        loadDashboard();
        window.addEventListener("resize", debounce(renderCharts, 150), { passive: true });
    }

    async function loadDashboard() {
        const auth = window.CandidateAuth;
        const app = document.getElementById("candidateDashboard");
        showDashboardMessage("Loading dashboard...");
        try {
            const payload = {
                action: "getCandidateDashboard",
                userId: state.session.userId,
                mobile: state.session.mobile,
                email: state.session.email
            };
            const result = await auth.callApi(payload);
            if (!result.success) {
                showDashboardMessage(result.message || "Dashboard data is unavailable.", "error");
                renderDashboard({ attempts: [], subjectAnalytics: [], summary: {} });
                return;
            }
            renderDashboard(result);
            showDashboardMessage("");
        } catch {
            showDashboardMessage("Server connection failed. Please try again.", "error");
            renderDashboard({ attempts: [], subjectAnalytics: [], summary: {} });
        } finally {
            if (app) app.setAttribute("aria-busy", "false");
        }
    }

    function renderSession(session) {
        setText("candidateName", session.name || "Candidate");
        const contact = session.email || session.mobile || session.userId;
        setText("candidateContact", contact ? `${contact} | Candidate ID: ${session.userId}` : `Candidate ID: ${session.userId}`);
    }

    function renderDashboard(data) {
        state.attempts = Array.isArray(data.attempts) ? data.attempts : [];
        state.subjects = Array.isArray(data.subjectAnalytics) ? data.subjectAnalytics : [];
        state.summary = data.summary || {};
        renderMetrics();
        renderAttempts();
        renderRecent();
        renderSubjects();
        renderCharts();
    }

    function renderMetrics() {
        const summary = state.summary;
        setText("metricTotalExams", formatNumber(summary.totalExamsAttempted || state.attempts.length));
        setText("metricAveragePercentile", formatPercent(summary.averagePercentile));
        setText("metricBestRank", summary.bestRank ? `#${summary.bestRank}` : "Pending");
        setText("metricBestRankExam", summary.bestRankExam || "No attempts yet");
        setText("metricBestSubject", summary.bestSubject || "Pending");
        setText("metricBestSubjectScore", summary.bestSubjectAccuracy !== undefined ? `${formatPercent(summary.bestSubjectAccuracy)} accuracy` : "Accuracy");
        setText("metricWeakSubject", summary.weakSubject || "Pending");
        setText("metricWeakSubjectScore", summary.weakSubjectAccuracy !== undefined ? `${formatPercent(summary.weakSubjectAccuracy)} accuracy` : "Needs focus");
        setText("metricRecentExams", formatNumber(Math.min(state.attempts.length, 5)));
    }

    function renderAttempts() {
        const list = document.getElementById("attemptList");
        setText("attemptCountLabel", `${state.attempts.length} saved attempts`);
        if (!list) return;
        if (!state.attempts.length) {
            list.innerHTML = renderEmpty("No attempts yet", "Submit your first Rank Predictor attempt to unlock analytics.");
            return;
        }
        list.innerHTML = state.attempts.map((attempt, index) => renderAttemptRow(attempt, index)).join("");
        list.querySelectorAll("[data-attempt-index]").forEach((button) => {
            button.addEventListener("click", () => openScorecard(Number(button.dataset.attemptIndex)));
        });
    }

    function renderRecent() {
        const list = document.getElementById("recentExamList");
        if (!list) return;
        const recent = state.attempts.slice(0, 5);
        if (!recent.length) {
            list.innerHTML = renderEmpty("No recent exams", "Recent attempts will appear here.");
            return;
        }
        list.innerHTML = recent.map((attempt, index) => renderAttemptRow(attempt, index, true)).join("");
        list.querySelectorAll("[data-attempt-index]").forEach((button) => {
            button.addEventListener("click", () => openScorecard(Number(button.dataset.attemptIndex)));
        });
    }

    function renderAttemptRow(attempt, index, compact = false) {
        return `
            <button class="attempt-row" type="button" data-attempt-index="${index}">
                <span class="attempt-title">
                    <strong>${escapeHtml(attempt.examName || "Rank Predictor Attempt")}</strong>
                    <span>${escapeHtml(formatDate(attempt.examDate || attempt.timestamp))}</span>
                </span>
                <span class="attempt-metrics">
                    <div><span>Percentile</span><strong>${formatPercent(attempt.percentile)}</strong></div>
                    <div><span>Rank</span><strong>${attempt.overallRank ? `#${escapeHtml(attempt.overallRank)}` : "Pending"}</strong></div>
                    <div><span>Marks</span><strong>${formatMarks(attempt.rawMarks ?? attempt.marks)}</strong></div>
                    ${compact ? "" : `<div><span>Mode</span><strong>${escapeHtml(attempt.mode || "Exam")}</strong></div>`}
                </span>
            </button>
        `;
    }

    function renderSubjects() {
        const container = document.getElementById("subjectAnalytics");
        if (!container) return;
        if (!state.subjects.length) {
            container.innerHTML = renderEmpty("No subject analytics", "Subject-wise attempts will build this view.");
            return;
        }
        container.innerHTML = state.subjects.map((subject) => {
            const accuracy = clamp(Number(subject.accuracy) || 0, 0, 100);
            return `
                <article class="subject-tile">
                    <div class="subject-tile-header">
                        <strong>${escapeHtml(subject.name || "Subject")}</strong>
                        <span>${formatPercent(accuracy)}</span>
                    </div>
                    <div class="subject-progress" aria-hidden="true"><span style="width:${accuracy}%"></span></div>
                    <div class="subject-meta">
                        <span>Avg ${formatMarks(subject.averageScore)}</span>
                        <span>Best ${formatMarks(subject.bestScore)}</span>
                        <span>Weak ${formatMarks(subject.weakestScore)}</span>
                    </div>
                </article>
            `;
        }).join("");
    }

    function renderCharts() {
        drawLineChart("percentileTrendChart", state.attempts.slice().reverse().map((attempt) => ({
            label: attempt.examName || "Exam",
            value: Number(attempt.percentile) || 0
        })), { suffix: "%", max: 100, color: "#0b5ed7" });

        drawBarChart("subjectAccuracyChart", state.subjects.map((subject) => ({
            label: subject.name || "Subject",
            value: Number(subject.accuracy) || 0
        })), { suffix: "%", max: 100, color: "#0f766e" });

        drawBarChart("examPerformanceChart", state.attempts.slice(0, 8).reverse().map((attempt) => ({
            label: attempt.examName || "Exam",
            value: Number(attempt.rawMarks ?? attempt.marks) || 0,
            secondary: Number(attempt.percentile) || 0
        })), { suffix: "", color: "#b45309", secondaryColor: "#6d28d9" });
    }

    function drawLineChart(id, points, options = {}) {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const ctx = prepareCanvas(canvas);
        const { width, height } = canvas.getBoundingClientRect();
        clearChart(ctx, width, height);
        if (!points.length) return drawEmptyChart(ctx, width, height, "No data yet");

        const padding = { top: 18, right: 18, bottom: 42, left: 42 };
        const max = options.max || Math.max(...points.map((point) => point.value), 10);
        const min = 0;
        drawGrid(ctx, width, height, padding);
        const usableW = width - padding.left - padding.right;
        const usableH = height - padding.top - padding.bottom;
        const stepX = points.length > 1 ? usableW / (points.length - 1) : usableW;
        const coords = points.map((point, index) => ({
            x: padding.left + (points.length > 1 ? index * stepX : usableW / 2),
            y: padding.top + usableH - ((point.value - min) / (max - min || 1)) * usableH,
            point
        }));

        ctx.strokeStyle = options.color || "#0b5ed7";
        ctx.lineWidth = 3;
        ctx.beginPath();
        coords.forEach((coord, index) => {
            if (index === 0) ctx.moveTo(coord.x, coord.y);
            else ctx.lineTo(coord.x, coord.y);
        });
        ctx.stroke();

        coords.forEach((coord) => {
            ctx.fillStyle = "#fff";
            ctx.strokeStyle = options.color || "#0b5ed7";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(coord.x, coord.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });
        drawLabels(ctx, points, width, height, padding);
    }

    function drawBarChart(id, points, options = {}) {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const ctx = prepareCanvas(canvas);
        const { width, height } = canvas.getBoundingClientRect();
        clearChart(ctx, width, height);
        if (!points.length) return drawEmptyChart(ctx, width, height, "No data yet");

        const padding = { top: 18, right: 18, bottom: 46, left: 42 };
        const values = points.flatMap((point) => [Number(point.value) || 0, Number(point.secondary) || 0]);
        const max = options.max || Math.max(...values, 10);
        drawGrid(ctx, width, height, padding);
        const usableW = width - padding.left - padding.right;
        const usableH = height - padding.top - padding.bottom;
        const gap = 10;
        const barW = Math.max(12, (usableW - gap * (points.length - 1)) / points.length);

        points.forEach((point, index) => {
            const x = padding.left + index * (barW + gap);
            const valueH = ((Number(point.value) || 0) / max) * usableH;
            ctx.fillStyle = options.color || "#0b5ed7";
            ctx.fillRect(x, padding.top + usableH - valueH, barW, valueH);
            if (point.secondary !== undefined) {
                const markerY = padding.top + usableH - ((Number(point.secondary) || 0) / (options.max || 100)) * usableH;
                ctx.fillStyle = options.secondaryColor || "#6d28d9";
                ctx.beginPath();
                ctx.arc(x + barW / 2, markerY, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        drawLabels(ctx, points, width, height, padding);
    }

    function prepareCanvas(canvas) {
        const ratio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width * ratio));
        canvas.height = Math.max(1, Math.floor(rect.height * ratio));
        const ctx = canvas.getContext("2d");
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        return ctx;
    }

    function clearChart(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
    }

    function drawGrid(ctx, width, height, padding) {
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1;
        const rows = 4;
        for (let i = 0; i <= rows; i += 1) {
            const y = padding.top + ((height - padding.top - padding.bottom) / rows) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }
    }

    function drawLabels(ctx, points, width, height, padding) {
        ctx.fillStyle = "#64748b";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        const maxLabels = Math.min(points.length, 4);
        const every = Math.max(1, Math.ceil(points.length / maxLabels));
        points.forEach((point, index) => {
            if (index % every !== 0 && index !== points.length - 1) return;
            const x = padding.left + (points.length > 1 ? ((width - padding.left - padding.right) / (points.length - 1)) * index : (width - padding.left - padding.right) / 2);
            ctx.fillText(shortLabel(point.label), x, height - 18);
        });
    }

    function drawEmptyChart(ctx, width, height, message) {
        ctx.fillStyle = "#64748b";
        ctx.font = "14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(message, width / 2, height / 2);
    }

    function openScorecard(index) {
        const attempt = state.attempts[index];
        const modal = document.getElementById("scorecardModal");
        if (!attempt || !modal) return;

        setText("scorecardTitle", attempt.examName || "Scorecard");
        setText("scorecardSubtitle", formatDate(attempt.examDate || attempt.timestamp));
        const metrics = document.getElementById("scorecardMetrics");
        if (metrics) {
            metrics.innerHTML = [
                ["Percentile", formatPercent(attempt.percentile)],
                ["Rank", attempt.overallRank ? `#${attempt.overallRank}` : "Pending"],
                ["Raw Marks", formatMarks(attempt.rawMarks ?? attempt.marks)],
                ["Normalised", formatMarks(attempt.normalizedMarks)],
                ["Category Rank", attempt.categoryRank ? `#${attempt.categoryRank}` : "Pending"],
                ["State Rank", attempt.stateRank ? `#${attempt.stateRank}` : "Pending"],
                ["Attempted", formatNumber(attempt.totalAttempted)],
                ["Accuracy", formatPercent(attempt.accuracy)]
            ].map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
        }

        const subjectBox = document.getElementById("scorecardSubjects");
        const subjects = Array.isArray(attempt.subjectAnalysis) && attempt.subjectAnalysis.length
            ? attempt.subjectAnalysis
            : Array.isArray(attempt.subjectData) ? attempt.subjectData : [];
        if (subjectBox) {
            subjectBox.innerHTML = subjects.length ? subjects.map((subject) => `
                <article class="subject-tile">
                    <div class="subject-tile-header">
                        <strong>${escapeHtml(subject.name || "Subject")}</strong>
                        <span>${formatPercent(subject.accuracy)}</span>
                    </div>
                    <div class="subject-meta">
                        <span>Score ${formatMarks(subject.score ?? subject.marks)}</span>
                        <span>Avg ${formatMarks(subject.avgScore)}</span>
                        <span>Correct ${formatNumber(subject.correct)}</span>
                    </div>
                </article>
            `).join("") : renderEmpty("No subject scorecard", "This attempt does not have subject-wise data.");
        }
        modal.classList.remove("hidden");
        document.getElementById("scorecardClose")?.focus();
    }

    function bindModal() {
        const modal = document.getElementById("scorecardModal");
        const close = document.getElementById("scorecardClose");
        if (!modal || !close) return;
        const closeModal = () => modal.classList.add("hidden");
        close.addEventListener("click", closeModal);
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeModal();
        });
    }

    function showDashboardMessage(message, type = "info") {
        const node = document.getElementById("dashboardMessage");
        if (!node) return;
        node.textContent = String(message || "");
        node.className = message ? `dash-message ${type}` : "dash-message hidden";
    }

    function renderEmpty(title, body) {
        return `<div class="dash-empty"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></div>`;
    }

    function setText(id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = String(value);
    }

    function formatNumber(value) {
        const number = Number(value);
        return Number.isFinite(number) ? String(Math.round(number)) : "0";
    }

    function formatMarks(value) {
        const number = Number(value);
        return Number.isFinite(number) ? number.toFixed(2) : "Pending";
    }

    function formatPercent(value) {
        const number = Number(value);
        return Number.isFinite(number) ? `${number.toFixed(2)}%` : "0.00%";
    }

    function formatDate(value) {
        if (!value) return "Date not available";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function shortLabel(value) {
        const text = String(value || "Exam").replace(/\s+/g, " ").trim();
        return text.length > 14 ? `${text.slice(0, 12)}...` : text;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#039;"
        }[char]));
    }
}());
