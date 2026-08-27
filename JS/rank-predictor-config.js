// Paste Google Apps Script Web App URL in apiUrl, not Google Sheet link.
// Use the deployed HTTPS /exec URL. Do not use the /dev URL.
// Keep the Google Sheet ID inside GoogleAppsScript/rank-predictor-Code.gs only.
const RANK_PREDICTOR_CONFIG = {
    apiBaseUrl: "https://test.govjobupdates.com/live-test/rank-api",
    apiUrl: "https://script.google.com/macros/s/AKfycbyM6Xq_fq0axcmTvMTG3Xx0Dwy9h7wSbUDqsO7EvULeGLm0SAVWO0OrkmEEtKh_QBbE/exec",
    examLoadTimeoutMs: 8000,
    exams: [
        {
            examId: "rrb-je-cbt-2-2026",
            examName: "RRB Junior Engineer JE CBT-2",
            board: "RRB",
            examType: "online",
            sheetName: "RRB Junior Engineer JE CBT-2",
            totalQuestions: 150,
            marksPerCorrect: 1,
            negativeMarking: 0.33,
            hasShifts: false,
            normalization: false,
            supportedModes: ["online"],
            subjects: [
                { name: "General Awareness", questions: 15 },
                { name: "Physics and Chemistry", questions: 15 },
                { name: "Basics of computer and Applications", questions: 10 },
                { name: "Basics of Environment and Pollution Control", questions: 10 },
                { name: "Technical Abilities", questions: 100 }
            ],
            subjectPassingCriteria: [],
            categories: ["UR", "OBC", "EWS", "SC", "ST"],
            horizontalCategories: ["None", "EX SM", "OH", "VH", "HH", "Other PWD"],
            states: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"]
        },
        {
            examId: "up-homeguard-2026",
            examName: "Uttar Pradesh Home Guard 2026",
            board: "UPPRPB",
            examType: "online",
            sheetName: "UP Home Guard 2026",
            totalQuestions: 100,
            marksPerCorrect: 1,
            negativeMarking: 0,
            hasShifts: true,
            normalization: true,
            supportedModes: ["offline"],
            subjects: [
                { name: "General Awareness", questions: 100 },
                
            ],
            subjectPassingCriteria: [],
            categories: ["UR", "OBC", "EWS", "SC", "ST"],
            horizontalCategories: ["None", "Ex-Serviceman"],
            states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"]
        },
        {
            examId: "ssc-cpo-2025-paper-1",
            examName: "SSC CPO 2025 Paper 1",
            board: "Staff Selection Commission",
            examType: "online",
            sheetName: "SSC CPO 2025 Paper 1",
            totalQuestions: 200,
            marksPerCorrect: 1,
            negativeMarking: 0.25,
            hasShifts: true,
            normalization: true,
            supportedModes: ["online"],
            subjects: [
                { name: "Maths", questions: 50 },
                { name: "Reasoning", questions: 50 },
                { name: "English", questions: 50 },
                { name: "General Awareness", questions: 50 }
            ],
            subjectPassingCriteria: [],
            categories: ["UR", "OBC", "EWS", "SC", "ST"],
            horizontalCategories: ["None", "Ex-Serviceman"],
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
            hasShifts: true,
            normalization: true,
            supportedModes: ["online"],
            subjects: [
                { name: "Maths", questions: 25 },
                { name: "Reasoning", questions: 25 },
                { name: "English", questions: 25 },
                { name: "General Awareness", questions: 25 }
            ],
            subjectPassingCriteria: [],
            categories: ["UR", "OBC", "EWS", "SC", "ST"],
            horizontalCategories: ["None", "PwD", "Ex-Serviceman"],
            states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"]
        },
        {
            examId: "up-police-si-2025",
            examName: "UP Police SI 2025",
            board: "UPPRPB",
            examType: "offline",
            sheetName: "UP Police SI 2025",
            totalQuestions: 160,
            marksPerCorrect: 1,
            negativeMarking: 0,
            hasShifts: true,
            normalization: true,
            supportedModes: ["offline"],
            subjects: [
                { name: "Maths", questions: 40 },
                { name: "Reasoning", questions: 40 },
                { name: "English", questions: 40 },
                { name: "General Awareness", questions: 40 }
            ],
            subjectPassingCriteria: [],
            categories: ["UR", "OBC", "EWS", "SC", "ST"],
            horizontalCategories: ["None"],
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
            hasShifts: false,
            normalization: false,
            supportedModes: [],
            subjects: [],
            subjectPassingCriteria: [],
            categories: [],
            horizontalCategories: [],
            states: [],
            disabled: true
        }
    ]
};

window.RANK_PREDICTOR_CONFIG = RANK_PREDICTOR_CONFIG;
