/*
 * Loaded by the short bookmark (see rank-sheet-autofill.js, shortBookmarkletCode). Runs on the exam website, in the
 * candidate's own browser: reads the response sheet there and sends it to the GovJobUpdates tab opened by the bookmark.
 * Exam-site specific readers live in JS/sheet-providers/*.js.
 */
(function () {
    "use strict";

    var SELF = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
    var BASE = SELF.replace(/[?#].*$/, "").replace(/[^/]+$/, "");
    var VERSION = (SELF.match(/[?&]v=[^&#]*/) || [""])[0].replace(/^&/, "?");

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = function () { reject(new Error("load failed")); };
            document.head.appendChild(script);
        });
    }

    window.gjuRun = function (target) {
        if (!target) {
            alert("Please allow pop-ups for this page and try again.");
            return;
        }
        var ready = false;
        var data = null;
        var timer = setTimeout(function () {
            if (!ready) alert("Could not reach GovJobUpdates. Please keep that tab open and try again.");
        }, 25000);

        function send() {
            if (ready && data) {
                clearTimeout(timer);
                target.postMessage({ type: "gju-sheet", parts: data, url: location.href }, "*");
            }
        }

        window.addEventListener("message", function (event) {
            if (event.source === target && event.data && event.data.type === "gju-sheet-ready") {
                ready = true;
                send();
            }
        });

        loadScript(BASE + "sheet-providers/ssc-cbexams.js" + VERSION)
            .then(function () { return loadScript(BASE + "sheet-providers/tcs-ion.js" + VERSION); })
            .then(function () {
                var providers = window.GovJobSheetProviders || [];
                var match = null;
                for (var i = 0; i < providers.length; i++) {
                    if (new RegExp(providers[i].hosts, "i").test(location.hostname)) { match = providers[i]; break; }
                }
                if (!match) throw new Error("unsupported");
                return match.collect();
            })
            .then(function (parts) { data = parts; send(); })
            .catch(function () {
                clearTimeout(timer);
                alert("Could not read this page. Open your response sheet page first, or use the copy and paste option on GovJobUpdates.");
            });
    };
}());