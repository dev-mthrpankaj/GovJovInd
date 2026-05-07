(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", initScorecard);

    async function initScorecard() {
        const auth = window.CandidateAuth;
        if (!auth) return;
        const session = auth.requireAuth();
        if (!session) return;
        document.getElementById("printScorecard")?.addEventListener("click", () => window.print());

        try {
            showMessage("Loading scorecard...");
            const attempt = await loadAttempt(auth, session);
            if (!attempt) {
                showMessage("Scorecard not found. Open an attempt from your dashboard.", "error");
                return;
            }
            renderScorecard(attempt);
            showMessage("");
        } catch {
            showMessage("Server connection failed. Please try again.", "error");
        } finally {
            document.getElementById("scorecardPage")?.setAttribute("aria-busy", "false");
        }
    }

    async function loadAttempt(auth, session) {
        const index = getAttemptIndex();
        const cached = readCachedAttempt(session, index);
        if (cached) return cached;

        const result = await auth.callApi({
            action: "getCandidateDashboard",
            userId: session.userId,
            mobile: session.mobile,
            email: session.email
        });
        if (!result.success || !Array.isArray(result.attempts)) return null;
        return result.attempts[index] || null;
    }

    function getAttemptIndex() {
        const params = new URLSearchParams(window.location.search);
        const index = Number(params.get("attempt"));
        return Number.isFinite(index) && index >= 0 ? Math.floor(index) : 0;
    }

    function readCachedAttempt(session, index) {
        try {
            const saved = JSON.parse(sessionStorage.getItem("gju:selected-scorecard") || "null");
            if (!saved || saved.userId !== session.userId || Number(saved.index) !== index) return null;
            return saved.attempt || null;
        } catch {
            return null;
        }
    }

    function renderScorecard(attempt) {
        setText("scorecardTitle", attempt.examName || "Scorecard");
        setText("scorecardSubtitle", `${formatDate(attempt.examDate || attempt.timestamp)} | ${attempt.mode || "Exam"} | ${attempt.category || "Category"}`);
        setText("scoreBreakdownMeta", `${formatNumber(attempt.totalAttempted)} attempted of ${formatNumber(attempt.totalQuestions)} questions`);

        const metrics = document.getElementById("scorecardMetrics");
        if (metrics) {
            metrics.innerHTML = [
                ["Percentile", formatPercent(attempt.percentile), "Candidate standing"],
                ["Overall Rank", attempt.overallRank ? `#${attempt.overallRank}` : "Pending", "Among submissions"],
                ["Raw Marks", formatMarks(attempt.rawMarks ?? attempt.marks), "Before normalization"],
                ["Accuracy", formatPercent(attempt.accuracy), "Correct/attempted"],
                ["Category Rank", attempt.categoryRank ? `#${attempt.categoryRank}` : "Pending", attempt.category || "Category"],
                ["State Rank", attempt.stateRank ? `#${attempt.stateRank}` : "Pending", attempt.state || "State"]
            ].map(([label, value, hint]) => `
                <article class="metric-card">
                    <span>${escapeHtml(label)}</span>
                    <strong>${escapeHtml(value)}</strong>
                    <small>${escapeHtml(hint)}</small>
                </article>
            `).join("");
        }

        const breakdown = document.getElementById("scoreBreakdown");
        if (breakdown) {
            breakdown.innerHTML = [
                ["Right Answers", formatNumber(attempt.rightAnswers)],
                ["Wrong Answers", formatNumber(attempt.wrongAnswers)],
                ["Unattempted", formatNumber(attempt.unattempted)],
                ["Normalized Marks", formatMarks(attempt.normalizedMarks)],
                ["Shift Rank", attempt.shiftRank ? `#${attempt.shiftRank}` : "Pending"],
                ["Total Submissions", formatNumber(attempt.totalSubmissions)]
            ].map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
        }

        renderSubjects(attempt);
        renderInsights(attempt);
    }

    function renderSubjects(attempt) {
        const box = document.getElementById("scorecardSubjects");
        if (!box) return;
        const subjects = Array.isArray(attempt.subjectAnalysis) && attempt.subjectAnalysis.length
            ? attempt.subjectAnalysis
            : Array.isArray(attempt.subjectData) ? attempt.subjectData : [];
        if (!subjects.length) {
            box.innerHTML = renderEmpty("No subject data", "This attempt does not include subject-wise marks.");
            return;
        }
        box.innerHTML = subjects.map((subject) => {
            const accuracy = clamp(Number(subject.accuracy) || 0, 0, 100);
            return `
                <article class="subject-tile">
                    <div class="subject-tile-header">
                        <strong>${escapeHtml(subject.name || "Subject")}</strong>
                        <span>${formatPercent(accuracy)}</span>
                    </div>
                    <div class="subject-progress" aria-hidden="true"><span style="width:${accuracy}%"></span></div>
                    <div class="subject-meta">
                        <span>Score ${formatMarks(subject.score ?? subject.marks)}</span>
                        <span>Avg ${formatMarks(subject.avgScore)}</span>
                        <span>Correct ${formatNumber(subject.correct)}</span>
                    </div>
                </article>
            `;
        }).join("");
    }

    function renderInsights(attempt) {
        const box = document.getElementById("scoreInsights");
        if (!box) return;
        const subjects = Array.isArray(attempt.subjectAnalysis) && attempt.subjectAnalysis.length
            ? attempt.subjectAnalysis.slice()
            : Array.isArray(attempt.subjectData) ? attempt.subjectData.slice() : [];
        subjects.sort((a, b) => (Number(a.accuracy) || 0) - (Number(b.accuracy) || 0));
        const weak = subjects[0];
        box.innerHTML = `
            <div class="dash-empty">
                <strong>${escapeHtml(weak ? `Practice ${weak.name}` : "Submit another attempt")}</strong>
                <span>${escapeHtml(weak ? "This was your lowest accuracy subject in this scorecard." : "More attempts will make the recommendations sharper.")}</span>
                <a class="smart-link" href="quiz.html"><i class="fas fa-dumbbell" aria-hidden="true"></i> Start practice</a>
            </div>
        `;
    }

    function showMessage(message, type = "info") {
        const node = document.getElementById("scorecardMessage");
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

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
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
