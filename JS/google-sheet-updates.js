(function () {
    "use strict";

    const TYPE_KEYS = {
        jobs: "jobs",
        admitCards: "admitCards",
        results: "results",
        answerKeys: "answerKeys"
    };

    function getConfig() {
        return window.GovJobUpdatesSheetConfig || {};
    }

    function getApiUrl() {
        return String(getConfig().apiUrl || "").trim();
    }

    function getCacheMinutes() {
        const minutes = Number(getConfig().cacheMinutes);
        return Number.isFinite(minutes) && minutes >= 0 ? minutes : 5;
    }

    function getTimeoutMs() {
        const timeout = Number(getConfig().timeoutMs);
        return Number.isFinite(timeout) && timeout > 0 ? timeout : 8000;
    }

    function getCacheKey(type) {
        return `gju-sheet-updates:${type}:${getApiUrl()}`;
    }

    function readCache(type) {
        const cacheMinutes = getCacheMinutes();
        if (!cacheMinutes || !window.sessionStorage) return null;

        try {
            const cached = JSON.parse(sessionStorage.getItem(getCacheKey(type)) || "null");
            if (!cached || !Array.isArray(cached.items) || !cached.savedAt) return null;
            const ageMs = Date.now() - Number(cached.savedAt);
            return ageMs <= cacheMinutes * 60 * 1000 ? cached.items : null;
        } catch {
            return null;
        }
    }

    function writeCache(type, items) {
        if (!getCacheMinutes() || !window.sessionStorage) return;
        try {
            sessionStorage.setItem(getCacheKey(type), JSON.stringify({
                savedAt: Date.now(),
                items
            }));
        } catch {
            // Cache is optional; page rendering should not depend on it.
        }
    }

    function buildUrl(type) {
        const apiUrl = getApiUrl();
        if (!apiUrl) return "";
        const url = new URL(apiUrl, window.location.href);
        url.searchParams.set("type", type);
        url.searchParams.set("_ts", String(Date.now()));
        return url.toString();
    }

    async function fetchWithTimeout(url) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), getTimeoutMs());
        try {
            const response = await fetch(url, {
                method: "GET",
                cache: "no-store",
                redirect: "follow",
                signal: controller.signal
            });
            if (!response.ok) throw new Error("Sheet API request failed.");
            return response.json();
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    async function load(type, fallbackItems = []) {
        const key = TYPE_KEYS[type];
        const fallback = Array.isArray(fallbackItems) ? fallbackItems : [];
        const apiUrl = getApiUrl();
        if (!key || !apiUrl) return fallback;

        const cached = readCache(key);
        if (cached) return cached;

        try {
            const payload = await fetchWithTimeout(buildUrl(key));
            const items = Array.isArray(payload?.[key]) ? payload[key] : Array.isArray(payload?.items) ? payload.items : [];
            if (!items.length) return fallback;
            writeCache(key, items);
            return items;
        } catch {
            return fallback;
        }
    }

    window.GovJobUpdatesSheetData = {
        load
    };
}());
