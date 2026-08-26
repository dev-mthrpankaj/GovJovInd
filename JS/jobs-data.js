// File-based job data entry layer.
// Existing jobs are preserved in jobs-data.generated.js; manual/current entries are added here.
(function () {
    function loadGeneratedJobs() {
        try {
            var currentSrc = document.currentScript && document.currentScript.src
                ? document.currentScript.src
                : new URL('../JS/jobs-data.js', window.location.href).href;
            var generatedUrl = new URL('jobs-data.generated.js', currentSrc).href;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', generatedUrl, false);
            xhr.send(null);

            if (xhr.status >= 200 && xhr.status < 300) {
                var source = xhr.responseText || '';
                var match = source.match(/window\.GovJobUpdatesJobs\s*=\s*(\[[\s\S]*\])\s*;?\s*$/);
                if (match && match[1]) {
                    return JSON.parse(match[1]);
                }
            }
        } catch (error) {
            console.error('Unable to load generated jobs data:', error);
        }
        return [];
    }

    var jobs = loadGeneratedJobs();
    var entry = {
        "id": "job-iocl-executives-cbt-2026",
        "title": "IOCL Executives CBT Online Form 2026 for 470 Post",
        "organization": "Indian Oil Corporation Limited (IOCL)",
        "department": "IOCL",
        "category": "Public Sector",
        "year": "2026",
        "qualification": "B.E. / B.Tech / equivalent engineering degree with required marks as per the official IOCL advertisement. Computer Science & IT has 22 Grade A vacancies. Read the official notification for discipline-wise eligibility.",
        "totalPosts": "470",
        "startDate": "2026-08-14",
        "lastDate": "2026-09-03",
        "status": "active",
        "tags": [
            "IOCL Recruitment 2026",
            "IOCL Executives CBT 2026",
            "Computer Science and IT",
            "PSU Jobs",
            "Engineering Jobs"
        ],
        "applyLink": "https://iocl.com/latest-job-opening",
        "officialNotification": "https://iocl.com/latest-job-opening",
        "detailPage": "../HTML/student-hub/iocl-computer-science-preparation-2026.html",
        "updatedAt": "2026-08-26",
        "telegramStatus": "ready",
        "telegramReady": "yes",
        "needsReview": "no",
        "qualificationSource": "qualification",
        "detailPageSource": "manual",
        "detailPageNeedsReview": "no"
    };

    if (!jobs.some(function (job) { return job && job.id === entry.id; })) {
        jobs.unshift(entry);
    }

    window.GovJobUpdatesJobs = jobs;
})();
