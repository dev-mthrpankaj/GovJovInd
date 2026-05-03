// Paste Google Apps Script Web App URL in apiUrl, not Google Sheet link.
// Use the deployed HTTPS /exec URL. Do not use the /dev URL.
// Keep the Google Sheet ID inside GoogleAppsScript/rank-predictor-Code.gs only.
const RANK_PREDICTOR_CONFIG = {
    apiUrl: "https://script.google.com/macros/s/AKfycbM6Xq_fq0axcmTvMTG3Xx0Dwy9h7wSbUDqsO7EvULeGLm0SAVWO0OrkmEEtKh_QBbE/exec",
    exams: [
        {
            examId: "ssc-cpo-2025-paper-1",
            examName: "SSC CPO 2025 Paper 1",
            board: "Staff Selection Commission",
            examType: "online",
            sheetName: "SSC CPO 2025 Paper 1",
            totalQuestions: 200,
            marksPerCorrect: 1,
            negativeMarking: 0.25,
            normalization: true,
            supportedModes: ["online"],
            stages: ["Paper 1"],
            shifts: ["2025-06-27 Shift 1", "2025-06-27 Shift 2", "2025-06-28 Shift 1", "2025-06-28 Shift 2"],
            categories: ["UR", "OBC", "EWS", "SC", "ST", "Ex-Serviceman"],
            states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"]
        },
        {
            examId: "ssc-cgl-2025-tier-1",
            examName: "SSC CGL 2025 Tier 1",
            board: "Staff Selection Commission",
            examType: "online",
            sheetName: "SSC CGL 2025 Tier 1",
            totalQuestions: 100,
            marksPerCorrect: 2,
            negativeMarking: 0.5,
            normalization: true,
            supportedModes: ["online"],
            stages: ["Tier 1"],
            shifts: [],
            categories: ["UR", "OBC", "EWS", "SC", "ST", "PwD", "Ex-Serviceman"],
            states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"]
        },
        {
            examId: "up-police-si-2025",
            examName: "UP Police SI 2025",
            board: "UPPRPB",
            examType: "offline",
            sheetName: "UP Police SI 2025",
            totalQuestions: 100,
            marksPerCorrect: 1,
            negativeMarking: 0.25,
            normalization: false,
            supportedModes: ["offline"],
            stages: ["Written Exam"],
            shifts: ["Single Shift"],
            categories: ["UR", "OBC", "EWS", "SC", "ST"],
            states: ["Uttar Pradesh", "Other"]
        },
        {
            examId: "coming-soon",
            examName: "Add Exam Coming Soon",
            board: "GovJobUpdates",
            examType: "coming-soon",
            sheetName: "",
            totalQuestions: 0,
            marksPerCorrect: 0,
            negativeMarking: 0,
            normalization: false,
            supportedModes: [],
            stages: [],
            shifts: [],
            categories: [],
            states: [],
            disabled: true
        }
    ]
};

window.RANK_PREDICTOR_CONFIG = RANK_PREDICTOR_CONFIG;
