(function () {
    "use strict";

    window.GovJobUpdatesSheetConfig = {
        // Public listing pages now use fast static JS data files.
        // Google Sheet data is synced into JS/*-data.js by GitHub Actions.
        // Keep this blank to avoid slow live Apps Script requests in visitors' browsers.
        apiUrl: "",
        cacheMinutes: 5,
        timeoutMs: 3000
    };
}());
