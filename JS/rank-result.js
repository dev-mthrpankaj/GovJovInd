(function () {
    "use strict";

    const RESULT_STORAGE_KEY = "gju_rank_predictor_latest_result";
    const SHARE_IDLE_HTML = '<i class="fas fa-share-alt" aria-hidden="true"></i> Share / Copy';
    const COPY_IDLE_HTML = '<i class="fas fa-copy" aria-hidden="true"></i> Copy Summary';
    const DOWNLOAD_IDLE_HTML = '<i class="fas fa-download" aria-hidden="true"></i> Download Scorecard';
    const IMAGE_SHARE_IDLE_HTML = '<i class="fas fa-image" aria-hidden="true"></i> Share Scorecard';
    const SCORECARD_LOGO_SRC = "../Assets/govjobupdates-logo.png";

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
        renderInsights(snapshot, data, payload, { rawMarks, normalizedMarks, totalSubmissions, accuracyIndicator, rankSets });
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
        // Older responses carry only the top-level ranks with no basis label: treat them as the raw ranks.
        const legacyFallback = !rawRanks && !normalizedRanks && hasAnyRankValue(activeRanks) ? activeRanks : null;
        return {
            raw: rawRanks || legacyFallback,
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
        const maxMarks = getScoringTotalQuestions(exam) * toNumber(exam.marksPerCorrect);
        if (maxMarks > 0) return round2(Math.min(Math.max(normalized, 0), maxMarks));
        return round2(Math.max(normalized, 0));
    }

    function getScoringTotalQuestions(exam) {
        const subjects = Array.isArray(exam?.subjects) ? exam.subjects : [];
        if (!subjects.length) return toNumber(exam.totalQuestions) || 0;
        const total = subjects.reduce((sum, subject) => {
            return isQualifyingOnlySubject(subject) ? sum : sum + (toNumber(subject.questions) || 0);
        }, 0);
        return total > 0 ? total : toNumber(exam.totalQuestions) || 0;
    }

    function isQualifyingOnlySubject(subject) {
        const value = subject?.qualifyingOnly ?? subject?.qualifying_only ?? subject?.qualifying;
        if (value === true || value === 1) return true;
        return ["1", "yes", "true", "q", "qualifying", "qualifying-only"].includes(String(value || "").trim().toLowerCase());
    }

    function renderSubjectScorecard(subjectAnalysis, payloadSubjectData, resultSubjectData) {
        const host = getById("resultSubjectBody");
        if (!host) return;

        const analysisRows = Array.isArray(subjectAnalysis) ? subjectAnalysis : [];
        const payloadRows = Array.isArray(payloadSubjectData) && payloadSubjectData.length
            ? payloadSubjectData
            : Array.isArray(resultSubjectData) ? resultSubjectData : [];
        const rows = analysisRows.length
            ? analysisRows.map((subject) => mergeSubjectRow(subject, payloadRows))
            : payloadRows.map((subject) => ({
                name: subject.name,
                score: subject.marks,
                maxMarks: subject.maxMarks,
                attempted: subject.attempted,
                correct: subject.correct,
                wrong: subject.wrong,
                avgScore: null,
                accuracy: getSubjectAccuracy(subject)
            }));

        if (!rows.length) {
            host.innerHTML = '<p class="subject-empty">Not available</p>';
            renderSubjectInsights([]);
            return;
        }
        host.innerHTML = rows.map(renderSubjectCard).join("");
        renderSubjectInsights(rows);
    }

    function renderSubjectCard(subject) {
        const score = toNumber(firstValue(subject.score, subject.marks, null));
        const avg = toNumber(subject.avgScore);
        const maxMarks = toNumber(subject.maxMarks);
        const scale = Number.isFinite(maxMarks) && maxMarks > 0
            ? maxMarks
            : Math.max(Number.isFinite(score) ? score : 0, Number.isFinite(avg) ? avg : 0, 1) * 1.2;
        const fill = Number.isFinite(score) ? Math.min(Math.max(score / scale, 0), 1) * 100 : 0;
        const marker = Number.isFinite(avg) ? Math.min(Math.max(avg / scale, 0), 1) * 100 : null;
        const passingStatus = firstValue(subject.passingStatus, getPassingStatus(subject), null);
        const failed = passingStatus === "Fail";
        const badges = [
            subject.qualifyingOnly ? '<span class="subject-badge is-qualifying">Qualifying only</span>' : "",
            passingStatus === "Pass" ? '<span class="subject-badge is-pass">Passed</span>' : "",
            failed ? '<span class="subject-badge is-fail">Not passed</span>' : ""
        ].join("");

        const facts = [];
        if (!isMissing(subject.correct)) facts.push(["Correct", formatPlain(subject.correct)]);
        if (!isMissing(subject.wrong)) facts.push(["Wrong", formatPlain(subject.wrong)]);
        if (!isMissing(subject.attempted)) facts.push(["Attempted", formatPlain(subject.attempted)]);
        if (!isMissing(subject.accuracy)) facts.push(["Accuracy", formatPercentile(subject.accuracy)]);
        if (!isMissing(subject.subjectRank)) facts.push(["Subject rank", formatSubjectRank(subject.subjectRank, subject.subjectTotalSubmissions)]);
        const factsHtml = facts.length
            ? `<dl class="subject-facts">${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>`
            : "";
        const ruleHtml = subject.passingCriteria
            ? `<p class="subject-rule">Required: ${escapeHtml(formatPassingCriteria(subject.passingCriteria))}</p>`
            : "";
        const compareHtml = Number.isFinite(score)
            ? `<div class="subject-compare" role="img" aria-label="Your score ${escapeHtml(formatMarks(score))}${Number.isFinite(avg) ? `, average ${escapeHtml(formatMarks(avg))}` : ""}">
                    <i style="width:${fill.toFixed(1)}%"></i>${marker === null ? "" : `<b style="left:calc(${marker.toFixed(1)}% - 1px)"></b>`}
                </div>
                <div class="subject-legend"><span>Your score</span>${Number.isFinite(avg) ? `<span>Average ${escapeHtml(formatMarks(avg))}</span>` : ""}</div>`
            : "";

        return `
            <article class="subject-card${failed ? " is-failed-subject" : ""}">
                <div class="subject-card-head">
                    <h3>${escapeHtml(firstValue(subject.name, "Subject"))}</h3>
                    <div class="subject-badges">${badges}</div>
                </div>
                <div class="subject-score"><strong>${escapeHtml(formatMarks(score))}</strong>${Number.isFinite(maxMarks) && maxMarks > 0 ? `<small>out of ${escapeHtml(formatMarks(maxMarks))}</small>` : ""}</div>
                ${compareHtml}
                ${factsHtml}
                ${ruleHtml}
            </article>
        `;
    }

    function renderSubjectInsights(rows) {
        const host = getById("subjectInsights");
        if (!host) return;
        const comparable = rows
            .filter((subject) => !subject.qualifyingOnly)
            .map((subject) => ({
                name: firstValue(subject.name, "Subject"),
                diff: toNumber(firstValue(subject.score, subject.marks, null)) - toNumber(subject.avgScore)
            }))
            .filter((item) => Number.isFinite(item.diff));
        if (comparable.length < 2) {
            host.hidden = true;
            host.innerHTML = "";
            return;
        }
        const sorted = comparable.slice().sort((x, y) => y.diff - x.diff);
        const best = sorted[0];
        const worst = sorted[sorted.length - 1];
        const fmt = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}`;
        host.innerHTML = `
            <div class="insight is-strong"><i class="fas fa-arrow-trend-up" aria-hidden="true"></i><span><strong>Strongest:</strong> ${escapeHtml(best.name)} (${fmt(best.diff)} marks vs average)</span></div>
            <div class="insight is-weak"><i class="fas fa-bullseye" aria-hidden="true"></i><span><strong>${worst.diff < 0 ? "Needs most work" : "Smallest lead"}:</strong> ${escapeHtml(worst.name)} (${fmt(worst.diff)} marks vs average)</span></div>
        `;
        host.hidden = false;
    }

    function mergeSubjectRow(subject, payloadRows) {
        const match = payloadRows.find((item) => String(item?.name || "").toLowerCase() === String(subject?.name || "").toLowerCase()) || {};
        return {
            name: firstValue(subject.name, match.name, "Subject"),
            score: firstValue(subject.score, subject.marks, match.marks, null),
            maxMarks: firstValue(subject.maxMarks, match.maxMarks, null),
            attempted: firstValue(subject.attempted, subject.totalAttempted, match.attempted, match.totalAttempted, null),
            correct: firstValue(subject.correct, subject.rightAnswers, match.correct, match.rightAnswers, null),
            wrong: firstValue(subject.wrong, subject.wrongAnswers, match.wrong, match.wrongAnswers, null),
            subjectRank: firstValue(subject.subjectRank, match.subjectRank, null),
            subjectTotalSubmissions: firstValue(subject.subjectTotalSubmissions, match.subjectTotalSubmissions, null),
            passingCriteria: firstValue(subject.passingCriteria, match.passingCriteria, null),
            passingStatus: firstValue(subject.passingStatus, match.passingStatus, null),
            avgScore: firstValue(subject.avgScore, subject.averageScore, null),
            accuracy: firstValue(subject.accuracy, getSubjectAccuracy(match), null),
            qualifyingOnly: isQualifyingOnlySubject(subject) || isQualifyingOnlySubject(match)
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

    function formatScorecardFailureTitle(subject) {
        const name = firstValue(subject?.name, "Qualifying subject");
        return `Failed qualifying subject: ${name}`;
    }

    function formatScorecardFailureDetail(subject) {
        const score = formatMarks(firstValue(subject?.score, subject?.marks, null));
        const percentage = isMissing(subject?.obtainedPercentage) ? "" : ` (${formatPercentile(subject.obtainedPercentage)})`;
        const criteria = formatPassingCriteria(subject?.passingCriteria);
        const message = subject?.passingMessage ? ` - ${subject.passingMessage}` : "";
        return `Score ${score}${percentage}. Required: ${criteria}${message}`;
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

    function renderInsights(snapshot, data, payload, ctx) {
        const raw = toNumber(ctx.rawMarks);
        const norm = toNumber(ctx.normalizedMarks);
        const total = toNumber(ctx.totalSubmissions);
        const hasShifts = getHasShifts(snapshot, data);
        const normApplied = data.normalizationApplied === true
            || (data.normalizationApplied === undefined && Number.isFinite(raw) && Number.isFinite(norm) && Math.abs(norm - raw) > 0.004);
        const active = (normApplied ? ctx.rankSets.normalized || ctx.rankSets.raw : ctx.rankSets.raw || ctx.rankSets.normalized) || {};

        renderCandidateChips(payload, snapshot);
        const reviewBadge = getById("reviewBadge");
        if (reviewBadge) reviewBadge.hidden = String(data.reviewStatus || "").toLowerCase() !== "pending";

        // headline
        setText("headlineRank", formatRank(active.overallRank));
        setText("headlineBasis", normApplied ? "Normalised marks" : "Raw marks");
        setText("heroCategoryRank", formatRank(active.categoryRank));
        setText("heroStateRank", formatRank(active.stateRank));
        setText("heroShiftRank", formatRank(active.shiftRank));
        const heroShift = getById("heroShiftRank")?.parentElement;
        if (heroShift) heroShift.hidden = !hasShifts;
        const rankNumber = toNumber(String(active.overallRank || "").replace("#", ""));
        let sub = "Based on candidates who submitted so far.";
        if (Number.isFinite(total) && total > 0) {
            if (total >= 30 && Number.isFinite(rankNumber) && rankNumber > 0) {
                const top = Math.max(0.1, Math.round((rankNumber / total) * 1000) / 10);
                sub = `Out of ${formatCount(total)} candidates counted so far, you are in the top ${top}%.`;
            } else {
                sub = `Only ${formatCount(total)} ${total === 1 ? "submission" : "submissions"} so far, so this rank will change quickly as more candidates join.`;
            }
        }
        setText("headlineSub", sub);

        // percentile ring
        const percentile = toNumber(String(data.percentile ?? "").replace("%", ""));
        const ring = getById("percentileRing");
        if (ring) ring.style.setProperty("--p", Number.isFinite(percentile) ? String(Math.min(Math.max(percentile, 0), 100)) : "0");
        setText("percentileMeaning", Number.isFinite(percentile)
            ? `You scored higher than about ${Math.round(percentile)}% of the candidates counted so far.`
            : "Share of submitted candidates you scored above.");

        // marks delta
        const delta = getById("resultMarksDelta");
        if (delta) {
            if (normApplied && Number.isFinite(raw) && Number.isFinite(norm)) {
                const diff = norm - raw;
                delta.textContent = `${diff >= 0 ? "+" : ""}${diff.toFixed(2)} marks after shift normalisation`;
                delta.classList.toggle("is-negative", diff < 0);
                delta.hidden = false;
            } else {
                delta.hidden = true;
            }
        }

        // confidence
        const level = String(ctx.accuracyIndicator || "").toLowerCase();
        const levelNumber = level === "high" ? 3 : level === "medium" ? 2 : level === "low" ? 1 : 0;
        const meter = getById("confidenceMeter");
        if (meter) meter.dataset.level = String(levelNumber);
        setText("confidenceMeaning", {
            3: "1,000+ submissions: a stable estimate.",
            2: "100 to 999 submissions: a fair estimate that can still move.",
            1: "Fewer than 100 submissions: treat this rank as rough for now."
        }[levelNumber] || "More submissions make this estimate more reliable.");

        renderProjection(data.projection);
        renderRankTabs(data, normApplied, hasShifts);
        renderMarksBars(snapshot, data, { raw, norm, normApplied, hasShifts });
    }

    function renderCandidateChips(payload, snapshot) {
        const list = getById("candidateChips");
        if (!list) return;
        const roll = list.querySelector("li");
        const items = [];
        const add = (icon, label, value) => {
            if (!isMissing(value) && String(value).toLowerCase() !== "none") {
                items.push(`<li><i class="fas ${icon}" aria-hidden="true"></i> ${label ? `${escapeHtml(label)} ` : ""}<strong>${escapeHtml(value)}</strong></li>`);
            }
        };
        add("fa-users", "", payload.category);
        add("fa-location-dot", "", payload.state);
        add("fa-clock", "Shift", payload.shift);
        add("fa-calendar-day", "", formatExamDate(payload.examDate));
        add("fa-universal-access", "", payload.horizontalCategory);
        list.innerHTML = "";
        if (roll) list.appendChild(roll);
        list.insertAdjacentHTML("beforeend", items.join(""));
    }

    function formatExamDate(value) {
        if (isMissing(value)) return "";
        const date = new Date(`${value}T00:00:00`);
        return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    }

    function renderProjection(projection) {
        const panel = getById("projectionPanel");
        if (!panel) return;
        const expected = toNumber(projection?.expectedAppeared);
        const estimated = toNumber(projection?.estimatedRank);
        if (!projection || !Number.isFinite(expected) || expected <= 0 || !Number.isFinite(estimated)) {
            panel.hidden = true;
            return;
        }
        const low = toNumber(projection.rangeLow);
        const high = toNumber(projection.rangeHigh);
        const pct = (value) => Math.min(Math.max(value / expected, 0), 1) * 100;
        setText("projectionRank", `About #${formatCount(estimated)}`);
        setText("projectionLow", Number.isFinite(low) ? `Best case #${formatCount(low)}` : "");
        setText("projectionHigh", Number.isFinite(high) ? `Worst case #${formatCount(high)}` : "");
        const fill = getById("projectionRangeFill");
        if (fill && Number.isFinite(low) && Number.isFinite(high)) {
            fill.style.left = `${pct(low)}%`;
            fill.style.width = `${Math.max(pct(high) - pct(low), 1)}%`;
        }
        const dot = getById("projectionRangeDot");
        if (dot) dot.style.left = `${pct(estimated)}%`;
        setText("projectionNote", `Out of about ${formatCount(expected)} candidates expected to appear. ${projection.note || "Estimate only; actual rank can differ."}`);
        panel.hidden = false;
    }

    function renderRankTabs(data, normApplied, hasShifts) {
        const tabs = getById("basisTabs");
        const rawPanel = getById("rankSetRaw");
        const normPanel = getById("rankSetNormalized");
        const note = getById("normalizationNote");
        if (!tabs || !rawPanel || !normPanel) return;

        const show = (basis) => {
            rawPanel.hidden = basis !== "raw";
            normPanel.hidden = basis !== "normalized";
            tabs.querySelectorAll("[data-basis]").forEach((button) => {
                button.setAttribute("aria-selected", button.dataset.basis === basis ? "true" : "false");
            });
        };

        tabs.classList.toggle("is-single", !normApplied);
        if (!tabs.dataset.bound) {
            tabs.dataset.bound = "1";
            tabs.addEventListener("click", (event) => {
                const button = event.target.closest("[data-basis]");
                if (button) show(button.dataset.basis);
            });
        }
        show(normApplied ? "normalized" : "raw");

        if (note) {
            const backendNote = String(data.normalizationNote || "").trim();
            const text = normApplied
                ? `Normalised ranks adjust for difficulty differences between shifts. ${backendNote}`.trim()
                : backendNote;
            note.textContent = text;
            note.classList.toggle("is-info", normApplied && !backendNote);
            note.hidden = !text;
        }
    }

    function renderMarksBars(snapshot, data, ctx) {
        const host = getById("marksBars");
        if (!host) return;
        const rows = [];
        if (Number.isFinite(ctx.raw)) rows.push({ label: "Your raw marks", value: ctx.raw, cls: "is-you" });
        if (ctx.normApplied && Number.isFinite(ctx.norm)) rows.push({ label: "Your normalised marks", value: ctx.norm, cls: "is-you-norm" });
        const avg = toNumber(data.averageMarks);
        const shiftAvg = toNumber(data.averageShiftMarks);
        const categoryAvg = toNumber(data.categoryAverageMarks);
        if (Number.isFinite(avg)) rows.push({ label: "Average of all candidates", value: avg, cls: "" });
        if (ctx.hasShifts && Number.isFinite(shiftAvg)) rows.push({ label: "Average of your shift", value: shiftAvg, cls: "" });
        if (Number.isFinite(categoryAvg)) rows.push({ label: "Average of your category", value: categoryAvg, cls: "" });
        if (!rows.length) {
            host.innerHTML = '<p class="subject-empty">Not available</p>';
            return;
        }
        const exam = snapshot.exam || {};
        const examMax = getScoringTotalQuestions(exam) * (toNumber(exam.marksPerCorrect) || 0);
        const scale = examMax > 0 ? examMax : Math.max(...rows.map((row) => row.value), 1) * 1.12;
        host.innerHTML = rows.map((row) => `
            <div class="mark-row ${row.cls}">
                <div class="mark-row-head"><span>${escapeHtml(row.label)}</span><strong>${escapeHtml(formatMarks(row.value))}</strong></div>
                <div class="mark-track"><i style="width:${(Math.min(Math.max(row.value / scale, 0), 1) * 100).toFixed(1)}%"></i></div>
            </div>
        `).join("");
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

    async function createScorecardBlob(snapshot) {
        const canvas = await buildScorecardCanvas(snapshot);
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Scorecard image could not be created."));
            }, "image/png", 0.94);
        });
    }

    async function buildScorecardCanvas(snapshot) {
        const model = buildScorecardModel(snapshot);
        const width = 1200;
        const subjectRowHeight = 82;
        const qualificationHeight = model.isNotQualified ? 154 : 0;
        const subjectsHeight = model.subjects.length ? 92 + (model.subjects.length * subjectRowHeight) : 0;
        const height = 1180 + qualificationHeight + subjectsHeight;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = "#f4f7fb";
        ctx.fillRect(0, 0, width, height);
        fillRoundRect(ctx, 64, 64, width - 128, height - 128, 34, "#ffffff");
        fillRoundRect(ctx, 64, 64, width - 128, 224, 34, "#0b5ed7");
        fillRoundRect(ctx, 64, 222, width - 128, 66, 0, "#0b5ed7");

        await drawScorecardLogo(ctx, 108, 94, 64);
        drawText(ctx, "GovJobUpdates", 190, 132, 34, 900, "#ffffff");
        drawText(ctx, "Rank Predictor Scorecard", 108, 186, 52, 900, "#ffffff");
        drawWrappedText(ctx, model.examName, 108, 250, 980, 31, 1.25, 800, "#eaf2ff");

        if (model.isNotQualified) {
            drawQualificationWarning(ctx, model, 108, 318);
        }

        const offsetY = qualificationHeight;
        drawText(ctx, "Overall Rank", 108, 374 + offsetY, 30, 900, "#5b6575");
        drawText(ctx, model.overallRank, 108, 472 + offsetY, 94, 900, "#0b5ed7");
        drawText(ctx, "Percentile", 680, 374 + offsetY, 30, 900, "#5b6575");
        drawText(ctx, model.percentile, 680, 456 + offsetY, 70, 900, "#0f766e");

        drawMetricPill(ctx, 108, 548 + offsetY, "Roll Number", model.rollNumber);
        drawMetricPill(ctx, 420, 548 + offsetY, "Marks", model.marks);
        drawMetricPill(ctx, 732, 548 + offsetY, "Submissions", model.totalSubmissions);

        const metricY = 704 + offsetY;
        drawMetricCard(ctx, 108, metricY, "Category Rank", model.categoryRank);
        drawMetricCard(ctx, 420, metricY, "State Rank", model.stateRank);
        drawMetricCard(ctx, 732, metricY, "Shift Rank", model.shiftRank);

        let y = 912 + offsetY;
        drawText(ctx, "Subject Scorecard", 108, y, 34, 900, "#0f172a");
        y += 36;
        if (model.subjects.length) {
            model.subjects.forEach((subject) => {
                drawSubjectScorecardRow(ctx, subject, 108, y);
                y += subjectRowHeight;
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
        const failedSubjects = Array.isArray(data.failedSubjects) ? data.failedSubjects : [];
        const isNotQualified = data.isQualified === false || String(data.qualificationStatus || "").toLowerCase() === "not qualified" || failedSubjects.length > 0;

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
            isNotQualified,
            qualificationStatus: isNotQualified ? "Not eligible for merit rank" : firstValue(data.qualificationStatus, "Qualified"),
            qualificationMessage: firstValue(data.qualificationMessage, isNotQualified ? "Qualifying criteria was not met." : "Qualifying criteria met."),
            failedTitle: failedSubjects.length ? formatScorecardFailureTitle(failedSubjects[0]) : "",
            failedDetail: failedSubjects.length ? formatScorecardFailureDetail(failedSubjects[0]) : "",
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
                accuracy: getSubjectAccuracy(subject),
                qualifyingOnly: isQualifyingOnlySubject(subject)
            }));
        return rows.map((subject) => ({
            name: firstValue(subject.name, "Subject"),
            score: formatMarks(firstValue(subject.score, subject.marks, null)),
            accuracy: formatPercentile(subject.accuracy),
            qualifyingOnly: Boolean(subject.qualifyingOnly),
            passingStatus: firstValue(subject.passingStatus, getPassingStatus(subject), null)
        }));
    }

    function drawSubjectScorecardRow(ctx, subject, x, y) {
        const failed = String(subject.passingStatus || "").toLowerCase() === "fail";
        fillRoundRect(ctx, x, y, 984, 66, 8, failed ? "#fff1f2" : "#f8fafc");
        drawFittedText(ctx, subject.name, x + 24, y + 30, 310, 23, 17, 900, failed ? "#b91c1c" : "#0f172a");

        if (subject.qualifyingOnly) {
            fillRoundRect(ctx, x + 24, y + 38, 128, 22, 7, failed ? "#fee2e2" : "#e0f2fe");
            drawFittedText(ctx, "Qualifying only", x + 36, y + 54, 104, 13, 11, 900, failed ? "#b91c1c" : "#0369a1");
        }

        drawFittedText(ctx, `Score ${subject.score}`, x + 390, y + 40, 190, 23, 16, 900, failed ? "#dc2626" : "#0b5ed7");
        drawFittedText(ctx, `Accuracy ${subject.accuracy}`, x + 640, y + 40, 210, 23, 16, 900, failed ? "#b91c1c" : "#0f766e");
        if (subject.passingStatus) {
            drawStatusBadge(ctx, subject.passingStatus, x + 892, y + 18);
        }
    }

    function drawQualificationWarning(ctx, model, x, y) {
        fillRoundRect(ctx, x, y, 984, 122, 16, "#fff1f2");
        ctx.strokeStyle = "#fecaca";
        ctx.lineWidth = 2;
        strokeRoundRect(ctx, x, y, 984, 122, 16);
        drawText(ctx, model.qualificationStatus, x + 24, y + 34, 19, 900, "#b91c1c");
        drawFittedText(ctx, model.failedTitle || model.qualificationMessage, x + 24, y + 72, 900, 29, 19, 900, "#991b1b");
        if (model.failedDetail) {
            drawFittedText(ctx, model.failedDetail, x + 24, y + 102, 900, 19, 14, 800, "#b91c1c");
        }
    }

    function drawStatusBadge(ctx, status, x, y) {
        const failed = String(status || "").toLowerCase() === "fail";
        const label = failed ? "Fail" : String(status || "Pass");
        fillRoundRect(ctx, x, y, 96, 30, 8, failed ? "#fee2e2" : "#dcfce7");
        drawFittedText(ctx, label, x + 18, y + 21, 60, 17, 13, 900, failed ? "#b91c1c" : "#166534");
    }

    async function drawScorecardLogo(ctx, x, y, size) {
        const image = await loadScorecardLogo();
        fillRoundRect(ctx, x, y, size, size, 14, "#ffffff");
        if (!image) {
            drawText(ctx, "GJU", x + 8, y + 36, 18, 900, "#0b5ed7");
            return;
        }
        drawImageContain(ctx, image, x + 6, y + 6, size - 12, size - 12);
    }

    function loadScorecardLogo() {
        return new Promise((resolve) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => resolve(image);
            image.onerror = () => resolve(null);
            image.src = SCORECARD_LOGO_SRC;
        });
    }

    function drawImageContain(ctx, image, x, y, width, height) {
        const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight);
        const drawWidth = image.naturalWidth * ratio;
        const drawHeight = image.naturalHeight * ratio;
        ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
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
