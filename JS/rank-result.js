(function () {
    "use strict";

    const RESULT_STORAGE_KEY = "gju_rank_predictor_latest_result";
    const SHARE_IDLE_HTML = '<i class="fas fa-share-alt" aria-hidden="true"></i> Share / Copy';
    const COPY_IDLE_HTML = '<i class="fas fa-copy" aria-hidden="true"></i> Copy Summary';
    const DOWNLOAD_IDLE_HTML = '<i class="fas fa-download" aria-hidden="true"></i> Download Scorecard';
    const IMAGE_SHARE_IDLE_HTML = '<i class="fas fa-image" aria-hidden="true"></i> Share Scorecard';
    const SCORECARD_LOGO_SRC = "../Assets/govjobupdates-logo.png";
    const SCORECARD_FONT = 'Inter, "Segoe UI", "Noto Sans Devanagari", "Nirmala UI", Arial, sans-serif';
    // Hide the middle digits of the roll number on the shareable image (set to false to show it in full).
    const SCORECARD_MASK_ROLL = true;

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
        renderTopPerformers(data.topPerformers);
        renderSessionInsights(data.sessionInsights);
        renderSubjectScorecard(data.subjectAnalysis, payload.subjectData, data.subjectData);
        renderInsights(snapshot, data, payload, { rawMarks, normalizedMarks, totalSubmissions, accuracyIndicator, rankSets });
        renderResultAdSlot();
        setText("shareResultText", buildShareText(snapshot, examName, normalizedMarks));
    }

    function renderTopPerformers(top) {
        const panel = getById("topPerformersPanel");
        if (!panel) return;
        const list = top && Array.isArray(top.list) ? top.list : [];
        if (!list.length) {
            panel.hidden = true;
            return;
        }
        panel.hidden = false;

        const best = Math.max(...list.map((item) => Number(item.marks) || 0), 0.01);
        const basisText = top.basis === "normalized" ? "normalised marks" : "raw marks";
        setText("topPerformersSub", `Ranked on ${basisText} of ${formatCount(top.total)} candidates who submitted so far. Names are partly hidden for privacy.`);

        const podiumItems = list.filter((item) => Number(item.rank) <= 3).slice(0, 3);
        const podium = getById("topPodium");
        if (podium) {
            const order = [podiumItems[1], podiumItems[0], podiumItems[2]].filter(Boolean);
            podium.hidden = !podiumItems.length;
            podium.innerHTML = order.map((item) => (
                `<div class="podium-step is-rank-${Math.min(Number(item.rank), 3)}${item.isYou ? " is-you" : ""}">` +
                    `<span class="podium-medal" aria-hidden="true"><i class="fas fa-${Number(item.rank) === 1 ? "crown" : "medal"}"></i></span>` +
                    `<span class="podium-rank">#${escapeHtml(item.rank)}</span>` +
                    `<strong class="podium-name">${escapeHtml(item.displayName)}${item.isYou ? ' <em>You</em>' : ""}</strong>` +
                    `<span class="podium-marks">${formatMarks(item.marks)}</span>` +
                `</div>`
            )).join("");
        }

        const rowsHtml = list.filter((item) => !podiumItems.includes(item));
        const listNode = getById("topLeaderList");
        if (listNode) {
            listNode.hidden = !rowsHtml.length;
            listNode.innerHTML = rowsHtml.map((item) => buildLeaderRow(item, best)).join("");
        }

        const you = top.you;
        const youGap = getById("leaderYouGap");
        const youList = getById("leaderYouList");
        const showYou = Boolean(you && you.inTop === false && Number(you.rank) > 0);
        if (youGap) youGap.hidden = !showYou;
        if (youList) {
            youList.hidden = !showYou;
            youList.innerHTML = showYou ? buildLeaderRow(you, best) : "";
        }
    }

    function buildLeaderRow(item, best) {
        const marks = Number(item.marks) || 0;
        const width = Math.max(4, Math.min(100, (marks / best) * 100));
        return `<li class="leader-row${item.isYou ? " is-you" : ""}">` +
            `<span class="leader-rank">${escapeHtml(item.rank)}</span>` +
            `<div class="leader-main">` +
                `<strong class="leader-name">${escapeHtml(item.displayName)}${item.isYou ? ' <em>You</em>' : ""}</strong>` +
                `<span class="leader-bar" aria-hidden="true"><i style="width:${width.toFixed(1)}%"></i></span>` +
            `</div>` +
            `<span class="leader-marks">${formatMarks(item.marks)}</span>` +
        `</li>`;
    }

    function renderSessionInsights(insights) {
        const panel = getById("sessionInsightsPanel");
        if (!panel) return;
        const sessions = insights && Array.isArray(insights.sessions) ? insights.sessions : [];
        if (sessions.length < 2) {
            panel.hidden = true;
            return;
        }
        panel.hidden = false;

        const note = getById("sessionNormNote");
        if (note) {
            note.hidden = Boolean(insights.normalizationApplied);
            note.textContent = insights.normalizationApplied ? "" : "Normalisation is not applied yet (it needs enough submissions in two or more shifts), so Gain / Loss is not shown.";
        }

        const highestAvg = Math.max(...sessions.map((item) => Number(item.average) || 0), 0.01);
        const difficultyText = { hardest: "Hardest", moderate: "Moderate", easiest: "Easiest" };
        getById("sessionList").innerHTML = sessions.map((item) => {
            const average = Number(item.average) || 0;
            const width = Math.max(4, Math.min(100, (average / highestAvg) * 100));
            const dateText = item.date ? escapeHtml(item.date) : "Date not given";
            const gain = item.gain === null || item.gain === undefined ? null : Number(item.gain);
            let gainHtml = '<span class="gain-chip is-na">Not normalised</span>';
            if (gain !== null && Number.isFinite(gain)) {
                const tone = gain > 0.004 ? "is-gain" : (gain < -0.004 ? "is-loss" : "is-flat");
                const sign = gain > 0.004 ? "+" : "";
                const icon = gain > 0.004 ? "fa-arrow-trend-up" : (gain < -0.004 ? "fa-arrow-trend-down" : "fa-minus");
                gainHtml = `<span class="gain-chip ${tone}"><i class="fas ${icon}" aria-hidden="true"></i> ${sign}${gain.toFixed(2)}</span>`;
            }
            return `<article class="session-card is-${escapeHtml(item.difficulty)}${item.isYours ? " is-yours" : ""}">` +
                `<header class="session-head">` +
                    `<span class="session-order">${escapeHtml(item.difficultyRank)}</span>` +
                    `<div class="session-title"><strong>${dateText}</strong><span>Shift ${escapeHtml(item.shift)} &middot; ${formatCount(item.candidates)} candidates</span></div>` +
                    `<div class="session-tags">` +
                        (item.isYours ? '<span class="session-tag is-yours">Your shift</span>' : "") +
                        `<span class="session-tag is-${escapeHtml(item.difficulty)}">${difficultyText[item.difficulty] || "Moderate"}</span>` +
                    `</div>` +
                `</header>` +
                `<div class="session-avg"><span>Average marks</span><strong>${formatMarks(average)}</strong></div>` +
                `<span class="session-bar" aria-hidden="true"><i style="width:${width.toFixed(1)}%"></i></span>` +
                `<dl class="session-stats">` +
                    `<div><dt>Highest</dt><dd>${formatMarks(item.highest)}</dd></div>` +
                    `<div><dt>Lowest</dt><dd>${formatMarks(item.lowest)}</dd></div>` +
                    `<div><dt>Normalisation Gain / Loss</dt><dd>${gainHtml}</dd></div>` +
                `</dl>` +
            `</article>`;
        }).join("");
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

    async function ensureScorecardFonts() {
        if (!document.fonts || typeof document.fonts.load !== "function") return;
        const sample = "Rank 0123456789#%/.,\u2022\u2014 ABCabc";
        try {
            await Promise.all([400, 500, 600, 700, 800].map((weight) => document.fonts.load(`${weight} 24px Inter`, sample)));
        } catch (error) {
            /* system fonts are used as a fallback */
        }
    }

    async function buildScorecardCanvas(snapshot) {
        const model = buildScorecardModel(snapshot);
        const [logo] = await Promise.all([loadScorecardLogo(), ensureScorecardFonts()]);
        const width = 1200;

        // Pass 1 measures the layout on a throw-away canvas, pass 2 paints at the exact height (no dead space).
        const probe = document.createElement("canvas");
        probe.width = width;
        probe.height = 8;
        const height = renderScorecard(probe.getContext("2d"), model, logo, width, 0);

        let scale = 1.5;
        while (scale > 1 && width * scale * height * scale > 12000000) scale -= 0.25;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        renderScorecard(ctx, model, logo, width, height);
        return canvas;
    }

    function renderScorecard(ctx, m, logo, W, H) {
        const C = SCORECARD_COLORS;
        const cardX = 48;
        const cardTop = 48;
        const cardW = W - 96;
        const pad = 56;
        const radius = 36;
        const ix = cardX + pad;
        const iw = cardW - pad * 2;
        const ir = ix + iw;

        if (H) {
            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, "#e9eff8");
            bg.addColorStop(1, "#dce6f4");
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);
            ctx.save();
            ctx.shadowColor = "rgba(15, 23, 42, 0.18)";
            ctx.shadowBlur = 48;
            ctx.shadowOffsetY = 18;
            fillRoundRect(ctx, cardX, cardTop, cardW, H - cardTop * 2, radius, C.white);
            ctx.restore();
        }

        /* ---------- Header ---------- */
        const tileSize = 68;
        const tileTop = cardTop + 40;
        const title = layoutScorecardTitle(ctx, m.examName, iw);
        const titleLineHeight = Math.round(title.size * 1.2);
        const firstBaseline = tileTop + tileSize + 30 + Math.round(title.size * 0.74);
        const lastBaseline = firstBaseline + (title.lines.length - 1) * titleLineHeight;
        const chipsTop = lastBaseline + 30;
        const chipLayout = layoutScorecardChips(ctx, m.chips, ix, iw, chipsTop);
        const headerBottom = (chipLayout.bottom || lastBaseline + 4) + 40;
        const headerH = headerBottom - cardTop;

        if (H) {
            ctx.save();
            topRoundedRectPath(ctx, cardX, cardTop, cardW, headerH, radius);
            ctx.clip();
            const grad = ctx.createLinearGradient(cardX, cardTop, cardX + cardW, headerBottom);
            grad.addColorStop(0, C.navy);
            grad.addColorStop(1, C.blue);
            ctx.fillStyle = grad;
            ctx.fillRect(cardX, cardTop, cardW, headerH);
            ctx.fillStyle = "rgba(255,255,255,0.06)";
            ctx.beginPath(); ctx.arc(cardX + cardW - 70, cardTop + 40, 190, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.beginPath(); ctx.arc(cardX + cardW - 250, headerBottom + 20, 150, 0, Math.PI * 2); ctx.fill();
            const stripeY = headerBottom - 6;
            ctx.fillStyle = "#ff9933"; ctx.fillRect(cardX, stripeY, cardW / 3, 6);
            ctx.fillStyle = "#ffffff"; ctx.fillRect(cardX + cardW / 3, stripeY, cardW / 3, 6);
            ctx.fillStyle = "#138808"; ctx.fillRect(cardX + (cardW * 2) / 3, stripeY, cardW / 3 + 1, 6);
            ctx.restore();
        }

        drawScorecardLogo(ctx, logo, ix, tileTop, tileSize);
        drawText(ctx, "GovJobUpdates", ix + tileSize + 20, tileTop + 31, 32, 800, "#ffffff");
        drawLabel(ctx, "Rank Predictor Scorecard", ix + tileSize + 20, tileTop + 58, 15, 600, "rgba(255,255,255,0.78)");
        drawText(ctx, m.generatedDate, ir, tileTop + 31, 21, 600, "rgba(255,255,255,0.92)", "right");
        drawLabel(ctx, "Estimated rank", ir, tileTop + 58, 14, 600, "rgba(255,255,255,0.7)", "right");

        title.lines.forEach((line, index) => {
            drawText(ctx, line, ix, firstBaseline + index * titleLineHeight, title.size, 800, "#ffffff");
        });
        chipLayout.items.forEach((chip) => {
            fillRoundRect(ctx, chip.x, chip.y, chip.w, chip.h, chip.h / 2, "rgba(255,255,255,0.16)");
            ctx.strokeStyle = "rgba(255,255,255,0.34)";
            ctx.lineWidth = 1.5;
            strokeRoundRect(ctx, chip.x, chip.y, chip.w, chip.h, chip.h / 2);
            drawText(ctx, chip.text, chip.x + 20, chip.y + 28, 19, 600, "#ffffff");
        });

        let y = headerBottom;

        /* ---------- Qualification warning ---------- */
        if (m.isNotQualified) {
            const boxTop = y + 36;
            const boxH = 128;
            fillRoundRect(ctx, ix, boxTop, iw, boxH, 18, "#fef2f2");
            ctx.strokeStyle = "#fecaca";
            ctx.lineWidth = 2;
            strokeRoundRect(ctx, ix, boxTop, iw, boxH, 18);
            fillRoundRect(ctx, ix, boxTop + 18, 7, boxH - 36, 3.5, C.red);
            drawLabel(ctx, m.qualificationStatus, ix + 32, boxTop + 38, 15, 800, C.red);
            drawFittedText(ctx, m.failedTitle || m.qualificationMessage, ix + 32, boxTop + 76, iw - 64, 27, 18, 800, "#991b1b");
            if (m.failedDetail) drawFittedText(ctx, m.failedDetail, ix + 32, boxTop + 108, iw - 64, 19, 14, 500, C.red);
            y = boxTop + boxH;
        }

        /* ---------- Hero: rank + percentile ---------- */
        const heroTop = y + 52;
        const colGap = 560;
        drawLabel(ctx, "Overall rank", ix, heroTop + 18, 17, 700, C.muted);
        drawFittedText(ctx, m.overallRank, ix, heroTop + 150, 440, m.overallRank === "Pending" ? 72 : 132, 48, 800, m.overallRank === "Pending" ? C.faint : C.blue);
        if (m.totalSubmissionsNumber > 0) {
            drawText(ctx, `out of ${m.totalSubmissions} candidates`, ix, heroTop + 240, 24, 500, C.slate);
        }
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ix + 500, heroTop + 4); ctx.lineTo(ix + 500, heroTop + 246); ctx.stroke();

        const px = ix + colGap;
        const pw = iw - colGap;
        drawLabel(ctx, "Percentile", px, heroTop + 18, 17, 700, C.muted);
        if (Number.isFinite(m.percentileValue)) {
            const numberText = m.percentileValue.toFixed(2);
            const numberSize = 112;
            drawText(ctx, numberText, px, heroTop + 150, numberSize, 800, C.teal);
            const numberWidth = measureText(ctx, numberText, numberSize, 800);
            drawText(ctx, "%", px + numberWidth + 6, heroTop + 150, 54, 800, C.teal);

            const pct = Math.min(Math.max(m.percentileValue, 0), 100);
            const trackY = heroTop + 190;
            fillRoundRect(ctx, px, trackY, pw, 14, 7, "#e2e8f0");
            const fillW = Math.max(14, (pw * pct) / 100);
            const fillGrad = ctx.createLinearGradient(px, 0, px + pw, 0);
            fillGrad.addColorStop(0, "#2dd4bf");
            fillGrad.addColorStop(1, C.teal);
            fillRoundRect(ctx, px, trackY, fillW, 14, 7, fillGrad);
            const markerX = Math.min(Math.max(px + fillW, px + 14), px + pw - 14);
            ctx.beginPath();
            ctx.arc(markerX, trackY + 7, 14, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = C.teal;
            ctx.stroke();
            drawText(ctx, `Ahead of ${m.percentileValue.toFixed(2)}% of candidates`, px, heroTop + 240, 22, 600, C.slate);
        } else {
            drawFittedText(ctx, "Pending", px, heroTop + 150, pw, 72, 40, 800, C.faint);
        }
        y = heroTop + 262;

        /* ---------- Key stats ---------- */
        const statTop = y + 44;
        const statGap = 20;
        const statW = (iw - statGap * 2) / 3;
        const statH = 116;
        const stats = [
            { label: "Marks", value: m.marks, suffix: m.maxMarksText ? `/ ${m.maxMarksText}` : "" },
            { label: "Roll number", value: m.rollNumberMasked, suffix: "" },
            { label: "Ranking basis", value: m.rankBasisLabel, suffix: "" }
        ];
        stats.forEach((stat, index) => {
            const sx = ix + index * (statW + statGap);
            fillRoundRect(ctx, sx, statTop, statW, statH, 20, C.soft);
            ctx.strokeStyle = C.line;
            ctx.lineWidth = 2;
            strokeRoundRect(ctx, sx, statTop, statW, statH, 20);
            drawLabel(ctx, stat.label, sx + 26, statTop + 38, 15, 700, C.muted);
            const suffixWidth = stat.suffix ? measureText(ctx, stat.suffix, 20, 600) + 10 : 0;
            const usedSize = drawFittedText(ctx, stat.value, sx + 26, statTop + 86, statW - 52 - suffixWidth, 38, 22, 800, C.ink);
            if (stat.suffix) {
                const valueWidth = measureText(ctx, stat.value, usedSize, 800);
                drawText(ctx, stat.suffix, sx + 26 + valueWidth + 10, statTop + 86, 20, 600, C.muted);
            }
        });
        y = statTop + statH;

        /* ---------- Group ranks ---------- */
        const groupHeadingY = y + 60;
        drawSectionHeading(ctx, "Rank across groups", ix, groupHeadingY);
        const tileTopY = groupHeadingY + 24;
        const tileGap = 20;
        const tiles = m.groupRanks;
        const tileW = (iw - tileGap * (tiles.length - 1)) / tiles.length;
        const tileH = 128;
        tiles.forEach((tile, index) => {
            const tx = ix + index * (tileW + tileGap);
            fillRoundRect(ctx, tx, tileTopY, tileW, tileH, 20, C.white);
            ctx.strokeStyle = "#cfd9e8";
            ctx.lineWidth = 2;
            strokeRoundRect(ctx, tx, tileTopY, tileW, tileH, 20);
            fillRoundRect(ctx, tx, tileTopY + 26, 6, tileH - 52, 3, tile.value === "Pending" ? "#cbd5e1" : C.blue);
            drawLabel(ctx, tile.label, tx + 30, tileTopY + 42, 15, 700, C.muted);
            drawFittedText(ctx, tile.value === "Pending" ? "\u2014" : tile.value, tx + 30, tileTopY + 102, tileW - 60, 52, 28, 800, tile.value === "Pending" ? C.faint : C.blue);
        });
        y = tileTopY + tileH;

        /* ---------- Subject table ---------- */
        const subjectHeadingY = y + 60;
        drawSectionHeading(ctx, "Subject-wise performance", ix, subjectHeadingY);
        const tableTop = subjectHeadingY + 24;
        if (m.subjects.length) {
            const scoreX = ix + 470;
            const accX = ix + 610;
            const nameW = scoreX - (ix + 28) - 28;
            const rows = m.subjects.map((subject) => layoutScorecardSubject(ctx, subject, nameW));
            const headH = 50;
            const bodyH = rows.reduce((sum, row) => sum + row.height, 0);
            const tableH = headH + bodyH;

            ctx.save();
            roundedRectPath(ctx, ix, tableTop, iw, tableH, 22);
            ctx.clip();
            ctx.fillStyle = C.white;
            ctx.fillRect(ix, tableTop, iw, tableH);
            ctx.fillStyle = "#f1f5f9";
            ctx.fillRect(ix, tableTop, iw, headH);
            let rowTop = tableTop + headH;
            rows.forEach((row, index) => {
                if (row.failed) {
                    ctx.fillStyle = "#fff1f2";
                    ctx.fillRect(ix, rowTop, iw, row.height);
                } else if (index % 2 === 1) {
                    ctx.fillStyle = "#fafcfe";
                    ctx.fillRect(ix, rowTop, iw, row.height);
                }
                if (index > 0) {
                    ctx.fillStyle = "#e8edf4";
                    ctx.fillRect(ix + 28, rowTop, iw - 56, 1.5);
                }
                row.top = rowTop;
                rowTop += row.height;
            });
            ctx.restore();
            ctx.strokeStyle = "#d5deeb";
            ctx.lineWidth = 2;
            strokeRoundRect(ctx, ix, tableTop, iw, tableH, 22);

            drawLabel(ctx, "Subject", ix + 28, tableTop + 31, 14, 700, C.muted);
            drawLabel(ctx, "Score", scoreX, tableTop + 31, 14, 700, C.muted);
            drawLabel(ctx, "Accuracy", accX, tableTop + 31, 14, 700, C.muted);
            if (m.showStatus) drawLabel(ctx, "Status", ir - 28, tableTop + 31, 14, 700, C.muted, "right");

            rows.forEach((row) => {
                const s = row.subject;
                const mid = row.top + row.height / 2;
                const blockTop = row.top + (row.height - row.blockHeight) / 2;
                row.lines.forEach((line, index) => {
                    drawText(ctx, line, ix + 28, blockTop + row.size * 0.95 + index * row.lineHeight, row.size, 700, row.failed ? "#991b1b" : C.ink);
                });
                if (s.qualifyingOnly) {
                    const badgeY = blockTop + row.lines.length * row.lineHeight + 6;
                    const badgeText = "Qualifying only";
                    const badgeW = measureLabel(ctx, badgeText, 12, 800) + 24;
                    fillRoundRect(ctx, ix + 28, badgeY, badgeW, 26, 13, row.failed ? "#fee2e2" : "#e0f2fe");
                    drawLabel(ctx, badgeText, ix + 40, badgeY + 18, 12, 800, row.failed ? C.red : "#0369a1");
                }

                const scoreSize = 28;
                drawText(ctx, s.score, scoreX, mid + 10, scoreSize, 800, row.failed ? C.red : C.ink);
                if (s.maxMarksText) {
                    const scoreWidth = measureText(ctx, s.score, scoreSize, 800);
                    drawText(ctx, `/ ${s.maxMarksText}`, scoreX + scoreWidth + 8, mid + 10, 19, 600, C.muted);
                }

                const accColor = accuracyColor(s.accuracyValue, row.failed);
                const barW = 130;
                fillRoundRect(ctx, accX, mid - 6, barW, 12, 6, "#e2e8f0");
                if (Number.isFinite(s.accuracyValue)) {
                    const fill = Math.max(12, (barW * Math.min(Math.max(s.accuracyValue, 0), 100)) / 100);
                    fillRoundRect(ctx, accX, mid - 6, fill, 12, 6, accColor);
                }
                drawText(ctx, s.accuracyText, accX + barW + 14, mid + 8, 23, 800, accColor);

                if (s.passingStatus) {
                    const failedStatus = String(s.passingStatus).toLowerCase() === "fail";
                    const label = failedStatus ? "Fail" : "Pass";
                    const badgeW = 88;
                    fillRoundRect(ctx, ir - 28 - badgeW, mid - 16, badgeW, 32, 16, failedStatus ? "#fee2e2" : "#dcfce7");
                    drawLabel(ctx, label, ir - 28 - badgeW / 2, mid + 6, 14, 800, failedStatus ? C.red : "#166534", "center");
                }
            });
            y = tableTop + tableH;
        } else {
            fillRoundRect(ctx, ix, tableTop, iw, 96, 20, C.soft);
            drawText(ctx, "Subject-wise data is not available for this result.", ix + 28, tableTop + 58, 23, 600, C.muted);
            y = tableTop + 96;
        }

        /* ---------- Footer ---------- */
        const footTop = y + 56;
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ix, footTop); ctx.lineTo(ir, footTop); ctx.stroke();

        const siteText = getPublicSiteOrigin().replace(/^https?:\/\//, "");
        const siteWidth = measureText(ctx, siteText, 26, 800);
        const brandX = ir - siteWidth;
        drawScorecardLogo(ctx, logo, brandX - 56, footTop + 28, 42);
        drawText(ctx, siteText, ir, footTop + 62, 26, 800, C.blue, "right");
        drawText(ctx, "Check your rank free", ir, footTop + 92, 19, 600, C.muted, "right");

        const noteLines = wrapLines(ctx, "Estimated rank based on candidate data submitted on GovJobUpdates. Actual results may differ.", iw - 380, 19, 500);
        noteLines.forEach((line, index) => drawText(ctx, line, ix, footTop + 52 + index * 28, 19, 500, C.muted));
        const noteBottom = footTop + 52 + (noteLines.length - 1) * 28;
        drawText(ctx, `Generated on ${m.generatedAt}`, ix, noteBottom + 32, 17, 600, C.faint);

        const cardBottom = Math.max(noteBottom + 32, footTop + 92) + 52;
        return cardBottom + cardTop;
    }

    const SCORECARD_COLORS = {
        navy: "#0a2463", blue: "#0b5ed7", ink: "#0f172a", slate: "#475569", muted: "#64748b", faint: "#94a3b8",
        line: "#e2e8f0", soft: "#f8fafc", white: "#ffffff", teal: "#0f766e", red: "#b91c1c"
    };

    function accuracyColor(value, failed) {
        if (failed) return "#dc2626";
        if (!Number.isFinite(value)) return "#94a3b8";
        if (value >= 80) return "#0f9d6b";
        if (value >= 60) return "#0b5ed7";
        return "#d97706";
    }

    function layoutScorecardTitle(ctx, text, maxWidth) {
        const value = String(text || "Rank Prediction Result");
        for (const size of [46, 40, 34]) {
            const lines = wrapLines(ctx, value, maxWidth, size, 800);
            if (lines.length <= 2) return { size, lines };
        }
        const lines = wrapLines(ctx, value, maxWidth, 32, 800).slice(0, 2);
        lines[1] = ellipsize(ctx, `${lines[1].replace(/\s+$/, "")}\u2026`, maxWidth, 32, 800);
        return { size: 32, lines };
    }

    function layoutScorecardChips(ctx, chips, x, maxWidth, top) {
        const items = [];
        if (!chips || !chips.length) return { items, bottom: 0 };
        const chipH = 42;
        const gap = 12;
        let cx = x;
        let cy = top;
        chips.forEach((text) => {
            const w = Math.ceil(measureText(ctx, text, 19, 600)) + 40;
            if (cx > x && cx + w > x + maxWidth) {
                cx = x;
                cy += chipH + gap;
            }
            items.push({ text, x: cx, y: cy, w, h: chipH });
            cx += w + gap;
        });
        return { items, bottom: cy + chipH };
    }

    function layoutScorecardSubject(ctx, subject, nameWidth) {
        let size = 24;
        let lines = [subject.name];
        const sizes = [24, 22, 20];
        let fitted = false;
        for (const candidate of sizes) {
            if (measureText(ctx, subject.name, candidate, 700) <= nameWidth) {
                size = candidate;
                fitted = true;
                break;
            }
        }
        if (!fitted) {
            size = 20;
            lines = wrapLines(ctx, subject.name, nameWidth, size, 700);
            if (lines.length > 2) {
                lines = lines.slice(0, 2);
                lines[1] = ellipsize(ctx, `${lines[1].replace(/\s+$/, "")}\u2026`, nameWidth, size, 700);
            }
        }
        const lineHeight = Math.round(size * 1.28);
        const blockHeight = lines.length * lineHeight + (subject.qualifyingOnly ? 34 : 0);
        const failed = String(subject.passingStatus || "").toLowerCase() === "fail";
        return { subject, size, lines, lineHeight, blockHeight, height: Math.max(88, blockHeight + 44), failed, top: 0 };
    }

    function buildScorecardModel(snapshot) {
        const data = snapshot.resultData || {};
        const payload = snapshot.payload || {};
        const exam = snapshot.exam || {};
        const examName = firstValue(payload.examName, snapshot.examName, data.examName, snapshot.exam?.examName, "Rank Prediction Result");
        const rawMarks = firstValue(data.rawMarks, data.marks, payload.rawMarks, null);
        const normalizedMarks = getNormalizedMarks(snapshot, rawMarks);
        const rankSets = getRankSets(data);
        const normalizedBasis = normalizeRankBasis(data.rankBasis) === "normalized" && Boolean(rankSets.normalized);
        const activeRanks = normalizedBasis ? rankSets.normalized : rankSets.raw || rankSets.normalized || {};
        const subjects = getScorecardSubjects(data.subjectAnalysis, payload.subjectData, data.subjectData).slice(0, 7);
        const failedSubjects = Array.isArray(data.failedSubjects) ? data.failedSubjects : [];
        const isNotQualified = data.isQualified === false || String(data.qualificationStatus || "").toLowerCase() === "not qualified" || failedSubjects.length > 0;
        const hasShifts = getHasShifts(snapshot, data);

        const maxMarks = getScoringTotalQuestions(exam) * toNumber(exam.marksPerCorrect);
        const marksValue = toNumber(firstValue(normalizedMarks, rawMarks, null));
        const totalSubmissionsRaw = firstValue(data.totalSubmissions, data.total, data.submissions, payload.totalSubmissions, null);
        const rollNumber = formatPlain(firstValue(payload.rollNumber, data.rollNumber, "Not available"));

        const chips = [];
        const addChip = (value) => {
            if (!isMissing(value) && String(value).trim().toLowerCase() !== "none") chips.push(String(value).trim());
        };
        addChip(payload.category);
        addChip(payload.state);
        if (hasShifts && !isMissing(payload.shift)) addChip(/^shift/i.test(String(payload.shift)) ? payload.shift : `Shift ${payload.shift}`);
        addChip(formatExamDate(payload.examDate));
        addChip(payload.horizontalCategory);

        const groupRanks = [
            { label: "Category rank", value: formatRank(activeRanks.categoryRank) },
            { label: "State rank", value: formatRank(activeRanks.stateRank) }
        ];
        if (hasShifts) groupRanks.push({ label: "Shift rank", value: formatRank(activeRanks.shiftRank) });

        const now = new Date();
        return {
            examName,
            chips,
            rollNumber,
            rollNumberMasked: maskRollNumber(rollNumber),
            overallRank: formatRank(activeRanks.overallRank),
            groupRanks,
            marks: formatMarks(firstValue(normalizedMarks, rawMarks, null)),
            maxMarksText: Number.isFinite(maxMarks) && maxMarks > 0 && (!Number.isFinite(marksValue) || marksValue <= maxMarks) ? String(round2(maxMarks)) : "",
            percentile: formatPercentile(data.percentile),
            percentileValue: toNumber(String(firstValue(data.percentile, "")).replace("%", "")),
            totalSubmissions: formatCount(totalSubmissionsRaw),
            totalSubmissionsNumber: toNumber(totalSubmissionsRaw),
            rankBasisLabel: normalizedBasis ? "Normalised marks" : "Raw marks",
            isNotQualified,
            qualificationStatus: isNotQualified ? "Not eligible for merit rank" : firstValue(data.qualificationStatus, "Qualified"),
            qualificationMessage: firstValue(data.qualificationMessage, isNotQualified ? "Qualifying criteria was not met." : "Qualifying criteria met."),
            failedTitle: failedSubjects.length ? formatScorecardFailureTitle(failedSubjects[0]) : "",
            failedDetail: failedSubjects.length ? formatScorecardFailureDetail(failedSubjects[0]) : "",
            subjects,
            showStatus: subjects.some((subject) => Boolean(subject.passingStatus)),
            generatedDate: now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            generatedAt: now.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })
        };
    }

    function maskRollNumber(value) {
        const text = String(value || "").trim();
        if (!SCORECARD_MASK_ROLL || text.length < 7 || /^not available$/i.test(text)) return text;
        return `${text.slice(0, 3)}${"\u2022".repeat(text.length - 6)}${text.slice(-3)}`;
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
                maxMarks: subject.maxMarks,
                accuracy: getSubjectAccuracy(subject),
                qualifyingOnly: isQualifyingOnlySubject(subject)
            }));
        return rows.map((subject) => {
            const accuracyValue = toNumber(String(firstValue(subject.accuracy, "")).replace("%", ""));
            const maxMarks = toNumber(subject.maxMarks);
            return {
                name: String(firstValue(subject.name, "Subject")),
                score: formatMarks(firstValue(subject.score, subject.marks, null)),
                maxMarksText: Number.isFinite(maxMarks) && maxMarks > 0 ? String(round2(maxMarks)) : "",
                accuracyValue,
                accuracyText: Number.isFinite(accuracyValue) ? `${Math.round(accuracyValue * 10) / 10}%` : "\u2014",
                qualifyingOnly: Boolean(subject.qualifyingOnly),
                passingStatus: firstValue(subject.passingStatus, getPassingStatus(subject), null)
            };
        });
    }

    function drawScorecardLogo(ctx, image, x, y, size) {
        fillRoundRect(ctx, x, y, size, size, Math.round(size * 0.22), "#ffffff");
        if (!image) {
            drawText(ctx, "GJU", x + size / 2, y + size * 0.62, size * 0.3, 800, SCORECARD_COLORS.blue, "center");
            return;
        }
        const inset = Math.round(size * 0.09);
        drawImageContain(ctx, image, x + inset, y + inset, size - inset * 2, size - inset * 2);
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

    function drawSectionHeading(ctx, text, x, baseline) {
        fillRoundRect(ctx, x, baseline - 21, 6, 26, 3, SCORECARD_COLORS.blue);
        drawLabel(ctx, text, x + 20, baseline, 19, 800, SCORECARD_COLORS.ink);
    }

    function fontString(size, weight) {
        return `${weight || 700} ${size}px ${SCORECARD_FONT}`;
    }

    function drawText(ctx, text, x, y, size, weight, color, align) {
        ctx.fillStyle = color;
        ctx.font = fontString(size, weight);
        ctx.textAlign = align || "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(String(text === undefined || text === null ? "" : text), x, y);
        ctx.textAlign = "left";
    }

    function drawLabel(ctx, text, x, y, size, weight, color, align) {
        ctx.save();
        if ("letterSpacing" in ctx) ctx.letterSpacing = "1.6px";
        drawText(ctx, String(text).toUpperCase(), x, y, size, weight, color, align);
        ctx.restore();
    }

    function measureText(ctx, text, size, weight) {
        ctx.font = fontString(size, weight);
        return ctx.measureText(String(text === undefined || text === null ? "" : text)).width;
    }

    function measureLabel(ctx, text, size, weight) {
        ctx.save();
        if ("letterSpacing" in ctx) ctx.letterSpacing = "1.6px";
        const width = measureText(ctx, String(text).toUpperCase(), size, weight);
        ctx.restore();
        return width;
    }

    function drawFittedText(ctx, text, x, y, maxWidth, maxSize, minSize, weight, color) {
        const value = String(text === undefined || text === null ? "" : text);
        let size = maxSize;
        while (size > minSize && measureText(ctx, value, size, weight) > maxWidth) size -= 1;
        const shown = measureText(ctx, value, size, weight) > maxWidth ? ellipsize(ctx, value, maxWidth, size, weight) : value;
        drawText(ctx, shown, x, y, size, weight, color);
        return size;
    }

    function ellipsize(ctx, text, maxWidth, size, weight) {
        let value = String(text);
        if (measureText(ctx, value, size, weight) <= maxWidth) return value;
        while (value.length > 1 && measureText(ctx, `${value}\u2026`, size, weight) > maxWidth) value = value.slice(0, -1);
        return `${value.replace(/[\s\u2026]+$/, "")}\u2026`;
    }

    function wrapLines(ctx, text, maxWidth, size, weight) {
        const words = String(text || "").trim().split(/\s+/).filter(Boolean);
        const lines = [];
        let line = "";
        const pushLong = (word) => {
            let chunk = "";
            Array.from(word).forEach((char) => {
                if (measureText(ctx, chunk + char, size, weight) > maxWidth && chunk) {
                    lines.push(chunk);
                    chunk = char;
                } else {
                    chunk += char;
                }
            });
            return chunk;
        };
        words.forEach((word) => {
            const next = line ? `${line} ${word}` : word;
            if (measureText(ctx, next, size, weight) <= maxWidth) {
                line = next;
                return;
            }
            if (line) lines.push(line);
            line = measureText(ctx, word, size, weight) > maxWidth ? pushLong(word) : word;
        });
        if (line) lines.push(line);
        return lines.length ? lines : [""];
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

    function topRoundedRectPath(ctx, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height);
        ctx.beginPath();
        ctx.moveTo(x, y + height);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.lineTo(x + width - r, y);
        ctx.arcTo(x + width, y, x + width, y + r, r);
        ctx.lineTo(x + width, y + height);
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