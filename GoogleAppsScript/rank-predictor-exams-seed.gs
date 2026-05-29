const RANK_PREDICTOR_EXAM_SEED_DATA = [
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
      { name: "General Awareness", questions: 100 }
    ],
    subjectPassingCriteria: [],
    categories: ["UR", "OBC", "EWS", "SC", "ST"],
    horizontalCategories: ["None", "Ex-Serviceman"],
    states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"],
    disabled: false
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
    states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"],
    disabled: false
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
    states: ["Uttar Pradesh", "Bihar", "Rajasthan", "Delhi", "Madhya Pradesh", "Other"],
    disabled: false
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
    states: ["Uttar Pradesh", "Other"],
    disabled: false
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
];

function seedRankPredictorExamsFromConfig() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getRankExamSheet(spreadsheet);
  ensureRankExamSheetSchema(sheet);

  const existingIds = getExistingRankExamSeedIds(sheet);
  const rowsToAppend = [];

  RANK_PREDICTOR_EXAM_SEED_DATA.forEach(function (exam, index) {
    const id = String(exam.examId || "").trim();
    if (id && existingIds[id]) return;
    rowsToAppend.push(buildRankExamSeedRow(exam, index + 1));
    if (id) existingIds[id] = true;
  });

  if (rowsToAppend.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rowsToAppend.length, RANK_EXAM_HEADERS.length).setValues(rowsToAppend);
    sheet.autoResizeColumns(1, RANK_EXAM_HEADERS.length);
  }

  return {
    success: true,
    inserted: rowsToAppend.length,
    totalRows: Math.max(sheet.getLastRow() - 1, 0)
  };
}

function getExistingRankExamSeedIds(sheet) {
  const ids = {};
  if (sheet.getLastRow() < 2) return ids;

  const headerMap = buildColumnMapFromHeaders(sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]);
  const idColumnIndex = headerMap[normalizeHeader("Exam ID")];
  if (idColumnIndex === undefined) return ids;

  const idValues = sheet.getRange(2, idColumnIndex + 1, sheet.getLastRow() - 1, 1).getValues();
  idValues.forEach(function (row) {
    const id = String(row[0] || "").trim();
    if (id) ids[id] = true;
  });
  return ids;
}

function buildRankExamSeedRow(exam, order) {
  return [
    "yes",
    order,
    exam.examId,
    exam.examName,
    exam.board,
    exam.examType,
    exam.sheetName,
    exam.totalQuestions,
    exam.marksPerCorrect,
    exam.negativeMarking,
    exam.hasShifts ? "yes" : "no",
    exam.normalization ? "yes" : "no",
    exam.supportedModes.join(", "),
    serializeRankExamSeedSubjects(exam.subjects),
    serializeRankExamSeedPassingCriteria(exam.subjectPassingCriteria || []),
    serializeRankExamSeedOverallCriteria(exam.overallPassingCriteria || null),
    exam.categories.join(", "),
    (exam.horizontalCategories || []).join(", "),
    exam.states.join(", "),
    exam.disabled ? "yes" : "no"
  ];
}

function serializeRankExamSeedSubjects(subjects) {
  return subjects.map(function (subject) {
    return subject.name + ":" + subject.questions;
  }).join(", ");
}

function serializeRankExamSeedPassingCriteria(criteria) {
  return criteria.map(function (item) {
    if (item.minPercentage !== undefined && item.minPercentage !== null && item.minPercentage !== "") {
      return item.name + ":" + item.minPercentage + "%";
    }
    if (item.minCorrect !== undefined && item.minCorrect !== null && item.minCorrect !== "") {
      return item.name + ":" + item.minCorrect + " correct";
    }
    return item.name + ":" + item.minMarks;
  }).join(", ");
}

function serializeRankExamSeedOverallCriteria(criteria) {
  if (!criteria) return "";
  return JSON.stringify(criteria);
}
