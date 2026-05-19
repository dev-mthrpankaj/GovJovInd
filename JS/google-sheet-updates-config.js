(function () {
    "use strict";

    window.GovJobUpdatesSheetConfig = {
        // Public pages intentionally do not call Google Sheet live.
        // Static listing data is synced into JS/*-data.js by GitHub Actions.
        apiUrl: "",
        cacheMinutes: 5,
        timeoutMs: 3000
    };
}());