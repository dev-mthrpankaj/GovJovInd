(function () {
    "use strict";

    function toBoolean(value, fallback = false) {
        if (typeof value === "boolean") return value;
        if (typeof value === "number") return value !== 0;
        const text = String(value ?? "").trim().toLowerCase();
        if (["yes", "y", "true", "1", "active", "enabled"].includes(text)) return true;
        if (["no", "n", "false", "0", "inactive", "disabled", ""].includes(text)) return false;
        return fallback;
    }

    function normalizeExamFlags(exam) {
        if (!exam || typeof exam !== "object") return exam;
        return {
            ...exam,
            hasShifts: toBoolean(exam.hasShifts, false),
            normalization: toBoolean(exam.normalization, false),
            disabled: toBoolean(exam.disabled, false)
        };
    }

    function isVisibleExam(exam) {
        return exam && !toBoolean(exam.disabled, false);
    }

    function cleanExamList(exams) {
        if (!Array.isArray(exams)) return [];
        return exams.map(normalizeExamFlags).filter(isVisibleExam);
    }

    function cleanLocalConfig() {
        if (!window.RANK_PREDICTOR_CONFIG || !Array.isArray(window.RANK_PREDICTOR_CONFIG.exams)) return;
        window.RANK_PREDICTOR_CONFIG.exams = cleanExamList(window.RANK_PREDICTOR_CONFIG.exams);
    }

    function patchFetchForSheetExams() {
        if (window.__GJU_RANK_PREDICTOR_SHEET_FILTER__) return;
        window.__GJU_RANK_PREDICTOR_SHEET_FILTER__ = true;

        const originalFetch = window.fetch?.bind(window);
        if (!originalFetch) return;

        window.fetch = async function filteredRankPredictorFetch(input, init) {
            const response = await originalFetch(input, init);
            let url = "";
            try {
                url = typeof input === "string" ? input : input?.url || "";
            } catch {
                url = "";
            }

            if (!url || !url.includes("type=exams")) return response;

            const cloned = response.clone();
            return new Response(await cloned.text(), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });
        };

        const originalJson = Response.prototype.json;
        if (Response.prototype.__GJU_RANK_JSON_PATCHED__) return;
        Response.prototype.__GJU_RANK_JSON_PATCHED__ = true;

        Response.prototype.json = async function patchedJson() {
            const payload = await originalJson.call(this);
            if (payload && Array.isArray(payload.exams)) {
                payload.exams = cleanExamList(payload.exams);
            }
            return payload;
        };
    }

    cleanLocalConfig();
    patchFetchForSheetExams();
}());
