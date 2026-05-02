// Paste Google Apps Script Web App URL in apiUrl, not Google Sheet link.
// Keep the Google Sheet ID inside GoogleAppsScript/rank-predictor-Code.gs only.
window.RANK_PREDICTOR_CONFIG = {
    apiUrl: "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
    exams: [
        {
            examId: "demo-exam",
            examName: "GovJobUpdates Demo Exam",
            sheetName: "Demo Exam",
            supportedModes: ["offline", "online"],
            totalQuestions: 100,
            marksPerCorrect: 1,
            negativeMarking: 0.25,
            categories: ["General", "OBC", "EWS", "SC", "ST"],
            states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Other"]
        },
        {
            examId: "up-police-si-2025",
            examName: "UP Police SI 2025",
            sheetName: "UP Police SI 2025",
            supportedModes: ["offline", "online"],
            totalQuestions: 100,
            marksPerCorrect: 1,
            negativeMarking: 0.25,
            categories: ["General", "OBC", "EWS", "SC", "ST"],
            states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Other"]
        },
        {
            examId: "ssc-gd-2025",
            examName: "SSC GD 2025",
            sheetName: "SSC GD 2025",
            supportedModes: ["online"],
            totalQuestions: 80,
            marksPerCorrect: 2,
            negativeMarking: 0.25,
            categories: ["General", "OBC", "EWS", "SC", "ST"],
            states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"]
        }
    ]
};
