/*
 * Sheet provider: TCS iON / Digialm response sheets (RRB, many SSC/State exams, etc.).
 * The whole response sheet is one page, so the bookmark just sends the page that is open.
 * collect() is copied into the bookmark and runs on the exam site: keep it self-contained.
 * Parsing happens on the server: rank-api/parse-response.php
 */
(function () {
    "use strict";
    var list = (window.GovJobSheetProviders = window.GovJobSheetProviders || []);
    list.push({
        id: "tcs-ion",
        hosts: "(^|\\.)(digialm|tcsion)\\.com$",
        collect: async function () {
            return [document.documentElement.outerHTML];
        }
    });
}());
