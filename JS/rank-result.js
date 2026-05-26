(function () {
    "use strict";

    const RESULT_STORAGE_KEY = "gju_rank_predictor_latest_result";
    const SHARE_IDLE_HTML = '<i class="fas fa-share-alt" aria-hidden="true"></i> Share / Copy';
    const COPY_IDLE_HTML = '<i class="fas fa-copy" aria-hidden="true"></i> Copy Summary';

    document.addEventListener("DOMContentLoaded", initRankResult);

    function initRankResult() {
        const snapshot = readLatestResult();
        if (!snapshot) {
            showEmptyState();
            return;
        }
        renderResult(snapshot);
        bindShareButtons(snapshot);
    }

    function readLatestResult() {
        try {
            const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== "object") return null;
            if (!parsed.resultData && !parsed.payload) return null;
            return parsed;
        } catch {
            return null;
        }
    }

    function showEmptyState() {
        const empty = getById("emptyResultState");
        const dashboard = getById("resultDashboard");
        if (empty) empty.hidden = false;
        if (dashboard) dashboard.hidden = true;
    }

    function renderResult(snapshot) {
        const empty = getById("emptyResultState");
        const dashboard = getById("resultDashboard");
        if (empty) empty.hidden = true;
        if (dashboard) dashboard.hidden = false;

        const data = snapshot.resultData || {};
        const payload = snapshot.payload || {};
        const examName = firstValue(payload.examName, snapshot.examName, data.examName, snapshot.exam?.examName, "Rank Prediction Result");
        const rollNumber = firstValue(payload.rollNumber, data.rollNumber, "Not available");
        const rawMarks = firstValue(data.rawMarks, data.marks, payload.rawMarks, null);
        const normalizedMarks = getNormalizedMarks(snapshot, rawMarks);
        const totalSubmissions = firstValue(data.totalSubmissions, data.total, data.submissions, payload.totalSubmissions, null);
        const accuracyIndicator = firstValue(data.accuracyIndicator, getAccuracyIndicator(totalSubmissions), "Pending");
        const lastUpdated = firstValue(data.lastUpdated, snapshot.savedAt, null);
        const rankSets = getRankSets(data);
        toggleShiftMetrics(getHasShifts(snapshot, data));

        setText("rankResultTitle", examName);
        setText("resultExamName", examName);
        setText("resultRollNumber", rollNumber);
        renderRankSet("raw", rankSets.raw);
        renderRankSet("normalized", rankSets.normalized);
        setText("resultRawMarks", formatMarks(rawMarks));
        setText("resultNormalizedMarks", formatMarks(normalizedMarks));
        setText("resultPercentile", formatPercentile(data.percentile));
        setText("resultAverageMarks", formatMarks(data.averageMarks));
        setText("resultAverageShiftMarks", formatMarks(data.averageShiftMarks));
        setText("resultCategoryAverageMarks", formatMarks(data.categoryAverageMarks));
        setText("resultTotalSubmissions", formatCount(totalSubmissions));
        setText("resultAccuracyIndicator", accuracyIndicator);
        setText("resultLastUpdated", formatDateTime(lastUpdated));

        renderSubjectScorecard(data.subjectAnalysis, payload.subjectData, data.subjectData);
        setText("shareResultText", buildShareText(snapshot, examName, normalizedMarks));
    }

    function getHasShifts(snapshot, data) {
        if (typeof data.hasShifts === "boolean") return data.hasShifts;
        if (snapshot.exam && typeof snapshot.exam.hasShifts === "boolean") return snapshot.exam.hasShifts;
        return Boolean(snapshot.payload && snapshot.payload.shift);
    }

    function toggleShiftMetrics(hasShifts) {
        document.querySelectorAll("[data-shift-metric]").forEach((card) => {
            card.hidden = !hasShifts;
        });
    }

    function getRankSets(data) {
        const activeRanks = {
            overallRank: data.overallRank,
            categoryRank: data.categoryRank,
            stateRank: data.stateRank,
            shiftRank: data.shiftRank,
            genderRank: data.genderRank,
            genderCategoryRank: data.genderCategoryRank,
            genderStateRank: data.genderStateRank,
            genderShiftRank: data.genderShiftRank
        };
        const activeBasis = normalizeRankBasis(data.rankBasis);
        const rawRanks = pickRankSet(
            data.rawRanks,
            data.rawRank,
            data.rawMarksRanks,
            data.ranks?.raw,
            getPrefixedRankSet(data, "raw"),
            activeBasis === "raw" ? activeRanks : null
        );
        const normalizedRanks = pickRankSet(
            data.normalizedRanks,
            data.normalisedRanks,
            data.normalizedRank,
            data.normalisedRank,
            data.normalizedMarksRanks,
            data.normalisedMarksRanks,
            data.ranks?.normalized,
            data.ranks?.normalised,
            getPrefixedRankSet(data, "normalized"),
            getPrefixedRankSet(data, "normalised"),
            activeBasis === "normalized" ? activeRanks : null
        );
        return {
            raw: rawRanks,
            normalized: normalizedRanks
        };
    }

    function normalizeRankBasis(value) {
        const text = String(value || "").trim().toLowerCase();
        if (text === "normalised" || text === "normalized") return "normalized";
        if (text === "raw") return "raw";
        return "";
    }

    function pickRankSet(...candidates) {
        return candidates.find((candidate) => hasAnyRankValue(candidate)) || null;
    }

    function hasAnyRankValue(candidate) {
        if (!candidate || typeof candidate !== "object") return false;
        return [
            "overallRank",
            "categoryRank",
            "stateRank",
            "shiftRank",
            "genderRank",
            "genderCategoryRank",
            "genderStateRank",
            "genderShiftRank"
        ].some((key) => !isMissing(candidate[key]));
    }

    function getPrefixedRankSet(data, prefix) {
        if (!data || typeof data !== "object") return null;
        const titlePrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        return {
            overallRank: data[`${prefix}OverallRank`] ?? data[`${titlePrefix}OverallRank`],
            categoryRank: data[`${prefix}CategoryRank`] ?? data[`${titlePrefix}CategoryRank`],
            stateRank: data[`${prefix}StateRank`] ?? data[`${titlePrefix}StateRank`],
            shiftRank: data[`${prefix}ShiftRank`] ?? data[`${titlePrefix}ShiftRank`],
            genderRank: data[`${prefix}GenderRank`] ?? data[`${titlePrefix}GenderRank`],
            genderCategoryRank: data[`${prefix}GenderCategoryRank`] ?? data[`${titlePrefix}GenderCategoryRank`],
            genderStateRank: data[`${prefix}GenderStateRank`] ?? data[`${titlePrefix}GenderStateRank`],
            genderShiftRank: data[`${prefix}GenderShiftRank`] ?? data[`${titlePrefix}GenderShiftRank`]
        };
    }

    function renderRankSet(prefix, ranks) {
        const getRank = (key) => ranks ? formatRank(ranks[key]) : "Not available";
        setText(`${prefix}OverallRank`, getRank("overallRank"));
        setText(`${prefix}CategoryRank`, getRank("categoryRank"));
        setText(`${prefix}StateRank`, getRank("stateRank"));
        setText(`${prefix}ShiftRank`, getRank("shiftRank"));
        setText(`${prefix}GenderRank`, getRank("genderRank"));
        setText(`${prefix}GenderCategoryRank`, getRank("genderCategoryRank"));
        setText(`${prefix}GenderStateRank`, getRank("genderStateRank"));
        setText(`${prefix}GenderShiftRank`, getRank("genderShiftRank"));
    }

    function getNormalizedMarks(snapshot, rawMarksValue) {
        const data = snapshot.resultData || {};
        const payload = snapshot.payload || {};
        const explicit = firstValue(
            data.normalizedMarks,
            data.normalisedMarks,
            data.normalizedScore,
            data.normalisedScore,
            snapshot.derived?.normalizedMarks,
            null
        );
        if (!isMissing(explicit)) return explicit;

        const rawMarks = toNumber(rawMarksValue);
        if (!Number.isFinite(rawMarks)) return null;

        const exam = snapshot.exam || {};
        if (!exam.normalization) return rawMarks;

        const allShiftAverage = toNumber(data.averageMarks);
        const candidateShiftAverage = toNumber(data.averageShiftMarks);
        const shiftAdjustment = Number.isFinite(allShiftAverage) && Number.isFinite(candidateShiftAverage)
            ? allShiftAverage - candidateShiftAverage
            : 0;
        const normalized = rawMarks + shiftAdjustment;
        const maxMarks = toNumber(exam.totalQuestions) * toNumber(exam.marksPerCorrect);
        if (maxMarks > 0) return round2(Math.min(Math.max(normalized, 0), maxMarks));
        return round2(Math.max(normalized, 0));
    }

    function renderSubjectScorecard(subjectAnalysis, payloadSubjectData, resultSubjectData) {
        const body = getById("resultSubjectBody");
        if (!body) return;

        const analysisRows = Array.isArray(subjectAnalysis) ? subjectAnalysis : [];
        const payloadRows = Array.isArray(payloadSubjectData) && payloadSubjectData.length
            ? payloadSubjectData
            : Array.isArray(resultSubjectData) ? resultSubjectData : [];
        const rows = analysisRows.length
            ? analysisRows.map((subject) => mergeSubjectRow(subject, payloadRows))
            : payloadRows.map((subject) => ({
                name: subject.name,
                score: subject.marks,
                attempted: subject.attempted,
                correct: subject.correct,
                wrong: subject.wrong,
                avgScore: null,
                accuracy: getSubjectAccuracy(subject)
            }));
        const showAttemptColumns = rows.some((subject) => (
            !isMissing(subject.attempted) || !isMissing(subject.correct) || !isMissing(subject.wrong)
        ));

        if (!rows.length) {
            setSubjectTableHeaders(showAttemptColumns);
            body.innerHTML = '<tr><td colspan="4">Not available</td></tr>';
            return;
        }

        setSubjectTableHeaders(showAttemptColumns);
        body.innerHTML = rows.map((subject) => renderSubjectRow(subject, showAttemptColumns)).join("");
    }

    function setSubjectTableHeaders(showAttemptColumns) {
        const tableHead = getById("resultSubjectBody")?.closest("table")?.querySelector("thead");
        if (!tableHead) return;
        const attemptHeaders = showAttemptColumns
            ? "<th>Attempted</th><th>Correct</th><th>Wrong</th>"
            : "";
        tableHead.innerHTML = `
            <tr>
                <th>Subject</th>
                <th>Your Score</th>
                ${attemptHeaders}
                <th>Avg Score</th>
                <th>Accuracy</th>
            </tr>
        `;
        tableHead.closest("table")?.classList.toggle("has-attempt-columns", showAttemptColumns);
    }

    function renderSubjectRow(subject, showAttemptColumns) {
        const attemptCells = showAttemptColumns
            ? `
                <td>${escapeHtml(formatPlain(firstValue(subject.attempted, null)))}</td>
                <td>${escapeHtml(formatPlain(firstValue(subject.correct, null)))}</td>
                <td>${escapeHtml(formatPlain(firstValue(subject.wrong, null)))}</td>
            `
            : "";
        return `
            <tr>
                <td>${escapeHtml(firstValue(subject.name, "Subject"))}</td>
                <td>${escapeHtml(formatMarks(firstValue(subject.score, subject.marks, null)))}</td>
                ${attemptCells}
                <td>${escapeHtml(formatMarks(subject.avgScore))}</td>
                <td>${escapeHtml(formatPercentile(subject.accuracy))}</td>
            </tr>
        `;
    }

    function mergeSubjectRow(subject, payloadRows) {
        const match = payloadRows.find((item) => String(item?.name || "").toLowerCase() === String(subject?.name || "").toLowerCase()) || {};
        return {
            name: firstValue(subject.name, match.name, "Subject"),
            score: firstValue(subject.score, subject.marks, match.marks, null),
            attempted: firstValue(subject.attempted, subject.totalAttempted, match.attempted, match.totalAttempted, null),
            correct: firstValue(subject.correct, subject.rightAnswers, match.correct, match.rightAnswers, null),
            wrong: firstValue(subject.wrong, subject.wrongAnswers, match.wrong, match.wrongAnswers, null),
            avgScore: firstValue(subject.avgScore, subject.averageScore, null),
            accuracy: firstValue(subject.accuracy, getSubjectAccuracy(match), null)
        };
    }

    function getSubjectAccuracy(subject) {
        const correct = toNumber(subject?.correct);
        const attempted = toNumber(subject?.attempted);
        if (!Number.isFinite(correct) || !Number.isFinite(attempted) || attempted <= 0) return null;
        return round2((correct / attempted) * 100);
    }

    function bindShareButtons(snapshot) {
        const shareButton = getById("shareResultBtn");
        const copyButton = getById("copyResultBtn");
        const text = getById("shareResultText")?.textContent || buildShareText(snapshot);
        shareButton?.addEventListener("click", () => shareOrCopy(text, shareButton, SHARE_IDLE_HTML));
        copyButton?.addEventListener("click", () => shareOrCopy(text, copyButton, COPY_IDLE_HTML));
    }

    async function shareOrCopy(text, button, idleHtml) {
        const shareText = `${text} ${window.location.href}`.trim();
        try {
            if (navigator.share && button?.id === "shareResultBtn") {
                await navigator.share({
                    title: "GovJobUpdates Rank Prediction",
                    text,
                    url: window.location.href
                });
                return;
            }
            await copyText(shareText);
            if (button) {
                button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copied';
                window.setTimeout(() => {
                    button.innerHTML = idleHtml;
                }, 1400);
            }
        } catch {
            if (button) button.innerHTML = idleHtml;
        }
    }

    async function copyText(text) {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }

    function buildShareText(snapshot, examName = "", normalizedMarks = null) {
        const data = snapshot.resultData || {};
        const payload = snapshot.payload || {};
        const name = firstValue(examName, payload.examName, snapshot.examName, "my exam");
        const rank = formatRank(data.overallRank);
        const percentile = formatPercentile(data.percentile);
        const marks = formatMarks(firstValue(normalizedMarks, data.normalizedMarks, data.rawMarks, data.marks, payload.rawMarks, null));
        const rankText = rank === "Pending" ? "rank is pending" : `rank ${rank}`;
        const percentileText = percentile === "Pending" ? "" : ` | Percentile ${percentile}`;
        const marksText = marks === "Pending" ? "" : ` | Marks ${marks}`;
        return `My ${name} ${rankText}${percentileText}${marksText} on GovJobUpdates.`;
    }

    function getAccuracyIndicator(totalSubmissions) {
        const total = toNumber(totalSubmissions);
        if (!Number.isFinite(total)) return "Pending";
        if (total >= 1000) return "High";
        if (total >= 100) return "Medium";
        return "Low";
    }

    function formatRank(value) {
        if (isMissing(value)) return "Pending";
        const text = String(value).trim();
        if (!text || text === "0") return "Pending";
        return text.startsWith("#") ? text : `#${text}`;
    }

    function formatPercentile(value) {
        if (isMissing(value)) return "Pending";
        const text = String(value).trim();
        if (text.endsWith("%")) return text;
        const number = Number(text);
        return Number.isFinite(number) ? `${number.toFixed(2)}%` : "Pending";
    }

    function formatMarks(value) {
        if (isMissing(value)) return "Pending";
        const number = Number(value);
        return Number.isFinite(number) ? number.toFixed(2) : "Pending";
    }

    function formatCount(value) {
        if (isMissing(value)) return "Pending";
        const number = Number(value);
        return Number.isFinite(number) ? number.toLocaleString("en-IN") : "Pending";
    }

    function formatPlain(value) {
        if (isMissing(value)) return "Not available";
        return String(value);
    }

    function formatDateTime(value) {
        if (isMissing(value)) return "Pending";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    }

    function firstValue(...values) {
        return values.find((value) => !isMissing(value));
    }

    function isMissing(value) {
        return value === undefined || value === null || String(value).trim() === "";
    }

    function toNumber(value) {
        if (isMissing(value)) return NaN;
        const number = Number(value);
        return Number.isFinite(number) ? number : NaN;
    }

    function round2(value) {
        return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function setText(id, value) {
        const node = getById(id);
        if (node) node.textContent = String(value);
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
    }
}());
