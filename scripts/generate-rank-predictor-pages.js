const fs = require("fs");
const https = require("https");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "JS", "rank-predictor-exams-data.js");
const configPath = path.join(root, "JS", "rank-predictor-config.js");
const templatePath = path.join(root, "rank-predictor", "rrb-je", "index.html");
const baseUrl = "https://govjobupdates.com";
const defaultApiBaseUrl = "https://test.govjobupdates.com/live-test/rank-api";
const requestTimeoutMs = 10000;

const pageOverrides = {
  "rssb-ldc-jra-bb6-2026": "rssb-ldc",
  "rrb-je-cbt-2-2026": "rrb-je"
};

const displayNameOverrides = {
  "rrb-alp-cbt-2": "RRB ALP CBT 2",
  "rssb-forester-2026": "RSSB Forester 2026",
  "rrb-ntpc-gl-cbt-2-2026": "RRB NTPC Graduate Level CBT 2",
  "mpesb-HospitalAssistant-2026": "MPESB Hospital Assistant 2026",
  "uppsc-atp-2026": "UPPSC Assistant Town Planner 2026",
  "ssb-hcm-2026": "SSB Head Constable Ministerial 2026"
};

const template = fs.readFileSync(templatePath, "utf8");

function getArgValue(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length).trim() : "";
}

function getConfiguredApiBaseUrl() {
  const cliValue = getArgValue("api-base");
  if (cliValue) return cliValue;
  const envValue = String(process.env.RANK_PREDICTOR_API_BASE || "").trim();
  if (envValue) return envValue;

  try {
    const configSource = fs.readFileSync(configPath, "utf8");
    const match = configSource.match(/apiBaseUrl\s*:\s*["']([^"']+)["']/);
    return match ? match[1].trim() : defaultApiBaseUrl;
  } catch (error) {
    return defaultApiBaseUrl;
  }
}

function isValidApiBaseUrl(value) {
  return /^https:\/\/[^?#]+\/rank-api\/?$/i.test(String(value || "").trim());
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "GovJobUpdates rank page generator"
      },
      timeout: requestTimeoutMs
    }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error("Invalid JSON response"));
        }
      });
    });

    request.on("timeout", () => {
      request.destroy(new Error(`Request timed out after ${requestTimeoutMs}ms`));
    });
    request.on("error", reject);
  });
}

async function loadBackendExams() {
  const apiBaseUrl = getConfiguredApiBaseUrl().replace(/\/+$/, "");
  if (!isValidApiBaseUrl(apiBaseUrl)) {
    throw new Error(`Invalid rank API base URL: ${apiBaseUrl || "(empty)"}`);
  }

  const payload = await fetchJson(`${apiBaseUrl}/exams.php?_ts=${Date.now()}`);
  if (!payload || payload.success !== true || !Array.isArray(payload.exams)) {
    throw new Error("Rank API did not return an exams array");
  }
  return payload.exams;
}

function loadLocalExams() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(dataPath, "utf8"), context);
  return context.window.GovJobUpdatesRankPredictorExams || [];
}

function normalizeGeneratorExams(exams) {
  const seen = new Set();
  return (Array.isArray(exams) ? exams : [])
    .filter((exam) => exam && !exam.disabled && exam.examId && exam.examName)
    .filter((exam) => {
      const id = text(exam.examId);
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
}

async function loadExams() {
  if (process.argv.includes("--local")) {
    return { source: "local", exams: normalizeGeneratorExams(loadLocalExams()) };
  }

  try {
    const exams = normalizeGeneratorExams(await loadBackendExams());
    if (exams.length) return { source: "backend", exams };
    throw new Error("Rank API returned no usable exams");
  } catch (error) {
    console.warn(`Backend exam load failed: ${error.message}`);
    console.warn("Falling back to JS/rank-predictor-exams-data.js");
    return { source: "local", exams: normalizeGeneratorExams(loadLocalExams()) };
  }
}

function text(value) {
  return String(value || "").trim();
}

function slugify(value) {
  return text(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "exam";
}

function escapeHtml(value) {
  return text(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function scriptJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function titleCase(value) {
  return text(value)
    .toLowerCase()
    .split(/\s+/)
    .map((word) => {
      if (/^(rrb|rssb|ssc|cgl|cpo|alp|ntpc|je|cbt|mpesb|uppsc|ssb|hcm|upsssc|ldc|jra|ur|obc|ews|sc|st)$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getDir(exam) {
  return pageOverrides[exam.examId] || slugify(exam.examId);
}

function getDisplayName(exam) {
  return displayNameOverrides[exam.examId] || titleCase(exam.examName);
}

function getShortName(exam) {
  const name = getDisplayName(exam).replace(/\s+/g, " ").trim();
  return name.length > 56 ? name.slice(0, 53).replace(/\s+\S*$/, "") + "..." : name;
}

function getRankTitle(shortName) {
  return /\b20\d{2}\b/.test(shortName)
    ? `${shortName} Rank Predictor`
    : `${shortName} Rank Predictor 2026`;
}

function getPageUrl(exam) {
  return `${baseUrl}/rank-predictor/${getDir(exam)}/`;
}

function getDescription(exam) {
  const name = getShortName(exam).replace(/\.\.\.$/, "");
  return `Check expected ${name} rank, category rank and marks with the exam-specific GovJobUpdates rank predictor form.`;
}

function getModeText(exam) {
  const modes = Array.isArray(exam.supportedModes) && exam.supportedModes.length
    ? exam.supportedModes.map((mode) => String(mode).toUpperCase()).join(", ")
    : text(exam.examType).toUpperCase() || "Exam";
  return `${modes}${exam.hasShifts ? " with shift details" : ""}`;
}

function buildJsonLd(exam) {
  const name = getDisplayName(exam);
  const shortName = getShortName(exam);
  const url = getPageUrl(exam);
  const description = getDescription(exam);
  return {
    webpage: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: getRankTitle(shortName),
      url,
      description,
      publisher: {
        "@type": "Organization",
        name: "GovJobUpdates",
        url: `${baseUrl}/`
      }
    },
    webapp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${shortName} Rank Predictor`,
      url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      description: `Exam-specific rank estimation tool for ${name} candidates.`,
      publisher: {
        "@type": "Organization",
        name: "GovJobUpdates",
        url: `${baseUrl}/`
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR"
      }
    },
    howto: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HowTo",
          name: `How to use ${shortName} Rank Predictor`,
          description: `Steps to submit ${name} marks and attempts for expected rank estimation.`,
          step: [
            { "@type": "HowToStep", position: 1, name: "Open exam page", text: `Use the dedicated ${name} Rank Predictor page where the exam setup is already selected.` },
            { "@type": "HowToStep", position: 2, name: "Enter candidate details", text: "Add roll number, mobile number, date of birth, category, gender and state or district for private lookup." },
            { "@type": "HowToStep", position: 3, name: "Enter exam details", text: "Fill exam date, shift if applicable, and mode details." },
            { "@type": "HowToStep", position: 4, name: "Enter subject attempts", text: "Use the official answer key or response sheet to enter subject-wise attempted, correct and wrong answers." },
            { "@type": "HowToStep", position: 5, name: "Review and submit", text: "Check expected marks, accept consent and submit data for rank prediction." }
          ]
        },
        {
          "@type": "HowTo",
          name: `How to check your submitted ${shortName} rank again`,
          description: `Steps to retrieve a previously submitted ${name} rank prediction record privately.`,
          step: [
            { "@type": "HowToStep", position: 1, name: "Open Check My Rank", text: "Select the Check My Rank tab on the rank predictor page." },
            { "@type": "HowToStep", position: 2, name: "Use the same details", text: "Enter the same roll number, mobile number and date of birth used during submission." },
            { "@type": "HowToStep", position: 3, name: "View rank result", text: "Submit the lookup form to view the saved expected rank result." }
          ]
        }
      ]
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: `Is ${shortName} predicted rank official?`, acceptedAnswer: { "@type": "Answer", text: "No. It is only an estimate and cannot replace the official result, scorecard, cutoff or merit list." } },
        { "@type": "Question", name: "What is the estimate based on?", acceptedAnswer: { "@type": "Answer", text: "It is based on entered attempt or score information and available user-submitted data for the same exam." } },
        { "@type": "Question", name: "Can the final cutoff differ from this estimate?", acceptedAnswer: { "@type": "Answer", text: "Yes. Final answer keys, normalization, category rules, attendance and official evaluation can change outcomes." } },
        { "@type": "Question", name: "Where should I verify my actual result?", acceptedAnswer: { "@type": "Answer", text: "Use the official recruitment board result portal or published notice for confirmed marks and selection status." } }
      ]
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
        { "@type": "ListItem", position: 2, name: "Rank Predictor", item: `${baseUrl}/HTML/rank-predictor.html` },
        { "@type": "ListItem", position: 3, name: shortName, item: url }
      ]
    }
  };
}

function buildGuide(exam) {
  const name = escapeHtml(getDisplayName(exam));
  const shortName = escapeHtml(getShortName(exam));
  const mode = escapeHtml(getModeText(exam));
  const shift = exam.hasShifts ? "shift rank and normalized comparison where configured" : "overall and category comparison";
  return `<section class="page-guide" id="rankPredictorSeoSupport" aria-labelledby="rankGuideTitle">
            <p class="guide-kicker">${shortName} Rank Guide</p>
            <h2 id="rankGuideTitle">${name} rank, category rank, and marks analysis</h2>
            <p>This page is a dedicated rank predictor for ${name} candidates. The exam setup, total questions, marking scheme, subject-wise attempts, and candidate submissions are used according to this active exam configuration.</p>
            <p>After checking the official answer key or response sheet, enter your right answers, wrong answers, and subject-wise attempted questions. The estimate is useful for comparison, but final results, cutoff marks, merit lists, and selection status should always be verified from the official recruitment board notice.</p>
            <div class="guide-grid">
                <article class="guide-card"><h3>${shortName} attempts</h3><p>Use your answer key or response sheet to match attempted, correct, and wrong answers before submitting.</p></article>
                <article class="guide-card"><h3>${mode} setup</h3><p>The configured subjects, questions, marks per correct answer, and negative marking load automatically for this exam.</p></article>
                <article class="guide-card"><h3>Rank comparison</h3><p>The result can show overall rank, category rank, state or district rank, gender rank, and ${escapeHtml(shift)} when enough submissions are available.</p></article>
                <article class="guide-card"><h3>Accuracy depends on data</h3><p>The estimate depends on genuine candidate submissions for the same exam. Comparison improves as more real entries are added.</p></article>
                <article class="guide-card"><h3>Private rank lookup</h3><p>Roll number, mobile number, and date of birth are not shown publicly. These details are used only to retrieve your saved rank result.</p></article>
                <article class="guide-card"><h3>Official result may differ</h3><p>The official result can differ because of the final answer key, normalization, board rules, cutoff marks, and merit list decisions.</p></article>
            </div>
            <nav class="related-links" aria-label="Rank predictor internal links">
                <h3>Useful pages for rank predictor candidates</h3>
                <a href="${baseUrl}/rank-predictor/${escapeHtml(getDir(exam))}/">${shortName} Rank Predictor</a>
                <a href="${baseUrl}/HTML/rank-predictor.html">All Rank Predictors</a>
                <a href="${baseUrl}/HTML/answer-key.html">Check Answer Keys</a>
                <a href="${baseUrl}/HTML/results.html">Check Official Results</a>
                <a href="${baseUrl}/HTML/quiz.html">Practice Free Quiz</a>
                <a href="${baseUrl}/HTML/latest-jobs.html">Latest Government Jobs</a>
                <a href="${baseUrl}/HTML/student-hub.html">Student Hub Guidance</a>
                <a href="${baseUrl}/HTML/privacy-policy.html">Privacy Policy</a>
                <a href="${baseUrl}/HTML/disclaimer.html">Disclaimer</a>
            </nav>
            <p class="official-note"><strong>Important:</strong> This is a rank estimate for ${name}, not an official result. For final marks, cutoff, normalization, merit lists, and selection notices, check the official board website or notice.</p>
        </section>`;
}

function buildEmbed(exam) {
  const shortName = escapeHtml(getShortName(exam));
  const url = escapeHtml(getPageUrl(exam));
  return `<div class="embed-magnet-container">
    <h3>Want to feature this ${shortName} Rank Predictor on your website?</h3>
    <p>Copy and paste the code below to embed the ${shortName} rank predictor tool on your blog or exam portal:</p>
    
    <div class="embed-code-box">
        <textarea id="embedCodeRank" readonly><iframe src="${url}" width="100%" height="600px" frameborder="0" style="border:1px solid #e2e8f0; border-radius:12px;"></iframe>&#10;<p style="text-align:center; font-family:sans-serif; font-size:14px; margin-top:8px;">${shortName} Rank Predictor powered by <a href="https://govjobupdates.com/" target="_blank" rel="dofollow" style="color:#0056b3; text-decoration:none; font-weight:bold;">GovJobUpdates</a></p></textarea>
        <button onclick="copyEmbedCodeRank()" id="copyBtnRank">Copy Code</button>
    </div>
</div>

<script>
function copyEmbedCodeRank() {
    var copyText = document.getElementById("embedCodeRank");
    var btn = document.getElementById("copyBtnRank");
    if (!copyText || !btn) return;
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    var copied = function () {
        btn.innerText = "Copied!";
        btn.style.backgroundColor = "#28a745";
        setTimeout(function(){
            btn.innerText = "Copy Code";
            btn.style.backgroundColor = "#0056b3";
        }, 3000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText.value).then(copied).catch(function () {
            if (document.execCommand("copy")) copied();
        });
        return;
    }
    if (document.execCommand("copy")) copied();
}
</script>`;
}

function buildFaq(exam) {
  const shortName = escapeHtml(getShortName(exam));
  return `<section class="seo-faq" aria-labelledby="rankFaqTitle">
            <h2 id="rankFaqTitle">${shortName} Rank Predictor FAQs</h2>
            <div class="seo-faq-list">
                <details><summary>Is the ${shortName} predicted rank official?</summary><p>No. It is only an estimate. The official scorecard, cutoff, and merit list will be final only through the official board notice.</p></details>
                <details><summary>What data is the rank estimate based on?</summary><p>The estimate is based on your entered marks or subject attempts and user-submitted data for the same exam.</p></details>
                <details><summary>Can the final cutoff differ from this estimate?</summary><p>Yes. The final answer key, normalization, category rules, attendance, and official evaluation decisions can change the result.</p></details>
                <details><summary>Where should I verify the official result?</summary><p>For final marks, cutoff, shortlist, and selection status, check the official website or result notice of the concerned recruitment board.</p></details>
            </div>
        </section>`;
}

function replaceJsonLd(html, name, data) {
  const pattern = new RegExp(`<script type="application/ld\\+json" data-schema="${name}">[\\s\\S]*?<\\/script>`);
  return html.replace(pattern, `<script type="application/ld+json" data-schema="${name}">${scriptJson(data)}</script>`);
}

function buildPage(exam) {
  const name = getDisplayName(exam);
  const shortName = getShortName(exam);
  const rankTitle = getRankTitle(shortName);
  const title = `${rankTitle} | GovJobUpdates`;
  const description = getDescription(exam);
  const url = getPageUrl(exam);
  const jsonLd = buildJsonLd(exam);
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${escapeHtml(url)}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(title)}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${escapeHtml(url)}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(title)}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(description)}">`);
  html = replaceJsonLd(html, "webpage", jsonLd.webpage);
  html = replaceJsonLd(html, "webapp", jsonLd.webapp);
  html = replaceJsonLd(html, "howto", jsonLd.howto);
  html = replaceJsonLd(html, "faq", jsonLd.faq);
  html = replaceJsonLd(html, "breadcrumb", jsonLd.breadcrumb);
  html = html.replace(/<h1 id="rankPredictorTitle">[\s\S]*?<\/h1>/, `<h1 id="rankPredictorTitle">${escapeHtml(rankTitle)}</h1>`);
  html = html.replace(/<h1 id="rankPredictorTitle">[\s\S]*?<\/h1>\s*<p>[\s\S]*?<\/p>/, `<h1 id="rankPredictorTitle">${escapeHtml(rankTitle)}</h1>\n                <p>Estimate marks, overall rank, category rank, and state or district rank for ${escapeHtml(name)} using live candidate data.</p>`);
  html = html.replace(/<h2>RRB JE exam setup loaded<\/h2>\s*<p>[\s\S]*?<\/p>/, `<h2>${escapeHtml(shortName)} exam setup loaded</h2>\n                <p>${escapeHtml(name)} is auto-selected on this page. You can enter your details directly and check your rank.</p>`);
  html = html.replace(/<section class="page-guide"[\s\S]*?<\/section>\s*\n\s*<div class="embed-magnet-container">[\s\S]*?<script>\s*function copyEmbedCodeRank\(\) \{[\s\S]*?\n<\/script>\s*\n\s*<section class="seo-faq"[\s\S]*?<\/section>/, `${buildGuide(exam)}\n\n${buildEmbed(exam)}\n\n        ${buildFaq(exam)}`);
  html = html.replace(/window\.RANK_PREDICTOR_PAGE_EXAM_ID = "[^"]*";/, `window.RANK_PREDICTOR_PAGE_EXAM_ID = "${exam.examId}";`);
  return html;
}

async function main() {
  const { source, exams } = await loadExams();
  const written = [];

  for (const exam of exams) {
    if (pageOverrides[exam.examId]) continue;
    const dir = path.join(root, "rank-predictor", getDir(exam));
    const file = path.join(dir, "index.html");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, buildPage(exam));
    written.push(path.relative(root, file).replace(/\\/g, "/"));
  }

  console.log(`Loaded ${exams.length} rank predictor exams from ${source}.`);
  console.log(`Generated ${written.length} rank predictor pages.`);
  written.forEach((file) => console.log(file));
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
