(function () {
    "use strict";

    const RESULT_STORAGE_KEY = "gju_rank_predictor_latest_result";
    const SHARE_IDLE_HTML = '<i class="fas fa-share-alt" aria-hidden="true"></i> Share / Copy';
    const COPY_IDLE_HTML = '<i class="fas fa-copy" aria-hidden="true"></i> Copy Summary';
    const DOWNLOAD_IDLE_HTML = '<i class="fas fa-download" aria-hidden="true"></i> Download Scorecard';
    const IMAGE_SHARE_IDLE_HTML = '<i class="fas fa-image" aria-hidden="true"></i> Share Scorecard';

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

        renderQualificationPanel(data);
        renderSubjectScorecard(data.subjectAnalysis, payload.subjectData, data.subjectData);
        renderResultAdSlot();
        setText("shareResultText", buildShareText(snapshot, examName, normalizedMarks));
    }

    function renderQualificationPanel(data) {
        const panel = getById("qualificationPanel");
        const statusNode = getById("qualificationStatus");
        const messageNode = getById("qualificationMessage");
        const failedList = getById("failedSubjectList");
        if (!panel || !statusNode || !messageNode || !failedList) return;

        const failedSubjects = Array.isArray(data.failedSubjects) ? data.failedSubjects : [];
        const hasQualificationData = typeof data.isQualified === "boolean" || data.qualificationStatus || failedSubjects.length;
        if (!hasQualificationData) {
            panel.hidden = true;
            return;
        }

        const failed = data.isQualified === false || String(data.qualificationStatus || "").toLowerCase() === "not qualified";
        panel.hidden = false;
        panel.classList.toggle("is-failed", failed);
        setText("qualificationStatus", failed ? "Not eligible for merit rank" : data.qualificationStatus || "Qualified");
        setText("qualificationMessage", data.qualificationMessage || (failed ? "Qualifying criteria was not met." : "Qualifying criteria met."));
        failedList.innerHTML = failedSubjects.map((subject) => (
            `<li>${escapeHtml(formatFailedSubject(subject))}</li>`
        )).join("");
    }

    function renderResultAdSlot() {
        const host = getById("rankResultAdHost");
        const ads = window.GovJobAds;
        if (!host || !ads || ads.isBlockedPage() || host.querySelector(".ad-slot")) return;

        host.appendChild(ads.createSlot("inline", "rank-result-valid"));
        host.hidden = false;
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
        const showPassingColumns = rows.some((subject) => subject.passingCriteria || subject.passingStatus);
        const showSubjectRankColumn = rows.some((subject) => !isMissing(subject.subjectRank));

        if (!rows.length) {
            setSubjectTableHeaders(showAttemptColumns, showPassingColumns, showSubjectRankColumn);
            body.innerHTML = '<tr><td colspan="4">Not available</td></tr>';
            return;
        }

        setSubjectTableHeaders(showAttemptColumns, showPassingColumns, showSubjectRankColumn);
        body.innerHTML = rows.map((subject) => renderSubjectRow(subject, showAttemptColumns, showPassingColumns, showSubjectRankColumn)).join("");
    }

    function setSubjectTableHeaders(showAttemptColumns, showPassingColumns, showSubjectRankColumn) {
        const tableHead = getById("resultSubjectBody")?.closest("table")?.querySelector("thead");
        if (!tableHead) return;
        const attemptHeaders = showAttemptColumns
            ? "<th>Attempted</th><th>Correct</th><th>Wrong</th>"
            : "";
        const subjectRankHeader = showSubjectRankColumn
            ? "<th>Subject Rank</th>"
            : "";
        const passingHeaders = showPassingColumns
            ? "<th>Passing Criteria</th><th>Status</th>"
            : "";
        tableHead.innerHTML = `
            <tr>
                <th>Subject</th>
                <th>Your Score</th>
                ${subjectRankHeader}
                ${attemptHeaders}
                ${passingHeaders}
                <th>Avg Score</th>
                <th>Accuracy</th>
            </tr>
        `;
        tableHead.closest("table")?.classList.toggle("has-attempt-columns", showAttemptColumns);
        tableHead.closest("table")?.classList.toggle("has-passing-columns", showPassingColumns);
        tableHead.closest("table")?.classList.toggle("has-subject-rank-column", showSubjectRankColumn);
    }

    function renderSubjectRow(subject, showAttemptColumns, showPassingColumns, showSubjectRankColumn) {
        const passingStatus = firstValue(subject.passingStatus, getPassingStatus(subject), null);
        const subjectRankCell = showSubjectRankColumn
            ? `<td>${escapeHtml(formatSubjectRank(subject.subjectRank, subject.subjectTotalSubmissions))}</td>`
            : "";
        const attemptCells = showAttemptColumns
            ? `
                <td>${escapeHtml(formatPlain(firstValue(subject.attempted, null)))}</td>
                <td>${escapeHtml(formatPlain(firstValue(subject.correct, null)))}</td>
                <td>${escapeHtml(formatPlain(firstValue(subject.wrong, null)))}</td>
            `
            : "";
        const passingCells = showPassingColumns
            ? `
                <td>${escapeHtml(formatPassingCriteria(subject.passingCriteria))}</td>
                <td>${escapeHtml(formatPlain(passingStatus))}</td>
            `
            : "";
        return `
            <tr class="${passingStatus === "Fail" ? "is-failed-subject" : ""}">
                <td>${escapeHtml(firstValue(subject.name, "Subject"))}</td>
                <td>${escapeHtml(formatMarks(firstValue(subject.score, subject.marks, null)))}</td>
                ${subjectRankCell}
                ${attemptCells}
                ${passingCells}
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
            subjectRank: firstValue(subject.subjectRank, match.subjectRank, null),
            subjectTotalSubmissions: firstValue(subject.subjectTotalSubmissions, match.subjectTotalSubmissions, null),
            passingCriteria: firstValue(subject.passingCriteria, match.passingCriteria, null),
            passingStatus: firstValue(subject.passingStatus, match.passingStatus, null),
            avgScore: firstValue(subject.avgScore, subject.averageScore, null),
            accuracy: firstValue(subject.accuracy, getSubjectAccuracy(match), null)
        };
    }

    function formatPassingCriteria(criteria) {
        if (!criteria || typeof criteria !== "object") return "Not available";
        const parts = [];
        if (!isMissing(criteria.minMarks)) parts.push(`Min ${criteria.minMarks} marks`);
        if (!isMissing(criteria.minPercentage)) parts.push(`Min ${criteria.minPercentage}%`);
        if (!isMissing(criteria.minCorrect)) parts.push(`Min ${criteria.minCorrect} correct`);
        const ruleContext = criteria.ruleBasis && criteria.ruleCategory ? ` (${criteria.ruleBasis}: ${criteria.ruleCategory})` : "";
        return (parts.join(", ") || "Not available") + ruleContext;
    }

    function formatFailedSubject(subject) {
        const criteria = formatPassingCriteria(subject.passingCriteria);
        const score = formatMarks(firstValue(subject.score, subject.marks, null));
        const percentage = isMissing(subject.obtainedPercentage) ? "" : `, ${formatPercentile(subject.obtainedPercentage)}`;
        const message = subject.passingMessage ? ` - ${subject.passingMessage}` : "";
        return `${firstValue(subject.name, "Subject")}: ${score}${percentage}. Required: ${criteria}${message}`;
    }

    function formatSubjectRank(rank, total) {
        if (isMissing(rank)) return "Not available";
        const rankText = formatRank(rank);
        const totalNumber = toNumber(total);
        return Number.isFinite(totalNumber) && totalNumber > 0 ? `${rankText} of ${totalNumber}` : rankText;
    }

    function getPassingStatus(subject) {
        const criteria = subject?.passingCriteria;
        if (!criteria) return null;
        const score = toNumber(firstValue(subject.score, subject.marks, null));
        const correct = toNumber(subject.correct);
        const percentage = toNumber(subject.obtainedPercentage);
        if (Number.isFinite(toNumber(criteria.minMarks)) && Number.isFinite(score) && score < toNumber(criteria.minMarks)) return "Fail";
        if (Number.isFinite(toNumber(criteria.minCorrect)) && Number.isFinite(correct) && correct < toNumber(criteria.minCorrect)) return "Fail";
        if (Number.isFinite(toNumber(criteria.minPercentage)) && Number.isFinite(percentage) && percentage < toNumber(criteria.minPercentage)) return "Fail";
        if (!isMissing(criteria.minMarks) || !isMissing(criteria.minCorrect) || !isMissing(criteria.minPercentage)) return "Pass";
        return null;
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
        const downloadButton = getById("downloadScorecardBtn");
        const imageShareButton = getById("shareScorecardBtn");
        const text = getById("shareResultText")?.textContent || buildShareText(snapshot);
        shareButton?.addEventListener("click", () => shareOrCopy(text, shareButton, SHARE_IDLE_HTML));
        copyButton?.addEventListener("click", () => shareOrCopy(text, copyButton, COPY_IDLE_HTML));
        downloadButton?.addEventListener("click", () => downloadScorecardImage(snapshot, downloadButton));
        imageShareButton?.addEventListener("click", () => shareScorecardImage(snapshot, imageShareButton));
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
            setButtonFeedback(button, '<i class="fas fa-check" aria-hidden="true"></i> Copied', idleHtml);
        } catch {
            if (button) button.innerHTML = idleHtml;
        }
    }

    async function downloadScorecardImage(snapshot, button) {
        try {
            setButtonFeedback(button, '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Preparing', DOWNLOAD_IDLE_HTML, 0);
            const blob = await createScorecardBlob(snapshot);
            downloadBlob(blob, getScorecardFileName(snapshot));
            setButtonFeedback(button, '<i class="fas fa-check" aria-hidden="true"></i> Downloaded', DOWNLOAD_IDLE_HTML);
        } catch {
            setButtonFeedback(button, '<i class="fas fa-exclamation-circle" aria-hidden="true"></i> Try Again', DOWNLOAD_IDLE_HTML);
        }
    }

    async function shareScorecardImage(snapshot, button) {
        try {
            setButtonFeedback(button, '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Preparing', IMAGE_SHARE_IDLE_HTML, 0);
            const blob = await createScorecardBlob(snapshot);
            const file = new File([blob], getScorecardFileName(snapshot), { type: "image/png" });
            const shareData = {
                title: "GovJobUpdates Rank Prediction",
                text: buildShareText(snapshot),
                files: [file]
            };

            if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
                await navigator.share(shareData);
                setButtonFeedback(button, '<i class="fas fa-check" aria-hidden="true"></i> Shared', IMAGE_SHARE_IDLE_HTML);
                return;
            }

            downloadBlob(blob, file.name);
            setButtonFeedback(button, '<i class="fas fa-download" aria-hidden="true"></i> Downloaded', IMAGE_SHARE_IDLE_HTML);
        } catch {
            setButtonFeedback(button, '<i class="fas fa-exclamation-circle" aria-hidden="true"></i> Try Again', IMAGE_SHARE_IDLE_HTML);
        }
    }

    function createScorecardBlob(snapshot) {
        const canvas = buildScorecardCanvas(snapshot);
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Scorecard image could not be created."));
            }, "image/png", 0.94);
        });
    }

    function buildScorecardCanvas(snapshot) {
        const model = buildScorecardModel(snapshot);
        const width = 1200;
        const subjectsHeight = model.subjects.length ? 92 + (model.subjects.length * 74) : 0;
        const height = 1180 + subjectsHeight;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = "#f4f7fb";
        ctx.fillRect(0, 0, width, height);
        fillRoundRect(ctx, 64, 64, width - 128, height - 128, 34, "#ffffff");
        fillRoundRect(ctx, 64, 64, width - 128, 224, 34, "#0b5ed7");
        fillRoundRect(ctx, 64, 222, width - 128, 66, 0, "#0b5ed7");

        drawText(ctx, "GovJobUpdates", 108, 126, 34, 900, "#ffffff");
        drawText(ctx, "Rank Predictor Scorecard", 108, 180, 52, 900, "#ffffff");
        drawWrappedText(ctx, model.examName, 108, 244, 980, 31, 1.25, 800, "#eaf2ff");

        drawText(ctx, "Overall Rank", 108, 374, 30, 900, "#5b6575");
        drawText(ctx, model.overallRank, 108, 472, 94, 900, "#0b5ed7");
        drawText(ctx, "Percentile", 680, 374, 30, 900, "#5b6575");
        drawText(ctx, model.percentile, 680, 456, 70, 900, "#0f766e");

        drawMetricPill(ctx, 108, 548, "Roll Number", model.rollNumber);
        drawMetricPill(ctx, 420, 548, "Marks", model.marks);
        drawMetricPill(ctx, 732, 548, "Submissions", model.totalSubmissions);

        const metricY = 704;
        drawMetricCard(ctx, 108, metricY, "Category Rank", model.categoryRank);
        drawMetricCard(ctx, 420, metricY, "State Rank", model.stateRank);
        drawMetricCard(ctx, 732, metricY, "Shift Rank", model.shiftRank);

        let y = 912;
        drawText(ctx, "Subject Scorecard", 108, y, 34, 900, "#0f172a");
        y += 36;
        if (model.subjects.length) {
            model.subjects.forEach((subject) => {
                fillRoundRect(ctx, 108, y, 984, 58, 8, "#f8fafc");
                drawText(ctx, subject.name, 132, y + 37, 24, 900, "#0f172a");
                drawText(ctx, subject.score, 560, y + 37, 24, 900, "#0b5ed7");
                drawText(ctx, subject.accuracy, 818, y + 37, 24, 900, "#0f766e");
                y += 74;
            });
        } else {
            drawText(ctx, "Subject data not available", 108, y + 42, 28, 800, "#5b6575");
            y += 92;
        }

        const footerY = height - 158;
        ctx.strokeStyle = "#dbe3ee";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(108, footerY - 48);
        ctx.lineTo(1092, footerY - 48);
        ctx.stroke();
        drawWrappedText(ctx, "Generated from GovJobUpdates Rank Predictor. This is an estimated rank based on submitted candidate data.", 108, footerY, 980, 24, 1.4, 800, "#5b6575");
        drawText(ctx, getPublicSiteOrigin(), 108, footerY + 84, 24, 900, "#0b5ed7");

        return canvas;
    }

    function buildScorecardModel(snapshot) {
        const data = snapshot.resultData || {};
        const payload = snapshot.payload || {};
        const examName = firstValue(payload.examName, snapshot.examName, data.examName, snapshot.exam?.examName, "Rank Prediction Result");
        const rawMarks = firstValue(data.rawMarks, data.marks, payload.rawMarks, null);
        const normalizedMarks = getNormalizedMarks(snapshot, rawMarks);
        const rankSets = getRankSets(data);
        const activeRanks = normalizeRankBasis(data.rankBasis) === "normalized" && rankSets.normalized ? rankSets.normalized : rankSets.raw || rankSets.normalized || {};
        const subjects = getScorecardSubjects(data.subjectAnalysis, payload.subjectData, data.subjectData).slice(0, 7);

        return {
            examName,
            rollNumber: formatPlain(firstValue(payload.rollNumber, data.rollNumber, "Not available")),
            overallRank: formatRank(activeRanks.overallRank),
            categoryRank: formatRank(activeRanks.categoryRank),
            stateRank: formatRank(activeRanks.stateRank),
            shiftRank: getHasShifts(snapshot, data) ? formatRank(activeRanks.shiftRank) : "Not applicable",
            marks: formatMarks(firstValue(normalizedMarks, rawMarks, null)),
            percentile: formatPercentile(data.percentile),
            totalSubmissions: formatCount(firstValue(data.totalSubmissions, data.total, data.submissions, payload.totalSubmissions, null)),
            subjects
        };
    }

    function getScorecardSubjects(subjectAnalysis, payloadSubjectData, resultSubjectData) {
        const analysisRows = Array.isArray(subjectAnalysis) ? subjectAnalysis : [];
        const payloadRows = Array.isArray(payloadSubjectData) && payloadSubjectData.length
            ? payloadSubjectData
            : Array.isArray(resultSubjectData) ? resultSubjectData : [];
        const rows = analysisRows.length
            ? analysisRows.map((subject) => mergeSubjectRow(subject, payloadRows))
            : payloadRows.map((subject) => ({
                name: subject.name,
                score: subject.marks,
                accuracy: getSubjectAccuracy(subject)
            }));
        return rows.map((subject) => ({
            name: firstValue(subject.name, "Subject"),
            score: `Score ${formatMarks(firstValue(subject.score, subject.marks, null))}`,
            accuracy: `Accuracy ${formatPercentile(subject.accuracy)}`
        }));
    }

    function drawMetricPill(ctx, x, y, label, value) {
        fillRoundRect(ctx, x, y, 276, 92, 16, "#eff6ff");
        drawText(ctx, label, x + 24, y + 34, 20, 900, "#5b6575");
        drawText(ctx, value, x + 24, y + 70, 30, 900, "#0f172a");
    }

    function drawMetricCard(ctx, x, y, label, value) {
        fillRoundRect(ctx, x, y, 276, 146, 18, "#f8fafc");
        ctx.strokeStyle = "#dbe3ee";
        ctx.lineWidth = 2;
        strokeRoundRect(ctx, x, y, 276, 146, 18);
        drawText(ctx, label, x + 24, y + 46, 22, 900, "#5b6575");
        drawFittedText(ctx, value, x + 24, y + 112, 228, 48, 28, 900, "#0b5ed7");
    }

    function drawText(ctx, text, x, y, size, weight, color) {
        ctx.fillStyle = color;
        ctx.font = `${weight || 800} ${size}px Arial, sans-serif`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(String(text || ""), x, y);
    }

    function drawFittedText(ctx, text, x, y, maxWidth, maxSize, minSize, weight, color) {
        const value = String(text || "");
        let size = maxSize;
        ctx.fillStyle = color;
        ctx.textBaseline = "alphabetic";
        while (size > minSize) {
            ctx.font = `${weight || 800} ${size}px Arial, sans-serif`;
            if (ctx.measureText(value).width <= maxWidth) break;
            size -= 2;
        }
        ctx.font = `${weight || 800} ${size}px Arial, sans-serif`;
        if (ctx.measureText(value).width <= maxWidth) {
            ctx.fillText(value, x, y);
            return;
        }
        drawWrappedText(ctx, value, x, y - size, maxWidth, minSize, 1.12, weight, color);
    }

    function drawWrappedText(ctx, text, x, y, maxWidth, size, lineHeight, weight, color) {
        ctx.fillStyle = color;
        ctx.font = `${weight || 800} ${size}px Arial, sans-serif`;
        const words = String(text || "").split(/\s+/);
        let line = "";
        let currentY = y;
        words.forEach((word) => {
            const nextLine = line ? `${line} ${word}` : word;
            if (ctx.measureText(nextLine).width > maxWidth && line) {
                ctx.fillText(line, x, currentY);
                line = word;
                currentY += size * lineHeight;
                return;
            }
            line = nextLine;
        });
        if (line) ctx.fillText(line, x, currentY);
    }

    function fillRoundRect(ctx, x, y, width, height, radius, color) {
        ctx.fillStyle = color;
        roundedRectPath(ctx, x, y, width, height, radius);
        ctx.fill();
    }

    function strokeRoundRect(ctx, x, y, width, height, radius) {
        roundedRectPath(ctx, x, y, width, height, radius);
        ctx.stroke();
    }

    function roundedRectPath(ctx, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + height, r);
        ctx.arcTo(x + width, y + height, x, y + height, r);
        ctx.arcTo(x, y + height, x, y, r);
        ctx.arcTo(x, y, x + width, y, r);
        ctx.closePath();
    }

    function downloadBlob(blob, fileName) {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 500);
    }

    function getScorecardFileName(snapshot) {
        const data = snapshot.resultData || {};
        const payload = snapshot.payload || {};
        const examName = firstValue(payload.examName, snapshot.examName, data.examName, "rank-result");
        const slug = String(examName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "rank-result";
        return `govjobupdates-${slug}-scorecard.png`;
    }

    function getPublicSiteOrigin() {
        return "https://govjobupdates.com";
    }

    function setButtonFeedback(button, html, idleHtml, delay = 1400) {
        if (!button) return;
        button.innerHTML = html;
        if (delay > 0) {
            window.setTimeout(() => {
                button.innerHTML = idleHtml;
            }, delay);
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
